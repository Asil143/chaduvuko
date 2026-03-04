import { LearnLayout } from '@/components/content/LearnLayout'
import { CodeBlock } from '@/components/content/CodeBlock'

export const metadata = { title: 'What is Data Engineering? — Asil' }

export default function WhatIsDataEngineeringPage() {
  return (
    <LearnLayout
      title="What is Data Engineering?"
      description="Before you touch a single Azure service or write a line of PySpark, you need to understand what you are actually building and why companies pay so much to hire people who can build it."
      section="Foundations"
      readTime="10 min"
      updatedAt="March 2025"
      showSalary={false}
      breadcrumbs={[
        { label: 'Learn', href: '/learn/roadmap' },
        { label: 'What is Data Engineering?', href: '/learn/what-is-data-engineering' },
      ]}
    >
      <h2>The simplest definition</h2>
      <p>
        A data engineer builds the pipes that move data from where it is created to where it is useful.
      </p>
      <p>
        That is it. Everything else — the cloud platforms, the Spark clusters, the Medallion Architecture — is just how you build those pipes.
      </p>

      <h2>A concrete example</h2>
      <p>
        Imagine you work at a retail company. Every day, thousands of customers buy things. Each purchase creates a record in the sales database — product, quantity, price, store, timestamp.
      </p>
      <p>
        The business wants to know: what are the top-selling products this week? Which stores are underperforming? What should we restock?
      </p>
      <p>
        None of that happens automatically. Someone has to:
      </p>
      <ul>
        <li>Extract the raw sales data from the database</li>
        <li>Clean it (remove duplicates, fix bad data, handle missing values)</li>
        <li>Aggregate it (sum by product, group by store, calculate week-over-week)</li>
        <li>Load it somewhere analysts can query it — a data warehouse</li>
        <li>Make sure it runs every day without breaking</li>
      </ul>
      <p>That is what a data engineer does. You build the system that makes this happen automatically, reliably, every single day.</p>

      <h2>What a data analyst does vs what you do</h2>
      <p>
        Data analysts ask questions and find answers. They open a dashboard or write SQL queries to explore data.
      </p>
      <p>
        Data engineers make sure that data exists in a clean, reliable, queryable form. You build the infrastructure analysts depend on.
      </p>
      <p>
        If an analyst is asking "why are sales down in Region 3?", you are the person who made sure the sales data was there in the first place.
      </p>
      <p>
        Both jobs need SQL. But your SQL is for building pipelines. Their SQL is for answering questions.
      </p>

      <h2>Batch vs streaming — the two main approaches</h2>
      <p>
        Almost every pipeline you build will fall into one of two categories.
      </p>
      <p>
        <strong>Batch processing</strong> — collect data over a period of time, then process it all at once. Run at 2am, process yesterday's data, write results, done. Most pipelines in most companies are batch. Simpler, cheaper, easier to debug.
      </p>
      <p>
        <strong>Streaming</strong> — process data the moment it arrives, event by event, with latency measured in milliseconds. Used when the business genuinely cannot wait — fraud detection on a credit card transaction, real-time inventory during a flash sale.
      </p>
      <p>
        Start with batch. Understand it deeply. Most entry-level DE jobs are batch pipelines.
      </p>

      <h2>The Medallion Architecture — your main design pattern</h2>
      <p>
        Every employer will ask about this. It is the most common data lake design pattern and it is simple once you understand the idea.
      </p>
      <p>
        Raw data from the source lands in a <strong>Bronze</strong> layer. Exactly as-is. No changes. This is your backup — if anything goes wrong downstream, you reprocess from Bronze.
      </p>
      <p>
        Bronze gets cleaned and validated in a <strong>Silver</strong> layer. Nulls removed. Duplicates dropped. Columns typed correctly. This is where data quality happens.
      </p>
      <p>
        Silver gets aggregated and shaped into <strong>Gold</strong> for analysts. Daily sales totals. Customer lifetime value. Regional rankings. Gold tables are what dashboards and reports connect to.
      </p>
      <CodeBlock language="text" filename="Medallion Architecture" code={`Raw Sales CSV → Bronze (ADLS Gen2)
                  ↓
          ADF triggers at 2am
                  ↓
     Databricks cleans → Silver (Delta Lake)
                  ↓
  Databricks aggregates → Gold (Delta Lake)
                  ↓
      Synapse / Power BI queries Gold`} />

      <h2>What the actual job looks like day to day</h2>
      <p>A typical week as a junior data engineer at a consulting firm:</p>
      <ul>
        <li><strong>Monday</strong> — A pipeline failed over the weekend. You check the logs, find the source system sent a file with wrong column names. You fix the schema handling and redeploy.</li>
        <li><strong>Tuesday</strong> — The business analyst asks why last month's sales numbers look different from last week's report. You trace through the pipeline and find a timezone issue. You fix it and document the root cause.</li>
        <li><strong>Wednesday</strong> — You are building a new Silver transformation for a new data source (customer returns). You write PySpark code, test it on sample data, review it with your team.</li>
        <li><strong>Thursday</strong> — You configure Azure Data Factory to run the new pipeline on a schedule and set up monitoring alerts for failures.</li>
        <li><strong>Friday</strong> — Code review, documentation, and a conversation with the data analyst about what the Gold layer should look like.</li>
      </ul>
      <p>
        Notice that it is mostly debugging, building, and communicating. Not fancy machine learning. Not complex math. Clear thinking and clean code.
      </p>

      <h2>Why the money is good</h2>
      <p>
        Every company runs on data now. When a data pipeline breaks, business decisions cannot be made. Reports are wrong. Analysts are blocked. Executives are asking questions nobody can answer.
      </p>
      <p>
        Data engineers keep the lights on. That is why the pay is high and the job market is strong — the work is critical and there are not enough people who know how to do it well.
      </p>
      <p>
        For someone coming from India targeting H1B roles in the US, data engineering is one of the best paths. Consulting firms like Deloitte, Accenture, and Cognizant hire hundreds of data engineers annually and sponsor H1B visas consistently.
      </p>

      <h2>What you need to learn — in order</h2>
      <ol>
        <li><strong>SQL</strong> — you will use this every single day. Window functions, CTEs, aggregations.</li>
        <li><strong>Python</strong> — for writing pipeline code, PySpark, data validation scripts.</li>
        <li><strong>One cloud platform deeply</strong> — Azure is the best first choice for H1B/consulting roles.</li>
        <li><strong>Apache Spark / PySpark</strong> — the standard distributed processing engine.</li>
        <li><strong>Delta Lake or Iceberg</strong> — the standard table format for data lakes.</li>
        <li><strong>Orchestration</strong> — ADF for Azure, Airflow for multi-cloud.</li>
        <li><strong>One real project</strong> — end-to-end, on a real cloud, with real data.</li>
      </ol>
      <p>That is the full list. Everything on Asil is structured around those seven things.</p>
    </LearnLayout>
  )
}