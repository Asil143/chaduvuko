import { LearnLayout } from '@/components/content/LearnLayout'
import { CodeBlock } from '@/components/content/CodeBlock'

export const metadata = { title: 'Python for Data Engineers — Asil' }

export default function PythonPage() {
  return (
    <LearnLayout
      title="Python for Data Engineers"
      description="You do not need to be a software engineer. You need to write clear, working Python that reads data, transforms it, handles errors, and connects to cloud services."
      section="Foundations"
      readTime="20 min"
      updatedAt="March 2026"
      breadcrumbs={[
        { label: 'Foundations', href: '/learn/roadmap' },
        { label: 'Python for Data Engineers', href: '/learn/foundations/python' },
      ]}
    >
      <h2>What Python is actually used for in data engineering</h2>
      <p>You will use Python for four things in almost every data engineering role:</p>
      <ul>
        <li>Writing PySpark transformation code (runs on Databricks or EMR)</li>
        <li>Data quality validation scripts (check nulls, ranges, duplicates)</li>
        <li>Utility scripts (move files, call APIs, send alerts)</li>
        <li>Glue code that connects cloud services together</li>
      </ul>
      <p>
        You do not need Django, Flask, async programming, or advanced software engineering patterns.
        You need clean, readable Python that does exactly what it says.
      </p>

      <h2>Reading and writing files — the basics that come up daily</h2>
      <CodeBlock language="python" filename="file_basics.py" code={`import pandas as pd
from pathlib import Path

df = pd.read_csv('sales_raw.csv')
print(df.shape)           # rows and columns
print(df.dtypes)          # column types
print(df.isnull().sum())  # null counts per column

# Parquet is what you deal with in production
df = pd.read_parquet('sales.parquet')

# Always prefer Parquet over CSV for pipelines
df.to_parquet('output/sales_clean.parquet', index=False)

# Safe path handling that works on Windows and Linux
data_dir = Path('data') / 'bronze' / '2025-03-01'
data_dir.mkdir(parents=True, exist_ok=True)`} />

      <h2>Data cleaning with pandas</h2>
      <p>This is what the Silver layer transformation looks like before you scale it to Spark.</p>
      <CodeBlock language="python" filename="data_cleaning.py" code={`import pandas as pd

df = pd.read_csv('sales_raw.csv')

# Step 1 — drop rows where critical columns are null
df = df.dropna(subset=['order_id', 'customer_id', 'amount'])

# Step 2 — remove duplicates
before = len(df)
df = df.drop_duplicates(subset=['order_id'])
print(f"Removed {before - len(df)} duplicates")

# Step 3 — fix types
df['order_date'] = pd.to_datetime(df['order_date'])
df['amount'] = pd.to_numeric(df['amount'], errors='coerce')

# Step 4 — filter invalid values
df = df[df['amount'] > 0]
df = df[df['quantity'] >= 1]

# Step 5 — standardize text
df['region'] = df['region'].str.strip().str.upper()

# Step 6 — add computed columns
df['gross_amount'] = df['quantity'] * df['unit_price']
df['load_date'] = pd.Timestamp.now().date()

df.to_parquet('silver/orders_clean.parquet', index=False)
print(f"Final row count: {len(df)}")`} />

      <h2>PySpark — the same ideas at scale</h2>
      <p>
        Pandas runs on your laptop and handles millions of rows.
        PySpark runs on a cluster and handles billions. Same concepts, different API.
      </p>
      <CodeBlock language="python" filename="pyspark_basics.py" code={`from pyspark.sql import SparkSession
from pyspark.sql import functions as F

spark = SparkSession.builder.appName("SalesTransformation").getOrCreate()

# Read from ADLS Gen2
df = spark.read.parquet("abfss://bronze@yourstore.dfs.core.windows.net/sales/")

# Same cleaning steps as pandas — different syntax
df = df.dropna(subset=["order_id", "customer_id", "amount"])
df = df.dropDuplicates(["order_id"])
df = df.filter(F.col("amount") > 0)
df = df.withColumn("gross_amount", F.col("quantity") * F.col("unit_price"))
df = df.withColumn("load_date", F.current_date())
df = df.withColumn("region", F.upper(F.trim(F.col("region"))))

# Write to Silver as Delta Lake, partitioned by date
df.write \
  .format("delta") \
  .mode("overwrite") \
  .partitionBy("order_date") \
  .save("abfss://silver@yourstore.dfs.core.windows.net/orders/")`} />

      <h2>Error handling — what separates scripts from production code</h2>
      <p>
        Production pipelines run unattended at 2am. When something breaks you need a clear error message,
        not a cryptic traceback.
      </p>
      <CodeBlock language="python" filename="error_handling.py" code={`import logging

logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

def process_sales_file(file_path: str, run_date: str) -> int:
    logger.info(f"Starting {run_date}: {file_path}")
    try:
        df = pd.read_csv(file_path)
        logger.info(f"Loaded {len(df)} rows")

        initial = len(df)
        df = df.dropna(subset=['order_id', 'amount'])
        df = df.drop_duplicates(subset=['order_id'])
        df = df[df['amount'] > 0]
        logger.info(f"Removed {initial - len(df)} invalid rows, {len(df)} remaining")

        if len(df) == 0:
            raise ValueError(f"All rows invalid for {run_date} — check source data")

        output = f"silver/orders/date={run_date}/orders.parquet"
        df.to_parquet(output, index=False)
        logger.info(f"Written to {output}")
        return len(df)

    except FileNotFoundError:
        logger.error(f"File not found: {file_path}")
        raise
    except ValueError as e:
        logger.error(f"Validation failed: {e}")
        raise`} />

      <h2>The pipeline pattern every senior engineer uses</h2>
      <p>
        Every good pipeline script follows this structure. Extract in one function.
        Transform in another. Load in a third. Main wires them together.
        Arguments come from the command line so you can run it for any date without touching the code.
      </p>
      <CodeBlock language="python" filename="pipeline_pattern.py" code={`import logging
import argparse
import pandas as pd

logger = logging.getLogger(__name__)

def extract(run_date: str):
    path = f"data/bronze/{run_date}/sales.csv"
    logger.info(f"Reading {path}")
    return pd.read_csv(path)

def transform(df):
    df = df.dropna(subset=['order_id', 'amount'])
    df = df.drop_duplicates(subset=['order_id'])
    df = df[df['amount'] > 0]
    df['gross_amount'] = df['quantity'] * df['unit_price']
    return df

def load(df, run_date: str):
    path = f"data/silver/{run_date}/orders.parquet"
    df.to_parquet(path, index=False)
    logger.info(f"Written {len(df)} rows to {path}")

def main(run_date: str):
    logging.basicConfig(level=logging.INFO, format="%(asctime)s %(message)s")
    raw = extract(run_date)
    clean = transform(raw)
    load(clean, run_date)
    logger.info("Done")

if __name__ == "__main__":
    parser = argparse.ArgumentParser()
    parser.add_argument("--run-date", required=True)
    args = parser.parse_args()
    main(args.run_date)`} />
    </LearnLayout>
  )
}