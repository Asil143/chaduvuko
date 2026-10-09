import type { Metadata } from 'next'
import { sectionTitle } from '@/lib/site-title'

export const metadata: Metadata = { title: sectionTitle('SQL Playground') }

export default function SqlPlaygroundLayout({ children }: { children: React.ReactNode }) {
  return children
}
