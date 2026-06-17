// ============================================================
//   DataPath Pro — Platform Data
// ============================================================

const COURSES = [
  {
    id: 'excel',
    title: 'Excel for Data Analysis',
    emoji: '📊',
    gradient: 'linear-gradient(135deg,#1a6b2a,#0d4a1e)',
    difficulty: 'Beginner',
    diffClass: 'badge-green',
    duration: '4 weeks',
    lessons: 32,
    phase: 1,
    rating: 4.9,
    enrolled: 12400,
    description: 'Master Excel from basics to advanced data analysis techniques used by professional analysts.',
    skills: ['Pivot Tables','VLOOKUP','Data Cleaning','Charts','Power Query'],
    modules: [
      {
        title: 'Module 1: Excel Foundations',
        lessons: [
          { type:'video',  title:'Welcome & Excel Interface Tour',             duration:'8 min',  done:true  },
          { type:'video',  title:'Data Entry, Formatting & Navigation',        duration:'12 min', done:true  },
          { type:'code',   title:'Practice: Format a Sales Dataset',           duration:'20 min', done:true  },
          { type:'video',  title:'Essential Formulas: SUM, AVERAGE, COUNT',    duration:'15 min', done:true  },
          { type:'quiz',   title:'Quiz: Excel Basics',                         duration:'10 min', done:true  },
        ]
      },
      {
        title: 'Module 2: Power Functions',
        lessons: [
          { type:'video',  title:'VLOOKUP & HLOOKUP Deep Dive',               duration:'18 min', done:true  },
          { type:'video',  title:'INDEX-MATCH: The Superior Lookup',           duration:'16 min', done:false },
          { type:'code',   title:'Exercise: Employee Database Lookup',         duration:'25 min', done:false },
          { type:'video',  title:'IF, IFERROR, Nested IF Statements',         duration:'14 min', done:false },
          { type:'video',  title:'SUMIF, COUNTIF, AVERAGEIF Functions',       duration:'12 min', done:false },
          { type:'quiz',   title:'Quiz: Power Functions',                      duration:'15 min', done:false },
        ]
      },
      {
        title: 'Module 3: Pivot Tables & Charts',
        lessons: [
          { type:'video',   title:'Pivot Tables: Complete Guide',              duration:'22 min', done:false },
          { type:'video',   title:'Pivot Charts & Slicers',                   duration:'16 min', done:false },
          { type:'code',    title:'Exercise: Sales Analysis Pivot Table',      duration:'30 min', done:false },
          { type:'video',   title:'Data Visualization Best Practices',        duration:'18 min', done:false },
          { type:'project', title:'Mini Project: Revenue Dashboard',          duration:'2 hrs',  done:false },
        ]
      },
      {
        title: 'Module 4: Data Cleaning',
        lessons: [
          { type:'video',  title:'Text Functions: TRIM, CLEAN, LEFT, RIGHT',  duration:'14 min', done:false },
          { type:'video',  title:'Removing Duplicates & Handling Nulls',      duration:'12 min', done:false },
          { type:'video',  title:'Data Validation & Conditional Formatting',  duration:'16 min', done:false },
          { type:'code',   title:'Exercise: Clean a Messy Customer Dataset',  duration:'40 min', done:false },
        ]
      },
      {
        title: 'Module 5: Business Case Study & Final Project',
        lessons: [
          { type:'video',   title:'Business Case: Retail Chain KPI Analysis', duration:'25 min', done:false },
          { type:'project', title:'Final Project: Monthly Performance Report', duration:'4 hrs', done:false },
          { type:'quiz',    title:'Final Assessment (20 Questions)',           duration:'30 min', done:false },
        ]
      },
    ]
  },
  {
    id: 'statistics',
    title: 'Statistics for Data Analysis',
    emoji: '📈',
    gradient: 'linear-gradient(135deg,#1a3a6b,#0d204a)',
    difficulty: 'Beginner',
    diffClass: 'badge-green',
    duration: '4 weeks',
    lessons: 28,
    phase: 2,
    rating: 4.8,
    enrolled: 9800,
    description: 'Build a solid statistical foundation essential for data-driven business decisions.',
    skills: ['Descriptive Stats','Probability','Hypothesis Testing','Regression','A/B Testing'],
    modules: [
      { title:'Module 1: Descriptive Statistics', lessons:[
        { type:'video', title:'Mean, Median, Mode & Measures of Center',     duration:'14 min', done:false },
        { type:'video', title:'Variance, Standard Deviation & Spread',       duration:'16 min', done:false },
        { type:'video', title:'Data Distributions & Histograms',             duration:'18 min', done:false },
        { type:'quiz',  title:'Quiz: Descriptive Statistics',                duration:'10 min', done:false },
      ]},
      { title:'Module 2: Probability & Distributions', lessons:[
        { type:'video', title:'Probability Fundamentals',                    duration:'20 min', done:false },
        { type:'video', title:'Normal Distribution & Z-Scores',              duration:'18 min', done:false },
        { type:'video', title:'Binomial & Poisson Distributions',            duration:'16 min', done:false },
      ]},
      { title:'Module 3: Hypothesis Testing', lessons:[
        { type:'video', title:'Null vs Alternative Hypothesis',              duration:'15 min', done:false },
        { type:'video', title:'T-Tests & P-Values Explained',                duration:'22 min', done:false },
        { type:'video', title:'Chi-Square & ANOVA Tests',                    duration:'20 min', done:false },
        { type:'code',  title:'Business Case: A/B Test Analysis',            duration:'45 min', done:false },
      ]},
      { title:'Module 4: Regression Analysis', lessons:[
        { type:'video',   title:'Linear Regression Deep Dive',               duration:'25 min', done:false },
        { type:'video',   title:'Multiple Regression & Interpretation',      duration:'22 min', done:false },
        { type:'project', title:'Mini Project: Sales Forecasting Model',     duration:'2 hrs',  done:false },
        { type:'quiz',    title:'Final Assessment',                          duration:'25 min', done:false },
      ]},
    ]
  },
  {
    id: 'sql',
    title: 'SQL & Database Fundamentals',
    emoji: '🗄️',
    gradient: 'linear-gradient(135deg,#6b1a1a,#4a0d0d)',
    difficulty: 'Beginner',
    diffClass: 'badge-green',
    duration: '6 weeks',
    lessons: 45,
    phase: 3,
    rating: 4.9,
    enrolled: 15600,
    description: 'Master SQL from basics to advanced queries for business data extraction and analysis.',
    skills: ['SELECT','JOINs','Subqueries','Window Functions','CTEs','Query Optimization'],
    modules: [
      { title:'Module 1: SQL Foundations', lessons:[
        { type:'video', title:'Introduction to Databases & SQL',             duration:'12 min', done:false },
        { type:'video', title:'SELECT Statements & Filtering with WHERE',    duration:'18 min', done:false },
        { type:'code',  title:'Exercise: Query Customer Database',           duration:'20 min', done:false },
        { type:'video', title:'ORDER BY, LIMIT & DISTINCT',                 duration:'12 min', done:false },
        { type:'video', title:'Aggregate Functions: COUNT, SUM, AVG',       duration:'16 min', done:false },
        { type:'quiz',  title:'Quiz: SQL Basics',                           duration:'10 min', done:false },
      ]},
      { title:'Module 2: JOIN Operations', lessons:[
        { type:'video', title:'INNER JOIN, LEFT JOIN, RIGHT JOIN',          duration:'24 min', done:false },
        { type:'video', title:'FULL OUTER JOIN & CROSS JOIN',               duration:'16 min', done:false },
        { type:'code',  title:'Exercise: Multi-Table Sales Analysis',       duration:'35 min', done:false },
        { type:'video', title:'Subqueries & Nested Queries',                duration:'20 min', done:false },
      ]},
      { title:'Module 3: Advanced SQL', lessons:[
        { type:'video', title:'Window Functions: ROW_NUMBER, RANK, DENSE_RANK', duration:'22 min', done:false },
        { type:'video', title:'CTEs & Recursive Queries',                   duration:'20 min', done:false },
        { type:'video', title:'CASE Statements & Conditional Logic',        duration:'16 min', done:false },
        { type:'code',  title:'Business Case: E-commerce Revenue Analysis', duration:'1 hr',  done:false },
        { type:'project',title:'Final Project: Business Intelligence Queries',duration:'3 hrs', done:false },
        { type:'quiz',  title:'Final Assessment (20 Questions)',             duration:'30 min', done:false },
      ]},
    ]
  },
  {
    id: 'python',
    title: 'Python for Data Analysis',
    emoji: '🐍',
    gradient: 'linear-gradient(135deg,#1a4a1a,#0a2e0a)',
    difficulty: 'Intermediate',
    diffClass: 'badge-yellow',
    duration: '8 weeks',
    lessons: 60,
    phase: 4,
    rating: 4.9,
    enrolled: 18200,
    description: 'Learn Python with pandas, NumPy and real business datasets to automate analysis workflows.',
    skills: ['Python','Pandas','NumPy','Matplotlib','Seaborn','Data Wrangling'],
    modules: [
      { title:'Module 1: Python Foundations', lessons:[
        { type:'video', title:'Python Setup & Jupyter Notebooks',           duration:'15 min', done:false },
        { type:'video', title:'Variables, Data Types & Operations',         duration:'18 min', done:false },
        { type:'video', title:'Lists, Dictionaries & Control Flow',         duration:'22 min', done:false },
        { type:'code',  title:'Exercise: Python Business Calculator',       duration:'20 min', done:false },
        { type:'video', title:'Functions & Modules',                        duration:'18 min', done:false },
        { type:'quiz',  title:'Quiz: Python Basics',                       duration:'10 min', done:false },
      ]},
      { title:'Module 2: Pandas Deep Dive', lessons:[
        { type:'video', title:'DataFrames & Series Fundamentals',           duration:'25 min', done:false },
        { type:'video', title:'Loading Data: CSV, Excel, SQL Sources',      duration:'16 min', done:false },
        { type:'video', title:'Filtering, Selecting & Sorting Data',        duration:'20 min', done:false },
        { type:'video', title:'GroupBy & Aggregations',                     duration:'22 min', done:false },
        { type:'video', title:'Merging & Joining DataFrames',               duration:'24 min', done:false },
        { type:'code',  title:'Exercise: Sales Data Analysis Pipeline',     duration:'1 hr',  done:false },
      ]},
      { title:'Module 3: Data Cleaning with Python', lessons:[
        { type:'video', title:'Handling Missing Values',                    duration:'18 min', done:false },
        { type:'video', title:'Outlier Detection & Treatment',              duration:'20 min', done:false },
        { type:'video', title:'String Operations & Regex',                  duration:'16 min', done:false },
        { type:'code',  title:'Business Case: Clean Retail Dataset',        duration:'1.5 hr', done:false },
      ]},
      { title:'Module 4: NumPy & Statistical Analysis', lessons:[
        { type:'video', title:'NumPy Arrays & Operations',                  duration:'20 min', done:false },
        { type:'video', title:'Statistical Functions with NumPy',           duration:'18 min', done:false },
        { type:'project',title:'Mini Project: Market Basket Analysis',      duration:'3 hrs',  done:false },
        { type:'quiz',   title:'Final Assessment',                          duration:'30 min', done:false },
      ]},
    ]
  },
  {
    id: 'dataviz',
    title: 'Data Visualization',
    emoji: '🎨',
    gradient: 'linear-gradient(135deg,#4a1a6b,#2d0d4a)',
    difficulty: 'Intermediate',
    diffClass: 'badge-yellow',
    duration: '4 weeks',
    lessons: 30,
    phase: 5,
    rating: 4.7,
    enrolled: 11000,
    description: 'Create compelling visualizations that tell data stories and drive business decisions.',
    skills: ['Matplotlib','Seaborn','Plotly','Chart Design','Storytelling'],
    modules: [
      { title:'Module 1: Visualization Principles', lessons:[
        { type:'video', title:'Data-Ink Ratio & Design Principles',         duration:'20 min', done:false },
        { type:'video', title:'Choosing the Right Chart Type',              duration:'18 min', done:false },
        { type:'video', title:'Color Theory for Data Visualization',        duration:'14 min', done:false },
      ]},
      { title:'Module 2: Python Visualization Libraries', lessons:[
        { type:'video', title:'Matplotlib: Complete Guide',                 duration:'28 min', done:false },
        { type:'video', title:'Seaborn: Statistical Visualizations',        duration:'24 min', done:false },
        { type:'video', title:'Plotly: Interactive Charts',                 duration:'22 min', done:false },
        { type:'code',  title:'Business Case: Executive Dashboard',         duration:'2 hrs',  done:false },
        { type:'project',title:'Final Project: Visual Business Report',     duration:'4 hrs',  done:false },
        { type:'quiz',  title:'Final Assessment',                           duration:'20 min', done:false },
      ]},
    ]
  },
  {
    id: 'powerbi',
    title: 'Power BI',
    emoji: '⚡',
    gradient: 'linear-gradient(135deg,#1a3d6b,#0d2540)',
    difficulty: 'Intermediate',
    diffClass: 'badge-yellow',
    duration: '4 weeks',
    lessons: 35,
    phase: 6,
    rating: 4.9,
    enrolled: 13500,
    description: 'Build professional business intelligence dashboards with Power BI from scratch.',
    skills: ['Power Query','DAX','Data Modeling','Reports','Dashboards'],
    modules: [
      { title:'Module 1: Power BI Fundamentals', lessons:[
        { type:'video', title:'Power BI Desktop Interface',                 duration:'16 min', done:false },
        { type:'video', title:'Connecting to Data Sources',                 duration:'20 min', done:false },
        { type:'video', title:'Power Query: Data Transformation',          duration:'28 min', done:false },
      ]},
      { title:'Module 2: DAX Language', lessons:[
        { type:'video', title:'DAX Fundamentals & Calculated Columns',      duration:'22 min', done:false },
        { type:'video', title:'Measures & Aggregations in DAX',             duration:'24 min', done:false },
        { type:'video', title:'Time Intelligence Functions',                duration:'20 min', done:false },
        { type:'code',  title:'Exercise: Sales KPI Dashboard',              duration:'1.5 hr', done:false },
      ]},
      { title:'Module 3: Advanced Reports', lessons:[
        { type:'video',   title:'Data Modeling & Relationships',            duration:'22 min', done:false },
        { type:'video',   title:'Advanced Visualizations & Custom Visuals', duration:'20 min', done:false },
        { type:'video',   title:'Row-Level Security & Sharing',             duration:'16 min', done:false },
        { type:'project', title:'Final Project: Executive BI Dashboard',    duration:'5 hrs',  done:false },
        { type:'quiz',    title:'Final Assessment',                         duration:'30 min', done:false },
      ]},
    ]
  },
  {
    id: 'tableau',
    title: 'Tableau',
    emoji: '📉',
    gradient: 'linear-gradient(135deg,#5c1a1a,#3d0d0d)',
    difficulty: 'Intermediate',
    diffClass: 'badge-yellow',
    duration: '3 weeks',
    lessons: 25,
    phase: 7,
    rating: 4.8,
    enrolled: 8900,
    description: 'Create stunning interactive dashboards with Tableau for executive-level presentations.',
    skills: ['Tableau Desktop','Calculated Fields','Dashboard Design','Stories','Tableau Public'],
    modules: [
      { title:'Module 1: Tableau Essentials', lessons:[
        { type:'video', title:'Tableau Interface & Connecting Data',        duration:'18 min', done:false },
        { type:'video', title:'Dimensions, Measures & Chart Types',         duration:'22 min', done:false },
        { type:'video', title:'Filters, Groups & Sets',                    duration:'16 min', done:false },
        { type:'quiz',  title:'Quiz: Tableau Basics',                      duration:'10 min', done:false },
      ]},
      { title:'Module 2: Advanced Tableau', lessons:[
        { type:'video',   title:'Calculated Fields & LOD Expressions',      duration:'24 min', done:false },
        { type:'video',   title:'Dashboard Actions & Interactivity',        duration:'20 min', done:false },
        { type:'code',    title:'Business Case: Supply Chain Dashboard',    duration:'2 hrs',  done:false },
        { type:'project', title:'Final Project: Tableau Story',             duration:'4 hrs',  done:false },
        { type:'quiz',    title:'Final Assessment',                         duration:'20 min', done:false },
      ]},
    ]
  },
  {
    id: 'bizanalytics',
    title: 'Business Analytics',
    emoji: '💼',
    gradient: 'linear-gradient(135deg,#1a4a3a,#0d2e24)',
    difficulty: 'Advanced',
    diffClass: 'badge-orange',
    duration: '4 weeks',
    lessons: 30,
    phase: 8,
    rating: 4.8,
    enrolled: 7200,
    description: 'Apply analytics to solve real-world business problems and present insights to stakeholders.',
    skills: ['KPI Design','Business Case Studies','Stakeholder Communication','ROI Analysis','Strategy'],
    modules: [
      { title:'Module 1: Business Analytics Framework', lessons:[
        { type:'video', title:'Analytics Maturity Model',                   duration:'18 min', done:false },
        { type:'video', title:'Defining Business Questions & KPIs',         duration:'20 min', done:false },
        { type:'video', title:'Data-Driven Decision Making Framework',      duration:'22 min', done:false },
      ]},
      { title:'Module 2: Case Studies', lessons:[
        { type:'video', title:'Case Study: Retail Customer Churn Analysis', duration:'35 min', done:false },
        { type:'video', title:'Case Study: Marketing Campaign ROI',         duration:'30 min', done:false },
        { type:'video', title:'Case Study: Supply Chain Optimization',      duration:'32 min', done:false },
        { type:'code',  title:'Build: End-to-End Business Report',          duration:'3 hrs',  done:false },
        { type:'project',title:'Final Project: Business Recommendation',    duration:'4 hrs',  done:false },
        { type:'quiz',   title:'Final Assessment',                          duration:'25 min', done:false },
      ]},
    ]
  },
  {
    id: 'ml',
    title: 'Machine Learning Fundamentals',
    emoji: '🤖',
    gradient: 'linear-gradient(135deg,#1a1a6b,#0d0d4a)',
    difficulty: 'Advanced',
    diffClass: 'badge-orange',
    duration: '8 weeks',
    lessons: 55,
    phase: 9,
    rating: 4.8,
    enrolled: 10100,
    description: 'Learn supervised & unsupervised ML algorithms with business applications using Python.',
    skills: ['Scikit-learn','Regression','Classification','Clustering','Feature Engineering','Model Evaluation'],
    modules: [
      { title:'Module 1: ML Foundations', lessons:[
        { type:'video', title:'What is Machine Learning? Business Use Cases', duration:'20 min', done:false },
        { type:'video', title:'Supervised vs Unsupervised Learning',          duration:'18 min', done:false },
        { type:'video', title:'Train/Test Split & Cross Validation',          duration:'22 min', done:false },
        { type:'quiz',  title:'Quiz: ML Concepts',                            duration:'10 min', done:false },
      ]},
      { title:'Module 2: Supervised Learning', lessons:[
        { type:'video', title:'Linear & Logistic Regression with Scikit-learn', duration:'28 min', done:false },
        { type:'video', title:'Decision Trees & Random Forests',               duration:'26 min', done:false },
        { type:'video', title:'Support Vector Machines',                       duration:'20 min', done:false },
        { type:'code',  title:'Business Case: Customer Churn Prediction',      duration:'2 hrs',  done:false },
      ]},
      { title:'Module 3: Unsupervised Learning', lessons:[
        { type:'video', title:'K-Means Clustering',                          duration:'22 min', done:false },
        { type:'video', title:'Principal Component Analysis (PCA)',          duration:'20 min', done:false },
        { type:'code',  title:'Business Case: Customer Segmentation',        duration:'1.5 hr', done:false },
      ]},
      { title:'Module 4: Model Evaluation & Deployment', lessons:[
        { type:'video',   title:'Confusion Matrix, Precision, Recall, F1',  duration:'20 min', done:false },
        { type:'video',   title:'Feature Importance & Selection',           duration:'18 min', done:false },
        { type:'project', title:'Capstone: Predictive Sales Model',         duration:'6 hrs',  done:false },
        { type:'quiz',    title:'Final Assessment',                         duration:'30 min', done:false },
      ]},
    ]
  },
];

