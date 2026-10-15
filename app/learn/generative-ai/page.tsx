import type { Metadata } from 'next'
import { PlannedTrackPage } from '@/components/learn/PlannedTrackPage'
import { PLANNED_TRACKS } from '@/data/planned-tracks'

export const metadata: Metadata = {
  title: 'Generative AI & LLM Engineering — Skills Plan',
  description: 'Planned Generative AI and LLM engineering skills, from prerequisites and foundations through RAG, evaluation, agents, and production.',
}

export default function GenerativeAITrackPage() {
  const track = PLANNED_TRACKS.find(item => item.slug === 'generative-ai')
  if (!track) throw new Error('Generative AI skills plan is missing from PLANNED_TRACKS')
  return <PlannedTrackPage track={track} />
}
