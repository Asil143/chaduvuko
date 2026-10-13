import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import {
  CAREER_ROLES,
  CAREERS_ABOUT,
  CAREERS_EMAIL,
  CAREERS_PAY,
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
  if (!role) return { title: 'Careers' }
  return {
    title: role.title,
    description: role.summary,
  }
}

function Block({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="job-block">
      <h2>{title}</h2>
      {children}
    </section>
  )
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
    <article className="jobs-wrap">
      <Link className="job-back" href="/careers">All roles</Link>
      <div className="job-head">
        <h1 className="font-display">{role.title}</h1>
        <a className="job-apply" href={href}>Apply</a>
      </div>

      <dl className="job-facts">
        <div>
          <dt>Team</dt>
          <dd>YouTube</dd>
        </div>
        <div>
          <dt>Subject</dt>
          <dd>{role.subject}</dd>
        </div>
        <div>
          <dt>Language</dt>
          <dd>Spoken English</dd>
        </div>
        <div>
          <dt>Compensation</dt>
          <dd>Agreed after a sample</dd>
        </div>
      </dl>

      <p className="job-summary">{role.summary}</p>

      <Block title="The learner">
        <p>{role.learner}</p>
      </Block>

      <Block title="The role">
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
      </Block>

      <Block title="The series">
        <Items items={role.make} />
      </Block>

      <Block title="Every video">
        <Items items={SERIES_DELIVERABLES} />
      </Block>

      {role.boundaries.length > 0 && (
        <Block title="Limits of this series">
          <Items items={role.boundaries} />
        </Block>
      )}

      <Block title="Minimum qualifications">
        <Items items={role.bring} />
      </Block>

      <Block title="Preferred qualifications">
        <Items items={role.preferred} />
      </Block>

      <Block title="How we hire">
        <ol className="hire-detail">
          {HIRING_STEPS.map(step => (
            <li key={step.title}>
              <strong>{step.title}</strong>
              <span>{step.body}</span>
            </li>
          ))}
        </ol>
      </Block>

      <Block title="Compensation">
        <p>{CAREERS_PAY}</p>
      </Block>

      <Block title="About Chaduvuko">
        <p>{CAREERS_ABOUT}</p>
      </Block>

      <p className="job-equal">
        We consider each sample on the teaching. Questions about the role go to{' '}
        <a href={`mailto:${CAREERS_EMAIL}`}>{CAREERS_EMAIL}</a>.
      </p>

      <div className="job-apply-bar">
        <a className="job-apply" href={href}>Apply for this role</a>
        <span className="job-subject">Subject: YouTube — {role.title}</span>
      </div>
    </article>
  )
}
