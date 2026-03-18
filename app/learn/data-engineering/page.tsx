'use client'

import { useState } from 'react'
import Link from 'next/link'
import { LearnLayout } from '@/components/content/LearnLayout'

type PhaseFilter = 'all' | '1' | '2' | '3' | '4' | '5' | '6'

interface Module {
  num: string
  title: string
  slug: string
  readTime: string
  xp: number
  status: 'live' | 'soon'
  phase: number
  description: string
  topics: string[]
  color: string
}

const phaseColors: Record<number, string> = {
  1: '#00e676',
  2: '#7b61ff',
  3: '#f97316',
  4: '#facc15',
  5: '#4285f4',
  6: '#ff4757',
}

const phaseInfo = [
  { id: 1, title: 'What Even Is This?'              },
  { id: 2, title: 'Data Fundamentals'               },
  { id: 3, title: 'Core Engineering Skills'         },
  { id: 4, title: 'How Data Moves'                  },
  { id: 5, title: 'Storage & Architecture'          },
  { id: 6, title: 'Quality, Governance & Production'},
]

const modules: Module[] = [
  // ── Phase 1 — green ──────────────────────────────────────────────────────
  {
    num: '01', phase: 1, color: phaseColors[1], status: 'soon', xp: 100, readTime: '25 min',
    title: 'What is Data? How Computers Store Information',
    slug: 'what-is-data',
    description: 'Before you engineer data you need to understand what data actually is — bits, bytes, files, and memory. Built from scratch so nothing feels like magic.',
    topics: ['Bits & bytes', 'Files vs databases', 'How memory works', 'Why data needs engineers'],
  },
  {
    num: '02', phase: 1, color: phaseColors[1], status: 'soon', xp: 100, readTime: '30 min',
    title: 'What is Data Engineering?',
    slug: 'what-is-data-engineering',
    description: 'The role, the career, a real day-in-the-life at a Bangalore startup, and why this job exists at all. The clearest explanation you will find anywhere.',
    topics: ['The role defined', 'Day-in-the-life', 'Why it exists', 'Career paths', 'What DEs actually build'],
  },
  {
    num: '03', phase: 1, color: phaseColors[1], status: 'soon', xp: 100, readTime: '35 min',
    title: 'How Data Moves Through a Company',
    slug: 'how-data-moves',
    description: 'The complete end-to-end story — from the moment data is created at a source, to the dashboard a business leader looks at every morning.',
    topics: ['Source systems', 'Data in motion', 'Storage layers', 'Who uses the data', 'Real company example'],
  },
  {
    num: '04', phase: 1, color: phaseColors[1], status: 'soon', xp: 100, readTime: '30 min',
    title: 'The Data Engineering Ecosystem — Map of All the Tools',
    slug: 'de-ecosystem',
    description: 'There are hundreds of tools in this space. This module maps all of them, explains why so many exist, and shows exactly where each one fits.',
    topics: ['Ingestion tools', 'Storage tools', 'Processing tools', 'Orchestration tools', 'Serving tools'],
  },
  {
    num: '05', phase: 1, color: phaseColors[1], status: 'soon', xp: 100, readTime: '25 min',
    title: 'Data Engineer vs Analyst vs Scientist vs ML Engineer',
    slug: 'de-vs-other-roles',
    description: 'Clear, permanent boundaries between the four most confused roles in all of tech. Know exactly where you fit and where each role ends.',
    topics: ['DE vs DA', 'DE vs DS', 'DE vs MLE', 'Who works with whom', 'Which role to target'],
  },
  {
    num: '06', phase: 1, color: phaseColors[1], status: 'soon', xp: 150, readTime: '35 min',
    title: 'Data Engineering in the Indian Job Market (2026)',
    slug: 'de-india-job-market',
    description: 'Real salary data by city and company type, top hiring companies, skills in demand, and how to break into DE from a non-IT background.',
    topics: ['Salary by city', 'Company multipliers', 'Top hiring companies', 'Skills in JDs', 'Breaking in from non-IT'],
  },

  // ── Phase 2 — purple ─────────────────────────────────────────────────────
  {
    num: '07', phase: 2, color: phaseColors[2], status: 'soon', xp: 100, readTime: '30 min',
    title: 'Structured, Semi-Structured and Unstructured Data',
    slug: 'data-types-structured',
    description: 'The three categories every data engineer works with daily — what makes each one different and what each demands from your pipeline.',
    topics: ['Structured (tables)', 'Semi-structured (JSON/XML)', 'Unstructured (images/text)', 'Storage implications'],
  },
  {
    num: '08', phase: 2, color: phaseColors[2], status: 'soon', xp: 150, readTime: '45 min',
    title: 'Data Formats — CSV, JSON, Parquet, Avro, ORC',
    slug: 'data-formats',
    description: 'Not just what each format is — but when to use it, what it costs in storage and compute, and what breaks when you choose the wrong one.',
    topics: ['CSV internals', 'JSON & nesting', 'Parquet columnar', 'Avro & schema evolution', 'ORC for Hive', 'When to use each'],
  },
  {
    num: '09', phase: 2, color: phaseColors[2], status: 'soon', xp: 150, readTime: '50 min',
    title: 'Databases — What They Are and How They Work Internally',
    slug: 'databases-internals',
    description: 'Storage engines, B-trees, indexes, buffer pools, WAL — the inside story that makes you 10× better at every database you ever use.',
    topics: ['Storage engines', 'B-tree indexes', 'Buffer pool', 'WAL & durability', 'How reads & writes work'],
  },
  {
    num: '10', phase: 2, color: phaseColors[2], status: 'soon', xp: 150, readTime: '40 min',
    title: 'SQL vs NoSQL — The Real Difference',
    slug: 'sql-vs-nosql',
    description: 'Why the choice matters, what each one trades off, and how to pick the right store for any situation — without cargo-culting trends.',
    topics: ['Relational model', 'Document stores', 'Key-value stores', 'Column-family stores', 'When to use each'],
  },
  {
    num: '11', phase: 2, color: phaseColors[2], status: 'soon', xp: 150, readTime: '45 min',
    title: 'Data Warehouse vs Data Lake vs Lakehouse',
    slug: 'warehouse-lake-lakehouse',
    description: 'Three different answers to the same question: where do we keep all this data? The honest trade-offs, explained simply.',
    topics: ['Warehouse design', 'Data lake design', 'Lakehouse evolution', 'Cost vs flexibility', 'Choosing the right one'],
  },
  {
    num: '12', phase: 2, color: phaseColors[2], status: 'soon', xp: 150, readTime: '40 min',
    title: 'Schemas, Tables, Keys and Indexes — The Building Blocks',
    slug: 'schemas-tables-keys',
    description: 'The building blocks of every database. Understanding these deeply separates good engineers from great ones.',
    topics: ['What a schema is', 'Primary & foreign keys', 'Indexes explained', 'Constraints', 'Schema design patterns'],
  },
  {
    num: '13', phase: 2, color: phaseColors[2], status: 'soon', xp: 150, readTime: '40 min',
    title: 'ACID Properties and Transactions',
    slug: 'acid-transactions',
    description: 'Why ACID exists, what each property means in practice, and what actually happens when a transaction fails halfway through.',
    topics: ['Atomicity', 'Consistency', 'Isolation', 'Durability', 'Transactions in practice', 'What breaks without ACID'],
  },

  // ── Phase 3 — orange ─────────────────────────────────────────────────────
  {
    num: '14', phase: 3, color: phaseColors[3], status: 'soon', xp: 200, readTime: '75 min',
    title: 'Python for Data Engineering',
    slug: 'python-for-de',
    description: 'Not Python 101. Python for pipelines — file I/O at scale, REST APIs, error handling, exponential backoff, logging, generators, and testable code.',
    topics: ['File I/O at scale', 'REST API calls', 'Error handling & retries', 'Logging patterns', 'Generators', 'Writing testable code'],
  },
  {
    num: '15', phase: 3, color: phaseColors[3], status: 'soon', xp: 200, readTime: '70 min',
    title: 'SQL for Data Engineers — Beyond the Basics',
    slug: 'sql-for-de',
    description: 'Window functions, complex CTEs, deduplication patterns, SCD in SQL, and the advanced queries every DE interview actually tests.',
    topics: ['Window functions', 'Complex CTEs', 'Deduplication', 'Running totals', 'Moving averages', 'Interview patterns'],
  },
  {
    num: '16', phase: 3, color: phaseColors[3], status: 'soon', xp: 150, readTime: '60 min',
    title: 'Linux and Shell Scripting for Data Engineers',
    slug: 'linux-shell',
    description: 'Navigate, process files, write bash scripts, schedule cron jobs, and monitor processes — everything you need from the terminal.',
    topics: ['File system navigation', 'grep / awk / sed', 'Bash scripting', 'Cron jobs', 'Log processing', 'SSH & remote access'],
  },
  {
    num: '17', phase: 3, color: phaseColors[3], status: 'soon', xp: 150, readTime: '45 min',
    title: 'Git and Version Control for Data Projects',
    slug: 'git-for-data',
    description: 'Branching strategies, managing large files, pre-commit hooks, and semantic versioning — for data teams specifically.',
    topics: ['Branching strategies', 'git-lfs for data', '.gitignore patterns', 'Pre-commit hooks', 'PR workflows'],
  },
  {
    num: '18', phase: 3, color: phaseColors[3], status: 'soon', xp: 150, readTime: '55 min',
    title: 'Working with APIs — REST, Auth, Pagination, Rate Limits',
    slug: 'working-with-apis',
    description: 'Every data engineer pulls from APIs. Build robust ingestion classes with retries, pagination, OAuth, and checkpointing.',
    topics: ['REST fundamentals', 'Pagination patterns', 'OAuth 2.0', 'Rate limiting & backoff', 'Checkpointing', 'Webhooks'],
  },
  {
    num: '19', phase: 3, color: phaseColors[3], status: 'soon', xp: 150, readTime: '50 min',
    title: 'Working with Files at Scale',
    slug: 'files-at-scale',
    description: 'Partitioning strategies, compression algorithms, the small file problem, and how columnar storage works internally.',
    topics: ['Hive-style partitioning', 'Compression tradeoffs', 'Small file problem', 'File size optimisation', 'Schema evolution'],
  },

  // ── Phase 4 — yellow ─────────────────────────────────────────────────────
  {
    num: '20', phase: 4, color: phaseColors[4], status: 'soon', xp: 150, readTime: '45 min',
    title: 'What is a Data Pipeline? Anatomy and Design Principles',
    slug: 'what-is-a-pipeline',
    description: 'The most important concept in data engineering. Every component, how they connect, and the principles that make a pipeline good.',
    topics: ['Pipeline anatomy', 'Stages explained', 'Design principles', 'What makes a good pipeline', 'Common anti-patterns'],
  },
  {
    num: '21', phase: 4, color: phaseColors[4], status: 'soon', xp: 150, readTime: '45 min',
    title: 'Batch vs Streaming vs Micro-Batch',
    slug: 'batch-vs-streaming',
    description: 'Three processing models with real trade-offs. Know each deeply enough to pick the right one for any business problem.',
    topics: ['Batch processing', 'Streaming processing', 'Micro-batch', 'Latency vs throughput', 'Choosing the right model'],
  },
  {
    num: '22', phase: 4, color: phaseColors[4], status: 'soon', xp: 150, readTime: '40 min',
    title: 'ETL vs ELT — History, Difference, When to Use Each',
    slug: 'etl-vs-elt',
    description: 'Why ETL dominated for 30 years, why ELT replaced it, and the situations where the old way is still the right way.',
    topics: ['ETL explained', 'ELT explained', 'Why the shift happened', 'When ETL still wins', 'Push vs pull models'],
  },
  {
    num: '23', phase: 4, color: phaseColors[4], status: 'soon', xp: 150, readTime: '50 min',
    title: 'Data Ingestion Patterns — Full Load, Incremental, CDC',
    slug: 'ingestion-patterns',
    description: 'The three ways to pull data from a source system. Most engineers only know one. Learn all three and when each one breaks.',
    topics: ['Full load', 'Incremental load', 'Watermark patterns', 'CDC overview', 'Choosing the right pattern'],
  },
  {
    num: '24', phase: 4, color: phaseColors[4], status: 'soon', xp: 200, readTime: '55 min',
    title: 'Change Data Capture (CDC) — How It Works Under the Hood',
    slug: 'change-data-capture',
    description: 'Log-based, trigger-based, query-based CDC — the internals, the trade-offs, and the production gotchas nobody writes about.',
    topics: ['Log-based CDC', 'Trigger-based CDC', 'Query-based CDC', 'Transaction logs', 'Production gotchas'],
  },
  {
    num: '25', phase: 4, color: phaseColors[4], status: 'soon', xp: 200, readTime: '70 min',
    title: 'Building a Batch Pipeline From Scratch',
    slug: 'batch-pipeline-from-scratch',
    description: 'A complete Python pipeline: extract → validate → transform → load → checkpoint. Full code, full errors, full production decisions explained.',
    topics: ['Extract phase', 'Validation patterns', 'Transform logic', 'Load strategies', 'Checkpointing', 'Full working code'],
  },
  {
    num: '26', phase: 4, color: phaseColors[4], status: 'soon', xp: 150, readTime: '45 min',
    title: 'Idempotency, Atomicity and Pipeline Restartability',
    slug: 'idempotency-atomicity',
    description: 'Why every pipeline must be safe to re-run. The two properties that separate toy pipelines from production ones.',
    topics: ['What idempotency means', 'Atomic operations', 'Making pipelines restartable', 'UPSERT patterns', 'Overwrite vs append'],
  },
  {
    num: '27', phase: 4, color: phaseColors[4], status: 'soon', xp: 150, readTime: '50 min',
    title: 'Error Handling, Retries and Dead Letter Queues',
    slug: 'error-handling-retries',
    description: 'What happens when a pipeline fails at 3am. How to build systems that survive the real world without waking anyone up.',
    topics: ['Error categories', 'Retry policies', 'Exponential backoff', 'Dead letter queues', 'Alerting patterns'],
  },
  {
    num: '28', phase: 4, color: phaseColors[4], status: 'soon', xp: 150, readTime: '45 min',
    title: 'Pipeline Orchestration — What a Scheduler Does',
    slug: 'pipeline-orchestration',
    description: 'The concepts behind orchestrators — DAGs, dependencies, triggers, backfill — without tying you to any single tool.',
    topics: ['What orchestration is', 'DAGs explained', 'Dependencies & triggers', 'Backfill concept', 'Scheduler internals'],
  },

  // ── Phase 5 — blue ───────────────────────────────────────────────────────
  {
    num: '29', phase: 5, color: phaseColors[5], status: 'soon', xp: 150, readTime: '50 min',
    title: 'Data Lake Architecture — Design, Zones and Anti-Patterns',
    slug: 'data-lake-architecture',
    description: 'How to design a data lake that stays useful for years — and the patterns that turn it into an unmaintainable swamp.',
    topics: ['Zone design', 'Raw zone', 'Processed zone', 'Landing zone', 'Anti-patterns', 'Data swamp causes'],
  },
  {
    num: '30', phase: 5, color: phaseColors[5], status: 'soon', xp: 150, readTime: '45 min',
    title: 'Medallion Architecture — Bronze, Silver, Gold',
    slug: 'medallion-architecture',
    description: 'The most popular data lake design pattern at modern companies. What each layer does, why it exists, and how to implement it.',
    topics: ['Bronze layer', 'Silver layer', 'Gold layer', 'What goes where', 'Implementation decisions'],
  },
  {
    num: '31', phase: 5, color: phaseColors[5], status: 'soon', xp: 150, readTime: '55 min',
    title: 'Data Warehouse Concepts — Columnar Storage and Distribution',
    slug: 'warehouse-concepts',
    description: 'How a warehouse actually stores and queries data at scale. The internals that explain both the performance and the cost.',
    topics: ['Columnar vs row storage', 'Compression in warehouses', 'Distributed query', 'Partitioning', 'Clustering'],
  },
  {
    num: '32', phase: 5, color: phaseColors[5], status: 'soon', xp: 150, readTime: '45 min',
    title: 'Lakehouse Architecture — Why It Exists and How It Works',
    slug: 'lakehouse-architecture',
    description: 'The best of warehouse and lake in one architecture. Why the industry moved here and what problems it actually solves.',
    topics: ['Why lakehouse emerged', 'Table formats', 'ACID on object storage', 'Open vs closed lakehouses', 'The future'],
  },
  {
    num: '33', phase: 5, color: phaseColors[5], status: 'soon', xp: 200, readTime: '60 min',
    title: 'Data Modelling — Dimensional, Star and Snowflake Schema',
    slug: 'data-modelling',
    description: 'How to organise data so analysts can query it fast and intuitively. The art behind every well-designed analytics table.',
    topics: ['Dimensional modelling', 'Facts & dimensions', 'Star schema', 'Snowflake schema', 'Grain definition', 'Junk dimensions'],
  },
  {
    num: '34', phase: 5, color: phaseColors[5], status: 'soon', xp: 150, readTime: '50 min',
    title: 'Slowly Changing Dimensions — SCD Types 1, 2 and 3',
    slug: 'slowly-changing-dimensions',
    description: 'One of the most-tested DE interview topics. What happens when a dimension — like a customer address or job title — changes over time.',
    topics: ['SCD Type 1', 'SCD Type 2', 'SCD Type 3', 'When to use each', 'Implementation in SQL'],
  },
  {
    num: '35', phase: 5, color: phaseColors[5], status: 'soon', xp: 200, readTime: '55 min',
    title: 'Data Vault 2.0 — Hubs, Links and Satellites',
    slug: 'data-vault',
    description: 'The advanced modelling pattern used by large enterprises. Flexible, auditable, and built to survive the real world changing.',
    topics: ['Hubs', 'Links', 'Satellites', 'Business keys', 'When to use Data Vault', 'DV vs Dimensional'],
  },

  // ── Phase 6 — red ────────────────────────────────────────────────────────
  {
    num: '36', phase: 6, color: phaseColors[6], status: 'soon', xp: 150, readTime: '55 min',
    title: 'Data Quality — Dimensions, Testing and Validation',
    slug: 'data-quality',
    description: 'How to know your data is trustworthy. The six quality dimensions, how to test for each, and what breaks when you skip this.',
    topics: ['6 quality dimensions', 'Completeness', 'Accuracy', 'Freshness', 'Uniqueness', 'Validation patterns'],
  },
  {
    num: '37', phase: 6, color: phaseColors[6], status: 'soon', xp: 150, readTime: '50 min',
    title: 'Data Observability — Metrics, Logging and Anomaly Detection',
    slug: 'data-observability',
    description: 'When pipelines run in production, how do you know something is wrong before your users do? Observability answers that.',
    topics: ['Observability vs monitoring', 'Pipeline metrics', 'Structured logging', 'Anomaly detection', 'Alerting design'],
  },
  {
    num: '38', phase: 6, color: phaseColors[6], status: 'soon', xp: 150, readTime: '55 min',
    title: 'Data Governance — Catalogues, Lineage and Access Control',
    slug: 'data-governance',
    description: 'Who owns the data, who can access it, where did it come from, where is it used. Four questions governance must answer.',
    topics: ['Data catalogues', 'Data lineage', 'Column-level lineage', 'Data classification', 'RBAC for data'],
  },
  {
    num: '39', phase: 6, color: phaseColors[6], status: 'soon', xp: 150, readTime: '50 min',
    title: 'Security and Compliance for Data Engineers',
    slug: 'security-compliance',
    description: 'GDPR and the India DPDP Act — what they mean for your pipelines and how to build systems that are compliant by design.',
    topics: ['Encryption at rest & transit', 'PII handling', 'GDPR basics', 'India DPDP Act', 'Compliance by design'],
  },
  {
    num: '40', phase: 6, color: phaseColors[6], status: 'soon', xp: 150, readTime: '55 min',
    title: 'Streaming Data — What It Is and How It Works',
    slug: 'streaming-data',
    description: 'Event-driven architecture, producers, consumers, offsets, consumer groups — the concepts without a tool tutorial.',
    topics: ['Events & streams', 'Producers & consumers', 'Offsets & replay', 'Consumer groups', 'Event-driven architecture'],
  },
  {
    num: '41', phase: 6, color: phaseColors[6], status: 'soon', xp: 150, readTime: '50 min',
    title: 'Message Brokers and Queues — Internal Mechanics',
    slug: 'message-brokers-queues',
    description: 'How messages flow from producer to consumer. Durability, ordering, replayability — the inside story without the tool noise.',
    topics: ['What a message broker is', 'Queues vs topics', 'Durability', 'Ordering guarantees', 'At-least-once vs exactly-once'],
  },
  {
    num: '42', phase: 6, color: phaseColors[6], status: 'soon', xp: 200, readTime: '65 min',
    title: 'Distributed Systems for Data Engineers',
    slug: 'distributed-systems',
    description: 'CAP theorem, partitioning, replication, fault tolerance — explained for data engineers, not software architects.',
    topics: ['CAP theorem', 'Consistency models', 'Partitioning', 'Replication', 'Fault tolerance', 'Distributed transactions'],
  },
  {
    num: '43', phase: 6, color: phaseColors[6], status: 'soon', xp: 200, readTime: '60 min',
    title: 'Performance Tuning and Cost Optimisation',
    slug: 'performance-tuning',
    description: 'I/O bound vs CPU bound vs network bound. How to profile any pipeline, find the bottleneck, and fix it without rebuilding everything.',
    topics: ['Bottleneck types', 'Profiling pipelines', 'Storage optimisation', 'Query tuning', 'Cost models', 'Right-sizing'],
  },
  {
    num: '44', phase: 6, color: phaseColors[6], status: 'soon', xp: 150, readTime: '55 min',
    title: 'DataOps and CI/CD for Data Pipelines',
    slug: 'dataops-cicd',
    description: 'How to ship pipeline changes like a professional — testing, staging, rollback, and automated deployments.',
    topics: ['DataOps principles', 'Testing pipelines in CI', 'Staging environments', 'Rollback strategies', 'GitOps for data'],
  },
  {
    num: '45', phase: 6, color: phaseColors[6], status: 'soon', xp: 250, readTime: '80 min',
    title: 'Data Engineering System Design',
    slug: 'system-design-de',
    description: 'How to design any data system from scratch. Framework, trade-offs, capacity estimation — for both interviews and real work.',
    topics: ['Design framework', 'Capacity estimation', 'Trade-off analysis', 'Common system designs', 'Interview approach'],
  },
  {
    num: '46', phase: 6, color: phaseColors[6], status: 'soon', xp: 300, readTime: '90 min',
    title: 'Interview Prep — 60 Complete Answers',
    slug: 'de-interview-questions',
    description: '60 complete answers across Python, SQL, pipelines, modelling, architecture, and behavioural questions — written at senior engineer depth.',
    topics: ['Python for DE', 'SQL advanced', 'Pipeline design', 'Data modelling', 'Architecture', 'System design', 'Behavioural'],
  },
]

