'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ChevronRight, ChevronLeft, Clock, Calendar, BookOpen, Copy, Check } from 'lucide-react'
import { useState } from 'react'
import { GamifiedProgress } from '@/components/ui/GamifiedProgress'
import { QuizSection } from '@/components/ui/QuizSection'
import { LinkedInGenerator } from '@/components/ui/LinkedInGenerator'
import { SalaryWidget } from '@/components/ui/SalaryWidget'
import { getPrevNext, getPageMeta, NEXT_PAGES } from '@/data/navigation'

const RESUME_BULLETS: Record<string, string[]> = {
  '/learn/what-is-data-engineering': [
    'Designed and implemented batch and streaming data pipelines using the Medallion Architecture (Bronze → Silver → Gold)',
    'Built ETL pipelines processing 5M+ records daily across structured and semi-structured data sources',
    'Applied data quality validation frameworks to detect nulls, duplicates, and schema violations before loading to analytics layers',
  ],
  '/learn/foundations/sql': [
    'Wrote complex analytical SQL using window functions (ROW_NUMBER, RANK, LAG, LEAD, SUM OVER) for business reporting',
    'Optimized slow queries using indexing, partitioning, and query execution plan analysis — reducing runtime by 80%',
    'Built data reconciliation queries using CTEs and correlated subqueries to validate pipeline output accuracy',
  ],
  '/learn/foundations/python': [
    'Developed PySpark data transformation jobs processing 100M+ rows using distributed Spark clusters',
    'Built Python ETL scripts using pandas for data validation, type casting, and null handling in CI/CD pipelines',
    'Implemented automated data quality checks in Python catching 98% of upstream data issues before loading',
  ],
  '/learn/azure/introduction': [
    'Designed and deployed Azure data platform infrastructure including ADLS Gen2, Azure Databricks, ADF, and Synapse Analytics',
    'Architected Medallion Architecture solutions on Azure, partitioning Bronze/Silver/Gold layers in ADLS Gen2 for efficient data access',
    'Pursuing DP-203 Azure Data Engineering certification — proficient in Azure data services and governance patterns',
  ],
  '/learn/azure/adls-gen2': [
    'Architected hierarchical ADLS Gen2 data lake with Bronze/Silver/Gold container structure and date-based partitioning',
    'Configured ADLS Gen2 access control using Azure RBAC and Azure Active Directory service principals',
    'Optimized ADLS Gen2 storage costs using lifecycle management policies, tiering hot/cool/archive based on data age',
  ],
  '/learn/azure/adf': [
    'Built Azure Data Factory pipelines orchestrating Databricks notebook activities with dependency chaining and retry logic',
    'Configured ADF Schedule and Storage Event triggers to automate daily batch pipeline execution at 2am UTC',
    'Implemented ADF pipeline monitoring and alerting using Azure Monitor — achieving 99.5% pipeline success rate',
  ],
  '/learn/azure/databricks': [
    'Built PySpark transformation notebooks in Azure Databricks implementing Bronze-to-Silver and Silver-to-Gold Medallion layers',
    'Implemented Delta Lake tables with ACID transactions, time travel, and MERGE upserts for production data pipelines',
    'Optimized Databricks cluster costs by configuring auto-termination and job clusters — reducing compute spend by 60%',
  ],
  '/learn/azure/synapse': [
    'Created Azure Synapse external tables over Delta Lake Gold layer enabling SQL-based analytics without data movement',
    'Wrote Synapse SQL analytical queries using window functions and CTEs for business intelligence reporting',
    'Integrated Azure Synapse Analytics with Power BI for executive dashboards refreshed daily from pipeline output',
  ],
  '/learn/aws/introduction': [
    'Designed AWS data lake architecture using Amazon S3 (storage), AWS Glue (transformation), and Redshift (warehousing)',
    'Migrated on-premises ETL workflows to AWS serverless architecture — reducing infrastructure costs by 70%',
    'Configured AWS IAM roles and policies for least-privilege access to S3, Glue, and Redshift data resources',
  ],
  '/learn/gcp/bigquery': [
    'Designed Google BigQuery tables with date partitioning and clustering — reducing query costs by 85% on billion-row datasets',
    'Built BigQuery Python pipelines loading Parquet files from GCS with schema auto-detection and time partitioning',
    'Wrote BigQuery SQL analytical queries using ARRAY_AGG, STRUCT, and window functions for complex business reporting',
  ],
  '/learn/gcp/composer': [
    'Authored Apache Airflow DAGs in Cloud Composer orchestrating multi-step GCP data pipelines with retry logic and alerting',
    'Implemented parameterized Airflow DAGs using Jinja template variables for dynamic date-based pipeline execution',
    'Configured Airflow SLA monitoring and email alerting for business-critical daily pipeline runs',
  ],
  '/learn/projects/azure-batch-pipeline': [
    'Built end-to-end Medallion Architecture batch pipeline on Azure: ADLS Gen2 → Databricks PySpark → Synapse Analytics',
    'Implemented data quality framework validating 5,000 daily records — removing nulls, duplicates, and invalid values in Silver layer',
    'Orchestrated multi-step Azure Data Factory pipeline with chained Databricks Notebook activities on daily schedule trigger',
  ],
}

