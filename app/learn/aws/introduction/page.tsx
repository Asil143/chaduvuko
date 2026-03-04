import { LearnLayout } from '@/components/content/LearnLayout'
import { Callout } from '@/components/content/Callout'
import { KeyTakeaways } from '@/components/content/KeyTakeaways'
import Link from 'next/link'
import { ChevronRight } from 'lucide-react'

export const metadata = { title: 'Data Engineering on AWS' }

const awsServices = [
  { abbr: 'S3', name: 'Amazon S3', desc: 'The data lake. Stores all your raw and processed data at any scale. Equivalent to ADLS Gen2 on Azure. Central storage for the entire AWS data platform.', cat: 'Storage', color: '#ff9900', href: '/learn/aws/s3' },
  { abbr: 'Glue', name: 'AWS Glue', desc: 'Serverless ETL and data catalog service. Write PySpark or Python shell jobs that run without managing any infrastructure. The Glue Catalog is the metadata store for all your S3 data.', cat: 'Processing', color: '#00c2ff', href: '/learn/aws/glue' },
  { abbr: 'Redshift', name: 'Amazon Redshift', desc: 'AWS\'s cloud data warehouse. Columnar storage, MPP (massively parallel processing) query engine. Where analysts run SQL against large datasets. Equivalent to Azure Synapse Dedicated Pool.', cat: 'Serving', color: '#7b61ff', href: '/learn/aws/redshift' },
  { abbr: 'Kinesis', name: 'Amazon Kinesis', desc: 'Real-time data streaming service. Captures millions of events per second from websites, mobile apps, IoT devices. AWS\'s equivalent of Azure Event Hubs / Apache Kafka.', cat: 'Streaming', color: '#00e676', href: '/learn/aws/kinesis' },
  { abbr: 'Athena', name: 'Amazon Athena', desc: 'Serverless SQL query service over S3. Query raw data in S3 using standard SQL without loading it into a database. Equivalent to Azure Synapse Serverless SQL Pool.', cat: 'Query', color: '#f5c542' },
  { abbr: 'EMR', name: 'Amazon EMR', desc: 'Managed Hadoop/Spark clusters. Equivalent to Azure Databricks but more infrastructure-heavy to manage. Many teams use Glue instead for simpler workloads.', cat: 'Processing', color: '#ff5252' },
  { abbr: 'Step Functions', name: 'AWS Step Functions', desc: 'Workflow orchestration service. Coordinates multiple AWS services into a serverless pipeline. Equivalent to Azure Data Factory\'s orchestration capabilities.', cat: 'Orchestration', color: '#9c6ade' },
  { abbr: 'Lake Formation', name: 'AWS Lake Formation', desc: 'Data lake governance and fine-grained access control for S3 and Glue Catalog. Equivalent to Microsoft Purview for data governance.', cat: 'Governance', color: '#00bcd4' },
]

const azureToAws = [
  { azure: 'ADLS Gen2', aws: 'Amazon S3', note: 'Both are object storage for data lakes' },
  { azure: 'Azure Data Factory', aws: 'AWS Glue + Step Functions', note: 'ADF combines ingestion + orchestration that AWS splits into two services' },
  { azure: 'Azure Databricks', aws: 'Amazon EMR / AWS Glue', note: 'EMR is full Spark clusters, Glue is serverless Spark' },
  { azure: 'Azure Synapse Analytics', aws: 'Amazon Redshift + Athena', note: 'Redshift = dedicated warehouse, Athena = serverless query' },
  { azure: 'Azure Event Hubs', aws: 'Amazon Kinesis', note: 'Both are managed event streaming services' },
  { azure: 'Azure Key Vault', aws: 'AWS Secrets Manager', note: 'Both store credentials securely' },
  { azure: 'Microsoft Purview', aws: 'AWS Lake Formation', note: 'Data governance and access control' },
]

