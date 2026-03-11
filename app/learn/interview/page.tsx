'use client'
import { useState } from 'react'
import { LearnLayout } from '@/components/content/LearnLayout'
import { ChevronDown, ChevronUp } from 'lucide-react'

const diffColor: Record<string, { bg: string; text: string; border: string }> = {
  Easy:   { bg: 'rgba(0,230,118,0.1)',   text: '#00e676', border: 'rgba(0,230,118,0.25)' },
  Medium: { bg: 'rgba(245,197,66,0.1)',  text: '#f5c542', border: 'rgba(245,197,66,0.25)' },
  Hard:   { bg: 'rgba(255,107,107,0.1)', text: '#ff6b6b', border: 'rgba(255,107,107,0.25)' },
}

const questions: {
  topic: string
  color: string
  items: { q: string; diff: 'Easy' | 'Medium' | 'Hard'; freq: string; answer: string; tip?: string }[]
}[] = [
  {
    topic: 'SQL', color: '#00c2ff',
    items: [
      {
        q: 'What is the difference between RANK() and DENSE_RANK()?',
        diff: 'Easy', freq: 'Asked in almost every SQL interview',
        answer: `Both assign a rank to rows within a partition ordered by a column.

RANK() leaves gaps after ties. If two rows tie at position 2, the next row gets rank 4 — not 3.
DENSE_RANK() never leaves gaps. Two rows tied at position 2, the next row gets rank 3.

Example: product revenues are 100, 90, 90, 80.
RANK()        → 1, 2, 2, 4
DENSE_RANK()  → 1, 2, 2, 3

Use RANK() when you need to know the absolute position (there are 3 products ranked above this one). Use DENSE_RANK() when you need consecutive rankings (this is the 3rd tier of products).`,
        tip: 'Always give the specific numbers example. Interviewers want to see you can explain it concretely, not just define it.'
      },
      {
        q: 'Write a query to find the second highest salary from an employee table.',
        diff: 'Easy', freq: 'Classic warm-up question',
        answer: `-- Method 1: using subquery (simple, works everywhere)
SELECT MAX(salary) as second_highest
FROM employees
WHERE salary < (SELECT MAX(salary) FROM employees)

-- Method 2: using DENSE_RANK (better — handles ties correctly)
WITH ranked AS (
  SELECT salary,
         DENSE_RANK() OVER (ORDER BY salary DESC) as rnk
  FROM employees
)
SELECT salary
FROM ranked
WHERE rnk = 2

Method 2 is the better answer because if two people share the highest salary, Method 1 correctly returns the second distinct value, and Method 2 handles it cleanly with DENSE_RANK. Always mention why you chose the approach.`,
        tip: 'Mention the tie-handling edge case. That is what separates a good answer from a great one.'
      },
      {
        q: 'Explain how window functions work. When would you use LAG()?',
        diff: 'Medium', freq: 'Very common — especially in data engineering interviews',
        answer: `Window functions perform calculations across a set of rows related to the current row without collapsing them into groups like GROUP BY does.

The syntax: FUNCTION() OVER (PARTITION BY col ORDER BY col ROWS/RANGE frame)

LAG() gives you the value from a previous row in the result set. The most common use case is month-over-month or day-over-day comparisons.

Example — daily revenue with previous day comparison:
SELECT
  order_date,
  daily_revenue,
  LAG(daily_revenue) OVER (ORDER BY order_date) as prev_day,
  daily_revenue - LAG(daily_revenue) OVER (ORDER BY order_date) as change
FROM daily_sales

In a real pipeline I use LAG() to detect anomalies — if today's revenue is less than 50% of yesterday's, something is wrong and the pipeline should alert.`,
      },
      {
        q: 'What is a CTE and why would you use one instead of a subquery?',
        diff: 'Easy', freq: 'Comes up in almost every interview',
        answer: `A CTE (Common Table Expression) is a named temporary result set defined with a WITH clause at the top of a query.

The practical reasons to prefer CTEs over subqueries:

Readability — a subquery buried in a FROM clause is hard to debug. A CTE has a name, sits at the top, and makes the logic obvious step by step.

Reusability — a CTE can be referenced multiple times in the same query. A subquery has to be repeated each time.

Debugging — you can comment out the final SELECT and just run the CTE to check intermediate results. You cannot do that with a subquery.

In production pipelines I always use CTEs for any query longer than two steps. It makes code reviews much easier when a teammate can read the logic as a sequence of named steps rather than a nested mess.`,
      },
      {
        q: 'How would you find duplicate records in a table and delete them keeping only one?',
        diff: 'Medium', freq: 'Common data quality question',
        answer: `-- Step 1: Find duplicates
SELECT order_id, COUNT(*) as cnt
FROM orders
GROUP BY order_id
HAVING COUNT(*) > 1

-- Step 2: Identify which rows to keep using ROW_NUMBER
WITH deduped AS (
  SELECT *,
    ROW_NUMBER() OVER (PARTITION BY order_id ORDER BY created_at DESC) as rn
  FROM orders
)
-- rn = 1 means it is the latest row for that order_id
SELECT * FROM deduped WHERE rn = 1

-- Step 3: Delete keeping only rn = 1
-- In SQL Server / Synapse:
WITH deduped AS (
  SELECT *,
    ROW_NUMBER() OVER (PARTITION BY order_id ORDER BY created_at DESC) as rn
  FROM orders
)
DELETE FROM deduped WHERE rn > 1

In a data pipeline I would do this in the Silver transformation — the Bronze layer keeps all duplicates as-is, and Silver deduplicates using ROW_NUMBER. I would also log how many rows were removed so we can monitor upstream data quality over time.`,
        tip: 'Mentioning where this fits in the Medallion Architecture shows you think in systems, not just SQL.'
      },
      {
        q: 'What is the difference between WHERE and HAVING?',
        diff: 'Easy', freq: 'Beginner filter question — do not get this wrong',
        answer: `WHERE filters individual rows before grouping happens.
HAVING filters groups after aggregation.

Wrong — this errors:
SELECT region, COUNT(*) FROM orders WHERE COUNT(*) > 100 GROUP BY region

Correct:
SELECT region, COUNT(*) FROM orders GROUP BY region HAVING COUNT(*) > 100

You can use both in the same query:
SELECT region, COUNT(*) as order_count
FROM orders
WHERE order_date >= '2025-01-01'   -- filters rows first
GROUP BY region
HAVING COUNT(*) > 100              -- then filters the groups`,
      },
    ]
  },
  {
    topic: 'Python & PySpark', color: '#f5c542',
    items: [
      {
        q: 'What is the difference between a transformation and an action in Spark?',
        diff: 'Medium', freq: 'Asked in most Spark / Databricks interviews',
        answer: `This is one of the most important things to understand about Spark.

Transformations are lazy — they define what to do but do not execute immediately. filter(), select(), join(), withColumn() are all transformations. Spark builds a DAG (execution plan) from them but does nothing yet.

Actions trigger execution — they force Spark to actually compute the result. count(), show(), collect(), write() are actions.

Why does this matter?
Spark can optimize the entire DAG before executing. If you filter() after a join(), Spark might push the filter before the join to reduce the data it needs to join. This is called predicate pushdown and it makes queries significantly faster without you doing anything.

A common mistake is calling collect() on a large dataset — this brings all data to the driver machine and will crash it. In production you almost never use collect(). You use write() to save results.`,
        tip: 'Always give a concrete bad example (collect() on large data). It shows you understand production consequences, not just theory.'
      },
      {
        q: 'Explain the difference between narrow and wide transformations.',
        diff: 'Hard', freq: 'Deeper Spark question — asked at senior level',
        answer: `A narrow transformation means each input partition contributes to exactly one output partition. No data moves between machines. filter(), select(), and map() are narrow. Fast.

A wide transformation means data from multiple partitions must be combined. Data shuffles across the network between machines. groupBy(), join(), and repartition() are wide. Slow and expensive.

The shuffle is the expensive part — Spark has to serialize data, send it over the network, and deserialize it on the receiving machine.

In practice: you want to minimize wide transformations. If you can filter data before a join, do it. If you can repartition once and then do multiple joins, do that instead of repartitioning repeatedly.

When you see a slow Spark job, look at the Spark UI — stages with a shuffle are the bottleneck. That tells you which wide transformation is the problem.`,
      },
      {
        q: 'How do you handle a skewed join in Spark?',
        diff: 'Hard', freq: 'Senior-level question — impressive if you know this',
        answer: `Data skew happens when one key has many more rows than others. In a join, all rows with the same key go to the same partition and one machine does all the work while the others sit idle. The job runs 10x slower than expected.

How to detect it: look at the Spark UI stage details. If one task takes 10 minutes and the other 199 tasks take 30 seconds, you have skew.

How to fix it:

Option 1 — Broadcast join: if one side of the join is small enough (< 200MB typically), broadcast it to every executor. No shuffle needed. In PySpark: df1.join(broadcast(df2), on='key')

Option 2 — Salting: add a random number suffix to the skewed key, join, then drop the suffix. This artificially distributes the hot key across multiple partitions.

Option 3 — AQE (Adaptive Query Execution): in Spark 3+, enable spark.sql.adaptive.enabled = true. Spark detects skew at runtime and automatically splits skewed partitions. This is the easiest fix for most cases.`,
      },
      {
        q: 'What is a broadcast variable and when would you use one?',
        diff: 'Medium', freq: 'Common Spark optimization question',
        answer: `A broadcast variable sends a read-only copy of a small dataset to every executor so that each worker has it in memory locally instead of fetching it over the network during a join.

When to use it: when you are joining a large dataset with a small lookup table — say, a table of region codes or product categories. Without broadcasting, Spark shuffles both sides. With broadcasting, only the small table is sent to each machine once.

from pyspark.sql.functions import broadcast

result = large_orders_df.join(
    broadcast(small_region_codes_df),
    on='region_code'
)

Spark will also do this automatically if the small table is under spark.sql.autoBroadcastJoinThreshold (default 10MB). You can increase this or force it explicitly.

I use broadcast joins whenever one side of a join is a reference/lookup table under 200MB. It is one of the easiest performance wins in PySpark.`,
      },
      {
        q: 'How do you read only the partitions you need in Spark (partition pruning)?',
        diff: 'Medium', freq: 'Practical optimization question',
        answer: `Partition pruning means Spark reads only the partition directories that match your filter, instead of scanning the entire dataset.

It only works if your filter column is the column you partitioned by when writing.

Example — data is partitioned by order_date when written:
df.write.partitionBy("order_date").parquet("s3://bucket/orders/")

When you read it with a filter on order_date:
df = spark.read.parquet("s3://bucket/orders/").filter("order_date = '2025-03-01'")

Spark only reads the 2025-03-01=/ directory. It does not touch any other partition.

If you filter by a non-partitioned column (say, region), Spark has to scan everything.

In the Spark UI, you can verify pruning is working — the number of files read should be much smaller than the total files in the dataset. If it is not, you are missing the partition pruning and your job is reading more than it should.`,
      },
    ]
  },
  {
    topic: 'Cloud & Architecture', color: '#0078d4',
    items: [
      {
        q: 'Explain the Medallion Architecture. What happens at each layer?',
        diff: 'Easy', freq: 'Asked in literally every data engineering interview',
        answer: `The Medallion Architecture is a data lake design pattern with three layers: Bronze, Silver, and Gold.

Bronze is the raw layer. Data lands here exactly as it came from the source — no changes, no cleaning. If the source sends a CSV, Bronze stores a CSV. If it sends JSON, Bronze stores JSON. This layer is append-only. You never modify Bronze data because it is your source of truth and audit trail. If a downstream transformation has a bug, you reprocess from Bronze.

Silver is the cleaned and validated layer. A pipeline reads Bronze, applies transformations, and writes Delta Lake tables. This includes removing nulls, dropping duplicates, fixing data types, standardizing formats, and adding audit columns. Silver data is trustworthy and at row level — not yet aggregated. Analysts can query Silver for ad-hoc investigation.

Gold is the aggregated, business-ready layer. Gold tables are pre-calculated for specific business questions — daily sales by region, customer lifetime value, monthly churn rate. Dashboards and reports connect to Gold. Queries are fast because aggregation happened during the pipeline run, not at query time.

The reason this pattern exists: before it, everyone read directly from raw data. Results were inconsistent, schemas surprised you mid-query, and nobody trusted the numbers. Each layer has a clear contract about data quality and shape.`,
        tip: 'Be ready for the follow-up: "What goes wrong without this?" — have a concrete example ready.'
      },
      {
        q: 'What is the difference between Azure Data Factory and Azure Databricks? Where does each one fit?',
        diff: 'Easy', freq: 'Very common for Azure-focused roles',
        answer: `They solve completely different problems and work together, not instead of each other.

Azure Data Factory is an orchestration tool. It decides what runs, in what order, when, and what to do if something fails. ADF does not process data itself — it is the manager that tells other services to do work. An ADF pipeline might say: at 2am, trigger this Databricks notebook, then if it succeeds, trigger this copy activity, then send an email.

Azure Databricks is a processing engine. It runs Apache Spark and actually transforms data — reads from Bronze, cleans it, writes to Silver. Databricks does the heavy computational work.

The right mental model: ADF is the scheduler and coordinator. Databricks is the worker.

In a real Medallion Architecture: ADF has a pipeline with three notebook activities (Bronze→Silver, Silver→Gold, validation). Each activity runs a Databricks notebook. ADF monitors them, retries failures, and sends alerts. Databricks does the actual data processing.

You would not use ADF to transform data or use Databricks to schedule pipelines. Each tool does what it is designed for.`,
      },
      {
        q: 'What is Delta Lake and what problems does it solve?',
        diff: 'Medium', freq: 'Essential for any Databricks or Azure role',
        answer: `Delta Lake is an open-source table format that sits on top of Parquet files and adds a transaction log. That transaction log is what makes it powerful.

The problems it solves:

1. Reliability — a plain Spark write to Parquet is not atomic. If the job fails halfway, you have partial data and a broken table. Delta Lake writes are atomic — either the full write succeeds and becomes visible, or it fails completely and the old data is untouched.

2. ACID transactions — you can safely read a Delta table while someone else is writing to it. Without Delta, a reader might see half-written data during a write.

3. Time travel — every change is tracked in the transaction log. You can query the table as it was yesterday: SELECT * FROM orders VERSION AS OF 5 or TIMESTAMP AS OF '2025-03-01'. This is invaluable when a bad transformation corrupts Gold and you need to roll back.

4. MERGE (upsert) — you can insert new rows and update existing ones in a single operation. Impossible with plain Parquet.

5. Schema enforcement — Delta rejects writes that do not match the table schema. No more silent schema drift breaking downstream queries.

In a production Medallion Architecture I always use Delta Lake for Silver and Gold. Bronze can be raw Parquet because we never update Bronze — we only append.`,
      },
      {
        q: 'What is partitioning in a data lake and why does it matter?',
        diff: 'Medium', freq: 'Common for any cloud platform interview',
        answer: `Partitioning organizes files into subdirectories based on a column value. When you query with a filter on that column, the query engine only reads the relevant directories instead of scanning everything.

Example: you have two years of orders partitioned by order_date.

Without partitioning — a query for March 2025 orders scans all 730 days of files.
With partitioning — the same query reads only the March 2025 directory. 30 files instead of 730.

This matters because cloud storage like S3 and ADLS charges per file scanned (or per data read in BigQuery). Partitioning can cut query costs by 90% and query time by the same factor.

Partition key choice is important:
- Date is the most common and almost always correct for time-series data
- Region or country works well if queries almost always filter by geography
- Too many distinct values (like customer_id) creates too many tiny files — bad
- Too few distinct values (like a boolean) creates two massive partitions — not helpful

In Silver and Gold I partition by the column analysts filter most frequently, which is almost always a date column.`,
      },
      {
        q: 'How would you design a pipeline to handle late-arriving data?',
        diff: 'Hard', freq: 'System design question — tests real-world thinking',
        answer: `Late-arriving data means a record from yesterday (or last week) arrives in today's pipeline run. This is a real problem — payment systems confirm transactions hours later, sensor data has network delays, third-party vendors send corrections.

The naive approach — overwrite the partition for the day when new data arrives — works but is expensive if you are rewriting large partitions.

Better approaches:

1. MERGE with Delta Lake — instead of overwriting, use MERGE to upsert. New records insert, corrections update existing records. Only the changed records are touched.

MERGE INTO silver.orders AS target
USING new_batch AS source ON target.order_id = source.order_id
WHEN MATCHED THEN UPDATE SET *
WHEN NOT MATCHED THEN INSERT *

2. Watermarking in streaming — for streaming pipelines, define a watermark. Accept data up to N hours late. Discard anything older than the watermark. Spark Structured Streaming supports this natively.

3. Process date vs event date — always store both the timestamp when the event happened (event_time) and when your pipeline processed it (load_time). This lets you reprocess by event_time without losing the processing audit trail.

4. Reprocessing windows — Gold layer pipelines that aggregate by date should be designed to reprocess the last 7 days on every run, not just today. Slightly more expensive but guarantees late data is caught.

I would flag this as a requirement question upfront in any pipeline design: "What is the maximum lateness we need to handle?" That answer determines which approach to use.`,
        tip: 'This question tests whether you have thought about real data pipelines. Give the MERGE approach and mention you always ask about lateness requirements upfront.'
      },
    ]
  },
  {
    topic: 'Data Quality & Pipelines', color: '#7b61ff',
    items: [
      {
        q: 'What is idempotency in data pipelines and why does it matter?',
        diff: 'Medium', freq: 'Very common — especially in senior interviews',
        answer: `An idempotent pipeline produces the same result no matter how many times you run it with the same input.

This matters because pipelines fail. Network errors, timeouts, upstream data arriving late — something will go wrong and you will need to rerun a pipeline. If rerunning produces different results or duplicate data, you have a problem that is very hard to debug.

A non-idempotent pipeline might append data every time it runs. Run it twice for March 1st and you have double the data.

An idempotent pipeline uses overwrite or upsert logic. Run it twice for March 1st and you get exactly the same result both times.

How to achieve it in practice:
- For batch pipelines: write to a staging location, then atomically replace the target partition. Or use MERGE instead of INSERT.
- For streaming pipelines: track which events you have already processed using a checkpoint or deduplication key.
- Always design pipelines assuming they will be rerun. Build it to handle reruns from day one.

A good test: if your pipeline ran twice for yesterday, would you have duplicate data? If yes, it is not idempotent.`,
      },
      {
        q: 'How do you monitor a data pipeline in production?',
        diff: 'Medium', freq: 'Practical operations question',
        answer: `Monitoring has three layers: did it run, did it run correctly, and did it produce good data.

Did it run — pipeline execution monitoring. In Azure, ADF has built-in monitoring with run history, duration, and failure alerts via Azure Monitor. You set up an alert rule: if any pipeline run fails, send an email or Teams notification within 5 minutes.

Did it run correctly — duration and performance monitoring. Track how long each pipeline run takes. If the Silver transformation usually takes 8 minutes and today it took 45 minutes, something is wrong even if it succeeded. Set a duration threshold alert.

Did it produce good data — data quality monitoring. After each run, execute validation queries and log the results:
- Row count for today vs the 7-day average (flag if it drops more than 30%)
- Null counts in critical columns
- Duplicate counts
- Value range checks (no negative revenues, no future dates)
- Cross-layer reconciliation (Silver row count should be within 5% of Bronze)

Log these metrics to a monitoring table. Build a simple dashboard over it. If any metric breaches its threshold, alert immediately.

The most important thing: do not just monitor failures. A pipeline that runs but produces silently wrong data is worse than a pipeline that fails loudly.`,
      },
      {
        q: 'Explain the difference between a data warehouse and a data lake.',
        diff: 'Easy', freq: 'Fundamental concept question',
        answer: `A data warehouse stores structured, processed, query-optimized data. It has a fixed schema defined upfront. You load clean, transformed data into it and analysts run SQL queries against tables. Fast for structured queries. Examples: Snowflake, Redshift, BigQuery, Synapse.

A data lake stores raw data in its original format — structured tables, semi-structured JSON, unstructured files, images, logs. No fixed schema required. Cheap storage (S3, ADLS). You process data when you read it (schema-on-read). Flexible but requires more work to make queryable. Examples: S3 + Glue, ADLS Gen2 + Databricks.

A data lakehouse combines both. It stores data in open formats (Parquet + Delta Lake or Iceberg) on cheap object storage but adds the reliability, ACID transactions, and SQL query capability of a warehouse. This is the current state of the art and what the Medallion Architecture on Databricks or Microsoft Fabric delivers.

Most new projects in 2025 use the lakehouse pattern rather than maintaining a separate data lake and warehouse.`,
      },
      {
        q: 'What would you check first if a pipeline that was working yesterday suddenly failed today?',
        diff: 'Medium', freq: 'Troubleshooting question — tests real experience',
        answer: `This is a debugging process, not a single answer. Walk through it methodically.

Step 1 — Read the error message carefully. The actual error message tells you most of what you need. Is it a permissions error, a schema mismatch, a file not found, a timeout, an OOM (out of memory)?

Step 2 — Check if the source data arrived. The most common cause of "suddenly failing" pipelines is the upstream system not sending data. Check the Bronze container — is today's file there?

Step 3 — Check if the source schema changed. Did a column get renamed, added, or removed? Schema changes upstream silently break Silver transformations that expect specific column names.

Step 4 — Check the error timestamp and recent changes. Did anyone deploy a code change yesterday? Did the source system have an incident? Check Slack or the incident log.

Step 5 — Run the failing step manually with yesterday's data. Does it work? If yes, it is a data problem not a code problem.

Step 6 — Check resource limits. Did the cluster run out of memory? Did you hit a storage quota? Did an API rate limit get hit?

The pattern: eliminate causes systematically starting with the most common ones. Do not start writing code until you understand what is wrong. Most pipeline failures are data issues (missing files, schema changes) not code issues.`,
      },
    ]
  },
  {
    topic: 'System Design', color: '#ff9900',
    items: [
      {
        q: 'Design a batch pipeline that ingests daily sales data from 50 retail stores and makes it available for analysts by 6am.',
        diff: 'Hard', freq: 'Classic system design question for data engineers',
        answer: `I would design this using the Medallion Architecture on Azure.

Ingestion — each store drops a CSV file to a designated folder in ADLS Gen2 by midnight. Files land in bronze/sales/date=YYYY-MM-DD/store_id=XXX/sales.csv. An ADF Storage Event Trigger fires each time a new file arrives and runs a lightweight notebook that validates the file (correct columns, non-empty) and logs receipt to a control table.

Orchestration — at 1am, a scheduled ADF pipeline checks the control table to confirm all 50 stores have delivered files. If any are missing after a grace period, it sends an alert and continues with available data, logging missing stores.

Bronze to Silver — a Databricks notebook reads all 50 files, applies cleaning (remove nulls on order_id and amount, drop duplicates on order_id, cast types, standardize region names), and writes to silver/orders/ as a Delta Lake table partitioned by order_date. Duration: ~10 minutes for typical volumes.

Silver to Gold — a second Databricks notebook reads Silver, produces three Gold tables: daily_sales_by_store (total revenue, order count per store), daily_sales_by_region (aggregated by region), and hourly_pattern (revenue by hour of day for trend analysis). Writes as Delta Lake. Duration: ~5 minutes.

Validation — a quality check notebook confirms row counts, null rates, and value ranges. Writes results to a monitoring table. Sends a Teams notification with a summary.

By 2am typically the entire pipeline is complete, leaving a 4-hour buffer before the 6am SLA.

Failure handling: ADF retries each notebook activity twice with a 5-minute gap. If all retries fail, it sends an urgent alert. Missing store files are tracked and flagged in the summary notification so analysts know the data is incomplete before they query it.`,
        tip: 'Structure your answer: ingestion, orchestration, transformation, serving, monitoring. Cover failure handling — interviewers specifically look for this.'
      },
      {
        q: 'How would you design a pipeline to handle 1 billion rows per day?',
        diff: 'Hard', freq: 'Scale question — tests Spark and architecture knowledge',
        answer: `At 1 billion rows per day, the main considerations are: cost, processing time, and partition strategy.

Partitioning strategy — do not write all 1 billion rows as one massive file. Partition by date and optionally by region or another high-cardinality column. This enables partition pruning so analysts and downstream jobs only read the data they need.

Cluster sizing — for 1 billion rows of typical transactional data (~200 bytes per row = ~200GB), a Databricks cluster with 8 workers of 32GB RAM each handles this comfortably. The key is not throwing more machines at it blindly but ensuring the data is evenly distributed across partitions so no single worker is doing disproportionate work.

Avoid common bottlenecks:
- Shuffle operations (groupBy, join) are the main performance killers. Minimize them, filter before joining, use broadcast joins for small lookup tables.
- File size matters: aim for 128MB-1GB Parquet files. Too many tiny files kills performance (the small files problem). Coalesce or repartition after heavy filtering.
- Use Delta Lake's OPTIMIZE command to compact small files after large writes: OPTIMIZE table ZORDER BY (order_date, region) — this clusters data physically for common query patterns.

Incremental processing — do not reprocess all 1 billion rows every day if only a fraction changed. Design for incremental loads using watermarks or control tables that track the last processed record.

Cost optimization — use Databricks job clusters (auto-terminate when done) not all-purpose clusters. Enable spot instances for non-critical batch workloads. Archive Bronze partitions older than 30 days to cool storage.`,
      },
    ]
  },
  {
    topic: 'Behavioral & Situational', color: '#00e676',
    items: [
      {
        q: 'Tell me about a time you found a data quality issue in production. What did you do?',
        diff: 'Medium', freq: 'Always asked — have a real or realistic story ready',
        answer: `Structure your answer using STAR: Situation, Task, Action, Result.

Example answer structure:

Situation — during a project I was running a daily sales pipeline. Three days after launch, the analytics team flagged that the regional revenue numbers did not match what the business expected.

Task — I needed to find the root cause quickly, understand how many days of data were affected, and fix it without disrupting analysts who were already using the data.

Action — I ran a data reconciliation query comparing Silver row counts to Bronze row counts per day. I found that the Silver transformation was silently dropping rows where the region column contained a space after the region name (e.g. "NORTH " vs "NORTH"). My string standardization code was doing a full match instead of a trimmed match. I then checked how many days were affected using the pipeline run logs — it was 3 days. I fixed the transformation (added str.strip() before the match), reprocessed the three affected days by rerunning the pipeline for those dates, validated the corrected output against the expected totals, and notified the analytics team with a summary of what changed and why.

Result — the data was corrected within 2 hours. I also added this as a permanent data quality check: after every Silver run, compare row counts to Bronze and alert if the difference exceeds 2%. That check caught two more upstream issues in the following month before they reached analysts.

The key things interviewers look for: did you understand the impact, did you communicate clearly, did you fix the root cause not just the symptom, and did you prevent recurrence.`,
      },
      {
        q: 'How do you explain a technical concept to a non-technical stakeholder?',
        diff: 'Easy', freq: 'Communication and stakeholder management',
        answer: `The key is to lead with the outcome they care about, not the technology.

A business stakeholder does not care what Delta Lake is. They care that their dashboard is accurate and refreshes on time. So instead of explaining Delta ACID transactions, I explain: "We added a layer that makes sure if something goes wrong at 2am during processing, your morning dashboard still shows clean data from yesterday rather than broken data from a half-finished update."

My approach:
1. Ask what question they are trying to answer. Technical explanations only make sense in context.
2. Use analogies from their domain. A pipeline failure is like a delayed flight — it happens, what matters is the recovery plan.
3. Quantify the impact in their terms. Not "we reduced query time by 80%" but "the morning report will load in 3 seconds instead of 25 seconds."
4. Avoid acronyms unless they have already used them.

The test I use: if I explained it and they could describe it accurately to their manager, I explained it well.`,
      },
      {
        q: 'Where do you see data engineering heading in the next 2-3 years?',
        diff: 'Easy', freq: 'Forward-thinking question — shows you follow the industry',
        answer: `Three clear trends I think will define the next few years:

Open table formats becoming the universal standard — Delta Lake and Apache Iceberg are replacing proprietary formats. The war between them is effectively over — both are winning and most query engines support both. The days of data locked in a vendor-specific format are ending.

Data engineering becoming more automated — tools like dbt, Microsoft Fabric, and increasingly AI-assisted pipeline generation are reducing the amount of boilerplate code data engineers write. The job shifts toward architecture, data modeling, and quality assurance rather than writing ETL code from scratch.

Streaming becoming more accessible — historically, streaming required specialized expertise (Kafka, Flink). Managed services like Azure Event Hubs, Kinesis, and Pub/Sub are making streaming pipelines more approachable. More companies will adopt streaming for use cases that currently use batch with hourly schedules.

What this means for someone starting now: strong foundations (SQL, Python, Spark, one cloud deeply) will remain valuable regardless of which tools change. The people who understand why data systems work, not just how to configure them, will be the most durable.`,
      },
    ]
  },
]

