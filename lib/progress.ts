'use client'
import { useSyncExternalStore } from 'react'

// Versioned, URL-keyed learning progress stored in this browser.
// LearnLayout is the only writer; the dashboard and Continue button read it.

export const PROGRESS_STORAGE_KEY = 'chaduvuko_learning_progress'
export const PROGRESS_VERSION = 1

export interface ProgressRecord {
  version: typeof PROGRESS_VERSION
  /** Lesson URL → ISO time it was marked complete. */
  completed: Record<string, string>
  /** Most recently opened lesson. */
  lastVisited: { href: string; at: string } | null
}

const CHANGE_EVENT = 'chaduvuko:progress-change'

const emptyRecord = (): ProgressRecord => ({ version: PROGRESS_VERSION, completed: {}, lastVisited: null })

function parse(raw: string | null): ProgressRecord {
  if (!raw) return emptyRecord()
  try {
    const data = JSON.parse(raw)
    if (data?.version !== PROGRESS_VERSION || typeof data.completed !== 'object' || data.completed === null) return emptyRecord()
    const completed: Record<string, string> = {}
    for (const [href, at] of Object.entries(data.completed)) {
      if (href.startsWith('/') && typeof at === 'string') completed[href] = at
    }
    const last = data.lastVisited
    const lastVisited = last && typeof last.href === 'string' && last.href.startsWith('/') && typeof last.at === 'string'
      ? { href: last.href, at: last.at }
      : null
    return { version: PROGRESS_VERSION, completed, lastVisited }
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

function update(change: (record: ProgressRecord) => ProgressRecord) {
  const next = change(readProgress())
  try {
    window.localStorage.setItem(PROGRESS_STORAGE_KEY, JSON.stringify(next))
  } catch {
    return // storage unavailable (private mode, quota): nothing is saved and readers keep the old record
  }
  window.dispatchEvent(new Event(CHANGE_EVENT))
}

export function setLessonComplete(href: string, complete: boolean) {
  update(record => {
    const completed = { ...record.completed }
    if (complete) completed[href] = new Date().toISOString()
    else delete completed[href]
    return { ...record, completed }
  })
}

export function recordLessonVisit(href: string) {
  update(record => ({ ...record, lastVisited: { href, at: new Date().toISOString() } }))
}

function subscribe(onChange: () => void) {
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
