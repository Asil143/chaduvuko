import type { Metadata } from 'next'
import { LearnLayout } from '@/components/content/LearnLayout'
import Link from 'next/link'
import { Callout } from '@/components/content/Callout'
import { KeyTakeaways } from '@/components/content/KeyTakeaways'

export const metadata: Metadata = {
  title: 'Performance Tuning — Spark, SQL, and Pipeline Optimisation | Chaduvuko',
  description:
    'Performance tuning from first principles — Spark execution model, partitioning, shuffles, broadcast joins, predicate pushdown, SQL query planning, incremental strategies, and diagnosing slow pipelines with real production techniques.',
}

const SectionTag = ({ text }: { text: string }) => (
  <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '.14em', textTransform: 'uppercase', color: 'var(--muted)', fontFamily: 'var(--font-mono)', marginBottom: 10 }}>{text}</div>
)
const SectionTitle = ({ children }: { children: React.ReactNode }) => (
  <h2 style={{ fontSize: 'clamp(20px,2.5vw,28px)', fontWeight: 900, letterSpacing: '-1px', color: 'var(--text)', marginBottom: 18, fontFamily: 'var(--font-display)', lineHeight: 1.2 }}>{children}</h2>
)
const SubTitle = ({ children }: { children: React.ReactNode }) => (
  <h3 style={{ fontSize: 'clamp(16px,1.8vw,20px)', fontWeight: 700, letterSpacing: '-0.3px', color: 'var(--text)', marginBottom: 12, fontFamily: 'var(--font-display)' }}>{children}</h3>
)
const SubSubTitle = ({ children }: { children: React.ReactNode }) => (
  <h4 style={{ fontSize: 15, fontWeight: 700, color: 'var(--text)', marginBottom: 10 }}>{children}</h4>
)
const Para = ({ children }: { children: React.ReactNode }) => (
  <p style={{ fontSize: 15, color: 'var(--text)', lineHeight: 1.9, marginBottom: 20 }}>{children}</p>
)
const CodeBox = ({ children, label }: { children: string; label?: string }) => (
  <div style={{ marginBottom: 16 }}>
    {label && <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--muted)', letterSpacing: '.1em', textTransform: 'uppercase', marginBottom: 6, fontFamily: 'var(--font-mono)' }}>{label}</div>}
    <pre style={{ background: 'var(--bg2)', border: '1px solid var(--border)', borderRadius: 10, padding: '18px 22px', overflowX: 'auto', fontSize: 13, lineHeight: 1.9, color: 'var(--text)', fontFamily: 'var(--font-mono)', margin: 0, whiteSpace: 'pre-wrap' }}>
      <code>{children}</code>
    </pre>
  </div>
)
const Output = ({ children }: { children: string }) => (
  <div style={{ marginBottom: 24 }}>
    <div style={{ fontSize: 10, fontWeight: 700, color: 'var(--muted)', letterSpacing: '.1em', textTransform: 'uppercase', marginBottom: 6, fontFamily: 'var(--font-mono)', display: 'flex', alignItems: 'center', gap: 6 }}>
      <span style={{ opacity: 0.6 }}>▸</span> output
    </div>
    <pre style={{ background: 'transparent', border: '1px dashed var(--border)', borderRadius: 10, padding: '14px 22px', overflowX: 'auto', fontSize: 13, lineHeight: 1.8, color: 'var(--muted)', fontFamily: 'var(--font-mono)', margin: 0, whiteSpace: 'pre-wrap' }}>
      <code>{children}</code>
    </pre>
  </div>
)
const Divider = () => <div style={{ borderTop: '1px solid var(--border)', margin: '52px 0' }} />
const HighlightBox = ({ children }: { children: React.ReactNode }) => (
  <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 12, padding: '24px 28px', marginBottom: 24 }}>{children}</div>
)
const TryThis = ({ children }: { children: React.ReactNode }) => (
  <div style={{ background: 'rgba(123,97,255,0.06)', border: '1px solid rgba(123,97,255,0.25)', borderRadius: 10, padding: '16px 20px', marginBottom: 24, display: 'flex', gap: 12, alignItems: 'flex-start' }}>
    <span style={{ fontSize: 16, flexShrink: 0, lineHeight: 1.5 }}>⌨️</span>
    <div>
      <div style={{ fontSize: 10, fontWeight: 700, color: 'var(--accent2)', letterSpacing: '.1em', textTransform: 'uppercase', marginBottom: 6, fontFamily: 'var(--font-mono)' }}>Try this yourself</div>
      <div style={{ fontSize: 14, color: 'var(--text)', lineHeight: 1.75 }}>{children}</div>
    </div>
  </div>
)

