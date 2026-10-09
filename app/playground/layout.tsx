import type { Metadata } from 'next'
import { sectionTitle } from '@/lib/site-title'

export const metadata: Metadata = { title: sectionTitle('Code Playground') }

export default function PlaygroundLayout({ children }: { children: React.ReactNode }) {
  return children
}
