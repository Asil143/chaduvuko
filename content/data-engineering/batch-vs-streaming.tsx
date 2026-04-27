import type { Metadata } from 'next'
import { LearnLayout } from '@/components/content/LearnLayout'
import { Callout } from '@/components/content/Callout'
import { KeyTakeaways } from '@/components/content/KeyTakeaways'

export const metadata: Metadata = {
  title: 'Batch vs Streaming vs Micro-Batch — Data Engineering | Chaduvuko',
  description:
    'The real differences between batch, streaming, and micro-batch processing — when each is the right choice, the trade-offs nobody talks about, and how modern systems blend all three.',
}

const SectionTag = ({ text }: { text: string }) => (
  <div style={{
    fontSize: 10, fontWeight: 700, letterSpacing: '.14em',
    textTransform: 'uppercase', color: 'var(--muted)',
    fontFamily: 'var(--font-mono)', marginBottom: 10,
  }}>{text}</div>
)

const SectionTitle = ({ children }: { children: React.ReactNode }) => (
  <h2 style={{
    fontSize: 'clamp(20px, 2.5vw, 28px)', fontWeight: 900,
    letterSpacing: '-1px', color: 'var(--text)', marginBottom: 18,
    fontFamily: 'var(--font-display)', lineHeight: 1.2,
  }}>{children}</h2>
)

const SubTitle = ({ children }: { children: React.ReactNode }) => (
  <h3 style={{
    fontSize: 'clamp(16px, 1.8vw, 20px)', fontWeight: 700,
    letterSpacing: '-0.3px', color: 'var(--text)', marginBottom: 12,
    fontFamily: 'var(--font-display)',
  }}>{children}</h3>
)

const Para = ({ children }: { children: React.ReactNode }) => (
  <p style={{ fontSize: 15, color: 'var(--text)', lineHeight: 1.9, marginBottom: 20 }}>{children}</p>
)

const CodeBox = ({ children, label }: { children: string; label?: string }) => (
  <div style={{ marginBottom: 24 }}>
    {label && (
      <div style={{
        fontSize: 11, fontWeight: 700, color: 'var(--muted)',
        letterSpacing: '.1em', textTransform: 'uppercase',
        marginBottom: 6, fontFamily: 'var(--font-mono)',
      }}>{label}</div>
    )}
    <pre style={{
      background: 'var(--bg2)', border: '1px solid var(--border)',
      borderRadius: 10, padding: '18px 22px', overflowX: 'auto',
      fontSize: 13, lineHeight: 1.9, color: 'var(--text)',
      fontFamily: 'var(--font-mono)', margin: 0, whiteSpace: 'pre-wrap',
    }}>
      <code>{children}</code>
    </pre>
  </div>
)

const Divider = () => (
  <div style={{ borderTop: '1px solid var(--border)', margin: '52px 0' }} />
)

const HighlightBox = ({ children }: { children: React.ReactNode }) => (
  <div style={{
    background: 'var(--surface)', border: '1px solid var(--border)',
    borderRadius: 12, padding: '24px 28px', marginBottom: 24,
  }}>
    {children}
  </div>
)

interface TableRow { [key: string]: string }
interface CompareTableProps {
  headers: { label: string; color?: string }[]
  rows: TableRow[]
  keys: string[]
}

