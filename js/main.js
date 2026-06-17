// ============================================================
//   DataPath Pro — Main JavaScript (v2 — fully fixed)
// ============================================================

// ─── User State ──────────────────────────────────────────────
const DEFAULT_STATE = {
  name: 'Alex Student', initials: 'AS',
  xp: 6240, level: 'Analyst', streak: 12,
  totalHours: 87, completedLessons: 48, quizAvg: 78,
  theme: 'dark', dailyGoal: 60, todayMinutes: 35,
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

// ─── XP / Level System ───────────────────────────────────────
const LEVELS = [
  { name:'Rookie',   min:0,     max:500   },
  { name:'Explorer', min:500,   max:2000  },
  { name:'Analyst',  min:2000,  max:5000  },
  { name:'Expert',   min:5000,  max:10000 },
  { name:'Master',   min:10000, max:99999 },
];

function getLevel(xp) {
  return LEVELS.find(l => xp >= l.min && xp < l.max) || LEVELS[LEVELS.length - 1];
}

function getXpProgress(xp) {
  const lvl = getLevel(xp);
  return ((xp - lvl.min) / (lvl.max - lvl.min)) * 100;
}

function addXP(amount, reason) {
  const state = getState();
  const newXP  = state.xp + amount;
  const oldLvl = getLevel(state.xp);
  const newLvl = getLevel(newXP);
  saveState({ xp: newXP, level: newLvl.name });
  showToast(`+${amount} XP`, reason, 'success', '⚡');
  if (oldLvl.name !== newLvl.name) {
    setTimeout(() => showToast('Level Up! 🎉', `You reached ${newLvl.name}!`, 'achievement', '🏆'), 900);
  }
  updateXPBar();
}

function updateXPBar() {
  const state = getState();
  const pct = getXpProgress(state.xp);
  document.querySelectorAll('.xp-bar-fill').forEach(el => el.style.width = pct + '%');
  document.querySelectorAll('.user-level').forEach(el => el.textContent = `${state.level} • ${state.xp.toLocaleString()} XP`);
  document.querySelectorAll('.xp-current').forEach(el => el.textContent = state.xp.toLocaleString() + ' XP');
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
    <button onclick="this.closest('.toast').remove()" style="margin-left:auto;background:none;border:none;color:var(--text-muted);cursor:pointer;font-size:18px;line-height:1">×</button>
  `;
  container.appendChild(toast);
  setTimeout(() => {
    if (!toast.parentNode) return;
    toast.style.animation = 'slideOut 0.3s ease forwards';
    setTimeout(() => toast.remove(), 300);
  }, 4000);
}

// ─── Theme ───────────────────────────────────────────────────
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
}

// ─── Sidebar ─────────────────────────────────────────────────
function initSidebar() {
  const state = getState();
  document.querySelectorAll('.user-name').forEach(el => el.textContent = state.name);
  document.querySelectorAll('.user-level').forEach(el => el.textContent = `${state.level} • ${state.xp.toLocaleString()} XP`);
  document.querySelectorAll('.streak-count').forEach(el => el.textContent = state.streak);
  document.querySelectorAll('.user-avatar, .topbar-avatar').forEach(el => el.textContent = state.initials);
  updateXPBar();

  const overlay = document.querySelector('.sidebar-overlay');
  const sidebar = document.querySelector('.sidebar');
  document.querySelector('.menu-toggle')?.addEventListener('click', () => {
    sidebar?.classList.toggle('open');
    overlay?.classList.toggle('active');
  });
  overlay?.addEventListener('click', () => {
    sidebar?.classList.remove('open');
    overlay?.classList.remove('active');
  });

  // Active nav highlight
  const current = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-item[href]').forEach(a => {
    a.classList.toggle('active', a.getAttribute('href') === current);
  });
}

// ─── Quiz Engine ─────────────────────────────────────────────
let quizState = { questions:[], current:0, score:0, answered:false, timer:null, timeLeft:30, subject:'excel' };

function startQuiz(subject, title) {
  const qs = (typeof QUIZ_BANK !== 'undefined' && QUIZ_BANK[subject]) || generateFallbackQuestions();
  quizState = { questions: qs.slice(0,10), current:0, score:0, answered:false, timer:null, timeLeft:30, subject };

  const modal = document.getElementById('quizModal');
  if (!modal) return;

  document.getElementById('quizTitle').textContent = title || 'Knowledge Check';
  document.getElementById('quizFooter').style.display = '';

  // Reset body
  const body = document.getElementById('quizBody');
  body.innerHTML = `
    <div class="quiz-progress-bar"><div class="quiz-progress-fill" id="quizProgress" style="width:0%"></div></div>
    <div id="quizQuestion" class="quiz-question"></div>
    <div id="quizOptions" class="quiz-options"></div>
  `;

  showQuizQuestion();
  openModal('quizModal');
}

function showQuizQuestion() {
  const q     = quizState.questions[quizState.current];
  const total = quizState.questions.length;
  quizState.answered = false;

  const prog = document.getElementById('quizProgress');
  if (prog) prog.style.width = ((quizState.current / total) * 100) + '%';

  const counter = document.getElementById('quizCounter');
  if (counter) counter.textContent = `Question ${quizState.current + 1} of ${total}`;

  const scoreEl = document.getElementById('quizScore');
  if (scoreEl) scoreEl.textContent = `Score: ${quizState.score}/${quizState.current}`;

  const qEl = document.getElementById('quizQuestion');
  if (qEl) qEl.textContent = q.q;

  const optsEl = document.getElementById('quizOptions');
  if (optsEl) {
    optsEl.innerHTML = q.opts.map((opt, i) => `
      <div class="quiz-option" id="opt_${i}" onclick="selectOption(${i})">
        <div class="option-letter">${['A','B','C','D'][i]}</div>
        <span>${opt}</span>
      </div>
    `).join('');
  }

  // Timer
  clearInterval(quizState.timer);
  quizState.timeLeft = 30;
  const timerEl = document.getElementById('quizTimer');
  if (timerEl) timerEl.textContent = '0:30';
  quizState.timer = setInterval(() => {
    quizState.timeLeft--;
    if (timerEl) timerEl.textContent = `0:${quizState.timeLeft.toString().padStart(2,'0')}`;
    if (quizState.timeLeft <= 0) { clearInterval(quizState.timer); if (!quizState.answered) selectOption(-1); }
  }, 1000);

  const nextBtn = document.getElementById('quizNextBtn');
  if (nextBtn) {
    nextBtn.disabled = true;
    nextBtn.textContent = quizState.current < total - 1 ? 'Next Question →' : 'See Results';
  }
}

function selectOption(idx) {
  if (quizState.answered) return;
  quizState.answered = true;
  clearInterval(quizState.timer);

  const q       = quizState.questions[quizState.current];
  const correct = q.ans;

  document.querySelectorAll('.quiz-option').forEach((el, i) => {
    if (i === correct) el.classList.add('correct');
    else if (i === idx && i !== correct) el.classList.add('wrong');
  });

  if (idx === correct) {
    quizState.score++;
    showToast('Correct! ✓', (q.explanation || '').substring(0, 90), 'success', '✅');
  } else {
    showToast('Incorrect ✗', idx === -1 ? "Time's up!" : `Answer: ${q.opts[correct]}`, 'info', '❌');
  }

  const nextBtn = document.getElementById('quizNextBtn');
  if (nextBtn) nextBtn.disabled = false;

  const scoreEl = document.getElementById('quizScore');
  if (scoreEl) scoreEl.textContent = `Score: ${quizState.score}/${quizState.current + 1}`;
}

function nextQuestion() {
  quizState.current++;
  if (quizState.current >= quizState.questions.length) showQuizResults();
  else showQuizQuestion();
}

function showQuizResults() {
  clearInterval(quizState.timer);
  const total = quizState.questions.length;
  const pct   = Math.round((quizState.score / total) * 100);
  const emoji = pct >= 70 ? '🎉' : pct >= 50 ? '📚' : '💪';
  const grade = pct >= 90 ? 'Excellent!' : pct >= 70 ? 'Good Job!' : pct >= 50 ? 'Keep Practicing' : 'Review & Retry';
  const color = pct >= 90 ? 'var(--accent-teal)' : pct >= 70 ? 'var(--accent-purple)' : pct >= 50 ? 'var(--accent-yellow)' : 'var(--accent-pink)';
  const xpEarned = quizState.score * 10;

  document.getElementById('quizBody').innerHTML = `
    <div style="text-align:center;padding:16px 0">
      <div style="font-size:64px;margin-bottom:8px">${emoji}</div>
      <div style="font-size:52px;font-weight:800;color:${color};letter-spacing:-2px;line-height:1">${pct}%</div>
      <div style="font-size:18px;font-weight:700;margin:8px 0">${grade}</div>
      <div style="color:var(--text-secondary);font-size:13px">${quizState.score} of ${total} correct</div>
      <div style="margin:20px 0;padding:14px;background:rgba(255,214,10,0.08);border:1px solid rgba(255,214,10,0.2);border-radius:12px">
        <div style="font-size:11px;color:var(--text-muted);margin-bottom:4px;text-transform:uppercase;letter-spacing:1px">XP Earned</div>
        <div style="font-size:32px;font-weight:800;color:var(--accent-yellow)">+${xpEarned} ⚡</div>
      </div>
      <div style="display:flex;gap:10px;justify-content:center;flex-wrap:wrap">
        <button class="btn btn-outline" onclick="startQuiz('${quizState.subject}','Retry Quiz')">
          <i class="fas fa-redo"></i> Retry
        </button>
        <button class="btn btn-primary" onclick="claimXP(${xpEarned})">
          <i class="fas fa-check"></i> Claim XP &amp; Continue
        </button>
      </div>
    </div>
  `;
  document.getElementById('quizFooter').style.display = 'none';
}

function claimXP(amount) {
  closeModal('quizModal');
  addXP(amount, 'Quiz completed!');
  saveState({ quizAvg: Math.round((getState().quizAvg * 0.8) + (quizState.score / quizState.questions.length) * 100 * 0.2) });
}

function generateFallbackQuestions() {
  return [
    { q:'What does SQL stand for?', opts:['Structured Query Language','Simple Query Language','Standard Query Logic','Structured Question Language'], ans:0, explanation:'SQL = Structured Query Language, used to communicate with relational databases.' },
    { q:'Which function reads a CSV in pandas?', opts:['pd.read_csv()','pd.load_csv()','pd.open_csv()','pd.import_csv()'], ans:0, explanation:'pd.read_csv() loads a CSV file into a pandas DataFrame.' },
    { q:'Which Excel function looks up a value by column?', opts:['VLOOKUP','HLOOKUP','MATCH','OFFSET'], ans:0, explanation:'VLOOKUP searches the first column of a range and returns a value from a specified column.' },
    { q:'What does GROUP BY do in SQL?', opts:['Groups rows for aggregate functions','Sorts data','Filters rows','Joins tables'], ans:0, explanation:'GROUP BY groups rows with the same values so aggregate functions (SUM, COUNT) can be applied per group.' },
    { q:'What is a pivot table used for?', opts:['Summarising large datasets','Drawing charts','Writing formulas','Formatting data'], ans:0, explanation:'Pivot tables let you summarise, analyse and present large datasets by dragging fields.' },
  ];
}

// ─── Modal ────────────────────────────────────────────────────
function openModal(id)  { document.getElementById(id)?.classList.add('active'); }
function closeModal(id) { document.getElementById(id)?.classList.remove('active'); }

document.addEventListener('click', e => {
  if (e.target.classList.contains('modal-overlay')) e.target.classList.remove('active');
});

// ─── Tabs ─────────────────────────────────────────────────────
function initTabs() {
  document.querySelectorAll('.tab-btn[data-tab]').forEach(btn => {
    btn.addEventListener('click', () => {
      // Find the scoping container (data-tab-group or closest section)
      const group = btn.closest('[data-tab-group]') || btn.closest('.page-content') || document;

      group.querySelectorAll('.tab-btn[data-tab]').forEach(b => b.classList.remove('active'));
      group.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));

      btn.classList.add('active');
      const content = group.querySelector(`[data-tab-content="${btn.dataset.tab}"]`);
      if (content) content.classList.add('active');
    });
  });
}

// ─── Accordion ───────────────────────────────────────────────
function initAccordions() {
  document.querySelectorAll('.accordion-header').forEach(h => {
    h.addEventListener('click', () => {
      const body = h.nextElementSibling;
      const icon = h.querySelector('.accordion-icon');
      const open = body.classList.toggle('open');
      if (icon) icon.style.transform = open ? 'rotate(180deg)' : '';
    });
  });
}

// ─── Heatmap ─────────────────────────────────────────────────
function generateHeatmap(containerId, days = 90) {
  const container = document.getElementById(containerId);
  if (!container) return;
  container.innerHTML = '';
  container.className = 'heatmap-grid';
  container.style.gridTemplateColumns = `repeat(${Math.ceil(days / 7)}, 1fr)`;

  for (let i = 0; i < days; i++) {
    const cell  = document.createElement('div');
    const r     = Math.random();
    const level = r > 0.7 ? 4 : r > 0.5 ? 3 : r > 0.35 ? 2 : r > 0.25 ? 1 : 0;
    cell.className = 'heatmap-cell' + (level ? ` level-${level}` : '');
    const d = new Date(); d.setDate(d.getDate() - (days - i));
    cell.title = d.toLocaleDateString('en-GB', { weekday:'short', year:'numeric', month:'short', day:'numeric' });
    container.appendChild(cell);
  }
}

// ─── Animated Progress Bars ───────────────────────────────────
function animateProgressBars() {
  document.querySelectorAll('.progress-fill[data-width]').forEach(el => {
    setTimeout(() => { el.style.width = el.dataset.width + '%'; }, 150);
  });
}

// ─── Chart.js Setup ──────────────────────────────────────────
function initCharts() {
  if (typeof Chart === 'undefined') return;

  const textColor   = getComputedStyle(document.documentElement).getPropertyValue('--text-secondary').trim() || '#8892b0';
  const gridColor   = 'rgba(255,255,255,0.05)';
  Chart.defaults.color       = textColor;
  Chart.defaults.borderColor = gridColor;
  Chart.defaults.font.family = 'Inter';

  // Destroy previous instances to avoid canvas re-use errors
  Object.keys(Chart.instances || {}).forEach(k => Chart.instances[k]?.destroy());

  // ── Skill Radar ──
  const radarEl = document.getElementById('skillRadar');
  if (radarEl) {
    new Chart(radarEl, {
      type: 'radar',
      data: {
        labels: ['Excel','SQL','Python','Statistics','Power BI','Tableau','ML','DataViz'],
        datasets: [
          { label:'Current', data:[85,45,30,50,20,15,10,35], backgroundColor:'rgba(108,99,255,0.2)', borderColor:'#6c63ff', borderWidth:2, pointBackgroundColor:'#6c63ff', pointRadius:4 },
          { label:'Target',  data:[95,90,85,85,80,75,70,85], backgroundColor:'rgba(0,212,170,0.08)',  borderColor:'#00d4aa', borderWidth:2, borderDash:[5,5], pointBackgroundColor:'#00d4aa', pointRadius:3 },
        ]
      },
      options: {
        scales: {
          r: { min:0, max:100, ticks:{ stepSize:25, display:false }, grid:{ color:gridColor }, pointLabels:{ font:{ size:11, weight:'600' } } }
        },
        plugins: { legend:{ position:'bottom', labels:{ boxWidth:12, padding:14 } } }
      }
    });
  }

  // ── Study Hours Line ──
  const hoursEl = document.getElementById('studyHoursChart');
  if (hoursEl) {
    new Chart(hoursEl, {
      type: 'line',
      data: {
        labels: ['Mon','Tue','Wed','Thu','Fri','Sat','Sun'],
        datasets: [{ label:'Hours', data:[1.5,2,0.5,3,2.5,4,1], borderColor:'#6c63ff', backgroundColor:'rgba(108,99,255,0.12)', fill:true, tension:0.4, borderWidth:2.5, pointBackgroundColor:'#6c63ff', pointRadius:4, pointHoverRadius:6 }]
      },
      options: { responsive:true, maintainAspectRatio:false, scales:{ y:{ beginAtZero:true, grid:{ color:gridColor } }, x:{ grid:{ display:false } } }, plugins:{ legend:{ display:false } } }
    });
  }

  // ── Quiz Scores Bar ──
  const quizEl = document.getElementById('quizScoresChart');
  if (quizEl) {
    new Chart(quizEl, {
      type: 'bar',
      data: {
        labels: ['Excel','Stats','SQL','Python','Viz'],
        datasets: [{ label:'Score %', data:[92,78,0,0,0], backgroundColor:['rgba(0,212,170,0.85)','rgba(108,99,255,0.85)','rgba(59,130,246,0.2)','rgba(59,130,246,0.2)','rgba(59,130,246,0.2)'], borderRadius:8, borderSkipped:false }]
      },
      options: { responsive:true, maintainAspectRatio:false, scales:{ y:{ min:0, max:100, grid:{ color:gridColor } }, x:{ grid:{ display:false } } }, plugins:{ legend:{ display:false } } }
    });
  }

  // ── Time Distribution Doughnut ──
  const timeEl = document.getElementById('timeDistChart');
  if (timeEl) {
    new Chart(timeEl, {
      type: 'doughnut',
      data: {
        labels: ['Excel','Statistics','SQL','Python','Other'],
        datasets: [{ data:[35,25,20,10,10], backgroundColor:['#6c63ff','#00d4aa','#ff6b35','#3b82f6','#ff3d9a'], borderWidth:0, hoverOffset:6 }]
      },
      options: { responsive:true, maintainAspectRatio:false, cutout:'70%', plugins:{ legend:{ position:'right', labels:{ boxWidth:12, padding:10, font:{ size:12 } } } } }
    });
  }
}

// ─── Daily Goal ───────────────────────────────────────────────
function updateDailyGoal() {
  const { todayMinutes, dailyGoal } = getState();
  const pct = Math.min((todayMinutes / dailyGoal) * 100, 100);
  document.querySelectorAll('.daily-goal-fill').forEach(el => el.style.width = pct + '%');
  document.querySelectorAll('.daily-goal-text').forEach(el => el.textContent = `${todayMinutes}/${dailyGoal} min`);
}

// ─── Lesson Completion ────────────────────────────────────────
function completeLesson(el, lessonTitle) {
  const check = el.querySelector('.lesson-check');
  if (!check || check.classList.contains('done')) return;
  check.classList.add('done');
  check.innerHTML = '<i class="fas fa-check" style="font-size:9px;color:white"></i>';
  el.classList.add('completed');
  addXP(50, `Lesson: ${lessonTitle}`);
  const s = getState();
  saveState({ completedLessons: s.completedLessons + 1, todayMinutes: s.todayMinutes + 15 });
  updateDailyGoal();
}

// ─── Module Toggle ────────────────────────────────────────────
function toggleModule(header) {
  const body = header.nextElementSibling;
  if (!body) return;
  const open = body.classList.toggle('open');
  const icon = header.querySelector('.module-arrow');
  if (icon) icon.style.transform = open ? 'rotate(180deg)' : '';
  // Animate max-height
  if (open) {
    body.style.maxHeight = body.scrollHeight + 'px';
  } else {
    body.style.maxHeight = '0';
  }
}

// ─── Counters ─────────────────────────────────────────────────
function animateCounter(el, target, duration = 1400, suffix = '') {
  el._startTime = null;
  const step = ts => {
    if (!el._startTime) el._startTime = ts;
    const prog  = Math.min((ts - el._startTime) / duration, 1);
    const eased = 1 - Math.pow(1 - prog, 3);
    el.textContent = Math.floor(target * eased).toLocaleString() + suffix;
    if (prog < 1) requestAnimationFrame(step);
  };
  requestAnimationFrame(step);
}

function initCounters() {
  const obs = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      animateCounter(el, parseInt(el.dataset.counter), 1400, el.dataset.suffix || '');
      obs.unobserve(el);
    });
  });
  document.querySelectorAll('[data-counter]').forEach(el => obs.observe(el));
}

// ─── Search ───────────────────────────────────────────────────
function initSearch() {
  document.querySelector('.topbar-search input')?.addEventListener('keydown', e => {
    if (e.key === 'Enter') showToast('Search', `Searching for "${e.target.value}"…`, 'info', '🔍');
  });
  document.addEventListener('keydown', e => {
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
      e.preventDefault();
      document.querySelector('.topbar-search input')?.focus();
    }
    if (e.key === 'Escape') document.querySelectorAll('.modal-overlay.active').forEach(m => m.classList.remove('active'));
  });
}

// ─── Roadmap Builder ──────────────────────────────────────────
function buildRoadmap(containerId) {
  const container = document.getElementById(containerId);
  if (!container || typeof ROADMAP_PHASES === 'undefined') return;
  container.innerHTML = ROADMAP_PHASES.map(phase => `
    <div class="roadmap-item">
      <div class="roadmap-dot ${phase.status}"><span>${phase.icon}</span></div>
      <div class="roadmap-content ${phase.status === 'active' ? 'active' : ''}">
        <div class="roadmap-header">
          <div>
            <div class="roadmap-phase">Phase ${phase.phase}</div>
            <div class="roadmap-title">${phase.title}</div>
          </div>
          <div style="flex-shrink:0">
            ${phase.status === 'completed' ? '<span class="badge badge-green"><i class="fas fa-check"></i> Done</span>'
            : phase.status === 'active'    ? '<span class="badge badge-purple">In Progress</span>'
            : '<span class="badge badge-gray"><i class="fas fa-lock"></i> Locked</span>'}
          </div>
        </div>
        ${phase.status !== 'locked' ? `
          <div class="progress-bar" style="margin:8px 0 4px">
            <div class="progress-fill" style="width:${phase.progress}%"></div>
          </div>
          <div style="font-size:11px;color:var(--text-muted);margin-bottom:6px">${phase.progress}% complete</div>
        ` : ''}
        <div class="roadmap-meta">
          <span><i class="far fa-clock"></i> ${phase.weeks}</span>
          <span style="flex:1;color:var(--text-muted);font-size:11px">${phase.outcomes}</span>
        </div>
        <div class="roadmap-skills" style="margin-top:8px">
          ${phase.skills.map(s => `<span class="badge badge-purple" style="font-size:10px">${s}</span>`).join('')}
        </div>
        ${phase.status !== 'locked' ? `
          <div style="margin-top:12px">
            <a href="course-detail.html?id=${['','excel','statistics','sql','python','dataviz','powerbi','tableau','bizanalytics','ml'][phase.phase]}" class="btn btn-${phase.status==='completed'?'ghost':'primary'} btn-sm">
              <i class="fas fa-${phase.status==='completed'?'redo':'play'}"></i>
              ${phase.status === 'completed' ? 'Review' : 'Continue'}
            </a>
          </div>
        ` : ''}
      </div>
    </div>
  `).join('');
}

// ─── Course Cards ─────────────────────────────────────────────
function buildCourseCards(containerId, filter = 'all') {
  const container = document.getElementById(containerId);
  if (!container || typeof COURSES === 'undefined') return;

  const progressMap = { excel:65, statistics:35, sql:0, python:0, dataviz:0, powerbi:0, tableau:0, bizanalytics:0, ml:0 };

  let courses = COURSES;
  if (filter === 'in-progress') courses = COURSES.filter(c => progressMap[c.id] > 0 && progressMap[c.id] < 100);
  if (filter === 'completed')   courses = COURSES.filter(c => progressMap[c.id] === 100);
  if (filter === 'not-started') courses = COURSES.filter(c => progressMap[c.id] === 0);

  if (courses.length === 0) {
    container.innerHTML = `<div style="grid-column:1/-1;text-align:center;padding:40px;color:var(--text-muted)">
      <div style="font-size:40px;margin-bottom:12px">📭</div>
      <div>No courses in this category yet.</div>
    </div>`;
    return;
  }

  container.innerHTML = courses.map(course => {
    const prog = progressMap[course.id] || 0;
    const statusText = prog === 100 ? 'Completed' : prog > 0 ? `${prog}%` : 'Start';
    return `
      <div class="course-card" onclick="window.location='course-detail.html?id=${course.id}'">
        <div class="course-thumb" style="background:${course.gradient}">
          <span style="position:relative;z-index:1;font-size:52px">${course.emoji}</span>
          ${prog > 0 ? `<div style="position:absolute;top:10px;right:10px;z-index:2"><span class="badge badge-${prog===100?'green':'purple'}">${statusText}</span></div>` : ''}
        </div>
        <div class="course-body">
          <div class="course-meta">
            <span class="badge ${course.diffClass}">${course.difficulty}</span>
            <span class="badge badge-gray" style="font-size:10px">Phase ${course.phase}</span>
          </div>
          <div class="course-title">${course.title}</div>
          <div class="course-desc">${course.description}</div>
          ${prog > 0 ? `
            <div class="progress-bar" style="margin-bottom:6px">
              <div class="progress-fill${prog===100?' teal':''}" style="width:${prog}%"></div>
            </div>
            <div style="font-size:11px;color:var(--text-muted);margin-bottom:12px">${prog}% complete</div>
          ` : '<div style="margin-bottom:12px"></div>'}
          <div class="course-footer">
            <div class="course-info-pills">
              <span><i class="fas fa-book-open"></i> ${course.lessons}</span>
              <span><i class="far fa-clock"></i> ${course.duration}</span>
              <span><i class="fas fa-star" style="color:var(--accent-yellow)"></i> ${course.rating}</span>
            </div>
            <button class="btn btn-primary btn-sm" onclick="event.stopPropagation();window.location='course-detail.html?id=${course.id}'">
              ${prog === 100 ? 'Review' : prog > 0 ? 'Continue' : 'Start'} <i class="fas fa-arrow-right"></i>
            </button>
          </div>
        </div>
      </div>
    `;
  }).join('');
}

// ─── AI Chat ──────────────────────────────────────────────────
function initChat() {
  const chatArea = document.getElementById('chatMessages');
  const input    = document.getElementById('chatInput');
  const sendBtn  = document.getElementById('sendBtn');
  if (!chatArea || !input) return;

  // Inject bounce animation once
  if (!document.getElementById('bounceStyle')) {
    const s = document.createElement('style');
    s.id = 'bounceStyle';
    s.textContent = '@keyframes bounce{0%,100%{transform:translateY(0)}50%{transform:translateY(-5px)}}';
    document.head.appendChild(s);
  }

  function getAIResponse(msg) {
    const m = msg.toLowerCase();
    if (typeof AI_RESPONSES === 'undefined') return 'Ask me anything about data analysis!';
    if (m.includes('vlookup') || m.includes('lookup'))               return AI_RESPONSES.vlookup;
    if (m.includes('join') && (m.includes('sql') || m.includes('query'))) return AI_RESPONSES.join;
    if (m.includes('p-value') || m.includes('p value') || m.includes('pvalue') || m.includes('significance')) return AI_RESPONSES.pvalue;
    if (m.includes('pandas') || m.includes('dataframe') || m.includes('python') || m.includes('numpy')) return AI_RESPONSES.pandas;
    if (m.includes('career') || m.includes('skill') || m.includes('job') || m.includes('analyst')) return AI_RESPONSES.career || AI_RESPONSES.default;
    if (m.includes('correlation') || m.includes('causation')) return AI_RESPONSES.correlation || AI_RESPONSES.default;
    return AI_RESPONSES.default;
  }

  function renderMarkdown(text) {
    return text
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/```(\w+)?\n?([\s\S]*?)```/g, '<pre><code>$2</code></pre>')
      .replace(/`([^`\n]+)`/g, '<code>$1</code>')
      .replace(/\n/g, '<br>');
  }

  function addMessage(text, isUser = false) {
    const div = document.createElement('div');
    div.className = `chat-msg ${isUser ? 'user' : 'ai'}`;
    div.innerHTML = `
      <div class="chat-msg-avatar">${isUser ? 'AS' : '🤖'}</div>
      <div class="chat-msg-bubble">${isUser ? text : renderMarkdown(text)}</div>
    `;
    chatArea.appendChild(div);
    chatArea.scrollTop = chatArea.scrollHeight;
  }

  function showTyping() {
    const div = document.createElement('div');
    div.className = 'chat-msg ai'; div.id = 'typingBubble';
    div.innerHTML = `
      <div class="chat-msg-avatar">🤖</div>
      <div class="chat-msg-bubble" style="padding:12px 16px">
        <div style="display:flex;gap:5px;align-items:center">
          <div style="width:7px;height:7px;border-radius:50%;background:var(--accent-teal);animation:bounce 1s infinite 0s"></div>
          <div style="width:7px;height:7px;border-radius:50%;background:var(--accent-teal);animation:bounce 1s infinite 0.2s"></div>
          <div style="width:7px;height:7px;border-radius:50%;background:var(--accent-teal);animation:bounce 1s infinite 0.4s"></div>
        </div>
      </div>
    `;
    chatArea.appendChild(div);
    chatArea.scrollTop = chatArea.scrollHeight;
    return div;
  }

  function sendMessage(text) {
    const msg = (text || input.value).trim();
    if (!msg) return;
    input.value = '';
    input.style.height = '42px';
    addMessage(msg, true);
    addXP(2, 'Asked DataMentor');
    const typing = showTyping();
    const delay  = 600 + Math.random() * 800;
    setTimeout(() => { typing.remove(); addMessage(getAIResponse(msg)); }, delay);
  }

  sendBtn?.addEventListener('click', () => sendMessage());
  input.addEventListener('keydown', e => {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendMessage(); }
  });
  input.addEventListener('input', () => {
    input.style.height = '42px';
    input.style.height = Math.min(input.scrollHeight, 160) + 'px';
  });
  document.querySelectorAll('.chat-suggestion-btn').forEach(btn => {
    btn.addEventListener('click', () => sendMessage(btn.dataset.msg || btn.textContent.replace(/^[^\w]+/, '')));
  });
}

