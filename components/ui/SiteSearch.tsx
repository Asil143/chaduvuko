'use client'
import { useCallback, useEffect, useId, useMemo, useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Search, CornerDownLeft, Sparkles } from 'lucide-react'
import { groupResults, loadSearchIndex, searchEntries, type SearchEntry, type SearchIndex } from '@/lib/search'
import { useProgress } from '@/lib/progress'
import { askTutor } from '@/lib/tutor-bridge'
import { inertOutside } from '@/components/layout/useMenuDisclosure'


/** What the header's Continue slot points at, shown first when the field is empty. */
export interface SearchResume {
  href: string
  title: string
  detail: string
}

interface Group {
  id: string
  label: string
  entries: SearchEntry[]
}

const RECENT_LIMIT = 4
const resultsHref = (query: string) => `/search?q=${encodeURIComponent(query)}`
const FOCUSABLE = 'input, button:not([disabled]), a[href]'

/**
 * Site search as a combobox: focus stays in the input, the arrow keys move the active option,
 * Enter opens it, and Escape closes and returns focus to the trigger. Results are grouped by
 * type. The AI tutor is a separate button after the results that Enter never triggers.
 */
export function SiteSearch({ resume, tracks }: { resume: SearchResume | null; tracks: SearchEntry[] }) {
  const router = useRouter()
  const baseId = useId()
  const listboxId = `${baseId}-results`
  const triggerRef = useRef<HTMLButtonElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const dialogRef = useRef<HTMLDivElement>(null)
  const progress = useProgress()
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [index, setIndex] = useState<SearchIndex | null>(null)
  const [loadFailed, setLoadFailed] = useState(false)
  const [active, setActive] = useState(0)
  const [shortcut, setShortcut] = useState<string | null>(null)
  const trimmed = query.trim()

  const groups = useMemo((): Group[] => {
    if (!index) return []
    if (trimmed) {
      return groupResults(searchEntries(index.entries, trimmed)).map(group => ({ id: group.kind, label: group.label, entries: group.entries }))
    }
    // Empty field: Continue, then recent lessons, then tracks.
    const byHref = new Map(index.entries.map(entry => [entry.href, entry]))
    const continueGroup: SearchEntry[] = resume ? [{ href: resume.href, title: resume.title, context: resume.detail, kind: 'lesson' }] : []
    const recentHrefs = progress
      ? [
          progress.lastVisited?.href,
          ...Object.entries(progress.completed).sort(([, a], [, b]) => b.localeCompare(a)).map(([href]) => href),
        ]
      : []
    const recent: SearchEntry[] = []
    for (const href of recentHrefs) {
      const entry = href ? byHref.get(href) : undefined
      if (entry && entry.href !== resume?.href && !recent.includes(entry)) recent.push(entry)
      if (recent.length === RECENT_LIMIT) break
    }
    return [
      { id: 'continue', label: 'Continue', entries: continueGroup },
      { id: 'recent', label: 'Recent', entries: recent },
      { id: 'tracks', label: 'Tracks', entries: tracks },
    ].filter(group => group.entries.length > 0)
  }, [index, trimmed, resume, progress, tracks])

  const options = useMemo(() => groups.flatMap(group => group.entries), [groups])
  const optionId = (i: number) => `${baseId}-option-${i}`

  // Focus goes back to the trigger only after the page is no longer inert (see the open effect).
  const returnFocusRef = useRef(false)
  const close = useCallback(() => {
    returnFocusRef.current = true
    setOpen(false)
    setQuery('')
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
    loadSearchIndex().then(setIndex, () => setLoadFailed(true))
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const restoreInert = dialogRef.current ? inertOutside(dialogRef.current) : () => {}
    return () => {
      document.body.style.overflow = previousOverflow
      restoreInert()
      if (returnFocusRef.current) triggerRef.current?.focus()
      returnFocusRef.current = false
    }
  }, [open])

  useEffect(() => { setActive(0) }, [trimmed])

  useEffect(() => {
    document.getElementById(optionId(active))?.scrollIntoView({ block: 'nearest' })
  }, [active]) // eslint-disable-line react-hooks/exhaustive-deps

  function go(href: string) {
    setOpen(false)
    setQuery('')
    router.push(href)
  }

  function askInstead() {
    const question = trimmed
    close()
    askTutor(question)
  }

  function onInputKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (!options.length) {
      // With nothing to open, Enter goes to the results page. It never sends the query to the
      // AI tutor; that needs the button.
      if (e.key === 'Enter') {
        e.preventDefault()
        if (trimmed) go(resultsHref(trimmed))
      }
      return
    }
    if (e.key === 'ArrowDown') { e.preventDefault(); setActive(i => (i + 1) % options.length) }
    else if (e.key === 'ArrowUp') { e.preventDefault(); setActive(i => (i - 1 + options.length) % options.length) }
    else if (e.key === 'Home' && e.altKey) { e.preventDefault(); setActive(0) }
    else if (e.key === 'End' && e.altKey) { e.preventDefault(); setActive(options.length - 1) }
    else if (e.key === 'Enter') { e.preventDefault(); go(options[active].href) }
  }

  function onDialogKeyDown(e: React.KeyboardEvent<HTMLDivElement>) {
    if (e.key === 'Escape') { e.preventDefault(); close(); return }
    if (e.key !== 'Tab') return
    const focusable = Array.from(e.currentTarget.querySelectorAll<HTMLElement>(FOCUSABLE))
    const first = focusable[0]
    const last = focusable[focusable.length - 1]
    if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus() }
    else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus() }
  }

  const status = loadFailed
    ? 'Search is unavailable right now. Try again in a moment.'
    : !index
      ? 'Loading…'
      : !trimmed
        ? '↑↓ to move, Enter to open'
        : options.length
          ? `${options.length} result${options.length === 1 ? '' : 's'}`
          : `No results for “${trimmed}”.`

  let optionIndex = -1

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        onClick={() => setOpen(true)}
        aria-label="Search lessons, tracks, roadmaps, practice and interview prep"
        aria-haspopup="dialog"
        aria-expanded={open}
        className="flex items-center justify-center lg:justify-start gap-2 h-11 w-11 lg:h-10 lg:w-auto lg:px-3 xl:w-[260px] xl:min-w-[220px] rounded-[10px] text-sm flex-shrink-0"
        style={{ background: 'var(--bg2)', border: '1px solid var(--border)', color: 'var(--muted)' }}
      >
        <Search size={15} aria-hidden="true" />
        <span className="hidden lg:inline flex-1 text-left text-sm">Search</span>
        {shortcut && (
          <kbd className="hidden lg:inline text-xs font-mono px-1.5 py-0.5 rounded"
            style={{ background: 'var(--bg3)', border: '1px solid var(--border)', fontSize: '0.65rem' }}>
            {shortcut}
          </kbd>
        )}
      </button>

      {open && (
        <div
          ref={dialogRef}
          className="fixed inset-0 z-[60] flex items-start justify-center lg:px-4 lg:pt-[10vh]"
          style={{ background: 'rgba(0,0,0,0.55)' }}
          onMouseDown={e => { if (e.target === e.currentTarget) close() }}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-label="Search"
            data-menu-panel
            onKeyDown={onDialogKeyDown}
            className="w-full h-full lg:h-auto lg:max-h-[75vh] lg:max-w-xl flex flex-col lg:rounded-xl overflow-hidden"
            style={{ background: 'var(--surface)', border: '1px solid var(--border2)', boxShadow: 'var(--shadow-lg)' }}
          >
            <div className="flex items-center gap-2 pl-3 pr-1.5 lg:px-4 py-2 lg:py-3 flex-shrink-0" style={{ borderBottom: '1px solid var(--border)' }}>
              <label className="flex-1 min-w-0 flex items-center gap-2.5 h-11 lg:h-auto px-3 lg:px-0 rounded-[10px] lg:rounded-none" style={{ background: 'var(--bg)' }}>
                <Search size={16} aria-hidden="true" style={{ color: 'var(--accent)', flexShrink: 0 }} />
                <input
                  ref={inputRef}
                  type="text"
                  role="combobox"
                  aria-label="Search lessons, tracks, roadmaps, practice and interview prep"
                  aria-expanded={options.length > 0}
                  aria-controls={listboxId}
                  aria-activedescendant={options.length ? optionId(active) : undefined}
                  aria-autocomplete="list"
                  autoComplete="off"
                  spellCheck={false}
                  enterKeyHint="go"
                  placeholder="Search"
                  value={query}
                  onChange={e => setQuery(e.target.value)}
                  onKeyDown={onInputKeyDown}
                  className="flex-1 bg-transparent text-base outline-none min-w-0"
                  style={{ color: 'var(--text)' }}
                />
              </label>
              <button
                type="button"
                onClick={close}
                aria-label="Close search"
                className="h-11 lg:h-auto px-2.5 lg:px-1.5 lg:py-0.5 rounded text-[15px] lg:text-xs font-semibold lg:font-mono lg:font-normal"
                style={{ color: 'var(--accent)' }}
              >
                <span className="lg:hidden">Cancel</span>
                <span className="hidden lg:inline px-1.5 py-0.5 rounded" style={{ background: 'var(--bg3)', border: '1px solid var(--border)', color: 'var(--muted)' }}>Esc</span>
              </button>
            </div>

            <div className="flex-1 overflow-y-auto overscroll-contain px-2 py-1.5">
              <div id={listboxId} role="listbox" aria-label="Search results">
                {groups.map(group => (
                  <div key={group.id} role="group" aria-labelledby={`${baseId}-${group.id}`}>
                    <div
                      id={`${baseId}-${group.id}`}
                      role="presentation"
                      className="px-2.5 pt-2.5 pb-1 font-mono text-[11px] font-semibold uppercase tracking-wider"
                      style={{ color: 'var(--muted)' }}
                    >
                      {group.label}
                    </div>
                    {group.entries.map(entry => {
                      optionIndex++
                      const i = optionIndex
                      const selected = i === active
                      return (
                        <div
                          key={`${group.id}:${entry.href}`}
                          id={optionId(i)}
                          role="option"
                          aria-selected={selected}
                          onMouseMove={() => setActive(i)}
                          onClick={() => go(entry.href)}
                          className="flex items-center gap-3 min-h-[52px] lg:min-h-0 px-2.5 py-2 rounded-lg cursor-pointer"
                          style={{ background: selected ? 'var(--bg2)' : 'transparent', outline: selected ? '2px solid var(--accent)' : 'none', outlineOffset: '-2px' }}
                        >
                          <div className="flex-1 min-w-0">
                            <div className="text-[15px] lg:text-sm font-medium truncate" style={{ color: 'var(--text)' }}>{entry.title}</div>
                            <div className="text-xs truncate mt-0.5" style={{ color: 'var(--muted)' }}>{entry.context}</div>
                          </div>
                          {selected && <CornerDownLeft size={13} aria-hidden="true" style={{ color: 'var(--muted)', flexShrink: 0 }} />}
                        </div>
                      )
                    })}
                  </div>
                ))}
              </div>
              {trimmed && index && (
                <a
                  href={resultsHref(trimmed)}
                  onClick={e => { e.preventDefault(); go(resultsHref(trimmed)) }}
                  className="mt-2 flex items-center justify-center min-h-11 px-3 rounded-lg text-sm font-semibold"
                  style={{ border: '1px solid var(--border2)', color: 'var(--text)' }}
                >
                  See all results for “{trimmed}”
                </a>
              )}
              {trimmed && index && (
                <button
                  type="button"
                  onClick={askInstead}
                  className="mt-2 w-full flex items-center gap-2.5 min-h-11 px-2.5 rounded-lg text-left text-sm hover:bg-[var(--bg2)]"
                  style={{ color: 'var(--text2)' }}
                >
                  <Sparkles size={15} aria-hidden="true" style={{ color: 'var(--green)', flexShrink: 0 }} />
                  <span className="truncate">Ask the tutor about “{trimmed}”</span>
                </button>
              )}
            </div>

            <div className="px-4 py-2.5 text-xs flex-shrink-0" role="status" aria-live="polite"
              style={{ color: 'var(--muted)', borderTop: '1px solid var(--border)' }}>
              {status}
            </div>
          </div>
        </div>
      )}
    </>
  )
}
