import type { Roadmap, RoadmapNode } from '@/data/roadmaps/types'

const COLS = [30, 190, 350, 510, 670]
const at = (col: number, row: number) => ({ x: COLS[col], y: 20 + row * 100, width: 145, height: 60 })

const nodes: RoadmapNode[] = [
  // Stage 1 — Foundations
  { id: 'linux', title: 'Linux & CLI', type: 'required', xp: 10, prerequisites: [], difficulty: 'beginner', time: '2–3 hrs', description: 'Files, permissions, grep, tail, ssh and cron. Data engineers debug pipelines on servers and containers from a terminal.', href: '/learn/data-engineering/linux-shell', ...at(0, 0) },
  { id: 'git', title: 'Git & GitHub', type: 'required', xp: 10, prerequisites: [], difficulty: 'beginner', time: '2–3 hrs', description: 'Commits, branches, pull requests and merge conflicts. Pipeline code, SQL models and infrastructure all live in Git.', href: '/learn/data-engineering/git-for-data', ...at(1, 0) },
  { id: 'python', title: 'Python', type: 'required', xp: 10, prerequisites: [], difficulty: 'beginner', time: '8–10 hrs', description: 'Functions, files, error handling and calling APIs. Aim to write small working scripts without looking up syntax.', href: '/learn/python', ...at(2, 0) },
  { id: 'networking', title: 'Networking Basics', type: 'optional', xp: 10, prerequisites: [], difficulty: 'beginner', time: '3 hrs', description: 'TCP/IP, DNS, HTTP and ports. Enough to understand why cloud data services need private networking and firewall rules.', href: '/learn/networking/what-is-a-network', ...at(3, 0) },

  // Stage 2 — SQL and data handling
  { id: 'sql', title: 'SQL', type: 'required', xp: 10, prerequisites: [], difficulty: 'beginner', time: '6–8 hrs', description: 'SELECT, joins, GROUP BY and subqueries. SQL is the language you will use most as a data engineer.', href: '/learn/sql', ...at(0, 1) },
  { id: 'sqladv', title: 'Advanced SQL', type: 'required', xp: 15, prerequisites: ['sql'], difficulty: 'intermediate', time: '5–6 hrs', description: 'Window functions, CTEs, recursive queries and reading query plans. The SQL that interviews and real pipelines both demand.', ...at(1, 1) },
  { id: 'pandas', title: 'Pandas & NumPy', type: 'required', xp: 15, prerequisites: ['python'], difficulty: 'beginner', time: '6–8 hrs', description: 'Load, clean, join and reshape tabular data in Python. The bridge between scripting and distributed processing with Spark.', ...at(2, 1) },
  { id: 'apis', title: 'Working with APIs', type: 'recommended', xp: 10, prerequisites: ['python'], difficulty: 'beginner', time: '3 hrs', description: 'Call REST APIs, page through results, handle rate limits and retries. Many pipelines start by pulling data from an API.', ...at(3, 1) },

  // Stage 3 — Modelling and storage
  { id: 'datamodeling', title: 'Data Modeling', type: 'required', xp: 15, prerequisites: ['sqladv'], difficulty: 'intermediate', time: '5–6 hrs', description: 'Star schemas, facts and dimensions, slowly changing dimensions and Data Vault. Good models make every downstream query simpler.', ...at(0, 2) },
  { id: 'warehouse', title: 'Warehouses & Snowflake', type: 'required', xp: 15, prerequisites: ['sql'], difficulty: 'intermediate', time: '6–8 hrs', description: 'How cloud warehouses store and query data: Snowflake, BigQuery and Redshift, with columnar storage and separated compute.', ...at(1, 2) },
  { id: 'data_arch', title: 'Lakes & Lakehouse', type: 'required', xp: 15, prerequisites: ['warehouse'], difficulty: 'intermediate', time: '4–5 hrs', description: 'Data lakes, the lakehouse, medallion layers and table formats such as Delta Lake and Iceberg.', ...at(2, 2) },
  { id: 'cloud', title: 'Cloud Fundamentals', type: 'required', xp: 10, prerequisites: ['linux'], difficulty: 'beginner', time: '4–5 hrs', description: 'Storage, compute, IAM and networking on Azure, AWS or GCP. Pick one cloud and learn its data services well.', ...at(3, 2) },

  // Stage 4 — Processing and pipelines
  { id: 'ingestion', title: 'Ingestion & ETL / ELT', type: 'required', xp: 15, prerequisites: ['python', 'sql'], difficulty: 'intermediate', time: '5–6 hrs', description: 'Full and incremental loads, change data capture, and when to transform before or after loading.', ...at(0, 3) },
  { id: 'spark', title: 'Spark & PySpark', type: 'required', xp: 20, prerequisites: ['pandas', 'data_arch'], difficulty: 'intermediate', time: '8–10 hrs', description: 'DataFrames, partitions, shuffles and joins. Spark processes data that is too big for one machine.', ...at(1, 3) },
  { id: 'orchestration', title: 'Airflow & Orchestration', type: 'required', xp: 15, prerequisites: ['ingestion'], difficulty: 'intermediate', time: '6–8 hrs', description: 'DAGs, schedules, retries, backfills and dependencies. Orchestration turns scripts into reliable pipelines.', ...at(2, 3) },
  { id: 'dbt', title: 'dbt', type: 'required', xp: 15, prerequisites: ['sqladv', 'warehouse'], difficulty: 'intermediate', time: '6–8 hrs', description: 'Version-controlled SQL models, tests, documentation and incremental models inside the warehouse.', ...at(3, 3) },
  { id: 'kafka', title: 'Streaming & Kafka', type: 'recommended', xp: 20, prerequisites: ['ingestion'], difficulty: 'advanced', time: '8–10 hrs', description: 'Batch versus streaming, Kafka topics and consumer groups, and stream processing with Spark or Flink.', ...at(4, 3) },

  // Stage 5 — Production pipelines
  { id: 'adf', title: 'Cloud ETL Services', type: 'required', xp: 15, prerequisites: ['cloud', 'orchestration'], difficulty: 'intermediate', time: '6–8 hrs', description: 'Managed pipeline services: Azure Data Factory, AWS Glue and Step Functions, and GCP Dataflow.', ...at(0, 4) },
  { id: 'dataquality', title: 'Data Quality & Testing', type: 'required', xp: 15, prerequisites: ['dbt'], difficulty: 'intermediate', time: '4–5 hrs', description: 'Freshness, completeness and validity checks, dbt tests and contracts, so bad data never reaches a dashboard.', ...at(1, 4) },
  { id: 'monitoring', title: 'Monitoring & Alerts', type: 'required', xp: 10, prerequisites: ['orchestration'], difficulty: 'intermediate', time: '3–4 hrs', description: 'Logs, metrics, SLAs and alerting for pipelines. Know a job failed before your stakeholders do.', ...at(2, 4) },
  { id: 'performance', title: 'Performance & Cost', type: 'recommended', xp: 15, prerequisites: ['spark', 'warehouse'], difficulty: 'advanced', time: '4–5 hrs', description: 'Partitioning, file sizes, query tuning and controlling cloud spend for Spark and warehouses.', ...at(3, 4) },
  { id: 'governance', title: 'Data Governance', type: 'optional', xp: 10, prerequisites: ['data_arch'], difficulty: 'intermediate', time: '3 hrs', description: 'Catalogues, lineage, access control and handling sensitive data.', ...at(4, 4) },

  // Stage 6 — Projects and interviews
  { id: 'projects', title: 'Guided Pipeline Projects', type: 'chaduvuko', xp: 30, prerequisites: ['adf'], difficulty: 'intermediate', time: '15–20 hrs', description: 'Six guided Azure projects, from copying CSV files to pulling data from a REST API, plus a batch pipeline built from scratch.', href: '/learn/projects', ...at(0, 5) },
  { id: 'capstone', title: 'Capstone Project', type: 'required', xp: 30, prerequisites: ['spark', 'orchestration', 'dataquality'], difficulty: 'advanced', time: '15–20 hrs', description: 'An end-to-end pipeline you can show employers: ingestion, transformation, tests, orchestration and a final dataset.', ...at(1, 5) },
  { id: 'systemdesign', title: 'System Design for DE', type: 'required', xp: 20, prerequisites: ['spark', 'datamodeling'], difficulty: 'advanced', time: '8–10 hrs', description: 'Design batch and streaming data platforms and explain the trade-offs out loud.', ...at(2, 5) },
  { id: 'interview', title: 'Interview Prep', type: 'required', xp: 20, prerequisites: ['systemdesign'], difficulty: 'advanced', time: '10–12 hrs', description: 'SQL, Python, Spark, modelling and behavioural questions with model answers.', ...at(3, 5) },
]

