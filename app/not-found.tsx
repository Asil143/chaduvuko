import Link from 'next/link'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: '404 — Page Not Found · Asil',
}

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 text-center"
      style={{ background: 'var(--bg)' }}>

      <div className="mb-6 font-mono text-8xl font-extrabold"
        style={{ color: 'var(--border)' }}>
        404
      </div>

      <h1 className="font-display font-extrabold text-3xl mb-3"
        style={{ color: 'var(--text)' }}>
        This page does not exist
      </h1>

      <p className="text-sm max-w-md mb-10"
        style={{ color: 'var(--muted)', fontFamily: 'Lora, serif', fontStyle: 'italic', lineHeight: '1.7' }}>
        The URL might be wrong, the page might have moved, or it was never here to begin with.
      </p>

      <div className="flex flex-wrap gap-3 justify-center">
        <Link href="/"
          className="px-5 py-2.5 rounded-xl text-sm font-mono font-semibold"
          style={{ background: 'var(--accent)', color: '#fff' }}>
          Go Home
        </Link>
        <Link href="/learn/roadmap"
          className="px-5 py-2.5 rounded-xl text-sm font-mono"
          style={{ background: 'var(--surface)', color: 'var(--text)', border: '1px solid var(--border)' }}>
          Start Learning
        </Link>
        <Link href="/learn/interview"
          className="px-5 py-2.5 rounded-xl text-sm font-mono"
          style={{ background: 'var(--surface)', color: 'var(--text)', border: '1px solid var(--border)' }}>
          Interview Prep
        </Link>
      </div>

      <div className="mt-16 text-xs font-mono" style={{ color: 'var(--muted)' }}>
        As<span style={{ color: 'var(--accent)' }}>il</span> · Free Data Engineering Learning
      </div>
    </div>
  )
}