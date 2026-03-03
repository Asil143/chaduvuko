import { LearnLayout } from '@/components/content/LearnLayout'
import { Callout } from '@/components/content/Callout'
import { CodeBlock } from '@/components/content/CodeBlock'
import { KeyTakeaways } from '@/components/content/KeyTakeaways'

const medallionCode = `# Medallion Architecture folder structure in ADLS Gen2
# This is how you organize your data lake

adls-storage-account/
├── bronze/          # Raw data - never modified, kept forever
│   ├── sales/
│   │   ├── 2025/01/01/sales_raw_20250101.csv
│   │   └── 2025/01/02/sales_raw_20250102.csv
│   └── customers/
│       └── customers_raw_20250101.json
│
├── silver/          # Cleaned, validated, deduplicated data
│   ├── sales/       # Delta Lake tables
│   └── customers/
│
└── gold/            # Aggregated, business-ready data
    ├── sales_daily_summary/
    ├── customer_lifetime_value/
    └── regional_performance/`

const pythonCode = `from azure.storage.filedatalake import DataLakeServiceClient

# Connect to ADLS Gen2
service_client = DataLakeServiceClient(
    account_url="https://yourstorageaccount.dfs.core.windows.net",
    credential=your_credential  # Always use Key Vault, never hardcode
)

# Get a reference to a filesystem (container)
file_system_client = service_client.get_file_system_client("bronze")

# Upload a file to bronze layer
with open("sales_data.csv", "rb") as data:
    file_client = file_system_client.create_file("sales/2025/01/sales.csv")
    file_client.upload_data(data, overwrite=True)

print("✅ File uploaded to Bronze layer")`

export const metadata = { title: 'Azure Data Lake Storage Gen2 (ADLS Gen2)' }

