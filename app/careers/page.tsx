import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Careers | Chaduvuko',
  description:
    'Join Chaduvuko as we build practical, free IT education for students, career switchers, and working professionals.',
}

export default function CareersPage() {
  return (
    <div style={{ background: 'var(--bg)', minHeight: '100vh' }}>
      <main
        style={{
          maxWidth: '920px',
          margin: '0 auto',
          padding: '96px 24px 80px',
        }}
      >
        <div
          style={{
            color: 'var(--accent)',
            fontSize: '12px',
            fontWeight: 800,
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            marginBottom: '16px',
          }}
        >
          Careers
        </div>

        <h1
          className="font-display"
          style={{
            color: 'var(--text)',
            fontSize: 'clamp(36px, 6vw, 72px)',
            lineHeight: 0.98,
            fontWeight: 900,
            margin: '0 0 22px',
            letterSpacing: '0',
          }}
        >
          Help build the learning platform students wish they had.
        </h1>

        <p
          style={{
            color: 'var(--text2)',
            fontSize: '18px',
            lineHeight: 1.7,
            margin: '0 0 34px',
            maxWidth: '760px',
          }}
        >
          Chaduvuko is preparing to grow the team. We are looking for people who can teach clearly,
          build thoughtfully, and care about helping learners move from confusion to confidence.
        </p>

        <section
          style={{
            borderTop: '1px solid var(--border)',
            borderBottom: '1px solid var(--border)',
            padding: '28px 0',
            display: 'grid',
            gap: '18px',
          }}
        >
          {[
            'Curriculum writers for cloud, data, AI/ML, security, and software engineering.',
            'Frontend and full-stack engineers who can make learning tools feel fast and friendly.',
            'Mentors and reviewers who can turn hard topics into practical feedback.',
          ].map(item => (
            <p key={item} style={{ color: 'var(--text)', margin: 0, fontSize: '16px', lineHeight: 1.6 }}>
              {item}
            </p>
          ))}
        </section>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', marginTop: '34px' }}>
          <a
            href="mailto:hello@chaduvuko.com?subject=Careers%20at%20Chaduvuko"
            style={{
              background: 'var(--green)',
              color: '#000',
              borderRadius: '6px',
              padding: '11px 18px',
              fontSize: '14px',
              fontWeight: 800,
              textDecoration: 'none',
            }}
          >
            Contact us
          </a>
          <Link
            href="/learn"
            style={{
              color: 'var(--text)',
              border: '1px solid var(--border)',
              borderRadius: '6px',
              padding: '11px 18px',
              fontSize: '14px',
              fontWeight: 700,
              textDecoration: 'none',
            }}
          >
            Explore the platform
          </Link>
        </div>
      </main>
    </div>
  )
}
