'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'

// ─── SALARY DATA (US market 2026 — LinkedIn, Glassdoor, Levels.fyi, BLS OES) ───
const salaryDB: Record<string, any> = {
  de:     { name:'Data Engineer',           fresher:{min:90,max:130,med:108},   mid:{min:130,max:175,med:150}, senior:{min:155,max:215,med:182}, lead:{min:190,max:260,med:220},  demand:'Very High', growth:'+22% YoY', skills:['Apache Spark','Databricks','dbt','SQL','Python','Kafka','Iceberg','Azure/AWS'],            companies:['Stripe','DoorDash','Airbnb','Databricks','Snowflake','Palantir','Lyft','Robinhood'], tracks:['Data Engineering','Python','SQL','Azure','AWS'] },
  ml:     { name:'ML / AI Engineer',        fresher:{min:110,max:155,med:130},  mid:{min:155,max:210,med:180}, senior:{min:200,max:280,med:235}, lead:{min:250,max:360,med:295},  demand:'Very High', growth:'+28% YoY', skills:['Python','PyTorch','TensorFlow','MLOps','SQL','LLMs','AWS SageMaker','Feature Stores'],     companies:['OpenAI','Anthropic','Google DeepMind','Meta AI','Amazon','Microsoft','Cohere','Scale AI'], tracks:['Machine Learning','Python','Data Science','AWS','Deep Learning'] },
  fs:     { name:'Full Stack Developer',    fresher:{min:85,max:125,med:105},   mid:{min:120,max:165,med:140}, senior:{min:155,max:210,med:180}, lead:{min:190,max:255,med:215},  demand:'High',      growth:'+16% YoY', skills:['React','Node.js','TypeScript','PostgreSQL','REST APIs','Docker','AWS','System Design'],   companies:['Netflix','Airbnb','Uber','Lyft','GitHub','Vercel','Linear','Notion'],               tracks:['React.js','Node.js','TypeScript','SQL & Databases','Docker'] },
  be:     { name:'Backend Developer',       fresher:{min:90,max:130,med:108},   mid:{min:125,max:170,med:145}, senior:{min:155,max:205,med:177}, lead:{min:190,max:250,med:215},  demand:'High',      growth:'+14% YoY', skills:['Python / Go / Java','REST APIs','SQL','Redis','Docker','Microservices','System Design'], companies:['Stripe','Cloudflare','Twilio','Square','Braintree','PagerDuty','Datadog','HashiCorp'],             tracks:['Python','Java','Node.js','SQL & Databases','Docker'] },
  fe:     { name:'Frontend Developer',      fresher:{min:80,max:120,med:98},    mid:{min:115,max:158,med:134}, senior:{min:145,max:195,med:167}, lead:{min:180,max:235,med:200},  demand:'High',      growth:'+12% YoY', skills:['React','TypeScript','CSS','Performance Optimisation','Testing','Webpack','GraphQL'],         companies:['Meta','Apple','Google','Figma','Vercel','Shopify','Tailwind Labs','Linear'],            tracks:['React.js','TypeScript','HTML & CSS','GraphQL'] },
  devops: { name:'DevOps Engineer',         fresher:{min:90,max:130,med:108},   mid:{min:130,max:175,med:150}, senior:{min:160,max:215,med:185}, lead:{min:195,max:255,med:220},  demand:'High',      growth:'+18% YoY', skills:['Kubernetes','Docker','Terraform','CI/CD Pipelines','Python','AWS / Azure','Linux'],        companies:['Cloudflare','HashiCorp','GitHub','GitLab','Datadog','PagerDuty','CrowdStrike','Palo Alto'],  tracks:['Docker','Kubernetes','Terraform','CI/CD Pipelines','Linux'] },
  ds:     { name:'Data Scientist',          fresher:{min:95,max:135,med:112},   mid:{min:130,max:178,med:152}, senior:{min:160,max:215,med:185}, lead:{min:195,max:260,med:220},  demand:'High',      growth:'+18% YoY', skills:['Python','SQL','Pandas','Statistics','ML','Tableau / Power BI','Spark'],                  companies:['Netflix','Spotify','Airbnb','Lyft','Duolingo','DoorDash','Robinhood','Brex'], tracks:['Data Science','Python','Machine Learning','Power BI & Tableau'] },
  java:   { name:'Java Developer',          fresher:{min:80,max:115,med:96},    mid:{min:110,max:155,med:130}, senior:{min:140,max:190,med:162}, lead:{min:175,max:230,med:198},  demand:'Medium',    growth:'+10% YoY', skills:['Spring Boot','Microservices','JPA / Hibernate','Kafka','Docker','REST APIs','SQL'],        companies:['Oracle','Red Hat','IBM','SAP','Salesforce','ServiceNow','VMware','Twilio'],             tracks:['Java','Spring Boot','SQL & Databases','Docker'] },
  py:     { name:'Python Developer',        fresher:{min:85,max:122,med:102},   mid:{min:118,max:162,med:138}, senior:{min:148,max:198,med:170}, lead:{min:180,max:240,med:205},  demand:'High',      growth:'+16% YoY', skills:['Django / FastAPI','REST APIs','SQL','Docker','Data Structures','Testing','AWS / Azure'],    companies:['Reddit','Dropbox','Pinterest','Yelp','Quora','Eventbrite','SurveyMonkey','Gusto'],  tracks:['Python','Django','SQL & Databases','Docker','AWS'] },
  cloud:  { name:'Cloud / Solutions Architect', fresher:{min:100,max:145,med:120}, mid:{min:145,max:195,med:168}, senior:{min:185,max:250,med:215}, lead:{min:230,max:315,med:265}, demand:'Very High', growth:'+22% YoY', skills:['AWS / Azure / GCP','Kubernetes','Terraform','System Design','Cloud Security','Cost Optimisation'], companies:['Amazon AWS','Microsoft Azure','Google Cloud','IBM Cloud','Deloitte','Accenture','PwC','KPMG'], tracks:['Azure','AWS','GCP','Kubernetes','Terraform','System Design'] },
  cyber:  { name:'Cybersecurity Analyst',   fresher:{min:75,max:115,med:93},    mid:{min:110,max:158,med:132}, senior:{min:145,max:200,med:170}, lead:{min:180,max:245,med:210},  demand:'High',      growth:'+24% YoY', skills:['Penetration Testing','SIEM','OWASP Top 10','Networking','Python Scripting','Security Ops'],  companies:['CrowdStrike','Palo Alto Networks','Okta','Splunk','SentinelOne','Rapid7','Tenable','IBM'],                 tracks:['Cybersecurity','Linux','Networking'] },
  sre:    { name:'Site Reliability Engineer', fresher:{min:95,max:135,med:114}, mid:{min:138,max:185,med:160}, senior:{min:170,max:230,med:198}, lead:{min:210,max:285,med:240},  demand:'Very High', growth:'+20% YoY', skills:['Kubernetes','Python','Observability / Prometheus','SLOs & Error Budgets','Chaos Eng','Terraform'], companies:['Google','Meta','Netflix','LinkedIn','Spotify','Uber','Lyft','GitHub'],                  tracks:['Kubernetes','Linux','Python','Docker','CI/CD Pipelines'] },
  mobile: { name:'Mobile App Developer',    fresher:{min:85,max:120,med:100},   mid:{min:118,max:162,med:138}, senior:{min:150,max:200,med:172}, lead:{min:185,max:245,med:210},  demand:'Medium',    growth:'+12% YoY', skills:['iOS / Android / Flutter / React Native','Swift / Kotlin / Dart','REST APIs','Firebase','App Performance'], companies:['Apple','Google','Uber','DoorDash','Instagram','TikTok','Discord','Snap'],                     tracks:['Android Development','Flutter'] },
  genai:  { name:'GenAI / LLM Engineer',    fresher:{min:120,max:170,med:142},  mid:{min:165,max:235,med:195}, senior:{min:210,max:310,med:255}, lead:{min:270,max:400,med:320},  demand:'Very High', growth:'+45% YoY', skills:['Python','LangChain / LlamaIndex','RAG Pipelines','Vector Databases','Prompt Engineering','OpenAI API','HuggingFace'], companies:['OpenAI','Anthropic','Cohere','Mistral','Google DeepMind','Meta AI','xAI','Hugging Face'], tracks:['Generative AI / LLMs','Python','Machine Learning','SQL & Databases'] },
  qa:     { name:'QA / Test Automation',    fresher:{min:70,max:105,med:86},    mid:{min:98,max:140,med:118},  senior:{min:128,max:175,med:150}, lead:{min:158,max:215,med:183},  demand:'Medium',    growth:'+8% YoY',  skills:['Selenium','Cypress','API Testing / Postman','Jest / JUnit','Python Scripting','CI/CD Integration'], companies:['Google','Microsoft','Amazon','Salesforce','ServiceNow','Workday','SAP','Oracle'],             tracks:['Software Testing','Selenium','Python'] },
}