const CompareTable = ({ headers, rows, keys }: CompareTableProps) => (
  <div style={{ overflowX: 'auto', marginBottom: 28 }}>
    <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13, lineHeight: 1.6 }}>
      <thead>
        <tr>
          {headers.map((h, i) => (
            <th key={h.label} style={{
              padding: '10px 16px', textAlign: 'left',
              fontSize: i === 0 ? 10 : 11, fontWeight: 700,
              letterSpacing: i === 0 ? '.12em' : '.06em',
              textTransform: 'uppercase',
              color: h.color ?? 'var(--muted)',
              fontFamily: 'var(--font-mono)',
              borderBottom: h.color ? `2px solid ${h.color}` : '1px solid var(--border)',
              background: h.color ? `${h.color}08` : 'var(--bg2)',
              minWidth: i === 0 ? 130 : 160,
            }}>{h.label}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.map((row, i) => (
          <tr key={i} style={{ background: i % 2 === 0 ? 'var(--surface)' : 'var(--bg2)' }}>
            {keys.map((k, ki) => (
              <td key={k} style={{
                padding: '10px 16px',
                color: ki === 0 ? 'var(--muted)' : 'var(--text)',
                fontSize: ki === 0 ? 11 : 13,
                fontFamily: ki === 0 ? 'var(--font-mono)' : 'inherit',
                fontWeight: ki === 0 ? 700 : 400,
                textTransform: ki === 0 ? 'uppercase' : 'none',
                letterSpacing: ki === 0 ? '.06em' : 'normal',
                borderBottom: '1px solid var(--border)',
                borderLeft: ki > 0 && headers[ki]?.color
                  ? `2px solid ${headers[ki].color}40`
                  : ki > 0 ? '1px solid var(--border)' : 'none',
                verticalAlign: 'top',
              }}>{row[k]}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  </div>
)

export default function BatchVsStreamingModule() {
  return (
    <LearnLayout
      title="Batch vs Streaming vs Micro-Batch"
      description="When each processing model is right, the trade-offs nobody talks about, and how modern systems blend all three."
      section="Data Engineering"
      readTime="55 min"
      updatedAt="March 2026"
    >

      {/* ── Part 01 — The Core Question ──────────────────────────────── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 01 — The Core Question" />
        <SectionTitle>The Question Is Not Which Is Better — It Is Which Fits the Problem</SectionTitle>

        <Para>
          Streaming is not always better than batch. Batch is not always the safe
          conservative choice. Micro-batch is not a compromise that gets the best
          of both worlds — it has its own distinct trade-offs. The choice between
          these three processing models is a fundamental architectural decision
          that affects everything downstream: infrastructure cost, operational
          complexity, latency guarantees, and failure modes.
        </Para>

        <Para>
          Most real-world data platforms use all three simultaneously. A mature
          FreshCart data platform has: a nightly batch job that reprocesses the
          full day's orders for the finance report (batch), a Kafka consumer that
          updates the real-time delivery tracking dashboard (streaming), and an
          hourly Spark job that updates customer segmentation (micro-batch).
          Understanding when each model is appropriate — not which one to use
          everywhere — is the skill this module builds.
        </Para>

        <HighlightBox>
          <div style={{
            fontSize: 14, fontWeight: 800, color: 'var(--text)',
            fontFamily: 'var(--font-display)', marginBottom: 16,
          }}>
            The core trade-off axis
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
            {[
              {
                model: 'Batch',
                color: '#00e676',
                latency: 'Minutes to hours',
                complexity: 'Low',
                cost: 'Low (run occasionally)',
                correctness: 'High (all data available)',
                tagline: 'Simple, correct, cheap. Slow.',
              },
              {
                model: 'Micro-Batch',
                color: '#7b61ff',
                latency: 'Seconds to minutes',
                complexity: 'Medium',
                cost: 'Medium (runs frequently)',
                correctness: 'High (windowed)',
                tagline: 'Better latency, similar correctness.',
              },
              {
                model: 'Streaming',
                color: '#f97316',
                latency: 'Milliseconds to seconds',
                complexity: 'High',
                cost: 'High (always running)',
                correctness: 'Harder (out-of-order, late data)',
                tagline: 'Near-real-time, complex, expensive.',
              },
            ].map((item) => (
              <div key={item.model} style={{
                background: 'var(--bg2)', border: `1px solid ${item.color}30`,
                borderTop: `3px solid ${item.color}`,
                borderRadius: 10, padding: '16px 18px',
              }}>
                <div style={{
                  fontSize: 14, fontWeight: 800, color: item.color,
                  fontFamily: 'var(--font-display)', marginBottom: 12,
                }}>{item.model}</div>
                {[
                  ['Latency', item.latency],
                  ['Complexity', item.complexity],
                  ['Cost', item.cost],
                  ['Correctness', item.correctness],
                ].map(([k, v]) => (
                  <div key={k} style={{ marginBottom: 6 }}>
                    <div style={{
                      fontSize: 9, fontWeight: 700, color: 'var(--muted)',
                      fontFamily: 'var(--font-mono)', letterSpacing: '.1em',
                      textTransform: 'uppercase', marginBottom: 1,
                    }}>{k}</div>
                    <div style={{ fontSize: 12, color: 'var(--text)', lineHeight: 1.4 }}>{v}</div>
                  </div>
                ))}
                <div style={{
                  fontSize: 11, color: item.color, fontStyle: 'italic',
                  marginTop: 10, borderTop: '1px solid var(--border)', paddingTop: 8,
                }}>{item.tagline}</div>
              </div>
            ))}
          </div>
        </HighlightBox>
      </section>

      <Divider />

      {/* ── Part 02 — Batch Processing ───────────────────────────────── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 02 — Batch Processing" />
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 18 }}>
          <div style={{
            background: 'rgba(0,230,118,0.12)', border: '2px solid #00e676',
            borderRadius: 10, padding: '6px 14px',
            fontSize: 13, fontWeight: 900, color: '#00e676',
            fontFamily: 'var(--font-mono)',
          }}>BATCH</div>
          <h2 style={{
            fontSize: 'clamp(20px,2.5vw,26px)', fontWeight: 900,
            letterSpacing: '-1px', color: 'var(--text)', margin: 0,
            fontFamily: 'var(--font-display)',
          }}>Batch Processing — The Foundation</h2>
        </div>

        <Para>
          Batch processing runs a pipeline on a fixed schedule, processing a bounded
          set of data in one execution. The pipeline starts, reads all the data in
          its scope, processes it, writes the results, and exits. The next run starts
          at the next scheduled interval. Everything between runs is accumulated and
          processed together — hence "batch."
        </Para>

        <Para>
          Batch processing is the default processing model and the correct choice for
          the majority of data engineering workloads. Its simplicity is a feature,
          not a limitation. A batch pipeline has a clear start, a clear end, a clear
          scope, and a clear success criterion. Every debugging session, every rerun,
          every backfill operates on well-understood bounded data.
        </Para>

        <SubTitle>How batch processing works internally</SubTitle>

        <CodeBox label="Batch processing model — what happens during one execution">{`BATCH PIPELINE EXECUTION CYCLE:

  T=06:00  Pipeline starts (triggered by cron or Airflow)
           Run parameters: run_date = 2026-03-17

  T=06:01  Extract phase:
           Read all orders WHERE date = '2026-03-17'
           → 48,234 rows fetched from PostgreSQL replica
           → Written to S3 Bronze as Parquet

  T=06:08  Transform phase (dbt):
           dbt run --select models/silver/orders.sql
           → 48,234 rows cleaned and typed
           → 47 rows rejected (written to DLQ)
           → Written to silver.orders partition date=2026-03-17

  T=06:14  Aggregate phase (dbt Gold):
           dbt run --select models/gold/daily_revenue.sql
           → Computes SUM, COUNT, AVG per store per category
           → Written to gold.daily_revenue

  T=06:17  PIPELINE EXITS — run complete
           Duration: 17 minutes
           Status: SUCCESS
           Next run: T+24h at 06:00

  WHAT HAPPENED BETWEEN T=06:17 AND T=06:00 NEXT DAY:
  → The pipeline does not exist as a running process
  → No compute resources are consumed
  → Data written between runs accumulates, waiting for next batch
  → A customer who placed an order at 08:00 PM won't see it in
    analytics until 06:17 AM the NEXT day (22+ hour latency)

THIS IS FINE when:
  The business question is "what was yesterday's revenue?" (answered at 6:17 AM)
  The business question is "how did this week's promotions perform?" (daily is enough)

THIS IS NOT FINE when:
  The business question is "is there fraud happening RIGHT NOW?"
  The business question is "what is the delivery driver's current location?"`}</CodeBox>

        <SubTitle>Why batch is often the right answer despite its latency</SubTitle>

        {[
          {
            reason: 'Correctness is easier',
            detail: 'In batch processing, all data for a time window is available when the pipeline runs. You can compute exact aggregates, correct late-arriving data, and produce deterministic results. In streaming, late-arriving events complicate correctness — an order timestamped 11:55 PM might arrive at 12:15 AM after the midnight batch has already run.',
          },
          {
            reason: 'Simplicity reduces operational burden',
            detail: 'A batch job is a script that runs and exits. Debugging a failed batch job means looking at logs and data at a fixed point in time. Debugging a streaming pipeline means reasoning about event order, watermarks, state stores, and what happened across a continuous window — far more complex.',
          },
          {
            reason: 'Cost is proportional to work done',
            detail: 'Batch compute runs for 17 minutes per day. A streaming system runs 24 hours per day. For a Spark cluster that costs $4/hour, the annual cost difference is 17min/day × $4/hr × 365 = $414/year for batch versus $4/hr × 24hr × 365 = $35,040/year for always-on streaming. Most analytical use cases do not justify this cost difference.',
          },
          {
            reason: 'Reprocessing is natural',
            detail: 'Re-running a batch job for a historical date range is a first-class operation. Need to reprocess all of January because you found a bug? Run the pipeline for each day in January. In streaming, reprocessing historical data requires either replaying the event log (if it was kept) or a separate batch backfill job.',
          },
        ].map((item, i) => (
          <div key={i} style={{
            background: 'var(--surface)', border: '1px solid rgba(0,230,118,0.2)',
            borderRadius: 10, padding: '14px 18px', marginBottom: 10,
            borderLeft: '3px solid #00e676',
          }}>
            <div style={{
              fontSize: 13, fontWeight: 800, color: '#00e676',
              fontFamily: 'var(--font-display)', marginBottom: 6,
            }}>{item.reason}</div>
            <div style={{ fontSize: 13, color: 'var(--muted)', lineHeight: 1.7 }}>
              {item.detail}
            </div>
          </div>
        ))}

        <Callout type="tip">
          <strong>The batch latency threshold:</strong> if the business can tolerate
          data being up to 1 hour old, batch processing is almost always the right
          choice. Streaming should be chosen when the latency requirement is
          measurably below the minimum batch interval that serves the use case.
          "Real-time" dashboards in most companies are actually refreshed every
          5–15 minutes and are better served by fast micro-batch than true streaming.
        </Callout>
      </section>

      <Divider />

      {/* ── Part 03 — Streaming Processing ───────────────────────────── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 03 — Streaming Processing" />
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 18 }}>
          <div style={{
            background: 'rgba(249,115,22,0.12)', border: '2px solid #f97316',
            borderRadius: 10, padding: '6px 14px',
            fontSize: 13, fontWeight: 900, color: '#f97316',
            fontFamily: 'var(--font-mono)',
          }}>STREAM</div>
          <h2 style={{
            fontSize: 'clamp(20px,2.5vw,26px)', fontWeight: 900,
            letterSpacing: '-1px', color: 'var(--text)', margin: 0,
            fontFamily: 'var(--font-display)',
          }}>Streaming Processing — Continuous, Event-Driven</h2>
        </div>

        <Para>
          Streaming processes each event as it arrives, with no concept of a run
          boundary. The pipeline is always running, continuously consuming events
          from a source (usually Kafka) and producing outputs with latency measured
          in milliseconds to seconds. There is no "start of batch" and no "end of
          batch" — just an infinite sequence of events flowing through the system.
        </Para>

        <SubTitle>The streaming data model — events, windows, and watermarks</SubTitle>

        <Para>
          Streaming introduces concepts that do not exist in batch processing. Every
          data engineer who works with streaming must understand these three concepts
          precisely before writing a single line of streaming code.
        </Para>

        <CodeBox label="Event time vs processing time — the most important streaming concept">{`EVENT TIME:     When the event actually happened (the timestamp in the event payload)
PROCESSING TIME: When the streaming system processed the event

These two times diverge whenever:
  - The network is slow (event took 30 seconds to arrive)
  - The device was offline (mobile app buffered events, flushed when reconnected)
  - The system was under load (Kafka consumer fell behind)
  - The event source has retries (event replayed with original timestamp)

EXAMPLE:
  A FreshCart delivery agent marks an order "delivered" at 11:58 PM
  on a bad network connection. The event reaches Kafka at 12:03 AM.

  Event time:     2026-03-17 23:58:00  (when the tap happened)
  Processing time: 2026-03-18 00:03:00  (when Kafka received it)

  If your streaming pipeline counts "deliveries on 2026-03-17":
    Using event time:     counts this delivery correctly for March 17
    Using processing time: counts this delivery for March 18 — WRONG

  ALWAYS use event time for business metrics.
  Only use processing time for system metrics (consumer lag, throughput).


WINDOWS:
  Streaming aggregations operate over time windows — bounded periods
  during which events are collected before computing results.

  TUMBLING WINDOWS (non-overlapping, fixed size):
    [00:00–01:00] [01:00–02:00] [02:00–03:00]
    Each event belongs to exactly one window.
    Use for: hourly/daily aggregates, session-independent metrics.

  SLIDING WINDOWS (overlapping, fixed size, moves by step):
    [00:00–01:00] [00:30–01:30] [01:00–02:00]  (30-min step)
    Each event may belong to multiple windows.
    Use for: moving averages, rolling metrics.

  SESSION WINDOWS (variable size, bounded by inactivity gap):
    [events...gap > 30min...][events...gap > 30min...][events...]
    Window closes when no events arrive for the gap duration.
    Use for: user session analysis, visit duration.


WATERMARKS:
  A watermark is the streaming system's current estimate of the
  maximum event time it has seen, minus an allowed lateness.

  watermark = max_event_time_seen - allowed_lateness

  Purpose: tell the system when it is safe to close a window and
           produce a result, even if late events might still arrive.

  Example:
    allowed_lateness = 5 minutes
    max event time seen = 23:58:00
    watermark = 23:53:00

    Window [23:00–24:00] is not closed yet — events up to 5 min
    late may still arrive.
    Window [22:00–23:00] IS closed — no events older than 23:53
    can legitimately arrive.

  Too small watermark → windows close early → late events dropped → incorrect results
  Too large watermark → windows close late → higher latency → more memory used`}</CodeBox>

        <SubTitle>Streaming architecture — the components</SubTitle>

        <CodeBox label="Streaming pipeline components — from event source to sink">{`STREAMING PIPELINE ARCHITECTURE:

  EVENT SOURCE          MESSAGE BROKER      STREAM PROCESSOR     SINK
  ─────────────────────────────────────────────────────────────────────────────
  Payment service  →    Kafka topic:    →   Flink/Spark      →  Cassandra
  (produces events)     payments.v1         Streaming           (real-time store)
                                                             →  Kafka topic:
                                                                enriched_payments
                                                                (downstream)
                                                             →  S3 Parquet
                                                                (data lake landing)

  KAFKA CONSUMER GROUP MECHANICS:
    - Multiple consumer instances in a group share the topic partitions
    - Each partition is consumed by exactly one consumer at a time
    - Offset tracks position: which events have been processed
    - Auto-commit offset vs manual commit after successful processing

  CONSUMER OFFSET MANAGEMENT:
    # Manual offset commit (recommended for correctness):
    consumer.poll(timeout_ms=1000)
    for message in records:
        process(message.value)
        write_to_sink(message.value)   # write BEFORE committing offset
    consumer.commit()                  # commit AFTER successful write
    # If write fails: do not commit → message reprocessed on next poll → at-least-once

    # Auto-commit (default, simpler, less safe):
    # Offset committed on a timer regardless of whether processing succeeded
    # Risk: offset committed before write completes → message lost on crash
    consumer.enable_auto_commit = True  # do NOT use for financial data


  SPARK STRUCTURED STREAMING (micro-batch under the hood, streaming API):

  from pyspark.sql import SparkSession
  from pyspark.sql.functions import col, from_json, window, sum as spark_sum
  from pyspark.sql.types import StructType, StringType, DecimalType, TimestampType

  spark = SparkSession.builder.appName('payment_stream').getOrCreate()

  payment_schema = StructType() \
      .add('payment_id', StringType()) \
      .add('amount', DecimalType(10, 2)) \
      .add('store_id', StringType()) \
      .add('event_time', TimestampType())

  # Read from Kafka:
  raw_stream = spark.readStream \
      .format('kafka') \
      .option('kafka.bootstrap.servers', 'kafka:9092') \
      .option('subscribe', 'payments.v1') \
      .option('startingOffsets', 'latest') \
      .load()

  # Parse JSON payload:
  payments = raw_stream \
      .select(from_json(col('value').cast('string'), payment_schema).alias('data')) \
      .select('data.*') \
      .withWatermark('event_time', '5 minutes')

  # Aggregate: revenue per store per 1-hour tumbling window:
  hourly_revenue = payments \
      .groupBy(
          window('event_time', '1 hour'),
          'store_id',
      ) \
      .agg(spark_sum('amount').alias('hourly_revenue'))

  # Write to sink:
  query = hourly_revenue.writeStream \
      .outputMode('update') \
      .format('delta') \
      .option('checkpointLocation', 's3://freshmart-lake/checkpoints/hourly_revenue') \
      .trigger(processingTime='30 seconds') \
      .start('s3://freshmart-lake/silver/hourly_revenue')`}</CodeBox>

        <SubTitle>When streaming is actually required</SubTitle>

        {[
          {
            usecase: 'Real-time fraud detection',
            why: 'A fraudulent transaction detected 2 seconds after it occurs can be blocked. A fraudulent transaction detected 6 hours later in the next morning\'s batch is already processed — money is gone. The latency requirement is measured in seconds, not hours. Batch cannot serve this.',
            companies: 'Stripe, Venmo — detect unusual velocity patterns (5 transactions in 10 seconds from same card) in real time',
          },
          {
            usecase: 'Live delivery tracking',
            why: 'A Uber Eats customer watching their delivery progress on a map needs GPS updates every 10–30 seconds. A batch pipeline that runs hourly is useless for this use case. The data must flow from driver\'s phone → Kafka → stream processor → API → customer\'s map in under a second.',
            companies: 'Uber Eats, DoorDash, Porter — real-time driver location tracking and ETA updates',
          },
          {
            usecase: 'Real-time inventory management',
            why: 'A flash sale that sells a product that has already gone out of stock needs to block new orders within seconds. If inventory updates arrive in batch every 15 minutes, the system oversells during the batch window.',
            companies: 'Shopify, Amazon during Big Billion Days — prevent overselling during high-velocity sale events',
          },
          {
            usecase: 'Operational alerting',
            why: 'If 30% of payment transactions start failing on a specific payment gateway, the team needs an alert within 2 minutes. A batch pipeline that produces this metric at 6 AM would miss a 4-hour outage window entirely.',
            companies: 'Any payment platform — monitoring payment success rates, gateway health, and fraud signals in real time',
          },
        ].map((item, i) => (
          <div key={i} style={{
            background: 'var(--surface)', border: '1px solid rgba(249,115,22,0.2)',
            borderRadius: 10, padding: '16px 20px', marginBottom: 10,
          }}>
            <div style={{
              fontSize: 13, fontWeight: 800, color: '#f97316',
              fontFamily: 'var(--font-display)', marginBottom: 6,
            }}>{item.usecase}</div>
            <div style={{ fontSize: 13, color: 'var(--muted)', lineHeight: 1.7, marginBottom: 6 }}>
              {item.why}
            </div>
            <div style={{
              fontSize: 11, color: '#f97316', fontFamily: 'var(--font-mono)',
              borderLeft: '2px solid rgba(249,115,22,0.3)', paddingLeft: 8,
            }}>{item.companies}</div>
          </div>
        ))}
      </section>

      <Divider />

      {/* ── Part 04 — Micro-Batch ─────────────────────────────────────── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 04 — Micro-Batch" />
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 18 }}>
          <div style={{
            background: 'rgba(123,97,255,0.12)', border: '2px solid #7b61ff',
            borderRadius: 10, padding: '6px 14px',
            fontSize: 13, fontWeight: 900, color: '#7b61ff',
            fontFamily: 'var(--font-mono)',
          }}>MICRO-BATCH</div>
          <h2 style={{
            fontSize: 'clamp(20px,2.5vw,26px)', fontWeight: 900,
            letterSpacing: '-1px', color: 'var(--text)', margin: 0,
            fontFamily: 'var(--font-display)',
          }}>Micro-Batch — Small Batches on a Short Interval</h2>
        </div>

        <Para>
          Micro-batch is batch processing applied to very short time intervals —
          typically 30 seconds to 15 minutes. Instead of processing a full day's
          data once per day, a micro-batch pipeline processes the last N minutes
          of data every N minutes. The result is much lower latency than daily
          batch while retaining most of the simplicity of batch processing.
        </Para>

        <Para>
          This is how Spark Structured Streaming actually works internally: it is
          not true record-by-record streaming. It collects micro-batches of records
          from Kafka, processes each batch as a bounded Spark job, and outputs results
          at the configured trigger interval. Apache Flink is the only mainstream
          tool that does true record-by-record processing.
        </Para>

        <SubTitle>Micro-batch vs true streaming — the important distinction</SubTitle>

        <CodeBox label="Micro-batch vs true streaming — internal execution models">{`MICRO-BATCH (Spark Structured Streaming, default):
  t=0s:   Collect all Kafka messages arrived in last 30 seconds
  t=0.5s: Process as one Spark batch job (bounded)
  t=2.3s: Write results to sink
  t=2.3s: Commit Kafka offsets
  t=30s:  Collect next batch... repeat

  Latency:   ~30 seconds (trigger interval + processing time)
  Throughput: Very high (Spark is optimised for large batches)
  State:      Managed per-batch via checkpoint
  Strengths:  High throughput, familiar Spark APIs, good recovery
  Weakness:   Minimum latency = trigger interval (cannot go below ~1 second practically)

TRUE STREAMING (Apache Flink):
  Event arrives → Immediately processed → Output emitted
  No waiting for batch boundary. Each record is processed as it arrives.

  Latency:   Milliseconds (end-to-end 10–200ms typical)
  Throughput: Lower per-record efficiency, higher parallelism
  State:      Maintained continuously in distributed state store (RocksDB)
  Strengths:  True low-latency, native event time semantics, complex CEP
  Weakness:   More complex to operate, more expensive, harder to debug

CHOOSING:
  Need < 1 second latency?      → True streaming (Flink)
  1 second – 15 minutes latency? → Micro-batch (Spark Structured Streaming)
  > 15 minutes latency?          → Batch (standard Spark or dbt)
  Most "real-time" dashboards?   → Micro-batch with 5-minute trigger`}</CodeBox>

        <SubTitle>Micro-batch implementation patterns</SubTitle>

        <CodeBox label="Micro-batch with Spark Structured Streaming — trigger options">{`from pyspark.sql import SparkSession
from pyspark.sql.functions import col, from_json
from pyspark.sql.types import StructType, StringType, DecimalType

spark = SparkSession.builder.getOrCreate()

stream = spark.readStream \
    .format('kafka') \
    .option('kafka.bootstrap.servers', 'kafka:9092') \
    .option('subscribe', 'orders.v1') \
    .load()

# TRIGGER OPTIONS — control micro-batch interval:

# Fixed interval micro-batch (most common):
query = stream.writeStream \
    .trigger(processingTime='5 minutes') \  # process every 5 minutes
    .format('delta') \
    .option('checkpointLocation', 's3://freshmart-lake/checkpoints/orders_stream') \
    .start('s3://freshmart-lake/bronze/orders_stream')

# Once trigger — process all available data right now, then stop:
# Useful for backfill or scheduled runs that want streaming semantics:
query = stream.writeStream \
    .trigger(once=True) \
    .format('delta') \
    .start('s3://freshmart-lake/bronze/orders_stream')

# Available-now trigger (Spark 3.3+) — process all available data in batches:
query = stream.writeStream \
    .trigger(availableNow=True) \
    .format('delta') \
    .start('s3://freshmart-lake/bronze/orders_stream')

# Continuous processing (experimental — approaches true streaming):
query = stream.writeStream \
    .trigger(continuous='1 second') \  # checkpoint every 1 second
    .format('console') \
    .start()


# MICRO-BATCH WITH PLAIN PYTHON (no Spark — for simpler cases):
import time
from datetime import datetime, timedelta, timezone

def run_micro_batch(interval_seconds: int = 300) -> None:
    """Run a micro-batch loop that processes N minutes of data repeatedly."""
    while True:
        batch_end   = datetime.now(timezone.utc)
        batch_start = batch_end - timedelta(seconds=interval_seconds)

        try:
            rows = extract_from_source(batch_start, batch_end)
            transformed = transform(rows)
            upsert_to_destination(transformed)   # upsert is critical here
            print(f'Batch [{batch_start.isoformat()} - {batch_end.isoformat()}]: {len(rows)} rows')
        except Exception as e:
            print(f'Batch failed: {e}')
            # Do NOT advance the time window — retry same window next loop

        time.sleep(interval_seconds)   # wait before next batch`}</CodeBox>
      </section>

      <Divider />

      {/* ── Part 05 — Full Comparison ─────────────────────────────────── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 05 — Complete Comparison" />
        <SectionTitle>Batch vs Micro-Batch vs Streaming — Every Dimension</SectionTitle>

        <CompareTable
          headers={[
            { label: 'Dimension' },
            { label: 'Batch', color: '#00e676' },
            { label: 'Micro-Batch', color: '#7b61ff' },
            { label: 'Streaming', color: '#f97316' },
          ]}
          keys={['dim', 'batch', 'micro', 'stream']}
          rows={[
            { dim: 'Latency', batch: 'Minutes to hours', micro: 'Seconds to minutes', stream: 'Milliseconds to seconds' },
            { dim: 'Trigger', batch: 'Schedule (cron/Airflow)', micro: 'Time interval (every N minutes)', stream: 'Each event arrival' },
            { dim: 'Data model', batch: 'Bounded dataset', micro: 'Bounded micro-dataset', stream: 'Unbounded event sequence' },
            { dim: 'Execution', batch: 'Run, complete, exit', micro: 'Run, complete, wait, repeat', stream: 'Always running' },
            { dim: 'State management', batch: 'Stateless (checkpoint only)', micro: 'Micro-state per trigger', stream: 'Full stateful processing' },
            { dim: 'Late data handling', batch: 'Natural — rerun the batch', micro: 'Overlap windows + upsert', stream: 'Watermarks + allowed lateness' },
            { dim: 'Reprocessing', batch: 'Trivial — rerun with date param', micro: 'Replay from Kafka offset', stream: 'Replay from Kafka offset' },
            { dim: 'Debugging', batch: 'Simple — fixed snapshot in time', micro: 'Moderate', stream: 'Complex — state, order, watermarks' },
            { dim: 'Infrastructure', batch: 'Ephemeral (start/stop per run)', micro: 'Always-on (lower cost)', stream: 'Always-on (higher cost)' },
            { dim: 'Correctness', batch: 'Easiest — all data available', micro: 'Good with upsert + overlap', stream: 'Hardest — requires watermarks' },
            { dim: 'Best tools', batch: 'Spark, dbt, Python, SQL', micro: 'Spark Structured Streaming', stream: 'Apache Flink, Kafka Streams' },
            { dim: 'Best for', batch: 'Finance reports, daily aggregates, warehouse loads', micro: 'Near-realtime dashboards, hourly metrics, CDC', stream: 'Fraud detection, live tracking, operational alerts' },
          ]}
        />
      </section>

      <Divider />

      {/* ── Part 06 — Late-Arriving Data ─────────────────────────────── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 06 — Late-Arriving Data" />
        <SectionTitle>Late-Arriving Data — The Correctness Challenge Unique to Streaming</SectionTitle>

        <Para>
          Late-arriving data is the defining correctness challenge of stream processing.
          In batch processing, you simply run the pipeline after the data settles and
          everything is available. In streaming, events arrive out of order and delayed —
          and the system must decide when it is safe to close a window and produce a
          result, trading latency for completeness.
        </Para>

        <CodeBox label="Late-arriving data strategies — batch vs streaming approaches">{`# ── BATCH: the trivial solution ──────────────────────────────────────────────
# Run with a delay to let late data arrive.
# The March 17 batch runs at 6 AM March 18 — 6+ hours after midnight.
# Any order timestamped March 17 but arriving late has 6 hours to arrive.
# Simple. Correct. No special logic needed.

# For very late data (hours or days late), run a correction batch:
# 0 10 * * * python3 pipeline.py --date yesterday --mode correction
# This reprocesses yesterday with all data that has arrived since the daily run.
# Upsert semantics make this safe.


# ── MICRO-BATCH: overlap windows + upsert ────────────────────────────────────
# Use overlapping time windows to catch most late arrivals.
# Upsert on event_id ensures duplicates from overlap are handled.

# If micro-batch interval is 5 minutes, query with 10-minute lookback:
def extract_with_overlap(batch_end, overlap_minutes=10):
    batch_start = batch_end - timedelta(minutes=5 + overlap_minutes)
    return db.query(
        "SELECT * FROM events WHERE event_time BETWEEN %s AND %s",
        (batch_start, batch_end),
    )
# This reads events from 15 minutes ago to now.
# Events that arrived late (up to 10 minutes late) are included.
# Upsert at destination handles the re-processing of already-seen events.


# ── STREAMING (Spark): watermarks + allowed lateness ────────────────────────
from pyspark.sql.functions import window, sum as spark_sum

# Define allowed lateness of 10 minutes:
payments_with_watermark = payments \
    .withWatermark('event_time', '10 minutes')
#   ↑ Any event more than 10 minutes behind the watermark is considered late

# Aggregate with tumbling window:
hourly_revenue = payments_with_watermark \
    .groupBy(
        window('event_time', '1 hour'),
        'store_id',
    ) \
    .agg(spark_sum('amount').alias('revenue'))

# Output mode matters for late data:
# 'append':   Output only when window is finalised (after watermark passes)
#              → Lowest memory, highest latency, correct
# 'update':   Output whenever window data changes (including late updates)
#              → Lower latency, more updates to downstream
# 'complete':  Output all windows on every trigger
#              → Only for small datasets (memory grows unboundedly)

query = hourly_revenue.writeStream \
    .outputMode('update') \            # emit updates as late data arrives
    .format('delta') \
    .option('checkpointLocation', 's3://checkpoints/hourly_revenue') \
    .trigger(processingTime='1 minute') \
    .start('s3://freshmart-lake/silver/hourly_revenue_stream')

# With update mode and upsert at destination (Delta MERGE):
# → Window results are updated as late events arrive
# → Final result is correct after watermark passes
# → Downstream consumers see intermediate updates (must handle them)


# ── THE LATE DATA DECISION TREE ───────────────────────────────────────────────
# How late does your data arrive?    → How much lateness should you allow?
#
# 99th percentile latency < 5 min:    allowed_lateness = 10 min
# 99th percentile latency < 30 min:   allowed_lateness = 60 min
# Data can be hours late (mobile app offline):  use batch with correction run
#
# Rule: if you cannot bound your data lateness to < 1 hour,
# streaming with watermarks becomes very expensive.
# A 1-hour watermark on 1-minute windows means holding 60 windows open
# in memory simultaneously. Use batch or micro-batch + correction instead.`}</CodeBox>
      </section>

      <Divider />

      {/* ── Part 07 — Choosing the Right Model ───────────────────────── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 07 — The Decision Framework" />
        <SectionTitle>How to Choose the Right Processing Model</SectionTitle>

        <Para>
          The wrong choice is almost always defaulting to streaming because it sounds
          more advanced or modern. Streaming adds significant operational complexity,
          infrastructure cost, and correctness challenges. Choose it only when the
          latency requirement genuinely requires it.
        </Para>

        <CodeBox label="Processing model decision framework — the questions to ask">{`QUESTION 1: What is the maximum acceptable data latency for this use case?

  < 1 second:    True streaming only (Flink / Kafka Streams)
  1s – 5 min:    Micro-batch (Spark Structured Streaming, 30s trigger)
  5 – 60 min:    Micro-batch (5–15 minute trigger) or fast batch
  > 1 hour:      Batch (daily, hourly, or whatever interval fits)

  COMMON MISTAKE: picking streaming because "real-time" sounds better.
  Ask: what decision or action requires this latency? If the answer
  is "a dashboard refresh" — does the user genuinely need sub-second
  updates, or would 5-minute updates serve equally well?


QUESTION 2: How complex is the transformation logic?

  Simple filtering/typing, no joins:      All three work fine
  Joins to slowly-changing dimensions:    Batch or micro-batch (easier state)
  Aggregations over large time windows:   Batch (all data available at once)
  Pattern detection across event sequence: Streaming (Flink CEP)
  ML model inference per event:           Streaming (low-latency requirement)

  RULE: if the transformation requires data from multiple time periods
  or large lookups, streaming state management becomes complex and
  expensive. Batch makes this trivial.


QUESTION 3: How late can source events arrive?

  < 5 minutes late:   Micro-batch with 10-min lookback overlap
  5–60 minutes late:  Streaming with 60-min watermark OR micro-batch + correction
  Hours late (mobile offline data, delayed batch feeds): Batch only


QUESTION 4: How complex can the operations model be?

  Small team, no streaming expertise:    Batch (always)
  Team familiar with Spark Streaming:    Micro-batch
  Dedicated streaming engineers:         True streaming if latency requires it

  RULE: streaming pipelines require more engineering expertise to build,
  more infrastructure to run, and more time to debug. Only introduce this
  complexity when the latency requirement justifies it.


QUESTION 5: What is the data volume?

  < 1 GB/day:    Batch on a single machine (Pandas, not even Spark needed)
  1 GB – 1 TB/day: Batch Spark or micro-batch Spark
  > 1 TB/day:    Micro-batch or streaming depending on latency needs
  > 10 TB/day:   Almost certainly micro-batch or streaming


PRACTICAL ROUTING TABLE:
  Finance report (daily revenue, costs):               BATCH
  Operations dashboard (last 15 min):                  MICRO-BATCH (5 min)
  Real-time fraud detection:                            STREAMING (Flink)
  Customer segmentation (weekly):                       BATCH
  Live delivery tracking:                               STREAMING
  Hourly data quality check:                            MICRO-BATCH (10 min)
  Monthly cohort retention analysis:                    BATCH
  Payment gateway health monitoring:                    STREAMING`}</CodeBox>

        <SubTitle>The Kappa architecture — why Lambda is falling out of favour</SubTitle>

        <Para>
          The Lambda architecture (separate batch and streaming layers, merged
          at serving) was the dominant pattern in 2015–2020. It has fallen out
          of favour because maintaining two codebases for the same logic —
          one in batch SQL and one in streaming Java/Scala — doubles the
          engineering burden and introduces subtle correctness differences
          between the two paths.
        </Para>

        <CodeBox label="Lambda vs Kappa — the architectural evolution">{`LAMBDA ARCHITECTURE (2012–2020, now declining):
  Source → Batch Layer (Spark, nightly) → Batch views (accurate, slow)
         → Speed Layer (Storm/Flink)    → Real-time views (fast, approximate)
                                         ↓
                               Serving Layer (merge both)

  Problems:
  - Two codebases doing the same logic (batch SQL + streaming Java)
  - Subtle differences between batch and stream results (bugs)
  - Operational complexity of maintaining two stacks
  - Speed layer results replaced by batch results once batch catches up

KAPPA ARCHITECTURE (2014–present, now dominant):
  Source → Kafka (persistent event log, replayed for reprocessing)
         → Single streaming pipeline (Flink or Spark Streaming)
         → Serving layer (no separate batch layer)

  Reprocessing: replay Kafka from the beginning with a new consumer group
  Historical:   Kafka retention configured for months/years of data

  Benefits:
  - Single codebase
  - One source of truth
  - Reprocessing is natural (replay Kafka)
  - Simpler to operate

  Limitation: requires Kafka to retain data long enough for full reprocessing
              (expensive at high data volumes — terabytes stored in Kafka)

MODERN HYBRID (2022–present, most practical):
  Source → Kafka (days of retention for streaming)
         → S3/ADLS (years of retention as Parquet, Delta Lake)
  Streaming path: Kafka → Flink/Spark Streaming → real-time sink (low latency)
  Batch path:     S3 → Spark batch → warehouse (historical accuracy, bulk)
  Both write to the same Delta Lake tables (upserts reconcile any differences)`}</CodeBox>
      </section>

      <Divider />

      {/* ── Part 08 — Real World ─────────────────────────────────────── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 08 — Real World" />
        <div style={{
          fontSize: 10, fontWeight: 700, letterSpacing: '.12em',
          textTransform: 'uppercase', color: 'var(--muted)', marginBottom: 12,
          fontFamily: 'var(--font-mono)',
        }}>
          💼 What This Looks Like at Work
        </div>
        <SectionTitle>Designing FreshCart's Three-Layer Processing Architecture</SectionTitle>

        <div style={{
          background: 'var(--surface)', border: '1px solid var(--border)',
          borderRadius: 12, padding: '24px 28px', marginBottom: 24,
        }}>
          <div style={{
            fontSize: 11, fontWeight: 700, color: 'var(--accent)',
            background: 'rgba(0,230,118,0.1)', border: '1px solid rgba(0,230,118,0.2)',
            borderRadius: 6, padding: '4px 10px', fontFamily: 'var(--font-mono)',
            display: 'inline-block', marginBottom: 20, letterSpacing: '.1em',
            textTransform: 'uppercase',
          }}>
            Scenario — FreshCart · New data platform architecture design
          </div>

          <Para>
            FreshCart's CTO asks you to design the data processing architecture
            for three specific business requirements. Here is how a senior data
            engineer applies the decision framework to each:
          </Para>

          <Para>
            <strong>Requirement 1 — Finance department needs a daily P&amp;L report
            by 7 AM.</strong> The report covers all transactions from the previous
            day, reconciled against bank settlement data. It needs to be exact —
            finance cannot act on approximate data.
          </Para>

          <Para>
            Decision: <strong>Batch, daily at 4 AM.</strong> Exact financial data
            requires all transactions to have settled before processing. A 4 AM run
            gives 4 hours for any late-arriving transactions to appear in the source
            before the report is needed at 7 AM. Streaming would add complexity
            without helping — finance does not act on real-time P&amp;L, only on
            the final daily figure.
          </Para>

          <Para>
            <strong>Requirement 2 — Operations team needs a dashboard showing
            store performance for the last 30 minutes, refreshed every 5 minutes.</strong>
            Store managers use this to respond to issues mid-day (slow service, high
            order cancellation rate).
          </Para>

          <Para>
            Decision: <strong>Micro-batch, 5-minute trigger.</strong> 5-minute latency
            is perfectly adequate for a manager responding to operational issues.
            A Spark Structured Streaming job reads from Kafka (where order events
            are published as they occur), aggregates the last 30 minutes of data
            every 5 minutes, and writes to a Delta table that the dashboard queries.
            This is far simpler than true streaming and adequate for the use case.
          </Para>

          <Para>
            <strong>Requirement 3 — Risk team needs real-time payment fraud
            detection — block suspicious transactions before they complete.</strong>
            A transaction that requires investigation must be flagged within 2 seconds
            of the payment event.
          </Para>

          <Para>
            Decision: <strong>True streaming, Apache Flink.</strong> The 2-second
            latency requirement eliminates both batch and micro-batch. Flink is chosen
            over Spark Streaming because Flink's native event time processing and
            sub-second latency per record meet the requirement. The Flink job consumes
            from Kafka, computes a velocity score (transactions per card in last
            60 seconds), and publishes a fraud signal back to Kafka where the payment
            service reads it before completing the transaction.
          </Para>

          <Para>
            Three requirements, three different processing models. All three run in
            the same data platform, sharing the same Kafka cluster and the same
            Delta Lake. This is the architecture of a mature, fit-for-purpose
            data platform — not one model for everything, but the right model for
            each need.
          </Para>
        </div>
      </section>

      <Divider />

      {/* ── Part 09 — Interview Prep ─────────────────────────────────── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 09 — Interview Prep" />
        <SectionTitle>5 Interview Questions — With Complete Answers</SectionTitle>

        {[
          {
            q: 'Q1. What is the difference between batch processing and stream processing? When would you choose each?',
            a: `Batch processing collects a bounded set of data and processes it all in one pipeline execution on a schedule. The pipeline starts, processes all data in scope, writes results, and exits. It runs daily, hourly, or at some fixed interval. All data for a time window is available when the pipeline runs, making aggregations exact and reprocessing trivial.

Stream processing processes each event continuously as it arrives, with no concept of a run boundary. The pipeline is always running, consuming events from a stream source like Kafka and producing outputs with latency measured in milliseconds to seconds.

I choose batch when the latency requirement can be measured in minutes to hours, the transformation involves complex multi-pass logic or large lookups, correctness is more important than recency, or the team does not have streaming expertise. The vast majority of analytical workloads — finance reports, daily aggregates, warehouse loads, customer segmentation — are best served by batch.

I choose streaming only when the latency requirement is genuinely below what batch can provide — typically when the latency must be under a few minutes and a business action depends on it. Real-time fraud detection, live delivery tracking, and operational alerts that must fire within seconds are use cases that require streaming. The higher operational complexity, infrastructure cost, and correctness challenges of streaming are only justified when the latency requirement is real.

A common mistake is choosing streaming because it sounds more technically impressive. Always ask: what decision or action requires low latency? If the answer is a dashboard that humans look at once every few minutes, micro-batch with a 5-minute interval serves the need at a fraction of the complexity.`,
          },
          {
            q: 'Q2. What is micro-batch and how does Spark Structured Streaming implement it?',
            a: `Micro-batch is batch processing applied to very short time intervals — typically 30 seconds to 15 minutes. Instead of running once per day, the pipeline runs every N minutes, processing only the data that arrived since the last run. The result is lower latency than daily batch while retaining most of the operational simplicity of batch processing.

Spark Structured Streaming uses micro-batch execution by default. At each trigger interval, Spark checks for new data in the source (typically Kafka offsets or new files in S3), collects all records that arrived since the last trigger, processes them as a single bounded Spark batch job, writes results to the sink, commits offsets, and waits for the next trigger.

This means Spark Structured Streaming is not true record-by-record streaming even though it uses streaming APIs. It is effectively a very frequent batch job with persistent state managed across triggers via checkpointing. The checkpointLocation option tells Spark where to store this state — it records the last committed offset, intermediate aggregation state, and metadata needed to resume if the job restarts.

The trigger interval controls the latency. A 30-second trigger gives roughly 30–60 seconds of latency (trigger interval plus processing time). A 5-minute trigger gives 5–10 minutes of latency. The minimum practical trigger interval for Spark is about 1 second — below that, the overhead of starting and finishing a Spark job exceeds the processing time.

True record-by-record streaming with sub-second latency requires Apache Flink, which processes each event independently without waiting for a batch boundary. Flink is more complex to operate but achieves latencies of 10–200 milliseconds end-to-end.`,
          },
          {
            q: 'Q3. What is a watermark in stream processing and why is it needed?',
            a: `A watermark is a mechanism that tells a streaming system when it is safe to close a time window and produce a final result, even though late events might theoretically still arrive.

The need for watermarks arises from the gap between event time and processing time. Events do not always arrive at the stream processor in the order they occurred. A GPS event timestamped at 11:58 PM might arrive at the Kafka consumer at 12:03 AM due to network delays, mobile app buffering, or system load. If a streaming pipeline is computing hourly revenue and the 11:00 PM to 12:00 AM window receives this event 3 minutes after midnight, should the window reopen and produce an updated result? Or should it have already been finalised?

A watermark answers this question by specifying the maximum expected data lateness. With a 5-minute watermark, the streaming system tracks the maximum event time it has seen, subtracts 5 minutes, and uses that as the watermark. A window is safe to finalise when the watermark has advanced past the window's end time — meaning the system believes it has seen all events up to the watermark time.

Mathematically: watermark = max(event_time_seen) - allowed_lateness. Any event that arrives with an event time older than the current watermark is considered "too late" and is either dropped or handled by a separate late data mechanism depending on the framework configuration.

The watermark involves a fundamental trade-off: a smaller allowed lateness means windows close sooner and produce results faster, but late events beyond the watermark are dropped, making results less complete. A larger allowed lateness produces more complete results but adds latency because windows stay open longer. The correct watermark depends on empirically measuring the 99th percentile data lateness for the specific data source.`,
          },
          {
            q: 'Q4. How do you handle late-arriving data differently in batch vs streaming pipelines?',
            a: `The approaches are fundamentally different because the two models have different mechanisms available.

In batch processing, late-arriving data is handled by running the pipeline with a delay and optionally running correction batches. The daily pipeline for March 17 runs at 6 AM on March 18, giving 6 hours for any late transactions to arrive in the source before the pipeline reads them. Events that were genuinely delayed by minutes or hours after midnight are included naturally because the batch window has not closed yet. For data that might arrive even later — a partner sending a reconciliation file 48 hours after the fact — you run a correction batch that reprocesses the date range with all newly arrived data. Because the pipeline uses upsert semantics, re-running it produces the correct final result without creating duplicates.

In streaming processing, late-arriving data is handled with watermarks and allowed lateness configuration. You specify how long the streaming system will wait before closing a window — if the allowed lateness is 10 minutes, the system will accept events timestamped up to 10 minutes before the current watermark. Events that arrive later than the watermark threshold are handled differently depending on configuration: in Spark Structured Streaming's append output mode they are silently dropped, in update mode the window result is updated when late data arrives, and in complete mode all windows are always recomputed.

The practical recommendation: if your data can be significantly late (hours or days late due to offline mobile apps, partner delays, or manual uploads), do not try to handle this with streaming watermarks. The memory cost of keeping windows open for hours is prohibitive and the operational complexity is high. Use micro-batch with overlap windows for lateness under 30 minutes, and batch with correction runs for lateness measured in hours or days.`,
          },
          {
            q: 'Q5. Your team is building a new feature: the operations dashboard should show the last 15 minutes of delivery cancellation rates per store, updated every 2 minutes. What processing model would you use and why?',
            a: `This use case calls for micro-batch processing, not true streaming.

The latency requirement is 2-minute refresh, which is well within micro-batch's capabilities. A Spark Structured Streaming job with a 2-minute trigger interval would process all delivery events that arrived in the last 2 minutes, aggregate cancellation rates per store over a 15-minute sliding window, and write the results to a Delta table that the dashboard queries. The end-to-end latency from a cancellation event to it appearing on the dashboard would be approximately 2–3 minutes, well within the 2-minute refresh target.

I would specifically not use true streaming (Flink) for this use case because: 2-minute latency does not require record-by-record processing, Spark Structured Streaming is more familiar to most data engineering teams and much simpler to operate, and the cost of an always-on Flink cluster for a dashboard refresh is harder to justify than a Spark cluster that runs light micro-batch jobs.

The implementation would use a 15-minute sliding window with event time: groupBy window("event_time", "15 minutes", "2 minutes") to get overlapping windows that slide every 2 minutes. A watermark of 3 minutes handles late events. The output mode would be update so the dashboard gets fresh results on every trigger without recomputing the complete history.

The one thing I would add is a data quality check: alert if the number of delivery events in the last 2-minute batch falls below a threshold — say, fewer than 10 events per active store — which would indicate the source pipeline (delivery events flowing into Kafka) has stalled rather than genuinely having a quiet period.`,
          },
        ].map((item, i) => (
          <div key={i} style={{
            background: 'var(--surface)', border: '1px solid var(--border)',
            borderRadius: 12, padding: '24px 28px', marginBottom: 20,
          }}>
            <div style={{ fontSize: 14, fontWeight: 800, color: 'var(--text)', marginBottom: 14, lineHeight: 1.4 }}>
              {item.q}
            </div>
            <div style={{ fontSize: 14, color: 'var(--muted)', lineHeight: 1.85, whiteSpace: 'pre-line' }}>
              {item.a}
            </div>
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
            error: `Spark Structured Streaming job: StreamingQueryException — query failed on batch 47 due to checkpoint incompatibility after upgrading Spark version`,
            cause: 'Spark Structured Streaming checkpoints are tied to the Spark version and query plan. Upgrading Spark or changing the streaming query (adding a column, changing a filter) can make the existing checkpoint incompatible. Spark detects the schema mismatch between the saved checkpoint state and the new query plan and fails the stream rather than silently producing wrong results.',
            fix: 'Delete the checkpoint directory and restart the stream from scratch: remove the checkpointLocation directory in S3/ADLS and restart the job with the new Spark version. The stream will begin consuming from the latest Kafka offsets (or from the beginning if you set startingOffsets to earliest for a backfill). Accept that you will miss events between the last checkpoint and now, or replay those events from Kafka by setting the consumer offset manually. After any Spark upgrade, always test streaming job restarts in a staging environment before production.',
          },
          {
            error: `Kafka consumer lag grows continuously — streaming pipeline cannot keep up with the incoming event rate`,
            cause: 'The streaming pipeline\'s processing throughput is lower than the Kafka producer\'s write throughput. Consumer lag is the number of unprocessed messages — when it grows, the pipeline is falling further behind over time. Causes include: under-resourced executors, a slow transformation step, a slow sink (database write bottleneck), or a sudden spike in event volume.',
            fix: 'Diagnose first: check which stage is the bottleneck using Spark UI (for Spark Streaming) or Flink Metrics. If transformation is slow: profile the most expensive operations, add parallelism (increase num partitions). If the sink is slow: batch writes (use executemany not individual inserts), increase write parallelism, switch to async writes. If volume spiked: scale out the executor cluster. Set a consumer lag alert (> 100,000 messages or > 10 minutes of lag) so you catch growing lag before it becomes an hours-long backlog.',
          },
          {
            error: `Streaming aggregation produces incorrect counts — the same event is counted in two different time windows`,
            cause: 'Events are being double-counted because event time and processing time differ and the window boundary is being evaluated against processing time instead of event time. This happens when the streaming pipeline uses the wrong timestamp column for windowing — for example, using Kafka\'s message arrival timestamp (processing time) instead of the event\'s own timestamp field (event time).',
            fix: 'Ensure windowing always uses event time, not processing time. In Spark Structured Streaming: .withWatermark("event_time", "5 minutes").groupBy(window("event_time", "1 hour"), "store_id"). The event_time column must be the timestamp from the event payload, not the Kafka record timestamp (which is when Kafka received it, not when the event occurred). Verify by logging both timestamps for a sample of events and confirming they match your expectations.',
          },
          {
            error: `Batch pipeline reprocessing a historical date range produces different results than the original run for the same date`,
            cause: 'The pipeline uses a relative time window ("last 24 hours") or calls NOW() or CURRENT_TIMESTAMP at runtime, making the extraction window different depending on when the pipeline runs. A rerun on March 20 for "March 17 data" using WHERE created_at >= NOW() - INTERVAL \'3 days\' actually captures a different time range than the original run on March 18 using the same expression.',
            fix: 'Always parameterise pipelines with a fixed run_date: python pipeline.py --date 2026-03-17. Compute all time boundaries from this fixed parameter: start_ts = datetime(2026, 3, 17, 0, 0, 0, tzinfo=UTC), end_ts = start_ts + timedelta(days=1). Never use NOW() or CURRENT_DATE in the extraction query — these make the pipeline non-idempotent. This ensures that running the pipeline for 2026-03-17 on any date always produces the same result.',
          },
          {
            error: `StreamingQueryException: Detected a data loss condition — Kafka offsets are no longer available (offsets have been deleted from Kafka)`,
            cause: 'The streaming job was paused or stopped for longer than Kafka\'s configured log retention period. Kafka deleted the old log segments to free disk space. When the job restarted, it tried to resume from the saved checkpoint offset, but those messages no longer exist in Kafka.',
            fix: 'Immediate: delete the checkpoint and restart from the latest offset (accepting that events during the downtime are lost) or from scratch (triggering a backfill from S3 if available). Long-term: increase Kafka topic retention to accommodate your longest expected downtime. Configure retention.bytes and retention.ms: a log.retention.hours=168 (7 days) gives a week to recover a stopped job. Also set consumer group offset monitoring to alert when a group is inactive for more than N hours — catching this before Kafka deletes the offsets.',
          },
        ].map((item, i) => (
          <div key={i} style={{
            background: 'var(--bg2)', border: '1px solid var(--border)',
            borderRadius: 10, padding: '20px 24px', marginBottom: 16,
          }}>
            <div style={{
              fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--red)',
              marginBottom: 12, background: 'rgba(255,71,87,0.08)',
              border: '1px solid rgba(255,71,87,0.2)',
              borderRadius: 6, padding: '8px 12px', lineHeight: 1.5,
            }}>{item.error}</div>
            <div style={{ marginBottom: 8 }}>
              <span style={{
                fontSize: 10, fontWeight: 700, color: 'var(--muted)',
                fontFamily: 'var(--font-mono)', letterSpacing: '.1em', textTransform: 'uppercase',
              }}>Cause: </span>
              <span style={{ fontSize: 13, color: 'var(--muted)', lineHeight: 1.7 }}>{item.cause}</span>
            </div>
            <div>
              <span style={{
                fontSize: 10, fontWeight: 700, color: 'var(--accent)',
                fontFamily: 'var(--font-mono)', letterSpacing: '.1em', textTransform: 'uppercase',
              }}>Fix: </span>
              <span style={{ fontSize: 13, color: 'var(--muted)', lineHeight: 1.7 }}>{item.fix}</span>
            </div>
          </div>
        ))}
      </section>

      {/* ── Key Takeaways ────────────────────────────────────────────── */}
      <KeyTakeaways items={[
        'Batch processing runs on a schedule, processes bounded data, exits, and waits for the next scheduled interval. It is simple, correct, cheap, and the right default for the majority of data engineering workloads. Choose batch unless there is a specific latency requirement that batch cannot meet.',
        'Streaming processing handles each event continuously as it arrives with no run boundary. It is always running, has millisecond-to-second latency, but is significantly more complex and expensive to operate. Choose streaming only when the latency requirement is genuinely below what micro-batch can provide.',
        'Micro-batch is batch processing at short intervals (30 seconds to 15 minutes). Spark Structured Streaming is micro-batch under the hood — it collects records per trigger interval and processes them as bounded Spark jobs. Most "real-time" dashboard use cases are best served by micro-batch.',
        'Event time is when the event happened (the timestamp in the event payload). Processing time is when the pipeline processed it. Always use event time for business metrics — processing time produces wrong results when events arrive late or out of order.',
        'Watermarks tell a streaming system when to close a time window despite possible late arrivals. watermark = max_event_time_seen - allowed_lateness. Smaller allowed lateness = lower latency but late events are dropped. Larger allowed lateness = more complete results but higher latency.',
        'Late data handling: in batch, run the pipeline with a delay and optionally run correction batches (upserts handle re-processing cleanly). In micro-batch, use overlapping windows plus upserts. In streaming, use watermarks and allowed lateness. If data can be hours late, do not use streaming — use batch with correction.',
        'The decision framework: latency < 1s → true streaming (Flink); 1s–15min → micro-batch (Spark Structured Streaming); > 15min → batch. Always ask what business decision requires this latency before choosing streaming.',
        'Spark Structured Streaming is micro-batch, not true streaming. Apache Flink is true record-by-record streaming. For sub-second latency requirements, only Flink (or Kafka Streams) qualifies. For 1-minute or slower latency, Spark Structured Streaming is simpler and adequate.',
        'Lambda architecture (separate batch and streaming layers merged at serving) is declining because it requires two codebases for the same logic. The Kappa architecture (single streaming pipeline, replay Kafka for reprocessing) and the modern hybrid (streaming + batch writing to the same Delta Lake tables) are the current standards.',
        'Mature data platforms use all three models simultaneously: batch for finance reports, micro-batch for operations dashboards, streaming for fraud detection. The skill is matching the model to the latency requirement — not picking one model for everything.',
      ]} />

    </LearnLayout>
  )
}