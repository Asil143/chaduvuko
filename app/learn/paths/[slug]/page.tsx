import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { CAREER_PATHS, getCareerPath } from '@/data/career-paths'
import { ROLE_ROADMAPS } from '@/data/roadmaps/role-registry'
import { formatHours, resolvePath } from '@/lib/catalog/paths'
import { SCHOOL_BY_AREA } from '@/lib/catalog/schools'
import { PathTimeline } from '@/components/learn/PathTimeline'
import { eyebrowStyle, h1Style, h2Style, leadStyle, pageShell } from '@/components/learn/PathCard'
import { BreadcrumbJsonLd } from '@/components/JsonLd'

interface Props { params: { slug: string } }

export const dynamicParams = false

export function generateStaticParams() {
  return CAREER_PATHS.map(path => ({ slug: path.slug }))
}

export function generateMetadata({ params }: Props): Metadata {
  const path = getCareerPath(params.slug)
  if (!path) return {}
  return {
    title: `${path.title} Career Path`,
    description: `${path.summary} ${path.milestones.length} milestones, a capstone project, and interview preparation.`,
    alternates: { canonical: `/learn/paths/${path.slug}` },
  }
}

const stat: React.CSSProperties = { padding: '10px 14px', borderRadius: 12, border: '1px solid var(--border)', background: 'var(--surface)', fontSize: 13, color: 'var(--muted)' }

export default function CareerPathPage({ params }: Props) {
  const career = getCareerPath(params.slug)
  if (!career) notFound()
  const path = resolvePath(career)
  const school = SCHOOL_BY_AREA[path.school]
  const roadmap = path.roadmap ? ROLE_ROADMAPS[path.roadmap] : undefined

  return (
    <div style={{ ...pageShell, maxWidth: 920 }}>
      <BreadcrumbJsonLd items={[
        { name: 'Learn', url: 'https://chaduvuko.com/learn' },
        { name: 'Career paths', url: 'https://chaduvuko.com/learn/paths' },
        { name: path.title, url: `https://chaduvuko.com/learn/paths/${path.slug}` },
      ]} />
      <nav aria-label="Breadcrumb" style={{ fontSize: 13, color: 'var(--muted)', marginBottom: 18 }}>
        <Link href="/learn/paths" style={{ color: 'var(--muted)' }}>Career paths</Link> / <Link href={`/learn/schools/${school.slug}`} style={{ color: 'var(--muted)' }}>{school.title}</Link>
      </nav>
      <p style={eyebrowStyle}>Career path</p>
      <h1 style={h1Style}>{path.title}</h1>
      <p style={{ ...leadStyle, marginBottom: 10, color: 'var(--text2)' }}>{path.summary}</p>
      <p style={{ ...leadStyle, fontSize: 14 }}>{path.audience}</p>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, marginBottom: 28 }}>
        <span style={stat}><strong style={{ color: 'var(--text)' }}>{path.milestones.length}</strong> milestones</span>
        <span style={stat}><strong style={{ color: 'var(--text)' }}>{path.liveLessons}</strong> live lessons</span>
        <span style={stat}>Reading and practice: <strong style={{ color: 'var(--text)' }}>{formatHours(path.minutes)}</strong></span>
        {path.plannedMilestones > 0 && <span style={stat}><strong style={{ color: '#a855f7' }}>{path.plannedMilestones}</strong> coming soon</span>}
      </div>

      <h2 style={h2Style}>Milestones</h2>
      <PathTimeline
        milestones={path.milestones.map(milestone => ({
          title: milestone.title,
          outcome: milestone.outcome,
          status: milestone.status,
          href: milestone.href,
          trackTitle: milestone.trackTitle,
          lessons: milestone.lessons,
          hours: formatHours(milestone.minutes),
        }))}
      />

      <section aria-labelledby="capstone" style={{ marginTop: 20 }}>
        <h2 id="capstone" style={h2Style}>Capstone project</h2>
        <div style={{ padding: '16px 20px', borderRadius: 14, border: '1px solid var(--border)', background: 'var(--surface)' }}>
          <h3 style={{ margin: 0, fontSize: 16, color: 'var(--text)' }}>{path.capstone.title}</h3>
          <p style={{ margin: '6px 0 0', fontSize: 14, color: 'var(--text2)', lineHeight: 1.6 }}>{path.capstone.description}</p>
          <p style={{ margin: '10px 0 0', fontSize: 13 }}>
            {path.capstone.href
              ? <Link href={path.capstone.href} style={{ color: 'var(--brand-green)', fontWeight: 600 }}>Open the projects →</Link>
              : <span style={{ color: 'var(--muted)' }}>Step-by-step project brief coming soon.</span>}
          </p>
        </div>
      </section>

      <section aria-labelledby="interview" style={{ marginTop: 28 }}>
        <h2 id="interview" style={h2Style}>Interview preparation</h2>
        <ul style={{ margin: 0, paddingLeft: 20, lineHeight: 2, fontSize: 14 }}>
          {path.interview.map(item => (
            <li key={item.href}><Link href={item.href} style={{ color: 'var(--brand-green)' }}>{item.title}</Link></li>
          ))}
        </ul>
      </section>

      <p style={{ marginTop: 32, fontSize: 14, color: 'var(--muted)' }}>
        {roadmap && <>Want the full skills picture? See the <Link href={`/learn/roadmap/${path.roadmap}`} style={{ color: 'var(--brand-green)' }}>{roadmap.title} roadmap</Link>. </>}
        <Link href="/learn/paths" style={{ color: 'var(--brand-green)' }}>← All career paths</Link>
      </p>
    </div>
  )
}
