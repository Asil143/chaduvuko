import { WithLessonNav } from '@/components/content/WithLessonNav'
import { LearnLayout } from '@/components/content/LearnLayout'
import { Callout } from '@/components/content/Callout'
import { CodeBlock } from '@/components/content/CodeBlock'
import { KeyTakeaways } from '@/components/content/KeyTakeaways'

export const metadata = { title: 'Choosing a Cloud for Data — Azure vs AWS vs GCP' }

const mapping = `Purpose                 Azure                    AWS                       Google Cloud
Object / lake storage   ADLS Gen2 / Blob          Amazon S3                 Cloud Storage (GCS)
Managed Spark           Azure Databricks          EMR / Glue                 Dataproc / Databricks
ETL / data integration  Data Factory              Glue / Step Functions      Dataflow / Composer
Warehouse / SQL         Synapse / Fabric          Redshift / Athena          BigQuery
Event ingestion         Event Hubs                Kinesis                    Pub/Sub
Secrets                 Key Vault                 Secrets Manager            Secret Manager
Identity                Entra ID + Azure RBAC     IAM                       Cloud IAM`

const designCode = `# Translate a workload into capabilities before selecting products.
workload = {
    "source": "daily order files and payment events",
    "storage": ["durable object storage", "retention controls", "open formats"],
    "processing": ["scheduled batch", "incremental streaming", "Spark"],
    "serving": ["SQL analytics", "BI access", "data sharing"],
    "controls": ["private connectivity", "audit trail", "regional residency"],
}

# Compare provider implementations against these needs, not product names.
for capability, requirements in workload.items():
    print(capability, requirements)`

