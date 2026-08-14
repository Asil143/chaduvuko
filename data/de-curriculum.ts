// ─────────────────────────────────────────────────────────────────────────────
// Data Engineering curriculum — shared source of truth for the track listing
// page and the per-lesson DESectionNav. Mirrors data/sql-freshcart.ts's
// SQL_CURRICULUM shape so both tracks share the same section-nav pattern.
// ─────────────────────────────────────────────────────────────────────────────

export type DEModuleStatus = 'live' | 'soon'

export interface DEModule {
  id: number
  slug: string
  title: string
  description: string
  tags: string[]
  status: DEModuleStatus
  readTime: string
  xp: number
}

export interface DESection {
  id: number
  title: string
  color: string
  modules: DEModule[]
}

export const DE_CURRICULUM: DESection[] = [
  {
    id: 1, title: 'What Even Is This?', color: '#00e676',
    modules: [
      { id: 1, slug: 'what-is-data', title: 'What is Data? How Computers Store Information', description: 'Before you engineer data you need to understand what data actually is — bits, bytes, files, and memory. Built from scratch so nothing feels like magic.', tags: ['Bits & bytes', 'Files vs databases', 'How memory works', 'Why data needs engineers'], status: 'live', readTime: '25 min', xp: 100 },
      { id: 2, slug: 'what-is-data-engineering', title: 'What is Data Engineering?', description: 'The role, the career, a real day-in-the-life at a Seattle startup, and why this job exists at all. The clearest explanation you will find anywhere.', tags: ['The role defined', 'Day-in-the-life', 'Why it exists', 'Career paths', 'What DEs actually build'], status: 'live', readTime: '30 min', xp: 100 },
      { id: 3, slug: 'how-data-moves', title: 'How Data Moves Through a Company', description: 'The complete end-to-end story — from the moment data is created at a source, to the dashboard a business leader looks at every morning.', tags: ['Source systems', 'Data in motion', 'Storage layers', 'Who uses the data', 'Real company example'], status: 'live', readTime: '35 min', xp: 100 },
      { id: 4, slug: 'de-ecosystem', title: 'The Data Engineering Ecosystem — Map of All the Tools', description: 'There are hundreds of tools in this space. This module maps all of them, explains why so many exist, and shows exactly where each one fits.', tags: ['Ingestion tools', 'Storage tools', 'Processing tools', 'Orchestration tools', 'Serving tools'], status: 'live', readTime: '30 min', xp: 100 },
      { id: 5, slug: 'de-vs-other-roles', title: 'Data Engineer vs Analyst vs Scientist vs ML Engineer', description: 'Clear, permanent boundaries between the four most confused roles in all of tech. Know exactly where you fit and where each role ends.', tags: ['DE vs DA', 'DE vs DS', 'DE vs MLE', 'Who works with whom', 'Which role to target'], status: 'live', readTime: '25 min', xp: 100 },
      { id: 6, slug: 'de-usa-job-market', title: 'Data Engineering in the US Job Market (2026)', description: 'Real salary data by city and company type, top hiring companies, skills in demand, and how to break into DE from a non-CS background.', tags: ['Salary by city', 'Company multipliers', 'Top hiring companies', 'Skills in JDs', 'Breaking in from non-CS'], status: 'live', readTime: '35 min', xp: 150 },
    ],
  },
  {
    id: 2, title: 'Data Fundamentals', color: '#7b61ff',
    modules: [
      { id: 7, slug: 'data-types-structured', title: 'Structured, Semi-Structured and Unstructured Data', description: 'The three categories every data engineer works with daily — what makes each one different and what each demands from your pipeline.', tags: ['Structured (tables)', 'Semi-structured (JSON/XML)', 'Unstructured (images/text)', 'Storage implications'], status: 'live', readTime: '30 min', xp: 100 },
      { id: 8, slug: 'data-formats', title: 'Data Formats — CSV, JSON, Parquet, Avro, ORC', description: 'Not just what each format is — but when to use it, what it costs in storage and compute, and what breaks when you choose the wrong one.', tags: ['CSV internals', 'JSON & nesting', 'Parquet columnar', 'Avro & schema evolution', 'ORC for Hive', 'When to use each'], status: 'live', readTime: '45 min', xp: 150 },
      { id: 9, slug: 'databases-internals', title: 'Databases — What They Are and How They Work Internally', description: 'Storage engines, B-trees, indexes, buffer pools, WAL — the inside story that makes you 10× better at every database you ever use.', tags: ['Storage engines', 'B-tree indexes', 'Buffer pool', 'WAL & durability', 'How reads & writes work'], status: 'live', readTime: '50 min', xp: 150 },
      { id: 10, slug: 'sql-vs-nosql', title: 'SQL vs NoSQL — The Real Difference', description: 'Why the choice matters, what each one trades off, and how to pick the right store for any situation — without cargo-culting trends.', tags: ['Relational model', 'Document stores', 'Key-value stores', 'Column-family stores', 'When to use each'], status: 'live', readTime: '40 min', xp: 150 },
      { id: 11, slug: 'warehouse-lake-lakehouse', title: 'Data Warehouse vs Data Lake vs Lakehouse', description: 'Three different answers to the same question: where do we keep all this data? The honest trade-offs, explained simply.', tags: ['Warehouse design', 'Data lake design', 'Lakehouse evolution', 'Cost vs flexibility', 'Choosing the right one'], status: 'live', readTime: '45 min', xp: 150 },
      { id: 12, slug: 'schemas-tables-keys', title: 'Schemas, Tables, Keys and Indexes — The Building Blocks', description: 'The building blocks of every database. Understanding these deeply separates good engineers from great ones.', tags: ['What a schema is', 'Primary & foreign keys', 'Indexes explained', 'Constraints', 'Schema design patterns'], status: 'live', readTime: '40 min', xp: 150 },
      { id: 13, slug: 'acid-transactions', title: 'ACID Properties and Transactions', description: 'Why ACID exists, what each property means in practice, and what actually happens when a transaction fails halfway through.', tags: ['Atomicity', 'Consistency', 'Isolation', 'Durability', 'Transactions in practice', 'What breaks without ACID'], status: 'live', readTime: '40 min', xp: 150 },
    ],
  },
  {
    id: 3, title: 'Core Engineering Skills', color: '#f97316',
    modules: [
      { id: 14, slug: 'python-for-de', title: 'Python for Data Engineering', description: 'Not Python 101. Python for pipelines — file I/O at scale, REST APIs, error handling, exponential backoff, logging, generators, and testable code.', tags: ['File I/O at scale', 'REST API calls', 'Error handling & retries', 'Logging patterns', 'Generators', 'Writing testable code'], status: 'live', readTime: '75 min', xp: 200 },
      { id: 15, slug: 'sql-for-de', title: 'SQL for Data Engineers — Beyond the Basics', description: 'Window functions, complex CTEs, deduplication patterns, SCD in SQL, and the advanced queries every DE interview actually tests.', tags: ['Window functions', 'Complex CTEs', 'Deduplication', 'Running totals', 'Moving averages', 'Interview patterns'], status: 'live', readTime: '70 min', xp: 200 },
      { id: 16, slug: 'linux-shell', title: 'Linux and Shell Scripting for Data Engineers', description: 'Navigate, process files, write bash scripts, schedule cron jobs, and monitor processes — everything you need from the terminal.', tags: ['File system navigation', 'grep / awk / sed', 'Bash scripting', 'Cron jobs', 'Log processing', 'SSH & remote access'], status: 'live', readTime: '60 min', xp: 150 },
      { id: 17, slug: 'git-for-data', title: 'Git and Version Control for Data Projects', description: 'Branching strategies, managing large files, pre-commit hooks, and semantic versioning — for data teams specifically.', tags: ['Branching strategies', 'git-lfs for data', '.gitignore patterns', 'Pre-commit hooks', 'PR workflows'], status: 'live', readTime: '45 min', xp: 150 },
      { id: 18, slug: 'working-with-apis', title: 'Working with APIs — REST, Auth, Pagination, Rate Limits', description: 'Every data engineer pulls from APIs. Build robust ingestion classes with retries, pagination, OAuth, and checkpointing.', tags: ['REST fundamentals', 'Pagination patterns', 'OAuth 2.0', 'Rate limiting & backoff', 'Checkpointing', 'Webhooks'], status: 'live', readTime: '55 min', xp: 150 },
      { id: 19, slug: 'files-at-scale', title: 'Working with Files at Scale', description: 'Partitioning strategies, compression algorithms, the small file problem, and how columnar storage works internally.', tags: ['Hive-style partitioning', 'Compression tradeoffs', 'Small file problem', 'File size optimisation', 'Schema evolution'], status: 'live', readTime: '50 min', xp: 150 },
    ],
  },
  {
    id: 4, title: 'How Data Moves', color: '#facc15',
    modules: [
      { id: 20, slug: 'what-is-a-pipeline', title: 'What is a Data Pipeline? Anatomy and Design Principles', description: 'The most important concept in data engineering. Every component, how they connect, and the principles that make a pipeline good.', tags: ['Pipeline anatomy', 'Stages explained', 'Design principles', 'What makes a good pipeline', 'Common anti-patterns'], status: 'live', readTime: '45 min', xp: 150 },
      { id: 21, slug: 'batch-vs-streaming', title: 'Batch vs Streaming vs Micro-Batch', description: 'Three processing models with real trade-offs. Know each deeply enough to pick the right one for any business problem.', tags: ['Batch processing', 'Streaming processing', 'Micro-batch', 'Latency vs throughput', 'Choosing the right model'], status: 'live', readTime: '45 min', xp: 150 },
      { id: 22, slug: 'etl-vs-elt', title: 'ETL vs ELT — History, Difference, When to Use Each', description: 'Why ETL dominated for 30 years, why ELT replaced it, and the situations where the old way is still the right way.', tags: ['ETL explained', 'ELT explained', 'Why the shift happened', 'When ETL still wins', 'Push vs pull models'], status: 'live', readTime: '40 min', xp: 150 },
      { id: 23, slug: 'ingestion-patterns', title: 'Data Ingestion Patterns — Full Load, Incremental, CDC', description: 'The three ways to pull data from a source system. Most engineers only know one. Learn all three and when each one breaks.', tags: ['Full load', 'Incremental load', 'Watermark patterns', 'CDC overview', 'Choosing the right pattern'], status: 'live', readTime: '50 min', xp: 150 },
      { id: 24, slug: 'change-data-capture', title: 'Change Data Capture (CDC) — How It Works Under the Hood', description: 'Log-based, trigger-based, query-based CDC — the internals, the trade-offs, and the production gotchas nobody writes about.', tags: ['Log-based CDC', 'Trigger-based CDC', 'Query-based CDC', 'Transaction logs', 'Production gotchas'], status: 'live', readTime: '55 min', xp: 200 },
      { id: 25, slug: 'batch-pipeline-from-scratch', title: 'Building a Batch Pipeline From Scratch', description: 'A complete Python pipeline: extract → validate → transform → load → checkpoint. Full code, full errors, full production decisions explained.', tags: ['Extract phase', 'Validation patterns', 'Transform logic', 'Load strategies', 'Checkpointing', 'Full working code'], status: 'live', readTime: '70 min', xp: 200 },
      { id: 26, slug: 'idempotency-atomicity', title: 'Idempotency, Atomicity and Pipeline Restartability', description: 'Why every pipeline must be safe to re-run. The two properties that separate toy pipelines from production ones.', tags: ['What idempotency means', 'Atomic operations', 'Making pipelines restartable', 'UPSERT patterns', 'Overwrite vs append'], status: 'live', readTime: '45 min', xp: 150 },
      { id: 27, slug: 'error-handling-retries', title: 'Error Handling, Retries and Dead Letter Queues', description: 'What happens when a pipeline fails at 3am. How to build systems that survive the real world without waking anyone up.', tags: ['Error categories', 'Retry policies', 'Exponential backoff', 'Dead letter queues', 'Alerting patterns'], status: 'live', readTime: '50 min', xp: 150 },
      { id: 28, slug: 'pipeline-orchestration', title: 'Pipeline Orchestration — What a Scheduler Does', description: 'The concepts behind orchestrators — DAGs, dependencies, triggers, backfill — without tying you to any single tool.', tags: ['What orchestration is', 'DAGs explained', 'Dependencies & triggers', 'Backfill concept', 'Scheduler internals'], status: 'live', readTime: '45 min', xp: 150 },
    ],
  },
  {
    id: 5, title: 'Storage & Architecture', color: '#4285f4',
    modules: [
      { id: 29, slug: 'data-lake-architecture', title: 'Data Lake Architecture — Design, Zones and Anti-Patterns', description: 'How to design a data lake that stays useful for years — and the patterns that turn it into an unmaintainable swamp.', tags: ['Zone design', 'Raw zone', 'Processed zone', 'Landing zone', 'Anti-patterns', 'Data swamp causes'], status: 'live', readTime: '50 min', xp: 150 },
      { id: 30, slug: 'medallion-architecture', title: 'Medallion Architecture — Bronze, Silver, Gold', description: 'The most popular data lake design pattern at modern companies. What each layer does, why it exists, and how to implement it.', tags: ['Bronze layer', 'Silver layer', 'Gold layer', 'What goes where', 'Implementation decisions'], status: 'live', readTime: '45 min', xp: 150 },
      { id: 31, slug: 'warehouse-concepts', title: 'Data Warehouse Concepts — Columnar Storage and Distribution', description: 'How a warehouse actually stores and queries data at scale. The internals that explain both the performance and the cost.', tags: ['Columnar vs row storage', 'Compression in warehouses', 'Distributed query', 'Partitioning', 'Clustering'], status: 'live', readTime: '55 min', xp: 150 },
      { id: 32, slug: 'lakehouse-architecture', title: 'Lakehouse Architecture — Why It Exists and How It Works', description: 'The best of warehouse and lake in one architecture. Why the industry moved here and what problems it actually solves.', tags: ['Why lakehouse emerged', 'Table formats', 'ACID on object storage', 'Open vs closed lakehouses', 'The future'], status: 'live', readTime: '45 min', xp: 150 },
      { id: 33, slug: 'data-modelling', title: 'Data Modelling — Dimensional, Star and Snowflake Schema', description: 'How to organise data so analysts can query it fast and intuitively. The art behind every well-designed analytics table.', tags: ['Dimensional modelling', 'Facts & dimensions', 'Star schema', 'Snowflake schema', 'Grain definition', 'Junk dimensions'], status: 'live', readTime: '60 min', xp: 200 },
      { id: 34, slug: 'slowly-changing-dimensions', title: 'Slowly Changing Dimensions — SCD Types 1, 2 and 3', description: 'One of the most-tested DE interview topics. What happens when a dimension — like a customer address or job title — changes over time.', tags: ['SCD Type 1', 'SCD Type 2', 'SCD Type 3', 'When to use each', 'Implementation in SQL'], status: 'live', readTime: '50 min', xp: 150 },
      { id: 35, slug: 'data-vault', title: 'Data Vault 2.0 — Hubs, Links and Satellites', description: 'The advanced modelling pattern used by large enterprises. Flexible, auditable, and built to survive the real world changing.', tags: ['Hubs', 'Links', 'Satellites', 'Business keys', 'When to use Data Vault', 'DV vs Dimensional'], status: 'live', readTime: '55 min', xp: 200 },
    ],
  },
  {
    id: 6, title: 'Quality, Governance & Production', color: '#ff4757',
    modules: [
      { id: 36, slug: 'data-quality', title: 'Data Quality — Dimensions, Testing and Validation', description: 'How to know your data is trustworthy. The six quality dimensions, how to test for each, and what breaks when you skip this.', tags: ['6 quality dimensions', 'Completeness', 'Accuracy', 'Freshness', 'Uniqueness', 'Validation patterns'], status: 'live', readTime: '55 min', xp: 150 },
      { id: 37, slug: 'monitoring-observability', title: 'Data Observability — Metrics, Logging and Anomaly Detection', description: 'When pipelines run in production, how do you know something is wrong before your users do? Observability answers that.', tags: ['Observability vs monitoring', 'Pipeline metrics', 'Structured logging', 'Anomaly detection', 'Alerting design'], status: 'live', readTime: '50 min', xp: 150 },
      { id: 38, slug: 'data-governance', title: 'Data Governance — Catalogues, Lineage and Access Control', description: 'Who owns the data, who can access it, where did it come from, where is it used. Four questions governance must answer.', tags: ['Data catalogues', 'Data lineage', 'Column-level lineage', 'Data classification', 'RBAC for data'], status: 'live', readTime: '55 min', xp: 150 },
      { id: 39, slug: 'security-compliance', title: 'Security and Compliance for Data Engineers', description: 'GDPR and the CCPA — what they mean for your pipelines and how to build systems that are compliant by design.', tags: ['Encryption at rest & transit', 'PII handling', 'GDPR basics', 'CCPA', 'Compliance by design'], status: 'live', readTime: '50 min', xp: 150 },
      { id: 40, slug: 'streaming-data', title: 'Streaming Data — What It Is and How It Works', description: 'Event-driven architecture, producers, consumers, offsets, consumer groups — the concepts without a tool tutorial.', tags: ['Events & streams', 'Producers & consumers', 'Offsets & replay', 'Consumer groups', 'Event-driven architecture'], status: 'live', readTime: '55 min', xp: 150 },
      { id: 41, slug: 'message-brokers-queues', title: 'Message Brokers and Queues — Internal Mechanics', description: 'How messages flow from producer to consumer. Durability, ordering, replayability — the inside story without the tool noise.', tags: ['What a message broker is', 'Queues vs topics', 'Durability', 'Ordering guarantees', 'At-least-once vs exactly-once'], status: 'live', readTime: '50 min', xp: 150 },
      { id: 42, slug: 'distributed-systems', title: 'Distributed Systems for Data Engineers', description: 'CAP theorem, partitioning, replication, fault tolerance — explained for data engineers, not software architects.', tags: ['CAP theorem', 'Consistency models', 'Partitioning', 'Replication', 'Fault tolerance', 'Distributed transactions'], status: 'live', readTime: '65 min', xp: 200 },
      { id: 43, slug: 'performance-tuning', title: 'Performance Tuning and Cost Optimisation', description: 'I/O bound vs CPU bound vs network bound. How to profile any pipeline, find the bottleneck, and fix it without rebuilding everything.', tags: ['Bottleneck types', 'Profiling pipelines', 'Storage optimisation', 'Query tuning', 'Cost models', 'Right-sizing'], status: 'live', readTime: '60 min', xp: 200 },
      { id: 44, slug: 'cicd-pipelines', title: 'DataOps and CI/CD for Data Pipelines', description: 'How to ship pipeline changes like a professional — testing, staging, rollback, and automated deployments.', tags: ['DataOps principles', 'Testing pipelines in CI', 'Staging environments', 'Rollback strategies', 'GitOps for data'], status: 'live', readTime: '55 min', xp: 150 },
      { id: 45, slug: 'infrastructure-as-code', title: 'Infrastructure as Code for Data Engineers', description: 'Provision cloud data infrastructure with Terraform — storage accounts, pipelines, clusters, and secrets — so your environments are reproducible, version-controlled, and never "it works on my machine".', tags: ['Why IaC matters', 'Terraform core concepts', 'Provisioning data resources', 'State management', 'Modules and reuse', 'CI/CD for infrastructure'], status: 'live', readTime: '55 min', xp: 150 },
      { id: 46, slug: 'system-design-de', title: 'Data Engineering System Design', description: 'How to design any data system from scratch. Framework, trade-offs, capacity estimation — for both interviews and real work.', tags: ['Design framework', 'Capacity estimation', 'Trade-off analysis', 'Common system designs', 'Interview approach'], status: 'live', readTime: '80 min', xp: 250 },
      { id: 47, slug: 'de-interview-questions', title: 'Interview Prep — 60 Complete Answers', description: '60 complete answers across Python, SQL, pipelines, modelling, architecture, and behavioural questions — written at senior engineer depth.', tags: ['Python for DE', 'SQL advanced', 'Pipeline design', 'Data modelling', 'Architecture', 'System design', 'Behavioural'], status: 'live', readTime: '90 min', xp: 300 },
    ],
  },
]
