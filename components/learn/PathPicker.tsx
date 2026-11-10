'use client'

import Link from 'next/link'
import { useState } from 'react'
import type { TrackSummaries } from '@/lib/lesson-nav'
import { getCareerPath } from '@/data/career-paths'

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
  cloud: { starter: ['networking', 'python'], next: ['cloud-data', 'devops-mlops'] },
  security: { starter: ['networking', 'python'], next: ['cybersecurity', 'application-security-devsecops', 'ai-security'] },
  interviews: { starter: ['python', 'dsa'], next: ['system-design', 'sql'] },
  systems: { starter: ['python', 'dbms'], next: ['networking', 'systems-programming', 'system-design'] },
}

// Career paths matching each goal; the first is the main recommendation.
const CAREER_PATHS_FOR_GOAL: Record<Goal, string[]> = {
  ai: ['ai-engineer', 'generative-ai-developer', 'agentic-ai-engineer', 'data-scientist', 'ml-engineer', 'mlops-engineer'],
  data: ['data-engineer', 'data-analyst', 'analytics-engineer', 'cloud-data-engineer', 'database-engineer'],
  web: ['full-stack-ai-developer', 'frontend-developer', 'backend-developer', 'python-developer'],
  cloud: ['cloud-devops-engineer', 'site-reliability-engineer', 'cloud-data-engineer', 'mlops-engineer'],
  security: ['cybersecurity-analyst', 'cloud-security-engineer', 'ai-security-engineer'],
  interviews: ['software-engineer', 'backend-developer'],
  systems: ['software-engineer', 'network-engineer', 'site-reliability-engineer'],
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
  const goalPaths = result && goal ? CAREER_PATHS_FOR_GOAL[goal].flatMap(slug => getCareerPath(slug) ?? []) : []
  // Beginners see beginner-level paths first; the sort is stable, so goal order is kept otherwise.
  const careerPaths = level === 'new' ? [...goalPaths].sort((a, b) => Number(a.level !== 'Beginner') - Number(b.level !== 'Beginner')) : goalPaths
  const [mainPath, ...otherPaths] = careerPaths

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

      {mainPath && (
        <section aria-label="Recommended career path" style={{ marginBottom: 28 }}>
          <h2 style={{ color: 'var(--text)', fontSize: 20, margin: '0 0 12px' }}>Recommended career path</h2>
          <Link href={`/learn/paths/${mainPath.slug}`} style={{ display: 'block', padding: '18px 20px', borderRadius: 12, background: 'var(--surface)', border: '1px solid var(--green)', color: 'var(--text)', textDecoration: 'none' }}>
            <strong style={{ fontSize: 17 }}>{mainPath.title}</strong>
            <span style={{ display: 'block', color: 'var(--muted)', fontSize: 13, marginTop: 6, lineHeight: 1.6 }}>{mainPath.summary}</span>
            <span style={{ display: 'block', color: 'var(--green)', fontSize: 13, fontWeight: 650, marginTop: 10 }}>
              {mainPath.milestones.length} steps with progress tracking · Open the path →
            </span>
          </Link>
          {otherPaths.length > 0 && (
            <p style={{ color: 'var(--muted)', fontSize: 13, margin: '10px 0 0' }}>
              Also consider:{' '}
              {otherPaths.map((path, index) => (
                <span key={path.slug}>
                  {index > 0 && ' · '}
                  <Link href={`/learn/paths/${path.slug}`} style={{ color: 'var(--green)' }}>{path.title}</Link>
                </span>
              ))}
            </p>
          )}
        </section>
      )}

      {recommendations.length > 0 && (
        <section aria-live="polite" aria-label="Recommended tracks">
          <h2 style={{ color: 'var(--text)', fontSize: 20, margin: '0 0 12px' }}>Or follow the tracks directly</h2>
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
