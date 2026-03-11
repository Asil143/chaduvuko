'use client'
import { useState } from 'react'
import { Copy, Check, Linkedin, ChevronDown } from 'lucide-react'

const POSTS: Record<string, { headline: string; body: string; hashtags: string }> = {
  '/learn/what-is-data-engineering': {
    headline: "I just started my Data Engineering journey",
    body: "Today I learned what Data Engineers actually do — we build the pipelines that move raw data into clean, structured formats for analysts and ML teams to use.\n\nKey concepts I studied:\n• ETL vs ELT\n• Batch vs Streaming pipelines\n• The Medallion Architecture (Bronze → Silver → Gold)\n• Why Data Engineering is the fastest-growing cloud skill in 2026\n\nUsing Asil (asil.dev) to learn Azure, AWS, and GCP data engineering for free.",
    hashtags: "#DataEngineering #Azure #AWS #GCP #CloudComputing #LearningInPublic"
  },
  '/learn/foundations/sql': {
    headline: "SQL Window Functions are a game changer for Data Engineers",
    body: "Just completed the SQL for Data Engineers module. The concept that clicked for me today: Window Functions.\n\nROW_NUMBER(), RANK(), LAG(), LEAD(), and SUM() OVER () — these are not just nice-to-know. Every data engineering interview tests these.\n\nMost useful pattern I learned:\n\nSELECT *, LAG(revenue) OVER (PARTITION BY region ORDER BY date) AS prev_month\nFROM sales\n\nThis calculates month-over-month revenue per region in a single query. No joins needed.\n\nStudying on Asil — 100% free data engineering education.",
    hashtags: "#SQL #DataEngineering #WindowFunctions #LearningInPublic #DataAnalytics"
  },
  '/learn/azure/adf': {
    headline: "I just learned how Azure Data Factory orchestrates data pipelines",
    body: "ADF is not a transformation tool — it is an orchestration tool. That distinction took me a while to understand.\n\nHere is what ADF actually does:\n• Triggers Databricks notebooks on a schedule (2am daily)\n• Waits for each step to succeed before starting the next\n• Sends alerts if anything fails\n• Logs every run for debugging\n\nYou do NOT run Spark inside ADF. You call Databricks to run Spark. ADF just coordinates.\n\nLearning Azure data engineering for free on Asil.",
    hashtags: "#Azure #AzureDataFactory #DataEngineering #ADF #CloudData #LearningInPublic"
  },
  '/learn/azure/databricks': {
    headline: "Just completed Azure Databricks — Delta Lake time travel is incredible",
    body: "Completed the Azure Databricks module today. The feature that blew my mind: Delta Lake time travel.\n\nYou can literally query a previous version of your table:\nSELECT * FROM sales VERSION AS OF 5\n\nMessed up a transformation? Roll back:\nRESTORE TABLE sales TO VERSION AS OF 10\n\nThis is why production data pipelines use Delta Lake instead of plain Parquet.\n\nFull Medallion Architecture implementation completed:\n✅ Bronze layer (raw CSV in ADLS Gen2)\n✅ Silver layer (cleaned Delta table)\n✅ Gold layer (aggregated business tables)\n\nLearning on Asil — completely free.",
    hashtags: "#AzureDatabricks #DeltaLake #DataEngineering #Spark #Azure #LearningInPublic"
  },
  '/learn/gcp/bigquery': {
    headline: "BigQuery just redefined how I think about data warehouses",
    body: "Just finished the Google BigQuery module and my mind is blown.\n\nBigQuery is completely serverless — there is no cluster to provision, no sizing decisions, no idle costs. You write SQL and Google allocates compute across thousands of machines automatically.\n\nThe most important optimization I learned:\n• Partitioning: queries only scan matching date partitions\n• Clustering: sorts data within partitions for even faster filtering\n• Together they can cut query costs by 90%+ on large tables\n\nThis is fundamentally different from Redshift or Synapse. No ops. Just SQL.\n\nFree GCP data engineering course at Asil.",
    hashtags: "#BigQuery #GCP #GoogleCloud #DataEngineering #DataWarehouse #LearningInPublic"
  },
  '/learn/projects/azure-batch-pipeline': {
    headline: "I just built my first end-to-end Azure data pipeline from scratch",
    body: "Project 1 COMPLETE on Asil 🎉\n\nBuilt a complete Retail Sales Batch Pipeline on Azure using the Medallion Architecture:\n\n🏗️ Tech Stack:\n• ADLS Gen2 — Bronze/Silver/Gold storage layers\n• Azure Data Factory — Pipeline orchestration\n• Azure Databricks — PySpark transformations\n• Azure Synapse Analytics — Analyst SQL queries\n\n📊 What the pipeline does:\n1. Raw sales CSV lands in Bronze (ADLS Gen2)\n2. ADF triggers Databricks at 2am daily\n3. Databricks cleans, validates, and creates Delta Lake Silver layer\n4. Gold layer aggregates: daily sales, customer LTV, regional performance\n5. Analysts query Gold via Synapse SQL\n\nThis is a portfolio-ready project. If you want to land a data engineering job in 2026, this is the kind of thing recruiters want to see.\n\n100% free at asil.dev",
    hashtags: "#Azure #DataEngineering #Portfolio #AzureDatabricks #ADF #Synapse #LearningInPublic #H1B"
  },
}

