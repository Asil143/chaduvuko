import Link from 'next/link'

type FooterLink = {
  label: string
  href: string
  external?: boolean
}

const footerSections: Record<string, FooterLink[]> = {
  Learn: [
    { label: 'What Is Chaduvuko?', href: '/about' },
    { label: 'What Is Data Engineering?', href: '/learn/what-is-data-engineering' },
    { label: 'What Is Cloud Computing?', href: '/learn/aws/introduction' },
    { label: 'AI/ML Learning Hub', href: '/learn/ai-ml' },
    { label: 'Cybersecurity Learning Hub', href: '/learn/cybersecurity' },
    { label: 'What\'s New', href: '/blog' },
    { label: 'Careers', href: '/careers' },
  ],
  Resources: [
    { label: 'Getting Started', href: '/learn' },
    { label: 'Learning Dashboard', href: '/dashboard' },
    { label: 'Roadmaps', href: '/learn/roadmap' },
    { label: 'Projects Library', href: '/learn/projects' },
    { label: 'SQL Cheatsheet', href: '/learn/sql/cheatsheet' },
    { label: 'Interview Prep', href: '/learn/interview' },
    { label: 'Industry Guide', href: '/learn/industry' },
    { label: 'Newsletter', href: '/newsletter' },
  ],
  Developers: [
    { label: 'Builder Playground', href: '/playground' },
    { label: 'SQL Playground', href: '/learn/sql/playground' },
    { label: 'Python Track', href: '/learn/python' },
    { label: 'Java Track', href: '/learn/roadmap/java-developer' },
    { label: 'HTML & CSS Track', href: '/learn/html-css' },
    { label: 'DSA Track', href: '/learn/dsa' },
    { label: 'DBMS Track', href: '/learn/dbms' },
  ],
  Help: [
    { label: 'Contact', href: 'mailto:hello@chaduvuko.com', external: true },
    { label: 'Find a Video', href: '/learn/find-video' },
    { label: 'AWS Track', href: '/learn/aws/introduction' },
    { label: 'Azure Track', href: '/learn/azure/introduction' },
    { label: 'GCP Track', href: '/learn/gcp/introduction' },
    { label: 'Sitemap', href: '/sitemap.xml' },
  ],
}

const socialLinks: FooterLink[] = [
  { label: 'X', href: 'https://x.com/Asil143', external: true },
  { label: 'GitHub', href: 'https://github.com/Asil143', external: true },
  { label: 'LinkedIn', href: 'https://www.linkedin.com', external: true },
]

const legalLinks: FooterLink[] = [
  { label: 'Privacy', href: '/privacy' },
  { label: 'Site terms', href: '/terms' },
  { label: 'Cookie Preferences', href: '/privacy' },
]

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
            gridTemplateColumns: 'repeat(auto-fit, minmax(190px, 1fr))',
            gap: '32px',
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
            marginTop: '34px',
            padding: '18px 0',
            borderTop: '1px solid var(--border)',
            borderBottom: '1px solid var(--border)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '14px',
            fontSize: '12px',
          }}
        >
          <a href="#top" style={{ color: 'var(--text)', fontWeight: 700, textDecoration: 'none' }}>
            Back to top
          </a>
          <div style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
            <span style={{ color: 'var(--text)', fontWeight: 700 }}>English</span>
            {socialLinks.map(link => (
              <FooterAnchor key={link.href} link={link} />
            ))}
          </div>
        </div>

        <p
          style={{
            margin: '20px 0 0',
            maxWidth: '820px',
            fontSize: '11px',
            lineHeight: 1.55,
          }}
        >
          Chaduvuko is building free, practical IT education for learners and career switchers. As
          we grow, we welcome builders, teachers, writers, and engineers who care about making high
          quality learning accessible.
        </p>

        <div
          style={{
            marginTop: '18px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '10px',
            fontSize: '11px',
            lineHeight: 1.5,
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: '14px' }}>
            {legalLinks.map(link => (
              <FooterAnchor key={link.href} link={link} />
            ))}
          </div>
          <span>© 2026 Chaduvuko. Built by Asil. All rights reserved.</span>
        </div>
      </div>
    </footer>
  )
}
