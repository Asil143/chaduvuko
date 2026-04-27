// app/learn/data-engineering/system-design-de/page.tsx

import type { Metadata } from 'next'
import  { LearnLayout } from '@/components/content/LearnLayout'
import { Callout } from '@/components/content/Callout'
import { KeyTakeaways } from '@/components/content/KeyTakeaways'

export const metadata: Metadata = {
  title: 'Data Engineering System Design — How to Design Any Data System | Chaduvuko',
  description:
    'A complete framework for designing any data system from scratch — capacity estimation, storage selection, pipeline architecture, trade-off analysis, and five complete worked designs you will encounter in real interviews and real jobs.',
}

/* ── Local components (Module 37 style) ─────────────────────────────────── */

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

type ColHeader = { label: string; color?: string }
const Table = ({ headers, rows }: { headers: (string | ColHeader)[]; rows: Record<string, string>[] }) => {
  const hdrs: ColHeader[] = headers.map(h => typeof h === 'string' ? { label: h } : h)
  return (
    <div style={{ overflowX: 'auto', marginBottom: 28 }}>
      <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13.5 }}>
        <thead>
          <tr>
            {hdrs.map((h, i) => (
              <th key={i} style={{
                padding: '10px 16px', textAlign: 'left',
                fontSize: 11, fontWeight: 700,
                letterSpacing: i === 0 ? '.12em' : '.06em',
                textTransform: 'uppercase', color: h.color ?? 'var(--muted)',
                fontFamily: 'var(--font-mono)',
                borderBottom: h.color ? `2px solid ${h.color}` : '1px solid var(--border)',
                background: h.color ? `${h.color}08` : 'var(--bg2)',
                minWidth: i === 0 ? 150 : 160,
              }}>{h.label}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i} style={{ background: i % 2 === 0 ? 'var(--surface)' : 'var(--bg2)' }}>
              {hdrs.map((h, ki) => (
                <td key={ki} style={{
                  padding: '10px 16px',
                  color: ki === 0 ? 'var(--muted)' : 'var(--text)',
                  fontSize: ki === 0 ? 11 : 13.5,
                  fontFamily: ki === 0 ? 'var(--font-mono)' : 'inherit',
                  fontWeight: ki === 0 ? 700 : 400,
                  textTransform: ki === 0 ? 'uppercase' : 'none',
                  letterSpacing: ki === 0 ? '.06em' : 'normal',
                  borderBottom: '1px solid var(--border)',
                  borderLeft: ki > 0 && h.color ? `2px solid ${h.color}40` : ki > 0 ? '1px solid var(--border)' : 'none',
                  verticalAlign: 'top', lineHeight: 1.65,
                }}>{row[String(ki)]}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

const DesignStep = ({ number, title, children }: { number: string; title: string; children: React.ReactNode }) => (
  <div style={{
    display: 'grid',
    gridTemplateColumns: '48px 1fr',
    gap: '0 20px',
    marginBottom: 28,
    alignItems: 'start',
  }}>
    <div style={{
      width: 48, height: 48, borderRadius: '50%',
      background: 'rgba(0,230,118,0.1)',
      border: '1px solid rgba(0,230,118,0.25)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      fontFamily: 'var(--font-mono)', fontWeight: 900,
      fontSize: 15, color: 'var(--accent)', flexShrink: 0,
    }}>{number}</div>
    <div>
      <div style={{
        fontSize: 15, fontWeight: 700, color: 'var(--text)',
        marginBottom: 8, fontFamily: 'var(--font-display)',
      }}>{title}</div>
      {children}
    </div>
  </div>
)

/* ── Page ────────────────────────────────────────────────────────────────── */

export default function SystemDesignDEModule() {
  return (
    <LearnLayout
      title="Data Engineering System Design"
      description="A complete framework for designing any data system from scratch — capacity estimation, storage selection, pipeline architecture, trade-off analysis, and five complete worked designs."
      section="Data Engineering · Phase 6"
      readTime="80 min"
      updatedAt="March 2026"
    >

      {/* ── Part 01 — What the Interviewer Is Actually Testing ───────── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 01 — What Is Actually Being Tested" />
        <SectionTitle>What the Interviewer Is Actually Evaluating</SectionTitle>

        <Para>
          Data engineering system design interviews are not tests of whether you
          can name the right tools. They are tests of whether you can think like
          an engineer — whether you ask the right questions before designing,
          whether you understand trade-offs deeply enough to defend your choices,
          and whether you have the instincts to know when a design will break
          under real load.
        </Para>

        <Para>
          A candidate who immediately starts drawing boxes and naming tools
          (Kafka → Spark → Snowflake) without asking a single clarifying question
          is demonstrating the opposite of engineering judgment. The right
          answer to "design a data ingestion system" is a set of questions,
          not a diagram.
        </Para>

        <HighlightBox>
          <Para><strong>The four things a strong candidate demonstrates:</strong></Para>
          <Para>
            <strong>1. Requirements gathering —</strong> asks about data volume,
            velocity, latency requirements, consistency requirements, cost
            constraints, and team size before drawing anything. A system for
            10,000 events per day is architecturally different from one for
            10 million events per second.
          </Para>
          <Para>
            <strong>2. Capacity estimation —</strong> calculates actual numbers:
            storage per day, network throughput, compute requirements. Uses
            these numbers to make storage and processing decisions, not
            instinct.
          </Para>
          <Para>
            <strong>3. Trade-off articulation —</strong> for every architectural
            decision, states what is being traded away. Not "I'll use Kafka
            because it's good" — "I'll use a streaming broker here because
            we need sub-second latency, accepting the operational complexity
            that comes with it. If the team were smaller, I'd consider a
            simpler pull-based approach."
          </Para>
          <Para>
            <strong>4. Failure mode awareness —</strong> proactively identifies
            how the design fails under load, under node failures, under schema
            changes, and under upstream data quality issues. Junior engineers
            design happy paths. Senior engineers design failure paths.
          </Para>
        </HighlightBox>

        <Para>
          This module gives you a repeatable framework — a set of steps you run
          through for any system design question — and then walks through five
          complete designs that cover the most common patterns you will encounter
          in interviews at Indian tech companies and globally.
        </Para>
      </section>

      <Divider />

      {/* ── Part 02 — The Framework ──────────────────────────────────── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 02 — The Framework" />
        <SectionTitle>The Seven-Step Framework — Run This for Every Design Question</SectionTitle>

        <Para>
          This framework is not a rigid script. It is a mental checklist that
          ensures you never skip a critical dimension of the design. In a
          45-minute interview, you will not complete every step at full depth —
          you will move through them at a pace the interviewer sets. But knowing
          the framework means you always know what you have covered, what you
          have skipped, and what you would address given more time.
        </Para>

        <DesignStep number="1" title="Clarify requirements — do not design until you have numbers">
          <Para>
            Ask every question you need to size and constrain the design. The
            goal is to convert a vague prompt ("design a data pipeline") into
            a specific problem with measurable constraints.
          </Para>
          <CodeBox label="requirements questions — ask these first">
{`# Volume and velocity
"How many events per second at peak? What is the daily volume?"
"Is the load steady or bursty? What does the peak-to-average ratio look like?"

# Latency
"When data lands in the source, how quickly must it be available to consumers?"
"Is this seconds, minutes, or hours acceptable? Or do we need sub-100ms?"

# Consistency and correctness
"Is it acceptable to occasionally drop an event, or must every event be processed?"
"If a pipeline fails and replays, can the same event be processed twice safely?"
"Are there regulatory requirements — GDPR, DPDP, PCI-DSS?"

# Storage and retention
"How long must raw data be retained?"
"What are the query patterns on the stored data — point lookups, range scans, aggregations?"

# Scale trajectory
"Is this current scale or projected scale? What does 2x growth look like?"

# Team and operational constraints
"How large is the data engineering team? Is there 24/7 on-call?"
"What cloud provider and existing tooling is in place?"
"Is there a cost ceiling? Self-managed vs managed services trade-off preference?"`}
          </CodeBox>
        </DesignStep>

        <DesignStep number="2" title="Estimate capacity — calculate before deciding">
          <Para>
            Do the arithmetic. Numbers drive decisions. Without numbers, every
            architectural choice is a guess. This section has its own deep dive
            below — capacity estimation is a skill in itself.
          </Para>
        </DesignStep>

        <DesignStep number="3" title="Define the data model — what does a record look like?">
          <Para>
            Sketch the shape of the data: what fields exist, what their types
            are, what the primary/partition key is, and how the schema might
            evolve. Schema evolution is always a concern — a schema that can
            never change is a design that will be thrown away in 6 months.
          </Para>
        </DesignStep>

        <DesignStep number="4" title="Design the high-level architecture — boxes and arrows first">
          <Para>
            Draw the major components: ingestion, transport, storage, processing,
            serving. Name the layers, not the tools yet. Source → Ingestion Layer
            → Raw Storage → Processing → Serving Layer. Then justify what type
            of component each layer needs based on your requirements and capacity
            numbers.
          </Para>
        </DesignStep>

        <DesignStep number="5" title="Select components and justify each choice">
          <Para>
            Now name the tools — and for each one, state what you are accepting
            as a consequence. "Kafka for transport because we need replay and
            fan-out — accepting the operational overhead of managing a Kafka
            cluster." "Delta Lake for raw storage because we need ACID
            transactions and time travel — accepting the Spark dependency."
            Every tool choice is a trade-off.
          </Para>
        </DesignStep>

        <DesignStep number="6" title="Address the hard problems explicitly">
          <Para>
            Every design has three or four genuinely difficult problems. Name
            them proactively — do not wait for the interviewer to find them.
            Common hard problems: late-arriving data, schema evolution,
            deduplication, backfilling historical data, handling upstream outages,
            managing costs at scale, and cross-region data replication.
          </Para>
        </DesignStep>

        <DesignStep number="7" title="Discuss failure modes and monitoring">
          <Para>
            What happens when the ingestion layer goes down? What happens when
            the processing job falls behind? What happens when the source schema
            changes without notice? What metrics would you monitor, and what
            alerts would you set? A design without a failure story is not
            production-ready.
          </Para>
        </DesignStep>
      </section>

      <Divider />

      {/* ── Part 03 — Capacity Estimation ───────────────────────────── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 03 — Capacity Estimation" />
        <SectionTitle>Capacity Estimation — The Arithmetic That Drives Every Decision</SectionTitle>

        <Para>
          Capacity estimation is the skill of approximating storage, compute,
          and network requirements from a few input numbers. You will never
          get it exactly right — you are estimating, not budgeting. The goal
          is to get within an order of magnitude, identify the dominant cost
          and bottleneck, and make decisions that remain correct even if your
          estimates are off by 2x in either direction.
        </Para>

        <SubTitle>The numbers every data engineer should have memorised</SubTitle>

        <Table
          headers={['Quantity', { label: 'Approximate value', color: '#00e676' }, 'Use in estimation']}
          rows={[
            { '0': 'Disk sequential read', '1': '200–500 MB/s (HDD), 1–3 GB/s (SSD)', '2': 'How fast a Spark job can scan a partition' },
            { '0': 'Network bandwidth (cloud)', '1': '1–10 Gbps per instance = 125 MB/s – 1.25 GB/s', '2': 'Upper bound on shuffle speed between nodes' },
            { '0': 'Memory bandwidth', '1': '50–100 GB/s', '2': 'How fast in-memory operations run — almost never the bottleneck' },
            { '0': '1 million rows × 500 bytes', '1': '~500 MB', '2': 'Baseline for a mid-size table scan' },
            { '0': 'Parquet compression ratio', '1': '5–10x vs CSV for structured data', '2': 'A 10 GB CSV lands as ~1–2 GB in Parquet' },
            { '0': 'Kafka message overhead', '1': '~100–200 bytes per message', '2': 'Minimum event size in a topic' },
            { '0': 'S3 / ADLS PUT latency', '1': '10–50 ms per request', '2': 'Small file write cost — why small files kill performance' },
            { '0': 'Cross-region network latency', '1': '50–200 ms (New York ↔ Singapore)', '2': 'Minimum latency for synchronous cross-region operations' },
            { '0': '1 day in seconds', '1': '86,400 ≈ 100,000', '2': 'Quick conversion for per-second → per-day estimates' },
          ]}
        />

        <SubTitle>A complete capacity estimation walkthrough</SubTitle>

        <CodeBox label="capacity estimation — e-commerce order events">
{`# Problem: Design a data pipeline for an Indian e-commerce company
# Input: "We process about 5 million orders per day"

# ── Step 1: Convert to per-second rate ──────────────────────────────────────
daily_orders = 5_000_000
seconds_per_day = 86_400
avg_rate = daily_orders / seconds_per_day          # ≈ 58 orders/second

# But load is not flat. Dinner rush / sale events create spikes.
# Assume peak is 10x average (common for Indian e-commerce during Big Billion Days)
peak_rate = avg_rate * 10                          # ≈ 580 orders/second

# Design for peak, not average. A system that handles 58/s but fails at 580/s
# will fail at the exact moment it matters most.

# ── Step 2: Estimate event size ─────────────────────────────────────────────
# order.placed event (sketch the fields):
# - IDs: order_id, customer_id, store_id       ~50 bytes
# - Items array (avg 3 items × 40 bytes each)  ~120 bytes
# - Address struct                              ~100 bytes
# - Timestamps, metadata                        ~80 bytes
# - Total raw JSON                              ~350 bytes
# - After snappy compression in Kafka           ~200 bytes
event_size_bytes = 200

# ── Step 3: Kafka topic throughput ──────────────────────────────────────────
peak_kafka_throughput = peak_rate * event_size_bytes  # 580 × 200 = 116 KB/s
# With replication factor 3: 116 KB/s × 3 = 348 KB/s total broker write I/O
# A modern Kafka broker handles 500 MB/s+ → single broker is fine
# But for HA, use at least 3 brokers

# Partition count for peak throughput:
# One Kafka partition handles ~50–100 MB/s safely
# Peak throughput = 116 KB/s → even 1 partition is fine for throughput
# BUT: parallelism requirement → use 12 partitions (4 consumer threads × 3 for headroom)
# AND: partition key = customer_id for ordering (10M+ customers → no hot partition)

# ── Step 4: Raw storage (landing zone) ──────────────────────────────────────
raw_event_size_json = 350  # bytes (uncompressed)
daily_raw_storage = daily_orders * raw_event_size_json  # 5M × 350B = 1.75 GB/day
# In Parquet with snappy: ~350 MB/day (5x compression ratio)
# With 30-day retention: 350 MB × 30 = ~10.5 GB
# Negligible — object storage costs ~$0.02/GB/month → $0.21/month for 30 days
# (Storage is almost never the constraint. Compute is.)

# ── Step 5: Processing compute ───────────────────────────────────────────────
# Streaming enrichment job: join orders with customer profile + store metadata
# Each event: read from Kafka, look up customer (Redis cache hit ~0.5ms),
#             look up store (in-memory, ~0μs), enrich, write to Delta Lake

# At peak: 580 events/second
# Processing time per event: ~2ms (Kafka read + cache lookup + write)
# Single-threaded throughput: 1000ms / 2ms = 500 events/second
# Need: 580/500 = 1.16 threads → 2 consumer threads easily handles peak

# For batch daily aggregation (runs at 2 AM):
# 5M rows × 350 bytes = 1.75 GB to scan
# Spark on 4 cores at 200 MB/s each = 800 MB/s total
# Scan time: 1.75 GB / 800 MB/s = ~2.2 seconds
# Even with shuffle and aggregation overhead: job completes in < 2 minutes
# → Don't over-engineer. A single small Spark cluster is sufficient.

# ── Step 6: Serving layer storage ────────────────────────────────────────────
# Gold layer: daily_revenue_by_store (10 stores × 365 days = 3,650 rows/year)
# Utterly trivial — fits in a spreadsheet
# Gold layer: hourly_orders_by_city (50 cities × 24 hours × 365 = 438,000 rows/year)
# ~50 MB/year — any database handles this instantly
# Conclusion: serving layer is not a scale problem here`}
        </CodeBox>

        <Callout type="tip">
          In interviews, narrate your estimation out loud. The interviewer is
          not checking whether your numbers are correct — they are watching
          whether you know what numbers matter, how to derive them from first
          principles, and whether your conclusions follow logically from your
          estimates. An approximate answer with clear reasoning is far better
          than a precise answer with no explanation.
        </Callout>
      </section>

      <Divider />

      {/* ── Part 04 — Storage Selection ─────────────────────────────── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 04 — Storage Selection" />
        <SectionTitle>Choosing the Right Storage — The Decision Tree</SectionTitle>

        <Para>
          The most consequential decision in a data system design is storage
          selection. The wrong storage choice cannot be fixed by adding more
          compute. Every other layer in the system is shaped by what the storage
          layer can and cannot do. This decision tree covers the most common
          storage choices a data engineer makes.
        </Para>

        <Table
          headers={[
            'If you need...',
            { label: 'Use this', color: '#00e676' },
            'Why — and what you are giving up',
          ]}
          rows={[
            {
              '0': 'Durable, cheap, long-term storage for raw/historical data at any scale',
              '1': 'Object storage: S3, ADLS Gen2, GCS',
              '2': 'Cheapest at scale (< $0.025/GB/month). No schema required. Unlimited size. Gives up: no random access — full file reads only, no atomic row updates.',
            },
            {
              '0': 'Object storage + ACID transactions + schema enforcement + time travel',
              '1': 'Table format on object storage: Delta Lake, Apache Iceberg, Apache Hudi',
              '2': 'Adds ACID, schema evolution, MERGE/UPDATE/DELETE to raw object storage. Gives up: requires a compatible query engine (Spark, Trino, Dremio). Cannot use standard SQL clients directly against files.',
            },
            {
              '0': 'Fast analytical queries on large datasets — columnar scans, aggregations',
              '1': 'Cloud data warehouse: Snowflake, BigQuery, Redshift, Azure Synapse',
              '2': 'Fully managed, SQL interface, excellent query performance, auto-scaling. Gives up: expensive at high query volume, data must be loaded (not queried in place), vendor lock-in.',
            },
            {
              '0': 'Transactional data with row-level reads, writes, and ACID guarantees',
              '1': 'OLTP database: PostgreSQL, MySQL, CockroachDB',
              '2': 'Row-level operations, referential integrity, strong consistency. Gives up: full-table scans are slow, horizontal write scaling is hard, not designed for analytical queries.',
            },
            {
              '0': 'Sub-millisecond key-value lookups — enrichment, caching, feature serving',
              '1': 'In-memory store: Redis, DynamoDB (for low-latency access)',
              '2': 'Extremely fast point lookups. Gives up: expensive per GB, no complex queries, data must fit in memory (Redis) or be carefully modelled (DynamoDB).',
            },
            {
              '0': 'Time-series data — metrics, sensor readings, financial tick data',
              '1': 'Time-series DB: InfluxDB, TimescaleDB, Apache Druid',
              '2': 'Optimised for timestamp-based inserts and range queries. Automatic data tiering. Gives up: poor performance for non-time-based query patterns.',
            },
            {
              '0': 'Full-text search, log analysis, document retrieval',
              '1': 'Search engine: Elasticsearch, OpenSearch, Solr',
              '2': 'Inverted indexes for full-text search, fast aggregations on log data. Gives up: not a reliable source of truth — designed for search, not durability. Always have a primary store.',
            },
            {
              '0': 'Graph traversal — recommendations, fraud network analysis, knowledge graphs',
              '1': 'Graph database: Neo4j, Amazon Neptune, TigerGraph',
              '2': 'Efficient multi-hop graph traversal. Gives up: poor performance for non-graph queries, niche ecosystem, expensive at scale.',
            },
          ]}
        />
      </section>

      <Divider />

      {/* ── Part 05 — Trade-Off Vocabulary ──────────────────────────── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 05 — Trade-Off Vocabulary" />
        <SectionTitle>The Seven Trade-Offs That Appear in Every Design</SectionTitle>

        <Para>
          These seven trade-offs come up in almost every data system design
          discussion. Having precise language for them lets you structure your
          reasoning clearly and respond to pushback intelligently.
        </Para>

        <SubTitle>1 — Batch vs streaming</SubTitle>
        <Para>
          Batch: simpler, cheaper, higher throughput, higher latency (minutes to
          hours). Streaming: complex, expensive, lower throughput per dollar,
          lower latency (seconds). Use streaming when latency is a business
          requirement — not because it sounds more impressive. A daily revenue
          report at Uber Eats does not need streaming. A fraud detection system at
          Stripe does.
        </Para>

        <SubTitle>2 — Normalisation vs denormalisation</SubTitle>
        <Para>
          Normalised data (many tables, joins required) is storage-efficient and
          easy to update but slow to query analytically — every query pays a join
          cost. Denormalised data (wide tables, pre-joined) is fast to query but
          expensive to update and uses more storage. Data warehouses almost always
          denormalise at the gold layer because query speed matters more than
          update efficiency.
        </Para>

        <SubTitle>3 — Consistency vs availability</SubTitle>
        <Para>
          As covered in Module 42 — during a network partition, you choose between
          refusing requests (consistent, unavailable) or responding with potentially
          stale data (available, inconsistent). Outside of partitions, there is the
          latency vs consistency trade-off: strongly consistent reads take longer
          because they coordinate across nodes.
        </Para>

        <SubTitle>4 — Storage cost vs query cost</SubTitle>
        <Para>
          Storing data in raw JSON costs less to write but costs more to query
          (full parse every time). Storing in Parquet costs more to write
          (schema enforcement, column encoding) but far less to query (column
          pruning, predicate pushdown). Materialised views and pre-aggregated
          tables spend storage dollars to save compute dollars — the right choice
          when the same aggregation is queried many times per day.
        </Para>

        <SubTitle>5 — Managed vs self-managed</SubTitle>
        <Para>
          Managed services (Confluent Kafka, Databricks, Snowflake, BigQuery)
          cost more per unit of compute but eliminate operational burden — no
          version upgrades, no cluster management, no on-call for the
          infrastructure. Self-managed (open-source Kafka, open-source Spark,
          open-source Airflow on EC2) costs less per unit but requires
          significant engineering and operational time. The break-even depends
          on your team's size and expertise.
        </Para>

        <SubTitle>6 — Latency vs throughput</SubTitle>
        <Para>
          Optimising for latency (how fast one event is processed) and optimising
          for throughput (how many events are processed per second) often require
          opposite approaches. Low latency favours small batches, synchronous
          processing, and fast network round-trips. High throughput favours large
          batches, asynchronous processing, and amortising overhead across many
          records.
        </Para>

        <SubTitle>7 — Flexibility vs performance</SubTitle>
        <Para>
          A schema-on-read data lake accepts any format — flexible, easy to land
          data. Querying it is slow because every query must parse the raw format.
          A schema-on-write warehouse enforces types and structure on ingestion —
          inflexible, harder to land data, but queries are fast. The data lakehouse
          (Delta Lake, Iceberg) tries to have both — but it adds its own complexity.
        </Para>
      </section>

      <Divider />

      {/* ── Part 06 — Design 1: Real-Time Ingestion Pipeline ─────────── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Design 01 — Real-Time Ingestion" />
        <SectionTitle>Design 1 — Real-Time Event Ingestion for a Fintech at Scale</SectionTitle>

        <Para>
          <strong>Prompt:</strong> Design a system to ingest payment events from
          Stripe's payment gateway in real time. 5 million transactions per day,
          peak 2,000 transactions per second. Events must be available for
          fraud detection within 2 seconds of occurring. Raw events must be
          retained for 7 years for regulatory compliance. Analytics team
          needs daily aggregations by merchant, city, and payment method.
        </Para>

        <SubTitle>Requirements clarification answers (assume these were given)</SubTitle>
        <Para>
          Latency SLA: fraud detection within 2 seconds — streaming required.
          Consistency: every transaction must be processed — no drops, at-least-once
          with idempotent consumers. Schema: JSON events, schema may evolve
          (new payment methods, new fields). Team: 8 engineers, cloud on AWS.
        </Para>

        <SubTitle>Capacity estimation</SubTitle>
        <CodeBox label="razorpay payments — capacity numbers">
{`daily_transactions    = 5_000_000
peak_tps              = 2_000          # transactions per second at peak
event_size_json       = 400            # bytes (payment_id, amounts, merchant, UPI IDs, etc.)
event_size_compressed = 180            # bytes after snappy in Kafka

# Kafka throughput at peak:
peak_kafka_mb_per_sec = peak_tps * event_size_compressed / 1_000_000   # = 0.36 MB/s
# Trivial for Kafka. Design for 10x headroom → 3.6 MB/s.
# 6 partitions, replication_factor=3, acks=all, min.insync.replicas=2

# Raw storage (7-year compliance):
daily_parquet_gb      = 5_000_000 * 400 / 5 / 1e9    # 5x compression ratio → 0.4 GB/day
annual_parquet_gb     = daily_parquet_gb * 365         # ≈ 146 GB/year
seven_year_total_gb   = annual_parquet_gb * 7          # ≈ 1 TB over 7 years
# S3 Glacier for compliance tier: 1 TB × $0.004/GB/month × 84 months ≈ $336 total
# Cost is negligible. Use S3 Intelligent-Tiering for automatic hot→cold→archive tiering.

# Streaming processing (fraud detection):
# 2,000 events/second, each requiring:
# - Kafka read: 0ms (consumer already polling)
# - Redis lookup (customer velocity features): 0.5ms
# - ML model inference (pre-loaded in memory): 1ms
# - Decision write to DynamoDB: 2ms
# Total per event: ~3.5ms → single consumer thread: 285 events/second
# Need: 2000 / 285 = 7 consumer threads
# Deploy: 2 consumer instances, 4 threads each = 8 threads (1 idle for headroom)`}
        </CodeBox>

        <SubTitle>Architecture</SubTitle>
        <CodeBox label="razorpay ingestion — full architecture">
{`# ── Layer 1: Source ──────────────────────────────────────────────────────────
# Payment Gateway → produces payment.completed events to Kafka
# Producer config: acks=all, enable.idempotence=true, retries=10
# Partition key: payment_id (high cardinality, even distribution)
# Topic: razorpay.payments.v2 (versioned topic name — schema version in name)

# ── Layer 2: Transport (Kafka) ────────────────────────────────────────────────
# 3-broker MSK cluster (AWS managed Kafka)
# Topic: 6 partitions, RF=3, min.isr=2
# Retention: 7 days (compliance data lives in S3, not Kafka forever)
# Schema registry: AWS Glue Schema Registry with Avro schemas
# → Schema evolution enforced at produce time — prevents silent schema breaks

# ── Layer 3A: Streaming consumer (fraud path) ─────────────────────────────────
# Consumer group: fraud-detection, 2 instances × 4 threads
# Reads from razorpay.payments.v2
# Enriches each event:
#   → Redis: customer_velocity (transactions in last 1min, 5min, 1hr)
#   → Redis: merchant_risk_score (pre-computed, refreshed every 5 minutes)
# Runs rule engine + ML model (scikit-learn, loaded at startup)
# Writes decision to DynamoDB: {payment_id, decision, risk_score, latency_ms}
# Writes to Kafka: razorpay.fraud.decisions.v1 (for downstream alerting)
# SLA: p99 latency < 2 seconds from event production to decision written
# Monitoring: emit latency histogram per event, alert if p95 > 1.5s

# ── Layer 3B: Batch consumer (compliance + analytics path) ───────────────────
# Kafka Connect S3 Sink connector
# Flushes Kafka topic to S3 every 5 minutes as Parquet files
# Path: s3://razorpay-compliance/raw/payments/year=2026/month=03/day=20/hour=14/
# → Hive-compatible partitioning for Athena queries
# S3 Lifecycle rule: Standard (0–90 days) → IA (90–365 days) → Glacier (1–7 years)

# ── Layer 4: Batch processing (daily analytics) ──────────────────────────────
# Airflow DAG: runs at 2 AM, after all events for the day have landed in S3
# Spark on EMR Serverless (no cluster management)
# Reads from S3 raw Parquet → applies business logic → writes to S3 gold Parquet
# Gold tables:
#   daily_revenue_by_merchant (merchant_id, date, txn_count, total_paise, success_rate)
#   daily_volume_by_city (city, date, txn_count, total_paise, top_payment_method)
#   daily_payment_method_mix (payment_method, date, txn_count, percentage_of_total)

# ── Layer 5: Serving ──────────────────────────────────────────────────────────
# Analytics team: Redshift Spectrum queries gold Parquet in S3 directly (no data copy)
# Operations team: Grafana dashboard reading from DynamoDB fraud decisions
# Compliance team: Athena ad-hoc queries against raw S3 Parquet (7-year archive)

# ── Hard problems addressed ───────────────────────────────────────────────────
# 1. Schema evolution: Avro + schema registry. Backward-compatible changes allowed.
#    Breaking changes require new topic version (razorpay.payments.v3).

# 2. Deduplication: payment_id is globally unique. Fraud consumer uses DynamoDB
#    conditional write (put_item with condition: attribute_not_exists(payment_id))
#    → idempotent, no double-processing even on consumer crash + replay.

# 3. Late-arriving events (payment gateway retries): Kafka offset ordering within
#    partition is sufficient. Batch job uses event_time, not processing_time,
#    for day boundary — watermark of 10 minutes handles mobile app latency.

# 4. Upstream outage: Kafka buffers up to 7 days. If fraud detection service is
#    down for 4 hours, it replays from committed offset on recovery. DLQ topic
#    (razorpay.fraud.dlq) catches events that fail after 3 retries.`}
        </CodeBox>
      </section>

      <Divider />

      {/* ── Part 07 — Design 2: Data Warehouse ───────────────────────── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Design 02 — Data Warehouse" />
        <SectionTitle>Design 2 — Data Warehouse for a Mid-Size E-Commerce Company</SectionTitle>

        <Para>
          <strong>Prompt:</strong> Shopify has 15 engineers and is growing fast.
          They have operational data in PostgreSQL (orders, users, products),
          MongoDB (product catalogue, reviews), and Firebase (mobile app events).
          The analytics team is running ad-hoc queries directly on the production
          PostgreSQL and it is affecting latency. Design a data warehouse.
        </Para>

        <SubTitle>Capacity estimation</SubTitle>
        <CodeBox label="meesho warehouse — sizing">
{`# Source volumes:
orders_per_day          = 800_000
avg_order_row_size_bytes = 500
daily_orders_gb          = 800_000 * 500 / 1e9    # = 0.4 GB/day

product_catalogue_rows  = 50_000_000              # 50M products
catalogue_row_bytes     = 2_000                   # product title, description, images
catalogue_total_gb      = 50_000_000 * 2000 / 1e9 # = 100 GB (grows slowly)

firebase_events_per_day = 50_000_000              # 50M app events (page views, clicks)
firebase_event_bytes    = 200
firebase_daily_gb       = 50_000_000 * 200 / 1e9  # = 10 GB/day
# → Firebase events dominate storage growth: 10 GB/day × 365 = 3.65 TB/year

# Total warehouse storage after 1 year:
# Orders (incremental): 0.4 GB × 365 = 146 GB
# Product catalogue (full refresh weekly): ~100 GB
# Firebase events: 3.65 TB
# Total ≈ 4 TB in year 1 (before compression)
# In Parquet: ~800 GB (5x compression ratio)
# Snowflake storage at $23/TB/month: ~$18/month → negligible`}
        </CodeBox>

        <SubTitle>Architecture — the classic lakehouse pattern</SubTitle>
        <CodeBox label="meesho warehouse — architecture">
{`# ── Ingestion ─────────────────────────────────────────────────────────────────

# Source 1: PostgreSQL → Fivetran CDC connector (change data capture)
# Fivetran detects row-level changes using PostgreSQL WAL (logical replication)
# Streams changes to Snowflake staging tables in near-real-time
# Why Fivetran: 15-person team cannot maintain custom CDC pipelines
# Cost: ~$500/month for Shopify's volume — justified by engineering time saved

# Source 2: MongoDB → Fivetran MongoDB connector
# Full refresh weekly for product catalogue (CDC on MongoDB is trickier)
# Why: catalogue changes infrequently, full refresh acceptable

# Source 3: Firebase → Firebase → BigQuery export → GCS → Snowflake Snowpipe
# Firebase has native BigQuery export — pipe from there to GCS as Parquet
# Snowpipe auto-ingests new files as they land in the GCS bucket
# Daily batch (not real-time — analytics team doesn't need sub-hour event data)

# ── Storage: Snowflake ────────────────────────────────────────────────────────
# Three-layer architecture (Medallion):
# RAW schema:    exact mirror of source systems (Fivetran writes here)
# STAGING schema: cleaned, typed, deduplicated, no business logic
# MART schema:   business-level aggregations, wide tables, analyst-facing

# Why Snowflake over alternatives:
# → Team of 15 has no one to manage Spark clusters or Redshift nodes
# → Snowflake auto-suspends compute when idle → cost control for startup
# → SQL-only interface — analysts already know SQL, no new tool learning
# → dbt for transformations: version-controlled SQL, automatic lineage, tests

# ── Transformation: dbt ───────────────────────────────────────────────────────
# Models (in dependency order):
# stg_orders          : raw orders → cleaned, typed, handle nulls, deduplicate
# stg_users           : raw users → PII masked for dev/test, cleaned
# stg_products        : raw MongoDB catalogue → normalised structure
# stg_firebase_events : raw events → sessionised, bot traffic filtered

# mart_daily_orders:
#   SELECT
#     DATE_TRUNC('day', event_time) AS order_date,
#     city, category, payment_method,
#     COUNT(*) AS order_count,
#     SUM(gmv_paise) / 100.0 AS gmv_inr,
#     COUNT(DISTINCT user_id) AS unique_buyers
#   FROM stg_orders
#   GROUP BY 1,2,3,4

# mart_user_cohorts: D1/D7/D30 retention by acquisition channel and cohort week
# mart_product_performance: sell-through rate, return rate, rating by product_id

# dbt tests on every model:
#   - not_null on primary keys
#   - unique on primary keys
#   - accepted_values on status fields
#   - relationships between staging models
#   - freshness checks: raw.orders updated within last 4 hours

# ── Serving ───────────────────────────────────────────────────────────────────
# Metabase (self-hosted) connected to Snowflake mart schema
# Analysts write SQL against mart_ tables — no raw table access
# Role-based access: analysts can only SELECT on mart_, not raw or staging
# Scheduled dbt runs: Airflow DAG at 3 AM, 9 AM, 3 PM, 9 PM (4× daily refresh)

# ── Hard problems ─────────────────────────────────────────────────────────────
# 1. Late-arriving updates (order status changes hours after order_date):
#    mart_daily_orders uses event_time of the ORDER, not the update.
#    Status changes produce new rows in stg_orders — handled by SCD Type 2.
#    mart recomputes the rolling 3-day window on each run.

# 2. dbt incremental models for cost control:
#    Full refresh of 3.65 TB Firebase events every day = expensive Snowflake compute
#    Solution: incremental model — only process new events since last run
#    SELECT ... FROM stg_firebase_events
#    {% if is_incremental() %}
#    WHERE event_date >= (SELECT MAX(event_date) FROM {{ this }})
#    {% endif %}

# 3. PII in the warehouse:
#    stg_users masks email and phone by default
#    Snowflake dynamic data masking policy on email column
#    Only privacy_admin role sees real values — analysts see user_XXXXXXXX@masked.dev`}
        </CodeBox>
      </section>

      <Divider />

      {/* ── Part 08 — Design 3: Feature Store ───────────────────────── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Design 03 — Feature Store" />
        <SectionTitle>Design 3 — Feature Store for an ML Platform</SectionTitle>

        <Para>
          <strong>Prompt:</strong> DoorDash's ML team is training and serving
          recommendation and ETA prediction models. Feature computation is
          duplicated across 6 different ML projects. Some features need to be
          available at serving time in under 5ms. Some features are expensive
          to compute and should only be computed once. Design a feature store.
        </Para>

        <Para>
          A feature store has two paths with fundamentally different requirements:
          the offline path (training data, batch features, latency in minutes)
          and the online path (serving features, real-time, latency in
          milliseconds). Most feature store architectures serve both from
          different storage systems, keeping them in sync.
        </Para>

        <CodeBox label="feature store — dual store architecture">
{`# ── Feature definitions ───────────────────────────────────────────────────────
# Features are defined once, shared across all ML projects

feature_groups = {
    "customer_stats": {
        "entity": "customer_id",
        "features": [
            "order_count_7d",          # orders in last 7 days
            "avg_order_value_7d",      # average GMV in last 7 days
            "preferred_cuisine",       # most ordered cuisine (rolling 30d)
            "last_order_restaurant",   # restaurant_id of most recent order
            "days_since_last_order",   # recency signal
        ],
        "freshness_requirement": "1 hour",    # how stale is acceptable
        "computation": "batch"                # can be computed hourly in Spark
    },
    "restaurant_real_time": {
        "entity": "restaurant_id",
        "features": [
            "current_order_queue_depth",  # orders currently being prepared
            "avg_prep_time_last_10_orders",
            "is_accepting_orders",        # live status
        ],
        "freshness_requirement": "30 seconds",  # must be near real-time
        "computation": "streaming"              # computed from Kafka events
    },
    "delivery_context": {
        "entity": "delivery_partner_id",
        "features": [
            "current_location_lat",
            "current_location_lon",
            "orders_in_flight",
            "estimated_minutes_to_free",
        ],
        "freshness_requirement": "10 seconds",
        "computation": "streaming"
    }
}

# ── Offline store (training data) ─────────────────────────────────────────────
# Delta Lake on S3/ADLS
# Append-only, timestamped feature values — point-in-time correct joins
# For training: "give me feature values for customer C98765 as they existed
#                at 2026-01-15 14:23:00" — not the current values
# Why: training data must reflect what the model would have seen at prediction time
#      using current feature values to train on historical labels = data leakage

# Point-in-time correct join (time travel in Delta Lake):
# SELECT c.customer_id, c.order_count_7d, c.preferred_cuisine, o.target_label
# FROM customer_stats_history AS OF TIMESTAMP '2026-01-15 14:23:00' AS c
# JOIN labeled_orders AS o
#   ON c.customer_id = o.customer_id
#   AND o.order_time BETWEEN '2026-01-15 14:00:00' AND '2026-01-15 15:00:00'

# ── Online store (serving) ────────────────────────────────────────────────────
# Redis Cluster — single-digit millisecond lookups
# Key format: {feature_group}:{entity_id}
# "customer_stats:C98765" → {"order_count_7d": 12, "preferred_cuisine": "biryani", ...}
# TTL: 2 hours (customer_stats), 60 seconds (restaurant_real_time)

# Batch feature pipeline → writes to BOTH Delta Lake AND Redis
# Streaming feature pipeline (Kafka Streams / Flink) → writes to BOTH Delta Lake AND Redis

# ── Serving API ───────────────────────────────────────────────────────────────
# Feature server: FastAPI, deployed as a Kubernetes service
# SLA: p99 < 5ms (Redis lookup is 0.5ms, overhead is HTTP + serialisation)

# GET /features/batch
# {
#     "feature_groups": ["customer_stats", "restaurant_real_time"],
#     "entities": {
#         "customer_id": "C98765",
#         "restaurant_id": "R00123"
#     }
# }
# → pipelined Redis MGET for all feature keys → single round trip
# → returns merged feature dict in ~1ms

# ── Hard problems ─────────────────────────────────────────────────────────────
# 1. Training-serving skew:
#    Same feature computation logic must run in batch (PySpark) and streaming (Kafka)
#    and serving (Python). Three implementations = three chances for bugs.
#    Solution: Feature transforms defined as pure Python functions.
#    Spark calls them via UDF. Kafka consumer calls them directly.
#    Feature server calls them for on-the-fly features.
#    One source of truth for logic.

# 2. Cold-start for new entities:
#    New restaurant: no features in Redis yet.
#    Solution: fallback to category-level averages or global averages.
#    Feature server checks Redis. On miss: queries offline store for most recent batch.
#    On second miss: returns category default values. Never returns null.

# 3. Feature versioning:
#    order_count_7d definition changes (e.g., only count successful orders, not cancelled)
#    Solution: features are versioned. New version = new key prefix in Redis.
#    "customer_stats_v2:C98765" vs "customer_stats_v1:C98765"
#    Model retrained on v2 features before v1 is deprecated.`}
        </CodeBox>
      </section>

      <Divider />

      {/* ── Part 09 — Design 4: Backfill ────────────────────────────── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Design 04 — Backfill" />
        <SectionTitle>Design 4 — Backfilling 3 Years of Historical Data Without Disrupting Production</SectionTitle>

        <Para>
          <strong>Prompt:</strong> Amazon's data team built a new customer
          lifetime value (CLTV) model that needs 3 years of order history in
          the data warehouse. The warehouse only has 6 months of data. Design
          a backfill pipeline to load 3 years of historical data from the
          production PostgreSQL database without impacting production query
          performance.
        </Para>

        <Para>
          Backfill is one of the most underestimated problems in data engineering.
          It combines the challenges of bulk data extraction, schema evolution
          across years of historical data, rate limiting, idempotent reprocessing,
          and cost management. Many teams discover their pipeline architecture only
          works for incremental loads after being asked to backfill — and have to
          rearchitect.
        </Para>

        <CodeBox label="backfill pipeline — design and execution">
{`# ── Phase 1: Assess the scope ──────────────────────────────────────────────
# Before writing code:
# 1. Count rows per month for the 3-year period (orders table)
#    SELECT DATE_TRUNC('month', created_at) AS month, COUNT(*) AS row_count
#    FROM orders WHERE created_at >= '2023-01-01'
#    ORDER BY 1;
#    → Gives you a distribution: are months uniform? Any gaps? Any huge months?

# 2. Check table size and index coverage
#    SELECT pg_size_pretty(pg_total_relation_size('orders'));
#    → "284 GB" — a full table scan will be slow and impact production I/O

# 3. Check what columns changed over 3 years
#    → Does the orders table have the same schema today as in 2023?
#    → Missing columns in old rows will appear as NULL — document this

# ── Phase 2: Extraction strategy ───────────────────────────────────────────
# NEVER do: SELECT * FROM orders WHERE created_at >= '2023-01-01'
# → Single query running for hours, holds locks, impacts production

# DO: chunk by primary key or date, with rate limiting

import psycopg2
import time
from datetime import date, timedelta

def extract_month_chunk(year: int, month: int, conn_string: str) -> list[dict]:
    """Extract one month of orders using a date-bounded query with a read replica."""
    query = """
        SELECT order_id, customer_id, store_id, total_paise,
               payment_method, status, created_at, updated_at
        FROM orders
        WHERE created_at >= %s AND created_at < %s
        ORDER BY created_at
    """
    start = date(year, month, 1)
    end = date(year, month % 12 + 1, 1) if month < 12 else date(year + 1, 1, 1)

    with psycopg2.connect(conn_string) as conn:
        conn.set_session(readonly=True)
        # SET statement_timeout = '10min' — kill the query if it runs too long
        conn.cursor().execute("SET statement_timeout = '600000'")
        cursor = conn.cursor()
        cursor.execute(query, [start, end])
        rows = cursor.fetchall()
        columns = [d[0] for d in cursor.description]
        return [dict(zip(columns, row)) for row in rows]

# Run on read replica, not production primary:
# conn_string = "host=postgres-replica.internal port=5432 dbname=production ..."

# Rate limiting: add sleep between month chunks to avoid overwhelming the replica
for year in range(2023, 2026):
    for month in range(1, 13):
        rows = extract_month_chunk(year, month, REPLICA_CONN)
        write_to_s3_as_parquet(rows, f"backfill/orders/year={year}/month={month:02d}/")
        time.sleep(5)  # 5 second pause between months — gives replica breathing room

# ── Phase 3: Make it idempotent ─────────────────────────────────────────────
# Write each month chunk to its own S3 prefix
# If the job fails and restarts: check if the prefix already exists and skip
# This makes the backfill re-runnable without duplicating data

import boto3
s3 = boto3.client('s3')

def chunk_already_extracted(year: int, month: int) -> bool:
    prefix = f"backfill/orders/year={year}/month={month:02d}/"
    response = s3.list_objects_v2(Bucket='flipkart-datalake', Prefix=prefix, MaxKeys=1)
    return response.get('KeyCount', 0) > 0

# ── Phase 4: Load into warehouse ────────────────────────────────────────────
# Spark job reads all backfill Parquet from S3 and MERGES into warehouse orders table
# Not INSERT — MERGE — because some rows may already exist (last 6 months)

spark.sql("""
    MERGE INTO warehouse.gold.orders AS target
    USING backfill_staging.orders AS source
    ON target.order_id = source.order_id
    WHEN MATCHED THEN UPDATE SET *      -- update if newer version exists
    WHEN NOT MATCHED THEN INSERT *      -- insert if doesn't exist yet
""")
# MERGE is idempotent: running twice produces the same result as running once

# ── Phase 5: Validate ───────────────────────────────────────────────────────
# After backfill, validate counts match source:
# For each year-month:
#   production_count = SELECT COUNT(*) FROM orders WHERE ...  (on replica)
#   warehouse_count  = SELECT COUNT(*) FROM gold.orders WHERE ...
#   assert production_count == warehouse_count, f"Mismatch for {year}-{month}"

# Also validate business metrics (sanity check, not just row counts):
# Monthly GMV from warehouse should match known reported figures
# If a month shows ₹0 GMV, something went wrong`}
        </CodeBox>
      </section>

      <Divider />

      {/* ── Part 10 — Design 5: Real-Time Analytics Dashboard ────────── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Design 05 — Real-Time Dashboard" />
        <SectionTitle>Design 5 — Real-Time Analytics Dashboard for DoorDash Operations</SectionTitle>

        <Para>
          <strong>Prompt:</strong> DoorDash's operations team needs a live dashboard
          showing: orders placed in the last 1 minute, active delivery partners
          by city, average delivery time (rolling 30 minutes), and revenue by
          city (current hour). The dashboard must refresh every 10 seconds and
          serve 200 concurrent operations managers.
        </Para>

        <CodeBox label="real-time dashboard — architecture">
{`# ── Requirements derived from the prompt ────────────────────────────────────
# Data freshness: 10-second refresh → data must be at most 10 seconds stale
# Read pattern: 200 concurrent users, each refreshing every 10 seconds
#               → 200 / 10 = 20 queries per second against the serving layer
# Aggregation windows: 1-minute rolling, 30-minute rolling, current-hour
# Dimensionality: by city (50 Indian cities)

# ── Approach: pre-computed aggregations, NOT ad-hoc queries ──────────────────
# DO NOT: route each dashboard refresh to a Snowflake query
#         → 20 QPS × Snowflake cold query latency (2-5s) = unusable
#         → Snowflake credits consumed at $3.50/credit × thousands of queries/hour
#
# DO: stream processing job continuously updates pre-computed aggregation tables
#     Dashboard reads pre-computed values — reads are sub-millisecond

# ── Streaming aggregation job (Kafka Streams or Flink) ──────────────────────
# Reads from: swiggy.orders.v2, swiggy.deliveries.v2
# Output: Redis hash with pre-computed aggregation values

# Every 10 seconds, the streaming job emits:
{
    "updated_at": "2026-03-20T14:23:50Z",
    "by_city": {
        "San Francisco": {
            "orders_last_1min":       342,
            "active_partners":        1847,
            "avg_delivery_time_30min": 28.4,    # minutes
            "revenue_current_hour":    8432500,  # paise
        },
        "Austin": {
            "orders_last_1min":       218,
            ...
        },
        # ... 48 more cities
    }
}

# Stored in Redis as:
# key: "dashboard:ops:live"
# value: the JSON above (full snapshot, ~5 KB)
# TTL: 60 seconds (auto-expire if streaming job stops — dashboard shows stale warning)

# ── Streaming job internals ──────────────────────────────────────────────────
# Kafka Streams topology:
# Stream<order_id, OrderEvent> orders = builder.stream("swiggy.orders.v2")
# KTable<city, Long> orders_1min = orders
#     .filter((k,v) -> v.status == "placed")
#     .groupBy((k,v) -> v.city)
#     .windowedBy(TimeWindows.ofSizeWithNoGrace(Duration.ofMinutes(1)))
#     .count()
# orders_1min changes are emitted to a compacted Kafka topic → Kafka Connect → Redis

# ── Dashboard API ────────────────────────────────────────────────────────────
# FastAPI endpoint:
# GET /api/v1/dashboard/operations/live
# → Single Redis GET "dashboard:ops:live"
# → Returns 5 KB JSON in < 1ms
# → 200 concurrent users × 6 refreshes/minute = 1,200 reads/minute → trivial for Redis

# Frontend polls every 10 seconds using JavaScript setInterval:
# setInterval(() => fetch('/api/v1/dashboard/operations/live')
#                    .then(r => r.json())
#                    .then(updateDashboard), 10000)
# For lower latency: Server-Sent Events (SSE) or WebSockets — server pushes updates
# For 200 users: SSE is simpler than WebSockets, sufficient for 10-second refresh

# ── Staleness indicator ───────────────────────────────────────────────────────
# Dashboard shows: "Last updated: 3 seconds ago" based on updated_at field
# If updated_at is > 30 seconds old: show yellow warning "Data may be delayed"
# If updated_at is > 120 seconds old: show red warning "Live data unavailable"
# This is the failure mode UX — don't silently show stale data

# ── Hard problems ─────────────────────────────────────────────────────────────
# 1. Window accuracy vs latency:
#    "Orders in the last 1 minute" — counted by event_time or processing_time?
#    Use event_time with 30-second allowed lateness.
#    Mobile app orders with GPS off may arrive 45 seconds late → counted in next window.
#    This is acceptable for operational dashboards — SLA is approximate by design.

# 2. Backfill when streaming job restarts:
#    If the job restarts at 14:25, the 14:20–14:25 window is replayed from Kafka.
#    With 7-day Kafka retention, job can always replay up to 7 days.
#    First 30 minutes after restart: rolling window is incomplete (bootstrapping).
#    Dashboard shows "Recalculating..." indicator during bootstrap.

# 3. City dimension changes (new city launches):
#    New city in Kafka events that isn't in the aggregation map.
#    Solution: aggregation job uses dynamic groupBy — any new city value automatically
#    appears in the output. No code change needed for new city launches.`}
        </CodeBox>
      </section>

      <Divider />

      {/* ── Part 11 — Common Mistakes ────────────────────────────────── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 11 — Anti-Patterns" />
        <SectionTitle>Seven Anti-Patterns That Fail Every Design Review</SectionTitle>

        <Table
          headers={[
            'Anti-pattern',
            { label: 'Why it fails', color: '#ff4757' },
            'What to do instead',
          ]}
          rows={[
            {
              '0': 'Kafka → Spark → Snowflake without asking requirements',
              '1': 'This is a solution looking for a problem. A 5-person startup with 10k events/day does not need Kafka. Over-engineering wastes money and adds operational burden the team cannot sustain.',
              '2': 'Always ask for volume, velocity, latency, and team size before naming any tools. Sometimes a Postgres trigger and a cron job is the right answer.',
            },
            {
              '0': 'Single partition for ordering, no capacity check',
              '1': 'One Kafka partition = one writer thread = ~100 MB/s max throughput. If your design requires global ordering AND has > 100 MB/s peak write throughput, you have an unsolvable conflict.',
              '2': 'Challenge the ordering requirement first — does the business really need global ordering, or just per-entity ordering? Per-entity ordering scales horizontally.',
            },
            {
              '0': 'Querying production OLTP for analytics',
              '1': 'Analytical queries do full table scans. Full table scans on a production PostgreSQL holding live customer data will either be killed by the ops team or cause latency spikes that affect real users.',
              '2': 'Read replicas for moderate load. Data warehouse for serious analytics. Separate the OLTP and OLAP workloads by design, not by luck.',
            },
            {
              '0': 'No mention of schema evolution',
              '1': 'Every interviewer at a company with real data systems knows that schemas change. A design that assumes schemas are stable is a design that will break within 3 months of production.',
              '2': 'Proactively mention schema registry, Avro/Protobuf schemas, backward compatibility, and what happens when a breaking schema change is made.',
            },
            {
              '0': 'No idempotency in the pipeline',
              '1': 'Pipelines fail and restart. Without idempotency, a restart produces duplicate records. The interviewer is specifically listening for whether you know this.',
              '2': 'Name the idempotency mechanism explicitly: MERGE on primary key, ON CONFLICT DO NOTHING, event_id deduplication window. Every pipeline write must be idempotent.',
            },
            {
              '0': 'Using a data warehouse for real-time serving (< 100ms)',
              '1': 'Snowflake and BigQuery have query startup overhead of 1–5 seconds for cold queries. They are not real-time serving layers. Serving a dashboard that refreshes every 10 seconds with direct Snowflake queries is expensive and slow.',
              '2': 'Pre-compute aggregations via streaming job. Serve from Redis. Use the warehouse for analysis and batch reporting, not for latency-sensitive serving.',
            },
            {
              '0': 'No failure mode discussion',
              '1': 'Any design presented without discussing what happens when components fail demonstrates junior-level thinking. Production systems fail constantly. The design must account for it.',
              '2': 'For every major component, proactively state: what happens when it fails, how long until recovery, what the user/downstream system experiences, and how you detect the failure.',
            },
          ]}
        />
      </section>

      <Divider />

      {/* ── Part 12 — What This Looks Like at Work ───────────────────── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 12 — What This Looks Like at Work" />
        <SectionTitle>What This Looks Like on Day One</SectionTitle>

        <HighlightBox>
          <Para>
            <strong>In a senior DE interview (Brex / Stripe / Amazon):</strong>
            You are given 45 minutes to design a "data platform for a payments
            company." The first 10 minutes should be entirely questions — volume,
            latency, team size, compliance requirements, existing infrastructure.
            The interviewer is testing whether you ask these questions or just
            start drawing. The next 15 minutes are a high-level architecture with
            a capacity estimate that justifies your choices. The last 20 minutes
            are a deep dive on the two or three hardest problems — schema
            evolution, exactly-once processing, backfill strategy. Candidates
            who complete the full 45 minutes with depth on all three sections
            are the ones who get offers.
          </Para>
        </HighlightBox>

        <HighlightBox>
          <Para>
            <strong>On the job at a data platform team:</strong>
            A new product team asks the data platform team to "build a pipeline
            for our new feature." The first conversation is not about Kafka or
            Spark — it is a requirements document. How many events per day?
            What latency do the ML models need? What is the retention requirement?
            Who owns the schema? Can it change? What happens if the pipeline is
            down for 2 hours? These questions, answered before a line of code is
            written, are the difference between a pipeline that works in
            production and one that is rewritten 6 months later.
          </Para>
        </HighlightBox>

        <HighlightBox>
          <Para>
            <strong>During an architecture review (any senior role):</strong>
            A colleague presents a design for a new feature store. They have
            chosen a single Redis instance for the online store. You ask: "What
            happens when the Redis instance restarts during peak traffic?" They
            say "it comes back in 30 seconds." You ask: "What is the P99 latency
            of a cache miss that falls through to PostgreSQL?" They haven't
            thought about it. You suggest Redis Cluster with replica, or
            alternatively a graceful degradation path that serves stale features
            rather than failing the request. This is the value of thinking in
            failure modes — it prevents outages before they happen.
          </Para>
        </HighlightBox>
      </section>

      <KeyTakeaways items={[
        'Never start designing before asking requirements. Volume, velocity, latency SLA, consistency requirements, team size, and cost constraints determine every architectural decision. A design for 10k events/day and a design for 10M events/second have almost nothing in common.',
        'Capacity estimation drives decisions. Calculate storage per day, peak throughput in events/second and MB/second, compute requirements per event, and total cost at scale. Use these numbers to justify tool choices — not intuition.',
        'The seven framework steps: clarify requirements → estimate capacity → define data model → design high-level architecture → select and justify components → address hard problems explicitly → discuss failure modes and monitoring.',
        'Every storage choice is a trade-off. Object storage is cheapest but read-only at row level. Table formats (Delta, Iceberg) add ACID to object storage. Data warehouses are fast for SQL but expensive at high QPS. Redis is sub-millisecond but expensive per GB. Choose based on access patterns, not familiarity.',
        'Pre-compute aggregations for real-time dashboards. Serving a dashboard directly from Snowflake or BigQuery at 10-second refresh intervals is expensive, slow, and fragile. Stream aggregations into Redis. Dashboard reads are then sub-millisecond.',
        'Every pipeline write must be idempotent. Name the mechanism explicitly: MERGE on primary key, ON CONFLICT DO NOTHING, event_id deduplication table. Pipelines fail and replay — idempotency is what prevents replays from corrupting data.',
        'Backfill is harder than incremental load. Chunk by date or primary key. Rate-limit extraction to protect the source database. Use a read replica. Make each chunk idempotent (skip if already extracted). MERGE into the warehouse, not INSERT.',
        'Schema evolution must be addressed proactively. A design that assumes schemas never change will break in production. Mention schema registry, backward-compatible evolution, versioned topics, and the process for handling breaking changes.',
        'The seven anti-patterns to avoid: over-engineering for small scale, global ordering without checking throughput limits, querying production OLTP for analytics, ignoring schema evolution, non-idempotent writes, using a warehouse for real-time serving, and presenting a design with no failure mode discussion.',
        'Senior candidates are distinguished not by knowing more tools, but by asking better questions, estimating before deciding, articulating trade-offs precisely, and proactively identifying failure modes before the interviewer finds them.',
      ]} />

    </LearnLayout>
  )
}