'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ArrowRight } from 'lucide-react'

interface Article { slug: string; title: string; description: string; tag: string; color: string; readTime: string }

const ALL_ARTICLES: Article[] = [
  { slug: 'medallion-architecture-explained',    title: 'Medallion Architecture Explained',          description: 'Bronze, Silver, Gold — the pattern behind every modern data lake.',                              tag: 'Architecture',  color: '#7b61ff', readTime: '6 min' },
  { slug: 'delta-lake-vs-apache-iceberg',        title: 'Delta Lake vs Apache Iceberg',              description: 'Two table formats, one decision. How to pick the right one for your stack.',                    tag: 'Storage',       color: '#0078d4', readTime: '7 min' },
  { slug: 'data-engineer-resume-without-experience', title: 'Resume With No DE Experience',          description: 'How to build a resume that gets interviews even without professional DE experience.',            tag: 'Career',        color: '#00e676', readTime: '8 min' },
  { slug: 'adf-vs-airflow-vs-step-functions',    title: 'ADF vs Airflow vs Step Functions',          description: 'Three orchestration tools compared — when to use each and why.',                                tag: 'Orchestration', color: '#f5c542', readTime: '7 min' },
  { slug: 'microsoft-fabric-explained',          title: 'Microsoft Fabric Explained',                description: 'What Fabric actually is, how it fits with Azure, and whether to learn it now.',                 tag: 'Azure',         color: '#0078d4', readTime: '6 min' },
  { slug: 'why-data-engineers-use-parquet',      title: 'Why Data Engineers Use Parquet',            description: 'CSV vs Parquet — what actually happens in production and why every pipeline uses columnar.',    tag: 'Foundations',   color: '#00c2ff', readTime: '5 min' },
  { slug: 'spark-interview-questions',           title: '15 PySpark Interview Questions',            description: 'Real PySpark questions asked at FAANG and top data engineering roles — with answers.',          tag: 'Interview',     color: '#ff6b6b', readTime: '10 min' },
  { slug: 'azure-vs-aws-data-engineering',       title: 'Azure vs AWS for Data Engineers',           description: 'ADF vs Glue, Databricks vs EMR, Synapse vs Redshift — direct comparison for job seekers.',     tag: 'Cloud',         color: '#ff9900', readTime: '7 min' },
  { slug: 'how-to-get-h1b-data-engineering',     title: 'How to Get H1B as a Data Engineer',         description: 'The companies that sponsor, what they look for, and how to position yourself for 2026.',        tag: 'H1B',           color: '#00e676', readTime: '8 min' },
  { slug: 'apache-spark-architecture-explained', title: 'Apache Spark Architecture Explained',       description: 'Drivers, executors, DAGs, stages — how Spark actually works under the hood.',                  tag: 'Spark',         color: '#ff6b6b', readTime: '8 min' },
  { slug: 'data-quality-in-pipelines',           title: 'Data Quality in Production Pipelines',      description: 'What to check, when to check it, and what to do when checks fail.',                            tag: 'Architecture',  color: '#7b61ff', readTime: '7 min' },
  { slug: 'what-is-a-data-lakehouse',            title: 'What Is a Data Lakehouse?',                 description: 'The architecture replacing the data warehouse — and why the whole industry is moving to it.',   tag: 'Architecture',  color: '#7b61ff', readTime: '6 min' },
  { slug: 'adls-gen2-best-practices',            title: 'ADLS Gen2 Best Practices',                  description: 'Container structure, partitioning, access control, and the small files problem.',               tag: 'Azure',         color: '#0078d4', readTime: '6 min' },
  { slug: 'azure-key-vault-for-data-engineers',  title: 'Azure Key Vault for Data Engineers',        description: 'Stop putting secrets in your code — how to use Key Vault with Databricks and ADF.',            tag: 'Azure',         color: '#0078d4', readTime: '5 min' },
  { slug: 'what-is-apache-kafka',                title: 'What Is Apache Kafka?',                     description: 'A plain English explanation of Kafka for data engineers — topics, partitions, offsets.',       tag: 'Streaming',     color: '#00c2ff', readTime: '7 min' },
  { slug: 'slowly-changing-dimensions-explained',title: 'Slowly Changing Dimensions Explained',      description: 'SCD Type 1, 2, and 3 — what they are, when to use each, and how to implement them.',          tag: 'Architecture',  color: '#7b61ff', readTime: '6 min' },
  { slug: 'etl-vs-elt-explained',                title: 'ETL vs ELT Explained',                      description: 'Why the industry switched from ETL to ELT and what it means for your daily work.',             tag: 'Foundations',   color: '#00c2ff', readTime: '5 min' },
  { slug: 'aws-glue-vs-databricks',              title: 'AWS Glue vs Databricks on AWS',             description: 'When to use Glue and when to use Databricks — the real differences that matter.',              tag: 'AWS',           color: '#ff9900', readTime: '6 min' },
  { slug: 'redshift-vs-bigquery-vs-synapse',     title: 'Redshift vs BigQuery vs Synapse',           description: 'Choosing a cloud data warehouse — architecture, cost, and ecosystem compared.',                tag: 'Cloud',         color: '#ff9900', readTime: '7 min' },
  { slug: 'bigquery-cost-optimization',          title: 'BigQuery Cost Optimization',                description: 'Partitioning, clustering, and query patterns that cut your BigQuery bill dramatically.',        tag: 'GCP',           color: '#4285f4', readTime: '6 min' },
  { slug: 'cloud-composer-vs-managed-airflow',   title: 'Cloud Composer vs Self-Managed Airflow',    description: 'What Cloud Composer manages for you, the cost tradeoff, and when each is right.',              tag: 'GCP',           color: '#4285f4', readTime: '5 min' },
  { slug: 'dataflow-vs-spark-streaming',         title: 'Google Dataflow vs Spark Streaming',        description: 'Two streaming engines compared — latency, cost, ease of use, and ecosystem.',                  tag: 'GCP',           color: '#4285f4', readTime: '6 min' },
  { slug: 'pubsub-vs-kafka-vs-kinesis',          title: 'Pub/Sub vs Kafka vs Kinesis',               description: 'Choosing a streaming ingestion layer — how the three major options compare.',                  tag: 'Streaming',     color: '#4285f4', readTime: '6 min' },
  { slug: 'gcp-iam-for-data-engineers',          title: 'GCP IAM for Data Engineers',                description: 'Access control without the confusion — members, roles, bindings, and service accounts.',       tag: 'GCP',           color: '#4285f4', readTime: '5 min' },
  { slug: 'kinesis-firehose-explained',          title: 'Amazon Kinesis Firehose Explained',         description: 'The easiest way to stream data into S3 — how Firehose works and when to use it.',              tag: 'AWS',           color: '#ff9900', readTime: '5 min' },
  { slug: 'redshift-best-practices',             title: 'Amazon Redshift Best Practices',            description: 'Distribution keys, sort keys, and vacuum — the three decisions that define Redshift performance.', tag: 'AWS',        color: '#ff9900', readTime: '7 min' },
  { slug: 'aws-s3-for-data-engineers',           title: 'Amazon S3 for Data Engineers',              description: 'Lifecycle policies, event notifications, S3 Select — beyond just file storage.',               tag: 'AWS',           color: '#ff9900', readTime: '6 min' },
  { slug: 'data-engineering-career-path',        title: 'The Data Engineering Career Path',          description: 'Junior to senior in 3 years — the skills and milestones that actually matter.',               tag: 'Career',        color: '#00e676', readTime: '8 min' },
  { slug: 'what-is-dbt',                         title: 'What Is dbt?',                              description: 'The data transformation tool everyone is talking about — what it does and whether to learn it.', tag: 'Foundations',  color: '#00c2ff', readTime: '6 min' },
  { slug: 'incremental-loading-explained',       title: 'Incremental Loading Explained',             description: 'How to process only new data — watermarks, upserts, and change data capture.',                 tag: 'Architecture',  color: '#7b61ff', readTime: '6 min' },
  { slug: 'batch-vs-streaming',                  title: 'Batch vs Streaming Pipelines',              description: 'The decision framework for choosing between batch and streaming in real projects.',             tag: 'Architecture',  color: '#00c2ff', readTime: '7 min' },
]

