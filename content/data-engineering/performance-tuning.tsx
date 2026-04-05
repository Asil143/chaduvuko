import type { Metadata } from 'next'
import { LearnLayout } from '@/components/content/LearnLayout'
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
const Para = ({ children }: { children: React.ReactNode }) => (
  <p style={{ fontSize: 15, color: 'var(--text)', lineHeight: 1.9, marginBottom: 20 }}>{children}</p>
)
const CodeBox = ({ children, label }: { children: string; label?: string }) => (
  <div style={{ marginBottom: 24 }}>
    {label && <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--muted)', letterSpacing: '.1em', textTransform: 'uppercase', marginBottom: 6, fontFamily: 'var(--font-mono)' }}>{label}</div>}
    <pre style={{ background: 'var(--bg2)', border: '1px solid var(--border)', borderRadius: 10, padding: '18px 22px', overflowX: 'auto', fontSize: 13, lineHeight: 1.9, color: 'var(--text)', fontFamily: 'var(--font-mono)', margin: 0, whiteSpace: 'pre-wrap' }}>
      <code>{children}</code>
    </pre>
  </div>
)
const Divider = () => <div style={{ borderTop: '1px solid var(--border)', margin: '52px 0' }} />
const HighlightBox = ({ children }: { children: React.ReactNode }) => (
  <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 12, padding: '24px 28px', marginBottom: 24 }}>{children}</div>
)

interface TableRow { [key: string]: string }
interface CompareTableProps { headers: { label: string; color?: string }[]; rows: TableRow[]; keys: string[] }
const CompareTable = ({ headers, rows, keys }: CompareTableProps) => (
  <div style={{ overflowX: 'auto', marginBottom: 28 }}>
    <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13, lineHeight: 1.6 }}>
      <thead><tr>{headers.map((h, i) => (
        <th key={h.label} style={{ padding: '10px 16px', textAlign: 'left', fontSize: i === 0 ? 10 : 11, fontWeight: 700, letterSpacing: i === 0 ? '.12em' : '.06em', textTransform: 'uppercase', color: h.color ?? 'var(--muted)', fontFamily: 'var(--font-mono)', borderBottom: h.color ? `2px solid ${h.color}` : '1px solid var(--border)', background: h.color ? `${h.color}08` : 'var(--bg2)', minWidth: i === 0 ? 130 : 150 }}>{h.label}</th>
      ))}</tr></thead>
      <tbody>{rows.map((row, i) => (
        <tr key={i} style={{ background: i % 2 === 0 ? 'var(--surface)' : 'var(--bg2)' }}>{keys.map((k, ki) => (
          <td key={k} style={{ padding: '10px 16px', color: ki === 0 ? 'var(--muted)' : 'var(--text)', fontSize: ki === 0 ? 11 : 13, fontFamily: ki === 0 ? 'var(--font-mono)' : 'inherit', fontWeight: ki === 0 ? 700 : 400, textTransform: ki === 0 ? 'uppercase' : 'none', letterSpacing: ki === 0 ? '.06em' : 'normal', borderBottom: '1px solid var(--border)', borderLeft: ki > 0 && headers[ki]?.color ? `2px solid ${headers[ki].color}40` : ki > 0 ? '1px solid var(--border)' : 'none', verticalAlign: 'top' }}>{row[k]}</td>
        ))}</tr>
      ))}</tbody>
    </table>
  </div>
)

