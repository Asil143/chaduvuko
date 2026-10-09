import type { Metadata } from 'next'
import { sectionTitle } from '@/lib/site-title'

export const metadata: Metadata = { title: sectionTitle('Visual SQL JOIN Diagrams') }

export default function SqlJoinsLayout({ children }: { children: React.ReactNode }) {
  return children
}
