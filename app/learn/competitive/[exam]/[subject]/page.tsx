import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getSubject, ALL_SUBJECTS } from '@/data/subjects/index'
import SubjectPage from '@/components/content/SubjectPage'

interface Props { params: { exam: string; subject: string } }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const s = getSubject('competitive', params.exam, params.subject)
  if (!s) return {}
  return {
    title: `${s.name} — Chaduvuko`,
    description: s.description,
  }
}

export function generateStaticParams() {
  return ALL_SUBJECTS
    .filter(s => s.category === 'competitive')
    .map(s => ({ exam: s.exam!, subject: s.slug }))
}

export default function Page({ params }: Props) {
  const s = getSubject('competitive', params.exam, params.subject)
  if (!s) notFound()
  const examLabel = params.exam.toUpperCase()
  return (
    <SubjectPage
      subject={s}
      breadcrumbs={[
        { label: 'Tutorials', href: '/learn/tutorials' },
        { label: examLabel, href: `/learn/tutorials?cat=competitive` },
      ]}
    />
  )
}