import { notFound } from 'next/navigation';
import type { Metadata } from 'next';

const moduleMap: Record<string, () => Promise<{ default: React.ComponentType }>> = {
  'what-is-python-setup':   () => import('@/content/python/what-is-python-setup'),
  'variables-data-types':   () => import('@/content/python/variables-data-types'),
  'operators':              () => import('@/content/python/operators'),
  'strings':                () => import('@/content/python/strings'),
  'control-flow':           () => import('@/content/python/control-flow'),
};

const moduleMeta: Record<string, { title: string; description: string }> = {
  'what-is-python-setup':   { title: 'What is Python? Setup & Your First Program', description: 'Why Python is the most in-demand language in the US job market, how it actually runs, and getting a real environment set up.' },
  'variables-data-types':   { title: 'Variables, Data Types & Type Conversion',     description: 'Every value in Python is an object. Variables, core data types, dynamic typing, and safe type conversion.' },
  'operators':              { title: 'Operators — Arithmetic, Comparison, Logical', description: 'Every operator Python has, what it does under the hood, and the precedence rules that cause real bugs.' },
  'strings':                { title: 'Strings — Creation, Indexing, Slicing, Methods', description: 'Indexing, slicing, the string methods that matter, and f-strings done right.' },
  'control-flow':           { title: 'Control Flow — if / elif / else',             description: 'How Python evaluates truthiness, every form of conditional logic, and real readability patterns.' },
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
  const meta = moduleMeta[params.topic];
  if (!meta) return { title: 'Python | Chaduvuko' };
  return {
    title: `${meta.title} | Python | Chaduvuko`,
    description: meta.description,
  };
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default async function PythonModulePage({
  params,
}: {
  params: { topic: string };
}) {
  const loader = moduleMap[params.topic];
  if (!loader) notFound();

  const { default: Content } = await loader();
  return <Content />;
}
