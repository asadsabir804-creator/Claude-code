// ============================================================
//   DataPath Pro — Main JavaScript
// ============================================================

// ─── User State (persisted via localStorage) ────────────────
const DEFAULT_STATE = {
  name: 'Alex Student',
  initials: 'AS',
  xp: 6240,
  level: 'Analyst',
  streak: 12,
  streakFreeze: 1,
  totalHours: 87,
  completedLessons: 48,
  quizAvg: 78,
  theme: 'dark',
  dailyGoal: 60,
  todayMinutes: 35,
  notifications: 3,
};

function getState() {
  try {
    const saved = localStorage.getItem('dp_state');
    return saved ? { ...DEFAULT_STATE, ...JSON.parse(saved) } : { ...DEFAULT_STATE };
  } catch { return { ...DEFAULT_STATE }; }
}

function saveState(updates) {
  const state = { ...getState(), ...updates };
  localStorage.setItem('dp_state', JSON.stringify(state));
  return state;
}

// ─── XP / Level System ──────────────────────────────────────
const LEVELS = [
  { name:'Rookie',   min:0,     max:500,   color:'#94a3b8' },
  { name:'Explorer', min:500,   max:2000,  color:'#00d4aa' },
  { name:'Analyst',  min:2000,  max:5000,  color:'#6c63ff' },
  { name:'Expert',   min:5000,  max:10000, color:'#ff6b35' },
  { name:'Master',   min:10000, max:99999, color:'#ffd60a' },
];

function getLevel(xp) {
  return LEVELS.find(l => xp >= l.min && xp < l.max) || LEVELS[LEVELS.length-1];
}

function getXpProgress(xp) {
  const lvl = getLevel(xp);
  return ((xp - lvl.min) / (lvl.max - lvl.min)) * 100;
}

function addXP(amount, reason) {
  const state = getState();
  const newXP = state.xp + amount;
  const oldLevel = getLevel(state.xp);
  const newLevel = getLevel(newXP);
  saveState({ xp: newXP, level: newLevel.name });

  showToast(`+${amount} XP`, reason, 'success', '⚡');

  if (oldLevel.name !== newLevel.name) {
    setTimeout(() => showToast('Level Up! 🎉', `You reached ${newLevel.name} level!`, 'achievement', '🏆'), 1000);
  }

  updateXPBar();
}

function updateXPBar() {
  const state = getState();
  const pct = getXpProgress(state.xp);
  document.querySelectorAll('.xp-bar-fill').forEach(el => el.style.width = pct + '%');
  document.querySelectorAll('.user-level').forEach(el => el.textContent = state.level + ' • ' + state.xp.toLocaleString() + ' XP');
  document.querySelectorAll('.xp-label .xp-current').forEach(el => el.textContent = state.xp.toLocaleString() + ' XP');
}

// ─── Toast Notifications ─────────────────────────────────────
function showToast(title, message, type = 'info', icon = 'ℹ️') {
  let container = document.querySelector('.toast-container');
  if (!container) {
    container = document.createElement('div');
    container.className = 'toast-container';
    document.body.appendChild(container);
  }

  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  toast.innerHTML = `
    <div class="toast-icon">${icon}</div>
    <div class="toast-body">
      <div class="toast-title">${title}</div>
      ${message ? `<div class="toast-msg">${message}</div>` : ''}
    </div>
    <button onclick="this.parentElement.remove()" style="margin-left:auto;background:none;border:none;color:var(--text-muted);cursor:pointer;font-size:16px;">×</button>
  `;

  container.appendChild(toast);
  setTimeout(() => {
    toast.style.animation = 'slideOut 0.3s ease forwards';
    setTimeout(() => toast.remove(), 300);
  }, 4000);
}

// ─── Theme Toggle ────────────────────────────────────────────
function initTheme() {
  const state = getState();
  if (state.theme === 'light') {
    document.body.classList.add('light-mode');
    updateThemeIcons(true);
  }
}

function toggleTheme() {
  const isLight = document.body.classList.toggle('light-mode');
  saveState({ theme: isLight ? 'light' : 'dark' });
  updateThemeIcons(isLight);
}

function updateThemeIcons(isLight) {
  document.querySelectorAll('.theme-toggle i').forEach(el => {
    el.className = isLight ? 'fas fa-moon' : 'fas fa-sun';
  });
  document.querySelectorAll('.theme-toggle').forEach(el => {
    el.title = isLight ? 'Switch to Dark Mode' : 'Switch to Light Mode';
  });
}

// ─── Sidebar ─────────────────────────────────────────────────
function initSidebar() {
  const state = getState();

  document.querySelectorAll('.user-name').forEach(el => el.textContent = state.name);
  document.querySelectorAll('.user-level').forEach(el => el.textContent = `${state.level} • ${state.xp.toLocaleString()} XP`);
  document.querySelectorAll('.streak-count').forEach(el => el.textContent = state.streak);
  document.querySelectorAll('.user-avatar, .topbar-avatar').forEach(el => el.textContent = state.initials);

  updateXPBar();

  // Mobile menu
  const overlay = document.querySelector('.sidebar-overlay');
  const sidebar = document.querySelector('.sidebar');
  const menuBtn = document.querySelector('.menu-toggle');

  if (menuBtn) {
    menuBtn.addEventListener('click', () => {
      sidebar.classList.toggle('open');
      overlay.classList.toggle('active');
    });
  }

  if (overlay) {
    overlay.addEventListener('click', () => {
      sidebar.classList.remove('open');
      overlay.classList.remove('active');
    });
  }

  // Highlight active nav item
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-item').forEach(item => {
    const href = item.getAttribute('href') || '';
    if (href === currentPage || (currentPage === '' && href === 'index.html')) {
      item.classList.add('active');
    }
  });
}