const QUIZ_BANK = {
  excel: [
    { q:'Which function returns a value from a table based on a lookup value in the first column?', opts:['VLOOKUP','INDEX','HLOOKUP','MATCH'], ans:0, explanation:'VLOOKUP (Vertical Lookup) searches the first column of a range and returns a value from a specified column in the same row.' },
    { q:'What does the CONCATENATE function do in Excel?', opts:['Joins text strings together','Counts cells with text','Converts numbers to text','Finds text in a string'], ans:0, explanation:'CONCATENATE joins two or more text strings into one. In modern Excel, use & or CONCAT instead.' },
    { q:'Which Excel feature allows you to summarize large datasets by dragging and dropping fields?', opts:['Pivot Table','SUMIF','Chart Wizard','Data Validation'], ans:0, explanation:'Pivot Tables are Excel\'s most powerful feature for summarizing, analyzing, exploring, and presenting data.' },
    { q:'What does INDEX(A1:D10, 3, 2) return?', opts:['Value in row 3, column 2 of the range','Sum of row 3','The 3rd cell in column 2','An error'], ans:0, explanation:'INDEX returns the value at the intersection of a specific row and column within a given range.' },
    { q:'Which function would you use to count cells that meet a specific criterion?', opts:['COUNTIF','COUNT','COUNTA','COUNTBLANK'], ans:0, explanation:'COUNTIF counts the number of cells in a range that meet a single criterion.' },
    { q:'What is the keyboard shortcut to create an Absolute Reference ($) in Excel?', opts:['F4','F2','Ctrl+$','Alt+F4'], ans:0, explanation:'Pressing F4 while in formula editing mode cycles through reference types: relative, absolute, and mixed.' },
    { q:'Power Query is used for:', opts:['Data transformation and cleaning','Creating charts','Writing macros','Sending emails'], ans:0, explanation:'Power Query (Get & Transform) is Excel\'s ETL tool for connecting, combining, and reshaping data.' },
    { q:'Which function combines INDEX and MATCH to replace VLOOKUP limitations?', opts:['INDEX(range,MATCH(value,col,0))','VLOOKUP with FALSE','HLOOKUP','OFFSET'], ans:0, explanation:'INDEX-MATCH can look left, is faster with large datasets, and doesn\'t break when columns are inserted.' },
    { q:'What does IFERROR do?', opts:['Returns a custom value if formula produces an error','Checks if a cell contains an error','Ignores errors in SUM','Highlights error cells'], ans:0, explanation:'IFERROR(value, value_if_error) returns the value_if_error when the first argument produces an error.' },
    { q:'A conditional formatting rule that highlights cells above average uses which type?', opts:['Top/Bottom Rules','Highlight Cell Rules','Data Bars','Color Scales'], ans:0, explanation:'Top/Bottom Rules in conditional formatting include options like "Above Average" to highlight relevant cells.' },
    { q:'What is the purpose of the TRIM function?', opts:['Removes extra spaces from text','Cuts a range of data','Trims decimal places','Removes rows'], ans:0, explanation:'TRIM removes all spaces from text except for single spaces between words — essential for data cleaning.' },
    { q:'Which chart type is best for showing trend over time?', opts:['Line Chart','Pie Chart','Bar Chart','Scatter Plot'], ans:0, explanation:'Line charts are ideal for displaying trends and changes in data over time intervals.' },
    { q:'SUMPRODUCT multiplies arrays and then:', opts:['Sums the products','Returns the maximum product','Counts non-zero products','Averages the products'], ans:0, explanation:'SUMPRODUCT multiplies corresponding components of arrays and returns the sum of those products.' },
    { q:'What does "Freeze Panes" do in Excel?', opts:['Locks rows/columns visible while scrolling','Protects cells from editing','Freezes formula calculation','Hides selected rows'], ans:0, explanation:'Freeze Panes keeps specific rows or columns visible as you scroll through large datasets.' },
    { q:'Which function returns the current date?', opts:['TODAY()','NOW()','DATE()','CURRENT()'], ans:0, explanation:'TODAY() returns the current date (without time). NOW() returns date and time.' },
    { q:'Data Validation is used to:', opts:['Restrict what can be entered in a cell','Validate formulas for errors','Check spelling','Verify chart data'], ans:0, explanation:'Data Validation controls the type of data users can enter, such as a dropdown list or number range.' },
    { q:'What is a Slicer in Excel?', opts:['Visual filter for Pivot Tables','A data cutting tool','A chart type','A macro command'], ans:0, explanation:'Slicers are visual filter controls that make it easy to filter Pivot Tables and charts interactively.' },
    { q:'The MATCH function returns:', opts:['The position of a value in a range','The value itself','A TRUE/FALSE result','The count of matches'], ans:0, explanation:'MATCH returns the relative position of an item in a range that matches a specified value.' },
    { q:'Power Pivot extends Excel with:', opts:['In-memory data model for millions of rows','3D visualization','VBA automation','Cloud storage'], ans:0, explanation:'Power Pivot uses the xVelocity engine to analyze millions of rows from multiple data sources in Excel.' },
    { q:'What does CTRL+SHIFT+ENTER do when entering an array formula?', opts:['Enters it as an array formula{}','Saves the workbook','Applies to entire column','Runs a macro'], ans:0, explanation:'In older Excel versions, Ctrl+Shift+Enter creates an array formula enclosed in {} curly braces.' },
  ],
  sql: [
    { q:'What does SELECT DISTINCT do in SQL?', opts:['Returns unique values only','Selects all rows','Sorts distinct values','Filters NULL values'], ans:0, explanation:'DISTINCT eliminates duplicate rows from the result set, returning only unique values.' },
    { q:'Which JOIN returns all rows from the left table even if no match exists on the right?', opts:['LEFT JOIN','INNER JOIN','RIGHT JOIN','CROSS JOIN'], ans:0, explanation:'LEFT JOIN (or LEFT OUTER JOIN) returns all rows from the left table and matching rows from the right table.' },
    { q:'What is a PRIMARY KEY?', opts:['Uniquely identifies each row in a table','Encrypts table data','Links to another table','Sorts the table'], ans:0, explanation:'A PRIMARY KEY is a column (or set of columns) that uniquely identifies each row in a database table.' },
    { q:'Which aggregate function returns the number of rows?', opts:['COUNT()','SUM()','AVG()','MAX()'], ans:0, explanation:'COUNT() counts the number of rows. COUNT(*) includes NULLs; COUNT(column) excludes NULLs.' },
    { q:'What does GROUP BY do?', opts:['Groups rows with same values for aggregate functions','Sorts data','Filters groups','Joins tables'], ans:0, explanation:'GROUP BY groups rows that have the same values in specified columns, enabling aggregate functions per group.' },
    { q:'HAVING clause is used to filter:', opts:['Groups after GROUP BY','Rows before GROUP BY','NULL values','Joined tables'], ans:0, explanation:'HAVING filters groups created by GROUP BY, similar to how WHERE filters rows.' },
    { q:'What is a CTE (Common Table Expression)?', opts:['A temporary named result set','A permanent table','A type of index','A stored procedure'], ans:0, explanation:'A CTE defined with WITH creates a temporary named result set that can be referenced within a SELECT, INSERT, UPDATE, or DELETE statement.' },
    { q:'Which window function assigns a unique sequential rank to each row?', opts:['ROW_NUMBER()','RANK()','DENSE_RANK()','NTILE()'], ans:0, explanation:'ROW_NUMBER() assigns a unique sequential integer to each row within a partition, with no gaps or ties.' },
    { q:'What does a FOREIGN KEY do?', opts:['Links two tables together referentially','Creates a unique index','Encrypts data','Speeds up queries'], ans:0, explanation:'A FOREIGN KEY creates a referential integrity constraint linking a column in one table to the PRIMARY KEY of another.' },
    { q:'Which SQL clause limits the number of rows returned?', opts:['LIMIT (MySQL) / TOP (SQL Server)','WHERE','HAVING','FETCH'], ans:0, explanation:'LIMIT (MySQL/PostgreSQL) or TOP (SQL Server) restricts the number of rows returned by a query.' },
    { q:'What does COALESCE do?', opts:['Returns the first non-NULL value','Combines strings','Counts NULL values','Converts data types'], ans:0, explanation:'COALESCE returns the first non-NULL value in a list of expressions — useful for handling missing data.' },
    { q:'UNION vs UNION ALL: what is the difference?', opts:['UNION removes duplicates; UNION ALL keeps all rows','UNION is faster','UNION ALL removes duplicates','No difference'], ans:0, explanation:'UNION combines results and removes duplicates (slower). UNION ALL combines all rows including duplicates (faster).' },
    { q:'What is an INDEX in SQL?', opts:['A structure that speeds up data retrieval','A backup of a table','A type of JOIN','A constraint'], ans:0, explanation:'An index is a data structure that improves the speed of data retrieval operations on a database table.' },
    { q:'Which statement is used to create a new table?', opts:['CREATE TABLE','MAKE TABLE','INSERT TABLE','NEW TABLE'], ans:0, explanation:'CREATE TABLE statement defines a new table\'s structure including column names, data types, and constraints.' },
    { q:'What does the CASE statement do?', opts:['Provides conditional logic in SQL','Creates a SWITCH case','Defines cases for triggers','Handles exceptions'], ans:0, explanation:'CASE evaluates conditions and returns a value when the first condition is met, similar to IF-THEN-ELSE logic.' },
    { q:'Which function removes leading/trailing spaces in SQL?', opts:['TRIM()','CLEAN()','STRIP()','REMOVE()'], ans:0, explanation:'TRIM() removes leading and trailing whitespace from a string.' },
    { q:'A subquery in SQL is:', opts:['A query nested within another query','A backup query','A simplified join','A stored query'], ans:0, explanation:'A subquery is a SELECT statement embedded within another SQL statement, used to filter or compute values.' },
    { q:'What does ORDER BY DESC do?', opts:['Sorts results from highest to lowest','Sorts alphabetically','Removes order','Filters descending values'], ans:0, explanation:'ORDER BY column DESC sorts query results in descending order (Z to A, or largest to smallest).' },
    { q:'Which JOIN type returns all rows from both tables?', opts:['FULL OUTER JOIN','INNER JOIN','LEFT JOIN','CROSS JOIN'], ans:0, explanation:'FULL OUTER JOIN returns all rows from both tables, with NULLs where there is no matching row.' },
    { q:'What is normalization in databases?', opts:['Organizing data to reduce redundancy','Compressing data','Encrypting tables','Indexing columns'], ans:0, explanation:'Normalization organizes database tables to reduce data redundancy and improve data integrity through normal forms (1NF, 2NF, 3NF).' },
  ],
  python: [
    { q:'What is the output of: print(type([1,2,3]))?', opts:["<class 'list'>",'list','[1,2,3]','3'], ans:0, explanation:'The type() function returns the data type of an object. A list literal returns <class \'list\'>.' },
    { q:'How do you import the pandas library?', opts:['import pandas as pd','import pandas','from pandas import pd','load pandas'], ans:0, explanation:'The conventional import alias for pandas is pd. This is the standard used across the data science community.' },
    { q:'Which pandas method shows the first 5 rows of a DataFrame?', opts:['df.head()','df.first()','df.top(5)','df.rows(5)'], ans:0, explanation:'df.head(n) returns the first n rows of a DataFrame. By default, n=5.' },
    { q:'How do you select a column named "Sales" from DataFrame df?', opts:["df['Sales'] or df.Sales",'df.get(Sales)','df[Sales]','df.col(Sales)'], ans:0, explanation:'You can select a column using bracket notation df[\'column\'] or dot notation df.column (if no spaces/special chars).' },
    { q:'What does df.isnull().sum() return?', opts:['Count of missing values per column','Sum of all values','Rows with nulls','True/False for each cell'], ans:0, explanation:'isnull() returns True for each missing value; .sum() counts the True values (NaN count) per column.' },
    { q:'Which method groups a DataFrame by a column?', opts:['df.groupby()','df.group()','df.aggregate()','df.split()'], ans:0, explanation:'groupby() splits data into groups based on column values, enabling aggregate operations on each group.' },
    { q:'How do you read a CSV file in pandas?', opts:['pd.read_csv("file.csv")','pd.load("file.csv")','pd.open("file.csv")','pd.get("file.csv")'], ans:0, explanation:'pd.read_csv() is the standard function for loading CSV files into a pandas DataFrame.' },
    { q:'What does .shape attribute return?', opts:['Tuple of (rows, columns)','List of column names','Total cell count','DataFrame dimensions string'], ans:0, explanation:'.shape returns a tuple (n_rows, n_cols) representing the dimensions of a DataFrame or array.' },
    { q:'Which function merges two DataFrames?', opts:['pd.merge()','pd.join()','pd.concat()','pd.combine()'], ans:0, explanation:'pd.merge() is the most flexible way to combine DataFrames, similar to SQL JOINs.' },
    { q:'What is a list comprehension in Python?', opts:['[expr for item in iterable]','A loop that creates lists','A list method','A sorting technique'], ans:0, explanation:'List comprehensions provide a concise way to create lists: [x*2 for x in range(10)] creates a list of doubled values.' },
    { q:'NumPy arrays are preferred over Python lists for data because:', opts:['Faster vectorized operations, less memory','They are easier to read','Support more data types','Built-in sorting'], ans:0, explanation:'NumPy arrays use contiguous memory blocks and C-level operations, making them 10-100x faster for numerical computation.' },
    { q:'How do you drop rows with missing values in pandas?', opts:['df.dropna()','df.remove_nulls()','df.clean()','df.drop_missing()'], ans:0, explanation:'df.dropna() removes rows (or columns with axis=1) containing any NaN values.' },
    { q:'What does df.describe() do?', opts:['Shows summary statistics','Describes column names','Prints DataFrame schema','Shows data types'], ans:0, explanation:'df.describe() generates summary statistics: count, mean, std, min, max, and quartiles for numeric columns.' },
    { q:'Which pandas method applies a function to each row or column?', opts:['df.apply()','df.map()','df.transform()','df.run()'], ans:0, explanation:'df.apply() applies a function along an axis of the DataFrame. Use axis=0 for columns, axis=1 for rows.' },
    { q:'How do you reset the DataFrame index?', opts:['df.reset_index()','df.reindex()','df.set_index(0)','df.index.reset()'], ans:0, explanation:'reset_index() resets the DataFrame index back to the default integer index (0, 1, 2...).' },
    { q:'What is the difference between .loc and .iloc?', opts:['.loc uses labels; .iloc uses integer positions','Both use labels','Both use positions','No difference'], ans:0, explanation:'.loc accesses data by label (column name, index label); .iloc accesses by integer position (row/column number).' },
    { q:'How do you fill missing values with a specific value?', opts:['df.fillna(value)','df.fill(value)','df.replace(NaN, value)','df.impute(value)'], ans:0, explanation:'df.fillna(value) replaces NaN values with the specified value (e.g., 0, mean, forward fill).' },
    { q:'Which library is used for machine learning in Python?', opts:['scikit-learn (sklearn)','ml-python','PyML','pylearn'], ans:0, explanation:'scikit-learn is Python\'s most popular ML library, providing consistent APIs for classification, regression, and clustering.' },
    { q:'What does pd.concat() do?', opts:['Concatenates DataFrames vertically or horizontally','Merges on a key','Joins with SQL-style logic','Appends one row'], ans:0, explanation:'pd.concat() concatenates DataFrames along a particular axis (rows with axis=0, columns with axis=1).' },
    { q:'A lambda function in Python is:', opts:['An anonymous single-expression function','A type of loop','A class method','A Python keyword'], ans:0, explanation:'Lambda functions are small anonymous functions: lambda x: x*2 is equivalent to def f(x): return x*2.' },
  ],
};

