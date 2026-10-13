import type { Metadata } from 'next'
import Link from 'next/link'
import { CAREER_ROLES, CAREERS_EMAIL, HIRING_STEPS } from '@/data/careers'

export const metadata: Metadata = {
  title: 'Careers',
  description:
    'Open YouTube instructor roles at Chaduvuko. Teach AWS, data structures and algorithms, Python, mathematics, physics, Azure, Google Cloud, cybersecurity, or blockchain.',
}

export default function CareersPage() {
  return (
    <div className="jobs-wrap">
      <p className="jobs-kicker">Careers</p>
      <h1 className="font-display">Open roles</h1>
      <p className="jobs-lead">
        We are hiring instructors to record lesson series for the Chaduvuko YouTube channel.
        Record in clear spoken English. The outline, the schedule, and the pay are agreed after we watch a sample of your teaching.
      </p>

      <ol className="hire-steps">
        {HIRING_STEPS.map((step, index) => (
          <li key={step.title}>
            <span className="hire-num">{index + 1}</span>
            <strong>{step.title}</strong>
            <span>{step.body}</span>
          </li>
        ))}
      </ol>

      <section className="jobs-section" aria-labelledby="youtube-roles">
        <div className="jobs-section-label" id="youtube-roles">
          <span>YouTube</span>
          <span>{CAREER_ROLES.length} roles</span>
        </div>
        <ul className="job-list">
          {CAREER_ROLES.map(role => (
            <li key={role.slug}>
              <Link className="job-row" href={`/careers/${role.slug}`}>
                <strong>{role.title}</strong>
                <span className="job-team">{role.subject}</span>
                <span className="job-arrow" aria-hidden="true">→</span>
              </Link>
            </li>
          ))}
        </ul>
        <p className="jobs-foot">
          Open a role for the full posting. Applications go to{' '}
          <a href={`mailto:${CAREERS_EMAIL}`}>{CAREERS_EMAIL}</a>.
          We do not ask applicants for money.
        </p>
      </section>
    </div>
  )
}