// ─── Quiz Engine ──────────────────────────────────────────────
let quizState = {
  questions: [],
  current: 0,
  score: 0,
  selected: null,
  answered: false,
  timer: null,
  timeLeft: 30,
};

function startQuiz(subject, title) {
  const qs = (typeof QUIZ_BANK !== 'undefined' && QUIZ_BANK[subject]) ? QUIZ_BANK[subject] : generateFallbackQuestions();
  quizState = { questions: qs.slice(0,10), current:0, score:0, selected:null, answered:false, timer:null, timeLeft:30 };

  const modal = document.getElementById('quizModal');
  if (!modal) return;

  document.getElementById('quizTitle').textContent = title || 'Knowledge Check';
  showQuizQuestion();
  openModal('quizModal');
}

function showQuizQuestion() {
  const q = quizState.questions[quizState.current];
  const total = quizState.questions.length;
  quizState.answered = false;
  quizState.selected = null;

  document.getElementById('quizProgress').style.width = ((quizState.current / total) * 100) + '%';
  document.getElementById('quizCounter').textContent = `Question ${quizState.current + 1} of ${total}`;
  document.getElementById('quizQuestion').textContent = q.q;
  document.getElementById('quizScore').textContent = `Score: ${quizState.score}/${quizState.current}`;

  const opts = document.getElementById('quizOptions');
  opts.innerHTML = q.opts.map((opt, i) => `
    <div class="quiz-option" onclick="selectOption(${i})" id="opt_${i}">
      <div class="option-letter">${['A','B','C','D'][i]}</div>
      <span>${opt}</span>
    </div>
  `).join('');

  // Timer
  clearInterval(quizState.timer);
  quizState.timeLeft = 30;
  document.getElementById('quizTimer').textContent = '0:30';
  quizState.timer = setInterval(() => {
    quizState.timeLeft--;
    const m = Math.floor(quizState.timeLeft / 60);
    const s = quizState.timeLeft % 60;
    document.getElementById('quizTimer').textContent = `${m}:${s.toString().padStart(2,'0')}`;
    if (quizState.timeLeft <= 0) {
      clearInterval(quizState.timer);
      if (!quizState.answered) selectOption(-1);
    }
  }, 1000);

  document.getElementById('quizNextBtn').textContent = quizState.current < total - 1 ? 'Next Question →' : 'See Results';
  document.getElementById('quizNextBtn').disabled = true;
}

function selectOption(idx) {
  if (quizState.answered) return;
  quizState.answered = true;
  quizState.selected = idx;
  clearInterval(quizState.timer);

  const q = quizState.questions[quizState.current];
  const correct = q.ans;

  document.querySelectorAll('.quiz-option').forEach((el, i) => {
    if (i === correct) el.classList.add('correct');
    else if (i === idx && i !== correct) el.classList.add('wrong');
  });

  if (idx === correct) {
    quizState.score++;
    showToast('Correct! ✓', q.explanation ? q.explanation.substring(0, 80) + '...' : '', 'success', '✅');
  } else {
    showToast('Incorrect', idx === -1 ? 'Time\'s up!' : `Correct answer: ${q.opts[correct]}`, 'info', '❌');
  }

  document.getElementById('quizNextBtn').disabled = false;
  document.getElementById('quizScore').textContent = `Score: ${quizState.score}/${quizState.current + 1}`;
}

function nextQuestion() {
  quizState.current++;
  if (quizState.current >= quizState.questions.length) {
    showQuizResults();
  } else {
    showQuizQuestion();
  }
}

function showQuizResults() {
  clearInterval(quizState.timer);
  const total = quizState.questions.length;
  const pct = Math.round((quizState.score / total) * 100);
  const grade = pct >= 90 ? 'Excellent!' : pct >= 70 ? 'Good Job!' : pct >= 50 ? 'Keep Practicing' : 'Review & Retry';
  const gradeColor = pct >= 90 ? 'var(--accent-teal)' : pct >= 70 ? 'var(--accent-purple)' : pct >= 50 ? 'var(--accent-yellow)' : 'var(--accent-pink)';

  document.getElementById('quizBody').innerHTML = `
    <div style="text-align:center;padding:20px 0;">
      <div style="font-size:72px;margin-bottom:12px;">${pct >= 70 ? '🎉' : pct >= 50 ? '📚' : '💪'}</div>
      <div style="font-size:48px;font-weight:800;color:${gradeColor};letter-spacing:-2px;">${pct}%</div>
      <div style="font-size:20px;font-weight:700;margin:8px 0;">${grade}</div>
      <div style="color:var(--text-secondary);font-size:14px;">${quizState.score} out of ${total} correct</div>
      <div style="margin:24px 0;padding:16px;background:var(--bg-input);border-radius:12px;">
        <div style="font-size:13px;color:var(--text-secondary);margin-bottom:8px;">XP Earned</div>
        <div style="font-size:28px;font-weight:800;color:var(--accent-yellow);">+${quizState.score * 10} ⚡</div>
      </div>
      <div style="display:flex;gap:10px;justify-content:center;flex-wrap:wrap;">
        <button class="btn btn-outline" onclick="startQuiz('excel','Retry Quiz')"><i class="fas fa-redo"></i> Retry</button>
        <button class="btn btn-primary" onclick="closeModal('quizModal');addXP(quizState.score*10,'Quiz completed!')">
          <i class="fas fa-check"></i> Claim XP & Continue
        </button>
      </div>
    </div>
  `;
  document.getElementById('quizFooter').style.display = 'none';
}