const ROADMAP_PHASES = [
  { phase:1, title:'Excel & Data Fundamentals', icon:'📊', weeks:'4 weeks', status:'completed', progress:100, skills:['Pivot Tables','VLOOKUP','Data Cleaning','Charts','Power Query'], color:'var(--accent-teal)', outcomes:'Analyze business data, build KPI reports, automate workflows' },
  { phase:2, title:'Statistics for Data Analysis', icon:'📈', weeks:'4 weeks', status:'active', progress:35, skills:['Descriptive Stats','Probability','Hypothesis Testing','Regression'], color:'var(--accent-purple)', outcomes:'Make data-driven decisions, validate business hypotheses' },
  { phase:3, title:'SQL & Database Fundamentals', icon:'🗄️', weeks:'6 weeks', status:'locked', progress:0, skills:['SELECT','JOINs','Window Functions','CTEs','Query Optimization'], color:'var(--accent-orange)', outcomes:'Extract insights from corporate databases, write complex queries' },
  { phase:4, title:'Python for Data Analysis', icon:'🐍', weeks:'8 weeks', status:'locked', progress:0, skills:['Pandas','NumPy','Data Wrangling','Automation','APIs'], color:'var(--accent-teal)', outcomes:'Automate analysis, process large datasets, build data pipelines' },
  { phase:5, title:'Data Visualization', icon:'🎨', weeks:'4 weeks', status:'locked', progress:0, skills:['Matplotlib','Seaborn','Plotly','Design Principles'], color:'var(--accent-pink)', outcomes:'Create compelling visual stories that influence business decisions' },
  { phase:6, title:'Power BI', icon:'⚡', weeks:'4 weeks', status:'locked', progress:0, skills:['Power Query','DAX','Data Modeling','Interactive Dashboards'], color:'var(--accent-yellow)', outcomes:'Build enterprise-grade BI dashboards for any business domain' },
  { phase:7, title:'Tableau', icon:'📉', weeks:'3 weeks', status:'locked', progress:0, skills:['Tableau Desktop','Calculated Fields','LOD Expressions','Stories'], color:'var(--accent-blue)', outcomes:'Create executive-level interactive visualizations for presentations' },
  { phase:8, title:'Business Analytics & Case Studies', icon:'💼', weeks:'4 weeks', status:'locked', progress:0, skills:['KPI Design','Business Cases','Stakeholder Reports','ROI Analysis'], color:'var(--accent-teal)', outcomes:'Solve complex business problems and present to C-level executives' },
  { phase:9, title:'Machine Learning Fundamentals', icon:'🤖', weeks:'8 weeks', status:'locked', progress:0, skills:['Scikit-learn','Regression','Classification','Clustering','Feature Engineering'], color:'var(--accent-purple)', outcomes:'Build predictive models for churn, sales forecasting, and segmentation' },
];

