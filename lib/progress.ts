'use client'
import { useSyncExternalStore } from 'react'

// Versioned, URL-keyed learning progress stored in this browser.
// LearnLayout is the only writer; the dashboard and Continue button read it.

export const PROGRESS_STORAGE_KEY = 'chaduvuko_learning_progress'
export const PROGRESS_VERSION = 2

export interface ProgressRecord {
  version: typeof PROGRESS_VERSION
  /** Lesson URL → ISO time it was marked complete. */
  completed: Record<string, string>
  /** Lesson URL → ISO time its quiz was passed; null if passed before times were recorded. */
  quizzesPassed: Record<string, string | null>
  /** Most recently opened lesson. */
  lastVisited: { href: string; at: string } | null
}

const CHANGE_EVENT = 'chaduvuko:progress-change'
/** Written by the quiz before this contract existed: an array of lesson URLs, no times. */
const LEGACY_QUIZ_KEY = 'chaduvuko_quiz_pass'

const emptyRecord = (): ProgressRecord => ({ version: PROGRESS_VERSION, completed: {}, quizzesPassed: {}, lastVisited: null })

function parse(raw: string | null): ProgressRecord {
  if (!raw) return emptyRecord()
  try {
    const data = JSON.parse(raw)
    // Version 1 had no quizzesPassed; it upgrades in place.
    if ((data?.version !== 1 && data?.version !== PROGRESS_VERSION) || typeof data.completed !== 'object' || data.completed === null) return emptyRecord()
    const completed: Record<string, string> = {}
    for (const [href, at] of Object.entries(data.completed)) {
      if (href.startsWith('/') && typeof at === 'string') completed[href] = at
    }
    const quizzesPassed: Record<string, string | null> = {}
    if (data.version === PROGRESS_VERSION && typeof data.quizzesPassed === 'object' && data.quizzesPassed !== null) {
      for (const [href, at] of Object.entries(data.quizzesPassed)) {
        if (href.startsWith('/') && (typeof at === 'string' || at === null)) quizzesPassed[href] = at
      }
    }
    const last = data.lastVisited
    const lastVisited = last && typeof last.href === 'string' && last.href.startsWith('/') && typeof last.at === 'string'
      ? { href: last.href, at: last.at }
      : null
    return { version: PROGRESS_VERSION, completed, quizzesPassed, lastVisited }
  } catch {
    return emptyRecord()
  }
}

function readRaw(): string | null {
  try { return window.localStorage.getItem(PROGRESS_STORAGE_KEY) } catch { return null }
}

// useSyncExternalStore needs a stable snapshot, so re-parse only when the stored string changes.
let cachedRaw: string | null | undefined
let cachedRecord: ProgressRecord = emptyRecord()

export function readProgress(): ProgressRecord {
  const raw = readRaw()
  if (raw !== cachedRaw) {
    cachedRaw = raw
    cachedRecord = parse(raw)
  }
  return cachedRecord
}

/** Returns whether the record was saved to storage. */
function update(change: (record: ProgressRecord) => ProgressRecord): boolean {
  const next = change(readProgress())
  let saved = true
  try {
    window.localStorage.setItem(PROGRESS_STORAGE_KEY, JSON.stringify(next))
  } catch {
    // Storage unavailable (private mode, quota): keep the change for this session only.
    // readProgress returns this record until the stored string itself changes.
    cachedRecord = next
    saved = false
  }
  window.dispatchEvent(new Event(CHANGE_EVENT))
  return saved
}

export function setLessonComplete(href: string, complete: boolean) {
  update(record => {
    const completed = { ...record.completed }
    if (complete) completed[href] = new Date().toISOString()
    else delete completed[href]
    return { ...record, completed }
  })
}

export function recordQuizPass(href: string) {
  if (href in readProgress().quizzesPassed) return
  update(record => ({ ...record, quizzesPassed: { ...record.quizzesPassed, [href]: new Date().toISOString() } }))
}

let legacyMigrated = false

// One-time import of the quiz's old key. Runs from subscribe (after mount), never during render.
function migrateLegacyQuizPasses() {
  if (legacyMigrated) return
  legacyMigrated = true
  let raw: string | null
  try { raw = window.localStorage.getItem(LEGACY_QUIZ_KEY) } catch { return }
  if (!raw) return
  let hrefs: string[] = []
  try {
    const data = JSON.parse(raw)
    if (Array.isArray(data)) hrefs = data.filter((h): h is string => typeof h === 'string' && h.startsWith('/'))
  } catch {}
  const saved = update(record => {
    const quizzesPassed = { ...record.quizzesPassed }
    for (const href of hrefs) if (!(href in quizzesPassed)) quizzesPassed[href] = null
    return { ...record, quizzesPassed }
  })
  if (saved) {
    try { window.localStorage.removeItem(LEGACY_QUIZ_KEY) } catch {}
  }
}

export function recordLessonVisit(href: string) {
  update(record => ({ ...record, lastVisited: { href, at: new Date().toISOString() } }))
}

function subscribe(onChange: () => void) {
  migrateLegacyQuizPasses()
  const onStorage = (e: StorageEvent) => { if (e.key === PROGRESS_STORAGE_KEY || e.key === null) onChange() }
  window.addEventListener(CHANGE_EVENT, onChange)
  window.addEventListener('storage', onStorage)
  return () => {
    window.removeEventListener(CHANGE_EVENT, onChange)
    window.removeEventListener('storage', onStorage)
  }
}

/** Progress for the current browser, or null during server render and hydration. */
export function useProgress(): ProgressRecord | null {
  return useSyncExternalStore<ProgressRecord | null>(subscribe, readProgress, () => null)
}
