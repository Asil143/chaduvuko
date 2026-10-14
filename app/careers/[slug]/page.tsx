import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import {
  CAREER_ROLES,
  CAREERS_EMAIL,
  CAREERS_POSTED,
  HIRING_STEPS,
  getCareerRole,
} from '@/data/careers'
import { ApplicationForm } from '@/components/careers/ApplicationForm'

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
  const applyHref = '#apply'
  const emailHref = `mailto:${CAREERS_EMAIL}?subject=${encodeURIComponent(`Application — ${role.title}`)}`

  return (
    <article className="jobs-wrap job-doc job-page">
      <Link className="job-back" href="/careers">← All open roles</Link>
      <header className="job-hero">
        <p className="job-eyebrow">{role.subject} <span aria-hidden="true">/</span> {role.team}</p>
        <div className="job-hero-row">
          <h1 className="font-display">{role.title}</h1>
          <p className="job-hero-summary">{role.summary}</p>
          <a className="job-apply" href={applyHref}>Apply for this role</a>
        </div>
        <dl className="job-facts">
          <div><dt>Location</dt><dd>{role.location}</dd></div>
          <div><dt>Engagement</dt><dd>{role.employment}</dd></div>
          <div><dt>Experience</dt><dd>{role.experience}</dd></div>
          <div><dt>Language</dt><dd>{role.language}</dd></div>
          <div><dt>Posted</dt><dd>{CAREERS_POSTED}</dd></div>
          <div className="job-fact-wide"><dt>Compensation</dt><dd>{role.compensation}</dd></div>
        </dl>
      </header>

      <div className="job-content-grid">
        <main className="job-main">
          <section className="job-section" id="about-role">
            <div className="job-section-heading">
              <span>01</span>
              <div><p>THE OPPORTUNITY</p><h2>Build the Agentic AI learning track</h2></div>
            </div>
            {role.intro.map(paragraph => <p key={paragraph}>{paragraph}</p>)}
          </section>

          <section className="job-section" id="responsibilities">
            <div className="job-section-heading">
              <span>02</span>
              <div><p>WHAT YOU WILL DO</p><h2>Own the learning experience</h2></div>
            </div>
            <p>{role.own.lead}</p>
            <Items items={role.own.items} />
            <p className="job-note">{role.own.close}</p>
          </section>

          <section className="job-section" id="curriculum">
            <div className="job-section-heading">
              <span>03</span>
              <div><p>CURRICULUM SCOPE</p><h2>What you will teach</h2></div>
            </div>
            <p>{role.teach.lead}</p>
            <div className="job-topics">
              {role.teach.sections.map(section => (
                <div className="job-topic-card" key={section.heading}>
                  <h3>{section.heading}</h3>
                  <Items items={section.items} />
                </div>
              ))}
            </div>
          </section>

          <section className="job-section" id="qualifications">
            <div className="job-section-heading">
              <span>04</span>
              <div><p>WHAT YOU BRING</p><h2>Skills and experience</h2></div>
            </div>
            <p>{role.looking.lead}</p>
            <div className="job-requirement-grid">
              <div className="job-requirement-card">
                <h3>Required skills</h3>
                <Items items={role.looking.required} />
                <p>You should also be comfortable reasoning about:</p>
                <Items items={role.looking.reasoning} />
              </div>
              <div className="job-requirement-card">
                <h3>Teaching ability</h3>
                <p>{role.looking.teachingLead}</p>
                <Items items={role.looking.teaching} />
                <p className="job-note">{role.looking.teachingNote}</p>
              </div>
            </div>
            <div className="job-preferred">
              <h3>Preferred experience</h3>
              <p>{role.looking.preferredLead}</p>
              <Items items={role.looking.preferred} />
              <p className="job-note">{role.looking.preferredNote}</p>
            </div>
            <div className="job-philosophy">
              <h3>How we think about experience</h3>
              {role.looking.philosophy.map(paragraph => <p key={paragraph}>{paragraph}</p>)}
            </div>
          </section>

          <section className="job-section" id="lesson-standards">
            <div className="job-section-heading">
              <span>05</span>
              <div><p>HOW WE BUILD CONTENT</p><h2>Lesson standards</h2></div>
            </div>
            <p>Each lesson should have:</p>
            <Items items={role.standards.items} />
            <p>Typical target durations:</p>
            <Items items={role.standards.durations} />
            <p className="job-note">{role.standards.note}</p>
          </section>

          <section className="job-section" id="success">
            <div className="job-section-heading">
              <span>06</span>
              <div><p>OUTCOMES</p><h2>What success looks like</h2></div>
            </div>
            <Items items={role.success.items} />
            <p className="job-note">{role.success.note}</p>
          </section>

          <section className="job-section" id="hiring-process">
            <div className="job-section-heading">
              <span>07</span>
              <div><p>THE PROCESS</p><h2>How we hire</h2></div>
            </div>
            <ol className="hire-list">
              {HIRING_STEPS.map((step, index) => (
                <li key={step.title}>
                  <span className="hire-num">{String(index + 1).padStart(2, '0')}</span>
                  <div><strong>{step.title}</strong><span>{step.body}</span></div>
                </li>
              ))}
            </ol>
          </section>

          <section className="job-section" id="compensation">
            <div className="job-section-heading">
              <span>08</span>
              <div><p>PAY & ENGAGEMENT</p><h2>Compensation</h2></div>
            </div>
            <div className="job-compensation">
              {role.compensationDetail.map(paragraph => <p key={paragraph}>{paragraph}</p>)}
            </div>
          </section>

          <section className="job-section" id="application-details">
            <div className="job-section-heading">
              <span>09</span>
              <div><p>READY TO APPLY?</p><h2>What to include</h2></div>
            </div>
            <p>{role.application.lead}</p>
            <Items items={role.application.items} />
            <h3>Candidate privacy</h3>
            <p className="job-note">{role.application.note}</p>
            <p className="job-contact">
              Questions about the role or application? <a href={emailHref}>{CAREERS_EMAIL}</a>
            </p>
          </section>
        </main>

        <aside className="job-sidebar" aria-label="Role summary">
          <div className="job-sidebar-card">
            <p className="job-sidebar-label">ROLE SNAPSHOT</p>
            <dl>
              <div><dt>Team</dt><dd>{role.team}</dd></div>
              <div><dt>Location</dt><dd>{role.location}</dd></div>
              <div><dt>Engagement</dt><dd>{role.employment}</dd></div>
              <div><dt>Experience</dt><dd>{role.experience}</dd></div>
            </dl>
            <a className="job-apply job-sidebar-apply" href={applyHref}>Start your application</a>
            <p className="job-sidebar-footnote">No recruitment fees. Teaching samples are optional.</p>
          </div>
          <nav className="job-sidebar-nav" aria-label="On this page">
            <p className="job-sidebar-label">ON THIS PAGE</p>
            <a href="#responsibilities">Responsibilities</a>
            <a href="#curriculum">Curriculum scope</a>
            <a href="#qualifications">Skills and experience</a>
            <a href="#hiring-process">Hiring process</a>
            <a href="#compensation">Compensation</a>
            <a href="#application-details">Application details</a>
          </nav>
        </aside>
      </div>

      <ApplicationForm jobSlug={role.slug} jobTitle={role.title} />
    </article>
  )
}
