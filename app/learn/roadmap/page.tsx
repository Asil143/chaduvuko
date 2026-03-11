import { LearnLayout } from '@/components/content/LearnLayout'
import Link from 'next/link'

export const metadata = { title: 'Data Engineering Roadmap 2026 — Asil' }

const phases = [
  {
    num: '01', title: 'Foundations', time: '2–3 weeks', color: '#00c2ff',
    desc: 'You cannot skip this. SQL and Python are used in every data engineering job every single day. If you are weak here, everything else falls apart.',
    items: [
      { label: 'SQL', detail: 'SELECT, JOINs, GROUP BY, window functions, CTEs. Not just basic queries — analytical SQL that data engineers actually use.', href: '/learn/foundations/sql' },
      { label: 'Python', detail: 'Functions, pandas basics, working with files and APIs. You do not need to be a software engineer but you do need to be comfortable writing and reading Python code.', href: '/learn/foundations/python' },
      { label: 'Git basics', detail: 'Commit, push, pull, branches. Every professional job uses Git. Learn the basics before your first interview.' },
      { label: 'Linux command line', detail: 'cd, ls, grep, tail, ssh. You will use the terminal to connect to cloud machines and debug live pipelines.' },
    ]
  },
  {
    num: '02', title: 'Pick Your Cloud — Start with Azure', time: '4–6 weeks', color: '#0078d4',
    desc: 'You need to go deep on at least one cloud before spreading to others. Azure is the best first choice if you are targeting consulting firms and H1B sponsorship.',
    items: [
      { label: 'Azure Portal basics', detail: 'Resource Groups, subscriptions, IAM. Know how to navigate and create resources without getting lost.', href: '/learn/azure/introduction' },
      { label: 'ADLS Gen2', detail: 'Azure Data Lake Storage — this is where all your data lives. Containers, directories, partitioning, access control.', href: '/learn/azure/adls-gen2' },
      { label: 'Azure Data Factory', detail: 'Pipeline orchestration. You define what runs, in what order, when, and what to do if it fails.', href: '/learn/azure/adf' },
      { label: 'Azure Databricks', detail: 'Managed Apache Spark. This is where the actual data transformation code runs.', href: '/learn/azure/databricks' },
      { label: 'Azure Synapse Analytics', detail: 'The SQL layer on top of your data lake. Analysts query here.', href: '/learn/azure/synapse' },
    ]
  },
  {
    num: '03', title: 'Build a Real Project', time: '1–2 weeks', color: '#00e676',
    desc: 'Theory without a project gets you nowhere. You need something to put on your resume and talk about in interviews. Project 1 on Asil is designed specifically for this.',
    items: [
      { label: 'Project 1 — Azure Batch Pipeline', detail: 'End-to-end Medallion Architecture. Real data, real cloud, real code. This is the project you show recruiters.', href: '/learn/projects/azure-batch-pipeline' },
    ]
  },
  {
    num: '04', title: 'Second Cloud — AWS', time: '3–4 weeks', color: '#ff9900',
    desc: 'Once you know Azure, AWS takes half the time to learn because the concepts are the same. S3 is ADLS. Glue is Databricks. Redshift is Synapse. Different names, same ideas.',
    items: [
      { label: 'Amazon S3', detail: 'Object storage — the data lake foundation on AWS.', href: '/learn/aws/s3' },
      { label: 'AWS Glue', detail: 'Serverless Spark — runs your transformation jobs without managing servers.', href: '/learn/aws/glue' },
      { label: 'Amazon Redshift', detail: 'Cloud data warehouse — the SQL query layer for analysts.', href: '/learn/aws/redshift' },
      { label: 'Amazon Kinesis', detail: 'Real-time data streaming — the event ingestion service.', href: '/learn/aws/kinesis' },
    ]
  },
  {
    num: '05', title: 'Third Cloud — GCP', time: '2–3 weeks', color: '#4285f4',
    desc: 'GCP has some genuinely excellent tools — especially BigQuery, which is the best serverless data warehouse in the industry. Worth understanding even if you do not target GCP jobs.',
    items: [
      { label: 'Google BigQuery', detail: 'Serverless SQL warehouse. No cluster to size or manage — just write SQL.', href: '/learn/gcp/bigquery' },
      { label: 'Cloud Dataflow', detail: 'Managed Apache Beam for batch and streaming pipelines.', href: '/learn/gcp/dataflow' },
      { label: 'Cloud Pub/Sub', detail: 'Event streaming — equivalent to Kafka or Kinesis.', href: '/learn/gcp/pubsub' },
      { label: 'Cloud Composer', detail: 'Managed Apache Airflow — the most common orchestration tool across all clouds.', href: '/learn/gcp/composer' },
    ]
  },
  {
    num: '06', title: 'Interview Prep + Job Search', time: '2 weeks', color: '#ff6b6b',
    desc: 'Technical knowledge alone does not get you hired. You need to be able to explain what you know, talk through system design, and present your project confidently.',
    items: [
      { label: 'Top interview questions', detail: '25+ real questions across SQL, Python, cloud, system design, and behavioral — with sample answers.', href: '/learn/interview' },
      { label: 'Resume review', detail: 'Lead with your project. Quantify everything. Match job description keywords exactly.' },
      { label: 'LinkedIn presence', detail: 'Post about what you are learning. Share your project. Engineers who share their work get noticed by recruiters.' },
      { label: 'Target companies', detail: 'Know which consulting firms sponsor H1B, what tools they use, and how to tailor your resume to each one.', href: '/learn/industry' },
    ]
  },
]

