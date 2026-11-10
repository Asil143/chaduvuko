import Link from 'next/link'
import { LIVE_LESSONS, TRACKS } from '@/lib/catalog'
import { getResolvedPaths } from '@/lib/catalog/paths'
import type { School } from '@/lib/catalog/schools'
import { PLANNED_TRACKS } from '@/data/planned-tracks'

export interface SchoolTrack {
  slug: string
  title: string
  href: string
  lessons: number
  modules: number
}

/** Published tracks, career paths, and planned tracks that belong to one school. */
export function getSchoolContents(school: School) {
  const tracks: SchoolTrack[] = TRACKS
    .filter(track => track.area === school.area && !track.status && !track.hidden)
    .map(track => {
      const lessons = LIVE_LESSONS.filter(lesson => lesson.track === track.slug)
      return {
        slug: track.slug,
        title: track.title,
        href: track.indexHref,
        lessons: lessons.length,
        modules: new Set(lessons.map(lesson => lesson.section ?? '')).size,
      }
    })
    .filter(track => track.lessons > 0)
  const paths = getResolvedPaths().filter(path => path.school === school.area)
  const planned = PLANNED_TRACKS.filter(track => track.area === school.area)
  return { tracks, paths, planned, lessons: tracks.reduce((sum, track) => sum + track.lessons, 0) }
}

export function SchoolCard({ school }: { school: School }) {
  const { tracks, paths, planned, lessons } = getSchoolContents(school)
  return (
    <Link
      href={`/learn/schools/${school.slug}`}
      style={{ display: 'block', height: '100%', background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 14, padding: '18px 20px', textDecoration: 'none' }}
    >
      <span style={{ display: 'block', fontSize: 17, fontWeight: 700, color: 'var(--text)' }}>{school.title}</span>
      <span style={{ display: 'block', marginTop: 6, fontSize: 13, lineHeight: 1.6, color: 'var(--muted)' }}>{school.description}</span>
      <span style={{ display: 'block', marginTop: 12, fontSize: 12, color: 'var(--text2)' }}>
        {tracks.length} live track{tracks.length === 1 ? '' : 's'} · {lessons} lessons
        {paths.length > 0 && ` · ${paths.length} career path${paths.length === 1 ? '' : 's'}`}
        {planned.length > 0 && ` · ${planned.length} coming next`}
      </span>
    </Link>
  )
}
