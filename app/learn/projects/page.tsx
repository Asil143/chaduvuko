'use client'
import Link from 'next/link'
import { useState } from 'react'


const azureProjects = [
  {
    num: '01',
    title: 'Copy a CSV File to Azure Data Lake',
    subtitle: 'ADF · Blob Storage · ADLS Gen2 · Linked Services',
    desc: 'Your first Azure pipeline from scratch. Upload a CSV file to cloud storage using Azure Data Factory — the foundation pattern behind every DE pipeline.',
    tags: ['ADF', 'ADLS Gen2', 'Blob Storage'],
    time: '60–90 min',
    level: 'Absolute Beginner',
    levelColor: '#00e676',
    href: '/learn/projects/azure-batch-pipeline',
    status: 'live',
  },
  {
    num: '02',
    title: 'Copy Multiple Files Using ForEach Loop',
    subtitle: 'ADF · ForEach · Parameters · Dynamic Expressions',
    desc: 'Stop creating 10 separate Copy activities. Use one ForEach loop to move all 10 store CSV files in a single parameterized pipeline run.',
    tags: ['ADF', 'ForEach', 'Parameters'],
    time: '60–75 min',
    level: 'Beginner',
    levelColor: '#00e676',
    href: '/learn/projects/azure-projects-02',
    status: 'live',
  },
  {
    num: '03',
    title: 'Parameterized Pipeline with Run Date',
    subtitle: 'ADF · run_date Parameter · Hive Partitioning · Schedule Trigger',
    desc: 'Pass a date at runtime and ADF builds the correct file names automatically. Add a midnight trigger and the pipeline runs every night with zero human involvement.',
    tags: ['ADF', 'Triggers', 'Date Partitioning'],
    time: '75–90 min',
    level: 'Beginner',
    levelColor: '#00e676',
    href: '/learn/projects/azure-project-03',
    status: 'live',
  },
  {
    num: '04',
    title: 'HTTP Ingestion — Download from a Public URL',
    subtitle: 'ADF · HTTP Linked Service · Public Datasets · Parallel Copy',
    desc: 'Pull data directly from a public HTTPS endpoint into ADLS. No manual uploads — ADF fetches from the internet and lands it straight in your data lake.',
    tags: ['ADF', 'HTTP', 'Web Activity'],
    time: '60–75 min',
    level: 'Beginner',
    levelColor: '#00e676',
    href: '/learn/projects/azure-project-04',
    status: 'live',
  },
  {
    num: '05',
    title: 'Organize Files Automatically With Date Stamps',
    subtitle: 'ADF · Get Metadata · If Condition · Delete Activity · File Management',
    desc: 'Check if a file exists before copying, add today\'s date to file names automatically, clean the landing zone, and log missing files — a complete production file management workflow.',
    tags: ['ADF', 'Get Metadata', 'If Condition', 'Delete'],
    time: '90–120 min',
    level: 'Beginner+',
    levelColor: '#00e676',
    href: '/learn/projects/azure-project-05',
    status: 'live',
  },
  {
    num: '06',
    title: 'Silver → Gold Aggregations for Reporting',
    subtitle: 'Databricks · Synapse · Analytics · Business Metrics',
    desc: 'Build the Gold layer — aggregate daily store sales by region, product category, and time period. Load into Synapse for Power BI reporting.',
    tags: ['Databricks', 'Synapse', 'Delta Lake'],
    time: '90 min',
    level: 'Intermediate',
    levelColor: '#ff9900',
    href: '/learn/projects',
    status: 'coming',
  },
]

const awsProjects = [
  {
    num: '01',
    title: 'S3 Ingestion Pipeline with AWS Glue',
    subtitle: 'S3 · AWS Glue · Crawler · Data Catalog',
    desc: 'Ingest CSV files into S3, auto-discover schema with a Glue Crawler, and query the data via Athena — the foundational AWS data engineering pattern.',
    tags: ['S3', 'Glue', 'Athena'],
    time: '60–75 min',
    level: 'Beginner',
    levelColor: '#00e676',
    href: '/learn/projects',
    status: 'coming',
  },
  {
    num: '02',
    title: 'Real-Time Streaming with Kinesis',
    subtitle: 'Kinesis Data Streams · Firehose · Lambda · S3',
    desc: 'Stream real-time events through Kinesis, transform with Lambda, and land in S3 in Parquet format — the standard AWS streaming pattern.',
    tags: ['Kinesis', 'Lambda', 'Firehose'],
    time: '90 min',
    level: 'Intermediate',
    levelColor: '#ff9900',
    href: '/learn/projects',
    status: 'coming',
  },
]

