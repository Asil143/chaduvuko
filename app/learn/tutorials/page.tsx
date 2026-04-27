'use client'

import { useState } from 'react'
import Link from 'next/link'

// ─── ALL SUBJECTS ─────────────────────────────────────────────────────────────
const subjects = [

  // ── TECHNOLOGY & IT — LIVE ─────────────────────────────────────────────────
  {
    cat: 'tech',
    badge: 'Data Engineering',
    title: 'Data Engineering',
    status: 'live',
    href: '/learn/data-engineering',
    desc: 'From zero to production-grade pipelines — batch, streaming, cloud storage, dbt, Spark. Built for the US job market.',
    pills: ['Pipelines', 'SQL', 'Python', 'Batch', 'Streaming', 'Spark', 'dbt'],
  },
  {
    cat: 'tech',
    badge: 'Azure',
    title: 'Microsoft Azure — ADF & Cloud',
    status: 'live',
    href: '/learn/azure/introduction',
    desc: 'Azure Data Factory, ADLS Gen2, Synapse, Databricks — full Azure cloud engineering track with real FreshCart projects.',
    pills: ['ADF', 'ADLS Gen2', 'Databricks', 'Synapse', 'Linked Services'],
  },
  {
    cat: 'tech',
    badge: 'AI & ML',
    title: 'AI & Machine Learning',
    status: 'live',
    href: '/learn/ai-ml',
    desc: 'Math & stats → Classical ML → Deep Learning → NLP → Computer Vision → GenAI → MLOps. One complete path from zero.',
    pills: ['Classical ML', 'Deep Learning', 'NLP', 'Computer Vision', 'MLOps', 'GenAI'],
  },
  {
    cat: 'tech',
    badge: 'AI & ML',
    title: 'Deep Learning',
    status: 'live',
    href: '/learn/ai-ml',
    desc: 'Neural networks, CNNs, RNNs, LSTMs, Transformers — with PyTorch and TensorFlow. Part of the AI & ML track.',
    pills: ['TensorFlow', 'PyTorch', 'Backprop', 'CNNs', 'Transformers'],
  },
  {
    cat: 'tech',
    badge: 'AI & ML',
    title: 'Generative AI / LLMs',
    status: 'live',
    href: '/learn/ai-ml',
    desc: 'RAG pipelines, LangChain, vector databases, prompt engineering, OpenAI API, HuggingFace. Part of the AI & ML track.',
    pills: ['LangChain', 'OpenAI', 'RAG', 'HuggingFace', 'Vector DBs'],
  },
  {
    cat: 'tech',
    badge: 'CS Core',
    title: 'Data Structures & Algorithms',
    status: 'live',
    href: '/learn/dsa',
    desc: 'Arrays, linked lists, stacks, queues, trees, graphs, sorting, DP — crack every technical coding round in India.',
    pills: ['Arrays', 'Trees', 'Graphs', 'Dynamic Programming', 'Sorting'],
  },
  {
    cat: 'tech',
    badge: 'CS Core',
    title: 'DBMS',
    status: 'live',
    href: '/learn/dbms',
    desc: 'ER diagrams, relational model, SQL, normalisation, ACID transactions, concurrency control — for campus and job interviews.',
    pills: ['ER Diagrams', 'Normalisation', 'ACID', 'Transactions', 'SQL'],
  },
  {
    cat: 'tech',
    badge: 'Interview',
    title: 'Interview Prep — All Roles',
    status: 'live',
    href: '/learn/interview',
    desc: 'Structured Q&A for every tech role — System Design, Coding Rounds, HR Round, Resume. FAANG to campus placements.',
    pills: ['System Design', 'Coding Rounds', 'HR Round', 'Resume', 'Behavioural'],
  },

  // ── TECHNOLOGY & IT — SOON ─────────────────────────────────────────────────
  // Data & Cloud
  {
    cat: 'tech',
    badge: 'AWS',
    title: 'Amazon Web Services',
    status: 'soon',
    href: '#',
    desc: 'S3, Glue, Redshift, Kinesis, Lambda, SageMaker — full AWS data and cloud engineering track.',
    pills: ['S3', 'Glue', 'Redshift', 'Lambda', 'Kinesis'],
  },
  {
    cat: 'tech',
    badge: 'GCP',
    title: 'Google Cloud Platform',
    status: 'soon',
    href: '#',
    desc: 'BigQuery, Dataflow, Pub/Sub, Composer, Vertex AI — GCP engineering from zero to production.',
    pills: ['BigQuery', 'Dataflow', 'Pub/Sub', 'Composer', 'Vertex AI'],
  },
  {
    cat: 'tech',
    badge: 'BI',
    title: 'Power BI & Tableau',
    status: 'soon',
    href: '#',
    desc: 'Dashboards, DAX, data storytelling, Tableau Desktop — the two tools every data analyst needs.',
    pills: ['Power BI', 'Tableau', 'DAX', 'Reports', 'Data Storytelling'],
  },
  // AI & ML soon
  {
    cat: 'tech',
    badge: 'AI & ML',
    title: 'Data Science',
    status: 'soon',
    href: '#',
    desc: 'Exploratory data analysis, statistical modelling, visualisation, and storytelling with Python.',
    pills: ['Pandas', 'Matplotlib', 'Stats', 'EDA', 'Seaborn'],
  },
  {
    cat: 'tech',
    badge: 'AI & ML',
    title: 'MLOps',
    status: 'soon',
    href: '#',
    desc: 'Deploy and monitor ML models in production — MLflow, Docker, Kubeflow, CI/CD for ML pipelines.',
    pills: ['MLflow', 'Docker', 'Kubeflow', 'CI/CD', 'Model Registry'],
  },
  // Programming
  {
    cat: 'tech',
    badge: 'Python',
    title: 'Python',
    status: 'soon',
    href: '#',
    desc: 'Zero to production Python — basics, OOP, FastAPI, testing, async programming. The most in-demand language in India.',
    pills: ['Basics', 'OOP', 'FastAPI', 'Testing', 'Async'],
  },
  {
    cat: 'tech',
    badge: 'Java',
    title: 'Java',
    status: 'soon',
    href: '#',
    desc: 'Core Java to Spring Boot microservices — Collections, JPA, Hibernate, Kafka, REST APIs.',
    pills: ['OOP', 'Collections', 'Spring Boot', 'JPA', 'Microservices'],
  },
  {
    cat: 'tech',
    badge: 'JavaScript',
    title: 'JavaScript',
    status: 'soon',
    href: '#',
    desc: 'Modern JS from fundamentals to advanced — ES6+, Async/Await, DOM, APIs, closures, prototypes.',
    pills: ['ES6+', 'Async/Await', 'DOM', 'Closures', 'APIs'],
  },
  {
    cat: 'tech',
    badge: 'TypeScript',
    title: 'TypeScript',
    status: 'soon',
    href: '#',
    desc: 'Typed JavaScript for production apps — Types, Interfaces, Generics, Utility Types, strict mode.',
    pills: ['Types', 'Interfaces', 'Generics', 'Utility Types', 'Strict Mode'],
  },
  {
    cat: 'tech',
    badge: 'C / C++',
    title: 'C / C++',
    status: 'soon',
    href: '#',
    desc: 'Systems programming and DSA foundation — Pointers, memory management, OOP, STL.',
    pills: ['Pointers', 'Memory Mgmt', 'OOP', 'STL', 'DSA'],
  },
  {
    cat: 'tech',
    badge: 'Go',
    title: 'Go (Golang)',
    status: 'soon',
    href: '#',
    desc: 'High-performance microservices with Go — Goroutines, channels, REST APIs, concurrency patterns.',
    pills: ['Goroutines', 'Channels', 'REST APIs', 'Concurrency', 'Microservices'],
  },
  {
    cat: 'tech',
    badge: 'Kotlin',
    title: 'Kotlin',
    status: 'soon',
    href: '#',
    desc: 'Android and JVM backend development — Coroutines, Jetpack Compose, Spring Boot with Kotlin.',
    pills: ['Coroutines', 'Jetpack', 'Spring Boot', 'Null Safety', 'Android'],
  },
  {
    cat: 'tech',
    badge: 'Bash',
    title: 'Bash / Shell Scripting',
    status: 'soon',
    href: '#',
    desc: 'Automate everything on Linux — scripts, cron jobs, file operations, pipelines for DevOps.',
    pills: ['Scripts', 'Cron Jobs', 'File Ops', 'Pipelines', 'Automation'],
  },
  // Web Dev
  {
    cat: 'tech',
    badge: 'Web Dev',
    title: 'HTML & CSS',
    status: 'soon',
    href: '#',
    desc: 'Web foundations done right — Semantic HTML, Flexbox, CSS Grid, Responsive Design, animations.',
    pills: ['Semantic HTML', 'Flexbox', 'CSS Grid', 'Responsive', 'Animations'],
  },
  {
    cat: 'tech',
    badge: 'Web Dev',
    title: 'React.js',
    status: 'soon',
    href: '#',
    desc: 'Component-based UI at production scale — Hooks, Context, Redux, React Query, Testing.',
    pills: ['Hooks', 'Context', 'Redux', 'React Query', 'Testing'],
  },
  {
    cat: 'tech',
    badge: 'Web Dev',
    title: 'Node.js',
    status: 'soon',
    href: '#',
    desc: 'JavaScript on the server side — Express, REST APIs, JWT Auth, WebSockets, file uploads.',
    pills: ['Express', 'REST APIs', 'JWT Auth', 'WebSockets', 'Middleware'],
  },
  {
    cat: 'tech',
    badge: 'Web Dev',
    title: 'Next.js',
    status: 'soon',
    href: '#',
    desc: 'Full-stack React with SSR and App Router — SSG, ISR, API Routes, Server Components.',
    pills: ['SSR', 'SSG', 'App Router', 'API Routes', 'Server Components'],
  },
  {
    cat: 'tech',
    badge: 'Web Dev',
    title: 'Angular',
    status: 'soon',
    href: '#',
    desc: 'Enterprise-grade frontend framework — Components, Services, RxJS, NgRx, Dependency Injection.',
    pills: ['Components', 'Services', 'RxJS', 'NgRx', 'DI'],
  },
  {
    cat: 'tech',
    badge: 'Web Dev',
    title: 'Django',
    status: 'soon',
    href: '#',
    desc: 'Python web framework for production — ORM, REST APIs, Auth, Celery, deployment on AWS.',
    pills: ['ORM', 'REST APIs', 'Auth', 'Celery', 'Deployment'],
  },
  {
    cat: 'tech',
    badge: 'Web Dev',
    title: 'Spring Boot',
    status: 'soon',
    href: '#',
    desc: 'Java enterprise application framework — REST, JPA, Spring Security, Kafka, Microservices.',
    pills: ['REST', 'JPA', 'Security', 'Kafka', 'Microservices'],
  },
  {
    cat: 'tech',
    badge: 'Web Dev',
    title: 'GraphQL',
    status: 'soon',
    href: '#',
    desc: 'API query language for modern apps — Schema, Resolvers, Apollo Client, Subscriptions.',
    pills: ['Schema', 'Resolvers', 'Apollo Client', 'Subscriptions', 'Federation'],
  },
  {
    cat: 'tech',
    badge: 'Web Dev',
    title: 'PHP & Laravel',
    status: 'soon',
    href: '#',
    desc: 'Server-side web with Laravel framework — Eloquent ORM, Blade templates, REST APIs.',
    pills: ['Laravel', 'Eloquent ORM', 'Blade', 'REST APIs', 'Auth'],
  },
  // DevOps
  {
    cat: 'tech',
    badge: 'DevOps',
    title: 'Docker',
    status: 'soon',
    href: '#',
    desc: 'Containerise every application — Images, Containers, Docker Compose, Registry, multi-stage builds.',
    pills: ['Images', 'Containers', 'Compose', 'Registry', 'Multi-stage'],
  },
  {
    cat: 'tech',
    badge: 'DevOps',
    title: 'Kubernetes',
    status: 'soon',
    href: '#',
    desc: 'Container orchestration at scale — Pods, Deployments, Services, Helm, EKS/AKS/GKE.',
    pills: ['Pods', 'Deployments', 'Helm', 'EKS/AKS/GKE', 'Ingress'],
  },
  {
    cat: 'tech',
    badge: 'DevOps',
    title: 'Terraform',
    status: 'soon',
    href: '#',
    desc: 'Infrastructure as Code — HCL, AWS/GCP/Azure, state management, modules, remote backends.',
    pills: ['HCL', 'AWS/GCP/Azure', 'State Mgmt', 'Modules', 'Remote Backend'],
  },
  {
    cat: 'tech',
    badge: 'DevOps',
    title: 'CI/CD Pipelines',
    status: 'soon',
    href: '#',
    desc: 'GitHub Actions, Jenkins, ArgoCD, GitOps — automate every step from code to production.',
    pills: ['GitHub Actions', 'Jenkins', 'ArgoCD', 'GitOps', 'Pipelines'],
  },
  {
    cat: 'tech',
    badge: 'DevOps',
    title: 'Linux',
    status: 'soon',
    href: '#',
    desc: 'Command line and system administration — Bash, file system, networking, permissions, processes.',
    pills: ['Bash', 'File System', 'Networking', 'Permissions', 'Processes'],
  },
  {
    cat: 'tech',
    badge: 'DevOps',
    title: 'Cybersecurity',
    status: 'soon',
    href: '#',
    desc: 'Ethical hacking and defence techniques — Penetration Testing, OWASP Top 10, SIEM, Networks.',
    pills: ['Pen Testing', 'OWASP', 'SIEM', 'Networks', 'Security Ops'],
  },
  // Databases
  {
    cat: 'tech',
    badge: 'Database',
    title: 'SQL & Databases',
    status: 'live',
    href: '/learn/sql',
    desc: 'The one skill every tech role needs — JOINs, Window Functions, Indexes, CTEs, query optimisation.',
    pills: ['JOINs', 'Window Functions', 'Indexes', 'CTEs', 'Query Optimisation'],
  },
  {
    cat: 'tech',
    badge: 'Database',
    title: 'PostgreSQL',
    status: 'soon',
    href: '#',
    desc: 'Advanced relational database mastery — JSONB, Full Text Search, Partitioning, Extensions, PL/pgSQL.',
    pills: ['JSONB', 'Full Text Search', 'Partitioning', 'Extensions', 'PL/pgSQL'],
  },
  {
    cat: 'tech',
    badge: 'Database',
    title: 'MongoDB',
    status: 'soon',
    href: '#',
    desc: 'NoSQL document database at scale — Aggregation Pipeline, Indexes, Atlas, Replication, Sharding.',
    pills: ['Aggregation', 'Indexes', 'Atlas', 'Replication', 'Sharding'],
  },
  {
    cat: 'tech',
    badge: 'Database',
    title: 'Redis',
    status: 'soon',
    href: '#',
    desc: 'In-memory caching and queuing — Caching Patterns, Pub/Sub, Sessions, Lua Scripting.',
    pills: ['Caching Patterns', 'Pub/Sub', 'Sessions', 'Lua Scripting', 'Streams'],
  },
  {
    cat: 'tech',
    badge: 'Database',
    title: 'Snowflake',
    status: 'soon',
    href: '#',
    desc: 'Cloud data warehouse platform — Schemas, Time Travel, Streams, Tasks, dbt Integration.',
    pills: ['Schemas', 'Time Travel', 'Streams', 'Tasks', 'dbt Integration'],
  },
  // CS Core soon
  {
    cat: 'tech',
    badge: 'CS Core',
    title: 'System Design',
    status: 'soon',
    href: '#',
    desc: 'Design scalable systems like a senior — HLD, LLD, Scalability, CAP Theorem, Trade-offs, real Indian company systems.',
    pills: ['HLD', 'LLD', 'Scalability', 'CAP Theorem', 'Trade-offs'],
  },
  {
    cat: 'tech',
    badge: 'CS Core',
    title: 'Operating Systems',
    status: 'soon',
    href: '#',
    desc: 'Processes, memory management, CPU scheduling, concurrency, deadlock — for campus placements and interviews.',
    pills: ['Processes', 'Memory Mgmt', 'Scheduling', 'IPC', 'Deadlock'],
  },
  {
    cat: 'tech',
    badge: 'CS Core',
    title: 'Computer Networks',
    status: 'soon',
    href: '#',
    desc: 'OSI and TCP/IP model, HTTP, DNS, routing, load balancers — for DevOps, backend, and campus prep.',
    pills: ['TCP/IP', 'HTTP/HTTPS', 'DNS', 'Load Balancers', 'Routing'],
  },
  // Mobile
  {
    cat: 'tech',
    badge: 'Mobile',
    title: 'Android Development',
    status: 'soon',
    href: '#',
    desc: 'Native Android with Kotlin — Jetpack Compose, MVVM, Room DB, Navigation, Coroutines.',
    pills: ['Kotlin', 'Jetpack Compose', 'MVVM', 'Room DB', 'Coroutines'],
  },
  {
    cat: 'tech',
    badge: 'Mobile',
    title: 'Flutter',
    status: 'soon',
    href: '#',
    desc: 'Cross-platform iOS and Android with Dart — Widgets, BLoC, Provider, Firebase, animations.',
    pills: ['Dart', 'Widgets', 'BLoC', 'Firebase', 'Animations'],
  },
  {
    cat: 'tech',
    badge: 'Mobile',
    title: 'React Native',
    status: 'soon',
    href: '#',
    desc: 'Mobile apps with JavaScript and React — Components, Navigation, Native Modules, Expo, Push Notifications.',
    pills: ['Components', 'Navigation', 'Native Modules', 'Expo', 'Push Notifications'],
  },
  // Testing
  {
    cat: 'tech',
    badge: 'Testing',
    title: 'Software Testing',
    status: 'soon',
    href: '#',
    desc: 'Manual testing foundation and SDLC — Test Cases, Bug Reporting, STLC, Agile QA, defect lifecycle.',
    pills: ['Test Cases', 'Bug Reporting', 'STLC', 'Agile QA', 'Defect Lifecycle'],
  },
  {
    cat: 'tech',
    badge: 'Testing',
    title: 'Selenium',
    status: 'soon',
    href: '#',
    desc: 'Web browser test automation — WebDriver, TestNG, Page Object Model, automation frameworks.',
    pills: ['WebDriver', 'TestNG', 'Page Object Model', 'Frameworks', 'CI Integration'],
  },
  {
    cat: 'tech',
    badge: 'Testing',
    title: 'API Testing',
    status: 'soon',
    href: '#',
    desc: 'Postman, REST Assured, Newman, API automation — contract testing, performance, CI integration.',
    pills: ['Postman', 'REST Assured', 'Newman', 'Contract Testing', 'Performance'],
  },
  // Interview prep soon
  {
    cat: 'tech',
    badge: 'Interview',
    title: 'Campus Placements',
    status: 'soon',
    href: '#',
    desc: 'Accenture, KPMG, Deloitte, Cognizant, Accenture — Aptitude, Technical Round, HR Round, Group Discussion.',
    pills: ['Aptitude', 'Technical Round', 'HR Round', 'Group Discussion', 'GD Tips'],
  },
  {
    cat: 'tech',
    badge: 'Interview',
    title: 'FAANG Prep',
    status: 'soon',
    href: '#',
    desc: 'Google, Amazon, Microsoft, Meta, Apple India — DSA patterns, System Design, Behavioural interviews.',
    pills: ['DSA Patterns', 'System Design', 'Behavioural', 'Coding Patterns', 'Mock Rounds'],
  },

  // ── SCHOOL — CLASS 5–10 ────────────────────────────────────────────────────
  { cat: 'school-basic', badge: 'Class 10', title: 'Mathematics', status: 'soon', href: '#', desc: 'Real numbers, polynomials, quadratic equations, arithmetic progressions, triangles, coordinate geometry, circles, statistics and probability.', pills: ['Real Numbers', 'Quadratic Equations', 'Triangles', 'Statistics'] },
  { cat: 'school-basic', badge: 'Class 10', title: 'Science', status: 'soon', href: '#', desc: 'Chemical reactions, acids bases and salts, metals and non-metals, life processes, control and coordination, light, electricity, magnetic effects.', pills: ['Chemistry', 'Biology', 'Physics', 'Life Processes'] },
  { cat: 'school-basic', badge: 'Class 9', title: 'Mathematics', status: 'soon', href: '#', desc: 'Number systems, polynomials, coordinate geometry, Euclid\'s geometry, lines and angles, triangles, quadrilaterals, circles, statistics.', pills: ['Number Systems', 'Polynomials', 'Triangles', 'Statistics'] },
  { cat: 'school-basic', badge: 'Class 8', title: 'Mathematics', status: 'soon', href: '#', desc: 'Rational numbers, linear equations, quadrilaterals, data handling, squares and square roots, cubes, algebraic expressions.', pills: ['Rational Numbers', 'Linear Equations', 'Quadrilaterals', 'Data Handling'] },
  { cat: 'school-basic', badge: 'Class 9', title: 'Science', status: 'soon', href: '#', desc: 'Matter, atoms and molecules, structure of the atom, the fundamental unit of life, tissues, motion, force and laws of motion.', pills: ['Matter', 'Atoms', 'Tissues', 'Motion'] },
  { cat: 'school-basic', badge: 'Class 10', title: 'History', status: 'soon', href: '#', desc: 'The rise of nationalism in Europe, nationalism in India, the making of a global world, the age of industrialisation, print culture.', pills: ['Nationalism', 'Industrialisation', 'Print Culture', 'Globalisation'] },
  { cat: 'school-basic', badge: 'Class 10', title: 'Geography', status: 'soon', href: '#', desc: 'Resources and development, forest and wildlife, water resources, agriculture, minerals and energy, manufacturing industries, transport.', pills: ['Resources', 'Agriculture', 'Manufacturing', 'Transport'] },

  // ── SCHOOL — CLASS 11–12 ──────────────────────────────────────────────────
  { cat: 'school-senior', badge: 'Class 11', title: 'Physics', status: 'soon', href: '#', desc: 'Physical world and measurement, kinematics, laws of motion, work energy and power, gravitation, thermodynamics, waves, oscillations.', pills: ['Kinematics', 'Laws of Motion', 'Thermodynamics', 'Waves'] },
  { cat: 'school-senior', badge: 'Class 12', title: 'Physics', status: 'soon', href: '#', desc: 'Electrostatics, current electricity, magnetic effects of current, EMI, alternating current, optics, dual nature, atoms, semiconductors.', pills: ['Electrostatics', 'Optics', 'Semiconductors', 'Atoms'] },
  { cat: 'school-senior', badge: 'Class 12', title: 'Chemistry', status: 'soon', href: '#', desc: 'Solid state, solutions, electrochemistry, chemical kinetics, surface chemistry, p-block, d-block, coordination compounds, biomolecules.', pills: ['Solid State', 'Electrochemistry', 'Kinetics', 'Biomolecules'] },
  { cat: 'school-senior', badge: 'Class 12', title: 'Mathematics', status: 'soon', href: '#', desc: 'Relations and functions, inverse trigonometry, matrices, determinants, continuity, applications of derivatives, integrals, differential equations, vectors, 3D geometry, probability.', pills: ['Matrices', 'Integrals', 'Differential Equations', 'Probability'] },
  { cat: 'school-senior', badge: 'Class 12', title: 'Biology', status: 'soon', href: '#', desc: 'Reproduction in organisms, genetics and evolution, biology in human welfare, biotechnology, ecology and environment.', pills: ['Genetics', 'Evolution', 'Biotechnology', 'Ecology'] },
  { cat: 'school-senior', badge: 'Class 12', title: 'Accountancy', status: 'soon', href: '#', desc: 'Partnership accounts, goodwill, admission and retirement of partners, dissolution, company accounts, financial statements analysis, cash flow.', pills: ['Partnership', 'Goodwill', 'Company Accounts', 'Cash Flow'] },

  // ── COMPETITIVE EXAMS ─────────────────────────────────────────────────────
  { cat: 'competitive', badge: 'JEE Mains', title: 'JEE Mains — Mathematics', status: 'soon', href: '#', desc: 'Complete JEE Mains Maths — sets, functions, complex numbers, matrices, sequences, limits, integrals, differential equations, vectors, probability.', pills: ['Complex Numbers', 'Matrices', 'Integrals', 'Vectors', 'Probability'] },
  { cat: 'competitive', badge: 'JEE Mains', title: 'JEE Mains — Physics', status: 'soon', href: '#', desc: 'JEE Mains Physics — all high-weightage chapters with concept clarity, formulae sheets, and previous year questions.', pills: ['Mechanics', 'Electrostatics', 'Optics', 'Modern Physics', 'Thermodynamics'] },
  { cat: 'competitive', badge: 'NEET', title: 'NEET — Biology', status: 'soon', href: '#', desc: 'NEET Biology — Class 11 and 12 complete syllabus. Botany and zoology with NCERT alignment and PYQs.', pills: ['Cell Biology', 'Genetics', 'Plant Physiology', 'Human Physiology', 'Ecology'] },
  { cat: 'competitive', badge: 'UPSC', title: 'UPSC — General Studies', status: 'soon', href: '#', desc: 'UPSC CSE Prelims and Mains GS — History, Geography, Polity, Economy, Environment, Science and Tech, Current Affairs.', pills: ['History', 'Polity', 'Economy', 'Environment', 'Current Affairs'] },
  { cat: 'competitive', badge: 'CAT', title: 'CAT — Quantitative Aptitude', status: 'soon', href: '#', desc: 'CAT Quant — Number theory, arithmetic, algebra, geometry, modern maths. Shortcut techniques and mock tests.', pills: ['Number Theory', 'Arithmetic', 'Algebra', 'Geometry', 'Mock Tests'] },

  // ── B.TECH / ENGINEERING ──────────────────────────────────────────────────
  { cat: 'btech', badge: 'Semester 3–4', title: 'Data Structures & Algorithms', status: 'soon', href: '/learn/dsa', desc: 'Arrays, linked lists, stacks, queues, trees, graphs, sorting, searching, dynamic programming — the complete B.Tech DSA syllabus.', pills: ['Arrays', 'Trees', 'Graphs', 'Dynamic Programming', 'Sorting'] },
  { cat: 'btech', badge: 'Semester 3', title: 'DBMS', status: 'soon', href: '/learn/dbms', desc: 'ER diagrams, relational model, SQL, normalisation, transactions, concurrency control, recovery — complete university syllabus.', pills: ['ER Diagrams', 'Normalisation', 'ACID', 'Transactions', 'SQL'] },
  { cat: 'btech', badge: 'Semester 4', title: 'Operating Systems', status: 'soon', href: '#', desc: 'Processes, threads, CPU scheduling, process synchronisation, deadlock, memory management, file systems.', pills: ['Processes', 'Threads', 'Scheduling', 'Memory Mgmt', 'File Systems'] },
  { cat: 'btech', badge: 'Semester 5', title: 'Computer Networks', status: 'soon', href: '#', desc: 'OSI and TCP/IP model, data link layer, MAC, IP addressing, routing, TCP, UDP, application layer protocols.', pills: ['OSI Model', 'TCP/IP', 'IP Addressing', 'Routing', 'Application Layer'] },
  { cat: 'btech', badge: 'Semester 1–2', title: 'Engineering Mathematics', status: 'soon', href: '#', desc: 'Linear algebra, calculus, differential equations, probability and statistics, complex analysis — complete B.Tech Maths.', pills: ['Linear Algebra', 'Calculus', 'Differential Equations', 'Probability', 'Statistics'] },
]

