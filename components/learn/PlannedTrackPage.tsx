import Link from 'next/link'
import { LearnLayout } from '@/components/content/LearnLayout'
import type { PlannedTrack } from '@/data/planned-tracks'
import { NotifyMeForm } from '@/components/learn/NotifyMeForm'

function skillObjective(skill: string, stage: string, track: string) {
  switch (stage) {
    case 'Prerequisites':
      return `Build the ${skill} knowledge needed to follow the ${track} foundations.`
    case 'Foundations':
      return `Explain how ${skill} works and where it fits in the ${track} learning path.`
    case 'Core Skills':
      return `Use ${skill} to implement a working capability and verify its behavior in ${track}.`
    case 'Advanced / Production':
      return `Evaluate ${skill} trade-offs against the performance, reliability, and safety needs of ${track} systems.`
    case 'Real-World Projects':
      return `Deliver a working outcome with ${skill}, then test it against the project requirements.`
    case 'Career / Interview Preparation':
      return `Explain your approach to ${skill}, defend key trade-offs, and discuss what you learned.`
    default:
      return `Apply ${skill} to a practical ${track} task and explain the result.`
  }
}

export interface PublishedTrackLesson {
  title: string
  href: string
  stage: string
  description: string
}

export function PlannedTrackPage({ track, publishedLessons = [] }: { track: PlannedTrack; publishedLessons?: PublishedTrackLesson[] }) {
  const skillCount = track.stages.reduce((total, stage) => total + stage.skills.length, 0)

  const prerequisites = track.stages.find(stage => stage.title === 'Prerequisites')?.skills ?? []
  const projects = track.stages.find(stage => stage.title === 'Real-World Projects')?.skills ?? []
  const resourceSchema = {
    '@context': 'https://schema.org',
    '@type': 'LearningResource',
    name: track.title,
    description: track.description,
    url: `https://chaduvuko.com${track.href}`,
    learningResourceType: 'Curriculum plan',
    provider: { '@type': 'Organization', name: 'Chaduvuko', url: 'https://chaduvuko.com' },
    isAccessibleForFree: true,
  }

  return (
    <LearnLayout
      title={`${track.title} — Skills Plan`}
      description={`Planned skill map for ${track.title}. The curriculum will be developed and released in stages.`}
      section="Curriculum plan"
      readTime={`${skillCount} planned skills`}
      updatedAt="October 2026"
      breadcrumbs={[{ label: 'All Learning Tracks', href: '/learn' }]}
    >
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(resourceSchema).replace(/</g, '\\u003c') }} />
      <div role="status" style={{ padding: 18, borderRadius: 10, background: 'rgba(192,132,252,.1)', border: '1px solid rgba(192,132,252,.3)', color: 'var(--text)', lineHeight: 1.75, marginBottom: 30 }}>
        <strong style={{ color: '#c084fc' }}>Dedicated track in progress.</strong> This map is a plan, not a claim that every lesson is published.
        {publishedLessons.length > 0
          ? ' Start with the related live lessons below; they remain part of the AI & ML track and are not duplicated.'
          : ' Existing live learning tracks remain available while this path is developed.'}
      </div>

      <header style={{ marginBottom: 34 }}>
        <div style={{ fontSize: 36, marginBottom: 12 }} aria-hidden="true">{track.icon}</div>
        <p style={{ color: 'var(--muted)', fontSize: 16, lineHeight: 1.8, maxWidth: 820 }}>{track.description}</p>
        <p style={{ color: 'var(--muted)', fontSize: 13 }}>Potential roles: {track.roles}</p>
      </header>

      {(prerequisites.length > 0 || projects.length > 0) && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(280px, 100%), 1fr))', gap: 14, marginBottom: 30 }}>
          {[
            { heading: 'Before you start', items: prerequisites, empty: '' },
            { heading: 'What you’ll build', items: projects, empty: '' },
          ].filter(group => group.items.length > 0).map(group => (
            <section key={group.heading} aria-label={group.heading} style={{ padding: 16, borderRadius: 10, background: 'var(--surface)', border: '1px solid var(--border)' }}>
              <h2 style={{ color: 'var(--text)', fontSize: 15, margin: '0 0 8px' }}>{group.heading}</h2>
              <ul style={{ margin: 0, paddingLeft: 18, color: 'var(--muted)', fontSize: 13, lineHeight: 1.75 }}>
                {group.items.map(item => <li key={item}>{item}</li>)}
              </ul>
            </section>
          ))}
        </div>
      )}

      <NotifyMeForm trackSlug={track.slug} trackTitle={track.title} color={track.color} />

      {publishedLessons.length > 0 && (
        <section aria-labelledby="related-live-lessons" style={{ marginBottom: 38 }}>
          <h2 id="related-live-lessons" style={{ color: 'var(--text)', fontSize: 22, margin: '0 0 6px' }}>
            Start with these published lessons
          </h2>
          <p style={{ color: 'var(--muted)', fontSize: 13, lineHeight: 1.7, margin: '0 0 14px' }}>
            These existing AI &amp; ML lessons cover foundations for this path. They count in their original track.
          </p>
          <ol style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(260px, 100%), 1fr))', gap: 10, padding: 0, margin: 0, listStyle: 'none' }}>
            {publishedLessons.map((lesson, index) => (
              <li key={lesson.href}>
                <Link href={lesson.href} style={{ display: 'block', height: '100%', padding: 15, borderRadius: 10, background: 'var(--surface)', border: '1px solid var(--border)', color: 'var(--text)', textDecoration: 'none' }}>
                  <span style={{ display: 'block', color: track.color, fontSize: 10, fontWeight: 700, letterSpacing: '.06em', textTransform: 'uppercase' }}>
                    {String(index + 1).padStart(2, '0')} · {lesson.stage}
                  </span>
                  <strong style={{ display: 'block', marginTop: 6 }}>{lesson.title}</strong>
                  <span style={{ display: 'block', color: 'var(--muted)', fontSize: 12, lineHeight: 1.6, marginTop: 5 }}>{lesson.description}</span>
                </Link>
              </li>
            ))}
          </ol>
        </section>
      )}

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(170px, 1fr))', gap: 12, marginBottom: 38 }}>
        {[
          [String(skillCount), 'skills mapped'],
          [String(track.stages.length), 'learning stages'],
          [String(publishedLessons.length), publishedLessons.length ? 'related live lessons' : 'published lessons'],
        ].map(([value, label]) => (
          <div key={label} style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 10, padding: 16 }}>
            <strong style={{ display: 'block', color: track.color, fontSize: 23 }}>{value}</strong>
            <span style={{ color: 'var(--muted)', fontSize: 13 }}>{label}</span>
          </div>
        ))}
      </div>

      {track.stages.map((stage, index) => (
        <section key={stage.title} aria-labelledby={`planned-stage-${index}`} style={{ marginBottom: 34 }}>
          <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', gap: 12, marginBottom: 12 }}>
            <h2 id={`planned-stage-${index}`} style={{ color: 'var(--text)', fontSize: 21, margin: 0 }}>{stage.title}</h2>
            <span style={{ color: '#c084fc', fontSize: 10, fontWeight: 700, letterSpacing: '.06em' }}>PLANNED</span>
          </div>
          <ul style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(220px, 100%), 1fr))', gap: 9, padding: 0, margin: 0, listStyle: 'none' }}>
            {stage.skills.map(skill => (
              <li key={skill} style={{ padding: '13px 14px', borderRadius: 9, background: 'var(--surface)', border: '1px solid var(--border)', color: 'var(--text)', fontSize: 13, lineHeight: 1.6 }}>
                <div style={{ fontWeight: 650 }}>
                  <span style={{ color: track.color, marginRight: 8 }} aria-hidden="true">◆</span>{skill}
                </div>
                <p style={{ color: 'var(--muted)', fontSize: 12, lineHeight: 1.65, margin: '6px 0 0' }}>
                  {skillObjective(skill, stage.title, track.title)}
                </p>
              </li>
            ))}
          </ul>
        </section>
      ))}

      <aside style={{ padding: 17, borderRadius: 10, background: 'var(--surface)', border: '1px solid var(--border)', color: 'var(--muted)', lineHeight: 1.75, margin: '36px 0' }}>
        The skill map is a planning outline. Lesson ordering and scope will be reviewed before content is created;
        skills will become live only as lessons are completed and published.
      </aside>
      <Link href="/learn" style={{ color: track.color }}>← Back to all learning tracks</Link>
    </LearnLayout>
  )
}
