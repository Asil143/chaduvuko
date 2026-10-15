'use client'

import { useState } from 'react'
import Link from 'next/link'
import type { SiteStats, TrackSummaries } from '@/lib/lesson-nav'
import { PLANNED_TRACKS } from '@/data/planned-tracks'

type Cat = 'all' | 'data' | 'ai' | 'prog' | 'web' | 'cs' | 'itops' | 'security' | 'hardware' | 'enterprise' | 'product' | 'games'

const CATS: { id: Cat; label: string }[] = [
  { id: 'all',        label: 'All Tracks' },
  { id: 'data',       label: 'Data & Cloud' },
  { id: 'ai',         label: 'AI & ML' },
  { id: 'prog',       label: 'Programming' },
  { id: 'web',        label: 'Web Dev' },
  { id: 'cs',         label: 'CS Core' },
  { id: 'itops',      label: 'IT Ops & Networking' },
  { id: 'security',   label: 'Security & Privacy' },
  { id: 'hardware',   label: 'Hardware & Embedded' },
  { id: 'enterprise', label: 'Enterprise Platforms' },
  { id: 'product',    label: 'Product & Design' },
  { id: 'games',      label: 'Games & Spatial' },
]

const TRACK_PRIORITY = [
  'generative-ai',
  'agentic-ai',
  'python',
  'data-engineering',
  'cybersecurity',
  'ai-security',
  'aws',
  'azure',
  'gcp',
  'full-stack-ai',
  'devops-mlops',
  'ai-ml',
  'dsa',
  'sql',
  'mathematics',
  'dbms',
  'networking',
  'physics',
  'javascript',
  'java',
  'html-css',
  'systems-programming',
  'system-design',
  'data-science',
  'database-engineering',
  'analytics-engineering-data-analytics',
  'business-intelligence',
  'apache-kafka',
  'dbt',
  'snowflake',
  'sre-platform-engineering',
  'cloud-architecture-finops',
  'quality-engineering',
  'mobile-development',
  'it-support-systems-administration',
  'networking-telecommunications',
  'application-security-devsecops',
  'security-governance-risk-privacy',
  'data-governance-engineering',
  'accessibility-engineering',
  'technical-product-business-analysis',
  'enterprise-platforms',
  'technical-communication-developer-relations',
  'game-development-graphics',
  'embedded-iot',
  'semiconductor-digital-hardware',
  'robotics-autonomous-systems',
  'blockchain-smart-contracts',
  'xr-ar-vr-development',
  'programming-languages-compilers',
  'high-performance-scientific-computing',
  'applied-ai-specializations',
  'additional-language-pathways',
] as const

const trackPriorityRank = new Map<string, number>(TRACK_PRIORITY.map((slug, index) => [slug, index]))

