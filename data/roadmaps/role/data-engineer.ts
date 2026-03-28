import type { Roadmap } from '../types'

export const dataEngineerRoadmap: Roadmap = {
  id: 'data-engineer',
  slug: 'data-engineer',
  title: 'Data Engineer',
  category: 'role',
  description: 'A clear path from zero to job-ready. No wasted time, no random tutorials. Every step is here because it makes you more employable.',
  totalTime: '6–9 months',

  guide: {
    howToUse: 'Go in order. Prerequisites before Python. Python before Azure. Azure before building projects. Do not jump to Databricks before you are solid on SQL. The total time from zero to job-ready is roughly 3–4 months if you put in 2–3 hours per day. The goal is not to finish the roadmap — the goal is to build enough skill and one strong project to get your first interview.',
    commonMistakes: [
      'Tutorial hell — watching videos without building anything. After every tutorial, build something. Even a small variation of what you just watched.',
      'Skipping SQL — thinking Python or Spark replaces SQL. It does not. SQL is used in every data engineering job every day. Be very good at it.',
      'Trying to learn everything at once — Azure AND AWS AND GCP AND Kafka AND dbt simultaneously. Go deep on one, then expand.',
      'Waiting until you are ready — you will never feel ready. Apply when you have one solid project and can explain it clearly.',
      'Ignoring the resume — brilliant engineers with poor resumes get filtered by ATS before a human ever sees them.',
    ],
  },

  sections: [
    { row: 0, label: 'Prerequisites', color: '#888888', description: 'Before writing a single line of Python or SQL, these three things make everything else easier.' },
    { row: 1, label: 'Programming Foundations', color: '#00e676', description: 'You cannot skip this. SQL and Python are used in every data engineering job every single day.' },
    { row: 2, label: 'Python — Going Deeper', color: '#00e676' },
    { row: 3, label: 'SQL — Going Deeper', color: '#00e676' },
    { row: 4, label: 'Advanced SQL', color: '#00e676' },
    { row: 5, label: 'Core Data Engineering Concepts', color: '#facc15', description: 'Before touching a cloud platform, understand what data engineering actually involves.' },
    { row: 6, label: 'Azure Cloud — Platform Basics', color: '#0078d4', description: 'Go deep on Azure before spreading to other clouds. It is the best first choice for consulting firms and H1B sponsorship.' },
    { row: 7, label: 'Azure Cloud — Data Services', color: '#0078d4' },
    { row: 8, label: 'Build Real Projects on Chaduvuko', color: '#7b61ff', description: 'Theory without a project gets you nowhere. These six projects are designed specifically to appear on your resume.' },
    { row: 9, label: 'Transformation Engines', color: '#f97316', description: 'Once data is in the lake, you need to transform it. These are the tools that do the heavy lifting.' },
    { row: 10, label: 'Orchestration & Quality', color: '#f97316' },
    { row: 11, label: 'Second Cloud — AWS', color: '#ff9900', description: 'Once you know Azure, AWS takes half the time. S3 is ADLS. Glue is Databricks. Redshift is Synapse. Same ideas, different names.' },
    { row: 12, label: 'Third Cloud — GCP', color: '#4285f4', description: 'GCP has some genuinely excellent tools — especially BigQuery, which is the best serverless warehouse in the industry.' },
    { row: 13, label: 'DevOps for Data Engineers', color: '#8b5cf6', description: 'Senior data engineers are expected to containerise their jobs and manage CI/CD pipelines.' },
    { row: 14, label: 'Interview Prep & Job Search', color: '#ff4757', description: 'Technical knowledge alone does not get you hired. You need to explain what you know and present your project confidently.' },
  ],

  nodes: [
    // ─── ROW 0: Prerequisites ───────────────────────────────────────────────
    {
      id: 'linux-basics', title: 'Linux & Command Line', type: 'required',
      description: 'Navigate the file system, understand permissions, use grep, tail, awk, and ssh. You will use the terminal daily to connect to cloud VMs and debug live pipelines. If you cannot navigate without a GUI, fix that first.',
      time: '2–3 hrs', difficulty: 'beginner', row: 0, col: 0,
    },
    {
      id: 'git-github', title: 'Git & GitHub', type: 'required',
      description: 'Commit, push, pull, branches, and resolving merge conflicts. Every professional job uses Git. Version-control your pipeline code and notebooks from day one — never email .py files.',
      time: '2–3 hrs', difficulty: 'beginner', row: 0, col: 1,
    },
    {
      id: 'cs-fundamentals', title: 'CS & Networking Basics', type: 'optional',
      description: 'How TCP/IP works, what DNS is, what a port is, how HTTP requests flow. Not deep computer science — just enough context to understand why cloud resources need VNets, subnets, and firewalls.',
      time: '3–4 hrs', difficulty: 'beginner', row: 0, col: 2,
    },

    // ─── ROW 1: Programming Foundations ─────────────────────────────────────
    {
      id: 'python-basics', title: 'Python Basics', type: 'required',
      description: 'Variables, data types, control flow, functions, modules, and virtual environments. You do not need to be a software engineer but you do need to be comfortable writing and reading Python code. Aim to write a working script from scratch without Googling syntax.',
      time: '4–6 hrs', difficulty: 'beginner', href: '/learn/foundations/python', row: 1, col: 0,
    },
    {
      id: 'sql-basics', title: 'SQL Basics', type: 'required',
      description: 'SELECT, WHERE, ORDER BY, LIMIT, DISTINCT, and basic filtering. Not just syntax — understand how a query engine scans rows. Practice on PostgreSQL locally. If you can write a SELECT with three conditions without looking it up, move on.',
      time: '3–4 hrs', difficulty: 'beginner', href: '/learn/foundations/sql', row: 1, col: 1,
    },

    // ─── ROW 2: Python Deeper ────────────────────────────────────────────────
    {
      id: 'python-functions-oop', title: 'Python Functions & OOP', type: 'required',
      description: 'List comprehensions, lambda functions, decorators, classes and inheritance, error handling, and context managers. You will use these patterns constantly in data pipeline code — especially try/except and context managers for file and connection handling.',
      time: '4–5 hrs', difficulty: 'beginner', href: '/learn/foundations/python', row: 2, col: 0,
    },
    {
      id: 'pandas-numpy', title: 'Pandas & NumPy', type: 'required',
      description: 'DataFrames, Series, indexing, groupby, merge and join, reshape with pivot and melt, and handling missing values. Pandas is the standard tool for data manipulation in Python before data reaches a distributed engine like Spark.',
      time: '6–8 hrs', difficulty: 'beginner', row: 2, col: 1,
    },
    {
      id: 'file-io-apis', title: 'File I/O & REST APIs', type: 'required',
      description: 'Reading and writing CSV, JSON, and Parquet files. Making HTTP requests with the requests library. Parsing API responses. Authenticating with API keys and OAuth tokens. Most real pipeline ingestion starts with an API call.',
      time: '3–4 hrs', difficulty: 'beginner', row: 2, col: 2,
    },
    {
      id: 'regex-string-processing', title: 'Regex & String Processing', type: 'recommended',
      description: 'Pattern matching, extraction, substitution, and validation using regular expressions. Useful for parsing log files, validating file names, and cleaning string columns in raw data before transformation.',
      time: '2–3 hrs', difficulty: 'beginner', row: 2, col: 3,
    },

    // ─── ROW 3: SQL Deeper ───────────────────────────────────────────────────
    {
      id: 'sql-joins', title: 'JOINs & Aggregations', type: 'required',
      description: 'INNER, LEFT, RIGHT, FULL OUTER, CROSS, and SELF JOINs. GROUP BY with HAVING, COUNT, SUM, AVG, MIN, MAX. Multi-table joins with aliases. This is the most common topic in data engineering interviews at Swiggy, Flipkart, and consulting firms.',
      time: '4–5 hrs', difficulty: 'beginner', href: '/learn/foundations/sql', row: 3, col: 0,
    },
    {
      id: 'window-functions', title: 'Window Functions', type: 'required',
      description: 'ROW_NUMBER, RANK, DENSE_RANK, LAG, LEAD, FIRST_VALUE, LAST_VALUE, and NTILE. PARTITION BY vs GROUP BY. Running totals and moving averages. Window functions are used daily at every analytics company — if you cannot use them fluently, you will struggle in the role.',
      time: '4–5 hrs', difficulty: 'intermediate', href: '/learn/foundations/sql', row: 3, col: 1,
    },
    {
      id: 'ctes-subqueries', title: 'CTEs & Subqueries', type: 'required',
      description: 'Common Table Expressions (WITH clause), recursive CTEs, correlated subqueries, and using subqueries in FROM, WHERE, and SELECT. CTEs make complex multi-step queries readable — every senior data engineer uses them constantly.',
      time: '3–4 hrs', difficulty: 'intermediate', href: '/learn/foundations/sql', row: 3, col: 2,
    },

    // ─── ROW 4: Advanced SQL ─────────────────────────────────────────────────
    {
      id: 'postgresql-setup', title: 'PostgreSQL Deep Dive', type: 'recommended',
      description: 'Indexes (B-tree, GIN, partial), constraints, transactions and MVCC, JSON and JSONB columns, and COPY for bulk loading. PostgreSQL knowledge transfers directly to Redshift, Synapse, and BigQuery — they all speak SQL with similar extensions.',
      time: '5–6 hrs', difficulty: 'intermediate', href: '/learn/foundations/postgresql', row: 4, col: 0,
    },
    {
      id: 'query-optimization', title: 'Query Optimisation', type: 'recommended',
      description: 'How query planners work, index usage, avoiding full table scans, rewriting correlated subqueries as joins, and partition pruning. Writing correct SQL is table stakes — writing fast SQL is what separates junior from senior engineers.',
      time: '4–5 hrs', difficulty: 'intermediate', row: 4, col: 1,
    },
    {
      id: 'explain-plans', title: 'EXPLAIN & Query Plans', type: 'optional',
      description: 'Reading EXPLAIN ANALYZE output, identifying sequential scans, understanding nested loop vs hash join vs merge join. Profiling slow queries and knowing which index type to add. Essential for anyone optimising production queries.',
      time: '2–3 hrs', difficulty: 'intermediate', row: 4, col: 2,
    },

    // ─── ROW 5: Core Concepts ────────────────────────────────────────────────
    {
      id: 'data-modeling', title: 'Data Modeling', type: 'required',
      description: 'Star schema, snowflake schema, fact and dimension tables, slowly changing dimensions (SCD Type 1/2), and normalisation vs denormalisation trade-offs. Every reporting layer in every data warehouse is built on these concepts.',
      time: '4–5 hrs', difficulty: 'intermediate', row: 5, col: 0,
    },
    {
      id: 'medallion-architecture', title: 'Medallion Architecture', type: 'required',
      description: 'Bronze → Silver → Gold data layers. What goes in each layer, how transformations progress, and why this pattern exists. The Chaduvuko FreshMart projects are built entirely on this architecture — you will implement it yourself.',
      time: '2–3 hrs', difficulty: 'intermediate', row: 5, col: 1,
    },
    {
      id: 'batch-vs-streaming', title: 'Batch vs Streaming', type: 'required',
      description: 'Scheduled batch jobs (daily/hourly) vs event-driven streaming (sub-second latency). Micro-batching as a middle ground. Lambda architecture and Kappa architecture. Understanding which pattern to choose for a given use case.',
      time: '2–3 hrs', difficulty: 'intermediate', row: 5, col: 2,
    },
    {
      id: 'file-formats', title: 'File Formats', type: 'required',
      description: 'CSV (simple, slow), JSON (flexible, verbose), Parquet (columnar, compressed, fast), Avro (schema evolution, streaming), and Delta (ACID transactions on data lakes). When to use each format and why Parquet is the default choice for data lakes.',
      time: '2–3 hrs', difficulty: 'beginner', row: 5, col: 3,
    },

    // ─── ROW 6: Azure Platform Basics ────────────────────────────────────────
    {
      id: 'azure-portal-basics', title: 'Azure Portal & Resource Groups', type: 'required',
      description: 'Navigate the Azure portal, understand subscriptions vs resource groups, create and delete resources, read billing dashboards, and set budgets. The portal is where you spend half your time as a junior Azure engineer.',
      time: '2–3 hrs', difficulty: 'beginner', href: '/learn/azure/introduction', row: 6, col: 0,
    },
    {
      id: 'azure-iam-rbac', title: 'Azure IAM & RBAC', type: 'required',
      description: 'Role-Based Access Control — Owner vs Contributor vs Reader, creating service principals, managed identities, and assigning roles to resources. Every production Azure resource must have proper access control.',
      time: '2–3 hrs', difficulty: 'beginner', row: 6, col: 1,
    },
    {
      id: 'azure-blob-storage', title: 'Azure Blob Storage', type: 'required',
      description: 'Containers, blobs, access tiers (Hot/Cool/Archive), SAS tokens, and lifecycle management policies. The simplest Azure storage service — understand it before moving to ADLS Gen2.',
      time: '2–3 hrs', difficulty: 'beginner', row: 6, col: 2,
    },
    {
      id: 'adls-gen2', title: 'ADLS Gen2', type: 'required',
      description: 'Azure Data Lake Storage Gen2 — the hierarchical namespace, directories, partitioning by date, access control lists (ACLs), and integration with ADF and Databricks. This is where all your data lives in every Chaduvuko project.',
      time: '3–4 hrs', difficulty: 'beginner', href: '/learn/azure/adls-gen2', row: 6, col: 3,
    },
    {
      id: 'azure-networking', title: 'Azure Networking Basics', type: 'recommended',
      description: 'Virtual networks, subnets, private endpoints, NSGs, and why you cannot always hit a storage account from a public IP. Enough to understand why pipelines sometimes fail on network timeouts.',
      time: '2–3 hrs', difficulty: 'intermediate', row: 6, col: 4,
    },

    // ─── ROW 7: Azure Data Services ──────────────────────────────────────────
    {
      id: 'azure-data-factory', title: 'Azure Data Factory', type: 'required',
      description: 'Linked Services, Datasets, Pipelines, Activities (Copy, ForEach, If Condition, Set Variable, Execute Pipeline), Triggers, and Monitoring. ADF is the backbone of every Azure-based data pipeline and the tool used in all six Chaduvuko projects.',
      time: '8–10 hrs', difficulty: 'intermediate', href: '/learn/azure/adf', row: 7, col: 0,
    },
    {
      id: 'azure-databricks', title: 'Azure Databricks', type: 'recommended',
      description: 'Managed Apache Spark on Azure. Notebooks, clusters, Spark DataFrames, Delta Lake tables, and mounting ADLS. This is where the heavy data transformation code runs — essential for any pipeline processing millions of rows.',
      time: '8–10 hrs', difficulty: 'intermediate', href: '/learn/azure/databricks', row: 7, col: 1,
    },
    {
      id: 'azure-synapse', title: 'Azure Synapse Analytics', type: 'recommended',
      description: 'The SQL query layer on top of your data lake. Serverless SQL pool vs dedicated pool, external tables, OPENROWSET, and integrating with Power BI. Analysts query Synapse — you build the tables they query.',
      time: '5–6 hrs', difficulty: 'intermediate', href: '/learn/azure/synapse', row: 7, col: 2,
    },
    {
      id: 'azure-key-vault', title: 'Azure Key Vault', type: 'optional',
      description: 'Storing secrets, connection strings, and API keys securely. Referencing Key Vault secrets in ADF linked services so credentials never appear in plain text in your pipeline code. Required at any production-grade company.',
      time: '1–2 hrs', difficulty: 'beginner', row: 7, col: 3,
    },

    // ─── ROW 8: Chaduvuko Projects ───────────────────────────────────────────
    {
      id: 'project-01', title: 'Project 01 — Copy CSV to ADLS', type: 'chaduvuko',
      description: 'Your first ADF pipeline. Copy a single FreshMart CSV from Azure Blob to ADLS Gen2. Set up Linked Services, create Datasets, wire up a Copy Activity, and run it. Simple on paper — many beginners hit connection errors, dataset mismatches, and permission issues here.',
      time: '3–4 hrs', difficulty: 'beginner', href: '/learn/projects/azure-batch-pipeline', row: 8, col: 0,
    },
    {
      id: 'project-02', title: 'Project 02 — ForEach Loop', type: 'chaduvuko',
      description: 'Copy all 10 FreshMart store files in a single pipeline run using a ForEach loop and a parameterised dataset. The key lesson: ForEach must be Sequential when writing to pipeline-level variables. A real pattern used in every production ADF pipeline.',
      time: '4–5 hrs', difficulty: 'beginner', href: '/learn/projects/azure-projects-02', row: 8, col: 1,
    },
    {
      id: 'project-03', title: 'Project 03 — Run Date Parameter', type: 'chaduvuko',
      description: 'Make your pipeline date-driven. Pass a run_date parameter, use it in file paths and folder partitioning. Trigger-based vs manual runs. This is how every production batch pipeline works — it always knows which date it is processing.',
      time: '4–5 hrs', difficulty: 'intermediate', href: '/learn/projects/azure-project-03', row: 8, col: 2,
    },
    {
      id: 'project-04', title: 'Project 04 — HTTP Ingestion', type: 'chaduvuko',
      description: 'Pull a CSV file from a public URL into ADLS using the HTTP Linked Service. The real-world equivalent: pulling files from an SFTP server, an external API endpoint, or a vendor-hosted data feed. A pattern you will use immediately in your first job.',
      time: '4–5 hrs', difficulty: 'intermediate', href: '/learn/projects/azure-project-04', row: 8, col: 3,
    },
    {
      id: 'project-05', title: 'Project 05 — Date Stamp & Organise', type: 'chaduvuko',
      description: 'Rename files with date stamps, move them into dated folder partitions, archive processed files, and clean up the landing zone. Teaches the file management patterns every data engineer writes in their first month on the job.',
      time: '4–5 hrs', difficulty: 'intermediate', href: '/learn/projects/azure-project-05', row: 8, col: 4,
    },
    {
      id: 'project-06', title: 'Project 06 — REST API Weather', type: 'chaduvuko',
      description: 'Call a live weather REST API from inside ADF, parse the JSON response with Set Variable and expressions, and land the result in ADLS. The hardest project — covers ADF expressions, JSON parsing, and API authentication.',
      time: '6–8 hrs', difficulty: 'intermediate', href: '/learn/projects/azure-project-06', row: 8, col: 5,
    },

    // ─── ROW 9: Transformation ───────────────────────────────────────────────
    {
      id: 'dbt-basics', title: 'dbt (Data Build Tool)', type: 'required',
      description: 'Models, sources, refs, tests, and documentation in dbt. Transform raw data into analytics-ready tables using SQL. dbt is now the standard transformation layer at modern data companies — Swiggy, Razorpay, and most funded startups use it.',
      time: '6–8 hrs', difficulty: 'intermediate', row: 9, col: 0,
    },
    {
      id: 'spark-concepts', title: 'Apache Spark Concepts', type: 'required',
      description: 'RDDs vs DataFrames vs Datasets, lazy evaluation, transformations vs actions, DAG execution, partitions, shuffles, and the catalyst optimizer. Understanding how Spark thinks about data is what separates engineers who can tune performance from those who just submit jobs.',
      time: '5–6 hrs', difficulty: 'intermediate', row: 9, col: 1,
    },
    {
      id: 'pyspark-basics', title: 'PySpark', type: 'recommended',
      description: 'Reading and writing Parquet/Delta files, DataFrame operations, joins, groupBy aggregations, and window functions in PySpark. Writing Spark jobs in Python — the most common way to use Spark in Azure Databricks and AWS Glue.',
      time: '6–8 hrs', difficulty: 'intermediate', row: 9, col: 2,
    },

    // ─── ROW 10: Orchestration & Quality ─────────────────────────────────────
    {
      id: 'apache-airflow', title: 'Apache Airflow', type: 'required',
      description: 'DAGs, operators, sensors, task dependencies, XComs, connections, and variables. The most widely used pipeline orchestration tool outside Azure. If you know ADF and Airflow, you can work at 90% of data engineering companies.',
      time: '8–10 hrs', difficulty: 'intermediate', row: 10, col: 0,
    },
    {
      id: 'pipeline-monitoring', title: 'Monitoring & Alerting', type: 'required',
      description: 'Setting up alerts for pipeline failures, monitoring run durations, logging structured events, and diagnosing failures from logs. A pipeline that runs without monitoring is a pipeline that will fail silently in production.',
      time: '3–4 hrs', difficulty: 'intermediate', row: 10, col: 1,
    },
    {
      id: 'data-quality', title: 'Data Quality & Testing', type: 'required',
      description: 'Row count checks, null checks, referential integrity tests, value range assertions, and schema validation. Tools like Great Expectations and dbt tests. Data quality failures are the most common reason engineers get paged at 2am.',
      time: '4–5 hrs', difficulty: 'intermediate', row: 10, col: 2,
    },
    {
      id: 'delta-lake', title: 'Delta Lake', type: 'recommended',
      description: 'ACID transactions on data lakes, time travel, schema enforcement and evolution, MERGE (upserts), and VACUUM. Delta Lake is the standard table format for Databricks environments and is replacing raw Parquet at most companies.',
      time: '4–5 hrs', difficulty: 'intermediate', row: 10, col: 3,
    },

    // ─── ROW 11: AWS ─────────────────────────────────────────────────────────
    {
      id: 'amazon-s3', title: 'Amazon S3', type: 'recommended',
      description: 'Buckets, prefixes, object storage mechanics, storage classes (Standard/IA/Glacier), bucket policies, presigned URLs, and S3 event notifications. S3 is the ADLS of AWS — the foundation of every AWS data architecture.',
      time: '2–3 hrs', difficulty: 'beginner', href: '/learn/aws/s3', row: 11, col: 0,
    },
    {
      id: 'aws-glue', title: 'AWS Glue', type: 'recommended',
      description: 'Serverless Spark for ETL on AWS. Glue Crawlers, the Glue Data Catalog, Glue Jobs (Spark and Python shell), DynamicFrames vs Spark DataFrames, and Glue Workflows. The AWS equivalent of Databricks for lighter workloads.',
      time: '6–8 hrs', difficulty: 'intermediate', href: '/learn/aws/glue', row: 11, col: 1,
    },
    {
      id: 'amazon-redshift', title: 'Amazon Redshift', type: 'recommended',
      description: 'Cloud data warehouse on AWS. Distribution keys, sort keys, columnar storage, COPY command for bulk loading, and Redshift Spectrum for querying S3. The AWS equivalent of Azure Synapse.',
      time: '5–6 hrs', difficulty: 'intermediate', href: '/learn/aws/redshift', row: 11, col: 2,
    },
    {
      id: 'amazon-kinesis', title: 'Amazon Kinesis', type: 'optional',
      description: 'Real-time data streaming on AWS. Kinesis Data Streams for ingestion, Kinesis Firehose for delivery to S3/Redshift, and Kinesis Analytics for streaming SQL. The AWS equivalent of Azure Event Hubs or Apache Kafka.',
      time: '4–5 hrs', difficulty: 'intermediate', href: '/learn/aws/kinesis', row: 11, col: 3,
    },

    // ─── ROW 12: GCP ─────────────────────────────────────────────────────────
    {
      id: 'google-bigquery', title: 'Google BigQuery', type: 'recommended',
      description: 'Serverless SQL data warehouse — no cluster to size or manage, just write SQL and be billed per byte scanned. Partitioned and clustered tables, MERGE statements, scheduled queries, and BigQuery ML. BigQuery is the most impressive product in the GCP data stack.',
      time: '5–6 hrs', difficulty: 'intermediate', href: '/learn/gcp/bigquery', row: 12, col: 0,
    },
    {
      id: 'cloud-dataflow', title: 'Cloud Dataflow', type: 'optional',
      description: 'Managed Apache Beam for batch and streaming pipelines on GCP. Unified programming model for both modes. Used at companies that need low-latency streaming alongside batch processing on GCP.',
      time: '4–5 hrs', difficulty: 'advanced', href: '/learn/gcp/dataflow', row: 12, col: 1,
    },
    {
      id: 'cloud-pubsub', title: 'Cloud Pub/Sub', type: 'optional',
      description: 'GCP event streaming — publish and subscribe model for decoupled, asynchronous message passing. The GCP equivalent of Apache Kafka or AWS Kinesis. Commonly used as the ingestion layer feeding into Dataflow.',
      time: '3–4 hrs', difficulty: 'intermediate', href: '/learn/gcp/pubsub', row: 12, col: 2,
    },
    {
      id: 'cloud-composer', title: 'Cloud Composer', type: 'optional',
      description: 'Managed Apache Airflow on GCP. If you already know Airflow, Composer is just a deployment target. Worth knowing because many companies run Airflow on GCP even when their data stack is primarily Azure or AWS.',
      time: '2–3 hrs', difficulty: 'intermediate', href: '/learn/gcp/composer', row: 12, col: 3,
    },

    // ─── ROW 13: DevOps for Data ─────────────────────────────────────────────
    {
      id: 'docker-basics', title: 'Docker', type: 'recommended',
      description: 'Images, containers, Dockerfile, docker-compose, and publishing to a container registry. Containerise your Python pipeline scripts so they run identically on your laptop, the CI server, and production. Increasingly required at senior data engineering levels.',
      time: '5–6 hrs', difficulty: 'intermediate', row: 13, col: 0,
    },
    {
      id: 'cicd-pipelines', title: 'CI/CD for Data Pipelines', type: 'recommended',
      description: 'GitHub Actions workflows that lint, test, and deploy your ADF pipelines or dbt models on every push. Automated deployment to dev/staging/prod environments. Companies with mature data teams gate all pipeline changes behind CI.',
      time: '4–5 hrs', difficulty: 'intermediate', row: 13, col: 1,
    },
    {
      id: 'terraform-basics', title: 'Terraform', type: 'optional',
      description: 'Infrastructure as code — provision Azure resource groups, storage accounts, and ADF instances with declarative configuration files. Version-control your infrastructure the same way you version-control your pipeline code.',
      time: '4–5 hrs', difficulty: 'intermediate', row: 13, col: 2,
    },
    {
      id: 'kubernetes-basics', title: 'Kubernetes Basics', type: 'optional',
      description: 'Pods, services, deployments, ConfigMaps, and the kubectl CLI. Relevant if your company runs self-hosted Airflow on Kubernetes or deploys ML models as containerised services. More DevOps than data engineering, but useful to understand.',
      time: '5–6 hrs', difficulty: 'advanced', row: 13, col: 3,
    },

    // ─── ROW 14: Interview & Career ───────────────────────────────────────────
    {
      id: 'interview-questions', title: 'Top Interview Questions', type: 'required',
      description: '25+ real questions across SQL, Python, cloud architecture, system design, and behavioural — with sample answers. The questions data engineering interviewers at Infosys, Wipro, Swiggy, and FAANG GCCs actually ask. Know your project cold.',
      time: '4–6 hrs', difficulty: 'intermediate', href: '/learn/interview', row: 14, col: 0,
    },
    {
      id: 'system-design-data', title: 'System Design for Data', type: 'required',
      description: 'Designing a scalable data pipeline for 10TB/day. Choosing between batch and streaming. Handling late-arriving data. Schema evolution. Cost vs latency trade-offs. These questions separate senior from junior candidates at the final round.',
      time: '5–6 hrs', difficulty: 'advanced', row: 14, col: 1,
    },
    {
      id: 'resume-linkedin', title: 'Resume & LinkedIn', type: 'required',
      description: 'Lead with your Chaduvuko project. Quantify everything — "ingested 50M rows daily" not "built data pipelines". Match job description keywords exactly for ATS. Post about what you are learning. Engineers who share their work get noticed by recruiters.',
      time: '3–4 hrs', difficulty: 'beginner', row: 14, col: 2,
    },
    {
      id: 'target-companies', title: 'Target Companies', type: 'recommended',
      description: 'Which consulting firms sponsor H1B, what tools they use, how Indian product startups (Swiggy, Razorpay, CRED) hire differently from service firms (TCS, Infosys). How to tailor your resume and talking points for each type of company.',
      time: '2–3 hrs', difficulty: 'beginner', href: '/learn/industry', row: 14, col: 3,
    },
  ],
}