const gcpProjects = [
  {
    num: '01',
    title: 'BigQuery Analytics Pipeline',
    subtitle: 'Cloud Storage · Dataflow · BigQuery · Looker Studio',
    desc: 'Land CSV data in GCS, transform with Dataflow, load into BigQuery, and visualize in Looker Studio — the complete GCP analytics stack.',
    tags: ['BigQuery', 'Dataflow', 'GCS'],
    time: '75–90 min',
    level: 'Beginner',
    levelColor: '#00e676',
    href: '/learn/projects',
    status: 'coming',
  },
]

const tracks = [
  { key: 'azure', label: '☁️ Azure', color: '#0078d4', textColor: '#50b0ff', projects: azureProjects, liveCount: 5 },
  { key: 'aws',   label: '🟠 AWS',   color: '#ff9900', textColor: '#ff9900', projects: awsProjects,   liveCount: 0 },
  { key: 'gcp',   label: '🔵 GCP',   color: '#4285f4', textColor: '#4285f4', projects: gcpProjects,   liveCount: 0 },
]

function ProjectCard({ p, trackColor }: { p: typeof azureProjects[0]; trackColor: string }) {
  const live = p.status === 'live'
  return (
    <div className="relative rounded-2xl overflow-hidden transition-all duration-200"
      style={{ border: `1px solid ${live ? trackColor + '40' : 'var(--border)'}`, background: 'var(--surface)' }}>
      {/* Number badge */}
      <div className="absolute top-4 right-4 w-10 h-10 rounded-xl flex items-center justify-center font-mono font-bold text-sm"
        style={{ background: live ? trackColor + '20' : 'var(--bg2)', color: live ? trackColor : 'var(--muted)', border: `1px solid ${live ? trackColor + '40' : 'var(--border)'}` }}>
        {p.num}
      </div>
      <div className="p-6 pr-16">
        {/* Status */}
        <div className="flex items-center gap-2 mb-3">
          {live ? (
            <span className="flex items-center gap-1.5 text-xs px-2 py-1 rounded-full font-mono"
              style={{ background: '#00e67615', color: '#00e676', border: '1px solid #00e67630' }}>
              <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse inline-block" />
              Live
            </span>
          ) : (
            <span className="text-xs px-2 py-1 rounded-full font-mono"
              style={{ background: 'var(--bg2)', color: 'var(--muted)', border: '1px solid var(--border)' }}>
              Coming Soon
            </span>
          )}
          <span className="text-xs px-2 py-1 rounded-full font-mono"
            style={{ background: p.levelColor + '15', color: p.levelColor, border: `1px solid ${p.levelColor}30` }}>
            {p.level}
          </span>
          <span className="text-xs" style={{ color: 'var(--muted)' }}>⏱ {p.time}</span>
        </div>
        <h3 className="font-bold text-base mb-1" style={{ color: 'var(--text)' }}>{p.title}</h3>
        <p className="text-xs font-mono mb-2" style={{ color: 'var(--muted)' }}>{p.subtitle}</p>
        <p className="text-sm mb-4" style={{ color: 'var(--text2)', lineHeight: 1.6 }}>{p.desc}</p>
        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          {p.tags.map(t => (
            <span key={t} className="text-xs px-2 py-0.5 rounded font-mono"
              style={{ background: 'var(--bg2)', color: 'var(--text2)', border: '1px solid var(--border)' }}>{t}</span>
          ))}
        </div>
        {/* CTA */}
        {live ? (
          <Link href={p.href}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all"
            style={{ background: trackColor + '20', color: trackColor, border: `1px solid ${trackColor}40` }}>
            Start Project →
          </Link>
        ) : (
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold"
            style={{ background: 'var(--bg2)', color: 'var(--muted)', border: '1px solid var(--border)' }}>
            Coming Soon
          </span>
        )}
      </div>
    </div>
  )
}