const RELATED_MAP: Record<string, string[]> = {
  '/learn/what-is-data-engineering':       ['what-is-a-data-lakehouse',            'etl-vs-elt-explained',               'data-engineering-career-path'],
  '/learn/roadmap':                        ['how-to-get-h1b-data-engineering',      'what-is-dbt',                        'incremental-loading-explained'],
  '/learn/foundations/sql':                ['slowly-changing-dimensions-explained', 'medallion-architecture-explained',   'data-quality-in-pipelines'],
  '/learn/foundations/python':             ['apache-spark-architecture-explained',  'why-data-engineers-use-parquet',     'batch-vs-streaming'],
  '/learn/azure/introduction':             ['azure-vs-aws-data-engineering',        'how-to-get-h1b-data-engineering',    'data-engineer-resume-without-experience'],
  '/learn/azure/adls-gen2':               ['adls-gen2-best-practices',             'why-data-engineers-use-parquet',     'incremental-loading-explained'],
  '/learn/azure/adf':                     ['adf-vs-airflow-vs-step-functions',     'azure-key-vault-for-data-engineers', 'etl-vs-elt-explained'],
  '/learn/azure/databricks':              ['apache-spark-architecture-explained',  'delta-lake-vs-apache-iceberg',       'spark-interview-questions'],
  '/learn/azure/synapse':                 ['medallion-architecture-explained',     'redshift-vs-bigquery-vs-synapse',    'microsoft-fabric-explained'],
  '/learn/aws/introduction':              ['azure-vs-aws-data-engineering',        'aws-glue-vs-databricks',             'data-engineering-career-path'],
  '/learn/aws/s3':                        ['aws-s3-for-data-engineers',            'why-data-engineers-use-parquet',     'what-is-a-data-lakehouse'],
  '/learn/aws/glue':                      ['adf-vs-airflow-vs-step-functions',     'data-quality-in-pipelines',          'etl-vs-elt-explained'],
  '/learn/aws/redshift':                  ['redshift-best-practices',             'redshift-vs-bigquery-vs-synapse',    'slowly-changing-dimensions-explained'],
  '/learn/aws/kinesis':                   ['kinesis-firehose-explained',          'what-is-apache-kafka',               'batch-vs-streaming'],
  '/learn/gcp/introduction':              ['azure-vs-aws-data-engineering',        'what-is-a-data-lakehouse',           'data-engineering-career-path'],
  '/learn/gcp/bigquery':                  ['bigquery-cost-optimization',          'redshift-vs-bigquery-vs-synapse',    'why-data-engineers-use-parquet'],
  '/learn/gcp/dataflow':                  ['dataflow-vs-spark-streaming',         'batch-vs-streaming',                 'apache-spark-architecture-explained'],
  '/learn/gcp/pubsub':                    ['pubsub-vs-kafka-vs-kinesis',          'what-is-apache-kafka',               'data-quality-in-pipelines'],
  '/learn/gcp/composer':                  ['cloud-composer-vs-managed-airflow',   'adf-vs-airflow-vs-step-functions',   'gcp-iam-for-data-engineers'],
  '/learn/interview':                     ['spark-interview-questions',           'data-engineer-resume-without-experience', 'how-to-get-h1b-data-engineering'],
  '/learn/industry':                      ['data-engineering-career-path',        'azure-vs-aws-data-engineering',      'data-engineer-resume-without-experience'],
  '/learn/projects/azure-batch-pipeline': ['medallion-architecture-explained',    'incremental-loading-explained',      'data-quality-in-pipelines'],
}

