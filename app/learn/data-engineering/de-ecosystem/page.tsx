import type { Metadata } from 'next'
import { LearnLayout } from '@/components/content/LearnLayout'
import { Callout } from '@/components/content/Callout'
import { KeyTakeaways } from '@/components/content/KeyTakeaways'

export const metadata: Metadata = {
  title: 'The Data Engineering Ecosystem — Data Engineering | Chaduvuko',
  description:
    'A complete map of every tool category in data engineering — what each one solves, why so many exist, and how they all connect. The mental model that makes every job posting readable.',
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

export default function DEEcosystemModule() {
  return (
    <LearnLayout
      title="The Data Engineering Ecosystem — Map of All the Tools"
      description="Every tool category, what it solves, and how they all connect."
      section="Data Engineering"
      readTime="50 min"
      updatedAt="March 2026"
    >

      {/* ── Part 01 — Why So Many Tools ──────────────────────────────── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 01 — The Overwhelming Question" />
        <SectionTitle>Why Are There So Many Tools?</SectionTitle>

        <Para>
          Open any data engineering job posting and you will see a list that looks like this:
          Spark, Kafka, Airflow, dbt, Snowflake, S3, Kubernetes, Terraform, Great Expectations,
          Delta Lake, Flink, Redshift, dbt Cloud, Airbyte, Fivetran, Databricks, Luigi, Prefect,
          Dagster, Iceberg. Twenty tools. Some postings list thirty.
        </Para>

        <Para>
          This is the single most overwhelming part of starting in data engineering. It looks
          like you need to learn everything before you can get a job. You do not. But you do
          need a mental model that makes sense of all of it — a map that tells you what
          category each tool belongs to and what problem it was built to solve.
        </Para>

        <Para>
          Once you have that map, three things happen. First, every job posting becomes
          readable — you can immediately categorise any tool you see. Second, learning a
          new tool becomes fast — you already know what problem it solves, so you only need
          to learn its specific API. Third, you can have intelligent conversations about
          tool choices without having used every tool personally.
        </Para>

        <SubTitle>The key insight — tools change, problems do not</SubTitle>

        <Para>
          The data engineering tool landscape has changed dramatically every three years
          for the past two decades. MapReduce replaced custom scripts. Hive replaced
          MapReduce. Spark replaced Hive. Databricks packaged Spark. New formats like
          Delta Lake and Iceberg emerged. Tools that were industry standard in 2018
          are considered legacy in 2026.
        </Para>

        <Para>
          But the underlying problems have not changed. Someone still needs to move data
          from sources to storage. Someone still needs to transform it. Someone still needs
          to schedule and monitor the pipelines. The problems are constant. Only the
          specific tools that solve them change.
        </Para>

        <HighlightBox>
          <div style={{
            fontSize: 15, fontWeight: 800, color: 'var(--text)',
            fontFamily: 'var(--font-display)', letterSpacing: '-0.3px',
            marginBottom: 12,
          }}>
            The hiring manager's real question
          </div>
          <Para>
            When a job posting lists "Spark, Kafka, Airflow" it is not asking "have you memorised
            these specific tools?" It is asking: "Do you understand distributed processing,
            event streaming, and pipeline orchestration well enough to be productive?" The
            tools are just the current industry vocabulary for those categories. Learn the
            categories. The specific tools follow quickly.
          </Para>
        </HighlightBox>

        <Callout type="info">
          <strong>What this module is and is not.</strong> This module gives you the complete
          map — every category, what it solves, which tools belong in it, and how categories
          connect. It is deliberately not a deep tutorial on any single tool. Each category
          gets its own dedicated module or track. Here you are building the mental architecture
          that makes everything else learnable.
        </Callout>
      </section>

      <Divider />

      {/* ── Part 02 — The Map ────────────────────────────────────────── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 02 — The Complete Map" />
        <SectionTitle>Ten Categories. Every Tool Has a Home.</SectionTitle>

        <Para>
          Every tool in data engineering belongs to one of ten categories. Some tools
          span two categories — Airflow is both an orchestrator and a scheduler, dbt is
          both a transformation tool and a testing framework. But every tool has a primary
          category, and that is enough to understand where it fits.
        </Para>

        <CodeBox label="The ten categories and their position in the data flow">{`DATA FLOW DIRECTION →

  [1. Programming     ]   Python, SQL, Scala, Bash
  [Languages         ]   The foundation everything else is written in

  [2. Source          ]   PostgreSQL, MySQL, MongoDB, Kafka, REST APIs
  [Systems           ]   Where data is born — not built by DEs but understood by them

  [3. Ingestion       ]   Fivetran, Airbyte, ADF, AWS Glue, custom Python
  [Tools             ]   Move data from sources into the platform

  [4. Message Brokers ]   Apache Kafka, AWS Kinesis, Azure Event Hubs, Google Pub/Sub
  [& Queues          ]   Decouple producers and consumers for real-time data

  [5. Storage         ]   Amazon S3, Azure ADLS, Google GCS, HDFS (legacy)
  [Object Stores     ]   Cheap, scalable storage for raw and processed files

  [6. Table Formats   ]   Delta Lake, Apache Iceberg, Apache Hudi
  [& Data Lakes      ]   Add ACID transactions and SQL semantics to object storage

  [7. Data Warehouses ]   Snowflake, BigQuery, Redshift, Azure Synapse, ClickHouse
  [                  ]   Columnar SQL databases optimised for analytical queries

  [8. Processing      ]   Apache Spark, dbt, Pandas, Apache Flink, Trino, Presto
  [Engines           ]   Transform data — from single-machine to distributed at scale

  [9. Orchestration   ]   Apache Airflow, Prefect, Dagster, Luigi, AWS Step Functions
  [& Scheduling      ]   Schedule, sequence, monitor, and manage pipeline runs

  [10. Quality        ]   Great Expectations, dbt tests, Monte Carlo, Soda, custom SQL
  [& Observability   ]   Validate data correctness and monitor pipeline health`}</CodeBox>
      </section>

      <Divider />

      {/* ── Part 03 — Category Deep Dives ───────────────────────────── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 03 — Each Category Explained" />
        <SectionTitle>Every Category — What It Solves and Why It Exists</SectionTitle>

        {/* Category 1 */}
        <div style={{
          background: 'var(--surface)', border: '1px solid var(--border)',
          borderRadius: 12, overflow: 'hidden', marginBottom: 20,
        }}>
          <div style={{ height: 3, background: '#00e676', opacity: 0.8 }} />
          <div style={{ padding: '24px 28px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 14 }}>
              <div style={{
                width: 32, height: 32, borderRadius: 8, flexShrink: 0,
                background: 'rgba(0,230,118,0.12)', border: '1px solid rgba(0,230,118,0.3)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 13, fontWeight: 900, color: '#00e676',
                fontFamily: 'var(--font-mono)',
              }}>1</div>
              <div>
                <div style={{ fontSize: 16, fontWeight: 800, color: 'var(--text)', fontFamily: 'var(--font-display)' }}>
                  Programming Languages
                </div>
                <div style={{ fontSize: 12, color: 'var(--muted)', fontFamily: 'var(--font-mono)' }}>
                  Python · SQL · Scala · Bash
                </div>
              </div>
            </div>

            <Para>
              Programming languages are not tools in the same sense as Spark or Airflow —
              they are the medium in which everything else is written. But understanding
              why specific languages dominate data engineering is important, because
              language choice affects what you can build and how fast.
            </Para>

            <SubTitle>Python — the dominant language</SubTitle>
            <Para>
              Python is the primary language of data engineering. It runs ingestion scripts,
              orchestration logic, data quality checks, transformation code, and API integrations.
              Python dominates because: it has the richest ecosystem of data libraries (Pandas,
              PySpark, SQLAlchemy, requests, Pydantic), it is readable enough that analysts and
              scientists can contribute pipeline code, and it is the same language data scientists
              use — reducing the translation layer between DE and DS teams.
            </Para>

            <SubTitle>SQL — the language of data</SubTitle>
            <Para>
              SQL is the most important language in data engineering, period. Every transformation
              in dbt is SQL. Every query an analyst runs is SQL. Every data warehouse uses SQL.
              A data engineer who writes excellent SQL is 3× more productive than one who avoids
              it. The SQL a data engineer needs goes far beyond SELECT and WHERE — window functions,
              CTEs, recursive queries, and warehouse-specific extensions are daily tools.
            </Para>

            <SubTitle>Scala — for Spark performance</SubTitle>
            <Para>
              Apache Spark is written in Scala, and Spark jobs written in Scala run faster
              than their Python equivalents because there is no serialisation overhead between
              the JVM and Python processes. Most companies use PySpark (Python API for Spark)
              for productivity. Companies processing at very high scale — FAANG, large fintechs —
              sometimes write performance-critical Spark jobs in Scala.
            </Para>

            <SubTitle>Bash — the glue of the command line</SubTitle>
            <Para>
              Bash scripts automate file operations, trigger pipeline runs, manage cron jobs,
              and monitor processes. Every data engineer uses Bash regularly even if they do
              not consider themselves a Bash programmer. The ability to chain Unix commands
              and write basic shell scripts is a practical daily-use skill.
            </Para>

            <div style={{
              background: 'var(--bg2)', border: '1px solid var(--border)',
              borderRadius: 8, padding: '14px 18px', marginTop: 8,
            }}>
              <div style={{
                fontSize: 10, fontWeight: 700, color: '#00e676',
                fontFamily: 'var(--font-mono)', letterSpacing: '.12em',
                textTransform: 'uppercase', marginBottom: 6,
              }}>Priority for learning</div>
              <div style={{ fontSize: 13, color: 'var(--muted)', lineHeight: 1.7 }}>
                SQL first — it is used in every single data engineering task.<br />
                Python second — pipelines, scripts, orchestration logic.<br />
                Bash third — automation and command-line productivity.<br />
                Scala — only if your team runs Spark at very high scale.
              </div>
            </div>
          </div>
        </div>

        {/* Category 2 */}
        <div style={{
          background: 'var(--surface)', border: '1px solid var(--border)',
          borderRadius: 12, overflow: 'hidden', marginBottom: 20,
        }}>
          <div style={{ height: 3, background: '#7b61ff', opacity: 0.8 }} />
          <div style={{ padding: '24px 28px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 14 }}>
              <div style={{
                width: 32, height: 32, borderRadius: 8, flexShrink: 0,
                background: 'rgba(123,97,255,0.12)', border: '1px solid rgba(123,97,255,0.3)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 13, fontWeight: 900, color: '#7b61ff',
                fontFamily: 'var(--font-mono)',
              }}>2</div>
              <div>
                <div style={{ fontSize: 16, fontWeight: 800, color: 'var(--text)', fontFamily: 'var(--font-display)' }}>
                  Source Systems
                </div>
                <div style={{ fontSize: 12, color: 'var(--muted)', fontFamily: 'var(--font-mono)' }}>
                  PostgreSQL · MySQL · MongoDB · Kafka · REST APIs · Files
                </div>
              </div>
            </div>

            <Para>
              Source systems are where data engineering begins. They are not tools data
              engineers build — they are tools data engineers must deeply understand in order
              to extract from them reliably. The production database, the event stream, the
              vendor API — these are the wells your pipelines draw from.
            </Para>

            <Para>
              The three properties of a source system that determine your ingestion approach:
            </Para>

            <CodeBox label="Source system analysis — three questions every DE asks">{`1. HOW IS DATA STRUCTURED?
   Relational (tables with foreign keys)  → SQL extraction, JOIN awareness
   Document (nested JSON objects)         → Flatten/explode nested fields
   Event stream (append-only log)         → Consumer group, offset tracking
   Files (CSV, JSON, XML, Parquet)        → Format parsing, schema detection

2. HOW DOES DATA CHANGE?
   Inserts only (event tables)     → Filter by max ID or timestamp
   Updates in-place (user profiles) → CDC or full load required
   Deletes (GDPR compliance)       → Hard to detect — need CDC or tombstone events
   Batch exports (daily dump)      → Full load or file diff comparison

3. WHAT ARE THE ACCESS CONSTRAINTS?
   Direct DB access allowed        → JDBC connection, read replica
   API only                        → Rate limits, pagination, auth tokens
   Files via SFTP                  → Polling, file lock detection
   No historical data available    → Must start capture now, no backfill possible`}</CodeBox>

            <Callout type="warning">
              <strong>Never run analytical queries on production databases directly.</strong> Always
              read from a read replica, a CDC stream, or a scheduled export. Analytical queries
              scanning millions of rows can consume enough database resources to slow down the
              live application for real users.
            </Callout>
          </div>
        </div>

        {/* Category 3 */}
        <div style={{
          background: 'var(--surface)', border: '1px solid var(--border)',
          borderRadius: 12, overflow: 'hidden', marginBottom: 20,
        }}>
          <div style={{ height: 3, background: '#f97316', opacity: 0.8 }} />
          <div style={{ padding: '24px 28px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 14 }}>
              <div style={{
                width: 32, height: 32, borderRadius: 8, flexShrink: 0,
                background: 'rgba(249,115,22,0.12)', border: '1px solid rgba(249,115,22,0.3)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 13, fontWeight: 900, color: '#f97316',
                fontFamily: 'var(--font-mono)',
              }}>3</div>
              <div>
                <div style={{ fontSize: 16, fontWeight: 800, color: 'var(--text)', fontFamily: 'var(--font-display)' }}>
                  Ingestion Tools
                </div>
                <div style={{ fontSize: 12, color: 'var(--muted)', fontFamily: 'var(--font-mono)' }}>
                  Fivetran · Airbyte · Azure Data Factory · AWS Glue · Custom Python
                </div>
              </div>
            </div>

            <Para>
              Ingestion tools connect to source systems and move data into the data platform.
              The fundamental choice is between managed connectors and custom code.
            </Para>

            <HighlightBox>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
                <div>
                  <div style={{
                    fontSize: 12, fontWeight: 700, color: '#f97316',
                    fontFamily: 'var(--font-mono)', letterSpacing: '.1em',
                    textTransform: 'uppercase', marginBottom: 10,
                  }}>Managed Connectors</div>
                  <div style={{ fontSize: 13, color: 'var(--muted)', lineHeight: 1.8, marginBottom: 8 }}>
                    Fivetran, Airbyte, Stitch. Pre-built connectors for 200+ sources.
                    Point at your source, configure the destination, it handles schema detection,
                    incremental sync, and error recovery automatically.
                  </div>
                  <div style={{ fontSize: 13, color: 'var(--muted)', lineHeight: 1.7 }}>
                    <div style={{ marginBottom: 4 }}>✓ Production-ready in hours not weeks</div>
                    <div style={{ marginBottom: 4 }}>✓ Handles schema evolution automatically</div>
                    <div style={{ marginBottom: 4 }}>✓ Enterprise SLA and support</div>
                    <div style={{ marginBottom: 4 }}>✗ Expensive at scale ($1,000–10,000+/mo)</div>
                    <div>✗ No control over extraction logic</div>
                  </div>
                  <div style={{
                    fontSize: 11, color: '#f97316', fontFamily: 'var(--font-mono)',
                    marginTop: 10,
                  }}>
                    Best for: standard SaaS sources (Salesforce, HubSpot, Stripe)
                  </div>
                </div>
                <div>
                  <div style={{
                    fontSize: 12, fontWeight: 700, color: '#4285f4',
                    fontFamily: 'var(--font-mono)', letterSpacing: '.1em',
                    textTransform: 'uppercase', marginBottom: 10,
                  }}>Custom Code</div>
                  <div style={{ fontSize: 13, color: 'var(--muted)', lineHeight: 1.8, marginBottom: 8 }}>
                    Python scripts you write yourself. Full control over extraction
                    logic, error handling, data validation, and incremental tracking.
                    ADF and Glue are cloud-managed platforms for running custom ingestion code.
                  </div>
                  <div style={{ fontSize: 13, color: 'var(--muted)', lineHeight: 1.7 }}>
                    <div style={{ marginBottom: 4 }}>✓ Full control — handle any source quirk</div>
                    <div style={{ marginBottom: 4 }}>✓ Cheaper at scale — pay for compute only</div>
                    <div style={{ marginBottom: 4 }}>✓ No vendor lock-in</div>
                    <div style={{ marginBottom: 4 }}>✗ Takes weeks to build robustly</div>
                    <div>✗ You own all maintenance</div>
                  </div>
                  <div style={{
                    fontSize: 11, color: '#4285f4', fontFamily: 'var(--font-mono)',
                    marginTop: 10,
                  }}>
                    Best for: internal databases, custom APIs, non-standard sources
                  </div>
                </div>
              </div>
            </HighlightBox>

            <Para>
              Most mature data teams use both. Managed connectors for standard SaaS sources
              where the cost is justified by time saved. Custom Python for internal databases,
              proprietary APIs, and sources that require complex extraction logic.
            </Para>
          </div>
        </div>

        {/* Category 4 */}
        <div style={{
          background: 'var(--surface)', border: '1px solid var(--border)',
          borderRadius: 12, overflow: 'hidden', marginBottom: 20,
        }}>
          <div style={{ height: 3, background: '#facc15', opacity: 0.8 }} />
          <div style={{ padding: '24px 28px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 14 }}>
              <div style={{
                width: 32, height: 32, borderRadius: 8, flexShrink: 0,
                background: 'rgba(250,204,21,0.12)', border: '1px solid rgba(250,204,21,0.3)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 13, fontWeight: 900, color: '#facc15',
                fontFamily: 'var(--font-mono)',
              }}>4</div>
              <div>
                <div style={{ fontSize: 16, fontWeight: 800, color: 'var(--text)', fontFamily: 'var(--font-display)' }}>
                  Message Brokers and Queues
                </div>
                <div style={{ fontSize: 12, color: 'var(--muted)', fontFamily: 'var(--font-mono)' }}>
                  Apache Kafka · AWS Kinesis · Azure Event Hubs · Google Pub/Sub · RabbitMQ
                </div>
              </div>
            </div>

            <Para>
              A message broker sits between systems that produce data and systems that consume
              it. Instead of system A directly calling system B, A sends a message to the broker,
              and B reads from the broker. This decoupling is one of the most powerful patterns
              in modern data architecture.
            </Para>

            <Para>
              The key benefit: the producer does not need to know anything about the consumers.
              When Zomato's order service publishes an "order.created" event to Kafka, it does
              not know or care that the analytics pipeline, the notification service, and the
              restaurant tablet app all read that same event. Each consumer reads independently,
              at its own pace, and can replay messages if it falls behind.
            </Para>

            <CodeBox label="Message broker — how it decouples producers and consumers">{`WITHOUT A MESSAGE BROKER:
  Order Service → directly calls → Analytics Service
  Order Service → directly calls → Notification Service
  Order Service → directly calls → Restaurant Service

  Problems:
  - Order Service is tightly coupled to 3 downstream services
  - If Notification Service is down, order placement fails
  - Adding a 4th consumer requires changing the Order Service
  - No ability to replay events if a consumer falls behind

WITH KAFKA:
  Order Service → publishes to → Kafka topic "order.created"

  Analytics Service    ← reads from "order.created"  (offset tracking)
  Notification Service ← reads from "order.created"  (independent)
  Restaurant Service   ← reads from "order.created"  (independent)
  New ML Service       ← reads from "order.created"  (add any time)

  Benefits:
  - Order Service has no knowledge of consumers
  - Consumer failure does not affect order placement
  - New consumers added without touching Order Service
  - Any consumer can replay from any historical offset
  - Events retained for configurable period (hours to weeks)`}</CodeBox>

            <Para>
              <strong>Apache Kafka</strong> is the dominant message broker in data engineering —
              used at Swiggy, Flipkart, Razorpay, and virtually every Indian unicorn for real-time
              data pipelines. AWS Kinesis, Azure Event Hubs, and Google Pub/Sub are the
              cloud-managed equivalents — same conceptual model, managed infrastructure.
            </Para>
          </div>
        </div>

        {/* Category 5 */}
        <div style={{
          background: 'var(--surface)', border: '1px solid var(--border)',
          borderRadius: 12, overflow: 'hidden', marginBottom: 20,
        }}>
          <div style={{ height: 3, background: '#4285f4', opacity: 0.8 }} />
          <div style={{ padding: '24px 28px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 14 }}>
              <div style={{
                width: 32, height: 32, borderRadius: 8, flexShrink: 0,
                background: 'rgba(66,133,244,0.12)', border: '1px solid rgba(66,133,244,0.3)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 13, fontWeight: 900, color: '#4285f4',
                fontFamily: 'var(--font-mono)',
              }}>5</div>
              <div>
                <div style={{ fontSize: 16, fontWeight: 800, color: 'var(--text)', fontFamily: 'var(--font-display)' }}>
                  Object Storage
                </div>
                <div style={{ fontSize: 12, color: 'var(--muted)', fontFamily: 'var(--font-mono)' }}>
                  Amazon S3 · Azure ADLS Gen2 · Google Cloud Storage · MinIO (self-hosted)
                </div>
              </div>
            </div>

            <Para>
              Object storage is the foundation of the modern data lake. It stores files — any
              file, any format, any size — at extremely low cost with virtually unlimited
              scale. A petabyte of data in S3 costs roughly $23,000 per month. The same data
              in a relational database would cost orders of magnitude more.
            </Para>

            <Para>
              Object stores are not file systems. They do not have folders — they have a flat
              namespace of objects, each identified by a key. The "folder" structure you see
              in S3 or ADLS is a convention using forward slashes in key names. This distinction
              matters because operations that are fast in a file system (listing all files in
              a directory) can be slow and expensive in an object store at scale.
            </Para>

            <CodeBox label="Object storage key structure — conventions that enable efficient queries">{`S3 bucket: s3://freshmart-data-lake/

Object keys (what looks like folders is just key prefix):
  bronze/orders/date=2026-03-17/hour=08/part-00001.parquet
  bronze/orders/date=2026-03-17/hour=09/part-00001.parquet
  bronze/orders/date=2026-03-18/hour=08/part-00001.parquet

  silver/orders_cleaned/date=2026-03-17/part-00001.parquet
  gold/daily_metrics/date=2026-03-17/metrics.parquet

Why the date= prefix matters (Hive-style partitioning):
  Query: SELECT * FROM orders WHERE date = '2026-03-17'
  Without partitioning: scan all files in bronze/orders/ → expensive
  With partitioning:    scan only bronze/orders/date=2026-03-17/ → fast

  A query engine like Spark or Athena reads the key prefix
  and skips all partitions that do not match the filter.
  On 2 years of data, this can reduce the files read by 700×.`}</CodeBox>
          </div>
        </div>

        {/* Category 6 */}
        <div style={{
          background: 'var(--surface)', border: '1px solid var(--border)',
          borderRadius: 12, overflow: 'hidden', marginBottom: 20,
        }}>
          <div style={{ height: 3, background: '#ff4757', opacity: 0.8 }} />
          <div style={{ padding: '24px 28px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 14 }}>
              <div style={{
                width: 32, height: 32, borderRadius: 8, flexShrink: 0,
                background: 'rgba(255,71,87,0.12)', border: '1px solid rgba(255,71,87,0.3)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 13, fontWeight: 900, color: '#ff4757',
                fontFamily: 'var(--font-mono)',
              }}>6</div>
              <div>
                <div style={{ fontSize: 16, fontWeight: 800, color: 'var(--text)', fontFamily: 'var(--font-display)' }}>
                  Table Formats and the Lakehouse
                </div>
                <div style={{ fontSize: 12, color: 'var(--muted)', fontFamily: 'var(--font-mono)' }}>
                  Delta Lake · Apache Iceberg · Apache Hudi
                </div>
              </div>
            </div>

            <Para>
              Plain object storage has a fundamental problem: it is just files. You cannot update
              a specific row. You cannot delete records to comply with GDPR. You cannot guarantee
              that a query sees a consistent snapshot of data while it is being written. You cannot
              roll back a bad data load. These are the properties that databases have and that
              raw object storage lacks.
            </Para>

            <Para>
              Table formats solve this by adding a transaction log layer on top of object storage.
              Instead of storing data as loose Parquet files, a table format maintains a log of
              every operation — every write, update, delete — and uses this log to provide ACID
              transaction guarantees, time travel (query the data as it existed at any past
              point), and schema evolution.
            </Para>

            <HighlightBox>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 20 }}>
                {[
                  {
                    name: 'Delta Lake',
                    color: '#00add4',
                    creator: 'Databricks',
                    strength: 'Deep Spark integration, excellent Databricks support, widely adopted at scale',
                    use: 'Databricks-heavy stacks, Microsoft ecosystem',
                  },
                  {
                    name: 'Apache Iceberg',
                    color: '#2672a0',
                    creator: 'Netflix (now Apache)',
                    strength: 'Engine-agnostic — works equally well with Spark, Flink, Trino, Athena',
                    use: 'Multi-engine environments, AWS-heavy stacks',
                  },
                  {
                    name: 'Apache Hudi',
                    color: '#f97316',
                    creator: 'Uber (now Apache)',
                    strength: 'Optimised for record-level upserts — best when you need to update individual rows frequently',
                    use: 'CDC workloads, streaming upserts',
                  },
                ].map((item) => (
                  <div key={item.name}>
                    <div style={{
                      fontSize: 13, fontWeight: 800, color: item.color,
                      marginBottom: 4, fontFamily: 'var(--font-display)',
                    }}>{item.name}</div>
                    <div style={{ fontSize: 11, color: 'var(--muted)', marginBottom: 6, fontFamily: 'var(--font-mono)' }}>
                      by {item.creator}
                    </div>
                    <div style={{ fontSize: 12, color: 'var(--muted)', lineHeight: 1.7, marginBottom: 6 }}>
                      {item.strength}
                    </div>
                    <div style={{ fontSize: 11, color: item.color, fontStyle: 'italic' }}>
                      Best for: {item.use}
                    </div>
                  </div>
                ))}
              </div>
            </HighlightBox>

            <Para>
              The combination of object storage + table format = <strong>Lakehouse</strong>.
              A Lakehouse gives you the low cost and unlimited scale of object storage plus
              the ACID transactions, time travel, and schema enforcement of a database. This
              is the architecture replacing both pure data lakes (too unreliable) and
              pure warehouses (too expensive at scale) at most modern companies.
            </Para>
          </div>
        </div>

        {/* Category 7 */}
        <div style={{
          background: 'var(--surface)', border: '1px solid var(--border)',
          borderRadius: 12, overflow: 'hidden', marginBottom: 20,
        }}>
          <div style={{ height: 3, background: '#29b5e8', opacity: 0.8 }} />
          <div style={{ padding: '24px 28px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 14 }}>
              <div style={{
                width: 32, height: 32, borderRadius: 8, flexShrink: 0,
                background: 'rgba(41,181,232,0.12)', border: '1px solid rgba(41,181,232,0.3)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 13, fontWeight: 900, color: '#29b5e8',
                fontFamily: 'var(--font-mono)',
              }}>7</div>
              <div>
                <div style={{ fontSize: 16, fontWeight: 800, color: 'var(--text)', fontFamily: 'var(--font-display)' }}>
                  Data Warehouses
                </div>
                <div style={{ fontSize: 12, color: 'var(--muted)', fontFamily: 'var(--font-mono)' }}>
                  Snowflake · Google BigQuery · Amazon Redshift · Azure Synapse · ClickHouse
                </div>
              </div>
            </div>

            <Para>
              Data warehouses are columnar SQL databases engineered for analytical queries.
              They are where Gold layer data lives and where business analysts, dashboards,
              and BI tools connect. We covered columnar storage in Module 03 — here we
              focus on the architectural differences between warehouses.
            </Para>

            <CodeBox label="Data warehouse comparison — the four major platforms">{`Warehouse      Architecture         Pricing Model        Best For
──────────────────────────────────────────────────────────────────────
Snowflake      Separate compute      Per-second compute   Multi-cloud teams,
               and storage           + storage cost       variable workloads

BigQuery       Serverless            Per-TB queried       Google Cloud stacks,
(Google)       (no cluster sizing)   (first 1TB/mo free)  unpredictable workloads

Redshift       Cluster-based         Per-hour per node    AWS-native stacks,
(AWS)          (you size it)         + Serverless option  steady high volume

Azure Synapse  Hybrid (serverless    DTUs or serverless   Microsoft/Azure shops,
               + dedicated pools)    + storage cost       hybrid on-prem/cloud

ClickHouse     Single/clustered      Open source or       Real-time analytics,
               column store          ClickHouse Cloud     sub-second query SLA

Key differences that matter day-to-day:
  Snowflake:  "Virtual warehouses" separate query compute from storage
              → scale compute up for heavy workloads, down when idle
  BigQuery:   No infrastructure to manage — submit query, get results
              → dangerous cost surprises if queries are not optimised
  Redshift:   Must choose and resize cluster nodes manually
              → cheaper for steady workloads, painful for spikes`}</CodeBox>
          </div>
        </div>

        {/* Category 8 */}
        <div style={{
          background: 'var(--surface)', border: '1px solid var(--border)',
          borderRadius: 12, overflow: 'hidden', marginBottom: 20,
        }}>
          <div style={{ height: 3, background: '#e25a1c', opacity: 0.8 }} />
          <div style={{ padding: '24px 28px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 14 }}>
              <div style={{
                width: 32, height: 32, borderRadius: 8, flexShrink: 0,
                background: 'rgba(226,90,28,0.12)', border: '1px solid rgba(226,90,28,0.3)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 13, fontWeight: 900, color: '#e25a1c',
                fontFamily: 'var(--font-mono)',
              }}>8</div>
              <div>
                <div style={{ fontSize: 16, fontWeight: 800, color: 'var(--text)', fontFamily: 'var(--font-display)' }}>
                  Processing Engines
                </div>
                <div style={{ fontSize: 12, color: 'var(--muted)', fontFamily: 'var(--font-mono)' }}>
                  Apache Spark · dbt · Pandas · Apache Flink · Trino · Presto
                </div>
              </div>
            </div>

            <Para>
              Processing engines are what execute transformation logic — they read data, apply
              business rules, and write the result. The right engine depends entirely on the
              scale of data and the nature of the transformation.
            </Para>

            <CodeBox label="Processing engine selection — scale determines the choice">{`DATA SCALE           TOOL              WHY

< 1 GB               Pandas            Single machine, in-memory, simple API
(small files,        (Python)          Most data engineer scripts start here
dev/testing)

1 GB – 1 TB          dbt               SQL-based transforms that run inside
(warehouse scale)    (SQL)             the warehouse — no separate compute needed
                                       Most production transformation is at this scale

1 TB – 100+ TB       Apache Spark      Distributed processing across a cluster
(big data)           (PySpark/Scala)   Databricks is the managed Spark platform
                                       Used by Flipkart, Meesho, Swiggy at scale

Real-time streams    Apache Flink      Stateful stream processing
(any scale)          or Spark          Flink: lower latency, more complex
                     Streaming         Spark Streaming: easier if team knows Spark

Query engine over    Trino / Presto    Query data lakes directly with SQL
data lake                              No need to load into a warehouse first
(ad-hoc queries)                       AWS Athena and BigQuery use this model

The most important insight:
  dbt is the dominant transformation tool at most companies today
  because most transformations happen at warehouse scale (GB–TB),
  not big data scale (TB+). Writing SQL in dbt is faster to build,
  easier to test, and simpler to maintain than PySpark for 80%
  of real production workloads.`}</CodeBox>

            <Callout type="tip">
              <strong>The most over-engineered mistake in data engineering:</strong> using Spark
              for datasets that comfortably fit in a data warehouse. Spark is the right tool
              for data that genuinely exceeds warehouse capacity or requires distributed stream
              processing. For everything else, dbt running SQL inside Snowflake or BigQuery
              is simpler, cheaper, and easier to maintain. Reach for Spark when you need it,
              not because it sounds impressive.
            </Callout>
          </div>
        </div>

        {/* Category 9 */}
        <div style={{
          background: 'var(--surface)', border: '1px solid var(--border)',
          borderRadius: 12, overflow: 'hidden', marginBottom: 20,
        }}>
          <div style={{ height: 3, background: '#017cee', opacity: 0.8 }} />
          <div style={{ padding: '24px 28px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 14 }}>
              <div style={{
                width: 32, height: 32, borderRadius: 8, flexShrink: 0,
                background: 'rgba(1,124,238,0.12)', border: '1px solid rgba(1,124,238,0.3)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 13, fontWeight: 900, color: '#017cee',
                fontFamily: 'var(--font-mono)',
              }}>9</div>
              <div>
                <div style={{ fontSize: 16, fontWeight: 800, color: 'var(--text)', fontFamily: 'var(--font-display)' }}>
                  Orchestration and Scheduling
                </div>
                <div style={{ fontSize: 12, color: 'var(--muted)', fontFamily: 'var(--font-mono)' }}>
                  Apache Airflow · Prefect · Dagster · AWS Step Functions · Azure Data Factory
                </div>
              </div>
            </div>

            <Para>
              Orchestration is what makes data pipelines run automatically, in the right order,
              on a schedule, with failure handling, retries, and alerts. Without orchestration,
              a data engineer would need to manually trigger every pipeline step in the right
              sequence every day. Orchestration tools eliminate that entirely.
            </Para>

            <Para>
              All orchestrators express pipelines as <strong>DAGs — Directed Acyclic Graphs</strong>.
              A DAG is a set of tasks with dependencies between them — task B depends on task A
              means B only runs after A completes successfully. The "acyclic" part means there
              are no cycles — a task cannot depend on itself directly or indirectly.
            </Para>

            <CodeBox label="What a DAG looks like — a real pipeline expressed as dependencies">{`Daily data pipeline DAG:

  [ingest_orders]  ──┐
                     ├──→ [bronze_to_silver] ──→ [silver_to_gold] ──→ [alert_success]
  [ingest_users]   ──┘         │
                               └──→ [data_quality_checks] ──→ [alert_if_failed]

Execution rules:
  ingest_orders and ingest_users run in PARALLEL (no dependency)
  bronze_to_silver waits for BOTH ingestions to complete
  silver_to_gold waits for bronze_to_silver AND quality checks
  alert_success only runs if silver_to_gold succeeds
  alert_if_failed only runs if quality checks fail

Schedule: daily at 02:00 AM UTC
Retry policy: 3 retries with 5-minute delays on any failure
SLA: entire DAG must complete before 06:00 AM

Airflow key concepts:
  DAG      → the pipeline definition (Python file)
  Task     → one step in the pipeline (Python function, SQL query, Bash command)
  Operator → the type of task (PythonOperator, BashOperator, SQLOperator)
  XCom     → mechanism for tasks to pass small values to each other
  Sensor   → a task that waits for an external condition to be true`}</CodeBox>

            <Para>
              <strong>Apache Airflow</strong> is the most widely deployed orchestrator in
              the industry. It has a large community, extensive operator library, and is
              the standard at most Indian product companies. Prefect and Dagster are
              modern alternatives with better developer experience but smaller ecosystems.
              AWS Step Functions and Azure Data Factory serve as both ingestion and
              orchestration tools in their respective cloud ecosystems.
            </Para>
          </div>
        </div>

        {/* Category 10 */}
        <div style={{
          background: 'var(--surface)', border: '1px solid var(--border)',
          borderRadius: 12, overflow: 'hidden', marginBottom: 20,
        }}>
          <div style={{ height: 3, background: '#8b5cf6', opacity: 0.8 }} />
          <div style={{ padding: '24px 28px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 14 }}>
              <div style={{
                width: 32, height: 32, borderRadius: 8, flexShrink: 0,
                background: 'rgba(139,92,246,0.12)', border: '1px solid rgba(139,92,246,0.3)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 13, fontWeight: 900, color: '#8b5cf6',
                fontFamily: 'var(--font-mono)',
              }}>10</div>
              <div>
                <div style={{ fontSize: 16, fontWeight: 800, color: 'var(--text)', fontFamily: 'var(--font-display)' }}>
                  Data Quality and Observability
                </div>
                <div style={{ fontSize: 12, color: 'var(--muted)', fontFamily: 'var(--font-mono)' }}>
                  Great Expectations · dbt tests · Monte Carlo · Soda · Custom SQL assertions
                </div>
              </div>
            </div>

            <Para>
              A pipeline that runs successfully but produces wrong data is worse than a
              pipeline that fails visibly — because nobody knows the data is wrong until
              a business decision is made on it. Data quality tools add explicit validation
              checks that catch bad data before it propagates downstream.
            </Para>

            <CodeBox label="The three levels of data quality checking">{`LEVEL 1 — Schema validation (catches structural problems)
  ✓ Does the table have the expected columns?
  ✓ Are the column types correct (date as DATE, not VARCHAR)?
  ✓ Are NOT NULL constraints respected?
  ✓ Do values conform to expected formats (phone numbers, emails)?

LEVEL 2 — Statistical validation (catches data drift)
  ✓ Is the row count within expected range? (±20% of yesterday)
  ✓ Are numeric columns within expected bounds?
     (order_amount between ₹0 and ₹50,000 — flag outliers)
  ✓ Are categorical columns limited to expected values?
     (order_status IN ('placed', 'confirmed', 'delivered', 'cancelled'))
  ✓ Is null rate below threshold? (customer_id null rate < 0.1%)

LEVEL 3 — Business rule validation (catches logic errors)
  ✓ Is delivered_at always after placed_at?
  ✓ Does daily revenue in this table match the finance system?
  ✓ Are all orders linked to a valid restaurant in the restaurant table?
  ✓ Is the count of new users consistent with the signup pipeline?

Tools:
  dbt tests     → Level 1 and 3, native in the transformation layer
  Great Exp.    → All three levels, Python-based, standalone
  Custom SQL    → Any validation expressible as a SQL query
  Monte Carlo   → ML-based anomaly detection for Level 2`}</CodeBox>

            <Para>
              <strong>Observability</strong> goes beyond quality checks on data — it is about
              monitoring the health of the pipelines themselves. How long did each step take?
              Did the row counts change significantly from yesterday? Is the pipeline completing
              within its SLA? Good observability means you know about problems before
              stakeholders do.
            </Para>
          </div>
        </div>
      </section>

      <Divider />

      {/* ── Part 04 — How the Stack Connects ────────────────────────── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 04 — The Stack in Practice" />
        <SectionTitle>Three Real Company Stacks — Same Problems, Different Tools</SectionTitle>

        <Para>
          The same ten categories appear in every data platform. What changes between
          companies is which specific tool they chose for each category. Here are three
          real representative stacks you will encounter in India in 2026.
        </Para>

        {[
          {
            type: 'Mid-size Indian Startup (Series B, ~200 employees)',
            color: '#00e676',
            stack: [
              { cat: 'Languages', tool: 'Python + SQL', why: 'Small team, productivity over performance' },
              { cat: 'Ingestion', tool: 'Custom Python + Airbyte for SaaS sources', why: 'Cost-conscious, Airbyte open-source' },
              { cat: 'Message Broker', tool: 'Kafka (managed on Confluent Cloud)', why: 'Real-time order and payment events' },
              { cat: 'Object Storage', tool: 'Amazon S3', why: 'AWS-first infrastructure team' },
              { cat: 'Table Format', tool: 'Delta Lake on Databricks', why: 'ACID on S3, Spark integration' },
              { cat: 'Warehouse', tool: 'Snowflake', why: 'Analyst-friendly, scales with growth' },
              { cat: 'Processing', tool: 'dbt (SQL transforms) + PySpark for heavy jobs', why: 'Most transforms are warehouse-scale' },
              { cat: 'Orchestration', tool: 'Apache Airflow (managed on Astronomer)', why: 'Industry standard, good talent availability' },
              { cat: 'Quality', tool: 'dbt tests + custom SQL assertions', why: 'Built into transformation layer' },
            ],
          },
          {
            type: 'Large Enterprise / GCC (Banking or Healthcare)',
            color: '#0078d4',
            stack: [
              { cat: 'Languages', tool: 'Python + SQL + Scala', why: 'Large Spark workloads' },
              { cat: 'Ingestion', tool: 'Azure Data Factory + Fivetran', why: 'Azure-first, compliance-approved tools' },
              { cat: 'Message Broker', tool: 'Azure Event Hubs', why: 'Native Azure, enterprise SLA' },
              { cat: 'Object Storage', tool: 'Azure Data Lake Storage Gen2', why: 'Microsoft stack, regulatory compliance' },
              { cat: 'Table Format', tool: 'Delta Lake on Azure Databricks', why: 'Microsoft partnership, enterprise support' },
              { cat: 'Warehouse', tool: 'Azure Synapse Analytics', why: 'Native Microsoft integration, security controls' },
              { cat: 'Processing', tool: 'Azure Databricks (Spark) + dbt', why: 'Large data volumes, compliance requirements' },
              { cat: 'Orchestration', tool: 'Azure Data Factory + Airflow', why: 'ADF for Azure-native jobs, Airflow for complex DAGs' },
              { cat: 'Quality', tool: 'Great Expectations + Monte Carlo', why: 'Regulatory audit requirements' },
            ],
          },
          {
            type: 'FAANG India / High-Scale Consumer Platform',
            color: '#ff9900',
            stack: [
              { cat: 'Languages', tool: 'Python + SQL + Scala + Java', why: 'Scale requires all options' },
              { cat: 'Ingestion', tool: 'Custom internal platform + Kafka Connect', why: 'Scale makes custom tools cost-effective' },
              { cat: 'Message Broker', tool: 'Apache Kafka (multi-cluster)', why: 'Billions of events per day' },
              { cat: 'Object Storage', tool: 'Amazon S3 (multi-region)', why: 'AWS-native, multi-region redundancy' },
              { cat: 'Table Format', tool: 'Apache Iceberg', why: 'Engine-agnostic, works with Athena + Spark + Flink' },
              { cat: 'Warehouse', tool: 'Amazon Redshift + BigQuery', why: 'Different warehouses for different workloads' },
              { cat: 'Processing', tool: 'Apache Spark (custom EMR) + Flink + Trino', why: 'Different engines for different scale/latency needs' },
              { cat: 'Orchestration', tool: 'Internal platform + Airflow', why: 'Scale requires custom scheduling infrastructure' },
              { cat: 'Quality', tool: 'Custom internal + Monte Carlo', why: 'Petabyte scale needs automated ML-based detection' },
            ],
          },
        ].map((company) => (
          <div key={company.type} style={{
            background: 'var(--surface)', border: `1px solid ${company.color}33`,
            borderRadius: 12, overflow: 'hidden', marginBottom: 20,
          }}>
            <div style={{ height: 3, background: company.color }} />
            <div style={{ padding: '20px 24px' }}>
              <div style={{
                fontSize: 13, fontWeight: 800, color: company.color,
                fontFamily: 'var(--font-display)', marginBottom: 16,
              }}>
                {company.type}
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
                {company.stack.map((item, i) => (
                  <div key={i} style={{
                    display: 'grid',
                    gridTemplateColumns: '140px 1fr 1fr',
                    gap: 12,
                    padding: '8px 0',
                    borderBottom: i < company.stack.length - 1 ? '1px solid var(--border)' : 'none',
                    alignItems: 'start',
                  }}>
                    <div style={{
                      fontSize: 10, fontWeight: 700, color: 'var(--muted)',
                      fontFamily: 'var(--font-mono)', letterSpacing: '.08em',
                      textTransform: 'uppercase', paddingTop: 2,
                    }}>{item.cat}</div>
                    <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--text)' }}>{item.tool}</div>
                    <div style={{ fontSize: 12, color: 'var(--muted)', lineHeight: 1.5, fontStyle: 'italic' }}>{item.why}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </section>

      <Divider />

      {/* ── Part 05 — Reading a Job Posting ─────────────────────────── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 05 — Practical Application" />
        <SectionTitle>How to Read a Data Engineering Job Posting</SectionTitle>

        <Para>
          Now apply the map to a real job posting. Here is a representative JD for a
          mid-level data engineer role at an Indian fintech startup. Every technology
          listed maps to one of the ten categories.
        </Para>

        <CodeBox label="Sample JD — Data Engineer, Fintech Startup, Bangalore">{`We are looking for a Data Engineer to join our growing data team.

Requirements:
  • 3+ years experience in data engineering
  • Strong proficiency in Python and SQL                    ← Category 1: Languages
  • Experience with Apache Airflow or similar orchestration ← Category 9: Orchestration
  • Hands-on experience with Spark or distributed computing ← Category 8: Processing
  • Knowledge of cloud data platforms (AWS/Azure/GCP)      ← Category 5+7: Storage + Warehouse
  • Experience with Kafka or event-driven architectures    ← Category 4: Message Brokers
  • Familiarity with dbt for data transformation           ← Category 8: Processing (SQL)
  • Experience building ELT/ETL pipelines                  ← Category 3: Ingestion
  • Knowledge of data warehouse concepts (Redshift/Snowflake) ← Category 7: Warehouse
  • Understanding of data modelling (star schema, SCD)     ← Concepts, not a tool

Nice to have:
  • Experience with Delta Lake or Apache Iceberg           ← Category 6: Table Formats
  • Familiarity with Great Expectations or dbt tests       ← Category 10: Quality
  • Terraform for infrastructure as code                   ← Infrastructure (IaC)

What this JD is really asking:
  Core: Can you write Python pipelines (Cat 1), schedule them (Cat 9),
        process large data (Cat 8), and work with cloud storage and
        warehouses (Cat 5, 7)?

  Context: Do you understand event-driven data flows (Cat 4) and
           can you model data correctly (concepts)?

  Advanced: Do you know modern table formats (Cat 6) and data
            quality practices (Cat 10)?

  The "3+ years" is negotiable if you have strong project evidence.
  The tools are current flavour — if you know Prefect, you can learn Airflow.
  If you know Redshift, you can learn Snowflake. Categories are what count.`}</CodeBox>
      </section>

      <Divider />

      {/* ── Part 06 — Real World ─────────────────────────────────────── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 06 — Real World" />
        <div style={{
          fontSize: 10, fontWeight: 700, letterSpacing: '.12em',
          textTransform: 'uppercase', color: 'var(--muted)', marginBottom: 12,
          fontFamily: 'var(--font-mono)',
        }}>
          💼 What This Looks Like at Work
        </div>
        <SectionTitle>Choosing a Stack for a New Data Platform — From Scratch</SectionTitle>

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
            Scenario — E-commerce Startup · First Data Engineer Hire
          </div>

          <Para>
            You are the first data engineer at a 3-year-old e-commerce startup. The
            company has a MySQL production database, a Shopify store, and a Razorpay
            integration. They have no data platform. Your manager asks you to propose a
            stack within your first two weeks.
          </Para>

          <Para>
            Your thinking process — mapped to the ten categories:
          </Para>

          <Para>
            <strong>Category 3 (Ingestion):</strong> Two sources need to be connected —
            the internal MySQL database and Shopify. Airbyte has a free open-source version
            with connectors for both. You propose Airbyte for Shopify (managed connector,
            saves time) and custom Python for MySQL (need more control over which tables
            and what incremental logic to use).
          </Para>

          <Para>
            <strong>Category 5 (Storage):</strong> The company already uses AWS for its
            application infrastructure. S3 is the natural choice — no new vendor, existing
            IAM permissions, and the team already knows it.
          </Para>

          <Para>
            <strong>Category 7 (Warehouse):</strong> The team is four analysts and one data
            scientist, all comfortable with SQL. Snowflake is analyst-friendly and has a
            pay-per-use model that is affordable at this scale. BigQuery is also viable,
            but costs are harder to predict with the per-query model.
          </Para>

          <Para>
            <strong>Category 8 (Processing):</strong> Data volume is small — a few million
            rows total. There is no need for Spark. dbt running SQL transforms inside
            Snowflake is sufficient and far simpler to operate and maintain.
          </Para>

          <Para>
            <strong>Category 9 (Orchestration):</strong> For a two-person data team building
            a new platform, Airflow's operational overhead is too high. You propose starting
            with Prefect Cloud — simpler to deploy, hosted scheduler, better developer
            experience for a small team. You can migrate to Airflow later if needed.
          </Para>

          <Para>
            <strong>The decision principle:</strong> Every choice was made based on the
            team's current scale, skills, and constraints — not based on what the biggest
            companies use. A two-person team building a data platform for 10M events per
            day does not need the same stack as a team handling 1 billion events. Matching
            tool choices to actual requirements is one of the most valuable skills a
            data engineer develops over time.
          </Para>
        </div>
      </section>

      <Divider />

      {/* ── Part 07 — Interview Prep ─────────────────────────────────── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 07 — Interview Prep" />
        <SectionTitle>5 Interview Questions — With Complete Answers</SectionTitle>

        {[
          {
            q: 'Q1. What is the difference between Apache Kafka and a traditional database? When would you use each?',
            a: `Kafka and a traditional database solve fundamentally different problems and are not interchangeable.

A relational database is optimised for storing the current state of things — the latest value of every record. When a customer updates their address, the database stores the new address and the old one is overwritten. Queries ask "what is the current state?" You can insert, update, delete, and query arbitrarily. Data is retained indefinitely.

Kafka is optimised for storing a sequence of events — every change that has ever happened, in order, permanently. When a customer updates their address, Kafka stores the "address_changed" event. The previous address is not overwritten — it still exists in the event log. Queries ask "what happened, and in what order?" You can only append. Data is retained for a configurable period (days to weeks typically) rather than indefinitely.

Use a database when you need to query the current state of entities and perform transactional operations. Use Kafka when you need to stream events between systems, process data in real-time, or maintain a reliable audit log of everything that has happened. In a mature data platform, both coexist: the operational database stores current state, Kafka streams changes as they happen, and the data lake stores the complete historical record.`,
          },
          {
            q: 'Q2. How do you choose between dbt and Apache Spark for a data transformation task?',
            a: `The decision comes down to scale, skill set, and operational complexity. Both tools transform data, but they operate in completely different ways and at different scales.

dbt runs SQL transformations inside an existing data warehouse like Snowflake or BigQuery. It does not move data — it executes SQL queries that read from one table and write to another within the same warehouse. This means dbt is fast to set up (no new infrastructure), easy to maintain (SQL is readable by anyone), and inherits the warehouse's scaling capabilities. dbt is the right choice when your data fits comfortably in a data warehouse — which is true for the majority of production transformation workloads, even at companies processing billions of rows.

Spark is a distributed processing engine that runs across a cluster of machines. It is the right choice when: data volume exceeds what a single data warehouse can process efficiently, the transformation requires complex Python or machine learning logic that cannot be expressed in SQL, you are processing streaming data with Apache Spark Structured Streaming, or you need to read from multiple heterogeneous sources (S3, databases, Kafka) in a single job.

In practice: start with dbt. If a transformation is taking too long in the warehouse, profile why before assuming Spark is needed. Most "too slow" queries can be fixed with better partitioning, clustering keys, or materialisation strategies. Move to Spark only when the warehouse genuinely cannot handle the workload.`,
          },
          {
            q: 'Q3. Why do most companies use both a data lake (S3/ADLS) and a data warehouse (Snowflake/BigQuery) rather than just one?',
            a: `Data lakes and data warehouses each have strengths the other lacks, and using both allows you to optimise each storage layer for what it is actually good at.

Object storage (S3, ADLS) is extremely cheap — roughly $0.02–0.05 per GB per month — scales to unlimited size, and accepts any file format. It is the ideal place to store raw data that may need to be reprocessed in future, historical archives, large binary files, and data that is not yet clean enough for analysis. Its weakness is query performance — running SQL directly over S3 files is significantly slower than running the same query in a warehouse, and raw files require schema knowledge to interpret.

Data warehouses are expensive at scale — $0.50–2.00 per GB per month for storage, plus compute costs — but they are 10–100× faster for analytical SQL queries, enforce schemas, have built-in access controls, and provide query optimisation that dramatically reduces compute cost for repeated query patterns.

The standard architecture uses both: raw and intermediate data live in S3/ADLS where storage is cheap, and only the clean, aggregated Gold layer data is loaded into the warehouse where query performance matters. This means you pay warehouse prices only for the data that analysts actually query, while retaining unlimited history in cheap object storage for future reprocessing.`,
          },
          {
            q: 'Q4. What is an orchestrator and what problem does it solve that a cron job does not?',
            a: `A cron job is a Unix scheduler — it runs a command at a specified time. It solves the basic problem of "run this script at 2 AM every day." For simple single-step pipelines with no dependencies, cron is perfectly adequate.

An orchestrator like Airflow solves the more complex problems that appear as soon as a pipeline has multiple steps with dependencies.

Dependency management: an orchestrator ensures step B only runs after step A completes successfully. A cron job has no awareness of other jobs — if you schedule step A at 2 AM and step B at 3 AM, and step A takes 90 minutes due to a large data volume, step B starts before A finishes, producing incorrect results.

Failure handling: when an orchestrator task fails, it retries automatically according to a configured policy, sends alerts, and marks the task as failed in its metadata database. With cron, a failed script writes an error to a log file that nobody reads unless they happen to check.

Visibility: orchestrators provide a UI showing every run, its status, its duration, its logs, and the state of each task within it. With cron, you have no centralised visibility into what ran, what failed, or how long things took.

Backfill: if a pipeline was broken and missed several days of data, an orchestrator can backfill — re-run the pipeline for each missed day with the correct execution date parameter. Cron has no concept of historical execution.`,
          },
          {
            q: 'Q5. A startup is just beginning to build a data platform. What minimum viable stack would you recommend and why?',
            a: `For a startup in the early stages — say Series A with fewer than 50 employees and a small data team — I would recommend the simplest possible stack that solves the actual problems, not the stack that scales to a billion events.

For ingestion, I would use Airbyte open-source for standard SaaS sources (Salesforce, HubSpot, Stripe) and custom Python scripts for internal databases. Airbyte handles most common connectors and is free to self-host, avoiding the $1,000+/month cost of Fivetran at this stage.

For storage, I would use the cloud the engineering team already uses — S3 if they are on AWS, ADLS if on Azure. No new vendor to evaluate, existing IAM policies apply.

For transformation, I would use dbt Core (free, open-source) running SQL transforms inside the warehouse. At startup scale, all transformations are warehouse-scale — Spark is unnecessary and expensive to operate.

For the warehouse, I would choose Snowflake or BigQuery depending on cloud preference. Both have free tiers sufficient for a startup and analyst-friendly SQL interfaces. Snowflake has more predictable pricing; BigQuery has zero infrastructure management.

For orchestration, I would use Prefect Cloud or a simple Airflow instance on a small cloud VM. At startup scale, a complex Airflow deployment on Kubernetes is over-engineered.

I would not implement a table format (Delta Lake, Iceberg) or a formal data quality tool until the platform matures. dbt's built-in tests handle basic quality at this stage. The goal at startup phase is to get reliable data in front of analysts quickly — not to build a platform that scales to petabytes.`,
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
            error: `AnalysisException: Resolved attribute(s) missing from child — column 'order_amount' not found in schema`,
            cause: 'A Spark or dbt job is referencing a column name that does not exist in the source table at runtime. The schema of the upstream table changed — a column was renamed or dropped — and the transformation code was not updated. This is one of the most common causes of pipeline failures after a schema change in a source system.',
            fix: 'Add schema validation at the ingestion layer to detect column changes before they reach transformations. In dbt, run dbt compile to catch missing column references before deployment. In Spark, use schema evolution policies on Delta Lake tables to handle additive changes automatically and alert on breaking changes.',
          },
          {
            error: `Snowflake: Query exceeded the maximum allowed runtime of 3600 seconds and was aborted`,
            cause: 'A transformation query is doing a full table scan on a large table without partition pruning. Often caused by: a WHERE filter on a non-clustered column forcing a full scan, a cartesian JOIN producing a massive intermediate result, or a window function without a PARTITION BY clause running across the entire table.',
            fix: 'Run EXPLAIN on the query and look for "TableScan" without partition filters. Add clustering keys to the table on the column most commonly used in WHERE and JOIN conditions. For window functions, always include PARTITION BY on a column that divides the data into manageable chunks. Consider materialising intermediate results as separate tables rather than computing everything in one query.',
          },
          {
            error: `KafkaError: OFFSET_OUT_OF_RANGE — Consumer group lag is 48 hours, offset has been compacted`,
            cause: 'A Kafka consumer (usually a streaming ingestion pipeline) fell behind by more than the topic\'s retention period. Kafka deleted old messages to free storage before the consumer could read them. The consumer\'s stored offset now points to a message that no longer exists.',
            fix: 'Immediate: reset the consumer group offset to the earliest available message and accept the data gap, or to the latest message and accept missing historical data. Long term: increase the Kafka topic retention period to accommodate acceptable consumer lag. Investigate why the consumer fell behind — was it a pipeline failure, insufficient parallelism, or a processing bottleneck?',
          },
          {
            error: `dbt: Found 2 models, 0 tests, 0 snapshots — WARNING: No tests found`,
            cause: 'This is not an error but a critical warning. dbt models were created without any tests defined in the schema.yml files. Without tests, dbt has no way to validate that the data in these models is correct. Silent data quality issues can persist undetected for weeks.',
            fix: 'Add at minimum four tests to every dbt model: unique and not_null on the primary key, accepted_values for any categorical columns with a defined set of valid values, and relationships for foreign key columns. These four tests catch 80% of common data quality issues. Make it a team rule that no model can be merged to production without at least these tests defined.',
          },
          {
            error: `Airflow TaskInstance <bronze_to_silver> marked as failed — upstream dependency <ingest_orders> timed out`,
            cause: 'A task in the DAG failed because an upstream task it depends on did not complete within the configured timeout period. The dependency chain means all downstream tasks are also marked as failed, even if they would have run correctly. This is often caused by a source system returning data slower than expected due to increased volume or database load.',
            fix: 'Increase the timeout on the ingestion task to accommodate the highest expected data volume, not the average. Add a data freshness SLA check: if ingestion takes longer than X minutes, send an alert to the on-call engineer before the downstream tasks time out. Use Airflow\'s retry mechanism with a reasonable delay so temporary slowdowns do not cause permanent failures.',
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
        'The data engineering ecosystem has ten categories. Every tool belongs to one of them: Languages, Source Systems, Ingestion, Message Brokers, Object Storage, Table Formats, Warehouses, Processing Engines, Orchestration, and Quality/Observability.',
        'Tools change every few years. Categories do not. Learn what each category solves and you can pick up any specific tool in that category within a week of focused practice.',
        'Python and SQL are non-negotiable. Everything else is a choice based on company stack. A data engineer who writes excellent SQL and clean Python can do 80% of real production work.',
        'Managed ingestion connectors (Fivetran, Airbyte) save weeks of engineering time for standard SaaS sources. Custom Python is necessary for internal databases and non-standard sources. Most teams use both.',
        'Message brokers (Kafka) decouple producers from consumers. A producer publishes events without knowing who reads them. Consumers read independently at their own pace. This decoupling is fundamental to reliable real-time data architectures.',
        'Object storage (S3, ADLS) is cheap and unlimited but slow for queries. Data warehouses (Snowflake, BigQuery) are expensive but fast for SQL. Use both: raw data in object storage, clean aggregated data in the warehouse.',
        'Table formats (Delta Lake, Iceberg, Hudi) add ACID transactions, time travel, and schema evolution to object storage. They are the foundation of the Lakehouse architecture that is replacing both pure data lakes and pure warehouses.',
        'dbt is the dominant transformation tool at most companies because most production transformations are warehouse-scale. Use Spark only when data genuinely exceeds what a warehouse can process, not because it sounds impressive.',
        'Orchestrators (Airflow) solve problems that cron jobs cannot: dependency management between tasks, automatic retries, centralised visibility, and historical backfill. Every production data platform needs an orchestrator.',
        'Match your stack to your current scale and team size, not to what FAANG uses. A two-person team does not need Kubernetes-managed Airflow, multi-cluster Kafka, and Apache Iceberg. Simplicity compounds: the simpler the stack, the faster you build, the more reliable you ship.',
      ]} />

    </LearnLayout>
  )
}