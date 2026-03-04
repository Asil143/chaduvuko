'use client'
import { useState } from 'react'
import { Link2, Check } from 'lucide-react'

interface Props {
  title: string
  description?: string
}

export function ShareButtons({ title, description }: Props) {
  const [copied, setCopied] = useState(false)

  function getUrl() {
    return typeof window !== 'undefined' ? window.location.href : ''
  }

  function shareTwitter() {
    const text = `${title} — free data engineering tutorial by @Asil143\n\n${getUrl()}`
    window.open('https://twitter.com/intent/tweet?text=' + encodeURIComponent(text), '_blank')
  }

  function shareLinkedIn() {
    const url = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(getUrl())}`
    window.open(url, '_blank')
  }

  function copyLink() {
    navigator.clipboard.writeText(getUrl())
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="flex items-center gap-2 flex-wrap mt-6 pt-6"
      style={{ borderTop: '1px solid var(--border)' }}>
      <span className="text-xs font-mono uppercase tracking-widest mr-1" style={{ color: 'var(--muted)' }}>
        Share
      </span>

      {/* Twitter/X */}
      <button onClick={shareTwitter}
        className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono transition-all"
        style={{ background: 'var(--bg2)', color: 'var(--text2)', border: '1px solid var(--border)' }}
        onMouseEnter={e => (e.currentTarget.style.borderColor = 'var(--accent)')}
        onMouseLeave={e => (e.currentTarget.style.borderColor = 'var(--border)')}>
        <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.746l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
        </svg>
        Post on X
      </button>

      {/* LinkedIn */}
      <button onClick={shareLinkedIn}
        className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono transition-all"
        style={{ background: 'var(--bg2)', color: 'var(--text2)', border: '1px solid var(--border)' }}
        onMouseEnter={e => (e.currentTarget.style.borderColor = '#0a66c2')}
        onMouseLeave={e => (e.currentTarget.style.borderColor = 'var(--border)')}>
        <svg width="12" height="12" viewBox="0 0 24 24" fill="#0a66c2">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
        </svg>
        Share on LinkedIn
      </button>

      {/* Copy link */}
      <button onClick={copyLink}
        className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono transition-all"
        style={{
          background: copied ? 'rgba(0,230,118,0.1)' : 'var(--bg2)',
          color: copied ? 'var(--green)' : 'var(--text2)',
          border: `1px solid ${copied ? 'rgba(0,230,118,0.3)' : 'var(--border)'}`,
        }}>
        {copied ? <Check size={12} /> : <Link2 size={12} />}
        {copied ? 'Copied!' : 'Copy link'}
      </button>
    </div>
  )
}