export default function ProjectsPage() {
  const [activeTrack, setActiveTrack] = useState('azure')
  const track = tracks.find(t => t.key === activeTrack)!

  return (
    <div className="min-h-screen" style={{ background: 'var(--bg)' }}>
      {/* Header */}
      <div className="border-b" style={{ borderColor: 'var(--border)' }}>
        <div className="max-w-5xl mx-auto px-4 py-12">
          <div className="text-xs font-mono uppercase tracking-widest mb-3" style={{ color: 'var(--muted)' }}>
            // Real World Projects
          </div>
          <h1 className="text-3xl font-bold mb-3" style={{ color: 'var(--text)' }}>Build. Don't Just Read.</h1>
          <p className="text-base max-w-2xl" style={{ color: 'var(--text2)', lineHeight: 1.7 }}>
            End-to-end data engineering projects with step-by-step instructions, screenshot guides, and real cloud configurations.
            Every project builds on the previous one using the same FreshMart dataset.
          </p>
          {/* Stats */}
          <div className="flex flex-wrap gap-4 mt-6">
            {[
              { label: 'Azure Projects Live', value: '3', color: '#0078d4' },
              { label: 'AWS Projects',         value: '2 coming', color: '#ff9900' },
              { label: 'GCP Projects',         value: '1 coming', color: '#4285f4' },
              { label: 'Total Planned',         value: '25+', color: 'var(--accent)' },
            ].map(s => (
              <div key={s.label} className="px-4 py-3 rounded-xl" style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}>
                <div className="text-lg font-bold font-mono" style={{ color: s.color }}>{s.value}</div>
                <div className="text-xs" style={{ color: 'var(--muted)' }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-10">
        {/* Track tabs */}
        <div className="flex gap-2 mb-8">
          {tracks.map(t => (
            <button key={t.key}
              onClick={() => setActiveTrack(t.key)}
              className="px-5 py-2.5 rounded-xl text-sm font-semibold transition-all"
              style={activeTrack === t.key
                ? { background: t.color + '20', color: t.textColor, border: `2px solid ${t.color}60` }
                : { background: 'var(--surface)', color: 'var(--muted)', border: '1px solid var(--border)' }}>
              {t.label}
              {t.liveCount > 0 && (
                <span className="ml-2 text-xs px-1.5 py-0.5 rounded-full font-mono"
                  style={{ background: '#00e67615', color: '#00e676' }}>{t.liveCount} live</span>
              )}
            </button>
          ))}
        </div>

        {/* Series progression banner */}
        <div className="mb-8 p-4 rounded-xl" style={{ background: 'var(--surface)', border: `1px solid ${track.color}30` }}>
          <div className="flex items-start gap-3">
            <span className="text-xl">🔗</span>
            <div>
              <p className="text-sm font-semibold mb-1" style={{ color: 'var(--text)' }}>
                Projects build on each other — same resources, same data, growing complexity
              </p>
              <p className="text-xs" style={{ color: 'var(--muted)' }}>
                All {track.label} projects use the same FreshMart grocery chain dataset and the same Azure resource group.
                Complete them in order — each project assumes the previous one is done.
              </p>
            </div>
          </div>
        </div>

        {/* Project cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {track.projects.map(p => (
            <ProjectCard key={p.num} p={p} trackColor={track.color} />
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-10 p-6 rounded-2xl text-center" style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}>
          <p className="text-sm mb-3" style={{ color: 'var(--text2)' }}>
            New projects added regularly. Start with Project 01 — no prior cloud experience needed.
          </p>
          <Link href="/learn/projects/azure-batch-pipeline"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm"
            style={{ background: '#0078d420', color: '#50b0ff', border: '1px solid #0078d440' }}>
            Start Project 01 — Free →
          </Link>
        </div>
      </div>
    </div>
  )
}