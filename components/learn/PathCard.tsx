import Link from 'next/link'
import type { ResolvedPath } from '@/lib/catalog/paths'
import { formatHours } from '@/lib/catalog/paths'
import { SCHOOL_BY_AREA } from '@/lib/catalog/schools'

export const pageShell: React.CSSProperties = { maxWidth: 1180, margin: '0 auto', padding: '48px clamp(20px, 3vw, 40px) 80px' }
export const eyebrowStyle: React.CSSProperties = { color: 'var(--green)', fontSize: 11, fontWeight: 700, letterSpacing: '.12em', textTransform: 'uppercase', margin: 0 }
export const h1Style: React.CSSProperties = { color: 'var(--text)', fontSize: 'clamp(28px, 4vw, 40px)', margin: '8px 0 10px', letterSpacing: '-0.02em' }
export const leadStyle: React.CSSProperties = { color: 'var(--muted)', lineHeight: 1.75, maxWidth: 720, margin: '0 0 28px' }
export const h2Style: React.CSSProperties = { color: 'var(--text)', fontSize: 22, margin: '0 0 14px' }
export const cardStyle: React.CSSProperties = { display: 'block', height: '100%', background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 14, padding: '18px 20px', textDecoration: 'none' }

const MAX_TRACK_CHIPS = 4

export function PathCard({ path }: { path: ResolvedPath }) {
  const school = SCHOOL_BY_AREA[path.school]
  const tracks = Array.from(new Set(path.milestones.map(milestone => milestone.trackTitle)))
  const extra = tracks.length - MAX_TRACK_CHIPS
  return (
    <Link href={`/learn/paths/${path.slug}`} className="pp-card" style={{ '--pp-accent': school.accent } as React.CSSProperties}>
      <span className="pp-card-top">
        <span className="pp-icon" aria-hidden="true">{path.icon}</span>
        <span className="pp-badges">
          {path.trending && <span className="pp-badge pp-badge-hot"><span aria-hidden="true">🔥 </span>In demand</span>}
          <span className="pp-badge">{path.level}</span>
        </span>
      </span>
      <span className="pp-title">{path.title}</span>
      <span className="pp-summary">{path.summary}</span>
      <span className="pp-tracks" aria-label={`Courses: ${tracks.join(', ')}`}>
        {tracks.slice(0, MAX_TRACK_CHIPS).map(track => <span key={track} className="pp-chip" aria-hidden="true">{track}</span>)}
        {extra > 0 && <span className="pp-chip pp-chip-more" aria-hidden="true">+{extra} more</span>}
      </span>
      <span className="pp-stats">
        <span><span aria-hidden="true">🧭</span> {path.milestones.length} milestones</span>
        <span><span aria-hidden="true">📚</span> {path.liveLessons} lessons</span>
        <span><span aria-hidden="true">⏱️</span> {path.minutes ? `~${Math.max(1, Math.round(path.minutes / 60))}h` : formatHours(path.minutes)}</span>
      </span>
      {path.plannedMilestones > 0 && (
        <span className="pp-soon">{path.plannedMilestones} milestone{path.plannedMilestones === 1 ? '' : 's'} coming soon</span>
      )}
      <span className="pp-cta">View path <span aria-hidden="true">→</span></span>
    </Link>
  )
}
