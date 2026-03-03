import { LearnLayout } from '@/components/content/LearnLayout'
import { Callout } from '@/components/content/Callout'
import { CodeBlock } from '@/components/content/CodeBlock'
import { KeyTakeaways } from '@/components/content/KeyTakeaways'

const pipelineCode = `# Simple example: what data engineering code looks like
# Reading raw data, cleaning it, writing clean data back out

from pyspark.sql import SparkSession
from pyspark.sql import functions as F

spark = SparkSession.builder.appName("CleanSalesData").getOrCreate()

# Read raw data from the Bronze layer in your data lake
df = spark.read.csv("abfss://bronze@yourlake.dfs.core.windows.net/sales/")

# Remove duplicates and fill missing values
df_clean = (df
    .dropDuplicates(["order_id"])
    .fillna({"discount": 0.0, "region": "Unknown"})
    .withColumn("total_amount", F.col("quantity") * F.col("unit_price"))
)

# Write clean data to Silver layer in Delta format
df_clean.write.format("delta").mode("overwrite").save(
    "abfss://silver@yourlake.dfs.core.windows.net/sales_clean/"
)

print("✅ Data cleaned and saved to Silver layer.")`

export const metadata = { title: 'What is Data Engineering?' }

export default function WhatIsDataEngineering() {
  return (
    <LearnLayout
      title="What is Data Engineering?"
      description="Before you learn any tool or cloud service, you need to understand what data engineering actually is — what problem it solves, why it exists, and what a data engineer does every day at work."
      section="Section 01 · Foundations"
      readTime="12 min read"
      updatedAt="March 2025"
      breadcrumbs={[
        { label: 'Foundations', href: '/learn/what-is-data-engineering' },
        { label: 'What is Data Engineering?', href: '/learn/what-is-data-engineering' },
      ]}
    >

      <h2 id="the-problem">Let's start with the real problem</h2>

      <p>
        Every company today collects data. A lot of it. Your bank records every transaction. Netflix tracks every second you watch a show. Amazon logs every click, every search, every item you almost bought. Even a small restaurant now has sales data, inventory data, and customer data coming in from multiple systems.
      </p>

      <p>
        The problem is that this data is a mess. It lives in different places, in different formats, and it's often incomplete, duplicated, or just wrong. The sales team uses one system. The finance team uses another. The mobile app stores data differently than the website. Nobody agrees on what a "customer" even means across departments.
      </p>

      <p>
        <strong>That is the problem data engineering exists to solve.</strong> Getting raw, scattered, messy data from wherever it lives — and turning it into something clean, reliable, and ready to be used by analysts, data scientists, and business leaders.
      </p>

      <Callout type="example">
        If data is crude oil, data engineers are the people who build the refineries and the pipelines. The oil in the ground is useless by itself. It needs to be extracted, transported, refined, and delivered in a usable form. Data engineers do exactly that — except with data instead of oil.
      </Callout>

      <h2 id="what-de-does">So what does a data engineer actually do?</h2>

      <p>
        The day-to-day work of a data engineer revolves around one thing: building and maintaining <strong>data pipelines</strong>. A pipeline is exactly what it sounds like — a path that data travels through, from its raw source to a clean destination where it can be analyzed.
      </p>

      <p>A typical pipeline follows four steps:</p>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 my-6">
        {[
          { num:'01', name:'Ingest', desc:'Pull data from source systems — databases, APIs, files, streams' },
          { num:'02', name:'Store', desc:'Land it in a data lake or data warehouse in raw form' },
          { num:'03', name:'Transform', desc:'Clean it, fix it, join it, enrich it — make it trustworthy' },
          { num:'04', name:'Serve', desc:'Deliver clean data to analysts, dashboards, and ML models' },
        ].map(step => (
          <div key={step.num} className="rounded-xl p-4 text-center" style={{ background: 'var(--bg2)', border: '1px solid var(--border)' }}>
            <div className="text-xs font-mono mb-1.5" style={{ color: 'var(--accent)' }}>STEP {step.num}</div>
            <div className="font-display font-semibold text-sm mb-1" style={{ color: 'var(--text)' }}>{step.name}</div>
            <div className="text-xs leading-relaxed" style={{ color: 'var(--muted)' }}>{step.desc}</div>
          </div>
        ))}
      </div>

      <p>
        But building the pipeline is only half the job. Once it's built, data engineers also make sure it keeps running. They handle failures. They monitor for data quality issues. They optimize slow pipelines. They add new data sources as the business grows. Think of it less like a one-time construction project and more like maintaining a city's water system — always running, always being improved.
      </p>

      <h2 id="types-of-data">The three types of data you'll work with</h2>

      <p>
        Not all data looks the same. It comes in three main forms, and you'll deal with all of them constantly.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-6">
        {[
          { icon:'📋', name:'Structured', example:'SQL tables, Excel, CSVs', desc:'Rows and columns. Neatly organized. Fits perfectly into a spreadsheet.' },
          { icon:'🗂️', name:'Semi-Structured', example:'JSON, XML, Parquet, Avro', desc:'Has some organization but doesn\'t fit into rows/columns. APIs almost always return this.' },
          { icon:'🌊', name:'Unstructured', example:'Images, videos, PDFs, emails', desc:'No predefined format at all. Growing fast — especially with AI workloads.' },
        ].map(d => (
          <div key={d.name} className="rounded-xl p-5 text-center" style={{ background: 'var(--bg3)', border: '1px solid var(--border)' }}>
            <div className="text-3xl mb-2">{d.icon}</div>
            <div className="font-display font-semibold text-sm mb-1" style={{ color: 'var(--text)' }}>{d.name}</div>
            <div className="text-xs font-mono mb-2" style={{ color: 'var(--muted)' }}>{d.example}</div>
            <div className="text-xs leading-relaxed" style={{ color: 'var(--text2)', fontFamily: 'Lora, serif' }}>{d.desc}</div>
          </div>
        ))}
      </div>

      <h2 id="batch-vs-stream">Batch vs. Streaming — the two modes of data movement</h2>

      <p>
        There are two fundamental ways data moves through a pipeline. Understanding the difference is something every data engineer needs to know cold.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-6">
        <div className="rounded-xl p-5" style={{ background: 'var(--bg2)', border: '1px solid var(--border)' }}>
          <div className="font-display font-semibold mb-3" style={{ color: 'var(--text)' }}>🗃️ Batch Processing</div>
          <ul className="space-y-2 text-sm" style={{ color: 'var(--text2)', fontFamily: 'Lora, serif' }}>
            <li>→ Data is collected over time and processed in chunks</li>
            <li>→ Runs on a schedule — hourly, daily, weekly</li>
            <li>→ Simpler to build and debug</li>
            <li>→ Example: processing yesterday's sales every morning at 6am</li>
          </ul>
        </div>
        <div className="rounded-xl p-5" style={{ background: 'var(--bg2)', border: '1px solid var(--border)' }}>
          <div className="font-display font-semibold mb-3" style={{ color: 'var(--text)' }}>⚡ Stream Processing</div>
          <ul className="space-y-2 text-sm" style={{ color: 'var(--text2)', fontFamily: 'Lora, serif' }}>
            <li>→ Data is processed the moment it arrives, event by event</li>
            <li>→ Always running — no schedule</li>
            <li>→ More complex to build and debug</li>
            <li>→ Example: flagging a fraudulent bank transaction as it happens</li>
          </ul>
        </div>
      </div>

      <Callout type="example">
        Uber uses batch processing to generate weekly driver pay summaries. But it uses streaming to calculate surge pricing in real time — because if it waited even a few minutes to process ride demand, the pricing would be useless.
      </Callout>

      <h2 id="de-vs-others">Data Engineer vs. Data Scientist vs. Data Analyst</h2>

      <p>
        This is the question everyone asks when they first get into the data world. The roles sound similar, but they're fundamentally different jobs.
      </p>

      <div className="overflow-x-auto my-6">
        <table className="w-full text-sm" style={{ borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid var(--border)' }}>
              {['Role','Primary Focus','Core Tools','Output'].map(h => (
                <th key={h} className="text-left px-4 py-3 text-xs font-mono uppercase tracking-wider" style={{ color: 'var(--muted)' }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {[
              { role:'Data Engineer', badge:'#00c2ff', focus:'Building & maintaining data infrastructure', tools:'Python, Spark, SQL, Cloud, Airflow, Kafka', output:'Reliable data pipelines' },
              { role:'Data Scientist', badge:'#7b61ff', focus:'Building predictive models & uncovering patterns', tools:'Python, R, TensorFlow, Statistics', output:'Predictive models, insights' },
              { role:'Data Analyst', badge:'#f5c542', focus:'Analyzing data to answer business questions', tools:'SQL, Excel, Power BI, Tableau', output:'Reports, dashboards' },
            ].map(row => (
              <tr key={row.role} style={{ borderBottom: '1px solid var(--border)' }}>
                <td className="px-4 py-3 font-display font-semibold text-xs" style={{ color: row.badge }}>{row.role}</td>
                <td className="px-4 py-3 text-xs leading-relaxed" style={{ color: 'var(--text2)', fontFamily: 'Lora, serif' }}>{row.focus}</td>
                <td className="px-4 py-3 text-xs font-mono" style={{ color: 'var(--muted)' }}>{row.tools}</td>
                <td className="px-4 py-3 text-xs leading-relaxed" style={{ color: 'var(--text2)' }}>{row.output}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p>
        The simplest way to think about it: data engineers build the roads. Data analysts drive on those roads and report on where traffic is going. Data scientists use the roads to explore new destinations nobody has been to yet. Without the data engineer's roads, the other two can't do their jobs.
      </p>

      <h2 id="key-concepts">Core concepts you'll hear constantly</h2>

      <h3>ETL and ELT</h3>
      <p>
        ETL stands for Extract, Transform, Load. The classic pattern: pull data from a source, transform it (clean, reshape), then load it into a destination. ELT flips the last two steps — you load raw data first, then transform it inside the data warehouse. With modern cloud data warehouses being so powerful, ELT has become much more common. You'll hear both terms in almost every data engineering conversation.
      </p>

      <h3>Data Lake vs. Data Warehouse</h3>
      <p>
        A <strong>data lake</strong> stores everything — raw, unprocessed, in whatever format it arrived. It's cheap, flexible, and can store massive amounts of data. A <strong>data warehouse</strong> stores only structured, processed, ready-to-query data. It's organized and fast to query, but more expensive. Most modern companies use both.
      </p>

      <h3>Lakehouse — the best of both worlds</h3>
      <p>
        The lakehouse is a newer architecture combining the low cost of a data lake with the performance of a data warehouse. Technologies like Delta Lake, Apache Iceberg, and Apache Hudi make this possible. This is where the industry is heading right now.
      </p>

      <Callout type="tip">
        A lot of people get intimidated by the number of tools in data engineering. Don't be. The tools change — the concepts don't. If you understand pipelines, ETL/ELT, batch vs. streaming, and data storage, you can pick up any specific tool fairly quickly. Focus on the concepts first.
      </Callout>

      <h2 id="skills">What skills does a data engineer actually need?</h2>

      <h3>Non-negotiable from day one</h3>
      <p>
        <strong>SQL</strong> is the single most important skill. Every data engineering job involves SQL. You need to be comfortable writing complex queries — joins, window functions, subqueries, aggregations. If your SQL is weak, fix that before anything else. <strong>Python</strong> is the dominant scripting language. You'll use it to write pipeline logic, call APIs, automate tasks, and work with PySpark for distributed processing.
      </p>

      <CodeBlock
        code={pipelineCode}
        language="python"
        filename="bronze_to_silver.py"
      />

      <p>
        That's real PySpark code that a data engineer writes every day. It's not complicated once you understand the concepts — but it solves a real problem: cleaning and storing data reliably at scale.
      </p>

      <h2 id="why-now">Why is data engineering such a hot career right now?</h2>
      <p>
        Every company has more data than they can handle, and they desperately need people who can make sense of it. AI and machine learning — which everyone is investing in right now — are completely useless without clean, reliable data. Data engineers provide that foundation. The demand shows no signs of slowing down, and the skills are transferable across industries: healthcare, finance, retail, logistics, government, entertainment. The data engineering problems are remarkably similar across all of them.
      </p>

      <KeyTakeaways items={[
        'Data engineering is about building reliable pipelines that move raw, messy data and turn it into clean, usable data',
        'The core workflow is always Ingest → Store → Transform → Serve — regardless of which tools you use',
        'Data comes in three forms: structured, semi-structured, and unstructured — you\'ll work with all three',
        'Batch processing handles scheduled, historical data. Streaming handles real-time, event-driven data',
        'Data engineers build the infrastructure. Data analysts and scientists use it',
        'SQL and Python are the two most important skills to start with — everything else builds on top of them',
        'The lakehouse architecture (combining data lake + data warehouse) is where the industry is heading right now',
      ]} />

    </LearnLayout>
  )
}
