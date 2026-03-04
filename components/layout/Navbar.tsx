'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import { Menu, X, ChevronDown } from 'lucide-react'
import { ThemePicker } from '@/components/ui/ThemePicker'
import { DashboardPanel } from '@/components/ui/DashboardPanel'
import { SearchBar } from '@/components/ui/SearchBar'

const navItems = [
  { label: 'Roadmap', href: '/learn/roadmap' },
  { label: 'Learn', children: [
    { label: 'What is Data Engineering?', href: '/learn/what-is-data-engineering' },
    { label: 'Roadmap 2025', href: '/learn/roadmap' },
    { label: 'SQL for Data Engineers', href: '/learn/foundations/sql' },
    { label: 'Python for Data Engineers', href: '/learn/foundations/python' },
  ]},
  { label: 'Azure', children: [
    { label: 'Azure Introduction', href: '/learn/azure/introduction' },
    { label: 'ADLS Gen2', href: '/learn/azure/adls-gen2' },
    { label: 'Azure Data Factory', href: '/learn/azure/adf' },
    { label: 'Azure Databricks', href: '/learn/azure/databricks' },
    { label: 'Azure Synapse', href: '/learn/azure/synapse' },
  ]},
  { label: 'AWS', children: [
    { label: 'AWS Introduction', href: '/learn/aws/introduction' },
    { label: 'Amazon S3', href: '/learn/aws/s3' },
    { label: 'AWS Glue', href: '/learn/aws/glue' },
    { label: 'Amazon Redshift', href: '/learn/aws/redshift' },
    { label: 'Amazon Kinesis', href: '/learn/aws/kinesis' },
  ]},
  { label: 'GCP', children: [
    { label: 'GCP Introduction', href: '/learn/gcp/introduction' },
    { label: 'Google BigQuery', href: '/learn/gcp/bigquery' },
    { label: 'Cloud Dataflow', href: '/learn/gcp/dataflow' },
    { label: 'Cloud Pub/Sub', href: '/learn/gcp/pubsub' },
    { label: 'Cloud Composer', href: '/learn/gcp/composer' },
  ]},
  { label: 'Projects', href: '/learn/projects' },
  { label: 'Industry', href: '/learn/industry' },
  { label: 'Blog', href: '/blog' },
  { label: 'Dashboard', href: '/dashboard' },
]

export function Navbar() {
  const pathname = usePathname()
  const [mobileOpen, setMobileOpen] = useState(false)
  const [dropdown, setDropdown] = useState<string | null>(null)

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 h-16 flex items-center justify-between px-4 md:px-6"
      style={{ background: 'rgba(var(--bg-rgb,248,249,252),0.92)', backdropFilter: 'blur(20px)', borderBottom: '1px solid var(--border)' }}>

      <Link href="/" className="flex items-center gap-1.5 font-display font-extrabold text-xl tracking-tight flex-shrink-0"
        style={{ color: 'var(--text)' }}>
        <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: 'var(--accent)', animation: 'pulseDot 2s ease-in-out infinite' }} />
        <span style={{ letterSpacing: '-0.01em' }}>As<span style={{ color: 'var(--accent)' }}>il</span></span>
      </Link>

      <ul className="hidden lg:flex items-center gap-0.5 mx-4">
        {navItems.map(item => (
          <li key={item.label} className="relative"
            onMouseEnter={() => item.children && setDropdown(item.label)}
            onMouseLeave={() => setDropdown(null)}>
            {item.href ? (
              <Link href={item.href} className="flex items-center gap-1 px-3 py-2 rounded-lg text-sm"
                style={{ color: pathname === item.href ? 'var(--accent)' : 'var(--muted)' }}>
                {item.label}
              </Link>
            ) : (
              <button className="flex items-center gap-1 px-3 py-2 rounded-lg text-sm" style={{ color: 'var(--muted)' }}>
                {item.label} <ChevronDown size={12} />
              </button>
            )}
            {item.children && dropdown === item.label && (
              <div className="absolute top-full left-0 mt-1 w-56 rounded-xl p-1.5 z-50"
                style={{ background: 'var(--surface)', border: '1px solid var(--border)', boxShadow: 'var(--shadow-lg)' }}>
                {item.children.map(child => (
                  <Link key={child.href} href={child.href}
                    className="flex items-center px-3 py-2 rounded-lg text-sm"
                    style={{ color: pathname === child.href ? 'var(--accent)' : 'var(--text2)' }}
                    onMouseEnter={e => (e.currentTarget.style.background = 'var(--bg2)')}
                    onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}>
                    {child.label}
                  </Link>
                ))}
              </div>
            )}
          </li>
        ))}
      </ul>

      <div className="flex items-center gap-2 flex-shrink-0">
        <SearchBar variant="navbar" />
        <DashboardPanel />
        <ThemePicker />
        <Link href="/learn/roadmap" className="hidden md:flex btn-primary text-sm">Start →</Link>
        <button className="lg:hidden p-2" onClick={() => setMobileOpen(!mobileOpen)}>
          {mobileOpen ? <X size={20} style={{ color: 'var(--text)' }} /> : <Menu size={20} style={{ color: 'var(--text)' }} />}
        </button>
      </div>

      {mobileOpen && (
        <div className="absolute top-16 left-0 right-0 p-4 lg:hidden z-40 max-h-[80vh] overflow-y-auto"
          style={{ background: 'var(--surface)', borderBottom: '1px solid var(--border)' }}>
          {navItems.map(item => (
            <div key={item.label}>
              {item.href ? (
                <Link href={item.href} className="block px-3 py-2.5 text-sm rounded-lg"
                  style={{ color: 'var(--text2)' }} onClick={() => setMobileOpen(false)}>{item.label}</Link>
              ) : (
                <>
                  <div className="px-3 py-2 text-xs font-mono uppercase tracking-wider" style={{ color: 'var(--muted)' }}>{item.label}</div>
                  {item.children?.map(child => (
                    <Link key={child.href} href={child.href} className="block px-5 py-2 text-sm rounded-lg"
                      style={{ color: 'var(--text2)' }} onClick={() => setMobileOpen(false)}>
                      → {child.label}
                    </Link>
                  ))}
                </>
              )}
            </div>
          ))}
        </div>
      )}
    </nav>
  )
}