'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ALL_SUBJECTS } from '@/data/subjects/index'

const CATEGORIES = [
  { id: 'all',          label: 'Everything',           color: '#555' },
  { id: 'school',       label: 'Class 5–10',           color: '#e05c00' },
  { id: 'intermediate', label: 'Class 11–12',          color: '#7b61ff' },
  { id: 'competitive',  label: 'Competitive exams',    color: '#dc2626' },
  { id: 'btech',        label: 'B.Tech / Engineering', color: '#0078d4' },
  { id: 'tech',         label: 'Technology & IT',      color: '#009950' },
]

function subjectHref(s: (typeof ALL_SUBJECTS)[0]): string {
  if (s.category === 'school' || s.category === 'intermediate') return `/learn/${s.category}/${s.classSlug}/${s.slug}`
  if (s.category === 'competitive') return `/learn/competitive/${s.exam}/${s.slug}`
  if (s.category === 'btech') return `/learn/btech/${s.branch}/${s.slug}`
  return `/learn/${s.category}/${s.slug}`
}

export default function TutorialsPage() {
  const [active, setActive] = useState('all')
  const [query, setQuery] = useState('')

  const filtered = ALL_SUBJECTS.filter(s => {
    const matchCat = active === 'all' || s.category === active
    const q = query.toLowerCase()
    const matchQ = !q || s.name.toLowerCase().includes(q) || s.description.toLowerCase().includes(q) || (s.className || '').toLowerCase().includes(q)
    return matchCat && matchQ
  })

  const liveCount = filtered.filter(s => s.live).length
  const totalCount = filtered.length

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)' }}>

      {/* Header */}
      <div style={{ borderBottom: '1px solid var(--border)', background: 'var(--bg2)', padding: '32px 24px 24px' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <div style={{ fontSize: 10, fontWeight: 800, letterSpacing: '.14em', textTransform: 'uppercase', color: 'var(--muted)', marginBottom: 10 }}>All tutorials</div>
          <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16, marginBottom: 20 }}>
            <h1 style={{ fontSize: 'clamp(24px,3.5vw,40px)', fontWeight: 900, letterSpacing: '-1.5px', color: 'var(--text)', lineHeight: 1.1 }}>
              One platform.<br />
              <span style={{ color: '#009950' }}>Every subject.</span>
            </h1>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 10, padding: '8px 14px' }}>
              <svg width="13" height="13" viewBox="0 0 16 16" fill="none" style={{ flexShrink: 0 }}>
                <circle cx="7" cy="7" r="5" stroke="currentColor" strokeWidth="1.5" />
                <path d="m11 11 3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
              <input
                value={query}
                onChange={e => setQuery(e.target.value)}
                placeholder="Search any subject..."
                style={{ border: 'none', background: 'transparent', fontSize: 13, color: 'var(--text)', outline: 'none', width: 200, fontFamily: 'inherit' }}
              />
            </div>
          </div>

          {/* Category filters */}
          <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
            {CATEGORIES.map(cat => (
              <button
                key={cat.id}
                onClick={() => setActive(cat.id)}
                style={{ display: 'inline-flex', alignItems: 'center', gap: 7, padding: '6px 14px', borderRadius: 20, fontSize: 12, fontWeight: active === cat.id ? 700 : 400, cursor: 'pointer', border: `1.5px solid ${active === cat.id ? cat.color : 'var(--border)'}`, background: active === cat.id ? cat.color + '12' : 'transparent', color: active === cat.id ? cat.color : 'var(--muted)', transition: 'all .12s' }}
              >
                <span style={{ width: 7, height: 7, borderRadius: 2, background: cat.color, flexShrink: 0 }} />
                {cat.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Grid */}
      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '28px 24px' }}>

        {/* Stats */}
        <div style={{ fontSize: 12, color: 'var(--muted)', marginBottom: 20 }}>
          Showing <b style={{ color: 'var(--text)' }}>{totalCount}</b> subjects
          {liveCount > 0 && <> · <span style={{ color: '#009950', fontWeight: 700 }}>{liveCount} live</span></>}
          {query && <> for "<b style={{ color: 'var(--text)' }}>{query}</b>"</>}
        </div>

        {filtered.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '60px 0', color: 'var(--muted)', fontSize: 14 }}>
            No subjects found for "<b>{query}</b>"
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(240px,1fr))', gap: 10 }}>
            {[...filtered.filter(s => s.live), ...filtered.filter(s => !s.live)].map((s, i) => (
              s.live ? (
                <Link key={i} href={subjectHref(s)} style={{ textDecoration: 'none' }}>
                  <div style={{ background: 'var(--surface)', borderRadius: 10, padding: '14px 16px', border: '1px solid var(--border)', borderLeft: `3px solid ${s.color}`, cursor: 'pointer', transition: 'background .1s', height: '100%' }}>
                    {s.className && (
                      <div style={{ fontSize: 9, fontWeight: 800, letterSpacing: '.1em', textTransform: 'uppercase', color: s.color, marginBottom: 4 }}>{s.className}</div>
                    )}
                    <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 8, marginBottom: 6 }}>
                      <span style={{ fontSize: 13, fontWeight: 700, color: 'var(--text)', lineHeight: 1.25 }}>{s.name}</span>
                      <span style={{ fontSize: 9, fontWeight: 700, padding: '2px 7px', borderRadius: 20, background: '#d4f5e2', color: '#065f2c', border: '1px solid #7dd4a4', flexShrink: 0 }}>Live</span>
                    </div>
                    <div style={{ fontSize: 11, color: 'var(--muted)', lineHeight: 1.5, marginBottom: 10 }}>{s.description.slice(0, 80)}...</div>
                    <div style={{ display: 'flex', gap: 5, flexWrap: 'wrap' }}>
                      <span style={{ fontSize: 10, color: 'var(--muted)', background: 'var(--bg)', padding: '2px 8px', borderRadius: 20, border: '1px solid var(--border)' }}>{s.level}</span>
                      <span style={{ fontSize: 10, color: 'var(--muted)', background: 'var(--bg)', padding: '2px 8px', borderRadius: 20, border: '1px solid var(--border)' }}>{s.chapters.length} chapters</span>
                    </div>
                  </div>
                </Link>
              ) : (
                <div key={i} style={{ background: 'var(--surface)', borderRadius: 10, padding: '14px 16px', border: '1px solid var(--border)', borderLeft: `3px solid ${s.color}40`, opacity: 0.5, height: '100%' }}>
                  {s.className && (
                    <div style={{ fontSize: 9, fontWeight: 800, letterSpacing: '.1em', textTransform: 'uppercase', color: s.color, marginBottom: 4, opacity: 0.7 }}>{s.className}</div>
                  )}
                  <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 8, marginBottom: 6 }}>
                    <span style={{ fontSize: 13, fontWeight: 700, color: 'var(--text)', lineHeight: 1.25 }}>{s.name}</span>
                    <span style={{ fontSize: 9, fontWeight: 700, padding: '2px 7px', borderRadius: 20, background: 'var(--bg2)', color: 'var(--muted)', border: '1px solid var(--border)', flexShrink: 0 }}>Soon</span>
                  </div>
                  <div style={{ fontSize: 11, color: 'var(--muted)', lineHeight: 1.5, marginBottom: 10 }}>{s.description.slice(0, 80)}...</div>
                  <div style={{ display: 'flex', gap: 5 }}>
                    <span style={{ fontSize: 10, color: 'var(--muted)', background: 'var(--bg)', padding: '2px 8px', borderRadius: 20, border: '1px solid var(--border)' }}>{s.level}</span>
                  </div>
                </div>
              )
            ))}
          </div>
        )}
      </div>
    </div>
  )
}