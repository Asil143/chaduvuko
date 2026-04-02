

import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Learning Roadmaps — Chaduvuko',
  description: 'Interactive skill-tree roadmaps for every tech role. Track your progress, earn XP, and unlock India salary data as you learn.',
}

const roadmaps = [
  { slug: 'data-engineer',            title: 'Data Engineer',            subtitle: 'From zero to job-ready',                  level: 'Beginner → Advanced', time: '3–5 months', nodes: 19,  color: '#0078d4', live: true  },
  { slug: 'ml-engineer',              title: 'ML Engineer',              subtitle: 'Classical ML to production LLMs',          level: 'Intermediate',        time: '4–6 months', nodes: 15,  color: '#7b61ff', live: true  },
  { slug: 'ai-engineer',              title: 'AI Engineer',              subtitle: 'Build and ship AI-powered products',       level: 'Intermediate',        time: '4–6 months', nodes: 14,  color: '#a855f7', live: true  },
  { slug: 'genai-developer',          title: 'GenAI Developer',          subtitle: 'LLM-powered apps from scratch',           level: 'Intermediate',        time: '3–5 months', nodes: 14,  color: '#ec4899', live: true  },
  { slug: 'data-scientist',           title: 'Data Scientist',           subtitle: 'Stats, Python, and storytelling',         level: 'Beginner',            time: '4–6 months', nodes: 15,  color: '#4285f4', live: true  },
  { slug: 'analytics-engineer',       title: 'Analytics Engineer',       subtitle: 'dbt, modelling, and the analytics stack', level: 'Beginner',            time: '3–5 months', nodes: 13,  color: '#06b6d4', live: true  },
  { slug: 'fullstack',                title: 'Full Stack Developer',     subtitle: 'React + Node + databases + cloud',        level: 'Beginner',            time: '4–5 months', nodes: 15,  color: '#ff4757', live: true  },
  { slug: 'frontend',                 title: 'Frontend Developer',       subtitle: 'HTML to production-grade React apps',     level: 'Beginner',            time: '3–4 months', nodes: 15,  color: '#f59e0b', live: true  },
  { slug: 'backend-dev',              title: 'Backend Developer',        subtitle: 'APIs, databases, and system design',      level: 'Beginner',            time: '3–4 months', nodes: 15,  color: '#00e676', live: true  },
  { slug: 'python-developer',         title: 'Python Developer',         subtitle: 'From scripting to production Python',     level: 'Beginner',            time: '3–4 months', nodes: 13,  color: '#3b82f6', live: true  },
  { slug: 'java-developer',           title: 'Java Developer',           subtitle: 'Core Java to Spring Boot microservices',  level: 'Beginner',            time: '4–5 months', nodes: 13,  color: '#f97316', live: true  },
  { slug: 'mobile-app-developer',     title: 'Mobile App Developer',     subtitle: 'React Native / Flutter to app store',     level: 'Beginner',            time: '4–5 months', nodes: 14,  color: '#10b981', live: true  },
  { slug: 'devops',                   title: 'DevOps Engineer',          subtitle: 'Docker, K8s, CI/CD, and cloud infra',     level: 'Intermediate',        time: '4–5 months', nodes: 15,  color: '#ff9900', live: true  },
  { slug: 'site-reliability-engineer',title: 'Site Reliability Engineer',subtitle: 'Reliability, observability, on-call',     level: 'Intermediate',        time: '5–7 months', nodes: 15,  color: '#ef4444', live: true  },
  { slug: 'platform-engineer',        title: 'Platform Engineer',        subtitle: 'Build the internal platform devs love',   level: 'Intermediate',        time: '5–7 months', nodes: 14,  color: '#8b5cf6', live: true  },
  { slug: 'cloud-architect',          title: 'Cloud Architect',          subtitle: 'Design scalable, secure cloud systems',   level: 'Intermediate',        time: '5–7 months', nodes: 15,  color: '#0ea5e9', live: true  },
  { slug: 'software-architect',       title: 'Software Architect',       subtitle: 'Design systems that scale and endure',    level: 'Advanced',            time: '6–12 months',nodes: 15,  color: '#64748b', live: true  },
  { slug: 'database-administrator',   title: 'Database Administrator',   subtitle: 'Design, tune, and protect databases',     level: 'Beginner',            time: '4–6 months', nodes: 14,  color: '#84cc16', live: true  },
  { slug: 'cybersecurity-analyst',    title: 'Cybersecurity Analyst',    subtitle: 'Defend, detect, and respond to threats',  level: 'Intermediate',        time: '5–7 months', nodes: 15,  color: '#dc2626', live: true  },
  { slug: 'cloud-security-engineer',  title: 'Cloud Security Engineer',  subtitle: 'Secure cloud infrastructure end to end',  level: 'Intermediate',        time: '5–7 months', nodes: 15,  color: '#c026d3', live: true  },
]

