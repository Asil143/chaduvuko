import type { Metadata } from 'next'
import { LearnLayout } from '@/components/content/LearnLayout'
import Link from 'next/link'
import { Callout } from '@/components/content/Callout'
import { KeyTakeaways } from '@/components/content/KeyTakeaways'
import { DEWorkshop, WorkshopCode, WorkshopAnswer } from '@/components/content/DEWorkshop'

export const metadata: Metadata = {
  title: 'Spark Fundamentals with PySpark | Data Engineering | Chaduvuko',
  description: 'Learn how PySpark DataFrames, lazy evaluation, transformations, actions, and the Spark UI fit together in a distributed batch job.',
}

const SectionTag = ({ text }: { text: string }) => (
  <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '.14em', textTransform: 'uppercase', color: 'var(--muted)', fontFamily: 'var(--font-mono)', marginBottom: 10 }}>{text}</div>
)
const SectionTitle = ({ children }: { children: React.ReactNode }) => (
  <h2 style={{ fontSize: 'clamp(20px, 2.5vw, 28px)', fontWeight: 900, letterSpacing: '-1px', color: 'var(--text)', marginBottom: 18, fontFamily: 'var(--font-display)', lineHeight: 1.2 }}>{children}</h2>
)
const SubTitle = ({ children }: { children: React.ReactNode }) => (
  <h3 style={{ fontSize: 'clamp(16px, 1.8vw, 20px)', fontWeight: 700, letterSpacing: '-0.3px', color: 'var(--text)', marginBottom: 12, fontFamily: 'var(--font-display)' }}>{children}</h3>
)
const Para = ({ children }: { children: React.ReactNode }) => (
  <p style={{ fontSize: 15, color: 'var(--text)', lineHeight: 1.9, marginBottom: 20 }}>{children}</p>
)
const CodeBox = ({ children, label }: { children: string; label?: string }) => (
  <div style={{ marginBottom: 20 }}>
    {label && <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--muted)', letterSpacing: '.1em', textTransform: 'uppercase', marginBottom: 6, fontFamily: 'var(--font-mono)' }}>{label}</div>}
    <pre style={{ background: 'var(--bg2)', border: '1px solid var(--border)', borderRadius: 10, padding: '18px 22px', overflowX: 'auto', fontSize: 13, lineHeight: 1.9, color: 'var(--text)', fontFamily: 'var(--font-mono)', margin: 0, whiteSpace: 'pre-wrap' }}><code>{children}</code></pre>
  </div>
)