const PROJECTS = [
  { id:1, title:'Sales Performance Dashboard', icon:'📊', bg:'linear-gradient(135deg,#1a4a1a,#0d2e0d)', tools:['Excel','Power BI','DAX'], difficulty:'Beginner', status:'completed', desc:'Built an interactive dashboard tracking revenue, units sold, and regional performance for a retail chain with 50+ stores.', outcomes:['Dynamic KPI cards','YoY comparison charts','Regional heat map','Manager self-service report'], link:'#' },
  { id:2, title:'Customer Segmentation Analysis', icon:'👥', bg:'linear-gradient(135deg,#1a1a4a,#0d0d2e)', tools:['Python','SQL','Pandas','K-Means'], difficulty:'Intermediate', status:'completed', desc:'Segmented 50,000 customers into 5 distinct groups using RFM analysis and K-Means clustering, enabling targeted marketing campaigns.', outcomes:['RFM scoring model','5 customer segments identified','£2.4M revenue uplift potential','Executive presentation'], link:'#' },
  { id:3, title:'Market Basket Analysis', icon:'🛒', bg:'linear-gradient(135deg,#4a1a1a,#2e0d0d)', tools:['Python','Pandas','mlxtend','Matplotlib'], difficulty:'Intermediate', status:'in-progress', desc:'Analyzed transaction data from an e-commerce store to identify product associations and improve cross-selling recommendations.', outcomes:['Apriori algorithm implementation','Product affinity rules','Recommendation engine','Revenue impact analysis'], link:'#' },
  { id:4, title:'HR Analytics Dashboard', icon:'👔', bg:'linear-gradient(135deg,#1a3a4a,#0d2030)', tools:['Tableau','SQL','Excel'], difficulty:'Intermediate', status:'in-progress', desc:'Analyzed workforce data to identify retention risks, performance patterns, and diversity metrics for a 500-employee company.', outcomes:['Attrition prediction model','Department performance heatmap','Gender pay gap analysis','Recruiter self-service tool'], link:'#' },
  { id:5, title:'Predictive Sales Forecast', icon:'📈', bg:'linear-gradient(135deg,#2a1a4a,#1a0d2e)', tools:['Python','Scikit-learn','Statsmodels','Power BI'], difficulty:'Advanced', status:'planned', desc:'Built a time-series forecasting model to predict next quarter sales with 94% accuracy for a manufacturing company.', outcomes:['ARIMA & Random Forest models','Feature importance analysis','Confidence intervals','Integrated Power BI report'], link:'#' },
  { id:6, title:'E-commerce Analytics Pipeline', icon:'🛍️', bg:'linear-gradient(135deg,#1a4a3a,#0d2e24)', tools:['SQL','Python','Airflow','Tableau'], difficulty:'Advanced', status:'planned', desc:'Designed and built an end-to-end analytics pipeline processing 500K daily transactions for business intelligence reporting.', outcomes:['ETL pipeline design','Data warehouse schema','Automated daily reports','KPI alert system'], link:'#' },
];

