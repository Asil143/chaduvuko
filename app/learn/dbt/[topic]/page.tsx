import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { DBT_MODULE_BY_SLUG, DBT_MODULES } from '@/data/dbt-curriculum'

const moduleMap: Record<string, () => Promise<{ default: React.ComponentType }>> = {
  'what-is-dbt': () => import('@/content/dbt/what-is-dbt'),
  'how-dbt-works': () => import('@/content/dbt/how-dbt-works'),
  'project-setup': () => import('@/content/dbt/project-setup'),
  'models-basics': () => import('@/content/dbt/models-basics'),
  'sources-and-ref': () => import('@/content/dbt/sources-and-ref'),
  'materializations': () => import('@/content/dbt/materializations'),
  'incremental-models': () => import('@/content/dbt/incremental-models'),
  'testing-basics': () => import('@/content/dbt/testing-basics'),
  'documentation': () => import('@/content/dbt/documentation'),
  'jinja-and-macros': () => import('@/content/dbt/jinja-and-macros'),
  'packages': () => import('@/content/dbt/packages'),
  'seeds': () => import('@/content/dbt/seeds'),
  'snapshots': () => import('@/content/dbt/snapshots'),
  'variables-and-environments': () => import('@/content/dbt/variables-and-environments'),
  'hooks-and-operations': () => import('@/content/dbt/hooks-and-operations'),
  'project-structure': () => import('@/content/dbt/project-structure'),
  'performance-tuning-dbt': () => import('@/content/dbt/performance-tuning-dbt'),
  'cicd-for-dbt': () => import('@/content/dbt/cicd-for-dbt'),
  'testing-strategy-at-scale': () => import('@/content/dbt/testing-strategy-at-scale'),
  'dbt-interview-system-design': () => import('@/content/dbt/dbt-interview-system-design'),
}

export async function generateStaticParams() {
  return DBT_MODULES.filter(module => module.status === 'live').map(module => ({ topic: module.slug }))
}

export async function generateMetadata({ params }: { params: { topic: string } }): Promise<Metadata> {
  const module = DBT_MODULE_BY_SLUG[params.topic]
  if (!module) return { title: 'dbt | Chaduvuko' }
  return {
    title: `${module.title} | dbt — Chaduvuko`,
    description: module.description,
  }
}

export default async function DbtTopicPage({ params }: { params: { topic: string } }) {
  const module = DBT_MODULE_BY_SLUG[params.topic]
  if (!module || module.status !== 'live') notFound()
  const loader = moduleMap[params.topic]
  if (!loader) notFound()
  const { default: Content } = await loader()
  return <Content />
}
