import { LearnLayout } from '@/components/content/LearnLayout'
import { Callout } from '@/components/content/Callout'
import { CodeBlock } from '@/components/content/CodeBlock'
import { KeyTakeaways } from '@/components/content/KeyTakeaways'

export const metadata = { title: 'Amazon Athena' }

const createTableCode = `-- Create an external table pointing at S3 Parquet files
-- Athena never moves the data — it queries S3 directly
-- You only pay for bytes scanned

CREATE EXTERNAL TABLE sales_silver (
    order_id       STRING,
    customer_id    STRING,
    product_id     STRING,
    region         STRING,
    revenue        DOUBLE,
    order_date     DATE,
    load_ts        TIMESTAMP
)
PARTITIONED BY (year INT, month INT, day INT)   -- partition pruning
STORED AS PARQUET                               -- columnar format = less data scanned
LOCATION 's3://your-bucket/silver/sales/'
TBLPROPERTIES ('parquet.compress' = 'SNAPPY');

-- After creating the table, load partition metadata
-- Without this, Athena cannot find the partitions
MSCK REPAIR TABLE sales_silver;

-- Now query it — only partitions matching the WHERE clause are scanned
SELECT
    region,
    SUM(revenue)    AS total_revenue,
    COUNT(order_id) AS total_orders
FROM sales_silver
WHERE year = 2025 AND month = 3
GROUP BY region
ORDER BY total_revenue DESC;`

const iceBergCode = `-- Athena natively supports Apache Iceberg tables
-- Iceberg adds ACID transactions, upserts, and time travel on S3

-- Create an Iceberg table (no external keyword — Athena manages metadata)
CREATE TABLE sales_iceberg (
    order_id    STRING,
    customer_id STRING,
    revenue     DOUBLE,
    order_date  DATE,
    region      STRING
)
PARTITIONED BY (region)
LOCATION 's3://your-bucket/iceberg/sales/'
TBLPROPERTIES ('table_type' = 'ICEBERG');

-- MERGE — upsert support (not available on plain Parquet tables)
MERGE INTO sales_iceberg AS target
USING new_sales AS source
ON target.order_id = source.order_id
WHEN MATCHED THEN
    UPDATE SET revenue = source.revenue, region = source.region
WHEN NOT MATCHED THEN
    INSERT (order_id, customer_id, revenue, order_date, region)
    VALUES (source.order_id, source.customer_id, source.revenue, source.order_date, source.region);

-- Time travel — query data as it was yesterday
SELECT * FROM sales_iceberg
FOR TIMESTAMP AS OF (CURRENT_TIMESTAMP - INTERVAL '1' DAY);`

const optimizeCode = `-- Cost optimization: Athena charges $5 per TB scanned
-- These practices reduce cost by 90%+

-- BAD: scans all columns in all partitions
SELECT * FROM sales_silver;

-- GOOD: partition filter + column selection
-- Only reads March 2025 data, only 3 columns
SELECT order_date, region, revenue
FROM sales_silver
WHERE year = 2025 AND month = 3;

-- Convert CSV to Parquet (10x less data scanned)
-- Run once — all future queries on the Parquet table are 10x cheaper
CREATE TABLE sales_parquet
WITH (
    format = 'PARQUET',
    parquet_compression = 'SNAPPY',
    partitioned_by = ARRAY['year', 'month', 'day'],
    external_location = 's3://your-bucket/silver/sales_parquet/'
)
AS SELECT *, year(order_date) AS year, month(order_date) AS month, day(order_date) AS day
FROM sales_csv_raw;

-- Check query cost before running — use EXPLAIN
EXPLAIN SELECT region, SUM(revenue) FROM sales_silver WHERE year = 2025;`

