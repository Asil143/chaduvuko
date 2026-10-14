import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import {
  CAREER_ROLES,
  CAREERS_EMAIL,
  CAREERS_POSTED,
  HIRING_STEPS,
  careerApplyHref,
  getCareerRole,
} from '@/data/careers'

export function generateStaticParams() {
  return CAREER_ROLES.map(role => ({ slug: role.slug }))
}

export const dynamicParams = false

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const role = getCareerRole(params.slug)
  if (!role) return { title: 'Job openings' }
  return {
    title: role.title,
    description: role.summary,
  }
}

function Items({ items }: { items: string[] }) {
  return (
    <ul>
      {items.map(item => <li key={item}>{item}</li>)}
    </ul>
  )
}

export default function CareerRolePage({ params }: { params: { slug: string } }) {
  const role = getCareerRole(params.slug)
  if (!role) notFound()
  const href = careerApplyHref(role.title)

  return (
    <article className="jobs-wrap job-doc">
      <Link className="job-back" href="/careers">← Job openings</Link>
      <h1 className="font-display">{role.title}</h1>

      {/* Compact header: the facts a candidate scans first, then Apply. */}
      <div className="job-headline">
        <p className="job-meta-line"><strong>Location:</strong> {role.location}</p>
        <p className="job-meta-line"><strong>Engagement:</strong> {role.employment}</p>
        <p className="job-meta-line"><strong>Experience:</strong> {role.experience}</p>
        <p className="job-meta-line"><strong>Compensation:</strong> {role.compensation}</p>
      </div>
      <p className="job-apply-row">
        <a className="job-apply" href={href}>Apply</a>
      </p>
      <p className="job-subtle">
        Reference {role.slug} · {role.team} · {role.subject} · {role.language} · Posted {CAREERS_POSTED}
      </p>

      <h2>Build the Agentic AI learning track at Chaduvuko</h2>
      {role.intro.map(paragraph => <p key={paragraph}>{paragraph}</p>)}

      <h2>What you will own</h2>
      <p>{role.own.lead}</p>
      <Items items={role.own.items} />
      <p>{role.own.close}</p>

      <h2>What you will teach</h2>
      <p>{role.teach.lead}</p>
      {role.teach.sections.map(section => (
        <div key={section.heading}>
          <h3>{section.heading}</h3>
          <Items items={section.items} />
        </div>
      ))}

      <h2>What we are looking for</h2>
      <p>{role.looking.lead}</p>
      <h3>Required skills</h3>
      <Items items={role.looking.required} />
      <p>You should also be comfortable reasoning about:</p>
      <Items items={role.looking.reasoning} />
      <h3>Teaching ability matters</h3>
      <p>{role.looking.teachingLead}</p>
      <Items items={role.looking.teaching} />
      <p className="job-note">{role.looking.teachingNote}</p>
      <h3>Preferred experience</h3>
      <p>{role.looking.preferredLead}</p>
      <Items items={role.looking.preferred} />
      <p className="job-note">{role.looking.preferredNote}</p>
      <h3>Experience philosophy</h3>
      {role.looking.philosophy.map(paragraph => <p key={paragraph}>{paragraph}</p>)}

      <h2>Content and lesson standards</h2>
      <p>Each lesson should have:</p>
      <Items items={role.standards.items} />
      <p>Typical target durations:</p>
      <Items items={role.standards.durations} />
      <p className="job-note">{role.standards.note}</p>

      <h2>What success looks like</h2>
      <Items items={role.success.items} />
      <p className="job-note">{role.success.note}</p>

      <h2>How we hire</h2>
      <ol>
        {HIRING_STEPS.map(step => (
          <li key={step.title}>
            <strong>{step.title}.</strong> {step.body}
          </li>
        ))}
      </ol>

      <h2>Compensation</h2>
      {role.compensationDetail.map(paragraph => <p key={paragraph}>{paragraph}</p>)}

      <h2>How to apply</h2>
      <p>
        Apply through <Link href="/careers">Chaduvuko Careers</Link> or email{' '}
        <a href={href}>{CAREERS_EMAIL}</a>. {role.application.lead}
      </p>
      <Items items={role.application.items} />

      <h3>Candidate privacy</h3>
      <p>{role.application.note}</p>

      <p className="job-equal">
        Build. Teach. Help others grow. If you enjoy building modern AI systems and can explain the
        engineering behind them — not just demonstrate a framework — we would like to hear from you.
      </p>

      <p className="job-apply-row">
        <a className="job-apply" href={href}>Apply for this role</a>
      </p>
    </article>
  )
}
