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

export function PathCard({ path }: { path: ResolvedPath }) {
  return (
    <Link href={`/learn/paths/${path.slug}`} className="group" style={cardStyle}>
      <span style={{ ...eyebrowStyle, color: 'var(--muted)' }}>{SCHOOL_BY_AREA[path.school].short}</span>
      <span style={{ display: 'block', marginTop: 8, fontSize: 17, fontWeight: 700, color: 'var(--text)' }}>{path.title}</span>
      <span style={{ display: 'block', marginTop: 6, fontSize: 13, lineHeight: 1.6, color: 'var(--muted)' }}>{path.summary}</span>
      <span style={{ display: 'flex', flexWrap: 'wrap', gap: 10, marginTop: 12, fontSize: 12, color: 'var(--text2)' }}>
        <span>{path.milestones.length} milestones</span>
        <span>·</span>
        <span>{path.liveLessons} live lessons</span>
        <span>·</span>
        <span>{formatHours(path.minutes)}</span>
      </span>
      {path.plannedMilestones > 0 && (
        <span style={{ display: 'block', marginTop: 6, fontSize: 12, color: '#a855f7' }}>
          {path.plannedMilestones} milestone{path.plannedMilestones === 1 ? '' : 's'} coming soon
        </span>
      )}
    </Link>
  )
}