const pythonCode = `# Run Athena queries from Python — boto3
# pip install boto3

import boto3
import time
import pandas as pd

athena = boto3.client('athena', region_name='us-east-1')

def run_query(sql: str, database: str, output_bucket: str) -> pd.DataFrame:
    # Start query execution
    response = athena.start_query_execution(
        QueryString=sql,
        QueryExecutionContext={'Database': database},
        ResultConfiguration={
            'OutputLocation': f's3://{output_bucket}/athena-results/'
        }
    )
    query_id = response['QueryExecutionId']

    # Poll until complete
    while True:
        status = athena.get_query_execution(QueryExecutionId=query_id)
        state  = status['QueryExecution']['Status']['State']
        if state in ('SUCCEEDED', 'FAILED', 'CANCELLED'):
            break
        time.sleep(1)

    if state != 'SUCCEEDED':
        raise Exception(f"Query failed: {status['QueryExecution']['Status']['StateChangeReason']}")

    # Fetch results as DataFrame
    results = athena.get_query_results(QueryExecutionId=query_id)
    cols = [c['Label'] for c in results['ResultSet']['ResultSetMetadata']['ColumnInfo']]
    rows = [[field.get('VarCharValue', '') for field in row['Data']]
            for row in results['ResultSet']['Rows'][1:]]  # skip header row
    return pd.DataFrame(rows, columns=cols)

# Use it
df = run_query(
    sql="SELECT region, SUM(revenue) AS total FROM sales_silver WHERE year=2025 AND month=3 GROUP BY region",
    database="analytics",
    output_bucket="your-results-bucket"
)
print(df.head())`

const concepts = [
  { term: 'Serverless',      color: '#ff9900', desc: 'No cluster to provision. Athena spins up compute on demand and tears it down after your query. You pay per query, not per hour.' },
  { term: 'Pay per scan',    color: '#ff9900', desc: '$5 per terabyte of data scanned. Partition pruning and Parquet format reduce scanned data by 90%+ — this directly reduces your bill.' },
  { term: 'Glue Catalog',    color: '#00c2ff', desc: 'Athena uses the AWS Glue Data Catalog as its schema registry. Tables defined in Glue are immediately queryable in Athena.' },
  { term: 'Iceberg support', color: '#00e676', desc: 'Native Apache Iceberg support for ACID transactions, MERGE statements, and time travel — turning S3 into a proper transactional data lake.' },
  { term: 'Federated Query', color: '#7b61ff', desc: 'Query data in RDS, Redshift, DynamoDB, and on-prem databases from Athena SQL — no data movement required.' },
  { term: 'Workgroups',      color: '#f5c542', desc: 'Isolate teams and set query cost limits. A workgroup can limit individual queries to scan at most 1GB — protecting against accidental expensive queries.' },
]