// ─── Notes System ─────────────────────────────────────────────
function initNotes() {
  const editor = document.getElementById('notesEditor');
  if (!editor) return;

  // Load active note on startup
  const activeItem = document.querySelector('.notes-tree-item.active');
  if (activeItem) {
    const key   = activeItem.dataset.note;
    const saved = localStorage.getItem(`dp_note_${key}`);
    if (saved) editor.innerHTML = saved;
    // else keep the pre-written HTML in the editor
  }

  // Auto-save on input
  let saveTimer;
  editor.addEventListener('input', () => {
    clearTimeout(saveTimer);
    saveTimer = setTimeout(() => {
      const key = document.querySelector('.notes-tree-item.active')?.dataset.note || 'default';
      localStorage.setItem(`dp_note_${key}`, editor.innerHTML);
      const st = document.getElementById('saveStatus');
      if (st) { st.textContent = 'Saved ✓'; st.style.color = 'var(--accent-teal)'; setTimeout(() => { st.textContent = 'Auto-saved'; st.style.color = ''; }, 1500); }
    }, 800);
  });

  // Tree navigation
  document.querySelectorAll('.notes-tree-item').forEach(item => {
    item.addEventListener('click', () => {
      // Save current note
      const curKey = document.querySelector('.notes-tree-item.active')?.dataset.note;
      if (curKey) localStorage.setItem(`dp_note_${curKey}`, editor.innerHTML);

      document.querySelectorAll('.notes-tree-item').forEach(i => i.classList.remove('active'));
      item.classList.add('active');

      const key   = item.dataset.note;
      const saved = localStorage.getItem(`dp_note_${key}`);
      editor.innerHTML = saved || item.dataset.default || '<p>Start taking notes here…</p>';

      const titleEl = document.getElementById('noteTitle');
      if (titleEl) titleEl.textContent = item.querySelector('span, .note-label')?.textContent.trim() || item.textContent.trim();
    });
  });

  // Toolbar — use execCommand (still works in most browsers for rich text)
  document.querySelectorAll('.toolbar-btn[data-cmd]').forEach(btn => {
    btn.addEventListener('click', () => {
      editor.focus();
      const cmd = btn.dataset.cmd;
      const val = btn.dataset.val || null;
      // formatBlock needs angle brackets
      const actualVal = (cmd === 'formatBlock' && val && !val.startsWith('<')) ? `<${val}>` : val;
      try { document.execCommand(cmd, false, actualVal); } catch(e) {}
    });
  });
}

