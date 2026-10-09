import type { Metadata } from 'next'
import { sectionTitle } from '@/lib/site-title'

export const metadata: Metadata = { title: sectionTitle('Data Engineering Interview Prep') }

export default function InterviewLayout({ children }: { children: React.ReactNode }) {
  return children
}
