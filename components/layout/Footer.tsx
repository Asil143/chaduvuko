import Link from 'next/link'
import { BrandLogo } from '@/components/layout/BrandLogo'

type FooterLink = {
  label: string
  href: string
  external?: boolean
}

const footerSections: { title: string; links: FooterLink[] }[] = [
  {
    title: 'Learning paths',
    links: [
      { label: 'Explore all learning', href: '/learn' },
      { label: 'Data Engineering', href: '/learn/data-engineering' },
      { label: 'Python', href: '/learn/python' },
      { label: 'AI & Machine Learning', href: '/learn/ai-ml' },
      { label: 'Cybersecurity', href: '/learn/cybersecurity' },
      { label: 'AWS', href: '/learn/aws/introduction' },
      { label: 'Azure', href: '/learn/azure/introduction' },
      { label: 'Google Cloud', href: '/learn/gcp/introduction' },
    ],
  },
  {
    title: 'Practice & grow',
    links: [
      { label: 'Roadmaps', href: '/learn/roadmap' },
      { label: 'Hands-on projects', href: '/learn/projects' },
      { label: 'SQL practice', href: '/learn/sql/playground' },
      { label: 'Interview preparation', href: '/learn/interview' },
      { label: 'Learning dashboard', href: '/dashboard' },
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
            <p>Choose a learning path, practise with purpose, and turn new skills into real projects.</p>
          </div>
          <div className="footer-cta-actions">
            <Link href="/learn" className="footer-cta-link">
              Explore learning paths <span aria-hidden="true">→</span>
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
            <p>Structured, practical IT learning that takes you from the foundations to real-world projects.</p>
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
