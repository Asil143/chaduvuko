import { LearnLayout } from '@/components/content/LearnLayout'
import { Callout } from '@/components/content/Callout'
import Link from 'next/link'
import { Github, ExternalLink } from 'lucide-react'

export const metadata = { title: 'End-to-End Projects' }

const projects = [
  {
    num:'01', status:'live', cloud:'Azure',
    title:'Retail Sales Batch Pipeline',
    desc:'Complete Medallion Architecture pipeline processing retail sales data. Raw CSVs from the source land in ADLS Gen2 Bronze, get cleaned and validated in Silver by Databricks, and are aggregated into four Gold tables for Synapse and Power BI.',
    what:['ADF pipeline with incremental loading','PySpark notebooks for Bronze→Silver→Gold','Delta Lake for ACID transactions','Synapse external tables over Delta','Azure Key Vault for all secrets','Full monitoring with ADF pipeline runs'],
    tags:['ADF','Databricks','Synapse','Delta Lake','ADLS Gen2','PySpark'],
    color:'#0078d4',
    time:'~8 hours to complete',
    difficulty:'Beginner–Intermediate',
  },
  {
    num:'02', status:'soon', cloud:'Azure',
    title:'Real-Time Stock Price Streaming',
    desc:'Live streaming pipeline that ingests real-time stock price events through Event Hubs, processes them with Azure Stream Analytics (windowing, aggregations, anomaly detection), and powers a live Power BI dashboard that updates in real time.',
    what:['Event Hubs producer (Python script)','Stream Analytics SQL queries','5-minute tumbling window aggregations','Real-time Power BI dashboard','Alerts on price anomalies'],
    tags:['Event Hubs','Stream Analytics','Power BI','Python'],
    color:'#0078d4',
    time:'~10 hours to complete',
    difficulty:'Intermediate',
  },
  {
    num:'03', status:'soon', cloud:'Azure',
    title:'Lambda Architecture — Batch + Streaming Combined',
    desc:'Production-grade e-commerce platform that unifies historical batch data and real-time streaming data into a single serving layer. This is one of the most common architecture patterns in large enterprise data systems.',
    what:['Batch layer: ADF + Databricks + Delta Lake','Speed layer: Event Hubs + Stream Analytics','Serving layer: Azure Synapse','Single unified view combining both layers','Handling late-arriving events'],
    tags:['ADF','Event Hubs','Databricks','Synapse','Delta Lake'],
    color:'#7b61ff',
    time:'~15 hours to complete',
    difficulty:'Advanced',
  },
  {
    num:'04', status:'soon', cloud:'AWS',
    title:'End-to-End Data Pipeline on Amazon Web Services',
    desc:'Complete data pipeline built entirely on AWS. Source data lands in S3, processed by AWS Glue, loaded into Redshift for analytics, with Kinesis handling real-time ingestion. Step Functions orchestrate the entire flow.',
    what:['S3 data lake with Glue Catalog','AWS Glue ETL jobs (PySpark)','Redshift data warehouse','Kinesis streaming','Step Functions orchestration','IAM roles and security'],
    tags:['S3','AWS Glue','Redshift','Kinesis','Step Functions'],
    color:'#ff9900',
    time:'~12 hours to complete',
    difficulty:'Intermediate',
  },
  {
    num:'05', status:'soon', cloud:'GCP',
    title:'BigQuery Analytics Platform on Google Cloud',
    desc:'Full analytics pipeline on Google Cloud. Data flows through Cloud Pub/Sub, processed by Cloud Dataflow, stored in BigQuery partitioned tables, and visualized in Looker Studio. Composer (managed Airflow) orchestrates the pipeline.',
    what:['Pub/Sub → Dataflow streaming pipeline','BigQuery partitioned and clustered tables','Dataflow batch pipeline with Apache Beam','Cloud Composer (Airflow) orchestration','Looker Studio dashboards'],
    tags:['BigQuery','Dataflow','Pub/Sub','Composer','Looker Studio'],
    color:'#4285f4',
    time:'~12 hours to complete',
    difficulty:'Intermediate',
  },
  {
    num:'06', status:'soon', cloud:'Multi-Cloud',
    title:'Multi-Cloud Lakehouse with Apache Iceberg',
    desc:'The most advanced project. One unified lakehouse spanning Azure, AWS, and GCP using Apache Iceberg as the open table format. Data written on Azure can be queried from AWS Athena or BigQuery — no vendor lock-in.',
    what:['Apache Iceberg table format on all three clouds','Azure ADLS Gen2 + AWS S3 + GCS storage','Unified catalog with Apache Polaris','Query from BigQuery, Athena, and Synapse','Zero-ETL between cloud platforms'],
    tags:['Apache Iceberg','Azure','AWS','GCP','Polaris','Zero-ETL'],
    color:'#00e676',
    time:'~20 hours to complete',
    difficulty:'Expert',
  },
]

