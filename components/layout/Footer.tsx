import Link from 'next/link'

const links = {
  Learn: [
    { label: 'What is Data Engineering?', href: '/learn/what-is-data-engineering' },
    { label: 'Roadmap 2025', href: '/learn/roadmap' },
    { label: 'SQL for Data Engineers', href: '/learn/foundations/sql' },
    { label: 'Python for Data Engineers', href: '/learn/foundations/python' },
  ],
  Azure: [
    { label: 'Azure Introduction', href: '/learn/azure/introduction' },
    { label: 'ADLS Gen2', href: '/learn/azure/adls-gen2' },
    { label: 'Azure Data Factory', href: '/learn/azure/adf' },
    { label: 'Azure Databricks', href: '/learn/azure/databricks' },
    { label: 'Azure Synapse', href: '/learn/azure/synapse' },
  ],
  Resources: [
    { label: 'End-to-End Projects', href: '/learn/projects' },
    { label: 'Interview Prep', href: '/learn/interview' },
    { label: 'Microsoft Learn ↗', href: 'https://learn.microsoft.com' },
  ],
}

export function Footer() {
  return (
    <footer className="border-t mt-20" style={{ borderColor: 'var(--border)', background: 'var(--bg2)' }}>
      <div className="max-w-7xl mx-auto px-6 py-14">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          <div>
            <div className="font-display font-extrabold text-xl mb-3" style={{ color: 'var(--text)' }}>
              Veda<span style={{ color: 'var(--accent)' }}>Era</span>
            </div>
            <p className="text-sm leading-relaxed" style={{ color: 'var(--muted)' }}>
              Free, open data engineering and cloud education. Built for the next generation of data engineers.
            </p>
            <p className="text-xs mt-4 font-mono" style={{ color: 'var(--muted)' }}>
              🌱 Built with ❤️ from Andhra Pradesh, India
            </p>
          </div>
          {Object.entries(links).map(([section, items]) => (
            <div key={section}>
              <div className="text-xs font-mono uppercase tracking-widest mb-4" style={{ color: 'var(--muted)' }}>{section}</div>
              <ul className="space-y-2">
                {items.map(item => (
                  <li key={item.href}>
                    <Link href={item.href} className="text-sm transition-colors hover:opacity-100"
                      style={{ color: 'var(--text2)' }}
                      target={item.href.startsWith('http') ? '_blank' : undefined}>
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between pt-8 gap-4"
          style={{ borderTop: '1px solid var(--border)' }}>
          <p className="text-xs font-mono" style={{ color: 'var(--muted)' }}>
            © 2025 VedaEra · 100% Free Forever · No Ads · No Paywalls
          </p>
          <p className="text-xs font-mono" style={{ color: 'var(--muted)' }}>
            Veda (వేద) = Knowledge in Telugu · Era = A new beginning
          </p>
        </div>
      </div>
    </footer>
  )
}
