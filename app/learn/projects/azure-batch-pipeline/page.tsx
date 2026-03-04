import { LearnLayout } from '@/components/content/LearnLayout'
import { Callout } from '@/components/content/Callout'
import { CodeBlock } from '@/components/content/CodeBlock'
import { KeyTakeaways } from '@/components/content/KeyTakeaways'

export const metadata = { title: 'Project 1: Retail Sales Batch Pipeline — Azure' }

const dataGenCode = `# generate_sales_data.py — run locally to create test data
import pandas as pd
import random
from datetime import datetime, timedelta

products  = ['Laptop','Mouse','Keyboard','Monitor','Headset','Webcam','Desk','Chair']
regions   = ['North','South','East','West','Central']
customers = [f'CUST-{i:04d}' for i in range(1, 201)]

rows = []
base_date = datetime(2025, 1, 1)
for i in range(5000):
    order_date = base_date + timedelta(days=random.randint(0, 89))
    unit_price = round(random.uniform(10, 1500), 2)
    quantity   = random.randint(1, 10)
    discount   = round(random.choice([0, 0, 0, 0.05, 0.10, 0.15]), 2)
    rows.append({
        'order_id':    f'ORD-{i+1:06d}',
        'customer_id': random.choice(customers),
        'order_date':  order_date.strftime('%Y-%m-%d'),
        'product':     random.choice(products),
        'region':      random.choice(regions),
        'quantity':    quantity,
        'unit_price':  unit_price,
        'discount':    discount,
        'status':      random.choice(['completed','completed','completed','returned','pending'])
    })

df = pd.DataFrame(rows)
df.loc[df.sample(frac=0.02).index, 'order_id'] = None  # 2% null order_ids
df.loc[df.sample(frac=0.01).index, 'quantity'] = -1    # 1% negative quantities
df = pd.concat([df, df.sample(50)])                     # 50 duplicate rows
df.to_csv('sales_raw.csv', index=False)
print(f"Generated {len(df)} rows with intentional quality issues")`

const bronzeToSilverCode = `# Databricks Notebook: bronze_to_silver.py
import sys
from pyspark.sql import SparkSession
from pyspark.sql import functions as F
from pyspark.sql.types import IntegerType, DoubleType

dbutils.widgets.text("run_date", "2025-01-01")
run_date = dbutils.widgets.get("run_date")

spark = SparkSession.builder.appName("BronzeToSilver").getOrCreate()

STORAGE = "yourstorageaccount"
BRONZE  = f"abfss://bronze@{STORAGE}.dfs.core.windows.net/sales/{run_date}/"
SILVER  = f"abfss://silver@{STORAGE}.dfs.core.windows.net/sales/"

df_raw = spark.read.option("header", True).csv(BRONZE)
print(f"Bronze row count: {df_raw.count()}")

df_clean = (df_raw
  .filter(F.col("order_id").isNotNull())
  .filter(F.col("quantity").cast("int") > 0)
  .dropDuplicates(["order_id"])
  .withColumn("order_date",   F.to_date("order_date", "yyyy-MM-dd"))
  .withColumn("quantity",     F.col("quantity").cast(IntegerType()))
  .withColumn("unit_price",   F.col("unit_price").cast(DoubleType()))
  .withColumn("discount",     F.coalesce(F.col("discount").cast(DoubleType()), F.lit(0.0)))
  .withColumn("gross_amount", F.col("unit_price") * F.col("quantity"))
  .withColumn("net_amount",   F.col("gross_amount") * (1 - F.col("discount")))
  .withColumn("region",       F.upper(F.trim(F.col("region"))))
  .withColumn("_load_date",   F.lit(run_date))
  .withColumn("_load_ts",     F.current_timestamp())
  .filter(F.col("status") != "returned")
)

print(f"Clean row count: {df_clean.count()}")

df_clean.write.format("delta").mode("append").partitionBy("order_date").save(SILVER)
print(f"Written to Silver: {SILVER}")
dbutils.notebook.exit(str(df_clean.count()))`

