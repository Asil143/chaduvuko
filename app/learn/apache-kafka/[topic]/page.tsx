import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { KafkaLesson } from '@/content/apache-kafka/lesson'
import { KAFKA_MODULE_BY_SLUG, KAFKA_MODULES } from '@/data/kafka-curriculum'

const deepModuleMap: Record<string, () => Promise<{ default: React.ComponentType }>> = {
  'what-is-apache-kafka': () => import('@/content/apache-kafka/what-is-apache-kafka'),
  'events-topics-partitions': () => import('@/content/apache-kafka/events-topics-partitions'),
  'producers-consumers-brokers': () => import('@/content/apache-kafka/producers-consumers-brokers'),
  'local-setup-cli': () => import('@/content/apache-kafka/local-setup-cli'),
  'consumer-groups-offsets': () => import('@/content/apache-kafka/consumer-groups-offsets'),
  'replication-leaders-isr': () => import('@/content/apache-kafka/replication-leaders-isr'),
  'keys-ordering-partitioning': () => import('@/content/apache-kafka/keys-ordering-partitioning'),
  'retention-compaction': () => import('@/content/apache-kafka/retention-compaction'),
  'delivery-semantics': () => import('@/content/apache-kafka/delivery-semantics'),
  'schemas-serialization': () => import('@/content/apache-kafka/schemas-serialization'),
  'producer-design': () => import('@/content/apache-kafka/producer-design'),
  'consumer-design': () => import('@/content/apache-kafka/consumer-design'),
  'kafka-connect': () => import('@/content/apache-kafka/kafka-connect'),
  'stream-processing-kafka-streams': () => import('@/content/apache-kafka/stream-processing-kafka-streams'),
  'security-acls-sasl-tls': () => import('@/content/apache-kafka/security-acls-sasl-tls'),
  'monitoring-observability': () => import('@/content/apache-kafka/monitoring-observability'),
}

export async function generateStaticParams() {
  return KAFKA_MODULES.filter(module => module.status === 'live').map(module => ({ topic: module.slug }))
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
  const module = KAFKA_MODULE_BY_SLUG[params.topic]
  if (!module || module.status !== 'live') notFound()
  const DeepContent = deepModuleMap[params.topic]
  if (DeepContent) {
    const { default: Content } = await DeepContent()
    return <Content />
  }
  return <KafkaLesson slug={params.topic} />
}
