import type { RoadmapMeta } from './types'

export const roadmapRegistry: RoadmapMeta[] = [
  // Role-based
  { slug: 'data-engineer', title: 'Data Engineer', category: 'role', description: 'Build, maintain and optimise data pipelines at scale. The most in-demand data role in India.', totalTime: '6–9 months', nodeCount: 57, hasLiveContent: true },
  { slug: 'devops', title: 'DevOps Engineer', category: 'role', description: 'CI/CD, containers, cloud infrastructure, monitoring. The engineering backbone of every tech company.', totalTime: '5–7 months', nodeCount: 44, hasLiveContent: false },
  { slug: 'full-stack', title: 'Full Stack Developer', category: 'role', description: 'Build complete web applications — frontend, backend, database, and deployment.', totalTime: '6–9 months', nodeCount: 48, hasLiveContent: false },
  { slug: 'backend', title: 'Backend Developer', category: 'role', description: 'APIs, databases, authentication, and server-side architecture.', totalTime: '4–6 months', nodeCount: 40, hasLiveContent: false },
  { slug: 'frontend', title: 'Frontend Developer', category: 'role', description: 'HTML, CSS, JavaScript, React — building what users see and interact with.', totalTime: '4–6 months', nodeCount: 42, hasLiveContent: false },
  { slug: 'ml-engineer', title: 'ML / AI Engineer', category: 'role', description: 'Train models, build ML pipelines, deploy AI features to production.', totalTime: '8–12 months', nodeCount: 50, hasLiveContent: false },
  { slug: 'cloud-architect', title: 'Cloud Architect', category: 'role', description: 'Design scalable, secure, cost-efficient cloud systems across Azure, AWS, and GCP.', totalTime: '9–12 months', nodeCount: 46, hasLiveContent: false },
  { slug: 'data-scientist', title: 'Data Scientist', category: 'role', description: 'Statistics, Python, ML, and visualisation. Turn raw data into actionable insights.', totalTime: '7–10 months', nodeCount: 44, hasLiveContent: false },
  { slug: 'android', title: 'Android Developer', category: 'role', description: 'Build native Android apps with Kotlin and Jetpack Compose.', totalTime: '5–7 months', nodeCount: 38, hasLiveContent: false },
  { slug: 'qa-engineer', title: 'QA Engineer', category: 'role', description: 'Manual testing, automation with Selenium, API testing, and CI integration.', totalTime: '3–5 months', nodeCount: 34, hasLiveContent: false },
  { slug: 'cyber-security', title: 'Cyber Security', category: 'role', description: 'Networking, ethical hacking, SOC operations, and security best practices.', totalTime: '8–12 months', nodeCount: 46, hasLiveContent: false },
  { slug: 'database-admin', title: 'Database Administrator', category: 'role', description: 'PostgreSQL, MySQL, performance tuning, backup strategies, and high availability.', totalTime: '4–6 months', nodeCount: 38, hasLiveContent: false },

  // Skill-based
  { slug: 'python', title: 'Python', category: 'skill', description: 'The most important language for data, AI, and backend engineering.', totalTime: '2–3 months', nodeCount: 41, hasLiveContent: false },
  { slug: 'sql', title: 'SQL', category: 'skill', description: 'The language of data. Used in every data role, every single day.', totalTime: '6–8 weeks', nodeCount: 32, hasLiveContent: true },
  { slug: 'azure', title: 'Azure', category: 'skill', description: 'Microsoft Azure from portal basics to Data Factory, Databricks, and Synapse.', totalTime: '2–3 months', nodeCount: 38, hasLiveContent: true },
  { slug: 'aws', title: 'AWS', category: 'skill', description: 'Amazon Web Services — S3, Glue, Redshift, Lambda, and the data ecosystem.', totalTime: '2–3 months', nodeCount: 36, hasLiveContent: false },
  { slug: 'gcp', title: 'GCP', category: 'skill', description: 'Google Cloud Platform — BigQuery, Dataflow, Pub/Sub, and Cloud Composer.', totalTime: '6–8 weeks', nodeCount: 28, hasLiveContent: false },
  { slug: 'docker', title: 'Docker', category: 'skill', description: 'Containerise applications and run consistent environments everywhere.', totalTime: '3–4 weeks', nodeCount: 26, hasLiveContent: false },
  { slug: 'git', title: 'Git & GitHub', category: 'skill', description: 'Version control fundamentals every developer must know cold.', totalTime: '1–2 weeks', nodeCount: 20, hasLiveContent: false },
  { slug: 'javascript', title: 'JavaScript', category: 'skill', description: 'The language of the web. Required for any frontend or full-stack path.', totalTime: '2–3 months', nodeCount: 38, hasLiveContent: false },
  { slug: 'react', title: 'React', category: 'skill', description: 'The most widely used frontend library. Build interactive UIs with components.', totalTime: '6–8 weeks', nodeCount: 32, hasLiveContent: false },
  { slug: 'linux', title: 'Linux', category: 'skill', description: 'Command line, file system, networking, and shell scripting for engineers.', totalTime: '3–4 weeks', nodeCount: 28, hasLiveContent: false },
  { slug: 'kubernetes', title: 'Kubernetes', category: 'skill', description: 'Container orchestration at scale. Required for senior DevOps and MLOps roles.', totalTime: '6–8 weeks', nodeCount: 34, hasLiveContent: false },
  { slug: 'terraform', title: 'Terraform', category: 'skill', description: 'Infrastructure as code. Provision and manage cloud resources declaratively.', totalTime: '3–4 weeks', nodeCount: 26, hasLiveContent: false },
  { slug: 'postgresql', title: 'PostgreSQL', category: 'skill', description: 'The best open-source relational database. Deep dive beyond basic SQL.', totalTime: '4–6 weeks', nodeCount: 30, hasLiveContent: true },
  { slug: 'mongodb', title: 'MongoDB', category: 'skill', description: 'Document databases, aggregation pipelines, and schema design patterns.', totalTime: '3–4 weeks', nodeCount: 26, hasLiveContent: false },
  { slug: 'powerbi', title: 'Power BI', category: 'skill', description: 'Build dashboards, write DAX, connect to data sources. Top BI tool in India.', totalTime: '4–6 weeks', nodeCount: 28, hasLiveContent: false },
  { slug: 'dsa', title: 'DSA', category: 'skill', description: 'Data structures and algorithms for campus placements and FAANG interviews.', totalTime: '3–6 months', nodeCount: 50, hasLiveContent: false },

  // Project-based
  { slug: 'azure-data-pipeline', title: 'Azure Data Pipeline', category: 'project', description: 'Six end-to-end ADF projects — from copying a single CSV to pulling live REST API data.', totalTime: '6–8 weeks', nodeCount: 6, hasLiveContent: true },
  { slug: 'aws-data-pipeline', title: 'AWS Data Pipeline', category: 'project', description: 'S3 ingestion, Glue transformations, Redshift loading — the AWS data stack end-to-end.', totalTime: '4–6 weeks', nodeCount: 5, hasLiveContent: false },
  { slug: 'gcp-data-pipeline', title: 'GCP Data Pipeline', category: 'project', description: 'GCS → Dataflow → BigQuery — the full GCP analytics pipeline with real data.', totalTime: '3–4 weeks', nodeCount: 4, hasLiveContent: false },
  { slug: 'full-stack-app', title: 'Full Stack Web App', category: 'project', description: 'React + Node.js + PostgreSQL + deployment — build a real production-grade web app.', totalTime: '4–6 weeks', nodeCount: 8, hasLiveContent: false },
  { slug: 'ml-to-production', title: 'ML Model to Production', category: 'project', description: 'Train a model, wrap it in a FastAPI, containerise it, and deploy to the cloud.', totalTime: '4–5 weeks', nodeCount: 7, hasLiveContent: false },

  // Best Practices
  { slug: 'azure-best-practices', title: 'Azure Best Practices', category: 'best-practices', description: 'Naming conventions, RBAC, cost optimisation, tagging strategy, and security baselines.', totalTime: '1–2 weeks', nodeCount: 22, hasLiveContent: false },
  { slug: 'aws-best-practices', title: 'AWS Best Practices', category: 'best-practices', description: 'The Well-Architected Framework applied — reliability, security, cost, performance.', totalTime: '1–2 weeks', nodeCount: 24, hasLiveContent: false },
  { slug: 'sql-optimization', title: 'SQL Query Optimisation', category: 'best-practices', description: 'Indexes, EXPLAIN plans, query rewrites, and avoiding common performance pitfalls.', totalTime: '1 week', nodeCount: 18, hasLiveContent: false },
  { slug: 'api-design', title: 'API Design', category: 'best-practices', description: 'REST conventions, versioning, error handling, pagination, and documentation.', totalTime: '1 week', nodeCount: 16, hasLiveContent: false },
  { slug: 'data-pipeline-practices', title: 'Data Pipeline Best Practices', category: 'best-practices', description: 'Idempotency, retry logic, logging, alerting, and pipeline testing patterns.', totalTime: '1 week', nodeCount: 20, hasLiveContent: false },
  { slug: 'code-review', title: 'Code Review', category: 'best-practices', description: 'What to look for, how to give feedback, and how to structure review checklists.', totalTime: '3–4 days', nodeCount: 14, hasLiveContent: false },
]

export function getRoadmapMeta(slug: string): RoadmapMeta | undefined {
  return roadmapRegistry.find(r => r.slug === slug)
}

export function getRoadmapsByCategory(category: RoadmapMeta['category']): RoadmapMeta[] {
  return roadmapRegistry.filter(r => r.category === category)
}