export default function AWSIntroductionPage() {
  return (
    <LearnLayout
      title="Data Engineering on AWS"
      description="AWS is the largest cloud platform by market share. If you already know Azure, the concepts transfer directly — you are learning new service names, not new ideas. This section maps everything you know to AWS equivalents."
      section="Section 02 · AWS Track"
      readTime="12 min read"
      updatedAt="March 2025"
      breadcrumbs={[
        { label: 'AWS Track', href: '/learn/aws/introduction' },
        { label: 'AWS Introduction', href: '/learn/aws/introduction' },
      ]}
    >
      <h2 id="azure-to-aws">If you know Azure, you already know AWS concepts</h2>
      <p>
        The single most important thing to understand about learning AWS after Azure is that the architecture patterns are identical. Both platforms have an object storage service for your data lake, a processing engine for Spark workloads, a data warehouse for SQL analytics, a streaming service for real-time data, and orchestration tools to tie it all together.
      </p>
      <p>
        The concepts are the same. The Medallion Architecture works on AWS exactly the same way it works on Azure. ETL, batch processing, streaming — all the same patterns. The only thing different is which service you pick up and what you type in the console.
      </p>

      <div className="overflow-x-auto my-6">
        <table className="w-full text-sm" style={{ borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid var(--border)' }}>
              {['Azure Service', 'AWS Equivalent', 'Notes'].map(h => (
                <th key={h} className="text-left px-4 py-3 text-xs font-mono uppercase tracking-wider" style={{ color: 'var(--muted)' }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {azureToAws.map(row => (
              <tr key={row.azure} style={{ borderBottom: '1px solid var(--border)' }}>
                <td className="px-4 py-3 font-mono text-xs font-semibold" style={{ color: '#0078d4' }}>{row.azure}</td>
                <td className="px-4 py-3 font-mono text-xs font-semibold" style={{ color: '#ff9900' }}>{row.aws}</td>
                <td className="px-4 py-3 text-xs" style={{ color: 'var(--muted)', fontFamily: 'Lora, serif' }}>{row.note}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Callout type="tip">
        When studying AWS for interviews, the most common question is: &quot;How would you build a data pipeline on AWS?&quot; The answer follows the exact same structure as Azure: S3 (data lake) → Glue (process) → Redshift (serve) → orchestrate with Step Functions. Master this pattern and you can answer any AWS architecture question.
      </Callout>

      <h2 id="aws-services">Key AWS services for data engineers</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 my-6">
        {awsServices.map(s => (
          <div key={s.abbr} className="rounded-xl p-4" style={{ background: 'var(--bg2)', border: '1px solid var(--border)' }}>
            <div className="flex items-start justify-between gap-2 mb-2">
              <div>
                <div className="text-xs font-mono mb-0.5" style={{ color: s.color }}>{s.abbr}</div>
                <div className="font-display font-semibold text-sm" style={{ color: 'var(--text)' }}>{s.name}</div>
              </div>
              <span className="text-xs font-mono px-2 py-0.5 rounded flex-shrink-0 mt-1"
                style={{ background: `${s.color}12`, color: s.color }}>{s.cat}</span>
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

      <h2 id="certifications">AWS certifications for data engineers</h2>
      <div className="space-y-2 my-6">
        {[
          { name: 'AWS Cloud Practitioner (CLF-C02)', level: 'Fundamentals', color: '#00e676', note: 'Optional — only if AWS is completely new to you' },
          { name: 'AWS Certified Data Engineer – Associate (DEA-C01)', level: 'Associate ⭐', color: '#ff9900', note: 'The main one — equivalent to DP-203 on Azure. Covers S3, Glue, Redshift, Kinesis' },
          { name: 'AWS Solutions Architect – Associate (SAA-C03)', level: 'Associate', color: '#ff9900', note: 'Valuable for understanding the full AWS ecosystem beyond just data' },
        ].map(cert => (
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

      <KeyTakeaways items={[
        'AWS is the largest cloud platform — worth learning after Azure since the concepts are identical, only service names differ',
        'The core AWS data engineering stack: S3 (lake) → Glue (process) → Redshift (warehouse) → Kinesis (streaming)',
        'Amazon S3 is equivalent to ADLS Gen2, AWS Glue to ADF+Databricks, Redshift to Synapse, Kinesis to Event Hubs',
        'The Medallion Architecture works exactly the same on AWS — Bronze/Silver/Gold in S3 instead of ADLS Gen2',
        'AWS Certified Data Engineer Associate (DEA-C01) is the key certification to add to your resume',
        'IAM roles on AWS = Managed Identities on Azure — always use them instead of storing credentials',
      ]} />
    </LearnLayout>
  )
}
