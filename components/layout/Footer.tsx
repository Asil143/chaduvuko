import Link from 'next/link'
import { BrandLogo } from '@/components/layout/BrandLogo'
import { SCHOOLS } from '@/lib/catalog/schools'

type FooterLink = {
  label: string
  href: string
  external?: boolean
}

const footerSections: { title: string; links: FooterLink[] }[] = [
  {
    title: 'Learn',
    links: [
      { label: 'Career paths', href: '/learn/paths' },
      { label: 'All courses', href: '/learn' },
      { label: 'Find your path', href: '/learn/find-your-path' },
      { label: 'Skill roadmaps', href: '/learn/roadmap' },
      { label: 'Full course catalog', href: '/learn/all-courses' },
    ],
  },
  {
    title: 'Schools',
    links: SCHOOLS.map(school => ({ label: school.short, href: `/learn/schools/${school.slug}` })),
  },
  {
    title: 'Practice',
    links: [
      { label: 'Cloud Data Projects', href: '/learn/projects' },
      { label: 'Code playground', href: '/playground' },
      { label: 'SQL playground', href: '/learn/sql/playground' },
      { label: 'Career prep', href: '/learn/interview' },
      { label: 'Your progress', href: '/dashboard' },
    ],
  },
  {
    title: 'Chaduvuko',
    links: [
      { label: 'About us', href: '/about' },
      { label: 'Careers', href: '/careers' },
      { label: 'Latest updates', href: '/blog' },
      { label: 'Newsletter', href: '/newsletter' },
      { label: 'Contact us', href: 'mailto:hello@chaduvuko.com' },
    ],
  },
]

const socialLinks: FooterLink[] = [
  { label: 'X', href: 'https://x.com/Asil143', external: true },
  { label: 'GitHub', href: 'https://github.com/Asil143', external: true },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/asil-kamepalli-095157197/', external: true },
]

const legalLinks: FooterLink[] = [
  { label: 'Privacy', href: '/privacy' },
  { label: 'Terms', href: '/terms' },
  { label: 'Sitemap', href: '/sitemap.xml' },
]

function FooterAnchor({ link }: { link: FooterLink }) {
  if (link.external) {
    return (
      <a href={link.href} target="_blank" rel="noreferrer" className="footer-link">
        {link.label}
        <span className="footer-external-mark" aria-hidden="true"> ↗</span>
      </a>
    )
  }

  if (link.href.startsWith('mailto:')) {
    return <a href={link.href} className="footer-link">{link.label}</a>
  }

  return <Link href={link.href} className="footer-link">{link.label}</Link>
}

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="site-footer-inner">
        <section className="footer-cta" aria-labelledby="footer-cta-title">
          <div>
            <p className="footer-eyebrow">LEARN. BUILD. GROW.</p>
            <h2 id="footer-cta-title">Build skills for what’s next.</h2>
            <p>Choose a career path, practise with purpose, and turn new skills into real projects.</p>
          </div>
          <div className="footer-cta-actions">
            <Link href="/learn/paths" className="footer-cta-link">
              Choose a career path <span aria-hidden="true">→</span>
            </Link>
            <Link href="/newsletter" className="footer-cta-secondary">
              Get learning updates
            </Link>
          </div>
        </section>

        <div className="footer-main">
          <div className="footer-brand">
            <Link
              href="/"
              aria-label="Chaduvuko home"
              className="footer-logo-link"
            >
              <BrandLogo variant="footer" />
            </Link>
            <p>Free, structured tech learning for the AI era, from foundations to real-world projects and your first role.</p>
          </div>

          {footerSections.map(section => (
            <nav key={section.title} aria-label={section.title} className="footer-section">
              <h2>{section.title}</h2>
              <ul>
                {section.links.map(link => (
                  <li key={link.href}><FooterAnchor link={link} /></li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <div className="footer-bottom">
          <p className="footer-copyright">
            © {new Date().getFullYear()} Chaduvuko. Learn. Build. Grow.
          </p>
          <nav className="footer-legal" aria-label="Legal">
            {legalLinks.map(link => <FooterAnchor key={link.href} link={link} />)}
          </nav>
          <nav className="footer-social" aria-label="Creator profiles">
            {socialLinks.map(link => <FooterAnchor key={link.href} link={link} />)}
          </nav>
        </div>
      </div>
    </footer>
  )
}
