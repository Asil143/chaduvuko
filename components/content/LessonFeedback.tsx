'use client'

import { useState, type FormEvent } from 'react'
import { Send } from 'lucide-react'

export function LessonFeedback({ lessonHref }: { lessonHref: string }) {
  const [category, setCategory] = useState<'helpful' | 'unclear' | 'incorrect' | ''>('')
  const [details, setDetails] = useState('')
  const [website, setWebsite] = useState('')
  const [busy, setBusy] = useState(false)
  const [message, setMessage] = useState('')
  const [error, setError] = useState(false)

  async function submit(event: FormEvent) {
    event.preventDefault()
    if (!category) {
      setMessage('Choose one option so we can understand your feedback.')
      setError(true)
      return
    }
    setBusy(true)
    setMessage('')
    try {
      const response = await fetch('/api/lesson-feedback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ lessonHref, category, details, website }),
      })
      const result = await response.json()
      if (!response.ok) throw new Error(result.error || 'Could not send feedback.')
      setMessage('Thanks — your feedback was sent to the Chaduvuko team.')
      setError(false)
      setCategory('')
      setDetails('')
    } catch (submitError) {
      setMessage(submitError instanceof Error ? submitError.message : 'Could not send feedback. Please try again.')
      setError(true)
    } finally {
      setBusy(false)
    }
  }

  return (
    <section className="lesson-feedback" aria-labelledby="lesson-feedback-title">
      <div>
        <p className="lesson-feedback-eyebrow">HELP US IMPROVE</p>
        <h2 id="lesson-feedback-title">How was this lesson?</h2>
        <p>Your note is shared with the Chaduvuko team for review. Please don’t include personal or sensitive information.</p>
      </div>
      <form onSubmit={submit}>
        <fieldset>
          <legend className="sr-only">Choose your feedback</legend>
          {([
            ['helpful', 'Helpful'],
            ['unclear', 'Something was unclear'],
            ['incorrect', 'I found an issue'],
          ] as const).map(([value, label]) => (
            <label key={value} className={category === value ? 'is-selected' : ''}>
              <input type="radio" name="lesson-feedback" value={value} checked={category === value} onChange={() => setCategory(value)} />
              {label}
            </label>
          ))}
        </fieldset>
        <label className="lesson-feedback-details">
          Optional detail
          <textarea value={details} maxLength={1000} rows={3} onChange={event => setDetails(event.target.value)} placeholder="What would make this lesson better?" />
          <small>{details.length}/1000</small>
        </label>
        <label className="lesson-feedback-trap" aria-hidden="true">
          Leave this field empty
          <input type="text" tabIndex={-1} autoComplete="off" value={website} onChange={event => setWebsite(event.target.value)} />
        </label>
        <div className="lesson-feedback-submit">
          <button type="submit" disabled={busy}>{busy ? 'Sending…' : 'Send feedback'} <Send size={14} aria-hidden="true" /></button>
          {message && <p role={error ? 'alert' : 'status'}>{message}</p>}
        </div>
      </form>
    </section>
  )
}
