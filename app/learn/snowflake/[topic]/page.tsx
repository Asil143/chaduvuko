import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { SNOWFLAKE_MODULE_BY_SLUG, SNOWFLAKE_MODULES } from '@/data/snowflake-curriculum'

const moduleMap: Record<string, () => Promise<{ default: React.ComponentType }>> = {
  'what-is-snowflake': () => import('@/content/snowflake/what-is-snowflake'),
  'architecture': () => import('@/content/snowflake/architecture'),
  'setup-and-sql-basics': () => import('@/content/snowflake/setup-and-sql-basics'),
  'loading-data': () => import('@/content/snowflake/loading-data'),
}

export async function generateStaticParams() {
  return Object.keys(moduleMap).map(topic => ({ topic }))
}

export async function generateMetadata({ params }: { params: { topic: string } }): Promise<Metadata> {
  const module = SNOWFLAKE_MODULE_BY_SLUG[params.topic]
  if (!module) return { title: 'Snowflake | Chaduvuko' }
  return {
    title: `${module.title} | Snowflake — Chaduvuko`,
    description: module.description,
  }
}

export default async function SnowflakeTopicPage({ params }: { params: { topic: string } }) {
  const loader = moduleMap[params.topic]
  if (!loader) notFound()
  const { default: Content } = await loader()
  return <Content />
}