export default function PerformanceTuningModule() {
  return (
    <LearnLayout
      title="Performance Tuning — Spark, SQL, and Pipeline Optimisation"
      description="Spark execution model, partitioning, shuffles, broadcast joins, predicate pushdown, SQL query planning, incremental strategies, and diagnosing slow pipelines."
      section="Data Engineering — Module 43"
      readTime="70 min"
      updatedAt="August 2026"
    >

      {/* ── Part 01 — The Performance Mindset ────────────────────────── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 01 — The Performance Mindset" />
        <SectionTitle>Performance Tuning Is Diagnosis First, Optimisation Second</SectionTitle>

        <Para>
          The most common performance mistake is applying optimisations without
          diagnosing the bottleneck. A data engineer who reads &ldquo;use broadcast
          joins for small tables&rdquo; and adds broadcast hints to every join will
          create out-of-memory errors on joins where the &ldquo;small&rdquo; table is actually
          500 MB. Every performance optimisation has a cost and a context. The
          correct approach is always: measure first, identify the bottleneck,
          understand why it is slow, then apply the targeted fix.
        </Para>

        <Para>
          Performance problems in data pipelines fall into four categories.
          I/O bound: too much data is being read from storage. CPU bound: the
          computation itself is expensive (complex aggregations, UDFs, regex).
          Memory bound: data does not fit in executor memory and spills to disk.
          Network bound: shuffles move large amounts of data between nodes.
          The diagnosis determines the fix. Adding more executors to an I/O-bound
          job helps marginally. The real fix is reducing the amount of data read
          via partitioning and predicate pushdown.
        </Para>

        <HighlightBox>
          <div style={{ fontSize: 14, fontWeight: 800, color: 'var(--text)', fontFamily: 'var(--font-display)', marginBottom: 14 }}>
            The four bottleneck types and their primary fixes
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 12 }}>
            {[
              { type: 'I/O Bound', color: '#4285f4', symptom: 'High bytes read, slow stage progress despite low CPU', fix: 'Partition pruning, predicate pushdown, columnar formats, data skipping' },
              { type: 'CPU Bound', color: '#00e676', symptom: 'High CPU utilisation, slow computation per row', fix: 'Vectorised UDFs, avoid Python UDFs in Spark (use SQL/pandas UDFs), parallelism tuning' },
              { type: 'Memory Bound', color: '#f97316', symptom: 'Spill to disk (GBs written to local storage), OOM errors', fix: 'Increase executor memory, reduce partition size, broadcast small tables, avoid skew' },
              { type: 'Network Bound', color: '#7b61ff', symptom: 'Large shuffle read/write, slow shuffle stages', fix: 'Reduce shuffle via partition alignment, broadcast joins, AQE, co-partitioning' },
            ].map((item) => (
              <div key={item.type} style={{ background: 'var(--bg2)', border: `1px solid ${item.color}25`, borderLeft: `3px solid ${item.color}`, borderRadius: 8, padding: '12px 14px' }}>
                <div style={{ fontSize: 12, fontWeight: 800, color: item.color, fontFamily: 'var(--font-display)', marginBottom: 4 }}>{item.type}</div>
                <div style={{ fontSize: 11, color: 'var(--muted)', lineHeight: 1.5, marginBottom: 6 }}>{item.symptom}</div>
                <div style={{ fontSize: 11, color: item.color, fontFamily: 'var(--font-mono)', lineHeight: 1.4 }}>Fix: {item.fix}</div>
              </div>
            ))}
          </div>
        </HighlightBox>

        <TryThis>
          Next time a pipeline runs slow, resist reaching for a fix immediately.
          Open the execution UI first and name which of the four bottleneck
          types you&rsquo;re looking at — Part 02&rsquo;s Spark UI walkthrough and Part 08&rsquo;s
          Real World diagnosis both start from exactly this question.
        </TryThis>
      </section>

      <Divider />

      {/* ── Part 02 — Spark Execution Model ──────────────────────────── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 02 — Spark Execution Model" />
        <SectionTitle>Spark Execution Model — Jobs, Stages, Tasks, and Shuffles</SectionTitle>

        <Para>
          Every Spark performance problem is explainable in terms of the
          execution model. Understanding how Spark turns a DataFrame operation
          into a physical execution plan — stages, tasks, shuffles, and executor
          memory — is what lets you read the Spark UI and know exactly where
          time is going.
        </Para>

        <SubSubTitle>The hierarchy — application, job, stage, task</SubSubTitle>

        <CodeBox label="One action = one job; shuffles create stage boundaries">{`APPLICATION → one SparkContext (or SparkSession)
  JOB → one per action (collect(), count(), write(), show())
    STAGE → one per shuffle boundary
      TASK → one per partition (runs on one executor core)

ONE ACTION = ONE JOB:
  df.write.parquet('/path')    ← triggers one job
  df.count()                   ← triggers another job (separate action)
  df.cache()                   ← does NOT trigger a job — lazy evaluation!
  df.cache().count()           ← triggers a job that materialises + counts`}</CodeBox>

        <CodeBox label="Which transformations cause a shuffle (new stage boundary)">{`SHUFFLE (= new stage boundary):
  groupBy() + agg()    ← rows with same key must go to same partition
  join()               ← rows with same join key must meet on same node
  distinct()           ← duplicates across partitions must compare
  repartition(n)       ← explicit redistribution
  orderBy()            ← global sort requires all data to sort together

NO SHUFFLE (= same stage):
  filter()             ← each partition filtered independently
  select()             ← each partition projected independently
  withColumn()         ← row-level computation per partition
  map() / flatMap()    ← element-level operations
  limit()              ← takes N rows (but beware: final sort may shuffle)

EXAMPLE EXECUTION PLAN:
  df.filter(col('date') == '2026-03-17')   ← Stage 1: filter (no shuffle)
    .join(dim, on='store_id', how='left')  ← Stage 2: join (shuffle!)
    .groupBy('city')                       ← Stage 3: aggregate (shuffle!)
    .agg(sum('revenue'))
    .write.parquet('/gold/daily')          ← triggers all stages
  Spark creates 3 stages. Stage 2 and 3 each wait for the previous
  stage's shuffle to complete.`}</CodeBox>

        <SubSubTitle>Partitions and Adaptive Query Execution</SubSubTitle>

        <CodeBox label="Partition sizing and enabling AQE">{`PARTITIONS — the unit of parallelism:
  One task processes one partition. More partitions = more parallelism
  (up to available cores). Too few: executor cores idle. Too many: shuffle
  and task-scheduling overhead.

  RECOMMENDED PARTITION SIZE: 100-200 MB after reading/filtering
  Total cores in cluster × 2-4 = good default partition count

  Default shuffle partitions: spark.sql.shuffle.partitions = 200
  200 is too low for large datasets, too high for small ones. Tune per job:
    spark.conf.set('spark.sql.shuffle.partitions', '400')

ADAPTIVE QUERY EXECUTION (AQE — Spark 3.0+):
  spark.conf.set('spark.sql.adaptive.enabled', 'true')
  AQE automatically adjusts partition count after each shuffle based on
  actual data sizes. Reduces need for manual tuning. ALWAYS enable in production.`}</CodeBox>

        <SubSubTitle>Reading the Spark UI — finding the bottleneck</SubSubTitle>

        <CodeBox label="Stages tab — the red flags to look for">{`Each row = one stage. Key columns:
  Duration:      total wall-clock time for this stage
  Input:         bytes read from storage (I/O bound if very high)
  Shuffle Read:  bytes read from previous stage's shuffle (network bound)
  Shuffle Write: bytes written to next stage's shuffle (network bound)
  Spill (Mem/Disk): data that didn't fit in memory, written to disk

RED FLAGS:
  Stage takes 30 min, Input = 2 TB → I/O bound, need better partitioning
  Stage has Spill = 50 GB → memory bound, increase executor memory
  Stage has Shuffle Read = 500 GB → network bound, consider broadcast`}</CodeBox>

        <CodeBox label="Tasks and Executors tabs">{`TASKS TAB (inside a stage):
  Duration histogram: should be relatively uniform across tasks.
  ONE TASK IS 10× SLOWER THAN OTHERS → data skew (key imbalance)

EXECUTORS TAB:
  Cores used: should be near max during active stages
  Memory used / total: if consistently > 80% → consider more memory
  Task time vs GC time: if GC > 10% of task time → memory pressure`}</CodeBox>

        <SubSubTitle>Reading the physical plan</SubSubTitle>

        <CodeBox label="df.explain(mode='cost') — a clean plan example">{`== Physical Plan ==
AdaptiveSparkPlan isFinalPlan=false
+- == Current Plan ==
   HashAggregate(keys=[city], functions=[sum(revenue)])
   +- Exchange hashpartitioning(city, 200)    ← SHUFFLE HERE (Stage boundary)
      +- HashAggregate(keys=[city], functions=[partial_sum(revenue)])
         +- BroadcastHashJoin [store_id], [store_id], LeftOuter, ...
            :- Filter (date = 2026-03-17)                   ← no shuffle
            :  +- FileScan parquet (orders) PushedFilters=[date=2026-03-17]
            +- BroadcastExchange HashedRelationBroadcastMode  ← broadcast dim
               +- FileScan parquet (dim_store)`}</CodeBox>

        <Output>{`Reading this plan: FileScan reads orders (filter pushed to the file reader).
BroadcastExchange broadcasts dim_store (small) to all executors.
BroadcastHashJoin: join without shuffle — fast.
Exchange before HashAggregate: one shuffle, for city-level aggregation.
Total: 2 stages, 1 shuffle, 1 broadcast. Clean plan.`}</Output>
      </section>

      <Divider />

      {/* ── Part 03 — Partitioning ────────────────────────────────────── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 03 — Partitioning" />
        <SectionTitle>Partitioning — The Most Impactful Optimisation in Spark</SectionTitle>

        <Para>
          Partitioning is the single most impactful performance lever in Spark.
          The right partition strategy reduces the amount of data read, eliminates
          full-table scans, and aligns data for joins and aggregations without
          shuffles. There are two distinct partitioning concepts in Spark that
          are frequently confused: file system partitioning (how data is organised
          on disk) and in-memory partitioning (how data is distributed across
          executors during computation).
        </Para>

        <SubSubTitle>File partitioning — on disk, at write time</SubSubTitle>

        <CodeBox label="partitionBy() and the resulting directory structure">{`df.write \\
  .partitionBy('order_date', 'store_id') \\
  .parquet('s3://freshcart-lake/silver/orders/')

# Creates:
#   silver/orders/order_date=2026-03-17/store_id=ST001/part-00001.parquet
#   silver/orders/order_date=2026-03-17/store_id=ST002/part-00001.parquet
#   silver/orders/order_date=2026-03-16/store_id=ST001/part-00001.parquet

# BENEFIT — partition pruning at read time:
spark.read.parquet('s3://...') \\
    .filter(col('order_date') == '2026-03-17') \\
    .filter(col('store_id')   == 'ST001')
# → Spark reads ONLY .../order_date=2026-03-17/store_id=ST001/
# → 99% less I/O if data has many dates and stores`}</CodeBox>

        <CodeBox label="Choosing partition columns, and file size within partitions">{`CHOOSING PARTITION COLUMNS:
  ✓ Columns most commonly used in WHERE filters
  ✓ Low-to-medium cardinality (date: 365 values/year — good)
  ✗ High cardinality (customer_id: millions — too many small files)
  ✓ Columns whose values are known at write time (not derived)

FILE SIZE WITHIN PARTITIONS:
  Target: 100-500 MB per file (before compression)
  Too small: millions of tiny files → S3 LIST API overhead → slow reads
  Too large: low parallelism → fewer tasks → underutilised cluster
  Use OPTIMIZE (Delta Lake) to compact small files into target size:
    OPTIMIZE delta.\`s3://freshcart/silver/orders\`
        WHERE order_date >= '2026-03-01';`}</CodeBox>

        <SubSubTitle>In-memory partitioning — during computation</SubSubTitle>

        <CodeBox label="Reducing partition count, and co-partitioning for joins">{`# Read partitioned data — Spark creates one task per file:
df = spark.read.parquet('s3://freshcart/silver/orders/')
df.rdd.getNumPartitions()   # might be 2,000 (one per file)

# Too many small partitions → too much overhead:
df = df.coalesce(200)       # reduce without shuffle (downstream only)

# Repartition by join key — align for co-located joins:
df = df.repartition(400, col('store_id'))
dim = dim.repartition(400, col('store_id'))
result = df.join(dim, on='store_id', how='left')
# Spark detects both DataFrames are partitioned by store_id
# → uses SortMergeJoin without re-shuffling either side`}</CodeBox>

        <SubSubTitle>Partition skew — the silent performance killer</SubSubTitle>

        <Para>
          Partition skew means one partition has vastly more data than others —
          typically because one key value dominates (e.g.
          <code style={{ fontFamily: 'var(--font-mono)', fontSize: 13 }}> store_id=&apos;ST001&apos;</code> has
          50M rows while every other store has 100K). One task processes 50M
          rows while others finish in seconds, and the whole pipeline waits.
        </Para>

        <CodeBox label="Fix 1 (cheapest) — AQE skew join handling">{`spark.conf.set('spark.sql.adaptive.skewJoin.enabled', 'true')
spark.conf.set('spark.sql.adaptive.skewJoin.skewedPartitionFactor', '5')
# AQE automatically splits skewed partitions and handles the skewed key.

# DIAGNOSIS: Spark UI → Stages → Tasks → duration histogram
# One task 10× longer than others → skew on the groupBy/join key`}</CodeBox>

        <CodeBox label="Fix 2 (manual) — salting the skewed key">{`from pyspark.sql import functions as F
SALT_FACTOR = 10   # split skewed key into 10 sub-partitions

# Left side: add random salt 0-9 to each row
df_salted = df.withColumn(
    'store_id_salted',
    F.concat(col('store_id'), F.lit('_'),
             (F.rand() * SALT_FACTOR).cast('int').cast('string'))
)
# Right side: explode into 10 copies with each salt value
dim_exploded = dim.crossJoin(
    spark.range(SALT_FACTOR).select(F.col('id').cast('string').alias('salt'))
).withColumn(
    'store_id_salted',
    F.concat(col('store_id'), F.lit('_'), col('salt'))
)
result = df_salted.join(dim_exploded, on='store_id_salted', how='left')
# Each of the 10 salted ST001 sub-partitions joins independently`}</CodeBox>
      </section>

      <Divider />

      {/* ── Part 04 — Join Strategies ────────────────────────────────── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 04 — Join Strategies" />
        <SectionTitle>Join Strategies — When Each Type Applies and How to Choose</SectionTitle>

        <Para>
          Spark supports several join strategies. The engine picks one
          automatically based on estimated table sizes, but the estimates can
          be wrong — especially for filtered DataFrames where statistics have
          not been updated. Understanding the strategies lets you add the right
          hint when Spark makes the wrong choice.
        </Para>

        <SubSubTitle>Broadcast hash join — the fastest option</SubSubTitle>

        <CodeBox label="Mechanism, when to use it, and forcing it">{`Used when: one table fits in executor memory
Threshold: spark.sql.autoBroadcastJoinThreshold = 10 MB (default)
Mechanism: small table broadcast to ALL executors → hash table in memory
           large table stays in place → each partition queries the hash table
No shuffle needed → fastest join type. Limitation: small table must fit
in memory × number of executors.

WHEN TO USE:
  fact_orders (500M rows) JOIN dim_store (10 stores) → BROADCAST dim_store
  fact_orders (500M rows) JOIN dim_date (11,000 rows) → BROADCAST dim_date

FORCING BROADCAST (when Spark doesn't auto-detect):
  from pyspark.sql.functions import broadcast
  result = df_orders.join(broadcast(df_dim_store), on='store_id', how='left')

TUNING THRESHOLD:
  spark.conf.set('spark.sql.autoBroadcastJoinThreshold', str(100 * 1024 * 1024))
  # 100 MB — broadcast tables up to 100 MB automatically`}</CodeBox>

        <SubSubTitle>Sort-merge join — for large × large</SubSubTitle>

        <CodeBox label="Mechanism and the pre-sort optimisation">{`Used when: both tables are large, cannot broadcast either
Mechanism: (1) shuffle both DataFrames by join key to same partitions,
           (2) sort both sides within each partition, (3) merge-join.
Cost: 2 shuffles + 2 sorts → most expensive join type.
Benefit: handles arbitrarily large tables.

OPTIMISATION: pre-sort both sides on the join key before the join
  df_orders = df_orders.repartition(400, col('store_id')) \\
                       .sortWithinPartitions('store_id')
  df_events = df_events.repartition(400, col('store_id')) \\
                       .sortWithinPartitions('store_id')
  result = df_orders.join(df_events, on='store_id', how='inner')
  # Spark can use SortMergeJoin without re-shuffling either side`}</CodeBox>

        <SubSubTitle>Shuffle hash join, and the Cartesian join trap</SubSubTitle>

        <CodeBox label="Shuffle hash join and forcing it">{`Used when: one table is smaller but not small enough to broadcast
Mechanism: shuffle both sides, build hash table from smaller side,
           probe hash table with larger side rows.
Better than SMJ when: build side is significantly smaller than probe side.
Worse than BHJ: still requires a shuffle.

FORCING SHJ:
  result = df_orders.join(
      df_medium.hint('shuffle_hash'), on='store_id', how='left'
  )`}</CodeBox>

        <CodeBox label="Cartesian joins — the accidental performance disaster">{`A Cartesian product (CROSS JOIN or missing join condition) multiplies rows.
10,000 orders × 10,000 products = 100,000,000 rows.
10M orders × 10K products = 100,000,000,000 rows → OOM / never finishes.

SPARK PROTECTION:
  spark.conf.set('spark.sql.crossJoin.enabled', 'false')  # default: raises error

WHEN CARTESIAN IS INTENTIONAL (and safe):
  df.crossJoin(spark.range(10))  # explode each row 10× for salting
  Small × small (e.g., 12 months × 10 stores = 120 rows) is fine.`}</CodeBox>

        <SubSubTitle>Join order — filter before you join</SubSubTitle>

        <CodeBox label="Filtering before the join reduces shuffle data by orders of magnitude">{`BAD: join 500M orders to 10M payments, then filter to one day
  df.join(payments, on='order_id').filter(col('date') == '2026-03-17')

GOOD: filter orders to one day (500K rows) THEN join to payments
  df.filter(col('date') == '2026-03-17').join(payments, on='order_id')
  # 500K rows join to payments instead of 500M rows → 1000× less shuffle data`}</CodeBox>
      </section>

      <Divider />

      {/* ── Part 05 — SQL Performance in Warehouses ──────────────────── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 05 — SQL Performance in Warehouses" />
        <SectionTitle>SQL Performance — Snowflake, BigQuery, and Redshift Tuning</SectionTitle>

        <Para>
          SQL performance in cloud warehouses follows different patterns from
          Spark. The warehouse&rsquo;s query optimiser handles much of the physical
          execution planning, but data engineers must still understand which
          SQL patterns are expensive and which are cheap, and how to diagnose
          slow queries using the query profile.
        </Para>

        <SubSubTitle>Pattern 1 — functions on filter columns disable pruning</SubSubTitle>

        <CodeBox label="A function wrapped around the filter column blocks partition pruning">{`-- SLOW: function on date column prevents micro-partition pruning
SELECT * FROM silver.orders
WHERE DATE_TRUNC('day', created_at) = '2026-03-17';
-- Snowflake cannot compare the function result to partition min/max.
-- Result: full table scan. 10,000 micro-partitions → 10,000 scanned.

-- FAST: range filter on raw column enables pruning
SELECT * FROM silver.orders
WHERE created_at >= '2026-03-17'::TIMESTAMPTZ
  AND created_at <  '2026-03-18'::TIMESTAMPTZ;
-- Result: 14 micro-partitions scanned out of 10,000. 99.9% pruning.

-- SAME PROBLEM IN BIGQUERY:
-- SLOW: WHERE DATE(created_at) = '2026-03-17'
-- FAST: WHERE created_at >= '2026-03-17' AND created_at < '2026-03-18'`}</CodeBox>

        <SubSubTitle>Pattern 2 — SELECT * reads every column</SubSubTitle>

        <CodeBox label="Columnar storage rewards selecting only what you need">{`-- SLOW: reads all 200 columns
SELECT * FROM fct_orders_wide WHERE date = '2026-03-17';
-- BigQuery bills for ALL columns × ALL rows. Snowflake reads all
-- column micro-partition data.

-- FAST: only read needed columns
SELECT order_id, store_id, order_amount, customer_tier
FROM fct_orders_wide
WHERE date = '2026-03-17';
-- ~200× less I/O for a 200-column table.`}</CodeBox>

        <SubSubTitle>Pattern 3 — DISTINCT vs. approximate counting</SubSubTitle>

        <CodeBox label="APPROX_COUNT_DISTINCT trades 2% error for 100x speed">{`-- SLOW for large datasets — DISTINCT sorts/hashes all values:
SELECT DISTINCT customer_id FROM silver.orders WHERE date = '2026-03-17';

-- FASTER for counting:
SELECT COUNT(DISTINCT customer_id) FROM silver.orders WHERE date = '2026-03-17';

-- FASTEST — HyperLogLog approximation (fine for most dashboards):
SELECT APPROX_COUNT_DISTINCT(customer_id) FROM silver.orders WHERE date = '2026-03-17';
-- ~2% error, 100× faster for large datasets.`}</CodeBox>

        <SubSubTitle>Pattern 4 — correlated subqueries vs. window functions</SubSubTitle>

        <CodeBox label="A correlated subquery re-executes per row; a window function scans once">{`-- SLOW: correlated subquery runs once per order row
SELECT o.order_id, o.order_amount,
    (SELECT AVG(order_amount) FROM silver.orders o2
     WHERE o2.store_id = o.store_id AND o2.date = o.date)
     AS store_daily_avg
FROM silver.orders o;
-- For 500K orders: runs the subquery 500K times. Extremely slow.

-- FAST: window function, computed once over all rows
SELECT order_id, order_amount,
    AVG(order_amount) OVER (PARTITION BY store_id, date) AS store_daily_avg
FROM silver.orders;
-- Window function scans data once. 1000× faster.`}</CodeBox>

        <SubSubTitle>Pattern 5 — UNION ALL vs. conditional aggregation</SubSubTitle>

        <CodeBox label="One conditional-aggregation scan replaces two full-table scans">{`-- SLOW: two full scans
SELECT 'delivered' AS status, COUNT(*) FROM orders WHERE status = 'delivered'
UNION ALL
SELECT 'cancelled' AS status, COUNT(*) FROM orders WHERE status = 'cancelled';

-- FAST: conditional aggregation, one scan
SELECT
    COUNT(CASE WHEN status = 'delivered' THEN 1 END) AS delivered_count,
    COUNT(CASE WHEN status = 'cancelled' THEN 1 END) AS cancelled_count
FROM silver.orders;`}</CodeBox>

        <CodeBox label="Snowflake-specific — QUALIFY eliminates a filtering subquery">{`-- SLOW: subquery to filter window function result
SELECT order_id, order_amount, row_num FROM (
    SELECT *, ROW_NUMBER() OVER (PARTITION BY store_id ORDER BY order_amount DESC)
              AS row_num
    FROM silver.orders
) WHERE row_num = 1;

-- FAST: QUALIFY (Snowflake-native — eliminates the subquery)
SELECT order_id, order_amount
FROM silver.orders
QUALIFY ROW_NUMBER() OVER (PARTITION BY store_id ORDER BY order_amount DESC) = 1;`}</CodeBox>
      </section>

      <Divider />

      {/* ── Part 06 — dbt Incremental Optimisation ───────────────────── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 06 — dbt Incremental Optimisation" />
        <SectionTitle>dbt Incremental Models — Making Transformations Fast at Scale</SectionTitle>

        <Para>
          A dbt model with <code style={{ fontFamily: 'var(--font-mono)', fontSize: 13 }}>materialized=&apos;table&apos;</code> rebuilds
          the entire table on every run. For a Silver model with 500 million
          rows, a full rebuild takes hours. Incremental models process only
          new or changed rows, reducing run time from hours to minutes.
          Getting the incremental strategy right is one of the most impactful
          performance choices for a dbt-based platform.
        </Para>

        <SubSubTitle>Strategy — append</SubSubTitle>

        <CodeBox label="Simplest strategy — just adds new rows">{`{{ config(
    materialized='incremental',
    incremental_strategy='append',
    unique_key='order_id',
) }}
SELECT * FROM {{ ref('stg_orders') }}
{% if is_incremental() %}
    WHERE ingested_at > (SELECT MAX(ingested_at) FROM {{ this }})
{% endif %}

USE WHEN: fact tables where rows are never updated — event logs,
          append-only CDC events, immutable audit records.
AVOID WHEN: rows can be updated (orders change status) → creates duplicates.`}</CodeBox>

        <SubSubTitle>Strategy — merge (upsert)</SubSubTitle>

        <CodeBox label="Handles both inserts and updates">{`{{ config(
    materialized='incremental',
    incremental_strategy='merge',
    unique_key='order_id',
    merge_update_columns=['status', 'updated_at', 'delivered_at'],
) }}
SELECT * FROM {{ ref('stg_orders') }}
{% if is_incremental() %}
    WHERE updated_at > (
        SELECT MAX(silver_updated_at) - INTERVAL '30 minutes' FROM {{ this }}
    )
{% endif %}

USE WHEN: rows can change over time (status changes, updated attributes).
merge_update_columns limits how many columns are updated per match —
without it, all columns are updated even when unchanged, which is wasteful.
The 30-minute overlap window catches late-arriving Bronze rows.`}</CodeBox>

        <SubSubTitle>Strategy — insert_overwrite (partition-level)</SubSubTitle>

        <CodeBox label="Replaces whole partitions instead of merging row by row">{`{{ config(
    materialized='incremental',
    incremental_strategy='insert_overwrite',
    partition_by={'field': 'order_date', 'data_type': 'date', 'granularity': 'day'},
) }}
SELECT * FROM {{ ref('stg_orders') }}
{% if is_incremental() %}
    WHERE order_date >= CURRENT_DATE - 2  -- rebuild last 2 days
{% endif %}

USE WHEN: large time-partitioned tables where partition-level replacement
          is more efficient than row-level merge.
BEST FOR: BigQuery (native partition-level overwrite, very cheap). Also
          effective on Spark Delta Lake (replaces whole partition files).
AVOID WHEN: multiple keys updated across many partitions → merge is better.`}</CodeBox>

        <SubSubTitle>Strategy — delete+insert, and choosing between them</SubSubTitle>

        <CodeBox label="The fallback strategy, and the decision rule">{`{{ config(
    materialized='incremental',
    incremental_strategy='delete+insert',
    unique_key='order_id',
) }}
-- dbt generates:
-- DELETE FROM {{ this }} WHERE order_id IN (SELECT order_id FROM __new_rows)
-- INSERT INTO {{ this }} SELECT * FROM __new_rows
USE WHEN: merge is not supported by the target database adapter.

CHOOSING THE RIGHT STRATEGY:
  Event log (never updates):           append
  Entity current state (updates):      merge
  Large time-series, few key changes:  insert_overwrite by date partition
  Non-merge-supporting DB:             delete+insert

INCREMENTAL FILTER WINDOW: must be wide enough to catch late-arriving rows.
A 30-minute overlap ensures rows arriving slightly after the last run are
still processed. For sources with up to 24h late arrival: use 25h overlap.`}</CodeBox>

        <SubSubTitle>File compaction — solving the small file problem</SubSubTitle>

        <CodeBox label="The problem, and how to diagnose it">{`A dbt incremental merge writes a few thousand rows per run. Each run
appends small Parquet files to the Delta table. After 90 days of daily
runs: 90 small files in the partition, each requiring a separate S3 GET.
  Reading 100 columns from 90 × 5 MB files  = 9,000 S3 GET requests
  Reading 100 columns from 1 × 450 MB file  =   100 S3 GET requests
→ 90× more S3 API calls → much slower reads. After a year of hourly runs
on a busy table: 8,760 files — S3 LIST alone takes seconds before reading starts.

DIAGNOSIS (Delta Lake):
  DESCRIBE HISTORY silver.orders;
  -- Look at numFiles per version — rapidly growing count = small file problem
  SELECT file_path, size FROM silver.orders.files ORDER BY size ASC LIMIT 20;
  -- Many files under 1 MB = small file problem`}</CodeBox>

        <CodeBox label="Fix — Delta OPTIMIZE, Z-ORDER, and automation">{`-- Compact all small files in a partition into target size (256 MB default):
OPTIMIZE silver.orders WHERE order_date = '2026-03-17';

-- Z-ORDER combines compaction with co-location by column:
OPTIMIZE silver.orders ZORDER BY (store_id, order_date);
-- Files with similar store_id and order_date values are co-located.
-- Queries filtering by store_id skip ~90% of files after Z-ORDER.

-- AUTOMATING IN AIRFLOW — run after the daily dbt transformation:
optimize_silver = BashOperator(
    task_id='optimize_silver_orders',
    bash_command='databricks jobs run-now --job-id optimize_silver_orders_job',
)
dbt_silver >> dbt_gold >> optimize_silver

-- VACUUM: remove files no longer referenced by Delta:
VACUUM silver.orders RETAIN 168 HOURS;  -- keep 7 days for time travel`}</CodeBox>
      </section>

      <Divider />

      {/* ── Part 07 — Pipeline-Level Optimisation ────────────────────── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 07 — Pipeline-Level Optimisation" />
        <SectionTitle>Pipeline-Level Optimisation — Beyond Individual Queries</SectionTitle>

        <Para>
          Individual query performance matters, but pipeline architecture
          determines the ceiling. The most significant pipeline-level
          optimisations are parallelism configuration, caching strategy,
          and eliminating redundant work across pipeline stages.
        </Para>

        <SubSubTitle>Optimisation 1 — cache strategically</SubSubTitle>

        <CodeBox label="Avoid reading the same data twice">{`# BAD: silver.orders scanned TWICE in the same pipeline run
silver_orders = spark.read.format('delta').load('/silver/orders')
revenue_df  = silver_orders.filter(...).groupBy('store').agg(sum('amount'))
customer_df = silver_orders.filter(...).groupBy('customer').agg(count('*'))
# Spark reads /silver/orders twice from S3 — 2× the I/O.

# GOOD: cache after the first read, use for both downstream operations
silver_orders = spark.read.format('delta').load('/silver/orders')
silver_orders.cache()
silver_orders.count()   # trigger materialisation (eagerly cache)

revenue_df  = silver_orders.filter(...).groupBy('store').agg(sum('amount'))
customer_df = silver_orders.filter(...).groupBy('customer').agg(count('*'))
silver_orders.unpersist()  # release memory after use — important!`}</CodeBox>

        <CodeBox label="When to cache, and when not to">{`WHEN TO CACHE:
  ✓ Same DataFrame used 2+ times downstream in the same pipeline run
  ✓ Expensive intermediate result (join result) reused
  ✗ DataFrame only used once — cache adds overhead without benefit
  ✗ Very large DataFrames that don't fit in memory — spills to disk, slower`}</CodeBox>

        <SubSubTitle>Optimisation 2 — push filters down to the source</SubSubTitle>

        <CodeBox label="Filtering on the partition column at read time">{`# GOOD: filter on the partition column directly at read time
df = spark.read.format('delta').load('/silver/orders') \\
     .filter(col('order_date') == '2026-03-17')
# Spark reads ONLY the order_date=2026-03-17 partition directory —
# this partition-pruning happens automatically for column filters that
# match the partitionBy() columns used at write time.

# For non-partition column filters on Parquet:
spark.conf.set('spark.sql.parquet.filterPushdown', 'true')  # default: true
# Pushes row-group level filters into the Parquet reader.`}</CodeBox>

        <SubSubTitle>Optimisation 3 — tune executor configuration</SubSubTitle>

        <CodeBox label="Executor sizing for memory-intensive vs. compute-intensive workloads">{`# Memory-intensive workloads (large joins, wide aggregations):
executor_memory     = '16g'   # 16 GB per executor
executor_cores      = 4       # 4-5 cores per executor is the rule of thumb
overhead_memory     = '2g'    # ~10-15% of executor_memory

spark = SparkSession.builder \\
    .config('spark.executor.memory',         '16g') \\
    .config('spark.executor.cores',          '4') \\
    .config('spark.executor.memoryOverhead', '2g') \\
    .config('spark.driver.memory',           '8g') \\
    .config('spark.sql.adaptive.enabled',    'true') \\
    .config('spark.sql.adaptive.coalescePartitions.enabled', 'true') \\
    .config('spark.sql.shuffle.partitions',  '400') \\
    .getOrCreate()`}</CodeBox>

        <SubSubTitle>Optimisation 4 — coalesce vs. repartition</SubSubTitle>

        <CodeBox label="No shuffle vs. full shuffle — know which one you need">{`# repartition(n): full shuffle, creates exactly n equal partitions.
#   Use when data is severely unbalanced or you need a specific count.
# coalesce(n): no shuffle, merges existing partitions.
#   Use when reducing partition count AFTER filtering — avoids network traffic.

df = spark.read.parquet(...)                       # 2,000 partitions
    .filter(col('date') == '2026-03-17')            # 95% of partitions now empty
df = df.coalesce(50)   # merge 2,000 into 50 without shuffle

WHEN TO REPARTITION: before a join (co-partitioning both sides on the join
  key), before orderBy, or when partition sizes are very uneven.
WHEN TO COALESCE: after an aggressive filter, or before writing to reduce
  file count. Never coalesce BEFORE a shuffle operation — it's wasted.`}</CodeBox>
      </section>

      <Divider />

      {/* ── Misconceptions ────────────────────────────────────────────── */}
      <section style={{ marginBottom: 64 }} data-toc-kind="myth">
        <SectionTag text="// Misconceptions" />
        <SectionTitle>Five Misconceptions About Performance Tuning</SectionTitle>

        {[
          {
            wrong: '"Adding more executors / a bigger cluster fixes a slow pipeline"',
            right: 'Part 01 is explicit that the fix depends on the bottleneck type — more executors barely helps an I/O-bound job that\'s reading 50TB when it needs 500GB (the actual fix, shown in this module\'s Error Library, is correcting the partitioning). Part 08\'s Real World case fixed a 4-hour pipeline down to 22 minutes on the SAME 10-node cluster, with zero added hardware.',
          },
          {
            wrong: '"Broadcast joins are always safe to force on the smaller-looking table"',
            right: 'Part 04 and this module\'s Error Library both warn about the same failure: broadcasting a table that turns out to be larger than estimated sends that full size to every executor simultaneously, which is exactly how a "small" 800MB table becomes a 16GB OOM. Always verify the actual materialized size before forcing a broadcast hint.',
          },
          {
            wrong: '"dbt incremental models are always faster than a full rebuild"',
            right: 'This module\'s Error Library documents the opposite happening: an incremental merge against a 500-million-row table with no clustering on the unique_key took 2 hours, while a full refresh took 45 minutes. Incremental only wins when the target table has physical ordering that makes the merge lookup cheap — Part 06\'s insert_overwrite strategy exists specifically for the cases where merge stops paying off.',
          },
          {
            wrong: '"AQE and other automatic optimizations mean manual tuning is obsolete"',
            right: 'Part 08\'s Real World diagnosis shows AQE skew handling taking a stage from 2.5 hours down to 38 minutes — a huge win, but still 6x slower than the fully-tuned 6-minute result achieved afterward by correcting the shuffle partition count and forcing the broadcast join. AQE removes the need for some manual tuning, not all of it.',
          },
          {
            wrong: '"A slow query profile with a big Exchange operator just means the join is inherently expensive"',
            right: 'Part 02\'s physical-plan reading section and Part 04 both point to Exchange as a specific, diagnosable signal — a shuffle that\'s often avoidable by pre-partitioning both sides on the join key (Part 04\'s sort-merge optimisation) or by broadcasting the smaller side, not an unavoidable cost of doing a join at all.',
          },
        ].map((item, i) => (
          <div key={i} style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 10, padding: '20px 24px', marginBottom: 16 }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--red)', marginBottom: 8, fontFamily: 'var(--font-mono)' }}>✕ &quot;{item.wrong}&quot;</div>
            <div style={{ fontSize: 14, color: 'var(--muted)', lineHeight: 1.7 }}>{item.right}</div>
          </div>
        ))}
      </section>

      <Divider />

      {/* ── Part 08 — Real World ─────────────────────────────────────── */}
      <section style={{ marginBottom: 64 }} data-toc-kind="story">
        <SectionTag text="// Part 08 — Real World" />
        <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '.12em', textTransform: 'uppercase', color: 'var(--muted)', marginBottom: 12, fontFamily: 'var(--font-mono)' }}>
          💼 What This Looks Like at Work
        </div>
        <SectionTitle>A Silver Pipeline That Took 4 Hours Gets to 22 Minutes</SectionTitle>

        <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 12, padding: '24px 28px', marginBottom: 24 }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--accent)', background: 'rgba(0,230,118,0.1)', border: '1px solid rgba(0,230,118,0.2)', borderRadius: 6, padding: '4px 10px', fontFamily: 'var(--font-mono)', display: 'inline-block', marginBottom: 20, letterSpacing: '.1em', textTransform: 'uppercase' }}>
            Scenario — FreshCart · Silver orders pipeline misses its 08:00 ET SLA daily
          </div>

          <Para>
            The Silver orders pipeline runs from 06:00 ET and is supposed to
            complete by 07:30 ET, giving Gold 30 minutes before analysts arrive.
            It has been completing at around 10:00 ET. The data team is asked
            to fix it. The pipeline processes 180 million orders in Bronze,
            transforming them to Silver via a Spark job on a 10-node cluster.
          </Para>

          <SubSubTitle>Step 1-2 — finding the skewed key</SubSubTitle>

          <CodeBox label="Reading the Stages and Tasks tabs">{`Stage 1 (file read + filter): 3 min    ← reasonable
Stage 2 (join with dim_store): 2.5 hr  ← THE BOTTLENECK
Stage 3 (aggregation):         35 min

Stage 2 Tasks: 1 task = 142 min, all others = 8-12 min.
ONE TASK IS 18× SLOWER → classic data skew.

# Check the join key distribution:
df.groupBy('store_id').count().orderBy('count', ascending=False).show(10)`}</CodeBox>

          <Output>{`ST001  148,000,000  ← ONE store has 148M of 180M rows (82%)!
ST002    4,200,000
ST003    3,800,000
... (remaining 9 stores share 28M rows)

ST001 is FreshCart HQ — all online orders route through this store_id.
The join on store_id puts all 148M ST001 rows in one partition.`}</Output>

          <SubSubTitle>Step 3 — fixing skew with AQE</SubSubTitle>

          <CodeBox label="Cheapest fix — try first">{`spark.conf.set('spark.sql.adaptive.enabled', 'true')
spark.conf.set('spark.sql.adaptive.skewJoin.enabled', 'true')
spark.conf.set('spark.sql.adaptive.skewJoin.skewedPartitionFactor', '3')
spark.conf.set('spark.sql.adaptive.skewJoin.skewedPartitionThresholdInBytes',
               str(256 * 1024 * 1024))  # flag partitions > 256 MB as skewed
# AQE splits the skewed ST001 partition into multiple sub-partitions.`}</CodeBox>

          <Output>{`RE-RUN RESULT: Stage 2 = 38 min (was 2.5 hr). 4× better. Still not enough.`}</Output>

          <SubSubTitle>Step 4 — fixing shuffle partition count</SubSubTitle>

          <CodeBox label="Stage 3's aggregation was under-parallelised">{`Stage 3: all 200 tasks, each taking 10-15 min. Input per task ~80 MB
(reasonable), but shuffle.partitions = 200 (default) for 180M rows
= 900K rows per partition — not enough parallelism.

FIX: increase shuffle partitions
spark.conf.set('spark.sql.shuffle.partitions', '800')
# 800 partitions for 180M rows = 225K rows per partition — 4× more parallelism`}</CodeBox>

          <Output>{`RE-RUN RESULT: Stage 3 = 9 min (was 35 min). Stage 2 = 34 min.`}</Output>

          <SubSubTitle>Step 5 — forcing the broadcast join</SubSubTitle>

          <CodeBox label="dim_store (10 rows) should have been broadcast automatically">{`# After AQE: no more extreme skew, but 34 min for a join with dim_store?
# dim_store has 10 rows — it should be broadcast!
spark.conf.get('spark.sql.autoBroadcastJoinThreshold')  # = '10485760' (10 MB)

# dim_store is loaded from a Delta table with no updated table statistics —
# Spark estimates dim_store = 500 MB (wrong), so broadcast never triggers.

# FIX: force the broadcast hint
dim_store_df = spark.read.format('delta').load('/silver/dim_store')
orders_with_store = df_orders.join(
    broadcast(dim_store_df), on='store_id', how='left'
)`}</CodeBox>

          <Output>{`RE-RUN RESULT: Stage 2 = 6 min (was 34 min after AQE alone).`}</Output>

          <SubSubTitle>Step 6 — eliminating a redundant read, final results</SubSubTitle>

          <CodeBox label="bronze.orders was being read twice for two parallel Silver models">{`bronze_orders = spark.read.format('delta') \\
    .load('/bronze/orders') \\
    .filter(col('_bronze_date') == run_date)
bronze_orders.cache()
bronze_orders.count()   # materialise once, reuse for both downstream models`}</CodeBox>

          <Output>{`FINAL PIPELINE TIMES:
Stage 1 (read + filter):  3 min
Stage 2 (join):           6 min  (was 2.5 hours)
Stage 3 (aggregate):      9 min  (was 35 min)
Stage 4 (second model):   4 min  (cache hit — was 12 min)
Total: 22 min (was 4 hours) — 11× faster. SLA now completes at 06:22 ET.

SUMMARY OF FIXES APPLIED:
1. AQE skew join:          2.5 hr → 38 min  (data skew resolved)
2. Broadcast dim_store:    38 min → 6 min   (wrong join strategy)
3. Shuffle partitions 800: 35 min → 9 min   (too few partitions)
4. Cache Bronze read:      12 min → 4 min   (redundant S3 read eliminated)`}</Output>
        </div>
      </section>

      <Divider />

      {/* ── Part 09 — Interview Prep ─────────────────────────────────── */}
      <section style={{ marginBottom: 64 }} data-toc-kind="prep">
        <SectionTag text="// Part 09 — Interview Prep" />
        <SectionTitle>5 Interview Questions — With Complete Answers</SectionTitle>

        {[
          {
            q: 'Q1. What is a shuffle in Spark and why is it expensive?',
            a: `A shuffle is the redistribution of data across executor partitions. It is required when Spark needs to bring data with the same key together — for groupBy, join, distinct, or orderBy operations. Data that currently lives across 100 executor partitions must be moved so that all rows with the same key end up in the same partition.

The expense has three components. First, disk I/O: the executor that sends data must write the output to local disk (the shuffle write), and the receiving executor must read it back from disk (the shuffle read). This disk write-then-read cycle is always present in a shuffle, even before any network transfer.

Second, network transfer: the data moves from the sending executors to the receiving executors over the cluster network. A shuffle of 500 GB means 500 GB moves across the network. Network bandwidth is finite — a large shuffle saturates the network and slows all other traffic.

Third, sort overhead: for SortMergeJoin and orderBy, the data must be sorted after the shuffle, adding CPU cost.

The practical implication is that reducing the number of shuffles and the size of data that shuffles are the highest-impact performance optimisations. Broadcast joins eliminate one shuffle entirely by broadcasting the small table to all executors. Pre-partitioning (repartitioning both sides of a join on the join key before the join) eliminates the shuffle for that join. Filtering data before it reaches a shuffle stage reduces the amount of data that needs to be redistributed.

AQE (Adaptive Query Execution in Spark 3.0+) can reduce shuffle output size by coalescing shuffle partitions — if a 200-partition shuffle results in many near-empty partitions, AQE merges them into fewer, larger partitions, reducing the number of shuffle read tasks.`,
          },
          {
            q: 'Q2. When would you use a broadcast join vs a sort-merge join in Spark?',
            a: `Broadcast join is used when one side of the join is small enough to fit in executor memory. The small table is sent (broadcast) to all executors as a hash table. When a row from the large table arrives at an executor for processing, it queries the local hash table directly — no shuffle needed. This is the fastest join type. The default threshold is 10 MB (spark.sql.autoBroadcastJoinThreshold), meaning Spark automatically broadcasts tables estimated to be under 10 MB.

Broadcast join is appropriate for: fact table joining a dimension table (10 stores, 365 dates, small lookup tables), any join where one side is a known-small reference table, and joins where Spark incorrectly estimates the table size and you want to force the strategy with a broadcast() hint. The risk is broadcasting a table that is actually large — if the broadcast table does not fit in executor memory, Spark gets an OOM error. Always verify the actual size before forcing a broadcast on a table with uncertain size.

Sort-merge join is used when both sides are large. It shuffles both DataFrames by the join key, sorts within each partition, and then merges. It handles arbitrarily large tables but requires two shuffles and two sorts — the most expensive join type. Appropriate for: large-to-large fact table joins (orders joining to payments, both 100M+ rows), joins where neither side is small enough to broadcast.

The decision tree: if either side is clearly small (< 50-100 MB), broadcast it. If both sides are large but one is significantly smaller, try shuffle hash join (one shuffle + hash build). If both sides are large and similar, sort-merge join is the only option — optimise by pre-partitioning on the join key to eliminate one of the shuffles.

In Spark 3.0+ with AQE enabled, Spark can dynamically switch from sort-merge join to broadcast join after seeing the actual runtime shuffle sizes — worth enabling in production for this automatic optimisation.`,
          },
          {
            q: 'Q3. What is data skew in Spark and how do you fix it?',
            a: `Data skew occurs when one or a few key values have far more rows than others, causing uneven partition sizes. In a join or groupBy on a skewed key, one task processes vastly more data than others. The pipeline waits for that single slow task to complete while all other executors sit idle. The symptom in the Spark UI is one task with 10× or 100× the duration of all others.

The most common cause in production is a "hot key" — a single value that dominates the dataset. customer_id=0 for guest orders, store_id='ST001' for a flagship store that handles all online orders, or status='placed' for large order volumes that haven't been fulfilled yet.

There are three fixes in order of complexity. The first and cheapest is enabling AQE skew join handling: spark.conf.set('spark.sql.adaptive.skewJoin.enabled', 'true'). AQE detects that one partition is significantly larger than others (based on spark.sql.adaptive.skewJoin.skewedPartitionFactor, default 5×) and automatically splits the skewed partition into multiple sub-partitions, distributing the work. This handles most common skew cases without any code changes.

The second fix is salting, used when AQE is insufficient or not available. Append a random integer (0 to N-1) to the join key on the larger side, and explode the smaller side to N copies with each salt value. The single hot key is distributed across N partitions. After the join, the salt column is dropped. This eliminates the skew at the cost of N× more rows on the dimension side.

The third approach is a two-stage aggregation for groupBy skew: perform a partial aggregation using a salted key (reducing data volume), then a final aggregation on the real key. This distributes the initial aggregation work across many partitions before the final merge.

Always diagnose first — check the tasks histogram in the Spark UI to confirm skew before applying fixes.`,
          },
          {
            q: 'Q4. How do dbt incremental models work and when would you use merge vs insert_overwrite?',
            a: `A dbt incremental model processes only new or changed rows rather than rebuilding the entire table on every run. On the first run, it behaves like a table materialisation — builds the full result. On subsequent runs, it filters the source data using an is_incremental() condition that compares against the current state of the target table, processes only the relevant rows, and merges or appends them.

The merge strategy generates a MERGE INTO statement (or its equivalent) against the target table. It matches rows by the unique_key column — if a matching row exists in the target, it updates the specified columns; if no match, it inserts the new row. Merge is appropriate when rows can change over time: order status changes (placed → confirmed → delivered), customer attributes being updated, any entity that has mutable state. The merge_update_columns configuration limits which columns are updated on a match, preventing unnecessary writes when only some attributes change.

The insert_overwrite strategy replaces entire partitions rather than operating row by row. It selects rows from the source for the affected partition range, deletes all existing rows in those partitions from the target, and inserts the new rows. This is more efficient than merge when the unit of reprocessing is a whole partition — for example, rebuilding one day's worth of data completely. It is the recommended strategy for BigQuery where partition-level replacements are native and extremely cost-effective. It is appropriate when: the data is time-partitioned, updates affect entire partitions rather than individual rows, and the cost of replacing a partition is lower than merging thousands of row-level changes.

The practical decision: use merge when rows change individually (entity current state, event stream with late arrivals). Use insert_overwrite when data is naturally partitioned by time and the entire partition can be safely replaced (pre-aggregated daily metrics, hourly snapshots). Use append when rows never change after insertion (immutable event logs, audit records, Bronze CDC events).`,
          },
          {
            q: 'Q5. A Spark pipeline takes 4 hours. You are asked to investigate. Walk through your diagnostic process.',
            a: `The investigation follows a structured sequence: identify the bottleneck stage, understand why it is slow, then apply the targeted fix.

First, open the Spark UI and check the Stages tab. The goal is to find which stage is taking most of the time. Sort by Duration. If one stage accounts for 80% of the runtime, that is the bottleneck — I focus there first.

Second, click into the bottleneck stage and examine the Tasks tab. The tasks duration histogram is the most informative view. If all tasks have similar duration but are slow, the stage is uniformly bottlenecked — either by I/O (bytes read is very large), network (shuffle read is very large), or memory (spill to disk is nonzero). If one task is 10× slower than others, it is data skew — find the key with the hot value.

Third, diagnose the bottleneck type. If bytes read is very large: the partition filter is not working — check that the WHERE clause uses the partition column directly without functions. If shuffle read is very large: the join or aggregation is moving too much data — consider broadcast for small tables or repartitioning before the join. If spill to disk is nonzero: the partition size exceeds executor memory — either increase executor memory, reduce partition size with more shuffle partitions, or broadcast the smaller join side.

Fourth, check the SQL tab for the physical plan. Exchange operators indicate shuffles. BroadcastHashJoin indicates a correctly optimised small-table join. SortMergeJoin between two large tables is expected but should have minimal estimated rows if filters were applied. If FileScan shows no PushedFilters, filters are not being pushed down to the file reader — apply them on partition columns directly.

Fifth, check for architectural issues: is the same source data read multiple times in the pipeline? Is AQE enabled? Are shuffle partitions tuned for the data volume? Is the incremental filter wide enough to catch late arrivals without being so wide it reprocesses too much data? These pipeline-level issues often cause more time than any individual operator.`,
          },
        ].map((item, i) => (
          <div key={i} style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 12, padding: '24px 28px', marginBottom: 20 }}>
            <div style={{ fontSize: 14, fontWeight: 800, color: 'var(--text)', marginBottom: 14, lineHeight: 1.4 }}>{item.q}</div>
            <div style={{ fontSize: 14, color: 'var(--muted)', lineHeight: 1.85, whiteSpace: 'pre-line' }}>{item.a}</div>
          </div>
        ))}
      </section>

      <Divider />

      {/* ── Common Mistakes ───────────────────────────────────────────── */}
      <section style={{ marginBottom: 64 }} data-toc-kind="plain">
        <SectionTag text="// Common Mistakes" />
        <SectionTitle>Mistakes Beginners Make Constantly</SectionTitle>

        {[
          {
            q: 'Reaching for repartition() to fix a slow pipeline without checking whether a shuffle is even the problem',
            a: 'Part 02\'s Stages-tab walkthrough exists specifically to establish which of the four bottleneck types (Part 01) you\'re actually looking at first — repartitioning a job that\'s I/O bound from a missing partition filter, as this module\'s Error Library shows with the 50TB-scan case, does nothing for the actual cause.',
          },
          {
            q: 'Forcing a broadcast hint on a table without checking its actual materialized size first',
            a: 'Part 04 and this module\'s Error Library both describe the same failure: Spark\'s size estimate can be stale or simply wrong (often because table statistics haven\'t been refreshed), and broadcasting a table that turns out to be 800MB sends that size to every single executor — that\'s how a "small table" optimization becomes a 16GB OOM.',
          },
          {
            q: 'Leaving spark.sql.shuffle.partitions at its default of 200 regardless of data size',
            a: 'Part 02 and Part 08\'s Real World diagnosis both show 200 partitions being far too few for a 180-million-row aggregation — under-parallelizing the stage by 4x. The right number scales with data volume (aim for 100-200MB per partition after filtering), not with a value that was never tuned for this specific job.',
          },
          {
            q: 'Treating every dbt model change as safe to ship without checking whether merge vs insert_overwrite still fits the update pattern',
            a: 'Part 06 is explicit that the wrong incremental strategy for a table\'s actual update pattern is exactly how this module\'s Error Library case ends up 2 hours slower than a full refresh — merge against an unclustered 500M-row table has no physical shortcut to lean on, while insert_overwrite would have replaced only the affected date partitions.',
          },
          {
            q: 'Reading the same source table twice in one pipeline run because two downstream models both need it',
            a: 'Part 07\'s caching section and Part 08\'s Step 6 both show this as a real, easy-to-miss cost — every redundant S3 read is full price in time and money. Caching the DataFrame once after the first read (and unpersisting it after use) is a small change with an outsized payoff whenever the same data feeds more than one downstream transformation.',
          },
        ].map((item, i) => (
          <div key={i} style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 12, padding: '24px 28px', marginBottom: 20 }}>
            <div style={{ fontSize: 14, fontWeight: 800, color: 'var(--text)', marginBottom: 14, lineHeight: 1.4 }}>{item.q}</div>
            <div style={{ fontSize: 14, color: 'var(--muted)', lineHeight: 1.85 }}>{item.a}</div>
          </div>
        ))}
      </section>

      <Divider />

      {/* ── Error Library ────────────────────────────────────────────── */}
      <section style={{ marginBottom: 64 }} data-toc-kind="plain">
        <SectionTag text="// Error Library" />
        <SectionTitle>Errors You Will Hit — And Exactly Why They Happen</SectionTitle>

        {[
          {
            error: `Spark OOM (OutOfMemoryError) on executor during a join — java.lang.OutOfMemoryError: GC overhead limit exceeded`,
            cause: 'The join is trying to build a hash table for the "small" side of a broadcast join, but the table is not actually small after materialisation — it is 800 MB due to a missed filter. The broadcast table is sent to every executor (20 executors), consuming 800 MB × 20 = 16 GB of total broadcast memory. Combined with the task\'s working memory, this exceeds the 16 GB executor allocation. GC overhead is exceeded when the JVM spends more than 98% of time in garbage collection without reclaiming enough memory.',
            fix: 'First, check the actual size of the broadcasted DataFrame: df.rdd.repartition(1).mapPartitions(lambda x: [sum(1 for _ in x)]).collect(). Or in SQL plan: look at the size estimate for BroadcastExchange in the Spark UI SQL tab. If the broadcast table is large, remove the broadcast hint and let Spark use SortMergeJoin. If broadcasting is genuinely needed, increase spark.executor.memory and spark.executor.memoryOverhead. Increase autoBroadcastJoinThreshold to match the actual table size, or apply the missing filter before broadcasting.',
          },
          {
            error: `dbt incremental merge is slower than a full table rebuild — taking 2 hours while dbt run --full-refresh takes 45 minutes`,
            cause: 'The incremental merge is matching rows against a 500 million-row target table using a MERGE INTO statement with a non-indexed unique_key. The MERGE must find each source row\'s match in the 500M-row table. Without proper clustering/indexing on the unique_key, this is a full table scan per source row. The overhead of the MERGE logic exceeds the cost of a full rebuild at this scale.',
            fix: 'For Snowflake: ensure the target table is clustered on the unique_key (ALTER TABLE silver.orders CLUSTER BY (order_id)) so the MERGE lookup benefits from pruning. For Delta Lake: ZORDER BY (order_id) before the MERGE. Alternatively, if the incremental window is date-based and rows are partitioned by date, switch to insert_overwrite strategy — replace affected date partitions entirely rather than row-level merging. Incremental merge is efficient for targeted row-level updates but loses to full refresh when the target table is large and the unique_key has no physical ordering.',
          },
          {
            error: `Spark pipeline reads 50 TB when only 500 GB is needed — partition pruning is not working despite a WHERE filter on order_date`,
            cause: 'The Bronze table was not partitioned by order_date when it was written. The data is stored as flat Parquet files with no directory partitioning. Spark has no partition metadata to prune against — it must read all 50 TB of files and apply the date filter after loading the data into memory. This is schema-on-read partition pruning failure caused by incorrect write-time partitioning.',
            fix: 'Rewrite the Bronze table with the correct partition: df.write.partitionBy("order_date").parquet(path). This is a one-time migration cost but permanently solves the scan issue. For Snowflake: use CLUSTER BY (order_date) — Snowflake\'s micro-partition pruning uses the cluster key for range filtering. For Delta Lake: Z-ORDER BY (order_date) after writing to co-locate data by date for better pruning. Going forward: enforce partitioning standards at Bronze ingestion — every table with time-series data must be partitioned by its primary time column.',
          },
          {
            error: `dbt incremental model is reprocessing the full table on every run — is_incremental() always returns false`,
            cause: 'The target table does not exist yet — it was dropped manually for debugging, or the model was recently added to a new environment where it has never run. When the target table does not exist, dbt treats every run as a "first run" and builds the full table regardless of the incremental filter. is_incremental() returns false when the target does not exist, ensuring the first run builds a complete table.',
            fix: 'This is correct behaviour — not a bug. Run dbt run --select model_name without the incremental filter first to build the base table. On the next run, is_incremental() returns true and the incremental filter is applied. If the table was dropped accidentally, also check whether the state in the underlying Delta/Parquet path was also deleted — the incremental watermark queries MAX(silver_updated_at) from the target, which requires the target to exist and have data.',
          },
          {
            error: `Spark application runs fine locally but fails on cluster with "Container killed on request. Exit code is 137" — container OOM`,
            cause: 'Exit code 137 means the Linux container was killed by the OOM killer — not a JVM OOM but an OS-level memory kill. This happens when the total container memory (executor memory + overhead memory) is exceeded. The typical cause is that spark.executor.memoryOverhead is not configured — it defaults to 10% of executor memory or 384 MB, whichever is larger. For workloads with heavy native memory use (Python UDFs, pandas operations via PySpark, large native libraries), the overhead allocation is insufficient.',
            fix: 'Increase spark.executor.memoryOverhead: spark.conf.set("spark.executor.memoryOverhead", "4g") for Python-heavy workloads, or "2g" for pure Spark SQL. Also check for Python UDFs that hold large objects in memory — Python worker processes run outside the JVM and consume off-heap memory. Replace Python UDFs with pandas UDFs (which batch process via Apache Arrow) or native Spark SQL functions where possible. Monitor actual memory use in the Executors tab — if "Memory Used / Total" is consistently below 70%, the issue is overhead not heap.',
          },
        ].map((item, i) => (
          <div key={i} style={{ background: 'var(--bg2)', border: '1px solid var(--border)', borderRadius: 10, padding: '20px 24px', marginBottom: 16 }}>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--red)', marginBottom: 12, background: 'rgba(255,71,87,0.08)', border: '1px solid rgba(255,71,87,0.2)', borderRadius: 6, padding: '8px 12px', lineHeight: 1.5 }}>{item.error}</div>
            <div style={{ marginBottom: 8 }}>
              <span style={{ fontSize: 10, fontWeight: 700, color: 'var(--muted)', fontFamily: 'var(--font-mono)', letterSpacing: '.1em', textTransform: 'uppercase' }}>Cause: </span>
              <span style={{ fontSize: 13, color: 'var(--muted)', lineHeight: 1.7 }}>{item.cause}</span>
            </div>
            <div>
              <span style={{ fontSize: 10, fontWeight: 700, color: 'var(--accent)', fontFamily: 'var(--font-mono)', letterSpacing: '.1em', textTransform: 'uppercase' }}>Fix: </span>
              <span style={{ fontSize: 13, color: 'var(--muted)', lineHeight: 1.7 }}>{item.fix}</span>
            </div>
          </div>
        ))}
      </section>

      {/* ── Key Takeaways ────────────────────────────────────────────── */}
      <KeyTakeaways items={[
        'Diagnose before you optimise. The four bottleneck types — I/O bound (too much data read), CPU bound (expensive computation), memory bound (spill to disk), network bound (large shuffles) — have different fixes. Applying the wrong fix wastes time. Read the Spark UI Stages tab and Tasks histogram before touching any configuration.',
        'Spark execution: one action = one job. Jobs are split into stages at shuffle boundaries. Each stage has tasks, one per partition. Shuffles (groupBy, join, distinct, orderBy) are the most expensive operations — they write data to disk and move it across the network. Minimise shuffles, minimise the data that shuffles touch.',
        'File partitioning (partitionBy at write time) enables partition pruning — Spark reads only the directories matching the filter. In-memory partitioning (repartition, coalesce) controls parallelism during computation. The filter must use the partition column directly, without functions — DATE_TRUNC on a timestamp disables pruning.',
        'Broadcast join is the fastest join: small table broadcast to all executors as a hash table, no shuffle. Threshold: 10 MB default (tunable). Sort-merge join handles large × large but requires two shuffles + two sorts. Force broadcast with broadcast() hint when Spark underestimates table size. Never broadcast a table that is actually large — OOM result.',
        'Data skew: one key value has far more rows than others. One task takes 10× longer than all others. Fix in order: (1) enable AQE skew join handling (cheapest — just a config), (2) salting (add random suffix to join key, explode small side), (3) two-stage aggregation for groupBy skew. Always check AQE first.',
        'AQE (Adaptive Query Execution, Spark 3.0+) — always enable in production: spark.sql.adaptive.enabled=true. It automatically coalesces small shuffle partitions, handles skewed join partitions, and can switch join strategies based on runtime data sizes. Reduces the need for manual tuning significantly.',
        'Shuffle partitions default (200) is wrong for most production jobs. Tune to match data volume: aim for 100-200 MB per shuffle partition after filtering. Formula: (input_data_bytes / 150_MB). AQE with coalescePartitions.enabled also adjusts automatically. Too few: underutilised parallelism. Too many: excessive task overhead.',
        'dbt incremental strategies: append (rows never change), merge (rows can update — row-level upsert), insert_overwrite (partition-level replacement — most efficient for time-partitioned data), delete+insert (fallback). Use merge_update_columns to limit columns updated on match — prevents unnecessary writes for unchanged columns.',
        'The small file problem: many small files from incremental writes → slow S3 LIST + many S3 GETs. Fix with Delta OPTIMIZE to compact files into 256 MB target size. Z-ORDER combines compaction with data co-location by column. Run OPTIMIZE daily on recently-written partitions. VACUUM removes files beyond retention.',
        'Cache strategically: if the same DataFrame is read twice in one pipeline run, cache() after the first read, use for both downstream operations, then unpersist() after use. Each S3 read has real cost in time and money. Redundant reads of large DataFrames are the easiest pipeline performance wins to find and fix.',
      ]} />


      {/* ── Next Module CTA ──────────────────────────────────────────────── */}
      <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 10, padding: '24px', marginTop: 40 }}>
        <p style={{ fontSize: 10, color: 'var(--muted)', letterSpacing: '.12em', textTransform: 'uppercase', fontFamily: 'var(--font-mono)', fontWeight: 700, margin: '0 0 10px' }}>
          What comes next
        </p>
        <p style={{ fontSize: 15, color: 'var(--text)', lineHeight: 1.85, margin: '0 0 20px' }}>
          Module 44 covers DataOps and CI/CD for data pipelines — how to test pipeline changes before they hit production, staging environment design, rollback strategies, and automated deployment patterns.
        </p>
        <Link href="/learn/data-engineering/cicd-pipelines" style={{ background: '#00e676', color: '#000', padding: '11px 24px', borderRadius: 7, fontWeight: 700, fontSize: 13, textDecoration: 'none', display: 'inline-block' }}>
          Module 44 → DataOps and CI/CD for Data Pipelines
        </Link>
      </div>
    </LearnLayout>
  )
}
