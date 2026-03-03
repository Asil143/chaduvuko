'use client'
import Link from 'next/link'
import { ArrowRight, BookOpen, Cloud, Code2, Layers, Trophy, Users, CheckCircle, ChevronRight } from 'lucide-react'

const tickerItems = [
  'Apache Iceberg','Delta Lake','Azure Data Factory','Apache Spark',
  'Medallion Architecture','AWS Glue','Data Mesh','BigQuery',
  'Azure Databricks','Zero-ETL','Microsoft Fabric','Apache Kafka',
  'dbt','Lakehouse Architecture','Azure Synapse','Apache Airflow',
  'Apache Iceberg','Delta Lake','Azure Data Factory','Apache Spark',
  'Medallion Architecture','AWS Glue','Data Mesh','BigQuery',
  'Azure Databricks','Zero-ETL','Microsoft Fabric','Apache Kafka',
  'dbt','Lakehouse Architecture','Azure Synapse','Apache Airflow',
]

const roadmapSections = [
  { num:'01', icon:'🧱', title:'Foundations', color:'#00c2ff', desc:'Core skills every data engineer needs before touching any cloud service.', topics:['SQL','Python','Linux','Git','What is DE?'], href:'/learn/what-is-data-engineering' },
  { num:'02', icon:'☁️', title:'Cloud Platforms', color:'#0078d4', desc:'Deep dives into Azure, AWS, and GCP — three separate tracks.', topics:['Azure','AWS','GCP','Databricks'], href:'/learn/azure/introduction' },
  { num:'03', icon:'⚙️', title:'Core DE Concepts', color:'#7b61ff', desc:'Timeless architectural patterns every senior engineer knows cold.', topics:['ETL vs ELT','Batch','Stream','Lakehouse','Data Mesh'], href:'/learn/what-is-data-engineering' },
  { num:'04', icon:'🔥', title:'Modern Data Stack', color:'#f5c542', desc:'The hottest open-source tools companies are actively hiring for.', topics:['Iceberg','Spark','Kafka','dbt','Airflow'], href:'/learn/projects' },
  { num:'05', icon:'🏗️', title:'End-to-End Projects', color:'#00e676', desc:'Real pipelines built from scratch with full code and GitHub repos.', topics:['Batch Pipeline','Streaming','Lambda','Multi-cloud'], href:'/learn/projects' },
  { num:'06', icon:'🎯', title:'Interview Prep', color:'#ff6b6b', desc:'Curated questions, system design answers, and resume tips for DE roles.', topics:['Top 50 Qs','System Design','Azure Q&A','Resume Tips'], href:'/learn/interview' },
]

const cloudTracks = [
  {
    name:'Microsoft Azure', emoji:'☁️', color:'#0078d4', badge:'FEATURED',
    services:['Azure Data Lake Storage Gen2','Azure Data Factory (ADF)','Azure Databricks','Azure Synapse Analytics','Azure Event Hubs','Azure Stream Analytics','Microsoft Fabric','Azure Key Vault'],
    href:'/learn/azure/introduction'
  },
  {
    name:'Amazon Web Services', emoji:'🟠', color:'#ff9900', badge:'AWS',
    services:['Amazon S3 & Data Lake','AWS Glue & ETL','Amazon Redshift','AWS Kinesis (Streaming)','Amazon EMR (Spark)','AWS Lake Formation','Amazon Athena','AWS Step Functions'],
    href:'#'
  },
  {
    name:'Google Cloud Platform', emoji:'🔵', color:'#4285f4', badge:'GCP',
    services:['Google BigQuery','Cloud Dataflow','Cloud Pub/Sub','Dataproc (Spark)','Cloud Composer (Airflow)','BigTable','Cloud Storage','Looker Studio'],
    href:'#'
  },
]