export default function RoadmapPage() {
  return (
    <LearnLayout
      title="Data Engineering Roadmap 2026"
      description="A clear path from zero to job-ready. No wasted time, no random tutorials. Every step is here because it makes you more employable."
      section="Foundations"
      readTime="8 min"
      updatedAt="March 2026"
      showSalary={true}
      breadcrumbs={[
        { label: 'Learn', href: '/learn/roadmap' },
        { label: 'Roadmap 2026', href: '/learn/roadmap' },
      ]}
    >
      <h2>How to use this roadmap</h2>
      <p>
        Go in order. Phase 01 before Phase 02. Do not jump to Databricks before you are solid on SQL. Do not start building a project before you understand the cloud platform it runs on.
      </p>
      <p>
        The total time from zero to job-ready is roughly 3–4 months if you put in 2–3 hours per day. Less if you have some background. More if you are starting from scratch.
      </p>
      <p>
        The goal is not to finish the roadmap. The goal is to build enough skill and one strong project to get your first interview — and then do well in it.
      </p>

      <div className="space-y-6 mt-8">
        {phases.map(phase => (
          <div key={phase.num} className="rounded-2xl overflow-hidden"
            style={{ border: `1px solid ${phase.color}25`, background: 'var(--surface)' }}>
            <div className="flex items-start gap-4 p-6"
              style={{ borderBottom: `1px solid ${phase.color}20` }}>
              <div className="font-display font-black text-3xl tracking-tighter flex-shrink-0" style={{ color: phase.color, opacity: 0.3 }}>
                {phase.num}
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-3 flex-wrap mb-1">
                  <h3 className="font-display font-bold text-lg" style={{ color: 'var(--text)' }}>{phase.title}</h3>
                  <span className="text-xs font-mono px-2 py-0.5 rounded"
                    style={{ background: `${phase.color}12`, color: phase.color }}>
                    ~{phase.time}
                  </span>
                </div>
                <p className="text-sm leading-relaxed" style={{ color: 'var(--muted)', fontFamily: 'Lora, serif', fontStyle: 'italic' }}>
                  {phase.desc}
                </p>
              </div>
            </div>
            <div className="p-4 space-y-2">
              {phase.items.map((item, i) => (
                <div key={i} className="flex items-start gap-3 p-3 rounded-xl"
                  style={{ background: 'var(--bg)', border: '1px solid var(--border)' }}>
                  <div className="w-5 h-5 rounded flex items-center justify-center flex-shrink-0 mt-0.5 text-xs font-mono font-bold"
                    style={{ background: `${phase.color}15`, color: phase.color }}>
                    {i + 1}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-display font-semibold text-sm" style={{ color: 'var(--text)' }}>{item.label}</span>
                      {item.href && (
                        <Link href={item.href} className="text-xs font-mono px-2 py-0.5 rounded"
                          style={{ background: `${phase.color}10`, color: phase.color }}>
                          Read →
                        </Link>
                      )}
                    </div>
                    <p className="text-xs mt-1 leading-relaxed" style={{ color: 'var(--muted)', fontFamily: 'Lora, serif' }}>
                      {item.detail}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <h2>Common mistakes to avoid</h2>
      <ul>
        <li><strong>Tutorial hell</strong> — watching videos without building anything. After every tutorial, build something. Even a small variation of what you just watched.</li>
        <li><strong>Skipping SQL</strong> — thinking Python or Spark replaces SQL. It does not. SQL is used in every data engineering job every day. Be very good at it.</li>
        <li><strong>Trying to learn everything at once</strong> — Azure AND AWS AND GCP AND Kafka AND dbt simultaneously. Go deep on one, then expand. Shallow knowledge of five tools is worse than deep knowledge of two.</li>
        <li><strong>Waiting until you are ready</strong> — you will never feel ready. Apply when you have one solid project and can explain it clearly. The first few interviews are practice. That is fine.</li>
        <li><strong>Ignoring the resume</strong> — brilliant engineers with poor resumes get filtered by ATS before a human ever sees them. Put in the work on your resume and LinkedIn profile.</li>
      </ul>
    </LearnLayout>
  )
}