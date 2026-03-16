import type { Metadata } from 'next'
import Link from 'next/link'
import { LearnLayout } from '@/components/content/LearnLayout'
import { Callout } from '@/components/content/Callout'

export const metadata: Metadata = {
  title: 'DBMS — Database Management Systems | Chaduvuko',
  description:
    'Complete DBMS track from absolute zero — ER diagrams, normalization, SQL, indexing, transactions, B+ trees, distributed databases, and interview prep. Free, no login needed.',
}

const modules = [
  {
    number: '01',
    slug: 'introduction',
    title: 'Introduction to Databases & DBMS',
    desc: 'What a database actually is, the 6 problems it solves, DBMS vs Database vs Database System, types of databases, and why this shows up in every interview.',
    topics: ['What is a Database?', 'File System Problems', 'DBMS Software', 'Types of Databases', 'What DBAs Do'],
    time: '25–30 min',
    difficulty: 'Absolute Beginner',
    status: 'live' as const,
  },
  {
    number: '02',
    slug: 'data-models',
    title: 'Data Models',
    desc: 'The blueprint that decides how data is stored and connected — hierarchical, network, relational, object, and document models explained with real analogies.',
    topics: ['Hierarchical Model', 'Network Model', 'Relational Model', 'Document Model', 'Why Relational Won'],
    time: '20–25 min',
    difficulty: 'Beginner',
    status: 'live' as const,
  },
  {
    number: '03',
    slug: 'er-model',
    title: 'Entity-Relationship (ER) Model',
    desc: 'Design a database visually before writing a single line of SQL. Entities, attributes, relationships, cardinality, weak entities — drawn step by step.',
    topics: ['Entities & Attributes', 'Relationships & Cardinality', 'Strong vs Weak Entities', 'Drawing ER Diagrams', 'ER to Tables'],
    time: '35–40 min',
    difficulty: 'Beginner',
    status: 'live' as const,
  },
  {
    number: '04',
    slug: 'relational-model',
    title: 'Relational Model & Keys',
    desc: 'Tables, tuples, domains, integrity constraints — and every type of key explained clearly: Super, Candidate, Primary, Foreign, Composite, Surrogate.',
    topics: ['Relations & Tuples', 'Schema vs Instance', 'Super & Candidate Keys', 'Primary & Foreign Keys', 'Integrity Constraints'],
    time: '30–35 min',
    difficulty: 'Beginner',
    status: 'live' as const,
  },
  {
    number: '05',
    slug: 'normalization',
    title: 'Normalization — 1NF to 5NF',
    desc: 'The most important theory topic in DBMS. Eliminate every database design mistake before it causes real problems — insert, update, and delete anomalies explained.',
    topics: ['Insert/Update/Delete Anomalies', '1NF · 2NF · 3NF', 'BCNF · 4NF · 5NF', 'Step-by-Step Normalization', 'When to Denormalize'],
    time: '45–55 min',
    difficulty: 'Beginner',
    status: 'live' as const,
  },
  {
    number: '06',
    slug: 'functional-dependencies',
    title: 'Functional Dependencies',
    desc: "The math behind normalization. X → Y means X determines Y. Armstrong's Axioms, attribute closure, canonical cover, and finding candidate keys using FDs.",
    topics: ["Armstrong's Axioms", 'Trivial vs Non-Trivial FDs', 'Attribute Closure (F+)', 'Canonical Cover', 'Finding Candidate Keys'],
    time: '30–35 min',
    difficulty: 'Intermediate',
    status: 'live' as const,
  },
  {
    number: '07',
    slug: 'sql-complete',
    title: 'SQL — Complete Guide',
    desc: 'From your very first SELECT to window functions and recursive CTEs. DDL, DML, DCL, TCL, all joins, subqueries, aggregations, GROUP BY, HAVING — nothing skipped.',
    topics: ['DDL · DML · DCL · TCL', 'SELECT & WHERE', 'All JOIN Types', 'Window Functions', 'CTEs & Subqueries'],
    time: '90–120 min',
    difficulty: 'Beginner → Advanced',
    status: 'live' as const,
  },
  {
    number: '08',
    slug: 'indexes',
    title: 'Indexes',
    desc: 'Why queries slow down at scale, how indexes fix it, B+ tree vs hash index, clustered vs non-clustered, covering indexes, and when NOT to add an index.',
    topics: ['How Indexes Work', 'B+ Tree Index', 'Clustered vs Non-Clustered', 'Composite & Covering Indexes', 'When NOT to Index'],
    time: '35–40 min',
    difficulty: 'Intermediate',
    status: 'live' as const,
  },
  {
    number: '09',
    slug: 'transactions',
    title: 'Transactions & ACID Properties',
    desc: 'All-or-nothing units of work. The bank transfer example that makes ACID click instantly — Atomicity, Consistency, Isolation, Durability — with real failure scenarios.',
    topics: ['What is a Transaction?', 'Atomicity', 'Consistency', 'Isolation', 'Durability · COMMIT · ROLLBACK'],
    time: '30–35 min',
    difficulty: 'Intermediate',
    status: 'live' as const,
  },
  {
    number: '10',
    slug: 'concurrency',
    title: 'Concurrency Control',
    desc: 'How databases handle thousands of simultaneous users safely. Locks, deadlocks, isolation levels, Two-Phase Locking, and MVCC — the engine inside PostgreSQL.',
    topics: ['Lost Update · Dirty Read · Phantom Read', 'Shared & Exclusive Locks', 'Two-Phase Locking (2PL)', 'Deadlock Detection', 'Isolation Levels · MVCC'],
    time: '40–45 min',
    difficulty: 'Intermediate',
    status: 'live' as const,
  },
  {
    number: '11',
    slug: 'query-processing',
    title: 'Query Processing & Optimization',
    desc: 'What actually happens the moment you press Enter on a query — parsing, planning, optimization, execution. Then how to make it 10x faster using EXPLAIN.',
    topics: ['Parsing → Planning → Execution', 'Query Optimizer', 'EXPLAIN & EXPLAIN ANALYZE', 'Sequential vs Index Scan', 'Real Optimization Examples'],
    time: '35–40 min',
    difficulty: 'Intermediate',
    status: 'live' as const,
  },
  {
    number: '12',
    slug: 'storage',
    title: 'Storage & File Organization',
    desc: 'How data physically lives on disk — blocks, pages, buffer pool, heap files, sequential files. Understanding this is what separates developers from engineers.',
    topics: ['Blocks & Pages', 'Buffer Pool & Cache', 'Heap File Organization', 'Sequential & Hash Organization', 'Why This Affects Query Speed'],
    time: '30–35 min',
    difficulty: 'Intermediate',
    status: 'live' as const,
  },
  {
    number: '13',
    slug: 'b-plus-trees',
    title: 'Hashing & B+ Trees',
    desc: 'The two most important data structures inside every database. Static and dynamic hashing for fast lookups, B+ tree structure for range queries and indexes.',
    topics: ['Static & Dynamic Hashing', 'Collision Handling', 'B+ Tree Structure', 'Search · Insert · Delete', 'Why B+ Tree is the Standard'],
    time: '40–45 min',
    difficulty: 'Intermediate',
    status: 'live' as const,
  },
  {
    number: '14',
    slug: 'relational-algebra',
    title: 'Relational Algebra',
    desc: 'The mathematics SQL is built on. Select, Project, Join, Union, Difference, Division — shown with plain English explanations and direct SQL equivalents.',
    topics: ['Select (σ) & Project (π)', 'Union · Intersection · Difference', 'Cartesian Product & Join', 'Division (÷)', 'Mapping RA to SQL'],
    time: '30–35 min',
    difficulty: 'Intermediate',
    status: 'live' as const,
  },
  {
    number: '15',
    slug: 'views-procedures-triggers',
    title: 'Views, Stored Procedures & Triggers',
    desc: 'Database objects that encapsulate logic — virtual tables, pre-compiled SQL procedures, and triggers that run automatically on INSERT/UPDATE/DELETE.',
    topics: ['Views & Materialized Views', 'Stored Procedures vs Functions', 'Triggers — BEFORE & AFTER', 'Cursors', 'Real Use Cases at Companies'],
    time: '35–40 min',
    difficulty: 'Intermediate',
    status: 'live ' as const,
  },
  {
    number: '16',
    slug: 'crash-recovery',
    title: 'Crash Recovery',
    desc: 'How databases survive power failures, OS crashes, and hardware failures without losing a single committed transaction. WAL, checkpoints, and the ARIES algorithm.',
    topics: ['Write-Ahead Logging (WAL)', 'Undo & Redo Logs', 'Checkpoints', 'ARIES Algorithm', 'What Happens at 3am When DB Crashes'],
    time: '30–35 min',
    difficulty: 'Advanced',
    status: 'live' as const,
  },
  {
    number: '17',
    slug: 'distributed-databases',
    title: 'Distributed Databases & CAP Theorem',
    desc: 'Data across multiple machines — fragmentation, replication, two-phase commit, and the CAP theorem that every system design interview asks about.',
    topics: ['Horizontal & Vertical Fragmentation', 'Replication Strategies', 'Two-Phase Commit (2PC)', 'CAP Theorem', 'CA · CP · AP Real Examples'],
    time: '35–40 min',
    difficulty: 'Advanced',
    status: 'live' as const,
  },
  {
    number: '18',
    slug: 'nosql',
    title: 'NoSQL Databases',
    desc: 'When and why to break away from relational — MongoDB, Redis, Cassandra, Neo4j explained clearly. The SQL vs NoSQL decision framework for real projects.',
    topics: ['Document Stores — MongoDB', 'Key-Value — Redis', 'Column-Family — Cassandra', 'Graph — Neo4j', 'SQL vs NoSQL Decision Framework'],
    time: '35–40 min',
    difficulty: 'Advanced',
    status: 'live' as const,
  },
  {
    number: '19',
    slug: 'security',
    title: 'Database Security',
    desc: 'Protecting data at every layer — authentication, authorization, roles, SQL injection attacks and exactly how to prevent them, encryption, and auditing.',
    topics: ['Authentication vs Authorization', 'GRANT & REVOKE', 'SQL Injection — How & Prevention', 'Encryption at Rest & in Transit', 'Auditing & Row-Level Security'],
    time: '25–30 min',
    difficulty: 'Intermediate',
    status: 'live' as const,
  },
  {
    number: '20',
    slug: 'interview-questions',
    title: 'Interview Questions — All 60',
    desc: '60 DBMS questions categorized by company type. TCS/Wipro/Infosys for campus placements, Flipkart/Swiggy for product companies, and GATE-level for competitive exams.',
    topics: ['Service Company Questions (TCS, Wipro)', 'Product Company Questions (Flipkart, Swiggy)', 'GATE CS Level Questions', 'System Design DB Questions', 'Answers with Explanations'],
    time: '60–90 min',
    difficulty: 'All Levels',
    status: 'live' as const,
  },
]