const modernStack = [
  { emoji:'🧊', name:'Apache Iceberg', type:'Open Table Format', href:'/learn/projects' },
  { emoji:'△', name:'Delta Lake', type:'Open Table Format', href:'/learn/azure/databricks' },
  { emoji:'⚡', name:'Apache Spark', type:'Distributed Computing', href:'/learn/foundations/python' },
  { emoji:'📨', name:'Apache Kafka', type:'Event Streaming', href:'/learn/projects' },
  { emoji:'🔄', name:'Apache Airflow', type:'Orchestration', href:'/learn/projects' },
  { emoji:'🔧', name:'dbt', type:'Data Transformation', href:'/learn/projects' },
  { emoji:'🦆', name:'DuckDB', type:'Analytical Database', href:'/learn/projects' },
  { emoji:'❄️', name:'Snowflake', type:'Cloud Data Warehouse', href:'/learn/projects' },
  { emoji:'🏗️', name:'Terraform', type:'Infrastructure as Code', href:'/learn/projects' },
  { emoji:'🐳', name:'Docker', type:'Containerization', href:'/learn/projects' },
  { emoji:'☸️', name:'Kubernetes', type:'Container Orchestration', href:'/learn/projects' },
  { emoji:'🏠', name:'Apache Hudi', type:'Open Table Format', href:'/learn/projects' },
]

const projects = [
  { num:'01', title:'Retail Sales Batch Pipeline — Azure', desc:'Medallion Architecture (Bronze→Silver→Gold) using ADF, Databricks, ADLS Gen2, and Synapse Analytics.', tags:['ADF','Databricks','Synapse','Delta Lake'], status:'live', href:'/learn/projects' },
  { num:'02', title:'Real-Time Stock Price Streaming — Azure', desc:'Live streaming pipeline using Event Hubs, Stream Analytics, and Power BI real-time dashboard.', tags:['Event Hubs','Stream Analytics','Power BI'], status:'soon', href:'/learn/projects' },
  { num:'03', title:'Lambda Architecture — Batch + Stream Combined', desc:'Production-grade e-commerce platform unifying historical and real-time data in a single serving layer.', tags:['Databricks','Event Hubs','ADF','Synapse'], status:'soon', href:'/learn/projects' },
  { num:'04', title:'End-to-End Data Pipeline — AWS', desc:'Complete pipeline using S3, AWS Glue, Redshift, and Kinesis on Amazon Web Services.', tags:['S3','Glue','Redshift','Kinesis'], status:'soon', href:'/learn/projects' },
  { num:'05', title:'BigQuery Analytics Platform — GCP', desc:'Scalable analytics platform on Google Cloud using BigQuery, Dataflow, and Looker Studio.', tags:['BigQuery','Dataflow','Pub/Sub','Looker'], status:'soon', href:'/learn/projects' },
  { num:'06', title:'Multi-Cloud Lakehouse with Apache Iceberg', desc:'One open lakehouse spanning Azure, AWS, and GCP using Apache Iceberg as the universal table format.', tags:['Iceberg','Azure','AWS','GCP'], status:'soon', href:'/learn/projects' },
]

const whyItems = [
  { icon:'🆓', title:'100% Free Forever', desc:'Every tutorial, every project, every interview question. No paywalls, no subscriptions, no credit card required.' },
  { icon:'🛠️', title:'Real Projects, Real Code', desc:'Not just theory. Every concept is backed by working code you can run yourself on Azure, AWS, or GCP.' },
  { icon:'🎯', title:'Job-Market Focused', desc:'Content curated based on what companies are actually hiring for — not what was relevant five years ago.' },
  { icon:'📡', title:'Always Up to Date', desc:'The data engineering landscape changes fast. VedaEra tracks the latest tools, architectures, and cloud updates.' },
  { icon:'🧭', title:'Structured Learning Path', desc:'No more random YouTube rabbit holes. A clear, ordered roadmap from absolute beginner to production-ready.' },
  { icon:'🌍', title:'Community Driven', desc:'Built to grow with contributions from engineers worldwide. Your knowledge helps the next person land their first DE job.' },
]

