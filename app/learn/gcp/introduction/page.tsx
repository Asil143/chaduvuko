import { LearnLayout } from '@/components/content/LearnLayout'
import { Callout } from '@/components/content/Callout'
import { KeyTakeaways } from '@/components/content/KeyTakeaways'
import Link from 'next/link'
import { ChevronRight } from 'lucide-react'

export const metadata = { title: 'Data Engineering on Google Cloud (GCP)' }

const services = [
  { abbr: 'BigQuery', name: 'Google BigQuery', cat: 'Data Warehouse', color: '#4285f4', href: '/learn/gcp/bigquery', desc: 'Serverless data warehouse — query petabytes in seconds with plain SQL. Zero infrastructure to manage. The crown jewel of GCP.' },
  { abbr: 'Dataflow', name: 'Cloud Dataflow', cat: 'Processing', color: '#00c2ff', href: '/learn/gcp/dataflow', desc: 'Fully managed stream and batch processing using Apache Beam. Auto-scales workers up and down with the workload automatically.' },
  { abbr: 'Pub/Sub', name: 'Cloud Pub/Sub', cat: 'Streaming', color: '#00e676', href: '/learn/gcp/pubsub', desc: 'Managed real-time messaging service. Equivalent to Azure Event Hubs. Handles millions of messages per second.' },
  { abbr: 'Composer', name: 'Cloud Composer', cat: 'Orchestration', color: '#f5c542', href: '/learn/gcp/composer', desc: 'Fully managed Apache Airflow. Write Python DAGs to schedule, sequence and monitor your entire data workflow.' },
  { abbr: 'GCS', name: 'Google Cloud Storage', cat: 'Storage', color: '#ff9800', href: '', desc: 'Object storage for your data lake. Equivalent to ADLS Gen2 and Amazon S3. Cheap, durable, globally distributed.' },
  { abbr: 'Dataproc', name: 'Cloud Dataproc', cat: 'Processing', color: '#7b61ff', href: '', desc: 'Managed Apache Spark and Hadoop clusters. Use when you need full Spark control beyond what Dataflow provides.' },
  { abbr: 'Looker', name: 'Looker Studio', cat: 'Visualization', color: '#ff6b6b', href: '', desc: "Google's BI and dashboarding platform. Connects natively to BigQuery. The GCP equivalent of Power BI on Azure." },
  { abbr: 'Vertex AI', name: 'Vertex AI', cat: 'ML Platform', color: '#4285f4', href: '', desc: 'Unified ML platform on GCP. Data scientists build models on top of the clean data your pipelines produce.' },
]

const mapping = [
  { azure: 'ADLS Gen2', aws: 'Amazon S3', gcp: 'Cloud Storage (GCS)', note: 'Data lake object storage' },
  { azure: 'Azure Data Factory', aws: 'Step Functions + Glue', gcp: 'Cloud Composer (Airflow)', note: 'Orchestration and workflow' },
  { azure: 'Azure Databricks', aws: 'EMR / Glue', gcp: 'Dataflow / Dataproc', note: 'Spark processing engine' },
  { azure: 'Azure Synapse', aws: 'Amazon Redshift', gcp: 'Google BigQuery', note: 'Data warehouse and SQL' },
  { azure: 'Azure Event Hubs', aws: 'Amazon Kinesis', gcp: 'Cloud Pub/Sub', note: 'Real-time event streaming' },
  { azure: 'Azure Key Vault', aws: 'Secrets Manager', gcp: 'Secret Manager', note: 'Credentials storage' },
  { azure: 'Power BI', aws: 'QuickSight', gcp: 'Looker Studio', note: 'BI dashboards' },
]

const certs = [
  { name: 'Google Cloud Digital Leader', level: 'Fundamentals', color: '#00e676', note: 'Optional — only if GCP is completely new to you' },
  { name: 'Associate Cloud Engineer (ACE)', level: 'Associate', color: '#4285f4', note: 'Solid foundation covering all core GCP services' },
  { name: 'Professional Data Engineer (PDE)', level: 'Professional', color: '#f5c542', note: 'The key one for data engineers — equivalent to DP-203 on Azure' },
]