// ─── Interview Questions ──────────────────────────────────────
function buildInterviewQuestions(containerId, category = 'technical') {
  const container = document.getElementById(containerId);
  if (!container || typeof INTERVIEW_QS === 'undefined') return;

  const questions = INTERVIEW_QS[category] || [];
  if (questions.length === 0) {
    container.innerHTML = '<div style="padding:20px;text-align:center;color:var(--text-muted)">No questions in this category yet.</div>';
    return;
  }

  container.innerHTML = questions.map(q => `
    <div class="question-accordion">
      <div class="accordion-header" onclick="toggleAccordion(this)">
        <span class="badge badge-${q.difficulty==='Beginner'?'green':q.difficulty==='Intermediate'?'yellow':'orange'}" style="flex-shrink:0">${q.difficulty}</span>
        <span class="accordion-title">${q.q}</span>
        <span class="badge badge-purple" style="flex-shrink:0;font-size:10px">${q.topic}</span>
        <i class="fas fa-chevron-down accordion-icon" style="color:var(--text-muted);transition:transform 0.25s;flex-shrink:0"></i>
      </div>
      <div class="accordion-body">
        <p>${q.ans}</p>
        <div style="margin-top:12px;display:flex;gap:8px;flex-wrap:wrap">
          <button class="btn btn-ghost btn-sm" onclick="addXP(5,'Question practiced')"><i class="fas fa-check"></i> Practiced</button>
          <button class="btn btn-ghost btn-sm" onclick="this.innerHTML='<i class=\\'fas fa-bookmark\\'></i> Saved'"><i class="far fa-bookmark"></i> Save</button>
        </div>
      </div>
    </div>
  `).join('');
}