export default function SparkFundamentalsPySparkModule() {
  return (
    <LearnLayout title="Spark Fundamentals with PySpark" description="Build a mental model of distributed DataFrame processing, lazy evaluation, transformations, actions, and the Spark UI." section="Data Engineering — Lesson 48" readTime="40 min">
      <section style={{ marginBottom: 56 }}>
        <SectionTag text="// Part 01 — From a Python Script to a Distributed Plan" />
        <SectionTitle>Spark Divides Work; It Does Not Make Every Job Faster</SectionTitle>
        <Para>Apache Spark is a distributed data-processing engine. A program describes work over collections that may be too large for one machine, and Spark plans how to execute that work across available compute. PySpark is the Python interface to Spark. The driver process runs your Python application and coordinates the job; executors run tasks against partitions of data. A cluster manager allocates resources, while the Spark scheduler turns the plan into stages and tasks. Depending on the deployment, those pieces can be on one machine for local practice or on a managed cluster.</Para>
        <Para>Imagine a fictional Hyderabad grocery platform that wants yesterday's order totals by city and payment type. A regular Python script might load every record into one process. A Spark job instead reads distributed files, applies filters and projections near the data, groups records, and writes results. Distribution can improve throughput when there is enough data and parallel capacity, but it introduces network movement, serialization, coordination, and operational cost. For a small CSV, a database query or a local script may be simpler and faster.</Para>
        <Para>The useful first question is not “How do I use every Spark API?” It is “What is the data, what result is required, and which work can be pushed to the workers?” A DataFrame lets you state operations in terms of named columns and types. Spark can inspect and optimize a declarative plan, select execution strategies, and avoid moving columns that are not needed. It cannot infer an unclear business definition such as whether a cancelled order is a refund, a reversal, or an excluded row; document that rule in the transformation.</Para>
        <Callout label="Before choosing Spark" type="info">Estimate input size, required latency, available compute, and the cost of operating a distributed job. Spark is a strong fit for large-scale transformations and compatible workloads, not a default replacement for SQL databases, a warehouse, or a small Python task.</Callout>
      </section>

      <section style={{ marginBottom: 56 }}>
        <SectionTag text="// Part 02 — DataFrames, Schemas, and Transformations" />
        <SectionTitle>A DataFrame Is a Plan Over Rows and Columns</SectionTitle>
        <Para>A Spark DataFrame is a distributed, schema-aware collection with named columns. Its schema records column names and data types; nullability and nested structure can also matter. Reading a source with an explicit schema is often safer than guessing types from a sample. A value that looks numeric in the first few rows may later contain a blank, a formatted string, or a larger value. Define the expected contract, decide how malformed records are handled, and validate the source before publishing downstream data.</Para>
        <Para>Transformations describe a new DataFrame from an existing one. Common examples include <code>select</code>, <code>filter</code>, <code>withColumn</code>, <code>dropDuplicates</code>, and <code>groupBy</code> followed by an aggregation. These calls normally construct a logical plan rather than immediately scanning every file and calculating all rows. That delayed execution is called lazy evaluation. It gives Spark a chance to simplify expressions, push filters toward a data source when supported, prune unused columns, and select a physical strategy for the action that eventually requires results.</Para>
        <CodeBox label="Real PySpark — transformations define a plan">{`from pyspark.sql import functions as F

orders = spark.read.parquet("s3a://example/orders/")
valid = (
    orders
    .filter(F.col("order_date") == F.lit("2026-11-08"))
    .filter(F.col("status") == F.lit("PAID"))
    .select("city", "payment_method", "amount_paise")
)
summary = (
    valid.groupBy("city", "payment_method")
    .agg(F.count("*").alias("order_count"),
         F.sum("amount_paise").alias("gross_paise"))
)

# The expressions above describe work; this action requests a result.
summary.show(truncate=False)`}</CodeBox>
        <Para>Keep money in an integer minor unit such as paise, or use a precise decimal type, rather than silently relying on binary floating-point arithmetic. The example uses a fictional date and source path; replace them with a proper date type, parameterized interval, managed credentials, and a validated input contract. A path is not a security boundary: do not embed credentials in code or print sensitive rows in logs.</Para>
        <SubTitle>Actions create execution boundaries</SubTitle>
        <Para>Actions require Spark to produce an observable result or write output. Examples include <code>count</code>, <code>collect</code>, <code>first</code>, <code>show</code>, and supported write operations. An action can trigger one or more jobs; the optimizer may reuse or change work depending on the plan and the output requested. Calling <code>collect()</code> asks the driver to receive all selected rows, so it is dangerous for an unbounded result. Prefer a distributed write, an aggregate, or an explicitly bounded sample. A call to <code>show()</code> is useful for inspection but is not a production data-quality test.</Para>
        <Para>Lazy evaluation does not mean “nothing ever happens until the last line.” Some operations need information or perform work early, and a data source may be inspected while the plan is built. The practical rule is to distinguish plan construction from actions that need results, then inspect the execution details rather than guessing from source-code order. Two separate actions can also recompute the same lineage unless the relevant data is persisted and retained.</Para>
      </section>

      <section style={{ marginBottom: 56 }}>
        <SectionTag text="// Part 03 — Lineage, Partitions, and the Execution Shape" />
        <SectionTitle>Partitions Are the Units Spark Schedules</SectionTitle>
        <Para>At execution time, Spark divides work into tasks. A task generally processes one partition for a stage. Partitions enable parallelism and constrain task granularity; they are not the same thing as business partitions such as a directory named by date. A file can contain multiple row groups or splits, a logical table can be partitioned by a column, and the runtime also has execution partitions. These are related but distinct concepts. Confusing them leads to misleading tuning decisions.</Para>
        <Para>Some transformations can be performed independently within each input partition. Others need records with the same key to meet, as with many aggregations, distinct operations, and joins. Such redistribution usually creates a shuffle boundary between stages. Shuffles move data across executor processes and can involve network, serialization, sorting, and local disk. A seemingly short chain of DataFrame expressions may therefore contain multiple stages and expensive exchanges.</Para>
        <CodeBox label="Use explain to inspect a plan (Spark APIs vary by environment)">{`summary.explain("formatted")

# Read the output for:
# - source scan and pushed filters
# - selected columns and estimated row counts, when available
# - exchanges that indicate data redistribution
# - join and aggregate operators
# Then compare the plan with observed stage metrics.`}</CodeBox>
        <Para>Lineage is the dependency graph of transformations from source to output. It enables Spark to plan execution and, for supported operations and sources, recompute lost partitions after failures. It does not replace durable checkpoints or an application-level recovery plan for every job. If a source file is overwritten while a job is retrying, for example, reproducibility depends on the source's immutability and snapshot behavior. Record input intervals and source versions where possible; use deterministic transformations and make destination writes safe to repeat.</Para>
        <SubTitle>Choose a partition strategy from evidence</SubTitle>
        <Para>Too few partitions can leave executors idle and create long tasks. Too many tiny partitions add scheduling overhead, create small output files, and make metadata handling expensive. A partition's size and complexity matter as much as its count. A large partitioned source may be read in parallel according to file layout and source capabilities, while a later <code>repartition</code> can cause a shuffle. <code>coalesce</code> may reduce partition count with less data movement in some contexts, but it can also reduce parallelism and does not guarantee a balanced result.</Para>
        <Para>File-system directory partitioning is a separate storage-layout decision. Partitioning by a date can help a query that filters on that date, but partitioning by a high-cardinality field such as order ID may create a huge number of directories and tiny files. Do not copy a partition scheme from a sample without measuring query filters, data volume, skew, object-store listing behavior, and the engines that need to read the table.</Para>
      </section>

      <section style={{ marginBottom: 56 }}>
        <SectionTag text="// Part 04 — Reading the Spark UI" />
        <SectionTitle>Use the UI to Turn a Slow Job into a Hypothesis</SectionTitle>
        <Para>The Spark UI exposes application, job, stage, task, storage, and SQL execution details when enabled and retained by the deployment. The exact presentation depends on the runtime. Start with the failed or slow job and follow its stage graph. Find the longest stages, inspect task duration distributions, and compare input and shuffle metrics. A median task that is quick while a few tasks are extremely long suggests a different problem from every task being uniformly slow.</Para>
        <Para>Look at input bytes and records, shuffle read and write, spill to memory or disk, garbage-collection time where available, task retries, executor loss, and output counts. A large shuffle points toward a wide dependency such as a join or group-by. Spill can indicate that per-task working sets exceed available execution memory or that the plan is doing more work than expected. A single slow task can signal skew, an oversized partition, a slow external source, or a failing machine. These clues are evidence, not a diagnosis by themselves.</Para>
        <Para>Trace the UI's SQL or query details back to the source code and data contract. Did a filter get pushed down? Did the job scan every historical partition when it needed only yesterday's data? Did a join unexpectedly multiply rows because a supposedly unique key is duplicated? Is a Python UDF preventing optimization or adding serialization cost? Compare input and output row counts, check key uniqueness, and verify that the result still matches the business definition after a proposed optimization.</Para>
        <Callout label="A useful investigation note" type="tip">Record the job and stage, input size, longest-task spread, shuffle and spill observations, a specific bottleneck hypothesis, one change, and the before/after result. This turns “add more workers” into a testable engineering decision.</Callout>
        <Para>UI access often contains data-sensitive details: SQL text, paths, query plans, and sometimes example values. Apply the same access controls and retention practices used for pipeline logs. For shared clusters, verify what a learner or operator can see before exposing production identifiers or personal data.</Para>
      </section>

      <section style={{ marginBottom: 56 }}>
        <SectionTag text="// Part 05 — A Practical PySpark Workflow" />
        <SectionTitle>Build a Small, Testable Transformation Before Scaling It</SectionTitle>
        <Para>Begin locally or on a small, representative sample. State the input schema, the time window, the intended grain of the output, and a few invariants. For daily payment settlement, the grain might be one row per business date, city, and payment method. Invariants might include non-negative paid order counts, no duplicate output keys, and totals that reconcile to a trusted source measure. Choose an explicit policy for null cities, invalid amounts, late-arriving records, and refunds rather than allowing a cast or filter to silently decide.</Para>
        <Para>Separate reusable transformation logic from runtime configuration. Let the orchestrator or job parameters supply the interval and destination; keep credentials in the platform's secret mechanism. Write to a staging location or transactional table, validate counts and totals, then publish using a deliberate commit or replacement strategy. A job that fails after writing only some files must not leave a consumer-visible partial partition. The exact safe write method depends on the table format and sink.</Para>
        <Para>Test transformations with small in-memory DataFrames and assertions, including empty input, nulls, duplicate keys, late records, and malformed values. Unit tests can verify business logic; integration tests should cover real file formats, catalog access, and the intended write semantics. Keep a reproducible fixture that does not contain customer-identifying data. A passing test on five rows does not establish that the job is scalable, so separately benchmark representative data sizes and inspect the physical plan.</Para>
        <Para>For India-first practice, use a synthetic set of order or transit records with fictional cities and no real customer identifiers. Avoid treating every calendar day as a UTC day if the business definition is an Indian local business date. Convert timestamp boundaries deliberately, document the timezone, and use half-open intervals to avoid double-processing midnight. Holidays, settlement cut-offs, and delayed source uploads are product rules that should be explicit inputs rather than hidden assumptions in code.</Para>
      </section>

      <DEWorkshop title="Trace a lazy pipeline to the action that runs it" objective="Distinguish a stored transformation plan from the execution triggered by an action, then explain how partition-level work contributes to a result." prerequisites="Python lists and functions, basic filtering and grouping, and the difference between a task plan and a computed result.">
        <p>Work with this fictional, privacy-safe sample of payment rows. The example is a pure-Python simulation so it runs without a Spark installation; it illustrates delayed application of transformations, not Spark's optimizer or executor implementation.</p>
        <WorkshopCode language="python" expectedOutput={"before_action=plan_only\naction=2 rows\npaid_paise=15800"}>{`rows = [
    ("Hyderabad", "PAID", 12500),
    ("Vijayawada", "FAILED", 4000),
    ("Hyderabad", "PAID", 3300),
    ("Chennai", "PAID", 900),
]

# Store transformations as functions; do not run them while building the plan.
plan = [
    lambda batch: [row for row in batch if row[1] == "PAID"],
    lambda batch: [row for row in batch if row[2] >= 1000],
]
print("before_action=plan_only")

# This line represents an action: materialise the result for this simulation.
result = rows
for transform in plan:
    result = transform(result)
print(f"action={len(result)} rows")
print(f"paid_paise={sum(row[2] for row in result)}")`}</WorkshopCode>
        <p>Map the sequence to a DataFrame: reading and selecting columns builds a plan, filtering is a transformation, and an aggregate or write is an action. In Spark, the physical plan may combine or reorder compatible work; the simulation deliberately keeps the steps simple so their intent is visible.</p>
        <h3>Practice: explain the Spark UI evidence</h3>
        <p>A daily summary scans the entire month, the job has one stage with modest input and another with heavy shuffle, and a few tasks run much longer than their peers. What would you inspect before changing executor counts?</p>
        <WorkshopAnswer>
          <p>First verify that the requested date predicate matches the source column type and that partition pruning or filter pushdown is actually present in the plan. Then inspect the exchange, join or aggregate keys, shuffle read distribution, spill, and task input sizes. Compare key frequencies to identify skew, confirm that a join key has the expected cardinality, and check whether one large file or partition dominates. Measure the input and output counts against the business contract.</p>
          <p>Make one targeted change at a time: correct the date filter, adjust a justified repartition strategy, reduce unnecessary columns, or treat a skewed key explicitly. Re-run on representative data and compare stage metrics and result checks. Adding executors cannot fix a scan that reads unnecessary history, a hot key that remains concentrated, or an incorrect join that multiplies rows.</p>
        </WorkshopAnswer>
        <p>Reference: <a href="https://spark.apache.org/docs/latest/rdd-programming-guide.html">Spark programming guide</a> and <a href="https://spark.apache.org/docs/latest/web-ui.html">Spark Web UI</a>. Confirm the documentation for the Spark distribution and deployment you actually use.</p>
      </DEWorkshop>

      <KeyTakeaways items={[
        'A PySpark DataFrame is a distributed, schema-aware plan over columns and rows; an API call is not a promise that data has already been computed.',
        'Transformations build a logical dependency plan. Actions such as count, show, collect, and writes request results and can trigger execution.',
        'A driver coordinates; executors run tasks over partitions. Parallelism is useful only when the work and data layout support it.',
        'Shuffles redistribute records and often separate stages. They can cost network, serialization, sorting, disk, and coordination time.',
        'Use explicit schemas, data contracts, safe output publication, and tests for nulls, duplicates, malformed input, and late data.',
        'Use the Spark UI to inspect stage duration, task skew, input, shuffle, spill, retries, and query plans before tuning.',
        'Keep driver-returned results bounded; a full collect can exhaust driver memory even when workers have ample capacity.',
        'Treat Spark UI, plans, logs, and sample rows as potentially sensitive operational data.',
      ]} />

      <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 10, padding: 24, marginTop: 40 }}>
        <p style={{ fontSize: 10, color: 'var(--muted)', letterSpacing: '.12em', textTransform: 'uppercase', fontFamily: 'var(--font-mono)', fontWeight: 700, margin: '0 0 10px' }}>What comes next</p>
        <p style={{ fontSize: 15, color: 'var(--text)', lineHeight: 1.85, margin: '0 0 20px' }}>Lesson 49 applies this execution model to partitions, shuffles, join strategies, skew, adaptive query execution, and caching.</p>
        <Link href="/learn/data-engineering/spark-performance-tuning" style={{ background: '#14b8a6', color: '#000', padding: '11px 24px', borderRadius: 7, fontWeight: 700, fontSize: 13, textDecoration: 'none', display: 'inline-block' }}>Lesson 49 → Spark Performance — Partitions, Shuffles and Joins</Link>
      </div>
    </LearnLayout>
  )
}