export default function DataEngineeringTrack() {
  const [activePhase, setActivePhase] = useState<PhaseFilter>('all')

  const filtered =
    activePhase === 'all'
      ? modules
      : modules.filter((m) => m.phase === parseInt(activePhase))

  const totalTopics  = modules.reduce((sum, m) => sum + m.topics.length, 0)
  const totalMinutes = modules.reduce((sum, m) => sum + parseInt(m.readTime), 0)
  const totalHours   = Math.round(totalMinutes / 60)

  return (
    <LearnLayout
      title="Data Engineering"
      description="From zero to production-grade DE — 46 modules, no prerequisites"
      section="Data Engineering"
      readTime="Self-paced"
      updatedAt="March 2026"
    >

      {/* ── Who This Is For ────────────────────────────────────────────── */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: 12,
        marginBottom: 40,
      }}>
        {[
          { icon: '🎓', label: 'Complete freshers — zero knowledge required' },
          { icon: '🔄', label: 'Non-IT background switching to tech' },
          { icon: '💼', label: 'Anyone preparing for DE interviews' },
          { icon: '📱', label: 'Students who want real depth, not just definitions' },
        ].map((item) => (
          <div key={item.label} style={{
            background: 'var(--surface)',
            border: '1px solid var(--border)',
            borderRadius: 10,
            padding: '14px 16px',
            display: 'flex',
            alignItems: 'center',
            gap: 10,
          }}>
            <span style={{ fontSize: 20 }}>{item.icon}</span>
            <span style={{ fontSize: 13, color: 'var(--text)', lineHeight: 1.5 }}>{item.label}</span>
          </div>
        ))}
      </div>

      {/* ── Stats bar ──────────────────────────────────────────────────── */}
      <div style={{
        display: 'flex',
        gap: 28,
        flexWrap: 'wrap',
        background: 'var(--surface)',
        border: '1px solid var(--border)',
        borderRadius: 12,
        padding: '20px 28px',
        marginBottom: 36,
      }}>
        {[
          { value: `${modules.length}`, label: 'Modules'        },
          { value: '6',                 label: 'Phases'          },
          { value: `${totalTopics}+`,   label: 'Topics covered'  },
          { value: `${totalHours}h`,    label: 'Total content'   },
          { value: '100%',              label: 'Free forever'    },
        ].map((s) => (
          <div key={s.label}>
            <div style={{
              fontSize: 24, fontWeight: 900,
              color: 'var(--green)', fontFamily: 'var(--font-display)',
            }}>
              {s.value}
            </div>
            <div style={{ fontSize: 12, color: 'var(--muted)', marginTop: 2 }}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* ── No cloud tools note ────────────────────────────────────────── */}
      <div style={{
        background: 'rgba(0,230,118,0.06)',
        border: '1px solid rgba(0,230,118,0.2)',
        borderRadius: 10,
        padding: '16px 20px',
        marginBottom: 40,
        fontSize: 14,
        color: 'var(--text)',
        lineHeight: 1.7,
      }}>
        <strong style={{ color: 'var(--accent)' }}>No cloud tools in this track.</strong>{' '}
        This is pure data engineering — concepts, architecture, pipelines, and patterns.
        Azure, AWS, GCP, Spark, Airflow, and Kafka each have their own dedicated tracks.
        This track makes you understand what any tool is actually doing before you touch it.
      </div>

      {/* ── Curriculum heading + phase filter ─────────────────────────── */}
      <div style={{ marginTop: 48, marginBottom: 8 }}>
        <div style={{
          fontSize: 10, fontWeight: 700, letterSpacing: '.12em',
          textTransform: 'uppercase', color: 'var(--muted)',
          fontFamily: 'var(--font-mono)', marginBottom: 10,
        }}>
          // Curriculum
        </div>

        <div style={{
          display: 'flex', justifyContent: 'space-between',
          alignItems: 'flex-end', flexWrap: 'wrap', gap: 16, marginBottom: 6,
        }}>
          <div>
            <h2 style={{
              fontSize: 'clamp(20px, 2.5vw, 28px)', fontWeight: 900,
              letterSpacing: '-1px', color: 'var(--text)',
              fontFamily: 'var(--font-display)', marginBottom: 6,
            }}>
              46 Modules. Zero to Advanced.
            </h2>
            <p style={{ fontSize: 14, color: 'var(--muted)', lineHeight: 1.7, maxWidth: 520, margin: 0 }}>
              Follow in order. Each module builds on the last. Every concept is
              introduced exactly when you need it, not before.
            </p>
          </div>

          {/* Phase filter tabs */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
            {(['all', '1', '2', '3', '4', '5', '6'] as PhaseFilter[]).map((f) => {
              const col = f === 'all' ? 'var(--accent)' : phaseColors[parseInt(f)]
              const isActive = activePhase === f
              return (
                <button
                  key={f}
                  onClick={() => setActivePhase(f)}
                  style={{
                    fontSize: 11, fontWeight: 700, fontFamily: 'var(--font-mono)',
                    letterSpacing: '.08em', textTransform: 'uppercase',
                    padding: '6px 12px', borderRadius: 8, cursor: 'pointer',
                    border: isActive ? `1px solid ${col}` : '1px solid var(--border)',
                    background: isActive ? `${col}18` : 'var(--surface)',
                    color: isActive ? col : 'var(--muted)',
                    transition: 'all 0.15s',
                  }}
                >
                  {f === 'all' ? 'All' : `P${f}`}
                </button>
              )
            })}
          </div>
        </div>
      </div>

      {/* ── Module Cards ───────────────────────────────────────────────── */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginTop: 28 }}>
        {filtered.map((mod, idx) => {
          const isLive = mod.status === 'live'
          const href   = isLive ? `/learn/data-engineering/${mod.slug}` : '#'

          return (
            <div key={mod.num}>

              {/* Phase section header — 'all' view only */}
              {activePhase === 'all' && (idx === 0 || filtered[idx - 1].phase !== mod.phase) && (
                <div style={{
                  display: 'flex', alignItems: 'center', gap: 10,
                  padding: idx === 0 ? '16px 0 10px' : '28px 0 10px',
                }}>
                  <div style={{
                    width: 26, height: 26, borderRadius: '50%', flexShrink: 0,
                    background: `${mod.color}18`, border: `1px solid ${mod.color}44`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: 11, fontWeight: 900, color: mod.color,
                    fontFamily: 'var(--font-mono)',
                  }}>
                    {mod.phase}
                  </div>
                  <span style={{
                    fontSize: 11, fontWeight: 700, color: mod.color,
                    fontFamily: 'var(--font-mono)', letterSpacing: '.1em',
                    textTransform: 'uppercase',
                  }}>
                    Phase {mod.phase} — {phaseInfo[mod.phase - 1].title}
                  </span>
                </div>
              )}

              {/* Card — exact DSA card structure */}
              <div style={{
                background: 'var(--surface)',
                border: '1px solid var(--border)',
                borderRadius: 12,
                overflow: 'hidden',
                opacity: isLive ? 1 : 0.88,
                transition: 'border-color 0.2s',
              }}>
                {/* Colored top accent bar */}
                <div style={{ height: 3, background: mod.color, opacity: 0.75 }} />

                <div style={{ padding: '20px 24px' }}>
                  <div style={{
                    display: 'flex', alignItems: 'flex-start',
                    justifyContent: 'space-between', gap: 16, flexWrap: 'wrap',
                  }}>

                    {/* Left */}
                    <div style={{ flex: 1, minWidth: 240 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
                        <span style={{
                          fontFamily: 'var(--font-mono)', fontSize: 11, fontWeight: 700,
                          color: mod.color,
                          background: `${mod.color}18`,
                          border: `1px solid ${mod.color}33`,
                          borderRadius: 6, padding: '3px 8px',
                        }}>
                          MODULE {mod.num}
                        </span>
                        {isLive ? (
                          <span style={{
                            fontSize: 10, fontWeight: 700, color: 'var(--green)',
                            background: 'rgba(0,230,118,0.12)',
                            border: '1px solid rgba(0,230,118,0.3)',
                            borderRadius: 20, padding: '2px 10px', letterSpacing: '.08em',
                          }}>
                            ✓ LIVE
                          </span>
                        ) : (
                          <span style={{
                            fontSize: 10, fontWeight: 600, color: 'var(--muted)',
                            background: 'var(--bg2)', border: '1px solid var(--border)',
                            borderRadius: 20, padding: '2px 10px', letterSpacing: '.08em',
                          }}>
                            COMING SOON
                          </span>
                        )}
                      </div>

                      <h3 style={{
                        fontSize: 17, fontWeight: 800, color: 'var(--text)',
                        fontFamily: 'var(--font-display)', marginBottom: 6,
                        letterSpacing: '-0.4px', lineHeight: 1.3,
                      }}>
                        {mod.title}
                      </h3>

                      <p style={{
                        fontSize: 13, color: 'var(--muted)', lineHeight: 1.65,
                        marginBottom: 14, maxWidth: 560,
                      }}>
                        {mod.description}
                      </p>

                      {/* Topic pills */}
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                        {mod.topics.map((topic) => (
                          <span key={topic} style={{
                            fontSize: 11, color: 'var(--muted)',
                            background: 'var(--bg2)', border: '1px solid var(--border)',
                            borderRadius: 20, padding: '3px 10px',
                            fontFamily: 'var(--font-mono)',
                          }}>
                            {topic}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Right — read time + CTA */}
                    <div style={{
                      display: 'flex', flexDirection: 'column',
                      alignItems: 'flex-end', gap: 12, paddingTop: 4,
                    }}>
                      <div style={{ textAlign: 'right' }}>
                        <div style={{
                          fontSize: 18, fontWeight: 800, color: 'var(--text)',
                          fontFamily: 'var(--font-display)',
                        }}>
                          {mod.readTime}
                        </div>
                        <div style={{ fontSize: 11, color: 'var(--muted)' }}>read time</div>
                      </div>

                      {isLive ? (
                        <Link href={href} style={{
                          display: 'inline-block',
                          background: mod.color,
                          color: '#000',
                          fontSize: 12, fontWeight: 700,
                          borderRadius: 8, padding: '8px 18px',
                          textDecoration: 'none',
                          letterSpacing: '.04em', whiteSpace: 'nowrap',
                        }}>
                          Start →
                        </Link>
                      ) : (
                        <span style={{
                          display: 'inline-block',
                          background: 'var(--bg2)', color: 'var(--muted)',
                          fontSize: 12, fontWeight: 600,
                          borderRadius: 8, padding: '8px 18px',
                          letterSpacing: '.04em', cursor: 'not-allowed',
                          border: '1px solid var(--border)', whiteSpace: 'nowrap',
                        }}>
                          Soon
                        </span>
                      )}
                    </div>

                  </div>
                </div>
              </div>

            </div>
          )
        })}
      </div>

      {/* ── Bottom CTA ─────────────────────────────────────────────────── */}
      <div style={{
        marginTop: 56,
        background: 'linear-gradient(135deg, rgba(0,230,118,0.06) 0%, rgba(66,133,244,0.06) 100%)',
        border: '1px solid var(--border)',
        borderRadius: 14,
        padding: '36px 32px',
        textAlign: 'center',
      }}>
        <div style={{
          fontSize: 10, fontWeight: 700, letterSpacing: '.12em',
          textTransform: 'uppercase', color: 'var(--green)',
          fontFamily: 'var(--font-mono)', marginBottom: 14,
        }}>
          // Ready to start?
        </div>
        <h3 style={{
          fontSize: 'clamp(18px, 2.5vw, 26px)', fontWeight: 900,
          color: 'var(--text)', fontFamily: 'var(--font-display)',
          letterSpacing: '-1px', marginBottom: 12,
        }}>
          Modules are dropping weekly.
        </h3>
        <p style={{
          fontSize: 14, color: 'var(--muted)', lineHeight: 1.7,
          maxWidth: 480, margin: '0 auto 24px',
        }}>
          Start with Module 01 the moment it goes live. Each module is self-contained
          enough to read on its own — but follow the order. Every concept earns the next one.
        </p>
        <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link href="/learn/roadmap" style={{
            display: 'inline-block', background: 'var(--green)',
            color: '#000', fontWeight: 700, fontSize: 13,
            borderRadius: 8, padding: '10px 24px', textDecoration: 'none',
          }}>
            View full roadmap →
          </Link>
          <Link href="/learn/projects" style={{
            display: 'inline-block', background: 'var(--surface)',
            color: 'var(--text)', fontWeight: 600, fontSize: 13,
            borderRadius: 8, padding: '10px 24px', textDecoration: 'none',
            border: '1px solid var(--border)',
          }}>
            Browse projects
          </Link>
        </div>
      </div>

    </LearnLayout>
  )
}