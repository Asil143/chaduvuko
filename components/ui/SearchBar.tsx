'use client'
import { useState, useEffect, useRef } from 'react'
import { Search, X, ArrowRight } from 'lucide-react'
import Link from 'next/link'

const searchData = [
  { title: 'What is Data Engineering?', section: 'Foundations', href: '/learn/what-is-data-engineering', tags: ['pipeline','etl','batch','streaming','data lake','warehouse'] },
  { title: 'Data Engineering Roadmap 2025', section: 'Foundations', href: '/learn/roadmap', tags: ['roadmap','learning path','beginner','career'] },
  { title: 'SQL for Data Engineers', section: 'Foundations', href: '/learn/foundations/sql', tags: ['sql','window functions','cte','joins','rank'] },
  { title: 'Python for Data Engineers', section: 'Foundations', href: '/learn/foundations/python', tags: ['python','pyspark','pandas','spark','dataframe'] },
  { title: 'Azure Introduction', section: 'Azure Track', href: '/learn/azure/introduction', tags: ['azure','cloud','medallion','dp-203'] },
  { title: 'ADLS Gen2', section: 'Azure Track', href: '/learn/azure/adls-gen2', tags: ['adls','storage','data lake','bronze silver gold','delta'] },
  { title: 'Azure Data Factory (ADF)', section: 'Azure Track', href: '/learn/azure/adf', tags: ['adf','pipeline','orchestration','linked service','trigger'] },
  { title: 'Azure Databricks', section: 'Azure Track', href: '/learn/azure/databricks', tags: ['databricks','spark','pyspark','delta lake','notebook'] },
  { title: 'Azure Synapse Analytics', section: 'Azure Track', href: '/learn/azure/synapse', tags: ['synapse','sql pool','external table','power bi'] },
  { title: 'AWS Introduction', section: 'AWS Track', href: '/learn/aws/introduction', tags: ['aws','amazon','s3','glue','redshift','kinesis'] },
  { title: 'Amazon S3', section: 'AWS Track', href: '/learn/aws/s3', tags: ['s3','storage','bucket','data lake','parquet','lifecycle'] },
  { title: 'AWS Glue', section: 'AWS Track', href: '/learn/aws/glue', tags: ['glue','etl','crawler','catalog','pyspark','serverless'] },
  { title: 'Amazon Redshift', section: 'AWS Track', href: '/learn/aws/redshift', tags: ['redshift','warehouse','sql','distkey','sortkey','spectrum'] },
  { title: 'Amazon Kinesis', section: 'AWS Track', href: '/learn/aws/kinesis', tags: ['kinesis','streaming','real-time','firehose','shard'] },
  { title: 'GCP Introduction', section: 'GCP Track', href: '/learn/gcp/introduction', tags: ['gcp','google cloud','bigquery','dataflow','pubsub','composer'] },
  { title: 'Google BigQuery', section: 'GCP Track', href: '/learn/gcp/bigquery', tags: ['bigquery','warehouse','sql','partitioning','clustering','serverless'] },
  { title: 'Cloud Dataflow', section: 'GCP Track', href: '/learn/gcp/dataflow', tags: ['dataflow','apache beam','batch','streaming','pyspark'] },
  { title: 'Cloud Pub/Sub', section: 'GCP Track', href: '/learn/gcp/pubsub', tags: ['pubsub','streaming','messaging','events','topic','subscription'] },
  { title: 'Cloud Composer (Airflow)', section: 'GCP Track', href: '/learn/gcp/composer', tags: ['composer','airflow','dag','orchestration','python','schedule'] },
  { title: 'Project 1: Azure Batch Pipeline', section: 'Projects', href: '/learn/projects/azure-batch-pipeline', tags: ['project','batch','medallion','adf','databricks','synapse'] },
  { title: 'All Projects', section: 'Projects', href: '/learn/projects', tags: ['project','end-to-end','pipeline','hands-on'] },
  { title: 'Interview Questions', section: 'Interview Prep', href: '/learn/interview', tags: ['interview','questions','etl','medallion','system design'] },
  { title: 'Blog', section: 'Blog', href: '/blog', tags: ['blog','articles','posts','insights'] },
  { title: 'Newsletter', section: 'Newsletter', href: '/newsletter', tags: ['newsletter','subscribe','updates','weekly'] },
]

const sectionColors: Record<string, string> = {
  'Foundations': '#00c2ff', 'Azure Track': '#0078d4', 'AWS Track': '#ff9900',
  'GCP Track': '#4285f4', 'Projects': '#00e676', 'Interview Prep': '#ff6b6b',
  'Blog': '#7b61ff', 'Newsletter': '#f5c542',
}