const silverToGoldCode = `# Databricks Notebook: silver_to_gold.py
from pyspark.sql import functions as F
from pyspark.sql.window import Window

spark = SparkSession.builder.appName("SilverToGold").getOrCreate()
STORAGE = "yourstorageaccount"
SILVER  = f"abfss://silver@{STORAGE}.dfs.core.windows.net/sales/"
GOLD    = f"abfss://gold@{STORAGE}.dfs.core.windows.net/"

df = spark.read.format("delta").load(SILVER)

# Gold Table 1 — Daily Sales Summary
daily = (df
  .groupBy("order_date", "region", "product")
  .agg(
    F.sum("net_amount").alias("total_revenue"),
    F.count("order_id").alias("order_count"),
    F.avg("net_amount").alias("avg_order_value"),
    F.countDistinct("customer_id").alias("unique_customers"),
    F.sum("quantity").alias("units_sold"),
  )
  .withColumn("revenue_rank",
    F.rank().over(Window.partitionBy("order_date").orderBy(F.desc("total_revenue")))
  )
)
daily.write.format("delta").mode("overwrite").save(f"{GOLD}daily_sales_summary/")

# Gold Table 2 — Customer Lifetime Value
clv = (df
  .groupBy("customer_id")
  .agg(
    F.sum("net_amount").alias("lifetime_value"),
    F.count("order_id").alias("total_orders"),
    F.min("order_date").alias("first_order"),
    F.max("order_date").alias("last_order"),
    F.avg("net_amount").alias("avg_order_value"),
  )
  .withColumn("customer_tier",
    F.when(F.col("lifetime_value") > 10000, "Platinum")
     .when(F.col("lifetime_value") > 5000,  "Gold")
     .when(F.col("lifetime_value") > 1000,  "Silver")
     .otherwise("Bronze")
  )
)
clv.write.format("delta").mode("overwrite").save(f"{GOLD}customer_ltv/")

# Gold Table 3 — Regional Performance
regional = (df
  .groupBy("region")
  .agg(
    F.sum("net_amount").alias("total_revenue"),
    F.count("order_id").alias("orders"),
    F.countDistinct("customer_id").alias("customers"),
  )
  .orderBy(F.desc("total_revenue"))
)
regional.write.format("delta").mode("overwrite").save(f"{GOLD}regional_performance/")

print("Gold layer refreshed — 3 tables written")
dbutils.notebook.exit("success")`

const synapseCode = `-- Azure Synapse: create external tables over Gold Delta files
CREATE EXTERNAL DATA SOURCE GoldStorage
WITH (
    LOCATION = 'abfss://gold@yourstorageaccount.dfs.core.windows.net/',
    CREDENTIAL = [StorageCredential]
);

CREATE EXTERNAL FILE FORMAT DeltaFormat WITH (FORMAT_TYPE = DELTA);

CREATE EXTERNAL TABLE sales.daily_summary (
    order_date       DATE,
    region           NVARCHAR(50),
    product          NVARCHAR(200),
    total_revenue    FLOAT,
    order_count      INT,
    avg_order_value  FLOAT,
    unique_customers INT,
    units_sold       INT,
    revenue_rank     INT
)
WITH (
    LOCATION = 'daily_sales_summary/',
    DATA_SOURCE = GoldStorage,
    FILE_FORMAT = DeltaFormat
);

-- Validate
SELECT region, SUM(total_revenue) AS total, COUNT(*) AS days
FROM sales.daily_summary
GROUP BY region
ORDER BY total DESC;`

const buildSteps = [
  { num: '01', title: 'Generate test data', desc: 'Run generate_sales_data.py locally to create a realistic sales CSV with intentional data quality issues.' },
  { num: '02', title: 'Create Azure resources', desc: 'Create a Resource Group, then inside it: Storage Account (ADLS Gen2), Databricks workspace, ADF instance, and Synapse workspace.' },
  { num: '03', title: 'Set up ADLS Gen2', desc: 'Create three containers: bronze, silver, gold. Upload sales_raw.csv to bronze/sales/2025-01-01/.' },
  { num: '04', title: 'Upload Databricks notebooks', desc: 'Import bronze_to_silver.py and silver_to_gold.py into your Databricks workspace under /Shared/.' },
  { num: '05', title: 'Build ADF pipeline', desc: 'Create Linked Services for ADLS Gen2 and Databricks. Build a pipeline with two chained Databricks Notebook activities.' },
  { num: '06', title: 'Run and validate', desc: 'Trigger the ADF pipeline manually. Check the Monitor tab for status. Query Synapse to validate Gold layer data.' },
]

