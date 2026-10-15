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
        quizzes you pass, when each happened, and the last lesson you opened), roadmap and practice
        progress, project milestones, weekly goals,
        playground code and activity (such as runs, streaks, languages used, and the name you enter),
        your commenting identity (a guest name and optional email, or your GitHub profile and a
        sign-in token) with an anonymous voter ID, and preferences such as your theme. It stays on
        your device unless you post or submit it.
      </p>
      <p style={{ color: 'var(--text2)', lineHeight: 1.7 }}>
        Learner accounts are optional. If you request a passwordless email sign-in link, Supabase
        processes your email address to authenticate you. While signed in, learning, quiz, roadmap,
        practice, project, and weekly-goal progress is synced to a private account record in
        Supabase so it can be used on your devices. You can sign out or delete your learner account
        from the dashboard. Deleting the account deletes its synced progress; browser-local progress
        remains on that device.
      </p>
      <p style={{ color: 'var(--text2)', lineHeight: 1.7 }}>
        Comments, newsletter emails, GitHub sign-in data used for comments, and page-view records
        may be stored in Supabase. Lesson feedback you submit is stored for Chaduvuko team review
        without attaching your learner account. Chat messages, playground code you send for review,
        custom roadmap requests, and Find a Video searches are sent to OpenAI so the AI features can respond;
        video searches are also looked up on YouTube.
      </p>
      <p style={{ color: 'var(--text2)', lineHeight: 1.7 }}>
        If you ask to hear about a planned learning track, we store your email address, the track
        you selected, and the request time in Supabase. The Chaduvuko team can use this to understand
        demand and send relevant track updates. You can ask us to remove your request by emailing
        hello@chaduvuko.com.
      </p>
      <p style={{ color: 'var(--text2)', lineHeight: 1.7 }}>
        If you apply for a role, we collect the contact, education, experience, project, and other
        application details you provide, plus an optional resume. We use this information to assess
        your application and contact you about hiring. Application records and resumes are stored
        privately and are available only to authorized hiring administrators.
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
        Last updated: October 15, 2026
      </p>
    </div>
  )
}