export default function ADLSGen2Page() {
  return (
    <LearnLayout
      title="Azure Data Lake Storage Gen2"
      description="ADLS Gen2 is the central storage backbone of every Azure data engineering architecture. This is where your Bronze, Silver, and Gold layers live. Understanding it deeply is non-negotiable."
      section="Section 02 · Azure Track"
      readTime="10 min read"
      updatedAt="March 2025"
      breadcrumbs={[
        { label: 'Azure Track', href: '/learn/azure/introduction' },
        { label: 'ADLS Gen2', href: '/learn/azure/adls-gen2' },
      ]}
    >

      <h2 id="what-is-adls">What is ADLS Gen2?</h2>
      <p>
        Azure Data Lake Storage Gen2 — everyone calls it ADLS Gen2 — is Microsoft's cloud storage service built specifically for big data analytics. It's the place where all your data lives at every stage of the pipeline. Raw data from your source systems lands here first. Cleaned data lives here too. So does the final aggregated data that analysts query.
      </p>
      <p>
        The "Gen2" part matters. Gen1 was an older, separate service that Microsoft has discontinued. Gen2 is built on top of Azure Blob Storage — which means it gets Blob's reliability, scalability, and low cost — but adds a hierarchical namespace (like a real file system with folders) that makes it much faster and more efficient for big data workloads.
      </p>

      <Callout type="tip">
        If you've used Amazon S3 before, think of ADLS Gen2 as Azure's equivalent. The concept is the same — cheap, scalable, durable object storage — but ADLS Gen2 has better support for big data workloads because of the hierarchical namespace.
      </Callout>

      <h2 id="key-concepts">Three things that make ADLS Gen2 special</h2>

      <div className="space-y-4 my-6">
        {[
          { icon:'📁', title:'Hierarchical Namespace', desc:'Real folders, real paths. Unlike regular blob storage where everything is a flat list of files, ADLS Gen2 organizes data like a real file system — /bronze/sales/2025/01/. This makes rename, delete, and move operations on large directories fast and atomic.' },
          { icon:'🔐', title:'Fine-grained Access Control (ACLs)', desc:'You can control who reads what at the file and folder level. A data analyst can read the Gold layer but not Bronze. The ADF pipeline can write to Bronze but not Gold. This is essential for production security.' },
          { icon:'⚡', title:'Optimized for Analytics', desc:'ADLS Gen2 is designed to work natively with Databricks, Synapse, and Azure HDInsight. It supports parallel reads, which is essential when Spark is splitting data processing across multiple machines.' },
        ].map(item => (
          <div key={item.title} className="rounded-xl p-5 flex gap-4" style={{ background: 'var(--bg2)', border: '1px solid var(--border)' }}>
            <span className="text-2xl flex-shrink-0">{item.icon}</span>
            <div>
              <div className="font-display font-semibold text-sm mb-1.5" style={{ color: 'var(--text)' }}>{item.title}</div>
              <p className="text-sm leading-relaxed" style={{ color: 'var(--text2)', fontFamily: 'Lora, serif' }}>{item.desc}</p>
            </div>
          </div>
        ))}
      </div>

      <h2 id="medallion">How ADLS Gen2 fits into Medallion Architecture</h2>
      <p>
        In practice, every Azure data engineering project organizes ADLS Gen2 into three layers following the Medallion Architecture. This is so standard in the industry that you should memorize it immediately.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-6">
        {[
          { layer:'Bronze', color:'#cd7f32', emoji:'🥉', desc:'Raw data exactly as it arrived from the source. Never modified, never deleted. This is your insurance policy — if anything goes wrong downstream, you can always reprocess from Bronze.' },
          { layer:'Silver', color:'#c0c0c0', emoji:'🥈', desc:'Cleaned and validated data. Duplicates removed, nulls handled, data types corrected, bad records filtered. Data here is reliable and trusted by the organization.' },
          { layer:'Gold', color:'#f5c542', emoji:'🥇', desc:'Aggregated, business-ready data. Sales by region, customer lifetime value, monthly KPIs. This is what analysts and Power BI query directly. Optimized for fast reads.' },
        ].map(l => (
          <div key={l.layer} className="rounded-xl p-5 text-center" style={{ background: 'var(--bg3)', border: `1px solid ${l.color}30` }}>
            <div className="text-3xl mb-2">{l.emoji}</div>
            <div className="font-display font-bold text-base mb-2" style={{ color: l.color }}>{l.layer} Layer</div>
            <p className="text-xs leading-relaxed" style={{ color: 'var(--text2)', fontFamily: 'Lora, serif' }}>{l.desc}</p>
          </div>
        ))}
      </div>

      <CodeBlock code={medallionCode} language="bash" filename="adls-structure.txt" />

      <h2 id="connecting">Connecting to ADLS Gen2 from Python</h2>
      <p>
        In most real projects, you'll interact with ADLS Gen2 through Databricks or ADF — not directly through Python. But understanding the Python SDK helps you grasp what's happening under the hood.
      </p>

      <CodeBlock code={pythonCode} language="python" filename="adls_upload.py" />

      <Callout type="warning">
        Never hardcode storage account keys or connection strings in your code. Always store them in Azure Key Vault and retrieve them at runtime. This is a security requirement in every production Azure environment.
      </Callout>

      <h2 id="performance">Performance tips you'll actually use on the job</h2>
      <p>
        Once you start working with large datasets, you'll discover that how you organize data in ADLS Gen2 dramatically affects query performance. Here are the patterns senior engineers use:
      </p>

      <div className="space-y-3 my-6">
        {[
          { tip:'Partition by date', detail:'Organize files by year/month/day. When Spark reads a date range, it can skip entire folders instead of scanning everything.' },
          { tip:'Use Parquet or Delta format', detail:'Never store big data as CSV in production. Parquet is columnar and 10x faster to query. Delta adds ACID transactions on top of Parquet.' },
          { tip:'Right-size your files', detail:'Many small files hurt performance badly (the "small file problem"). Aim for 100MB–1GB files in production. Use Delta Lake\'s OPTIMIZE command to compact small files.' },
          { tip:'Use managed identities for auth', detail:'Instead of storing keys, let your Azure services authenticate to ADLS Gen2 using managed identities. No secrets to rotate, no risk of accidental exposure.' },
        ].map((item, i) => (
          <div key={i} className="flex gap-3 p-4 rounded-xl" style={{ background: 'var(--bg2)', border: '1px solid var(--border)' }}>
            <span className="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-xs font-mono font-bold"
              style={{ background: 'var(--accent-glow)', color: 'var(--accent)' }}>{i+1}</span>
            <div>
              <div className="font-display font-semibold text-sm mb-1" style={{ color: 'var(--text)' }}>{item.tip}</div>
              <p className="text-xs leading-relaxed" style={{ color: 'var(--muted)', fontFamily: 'Lora, serif' }}>{item.detail}</p>
            </div>
          </div>
        ))}
      </div>

      <KeyTakeaways items={[
        'ADLS Gen2 is the central storage layer for all Azure data engineering architectures — every project uses it',
        'It\'s built on Azure Blob Storage but adds a hierarchical namespace that makes it efficient for big data workloads',
        'Three layers: Bronze (raw), Silver (clean), Gold (aggregated) — this is the Medallion Architecture every DE knows',
        'Use Parquet or Delta Lake format in production — never CSV for large datasets',
        'Partition data by date to dramatically improve query performance on large datasets',
        'Always use Azure Key Vault for credentials — never hardcode storage account keys in your code',
        'Managed identities are the most secure way to authenticate between Azure services',
      ]} />

    </LearnLayout>
  )
}