const cityMult: Record<string,number>  = { sf:1.35, nyc:1.3, seattle:1.2, boston:1.15, austin:1.0, chicago:0.95, remote:1.1, other:0.9 }
const compMult: Record<string,number>  = { bigtech:1.0, startup:1.18, fintech:0.95, consulting:0.72, faang:1.42, remote:1.05 }

// ─── TRACKS DATA ──────────────────────────────────────────────────────────────
const tracksAll = [
  // Data & Cloud
  { cat:'db',    icon:'🗄️', name:'SQL & Databases',        desc:'The one skill every tech role needs', pills:['JOINs','Window Functions','Indexes','CTEs'], jobs:'Data Analyst · Backend Dev · DBA',      status:'live', href:'/learn/sql' },
  { cat:'ai', icon:'🤖', name:'AI & Machine Learning', desc:'Math → Classical ML → Deep Learning → GenAI → MLOps. One complete path from zero.', pills:['Classical ML','Deep Learning','NLP','Generative AI','MLOps'], jobs:'ML Engineer · Data Scientist · AI Engineer', status:'live', href:'/learn/ai-ml' },
  { cat:'data',  icon:'📁',  name:'Data Engineering',       desc:'From zero to production-grade DE — no cloud required', pills:['Pipelines','SQL','Python','Batch','Streaming'], jobs:'Data Engineer · Analytics Engineer',        status:'live', href:'/learn/data-engineering' },
  { cat:'data',  icon:'☁️',  name:'Azure Track',      desc:'Full Azure cloud engineering track', pills:['ADF','Databricks','Spark','dbt','Kafka'],   jobs:'Data Engineer · Analytics Engineer',        status:'live', href:'/learn/azure/introduction' },
  { cat:'data',  icon:'🌩️', name:'Microsoft Azure',         desc:'Full Azure cloud service track', pills:['ADLS Gen2','ADF','Synapse','Fabric'],     jobs:'Cloud Engineer · Azure Developer',           status:'live', href:'/learn/azure/introduction' },
  { cat:'cs',    icon:'🧮',  name:'Data Structures & Algorithms', desc:'Crack every technical coding round', pills:['Arrays','Trees','Graphs','Dynamic Programming'], jobs:'Big Tech · FAANG · Product Companies', status:'live', href:'/learn/dsa' },
  { cat:'cs',    icon:'💾',  name:'DBMS',                   desc:'Database theory and design fundamentals', pills:['ER Diagrams','Normalization','ACID','Transactions'], jobs:'DBA · Backend Dev · Technical Interviews', status:'live', href:'/learn/dbms' },
  { cat:'data',  icon:'🟠',  name:'Amazon Web Services',    desc:'S3, Glue, Redshift, Kinesis, Lambda', pills:['S3','Glue','Redshift','Lambda'],     jobs:'AWS Developer · Cloud Engineer',             status:'soon', href:'#' },
  { cat:'data',  icon:'🔵',  name:'Google Cloud Platform',  desc:'BigQuery, Dataflow, Pub/Sub, Composer', pills:['BigQuery','Dataflow','Composer'],  jobs:'GCP Engineer · Data Engineer',               status:'soon', href:'#' },
  { cat:'data',  icon:'📊',  name:'Power BI & Tableau',     desc:'Dashboards, DAX, data storytelling', pills:['Power BI','Tableau','DAX','Reports'],  jobs:'BI Developer · Data Analyst',               status:'soon', href:'#' },
  // AI & ML

{ cat:'ai', icon:'🧠', name:'Deep Learning',          desc:'Neural networks, CNNs, RNNs, Transformers — part of the AI & ML track', pills:['TensorFlow','PyTorch','Backprop','Transformers'], jobs:'DL Engineer · AI Researcher',     status:'live', href:'/learn/ai-ml' },
{ cat:'ai', icon:'✨', name:'Generative AI / LLMs',   desc:'GANs, Diffusion, LLMs, RAG, Agents — part of the AI & ML track',       pills:['LangChain','OpenAI','RAG','HuggingFace'],     jobs:'GenAI Developer · AI Engineer',   status:'live', href:'/learn/ai-ml' },
{ cat:'ai', icon:'📈', name:'Data Science',            desc:'Analysis, modelling, storytelling',    pills:['Pandas','Matplotlib','Stats','EDA'],          jobs:'Data Scientist · Analytics Consultant', status:'soon', href:'#' },
{ cat:'ai', icon:'🔍', name:'MLOps',                   desc:'Deploy and monitor ML in production',  pills:['MLflow','Docker','Kubeflow','CI/CD'],         jobs:'MLOps Engineer · ML Platform Eng', status:'soon', href:'/learn/ai-ml' },
  // Programming Languages
  { cat:'prog',  icon:'🐍',  name:'Python',                 desc:'Zero to production Python', pills:['Basics','OOP','FastAPI','Testing','Async'],    jobs:'Backend Dev · ML Engineer · Data Analyst',  status:'soon', href:'#' },
  { cat:'prog',  icon:'☕',  name:'Java',                   desc:'Core Java to Spring Boot microservices', pills:['OOP','Collections','Spring Boot','JPA'], jobs:'Java Dev · Backend Engineer',             status:'soon', href:'#' },
  { cat:'prog',  icon:'💛',  name:'JavaScript',             desc:'Modern JS from fundamentals to advanced', pills:['ES6+','Async/Await','DOM','APIs'], jobs:'Frontend Dev · Full Stack Dev',             status:'soon', href:'#' },
  { cat:'prog',  icon:'🔷',  name:'TypeScript',             desc:'Typed JS for production applications', pills:['Types','Interfaces','Generics','Utility Types'], jobs:'Frontend Dev · Backend Dev',         status:'soon', href:'#' },
  { cat:'prog',  icon:'🔵',  name:'C / C++',                desc:'Systems programming and DSA foundation', pills:['Pointers','Memory Mgmt','OOP','DSA'], jobs:'Systems Dev · Embedded Eng',              status:'soon', href:'#' },
  { cat:'prog',  icon:'🦀',  name:'Go (Golang)',            desc:'High-performance microservices', pills:['Goroutines','REST APIs','Microservices','Channels'], jobs:'Backend Dev · Platform Eng · SRE',    status:'soon', href:'#' },
  { cat:'prog',  icon:'🔥',  name:'Kotlin',                 desc:'Android and JVM backend development', pills:['Coroutines','Jetpack','Spring Boot'],  jobs:'Android Dev · Backend Dev',                 status:'soon', href:'#' },
  { cat:'prog',  icon:'📜',  name:'Bash / Shell Scripting', desc:'Automate everything on Linux', pills:['Scripts','Cron Jobs','File Ops','Pipelines'], jobs:'DevOps Eng · SysAdmin',                    status:'soon', href:'#' },
  // Web Dev
  { cat:'web',   icon:'🌐',  name:'HTML & CSS',             desc:'Web foundations done right', pills:['Semantic HTML','Flexbox','CSS Grid','Responsive'], jobs:'Frontend Dev · Web Designer',            status:'soon', href:'#' },
  { cat:'web',   icon:'⚛️', name:'React.js',               desc:'Component-based UI at production scale', pills:['Hooks','Context','Redux','Testing'], jobs:'Frontend Dev · React Developer',            status:'soon', href:'#' },
  { cat:'web',   icon:'🟢',  name:'Node.js',                desc:'JavaScript on the server side', pills:['Express','REST APIs','JWT Auth','WebSockets'], jobs:'Backend Dev · Full Stack Dev',             status:'soon', href:'#' },
  { cat:'web',   icon:'▲',  name:'Next.js',                desc:'Full-stack React with SSR and App Router', pills:['SSR','SSG','App Router','API Routes'], jobs:'Full Stack Dev · Frontend Dev',          status:'soon', href:'#' },
  { cat:'web',   icon:'🅰️', name:'Angular',               desc:'Enterprise-grade frontend framework', pills:['Components','Services','RxJS','NgRx'],  jobs:'Frontend Dev · Angular Developer',          status:'soon', href:'#' },
  { cat:'web',   icon:'🌿',  name:'Django',                 desc:'Python web framework for production', pills:['ORM','REST APIs','Auth','Deployment'],  jobs:'Python Dev · Backend Dev',                  status:'soon', href:'#' },
  { cat:'web',   icon:'🌱',  name:'Spring Boot',            desc:'Java enterprise application framework', pills:['REST','JPA','Security','Microservices'], jobs:'Java Dev · Backend Engineer',             status:'soon', href:'#' },
  { cat:'web',   icon:'🔗',  name:'GraphQL',                desc:'API query language for modern apps', pills:['Schema','Resolvers','Apollo Client','Subscriptions'], jobs:'Full Stack Dev · API Dev',        status:'soon', href:'#' },
  { cat:'web',   icon:'🐘',  name:'PHP & Laravel',          desc:'Server-side web with Laravel framework', pills:['Laravel','Eloquent ORM','Blade','APIs'], jobs:'Web Developer · Backend Dev',           status:'soon', href:'#' },
  // DevOps
  { cat:'devops',icon:'🐳',  name:'Docker',                 desc:'Containerise every application', pills:['Images','Containers','Compose','Registry'], jobs:'DevOps Eng · Backend Dev',                  status:'soon', href:'#' },
  { cat:'devops',icon:'☸️', name:'Kubernetes',             desc:'Container orchestration at scale', pills:['Pods','Deployments','Helm','EKS/AKS/GKE'], jobs:'DevOps Eng · Platform Eng',               status:'soon', href:'#' },
  { cat:'devops',icon:'🏗️', name:'Terraform',              desc:'Infrastructure as Code', pills:['HCL','AWS/GCP/Azure','State Mgmt','Modules'],    jobs:'DevOps Eng · Cloud Architect',               status:'soon', href:'#' },
  { cat:'devops',icon:'🔄',  name:'CI/CD Pipelines',        desc:'GitHub Actions, Jenkins, ArgoCD', pills:['GitHub Actions','Jenkins','ArgoCD','GitOps'], jobs:'DevOps Eng · SRE',                      status:'soon', href:'#' },
  { cat:'devops',icon:'🐧',  name:'Linux',                  desc:'Command line and system administration', pills:['Bash','File System','Networking','Permissions'], jobs:'SysAdmin · DevOps Eng',            status:'soon', href:'#' },
  { cat:'devops',icon:'🛡️', name:'Cybersecurity',          desc:'Ethical hacking and defence techniques', pills:['Pen Testing','OWASP','SIEM','Networks'], jobs:'Security Analyst · Pen Tester',          status:'soon', href:'#' },
  // Databases
  { cat:'db',    icon:'🐘',  name:'PostgreSQL',             desc:'Advanced relational database mastery', pills:['JSONB','Full Text Search','Partitioning','Extensions'], jobs:'DBA · Backend Dev',            status:'soon', href:'#' },
  { cat:'db',    icon:'🍃',  name:'MongoDB',                desc:'NoSQL document database at scale', pills:['Aggregation Pipeline','Indexes','Atlas','Replication'], jobs:'Backend Dev · Full Stack Dev',   status:'soon', href:'#' },
  { cat:'db',    icon:'⚡',  name:'Redis',                  desc:'In-memory caching and queuing', pills:['Caching Patterns','Pub/Sub','Sessions','Lua Scripting'], jobs:'Backend Dev · Platform Eng',       status:'soon', href:'#' },
  { cat:'db',    icon:'❄️',  name:'Snowflake',              desc:'Cloud data warehouse platform', pills:['Schemas','Time Travel','Streams','dbt Integration'], jobs:'Data Engineer · Analytics Engineer', status:'soon', href:'#' },
  // CS Core
  { cat:'cs',    icon:'⚙️',  name:'System Design',          desc:'Design scalable systems like a senior', pills:['HLD','LLD','Scalability','CAP Theorem','Trade-offs'], jobs:'Senior Engineer · Tech Lead · Architect', status:'soon', href:'#' },
  { cat:'cs',    icon:'🖥️', name:'Operating Systems',      desc:'Processes, memory, scheduling, concurrency', pills:['Processes','Memory Mgmt','Scheduling','IPC'], jobs:'Technical Interviews · Systems Engineering', status:'soon', href:'#' },
  { cat:'cs',    icon:'🌐',  name:'Computer Networks',      desc:'TCP/IP, HTTP, DNS, and beyond', pills:['TCP/IP','HTTP/HTTPS','DNS','Load Balancers'],  jobs:'DevOps Eng · Backend Dev · Technical Interviews', status:'soon', href:'#' },
  // Mobile
  { cat:'mobile',icon:'🤖',  name:'Android Development',    desc:'Native Android with Kotlin', pills:['Kotlin','Jetpack Compose','MVVM','Room DB'],   jobs:'Android Dev · Mobile Dev',                   status:'soon', href:'#' },
  { cat:'mobile',icon:'🦋',  name:'Flutter',                desc:'Cross-platform iOS and Android with Dart', pills:['Dart','Widgets','BLoC','Firebase'], jobs:'Mobile Dev · Flutter Dev',                 status:'soon', href:'#' },
  { cat:'mobile',icon:'⚛️', name:'React Native',           desc:'Mobile apps with JavaScript and React', pills:['Components','Navigation','Native Modules','Expo'], jobs:'Mobile Dev · Full Stack Dev',     status:'soon', href:'#' },
  // Testing
  { cat:'test',  icon:'🧪',  name:'Software Testing',       desc:'Manual testing foundation and SDLC', pills:['Test Cases','Bug Reporting','STLC','Agile QA'], jobs:'QA Engineer · Test Analyst',           status:'soon', href:'#' },
  { cat:'test',  icon:'🕷️', name:'Selenium',               desc:'Web browser test automation', pills:['WebDriver','TestNG','Page Object Model','Frameworks'], jobs:'Automation QA · SDET',                status:'soon', href:'#' },
  { cat:'test',  icon:'📮',  name:'API Testing',            desc:'Postman, REST Assured, API automation', pills:['Postman','REST Assured','Newman','CI Integration'], jobs:'QA Engineer · SDET',              status:'soon', href:'#' },
  // Interview
  { cat:'interview',icon:'🎯',name:'Interview Prep — All Roles', desc:'Structured Q&A for every tech role', pills:['System Design','Coding Rounds','Behavioral','Resume'], jobs:'Every company · Every level · Every role', status:'live', href:'/learn/interview' },
  { cat:'interview',icon:'🏢',name:'Big Tech Hiring Process', desc:'Google, Meta, Amazon, Microsoft, Apple — full loop', pills:['Resume Screen','Phone Screen','Onsite','Offer Negotiation'], jobs:'Big Tech · Startups · FAANG', status:'soon', href:'#' },
  { cat:'interview',icon:'🚀',name:'FAANG & Big Tech Prep',  desc:'Algorithms, system design, behavioral rounds', pills:['DSA','System Design','Behavioral','Coding Patterns'], jobs:'Google · Amazon · Microsoft · Meta · Apple', status:'soon', href:'#' },
]

