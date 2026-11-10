import type { Metadata } from 'next'
import Link from 'next/link'
import { liveLessonsForTrack } from '@/lib/catalog'
import { cardStyle, eyebrowStyle, h1Style, h2Style, leadStyle, pageShell } from '@/components/learn/PathCard'
import { BreadcrumbJsonLd } from '@/components/JsonLd'

const DESCRIPTION = 'Learn to choose and operate data services across AWS, Microsoft Azure, and Google Cloud, then apply cross-cloud security and career skills.'

const MODULES: { section: string; blurb: string; cheatsheet?: string }[] = [
  { section: 'Course Introduction', blurb: 'Compare the major data services and choose a cloud based on workload, skills, governance, and operating constraints.' },
  { section: 'AWS', blurb: 'S3, Glue, Redshift, Kinesis, Athena, EMR, Step Functions, and Lake Formation.', cheatsheet: '/learn/aws/cheatsheet' },
  { section: 'Microsoft Azure', blurb: 'ADLS Gen2, Data Factory, Databricks, Synapse, Event Hubs, Key Vault, and Fabric.', cheatsheet: '/learn/azure/cheatsheet' },
  { section: 'Google Cloud', blurb: 'BigQuery, Dataflow, Pub/Sub, Composer, Cloud Storage, and Dataproc.', cheatsheet: '/learn/gcp/cheatsheet' },
  { section: 'Platform-neutral Tools', blurb: 'Explore a managed lakehouse platform and its governance model across cloud deployments.' },
  { section: 'Cross-cloud Foundations', blurb: 'Apply identity, least privilege, private networking, and secure connectivity patterns across providers.' },
  { section: 'Career Preparation', blurb: 'Practice explaining architecture, trade-offs, reliability, governance, and cost in cloud data interviews.' },
]

export const metadata: Metadata = {
  title: 'Cloud Data Platforms: AWS, Azure & Google Cloud',
  description: DESCRIPTION,
  alternates: { canonical: '/learn/cloud-data' },
}

export default function CloudDataPage() {
  const lessons = liveLessonsForTrack('cloud-data')

  return (
    <div style={pageShell}>
      <BreadcrumbJsonLd items={[
        { name: 'Learn', url: 'https://chaduvuko.com/learn' },
        { name: 'Cloud Data Platforms', url: 'https://chaduvuko.com/learn/cloud-data' },
      ]} />
      <nav aria-label="Breadcrumb" style={{ fontSize: 13, color: 'var(--muted)', marginBottom: 18 }}>
        <Link href="/learn" style={{ color: 'var(--muted)' }}>Learn</Link>
      </nav>
      <p style={eyebrowStyle}>Course · {lessons.length} lessons</p>
      <h1 style={h1Style}>Cloud Data Platforms</h1>
      <p style={leadStyle}>
        {DESCRIPTION} Start with the provider your team uses; the core ideas carry across all three.
        New to data pipelines? Take the <Link href="/learn/data-engineering" style={{ color: 'var(--green)' }}>Data Engineering</Link> course first.
      </p>

      {MODULES.map((module, index) => {
        const items = lessons.filter(lesson => lesson.section === module.section).sort((a, b) => a.order - b.order)
        if (!items.length) return null
        const id = `module-${index + 1}`
        return (
          <section key={module.section} aria-labelledby={id} style={{ marginBottom: 36 }}>
            <h2 id={id} style={h2Style}>Module {index + 1} · {module.section}</h2>
            <p style={{ color: 'var(--muted)', fontSize: 14, margin: '0 0 14px' }}>
              {module.blurb} {module.cheatsheet && <><Link href={module.cheatsheet} style={{ color: 'var(--green)' }}>Cheat sheet</Link></>}
            </p>
            <ol style={{ listStyle: 'none', margin: 0, padding: 0, display: 'grid', gap: 12, gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))' }}>
              {items.map((lesson, i) => (
                <li key={lesson.href}>
                  <Link href={lesson.href} style={cardStyle}>
                    <span style={{ display: 'block', fontSize: 12, color: 'var(--muted)' }}>Lesson {i + 1}</span>
                    <span style={{ display: 'block', marginTop: 4, fontSize: 15, fontWeight: 700, color: 'var(--text)' }}>{lesson.title}</span>
                  </Link>
                </li>
              ))}
            </ol>
          </section>
        )
      })}
    </div>
  )
}
