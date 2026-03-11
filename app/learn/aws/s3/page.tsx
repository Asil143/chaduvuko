import { LearnLayout } from '@/components/content/LearnLayout'
import { CodeBlock } from '@/components/content/CodeBlock'

export const metadata = { title: 'Amazon S3 — AWS Data Lake Storage — Asil' }

export default function S3Page() {
  return (
    <LearnLayout
      title="Amazon S3 — Your Data Lake on AWS"
      description="S3 is the foundation of every AWS data engineering stack. Every pipeline reads from it, writes to it, or both. Once you understand S3 well, everything else on AWS makes more sense."
      section="AWS Track"
      readTime="14 min"
      updatedAt="March 2026"
      breadcrumbs={[
        { label: 'AWS', href: '/learn/aws/introduction' },
        { label: 'Amazon S3', href: '/learn/aws/s3' },
      ]}
    >
      <h2>What S3 is — and what it is not</h2>
      <p>
        S3 is object storage. Not a file system, not a database, not a block device. An object is any file — CSV, Parquet, JSON, image, video — stored with a key that looks like a file path but is not really one.
      </p>
      <p>
        The key difference from ADLS Gen2 is that S3 does not have a true hierarchical namespace by default. A path like <code>s3://mybucket/bronze/sales/2025-03-01/sales.csv</code> is just a key with slashes in the name — there is no actual folder called bronze. This matters when you do rename operations or list large directories — it can be slower than ADLS.
      </p>
      <p>
        AWS added S3 Tables in 2024 which brings native Iceberg support to S3 with a proper catalog. For new projects targeting AWS, S3 Tables is worth understanding.
      </p>

      <h2>Bucket structure for a Medallion Architecture</h2>
      <CodeBlock language="text" filename="S3 bucket layout" code={`# Option 1: One bucket, prefix-based layers (common for smaller setups)
s3://company-datalake/
├── bronze/
│   └── sales/year=2025/month=03/day=01/sales.csv
├── silver/
│   └── orders/year=2025/month=03/day=01/part-0000.parquet
└── gold/
    ├── daily_sales_summary/
    └── customer_ltv/

# Option 2: One bucket per layer (better access control isolation)
s3://company-bronze/
s3://company-silver/
s3://company-gold/`} />
      <p>
        Option 2 is cleaner for access control — you can give Glue jobs read/write access to bronze and silver, but analysts only get read access to gold. With option 1 you need to use prefix-level policies which are more complex.
      </p>

      <h2>Reading and writing S3 in Python</h2>
      <CodeBlock language="python" filename="s3_boto3.py" code={`import boto3
import pandas as pd
from io import BytesIO

# boto3 is the AWS Python SDK — install with: pip install boto3
s3 = boto3.client('s3')

# Download a file and read it as a DataFrame
response = s3.get_object(Bucket='company-bronze', Key='sales/2025-03-01/sales.csv')
df = pd.read_csv(BytesIO(response['Body'].read()))
print(f"Loaded {len(df)} rows")

# Upload a processed DataFrame to S3
buffer = BytesIO()
df.to_parquet(buffer, index=False)
buffer.seek(0)
s3.put_object(
    Bucket='company-silver',
    Key='orders/2025-03-01/orders.parquet',
    Body=buffer.getvalue()
)
print("Uploaded to silver")

# List files with a specific prefix (like listing a folder)
paginator = s3.get_paginator('list_objects_v2')
for page in paginator.paginate(Bucket='company-bronze', Prefix='sales/2025-03-'):
    for obj in page.get('Contents', []):
        print(obj['Key'], obj['Size'])`} />

      <h2>Reading S3 from PySpark (in AWS Glue or EMR)</h2>
      <CodeBlock language="python" filename="s3_pyspark.py" code={`# In a Glue job or EMR notebook, the Spark context is already configured
# You just use the s3:// URI directly

df = spark.read.parquet("s3://company-bronze/sales/year=2025/month=03/")

df_clean = df.dropna(subset=["order_id", "amount"])

df_clean.write \
  .format("delta") \
  .mode("overwrite") \
  .partitionBy("order_date") \
  .save("s3://company-silver/orders/")`} />

      <h2>IAM — how access control works on AWS</h2>
      <p>
        On AWS, access is controlled by IAM (Identity and Access Management). Every service that touches S3 — Glue, Lambda, EMR, Athena — needs an IAM role with explicit permissions.
      </p>
      <p>
        The key principle is least privilege: give each service only the access it actually needs. A Glue job that reads from bronze and writes to silver should have read-only on the bronze bucket and read-write on silver. Nothing else.
      </p>
      <CodeBlock language="json" filename="glue_s3_policy.json" code={`{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": ["s3:GetObject", "s3:ListBucket"],
      "Resource": [
        "arn:aws:s3:::company-bronze",
        "arn:aws:s3:::company-bronze/*"
      ]
    },
    {
      "Effect": "Allow",
      "Action": ["s3:GetObject", "s3:PutObject", "s3:DeleteObject", "s3:ListBucket"],
      "Resource": [
        "arn:aws:s3:::company-silver",
        "arn:aws:s3:::company-silver/*"
      ]
    }
  ]
}`} />

      <h2>S3 storage classes — how to cut costs</h2>
      <p>
        S3 has several storage classes at different price points. For a data lake, the practical ones are:
      </p>
      <p>
        <strong>S3 Standard</strong> — full price, fast access. Use for Silver and Gold that analysts query regularly.
      </p>
      <p>
        <strong>S3 Standard-IA (Infrequent Access)</strong> — 40% cheaper than Standard. Use for Bronze data older than 30 days. Slightly higher retrieval cost but most Bronze data is never read after initial processing.
      </p>
      <p>
        <strong>S3 Glacier Instant Retrieval</strong> — 68% cheaper than Standard. Use for Bronze data older than 90 days that you keep for compliance but almost never touch.
      </p>
      <p>
        Set this up with S3 Lifecycle Rules — the same concept as ADLS lifecycle management. You define rules like "move objects in bronze/ to IA after 30 days, Glacier after 90 days" and AWS handles it automatically.
      </p>
    </LearnLayout>
  )
}