export default function ChoosingACloudPage() {
  return (
    <WithLessonNav href="/learn/cloud-data/choosing-a-cloud">
      <LearnLayout
        title="Choosing a Cloud for Data — Azure vs AWS vs GCP"
        description="Map equivalent data-platform services across Microsoft Azure, AWS, and Google Cloud, then choose based on workload requirements rather than brand claims."
        section="Cloud Data Platforms · Course Introduction"
        readTime="14 min"
        breadcrumbs={[
          { label: 'Cloud Data Platforms', href: '/learn/cloud-data' },
          { label: 'Choosing a Cloud for Data', href: '/learn/cloud-data/choosing-a-cloud' },
        ]}
      >
        <h2>Prerequisites and learning objective</h2>
        <p>Before this lesson, understand files and object storage, batch versus streaming, SQL analytics, and the basic purpose of identity and networking. You do not need hands-on experience with all three providers.</p>
        <p>By the end, you can translate a data workload into cloud capabilities, identify the closest service families across Azure, AWS, and Google Cloud, and defend a selection using operational constraints.</p>

        <h2>Think in capabilities before product names</h2>
        <p>A cloud data platform commonly needs durable storage, ingestion, transformation, orchestration, analytics, governance, identity, and networking. Products overlap but are not interchangeable: a warehouse, a Spark service, and an event broker solve different jobs even when all appear in one vendor's data catalog.</p>
        <CodeBlock language="text" filename="service-family-map.txt" code={mapping} />
        <Callout type="info">This map is a starting point, not a feature-by-feature equivalence. For example, Azure Data Factory and Cloud Composer both orchestrate work, but their authoring and runtime models differ. Validate the specific connector, latency, governance, and operational requirements.</Callout>

        <h2>Translate the workload into a shortlist</h2>
        <p>Suppose a delivery marketplace receives order files each day and payment-status events throughout the day. A sensible design identifies the required capabilities first: land immutable raw data, process events, run batch transforms, expose governed analytics, and let an operations team observe failures.</p>
        <CodeBlock language="python" filename="workload_requirements.py" code={designCode} />
        <p>For each candidate cloud, score the fit of each capability, including people and existing contracts. A team already operating Azure may prefer ADLS, Data Factory, and Databricks because identity and networking are familiar. Another team may favor S3 and Glue, or GCS and BigQuery. The right answer is conditional, not universal.</p>

        <h2>Compare the full operating model</h2>
        <div className="overflow-x-auto my-6">
          <table className="w-full text-sm" style={{ borderCollapse: 'collapse' }}>
            <thead><tr style={{ borderBottom: '1px solid var(--border)' }}>{['Decision area', 'Questions to answer'].map(h => <th key={h} className="text-left px-4 py-3" style={{ color: 'var(--muted)' }}>{h}</th>)}</tr></thead>
            <tbody>{[
              ['Workload fit', 'Does the platform support the needed batch, streaming, Spark, SQL, and sharing patterns?'],
              ['People and ecosystem', 'Which cloud skills, operational tooling, partner integrations, and hiring pool already exist?'],
              ['Governance and residency', 'Which regions, data classifications, audit controls, and retention rules apply?'],
              ['Economics', 'What are storage, compute, network egress, idle capacity, and support costs for this usage pattern?'],
              ['Reliability', 'What are the recovery objectives, quotas, service dependencies, and failure-handling expectations?'],
            ].map(([area, question]) => <tr key={area} style={{ borderBottom: '1px solid var(--border)' }}><td className="px-4 py-3 font-semibold">{area}</td><td className="px-4 py-3">{question}</td></tr>)}</tbody>
          </table>
        </div>
        <Callout type="tip">Estimate costs from a representative workload and measure it. Include data movement and idle resources: a low query price can be offset by duplicated storage or cross-region transfer.</Callout>

        <h2>A practical decision workflow</h2>
        <ol>
          <li>Write down data sources, formats, volume shape, freshness, consumers, and recovery needs.</li>
          <li>Mark mandatory constraints: region, identity integration, private connectivity, compliance, and existing agreements.</li>
          <li>Build one small representative slice in each plausible service combination; test failure recovery and access boundaries.</li>
          <li>Compare total operating effort and cost, not only a single service's advertised rate.</li>
          <li>Record why the choice was made and which conditions would trigger a review.</li>
        </ol>

        <h2>Common mistakes</h2>
        <ul>
          <li><strong>Choosing by popularity:</strong> it ignores team skills, residency, and integration constraints. Start with requirements and evidence.</li>
          <li><strong>Assuming equivalents are identical:</strong> managed Spark, serverless SQL, and workflow services expose different controls. Compare capabilities and limits.</li>
          <li><strong>Comparing list prices only:</strong> forgotten egress, orchestration, observability, backups, and support distort the estimate. Model end-to-end usage.</li>
          <li><strong>Designing for a single provider everywhere:</strong> portability has a real engineering cost. Keep open formats and interfaces where useful, but do not add multi-cloud complexity without a requirement.</li>
        </ul>

        <h2>Practice</h2>
        <ol>
          <li>Map object storage, event ingestion, a Spark workload, and SQL serving for all three clouds.</li>
          <li>Choose a shortlist for a company already using Microsoft identity and explain what evidence could change your choice.</li>
          <li>List five cost line items beyond compute for a daily batch pipeline.</li>
          <li>Explain one service pair that looks equivalent but differs in how engineers operate it.</li>
        </ol>
        <p><strong>Hint:</strong> Compare one concrete workload and include access, network paths, scheduling, and monitoring in your diagram.</p>

        <KeyTakeaways items={[
          'Start with workload capabilities and constraints, then map them to provider services.',
          'Azure, AWS, and Google Cloud offer overlapping storage, processing, orchestration, streaming, and analytics families, not exact copies.',
          'A useful selection includes people, governance, reliability, and total operating cost.',
          'Test a representative slice and measure end-to-end behavior before committing.',
          'Use open formats and clear interfaces where they help; avoid unnecessary multi-cloud complexity.',
        ]} />
      </LearnLayout>
    </WithLessonNav>
  )
}
