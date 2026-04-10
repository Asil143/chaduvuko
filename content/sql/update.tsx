import { LearnLayout } from '@/components/content/LearnLayout';
import { Callout } from '@/components/content/Callout';
import { KeyTakeaways } from '@/components/content/KeyTakeaways';
import SQLPlayground from '@/components/sql/SQLPlayground';
import TryItChallenge from '@/components/sql/TryItChallenge';
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

const H = ({ children }: { children: React.ReactNode }) => (
  <h3 style={{ fontSize: 17, fontWeight: 700, color: 'var(--text)', margin: '32px 0 12px' }}>{children}</h3>
);

const Hl = ({ children }: { children: React.ReactNode }) => (
  <strong style={{ color: C }}>{children}</strong>
);

const HR = () => <div style={{ borderTop: '1px solid var(--border)', margin: '48px 0' }} />;

const IQ = ({ q, children }: { q: string; children: React.ReactNode }) => (
  <div style={{ marginBottom: 40 }}>
    <div style={{ background: `${C}10`, border: `1px solid ${C}25`, borderRadius: '8px 8px 0 0', padding: '14px 18px', fontSize: 14, fontWeight: 700, color: 'var(--text)' }}>Q: {q}</div>
    <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderTop: 'none', borderRadius: '0 0 8px 8px', padding: '18px', fontSize: 14, color: 'var(--text)', lineHeight: 1.9 }}>{children}</div>
  </div>
);

const Err = ({ msg, cause, fix }: { msg: string; cause: string; fix: string }) => (
  <div style={{ marginBottom: 24, border: '1px solid var(--border)', borderRadius: 10, overflow: 'hidden' }}>
    <div style={{ background: 'rgba(255,71,87,0.09)', borderBottom: '1px solid var(--border)', padding: '10px 16px', fontFamily: 'var(--font-mono)', fontSize: 12, color: '#ff4757', wordBreak: 'break-all', lineHeight: 1.6 }}>{msg}</div>
    <div style={{ padding: '14px 16px' }}>
      <p style={{ fontSize: 13, color: 'var(--muted)', lineHeight: 1.7, margin: '0 0 8px' }}><strong style={{ color: 'var(--text)' }}>Cause: </strong>{cause}</p>
      <p style={{ fontSize: 13, color: 'var(--muted)', lineHeight: 1.7, margin: 0 }}><strong style={{ color: '#00e676' }}>Fix: </strong>{fix}</p>
    </div>
  </div>
);

const ProTip = ({ children }: { children: React.ReactNode }) => (
  <div style={{ background: `${C}08`, border: `1px solid ${C}20`, borderRadius: 10, padding: '16px 20px', margin: '24px 0' }}>
    <p style={{ fontSize: 11, fontWeight: 700, color: C, fontFamily: 'var(--font-mono)', textTransform: 'uppercase', letterSpacing: '.1em', margin: '0 0 8px' }}>🎯 Pro Tip</p>
    <p style={{ fontSize: 14, color: 'var(--text)', lineHeight: 1.85, margin: 0 }}>{children}</p>
  </div>
);

const TimeBlock = ({ time, label, children }: { time: string; label: string; children: React.ReactNode }) => (
  <div style={{ display: 'flex', gap: 20, marginBottom: 28 }}>
    <div style={{ flexShrink: 0, textAlign: 'right', width: 95 }}>
      <div style={{ fontSize: 12, fontWeight: 700, color: C, fontFamily: 'var(--font-mono)' }}>{time}</div>
    </div>
    <div style={{ flex: 1, borderLeft: `2px solid ${C}30`, paddingLeft: 20, paddingBottom: 8 }}>
      <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--text)', marginBottom: 6 }}>{label}</div>
      <div style={{ fontSize: 14, color: 'var(--muted)', lineHeight: 1.8 }}>{children}</div>
    </div>
  </div>
);

const CodeBlock = ({ label, code }: { label: string; code: string }) => (
  <div style={{ background: 'var(--bg2)', border: '1px solid var(--border)', borderRadius: 10, overflow: 'hidden', margin: '16px 0 24px' }}>
    <div style={{ padding: '8px 14px', background: 'var(--surface)', borderBottom: '1px solid var(--border)' }}>
      <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--muted)' }}>{label}</span>
    </div>
    <pre style={{ margin: 0, padding: '14px 16px', fontFamily: 'var(--font-mono)', fontSize: 13, lineHeight: 1.8, color: 'var(--text)', overflowX: 'auto', whiteSpace: 'pre' }}>{code}</pre>
  </div>
);

