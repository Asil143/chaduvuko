import { notFound } from 'next/navigation';
import { DS_CURRICULUM } from '@/data/datascience-streampulse';
import type { Metadata } from 'next';

// ─── Map: slug → dynamic import ──────────────────────────────────────────────
const moduleMap: Record<string, () => Promise<{ default: React.ComponentType }>> = {
  'what-is-data-science': () => import('@/content/data-science/what-is-data-science'),
  'data-science-workflow': () => import('@/content/data-science/data-science-workflow'),

  // Add each new module here as you build it:
  // 'ds-vs-other-roles':           () => import('@/content/data-science/ds-vs-other-roles'),
  // 'python-environment-setup':    () => import('@/content/data-science/python-environment-setup'),
  // ... (add all 53 slugs as they are built)
};

// ─── Generate static paths for all live modules ───────────────────────────────
export function generateStaticParams() {
  return Object.keys(moduleMap).map(topic => ({ topic }));
}

// ─── Dynamic metadata ─────────────────────────────────────────────────────────
export async function generateMetadata({
  params,
}: {
  params: { topic: string };
}): Promise<Metadata> {
  const allModules = DS_CURRICULUM.flatMap(s => s.modules);
  const module = allModules.find(m => m.slug === params.topic);

  if (!module) {
    return { title: 'Data Science | Chaduvuko' };
  }

  return {
    title: `${module.title} | Data Science | Chaduvuko`,
    description: module.description,
  };
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default async function DataScienceModulePage({
  params,
}: {
  params: { topic: string };
}) {
  const loader = moduleMap[params.topic];
  if (!loader) notFound();

  const { default: Content } = await loader();
  return <Content />;
}
