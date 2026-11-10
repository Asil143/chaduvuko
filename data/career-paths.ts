// Flagship career paths: ordered milestones across schools.
// A milestone points at a live catalog track (optionally limited to some of its
// modules) or at a planned track, which is shown as "coming soon".
// validate-catalog checks every track slug and module name below.
import type { SchoolArea } from '@/lib/catalog/schools'

export interface PathMilestone {
  title: string
  outcome: string
  /** Catalog track slug, or a planned-track slug from data/planned-tracks.ts. */
  track: string
  /** Module (section) names inside the track. Omit to include the whole track. */
  sections?: string[]
}

export interface CareerPath {
  slug: string
  title: string
  school: SchoolArea
  summary: string
  /** Who the path is for, in one sentence. */
  audience: string
  /** Related reference roadmap at /learn/roadmap/[slug]. */
  roadmap?: string
  milestones: PathMilestone[]
  capstone: { title: string; description: string; href?: string }
  interview: { title: string; href: string }[]
}

const PYTHON_CORE = ['Python Foundations', 'Core Data Structures & Logic', 'Object-Oriented Python', 'Intermediate & Functional Python']
const DE_CORE = ['What Even Is This?', 'Data Fundamentals', 'Core Engineering Skills', 'How Data Moves', 'Storage & Architecture', 'Quality, Governance & Production']
const SQL_CORE = ['Databases & Setup', 'Reading Data — SELECT', 'Filtering & Logic', 'Aggregation', 'Joins']
const PYTHON_AI = [...PYTHON_CORE, 'Advanced Python']
const LLM_APPS = 'LLM Applications — Prompting, RAG and Agents'
/** Networking without the security and tooling modules the cybersecurity track teaches in depth. */
const NETWORKING_CORE = ['How Networks Work', 'The IP Layer — Addressing and Routing', 'Transport Layer', 'Application Layer Protocols']
const DEV_ESSENTIALS: PathMilestone = { title: 'Developer essentials', outcome: 'Work in the Linux shell, script with Bash, use Git and GitHub, and package apps with Docker.', track: 'devops-mlops', sections: ['Developer Essentials', 'Containers'] }

