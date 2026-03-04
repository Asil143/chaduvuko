import { LearnLayout } from '@/components/content/LearnLayout'
import { CodeBlock } from '@/components/content/CodeBlock'

export const metadata = { title: 'Amazon Redshift — Asil' }

export default function RedshiftPage() {
  return (
    <LearnLayout
      title="Amazon Redshift — Cloud Data Warehouse on AWS"
      description="Redshift is AWS's cloud data warehouse. It is where large-scale analytical queries live — the kind that scan billions of rows, aggregate across years of data, and need to return results in seconds rather than hours."
      section="AWS Track"
      readTime="13 min"
      updatedAt="March 2025"
      breadcrumbs={[
        { label: 'AWS', href: '/learn/aws/introduction' },
        { label: 'Amazon Redshift', href: '/learn/aws/redshift' },
      ]}
    >
      <h2>What Redshift actually is</h2>
      <p>
        Redshift is a columnar database designed for analytical queries on large datasets. Unlike a regular database like PostgreSQL which stores data row by row, Redshift stores data column by column.
      </p>
      <p>
        Why does column storage matter? Because analytical queries almost always scan one or two columns across millions of rows — not all columns. Columnar storage means Redshift only reads the columns your query touches, making aggregation queries dramatically faster.
      </p>
      <p>
        It also compresses each column independently using the best compression algorithm for that data type. A column of integers compresses differently than a column of timestamps.
      </p>

      <h2>Redshift Serverless vs Provisioned — which to use</h2>
      <p>
        Redshift Serverless launched in 2022 and changed the calculus. Before it, you had to provision a cluster and pay for it 24/7 whether or not you were running queries.
      </p>
      <p>
        <strong>Serverless</strong> — scales automatically, you pay per RPU-second (only when queries run), no cluster to manage. Best for variable workloads and development. For a portfolio project or a startup, use this.
      </p>
      <p>
        <strong>Provisioned</strong> — fixed cluster size, you pay hourly, predictable cost, better for steady high-concurrency workloads. Large enterprises with analysts running queries all day often prefer this for cost predictability.
      </p>

      <h2>Loading data into Redshift from S3</h2>
      <p>
        The standard pattern is COPY from S3. Redshift reads the files in parallel — one reader per slice — making it much faster than inserting rows one at a time.
      </p>
      <CodeBlock language="sql" filename="copy_from_s3.sql" code={`-- Load Parquet files from S3 into a Redshift table
-- The IAM role must have S3 read access
COPY gold.daily_sales_summary
FROM 's3://company-gold/daily_sales_summary/'
IAM_ROLE 'arn:aws:iam::123456789:role/RedshiftS3ReadRole'
FORMAT AS PARQUET

-- Check what was loaded
SELECT COUNT(*) FROM gold.daily_sales_summary

-- If something went wrong, check the load errors
SELECT * FROM sys_load_error_detail ORDER BY start_time DESC LIMIT 20`} />

      <h2>Distribution keys and sort keys — the two things that make Redshift fast</h2>
      <p>
        Redshift distributes data across multiple nodes. When a query joins two tables, if both tables have the same rows on the same node, the join is fast. If not, data has to be shuffled across the network — slow.
      </p>
      <p>
        A distribution key controls which node each row lives on. A sort key controls the order rows are stored on disk, which speeds up range queries.
      </p>
      <CodeBlock language="sql" filename="table_design.sql" code={`-- Good table design: choose DISTKEY and SORTKEY carefully
CREATE TABLE gold.orders (
    order_id        VARCHAR(50),
    customer_id     VARCHAR(50),
    order_date      DATE,
    region          VARCHAR(100),
    amount          DECIMAL(18,2),
    product_category VARCHAR(100)
)
DISTKEY (customer_id)   -- rows with same customer_id land on same node → fast customer joins
SORTKEY (order_date)    -- rows sorted by date → fast date range queries

-- EVEN distribution: spread rows evenly, no joins on a common key
CREATE TABLE dim.date_dimension (
    date_id     INT,
    full_date   DATE,
    year        INT,
    month       INT,
    quarter     INT
)
DISTSTYLE EVEN  -- dimension tables are usually small, EVEN is fine`} />

      <h2>Redshift Spectrum — query S3 directly without loading</h2>
      <p>
        Redshift Spectrum lets you query files sitting in S3 from inside Redshift without loading them first. You create an external schema using the Glue Catalog and query as if the data was a regular Redshift table.
      </p>
      <CodeBlock language="sql" filename="spectrum.sql" code={`-- Create an external schema pointing to Glue Catalog
CREATE EXTERNAL SCHEMA silver_ext
FROM DATA CATALOG
DATABASE 'silver_db'
IAM_ROLE 'arn:aws:iam::123456789:role/RedshiftSpectrumRole'
CREATE EXTERNAL DATABASE IF NOT EXISTS

-- Now query S3 data directly from Redshift
-- This joins a Redshift table (loaded) with S3 data (not loaded)
SELECT
    r.order_id,
    r.amount,
    e.customer_name
FROM gold.orders r
JOIN silver_ext.customers e ON r.customer_id = e.customer_id
WHERE r.order_date = '2025-03-01'`} />

      <h2>The most common Redshift performance problem</h2>
      <p>
        Bad distribution keys causing data skew. If you choose a column where most rows have the same value (like a status column with 90% of rows as "completed"), those rows all land on one node and that node does all the work while the others sit idle.
      </p>
      <p>
        Check for skew by querying <code>svv_table_info</code> and looking at the skew_rows column. A value above 1.5 means one node has significantly more data than the others. The fix is to change your distribution key to a higher-cardinality column.
      </p>
      <p>
        For most fact tables, customer ID or order ID are good distribution keys. For dimension tables smaller than a few hundred MB, use DISTSTYLE ALL — Redshift copies the whole table to every node, eliminating cross-node joins entirely.
      </p>
    </LearnLayout>
  )
}