export default function PerformanceTuningModule() {
  return (
    <LearnLayout
      title="Performance Tuning — Spark, SQL, and Pipeline Optimisation"
      description="Spark execution model, partitioning, shuffles, broadcast joins, predicate pushdown, SQL query planning, incremental strategies, and diagnosing slow pipelines."
      section="Data Engineering"
      readTime="70 min"
      updatedAt="March 2026"
    >

      {/* ── Part 01 — The Performance Mindset ────────────────────────── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 01 — The Performance Mindset" />
        <SectionTitle>Performance Tuning Is Diagnosis First, Optimisation Second</SectionTitle>

        <Para>
          The most common performance mistake is applying optimisations without
          diagnosing the bottleneck. A data engineer who reads "use broadcast
          joins for small tables" and adds broadcast hints to every join will
          create out-of-memory errors on joins where the "small" table is actually
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

        <CodeBox label="Spark execution model — the complete mental model">{`SPARK EXECUTION HIERARCHY:

  APPLICATION → one SparkContext (or SparkSession)
    JOB → one per action (collect(), count(), write(), show())
      STAGE → one per shuffle boundary
        TASK → one per partition (runs on one executor core)

ONE ACTION = ONE JOB:
  df.write.parquet('/path')    ← triggers one job
  df.count()                   ← triggers another job (separate action)
  df.cache()                   ← does NOT trigger a job — lazy evaluation!
  df.cache().count()           ← triggers a job that materialises + counts

STAGES AND SHUFFLE BOUNDARIES:
  A stage boundary is created whenever data must be redistributed
  across partitions. This requires a SHUFFLE.

  Transformations that cause a shuffle (= new stage boundary):
    groupBy() + agg()    ← rows with same key must go to same partition
    join()               ← rows with same join key must meet on same node
    distinct()           ← duplicates across partitions must compare
    repartition(n)       ← explicit redistribution
    orderBy()            ← global sort requires all data to sort together

  Transformations that do NOT cause a shuffle (= same stage):
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
      .write.parquet('/gold/daily')           ← triggers all stages

  Spark creates 3 stages. Stage 1 runs in parallel. Stage 2 and 3
  each require waiting for the previous stage's shuffle to complete.

PARTITIONS — the unit of parallelism:
  One task processes one partition.
  More partitions = more parallelism (up to available cores).
  Too few partitions: executor cores idle, slow pipeline.
  Too many partitions: shuffle overhead, task scheduling overhead.

  RECOMMENDED PARTITION SIZE: 100-200 MB after reading/filtering
  Total cores in cluster × 2-4 = good default partition count

  Default shuffle partitions: spark.sql.shuffle.partitions = 200
  200 is too low for large datasets, too high for small ones.
  Tune per job:
    spark.conf.set('spark.sql.shuffle.partitions', '400')

  ADAPTIVE QUERY EXECUTION (AQE — Spark 3.0+):
    spark.conf.set('spark.sql.adaptive.enabled', 'true')
    AQE automatically adjusts partition count after each shuffle
    based on actual data sizes. Reduces need for manual tuning.
    ALWAYS enable AQE in production.`}</CodeBox>

        <SubTitle>Reading the Spark UI — finding the bottleneck</SubTitle>

        <CodeBox label="Spark UI — what to look for and what each metric means">{`SPARK UI TABS TO CHECK:

  STAGES TAB:
  ─────────────────────────────────────────────────────────────────────
  Each row = one stage. Click into a stage to see task-level metrics.
  Key columns:
    Duration:      total wall-clock time for this stage
    Input:         bytes read from storage (I/O bound if very high)
    Output:        bytes written to storage
    Shuffle Read:  bytes read from previous stage's shuffle (network bound)
    Shuffle Write: bytes written to next stage's shuffle (network bound)
    Spill (Mem):   data that didn't fit in memory, written to disk
    Spill (Disk):  bytes written to local disk during spill

  RED FLAGS:
    Stage takes 30 min, Input = 2 TB → I/O bound, need better partitioning
    Stage has Spill = 50 GB → memory bound, increase executor memory
    Stage has Shuffle Read = 500 GB → network bound, consider broadcast

  TASKS TAB (inside a stage):
  ─────────────────────────────────────────────────────────────────────
    Duration histogram: should be relatively uniform across tasks.
    ONE TASK IS 10× SLOWER THAN OTHERS → data skew (key imbalance)
    MOST TASKS TAKE 1s, ONE TAKES 8 MIN → skewed partition, investigate the key

  EXECUTORS TAB:
  ─────────────────────────────────────────────────────────────────────
    Cores used: should be near max during active stages
    Memory used / total: if consistently > 80% → consider more memory
    Task time vs GC time: if GC > 10% of task time → memory pressure

  SQL TAB (for DataFrame operations):
  ─────────────────────────────────────────────────────────────────────
    Physical plan with operator timings.
    Shows: FileScan, BroadcastHashJoin, SortMergeJoin, HashAggregate, Exchange
    Exchange = shuffle → high Exchange cost = network bottleneck
    BroadcastHashJoin = good, no shuffle
    SortMergeJoin = requires two shuffles + sort


READING THE PHYSICAL PLAN:
  df.explain(mode='cost')  ← shows estimated row counts and costs per operator

  == Physical Plan ==
  AdaptiveSparkPlan isFinalPlan=false
  +- == Current Plan ==
     HashAggregate(keys=[city], functions=[sum(revenue)])
     +- Exchange hashpartitioning(city, 200)    ← SHUFFLE HERE (Stage boundary)
        +- HashAggregate(keys=[city], functions=[partial_sum(revenue)])
           +- BroadcastHashJoin [store_id], [store_id], LeftOuter, ...
              :- Filter (date = 2026-03-17)                   ← no shuffle
              :  +- FileScan parquet (orders) PushedFilters=[date=2026-03-17]
              +- BroadcastExchange HashedRelationBroadcastMode  ← broadcast dim
                 +- FileScan parquet (dim_store)

  Reading this: FileScan reads orders (filter pushed to file reader).
  BroadcastExchange broadcasts dim_store (small) to all executors.
  BroadcastHashJoin: join without shuffle — fast.
  Exchange before HashAggregate: one shuffle for city-level aggregation.
  Total: 2 stages, 1 shuffle, 1 broadcast. Clean plan.`}</CodeBox>
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

        <CodeBox label="File partitioning vs in-memory partitioning — the critical distinction">{`FILE PARTITIONING (on disk — how data is organised in S3/HDFS):
  Determined by: partitionBy() when writing

  df.write \
    .partitionBy('order_date', 'store_id') \
    .parquet('s3://freshmart-lake/silver/orders/')

  Creates directory structure:
    silver/orders/order_date=2026-03-17/store_id=ST001/part-00001.parquet
    silver/orders/order_date=2026-03-17/store_id=ST002/part-00001.parquet
    silver/orders/order_date=2026-03-16/store_id=ST001/part-00001.parquet
    ...

  BENEFIT: partition pruning at read time.
    spark.read.parquet('s3://...') \
        .filter(col('order_date') == '2026-03-17') \
        .filter(col('store_id')   == 'ST001')
    → Spark reads ONLY silver/orders/order_date=2026-03-17/store_id=ST001/
    → Instead of scanning all partitions
    → 99% less I/O if data has many dates and stores

  CHOOSING PARTITION COLUMNS:
    ✓ Columns most commonly used in WHERE filters
    ✓ Low-to-medium cardinality (date: 365 values/year — good)
    ✗ High cardinality (customer_id: millions — too many small files)
    ✓ Columns whose values are known at write time (not derived)

  FILE SIZE WITHIN PARTITIONS:
    Target: 100-500 MB per file (before compression)
    Too small: millions of tiny files → S3 LIST API overhead → slow reads
    Too large: low parallelism → fewer tasks → underutilised cluster
    Use OPTIMIZE (Delta Lake) to compact small files into target size:
      OPTIMIZE delta.\`s3://freshmart/silver/orders\`
          WHERE order_date >= '2026-03-01';


IN-MEMORY PARTITIONING (during computation — how data is split across executors):
  Determined by: repartition(), coalesce(), or shuffle operations

  # Read partitioned data — Spark creates one task per file:
  df = spark.read.parquet('s3://freshmart/silver/orders/')
  df.rdd.getNumPartitions()   # might be 2,000 (one per file)

  # Too many small partitions → too much overhead:
  df = df.coalesce(200)       # reduce without shuffle (downstream only)

  # Repartition by join key — align for co-located joins:
  df = df.repartition(400, col('store_id'))
  dim = dim.repartition(400, col('store_id'))
  # Now both DataFrames have the same partition key → join without shuffle!
  result = df.join(dim, on='store_id', how='left')
  # Spark detects that both DataFrames are partitioned by store_id
  # → uses SortMergeJoin without re-shuffling either side


PARTITION SKEW — the silent performance killer:
  Partition skew = one partition has vastly more data than others.
  Cause: one key value dominates the data.
    store_id='ST001' has 50M rows,  all others have 100K rows.
  Effect: one task processes 50M rows while others finish in seconds.
          Pipeline waits for the single slow task.

  DIAGNOSIS: Spark UI → Stages → Tasks → duration histogram
  One task 10× longer than others → skew on the groupBy/join key

  FIX 1 (Spark): AQE skew join handling (Spark 3.0+)
    spark.conf.set('spark.sql.adaptive.skewJoin.enabled', 'true')
    spark.conf.set('spark.sql.adaptive.skewJoin.skewedPartitionFactor', '5')
    AQE automatically splits skewed partitions and handles the skewed key.

  FIX 2 (manual): salting — add a random suffix to the skewed key
    from pyspark.sql import functions as F

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

        <CodeBox label="Spark join strategies — when each is used and how to force them">{`JOIN STRATEGY 1: BROADCAST HASH JOIN (BHJ)
  Used when: one table fits in executor memory
  Threshold: spark.sql.autoBroadcastJoinThreshold = 10 MB (default)
  Mechanism: small table broadcast to ALL executors → hash table in memory
             large table stays in place → each partition queries the hash table
  No shuffle needed → fastest join type
  Limitation: small table must fit in memory × number of executors

  WHEN TO USE:
    fact_orders (500M rows) JOIN dim_store (10 stores) → BROADCAST dim_store
    fact_orders (500M rows) JOIN dim_date (11,000 rows) → BROADCAST dim_date

  FORCING BROADCAST (when Spark doesn't auto-detect):
    from pyspark.sql.functions import broadcast
    result = df_orders.join(broadcast(df_dim_store), on='store_id', how='left')
    # Or via hint:
    result = df_orders.join(
        df_dim_store.hint('broadcast'), on='store_id', how='left'
    )

  TUNING THRESHOLD:
    spark.conf.set('spark.sql.autoBroadcastJoinThreshold', str(100 * 1024 * 1024))
    # 100 MB — broadcast tables up to 100 MB automatically


JOIN STRATEGY 2: SORT MERGE JOIN (SMJ)
  Used when: both tables are large, cannot broadcast either
  Mechanism:
    1. Shuffle both DataFrames by join key to same partitions
    2. Sort both sides within each partition
    3. Merge-join within each partition
  Cost: 2 shuffles + 2 sorts → most expensive join type
  Benefit: handles arbitrarily large tables

  OPTIMISATION: pre-sort both sides on the join key before the join
    df_orders = df_orders.repartition(400, col('store_id')) \
                         .sortWithinPartitions('store_id')
    df_events = df_events.repartition(400, col('store_id')) \
                         .sortWithinPartitions('store_id')
    # Now the join sees pre-sorted, co-partitioned data
    # Spark can use SortMergeJoin without re-shuffling either side
    result = df_orders.join(df_events, on='store_id', how='inner')


JOIN STRATEGY 3: SHUFFLE HASH JOIN (SHJ)
  Used when: one table is smaller but not small enough to broadcast
  Mechanism: shuffle both sides, build hash table from smaller side
             probe hash table with larger side rows
  Better than SMJ when: build side is significantly smaller than probe side
  Worse than BHJ:       still requires a shuffle

  FORCING SHJ:
    result = df_orders.join(
        df_medium.hint('shuffle_hash'), on='store_id', how='left'
    )


CARTESIAN JOIN — the accidental performance disaster:
  A Cartesian product (CROSS JOIN or missing join condition) multiplies rows.
  10,000 orders × 10,000 products = 100,000,000 rows.
  10M orders × 10K products = 100,000,000,000 rows → OOM / never finishes.

  SPARK PROTECTION:
    spark.conf.set('spark.sql.crossJoin.enabled', 'false')  # default: raises error
  
  WHEN CARTESIAN IS INTENTIONAL (and safe):
    df.crossJoin(spark.range(10))  # explode each row 10× for salting
    Small × small (e.g., 12 months × 10 stores = 120 rows) is fine.

JOIN ORDER — the planner might get it wrong:
  Spark joins tables in the order they appear in the query plan.
  Best practice: filter aggressively before joining.
  Join the smallest intermediate result first.

  BAD: join 500M orders to 10M payments, then filter to one day
  GOOD: filter orders to one day (500K rows) THEN join to payments
  
  EXAMPLE:
    # BAD: filter after join
    df.join(payments, on='order_id').filter(col('date') == '2026-03-17')

    # GOOD: filter before join
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
          Spark. The warehouse's query optimiser handles much of the physical
          execution planning, but data engineers must still understand which
          SQL patterns are expensive and which are cheap, and how to diagnose
          slow queries using the query profile.
        </Para>

        <CodeBox label="SQL performance patterns — expensive vs cheap, with fixes">{`EXPENSIVE PATTERN 1: Functions on filter columns disable pruning

  -- SLOW: function on date column prevents micro-partition pruning
  SELECT * FROM silver.orders
  WHERE DATE_TRUNC('day', created_at) = '2026-03-17';
  -- Snowflake cannot compare the function result to partition min/max.
  -- Result: full table scan. 10,000 micro-partitions → 10,000 scanned.

  -- FAST: range filter on raw column enables pruning
  SELECT * FROM silver.orders
  WHERE created_at >= '2026-03-17'::TIMESTAMPTZ
    AND created_at <  '2026-03-18'::TIMESTAMPTZ;
  -- Snowflake compares range to min/max metadata per partition.
  -- Result: 14 micro-partitions scanned out of 10,000. 99.9% pruning.

  SAME PROBLEM IN BIGQUERY:
  -- SLOW: function prevents partition pruning
  WHERE DATE(created_at) = '2026-03-17'
  -- FAST: raw partition column filter
  WHERE created_at >= '2026-03-17' AND created_at < '2026-03-18'


EXPENSIVE PATTERN 2: SELECT * reads all columns

  -- SLOW: reads all 200 columns
  SELECT * FROM fct_orders_wide WHERE date = '2026-03-17';
  -- In BigQuery: billed for ALL columns × ALL rows.
  -- In Snowflake: reads all column micro-partition data.

  -- FAST: only read needed columns
  SELECT order_id, store_id, order_amount, customer_tier
  FROM fct_orders_wide
  WHERE date = '2026-03-17';
  -- Columnar storage: only 4 columns read. ~200× less I/O for a 200-column table.


EXPENSIVE PATTERN 3: DISTINCT instead of GROUP BY for aggregation

  -- SLOW for large datasets:
  SELECT DISTINCT customer_id FROM silver.orders
  WHERE date = '2026-03-17';
  -- DISTINCT requires a full deduplicate — sorts or hashes all values.

  -- FASTER for counting:
  SELECT COUNT(DISTINCT customer_id) FROM silver.orders
  WHERE date = '2026-03-17';
  -- COUNT DISTINCT with HyperLogLog approximation (allowed in most cases):
  SELECT APPROX_COUNT_DISTINCT(customer_id) FROM silver.orders
  WHERE date = '2026-03-17';
  -- HyperLogLog: ~2% error, 100× faster for large datasets.


EXPENSIVE PATTERN 4: Correlated subqueries re-execute per row

  -- SLOW: correlated subquery runs once per order row
  SELECT o.order_id, o.order_amount,
      (SELECT AVG(order_amount) FROM silver.orders o2
       WHERE o2.store_id = o.store_id AND o2.date = o.date)
       AS store_daily_avg
  FROM silver.orders o;
  -- For 500K orders: runs the subquery 500K times. Extremely slow.

  -- FAST: window function, computed once over all rows
  SELECT order_id, order_amount,
      AVG(order_amount) OVER (
          PARTITION BY store_id, date
      ) AS store_daily_avg
  FROM silver.orders;
  -- Window function scans data once. 1000× faster.


EXPENSIVE PATTERN 5: UNION ALL with repeated full scans

  -- SLOW: two full scans
  SELECT 'delivered' AS status, COUNT(*) FROM orders WHERE status = 'delivered'
  UNION ALL
  SELECT 'cancelled' AS status, COUNT(*) FROM orders WHERE status = 'cancelled';
  -- Two separate passes over the entire table.

  -- FAST: conditional aggregation, one scan
  SELECT
      COUNT(CASE WHEN status = 'delivered' THEN 1 END) AS delivered_count,
      COUNT(CASE WHEN status = 'cancelled' THEN 1 END) AS cancelled_count
  FROM silver.orders;
  -- One table scan, two aggregates. 2× faster (or more with caching).


SNOWFLAKE-SPECIFIC: QUALIFY clause for window function filtering
  -- SLOW: subquery to filter window function result
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
          A dbt model with <code style={{ fontFamily: 'var(--font-mono)', fontSize: 13 }}>materialized='table'</code> rebuilds
          the entire table on every run. For a Silver model with 500 million
          rows, a full rebuild takes hours. Incremental models process only
          new or changed rows, reducing run time from hours to minutes.
          Getting the incremental strategy right is one of the most impactful
          performance choices for a dbt-based platform.
        </Para>

        <CodeBox label="dbt incremental strategies — append, merge, insert_overwrite, delete+insert">{`STRATEGY 1: append (simplest — just adds new rows)
{{ config(
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
AVOID WHEN: rows can be updated (orders change status) → creates duplicates.


STRATEGY 2: merge (upsert — handles inserts and updates)
{{ config(
    materialized='incremental',
    incremental_strategy='merge',
    unique_key='order_id',
    merge_update_columns=['status', 'updated_at', 'delivered_at'],
) }}
SELECT * FROM {{ ref('stg_orders') }}
{% if is_incremental() %}
    WHERE updated_at > (
        SELECT MAX(silver_updated_at) - INTERVAL '30 minutes'
        FROM {{ this }}
    )
{% endif %}

USE WHEN: rows can change over time (orders change status, customers update city).
MERGE SEMANTICS:
  ON CONFLICT (order_id):
    → MATCH + conditions met: UPDATE only merge_update_columns
    → NO MATCH: INSERT new row
    → MATCH + conditions not met: nothing (prevents re-updating unchanged rows)
PERFORMANCE:
  merge_update_columns limits how many columns are updated per match.
  Without it: all columns updated even if unchanged → wasteful.
  The overlap window (- INTERVAL '30 minutes') catches late-arriving Bronze rows.


STRATEGY 3: insert_overwrite (partition-level replacement)
{{ config(
    materialized='incremental',
    incremental_strategy='insert_overwrite',
    partition_by={
        'field': 'order_date',
        'data_type': 'date',
        'granularity': 'day',
    },
) }}
SELECT * FROM {{ ref('stg_orders') }}
{% if is_incremental() %}
    WHERE order_date >= CURRENT_DATE - 2  -- rebuild last 2 days
{% endif %}

USE WHEN: large time-partitioned tables where partition-level replacement
          is more efficient than row-level merge. Rewrites only affected date
          partitions — not the entire table, not row-by-row.
BEST FOR: BigQuery (native partition-level overwrite, very cheap).
          Also effective on Spark Delta Lake (replaces whole partition files).
AVOID WHEN: multiple keys updated across many partitions → merge is better.


STRATEGY 4: delete+insert (explicit delete then insert)
{{ config(
    materialized='incremental',
    incremental_strategy='delete+insert',
    unique_key='order_id',
) }}
-- dbt generates:
-- DELETE FROM {{ this }} WHERE order_id IN (SELECT order_id FROM __new_rows)
-- INSERT INTO {{ this }} SELECT * FROM __new_rows
USE WHEN: merge is not supported by the target database adapter.
          Less efficient than merge for high-update tables.


CHOOSING THE RIGHT STRATEGY:
  Event log (never updates):           append
  Entity current state (updates):      merge
  Large time-series, few key changes:  insert_overwrite by date partition
  Non-merge-supporting DB:             delete+insert

INCREMENTAL FILTER WINDOW:
  The filter must be wide enough to catch late-arriving rows.
  A 30-minute overlap ensures rows that arrive slightly after the
  last Silver run are still processed:
  WHERE updated_at > (SELECT MAX(silver_updated_at) - INTERVAL '30 minutes' FROM {{ this }})

  For sources with up to 24h late arrival: use 25h overlap.
  Wide overlap = more rows processed per run = slower but more correct.
  Narrow overlap = faster but risks missing late arrivals.`}</CodeBox>

        <SubTitle>File compaction — solving the small file problem</SubTitle>

        <CodeBox label="Small file problem — causes, costs, and Delta OPTIMIZE">{`THE SMALL FILE PROBLEM:
  A dbt incremental merge writes a few thousand rows per run.
  Each run appends small Parquet files to the Delta table.
  After 90 days of daily runs: 90 small files in the partition.
  Each small file requires a separate S3 GET request.
  Reading 100 columns from 90 × 5 MB files = 90 × 100 S3 GETs = 9,000 requests.
  Reading 100 columns from 1 × 450 MB file = 1 × 100 S3 GETs = 100 requests.
  → 90× more S3 API calls → much slower reads.

  The problem compounds: after 1 year of hourly incremental runs on
  a busy table: 8,760 files. S3 LIST alone takes seconds before reading starts.

DIAGNOSIS (Delta Lake):
  DESCRIBE HISTORY silver.orders;
  -- Look at numFiles per version — rapidly growing file count = small file problem

  SELECT file_path, size FROM silver.orders.files
  ORDER BY size ASC LIMIT 20;
  -- Many files under 1 MB = small file problem

FIX — DELTA OPTIMIZE:
  -- Compact all small files in a partition into target size (256 MB default):
  OPTIMIZE silver.orders WHERE order_date = '2026-03-17';

  -- Compact ALL partitions (expensive — run during maintenance window):
  OPTIMIZE silver.orders;

  -- Z-ORDER (combines compaction with co-location by column):
  OPTIMIZE silver.orders ZORDER BY (store_id, order_date);
  -- Files with similar store_id and order_date values are co-located.
  -- Queries filtering by store_id skip ~90% of files after Z-ORDER.

AUTOMATING COMPACTION IN AIRFLOW:
  # Run after the daily dbt transformation:
  optimize_silver = BashOperator(
      task_id='optimize_silver_orders',
      bash_command=(
          'databricks jobs run-now --job-id optimize_silver_orders_job '
          '--job-parameters \'{"date": "{{ ds }}"}\''
      ),
  )
  dbt_silver >> dbt_gold >> optimize_silver

  # VACUUM: remove files no longer referenced by Delta:
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

        <CodeBox label="Pipeline-level optimisation patterns — the highest-impact changes">{`OPTIMISATION 1: Cache strategically — avoid reading the same data twice

  # BAD: silver.orders scanned TWICE in the same pipeline run
  silver_orders = spark.read.format('delta').load('/silver/orders')
  revenue_df  = silver_orders.filter(...).groupBy('store').agg(sum('amount'))
  customer_df = silver_orders.filter(...).groupBy('customer').agg(count('*'))
  revenue_df.write.parquet('/gold/revenue')
  customer_df.write.parquet('/gold/customer_counts')
  # Spark reads /silver/orders twice from S3 — 2× the I/O.

  # GOOD: cache after the first read, use for both downstream operations
  silver_orders = spark.read.format('delta').load('/silver/orders')
  silver_orders.cache()
  silver_orders.count()   # trigger materialisation (eagerly cache)

  revenue_df  = silver_orders.filter(...).groupBy('store').agg(sum('amount'))
  customer_df = silver_orders.filter(...).groupBy('customer').agg(count('*'))
  revenue_df.write.parquet('/gold/revenue')
  customer_df.write.parquet('/gold/customer_counts')

  silver_orders.unpersist()  # release memory after use — important!
  # Now silver.orders is read from S3 ONCE, used for both Gold models.

  WHEN TO CACHE:
    ✓ Same DataFrame used 2+ times downstream in the same pipeline run
    ✓ Expensive intermediate result (join result) reused
    ✗ DataFrame only used once — cache adds overhead without benefit
    ✗ Very large DataFrames that don't fit in memory — spills to disk, slower


OPTIMISATION 2: Push filters down to the source

  # BAD: read all data, filter in Spark
  df = spark.read.format('delta').load('/silver/orders')
  df = df.filter(col('order_date') == '2026-03-17')
  # Spark reads ALL partitions, then filters — unnecessary I/O

  # GOOD: filter before reading (predicate pushdown)
  # For Delta Lake / Parquet: partition filters are automatically pushed down
  # when partitionBy() was used at write time.
  # This works automatically — just ensure the filter uses the partition column directly.
  df = spark.read.format('delta').load('/silver/orders') \
       .filter(col('order_date') == '2026-03-17')
  # Spark reads ONLY the order_date=2026-03-17 partition directory.
  # This is automatic for column filters on partition columns.

  # For non-partition column filters on Parquet:
  spark.conf.set('spark.sql.parquet.filterPushdown', 'true')  # default: true
  # Pushes row-group level filters into the Parquet reader.


OPTIMISATION 3: Tune executor configuration for the workload

  # EXECUTOR SIZING FORMULA (empirical):
  # For memory-intensive workloads (large joins, wide aggregations):
  executor_memory     = '16g'   # 16 GB per executor
  executor_cores      = 4       # 4 cores per executor
  overhead_memory     = '2g'    # JVM overhead (should be ~10-15% of executor_memory)
  # Rule of thumb: 4-5 cores per executor (beyond 5, GC pauses increase)

  # For compute-intensive workloads (many small operations):
  executor_memory = '8g'        # less memory needed per core
  executor_cores  = 4

  spark = SparkSession.builder \
      .config('spark.executor.memory',         '16g') \
      .config('spark.executor.cores',          '4') \
      .config('spark.executor.memoryOverhead', '2g') \
      .config('spark.driver.memory',           '8g') \
      .config('spark.sql.adaptive.enabled',    'true') \
      .config('spark.sql.adaptive.coalescePartitions.enabled', 'true') \
      .config('spark.sql.shuffle.partitions',  '400') \
      .getOrCreate()

OPTIMISATION 4: Coalesce vs repartition — know the difference

  # repartition(n): full shuffle, creates exactly n equal partitions
  # Use when: data is severely unbalanced, need specific partition count

  # coalesce(n): no shuffle, merges existing partitions
  # Use when: reducing partition count AFTER filtering
  # Benefit: avoids network traffic

  df = spark.read.parquet(...)  # 2,000 partitions (one per file)
      .filter(col('date') == '2026-03-17')  # now 95% of partitions empty
  df = df.coalesce(50)   # merge 2,000 into 50 without shuffle
  # vs repartition(50) which would shuffle all data through network

  WHEN TO REPARTITION:
    Before a join: repartition both sides on the join key (co-partitioning)
    Before orderBy: repartition to reduce final sort data
    When partition sizes are very uneven

  WHEN TO COALESCE:
    After aggressive filter that leaves most partitions nearly empty
    Before writing: reduce file count (fewer but larger files)
    Never coalesce BEFORE a shuffle operation — the coalesce is wasted`}</CodeBox>
      </section>

      <Divider />

      {/* ── Part 08 — Real World ─────────────────────────────────────── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 08 — Real World" />
        <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '.12em', textTransform: 'uppercase', color: 'var(--muted)', marginBottom: 12, fontFamily: 'var(--font-mono)' }}>
          💼 What This Looks Like at Work
        </div>
        <SectionTitle>A Silver Pipeline That Took 4 Hours Gets to 22 Minutes</SectionTitle>

        <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 12, padding: '24px 28px', marginBottom: 24 }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--accent)', background: 'rgba(0,230,118,0.1)', border: '1px solid rgba(0,230,118,0.2)', borderRadius: 6, padding: '4px 10px', fontFamily: 'var(--font-mono)', display: 'inline-block', marginBottom: 20, letterSpacing: '.1em', textTransform: 'uppercase' }}>
            Scenario — FreshMart · Silver orders pipeline misses its 08:00 IST SLA daily
          </div>

          <Para>
            The Silver orders pipeline runs from 06:00 IST and is supposed to
            complete by 07:30 IST, giving Gold 30 minutes before analysts arrive.
            It has been completing at around 10:00 IST. The data team is asked
            to fix it. The pipeline processes 180 million orders in Bronze,
            transforming them to Silver via a Spark job on a 10-node cluster.
          </Para>

          <CodeBox label="Performance diagnosis and remediation — step by step">{`STEP 1: Read the Spark UI stages tab.

  Stage 1 (file read + filter): 3 min    ← reasonable
  Stage 2 (join with dim_store): 2.5 hr  ← THE BOTTLENECK
  Stage 3 (aggregation):         35 min

  Stage 2 is 2.5 hours. Click into Stage 2 Tasks.
  Tasks duration histogram: 1 task = 142 min, all others = 8-12 min.
  ONE TASK IS 18× SLOWER → classic data skew.

STEP 2: Identify the skewed key.

  # Check the join key distribution:
  df.groupBy('store_id').count().orderBy('count', ascending=False).show(10)
  # Results:
  # ST001  148,000,000  ← ONE store has 148M of 180M rows (82%)!
  # ST002    4,200,000
  # ST003    3,800,000
  # ... (remaining 9 stores share 28M rows)

  # ST001 is FreshMart HQ — all online orders route through this store_id.
  # The join on store_id puts all 148M ST001 rows in one partition.
  # One executor task processes 148M rows. Others process 3-4M each.

STEP 3: Fix the skew with AQE (cheapest fix — try first).

  spark.conf.set('spark.sql.adaptive.enabled', 'true')
  spark.conf.set('spark.sql.adaptive.skewJoin.enabled', 'true')
  spark.conf.set('spark.sql.adaptive.skewJoin.skewedPartitionFactor', '3')
  spark.conf.set('spark.sql.adaptive.skewJoin.skewedPartitionThresholdInBytes',
                 str(256 * 1024 * 1024))  # flag partitions > 256 MB as skewed
  # AQE splits the skewed ST001 partition into multiple sub-partitions.

  RE-RUN RESULT: Stage 2 = 38 min. 4× better. But still not enough.

STEP 4: Investigate Stage 3 (35 min aggregation).

  Stage 3 tasks: all 200 tasks, each taking 10-15 min.
  Input per task: ~80 MB (reasonable)
  Shuffle read: 200 MB per task.
  But: spark.sql.shuffle.partitions = 200 (default)
  200 shuffle partitions for 180M rows = 900K rows per partition.
  Each partition has a shuffle read AND a second pass aggregation.
  The 200-partition default is too low — not enough parallelism.

  FIX: increase shuffle partitions
  spark.conf.set('spark.sql.shuffle.partitions', '800')
  # 800 shuffle partitions for 180M rows = 225K rows per partition.
  # 4× more parallelism in the aggregation stage.

  RE-RUN RESULT: Stage 3 = 9 min (was 35 min). Stage 2 = 34 min.

STEP 5: Investigate remaining Stage 2 time.

  After AQE: no more extreme skew. But 34 min for a join with dim_store?
  dim_store has 10 rows — it should be broadcast!
  Check: spark.conf.get('spark.sql.autoBroadcastJoinThreshold')
  = '10485760' (10 MB)

  But dim_store is loaded from a Delta table and dbt hasn't updated
  table statistics. Spark estimates dim_store = 500 MB (wrong).
  So broadcast threshold is not triggered.

  FIX: force broadcast hint
  dim_store_df = spark.read.format('delta').load('/silver/dim_store')
  orders_with_store = df_orders.join(
      broadcast(dim_store_df), on='store_id', how='left'
  )
  # BroadcastHashJoin replaces SortMergeJoin for the store dimension.
  # 10 rows broadcast to all executors. Zero shuffle.

  RE-RUN RESULT: Stage 2 = 6 min (was 34 min after AQE).

STEP 6: Check overall pipeline for redundant reads.

  The pipeline reads bronze.orders TWICE:
    - Once for the Silver orders transformation
    - Once for a parallel Silver order_events transformation
  Both read the same Bronze table, same filter.
  CACHE the Bronze read, use for both:

  bronze_orders = spark.read.format('delta') \
      .load('/bronze/orders') \
      .filter(col('_bronze_date') == run_date)
  bronze_orders.cache()
  bronze_orders.count()   # materialise

  FINAL PIPELINE TIMES:
    Stage 1 (read + filter):  3 min
    Stage 2 (join):           6 min  (was 2.5 hours)
    Stage 3 (aggregate):      9 min  (was 35 min)
    Stage 4 (second model):   4 min  (cache hit — was 12 min)
  Total: 22 min (was 4 hours)
  Improvement: 11× faster.
  SLA: now completes at 06:22 IST. Analysts have data by 06:30.

SUMMARY OF FIXES APPLIED:
  1. AQE skew join:          2.5 hr → 38 min (data skew resolved)
  2. Broadcast dim_store:    38 min → 6 min  (wrong join strategy)
  3. Shuffle partitions 800: 35 min → 9 min  (too few partitions)
  4. Cache Bronze read:      12 min → 4 min  (redundant S3 read eliminated)`}</CodeBox>
        </div>
      </section>

      <Divider />

      {/* ── Part 09 — Interview Prep ─────────────────────────────────── */}
      <section style={{ marginBottom: 64 }}>
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

      {/* ── Error Library ────────────────────────────────────────────── */}
      <section style={{ marginBottom: 64 }}>
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

    </LearnLayout>
  )
}