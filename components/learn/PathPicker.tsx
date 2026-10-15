'use client'

import Link from 'next/link'
import { useState } from 'react'
import type { TrackSummaries } from '@/lib/lesson-nav'

type Goal = 'ai' | 'data' | 'web' | 'cloud' | 'security' | 'interviews' | 'systems'
type Level = 'new' | 'some' | 'working'

const GOALS: { id: Goal; icon: string; label: string; hint: string }[] = [
  { id: 'ai', icon: '🤖', label: 'Build AI applications', hint: 'LLMs, RAG, agents, machine learning' },
  { id: 'data', icon: '📁', label: 'Work with data', hint: 'Pipelines, SQL, analytics, warehouses' },
  { id: 'web', icon: '🧩', label: 'Build websites and apps', hint: 'Frontend, backend, mobile' },
  { id: 'cloud', icon: '☁️', label: 'Run systems in the cloud', hint: 'AWS, Azure, GCP, DevOps, Kubernetes' },
  { id: 'security', icon: '🔒', label: 'Secure systems', hint: 'Cybersecurity and AI security' },
  { id: 'interviews', icon: '🎯', label: 'Prepare for coding interviews', hint: 'DSA, system design, SQL' },
  { id: 'systems', icon: '⚙️', label: 'Understand computers deeply', hint: 'Operating systems, networks, low-level programming' },
]

const LEVELS: { id: Level; label: string; hint: string }[] = [
  { id: 'new', label: 'Completely new', hint: 'I have not programmed before' },
  { id: 'some', label: 'Some experience', hint: 'I know the basics of a language or tool' },
  { id: 'working', label: 'Working professional', hint: 'I want to move deeper or change direction' },
]

// Ordered from the entry point to more specialised follow-ups.
const PATHS: Record<Goal, { starter: string[]; next: string[] }> = {
  ai: { starter: ['python', 'ai-ml'], next: ['generative-ai', 'agentic-ai', 'ai-security'] },
  data: { starter: ['sql', 'python'], next: ['data-engineering', 'database-engineering', 'analytics-engineering-data-analytics'] },
  web: { starter: ['html-css', 'javascript'], next: ['full-stack-ai', 'java', 'mobile-development'] },
  cloud: { starter: ['networking', 'python'], next: ['aws', 'azure', 'gcp', 'devops-mlops'] },
  security: { starter: ['networking', 'python'], next: ['cybersecurity', 'application-security-devsecops', 'ai-security'] },
  interviews: { starter: ['python', 'dsa'], next: ['system-design', 'sql'] },
  systems: { starter: ['python', 'dbms'], next: ['networking', 'systems-programming', 'system-design'] },
}

export function PathPicker({ tracks }: { tracks: TrackSummaries }) {
  const [goal, setGoal] = useState<Goal | null>(null)
  const [level, setLevel] = useState<Level | null>(null)

  const result = goal && level ? PATHS[goal] : null
  const ordered = result
    ? level === 'new'
      ? [...result.starter, ...result.next]
      : level === 'some'
        ? [...result.starter.slice(-1), ...result.next]
        : result.next
    : []
  const recommendations = Array.from(new Set(ordered)).filter(slug => tracks[slug])

  const choice = (selected: boolean): React.CSSProperties => ({
    textAlign: 'left', padding: '14px 16px', borderRadius: 10, cursor: 'pointer',
    background: selected ? 'rgba(0,230,118,.12)' : 'var(--surface)',
    border: `1px solid ${selected ? 'var(--green)' : 'var(--border)'}`, color: 'var(--text)',
  })

  return (
    <div>
      <fieldset style={{ border: 0, padding: 0, margin: '0 0 28px' }}>
        <legend style={{ color: 'var(--text)', fontWeight: 700, fontSize: 18, marginBottom: 12 }}>1. What do you want to do?</legend>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(260px, 100%), 1fr))', gap: 10 }}>
          {GOALS.map(item => (
            <button key={item.id} type="button" aria-pressed={goal === item.id} onClick={() => setGoal(item.id)} style={choice(goal === item.id)}>
              <div style={{ fontWeight: 650 }}><span aria-hidden="true">{item.icon}</span> {item.label}</div>
              <div style={{ color: 'var(--muted)', fontSize: 12, marginTop: 4 }}>{item.hint}</div>
            </button>
          ))}
        </div>
      </fieldset>

      <fieldset style={{ border: 0, padding: 0, margin: '0 0 28px' }}>
        <legend style={{ color: 'var(--text)', fontWeight: 700, fontSize: 18, marginBottom: 12 }}>2. Where are you now?</legend>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(260px, 100%), 1fr))', gap: 10 }}>
          {LEVELS.map(item => (
            <button key={item.id} type="button" aria-pressed={level === item.id} onClick={() => setLevel(item.id)} style={choice(level === item.id)}>
              <div style={{ fontWeight: 650 }}>{item.label}</div>
              <div style={{ color: 'var(--muted)', fontSize: 12, marginTop: 4 }}>{item.hint}</div>
            </button>
          ))}
        </div>
      </fieldset>

      {recommendations.length > 0 && (
        <section aria-live="polite" aria-label="Recommended tracks">
          <h2 style={{ color: 'var(--text)', fontSize: 20, margin: '0 0 12px' }}>Your suggested order</h2>
          <ol style={{ display: 'grid', gap: 10, padding: 0, margin: 0, listStyle: 'none' }}>
            {recommendations.map((slug, index) => {
              const track = tracks[slug]
              const live = track.lessons > 0 && track.status !== 'coming-soon'
              return (
                <li key={slug}>
                  <Link href={track.href} style={{ display: 'flex', gap: 14, alignItems: 'center', padding: '14px 16px', borderRadius: 10, background: 'var(--surface)', border: '1px solid var(--border)', color: 'var(--text)', textDecoration: 'none' }}>
                    <span style={{ fontWeight: 800, color: 'var(--green)', minWidth: 22 }}>{index + 1}</span>
                    <span style={{ flex: 1 }}>
                      <strong>{track.title}</strong>
                      <span style={{ display: 'block', color: 'var(--muted)', fontSize: 12, marginTop: 2 }}>
                        {live ? `${track.lessons} published lessons` : 'Skills map available · lessons coming soon'}
                      </span>
                    </span>
                    <span aria-hidden="true">→</span>
                  </Link>
                </li>
              )
            })}
          </ol>
        </section>
      )}
    </div>
  )
}
