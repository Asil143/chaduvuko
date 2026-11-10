import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { WithLessonNav } from '@/components/content/WithLessonNav'
import { getRegistryTrack, registryLessons } from '@/data/tracks/registry'

type Loader = () => Promise<{ default: React.ComponentType }>

const liveLesson = (track: string, topic: string) =>
  registryLessons(track).find(lesson => lesson.slug === topic && lesson.status === 'live')

export function registryStaticParams(track: string) {
  return registryLessons(track).filter(lesson => lesson.status === 'live').map(lesson => ({ topic: lesson.slug }))
}

export function registryMetadata(track: string, topic: string): Metadata {
  const lesson = liveLesson(track, topic)
  const { title } = getRegistryTrack(track)
  if (!lesson) return { title }
  return { title: `${lesson.title} | ${title}`, description: lesson.description }
}

export async function renderRegistryTopic(track: string, topic: string, load: Loader) {
  if (!liveLesson(track, topic)) notFound()
  const { default: Content } = await load()
  return <WithLessonNav href={`/learn/${track}/${topic}`}><Content /></WithLessonNav>
}
