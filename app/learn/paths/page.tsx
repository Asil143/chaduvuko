import type { Metadata } from 'next'
import Link from 'next/link'
import { CAREER_PATHS } from '@/data/career-paths'
import { getResolvedPaths } from '@/lib/catalog/paths'
import { SCHOOLS } from '@/lib/catalog/schools'
import { PathCard, pageShell } from '@/components/learn/PathCard'

export const metadata: Metadata = {
  title: 'Career Paths — Step-by-Step Routes to AI, Data, Cloud and Security Jobs',
  description: `${CAREER_PATHS.length} guided career paths for AI, data, software, cloud and security roles, each with ordered milestones, a capstone project and interview prep.`,
  alternates: { canonical: '/learn/paths' },
}

export default function PathsPage() {
  const paths = getResolvedPaths()
  const schools = SCHOOLS.map(school => ({ school, paths: paths.filter(path => path.school === school.area) })).filter(group => group.paths.length)
  const lessons = new Set(paths.flatMap(path => path.milestones.flatMap(milestone => milestone.lessons.map(lesson => lesson.href)))).size
  const stats = [
    { icon: '🧭', value: paths.length, label: 'career paths' },
    { icon: '🏫', value: schools.length, label: 'schools' },
    { icon: '📚', value: lessons, label: 'lessons inside' },
    { icon: '🔥', value: paths.filter(path => path.trending).length, label: 'in-demand roles' },
  ]

  return (
    <div style={pageShell}>
      <section className="pp-hero" aria-labelledby="paths-title">
        <p className="pp-eyebrow"><span aria-hidden="true">🎓</span> Career paths</p>
        <h1 id="paths-title">Pick a job. Follow the milestones.</h1>
        <p className="pp-lead">
          Each path puts the right courses in the right order for one role, then finishes with a capstone project and interview practice.
          Your progress is saved as you complete lessons.
        </p>
        <div className="pp-actions">
          <Link href="/learn/find-your-path" className="pp-btn pp-btn-primary"><span aria-hidden="true">🧩</span> Find my path in 2 questions</Link>
          <Link href="/learn/roadmap" className="pp-btn"><span aria-hidden="true">🗺️</span> Browse skill roadmaps</Link>
        </div>
        <ul className="pp-stats-strip" aria-label="Career paths at a glance">
          {stats.map(stat => (
            <li key={stat.label}><span aria-hidden="true">{stat.icon}</span> <strong>{stat.value}</strong> {stat.label}</li>
          ))}
        </ul>
      </section>

      <nav className="pp-jump" aria-label="Jump to a school">
        {schools.map(({ school, paths: inSchool }) => (
          <a key={school.slug} href={`#school-${school.slug}`} style={{ '--pp-accent': school.accent } as React.CSSProperties}>
            <span aria-hidden="true">{school.icon}</span> {school.short} <span className="pp-jump-count">{inSchool.length}</span>
          </a>
        ))}
      </nav>

      {schools.map(({ school, paths: inSchool }) => (
        <section key={school.slug} id={`school-${school.slug}`} className="pp-school" aria-labelledby={`paths-${school.slug}`} style={{ '--pp-accent': school.accent } as React.CSSProperties}>
          <header className="pp-school-head">
            <span className="pp-school-icon" aria-hidden="true">{school.icon}</span>
            <div>
              <h2 id={`paths-${school.slug}`}>{school.title}</h2>
              <p>{school.description}</p>
            </div>
            <Link href={`/learn/schools/${school.slug}`} className="pp-school-link">All {school.short} courses →</Link>
          </header>
          <ul className="pp-grid">
            {inSchool.map(path => <li key={path.slug}><PathCard path={path} /></li>)}
          </ul>
        </section>
      ))}

      <p className="pp-footnote">
        Looking for a role not listed here? See all <Link href="/learn/roadmap">skill roadmaps</Link> or browse the <Link href="/learn/schools">schools</Link>.
        Milestones marked coming soon have a published skills map while lessons are written.
      </p>
    </div>
  )
}
