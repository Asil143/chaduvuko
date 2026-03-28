import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getSubject, ALL_SUBJECTS } from '@/data/subjects/index'
import SubjectPage from '@/components/content/SubjectPage'

interface Props { params: { cls: string; subject: string } }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const s = getSubject('school', params.cls, params.subject)
  if (!s) return {}
  return {
    title: `${s.name} ${s.className} — Chaduvuko`,
    description: s.description,
  }
}

export function generateStaticParams() {
  return ALL_SUBJECTS
    .filter(s => s.category === 'school')
    .map(s => ({ cls: s.classSlug!, subject: s.slug }))
}

export default function Page({ params }: Props) {
  const s = getSubject('school', params.cls, params.subject)
  if (!s) notFound()
  const clsLabel = params.cls.replace('class-', 'Class ')
  return (
    <SubjectPage
      subject={s}
      breadcrumbs={[
        { label: 'Tutorials', href: '/learn/tutorials' },
        { label: clsLabel, href: `/learn/tutorials?cat=school` },
      ]}
    />
  )
}