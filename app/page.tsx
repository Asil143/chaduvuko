'use client'
import { NewsletterSignup } from '@/components/ui/NewsletterSignup'
import Link from 'next/link'
import { ArrowRight, ChevronRight, BookOpen, Code2, Trophy } from 'lucide-react'
import { useEffect, useState } from 'react'
import { HomeToolsSection } from '@/components/ui/HomeToolsSection'

const tickerItems = [
  'Apache Iceberg','Delta Lake','Azure Data Factory','Apache Spark',
  'Medallion Architecture','AWS Glue','Data Mesh','BigQuery',
  'Azure Databricks','Zero-ETL','Microsoft Fabric','Apache Kafka',
  'dbt','Lakehouse Architecture','Azure Synapse','Apache Airflow',
  'Pub/Sub','Cloud Dataflow','Amazon Redshift','Amazon Kinesis',
  'Apache Iceberg','Delta Lake','Azure Data Factory','Apache Spark',
  'Medallion Architecture','AWS Glue','Data Mesh','BigQuery',
  'Azure Databricks','Zero-ETL','Microsoft Fabric','Apache Kafka',
  'dbt','Lakehouse Architecture','Azure Synapse','Apache Airflow',
  'Pub/Sub','Cloud Dataflow','Amazon Redshift','Amazon Kinesis',
]

const floatingCards = [
  { icon: '⚡', label: 'Apache Spark', sub: 'Distributed Computing', color: '#f5c542', x: '8%', y: '18%', delay: '0s' },
  { icon: '🧊', label: 'Apache Iceberg', sub: 'Open Table Format', color: '#00c2ff', x: '85%', y: '14%', delay: '0.4s' },
  { icon: '△', label: 'Delta Lake', sub: 'ACID Transactions', color: '#7b61ff', x: '88%', y: '62%', delay: '0.8s' },
  { icon: '🔄', label: 'Apache Airflow', sub: 'Orchestration', color: '#00e676', x: '6%', y: '70%', delay: '1.2s' },
  { icon: '📨', label: 'Apache Kafka', sub: 'Event Streaming', color: '#ff6b6b', x: '78%', y: '38%', delay: '0.6s' },
  { icon: '🔧', label: 'dbt', sub: 'Transformation', color: '#ff9800', x: '14%', y: '44%', delay: '1s' },
]

const cloudBadges = [
  { name: 'Azure', color: '#0078d4', icon: '☁️', href: '/learn/azure/introduction' },
  { name: 'AWS', color: '#ff9900', icon: '🟠', href: '/learn/aws/introduction' },
  { name: 'GCP', color: '#4285f4', icon: '🔵', href: '/learn/gcp/introduction' },
]

