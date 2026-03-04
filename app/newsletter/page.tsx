'use client'
import { useState } from 'react'
import Link from 'next/link'
import { ArrowRight, CheckCircle, Mail, BookOpen, Code2 } from 'lucide-react'

const topics = [
  { icon: '☁️', title: 'Azure updates', desc: 'New ADF features, Databricks releases, Fabric announcements' },
  { icon: '🟠', title: 'AWS releases', desc: 'Glue, Redshift, and Kinesis updates and new launches' },
  { icon: '🔵', title: 'GCP news', desc: 'BigQuery features, Dataflow improvements, Composer updates' },
  { icon: '📚', title: 'New tutorials', desc: 'Notified when new tutorial pages go live on VedaEra' },
  { icon: '🏗️', title: 'New projects', desc: 'Alerts when new end-to-end project walkthroughs publish' },
  { icon: '🎯', title: 'Interview tips', desc: 'Weekly question and detailed answer to practice with' },
]

export default function NewsletterPage() {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState('')

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!email || !email.includes('@')) { setError('Please enter a valid email address'); return }
    setSubmitted(true)
    setError('')
  }

  return (
    <div className="pt-16 min-h-screen" style={{ background: 'var(--bg)' }}>
      <div className="border-b py-20 px-4 text-center" style={{ borderColor: 'var(--border)', background: 'var(--bg2)' }}>
        <div className="max-w-2xl mx-auto">
          <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl mx-auto mb-5"
            style={{ background: 'var(--accent-glow)', border: '1px solid rgba(0,120,212,0.2)' }}>
            📬
          </div>
          <h1 className="font-display font-extrabold tracking-tight mb-4"
            style={{ fontSize: 'clamp(2rem,5vw,3.5rem)', color: 'var(--text)' }}>
            Stay ahead of the<br />
            <span style={{ color: 'var(--accent)' }}>Data Engineering curve</span>
          </h1>
          <p className="text-base leading-relaxed max-w-lg mx-auto"
            style={{ color: 'var(--muted)', fontFamily: 'Lora, serif', fontStyle: 'italic' }}>
            Weekly updates on new tutorials, cloud changes, modern stack releases, and interview prep.
            No spam. Unsubscribe any time.
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-16">
        <div className="max-w-xl mx-auto mb-16">
          <div className="rounded-2xl p-8" style={{ background: 'var(--surface)', border: '1px solid var(--border)', boxShadow: 'var(--shadow-lg)' }}>
            {submitted ? (
              <div className="text-center py-6">
                <CheckCircle size={48} className="mx-auto mb-4" style={{ color: 'var(--green)' }} />
                <h2 className="font-display font-bold text-xl mb-2" style={{ color: 'var(--text)' }}>You are in!</h2>
                <p className="text-sm mb-6" style={{ color: 'var(--muted)', fontFamily: 'Lora, serif' }}>
                  Welcome to the VedaEra community. Watch your inbox for the first edition.
                </p>
                <Link href="/learn/roadmap" className="btn-primary">
                  Start the Roadmap <ArrowRight size={14} />
                </Link>
              </div>
            ) : (
              <>
                <h2 className="font-display font-bold text-xl mb-1.5" style={{ color: 'var(--text)' }}>Get the weekly digest</h2>
                <p className="text-sm mb-6" style={{ color: 'var(--muted)' }}>Join engineers learning data engineering with VedaEra.</p>
                <form onSubmit={handleSubmit} className="space-y-3">
                  <div>
                    <label className="block text-xs font-mono mb-1.5" style={{ color: 'var(--muted)' }}>Email address</label>
                    <input
                      type="email"
                      placeholder="you@example.com"
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl text-sm outline-none"
                      style={{ background: 'var(--bg)', border: error ? '1px solid #ff5252' : '1px solid var(--border2)', color: 'var(--text)' }}
                    />
                    {error && <p className="text-xs mt-1.5" style={{ color: '#ff5252' }}>{error}</p>}
                  </div>
                  <button type="submit" className="btn-primary w-full justify-center py-3">
                    <Mail size={15} /> Subscribe — It is Free
                  </button>
                </form>
                <p className="text-xs text-center mt-4" style={{ color: 'var(--muted)' }}>No spam. No marketing. Just data engineering content.</p>
              </>
            )}
          </div>
        </div>

        <div className="mb-16">
          <h2 className="font-display font-bold text-2xl text-center mb-8" style={{ color: 'var(--text)' }}>What you will receive</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {topics.map(t => (
              <div key={t.title} className="rounded-xl p-5" style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}>
                <div className="text-2xl mb-3">{t.icon}</div>
                <div className="font-display font-semibold text-sm mb-1" style={{ color: 'var(--text)' }}>{t.title}</div>
                <p className="text-xs leading-relaxed" style={{ color: 'var(--muted)', fontFamily: 'Lora, serif' }}>{t.desc}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="text-center">
          <p className="text-sm mb-6" style={{ color: 'var(--muted)' }}>Ready to start learning right now?</p>
          <div className="flex items-center justify-center gap-3 flex-wrap">
            <Link href="/learn/roadmap" className="btn-primary"><BookOpen size={14} /> Start the Roadmap</Link>
            <Link href="/learn/projects/azure-batch-pipeline" className="btn-secondary"><Code2 size={14} /> Build Project 1</Link>
          </div>
        </div>
      </div>
    </div>
  )
}