const INTERVIEW_QS = {
  technical: [
    { q:'What is the difference between INNER JOIN and LEFT JOIN?', ans:'INNER JOIN returns only rows where there is a match in both tables. LEFT JOIN returns all rows from the left table plus matching rows from the right table. Unmatched right rows appear as NULL. Use LEFT JOIN when you want to keep all records from your primary table even if no match exists, for example keeping all customers even those with no orders.', difficulty:'Beginner', topic:'SQL' },
    { q:'Explain the difference between DELETE, TRUNCATE, and DROP in SQL.', ans:'DELETE removes specific rows (can use WHERE clause, is logged, can be rolled back). TRUNCATE removes all rows from a table quickly (cannot use WHERE, minimal logging, faster than DELETE). DROP removes the entire table structure and data permanently. For business use: use DELETE for selective removal, TRUNCATE to clear staging tables, DROP only to remove unused tables.', difficulty:'Intermediate', topic:'SQL' },
    { q:'What is a Window Function and give a business example?', ans:'Window functions perform calculations across a set of table rows related to the current row, without collapsing the result like GROUP BY. Example: SELECT salesperson, sales_amount, RANK() OVER (PARTITION BY region ORDER BY sales_amount DESC) as rank FROM sales — this ranks each salesperson within their region by sales amount, keeping all rows visible.', difficulty:'Intermediate', topic:'SQL' },
    { q:'How would you handle missing data in a pandas DataFrame?', ans:'Strategies depend on context: (1) Drop rows/columns: df.dropna() — use when data is sparse. (2) Fill with statistics: df.fillna(df.mean()) — use for numerical columns. (3) Forward/backward fill: df.ffill() — for time series. (4) Predictive imputation: use ML models. Always analyze the pattern of missingness first (MCAR, MAR, MNAR) before choosing a strategy.', difficulty:'Intermediate', topic:'Python' },
    { q:'Explain the bias-variance tradeoff in machine learning.', ans:'Bias is error from wrong assumptions (underfitting — model too simple). Variance is error from sensitivity to training data (overfitting — model too complex). High bias → misses true patterns. High variance → fits noise. The tradeoff: reducing bias increases variance and vice versa. Ideal models have low bias AND low variance. Regularization (L1/L2), cross-validation, and ensemble methods help find the sweet spot.', difficulty:'Advanced', topic:'ML' },
    { q:'What is the difference between mean, median, and mode? When would you use each?', ans:'Mean: arithmetic average, sensitive to outliers. Use for normally distributed data (e.g., average test scores). Median: middle value, robust to outliers. Use for skewed data (e.g., income, house prices). Mode: most frequent value. Use for categorical data (e.g., most common product category). Business rule: if your data has outliers or is skewed, prefer median over mean.', difficulty:'Beginner', topic:'Statistics' },
    { q:'How do you validate a machine learning model?', ans:'Key techniques: (1) Train/test split: hold out 20-30% for testing. (2) K-Fold Cross Validation: more robust estimate of model performance. (3) Metrics: Accuracy, Precision, Recall, F1 for classification; RMSE, MAE, R² for regression. (4) Confusion matrix: visualize TP, TN, FP, FN. (5) Learning curves: diagnose bias/variance. Never evaluate on training data — always on unseen data.', difficulty:'Intermediate', topic:'ML' },
    { q:'What is a p-value and what does p < 0.05 mean?', ans:'A p-value is the probability of observing results at least as extreme as your data, assuming the null hypothesis is true. p < 0.05 (5% significance level) means there is less than a 5% chance your result is due to random chance alone — so you reject the null hypothesis. It does NOT mean 95% probability the alternative is true. In business A/B testing, p < 0.05 suggests the treatment effect is statistically significant.', difficulty:'Intermediate', topic:'Statistics' },
    { q:'Explain VLOOKUP vs INDEX-MATCH with an example.', ans:'VLOOKUP: =VLOOKUP(A2, Products!A:C, 3, FALSE) — looks up A2 in column A of Products sheet, returns column 3. Limitations: can only look right, slow on large data, breaks if columns inserted. INDEX-MATCH: =INDEX(Products!C:C, MATCH(A2, Products!A:A, 0)) — more flexible: can look left, faster, robust to column insertions. Best practice: use INDEX-MATCH for production spreadsheets.', difficulty:'Beginner', topic:'Excel' },
    { q:'What is the difference between a data analyst and a data scientist?', ans:'Data Analyst: focuses on analyzing existing data to answer business questions, uses SQL, Excel, BI tools, basic Python/R statistics. Deliverables: reports, dashboards, insights. Data Scientist: builds predictive and prescriptive models, uses advanced ML/deep learning, requires strong programming and math. Deliverables: models, algorithms, data products. Many roles overlap — analysts increasingly use ML, scientists work on analytics.', difficulty:'Beginner', topic:'Career' },
  ],
  behavioral: [
    { q:'Tell me about a time you used data to influence a business decision.', ans:'STAR Method: Situation — describe the business challenge. Task — explain your analytical objective. Action — describe your methodology: what data you collected, cleaned, analyzed, and how you visualized insights. Result — quantify the business impact (e.g., "This analysis led to a 15% reduction in churn, saving £300K annually"). Always connect analysis to business outcomes.', difficulty:'Beginner', topic:'Behavioral' },
    { q:'How do you handle a stakeholder who disagrees with your analysis?', ans:'First, listen and understand their concern — they may have domain knowledge you lack. Then: (1) Walk through your methodology transparently. (2) Acknowledge limitations in your data or approach. (3) Offer to explore their hypothesis with data. (4) If data supports your conclusion, present sensitivity analysis showing results are robust. Build trust by being collaborative, not defensive.', difficulty:'Intermediate', topic:'Behavioral' },
    { q:'Describe how you approach a new data analysis project.', ans:'My framework: (1) Define the business question — what decision will this analysis inform? (2) Identify available data sources. (3) Explore and profile the data (EDA). (4) Clean and prepare the data. (5) Analyze and model. (6) Validate results. (7) Visualize and tell the story. (8) Present insights with actionable recommendations. Always start with the business context, not the data.', difficulty:'Beginner', topic:'Behavioral' },
    { q:'How do you prioritize multiple analysis requests from different stakeholders?', ans:'I use an impact vs effort matrix: (1) Quick wins — high impact, low effort: do immediately. (2) Major projects — high impact, high effort: schedule with stakeholders. (3) Low priority — low impact: defer or decline politely. I communicate timelines proactively and use a project tracking tool. For conflicting priorities, I escalate to my manager with a clear recommendation.', difficulty:'Intermediate', topic:'Behavioral' },
  ],
};

