import { LearnLayout } from '@/components/content/LearnLayout'
import { Callout } from '@/components/content/Callout'
import { CodeBlock } from '@/components/content/CodeBlock'
import { KeyTakeaways } from '@/components/content/KeyTakeaways'

const windowCode = `-- Window functions -- the most important advanced SQL concept for DEs
-- Calculate running total and rank for sales by region

SELECT
    order_date,
    region,
    product,
    sales_amount,
    -- Running total within each region
    SUM(sales_amount) OVER (
        PARTITION BY region 
        ORDER BY order_date
        ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW
    ) AS running_total,
    -- Rank products by sales within each region
    RANK() OVER (
        PARTITION BY region 
        ORDER BY sales_amount DESC
    ) AS rank_in_region,
    -- Compare current day to previous day
    LAG(sales_amount, 1, 0) OVER (
        PARTITION BY region, product 
        ORDER BY order_date
    ) AS prev_day_sales
FROM gold.daily_sales
WHERE order_date >= '2025-01-01'
ORDER BY region, order_date;`

const cteCode = `-- CTEs (Common Table Expressions) -- how to write readable complex queries
-- Find customers who bought in 3+ consecutive months

WITH monthly_purchases AS (
    SELECT
        customer_id,
        DATE_TRUNC('month', order_date) AS purchase_month,
        COUNT(*) AS orders_in_month
    FROM silver.orders
    GROUP BY customer_id, DATE_TRUNC('month', order_date)
),
ranked_months AS (
    SELECT
        customer_id,
        purchase_month,
        -- Subtract row number to find consecutive groups
        DATE_TRUNC('month', purchase_month) - 
            (ROW_NUMBER() OVER (PARTITION BY customer_id ORDER BY purchase_month) * INTERVAL '1 month') 
            AS grp
    FROM monthly_purchases
),
streaks AS (
    SELECT
        customer_id,
        COUNT(*) AS consecutive_months
    FROM ranked_months
    GROUP BY customer_id, grp
)
SELECT customer_id, MAX(consecutive_months) AS longest_streak
FROM streaks
WHERE MAX(consecutive_months) >= 3
GROUP BY customer_id
ORDER BY longest_streak DESC;`

export const metadata = { title: 'SQL for Data Engineers' }

