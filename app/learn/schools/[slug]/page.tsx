import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { SCHOOLS, getSchool } from '@/lib/catalog/schools'
import { getSchoolContents } from '@/components/learn/SchoolCard'
import { PathCard, cardStyle, eyebrowStyle, h1Style, h2Style, leadStyle, pageShell } from '@/components/learn/PathCard'
import { BreadcrumbJsonLd } from '@/components/JsonLd'

interface Props { params: { slug: string } }

export const dynamicParams = false

export function generateStaticParams() {
  return SCHOOLS.map(school => ({ slug: school.slug }))
}

export function generateMetadata({ params }: Props): Metadata {
  const school = getSchool(params.slug)
  if (!school) return {}
  return {
    title: school.title,
    description: `${school.description} Published tracks, career paths, and what is coming next.`,
    alternates: { canonical: `/learn/schools/${school.slug}` },
  }
}

export default function SchoolPage({ params }: Props) {
  const school = getSchool(params.slug)
  if (!school) notFound()
  const { tracks, paths, planned, lessons } = getSchoolContents(school)

  return (
    <div style={pageShell}>
      <BreadcrumbJsonLd items={[
        { name: 'Learn', url: 'https://chaduvuko.com/learn' },
        { name: 'Schools', url: 'https://chaduvuko.com/learn/schools' },
        { name: school.title, url: `https://chaduvuko.com/learn/schools/${school.slug}` },
      ]} />
      <nav aria-label="Breadcrumb" style={{ fontSize: 13, color: 'var(--muted)', marginBottom: 18 }}>
        <Link href="/learn/schools" style={{ color: 'var(--muted)' }}>Schools</Link>
      </nav>
      <p style={eyebrowStyle}>School</p>
      <h1 style={h1Style}>{school.title}</h1>
      <p style={leadStyle}>{school.description}</p>

      <section aria-labelledby="school-tracks" style={{ marginBottom: 40 }}>
        <h2 id="school-tracks" style={h2Style}>Tracks · {lessons} lessons</h2>
        {tracks.length ? (
          <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'grid', gap: 14, gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))' }}>
            {tracks.map(track => (
              <li key={track.slug}>
                <Link href={track.href} style={cardStyle}>
                  <span style={{ display: 'block', fontSize: 16, fontWeight: 700, color: 'var(--text)' }}>{track.title}</span>
                  <span style={{ display: 'block', marginTop: 8, fontSize: 13, color: 'var(--muted)' }}>
                    {track.modules > 1 ? `${track.modules} modules · ` : ''}{track.lessons} lessons
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        ) : (
          <p style={{ color: 'var(--muted)' }}>The first tracks in this school are being written. See what is coming next below.</p>
        )}
      </section>

      {paths.length > 0 && (
        <section aria-labelledby="school-paths" style={{ marginBottom: 40 }}>
          <h2 id="school-paths" style={h2Style}>Career paths</h2>
          <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'grid', gap: 14, gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))' }}>
            {paths.map(path => <li key={path.slug}><PathCard path={path} /></li>)}
          </ul>
        </section>
      )}

      {planned.length > 0 && (
        <section aria-labelledby="school-planned">
          <details style={{ border: '1px dashed var(--border2)', borderRadius: 14, padding: '14px 18px' }}>
            <summary style={{ cursor: 'pointer' }}>
              <h2 id="school-planned" style={{ ...h2Style, display: 'inline', fontSize: 18 }}>Coming next · {planned.length} planned tracks</h2>
            </summary>
            <p style={{ color: 'var(--muted)', fontSize: 13, margin: '10px 0 14px' }}>Each has a published skills map; lessons are not out yet.</p>
            <ul style={{ margin: 0, paddingLeft: 20, lineHeight: 2, fontSize: 14 }}>
              {planned.map(track => (
                <li key={track.slug}><Link href={track.href} style={{ color: 'var(--text)' }}>{track.title}</Link></li>
              ))}
            </ul>
          </details>
        </section>
      )}

      <p style={{ marginTop: 32, fontSize: 14 }}>
        <Link href="/learn/schools" style={{ color: 'var(--brand-green)' }}>← All schools</Link>
      </p>
    </div>
  )
}
