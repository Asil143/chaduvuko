import Link from 'next/link'
import { ArrowRight, Clock, Calendar } from 'lucide-react'
import { BLOG_ARTICLES } from '@/data/blog-articles'

export const metadata = { title: 'Blog — Asil' }

const posts = Object.entries(BLOG_ARTICLES)
  .map(([slug, article]) => ({ slug, ...article }))
  .sort((a, b) => a.indexOrder - b.indexOrder)

const tagColors: Record<string, string> = {
  'Architecture': '#7b61ff', 'Data Lake': '#00c2ff', 'Azure': '#0078d4',
  'AWS': '#ff9900', 'GCP': '#4285f4', 'Delta Lake': '#ff6b6b',
  'Storage': '#00c2ff', 'Foundations': '#00c2ff', 'Streaming': '#00e676',
  'Career': '#f5c542', 'Resume': '#f5c542', 'H1B': '#00e676',
  'ADF': '#0078d4', 'Orchestration': '#7b61ff', 'Interview': '#ff6b6b',
  'Microsoft Fabric': '#0078d4', 'Batch': '#00c2ff', 'Apache Spark': '#ff6b6b',
  'BigQuery': '#4285f4', 'Security': '#ff6b6b', 'Open Table Format': '#00e676',
}

export default function BlogPage() {
  const featured = posts
    .filter(p => p.featuredRank !== undefined)
    .sort((a, b) => a.featuredRank! - b.featuredRank!)
  const rest = posts.filter(p => p.featuredRank === undefined)

  return (
    <div className="pt-16 min-h-screen" style={{ background: 'var(--bg)' }}>
      <div className="border-b py-16 px-4" style={{ borderColor: 'var(--border)', background: 'var(--bg2)' }}>
        <div className="max-w-5xl mx-auto">
          <span className="section-tag">// Blog</span>
          <h1 className="font-display font-extrabold tracking-tight mt-2 mb-3"
            style={{ fontSize: 'clamp(2rem,5vw,3.5rem)', color: 'var(--text)' }}>
            Data Engineering Insights
          </h1>
          <p className="text-base max-w-xl" style={{ color: 'var(--muted)', fontFamily: 'Lora, serif', fontStyle: 'italic' }}>
            Deep dives into architecture patterns, cloud tools, career strategy, and the modern data stack. {posts.length} articles and growing.
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-14">
        {/* Featured */}
        <div className="mb-14">
          <div className="text-xs font-mono uppercase tracking-widest mb-6" style={{ color: 'var(--muted)' }}>Featured</div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {featured.map(post => (
              <Link key={post.slug} href={`/blog/${post.slug}`} className="card p-6 block group">
                <div className="flex flex-wrap gap-1.5 mb-3">
                  {post.tags.slice(0, 2).map(tag => (
                    <span key={tag} className="text-xs font-mono px-2 py-0.5 rounded"
                      style={{ background: `${tagColors[tag] || '#00c2ff'}15`, color: tagColors[tag] || '#00c2ff' }}>
                      {tag}
                    </span>
                  ))}
                </div>
                <h2 className="font-display font-bold text-lg leading-snug mb-2 group-hover:underline"
                  style={{ color: 'var(--text)' }}>{post.title}</h2>
                <p className="text-sm leading-relaxed mb-4" style={{ color: 'var(--muted)', fontFamily: 'Lora, serif' }}>
                  {post.excerpt}
                </p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3 text-xs font-mono" style={{ color: 'var(--muted)' }}>
                    <span className="flex items-center gap-1"><Calendar size={10} /> {post.date}</span>
                    <span className="flex items-center gap-1"><Clock size={10} /> {post.readTime}</span>
                  </div>
                  <ArrowRight size={12} className="opacity-0 group-hover:opacity-100 transition-opacity" style={{ color: 'var(--accent)' }} />
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* All articles */}
        <div>
          <div className="text-xs font-mono uppercase tracking-widest mb-6" style={{ color: 'var(--muted)' }}>
            All articles — {rest.length} posts
          </div>
          <div className="space-y-3">
            {rest.map(post => (
              <Link key={post.slug} href={`/blog/${post.slug}`} className="card p-5 flex items-start gap-5 group">
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap gap-1.5 mb-2">
                    {post.tags.slice(0, 2).map(tag => (
                      <span key={tag} className="text-xs font-mono px-2 py-0.5 rounded"
                        style={{ background: `${tagColors[tag] || '#00c2ff'}15`, color: tagColors[tag] || '#00c2ff' }}>
                        {tag}
                      </span>
                    ))}
                  </div>
                  <h2 className="font-display font-semibold text-base mb-1.5 group-hover:underline leading-snug"
                    style={{ color: 'var(--text)' }}>{post.title}</h2>
                  <p className="text-sm leading-relaxed" style={{ color: 'var(--muted)', fontFamily: 'Lora, serif' }}>
                    {post.excerpt.slice(0, 130)}...
                  </p>
                </div>
                <div className="flex flex-col items-end gap-2 flex-shrink-0 text-xs font-mono" style={{ color: 'var(--muted)' }}>
                  <span>{post.readTime}</span>
                  <ArrowRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" style={{ color: 'var(--accent)' }} />
                </div>
              </Link>
            ))}
          </div>
        </div>

        <div className="mt-16 rounded-2xl p-10 text-center"
          style={{ background: 'var(--accent-glow)', border: '1px solid rgba(0,120,212,0.15)' }}>
          <h2 className="font-display font-bold text-xl mb-2" style={{ color: 'var(--text)' }}>Never miss a new article</h2>
          <p className="text-sm mb-6" style={{ color: 'var(--muted)' }}>Subscribe to get new posts delivered to your inbox every week.</p>
          <Link href="/newsletter" className="btn-primary">Subscribe — Free <ArrowRight size={14} /></Link>
        </div>
      </div>
    </div>
  )
}