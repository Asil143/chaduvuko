'use client'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useMemo, useState } from 'react'
import { Search, Sparkles } from 'lucide-react'
import { groupResults, loadSearchIndex, searchEntries, type SearchIndex } from '@/lib/search'
import { askTutor } from '@/lib/tutor-bridge'

const MAX_RESULTS = 200

/** The full results page behind the header's "See all results" (and the JSON-LD SearchAction). */
export function SearchResults() {
  const router = useRouter()
  const params = useSearchParams()
  const query = (params.get('q') ?? '').trim()
  const [draft, setDraft] = useState(query)
  const [index, setIndex] = useState<SearchIndex | null>(null)
  const [failed, setFailed] = useState(false)

  useEffect(() => { setDraft(query) }, [query])
  useEffect(() => { loadSearchIndex().then(setIndex, () => setFailed(true)) }, [])

  const groups = useMemo(
    () => (index && query ? groupResults(searchEntries(index.entries, query, MAX_RESULTS)) : []),
    [index, query],
  )
  const total = groups.reduce((sum, group) => sum + group.entries.length, 0)

  function submit(e: React.FormEvent) {
    e.preventDefault()
    const next = draft.trim()
    router.replace(next ? `/search?q=${encodeURIComponent(next)}` : '/search')
  }

  const status = failed
    ? 'Search is unavailable right now. Try again in a moment.'
    : !query
      ? 'Search lessons, tracks, roadmaps, practice tools and articles.'
      : !index
        ? 'Searching…'
        : total
          ? `${total} result${total === 1 ? '' : 's'} for “${query}”`
          : `No results for “${query}”.`

  return (
    <>
      <h1 className="text-3xl font-extrabold tracking-tight" style={{ color: 'var(--text)' }}>Search</h1>
      <form role="search" onSubmit={submit} className="mt-5 flex gap-2">
        <label className="flex-1 min-w-0 flex items-center gap-2.5 h-12 px-3.5 rounded-xl" style={{ background: 'var(--surface)', border: '1px solid var(--border2)' }}>
          <Search size={17} aria-hidden="true" style={{ color: 'var(--muted)', flexShrink: 0 }} />
          <span className="sr-only">Search lessons, tracks, roadmaps, practice and interview prep</span>
          <input
            type="search"
            name="q"
            value={draft}
            onChange={e => setDraft(e.target.value)}
            autoComplete="off"
            className="flex-1 min-w-0 bg-transparent text-base outline-none"
            style={{ color: 'var(--text)' }}
          />
        </label>
        <button type="submit" className="h-12 px-5 rounded-xl text-sm font-bold" style={{ background: 'var(--green)', color: '#04140a' }}>
          Search
        </button>
      </form>

      <p role="status" aria-live="polite" className="mt-4 text-sm" style={{ color: 'var(--muted)' }}>{status}</p>

      {groups.map(group => (
        <section key={group.kind} aria-labelledby={`results-${group.kind}`} className="mt-7">
          <h2 id={`results-${group.kind}`} className="font-mono text-xs font-semibold uppercase tracking-wider" style={{ color: 'var(--muted)' }}>
            {group.label} <span className="font-normal">· {group.entries.length}</span>
          </h2>
          <ul className="mt-2 divide-y" style={{ borderColor: 'var(--border)' }}>
            {group.entries.map(entry => (
              <li key={entry.href} style={{ borderColor: 'var(--border)' }}>
                <Link href={entry.href} className="block py-3 group">
                  <span className="block text-[15px] font-semibold group-hover:underline" style={{ color: 'var(--text)' }}>{entry.title}</span>
                  <span className="block mt-0.5 text-[13px]" style={{ color: 'var(--muted)' }}>{entry.context}</span>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      ))}

      {query && index && total === 0 && (
        <div className="mt-6 p-5 rounded-xl" style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}>
          <p className="text-sm" style={{ color: 'var(--text2)' }}>
            Try fewer or more general words, or browse instead:
          </p>
          <div className="mt-3 flex flex-wrap gap-2">
            <Link href="/learn" className="flex items-center min-h-11 px-4 rounded-lg text-sm font-semibold" style={{ border: '1px solid var(--border2)', color: 'var(--text)' }}>All tracks</Link>
            <Link href="/learn/roadmap" className="flex items-center min-h-11 px-4 rounded-lg text-sm font-semibold" style={{ border: '1px solid var(--border2)', color: 'var(--text)' }}>Career roadmaps</Link>
          </div>
        </div>
      )}

      {query && index && (
        <button
          type="button"
          onClick={() => askTutor(query)}
          className="mt-6 flex items-center gap-2.5 min-h-11 px-3 rounded-lg text-sm"
          style={{ color: 'var(--text2)', border: '1px dashed var(--border2)' }}
        >
          <Sparkles size={15} aria-hidden="true" style={{ color: 'var(--green)' }} />
          Ask the tutor about “{query}”
        </button>
      )}
    </>
  )
}
