import { LearnLayout } from '@/components/content/LearnLayout'
import { Callout } from '@/components/content/Callout'
import { KeyTakeaways } from '@/components/content/KeyTakeaways'
import { CodeBlock } from '@/components/content/CodeBlock'

export const metadata = { title: 'ADF' }

export default function Page() {
  return (
    <LearnLayout
      title="Azure Data Factory (ADF)
Databricks"
      description="Azure Data Factory is the orchestration backbone of every Azure data engineering pipeline. It connects to 90+ data sources, moves data, runs Databricks notebooks, and schedules everything end-to-end.
Azure Databricks is where the real transformation work happens. It brings Apache Spark as a fully managed, cloud-optimized service — the primary processing engine for large-scale data engineering."
      section="Section 02 · Azure Track"
      readTime="15 min read"
      updatedAt="March 2025"
      breadcrumbs={[
        { label: 'Azure Track', href: '/learn/azure/introduction' },
        { label: 'Azure Data Factory
Azure Databricks', href: '/learn/azure/adf' },
      ]}
    >
      <Callout type="info">
        This page is actively being built. Full tutorial content including architecture diagrams, hands-on labs, and real-world examples is coming very soon. 
        Start with the <a href="/learn/azure/introduction" style={{ color: 'var(--accent)' }}>Azure Introduction</a> and the <a href="/learn/projects" style={{ color: 'var(--accent)' }}>Projects section</a> in the meantime.
      </Callout>

      <h2>Coming Very Soon</h2>
      <p>
        This tutorial will cover every aspect of Azure Data Factory from a data engineer's perspective — how to build pipelines, configure linked services, trigger runs, handle failures, and orchestrate Databricks notebooks.
Azure Databricks from first principles — setting up clusters, writing PySpark notebooks, using Delta Lake, reading from ADLS Gen2, and integrating with ADF for orchestration.. Built for real job readiness, not just theory.
      </p>

      <KeyTakeaways items={[
        'Full tutorial content coming soon',
        'Start with the Azure Introduction page and the Projects section',
        'Project 1 already shows a complete end-to-end pipeline using all Azure services',
      ]} />
    </LearnLayout>
  )
}