export function SearchBar({ variant = 'navbar' }: { variant?: 'navbar' | 'hero' }) {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<typeof searchData>([])
  const [open, setOpen] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!query.trim()) { setResults([]); return }
    const q = query.toLowerCase()
    setResults(searchData.filter(item =>
      item.title.toLowerCase().includes(q) ||
      item.section.toLowerCase().includes(q) ||
      item.tags.some(t => t.includes(q))
    ).slice(0, 7))
  }, [query])

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') { e.preventDefault(); setOpen(true); inputRef.current?.focus() }
      if (e.key === 'Escape') setOpen(false)
    }
    document.addEventListener('keydown', handler)
    return () => document.removeEventListener('keydown', handler)
  }, [])

  const dropdown = open && results.length > 0 && (
    <div className="absolute left-0 right-0 mt-1 z-50 rounded-xl overflow-hidden"
      style={{ top: '100%', background: 'var(--surface)', border: '1px solid var(--border2)', boxShadow: 'var(--shadow-lg)' }}>
      <ul className="py-1">
        {results.map(item => (
          <li key={item.href + item.title}>
            <Link href={item.href} onClick={() => { setOpen(false); setQuery('') }}
              className="flex items-center gap-3 px-4 py-2.5 transition-colors"
              style={{ color: 'var(--text)' }}
              onMouseEnter={e => (e.currentTarget.style.background = 'var(--bg2)')}
              onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}>
              <div className="flex-1 min-w-0">
                <div className="text-sm font-medium truncate">{item.title}</div>
                <div className="text-xs font-mono mt-0.5" style={{ color: sectionColors[item.section] || 'var(--muted)' }}>{item.section}</div>
              </div>
              <ArrowRight size={12} style={{ color: 'var(--muted)', flexShrink: 0 }} />
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )

  if (variant === 'hero') {
    return (
      <div ref={containerRef} className="relative w-full max-w-xl">
        <div className="flex items-center gap-2 px-4 py-3 rounded-xl"
          style={{ background: 'var(--surface)', border: '1px solid var(--border2)', boxShadow: 'var(--shadow-lg)' }}>
          <Search size={16} style={{ color: 'var(--muted)', flexShrink: 0 }} />
          <input ref={inputRef} type="text" placeholder="Search tutorials, concepts, services..."
            value={query} onChange={e => { setQuery(e.target.value); setOpen(true) }}
            onFocus={() => setOpen(true)}
            className="flex-1 bg-transparent text-sm outline-none" style={{ color: 'var(--text)' }} />
          {query && <button onClick={() => { setQuery(''); setResults([]) }}><X size={14} style={{ color: 'var(--muted)' }} /></button>}
          <kbd className="text-xs font-mono px-1.5 py-0.5 rounded hidden sm:block"
            style={{ background: 'var(--bg3)', color: 'var(--muted)', border: '1px solid var(--border)' }}>Ctrl K</kbd>
        </div>
        {dropdown}
      </div>
    )
  }

  return (
    <div ref={containerRef} className="relative hidden md:block">
      <button onClick={() => { setOpen(true); setTimeout(() => inputRef.current?.focus(), 50) }}
        className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm"
        style={{ background: 'var(--bg2)', border: '1px solid var(--border)', color: 'var(--muted)', minWidth: '180px' }}>
        <Search size={13} />
        <span className="flex-1 text-left text-xs">Search...</span>
        <kbd className="text-xs font-mono px-1 py-0.5 rounded"
          style={{ background: 'var(--bg3)', border: '1px solid var(--border)', fontSize: '0.65rem' }}>Ctrl K</kbd>
      </button>
      {open && (
        <div className="absolute top-0 left-0 z-50" style={{ minWidth: '320px' }}>
          <div className="flex items-center gap-2 px-3 py-2 rounded-t-lg"
            style={{ background: 'var(--surface)', border: '1px solid var(--border2)', borderBottom: 'none' }}>
            <Search size={14} style={{ color: 'var(--muted)', flexShrink: 0 }} />
            <input ref={inputRef} type="text" placeholder="Search tutorials..." value={query}
              onChange={e => setQuery(e.target.value)} autoFocus
              className="flex-1 bg-transparent text-sm outline-none" style={{ color: 'var(--text)' }} />
            {query && <button onClick={() => setQuery('')}><X size={12} style={{ color: 'var(--muted)' }} /></button>}
          </div>
          {results.length > 0 && (
            <div className="rounded-b-xl overflow-hidden"
              style={{ background: 'var(--surface)', border: '1px solid var(--border2)', borderTop: 'none', boxShadow: 'var(--shadow-lg)' }}>
              <ul className="py-1">
                {results.map(item => (
                  <li key={item.href + item.title}>
                    <Link href={item.href} onClick={() => { setOpen(false); setQuery('') }}
                      className="flex items-center gap-3 px-4 py-2.5"
                      style={{ color: 'var(--text)' }}
                      onMouseEnter={e => (e.currentTarget.style.background = 'var(--bg2)')}
                      onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}>
                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-medium truncate">{item.title}</div>
                        <div className="text-xs font-mono mt-0.5" style={{ color: sectionColors[item.section] || 'var(--muted)' }}>{item.section}</div>
                      </div>
                      <ArrowRight size={12} style={{ color: 'var(--muted)', flexShrink: 0 }} />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