export default function ProjectsPage() {
  return (
    <LearnLayout
      title="End-to-End Projects"
      description="Real pipelines, real code, real cloud services. Each project is built from scratch with architecture diagrams, step-by-step guides, and GitHub repos you can fork and run yourself."
      section="Section 05 · Projects"
      readTime="3 min read"
      updatedAt="March 2025"
      breadcrumbs={[{ label: 'Projects', href: '/learn/projects' }]}
    >

      <Callout type="tip">
        Projects are the single most important thing on a data engineering resume when you don't have work experience. Recruiters want to see that you can actually build something — not just watch tutorials. Start with Project 1 today.
      </Callout>

      <div className="space-y-6 my-6">
        {projects.map(p => (
          <div key={p.num} className="rounded-xl overflow-hidden" style={{ border: '1px solid var(--border)', background: 'var(--surface)' }}>
            <div className="p-5 border-b" style={{ borderColor: 'var(--border)', background: `${p.color}06` }}>
              <div className="flex items-start gap-4">
                <div className="font-display font-black text-5xl tracking-tighter flex-shrink-0 leading-none mt-1"
                  style={{ color: 'var(--border2)' }}>{p.num}</div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1 flex-wrap">
                    <span className="text-xs font-mono px-2 py-0.5 rounded" style={{ background: `${p.color}15`, color: p.color }}>{p.cloud}</span>
                    <span className="text-xs font-mono px-2 py-0.5 rounded" style={{ background: p.status === 'live' ? 'rgba(0,230,118,0.1)' : 'rgba(107,114,128,0.1)', color: p.status === 'live' ? 'var(--green)' : 'var(--muted)' }}>
                      {p.status === 'live' ? '✓ Live' : 'Coming Soon'}
                    </span>
                    <span className="text-xs font-mono" style={{ color: 'var(--muted)' }}>{p.difficulty} · {p.time}</span>
                  </div>
                  <h3 className="font-display font-bold text-base" style={{ color: 'var(--text)', margin: 0, padding: 0, border: 'none' }}>{p.title}</h3>
                </div>
              </div>
            </div>

            <div className="p-5">
              <p className="text-sm leading-relaxed mb-4" style={{ color: 'var(--text2)', fontFamily: 'Lora, serif' }}>{p.desc}</p>
              <div className="mb-4">
                <div className="text-xs font-mono uppercase tracking-wider mb-2" style={{ color: 'var(--muted)' }}>What you'll build</div>
                <ul className="space-y-1">
                  {p.what.map(w => (
                    <li key={w} className="flex items-start gap-2 text-xs" style={{ color: 'var(--text2)', fontFamily: 'Lora, serif' }}>
                      <span style={{ color: p.color, flexShrink: 0 }}>→</span> {w}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="flex items-center justify-between flex-wrap gap-3">
                <div className="flex flex-wrap gap-1.5">
                  {p.tags.map(t => <span key={t} className="tag">{t}</span>)}
                </div>
                {p.status === 'live' ? (
                  <div className="flex gap-2">
                    <Link href="#" className="btn-secondary text-xs py-2 px-3">
                      <Github size={12} /> GitHub Repo
                    </Link>
                    <Link href="#" className="btn-primary text-xs py-2 px-3">
                      Start Project →
                    </Link>
                  </div>
                ) : (
                  <span className="text-xs font-mono" style={{ color: 'var(--muted)' }}>Coming soon</span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

    </LearnLayout>
  )
}
