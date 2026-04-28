'use client'

import { useState } from 'react'
import Link from 'next/link'
import { LearnLayout } from '@/components/content/LearnLayout'
import { Callout } from '@/components/content/Callout'

type SectionFilter = 'all' | '1' | '2' | '3' | '4' | '5'

const sections = [
  { id: 1, title: 'Foundations',             shortTitle: 'Foundations',  color: '#0078d4', difficulty: 'Beginner'     },
  { id: 2, title: 'Design & SQL',            shortTitle: 'Design & SQL', color: '#00e676', difficulty: 'Intermediate' },
  { id: 3, title: 'Internals',               shortTitle: 'Internals',    color: '#f97316', difficulty: 'Intermediate' },
  { id: 4, title: 'Advanced Theory',         shortTitle: 'Adv. Theory',  color: '#8b5cf6', difficulty: 'Advanced'     },
  { id: 5, title: 'Distributed & Interview', shortTitle: 'Distributed',  color: '#facc15', difficulty: 'Advanced'     },
]

const modules = [
  // ── Section 1 — Foundations (01–04) ────────────────────────────────────────
  {
    number: '01', section: 1, slug: 'introduction',
    title: 'Introduction to Databases & DBMS',
    desc: 'What a database actually is, the 6 problems it solves, DBMS vs Database vs Database System, types of databases, and why this shows up in every interview.',
    topics: ['What is a Database?', 'File System Problems', 'DBMS Software', 'Types of Databases', 'What DBAs Do'],
    time: '25–30 min', difficulty: 'Beginner', status: 'live' as const,
  },
  {
    number: '02', section: 1, slug: 'data-models',
    title: 'Data Models',
    desc: 'The blueprint that decides how data is stored and connected — hierarchical, network, relational, object, and document models explained with real analogies.',
    topics: ['Hierarchical Model', 'Network Model', 'Relational Model', 'Document Model', 'Why Relational Won'],
    time: '20–25 min', difficulty: 'Beginner', status: 'live' as const,
  },
  {
    number: '03', section: 1, slug: 'er-model',
    title: 'Entity-Relationship (ER) Model',
    desc: 'Design a database visually before writing a single line of SQL. Entities, attributes, relationships, cardinality, weak entities — drawn step by step.',
    topics: ['Entities & Attributes', 'Relationships & Cardinality', 'Strong vs Weak Entities', 'Drawing ER Diagrams', 'ER to Tables'],
    time: '35–40 min', difficulty: 'Beginner', status: 'live' as const,
  },
  {
    number: '04', section: 1, slug: 'relational-model',
    title: 'Relational Model & Keys',
    desc: 'Tables, tuples, domains, integrity constraints — and every type of key explained clearly: Super, Candidate, Primary, Foreign, Composite, Surrogate.',
    topics: ['Relations & Tuples', 'Schema vs Instance', 'Super & Candidate Keys', 'Primary & Foreign Keys', 'Integrity Constraints'],
    time: '30–35 min', difficulty: 'Beginner', status: 'live' as const,
  },
  // ── Section 2 — Design & SQL (05–08) ───────────────────────────────────────
  {
    number: '05', section: 2, slug: 'normalization',
    title: 'Normalization — 1NF to 5NF',
    desc: 'The most important theory topic in DBMS. Eliminate every database design mistake before it causes real problems — insert, update, and delete anomalies explained.',
    topics: ['Insert/Update/Delete Anomalies', '1NF · 2NF · 3NF', 'BCNF · 4NF · 5NF', 'Step-by-Step Normalization', 'When to Denormalize'],
    time: '45–55 min', difficulty: 'Intermediate', status: 'live' as const,
  },
  {
    number: '06', section: 2, slug: 'functional-dependencies',
    title: 'Functional Dependencies',
    desc: "The math behind normalization. X → Y means X determines Y. Armstrong's Axioms, attribute closure, canonical cover, and finding candidate keys using FDs.",
    topics: ["Armstrong's Axioms", 'Trivial vs Non-Trivial FDs', 'Attribute Closure (F+)', 'Canonical Cover', 'Finding Candidate Keys'],
    time: '30–35 min', difficulty: 'Intermediate', status: 'live' as const,
  },
  {
    number: '07', section: 2, slug: 'sql-complete',
    title: 'SQL — Complete Guide',
    desc: 'From your very first SELECT to window functions and recursive CTEs. DDL, DML, DCL, TCL, all joins, subqueries, aggregations, GROUP BY, HAVING — nothing skipped.',
    topics: ['DDL · DML · DCL · TCL', 'SELECT & WHERE', 'All JOIN Types', 'Window Functions', 'CTEs & Subqueries'],
    time: '90–120 min', difficulty: 'Beginner → Advanced', status: 'live' as const,
  },
  {
    number: '08', section: 2, slug: 'indexes',
    title: 'Indexes',
    desc: 'Why queries slow down at scale, how indexes fix it, B+ tree vs hash index, clustered vs non-clustered, covering indexes, and when NOT to add an index.',
    topics: ['How Indexes Work', 'B+ Tree Index', 'Clustered vs Non-Clustered', 'Composite & Covering Indexes', 'When NOT to Index'],
    time: '35–40 min', difficulty: 'Intermediate', status: 'live' as const,
  },
  // ── Section 3 — Internals (09–12) ──────────────────────────────────────────
  {
    number: '09', section: 3, slug: 'transactions',
    title: 'Transactions & ACID Properties',
    desc: 'All-or-nothing units of work. The bank transfer example that makes ACID click instantly — Atomicity, Consistency, Isolation, Durability — with real failure scenarios.',
    topics: ['What is a Transaction?', 'Atomicity', 'Consistency', 'Isolation', 'Durability · COMMIT · ROLLBACK'],
    time: '30–35 min', difficulty: 'Intermediate', status: 'live' as const,
  },
  {
    number: '10', section: 3, slug: 'concurrency-control',
    title: 'Concurrency Control',
    desc: 'How databases handle thousands of simultaneous users safely. Locks, deadlocks, isolation levels, Two-Phase Locking, and MVCC — the engine inside PostgreSQL.',
    topics: ['Lost Update · Dirty Read · Phantom Read', 'Shared & Exclusive Locks', 'Two-Phase Locking (2PL)', 'Deadlock Detection', 'Isolation Levels · MVCC'],
    time: '40–45 min', difficulty: 'Intermediate', status: 'live' as const,
  },
  {
    number: '11', section: 3, slug: 'query-processing',
    title: 'Query Processing & Optimization',
    desc: 'What actually happens the moment you press Enter on a query — parsing, planning, optimization, execution. Then how to make it 10x faster using EXPLAIN.',
    topics: ['Parsing → Planning → Execution', 'Query Optimizer', 'EXPLAIN & EXPLAIN ANALYZE', 'Sequential vs Index Scan', 'Real Optimization Examples'],
    time: '35–40 min', difficulty: 'Intermediate', status: 'live' as const,
  },
  {
    number: '12', section: 3, slug: 'storage-file-organization',
    title: 'Storage & File Organization',
    desc: 'How data physically lives on disk — blocks, pages, buffer pool, heap files, sequential files. Understanding this is what separates developers from engineers.',
    topics: ['Blocks & Pages', 'Buffer Pool & Cache', 'Heap File Organization', 'Sequential & Hash Organization', 'Why This Affects Query Speed'],
    time: '30–35 min', difficulty: 'Intermediate', status: 'live' as const,
  },
  // ── Section 4 — Advanced Theory (13–16) ────────────────────────────────────
  {
    number: '13', section: 4, slug: 'hashing-btrees',
    title: 'Hashing & B+ Trees',
    desc: 'The two most important data structures inside every database. Static and dynamic hashing for fast lookups, B+ tree structure for range queries and indexes.',
    topics: ['Static & Dynamic Hashing', 'Collision Handling', 'B+ Tree Structure', 'Search · Insert · Delete', 'Why B+ Tree is the Standard'],
    time: '40–45 min', difficulty: 'Intermediate', status: 'live' as const,
  },
  {
    number: '14', section: 4, slug: 'relational-algebra',
    title: 'Relational Algebra',
    desc: 'The mathematics SQL is built on. Select, Project, Join, Union, Difference, Division — shown with plain English explanations and direct SQL equivalents.',
    topics: ['Select (σ) & Project (π)', 'Union · Intersection · Difference', 'Cartesian Product & Join', 'Division (÷)', 'Mapping RA to SQL'],
    time: '30–35 min', difficulty: 'Intermediate', status: 'live' as const,
  },
  {
    number: '15', section: 4, slug: 'views-procedures-triggers',
    title: 'Views, Stored Procedures & Triggers',
    desc: 'Database objects that encapsulate logic — virtual tables, pre-compiled SQL procedures, and triggers that run automatically on INSERT/UPDATE/DELETE.',
    topics: ['Views & Materialized Views', 'Stored Procedures vs Functions', 'Triggers — BEFORE & AFTER', 'Cursors', 'Real Use Cases at Companies'],
    time: '35–40 min', difficulty: 'Intermediate', status: 'live' as const,
  },
  {
    number: '16', section: 4, slug: 'crash-recovery',
    title: 'Crash Recovery',
    desc: 'How databases survive power failures, OS crashes, and hardware failures without losing a single committed transaction. WAL, checkpoints, and the ARIES algorithm.',
    topics: ['Write-Ahead Logging (WAL)', 'Undo & Redo Logs', 'Checkpoints', 'ARIES Algorithm', 'What Happens at 3am When DB Crashes'],
    time: '30–35 min', difficulty: 'Advanced', status: 'live' as const,
  },
  // ── Section 5 — Distributed & Interview (17–20) ────────────────────────────
  {
    number: '17', section: 5, slug: 'distributed-databases',
    title: 'Distributed Databases & CAP Theorem',
    desc: 'Data across multiple machines — fragmentation, replication, two-section commit, and the CAP theorem that every system design interview asks about.',
    topics: ['Horizontal & Vertical Fragmentation', 'Replication Strategies', 'Two-Phase Commit (2PC)', 'CAP Theorem', 'CA · CP · AP Real Examples'],
    time: '35–40 min', difficulty: 'Advanced', status: 'live' as const,
  },
  {
    number: '18', section: 5, slug: 'nosql-databases',
    title: 'NoSQL Databases',
    desc: 'When and why to break away from relational — MongoDB, Redis, Cassandra, Neo4j explained clearly. The SQL vs NoSQL decision framework for real projects.',
    topics: ['Document Stores — MongoDB', 'Key-Value — Redis', 'Column-Family — Cassandra', 'Graph — Neo4j', 'SQL vs NoSQL Decision Framework'],
    time: '35–40 min', difficulty: 'Advanced', status: 'live' as const,
  },
  {
    number: '19', section: 5, slug: 'database-security',
    title: 'Database Security',
    desc: 'Protecting data at every layer — authentication, authorization, roles, SQL injection attacks and exactly how to prevent them, encryption, and auditing.',
    topics: ['Authentication vs Authorization', 'GRANT & REVOKE', 'SQL Injection — How & Prevention', 'Encryption at Rest & in Transit', 'Auditing & Row-Level Security'],
    time: '25–30 min', difficulty: 'Intermediate', status: 'live' as const,
  },
  {
    number: '20', section: 5, slug: 'interview-questions',
    title: 'Interview Questions — All 60',
    desc: '60 DBMS questions categorized by company type. Accenture/KPMG/Deloitte for campus placements, Amazon/DoorDash for product companies, and GATE-level for competitive exams.',
    topics: ['Service Company Questions (Accenture, KPMG)', 'Product Company Questions (Amazon, DoorDash)', 'GATE CS Level Questions', 'System Design DB Questions', 'Answers with Explanations'],
    time: '60–90 min', difficulty: 'All Levels', status: 'live' as const,
  },
]

