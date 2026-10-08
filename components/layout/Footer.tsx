import Link from 'next/link'

type FooterLink = {
  label: string
  href: string
  external?: boolean
}

const footerSections: Record<string, FooterLink[]> = {
  'Products & Services': [
    { label: 'Learning Dashboard', href: '/dashboard' },
    { label: 'Courses', href: '/learn' },
    { label: 'Playground', href: '/playground' },
    { label: 'Roadmaps', href: '/learn/roadmap' },
    { label: 'Projects', href: '/learn/projects' },
    { label: 'Newsletter', href: '/newsletter' },
  ],
  'About Chaduvuko': [
    { label: 'About', href: '/about' },
    { label: 'Blog', href: '/blog' },
    { label: 'Industry Guide', href: '/learn/industry' },
    { label: 'Interview Prep', href: '/learn/interview' },
    { label: 'Find Videos', href: '/learn/find-video' },
  ],
  'Resources & Legal': [
    { label: 'SQL Cheatsheet', href: '/learn/sql/cheatsheet' },
    { label: 'Data Engineering', href: '/learn/data-engineering' },
    { label: 'Python', href: '/learn/python' },
    { label: 'AI/ML', href: '/learn/ai-ml' },
    { label: 'Sitemap', href: '/sitemap.xml' },
  ],
  'Quick Links': [
    { label: 'SQL', href: '/learn/sql' },
    { label: 'HTML & CSS', href: '/learn/html-css' },
    { label: 'Cybersecurity', href: '/learn/cybersecurity' },
    { label: 'Apache Kafka', href: '/learn/apache-kafka' },
    { label: 'Snowflake', href: '/learn/snowflake' },
    { label: 'DBMS', href: '/learn/dbms' },
  ],
}

function FooterAnchor({ link }: { link: FooterLink }) {
  const style = {
    color: 'var(--muted)',
    textDecoration: 'none',
    transition: 'color 0.2s ease',
  }

  if (link.external) {
    return (
      <a href={link.href} target="_blank" rel="noreferrer" style={style}>
        {link.label}
      </a>
    )
  }

  return (
    <Link href={link.href} style={style}>
      {link.label}
    </Link>
  )
}

export function Footer() {
  return (
    <footer
      style={{
        borderTop: '1px solid var(--border)',
        background: 'var(--bg)',
        color: 'var(--muted)',
      }}
    >
      <div
        style={{
          maxWidth: '1180px',
          margin: '0 auto',
          padding: '36px 28px 28px',
        }}
      >
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
            gap: '28px',
          }}
        >
          {Object.entries(footerSections).map(([title, sectionLinks]) => (
            <nav key={title} aria-label={title}>
              <h2
                style={{
                  margin: '0 0 14px',
                  color: 'var(--text)',
                  fontSize: '13px',
                  fontWeight: 800,
                  letterSpacing: '0',
                }}
              >
                {title}
              </h2>
              <ul
                style={{
                  listStyle: 'none',
                  margin: 0,
                  padding: 0,
                  display: 'grid',
                  gap: '9px',
                  fontSize: '12px',
                  lineHeight: 1.45,
                }}
              >
                {sectionLinks.map(link => (
                  <li key={link.href}>
                    <FooterAnchor link={link} />
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <div
          style={{
            marginTop: '32px',
            paddingTop: '18px',
            borderTop: '1px solid var(--border)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '10px',
            fontSize: '11px',
            lineHeight: 1.5,
          }}
        >
          <span>
            Chaduvuko - built by Asil in California for students who deserve better learning tools.
          </span>
          <span>© 2026 Chaduvuko. No ads. No paywall.</span>
        </div>
      </div>
    </footer>
  )
}
