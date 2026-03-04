'use client'
import { useState, useEffect } from 'react'
import { X, ExternalLink, Github, CheckCircle, AlertCircle } from 'lucide-react'

export interface Tool {
  name: string
  icon: string
  color: string
  tagline: string
  what: string
  purpose: string
  why: string
  when: string
  how: string
  example: string
  openSource: boolean
  similar: string[]
  learnHref?: string
  category: string
}

export const TOOLS: Tool[] = [
  {
    name: 'Apache Spark', icon: '⚡', color: '#E25A1C', category: 'Processing',
    tagline: 'The distributed computing engine that powers modern data engineering',
    what: 'Apache Spark is an open-source distributed computing framework. It splits data across multiple machines and processes everything in parallel — allowing a cluster of 10 machines to process data 10x faster than a single machine.',
    purpose: 'Process massive datasets that are too large for a single machine. Spark handles terabytes of data in minutes by distributing the work across hundreds of workers.',
    why: 'Because pandas and SQL on a single machine hit a wall around 10-100GB of data. Spark removes that ceiling entirely. It also provides a unified API for batch processing, streaming, SQL, and ML.',
    when: 'Use Spark when your data exceeds what a single machine can handle, when you need to run complex transformations on hundreds of millions of rows, or when you need streaming and batch in the same framework.',
    how: 'You write PySpark code (Python API for Spark) that looks similar to pandas. Spark compiles it into an execution plan and distributes the work across the cluster automatically.',
    example: 'A retail company processes 500 million daily transaction records. A single machine would take 8 hours. A Spark cluster of 20 workers finishes in 25 minutes by splitting the data into partitions and processing each partition on a different machine simultaneously.',
    openSource: true,
    similar: ['Dask', 'Ray', 'Flink', 'Hadoop MapReduce'],
    learnHref: '/learn/foundations/python',
  },
  {
    name: 'Apache Iceberg', icon: '🧊', color: '#00c2ff', category: 'Table Format',
    tagline: 'The open table format bringing ACID transactions to data lakes',
    what: 'Apache Iceberg is an open table format for huge analytic datasets. It sits on top of Parquet files in your data lake and adds a metadata layer that enables ACID transactions, time travel, and schema evolution.',
    purpose: 'Make data lake tables as reliable as database tables. Before Iceberg, reading from a data lake during a write would give you corrupted or inconsistent results. Iceberg prevents this.',
    why: 'Companies need to update, delete, and merge records in their data lake (GDPR deletes, late-arriving data corrections). Plain Parquet files cannot do this. Iceberg can.',
    when: 'Use Iceberg when you need ACID guarantees on your data lake, when you use multiple query engines (Spark + Trino + Flink reading the same table), or when your data lake is on AWS (S3 Tables natively uses Iceberg).',
    how: 'You create Iceberg tables using Spark, Flink, or Trino. All writes go through the Iceberg catalog which maintains metadata. Readers always see a consistent snapshot of the table.',
    example: 'Netflix (the creators of Iceberg) uses it to manage petabytes of viewing data. When a user deletes their account (GDPR), Iceberg deletes their rows across all tables without rewriting entire files — something impossible with plain Parquet.',
    openSource: true,
    similar: ['Delta Lake', 'Apache Hudi', 'Apache ORC'],
  },
  {
    name: 'Delta Lake', icon: '△', color: '#ff6b6b', category: 'Table Format',
    tagline: 'ACID transactions and time travel for your Databricks data lake',
    what: 'Delta Lake is an open table format created by Databricks. It adds ACID transactions, time travel (query previous table versions), and schema enforcement to your data lake — all stored as Parquet files with a transaction log.',
    purpose: 'Make Apache Spark pipelines reliable. Raw Spark writes to Parquet are not atomic — a failed job leaves your table in a broken state. Delta Lake prevents this with a transaction log that tracks every change.',
    why: 'Delta Lake is the default table format in Azure Databricks, AWS Databricks, and Microsoft Fabric. If you work in the Databricks ecosystem, Delta Lake is the standard — not a choice.',
    when: 'Use Delta Lake when using Databricks, when you need time travel (audit trail, rollback), when you need to MERGE (upsert) records, or when building the Silver and Gold layers of the Medallion Architecture.',
    how: 'In Databricks you write df.write.format("delta").save(path) instead of parquet. Delta automatically creates the transaction log. Time travel: SELECT * FROM table VERSION AS OF 5.',
    example: 'A bank processes daily transaction files. A bad transformation job writes incorrect amounts to the Gold layer. The team runs RESTORE TABLE gold.transactions TO VERSION AS OF 3 and rolls back to the last clean version in 30 seconds — no manual data repair needed.',
    openSource: true,
    similar: ['Apache Iceberg', 'Apache Hudi'],
    learnHref: '/learn/azure/databricks',
  },
  {
    name: 'Apache Airflow', icon: '🌊', color: '#017CEE', category: 'Orchestration',
    tagline: 'The industry-standard Python workflow orchestration platform',
    what: 'Apache Airflow is an open-source platform for authoring, scheduling, and monitoring data pipelines. You write pipelines as Python DAGs (Directed Acyclic Graphs) — Python files that define tasks and their dependencies.',
    purpose: 'Coordinate complex multi-step data workflows. Run task B only after task A succeeds. Retry failed tasks automatically. Send alerts on failure. Track every run in a visual UI.',
    why: 'Airflow is the most widely deployed workflow orchestration tool in data engineering. It works on any cloud (or on-premises), supports hundreds of operators for every service, and has a massive open-source community.',
    when: 'Use Airflow when you have multi-step pipelines with dependencies, need cross-cloud orchestration, want code-based pipeline definitions (version controlled in Git), or work with GCP (Cloud Composer is managed Airflow).',
    how: 'Write a Python file defining tasks (BashOperator, PythonOperator, SparkOperator, etc.) and their dependencies using >> notation. Deploy the DAG file to the Airflow dags folder. Airflow picks it up automatically.',
    example: 'An e-commerce company DAG: 1) Extract orders from MySQL at 1am, 2) Validate data quality, 3) Run Spark transformation, 4) Load to BigQuery, 5) Refresh Looker dashboard, 6) Email the business team the daily report. Each step runs only after the previous one succeeds.',
    openSource: true,
    similar: ['Azure Data Factory', 'AWS Step Functions', 'Prefect', 'Dagster'],
    learnHref: '/learn/gcp/composer',
  },
  {
    name: 'Apache Kafka', icon: '📨', color: '#000000', category: 'Streaming',
    tagline: 'The distributed event streaming platform used by 80% of Fortune 500 companies',
    what: 'Apache Kafka is a distributed event streaming platform. It acts as a high-throughput message broker — producers publish events to topics, consumers read from those topics in real time.',
    purpose: 'Move data between systems in real time at massive scale. Kafka can handle millions of events per second with sub-second latency, making it the backbone of real-time data architectures.',
    why: 'Kafka decouples producers from consumers. A payment system does not need to know who is consuming its events — it just publishes to Kafka. Multiple consumers (fraud detection, analytics, notifications) all read independently.',
    when: 'Use Kafka when you need real-time event streaming between systems, when multiple systems need to consume the same events independently, for log aggregation, clickstream data, or IoT sensor data.',
    how: 'Producers write events to Kafka topics using the Kafka client library. Consumers subscribe to topics and read events in order. Kafka retains messages for a configurable period (default 7 days) so consumers can replay.',
    example: 'Uber uses Kafka to process 1 trillion events per day — every GPS ping, trip update, surge pricing recalculation, and driver match flows through Kafka topics to dozens of downstream consumers.',
    openSource: true,
    similar: ['Azure Event Hubs', 'Amazon Kinesis', 'Google Pub/Sub', 'RabbitMQ'],
  },
  {
    name: 'dbt', icon: '🔧', color: '#FF694A', category: 'Transformation',
    tagline: 'SQL-based transformation framework that brings software engineering to analytics',
    what: 'dbt (data build tool) is an open-source transformation framework. You write SELECT statements as dbt models, and dbt handles the CREATE TABLE, dependency management, testing, and documentation automatically.',
    purpose: 'Transform raw data in your warehouse using pure SQL, with software engineering best practices — version control, testing, documentation, and modular code.',
    why: 'Before dbt, analysts wrote long SQL scripts with no testing, no version control, and no way to understand dependencies. dbt makes SQL transformation as disciplined as software engineering. A dbt model is just a .sql file committed to Git.',
    when: 'Use dbt when your transformations happen inside the warehouse (BigQuery, Snowflake, Redshift, Synapse), when you want SQL engineers to own transformation logic without Spark knowledge, or when building the Gold layer of the Medallion Architecture.',
    how: 'Write SELECT statements as .sql files in the dbt models folder. Use ref() to reference other models — dbt automatically resolves dependencies and builds in the right order. Run dbt run to execute, dbt test to validate.',
    example: 'A SaaS company has raw Stripe payment events in BigQuery. A dbt model joins payments with customer data, calculates monthly recurring revenue, and creates a clean MRR table. Another model references that MRR table to calculate churn. dbt runs them in the correct order automatically.',
    openSource: true,
    similar: ['SQLMesh', 'Dataform (Google)', 'Coalesce'],
  },
  {
    name: 'Snowflake', icon: '❄️', color: '#29B5E8', category: 'Data Warehouse',
    tagline: 'The cloud data warehouse that separated compute from storage',
    what: 'Snowflake is a cloud data warehouse built from scratch for the cloud. Its key architectural innovation: it completely separates compute (query processing) from storage (data files), allowing them to scale independently.',
    purpose: 'Store and query structured and semi-structured data at petabyte scale, with multiple teams able to run concurrent workloads without competing for resources.',
    why: 'In traditional warehouses, scaling storage meant scaling compute too. Snowflake broke this coupling. You can add more query compute (virtual warehouses) without paying for more storage, and vice versa.',
    when: 'Use Snowflake when you have large analytical workloads with many concurrent users, when you need to share data across organizations, or when you want a fully managed warehouse without infrastructure management.',
    how: 'Connect via JDBC/ODBC, Python connector, or Snowflake web UI. Write standard SQL. Snowflake handles query optimization, storage, compression, and scaling automatically.',
    example: 'DoorDash uses Snowflake to run analytics across 50 billion rows of order data. Data engineers load raw events from Kafka via Snowpipe. Analysts run complex SQL queries on a separate virtual warehouse without affecting the loading jobs.',
    openSource: false,
    similar: ['Google BigQuery', 'Amazon Redshift', 'Azure Synapse', 'Databricks SQL'],
  },
  {
    name: 'DuckDB', icon: '🦆', color: '#FFC000', category: 'Analytics',
    tagline: 'The in-process analytical database — SQLite for analytics',
    what: 'DuckDB is an in-process analytical database. It runs entirely inside your Python process — no server, no setup, no network. Just install the Python package and run SQL directly on Parquet, CSV, and JSON files.',
    purpose: 'Run fast analytical SQL on local files and small-to-medium datasets without setting up any infrastructure. It is the fastest way to query Parquet files on your laptop.',
    why: 'DuckDB is absurdly fast for local analytics. It can query a 10GB Parquet file in seconds on a laptop because it uses columnar processing and vectorized execution — the same techniques as BigQuery and Snowflake but locally.',
    when: 'Use DuckDB for local data exploration and prototyping, for testing pipeline logic before running on a cluster, for ad-hoc analysis on files up to a few hundred GB, and for running SQL in Python notebooks without a database server.',
    how: 'Install with pip install duckdb. Then: import duckdb; duckdb.sql("SELECT * FROM read_parquet(\'data.parquet\') WHERE region = \'NORTH\'"). No server, no connection string, runs instantly.',
    example: 'A data engineer receives a 5GB CSV file from a vendor. Instead of loading it into a database or spinning up Spark, they run DuckDB in a Jupyter notebook, explore the schema, run aggregations, and prototype their cleaning logic — all in under 5 minutes.',
    openSource: true,
    similar: ['SQLite', 'ClickHouse', 'Polars'],
  },
  {
    name: 'Terraform', icon: '🏗️', color: '#7B42BC', category: 'Infrastructure',
    tagline: 'Infrastructure as Code — provision cloud resources with configuration files',
    what: 'Terraform is an open-source Infrastructure as Code tool. You write .tf configuration files describing the cloud resources you want (storage accounts, Databricks clusters, ADF instances) and Terraform creates, updates, and destroys them automatically.',
    purpose: 'Make cloud infrastructure reproducible, version-controlled, and automated. Instead of clicking through the Azure Portal, you write code that creates the exact same infrastructure every time.',
    why: 'Manual infrastructure setup is error-prone, undocumented, and impossible to replicate. Terraform lets you commit your infrastructure to Git, review changes like code, and recreate an identical environment for dev, staging, and production.',
    when: 'Use Terraform when you need to create cloud resources repeatedly (multiple environments, multiple clients), when working on a team where infrastructure changes need review, or when you need to document exactly what resources exist and why.',
    how: 'Write .tf files describing resources. Run terraform plan to preview changes. Run terraform apply to create them. Run terraform destroy to delete everything. Terraform tracks state in a .tfstate file.',
    example: 'A consulting firm has 15 client projects each needing the same Azure stack. Instead of manually creating ADLS, ADF, Databricks, and Synapse 15 times, one engineer maintains a Terraform module. Each new project runs terraform apply with different variable values and the full stack appears in 8 minutes.',
    openSource: true,
    similar: ['Pulumi', 'AWS CloudFormation', 'Azure Bicep', 'Ansible'],
  },
  {
    name: 'Docker', icon: '🐳', color: '#2496ED', category: 'Infrastructure',
    tagline: 'Package your code and dependencies into portable containers',
    what: 'Docker is a containerization platform. A Docker container packages your application code, Python libraries, system dependencies, and configuration into a single portable unit that runs identically on any machine.',
    purpose: 'Eliminate "it works on my machine" problems. A Docker container runs the same way on your laptop, your CI/CD pipeline, and the production server.',
    why: 'Data pipelines often break because different environments have different Python versions, different library versions, or different OS configurations. Docker freezes the entire environment so nothing can differ between environments.',
    when: 'Use Docker when deploying data pipelines to production, when you need reproducible environments for your team, when running Airflow locally for development, or when your pipeline code needs to run in a cloud container service.',
    how: 'Write a Dockerfile specifying the base image, copy your code, install dependencies with pip install, and define the command to run. Build with docker build, run with docker run. Push to Docker Hub or a private registry.',
    example: 'A data engineer builds a Python pipeline that processes Parquet files. On their M1 Mac it works fine. On the Linux production server it fails due to a different NumPy version. They containerize it with Docker — now the exact same image runs everywhere with zero environment differences.',
    openSource: true,
    similar: ['Podman', 'containerd', 'Kubernetes'],
  },
  {
    name: 'Kubernetes', icon: '☸️', color: '#326CE5', category: 'Infrastructure',
    tagline: 'Container orchestration at scale — the infrastructure layer behind modern data platforms',
    what: 'Kubernetes (K8s) is an open-source container orchestration system. It automatically deploys, scales, and manages Docker containers across a cluster of machines.',
    purpose: 'Run containerized data workloads reliably at scale. Automatically restart failed containers, scale up when load increases, distribute containers across machines for availability.',
    why: 'Modern data platforms (Airflow, Spark, MLflow, JupyterHub) all run on Kubernetes in production. Understanding Kubernetes lets you understand how the infrastructure beneath your data pipelines actually works.',
    when: 'Kubernetes is most relevant for data engineers when deploying Airflow (often runs on K8s), running Spark on Kubernetes instead of a managed cluster, or when your organization uses K8s for all production workloads.',
    how: 'Write YAML manifests describing Deployments, Services, and ConfigMaps. Apply with kubectl apply -f manifest.yaml. K8s handles scheduling containers to nodes, restarting failures, and routing traffic.',
    example: 'A fintech company runs Apache Airflow on a Kubernetes cluster. When a large batch of DAGs runs simultaneously, Kubernetes automatically spins up 20 additional worker pods to handle the load, then terminates them when the work is done — paying only for what was used.',
    openSource: true,
    similar: ['Docker Swarm', 'Amazon ECS', 'Nomad'],
  },
  {
    name: 'Apache Hudi', icon: '🔄', color: '#FF6B6B', category: 'Table Format',
    tagline: 'Incremental data processing and record-level updates for data lakes',
    what: 'Apache Hudi (Hadoop Upserts Deletes and Incrementals) is an open table format created at Uber. It specializes in record-level inserts, updates, and deletes on data lakes with low latency.',
    purpose: 'Enable efficient incremental processing on data lakes. Instead of reprocessing an entire table, Hudi tracks which records changed and processes only those — dramatically reducing compute costs.',
    why: 'Hudi was built specifically for use cases requiring frequent updates and deletes, like CDC (Change Data Capture) from operational databases. It can update millions of individual records without rewriting entire partitions.',
    when: 'Use Hudi when ingesting CDC streams from databases into your data lake, when you have strict latency requirements for data freshness (sub-minute), or when working in AWS where Hudi has strong EMR and Glue integration.',
    how: 'Write Spark jobs using the Hudi DataSource. Specify the table type (Copy-on-Write for reads, Merge-on-Read for writes), record key, partition path, and precombine field. Hudi handles the upsert logic.',
    example: 'Uber built Hudi to sync their production MySQL databases to HDFS in near-real-time. Every row update in MySQL appears in the Hudi data lake within minutes, enabling analytics on fresh data without reading entire database dumps.',
    openSource: true,
    similar: ['Delta Lake', 'Apache Iceberg'],
  },
]