export default function DBMSTrackPage() {
  const [activeSection, setActiveSection] = useState<SectionFilter>('all')

  const filtered = activeSection === 'all'
    ? modules
    : modules.filter(m => m.section === parseInt(activeSection))

  const totalCount = modules.length
  const liveCount  = modules.filter(m => m.status === 'live').length
  const totalMinutes = modules.reduce((sum, m) => {
    const parts = m.time.match(/\d+/g) ?? ['0']
    const avg = parts.length > 1 ? (parseInt(parts[0]) + parseInt(parts[1])) / 2 : parseInt(parts[0])
    return sum + avg
  }, 0)
  const totalHours = Math.round(totalMinutes / 60)

  return (
    <LearnLayout
      title="Database Management Systems (DBMS)"
      description="Complete track from absolute zero — ER diagrams, normalization, SQL, indexes, transactions, B+ trees, distributed databases, NoSQL, and interview prep."
      section="CS Core"
      readTime="Self-paced"
      updatedAt="March 2026"
    >

      {/* ── Stats Bar ── */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, marginBottom: 36 }}>
        {[
          { label: 'Modules',      value: `${totalCount}` },
          { label: 'Live Now',     value: `${liveCount}`  },
          { label: 'Total Hours',  value: `~${totalHours}h` },
          { label: 'Coverage',     value: 'GATE + Placements' },
          { label: 'Prerequisite', value: 'None' },
        ].map(s => (
          <div key={s.label} style={{
            background: 'var(--surface)', border: '1px solid var(--border)',
            borderRadius: 8, padding: '10px 16px',
            display: 'flex', flexDirection: 'column', gap: 2,
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

      <Callout type="info">
        <strong>No prior knowledge needed — zero.</strong> This track is built for freshers, career switchers,
        and non-IT backgrounds. If you know what a spreadsheet is, you have everything you need to start.
        DBMS is taught in every CS/IT degree — but most explanations are textbook-heavy and confusing.
        This track explains it the way a senior engineer would explain it to you over chai.
      </Callout>

      {/* ── What makes this different ── */}
      <div style={{ marginBottom: 40, marginTop: 32 }}>
        <div style={{ fontSize: 10, color: 'var(--muted)', letterSpacing: '.12em', textTransform: 'uppercase', fontFamily: 'var(--font-mono)', fontWeight: 700, marginBottom: 16 }}>
          What makes this different
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 16 }}>
          {[
            { icon: '◎', title: 'GATE + Placement Ready',    desc: 'Every topic mapped to GATE syllabus, campus placement rounds, and product company interviews — one track covers all three.', color: '#ec4899' },
            { icon: '⊞', title: 'Visual Theory Diagrams',    desc: 'ER diagrams, B+ trees, lock graphs, and ARIES recovery drawn step by step — not just textbook definitions.', color: '#0078d4' },
            { icon: '▶', title: '60 Interview Questions',     desc: 'A full module of categorized Q&A — service companies, product companies, and GATE-level questions with complete answers.', color: '#00e676', href: '/learn/dbms/interview-questions' },
            { icon: '≡', title: 'Theory + SQL Together',      desc: 'DBMS theory and SQL practice taught in the same track so you understand why the syntax works, not just how to write it.', color: '#8b5cf6' },
          ].map(f => (
            <div key={f.title} style={{
              background: 'var(--surface)', border: '1px solid var(--border)',
              borderRadius: 10, padding: '20px',
            }}>
              <div style={{ fontSize: 20, color: f.color, marginBottom: 12 }}>{f.icon}</div>
              <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--text)', marginBottom: 8 }}>{f.title}</div>
              <div style={{ fontSize: 13, color: 'var(--muted)', lineHeight: 1.7, marginBottom: f.href ? 12 : 0 }}>{f.desc}</div>
              {f.href && (
                <a href={f.href} style={{ fontSize: 12, color: f.color, textDecoration: 'none', fontWeight: 600 }}>Open →</a>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* ── Curriculum heading + section filter ── */}
      <div style={{ marginTop: 48, marginBottom: 8 }}>
        <div style={{
          fontSize: 10, fontWeight: 700, letterSpacing: '.12em',
          textTransform: 'uppercase', color: 'var(--muted)',
          fontFamily: 'var(--font-mono)', marginBottom: 10,
        }}>
          // Curriculum
        </div>

        <div style={{ marginBottom: 6 }}>
          <div style={{ marginBottom: 14 }}>
            <h2 style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(20px, 3vw, 28px)',
              fontWeight: 900, letterSpacing: '-1px',
              color: 'var(--text)', margin: 0,
            }}>
              20 Modules. Zero to Advanced.
            </h2>
          </div>

          {/* Filter tabs */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 12, flexWrap: 'nowrap' }}>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
              {(['all', '1', '2', '3', '4', '5'] as SectionFilter[]).map(f => {
                const section = sections.find(p => String(p.id) === f)
                const isActive = activeSection === f
                const color = section?.color ?? 'var(--accent)'
                return (
                  <button
                    key={f}
                    onClick={() => setActiveSection(f)}
                    style={{
                      fontSize: 11, fontWeight: 700,
                      fontFamily: 'var(--font-mono)',
                      padding: '5px 12px', borderRadius: 6,
                      border: isActive ? `1px solid ${color}` : '1px solid var(--border)',
                      background: isActive ? `${color}18` : 'var(--surface)',
                      color: isActive ? color : 'var(--muted)',
                      cursor: 'pointer', transition: 'all 0.15s',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {f === 'all' ? 'All' : `Section ${f}`}
                  </button>
                )
              })}
            </div>
            <span style={{ fontSize: 12, color: 'var(--muted)', fontFamily: 'var(--font-mono)', whiteSpace: 'nowrap', flexShrink: 0 }}>
              {filtered.length} modules
            </span>
          </div>
        </div>
      </div>

      {/* ── Module Cards ── */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginTop: 16 }}>
        {filtered.map((mod, i) => {
          const section = sections.find(p => p.id === mod.section)!
          const color = section.color
          const isLive = mod.status === 'live'
          const prevMod = filtered[i - 1]
          const showHeader = activeSection === 'all' && (i === 0 || prevMod.section !== mod.section)

          return (
            <div key={mod.number}>
              {/* Section separator */}
              {showHeader && (
                <div style={{
                  display: 'flex', alignItems: 'center', gap: 10,
                  marginTop: i === 0 ? 0 : 24, marginBottom: 10,
                }}>
                  <span style={{
                    fontSize: 10, fontWeight: 700, letterSpacing: '.1em',
                    textTransform: 'uppercase', color, fontFamily: 'var(--font-mono)',
                  }}>
                    Section {mod.section} — {section.title}
                  </span>
                  <span style={{ fontSize: 10, color: 'var(--muted)', fontFamily: 'var(--font-mono)' }}>
                    · {modules.filter(m => m.section === mod.section).length} modules
                  </span>
                </div>
              )}

              {/* Card */}
              <div style={{
                background: 'var(--surface)',
                border: '1px solid var(--border)',
                borderRadius: 12,
                overflow: 'hidden',
                opacity: isLive ? 1 : 0.88,
                transition: 'border-color 0.2s',
              }}>
                <div style={{ height: 3, background: color, opacity: 0.75 }} />

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
                          color, background: `${color}18`, border: `1px solid ${color}33`,
                          borderRadius: 6, padding: '3px 8px',
                        }}>
                          MODULE {mod.number}
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
                        {mod.desc}
                      </p>

                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                        {mod.topics.map(t => (
                          <span key={t} style={{
                            fontSize: 11, color: 'var(--muted)',
                            background: 'var(--bg2)', border: '1px solid var(--border)',
                            borderRadius: 20, padding: '3px 10px',
                            fontFamily: 'var(--font-mono)',
                          }}>
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Right — time + difficulty + CTA */}
                    <div style={{
                      display: 'flex', flexDirection: 'column',
                      alignItems: 'flex-end', gap: 10, paddingTop: 4,
                    }}>
                      <div style={{ textAlign: 'right' }}>
                        <div style={{ fontSize: 12, color: 'var(--muted)', marginBottom: 6 }}>
                          ⏱ {mod.time}
                        </div>
                        <div style={{
                          fontSize: 11, fontWeight: 600,
                          color, background: `${color}12`,
                          border: `1px solid ${color}30`,
                          borderRadius: 4, padding: '2px 8px',
                          fontFamily: 'var(--font-mono)', display: 'inline-block',
                        }}>
                          {mod.difficulty}
                        </div>
                      </div>

                      {isLive ? (
                        <Link href={`/learn/dbms/${mod.slug}`} style={{
                          display: 'inline-block', background: color, color: '#000',
                          fontSize: 12, fontWeight: 700, borderRadius: 8,
                          padding: '8px 18px', textDecoration: 'none',
                          letterSpacing: '.04em', whiteSpace: 'nowrap',
                        }}>
                          Start →
                        </Link>
                      ) : (
                        <span style={{
                          display: 'inline-block', background: 'var(--bg2)',
                          color: 'var(--muted)', fontSize: 12, fontWeight: 600,
                          borderRadius: 8, padding: '8px 18px',
                          letterSpacing: '.04em', border: '1px solid var(--border)',
                          whiteSpace: 'nowrap', cursor: 'not-allowed',
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

      {/* ── Bottom CTA ── */}
      <div style={{
        marginTop: 56,
        background: 'linear-gradient(135deg, rgba(0,120,212,0.06) 0%, rgba(139,92,246,0.06) 100%)',
        border: '1px solid var(--border)',
        borderRadius: 14, padding: '36px 32px', textAlign: 'center',
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
          color: 'var(--text)', letterSpacing: '-1px', marginBottom: 12,
        }}>
          20 modules. Zero to exam-ready.
        </h3>
        <p style={{ fontSize: 14, color: 'var(--muted)', lineHeight: 1.7, maxWidth: 480, margin: '0 auto 24px' }}>
          Start with Module 01 right now — no prior database knowledge needed.
          Every module builds on the previous one, in the exact order it should be learned.
        </p>
        <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link href="/learn/dbms/introduction" style={{
            display: 'inline-block', background: '#0078d4', color: '#fff',
            fontWeight: 700, fontSize: 13, borderRadius: 8,
            padding: '10px 24px', textDecoration: 'none',
          }}>
            Start Module 01 →
          </Link>
          <Link href="/learn/interview" style={{
            display: 'inline-block', background: 'var(--surface)', color: 'var(--text)',
            fontWeight: 600, fontSize: 13, borderRadius: 8,
            padding: '10px 24px', textDecoration: 'none',
            border: '1px solid var(--border)',
          }}>
            Interview Prep →
          </Link>
        </div>
      </div>

    </LearnLayout>
  )
}