export default function Update() {
  return (
    <LearnLayout
      title="UPDATE — Modifying Existing Rows"
      description="Change data in existing rows — single column updates, multi-column updates, computed updates, UPDATE from another table, and the golden rule: SELECT before UPDATE"
      section="SQL — Module 21"
      readTime="30 min"
      updatedAt="April 2026"
    >

      {/* ── PART 01 ── */}
      <Part n="01" title="The Most Dangerous Command in SQL" />

      <P>UPDATE modifies existing rows in a table. It is one of the four DML commands (SELECT, INSERT, UPDATE, DELETE) and the one most likely to cause irreversible damage when used carelessly. A SELECT returns wrong results — you rewrite the query. An UPDATE without a proper WHERE clause rewrites every row in a million-row table in seconds, and there is no undo.</P>

      <P>This module teaches you not just the syntax but the discipline. Every professional SQL writer has a set of habits around UPDATE that they follow without exception — not because they doubt their own abilities, but because the cost of a mistake is high enough that verification is always worth the 30 seconds it takes.</P>

      <P>The single most important rule in this module:</P>

      <div style={{ background: `${C}08`, border: `2px solid ${C}40`, borderRadius: 10, padding: '20px 24px', margin: '20px 0 32px' }}>
        <p style={{ fontSize: 16, fontWeight: 700, color: C, margin: '0 0 8px', fontFamily: 'var(--font-mono)' }}>The Golden Rule</p>
        <p style={{ fontSize: 15, color: 'var(--text)', lineHeight: 1.8, margin: 0 }}>
          Before every UPDATE, run the equivalent SELECT with the same WHERE clause and verify the rows it returns are exactly the rows you intend to modify. Zero exceptions.
        </p>
      </div>

      <HR />

      {/* ── PART 02 ── */}
      <Part n="02" title="Basic Syntax — Single Column Update" />

      <CodeBlock
        label="UPDATE syntax"
        code={`UPDATE table_name
SET    column_name = new_value
WHERE  condition;

-- The WHERE clause determines which rows are updated
-- Without WHERE: EVERY row in the table is updated
-- With WHERE: only matching rows are updated`}
      />

      <H>Update one column on one specific row</H>

      <SQLPlayground
        initialQuery={`-- Step 1: SELECT first — verify WHICH row will be updated
SELECT customer_id, first_name, last_name, city, loyalty_tier
FROM customers
WHERE customer_id = 3;`}
        height={110}
        showSchema={true}
      />

      <SQLPlayground
        initialQuery={`-- Step 2: UPDATE only after verifying the row
UPDATE customers
SET loyalty_tier = 'Gold'
WHERE customer_id = 3;

-- Step 3: confirm the change
SELECT customer_id, first_name, loyalty_tier
FROM customers
WHERE customer_id = 3;`}
        height={135}
        showSchema={false}
      />

      <SQLPlayground
        initialQuery={`-- Update a product price
-- SELECT first
SELECT product_id, product_name, unit_price
FROM products
WHERE product_id = 5;`}
        height={110}
        showSchema={false}
      />

      <SQLPlayground
        initialQuery={`-- Then UPDATE
UPDATE products
SET unit_price = 299.00
WHERE product_id = 5;

SELECT product_id, product_name, unit_price
FROM products
WHERE product_id = 5;`}
        height={120}
        showSchema={false}
      />

      <HR />

      {/* ── PART 03 ── */}
      <Part n="03" title="Multi-Column UPDATE — Setting Multiple Values at Once" />

      <P>UPDATE can set multiple columns in a single statement by separating assignments with commas in the SET clause. This is always better than running separate UPDATE statements per column — it is atomic (all changes happen together) and more efficient (one table scan, one transaction).</P>

      <CodeBlock
        label="Multi-column UPDATE syntax"
        code={`UPDATE table_name
SET
  column1 = value1,
  column2 = value2,
  column3 = value3
WHERE condition;

-- All assignments happen simultaneously
-- The order of SET assignments does not matter`}
      />

      <SQLPlayground
        initialQuery={`-- SELECT the row before updating
SELECT employee_id, first_name, last_name, role, salary, department
FROM employees
WHERE employee_id = 2;`}
        height={110}
        showSchema={true}
      />

      <SQLPlayground
        initialQuery={`-- Update multiple columns at once
UPDATE employees
SET
  role       = 'Senior Store Manager',
  salary     = 75000.00,
  department = 'Management'
WHERE employee_id = 2;

-- Verify all three columns changed
SELECT employee_id, first_name, role, salary, department
FROM employees
WHERE employee_id = 2;`}
        height={155}
        showSchema={false}
      />

      <SQLPlayground
        initialQuery={`-- Update order status and delivery date together
-- Both must change at the same time — atomically
UPDATE orders
SET
  order_status  = 'Delivered',
  delivery_date = '2024-03-20'
WHERE order_id = 1025;

SELECT order_id, order_status, delivery_date
FROM orders
WHERE order_id = 1025;`}
        height={145}
        showSchema={false}
      />

      <HR />

      {/* ── PART 04 ── */}
      <Part n="04" title="Computed Updates — Using the Current Value" />

      <P>The new value in SET does not have to be a static literal. You can reference the column's current value in the calculation — the database reads the current value, applies the expression, and writes the result back. This is how you implement increments, percentage adjustments, and any update that depends on what is already there.</P>

      <CodeBlock
        label="Computed update — using the current value"
        code={`-- Increment a counter
UPDATE products SET stock_count = stock_count + 100 WHERE product_id = 5;

-- Apply a percentage increase
UPDATE employees SET salary = salary * 1.10 WHERE department = 'Management';
-- Increases all Management salaries by 10%

-- Subtract from a running total
UPDATE accounts SET balance = balance - 500.00 WHERE account_id = 42;

-- Concatenate to an existing string
UPDATE customers
SET notes = notes || ' — Verified on 2024-04-10'
WHERE customer_id = 7;`}
      />

      <SQLPlayground
        initialQuery={`-- Apply a 10% price increase to all Dairy products
-- SELECT first to see what will be affected
SELECT product_name, category, unit_price
FROM products
WHERE category = 'Dairy';`}
        height={115}
        showSchema={true}
      />

      <SQLPlayground
        initialQuery={`-- Apply the price increase
UPDATE products
SET unit_price = ROUND(unit_price * 1.10, 2)
WHERE category = 'Dairy';

-- Verify the change
SELECT product_name, category, unit_price
FROM products
WHERE category = 'Dairy';`}
        height={135}
        showSchema={false}
      />

      <SQLPlayground
        initialQuery={`-- Promote Bronze customers who joined before 2022 to Silver
-- First: see who qualifies
SELECT customer_id, first_name, loyalty_tier, joined_date
FROM customers
WHERE loyalty_tier = 'Bronze'
  AND joined_date < '2022-01-01';`}
        height={120}
        showSchema={false}
      />

      <SQLPlayground
        initialQuery={`-- Apply the promotion
UPDATE customers
SET loyalty_tier = 'Silver'
WHERE loyalty_tier = 'Bronze'
  AND joined_date < '2022-01-01';

-- Verify
SELECT customer_id, first_name, loyalty_tier, joined_date
FROM customers
WHERE joined_date < '2022-01-01'
ORDER BY loyalty_tier;`}
        height={150}
        showSchema={false}
      />

      <HR />

      {/* ── PART 05 ── */}
      <Part n="05" title="UPDATE with CASE WHEN — Conditional Updates" />

      <P>CASE WHEN in the SET clause lets you apply different values to different rows in a single UPDATE statement. Instead of running multiple UPDATE statements with different WHERE conditions, one UPDATE with CASE handles all cases in one pass.</P>

      <SQLPlayground
        initialQuery={`-- Assign loyalty tiers based on total spending
-- First: see what current tiers look like vs what they should be
SELECT
  c.customer_id,
  c.first_name,
  c.loyalty_tier                         AS current_tier,
  COALESCE(SUM(o.total_amount), 0)       AS total_spent,
  CASE
    WHEN COALESCE(SUM(o.total_amount), 0) >= 5000 THEN 'Platinum'
    WHEN COALESCE(SUM(o.total_amount), 0) >= 2000 THEN 'Gold'
    WHEN COALESCE(SUM(o.total_amount), 0) >= 500  THEN 'Silver'
    ELSE 'Bronze'
  END                                    AS new_tier
FROM customers AS c
LEFT JOIN orders AS o
  ON c.customer_id = o.customer_id
  AND o.order_status = 'Delivered'
GROUP BY c.customer_id, c.first_name, c.loyalty_tier
ORDER BY total_spent DESC;`}
        height={240}
        showSchema={true}
      />

      <CodeBlock
        label="UPDATE with CASE WHEN — apply different values per row"
        code={`-- Update monthly targets based on city
-- Each city tier gets a different target
UPDATE stores
SET monthly_target = CASE city
  WHEN 'Bangalore' THEN monthly_target * 1.15  -- 15% increase for metro
  WHEN 'Hyderabad' THEN monthly_target * 1.12  -- 12% increase
  WHEN 'Mumbai'    THEN monthly_target * 1.15  -- 15% increase for metro
  ELSE                  monthly_target * 1.08  -- 8% increase for other cities
END;

-- Update order status based on age
UPDATE orders
SET order_status = CASE
  WHEN order_date < CURRENT_DATE - INTERVAL '30 days'
   AND order_status = 'Processing' THEN 'Cancelled'
  ELSE order_status  -- leave other rows unchanged
END
WHERE order_status = 'Processing';`}
      />

      <SQLPlayground
        initialQuery={`-- Apply city-based target increases to stores
-- Preview with SELECT first
SELECT
  store_id,
  store_name,
  city,
  monthly_target                                AS current_target,
  CASE city
    WHEN 'Bangalore' THEN ROUND(monthly_target * 1.15, 2)
    WHEN 'Hyderabad' THEN ROUND(monthly_target * 1.12, 2)
    WHEN 'Mumbai'    THEN ROUND(monthly_target * 1.15, 2)
    ELSE                  ROUND(monthly_target * 1.08, 2)
  END                                           AS new_target
FROM stores
ORDER BY city;`}
        height={200}
        showSchema={false}
      />

      <HR />

      {/* ── PART 06 ── */}
      <Part n="06" title="UPDATE FROM — Updating Based on Another Table" />

      <P>Sometimes the new value for a column comes from another table. UPDATE FROM (PostgreSQL) or UPDATE with JOIN (MySQL) lets you reference another table in the SET or WHERE clause — powerful for synchronising data between tables.</P>

      <H>PostgreSQL — UPDATE FROM syntax</H>

      <CodeBlock
        label="UPDATE FROM — PostgreSQL"
        code={`-- Update orders.total_amount to match recalculated totals
-- from order_items (in case of a data correction)
UPDATE orders AS o
SET total_amount = item_totals.recalculated_total
FROM (
  SELECT order_id, SUM(line_total) AS recalculated_total
  FROM order_items
  GROUP BY order_id
) AS item_totals
WHERE o.order_id = item_totals.order_id
  AND o.total_amount <> item_totals.recalculated_total;
-- Only updates rows where the amounts actually differ`}
      />

      <H>MySQL — UPDATE with JOIN syntax</H>

      <CodeBlock
        label="UPDATE with JOIN — MySQL"
        code={`-- MySQL equivalent of PostgreSQL's UPDATE FROM
UPDATE orders AS o
JOIN (
  SELECT order_id, SUM(line_total) AS recalculated_total
  FROM order_items
  GROUP BY order_id
) AS item_totals ON o.order_id = item_totals.order_id
SET o.total_amount = item_totals.recalculated_total
WHERE o.total_amount <> item_totals.recalculated_total;`}
      />

      <SQLPlayground
        initialQuery={`-- Preview: which orders have totals that differ from sum of items?
-- This is the SELECT equivalent of the UPDATE FROM above
SELECT
  o.order_id,
  o.total_amount              AS stored_total,
  SUM(oi.line_total)          AS calculated_total,
  o.total_amount - SUM(oi.line_total) AS discrepancy
FROM orders AS o
JOIN order_items AS oi ON o.order_id = oi.order_id
GROUP BY o.order_id, o.total_amount
HAVING ABS(o.total_amount - SUM(oi.line_total)) > 0.01
ORDER BY discrepancy DESC;`}
        height={200}
        showSchema={true}
      />

      <HR />

      {/* ── PART 07 ── */}
      <Part n="07" title="UPDATE Safety — The Rules That Prevent Disasters" />

      <P>These are not suggestions. They are non-negotiable habits that every professional SQL writer follows when running UPDATE on any database that contains real data.</P>

      <H>Rule 1 — SELECT before UPDATE, always</H>
      <P>Run the exact same WHERE clause as a SELECT first. Count the rows. Inspect a sample. Only proceed when the result matches what you intended.</P>

      <CodeBlock
        label="The SELECT-before-UPDATE pattern"
        code={`-- WRONG: run the UPDATE directly
UPDATE customers SET loyalty_tier = 'Platinum' WHERE city = 'Bangalore';
-- How many rows did that affect? Are you sure it was right?

-- RIGHT: SELECT first, verify, then UPDATE
-- Step 1: see exactly which rows will be affected
SELECT customer_id, first_name, city, loyalty_tier
FROM customers
WHERE city = 'Bangalore';
-- Count: 5 rows. Check: they all look right.

-- Step 2: now run the UPDATE with the same WHERE
UPDATE customers
SET loyalty_tier = 'Platinum'
WHERE city = 'Bangalore';

-- Step 3: verify the change
SELECT customer_id, first_name, city, loyalty_tier
FROM customers
WHERE city = 'Bangalore';`}
      />

      <H>Rule 2 — always include WHERE</H>
      <P>An UPDATE without WHERE updates every single row in the table. There is almost never a legitimate reason to update every row without any condition — and if there is, you should be explicit about it with a comment explaining why.</P>

      <CodeBlock
        label="The missing WHERE catastrophe"
        code={`-- CATASTROPHIC: this updates ALL 20 customers to 'Bronze'
UPDATE customers SET loyalty_tier = 'Bronze';
-- All Gold, Silver, Platinum customers are now Bronze
-- If no backup exists, this data is GONE

-- CORRECT: always include WHERE
UPDATE customers
SET loyalty_tier = 'Bronze'
WHERE loyalty_tier = 'Bronze'
  AND joined_date > '2024-01-01';  -- only new Bronze customers

-- If you genuinely need to update all rows (rare):
-- Add a comment explaining why
UPDATE products
SET in_stock = false;  -- intentional: mark all items out of stock before restock
-- Even here, better to add: WHERE in_stock = true`}
      />

      <H>Rule 3 — use transactions in production</H>

      <CodeBlock
        label="Wrap UPDATE in a transaction for safety"
        code={`-- Run in a transaction so you can ROLLBACK if something is wrong
BEGIN;

UPDATE customers
SET loyalty_tier = 'Platinum'
WHERE city = 'Bangalore'
  AND loyalty_tier = 'Gold';

-- Check the result before committing
SELECT COUNT(*), loyalty_tier FROM customers
WHERE city = 'Bangalore'
GROUP BY loyalty_tier;

-- If result looks wrong: ROLLBACK (undo everything)
ROLLBACK;

-- If result looks right: COMMIT (make permanent)
COMMIT;`}
      />

      <H>Rule 4 — UPDATE only the minimum rows necessary</H>
      <P>Use the most specific WHERE clause possible. UPDATE ... WHERE customer_id = 5 is safer than UPDATE ... WHERE city = 'Bangalore' which is safer than UPDATE ... WHERE loyalty_tier = 'Bronze'. The tighter the WHERE, the smaller the blast radius if something is wrong.</P>

      <H>Rule 5 — verify the affected row count</H>
      <P>After UPDATE, check how many rows were changed. Most SQL clients show "N rows affected" — verify this number matches your expectation. 0 rows affected means your WHERE matched nothing (check for typos). 1000 rows affected when you expected 10 means something is very wrong.</P>

      <ProTip>
        In production databases at Indian tech companies, senior engineers run UPDATE statements with a DBA (database administrator) watching the screen, or they write the UPDATE in a migration script that is peer-reviewed before execution. For updates affecting more than 10,000 rows, many teams require a JIRA ticket, a backup confirmation, and a rollback plan before the command is run. This is not excessive caution — it is professional discipline.
      </ProTip>

      <HR />

      {/* ── PART 08 ── */}
      <Part n="08" title="UPDATE with Subqueries — Dynamic New Values" />

      <P>The new value in SET can come from a subquery — a SELECT that computes the value dynamically from other data in the database.</P>

      <SQLPlayground
        initialQuery={`-- Update each store's monthly target to 120% of their current average order value
-- First: see the current averages
SELECT
  store_id,
  ROUND(AVG(total_amount), 2)            AS avg_order,
  ROUND(AVG(total_amount) * 1.2, 2)     AS proposed_target
FROM orders
WHERE order_status = 'Delivered'
GROUP BY store_id
ORDER BY store_id;`}
        height={175}
        showSchema={true}
      />

      <CodeBlock
        label="UPDATE with correlated subquery"
        code={`-- Update each store's target based on their actual average order value
UPDATE stores AS s
SET monthly_target = (
  SELECT ROUND(AVG(o.total_amount) * 1.2 * 30, 2)
  -- 120% of avg order value * 30 orders per day estimate
  FROM orders AS o
  WHERE o.store_id = s.store_id
    AND o.order_status = 'Delivered'
)
WHERE EXISTS (
  SELECT 1 FROM orders o
  WHERE o.store_id = s.store_id
    AND o.order_status = 'Delivered'
);
-- WHERE EXISTS prevents updating stores with no orders
-- (which would SET to NULL from a subquery returning no rows)`}
      />

      <HR />

      {/* ── PART 09 ── */}
      <Part n="09" title="RETURNING — See What Was Updated" />

      <P>Just like INSERT, PostgreSQL and DuckDB support RETURNING on UPDATE — it returns the values of the updated rows after the change. This is useful for confirming what changed, logging the update, or chaining the updated data into the next operation.</P>

      <SQLPlayground
        initialQuery={`-- Update and immediately see what changed
UPDATE products
SET
  unit_price = ROUND(unit_price * 1.05, 2),  -- 5% price increase
  in_stock   = true
WHERE category = 'Beverages'
  AND in_stock = false
RETURNING product_id, product_name, unit_price, in_stock;`}
        height={150}
        showSchema={false}
      />

      <SQLPlayground
        initialQuery={`-- Update loyalty tier and return the affected customers
UPDATE customers
SET loyalty_tier = 'Silver'
WHERE loyalty_tier = 'Bronze'
  AND joined_date < '2022-06-01'
RETURNING customer_id, first_name, last_name, city, loyalty_tier;`}
        height={135}
        showSchema={false}
      />

      <Callout type="info">
        MySQL does not support RETURNING on UPDATE. To see what was updated in MySQL, run a SELECT with the same WHERE clause immediately before the UPDATE, capture the IDs, then run SELECT again afterward to verify. Or use triggers to log changes into an audit table.
      </Callout>

      <HR />

      {/* ── PART 10 ── */}
      <Part n="10" title="Batch Updates — Updating Large Tables Safely" />

      <P>Updating millions of rows in a single UPDATE statement can be dangerous in production. A long-running UPDATE holds locks on rows, blocking other queries. If the UPDATE fails midway, the transaction rolls back — but the rollback itself takes time proportional to the rows already changed.</P>

      <P>For large-scale updates, the professional approach is to <Hl>batch the update</Hl> — process rows in chunks of 1,000 to 10,000, committing after each chunk.</P>

      <CodeBlock
        label="Batch update pattern — process in chunks"
        code={`-- Instead of updating 10 million rows at once:
UPDATE orders SET order_status = 'Archived'
WHERE order_date < '2022-01-01';
-- This locks 10 million rows, blocks other queries for minutes

-- Better: batch in chunks of 5,000 rows
-- Run this loop from application code or a migration script:

-- Iteration 1
UPDATE orders SET order_status = 'Archived'
WHERE order_date < '2022-01-01'
  AND order_status <> 'Archived'
LIMIT 5000;
-- COMMIT

-- Iteration 2 (same query — picks up where it left off)
UPDATE orders SET order_status = 'Archived'
WHERE order_date < '2022-01-01'
  AND order_status <> 'Archived'
LIMIT 5000;
-- COMMIT

-- Repeat until 0 rows affected
-- Each iteration: short lock time, small rollback risk, minimal blocking`}
      />

      <HR />

      {/* ── PART 11 ── */}
      <Part n="11" title="What This Looks Like at Work" />

      <P>You are a data engineer at HDFC Bank's digital payments team. A compliance audit has identified that 47 merchant accounts were incorrectly tagged with the wrong risk tier during a bulk import last month. The correct risk tiers have been verified against the original source data and are in a correction table. You need to apply the corrections safely in production.</P>

      <TimeBlock time="2:00 PM" label="Scope the problem">
        Before touching anything, understand exactly what needs to change.
      </TimeBlock>

      <CodeBlock
        label="Step 1 — understand the scope"
        code={`-- How many merchants need correction?
SELECT COUNT(*) FROM merchant_corrections;
-- Returns: 47

-- What changes will be made?
SELECT
  m.merchant_id,
  m.merchant_name,
  m.risk_tier              AS current_tier,
  c.correct_risk_tier      AS new_tier
FROM merchants AS m
JOIN merchant_corrections AS c ON m.merchant_id = c.merchant_id
WHERE m.risk_tier <> c.correct_risk_tier
ORDER BY m.merchant_id;
-- Review all 47 rows — spot-check 5 manually against source docs`}
      />

      <TimeBlock time="2:20 PM" label="Get sign-off and prepare the transaction">
        Your manager reviews the 47-row change list and approves. You prepare the UPDATE inside a transaction with a verification query before committing.
      </TimeBlock>

      <CodeBlock
        label="Step 2 — run inside a transaction with verification"
        code={`BEGIN;

-- Apply corrections
UPDATE merchants AS m
SET
  risk_tier   = c.correct_risk_tier,
  updated_at  = NOW(),
  updated_by  = 'compliance_correction_2024_04'
FROM merchant_corrections AS c
WHERE m.merchant_id = c.merchant_id
  AND m.risk_tier <> c.correct_risk_tier;

-- Check affected row count and spot-check the result
SELECT
  m.merchant_id,
  m.merchant_name,
  m.risk_tier,        -- should now be the corrected tier
  m.updated_by
FROM merchants AS m
WHERE m.updated_by = 'compliance_correction_2024_04'
ORDER BY m.merchant_id;

-- If the 47 rows all look correct: COMMIT
-- If anything looks wrong: ROLLBACK

COMMIT;`}
      />

      <TimeBlock time="2:35 PM" label="Verification and audit log">
        The UPDATE affected exactly 47 rows. You verify 5 randomly selected merchants against the source documents — all correct. You write the audit record: "47 merchant risk tier corrections applied at 14:32 IST, approved by [manager name], ticket COMP-2847." The entire operation took 35 minutes — 30 of which were verification and documentation, 5 of which were actually executing SQL.
      </TimeBlock>

      <ProTip>
        The ratio in the story above — 30 minutes of verification for 5 minutes of execution — is the correct professional ratio for any UPDATE that touches financial, compliance, or customer data. The SQL itself is the easy part. The discipline of verifying before, executing carefully, verifying after, and documenting the change is what separates a data professional from someone who types commands and hopes for the best.
      </ProTip>

      <HR />

      {/* ── PART 12 — Interview Prep ── */}
      <Part n="12" title="Interview Prep — 5 Questions With Complete Answers" />

      <IQ q="What happens if you run UPDATE without a WHERE clause?">
        <p style={{ margin: '0 0 14px' }}>Every single row in the table is updated. Without WHERE, there is no filter — the SET clause applies to all rows universally. UPDATE customers SET loyalty_tier = 'Bronze' with no WHERE condition changes every customer's loyalty tier to 'Bronze', regardless of what it was before. Gold customers, Platinum customers, Silver customers — all become Bronze simultaneously.</p>
        <p style={{ margin: '0 0 14px' }}>The damage is immediate and permanent without a transaction. If the UPDATE was not wrapped in a transaction with an uncommitted COMMIT, the change cannot be undone — there is no built-in undo in SQL. Recovery requires restoring from a backup (which loses all changes made after the backup was taken) or manually reconstructing the data from logs (which is time-consuming and error-prone).</p>
        <p style={{ margin: 0 }}>Prevention: always include a WHERE clause, always run the equivalent SELECT first to verify which rows will be affected, and always wrap consequential UPDATEs in a transaction so ROLLBACK is available if the result is wrong. Many SQL clients have a "safe mode" that prevents UPDATE and DELETE without WHERE — enable it for interactive sessions on production databases. Some teams require a WHERE clause that always includes the primary key for any single-row UPDATE, and a code review for any UPDATE that affects more than 1,000 rows.</p>
      </IQ>

      <IQ q="How do you update a column based on a value from another table?">
        <p style={{ margin: '0 0 14px' }}>In PostgreSQL, use UPDATE ... FROM syntax. The FROM clause specifies additional tables to join, and those tables can be referenced in both the SET and WHERE clauses. UPDATE orders AS o SET total_amount = item_totals.sum FROM (SELECT order_id, SUM(line_total) AS sum FROM order_items GROUP BY order_id) AS item_totals WHERE o.order_id = item_totals.order_id. The subquery or table in FROM is joined to the target table using the WHERE clause.</p>
        <p style={{ margin: '0 0 14px' }}>In MySQL, use UPDATE ... JOIN syntax. The JOIN is declared between the UPDATE and SET: UPDATE orders o JOIN order_items_summary s ON o.order_id = s.order_id SET o.total_amount = s.total WHERE o.total_amount &lt;&gt; s.total. The JOIN condition is part of the UPDATE statement itself, not in a WHERE clause.</p>
        <p style={{ margin: 0 }}>A correlated subquery in SET also works in both databases: UPDATE stores SET monthly_target = (SELECT AVG(total_amount) * 30 FROM orders WHERE orders.store_id = stores.store_id). The subquery references the outer table's current row via stores.store_id — this is evaluated once per row being updated. Correlated subqueries are more portable (work in both PostgreSQL and MySQL) but can be slower than the FROM/JOIN approach for large tables because the subquery runs once per row.</p>
      </IQ>

      <IQ q="What is the SELECT-before-UPDATE pattern and why is it the most important UPDATE habit?">
        <p style={{ margin: '0 0 14px' }}>The SELECT-before-UPDATE pattern means running a SELECT with the exact same WHERE clause as your planned UPDATE, inspecting the results, verifying the row count and values are correct, and only then executing the UPDATE. It is the single most effective practice for preventing unintended updates.</p>
        <p style={{ margin: '0 0 14px' }}>The reason it matters: UPDATE errors are silent until they cause visible damage. A WHERE condition with a subtle bug — wrong column, wrong value, missing AND — returns results when run as a SELECT, but the wrong results. If you UPDATE directly, you discover the bug only after the damage is done. If you SELECT first, you discover the bug in a read-only context where no harm is done.</p>
        <p style={{ margin: 0 }}>The concrete workflow: (1) Write the UPDATE statement. (2) Change UPDATE table SET column = value to SELECT * FROM table — keep the WHERE clause identical. (3) Run the SELECT. Count the rows — does the count match your expectation? Inspect a sample — do these rows look like the ones you meant to update? (4) If yes, change back to UPDATE and run. (5) Verify again with SELECT after the UPDATE. This adds 30–60 seconds to every UPDATE. It has saved careers by preventing accidental mass updates on production databases.</p>
      </IQ>

      <IQ q="How do you update multiple columns at once and why is it better than separate UPDATE statements?">
        <p style={{ margin: '0 0 14px' }}>Multiple columns are updated in a single UPDATE statement by listing them all in the SET clause separated by commas: UPDATE employees SET role = 'Senior Manager', salary = 75000, department = 'Management' WHERE employee_id = 5. All assignments in the SET clause are evaluated using the row's values before any change is made — then all changes are applied simultaneously. This means SET col1 = col2, col2 = col1 correctly swaps the values rather than both becoming the original col2 value.</p>
        <p style={{ margin: '0 0 14px' }}>Single-statement multi-column UPDATE is better than separate UPDATE statements for three reasons. First, atomicity: all column changes happen in one transaction. If the UPDATE succeeds, all columns are changed. If it fails, none are. Separate UPDATEs can result in a partial state where some columns changed and others did not — an inconsistent intermediate state. Second, performance: the database scans the table once, applies all changes, and updates all indexes once. Separate UPDATEs scan the table N times and update indexes N times. Third, correctness: in a concurrent system, another session might read the row between two separate UPDATEs, seeing a state where some columns are old and some are new — a visibility anomaly. One UPDATE prevents this.</p>
        <p style={{ margin: 0 }}>The only reason to use separate UPDATE statements is when each has a different WHERE clause — when different rows need different sets of columns updated. In that case, consider whether a single UPDATE with CASE WHEN in the SET clause can handle all cases in one statement, which is even more efficient.</p>
      </IQ>

      <IQ q="How do you safely update a large table with millions of rows?">
        <p style={{ margin: '0 0 14px' }}>Updating millions of rows in a single UPDATE statement holds a lock on those rows for the duration of the operation — potentially minutes or hours. During this time, other queries that need to read or write those rows are blocked, causing application timeouts and degraded performance. If the UPDATE fails, the rollback takes equally long. For tables actively used by a production application, a long-running UPDATE is essentially an outage.</p>
        <p style={{ margin: '0 0 14px' }}>The safe approach is batch updating — processing rows in chunks. Run the UPDATE with a LIMIT (or equivalent) of 1,000 to 10,000 rows per batch, commit after each batch, and repeat until zero rows are affected. Each batch holds locks for only a short time (milliseconds to seconds), commits immediately, and is individually rollbackable. The WHERE clause must be written so each successive batch picks up where the previous left off — typically by including AND updated_column &lt;&gt; new_value so already-updated rows are excluded from subsequent batches.</p>
        <p style={{ margin: 0 }}>Batching is typically done from application code or a migration script in a loop: run the UPDATE, check the affected row count, sleep briefly to give other queries a chance to run, repeat until count is 0. For very large tables at companies like Flipkart or Swiggy (billions of rows), even batching may not be sufficient — the alternative is a blue-green table migration: create a new table with the correct data, swap the table name atomically, and drop the old table. This approach has zero downtime but is operationally more complex and requires careful application code management during the swap window.</p>
      </IQ>

      <HR />

      {/* ── Error Library ── */}
      <Part n="13" title="Errors You Will Hit — And Exactly Why They Happen" />

      <Err
        msg="UPDATE affected 15,000 rows — expected 15"
        cause="The WHERE clause was less specific than intended, matching far more rows than expected. Common causes: a missing AND condition that would have narrowed the scope, a typo in the filter value that made it match broadly, or using OR when AND was intended. This is the most damaging class of UPDATE error because it is silent — no error is thrown, just far too many rows changed."
        fix="Immediately wrap the situation in a ROLLBACK if you are inside a transaction. If not in a transaction, assess the damage: SELECT * FROM table WHERE updated_at >= NOW() - INTERVAL '5 minutes' to see what was just changed. Restore from backup if the data cannot be reconstructed. Prevention: always run SELECT with the identical WHERE before UPDATE, verify the row count matches expectation, and run consequential UPDATEs inside a transaction."
      />

      <Err
        msg="ERROR: column 'loyalty_tier' of relation 'customers' does not exist — SET loyalty_tier = 'Gold'"
        cause="The column name in SET is misspelled or does not exist. Unlike WHERE (which causes 0 rows affected when wrong), a misspelled column name in SET throws an error immediately — which is actually the better failure mode. This typically happens with typos, using the wrong table's column name, or referencing a column that was renamed or not yet created."
        fix="Check the exact column names: SELECT column_name FROM information_schema.columns WHERE table_name = 'customers' ORDER BY ordinal_position. Correct the spelling in SET. If the column genuinely does not exist and needs to be created, use ALTER TABLE ADD COLUMN first. If you meant a column from a different table, ensure the UPDATE FROM syntax references the correct table."
      />

      <Err
        msg="UPDATE 0 rows affected — expected to update several rows"
        cause="The WHERE clause matched zero rows. The UPDATE ran successfully but found no rows matching the condition. Common causes: the filter value does not match what is stored (wrong case, extra whitespace, wrong ID), the row was already deleted or updated by another process, a date range that excludes all rows, or a typo in the WHERE column name that PostgreSQL treated as a literal string comparison."
        fix="Run the equivalent SELECT: SELECT * FROM table WHERE [same WHERE condition]. If it returns 0 rows, investigate why. Check the actual stored values: SELECT DISTINCT column FROM table LIMIT 10 to see what values exist. Check for case sensitivity: WHERE LOWER(city) = LOWER('bangalore'). Check for whitespace: WHERE TRIM(email) = 'value'. Once you understand why the WHERE matched nothing, correct the condition and retry."
      />

      <Err
        msg="ERROR: update or delete on table 'customers' violates foreign key constraint on table 'orders'"
        cause="You are trying to update a primary key column (customer_id) in customers that is referenced by foreign keys in the orders table. Changing the PK value would orphan all the orders that reference the old value. The FK constraint correctly prevents this. This happens when developers try to change an ID that was set incorrectly, or when migrating data between systems with different ID schemes."
        fix="Never update primary key columns after rows have been inserted — primary keys should be immutable. If the ID was genuinely set wrong, the correct fix is: (1) insert a new row with the correct ID, (2) update all FK references (orders, order_items, etc.) to point to the new ID, (3) delete the old row. This must be done in a transaction. For production systems where IDs are used externally (in URLs, in partner systems), coordinate the ID change carefully — it affects more than just the database."
      />

      <Err
        msg="UPDATE is extremely slow — hangs for minutes on a large table"
        cause="The UPDATE is modifying millions of rows without a restrictive WHERE clause (or with a WHERE clause that matches most of the table), is holding a lock for the duration, and may be causing other queries to queue behind it. The slow execution time means other application queries are timing out waiting for the lock to release. On tables with many indexes, each row update also triggers index updates — multiplying the work."
        fix="Use batch updating: add LIMIT to the UPDATE and run it in a loop until 0 rows are affected. This keeps each batch small (1,000–10,000 rows), commits quickly, and releases locks between batches. If the table has many indexes, consider dropping non-essential indexes before the bulk UPDATE and recreating them after — index maintenance is often the largest cost in a bulk UPDATE. Check the query plan with EXPLAIN ANALYZE to confirm the WHERE clause is using indexes. If no WHERE index exists, adding one before the UPDATE can dramatically speed it up."
      />

      <HR />

      {/* ── Try It ── */}
      <TryItChallenge
        question="FreshMart's quarterly loyalty review has three updates to apply: (1) Upgrade any Bronze customer who joined before 2022 to Silver. (2) Upgrade any Silver customer from Bangalore or Hyderabad to Gold. (3) Apply a 5% price increase to all Staples products that are currently in stock. For each update, first write the SELECT to verify which rows will be affected, then write the UPDATE."
        hint="Three separate updates, each with a SELECT first. Update 1: WHERE loyalty_tier = 'Bronze' AND joined_date < '2022-01-01'. Update 2: WHERE loyalty_tier = 'Silver' AND city IN ('Bangalore', 'Hyderabad'). Update 3: WHERE category = 'Staples' AND in_stock = true. Use ROUND(unit_price * 1.05, 2) for the price update."
        answer={`-- Update 1: Bronze → Silver for pre-2022 customers
-- SELECT first:
SELECT customer_id, first_name, loyalty_tier, joined_date
FROM customers
WHERE loyalty_tier = 'Bronze' AND joined_date < '2022-01-01';

-- UPDATE:
UPDATE customers
SET loyalty_tier = 'Silver'
WHERE loyalty_tier = 'Bronze' AND joined_date < '2022-01-01';

-- Update 2: Silver → Gold for metro customers
-- SELECT first:
SELECT customer_id, first_name, city, loyalty_tier
FROM customers
WHERE loyalty_tier = 'Silver'
  AND city IN ('Bangalore', 'Hyderabad');

-- UPDATE:
UPDATE customers
SET loyalty_tier = 'Gold'
WHERE loyalty_tier = 'Silver'
  AND city IN ('Bangalore', 'Hyderabad');

-- Update 3: 5% price increase for in-stock Staples
-- SELECT first:
SELECT product_id, product_name, unit_price,
       ROUND(unit_price * 1.05, 2) AS new_price
FROM products
WHERE category = 'Staples' AND in_stock = true;

-- UPDATE:
UPDATE products
SET unit_price = ROUND(unit_price * 1.05, 2)
WHERE category = 'Staples' AND in_stock = true;`}
        explanation="Three independent updates, each following the golden rule: SELECT first, UPDATE second. Notice that Update 1 and Update 2 are intentionally separate — if they were combined, a Bronze customer from Bangalore who joined before 2022 would be upgraded to Silver in Update 1, and then immediately to Gold in Update 2 in the same session. That may or may not be the intended business rule. Running them as separate statements makes the sequence explicit and auditable. Update 3 uses a computed SET value — unit_price * 1.05 references the column's current value and ROUND controls the decimal precision. Each UPDATE affects only the rows that genuinely need to change."
      />

      <HR />

      {/* ── Key Takeaways ── */}
      <KeyTakeaways
        items={[
          'The golden rule: run SELECT with the identical WHERE clause before every UPDATE. Verify the row count and inspect a sample. Only run the UPDATE after confirming the rows are exactly what you intend to modify.',
          'Always include a WHERE clause. UPDATE without WHERE modifies every row in the table — a mistake that is immediately permanent without a transaction.',
          'Update multiple columns in one SET clause: SET col1 = val1, col2 = val2. All assignments are atomic — either all change or none do. Better than separate UPDATE statements per column.',
          'Computed updates reference the current value: SET salary = salary * 1.10 reads the current salary, multiplies by 1.10, and writes the result back. All row values are read before any writes begin.',
          'CASE WHEN in SET applies different values to different rows in a single UPDATE pass — more efficient than multiple UPDATE statements with different WHERE conditions.',
          'UPDATE FROM (PostgreSQL) and UPDATE JOIN (MySQL) let you update rows using values from another table — essential for data synchronisation and correction workflows.',
          'RETURNING on UPDATE (PostgreSQL/DuckDB) returns the updated row values immediately — no separate SELECT needed to see what changed. MySQL uses triggers or a separate SELECT instead.',
          'Wrap consequential UPDATEs in a transaction: BEGIN; UPDATE...; SELECT (verify); COMMIT or ROLLBACK. A transaction gives you the ability to undo if the result is wrong.',
          'For large tables (millions of rows), batch updates: add LIMIT and run in a loop until 0 rows affected. Keeps locks short, prevents application timeouts, and limits rollback cost per batch.',
          'After UPDATE, always verify: check the affected row count matches expectation, run SELECT to confirm the changed values look correct. "No error" does not mean "correct result."',
        ]}
      />

      {/* ── Next CTA ── */}
      <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 10, padding: '24px', marginTop: 40 }}>
        <p style={{ fontSize: 10, color: 'var(--muted)', letterSpacing: '.12em', textTransform: 'uppercase', fontFamily: 'var(--font-mono)', fontWeight: 700, margin: '0 0 10px' }}>What comes next</p>
        <p style={{ fontSize: 15, color: 'var(--text)', lineHeight: 1.85, margin: '0 0 20px' }}>
          In <strong>Module 22</strong>, you learn DELETE — removing rows from tables, soft delete patterns, truncate vs delete, and why DELETE is even more dangerous than UPDATE and requires even more care.
        </p>
        <Link href="/learn/sql/delete" style={{ background: C, color: '#000', padding: '11px 24px', borderRadius: 7, fontWeight: 700, fontSize: 13, textDecoration: 'none', display: 'inline-block' }}>
          Module 22 → DELETE
        </Link>
      </div>

    </LearnLayout>
  );
}