export default function HomePage() {
  return (
    <div style={{ background: 'var(--bg)' }}>

      {/* ── Hero ── */}
      <section className="relative flex flex-col items-center justify-center text-center px-4 pt-32 pb-20 min-h-screen overflow-hidden">
        {/* Ambient orbs — dark mode only */}
        <div className="dark:block hidden pointer-events-none">
          <div className="absolute -top-40 right-0 w-[600px] h-[600px] rounded-full opacity-60" style={{ background: 'radial-gradient(circle, rgba(0,194,255,0.06) 0%, transparent 70%)', filter: 'blur(60px)' }} />
          <div className="absolute bottom-0 -left-20 w-[500px] h-[500px] rounded-full opacity-50" style={{ background: 'radial-gradient(circle, rgba(123,97,255,0.06) 0%, transparent 70%)', filter: 'blur(80px)' }} />
        </div>

        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-mono border mb-8 animate-fade-in"
          style={{ background: 'var(--accent-glow)', borderColor: 'rgba(0,120,212,0.25)', color: 'var(--accent)' }}>
          <span className="w-1.5 h-1.5 rounded-full inline-block" style={{ background: 'var(--accent)', animation: 'pulseDot 2s ease-in-out infinite' }} />
          Free · Open · Community Driven
        </div>

        <h1 className="font-display font-extrabold leading-[1.06] tracking-tight max-w-4xl animate-fade-up"
          style={{ fontSize: 'clamp(2.8rem,7vw,5.5rem)', color: 'var(--text)' }}>
          Master{' '}
          <span style={{ color: 'var(--accent)' }}>Data Engineering</span>
          <br />& <span style={{ color: 'var(--gold)' }}>Cloud</span> from{' '}
          <span style={{ color: 'var(--accent2)' }}>First Principles</span>
        </h1>

        <p className="mt-6 max-w-xl text-lg leading-relaxed animate-fade-up" style={{ color: 'var(--muted)', animationDelay:'0.1s' }}>
          Free tutorials, real-world projects, and interview prep covering Azure, AWS, GCP, Apache Iceberg, Delta Lake, Spark, and the entire modern data stack.
        </p>

        <div className="flex items-center gap-3 mt-8 flex-wrap justify-center animate-fade-up" style={{ animationDelay: '0.2s' }}>
          <Link href="/learn/roadmap" className="btn-primary">
            Start the Roadmap <ArrowRight size={15} />
          </Link>
          <Link href="/learn/projects" className="btn-secondary">
            View Projects
          </Link>
        </div>

        {/* Stats */}
        <div className="flex items-center gap-10 mt-14 pt-10 flex-wrap justify-center animate-fade-up"
          style={{ borderTop: '1px solid var(--border)', animationDelay: '0.3s' }}>
          {[['200+','Tutorials'],['6','End-to-End Projects'],['3','Cloud Platforms'],['100%','Free Forever']].map(([n,l]) => (
            <div key={l} className="text-center">
              <div className="font-display font-bold text-3xl tracking-tight" style={{ color: 'var(--accent)' }}>{n}</div>
              <div className="text-xs font-mono uppercase tracking-wider mt-1" style={{ color: 'var(--muted)' }}>{l}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Ticker ── */}
      <div className="overflow-hidden py-4 border-y" style={{ borderColor: 'var(--border)', background: 'var(--bg2)' }}>
        <div className="flex gap-10 whitespace-nowrap" style={{ animation: 'ticker 35s linear infinite' }}>
          {tickerItems.map((item, i) => (
            <span key={i} className="flex items-center gap-2 text-xs font-mono flex-shrink-0" style={{ color: 'var(--muted)' }}>
              <span className="w-1 h-1 rounded-full inline-block flex-shrink-0" style={{ background: 'var(--accent)' }} />
              {item}
            </span>
          ))}
        </div>
      </div>

      {/* ── Roadmap ── */}
      <section className="py-24 px-4" style={{ background: 'var(--bg2)' }}>
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <span className="section-tag">// Learning Path</span>
            <h2 className="font-display font-bold text-4xl tracking-tight mt-2" style={{ color: 'var(--text)' }}>
              Your Complete Data Engineering Roadmap
            </h2>
            <p className="mt-3 text-base max-w-md mx-auto" style={{ color: 'var(--muted)' }}>
              Six structured sections to take you from zero to job-ready.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {roadmapSections.map(s => (
              <Link key={s.num} href={s.href}
                className="card p-6 block group"
                style={{ '--card-accent': s.color } as React.CSSProperties}>
                <div className="text-3xl mb-3">{s.icon}</div>
                <div className="text-xs font-mono mb-1.5" style={{ color: 'var(--muted)' }}>SECTION {s.num}</div>
                <h3 className="font-display font-bold text-lg mb-2" style={{ color: 'var(--text)' }}>{s.title}</h3>
                <p className="text-sm leading-relaxed mb-4" style={{ color: 'var(--muted)' }}>{s.desc}</p>
                <div className="flex flex-wrap gap-1.5">
                  {s.topics.map(t => (
                    <span key={t} className="tag">{t}</span>
                  ))}
                </div>
                <div className="flex items-center gap-1 mt-4 text-xs font-mono opacity-0 group-hover:opacity-100 transition-opacity" style={{ color: s.color }}>
                  Start learning <ChevronRight size={12} />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── Cloud Tracks ── */}
      <section className="py-24 px-4" id="cloud">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <span className="section-tag">// Cloud Platforms</span>
            <h2 className="font-display font-bold text-4xl tracking-tight mt-2" style={{ color: 'var(--text)' }}>
              Three Cloud Tracks. One Platform.
            </h2>
            <p className="mt-3 text-base max-w-md mx-auto" style={{ color: 'var(--muted)' }}>
              Learn Azure, AWS, and GCP in structured, service-by-service tutorials.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {cloudTracks.map(track => (
              <Link key={track.name} href={track.href}
                className="card p-6 block group relative overflow-hidden">
                <div className="absolute inset-0 opacity-5 pointer-events-none"
                  style={{ background: `radial-gradient(circle at top left, ${track.color}, transparent)` }} />
                <div className="flex items-center gap-2 mb-5">
                  <span className="text-xl">{track.emoji}</span>
                  <span className="font-display font-bold text-base" style={{ color: 'var(--text)' }}>{track.name}</span>
                  <span className="ml-auto text-xs font-mono px-2 py-0.5 rounded"
                    style={{ background: `${track.color}20`, color: track.color }}>{track.badge}</span>
                </div>
                <ul className="space-y-2">
                  {track.services.map(s => (
                    <li key={s} className="flex items-center gap-2 text-sm" style={{ color: 'var(--text2)' }}>
                      <ChevronRight size={12} style={{ color: 'var(--accent)', flexShrink: 0 }} />
                      {s}
                    </li>
                  ))}
                </ul>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── Modern Stack ── */}
      <section className="py-24 px-4" style={{ background: 'var(--bg2)' }}>
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <span className="section-tag">// Modern Data Stack</span>
            <h2 className="font-display font-bold text-4xl tracking-tight mt-2" style={{ color: 'var(--text)' }}>
              The Tools Companies Are Hiring For
            </h2>
            <p className="mt-3 text-base max-w-md mx-auto" style={{ color: 'var(--muted)' }}>
              Open source and cloud-native tools that define modern data engineering.
            </p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
            {modernStack.map(item => (
              <Link key={item.name} href={item.href}
                className="card p-4 flex items-center gap-3 group">
                <span className="text-xl flex-shrink-0">{item.emoji}</span>
                <div>
                  <div className="font-display font-semibold text-sm" style={{ color: 'var(--text)' }}>{item.name}</div>
                  <div className="text-xs font-mono mt-0.5" style={{ color: 'var(--muted)' }}>{item.type}</div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── Projects ── */}
      <section className="py-24 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <span className="section-tag">// Real World Projects</span>
            <h2 className="font-display font-bold text-4xl tracking-tight mt-2" style={{ color: 'var(--text)' }}>
              Build. Don&apos;t Just Read.
            </h2>
            <p className="mt-3 text-base max-w-md mx-auto" style={{ color: 'var(--muted)' }}>
              End-to-end projects with full code, architecture diagrams, and GitHub repos.
            </p>
          </div>
          <div className="flex flex-col gap-3">
            {projects.map(p => (
              <Link key={p.num} href={p.href}
                className="card p-5 md:p-6 flex flex-col md:flex-row md:items-center gap-4 group">
                <div className="font-display font-extrabold text-5xl tracking-tighter flex-shrink-0 w-16"
                  style={{ color: 'var(--border2)' }}>{p.num}</div>
                <div className="flex-1 min-w-0">
                  <div className="font-display font-semibold text-base mb-1" style={{ color: 'var(--text)' }}>{p.title}</div>
                  <div className="text-sm leading-relaxed" style={{ color: 'var(--muted)' }}>{p.desc}</div>
                </div>
                <div className="flex items-center gap-2 flex-wrap md:flex-col md:items-end">
                  <div className="flex flex-wrap gap-1.5">
                    {p.tags.map(t => <span key={t} className="tag">{t}</span>)}
                  </div>
                  <span className={`text-xs font-mono px-3 py-1 rounded-full mt-1 ${p.status === 'live' ? 'text-green-500' : ''}`}
                    style={{
                      background: p.status === 'live' ? 'rgba(0,230,118,0.1)' : 'rgba(255,165,0,0.1)',
                      color: p.status === 'live' ? 'var(--green)' : '#ffa726',
                      border: `1px solid ${p.status === 'live' ? 'rgba(0,230,118,0.2)' : 'rgba(255,165,0,0.2)'}`,
                    }}>
                    {p.status === 'live' ? '✓ Live' : 'Coming Soon'}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── Why VedaEra ── */}
      <section className="py-24 px-4" style={{ background: 'var(--bg2)' }}>
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <span className="section-tag">// Why VedaEra</span>
            <h2 className="font-display font-bold text-4xl tracking-tight mt-2" style={{ color: 'var(--text)' }}>
              Built by an Engineer. For Engineers.
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {whyItems.map(w => (
              <div key={w.title} className="p-2">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center text-lg mb-3"
                  style={{ background: 'var(--accent-glow)', border: '1px solid rgba(0,120,212,0.15)' }}>{w.icon}</div>
                <h3 className="font-display font-semibold text-base mb-2" style={{ color: 'var(--text)' }}>{w.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: 'var(--muted)' }}>{w.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-24 px-4" style={{ background: 'var(--bg)' }}>
        <div className="max-w-3xl mx-auto">
          <div className="rounded-2xl p-12 text-center relative overflow-hidden"
            style={{ background: 'linear-gradient(135deg, var(--accent-glow), rgba(123,97,255,0.06))', border: '1px solid rgba(0,120,212,0.15)' }}>
            <div className="absolute inset-0 pointer-events-none"
              style={{ background: 'radial-gradient(circle at center, var(--accent-glow) 0%, transparent 70%)' }} />
            <h2 className="font-display font-extrabold text-4xl tracking-tight mb-4 relative" style={{ color: 'var(--text)' }}>
              Ready to become a<br /><span style={{ color: 'var(--accent)' }}>Data Engineer?</span>
            </h2>
            <p className="text-base mb-8 relative" style={{ color: 'var(--muted)' }}>
              Start with the roadmap. Build a real project. Get the job.
            </p>
            <Link href="/learn/roadmap" className="btn-primary text-base px-8 py-3 relative">
              Begin the Roadmap <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

    </div>
  )
}
