import { LearnLayout } from '@/components/content/LearnLayout'
import { CodeBlock } from '@/components/content/CodeBlock'

export const metadata = { title: 'SQL for Data Engineers — Asil' }

export default function SQLPage() {
  return (
    <LearnLayout
      title="SQL for Data Engineers"
      description="Not SQL for beginners — SQL for people who need to build pipelines, debug data quality issues, and answer hard questions from analysts. The parts that actually come up in interviews and on the job."
      section="Foundations"
      readTime="25 min"
      updatedAt="March 2025"
      breadcrumbs={[
        { label: 'Foundations', href: '/learn/roadmap' },
        { label: 'SQL for Data Engineers', href: '/learn/foundations/sql' },
      ]}
    >
      <h2>Why SQL is not optional</h2>
      <p>
        Every data engineering interview has SQL questions. Every data engineering job uses SQL daily — to validate pipeline output, to write Gold layer transformations, to debug data quality issues, to answer ad-hoc questions from analysts.
      </p>
      <p>
        PySpark, Python, and cloud tools are important. But SQL is the one skill that never goes away regardless of which cloud, which tool, or which company you work at.
      </p>

      <h2>The JOIN types — and when each one actually applies</h2>
      <p>Most people know INNER JOIN. The ones that catch you in interviews are LEFT JOIN and the edge cases.</p>
      <CodeBlock language="sql" filename="join_types.sql" code={`-- INNER JOIN: only rows where both sides match
SELECT o.order_id, c.customer_name
FROM orders o
INNER JOIN customers c ON o.customer_id = c.customer_id

-- LEFT JOIN: every row from orders, even if no matching customer
-- (useful for finding orphaned records — data quality check)
SELECT o.order_id, c.customer_name
FROM orders o
LEFT JOIN customers c ON o.customer_id = c.customer_id
WHERE c.customer_id IS NULL  -- orders with no matching customer

-- SELF JOIN: join a table to itself
-- (useful for finding duplicates or hierarchies)
SELECT a.order_id, b.order_id as duplicate_id
FROM orders a
JOIN orders b
  ON a.customer_id = b.customer_id
  AND a.order_date = b.order_date
  AND a.order_id < b.order_id  -- avoid matching row with itself`} />

      <h2>Window functions — the most important thing to master</h2>
      <p>
        Window functions let you do calculations across rows without collapsing them into groups. Every senior data engineer uses them constantly. Every interview asks about them.
      </p>
      <CodeBlock language="sql" filename="window_functions.sql" code={`-- ROW_NUMBER: unique rank per partition, no ties
SELECT
  order_id,
  customer_id,
  order_date,
  amount,
  ROW_NUMBER() OVER (PARTITION BY customer_id ORDER BY order_date) as order_seq
FROM orders
-- Result: each customer's orders numbered 1,2,3... in date order

-- RANK vs DENSE_RANK (the interview trap question)
SELECT
  product_name,
  revenue,
  RANK()       OVER (ORDER BY revenue DESC) as rank_with_gaps,     -- 1,2,2,4
  DENSE_RANK() OVER (ORDER BY revenue DESC) as rank_no_gaps        -- 1,2,2,3
FROM product_revenue

-- LAG and LEAD: access previous or next row's value
SELECT
  order_date,
  daily_revenue,
  LAG(daily_revenue) OVER (ORDER BY order_date)        as prev_day_revenue,
  daily_revenue - LAG(daily_revenue) OVER (ORDER BY order_date) as day_over_day_change
FROM daily_sales

-- Running total (cumulative sum)
SELECT
  order_date,
  daily_revenue,
  SUM(daily_revenue) OVER (ORDER BY order_date ROWS UNBOUNDED PRECEDING) as running_total
FROM daily_sales

-- Percentage of total using window function
SELECT
  region,
  revenue,
  revenue * 100.0 / SUM(revenue) OVER () as pct_of_total
FROM regional_sales`} />

      <h2>CTEs — how to write SQL that is actually readable</h2>
      <p>
        CTE stands for Common Table Expression. It is a named temporary result set you define with a WITH clause. Use them to break complex queries into readable steps.
      </p>
      <CodeBlock language="sql" filename="cte_example.sql" code={`-- Without CTEs (hard to read and debug)
SELECT customer_id, SUM(amount) as ltv
FROM (
  SELECT o.customer_id, o.amount
  FROM orders o
  WHERE o.status = 'completed'
  AND o.order_date >= '2024-01-01'
) filtered
GROUP BY customer_id
HAVING SUM(amount) > 1000

-- With CTEs (easy to read, easy to debug one step at a time)
WITH completed_orders AS (
  SELECT customer_id, amount
  FROM orders
  WHERE status = 'completed'
  AND order_date >= '2024-01-01'
),
customer_ltv AS (
  SELECT customer_id, SUM(amount) as ltv
  FROM completed_orders
  GROUP BY customer_id
)
SELECT *
FROM customer_ltv
WHERE ltv > 1000`} />

      <h2>GROUP BY vs HAVING — the one that trips people up</h2>
      <CodeBlock language="sql" filename="groupby_having.sql" code={`-- WHERE filters rows BEFORE grouping
-- HAVING filters groups AFTER grouping

-- Wrong: this errors because you can't use aggregate in WHERE
SELECT region, COUNT(*) as order_count
FROM orders
WHERE COUNT(*) > 100  -- ERROR
GROUP BY region

-- Correct: use HAVING for aggregate conditions
SELECT region, COUNT(*) as order_count
FROM orders
GROUP BY region
HAVING COUNT(*) > 100  -- works

-- Both together
SELECT region, COUNT(*) as order_count
FROM orders
WHERE order_date >= '2024-01-01'  -- filter rows first
GROUP BY region
HAVING COUNT(*) > 100  -- then filter groups`} />

      <h2>A real data quality check query</h2>
      <p>
        Data engineers write queries like this to validate pipeline output. You run this against your Silver layer to make sure the Bronze-to-Silver transformation worked correctly.
      </p>
      <CodeBlock language="sql" filename="data_quality_check.sql" code={`-- Check 1: null counts per column
SELECT
  COUNT(*) as total_rows,
  COUNT(*) - COUNT(order_id)    as null_order_ids,
  COUNT(*) - COUNT(customer_id) as null_customer_ids,
  COUNT(*) - COUNT(amount)      as null_amounts,
  COUNT(*) - COUNT(order_date)  as null_dates
FROM silver.orders

-- Check 2: duplicate order IDs
SELECT order_id, COUNT(*) as cnt
FROM silver.orders
GROUP BY order_id
HAVING COUNT(*) > 1

-- Check 3: amount range sanity check
SELECT
  MIN(amount)    as min_amount,
  MAX(amount)    as max_amount,
  AVG(amount)    as avg_amount,
  COUNT(CASE WHEN amount < 0 THEN 1 END) as negative_amounts,
  COUNT(CASE WHEN amount > 100000 THEN 1 END) as suspiciously_large
FROM silver.orders

-- Check 4: row count comparison (Silver should have fewer rows than Bronze after dedup)
SELECT
  (SELECT COUNT(*) FROM bronze.orders) as bronze_count,
  (SELECT COUNT(*) FROM silver.orders) as silver_count,
  (SELECT COUNT(*) FROM bronze.orders) - (SELECT COUNT(*) FROM silver.orders) as removed_rows`} />

      <h2>Month-over-month comparison — a classic analyst request</h2>
      <p>Analysts ask for this constantly. Know how to write it without thinking.</p>
      <CodeBlock language="sql" filename="mom_comparison.sql" code={`WITH monthly_revenue AS (
  SELECT
    DATE_TRUNC('month', order_date) as month,
    SUM(amount) as revenue
  FROM orders
  GROUP BY DATE_TRUNC('month', order_date)
)
SELECT
  month,
  revenue,
  LAG(revenue) OVER (ORDER BY month) as prev_month_revenue,
  revenue - LAG(revenue) OVER (ORDER BY month) as change,
  ROUND(
    (revenue - LAG(revenue) OVER (ORDER BY month)) * 100.0
    / NULLIF(LAG(revenue) OVER (ORDER BY month), 0),
    1
  ) as pct_change
FROM monthly_revenue
ORDER BY month`} />
      <p>
        Notice <code>NULLIF(..., 0)</code> — this prevents division by zero if the previous month had zero revenue. Small details like this are what separate people who write SQL versus people who write production-quality SQL.
      </p>

      <h2>Top N per group — another common interview question</h2>
      <CodeBlock language="sql" filename="top_n_per_group.sql" code={`-- Top 3 products by revenue per region
WITH ranked_products AS (
  SELECT
    region,
    product_name,
    revenue,
    ROW_NUMBER() OVER (PARTITION BY region ORDER BY revenue DESC) as rn
  FROM product_sales
)
SELECT region, product_name, revenue
FROM ranked_products
WHERE rn <= 3
ORDER BY region, rn`} />

      <h2>What to practice</h2>
      <p>
        Do not just read these examples. Type them out. Change them. Break them on purpose and fix them. The best free practice resources are <strong>LeetCode</strong> (filter for SQL, medium difficulty) and <strong>StrataScratch</strong> which has real interview questions from actual companies.
      </p>
      <p>
        When you can write a window function without looking it up and explain WHY you used it — you are ready.
      </p>
    </LearnLayout>
  )
}