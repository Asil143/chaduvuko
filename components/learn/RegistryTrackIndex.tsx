import type { Metadata } from 'next'
import Link from 'next/link'
import { BreadcrumbJsonLd } from '@/components/JsonLd'
import { cardStyle, eyebrowStyle, h1Style, h2Style, leadStyle, pageShell } from '@/components/learn/PathCard'
import { CAREER_PATHS } from '@/data/career-paths'
import { getRegistryTrack, registryLessons } from '@/data/tracks/registry'

export function registryIndexMetadata(slug: string): Metadata {
  const track = getRegistryTrack(slug)
  return { title: `${track.title} Course`, description: track.description, alternates: { canonical: `/learn/${slug}` } }
}

const minutes = (readTime: string) => parseInt(readTime, 10) || 30

export function RegistryTrackIndex({ slug }: { slug: string }) {
  const track = getRegistryTrack(slug)
  const lessons = registryLessons(slug).filter(lesson => lesson.status === 'live')
  const hours = Math.round(lessons.reduce((sum, lesson) => sum + minutes(lesson.readTime), 0) / 6) / 10
  const paths = CAREER_PATHS.filter(path => path.milestones.some(milestone => milestone.track === slug))
  const first = lessons[0]
  const chip: React.CSSProperties = {
    display: 'inline-block', padding: '6px 12px', borderRadius: 999, border: '1px solid var(--border)',
    background: 'var(--surface)', color: 'var(--text)', fontSize: 13, textDecoration: 'none',
  }

  return (
    <div style={pageShell}>
      <BreadcrumbJsonLd items={[
        { name: 'Learn', url: 'https://chaduvuko.com/learn' },
        { name: track.title, url: `https://chaduvuko.com/learn/${slug}` },
      ]} />
      <nav aria-label="Breadcrumb" style={{ fontSize: 13, color: 'var(--muted)', marginBottom: 18 }}>
        <Link href="/learn" style={{ color: 'var(--muted)' }}>Learn</Link>
      </nav>
      <p style={eyebrowStyle}>{track.icon} Course · {lessons.length} lessons · about {hours} hours</p>
      <h1 style={h1Style}>{track.title}</h1>
      <p style={leadStyle}>{track.description}</p>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, alignItems: 'center', marginBottom: 28 }}>
        {first && (
          <Link href={`/learn/${slug}/${first.slug}`} style={{
            background: 'var(--green)', color: '#04120a', padding: '11px 22px', borderRadius: 8,
            fontWeight: 700, fontSize: 14, textDecoration: 'none',
          }}>Start lesson 1 →</Link>
        )}
        <span style={{ color: 'var(--muted)', fontSize: 13 }}>Roles: {track.roles}</span>
      </div>

      <div style={{ display: 'grid', gap: 16, gridTemplateColumns: 'repeat(auto-fit, minmax(min(320px, 100%), 1fr))', marginBottom: 40 }}>
        <div style={{ ...cardStyle, height: 'auto' }}>
          <h2 style={{ ...h2Style, fontSize: 16 }}>Before you start</h2>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            {track.prerequisites.map(item => <Link key={item.href} href={item.href} style={chip}>{item.label}</Link>)}
          </div>
        </div>
        {paths.length > 0 && (
          <div style={{ ...cardStyle, height: 'auto' }}>
            <h2 style={{ ...h2Style, fontSize: 16 }}>Part of these career paths</h2>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
              {paths.map(path => <Link key={path.slug} href={`/learn/paths/${path.slug}`} style={chip}>{path.title}</Link>)}
            </div>
          </div>
        )}
      </div>

      {track.sections.map(section => {
        const items = lessons.filter(lesson => lesson.section === section.title)
        if (!items.length) return null
        const id = `module-${section.id}`
        return (
          <section key={section.id} aria-labelledby={id} style={{ marginBottom: 36 }}>
            <h2 id={id} style={h2Style}>Module {section.id} · {section.title}</h2>
            <p style={{ color: 'var(--muted)', fontSize: 14, margin: '0 0 14px' }}>{section.blurb}</p>
            <ol style={{ listStyle: 'none', margin: 0, padding: 0, display: 'grid', gap: 12, gridTemplateColumns: 'repeat(auto-fill, minmax(min(300px, 100%), 1fr))' }}>
              {items.map(lesson => (
                <li key={lesson.slug}>
                  <Link href={`/learn/${slug}/${lesson.slug}`} style={cardStyle}>
                    <span style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, color: 'var(--muted)' }}>
                      <span>Lesson {String(lesson.id).padStart(2, '0')}</span>
                      <span>{lesson.readTime}</span>
                    </span>
                    <span style={{ display: 'block', marginTop: 6, fontSize: 15, fontWeight: 700, color: 'var(--text)', lineHeight: 1.4 }}>{lesson.title}</span>
                    <span style={{ display: 'block', marginTop: 6, fontSize: 13, color: 'var(--muted)', lineHeight: 1.6 }}>{lesson.description}</span>
                  </Link>
                </li>
              ))}
            </ol>
          </section>
        )
      })}
    </div>
  )
}
