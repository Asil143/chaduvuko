import { LearnLayout } from '@/components/content/LearnLayout'
import { Callout } from '@/components/content/Callout'
import { KeyTakeaways } from '@/components/content/KeyTakeaways'
import Link from 'next/link'
import { ChevronRight, ExternalLink } from 'lucide-react'

export const metadata = { title: 'Data Engineering on Microsoft Azure' }

const cyclePhases = [
  { num:'1', phase:'Source', name:'Identify & connect to data sources', desc:'Every project starts by understanding where data lives. SQL Server on-premises, SaaS apps, partner files, IoT devices, web events — your first job is to find it all and understand the format.', services:'Azure SQL, Cosmos DB, on-prem SQL Server, REST APIs, Event Hubs' },
  { num:'2', phase:'Ingest', name:'Move data into the Azure ecosystem', desc:'Azure Data Factory (ADF) connects to 90+ source types and moves data in a controlled, reliable way on a schedule or trigger. For real-time data, Event Hubs captures the stream.', services:'Azure Data Factory (ADF), Azure Event Hubs, Azure IoT Hub' },
  { num:'3', phase:'Store', name:'Land raw data in the data lake — Bronze layer', desc:'Raw data lands in ADLS Gen2 in its original, unmodified form. This is your permanent archive. You never delete raw data, because you may need to reprocess it later with different logic.', services:'Azure Data Lake Storage Gen2 (ADLS Gen2)' },
  { num:'4', phase:'Transform', name:'Clean, enrich and aggregate — Silver & Gold layers', desc:'This is where the real data engineering work happens. Azure Databricks uses PySpark to clean duplicates, fill nulls, apply business logic, join datasets, and aggregate data at scale.', services:'Azure Databricks, Synapse Spark Pools, Azure Stream Analytics (real-time)' },
  { num:'5', phase:'Serve', name:'Expose clean data for consumption', desc:'Gold data loads into Azure Synapse Analytics. Data analysts and Power BI can now query it using familiar SQL. Synapse provides a fast, scalable SQL interface over the Delta Lake.', services:'Azure Synapse Analytics, Power BI, Azure Analysis Services' },
  { num:'6', phase:'Orchestrate', name:'Automate the entire flow end-to-end', desc:'ADF orchestrates the whole workflow — triggering ingestion, running Databricks notebooks in sequence, handling failures gracefully, alerting on errors. It\'s the glue holding everything together.', services:'Azure Data Factory — orchestration layer across all services' },
  { num:'7', phase:'Secure & Govern', name:'Protect data and control access', desc:'Azure Key Vault stores all secrets and connection strings. Role-based access control (RBAC) and Microsoft Purview govern data lineage, classification, and who can access what.', services:'Azure Key Vault, Microsoft Purview, Azure Active Directory, RBAC' },
  { num:'8', phase:'Monitor & Optimize', name:'Keep pipelines healthy in production', desc:'Azure Monitor and ADF\'s built-in monitoring give you visibility into failures, performance, and data quality. Optimization is continuous — partitioning, cluster tuning, caching.', services:'Azure Monitor, ADF Monitoring, Databricks Cluster Logs, Log Analytics' },
]

const azureServices = [
  { abbr:'ADLS Gen2', name:'Azure Data Lake Storage Gen2', desc:'Central storage for all layers — Bronze, Silver, Gold. Built on Blob Storage with a hierarchical file system optimized for big data workloads.', cat:'Storage', catColor:'#00c2ff', href:'/learn/azure/adls-gen2' },
  { abbr:'ADF', name:'Azure Data Factory', desc:'Orchestration and integration engine. Connects 90+ data sources, moves data, runs Databricks notebooks, and schedules everything.', cat:'Ingest & Orchestrate', catColor:'#00e676', href:'/learn/azure/adf' },
  { abbr:'ADB', name:'Azure Databricks', desc:'Apache Spark as a fully managed service. Where you write PySpark code to transform large datasets. Supports Delta Lake natively.', cat:'Processing', catColor:'#f5c542', href:'/learn/azure/databricks' },
  { abbr:'ASA', name:'Azure Synapse Analytics', desc:'Unified analytics platform combining data warehousing and big data. The SQL serving layer analysts use to query Gold data.', cat:'Serving', catColor:'#7b61ff', href:'/learn/azure/synapse' },
  { abbr:'AEH', name:'Azure Event Hubs', desc:'High-throughput message broker for real-time data streams. Azure\'s equivalent of Apache Kafka. Captures millions of events per second.', cat:'Streaming', catColor:'#ff9800' },
  { abbr:'AKV', name:'Azure Key Vault', desc:'Secure storage for secrets, connection strings, API keys, and certificates. Never hardcode credentials — always use Key Vault.', cat:'Security', catColor:'#ff5252' },
  { abbr:'Fabric', name:'Microsoft Fabric', desc:'Microsoft\'s newest all-in-one analytics platform. Unifies Synapse, Power BI, ADF, and more under a single SaaS experience. The future.', cat:'Modern Platform', catColor:'#00c2ff' },
]

