import Link from 'next/link'
import type { TrackCheatSheet, CheatSection, CheatEntry, ProjectIdea } from '@/lib/cheatsheet'

const LEVEL_COLORS: Record<ProjectIdea['level'], string> = {
  Beginner: '#10b981',
  Intermediate: '#f59e0b',
  Advanced: '#ef4444',
}

function Entry({ entry, accent }: { entry: CheatEntry; accent: string }) {
  return (
    <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 8, overflow: 'hidden' }}>
      <div style={{ padding: '8px 12px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 8, borderBottom: '1px solid var(--border)', background: 'var(--bg2)' }}>
        <span style={{ fontSize: 12, color: 'var(--text)', fontWeight: 600 }}>{entry.label}</span>
        {entry.note && <span style={{ fontSize: 11, color: 'var(--muted)', flexShrink: 0 }}>{entry.note}</span>}
      </div>
      <pre style={{ margin: 0, padding: '10px 12px', fontFamily: 'var(--font-mono, monospace)', fontSize: 12, lineHeight: 1.7, color: accent, overflowX: 'auto', whiteSpace: 'pre', maxWidth: '100%' }}>
        {entry.code}
      </pre>
    </div>
  )
}

function Section({ section, accent }: { section: CheatSection; accent: string }) {
  const color = section.color ?? accent
  return (
    <div style={{ marginBottom: 36 }}>
      <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '.12em', textTransform: 'uppercase', color, fontFamily: 'var(--font-mono)', marginBottom: 12, paddingBottom: 8, borderBottom: `1px solid ${color}30` }}>
        {section.title}
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {section.entries.map((entry, i) => <Entry key={i} entry={entry} accent={accent} />)}
      </div>
    </div>
  )
}

/** Portfolio projects for a track. Used by the data-driven sheets and the hand-built SQL sheet. */
export function ProjectIdeas({ projects }: { projects: ProjectIdea[] }) {
  if (projects.length === 0) return null
  return (
    <div style={{ marginTop: 24 }}>
      <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(22px,3vw,32px)', fontWeight: 900, letterSpacing: '-1px', margin: '0 0 8px' }}>
        Projects to build
      </h2>
      <p style={{ fontSize: 14, color: 'var(--muted)', lineHeight: 1.7, maxWidth: 560, margin: '0 0 24px' }}>
        The fastest way to make this stick. Build one, then put it in your portfolio.
      </p>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))', gap: 14 }}>
        {projects.map(project => (
          <div key={project.title} style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 12, padding: '18px 20px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
              <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: '.08em', textTransform: 'uppercase', color: LEVEL_COLORS[project.level], fontFamily: 'var(--font-mono)' }}>
                {project.level}
              </span>
            </div>
            <h3 style={{ fontSize: 16, fontWeight: 800, margin: '0 0 8px', letterSpacing: '-0.3px' }}>{project.title}</h3>
            <p style={{ fontSize: 13.5, color: 'var(--text2)', lineHeight: 1.6, margin: '0 0 12px' }}>{project.build}</p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
              {project.skills.map(skill => (
                <span key={skill} style={{ fontSize: 11, color: 'var(--muted)', background: 'var(--bg2)', border: '1px solid var(--border)', borderRadius: 20, padding: '2px 10px' }}>
                  {skill}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

/**
 * Renders a track's reference page from data: a dense two-column cheat sheet of grouped snippets,
 * then a "Projects to build" section. Static, server-rendered; matches the SQL cheat sheet's style.
 */
export function CheatSheetView({ sheet }: { sheet: TrackCheatSheet }) {
  return (
    <main style={{ background: 'var(--bg)', minHeight: '100vh', color: 'var(--text)' }}>
      <div style={{ maxWidth: 1000, margin: '0 auto', padding: '60px 24px 80px' }}>
        <div style={{ marginBottom: 48 }}>
          <Link href={sheet.trackHref} style={{ fontSize: 12, color: 'var(--muted)', textDecoration: 'none' }}>← Back to {sheet.title} track</Link>
          <div style={{ marginTop: 20, marginBottom: 16 }}>
            <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: '.12em', textTransform: 'uppercase', color: sheet.accent, fontFamily: 'var(--font-mono)' }}>
              Reference
            </span>
          </div>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(30px,5vw,52px)', fontWeight: 900, letterSpacing: '-2px', margin: '0 0 12px', overflowWrap: 'anywhere' }}>
            {sheet.title} Cheat Sheet
          </h1>
          <p style={{ fontSize: 15, color: 'var(--muted)', lineHeight: 1.7, maxWidth: 560, margin: 0 }}>{sheet.blurb}</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 420px), 1fr))', gap: 40 }}>
          {sheet.sections.map((section, i) => <Section key={i} section={section} accent={sheet.accent} />)}
        </div>

        {sheet.projects.length > 0 && <ProjectIdeas projects={sheet.projects} />}
      </div>
    </main>
  )
}