export default function Project1Page() {
  return (
    <LearnLayout
      title="Project 1: Retail Sales Batch Pipeline"
      description="Build a complete end-to-end Medallion Architecture pipeline on Azure from scratch. Raw sales CSV files land in ADLS Gen2 Bronze, Databricks cleans and transforms to Silver and Gold, Synapse Analytics serves the results."
      section="Section 05 · Projects"
      readTime="45 min build"
      updatedAt="March 2025"
      breadcrumbs={[
        { label: 'Projects', href: '/learn/projects' },
        { label: 'Project 1: Azure Batch Pipeline', href: '/learn/projects/azure-batch-pipeline' },
      ]}
    >
      <Callout type="azure">
        This project uses only the Azure Portal UI — no CLI required. You will need a free Azure account. Budget: approximately $2–5 in credits if you delete all resources after completing it.
      </Callout>

      <h2 id="architecture">Architecture overview</h2>
      <p>
        This project implements the Medallion Architecture on Azure. Sales CSV files arrive in the Bronze layer of ADLS Gen2. Azure Data Factory triggers two Databricks notebooks in sequence — the first cleans data into Silver, the second aggregates into three Gold tables. Azure Synapse Analytics serves the Gold data as external SQL tables.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 my-6">
        {[
          { layer: 'Bronze', icon: '🥉', color: '#cd7f32', desc: 'Raw CSV files exactly as received. Never modified. Partitioned by date in ADLS Gen2.' },
          { layer: 'Silver', icon: '🥈', color: '#c0c0c0', desc: 'Cleaned Delta Lake table. Nulls removed, duplicates dropped, types corrected.' },
          { layer: 'Gold', icon: '🥇', color: '#f5c542', desc: 'Three aggregated Delta tables: daily summary, customer LTV, regional performance.' },
        ].map(l => (
          <div key={l.layer} className="rounded-xl p-4 text-center" style={{ background: 'var(--bg3)', border: `1px solid ${l.color}30` }}>
            <div className="text-2xl mb-1">{l.icon}</div>
            <div className="font-display font-bold text-sm mb-1.5" style={{ color: l.color }}>{l.layer} Layer</div>
            <p className="text-xs leading-relaxed" style={{ color: 'var(--text2)', fontFamily: 'Lora, serif' }}>{l.desc}</p>
          </div>
        ))}
      </div>

      <h2 id="steps">Build steps</h2>
      <div className="space-y-3 my-6">
        {buildSteps.map(step => (
          <div key={step.num} className="flex gap-4 p-4 rounded-xl" style={{ background: 'var(--bg2)', border: '1px solid var(--border)' }}>
            <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-mono font-bold flex-shrink-0"
              style={{ background: 'var(--accent-glow)', border: '1px solid var(--accent)', color: 'var(--accent)' }}>
              {step.num}
            </div>
            <div>
              <div className="font-display font-semibold text-sm mb-0.5" style={{ color: 'var(--text)' }}>{step.title}</div>
              <p className="text-xs leading-relaxed" style={{ color: 'var(--muted)', fontFamily: 'Lora, serif' }}>{step.desc}</p>
            </div>
          </div>
        ))}
      </div>

      <h2 id="generate-data">Step 1 — Generate test data</h2>
      <CodeBlock code={dataGenCode} language="python" filename="generate_sales_data.py" />

      <h2 id="bronze-silver">Step 4 — Bronze to Silver notebook</h2>
      <CodeBlock code={bronzeToSilverCode} language="python" filename="bronze_to_silver.py" />

      <h2 id="silver-gold">Step 4b — Silver to Gold notebook</h2>
      <CodeBlock code={silverToGoldCode} language="python" filename="silver_to_gold.py" />

      <h2 id="synapse">Step 6 — Query Gold data in Synapse</h2>
      <CodeBlock code={synapseCode} language="sql" filename="synapse_external_tables.sql" />

      <Callout type="tip">
        Delete all Azure resources when done to avoid ongoing charges. Put everything in one Resource Group and delete the whole group — it removes everything in one click.
      </Callout>

      <KeyTakeaways items={[
        'This project covers the complete Azure workflow: ADLS Gen2, ADF, Databricks, Synapse — end to end',
        'Bronze stores raw CSV files unchanged — always keep exactly what arrived from the source',
        'Silver transformation: remove nulls, drop duplicates, cast types, add audit columns, filter bad status',
        'Gold produces three business-ready Delta tables analysts can query directly from Synapse',
        'ADF chains notebooks using dependsOn — Silver only runs after Bronze succeeds',
        'Delete the Resource Group when done — this project costs $2–5 if cleaned up promptly',
      ]} />
    </LearnLayout>
  )
}