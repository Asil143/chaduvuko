'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ChevronRight, Clock, Calendar } from 'lucide-react'
import { ProgressTracker } from '@/components/ui/ProgressTracker'

const sidebar = [
  {
    label: 'Foundations', color: '#00c2ff',
    items: [
      { label: 'What is Data Engineering?', href: '/learn/what-is-data-engineering' },
      { label: 'Roadmap 2025', href: '/learn/roadmap' },
      { label: 'SQL for Data Engineers', href: '/learn/foundations/sql' },
      { label: 'Python for Data Engineers', href: '/learn/foundations/python' },
    ]
  },
  {
    label: 'Azure Track', color: '#0078d4',
    items: [
      { label: 'Azure Introduction', href: '/learn/azure/introduction' },
      { label: 'ADLS Gen2', href: '/learn/azure/adls-gen2' },
      { label: 'Azure Data Factory', href: '/learn/azure/adf' },
      { label: 'Azure Databricks', href: '/learn/azure/databricks' },
      { label: 'Azure Synapse', href: '/learn/azure/synapse' },
    ]
  },
  {
    label: 'AWS Track', color: '#ff9900',
    items: [
      { label: 'AWS Introduction', href: '/learn/aws/introduction' },
      { label: 'Amazon S3', href: '/learn/aws/s3' },
      { label: 'AWS Glue', href: '/learn/aws/glue' },
      { label: 'Amazon Redshift', href: '/learn/aws/redshift' },
      { label: 'Amazon Kinesis', href: '/learn/aws/kinesis' },
    ]
  },
  {
    label: 'Projects', color: '#00e676',
    items: [{ label: 'All Projects', href: '/learn/projects' }]
  },
  {
    label: 'Interview Prep', color: '#ff6b6b',
    items: [{ label: 'Interview Questions', href: '/learn/interview' }]
  },
]

interface Props {
  children: React.ReactNode
  title: string
  description: string
  section: string
  readTime?: string
  updatedAt?: string
  breadcrumbs?: { label: string; href: string }[]
}

export function LearnLayout({ children, title, description, section, readTime, updatedAt, breadcrumbs }: Props) {
  const pathname = usePathname()

  return (
    <div className="pt-16 min-h-screen" style={{ background: 'var(--bg)' }}>

      {/* Page header */}
      <div className="border-b" style={{ borderColor: 'var(--border)', background: 'var(--bg2)' }}>
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-8">
          {breadcrumbs && (
            <nav className="flex items-center gap-1.5 text-xs font-mono mb-4" style={{ color: 'var(--muted)' }}>
              <Link href="/" style={{ color: 'var(--accent)' }}>Home</Link>
              {breadcrumbs.map(bc => (
                <span key={bc.href} className="flex items-center gap-1.5">
                  <ChevronRight size={10} />
                  <Link href={bc.href} className="hover:underline"
                    style={{ color: bc.href === pathname ? 'var(--text)' : 'var(--accent)' }}>
                    {bc.label}
                  </Link>
                </span>
              ))}
            </nav>
          )}
          <span className="section-tag">{section}</span>
          <h1 className="font-display font-extrabold leading-tight tracking-tight mt-1 mb-3"
            style={{ fontSize: 'clamp(1.8rem, 4vw, 2.8rem)', color: 'var(--text)' }}>{title}</h1>
          <p className="text-base max-w-2xl leading-relaxed"
            style={{ color: 'var(--muted)', fontFamily: 'Lora, serif', fontStyle: 'italic' }}>
            {description}
          </p>
          <div className="flex items-center gap-4 mt-4 text-xs font-mono" style={{ color: 'var(--muted)' }}>
            {readTime && <span className="flex items-center gap-1"><Clock size={11} /> {readTime}</span>}
            {updatedAt && <span className="flex items-center gap-1"><Calendar size={11} /> {updatedAt}</span>}
          </div>
        </div>
      </div>

      {/* Content area */}
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-10">
        <div className="flex gap-10">

          {/* Left sidebar */}
          <aside className="hidden lg:block w-64 flex-shrink-0">
            <div className="sticky top-24 space-y-5">

              {/* Progress Tracker */}
              <ProgressTracker />

              {/* Navigation */}
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

          {/* Main content */}
          <main className="flex-1 min-w-0 max-w-3xl prose-vedalera">
            {children}
          </main>

        </div>
      </div>
    </div>
  )
}
