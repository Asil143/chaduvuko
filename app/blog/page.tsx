import Link from 'next/link'
import { ArrowRight, Clock, Calendar } from 'lucide-react'

export const metadata = { title: 'Blog — VedaEra' }

const posts = [
  {
    slug: 'medallion-architecture-explained',
    title: 'Medallion Architecture Explained — Bronze, Silver, and Gold in Plain English',
    excerpt: 'The Medallion Architecture is the most widely used data lake design pattern in 2025. Here is exactly what each layer means, why it exists, and how to implement it on Azure, AWS, and GCP.',
    date: 'March 1, 2025', readTime: '8 min read',
    tags: ['Architecture', 'Data Lake', 'Azure', 'AWS', 'GCP'], featured: true,
  },
  {
    slug: 'delta-lake-vs-apache-iceberg',
    title: 'Delta Lake vs. Apache Iceberg in 2025 — Which Should You Use?',
    excerpt: 'Both are open table formats that bring ACID transactions to your data lake. They have different strengths, different ecosystems, and different ideal use cases. Here is a complete comparison.',
    date: 'February 22, 2025', readTime: '10 min read',
    tags: ['Delta Lake', 'Apache Iceberg', 'Open Table Format'], featured: true,
  },
  {
    slug: 'data-engineer-resume-without-experience',
    title: 'How to Write a Data Engineer Resume When You Have No Work Experience',
    excerpt: 'Recruiters at consulting firms that sponsor H1B visas see hundreds of resumes per week. Here is exactly what separates the ones that get callbacks from the ones that do not.',
    date: 'February 15, 2025', readTime: '12 min read',
    tags: ['Career', 'Resume', 'H1B'], featured: false,
  },
  {
    slug: 'adf-vs-airflow-vs-step-functions',
    title: 'ADF vs. Airflow vs. Step Functions — Which Orchestration Tool Should You Learn?',
    excerpt: 'Azure Data Factory, Apache Airflow, and AWS Step Functions all orchestrate data pipelines but take very different approaches. This post breaks down when to use each one.',
    date: 'February 8, 2025', readTime: '9 min read',
    tags: ['ADF', 'Airflow', 'Orchestration'], featured: false,
  },
  {
    slug: 'microsoft-fabric-explained',
    title: 'Microsoft Fabric Explained — Should You Learn It Now or Wait?',
    excerpt: 'Microsoft Fabric is the biggest change to the Azure data engineering landscape since Databricks. Here is what it is, what it replaces, and whether you should prioritize it in 2025.',
    date: 'February 1, 2025', readTime: '7 min read',
    tags: ['Microsoft Fabric', 'Azure', 'Career'], featured: false,
  },
  {
    slug: 'batch-vs-streaming',
    title: 'Batch vs. Streaming — The Decision Framework Every Data Engineer Needs',
    excerpt: 'Most data engineering architecture decisions come down to batch or streaming. Here is a practical framework based on latency requirements, data volume, and business needs.',
    date: 'January 25, 2025', readTime: '6 min read',
    tags: ['Architecture', 'Batch', 'Streaming'], featured: false,
  },
]

const tagColors: Record<string, string> = {
  'Architecture': '#7b61ff', 'Data Lake': '#00c2ff', 'Azure': '#0078d4',
  'AWS': '#ff9900', 'GCP': '#4285f4', 'Delta Lake': '#ff6b6b',
  'Apache Iceberg': '#00c2ff', 'Open Table Format': '#00e676',
  'Career': '#f5c542', 'Resume': '#f5c542', 'H1B': '#f5c542',
  'ADF': '#0078d4', 'Airflow': '#00e676', 'Orchestration': '#7b61ff',
  'Microsoft Fabric': '#0078d4', 'Batch': '#00c2ff', 'Streaming': '#00e676',
}

export default function BlogPage() {
  const featured = posts.filter(p => p.featured)
  const rest = posts.filter(p => !p.featured)

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
            Deep dives into architecture patterns, cloud tools, career strategy, and the modern data stack.
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-14">
        <div className="mb-14">
          <div className="text-xs font-mono uppercase tracking-widest mb-6" style={{ color: 'var(--muted)' }}>Featured</div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {featured.map(post => (
              <Link key={post.slug} href={`/blog/${post.slug}`} className="card p-6 block group">
                <div className="flex flex-wrap gap-1.5 mb-3">
                  {post.tags.slice(0, 3).map(tag => (
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

        <div>
          <div className="text-xs font-mono uppercase tracking-widest mb-6" style={{ color: 'var(--muted)' }}>All articles</div>
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