const TRACKS = [
  // ── Data & Cloud ───────────────────────────────────────────────────────────
  {
    cat: 'data' as Cat,
    icon: '📁', color: '#00e676',
    name: 'Data Engineering',
    desc: 'Learn to ingest, transform, and serve batch and streaming data with SQL, Python, and layered lakehouse patterns. Follow how pipelines are designed, validated, and operated.',
    pills: ['Pipelines', 'Batch', 'Streaming', 'Medallion', 'SQL', 'Python'],
    jobs: 'Data Engineer · Analytics Engineer',
    track: 'data-engineering',
  },
  {
    cat: 'data' as Cat,
    icon: '📨', color: '#f97316',
    name: 'Apache Kafka',
    desc: 'Work with Kafka topics, partitions, producers, and consumer groups, then explore schemas, Kafka Connect, Kafka Streams, security, and operational trade-offs.',
    pills: ['Events', 'Topics', 'Consumers', 'Connect', 'Streams', 'Security'],
    jobs: 'Data Engineer · Backend Engineer · Platform Engineer',
    track: 'apache-kafka',
  },
  {
    cat: 'data' as Cat,
    icon: '☁️', color: '#0078d4',
    name: 'Microsoft Azure',
    desc: 'Explore Azure data and cloud services through practical patterns for storage, orchestration, processing, analytics, streaming, secrets, and governance.',
    pills: ['ADF', 'ADLS Gen2', 'Databricks', 'Synapse', 'Fabric', 'Event Hubs'],
    jobs: 'Cloud Engineer · Azure Data Engineer',
    track: 'azure',
  },
  {
    cat: 'data' as Cat,
    icon: '🟠', color: '#ff9900',
    name: 'Amazon Web Services',
    desc: 'Connect AWS storage, cataloging, ETL, warehousing, stream processing, querying, and orchestration services to understand common data-platform architectures.',
    pills: ['S3', 'Glue', 'Redshift', 'EMR', 'Kinesis', 'Athena'],
    jobs: 'AWS Developer · Cloud Engineer',
    track: 'aws',
  },
  {
    cat: 'data' as Cat,
    icon: '🔵', color: '#4285f4',
    name: 'Google Cloud Platform',
    desc: 'Use Google Cloud data services to reason about warehouse queries, stream and batch processing, messaging, storage, and workflow orchestration.',
    pills: ['BigQuery', 'Dataflow', 'Pub/Sub', 'Composer', 'Cloud Storage', 'Dataproc'],
    jobs: 'GCP Engineer · Data Engineer',
    track: 'gcp',
  },
  {
    cat: 'data' as Cat,
    icon: '🗄️', color: '#7b61ff',
    name: 'SQL & Databases',
    desc: 'Practice querying and shaping relational data with joins, CTEs, window functions, stored procedures, indexes, and query-plan analysis.',
    pills: ['JOINs', 'Window Functions', 'Indexes', 'CTEs', 'Stored Procs', 'Query Plans'],
    jobs: 'Data Analyst · Backend Dev · DBA',
    track: 'sql',
  },
  {
    cat: 'data' as Cat,
    icon: '📊', color: '#8b5cf6',
    name: 'Data Science',
    desc: 'Analyze a shared dataset with Python, NumPy, and pandas; use statistics and visualization to investigate questions and build introductory predictive models.',
    pills: ['pandas', 'NumPy', 'Statistics', 'Visualization', 'ML Basics', 'Data Cleaning'],
    jobs: 'Data Scientist · Data Analyst · BI Analyst',
    track: 'data-science',
  },
  // ── AI & ML ────────────────────────────────────────────────────────────────
  {
    cat: 'ai' as Cat,
    icon: '🤖', color: '#a855f7',
    name: 'AI & Machine Learning',
    desc: 'Study the foundations and workflows behind machine learning: data preparation, classical models, neural networks, evaluation, and an introduction to deployment.',
    pills: ['Classical ML', 'Deep Learning', 'NLP', 'Generative AI', 'MLOps', 'Model Evaluation'],
    jobs: 'ML Engineer · Data Scientist · AI Engineer',
    track: 'ai-ml',
  },
  {
    cat: 'ai' as Cat,
    icon: '✨', color: '#c084fc',
    name: 'Generative AI & LLM Engineering',
    desc: 'Build an understanding of LLM applications through model concepts, provider APIs, embeddings, retrieval-augmented generation, evaluation, and safety practices.',
    pills: ['LLM APIs', 'Embeddings', 'RAG', 'Evaluation', 'Agents', 'Production'],
    jobs: 'Generative AI Engineer · LLM Application Engineer',
    track: 'generative-ai',
  },
  // ── CS Core ────────────────────────────────────────────────────────────────
  {
    cat: 'cs' as Cat,
    icon: '🧮', color: '#f97316',
    name: 'Data Structures & Algorithms',
    desc: 'Learn to choose and analyze data structures and algorithms, from arrays and trees to graphs and dynamic programming, with complexity reasoning and practice.',
    pills: ['Arrays', 'Trees', 'Graphs', 'DP', 'Sorting', 'Complexity Analysis'],
    jobs: 'Big Tech · FAANG · Product Companies',
    track: 'dsa',
  },
  {
    cat: 'cs' as Cat,
    icon: '💾', color: '#06b6d4',
    name: 'DBMS',
    desc: 'Understand how relational databases represent data and preserve correctness through ER modeling, normalization, indexes, transactions, and concurrency control.',
    pills: ['ER Model', 'Normalization', 'ACID', 'Transactions', 'Indexes', 'SQL'],
    jobs: 'DBA · Backend Dev · Technical Interviews',
    track: 'dbms',
  },
  {
    cat: 'itops' as Cat,
    icon: '🌐', color: '#10b981',
    name: 'Networking',
    desc: 'Trace how devices communicate across network layers, IP addressing, routing, DNS, and HTTP, then examine firewalls, VPNs, and network security concepts.',
    pills: ['OSI Model', 'TCP/IP', 'DNS', 'HTTP/S', 'Firewalls', 'Routing'],
    jobs: 'Network Engineer · Cloud Architect · SRE',
    track: 'networking',
  },
  {
    cat: 'security' as Cat,
    icon: '🔒', color: '#ef4444',
    name: 'Cybersecurity',
    desc: 'Explore security fundamentals through web vulnerabilities, threat modeling, defensive monitoring, incident response, and introductory penetration-testing concepts.',
    pills: ['Pen Testing', 'OWASP', 'SIEM', 'Zero Trust', 'Incident Response', 'Vulnerability Analysis'],
    jobs: 'Security Analyst · SOC Analyst · Pen Tester',
    track: 'cybersecurity',
  },
  // ── Programming ────────────────────────────────────────────────────────────
  {
    cat: 'prog' as Cat,
    icon: '🐍', color: '#facc15',
    name: 'Python',
    desc: 'Write Python programs using core syntax, functions, collections, and object-oriented patterns; then work with testing, asynchronous code, and concurrency concepts.',
    pills: ['Syntax', 'OOP', 'Decorators', 'Async', 'Testing', 'Packages'],
    jobs: 'Backend Dev · ML Engineer · Data Analyst',
    track: 'python',
  },
  {
    cat: 'prog' as Cat,
    icon: '☕', color: '#f97316',
    name: 'Java',
    desc: 'Learn Java language and JVM fundamentals, collections and concurrency, then apply them to tested backend services with Spring, persistence, and messaging.',
    pills: ['OOP', 'Collections', 'Spring Boot', 'JPA', 'Kafka', 'Testing'],
    jobs: 'Java Dev · Backend Engineer',
    track: 'java',
  },
  {
    cat: 'prog' as Cat,
    icon: '💛', color: '#eab308',
    name: 'JavaScript',
    desc: 'Use JavaScript in the browser and runtime: language fundamentals, modules, DOM events, asynchronous programming, HTTP APIs, and TypeScript foundations.',
    pills: ['ES6+', 'Async/Await', 'DOM', 'Fetch API', 'Modules', 'TypeScript'],
    jobs: 'Frontend Dev · Full Stack Dev',
    track: 'javascript',
  },
  // ── Web Dev ────────────────────────────────────────────────────────────────
  {
    cat: 'web' as Cat,
    icon: '🌐', color: '#e34c26',
    name: 'HTML & CSS',
    desc: 'Structure pages with semantic HTML and style them with modern CSS, including layout, responsive design, visual states, and accessible interactions.',
    pills: ['Semantic HTML', 'Flexbox', 'CSS Grid', 'Responsive', 'Animations', 'Accessibility'],
    jobs: 'Frontend Dev · Web Developer',
    track: 'html-css',
  },
  {
    cat: 'web' as Cat,
    icon: '⚛️', color: '#38bdf8',
    name: 'React.js',
    desc: 'Build React interfaces from components and hooks, manage shared state, and practice testing, performance, and common application patterns.',
    pills: ['Components', 'Hooks', 'Context', 'Redux', 'Testing', 'Performance'],
    jobs: 'Frontend Dev · React Developer',
    track: 'full-stack-ai',
  },
  {
    cat: 'web' as Cat,
    icon: '🚀', color: '#ffffff',
    name: 'Next.js',
    desc: 'Create routed React applications with Next.js App Router, server and static rendering, route handlers, caching, and deployment workflows.',
    pills: ['App Router', 'SSR', 'SSG', 'API Routes', 'Caching', 'Deployment'],
    jobs: 'Full Stack Dev · Frontend Dev',
    track: 'full-stack-ai',
  },
  {
    cat: 'web' as Cat,
    icon: '🟢', color: '#6cc24a',
    name: 'Node.js',
    desc: 'Build server-side JavaScript services with Node.js and Express, covering middleware, REST endpoints, authentication, WebSockets, and testing.',
    pills: ['Express', 'REST APIs', 'JWT', 'WebSockets', 'Middleware', 'Testing'],
    jobs: 'Backend Dev · Full Stack Dev',
    track: 'full-stack-ai',
  },
  ...PLANNED_TRACKS
    .filter(track => !['generative-ai', 'java', 'javascript'].includes(track.slug))
    .map(track => ({
      cat: track.category ?? (
        track.area === 'ai' || track.area === 'security'
          ? 'ai'
          : track.area === 'cloud'
            ? 'data'
            : track.area === 'cs'
              ? 'cs'
              : track.slug === 'full-stack-ai'
                ? 'web'
                : 'prog'
      ) as Cat,
      icon: track.icon,
      color: track.color,
      name: track.title,
      desc: track.description,
      pills: (track.stages.find(stage => stage.title === 'Core Skills')?.skills ?? track.stages.flatMap(stage => stage.skills)).slice(0, 6),
      jobs: track.roles,
      track: track.slug,
    })),
]