export default function SQLPage() {
  return (
    <LearnLayout
      title="SQL for Data Engineers"
      description="SQL is the single most important skill for a data engineer. Not basic SQL — the advanced SQL that you use every day to transform, validate, and analyze data at scale."
      section="Section 01 · Foundations"
      readTime="20 min read"
      updatedAt="March 2025"
      breadcrumbs={[
        { label: 'Foundations', href: '/learn/what-is-data-engineering' },
        { label: 'SQL for Data Engineers', href: '/learn/foundations/sql' },
      ]}
    >

      <h2 id="why-sql-matters">Why SQL is still the most important skill in 2025</h2>
      <p>
        You might think SQL is old. It's from the 1970s. Surely in the world of Spark, Kafka, and Databricks, SQL has been replaced by something better?
      </p>
      <p>
        Absolutely not. SQL is everywhere in data engineering — and knowing it deeply separates junior engineers from senior ones. You use SQL to query data warehouses, write Spark transformations (PySpark supports SQL directly), create Synapse views, validate data quality, and debug pipelines. If your SQL is weak, everything else suffers.
      </p>

      <Callout type="tip">
        If you can only do one thing before your first data engineering interview, make it this: practice writing window functions, CTEs, and complex aggregations until they feel natural. These appear in almost every technical interview screen.
      </Callout>

      <h2 id="concepts">The SQL concepts every data engineer must know</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 my-6">
        {[
          { title:'JOINs', level:'Must know', desc:'INNER, LEFT, RIGHT, FULL OUTER, CROSS. Know when to use each and what the performance implications are on large datasets.' },
          { title:'Window Functions', level:'Must know', desc:'ROW_NUMBER, RANK, DENSE_RANK, LAG, LEAD, SUM OVER, AVG OVER. These are the advanced SQL concept that most people struggle with.' },
          { title:'CTEs (WITH clauses)', level:'Must know', desc:'The clean way to write complex multi-step queries. Every senior data engineer writes CTEs — not nested subqueries.' },
          { title:'Aggregations', level:'Must know', desc:'GROUP BY, HAVING, ROLLUP, CUBE, GROUPING SETS. Knowing the difference between WHERE and HAVING is a common interview question.' },
          { title:'Subqueries & Correlated Subqueries', level:'Should know', desc:'When to use them, when they kill performance, and how to rewrite them as JOINs or CTEs for better efficiency.' },
          { title:'Date & Time manipulation', level:'Must know', desc:'DATE_TRUNC, DATEDIFF, DATEADD, EXTRACT, time zone handling. Real data always has messy date issues.' },
          { title:'String functions', level:'Should know', desc:'SUBSTRING, REGEXP_REPLACE, SPLIT, CONCAT, UPPER, LOWER, TRIM. Text data is everywhere and often needs cleaning.' },
          { title:'NULL handling', level:'Must know', desc:'COALESCE, NULLIF, IS NULL, IS NOT NULL. NULLs cause more silent bugs than almost anything else in data pipelines.' },
        ].map(c => (
          <div key={c.title} className="rounded-xl p-4" style={{ background: 'var(--bg2)', border: '1px solid var(--border)' }}>
            <div className="flex items-center justify-between mb-1.5">
              <span className="font-display font-semibold text-sm" style={{ color: 'var(--text)' }}>{c.title}</span>
              <span className="text-xs font-mono px-2 py-0.5 rounded"
                style={{ background: c.level === 'Must know' ? 'rgba(0,194,255,0.1)' : 'rgba(245,197,66,0.1)', color: c.level === 'Must know' ? 'var(--accent)' : 'var(--gold)' }}>
                {c.level}
              </span>
            </div>
            <p className="text-xs leading-relaxed" style={{ color: 'var(--muted)', fontFamily: 'Lora, serif' }}>{c.desc}</p>
          </div>
        ))}
      </div>

      <h2 id="window-functions">Window Functions — the most important advanced SQL topic</h2>
      <p>
        If there's one SQL concept that separates people who "know SQL" from people who really know SQL, it's window functions. They let you perform calculations across a set of rows that are related to the current row — without collapsing them into a single output row like GROUP BY does.
      </p>

      <CodeBlock code={windowCode} language="sql" filename="window_functions_example.sql" />

      <h2 id="ctes">CTEs — write SQL that humans can read</h2>
      <p>
        A CTE (Common Table Expression) is a named temporary result set defined within a SQL query using the <code>WITH</code> clause. They make complex queries dramatically more readable by breaking them into named logical steps. Every senior data engineer writes CTEs by default.
      </p>

      <CodeBlock code={cteCode} language="sql" filename="consecutive_months_cte.sql" />

      <Callout type="example">
        At a real company, a senior data engineer will reject code review PRs that use deeply nested subqueries instead of CTEs. Readability is not optional — other engineers need to maintain your code.
      </Callout>

      <KeyTakeaways items={[
        'SQL is the single most important skill for data engineers in 2025 — no tool or language replaces it',
        'Window functions (ROW_NUMBER, RANK, LAG, LEAD, running totals) are the most tested topic in technical interviews',
        'CTEs make complex queries readable — always prefer CTEs over deeply nested subqueries',
        'NULLs are silent killers in data pipelines — always handle them explicitly with COALESCE or NULLIF',
        'Date manipulation is constant in real data engineering — know DATE_TRUNC, DATEDIFF, and time zone handling cold',
        'Practice writing complex queries by hand — not just reading them. Interview screens require you to write from scratch',
      ]} />

    </LearnLayout>
  )
}