function toggleAccordion(header) {
  const body = header.nextElementSibling;
  const icon = header.querySelector('.accordion-icon');
  const open = body.classList.toggle('open');
  if (icon) icon.style.transform = open ? 'rotate(180deg)' : '';
}

// ─── Project Cards ────────────────────────────────────────────
function buildProjectCards(containerId) {
  const container = document.getElementById(containerId);
  if (!container || typeof PROJECTS === 'undefined') return;

  const statusBadge = { completed:'badge-green', 'in-progress':'badge-yellow', planned:'badge-gray' };
  const statusLabel = { completed:'✓ Completed', 'in-progress':'⟳ In Progress', planned:'○ Planned' };

  container.innerHTML = PROJECTS.map(p => `
    <div class="project-card">
      <div class="project-header">
        <div class="project-icon" style="background:${p.bg}">${p.icon}</div>
        <span class="badge ${statusBadge[p.status]}">${statusLabel[p.status]}</span>
      </div>
      <div class="project-title" style="margin-top:10px">${p.title}</div>
      <div class="project-desc">${p.desc}</div>
      <div class="project-tools">
        ${p.tools.map(t => `<span class="tool-pill">${t}</span>`).join('')}
      </div>
      <div style="margin-bottom:12px">
        <div class="text-xs text-muted mb-8">Key Outcomes:</div>
        ${p.outcomes.map(o => `
          <div style="font-size:12px;color:var(--text-secondary);padding:3px 0;display:flex;align-items:flex-start;gap:6px">
            <i class="fas fa-check-circle" style="color:var(--accent-teal);font-size:10px;margin-top:3px;flex-shrink:0"></i>${o}
          </div>
        `).join('')}
      </div>
      <div class="project-footer">
        <span class="badge badge-${p.difficulty==='Beginner'?'green':p.difficulty==='Intermediate'?'yellow':'orange'}">${p.difficulty}</span>
        ${p.status === 'completed'
          ? `<button class="btn btn-teal btn-sm" style="margin-left:auto" onclick="showToast('GitHub','Opening project…','info','🐙')"><i class="fab fa-github"></i> View Code</button>`
          : p.status === 'in-progress'
          ? `<button class="btn btn-primary btn-sm" style="margin-left:auto" onclick="addXP(50,'Project session logged')"><i class="fas fa-play"></i> Continue</button>`
          : `<button class="btn btn-ghost btn-sm" style="margin-left:auto" onclick="showToast('Locked','Complete the prerequisite course first','info','🔒')"><i class="fas fa-lock"></i> Locked</button>`
        }
      </div>
    </div>
  `).join('');
}