interface Props {
  tool: Tool | null
  onClose: () => void
}

export function ToolModal({ tool, onClose }: Props) {
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', handler)
    return () => document.removeEventListener('keydown', handler)
  }, [onClose])

  if (!tool) return null

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4"
      onClick={onClose}>
      <div className="absolute inset-0" style={{ background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(4px)' }} />
      <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl z-10"
        style={{ background: 'var(--surface)', border: '1px solid var(--border2)', boxShadow: 'var(--shadow-lg)' }}
        onClick={e => e.stopPropagation()}>

        {/* Header */}
        <div className="sticky top-0 flex items-start justify-between p-6 pb-4"
          style={{ background: 'var(--surface)', borderBottom: '1px solid var(--border)' }}>
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl flex items-center justify-center text-2xl flex-shrink-0"
              style={{ background: `${tool.color}15`, border: `1px solid ${tool.color}30` }}>
              {tool.icon}
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h2 className="font-display font-extrabold text-xl" style={{ color: 'var(--text)' }}>{tool.name}</h2>
                <span className="text-xs font-mono px-2 py-0.5 rounded"
                  style={{ background: `${tool.color}15`, color: tool.color }}>{tool.category}</span>
                <span className="flex items-center gap-1 text-xs font-mono px-2 py-0.5 rounded"
                  style={{ background: tool.openSource ? 'rgba(0,230,118,0.1)' : 'rgba(255,107,107,0.1)', color: tool.openSource ? 'var(--green)' : '#ff6b6b' }}>
                  {tool.openSource ? <><CheckCircle size={10} /> Open Source</> : <><AlertCircle size={10} /> Proprietary</>}
                </span>
              </div>
              <p className="text-sm mt-1" style={{ color: 'var(--muted)', fontFamily: 'Lora, serif', fontStyle: 'italic' }}>{tool.tagline}</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 rounded-lg flex-shrink-0 ml-4"
            style={{ color: 'var(--muted)', background: 'var(--bg2)' }}>
            <X size={18} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {[
            { label: '🔍 What is it?', content: tool.what },
            { label: '🎯 Purpose', content: tool.purpose },
            { label: '❓ Why do companies use it?', content: tool.why },
            { label: '⏰ When to use it', content: tool.when },
            { label: '⚙️ How it works', content: tool.how },
            { label: '🏭 Real-world example', content: tool.example },
          ].map(item => (
            <div key={item.label}>
              <div className="text-xs font-mono font-semibold uppercase tracking-widest mb-2" style={{ color: tool.color }}>
                {item.label}
              </div>
              <p className="text-sm leading-relaxed" style={{ color: 'var(--text2)', fontFamily: 'Lora, serif' }}>
                {item.content}
              </p>
            </div>
          ))}

          {tool.similar.length > 0 && (
            <div>
              <div className="text-xs font-mono font-semibold uppercase tracking-widest mb-2" style={{ color: tool.color }}>
                🔄 Similar tools
              </div>
              <div className="flex flex-wrap gap-2">
                {tool.similar.map(s => (
                  <span key={s} className="text-xs font-mono px-3 py-1.5 rounded-lg"
                    style={{ background: 'var(--bg2)', border: '1px solid var(--border)', color: 'var(--text2)' }}>
                    {s}
                  </span>
                ))}
              </div>
            </div>
          )}

          {tool.learnHref && (
            <a href={tool.learnHref}
              className="flex items-center justify-center gap-2 w-full py-3 rounded-xl font-display font-semibold text-sm"
              style={{ background: `${tool.color}15`, border: `1px solid ${tool.color}30`, color: tool.color }}>
              <ExternalLink size={14} />
              Learn {tool.name} in depth on Asil
            </a>
          )}
        </div>
      </div>
    </div>
  )
}
