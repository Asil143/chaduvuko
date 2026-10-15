'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { ArrowRight, CheckCircle2, RotateCcw } from 'lucide-react'
import type { LessonPractice as LessonPracticeData } from '@/data/lesson-practice'

const STORAGE_KEY = 'chaduvuko_practice_progress'

export function LessonPractice({ practice }: { practice: LessonPracticeData }) {
  const [done, setDone] = useState(false)
  const [ready, setReady] = useState(false)
  const [draft, setDraft] = useState('')

  useEffect(() => {
    try {
      const saved: unknown = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? '{}')
      const entry = saved && typeof saved === 'object' ? (saved as Record<string, unknown>)[practice.id] : null
      setDone(typeof entry === 'string' || Boolean(entry && typeof entry === 'object' && (entry as { done?: unknown }).done))
    } catch (error) {
      console.error('Could not read saved practice progress:', error)
    }
    setReady(true)
  }, [practice.id])

  function setComplete(complete: boolean) {
    try {
      const parsed: unknown = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? '{}')
      const saved = parsed && typeof parsed === 'object' && !Array.isArray(parsed)
        ? { ...parsed as Record<string, unknown> }
        : {}
      saved[practice.id] = { done: complete, updatedAt: new Date().toISOString() }
      localStorage.setItem(STORAGE_KEY, JSON.stringify(saved))
      setDone(complete)
      window.dispatchEvent(new Event('chaduvuko:practice-progress-change'))
    } catch (error) {
      console.error('Could not save practice progress:', error)
    }
  }

  const destination = practice.challengeId === 'pipeline-plan'
    ? '/learn/projects/azure-batch-pipeline'
    : `/learn/sql/playground?challenge=${encodeURIComponent(practice.challengeId)}`

  return (
    <section className="lesson-practice" aria-labelledby="lesson-practice-title">
      <div className="lesson-practice-heading">
        <span aria-hidden="true">🛠️</span>
        <div>
          <p>PUT IT INTO PRACTICE</p>
          <h2 id="lesson-practice-title">{practice.title}</h2>
        </div>
      </div>
      <p className="lesson-practice-prompt">{practice.prompt}</p>
      {practice.challengeId === 'pipeline-plan' && (
        <label className="lesson-practice-note">
          Draft your pipeline outline
          <textarea value={draft} onChange={event => setDraft(event.target.value)} rows={4} placeholder="Source → ingestion → validation → transformation → destination → monitoring" />
          <small>Your draft stays in this tab and is not sent or synced.</small>
        </label>
      )}
      <div className="lesson-practice-footer">
        <Link href={destination}>{practice.challengeLabel} <ArrowRight size={15} aria-hidden="true" /></Link>
        <button type="button" onClick={() => setComplete(!done)} disabled={!ready || (practice.challengeId === 'pipeline-plan' && draft.trim().length < 20)}>
          {done ? <><RotateCcw size={14} aria-hidden="true" /> Reset practice</> : <><CheckCircle2 size={14} aria-hidden="true" /> Mark practice complete</>}
        </button>
      </div>
      <p className="lesson-practice-note-text" aria-live="polite">
        {done ? 'Practice marked complete in this browser. This is a self-check, not a graded submission.' : 'Run or work through the task, then mark it complete when you have checked your result.'}
      </p>
    </section>
  )
}
