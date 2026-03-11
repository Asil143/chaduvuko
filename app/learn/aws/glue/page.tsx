import { LearnLayout } from '@/components/content/LearnLayout'
import { CodeBlock } from '@/components/content/CodeBlock'

export const metadata = { title: 'AWS Glue — Asil' }

export default function GluePage() {
  return (
    <LearnLayout
      title="AWS Glue — Serverless Spark on AWS"
      description="AWS Glue is the closest thing AWS has to Azure Databricks — a managed environment for running Spark-based data transformations without managing servers. The key difference: Glue is fully serverless, Databricks gives you more control."
      section="AWS Track"
      readTime="16 min"
      updatedAt="March 2026"
      breadcrumbs={[
        { label: 'AWS', href: '/learn/aws/introduction' },
        { label: 'AWS Glue', href: '/learn/aws/glue' },
      ]}
    >
      <h2>What Glue actually does</h2>
      <p>
        Glue runs your Spark transformation code without you managing any servers. You write a Python or Scala script, upload it, tell Glue how many DPUs (data processing units) to use, and it spins up a Spark environment, runs your code, and shuts down.
      </p>
      <p>
        You pay only for the time the job runs. A 10-minute Glue job costs roughly $0.44. You do not pay for idle time the way you do with a running Databricks cluster.
      </p>
      <p>
        The tradeoff: Glue is slower to start (30-60 second startup), has less flexibility than Databricks, and debugging is harder because you cannot interactively run cells. For scheduled batch jobs it works very well.
      </p>

      <h2>Two things Glue does — know both</h2>
      <p>
        Glue has two separate functions that people often confuse.
      </p>
      <p>
        <strong>Glue ETL Jobs</strong> — Spark jobs that you write and Glue runs. This is the transformation engine. You write PySpark, Glue executes it.
      </p>
      <p>
        <strong>Glue Data Catalog</strong> — a metadata store. It records what tables exist, where they live in S3, and what their schema is. Athena, Redshift Spectrum, and EMR all use the Glue Catalog to know what data exists and where.
      </p>
      <p>
        You will use both in every AWS data engineering project. They work together.
      </p>

      <h2>Writing a Glue ETL job</h2>
      <p>
        Glue provides its own wrapper classes (GlueContext, DynamicFrame) on top of Spark. Most engineers use plain PySpark inside Glue — it works fine and is simpler.
      </p>
      <CodeBlock language="python" filename="glue_job.py" code={`import sys
from awsglue.utils import getResolvedOptions
from pyspark.context import SparkContext
from awsglue.context import GlueContext
from awsglue.job import Job
from pyspark.sql import functions as F

# Glue boilerplate — every job starts with this
args = getResolvedOptions(sys.argv, ['JOB_NAME', 'run_date'])
sc = SparkContext()
glueContext = GlueContext(sc)
spark = glueContext.spark_session
job = Job(glueContext)
job.init(args['JOB_NAME'], args)

run_date = args['run_date']  # passed from the Glue trigger or Step Functions

# Read raw data from Bronze S3
df = spark.read.option("header", "true").csv(
    f"s3://company-bronze/sales/date={run_date}/"
)

# Clean and transform (same as you would in Databricks)
df = df.dropna(subset=["order_id", "customer_id", "amount"])
df = df.dropDuplicates(["order_id"])
df = df.filter(F.col("amount").cast("double") > 0)
df = df.withColumn("amount", F.col("amount").cast("double"))
df = df.withColumn("order_date", F.to_date(F.col("order_date"), "yyyy-MM-dd"))
df = df.withColumn("gross_amount", F.col("quantity").cast("int") * F.col("amount"))
df = df.withColumn("processed_at", F.current_timestamp())

# Write to Silver as Parquet with partitioning
df.write \
  .mode("overwrite") \
  .partitionBy("order_date") \
  .parquet("s3://company-silver/orders/")

print(f"Processed {df.count()} records for {run_date}")

# Always commit the job at the end
job.commit()`} />

      <h2>The Glue Data Catalog — making your data queryable</h2>
      <p>
        Once your Glue job writes data to S3, Athena cannot query it until there is a table definition in the Catalog. You create this either by running a Glue Crawler or by defining the table manually.
      </p>
      <CodeBlock language="python" filename="create_catalog_table.py" code={`import boto3

glue = boto3.client('glue', region_name='us-east-1')

# Create a database first (like a schema in SQL)
glue.create_database(
    DatabaseInput={'Name': 'silver_db', 'Description': 'Cleaned data — Silver layer'}
)

# Create a table definition pointing to your S3 data
glue.create_table(
    DatabaseName='silver_db',
    TableInput={
        'Name': 'orders',
        'StorageDescriptor': {
            'Columns': [
                {'Name': 'order_id',     'Type': 'string'},
                {'Name': 'customer_id',  'Type': 'string'},
                {'Name': 'amount',       'Type': 'double'},
                {'Name': 'gross_amount', 'Type': 'double'},
                {'Name': 'status',       'Type': 'string'},
            ],
            'Location': 's3://company-silver/orders/',
            'InputFormat': 'org.apache.hadoop.mapred.TextInputFormat',
            'OutputFormat': 'org.apache.hadoop.hive.ql.io.HiveIgnoreKeyTextOutputFormat',
            'SerdeInfo': {
                'SerializationLibrary': 'org.apache.hadoop.hive.ql.io.parquet.serde.ParquetHiveSerDe'
            },
        },
        'PartitionKeys': [{'Name': 'order_date', 'Type': 'date'}],
        'TableType': 'EXTERNAL_TABLE',
    }
)
print("Table created in Glue Catalog")`} />

      <h2>Querying with Athena after Glue writes the data</h2>
      <p>
        Athena is AWS's serverless SQL query engine. It reads from S3 using the Glue Catalog as a schema registry. Once your table is registered in the Catalog, analysts can query it with standard SQL. You pay per terabyte of data scanned.
      </p>
      <CodeBlock language="sql" filename="athena_query.sql" code={`-- Query the silver orders table from Athena
SELECT
  order_date,
  COUNT(*) as total_orders,
  SUM(gross_amount) as total_revenue,
  AVG(amount) as avg_order_value
FROM silver_db.orders
WHERE order_date >= DATE '2025-01-01'
GROUP BY order_date
ORDER BY order_date

-- Partition pruning: Athena only scans partitions matching the WHERE clause
-- This is why partitioning matters — without it, every query scans everything`} />

      <h2>Glue vs Databricks — when to use which</h2>
      <p>
        If you are on AWS and your transformations are straightforward batch jobs that run on a schedule — Glue is fine and simpler to operate.
      </p>
      <p>
        If you need interactive development, complex multi-step notebooks, Delta Lake with MERGE operations, or you want ML workflows in the same environment — use Databricks on AWS.
      </p>
      <p>
        Many companies run both: Glue for simple scheduled ETL, Databricks for complex transformation logic and data science work.
      </p>
    </LearnLayout>
  )
}