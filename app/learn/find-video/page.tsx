import type { Metadata } from 'next'
import { VideoFinder } from '@/components/youtube/VideoFinder'

export const metadata: Metadata = {
  title: 'Find the Best YouTube Video — Chaduvuko',
  description: 'Type any topic you\'re struggling with and we\'ll find the best-matching YouTube video, ranked by views and real engagement.',
}

export default function FindVideoPage() {
  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)', padding: '60px 24px' }}>
      <div style={{ maxWidth: 700, margin: '0 auto' }}>

        <div style={{ marginBottom: 32 }}>
          <div style={{ fontSize: 10, fontWeight: 800, letterSpacing: '.14em', textTransform: 'uppercase', color: 'var(--muted)', marginBottom: 12 }}>Video Finder</div>
          <h1 style={{ fontSize: 'clamp(28px,4vw,42px)', fontWeight: 900, letterSpacing: '-2px', color: 'var(--text)', lineHeight: 1.08, marginBottom: 16 }}>
            Find the <span style={{ color: 'var(--green)' }}>best video</span> on any topic.
          </h1>
          <p style={{ fontSize: 15, color: 'var(--muted)', lineHeight: 1.7, maxWidth: 520 }}>
            Type what you're stuck on — we rank real YouTube videos by views and engagement, so you skip the low-quality noise and land on the best one.
          </p>
        </div>

        <VideoFinder />

      </div>
    </div>
  )
}
