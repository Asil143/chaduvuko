import type { Metadata } from 'next'
import Link from 'next/link'
import { SCHOOLS } from '@/lib/catalog/schools'
import { SchoolCard } from '@/components/learn/SchoolCard'
import { eyebrowStyle, h1Style, leadStyle, pageShell } from '@/components/learn/PathCard'

export const metadata: Metadata = {
  title: 'Schools — AI, Data, Software, Cloud, Security and Computer Science',
  description: 'Browse Chaduvuko by school: six subject areas, each with published tracks, career paths, and the tracks coming next.',
  alternates: { canonical: '/learn/schools' },
}

export default function SchoolsPage() {
  return (
    <div style={pageShell}>
      <p style={eyebrowStyle}>Schools</p>
      <h1 style={h1Style}>Six schools. One connected curriculum.</h1>
      <p style={leadStyle}>
        Every track belongs to one school. Each track runs from prerequisites and foundations to production skills, projects, and interview preparation.
      </p>
      <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'grid', gap: 14, gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))' }}>
        {SCHOOLS.map(school => <li key={school.slug}><SchoolCard school={school} /></li>)}
      </ul>
      <p style={{ marginTop: 32, fontSize: 14, color: 'var(--muted)' }}>
        Prefer a job-focused route? Follow a <Link href="/learn/paths" style={{ color: 'var(--brand-green)' }}>career path</Link>. Want every lesson on one page? See <Link href="/learn/all-courses" style={{ color: 'var(--brand-green)' }}>all courses</Link>.
      </p>
    </div>
  )
}
