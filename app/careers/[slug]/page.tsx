import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { CAREER_ROLES, careerApplyHref, getCareerRole } from '@/data/careers'

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

export default function CareerRolePage({ params }: { params: { slug: string } }) {
  const role = getCareerRole(params.slug)
  if (!role) notFound()
  const href = careerApplyHref(role.title)

  return (
    <article className="jobs-wrap">
      <Link className="job-back" href="/careers">All roles</Link>
      <p className="job-meta">YouTube · {role.subject}</p>
      <div className="job-head">
        <h1 className="font-display">{role.title}</h1>
        <a className="job-apply" href={href}>Apply</a>
      </div>
      <p className="job-summary">{role.summary}</p>
      {role.track ? (
        <p className="job-note">
          Chaduvuko already teaches this in writing. Read{' '}
          <Link href={role.track.href}>{role.track.label}</Link> before you outline the videos.
        </p>
      ) : (
        <p className="job-note">
          This series is new. There is no written {role.subject.toLowerCase()} track on the site yet.
        </p>
      )}

      <section className="job-block">
        <h2>What you will make</h2>
        <ul>
          {role.make.map(item => <li key={item}>{item}</li>)}
        </ul>
      </section>
      <section className="job-block">
        <h2>What you bring</h2>
        <ul>
          {role.bring.map(item => <li key={item}>{item}</li>)}
        </ul>
      </section>
      <section className="job-block">
        <h2>Useful, not required</h2>
        <ul>
          {role.preferred.map(item => <li key={item}>{item}</li>)}
        </ul>
      </section>

      <div className="job-apply-bar">
        <a className="job-apply" href={href}>Apply for this role</a>
        <span className="job-subject">Subject: YouTube — {role.title}</span>
      </div>
    </article>
  )
}
