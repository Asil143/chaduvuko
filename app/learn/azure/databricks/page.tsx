import { LearnLayout } from '@/components/content/LearnLayout'
import { Callout } from '@/components/content/Callout'
import { CodeBlock } from '@/components/content/CodeBlock'
import { KeyTakeaways } from '@/components/content/KeyTakeaways'

export const metadata = { title: 'Azure Databricks' }

const clusterCode = `# Databricks cluster configuration (set in the UI or via API)
# For production data engineering workloads:

Cluster Mode:    Standard (single user) or Shared (multi-user)
Databricks Runtime: 14.3 LTS (Long Term Support — use LTS in production)
Worker Type:     Standard_DS3_v2 (14GB RAM, 4 cores per worker)
Min Workers:     2
Max Workers:     8  (auto-scales based on workload)
Auto-terminate:  60 minutes of inactivity

# For development/exploration — use a smaller cluster:
Worker Type:     Standard_DS3_v2
Workers:         1 (fixed, no auto-scale needed for dev)
Auto-terminate:  20 minutes`

const bronzeToSilverCode = `# Databricks Notebook: Bronze → Silver transformation
# File: /Shared/bronze_to_silver.py

import sys
from pyspark.sql import SparkSession
from pyspark.sql import functions as F
from pyspark.sql.types import *
from datetime import datetime

# Get run_date parameter passed from ADF
dbutils.widgets.text("run_date", "2025-01-01")
run_date = dbutils.widgets.get("run_date")

spark = SparkSession.builder.appName("BronzeToSilver").getOrCreate()

# ── 1. Read raw Bronze data ──────────────────────────────────────────
bronze_path = f"abfss://bronze@yourlake.dfs.core.windows.net/sales/{run_date}/"

df_raw = spark.read.option("header", True).option("inferSchema", True).csv(bronze_path)

print(f"✅ Read {df_raw.count()} rows from Bronze for {run_date}")

# ── 2. Data quality checks ───────────────────────────────────────────
# Remove rows with null primary keys
df = df_raw.filter(F.col("order_id").isNotNull())

# Remove duplicates
df = df.dropDuplicates(["order_id"])

# ── 3. Transformations ───────────────────────────────────────────────
df_clean = (df
  .withColumn("order_date",     F.to_date("order_date", "yyyy-MM-dd"))
  .withColumn("unit_price",     F.col("unit_price").cast(DoubleType()))
  .withColumn("quantity",       F.col("quantity").cast(IntegerType()))
  .withColumn("discount",       F.coalesce(F.col("discount").cast(DoubleType()), F.lit(0.0)))
  .withColumn("total_amount",   F.col("unit_price") * F.col("quantity"))
  .withColumn("net_amount",     F.col("total_amount") * (1 - F.col("discount")))
  .withColumn("region",         F.upper(F.trim(F.col("region"))))
  .withColumn("_load_date",     F.lit(run_date))
  .withColumn("_load_timestamp",F.current_timestamp())
)

# ── 4. Write to Silver as Delta ──────────────────────────────────────
silver_path = "abfss://silver@yourlake.dfs.core.windows.net/sales/"

(df_clean.write
  .format("delta")
  .mode("append")
  .partitionBy("order_date")
  .save(silver_path)
)

print(f"✅ Written {df_clean.count()} clean rows to Silver Delta table")

# Return count for ADF to log
dbutils.notebook.exit(str(df_clean.count()))`

