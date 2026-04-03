import { notFound } from 'next/navigation';
import { SQL_CURRICULUM } from '@/data/sql-freshmart';
import type { Metadata } from 'next';

// ─── Map: slug → dynamic import ──────────────────────────────────────────────
const moduleMap: Record<string, () => Promise<{ default: React.ComponentType }>> = {
  'what-is-a-database': () => import('@/components/content/sql/what-is-a-database'),
  // Add each new module here as you build it:
  // 'how-databases-work':     () => import('@/content/sql/how-databases-work'),
  // 'types-of-databases':     () => import('@/content/sql/types-of-databases'),
  // 'setting-up':             () => import('@/content/sql/setting-up'),
  // 'select-from':            () => import('@/content/sql/select-from'),
  // ... (add all 62 slugs as they are built)
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
  const allModules = SQL_CURRICULUM.flatMap(s => s.modules);
  const module = allModules.find(m => m.slug === params.topic);

  if (!module) {
    return { title: 'SQL | Chaduvuko' };
  }

  return {
    title: `${module.title} | SQL | Chaduvuko`,
    description: module.description,
  };
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default async function SQLModulePage({
  params,
}: {
  params: { topic: string };
}) {
  const loader = moduleMap[params.topic];
  if (!loader) notFound();

  const { default: Content } = await loader();
  return <Content />;
}