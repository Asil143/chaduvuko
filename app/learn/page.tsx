'use client'

import { useState } from 'react'
import Link from 'next/link'

type Cat = 'all' | 'data' | 'ai' | 'prog' | 'web' | 'cs'

const CATS: { id: Cat; label: string }[] = [
  { id: 'all',  label: 'All Tracks'    },
  { id: 'data', label: 'Data & Cloud'  },
  { id: 'ai',   label: 'AI & ML'       },
  { id: 'prog', label: 'Programming'   },
  { id: 'web',  label: 'Web Dev'       },
  { id: 'cs',   label: 'CS Core'       },
]

const TRACKS = [
  // ── Data & Cloud ───────────────────────────────────────────────────────────
  {
    cat: 'data' as Cat,
    icon: '📁', color: '#00e676',
    name: 'Data Engineering',
    desc: 'From zero to production-grade DE — pipelines, architecture, and real patterns. 47 modules.',
    pills: ['Pipelines', 'Batch', 'Streaming', 'Medallion', 'SQL', 'Python'],
    jobs: 'Data Engineer · Analytics Engineer',
    status: 'live' as const,
    href: '/learn/data-engineering',
    modules: 47,
  },
  {
    cat: 'data' as Cat,
    icon: '☁️', color: '#0078d4',
    name: 'Microsoft Azure',
    desc: 'ADF, ADLS Gen2, Databricks, Synapse, Event Hubs, Key Vault, Fabric — the full cloud track.',
    pills: ['ADF', 'ADLS Gen2', 'Databricks', 'Synapse', 'Fabric'],
    jobs: 'Cloud Engineer · Azure Data Engineer',
    status: 'live' as const,
    href: '/learn/azure/introduction',
    modules: 8,
  },
  {
    cat: 'data' as Cat,
    icon: '🟠', color: '#ff9900',
    name: 'Amazon Web Services',
    desc: 'S3, Glue, Redshift, EMR, Kinesis, Athena, Step Functions, Lake Formation.',
    pills: ['S3', 'Glue', 'Redshift', 'EMR', 'Kinesis'],
    jobs: 'AWS Developer · Cloud Engineer',
    status: 'live' as const,
    href: '/learn/aws/introduction',
    modules: 9,
  },
  {
    cat: 'data' as Cat,
    icon: '🔵', color: '#4285f4',
    name: 'Google Cloud Platform',
    desc: 'BigQuery, Dataflow, Pub/Sub, Composer — the GCP data engineering stack.',
    pills: ['BigQuery', 'Dataflow', 'Pub/Sub', 'Composer'],
    jobs: 'GCP Engineer · Data Engineer',
    status: 'live' as const,
    href: '/learn/gcp/introduction',
    modules: 5,
  },
  {
    cat: 'data' as Cat,
    icon: '🗄️', color: '#7b61ff',
    name: 'SQL & Databases',
    desc: 'The one skill every tech role needs — 60+ lessons from SELECT to advanced window functions.',
    pills: ['JOINs', 'Window Functions', 'Indexes', 'CTEs', 'Stored Procs'],
    jobs: 'Data Analyst · Backend Dev · DBA',
    status: 'live' as const,
    href: '/learn/sql',
    modules: 60,
  },
  {
    cat: 'data' as Cat,
    icon: '📊', color: '#8b5cf6',
    name: 'Data Science',
    desc: 'Python, NumPy, pandas, statistics, and predictive modeling — one live in-browser dataset from Module 01 to your capstone.',
    pills: ['pandas', 'NumPy', 'Statistics', 'Visualization', 'ML Basics'],
    jobs: 'Data Scientist · Data Analyst · BI Analyst',
    status: 'live' as const,
    href: '/learn/data-science',
    modules: 53,
  },
  // ── AI & ML ────────────────────────────────────────────────────────────────
  {
    cat: 'ai' as Cat,
    icon: '🤖', color: '#a855f7',
    name: 'AI & Machine Learning',
    desc: 'Math → Classical ML → Deep Learning → GenAI → MLOps. One complete path from zero.',
    pills: ['Classical ML', 'Deep Learning', 'NLP', 'Generative AI', 'MLOps'],
    jobs: 'ML Engineer · Data Scientist · AI Engineer',
    status: 'live' as const,
    href: '/learn/ai-ml',
    modules: null,
  },
  // ── CS Core ────────────────────────────────────────────────────────────────
  {
    cat: 'cs' as Cat,
    icon: '🧮', color: '#f97316',
    name: 'Data Structures & Algorithms',
    desc: 'Crack every technical coding round — arrays to dynamic programming.',
    pills: ['Arrays', 'Trees', 'Graphs', 'DP', 'Sorting'],
    jobs: 'Big Tech · FAANG · Product Companies',
    status: 'live' as const,
    href: '/learn/dsa',
    modules: null,
  },
  {
    cat: 'cs' as Cat,
    icon: '💾', color: '#06b6d4',
    name: 'DBMS',
    desc: 'Database theory and design — ER diagrams, normalization, transactions, and concurrency.',
    pills: ['ER Model', 'Normalization', 'ACID', 'Transactions', 'Indexes'],
    jobs: 'DBA · Backend Dev · Technical Interviews',
    status: 'live' as const,
    href: '/learn/dbms',
    modules: 20,
  },
  {
    cat: 'cs' as Cat,
    icon: '🌐', color: '#10b981',
    name: 'Networking',
    desc: 'OSI model, TCP/IP, DNS, firewalls, VPNs, zero-trust — from fundamentals to security.',
    pills: ['OSI Model', 'TCP/IP', 'DNS', 'HTTP/S', 'Firewalls'],
    jobs: 'Network Engineer · Cloud Architect · SRE',
    status: 'live' as const,
    href: '/learn/networking',
    modules: null,
  },
  {
    cat: 'cs' as Cat,
    icon: '🔒', color: '#ef4444',
    name: 'Cybersecurity',
    desc: 'Penetration testing, OWASP Top 10, SIEM, threat modelling, and security ops.',
    pills: ['Pen Testing', 'OWASP', 'SIEM', 'Zero Trust', 'Incident Response'],
    jobs: 'Security Analyst · SOC Analyst · Pen Tester',
    status: 'live' as const,
    href: '/learn/cybersecurity',
    modules: null,
  },
  // ── Programming ────────────────────────────────────────────────────────────
  {
    cat: 'prog' as Cat,
    icon: '🐍', color: '#facc15',
    name: 'Python',
    desc: 'Zero to production Python — syntax, OOP, APIs, testing, data libraries.',
    pills: ['Basics', 'OOP', 'FastAPI', 'Pandas', 'Testing'],
    jobs: 'Backend Dev · ML Engineer · Data Analyst',
    status: 'soon' as const,
    href: '/learn/foundations/python',
    modules: null,
  },
  {
    cat: 'prog' as Cat,
    icon: '☕', color: '#f97316',
    name: 'Java',
    desc: 'Core Java to Spring Boot microservices — collections, JPA, Kafka integration.',
    pills: ['OOP', 'Collections', 'Spring Boot', 'JPA', 'Kafka'],
    jobs: 'Java Dev · Backend Engineer',
    status: 'soon' as const,
    href: '#',
    modules: null,
  },
  {
    cat: 'prog' as Cat,
    icon: '💛', color: '#eab308',
    name: 'JavaScript',
    desc: 'Modern JS from fundamentals to async patterns and browser APIs.',
    pills: ['ES6+', 'Async/Await', 'DOM', 'Fetch API', 'Modules'],
    jobs: 'Frontend Dev · Full Stack Dev',
    status: 'soon' as const,
    href: '#',
    modules: null,
  },
  // ── Web Dev ────────────────────────────────────────────────────────────────
  {
    cat: 'web' as Cat,
    icon: '⚛️', color: '#38bdf8',
    name: 'React.js',
    desc: 'Component-based UI development — hooks, state, context, and production patterns.',
    pills: ['Hooks', 'Context', 'Redux', 'Testing', 'Performance'],
    jobs: 'Frontend Dev · React Developer',
    status: 'soon' as const,
    href: '#',
    modules: null,
  },
  {
    cat: 'web' as Cat,
    icon: '▲', color: '#ffffff',
    name: 'Next.js',
    desc: 'Full-stack React with App Router, SSR, SSG, and production deployment.',
    pills: ['App Router', 'SSR', 'SSG', 'API Routes', 'Vercel'],
    jobs: 'Full Stack Dev · Frontend Dev',
    status: 'soon' as const,
    href: '#',
    modules: null,
  },
  {
    cat: 'web' as Cat,
    icon: '🟢', color: '#6cc24a',
    name: 'Node.js',
    desc: 'Server-side JavaScript — Express, REST APIs, JWT auth, WebSockets.',
    pills: ['Express', 'REST APIs', 'JWT', 'WebSockets', 'Middleware'],
    jobs: 'Backend Dev · Full Stack Dev',
    status: 'soon' as const,
    href: '#',
    modules: null,
  },
]

