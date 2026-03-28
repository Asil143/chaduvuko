'use client'

import { useState } from 'react'
import Link from 'next/link'

type Track = {
  title: string
  description: string
  href: string
  color: string
  category: string
  live: boolean
  modules: number
  level: string
}

const TRACKS: Track[] = [
  // Foundations
  {
    title: 'What is Data Engineering?',
    description: 'Start here. What DEs actually do, how data moves, and where the role fits in a tech company.',
    href: '/learn/what-is-data-engineering',
    color: '#00c2ff',
    category: 'Foundations',
    live: true,
    modules: 5,
    level: 'Beginner',
  },
  {
    title: 'Data Engineering Deep Dive',
    description: 'Pipelines, batch vs streaming, medallion architecture, distributed systems, orchestration, and the full DE toolkit.',
    href: '/learn/data-engineering',
    color: '#00c2ff',
    category: 'Foundations',
    live: true,
    modules: 48,
    level: 'Beginner → Advanced',
  },
  // Cloud
  {
    title: 'Azure Track',
    description: 'Azure Data Factory, ADLS Gen2, Databricks, Synapse Analytics, Key Vault, Event Hubs, and Microsoft Fabric.',
    href: '/learn/azure/introduction',
    color: '#0078d4',
    category: 'Cloud',
    live: true,
    modules: 8,
    level: 'Beginner → Advanced',
  },
  {
    title: 'AWS Track',
    description: 'S3, Glue, Redshift, Kinesis, Athena, EMR, Step Functions, and Lake Formation — the full AWS data stack.',
    href: '/learn/aws/introduction',
    color: '#ff9900',
    category: 'Cloud',
    live: true,
    modules: 9,
    level: 'Beginner → Advanced',
  },
  {
    title: 'GCP Track',
    description: 'BigQuery, Cloud Dataflow, Pub/Sub, and Cloud Composer — Google Cloud for data engineers.',
    href: '/learn/gcp/introduction',
    color: '#4285f4',
    category: 'Cloud',
    live: true,
    modules: 5,
    level: 'Beginner → Advanced',
  },
  // DSA & DBMS
  {
    title: 'DSA',
    description: 'Arrays, linked lists, trees, graphs, dynamic programming — everything you need for placement and FAANG interviews.',
    href: '/learn/dsa',
    color: '#8b5cf6',
    category: 'DSA & DBMS',
    live: true,
    modules: 19,
    level: 'Beginner → Advanced',
  },
  {
    title: 'DBMS',
    description: 'Relational model, normalization, transactions, concurrency control, indexes, and query processing.',
    href: '/learn/dbms',
    color: '#ec4899',
    category: 'DSA & DBMS',
    live: true,
    modules: 20,
    level: 'Beginner → Advanced',
  },
  // Projects
  {
    title: 'Azure Projects — FreshMart Series',
    description: 'Six end-to-end ADF projects on a real dataset: copy CSVs, loop across stores, date-driven runs, HTTP ingestion, file management, REST API.',
    href: '/learn/projects',
    color: '#00e676',
    category: 'Projects',
    live: true,
    modules: 6,
    level: 'Intermediate → Advanced',
  },
  // Career
  {
    title: 'Interview Prep',
    description: 'Common DE interview questions, system design patterns, SQL round preparation, and how to answer behavioural rounds.',
    href: '/learn/interview',
    color: '#ff6b6b',
    category: 'Career',
    live: true,
    modules: 1,
    level: 'Intermediate',
  },
  {
    title: 'Industry & Companies',
    description: 'Which companies are hiring, what stacks they use, and how to target your applications for the Indian market.',
    href: '/learn/industry',
    color: '#f5c542',
    category: 'Career',
    live: true,
    modules: 1,
    level: 'Beginner',
  },
  // Coming soon
  {
    title: 'AI / ML Track',
    description: 'Machine learning fundamentals, transformers, fine-tuning, and deploying models to production.',
    href: '/learn/ai-ml',
    color: '#7b61ff',
    category: 'AI & ML',
    live: false,
    modules: 0,
    level: 'Intermediate → Advanced',
  },
  {
    title: 'SQL Track',
    description: 'Window functions, CTEs, query optimisation, execution plans, and PostgreSQL internals.',
    href: '/learn/foundations/sql',
    color: '#009950',
    category: 'Foundations',
    live: false,
    modules: 0,
    level: 'Beginner → Advanced',
  },
  {
    title: 'Kafka & Streaming',
    description: 'Producers, consumers, topics, partitions, Kafka Streams, and building real-time data pipelines.',
    href: '#',
    color: '#e91e63',
    category: 'Foundations',
    live: false,
    modules: 0,
    level: 'Advanced',
  },
]

const CATEGORIES = ['All', 'Foundations', 'Cloud', 'DSA & DBMS', 'Projects', 'Career', 'AI & ML']