const roadmapSections = [
  { num:'01', icon:'🧱', title:'Foundations', color:'#00c2ff', desc:'SQL, Python, Git, Linux — the non-negotiables before any cloud service.', href:'/learn/what-is-data-engineering' },
  { num:'02', icon:'☁️', title:'Cloud Platforms', color:'#0078d4', desc:'Azure, AWS, and GCP — three complete tracks, service by service.', href:'/learn/azure/introduction' },
  { num:'03', icon:'⚙️', title:'Core DE Concepts', color:'#7b61ff', desc:'ETL, batch, streaming, Lakehouse, Data Mesh — timeless architecture patterns.', href:'/learn/what-is-data-engineering' },
  { num:'04', icon:'🔥', title:'Modern Stack', color:'#f5c542', desc:'Iceberg, Spark, Kafka, dbt, Airflow — what companies are actively hiring for.', href:'/learn/projects' },
  { num:'05', icon:'🏗️', title:'Real Projects', color:'#00e676', desc:'End-to-end pipelines with full code, diagrams and GitHub repos.', href:'/learn/projects' },
  { num:'06', icon:'🎯', title:'Interview Prep', color:'#ff6b6b', desc:'Top questions, system design walkthroughs, and resume tips.', href:'/learn/interview' },
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
  { num:'01', title:'Retail Sales Batch Pipeline — Azure', desc:'Medallion Architecture using ADF, Databricks, ADLS Gen2, and Synapse Analytics.', tags:['ADF','Databricks','Synapse','Delta Lake'], status:'live', href:'/learn/projects/azure-batch-pipeline' },
  { num:'02', title:'Real-Time Stock Streaming — Azure', desc:'Event Hubs, Stream Analytics, and Power BI real-time dashboard.', tags:['Event Hubs','Stream Analytics','Power BI'], status:'soon', href:'/learn/projects' },
  { num:'03', title:'Lambda Architecture — Batch + Stream', desc:'Production-grade e-commerce platform combining batch and real-time data.', tags:['Databricks','Event Hubs','ADF','Synapse'], status:'soon', href:'/learn/projects' },
  { num:'04', title:'End-to-End Pipeline — AWS', desc:'S3, AWS Glue, Redshift, and Kinesis on Amazon Web Services.', tags:['S3','Glue','Redshift','Kinesis'], status:'soon', href:'/learn/projects' },
  { num:'05', title:'BigQuery Analytics — GCP', desc:'BigQuery, Dataflow, Pub/Sub, and Looker Studio on Google Cloud.', tags:['BigQuery','Dataflow','Pub/Sub','Looker'], status:'soon', href:'/learn/projects' },
  { num:'06', title:'Multi-Cloud Lakehouse with Iceberg', desc:'One open lakehouse spanning Azure, AWS, and GCP using Apache Iceberg.', tags:['Iceberg','Azure','AWS','GCP'], status:'soon', href:'/learn/projects' },
]

// Animated counter hook
function useCounter(target: number, duration: number = 2000) {
  const [count, setCount] = useState(0)
  useEffect(() => {
    let start = 0
    const step = target / (duration / 16)
    const timer = setInterval(() => {
      start += step
      if (start >= target) { setCount(target); clearInterval(timer) }
      else setCount(Math.floor(start))
    }, 16)
    return () => clearInterval(timer)
  }, [target, duration])
  return count
}

function AnimatedStat({ value, suffix, label }: { value: number; suffix: string; label: string }) {
  const count = useCounter(value, 1800)
  return (
    <div className="text-center">
      <div className="font-display font-black text-4xl md:text-5xl tracking-tight" style={{ color: 'var(--accent)' }}>
        {count}{suffix}
      </div>
      <div className="text-xs font-mono uppercase tracking-widest mt-1.5" style={{ color: 'var(--muted)' }}>{label}</div>
    </div>
  )
}

