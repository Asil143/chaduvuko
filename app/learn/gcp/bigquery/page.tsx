import { LearnLayout } from '@/components/content/LearnLayout'
import { Callout } from '@/components/content/Callout'
import { CodeBlock } from '@/components/content/CodeBlock'
import { KeyTakeaways } from '@/components/content/KeyTakeaways'

export const metadata = { title: 'Google BigQuery' }

const createCode = `-- BigQuery: create a partitioned, clustered table
-- Partitioning + clustering makes queries dramatically cheaper and faster

CREATE TABLE IF NOT EXISTS \`your_project.gold.daily_sales_summary\`
(
  order_date      DATE,
  region          STRING,
  product_category STRING,
  total_revenue   FLOAT64,
  order_count     INT64,
  avg_order_value FLOAT64,
  unique_customers INT64
)
PARTITION BY order_date          -- Only scan partitions matching the date filter
CLUSTER BY region, product_category  -- Sort within partitions for fast aggregations
OPTIONS (
  partition_expiration_days = 365,  -- Auto-delete partitions older than 1 year
  description = 'Gold layer: aggregated daily sales from Dataflow pipeline'
);`

const queryCode = `-- BigQuery: real analytics queries
-- Window functions, CTEs, and aggregations all work exactly as in standard SQL

-- 1. Monthly revenue with month-over-month growth
WITH monthly AS (
  SELECT
    DATE_TRUNC(order_date, MONTH) AS month,
    region,
    SUM(total_revenue) AS monthly_revenue
  FROM \`your_project.gold.daily_sales_summary\`
  WHERE order_date >= DATE_SUB(CURRENT_DATE(), INTERVAL 12 MONTH)
  GROUP BY 1, 2
)
SELECT
  month,
  region,
  monthly_revenue,
  LAG(monthly_revenue) OVER (PARTITION BY region ORDER BY month) AS prev_month,
  ROUND(
    SAFE_DIVIDE(
      monthly_revenue - LAG(monthly_revenue) OVER (PARTITION BY region ORDER BY month),
      LAG(monthly_revenue) OVER (PARTITION BY region ORDER BY month)
    ) * 100, 2
  ) AS mom_growth_pct
FROM monthly
ORDER BY month DESC, monthly_revenue DESC;`

const pythonCode = `# BigQuery Python client — load data from Cloud Storage
from google.cloud import bigquery

client = bigquery.Client(project='your-project-id')

# Load Parquet files from GCS into BigQuery (Gold layer)
job_config = bigquery.LoadJobConfig(
    source_format=bigquery.SourceFormat.PARQUET,
    write_disposition=bigquery.WriteDisposition.WRITE_APPEND,
    time_partitioning=bigquery.TimePartitioning(field='order_date'),
    clustering_fields=['region', 'product_category'],
)

load_job = client.load_table_from_uri(
    'gs://your-bucket/gold/daily_sales_summary/*.parquet',
    'your_project.gold.daily_sales_summary',
    job_config=job_config
)

load_job.result()  # Wait for job to complete
print(f"Loaded {client.get_table('your_project.gold.daily_sales_summary').num_rows} rows")`

export default function BigQueryPage() {
  return (
    <LearnLayout
      title="Google BigQuery"
      description="BigQuery is the crown jewel of GCP — a serverless, massively parallel data warehouse that queries terabytes in seconds. Zero infrastructure to manage, zero tuning required. The most powerful SQL analytics engine in any cloud."
      section="Section 02 · GCP Track"
      readTime="15 min read"
      updatedAt="March 2025"
      breadcrumbs={[
        { label: 'GCP Track', href: '/learn/gcp/introduction' },
        { label: 'Google BigQuery', href: '/learn/gcp/bigquery' },
      ]}
    >
      <h2 id="what-makes-bigquery-special">What makes BigQuery different from every other warehouse</h2>
      <p>
        Every other data warehouse — Redshift, Synapse, Snowflake — requires you to provision compute capacity before you can run queries. You choose a cluster size, pay for it whether you use it or not, and tune it as your workload changes. BigQuery has none of that. You write SQL, Google runs it across thousands of machines automatically, and you pay only for the bytes scanned. When you are done querying, there is nothing running and nothing to pay.
      </p>
      <p>
        This serverless model combined with Google's Dremel query engine — which splits queries across thousands of parallel workers in milliseconds — is why BigQuery can scan terabytes in seconds. It is genuinely unlike anything else in the cloud data warehouse space.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-6">
        {[
          { icon: '⚡', title: 'Serverless', desc: 'Zero infrastructure. Zero cluster sizing. Zero idle cost. Pay only per query based on bytes scanned.' },
          { icon: '🔀', title: 'Massively Parallel', desc: "Google's Dremel engine splits queries across thousands of workers simultaneously. Terabytes in seconds." },
          { icon: '💸', title: 'Columnar Storage', desc: 'Data stored by column, not row. Queries that read 3 columns from a 100-column table only scan those 3 columns.' },
        ].map(item => (
          <div key={item.title} className="rounded-xl p-4 text-center" style={{ background: 'var(--bg2)', border: '1px solid var(--border)' }}>
            <div className="text-2xl mb-2">{item.icon}</div>
            <div className="font-display font-semibold text-sm mb-1.5" style={{ color: 'var(--text)' }}>{item.title}</div>
            <p className="text-xs leading-relaxed" style={{ color: 'var(--muted)', fontFamily: 'Lora, serif' }}>{item.desc}</p>
          </div>
        ))}
      </div>

      <h2 id="partitioning">Partitioning and clustering — the most important optimization</h2>
      <p>
        BigQuery charges per byte scanned. Partitioning divides a table into segments by a column (usually date) so queries only scan relevant partitions. Clustering sorts data within partitions so BigQuery can skip blocks that do not match filter conditions. Together they can reduce query costs by 90% or more on large tables.
      </p>
      <CodeBlock code={createCode} language="sql" filename="create_gold_table.sql" />

      <h2 id="analytics">Writing analytics queries in BigQuery</h2>
      <p>
        BigQuery uses standard SQL with Google extensions. All the window functions, CTEs, and aggregations from the SQL for Data Engineers module work exactly the same way.
      </p>
      <CodeBlock code={queryCode} language="sql" filename="analytics_queries.sql" />

      <h2 id="loading">Loading data from GCS using Python</h2>
      <CodeBlock code={pythonCode} language="python" filename="bigquery_load.py" />

      <Callout type="tip">
        Always partition by date and cluster by your most common filter/group columns. On a 1TB table, a well-partitioned and clustered query can cost 100x less than the same query on an unpartitioned table. This is the single most impactful thing you can do for BigQuery cost management.
      </Callout>

      <KeyTakeaways items={[
        'BigQuery is serverless — zero infrastructure, zero cluster sizing, pay only for bytes scanned per query',
        "Google's Dremel engine splits queries across thousands of parallel workers — terabytes scan in seconds",
        'Always partition tables by date — queries with date filters only scan matching partitions, dramatically cutting costs',
        'Clustering sorts data within partitions — add your most common filter/GROUP BY columns as cluster keys',
        'BigQuery uses standard SQL — window functions, CTEs, and all SQL skills from the Foundations section apply directly',
        'The Python client library loads data from GCS into BigQuery — the standard pattern for Dataflow pipeline output',
      ]} />
    </LearnLayout>
  )
}
