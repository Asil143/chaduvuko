import { LearnLayout } from '@/components/content/LearnLayout'
import { Callout } from '@/components/content/Callout'
import { CodeBlock } from '@/components/content/CodeBlock'
import { KeyTakeaways } from '@/components/content/KeyTakeaways'

export const metadata = { title: 'Azure Data Factory (ADF)' }

const linkedServiceCode = `// ADF Linked Service — how ADF connects to ADLS Gen2
// Configure once in ADF UI, then reuse across all pipelines
{
  "name": "LS_ADLS_Bronze",
  "type": "AzureDataLakeStoreGen2",
  "typeProperties": {
    "url": "https://yourstorageaccount.dfs.core.windows.net",
    "accountKey": {
      "type": "AzureKeyVaultSecret",
      "store": { "referenceName": "LS_KeyVault", "type": "LinkedServiceReference" },
      "secretName": "adls-storage-key"
    }
  }
}`

const pipelineCode = `// ADF Pipeline — Copy Activity + Databricks Notebook chained together
{
  "name": "PL_Ingest_Sales_Daily",
  "activities": [
    {
      "name": "Copy_Sales_To_Bronze",
      "type": "Copy",
      "inputs":  [{ "referenceName": "DS_SQLServer_Sales", "type": "DatasetReference" }],
      "outputs": [{ "referenceName": "DS_ADLS_Bronze_Sales", "type": "DatasetReference" }],
      "typeProperties": {
        "source": {
          "type": "SqlSource",
          "sqlReaderQuery": "SELECT * FROM dbo.Sales WHERE LoadDate = '@{pipeline().parameters.runDate}'"
        },
        "sink": { "type": "DelimitedTextSink" }
      }
    },
    {
      "name": "Run_Databricks_Transform",
      "type": "DatabricksNotebook",
      "dependsOn": [{ "activity": "Copy_Sales_To_Bronze", "dependencyConditions": ["Succeeded"] }],
      "typeProperties": {
        "notebookPath": "/Shared/bronze_to_silver",
        "baseParameters": { "run_date": "@pipeline().parameters.runDate" }
      }
    }
  ],
  "parameters": {
    "runDate": { "type": "string", "defaultValue": "@utcNow('yyyy-MM-dd')" }
  }
}`

const concepts = [
  { term: 'Pipeline', color: '#00c2ff', desc: 'The top-level container. A logical grouping of activities that together perform a task. "Ingest Sales Data" is one pipeline. You can have dozens in one ADF instance.' },
  { term: 'Activity', color: '#7b61ff', desc: 'A single step inside a pipeline. Three types: data movement (Copy Data), transformation (run Databricks, run SQL), and control flow (If Condition, ForEach, Wait).' },
  { term: 'Dataset', color: '#00e676', desc: 'A named reference to data — a specific table, file, or folder. Points to a Linked Service. For example: "the sales table in this SQL Server" or "the /bronze/sales/ folder in ADLS Gen2".' },
  { term: 'Linked Service', color: '#f5c542', desc: 'The connection definition. Holds the connection string (or Key Vault reference) for a data source. Create one per external system and reuse it everywhere.' },
  { term: 'Trigger', color: '#ff9800', desc: 'What starts a pipeline run. Three types: Schedule (set time), Storage Event (new file arrives), Tumbling Window (for historical backfills).' },
  { term: 'Integration Runtime', color: '#ff5252', desc: 'The compute ADF uses to run activities. Azure IR handles cloud-to-cloud. Self-hosted IR runs on-premises to connect ADF to on-prem databases.' },
]

const triggers = [
  { name: 'Schedule Trigger', icon: '🕐', when: 'Daily/hourly batch pipelines', detail: 'Runs at a fixed time on a recurring schedule. Most common type. Example: every day at 2am UTC.' },
  { name: 'Storage Event Trigger', icon: '📁', when: 'Event-driven ingestion', detail: 'Fires when a file lands in ADLS Gen2. A partner drops a CSV — the pipeline triggers automatically.' },
  { name: 'Tumbling Window', icon: '🪟', when: 'Backfilling historical data', detail: 'Runs for non-overlapping time windows. Perfect for reprocessing 90 days of history one day at a time, in parallel.' },
]

