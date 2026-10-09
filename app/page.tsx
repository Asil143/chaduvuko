import HomePage, { type HomeData } from '@/components/home/HomePage'
import { getLiveLesson, getTrack, liveLessonsForTrack } from '@/lib/catalog'
import { getHeaderData } from '@/lib/header-data'

// The lesson shown in the hero preview; homeData() fails the build if it stops being live.
const PREVIEW_HREF = '/learn/python/io-formatting'

function homeData(): HomeData {
  const header = getHeaderData()
  const lesson = getLiveLesson(PREVIEW_HREF)
  const track = lesson && getTrack(lesson.track)
  if (!lesson || !track) throw new Error(`Homepage preview lesson ${PREVIEW_HREF} is not a live lesson`)
  const trackLessons = liveLessonsForTrack(track.slug)
  return {
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
