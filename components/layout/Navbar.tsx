'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import { Menu, X, ChevronDown } from 'lucide-react'
import { ThemePicker } from '@/components/ui/ThemePicker'
import { DashboardPanel } from '@/components/ui/DashboardPanel'
import { SearchBar } from '@/components/ui/SearchBar'

type NavChild = { label: string; href: string }
type NavGroup = { group: string; color: string; items: NavChild[] }
type NavItem = {
  label: string
  href?: string
  groups?: NavGroup[]
}

const navItems: NavItem[] = [
  {
    label: 'Learn',
    groups: [
      {
        group: '📚 Foundations',
        color: '#00c2ff',
        items: [
          { label: 'What is Data Engineering?', href: '/learn/what-is-data-engineering' },
          
          { label: 'Roadmap 2026',               href: '/learn/roadmap' },
          { label: 'SQL for Data Engineers',     href: '/learn/foundations/sql' },
          { label: 'PostgreSQL',                 href: '/learn/foundations/postgresql' },
          { label: 'Python for Data Engineers',  href: '/learn/foundations/python' },
        ],
      },
      {
        group: '☁️ Cloud Technologies',
        color: '#7b61ff',
        items: [
          { label: '☁️ Azure Track', href: '/learn/azure/introduction' },
          { label: '🟠 AWS Track',   href: '/learn/aws/introduction' },
          { label: '🔵 GCP Track',   href: '/learn/gcp/introduction' },
        ],
      },
    ],
  },
  { label: 'Projects',   href: '/learn/projects' },
  { label: 'Industry',   href: '/learn/industry' },
  { label: 'Blog',       href: '/blog' },
  { label: 'Dashboard',  href: '/dashboard' },
  { label: 'About',      href: '/about' },
]

export function Navbar() {
  const pathname = usePathname()
  const [mobileOpen, setMobileOpen]     = useState(false)
  const [dropdown, setDropdown]         = useState<string | null>(null)
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null)

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 h-16 flex items-center justify-between px-4 md:px-6"
      style={{
        background: 'rgba(var(--bg-rgb,248,249,252),0.92)',
        backdropFilter: 'blur(20px)',
        borderBottom: '1px solid var(--border)',
      }}
    >
      {/* Logo */}
      <Link
        href="/"
        className="flex items-center gap-1.5 font-display font-extrabold text-xl tracking-tight flex-shrink-0"
        style={{ color: 'var(--text)' }}
      >
        <span
          className="w-2 h-2 rounded-full flex-shrink-0"
          style={{ background: 'var(--accent)', animation: 'pulseDot 2s ease-in-out infinite' }}
        />
        <span style={{ letterSpacing: '-0.01em' }}>
          As<span style={{ color: 'var(--accent)' }}>il</span>
        </span>
      </Link>

      {/* Desktop nav */}
      <ul className="hidden lg:flex items-center gap-0.5 mx-4">
        {navItems.map(item => (
          <li
            key={item.label}
            className="relative"
            onMouseEnter={() => item.groups && setDropdown(item.label)}
            onMouseLeave={() => setDropdown(null)}
          >
            {item.href ? (
              <Link
                href={item.href}
                className="flex items-center gap-1 px-3 py-2 rounded-lg text-sm transition-colors"
                style={{ color: pathname === item.href ? 'var(--accent)' : 'var(--muted)' }}
              >
                {item.label}
              </Link>
            ) : (
              <button
                className="flex items-center gap-1 px-3 py-2 rounded-lg text-sm"
                style={{ color: dropdown === item.label ? 'var(--accent)' : 'var(--muted)' }}
              >
                {item.label} <ChevronDown size={12} />
              </button>
            )}

            {/* Grouped dropdown */}
            {item.groups && dropdown === item.label && (
              <div
                className="absolute top-full left-0 mt-1 rounded-xl p-3 z-50 flex gap-4"
                style={{
                  background: 'var(--surface)',
                  border: '1px solid var(--border)',
                  boxShadow: 'var(--shadow-lg)',
                  minWidth: 480,
                }}
              >
                {item.groups.map(group => (
                  <div key={group.group} className="flex-1 min-w-0">
                    {/* Group header */}
                    <div
                      className="text-xs font-mono font-bold uppercase tracking-widest mb-2 px-2 pb-2"
                      style={{ color: group.color, borderBottom: `1px solid ${group.color}30` }}
                    >
                      {group.group}
                    </div>
                    {/* Group items */}
                    {group.items.map(child => (
                      <Link
                        key={child.href}
                        href={child.href}
                        className="flex items-center px-2 py-1.5 rounded-lg text-sm transition-colors"
                        style={{ color: pathname === child.href ? group.color : 'var(--text2)' }}
                        onMouseEnter={e => (e.currentTarget.style.background = 'var(--bg2)')}
                        onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                ))}
              </div>
            )}
          </li>
        ))}
      </ul>

      {/* Right side */}
      <div className="flex items-center gap-2 flex-shrink-0">
        <SearchBar variant="navbar" />
        <DashboardPanel />
        <ThemePicker />
        <Link href="/learn/roadmap" className="hidden md:flex btn-primary text-sm">
          Start →
        </Link>
        <button className="lg:hidden p-2" onClick={() => setMobileOpen(!mobileOpen)}>
          {mobileOpen
            ? <X size={20} style={{ color: 'var(--text)' }} />
            : <Menu size={20} style={{ color: 'var(--text)' }} />}
        </button>
      </div>

      {/* Mobile nav */}
      {mobileOpen && (
        <div
          className="absolute top-16 left-0 right-0 p-4 lg:hidden z-40 max-h-[80vh] overflow-y-auto"
          style={{ background: 'var(--surface)', borderBottom: '1px solid var(--border)' }}
        >
          {navItems.map(item => (
            <div key={item.label}>
              {item.href ? (
                <Link
                  href={item.href}
                  className="block px-3 py-2.5 text-sm rounded-lg"
                  style={{ color: 'var(--text2)' }}
                  onClick={() => setMobileOpen(false)}
                >
                  {item.label}
                </Link>
              ) : (
                <>
                  {/* Expandable group label */}
                  <button
                    className="w-full flex items-center justify-between px-3 py-2.5 text-sm font-semibold rounded-lg"
                    style={{ color: 'var(--text)' }}
                    onClick={() =>
                      setMobileExpanded(mobileExpanded === item.label ? null : item.label)
                    }
                  >
                    {item.label}
                    <ChevronDown
                      size={14}
                      style={{
                        color: 'var(--muted)',
                        transform: mobileExpanded === item.label ? 'rotate(180deg)' : 'none',
                        transition: 'transform 0.2s',
                      }}
                    />
                  </button>

                  {mobileExpanded === item.label && item.groups?.map(group => (
                    <div key={group.group} className="mb-3">
                      <div
                        className="px-5 py-1.5 text-xs font-mono font-bold uppercase tracking-wider"
                        style={{ color: group.color }}
                      >
                        {group.group}
                      </div>
                      {group.items.map(child => (
                        <Link
                          key={child.href}
                          href={child.href}
                          className="block px-7 py-2 text-sm rounded-lg"
                          style={{ color: 'var(--text2)' }}
                          onClick={() => setMobileOpen(false)}
                        >
                          → {child.label}
                        </Link>
                      ))}
                    </div>
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