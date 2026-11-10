import type { Metadata } from 'next'
import Link from 'next/link'
import { LIVE_LESSONS, TRACKS, getCatalogStats } from '@/lib/catalog'
import type { Lesson } from '@/lib/catalog/types'
import { SCHOOLS } from '@/lib/catalog/schools'
import { PLANNED_TRACKS } from '@/data/planned-tracks'
import { ROLE_ROADMAPS } from '@/data/roadmaps/role-registry'
import { BLOG_ARTICLES } from '@/data/blog-articles'

export const metadata: Metadata = {
  title: 'All Courses — Site Map of Every Track and Lesson',
  description: 'Every published Chaduvuko track with its modules and lessons, the planned tracks that are mapped but not yet published, and the practice tools in one place.',
  alternates: { canonical: '/learn/all-courses' },
}

const AREAS = SCHOOLS.map(school => ({ area: school.area, label: school.title, blurb: school.description }))

const PRACTICE_LINKS = [
  { href: '/learn/paths', title: 'Career paths', detail: 'Ten step-by-step routes to a job' },
  { href: '/learn/schools', title: 'Schools', detail: 'Six subject areas' },
  { href: '/learn/find-your-path', title: 'Find your path', detail: 'Two questions, then a suggested path' },
  { href: '/learn/roadmap', title: 'Skill roadmaps', detail: `${Object.keys(ROLE_ROADMAPS).length} role-by-role skill maps` },
  { href: '/learn/projects', title: 'Projects', detail: 'End-to-end builds' },
  { href: '/learn/sql/playground', title: 'SQL playground', detail: 'Run SQL in the browser' },
  { href: '/playground', title: 'Code playground', detail: 'Run code in the browser' },
  { href: '/learn/interview', title: 'Career prep', detail: 'Interviews, projects, resume and job search' },
  { href: '/blog', title: 'Blog', detail: `${Object.keys(BLOG_ARTICLES).length} articles` },
  { href: '/dashboard', title: 'Learning dashboard', detail: 'Progress saved in this browser' },
]

function groupBySection(lessons: Lesson[]): { section: string; lessons: Lesson[] }[] {
  const groups: { section: string; lessons: Lesson[] }[] = []
  for (const lesson of lessons) {
    const section = lesson.section ?? 'Overview'
    const last = groups.at(-1)
    if (last && last.section === section) last.lessons.push(lesson)
    else groups.push({ section, lessons: [lesson] })
  }
  return groups
}

const card: React.CSSProperties = {
  background: 'var(--surface)',
  border: '1px solid var(--border)',
  borderRadius: 12,
  padding: '18px 20px',
}

