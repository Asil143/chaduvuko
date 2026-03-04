'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { BookOpen, ArrowRight } from 'lucide-react'

interface Article {
  slug: string
  title: string
  description: string
  tag: string
  color: string
  readTime: string
}

const ALL_ARTICLES: Article[] = [
  { slug: 'why-data-engineers-use-parquet', title: 'Why Data Engineers Use Parquet', description: 'CSV vs Parquet — what actually happens in production and why every pipeline uses columnar format.', tag: 'Foundations', color: '#00c2ff', readTime: '5 min' },
  { slug: 'medallion-architecture-explained', title: 'Medallion Architecture Explained', description: 'Bronze, Silver, Gold — the pattern behind every modern data lake.', tag: 'Architecture', color: '#7b61ff', readTime: '6 min' },
  { slug: 'delta-lake-vs-apache-iceberg', title: 'Delta Lake vs Apache Iceberg', description: 'Two table formats, one decision. Here is how to pick the right one.', tag: 'Storage', color: '#0078d4', readTime: '7 min' },
  { slug: 'how-to-get-h1b-data-engineering', title: 'How to Get H1B Sponsorship in Data Engineering', description: 'The companies that sponsor, what they look for, and how to position yourself.', tag: 'Career', color: '#00e676', readTime: '8 min' },
  { slug: 'spark-interview-questions', title: 'PySpark Interview Questions', description: '15 real PySpark questions asked at FAANG and top data engineering roles.', tag: 'Interview', color: '#f5c542', readTime: '10 min' },
  { slug: 'azure-vs-aws-data-engineering', title: 'Azure vs AWS for Data Engineers', description: 'ADF vs Glue, Databricks vs EMR, Synapse vs Redshift — real comparison.', tag: 'Cloud', color: '#ff9900', readTime: '7 min' },
]

// Map pages to related article slugs
const RELATED_MAP: Record<string, string[]> = {
  '/learn/foundations/sql':    ['medallion-architecture-explained', 'spark-interview-questions', 'how-to-get-h1b-data-engineering'],
  '/learn/foundations/python': ['why-data-engineers-use-parquet', 'delta-lake-vs-apache-iceberg', 'spark-interview-questions'],
  '/learn/azure/adls-gen2':    ['why-data-engineers-use-parquet', 'medallion-architecture-explained', 'azure-vs-aws-data-engineering'],
  '/learn/azure/synapse':      ['medallion-architecture-explained', 'azure-vs-aws-data-engineering', 'delta-lake-vs-apache-iceberg'],
  '/learn/azure/adf':          ['medallion-architecture-explained', 'azure-vs-aws-data-engineering', 'how-to-get-h1b-data-engineering'],
  '/learn/azure/databricks':   ['delta-lake-vs-apache-iceberg', 'why-data-engineers-use-parquet', 'spark-interview-questions'],
  '/learn/aws/s3':             ['why-data-engineers-use-parquet', 'azure-vs-aws-data-engineering', 'medallion-architecture-explained'],
  '/learn/aws/glue':           ['spark-interview-questions', 'azure-vs-aws-data-engineering', 'delta-lake-vs-apache-iceberg'],
  '/learn/aws/redshift':       ['medallion-architecture-explained', 'azure-vs-aws-data-engineering', 'how-to-get-h1b-data-engineering'],
  '/learn/aws/kinesis':        ['medallion-architecture-explained', 'delta-lake-vs-apache-iceberg', 'azure-vs-aws-data-engineering'],
  '/learn/interview':          ['how-to-get-h1b-data-engineering', 'spark-interview-questions', 'azure-vs-aws-data-engineering'],
  '/learn/roadmap':            ['how-to-get-h1b-data-engineering', 'medallion-architecture-explained', 'why-data-engineers-use-parquet'],
}

export function RelatedArticles() {
  const pathname = usePathname()
  const slugs = RELATED_MAP[pathname]
  if (!slugs) return null

  const articles = slugs
    .map(s => ALL_ARTICLES.find(a => a.slug === s))
    .filter(Boolean) as Article[]

  if (articles.length === 0) return null

  return (
    <div className="mt-10">
      <div className="text-xs font-mono uppercase tracking-widest mb-4" style={{ color: 'var(--muted)' }}>
        Related reading
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {articles.map(article => (
          <Link key={article.slug} href={'/blog/' + article.slug}
            className="group p-4 rounded-xl transition-all"
            style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}
            onMouseEnter={e => (e.currentTarget.style.borderColor = article.color)}
            onMouseLeave={e => (e.currentTarget.style.borderColor = 'var(--border)')}>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-mono px-2 py-0.5 rounded"
                style={{ background: article.color + '15', color: article.color }}>
                {article.tag}
              </span>
              <span className="text-xs font-mono" style={{ color: 'var(--muted)' }}>{article.readTime}</span>
            </div>
            <div className="text-sm font-display font-semibold mb-1 group-hover:underline"
              style={{ color: 'var(--text)' }}>
              {article.title}
            </div>
            <p className="text-xs leading-relaxed" style={{ color: 'var(--muted)', fontFamily: 'Lora, serif' }}>
              {article.description}
            </p>
            <div className="flex items-center gap-1 mt-3 text-xs font-mono"
              style={{ color: article.color }}>
              Read <ArrowRight size={10} />
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}