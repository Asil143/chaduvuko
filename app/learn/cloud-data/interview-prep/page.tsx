import { WithLessonNav } from '@/components/content/WithLessonNav'
import { LearnLayout } from '@/components/content/LearnLayout'
import { Callout } from '@/components/content/Callout'
import { KeyTakeaways } from '@/components/content/KeyTakeaways'

export const metadata = { title: 'Cloud Data Interview Prep' }

const questionGroups = [
  {
    title: 'Architecture and service selection',
    questions: [
      ['How would you choose among Azure, AWS, and Google Cloud for a new data platform?', 'I would first document sources, latency, formats, consumers, residency, identity, reliability, and team skills. Then I would map capabilities to services, prototype the riskiest path, and compare total operating cost including egress and support. I would state the decision conditions rather than claim one cloud is universally best.', 'Requirements-first reasoning, trade-offs, and validation rather than brand preference.'],
      ['How would you explain object storage, a warehouse, and a lakehouse?', 'Object storage holds durable objects such as Parquet files. A warehouse provides managed analytical storage and SQL execution. A lakehouse combines open data files with table-management and governance features so different workloads can share a controlled data foundation.', 'Clear separation of storage, compute, table semantics, and use cases.'],
      ['When might you choose Dataproc over Dataflow?', 'I would favor Dataproc when the workload is already expressed in Spark/Hadoop or needs those libraries and execution semantics. I would consider Dataflow for Apache Beam pipelines, especially when its unified batch/stream model fits. The choice should include team expertise, operational controls, and workload behavior.', 'Correct product boundaries without overstating one service.'],
      ['What belongs in a cloud-provider comparison?', 'Service fit, regional availability, identity, network integration, governance, reliability, skills, support, migration effort, and end-to-end cost. I would compare a representative workload rather than rely on feature checklists alone.', 'Practical factors beyond compute list price.'],
    ],
  },
  {
    title: 'Storage, processing, and data quality',
    questions: [
      ['How would you organize a data lake?', 'I would separate raw, validated, and curated data with explicit ownership and access boundaries. I would choose formats and partition keys from real query patterns, keep schemas and lineage discoverable, and define retention and recovery behavior.', 'Recoverability, access, metadata, formats, and workload-driven partitioning.'],
      ['How do you avoid small-file problems in Spark?', 'I would examine the number and size of output partitions, avoid partitioning by high-cardinality values without a strong reason, and compact files where appropriate. I would balance file sizing against parallelism and the downstream reader rather than use one fixed value everywhere.', 'Understanding of task parallelism and downstream trade-offs.'],
      ['How do you make a batch job safe to retry?', 'I would make inputs identifiable, use deterministic transformations, and design writes as idempotent operations or replace only the intended partition. I would checkpoint state when needed and test failure after partial output so retry behavior is known.', 'Failure-aware writes and tests, not just automatic retries.'],
      ['How do you manage schema evolution?', 'I would define compatibility rules, validate incoming changes, and decide which changes can be handled automatically. Breaking changes need a migration or versioned contract. I would alert on unexpected fields or type changes and preserve enough raw data to reprocess safely.', 'Contracts, compatibility, observability, and backfill planning.'],
    ],
  },
  {
    title: 'Security, networking, and governance',
    questions: [
      ['How would you grant a pipeline access to bronze and silver?', 'I would assign a dedicated workload identity, grant read on the exact bronze resources and write on the exact silver resources, and avoid unrelated permissions. I would verify both catalog and underlying cloud permissions, then confirm access through audit logs.', 'Least privilege, workload identity, layered authorization, audit.'],
      ['What does a private data path require?', 'I would verify DNS, routes, firewall policy, service endpoint support, TLS, and authorization from the actual runtime environment. A private subnet is only one part of the design, and the control plane may have a different path from data traffic.', 'End-to-end connectivity, not a single network label.'],
      ['What is the difference between authentication and authorization?', 'Authentication establishes which principal is making a request. Authorization decides whether that principal may perform an action on a resource under the applicable policies.', 'Concise distinction and a concrete data-platform example.'],
      ['How would you protect sensitive fields?', 'I would classify the fields, minimize collection and replication, restrict raw access, and publish only approved views or transformed values. I would apply appropriate encryption, retention, auditing, and incident procedures based on policy and law.', 'Data minimization plus layered controls and governance.'],
    ],
  },
  {
    title: 'Reliability, cost, and operations',
    questions: [
      ['A pipeline is late. What do you check first?', 'I would trace the run from source arrival through queueing, processing, writes, and downstream availability. I would inspect freshness and stage-level metrics, recent deployments, quotas, retries, and dependency health before changing capacity.', 'Structured diagnosis using observable stages and recent changes.'],
      ['How do you estimate the cost of a cloud data workload?', 'I would model storage, compute, query scans, orchestration, network transfer, logging, backups, and idle capacity using realistic volumes and schedules. I would measure a representative run, test growth assumptions, and add alerts and budget ownership.', 'End-to-end cost model and measurement.'],
      ['How would you design for recovery after a failed transform?', 'I would retain recoverable source data, make outputs versioned or partition-scoped, capture run metadata, and define safe replay boundaries. Recovery objectives and consistency requirements determine how much state and replication are needed.', 'Clear recovery points and impact-aware design.'],
      ['What metrics would you monitor?', 'I would monitor freshness, input/output counts, rejected records, job duration, retries, backlog, query performance, resource use, and cost. Alerts should identify an owner and actionable threshold, with logs and lineage to investigate.', 'Service-level signals, quality, cost, and actionable alerting.'],
    ],
  },
  {
    title: 'Scenario and communication',
    questions: [
      ['An analyst says yesterday’s revenue is wrong. How do you respond?', 'I would preserve the report context, compare source and output counts, trace the affected partition and transformation version, and check late-arriving or duplicate events and business definitions. I would communicate scope and next update, correct via a tested backfill, and add a regression check.', 'Calm incident handling, lineage, data correctness, and communication.'],
      ['How would you migrate a data workload between clouds?', 'I would inventory dependencies and data classifications, define a target architecture, measure transfer and egress, and migrate a small slice. I would validate row counts and business aggregates, run parallel comparisons, plan cutover and rollback, and retire the source only after sign-off.', 'Incremental migration, correctness, cost, and rollback.'],
      ['How do you handle a trade-off between freshness and cost?', 'I would quantify the business value of fresher data, identify which datasets need low latency, and keep others on a lower-frequency batch schedule. I would measure the incremental cost and expose freshness expectations to consumers.', 'Business framing and workload-specific service levels.'],
      ['Tell me how you would explain an architecture to a non-technical stakeholder.', 'I would describe where data enters, how it is checked and protected, when it becomes available, and what happens if a step fails. I would use a simple diagram and state the main trade-offs without relying on vendor terminology.', 'Audience-aware explanation, outcomes, and honest trade-offs.'],
    ],
  },
]