const sidebar = [
  { label: 'Foundations', color: '#00c2ff', items: [
    { label: 'What is Data Engineering?', href: '/learn/what-is-data-engineering' },
    { label: 'Roadmap 2025', href: '/learn/roadmap' },
    { label: 'SQL for Data Engineers', href: '/learn/foundations/sql' },
    { label: 'Python for Data Engineers', href: '/learn/foundations/python' },
  ]},
  { label: 'Azure Track', color: '#0078d4', items: [
    { label: 'Azure Introduction', href: '/learn/azure/introduction' },
    { label: 'ADLS Gen2', href: '/learn/azure/adls-gen2' },
    { label: 'Azure Data Factory', href: '/learn/azure/adf' },
    { label: 'Azure Databricks', href: '/learn/azure/databricks' },
    { label: 'Azure Synapse', href: '/learn/azure/synapse' },
  ]},
  { label: 'AWS Track', color: '#ff9900', items: [
    { label: 'AWS Introduction', href: '/learn/aws/introduction' },
    { label: 'Amazon S3', href: '/learn/aws/s3' },
    { label: 'AWS Glue', href: '/learn/aws/glue' },
    { label: 'Amazon Redshift', href: '/learn/aws/redshift' },
    { label: 'Amazon Kinesis', href: '/learn/aws/kinesis' },
  ]},
  { label: 'GCP Track', color: '#4285f4', items: [
    { label: 'GCP Introduction', href: '/learn/gcp/introduction' },
    { label: 'Google BigQuery', href: '/learn/gcp/bigquery' },
    { label: 'Cloud Dataflow', href: '/learn/gcp/dataflow' },
    { label: 'Cloud Pub/Sub', href: '/learn/gcp/pubsub' },
    { label: 'Cloud Composer', href: '/learn/gcp/composer' },
  ]},
  { label: 'Projects', color: '#00e676', items: [
    { label: 'All Projects', href: '/learn/projects' },
    { label: 'Project 1: Azure Pipeline', href: '/learn/projects/azure-batch-pipeline' },
  ]},
  { label: 'Interview Prep', color: '#ff6b6b', items: [
    { label: 'Interview Questions', href: '/learn/interview' },
  ]},
  { label: 'Industry', color: '#f5c542', items: [
    { label: 'Top Companies Hiring', href: '/learn/industry' },
  ]},
]

const difficultyColors = {
  Beginner:     { bg: 'rgba(0,194,255,0.1)',   color: '#00c2ff', border: 'rgba(0,194,255,0.2)' },
  Intermediate: { bg: 'rgba(245,197,66,0.1)',  color: '#f5c542', border: 'rgba(245,197,66,0.2)' },
  Advanced:     { bg: 'rgba(255,107,107,0.1)', color: '#ff6b6b', border: 'rgba(255,107,107,0.2)' },
}