export default function TutorialsPage() {
  const [activeCategory, setActiveCategory] = useState('All')
  const [search, setSearch] = useState('')

  const filtered = TRACKS.filter(t => {
    const matchCat = activeCategory === 'All' || t.category === activeCategory
    const matchSearch = search === '' ||
      t.title.toLowerCase().includes(search.toLowerCase()) ||
      t.description.toLowerCase().includes(search.toLowerCase())
    return matchCat && matchSearch
  })

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)', paddingTop: 80 }}>
      {/* Page header */}
      <div style={{ borderBottom: '1px solid var(--border)', padding: '32px 32px 28px', background: 'var(--bg)' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '.12em', textTransform: 'uppercase', color: 'var(--muted)', marginBottom: 8 }}>
            All Tutorials
          </div>
          <h1 style={{ fontSize: 28, fontWeight: 900, color: 'var(--text)', margin: 0, letterSpacing: '-.5px', lineHeight: 1.15 }}>
            What do you want to learn?
          </h1>
          <p style={{ fontSize: 14, color: 'var(--muted)', marginTop: 8, marginBottom: 0 }}>
            {TRACKS.filter(t => t.live).length} live tracks · {TRACKS.reduce((a, t) => a + t.modules, 0)}+ modules · updated for 2026
          </p>
        </div>
      </div>

      {/* Body */}
      <div style={{ maxWidth: 1100, margin: '0 auto', display: 'flex', gap: 0, alignItems: 'flex-start' }}>

        {/* Sidebar */}
        <aside style={{ width: 200, flexShrink: 0, padding: '24px 16px 24px 0', position: 'sticky', top: 80 }}>
          <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '.1em', textTransform: 'uppercase', color: 'var(--muted)', marginBottom: 10, paddingLeft: 10 }}>
            Category
          </div>
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              style={{
                display: 'block',
                width: '100%',
                textAlign: 'left',
                padding: '7px 10px',
                borderRadius: 7,
                fontSize: 13,
                fontWeight: activeCategory === cat ? 700 : 400,
                background: activeCategory === cat ? 'var(--surface)' : 'transparent',
                color: activeCategory === cat ? 'var(--text)' : 'var(--muted)',
                border: activeCategory === cat ? '1px solid var(--border)' : '1px solid transparent',
                cursor: 'pointer',
                marginBottom: 2,
                transition: 'all .12s',
              }}
            >
              {cat}
            </button>
          ))}
        </aside>

        {/* Main content */}
        <main style={{ flex: 1, minWidth: 0, padding: '24px 0 48px 24px', borderLeft: '1px solid var(--border)' }}>
          {/* Search */}
          <div style={{ marginBottom: 20 }}>
            <input
              type="text"
              placeholder="Search tracks…"
              value={search}
              onChange={e => setSearch(e.target.value)}
              style={{
                width: '100%',
                padding: '9px 14px',
                borderRadius: 8,
                border: '1px solid var(--border)',
                background: 'var(--surface)',
                color: 'var(--text)',
                fontSize: 13,
                outline: 'none',
              }}
            />
          </div>

          {/* Results count */}
          <div style={{ fontSize: 11, color: 'var(--muted)', marginBottom: 16 }}>
            {filtered.length} track{filtered.length !== 1 ? 's' : ''}
            {activeCategory !== 'All' ? ` in ${activeCategory}` : ''}
            {search ? ` matching "${search}"` : ''}
          </div>

          {/* Track grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 12 }}>
            {filtered.map(track => (
              <TrackCard key={track.href + track.title} track={track} />
            ))}
          </div>

          {filtered.length === 0 && (
            <div style={{ padding: '48px 0', textAlign: 'center', color: 'var(--muted)', fontSize: 14 }}>
              No tracks match your search.
            </div>
          )}
        </main>
      </div>
    </div>
  )
}

function TrackCard({ track }: { track: Track }) {
  const card = (
    <div
      style={{
        background: 'var(--surface)',
        border: '1px solid var(--border)',
        borderLeft: `3px solid ${track.color}`,
        borderRadius: 10,
        padding: '16px 18px',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        gap: 8,
        opacity: track.live ? 1 : 0.45,
        pointerEvents: track.live ? 'auto' : 'none',
        transition: 'box-shadow .15s, transform .15s',
        cursor: track.live ? 'pointer' : 'default',
      }}
      onMouseEnter={e => {
        if (!track.live) return
        const el = e.currentTarget as HTMLDivElement
        el.style.boxShadow = `0 4px 16px rgba(0,0,0,.12)`
        el.style.transform = 'translateY(-1px)'
      }}
      onMouseLeave={e => {
        const el = e.currentTarget as HTMLDivElement
        el.style.boxShadow = 'none'
        el.style.transform = 'none'
      }}
    >
      {/* Top row */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 8 }}>
        <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: '.06em', textTransform: 'uppercase', color: track.color }}>
          {track.category}
        </span>
        {track.live ? (
          <span style={{ fontSize: 10, fontWeight: 700, padding: '2px 8px', borderRadius: 20, background: '#e6f9ed', color: '#065f2c', border: '0.5px solid #7dd4a4' }}>
            Live
          </span>
        ) : (
          <span style={{ fontSize: 10, fontWeight: 700, padding: '2px 8px', borderRadius: 20, background: 'var(--bg)', color: 'var(--muted)', border: '1px solid var(--border)' }}>
            Coming soon
          </span>
        )}
      </div>

      {/* Title */}
      <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--text)', lineHeight: 1.3 }}>
        {track.title}
      </div>

      {/* Description */}
      <div style={{ fontSize: 12, color: 'var(--muted)', lineHeight: 1.6, flex: 1 }}>
        {track.description}
      </div>

      {/* Footer */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginTop: 4 }}>
        {track.modules > 0 && (
          <span style={{ fontSize: 11, color: 'var(--muted)' }}>
            {track.modules} module{track.modules !== 1 ? 's' : ''}
          </span>
        )}
        <span style={{ fontSize: 11, color: 'var(--muted)' }}>{track.level}</span>
      </div>
    </div>
  )

  if (!track.live) return <div key={track.title}>{card}</div>

  return (
    <Link href={track.href} style={{ textDecoration: 'none', display: 'flex', flexDirection: 'column' }}>
      {card}
    </Link>
  )
}