// ─── BROWSE BY SKILL — granular, single-topic tutorials not already a Track above ──
const SKILLS = [
  // Programming
  { badge: 'TypeScript', title: 'TypeScript', track: 'javascript', desc: 'Add static types to JavaScript with interfaces, generics, narrowing, and compiler settings, then use them to model safer application code.', pills: ['Types', 'Interfaces', 'Generics', 'Utility Types', 'Strict Mode', 'Type Narrowing', 'Tooling'] },
  { badge: 'C / C++', title: 'C / C++', track: 'systems-programming', desc: 'Explore compiled systems programming through pointers, memory and resource management, standard libraries, object-oriented design, and debugging.', pills: ['Pointers', 'Memory Mgmt', 'OOP', 'STL', 'DSA', 'Compilation', 'Debugging'] },
  { badge: 'Go', title: 'Go (Golang)', track: 'systems-programming', desc: 'Write Go services using packages, explicit error handling, goroutines, channels, HTTP APIs, and concurrency tests.', pills: ['Goroutines', 'Channels', 'REST APIs', 'Concurrency', 'Microservices', 'Error Handling', 'Testing'] },
  { badge: 'Kotlin', title: 'Kotlin', track: 'systems-programming', desc: 'Use Kotlin language features, null safety, and coroutines across Android UI and JVM backend examples.', pills: ['Coroutines', 'Jetpack', 'Spring Boot', 'Null Safety', 'Android', 'JVM', 'Testing'] },
  { badge: 'Bash', title: 'Bash / Shell Scripting', track: 'devops-mlops', desc: 'Write maintainable shell scripts for files, processes, environment configuration, scheduled jobs, and repeatable operational tasks.', pills: ['Scripts', 'Cron Jobs', 'File Ops', 'Pipelines', 'Automation', 'Environment Variables', 'Exit Codes'] },
  // Web Dev
  { badge: 'Web Dev', title: 'Angular', track: 'full-stack-ai', desc: 'Structure Angular applications with components, dependency injection, routing, forms, RxJS streams, and managed state.', pills: ['Components', 'Services', 'RxJS', 'NgRx', 'DI', 'Routing', 'Forms'] },
  { badge: 'Web Dev', title: 'Django', track: 'full-stack-ai', desc: 'Build Python web applications with Django models, migrations, authentication, admin tools, REST endpoints, and background tasks.', pills: ['ORM', 'REST APIs', 'Auth', 'Celery', 'Deployment', 'Migrations', 'Admin'] },
  { badge: 'Web Dev', title: 'Spring Boot', track: 'java', desc: 'Create Java services with Spring Boot controllers, dependency injection, JPA persistence, authorization, testing, and messaging integrations.', pills: ['REST', 'JPA', 'Security', 'Kafka', 'Microservices', 'Dependency Injection', 'Testing'] },
  { badge: 'Web Dev', title: 'GraphQL', track: 'full-stack-ai', desc: 'Design typed GraphQL schemas and resolvers, then connect clients to queries, mutations, subscriptions, and federated services.', pills: ['Schema', 'Resolvers', 'Apollo Client', 'Subscriptions', 'Federation', 'Queries', 'Mutations'] },
  { badge: 'Web Dev', title: 'PHP & Laravel', track: 'full-stack-ai', desc: 'Build PHP web applications with Laravel routes, Blade views, Eloquent models, API authentication, migrations, and queues.', pills: ['Laravel', 'Eloquent ORM', 'Blade', 'REST APIs', 'Auth', 'Migrations', 'Queues'] },
  // DevOps
  { badge: 'DevOps', title: 'Docker', track: 'devops-mlops', desc: 'Build and run container images, define multi-service environments with Compose, manage volumes and networks, and publish images to registries.', pills: ['Images', 'Containers', 'Compose', 'Registry', 'Multi-stage', 'Volumes', 'Networking'] },
  { badge: 'DevOps', title: 'Kubernetes', track: 'devops-mlops', desc: 'Deploy containerized workloads with Pods, Deployments, Services, configuration, ingress, Helm, and managed cloud clusters.', pills: ['Pods', 'Deployments', 'Helm', 'EKS/AKS/GKE', 'Ingress', 'ConfigMaps', 'Autoscaling'] },
  { badge: 'DevOps', title: 'Terraform', track: 'devops-mlops', desc: 'Define cloud infrastructure declaratively, organize reusable modules, understand state and providers, and plan changes safely.', pills: ['HCL', 'AWS/GCP/Azure', 'State Mgmt', 'Modules', 'Remote Backend', 'Providers', 'Plan & Apply'] },
  { badge: 'DevOps', title: 'CI/CD Pipelines', track: 'devops-mlops', desc: 'Automate build, test, security checks, and release workflows, comparing GitHub Actions, Jenkins, Argo CD, and GitOps patterns.', pills: ['GitHub Actions', 'Jenkins', 'ArgoCD', 'GitOps', 'Pipelines', 'Builds', 'Deployments'] },
  { badge: 'DevOps', title: 'Linux', track: 'devops-mlops', desc: 'Navigate files and processes, manage users and permissions, inspect services and networking, and automate routine tasks from the shell.', pills: ['Bash', 'File System', 'Networking', 'Permissions', 'Processes', 'Users & Groups', 'Services'] },
  // Databases
  { badge: 'Database', title: 'PostgreSQL', track: 'database-engineering', desc: 'Work with PostgreSQL JSONB, full-text search, indexes, query plans, partitioning, extensions, and PL/pgSQL routines.', pills: ['JSONB', 'Full Text Search', 'Partitioning', 'Extensions', 'PL/pgSQL', 'Indexes', 'Query Plans'] },
  { badge: 'Database', title: 'MongoDB', track: 'database-engineering', desc: 'Model document data and query it with aggregation pipelines, indexes, transactions, replication, and sharding concepts.', pills: ['Aggregation', 'Indexes', 'Atlas', 'Replication', 'Sharding', 'Schema Design', 'Transactions'] },
  { badge: 'Database', title: 'Redis', track: 'database-engineering', desc: 'Choose Redis data structures and apply caching, expiration, Pub/Sub, streams, sessions, and scripting patterns.', pills: ['Caching Patterns', 'Pub/Sub', 'Sessions', 'Lua Scripting', 'Streams', 'TTL', 'Data Structures'] },
  { badge: 'Database', title: 'Snowflake', track:'snowflake', desc: 'Load and query warehouse data while exploring virtual warehouses, Time Travel, Streams and Tasks, dbt workflows, access controls, and cost usage.', pills: ['Warehouses', 'COPY INTO', 'Time Travel', 'Streams', 'Tasks', 'dbt', 'RBAC', 'Cost Controls'] },
  { badge: 'Data Engineering', title: 'dbt', track:'dbt', desc: 'Transform warehouse data with modular SQL models, sources, Jinja, tests, documentation, incremental builds, snapshots, and CI checks.', pills: ['Models', 'Jinja', 'Testing', 'Incremental', 'Snapshots', 'CI/CD', 'Sources', 'Documentation'] },
  // CS Core
  { badge: 'CS Core', title: 'System Design', track: 'system-design', desc: 'Turn product requirements into service boundaries, APIs, data stores, and scaling choices; explain caching, queues, consistency, and reliability trade-offs.', pills: ['HLD', 'LLD', 'Scalability', 'CAP Theorem', 'Trade-offs', 'Caching', 'Queues', 'Reliability'] },
  { badge: 'CS Core', title: 'Operating Systems', track: 'system-design', desc: 'Study how processes, threads, memory, scheduling, filesystems, and inter-process communication shape application behavior and performance.', pills: ['Processes', 'Memory Mgmt', 'Scheduling', 'IPC', 'Deadlock', 'Threads', 'File Systems'] },
  // Mobile
  { badge: 'Mobile', title: 'Android Development', track: 'mobile-development', desc: 'Build Android screens with Kotlin and Jetpack Compose, organize UI state, navigate between destinations, persist data with Room, and test lifecycle behavior.', pills: ['Kotlin', 'Jetpack Compose', 'MVVM', 'Room DB', 'Coroutines', 'Lifecycle', 'Gradle'] },
  { badge: 'Mobile', title: 'Flutter', track: 'mobile-development', desc: 'Create cross-platform interfaces in Dart with Flutter widgets, navigation, state management, animations, and service integrations.', pills: ['Dart', 'Widgets', 'BLoC', 'Firebase', 'Animations', 'State Management', 'Navigation'] },
  { badge: 'Mobile', title: 'React Native', track: 'mobile-development', desc: 'Build mobile interfaces with React Native, route between screens, use device capabilities, and deliver builds through Expo or native tooling.', pills: ['Components', 'Navigation', 'Native Modules', 'Expo', 'Push Notifications', 'State', 'Device APIs'] },
  // Testing
  { badge: 'Testing', title: 'Software Testing', track: 'quality-engineering', desc: 'Design test cases from requirements, report reproducible defects, prioritize risk, and plan regression coverage across a software lifecycle.', pills: ['Test Cases', 'Bug Reporting', 'STLC', 'Agile QA', 'Defect Lifecycle', 'Risk-Based Testing', 'Regression'] },
  { badge: 'Testing', title: 'Selenium', track: 'quality-engineering', desc: 'Automate browser workflows with WebDriver, stable locators, explicit waits, page objects, and CI test execution.', pills: ['WebDriver', 'TestNG', 'Page Object Model', 'Frameworks', 'CI Integration', 'Locators', 'Wait Strategies'] },
  { badge: 'Testing', title: 'API Testing', track: 'quality-engineering', desc: 'Validate HTTP APIs with requests, assertions, authentication, contract checks, collections, and automated runs in CI.', pills: ['Postman', 'REST Assured', 'Newman', 'Contract Testing', 'Performance', 'Assertions', 'Authentication'] },
  // Interview prep
  { badge: 'Interview', title: 'New Grad Interview Prep', desc: 'Prepare application materials, online assessments, recruiter calls, technical interviews, behavioral examples, offer evaluation, and negotiation.', pills: ['Online Assessment', 'Phone Screen', 'Technical Rounds', 'Behavioral', 'Offers', 'Resume Review', 'Negotiation'] },
  { badge: 'Interview', title: 'FAANG Prep', desc: 'Practice algorithmic coding, system-design explanations, and behavioral interviews commonly used by large product-focused engineering teams.', pills: ['DSA Patterns', 'System Design', 'Behavioural', 'Coding Patterns', 'Mock Rounds', 'Algorithms', 'Communication'] },
  // Data & BI
  { badge: 'BI', title: 'Power BI & Tableau', track: 'business-intelligence', desc: 'Prepare analytical data, define measures, design interactive Power BI or Tableau reports, and communicate patterns with clear visual choices.', pills: ['Power BI', 'Tableau', 'DAX', 'Reports', 'Data Storytelling', 'Semantic Models', 'Data Refresh'] },
  { badge: 'AI & ML', title: 'MLOps', track: 'devops-mlops', desc: 'Track experiments and model versions, package serving workflows, automate validation and release, and monitor model behavior after deployment.', pills: ['MLflow', 'Docker', 'Kubeflow', 'CI/CD', 'Model Registry', 'Model Serving', 'Drift Monitoring'] },
  { badge: 'AI & ML', title: 'Mathematics for AI', track: 'mathematics', desc: 'Connect vectors, matrices, derivatives, probability, statistics, and optimization to model training and evaluation concepts.', pills: ['Linear Algebra', 'Calculus', 'Probability', 'Statistics', 'Optimization', 'Gradients', 'Information Theory'] },
  { badge: 'Engineering', title: 'Physics', track: 'physics', desc: 'Apply mechanics, waves, circuit principles, sensor measurements, and dimensional analysis to engineering and computing examples.', pills: ['Mechanics', 'Waves', 'Circuits', 'Sensors', 'Simulation', 'Measurement', 'Dimensional Analysis'] },
  { badge: 'AI & ML', title: 'AI Security', track: 'ai-security', desc: 'Identify AI-specific threats and design controls for prompts, retrieval permissions, tool execution, sensitive data, and model outputs.', pills: ['Threat Modeling', 'Prompt Injection', 'RAG Security', 'Tool Safety', 'Privacy', 'Data Poisoning', 'Red Teaming'] },
]