function ResumeBullets({ href }: { href: string }) {
  const bullets = RESUME_BULLETS[href]
  const [copied, setCopied] = useState<number | null>(null)
  if (!bullets) return null

  function copyBullet(text: string, idx: number) {
    navigator.clipboard.writeText('• ' + text)
    setCopied(idx)
    setTimeout(() => setCopied(null), 2000)
  }

  function copyAll() {
    navigator.clipboard.writeText(bullets.map(b => '• ' + b).join('\n'))
    setCopied(-1)
    setTimeout(() => setCopied(null), 2000)
  }

  return (
    <div className="mt-10 rounded-2xl overflow-hidden" style={{ border: '1px solid rgba(245,197,66,0.3)', background: 'rgba(245,197,66,0.03)' }}>
      <div className="flex items-center justify-between px-5 py-4"
        style={{ borderBottom: '1px solid rgba(245,197,66,0.2)' }}>
        <div>
          <div className="font-display font-semibold text-sm" style={{ color: 'var(--text)' }}>
            📄 Resume Bullet Points
          </div>
          <div className="text-xs font-mono mt-0.5" style={{ color: 'var(--muted)' }}>
            Copy these directly to your resume — tailored from this lesson
          </div>
        </div>
        <button onClick={copyAll}
          className="flex items-center gap-1.5 text-xs font-mono px-3 py-1.5 rounded-lg"
          style={{ background: 'rgba(245,197,66,0.1)', color: '#f5c542', border: '1px solid rgba(245,197,66,0.2)' }}>
          {copied === -1 ? <><Check size={11} /> Copied all!</> : <><Copy size={11} /> Copy all</>}
        </button>
      </div>
      <div className="p-4 space-y-2">
        {bullets.map((bullet, i) => (
          <div key={i} className="flex items-start gap-3 p-3 rounded-xl group"
            style={{ background: 'var(--bg)', border: '1px solid var(--border)' }}>
            <span className="text-sm mt-0.5 flex-shrink-0" style={{ color: '#f5c542' }}>•</span>
            <p className="flex-1 text-sm leading-relaxed" style={{ color: 'var(--text2)', fontFamily: 'Lora, serif' }}>
              {bullet}
            </p>
            <button onClick={() => copyBullet(bullet, i)}
              className="flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity p-1 rounded"
              style={{ color: 'var(--muted)' }}>
              {copied === i ? <Check size={12} style={{ color: '#f5c542' }} /> : <Copy size={12} />}
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}

interface Props {
  children: React.ReactNode
  title: string
  description: string
  section: string
  readTime?: string
  updatedAt?: string
  breadcrumbs?: { label: string; href: string }[]
  showSalary?: boolean
}

export function LearnLayout({ children, title, description, section, readTime, updatedAt, breadcrumbs, showSalary }: Props) {
  const pathname = usePathname()
  const { prev, next } = getPrevNext(pathname)
  const meta = getPageMeta(pathname)
  const suggestedNext = NEXT_PAGES[pathname] || (next ? [next] : [])
  const diff = meta?.difficulty
  const diffStyle = diff ? difficultyColors[diff] : null

  return (
    <div className="pt-16 min-h-screen" style={{ background: 'var(--bg)' }}>
      <div className="border-b" style={{ borderColor: 'var(--border)', background: 'var(--bg2)' }}>
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-8">
          {breadcrumbs && (
            <nav className="flex items-center gap-1.5 text-xs font-mono mb-4" style={{ color: 'var(--muted)' }}>
              <Link href="/" style={{ color: 'var(--accent)' }}>Home</Link>
              {breadcrumbs.map(bc => (
                <span key={bc.href} className="flex items-center gap-1.5">
                  <ChevronRight size={10} />
                  <Link href={bc.href} className="hover:underline"
                    style={{ color: bc.href === pathname ? 'var(--text)' : 'var(--accent)' }}>{bc.label}</Link>
                </span>
              ))}
            </nav>
          )}
          <div className="flex items-center gap-3 flex-wrap mb-2">
            <span className="section-tag">{section}</span>
            {diff && diffStyle && (
              <span className="text-xs font-mono px-2.5 py-1 rounded-full"
                style={{ background: diffStyle.bg, color: diffStyle.color, border: `1px solid ${diffStyle.border}` }}>
                {diff}
              </span>
            )}
            {meta && (
              <span className="text-xs font-mono px-2.5 py-1 rounded-full"
                style={{ background: 'rgba(0,230,118,0.1)', color: 'var(--green)', border: '1px solid rgba(0,230,118,0.2)' }}>
                +{meta.xp} XP
              </span>
            )}
          </div>
          <h1 className="font-display font-extrabold leading-tight tracking-tight mt-1 mb-3"
            style={{ fontSize: 'clamp(1.8rem,4vw,2.8rem)', color: 'var(--text)' }}>{title}</h1>
          <p className="text-base max-w-2xl leading-relaxed"
            style={{ color: 'var(--muted)', fontFamily: 'Lora, serif', fontStyle: 'italic' }}>{description}</p>
          <div className="flex items-center gap-4 mt-4 text-xs font-mono" style={{ color: 'var(--muted)' }}>
            {readTime  && <span className="flex items-center gap-1"><Clock size={11} /> {readTime}</span>}
            {updatedAt && <span className="flex items-center gap-1"><Calendar size={11} /> {updatedAt}</span>}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-6 py-10">
        <div className="flex gap-10">
          <aside className="hidden lg:block w-64 flex-shrink-0">
            <div className="sticky top-24 space-y-5 max-h-[calc(100vh-7rem)] overflow-y-auto pr-2">
              <GamifiedProgress />
              {sidebar.map(group => (
                <div key={group.label}>
                  <div className="text-xs font-mono uppercase tracking-widest mb-2 px-2" style={{ color: 'var(--muted)' }}>
                    {group.label}
                  </div>
                  <ul className="space-y-0.5">
                    {group.items.map(item => (
                      <li key={item.href}>
                        <Link href={item.href}
                          className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-all"
                          style={{
                            color: pathname === item.href ? group.color : 'var(--text2)',
                            background: pathname === item.href ? `${group.color}12` : 'transparent',
                            fontWeight: pathname === item.href ? 500 : 400,
                          }}>
                          {pathname === item.href && <ChevronRight size={11} style={{ color: group.color, flexShrink: 0 }} />}
                          {item.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </aside>

          <main className="flex-1 min-w-0 max-w-3xl">
            <div className="prose-vedalera">{children}</div>

            {/* Salary widget — shown on intro pages */}
            {showSalary && (
              <div className="mt-12">
                <SalaryWidget />
              </div>
            )}

            {/* Resume bullets */}
            <ResumeBullets href={pathname} />

            {/* Quiz */}
            <QuizSection pageHref={pathname} />

            {/* LinkedIn share */}
            <LinkedInGenerator pageHref={pathname} />

            {/* What to learn next */}
            {suggestedNext.length > 0 && (
              <div className="mt-10">
                <div className="text-xs font-mono uppercase tracking-widest mb-4" style={{ color: 'var(--muted)' }}>
                  What to learn next
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {suggestedNext.slice(0, 2).map(page => (
                    <Link key={page.href} href={page.href}
                      className="flex items-center gap-3 p-4 rounded-xl group transition-all"
                      style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}
                      onMouseEnter={e => (e.currentTarget.style.borderColor = page.color)}
                      onMouseLeave={e => (e.currentTarget.style.borderColor = 'var(--border)')}>
                      <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                        style={{ background: `${page.color}12` }}>
                        <BookOpen size={14} style={{ color: page.color }} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-display font-semibold truncate" style={{ color: 'var(--text)' }}>{page.title}</div>
                        <div className="text-xs font-mono mt-0.5" style={{ color: 'var(--muted)' }}>
                          {page.section} · {page.readTime} · +{page.xp} XP
                        </div>
                      </div>
                      <ChevronRight size={14} className="flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity"
                        style={{ color: page.color }} />
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* Prev / Next */}
            <div className="flex items-stretch gap-3 mt-10 pt-8" style={{ borderTop: '1px solid var(--border)' }}>
              {prev ? (
                <Link href={prev.href}
                  className="flex-1 flex items-center gap-3 p-4 rounded-xl group transition-all"
                  style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}
                  onMouseEnter={e => (e.currentTarget.style.borderColor = prev.color)}
                  onMouseLeave={e => (e.currentTarget.style.borderColor = 'var(--border)')}>
                  <ChevronLeft size={18} style={{ color: prev.color, flexShrink: 0 }} />
                  <div className="min-w-0">
                    <div className="text-xs font-mono mb-0.5" style={{ color: 'var(--muted)' }}>Previous</div>
                    <div className="text-sm font-display font-semibold truncate" style={{ color: 'var(--text)' }}>{prev.title}</div>
                    <div className="text-xs font-mono" style={{ color: 'var(--muted)' }}>{prev.section}</div>
                  </div>
                </Link>
              ) : <div className="flex-1" />}

              {next ? (
                <Link href={next.href}
                  className="flex-1 flex items-center gap-3 p-4 rounded-xl text-right justify-end group transition-all"
                  style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}
                  onMouseEnter={e => (e.currentTarget.style.borderColor = next.color)}
                  onMouseLeave={e => (e.currentTarget.style.borderColor = 'var(--border)')}>
                  <div className="min-w-0">
                    <div className="text-xs font-mono mb-0.5" style={{ color: 'var(--muted)' }}>Next</div>
                    <div className="text-sm font-display font-semibold truncate" style={{ color: 'var(--text)' }}>{next.title}</div>
                    <div className="text-xs font-mono" style={{ color: 'var(--muted)' }}>{next.section}</div>
                  </div>
                  <ChevronRight size={18} style={{ color: next.color, flexShrink: 0 }} />
                </Link>
              ) : <div className="flex-1" />}
            </div>
          </main>
        </div>
      </div>
    </div>
  )
}
