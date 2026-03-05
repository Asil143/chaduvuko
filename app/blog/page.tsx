import Link from 'next/link'
import { ArrowRight, Clock, Calendar } from 'lucide-react'

export const metadata = { title: 'Blog — Asil' }

const posts = [
  // FEATURED
  { slug: 'medallion-architecture-explained',     title: 'Medallion Architecture Explained — Bronze, Silver, and Gold in Plain English',          excerpt: 'The most widely used data lake design pattern in 2025. What each layer means, why it exists, and how to implement it on Azure, AWS, and GCP.',           date: 'March 1, 2025',     readTime: '8 min read',  tags: ['Architecture', 'Data Lake'],         featured: true },
  { slug: 'how-to-get-h1b-data-engineering',      title: 'How to Get H1B Sponsorship as a Data Engineer in 2025',                                  excerpt: 'The companies that actually sponsor, what skills they look for, the resume strategy that works, and the exact timing of when to apply.',                date: 'March 15, 2025',    readTime: '8 min read',  tags: ['H1B', 'Career'],                     featured: true },
  { slug: 'azure-vs-aws-data-engineering',        title: 'Azure vs AWS for Data Engineers in 2025 — A Real Comparison',                            excerpt: 'ADF vs Glue, Databricks vs EMR, Synapse vs Redshift. A direct comparison focused on what a data engineer actually uses every day.',                   date: 'February 28, 2025', readTime: '7 min read',  tags: ['Azure', 'AWS'],                      featured: true },
  { slug: 'spark-interview-questions',            title: '15 PySpark Interview Questions Asked at Real Data Engineering Roles',                     excerpt: 'Real PySpark questions from consulting firms, financial services, and tech companies. With the answers interviewers actually want to hear.',           date: 'March 5, 2025',     readTime: '10 min read', tags: ['Interview', 'Apache Spark'],          featured: true },
  // ALL ARTICLES
  { slug: 'delta-lake-vs-apache-iceberg',         title: 'Delta Lake vs. Apache Iceberg — Which Should You Use?',                                  excerpt: 'Two open table formats that bring ACID transactions to your data lake. Different strengths, different ecosystems, different ideal use cases.',           date: 'February 22, 2025', readTime: '10 min read', tags: ['Storage', 'Architecture'],            featured: false },
  { slug: 'data-engineer-resume-without-experience', title: 'How to Write a Data Engineer Resume With No Work Experience',                          excerpt: 'The resume strategy that gets callbacks at consulting firms sponsoring H1B. What to include, what to cut, and how to quantify project work.',            date: 'February 15, 2025', readTime: '12 min read', tags: ['Career', 'Resume'],                  featured: false },
  { slug: 'adf-vs-airflow-vs-step-functions',     title: 'ADF vs. Airflow vs. Step Functions — Which Orchestration Tool to Learn?',                excerpt: 'Three orchestration tools compared. When to use each, what they are good at, and which one has the most job market demand.',                           date: 'February 8, 2025',  readTime: '9 min read',  tags: ['Orchestration', 'ADF'],              featured: false },
  { slug: 'microsoft-fabric-explained',           title: 'Microsoft Fabric Explained — Should You Learn It Now or Wait?',                          excerpt: 'The biggest change to the Azure data engineering landscape since Databricks. What it is, what it replaces, and the honest advice on timing.',           date: 'February 1, 2025',  readTime: '7 min read',  tags: ['Azure', 'Microsoft Fabric'],         featured: false },
  { slug: 'why-data-engineers-use-parquet',       title: 'Why Data Engineers Use Parquet Instead of CSV',                                          excerpt: 'CSV vs Parquet — what actually happens in production and why every serious pipeline uses columnar format for storage and query performance.',            date: 'March 10, 2025',    readTime: '5 min read',  tags: ['Foundations', 'Storage'],            featured: false },
  { slug: 'apache-spark-architecture-explained',  title: 'Apache Spark Architecture Explained — How Spark Actually Works',                         excerpt: 'Drivers, executors, DAGs, stages — the internals that separate engineers who can debug slow jobs from those who just restart the cluster.',             date: 'March 18, 2025',    readTime: '8 min read',  tags: ['Apache Spark', 'Architecture'],      featured: false },
  { slug: 'data-quality-in-pipelines',            title: 'Data Quality in Production Pipelines — What to Check and When',                          excerpt: 'Bad data flowing silently is worse than a broken pipeline. The four categories of data quality issues and exactly where to apply checks.',               date: 'March 17, 2025',    readTime: '7 min read',  tags: ['Architecture', 'Foundations'],       featured: false },
  { slug: 'what-is-a-data-lakehouse',             title: 'What Is a Data Lakehouse? The Architecture Replacing the Data Warehouse',                 excerpt: 'Warehouse reliability at lake cost. How Delta Lake, Iceberg, and Microsoft Fabric are all built around this single architectural shift.',                date: 'March 16, 2025',    readTime: '6 min read',  tags: ['Architecture', 'Foundations'],       featured: false },
  { slug: 'adls-gen2-best-practices',             title: 'ADLS Gen2 Best Practices — How to Structure Your Azure Data Lake',                       excerpt: 'Container structure, partitioning strategy, access controls, and the small files problem. The mistakes made early are expensive to fix at scale.',       date: 'March 14, 2025',    readTime: '6 min read',  tags: ['Azure', 'Storage'],                  featured: false },
  { slug: 'azure-key-vault-for-data-engineers',   title: 'Azure Key Vault for Data Engineers — Stop Putting Secrets in Your Code',                 excerpt: 'Secrets in code are the most common security mistake in data engineering. Key Vault with Databricks and ADF — set up properly in 15 minutes.',           date: 'March 13, 2025',    readTime: '5 min read',  tags: ['Azure', 'Security'],                 featured: false },
  { slug: 'what-is-apache-kafka',                 title: 'What Is Apache Kafka? A Plain English Explanation for Data Engineers',                    excerpt: 'Not just a message queue. Why Kafka changed how companies build data pipelines and what makes it different from every alternative.',                     date: 'March 12, 2025',    readTime: '7 min read',  tags: ['Streaming', 'Architecture'],         featured: false },
  { slug: 'slowly-changing-dimensions-explained', title: 'Slowly Changing Dimensions Explained — SCD Type 1, 2, and 3',                            excerpt: 'How to handle changes to dimension data over time. Getting this decision wrong can corrupt your entire historical analysis.',                           date: 'March 11, 2025',    readTime: '6 min read',  tags: ['Architecture', 'Foundations'],       featured: false },
  { slug: 'etl-vs-elt-explained',                 title: 'ETL vs ELT — Why the Industry Switched and What It Means for Your Work',                 excerpt: 'Why the industry moved from ETL to ELT, what cloud storage costs have to do with it, and when ETL is still the right choice.',                          date: 'March 9, 2025',     readTime: '5 min read',  tags: ['Foundations', 'Architecture'],       featured: false },
  { slug: 'aws-glue-vs-databricks',               title: 'AWS Glue vs Databricks on AWS — Which Should You Use?',                                  excerpt: 'Both run Spark on AWS. When serverless Glue is the right call and when Databricks is worth the extra cost.',                                           date: 'March 8, 2025',     readTime: '6 min read',  tags: ['AWS', 'Apache Spark'],               featured: false },
  { slug: 'redshift-vs-bigquery-vs-synapse',      title: 'Redshift vs BigQuery vs Synapse — Choosing a Cloud Data Warehouse',                      excerpt: 'Architecture, cost patterns, and ecosystem integration for the three dominant cloud data warehouses. Which to learn for your target job market.',          date: 'March 7, 2025',     readTime: '7 min read',  tags: ['AWS', 'GCP', 'Azure'],               featured: false },
  { slug: 'bigquery-cost-optimization',           title: 'BigQuery Cost Optimization — Stop Paying for Queries You Do Not Need',                   excerpt: 'Partitioning, clustering, avoiding SELECT *, and materialized views. The practical changes that cut BigQuery bills dramatically.',                        date: 'March 6, 2025',     readTime: '6 min read',  tags: ['GCP', 'BigQuery'],                   featured: false },
  { slug: 'cloud-composer-vs-managed-airflow',    title: 'Cloud Composer vs Self-Managed Airflow — What GCP Engineers Should Know',                excerpt: 'What Composer manages for you, the real cost tradeoff, and when it makes sense vs running Airflow yourself.',                                           date: 'March 4, 2025',     readTime: '5 min read',  tags: ['GCP', 'Orchestration'],              featured: false },
  { slug: 'dataflow-vs-spark-streaming',          title: 'Google Dataflow vs Apache Spark Streaming — Stream Processing Compared',                  excerpt: 'Two streaming engines with different models. Latency, cost, ease of use, and which one GCP data engineering roles actually require.',                    date: 'March 3, 2025',     readTime: '6 min read',  tags: ['GCP', 'Streaming'],                  featured: false },
  { slug: 'pubsub-vs-kafka-vs-kinesis',           title: 'Pub/Sub vs Kafka vs Kinesis — Choosing a Streaming Ingestion Layer',                     excerpt: 'Every real-time pipeline needs a message broker. How the three major options compare on retention, throughput, and ecosystem fit.',                      date: 'March 2, 2025',     readTime: '6 min read',  tags: ['GCP', 'Streaming'],                  featured: false },
  { slug: 'gcp-iam-for-data-engineers',           title: 'GCP IAM for Data Engineers — Access Control Without the Confusion',                      excerpt: 'Members, roles, bindings, and service accounts. The practical IAM setup for Dataflow pipelines, Composer DAGs, and BigQuery access.',                  date: 'February 28, 2025', readTime: '5 min read',  tags: ['GCP', 'Security'],                   featured: false },
  { slug: 'kinesis-firehose-explained',           title: 'Amazon Kinesis Firehose Explained — Stream Data into S3 Without Consumer Code',          excerpt: 'The easiest AWS streaming service. How Firehose auto-delivers to S3 with date partitioning and Lambda transformation built in.',                        date: 'February 26, 2025', readTime: '5 min read',  tags: ['AWS', 'Streaming'],                  featured: false },
  { slug: 'redshift-best-practices',              title: 'Amazon Redshift Best Practices — Distribution Keys, Sort Keys, and Vacuum',              excerpt: 'A poorly configured Redshift cluster can be 100x slower. The three decisions that define query performance at scale.',                                 date: 'February 25, 2025', readTime: '7 min read',  tags: ['AWS', 'Storage'],                    featured: false },
  { slug: 'aws-s3-for-data-engineers',            title: 'Amazon S3 for Data Engineers — Beyond Just File Storage',                                excerpt: 'Lifecycle policies, event notifications, S3 Select, and partitioning strategy. Features most engineers never learn but use every day.',                  date: 'February 24, 2025', readTime: '6 min read',  tags: ['AWS', 'Storage'],                    featured: false },
  { slug: 'data-engineering-career-path',         title: 'The Data Engineering Career Path — Junior to Senior in 3 Years',                         excerpt: 'The skills and milestones that actually matter at each level, salary ranges at each stage, and the fastest path from zero to senior.',                    date: 'February 23, 2025', readTime: '8 min read',  tags: ['Career'],                            featured: false },
  { slug: 'what-is-dbt',                          title: 'What Is dbt? The Data Transformation Tool Everyone Is Talking About',                     excerpt: 'What dbt actually does, why it became popular, dbt Core vs dbt Cloud, and whether you should add it to your learning list in 2025.',                    date: 'February 20, 2025', readTime: '6 min read',  tags: ['Foundations', 'Architecture'],       featured: false },
  { slug: 'incremental-loading-explained',        title: 'Incremental Loading — How to Process Only New Data in Your Pipelines',                    excerpt: 'Full load vs incremental, watermark patterns, handling late arrivals, and change data capture. The production pattern every DE needs.',                  date: 'February 18, 2025', readTime: '6 min read',  tags: ['Architecture', 'Foundations'],       featured: false },
  { slug: 'batch-vs-streaming',                   title: 'Batch vs. Streaming — The Decision Framework Every Data Engineer Needs',                  excerpt: 'The 4-question framework for choosing between batch and streaming. When streaming is overkill and when you genuinely need it.',                          date: 'January 25, 2025',  readTime: '6 min read',  tags: ['Architecture', 'Streaming'],         featured: false },
]

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