const certPath = [
  { level:'Fundamentals', color:'#00e676', name:'AZ-900 — Azure Fundamentals', note:'Optional but useful · Start here if Azure is brand new to you' },
  { level:'Fundamentals', color:'#00e676', name:'DP-900 — Azure Data Fundamentals', note:'Recommended starting point · Covers core data concepts on Azure' },
  { level:'Associate ⭐', color:'#00c2ff', name:'DP-203 — Azure Data Engineer Associate', note:'The most important one · Put this on your resume ASAP' },
  { level:'Expert', color:'#f5c542', name:'DP-300 — Azure Database Administrator Associate', note:'Optional specialization' },
]

export default function AzureIntroductionPage() {
  return (
    <LearnLayout
      title="Data Engineering on Microsoft Azure"
      description="Azure is the dominant cloud platform for enterprise data engineering. This section explains why Azure, what roles exist, how the architecture cycle works, and which services you'll actually use on the job."
      section="Section 02 · Cloud Platforms · Azure Track"
      readTime="18 min read"
      updatedAt="March 2025"
      breadcrumbs={[
        { label: 'Cloud Platforms', href: '/learn/azure/introduction' },
        { label: 'Azure Introduction', href: '/learn/azure/introduction' },
      ]}
    >

      <h2 id="why-azure">Why Azure? Why not just learn AWS or GCP?</h2>
      <p>
        This is a fair question. AWS is the biggest cloud. GCP has some impressive tools. So why start with Azure?
      </p>
      <p>
        The honest answer is that Azure dominates in enterprise companies — the large corporations, banks, hospitals, government agencies, and global retailers that make up the majority of well-paying data engineering jobs. If you look at job postings for data engineers requiring cloud experience, Azure appears more than any other cloud in enterprise contexts. Microsoft has been selling software to these organizations for decades, and Azure is the natural extension of that existing relationship.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 my-6">
        {[
          { icon:'🏢', title:'Enterprise dominant', desc:'Fortune 500 companies, banks, and healthcare systems overwhelmingly run on Azure. That\'s where the jobs are.' },
          { icon:'🔗', title:'Deep Microsoft integration', desc:'If a company uses Office 365, Teams, or SQL Server, Azure integrates seamlessly. Most enterprises already do.' },
          { icon:'💼', title:'H1B-friendly employers', desc:'Companies that sponsor H1B — Cognizant, Infosys, TCS, Accenture, Capgemini — heavily use Azure for client projects.' },
          { icon:'📜', title:'Strong certification path', desc:'DP-900 and DP-203 are well-recognized certifications that carry real weight on a resume without work experience.' },
          { icon:'🧰', title:'Complete toolset', desc:'Azure has a native service for every part of the data engineering lifecycle — ingest, store, process, serve, monitor, secure.' },
          { icon:'🆓', title:'Free tier to learn', desc:'$200 in free credits when you sign up, plus always-free tiers on several services. Enough to build real projects.' },
        ].map(r => (
          <div key={r.title} className="rounded-xl p-4" style={{ background: 'var(--bg2)', border: '1px solid var(--border)' }}>
            <div className="text-xl mb-2">{r.icon}</div>
            <div className="font-display font-semibold text-sm mb-1.5" style={{ color: 'var(--text)' }}>{r.title}</div>
            <p className="text-xs leading-relaxed" style={{ color: 'var(--muted)', fontFamily: 'Lora, serif' }}>{r.desc}</p>
          </div>
        ))}
      </div>

      <Callout type="tip">
        Learning Azure well makes learning AWS or GCP significantly easier later. The core data engineering concepts are the same — only the service names and UI differ. Master the concepts on Azure first, and you can pick up any other cloud relatively quickly.
      </Callout>

      <h2 id="data-roles">Data roles in the Azure ecosystem</h2>
      <p>
        Microsoft defines several distinct roles in the data and analytics world. Understanding these helps you see exactly where a data engineer sits, who they work with, and what skills separate the roles.
      </p>

      <div className="space-y-4 my-6">
        {[
          { num:'01', title:'Azure Data Engineer', badge:'Your Target Role', badgeColor:'#00c2ff', desc:'Designs, builds, and maintains data pipelines and data stores. Responsible for ingesting data from multiple sources, transforming it, and making it available to analysts and scientists. Also ensures pipelines are secure, reliable, and high-performing.', tools:['ADF','Databricks','Synapse','ADLS Gen2','PySpark','Delta Lake'] },
          { num:'02', title:'Azure Data Analyst', badge:'Uses Your Work', badgeColor:'#f5c542', desc:'Takes the clean, processed data that the data engineer provides and turns it into reports, dashboards, and insights that business stakeholders can understand and act on.', tools:['Power BI','SQL','Synapse','Excel'] },
          { num:'03', title:'Azure Data Scientist', badge:'Builds on Your Data', badgeColor:'#7b61ff', desc:'Uses clean, well-structured data to build machine learning models that predict outcomes or uncover patterns humans can\'t see manually. Relies heavily on the data engineer having done the hard work first.', tools:['Azure ML','Databricks ML','Python','Notebooks'] },
          { num:'04', title:'Database Administrator', badge:'Manages the Databases', badgeColor:'#00e676', desc:'Responsible for managing, securing, and optimizing Azure databases. Focuses on uptime, backup, recovery, and access control. More ops-focused than engineering-focused.', tools:['Azure SQL','Cosmos DB','MySQL','PostgreSQL'] },
          { num:'05', title:'Solution Architect', badge:'Designs the System', badgeColor:'#ff9800', desc:'Senior role responsible for designing the entire data platform architecture. Decides which services to use, how they connect, and how data flows through the system. Usually 5+ years of experience before this role.', tools:['All Azure services','Architecture design','Cost optimization'] },
        ].map(role => (
          <div key={role.num} className="rounded-xl p-5" style={{ background: 'var(--bg2)', border: '1px solid var(--border)' }}>
            <div className="flex items-start gap-4">
              <div className="font-display font-black text-4xl tracking-tighter flex-shrink-0" style={{ color: 'var(--border2)', lineHeight: 1 }}>{role.num}</div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                  <span className="font-display font-semibold" style={{ color: 'var(--text)' }}>{role.title}</span>
                  <span className="text-xs font-mono px-2 py-0.5 rounded" style={{ background: `${role.badgeColor}15`, color: role.badgeColor }}>{role.badge}</span>
                </div>
                <p className="text-sm leading-relaxed mb-3" style={{ color: 'var(--text2)', fontFamily: 'Lora, serif' }}>{role.desc}</p>
                <div className="flex flex-wrap gap-1.5">
                  {role.tools.map(t => <span key={t} className="tag">{t}</span>)}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <h2 id="architecture-cycle">The Azure Data Engineering Architecture Cycle</h2>
      <p>
        One of the most important things to understand about working with Azure is that your work follows a structured cycle. Every project you'll ever work on will follow some version of this pattern. Understanding this cycle is what allows you to look at a business problem and immediately know which Azure services to use, in what order, and for what purpose.
      </p>

      <div className="my-6 space-y-0.5">
        {cyclePhases.map((phase, i) => (
          <div key={phase.num} className="grid grid-cols-[48px_1fr] gap-4 group">
            <div className="flex flex-col items-center">
              <div className="w-10 h-10 rounded-full flex items-center justify-center font-display font-bold text-sm flex-shrink-0 z-10"
                style={{ background: 'var(--bg2)', border: '2px solid var(--accent)', color: 'var(--accent)' }}>
                {phase.num}
              </div>
              {i < cyclePhases.length - 1 && (
                <div className="w-0.5 flex-1 my-1" style={{ background: 'linear-gradient(to bottom, rgba(0,194,255,0.3), rgba(0,194,255,0.1))' }} />
              )}
            </div>
            <div className="rounded-xl p-4 mb-2" style={{ background: 'var(--bg2)', border: '1px solid var(--border)' }}>
              <div className="text-xs font-mono mb-1" style={{ color: 'var(--accent)' }}>Phase {phase.num} · {phase.phase}</div>
              <div className="font-display font-semibold text-sm mb-2" style={{ color: 'var(--text)' }}>{phase.name}</div>
              <p className="text-sm leading-relaxed mb-2" style={{ color: 'var(--text2)', fontFamily: 'Lora, serif' }}>{phase.desc}</p>
              <div className="text-xs font-mono" style={{ color: 'var(--muted)' }}><strong style={{ color: 'var(--accent)' }}>Services: </strong>{phase.services}</div>
            </div>
          </div>
        ))}
      </div>

      <Callout type="tip">
        The word "cycle" is deliberate. In practice you constantly loop back. A new data source gets added — go back to Phase 1. A data quality issue is found — revisit Phase 4. The business needs a new report — adjust Phase 5. Being a good data engineer means being comfortable with iteration, not just building something once.
      </Callout>

      <h2 id="azure-services">Key Azure services every data engineer uses</h2>
      <p>
        You don't need to know every Azure service — but you need to know these ones well. They appear in almost every Azure data engineering job posting.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 my-6">
        {azureServices.map(s => (
          <div key={s.abbr} className="rounded-xl p-4 transition-all hover:border-[var(--accent)]"
            style={{ background: 'var(--bg2)', border: '1px solid var(--border)' }}>
            <div className="flex items-start justify-between gap-2 mb-2">
              <div>
                <div className="text-xs font-mono mb-0.5" style={{ color: s.catColor }}>{s.abbr}</div>
                <div className="font-display font-semibold text-sm" style={{ color: 'var(--text)' }}>{s.name}</div>
              </div>
              <span className="text-xs font-mono px-2 py-0.5 rounded flex-shrink-0 mt-1"
                style={{ background: `${s.catColor}12`, color: s.catColor }}>{s.cat}</span>
            </div>
            <p className="text-xs leading-relaxed" style={{ color: 'var(--muted)', fontFamily: 'Lora, serif' }}>{s.desc}</p>
            {s.href && (
              <Link href={s.href} className="flex items-center gap-1 text-xs font-mono mt-3 hover:underline" style={{ color: 'var(--accent)' }}>
                Learn {s.name} <ChevronRight size={10} />
              </Link>
            )}
          </div>
        ))}
      </div>

      <h2 id="certifications">The Azure certification path for data engineers</h2>
      <p>
        Microsoft certifications are one of the most effective ways to prove your skills when you don't have work experience. Recruiters at large companies — especially consulting firms that sponsor H1B — actively look for these on resumes.
      </p>

      <div className="space-y-2 my-6">
        {certPath.map(cert => (
          <div key={cert.name} className="flex items-center gap-3 p-4 rounded-xl" style={{ background: 'var(--bg3)', border: '1px solid var(--border)' }}>
            <span className="text-xs font-mono px-2.5 py-1 rounded flex-shrink-0"
              style={{ background: `${cert.color}15`, color: cert.color }}>{cert.level}</span>
            <div>
              <div className="font-display font-semibold text-sm" style={{ color: 'var(--text)' }}>{cert.name}</div>
              <div className="text-xs font-mono mt-0.5" style={{ color: 'var(--muted)' }}>{cert.note}</div>
            </div>
          </div>
        ))}
      </div>

      <Callout type="azure">
        This Azure track is aligned with the official Microsoft Learn DP-203 learning path.{' '}
        <a href="https://learn.microsoft.com/en-us/training/modules/introduction-to-data-engineering-azure/" target="_blank" rel="noreferrer"
          className="underline inline-flex items-center gap-1" style={{ color: '#50b0ff' }}>
          Introduction to Data Engineering on Azure <ExternalLink size={11} />
        </a>{' '}
        is our primary reference — use it alongside these tutorials.
      </Callout>

      <KeyTakeaways items={[
        'Azure dominates enterprise data engineering — especially important for H1B-sponsored roles at large consulting and tech firms',
        'The Azure data engineering lifecycle has 8 phases: Source → Ingest → Store → Transform → Serve → Orchestrate → Secure → Monitor',
        'ADF orchestrates everything · ADLS Gen2 stores everything · Databricks processes everything · Synapse serves everything',
        'Five roles: Data Engineer (your target), Data Analyst, Data Scientist, DBA, and Solution Architect',
        'DP-203 (Azure Data Engineer Associate) is the most important certification to get as early as possible',
        'Key Vault must be used for all credentials — never hardcode connection strings in notebooks or pipelines',
        'Microsoft Fabric is the future direction — worth understanding even at the beginner level',
      ]} />

    </LearnLayout>
  )
}
