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

export default function Aliases() {
  return (
    <LearnLayout
      title="Renaming Columns — AS (Aliases)"
      description="Give columns and tables readable names, understand where aliases can and cannot be used, and write queries that communicate clearly to every reader"
      section="SQL — Module 13"
      readTime="25 min"
      updatedAt="April 2026"
    >

      {/* ── PART 01 ── */}
      <Part n="01" title="What an Alias Is and Why It Exists" />

      <P>Every column in a SQL result has a header — the name that appears at the top of that column. Without aliases, that header is whatever the database decides to call it: the raw column name for simple selections, or the full expression text for calculated columns. The results are technically correct but often unreadable.</P>

      <SQLPlayground
        initialQuery={`-- Without aliases: column headers are raw expressions
-- Hard to read, impossible to use in application code
SELECT
  first_name,
  last_name,
  unit_price - cost_price,
  ROUND((unit_price - cost_price) / unit_price * 100, 1)
FROM products
LIMIT 3;`}
        height={140}
        showSchema={true}
      />

      <SQLPlayground
        initialQuery={`-- With aliases: column headers are clean, meaningful names
-- The result is self-documenting
SELECT
  first_name,
  last_name,
  unit_price - cost_price                                    AS profit,
  ROUND((unit_price - cost_price) / unit_price * 100, 1)    AS margin_pct
FROM products
LIMIT 3;`}
        height={140}
        showSchema={false}
      />

      <P>An <Hl>alias</Hl> is a temporary name you assign to a column or table for the duration of a query. It exists only in the result — the database schema is never changed. The AS keyword introduces the alias, though AS is optional in most databases (a space works too — but AS is always clearer and recommended).</P>

      <HR />

      {/* ── PART 02 ── */}
      <Part n="02" title="Column Aliases — Naming Your Output Columns" />

      <P>A column alias renames a column in the query result. It is placed immediately after the column expression using AS.</P>

      <CodeBlock
        label="Column alias syntax"
        code={`-- Syntax:
expression AS alias_name

-- AS is optional (but always use it for clarity):
expression alias_name    -- works but hard to read

-- Examples:
first_name AS name
unit_price AS price
unit_price - cost_price AS profit
ROUND(salary / 12, 2) AS monthly_salary`}
      />

      <H>Aliasing raw columns</H>

      <SQLPlayground
        initialQuery={`-- Rename columns for a cleaner report header
SELECT
  product_name    AS product,
  unit_price      AS price,
  cost_price      AS cost,
  in_stock        AS available
FROM products
ORDER BY price DESC
LIMIT 8;`}
        height={140}
        showSchema={true}
      />

      <SQLPlayground
        initialQuery={`-- Rename for a customer-facing display
-- Database column names are technical; aliases make them human
SELECT
  first_name      AS "First Name",
  last_name       AS "Last Name",
  city            AS "City",
  loyalty_tier    AS "Membership Tier",
  joined_date     AS "Member Since"
FROM customers
ORDER BY joined_date DESC
LIMIT 8;`}
        height={150}
        showSchema={false}
      />

      <H>Aliasing calculated columns</H>
      <P>This is where aliases are most essential. Without an alias, a calculated column's header is the full expression — unreadable in reports and unusable in application code that references columns by name.</P>

      <SQLPlayground
        initialQuery={`-- Aliases make calculated columns readable and usable
SELECT
  product_name,
  unit_price,
  cost_price,
  unit_price - cost_price                                    AS profit,
  ROUND((unit_price - cost_price) / unit_price * 100, 1)    AS margin_pct,
  ROUND(unit_price * 1.18, 2)                               AS gst_price,
  CASE
    WHEN in_stock = true THEN 'Available'
    ELSE 'Out of Stock'
  END                                                        AS stock_status
FROM products
ORDER BY margin_pct DESC;`}
        height={200}
        showSchema={false}
      />

      <HR />

      {/* ── PART 03 ── */}
      <Part n="03" title="Alias Naming Rules — What Is and Is Not Allowed" />

      <P>Alias names follow specific rules. Violating them causes syntax errors or unexpected behaviour.</P>

      <div style={{ overflowX: 'auto', margin: '20px 0 28px' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
          <thead>
            <tr>
              {['Rule', 'Valid', 'Invalid', 'Note'].map(h => (
                <th key={h} style={{ padding: '10px 14px', background: 'var(--surface)', color: 'var(--muted)', fontWeight: 700, textAlign: 'left', borderBottom: '1px solid var(--border)', fontSize: 11, textTransform: 'uppercase', letterSpacing: '.08em' }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {[
              ['No spaces (unquoted)', 'margin_pct', 'margin pct', 'Use underscore instead of space'],
              ['No reserved words (unquoted)', 'order_count', 'count', '"count" needs quotes — COUNT is a SQL function'],
              ['No special chars (unquoted)', 'gst_price', 'gst-price', 'Hyphen is interpreted as subtraction'],
              ['Start with letter or underscore', '_total, total', '123total', 'Cannot start with a digit'],
              ['Quoted aliases — anything goes', '"Margin %"', '', 'Double quotes allow spaces, special chars, reserved words'],
              ['Case sensitivity', 'Margin, margin, MARGIN', '', 'Unquoted aliases are case-insensitive in most databases'],
            ].map(([rule, valid, invalid, note], i) => (
              <tr key={rule} style={{ background: i % 2 === 0 ? 'transparent' : 'var(--surface)' }}>
                <td style={{ padding: '10px 14px', fontWeight: 600, color: 'var(--text)', borderBottom: '1px solid var(--border)', fontSize: 13 }}>{rule}</td>
                <td style={{ padding: '10px 14px', fontFamily: 'var(--font-mono)', fontSize: 12, color: '#00e676', borderBottom: '1px solid var(--border)' }}>{valid}</td>
                <td style={{ padding: '10px 14px', fontFamily: 'var(--font-mono)', fontSize: 12, color: '#ff4757', borderBottom: '1px solid var(--border)' }}>{invalid}</td>
                <td style={{ padding: '10px 14px', fontSize: 12, color: 'var(--muted)', borderBottom: '1px solid var(--border)', lineHeight: 1.6 }}>{note}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <H>Quoted aliases — for special characters and spaces</H>
      <P>When you need spaces, special characters, or SQL reserved words in an alias, wrap it in <Hl>double quotes</Hl> (PostgreSQL/standard SQL) or backticks (MySQL).</P>

      <SQLPlayground
        initialQuery={`-- Quoted aliases for human-readable report headers
-- Double quotes allow spaces and special characters
SELECT
  product_name                                              AS "Product Name",
  unit_price                                                AS "Price (₹)",
  ROUND((unit_price - cost_price) / unit_price * 100, 1)   AS "Margin %",
  CASE WHEN in_stock THEN 'Yes' ELSE 'No' END              AS "In Stock?"
FROM products
ORDER BY unit_price DESC
LIMIT 6;`}
        height={170}
        showSchema={false}
      />

      <Callout type="tip">
        For programmatic use — when application code reads column names — use simple snake_case aliases without quotes: margin_pct, total_revenue, order_count. For human-facing reports and dashboards — use quoted aliases with spaces and proper capitalisation: "Margin %", "Total Revenue", "Order Count". Match the alias style to the consumer of the query.
      </Callout>

      <HR />

      {/* ── PART 04 ── */}
      <Part n="04" title="Where Aliases Can and Cannot Be Used — The Execution Order Rule" />

      <P>This is the most important thing to understand about aliases. Because SQL clauses are executed in a specific order — and aliases are defined in SELECT — aliases can only be referenced in clauses that execute <Hl>after</Hl> SELECT.</P>

      <CodeBlock
        label="SQL execution order — where aliases exist"
        code={`-- Execution order:
-- 1. FROM        ← aliases DO NOT exist yet
-- 2. WHERE       ← aliases DO NOT exist yet
-- 3. GROUP BY    ← aliases DO NOT exist yet (in most databases)
-- 4. HAVING      ← aliases DO NOT exist yet (in most databases)
-- 5. SELECT      ← aliases ARE DEFINED HERE
-- 6. ORDER BY    ← aliases CAN BE USED HERE ✓
-- 7. LIMIT       ← aliases CAN BE USED HERE ✓`}
      />

      <H>WHERE cannot use SELECT aliases</H>

      <SQLPlayground
        initialQuery={`-- WRONG: alias 'profit' does not exist when WHERE runs
-- This will throw an error: column 'profit' does not exist
SELECT
  product_name,
  unit_price - cost_price  AS profit
FROM products
WHERE profit > 50;        -- ERROR: alias not available in WHERE`}
        height={130}
        showSchema={false}
      />

      <SQLPlayground
        initialQuery={`-- CORRECT: repeat the expression in WHERE
-- WHERE runs before SELECT, so the alias doesn't exist yet
SELECT
  product_name,
  unit_price - cost_price  AS profit
FROM products
WHERE unit_price - cost_price > 50    -- repeat the expression
ORDER BY profit DESC;                 -- ORDER BY CAN use the alias`}
        height={130}
        showSchema={false}
      />

      <H>ORDER BY CAN use SELECT aliases</H>

      <SQLPlayground
        initialQuery={`-- ORDER BY runs after SELECT — alias is available
SELECT
  product_name,
  unit_price,
  cost_price,
  ROUND((unit_price - cost_price) / unit_price * 100, 1)  AS margin_pct
FROM products
ORDER BY margin_pct DESC;   -- works: ORDER BY runs after SELECT`}
        height={140}
        showSchema={false}
      />

      <H>GROUP BY — database-dependent</H>
      <P>GROUP BY executes before SELECT in the logical order, so technically aliases should not be available. However, MySQL and DuckDB (this playground) allow GROUP BY to reference SELECT aliases as a convenience extension. PostgreSQL follows the standard strictly — GROUP BY cannot use SELECT aliases. Always repeat the expression in GROUP BY for cross-database compatibility.</P>

      <CodeBlock
        label="GROUP BY — safe cross-database approach"
        code={`-- Safe: repeat the expression in GROUP BY (works everywhere)
SELECT
  EXTRACT(MONTH FROM order_date)  AS order_month,
  COUNT(*)                        AS order_count
FROM orders
GROUP BY EXTRACT(MONTH FROM order_date)   -- repeat expression
ORDER BY order_month;

-- MySQL / DuckDB only: GROUP BY alias (not portable)
SELECT
  EXTRACT(MONTH FROM order_date)  AS order_month,
  COUNT(*)                        AS order_count
FROM orders
GROUP BY order_month   -- works in MySQL/DuckDB, fails in PostgreSQL
ORDER BY order_month;`}
      />

      <HR />

      {/* ── PART 05 ── */}
      <Part n="05" title="Table Aliases — Shorter Names for Tables" />

      <P>Aliases are not just for columns — you can also alias <Hl>tables</Hl>. Table aliases give a table a short name for the duration of the query. This is most useful in JOIN queries where you reference the same table multiple times, or when table names are long and repetitive.</P>

      <CodeBlock
        label="Table alias syntax"
        code={`-- Syntax: table_name AS alias  (AS is optional for tables too)
FROM customers AS c
FROM customers c          -- same thing, AS omitted

FROM orders AS o
FROM order_items AS oi
FROM products AS p

-- Then reference columns using alias.column_name:
SELECT c.first_name, o.total_amount
FROM customers AS c
JOIN orders AS o ON c.customer_id = o.customer_id`}
      />

      <SQLPlayground
        initialQuery={`-- Table alias makes column references explicit and concise
-- 'c' is shorthand for 'customers'
-- Useful when joining — prevents ambiguity about which table a column is from
SELECT
  c.customer_id,
  c.first_name || ' ' || c.last_name   AS customer_name,
  c.city,
  c.loyalty_tier
FROM customers AS c
WHERE c.city = 'Bangalore'
ORDER BY c.last_name;`}
        height={160}
        showSchema={true}
      />

      <SQLPlayground
        initialQuery={`-- Table aliases are essential in JOIN queries
-- Without aliases, you would write 'customers.customer_id', 'orders.order_id' etc.
-- With aliases: 'c.customer_id', 'o.order_id' — much cleaner
SELECT
  c.first_name || ' ' || c.last_name   AS customer,
  c.city,
  o.order_id,
  o.order_date,
  o.total_amount,
  o.order_status
FROM customers AS c
JOIN orders AS o ON c.customer_id = o.customer_id
WHERE o.order_status = 'Delivered'
ORDER BY o.total_amount DESC
LIMIT 8;`}
        height={190}
        showSchema={false}
      />

      <H>Self-join requires table aliases</H>
      <P>When a table joins itself (a self-join — used for hierarchies like manager/employee), aliases are not just convenient — they are <Hl>required</Hl>. Without aliases, there is no way to distinguish the two instances of the same table.</P>

      <SQLPlayground
        initialQuery={`-- Self-join: employees table joined to itself
-- 'e' = the employee, 'm' = their manager (also an employee)
-- Without aliases 'e' and 'm', this query is impossible to write
SELECT
  e.first_name || ' ' || e.last_name   AS employee,
  e.role,
  m.first_name || ' ' || m.last_name   AS manager
FROM employees AS e
LEFT JOIN employees AS m ON e.manager_id = m.employee_id
ORDER BY e.employee_id;`}
        height={160}
        showSchema={false}
      />

      <HR />

      {/* ── PART 06 ── */}
      <Part n="06" title="Subquery Aliases — Every Subquery Needs a Name" />

      <P>When you use a subquery in the FROM clause (a derived table), it <Hl>must</Hl> be given an alias. The database needs to refer to the subquery result as if it were a table, and it cannot do so without a name.</P>

      <CodeBlock
        label="Subquery alias — required syntax"
        code={`-- Subquery in FROM must have an alias
SELECT *
FROM (
  SELECT customer_id, COUNT(*) AS order_count
  FROM orders
  GROUP BY customer_id
) AS customer_orders          -- alias required — cannot omit this
WHERE order_count > 2;

-- Without the alias: ERROR
SELECT *
FROM (
  SELECT customer_id, COUNT(*) AS order_count
  FROM orders
  GROUP BY customer_id
)                              -- ERROR: subquery must have an alias
WHERE order_count > 2;`}
      />

      <SQLPlayground
        initialQuery={`-- Subquery alias in practice
-- Find customers who have placed more than 1 order
SELECT
  c.first_name || ' ' || c.last_name   AS customer,
  c.city,
  co.order_count
FROM customers AS c
JOIN (
  SELECT customer_id, COUNT(*) AS order_count
  FROM orders
  GROUP BY customer_id
  HAVING COUNT(*) > 1
) AS co ON c.customer_id = co.customer_id
ORDER BY co.order_count DESC;`}
        height={200}
        showSchema={true}
      />

      <HR />

      {/* ── PART 07 ── */}
      <Part n="07" title="Alias Conventions — How Professional Teams Name Things" />

      <P>Consistent alias naming conventions make queries readable across a team. Here are the conventions used at most Indian tech companies and data teams.</P>

      <H>Column alias conventions</H>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: 12, margin: '16px 0 28px' }}>
        {[
          { convention: 'snake_case for programmatic use', examples: ['margin_pct', 'total_revenue', 'order_count', 'avg_delivery_days'], use: 'When application code or downstream SQL will reference the column name' },
          { convention: 'Quoted Title Case for reports', examples: ['"Margin %"', '"Total Revenue"', '"Order Count"', '"Avg Delivery Days"'], use: 'When the result goes to a spreadsheet, dashboard, or human-readable report' },
          { convention: 'Prefix for aggregates', examples: ['total_amount', 'avg_price', 'max_salary', 'min_date', 'count_orders'], use: 'Prefix with the aggregate function name — makes it immediately clear what the number represents' },
          { convention: 'Suffix for percentages and rates', examples: ['margin_pct', 'discount_rate', 'completion_pct', 'growth_rate'], use: '_pct for percentages, _rate for rates — prevents confusion with raw count/amount columns' },
        ].map(item => (
          <div key={item.convention} style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 10, padding: '14px 16px' }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--text)', marginBottom: 8 }}>{item.convention}</div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 8 }}>
              {item.examples.map(e => (
                <span key={e} style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: C, background: `${C}10`, border: `1px solid ${C}20`, borderRadius: 4, padding: '2px 6px' }}>{e}</span>
              ))}
            </div>
            <div style={{ fontSize: 12, color: 'var(--muted)', lineHeight: 1.6 }}>{item.use}</div>
          </div>
        ))}
      </div>

      <H>Table alias conventions</H>

      <CodeBlock
        label="Table alias conventions used in professional SQL"
        code={`-- Short first-letter or first-two-letter aliases are standard:
customers   → c
orders      → o
order_items → oi
products    → p
stores      → s
employees   → e

-- For self-joins, use descriptive aliases:
employees AS emp   -- the employee
employees AS mgr   -- the manager

-- For subqueries, use descriptive names:
) AS monthly_totals
) AS customer_orders
) AS ranked_products

-- Avoid single letters for subqueries — they are too cryptic:
) AS t    -- what is t? unclear
) AS x    -- even worse`}
      />

      <HR />

      {/* ── PART 08 ── */}
      <Part n="08" title="Practical Alias Examples — Complete FreshMart Queries" />

      <P>Here are complete, well-aliased queries for real FreshMart reporting scenarios.</P>

      <H>Customer summary report</H>

      <SQLPlayground
        initialQuery={`-- Clean customer report with well-named aliases
SELECT
  c.customer_id                         AS id,
  c.first_name || ' ' || c.last_name   AS full_name,
  c.email,
  c.city,
  c.state,
  c.loyalty_tier                        AS tier,
  c.joined_date                         AS member_since,
  CURRENT_DATE - c.joined_date          AS days_as_member
FROM customers AS c
ORDER BY days_as_member DESC;`}
        height={190}
        showSchema={true}
      />

      <H>Product catalogue with computed fields</H>

      <SQLPlayground
        initialQuery={`-- Product catalogue: raw data + calculated fields, all well-named
SELECT
  p.product_id                                                AS id,
  p.product_name                                             AS name,
  p.brand,
  p.category,
  p.unit_price                                               AS price,
  p.cost_price                                               AS cost,
  ROUND(p.unit_price - p.cost_price, 2)                     AS profit,
  ROUND((p.unit_price - p.cost_price) / p.unit_price * 100, 1)
                                                             AS margin_pct,
  ROUND(p.unit_price * 1.18, 2)                             AS mrp,
  CASE WHEN p.in_stock THEN 'In Stock' ELSE 'Out of Stock' END
                                                             AS availability
FROM products AS p
ORDER BY margin_pct DESC;`}
        height={230}
        showSchema={false}
      />

      <H>Order analysis report</H>

      <SQLPlayground
        initialQuery={`-- Order analysis: joined tables, all columns clearly aliased
SELECT
  o.order_id,
  o.order_date,
  o.delivery_date,
  o.order_status                                             AS status,
  o.payment_method                                           AS paid_via,
  o.total_amount                                             AS amount,
  COALESCE(o.delivery_date - o.order_date, -1)              AS days_to_deliver,
  CASE
    WHEN o.delivery_date IS NULL THEN 'Pending'
    WHEN o.delivery_date - o.order_date <= 2 THEN 'Fast'
    ELSE 'Standard'
  END                                                        AS delivery_speed
FROM orders AS o
WHERE o.order_status = 'Delivered'
ORDER BY o.total_amount DESC;`}
        height={220}
        showSchema={false}
      />

      <HR />

      {/* ── PART 09 ── */}
      <Part n="09" title="What This Looks Like at Work" />

      <P>You are a data analyst at Flipkart's seller analytics team. Sellers use a dashboard to monitor their product performance. The dashboard pulls data from a SQL query that you maintain. The query was written six months ago by a colleague who has since left — and it has no aliases anywhere.</P>

      <TimeBlock time="9:00 AM" label="You inherit the query">
        The original query looks like this — technically correct but completely unreadable:
      </TimeBlock>

      <CodeBlock
        label="The original query — no aliases, unreadable"
        code={`SELECT product_name, unit_price, cost_price,
unit_price - cost_price,
ROUND((unit_price - cost_price) / unit_price * 100, 1),
ROUND(unit_price * 1.18, 2),
CASE WHEN in_stock = true THEN 'Available' ELSE 'Unavailable' END
FROM products
ORDER BY ROUND((unit_price - cost_price) / unit_price * 100, 1) DESC;`}
      />

      <TimeBlock time="9:15 AM" label="You add aliases — 10 minutes of work">
        The refactored query is identical in output but completely self-documenting:
      </TimeBlock>

      <SQLPlayground
        initialQuery={`-- Refactored: same logic, fully aliased
SELECT
  p.product_name                                              AS product,
  p.unit_price                                               AS price,
  p.cost_price                                               AS cost,
  p.unit_price - p.cost_price                               AS profit,
  ROUND((p.unit_price - p.cost_price) / p.unit_price * 100, 1)
                                                             AS margin_pct,
  ROUND(p.unit_price * 1.18, 2)                             AS mrp_incl_gst,
  CASE WHEN p.in_stock THEN 'Available' ELSE 'Unavailable' END
                                                             AS stock_status
FROM products AS p
ORDER BY margin_pct DESC;`}
        height={210}
        showSchema={true}
      />

      <TimeBlock time="9:30 AM" label="Impact is immediate">
        The dashboard team replaces their hardcoded column index references (column[3], column[4]) with named references (margin_pct, mrp_incl_gst). A new analyst can read the query and understand every column without asking you. When the product manager asks "what does column 5 mean?" — that question never comes again.
      </TimeBlock>

      <ProTip>
        Every query you write will eventually be read by someone else — a colleague, a future version of yourself, or a new hire debugging an issue at 2 AM. Aliases cost 10 seconds to write and save hours of confusion. Make aliasing every computed column and every table in a JOIN a non-negotiable personal standard. The best SQL writers are distinguished not just by correctness but by clarity.
      </ProTip>

      <HR />

      {/* ── PART 10 — Interview Prep ── */}
      <Part n="10" title="Interview Prep — 5 Questions With Complete Answers" />

      <IQ q="What is a SQL alias and what are the two types?">
        <p style={{ margin: '0 0 14px' }}>A SQL alias is a temporary name assigned to a column expression or a table for the duration of a query. It exists only in the query output — it does not change the database schema, the table structure, or the column names stored in the database. The AS keyword introduces the alias: expression AS alias_name. AS is optional in most databases but always recommended for readability.</p>
        <p style={{ margin: '0 0 14px' }}>The two types are column aliases and table aliases. A column alias renames a column in the result set — it controls the header name that appears in the output. Column aliases are most important for calculated columns, where without an alias the header would be the full expression text: unit_price - cost_price as a column header versus profit. Column aliases are also used to rename existing columns to more readable names for specific reports or applications.</p>
        <p style={{ margin: 0 }}>A table alias gives a table a shorthand name for use throughout the query. Table aliases serve two purposes: they shorten long table names in queries that reference the same table many times, and they are essential in JOIN queries to distinguish which table each column comes from when multiple tables share the same column name. In self-joins — where a single table appears twice in the FROM clause — table aliases are required because the database needs two distinct names to refer to the two instances.</p>
      </IQ>

      <IQ q="Why can you use a column alias in ORDER BY but not in WHERE?">
        <p style={{ margin: '0 0 14px' }}>The answer comes from SQL's logical execution order. SQL clauses are not executed in the order they are written. The actual execution order is: FROM (identify source tables), WHERE (filter rows), GROUP BY (group filtered rows), HAVING (filter groups), SELECT (compute and name output columns), ORDER BY (sort the result), LIMIT (truncate to N rows).</p>
        <p style={{ margin: '0 0 14px' }}>Column aliases are defined during the SELECT step — step 6 in this sequence. WHERE is step 2 and GROUP BY is step 3. Since both execute before SELECT, aliases do not yet exist when WHERE and GROUP BY run. Referencing an alias in WHERE — WHERE profit {'>'} 50, where profit is a SELECT alias — would ask the database to use a name that has not been defined yet, which is why it fails with "column does not exist."</p>
        <p style={{ margin: 0 }}>ORDER BY, however, executes after SELECT — step 7. By that point the SELECT has already run and all aliases have been defined. The database knows what profit means because SELECT has already computed and named it. This is why ORDER BY margin_pct DESC works correctly. The practical implication: repeat the full expression in WHERE and GROUP BY, but use the cleaner alias in ORDER BY. Some databases (MySQL, DuckDB) extend the standard and allow aliases in GROUP BY as a convenience — but this is not portable and should be avoided in code intended to run on multiple database systems.</p>
      </IQ>

      <IQ q="What happens if you do not alias a calculated column?">
        <p style={{ margin: '0 0 14px' }}>Without an alias, a calculated column's header in the result is whatever the database chooses to call it — typically the full expression text. In PostgreSQL, unit_price - cost_price appears as a column named exactly "?column?" or "unit_price - cost_price". In MySQL it might be "unit_price - cost_price". ROUND((unit_price - cost_price) / unit_price * 100, 1) might appear as a column named with the entire expression.</p>
        <p style={{ margin: '0 0 14px' }}>This creates three practical problems. First, readability — a column named "ROUND((unit_price - cost_price) / unit_price * 100, 1)" in a report is useless to any business user. Second, application code — most application frameworks reference columns by name. A Python script doing result['margin_pct'] works. result['ROUND((unit_price - cost_price) / unit_price * 100, 1)'] does not. Third, portability — the auto-generated column name varies by database system, so the same query produces differently named columns on PostgreSQL and MySQL, breaking any code that references the column name.</p>
        <p style={{ margin: 0 }}>The professional standard: every calculated column, every CASE expression, every aggregate function result, and every concatenated string expression should have an explicit alias. This applies even when you think only you will run the query — the next person to run it (or future you) will thank the aliases.</p>
      </IQ>

      <IQ q="When is a table alias required vs just recommended?">
        <p style={{ margin: '0 0 14px' }}>Table aliases are required in two specific situations. First, self-joins — when a table is joined to itself, the database needs two distinct names to refer to the two instances. Without aliases, FROM employees JOIN employees produces an error because there is no way to distinguish the two copies of the table. FROM employees AS e JOIN employees AS m provides the two names needed: e for the employee record and m for the manager record. This pattern is used for any hierarchy stored in a single table: org charts, category trees, location hierarchies.</p>
        <p style={{ margin: '0 0 14px' }}>Second, subquery aliases — any subquery in the FROM clause must be given an alias. The database treats the subquery result as a temporary table and needs a name to refer to it. FROM (SELECT ...) as an unnamed subquery produces a syntax error. FROM (SELECT ...) AS subq gives the derived table the name subq, which can then be referenced in the outer query's WHERE, JOIN ON, and SELECT clauses.</p>
        <p style={{ margin: 0 }}>Table aliases are recommended (but not required) in all JOIN queries involving multiple tables. Without aliases, every column reference must be fully qualified with the table name: customers.customer_id, orders.order_id, customers.first_name — verbose and repetitive. With aliases c, o, the same references become c.customer_id, o.order_id, c.first_name — much more concise. Professional SQL writers use table aliases in every multi-table query as a matter of course, not just when required.</p>
      </IQ>

      <IQ q="Can you use the same alias name twice in one query?">
        <p style={{ margin: '0 0 14px' }}>For column aliases — no, and it should not be done. If you define two columns with the same alias name in the same SELECT, the behaviour is database-specific. PostgreSQL returns both columns with the same name, which confuses application code that reads columns by name. Most other databases exhibit similar undefined or database-specific behaviour. The practical rule: every column alias in a SELECT must be unique. Column aliases are the names application code uses to access values, and duplicate names make it impossible to reliably access either value.</p>
        <p style={{ margin: '0 0 14px' }}>For table aliases — no, for the same reason. Two tables with the same alias in the FROM clause would create ambiguity about which table a column reference belongs to. FROM customers AS c JOIN orders AS c creates an error — the database cannot determine whether c.customer_id refers to the customers or orders alias. All table aliases in a FROM clause must be distinct.</p>
        <p style={{ margin: 0 }}>The only scenario where the same alias name can appear is in separate subqueries at different levels of nesting. A subquery alias named totals does not conflict with another subquery alias also named totals in a different part of the query, because each alias is scoped to its own level of the query. However, this is still bad practice — use descriptive, unique names for every alias in the query regardless of scope. Repeated alias names, even in different scopes, create confusion for anyone reading the query.</p>
      </IQ>

      <HR />

      {/* ── Error Library ── */}
      <Part n="11" title="Errors You Will Hit — And Exactly Why They Happen" />

      <Err
        msg="ERROR: column 'profit' does not exist — WHERE profit > 50"
        cause="You used a SELECT alias in a WHERE clause. WHERE executes before SELECT in the logical execution order, so when WHERE evaluates 'profit > 50', the alias 'profit' has not been defined yet — it will be defined later during SELECT. The database sees 'profit' in WHERE and looks for a column with that name in the table, finds none, and throws a column-not-found error."
        fix="Repeat the full expression in WHERE: WHERE (unit_price - cost_price) > 50. Do not use the alias. The alias is only available in ORDER BY (which runs after SELECT). If you find yourself repeating a complex expression many times, consider using a CTE (WITH clause, Module 55) or a subquery to define the calculation once and reference the alias in the outer query."
      />

      <Err
        msg="ERROR: subquery in FROM must have an alias"
        cause="You used a subquery in the FROM clause without giving it an alias. The database needs to treat the subquery result as a temporary table and reference it by name in the rest of the query. Without an alias, the database has no name for the derived table and cannot proceed."
        fix="Add AS alias_name immediately after the closing parenthesis of the subquery: FROM (SELECT ... FROM ...) AS my_subquery. The alias name can be anything valid — use something descriptive that explains what the subquery contains: customer_orders, monthly_totals, ranked_products. Then reference the subquery's columns using alias.column_name in the outer SELECT and WHERE."
      />

      <Err
        msg="ERROR: syntax error at or near 'AS' — FROM customers AS"
        cause="The table alias declaration is incomplete — AS appears but the alias name is missing. This happens when an alias is started but not finished, often from a copy-paste error or mid-edit save. AS must be followed immediately by the alias name with no other keywords between them."
        fix="Complete the alias: FROM customers AS c. If you do not want a table alias at all, remove the AS entirely: FROM customers. Check that no SQL keywords accidentally ended up where the alias name should be — FROM customers AS WHERE would trigger this error because WHERE is a SQL keyword, not a valid alias name (unquoted)."
      />

      <Err
        msg="Column headers show expression text instead of alias name — output shows 'unit_price - cost_price' as header"
        cause="You forgot to add an AS alias to a calculated column. The database auto-generates a column name from the expression, which varies by database: PostgreSQL might show '?column?', MySQL shows the full expression text, DuckDB shows '(unit_price - cost_price)'. This is not an error — it is the expected behaviour without an alias."
        fix="Add AS alias_name after the expression: unit_price - cost_price AS profit. Always alias every calculated column, every aggregate function result, and every CASE expression. Build this as a habit rather than a correction — it prevents the problem entirely. If you are working from a query someone else wrote and cannot modify it, most SQL clients allow you to rename columns in the result view — but the SQL itself should have proper aliases."
      />

      <Err
        msg="GROUP BY 1 sorts by wrong column after adding a new column to SELECT"
        cause="You used a positional reference in GROUP BY (GROUP BY 1, GROUP BY 2) instead of the column name or alias. When you later add a new column to the SELECT list before the grouped column, the position numbers shift — GROUP BY 1 now refers to the newly added first column, not the intended column. The query runs without error but groups on the wrong column, producing incorrect results."
        fix="Always use the column name or expression in GROUP BY, never positional references: GROUP BY product_name instead of GROUP BY 1. If you need to group by an expression, repeat the expression: GROUP BY EXTRACT(MONTH FROM order_date). This makes the GROUP BY clause self-documenting and immune to SELECT list reordering. The same applies to ORDER BY — avoid ORDER BY 1, ORDER BY 2 in production queries; use column names or aliases instead."
      />

      <HR />

      {/* ── Try It ── */}
      <TryItChallenge
        question="Write a clean, well-aliased query for the FreshMart monthly business review. The query should show: each store's ID (aliased as 'store'), the store's city, total number of orders placed (aliased as 'total_orders'), total revenue from delivered orders only (aliased as 'delivered_revenue'), and average order value across all orders (aliased as 'avg_order_value', rounded to 2 decimal places). Join the stores and orders tables. Group by store. Sort by delivered_revenue descending."
        hint="Use stores AS s and orders AS o. JOIN on store_id. For delivered_revenue use SUM with a CASE WHEN order_status = 'Delivered' THEN total_amount END inside it. Group by s.store_id and s.city."
        answer={`SELECT
  s.store_id                                               AS store,
  s.city,
  COUNT(o.order_id)                                        AS total_orders,
  SUM(
    CASE WHEN o.order_status = 'Delivered'
    THEN o.total_amount ELSE 0 END
  )                                                        AS delivered_revenue,
  ROUND(AVG(o.total_amount), 2)                           AS avg_order_value
FROM stores AS s
JOIN orders AS o ON s.store_id = o.store_id
GROUP BY s.store_id, s.city
ORDER BY delivered_revenue DESC;`}
        explanation="This query demonstrates all alias types working together. Table aliases (s for stores, o for orders) shorten column references throughout. Column aliases (store, total_orders, delivered_revenue, avg_order_value) give every output column a meaningful name. The subquery-like CASE inside SUM conditionally sums only delivered order amounts — a pattern called a conditional aggregate that you will learn formally in Module 27. ORDER BY delivered_revenue uses the SELECT alias correctly because ORDER BY runs after SELECT. GROUP BY repeats the full column references (s.store_id, s.city) rather than using aliases, which is the safe cross-database approach."
      />

      <HR />

      {/* ── Key Takeaways ── */}
      <KeyTakeaways
        items={[
          'An alias is a temporary name for a column or table, defined with AS. It exists only in the query output — the database schema is never changed.',
          'Column aliases rename output column headers. They are most essential for calculated columns — without them, the header is the full expression text, which is unreadable and unusable in application code.',
          'Table aliases give tables a shorthand name. They are required in self-joins (a table joined to itself) and for subqueries in FROM. They are strongly recommended in all multi-table JOIN queries.',
          'Column aliases are defined during SELECT (step 6 of execution). They can only be referenced in clauses that run after SELECT — ORDER BY works, WHERE and GROUP BY do not.',
          'To filter on a calculated value, repeat the expression in WHERE — not the alias: WHERE (unit_price - cost_price) > 50, not WHERE profit > 50.',
          'Subquery aliases are mandatory. Every subquery in FROM must be named: FROM (SELECT ...) AS subq_name. Without the alias, the query throws a syntax error.',
          'Quoted aliases (double quotes in PostgreSQL, backticks in MySQL) allow spaces, special characters, and SQL reserved words: AS "Margin %", AS "Order Count".',
          'Alias naming conventions: snake_case for programmatic use (margin_pct, total_revenue), quoted Title Case for human-readable reports ("Margin %", "Total Revenue"). Prefix aggregates: total_, avg_, max_, min_.',
          'Never use positional references in GROUP BY (GROUP BY 1) — they break when columns are reordered. Always use column names or repeat the expression.',
          'Every calculated column, every aggregate result, every CASE expression, and every concatenated string in a production query should have an explicit alias. This is not optional — it is the professional standard.',
        ]}
      />

      {/* ── Next CTA ── */}
      <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 10, padding: '24px', marginTop: 40 }}>
        <p style={{ fontSize: 10, color: 'var(--muted)', letterSpacing: '.12em', textTransform: 'uppercase', fontFamily: 'var(--font-mono)', fontWeight: 700, margin: '0 0 10px' }}>What comes next</p>
        <p style={{ fontSize: 15, color: 'var(--text)', lineHeight: 1.85, margin: '0 0 20px' }}>
          In <strong>Module 14</strong>, you learn pattern matching with LIKE and wildcards — finding rows that match a pattern rather than an exact value. This is how you search for emails by domain, product names by brand prefix, or any partial text match.
        </p>
        <Link href="/learn/sql/like-wildcards" style={{ background: C, color: '#000', padding: '11px 24px', borderRadius: 7, fontWeight: 700, fontSize: 13, textDecoration: 'none', display: 'inline-block' }}>
          Module 14 → Pattern Matching — LIKE & Wildcards
        </Link>
      </div>

    </LearnLayout>
  );
}