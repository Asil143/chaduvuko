import { LearnLayout } from '@/components/content/LearnLayout'
import { Callout } from '@/components/content/Callout'
import { CodeBlock } from '@/components/content/CodeBlock'
import { KeyTakeaways } from '@/components/content/KeyTakeaways'

export const metadata = { title: 'Microsoft Fabric' }

const lakehouseCode = `# Microsoft Fabric Lakehouse — PySpark notebook inside Fabric
# The notebook runs on Fabric Spark Runtime (same as Databricks)
# No cluster configuration needed — Fabric manages compute automatically

import pyspark.sql.functions as F
from pyspark.sql.types import *
from datetime import datetime

# In Fabric, you reference your Lakehouse files directly
# The Files/ section = raw storage (like ADLS Gen2 bronze layer)
# The Tables/ section = managed Delta Lake tables

# Read raw CSV from Lakehouse Files section (Bronze)
df_raw = spark.read \
    .option("header", True) \
    .option("inferSchema", True) \
    .csv("Files/bronze/sales/2025/03/15/sales_raw.csv")

print(f"Raw rows: {df_raw.count()}")

# Clean and transform (Silver logic)
df_silver = df_raw \
    .filter(F.col("order_id").isNotNull()) \
    .dropDuplicates(["order_id"]) \
    .withColumn("revenue",    F.col("revenue").cast(DoubleType())) \
    .withColumn("order_date", F.to_date(F.col("order_date"), "yyyy-MM-dd")) \
    .withColumn("load_ts",    F.lit(datetime.utcnow().isoformat()))

# Write to Lakehouse Tables section as Delta (Silver)
# This creates a table immediately queryable in SQL analytics endpoint
df_silver.write \
    .format("delta") \
    .mode("overwrite") \
    .saveAsTable("silver_sales")   # appears in Fabric SQL endpoint automatically

print("Written to silver_sales Delta table")`

const warehouseCode = `-- Microsoft Fabric Warehouse — T-SQL analytics
-- Fabric Warehouse is a full SQL engine on top of OneLake
-- Query Delta tables from Lakehouse directly — no data movement

-- Create Gold aggregation table in the Warehouse
CREATE TABLE gold_daily_revenue AS
SELECT
    order_date,
    region,
    product_category,
    COUNT(DISTINCT order_id)   AS total_orders,
    SUM(revenue)               AS total_revenue,
    AVG(revenue)               AS avg_order_value,
    COUNT(DISTINCT customer_id) AS unique_customers
FROM silver_sales          -- references Lakehouse Delta table via OneLake shortcut
GROUP BY order_date, region, product_category;

-- Cross-database query — Warehouse queries Lakehouse table directly
-- No COPY INTO, no ETL, no data movement
-- Both sit on the same OneLake storage

-- Create a view for Power BI (semantic layer)
CREATE VIEW vw_revenue_summary AS
SELECT
    order_date,
    region,
    SUM(total_revenue)  AS revenue,
    SUM(total_orders)   AS orders
FROM gold_daily_revenue
WHERE order_date >= DATEADD(month, -3, GETDATE())
GROUP BY order_date, region;`

const pipelineCode = `// Microsoft Fabric Data Pipeline — same as ADF, built into Fabric
// No separate ADF resource needed — pipelines live inside Fabric workspace

// Example: Copy Activity to ingest CSV from HTTP source into Lakehouse
{
  "name": "PL_Ingest_Sales_Daily",
  "activities": [
    {
      "name": "Copy_Sales_CSV",
      "type": "Copy",
      "source": {
        "type": "HttpSource",
        "requestMethod": "GET"
      },
      "sink": {
        "type": "LakehouseTableSink",
        "tableActionOption": "Append",
        "lakehouseTableName": "bronze_sales_raw"
      }
    },
    {
      "name": "Run_Notebook_Transform",
      "type": "TridentNotebook",
      "dependsOn": [{ "activity": "Copy_Sales_CSV", "dependencyConditions": ["Succeeded"] }],
      "typeProperties": {
        "notebookId": "your-notebook-id",
        "workspaceId": "your-workspace-id"
      }
    }
  ]
}`

