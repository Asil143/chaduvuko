import { LearnLayout } from '@/components/content/LearnLayout';
import { KeyTakeaways } from '@/components/content/KeyTakeaways';
import SQLPlayground from '@/components/sql/SQLPlayground';
import Link from 'next/link';

const C = '#06b6d4';

const Part = ({ n, title }: { n: string; title: string }) => (
  <div style={{ marginBottom: 28 }}>
    <p style={{ fontSize: 11, color: C, fontFamily: 'var(--font-mono)', fontWeight: 700, margin: '0 0 8px', letterSpacing: '.1em' }}>// Part {n}</p>
    <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(20px,3vw,30px)', fontWeight: 900, letterSpacing: '-1.5px', color: 'var(--text)', margin: 0 }}>{title}</h2>
  </div>
);

const P = ({ children }: { children: React.ReactNode }) => (
  <p style={{ fontSize: 15, color: 'var(--text)', lineHeight: 1.9, margin: '0 0 18px' }}>{children}</p>
);

const Hl = ({ children }: { children: React.ReactNode }) => (
  <strong style={{ color: C }}>{children}</strong>
);

const HR = () => <div style={{ borderTop: '1px solid var(--border)', margin: '48px 0' }} />;

const Q = ({
  num, q, difficulty, topic, children,
}: {
  num: number; q: string; difficulty: 'Easy' | 'Medium' | 'Hard'; topic: string; children: React.ReactNode;
}) => {
  const diffColor = difficulty === 'Easy' ? '#00e676' : difficulty === 'Medium' ? '#f97316' : '#ff4757';
  return (
    <div style={{ marginBottom: 32, border: '1px solid var(--border)', borderRadius: 12, overflow: 'hidden' }}>
      <div style={{ padding: '14px 18px', background: 'var(--surface)', borderBottom: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 12, flexWrap: 'wrap' }}>
        <div style={{ flex: 1 }}>
          <p style={{ fontSize: 11, color: 'var(--muted)', fontFamily: 'var(--font-mono)', margin: '0 0 6px' }}>Q{String(num).padStart(2, '0')}</p>
          <p style={{ fontSize: 14, fontWeight: 700, color: 'var(--text)', margin: 0, lineHeight: 1.5 }}>{q}</p>
        </div>
        <div style={{ display: 'flex', gap: 8, flexShrink: 0 }}>
          <span style={{ fontSize: 11, fontWeight: 700, color: diffColor, background: `${diffColor}15`, padding: '3px 10px', borderRadius: 4 }}>{difficulty}</span>
          <span style={{ fontSize: 11, color: 'var(--muted)', background: 'var(--bg)', padding: '3px 10px', borderRadius: 4 }}>{topic}</span>
        </div>
      </div>
      <div style={{ padding: '16px 18px', fontSize: 14, color: 'var(--text)', lineHeight: 1.9 }}>{children}</div>
    </div>
  );
};

const Code = ({ children }: { children: string }) => (
  <pre style={{ margin: '10px 0', padding: '12px 14px', background: 'var(--bg2)', border: '1px solid var(--border)', borderRadius: 8, fontFamily: 'var(--font-mono)', fontSize: 12, lineHeight: 1.8, color: 'var(--text)', overflowX: 'auto', whiteSpace: 'pre' }}>{children}</pre>
);