const silverToGoldCode = `# Databricks Notebook: Silver → Gold aggregation
# File: /Shared/silver_to_gold.py

from pyspark.sql import functions as F
from pyspark.sql.window import Window

spark = SparkSession.builder.appName("SilverToGold").getOrCreate()

# Read entire Silver table (Delta handles efficient reads)
df_silver = spark.read.format("delta").load(
    "abfss://silver@yourlake.dfs.core.windows.net/sales/"
)

# ── Gold Table 1: Daily Sales Summary ───────────────────────────────
daily_summary = (df_silver
  .groupBy("order_date", "region", "product_category")
  .agg(
    F.sum("net_amount").alias("total_revenue"),
    F.count("order_id").alias("order_count"),
    F.avg("net_amount").alias("avg_order_value"),
    F.countDistinct("customer_id").alias("unique_customers"),
    F.sum("quantity").alias("units_sold")
  )
  .withColumn("revenue_rank",
    F.rank().over(Window.partitionBy("order_date").orderBy(F.desc("total_revenue")))
  )
)

daily_summary.write.format("delta").mode("overwrite").save(
    "abfss://gold@yourlake.dfs.core.windows.net/daily_sales_summary/"
)

# ── Gold Table 2: Customer Lifetime Value ───────────────────────────
customer_ltv = (df_silver
  .groupBy("customer_id")
  .agg(
    F.sum("net_amount").alias("lifetime_value"),
    F.count("order_id").alias("total_orders"),
    F.min("order_date").alias("first_order_date"),
    F.max("order_date").alias("last_order_date"),
    F.avg("net_amount").alias("avg_order_value")
  )
)

customer_ltv.write.format("delta").mode("overwrite").save(
    "abfss://gold@yourlake.dfs.core.windows.net/customer_ltv/"
)

print("✅ Gold layer refreshed successfully")`

const deltaCode = `# Delta Lake — the most important Databricks feature for data engineers

# Time Travel: read data as it was at a previous point in time
df_yesterday = spark.read.format("delta").option("timestampAsOf", "2025-01-14").load(silver_path)
df_version5  = spark.read.format("delta").option("versionAsOf", 5).load(silver_path)

# UPSERT (MERGE) — update existing records, insert new ones
from delta.tables import DeltaTable

delta_table = DeltaTable.forPath(spark, silver_path)

delta_table.alias("target").merge(
    df_updates.alias("source"),
    "target.order_id = source.order_id"
).whenMatchedUpdateAll().whenNotMatchedInsertAll().execute()

# OPTIMIZE — compact small files for faster queries (run weekly)
spark.sql("OPTIMIZE delta.\`abfss://silver@yourlake.dfs.core.windows.net/sales/\` ZORDER BY (region, order_date)")

# VACUUM — remove old file versions to save storage (keep 7 days)
spark.sql("VACUUM delta.\`abfss://silver@yourlake.dfs.core.windows.net/sales/\` RETAIN 168 HOURS")`

