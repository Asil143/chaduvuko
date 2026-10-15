'use client'

import { useEffect, useState, type FormEvent } from 'react'
import { Cloud, LogOut, Mail, RefreshCw } from 'lucide-react'
import type { User } from '@supabase/supabase-js'
import { getSupabaseBrowserClient } from '@/lib/supabase-browser'
import { syncLocalProgress } from '@/lib/learner-sync'

type SyncStatus = 'idle' | 'syncing' | 'synced' | 'error'

export function LearnerAccount() {
  const [user, setUser] = useState<User | null>(null)
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<SyncStatus>('idle')
  const [message, setMessage] = useState('')
  const [busy, setBusy] = useState(false)
  const [ready, setReady] = useState(false)

  useEffect(() => {
    let alive = true
    let supabase: ReturnType<typeof getSupabaseBrowserClient>
    try {
      supabase = getSupabaseBrowserClient()
    } catch (error) {
      setMessage(error instanceof Error ? error.message : 'Learner accounts are not configured.')
      setReady(true)
      return
    }

    supabase.auth.getUser().then(({ data, error }) => {
      if (!alive) return
      if (error) setMessage('Could not check your sign-in status. Please refresh and try again.')
      else setUser(data.user)
      setReady(true)
    })

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (alive) setUser(session?.user ?? null)
    })
    const onSyncStatus = (event: Event) => {
      const detail = (event as CustomEvent<{ status: SyncStatus; message?: string }>).detail
      if (!detail) return
      setStatus(detail.status)
      setMessage(detail.message ?? '')
    }
    const onSyncSignal = () => { if (alive) setStatus('syncing') }
    window.addEventListener('chaduvuko:sync-status', onSyncStatus)
    window.addEventListener('chaduvuko:sync-started', onSyncSignal)
    return () => {
      alive = false
      subscription.unsubscribe()
      window.removeEventListener('chaduvuko:sync-status', onSyncStatus)
      window.removeEventListener('chaduvuko:sync-started', onSyncSignal)
    }
  }, [])

  async function requestLink(event: FormEvent) {
    event.preventDefault()
    setMessage('')
    setBusy(true)
    try {
      const supabase = getSupabaseBrowserClient()
      const { error } = await supabase.auth.signInWithOtp({
        email: email.trim(),
        options: { emailRedirectTo: `${window.location.origin}/auth/callback` },
      })
      if (error) throw error
      setMessage('Check your email for a secure sign-in link. Your progress stays on this device until you sign in.')
    } catch (error) {
      setMessage(error instanceof Error ? error.message : 'Could not send the sign-in link.')
    } finally {
      setBusy(false)
    }
  }

  async function signOut() {
    setBusy(true)
    setMessage('')
    try {
      const { error } = await getSupabaseBrowserClient().auth.signOut()
      if (error) throw error
      setUser(null)
      setStatus('idle')
      setMessage('Signed out. Your browser-local progress is still available on this device.')
    } catch (error) {
      setMessage(error instanceof Error ? error.message : 'Could not sign out.')
    } finally {
      setBusy(false)
    }
  }

  async function syncNow() {
    setStatus('syncing')
    setMessage('')
    try {
      await syncLocalProgress()
      setStatus('synced')
      setMessage('Your learning progress is synced.')
    } catch (error) {
      setStatus('error')
      setMessage(error instanceof Error ? error.message : 'Could not sync your progress.')
    }
  }

  async function deleteAccount() {
    if (!window.confirm('Delete your learner account and cloud-synced progress? This cannot be undone. Progress saved only on this device will remain here.')) return
    setBusy(true)
    setMessage('')
    try {
      const supabase = getSupabaseBrowserClient()
      const { data: { session }, error: sessionError } = await supabase.auth.getSession()
      if (sessionError) throw sessionError
      if (!session) throw new Error('Your sign-in session expired. Please sign in again.')
      const response = await fetch('/api/learner/account', { method: 'DELETE', headers: { Authorization: `Bearer ${session.access_token}` } })
      const result = await response.json()
      if (!response.ok) throw new Error(result.error || 'Could not delete your account.')
      await supabase.auth.signOut()
      setUser(null)
      setStatus('idle')
      setMessage('Your learner account and cloud-synced progress have been deleted. Browser-local progress remains on this device.')
    } catch (error) {
      setMessage(error instanceof Error ? error.message : 'Could not delete your account.')
    } finally {
      setBusy(false)
    }
  }

  if (!ready) return null

  return (
    <section className="dashboard-account-panel" aria-labelledby="dashboard-account-title">
      <div className="dashboard-account-icon"><Cloud size={18} aria-hidden="true" /></div>
      <div className="dashboard-account-content">
        <h2 id="dashboard-account-title">{user ? 'Progress sync' : 'Take your progress with you'}</h2>
        {user ? (
          <>
            <p>Signed in as <strong>{user.email}</strong>. Your progress syncs across devices.</p>
            <p className="dashboard-sync-status" aria-live="polite">
              {status === 'syncing' ? 'Syncing your progress…' : status === 'error' ? message : status === 'synced' ? (message || 'Progress is up to date.') : 'Sync is ready.'}
            </p>
            <div className="dashboard-account-actions">
              <button type="button" onClick={syncNow} disabled={busy || status === 'syncing'}>
                <RefreshCw size={14} aria-hidden="true" /> Sync now
              </button>
              <button type="button" onClick={signOut} disabled={busy}>
                <LogOut size={14} aria-hidden="true" /> Sign out
              </button>
              <button type="button" className="dashboard-account-delete" onClick={deleteAccount} disabled={busy}>
                Delete account
              </button>
            </div>
          </>
        ) : (
          <>
            <p>Sign in with a secure email link to sync lesson, quiz, roadmap, practice, and project progress between your devices.</p>
            <form className="dashboard-account-form" onSubmit={requestLink}>
              <label className="sr-only" htmlFor="learner-email">Email address</label>
              <input id="learner-email" type="email" autoComplete="email" required maxLength={254} value={email} onChange={event => setEmail(event.target.value)} placeholder="you@example.com" />
              <button type="submit" disabled={busy || !email.trim()}><Mail size={14} aria-hidden="true" /> {busy ? 'Sending…' : 'Email me a sign-in link'}</button>
            </form>
          </>
        )}
        {message && !user && <p className="dashboard-account-message" role="status">{message}</p>}
        {status === 'error' && user && <p className="dashboard-account-message" role="alert">{message}</p>}
      </div>
    </section>
  )
}
