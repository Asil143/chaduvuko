import Link from 'next/link'
import { ChevronLeft, Clock, Calendar, ArrowRight } from 'lucide-react'
import { notFound } from 'next/navigation'

const ARTICLES: Record<string, {
  title: string; date: string; readTime: string; tags: string[]
  intro: string; sections: { heading: string; body: string }[]
  cta: { label: string; href: string }
}> = {
  'medallion-architecture-explained': {
    title: 'Medallion Architecture Explained — Bronze, Silver, and Gold in Plain English',
    date: 'March 1, 2025', readTime: '8 min read',
    tags: ['Architecture', 'Data Lake', 'Azure', 'AWS', 'GCP'],
    intro: 'The Medallion Architecture is the most widely used data lake design pattern in 2025. If you are applying for data engineering roles, you will be asked about it in almost every interview. Here is exactly what each layer means, why it exists, and how to implement it on any cloud platform.',
    sections: [
      { heading: 'Why does the Medallion Architecture exist?', body: `Before the Medallion Architecture, data lakes were a mess. Raw data landed in a single location and everyone — analysts, data scientists, downstream pipelines — read directly from it. The result: inconsistent results, schema surprises, and nobody trusting the data.\n\nThe Medallion Architecture solves this by introducing three distinct layers, each with a clear contract about the quality and shape of the data inside it.` },
      { heading: 'Bronze — Raw data, preserved forever', body: `Bronze is the raw layer. Data lands here exactly as it came from the source — no modifications, no cleaning, no transformations. A CSV file lands as a CSV file. JSON from an API lands as JSON.\n\nWhy keep raw data? Because mistakes happen downstream. If your Silver transformation has a bug, you need to reprocess from the original source. Bronze is your safety net and audit trail.\n\nRule: Never modify Bronze data. Append only. Partition by date.` },
      { heading: 'Silver — Clean, validated, and trustworthy', body: `Silver is where cleaning happens. The Silver notebook reads Bronze, applies transformations, and writes back clean Delta Lake data. This includes removing nulls and duplicates, casting strings to proper types, standardizing formats, and adding audit columns.\n\nSilver data is still at row level — not yet aggregated. But it is clean, consistent, and trustworthy. Analysts can query Silver for ad-hoc investigation.` },
      { heading: 'Gold — Aggregated and business-ready', body: `Gold is the final layer. Gold tables are pre-aggregated, optimized for specific business questions, and ready for dashboards without further transformation.\n\nTypical Gold tables: daily sales summary by region and product, customer lifetime value, weekly cohort retention, regional performance rankings.\n\nGold tables are what Power BI, Looker Studio, and Tableau connect to. They are fast because the heavy aggregation happened during the pipeline run — not at query time.` },
      { heading: 'Implementing Medallion on Azure, AWS, and GCP', body: `The pattern is identical on every cloud — only the service names change.\n\nAzure: ADLS Gen2 (storage) + Databricks (transformations) + Synapse (serving)\nAWS: Amazon S3 (storage) + AWS Glue (transformations) + Redshift (serving)\nGCP: Cloud Storage (storage) + Dataflow (transformations) + BigQuery (serving)\n\nLearn the architecture pattern first. The cloud services are just implementations of the same idea.` },
    ],
    cta: { label: 'Build Project 1: Full Medallion Pipeline on Azure', href: '/learn/projects/azure-batch-pipeline' },
  },

  'delta-lake-vs-apache-iceberg': {
    title: 'Delta Lake vs. Apache Iceberg in 2025 — Which Should You Use?',
    date: 'February 22, 2025', readTime: '10 min read',
    tags: ['Delta Lake', 'Apache Iceberg', 'Open Table Format'],
    intro: 'Both Delta Lake and Apache Iceberg are open table formats that bring ACID transactions to your data lake. Both are widely used in production. But they have different strengths, different ecosystems, and different ideal use cases.',
    sections: [
      { heading: 'What is an Open Table Format?', body: `An open table format sits on top of Parquet files in your data lake and adds a metadata layer enabling ACID transactions, schema evolution, time travel, and efficient upserts.\n\nWithout an open table format, a data lake is just a folder of Parquet files — no transactions, no versioning, no reliable reads during writes.` },
      { heading: 'Delta Lake — the Databricks native choice', body: `Delta Lake was created by Databricks and is the default table format in all Databricks workspaces. If your stack is Azure Databricks or AWS Databricks, Delta Lake is the natural choice.\n\nStrengths: tight Databricks integration, excellent documentation, native support in Azure Synapse and Microsoft Fabric, and simple time travel with RESTORE TABLE.\n\nWeakness: historically less portable outside the Databricks ecosystem, though Delta Universal Format is closing this gap.` },
      { heading: 'Apache Iceberg — the multi-engine standard', body: `Apache Iceberg was created at Netflix and is now an Apache Foundation project. It is designed to be engine-agnostic — Spark, Flink, Trino, Snowflake, BigQuery, and Redshift can all read and write Iceberg tables.\n\nStrengths: true multi-engine support not tied to any vendor, AWS natively supports Iceberg in S3 Tables and Athena, GCP BigQuery supports Iceberg tables.\n\nWeakness: slightly more complex to configure initially.` },
      { heading: 'Which should you learn first in 2025?', body: `Azure-focused target jobs: learn Delta Lake first. It is the standard on Azure Databricks and Microsoft Fabric.\n\nAWS or multi-cloud target: learn Iceberg. AWS has made Iceberg a first-class citizen with S3 Tables.\n\nFor your resume: listing both Delta Lake and Apache Iceberg signals that you understand open table formats as a category, not just one vendor implementation. That is a strong signal to senior engineers reviewing your resume.` },
    ],
    cta: { label: 'See Delta Lake in action — Azure Databricks Tutorial', href: '/learn/azure/databricks' },
  },

  'data-engineer-resume-without-experience': {
    title: 'How to Write a Data Engineer Resume When You Have No Work Experience',
    date: 'February 15, 2025', readTime: '12 min read',
    tags: ['Career', 'Resume', 'H1B'],
    intro: 'Recruiters at consulting firms that sponsor H1B visas see hundreds of resumes every week. Most get rejected in under 10 seconds. Here is exactly what separates the resumes that get callbacks from the ones that do not.',
    sections: [
      { heading: 'The core problem with most beginner resumes', body: `Most beginners list technologies without demonstrating how they were used. "Proficient in Python, SQL, Azure, Spark" tells a recruiter nothing. Every resume says this.\n\nWhat recruiters want to see is evidence of applied skill — proof that you have actually used these tools to build something real.` },
      { heading: 'Rule 1: Lead with a project, not a summary', body: `Replace the generic Objective or Summary section with a Projects section at the top. Your project is your experience.\n\nWrong: "Seeking a challenging data engineering role to utilize my skills in Azure and Python."\n\nRight: "Built an end-to-end Medallion Architecture retail sales pipeline on Azure using ADF, Databricks, ADLS Gen2, and Synapse. Processed 50,000 records per run with Bronze to Silver to Gold transformation layers."\n\nNow you have a conversation starter. A recruiter who sees this will ask about it.` },
      { heading: 'Rule 2: Quantify everything', body: `Numbers make achievements concrete. Even on a personal project, you can quantify:\n\n- Volume: "Processed 5,000 sales records per pipeline run"\n- Time: "Reduced query time from 45 seconds to 3 seconds using partitioning"\n- Coverage: "Data quality checks catching 98% of null and duplicate records"\n\nThese are real numbers from your actual project. Use them.` },
      { heading: 'Rule 3: Match job description keywords exactly', body: `ATS systems filter resumes before a human sees them. If the job says "Azure Data Factory" and your resume says "ADF", the ATS may filter you out.\n\nFor every application: copy the job description, highlight every technical term, ensure those exact terms appear in your resume.\n\nMust-have keywords in 2025: Medallion Architecture, Azure Data Factory, Azure Databricks, Delta Lake, ADLS Gen2, PySpark, Apache Spark, ETL, data pipeline, SQL, Python.` },
      { heading: 'What a strong beginner resume looks like', body: `PROJECTS (put this FIRST)\nRetail Sales Batch Pipeline | Azure | 2025\n- End-to-end Medallion Architecture pipeline on Azure\n- Bronze: raw CSV ingestion into ADLS Gen2 partitioned by date\n- Silver: PySpark data quality validation in Azure Databricks\n- Gold: 3 aggregated Delta Lake tables for analyst queries\n- Orchestrated with Azure Data Factory at 2am daily\n- Stack: ADF, Databricks, ADLS Gen2, Synapse, Delta Lake, PySpark\n\nSKILLS\nCloud: Azure (ADF, Databricks, ADLS Gen2, Synapse, Key Vault)\nProcessing: Apache Spark, PySpark, Delta Lake, Medallion Architecture\nLanguages: Python, SQL` },
    ],
    cta: { label: 'Build Project 1 to put on your resume', href: '/learn/projects/azure-batch-pipeline' },
  },

  'adf-vs-airflow-vs-step-functions': {
    title: 'ADF vs. Airflow vs. Step Functions — Which Orchestration Tool Should You Learn?',
    date: 'February 8, 2025', readTime: '9 min read',
    tags: ['ADF', 'Airflow', 'Orchestration'],
    intro: 'Azure Data Factory, Apache Airflow, and AWS Step Functions all orchestrate data pipelines but take fundamentally different approaches. Knowing which to use — and more importantly, why — is one of the things that separates senior data engineers from junior ones.',
    sections: [
      { heading: 'What orchestration actually means', body: `Orchestration answers one question: in what order do things run, and what happens when something fails?\n\nA simple pipeline — extract data, transform it, load it — needs something to say "run transform only after extract succeeds, and alert me if it fails." That is orchestration. Without it, you have a collection of scripts with no coordination.\n\nAll three tools solve this problem differently.` },
      { heading: 'Azure Data Factory — UI-first, Azure-native', body: `ADF is Microsoft's managed orchestration service. You build pipelines in a drag-and-drop UI, connect to 90+ data sources, and schedule runs without writing any code for basic workflows.\n\nBest for: Azure-only stacks, teams that prefer visual pipeline building, organizations already in the Microsoft ecosystem.\n\nLimitation: logic-heavy workflows (complex branching, dynamic configs) become awkward in the UI. And ADF does not exist outside Azure — you cannot take your pipelines to AWS or GCP.` },
      { heading: 'Apache Airflow — code-first, cloud-neutral', body: `Airflow is an open-source Python framework. You write DAGs (Directed Acyclic Graphs) as Python files — tasks, dependencies, schedules, retry logic, all in code.\n\nBest for: complex workflows, multi-cloud environments, teams that prefer code over UI, GCP (Cloud Composer is managed Airflow).\n\nLimitation: you need to manage infrastructure yourself unless using a managed service like Cloud Composer, MWAA on AWS, or Astronomer.\n\nAirflow is the most widely used orchestration tool in the industry. If you only learn one, learn Airflow.` },
      { heading: 'AWS Step Functions — event-driven, serverless', body: `Step Functions is AWS serverless orchestration. You define state machines in JSON/YAML — each state is a Lambda function, Glue job, or ECS task. It is tightly integrated with the AWS ecosystem.\n\nBest for: event-driven architectures, serverless AWS stacks, microservice coordination.\n\nLimitation: the JSON state machine syntax is verbose, and it is AWS-only. Data engineers rarely use it as a primary orchestration tool — it is more of a DevOps and microservices tool that data teams sometimes encounter.` },
      { heading: 'Which should you learn for job market 2025?', body: `Priority order for maximum employability:\n\n1. Apache Airflow — universal, cloud-neutral, most job postings mention it\n2. Azure Data Factory — essential for any Azure data engineering role\n3. AWS Step Functions — only if you are targeting pure AWS roles\n\nOn your resume: if you know Airflow, you can say you know orchestration. If you also know ADF, you cover the entire Azure job market. That combination appears in more job descriptions than any other orchestration pairing.` },
    ],
    cta: { label: 'Learn Azure Data Factory in depth', href: '/learn/azure/adf' },
  },

  'microsoft-fabric-explained': {
    title: 'Microsoft Fabric Explained — Should You Learn It Now or Wait?',
    date: 'February 1, 2025', readTime: '7 min read',
    tags: ['Microsoft Fabric', 'Azure', 'Career'],
    intro: 'Microsoft Fabric is the biggest change to the Azure data engineering landscape since Databricks entered the picture. It unifies the entire Azure data stack into one product. Here is what it actually is, what it replaces, and the honest answer to whether you should prioritize it right now.',
    sections: [
      { heading: 'What is Microsoft Fabric?', body: `Microsoft Fabric is an all-in-one analytics platform launched in 2023. It unifies data integration (ADF), data engineering (Spark), data warehousing (Synapse), real-time analytics (Event Streams), business intelligence (Power BI), and data science — all inside one product with one license.\n\nThink of it as Microsoft deciding: instead of making customers stitch together ADF + Databricks + Synapse + Power BI, we will give them one platform that does everything.` },
      { heading: 'What does Fabric replace?', body: `Fabric does not delete existing services — Azure Databricks, ADF, and Synapse still exist. But Fabric provides overlapping capabilities:\n\n- Data Factory in Fabric replaces standalone ADF for many use cases\n- Lakehouse in Fabric replaces ADLS Gen2 + Databricks for many teams\n- Warehouse in Fabric replaces Synapse Analytics for many analytical workloads\n- Power BI is now native inside Fabric instead of a separate service\n\nFor new Azure projects in 2025, many companies are starting on Fabric instead of building the traditional stack.` },
      { heading: 'OneLake — the key architectural shift', body: `The most important concept in Fabric is OneLake. It is a single logical data lake that spans the entire organization — all Fabric workloads read and write to the same OneLake storage automatically.\n\nThis eliminates the biggest pain point in the traditional Azure stack: copying data between services. In the old world, you moved data from ADLS to Synapse to Power BI. In Fabric, everything shares OneLake — no movement, no copies, no sync.` },
      { heading: 'Should you learn Fabric now or wait?', body: `Honest answer: learn the fundamentals first, then layer in Fabric.\n\nIf you know ADF, Databricks, and Synapse, Fabric takes about one week to understand because the concepts are identical — only the UI and naming changes.\n\nIf you skip the fundamentals and go straight to Fabric, you will struggle because Fabric assumes you understand data pipelines, Spark, and SQL warehouses already.\n\nFor your resume in 2025: mention Fabric awareness. Employers are not yet requiring deep Fabric expertise at entry level, but knowing what it is signals you are following the industry.` },
    ],
    cta: { label: 'Start with the Azure fundamentals first', href: '/learn/azure/introduction' },
  },

  'batch-vs-streaming': {
    title: 'Batch vs. Streaming — The Decision Framework Every Data Engineer Needs',
    date: 'January 25, 2025', readTime: '6 min read',
    tags: ['Architecture', 'Batch', 'Streaming'],
    intro: 'Most data engineering architecture decisions come down to one question: batch or streaming? Get this wrong and you build an overly complex streaming system when a simple batch job would have worked fine — or you build a batch pipeline that cannot meet the business latency requirement.',
    sections: [
      { heading: 'The core difference', body: `Batch processing collects data over a period of time and processes it all at once on a schedule. Run at 2am, process all of yesterday's data, write results, done.\n\nStream processing processes data continuously as it arrives, event by event, with latency measured in milliseconds to seconds.\n\nThe key insight: streaming is not always better. It is more complex, more expensive, and harder to debug. You should only use streaming when the business genuinely requires low latency.` },
      { heading: 'The decision framework — ask these 4 questions', body: `1. What is the required latency?\n   - Hours or days: batch is fine\n   - Minutes: micro-batch (Spark Structured Streaming with short windows)\n   - Seconds or milliseconds: true streaming required\n\n2. What is the data volume?\n   - High volume, low frequency: batch wins\n   - Low volume, high frequency: streaming is manageable\n   - High volume, high frequency: streaming is expensive — challenge the business requirement\n\n3. How complex is the transformation?\n   - Simple aggregations: both work\n   - Joins across multiple streams: streaming becomes very complex, consider if batch solves the problem\n\n4. What happens if you are 1 hour late?\n   - Business critical: streaming\n   - Reporting and analytics: batch is almost always fine` },
      { heading: 'Real examples of each', body: `Clear batch use cases:\n- Daily sales reporting (nobody needs this at 3am with 10ms latency)\n- Monthly customer churn analysis\n- Weekly ETL from operational databases to data warehouse\n- End-of-day financial reconciliation\n\nClear streaming use cases:\n- Fraud detection on credit card transactions (must decide in milliseconds)\n- Real-time inventory tracking during flash sales\n- Live sports scores and statistics\n- Industrial sensor monitoring for equipment failure` },
      { heading: 'What most companies actually use', body: `The honest reality: about 80% of data engineering work in most companies is batch processing. Streaming gets a lot of attention at conferences but the majority of pipelines that run in production at real companies — especially mid-size companies — are scheduled batch jobs.\n\nLearn batch deeply first. Understand streaming conceptually. Build streaming knowledge once you have your first job and face a real streaming requirement.\n\nFor interviews: be able to explain the tradeoffs clearly. Most interviewers ask about streaming to test your judgment — they want to know if you would reach for streaming unnecessarily, not whether you can implement Kafka.` },
    ],
    cta: { label: 'See batch processing in action — Project 1', href: '/learn/projects/azure-batch-pipeline' },
  },
}