export default function HomePage() {
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])

  return (
    <div style={{ background: 'var(--bg)' }}>

      {/* ── HERO ── */}
      <section className="relative flex flex-col items-center justify-center text-center px-4 pt-28 pb-16 min-h-screen overflow-hidden">

        {/* Background gradient blobs */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[600px] rounded-full opacity-30 dark:opacity-100"
            style={{ background: 'radial-gradient(ellipse, rgba(0,120,212,0.08) 0%, transparent 70%)', filter: 'blur(40px)' }} />
          <div className="absolute -top-32 -right-32 w-[500px] h-[500px] rounded-full opacity-20 dark:opacity-100"
            style={{ background: 'radial-gradient(circle, rgba(123,97,255,0.1) 0%, transparent 70%)', filter: 'blur(60px)' }} />
          <div className="absolute -bottom-20 -left-20 w-[400px] h-[400px] rounded-full opacity-20 dark:opacity-100"
            style={{ background: 'radial-gradient(circle, rgba(0,194,255,0.08) 0%, transparent 70%)', filter: 'blur(80px)' }} />
          {/* Grid pattern */}
          <div className="absolute inset-0 opacity-[0.025] dark:opacity-[0.04]"
            style={{ backgroundImage: 'linear-gradient(var(--border2) 1px, transparent 1px), linear-gradient(90deg, var(--border2) 1px, transparent 1px)', backgroundSize: '60px 60px' }} />
        </div>

        {/* Floating tech cards — hidden on mobile */}
        {mounted && floatingCards.map((card, i) => (
          <div key={i}
            className="absolute hidden xl:flex items-center gap-2.5 px-3 py-2 rounded-xl pointer-events-none"
            style={{
              left: card.x, top: card.y,
              background: 'var(--surface)',
              border: '1px solid var(--border)',
              boxShadow: 'var(--shadow)',
              animation: `floatCard 4s ease-in-out ${card.delay} infinite`,
              opacity: 0.85,
            }}>
            <span className="text-lg">{card.icon}</span>
            <div>
              <div className="text-xs font-display font-semibold leading-tight" style={{ color: 'var(--text)' }}>{card.label}</div>
              <div className="text-xs font-mono" style={{ color: 'var(--muted)', fontSize: '0.6rem' }}>{card.sub}</div>
            </div>
          </div>
        ))}

        {/* Badge */}
        <div className="relative inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-mono border mb-6"
          style={{ background: 'var(--accent-glow)', borderColor: 'rgba(0,120,212,0.25)', color: 'var(--accent)' }}>
          <span className="w-1.5 h-1.5 rounded-full inline-block flex-shrink-0" style={{ background: 'var(--accent)', animation: 'pulseDot 2s ease-in-out infinite' }} />
          Free · Open · Community Driven · No Paywall Ever
        </div>

        {/* Main headline */}
        <h1 className="relative font-display font-extrabold leading-[1.04] tracking-tight max-w-5xl"
          style={{ fontSize: 'clamp(2.6rem, 7.5vw, 6rem)', color: 'var(--text)' }}>
          The Free Platform to{' '}
          <span className="relative inline-block">
            <span style={{
              background: 'linear-gradient(135deg, var(--accent) 0%, #7b61ff 50%, var(--accent) 100%)',
              backgroundSize: '200% 200%',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              animation: 'gradientShift 4s ease infinite',
            }}>Master</span>
          </span>
          {' '}Data Engineering
        </h1>

        <p className="relative mt-5 max-w-2xl text-lg md:text-xl leading-relaxed"
          style={{ color: 'var(--muted)', fontFamily: 'Lora, serif', fontStyle: 'italic' }}>
          Tutorials, real-world projects, and interview prep covering Azure, AWS, GCP,
          Apache Iceberg, Delta Lake, Spark, and the entire modern data stack.
          Built by <span style={{ background: 'linear-gradient(135deg, #F59E0B, #FCD34D)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', fontWeight: 700 }}>Asil</span> · Free forever.
        </p>

        {/* Cloud badges */}
        <div className="relative flex items-center gap-3 mt-6 flex-wrap justify-center">
          {cloudBadges.map(b => (
            <Link key={b.name} href={b.href}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono font-semibold transition-all hover:scale-105"
              style={{ background: `${b.color}12`, border: `1px solid ${b.color}30`, color: b.color }}>
              {b.icon} {b.name} Track
            </Link>
          ))}
        </div>

        {/* CTA buttons */}
        <div className="relative flex items-center gap-3 mt-8 flex-wrap justify-center">
          <Link href="/learn/roadmap" className="btn-primary text-base px-7 py-3">
            Start the Roadmap <ArrowRight size={16} />
          </Link>
          <Link href="/learn/projects/azure-batch-pipeline" className="btn-secondary text-base px-7 py-3">
            <BookOpen size={15} /> Project 1: Live Now
          </Link>
        </div>

        {/* Animated stats */}
        <div className="relative flex items-center gap-10 md:gap-16 mt-14 pt-10 flex-wrap justify-center"
          style={{ borderTop: '1px solid var(--border)' }}>
          <AnimatedStat value={200} suffix="+" label="Tutorials" />
          <AnimatedStat value={6} suffix="" label="Projects" />
          <AnimatedStat value={3} suffix="" label="Cloud Platforms" />
          <AnimatedStat value={100} suffix="%" label="Free Forever" />
        </div>
      </section>

      {/* ── Ticker ── */}
      <div className="overflow-hidden py-3 border-y" style={{ borderColor: 'var(--border)', background: 'var(--bg2)' }}>
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
            <h2 className="font-display font-bold tracking-tight mt-2" style={{ fontSize: 'clamp(1.75rem,4vw,2.75rem)', color: 'var(--text)' }}>
              Your Complete Data Engineering Roadmap
            </h2>
            <p className="mt-3 text-base max-w-md mx-auto" style={{ color: 'var(--muted)' }}>
              Six structured sections to take you from zero to job-ready.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {roadmapSections.map(s => (
              <Link key={s.num} href={s.href} className="card p-6 block group">
                <div className="text-3xl mb-3">{s.icon}</div>
                <div className="text-xs font-mono mb-1.5" style={{ color: 'var(--muted)' }}>SECTION {s.num}</div>
                <h3 className="font-display font-bold text-lg mb-2" style={{ color: 'var(--text)' }}>{s.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: 'var(--muted)' }}>{s.desc}</p>
                <div className="flex items-center gap-1 mt-4 text-xs font-mono opacity-0 group-hover:opacity-100 transition-opacity" style={{ color: s.color }}>
                  Start learning <ChevronRight size={12} />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── Cloud Tracks ── */}
      <section className="py-24 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <span className="section-tag">// Cloud Platforms</span>
            <h2 className="font-display font-bold tracking-tight mt-2" style={{ fontSize: 'clamp(1.75rem,4vw,2.75rem)', color: 'var(--text)' }}>
              Three Cloud Tracks. One Platform.
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {[
              { name:'Microsoft Azure', emoji:'☁️', color:'#0078d4', badge:'FEATURED', services:['ADLS Gen2','Azure Data Factory','Azure Databricks','Azure Synapse','Event Hubs','Stream Analytics','Microsoft Fabric'], href:'/learn/azure/introduction' },
              { name:'Amazon Web Services', emoji:'🟠', color:'#ff9900', badge:'AWS', services:['Amazon S3','AWS Glue','Amazon Redshift','Amazon Kinesis','Step Functions','Lake Formation','Amazon Athena'], href:'/learn/aws/introduction' },
              { name:'Google Cloud Platform', emoji:'🔵', color:'#4285f4', badge:'GCP', services:['Google BigQuery','Cloud Dataflow','Cloud Pub/Sub','Cloud Composer','Dataproc','Cloud Storage','Looker Studio'], href:'/learn/gcp/introduction' },
            ].map(track => (
              <Link key={track.name} href={track.href} className="card p-6 block group relative overflow-hidden">
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
                      <ChevronRight size={12} style={{ color: 'var(--accent)', flexShrink:0 }} />{s}
                    </li>
                  ))}
                </ul>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── Modern Stack + Salary ── */}
      <HomeToolsSection />

      {/* ── Projects ── */}
      <section className="py-24 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <span className="section-tag">// Real World Projects</span>
            <h2 className="font-display font-bold tracking-tight mt-2" style={{ fontSize: 'clamp(1.75rem,4vw,2.75rem)', color: 'var(--text)' }}>
              Build. Don&apos;t Just Read.
            </h2>
            <p className="mt-3 text-base max-w-md mx-auto" style={{ color: 'var(--muted)' }}>
              End-to-end projects with full code, architecture diagrams, and GitHub repos.
            </p>
          </div>
          <div className="flex flex-col gap-3">
            {projects.map(p => (
              <Link key={p.num} href={p.href} className="card p-5 md:p-6 flex flex-col md:flex-row md:items-center gap-4 group">
                <div className="font-display font-extrabold text-5xl tracking-tighter flex-shrink-0 w-16" style={{ color: 'var(--border2)' }}>{p.num}</div>
                <div className="flex-1 min-w-0">
                  <div className="font-display font-semibold text-base mb-1" style={{ color: 'var(--text)' }}>{p.title}</div>
                  <div className="text-sm leading-relaxed" style={{ color: 'var(--muted)' }}>{p.desc}</div>
                </div>
                <div className="flex items-center gap-2 flex-wrap md:flex-col md:items-end">
                  <div className="flex flex-wrap gap-1.5">{p.tags.map(t => <span key={t} className="tag">{t}</span>)}</div>
                  <span className="text-xs font-mono px-3 py-1 rounded-full mt-1"
                    style={{ background: p.status==='live' ? 'rgba(0,230,118,0.1)' : 'rgba(255,165,0,0.1)', color: p.status==='live' ? 'var(--green)' : '#ffa726', border: `1px solid ${p.status==='live' ? 'rgba(0,230,118,0.2)' : 'rgba(255,165,0,0.2)'}` }}>
                    {p.status === 'live' ? '✓ Live' : 'Coming Soon'}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── Why Asil ── */}
      <section className="py-24 px-4" style={{ background: 'var(--bg2)' }}>
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <span className="section-tag">// Why Asil</span>
            <h2 className="font-display font-bold tracking-tight mt-2" style={{ fontSize: 'clamp(1.75rem,4vw,2.75rem)', color: 'var(--text)' }}>
              Built by <span style={{ background: 'linear-gradient(135deg, #F59E0B, #FCD34D)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>Asil</span>. For Engineers.
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon:'🆓', title:'100% Free Forever', desc:'Every tutorial, every project, every interview question. No paywalls, no subscriptions, no credit card required.' },
              { icon:'🛠️', title:'Real Projects, Real Code', desc:'Not just theory. Every concept is backed by working code you can run yourself on Azure, AWS, or GCP.' },
              { icon:'🎯', title:'Job-Market Focused', desc:'Content curated based on what companies are actively hiring for — not what was relevant five years ago.' },
              { icon:'📡', title:'Always Up to Date', desc:'The data engineering landscape changes fast. This site tracks the latest tools, architectures, and cloud updates — kept current by Asil.' },
              { icon:'🧭', title:'Structured Learning Path', desc:'No more random YouTube rabbit holes. A clear, ordered roadmap from absolute beginner to production-ready.' },
              { icon:'🌍', title:'Community Driven', desc:'Built to grow with contributions from engineers worldwide. Your knowledge helps the next person land their first DE job.' },
            ].map(w => (
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

      {/* ── Newsletter CTA ── */}
      <section className="py-24 px-4">
        <div className="max-w-3xl mx-auto">
          <div className="rounded-2xl p-10 md:p-14 text-center relative overflow-hidden"
            style={{ background: 'linear-gradient(135deg, var(--accent-glow), rgba(123,97,255,0.06))', border: '1px solid rgba(0,120,212,0.15)' }}>
            <div className="absolute inset-0 pointer-events-none"
              style={{ background: 'radial-gradient(circle at center, var(--accent-glow) 0%, transparent 70%)' }} />
            <div className="relative">
              <div className="text-4xl mb-4">🚀</div>
              <h2 className="font-display font-extrabold tracking-tight mb-3" style={{ fontSize: 'clamp(1.75rem,4vw,2.5rem)', color: 'var(--text)' }}>
                Ready to become a<br /><span style={{ color: 'var(--accent)' }}>Data Engineer?</span>
              </h2>
              <p className="text-base mb-8" style={{ color: 'var(--muted)' }}>
                Start with the roadmap. Build a real project. Get the job. Built by Asil — free forever.
              </p>
              <div className="flex items-center gap-3 justify-center flex-wrap mb-8">
                <Link href="/learn/roadmap" className="btn-primary text-base px-8 py-3">
                  Begin the Roadmap <ArrowRight size={16} />
                </Link>
              </div>
              <div className="max-w-md mx-auto">
                <NewsletterSignup compact={true} />
              </div>
            </div>
          </div>
        </div>
      </section>

      <style>{`
        @keyframes floatCard {
          0%, 100% { transform: translateY(0px); }
          50%       { transform: translateY(-10px); }
        }
        @keyframes gradientShift {
          0%, 100% { background-position: 0% 50%; }
          50%       { background-position: 100% 50%; }
        }
      `}</style>
    </div>
  )
}