import { LearnLayout } from '@/components/content/LearnLayout'
import { Callout } from '@/components/content/Callout'
import { KeyTakeaways } from '@/components/content/KeyTakeaways'
import { CodeBlock } from '@/components/content/CodeBlock'

export const metadata = { title: 'SYNAPSE' }

export default function Page() {
  return (
    <LearnLayout
      title="Azure Synapse Analytics"
      description="Azure Synapse Analytics is the serving layer. It combines data warehousing, big data analytics, and Spark into one unified platform. This is where analysts query Gold data using SQL."
      section="Section 02 · Azure Track"
      readTime="15 min read"
      updatedAt="March 2025"
      breadcrumbs={[
        { label: 'Azure Track', href: '/learn/azure/introduction' },
        { label: 'Azure Synapse', href: '/learn/azure/synapse' },
      ]}
    >
      <Callout type="info">
        This page is actively being built. Full tutorial content including architecture diagrams, hands-on labs, and real-world examples is coming very soon. 
        Start with the <a href="/learn/azure/introduction" style={{ color: 'var(--accent)' }}>Azure Introduction</a> and the <a href="/learn/projects" style={{ color: 'var(--accent)' }}>Projects section</a> in the meantime.
      </Callout>

      <h2>Coming Very Soon</h2>
      <p>
        This tutorial will cover every aspect of Azure Synapse Analytics in depth — setting up a dedicated SQL pool, creating external tables over Delta Lake, optimizing query performance, and connecting Power BI for business reporting.. Built for real job readiness, not just theory.
      </p>

      <KeyTakeaways items={[
        'Full tutorial content coming soon',
        'Start with the Azure Introduction page and the Projects section',
        'Project 1 already shows a complete end-to-end pipeline using all Azure services',
      ]} />
    </LearnLayout>
  )
}
