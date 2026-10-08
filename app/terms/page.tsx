import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Terms | Chaduvuko',
  description: 'Site terms for Chaduvuko.',
}

export default function TermsPage() {
  return (
    <main style={{ maxWidth: '860px', margin: '0 auto', padding: '96px 24px 80px' }}>
      <h1 className="font-display" style={{ color: 'var(--text)', fontSize: '48px', margin: '0 0 18px' }}>
        Site Terms
      </h1>
      <p style={{ color: 'var(--text2)', lineHeight: 1.7 }}>
        Chaduvuko provides educational content and learning tools for general informational use.
        Lessons, examples, projects, and career resources are offered as-is and should be adapted
        to your own goals, environment, and judgment.
      </p>
      <p style={{ color: 'var(--text2)', lineHeight: 1.7 }}>
        You may use the platform for personal learning. Please do not misuse the service, copy large
        parts of the site into another product, or interfere with the platform for other learners.
      </p>
      <p style={{ color: 'var(--muted)', fontSize: '13px', lineHeight: 1.6 }}>
        Last updated: October 8, 2026
      </p>
    </main>
  )
}
