import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { SnowflakeLesson } from '@/content/snowflake/lesson'
import { SNOWFLAKE_MODULE_BY_SLUG, SNOWFLAKE_MODULES } from '@/data/snowflake-curriculum'

const moduleMap: Record<string, () => Promise<{ default: React.ComponentType }>> = {
  'what-is-snowflake': () => import('@/content/snowflake/what-is-snowflake'),
  'architecture': () => import('@/content/snowflake/architecture'),
  'setup-and-sql-basics': () => import('@/content/snowflake/setup-and-sql-basics'),
  'roles-security-basics': () => import('@/content/snowflake/roles-security-basics'),
  'loading-data': () => import('@/content/snowflake/loading-data'),
  'semi-structured-data': () => import('@/content/snowflake/semi-structured-data'),
  'elt-medallion': () => import('@/content/snowflake/elt-medallion'),
  'merge-idempotency': () => import('@/content/snowflake/merge-idempotency'),
  'time-travel-cloning': () => import('@/content/snowflake/time-travel-cloning'),
  'snowpipe': () => import('@/content/snowflake/snowpipe'),
  'streams-and-tasks': () => import('@/content/snowflake/streams-and-tasks'),
  'dynamic-tables': () => import('@/content/snowflake/dynamic-tables'),
  'performance-tuning': () => import('@/content/snowflake/performance-tuning'),
  'cost-optimization': () => import('@/content/snowflake/cost-optimization'),
  'advanced-security-governance': () => import('@/content/snowflake/advanced-security-governance'),
  'data-sharing-marketplace': () => import('@/content/snowflake/data-sharing-marketplace'),
  'snowflake-with-dbt': () => import('@/content/snowflake/snowflake-with-dbt'),
  'production-operations': () => import('@/content/snowflake/production-operations'),
  'snowflake-project': () => import('@/content/snowflake/snowflake-project'),
  'interview-system-design': () => import('@/content/snowflake/interview-system-design'),
}

export async function generateStaticParams() {
  return SNOWFLAKE_MODULES.map(module => ({ topic: module.slug }))
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
  if (!SNOWFLAKE_MODULE_BY_SLUG[params.topic]) notFound()
  const loader = moduleMap[params.topic]
  if (loader) {
    const { default: Content } = await loader()
    return <Content />
  }
  return <SnowflakeLesson slug={params.topic} />
}
