'use client'
import { useCallback, useEffect, useId, useMemo, useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Search, CornerDownLeft, Sparkles } from 'lucide-react'
import { searchEntries, type SearchIndex } from '@/lib/search'
import { askTutor } from '@/lib/tutor-bridge'

let indexPromise: Promise<SearchIndex> | null = null
function loadIndex(): Promise<SearchIndex> {
  indexPromise ??= fetch('/search-index.json').then(res => {
    if (!res.ok) throw new Error(`search index ${res.status}`)
    return res.json()
  })
  indexPromise.catch(() => { indexPromise = null })
  return indexPromise
}

export function SiteSearch() {
  const router = useRouter()
  const listboxId = useId()
  const triggerRef = useRef<HTMLButtonElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [index, setIndex] = useState<SearchIndex | null>(null)
  const [loadFailed, setLoadFailed] = useState(false)
  const [active, setActive] = useState(0)
  const [shortcut, setShortcut] = useState<string | null>(null)

  const results = useMemo(() => (index ? searchEntries(index.entries, query) : []), [index, query])

  const close = useCallback(() => {
    setOpen(false)
    setQuery('')
    triggerRef.current?.focus()
  }, [])

  const openRef = useRef(open)
  openRef.current = open

  useEffect(() => {
    setShortcut(/Mac|iPhone|iPad/.test(navigator.platform) ? '⌘K' : 'Ctrl K')
    const onKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault()
        if (openRef.current) close()
        else setOpen(true)
      }
    }
    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [close])

  useEffect(() => {
    if (!open) return
    inputRef.current?.focus()
    setLoadFailed(false)
    loadIndex().then(setIndex, () => setLoadFailed(true))
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = previousOverflow }
  }, [open])

  useEffect(() => { setActive(0) }, [query])

  useEffect(() => {
    document.getElementById(`${listboxId}-${active}`)?.scrollIntoView({ block: 'nearest' })
  }, [active, listboxId])

  function go(href: string) {
    close()
    router.push(href)
  }

  // Offered under every query; Enter picks it only when no lesson matches.
  const canAskTutor = Boolean(index && query.trim())

  function askInstead() {
    const question = query.trim()
    close()
    askTutor(question)
  }

  function onInputKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (canAskTutor && !results.length && e.key === 'Enter') { e.preventDefault(); askInstead(); return }
    if (!results.length) return
    if (e.key === 'ArrowDown') { e.preventDefault(); setActive(i => (i + 1) % results.length) }
    else if (e.key === 'ArrowUp') { e.preventDefault(); setActive(i => (i - 1 + results.length) % results.length) }
    else if (e.key === 'Home') { e.preventDefault(); setActive(0) }
    else if (e.key === 'End') { e.preventDefault(); setActive(results.length - 1) }
    else if (e.key === 'Enter') { e.preventDefault(); go(results[active].href) }
  }

  function onDialogKeyDown(e: React.KeyboardEvent<HTMLDivElement>) {
    if (e.key === 'Escape') { e.preventDefault(); close(); return }
    if (e.key !== 'Tab') return
    const focusable = Array.from(e.currentTarget.querySelectorAll<HTMLElement>('input, button'))
    const first = focusable[0]
    const last = focusable[focusable.length - 1]
    if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus() }
    else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus() }
  }

  const activeId = results.length ? `${listboxId}-${active}` : undefined

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        onClick={() => setOpen(true)}
        aria-label="Search lessons"
        aria-haspopup="dialog"
        className="flex items-center justify-center md:justify-start gap-2 h-9 w-9 md:w-auto md:min-w-[180px] md:px-3 rounded-lg text-sm flex-shrink-0"
        style={{ background: 'var(--bg2)', border: '1px solid var(--border)', color: 'var(--muted)' }}
      >
        <Search size={14} />
        <span className="hidden md:inline flex-1 text-left text-xs">Search lessons…</span>
        {shortcut && (
          <kbd className="hidden md:inline text-xs font-mono px-1 py-0.5 rounded"
            style={{ background: 'var(--bg3)', border: '1px solid var(--border)', fontSize: '0.65rem' }}>
            {shortcut}
          </kbd>
        )}
      </button>

      {open && (
        <div
          className="fixed inset-0 z-[60] flex items-start justify-center px-4 pt-[10vh]"
          style={{ background: 'rgba(0,0,0,0.55)' }}
          onMouseDown={e => { if (e.target === e.currentTarget) close() }}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-label="Search lessons"
            onKeyDown={onDialogKeyDown}
            className="w-full max-w-xl rounded-xl overflow-hidden"
            style={{ background: 'var(--surface)', border: '1px solid var(--border2)', boxShadow: 'var(--shadow-lg)' }}
          >
            <div className="flex items-center gap-3 px-4 py-3" style={{ borderBottom: '1px solid var(--border)' }}>
              <Search size={16} style={{ color: 'var(--muted)', flexShrink: 0 }} />
              <input
                ref={inputRef}
                type="text"
                role="combobox"
                aria-label="Search lessons"
                aria-expanded={results.length > 0}
                aria-controls={listboxId}
                aria-activedescendant={activeId}
                aria-autocomplete="list"
                autoComplete="off"
                spellCheck={false}
                placeholder={index ? `Search ${index.lessonCount} lessons across ${index.trackCount} tracks` : 'Search lessons'}
                value={query}
                onChange={e => setQuery(e.target.value)}
                onKeyDown={onInputKeyDown}
                className="flex-1 bg-transparent text-base outline-none min-w-0"
                style={{ color: 'var(--text)' }}
              />
              <button type="button" onClick={close} className="text-xs font-mono px-1.5 py-0.5 rounded"
                style={{ background: 'var(--bg3)', border: '1px solid var(--border)', color: 'var(--muted)' }}>
                Esc
              </button>
            </div>

            <ul id={listboxId} role="listbox" aria-label="Search results" className="max-h-[60vh] overflow-y-auto py-1">
              {results.map((entry, i) => (
                <li
                  key={`${entry.kind}:${entry.href}`}
                  id={`${listboxId}-${i}`}
                  role="option"
                  aria-selected={i === active}
                  onMouseMove={() => setActive(i)}
                  onClick={() => go(entry.href)}
                  className="flex items-center gap-3 px-4 py-2.5 cursor-pointer"
                  style={{ background: i === active ? 'var(--bg2)' : 'transparent' }}
                >
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium truncate" style={{ color: 'var(--text)' }}>{entry.title}</div>
                    <div className="text-xs truncate mt-0.5" style={{ color: 'var(--muted)' }}>{entry.context}</div>
                  </div>
                  {i === active && <CornerDownLeft size={13} style={{ color: 'var(--muted)', flexShrink: 0 }} />}
                </li>
              ))}
            </ul>

            <div className="px-4 py-2.5 text-xs" role="status" aria-live="polite"
              style={{ color: 'var(--muted)', borderTop: results.length ? '1px solid var(--border)' : 'none' }}>
              {loadFailed
                ? 'Search is unavailable right now — try again in a moment.'
                : !index
                  ? 'Loading…'
                  : !query.trim()
                    ? 'Type a topic, tool, or concept. ↑↓ to move, Enter to open.'
                    : results.length
                      ? `${results.length} result${results.length === 1 ? '' : 's'}`
                      : `No lessons match “${query.trim()}”.`}
            </div>
            {canAskTutor && (
              <div className="px-3 pb-3">
                <button
                  type="button"
                  onClick={askInstead}
                  className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-left"
                  style={{ background: 'var(--bg2)', border: '1px solid var(--border)' }}
                >
                  <Sparkles size={15} aria-hidden="true" style={{ color: 'var(--accent)', flexShrink: 0 }} />
                  <span className="flex-1 min-w-0">
                    <span className="block text-sm font-medium" style={{ color: 'var(--text)' }}>Ask the AI tutor</span>
                    <span className="block text-xs truncate mt-0.5" style={{ color: 'var(--muted)' }}>“{query.trim()}”</span>
                  </span>
                  <CornerDownLeft size={13} aria-hidden="true" style={{ color: 'var(--muted)', flexShrink: 0 }} />
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  )
}
