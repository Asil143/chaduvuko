import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getSubject, ALL_SUBJECTS } from '@/data/subjects/index'
import SubjectPage from '@/components/content/SubjectPage'

interface Props { params: { branch: string; subject: string } }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const s = getSubject('btech', params.branch, params.subject)
  if (!s) return {}
  return {
    title: `${s.name} — B.Tech ${params.branch.toUpperCase()} — Chaduvuko`,
    description: s.description,
  }
}

export function generateStaticParams() {
  return ALL_SUBJECTS
    .filter(s => s.category === 'btech')
    .map(s => ({ branch: s.branch!, subject: s.slug }))
}

export default function Page({ params }: Props) {
  const s = getSubject('btech', params.branch, params.subject)
  if (!s) notFound()
  return (
    <SubjectPage
      subject={s}
      breadcrumbs={[
        { label: 'Tutorials', href: '/learn/tutorials' },
        { label: `B.Tech ${params.branch.toUpperCase()}`, href: `/learn/tutorials?cat=btech` },
      ]}
    />
  )
}