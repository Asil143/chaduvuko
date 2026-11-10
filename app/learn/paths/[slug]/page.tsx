import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { CAREER_PATHS, getCareerPath } from '@/data/career-paths'
import { ROLE_ROADMAPS } from '@/data/roadmaps/role-registry'
import { formatHours, resolvePath } from '@/lib/catalog/paths'
import { SCHOOL_BY_AREA } from '@/lib/catalog/schools'
import { PathProgressCard, PathTimeline } from '@/components/learn/PathTimeline'
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

export default function CareerPathPage({ params }: Props) {
  const career = getCareerPath(params.slug)
  if (!career) notFound()
  const path = resolvePath(career)
  const school = SCHOOL_BY_AREA[path.school]
  const roadmap = path.roadmap ? ROLE_ROADMAPS[path.roadmap] : undefined
  const milestones = path.milestones.map(milestone => ({
    title: milestone.title,
    outcome: milestone.outcome,
    status: milestone.status,
    href: milestone.href,
    trackTitle: milestone.trackTitle,
    lessons: milestone.lessons,
    hours: formatHours(milestone.minutes),
  }))
  const stats = [
    { label: 'Milestones', value: String(path.milestones.length) },
    { label: 'Live lessons', value: String(path.liveLessons) },
    { label: 'Study time', value: path.minutes ? `~${Math.round(path.minutes / 60)}h` : 'Soon' },
    { label: path.plannedMilestones ? 'Coming soon' : 'Capstone', value: path.plannedMilestones ? String(path.plannedMilestones) : '1' },
  ]

  return (
    <div className="cp-page">
      <BreadcrumbJsonLd items={[
        { name: 'Learn', url: 'https://chaduvuko.com/learn' },
        { name: 'Career paths', url: 'https://chaduvuko.com/learn/paths' },
        { name: path.title, url: `https://chaduvuko.com/learn/paths/${path.slug}` },
      ]} />

      <section className="cp-hero" aria-labelledby="path-title">
        <div className="cp-hero-copy">
          <nav aria-label="Breadcrumb" className="cp-breadcrumb">
            <Link href="/learn/paths">Career paths</Link>
            <span aria-hidden="true">/</span>
            <Link href={`/learn/schools/${school.slug}`}>{school.title}</Link>
          </nav>
          <p className="cp-eyebrow">Career path</p>
          <h1 id="path-title">{path.title}</h1>
          <p className="cp-summary">{path.summary}</p>
          <p className="cp-audience"><span aria-hidden="true">👤</span> {path.audience}</p>
          <ul className="cp-includes" aria-label="This path includes">
            <li>Step-by-step milestones</li>
            <li>Hands-on lessons</li>
            <li>Capstone project</li>
            <li>Interview preparation</li>
          </ul>
          {roadmap && (
            <p className="cp-roadmap-link">
              <Link href={`/learn/roadmap/${path.roadmap}`}>View the full {roadmap.title} skills roadmap →</Link>
            </p>
          )}
        </div>
        <PathProgressCard milestones={milestones} stats={stats} />
      </section>

      <section aria-labelledby="milestones-heading" className="cp-section">
        <div className="cp-section-head">
          <h2 id="milestones-heading">Your learning journey</h2>
          <p>Follow the milestones in order. Each one builds on the skills from the last.</p>
        </div>
        <PathTimeline milestones={milestones} />
      </section>

      <div className="cp-finish">
        <section aria-labelledby="capstone" className="cp-finish-card cp-capstone">
          <p className="cp-kicker">Prove it</p>
          <h2 id="capstone">Capstone: {path.capstone.title}</h2>
          <p>{path.capstone.description}</p>
          {path.capstone.href
            ? <Link href={path.capstone.href} className="cp-btn cp-btn-primary">Open the project →</Link>
            : <span className="cp-pill cp-pill-soon">Project brief coming soon</span>}
        </section>
        <section aria-labelledby="interview" className="cp-finish-card">
          <p className="cp-kicker">Get hired</p>
          <h2 id="interview">Interview preparation</h2>
          <ul>
            {path.interview.map(item => (
              <li key={item.href}><Link href={item.href}>{item.title} →</Link></li>
            ))}
          </ul>
        </section>
      </div>

      <p className="cp-back"><Link href="/learn/paths">← All career paths</Link></p>
    </div>
  )
}