export const dataEngineerRoadmap: Roadmap = {
  id: 'data-engineer',
  slug: 'data-engineer',
  title: 'Data Engineer',
  subtitle: 'From zero to job-ready',
  category: 'role',
  description: 'The complete path to becoming a data engineer: Linux, Python and SQL, data modelling, warehouses and lakehouses, Spark, Airflow, dbt and streaming, then production pipelines, projects and interviews.',
  level: 'beginner',
  estimatedTime: '4–6 months',
  salaryData: [
    { company: 'Consulting (Accenture, Cognizant)', range: '$75K–$100K', note: 'Most common first job' },
    { company: 'Product Startup', range: '$115K–$150K', note: 'DoorDash, Brex, Stripe' },
    { company: 'Enterprise / Large Corp', range: '$140K–$180K', note: 'Strong benefits + stock' },
    { company: 'FAANG', range: '$185K–$260K', note: 'Google, Amazon, Microsoft' },
  ],
  sections: [
    { row: 20, label: 'Foundations', description: 'The tools every data engineer uses daily: the terminal, Git and Python.' },
    { row: 120, label: 'SQL and data handling', description: 'Query and reshape data confidently in SQL and pandas.' },
    { row: 220, label: 'Data modelling and storage', description: 'Design tables and learn where analytical data lives.' },
    { row: 320, label: 'Processing and pipelines', description: 'Move and transform data at scale with Spark, Airflow, dbt and Kafka.' },
    { row: 420, label: 'Production pipelines', description: 'Run pipelines reliably: managed cloud services, data quality, monitoring and cost.' },
    { row: 520, label: 'Projects and interviews', description: 'Prove your skills with projects, then prepare for interviews.' },
  ],
  nodes,
  edges: nodes.flatMap(node => (node.prerequisites ?? []).map(from => ({ from, to: node.id }))),
}