// ─── BADGE COLORS ─────────────────────────────────────────────────────────────
const badgeColor: Record<string, string> = {
  'Data Engineering': '#0078d4',
  'Azure': '#0078d4',
  'AI & ML': '#7b61ff',
  'CS Core': '#f97316',
  'Interview': '#00e676',
  'AWS': '#ff9900',
  'GCP': '#4285f4',
  'BI': '#f7c948',
  'Python': '#f7c948',
  'Java': '#f97316',
  'JavaScript': '#f7c948',
  'TypeScript': '#0078d4',
  'C / C++': '#888888',
  'Go': '#06b6d4',
  'Kotlin': '#8b5cf6',
  'Bash': '#00e676',
  'Web Dev': '#06b6d4',
  'DevOps': '#f97316',
  'Database': '#00e676',
  'Mobile': '#ec4899',
  'Testing': '#84cc16',
  'Class 10': '#0078d4',
  'Class 9': '#0078d4',
  'Class 8': '#0078d4',
  'Class 11': '#7b61ff',
  'Class 12': '#7b61ff',
  'JEE Mains': '#ff4757',
  'NEET': '#00e676',
  'UPSC': '#f97316',
  'CAT': '#8b5cf6',
  'Semester 3–4': '#0078d4',
  'Semester 3': '#0078d4',
  'Semester 4': '#0078d4',
  'Semester 5': '#0078d4',
  'Semester 1–2': '#0078d4',
}

