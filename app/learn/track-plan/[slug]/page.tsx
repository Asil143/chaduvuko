import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { PlannedTrackPage } from '@/components/learn/PlannedTrackPage'
import { PLANNED_TRACKS } from '@/data/planned-tracks'

const plannedTrackBySlug = Object.fromEntries(PLANNED_TRACKS.map(track => [track.slug, track]))

export function generateStaticParams() {
  return PLANNED_TRACKS
    .filter(track => track.href.startsWith('/learn/track-plan/'))
    .map(track => ({ slug: track.slug }))
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const track = plannedTrackBySlug[params.slug]
  if (!track) return { title: 'Learning Track Plan' }
  return {
    title: `${track.title} — Skills Plan`,
    description: `Planned skill map for ${track.title}.`,
  }
}

export default function TrackPlanRoute({ params }: { params: { slug: string } }) {
  const track = plannedTrackBySlug[params.slug]
  if (!track || !track.href.startsWith('/learn/track-plan/')) notFound()
  return <PlannedTrackPage track={track} />
}
