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
        In your browser, localStorage keeps your learning progress (lessons you mark complete,
        quizzes you pass, when each happened, and the last lesson you opened), roadmap progress,
        playground code and activity (such as runs, streaks, languages used, and the name you enter),
        your commenting identity (a guest name and optional email, or your GitHub profile and a
        sign-in token) with an anonymous voter ID, and preferences such as your theme. It stays on
        your device unless you post or submit it.
      </p>
      <p style={{ color: 'var(--text2)', lineHeight: 1.7 }}>
        Comments, newsletter emails, GitHub sign-in data used for comments, and page-view records
        may be stored in Supabase. Chat messages, playground code you send for review, custom
        roadmap requests, and Find a Video searches are sent to Groq so the AI features can respond;
        video searches are also looked up on YouTube.
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
        Last updated: October 9, 2026
      </p>
    </div>
  )
}