// Color per phase
const phaseColor = (num: string) => {
  const n = parseInt(num)
  if (n <= 4)  return '#0078d4'   // Phase 1 — Foundations (blue)
  if (n <= 8)  return '#00e676'   // Phase 2 — Design & SQL (green)
  if (n <= 12) return '#f97316'   // Phase 3 — Internals (orange)
  if (n <= 16) return '#8b5cf6'   // Phase 4 — Advanced Theory (purple)
  return '#facc15'                // Phase 5 — Distributed & Interview (yellow)
}

const phaseLabel = (num: string) => {
  const n = parseInt(num)
  if (n <= 4)  return 'Phase 1 — Foundations'
  if (n <= 8)  return 'Phase 2 — Design & SQL'
  if (n <= 12) return 'Phase 3 — Internals'
  if (n <= 16) return 'Phase 4 — Advanced Theory'
  return 'Phase 5 — Distributed & Interview'
}

export default function DBMSTrackPage() {
  const liveCount = modules.filter((m) => m.status === 'live').length
  const totalCount = modules.length

  return (
    <LearnLayout
      title="Database Management Systems (DBMS)"
      description="Complete track from absolute zero — ER diagrams, normalization, SQL, indexes, transactions, B+ trees, distributed databases, NoSQL, and interview prep."
      section="CS Core"
      readTime={`${totalCount} modules`}
      updatedAt="March 2026"
    >

      {/* ── Stats Bar ── */}
      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: 12,
        marginBottom: 36,
      }}>
        {[
          { label: 'Total Modules', value: `${totalCount}` },
          { label: 'Live Now', value: `${liveCount}` },
          { label: 'Language', value: 'SQL + Theory' },
          { label: 'Audience', value: 'Zero to Advanced' },
          { label: 'Exam Coverage', value: 'GATE + Placements' },
        ].map((s) => (
          <div key={s.label} style={{
            background: 'var(--surface)',
            border: '1px solid var(--border)',
            borderRadius: 8,
            padding: '10px 16px',
            display: 'flex',
            flexDirection: 'column',
            gap: 2,
          }}>
            <span style={{ fontSize: 18, fontWeight: 900, color: 'var(--accent)', letterSpacing: '-0.5px' }}>
              {s.value}
            </span>
            <span style={{ fontSize: 11, color: 'var(--muted)', fontWeight: 600, letterSpacing: '.06em', textTransform: 'uppercase' }}>
              {s.label}
            </span>
          </div>
        ))}
      </div>

      {/* ── Who This Is For ── */}
      <Callout type="info">
        <strong>No prior knowledge needed — zero.</strong> This track is built for freshers, career switchers,
        and non-IT backgrounds. If you know what a spreadsheet is, you have everything you need to start.
        DBMS is taught in every CS/IT degree — but most explanations are textbook-heavy and confusing.
        This track explains it the way a senior engineer would explain it to you over chai.
      </Callout>

      {/* ── Phase Legend ── */}
      <div style={{ marginTop: 36, marginBottom: 8 }}>
        <div style={{
          fontSize: 10, fontWeight: 700, letterSpacing: '.12em',
          textTransform: 'uppercase', color: 'var(--muted)',
          marginBottom: 14, fontFamily: 'var(--font-mono)',
        }}>
          // Track Phases
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
          {[
            { label: 'Phase 1 — Foundations', color: '#0078d4', modules: '01–04' },
            { label: 'Phase 2 — Design & SQL', color: '#00e676', modules: '05–08' },
            { label: 'Phase 3 — Internals', color: '#f97316', modules: '09–12' },
            { label: 'Phase 4 — Advanced Theory', color: '#8b5cf6', modules: '13–16' },
            { label: 'Phase 5 — Distributed & Interview', color: '#facc15', modules: '17–20' },
          ].map((p) => (
            <div key={p.label} style={{
              display: 'flex',
              alignItems: 'center',
              gap: 7,
              background: 'var(--surface)',
              border: '1px solid var(--border)',
              borderRadius: 6,
              padding: '6px 12px',
            }}>
              <span style={{
                width: 8, height: 8, borderRadius: '50%',
                background: p.color, flexShrink: 0,
                boxShadow: `0 0 6px ${p.color}80`,
              }} />
              <span style={{ fontSize: 12, color: 'var(--text)', fontWeight: 600 }}>{p.label}</span>
              <span style={{ fontSize: 11, color: 'var(--muted)', fontFamily: 'var(--font-mono)' }}>({p.modules})</span>
            </div>
          ))}
        </div>
      </div>

      {/* ── Module Cards ── */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginTop: 28 }}>
        {modules.map((mod) => {
          const color = phaseColor(mod.number)
          const isLive = mod.status === 'live'

          return (
            <div
              key={mod.number}
              style={{
                background: 'var(--surface)',
                border: '1px solid var(--border)',
                borderRadius: 12,
                overflow: 'hidden',
                opacity: isLive ? 1 : 0.85,
              }}
            >
              {/* Top accent stripe */}
              <div style={{ height: 3, background: color, opacity: 0.75 }} />

              <div style={{ padding: '20px 24px' }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  justifyContent: 'space-between',
                  gap: 16,
                  flexWrap: 'wrap',
                }}>

                  {/* Left — number + title + desc + topics */}
                  <div style={{ flex: 1, minWidth: 240 }}>
                    <div style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: 10, marginBottom: 10 }}>

                      {/* Module number tag */}
                      <span style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: 11, fontWeight: 700,
                        color: color,
                        background: `${color}18`,
                        border: `1px solid ${color}33`,
                        borderRadius: 6,
                        padding: '3px 8px',
                      }}>
                        MODULE {mod.number}
                      </span>

                      {/* Live / Soon badge */}
                      {isLive ? (
                        <span style={{
                          display: 'flex', alignItems: 'center', gap: 5,
                          fontSize: 11, fontWeight: 700,
                          color: 'var(--accent)',
                          background: 'rgba(0,230,118,0.08)',
                          border: '1px solid rgba(0,230,118,0.25)',
                          borderRadius: 6, padding: '3px 8px',
                          fontFamily: 'var(--font-mono)',
                        }}>
                          <span style={{
                            width: 6, height: 6, borderRadius: '50%',
                            background: 'var(--accent)',
                            display: 'inline-block',
                            boxShadow: '0 0 5px var(--accent)',
                          }} />
                          LIVE
                        </span>
                      ) : (
                        <span style={{
                          fontSize: 11, fontWeight: 600,
                          color: 'var(--muted)',
                          background: 'var(--bg2)',
                          border: '1px solid var(--border)',
                          borderRadius: 6, padding: '3px 8px',
                          fontFamily: 'var(--font-mono)',
                        }}>
                          COMING SOON
                        </span>
                      )}

                      {/* Phase label */}
                      <span style={{
                        fontSize: 10, fontWeight: 600,
                        color: 'var(--muted)',
                        letterSpacing: '.06em',
                        textTransform: 'uppercase',
                      }}>
                        {phaseLabel(mod.number)}
                      </span>
                    </div>

                    {/* Title */}
                    <div style={{
                      fontSize: 16, fontWeight: 800,
                      color: 'var(--text)',
                      letterSpacing: '-0.3px',
                      marginBottom: 8,
                    }}>
                      {mod.title}
                    </div>

                    {/* Description */}
                    <div style={{
                      fontSize: 13, color: 'var(--muted)',
                      lineHeight: 1.7, marginBottom: 14,
                    }}>
                      {mod.desc}
                    </div>

                    {/* Topic tags */}
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                      {mod.topics.map((t) => (
                        <span key={t} style={{
                          fontSize: 11, fontWeight: 600,
                          color: 'var(--muted)',
                          background: 'var(--bg2)',
                          border: '1px solid var(--border)',
                          borderRadius: 4, padding: '3px 8px',
                          fontFamily: 'var(--font-mono)',
                        }}>
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Right — time + difficulty + CTA */}
                  <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'flex-end',
                    gap: 10,
                    minWidth: 110,
                    flexShrink: 0,
                  }}>
                    <div style={{ textAlign: 'right' }}>
                      <div style={{ fontSize: 12, color: 'var(--muted)', marginBottom: 3 }}>
                        ⏱ {mod.time}
                      </div>
                      <div style={{
                        fontSize: 11, fontWeight: 600,
                        color: color,
                        background: `${color}12`,
                        border: `1px solid ${color}30`,
                        borderRadius: 4,
                        padding: '2px 8px',
                        fontFamily: 'var(--font-mono)',
                        display: 'inline-block',
                      }}>
                        {mod.difficulty}
                      </div>
                    </div>

                    {isLive ? (
                      <Link
                        href={`/learn/dbms/${mod.slug}`}
                        style={{
                          display: 'inline-block',
                          background: color,
                          color: '#000',
                          fontSize: 12,
                          fontWeight: 700,
                          borderRadius: 8,
                          padding: '8px 18px',
                          textDecoration: 'none',
                          letterSpacing: '.04em',
                          whiteSpace: 'nowrap',
                        }}
                      >
                        Start →
                      </Link>
                    ) : (
                      <span style={{
                        display: 'inline-block',
                        background: 'var(--bg2)',
                        color: 'var(--muted)',
                        fontSize: 12,
                        fontWeight: 600,
                        borderRadius: 8,
                        padding: '8px 18px',
                        letterSpacing: '.04em',
                        border: '1px solid var(--border)',
                        whiteSpace: 'nowrap',
                        cursor: 'not-allowed',
                      }}>
                        Soon
                      </span>
                    )}
                  </div>

                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* ── Bottom CTA ── */}
      <div style={{
        marginTop: 56,
        background: 'linear-gradient(135deg, rgba(0,120,212,0.06) 0%, rgba(139,92,246,0.06) 100%)',
        border: '1px solid var(--border)',
        borderRadius: 14,
        padding: '36px 32px',
        textAlign: 'center',
      }}>
        <div style={{
          fontSize: 10, fontWeight: 700, letterSpacing: '.12em',
          textTransform: 'uppercase', color: '#0078d4',
          fontFamily: 'var(--font-mono)', marginBottom: 14,
        }}>
          // Ready to start?
        </div>
        <h3 style={{
          fontSize: 'clamp(18px, 2.5vw, 26px)', fontWeight: 900,
          color: 'var(--text)',
          letterSpacing: '-1px', marginBottom: 12,
        }}>
          Modules dropping every week.
        </h3>
        <p style={{ fontSize: 14, color: 'var(--muted)', lineHeight: 1.7, maxWidth: 480, margin: '0 auto 24px' }}>
          Start with Module 01 right now — no prior database knowledge needed.
          Every module builds on the previous one, in the exact order it should be learned.
        </p>
        <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link
            href="/learn/dbms/introduction"
            style={{
              display: 'inline-block',
              background: '#0078d4',
              color: '#fff',
              fontWeight: 700,
              fontSize: 13,
              borderRadius: 8,
              padding: '10px 24px',
              textDecoration: 'none',
            }}
          >
            Start Module 01 →
          </Link>
          <Link
            href="/learn/interview"
            style={{
              display: 'inline-block',
              background: 'var(--surface)',
              color: 'var(--text)',
              fontWeight: 600,
              fontSize: 13,
              borderRadius: 8,
              padding: '10px 24px',
              textDecoration: 'none',
              border: '1px solid var(--border)',
            }}
          >
            Interview Prep →
          </Link>
        </div>
      </div>

    </LearnLayout>
  )
}