import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { KafkaLesson } from '@/content/apache-kafka/lesson'
import { KAFKA_MODULE_BY_SLUG, KAFKA_MODULES } from '@/data/kafka-curriculum'

const deepModuleMap: Record<string, () => Promise<{ default: React.ComponentType }>> = {
  'what-is-apache-kafka': () => import('@/content/apache-kafka/what-is-apache-kafka'),
  'events-topics-partitions': () => import('@/content/apache-kafka/events-topics-partitions'),
  'producers-consumers-brokers': () => import('@/content/apache-kafka/producers-consumers-brokers'),
}

export async function generateStaticParams() {
  return KAFKA_MODULES.map(module => ({ topic: module.slug }))
}

export async function generateMetadata({ params }: { params: { topic: string } }): Promise<Metadata> {
  const module = KAFKA_MODULE_BY_SLUG[params.topic]
  if (!module) return { title: 'Apache Kafka | Chaduvuko' }
  return {
    title: `${module.title} | Apache Kafka — Chaduvuko`,
    description: module.description,
  }
}

export default async function ApacheKafkaTopicPage({ params }: { params: { topic: string } }) {
  if (!KAFKA_MODULE_BY_SLUG[params.topic]) notFound()
  const DeepContent = deepModuleMap[params.topic]
  if (DeepContent) {
    const { default: Content } = await DeepContent()
    return <Content />
  }
  return <KafkaLesson slug={params.topic} />
}
