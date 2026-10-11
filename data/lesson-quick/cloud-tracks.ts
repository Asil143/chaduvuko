import type { LessonQuick } from '@/lib/lesson-quick'

// Foundations, AWS, Azure, GCP, Data Science and Projects. Warehouse SQL (BigQuery, Athena,
// Redshift, Synapse) runs on FreshCart where the concept is plain SQL; pipeline logic runs in
// Python; service configuration (ADF, IAM, cluster setup) is shown as code.
export const CLOUD_QUICK: Record<string, LessonQuick> = {
  // ── Foundations ──────────────────────────────────────────────────────────
  '/learn/what-is-data-engineering': {
    answer: 'Data engineering builds the systems that move and prepare data so analysts and data scientists can use it. A data engineer collects data from source systems, stores it, cleans and reshapes it, and serves it to dashboards and models, reliably and on a schedule.',
    points: [
      'The core skills are SQL, Python and one cloud platform.',
      'Pipelines must be reliable and repeatable, not one-off scripts.',
      'Most of the job is building and maintaining pipelines.',
    ],
    example: {
      label: 'A tiny extract-transform-load in plain Python',
      lang: 'python',
      code: `raw = ["AUSTIN, 40", "denver,25", "Austin , 15"]        # messy source rows
clean = {}
for row in raw:
    city, amount = row.split(",")
    city = city.strip().title()                            # transform
    clean[city] = clean.get(city, 0) + int(amount)         # load (aggregate)
print(clean)`,
    },
    check: {
      question: 'What is a data engineer\'s main output?',
      options: ['Dashboards', 'Trained machine-learning models', 'Reliable pipelines and data others can use', 'Marketing reports'],
      answer: 2,
      explanation: 'Engineers build the pipelines and datasets that analysts and scientists depend on.',
    },
  },

  '/learn/foundations/sql': {
    answer: 'SQL for data engineers goes beyond SELECT: window functions, CTEs, deduplication, NULL handling and set operations are the tools you use to build and debug pipelines and answer analysts\' questions against large tables.',
    points: [
      'Window functions compute per-group values without collapsing rows.',
      'Deduplicate with ROW_NUMBER and keep rn = 1.',
      'CTEs break a complex query into readable steps.',
    ],
    example: {
      label: 'Rank orders within each store with a window function',
      lang: 'sql',
      code: `SELECT store_id, order_id, total_amount,
       RANK() OVER (PARTITION BY store_id ORDER BY total_amount DESC) AS rank_in_store
FROM orders
WHERE order_status = 'Delivered'
ORDER BY store_id, rank_in_store
LIMIT 6;`,
    },
    check: {
      question: 'Which tool keeps every row but adds a per-group calculation?',
      options: ['GROUP BY', 'A window function (OVER)', 'DISTINCT', 'LIMIT'],
      answer: 1,
      explanation: 'GROUP BY collapses rows; a window function adds a value to each row.',
    },
  },

  '/learn/foundations/postgresql': {
    answer: 'PostgreSQL is a free, open-source relational database and a common first database for data engineers. You define tables with typed columns and work with the four core statements: SELECT, INSERT, UPDATE and DELETE, always using WHERE with UPDATE and DELETE.',
    points: [
      'Use NUMERIC for money, TIMESTAMP for time, VARCHAR for text.',
      'An UPDATE or DELETE without WHERE changes every row.',
      'Primary keys identify rows; foreign keys link tables.',
    ],
    example: {
      label: 'Create a table, insert, and query it back',
      lang: 'sql',
      code: `CREATE TABLE signups (id INTEGER PRIMARY KEY, email TEXT, joined DATE);
INSERT INTO signups VALUES (1, 'ava@example.com', '2024-03-01'),
                           (2, 'ben@example.com', '2024-03-02');
SELECT * FROM signups ORDER BY joined;`,
    },
    check: {
      question: 'What does UPDATE products SET in_stock = 0 do without a WHERE clause?',
      options: ['Updates one row', 'Updates nothing', 'Updates every row', 'Raises an error'],
      answer: 2,
      explanation: 'With no WHERE, the change applies to the whole table. Always test the WHERE first.',
    },
  },

  '/learn/foundations/python': {
    answer: 'Python for data engineers is about writing clear code that reads data, transforms it, handles errors and talks to cloud services. You do not need to be a software engineer; you need readable functions, good error handling and the standard data libraries.',
    points: [
      'Read files in chunks so memory does not grow with file size.',
      'Handle expected errors; let real bugs surface.',
      'Read configuration and secrets from the environment.',
    ],
    example: {
      label: 'Transform rows and skip the bad ones',
      lang: 'python',
      code: `rows = ["1,59.69", "2,", "3,17.95", "bad-row"]
clean, dropped = [], 0
for row in rows:
    try:
        order_id, amount = row.split(",")
        clean.append((int(order_id), float(amount)))
    except ValueError:
        dropped += 1
print("kept", clean)
print("dropped", dropped, "bad rows")`,
    },
    check: {
      question: 'Why read a large file in chunks instead of all at once?',
      options: ['It is required by Python', 'Memory stays constant regardless of file size', 'It sorts the data', 'It is the only way to read files'],
      answer: 1,
      explanation: 'Loading a huge file entirely can exhaust memory; chunking keeps usage bounded.',
    },
  },

  // ── AWS ──────────────────────────────────────────────────────────────────
  '/learn/aws/introduction': {
    answer: 'AWS is the largest cloud platform. Its core data engineering stack is S3 for storage (the data lake), AWS Glue for processing, Amazon Redshift for the warehouse and Kinesis for streaming. The concepts match Azure and GCP; only the service names differ.',
    points: [
      'S3 is to AWS what ADLS is to Azure and GCS is to GCP.',
      'Glue runs Spark without managing servers.',
      'Learn the categories; the specific tool is quick to pick up.',
    ],
    example: {
      label: 'The AWS data stack, mapped to its equivalents',
      lang: 'text',
      code: `Storage      S3            (Azure ADLS Gen2, GCP GCS)
Processing   Glue / EMR    (Azure Databricks, GCP Dataflow)
Warehouse    Redshift      (Azure Synapse, GCP BigQuery)
Streaming    Kinesis       (Azure Event Hubs, GCP Pub/Sub)
Orchestrate  Step Functions (Airflow on all three)`,
      static: true,
    },
    check: {
      question: 'Which AWS service is the data lake (object storage)?',
      options: ['Redshift', 'S3', 'Glue', 'Kinesis'],
      answer: 1,
      explanation: 'S3 stores any files at any scale; the other services process, warehouse or stream data.',
    },
  },

  '/learn/aws/s3': {
    answer: 'Amazon S3 is object storage: the foundation of every AWS data stack. Files (objects) live in buckets under a key that looks like a path. Organise data by zone and date, store analytics data as Parquet, and control access with bucket policies and IAM.',
    points: [
      'Partition by date in the key: bronze/orders/date=2024-03-15/.',
      'Convert CSV to Parquet for cheaper, faster analytics.',
      'Block public access by default.',
    ],
    example: {
      label: 'A partitioned S3 layout',
      lang: 'text',
      code: `s3://acme-lake/
  landing/orders/2024-03-15/export.csv
  bronze/orders/date=2024-03-15/part-0001.parquet
  silver/orders/date=2024-03-15/part-0001.parquet`,
      static: true,
    },
    check: {
      question: 'Why partition S3 data by date in the object key?',
      options: ['It encrypts the data', 'Query engines can skip dates that do not match a filter', 'It is required by S3', 'It compresses files'],
      answer: 1,
      explanation: 'A date filter then reads only the matching prefixes instead of the whole dataset.',
    },
  },

  '/learn/aws/glue': {
    answer: 'AWS Glue is managed, serverless Spark for transforming data without running clusters yourself. A Glue crawler infers schemas into the Glue Data Catalog, and Glue jobs (PySpark) read from S3, transform, and write back, typically building the bronze, silver and gold layers.',
    points: [
      'The Data Catalog is a shared schema registry for S3 data.',
      'Jobs are PySpark, the same code you would run on EMR or Databricks.',
      'You pay per DPU-hour while a job runs, not for idle clusters.',
    ],
    example: {
      label: 'A Glue PySpark job: read, filter, write Parquet',
      lang: 'python',
      code: `df = spark.read.parquet("s3://acme-lake/bronze/orders/")
delivered = df.filter(df.order_status == "Delivered")
(delivered.repartition("order_date")
          .write.mode("overwrite")
          .partitionBy("order_date")
          .parquet("s3://acme-lake/silver/orders/"))`,
      static: true,
    },
    check: {
      question: 'What does the Glue Data Catalog store?',
      options: ['The data itself', 'Table schemas and metadata for data in S3', 'Billing information', 'User passwords'],
      answer: 1,
      explanation: 'The catalog holds schemas so engines such as Athena and Glue jobs can query S3 data as tables.',
    },
  },

  '/learn/aws/redshift': {
    answer: 'Amazon Redshift is AWS\'s cloud data warehouse for large analytical queries. It stores data in columnar format across distributed nodes, and you tune performance with distribution keys (how rows spread across nodes) and sort keys (how rows are ordered within a node).',
    points: [
      'Columnar storage reads only the columns a query needs.',
      'A good distribution key avoids shuffling data between nodes on joins.',
      'Redshift Spectrum queries S3 data without loading it.',
    ],
    example: {
      label: 'An analytical query Redshift is built for',
      lang: 'sql',
      code: `SELECT s.city,
       COUNT(*) AS orders,
       ROUND(SUM(o.total_amount), 2) AS revenue
FROM orders AS o
JOIN stores AS s ON s.store_id = o.store_id
WHERE o.order_status = 'Delivered'
GROUP BY s.city
ORDER BY revenue DESC;`,
    },
    check: {
      question: 'What does a Redshift distribution key control?',
      options: ['Which columns are returned', 'How rows are spread across the cluster\'s nodes', 'The backup schedule', 'User access'],
      answer: 1,
      explanation: 'Choosing a key that co-locates joined rows avoids expensive data movement between nodes.',
    },
  },

  '/learn/aws/kinesis': {
    answer: 'Amazon Kinesis ingests streaming data in real time: clicks, transactions, IoT events. A Kinesis Data Stream splits records across shards by a partition key, and consumers read them in order per shard, so you process events as they happen instead of waiting for a file.',
    points: [
      'Shards set throughput; the partition key decides a record\'s shard.',
      'Records within a shard stay in order.',
      'Kinesis Firehose delivers streams straight to S3 or Redshift.',
    ],
    example: {
      label: 'Which shard a record lands on (by partition key)',
      lang: 'python',
      code: `import hashlib

def shard(key, shards=3):
    return int(hashlib.md5(key.encode()).hexdigest(), 16) % shards

for user in ["user-1", "user-2", "user-1", "user-3"]:
    print(f"{user} -> shard {shard(user)}")   # same user, same shard, in order`,
    },
    check: {
      question: 'Why do all events for one user go to the same Kinesis shard?',
      options: ['To save money', 'The partition key hashes to one shard, keeping that user\'s events in order', 'Shards are random', 'It is required by AWS'],
      answer: 1,
      explanation: 'Ordering is guaranteed within a shard, so a consistent partition key keeps a key\'s events ordered.',
    },
  },

  '/learn/aws/athena': {
    answer: 'Amazon Athena runs standard SQL directly on files in S3 with no cluster to manage; you pay per terabyte scanned. Storing data as partitioned Parquet instead of CSV cuts the bytes scanned, and so the cost, dramatically.',
    points: [
      'Athena uses the Glue Data Catalog for table definitions.',
      'Parquet plus partitioning can cut scan cost by 90% or more.',
      'Run MSCK REPAIR TABLE after adding new partitions so Athena sees them.',
    ],
    example: {
      label: 'A partition filter limits the bytes scanned',
      lang: 'sql',
      code: `SELECT store_id, COUNT(*) AS orders
FROM orders
WHERE order_date >= '2024-03-01'   -- reads only the March partitions, not the whole table
GROUP BY store_id
ORDER BY orders DESC
LIMIT 5;`,
    },
    check: {
      question: 'What does Athena charge for?',
      options: ['Running clusters per hour', 'The amount of data each query scans', 'Number of tables', 'Storage only'],
      answer: 1,
      explanation: 'Athena is serverless and bills per terabyte scanned, so Parquet and partition pruning save money.',
    },
  },

  '/learn/aws/emr': {
    answer: 'Amazon EMR runs big-data frameworks (Spark, Hive, Presto) on EC2 clusters. It is a lower-cost alternative to Databricks for the same Spark code, with three node types: a master that coordinates, core nodes with storage and compute, and task nodes that add compute.',
    points: [
      'The same PySpark code runs on EMR and Databricks.',
      'Run task nodes on Spot instances to save 60–70%.',
      'Use transient clusters that spin up for a job and shut down.',
    ],
    example: {
      label: 'EMR node roles',
      lang: 'text',
      code: `Master  one node, coordinates the cluster and tracks tasks
Core    storage (HDFS) + compute; losing one can lose data
Task    compute only; safe on cheap Spot instances, add/remove freely`,
      static: true,
    },
    check: {
      question: 'Which EMR node type is safest to run on interruptible Spot instances?',
      options: ['Master', 'Core', 'Task', 'All of them'],
      answer: 2,
      explanation: 'Task nodes hold no data, so losing one to a Spot interruption only loses in-progress compute.',
    },
  },

  '/learn/aws/step-functions': {
    answer: 'AWS Step Functions orchestrates AWS services into pipelines defined as state machines: visual, auditable and automatically retried. State types include Task (call a service), Choice (branch), Parallel (run concurrently) and Map (loop over items).',
    points: [
      'Use the .sync pattern to wait for Glue, EMR or Athena jobs to finish.',
      'Built-in retry and catch handle failures declaratively.',
      'Each run is recorded, so you can see exactly where it failed.',
    ],
    example: {
      label: 'A state machine with a branch (Amazon States Language)',
      lang: 'json',
      code: `{
  "StartAt": "Validate",
  "States": {
    "Validate": { "Type": "Task", "Resource": "arn:aws:lambda:...:validate", "Next": "HasData" },
    "HasData":  { "Type": "Choice",
      "Choices": [{ "Variable": "$.rowCount", "NumericGreaterThan": 0, "Next": "Transform" }],
      "Default": "Skip" },
    "Transform": { "Type": "Task", "Resource": "arn:aws:states:::glue:startJobRun.sync", "End": true },
    "Skip": { "Type": "Succeed" }
  }
}`,
      static: true,
    },
    check: {
      question: 'Which Step Functions state type chooses a branch based on data?',
      options: ['Task', 'Choice', 'Parallel', 'Map'],
      answer: 1,
      explanation: 'A Choice state routes to different next states based on conditions.',
    },
  },

  '/learn/aws/lake-formation': {
    answer: 'AWS Lake Formation is the governance layer for an S3 data lake. Instead of juggling S3, IAM and Glue policies, it offers one permission model down to the database, table, column and row level, and tag-based access control through LF-Tags.',
    points: [
      'Permissions are finer than S3 bucket policies: column and row level.',
      'LF-Tags grant access to everything with a tag at once.',
      'It centralises who can see which data in the lake.',
    ],
    example: {
      label: 'Column-level and tag-based grants',
      lang: 'text',
      code: `GRANT SELECT (order_id, total_amount)  -- analysts never see customer_id
  ON TABLE lake.gold.orders TO analyst_role;

Tag "pii"=true on sensitive columns, then:
GRANT SELECT ON LF-TAG pii=true TO privacy_role;   -- one grant covers all PII`,
      static: true,
    },
    check: {
      question: 'What does Lake Formation allow that plain S3 bucket policies do not?',
      options: ['Cheaper storage', 'Column-level and row-level access control', 'Faster queries', 'Streaming'],
      answer: 1,
      explanation: 'S3 policies work at the object level; Lake Formation controls access per column and per row.',
    },
  },

  // ── Azure ────────────────────────────────────────────────────────────────
  '/learn/azure/introduction': {
    answer: 'Azure is a leading enterprise cloud for data engineering. Its stack: ADLS Gen2 stores everything, Azure Data Factory (ADF) orchestrates movement, Azure Databricks processes with Spark, and Synapse Analytics serves SQL to analysts.',
    points: [
      'ADF orchestrates and moves; it does not transform data itself.',
      'ADLS Gen2 is the lake; Databricks is the compute.',
      'The same concepts map directly to AWS and GCP.',
    ],
    example: {
      label: 'The Azure data stack',
      lang: 'text',
      code: `Store       ADLS Gen2
Orchestrate Azure Data Factory (ADF)
Process     Azure Databricks (Spark)
Serve       Azure Synapse Analytics
Secrets     Azure Key Vault`,
      static: true,
    },
    check: {
      question: 'What is Azure Data Factory\'s role?',
      options: ['Transforming data with Spark', 'Orchestrating and moving data between services', 'Storing the data lake', 'Serving SQL to analysts'],
      answer: 1,
      explanation: 'ADF moves data and triggers other services; Databricks does the heavy transformation.',
    },
  },

  '/learn/azure/adls-gen2': {
    answer: 'Azure Data Lake Storage Gen2 is where Azure data lives, holding the bronze, silver and gold layers. It adds a hierarchical namespace (real folders) on top of blob storage, so directory operations and fine-grained access control work like a file system.',
    points: [
      'Enable the hierarchical namespace when creating the account; it cannot be added later.',
      'Organise into containers per layer, partitioned by date.',
      'Control access with Azure RBAC and ACLs, secrets via Key Vault.',
    ],
    example: {
      label: 'A medallion layout in ADLS Gen2',
      lang: 'text',
      code: `abfss://bronze@acmelake.dfs.core.windows.net/orders/date=2024-03-15/
abfss://silver@acmelake.dfs.core.windows.net/orders/date=2024-03-15/
abfss://gold@acmelake.dfs.core.windows.net/daily_revenue/`,
      static: true,
    },
    check: {
      question: 'What must be enabled at creation for ADLS Gen2 folder operations?',
      options: ['Streaming', 'The hierarchical namespace', 'Public access', 'Encryption'],
      answer: 1,
      explanation: 'The hierarchical namespace gives real directories and ACLs, and it cannot be turned on later.',
    },
  },

  '/learn/azure/adf': {
    answer: 'Azure Data Factory is the orchestration backbone of Azure pipelines: it moves data from 90+ sources, triggers Databricks notebooks and handles failures and scheduling. Its four building blocks are pipelines (containers), activities (steps), datasets (data references) and linked services (connections).',
    points: [
      'ADF orchestrates; Databricks or mapping data flows do the transforming.',
      'Store credentials in Key Vault, referenced by linked services.',
      'Triggers run pipelines on a schedule or on an event.',
    ],
    example: {
      label: 'The four ADF concepts',
      lang: 'text',
      code: `Linked Service  connection to ADLS, a database, an API
Dataset         a reference to a file or table at that connection
Activity        a step: Copy, run a Databricks notebook, a Lookup
Pipeline        an ordered set of activities, with triggers`,
      static: true,
    },
    check: {
      question: 'Where should ADF keep database passwords?',
      options: ['Hard-coded in the linked service', 'In Azure Key Vault', 'In the pipeline name', 'In a dataset'],
      answer: 1,
      explanation: 'Linked services reference secrets in Key Vault rather than storing them in plain text.',
    },
  },

  '/learn/azure/databricks': {
    answer: 'Azure Databricks is managed Apache Spark: you write PySpark in notebooks and run it across a cluster without managing infrastructure. The common pattern reads raw bronze data, validates and transforms it, and writes Delta tables for the silver layer.',
    points: [
      'Use auto-terminating job clusters for production, all-purpose clusters for dev.',
      'Delta Lake adds ACID transactions and time travel to files.',
      'ADF triggers Databricks notebooks as pipeline steps.',
    ],
    example: {
      label: 'A bronze-to-silver notebook',
      lang: 'python',
      code: `bronze = spark.read.parquet("abfss://bronze@acmelake.../orders/")
silver = (bronze.dropDuplicates(["order_id"])
                .filter("total_amount >= 0")
                .withColumn("order_date", bronze.order_date.cast("date")))
silver.write.format("delta").mode("overwrite").save("abfss://silver@acmelake.../orders/")`,
      static: true,
    },
    check: {
      question: 'Which cluster type suits a scheduled production job?',
      options: ['All-purpose cluster', 'Auto-terminating job cluster', 'A personal laptop', 'No cluster'],
      answer: 1,
      explanation: 'Job clusters start for the run and shut down after, which is cheaper than an always-on cluster.',
    },
  },

  '/learn/azure/synapse': {
    answer: 'Azure Synapse Analytics is the SQL serving layer at the top of the Azure stack. Analysts query the gold layer through it, and it also includes Spark pools, pipelines and a workspace. Serverless SQL pools query files in ADLS directly without loading them.',
    points: [
      'Serverless SQL queries data in the lake; dedicated pools store it.',
      'It unifies SQL, Spark and pipelines in one workspace.',
      'Power BI connects to Synapse for dashboards.',
    ],
    example: {
      label: 'Serverless SQL over Parquet in the lake',
      lang: 'sql',
      code: `SELECT store_id, COUNT(*) AS orders, SUM(total_amount) AS revenue
FROM OPENROWSET(
       BULK 'https://acmelake.dfs.core.windows.net/gold/orders/*.parquet',
       FORMAT = 'PARQUET') AS rows
GROUP BY store_id
ORDER BY revenue DESC;`,
      static: true,
    },
    check: {
      question: 'What does a Synapse serverless SQL pool let you do?',
      options: ['Query files in the lake without loading them into a database', 'Run Spark only', 'Store data permanently for free', 'Replace ADF'],
      answer: 0,
      explanation: 'Serverless SQL reads Parquet and CSV directly from ADLS, paying per data scanned.',
    },
  },

  '/learn/azure/event-hubs': {
    answer: 'Azure Event Hubs is a managed event-streaming service, the Azure-native equivalent of Kafka and compatible with Kafka clients. It ingests millions of events per second across partitions, and consumer groups let independent readers each process the whole stream.',
    points: [
      'Partitions set parallelism; more partitions, more parallel consumers.',
      'Consumer groups give each application its own position in the stream.',
      'Kafka producer and consumer code works against Event Hubs.',
    ],
    example: {
      label: 'Partitions and consumer groups',
      lang: 'text',
      code: `Event Hub "orders": 4 partitions
  Consumer group "billing"   reads all 4, its own offsets
  Consumer group "analytics" reads all 4, independent offsets
Each partition is read by one consumer within a group at a time.`,
      static: true,
    },
    check: {
      question: 'What lets two applications each read every event in an Event Hub independently?',
      options: ['More partitions', 'Separate consumer groups', 'A bigger hub', 'A shared offset'],
      answer: 1,
      explanation: 'Each consumer group tracks its own position, so both apps see the full stream.',
    },
  },

  '/learn/azure/key-vault': {
    answer: 'Azure Key Vault is a managed store for secrets: passwords, connection strings, API keys and certificates. Services authenticate to it with a managed identity (no credentials in code), and Databricks secret scopes backed by Key Vault redact values from notebook output.',
    points: [
      'Never put secrets in code, config files or environment variables.',
      'Managed identities remove credentials from the authentication path.',
      'Access is audited and can be revoked centrally.',
    ],
    example: {
      label: 'Read a secret through a Databricks secret scope',
      lang: 'python',
      code: `# the scope is backed by Key Vault; the value is redacted in output
connection = dbutils.secrets.get(scope="kv-prod", key="warehouse-conn")
print(connection)   # prints [REDACTED]`,
      static: true,
    },
    check: {
      question: 'How does a managed identity help with secrets?',
      options: ['It encrypts the disk', 'The service authenticates to Key Vault with no credentials stored in code', 'It speeds up queries', 'It stores the data'],
      answer: 1,
      explanation: 'Azure issues the identity to the service, so there is no password to hard-code or leak.',
    },
  },

  '/learn/azure/microsoft-fabric': {
    answer: 'Microsoft Fabric is an all-in-one analytics platform that unifies data engineering, warehousing, real-time analytics and Power BI under one licence. OneLake is the single shared storage beneath every workload, so there is no data movement between services.',
    points: [
      'OneLake stores data once; every engine reads the same copy.',
      'A Lakehouse holds raw files, Delta tables and a SQL endpoint together.',
      'It combines the roles of ADF, Databricks, Synapse and Power BI.',
    ],
    example: {
      label: 'What a Fabric Lakehouse contains',
      lang: 'text',
      code: `Lakehouse
  Files   raw CSV/JSON/Parquet landed as-is
  Tables  Delta tables (bronze/silver/gold)
  SQL endpoint  query the Tables with T-SQL
All stored in OneLake — Power BI reads it with no copy (Direct Lake).`,
      static: true,
    },
    check: {
      question: 'What is OneLake in Microsoft Fabric?',
      options: ['A Power BI report', 'The single shared storage under all Fabric workloads', 'A streaming service', 'A SQL dialect'],
      answer: 1,
      explanation: 'One copy of data in OneLake serves engineering, warehousing and BI with no movement.',
    },
  },

  // ── GCP ──────────────────────────────────────────────────────────────────
  '/learn/gcp/introduction': {
    answer: 'Google Cloud Platform runs on Google\'s infrastructure, built for scale. Its data stack is GCS for storage, Pub/Sub for streaming, Dataflow for processing, BigQuery for the warehouse and Cloud Composer (managed Airflow) for orchestration. BigQuery, serverless and fast, is often the reason to choose GCP.',
    points: [
      'BigQuery is fully serverless: no clusters to size.',
      'Dataflow runs the same code for batch and streaming.',
      'The categories mirror AWS and Azure.',
    ],
    example: {
      label: 'The GCP data stack',
      lang: 'text',
      code: `Storage      GCS            Streaming   Pub/Sub
Processing   Dataflow       Warehouse   BigQuery
Orchestrate  Cloud Composer (managed Airflow)`,
      static: true,
    },
    check: {
      question: 'What makes BigQuery distinctive?',
      options: ['You size the cluster yourself', 'It is serverless: query terabytes with no infrastructure to manage', 'It only runs batch jobs', 'It stores no data'],
      answer: 1,
      explanation: 'BigQuery runs queries across Google\'s fleet automatically; you pay per bytes scanned.',
    },
  },

  '/learn/gcp/bigquery': {
    answer: 'BigQuery is a serverless, massively parallel data warehouse that scans terabytes in seconds with plain SQL. Google\'s Dremel engine splits each query across thousands of workers, and you pay for the bytes scanned, so partitioning and clustering tables to scan less is the main cost control.',
    points: [
      'Partition tables by date so date-filtered queries scan less.',
      'Cluster by frequently filtered columns for further pruning.',
      'SELECT only the columns you need; BigQuery is columnar.',
    ],
    example: {
      label: 'An analytical BigQuery-style query',
      lang: 'sql',
      code: `SELECT store_id,
       COUNT(*) AS orders,
       ROUND(SUM(total_amount), 2) AS revenue
FROM orders
WHERE order_date BETWEEN '2024-03-01' AND '2024-03-31'
GROUP BY store_id
ORDER BY revenue DESC;`,
    },
    check: {
      question: 'What does BigQuery charge for on a query?',
      options: ['Cluster hours', 'The bytes the query scans', 'Rows returned', 'Number of columns'],
      answer: 1,
      explanation: 'Being serverless and columnar, BigQuery bills per byte scanned, so partitioning cuts cost.',
    },
  },

  '/learn/gcp/dataflow': {
    answer: 'Cloud Dataflow is managed Apache Beam. The same pipeline code handles both batch and streaming, and Dataflow auto-scales workers up and down during a job, so there is no cluster to size and no idle cost. Beam pipelines chain transforms with the pipe operator.',
    points: [
      'One Beam pipeline runs as batch or streaming.',
      'Workers scale automatically with the workload.',
      'Transforms chain: read → transform → filter → write.',
    ],
    example: {
      label: 'An Apache Beam pipeline (the shape Dataflow runs)',
      lang: 'python',
      code: `import apache_beam as beam

with beam.Pipeline() as p:
    (p
     | "Read" >> beam.io.ReadFromText("gs://acme/orders.csv")
     | "Parse" >> beam.Map(lambda line: line.split(","))
     | "Delivered" >> beam.Filter(lambda row: row[3] == "Delivered")
     | "Write" >> beam.io.WriteToText("gs://acme/out/delivered"))`,
      static: true,
    },
    check: {
      question: 'What is an advantage of Dataflow\'s autoscaling?',
      options: ['You must pre-size the cluster', 'Workers scale to the workload, with no idle-cluster cost', 'It only runs at night', 'It needs no code'],
      answer: 1,
      explanation: 'Dataflow adds and removes workers during the job, so you do not pay for idle capacity.',
    },
  },

  '/learn/gcp/pubsub': {
    answer: 'Cloud Pub/Sub is GCP\'s real-time messaging service, the equivalent of Kinesis and Event Hubs. Producers publish to a topic; each subscription delivers the messages to its consumers. Consumers acknowledge messages after processing, and unacknowledged ones are redelivered.',
    points: [
      'One topic can have many subscriptions, each an independent reader.',
      'Acknowledge only after successful processing.',
      'It decouples producers from consumers.',
    ],
    example: {
      label: 'Topic, subscriptions and acknowledgement (simulation)',
      lang: 'python',
      code: `topic = ["order-1", "order-2", "order-3"]
subscriptions = {"billing": 0, "analytics": 0}

def pull_and_ack(sub, ok=True):
    msg = topic[subscriptions[sub]]
    if ok:
        subscriptions[sub] += 1          # ack: advance past the message
    return msg

print("billing got", pull_and_ack("billing"))
print("billing failed on", pull_and_ack("billing", ok=False), "- will be redelivered")
print("offsets", subscriptions)`,
    },
    check: {
      question: 'What happens to a Pub/Sub message that is never acknowledged?',
      options: ['It is deleted', 'It is redelivered', 'It blocks the topic', 'It is ignored'],
      answer: 1,
      explanation: 'Pub/Sub redelivers unacknowledged messages so none are lost when a consumer fails.',
    },
  },

  '/learn/gcp/composer': {
    answer: 'Cloud Composer is managed Apache Airflow on GCP. You write pipelines as Python DAGs that define tasks and their dependencies, store them in a GCS bucket that Composer syncs, and Google runs the Airflow infrastructure. The >> operator sets task order.',
    points: [
      'DAGs are Python; tasks run in dependency order.',
      'task_a >> task_b means b runs only after a succeeds.',
      'Composer handles the Airflow servers, database and workers.',
    ],
    example: {
      label: 'A Composer (Airflow) DAG',
      lang: 'python',
      code: `from datetime import datetime
from airflow import DAG
from airflow.operators.bash import BashOperator

with DAG("daily_orders", start_date=datetime(2024, 3, 1), schedule="0 6 * * *", catchup=False) as dag:
    extract = BashOperator(task_id="extract", bash_command="python extract.py")
    load = BashOperator(task_id="load", bash_command="python load.py")
    extract >> load        # load runs only after extract succeeds`,
      static: true,
    },
    check: {
      question: 'What does extract >> load mean in an Airflow DAG?',
      options: ['Run both at once', 'load runs only after extract succeeds', 'extract depends on load', 'Redirect output to load'],
      answer: 1,
      explanation: 'The >> operator sets the dependency: the right task waits for the left one.',
    },
  },

  // ── Data Science ─────────────────────────────────────────────────────────
  '/learn/data-science/what-is-data-science': {
    answer: 'Data science turns raw, messy data into decisions: cleaning it, understanding it with statistics, and sometimes building a model that predicts what happens next. Every project follows a lifecycle from framing the question to communicating and shipping the result.',
    points: [
      'It blends data cleaning, statistics and sometimes modelling.',
      'The lifecycle: frame, collect, clean and explore, model, validate, communicate.',
      'Data scientist, analyst, ML engineer and data engineer overlap in practice.',
    ],
    example: {
      label: 'Explore before modelling: summarise a column',
      lang: 'python',
      code: `from statistics import mean, median

watch_minutes = [12, 45, 8, 120, 33, 5, 61, 19, 240, 27]
print("count", len(watch_minutes))
print("mean", round(mean(watch_minutes), 1), "| median", median(watch_minutes))
print("max", max(watch_minutes), "— the mean is pulled up by a few long sessions")`,
    },
    check: {
      question: 'What is usually the first stage of a data science project?',
      options: ['Training a model', 'Framing the question', 'Shipping a dashboard', 'Buying a GPU'],
      answer: 1,
      explanation: 'A clear, answerable question shapes what data to collect and what success looks like.',
    },
  },

  '/learn/data-science/data-science-workflow': {
    answer: 'The data science workflow has six stages: frame the question, collect the data, clean and explore it, analyse or model, validate, and communicate and ship. Real projects loop back constantly; a vague request must be turned into a specific, time-bound question with a clear answer shape.',
    points: [
      'A good question names exact columns and a time range.',
      'Collection means knowing which table or source holds the answer.',
      'Validation checks the result before it is shipped.',
    ],
    example: {
      label: 'Turning a vague ask into a framed question',
      lang: 'text',
      code: `Vague:  "Look into engagement."
Framed: "Did average weekly watch-time per active user rise or fall
         from January to March 2024, and by how much?"
         → columns: user_id, watch_minutes, week
         → answer shape: a percentage change`,
      static: true,
    },
    check: {
      question: 'What makes a question answerable with data?',
      options: ['It is short', 'It names specific columns, a time range and a clear answer shape', 'It mentions AI', 'It is asked by a manager'],
      answer: 1,
      explanation: 'Specificity about columns, time and the expected answer is what makes analysis possible.',
    },
  },

  '/learn/data-science/ds-vs-other-roles': {
    answer: 'Four roles sit on one spectrum from moving raw data to shipping live models: data engineers build pipelines, data analysts answer "what happened?" with SQL and dashboards, data scientists find patterns and build models, and ML engineers put models into production. At small companies one person may do several.',
    points: [
      'Data engineering is invisible when it works: tables that refresh correctly.',
      'The analyst and scientist boundary is the blurriest.',
      'Read job postings for the actual tasks, not the title.',
    ],
    example: {
      label: 'Who owns what, for one churn question',
      lang: 'text',
      code: `Data engineer   builds the pipeline feeding the user-activity table
Data analyst    reports which segments churned last quarter
Data scientist  models which users are likely to churn next
ML engineer     serves that model to the app in real time`,
      static: true,
    },
    check: {
      question: 'Whose work is "invisible when it works"?',
      options: ['Data analyst', 'Data engineer', 'Data scientist', 'ML engineer'],
      answer: 1,
      explanation: 'A pipeline that quietly refreshes correctly every night draws attention only when it breaks.',
    },
  },

  // ── Projects ─────────────────────────────────────────────────────────────
  '/learn/projects/azure-batch-pipeline': {
    answer: 'The first project copies a CSV from a landing zone into ADLS Gen2 using Azure Data Factory, the foundational ingest pattern. ADF cannot reach your laptop, so you upload the file to a landing container first, then ADF copies it onward.',
    points: [
      'Enable the hierarchical namespace when creating the storage account.',
      'Test linked-service connections before saving, to catch errors early.',
      'A Copy activity needs a source dataset and a sink dataset.',
    ],
    example: {
      label: 'The flow of the first pipeline',
      lang: 'text',
      code: `local CSV  →  upload to landing container (ADLS)
            →  ADF Copy activity (source dataset → sink dataset)
            →  bronze container in ADLS Gen2`,
      static: true,
    },
    check: {
      question: 'Why upload the CSV to a landing container first?',
      options: ['It is faster', 'ADF runs in the cloud and cannot reach your local machine', 'CSV must be compressed', 'ADLS requires it'],
      answer: 1,
      explanation: 'ADF has no path to your laptop, so the file must first reach a location ADF can read.',
    },
  },

  '/learn/projects/azure-projects-02': {
    answer: 'This project replaces one Copy activity per file with a ForEach activity that loops over a list of files in a single pipeline run. Inside the loop, @item() returns the current value, and parameterised datasets use that value so one dataset handles any file.',
    points: [
      'ForEach iterates an array; one Copy activity handles every file.',
      '@item() only works inside a ForEach.',
      'Parameterise the dataset with @dataset().file_name.',
    ],
    example: {
      label: 'Looping files with ForEach (simulation)',
      lang: 'python',
      code: `files = ["orders_a.csv", "orders_b.csv", "orders_c.csv"]
for item in files:                      # ADF ForEach over the array
    source = f"landing/{item}"          # @item()
    sink = f"bronze/{item}"
    print(f"copy {source} -> {sink}")`,
    },
    check: {
      question: 'What does @item() return in an ADF ForEach loop?',
      options: ['The whole array', 'The current item of the loop', 'The pipeline name', 'The file size'],
      answer: 1,
      explanation: '@item() gives the current element each iteration; it is only valid inside the ForEach.',
    },
  },

  '/learn/projects/azure-project-03': {
    answer: 'This project passes a run date to the pipeline at runtime and builds the correct file names and folder paths from it, which makes the pipeline idempotent: any past date can be rerun safely. A scheduled trigger then runs it automatically.',
    points: [
      'Pipeline parameter defaults must be static text, not expressions.',
      'run_date as a parameter lets you safely rerun any date.',
      'Connect Set Variable before ForEach with an arrow to enforce order.',
    ],
    example: {
      label: 'A run date drives the paths',
      lang: 'python',
      code: `run_date = "2024-03-15"                                   # pipeline parameter
year, month, day = run_date.split("-")
source = f"landing/{year}/{month}/orders_{run_date}.csv"
sink = f"bronze/date={run_date}/orders.parquet"
print(source)
print(sink)`,
    },
    check: {
      question: 'Why pass run_date as a parameter?',
      options: ['To make the pipeline faster', 'So any past date can be rerun safely and idempotently', 'To avoid using ADLS', 'Dates are required'],
      answer: 1,
      explanation: 'A fixed date per run means a rerun reprocesses exactly that date without touching others.',
    },
  },

  '/learn/projects/azure-project-04': {
    answer: 'This project downloads a CSV straight from a public internet URL into ADLS, so no manual upload is needed. The HTTP linked service holds the base URL, the dataset holds the file path as a dynamic parameter, and anonymous authentication is used for public data.',
    points: [
      'The linked service stores the base URL; the dataset holds the path.',
      'Verify the URL works in a browser before building the pipeline.',
      'Public datasets use anonymous authentication.',
    ],
    example: {
      label: 'Base URL plus dynamic path',
      lang: 'python',
      code: `base_url = "https://data.example.gov"       # HTTP linked service
relative = "exports/orders_2024-03-15.csv"   # dataset parameter
print(f"{base_url}/{relative}")              # full request`,
    },
    check: {
      question: 'Where does the HTTP linked service keep the file path?',
      options: ['In the linked service itself', 'In the dataset, as a dynamic parameter', 'In the pipeline name', 'Nowhere'],
      answer: 1,
      explanation: 'The linked service holds only the base URL; the per-file path is a dataset parameter.',
    },
  },

  '/learn/projects/azure-project-05': {
    answer: 'This project adds safety to ingestion: Get Metadata checks whether a file exists before copying, an If Condition branches into a happy path and an error path, and a success arrow ensures a Delete only runs after a Copy succeeds, so files are never lost.',
    points: [
      'Get Metadata prevents cryptic crashes on missing files.',
      'If Condition splits the pipeline into True and False branches.',
      'Connect Delete to Copy on success, so a failed Copy keeps the source.',
    ],
    example: {
      label: 'The guarded flow',
      lang: 'text',
      code: `Get Metadata (exists?)
  └─ If Condition
       True  → Copy → (on success) Delete source
       False → log "file not found" and stop`,
      static: true,
    },
    check: {
      question: 'Why connect Delete to Copy with a success arrow, not just place it after?',
      options: ['It runs faster', 'If Copy fails, Delete must not run, or the source file is lost', 'Delete needs the arrow to work', 'It saves storage'],
      answer: 1,
      explanation: 'A success dependency keeps the source file whenever the copy did not succeed.',
    },
  },

  '/learn/projects/azure-project-06': {
    answer: 'This project calls a live REST API from ADF for three cities, receives JSON, saves it to ADLS and runs on a morning schedule. An array of objects holds each city\'s parameters, a ForEach loops over them, and @{item().property} reads individual fields.',
    points: [
      'REST APIs return JSON; you request them with a URL, not a file.',
      'An array of objects carries several values per loop item.',
      '@{item().lat} reads a field with dot notation.',
    ],
    example: {
      label: 'One ForEach item carries several fields',
      lang: 'python',
      code: `cities = [
    {"name": "newyork", "lat": "40.71", "lon": "-74.01"},
    {"name": "austin", "lat": "30.27", "lon": "-97.74"},
]
for item in cities:                                   # ADF ForEach
    url = f"https://api.example.com/weather?lat={item['lat']}&lon={item['lon']}"
    print(item["name"], "->", url)`,
    },
    check: {
      question: 'How does one ForEach item carry a city\'s name, latitude and longitude together?',
      options: ['Three separate arrays', 'The array holds objects, read with @{item().property}', 'It cannot', 'In the pipeline name'],
      answer: 1,
      explanation: 'Each array element is an object, and dot notation reads each field inside the loop.',
    },
  },
}
