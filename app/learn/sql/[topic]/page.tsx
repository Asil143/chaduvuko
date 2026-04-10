import { notFound } from 'next/navigation';
import { SQL_CURRICULUM } from '@/data/sql-freshmart';
import type { Metadata } from 'next';

// ─── Map: slug → dynamic import ──────────────────────────────────────────────
const moduleMap: Record<string, () => Promise<{ default: React.ComponentType }>> = {
  'what-is-a-database': () => import('@/content/sql/what-is-a-database'),
  'how-databases-work': () => import('@/content/sql/how-databases-work'),
  'types-of-databases': () => import('@/content/sql/types-of-databases'),
  'setting-up': () => import('@/content/sql/setting-up'),
  'select-from':           () => import('@/content/sql/select-from'),
  'where-clause':          () => import('@/content/sql/where-clause'),
  'and-or-not':            () => import('@/content/sql/and-or-not'),
  'order-by':              () => import('@/content/sql/order-by'),
  'limit-fetch':          () => import('@/content/sql/limit-fetch'),
  'distinct':              () => import('@/content/sql/distinct'),
  'null-values':           () => import('@/content/sql/null-values'),
  'arithmetic-expressions':     () => import('@/content/sql/arithmetic-expressions'),
  'aliases':                () => import('@/content/sql/aliases'),
  'like-wildcards':          () => import('@/content/sql/like-wildcards'),
  'in-between':             () => import('@/content/sql/in-between'),
  'case-when':              () => import('@/content/sql/case-when'),
  'data-types':             () => import('@/content/sql/data-types'),
  'complex-where':          () => import('@/content/sql/complex-where'),
  'update':                 () => import('@/content/sql/update'),
  'normalization':          () => import('@/content/sql/normalization'),
  // 'group-by':              () => import('@/content/sql/group-by'),
  // 'joins':                 () => import('@/content/sql/joins'),
  // 'subqueries':            () => import('@/content/sql/subqueries'),
  // 'ctes':                  () => import('@/content/sql/ctes'),
  // 'window-functions':      () => import('@/content/sql/window-functions'),
  // 'case-statements':       () => import('@/content/sql/case-statements'),
   'aggregate-functions':   () => import('@/content/sql/aggregate-functions'),
   'insert-into':           () => import('@/content/sql/insert-into'),
  // 'update-statements':     () => import('@/content/sql/update-statements'),
  'delete':     () => import('@/content/sql/delete'),
  'create-table':         () => import('@/content/sql/create-table'),
   'alter-table':          () => import('@/content/sql/alter-table'),
   'drop-truncate':        () => import('@/content/sql/drop-truncate'),
   //'drop-tables   () => import('@/content/sql/drop-tables'),
   'constraints':           () => import('@/content/sql/constraints'),
  // 'indexes':               () => import('@/content/sql/indexes'),
  // 'transactions':          () => import('@/content/sql/transactions'),
  // 'sql-for-data-analysis': () => import('@/content/sql/sql-for-data-analysis'),
  // 'interview-questions':   () => import('@/content/sql/interview-questions'),
  // 'sql-projects':          () => import('@/content/sql/sql-projects'),

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