export default function ADFPage() {
  return (
    <LearnLayout
      title="Azure Data Factory (ADF)"
      description="ADF is the orchestration backbone of every Azure data pipeline. It moves data from 90+ sources, triggers Databricks notebooks, handles failures, and automates everything on a schedule — all without writing infrastructure code."
      section="Section 02 · Azure Track"
      readTime="16 min read"
      updatedAt="March 2026"
      breadcrumbs={[
        { label: 'Azure Track', href: '/learn/azure/introduction' },
        { label: 'Azure Data Factory', href: '/learn/azure/adf' },
      ]}
    >
      <h2 id="what-is-adf">What ADF is — and what it is not</h2>
      <p>
        Azure Data Factory is not a processing engine. It does not transform data. It does not run Python or SQL. What it does is move data and orchestrate other services that do those things. Think of it as the project manager of your data pipeline — it tells everything else what to do, in what order, and handles what happens when something goes wrong.
      </p>
      <p>
        In a typical Azure pipeline, ADF handles three things: connecting to source systems and copying raw data into your data lake, triggering Databricks notebooks to run transformations in the right sequence, and scheduling all of this to happen automatically on a daily, hourly, or event-driven basis.
      </p>

      <Callout type="example">
        A retail company has sales data sitting in an on-premises SQL Server. Every night at 2am, ADF connects to that SQL Server, extracts the previous day&apos;s transactions, copies them to ADLS Gen2 Bronze, then triggers a Databricks notebook to clean and process them. ADF manages the schedule, monitors for failures, and sends alerts if anything breaks. The data engineer wrote the notebook — ADF handles everything around it.
      </Callout>

      <h2 id="core-concepts">The six core concepts</h2>
      <div className="space-y-3 my-6">
        {concepts.map(item => (
          <div key={item.term} className="flex gap-4 p-4 rounded-xl" style={{ background: 'var(--bg2)', border: '1px solid var(--border)' }}>
            <span className="text-xs font-mono font-bold px-2.5 py-1 rounded flex-shrink-0 h-fit"
              style={{ background: `${item.color}15`, color: item.color, whiteSpace: 'nowrap' }}>
              {item.term}
            </span>
            <p className="text-sm leading-relaxed m-0" style={{ color: 'var(--text2)', fontFamily: 'Lora, serif' }}>{item.desc}</p>
          </div>
        ))}
      </div>

      <h2 id="linked-services">Linked Services — always use Key Vault</h2>
      <p>
        Every data source ADF connects to needs a Linked Service. The most important rule: never store credentials directly in the Linked Service. Always reference Azure Key Vault. This is a hard requirement in every production environment, and interviewers specifically ask about this.
      </p>
      <CodeBlock code={linkedServiceCode} language="json" filename="linked_service_adls.json" />

      <h2 id="pipeline">A real pipeline — Copy + Databricks in sequence</h2>
      <p>
        Here is what a typical ADF pipeline looks like. Two activities chained together: a Copy activity that moves data from SQL Server to Bronze, then a Databricks Notebook activity that runs once the copy succeeds. The <strong>dependsOn</strong> field is how you control execution order — the second activity only runs if the first one succeeded.
      </p>
      <CodeBlock code={pipelineCode} language="json" filename="pipeline_ingest_sales.json" />

      <Callout type="tip">
        You rarely write this JSON by hand. ADF has a drag-and-drop visual designer in the Azure Portal. The JSON is what ADF stores behind the scenes — useful to know when you need to commit pipelines to Git for version control.
      </Callout>

      <h2 id="triggers">Trigger types and when to use each</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-6">
        {triggers.map(t => (
          <div key={t.name} className="rounded-xl p-5 text-center" style={{ background: 'var(--bg3)', border: '1px solid var(--border)' }}>
            <div className="text-3xl mb-2">{t.icon}</div>
            <div className="font-display font-semibold text-sm mb-1" style={{ color: 'var(--text)' }}>{t.name}</div>
            <div className="text-xs font-mono mb-2" style={{ color: 'var(--accent)' }}>{t.when}</div>
            <p className="text-xs leading-relaxed" style={{ color: 'var(--muted)', fontFamily: 'Lora, serif' }}>{t.detail}</p>
          </div>
        ))}
      </div>

      <Callout type="warning">
        Always set up failure alerts on production pipelines. ADF can send emails or Teams notifications when a pipeline fails. A pipeline failing silently for three days without anyone noticing is a real, career-damaging incident.
      </Callout>

      <KeyTakeaways items={[
        'ADF is an orchestration tool — it moves data and triggers other services, it does not transform data itself',
        'Four core concepts: Pipelines (containers), Activities (steps), Datasets (data references), Linked Services (connections)',
        'Always store credentials in Azure Key Vault — never hardcode them directly in Linked Services',
        'dependsOn controls execution order — the next activity only runs when the previous one succeeds',
        'Three trigger types: Schedule (time-based), Storage Event (file arrives), Tumbling Window (backfills)',
        'The Monitor tab in ADF is your first stop when a pipeline run fails in production',
        'ADF integrates natively with Databricks — triggering notebooks with parameters is the most common pipeline pattern',
      ]} />
    </LearnLayout>
  )
}