// ─── TICKER TECHNOLOGIES ──────────────────────────────────────────────────────
const tickerTechs = [
  { name:'Python', color:'#f7c948' }, { name:'Azure ADF', color:'#0078d4' },
  { name:'React', color:'#06b6d4' }, { name:'SQL', color:'#00e676' },
  { name:'Docker', color:'#0078d4' }, { name:'Machine Learning', color:'#8b5cf6' },
  { name:'AWS Glue', color:'#ff9900' }, { name:'JavaScript', color:'#f7c948' },
  { name:'Kubernetes', color:'#0078d4' }, { name:'Databricks', color:'#ff4757' },
  { name:'Spring Boot', color:'#84cc16' }, { name:'Apache Kafka', color:'#f97316' },
  { name:'TypeScript', color:'#0078d4' }, { name:'dbt', color:'#f97316' },
  { name:'PostgreSQL', color:'#06b6d4' }, { name:'System Design', color:'#f97316' },
  { name:'Node.js', color:'#00e676' }, { name:'Apache Spark', color:'#ff4757' },
  { name:'Git', color:'#f97316' }, { name:'TensorFlow', color:'#ff9900' },
  { name:'Redis', color:'#ff4757' }, { name:'Linux', color:'#f7c948' },
  { name:'Terraform', color:'#8b5cf6' }, { name:'BigQuery', color:'#4285f4' },
  { name:'Go Lang', color:'#06b6d4' }, { name:'LangChain', color:'#00e676' },
  { name:'Flutter', color:'#0078d4' }, { name:'Selenium', color:'#84cc16' },
  { name:'Power BI', color:'#f7c948' }, { name:'Prompt Engineering', color:'#ec4899' },
]