const ACHIEVEMENTS = [
  { icon:'🏆', name:'First Analysis',  desc:'Complete your first lesson',    earned:true  },
  { icon:'🔥', name:'7-Day Streak',    desc:'Study 7 days in a row',          earned:true  },
  { icon:'📊', name:'Excel Wizard',    desc:'Complete Excel course',           earned:true  },
  { icon:'🎯', name:'Perfect Score',   desc:'Get 100% on any quiz',            earned:true  },
  { icon:'🗄️', name:'SQL Ninja',       desc:'Complete SQL course',             earned:false },
  { icon:'🐍', name:'Python Rookie',   desc:'Write your first Python script',  earned:false },
  { icon:'⚡', name:'BI Builder',      desc:'Build first Power BI dashboard',  earned:false },
  { icon:'🤖', name:'ML Engineer',     desc:'Train your first ML model',       earned:false },
  { icon:'📝', name:'Note Taker',      desc:'Create 10 notes',                 earned:false },
  { icon:'💬', name:'Curious Mind',    desc:'Ask DataMentor 20 questions',     earned:false },
  { icon:'🌟', name:'Portfolio Star',  desc:'Complete 3 projects',             earned:false },
  { icon:'🎓', name:'Job Ready',       desc:'Complete all 9 courses',          earned:false },
];