function generateFallbackQuestions() {
  return [
    { q:'What does SQL stand for?', opts:['Structured Query Language','Simple Query Language','Standard Query Logic','Structured Question Language'], ans:0, explanation:'SQL stands for Structured Query Language, used to communicate with relational databases.' },
    { q:'Which pandas function reads a CSV file?', opts:['pd.read_csv()','pd.load_csv()','pd.open_csv()','pd.import_csv()'], ans:0, explanation:'pd.read_csv() is the standard function for loading CSV files into a DataFrame.' },
  ];
}

// ─── Modal System ─────────────────────────────────────────────
function openModal(id) {
  const modal = document.getElementById(id);
  if (modal) modal.classList.add('active');
}

function closeModal(id) {
  const modal = document.getElementById(id);
  if (modal) modal.classList.remove('active');
}

document.addEventListener('click', e => {
  if (e.target.classList.contains('modal-overlay')) {
    e.target.classList.remove('active');
  }
});

// ─── Tabs ─────────────────────────────────────────────────────
function initTabs() {
  document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const group = btn.closest('[data-tab-group]') || btn.closest('.tabs').parentElement;
      const target = btn.dataset.tab;

      group.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
      group.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));

      btn.classList.add('active');
      const content = group.querySelector(`[data-tab-content="${target}"]`);
      if (content) content.classList.add('active');
    });
  });
}

// ─── Accordion ───────────────────────────────────────────────
function initAccordions() {
  document.querySelectorAll('.accordion-header').forEach(header => {
    header.addEventListener('click', () => {
      const body = header.nextElementSibling;
      const icon = header.querySelector('.accordion-icon');
      const isOpen = body.classList.toggle('open');
      if (icon) icon.style.transform = isOpen ? 'rotate(180deg)' : '';
    });
  });
}

// ─── Heatmap ─────────────────────────────────────────────────
function generateHeatmap(containerId, days = 90) {
  const container = document.getElementById(containerId);
  if (!container) return;

  container.className = 'heatmap-grid';
  container.style.gridTemplateColumns = `repeat(${Math.ceil(days/7)}, 1fr)`;

  for (let i = 0; i < days; i++) {
    const cell = document.createElement('div');
    cell.className = 'heatmap-cell';
    const rand = Math.random();
    if (rand > 0.7)      cell.classList.add('level-4');
    else if (rand > 0.5) cell.classList.add('level-3');
    else if (rand > 0.35) cell.classList.add('level-2');
    else if (rand > 0.25) cell.classList.add('level-1');

    const date = new Date();
    date.setDate(date.getDate() - (days - i));
    cell.title = date.toLocaleDateString('en-GB', { weekday:'short', year:'numeric', month:'short', day:'numeric' });
    container.appendChild(cell);
  }
}

// ─── Progress Bars ───────────────────────────────────────────
function animateProgressBars() {
  document.querySelectorAll('.progress-fill[data-width]').forEach(el => {
    setTimeout(() => {
      el.style.width = el.dataset.width + '%';
    }, 100);
  });
}

