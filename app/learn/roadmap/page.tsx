import { LearnLayout } from '@/components/content/LearnLayout'
import { Callout } from '@/components/content/Callout'
import Link from 'next/link'
import { ChevronRight } from 'lucide-react'

export const metadata = { title: 'Data Engineering Roadmap 2025' }

const roadmap = [
  {
    phase: 'Phase 1', title: 'Core Foundations', duration: '4–6 weeks', color: '#00c2ff',
    desc: 'Before you touch any cloud service, these skills need to be solid. Skipping this phase is why most beginners struggle.',
    items: [
      { name: 'What is Data Engineering?', href: '/learn/what-is-data-engineering', status: 'live', note: 'Start here — understand the field' },
      { name: 'SQL for Data Engineers', href: '/learn/foundations/sql', status: 'live', note: 'The most important skill. Window functions, CTEs, aggregations' },
      { name: 'Python for Data Engineers', href: '/learn/foundations/python', status: 'live', note: 'Focus on PySpark — not web dev Python' },
      { name: 'Git & Version Control', href: '#', status: 'soon', note: 'Branching, commits, pull requests, GitHub' },
      { name: 'Linux Basics', href: '#', status: 'soon', note: 'Command line navigation, file operations, bash scripts' },
    ]
  },
  {
    phase: 'Phase 2', title: 'Cloud Platform — Azure', duration: '6–8 weeks', color: '#0078d4',
    desc: 'Start with Azure. It\'s the most common platform in enterprise jobs, especially for H1B-sponsored roles at consulting firms.',
    items: [
      { name: 'Azure Introduction', href: '/learn/azure/introduction', status: 'live', note: 'Why Azure, roles, architecture cycle' },
      { name: 'ADLS Gen2 — Your Data Lake', href: '/learn/azure/adls-gen2', status: 'live', note: 'Bronze/Silver/Gold layers, file formats' },
      { name: 'Azure Data Factory (ADF)', href: '/learn/azure/adf', status: 'soon', note: 'Orchestration, pipelines, triggers' },
      { name: 'Azure Databricks', href: '/learn/azure/databricks', status: 'soon', note: 'PySpark at scale, Delta Lake, notebooks' },
      { name: 'Azure Synapse Analytics', href: '/learn/azure/synapse', status: 'soon', note: 'SQL serving layer, dedicated pools' },
      { name: 'Azure Event Hubs', href: '#', status: 'soon', note: 'Real-time streaming ingestion' },
      { name: 'Microsoft Fabric', href: '#', status: 'soon', note: 'The new unified Azure analytics platform' },
    ]
  },
  {
    phase: 'Phase 3', title: 'Build Real Projects', duration: '4–6 weeks', color: '#00e676',
    desc: 'No amount of reading replaces building. This phase is about getting your hands dirty with real pipelines on real cloud services.',
    items: [
      { name: 'Project 1: Retail Sales Batch Pipeline — Azure', href: '/learn/projects', status: 'live', note: 'Medallion Architecture, ADF + Databricks + Synapse' },
      { name: 'Project 2: Real-Time Stock Streaming — Azure', href: '/learn/projects', status: 'soon', note: 'Event Hubs + Stream Analytics + Power BI' },
      { name: 'Project 3: Lambda Architecture', href: '/learn/projects', status: 'soon', note: 'Combine batch and streaming into one system' },
    ]
  },
  {
    phase: 'Phase 4', title: 'Modern Data Stack', duration: '3–4 weeks', color: '#7b61ff',
    desc: 'The open source tools that companies are actively hiring for right now. Add these after you have cloud fundamentals solid.',
    items: [
      { name: 'Apache Iceberg', href: '/learn/projects', status: 'soon', note: 'The open table format replacing Delta Lake in many orgs' },
      { name: 'dbt (data build tool)', href: '/learn/projects', status: 'soon', note: 'SQL-based transformations with version control' },
      { name: 'Apache Kafka', href: '/learn/projects', status: 'soon', note: 'Event streaming at scale' },
      { name: 'Apache Airflow', href: '/learn/projects', status: 'soon', note: 'Python-based pipeline orchestration' },
    ]
  },
  {
    phase: 'Phase 5', title: 'Expand to AWS & GCP', duration: '4–6 weeks', color: '#ff9800',
    desc: 'Once you know Azure, the concepts transfer. You\'re learning service names, not new ideas. This phase makes you cloud-agnostic.',
    items: [
      { name: 'AWS Track — S3, Glue, Redshift, Kinesis', href: '/learn/projects', status: 'soon', note: 'The largest cloud by market share' },
      { name: 'GCP Track — BigQuery, Dataflow, Pub/Sub', href: '/learn/projects', status: 'soon', note: 'Google\'s cloud with industry-leading SQL in BigQuery' },
      { name: 'Project 4: End-to-End AWS Pipeline', href: '/learn/projects', status: 'soon', note: 'Complete project on Amazon Web Services' },
      { name: 'Project 5: BigQuery Analytics on GCP', href: '/learn/projects', status: 'soon', note: 'Full pipeline on Google Cloud' },
    ]
  },
  {
    phase: 'Phase 6', title: 'Interview Prep & Job Search', duration: 'Ongoing', color: '#ff6b6b',
    desc: 'Start this before you feel "ready." The best way to identify gaps in your knowledge is to practice explaining things out loud.',
    items: [
      { name: 'Top 50 Data Engineering Interview Questions', href: '/learn/interview', status: 'soon', note: 'Covers all common topic areas' },
      { name: 'System Design for Data Engineers', href: '/learn/interview', status: 'soon', note: 'How to design a scalable data platform' },
      { name: 'Azure Interview Q&A', href: '/learn/interview', status: 'soon', note: 'ADF, Databricks, Synapse deep-dive questions' },
      { name: 'Resume Tips for Data Engineers', href: '/learn/interview', status: 'soon', note: 'How to present projects without work experience' },
    ]
  },
]

