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
const SQL_CORE = ['Databases & Setup', 'Reading Data — SELECT', 'Filtering & Logic', 'Aggregation', 'Joins']

export const CAREER_PATHS: CareerPath[] = [
  {
    slug: 'ai-engineer',
    title: 'AI Engineer',
    school: 'ai',
    summary: 'Build applications on top of large language models: prompting, embeddings, RAG, evaluation, and deployment.',
    audience: 'For developers and graduates who want to ship AI features, not train models from scratch.',
    roadmap: 'ai-engineer',
    milestones: [
      { title: 'Python for AI work', outcome: 'Write, structure, and debug Python programs.', track: 'python', sections: PYTHON_CORE },
      { title: 'SQL essentials', outcome: 'Query and join the data your AI features depend on.', track: 'sql', sections: SQL_CORE },
      { title: 'How machine learning works', outcome: 'Explain training, evaluation, and the maths behind models.', track: 'ai-ml', sections: ['Introduction', 'Math Foundations', 'Programming Ecosystem', 'Classical Machine Learning', 'Evaluation and Optimisation'] },
      { title: 'Deep learning and language models', outcome: 'Understand neural networks, transformers, and NLP.', track: 'ai-ml', sections: ['Deep Learning', 'Natural Language Processing'] },
      { title: 'Generative AI and RAG', outcome: 'Build retrieval-augmented generation and work with LLM APIs.', track: 'ai-ml', sections: ['Generative AI'] },
      { title: 'AI in production', outcome: 'Deploy, monitor, and run models on cloud ML platforms.', track: 'ai-ml', sections: ['MLOps and Production', 'Cloud ML Platforms'] },
      { title: 'LLM engineering in depth', outcome: 'Evaluation, guardrails, cost control, and LLM system design.', track: 'generative-ai' },
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
      { title: 'Python for AI work', outcome: 'Write, structure, and debug Python programs.', track: 'python', sections: PYTHON_CORE },
      { title: 'How AI and LLMs work', outcome: 'Explain models, embeddings, and their limits.', track: 'ai-ml', sections: ['Introduction', 'Natural Language Processing'] },
      { title: 'Generative AI and RAG', outcome: 'Build retrieval-augmented generation and work with LLM APIs.', track: 'ai-ml', sections: ['Generative AI'] },
      { title: 'LLM engineering', outcome: 'Prompting, structured outputs, tool calling, and evaluation.', track: 'generative-ai' },
      { title: 'Agents and automation', outcome: 'Agent state, memory, planning, MCP, multi-agent systems, and observability.', track: 'agentic-ai' },
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
      { title: 'Python for AI work', outcome: 'Write, structure, and debug Python programs.', track: 'python', sections: PYTHON_CORE },
      { title: 'SQL essentials', outcome: 'Query and join training data.', track: 'sql', sections: SQL_CORE },
      { title: 'Maths and the ML toolkit', outcome: 'Linear algebra, probability, NumPy, pandas, and data preparation for ML.', track: 'ai-ml', sections: ['Introduction', 'Math Foundations', 'Programming Ecosystem', 'Data Engineering for ML'] },
      { title: 'Classical machine learning', outcome: 'Train and evaluate regression, trees, ensembles, and clustering.', track: 'ai-ml', sections: ['Classical Machine Learning', 'Evaluation and Optimisation'] },
      { title: 'Deep learning', outcome: 'Neural networks, NLP, and computer vision.', track: 'ai-ml', sections: ['Deep Learning', 'Natural Language Processing', 'Computer Vision'] },
      { title: 'MLOps and production', outcome: 'Pipelines, feature stores, deployment, and monitoring.', track: 'ai-ml', sections: ['MLOps and Production', 'Cloud ML Platforms'] },
      { title: 'DevOps and Kubernetes for ML', outcome: 'Containers, CI/CD, and serving models at scale.', track: 'devops-mlops' },
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
      { title: 'Data engineering foundations', outcome: 'Know what data engineers do and the core tools.', track: 'foundations' },
      { title: 'SQL', outcome: 'From SELECT to window functions and query performance.', track: 'sql' },
      { title: 'Python for data', outcome: 'Write, structure, and debug Python programs.', track: 'python', sections: PYTHON_CORE },
      { title: 'Data engineering core', outcome: 'Ingestion, modelling, orchestration, storage, quality, and governance.', track: 'data-engineering' },
      { title: 'Streaming with Kafka', outcome: 'Produce, consume, and operate event streams.', track: 'apache-kafka' },
      { title: 'Transformation with dbt', outcome: 'Model, test, and document warehouse transformations.', track: 'dbt' },
      { title: 'Cloud warehouse: Snowflake', outcome: 'Load, transform, secure, and tune a cloud warehouse.', track: 'snowflake' },
      { title: 'Cloud data services: AWS', outcome: 'S3, Glue, Redshift, Kinesis, and Athena.', track: 'aws' },
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
      { title: 'Transformation with dbt', outcome: 'Model, test, and document warehouse transformations.', track: 'dbt' },
      { title: 'Cloud warehouse: Snowflake', outcome: 'Load, transform, secure, and tune a cloud warehouse.', track: 'snowflake' },
      { title: 'Analytics engineering and metrics', outcome: 'Metric definitions, experiments, and stakeholder analysis.', track: 'analytics-engineering-data-analytics' },
      { title: 'Business intelligence', outcome: 'Dashboards and data storytelling.', track: 'business-intelligence' },
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
      { title: 'JavaScript and TypeScript', outcome: 'Language fundamentals, async code, and typed applications.', track: 'javascript' },
      { title: 'Python basics', outcome: 'Write and debug small back-end scripts.', track: 'python', sections: ['Python Foundations', 'Core Data Structures & Logic'] },
      { title: 'SQL essentials', outcome: 'Store and query application data.', track: 'sql', sections: SQL_CORE },
      { title: 'Database design', outcome: 'Model data, normalise tables, and choose indexes.', track: 'dbms', sections: ['Foundations', 'Design & SQL'] },
      { title: 'Full-stack development with AI', outcome: 'APIs, auth, deployment, and AI features in a real app.', track: 'full-stack-ai' },
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
      { title: 'Networking', outcome: 'IP addressing, routing, TCP/UDP, DNS, and HTTP.', track: 'networking' },
      { title: 'Python for automation', outcome: 'Script repetitive infrastructure tasks.', track: 'python', sections: ['Python Foundations', 'Core Data Structures & Logic'] },
      { title: 'AWS', outcome: 'Core AWS storage, compute, and data services.', track: 'aws' },
      { title: 'Microsoft Azure', outcome: 'Core Azure storage, compute, and data services.', track: 'azure' },
      { title: 'DevOps, Kubernetes and MLOps', outcome: 'Containers, CI/CD, infrastructure as code, and Kubernetes.', track: 'devops-mlops' },
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
      { title: 'Networking', outcome: 'IP addressing, routing, TCP/UDP, DNS, and HTTP.', track: 'networking' },
      { title: 'Python basics', outcome: 'Write scripts for log parsing and automation.', track: 'python', sections: ['Python Foundations', 'Core Data Structures & Logic'] },
      { title: 'Security foundations', outcome: 'Threats, attack techniques, and core technical skills.', track: 'cybersecurity', sections: ['What Even Is This?', 'How Attacks Work', 'Core Technical Skills'] },
      { title: 'Offensive and defensive security', outcome: 'Penetration-testing methods, detection, and incident response.', track: 'cybersecurity', sections: ['Offensive Security', 'Defensive Security'] },
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
      { title: 'Networking', outcome: 'IP addressing, routing, TCP/UDP, DNS, and HTTP.', track: 'networking' },
      { title: 'Security foundations', outcome: 'Threats, attack techniques, and core technical skills.', track: 'cybersecurity', sections: ['What Even Is This?', 'How Attacks Work', 'Core Technical Skills'] },
      { title: 'How AI and LLMs work', outcome: 'Explain models, embeddings, RAG, and their failure modes.', track: 'ai-ml', sections: ['Introduction', 'Generative AI'] },
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
      { title: 'Data structures and algorithms', outcome: 'Solve problems with the right structure and complexity.', track: 'dsa' },
      { title: 'Databases', outcome: 'Design, normalise, index, and reason about transactions.', track: 'dbms' },
      { title: 'SQL essentials', outcome: 'Query and join relational data.', track: 'sql', sections: SQL_CORE },
      { title: 'Networking', outcome: 'Explain what happens when you load a web page.', track: 'networking' },
      { title: 'System design', outcome: 'Design scalable services and discuss trade-offs.', track: 'system-design' },
    ],
    capstone: { title: 'Mock interview set', description: 'Timed DSA problems, a database design, and a system design walkthrough.' },
    interview: [
      { title: 'Python interview prep', href: '/learn/python/python-interview-prep' },
      { title: 'DBMS interview questions', href: '/learn/dbms/interview-questions' },
      { title: 'SQL interview questions', href: '/learn/sql/interview-questions' },
    ],
  },
]

export function getCareerPath(slug: string): CareerPath | undefined {
  return CAREER_PATHS.find(path => path.slug === slug)
}