export default function GCPIntroPage() {
  return (
    <LearnLayout
      title="Data Engineering on Google Cloud (GCP)"
      description="GCP is where Google engineering excellence shows. BigQuery alone is reason enough to learn GCP — query terabytes in seconds with zero infrastructure. This section maps everything from Azure and AWS to GCP equivalents."
      section="Section 02 · GCP Track"
      readTime="12 min read"
      updatedAt="March 2025"
      breadcrumbs={[
        { label: 'GCP Track', href: '/learn/gcp/introduction' },
        { label: 'GCP Introduction', href: '/learn/gcp/introduction' },
      ]}
    >
      <h2 id="why-gcp">Why GCP stands apart</h2>
      <p>
        Google built GCP on the same internal infrastructure powering Search, YouTube, and Gmail. BigQuery is a quantum leap ahead of traditional data warehouses — serverless, infinitely scalable, and querying terabytes in seconds with zero infrastructure to provision.
      </p>
      <p>
        GCP is especially strong in analytics (BigQuery is the best cloud data warehouse), machine learning (Vertex AI and TensorFlow originate from Google), and open source (Dataflow runs Apache Beam, Dataproc runs real Spark).
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 my-6">
        {[
          { icon: '🔵', title: 'Best-in-class BigQuery', desc: 'Serverless warehouse querying terabytes in seconds. No cluster sizing or tuning. Just SQL.' },
          { icon: '🤖', title: 'ML-first platform', desc: 'TensorFlow, Vertex AI, and AutoML originated at Google. Best cloud for ML-heavy workloads.' },
          { icon: '🌐', title: 'Open source native', desc: 'Dataflow runs Apache Beam. Dataproc runs real Spark. No vendor lock-in on compute.' },
        ].map(r => (
          <div key={r.title} className="rounded-xl p-5 text-center" style={{ background: 'var(--bg2)', border: '1px solid var(--border)' }}>
            <div className="text-3xl mb-2">{r.icon}</div>
            <div className="font-display font-semibold text-sm mb-1.5" style={{ color: 'var(--text)' }}>{r.title}</div>
            <p className="text-xs leading-relaxed" style={{ color: 'var(--muted)', fontFamily: 'Lora, serif' }}>{r.desc}</p>
          </div>
        ))}
      </div>

      <h2 id="mapping">Full Azure to AWS to GCP service mapping</h2>
      <div className="overflow-x-auto my-6">
        <table className="w-full text-sm" style={{ borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid var(--border)' }}>
              {['Azure', 'AWS', 'GCP', 'Purpose'].map(h => (
                <th key={h} className="text-left px-4 py-3 text-xs font-mono uppercase tracking-wider" style={{ color: 'var(--muted)' }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {mapping.map(row => (
              <tr key={row.azure} style={{ borderBottom: '1px solid var(--border)' }}>
                <td className="px-4 py-3 font-mono text-xs font-semibold" style={{ color: '#0078d4' }}>{row.azure}</td>
                <td className="px-4 py-3 font-mono text-xs font-semibold" style={{ color: '#ff9900' }}>{row.aws}</td>
                <td className="px-4 py-3 font-mono text-xs font-semibold" style={{ color: '#4285f4' }}>{row.gcp}</td>
                <td className="px-4 py-3 text-xs" style={{ color: 'var(--muted)', fontFamily: 'Lora, serif' }}>{row.note}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Callout type="tip">
        BigQuery is the single most important GCP service to learn. Unlike Redshift or Synapse which require sizing a cluster, BigQuery is completely serverless — write SQL and Google handles the compute.
      </Callout>

      <h2 id="services">Key GCP services for data engineers</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 my-6">
        {services.map(s => (
          <div key={s.abbr} className="rounded-xl p-4" style={{ background: 'var(--bg2)', border: '1px solid var(--border)' }}>
            <div className="flex items-start justify-between gap-2 mb-2">
              <div>
                <div className="text-xs font-mono mb-0.5" style={{ color: s.color }}>{s.abbr}</div>
                <div className="font-display font-semibold text-sm" style={{ color: 'var(--text)' }}>{s.name}</div>
              </div>
              <span className="text-xs font-mono px-2 py-0.5 rounded flex-shrink-0 mt-1" style={{ background: `${s.color}12`, color: s.color }}>{s.cat}</span>
            </div>
            <p className="text-xs leading-relaxed" style={{ color: 'var(--muted)', fontFamily: 'Lora, serif' }}>{s.desc}</p>
            {s.href && (
              <Link href={s.href} className="flex items-center gap-1 text-xs font-mono mt-3 hover:underline" style={{ color: 'var(--accent)' }}>
                Learn {s.abbr} <ChevronRight size={10} />
              </Link>
            )}
          </div>
        ))}
      </div>

      <h2 id="certs">GCP certification path</h2>
      <div className="space-y-2 my-6">
        {certs.map(cert => (
          <div key={cert.name} className="flex items-center gap-3 p-4 rounded-xl" style={{ background: 'var(--bg3)', border: '1px solid var(--border)' }}>
            <span className="text-xs font-mono px-2.5 py-1 rounded flex-shrink-0" style={{ background: `${cert.color}15`, color: cert.color }}>{cert.level}</span>
            <div>
              <div className="font-display font-semibold text-sm" style={{ color: 'var(--text)' }}>{cert.name}</div>
              <div className="text-xs font-mono mt-0.5" style={{ color: 'var(--muted)' }}>{cert.note}</div>
            </div>
          </div>
        ))}
      </div>

      <KeyTakeaways items={[
        "GCP is built on Google's internal infrastructure — engineered for massive scale from day one",
        'BigQuery is fully serverless — query terabytes with plain SQL, zero cluster management needed',
        'Core GCP stack: GCS (lake) → Pub/Sub (streaming) → Dataflow (processing) → BigQuery (warehouse) → Composer (orchestration)',
        'Cloud Composer is managed Apache Airflow — write Python DAGs, Google handles the infrastructure',
        'Professional Data Engineer (PDE) is the key GCP certification to put on your resume',
        'GCP is especially strong for ML workloads — Vertex AI and TensorFlow originated from Google internal systems',
      ]} />
    </LearnLayout>
  )
}