export const CAREER_PATHS: CareerPath[] = [
  {
    slug: 'ai-engineer',
    title: 'AI Engineer',
    school: 'ai',
    summary: 'Build applications on top of large language models: prompting, embeddings, RAG, evaluation, and deployment.',
    audience: 'For developers and graduates who want to ship AI features, not train models from scratch.',
    roadmap: 'ai-engineer',
    milestones: [
      { title: 'Python for AI work', outcome: 'Write, structure, and debug Python, including async code and concurrency.', track: 'python', sections: PYTHON_AI },
      { title: 'SQL essentials', outcome: 'Query and join the data your AI features depend on.', track: 'sql', sections: SQL_CORE },
      DEV_ESSENTIALS,
      { title: 'How machine learning works', outcome: 'Explain training, evaluation, and the maths behind models.', track: 'ai-ml', sections: ['Introduction', 'Math Foundations', 'Programming Ecosystem', 'Classical Machine Learning', 'Evaluation and Optimisation'] },
      { title: 'Deep learning and large language models', outcome: 'Understand neural networks, transformers, tokenisation, and how LLMs are trained and used.', track: 'ai-ml', sections: ['Deep Learning', 'Natural Language Processing', 'Large Language Models'] },
      { title: 'Building with LLM APIs', outcome: 'Call models, return structured outputs, use tools, embeddings and vector databases, then evaluate, secure, and ship.', track: 'generative-ai' },
      { title: 'Prompting, RAG, agents and fine-tuning', outcome: 'Design prompts, build retrieval pipelines, add tool-using agents, and know when to fine-tune.', track: 'ai-ml', sections: [LLM_APPS, 'Fine-Tuning and Multimodal Models'] },
      { title: 'AI in production', outcome: 'Deploy, monitor, and run models on cloud ML platforms.', track: 'ai-ml', sections: ['MLOps and Production', 'Cloud ML Platforms'] },
    ],
    capstone: { title: 'Document Q&A assistant', description: 'A RAG application over your own documents, with an evaluation set, citations, and a deployed demo.' },
    interview: [
      { title: 'ML interview prep', href: '/learn/ai-ml/ml-interview-prep' },
      { title: 'Python interview prep', href: '/learn/python/python-interview-prep' },
    ],
  },
  {
    slug: 'agentic-ai-engineer',
    title: 'Agentic AI Engineer',
    school: 'ai',
    summary: 'Design AI agents that plan, call tools, keep state, and work safely with humans in the loop.',
    audience: 'For developers who already build with LLMs and want to automate multi-step work.',
    roadmap: 'genai-developer',
    milestones: [
      { title: 'Python for AI work', outcome: 'Write, structure, and debug Python, including async code and concurrency.', track: 'python', sections: PYTHON_AI },
      DEV_ESSENTIALS,
      { title: 'How AI and LLMs work', outcome: 'Explain models, tokenisation, embeddings, context windows, and their limits.', track: 'ai-ml', sections: ['Introduction', 'Natural Language Processing', 'Large Language Models'] },
      { title: 'LLM engineering', outcome: 'LLM APIs, structured outputs, tool calling, vector databases, evaluation, and guardrails.', track: 'generative-ai' },
      { title: 'Prompting, RAG and agent basics', outcome: 'Prompt design, retrieval-augmented generation, and the tool-use loop.', track: 'ai-ml', sections: [LLM_APPS] },
      { title: 'Agents and automation', outcome: 'Agent state, memory, planning, LangGraph, MCP, multi-agent systems, and observability.', track: 'agentic-ai' },
      { title: 'Securing agents', outcome: 'Prompt injection, tool permissions, and abuse-case testing.', track: 'ai-security' },
    ],
    capstone: { title: 'Tool-using support agent', description: 'An agent that uses tools and retrieval, asks for human approval on risky actions, and is traced and evaluated.' },
    interview: [{ title: 'ML interview prep', href: '/learn/ai-ml/ml-interview-prep' }],
  },
  {
    slug: 'ml-engineer',
    title: 'Machine Learning Engineer',
    school: 'ai',
    summary: 'Train, evaluate, and ship machine learning models, then keep them healthy in production.',
    audience: 'For learners comfortable with Python who want to build and operate models.',
    roadmap: 'ml-engineer',
    milestones: [
      { title: 'Python for AI work', outcome: 'Write, structure, and debug Python, including concurrency and performance.', track: 'python', sections: PYTHON_AI },
      { title: 'SQL essentials', outcome: 'Query and join training data.', track: 'sql', sections: SQL_CORE },
      { title: 'Maths and the ML toolkit', outcome: 'Linear algebra, probability, NumPy, pandas, and data preparation for ML.', track: 'ai-ml', sections: ['Introduction', 'Math Foundations', 'Programming Ecosystem', 'Data Engineering for ML'] },
      { title: 'Statistics and experiments', outcome: 'Distributions, confidence intervals, hypothesis tests, and A/B testing.', track: 'analytics-engineering-data-analytics', sections: ['Statistics for Data', 'Metrics & Experiments'] },
      { title: 'Classical machine learning', outcome: 'Regression, trees, ensembles, clustering, time series, and recommenders.', track: 'ai-ml', sections: ['Classical Machine Learning', 'Evaluation and Optimisation'] },
      { title: 'Deep learning with PyTorch', outcome: 'Neural networks in PyTorch, computer vision, NLP, and LLMs.', track: 'ai-ml', sections: ['Deep Learning', 'Computer Vision', 'Natural Language Processing', 'Large Language Models'] },
      { title: 'MLOps and production', outcome: 'Pipelines, feature stores, deployment, and monitoring.', track: 'ai-ml', sections: ['MLOps and Production', 'Cloud ML Platforms'] },
      { title: 'DevOps and Kubernetes for ML', outcome: 'Linux, Git, Docker, CI/CD, infrastructure as code, and Kubernetes.', track: 'devops-mlops' },
    ],
    capstone: { title: 'End-to-end prediction service', description: 'A trained model with tracked experiments, a serving API, and drift monitoring.' },
    interview: [{ title: 'ML interview prep', href: '/learn/ai-ml/ml-interview-prep' }],
  },
  {
    slug: 'data-engineer',
    title: 'Data Engineer',
    school: 'data',
    summary: 'Build reliable pipelines that move, transform, and serve data for analytics and AI.',
    audience: 'For beginners and analysts moving into data platform work.',
    roadmap: 'data-engineer',
    milestones: [
      { title: 'Data engineering foundations', outcome: 'Know what data engineers do, and how data is typed, stored, and formatted.', track: 'data-engineering', sections: ['What Even Is This?', 'Data Fundamentals'] },
      { title: 'SQL', outcome: 'From SELECT to window functions and query performance.', track: 'sql' },
      { title: 'Python for data', outcome: 'Write, structure, and debug Python programs.', track: 'python', sections: PYTHON_CORE },
      { title: 'Data engineering core', outcome: 'Engineering skills, ingestion, modelling, storage, quality, and governance.', track: 'data-engineering', sections: ['Core Engineering Skills', 'How Data Moves', 'Storage & Architecture', 'Quality, Governance & Production'] },
      { title: 'Containers with Docker', outcome: 'Package and run pipelines and their dependencies reproducibly.', track: 'devops-mlops', sections: ['Containers'] },
      { title: 'Spark, Airflow and table formats', outcome: 'Process data at scale with Spark, orchestrate with Airflow, and manage Delta and Iceberg tables.', track: 'data-engineering', sections: ['Spark, Airflow & Lakehouse Tables'] },
      { title: 'Streaming with Kafka', outcome: 'Produce, consume, and operate event streams.', track: 'apache-kafka' },
      { title: 'Transformation with dbt', outcome: 'Model, test, and document warehouse transformations.', track: 'dbt' },
      { title: 'Cloud warehouse: Snowflake', outcome: 'Load, transform, secure, and tune a cloud warehouse.', track: 'snowflake' },
      { title: 'Cloud data services: AWS', outcome: 'S3, Glue, Redshift, Kinesis, and Athena.', track: 'cloud-data', sections: ['AWS'] },
    ],
    capstone: { title: 'Azure end-to-end pipeline builds', description: 'Six guided projects from batch ingestion to a production-style lakehouse.', href: '/learn/projects' },
    interview: [
      { title: 'Data engineering interview questions', href: '/learn/data-engineering/de-interview-questions' },
      { title: 'SQL interview questions', href: '/learn/sql/interview-questions' },
    ],
  },
  {
    slug: 'analytics-engineer',
    title: 'Analytics Engineer & Data Analyst',
    school: 'data',
    summary: 'Turn raw data into trusted models, metrics, and dashboards that teams use to decide.',
    audience: 'For analysts, business graduates, and SQL users who want to own the data model.',
    roadmap: 'analytics-engineer',
    milestones: [
      { title: 'SQL', outcome: 'From SELECT to window functions and query performance.', track: 'sql' },
      { title: 'Python basics', outcome: 'Automate small data tasks in Python.', track: 'python', sections: ['Python Foundations', 'Core Data Structures & Logic'] },
      { title: 'Data analysis with pandas', outcome: 'Clean, reshape, and visualise data with NumPy, pandas, and Matplotlib.', track: 'ai-ml', sections: ['Programming Ecosystem'] },
      { title: 'Statistics, metrics and experiments', outcome: 'Descriptive statistics, hypothesis tests, KPIs, and A/B testing.', track: 'analytics-engineering-data-analytics', sections: ['Statistics for Data', 'Metrics & Experiments'] },
      { title: 'Data modelling and warehousing', outcome: 'Dimensional models, star schemas, and warehouse design.', track: 'data-engineering', sections: ['Storage & Architecture'] },
      { title: 'Transformation with dbt', outcome: 'Model, test, and document warehouse transformations.', track: 'dbt' },
      { title: 'Cloud warehouse: Snowflake', outcome: 'Load, transform, secure, and tune a cloud warehouse.', track: 'snowflake' },
      { title: 'BI and data storytelling', outcome: 'Build dashboards people use and present findings that drive decisions.', track: 'analytics-engineering-data-analytics', sections: ['BI & Storytelling'] },
    ],
    capstone: { title: 'Metrics layer and dashboard', description: 'A tested dbt project feeding a dashboard with documented metric definitions.' },
    interview: [
      { title: 'SQL interview questions', href: '/learn/sql/interview-questions' },
      { title: 'dbt interview and system design', href: '/learn/dbt/dbt-interview-system-design' },
    ],
  },
  {
    slug: 'full-stack-ai-developer',
    title: 'Full-Stack Developer (AI-enabled)',
    school: 'programming',
    summary: 'Build complete web applications, front end to database, using AI tools and adding AI features.',
    audience: 'For beginners and career-switchers who want to build products people use.',
    roadmap: 'fullstack',
    milestones: [
      { title: 'HTML and CSS', outcome: 'Build accessible, responsive pages.', track: 'html-css' },
      { title: 'Command line and Git', outcome: 'Use the terminal, Bash, Git, and GitHub pull requests.', track: 'devops-mlops', sections: ['Developer Essentials'] },
      { title: 'JavaScript and TypeScript', outcome: 'Language fundamentals, the DOM, async code, tooling, and typed applications.', track: 'javascript' },
      { title: 'SQL essentials', outcome: 'Store and query application data.', track: 'sql', sections: SQL_CORE },
      { title: 'Database design', outcome: 'Model data, normalise tables, and choose indexes.', track: 'dbms', sections: ['Foundations', 'Design & SQL'] },
      { title: 'Full-stack development with AI', outcome: 'React, Next.js, REST APIs, Postgres, auth, AI features, and deployment.', track: 'full-stack-ai' },
      { title: 'LLM features in depth', outcome: 'Structured outputs, tool calling, and streaming responses from LLM APIs.', track: 'generative-ai', sections: ['Building with LLM APIs'] },
    ],
    capstone: { title: 'AI-assisted web app', description: 'A deployed app with authentication, a database, and one useful AI feature.' },
    interview: [{ title: 'HTML & CSS interview prep', href: '/learn/html-css/html-css-interview-prep' }],
  },
  {
    slug: 'cloud-devops-engineer',
    title: 'Cloud & DevOps Engineer',
    school: 'cloud',
    summary: 'Run applications and data platforms in the cloud with automation, monitoring, and reliability.',
    audience: 'For IT, support, and developer learners moving into infrastructure.',
    roadmap: 'devops',
    milestones: [
      { title: 'Linux, Bash and Git', outcome: 'Work confidently in the shell, automate with scripts, and collaborate with Git.', track: 'devops-mlops', sections: ['Developer Essentials'] },
      { title: 'Networking', outcome: 'IP addressing, routing, TCP/UDP, DNS, HTTP, firewalls, and troubleshooting.', track: 'networking' },
      { title: 'Python for automation', outcome: 'Script repetitive infrastructure tasks.', track: 'python', sections: ['Python Foundations', 'Core Data Structures & Logic'] },
      { title: 'Containers', outcome: 'Build images and run multi-service apps with Docker and Compose.', track: 'devops-mlops', sections: ['Containers'] },
      { title: 'Cloud infrastructure as code', outcome: 'Compute, IAM, VPC networking, and Terraform.', track: 'devops-mlops', sections: ['Cloud Infrastructure'] },
      { title: 'CI/CD, Kubernetes and monitoring', outcome: 'Automate delivery with GitHub Actions, run workloads on Kubernetes, and alert on what matters.', track: 'devops-mlops', sections: ['Delivery & Operations'] },
      { title: 'AWS services in practice', outcome: 'Storage, compute, and managed services on AWS.', track: 'cloud-data', sections: ['AWS'] },
      { title: 'Site reliability engineering', outcome: 'SLOs, incident response, and capacity planning.', track: 'sre-platform-engineering' },
    ],
    capstone: { title: 'Automated cloud deployment', description: 'An app deployed with infrastructure as code, a CI/CD pipeline, and dashboards and alerts.' },
    interview: [{ title: 'Interview prep hub', href: '/learn/interview' }],
  },
  {
    slug: 'cybersecurity-analyst',
    title: 'Cybersecurity Analyst',
    school: 'security',
    summary: 'Understand attacks, defend systems, and investigate incidents.',
    audience: 'For IT and networking learners and career-switchers entering security.',
    roadmap: 'cybersecurity-analyst',
    milestones: [
      { title: 'Networking', outcome: 'IP addressing, routing, TCP/UDP, DNS, and HTTP.', track: 'networking', sections: NETWORKING_CORE },
      { title: 'Python basics', outcome: 'Write scripts for log parsing and automation.', track: 'python', sections: ['Python Foundations', 'Core Data Structures & Logic'] },
      { title: 'Security foundations', outcome: 'Threats, attack techniques, and core technical skills.', track: 'cybersecurity', sections: ['What Even Is This?', 'How Attacks Work', 'Core Technical Skills'] },
      { title: 'Offensive and defensive security', outcome: 'Penetration testing, SOC triage, packet analysis, forensics, and incident response.', track: 'cybersecurity', sections: ['Offensive Security', 'Defensive Security'] },
      { title: 'Security in production', outcome: 'DevSecOps, certifications, and career preparation.', track: 'cybersecurity', sections: ['Career & Production'] },
      { title: 'Application security and DevSecOps', outcome: 'Secure design reviews and vulnerability management.', track: 'application-security-devsecops' },
    ],
    capstone: { title: 'Home security lab', description: 'A lab with a vulnerable app, detections for common attacks, and a written incident report.' },
    interview: [{ title: 'Security interview prep', href: '/learn/cybersecurity/interview-prep-security' }],
  },
  {
    slug: 'ai-security-engineer',
    title: 'AI Security Engineer',
    school: 'security',
    summary: 'Secure LLM applications and agents against prompt injection, data leakage, and misuse.',
    audience: 'For security learners adding AI, and AI developers adding security.',
    milestones: [
      { title: 'Networking', outcome: 'IP addressing, routing, TCP/UDP, DNS, and HTTP.', track: 'networking', sections: NETWORKING_CORE },
      { title: 'Security foundations', outcome: 'Threats, attack techniques, and core technical skills.', track: 'cybersecurity', sections: ['What Even Is This?', 'How Attacks Work', 'Core Technical Skills'] },
      { title: 'How LLM applications work', outcome: 'Explain LLMs, prompting, RAG, agents, and their failure modes.', track: 'ai-ml', sections: ['Introduction', 'Large Language Models', LLM_APPS] },
      { title: 'LLM guardrails and observability', outcome: 'Evaluate, trace, and guard LLM features against prompt injection and data leakage.', track: 'generative-ai', sections: ['Quality, Safety & Operations'] },
      { title: 'Securing AI agents', outcome: 'Tool permissions, sandboxing, agent evaluation, and abuse-case testing.', track: 'agentic-ai', sections: ['Production Agents'] },
      { title: 'Application security and DevSecOps', outcome: 'Secure design reviews and vulnerability management.', track: 'application-security-devsecops' },
      { title: 'AI and LLM security', outcome: 'Prompt injection, model abuse, red-teaming, and guardrails.', track: 'ai-security' },
    ],
    capstone: { title: 'LLM red-team report', description: 'Attack and harden a sample RAG app, then document findings and mitigations.' },
    interview: [{ title: 'Security interview prep', href: '/learn/cybersecurity/interview-prep-security' }],
  },
  {
    slug: 'software-engineer',
    title: 'Software Engineer (interview-ready)',
    school: 'cs',
    summary: 'Master the computer-science core that technical interviews test: algorithms, databases, networks, and design.',
    audience: 'For students and developers preparing for software engineering interviews.',
    roadmap: 'backend-dev',
    milestones: [
      { title: 'Python', outcome: 'Write idiomatic, tested Python.', track: 'python' },
      { title: 'Command line and Git', outcome: 'Use the terminal, Bash, Git, and GitHub pull requests.', track: 'devops-mlops', sections: ['Developer Essentials'] },
      { title: 'Data structures and algorithms', outcome: 'Solve problems with the right structure, complexity, and interview pattern.', track: 'dsa' },
      { title: 'SQL essentials', outcome: 'Query and join relational data.', track: 'sql', sections: SQL_CORE },
      { title: 'Databases', outcome: 'Design, normalise, index, and reason about transactions.', track: 'dbms' },
      { title: 'Operating systems', outcome: 'Processes, threads, scheduling, synchronisation, memory, and file systems.', track: 'operating-systems' },
      { title: 'Networking', outcome: 'Explain what happens when you load a web page.', track: 'networking' },
      { title: 'System design', outcome: 'Design scalable services and discuss trade-offs.', track: 'system-design' },
    ],
    capstone: { title: 'Mock interview set', description: 'Timed DSA problems, a database design, and a system design walkthrough.' },
    interview: [
      { title: 'Python interview prep', href: '/learn/python/python-interview-prep' },
      { title: 'DBMS interview questions', href: '/learn/dbms/interview-questions' },
      { title: 'SQL interview questions', href: '/learn/sql/interview-questions' },
      { title: 'Operating systems interview questions', href: '/learn/operating-systems/os-interview-questions' },
      { title: 'DSA interview patterns', href: '/learn/dsa/interview-patterns' },
    ],
  },
]

export function getCareerPath(slug: string): CareerPath | undefined {
  return CAREER_PATHS.find(path => path.slug === slug)
}