// ─── JOB ROLES (20) ──────────────────────────────────────────────────────────
const jobRoles = [
  'Data Engineer','Full Stack Developer','ML Engineer','Cloud Architect',
  'Backend Developer','DevOps Engineer','AI Engineer','Data Scientist',
  'Frontend Developer','Mobile App Developer','Python Developer','Java Developer',
  'Site Reliability Engineer','Cybersecurity Analyst','GenAI Developer',
  'Analytics Engineer','Platform Engineer','Software Architect',
  'Database Administrator','Cloud Security Engineer',
]

// ─── ROLE LINKS ──────────────────────────────────────────────────────────────
const roleLinks: Record<string, string> = {
  'Data Engineer':            '/learn/roadmap/data-engineer',
  'ML Engineer':              '/learn/roadmap/ml-engineer',
  'AI Engineer':              '/learn/roadmap/ml-engineer',
  'Data Scientist':           '/learn/roadmap/data-scientist',
  'GenAI Developer':          '/learn/roadmap/ml-engineer',
  'Full Stack Developer':     '/learn/roadmap/fullstack',
  'Backend Developer':        '/learn/roadmap/backend-dev',
  'Frontend Developer':       '/learn/roadmap/frontend',
  'Python Developer':         '/learn/roadmap/python-developer',
  'Database Administrator':   '/learn/roadmap/database-administrator',
  'Cloud Architect':          '/learn/roadmap/cloud-architect',
  'DevOps Engineer':          '/learn/roadmap/devops',
  'Mobile App Developer':     '/learn/roadmap/mobile-app-developer',
  'Java Developer':           '/learn/roadmap/java-developer',
  'Site Reliability Engineer':'/learn/roadmap/site-reliability-engineer',
  'Cybersecurity Analyst':    '/learn/roadmap/cybersecurity-analyst',
  'Analytics Engineer':       '/learn/roadmap/analytics-engineer',
  'Platform Engineer':        '/learn/roadmap/platform-engineer',
  'Software Architect':       '/learn/roadmap/software-architect',
  'Cloud Security Engineer':  '/learn/roadmap/cloud-security-engineer',
}

// ─── DAY 1 TASKS ─────────────────────────────────────────────────────────────
const dayOneTasks = [
  { role:'Data Engineer', company:'Stripe · San Francisco', salary:'$145K–$185K', task:'Build an automated daily pipeline ingesting 50M transaction events from S3 into Snowflake, partitioned by region and date, available for analysts by 7am ET.', track:'ADF + ADLS + Databricks track', color:'#0078d4' },
  { role:'Backend Developer', company:'DoorDash · Seattle', salary:'$150K–$195K', task:'Design a REST API in Python FastAPI for our merchant analytics dashboard — handle 80k requests/min, write unit tests, deploy on AWS Lambda behind API Gateway.', track:'Python + AWS track', color:'#ff9900' },
  { role:'ML Engineer', company:'Airbnb · San Francisco', salary:'$165K–$220K', task:'Train a listing recommendation model on 6 months of search history using two-tower embeddings, evaluate with NDCG@10, deploy via SageMaker real-time endpoint.', track:'Python + ML + AWS track', color:'#8b5cf6' },
  { role:'Full Stack Developer', company:'Netflix · Los Gatos', salary:'$160K–$210K', task:'Build the A/B test results dashboard in React — fetch experiment data from our Node.js API, add real-time updates via Server-Sent Events, write Playwright E2E tests.', track:'React + Node.js + TypeScript track', color:'#06b6d4' },
  { role:'DevOps Engineer', company:'Cloudflare · Austin', salary:'$140K–$180K', task:'Migrate 60 microservices to Kubernetes on EKS, write Terraform for all infra, set up ArgoCD for a full GitOps deployment pipeline with automated rollback.', track:'Docker + Kubernetes + DevOps track', color:'#f97316' },
  { role:'GenAI Developer', company:'Cohere · Remote', salary:'$175K–$235K', task:'Build a RAG-based enterprise knowledge assistant using LangChain, Cohere embeddings, and Pinecone vector store — sub-2-second P95 latency requirement.', track:'Python + GenAI + Databases track', color:'#ec4899' },
]

