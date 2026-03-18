import type { Metadata } from 'next'
import { LearnLayout } from '@/components/content/LearnLayout'
import { Callout } from '@/components/content/Callout'
import { KeyTakeaways } from '@/components/content/KeyTakeaways'

export const metadata: Metadata = {
  title: 'What is Data Engineering? — Data Engineering | Chaduvuko',
  description:
    'The clearest explanation of data engineering you will find anywhere — the role, the lifecycle, what DEs actually do day to day, and how to break into the field.',
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
  <h4 style={{
    fontSize: 15, fontWeight: 700, color: 'var(--text)', marginBottom: 10,
  }}>{children}</h4>
)

const Para = ({ children }: { children: React.ReactNode }) => (
  <p style={{
    fontSize: 15, color: 'var(--text)', lineHeight: 1.9, marginBottom: 20,
  }}>{children}</p>
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

export default function WhatIsDataEngineeringModule() {
  return (
    <LearnLayout
      title="What is Data Engineering?"
      description="The role, the lifecycle, what DEs actually do, and how to break in."
      section="Data Engineering"
      readTime="50 min"
      updatedAt="March 2026"
    >

      {/* ── Part 01 — The Definition ─────────────────────────────────── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 01 — The Definition" />
        <SectionTitle>The One Sentence Definition — And Why Every Other One Fails</SectionTitle>

        <Para>
          Search for "what is data engineering" and you will find definitions full of jargon:
          "building scalable data infrastructure", "designing ETL pipelines", "enabling data-driven
          decision making." These definitions are not wrong. They are just useless to someone who
          does not already know what the words mean.
        </Para>

        <Para>
          Here is the definition that actually explains it:
        </Para>

        <HighlightBox>
          <div style={{
            fontSize: 18, fontWeight: 800, color: 'var(--text)',
            lineHeight: 1.6, fontFamily: 'var(--font-display)',
            letterSpacing: '-0.5px',
          }}>
            A data engineer builds and maintains the systems that move data from where it is created
            to where it needs to be used — reliably, at scale, and automatically.
          </div>
        </HighlightBox>

        <Para>
          Let us break that down word by word, because every word is doing work.
        </Para>

        <Para>
          <strong>"Builds and maintains"</strong> — this is an engineering job. You write code,
          design systems, and then keep those systems running. You are not just clicking buttons
          in a dashboard. You are responsible for what you build even after it is deployed.
          When it breaks at 3am, it is your pipeline.
        </Para>

        <Para>
          <strong>"Systems that move data"</strong> — data does not move by itself. A Swiggy order
          placed on a phone needs to travel to a database, then to a data lake, then to a warehouse,
          then to a dashboard — each step is a system that someone built. Without those systems,
          the order exists in one database and nowhere else, making it impossible to analyse.
        </Para>

        <Para>
          <strong>"From where it is created to where it needs to be used"</strong> — data is created
          in operational systems (apps, sensors, APIs). It needs to be used in analytical systems
          (dashboards, ML models, reports). These two types of systems are architecturally different
          and cannot share the same database. The data engineer bridges the gap.
        </Para>

        <Para>
          <strong>"Reliably, at scale, and automatically"</strong> — these three words are what
          separate data engineering from just writing a one-time script. Reliably means the system
          handles failures gracefully and the output can be trusted. At scale means it works when
          data volume is 100× what it was at launch. Automatically means humans do not have to
          trigger it — it runs on a schedule or in response to events, without anyone pressing a button.
        </Para>
      </section>

      <Divider />

      {/* ── Part 02 — The Data Engineering Lifecycle ─────────────────── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 02 — The Full Lifecycle" />
        <SectionTitle>The Data Engineering Lifecycle — End to End</SectionTitle>

        <Para>
          Every data engineering project, regardless of company size, tools used, or industry,
          follows the same fundamental lifecycle. Understanding this lifecycle means you can
          look at any data problem and immediately know what phase it belongs to, what tools
          are relevant, and what success looks like.
        </Para>

        <Para>
          There are six phases. They are sequential in the sense that each one depends on the
          previous — but in practice you iterate through them continuously as requirements change.
        </Para>

        {[
          {
            num: '01',
            color: '#00e676',
            phase: 'Generation',
            subtitle: 'Data is born',
            desc: `Data starts its life in source systems — the operational applications that run the business. A user places an order: the order management system writes a record to a PostgreSQL database. A payment is processed: the payment system writes to its own MySQL database. A delivery agent moves: their phone sends a GPS coordinate to a Kafka stream. A customer clicks a button: the web analytics system logs the event.

Data engineers do not usually build these source systems — that is the job of software engineers. But data engineers must deeply understand them: their schema, their update frequency, their volume, their reliability, and their quirks. Because everything downstream depends on the source.`,
            what: 'Understand source systems, their schemas, volume, and update patterns.',
          },
          {
            num: '02',
            color: '#7b61ff',
            phase: 'Ingestion',
            subtitle: 'Data is moved into the data platform',
            desc: `Ingestion is the process of pulling data from source systems and bringing it into the data platform — the centralised storage infrastructure the data team controls. This is often the first thing a data engineer builds when joining a company.

Ingestion can be batch (pull data from the source every hour, or every day) or streaming (capture events as they happen, in near real-time). The choice depends on how fresh the data needs to be for its downstream use cases. Ingestion must be reliable — if the source is unavailable, the pipeline must retry and catch up. It must be incremental — at scale, pulling the entire source database every day is too slow and too expensive.`,
            what: 'Build connectors that reliably extract data from sources into the platform.',
          },
          {
            num: '03',
            color: '#f97316',
            phase: 'Storage',
            subtitle: 'Data is persisted in the right place',
            desc: `Raw ingested data must be stored somewhere before it can be processed. The choice of storage system depends on what the data will be used for, how large it is, how it will be queried, and what the cost constraints are.

At most modern companies, raw data lands in a data lake — a large, cheap object store like Amazon S3, Azure Data Lake Storage, or Google Cloud Storage. The data lake accepts everything, in its original format, without enforcing any schema. It is the permanent archive. From the lake, processed and structured data is loaded into a data warehouse — a system optimised for fast analytical queries using SQL.`,
            what: 'Decide where data lives at each stage and maintain those storage systems.',
          },
          {
            num: '04',
            color: '#facc15',
            phase: 'Transformation',
            subtitle: 'Data is cleaned, enriched, and reshaped',
            desc: `Raw ingested data is almost never directly usable for analysis. It needs to be cleaned (remove duplicates, fill nulls, fix encoding issues), standardised (unify date formats, currency units, category names), enriched (join with reference data, derive new fields), and aggregated (compute daily totals, rolling averages, cohort metrics).

Transformation is where the most complex business logic lives, and where most data quality issues are caught — or introduced, if the transformations are not carefully tested. This phase is where tools like dbt (data build tool) operate: writing transformation logic in SQL, version-controlled and tested like software code.`,
            what: 'Write and maintain transformation logic that turns raw data into trusted, analysis-ready data.',
          },
          {
            num: '05',
            color: '#4285f4',
            phase: 'Serving',
            subtitle: 'Data is made available to consumers',
            desc: `Transformed data needs to be made available to the people and systems that need it: business analysts running SQL queries, dashboards refreshing in Power BI or Tableau, data scientists training models in Python notebooks, and machine learning systems running inference in production.

Serving is not just about having data in a warehouse. It is about making sure the right people have access to the right data at the right granularity, with the right freshness, at the right cost. A dashboard that queries a poorly designed warehouse table and takes 4 minutes to load is not serving data — it is frustrating its users into ignoring it.`,
            what: 'Ensure data is accessible, performant, and trustworthy for every downstream consumer.',
          },
          {
            num: '06',
            color: '#ff4757',
            phase: 'Orchestration & Operations',
            subtitle: 'Everything runs automatically and stays healthy',
            desc: `A data pipeline is not a one-time script. It runs on a schedule — every hour, every day, after every upstream event. An orchestrator (a scheduler with dependency management) ensures that each step runs in the right order, handles failures by retrying or alerting, and provides visibility into what ran, when, and whether it succeeded.

Operations also means monitoring: tracking pipeline run times, data freshness, row counts, and quality metrics. When something breaks — and it always eventually breaks — the data engineer is the one who investigates, fixes, and prevents recurrence. This ongoing responsibility is what the word "maintains" in the definition refers to.`,
            what: 'Automate pipelines end-to-end, monitor their health, and fix failures.',
          },
        ].map((item) => (
          <div key={item.num} style={{
            display: 'flex', gap: 20, marginBottom: 28,
            alignItems: 'flex-start',
          }}>
            {/* Number + line */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flexShrink: 0 }}>
              <div style={{
                width: 40, height: 40, borderRadius: '50%',
                background: `${item.color}18`, border: `2px solid ${item.color}`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 13, fontWeight: 900, color: item.color,
                fontFamily: 'var(--font-mono)',
              }}>
                {item.num}
              </div>
              <div style={{
                width: 2, flexGrow: 1, minHeight: 24,
                background: 'var(--border)', marginTop: 6,
              }} />
            </div>
            {/* Content */}
            <div style={{ flex: 1, paddingBottom: 8 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 4 }}>
                <span style={{
                  fontSize: 16, fontWeight: 800, color: 'var(--text)',
                  fontFamily: 'var(--font-display)', letterSpacing: '-0.3px',
                }}>
                  {item.phase}
                </span>
                <span style={{
                  fontSize: 11, fontWeight: 700, color: item.color,
                  fontFamily: 'var(--font-mono)', letterSpacing: '.08em',
                }}>
                  — {item.subtitle}
                </span>
              </div>
              <div style={{
                fontSize: 14, color: 'var(--muted)', lineHeight: 1.85,
                marginBottom: 10, whiteSpace: 'pre-line',
              }}>
                {item.desc}
              </div>
              <div style={{
                fontSize: 12, fontWeight: 700, color: item.color,
                fontFamily: 'var(--font-mono)', letterSpacing: '.06em',
                background: `${item.color}10`, border: `1px solid ${item.color}30`,
                borderRadius: 6, padding: '4px 10px', display: 'inline-block',
              }}>
                DE task: {item.what}
              </div>
            </div>
          </div>
        ))}

        <Callout type="info">
          <strong>The lifecycle is circular, not linear.</strong> A new data source is added — you
          go back to Generation and Ingestion. A new business question requires new metrics —
          you revisit Transformation. A downstream ML team needs lower latency — you redesign
          Serving. A data engineer is always somewhere in this cycle on multiple projects simultaneously.
        </Callout>
      </section>

      <Divider />

      {/* ── Part 03 — What a DE Actually Does ───────────────────────── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 03 — The Actual Job" />
        <SectionTitle>What a Data Engineer Actually Does — The Real Task List</SectionTitle>

        <Para>
          Job postings describe data engineering in terms of technologies: "5 years Spark, Kafka,
          Airflow, dbt." That tells you what tools are used, not what work is done. Here is what
          the work actually looks like, described as tasks you will genuinely be asked to do.
        </Para>

        <SubTitle>Building and maintaining data pipelines</SubTitle>
        <Para>
          This is the core of the job. You write code — mostly Python and SQL — that extracts
          data from a source, transforms it, and loads it into a destination. You schedule that
          code to run automatically. You add monitoring so you know when it fails. You add
          retries so temporary failures do not require human intervention. You add data quality
          checks so bad data does not silently corrupt downstream reports. Then you maintain that
          pipeline as the source schema changes, as data volume grows, and as business requirements
          evolve. On any given team, a data engineer owns between 5 and 50 pipelines.
        </Para>

        <SubTitle>Designing data models</SubTitle>
        <Para>
          When data arrives in your warehouse, how should it be organised? What tables should
          exist? What should each table contain? What should the primary keys be? How should
          tables join? How should historical changes be tracked? These are data modelling
          decisions, and they determine whether analysts can answer questions quickly and
          correctly, or spend hours writing complicated SQL to work around a poorly designed
          schema. Data engineers design and build these models, often in collaboration with
          analysts and data scientists.
        </Para>

        <SubTitle>Integrating new data sources</SubTitle>
        <Para>
          A new vendor sends a daily FTP file. The marketing team wants Salesforce data in
          the warehouse. The product team launches a new feature and its events need to be
          captured. Integrating a new data source means: understanding its format and schema,
          writing the ingestion code, handling its quirks and failures, transforming it to
          fit the existing data model, and documenting it for the team. At a growing company,
          a data engineer integrates several new sources every month.
        </Para>

        <SubTitle>Debugging data quality issues</SubTitle>
        <Para>
          An analyst reports that daily revenue numbers in the dashboard do not match the
          numbers from the finance team's report. The two numbers should be the same. They
          are not. Finding the discrepancy requires tracing data from the dashboard back
          through the warehouse, back through the pipeline, back to the source — identifying
          exactly where the numbers diverge and why. This kind of investigation is unglamorous
          but constant. It requires deep knowledge of every transformation the data has undergone
          and the patience to eliminate possibilities one by one.
        </Para>

        <SubTitle>Performance tuning</SubTitle>
        <Para>
          A pipeline that processed 1 GB of data in 10 minutes a year ago now processes
          50 GB and takes 8 hours. The dashboard that loaded in 3 seconds now takes 45 seconds.
          Performance degrades as data grows, and data engineers are responsible for finding
          and fixing the bottlenecks — repartitioning data, adding indexes, rewriting queries,
          compacting small files, upgrading cluster sizes, or redesigning the storage layout.
        </Para>

        <SubTitle>Collaborating with stakeholders</SubTitle>
        <Para>
          Data engineering exists to serve people who use data. That means constant collaboration
          with data analysts (who need reliable, fast data models), data scientists (who need
          clean feature data for training models), product managers (who need metrics to evaluate
          features), and business teams (who need dashboards to make decisions). A data engineer
          who only codes and never talks to stakeholders builds systems that do not actually
          meet the business's needs.
        </Para>

        <CodeBox label="A real week's task list for a mid-level DE at a Bangalore startup">{`Monday
  → Debug: revenue pipeline produced NULL for 3 stores yesterday
  → Root cause: source DB schema change added a new required field
  → Fix: update ingestion query, backfill yesterday's data
  → Deploy fix, verify output matches finance team's numbers

Tuesday
  → New task: integrate Salesforce leads data into warehouse
  → Connect to Salesforce API, understand pagination and rate limits
  → Write ingestion script, schedule daily run
  → Design staging table, write transformation to match CRM schema

Wednesday
  → Performance: morning refresh takes 4 hours, SLA is 2 hours
  → Profile: bottleneck is a single large table scan in dbt model
  → Fix: add partition filter, rewrite join order
  → Result: runtime drops to 45 minutes

Thursday
  → Schema review with analytics team for new product dashboard
  → Design fact table for funnel events
  → Review PR from junior DE — two issues with NULL handling
  → Write documentation for new Salesforce pipeline

Friday
  → On-call: pipeline alert fires at 7am — source API returned 503
  → Pipeline retried automatically 3 times, then dead-lettered
  → Confirm source recovered, trigger manual backfill
  → Post incident summary in Slack`}</CodeBox>
      </section>

      <Divider />

      {/* ── Part 04 — The Tool Landscape ────────────────────────────── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 04 — The Tool Landscape" />
        <SectionTitle>The Tools — A Map, Not a Tutorial</SectionTitle>

        <Para>
          Data engineering has hundreds of tools. This is one of the most overwhelming parts
          for beginners — job postings list 15 technologies and it feels impossible to learn
          them all. Here is the key insight: <strong>tools change, categories do not.</strong>
          Learn what each category of tool is for, and you can pick up any specific tool in
          that category in a week.
        </Para>

        <Callout type="info">
          <strong>This section is a map, not a tutorial.</strong> Each category below gets its
          own dedicated track on Chaduvuko. Here we are establishing mental anchors — what
          category exists, what problem it solves, and which tools belong in it. Do not try
          to learn any of these deeply right now. Just know where they sit.
        </Callout>

        {[
          {
            category: 'Programming Languages',
            color: '#00e676',
            problem: 'Writing the actual logic of pipelines',
            tools: ['Python (primary)', 'SQL (essential)', 'Scala (Spark jobs)', 'Bash (automation)'],
            note: 'Python and SQL are non-negotiable. Everything else is optional depending on the company.',
          },
          {
            category: 'Ingestion Tools',
            color: '#7b61ff',
            problem: 'Connecting to sources and moving data into the platform',
            tools: ['Azure Data Factory', 'AWS Glue', 'Fivetran', 'Airbyte', 'Kafka Connect', 'Custom Python scripts'],
            note: 'Many companies use a mix: managed connectors for standard sources, custom code for bespoke ones.',
          },
          {
            category: 'Storage — Data Lakes',
            color: '#f97316',
            problem: 'Storing raw and processed data at low cost, at any scale',
            tools: ['Amazon S3', 'Azure Data Lake Storage Gen2', 'Google Cloud Storage'],
            note: 'All three are object stores. The differences are in ecosystem integration, not fundamental design.',
          },
          {
            category: 'Storage — Data Warehouses',
            color: '#facc15',
            problem: 'Fast analytical queries using SQL over large datasets',
            tools: ['Snowflake', 'Google BigQuery', 'Amazon Redshift', 'Azure Synapse Analytics'],
            note: 'Columnar storage, distributed query execution. Optimised for SELECT, not for high-volume INSERT.',
          },
          {
            category: 'Processing Engines',
            color: '#4285f4',
            problem: 'Transforming large datasets that do not fit on one machine',
            tools: ['Apache Spark', 'Apache Flink', 'dbt (SQL transformations)', 'Pandas (small data)'],
            note: 'Spark is the industry standard for large-scale batch processing. dbt is dominant for SQL-based transformation.',
          },
          {
            category: 'Orchestration',
            color: '#ff4757',
            problem: 'Scheduling, sequencing, and monitoring pipeline runs',
            tools: ['Apache Airflow', 'Prefect', 'Dagster', 'AWS Step Functions', 'Azure Data Factory (also orchestrates)'],
            note: 'Airflow is the most widely deployed. All orchestrators express pipelines as DAGs — directed acyclic graphs.',
          },
          {
            category: 'Streaming',
            color: '#00e676',
            problem: 'Processing data as it is generated, in real-time or near real-time',
            tools: ['Apache Kafka', 'AWS Kinesis', 'Azure Event Hubs', 'Google Pub/Sub', 'Apache Flink'],
            note: 'Kafka is the dominant message broker. Flink is the dominant stream processing engine.',
          },
          {
            category: 'Data Quality & Observability',
            color: '#7b61ff',
            problem: 'Validating that data is correct, fresh, and complete',
            tools: ['Great Expectations', 'dbt tests', 'Monte Carlo', 'Soda', 'Custom SQL assertions'],
            note: 'This category is growing rapidly. Most mature teams have a dedicated data quality layer.',
          },
        ].map((item) => (
          <div key={item.category} style={{
            background: 'var(--surface)', border: '1px solid var(--border)',
            borderRadius: 12, padding: '20px 24px', marginBottom: 14,
          }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: 16, flexWrap: 'wrap' }}>
              <div style={{ flex: 1, minWidth: 200 }}>
                <div style={{
                  fontSize: 11, fontWeight: 700, color: item.color,
                  fontFamily: 'var(--font-mono)', letterSpacing: '.1em',
                  textTransform: 'uppercase', marginBottom: 4,
                }}>
                  {item.category}
                </div>
                <div style={{ fontSize: 13, color: 'var(--muted)', marginBottom: 10, lineHeight: 1.5 }}>
                  <strong style={{ color: 'var(--text)' }}>Solves:</strong> {item.problem}
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 8 }}>
                  {item.tools.map((t) => (
                    <span key={t} style={{
                      fontSize: 11, color: 'var(--muted)',
                      background: 'var(--bg2)', border: '1px solid var(--border)',
                      borderRadius: 20, padding: '2px 10px',
                      fontFamily: 'var(--font-mono)',
                    }}>{t}</span>
                  ))}
                </div>
                <div style={{ fontSize: 12, color: 'var(--muted)', lineHeight: 1.6, fontStyle: 'italic' }}>
                  {item.note}
                </div>
              </div>
            </div>
          </div>
        ))}
      </section>

      <Divider />

      {/* ── Part 05 — DE vs Other Roles ─────────────────────────────── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 05 — Role Boundaries" />
        <SectionTitle>Data Engineer vs Data Analyst vs Data Scientist vs ML Engineer</SectionTitle>

        <Para>
          These four roles are constantly confused — even by hiring managers. The confusion
          happens because there is overlap at the edges, and because at small companies one
          person sometimes does parts of all four. But the core responsibilities are distinct,
          and knowing the boundaries will help you target the right jobs and have honest
          conversations about your career.
        </Para>

        <HighlightBox>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 20 }}>
            {[
              {
                role: 'Data Engineer',
                color: '#00e676',
                owns: 'The pipelines and the platform',
                question: 'Is the data getting where it needs to go, reliably?',
                daily: 'Python, SQL, pipeline code, infra, debugging, data modelling',
                analogy: 'The plumber who builds and maintains the pipes.',
              },
              {
                role: 'Data Analyst',
                color: '#7b61ff',
                owns: 'The analysis and the reports',
                question: 'What does the data tell us about the business?',
                daily: 'SQL, Excel, Tableau/Power BI, stakeholder presentations',
                analogy: 'The person who turns on the tap and analyses what comes out.',
              },
              {
                role: 'Data Scientist',
                color: '#f97316',
                owns: 'The models and the predictions',
                question: 'What will likely happen, and what factors drive it?',
                daily: 'Python (scikit-learn, pandas), statistics, model training, experimentation',
                analogy: 'The scientist who studies the properties of the water.',
              },
              {
                role: 'ML Engineer',
                color: '#4285f4',
                owns: 'The production ML systems',
                question: 'How do we serve model predictions reliably at scale?',
                daily: 'Python, model serving, MLOps, APIs, monitoring, feature stores',
                analogy: 'The engineer who builds the factory that produces filtered water at scale.',
              },
            ].map((item) => (
              <div key={item.role}>
                <div style={{
                  fontSize: 13, fontWeight: 800, color: item.color,
                  marginBottom: 10, fontFamily: 'var(--font-display)',
                }}>
                  {item.role}
                </div>
                <div style={{ fontSize: 12, color: 'var(--muted)', lineHeight: 1.7, marginBottom: 6 }}>
                  <strong style={{ color: 'var(--text)' }}>Owns:</strong> {item.owns}
                </div>
                <div style={{ fontSize: 12, color: 'var(--muted)', lineHeight: 1.7, marginBottom: 6 }}>
                  <strong style={{ color: 'var(--text)' }}>Core question:</strong> {item.question}
                </div>
                <div style={{ fontSize: 12, color: 'var(--muted)', lineHeight: 1.7, marginBottom: 6 }}>
                  <strong style={{ color: 'var(--text)' }}>Daily tools:</strong> {item.daily}
                </div>
                <div style={{
                  fontSize: 12, color: item.color, lineHeight: 1.6,
                  fontStyle: 'italic', borderLeft: `2px solid ${item.color}`,
                  paddingLeft: 10, marginTop: 8,
                }}>
                  {item.analogy}
                </div>
              </div>
            ))}
          </div>
        </HighlightBox>

        <SubTitle>The critical dependency chain</SubTitle>

        <Para>
          These roles are not independent — they form a dependency chain. Data scientists and
          analysts cannot do their work if the data engineer has not built reliable pipelines
          to bring them clean data. ML engineers cannot deploy models if data scientists have
          not trained them. And data scientists cannot train good models if the data engineer
          has not built a feature store or ensured data quality.
        </Para>

        <Para>
          This means data engineering is the foundation. When data engineering is done poorly,
          every role downstream suffers. When an analyst says "I don't trust this data," or a
          data scientist says "I spent 80% of my time cleaning data," it is almost always a
          data engineering problem.
        </Para>

        <CodeBox label="The dependency chain — each role depends on the one above">{`Raw data in source systems
         │
         ▼
  ┌─────────────────────────────────────────┐
  │         DATA ENGINEER                   │
  │  Builds pipelines, models data,         │
  │  ensures quality and reliability        │
  └────────────────┬────────────────────────┘
                   │ clean, trusted, structured data
         ┌─────────┴──────────┐
         ▼                    ▼
  DATA ANALYST          DATA SCIENTIST
  SQL queries           Python notebooks
  Dashboards            Model training
  Business reports      Experiments
         │                    │
         ▼                    ▼
  Business decisions    ML ENGINEER
                        Model deployment
                        Real-time serving
                        Production monitoring`}</CodeBox>
      </section>

      <Divider />

      {/* ── Part 06 — A Day in the Life ─────────────────────────────── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 06 — A Day in the Life" />
        <SectionTitle>A Day in the Life — Junior DE at a Bangalore Startup</SectionTitle>

        <Para>
          This is what the first year of a data engineering job actually looks like. Not the
          glamorised version. The real one. Based on what data engineers at Indian startups
          actually report their days looking like in 2026.
        </Para>

        {[
          {
            time: '8:30 AM',
            title: 'Check overnight pipeline runs',
            desc: `Before opening email or Slack, you check the orchestration dashboard. Three pipelines ran overnight. Two succeeded. One failed — the daily sales aggregation from the South region stores. The error log says: connection timed out at step 3 of 7. You look at the source database — it was briefly unavailable at 2:14 AM during a maintenance window nobody told you about. The data is fine; the pipeline just needs to be re-run. You trigger a manual backfill for yesterday and move on.`,
          },
          {
            time: '9:15 AM',
            title: 'Standup with the data team',
            desc: `15 minutes. You share: pipeline failure was investigated and resolved, backfill running. The analyst on the team says the customer cohort report is showing unexpected numbers for last week's new user cohort. You take a note to investigate after standup. The data scientist asks if the feature pipeline for the new recommendation model will be ready by Thursday. You confirm it will.`,
          },
          {
            time: '9:30 AM — 12:00 PM',
            title: 'Investigate cohort report discrepancy',
            desc: `The analyst's numbers and your warehouse numbers diverge by about 12% for last week's new user cohort. You start at the dashboard and trace backwards. The dashboard query is correct. The warehouse table it reads from has the right row count. You check the transformation that builds that table — it joins user signups with device_type. You run the join manually and notice: the device_type table has duplicate rows for 8% of user IDs due to a schema change in the mobile app last week. The duplicate join is inflating the cohort. You fix the transformation, add a deduplication step, rebuild the affected partition, and document the root cause. Two and a half hours. This kind of detective work is a significant part of the job.`,
          },
          {
            time: '12:00 PM — 1:00 PM',
            title: 'Lunch break',
            desc: `Take it. Seriously. Data engineering work is mentally intensive. The habit of eating at your desk and working through lunch is common in the industry and leads directly to burnout.`,
          },
          {
            time: '1:00 PM — 3:30 PM',
            title: 'Build new data source integration',
            desc: `The business development team signed a new vendor last week. The vendor sends a daily CSV file via SFTP with store-level inventory data. You need to ingest it, transform it to match the existing inventory schema, and make it available in the warehouse by 8 AM each morning. You write the ingestion script in Python, test it against three days of historical files the vendor provided, handle two edge cases you find (some files use semicolons instead of commas, one date column has mixed formats), write the transformation in dbt, and schedule the pipeline in Airflow. Basic integration: 2.5 hours of focused work.`,
          },
          {
            time: '3:30 PM — 4:30 PM',
            title: 'Code review and documentation',
            desc: `A junior data engineer on the team submitted a PR for a new pipeline yesterday. You review it: the logic is correct but the error handling is missing, and there are no data quality checks. You leave detailed comments explaining both issues with examples. You also write documentation for the vendor pipeline you just built — what it does, where the source data comes from, what transformations are applied, what to do if it fails. Documentation nobody writes today becomes the debugging nightmare everyone fights with in six months.`,
          },
          {
            time: '4:30 PM — 5:30 PM',
            title: 'Feature pipeline for ML team',
            desc: `You work on the feature pipeline the data scientist asked about. It needs to produce a daily snapshot of each user's last 30 days of activity, aggregated into features the model expects. You write the SQL transformation, test it on a sample, and verify the output schema matches what the model training code expects. You commit and push. The data scientist will pick it up tomorrow.`,
          },
        ].map((item, i) => (
          <div key={i} style={{
            display: 'flex', gap: 20, marginBottom: 4,
            alignItems: 'flex-start',
          }}>
            <div style={{ flexShrink: 0, width: 90, paddingTop: 20 }}>
              <div style={{
                fontSize: 11, fontWeight: 700, color: 'var(--accent)',
                fontFamily: 'var(--font-mono)', letterSpacing: '.06em',
                lineHeight: 1.4,
              }}>
                {item.time}
              </div>
            </div>
            <div style={{
              flex: 1,
              background: 'var(--surface)', border: '1px solid var(--border)',
              borderRadius: 10, padding: '16px 20px', marginBottom: 8,
            }}>
              <div style={{
                fontSize: 14, fontWeight: 700, color: 'var(--text)',
                marginBottom: 8, fontFamily: 'var(--font-display)',
              }}>
                {item.title}
              </div>
              <div style={{ fontSize: 13, color: 'var(--muted)', lineHeight: 1.8 }}>
                {item.desc}
              </div>
            </div>
          </div>
        ))}

        <Callout type="tip">
          <strong>What this day reveals:</strong> A data engineer spends roughly 40% of their
          time maintaining and debugging existing pipelines, 40% building new ones, and 20%
          collaborating and reviewing. The debugging percentage surprises most beginners. Build
          systems that are easy to debug — good logging, clear error messages, data quality
          checks — and your debugging time drops significantly.
        </Callout>
      </section>

      <Divider />

      {/* ── Part 07 — Career and Salary ─────────────────────────────── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 07 — Career Growth and Salaries" />
        <SectionTitle>The Data Engineering Career Path in India (2026)</SectionTitle>

        <Para>
          Data engineering is one of the highest-paying technology disciplines in India right
          now. The demand for data engineers significantly outstrips supply — particularly for
          engineers who understand both the engineering and the data sides of the role. Here
          is the honest picture of what the career looks like.
        </Para>

        <CodeBox label="DE career levels — India 2026 (Bangalore, Product Company)">{`Level              Experience     Salary Range          What Changes
───────────────────────────────────────────────────────────────────────
Junior DE          0–2 years      ₹6–12 LPA             Learning tools,
                                                         building under guidance

Data Engineer      2–4 years      ₹12–22 LPA            Owns pipelines end-to-end,
                                                         handles production incidents

Senior DE          4–7 years      ₹22–40 LPA            Designs systems,
                                                         mentors juniors,
                                                         cross-team influence

Staff DE /         7–10 years     ₹40–70 LPA            Technical strategy,
Lead DE                                                   architectural decisions,
                                                         org-wide standards

Principal /        10+ years      ₹70–120+ LPA          Company-level data platform
Staff+                                                    vision, external influence

Notes:
  Bangalore multiplier: 1.3× base
  FAANG India multiplier: ~2× product company rates
  GCC (Global Capability Centre): 1.4× product company rates
  Service companies (TCS/Infosys): 0.72× product company rates`}</CodeBox>

        <SubTitle>What actually drives salary growth</SubTitle>

        <Para>
          Title and years of experience matter less than you think. The biggest salary jumps
          in data engineering come from three things: demonstrated ability to own a system
          end-to-end and keep it running in production; experience with scale — having worked
          with data volumes that required distributed systems, not just single-machine scripts;
          and the ability to translate business problems into data architecture decisions, not
          just implement what you are told to build.
        </Para>

        <SubTitle>Breaking in from a non-IT background</SubTitle>

        <Para>
          Data engineering is one of the most accessible senior technology disciplines for
          non-IT background candidates — more accessible than software engineering, and far
          more accessible than ML engineering. Here is why: the core of the job is logical
          thinking and understanding data, not algorithm knowledge or computer science theory.
        </Para>

        <Para>
          The realistic path for a non-IT background candidate in 2026: learn Python and SQL
          (both covered in this track), build 3–4 real pipeline projects on Azure or AWS
          free tiers, put those projects on GitHub, and get the DP-203 Azure Data Engineer
          certification or AWS Data Analytics certification. With this portfolio, you can
          realistically target junior DE roles at service companies or small startups within
          6–9 months of consistent work — and move to product companies within 2 years.
        </Para>

        <Callout type="tip">
          <strong>The most underrated advantage of non-IT backgrounds in data engineering:</strong>{' '}
          Many of the best data engineers come from finance, operations, supply chain, or
          healthcare — domains where they understand what the data means and why it matters.
          A DE who both builds the pipeline and understands the business context of the data
          is significantly more valuable than one who only knows the tools. Your domain knowledge
          is a competitive advantage, not a liability.
        </Callout>
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
        <SectionTitle>The First Task a New DE Gets at a Product Startup</SectionTitle>

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
            Scenario — D2C E-commerce Startup, Hyderabad · Week 1
          </div>

          <Para>
            You join a direct-to-consumer fashion startup as their second data engineer.
            They have 400,000 customers, ₹80 crore in annual GMV, and a data team of one
            analyst who currently does everything manually.
          </Para>

          <Para>
            Your first task, given to you in the second week by your manager: "The growth
            team wants a daily dashboard showing our repeat purchase rate, broken down by
            acquisition channel and first-purchase category. They need it by next Friday.
            The data is in the production Shopify database and in Google Analytics."
          </Para>

          <SubSubTitle>What this task requires — mapped to the lifecycle</SubSubTitle>

          <Para>
            <strong>Generation:</strong> You investigate the sources. Shopify has an API.
            Google Analytics has its own API. Both have rate limits and require authentication.
            The Shopify order data goes back 3 years. Google Analytics data has a 90-day
            lookback limit on the free API.
          </Para>

          <Para>
            <strong>Ingestion:</strong> You write Python scripts to pull historical Shopify
            orders and daily Google Analytics acquisition data. You store raw JSON responses
            in the company's S3 bucket — creating the first data lake this company has ever had.
          </Para>

          <Para>
            <strong>Storage:</strong> You set up a Snowflake account (they have a free trial),
            create a raw schema, and load the extracted data. Now the data is queryable via SQL.
          </Para>

          <Para>
            <strong>Transformation:</strong> You write SQL to: join Google Analytics sessions
            to Shopify orders via UTM parameters, identify each customer's first-purchase
            category, calculate repeat purchases within 30/60/90 days, and aggregate by
            acquisition channel and category.
          </Para>

          <Para>
            <strong>Serving:</strong> You connect Metabase (a free BI tool) to Snowflake.
            The analyst builds the dashboard on top of your data model in an afternoon.
          </Para>

          <Para>
            <strong>Orchestration:</strong> You write a simple Airflow DAG that runs the
            Shopify and Google Analytics ingestion every morning at 5 AM, runs the dbt
            transformations at 5:30 AM, and sends a Slack alert if anything fails. The
            dashboard is always fresh when the growth team arrives at 9 AM.
          </Para>

          <Para>
            Total time: 4 days. What you just built in 4 days replaced a process that was
            taking the analyst 6 hours every Monday morning. This is the value of data
            engineering made concrete.
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
            q: 'Q1. How would you explain what a data engineer does to someone who has never worked in tech?',
            a: `I would use this analogy: imagine a city's water supply. Water starts in reservoirs, rivers, and underground sources — those are the source systems, the applications generating data. Someone needs to build the network of pipes, pumps, and treatment facilities that take raw water from those sources, clean and purify it, and deliver it safely to every home and business. Those are the data pipelines. The people who build and maintain that infrastructure are data engineers.

The water analogy works because it captures the key aspects: the raw material exists at the source, it needs to be transported, it needs to be cleaned, and the infrastructure must work reliably 24/7 because people depend on it. When the pipes break, people immediately feel the impact. When a data pipeline breaks, analysts cannot do their jobs and business decisions get made on stale or missing data.

Data engineering is infrastructure engineering — but the infrastructure moves data instead of water, electricity, or packages.`,
          },
          {
            q: 'Q2. What is the difference between a data engineer and a software engineer?',
            a: `Both roles write code and build systems, but they optimise for different outcomes. Software engineers build products — applications that end users interact with. They optimise for correctness, reliability, and user experience in operational systems. Data engineers build platforms — infrastructure that data consumers (analysts, scientists, business teams) use. They optimise for correctness, reliability, and queryability of data at scale.

The practical differences show up in several ways. Software engineers primarily work with row-based operational databases optimised for fast individual record access. Data engineers work with columnar analytical databases and distributed file systems optimised for scanning millions of rows. Software engineers think in terms of request latency and concurrent users. Data engineers think in terms of pipeline throughput, data freshness SLAs, and query performance at terabyte scale.

The skills overlap significantly — a data engineer must write clean, testable, maintainable code like any software engineer. But the problems they solve and the systems they build for are fundamentally different. At large companies the roles are distinct. At small startups, one person often does both.`,
          },
          {
            q: 'Q3. Why is data engineering considered a bottleneck at many companies?',
            a: `Data engineering is a bottleneck for a structural reason: almost every other data-related activity depends on it. Analysts cannot query data that has not been ingested. Data scientists cannot train models on data that has not been cleaned and structured. Product managers cannot measure feature performance without the metrics pipeline that tracks it. All of these downstream consumers are blocked when the data engineer is the only person who can build the infrastructure they need.

The bottleneck is worsened by two factors. First, data engineering work is invisible when it works and immediately visible when it fails — this creates pressure to constantly fix and maintain existing systems rather than build new ones, which means the backlog of new data requests grows faster than it can be served. Second, data requirements grow non-linearly with company growth: as a company adds products, markets, and data sources, the number of integrations required grows multiplicatively, not linearly.

The solution organisations use is a combination of: investing in self-service tooling so analysts can do more without engineering help; using managed ingestion platforms for standard sources; and maintaining a clear prioritisation process for engineering requests so the most valuable work is always at the top of the queue.`,
          },
          {
            q: 'Q4. What does "reliable" mean in the context of a data pipeline?',
            a: `Reliability in a data pipeline has four dimensions: it completes successfully, it produces correct output, it completes within the required time window, and it recovers gracefully when things go wrong.

Completing successfully means the pipeline handles transient failures — a source database being briefly unavailable, a network timeout, a temporary API rate limit — without requiring human intervention. This requires retry logic with exponential backoff, dead letter queuing for data that cannot be processed after multiple retries, and alerting when pipelines exceed their retry budget.

Producing correct output means the data in the destination matches the data in the source, with all transformations applied correctly. This requires data quality checks: row count validation, null checks, range checks, and cross-system reconciliation against known totals.

Completing within the required time window means the pipeline respects its SLA — if the business needs yesterday's data available by 8 AM, the pipeline must finish by then under normal conditions and have enough slack to still meet SLA when volume is 2× normal.

Recovering gracefully means that when a failure does occur, the pipeline can be re-run from a checkpoint rather than from scratch, and the rerun produces identical output to what a successful first run would have produced — this property is called idempotency.

A pipeline that occasionally fails and requires manual intervention is not reliable, regardless of how often it succeeds. Production-grade reliability means the system manages its own failures.`,
          },
          {
            q: 'Q5. A company is growing fast and data volume is doubling every 6 months. The current pipelines are struggling. As the data engineer, what is your approach?',
            a: `I would approach this as a diagnosis before prescribing solutions, because "pipelines are struggling" can mean many different things with very different fixes.

First, I would profile the existing pipelines to identify where time is being spent. The bottleneck is usually one of: reading from the source (I/O bound — solution: read incremental data only, not full table scans), processing (CPU bound — solution: increase parallelism or move to a distributed compute engine like Spark), writing to the destination (write contention — solution: bulk loading instead of row-by-row inserts), or waiting for dependencies (orchestration bound — solution: parallelize independent pipeline steps).

Second, I would look at data storage patterns. Fast-growing data volumes are often accompanied by small file proliferation — thousands of tiny files that each require a separate I/O operation to read. Compacting small files into larger ones can improve read performance by 10× with no other changes.

Third, I would evaluate whether the transformation logic has grown inefficiently over time. Pipelines often start simple and accumulate complexity through incremental changes. A pipeline that now runs a full table scan to apply a transformation that could be applied to only the new records is doing unnecessary work.

Fourth, for genuine scale-out needs — where the data simply exceeds what one machine can process — I would evaluate moving to distributed processing. This is a significant engineering investment and should only happen after the simpler optimisations have been exhausted.

Throughout this, I would communicate the timeline and trade-offs clearly to the business: quick wins first, architectural changes with longer lead times planned and scheduled.`,
          },
        ].map((item, i) => (
          <div key={i} style={{
            background: 'var(--surface)', border: '1px solid var(--border)',
            borderRadius: 12, padding: '24px 28px', marginBottom: 20,
          }}>
            <div style={{
              fontSize: 14, fontWeight: 800, color: 'var(--text)',
              marginBottom: 14, lineHeight: 1.4,
            }}>
              {item.q}
            </div>
            <div style={{
              fontSize: 14, color: 'var(--muted)', lineHeight: 1.85,
              whiteSpace: 'pre-line',
            }}>
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
            error: `AirflowNotFoundException: The DAG 'daily_sales_pipeline' does not exist`,
            cause: 'The DAG file was added to the dags/ folder but Airflow has not yet scanned and registered it. Airflow scans for new DAG files on an interval (default: 30 seconds to 5 minutes depending on configuration). Alternatively, there is a syntax error in the DAG file that is preventing it from being parsed — Airflow silently skips files it cannot import.',
            fix: 'Wait for the scan interval to pass, then refresh the Airflow UI. If it still does not appear, check the Airflow scheduler logs for ImportError or SyntaxError messages referencing your file. Fix the error and the DAG will appear on the next scan cycle.',
          },
          {
            error: `PipelineRunFailed: Source connection timed out after 30 seconds`,
            cause: 'The source database or API did not respond within the pipeline\'s configured timeout window. This is usually a transient failure — the source was briefly overloaded, a network blip occurred, or a database maintenance window overlapped with the pipeline run time.',
            fix: 'Add retry logic to the ingestion step with exponential backoff — retry after 30 seconds, then 60, then 120. Configure the pipeline to alert only after all retries are exhausted. Also, review whether the pipeline run time overlaps with known source maintenance windows and shift the schedule if possible.',
          },
          {
            error: `dbt.exceptions.DbtRuntimeError: Database Error — relation "raw.shopify_orders" does not exist`,
            cause: 'A dbt model is referencing a source table that has not been loaded yet, or the table name or schema in the source configuration does not match what actually exists in the database. This often happens when the ingestion pipeline that loads raw.shopify_orders failed silently and the dbt transformation ran anyway.',
            fix: 'Check that the ingestion pipeline for shopify_orders completed successfully before the dbt run was triggered. In the Airflow DAG, add an explicit dependency: the dbt transformation task should only run after the ingestion task succeeds. Also verify the schema name and table name in sources.yml exactly match the database.',
          },
          {
            error: `pandas.errors.ParserError: Error tokenizing data. C error: Expected 8 fields, saw 11`,
            cause: 'The CSV file contains rows with a different number of columns than the header row. This usually means: some rows contain unescaped commas within a field value (a company name like "Tata, Sons, & Partners" parsed as multiple columns), or a new column was added to the source system without the data team being informed, or the file is corrupt.',
            fix: 'Open the file and inspect the problematic rows (pandas error message often includes the row number). If the issue is unescaped commas in fields, read the file with proper quoting: pd.read_csv(f, quoting=csv.QUOTE_ALL). If new columns were added upstream, update the schema definition and inform the analytics team of the change. Add a schema validation step at ingestion to catch this automatically in future.',
          },
          {
            error: `WARNING: Data quality check failed — row count dropped 43% vs previous run (expected: ~500k, actual: 284k)`,
            cause: 'This is not a crash — it is a data quality alert, which makes it more dangerous than a crash. A 43% drop in row count means data is missing. Possible causes: the source system had an outage and only partial data was exported, the ingestion query has a filter that is now excluding valid records (maybe a status code changed in the source), or the source data itself has genuinely shrunk (a batch deletion, a data retention policy, or a business event like a market exit).',
            fix: 'Never silence this alert and re-run. Investigate the cause first. Check the source system directly and verify whether the row count drop exists at the source or was introduced by the pipeline. Contact the source system owner to confirm whether any changes were made. Only re-run once you understand whether the reduced count is expected or represents missing data.',
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
                fontFamily: 'var(--font-mono)', letterSpacing: '.1em',
                textTransform: 'uppercase',
              }}>Cause: </span>
              <span style={{ fontSize: 13, color: 'var(--muted)', lineHeight: 1.7 }}>{item.cause}</span>
            </div>
            <div>
              <span style={{
                fontSize: 10, fontWeight: 700, color: 'var(--accent)',
                fontFamily: 'var(--font-mono)', letterSpacing: '.1em',
                textTransform: 'uppercase',
              }}>Fix: </span>
              <span style={{ fontSize: 13, color: 'var(--muted)', lineHeight: 1.7 }}>{item.fix}</span>
            </div>
          </div>
        ))}
      </section>

      {/* ── Key Takeaways ────────────────────────────────────────────── */}
      <KeyTakeaways items={[
        'A data engineer builds and maintains systems that move data from where it is created to where it needs to be used — reliably, at scale, and automatically.',
        'The data engineering lifecycle has six phases: Generation → Ingestion → Storage → Transformation → Serving → Orchestration. Every project lives somewhere in this cycle.',
        'Data engineers spend roughly 40% of their time maintaining existing pipelines, 40% building new ones, and 20% collaborating. Debugging is a core skill, not an interruption.',
        'Tools change constantly. Categories do not. Learn what problem each category of tool solves — ingestion, storage, processing, orchestration — and you can pick up any specific tool in that category quickly.',
        'Data engineering is the foundation that every other data role depends on. When data engineering is poor, analysts distrust data, scientists waste time cleaning it, and business decisions are made on bad information.',
        'The key difference between a data engineer and a software engineer is not the languages used but the systems built for: operational applications vs analytical data infrastructure.',
        'Reliable means four things: completes successfully, produces correct output, completes within SLA, and recovers from failures without human intervention.',
        'Non-IT backgrounds are an advantage in data engineering, not a disadvantage. Domain knowledge of what the data means is genuinely rare and valuable.',
        'In India in 2026, data engineering salaries range from ₹6–12 LPA at entry level to ₹70–120+ LPA at principal level, with FAANG and GCC roles paying significantly above product company rates.',
        'The fastest path to a first DE job from a non-IT background: Python + SQL + 3 real projects on cloud free tiers + one cloud certification + GitHub portfolio. Achievable in 6–9 months of focused work.',
      ]} />

    </LearnLayout>
  )
}