import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import {
  CAREER_ROLES,
  CAREERS_ABOUT,
  CAREERS_EMAIL,
  CAREERS_PAY,
  CAREERS_POSTED,
  HIRING_STEPS,
  SERIES_DELIVERABLES,
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
      <Link className="job-back" href="/careers">Job openings</Link>
      <h1 className="font-display">{role.title}</h1>
      <p className="job-apply-row">
        <a className="job-apply" href={href}>Apply</a>
      </p>
      <p className="job-meta-line"><strong>Reference:</strong> {role.slug}</p>
      <p className="job-meta-line"><strong>Posted:</strong> {CAREERS_POSTED}</p>
      <p className="job-meta-line"><strong>Subject:</strong> {role.subject}</p>
      <p className="job-meta-line"><strong>Team:</strong> YouTube</p>
      <p className="job-meta-line"><strong>Language:</strong> Spoken English</p>

      <h2>Who we are</h2>
      <p>{CAREERS_ABOUT}</p>

      <h2>Job description</h2>
      <p>{role.summary}</p>
      <h3>The learner</h3>
      <p>{role.learner}</p>
      <h3>The work</h3>
      <Items items={role.assignment} />
      {role.track ? (
        <p className="job-note">
          Chaduvuko already teaches this in writing. Read{' '}
          <Link href={role.track.href}>{role.track.label}</Link> before you outline the videos, and do not contradict them.
        </p>
      ) : (
        <p className="job-note">
          This series is new. There is no written {role.subject.toLowerCase()} track on the site yet, so the videos are the first version of the subject.
        </p>
      )}
      <h3>The series</h3>
      <Items items={role.make} />
      <h3>Every video</h3>
      <Items items={SERIES_DELIVERABLES} />
      {role.boundaries.length > 0 && (
        <>
          <h3>Limits of this series</h3>
          <Items items={role.boundaries} />
        </>
      )}

      <h2>Job requirements</h2>
      <Items items={role.bring} />
      <h3>Preferred</h3>
      <Items items={role.preferred} />

      <h2>How we hire</h2>
      <ol>
        {HIRING_STEPS.map(step => (
          <li key={step.title}>
            <strong>{step.title}.</strong> {step.body}
          </li>
        ))}
      </ol>

      <h2>Compensation</h2>
      <p>{CAREERS_PAY}</p>

      <p className="job-equal">
        We consider each sample on the teaching. We do not ask applicants for money.
        Questions go to <a href={`mailto:${CAREERS_EMAIL}`}>{CAREERS_EMAIL}</a>.
      </p>

      <p className="job-apply-row">
        <a className="job-apply" href={href}>Apply for this role</a>
      </p>
    </article>
  )
}
