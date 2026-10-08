'use client'
import dynamic from 'next/dynamic'

// One dynamic import per lesson so each lesson ships as its own chunk instead of
// every lesson landing in the shared route bundle. Still server-rendered (ssr: true).
const LESSONS: Record<string, React.ComponentType> = {
  'introduction':        dynamic(() => import('@/content/dsa/introduction')),
  'complexity':          dynamic(() => import('@/content/dsa/complexity')),
  'arrays':              dynamic(() => import('@/content/dsa/arrays')),
  'strings':             dynamic(() => import('@/content/dsa/strings')),
  'pointers':            dynamic(() => import('@/content/dsa/pointers')),
  'linked-lists':        dynamic(() => import('@/content/dsa/linked-lists')),
  'stacks':              dynamic(() => import('@/content/dsa/stacks')),
  'queues':              dynamic(() => import('@/content/dsa/queues')),
  'recursion':           dynamic(() => import('@/content/dsa/recursion')),
  'sorting':             dynamic(() => import('@/content/dsa/sorting')),
  'searching':           dynamic(() => import('@/content/dsa/searching')),
  'trees':               dynamic(() => import('@/content/dsa/trees')),
  'binary-search-tree':  dynamic(() => import('@/content/dsa/binary-search-tree')),
  'heaps':               dynamic(() => import('@/content/dsa/heaps')),
  'hashing':             dynamic(() => import('@/content/dsa/hashing')),
  'graphs':              dynamic(() => import('@/content/dsa/graphs')),
  'dynamic-programming': dynamic(() => import('@/content/dsa/dynamic-programming')),
  'greedy':              dynamic(() => import('@/content/dsa/greedy')),
  'backtracking':        dynamic(() => import('@/content/dsa/backtracking')),
  'advanced':            dynamic(() => import('@/content/dsa/advanced')),
}

export function DsaLesson({ slug }: { slug: string }) {
  const Lesson = LESSONS[slug]
  if (!Lesson) throw new Error(`No DSA lesson component for "${slug}"`)
  return <Lesson />
}