export default function CloudDataInterviewPrepPage() {
  return (
    <WithLessonNav href="/learn/cloud-data/interview-prep">
      <LearnLayout
        title="Cloud Data Interview Prep"
        description="Practice architecture, service selection, Spark, storage, security, cost, reliability, and incident-response questions for cloud data engineering interviews."
        section="Cloud Data Platforms · Career Preparation"
        readTime="22 min"
        breadcrumbs={[
          { label: 'Cloud Data Platforms', href: '/learn/cloud-data' },
          { label: 'Interview Prep', href: '/learn/cloud-data/interview-prep' },
        ]}
      >
        <h2>Prerequisites and objective</h2>
        <p>Complete the cloud-service and cross-cloud foundations lessons first. This review assumes basic data engineering, SQL, Spark, object storage, IAM, and networking. Use the model answers to organize your reasoning; adapt them to your own project evidence rather than memorizing phrasing.</p>
        <p>For each answer, state assumptions, explain trade-offs, mention how you would validate the design, and identify a failure or security concern. Interviewers value clear engineering judgment more than a memorized service catalog.</p>
        <Callout type="tip">Use a consistent structure: clarify requirements → propose a simple design → explain trade-offs → cover failure, security, and cost → describe validation.</Callout>

        {questionGroups.map(group => (
          <section key={group.title}>
            <h2>{group.title}</h2>
            {group.questions.map(([question, answer, looksFor], index) => (
              <div key={question} className="my-5">
                <h3>{index + 1}. {question}</h3>
                <p><strong>Model answer:</strong> {answer}</p>
                <p><strong>What interviewers look for</strong></p>
                <ul><li>{looksFor}</li></ul>
              </div>
            ))}
          </section>
        ))}

        <h2>Practice</h2>
        <ol>
          <li>Choose one question from each theme and answer aloud in two minutes, including one assumption and one trade-off.</li>
          <li>Draw a cloud data architecture for order files plus payment events, showing storage, processing, serving, identity, and network boundaries.</li>
          <li>Take the incident scenario and write a short stakeholder update plus a technical investigation checklist.</li>
          <li>Compare one workload across AWS, Azure, and Google Cloud without claiming the services are identical.</li>
          <li>Use a project you built to explain a failure, how you found the root cause, and what you changed to prevent recurrence.</li>
        </ol>
        <p><strong>Hint:</strong> Keep answers concrete. If a detail depends on the provider or current product configuration, say how you would verify it.</p>
        <Callout type="info">These are discussion prompts, not legal or vendor-specific guarantees. Service behavior, availability, and pricing change; consult current provider documentation when designing a real system.</Callout>
        <KeyTakeaways items={[
          'Begin architecture answers with workload requirements and explicit assumptions.',
          'Distinguish provider service families and explain why a workload fits one better.',
          'Include idempotency, schema changes, data quality, observability, and recovery in processing answers.',
          'Trace identity and network boundaries end to end using least privilege.',
          'Discuss total cost, user impact, and rollback when comparing designs or handling incidents.',
          'Use real project evidence and communicate clearly instead of memorizing vendor slogans.',
        ]} />
      </LearnLayout>
    </WithLessonNav>
  )
}