const QUICK_LINKS = [
  { icon: '🗺️', label: 'Career Roadmaps',    href: '/learn/roadmap',   desc: '20+ role-specific roadmaps' },
  { icon: '🏗️', label: 'Real Projects',       href: '/learn/projects',  desc: '6 Azure end-to-end builds'   },
  { icon: '🎯', label: 'Interview Prep',       href: '/learn/interview', desc: 'DE, ML, SQL, System Design'  },
  { icon: '✍️', label: 'Blog',                 href: '/blog',            desc: '27 in-depth articles'        },
]

export default function LearnPage() {
  const [cat, setCat] = useState<Cat>('all')

  const filtered = cat === 'all' ? TRACKS : TRACKS.filter(t => t.cat === cat)
  const liveCount = TRACKS.filter(t => t.status === 'live').length

  return (
    <div style={{ maxWidth: 1100, margin: '0 auto', padding: '48px 24px 80px' }}>

      {/* ── Header ─────────────────────────────────────────────────────────── */}
      <div style={{ marginBottom: 48 }}>
        <div style={{
          fontSize: 11, fontWeight: 700, letterSpacing: '.12em',
          textTransform: 'uppercase', color: 'var(--green)',
          fontFamily: 'var(--font-mono)', marginBottom: 12,
        }}>
          // Learning Tracks
        </div>
        <h1 style={{
          fontSize: 'clamp(28px, 4vw, 48px)', fontWeight: 900,
          color: 'var(--text)', letterSpacing: '-2px',
          fontFamily: 'var(--font-display)', lineHeight: 1.1, marginBottom: 16,
        }}>
          Everything you need.<br />
          <span style={{ color: 'var(--green)' }}>Free. Forever.</span>
        </h1>
        <p style={{
          fontSize: 16, color: 'var(--muted)', lineHeight: 1.75,
          maxWidth: 580, marginBottom: 32,
        }}>
          Structured paths across every branch of IT — built for the US job market.
          No login walls. No paywalls. Start anywhere.
        </p>

        {/* Stats */}
        <div style={{ display: 'flex', gap: 32, flexWrap: 'wrap' }}>
          {[
            { value: `${TRACKS.length}+`, label: 'Tracks'          },
            { value: `${liveCount}`,       label: 'Live now'        },
            { value: '100+',               label: 'Hours of content' },
            { value: '$0',                 label: 'Cost forever'    },
          ].map(s => (
            <div key={s.label}>
              <div style={{
                fontSize: 28, fontWeight: 900, color: 'var(--green)',
                fontFamily: 'var(--font-display)',
              }}>{s.value}</div>
              <div style={{ fontSize: 12, color: 'var(--muted)', marginTop: 2 }}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Quick links ────────────────────────────────────────────────────── */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: 10, marginBottom: 48,
      }}>
        {QUICK_LINKS.map(q => (
          <a
            key={q.label}
            href={q.href}
            style={{
              display: 'flex', alignItems: 'center', gap: 12,
              background: 'var(--surface)', border: '1px solid var(--border)',
              borderRadius: 12, padding: '14px 16px',
              textDecoration: 'none', transition: 'border-color 0.2s',
            }}
            onMouseEnter={e => (e.currentTarget.style.borderColor = 'var(--green)')}
            onMouseLeave={e => (e.currentTarget.style.borderColor = 'var(--border)')}
          >
            <span style={{ fontSize: 22 }}>{q.icon}</span>
            <div>
              <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--text)' }}>{q.label}</div>
              <div style={{ fontSize: 11, color: 'var(--muted)', marginTop: 2 }}>{q.desc}</div>
            </div>
          </a>
        ))}
      </div>

      {/* ── Category filter ────────────────────────────────────────────────── */}
      <div style={{ marginBottom: 28 }}>
        <div style={{
          fontSize: 10, fontWeight: 700, letterSpacing: '.12em',
          textTransform: 'uppercase', color: 'var(--muted)',
          fontFamily: 'var(--font-mono)', marginBottom: 10,
        }}>
          // Filter by category
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
          {CATS.map(c => (
            <button
              key={c.id}
              onClick={() => setCat(c.id)}
              style={{
                fontSize: 12, fontWeight: 700, padding: '7px 16px',
                borderRadius: 20, cursor: 'pointer', border: '1px solid',
                fontFamily: 'var(--font-mono)', letterSpacing: '.04em',
                borderColor: cat === c.id ? 'var(--green)' : 'var(--border)',
                background: cat === c.id ? 'rgba(0,230,118,0.10)' : 'var(--surface)',
                color: cat === c.id ? 'var(--green)' : 'var(--muted)',
                transition: 'all 0.15s',
              }}
            >
              {c.label}
            </button>
          ))}
        </div>
      </div>

      {/* ── Track grid ─────────────────────────────────────────────────────── */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
        gap: 14,
      }}>
        {filtered.map(t => {
          const isLive = t.status === 'live'
          const CardTag = (isLive ? Link : 'div') as React.ElementType
          const cardTagProps = isLive ? { href: t.href } : {}
          return (
            <CardTag
              key={t.name}
              {...cardTagProps}
              style={{
                background: 'var(--surface)',
                border: '1px solid var(--border)',
                borderRadius: 14,
                overflow: 'hidden',
                opacity: isLive ? 1 : 0.72,
                display: 'flex',
                flexDirection: 'column',
                transition: 'border-color 0.2s, transform 0.2s',
                textDecoration: 'none',
                cursor: isLive ? 'pointer' : 'default',
              }}
              onMouseEnter={(e: React.MouseEvent<HTMLElement>) => {
                if (isLive) {
                  (e.currentTarget as HTMLElement).style.borderColor = t.color + '55'
                  ;(e.currentTarget as HTMLElement).style.transform = 'translateY(-2px)'
                }
              }}
              onMouseLeave={(e: React.MouseEvent<HTMLElement>) => {
                (e.currentTarget as HTMLElement).style.borderColor = 'var(--border)'
                ;(e.currentTarget as HTMLElement).style.transform = 'translateY(0)'
              }}
            >
              {/* Color bar */}
              <div style={{ height: 3, background: t.color, opacity: 0.8 }} />

              <div style={{ padding: '20px 22px', flex: 1, display: 'flex', flexDirection: 'column' }}>
                {/* Icon + name row */}
                <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 12 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <span style={{ fontSize: 26 }}>{t.icon}</span>
                    <div>
                      <div style={{ fontSize: 15, fontWeight: 800, color: 'var(--text)', fontFamily: 'var(--font-display)' }}>
                        {t.name}
                      </div>
                      {t.modules && (
                        <div style={{ fontSize: 11, color: 'var(--muted)', marginTop: 2 }}>
                          {t.modules} modules
                        </div>
                      )}
                    </div>
                  </div>
                  <span style={{
                    fontSize: 10, fontWeight: 700, letterSpacing: '.06em',
                    borderRadius: 20, padding: '3px 10px',
                    background: isLive ? 'rgba(0,230,118,0.10)' : 'var(--bg2)',
                    color: isLive ? 'var(--green)' : 'var(--muted)',
                    border: `1px solid ${isLive ? 'rgba(0,230,118,0.25)' : 'var(--border)'}`,
                    flexShrink: 0,
                  }}>
                    {isLive ? '✓ LIVE' : 'SOON'}
                  </span>
                </div>

                {/* Description */}
                <p style={{ fontSize: 13, color: 'var(--muted)', lineHeight: 1.65, marginBottom: 14, flex: 1 }}>
                  {t.desc}
                </p>

                {/* Pills */}
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5, marginBottom: 16 }}>
                  {t.pills.map(p => (
                    <span key={p} style={{
                      fontSize: 11, color: 'var(--muted)',
                      background: 'var(--bg2)', border: '1px solid var(--border)',
                      borderRadius: 20, padding: '2px 9px',
                      fontFamily: 'var(--font-mono)',
                    }}>
                      {p}
                    </span>
                  ))}
                </div>

                {/* Jobs */}
                <div style={{ fontSize: 11, color: t.color, fontWeight: 600, marginBottom: 16 }}>
                  {t.jobs}
                </div>

                {/* CTA — visual only; the whole card above is the actual link */}
                {isLive ? (
                  <div style={{
                    display: 'block', textAlign: 'center',
                    background: t.color, color: '#000',
                    fontWeight: 700, fontSize: 13,
                    borderRadius: 8, padding: '10px 0',
                    letterSpacing: '.02em',
                  }}>
                    Start Learning →
                  </div>
                ) : (
                  <div style={{
                    display: 'block', textAlign: 'center',
                    background: 'var(--bg2)', color: 'var(--muted)',
                    fontWeight: 600, fontSize: 13,
                    borderRadius: 8, padding: '10px 0',
                    border: '1px solid var(--border)', letterSpacing: '.02em',
                  }}>
                    Coming Soon
                  </div>
                )}
              </div>
            </CardTag>
          )
        })}
      </div>

      {/* ── Bottom CTA ─────────────────────────────────────────────────────── */}
      <div style={{
        marginTop: 64,
        background: 'linear-gradient(135deg, rgba(0,230,118,0.05) 0%, rgba(123,97,255,0.05) 100%)',
        border: '1px solid var(--border)',
        borderRadius: 16,
        padding: '40px 36px',
        textAlign: 'center',
      }}>
        <div style={{
          fontSize: 10, fontWeight: 700, letterSpacing: '.12em',
          textTransform: 'uppercase', color: 'var(--green)',
          fontFamily: 'var(--font-mono)', marginBottom: 14,
        }}>
          // New tracks every week
        </div>
        <h2 style={{
          fontSize: 'clamp(18px, 2.5vw, 26px)', fontWeight: 900,
          color: 'var(--text)', fontFamily: 'var(--font-display)',
          letterSpacing: '-1px', marginBottom: 12,
        }}>
          Not sure where to start?
        </h2>
        <p style={{
          fontSize: 14, color: 'var(--muted)', lineHeight: 1.75,
          maxWidth: 460, margin: '0 auto 28px',
        }}>
          If you want a job in data, start with Data Engineering. If you want to build things,
          start with SQL. Both are free, both are live now.
        </p>
        <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link href="/learn/data-engineering" style={{
            display: 'inline-block', background: 'var(--green)',
            color: '#000', fontWeight: 700, fontSize: 13,
            borderRadius: 8, padding: '11px 28px', textDecoration: 'none',
          }}>
            Start Data Engineering →
          </Link>
          <Link href="/learn/sql" style={{
            display: 'inline-block', background: 'var(--surface)',
            color: 'var(--text)', fontWeight: 600, fontSize: 13,
            borderRadius: 8, padding: '11px 28px', textDecoration: 'none',
            border: '1px solid var(--border)',
          }}>
            Start with SQL
          </Link>
          <Link href="/learn/roadmap" style={{
            display: 'inline-block', background: 'var(--surface)',
            color: 'var(--text)', fontWeight: 600, fontSize: 13,
            borderRadius: 8, padding: '11px 28px', textDecoration: 'none',
            border: '1px solid var(--border)',
          }}>
            View Roadmaps
          </Link>
        </div>
      </div>
    </div>
  )
}
