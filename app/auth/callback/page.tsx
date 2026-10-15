'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { getSupabaseBrowserClient } from '@/lib/supabase-browser'

export default function AuthCallbackPage() {
  const router = useRouter()
  const [message, setMessage] = useState('Verifying your secure sign-in link…')

  useEffect(() => {
    let active = true
    const code = new URLSearchParams(window.location.search).get('code')
    if (!code) {
      setMessage('This sign-in link is missing its verification code. Request a new link from your dashboard.')
      return
    }
    const verificationCode = code

    async function verify() {
      try {
        const { error } = await getSupabaseBrowserClient().auth.exchangeCodeForSession(verificationCode)
        if (!active) return
        if (error) {
          setMessage('This sign-in link could not be verified or has expired. Request a new link from your dashboard.')
          return
        }
        router.replace('/dashboard')
        router.refresh()
      } catch (error) {
        console.error('Learner sign-in callback failed:', error)
        if (active) setMessage('Could not complete sign-in. Please request a new email link.')
      }
    }
    void verify()

    return () => { active = false }
  }, [router])

  return (
    <main className="learner-auth-callback">
      <section role="status" aria-live="polite">
        <h1>Signing you in</h1>
        <p>{message}</p>
      </section>
    </main>
  )
}
