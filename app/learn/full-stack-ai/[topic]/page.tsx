import { registryMetadata, registryStaticParams, renderRegistryTopic } from '@/lib/catalog/registry-pages'

const TRACK = 'full-stack-ai'

export const dynamicParams = false

export function generateStaticParams() {
  return registryStaticParams(TRACK)
}

export function generateMetadata({ params }: { params: { topic: string } }) {
  return registryMetadata(TRACK, params.topic)
}

export default function LessonPage({ params }: { params: { topic: string } }) {
  return renderRegistryTopic(TRACK, params.topic, () => import(`@/content/full-stack-ai/${params.topic}`))
}
