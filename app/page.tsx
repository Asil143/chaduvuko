import HomePage, { type HomeData } from '@/components/home/HomePage'
import { getLiveLesson, getTrack, liveLessonsForTrack } from '@/lib/catalog'
import { getHeaderData } from '@/lib/header-data'
import { getResolvedPaths } from '@/lib/catalog/paths'
import { SCHOOLS } from '@/lib/catalog/schools'
import { getSchoolContents } from '@/components/learn/SchoolCard'

const FEATURED_PATHS = ['ai-engineer', 'agentic-ai-engineer', 'data-engineer', 'full-stack-ai-developer']

// The lesson shown in the hero preview; homeData() fails the build if it stops being live.
const PREVIEW_HREF = '/learn/python/io-formatting'

function homeData(): HomeData {
  const header = getHeaderData()
  const lesson = getLiveLesson(PREVIEW_HREF)
  const track = lesson && getTrack(lesson.track)
  if (!lesson || !track) throw new Error(`Homepage preview lesson ${PREVIEW_HREF} is not a live lesson`)
  const trackLessons = liveLessonsForTrack(track.slug)
  const allPaths = getResolvedPaths()
  const paths = FEATURED_PATHS.map(slug => {
    const path = allPaths.find(item => item.slug === slug)
    if (!path) throw new Error(`Homepage featured career path "${slug}" does not exist`)
    return { href: `/learn/paths/${path.slug}`, title: path.title, summary: path.summary, steps: path.milestones.length, lessons: path.liveLessons }
  })
  const schools = SCHOOLS.map(school => {
    const contents = getSchoolContents(school)
    return {
      href: `/learn/schools/${school.slug}`,
      title: school.title,
      short: school.short,
      description: school.description,
      lessons: contents.lessons,
      paths: contents.paths.length,
      planned: contents.planned.length,
      courses: [...contents.tracks]
        .sort((a, b) => b.lessons - a.lessons)
        .map(track => ({ href: track.href, title: track.title })),
    }
  })
  return {
    paths,
    schools,
    pathCount: allPaths.length,
    header,
    projects: header.tracks.projects?.lessons ?? 0,
    preview: {
      href: lesson.href,
      title: lesson.title,
      trackTitle: track.title,
      trackHref: track.indexHref,
      module: lesson.section ?? null,
      position: trackLessons.findIndex(item => item.href === lesson.href) + 1,
      total: trackLessons.length,
    },
  }
}

export default function Page() {
  return <HomePage data={homeData()} />
}
