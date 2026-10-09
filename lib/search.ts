export interface SearchEntry {
  href: string
  title: string
  /** Shown under the title, e.g. "Python · Python Foundations". */
  context: string
  kind: SearchKind
}

export type SearchKind = 'track' | 'lesson' | 'roadmap' | 'practice' | 'interview' | 'article' | 'page'

/** Result groups, in display order. */
export const SEARCH_GROUPS: { kind: SearchKind; label: string }[] = [
  { kind: 'track', label: 'Tracks' },
  { kind: 'lesson', label: 'Lessons' },
  { kind: 'roadmap', label: 'Roadmaps' },
  { kind: 'practice', label: 'Practice' },
  { kind: 'interview', label: 'Interview Prep' },
  { kind: 'article', label: 'Articles' },
  { kind: 'page', label: 'Pages' },
]

export interface SearchIndex {
  lessonCount: number
  trackCount: number
  entries: SearchEntry[]
}

const normalize = (text: string) =>
  text.toLowerCase().normalize('NFKD').replace(/[̀-ͯ]/g, '')

/**
 * Entries matching every query word win; if none do, fall back to entries matching
 * the most words. Title matches rank above context matches.
 */
export function searchEntries(entries: SearchEntry[], query: string, limit = 12): SearchEntry[] {
  const words = normalize(query).split(/\s+/).filter(Boolean)
  if (!words.length) return []

  const scored: { entry: SearchEntry; score: number; matched: number }[] = []
  for (const entry of entries) {
    const title = normalize(entry.title)
    const haystack = `${title} ${normalize(entry.context)}`
    const matchedWords = words.filter(word => haystack.includes(word))
    if (!matchedWords.length) continue

    let score = 0
    for (const word of matchedWords) {
      if (title.startsWith(word)) score += 6
      else if (new RegExp(`\\b${word.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}`).test(title)) score += 4
      else if (title.includes(word)) score += 2
    }
    if (entry.kind === 'track') score += 3
    scored.push({ entry, score, matched: matchedWords.length })
  }

  const best = Math.max(0, ...scored.map(item => item.matched))
  return scored
    .filter(item => item.matched === best)
    .sort((a, b) => b.score - a.score || a.entry.title.length - b.entry.title.length)
    .slice(0, limit)
    .map(item => item.entry)
}
