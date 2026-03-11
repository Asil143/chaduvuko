import { LearnLayout } from '@/components/content/LearnLayout'
import { CodeBlock } from '@/components/content/CodeBlock'

export const metadata = { title: 'Azure Synapse Analytics — Asil' }

export default function SynapsePage() {
  return (
    <LearnLayout
      title="Azure Synapse Analytics"
      description="Synapse is the SQL layer at the top of your Azure data stack. Analysts use it to query your Gold layer. It also has its own Spark pools, pipelines, and workspace — but its main job in a Medallion Architecture is giving analysts a familiar SQL interface to well-structured data."
      section="Azure Track"
      readTime="14 min"
      updatedAt="March 2026"
      breadcrumbs={[
        { label: 'Azure', href: '/learn/azure/introduction' },
        { label: 'Azure Synapse', href: '/learn/azure/synapse' },
      ]}
    >
      <h2>What Synapse actually is</h2>
      <p>
        Synapse is Microsoft's answer to the question: "How do analysts query the data lake?"
      </p>
      <p>
        You store data in ADLS Gen2 as Delta Lake or Parquet files. Those files are not directly queryable with regular SQL. Synapse creates a SQL layer on top — it reads the files and presents them as tables that analysts can query with standard SQL Server-compatible syntax.
      </p>
      <p>
        Think of it as a bridge between the data lake and the people who need to use the data.
      </p>

      <h2>Two query engines — know the difference</h2>
      <p>
        Synapse has two ways to run SQL queries. They are very different and mixing them up is a common mistake.
      </p>
      <p>
        <strong>Serverless SQL Pool</strong> — query files directly without loading them into a database. You write SQL, Synapse reads the Parquet or Delta files from ADLS and returns results. You pay per terabyte scanned. Best for ad-hoc exploration and external tables over the Gold layer.
      </p>
      <p>
        <strong>Dedicated SQL Pool</strong> — a provisioned data warehouse. You load data into it and it stores data in its own columnar format. Much faster for repeated queries. You pay by the hour whether you are using it or not. Best for high-concurrency dashboards.
      </p>
      <p>
        For Project 1 and most entry-level roles, you will use the Serverless SQL Pool. It is simpler and there is nothing to provision.
      </p>

      <h2>Creating external tables over your Gold layer</h2>
      <p>
        An external table in Synapse points to files in ADLS. When analysts query it, Synapse reads the underlying files. The data stays in ADLS — Synapse just adds a SQL interface on top.
      </p>
      <CodeBlock language="sql" filename="create_external_tables.sql" code={`-- Step 1: Create a data source pointing to your storage account
CREATE EXTERNAL DATA SOURCE GoldLayer
WITH (
    LOCATION = 'https://yourcompanydatalake.dfs.core.windows.net/gold',
    CREDENTIAL = SasOrManagedIdentityCredential
)

-- Step 2: Create file format for Parquet
CREATE EXTERNAL FILE FORMAT ParquetFormat
WITH (FORMAT_TYPE = PARQUET)

-- Step 3: Create external table over your Gold daily_sales_summary
CREATE EXTERNAL TABLE gold.daily_sales_summary (
    order_date        DATE,
    region            VARCHAR(100),
    total_revenue     DECIMAL(18,2),
    total_orders      INT,
    avg_order_value   DECIMAL(18,2)
)
WITH (
    LOCATION = 'daily_sales_summary/',
    DATA_SOURCE = GoldLayer,
    FILE_FORMAT = ParquetFormat
)

-- Analysts now query it exactly like a normal table
SELECT region, SUM(total_revenue) as revenue
FROM gold.daily_sales_summary
WHERE order_date >= '2025-01-01'
GROUP BY region
ORDER BY revenue DESC`} />

      <h2>Querying Delta Lake tables directly</h2>
      <p>
        Synapse Serverless can read Delta Lake tables using the OPENROWSET function. This is useful when you want to query Silver or Gold Delta tables without first creating external tables.
      </p>
      <CodeBlock language="sql" filename="query_delta.sql" code={`-- Read a Delta Lake table directly (no external table needed)
SELECT *
FROM OPENROWSET(
    BULK 'https://yourcompanydatalake.dfs.core.windows.net/gold/daily_sales_summary/',
    FORMAT = 'DELTA'
) AS result
WHERE order_date = '2025-03-01'

-- This is useful for one-off exploration
-- For production queries used by dashboards, create external tables instead`} />

      <h2>Connecting Power BI to Synapse</h2>
      <p>
        This is the step that closes the loop — your pipeline runs, Gold layer updates, analysts open Power BI and see the latest numbers.
      </p>
      <p>
        In Power BI Desktop: Get Data → Azure → Azure Synapse Analytics SQL. Enter your Serverless SQL Pool endpoint (find it in Synapse Workspace → Properties). Connect to the gold schema and select your tables.
      </p>
      <p>
        Set Power BI to DirectQuery mode if analysts need live data. Import mode if they need faster dashboards and hourly refresh is acceptable.
      </p>

      <h2>What Synapse is not good for</h2>
      <p>
        Do not use Synapse to transform data. Transformation belongs in Databricks where you have Spark and Delta Lake MERGE operations. Synapse is for reading and querying the final output.
      </p>
      <p>
        Do not use Synapse Dedicated SQL Pool for ad-hoc exploration by a small team. The hourly cost adds up even when nobody is using it. Serverless SQL Pool has no idle cost — you only pay when queries run.
      </p>
      <p>
        This is the most common Synapse mistake in entry-level projects: provisioning a Dedicated SQL Pool, forgetting about it, and ending up with a $200 Azure bill for a portfolio project.
      </p>
    </LearnLayout>
  )
}