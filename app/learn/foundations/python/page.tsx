import { LearnLayout } from '@/components/content/LearnLayout'
import { Callout } from '@/components/content/Callout'
import { CodeBlock } from '@/components/content/CodeBlock'
import { KeyTakeaways } from '@/components/content/KeyTakeaways'

const pysparkCode = `# PySpark — the most important Python skill for data engineers
# This is what you actually write on the job

from pyspark.sql import SparkSession
from pyspark.sql import functions as F
from pyspark.sql.window import Window

spark = SparkSession.builder.appName("SalesAnalysis").getOrCreate()

# Read Delta table from ADLS Gen2
df = spark.read.format("delta").load(
    "abfss://silver@yourlake.dfs.core.windows.net/sales/"
)

# Data transformations using PySpark
result = (df
    # Filter for current year
    .filter(F.year("order_date") == 2025)
    # Add derived columns
    .withColumn("revenue", F.col("quantity") * F.col("unit_price"))
    .withColumn("discount_amount", F.col("revenue") * F.col("discount_pct"))
    .withColumn("net_revenue", F.col("revenue") - F.col("discount_amount"))
    # Window function — rank products by revenue within each region
    .withColumn("rank_in_region",
        F.rank().over(
            Window.partitionBy("region").orderBy(F.desc("net_revenue"))
        )
    )
    # Group and aggregate
    .groupBy("region", "product_category")
    .agg(
        F.sum("net_revenue").alias("total_revenue"),
        F.count("order_id").alias("order_count"),
        F.avg("net_revenue").alias("avg_order_value"),
        F.countDistinct("customer_id").alias("unique_customers")
    )
    .orderBy(F.desc("total_revenue"))
)

# Write to Gold layer
result.write.format("delta").mode("overwrite").option("overwriteSchema", "true").save(
    "abfss://gold@yourlake.dfs.core.windows.net/regional_performance/"
)

print(f"✅ Wrote {result.count()} rows to Gold layer")`

export const metadata = { title: 'Python for Data Engineers' }

export default function PythonPage() {
  return (
    <LearnLayout
      title="Python for Data Engineers"
      description="Python is the dominant programming language for data engineering. But data engineers don't use Python the same way software developers do — the focus is on pipeline logic, data manipulation, and PySpark."
      section="Section 01 · Foundations"
      readTime="18 min read"
      updatedAt="March 2025"
      breadcrumbs={[
        { label: 'Foundations', href: '/learn/what-is-data-engineering' },
        { label: 'Python for Data Engineers', href: '/learn/foundations/python' },
      ]}
    >

      <h2 id="python-for-de">Python for data engineers is different</h2>
      <p>
        If you come from a software engineering background, your Python instincts are probably right but partially misapplied. Data engineering Python is less about building web apps or APIs and more about: reading and writing files and data streams, transforming datasets using pandas or PySpark, orchestrating workflows, calling APIs and handling authentication, and writing clean, maintainable pipeline code that others can understand months later.
      </p>

      <Callout type="tip">
        You don't need to be a Python expert to be a data engineer. You need to be comfortable with core Python (loops, functions, classes, error handling) and then specifically good at PySpark — which is the Python API for Apache Spark. That's what you'll use 80% of the time.
      </Callout>

      <h2 id="core-skills">Core Python skills for data engineers</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 my-6">
        {[
          { title:'List comprehensions & generators', level:'Must know', desc:'The Pythonic way to transform collections of data efficiently. Appears in almost every data transformation script.' },
          { title:'File I/O and error handling', level:'Must know', desc:'Reading CSVs, JSONs, Parquet files. Try/except blocks, custom exceptions. Pipelines fail — you need to handle that gracefully.' },
          { title:'Working with APIs', level:'Must know', desc:'The requests library, handling JSON responses, pagination, authentication headers. Many data sources are API-based.' },
          { title:'Environment variables & secrets', level:'Must know', desc:'Never hardcode credentials. Use os.environ, Azure Key Vault clients, or managed identity. This is a professional expectation.' },
          { title:'Pandas basics', level:'Should know', desc:'For small datasets and quick exploration. Not for production at scale — that\'s PySpark\'s job. But useful for local development.' },
          { title:'PySpark', level:'Must know deeply', desc:'This is the big one. DataFrames, transformations, aggregations, joins, window functions, reading and writing Delta Lake. Most of this tutorial page is about PySpark.' },
          { title:'Logging & monitoring', level:'Should know', desc:'Python\'s built-in logging module, structured log output. Production pipelines need to emit useful logs so you can debug failures.' },
          { title:'Unit testing with pytest', level:'Should know', desc:'Writing tests for your transformation functions. Senior data engineers test their pipeline logic. It prevents silent data quality bugs.' },
        ].map(c => (
          <div key={c.title} className="rounded-xl p-4" style={{ background: 'var(--bg2)', border: '1px solid var(--border)' }}>
            <div className="flex items-center justify-between mb-1.5 flex-wrap gap-1">
              <span className="font-display font-semibold text-sm" style={{ color: 'var(--text)' }}>{c.title}</span>
              <span className="text-xs font-mono px-2 py-0.5 rounded flex-shrink-0"
                style={{ background: c.level.includes('deeply') ? 'rgba(123,97,255,0.1)' : c.level === 'Must know' ? 'rgba(0,194,255,0.1)' : 'rgba(245,197,66,0.1)', color: c.level.includes('deeply') ? 'var(--accent2)' : c.level === 'Must know' ? 'var(--accent)' : 'var(--gold)' }}>
                {c.level}
              </span>
            </div>
            <p className="text-xs leading-relaxed" style={{ color: 'var(--muted)', fontFamily: 'Lora, serif' }}>{c.desc}</p>
          </div>
        ))}
      </div>

      <h2 id="pyspark">PySpark — the most important thing to learn</h2>
      <p>
        PySpark is the Python API for Apache Spark. When you see job postings for data engineers asking for "PySpark experience," they mean: can you write distributed data transformation code that runs across a cluster of machines, handling datasets that don't fit in memory on a single computer?
      </p>
      <p>
        The core object is the DataFrame — think of it like a pandas DataFrame, but distributed across a cluster and lazy (transformations don't actually run until you call an action like .write() or .count()). Here's a real example of PySpark code you'd write on the job:
      </p>

      <CodeBlock code={pysparkCode} language="python" filename="silver_to_gold.py" />

      <Callout type="example">
        Notice that we chain multiple transformations together using parentheses. This is the standard PySpark style. Each transformation returns a new DataFrame — nothing is modified in place. This is called the "functional" style, and it makes PySpark code very readable once you're used to it.
      </Callout>

      <KeyTakeaways items={[
        'Data engineering Python focuses on pipeline logic, data transformation, and PySpark — not web development or APIs',
        'PySpark (Python API for Apache Spark) is the single most important Python skill for Azure data engineers',
        'PySpark DataFrames are distributed and lazy — transformations don\'t execute until you call an action',
        'Never hardcode credentials in Python scripts — use environment variables, Azure Key Vault, or managed identities',
        'Master the functional chaining style in PySpark — filter, withColumn, groupBy, agg chained together',
        'Window functions in PySpark (F.rank().over(Window.partitionBy(...)...)) are heavily tested in interviews',
      ]} />

    </LearnLayout>
  )
}