const DEFAULT_POST = {
  headline: "I am learning Data Engineering on Asil",
  body: "Starting my cloud data engineering journey today using Asil — a completely free learning platform covering Azure, AWS, and GCP.\n\nCurrent learning path:\n✅ What is Data Engineering\n📚 SQL for Data Engineers (in progress)\n⏳ Azure, AWS, GCP tracks\n⏳ End-to-end projects\n\nThe goal: land a data engineering role with H1B sponsorship in the US.\n\nFree resources at asil.dev",
  hashtags: "#DataEngineering #Azure #AWS #GCP #LearningInPublic #CloudData"
}

interface Props {
  pageHref?: string
}

export function LinkedInGenerator({ pageHref }: Props) {
  const [open, setOpen] = useState(false)
  const [copied, setCopied] = useState(false)

  const post = (pageHref && POSTS[pageHref]) || DEFAULT_POST
  const fullText = `${post.headline}\n\n${post.body}\n\n${post.hashtags}`

  function copy() {
    navigator.clipboard.writeText(fullText.replace(/\\n/g, '\n'))
    setCopied(true)
    setTimeout(() => setCopied(false), 2500)
  }

  return (
    <div className="mt-6 rounded-2xl overflow-hidden" style={{ border: '1px solid rgba(0,119,181,0.3)', background: 'rgba(0,119,181,0.04)' }}>
      <button onClick={() => setOpen(!open)}
        className="w-full flex items-center gap-3 px-5 py-4 text-left"
        style={{ color: 'var(--text)' }}>
        <Linkedin size={18} style={{ color: '#0077b5', flexShrink: 0 }} />
        <div className="flex-1">
          <div className="font-display font-semibold text-sm">Share this on LinkedIn</div>
          <div className="text-xs font-mono mt-0.5" style={{ color: 'var(--muted)' }}>
            Pre-written post ready to copy — builds your personal brand
          </div>
        </div>
        <ChevronDown size={14} style={{ color: 'var(--muted)', transform: open ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }} />
      </button>

      {open && (
        <div className="px-5 pb-5">
          <div className="rounded-xl p-4 mb-3 text-sm leading-relaxed whitespace-pre-line"
            style={{ background: 'var(--bg)', border: '1px solid var(--border)', color: 'var(--text2)', fontFamily: 'Lora, serif', maxHeight: '280px', overflowY: 'auto' }}>
            <strong style={{ color: 'var(--text)' }}>{post.headline}</strong>
            {`\n\n${post.body}\n\n`}
            <span style={{ color: '#0077b5' }}>{post.hashtags}</span>
          </div>
          <div className="flex items-center gap-3">
            <button onClick={copy} className="btn-primary flex-1 justify-center">
              {copied ? <><Check size={14} /> Copied!</> : <><Copy size={14} /> Copy Post</>}
            </button>
            <a href="https://www.linkedin.com/feed/" target="_blank" rel="noopener noreferrer"
              className="btn-secondary px-4">
              Open LinkedIn
            </a>
          </div>
          <p className="text-xs text-center mt-3" style={{ color: 'var(--muted)', fontFamily: 'Lora, serif' }}>
            Paste on LinkedIn → add your own thoughts → post. Consistency builds your network.
          </p>
        </div>
      )}
    </div>
  )
}
