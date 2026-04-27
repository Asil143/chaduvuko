import type { Metadata } from 'next'
import { LearnLayout } from '@/components/content/LearnLayout'
import { Callout } from '@/components/content/Callout'
import { KeyTakeaways } from '@/components/content/KeyTakeaways'

export const metadata: Metadata = {
  title: 'How Data Moves Through a Company — Data Engineering | Chaduvuko',
  description:
    'The complete end-to-end story of data — from the moment it is created at a source system, through every layer of the platform, to the dashboard a business leader reads every morning.',
}

// ── Local components ────────────────────────────────────────────────────────

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

const SubSubTitle = ({ children }: { children: React.ReactNode }) => (
  <h4 style={{ fontSize: 15, fontWeight: 700, color: 'var(--text)', marginBottom: 10 }}>{children}</h4>
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

// ── Page ────────────────────────────────────────────────────────────────────

export default function HowDataMovesModule() {
  return (
    <LearnLayout
      title="How Data Moves Through a Company"
      description="The complete end-to-end journey — from data creation to business decisions."
      section="Data Engineering"
      readTime="55 min"
      updatedAt="March 2026"
    >

      {/* ── Part 01 — The Journey of a Single Data Point ─────────────── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 01 — One Data Point, Its Entire Life" />
        <SectionTitle>Follow One Data Point From Birth to Dashboard</SectionTitle>

        <Para>
          The best way to understand how data moves through a company is to follow a single
          data point from the moment it is created to the moment it influences a decision.
          Not in theory — in the specific, concrete reality of what actually happens at the
          system level.
        </Para>

        <Para>
          The data point we will follow: a customer places an order on Uber Eats at 8:14 PM
          on a Tuesday evening. They order one Butter Chicken and two Garlic Naan from a
          restaurant in Koramangala, Seattle. The order total is ₹380.
        </Para>

        <Para>
          By the time the Uber Eats data team arrives at work the next morning, that single
          order has touched at least eight different systems, been stored in at least four
          different formats, been transformed at least three times, and contributed to at
          least a dozen different metrics. Here is exactly how.
        </Para>

        <CodeBox label="The journey of one Uber Eats order — 8:14 PM to 9:00 AM next day">{`8:14:32 PM  → Customer taps "Place Order" on the Uber Eats app

8:14:32 PM  → Mobile app sends HTTP POST request to Uber Eats's
               Order Service API with order details as JSON

8:14:33 PM  → Order Service validates the request, assigns
               order ID #ZMT-9284751, writes a row to the
               Orders table in the production PostgreSQL database

8:14:33 PM  → PostgreSQL writes the row to its Write-Ahead Log (WAL)
               — the permanent transaction record

8:14:34 PM  → A Change Data Capture (CDC) agent reads the WAL,
               detects the new order row, and publishes an event
               to a Kafka topic called "order.created"

8:14:34 PM  → Multiple services consume from "order.created":
               - Notification service → sends SMS to customer
               - Restaurant service  → sends order to restaurant tablet
               - Analytics service   → forwards event to data platform

8:14:35 PM  → Analytics service writes the raw event as JSON
               to Azure Data Lake Storage (the landing zone)
               Path: /raw/orders/2026/03/17/20/ZMT-9284751.json

11:00 PM    → Scheduled batch pipeline runs:
               Reads all new JSON files from the landing zone
               Validates, deduplicates, converts to Parquet format
               Writes to: /bronze/orders/date=2026-03-17/

2:00 AM     → dbt transformation runs:
               Reads bronze Parquet files
               Cleans, standardises, joins with restaurant and
               customer reference data
               Writes to silver layer: orders_cleaned table

4:00 AM     → Aggregation pipeline runs:
               Reads silver orders_cleaned
               Computes daily metrics: GMV by city, by cuisine,
               by hour, repeat customer rate, average order value
               Writes to gold layer: daily_order_metrics table

6:00 AM     → Power BI dashboard refreshes
               Reads from gold layer
               Dashboard now shows last night's order data
               including our ₹380 Koramangala order

9:00 AM     → Uber Eats growth manager opens the dashboard
               Sees: Seattle GMV last night: ₹4.2 million
               Our order contributed ₹380 to that number`}</CodeBox>

        <Para>
          That is the journey. One tap on a phone, eight systems, fourteen hours, one number
          on a dashboard. Every step in that journey is something a data engineer designed,
          built, or maintains. Now we are going to understand each step properly.
        </Para>
      </section>

      <Divider />

      {/* ── Part 02 — Source Systems ─────────────────────────────────── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 02 — Where Data Is Born" />
        <SectionTitle>Source Systems — Where Every Data Journey Begins</SectionTitle>

        <Para>
          A source system is any system that creates data as a byproduct of doing its primary
          job. Source systems are not built to make data available for analysis — they are
          built to run the business. Data availability for analytics is a side effect that
          data engineers must deliberately capture.
        </Para>

        <Para>
          Understanding source systems is the first thing a data engineer does when joining
          a company or starting a new project. You cannot build a pipeline to move data
          without knowing exactly what you are moving, where it lives, how it is structured,
          and how it changes over time.
        </Para>

        <SubTitle>The six types of source systems</SubTitle>

        {[
          {
            type: 'Operational Databases (OLTP)',
            color: '#00e676',
            examples: 'PostgreSQL, MySQL, SQL Server, Oracle',
            what: `The databases that run applications — order management, user accounts, inventory, payments. They are row-oriented, optimised for fast individual record reads and writes, and handle thousands of concurrent transactions per second. This is where most of the valuable business data lives. Data engineers typically cannot query production databases directly for analytics — it would slow down the live application.`,
            characteristics: 'Row-oriented · High write volume · Normalised schema · ACID transactions · Rows are updated in-place (history is lost)',
          },
          {
            type: 'Event Streams',
            color: '#7b61ff',
            examples: 'Apache Kafka, AWS Kinesis, Azure Event Hubs',
            what: `Applications emit events as things happen — user clicked a button, payment was processed, delivery agent crossed a geofence. These events flow into a message broker as a continuous stream. Unlike databases, event streams preserve every event in order and allow multiple consumers to read the same events independently. They are the source for real-time data pipelines.`,
            characteristics: 'Append-only · Ordered · High velocity · Temporary retention (days to weeks) · Multiple consumer support',
          },
          {
            type: 'Files and Batch Exports',
            color: '#f97316',
            examples: 'CSV on SFTP, Excel via email, JSON from API export, XML from ERP',
            what: `Many systems — especially older enterprise software, vendor systems, and government data sources — do not have real-time APIs. They export data as files on a schedule: a daily CSV of transactions, a weekly Excel report from the finance system, a monthly XML dump from an ERP. Data engineers build ingestion pipelines that pick up these files, validate them, and load them into the data platform.`,
            characteristics: 'Batch delivery · Various formats · Often poorly documented · Schema changes break pipelines · No real-time',
          },
          {
            type: 'REST APIs',
            color: '#facc15',
            examples: 'Salesforce API, Google Analytics API, Stripe API, social media APIs',
            what: `SaaS applications expose their data through REST APIs. Data engineers write ingestion code that calls these APIs, handles authentication (OAuth, API keys), manages pagination (APIs return data in pages of 100–1000 records), respects rate limits (maximum N calls per minute), and checkpoints progress so a failure does not require restarting from the beginning.`,
            characteristics: 'Paginated · Rate-limited · Authenticated · JSON responses · Sometimes incomplete (not all data is exposed)',
          },
          {
            type: 'Log Files',
            color: '#4285f4',
            examples: 'Application logs, web server logs, database query logs, security audit logs',
            what: `Every running application emits logs — text lines recording what happened at what time. Web server logs record every HTTP request. Application logs record errors, warnings, and debug information. These logs are a rich source of data about system behaviour and user activity. Parsing log files requires handling inconsistent formats, high volume, and the challenge that log schemas change whenever developers change log statements.`,
            characteristics: 'Unstructured text · Very high volume · Schema changes frequently · Append-only · Time-ordered',
          },
          {
            type: 'IoT and Sensor Data',
            color: '#ff4757',
            examples: 'GPS trackers, temperature sensors, payment terminals, smart meters',
            what: `Physical devices emit data continuously — a Uber Eats delivery agent's phone sends GPS coordinates every few seconds, a temperature sensor in a Amazon warehouse reports readings every minute, a payment terminal reports transaction attempts in real time. IoT data is characterised by extremely high volume, small payload size per event, and the need for real-time processing to be useful.`,
            characteristics: 'Very high volume · Small payload · Continuous stream · Device identity tracking · Out-of-order delivery possible',
          },
        ].map((item) => (
          <div key={item.type} style={{
            background: 'var(--surface)', border: '1px solid var(--border)',
            borderRadius: 12, overflow: 'hidden', marginBottom: 14,
          }}>
            <div style={{ height: 3, background: item.color, opacity: 0.75 }} />
            <div style={{ padding: '20px 24px' }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: 16, flexWrap: 'wrap' }}>
                <div style={{ flex: 1, minWidth: 220 }}>
                  <div style={{
                    fontSize: 11, fontWeight: 700, color: item.color,
                    fontFamily: 'var(--font-mono)', letterSpacing: '.1em',
                    textTransform: 'uppercase', marginBottom: 4,
                  }}>{item.type}</div>
                  <div style={{
                    fontSize: 12, color: 'var(--muted)', fontFamily: 'var(--font-mono)',
                    marginBottom: 10,
                  }}>{item.examples}</div>
                  <div style={{ fontSize: 14, color: 'var(--muted)', lineHeight: 1.8, marginBottom: 10 }}>
                    {item.what}
                  </div>
                  <div style={{
                    fontSize: 11, color: item.color, fontFamily: 'var(--font-mono)',
                    background: `${item.color}10`, border: `1px solid ${item.color}25`,
                    borderRadius: 6, padding: '6px 10px', lineHeight: 1.7,
                  }}>
                    {item.characteristics}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}

        <Callout type="info">
          <strong>A company rarely has just one source system.</strong> A typical mid-size Indian
          startup has 5–15 source systems simultaneously: a PostgreSQL production database,
          a Kafka cluster for events, a Salesforce CRM, a Google Analytics account, a
          Stripe payment API, vendor CSV files, and application logs at minimum. The data
          engineer's job is to ingest all of them reliably, even though each one has
          completely different characteristics, access patterns, and failure modes.
        </Callout>
      </section>

      <Divider />

      {/* ── Part 03 — Ingestion ──────────────────────────────────────── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 03 — Moving Data Into the Platform" />
        <SectionTitle>Ingestion — The First Engineering Problem</SectionTitle>

        <Para>
          Ingestion is the act of reading data from a source system and writing it into the
          data platform. It sounds simple. In practice, it is where most data engineering
          complexity lives, because source systems were not designed to be read from by
          analytics pipelines. They were designed to serve applications. Ingestion is
          the process of extracting data without disrupting that primary purpose.
        </Para>

        <SubTitle>The two fundamental approaches to ingestion</SubTitle>

        <Para>
          Every ingestion pipeline is either batch or streaming — and the choice is determined
          entirely by how fresh the data needs to be downstream.
        </Para>

        <HighlightBox>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 28 }}>
            <div>
              <div style={{
                fontSize: 12, fontWeight: 700, color: '#00e676',
                fontFamily: 'var(--font-mono)', letterSpacing: '.1em',
                textTransform: 'uppercase', marginBottom: 10,
              }}>Batch Ingestion</div>
              <div style={{ fontSize: 14, color: 'var(--muted)', lineHeight: 1.8, marginBottom: 10 }}>
                Data is collected over a period and moved all at once on a schedule.
                Every night at 2 AM, pull all orders from the last 24 hours.
              </div>
              <div style={{ fontSize: 13, color: 'var(--muted)', lineHeight: 1.7 }}>
                <div style={{ marginBottom: 4 }}>✓ Simple to build and debug</div>
                <div style={{ marginBottom: 4 }}>✓ Cheap — runs once, then stops</div>
                <div style={{ marginBottom: 4 }}>✓ Easy to reprocess if something breaks</div>
                <div style={{ marginBottom: 4 }}>✗ Data is hours old by the time it lands</div>
                <div>✗ Large jobs can fail partway and be hard to restart</div>
              </div>
              <div style={{
                fontSize: 12, color: '#00e676', fontFamily: 'var(--font-mono)',
                marginTop: 10, fontStyle: 'italic',
              }}>
                Use when: data freshness of hours is acceptable
              </div>
            </div>
            <div>
              <div style={{
                fontSize: 12, fontWeight: 700, color: '#7b61ff',
                fontFamily: 'var(--font-mono)', letterSpacing: '.1em',
                textTransform: 'uppercase', marginBottom: 10,
              }}>Streaming Ingestion</div>
              <div style={{ fontSize: 14, color: 'var(--muted)', lineHeight: 1.8, marginBottom: 10 }}>
                Data is captured and moved as it is generated, event by event,
                with latency measured in seconds rather than hours.
              </div>
              <div style={{ fontSize: 13, color: 'var(--muted)', lineHeight: 1.7 }}>
                <div style={{ marginBottom: 4 }}>✓ Data is available within seconds</div>
                <div style={{ marginBottom: 4 }}>✓ Handles continuous high-volume sources</div>
                <div style={{ marginBottom: 4 }}>✗ Complex to build, deploy, and monitor</div>
                <div style={{ marginBottom: 4 }}>✗ More expensive — always running</div>
                <div>✗ Harder to debug — errors appear in live traffic</div>
              </div>
              <div style={{
                fontSize: 12, color: '#7b61ff', fontFamily: 'var(--font-mono)',
                marginTop: 10, fontStyle: 'italic',
              }}>
                Use when: decisions depend on data that is minutes old or less
              </div>
            </div>
          </div>
        </HighlightBox>

        <SubTitle>Full load vs incremental load</SubTitle>

        <Para>
          Beyond batch vs streaming, there is a second axis: do you pull all the data every
          time (full load) or only the data that is new or changed since the last run
          (incremental load)?
        </Para>

        <Para>
          Full load is simple — truncate the destination table, reload everything from the
          source. It works well when the source table is small (under a few million rows) and
          the cost of re-reading everything is acceptable. The advantage is simplicity: there
          is no logic to track what has changed, and the destination always exactly mirrors
          the source.
        </Para>

        <Para>
          Incremental load is necessary when the source table is large or when network/compute
          costs of full loads are too high. You only pull records that were created or modified
          after the last run. This requires a reliable way to identify new and changed records —
          typically a timestamp column (<code style={{ fontFamily: 'var(--font-mono)', fontSize: 13 }}>updated_at</code>),
          an auto-incrementing ID, or a change data capture log.
        </Para>

        <CodeBox label="The core ingestion decision tree">{`Question 1: How fresh does the data need to be?
  Within seconds → Streaming ingestion (Kafka, Event Hubs)
  Within hours   → Batch ingestion (scheduled pipeline)
  Within days    → Batch ingestion (daily or less frequent)

Question 2: How large is the source?
  Small (< 1M rows, stable) → Full load each run — keep it simple
  Large (> 1M rows)         → Incremental load — only pull changes

Question 3: How do you identify what has changed?
  updated_at timestamp exists → Filter WHERE updated_at > last_run_time
  Auto-increment ID exists    → Filter WHERE id > last_max_id
  Neither exists              → Use CDC (read the database transaction log)
  File-based source           → Track which files have been processed

Real example — DoorDash orders ingestion decision:
  Freshness needed: hourly for ops dashboards
  Source size: 3M+ rows per day, growing
  Change detection: order_time timestamp + order_id auto-increment
  Decision: Incremental batch, runs every hour,
            filters WHERE order_time > last_checkpoint`}</CodeBox>
      </section>

      <Divider />

      {/* ── Part 04 — The Landing Zone ───────────────────────────────── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 04 — The First Stop" />
        <SectionTitle>The Landing Zone — Where Raw Data First Arrives</SectionTitle>

        <Para>
          The landing zone is the first destination inside the data platform. It is a
          temporary holding area — data arrives here exactly as it came from the source,
          with no transformation, no cleaning, no schema enforcement. Its only job is to
          accept everything that arrives and hold it until the next processing stage
          picks it up.
        </Para>

        <Para>
          Think of it like the receiving dock of a warehouse. Every delivery arrives here
          first, regardless of what it is or what condition it is in. Nothing is
          unpacked or inspected at the dock — it is just logged and stored temporarily.
          Processing happens later, in a different area.
        </Para>

        <SubTitle>Why the landing zone exists</SubTitle>

        <Para>
          The landing zone serves a critical purpose that beginners often do not appreciate
          until they have worked without one: it decouples ingestion from processing.
        </Para>

        <Para>
          Without a landing zone, the ingestion pipeline writes directly to the
          processing layer. If the processing logic has a bug, the pipeline must be
          stopped, the bug fixed, and all the data re-ingested from the source.
          For sources that do not keep history (like some APIs and streaming systems),
          that data may be gone forever.
        </Para>

        <Para>
          With a landing zone, the raw data is always preserved. If the processing
          logic has a bug, you fix it and reprocess from the landing zone — the source
          does not need to be touched. This pattern of preserving raw data permanently
          is one of the most important principles in data engineering.
        </Para>

        <CodeBox label="Landing zone file organisation — real folder structure">{`Landing zone: Azure Data Lake Storage (ADLS Gen2)
Container: raw-landing

/orders/
  2026/03/17/08/     ← hour-partitioned
    batch_001.json
    batch_002.json
  2026/03/17/09/
    batch_001.json

/payments/
  2026/03/17/
    razorpay_export_20260317.csv

/user_events/
  2026/03/17/09/15/  ← minute-partitioned (high volume)
    events_1710664500.parquet

Key rules for landing zones:
  ✓ Never delete raw files (storage is cheap; source access is not guaranteed)
  ✓ Partition by date and time for efficient downstream reads
  ✓ Store in original format — do not transform at this stage
  ✓ Add metadata: source name, ingestion timestamp, pipeline run ID
  ✓ Retain for at least 30–90 days (often much longer for compliance)`}</CodeBox>
      </section>

      <Divider />

      {/* ── Part 05 — The Medallion Architecture ────────────────────── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 05 — The Three Layers" />
        <SectionTitle>Bronze, Silver, Gold — The Medallion Architecture</SectionTitle>

        <Para>
          Once data has landed in the platform, it moves through a series of processing
          layers. The most widely adopted pattern for organising these layers is called
          the <strong>Medallion Architecture</strong> — named for its three tiers: Bronze,
          Silver, and Gold. Understanding this pattern is essential because almost every
          modern data platform uses some version of it.
        </Para>

        <Para>
          The key insight behind the Medallion Architecture is this: each layer has a
          clearly defined purpose and a clearly defined quality level. Data gets cleaner,
          more structured, and more business-specific as it moves from Bronze to Gold.
          You always know exactly what to expect in each layer.
        </Para>

        {[
          {
            layer: 'Bronze',
            color: '#cd7f32',
            subtitle: 'Raw data — exactly as it arrived',
            purpose: `Bronze is the permanent archive of raw data. It contains data exactly as it came from the source, with the minimum possible transformation — usually just format standardisation (converting JSON to Parquet for storage efficiency) and partitioning by date for query efficiency.

Bronze data is not clean. It contains duplicates, nulls, encoding issues, and inconsistencies. That is expected and acceptable. The purpose of Bronze is not to be clean — it is to be a complete, permanent record of exactly what was received and when.`,
            rules: [
              'Never delete Bronze data — it is the source of truth for reprocessing',
              'Add ingestion metadata: source, pipeline run ID, ingested_at timestamp',
              'Convert to Parquet or Delta Lake format for efficient storage',
              'Partition by date for fast time-range queries',
              'Do not apply business logic — store what arrived, not what you think it should be',
            ],
            example: 'Bronze orders table: contains all raw order records including duplicates, orders with NULL customer IDs, orders from test accounts, cancelled orders — everything. 500M rows.',
          },
          {
            layer: 'Silver',
            color: '#aaa9ad',
            subtitle: 'Cleaned and conformed data',
            purpose: `Silver is where the data engineering work happens. Silver takes Bronze data and applies a defined set of cleaning and conforming transformations: remove duplicates, standardise column names and data types, fill or flag nulls according to business rules, filter out test and invalid records, resolve encoding issues, and join with reference tables to enrich IDs with human-readable values.

Silver data is trustworthy at the record level — each row in a Silver table represents one valid, deduplicated, well-formed business entity. It is not yet aggregated or shaped for any specific business question; it is shaped to be correct and consistent.`,
            rules: [
              'One row per unique business entity (deduplicated)',
              'Standardised column names (snake_case, consistent naming)',
              'Validated data types (dates as DATE, amounts as DECIMAL)',
              'Business rules applied (test accounts removed, valid status codes only)',
              'Joined with dimension tables (restaurant_id resolved to restaurant_name, city)',
            ],
            example: 'Silver orders table: 487M rows (13M duplicates and invalid records removed from Bronze). Every row has a valid customer ID, restaurant ID, timestamp, and amount. Test account orders excluded.',
          },
          {
            layer: 'Gold',
            color: '#facc15',
            subtitle: 'Aggregated, business-ready data',
            purpose: `Gold is the serving layer. It contains data shaped specifically for the business questions that stakeholders actually ask. Gold tables are often aggregated — daily totals, cohort metrics, rolling averages — and are denormalised for query performance: instead of requiring analysts to write six-table joins, the Gold table has all the relevant dimensions pre-joined.

Gold tables are what Power BI dashboards, data science notebooks, and business reports read from. They are the final output of the data engineering process. There are often many Gold tables, each optimised for a specific consumer or use case.`,
            rules: [
              'Designed around business questions, not source system schemas',
              'Aggregated at the right grain (daily, weekly, monthly)',
              'Denormalised — pre-joined for query performance',
              'Named in business terms (daily_gmv_by_city, not fact_order_agg)',
              'SLA-bound — must be refreshed by a specific time each morning',
            ],
            example: 'Gold daily_order_metrics table: one row per restaurant per day. Pre-aggregated GMV, order count, average order value, and repeat customer rate. 180 days of history. Refreshed by 6 AM daily.',
          },
        ].map((item) => (
          <div key={item.layer} style={{
            background: 'var(--surface)', border: `1px solid ${item.color}44`,
            borderRadius: 12, overflow: 'hidden', marginBottom: 20,
          }}>
            <div style={{ height: 4, background: item.color }} />
            <div style={{ padding: '24px 28px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 14 }}>
                <div style={{
                  fontSize: 22, fontWeight: 900, color: item.color,
                  fontFamily: 'var(--font-display)', letterSpacing: '-1px',
                }}>
                  {item.layer}
                </div>
                <div style={{
                  fontSize: 12, color: 'var(--muted)', fontStyle: 'italic',
                }}>
                  — {item.subtitle}
                </div>
              </div>
              <div style={{
                fontSize: 14, color: 'var(--muted)', lineHeight: 1.85,
                marginBottom: 16, whiteSpace: 'pre-line',
              }}>
                {item.purpose}
              </div>
              <div style={{ marginBottom: 14 }}>
                <div style={{
                  fontSize: 10, fontWeight: 700, color: item.color,
                  fontFamily: 'var(--font-mono)', letterSpacing: '.12em',
                  textTransform: 'uppercase', marginBottom: 8,
                }}>Rules for this layer</div>
                {item.rules.map((r, i) => (
                  <div key={i} style={{
                    fontSize: 13, color: 'var(--muted)', lineHeight: 1.7,
                    paddingLeft: 12, borderLeft: `2px solid ${item.color}44`,
                    marginBottom: 4,
                  }}>
                    {r}
                  </div>
                ))}
              </div>
              <div style={{
                fontSize: 12, color: item.color, fontFamily: 'var(--font-mono)',
                background: `${item.color}10`, border: `1px solid ${item.color}25`,
                borderRadius: 6, padding: '8px 12px', lineHeight: 1.6,
              }}>
                Example: {item.example}
              </div>
            </div>
          </div>
        ))}

        <CodeBox label="The Medallion Architecture — full data flow">{`SOURCE SYSTEMS
   PostgreSQL (orders) ──┐
   Kafka (user events)  ──┤
   Stripe API         ──┤──→  LANDING ZONE (raw files, any format)
   CSV from vendors     ──┤                    │
   Google Analytics API ──┘                    │
                                               ▼
                                    ┌─────── BRONZE ────────┐
                                    │ Raw Parquet files     │
                                    │ Partitioned by date   │
                                    │ All data preserved    │
                                    │ Ingestion metadata    │
                                    └──────────┬────────────┘
                                               │ clean + conform
                                               ▼
                                    ┌─────── SILVER ────────┐
                                    │ Deduplicated          │
                                    │ Validated types       │
                                    │ Standardised schema   │
                                    │ Business rules applied│
                                    └──────────┬────────────┘
                                               │ aggregate + shape
                                               ▼
                                    ┌─────── GOLD ──────────┐
                                    │ Business metrics      │
                                    │ Pre-aggregated        │
                                    │ Denormalised          │
                                    │ Dashboard-ready       │
                                    └──────────┬────────────┘
                                               │
                         ┌─────────────────────┼──────────────────────┐
                         ▼                     ▼                      ▼
                   Power BI /           Data Science           ML Feature
                   Tableau              Notebooks              Store
                   Dashboards           Model Training         Real-time
                                                               Serving`}</CodeBox>
      </section>

      <Divider />

      {/* ── Part 06 — The Data Warehouse ────────────────────────────── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 06 — The Query Layer" />
        <SectionTitle>The Data Warehouse — Where Data Becomes Queryable</SectionTitle>

        <Para>
          A data warehouse is a database designed specifically for analytical queries — fast
          aggregations and scans over large amounts of data using SQL. Gold layer tables
          typically live in a data warehouse, because the warehouse is what business analysts
          and dashboards connect to.
        </Para>

        <Para>
          The fundamental design difference between a data warehouse and a regular operational
          database is storage orientation. This single difference explains why warehouses
          are so much faster for analytics.
        </Para>

        <HighlightBox>
          <SubSubTitle>Row storage vs columnar storage</SubSubTitle>
          <Para>
            In a regular row-oriented database, all the values for one row are stored together
            on disk. Reading a row is fast. But analytical queries typically need to scan one
            or two columns across millions of rows — like summing the <code style={{ fontFamily: 'var(--font-mono)', fontSize: 13 }}>order_amount</code> column
            across 100 million orders. In a row store, reading that column requires reading every
            column of every row — most of the data read is immediately discarded.
          </Para>
          <CodeBox label="Row storage vs columnar storage — how data is laid out on disk">{`ROW-ORIENTED STORAGE (PostgreSQL, MySQL):
  Disk block 1: [order_id=1, customer="Priya", city="New York", amount=380, status="delivered"]
  Disk block 2: [order_id=2, customer="Rahul", city="Seattle", amount=220, status="cancelled"]
  Disk block 3: [order_id=3, customer="Aisha", city="Austin", amount=540, status="delivered"]

  Query: SELECT SUM(amount) FROM orders
  Must read: ALL columns for ALL rows → massive I/O for one column

COLUMNAR STORAGE (Snowflake, BigQuery, Redshift):
  Column "order_id":  [1, 2, 3, 4, 5, 6, 7, 8 ...]
  Column "customer":  ["Priya", "Rahul", "Aisha" ...]
  Column "city":      ["New York", "Seattle", "Austin" ...]
  Column "amount":    [380, 220, 540, 180, 760, 320, 450, 290 ...]
  Column "status":    ["delivered", "cancelled", "delivered" ...]

  Query: SELECT SUM(amount) FROM orders
  Reads: ONLY the "amount" column → 10–100× less I/O
  Bonus: similar values in a column compress extremely well
         [380, 380, 380, 380] → stored as "380 × 4"
         → further reduces storage and read time`}</CodeBox>
          <Para>
            This is why a query that takes 45 minutes on a PostgreSQL table of 100 million rows
            can run in 4 seconds on Snowflake or BigQuery. The data warehouse reads only the
            columns the query needs. Less data read from disk means dramatically faster queries.
          </Para>
        </HighlightBox>
      </section>

      <Divider />

      {/* ── Part 07 — Serving Layer ──────────────────────────────────── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 07 — The Last Mile" />
        <SectionTitle>The Serving Layer — Getting Data to the People Who Need It</SectionTitle>

        <Para>
          The serving layer is everything between the warehouse and the final consumer of
          the data. Even perfectly engineered Gold tables are useless if the people who
          need the data cannot access it easily, quickly, and in the right format.
        </Para>

        <SubTitle>Who consumes data and how</SubTitle>

        {[
          {
            consumer: 'Business Analysts',
            tool: 'Power BI, Tableau, Metabase, Looker',
            need: 'Pre-aggregated Gold tables with clear names, stable schemas, and fast query performance. Analysts write SQL but prefer not to write complex multi-table joins every time.',
            what: 'DE builds well-structured Gold tables and optimises them for the most common query patterns.',
          },
          {
            consumer: 'Data Scientists',
            tool: 'Python notebooks (Databricks, Jupyter), Spark',
            need: 'Access to Silver layer data for model training — they need individual records, not pre-aggregated summaries. They also need feature tables: pre-computed signals about customers, products, or events.',
            what: 'DE builds feature pipelines that produce training datasets and feature stores on a regular schedule.',
          },
          {
            consumer: 'ML Engineers',
            tool: 'Feature stores, real-time inference APIs',
            need: 'Low-latency access to the same features used during model training, but served in real time during prediction — within milliseconds.',
            what: 'DE builds and maintains feature stores that serve pre-computed features with sub-second latency.',
          },
          {
            consumer: 'Business Teams',
            tool: 'Email reports, scheduled exports, ad-hoc CSV downloads',
            need: 'Scheduled reports delivered to their inbox, or self-service access to filtered data exports. They do not write SQL.',
            what: 'DE builds scheduled export pipelines and ensures the BI tools have appropriate row-level security so people only see the data they are permitted to see.',
          },
          {
            consumer: 'Other Applications',
            tool: 'Data APIs, reverse ETL, webhooks',
            need: 'Processed data fed back into operational systems — enriched customer records synced back to the CRM, fraud scores pushed to the payment system, recommendation outputs loaded into the app database.',
            what: 'DE builds reverse ETL pipelines that take warehouse output and write it back to operational systems.',
          },
        ].map((item, i) => (
          <div key={i} style={{
            display: 'flex', gap: 16, marginBottom: 14,
            background: 'var(--surface)', border: '1px solid var(--border)',
            borderRadius: 10, padding: '16px 20px', flexWrap: 'wrap',
          }}>
            <div style={{ flex: 1, minWidth: 180 }}>
              <div style={{
                fontSize: 13, fontWeight: 800, color: 'var(--text)',
                fontFamily: 'var(--font-display)', marginBottom: 4,
              }}>{item.consumer}</div>
              <div style={{
                fontSize: 11, color: 'var(--muted)', fontFamily: 'var(--font-mono)',
                marginBottom: 8,
              }}>{item.tool}</div>
              <div style={{ fontSize: 13, color: 'var(--muted)', lineHeight: 1.7, marginBottom: 6 }}>
                <strong style={{ color: 'var(--text)' }}>Needs:</strong> {item.need}
              </div>
              <div style={{
                fontSize: 12, color: 'var(--accent)', lineHeight: 1.6,
                borderLeft: '2px solid rgba(0,230,118,0.3)', paddingLeft: 8,
              }}>
                <strong>DE builds:</strong> {item.what}
              </div>
            </div>
          </div>
        ))}
      </section>

      <Divider />

      {/* ── Part 08 — Real Time vs Batch ────────────────────────────── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 08 — Two Different Journeys" />
        <SectionTitle>Batch vs Real-Time — Two Completely Different Paths</SectionTitle>

        <Para>
          Everything described so far — landing zone, Bronze, Silver, Gold — describes the
          batch data path. Data moves in scheduled waves, typically every hour or every day.
          But some business decisions cannot wait hours. For those cases, there is a parallel
          path: the real-time streaming pipeline.
        </Para>

        <Para>
          Both paths often exist simultaneously at the same company, serving different
          consumers with different freshness requirements.
        </Para>

        <CodeBox label="Batch path vs streaming path — same source, different destinations">{`SOURCE: Uber Eats order events

BATCH PATH (runs every hour):
  Kafka → S3 landing zone → Bronze (Parquet) → Silver (cleaned) → Gold (aggregated)
  Latency: 1–3 hours
  Consumers: Business dashboards, weekly reports, model training
  Cost: Low (runs once per hour, then stops)
  Complexity: Low (simple ETL, easy to debug)

STREAMING PATH (always running):
  Kafka → Stream processor (Flink/Spark Streaming) → Real-time store (Redis/DynamoDB)
  Latency: 1–10 seconds
  Consumers: Live order tracking, fraud detection, real-time driver dispatch
  Cost: High (always running, dedicated infrastructure)
  Complexity: High (stateful processing, exactly-once guarantees, backpressure)

DECISION RULE:
  "Does a bad decision made on 1-hour-old data cost more
   than the cost and complexity of a streaming pipeline?"
  If YES → streaming
  If NO  → batch

Most companies: 80% batch, 20% streaming
Most companies need streaming for: fraud detection, live inventory,
  real-time recommendations, operational dashboards`}</CodeBox>

        <Callout type="tip">
          <strong>The most common beginner mistake:</strong> choosing streaming when batch is
          sufficient. Streaming pipelines are significantly more expensive to build, deploy,
          and maintain. "Real-time" sounds impressive but most business questions do not
          actually require data that is seconds old. Always question whether the business
          genuinely needs streaming before committing to its complexity.
        </Callout>
      </section>

      <Divider />

      {/* ── Part 09 — The Full Picture ───────────────────────────────── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 09 — Everything Together" />
        <SectionTitle>The Complete Data Platform — All Layers in One View</SectionTitle>

        <Para>
          Now that you understand each individual layer, here is the complete picture —
          every layer of a modern data platform, from source to consumer, in one view.
          This is the architecture you will encounter at most well-engineered Indian
          tech companies in 2026.
        </Para>

        <CodeBox label="Complete modern data platform architecture">{`┌─────────────────────────────────────────────────────────────────┐
│                     SOURCE SYSTEMS                              │
│  PostgreSQL  │  Kafka streams  │  REST APIs  │  Files  │  Logs │
└──────────────────────────┬──────────────────────────────────────┘
                           │ ingestion (batch + streaming)
                           ▼
┌─────────────────────────────────────────────────────────────────┐
│                     LANDING ZONE                                │
│        Raw files, original format, never deleted                │
│        Azure ADLS / Amazon S3 / Google Cloud Storage           │
└──────────────────────────┬──────────────────────────────────────┘
                           │ format standardisation + partitioning
                           ▼
┌─────────────────────────────────────────────────────────────────┐
│                     BRONZE LAYER                                │
│     Parquet / Delta Lake · Partitioned · Metadata added        │
│     All data preserved · No business logic applied             │
└──────────────────────────┬──────────────────────────────────────┘
                           │ cleaning + conforming (dbt / Spark)
                           ▼
┌─────────────────────────────────────────────────────────────────┐
│                     SILVER LAYER                                │
│    Deduplicated · Validated · Standardised · Business rules    │
│    One row per entity · Joined with reference data             │
└──────────────────────────┬──────────────────────────────────────┘
                           │ aggregation + business shaping
                           ▼
┌─────────────────────────────────────────────────────────────────┐
│                     GOLD LAYER                                  │
│    Business metrics · Pre-aggregated · Denormalised            │
│    Named in business terms · SLA-bound refresh                 │
└──────────────────────────┬──────────────────────────────────────┘
                           │
          ┌────────────────┼────────────────┬────────────────┐
          ▼                ▼                ▼                ▼
   BI Dashboards    Data Science      ML Feature         Reverse ETL
   Power BI         Notebooks         Store              → CRM
   Tableau          Model Training    Real-time          → App DB
   Metabase         Experiments       Predictions        → Marketing

CROSS-CUTTING:
  Orchestration (Airflow)   → schedules and monitors every step
  Data Quality (dbt tests)  → validates each layer's output
  Observability (alerts)    → notifies when pipelines fail or data degrades
  Governance (catalogue)    → documents what exists and who can access it`}</CodeBox>

        <Para>
          Every company's data platform is a variation of this pattern. The specific tools
          differ — one company uses Airflow, another uses Prefect; one uses Snowflake,
          another uses BigQuery. But the layers and their purposes are consistent across
          the industry. When you join a new team, you will immediately know where to look
          for each type of data and who is responsible for each layer.
        </Para>
      </section>

      <Divider />

      {/* ── Part 10 — Real World ─────────────────────────────────────── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 10 — Real World" />
        <div style={{
          fontSize: 10, fontWeight: 700, letterSpacing: '.12em',
          textTransform: 'uppercase', color: 'var(--muted)', marginBottom: 12,
          fontFamily: 'var(--font-mono)',
        }}>
          💼 What This Looks Like at Work
        </div>
        <SectionTitle>Tracing a Data Quality Bug Through All the Layers</SectionTitle>

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
            Scenario — Food Delivery Company · Monday Morning
          </div>

          <Para>
            It is 9:30 AM. The Head of Growth opens the weekly GMV dashboard and immediately
            sends a Slack message to the data team: "Weekend GMV looks 18% lower than last
            weekend. Is this real or a data issue?" You are the on-call data engineer.
          </Para>

          <SubSubTitle>Step 1 — Check the Gold layer</SubSubTitle>
          <Para>
            You query the Gold <code style={{ fontFamily: 'var(--font-mono)', fontSize: 13 }}>daily_order_metrics</code> table.
            Saturday shows ₹3.8 million. Last Saturday showed ₹4.6 million. The drop is there. But
            is it real business data or a pipeline problem?
          </Para>

          <SubSubTitle>Step 2 — Check the Silver layer</SubSubTitle>
          <Para>
            You count rows in the Silver <code style={{ fontFamily: 'var(--font-mono)', fontSize: 13 }}>orders_cleaned</code> table
            for Saturday. You find 420,000 orders. That is significantly lower than the typical
            520,000 on a Saturday. The missing orders are not in Silver. The problem happened
            before Silver.
          </Para>

          <SubSubTitle>Step 3 — Check the Bronze layer</SubSubTitle>
          <Para>
            You count rows in the Bronze <code style={{ fontFamily: 'var(--font-mono)', fontSize: 13 }}>orders_raw</code> table
            for Saturday. 520,000 rows. The orders are in Bronze. The problem happened
            between Bronze and Silver.
          </Para>

          <SubSubTitle>Step 4 — Find the transformation bug</SubSubTitle>
          <Para>
            You look at the dbt model that transforms Bronze to Silver. You find a filter:
            <code style={{ fontFamily: 'var(--font-mono)', fontSize: 13 }}> WHERE order_status != 'test'</code>.
            You check the Bronze data for Saturday — 100,000 orders have
            <code style={{ fontFamily: 'var(--font-mono)', fontSize: 13 }}> order_status = 'test'</code>.
            Last week it was 2,000. The engineering team deployed a change on Friday that
            accidentally tagged all restaurant-side orders as 'test'. 100,000 real orders
            were silently excluded from Silver and never made it to Gold.
          </Para>

          <SubSubTitle>The resolution</SubSubTitle>
          <Para>
            You raise an incident, notify the Head of Growth that it is a data issue (not a
            business issue), coordinate with the engineering team to fix the status tagging
            bug in production, then backfill the Silver and Gold layers for Saturday and
            Sunday once the source data is corrected. Total resolution time: 3 hours.
          </Para>

          <Para>
            This is why understanding the layers matters. Without knowing the architecture,
            you cannot systematically trace where data was lost. With it, you bisect the
            problem in four queries instead of spending hours guessing.
          </Para>
        </div>
      </section>

      <Divider />

      {/* ── Part 11 — Interview Prep ─────────────────────────────────── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 11 — Interview Prep" />
        <SectionTitle>5 Interview Questions — With Complete Answers</SectionTitle>

        {[
          {
            q: 'Q1. Walk me through how data moves from a production database to a business dashboard.',
            a: `Data starts in the production operational database — in most companies this is PostgreSQL or MySQL, running the application that creates the data. From there, an ingestion pipeline extracts new or changed records on a schedule, typically using incremental extraction based on a timestamp column or via Change Data Capture from the database transaction log.

The extracted data lands first in object storage — Amazon S3, Azure Data Lake, or Google Cloud Storage — in its raw form. This landing zone serves as the permanent archive and decouples ingestion from processing. From the landing zone, a processing pipeline reads the raw data, converts it to an efficient columnar format (Parquet or Delta Lake), and writes it to the Bronze layer — the first structured tier of the data lake.

A transformation layer then reads Bronze data, applies cleaning logic (deduplication, type validation, business rule filtering), and writes to the Silver layer — clean, record-level data. Finally, an aggregation pipeline reads Silver data, computes the business metrics the dashboard needs (daily totals, cohort rates, rolling averages), and writes to the Gold layer in the data warehouse. The dashboard tool connects to the warehouse and reads from the Gold tables.

Each step is orchestrated by a scheduler like Airflow, which ensures they run in sequence, handles failures with retries, and alerts the team if any step fails to complete before the morning SLA.`,
          },
          {
            q: 'Q2. Why do we need a Bronze layer if we already have the data in the landing zone?',
            a: `The landing zone and Bronze serve different purposes. The landing zone is a reception area — it accepts data in whatever format it arrived, with no structure requirements. Files in the landing zone might be JSON, CSV, XML, or binary formats from different sources, with no consistent partitioning or naming convention.

Bronze converts this heterogeneous collection into a consistent, queryable format. It standardises all data to Parquet or Delta Lake format (columnar, compressed, efficient), adds consistent metadata (ingestion timestamp, source identifier, pipeline run ID), and organises data into Hive-style date partitions for efficient time-range queries. Bronze does not change the data content, only the format and organisation.

The practical difference: querying the landing zone requires reading raw JSON or CSV files with no partition pruning. Querying Bronze allows a query engine to skip entire directories of irrelevant data based on partition filters and read only the columns needed using columnar format. On 100 million events, this difference is the gap between a query that takes 2 minutes and one that takes 3 seconds.`,
          },
          {
            q: 'Q3. When would you choose streaming ingestion over batch ingestion?',
            a: `I would choose streaming when there is a concrete business requirement that depends on data being available within seconds to a few minutes — not based on a general preference for "real-time."

The use cases that genuinely require streaming are: fraud detection (where a fraudulent transaction must be identified and blocked before it completes), operational dashboards that drive live decision-making (like a delivery dispatch system that routes drivers based on current order density), inventory management where out-of-stock status must be reflected immediately to prevent further orders, and user-facing features where the product shows live data (like a live ride count display on the Lyft app).

Most analytical use cases do not require streaming. A dashboard showing yesterday's sales performance, a weekly cohort analysis, a monthly financial report — all of these are well-served by batch ingestion. The cost and complexity of streaming is significant: it requires always-on infrastructure, stateful processing logic, handling of out-of-order events, and exactly-once delivery guarantees. Building and maintaining a streaming pipeline is 3–5× the engineering effort of an equivalent batch pipeline.

My default is batch unless a stakeholder can articulate a specific decision that requires data fresher than one hour. That question usually reveals that most "we need real-time" requests are actually "we need less than daily."`,
          },
          {
            q: 'Q4. What is the difference between the Silver and Gold layers in the Medallion Architecture?',
            a: `Silver and Gold serve fundamentally different purposes even though both contain clean data.

Silver is record-oriented and source-faithful. It contains one clean, deduplicated, validated row per real-world business event — one row per order, one row per payment, one row per user session. Silver tables have schemas that closely resemble the source system schema, because their purpose is to faithfully represent what happened, not to answer specific business questions. A Silver orders table has every order with all its attributes, but no aggregations. Silver is the foundation from which any downstream use case can be built.

Gold is question-oriented and consumer-shaped. Gold tables are designed around specific business questions and specific consumers. A daily_restaurant_performance Gold table aggregates Silver orders by restaurant and day, pre-computes the metrics the business team needs, and denormalises by pre-joining with the restaurant dimension table so analysts do not need to write joins. One Gold table might exist for the operations team and a completely different Gold table might exist for the finance team, both built from the same Silver data.

The practical implication is that when business requirements change — say the finance team wants a new metric added to their report — you modify the Gold table without touching Silver. And when new use cases emerge, you build new Gold tables from the existing Silver data without re-ingesting anything.`,
          },
          {
            q: 'Q5. A data discrepancy is found in a dashboard. How do you systematically investigate it?',
            a: `I approach data discrepancies as a bisection problem — the goal is to identify the exact layer where data diverged from what was expected.

Starting from the dashboard, I first verify the query the dashboard is running and confirm it is reading from the correct table and applying the correct filters. This eliminates dashboard misconfiguration as a cause.

Next I query the Gold table directly and compare to what the dashboard shows. If they match, the dashboard is fine — the issue is in the Gold data. If they differ, the issue is the dashboard query.

Assuming the Gold data is wrong, I count rows and sum key metrics in the Silver layer for the same time period. If Silver matches what Gold should be, the aggregation logic transforming Silver to Gold has a bug. If Silver also shows wrong numbers, I go to Bronze.

Comparing Bronze to Silver usually reveals the transformation that introduced the problem: a filter that incorrectly excluded valid records, a join that introduced duplicates, a NULL handling rule that dropped records it should not have.

If Bronze also shows wrong numbers, I check the landing zone and the source system directly. If the source matches the landing zone, the ingestion is correct and the source itself has the issue. If the source differs from the landing zone, the ingestion pipeline introduced the problem.

This systematic approach means I never spend more than 15–20 minutes finding the layer where the problem exists, regardless of how complex the pipeline is.`,
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
            error: `FileNotFoundError: No files found matching pattern: /raw/orders/2026-03-17/*.parquet`,
            cause: 'The downstream processing pipeline (Bronze → Silver) ran before the upstream ingestion pipeline finished writing files to the landing zone. The orchestration has a timing dependency violation — two pipelines that should run sequentially are running in parallel or the schedule gap between them is too small.',
            fix: 'In your orchestration tool (Airflow/Prefect), add an explicit dependency: the Bronze processing task must not start until the ingestion task reports success. Never schedule dependent pipelines based on time gaps alone — always use task completion signals. If using Airflow: set trigger_rule="all_success" on the downstream task.',
          },
          {
            error: `Row count validation failed: Silver orders expected ~520000 rows for 2026-03-15, got 312847`,
            cause: 'A significant portion of rows from Bronze were dropped during the Silver transformation. Common causes: a filter condition is too aggressive, a JOIN with a dimension table is dropping rows where the join key has no match (inner join instead of left join), or a new value appeared in a column that a CASE statement does not handle, producing NULL and causing a NOT NULL constraint failure.',
            fix: 'Run the Silver transformation query with the filter and join conditions removed one by one to identify which one is responsible for the row drop. Check the dimension table for missing join keys. If the root cause is a new category value not handled in a CASE statement, add it to the transformation and backfill the affected partition.',
          },
          {
            error: `Duplicate rows detected in Gold table daily_order_metrics: order_id appears 2.3x on average`,
            cause: 'A JOIN in the Silver-to-Gold transformation is producing fan-out — the right-side table of the join has multiple rows per join key, multiplying rows in the result. This commonly happens when joining orders to a promotions or tags table where one order can have multiple promotions applied.',
            fix: 'Pre-aggregate or deduplicate the right-side table before joining: use a CTE or subquery to collapse multiple rows per order into one row (e.g., STRING_AGG for tags, MAX for promo discount). Alternatively, use a window function with ROW_NUMBER() to keep only the most recent or most relevant row per order before the join.',
          },
          {
            error: `Pipeline SLA breach: daily_order_metrics Gold table was not refreshed by 06:00 AM SLA (completed at 08:47 AM)`,
            cause: 'The pipeline ran longer than expected. Common causes: data volume grew and processing time scaled non-linearly; an upstream pipeline ran late and pushed the entire chain past the SLA; a slow query in the transformation layer due to a missing partition filter causing a full table scan; or a resource contention issue (the pipeline ran during peak warehouse load).',
            fix: 'Profile which step in the pipeline consumed the most time. Check whether partition pruning is working in the transformation queries (look at the query execution plan for full scans). Add a buffer to the schedule — if the pipeline normally takes 90 minutes, schedule it to start at 3 AM, not 4:30 AM. Consider adding incremental processing to the slowest transformation step.',
          },
          {
            error: `DataLakeException: Cannot overwrite partition date=2026-03-17 — partition is locked by another writer`,
            cause: 'Two pipeline runs are attempting to write to the same partition simultaneously. This happens when a scheduled pipeline is still running from the previous trigger when the next trigger fires — typically because data volume increased and the pipeline now takes longer than its schedule interval.',
            fix: 'Add concurrency protection to the pipeline: configure the orchestrator to allow only one concurrent run and use a "latest only" execution policy that skips new runs if a previous run is still in progress. For the immediate issue, wait for the running pipeline to complete, then verify the partition data is consistent before allowing the next run.',
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
            }}>
              {item.error}
            </div>
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
        'Every piece of data follows the same journey: Source System → Landing Zone → Bronze → Silver → Gold → Consumer. Understanding this path means you can always find where data was lost or changed.',
        'Source systems are not built to serve analytics. They are built to run the business. The data engineer job is to capture data from them without disrupting their primary purpose.',
        'The landing zone preserves raw data exactly as it arrived. Never delete it. It is your ability to reprocess everything from scratch when transformation logic changes.',
        'Bronze preserves everything in a queryable columnar format. Silver cleans and conforms to one trusted record per entity. Gold aggregates and shapes data for specific business questions.',
        'Columnar storage (Parquet, Delta Lake) is the foundation of fast analytical queries. It allows reading only the columns needed and enables aggressive compression, making queries 10–100× faster than row-oriented stores.',
        'Batch ingestion is simple, cheap, and correct for most use cases. Streaming is expensive and complex. Choose streaming only when you can identify a specific business decision that requires data fresher than one hour.',
        'The Medallion Architecture (Bronze-Silver-Gold) is the industry standard pattern. Learn it once and you understand the data platform structure at almost every modern company.',
        'Data discrepancies should always be investigated by layer bisection — start at the dashboard, work backwards to the source, identify exactly where numbers diverge. Four queries, not four hours.',
        'A single data point — one Uber Eats order — can touch eight systems in 14 hours before it appears in a dashboard metric. Every system in that chain is something a data engineer owns.',
        'The serving layer is not just "put data in the warehouse." It means different things for different consumers: pre-aggregated Gold for analysts, Silver features for scientists, feature stores for ML engineers, reverse ETL for operational systems.',
      ]} />

    </LearnLayout>
  )
}