// ─── FILTER TABS ──────────────────────────────────────────────────────────────
const filterTabs = [
  { key: 'all',          label: 'Everything' },
  { key: 'school-basic', label: 'Class 5–10' },
  { key: 'school-senior',label: 'Class 11–12' },
  { key: 'competitive',  label: 'Competitive Exams' },
  { key: 'btech',        label: 'B.Tech / Engineering' },
  { key: 'tech',         label: 'Technology & IT' },
]

export default function TutorialsPage() {
  const [activeTab, setActiveTab] = useState('all')

  const filtered = activeTab === 'all'
    ? subjects
    : subjects.filter(s => s.cat === activeTab)

  const liveCount = filtered.filter(s => s.status === 'live').length
  const totalCount = filtered.length

  return (
    <>
      {/* ── HEADER ── */}
      <div style={{ borderBottom: '1px solid var(--border)', padding: '48px 28px 32px', maxWidth: 1100, margin: '0 auto' }}>
        <p style={{ fontSize: 10, fontWeight: 700, letterSpacing: '.12em', textTransform: 'uppercase', color: 'var(--muted)', marginBottom: 10 }}>
          // All tutorials
        </p>
        <h1 style={{ fontSize: 'clamp(28px,4vw,48px)', fontWeight: 900, letterSpacing: '-2px', lineHeight: 1.1, marginBottom: 10 }}>
          One platform. Every subject.
        </h1>
        <p style={{ fontSize: 14, color: 'var(--muted)', maxWidth: 520, lineHeight: 1.75 }}>
          School curricula, competitive exams, B.Tech semesters, and every IT track — all in one place, structured from zero.
        </p>
      </div>

      {/* ── FILTER TABS ── */}
      <div style={{ borderBottom: '1px solid var(--border)', background: 'var(--bg2)', position: 'sticky', top: 0, zIndex: 10 }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 28px', display: 'flex', gap: 0, overflowX: 'auto' }}>
          {filterTabs.map(tab => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              style={{
                padding: '14px 20px',
                fontSize: 13,
                fontWeight: activeTab === tab.key ? 700 : 500,
                color: activeTab === tab.key ? 'var(--text)' : 'var(--muted)',
                background: 'transparent',
                border: 'none',
                borderBottom: activeTab === tab.key ? '2px solid var(--green)' : '2px solid transparent',
                cursor: 'pointer',
                whiteSpace: 'nowrap',
                transition: 'color .15s',
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* ── SUBJECT COUNT ── */}
      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '20px 28px 10px' }}>
        <p style={{ fontSize: 12, color: 'var(--muted)' }}>
          Showing <strong style={{ color: 'var(--text)' }}>{totalCount}</strong> subjects
          {liveCount > 0 && (
            <> · <span style={{ color: 'var(--green)', fontWeight: 600 }}>{liveCount} live now</span></>
          )}
        </p>
      </div>

      {/* ── GRID ── */}
      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 28px 64px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 10 }}>
          {filtered.map((s, i) => {
            const color = badgeColor[s.badge] || 'var(--muted)'
            const isLive = s.status === 'live'
            const Card = (
              <div
                key={i}
                style={{
                  border: '1px solid var(--border)',
                  borderRadius: 12,
                  padding: '18px 16px',
                  background: 'var(--surface)',
                  transition: 'border-color .2s',
                  cursor: isLive ? 'pointer' : 'default',
                  opacity: isLive ? 1 : 0.85,
                }}
                onMouseEnter={e => { if (isLive) (e.currentTarget as HTMLDivElement).style.borderColor = 'var(--accent)' }}
                onMouseLeave={e => { if (isLive) (e.currentTarget as HTMLDivElement).style.borderColor = 'var(--border)' }}
              >
                {/* Top row */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 10 }}>
                  <span style={{
                    fontSize: 9, fontWeight: 700, padding: '2px 8px', borderRadius: 99,
                    background: `${color}18`, color: color,
                    textTransform: 'uppercase', letterSpacing: '.06em',
                  }}>
                    {s.badge}
                  </span>
                  <span style={{
                    fontSize: 8, fontWeight: 700, padding: '2px 6px', borderRadius: 99,
                    textTransform: 'uppercase', letterSpacing: '.06em',
                    background: isLive ? 'rgba(0,230,118,.15)' : 'rgba(255,255,255,.06)',
                    color: isLive ? 'var(--green)' : 'var(--muted)',
                  }}>
                    {isLive ? 'Live' : 'Soon'}
                  </span>
                </div>

                {/* Title */}
                <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--text)', marginBottom: 6, lineHeight: 1.3 }}>
                  {s.title}
                </div>

                {/* Desc */}
                <div style={{ fontSize: 11, color: 'var(--muted)', lineHeight: 1.6, marginBottom: 10 }}>
                  {s.desc}
                </div>

                {/* Pills */}
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
                  {s.pills.map(p => (
                    <span key={p} style={{
                      fontSize: 9, padding: '2px 7px', borderRadius: 3,
                      background: 'rgba(255,255,255,.05)', color: 'var(--muted)',
                      border: '1px solid var(--border)',
                    }}>
                      {p}
                    </span>
                  ))}
                </div>

                {/* Live arrow */}
                {isLive && (
                  <div style={{ marginTop: 10, fontSize: 10, fontWeight: 600, color: 'var(--green)' }}>
                    Start learning →
                  </div>
                )}
              </div>
            )

            return isLive
              ? <Link key={i} href={s.href} style={{ textDecoration: 'none' }}>{Card}</Link>
              : <div key={i}>{Card}</div>
          })}
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          div[style*="repeat(3, 1fr)"] { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (max-width: 520px) {
          div[style*="repeat(3, 1fr)"] { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </>
  )
}