const components = [
  { name: 'Lakehouse',       icon: '🏠', color: '#0078d4', desc: 'Combines a Delta Lake file store with a SQL analytics endpoint. Store raw and processed data as Delta tables. Query with SQL or Spark.' },
  { name: 'Warehouse',       icon: '🏢', color: '#7b61ff', desc: 'A full T-SQL data warehouse on OneLake. Same SQL syntax as Synapse. Ideal for business analysts and Power BI semantic layers.' },
  { name: 'Data Pipeline',   icon: '🔄', color: '#00c2ff', desc: 'Built-in orchestration — same visual pipeline builder as ADF. No separate ADF resource needed. Triggers, activities, linked services all inside Fabric.' },
  { name: 'Notebook',        icon: '📓', color: '#f5c542', desc: 'PySpark and SQL notebooks running on managed Spark compute. Same code as Databricks notebooks. No cluster config needed.' },
  { name: 'Power BI',        icon: '📊', color: '#f2c811', desc: 'Native inside Fabric workspace. Reports connect directly to Lakehouse or Warehouse — no data export, no gateway, real-time refresh.' },
  { name: 'Eventstream',     icon: '⚡', color: '#00e676', desc: 'Real-time event processing. Ingest from Event Hubs, transform in-flight, land in Lakehouse. No-code streaming pipeline builder.' },
  { name: 'OneLake',         icon: '☁️', color: '#0078d4', desc: 'The unified storage layer under everything. All Fabric workloads read and write to OneLake. One copy of data — no movement between services.' },
  { name: 'Data Activator',  icon: '🔔', color: '#ff6b6b', desc: 'Real-time alerting on streaming data. Define conditions on event streams and trigger actions (email, Teams message, Power Automate) when they are met.' },
]

const vsTraditional = [
  { task: 'Ingest raw data',         traditional: 'ADF Copy Activity → ADLS Gen2',                 fabric: 'Data Pipeline Copy Activity → Lakehouse Files' },
  { task: 'Transform data',          traditional: 'Databricks notebook on ADLS',                    fabric: 'Fabric Notebook on Lakehouse Tables' },
  { task: 'Serve analytics',         traditional: 'Synapse Analytics dedicated pool',               fabric: 'Fabric Warehouse or Lakehouse SQL endpoint' },
  { task: 'Build reports',           traditional: 'Power BI desktop → publish → refresh gateway',   fabric: 'Power BI inside Fabric workspace — live connection' },
  { task: 'Store secrets',           traditional: 'Azure Key Vault separate resource',              fabric: 'Key Vault still used (Fabric workspace secrets coming)' },
  { task: 'Real-time ingestion',     traditional: 'Event Hubs → Stream Analytics → ADLS',           fabric: 'Eventstream → Lakehouse (no-code)' },
]