// ─── Achievements ─────────────────────────────────────────────
function buildAchievements(containerId) {
  const container = document.getElementById(containerId);
  if (!container || typeof ACHIEVEMENTS === 'undefined') return;
  container.innerHTML = ACHIEVEMENTS.map(a => `
    <div class="achievement-item ${a.earned ? 'earned' : 'locked'}" title="${a.desc}" onclick="${a.earned ? '' : "showToast('Locked','" + a.desc + "','info','🔒')"}">
      <div class="achievement-icon">${a.icon}</div>
      <div class="achievement-name">${a.name}</div>
      <div class="achievement-desc">${a.desc}</div>
      ${a.earned ? '<div style="margin-top:5px;font-size:10px;color:var(--accent-yellow);font-weight:700">✓ Earned</div>' : ''}
    </div>
  `).join('');
}

// ─── Leaderboard ─────────────────────────────────────────────
function buildLeaderboard(containerId) {
  const container = document.getElementById(containerId);
  if (!container || typeof LEADERBOARD === 'undefined') return;
  const medals = ['gold','silver','bronze'];
  const icons  = ['🥇','🥈','🥉'];
  container.innerHTML = LEADERBOARD.map((u, i) => `
    <div class="leaderboard-item" style="${u.you ? 'background:rgba(108,99,255,0.08);border-radius:8px' : ''}">
      <div class="rank-num ${medals[i] || ''}">${icons[i] || (i+1)}</div>
      <div class="lb-avatar" style="background:${u.bg}">${u.avatar}</div>
      <div class="lb-name ${u.you ? 'you' : ''}">${u.name}${u.you ? ' (You)' : ''}</div>
      <div class="lb-xp">${u.xp.toLocaleString()} XP</div>
    </div>
  `).join('');
}

