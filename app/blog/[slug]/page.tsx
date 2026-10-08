import Link from 'next/link'
import { ChevronLeft, Clock, Calendar, ArrowRight } from 'lucide-react'
import { notFound } from 'next/navigation'
import { PageViews } from '@/components/ui/PageViews'
import { BLOG_ARTICLES as ARTICLES } from '@/data/blog-articles'


export async function generateStaticParams() {
  return Object.keys(ARTICLES).map(slug => ({ slug }))
}

const tagColors: Record<string, string> = {
  'Architecture': '#7b61ff', 'Data Lake': '#00c2ff', 'Azure': '#0078d4',
  'AWS': '#ff9900', 'GCP': '#4285f4', 'Delta Lake': '#ff6b6b',
  'Apache Iceberg': '#00c2ff', 'Open Table Format': '#00e676',
  'Career': '#f5c542', 'Resume': '#f5c542', 'H1B': '#f5c542',
  'ADF': '#0078d4', 'Airflow': '#00e676', 'Orchestration': '#7b61ff',
  'Microsoft Fabric': '#0078d4', 'Batch': '#00c2ff', 'Streaming': '#00e676',
}

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const article = ARTICLES[params.slug]
  if (!article) notFound()

  return (
    <div className="pt-16 min-h-screen" style={{ background: 'var(--bg)' }}>
      <div className="border-b py-12 px-4" style={{ borderColor: 'var(--border)', background: 'var(--bg2)' }}>
        <div className="max-w-3xl mx-auto">
          <Link href="/blog" className="flex items-center gap-1.5 text-xs font-mono mb-6 hover:underline"
            style={{ color: 'var(--accent)' }}>
            <ChevronLeft size={12} /> Back to Blog
          </Link>
          <div className="flex flex-wrap gap-1.5 mb-4">
            {article.tags.map(tag => (
              <span key={tag} className="text-xs font-mono px-2 py-0.5 rounded"
                style={{ background: `${tagColors[tag] || '#00c2ff'}15`, color: tagColors[tag] || '#00c2ff' }}>
                {tag}
              </span>
            ))}
          </div>
          <h1 className="font-display font-extrabold leading-tight tracking-tight mb-4"
            style={{ fontSize: 'clamp(1.75rem,4vw,2.75rem)', color: 'var(--text)' }}>
            {article.title}
          </h1>
          <div className="flex items-center gap-4 text-xs font-mono flex-wrap" style={{ color: 'var(--muted)' }}>
            <span className="flex items-center gap-1"><Calendar size={10} /> {article.date}</span>
            <span className="flex items-center gap-1"><Clock size={10} /> {article.readTime}</span>
            <span className="flex items-center gap-1">
              ✍️ by{' '}
              <span style={{
                background: 'linear-gradient(135deg, #F59E0B, #FCD34D)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                fontWeight: 700,
              }}>Asil</span>
            </span>
            <PageViews slug={'/blog/' + params.slug} />
          </div>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 py-12">
        <p className="text-lg leading-relaxed mb-10"
          style={{ color: 'var(--text2)', fontFamily: 'Lora, serif', fontStyle: 'italic', borderLeft: '3px solid var(--accent)', paddingLeft: '1.25rem' }}>
          {article.intro}
        </p>

        <div className="space-y-10">
          {article.sections.map((section, i) => (
            <section key={i}>
              <h2 className="font-display font-bold text-xl mb-4" style={{ color: 'var(--text)' }}>
                {section.heading}
              </h2>
              <div className="space-y-3">
                {section.body.split(/\\n\\n|\\n|\n\n|\n/).filter(p => p.trim()).map((para, j) => (
                  <p key={j} className="text-base leading-relaxed"
                    style={{ color: 'var(--text2)', fontFamily: 'Lora, serif', whiteSpace: 'pre-line' }}>
                    {para}
                  </p>
                ))}
              </div>
            </section>
          ))}
        </div>

        <div className="mt-14 rounded-2xl p-8 text-center"
          style={{ background: 'var(--accent-glow)', border: '1px solid rgba(0,120,212,0.15)' }}>
          <h2 className="font-display font-bold text-xl mb-3" style={{ color: 'var(--text)' }}>Ready to apply this?</h2>
          <Link href={article.cta.href} className="btn-primary">
            {article.cta.label} <ArrowRight size={14} />
          </Link>
        </div>

        <div className="mt-10 pt-8 text-center" style={{ borderTop: '1px solid var(--border)' }}>
          <Link href="/blog" className="btn-secondary"><ChevronLeft size={14} /> Back to all articles</Link>
        </div>
      </div>
    </div>
  )
}