import { LearnLayout } from '@/components/content/LearnLayout'
import { Callout } from '@/components/content/Callout'

export const metadata = { title: 'Data Engineering Interview Prep' }

const categories = [
  {
    title:'Data Engineering Fundamentals', color:'#00c2ff', count:15,
    questions:[
      { q:'What is the difference between ETL and ELT? When would you choose one over the other?', note:'ELT is preferred when you have a powerful data warehouse (Synapse, BigQuery, Snowflake) that can handle transformations at scale. ETL is used when you need to transform data before loading to save storage costs or when the destination has limited compute.' },
      { q:'Explain the Medallion Architecture (Bronze/Silver/Gold). Why do companies use it?', note:'Bronze = raw data (never modified), Silver = cleaned/validated, Gold = aggregated/business-ready. It provides clear data lineage, allows reprocessing from raw, and makes debugging much easier.' },
      { q:'What is a data lake vs. a data warehouse? What is a lakehouse?', note:'Lake = cheap, flexible, stores everything raw. Warehouse = structured, fast, expensive. Lakehouse = Delta Lake/Iceberg adds ACID transactions on top of a data lake, combining both.' },
      { q:'What is the difference between batch processing and stream processing?', note:'Batch = scheduled runs on accumulated data. Stream = continuous processing of events as they arrive. Different tools, different latency requirements.' },
      { q:'How would you handle late-arriving data in a streaming pipeline?', note:'Watermarking, event time vs. processing time, allowing a late data window. In Spark Structured Streaming, use watermarks to bound state.' },
    ]
  },
  {
    title:'Azure-Specific Questions', color:'#0078d4', count:12,
    questions:[
      { q:'Explain the difference between Azure Data Factory and Azure Databricks. When do you use each?', note:'ADF = orchestration and data movement (no-code/low-code). Databricks = heavy data transformation with PySpark. In practice, ADF orchestrates Databricks notebooks.' },
      { q:'What is Delta Lake and why do you use it over plain Parquet?', note:'Delta Lake adds ACID transactions, schema enforcement, time travel, and efficient upserts (MERGE) to Parquet files. It makes data lakes reliable.' },
      { q:'How do you handle secrets and credentials in an ADF + Databricks pipeline?', note:'Azure Key Vault linked service in ADF, Key Vault secret scope in Databricks. Never hardcode anything. Use managed identities between Azure services.' },
      { q:'What is the difference between ADLS Gen2 and Azure Blob Storage?', note:'ADLS Gen2 is built on Blob Storage but adds a hierarchical namespace (real folders), ACLs for fine-grained access control, and is optimized for analytics workloads.' },
    ]
  },
  {
    title:'SQL Interview Questions', color:'#7b61ff', count:10,
    questions:[
      { q:'Write a query to find the second highest salary in an employees table.', note:'Use DENSE_RANK() or subquery: SELECT MAX(salary) FROM employees WHERE salary < (SELECT MAX(salary) FROM employees). DENSE_RANK is cleaner.' },
      { q:'What is the difference between RANK() and DENSE_RANK()?', note:'RANK() leaves gaps after ties (1,1,3). DENSE_RANK() does not (1,1,2). Most interview questions want DENSE_RANK unless specifically asking for RANK.' },
      { q:'Explain the difference between WHERE and HAVING.', note:'WHERE filters rows before aggregation. HAVING filters groups after aggregation. You cannot use aggregate functions (SUM, COUNT) in a WHERE clause.' },
    ]
  },
  {
    title:'System Design', color:'#f5c542', count:8,
    questions:[
      { q:'Design a data pipeline that processes 1 million sales transactions per day. What would your architecture look like?', note:'Source → ADF (ingest, schedule) → ADLS Gen2 Bronze → Databricks (transform, Delta) → Silver/Gold → Synapse Analytics → Power BI. Include Key Vault, monitoring, retry logic.' },
      { q:'How would you design a system that needs both real-time and historical analytics?', note:'Lambda Architecture: batch layer (ADF + Databricks) for historical, speed layer (Event Hubs + Stream Analytics) for real-time. Serving layer (Synapse) merges both.' },
    ]
  },
]

export default function InterviewPage() {
  return (
    <LearnLayout
      title="Data Engineering Interview Prep"
      description="Curated interview questions with detailed answers. Covers the topics that actually appear in data engineering technical screens at enterprise companies."
      section="Section 06 · Interview Prep"
      readTime="30 min read"
      updatedAt="March 2025"
      breadcrumbs={[{ label: 'Interview Prep', href: '/learn/interview' }]}
    >

      <Callout type="tip">
        Read every answer out loud, not just in your head. Technical interviews require you to explain things verbally, and explaining concepts in your own words is much harder than recognizing them on a page. Practice out loud.
      </Callout>

      <div className="space-y-8 my-6">
        {categories.map(cat => (
          <div key={cat.title}>
            <div className="flex items-center gap-2 mb-4">
              <h2 className="font-display font-bold text-base" style={{ color: 'var(--text)', margin: 0, padding: 0, border: 'none' }}>{cat.title}</h2>
              <span className="text-xs font-mono px-2 py-0.5 rounded"
                style={{ background: `${cat.color}12`, color: cat.color }}>{cat.count} questions</span>
            </div>
            <div className="space-y-3">
              {cat.questions.map((q, i) => (
                <div key={i} className="rounded-xl overflow-hidden" style={{ border: '1px solid var(--border)' }}>
                  <div className="px-5 py-4" style={{ background: 'var(--bg2)' }}>
                    <div className="flex items-start gap-3">
                      <span className="text-xs font-mono mt-0.5 flex-shrink-0" style={{ color: cat.color }}>Q{i+1}</span>
                      <div className="font-display font-semibold text-sm" style={{ color: 'var(--text)' }}>{q.q}</div>
                    </div>
                  </div>
                  <div className="px-5 py-4" style={{ background: 'var(--surface)' }}>
                    <div className="text-xs font-mono uppercase tracking-wider mb-2" style={{ color: cat.color }}>Answer</div>
                    <p className="text-sm leading-relaxed" style={{ color: 'var(--text2)', fontFamily: 'Lora, serif' }}>{q.note}</p>
                  </div>
                </div>
              ))}
              <div className="text-xs font-mono px-2 py-1.5" style={{ color: 'var(--muted)' }}>
                + {cat.count - cat.questions.length} more questions coming soon in this category
              </div>
            </div>
          </div>
        ))}
      </div>

    </LearnLayout>
  )
}
