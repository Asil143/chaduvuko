import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getSubject, ALL_SUBJECTS } from '@/data/subjects/index'
import SubjectPage from '@/components/content/SubjectPage'

interface Props { params: { cls: string; subject: string } }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const s = getSubject('intermediate', params.cls, params.subject)
  if (!s) return {}
  return {
    title: `${s.name} ${s.className} — Chaduvuko`,
    description: s.description,
  }
}

export function generateStaticParams() {
  return ALL_SUBJECTS
    .filter(s => s.category === 'intermediate')
    .map(s => ({ cls: s.classSlug!, subject: s.slug }))
}

export default function Page({ params }: Props) {
  const s = getSubject('intermediate', params.cls, params.subject)
  if (!s) notFound()
  return (
    <SubjectPage
      subject={s}
      breadcrumbs={[
        { label: 'Tutorials', href: '/learn/tutorials' },
        { label: s.className || '', href: `/learn/tutorials?cat=intermediate` },
      ]}
    />
  )
}