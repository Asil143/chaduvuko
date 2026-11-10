import type { Metadata } from 'next'
import { sectionTitle } from '@/lib/site-title'

export const metadata: Metadata = {
  title: sectionTitle('Data Engineering Interview Question Bank'),
  description: '50 real data engineering interview questions across SQL, PySpark, cloud, pipelines, system design and behavioral rounds, with senior-level answers and tips.',
  alternates: { canonical: '/learn/interview/data-engineering-questions' },
}

export default function DataEngineeringQuestionsLayout({ children }: { children: React.ReactNode }) {
  return children
}