export function RelatedArticles() {
  const pathname = usePathname()
  const slugs = RELATED_MAP[pathname]
  if (!slugs) return null
  const articles = slugs.map(s => ALL_ARTICLES.find(a => a.slug === s)).filter(Boolean) as Article[]
  if (articles.length === 0) return null
  return (
    <div className="mt-10">
      <div className="text-xs font-mono uppercase tracking-widest mb-4" style={{ color: 'var(--muted)' }}>Related reading</div>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {articles.map(article => (
          <Link key={article.slug} href={'/blog/' + article.slug}
            className="group p-4 rounded-xl transition-all"
            style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}
            onMouseEnter={e => (e.currentTarget.style.borderColor = article.color)}
            onMouseLeave={e => (e.currentTarget.style.borderColor = 'var(--border)')}>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-mono px-2 py-0.5 rounded" style={{ background: article.color + '15', color: article.color }}>{article.tag}</span>
              <span className="text-xs font-mono" style={{ color: 'var(--muted)' }}>{article.readTime}</span>
            </div>
            <div className="text-sm font-display font-semibold mb-1 group-hover:underline" style={{ color: 'var(--text)' }}>{article.title}</div>
            <p className="text-xs leading-relaxed" style={{ color: 'var(--muted)', fontFamily: 'Lora, serif' }}>{article.description}</p>
            <div className="flex items-center gap-1 mt-3 text-xs font-mono" style={{ color: article.color }}>Read <ArrowRight size={10} /></div>
          </Link>
        ))}
      </div>
    </div>
  )
}