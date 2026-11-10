import type { Metadata } from 'next'
import { LearnLayout } from '@/components/content/LearnLayout'
import Link from 'next/link'
import { Callout } from '@/components/content/Callout'
import { KeyTakeaways } from '@/components/content/KeyTakeaways'
import { DEWorkshop, WorkshopCode, WorkshopAnswer } from '@/components/content/DEWorkshop'

export const metadata: Metadata = {
  title: 'Spark Performance — Partitions, Shuffles and Joins | Data Engineering | Chaduvuko',
  description: 'Diagnose Spark jobs with partition sizing, shuffle analysis, join strategies, skew handling, adaptive query execution, and careful caching.',
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

export default function SparkPerformanceTuningModule() {
  return (
    <LearnLayout title="Spark Performance — Partitions, Shuffles and Joins" description="Diagnose Spark bottlenecks by reasoning about partitions, shuffles, join strategies, skew, AQE, and caching." section="Data Engineering — Lesson 49" readTime="40 min">
      <section style={{ marginBottom: 56 }}>
        <SectionTag text="// Part 01 — Start with Measurement" />
        <SectionTitle>Performance Tuning Is a Diagnosis, Not a List of Knobs</SectionTitle>
        <Para>A Spark job that is slow in production can be limited by input/output, CPU, network, memory pressure, scheduling overhead, a skewed key, an inefficient query plan, or a downstream service. Increasing executors or memory before locating the bottleneck can raise cost without improving throughput. Start with a repeatable workload and a baseline: input files and bytes, rows read and written, elapsed time, stage duration, shuffle traffic, spill, executor utilization, and result checks.</Para>
        <Para>Use the Spark UI and query plan to form one hypothesis at a time. If most time is in a table scan, inspect file size, selected columns, predicate pushdown, and partition pruning. If an exchange dominates, inspect the operation that requires redistribution. If one task is much slower than its peers, inspect input size and key frequencies. If every task is slow, investigate a different cause: inadequate resources, remote storage, expensive expressions, or serialization overhead. Confirm the result remains correct after each change.</Para>
        <Para>For a fictional Chennai mobility dashboard, a daily aggregation of trip events by service zone may read a large event table, join a small zone dimension, and group by date and zone. The workload should process only the requested interval, preserve late-arrival handling, and maintain the expected row grain. A faster plan that drops unmatched records or double-counts reruns is not an optimization.</Para>
        <Callout label="Tuning checklist" type="info">Capture the physical plan, stage graph, data sizes, task-duration distribution, shuffle and spill metrics, and an output reconciliation before changing settings. Keep the data and job parameters the same for the before/after comparison.</Callout>
      </section>

      <section style={{ marginBottom: 56 }}>
        <SectionTag text="// Part 02 — Partition Sizing and Parallelism" />
        <SectionTitle>Balance Work Without Creating a Sea of Tiny Tasks</SectionTitle>
        <Para>Partitions define how Spark divides data-processing work into tasks. With too few partitions, a cluster can sit idle while each task handles a large amount of data and memory. With too many tiny partitions, task scheduling and file overhead can dominate the useful computation. The right shape depends on input size, record width, computation, available cores, memory per task, source file layout, and any shuffle that follows. A fixed partition count is not universally optimal.</Para>
        <Para>Distinguish runtime partitions from table or directory partitions. A table partitioned by business date enables engines to skip files for other dates when the predicate and layout support pruning. Runtime partitions determine task granularity. A dataset can have many date folders yet still be read with too few tasks, or it can have many runtime tasks scanning files without a helpful directory partition scheme. Avoid high-cardinality directory partitioning when it would produce a large number of tiny paths and small files.</Para>
        <Para><code>repartition</code> can redistribute data and commonly incurs a shuffle, which can increase parallelism or balance a later stage when used deliberately. A keyed repartition can co-locate records by a key, but it does not make skew disappear: a frequent key still maps to a hot partition. <code>coalesce</code> is often used to reduce partition count with less data movement, but may keep uneven partitions and reduce concurrency. Inspect the result rather than treating either function as a universal fix.</Para>
        <CodeBox label="PySpark examples — compare actual plan and task metrics">{`from pyspark.sql import functions as F

# Prefer filtering and projecting before an expensive redistribution.
filtered = (
    events.filter(F.col("event_date") == F.lit("2026-11-08"))
    .select("zone_id", "duration_seconds")
)

# A keyed repartition is a hypothesis to test, not a default setting.
balanced_candidate = filtered.repartition(48, "zone_id")

# Reducing output tasks can limit small files, but measure write parallelism.
# A coalesce does not guarantee equal-sized output partitions.
compact_candidate = balanced_candidate.coalesce(12)`}</CodeBox>
        <Para>These counts are illustrative, not recommendations. Derive a candidate from observed volume and available resources, then benchmark on representative data. If a date predicate does not prune input, adding more output partitions cannot fix the unnecessary scan. If one zone holds most records, a simple repartition by zone repeats the same concentration. Check the physical plan for exchanges and compare task-level input sizes before making conclusions.</Para>
      </section>

      <section style={{ marginBottom: 56 }}>
        <SectionTag text="// Part 03 — Shuffle Mechanics" />
        <SectionTitle>Wide Operations Move Data Between Workers</SectionTitle>
        <Para>A shuffle redistributes records across partitions, often so equal keys can be processed together. Grouped aggregates, many joins, repartitions, and distinct operations can require a shuffle. Spark divides execution into stages around such dependencies. During a shuffle, tasks may serialize records, send them over the network, sort or combine data, and spill intermediate blocks to local disk. The operation can be expensive even when the source code is only one line.</Para>
        <Para>Before a shuffle, reduce input volume safely: filter to the correct interval, select only required fields, remove invalid rows under an explicit policy, and pre-aggregate when that preserves semantics. A partial aggregate may reduce bytes sent if many records share keys, but changes the plan and must preserve precision and null behavior. Avoid repeating a shuffle through multiple branches when a valid intermediate can be reused; do not cache blindly just to hide a poorly shaped plan.</Para>
        <Para>In the UI, inspect shuffle write and read, remote bytes, fetch wait, spill, and task distribution. Large shuffle data can indicate an expected business operation over a large dataset, so it is not automatically a bug. Compare bytes moved to input volume and estimate whether a different join strategy, earlier filtering, pre-aggregation, or a changed output grain can reduce movement. Verify that any pre-aggregation does not break distinct counts, late corrections, or exact business rules.</Para>
        <SubTitle>Push work to the source when it is safe</SubTitle>
        <Para>Columnar formats and capable data sources can sometimes apply filters and column selection during scanning. That reduces bytes read and work sent into Spark. Confirm pushdown in the plan or metrics; syntax alone does not guarantee it. Python UDFs can limit optimization opportunities and add Python/JVM data conversion costs. Prefer built-in expressions for common operations when they express the logic clearly, but do not replace a correct, testable transformation with a less understandable expression solely for an assumed performance gain.</Para>
      </section>

      <section style={{ marginBottom: 56 }}>
        <SectionTag text="// Part 04 — Join Strategies" />
        <SectionTitle>Choose a Join from Table Size, Keys, and Semantics</SectionTitle>
        <Para>A join is both a relational operation and a physical execution choice. A large-to-large join often redistributes both sides by key, creating shuffle traffic. A broadcast join sends a sufficiently small relation to workers so the larger side can be joined locally without repartitioning both sides. Broadcast can help when the dimension is genuinely small after filtering and projection, but it consumes memory on each executor. Broadcasting an unexpectedly large relation can cause memory pressure or failures.</Para>
        <Para>Before tuning a join, state its semantics: inner, left, semi, or another type; the join key; null handling; and whether the key is unique on either side. Duplicate keys can multiply output rows. A lookup table described as “small” can grow, so size it after selecting only needed columns and applying valid filters. Confirm that the estimated and observed sizes make the proposed strategy safe within the memory budget of all participating workers.</Para>
        <CodeBox label="Real PySpark — an explicit broadcast hint is still a hypothesis">{`from pyspark.sql import functions as F

zones_small = (
    spark.read.parquet("s3a://example/reference/zones/")
    .select("zone_id", "zone_name")
)
trips_day = trips.filter(F.col("event_date") == F.lit("2026-11-08"))

# Use only after validating the filtered dimension is safely small.
joined = trips_day.join(F.broadcast(zones_small), "zone_id", "left")
joined.explain("formatted")`}</CodeBox>
        <Para>The hint influences planning but does not establish that the relation fits safely or that the query is correct. Inspect the physical plan, executor memory, and output cardinality. A left join should preserve all left-side rows even when the zone lookup is missing; a quality check should count unmatched keys rather than silently dropping them. If both sides are large, a shuffle-based strategy may be appropriate, but partitioning, skew, and key distribution still matter.</Para>
        <Para>Join on the intended key types. Implicit casts can affect plan quality and sometimes change matching behavior. Normalize keys deliberately, handle nulls according to the contract, and avoid joining on a formatted display string when a stable identifier exists. For time-range or non-equi joins, inspect the supported strategy in the actual runtime; do not assume the same optimization as an equality join.</Para>
      </section>

      <section style={{ marginBottom: 56 }}>
        <SectionTag text="// Part 05 — Skew and Hot Keys" />
        <SectionTitle>One Heavy Partition Can Hold Back Every Other Task</SectionTitle>
        <Para>Data skew occurs when a small number of partition keys account for a disproportionate share of records or work. In a grouped aggregate by city, one exceptionally busy metro area can dominate a reducer. In a join, a single hot key may send a large fraction of records to one task. The cluster may show many completed tasks and one straggler. Simply adding executors often leaves the hot partition's work concentrated.</Para>
        <Para>Measure key frequencies, partition sizes, and task duration distributions, taking care not to emit sensitive identifiers. Check whether skew is real or caused by one unusually large input file, slow executor, retry, or uneven source partitioning. Understand null and sentinel keys too: mapping every missing key to the same placeholder can create a synthetic hot key. If a record is invalid, reject or quarantine it under a documented rule rather than silently hashing it into an arbitrary bucket.</Para>
        <Para>Possible responses include filtering or handling exceptional keys separately, pre-aggregating before a join when mathematically valid, salting a hot key and later combining results, or using adaptive skew handling where the deployed engine supports it. Salting increases complexity: for a join, the smaller side may need replication across salts, and any mistake can duplicate results. Define the transformation and reconciliation checks before using it. Adaptive query execution (AQE) can use runtime statistics to adjust certain plan decisions, but its exact behavior depends on Spark distribution, configuration, statistics, and query shape.</Para>
        <Callout label="AQE is not a substitute for understanding data" type="tip">Check whether adaptive execution is enabled and what the runtime actually changed in the final plan. It can help with some partition and join decisions, but it cannot repair an incorrect key, a bad source filter, or an invalid business grain.</Callout>
        <CodeBox label="A simple key-frequency query can reveal concentration">{`from pyspark.sql import functions as F

key_counts = events.groupBy("zone_id").count()
key_counts.orderBy(F.desc("count")).show(20, truncate=False)

# In production, consider privacy, sampling, output limits, and cardinality.
# Inspect the distribution and task metrics rather than only the top row.`}</CodeBox>
      </section>

      <section style={{ marginBottom: 56 }}>
        <SectionTag text="// Part 06 — Caching and Reuse" />
        <SectionTitle>Cache Only Data You Will Reuse and Can Afford to Keep</SectionTitle>
        <Para>Caching or persisting can avoid recomputing an expensive intermediate when several downstream actions reuse it. It is not automatically faster: the first action still computes the data, storage consumes executor memory or disk, and eviction may trigger recomputation. Persisting a one-use DataFrame can add overhead. Caching too many intermediates can displace useful data, increase garbage collection, and make other stages slower.</Para>
        <Para>Look for repeated lineage in the query and job graph. If multiple branches repeatedly scan and transform the same large input, benchmark caching the shared intermediate after filtering and projection. Materialize it deliberately if the execution model requires that, and unpersist it when the reuse window ends. Confirm that the intermediate is stable and that caching does not create stale results when source data can change between actions.</Para>
        <Para>Persistence levels and behavior are runtime-specific; select one from the data size, recomputation cost, and resource constraints rather than copying an example. For important intermediate outputs, a durable, versioned table can be safer than a cache, especially across job restarts. A cache is an execution optimization, not a checkpoint, transaction boundary, or durable source of truth.</Para>
        <CodeBox label="Illustrative PySpark reuse pattern">{`shared = expensive_transform(source).persist()
try:
    # The first action materialises the selected persisted data.
    shared.count()
    result_a = summarize_by_zone(shared)
    result_b = summarize_by_payment_type(shared)
    result_a.write.mode("overwrite").parquet(output_a)
    result_b.write.mode("overwrite").parquet(output_b)
finally:
    shared.unpersist()`}</CodeBox>
        <Para>The output operations shown are illustrative: overwrite is safe only when the destination's ownership, partition scope, and failure behavior are understood. A production job should normally use a controlled staging-and-publish or transactional-table approach, and should not delete unrelated output as a side effect of a broad overwrite. Persistence cleanup belongs in a reliable lifecycle path, but it does not make a non-atomic sink write safe.</Para>
      </section>

      <DEWorkshop title="Spot a hot key before changing the cluster" objective="Use deterministic partition and key counts to distinguish a skew problem from a cluster-size problem and select a measured next step." prerequisites="Spark task and partition concepts, equality joins, and the difference between a small dimension and a large fact table.">
        <p>This pure-standard-library model uses a fixed partition assignment instead of Python's process-randomized hash. It shows why one frequent key can dominate a partition and why a small lookup table may be broadcast only after its size and key uniqueness are checked. It does not execute Spark.</p>
        <WorkshopCode language="python" expectedOutput={"input_rows=6 partitions=2\npartition_sizes=[4, 2]\nhot_key_rows=4\njoin_strategy=broadcast-small-dimension\nmatched_rows=6"}>{`events = [
    ("Chennai", 10),
    ("Chennai", 11),
    ("Chennai", 12),
    ("Chennai", 13),
    ("Vijayawada", 14),
    ("Vijayawada", 15),
]

# Fixed routing makes this lesson's result deterministic.
partitions = {0: [], 1: []}
for event in events:
    target = 0 if event[0] == "Chennai" else 1
    partitions[target].append(event)

sizes = [len(partitions[index]) for index in sorted(partitions)]
key_counts = {}
for city, _ in events:
    key_counts[city] = key_counts.get(city, 0) + 1
print(f"input_rows={len(events)} partitions={len(partitions)}")
print(f"partition_sizes={sizes}")
print(f"hot_key_rows={max(key_counts.values())}")

dimension = {"Chennai": "TN", "Vijayawada": "AP"}
if len(dimension) <= 10 and len(dimension) == len(set(dimension)):
    strategy = "broadcast-small-dimension"
else:
    strategy = "review-join-plan"
matched = [(city, region, amount)
           for city, amount in events
           for region in [dimension.get(city)]
           if region is not None]
print(f"join_strategy={strategy}")
print(f"matched_rows={len(matched)}")`}</WorkshopCode>
        <p>The partition assignment makes the skew visible: one partition receives most rows even though two partitions exist. In a real job, a key-based shuffle could create this concentration. The small dictionary illustrates a lookup, not Spark's memory accounting or a production broadcast decision.</p>
        <h3>Practice: choose a tuning experiment</h3>
        <p>The UI shows a large shuffle and one reducer with four times as many records as the median. The join dimension is small today but is refreshed daily. Describe a safe first experiment and the evidence you would collect.</p>
        <WorkshopAnswer>
          <p>Verify the final plan and the actual post-filter size of the dimension; check key uniqueness, nulls, and unmatched records, and inspect executor memory. Establish the baseline's input, shuffle, task distribution, elapsed time, and join output count. If the dimension remains safely small, test a broadcast strategy on representative data and compare the plan, memory pressure, and output reconciliation. Track the dimension size over time so a once-safe hint does not become an operational hazard.</p>
          <p>Investigate the hot key separately. Consider whether the key is valid, whether records can be partially aggregated, and whether the deployed runtime's adaptive skew handling applies to this plan. If salting is proposed, specify how both sides are transformed and prove that the final rows are neither lost nor duplicated. Change one variable at a time and retain a rollback path.</p>
        </WorkshopAnswer>
        <p>Reference: <a href="https://spark.apache.org/docs/latest/sql-performance-tuning.html">Spark SQL performance tuning</a>. Confirm the behavior and configuration available in your deployed Spark environment.</p>
      </DEWorkshop>

      <KeyTakeaways items={[
        'Measure input, stage/task distributions, shuffle, spill, retries, and output correctness before tuning.',
        'Runtime partitions control task granularity; table partitions influence data layout and pruning. They solve different problems.',
        'Repartitioning can add a shuffle; coalescing can reduce parallelism and need not balance data.',
        'Wide operations redistribute records. Filter and project early when semantics permit, then inspect the physical plan.',
        'Broadcast only a genuinely small, filtered dimension that fits executor memory; validate key cardinality and join semantics.',
        'Skew creates stragglers when hot keys concentrate work. More executors do not automatically split that key.',
        'AQE can alter some decisions using runtime statistics, but support and behavior depend on the deployed runtime and plan.',
        'Persist an expensive reusable intermediate only after benchmarking; unpersist it and never mistake a cache for durable storage.',
      ]} />

      <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 10, padding: 24, marginTop: 40 }}>
        <p style={{ fontSize: 10, color: 'var(--muted)', letterSpacing: '.12em', textTransform: 'uppercase', fontFamily: 'var(--font-mono)', fontWeight: 700, margin: '0 0 10px' }}>What comes next</p>
        <p style={{ fontSize: 15, color: 'var(--text)', lineHeight: 1.85, margin: '0 0 20px' }}>Lesson 50 moves from processing jobs to coordinating them: Airflow DAGs, schedules, retries, idempotency, XCom, and sensors.</p>
        <Link href="/learn/data-engineering/airflow-orchestration" style={{ background: '#14b8a6', color: '#000', padding: '11px 24px', borderRadius: 7, fontWeight: 700, fontSize: 13, textDecoration: 'none', display: 'inline-block' }}>Lesson 50 → Apache Airflow — DAGs, Scheduling and Retries</Link>
      </div>
    </LearnLayout>
  )
}