export default function AllCoursesPage() {
  const stats = getCatalogStats()
  const published = TRACKS.filter(track => !track.status && !track.hidden && track.area !== 'practice')
  const lessonsByTrack = new Map<string, Lesson[]>()
  for (const lesson of LIVE_LESSONS) {
    const list = lessonsByTrack.get(lesson.track) ?? []
    list.push(lesson)
    lessonsByTrack.set(lesson.track, list)
  }
  Array.from(lessonsByTrack.values()).forEach(list => list.sort((a, b) => a.order - b.order))

  return (
    <div style={{ maxWidth: 1180, margin: '0 auto', padding: '48px clamp(20px, 3vw, 40px) 80px' }}>
      <p style={{ color: 'var(--green)', fontSize: 11, fontWeight: 700, letterSpacing: '.12em', textTransform: 'uppercase', margin: 0 }}>All courses</p>
      <h1 style={{ color: 'var(--text)', fontSize: 'clamp(28px, 4vw, 40px)', margin: '8px 0 10px' }}>Everything on Chaduvuko, in one map</h1>
      <p style={{ color: 'var(--muted)', lineHeight: 1.75, maxWidth: 720, margin: '0 0 24px' }}>
        Learning is organised as <strong style={{ color: 'var(--text)' }}>School → Track → Module → Lesson</strong>.
        Published tracks come first, with every module and lesson. Planned tracks have a skills map but no lessons yet.
      </p>

      <nav aria-label="Jump to section" style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 40 }}>
        {[
          { href: '#published', label: `Published · ${stats.lessons - stats.projects} lessons in ${stats.liveTracks} tracks` },
          { href: '#planned', label: `Planned · ${PLANNED_TRACKS.length} tracks` },
          { href: '#practice', label: 'Practice & tools' },
        ].map(item => (
          <a key={item.href} href={item.href} style={{ ...card, padding: '8px 14px', fontSize: 13, fontWeight: 600, color: 'var(--text)', textDecoration: 'none' }}>{item.label}</a>
        ))}
      </nav>

      <section id="published" aria-labelledby="published-title" style={{ marginBottom: 56 }}>
        <h2 id="published-title" style={{ color: 'var(--text)', fontSize: 24, margin: '0 0 6px' }}>Published tracks</h2>
        <p style={{ color: 'var(--muted)', margin: '0 0 24px', fontSize: 14 }}>Expand a track to see its modules and lessons in teaching order.</p>
        {AREAS.map(({ area, label, blurb }) => {
          const tracks = published.filter(track => track.area === area && lessonsByTrack.has(track.slug))
          if (!tracks.length) return null
          return (
            <div key={area} style={{ marginBottom: 32 }}>
              <h3 style={{ color: 'var(--text)', fontSize: 18, margin: '0 0 4px' }}>{label}</h3>
              <p style={{ color: 'var(--muted)', margin: '0 0 12px', fontSize: 13 }}>{blurb}</p>
              <div style={{ display: 'grid', gap: 10 }}>
                {tracks.map(track => {
                  const lessons = lessonsByTrack.get(track.slug) ?? []
                  const modules = groupBySection(lessons)
                  return (
                    <details key={track.slug} style={card}>
                      <summary style={{ cursor: 'pointer', color: 'var(--text)' }}>
                        <span style={{ fontWeight: 700, fontSize: 16 }}>{track.title}</span>
                        <span style={{ color: 'var(--muted)', fontSize: 13, marginLeft: 10 }}>
                          {lessons.length} lesson{lessons.length === 1 ? '' : 's'} · {modules.length} module{modules.length === 1 ? '' : 's'}
                        </span>
                      </summary>
                      <p style={{ margin: '12px 0 0' }}>
                        <Link href={track.indexHref} style={{ color: 'var(--green)', fontSize: 13, fontWeight: 600 }}>Open the {track.title} track →</Link>
                      </p>
                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(min(300px, 100%), 1fr))', gap: '16px 24px', marginTop: 16 }}>
                        {modules.map((module, index) => (
                          <div key={`${module.section}-${index}`}>
                            <p style={{ color: 'var(--text)', fontSize: 13, fontWeight: 700, margin: '0 0 6px' }}>{module.section}</p>
                            <ol style={{ margin: 0, paddingLeft: 18, color: 'var(--muted)', fontSize: 13, lineHeight: 1.7 }}>
                              {module.lessons.map(lesson => (
                                <li key={lesson.href}>
                                  <Link href={lesson.href} style={{ color: 'var(--muted)' }}>{lesson.title}</Link>
                                </li>
                              ))}
                            </ol>
                          </div>
                        ))}
                      </div>
                    </details>
                  )
                })}
              </div>
            </div>
          )
        })}
      </section>

      <section id="planned" aria-labelledby="planned-title" style={{ marginBottom: 56 }}>
        <h2 id="planned-title" style={{ color: 'var(--text)', fontSize: 24, margin: '0 0 6px' }}>Planned tracks</h2>
        <p style={{ color: 'var(--muted)', margin: '0 0 24px', fontSize: 14, maxWidth: 720 }}>
          Each planned track has a skills map from prerequisites to career preparation. Lessons are not published yet; open a track to see the plan and register interest.
        </p>
        {AREAS.map(({ area, label }) => {
          const tracks = PLANNED_TRACKS.filter(track => track.area === area)
          if (!tracks.length) return null
          return (
            <div key={area} style={{ marginBottom: 28 }}>
              <h3 style={{ color: 'var(--text)', fontSize: 18, margin: '0 0 12px' }}>{label}</h3>
              <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(min(280px, 100%), 1fr))', gap: 10 }}>
                {tracks.map(track => (
                  <li key={track.slug}>
                    <Link href={track.href} style={{ ...card, display: 'block', height: '100%', textDecoration: 'none' }}>
                      <span style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
                        <span aria-hidden="true">{track.icon}</span>
                        <span style={{ color: 'var(--text)', fontWeight: 700, fontSize: 14 }}>{track.title}</span>
                      </span>
                      <span style={{ display: 'inline-block', fontSize: 11, fontWeight: 700, color: '#c084fc', border: '1px solid rgba(192,132,252,0.35)', borderRadius: 999, padding: '1px 8px', marginBottom: 6 }}>
                        Planned · {track.stages.reduce((count, stage) => count + stage.skills.length, 0)} skills mapped
                      </span>
                      <span style={{ display: 'block', color: 'var(--muted)', fontSize: 12, lineHeight: 1.6 }}>{track.roles}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )
        })}
      </section>

      <section id="practice" aria-labelledby="practice-title">
        <h2 id="practice-title" style={{ color: 'var(--text)', fontSize: 24, margin: '0 0 16px' }}>Practice &amp; tools</h2>
        <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(min(240px, 100%), 1fr))', gap: 10 }}>
          {PRACTICE_LINKS.map(item => (
            <li key={item.href}>
              <Link href={item.href} style={{ ...card, display: 'block', height: '100%', textDecoration: 'none' }}>
                <span style={{ display: 'block', color: 'var(--text)', fontWeight: 700, fontSize: 14, marginBottom: 4 }}>{item.title}</span>
                <span style={{ display: 'block', color: 'var(--muted)', fontSize: 12 }}>{item.detail}</span>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </div>
  )
}