// ─── Course Detail ────────────────────────────────────────────
function initCourseDetail() {
  const params   = new URLSearchParams(window.location.search);
  const courseId = params.get('id') || 'excel';
  if (typeof COURSES === 'undefined') return;

  const course = COURSES.find(c => c.id === courseId) || COURSES[0];

  document.querySelectorAll('.course-detail-title').forEach(el => el.textContent = course.title);
  document.querySelectorAll('.course-detail-emoji').forEach(el => el.textContent = course.emoji);
  document.querySelectorAll('.course-detail-bg').forEach(el => el.style.background = course.gradient);
  document.querySelectorAll('.course-detail-desc').forEach(el => el.textContent = course.description);

  // Inject style for module body animation
  if (!document.getElementById('moduleStyle')) {
    const s = document.createElement('style');
    s.id = 'moduleStyle';
    s.textContent = '.module-body{overflow:hidden;transition:max-height 0.35s ease}.module-body.open{max-height:2000px}.module-body:not(.open){max-height:0}';
    document.head.appendChild(s);
  }

  const curriculumEl = document.getElementById('curriculumList');
  if (!curriculumEl) return;

  curriculumEl.innerHTML = course.modules.map((mod) => `
    <div style="margin-bottom:10px;border:1px solid var(--border);border-radius:var(--radius);overflow:hidden">
      <div onclick="toggleModule(this)" style="display:flex;align-items:center;gap:10px;padding:14px 16px;background:var(--bg-input);cursor:pointer;user-select:none">
        <i class="fas fa-layer-group" style="color:var(--accent-purple);width:16px"></i>
        <span style="flex:1;font-size:13px;font-weight:700">${mod.title}</span>
        <span style="font-size:11px;color:var(--text-muted)">${mod.lessons.length} lessons</span>
        <i class="fas fa-chevron-down module-arrow" style="color:var(--text-muted);font-size:11px;transition:transform 0.3s;margin-left:6px"></i>
      </div>
      <div class="module-body open" style="max-height:2000px">
        ${mod.lessons.map(lesson => `
          <div class="lesson-item" onclick="completeLesson(this,'${lesson.title.replace(/'/g,'\\'')}')">
            <div class="lesson-check ${lesson.done ? 'done' : ''}">${lesson.done ? '<i class="fas fa-check" style="font-size:9px;color:white"></i>' : ''}</div>
            <div class="lesson-icon ${lesson.type}">
              <i class="fas fa-${lesson.type==='video'?'play':lesson.type==='quiz'?'question-circle':lesson.type==='project'?'rocket':'code'}"></i>
            </div>
            <div style="flex:1;min-width:0">
              <div class="lesson-title" style="font-size:13px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis">${lesson.title}</div>
              <div style="font-size:11px;color:var(--text-muted);text-transform:capitalize">${lesson.type}</div>
            </div>
            <div class="lesson-duration" style="flex-shrink:0">${lesson.duration}</div>
            ${lesson.type === 'quiz' ? `
              <button class="btn btn-primary btn-sm" style="margin-left:8px;flex-shrink:0" onclick="event.stopPropagation();startQuiz('${courseId}','${lesson.title.replace(/'/g,'\\'')}')">
                <i class="fas fa-play"></i>
              </button>
            ` : ''}
          </div>
        `).join('')}
      </div>
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
  initCounters();
  animateProgressBars();
  updateDailyGoal();

  // Charts after full load (Chart.js may not be ready yet at DOMContentLoaded)
  const tryCharts = () => typeof Chart !== 'undefined' ? initCharts() : setTimeout(tryCharts, 200);
  tryCharts();

  const page = window.location.pathname.split('/').pop() || 'index.html';

  if (page === 'index.html' || page === '') {
    generateHeatmap('studyHeatmap', 90);
    buildLeaderboard('leaderboardList');
    buildAchievements('achievementsMini');
  }
  if (page === 'roadmap.html')      buildRoadmap('roadmapContainer');
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
  if (page === 'course-detail.html') initCourseDetail();
  if (page === 'assistant.html')      initChat();
  if (page === 'notes.html')          initNotes();
  if (page === 'projects.html') {
    buildProjectCards('projectGrid');
    buildAchievements('achievementsGrid');
  }
  if (page === 'progress.html') {
    generateHeatmap('progressHeatmap', 90);
  }
  if (page === 'interview.html') {
    buildInterviewQuestions('interviewQList', 'technical');
    buildInterviewQuestions('behavioralQList', 'behavioral');
  }

  if (!sessionStorage.getItem('welcomed')) {
    sessionStorage.setItem('welcomed', '1');
    setTimeout(() => showToast('Welcome back! 👋', '12-day streak — keep it up! 🔥', 'achievement', '🔥'), 1500);
  }
});
