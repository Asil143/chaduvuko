import type { Metadata } from 'next'
import { LearnLayout } from '@/components/content/LearnLayout'
import { Callout } from '@/components/content/Callout'
import { KeyTakeaways } from '@/components/content/KeyTakeaways'
import { DEWorkshop, WorkshopCode, WorkshopAnswer } from '@/components/content/DEWorkshop'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Stream Processing — Spark Structured Streaming and Flink | Chaduvuko',
  description: 'Learn event time, windows, state, watermarks, checkpoints, and how Spark Structured Streaming and Flink approach continuous processing.',
}

const SectionTag = ({ text }: { text: string }) => <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '.14em', textTransform: 'uppercase', color: 'var(--muted)', fontFamily: 'var(--font-mono)', marginBottom: 10 }}>{text}</div>
const SectionTitle = ({ children }: { children: React.ReactNode }) => <h2 style={{ fontSize: 'clamp(20px,2.5vw,28px)', fontWeight: 900, letterSpacing: '-1px', color: 'var(--text)', marginBottom: 18, fontFamily: 'var(--font-display)', lineHeight: 1.2 }}>{children}</h2>
const Para = ({ children }: { children: React.ReactNode }) => <p style={{ fontSize: 15, color: 'var(--text)', lineHeight: 1.9, marginBottom: 20 }}>{children}</p>
const CodeBox = ({ children, language = 'python' }: { children: string; language?: string }) => <div style={{ marginBottom: 22 }}><div style={{ fontSize: 11, color: 'var(--muted)', fontFamily: 'var(--font-mono)', marginBottom: 6 }}>{language}</div><pre style={{ background: 'var(--bg2)', border: '1px solid var(--border)', borderRadius: 10, padding: '18px 22px', overflowX: 'auto', fontSize: 13, lineHeight: 1.8, color: 'var(--text)', fontFamily: 'var(--font-mono)', margin: '0 0 22px', whiteSpace: 'pre-wrap' }}><code>{children}</code></pre></div>
const Table = ({ rows }: { rows: string[][] }) => <div style={{ overflowX: 'auto', marginBottom: 24 }}><table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}><thead><tr>{['Concern', 'Spark Structured Streaming', 'Apache Flink'].map(x => <th key={x} style={{ textAlign: 'left', padding: 10, color: 'var(--muted)', borderBottom: '1px solid var(--border)', background: 'var(--bg2)' }}>{x}</th>)}</tr></thead><tbody>{rows.map((row, i) => <tr key={i}>{row.map((cell, j) => <td key={j} style={{ padding: 10, color: 'var(--text)', borderBottom: '1px solid var(--border)', verticalAlign: 'top' }}>{cell}</td>)}</tr>)}</tbody></table></div>