const skillBadgeColor: Record<string, string> = {
  'TypeScript': '#0078d4',
  'C / C++': '#888888',
  'Go': '#06b6d4',
  'Kotlin': '#8b5cf6',
  'Bash': '#00e676',
  'Web Dev': '#06b6d4',
  'DevOps': '#f97316',
  'Database': '#00e676',
  'CS Core': '#f97316',
  'Mobile': '#ec4899',
  'Testing': '#84cc16',
  'Interview': '#00e676',
  'BI': '#f7c948',
  'AI & ML': '#7b61ff',
}

const skillIcon: Record<string, string> = {
  TypeScript: '🔷',
  'C / C++': '⚙️',
  Go: '🐹',
  Kotlin: '🟣',
  Bash: '⌨️',
  Angular: '🅰️',
  Django: '🟢',
  'Spring Boot': '🍃',
  GraphQL: '🔺',
  'PHP & Laravel': '🐘',
  Docker: '🐳',
  Kubernetes: '☸️',
  Terraform: '🏗️',
  'CI/CD Pipelines': '🔄',
  Linux: '🐧',
  PostgreSQL: '🐘',
  MongoDB: '🍃',
  Redis: '⚡',
  Snowflake: '❄️',
  dbt: '🛠️',
  'System Design': '🏛️',
  'Operating Systems': '💻',
  'Android Development': '📱',
  Flutter: '🦋',
  'React Native': '⚛️',
  'Software Testing': '🧪',
  Selenium: '🤖',
  'API Testing': '🔌',
  'New Grad Interview Prep': '🎓',
  'FAANG Prep': '🏆',
  'Power BI & Tableau': '📊',
  MLOps: '🚀',
  'Mathematics for AI': '📐',
  Physics: '⚛️',
  'AI Security': '🛡️',
}