export default function DatabricksPage() {
  return (
    <LearnLayout
      title="Azure Databricks"
      description="Azure Databricks is where the real transformation work happens. It brings Apache Spark as a fully managed service — write PySpark code in notebooks, run it across a cluster of machines, and process datasets too large to fit in memory on any single computer."
      section="Section 02 · Azure Track"
      readTime="20 min read"
      updatedAt="March 2026"
      breadcrumbs={[
        { label: 'Azure Track', href: '/learn/azure/introduction' },
        { label: 'Azure Databricks', href: '/learn/azure/databricks' },
      ]}
    >
      <h2 id="what-is-databricks">What Databricks actually gives you</h2>
      <p>
        Azure Databricks is Apache Spark — the industry-standard distributed computing engine — running as a fully managed Azure service. You don&apos;t install Spark, you don&apos;t configure clusters from scratch, you don&apos;t manage Java dependencies. You open a notebook, write PySpark code, and Databricks handles running it across however many machines the job needs.
      </p>
      <p>
        For data engineers, Databricks is primarily used for one thing: transforming large datasets. You read raw data from the Bronze layer, apply business logic, clean and validate it, then write clean data to Silver and Gold layers in Delta Lake format. This is the core data engineering workflow on Azure.
      </p>

      <Callout type="tip">
        If you&apos;ve used pandas before, PySpark will feel familiar — but PySpark operations run across a cluster of machines in parallel. The API looks similar, but PySpark is lazy (nothing runs until you trigger an action like .write() or .count()), and it handles datasets that are gigabytes or terabytes in size.
      </Callout>

      <h2 id="clusters">Clusters — what they are and how to configure them</h2>
      <p>
        A cluster is the group of virtual machines that runs your Spark code. You create a cluster in the Databricks UI, write notebooks that run on it, and Databricks distributes the work across all the machines automatically.
      </p>
      <CodeBlock code={clusterCode} language="bash" filename="cluster_config.txt" />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-6">
        {[
          { name: 'All-Purpose Cluster', use: 'Development & exploration', desc: 'Always running, interactive, used for writing and testing notebooks. More expensive because it stays on when idle. Use for development only.' },
          { name: 'Job Cluster', use: 'Production pipeline runs', desc: 'Spins up fresh for each job, runs to completion, then terminates automatically. Cheaper than all-purpose. Always use this for ADF-triggered production jobs.' },
        ].map(c => (
          <div key={c.name} className="rounded-xl p-5" style={{ background: 'var(--bg2)', border: '1px solid var(--border)' }}>
            <div className="font-display font-semibold text-sm mb-1" style={{ color: 'var(--text)' }}>{c.name}</div>
            <div className="text-xs font-mono mb-2" style={{ color: 'var(--accent)' }}>{c.use}</div>
            <p className="text-xs leading-relaxed" style={{ color: 'var(--muted)', fontFamily: 'Lora, serif' }}>{c.desc}</p>
          </div>
        ))}
      </div>

      <h2 id="bronze-to-silver">Bronze → Silver notebook</h2>
      <p>
        This is the most common Databricks notebook you&apos;ll write. It reads raw data from Bronze, applies data quality rules, transforms column types, adds audit columns, and writes clean data to Silver as a Delta table. Notice the ADF parameter at the top — ADF passes the run_date when it triggers this notebook.
      </p>
      <CodeBlock code={bronzeToSilverCode} language="python" filename="bronze_to_silver.py" />

      <h2 id="silver-to-gold">Silver → Gold notebook</h2>
      <p>
        The Gold layer is where you aggregate data into business-ready summaries. This notebook creates two Gold tables from the Silver sales data — a daily sales summary and customer lifetime value. These are the tables that analysts query directly from Synapse Analytics.
      </p>
      <CodeBlock code={silverToGoldCode} language="python" filename="silver_to_gold.py" />

      <h2 id="delta-lake">Delta Lake — what makes Databricks special</h2>
      <p>
        Delta Lake is an open-source storage layer that adds reliability to your data lake. It stores data as Parquet files but wraps them with a transaction log that enables ACID transactions, schema enforcement, time travel, and efficient upserts. Every production Azure data pipeline uses Delta Lake — it is the standard.
      </p>
      <CodeBlock code={deltaCode} language="python" filename="delta_operations.py" />

      <Callout type="warning">
        Run OPTIMIZE weekly and VACUUM monthly on your Delta tables in production. Without OPTIMIZE, thousands of small files accumulate over time and queries become progressively slower. This is one of the most common performance issues in production Databricks environments.
      </Callout>

      <KeyTakeaways items={[
        'Databricks is managed Apache Spark on Azure — write PySpark notebooks, run them at scale without managing infrastructure',
        'Use Job Clusters for production ADF-triggered runs (cheaper, auto-terminates). All-Purpose clusters for development only',
        'The Bronze→Silver notebook is the most common pattern: read raw, validate, transform, write Delta',
        'Always accept ADF parameters via dbutils.widgets — this makes notebooks reusable for any date range',
        'Delta Lake adds ACID transactions, time travel, and MERGE (upsert) on top of Parquet — use it for all production tables',
        'Run OPTIMIZE regularly to compact small files — this is critical for query performance at scale',
        'dbutils.notebook.exit() returns a value to ADF so the pipeline can log the result of each notebook run',
      ]} />
    </LearnLayout>
  )
}