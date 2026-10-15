import type { Metadata } from 'next'
import Link from 'next/link'
import { getTrackSummaries } from '@/lib/catalog'
import { PathPicker } from '@/components/learn/PathPicker'

export const metadata: Metadata = {
  title: 'Find Your Learning Path',
  description: 'Answer two quick questions and get a suggested order of Chaduvuko tracks for your goal and experience.',
  alternates: { canonical: '/learn/find-your-path' },
}

export default function FindYourPathPage() {
  return (
    <div style={{ maxWidth: 960, margin: '0 auto', padding: '48px clamp(20px, 3vw, 40px) 80px' }}>
      <p style={{ color: 'var(--green)', fontSize: 11, fontWeight: 700, letterSpacing: '.12em', textTransform: 'uppercase' }}>Find your path</p>
      <h1 style={{ color: 'var(--text)', fontSize: 'clamp(28px, 4vw, 40px)', margin: '8px 0 10px' }}>Which track should you start with?</h1>
      <p style={{ color: 'var(--muted)', lineHeight: 1.75, maxWidth: 640, marginBottom: 32 }}>
        Pick a goal and your current level. You’ll get tracks in a prerequisite-friendly order. Tracks marked coming soon show their skill map before lessons are published.
      </p>
      <PathPicker tracks={getTrackSummaries()} />
      <p style={{ marginTop: 36 }}><Link href="/learn" style={{ color: 'var(--green)' }}>← Browse all tracks</Link></p>
    </div>
  )
}