export async function generateStaticParams() {
  return Object.keys(ARTICLES).map(slug => ({ slug }))
}

const tagColors: Record<string, string> = {
  'Architecture': '#7b61ff', 'Data Lake': '#00c2ff', 'Azure': '#0078d4',
  'AWS': '#ff9900', 'GCP': '#4285f4', 'Delta Lake': '#ff6b6b',
  'Apache Iceberg': '#00c2ff', 'Open Table Format': '#00e676',
  'Career': '#f5c542', 'Resume': '#f5c542', 'H1B': '#f5c542',
  'ADF': '#0078d4', 'Airflow': '#00e676', 'Orchestration': '#7b61ff',
  'Microsoft Fabric': '#0078d4', 'Batch': '#00c2ff', 'Streaming': '#00e676',
}

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const article = ARTICLES[params.slug]
  if (!article) notFound()

  return (
    <div className="pt-16 min-h-screen" style={{ background: 'var(--bg)' }}>
      <div className="border-b py-12 px-4" style={{ borderColor: 'var(--border)', background: 'var(--bg2)' }}>
        <div className="max-w-3xl mx-auto">
          <Link href="/blog" className="flex items-center gap-1.5 text-xs font-mono mb-6 hover:underline"
            style={{ color: 'var(--accent)' }}>
            <ChevronLeft size={12} /> Back to Blog
          </Link>
          <div className="flex flex-wrap gap-1.5 mb-4">
            {article.tags.map(tag => (
              <span key={tag} className="text-xs font-mono px-2 py-0.5 rounded"
                style={{ background: `${tagColors[tag] || '#00c2ff'}15`, color: tagColors[tag] || '#00c2ff' }}>
                {tag}
              </span>
            ))}
          </div>
          <h1 className="font-display font-extrabold leading-tight tracking-tight mb-4"
            style={{ fontSize: 'clamp(1.75rem,4vw,2.75rem)', color: 'var(--text)' }}>
            {article.title}
          </h1>
          <div className="flex items-center gap-4 text-xs font-mono flex-wrap" style={{ color: 'var(--muted)' }}>
            <span className="flex items-center gap-1"><Calendar size={10} /> {article.date}</span>
            <span className="flex items-center gap-1"><Clock size={10} /> {article.readTime}</span>
            <span className="flex items-center gap-1">
              ✍️ by{' '}
              <span style={{
                background: 'linear-gradient(135deg, #F59E0B, #FCD34D)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                fontWeight: 700,
              }}>Asil</span>
            </span>
          </div>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 py-12">
        <p className="text-lg leading-relaxed mb-10"
          style={{ color: 'var(--text2)', fontFamily: 'Lora, serif', fontStyle: 'italic', borderLeft: '3px solid var(--accent)', paddingLeft: '1.25rem' }}>
          {article.intro}
        </p>

        <div className="space-y-10">
          {article.sections.map((section, i) => (
            <section key={i}>
              <h2 className="font-display font-bold text-xl mb-4" style={{ color: 'var(--text)' }}>
                {section.heading}
              </h2>
              <div className="space-y-3">
                {section.body.split('\n\n').map((para, j) => (
                  <p key={j} className="text-base leading-relaxed"
                    style={{ color: 'var(--text2)', fontFamily: 'Lora, serif', whiteSpace: 'pre-line' }}>
                    {para}
                  </p>
                ))}
              </div>
            </section>
          ))}
        </div>

        <div className="mt-14 rounded-2xl p-8 text-center"
          style={{ background: 'var(--accent-glow)', border: '1px solid rgba(0,120,212,0.15)' }}>
          <h2 className="font-display font-bold text-xl mb-3" style={{ color: 'var(--text)' }}>Ready to apply this?</h2>
          <Link href={article.cta.href} className="btn-primary">
            {article.cta.label} <ArrowRight size={14} />
          </Link>
        </div>

        <div className="mt-10 pt-8 text-center" style={{ borderTop: '1px solid var(--border)' }}>
          <Link href="/blog" className="btn-secondary"><ChevronLeft size={14} /> Back to all articles</Link>
        </div>
      </div>
    </div>
  )
}
