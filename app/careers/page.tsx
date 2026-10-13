import type { Metadata } from 'next'
import Link from 'next/link'
import { CAREER_ROLES, CAREERS_EMAIL, type CareerRole } from '@/data/careers'

export const metadata: Metadata = {
  title: 'Careers',
  description:
    'Open YouTube instructor roles at Chaduvuko. Teach AWS, data structures and algorithms, Python, mathematics, physics, Azure, Google Cloud, cybersecurity, or blockchain.',
}

function applyHref(role: CareerRole) {
  const subject = `YouTube — ${role.title}`
  return `mailto:${CAREERS_EMAIL}?subject=${encodeURIComponent(subject)}`
}

export default function CareersPage() {
  return (
    <div className="careers">
      <style>{`
        .careers {
          background: var(--bg);
          min-height: 100vh;
          color: var(--text);
        }
        .careers-wrap {
          max-width: 920px;
          margin: 0 auto;
          padding: 96px 24px 80px;
        }
        .careers-kicker {
          color: var(--accent);
          font-size: 12px;
          font-weight: 800;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          margin-bottom: 16px;
        }
        .careers h1 {
          color: var(--text);
          font-size: clamp(36px, 6vw, 64px);
          line-height: 0.98;
          font-weight: 800;
          margin: 0 0 22px;
          letter-spacing: 0;
        }
        .careers-lead {
          color: var(--text2);
          font-size: 18px;
          line-height: 1.7;
          margin: 0 0 18px;
          max-width: 760px;
        }
        .careers-note {
          border: 1px solid var(--border);
          background: var(--surface);
          border-radius: 8px;
          padding: 18px 18px 8px;
          margin: 28px 0 8px;
        }
        .careers h2 {
          color: var(--text);
          font-size: clamp(26px, 3vw, 34px);
          line-height: 1.15;
          font-weight: 800;
          margin: 8px 0 12px;
        }
        .careers h3 {
          color: var(--muted);
          font-size: 12px;
          font-weight: 800;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          margin: 22px 0 8px;
        }
        .careers p,
        .careers li {
          font-size: 16px;
          line-height: 1.65;
        }
        .careers-note p,
        .careers-note li {
          color: var(--text);
          margin: 0 0 10px;
        }
        .careers-note ul,
        .role ul {
          margin: 0;
          padding-left: 18px;
        }
        .role-index {
          display: grid;
          grid-template-columns: 1fr;
          gap: 10px;
          margin: 28px 0 12px;
          padding: 0;
          list-style: none;
        }
        @media (min-width: 720px) {
          .role-index { grid-template-columns: 1fr 1fr; }
        }
        .role-index a {
          display: block;
          height: 100%;
          text-decoration: none;
          border: 1px solid var(--border);
          border-radius: 8px;
          padding: 14px 16px;
          background: var(--surface);
          color: inherit;
        }
        .role-index a:hover { border-color: var(--accent); }
        .role-index a:focus-visible,
        .apply:focus-visible,
        .track-note a:focus-visible {
          outline: 2px solid var(--accent);
          outline-offset: 2px;
        }
        .role-index-no {
          display: block;
          color: var(--accent);
          font-size: 12px;
          font-weight: 800;
          letter-spacing: 0.06em;
          margin-bottom: 6px;
        }
        .role-index strong {
          display: block;
          color: var(--text);
          font-size: 16px;
          line-height: 1.3;
          margin-bottom: 6px;
        }
        .role-index span {
          display: block;
          color: var(--muted);
          font-size: 14px;
          line-height: 1.5;
        }
        .role {
          border-top: 1px solid var(--border);
          padding: 36px 0 12px;
          scroll-margin-top: 88px;
        }
        .role-summary {
          color: var(--text2);
          font-size: 17px;
          line-height: 1.65;
          margin: 0;
          max-width: 760px;
        }
        .role li {
          color: var(--text);
          margin: 0 0 8px;
        }
        .track-note {
          color: var(--text2);
          margin: 16px 0 0;
        }
        .track-note a {
          color: var(--accent);
          font-weight: 700;
        }
        .apply-row {
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          gap: 12px;
          margin-top: 22px;
        }
        .apply {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          min-height: 44px;
          max-width: 100%;
          min-width: 0;
          background: var(--green);
          color: #04140a;
          border-radius: 6px;
          padding: 11px 18px;
          font-size: 14px;
          font-weight: 800;
          line-height: 1.3;
          text-align: center;
          text-decoration: none;
          white-space: normal;
        }
        .apply-subject {
          color: var(--muted);
          font-size: 13px;
          line-height: 1.4;
        }
      `}</style>

      <div className="careers-wrap">
        <div className="careers-kicker">Careers</div>
        <h1 className="font-display">Teach one subject on the Chaduvuko YouTube channel.</h1>
        <p className="careers-lead">
          Nine instructor roles are open. Each one is video creation for the Chaduvuko YouTube
          channel: you plan a series, record it, and hand over lessons a student can follow from
          the first idea to the last exercise.
        </p>
        <p className="careers-lead">
          Record in clear spoken English. If you also teach the subject in another language, say so.
          Compensation and schedule are agreed after we review your sample.
        </p>

        <section className="careers-note" aria-labelledby="how-to-apply">
          <h2 id="how-to-apply">How to apply</h2>
          <p>
            Send one email to <a href={`mailto:${CAREERS_EMAIL}`}>{CAREERS_EMAIL}</a>. Use the subject
            line on the role. A resume alone is not an application. Include:
          </p>
          <ul>
            <li>A short note on how you teach this subject, and who the series is for.</li>
            <li>An outline of the first five to eight videos, in order.</li>
            <li>One sample: a video, a short screen recording, or a written lesson in your voice.</li>
          </ul>
        </section>

        <h2 style={{ marginTop: 36 }}>Open roles</h2>
        <ol className="role-index">
          {CAREER_ROLES.map((role, index) => (
            <li key={role.slug}>
              <a href={`#${role.slug}`}>
                <span className="role-index-no">{String(index + 1).padStart(2, '0')} · {role.subject}</span>
                <strong>{role.title}</strong>
                <span>{role.summary}</span>
              </a>
            </li>
          ))}
        </ol>

        {CAREER_ROLES.map((role, index) => (
          <article key={role.slug} id={role.slug} className="role" aria-labelledby={`${role.slug}-title`}>
            <div className="careers-kicker">
              {String(index + 1).padStart(2, '0')} · YouTube series · {role.subject}
            </div>
            <h2 id={`${role.slug}-title`}>{role.title}</h2>
            <p className="role-summary">{role.summary}</p>
            {role.track ? (
              <p className="track-note">
                Chaduvuko already teaches this in writing. Read{' '}
                <Link href={role.track.href}>{role.track.label}</Link> before you outline the videos,
                and teach in that plain, practical voice.
              </p>
            ) : (
              <p className="track-note">
                This series is new. There is no written {role.subject.toLowerCase()} track on the site yet.
                The videos are the course.
              </p>
            )}

            <h3>What you will make</h3>
            <ul>
              {role.make.map(item => (
                <li key={item}>{item}</li>
              ))}
            </ul>

            <h3>What you bring</h3>
            <ul>
              {role.bring.map(item => (
                <li key={item}>{item}</li>
              ))}
            </ul>

            <h3>Useful, not required</h3>
            <ul>
              {role.preferred.map(item => (
                <li key={item}>{item}</li>
              ))}
            </ul>

            <div className="apply-row">
              <a className="apply" href={applyHref(role)}>
                Apply for {role.title}
              </a>
              <span className="apply-subject">Subject: YouTube — {role.title}</span>
            </div>
          </article>
        ))}
      </div>
    </div>
  )
}