const keywordIcon = (keyword: string) => {
  const value = keyword.toLowerCase()
  const specificIcons: Record<string, string> = {
    'types': '🔠', 'interfaces': '🧩', 'generics': '♻️', 'utility types': '🧰',
    'strict mode': '✅', 'type narrowing': '🔎', 'tooling': '🛠️',
    'pointers': '👉', 'memory mgmt': '🧠', 'oop': '🏗️', 'stl': '📚',
    'dsa': '🎯', 'compilation': '🛠️', 'debugging': '🐞',
    'goroutines': '⚡', 'channels': '📡', 'rest apis': '🔌',
    'concurrency': '🔄', 'microservices': '🧩', 'error handling': '🛡️',
    'testing': '🧪', 'jvm': '☕', 'null safety': '🛡️',
    'scripts': '⌨️', 'cron jobs': '⏰', 'file ops': '📂',
    'automation': '🤖', 'environment variables': '🔧', 'exit codes': '🚦',
    'components': '🧱', 'services': '🔌', 'rxjs': '🔄', 'ngrx': '🗃️',
    'di': '🧩', 'routing': '🧭', 'forms': '📝',
    'orm': '🗄️', 'celery': '🌼', 'migrations': '🛣️', 'admin': '🛡️',
    'jpa': '🗄️', 'kafka': '📨', 'dependency injection': '🧩',
    'schema': '🗺️', 'resolvers': '🔎', 'apollo client': '🚀',
    'subscriptions': '📡', 'federation': '🌐', 'queries': '🔍', 'mutations': '✏️',
    'laravel': '🐘', 'eloquent orm': '🗄️', 'blade': '🪡', 'queues': '📥',
    'images': '🖼️', 'containers': '📦', 'compose': '🧩', 'registry': '🗃️',
    'multi-stage': '🪜', 'volumes': '💽', 'pods': '📦',
    'deployments': '🚀', 'helm': '⛵', 'eks/aks/gke': '☸️', 'ingress': '🚪',
    'configmaps': '⚙️', 'autoscaling': '📈', 'hcl': '📄',
    'aws/gcp/azure': '☁️', 'state mgmt': '🗂️', 'modules': '🧩',
    'remote backend': '🌐', 'providers': '🔌', 'plan & apply': '✅',
    'github actions': '🐙', 'jenkins': '🤵', 'argocd': '🚀', 'gitops': '🔄',
    'pipelines': '🛤️', 'builds': '🏗️', 'bash': '⌨️',
    'file system': '📂', 'networking': '🌐', 'permissions': '🔐',
    'processes': '⚙️', 'users & groups': '👥',
    'jsonb': '🧾', 'full text search': '🔎', 'partitioning': '🗂️',
    'extensions': '🧩', 'pl/pgsql': '🐘', 'indexes': '📇', 'query plans': '🧭',
    'aggregation': '🧮', 'atlas': '🌐', 'replication': '🔁', 'sharding': '🧩',
    'schema design': '🗺️', 'transactions': '🔄', 'caching patterns': '⚡',
    'pub/sub': '📡', 'sessions': '🔑', 'lua scripting': '🌙',
    'streams': '🌊', 'ttl': '⏳', 'data structures': '🧱',
    'warehouses': '🏬', 'copy into': '📥', 'time travel': '⏳',
    'tasks': '📋', 'dbt': '🛠️', 'rbac': '🔐', 'cost controls': '💰',
    'models': '🧱', 'jinja': '🪄', 'incremental': '📈', 'snapshots': '📸',
    'ci/cd': '🚀', 'sources': '🔗', 'documentation': '📖',
    'hld': '🏛️', 'lld': '🧩', 'scalability': '📈', 'cap theorem': '⚖️',
    'trade-offs': '⚖️', 'caching': '⚡', 'reliability': '🛡️',
    'scheduling': '📅', 'ipc': '📨', 'deadlock': '🔒',
    'threads': '🧵', 'room db': '🗄️', 'jetpack compose': '🧩',
    'mvvm': '🏛️', 'coroutines': '🔄', 'lifecycle': '🔁', 'gradle': '🐘',
    'dart': '🎯', 'widgets': '🧱', 'bloc': '🧠', 'firebase': '🔥',
    'animations': '🎞️', 'state management': '🗃️', 'navigation': '🧭',
    'native modules': '🔌', 'expo': '🚀', 'push notifications': '🔔',
    'device apis': '📱', 'test cases': '🧪', 'bug reporting': '🐞',
    'stlc': '🔄', 'agile qa': '🔁', 'defect lifecycle': '♻️',
    'webdriver': '🚗', 'testng': '🧪', 'page object model': '📄',
    'frameworks': '🧰', 'ci integration': '🔗', 'locators': '📍',
    'wait strategies': '⏱️', 'postman': '📮', 'rest assured': '🔌',
    'newman': '🧑‍🔬', 'contract testing': '📜', 'performance': '⚡',
    'assertions': '✅', 'authentication': '🔐', 'online assessment': '📝',
    'phone screen': '📞', 'technical rounds': '💻', 'behavioral': '🗣️',
    'offers': '💼', 'resume review': '📄', 'negotiation': '🤝',
    'dsa patterns': '🎯', 'behavioural': '🗣️',
    'coding patterns': '⌨️', 'mock rounds': '🎙️', 'algorithms': '🧮',
    'communication': '💬', 'power bi': '📊', 'tableau': '📈', 'dax': '🧮',
    'reports': '📑', 'data storytelling': '📖', 'semantic models': '🧠',
    'data refresh': '🔄', 'mlflow': '🧪', 'docker': '🐳', 'kubeflow': '🤖',
    'model registry': '🗃️', 'model serving': '🚀', 'drift monitoring': '📉',
    'linear algebra': '📐', 'calculus': '∫', 'probability': '🎲',
    'statistics': '📊', 'optimization': '📈', 'gradients': '↗️',
    'information theory': 'ℹ️', 'mechanics': '⚙️', 'waves': '🌊',
    'circuits': '🔌', 'sensors': '📡', 'simulation': '🧪',
    'measurement': '📏', 'dimensional analysis': '📐',
    'threat modeling': '🛡️', 'prompt injection': '💉',
    'rag security': '🔐', 'tool safety': '🧰', 'privacy': '🔒',
    'data poisoning': '☠️', 'red teaming': '🟥',
  }
  if (specificIcons[value]) return specificIcons[value]
  if (/(security|auth|permission|zero trust|privacy|owasp|secret|vulnerab)/.test(value)) return '🔐'
  if (/(test|selenium|coverage|assert|quality|bug)/.test(value)) return '🧪'
  if (/(database|postgres|mongo|redis|sql|query|warehouse|dbt|index|transaction|schema)/.test(value)) return '🗄️'
  if (/(cloud|aws|azure|gcp|storage|databricks|synapse|bigquery|snowflake)/.test(value)) return '☁️'
  if (/(api|rest|graphql|http|websocket|socket|resolver)/.test(value)) return '🔌'
  if (/(deploy|pipeline|ci\/cd|github actions|jenkins|gitops|release|build)/.test(value)) return '🚀'
  if (/(machine learning|model|embedding|rag|nlp|neural|kubernetes|k8s)/.test(value)) return '🤖'
  if (/(network|tcp|dns|routing|firewall|vpn|protocol)/.test(value)) return '🌐'
  if (/(ui|css|html|component|responsive|accessibility|design|animation)/.test(value)) return '🎨'
  if (/(memory|pointer|process|thread|concurr|system|linux|bash|shell)/.test(value)) return '⚙️'
  if (/(interview|career|round|offer|behavior|mock|dsa)/.test(value)) return '🎯'
  return '💡'
}