export default function MicrosoftFabricPage() {
  return (
    <LearnLayout
      title="Microsoft Fabric"
      description="Microsoft Fabric is an all-in-one analytics platform that unifies data engineering, data warehousing, real-time analytics, and business intelligence inside a single product. It replaces the need to stitch together ADF + Databricks + Synapse + Power BI separately."
      section="Section 02 · Azure Track"
      readTime="15 min read"
      updatedAt="March 2025"
      breadcrumbs={[
        { label: 'Azure Track', href: '/learn/azure/introduction' },
        { label: 'Microsoft Fabric', href: '/learn/azure/microsoft-fabric' },
      ]}
      prev={{ title: 'Azure Key Vault', href: '/learn/azure/key-vault' }}
      next={{ title: 'AWS Introduction', href: '/learn/aws/introduction' }}
    >
      <h2>What is Microsoft Fabric?</h2>
      <p>
        Microsoft Fabric is a unified SaaS analytics platform launched in 2023. Instead of creating separate Azure resources for each part of your pipeline — ADF for orchestration, Databricks for processing, Synapse for warehousing, Power BI for reporting — Fabric brings all of them into one workspace with one license and one storage layer called OneLake.
      </p>
      <p>
        Think of it this way: the traditional Azure data stack requires 4-6 separate services that you wire together. Fabric is Microsoft&apos;s answer to that complexity — one platform where a data engineer, analyst, and business user all work in the same environment.
      </p>

      <Callout type="info" title="OneLake — the most important concept">
        OneLake is the foundation of Fabric. It is a single logical data lake shared by every workload in your Fabric tenant. When a Data Pipeline ingests data, a Notebook transforms it, and Power BI reports on it — they are all reading the same OneLake storage. No copies, no movement, no sync.
      </Callout>

      <h2>Fabric Components</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 my-6">
        {components.map(c => (
          <div key={c.name} className="p-4 rounded-xl" style={{ background: 'var(--surface)', border: `1px solid ${c.color}30` }}>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-lg">{c.icon}</span>
              <span className="font-mono text-xs font-bold" style={{ color: c.color }}>{c.name}</span>
            </div>
            <p className="text-xs leading-relaxed" style={{ color: 'var(--text2)' }}>{c.desc}</p>
          </div>
        ))}
      </div>

      <h2>Lakehouse — Data Engineering in Fabric</h2>
      <p>
        The Lakehouse is where data engineers work in Fabric. It has two sections: <strong>Files</strong> (raw storage — like ADLS Gen2) and <strong>Tables</strong> (managed Delta Lake tables). Notebooks transform data from Files into Tables. Once data is in Tables, it is automatically available via the SQL analytics endpoint — no Synapse setup needed.
      </p>
      <CodeBlock code={lakehouseCode} language="python" filename="fabric_lakehouse_notebook.py" />

      <h2>Warehouse — SQL Analytics in Fabric</h2>
      <p>
        The Fabric Warehouse is a full T-SQL engine. The key difference from Synapse: it sits on OneLake, so it can query Lakehouse Delta tables directly without moving data. Write your Gold aggregations in SQL, connect Power BI, done.
      </p>
      <CodeBlock code={warehouseCode} language="sql" filename="fabric_warehouse.sql" />

      <h2>Data Pipeline — Orchestration in Fabric</h2>
      <p>
        Fabric includes a pipeline builder identical to ADF — same visual interface, same Copy Activity, same connectors. No separate ADF resource needed. Pipelines live in your Fabric workspace alongside notebooks and warehouses.
      </p>
      <CodeBlock code={pipelineCode} language="json" filename="fabric_pipeline.json" />

      <h2>Fabric vs Traditional Azure Stack</h2>
      <div className="overflow-x-auto my-6">
        <table className="w-full text-sm" style={{ borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ borderBottom: '2px solid var(--border)' }}>
              {['Task', 'Traditional Azure', 'Microsoft Fabric'].map(h => (
                <th key={h} className="text-left py-3 px-4 text-xs font-mono uppercase" style={{ color: 'var(--muted)' }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {vsTraditional.map((r, i) => (
              <tr key={r.task} style={{ borderBottom: '1px solid var(--border)', background: i % 2 === 0 ? 'var(--surface)' : 'transparent' }}>
                <td className="py-3 px-4 text-xs font-semibold" style={{ color: 'var(--text)' }}>{r.task}</td>
                <td className="py-3 px-4 text-xs" style={{ color: 'var(--text2)' }}>{r.traditional}</td>
                <td className="py-3 px-4 text-xs" style={{ color: '#00e676' }}>{r.fabric}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Callout type="tip" title="Learn the fundamentals first">
        If you already know ADF, Databricks, and Synapse — Fabric takes about a week to learn because the concepts are identical. If you are new to Azure data engineering, learn the traditional stack first. Fabric assumes you understand pipelines, Spark, and SQL warehouses already.
      </Callout>

      <h2>Fabric Licensing — F SKUs</h2>
      <div className="space-y-3 my-6">
        {[
          { sku: 'F2',  cu: '2 Capacity Units',   price: '~$262/month',  use: 'Development and learning' },
          { sku: 'F4',  cu: '4 Capacity Units',   price: '~$524/month',  use: 'Small team production' },
          { sku: 'F8',  cu: '8 Capacity Units',   price: '~$1,048/month',use: 'Medium workloads' },
          { sku: 'F64', cu: '64 Capacity Units',  price: '~$8,384/month',use: 'Enterprise production' },
        ].map(s => (
          <div key={s.sku} className="flex items-center justify-between p-4 rounded-xl" style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}>
            <div>
              <span className="font-mono text-sm font-bold" style={{ color: 'var(--accent)' }}>{s.sku}</span>
              <span className="text-xs ml-3" style={{ color: 'var(--muted)' }}>{s.cu}</span>
            </div>
            <div className="text-right">
              <div className="text-xs font-mono" style={{ color: 'var(--text)' }}>{s.price}</div>
              <div className="text-xs" style={{ color: 'var(--muted)' }}>{s.use}</div>
            </div>
          </div>
        ))}
      </div>

      <Callout type="warning" title="Free trial available">
        Microsoft offers a 60-day free Fabric trial on any Microsoft 365 account. Go to app.fabric.microsoft.com and start a trial — no credit card needed. Enough time to build a full end-to-end pipeline and explore every component.
      </Callout>

      <KeyTakeaways items={[
        'Fabric unifies ADF + Databricks + Synapse + Power BI into one platform with one license',
        'OneLake is the shared storage under everything — no data movement between services',
        'Lakehouse = Files (raw) + Tables (Delta) + SQL endpoint, all in one',
        'Fabric notebooks run PySpark — same code as Databricks, no cluster config needed',
        'Data Pipelines in Fabric are identical to ADF — same visual builder, same connectors',
        'Learn the traditional Azure stack first — Fabric makes more sense once you understand what it is replacing',
      ]} />
    </LearnLayout>
  )
}