export default function InterviewQuestions() {
  return (
    <LearnLayout
      title="Top 50 SQL Interview Questions"
      description="Every question that appears in data analyst and data engineer interviews — with complete answers, example queries, and the traps interviewers set"
      section="SQL — Module 61"
      readTime="60 min"
      updatedAt="April 2026"
    >

      <Part n="01" title="Basics and Core Concepts (Q1–Q10)" />

      <P>These questions appear in virtually every SQL interview. They test fundamental understanding of how SQL works — not just syntax recall, but the reasoning behind query execution, NULLs, and joins.</P>

      <Q num={1} q="What is the difference between WHERE and HAVING?" difficulty="Easy" topic="Filtering">
        <p style={{ margin: '0 0 10px' }}>WHERE filters rows <em>before</em> grouping. HAVING filters groups <em>after</em> grouping. WHERE runs against individual row values. HAVING runs against aggregated values (COUNT, SUM, AVG).</p>
        <Code>{`-- WHERE: filters rows before GROUP BY
SELECT store_id, SUM(total_amount) AS revenue
FROM orders
WHERE order_status = 'Delivered'   -- removes rows before aggregation
GROUP BY store_id;

-- HAVING: filters groups after GROUP BY
SELECT store_id, SUM(total_amount) AS revenue
FROM orders
GROUP BY store_id
HAVING SUM(total_amount) > 5000;   -- keeps only high-revenue stores

-- Together: WHERE filters rows, HAVING filters groups
SELECT store_id, SUM(total_amount) AS revenue
FROM orders
WHERE order_status = 'Delivered'
GROUP BY store_id
HAVING SUM(total_amount) > 5000;`}</Code>
        <p style={{ margin: '10px 0 0', color: 'var(--muted)', fontSize: 13 }}><strong style={{ color: C }}>Trap: </strong>You cannot use WHERE SUM(total_amount) {'>'} 5000 — aggregate functions are not allowed in WHERE because the aggregation has not happened yet. The interviewer may ask you to fix a query that incorrectly uses WHERE with an aggregate.</p>
      </Q>

      <Q num={2} q="What is the difference between INNER JOIN, LEFT JOIN, and FULL OUTER JOIN?" difficulty="Easy" topic="JOINs">
        <p style={{ margin: '0 0 10px' }}>INNER JOIN returns only rows where the join condition matches in both tables — unmatched rows from either table are excluded. LEFT JOIN returns all rows from the left table, with NULL for columns from the right table when no match exists. FULL OUTER JOIN returns all rows from both tables, with NULL on whichever side has no match.</p>
        <Code>{`-- INNER: only matched rows
SELECT c.first_name, o.order_id
FROM customers c INNER JOIN orders o ON c.customer_id = o.customer_id;
-- Customers with no orders do NOT appear

-- LEFT: all customers, NULL order columns if no orders
SELECT c.first_name, o.order_id
FROM customers c LEFT JOIN orders o ON c.customer_id = o.customer_id;
-- Customers with no orders appear with NULL order_id

-- FULL OUTER: all customers + all orders
SELECT c.first_name, o.order_id
FROM customers c FULL OUTER JOIN orders o ON c.customer_id = o.customer_id;
-- SQLite: simulate with LEFT JOIN UNION ALL RIGHT JOIN equivalent`}</Code>
        <p style={{ margin: '10px 0 0', color: 'var(--muted)', fontSize: 13 }}><strong style={{ color: C }}>Trap: </strong>The interviewer may ask "find customers who have never placed an order." Correct answer: LEFT JOIN + WHERE o.order_id IS NULL, or NOT EXISTS. Wrong answer: WHERE o.order_id = 0 or WHERE o.order_id IS NOT NULL.</p>
      </Q>

      <Q num={3} q="What is the difference between UNION and UNION ALL?" difficulty="Easy" topic="Set Operations">
        <p style={{ margin: '0 0 10px' }}>UNION removes duplicate rows from the combined result — it performs an implicit DISTINCT. UNION ALL keeps all rows including duplicates. UNION ALL is always faster because it does not need to sort and deduplicate. Use UNION only when you specifically need to eliminate duplicates; use UNION ALL otherwise.</p>
        <Code>{`-- UNION: deduplicates (slower)
SELECT customer_id FROM premium_customers
UNION
SELECT customer_id FROM newsletter_subscribers;

-- UNION ALL: keeps duplicates (faster)
SELECT customer_id FROM premium_customers
UNION ALL
SELECT customer_id FROM newsletter_subscribers;
-- If a customer is in both, they appear twice`}</Code>
        <p style={{ margin: '10px 0 0', color: 'var(--muted)', fontSize: 13 }}><strong style={{ color: C }}>Trap: </strong>When combining tables for row counts or totals where duplicates are legitimate (e.g., combining order logs from two regions), UNION would silently discard valid rows. Always ask whether duplicates should be preserved before choosing.</p>
      </Q>

      <Q num={4} q="How do you find duplicate rows in a table?" difficulty="Easy" topic="Aggregation">
        <p style={{ margin: '0 0 10px' }}>Group by the columns that define uniqueness and use HAVING COUNT(*) {'>'} 1.</p>
        <Code>{`-- Find customers with duplicate email addresses
SELECT email, COUNT(*) AS occurrences
FROM customers
GROUP BY email
HAVING COUNT(*) > 1
ORDER BY occurrences DESC;

-- Show all columns for the duplicate rows
SELECT *
FROM customers
WHERE email IN (
  SELECT email
  FROM customers
  GROUP BY email
  HAVING COUNT(*) > 1
)
ORDER BY email;`}</Code>
      </Q>

      <Q num={5} q="What is a NULL and how is it different from 0 or an empty string?" difficulty="Easy" topic="NULLs">
        <p style={{ margin: '0 0 10px' }}>NULL represents the <em>absence of a value</em> — unknown or not applicable. 0 is a known numeric value (zero). An empty string '' is a known string value (no characters). NULL is not equal to anything — not even itself. NULL = NULL evaluates to NULL (unknown), not TRUE.</p>
        <Code>{`-- NULL comparisons: always use IS NULL, not = NULL
SELECT * FROM orders WHERE delivery_date IS NULL;     -- correct
SELECT * FROM orders WHERE delivery_date = NULL;      -- returns 0 rows (wrong)

-- NULL arithmetic: any operation with NULL = NULL
SELECT 100 + NULL;    -- NULL
SELECT NULL = NULL;   -- NULL (not TRUE)
SELECT NULL IS NULL;  -- TRUE (correct test)

-- Aggregates ignore NULLs silently
SELECT AVG(delivery_date) FROM orders;
-- Averages only non-NULL delivery dates — no warning

-- COALESCE: replace NULL with a default
SELECT COALESCE(delivery_date, 'Not delivered') FROM orders;`}</Code>
        <p style={{ margin: '10px 0 0', color: 'var(--muted)', fontSize: 13 }}><strong style={{ color: C }}>Trap: </strong>COUNT(*) counts all rows including NULLs. COUNT(column) counts only non-NULL values. The difference can be significant — the interviewer may show a query where COUNT(*) and COUNT(col) return different values and ask why.</p>
      </Q>

      <Q num={6} q="What is the difference between DELETE, TRUNCATE, and DROP?" difficulty="Easy" topic="DDL / DML">
        <p style={{ margin: '0 0 10px' }}>DELETE removes specific rows based on a WHERE clause. It is transactional (can be rolled back) and fires triggers. TRUNCATE removes all rows from a table instantly — faster than DELETE for bulk removal, non-transactional in most databases, does not fire row-level triggers. DROP removes the entire table structure and all its data permanently.</p>
        <Code>{`DELETE FROM orders WHERE order_status = 'Cancelled';
-- Removes matching rows. Transactional. Fires triggers.

-- TRUNCATE orders;  -- removes ALL rows. Fast. No WHERE clause.
-- Not available in SQLite — use DELETE FROM orders; instead.

-- DROP TABLE orders;   -- removes table + data + indexes + constraints
-- Cannot be rolled back in most databases. Permanent.`}</Code>
      </Q>

      <Q num={7} q="What is a self-join and when do you use it?" difficulty="Medium" topic="JOINs">
        <p style={{ margin: '0 0 10px' }}>A self-join joins a table to itself using two different aliases. Use it when a table has a hierarchical relationship within itself (employee-manager, category-parent) or when comparing rows within the same table.</p>
        <Code>{`-- Find customers who placed orders on the same date as another customer
SELECT
  a.customer_id  AS customer_a,
  b.customer_id  AS customer_b,
  a.order_date
FROM orders AS a
JOIN orders AS b
  ON  a.order_date   = b.order_date
  AND a.customer_id  < b.customer_id   -- avoid (A,B) and (B,A) duplicates
ORDER BY a.order_date;`}</Code>
      </Q>

      <Q num={8} q="What is a correlated subquery and what is its performance implication?" difficulty="Medium" topic="Subqueries">
        <p style={{ margin: '0 0 10px' }}>A correlated subquery references a column from the outer query. The inner query executes once per outer row — O(n) executions. For large tables, this is the SQL N+1 problem: 10,000 outer rows = 10,000 subquery executions.</p>
        <Code>{`-- Correlated subquery: runs once per customer (N+1)
SELECT customer_id,
  (SELECT SUM(total_amount) FROM orders
   WHERE customer_id = c.customer_id) AS total_spent
FROM customers AS c;

-- Better: JOIN with aggregation (one pass)
SELECT c.customer_id, COALESCE(SUM(o.total_amount), 0) AS total_spent
FROM customers AS c
LEFT JOIN orders AS o ON o.customer_id = c.customer_id
GROUP BY c.customer_id;`}</Code>
        <p style={{ margin: '10px 0 0', color: 'var(--muted)', fontSize: 13 }}><strong style={{ color: C }}>Exception: </strong>EXISTS / NOT EXISTS correlated subqueries are often efficient — the planner can often push them into a semi-join or hash join internally. The performance trap is the correlated subquery in the SELECT list.</p>
      </Q>

      <Q num={9} q="What is the order of SQL clause execution?" difficulty="Medium" topic="Query Execution">
        <p style={{ margin: '0 0 10px' }}>SQL clauses execute in this order: FROM/JOIN → WHERE → GROUP BY → HAVING → SELECT → DISTINCT → ORDER BY → LIMIT. This order explains several rules: you cannot use SELECT aliases in WHERE (WHERE runs before SELECT); you cannot use aggregate functions in WHERE (aggregation happens after WHERE); you can use SELECT aliases in ORDER BY (ORDER BY runs after SELECT).</p>
        <Code>{`-- Execution order matters for understanding errors:
SELECT
  customer_id,
  SUM(total_amount) AS total_spent   -- evaluated at step 5
FROM orders
WHERE total_spent > 1000             -- ERROR: alias not yet defined
-- Fix: use HAVING SUM(total_amount) > 1000`}</Code>
      </Q>

      <Q num={10} q="What is the difference between a PRIMARY KEY and a UNIQUE constraint?" difficulty="Easy" topic="Constraints">
        <p style={{ margin: '0 0 10px' }}>Both enforce uniqueness, but: a PRIMARY KEY additionally enforces NOT NULL — no NULL values allowed. A table can have only one PRIMARY KEY but multiple UNIQUE constraints. A UNIQUE constraint allows NULL values (and in most databases, multiple NULLs — since NULL != NULL, multiple NULLs do not violate uniqueness).</p>
        <Code>{`CREATE TABLE products (
  product_id   INTEGER PRIMARY KEY,   -- unique + NOT NULL
  sku          TEXT    UNIQUE,         -- unique, but NULLs allowed
  product_name TEXT    NOT NULL
);

-- Multiple NULLs in a UNIQUE column are allowed in SQLite:
INSERT INTO products (product_id, product_name) VALUES (1, 'Milk');
INSERT INTO products (product_id, product_name) VALUES (2, 'Butter');
-- Both have NULL sku — this is valid in SQLite`}</Code>
      </Q>

      <HR />

      <Part n="02" title="Aggregation and Window Functions (Q11–Q20)" />

      <Q num={11} q="Find the second highest salary (or second highest order value)" difficulty="Medium" topic="Aggregation">
        <p style={{ margin: '0 0 10px' }}>Three approaches: subquery with MAX where value is less than the maximum, LIMIT/OFFSET, or DENSE_RANK window function. The window function approach handles ties correctly and is the preferred modern solution.</p>
        <Code>{`-- Approach 1: Subquery (handles no second-highest gracefully with NULL)
SELECT MAX(total_amount) AS second_highest
FROM orders
WHERE total_amount < (SELECT MAX(total_amount) FROM orders);

-- Approach 2: LIMIT/OFFSET (simple but breaks on ties)
SELECT DISTINCT total_amount
FROM orders
ORDER BY total_amount DESC
LIMIT 1 OFFSET 1;

-- Approach 3: DENSE_RANK (best — handles ties)
SELECT total_amount
FROM (
  SELECT total_amount,
    DENSE_RANK() OVER (ORDER BY total_amount DESC) AS rnk
  FROM orders
)
WHERE rnk = 2;`}</Code>
      </Q>

      <Q num={12} q="What is the difference between ROW_NUMBER, RANK, and DENSE_RANK?" difficulty="Medium" topic="Window Functions">
        <p style={{ margin: '0 0 10px' }}>All three number rows within a partition. They differ only when values tie. ROW_NUMBER assigns unique sequential numbers regardless of ties (1, 2, 3). RANK assigns the same rank to ties but skips numbers afterwards (1, 2, 2, 4). DENSE_RANK assigns the same rank to ties but does not skip numbers (1, 2, 2, 3).</p>
        <Code>{`SELECT
  customer_id,
  total_amount,
  ROW_NUMBER() OVER (ORDER BY total_amount DESC) AS row_num,
  RANK()       OVER (ORDER BY total_amount DESC) AS rnk,
  DENSE_RANK() OVER (ORDER BY total_amount DESC) AS dense_rnk
FROM orders
LIMIT 5;
-- If orders 1 and 2 both have total_amount = 850:
-- ROW_NUMBER: 1, 2, 3...   (unique, arbitrary tiebreak)
-- RANK:       1, 1, 3...   (tied = same rank, gap after)
-- DENSE_RANK: 1, 1, 2...   (tied = same rank, no gap)`}</Code>
      </Q>

      <Q num={13} q="Calculate a running total / cumulative sum" difficulty="Medium" topic="Window Functions">
        <Code>{`-- Running total of revenue ordered by date
SELECT
  order_date,
  total_amount,
  SUM(total_amount) OVER (
    ORDER BY order_date
    ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW
  ) AS running_total
FROM orders
WHERE order_status = 'Delivered'
ORDER BY order_date;`}</Code>
      </Q>

      <Q num={14} q="Calculate month-over-month percentage change" difficulty="Medium" topic="Window Functions">
        <Code>{`WITH monthly AS (
  SELECT
    strftime('%Y-%m', order_date) AS month,
    SUM(total_amount)             AS revenue
  FROM orders
  WHERE order_status = 'Delivered'
  GROUP BY strftime('%Y-%m', order_date)
)
SELECT
  month,
  ROUND(revenue, 2) AS revenue,
  LAG(revenue) OVER (ORDER BY month) AS prev_month,
  ROUND(
    100.0 * (revenue - LAG(revenue) OVER (ORDER BY month))
    / LAG(revenue) OVER (ORDER BY month)
  , 1) AS mom_pct_change
FROM monthly
ORDER BY month;`}</Code>
      </Q>

      <Q num={15} q="Find the top N rows per group (e.g., top 3 orders per customer)" difficulty="Medium" topic="Window Functions">
        <Code>{`-- Top 2 orders per customer by total_amount
SELECT customer_id, order_id, total_amount, order_date
FROM (
  SELECT
    customer_id, order_id, total_amount, order_date,
    ROW_NUMBER() OVER (
      PARTITION BY customer_id
      ORDER BY total_amount DESC
    ) AS rn
  FROM orders
  WHERE order_status = 'Delivered'
)
WHERE rn <= 2
ORDER BY customer_id, total_amount DESC;`}</Code>
        <p style={{ margin: '10px 0 0', color: 'var(--muted)', fontSize: 13 }}><strong style={{ color: C }}>Trap: </strong>You cannot use the window function alias in WHERE directly — it must be in a subquery or CTE. This is because WHERE executes before the SELECT (where window functions are computed).</p>
      </Q>

      <Q num={16} q="What is the difference between COUNT(*), COUNT(col), and COUNT(DISTINCT col)?" difficulty="Easy" topic="Aggregation">
        <Code>{`SELECT
  COUNT(*)                    AS total_rows,          -- all rows incl NULLs
  COUNT(delivery_date)        AS rows_with_delivery,  -- non-NULL only
  COUNT(DISTINCT customer_id) AS unique_customers,    -- distinct non-NULL values
  COUNT(*) - COUNT(delivery_date) AS null_delivery_dates
FROM orders;`}</Code>
      </Q>

      <Q num={17} q="Write a query to find customers with no orders (anti-join)" difficulty="Medium" topic="JOINs">
        <Code>{`-- Method 1: LEFT JOIN + IS NULL (anti-join pattern)
SELECT c.customer_id, c.first_name
FROM customers AS c
LEFT JOIN orders AS o ON o.customer_id = c.customer_id
WHERE o.order_id IS NULL;

-- Method 2: NOT EXISTS (clearer intent, often faster)
SELECT customer_id, first_name
FROM customers AS c
WHERE NOT EXISTS (
  SELECT 1 FROM orders AS o
  WHERE o.customer_id = c.customer_id
);

-- Method 3: NOT IN (caution: NULLs in subquery break this)
SELECT customer_id, first_name
FROM customers
WHERE customer_id NOT IN (
  SELECT customer_id FROM orders WHERE customer_id IS NOT NULL
);`}</Code>
        <p style={{ margin: '10px 0 0', color: 'var(--muted)', fontSize: 13 }}><strong style={{ color: C }}>NOT IN trap: </strong>If the subquery returns even one NULL, NOT IN returns no rows for ANY outer row — NULL poisons the comparison. Always prefer NOT EXISTS or LEFT JOIN IS NULL for anti-joins.</p>
      </Q>

      <Q num={18} q="What is a window frame (ROWS vs RANGE) and when does it matter?" difficulty="Hard" topic="Window Functions">
        <p style={{ margin: '0 0 10px' }}>The frame defines which rows are included in the window function calculation relative to the current row. ROWS BETWEEN n PRECEDING AND CURRENT ROW counts n physical rows regardless of value. RANGE BETWEEN n PRECEDING AND CURRENT ROW counts rows within a value range — all rows with a value within n of the current row's value.</p>
        <Code>{`-- 7-day rolling average: ROWS vs RANGE
-- ROWS: always exactly 7 physical rows before current
SELECT order_date, total_amount,
  AVG(total_amount) OVER (
    ORDER BY order_date
    ROWS BETWEEN 6 PRECEDING AND CURRENT ROW  -- exactly 7 rows
  ) AS rolling_7_row_avg
FROM orders WHERE order_status = 'Delivered';

-- RANGE: rows within 7 days by VALUE (all rows same date included)
-- SQLite does not support RANGE with value intervals
-- This is a PostgreSQL pattern:
-- RANGE BETWEEN INTERVAL '6 days' PRECEDING AND CURRENT ROW`}</Code>
      </Q>

      <Q num={19} q="How do you pivot rows to columns in SQL?" difficulty="Hard" topic="Aggregation">
        <Code>{`-- Pivot: order count per store, one column per status
SELECT
  store_id,
  COUNT(CASE WHEN order_status = 'Delivered'   THEN 1 END) AS delivered,
  COUNT(CASE WHEN order_status = 'Processing'  THEN 1 END) AS processing,
  COUNT(CASE WHEN order_status = 'Cancelled'   THEN 1 END) AS cancelled,
  COUNT(CASE WHEN order_status = 'Shipped'     THEN 1 END) AS shipped
FROM orders
GROUP BY store_id
ORDER BY store_id;`}</Code>
      </Q>

      <Q num={20} q="Explain GROUP BY vs PARTITION BY" difficulty="Medium" topic="Window Functions">
        <p style={{ margin: '0 0 10px' }}>GROUP BY collapses rows — it reduces the result set to one row per group. PARTITION BY does not collapse rows — it divides rows into groups for window function calculation but every original row remains in the output, with the window function result attached.</p>
        <Code>{`-- GROUP BY: one row per customer
SELECT customer_id, SUM(total_amount) AS total_spent
FROM orders GROUP BY customer_id;

-- PARTITION BY: one row per order, with per-customer total attached
SELECT
  order_id,
  customer_id,
  total_amount,
  SUM(total_amount) OVER (PARTITION BY customer_id) AS customer_total
FROM orders;
-- Every order appears; customer_total is repeated for each order of that customer`}</Code>
      </Q>

      <HR />

      <Part n="03" title="CTEs, Subqueries, and Advanced Patterns (Q21–Q30)" />

      <Q num={21} q="What is a CTE and when would you use it instead of a subquery?" difficulty="Medium" topic="CTEs">
        <p style={{ margin: '0 0 10px' }}>A CTE (Common Table Expression) is a named temporary result defined with WITH. Use CTEs over subqueries when: (1) the same intermediate result is referenced multiple times; (2) the query has multiple logical steps that benefit from being named; (3) you need recursion. CTEs have no inherent performance benefit over equivalent subqueries in most databases — the win is readability.</p>
        <Code>{`-- CTE: named, readable, reusable
WITH delivered_orders AS (
  SELECT customer_id, SUM(total_amount) AS spent
  FROM orders
  WHERE order_status = 'Delivered'
  GROUP BY customer_id
)
SELECT c.first_name, d.spent
FROM customers AS c
JOIN delivered_orders AS d ON d.customer_id = c.customer_id
WHERE d.spent > 1000;

-- Equivalent subquery: harder to read, not reusable
SELECT c.first_name, d.spent
FROM customers AS c
JOIN (
  SELECT customer_id, SUM(total_amount) AS spent
  FROM orders WHERE order_status = 'Delivered'
  GROUP BY customer_id
) AS d ON d.customer_id = c.customer_id
WHERE d.spent > 1000;`}</Code>
      </Q>

      <Q num={22} q="Write a recursive CTE to traverse a hierarchy" difficulty="Hard" topic="Recursive CTEs">
        <Code>{`-- Recursive CTE pattern: employee-manager hierarchy
-- (or category tree, org chart, bill of materials)
WITH RECURSIVE hierarchy AS (
  -- Anchor: start from the root (no manager)
  SELECT employee_id, name, manager_id, 1 AS depth, name AS path
  FROM employees
  WHERE manager_id IS NULL

  UNION ALL

  -- Recursive: join each employee to their manager
  SELECT e.employee_id, e.name, e.manager_id,
    h.depth + 1,
    h.path || ' > ' || e.name
  FROM employees AS e
  JOIN hierarchy AS h ON h.employee_id = e.manager_id
)
SELECT employee_id, name, depth, path
FROM hierarchy
ORDER BY path;`}</Code>
      </Q>

      <Q num={23} q="What is the difference between EXISTS and IN?" difficulty="Medium" topic="Subqueries">
        <p style={{ margin: '0 0 10px' }}>EXISTS checks whether a subquery returns any rows — it stops at the first match and does not evaluate the full subquery. IN evaluates the full subquery and builds a list of values. EXISTS is generally faster for correlated subqueries because it short-circuits. IN can be faster for small static lists. NOT IN is dangerous with NULLs; NOT EXISTS is always safe.</p>
        <Code>{`-- EXISTS: stops at first match
SELECT customer_id FROM customers AS c
WHERE EXISTS (
  SELECT 1 FROM orders AS o WHERE o.customer_id = c.customer_id
);

-- IN: builds complete list then checks membership
SELECT customer_id FROM customers
WHERE customer_id IN (SELECT customer_id FROM orders);
-- If orders.customer_id contains NULL: IN may return unexpected results`}</Code>
      </Q>

      <Q num={24} q="How do you delete duplicate rows keeping only one?" difficulty="Hard" topic="DML">
        <Code>{`-- Keep the row with the MIN rowid (or any deterministic row)
DELETE FROM customers
WHERE rowid NOT IN (
  SELECT MIN(rowid)
  FROM customers
  GROUP BY email    -- 'email' is the column defining uniqueness
);`}</Code>
      </Q>

      <Q num={25} q="What is a lateral join (or CROSS APPLY)?" difficulty="Hard" topic="JOINs">
        <p style={{ margin: '0 0 10px' }}>A lateral join allows the right side of the JOIN to reference columns from the left side — like a correlated subquery but as a set-returning expression. Useful for top-N per group without a window function subquery. LATERAL is PostgreSQL syntax; SQLite does not support it natively but the pattern can be emulated with window functions.</p>
        <Code>{`-- PostgreSQL LATERAL: top 2 orders per customer
SELECT c.first_name, recent.order_id, recent.total_amount
FROM customers AS c
CROSS JOIN LATERAL (
  SELECT order_id, total_amount
  FROM orders AS o
  WHERE o.customer_id = c.customer_id
  ORDER BY total_amount DESC
  LIMIT 2
) AS recent;

-- SQLite equivalent (window function):
SELECT first_name, order_id, total_amount
FROM (
  SELECT c.first_name, o.order_id, o.total_amount,
    ROW_NUMBER() OVER (PARTITION BY o.customer_id
                       ORDER BY o.total_amount DESC) AS rn
  FROM orders AS o JOIN customers AS c ON c.customer_id = o.customer_id
) WHERE rn <= 2;`}</Code>
      </Q>

      <Q num={26} q="What is the difference between a view and a CTE?" difficulty="Medium" topic="Views / CTEs">
        <p style={{ margin: '0 0 10px' }}>A CTE exists only for the duration of the single query it is defined in. A view is a named, saved query stored in the database schema that persists and can be referenced by name in future queries. Both behave like virtual tables. A view can have security rules (GRANT/REVOKE), a CTE cannot. A materialized view stores the result physically on disk and can be indexed; a regular view re-executes the underlying query each time.</p>
      </Q>

      <Q num={27} q="Write a query to find gaps in a sequential ID sequence" difficulty="Hard" topic="Advanced SQL">
        <Code>{`-- Find missing order_ids in a sequence
WITH RECURSIVE seq(n) AS (
  SELECT MIN(order_id) FROM orders
  UNION ALL
  SELECT n + 1 FROM seq WHERE n < (SELECT MAX(order_id) FROM orders)
)
SELECT n AS missing_id
FROM seq
WHERE n NOT IN (SELECT order_id FROM orders)
ORDER BY n;`}</Code>
      </Q>

      <Q num={28} q="What is an index and what types exist?" difficulty="Medium" topic="Performance">
        <p style={{ margin: '0 0 10px' }}>An index is a data structure that allows the database to find rows without scanning the entire table. B-tree indexes (the default in almost all databases) store column values in sorted order, enabling O(log n) lookups, range scans, and ORDER BY optimization. Other types: Hash indexes (O(1) equality lookup, no range scan), GIN/GiST (PostgreSQL — full-text search, JSONB, arrays), BRIN (block range — useful for time-series tables), partial indexes (index only rows matching a condition).</p>
        <Code>{`-- Create index on commonly-filtered column
CREATE INDEX idx_orders_status ON orders(order_status);
CREATE INDEX idx_orders_date   ON orders(order_date);

-- Composite index: useful when filtering on both columns together
CREATE INDEX idx_orders_status_date ON orders(order_status, order_date);
-- Leftmost prefix rule: (status, date) index supports:
-- WHERE status = ?           -- yes, leftmost prefix
-- WHERE status = ? AND date >= ?  -- yes, both columns
-- WHERE date >= ?            -- no, skips leftmost column`}</Code>
      </Q>

      <Q num={29} q="What causes a query to not use an index?" difficulty="Medium" topic="Performance">
        <p style={{ margin: '0 0 10px' }}>Five main causes: (1) function applied to indexed column (WHERE UPPER(city) = 'MUMBAI' — move function to the value side); (2) leading wildcard LIKE ('%milk%' — no index on the substring); (3) implicit type coercion (comparing a TEXT column to an INTEGER literal); (4) low selectivity — if 80% of rows match, a full scan is faster than an index; (5) table is too small — the planner may prefer a full scan for tiny tables.</p>
        <Code>{`-- Non-SARGable: kills index on order_date
WHERE strftime('%Y', order_date) = '2024'

-- SARGable: index on order_date is used
WHERE order_date >= '2024-01-01' AND order_date < '2025-01-01'

-- Verify with EXPLAIN QUERY PLAN:
EXPLAIN QUERY PLAN
SELECT * FROM orders WHERE order_date >= '2024-01-01';`}</Code>
      </Q>

      <Q num={30} q="What is query plan and how do you read EXPLAIN output?" difficulty="Medium" topic="Performance">
        <p style={{ margin: '0 0 10px' }}>EXPLAIN shows the execution plan the optimizer chose without running the query. EXPLAIN QUERY PLAN in SQLite shows whether each table is accessed by a full scan (SCAN TABLE) or via an index (SEARCH TABLE USING INDEX). Look for SCAN TABLE on large tables — that is the performance red flag. SEARCH TABLE USING INDEX means the index is being used.</p>
        <Code>{`EXPLAIN QUERY PLAN
SELECT o.order_id, c.first_name
FROM orders AS o
JOIN customers AS c ON c.customer_id = o.customer_id
WHERE o.order_status = 'Delivered'
  AND o.order_date >= '2024-01-01';

-- Good output: SEARCH TABLE orders USING INDEX idx_orders_status
-- Bad output:  SCAN TABLE orders  (full table scan — no usable index)`}</Code>
      </Q>

      <HR />

      <Part n="04" title="Transactions, Constraints, and Design (Q31–Q40)" />

      <Q num={31} q="What are ACID properties?" difficulty="Medium" topic="Transactions">
        <p style={{ margin: '0 0 10px' }}>Atomicity: a transaction is all-or-nothing. Consistency: only valid states. Isolation: concurrent transactions don't interfere. Durability: committed data survives crashes. See Module 48 for full coverage.</p>
      </Q>

      <Q num={32} q="What is a deadlock and how do you prevent it?" difficulty="Medium" topic="Transactions">
        <p style={{ margin: '0 0 10px' }}>A deadlock occurs when Transaction A holds a lock Row 1 needs by B, and B holds a lock Row 2 needs by A — circular wait. The database detects and rolls back one. Prevention: always acquire locks in the same order; keep transactions short; use SKIP LOCKED for queues.</p>
      </Q>

      <Q num={33} q="What is normalization and what are 1NF, 2NF, 3NF?" difficulty="Medium" topic="Database Design">
        <p style={{ margin: '0 0 10px' }}>Normalization organizes tables to reduce redundancy. 1NF: each column holds atomic (single) values, no repeating groups. 2NF: 1NF + every non-key column is fully dependent on the entire primary key (no partial dependency). 3NF: 2NF + no transitive dependencies (non-key column depends on another non-key column). Higher normal forms exist but 3NF covers most practical cases.</p>
      </Q>

      <Q num={34} q="What is a foreign key constraint and what does ON DELETE CASCADE do?" difficulty="Easy" topic="Constraints">
        <Code>{`-- FK ensures referential integrity
CREATE TABLE order_items (
  order_id   INTEGER REFERENCES orders(order_id) ON DELETE CASCADE,
  product_id INTEGER REFERENCES products(product_id) ON DELETE RESTRICT,
  ...
);

-- ON DELETE CASCADE: deleting an order auto-deletes its order_items
-- ON DELETE RESTRICT: deleting a product fails if order_items reference it
-- ON DELETE SET NULL: deleting the parent sets the FK column to NULL`}</Code>
      </Q>

      <Q num={35} q="What is the difference between optimistic and pessimistic locking?" difficulty="Hard" topic="Transactions">
        <p style={{ margin: '0 0 10px' }}>Pessimistic locking acquires a lock before reading (SELECT FOR UPDATE) — prevents conflicts by blocking competing transactions. High contention, low throughput. Use when conflicts are frequent. Optimistic locking does not lock on read — it checks at write time whether the row has changed (using a version number or timestamp). If changed, the transaction retries. Low contention, high throughput. Use when conflicts are rare.</p>
      </Q>

      <Q num={36} q="What is database sharding?" difficulty="Hard" topic="Architecture">
        <p style={{ margin: '0 0 10px' }}>Sharding partitions a database table horizontally across multiple servers — each server (shard) holds a subset of rows (e.g., customers A–M on shard 1, N–Z on shard 2). Sharding enables horizontal scaling beyond what a single server can handle. Tradeoffs: cross-shard queries are complex, transactions across shards lose ACID guarantees, and re-sharding (when distribution is uneven) is operationally complex. Most applications should exhaust vertical scaling and read replicas before sharding.</p>
      </Q>

      <Q num={37} q="What is a materialized view and how does it differ from a regular view?" difficulty="Medium" topic="Views">
        <p style={{ margin: '0 0 10px' }}>A regular view is a saved query — it re-executes the underlying SQL every time you query it. A materialized view stores the query result physically on disk, like a table. Reads are fast (no re-computation), but the data can be stale until refreshed. Used for expensive aggregate queries that are queried frequently but whose data changes infrequently. PostgreSQL: REFRESH MATERIALIZED VIEW name. SQLite does not support materialized views natively — use tables with manual refresh.</p>
      </Q>

      <Q num={38} q="How do you handle many-to-many relationships in SQL?" difficulty="Easy" topic="Database Design">
        <Code>{`-- Many-to-many: an order can have many products; a product can be in many orders
-- Solution: junction table (bridge table)
CREATE TABLE order_items (
  order_id   INTEGER NOT NULL REFERENCES orders(order_id),
  product_id INTEGER NOT NULL REFERENCES products(product_id),
  quantity   INTEGER NOT NULL,
  line_total REAL    NOT NULL,
  PRIMARY KEY (order_id, product_id)   -- composite PK prevents duplicates
);`}</Code>
      </Q>

      <Q num={39} q="What is the difference between CHAR and VARCHAR?" difficulty="Easy" topic="Data Types">
        <p style={{ margin: '0 0 10px' }}>CHAR(n) is a fixed-length string — always stores exactly n characters, padding with spaces if the value is shorter. VARCHAR(n) is variable-length — stores only as many characters as the value contains, up to n. CHAR wastes space for variable-length data but has slightly faster reads on fixed-width columns. VARCHAR is almost always preferred for text data. In SQLite, all text types behave as VARCHAR regardless of declaration — there is no performance difference.</p>
      </Q>

      <Q num={40} q="What is COALESCE and how is it different from NULLIF?" difficulty="Easy" topic="Functions">
        <Code>{`-- COALESCE: returns first non-NULL argument
SELECT COALESCE(delivery_date, order_date, 'unknown') FROM orders;
-- Returns delivery_date if not NULL, else order_date, else 'unknown'

-- NULLIF: returns NULL if both arguments are equal, else first argument
SELECT NULLIF(order_status, 'Processing') FROM orders;
-- Returns NULL for 'Processing' rows, actual status for all others
-- Useful for avoiding division by zero: NULLIF(denominator, 0)`}</Code>
      </Q>

      <HR />

      <Part n="05" title="Tricky and Advanced Questions (Q41–Q50)" />

      <Q num={41} q="How do you calculate a median in SQL?" difficulty="Hard" topic="Aggregation">
        <Code>{`-- Median: middle value when sorted
-- SQLite: use percentile via window function
WITH ranked AS (
  SELECT total_amount,
    ROW_NUMBER() OVER (ORDER BY total_amount) AS rn,
    COUNT(*) OVER () AS cnt
  FROM orders WHERE order_status = 'Delivered'
)
SELECT AVG(total_amount) AS median
FROM ranked
WHERE rn IN ((cnt + 1) / 2, (cnt + 2) / 2);
-- For odd count: picks middle row
-- For even count: averages two middle rows`}</Code>
      </Q>

      <Q num={42} q="What is the difference between a clustered and non-clustered index?" difficulty="Hard" topic="Performance">
        <p style={{ margin: '0 0 10px' }}>A clustered index determines the physical storage order of the table's rows on disk — the rows are stored sorted by the clustered index key. Only one clustered index per table. In SQL Server, the PRIMARY KEY is clustered by default. In MySQL InnoDB, the primary key is the clustered index. A non-clustered index is a separate data structure that stores index keys with pointers back to the heap rows. SQLite does not distinguish — it uses a B-tree for everything and the rowid is the implicit clustered key.</p>
      </Q>

      <Q num={43} q="Find employees who earn more than their manager" difficulty="Medium" topic="Self Join">
        <Code>{`-- Self-join on employees table
SELECT
  e.name     AS employee,
  e.salary   AS emp_salary,
  m.name     AS manager,
  m.salary   AS mgr_salary
FROM employees AS e
JOIN employees AS m ON m.employee_id = e.manager_id
WHERE e.salary > m.salary;`}</Code>
      </Q>

      <Q num={44} q="How do you swap values in two columns without a temporary variable?" difficulty="Hard" topic="DML">
        <Code>{`-- Swap order_status between two specific orders atomically
UPDATE orders
SET order_status = CASE order_id
  WHEN 1 THEN (SELECT order_status FROM orders WHERE order_id = 2)
  WHEN 2 THEN (SELECT order_status FROM orders WHERE order_id = 1)
END
WHERE order_id IN (1, 2);`}</Code>
      </Q>

      <Q num={45} q="What is a window function and how is it different from GROUP BY?" difficulty="Medium" topic="Window Functions">
        <p style={{ margin: '0 0 10px' }}>A window function performs a calculation across a set of rows related to the current row (the window), without collapsing the result set. GROUP BY collapses rows to one per group. Window functions keep all rows and attach the aggregated value alongside the original row data. This is what makes them powerful: you can compute totals, ranks, and running sums while still seeing each individual row.</p>
      </Q>

      <Q num={46} q="How do you find the Nth percentile of a distribution?" difficulty="Hard" topic="Window Functions">
        <Code>{`-- 90th percentile order value
WITH pct AS (
  SELECT total_amount,
    PERCENT_RANK() OVER (ORDER BY total_amount) AS pct_rank
  FROM orders WHERE order_status = 'Delivered'
)
SELECT MIN(total_amount) AS p90_value
FROM pct
WHERE pct_rank >= 0.90;`}</Code>
      </Q>

      <Q num={47} q="What is the difference between INNER JOIN and CROSS JOIN?" difficulty="Easy" topic="JOINs">
        <p style={{ margin: '0 0 10px' }}>INNER JOIN returns matched rows — rows from both tables where the join condition is true. CROSS JOIN returns the Cartesian product — every row from the left table combined with every row from the right table, with no join condition. If left has 100 rows and right has 50 rows, CROSS JOIN returns 5,000 rows. CROSS JOIN is used for generating combinations, calendar dates, or test data — not for typical data retrieval.</p>
      </Q>

      <Q num={48} q="How would you detect and handle slow queries in production?" difficulty="Hard" topic="Performance">
        <p style={{ margin: '0 0 10px' }}>Detection: enable query logging (log_min_duration_statement in PostgreSQL), use pg_stat_statements to find the queries consuming the most total time (not just longest single execution), use EXPLAIN ANALYZE on suspects. Analysis: look for SCAN TABLE on large tables (missing index), high row estimates vs actual rows (stale statistics), nested loop joins on large tables (missing index on join key). Resolution: add index, rewrite non-SARGable conditions, update statistics, denormalize hot read paths, add read replicas. Always test in a staging environment before changing production indexes.</p>
      </Q>

      <Q num={49} q="Write a query to transpose rows to columns dynamically" difficulty="Hard" topic="Advanced SQL">
        <p style={{ margin: '0 0 10px' }}>Dynamic pivot requires knowing the values at query time — this is typically done in application code (Python/pandas) or using stored procedures that generate dynamic SQL. In pure SQL, pivot is static (you must hard-code the column values with CASE WHEN).</p>
        <Code>{`-- Static pivot: revenue per store per status
SELECT
  store_id,
  SUM(CASE WHEN order_status = 'Delivered'  THEN total_amount END) AS delivered_rev,
  SUM(CASE WHEN order_status = 'Cancelled'  THEN total_amount END) AS cancelled_rev,
  SUM(CASE WHEN order_status = 'Processing' THEN total_amount END) AS processing_rev
FROM orders
GROUP BY store_id;`}</Code>
      </Q>

      <Q num={50} q="Explain database partitioning and when to use it" difficulty="Hard" topic="Architecture">
        <p style={{ margin: '0 0 10px' }}>Partitioning divides a large table into smaller physical segments (partitions) while presenting a single logical table to queries. Range partitioning splits by value range (orders from Jan in one partition, Feb in another). List partitioning splits by enumerated values (store region). Hash partitioning splits by hash of a column (for even distribution). Benefits: queries that filter by the partition key can skip irrelevant partitions (partition pruning), maintenance operations (VACUUM, DELETE) can target one partition at a time, old partitions can be detached and archived. Use when: a table grows beyond hundreds of millions of rows, queries almost always filter by the partition column, or you need to efficiently drop/archive old time-series data. PostgreSQL supports declarative partitioning natively. SQLite does not — emulate with multiple tables or leave partitioning to the application layer.</p>
      </Q>

      <HR />

      <SQLPlayground
        initialQuery={`-- Practice sandbox: run any of the query examples from this module
-- The full FreshMart schema is available (customers, orders, order_items, products, stores)

-- Example: Q13 running total
SELECT
  order_date,
  ROUND(total_amount, 2)                                   AS order_amount,
  ROUND(SUM(total_amount) OVER (
    ORDER BY order_date, order_id
    ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW
  ), 2)                                                    AS running_total
FROM orders
WHERE order_status = 'Delivered'
ORDER BY order_date, order_id
LIMIT 10;`}
        height={220}
        showSchema={true}
      />

      <HR />

      <KeyTakeaways
        items={[
          'WHERE filters rows before grouping; HAVING filters groups after. Never use aggregate functions in WHERE.',
          'ROW_NUMBER = unique sequential. RANK = ties get same rank, skips after. DENSE_RANK = ties get same rank, no skip.',
          'NOT IN with NULLs in the subquery returns no rows. Always use NOT EXISTS or LEFT JOIN IS NULL for anti-joins.',
          'SARGability: never apply functions to indexed columns. Move transformations to the comparison value.',
          'Correlated subquery in SELECT = N+1 problem. Replace with JOIN + aggregation.',
          'EXISTS stops at first match. IN builds full list. EXISTS is generally safer and faster for large datasets.',
          'Window functions keep all rows (PARTITION BY). GROUP BY collapses to one row per group.',
          'COALESCE returns first non-NULL. NULLIF returns NULL when both args are equal (use to avoid divide-by-zero).',
          'Deadlock prevention: always acquire locks in consistent order, keep transactions short, use SKIP LOCKED for queues.',
          'Indexes speed up reads but slow down writes. Create indexes on columns used in WHERE, JOIN ON, and ORDER BY. Verify usage with EXPLAIN QUERY PLAN.',
        ]}
      />

      <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 10, padding: '24px', marginTop: 40 }}>
        <p style={{ fontSize: 10, color: 'var(--muted)', letterSpacing: '.12em', textTransform: 'uppercase', fontFamily: 'var(--font-mono)', fontWeight: 700, margin: '0 0 10px' }}>What comes next</p>
        <p style={{ fontSize: 15, color: 'var(--text)', lineHeight: 1.85, margin: '0 0 20px' }}>
          In <strong>Module 62</strong>, you build 3 complete real-world SQL projects end-to-end — schema design, data loading, analytical queries, and presenting results.
        </p>
        <Link href="/learn/sql/sql-projects" style={{ background: C, color: '#000', padding: '11px 24px', borderRadius: 7, fontWeight: 700, fontSize: 13, textDecoration: 'none', display: 'inline-block' }}>
          Module 62 → 3 Real SQL Projects
        </Link>
      </div>

    </LearnLayout>
  );
}