export default function RoadmapIndex() {
  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)', padding: '60px 24px' }}>
      <div style={{ maxWidth: 1000, margin: '0 auto' }}>

        {/* Header */}
        <div style={{ marginBottom: 48 }}>
          <div style={{ fontSize: 10, fontWeight: 800, letterSpacing: '.14em', textTransform: 'uppercase', color: 'var(--muted)', marginBottom: 12 }}>Learning Roadmaps</div>
          <h1 style={{ fontSize: 'clamp(28px,4vw,48px)', fontWeight: 900, letterSpacing: '-2px', color: 'var(--text)', lineHeight: 1.08, marginBottom: 16 }}>
            Pick your path.<br />
            <span style={{ color: 'var(--green)' }}>Track every step.</span>
          </h1>
          <p style={{ fontSize: 15, color: 'var(--muted)', lineHeight: 1.7, maxWidth: 520 }}>
            Interactive skill trees with XP, unlock mechanics, and India salary data. Not just a list — a game you finish with a job.
          </p>
        </div>

        {/* Legend */}
        <div style={{ display: 'flex', gap: 16, marginBottom: 32, flexWrap: 'wrap' }}>
          {[
            { color: '#00e676', label: 'Required' },
            { color: '#888', label: 'Optional' },
            { color: '#7b61ff', label: '✦ Chaduvuko exclusive' },
          ].map(l => (
            <span key={l.label} style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: 11, color: l.color, fontWeight: 700 }}>
              <span style={{ width: 8, height: 8, borderRadius: 2, background: l.color, display: 'inline-block' }} />
              {l.label}
            </span>
          ))}
        </div>

        {/* Roadmap cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(260px,1fr))', gap: 14 }}>
          {roadmaps.map(r => (
            r.live ? (
              <Link key={r.slug} href={`/learn/roadmap/${r.slug}`} style={{ textDecoration: 'none' }}>
                <div style={{ background: 'var(--surface)', borderRadius: 12, padding: '20px 22px', border: `1px solid ${r.color}40`, borderTop: `3px solid ${r.color}`, cursor: 'pointer', transition: 'border-color .18s' }}>
                  <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 10 }}>
                    <span style={{ fontSize: 9, fontWeight: 800, letterSpacing: '.1em', textTransform: 'uppercase', padding: '2px 8px', borderRadius: 20, background: `${r.color}18`, color: r.color, border: `1px solid ${r.color}40` }}>Live</span>
                    <span style={{ fontSize: 11, color: 'var(--muted)' }}>{r.nodes} nodes</span>
                  </div>
                  <div style={{ fontSize: 18, fontWeight: 900, color: 'var(--text)', marginBottom: 4 }}>{r.title}</div>
                  <div style={{ fontSize: 12, color: 'var(--muted)', marginBottom: 14, fontStyle: 'italic' }}>{r.subtitle}</div>
                  <div style={{ display: 'flex', gap: 14 }}>
                    <span style={{ fontSize: 11, color: 'var(--muted)' }}>{r.level}</span>
                    <span style={{ fontSize: 11, color: 'var(--muted)' }}>{r.time}</span>
                  </div>
                </div>
              </Link>
            ) : (
              <div key={r.slug} style={{ background: 'var(--surface)', borderRadius: 12, padding: '20px 22px', border: '1px solid var(--border)', borderTop: `3px solid ${r.color}30`, opacity: .45, cursor: 'not-allowed' }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 10 }}>
                  <span style={{ fontSize: 9, fontWeight: 800, letterSpacing: '.1em', textTransform: 'uppercase', padding: '2px 8px', borderRadius: 20, background: 'rgba(255,255,255,.04)', color: 'var(--muted)', border: '1px solid var(--border)' }}>Coming soon</span>
                </div>
                <div style={{ fontSize: 18, fontWeight: 900, color: 'var(--muted)', marginBottom: 4 }}>{r.title}</div>
                <div style={{ fontSize: 12, color: 'rgba(255,255,255,.15)', fontStyle: 'italic' }}>{r.subtitle}</div>
              </div>
            )
          ))}
        </div>

      </div>
    </div>
  )
}
