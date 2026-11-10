import type { Metadata } from 'next'
import Link from 'next/link'
import { getResolvedPaths } from '@/lib/catalog/paths'
import { SCHOOLS } from '@/lib/catalog/schools'
import { PathCard, eyebrowStyle, h1Style, h2Style, leadStyle, pageShell } from '@/components/learn/PathCard'

export const metadata: Metadata = {
  title: 'Career Paths — Step-by-Step Routes to AI, Data, Cloud and Security Jobs',
  description: 'Ten guided career paths, each an ordered set of milestones across Chaduvuko tracks that ends in a capstone project and interview preparation.',
  alternates: { canonical: '/learn/paths' },
}

export default function PathsPage() {
  const paths = getResolvedPaths()
  return (
    <div style={pageShell}>
      <p style={eyebrowStyle}>Career paths</p>
      <h1 style={h1Style}>Pick a job. Follow the milestones.</h1>
      <p style={leadStyle}>
        Each path puts the right tracks in the right order for one role, then finishes with a capstone project and interview practice.
        Your progress is saved as you complete lessons. Milestones marked coming soon have a published skills map while lessons are written.
      </p>
      <p style={{ margin: '0 0 36px', fontSize: 14 }}>
        <Link href="/learn/find-your-path" style={{ color: 'var(--brand-green)', fontWeight: 600 }}>Not sure which path? Answer two questions →</Link>
      </p>

      {SCHOOLS.map(school => {
        const inSchool = paths.filter(path => path.school === school.area)
        if (!inSchool.length) return null
        return (
          <section key={school.slug} aria-labelledby={`paths-${school.slug}`} style={{ marginBottom: 36 }}>
            <h2 id={`paths-${school.slug}`} style={h2Style}>{school.title}</h2>
            <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'grid', gap: 14, gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))' }}>
              {inSchool.map(path => <li key={path.slug}><PathCard path={path} /></li>)}
            </ul>
          </section>
        )
      })}

      <p style={{ marginTop: 12, fontSize: 14, color: 'var(--muted)' }}>
        Looking for a role not listed here? See all <Link href="/learn/roadmap" style={{ color: 'var(--brand-green)' }}>career roadmaps</Link> or browse the <Link href="/learn/schools" style={{ color: 'var(--brand-green)' }}>schools</Link>.
      </p>
    </div>
  )
}