// ─── Charts (Chart.js) ───────────────────────────────────────
function initCharts() {
  if (typeof Chart === 'undefined') return;

  Chart.defaults.color = getComputedStyle(document.documentElement).getPropertyValue('--text-secondary').trim() || '#8892b0';
  Chart.defaults.borderColor = 'rgba(255,255,255,0.06)';
  Chart.defaults.font.family = 'Inter';

  // Radar chart for skills
  const radarEl = document.getElementById('skillRadar');
  if (radarEl) {
    new Chart(radarEl, {
      type: 'radar',
      data: {
        labels: ['Excel', 'SQL', 'Python', 'Statistics', 'Power BI', 'Tableau', 'ML', 'Viz'],
        datasets: [{
          label: 'Current Level',
          data: [85, 45, 30, 50, 20, 15, 10, 35],
          backgroundColor: 'rgba(108,99,255,0.2)',
          borderColor: '#6c63ff',
          borderWidth: 2,
          pointBackgroundColor: '#6c63ff',
          pointRadius: 4,
        }, {
          label: 'Target Level',
          data: [95, 90, 85, 85, 80, 75, 70, 85],
          backgroundColor: 'rgba(0,212,170,0.1)',
          borderColor: '#00d4aa',
          borderWidth: 2,
          borderDash: [5, 5],
          pointBackgroundColor: '#00d4aa',
          pointRadius: 3,
        }]
      },
      options: {
        scales: {
          r: {
            min: 0, max: 100,
            ticks: { stepSize: 25, display: false },
            grid: { color: 'rgba(255,255,255,0.06)' },
            pointLabels: { font: { size: 11, weight: '600' } }
          }
        },
        plugins: { legend: { position: 'bottom', labels: { boxWidth: 12, padding: 16 } } }
      }
    });
  }

  // Study hours line chart
  const hoursEl = document.getElementById('studyHoursChart');
  if (hoursEl) {
    const labels = ['Mon','Tue','Wed','Thu','Fri','Sat','Sun'];
    new Chart(hoursEl, {
      type: 'line',
      data: {
        labels,
        datasets: [{
          label: 'Hours Studied',
          data: [1.5, 2, 0.5, 3, 2.5, 4, 1],
          borderColor: '#6c63ff',
          backgroundColor: 'rgba(108,99,255,0.15)',
          fill: true,
          tension: 0.4,
          borderWidth: 2.5,
          pointBackgroundColor: '#6c63ff',
          pointRadius: 4,
          pointHoverRadius: 6,
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          y: { beginAtZero: true, grid: { color: 'rgba(255,255,255,0.04)' } },
          x: { grid: { display: false } }
        },
        plugins: { legend: { display: false } }
      }
    });
  }

  // Quiz scores bar chart
  const quizEl = document.getElementById('quizScoresChart');
  if (quizEl) {
    new Chart(quizEl, {
      type: 'bar',
      data: {
        labels: ['Excel','Stats','SQL','Python','DataViz'],
        datasets: [{
          label: 'Quiz Score %',
          data: [92, 78, 0, 0, 0],
          backgroundColor: ['rgba(0,212,170,0.8)','rgba(108,99,255,0.8)','rgba(59,130,246,0.3)','rgba(59,130,246,0.3)','rgba(59,130,246,0.3)'],
          borderRadius: 8,
          borderSkipped: false,
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          y: { min:0, max:100, grid: { color: 'rgba(255,255,255,0.04)' } },
          x: { grid: { display: false } }
        },
        plugins: { legend: { display: false } }
      }
    });
  }

  // Time distribution doughnut
  const timeEl = document.getElementById('timeDistChart');
  if (timeEl) {
    new Chart(timeEl, {
      type: 'doughnut',
      data: {
        labels: ['Excel','Statistics','SQL','Python','Other'],
        datasets: [{
          data: [35, 25, 20, 10, 10],
          backgroundColor: ['#6c63ff','#00d4aa','#ff6b35','#3b82f6','#ff3d9a'],
          borderWidth: 0,
          hoverOffset: 4,
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        cutout: '70%',
        plugins: { legend: { position: 'right', labels: { boxWidth: 12, padding: 12, font: { size: 12 } } } }
      }
    });
  }
}

// ─── Daily Goal Progress ──────────────────────────────────────
function updateDailyGoal() {
  const state = getState();
  const pct = Math.min((state.todayMinutes / state.dailyGoal) * 100, 100);
  document.querySelectorAll('.daily-goal-fill').forEach(el => {
    el.style.width = pct + '%';
  });
  document.querySelectorAll('.daily-goal-text').forEach(el => {
    el.textContent = `${state.todayMinutes}/${state.dailyGoal} min`;
  });
}

// ─── Lesson Completion ────────────────────────────────────────
function completeLesson(el, lessonTitle) {
  const check = el.querySelector('.lesson-check');
  if (check && !check.classList.contains('done')) {
    check.classList.add('done');
    check.innerHTML = '<i class="fas fa-check" style="font-size:9px"></i>';
    el.classList.add('completed');
    addXP(50, `Lesson completed: ${lessonTitle}`);

    const state = getState();
    saveState({ completedLessons: state.completedLessons + 1, todayMinutes: state.todayMinutes + 15 });
    updateDailyGoal();
  }
}

// ─── Module Accordion ─────────────────────────────────────────
function toggleModule(header) {
  const body = header.nextElementSibling;
  const icon = header.querySelector('.module-arrow');
  const isOpen = body.classList.toggle('open');
  if (icon) icon.style.transform = isOpen ? 'rotate(180deg)' : '';
}

// ─── Search ──────────────────────────────────────────────────
function initSearch() {
  const searchInput = document.querySelector('.topbar-search input');
  if (!searchInput) return;

  searchInput.addEventListener('input', (e) => {
    const query = e.target.value.toLowerCase();
    // Basic search highlight (in a real app this would filter content)
    if (query.length > 2) {
      // Simulate search
    }
  });

  searchInput.addEventListener('keydown', e => {
    if (e.key === 'Enter') {
      showToast('Search', `Searching for "${e.target.value}"...`, 'info', '🔍');
    }
  });
}

// ─── Keyboard Shortcuts ───────────────────────────────────────
function initKeyboardShortcuts() {
  document.addEventListener('keydown', e => {
    if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;

    if (e.key === 'Escape') {
      document.querySelectorAll('.modal-overlay.active').forEach(m => m.classList.remove('active'));
    }
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
      e.preventDefault();
      document.querySelector('.topbar-search input')?.focus();
    }
    if (e.key === 'd' && !e.ctrlKey) {
      toggleTheme();
    }
  });
}

// ─── Smooth Counters ─────────────────────────────────────────
function animateCounter(el, target, duration = 1500, suffix = '') {
  const start = 0;
  const step = (timestamp) => {
    if (!el._startTime) el._startTime = timestamp;
    const progress = Math.min((timestamp - el._startTime) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    el.textContent = Math.floor(start + (target - start) * eased).toLocaleString() + suffix;
    if (progress < 1) requestAnimationFrame(step);
  };
  requestAnimationFrame(step);
}

function initCounters() {
  document.querySelectorAll('[data-counter]').forEach(el => {
    const target = parseInt(el.dataset.counter);
    const suffix = el.dataset.suffix || '';
    const observer = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting) {
        animateCounter(el, target, 1500, suffix);
        observer.disconnect();
      }
    });
    observer.observe(el);
  });
}

// ─── Roadmap Builder ──────────────────────────────────────────
function buildRoadmap(containerId) {
  const container = document.getElementById(containerId);
  if (!container || typeof ROADMAP_PHASES === 'undefined') return;

  container.innerHTML = '';

  ROADMAP_PHASES.forEach((phase, idx) => {
    const item = document.createElement('div');
    item.className = 'roadmap-item';
    item.innerHTML = `
      <div class="roadmap-dot ${phase.status}">
        <span>${phase.icon}</span>
      </div>
      <div class="roadmap-content ${phase.status === 'active' ? 'active' : ''}">
        <div class="roadmap-header">
          <div>
            <div class="roadmap-phase">Phase ${phase.phase}</div>
            <div class="roadmap-title">${phase.title}</div>
          </div>
          <div style="text-align:right;flex-shrink:0">
            ${phase.status === 'completed' ? '<span class="badge badge-green"><i class="fas fa-check"></i> Completed</span>' :
              phase.status === 'active'    ? '<span class="badge badge-purple">In Progress</span>' :
              '<span class="badge badge-gray"><i class="fas fa-lock"></i> Locked</span>'}
          </div>
        </div>
        ${phase.status !== 'locked' ? `
          <div class="progress-bar mb-8" style="margin-top:8px">
            <div class="progress-fill" style="width:${phase.progress}%"></div>
          </div>
          <div style="font-size:11px;color:var(--text-muted);margin-bottom:8px">${phase.progress}% complete</div>
        ` : ''}
        <div class="roadmap-meta">
          <span><i class="far fa-clock"></i> ${phase.weeks}</span>
          <span><i class="fas fa-target-alt"></i> ${phase.outcomes}</span>
        </div>
        <div class="roadmap-skills">
          ${phase.skills.map(s => `<span class="badge badge-purple" style="font-size:10px">${s}</span>`).join('')}
        </div>
      </div>
    `;
    container.appendChild(item);
  });
}

// ─── Course Cards Builder ─────────────────────────────────────
function buildCourseCards(containerId, filter = 'all') {
  const container = document.getElementById(containerId);
  if (!container || typeof COURSES === 'undefined') return;

  const progressMap = { excel:65, statistics:35, sql:0, python:0, dataviz:0, powerbi:0, tableau:0, bizanalytics:0, ml:0 };

  let courses = COURSES;
  if (filter === 'in-progress') courses = COURSES.filter(c => progressMap[c.id] > 0 && progressMap[c.id] < 100);
  if (filter === 'completed')   courses = COURSES.filter(c => progressMap[c.id] === 100);
  if (filter === 'not-started') courses = COURSES.filter(c => progressMap[c.id] === 0);

  container.innerHTML = courses.map(course => {
    const prog = progressMap[course.id] || 0;
    return `
      <div class="course-card" onclick="window.location='course-detail.html?id=${course.id}'">
        <div class="course-thumb" style="background:${course.gradient}">
          <span style="position:relative;z-index:1;font-size:52px">${course.emoji}</span>
        </div>
        <div class="course-body">
          <div class="course-meta">
            <span class="badge ${course.diffClass}">${course.difficulty}</span>
            <span class="badge badge-gray">Phase ${course.phase}</span>
          </div>
          <div class="course-title">${course.title}</div>
          <div class="course-desc">${course.description}</div>
          <div class="progress-bar mb-8">
            <div class="progress-fill" style="width:${prog}%"></div>
          </div>
          <div style="font-size:11px;color:var(--text-muted);margin-bottom:12px">${prog > 0 ? prog + '% complete' : 'Not started'}</div>
          <div class="course-footer">
            <div class="course-info-pills">
              <span><i class="fas fa-book-open"></i> ${course.lessons} lessons</span>
              <span><i class="far fa-clock"></i> ${course.duration}</span>
              <span><i class="fas fa-star" style="color:var(--accent-yellow)"></i> ${course.rating}</span>
            </div>
            <button class="btn btn-primary btn-sm" onclick="event.stopPropagation();window.location='course-detail.html?id=${course.id}'">
              ${prog > 0 ? 'Continue' : 'Start'} <i class="fas fa-arrow-right"></i>
            </button>
          </div>
        </div>
      </div>
    `;
  }).join('');
}

// ─── AI Chat ─────────────────────────────────────────────────
function initChat() {
  const chatArea = document.getElementById('chatMessages');
  const input    = document.getElementById('chatInput');
  const sendBtn  = document.getElementById('sendBtn');
  if (!chatArea || !input) return;

  function getAIResponse(message) {
    const msg = message.toLowerCase();
    if (typeof AI_RESPONSES === 'undefined') return 'I\'m here to help! Ask me about Excel, SQL, Python, Statistics, or Power BI.';
    if (msg.includes('vlookup') || msg.includes('lookup'))      return AI_RESPONSES.vlookup;
    if (msg.includes('join') || msg.includes('sql'))            return AI_RESPONSES.join;
    if (msg.includes('p-value') || msg.includes('p value') || msg.includes('pvalue')) return AI_RESPONSES.pvalue;
    if (msg.includes('pandas') || msg.includes('dataframe') || msg.includes('python')) return AI_RESPONSES.pandas;
    return AI_RESPONSES.default;
  }

  function addMessage(text, isUser = false) {
    const msg = document.createElement('div');
    msg.className = `chat-msg ${isUser ? 'user' : 'ai'}`;
    const content = text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                        .replace(/```(\w+)?\n?([\s\S]*?)```/g, '<pre><code>$2</code></pre>')
                        .replace(/`([^`]+)`/g, '<code>$1</code>')
                        .replace(/\n/g, '<br>');
    msg.innerHTML = `
      <div class="chat-msg-avatar">${isUser ? 'AS' : '🤖'}</div>
      <div class="chat-msg-bubble">${content}</div>
    `;
    chatArea.appendChild(msg);
    chatArea.scrollTop = chatArea.scrollHeight;
  }

  function showTyping() {
    const typing = document.createElement('div');
    typing.className = 'chat-msg ai';
    typing.id = 'typingIndicator';
    typing.innerHTML = `
      <div class="chat-msg-avatar">🤖</div>
      <div class="chat-msg-bubble">
        <div style="display:flex;gap:4px;align-items:center;padding:4px 0">
          <div style="width:6px;height:6px;border-radius:50%;background:var(--accent-teal);animation:bounce 1s infinite 0s"></div>
          <div style="width:6px;height:6px;border-radius:50%;background:var(--accent-teal);animation:bounce 1s infinite 0.2s"></div>
          <div style="width:6px;height:6px;border-radius:50%;background:var(--accent-teal);animation:bounce 1s infinite 0.4s"></div>
        </div>
      </div>
    `;
    chatArea.appendChild(typing);
    chatArea.scrollTop = chatArea.scrollHeight;
    return typing;
  }

  // Add bounce animation
  if (!document.getElementById('bounceStyle')) {
    const style = document.createElement('style');
    style.id = 'bounceStyle';
    style.textContent = '@keyframes bounce{0%,100%{transform:translateY(0)}50%{transform:translateY(-5px)}}';
    document.head.appendChild(style);
  }

  function sendMessage(text) {
    const msg = text || input.value.trim();
    if (!msg) return;
    input.value = '';
    input.style.height = '42px';

    addMessage(msg, true);

    const typing = showTyping();
    setTimeout(() => {
      typing.remove();
      addMessage(getAIResponse(msg));
    }, 800 + Math.random() * 700);
  }

  sendBtn?.addEventListener('click', () => sendMessage());
  input?.addEventListener('keydown', e => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  });

  input?.addEventListener('input', () => {
    input.style.height = '42px';
    input.style.height = Math.min(input.scrollHeight, 160) + 'px';
  });

  document.querySelectorAll('.chat-suggestion-btn').forEach(btn => {
    btn.addEventListener('click', () => sendMessage(btn.dataset.msg || btn.textContent));
  });
}

// ─── Notes System ─────────────────────────────────────────────
function initNotes() {
  const editor = document.getElementById('notesEditor');
  if (!editor) return;

  editor.addEventListener('input', () => {
    const key = document.querySelector('.notes-tree-item.active')?.dataset.note || 'default';
    localStorage.setItem(`dp_note_${key}`, editor.innerHTML);
  });

  document.querySelectorAll('.notes-tree-item').forEach(item => {
    item.addEventListener('click', () => {
      document.querySelectorAll('.notes-tree-item').forEach(i => i.classList.remove('active'));
      item.classList.add('active');
      const key = item.dataset.note;
      const saved = localStorage.getItem(`dp_note_${key}`);
      if (editor) editor.innerHTML = saved || item.dataset.default || '<p>Start taking notes here...</p>';
      const title = document.getElementById('noteTitle');
      if (title) title.textContent = item.textContent.trim();
    });
  });

  // Toolbar
  document.querySelectorAll('.toolbar-btn[data-cmd]').forEach(btn => {
    btn.addEventListener('click', () => {
      editor.focus();
      document.execCommand(btn.dataset.cmd, false, btn.dataset.val || null);
    });
  });
}

// ─── Interview Section ────────────────────────────────────────
function buildInterviewQuestions(containerId, category = 'technical') {
  const container = document.getElementById(containerId);
  if (!container || typeof INTERVIEW_QS === 'undefined') return;

  const questions = INTERVIEW_QS[category] || [];

  container.innerHTML = questions.map((q, i) => `
    <div class="question-accordion">
      <div class="accordion-header" onclick="this.nextElementSibling.classList.toggle('open');this.querySelector('.accordion-icon').style.transform=this.nextElementSibling.classList.contains('open')?'rotate(180deg)':''">
        <span class="badge badge-${q.difficulty==='Beginner'?'green':q.difficulty==='Intermediate'?'yellow':'orange'}" style="flex-shrink:0">${q.difficulty}</span>
        <span class="accordion-title">${q.q}</span>
        <span class="badge badge-purple" style="flex-shrink:0">${q.topic}</span>
        <i class="fas fa-chevron-down accordion-icon" style="color:var(--text-muted);transition:transform 0.2s;flex-shrink:0"></i>
      </div>
      <div class="accordion-body">
        <p>${q.ans}</p>
        <div style="margin-top:12px;display:flex;gap:8px">
          <button class="btn btn-ghost btn-sm" onclick="addXP(5,'Interview question reviewed')"><i class="fas fa-check"></i> Mark as Practiced</button>
          <button class="btn btn-ghost btn-sm"><i class="fas fa-bookmark"></i> Save</button>
        </div>
      </div>
    </div>
  `).join('');
}

// ─── Project Cards ────────────────────────────────────────────
function buildProjectCards(containerId) {
  const container = document.getElementById(containerId);
  if (!container || typeof PROJECTS === 'undefined') return;

  const statusMap = { completed: 'badge-green', 'in-progress': 'badge-yellow', planned: 'badge-gray' };
  const statusLabel = { completed: '✓ Completed', 'in-progress': '⟳ In Progress', planned: '○ Planned' };

  container.innerHTML = PROJECTS.map(p => `
    <div class="project-card">
      <div class="project-header">
        <div class="project-icon" style="background:${p.bg}">${p.icon}</div>
        <span class="badge ${statusMap[p.status]}">${statusLabel[p.status]}</span>
      </div>
      <div class="project-title">${p.title}</div>
      <div class="project-desc">${p.desc}</div>
      <div class="project-tools">
        ${p.tools.map(t => `<span class="tool-pill">${t}</span>`).join('')}
      </div>
      <div style="margin-bottom:12px">
        <div class="text-xs text-muted mb-8">Key Outcomes:</div>
        ${p.outcomes.map(o => `<div style="font-size:12px;color:var(--text-secondary);padding:2px 0"><i class="fas fa-check-circle" style="color:var(--accent-teal);margin-right:6px;font-size:10px"></i>${o}</div>`).join('')}
      </div>
      <div class="project-footer">
        <span class="badge badge-${p.difficulty==='Beginner'?'green':p.difficulty==='Intermediate'?'yellow':'orange'}">${p.difficulty}</span>
        ${p.status === 'completed' ? `
          <button class="btn btn-teal btn-sm" style="margin-left:auto"><i class="fab fa-github"></i> View</button>
        ` : p.status === 'in-progress' ? `
          <button class="btn btn-primary btn-sm" style="margin-left:auto" onclick="addXP(50,'Project session logged')"><i class="fas fa-play"></i> Continue</button>
        ` : `
          <button class="btn btn-ghost btn-sm" style="margin-left:auto"><i class="fas fa-lock"></i> Unlock</button>
        `}
      </div>
    </div>
  `).join('');
}

// ─── Achievements Grid ────────────────────────────────────────
function buildAchievements(containerId) {
  const container = document.getElementById(containerId);
  if (!container || typeof ACHIEVEMENTS === 'undefined') return;

  container.innerHTML = ACHIEVEMENTS.map(a => `
    <div class="achievement-item ${a.earned ? 'earned' : 'locked'}" title="${a.desc}">
      <div class="achievement-icon">${a.icon}</div>
      <div class="achievement-name">${a.name}</div>
      <div class="achievement-desc">${a.desc}</div>
      ${a.earned ? '<div style="margin-top:6px;font-size:10px;color:var(--accent-yellow)">✓ Earned</div>' : ''}
    </div>
  `).join('');
}

// ─── Leaderboard ──────────────────────────────────────────────
function buildLeaderboard(containerId) {
  const container = document.getElementById(containerId);
  if (!container || typeof LEADERBOARD === 'undefined') return;

  const medals = ['gold','silver','bronze'];
  const icons = ['🥇','🥈','🥉'];

  container.innerHTML = LEADERBOARD.map((user, i) => `
    <div class="leaderboard-item ${user.you ? 'active' : ''}" style="${user.you ? 'background:rgba(108,99,255,0.08);border-radius:8px;' : ''}">
      <div class="rank-num ${medals[i] || ''}">${icons[i] || (i+1)}</div>
      <div class="lb-avatar" style="background:${user.bg}">${user.avatar}</div>
      <div class="lb-name ${user.you ? 'you' : ''}">${user.name} ${user.you ? '(You)' : ''}</div>
      <div class="lb-xp">${user.xp.toLocaleString()} XP</div>
    </div>
  `).join('');
}

// ─── Init ─────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initSidebar();
  initTabs();
  initAccordions();
  initSearch();
  initKeyboardShortcuts();
  initCounters();
  animateProgressBars();
  updateDailyGoal();

  // Delay chart init to ensure Chart.js is loaded
  if (typeof Chart !== 'undefined') {
    initCharts();
  } else {
    window.addEventListener('load', initCharts);
  }

  // Page-specific initializations
  const page = window.location.pathname.split('/').pop() || 'index.html';

  if (page === 'index.html' || page === '') {
    generateHeatmap('studyHeatmap', 90);
    buildLeaderboard('leaderboardList');
    buildAchievements('achievementsMini');
  }

  if (page === 'roadmap.html') {
    buildRoadmap('roadmapContainer');
  }

  if (page === 'courses.html') {
    buildCourseCards('courseGrid');
    document.querySelectorAll('.filter-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        buildCourseCards('courseGrid', btn.dataset.filter || 'all');
      });
    });
  }

  if (page === 'course-detail.html') {
    initCourseDetail();
  }

  if (page === 'assistant.html') {
    initChat();
  }

  if (page === 'notes.html') {
    initNotes();
  }

  if (page === 'interview.html') {
    buildInterviewQuestions('interviewQList', 'technical');
    document.querySelectorAll('[data-interview-category]').forEach(btn => {
      btn.addEventListener('click', () => {
        buildInterviewQuestions('interviewQList', btn.dataset.interviewCategory);
      });
    });
  }

  if (page === 'projects.html') {
    buildProjectCards('projectGrid');
    buildAchievements('achievementsGrid');
  }

  if (page === 'progress.html') {
    generateHeatmap('progressHeatmap', 90);
  }

  // Show welcome toast on first visit
  if (!sessionStorage.getItem('welcomed')) {
    sessionStorage.setItem('welcomed', '1');
    setTimeout(() => showToast('Welcome back! 👋', 'You have a 12-day streak. Keep it up!', 'achievement', '🔥'), 1500);
  }
});

// ─── Course Detail Page ───────────────────────────────────────
function initCourseDetail() {
  const params = new URLSearchParams(window.location.search);
  const courseId = params.get('id') || 'excel';

  if (typeof COURSES === 'undefined') return;
  const course = COURSES.find(c => c.id === courseId) || COURSES[0];

  // Set course info
  document.querySelectorAll('.course-detail-title').forEach(el => el.textContent = course.title);
  document.querySelectorAll('.course-detail-emoji').forEach(el => el.textContent = course.emoji);
  document.querySelectorAll('.course-detail-bg').forEach(el => el.style.background = course.gradient);
  document.querySelectorAll('.course-detail-desc').forEach(el => el.textContent = course.description);

  // Build curriculum
  const curriculumEl = document.getElementById('curriculumList');
  if (curriculumEl) {
    curriculumEl.innerHTML = course.modules.map((mod, mi) => `
      <div style="margin-bottom:8px">
        <div class="lesson-item" style="background:var(--bg-input);font-weight:600;cursor:default" onclick="toggleModule(this)">
          <div style="flex:1">${mod.title}</div>
          <div style="font-size:11px;color:var(--text-muted);margin-right:8px">${mod.lessons.length} lessons</div>
          <i class="fas fa-chevron-down module-arrow" style="color:var(--text-muted);font-size:12px;transition:transform 0.2s"></i>
        </div>
        <div class="module-body open">
          ${mod.lessons.map((lesson, li) => `
            <div class="lesson-item" onclick="completeLesson(this,'${lesson.title}')">
              <div class="lesson-check ${lesson.done ? 'done' : ''}">${lesson.done ? '<i class="fas fa-check" style="font-size:9px"></i>' : ''}</div>
              <div class="lesson-icon ${lesson.type}">
                <i class="fas fa-${lesson.type==='video'?'play':lesson.type==='quiz'?'question-circle':lesson.type==='project'?'rocket':'code'}"></i>
              </div>
              <div style="flex:1">
                <div class="lesson-title" style="font-size:13px">${lesson.title}</div>
                <div style="font-size:11px;color:var(--text-muted);text-transform:capitalize">${lesson.type}</div>
              </div>
              <div class="lesson-duration">${lesson.duration}</div>
              ${lesson.type==='quiz' ? `<button class="btn btn-primary btn-sm" style="margin-left:8px" onclick="event.stopPropagation();startQuiz('${courseId}','${lesson.title}')"><i class="fas fa-play"></i></button>` : ''}
            </div>
          `).join('')}
        </div>
      </div>
    `).join('');

    // Add module-body styles
    if (!document.getElementById('moduleStyle')) {
      const s = document.createElement('style');
      s.id = 'moduleStyle';
      s.textContent = '.module-body{overflow:hidden;transition:max-height 0.3s ease}.module-body:not(.open){max-height:0!important}';
      document.head.appendChild(s);
    }
  }
}
