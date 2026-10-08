import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Privacy',
  description: 'Privacy information for Chaduvuko learners and visitors.',
}

export default function PrivacyPage() {
  return (
    <div style={{ maxWidth: '860px', margin: '0 auto', padding: '96px 24px 80px' }}>
      <h1 className="font-display" style={{ color: 'var(--text)', fontSize: '48px', margin: '0 0 18px' }}>
        Privacy
      </h1>
      <p style={{ color: 'var(--text2)', lineHeight: 1.7 }}>
        Chaduvuko is built to help people learn. We collect only what is needed to run the platform,
        respond to messages, improve lessons, and support learning features such as progress tracking.
      </p>
      <p style={{ color: 'var(--text2)', lineHeight: 1.7 }}>
        The site may store lesson progress, XP, streaks, and similar learning state in your browser
        using localStorage. Comments, newsletter emails, GitHub sign-in data used for comments, and
        page-view records may be stored in Supabase. Chat messages and playground code may be sent
        to Groq so the AI features can respond.
      </p>
      <p style={{ color: 'var(--text2)', lineHeight: 1.7 }}>
        We do not sell learner data. If you contact us, subscribe, sign in, comment, or use
        interactive tools, we use that information to provide the requested feature, protect the
        service, and understand what content is useful.
      </p>
      <p style={{ color: 'var(--text2)', lineHeight: 1.7 }}>
        For privacy questions, contact hello@chaduvuko.com.
      </p>
      <p style={{ color: 'var(--muted)', fontSize: '13px', lineHeight: 1.6 }}>
        Last updated: October 8, 2026
      </p>
    </div>
  )
}
