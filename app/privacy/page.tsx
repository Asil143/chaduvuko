import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Privacy | Chaduvuko',
  description: 'Privacy information for Chaduvuko learners and visitors.',
}

export default function PrivacyPage() {
  return (
    <main style={{ maxWidth: '860px', margin: '0 auto', padding: '96px 24px 80px' }}>
      <h1 className="font-display" style={{ color: 'var(--text)', fontSize: '48px', margin: '0 0 18px' }}>
        Privacy
      </h1>
      <p style={{ color: 'var(--text2)', lineHeight: 1.7 }}>
        Chaduvuko is built to help people learn. We only ask for information when it is needed to
        run the platform, respond to messages, improve lessons, or support learning features such
        as progress tracking.
      </p>
      <p style={{ color: 'var(--text2)', lineHeight: 1.7 }}>
        We do not sell learner data. If you contact us, subscribe, or use interactive tools, we may
        use that information to provide the requested experience and keep the service reliable.
      </p>
      <p style={{ color: 'var(--muted)', fontSize: '13px', lineHeight: 1.6 }}>
        Last updated: October 8, 2026
      </p>
    </main>
  )
}