export default function RoadmapPage() {
  return (
    <LearnLayout
      title="Data Engineering Roadmap 2025"
      description="A clear, ordered path from complete beginner to job-ready data engineer. No guesswork, no random YouTube rabbit holes. Six phases covering everything the industry is hiring for right now."
      section="Section 01 · Foundations"
      readTime="5 min read"
      updatedAt="March 2025"
      breadcrumbs={[
        { label: 'Foundations', href: '/learn/what-is-data-engineering' },
        { label: 'Roadmap 2025', href: '/learn/roadmap' },
      ]}
    >

      <Callout type="tip">
        Don't treat this as a strict sequence where you must complete Phase 1 before looking at Phase 2. Treat it as a priority order. Start at the top and move down, but don't get stuck perfecting one phase before touching the next.
      </Callout>

      <div className="space-y-8 my-8">
        {roadmap.map((phase, pi) => (
          <div key={phase.phase}>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-mono font-bold flex-shrink-0"
                style={{ background: `${phase.color}15`, border: `2px solid ${phase.color}`, color: phase.color }}>
                {pi + 1}
              </div>
              <div>
                <div className="text-xs font-mono" style={{ color: phase.color }}>{phase.phase}</div>
                <h2 className="font-display font-bold text-lg leading-tight" style={{ color: 'var(--text)', margin: 0, padding: 0, border: 'none' }}>{phase.title}</h2>
              </div>
              <span className="ml-auto text-xs font-mono px-2.5 py-1 rounded-full"
                style={{ background: `${phase.color}10`, color: phase.color, border: `1px solid ${phase.color}25` }}>
                {phase.duration}
              </span>
            </div>
            <p className="text-sm leading-relaxed mb-4 pl-11" style={{ color: 'var(--muted)', fontFamily: 'Lora, serif' }}>{phase.desc}</p>
            <div className="pl-11 space-y-2">
              {phase.items.map(item => (
                <Link key={item.name} href={item.href}
                  className="flex items-center gap-3 p-3.5 rounded-xl group transition-all"
                  style={{ background: 'var(--bg2)', border: '1px solid var(--border)' }}
                  onMouseEnter={undefined}>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="font-display font-medium text-sm" style={{ color: 'var(--text)' }}>{item.name}</span>
                      <span className={`text-xs font-mono px-2 py-0.5 rounded flex-shrink-0`}
                        style={{
                          background: item.status === 'live' ? 'rgba(0,230,118,0.1)' : 'rgba(107,114,128,0.1)',
                          color: item.status === 'live' ? 'var(--green)' : 'var(--muted)',
                        }}>
                        {item.status === 'live' ? '✓ Live' : 'Soon'}
                      </span>
                    </div>
                    <div className="text-xs mt-0.5" style={{ color: 'var(--muted)', fontFamily: 'Lora, serif' }}>{item.note}</div>
                  </div>
                  {item.status === 'live' && <ChevronRight size={14} style={{ color: phase.color, flexShrink: 0 }} />}
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>

    </LearnLayout>
  )
}