export default function AthenaPage() {
  return (
    <LearnLayout
      title="Amazon Athena"
      description="Athena is AWS serverless SQL query engine. It queries data directly in S3 using standard SQL — no database to set up, no cluster to manage, no data to load. You pay only for the data scanned per query."
      section="Section 03 · AWS Track"
      readTime="13 min read"
      updatedAt="March 2026"
      breadcrumbs={[
        { label: 'AWS Track', href: '/learn/aws/introduction' },
        { label: 'Amazon Athena', href: '/learn/aws/athena' },
      ]}
      prev={{ title: 'Amazon Kinesis', href: '/learn/aws/kinesis' }}
      next={{ title: 'Amazon EMR', href: '/learn/aws/emr' }}
    >
      <h2>What is Amazon Athena?</h2>
      <p>
        Athena lets you run SQL queries directly against files in S3 — CSV, JSON, Parquet, ORC, Avro. There is no database to set up, no ETL to load data, no cluster to manage. You point Athena at an S3 path, define a schema, and start querying.
      </p>
      <p>
        The pricing model is what makes Athena unique: you pay $5 per terabyte of data scanned. Use Parquet with partition pruning and most queries cost fractions of a cent. SELECT * on a 10TB CSV table costs $50 per run. Format and partitioning decisions have direct financial consequences.
      </p>

      <Callout type="info" label="Athena vs Redshift">
        Athena is for ad-hoc queries on S3 data — no loading, no maintenance, pay per query. Redshift is for sustained, high-concurrency analytical workloads with consistent performance. Use Athena for exploration and infrequent queries. Use Redshift for dashboards and reports that run constantly.
      </Callout>

      <h2>Core Concepts</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 my-6">
        {concepts.map(c => (
          <div key={c.term} className="p-4 rounded-xl" style={{ background: 'var(--surface)', border: `1px solid ${c.color}30` }}>
            <div className="text-xs font-mono font-bold mb-1" style={{ color: c.color }}>{c.term}</div>
            <p className="text-sm" style={{ color: 'var(--text2)' }}>{c.desc}</p>
          </div>
        ))}
      </div>

      <h2>Creating Tables and Querying S3</h2>
      <p>
        Athena tables are metadata only — they define the schema and S3 location. The data stays in S3. Run <code>MSCK REPAIR TABLE</code> after adding new partitions so Athena can find them.
      </p>
      <CodeBlock code={createTableCode} language="sql" filename="create_athena_table.sql" />

      <h2>Apache Iceberg Tables in Athena</h2>
      <p>
        Plain Parquet tables on S3 are read-only — you cannot update or delete rows. Iceberg tables add ACID transactions, MERGE statements, and time travel. AWS has made Iceberg a first-class citizen in Athena.
      </p>
      <CodeBlock code={iceBergCode} language="sql" filename="athena_iceberg.sql" />

      <h2>Cost Optimization</h2>
      <p>
        The biggest Athena cost lever is data scanned per query. These three practices reduce costs by 90% or more.
      </p>
      <CodeBlock code={optimizeCode} language="sql" filename="athena_optimization.sql" />

      <Callout type="tip" label="Always convert CSV to Parquet">
        A 100GB CSV table costs $0.50 per full scan. The same data as Parquet with partitioning costs $0.005 for a typical filtered query — 100x cheaper. Converting to Parquet is a one-time cost that pays back immediately.
      </Callout>

      <h2>Running Athena Queries from Python</h2>
      <CodeBlock code={pythonCode} language="python" filename="athena_boto3.py" />

      <h2>Athena in a Data Lake Pipeline</h2>
      <div className="my-6 p-5 rounded-xl font-mono text-sm" style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}>
        <div className="flex flex-wrap items-center gap-2" style={{ color: 'var(--text2)' }}>
          <span className="px-3 py-1 rounded" style={{ background: '#ff990015', color: '#ff9900' }}>S3 (Parquet + partitioned)</span>
          <span style={{ color: 'var(--muted)' }}>→</span>
          <span className="px-3 py-1 rounded" style={{ background: '#00c2ff15', color: '#00c2ff' }}>Glue Catalog (schema)</span>
          <span style={{ color: 'var(--muted)' }}>→</span>
          <span className="px-3 py-1 rounded" style={{ background: '#7b61ff15', color: '#7b61ff' }}>Athena (SQL queries)</span>
          <span style={{ color: 'var(--muted)' }}>→</span>
          <span className="px-3 py-1 rounded" style={{ background: '#00e67615', color: '#00e676' }}>QuickSight / Tableau</span>
        </div>
      </div>

      <KeyTakeaways items={[
        'Athena queries S3 directly — no cluster, no data loading, pay per terabyte scanned',
        'Parquet + partitioning reduces query cost by 90%+ compared to CSV without partitions',
        'MSCK REPAIR TABLE must be run after adding new partitions to make them visible',
        'Iceberg tables add MERGE, DELETE, UPDATE and time travel to S3 data',
        'Use Workgroups to set per-query scan limits and prevent accidental expensive queries',
        'Athena uses the Glue Data Catalog — tables defined in Glue are immediately queryable',
      ]} />
    </LearnLayout>
  )
}