const quickLinks = (stats: SiteStats) => [
  { icon: '🗺️', label: 'Career Roadmaps',    href: '/learn/roadmap',   desc: `${stats.roadmaps} role-specific roadmaps` },
  { icon: '🏗️', label: 'Real Projects',       href: '/learn/projects',  desc: `${stats.projects} Azure end-to-end builds` },
  { icon: '🎯', label: 'Interview Prep',       href: '/learn/interview', desc: 'DE, ML, SQL, System Design' },
  { icon: '✍️', label: 'Blog',                 href: '/blog',            desc: `${stats.articles} in-depth articles` },
]

const plannedTrackBySlug = Object.fromEntries(PLANNED_TRACKS.map(track => [track.slug, track]))
const plannedSkillCount = PLANNED_TRACKS.reduce(
  (total, track) => total + track.stages.reduce((count, stage) => count + stage.skills.length, 0),
  0,
)

export default function LearnPage({ tracks, stats }: { tracks: TrackSummaries; stats: SiteStats }) {
  // A card is live only when it points at a live catalog track.
  const hrefOf = (t: { track?: string }) => (t.track ? tracks[t.track]?.href : undefined)
  const [cat, setCat] = useState<Cat>('all')

  const filtered = (cat === 'all' ? TRACKS : TRACKS.filter(t => t.cat === cat))
    .map((track, originalIndex) => ({ track, originalIndex }))
    .sort((a, b) =>
      (trackPriorityRank.get(a.track.track ?? '') ?? Number.MAX_SAFE_INTEGER)
      - (trackPriorityRank.get(b.track.track ?? '') ?? Number.MAX_SAFE_INTEGER)
      || a.originalIndex - b.originalIndex,
    )
    .map(({ track }) => track)
  const orderedSkills = SKILLS
    .map((skill, originalIndex) => ({ skill, originalIndex }))
    .sort((a, b) =>
      (trackPriorityRank.get(a.skill.track ?? '') ?? Number.MAX_SAFE_INTEGER)
      - (trackPriorityRank.get(b.skill.track ?? '') ?? Number.MAX_SAFE_INTEGER)
      || a.originalIndex - b.originalIndex,
    )
  const learningLayers = [
    { number: '01', title: 'Category', description: 'A way to browse related technology areas.', example: 'AI & ML' },
    { number: '02', title: 'Track', description: 'A guided path through a subject or career direction.', example: 'Generative AI' },
    { number: '03', title: 'Skills', description: 'The specific concepts and abilities in that path.', example: 'Embeddings · RAG · Evaluation' },
    { number: '04', title: 'Learning', description: 'Lessons, practice, and projects that teach those skills.', example: 'Published or planned' },
  ]

  return (
    <div style={{ maxWidth: 1100, margin: '0 auto', padding: '48px 24px 80px' }}>

      {/* ── Header ─────────────────────────────────────────────────────────── */}
      <div style={{ marginBottom: 48 }}>
        <div style={{
          fontSize: 11, fontWeight: 700, letterSpacing: '.12em',
          textTransform: 'uppercase', color: 'var(--green)',
          fontFamily: 'var(--font-mono)', marginBottom: 12,
        }}>
          // Learning Tracks
        </div>
        <h1 style={{
          fontSize: 'clamp(28px, 4vw, 48px)', fontWeight: 900,
          color: 'var(--text)', letterSpacing: '-2px',
          fontFamily: 'var(--font-display)', lineHeight: 1.1, marginBottom: 16,
        }}>
          Explore IT &amp; computer science.<br />
          <span style={{ color: 'var(--green)' }}>Find your learning path.</span>
        </h1>
        <p style={{
          fontSize: 16, color: 'var(--muted)', lineHeight: 1.75,
          maxWidth: 580, marginBottom: 32,
        }}>
          Browse technology fields, compare related job roles, and see what each learning path covers.
          Planned paths show their skill maps before lessons are created.
        </p>

        {/* Stats */}
        <div style={{ display: 'flex', gap: 32, flexWrap: 'wrap' }}>
          {[
            { value: `${stats.liveTracks}`, label: 'Tracks with lessons' },
            { value: `${PLANNED_TRACKS.length}`, label: 'Skills plans' },
            { value: `${stats.lessons}`, label: 'Published lessons' },
            { value: `${plannedSkillCount}`, label: 'Skills mapped' },
          ].map(s => (
            <div key={s.label}>
              <div style={{
                fontSize: 28, fontWeight: 900, color: 'var(--green)',
                fontFamily: 'var(--font-display)',
              }}>{s.value}</div>
              <div style={{ fontSize: 12, color: 'var(--muted)', marginTop: 2 }}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ── How the catalog fits together ─────────────────────────────────── */}
      <section
        aria-labelledby="learning-layers-heading"
        style={{
          marginBottom: 48,
          padding: '22px 24px',
          border: '1px solid var(--border)',
          borderRadius: 16,
          background: 'var(--surface)',
        }}
      >
        <div style={{
          fontSize: 10, fontWeight: 700, letterSpacing: '.12em',
          textTransform: 'uppercase', color: 'var(--green)',
          fontFamily: 'var(--font-mono)', marginBottom: 8,
        }}>
          Start here
        </div>
        <h2 id="learning-layers-heading" style={{
          margin: '0 0 18px', color: 'var(--text)',
          fontFamily: 'var(--font-display)', fontSize: 20, fontWeight: 800,
        }}>
          How this catalog works
        </h2>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(205px, 100%), 1fr))',
          gap: 10,
        }}>
          {learningLayers.map((layer, index) => (
            <div key={layer.number} style={{
              padding: 14,
              borderRadius: 11,
              background: 'var(--bg2)',
              border: '1px solid var(--border)',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                <span style={{
                  color: 'var(--green)', fontFamily: 'var(--font-mono)',
                  fontSize: 10, fontWeight: 700,
                }}>{layer.number}</span>
                <h3 style={{ margin: 0, color: 'var(--text)', fontSize: 14 }}>{layer.title}</h3>
                {index < learningLayers.length - 1 && (
                  <span aria-hidden="true" style={{ marginLeft: 'auto', color: 'var(--muted)' }}>→</span>
                )}
              </div>
              <p style={{ margin: '0 0 8px', color: 'var(--muted)', fontSize: 12, lineHeight: 1.55 }}>
                {layer.description}
              </p>
              <div style={{ color: 'var(--text)', fontSize: 11, fontWeight: 700 }}>
                {layer.example}
              </div>
            </div>
          ))}
        </div>
        <p style={{ margin: '14px 0 0', color: 'var(--muted)', fontSize: 12, lineHeight: 1.6 }}>
          Job roles are shown on each track to explain where those skills can apply. They are examples, not a separate course level.
        </p>
      </section>

      {/* ── Quick links ────────────────────────────────────────────────────── */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(min(200px, 100%), 1fr))',
        gap: 10, marginBottom: 48,
      }}>
        {quickLinks(stats).map(q => (
          <a
            key={q.label}
            href={q.href}
            style={{
              display: 'flex', alignItems: 'center', gap: 12,
              background: 'var(--surface)', border: '1px solid var(--border)',
              borderRadius: 12, padding: '14px 16px',
              textDecoration: 'none', transition: 'border-color 0.2s',
            }}
            onMouseEnter={e => (e.currentTarget.style.borderColor = 'var(--green)')}
            onMouseLeave={e => (e.currentTarget.style.borderColor = 'var(--border)')}
          >
            <span style={{ fontSize: 22 }}>{q.icon}</span>
            <div>
              <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--text)' }}>{q.label}</div>
              <div style={{ fontSize: 11, color: 'var(--muted)', marginTop: 2 }}>{q.desc}</div>
            </div>
          </a>
        ))}
      </div>

      {/* ── Category filter ────────────────────────────────────────────────── */}
      <div style={{ marginBottom: 28 }}>
        <div style={{
          fontSize: 10, fontWeight: 700, letterSpacing: '.12em',
          textTransform: 'uppercase', color: 'var(--muted)',
          fontFamily: 'var(--font-mono)', marginBottom: 10,
        }}>
          // 1. Choose a category to filter tracks
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
          {CATS.map(c => (
            <button
              key={c.id}
              onClick={() => setCat(c.id)}
              style={{
                fontSize: 12, fontWeight: 700, padding: '7px 16px',
                borderRadius: 20, cursor: 'pointer', border: '1px solid',
                fontFamily: 'var(--font-mono)', letterSpacing: '.04em',
                borderColor: cat === c.id ? 'var(--green)' : 'var(--border)',
                background: cat === c.id ? 'rgba(0,230,118,0.10)' : 'var(--surface)',
                color: cat === c.id ? 'var(--green)' : 'var(--muted)',
                transition: 'all 0.15s',
              }}
            >
              {c.label}
            </button>
          ))}
        </div>
      </div>

      {/* ── Track grid ─────────────────────────────────────────────────────── */}
      <div style={{ marginBottom: 14 }}>
        <div style={{
          fontSize: 10, fontWeight: 700, letterSpacing: '.12em',
          textTransform: 'uppercase', color: 'var(--green)',
          fontFamily: 'var(--font-mono)', marginBottom: 7,
        }}>
          // 2. Choose a track
        </div>
        <p style={{ margin: 0, color: 'var(--muted)', fontSize: 13, lineHeight: 1.6 }}>
          Tracks are ordered by Chaduvuko’s stated priorities, followed by core foundations and specialist paths. Within each plan, skills progress from prerequisites to advanced and career preparation. “Coming Soon” means skills are mapped, but lessons are not published yet.
        </p>
      </div>
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(min(320px, 100%), 1fr))',
        gap: 14,
      }}>
        {filtered.map(t => {
          const href = hrefOf(t)
          const isPlanned = Boolean(t.track && tracks[t.track]?.status === 'coming-soon')
          const isLive = Boolean(href) && !isPlanned
          const publishedLessons = t.track ? tracks[t.track]?.lessons : undefined
          const plannedSkills = t.track ? plannedTrackBySlug[t.track]?.stages.reduce((count, stage) => count + stage.skills.length, 0) : undefined
          const isClickable = Boolean(href)
          const CardTag = (isClickable ? Link : 'div') as React.ElementType
          const cardTagProps = isClickable ? { href } : {}
          return (
            <CardTag
              key={t.name}
              {...cardTagProps}
              style={{
                background: 'var(--surface)',
                border: '1px solid var(--border)',
                borderRadius: 14,
                overflow: 'hidden',
                opacity: isLive ? 1 : 0.72,
                display: 'flex',
                flexDirection: 'column',
                transition: 'border-color 0.2s, transform 0.2s',
                textDecoration: 'none',
                cursor: isClickable ? 'pointer' : 'default',
              }}
              onMouseEnter={(e: React.MouseEvent<HTMLElement>) => {
                if (isClickable) {
                  (e.currentTarget as HTMLElement).style.borderColor = t.color + '55'
                  ;(e.currentTarget as HTMLElement).style.transform = 'translateY(-2px)'
                }
              }}
              onMouseLeave={(e: React.MouseEvent<HTMLElement>) => {
                (e.currentTarget as HTMLElement).style.borderColor = 'var(--border)'
                ;(e.currentTarget as HTMLElement).style.transform = 'translateY(0)'
              }}
            >
              {/* Color bar */}
              <div style={{ height: 3, background: t.color, opacity: 0.8 }} />

              <div style={{ padding: '20px 22px', flex: 1, display: 'flex', flexDirection: 'column' }}>
                {/* Icon + name row */}
                <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 12 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <span style={{ fontSize: 26 }}>{t.icon}</span>
                    <div>
                      <div style={{ fontSize: 15, fontWeight: 800, color: 'var(--text)', fontFamily: 'var(--font-display)' }}>
                        {t.name}
                      </div>
                      {plannedSkills ? (
                        <div style={{ fontSize: 11, color: '#c084fc', marginTop: 2 }}>
                          {plannedSkills} skills planned
                        </div>
                      ) : publishedLessons ? (
                        <div style={{ fontSize: 11, color: 'var(--muted)', marginTop: 2 }}>
                          {publishedLessons} published lessons
                        </div>
                      ) : null}
                    </div>
                  </div>
                  <span style={{
                    fontSize: 10, fontWeight: 700, letterSpacing: '.06em',
                    borderRadius: 20, padding: '3px 10px',
                    background: isPlanned ? 'rgba(192,132,252,.1)' : isLive ? 'rgba(0,230,118,0.10)' : 'var(--bg2)',
                    color: isPlanned ? '#c084fc' : isLive ? 'var(--green)' : 'var(--muted)',
                    border: `1px solid ${isPlanned ? 'rgba(192,132,252,.25)' : isLive ? 'rgba(0,230,118,0.25)' : 'var(--border)'}`,
                    flexShrink: 0,
                  }}>
                    {isPlanned ? 'COMING SOON' : isLive ? '✓ LIVE' : 'SOON'}
                  </span>
                </div>

                {/* Description */}
                <p style={{ fontSize: 13, color: 'var(--muted)', lineHeight: 1.65, marginBottom: 14, flex: 1 }}>
                  {t.desc}
                </p>

                {/* Pills */}
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5, marginBottom: 16 }}>
                  {t.pills.map(p => (
                    <span key={p} style={{
                      fontSize: 11, color: 'var(--muted)',
                      background: 'var(--bg2)', border: '1px solid var(--border)',
                      borderRadius: 20, padding: '2px 9px',
                      fontFamily: 'var(--font-mono)',
                    }}>
                      <span aria-hidden="true" style={{ marginRight: 5 }}>{keywordIcon(p)}</span>{p}
                    </span>
                  ))}
                </div>

                {/* Jobs */}
                <div style={{ fontSize: 11, color: t.color, fontWeight: 600, marginBottom: 16 }}>
                  {t.jobs}
                </div>

                {/* CTA — visual only; the whole card above is the actual link */}
                {isLive || isPlanned ? (
                  <div style={{
                    display: 'block', textAlign: 'center',
                    background: isPlanned ? 'rgba(192,132,252,.12)' : t.color,
                    color: isPlanned ? '#c084fc' : '#000',
                    fontWeight: 700, fontSize: 13,
                    borderRadius: 8, padding: '10px 0',
                    letterSpacing: '.02em',
                  }}>
                    {isPlanned ? 'Explore skills map →' : 'View lessons →'}
                  </div>
                ) : (
                  <div style={{
                    display: 'block', textAlign: 'center',
                    background: 'var(--bg2)', color: 'var(--muted)',
                    fontWeight: 600, fontSize: 13,
                    borderRadius: 8, padding: '10px 0',
                    border: '1px solid var(--border)', letterSpacing: '.02em',
                  }}>
                    Coming Soon
                  </div>
                )}
              </div>
            </CardTag>
          )
        })}
      </div>

      {/* ── Browse by Skill ────────────────────────────────────────────────── */}
      <div style={{ marginTop: 64 }}>
        <div style={{
          fontSize: 11, fontWeight: 700, letterSpacing: '.12em',
          textTransform: 'uppercase', color: 'var(--green)',
          fontFamily: 'var(--font-mono)', marginBottom: 10,
        }}>
          // Shortcuts to skills and technologies
        </div>
        <h2 style={{
          fontSize: 'clamp(20px, 3vw, 30px)', fontWeight: 900,
          color: 'var(--text)', fontFamily: 'var(--font-display)',
          letterSpacing: '-1px', marginBottom: 10,
        }}>
          Looking for a specific skill or tool?
        </h2>
        <p style={{ fontSize: 14, color: 'var(--muted)', lineHeight: 1.75, maxWidth: 560, marginBottom: 28 }}>
          These are shortcuts into their parent tracks—not separate courses. Open a card to see the track’s mapped skills or published lessons.
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(min(240px, 100%), 1fr))', gap: 10 }}>
          {orderedSkills.map(({ skill: s }) => {
            const color = skillBadgeColor[s.badge] || 'var(--muted)'
            const href = hrefOf(s)
            const owningTrack = s.track ? tracks[s.track] : undefined
            const hasSkillsMap = Boolean(s.track && plannedTrackBySlug[s.track])
            const SkillTag = (href ? Link : 'div') as React.ElementType
            return (
              <SkillTag
                key={s.title}
                {...(href ? { href } : {})}
                style={{
                  border: '1px solid var(--border)',
                  borderRadius: 12,
                  padding: '18px 16px',
                  background: 'var(--surface)',
                  opacity: href ? 1 : 0.85,
                  display: 'block',
                  textDecoration: 'none',
                  cursor: href ? 'pointer' : 'default',
                }}
              >
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
                    background: hasSkillsMap || href ? 'rgba(0,230,118,.15)' : 'rgba(255,255,255,.06)',
                    color: hasSkillsMap || href ? 'var(--green)' : 'var(--muted)',
                  }}>
                    {hasSkillsMap ? 'Skills mapped' : href ? 'Lessons live' : 'Coming soon'}
                  </span>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: 9, fontSize: 14, fontWeight: 700, color: 'var(--text)', marginBottom: 6, lineHeight: 1.3 }}>
                  <span
                    aria-hidden="true"
                    style={{
                      display: 'grid',
                      placeItems: 'center',
                      width: 30,
                      height: 30,
                      flexShrink: 0,
                      borderRadius: 9,
                      background: `${color}18`,
                      fontSize: 17,
                    }}
                  >
                    {skillIcon[s.title] ?? '✨'}
                  </span>
                  <span>{s.title}</span>
                </div>

                <div style={{ fontSize: 11, color: 'var(--muted)', lineHeight: 1.6, marginBottom: 10 }}>
                  {s.desc}
                </div>

                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
                  {s.pills.map(p => (
                    <span key={p} style={{
                      fontSize: 10, padding: '4px 9px', borderRadius: 20,
                      background: 'var(--bg2)', color: 'var(--muted)',
                      border: '1px solid var(--border)',
                    }}>
                      <span aria-hidden="true" style={{ marginRight: 4 }}>{keywordIcon(p)}</span>{p}
                    </span>
                  ))}
                </div>
                <div style={{ marginTop: 12, color: color, fontSize: 10, fontWeight: 700 }}>
                  {owningTrack ? `Opens ${owningTrack.title} →` : 'Track coming soon'}
                </div>
              </SkillTag>
            )
          })}
        </div>
      </div>

      {/* ── Bottom CTA ─────────────────────────────────────────────────────── */}
      <div style={{
        marginTop: 64,
        background: 'linear-gradient(135deg, rgba(0,230,118,0.05) 0%, rgba(123,97,255,0.05) 100%)',
        border: '1px solid var(--border)',
        borderRadius: 16,
        padding: '40px 36px',
        textAlign: 'center',
      }}>
        <div style={{
          fontSize: 10, fontWeight: 700, letterSpacing: '.12em',
          textTransform: 'uppercase', color: 'var(--green)',
          fontFamily: 'var(--font-mono)', marginBottom: 14,
        }}>
          // New tracks every week
        </div>
        <h2 style={{
          fontSize: 'clamp(18px, 2.5vw, 26px)', fontWeight: 900,
          color: 'var(--text)', fontFamily: 'var(--font-display)',
          letterSpacing: '-1px', marginBottom: 12,
        }}>
          Not sure where to start?
        </h2>
        <p style={{
          fontSize: 14, color: 'var(--muted)', lineHeight: 1.75,
          maxWidth: 460, margin: '0 auto 28px',
        }}>
          If you want a job in data, start with Data Engineering. If you want to build things,
          start with SQL. Both are free, both are live now.
        </p>
        <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link href="/learn/data-engineering" style={{
            display: 'inline-block', background: 'var(--green)',
            color: '#000', fontWeight: 700, fontSize: 13,
            borderRadius: 8, padding: '11px 28px', textDecoration: 'none',
          }}>
            Start Data Engineering →
          </Link>
          <Link href="/learn/sql" style={{
            display: 'inline-block', background: 'var(--surface)',
            color: 'var(--text)', fontWeight: 600, fontSize: 13,
            borderRadius: 8, padding: '11px 28px', textDecoration: 'none',
            border: '1px solid var(--border)',
          }}>
            Start with SQL
          </Link>
          <Link href="/learn/roadmap" style={{
            display: 'inline-block', background: 'var(--surface)',
            color: 'var(--text)', fontWeight: 600, fontSize: 13,
            borderRadius: 8, padding: '11px 28px', textDecoration: 'none',
            border: '1px solid var(--border)',
          }}>
            View Roadmaps
          </Link>
        </div>
      </div>
    </div>
  )
}