function QuestionCard({ q, diff, freq, answer, tip }: typeof questions[0]['items'][0]) {
  const [open, setOpen] = useState(false)
  const dc = diffColor[diff]

  return (
    <div className="rounded-xl overflow-hidden transition-all" style={{ border: '1px solid var(--border)', background: 'var(--surface)' }}>
      <button className="w-full flex items-start gap-4 p-5 text-left" onClick={() => setOpen(!open)}>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap mb-1.5">
            <span className="text-xs font-mono px-2 py-0.5 rounded-full"
              style={{ background: dc.bg, color: dc.text, border: `1px solid ${dc.border}` }}>
              {diff}
            </span>
            <span className="text-xs font-mono" style={{ color: 'var(--muted)' }}>{freq}</span>
          </div>
          <p className="font-display font-semibold text-sm leading-snug" style={{ color: 'var(--text)' }}>{q}</p>
        </div>
        <div className="flex-shrink-0 mt-0.5" style={{ color: 'var(--muted)' }}>
          {open ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
        </div>
      </button>

      {open && (
        <div className="px-5 pb-5 border-t" style={{ borderColor: 'var(--border)' }}>
          <div className="mt-4">
            <div className="text-xs font-mono uppercase tracking-wider mb-2" style={{ color: 'var(--accent)' }}>
              Sample answer
            </div>
            <div className="rounded-xl p-4" style={{ background: 'var(--bg)', border: '1px solid var(--border)' }}>
              <p className="text-sm leading-relaxed whitespace-pre-line" style={{ color: 'var(--text2)', fontFamily: 'Lora, serif' }}>
                {answer}
              </p>
            </div>
            {tip && (
              <div className="mt-3 flex items-start gap-2 p-3 rounded-lg"
                style={{ background: 'rgba(245,197,66,0.06)', border: '1px solid rgba(245,197,66,0.2)' }}>
                <span className="text-sm flex-shrink-0">💡</span>
                <p className="text-xs leading-relaxed" style={{ color: '#f5c542', fontFamily: 'Lora, serif' }}>{tip}</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export default function InterviewPage() {
  const [activeTopic, setActiveTopic] = useState<string | null>(null)

  const filtered = activeTopic
    ? questions.filter(g => g.topic === activeTopic)
    : questions

  const totalQ = questions.reduce((sum, g) => sum + g.items.length, 0)

  return (
    <LearnLayout
      title="Data Engineering Interview Prep"
      description="Real questions from real interviews — not textbook definitions. Each answer is written the way a senior engineer would actually answer it, with the details that make interviewers take notice."
      section="Interview Prep"
      readTime="30 min"
      updatedAt="March 2026"
      breadcrumbs={[
        { label: 'Learn', href: '/learn/roadmap' },
        { label: 'Interview Prep', href: '/learn/interview' },
      ]}
    >
      <h2>How to use this page</h2>
      <p>
        Read each answer out loud. Seriously. Saying it out loud reveals the parts you do not actually understand — you will stumble, pause, or realise you are repeating words without knowing what they mean. Fix those gaps before your interview.
      </p>
      <p>
        Do not memorise these answers word for word. Use them to understand the structure of a good answer — what to lead with, what detail to include, what edge case to mention. Then practice telling it in your own words.
      </p>
      <p>
        The difficulty ratings are relative to entry-level data engineering interviews. Easy means you should never get this wrong. Hard means getting it right will genuinely impress the interviewer.
      </p>

      {/* Stats */}
      <div className="flex items-center gap-4 flex-wrap my-6">
        <div className="px-4 py-2 rounded-xl" style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}>
          <span className="font-display font-bold" style={{ color: 'var(--accent)' }}>{totalQ}</span>
          <span className="text-xs font-mono ml-1.5" style={{ color: 'var(--muted)' }}>questions total</span>
        </div>
        {Object.entries(diffColor).map(([d, c]) => {
          const count = questions.flatMap(g => g.items).filter(i => i.diff === d).length
          return (
            <div key={d} className="px-4 py-2 rounded-xl" style={{ background: c.bg, border: `1px solid ${c.border}` }}>
              <span className="font-display font-bold" style={{ color: c.text }}>{count}</span>
              <span className="text-xs font-mono ml-1.5" style={{ color: c.text }}>{d}</span>
            </div>
          )
        })}
      </div>

      {/* Topic filter */}
      <div className="flex flex-wrap gap-2 mb-8">
        <button onClick={() => setActiveTopic(null)}
          className="text-xs font-mono px-3 py-1.5 rounded-full transition-all"
          style={{
            background: activeTopic === null ? 'var(--accent)' : 'var(--bg2)',
            color: activeTopic === null ? '#fff' : 'var(--muted)',
            border: '1px solid var(--border)',
          }}>
          All topics
        </button>
        {questions.map(g => (
          <button key={g.topic} onClick={() => setActiveTopic(g.topic === activeTopic ? null : g.topic)}
            className="text-xs font-mono px-3 py-1.5 rounded-full transition-all"
            style={{
              background: activeTopic === g.topic ? `${g.color}20` : 'var(--bg2)',
              color: activeTopic === g.topic ? g.color : 'var(--muted)',
              border: `1px solid ${activeTopic === g.topic ? g.color + '40' : 'var(--border)'}`,
            }}>
            {g.topic}
          </button>
        ))}
      </div>

      {/* Questions */}
      <div className="space-y-10">
        {filtered.map(group => (
          <div key={group.topic}>
            <div className="flex items-center gap-3 mb-4">
              <h2 className="font-display font-bold text-lg" style={{ color: group.color }}>{group.topic}</h2>
              <div className="flex-1 h-px" style={{ background: `${group.color}30` }} />
              <span className="text-xs font-mono" style={{ color: 'var(--muted)' }}>{group.items.length} questions</span>
            </div>
            <div className="space-y-3">
              {group.items.map((item, i) => (
                <QuestionCard key={i} {...item} />
              ))}
            </div>
          </div>
        ))}
      </div>

      <h2>Before your interview</h2>
      <ul>
        <li><strong>Know your project cold.</strong> Every interview will ask you to walk through your project. Practice explaining it in 3 minutes: what problem it solves, what the architecture looks like, what tools you used and why, what you would do differently.</li>
        <li><strong>Have numbers ready.</strong> How many rows did your pipeline process? How long did it take? What was the data quality pass rate? Numbers make everything more credible.</li>
        <li><strong>Prepare for "what went wrong."</strong> Interviewers love asking about failures. Have a genuine story about a bug or pipeline issue you debugged. Describe what went wrong, how you found it, and what you changed.</li>
        <li><strong>Know why you want this company specifically.</strong> Generic answers like "I want to grow" do not impress anyone. Research what tools they use, what problems they solve, and mention that specifically.</li>
        <li><strong>Ask good questions at the end.</strong> "What does the data stack look like?" and "What is the biggest data quality challenge your team is working on?" are much better than "What is the culture like?"</li>
      </ul>
    </LearnLayout>
  )
}