export default function StreamProcessingModule() {
  return (
    <LearnLayout title="Stream Processing — Spark Structured Streaming and Flink" description="Learn event time, windows, state, watermarks, checkpoints, and how Spark Structured Streaming and Flink approach continuous processing." section="Data Engineering — Lesson 24" readTime="60 min">
      <section style={{ marginBottom: 56 }}>
        <SectionTag text="// Part 01 — From Events to Continuous Results" />
        <SectionTitle>A Streaming Engine Is a Stateful Computation over an Unbounded Input</SectionTitle>
        <Para>Prerequisites: understand the difference between batch and streaming, know what a broker topic and partition are, and be comfortable reading Python or SQL. A stream processor consumes events continuously, updates intermediate state, and emits results without waiting for a file or table snapshot to be complete. Its job is not simply to read faster; it must define what time means, how much history to remember, what to do with late data, and how to recover state after failure.</Para>
        <Para>Imagine a delivery platform measuring orders placed in each five-minute interval. An order event may be produced at 12:04, delayed by a mobile network, and reach the processor at 12:09. The processor must decide whether to place the event in the 12:00 window, drop it, or revise an earlier result. These are product semantics as much as technical settings: they affect dashboards, fraud decisions, and financial reconciliation.</Para>
        <Callout label="Objective" type="info">By the end, you should be able to describe event time vs processing time, choose a window and lateness policy, sketch a stateful stream, and explain the recovery and output guarantees a production design needs.</Callout>
      </section>

      <section style={{ marginBottom: 56 }}>
        <SectionTag text="// Part 02 — Event Time, Processing Time, and Windows" />
        <SectionTitle>Choose the Clock That Matches the Question</SectionTitle>
        <Para>Processing time is when an engine handles an event. Event time is when the event occurred in the source domain, usually carried in the record. Ingestion time marks when the platform accepted it. If events arrive out of order or are delayed, a processing-time window answers “what arrived now?” while an event-time window answers “what happened then?” Neither is universally correct. Operational alerting may care about arrival delay; business reporting usually cares about occurrence time.</Para>
        <Para>A tumbling window divides the timeline into adjacent, non-overlapping intervals. A sliding window overlaps intervals and can update more frequently than its width. A session window groups activity separated by less than a configured inactivity gap. Window boundaries need a defined timezone and alignment; use UTC instants in event records and convert for display. A fixed five-minute window is not the same thing as “five calendar minutes in the user's local timezone.”</Para>
        <Table rows={[
          ['Tumbling', 'One result per fixed interval; simple totals and hourly reporting.', 'Late data revises or misses a completed interval.'],
          ['Sliding', 'Rolling view such as activity over the most recent interval.', 'Overlap increases work and can make aggregate interpretation confusing.'],
          ['Session', 'Group events while a key stays active; useful for visits or user activity.', 'A late event can bridge sessions and change boundaries.'],
        ]} />
        <CodeBox language="sql">{`-- Conceptual SQL: exact syntax and interval functions vary by engine.
SELECT
  window_start,
  merchant_id,
  COUNT(*) AS order_count,
  SUM(order_total) AS gross_value
FROM orders
GROUP BY merchant_id, TUMBLE(event_time, INTERVAL '5' MINUTE);`}</CodeBox>
      </section>

      <section style={{ marginBottom: 56 }}>
        <SectionTag text="// Part 03 — State and Watermarks" />
        <SectionTitle>State Makes Aggregates Useful—and Makes Them Cost Something</SectionTitle>
        <Para>A count per merchant needs a counter per active merchant and window. A deduplication step remembers identifiers already seen. A join between two live streams must retain unmatched records until the other side arrives or the retention policy says they are too old. State size therefore grows with key cardinality, window duration, input rate, and the amount of history retained. “Just add a groupBy” can create an unexpectedly large state store.</Para>
        <Para>A watermark is the engine's estimate of event-time progress, often expressed as an allowed delay behind the maximum event time observed. It helps bound state by declaring when sufficiently old windows or join records can be finalized and cleaned up. A watermark is not a guarantee that every later event is impossible; it is a policy boundary. Data arriving beyond it may be dropped from a result, sent to a late-data path, or handled in a correction workflow depending on the engine and sink.</Para>
        <CodeBox>{`from pyspark.sql import functions as F

# Requires a Spark session and a source with an event_time timestamp.
orders = spark.readStream.format("kafka").option("subscribe", "orders").load()
parsed = orders.selectExpr("CAST(value AS STRING) AS json")
parsed = parsed.select(F.from_json("json", order_schema).alias("o")).select("o.*")

summary = (
    parsed
    .withWatermark("event_time", "10 minutes")
    .groupBy(F.window("event_time", "5 minutes"), "merchant_id")
    .agg(F.count("order_id").alias("orders"), F.sum("amount").alias("gross"))
)`}</CodeBox>
        <Para>This snippet focuses on the transformation shape, not a complete deployable job: the source schema, broker options, checkpoint location, output mode, credentials, and sink must be configured for the chosen environment. Keep event identifiers and event timestamps explicit. Parse failures should be measurable and retained for diagnosis rather than silently discarded.</Para>
      </section>

      <section style={{ marginBottom: 56 }}>
        <SectionTag text="// Part 04 — Spark Structured Streaming and Flink" />
        <SectionTitle>Both Process Streams; Their Execution Models Differ</SectionTitle>
        <Para>Spark Structured Streaming expresses a stream as a continuously updated table and lets teams reuse DataFrame and SQL operations. Many deployments use micro-batches: each trigger processes the events available for a small interval. Its continuous-processing mode and supported operators have different constraints, so do not assume every query runs record by record. Flink is designed around a streaming dataflow and supports event-time processing, stateful operators, and low-latency event-at-a-time execution; exact capabilities depend on the selected APIs, connectors, and deployment.</Para>
        <Para>Choose from workload evidence, not from a tool slogan. Consider the acceptable end-to-end delay, stateful operator needs, source and sink connector maturity, team expertise, operational model, recovery objectives, and cost of keeping a system on-call. A nightly warehouse aggregate may not need a streaming engine. A risk signal that must react quickly to events may justify one, but only if late events and corrections have a clear business policy.</Para>
        <Table rows={[
          ['Programming model', 'DataFrame / SQL transformations over streaming inputs.', 'Streaming dataflow operators with state and event-time features.'],
          ['Typical execution shape', 'Often trigger-driven micro-batches; semantics depend on query and mode.', 'Continuous streaming runtime; operators process records as they flow.'],
          ['Good evaluation question', 'Can the existing Spark platform meet latency and state needs?', 'Do the workload and team benefit from a stream-first runtime?'],
          ['Must verify', 'Supported output mode, stateful operation, checkpoint and sink behavior.', 'Connector guarantees, state backend, checkpointing and upgrade behavior.'],
        ]} />
        <Callout label="Do not equate processing with delivery" type="warning">A successful engine checkpoint does not automatically make an external side effect exactly once. The sink may receive retries, and transactional support differs. Use deterministic keys, idempotent writes, or a supported transaction protocol, then test recovery against the real destination.</Callout>
      </section>

      <section style={{ marginBottom: 56 }}>
        <SectionTag text="// Part 05 — Recovery, Output, and Operations" />
        <SectionTitle>Checkpoints Need a Stable, Durable Boundary</SectionTitle>
        <Para>A checkpoint captures enough source progress and operator state for a query to recover consistently. Store it in durable storage with a stable location, restrict who can alter it, and treat it as part of the deployed application's identity. Reusing the same checkpoint for a different query, changing stateful operator topology casually, or deleting checkpoint data to “fix” a job can cause duplicate output, lost progress, or incompatible state recovery.</Para>
        <Para>Monitor input rate, processed rate, backlog or source lag, batch duration, event-time delay, state size, checkpoint duration, failed records, and sink latency. Alert on user-facing service objectives rather than every transient fluctuation. A job that is green but several hours behind is not healthy for a near-real-time product. Track the number and age of late events so the configured watermark remains an explicit, reviewed trade-off.</Para>
        <CodeBox>{`# A small pure-Python model of a tumbling event-time count.
from collections import Counter

window_counts = Counter()
for merchant_id, event_epoch_seconds in [(7, 61), (7, 119), (8, 121)]:
    window_start = (event_epoch_seconds // 60) * 60
    window_counts[(merchant_id, window_start)] += 1

for key, count in sorted(window_counts.items()):
    print(f"merchant={key[0]} window_start={key[1]} count={count}")`}</CodeBox>
        <Para>The example's integer timestamps stand in for UTC seconds. Real systems need a documented event timestamp contract, input validation, and an explicit late-event policy. A simple in-memory counter is not durable state; an engine checkpoint and a sink commit protocol solve different parts of the recovery problem.</Para>
      </section>

      <section style={{ marginBottom: 56 }}>
        <SectionTag text="// Part 06 — Common Failure Modes" />
        <SectionTitle>Make Edge Cases Visible Before They Become Metric Disputes</SectionTitle>
        <ul style={{ paddingLeft: 22, color: 'var(--text)', lineHeight: 1.9 }}>
          <li><strong>Using processing time for a business-time metric.</strong> Network delays move events into later windows. Carry event time and compare lateness against the business requirement.</li>
          <li><strong>Picking a watermark without examining delay data.</strong> A too-short threshold drops legitimate late events; a too-long threshold retains more state. Measure the arrival-delay distribution and define correction behavior.</li>
          <li><strong>Assuming a checkpoint makes the sink transactional.</strong> Source offsets and output commits are separate boundaries. Use idempotent sink keys or a tested transaction mechanism.</li>
          <li><strong>Ignoring hot keys and cardinality.</strong> One merchant or an unbounded identifier field can dominate state. Profile key distribution and define retention.</li>
        </ul>
      </section>

      <section style={{ marginBottom: 56 }}>
        <SectionTag text="// Part 07 — Guided Design Exercise" />
        <DEWorkshop title="Choose a lateness policy for order totals" objective="Calculate the event-time window for each event and identify what a watermark policy does and does not promise." prerequisites="Know integer division, event timestamps, tumbling windows, and the difference between event time and processing time.">
          <Para>A payment analytics team receives order events keyed by merchant. Its requirement is to publish five-minute event-time totals and correct results for events delayed by up to a measured tolerance. Events outside the allowed correction window must remain inspectable rather than disappearing. Work through which records share a window and which operational metrics would validate the policy.</Para>
          <WorkshopCode language="python" expectedOutput={'window_start=300\ncount=2\nlate_beyond_policy=1'}>{`events = [
    {"event_id": "a", "event_time": 305},
    {"event_id": "b", "event_time": 301},
    {"event_id": "c", "event_time": 200},
]
window_seconds = 300
watermark_seconds = 60
window_start = (events[0]["event_time"] // window_seconds) * window_seconds
inside = [event for event in events if event["event_time"] // window_seconds == window_start // window_seconds]
latest_event_time = max(event["event_time"] for event in events)
late_beyond_policy = sum(latest_event_time - event["event_time"] > watermark_seconds for event in events)
print(f"window_start={window_start}")
print(f"count={len(inside)}")
print(f"late_beyond_policy={late_beyond_policy}")`}</WorkshopCode>
          <WorkshopAnswer><Para>Events at 305 and 299 seconds both belong to the window beginning at 300 seconds. The record at 280 seconds is in the preceding window; it may already be outside the chosen lateness policy, but the toy calculation does not implement a production watermark. A real design needs event-time progress from the source, a late-data side path or correction policy, and tests for out-of-order arrival. Measure late-record count and age, state size, and result revisions.</Para></WorkshopAnswer>
        </DEWorkshop>
        <Para>Practice: (1) draw a tumbling and a sliding window over the same timeline; (2) list the state a deduplication operator must retain; (3) compare the source and sink recovery guarantees for Spark and Flink connectors you might use; (4) define a correction policy for a late payment; (5) write a test containing duplicate, out-of-order, and malformed events.</Para>
      </section>

      <section style={{ marginBottom: 48 }}>
        <SectionTag text="// Part 08 — Key Takeaways" />
        <KeyTakeaways items={[
          'A streaming query is a continuous computation over an unbounded input, often with retained state.',
          'Event time answers when the business event happened; processing time answers when the engine handled it.',
          'Watermarks bound state and establish a lateness policy; they do not prove that no later record can arrive.',
          'Spark Structured Streaming and Flink differ in execution model and operational trade-offs; test the actual query and connectors.',
          'A checkpoint is not automatically an exactly-once external side effect; sink behavior must be designed and tested.',
          'Monitor lag, late data, state growth, checkpoint health, and sink latency against a product objective.',
        ]} />
        <Para>Next, compare extraction and loading strategies for moving source data into analytical storage.</Para>
        <Link href="/learn/data-engineering/etl-vs-elt" style={{ display: 'inline-block', background: '#14b8a6', color: '#000', fontSize: 13, fontWeight: 700, borderRadius: 8, padding: '10px 18px', textDecoration: 'none' }}>Lesson 25 → ETL vs ELT — History, Difference, When to Use Each</Link>
      </section>
    </LearnLayout>
  )
}