export default function HomePage() {
  const [roleIndex, setRoleIndex] = useState(0)
  const [roleVisible, setRoleVisible] = useState(true)
  const [trackCat, setTrackCat] = useState('all')
  const [showAllTracks, setShowAllTracks] = useState(false)
  const [salaryRole, setSalaryRole] = useState('de')
  const [salaryCity, setSalaryCity] = useState('sf')
  const [salaryExp, setSalaryExp] = useState('mid')
  const [salaryComp, setSalaryComp] = useState('bigtech')
  const [counters, setCounters] = useState({ t:0, p:0, tr:0, r:0 })

  // Role rotation
  useEffect(() => {
    const interval = setInterval(() => {
      setRoleVisible(false)
      setTimeout(() => {
        setRoleIndex(i => (i + 1) % jobRoles.length)
        setRoleVisible(true)
      }, 250)
    }, 2400)
    return () => clearInterval(interval)
  }, [])

  // Counter animation
  useEffect(() => {
    const targets = { t:150, p:30, tr:40, r:20 }
    const duration = 1200
    const steps = 60
    let step = 0
    const timer = setInterval(() => {
      step++
      const pct = step / steps
      setCounters({
        t: Math.round(targets.t * pct),
        p: Math.round(targets.p * pct),
        tr: Math.round(targets.tr * pct),
        r: Math.round(targets.r * pct),
      })
      if (step >= steps) clearInterval(timer)
    }, duration / steps)
    return () => clearInterval(timer)
  }, [])

  // Salary calculation
  const sd = salaryDB[salaryRole]
  const expKey = salaryExp as 'fresher'|'mid'|'senior'|'lead'
  const band = sd[expKey]
  const cm = cityMult[salaryCity] || 1
  const co = compMult[salaryComp] || 1
  const r = (v: number) => Math.round(v * cm * co)
  const salMin = r(band.min), salMax = r(band.max), salMed = r(band.med)
  const barPct = Math.min(95, Math.round((salMed / 400) * 100))

  // Filtered tracks
  const filteredTracks = trackCat === 'all' ? tracksAll : tracksAll.filter(t => t.cat === trackCat)
  const visibleTracks = showAllTracks ? filteredTracks : filteredTracks.slice(0, 16)

  const trackCategories = [
    { key:'all', label:'All Tracks' },
    { key:'data', label:'Data & Cloud' },
    { key:'prog', label:'Programming' },
    { key:'web', label:'Web Dev' },
    { key:'ai', label:'AI & ML' },
    { key:'devops', label:'DevOps' },
    { key:'db', label:'Databases' },
    { key:'cs', label:'CS Core' },
    { key:'mobile', label:'Mobile' },
    { key:'test', label:'Testing' },
    { key:'interview', label:'Interview' },
  ]

  const expBands = [
    { key:'fresher', label:'Entry-level (0–2yr)', color:'var(--green)' },
    { key:'mid', label:'Mid-level (3–5yr)', color:'var(--aws)' },
    { key:'senior', label:'Senior (6–10yr)', color:'var(--azure)' },
    { key:'lead', label:'Lead / Architect (10yr+)', color:'var(--purple)' },
  ] as const

  return (
    <>
      {/* ── ANNOUNCE BAR ── */}
      <div style={{ background:'rgba(0,230,118,0.06)', borderBottom:'1px solid rgba(0,230,118,0.12)', padding:'7px 28px', fontSize:11, color:'rgba(0,230,118,0.9)', display:'flex', alignItems:'center', justifyContent:'center', gap:8, fontWeight:600 }}>
        <span style={{ width:5, height:5, borderRadius:'50%', background:'var(--green)', display:'inline-block', animation:'pulse 2s infinite' }} />
        Python · SQL · Web Dev · Java · AI/ML tracks launching soon — your one platform for all of IT
      </div>

      {/* ── HERO ── */}
      <section style={{ maxWidth:1000, margin:'0 auto', padding:'72px 28px 56px', textAlign:'center' }}>
        <p style={{ fontSize:11, fontWeight:600, letterSpacing:'.14em', textTransform:'uppercase', color:'var(--muted)', marginBottom:20 }}>
          Built for every engineer · Every role · Every goal
        </p>
        <h1 style={{ fontSize:'clamp(40px,6vw,70px)', fontWeight:900, lineHeight:1.05, letterSpacing:'-3px', marginBottom:6 }}>
          One Platform.<br />Every IT Skill.<br /><span style={{ color:'var(--green)' }}>Every Career.</span>
        </h1>
        <div style={{ fontSize:'clamp(16px,2.2vw,26px)', fontWeight:600, color:'var(--muted)', margin:'20px 0 24px', minHeight:44, display:'flex', alignItems:'center', justifyContent:'center', gap:8 }}>
          Become a{' '}
          <Link href={roleLinks[jobRoles[roleIndex]] ?? '/learn/roadmap'} style={{
            background:'rgba(0,230,118,0.1)', border:'1px solid rgba(0,230,118,0.2)',
            color:'var(--green)', padding:'3px 14px', borderRadius:99, fontWeight:700,
            minWidth:260, textAlign:'center', display:'inline-block',
            opacity: roleVisible ? 1 : 0, transition:'opacity 0.25s',
            fontSize:'clamp(14px,1.8vw,22px)',
            textDecoration:'none', cursor:'pointer',
          }}>
            {jobRoles[roleIndex]} →
          </Link>
        </div>
        <p style={{ fontSize:15, color:'var(--muted)', maxWidth:540, margin:'0 auto 32px', lineHeight:1.75 }}>
          Structured, real-world learning for <strong style={{ color:'var(--text)' }}>every branch of tech</strong> — with the errors explained, the job context shown, and a clear path from where you are to where you want to be.
        </p>
        <div style={{ display:'flex', gap:10, justifyContent:'center', flexWrap:'wrap', marginBottom:48 }}>
          <a href="#tracks" style={{ background:'var(--green)', color:'#000', fontSize:13, fontWeight:700, padding:'12px 26px', borderRadius:8, textDecoration:'none' }}>
            Explore All Tracks →
          </a>
          <a href="#salary" style={{ background:'var(--surface)', color:'var(--text)', fontSize:13, fontWeight:500, padding:'12px 20px', borderRadius:8, border:'1px solid var(--border)', textDecoration:'none' }}>
            Career Salary Explorer
          </a>
          <a href="#method" style={{ background:'var(--surface)', color:'var(--text)', fontSize:13, fontWeight:500, padding:'12px 20px', borderRadius:8, border:'1px solid var(--border)', textDecoration:'none' }}>
            Why We&apos;re Different
          </a>
        </div>
        {/* Stats */}
        <div style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:1, background:'var(--border)', border:'1px solid var(--border)', borderRadius:12, overflow:'hidden', maxWidth:560, margin:'0 auto' }}>
          {[
            { n:`${counters.t}+`, l:'Tutorials' },
            { n:`${counters.p}+`, l:'Projects & Growing' },
            { n:`${counters.tr}+`, l:'IT Tracks' },
            { n:`${counters.r}+`, l:'Job Roles Covered' },
          ].map(s => (
            <div key={s.l} style={{ background:'var(--surface)', padding:'16px 10px', textAlign:'center' }}>
              <div style={{ fontSize:24, fontWeight:900, color:'var(--green)', lineHeight:1 }}>{s.n}</div>
              <div style={{ fontSize:10, color:'var(--muted)', textTransform:'uppercase', letterSpacing:'.06em', marginTop:3 }}>{s.l}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── TICKER ── */}
      <div style={{ overflow:'hidden', padding:'10px 0', borderTop:'1px solid var(--border)', borderBottom:'1px solid var(--border)', background:'var(--bg2)' }}>
        <div style={{ display:'flex', width:'max-content', animation:'ticker 45s linear infinite' }}>
          {[...tickerTechs, ...tickerTechs].map((t, i) => (
            <span key={i} style={{ display:'inline-flex', alignItems:'center', gap:5, fontSize:11, color:'var(--muted)', padding:'0 18px', borderRight:'1px solid var(--border)', whiteSpace:'nowrap' }}>
              <span style={{ width:4, height:4, borderRadius:'50%', background:t.color, display:'inline-block' }} />
              {t.name}
            </span>
          ))}
        </div>
      </div>

      {/* ── HONEST TRUTH ── */}
      <div style={{ background:'var(--bg2)', borderTop:'1px solid var(--border)', borderBottom:'1px solid var(--border)' }}>
        <section style={{ maxWidth:1100, margin:'0 auto', padding:'56px 28px' }}>
          <p style={{ fontSize:10, fontWeight:700, letterSpacing:'.12em', textTransform:'uppercase', color:'var(--muted)', marginBottom:8 }}>// The honest truth</p>
          <h2 style={{ fontSize:'clamp(22px,3vw,36px)', fontWeight:900, letterSpacing:'-1.5px', marginBottom:8 }}>Every other platform has the<br /><span style={{ color:'var(--red)' }}>same blind spot.</span></h2>
          <p style={{ fontSize:14, color:'var(--muted)', marginBottom:32, maxWidth:520 }}>We studied 10 platforms and their real student complaints. Here&apos;s every failure — and how we built around each one.</p>
          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:16 }}>
            {[
              { title:'❌ What every other platform does', border:'rgba(255,71,87,.2)', bg:'rgba(255,71,87,.03)', titleColor:'#ff6b7a', prefix:'✕', prefixColor:'#ff6b7a', items:[
                'Teaches syntax. Never teaches what to do when it breaks.',
                'No connection between tutorials and real job requirements.',
                '2019 content ranking #1 on Google — no version warning.',
                'Aggressive login popups and modal walls mid-reading.',
                '40-hour video courses with no structured job outcome.',
                'Tutorial hell — finish 50 pages, still can\'t build anything.',
                'No real job context — just theory with no connection to actual JDs.',
                'Generic salary data — not filtered by role, country, or experience.',
                'AI era completely ignored — no Copilot, GenAI, LLM workflows.',
                'No visual path — students don\'t know what to learn next.',
              ]},
              { title:'✓ What Chaduvuko does differently', border:'rgba(0,230,118,.2)', bg:'rgba(0,230,118,.03)', titleColor:'var(--green)', prefix:'✓', prefixColor:'var(--green)', items:[
                'Every project has an "Errors You\'ll Hit" section with real fixes.',
                '"What This Looks Like at Work" — your real day-1 task at a job.',
                '"Last Verified" badge — every tutorial shows tested version & date.',
                'No popups. No login walls. Read any tutorial, anytime, always.',
                '5-minute micro-lessons — learn on your phone in any gap.',
                'End-to-end projects you put on your resume from day one.',
                'US + global salary data — filtered by role, country, and experience.',
                'Big Tech prep: Google, Amazon, Meta, Stripe, FAANG-level interviews.',
                'AI-era track — Prompt Eng, RAG, LangChain, GitHub Copilot.',
                'Visual skill roadmap — what to learn, in what order, why.',
              ]},
            ].map(col => (
              <div key={col.title} style={{ border:`1px solid ${col.border}`, background:col.bg, borderRadius:12, padding:20 }}>
                <div style={{ fontSize:12, fontWeight:700, color:col.titleColor, marginBottom:14 }}>{col.title}</div>
                <ul style={{ listStyle:'none' }}>
                  {col.items.map((item, i) => (
                    <li key={i} style={{ fontSize:11.5, color:'var(--muted)', padding:'5px 0', borderBottom:'1px solid rgba(255,255,255,.04)', display:'flex', alignItems:'flex-start', gap:7, lineHeight:1.5 }}>
                      <span style={{ color:col.prefixColor, flexShrink:0, fontSize:10, marginTop:2, fontWeight:700 }}>{col.prefix}</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* ── TRACKS ── */}
      <section id="tracks" style={{ maxWidth:1100, margin:'0 auto', padding:'56px 28px' }}>
        <p style={{ fontSize:10, fontWeight:700, letterSpacing:'.12em', textTransform:'uppercase', color:'var(--muted)', marginBottom:8 }}>// Choose your track</p>
        <h2 style={{ fontSize:'clamp(22px,3vw,36px)', fontWeight:900, letterSpacing:'-1.5px', marginBottom:8 }}>Every IT discipline.<br />One structured platform.</h2>
        <p style={{ fontSize:14, color:'var(--muted)', marginBottom:24, maxWidth:520 }}>
          {tracksAll.length}+ tracks across every branch of tech. Every track is sequenced from zero to job-ready with real projects and interview prep built in.
        </p>
        {/* Category filters */}
        <div style={{ display:'flex', flexWrap:'wrap', gap:6, marginBottom:20 }}>
          {trackCategories.map(c => (
            <button key={c.key} onClick={() => { setTrackCat(c.key); setShowAllTracks(false) }} style={{ fontSize:11, fontWeight:600, padding:'5px 14px', borderRadius:99, border:`1px solid ${trackCat === c.key ? 'var(--green)' : 'var(--border)'}`, background: trackCat === c.key ? 'var(--green)' : 'transparent', color: trackCat === c.key ? '#000' : 'var(--muted)', cursor:'pointer' }}>
              {c.label}
            </button>
          ))}
        </div>
        {/* Tracks grid */}
        <div style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:6 }}>
          {visibleTracks.map(t => (
            <Link key={t.name} href={t.href} style={{ border:'1px solid var(--border)', borderRadius:10, padding:14, background:'var(--surface)', textDecoration:'none', display:'block', transition:'border-color .2s' }}
              onMouseEnter={e => (e.currentTarget.style.borderColor = 'var(--accent)')}
              onMouseLeave={e => (e.currentTarget.style.borderColor = 'var(--border)')}>
              <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom:6 }}>
                <span style={{ fontSize:18 }}>{t.icon}</span>
                <span style={{ fontSize:8, fontWeight:700, padding:'2px 6px', borderRadius:99, textTransform:'uppercase', background: t.status === 'live' ? 'rgba(0,230,118,.15)' : 'rgba(255,255,255,.06)', color: t.status === 'live' ? 'var(--green)' : 'var(--muted)' }}>
                  {t.status === 'live' ? 'Live' : 'Soon'}
                </span>
              </div>
              <div style={{ fontSize:12, fontWeight:700, color:'var(--text)', marginBottom:3 }}>{t.name}</div>
              <div style={{ fontSize:10, color:'var(--muted)', lineHeight:1.4, marginBottom:6 }}>{t.desc}</div>
              <div style={{ display:'flex', flexWrap:'wrap', gap:3, marginBottom:6 }}>
                {t.pills.map(p => <span key={p} style={{ fontSize:9, padding:'1px 6px', borderRadius:3, background:'rgba(255,255,255,.06)', color:'var(--muted)' }}>{p}</span>)}
              </div>
              <div style={{ fontSize:9, fontWeight:600, color:'var(--accent)' }}>→ {t.jobs}</div>
            </Link>
          ))}
        </div>
        {filteredTracks.length > 16 && (
          <button onClick={() => setShowAllTracks(v => !v)} style={{ marginTop:14, width:'100%', background:'var(--surface)', color:'var(--muted)', fontSize:12, fontWeight:600, padding:'10px 24px', borderRadius:8, cursor:'pointer', border:'1px solid var(--border)' }}>
            {showAllTracks ? `Show fewer ↑` : `Show all ${filteredTracks.length} tracks ↓`}
          </button>
        )}
      </section>

      <div style={{ height:1, background:'var(--border)', maxWidth:1100, margin:'0 auto' }} />

      {/* ── THE METHOD ── */}
      <section id="method" style={{ maxWidth:1100, margin:'0 auto', padding:'56px 28px' }}>
        <p style={{ fontSize:10, fontWeight:700, letterSpacing:'.12em', textTransform:'uppercase', color:'var(--muted)', marginBottom:8 }}>// The Chaduvuko method</p>
        <h2 style={{ fontSize:'clamp(22px,3vw,36px)', fontWeight:900, letterSpacing:'-1.5px', marginBottom:8 }}>Three things no other<br />platform does.</h2>
        <p style={{ fontSize:14, color:'var(--muted)', marginBottom:32, maxWidth:520 }}>Direct fixes to the three biggest reasons students give up or fail interviews.</p>
        <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:12 }}>
          {[
            { icon:'🩺', title:'Error Library', desc:'Every project page has an "Errors You\'ll Hit" section — the actual error message, exactly why it happens, and the precise fix. 80% of real engineering is debugging. No other platform prepares you for it.', code: ['PipelineRunFailed: Copy_Store_Sales', 'Source file not found in landing zone', '', '→ Why: Date format in expression', '   uses "yyyy-MM-dd" but file has "yyyyMMdd"', '→ Fix: Change @formatDateTime format', '   to "yyyyMMdd" (remove hyphens)'] },
            { icon:'💼', title:'What This Looks Like at Work', desc:'Every concept ends with real job context — the actual Slack message your manager sends on day 1, the job posting that requires this skill, and what a senior engineer\'s code review would say.', code: ['Real task — DoorDash Data Engineering:', '"Build a daily ingestion pipeline', ' from S3 landing zone to Snowflake,', ' partitioned by market + order date."', '', '→ This exact tutorial covers it.'] },
            { icon:'📅', title:'Last Verified Badge', desc:'Every tutorial shows when it was last tested against the real tool version. GFG has Python 2 articles from 2019 ranking on Google with zero warning. That will never happen here.', code: ['✓ Last verified: March 2026', '✓ Tested on: ADF v2 · Python 3.12', '✓ Status: All steps confirmed working', '', '⚑ Flag something broken? →', '  Submit a correction in one click'] },
          ].map(m => (
            <div key={m.title} style={{ border:'1px solid var(--border)', borderRadius:14, padding:'22px 18px', background:'var(--surface)' }}>
              <span style={{ fontSize:9, fontWeight:800, letterSpacing:'.1em', textTransform:'uppercase', color:'var(--green)', background:'rgba(0,230,118,.1)', padding:'2px 8px', borderRadius:99, display:'inline-block', marginBottom:10 }}>Unique — nowhere else</span>
              <div style={{ fontSize:24, marginBottom:8 }}>{m.icon}</div>
              <h3 style={{ fontSize:15, fontWeight:800, color:'var(--text)', marginBottom:8, letterSpacing:'-.5px' }}>{m.title}</h3>
              <p style={{ fontSize:12, color:'var(--muted)', lineHeight:1.65, marginBottom:12 }}>{m.desc}</p>
              <div style={{ background:'var(--bg2)', border:'1px solid var(--border)', borderRadius:8, padding:'10px 12px', fontFamily:'monospace', fontSize:10.5, lineHeight:1.7, color:'var(--muted)' }}>
                {m.code.map((line, i) => (
                  <div key={i} style={{ color: line.startsWith('→') || line.startsWith('✓') ? 'var(--green)' : line.startsWith('Real') ? 'var(--yellow)' : line.startsWith('Pipeline') ? 'var(--red)' : 'var(--muted)' }}>
                    {line || ' '}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <div style={{ height:1, background:'var(--border)', maxWidth:1100, margin:'0 auto' }} />

      {/* ── DAY 1 AT WORK ── */}
      <div style={{ background:'var(--bg2)', borderTop:'1px solid var(--border)', borderBottom:'1px solid var(--border)' }}>
        <section style={{ maxWidth:1100, margin:'0 auto', padding:'56px 28px' }}>
          <p style={{ fontSize:10, fontWeight:700, letterSpacing:'.12em', textTransform:'uppercase', color:'var(--muted)', marginBottom:8 }}>// Day 1 at work</p>
          <h2 style={{ fontSize:'clamp(22px,3vw,36px)', fontWeight:900, letterSpacing:'-1.5px', marginBottom:8 }}>This is what you&apos;ll<br />actually be asked to do.</h2>
          <p style={{ fontSize:14, color:'var(--muted)', marginBottom:28, maxWidth:520 }}>Real tasks from real job descriptions at top US tech companies. Every tutorial connects to one of these.</p>
          <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:10 }}>
            {dayOneTasks.map(t => (
              <div key={t.role} style={{ borderRadius:12, padding:18, border:'1px solid var(--border)', background:'var(--surface)', borderLeft:`3px solid ${t.color}` }}>
                <div style={{ fontSize:9, fontWeight:700, textTransform:'uppercase', letterSpacing:'.1em', color:t.color, marginBottom:6 }}>{t.role}</div>
                <div style={{ fontSize:10, color:'var(--muted)', marginBottom:10 }}>{t.company} · {t.salary}</div>
                <p style={{ fontSize:12, color:'var(--text)', lineHeight:1.6, fontStyle:'italic', marginBottom:10 }}>&ldquo;{t.task}&rdquo;</p>
                <span style={{ fontSize:9, fontWeight:600, padding:'2px 8px', borderRadius:99, background:'rgba(255,255,255,.06)', color:'var(--muted)' }}>→ {t.track}</span>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* ── PROJECTS ── */}
      <section style={{ maxWidth:1100, margin:'0 auto', padding:'56px 28px' }}>
        <p style={{ fontSize:10, fontWeight:700, letterSpacing:'.12em', textTransform:'uppercase', color:'var(--muted)', marginBottom:8 }}>// Real world projects</p>
        <h2 style={{ fontSize:'clamp(22px,3vw,36px)', fontWeight:900, letterSpacing:'-1.5px', marginBottom:8 }}>Build. Don&apos;t just read.</h2>
        <p style={{ fontSize:14, color:'var(--muted)', marginBottom:20, maxWidth:520 }}>End-to-end projects with full code, architecture diagrams, error walkthroughs, and &ldquo;What This Looks Like at Work&rdquo; context. More being added continuously across all tracks.</p>
        <div style={{ fontSize:12, color:'var(--muted)', background:'var(--surface)', border:'1px solid var(--border)', borderRadius:8, padding:'10px 16px', marginBottom:20, display:'flex', alignItems:'center', gap:8 }}>
          <span style={{ color:'var(--green)', fontWeight:700 }}>🚀</span>
          Every project includes the Error Library, real job context, and a GitHub repo. More projects across every track are being added — check back often.
        </div>
        <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:8 }}>
          {[
            { num:'AZURE PROJECT 01', title:'Copy a CSV File to Azure Data Lake', desc:'Your first ADF pipeline from scratch. Includes the 3 errors every beginner hits and the exact fix for each one.', tags:['ADF','ADLS Gen2','Blob Storage'], href:'/learn/projects/azure-batch-pipeline' },
            { num:'AZURE PROJECT 02', title:'ForEach Loop — 10 Files, 1 Pipeline', desc:'Stop building 10 copy activities. One parameterized ForEach loop moves all store files efficiently.', tags:['ForEach','Parameters','ADF'], href:'/learn/projects/azure-projects-02' },
            { num:'AZURE PROJECT 03', title:'Parameterized Pipeline with Run Date', desc:'Pass a date at runtime, ADF builds filenames automatically. Add a midnight trigger and it runs without you.', tags:['Triggers','Expressions','Date Partition'], href:'/learn/projects/azure-project-03' },
            { num:'AZURE PROJECT 04', title:'HTTP Ingestion from a Public URL', desc:'Pull data from a public HTTPS endpoint into ADLS. No manual uploads — ADF fetches from the internet directly.', tags:['HTTP','Web Activity','ADLS'], href:'/learn/projects/azure-project-04' },
            { num:'AZURE PROJECT 05', title:'Organise Files With Date Stamps', desc:'Check existence, add date stamps, auto-clean landing zone, log missing files — a full production workflow.', tags:['Get Metadata','If Condition','Delete'], href:'/learn/projects/azure-project-05' },
            { num:'MORE COMING', title:'Across All Tracks', desc:'Python, SQL, Web Dev, ML, DevOps projects are being built. Every one will include the Error Library and real job context.', tags:['Python','SQL','React','ML','DevOps'], href:'/learn/projects' },
          ].map(p => (
            <Link key={p.num} href={p.href} style={{ border:'1px solid var(--border)', borderRadius:10, padding:14, background:'var(--surface)', textDecoration:'none', display:'block' }}>
              <div style={{ fontSize:9, fontWeight:700, color:'var(--muted)', marginBottom:5, letterSpacing:'.06em' }}>{p.num}</div>
              <div style={{ fontSize:12, fontWeight:700, color:'var(--text)', marginBottom:5, lineHeight:1.3 }}>{p.title}</div>
              <div style={{ fontSize:10.5, color:'var(--muted)', lineHeight:1.5, marginBottom:8 }}>{p.desc}</div>
              <div style={{ display:'flex', flexWrap:'wrap', gap:4, marginBottom:7 }}>
                {p.tags.map(t => <span key={t} style={{ fontSize:9, padding:'2px 6px', borderRadius:3, background:'rgba(0,120,212,.12)', color:'#60a5fa' }}>{t}</span>)}
              </div>
              {p.num !== 'MORE COMING' && <div style={{ fontSize:10, color:'var(--green)', fontWeight:600, display:'flex', alignItems:'center', gap:4 }}><span style={{ width:5, height:5, borderRadius:'50%', background:'var(--green)', display:'inline-block' }} /> Live · Includes Error Library</div>}
            </Link>
          ))}
        </div>
      </section>

      {/* ── SALARY EXPLORER ── */}
      <div id="salary" style={{ background:'var(--bg2)', borderTop:'1px solid var(--border)', borderBottom:'1px solid var(--border)' }}>
        <section style={{ maxWidth:1100, margin:'0 auto', padding:'56px 28px' }}>
          <p style={{ fontSize:10, fontWeight:700, letterSpacing:'.12em', textTransform:'uppercase', color:'var(--muted)', marginBottom:8 }}>// Career salary explorer</p>
          <h2 style={{ fontSize:'clamp(22px,3vw,36px)', fontWeight:900, letterSpacing:'-1.5px', marginBottom:8 }}>Real 2026 US salary data.<br />Your filters. Your career.</h2>
          <p style={{ fontSize:14, color:'var(--muted)', marginBottom:28, maxWidth:560 }}>Filter by role, city, experience, and company type. Data sourced from LinkedIn, Glassdoor, Levels.fyi, and BLS OES — updated April 2026.</p>
          {/* Filters */}
          <div style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:10, marginBottom:20 }}>
            {[
              { label:'Job Role', id:'role', value:salaryRole, setter:setSalaryRole, opts:[
                {v:'de',l:'Data Engineer'},{v:'ml',l:'ML / AI Engineer'},{v:'fs',l:'Full Stack Developer'},
                {v:'be',l:'Backend Developer'},{v:'fe',l:'Frontend Developer'},{v:'devops',l:'DevOps Engineer'},
                {v:'ds',l:'Data Scientist'},{v:'java',l:'Java Developer'},{v:'py',l:'Python Developer'},
                {v:'cloud',l:'Cloud / Solutions Architect'},{v:'cyber',l:'Cybersecurity Analyst'},
                {v:'sre',l:'Site Reliability Engineer'},{v:'mobile',l:'Mobile App Developer'},
                {v:'genai',l:'GenAI / LLM Engineer'},{v:'qa',l:'QA / Test Automation'},
              ]},
              { label:'City / Region', id:'city', value:salaryCity, setter:setSalaryCity, opts:[
                {v:'sf',l:'San Francisco / Bay Area'},{v:'nyc',l:'New York City'},
                {v:'seattle',l:'Seattle'},{v:'boston',l:'Boston'},
                {v:'austin',l:'Austin'},{v:'chicago',l:'Chicago'},
                {v:'remote',l:'Remote (US)'},{v:'other',l:'Other US Cities'},
              ]},
              { label:'Experience', id:'exp', value:salaryExp, setter:setSalaryExp, opts:[
                {v:'fresher',l:'Entry-level (0–2 yrs)'},{v:'mid',l:'Mid-level (3–5 yrs)'},
                {v:'senior',l:'Senior (6–10 yrs)'},{v:'lead',l:'Staff / Principal (10+ yrs)'},
              ]},
              { label:'Company Type', id:'comp', value:salaryComp, setter:setSalaryComp, opts:[
                {v:'bigtech',l:'Big Tech (Google / Amazon / Meta)'},{v:'faang',l:'FAANG+ (Top Tier)'},
                {v:'startup',l:'High-Growth Startup'},{v:'fintech',l:'Fintech / Series B+'},
                {v:'consulting',l:'Consulting / SI'},{v:'remote',l:'Remote-First Company'},
              ]},
            ].map(f => (
              <div key={f.id}>
                <div style={{ fontSize:10, fontWeight:600, textTransform:'uppercase', letterSpacing:'.08em', color:'var(--muted)', marginBottom:5 }}>{f.label}</div>
                <select value={f.value} onChange={e => f.setter(e.target.value)}
                  style={{ background:'var(--surface)', border:'1px solid var(--border)', color:'var(--text)', fontSize:12, padding:'8px 10px', borderRadius:8, width:'100%', cursor:'pointer', outline:'none' }}>
                  {f.opts.map(o => <option key={o.v} value={o.v}>{o.l}</option>)}
                </select>
              </div>
            ))}
          </div>
          {/* Results */}
          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:16 }}>
            <div style={{ border:'1px solid var(--border)', borderRadius:12, padding:20, background:'var(--surface)' }}>
              <div style={{ fontSize:10, fontWeight:700, textTransform:'uppercase', letterSpacing:'.08em', color:'var(--muted)', marginBottom:14 }}>Estimated Salary Range</div>
              <div style={{ fontSize:38, fontWeight:900, color:'var(--green)', letterSpacing:'-2px', lineHeight:1 }}>${salMed}K</div>
              <div style={{ fontSize:12, color:'var(--muted)', marginTop:4, marginBottom:10 }}>Range: ${salMin}K – ${salMax}K / year</div>
              <div style={{ display:'flex', alignItems:'center', gap:8, marginBottom:16 }}>
                <span style={{ fontSize:10, fontWeight:600, padding:'3px 10px', borderRadius:99, background: sd.demand === 'Very High' ? 'rgba(139,92,246,.15)' : 'rgba(0,230,118,.12)', color: sd.demand === 'Very High' ? 'var(--purple)' : 'var(--green)' }}>
                  {sd.demand} Demand
                </span>
                <span style={{ fontSize:11, color:'var(--green)', fontWeight:600 }}>{sd.growth}</span>
              </div>
              <div style={{ height:6, background:'var(--surface2)', borderRadius:3, overflow:'hidden', marginBottom:16 }}>
                <div style={{ height:'100%', borderRadius:3, background:'var(--green)', width:`${barPct}%`, transition:'width .6s ease' }} />
              </div>
              <div style={{ fontSize:10, fontWeight:600, textTransform:'uppercase', letterSpacing:'.06em', color:'var(--muted)', marginBottom:8 }}>Key skills that boost salary</div>
              <div style={{ display:'flex', flexWrap:'wrap', gap:5 }}>
                {sd.skills.map((s: string, i: number) => (
                  <span key={s} style={{ fontSize:10, padding:'3px 8px', borderRadius:4, border:'1px solid var(--border)', background: i < 3 ? 'rgba(0,230,118,.1)' : 'rgba(255,255,255,.04)', color: i < 3 ? 'var(--green)' : 'var(--muted)' }}>{s}</span>
                ))}
              </div>
              <div style={{ fontSize:10, color:'var(--muted2)', marginTop:14, paddingTop:12, borderTop:'1px solid var(--border)' }}>
                Sources: LinkedIn, Glassdoor, Levels.fyi, BLS OES · April 2026 · {sd.name}
              </div>
            </div>
            <div style={{ border:'1px solid var(--border)', borderRadius:12, padding:20, background:'var(--surface)' }}>
              <div style={{ fontSize:10, fontWeight:700, textTransform:'uppercase', letterSpacing:'.08em', color:'var(--muted)', marginBottom:12 }}>Top Companies Hiring</div>
              <div style={{ display:'flex', flexWrap:'wrap', gap:5, marginBottom:16 }}>
                {sd.companies.map((c: string, i: number) => (
                  <span key={c} style={{ fontSize:10, padding:'3px 8px', borderRadius:4, border:'1px solid var(--border)', background: i < 4 ? 'rgba(249,115,22,.1)' : 'rgba(255,255,255,.04)', color: i < 4 ? 'var(--orange)' : 'var(--muted)' }}>{c}</span>
                ))}
              </div>
              <div style={{ fontSize:10, fontWeight:600, textTransform:'uppercase', letterSpacing:'.06em', color:'var(--muted)', marginBottom:8 }}>Salary by experience level (this city & company type)</div>
              {expBands.map(eb => {
                const b = sd[eb.key]
                const bMin = r(b.min), bMax = r(b.max), bMed = r(b.med)
                const pct = Math.min(96, Math.round((bMed / 400) * 100))
                return (
                  <div key={eb.key} style={{ marginBottom:10 }}>
                    <div style={{ display:'flex', justifyContent:'space-between', fontSize:10, color:'var(--muted)', marginBottom:3 }}>
                      <span>{eb.label}</span>
                      <span style={{ color:'var(--text)', fontWeight:600 }}>${bMin}K–${bMax}K</span>
                    </div>
                    <div style={{ height:5, background:'var(--surface2)', borderRadius:3, overflow:'hidden' }}>
                      <div style={{ height:'100%', borderRadius:3, background:eb.color, width:`${pct}%`, transition:'width .6s ease' }} />
                    </div>
                  </div>
                )
              })}
              <div style={{ fontSize:10, fontWeight:600, textTransform:'uppercase', letterSpacing:'.06em', color:'var(--muted)', marginBottom:8, marginTop:14 }}>Tracks that prepare you for this role</div>
              <div style={{ display:'flex', flexWrap:'wrap', gap:5 }}>
                {sd.tracks.map((t: string) => (
                  <span key={t} style={{ fontSize:10, padding:'3px 8px', borderRadius:4, border:'1px solid rgba(0,230,118,.2)', background:'rgba(0,230,118,.08)', color:'var(--green)' }}>{t}</span>
                ))}
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* ── WHY CHADUVUKO ── */}
      <section style={{ maxWidth:1100, margin:'0 auto', padding:'56px 28px' }}>
        <p style={{ fontSize:10, fontWeight:700, letterSpacing:'.12em', textTransform:'uppercase', color:'var(--muted)', marginBottom:8 }}>// Why Chaduvuko</p>
        <h2 style={{ fontSize:'clamp(22px,3vw,36px)', fontWeight:900, letterSpacing:'-1.5px', marginBottom:8 }}>Built by Asil.<br />For Engineers.</h2>
        <p style={{ fontSize:14, color:'var(--muted)', marginBottom:32, maxWidth:520 }}>Every decision is made with one question: does this actually help the student get the job?</p>
        <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:10 }}>
          {[
            { icon:'🩺', title:'Error Library', desc:'Every project includes the real errors you\'ll hit — exact error messages, root cause, and fix. No other platform prepares you for debugging.' },
            { icon:'🛠️', title:'Real Projects, Real Code', desc:'Not just theory. Working code on Azure, AWS, GCP, or real web infrastructure. Put it on your resume from day one.' },
            { icon:'🎯', title:'Job-Market Focused', desc:'Content curated based on what companies are actively hiring for right now — mapped to real job descriptions, not five-year-old syllabi.' },
            { icon:'📅', title:'Always Verified', desc:'Every page carries a "Last Verified" badge showing the tool version and test date. Stale content is flagged and fixed.' },
            { icon:'🧭', title:'Structured Learning Path', desc:'Visual skill roadmaps per track — what to learn, in what order, and which job role it leads to. No more random rabbit holes.' },
            { icon:'🌍', title:'Global Career Data', desc:'US + worldwide salary data by role and country. Big Tech prep, FAANG-level interview guides, and real job descriptions from top companies.' },
          ].map(w => (
            <div key={w.title} style={{ border:'1px solid var(--border)', borderRadius:12, padding:18, background:'var(--surface)' }}>
              <div style={{ fontSize:22, marginBottom:10 }}>{w.icon}</div>
              <div style={{ fontSize:13, fontWeight:700, color:'var(--text)', marginBottom:6 }}>{w.title}</div>
              <div style={{ fontSize:11, color:'var(--muted)', lineHeight:1.6 }}>{w.desc}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── CTA ── */}
      <div style={{ background:'var(--bg2)', borderTop:'1px solid var(--border)', padding:'64px 28px', textAlign:'center' }}>
        <h2 style={{ fontSize:'clamp(26px,4vw,46px)', fontWeight:900, letterSpacing:'-2px', marginBottom:12 }}>
          Start where you are.<br />Get where you want.
        </h2>
        <p style={{ fontSize:14, color:'var(--muted)', marginBottom:28 }}>
          Pick a track. Follow the path. Build the project. Get the job. Built by Asil.
        </p>
        <div style={{ display:'flex', gap:20, justifyContent:'center', flexWrap:'wrap', marginBottom:28 }}>
          {['No login required to read any tutorial','No popup interruptions','Error library on every project','Global salary data built in','Built by Asil'].map(item => (
            <div key={item} style={{ fontSize:11, color:'var(--muted)', display:'flex', alignItems:'center', gap:5 }}>
              <div style={{ width:4, height:4, borderRadius:'50%', background:'var(--green)' }} />
              {item}
            </div>
          ))}
        </div>
        <Link href="/learn/roadmap" style={{ background:'var(--green)', color:'#000', fontSize:14, fontWeight:700, padding:'14px 36px', borderRadius:8, textDecoration:'none', display:'inline-block' }}>
          Explore All Tracks →
        </Link>
      </div>

      {/* ── CSS ANIMATIONS ── */}
      <style>{`
        @keyframes pulse { 0%,100%{opacity:1} 50%{opacity:.2} }
        @keyframes ticker { 0%{transform:translateX(0)} 100%{transform:translateX(-50%)} }
      `}</style>
    </>
  )
}