const LEADERBOARD = [
  { name:'Sarah M.',    xp:8420, avatar:'SM', bg:'linear-gradient(135deg,#6c63ff,#a855f7)', you:false },
  { name:'Ahmad K.',    xp:7850, avatar:'AK', bg:'linear-gradient(135deg,#00d4aa,#0ea5e9)', you:false },
  { name:'You',         xp:6240, avatar:'AS', bg:'linear-gradient(135deg,#ff6b35,#f59e0b)', you:true  },
  { name:'Priya R.',    xp:5980, avatar:'PR', bg:'linear-gradient(135deg,#ff3d9a,#ec4899)', you:false },
  { name:'James L.',    xp:5120, avatar:'JL', bg:'linear-gradient(135deg,#3b82f6,#6366f1)', you:false },
];

const AI_RESPONSES = {
  'vlookup': `Great question! **VLOOKUP** (Vertical Lookup) searches for a value in the first column of a range and returns a value in the same row from another column.

**Syntax:** \`=VLOOKUP(lookup_value, table_array, col_index_num, [range_lookup])\`

**Business Example:**
Say you have a Sales table with Product IDs, and a Products sheet with Product ID → Product Name.

\`\`\`excel
=VLOOKUP(A2, Products!A:C, 2, FALSE)
\`\`\`

This looks up the value in A2, searches Products column A, and returns column 2 (Product Name).

**Pro tip:** Use \`FALSE\` for exact match (always recommended for business data).

However, INDEX-MATCH is more powerful — it can look left and is faster on large datasets! Want me to explain that next?`,

  'join': `There are 4 main types of SQL JOINs — here's a clear breakdown:

**1. INNER JOIN** — Only rows with matches in BOTH tables
\`\`\`sql
SELECT o.order_id, c.customer_name
FROM orders o
INNER JOIN customers c ON o.customer_id = c.id
\`\`\`

**2. LEFT JOIN** — All rows from left table + matching rows from right
\`\`\`sql
-- Keeps ALL customers, even those with no orders
SELECT c.customer_name, o.order_id
FROM customers c
LEFT JOIN orders o ON c.id = o.customer_id
\`\`\`

**3. RIGHT JOIN** — All rows from right table (less commonly used)

**4. FULL OUTER JOIN** — All rows from BOTH tables

**Business Rule:** Use LEFT JOIN when you need to keep all records from your main table (e.g., all customers, all products) even without matching records in the secondary table.`,

  'pvalue': `A **p-value** is one of the most misunderstood concepts in statistics. Let me explain it clearly:

**Definition:** The probability of observing your results (or more extreme) *if the null hypothesis were true*.

**p < 0.05 means:**
- Less than 5% chance your result is due to random chance
- You **reject** the null hypothesis
- The result is "statistically significant"

**Business Example (A/B Test):**
You change your website's CTA button color and measure conversions:
- Control (blue): 120/1000 = 12% conversion
- Treatment (green): 148/1000 = 14.8% conversion
- p-value = 0.023

Since p < 0.05 → the improvement is statistically significant. Go green! 🟢

**⚠️ Common mistakes:**
- p-value is NOT the probability your hypothesis is true
- Statistical significance ≠ practical significance
- Always report effect size alongside p-value`,

  'pandas': `Here's a **Pandas cheat sheet** for data analysis:

\`\`\`python
import pandas as pd
import numpy as np

# Load data
df = pd.read_csv('sales.csv')

# Explore
df.head()           # First 5 rows
df.shape            # (rows, columns)
df.info()           # Data types + nulls
df.describe()       # Summary statistics

# Select data
df['Revenue']           # Single column
df[['Revenue','Units']] # Multiple columns
df[df['Region']=='North']  # Filter rows
df.loc[0:5, 'Revenue']     # Label-based
df.iloc[0:5, 2]            # Position-based

# Clean data
df.dropna()                 # Drop nulls
df.fillna(df.mean())        # Fill with mean
df.drop_duplicates()        # Remove dupes

# Aggregate
df.groupby('Region')['Revenue'].sum()
df.groupby('Region').agg({'Revenue':'sum', 'Units':'mean'})

# Merge
pd.merge(df1, df2, on='customer_id', how='left')
\`\`\`

What specific pandas operation would you like me to explain further?`,

  'default': `I'm **DataMentor** 🤖 — your AI-powered data analysis coach!

I can help you with:
- 📊 **Excel** — formulas, pivot tables, VBA
- 🗄️ **SQL** — queries, joins, optimization
- 🐍 **Python** — pandas, numpy, matplotlib
- 📈 **Statistics** — hypothesis testing, regression
- ⚡ **Power BI** — DAX, data modeling
- 🤖 **Machine Learning** — algorithms, model evaluation
- 💼 **Career advice** — interview prep, CV tips

Try asking me:
- *"Explain VLOOKUP with a business example"*
- *"What's the difference between SQL JOIN types?"*
- *"Help me understand p-values"*
- *"Show me pandas code for data cleaning"*

What would you like to learn today?`
};

// Export for use in pages
if (typeof module !== 'undefined') {
  module.exports = { COURSES, QUIZ_BANK, ROADMAP_PHASES, PROJECTS, INTERVIEW_QS, ACHIEVEMENTS, LEADERBOARD, AI_RESPONSES };
}
