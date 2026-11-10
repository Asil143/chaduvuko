import type { Metadata } from 'next'
import { sectionTitle } from '@/lib/site-title'

export const metadata: Metadata = { title: sectionTitle('Cloud Data Projects') }

export default function ProjectsLayout({ children }: { children: React.ReactNode }) {
  return children
}
