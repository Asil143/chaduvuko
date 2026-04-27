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

export default function LeftRightJoin() {
  return (
    <LearnLayout
      title="LEFT and RIGHT JOIN"
      description="Keep unmatched rows — every LEFT JOIN pattern from basic optional enrichment to anti-join gap analysis, plus when RIGHT JOIN makes sense and the ON vs WHERE trap"
      section="SQL — Module 32"
      readTime="35 min"
      updatedAt="April 2026"
    >

      {/* ── PART 01 ── */}
      <Part n="01" title="The Core Difference — Inclusion of Unmatched Rows" />

      <P>INNER JOIN keeps only rows that match on both sides. But many analytical questions specifically need rows that have <Hl>no</Hl> match on one side — customers who have never ordered, products that have never been sold, stores with no employees. These questions cannot be answered with INNER JOIN because unmatched rows are excluded by definition.</P>

      <P>LEFT JOIN solves this. It keeps <Hl>every row from the left table</Hl> — whether or not it has a match in the right table. For rows that do have a match, right-side columns are populated normally. For rows with no match, right-side columns are filled with NULL. The left table is never filtered — every one of its rows appears in the result exactly once per matching right-side row (or once with NULLs if no match exists).</P>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 14, margin: '20px 0 32px' }}>
        {[
          {
            type: 'INNER JOIN',
            color: C,
            desc: 'Returns rows where BOTH sides match. Unmatched rows from either side are silently dropped.',
            example: 'Customers who have placed at least one order',
          },
          {
            type: 'LEFT JOIN',
            color: '#00e676',
            desc: 'Returns ALL left-table rows. Right-side columns are NULL when no match exists. Left table is never filtered.',
            example: 'ALL customers — including those with no orders',
          },
          {
            type: 'RIGHT JOIN',
            color: '#f97316',
            desc: 'Returns ALL right-table rows. Left-side columns are NULL when no match. Mirror of LEFT JOIN.',
            example: 'ALL orders — even those referencing deleted customers',
          },
        ].map(item => (
          <div key={item.type} style={{ background: 'var(--surface)', border: `1px solid ${item.color}30`, borderRadius: 12, overflow: 'hidden' }}>
            <div style={{ padding: '12px 16px', background: `${item.color}12`, borderBottom: `1px solid ${item.color}20` }}>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: 14, fontWeight: 700, color: item.color }}>{item.type}</span>
            </div>
            <div style={{ padding: '14px 16px' }}>
              <p style={{ fontSize: 13, color: 'var(--text)', lineHeight: 1.7, margin: '0 0 10px' }}>{item.desc}</p>
              <p style={{ fontSize: 11, color: 'var(--muted)', fontStyle: 'italic', margin: 0 }}>Example: {item.example}</p>
            </div>
          </div>
        ))}
      </div>

      <HR />

      {/* ── PART 02 ── */}
      <Part n="02" title="LEFT JOIN — Basic Syntax and Behaviour" />

      <CodeBlock
        label="LEFT JOIN syntax"
        code={`-- LEFT JOIN (same as LEFT OUTER JOIN — OUTER is optional)
SELECT columns
FROM   left_table  AS l
LEFT JOIN right_table AS r ON l.key = r.key;

-- For matched rows: both sides populated
-- For unmatched left rows: right-side columns = NULL
-- The left table is NEVER filtered — every row appears at least once`}
      />

      <SQLPlayground
        initialQuery={`-- All customers with their order count
-- INNER JOIN would exclude customers with no orders
-- LEFT JOIN keeps all customers — order columns NULL if no orders

SELECT
  c.customer_id,
  c.first_name || ' ' || c.last_name  AS customer,
  c.city,
  c.loyalty_tier,
  o.order_id,
  o.order_date,
  o.total_amount
FROM customers AS c
LEFT JOIN orders AS o ON c.customer_id = o.customer_id
ORDER BY c.customer_id, o.order_date NULLS LAST;`}
        height={215}
        showSchema={true}
      />

      <SQLPlayground
        initialQuery={`-- All products — including those never ordered
-- NULL in order columns = product never sold
SELECT
  p.product_id,
  p.product_name,
  p.category,
  p.unit_price,
  oi.order_id,
  oi.quantity,
  oi.line_total
FROM products AS p
LEFT JOIN order_items AS oi ON p.product_id = oi.product_id
ORDER BY p.product_id, oi.order_id NULLS LAST
LIMIT 15;`}
        height={200}
        showSchema={false}
      />

      <SQLPlayground
        initialQuery={`-- All stores with their delivered order counts
-- Stores with no delivered orders show 0 (via COALESCE)
SELECT
  s.store_id,
  s.store_name,
  s.city,
  COUNT(o.order_id)                             AS total_orders,
  COALESCE(ROUND(SUM(o.total_amount), 2), 0)    AS total_revenue,
  COALESCE(ROUND(AVG(o.total_amount), 2), 0)    AS avg_order_value
FROM stores AS s
LEFT JOIN orders AS o
  ON s.store_id = o.store_id
  AND o.order_status = 'Delivered'
GROUP BY s.store_id, s.store_name, s.city
ORDER BY total_revenue DESC;`}
        height={210}
        showSchema={false}
      />

      <HR />

      {/* ── PART 03 ── */}
      <Part n="03" title="The Anti-Join Pattern — LEFT JOIN + IS NULL" />

      <P>The most powerful LEFT JOIN pattern is the <Hl>anti-join</Hl> — finding rows in the left table that have <Hl>no</Hl> corresponding row in the right table. The structure is always the same: LEFT JOIN, then WHERE right_table.primary_key IS NULL. The IS NULL filter keeps only the rows where no match was found — the NULLs that LEFT JOIN added.</P>

      <CodeBlock
        label="Anti-join pattern — always the same structure"
        code={`SELECT l.*
FROM   left_table  AS l
LEFT JOIN right_table AS r ON l.key = r.key
WHERE  r.key IS NULL;    -- keep only unmatched left rows

-- r.key IS NULL means no row in right_table matched this left row
-- These are the rows INNER JOIN would have excluded`}
      />

      <H>Customers who have never placed an order</H>

      <SQLPlayground
        initialQuery={`-- Anti-join: customers with NO orders at all
SELECT
  c.customer_id,
  c.first_name || ' ' || c.last_name  AS customer,
  c.email,
  c.city,
  c.loyalty_tier,
  c.joined_date
FROM customers AS c
LEFT JOIN orders AS o ON c.customer_id = o.customer_id
WHERE o.order_id IS NULL        -- NULL = no match found = never ordered
ORDER BY c.joined_date;`}
        height={205}
        showSchema={true}
      />

      <H>Products that have never been sold</H>

      <SQLPlayground
        initialQuery={`-- Products with zero sales — never appeared in any order
SELECT
  p.product_id,
  p.product_name,
  p.category,
  p.brand,
  p.unit_price,
  p.in_stock
FROM products AS p
LEFT JOIN order_items AS oi ON p.product_id = oi.product_id
WHERE oi.item_id IS NULL        -- no matching order_items row
ORDER BY p.category, p.unit_price DESC;`}
        height={195}
        showSchema={false}
      />

      <H>Employees with no store assignment</H>

      <SQLPlayground
        initialQuery={`-- Employees without a store (head office or unassigned)
SELECT
  e.employee_id,
  e.first_name || ' ' || e.last_name  AS employee,
  e.role,
  e.department,
  e.salary,
  e.hire_date
FROM employees AS e
LEFT JOIN stores AS s ON e.store_id = s.store_id
WHERE s.store_id IS NULL        -- employee has no store
ORDER BY e.department, e.salary DESC;`}
        height={195}
        showSchema={false}
      />

      <ProTip>
        The anti-join (LEFT JOIN + IS NULL) is one of the five patterns every SQL analyst must have memorised. It answers "which X has no Y?" — and that question appears constantly in production: churned users, unsold inventory, incomplete data pipelines, orphaned records. Whenever a business question contains the words "never", "no", "missing", or "without", reach for LEFT JOIN + IS NULL.
      </ProTip>

      <HR />

      {/* ── PART 04 ── */}
      <Part n="04" title="LEFT JOIN for Optional Enrichment — Adding Data Where Available" />

      <P>Not all LEFT JOINs are anti-joins. A common pattern is optional enrichment — adding data from a right table where it exists, while keeping all left rows regardless. The right-side columns may be NULL for some rows and populated for others, and both are valid in the result.</P>

      <H>Orders with optional delivery details</H>

      <SQLPlayground
        initialQuery={`-- All orders, with delivery info where available
-- delivery_date is NULL for undelivered orders — that is expected
SELECT
  o.order_id,
  o.order_date,
  o.order_status,
  o.total_amount,
  o.delivery_date,
  CASE
    WHEN o.delivery_date IS NOT NULL
    THEN (o.delivery_date - o.order_date)::TEXT || ' days'
    ELSE 'Not yet delivered'
  END AS delivery_time,
  c.first_name || ' ' || c.last_name  AS customer
FROM orders AS o
LEFT JOIN customers AS c ON o.customer_id = c.customer_id
ORDER BY o.order_date DESC
LIMIT 10;`}
        height={230}
        showSchema={true}
      />

      <H>Products with sales metrics — zero for unsold</H>

      <SQLPlayground
        initialQuery={`-- All products with sales metrics — unsold products show 0
SELECT
  p.product_id,
  p.product_name,
  p.category,
  p.unit_price,
  COALESCE(sales.times_ordered, 0)       AS times_ordered,
  COALESCE(sales.total_units, 0)         AS total_units_sold,
  COALESCE(sales.total_revenue, 0)       AS total_revenue,
  CASE
    WHEN sales.times_ordered IS NULL THEN 'Never sold'
    WHEN sales.times_ordered < 3    THEN 'Low volume'
    ELSE 'Active'
  END                                    AS sales_status
FROM products AS p
LEFT JOIN (
  SELECT
    product_id,
    COUNT(DISTINCT order_id)            AS times_ordered,
    SUM(quantity)                       AS total_units,
    ROUND(SUM(line_total), 2)           AS total_revenue
  FROM order_items
  GROUP BY product_id
) AS sales ON p.product_id = sales.product_id
ORDER BY total_revenue DESC NULLS LAST;`}
        height={265}
        showSchema={false}
      />

      <H>Customers with loyalty tier benefits (optional reference table)</H>

      <SQLPlayground
        initialQuery={`-- Customers with their order history summary
-- Customers with no orders still appear — COUNT returns 0
SELECT
  c.customer_id,
  c.first_name || ' ' || c.last_name   AS customer,
  c.loyalty_tier,
  c.city,
  COUNT(o.order_id)                    AS total_orders,
  COALESCE(ROUND(SUM(o.total_amount), 2), 0)  AS total_spend,
  COALESCE(MAX(o.order_date), c.joined_date)  AS last_activity
FROM customers AS c
LEFT JOIN orders AS o
  ON c.customer_id = o.customer_id
  AND o.order_status = 'Delivered'
GROUP BY c.customer_id, c.first_name, c.last_name, c.loyalty_tier, c.city, c.joined_date
ORDER BY total_spend DESC NULLS LAST;`}
        height={235}
        showSchema={false}
      />

      <HR />

      {/* ── PART 05 ── */}
      <Part n="05" title="The ON vs WHERE Trap with LEFT JOIN" />

      <P>This is the most important technical subtlety about LEFT JOIN — placing a filter in WHERE instead of ON accidentally converts the LEFT JOIN to an INNER JOIN. Understanding why prevents one of the most common silent query bugs in production SQL.</P>

      <H>How the trap works</H>

      <CodeBlock
        label="ON vs WHERE — the critical difference"
        code={`-- GOAL: all customers, with only their DELIVERED orders
-- (unordered customers should still appear with NULL order columns)

-- WRONG: filter in WHERE — converts LEFT JOIN to INNER JOIN
SELECT c.customer_id, c.first_name, o.order_id, o.order_status
FROM customers AS c
LEFT JOIN orders AS o ON c.customer_id = o.customer_id
WHERE o.order_status = 'Delivered';
-- What happens:
-- 1. LEFT JOIN runs: all customers appear, NULLs for unordered
-- 2. WHERE filters: order_status = 'Delivered' on NULL rows = NULL = not TRUE
-- 3. NULL rows are discarded — unordered customers disappear
-- Result: same as INNER JOIN — unordered customers are EXCLUDED

-- RIGHT: filter in ON — applied before NULLs are added
SELECT c.customer_id, c.first_name, o.order_id, o.order_status
FROM customers AS c
LEFT JOIN orders AS o
  ON c.customer_id = o.customer_id
  AND o.order_status = 'Delivered';  -- filter within the join
-- What happens:
-- 1. JOIN only matches delivered orders (non-delivered excluded from matching)
-- 2. LEFT JOIN adds NULLs for customers with no delivered orders
-- 3. No WHERE to filter out the NULL rows
-- Result: all customers appear; order columns NULL if no delivered orders`}
      />

      <SQLPlayground
        initialQuery={`-- WRONG version: WHERE filter converts LEFT JOIN to INNER JOIN
-- Customers with no delivered orders are excluded
SELECT
  c.customer_id,
  c.first_name,
  COUNT(o.order_id)  AS delivered_count
FROM customers AS c
LEFT JOIN orders AS o ON c.customer_id = o.customer_id
WHERE o.order_status = 'Delivered'   -- kills unmatched customers
GROUP BY c.customer_id, c.first_name
ORDER BY delivered_count DESC;`}
        height={180}
        showSchema={true}
      />

      <SQLPlayground
        initialQuery={`-- RIGHT version: ON filter preserves all customers
-- Customers with no delivered orders appear with count 0
SELECT
  c.customer_id,
  c.first_name,
  COUNT(o.order_id)  AS delivered_count
FROM customers AS c
LEFT JOIN orders AS o
  ON c.customer_id = o.customer_id
  AND o.order_status = 'Delivered'   -- filter inside the join
GROUP BY c.customer_id, c.first_name
ORDER BY delivered_count DESC;`}
        height={180}
        showSchema={false}
      />

      <P>Run both queries and compare the row counts. The WRONG version returns fewer rows — it excluded customers with no delivered orders. The RIGHT version returns all customers with 0 for those who have no delivered orders.</P>

      <Callout type="warning">
        The ON vs WHERE trap is one of the top three SQL bugs that senior engineers look for in code review. The symptom: you use LEFT JOIN intending to keep all left rows, but the result has fewer rows than the left table. Diagnosis: check every WHERE condition for references to right-table columns — move them to the ON clause if you want to preserve all left rows.
      </Callout>

      <H>The decision rule</H>

      <div style={{ overflowX: 'auto', margin: '20px 0 28px' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
          <thead>
            <tr>
              {['Question', 'Condition goes in', 'Why'].map(h => (
                <th key={h} style={{ padding: '10px 14px', background: 'var(--surface)', color: 'var(--muted)', fontWeight: 700, textAlign: 'left', borderBottom: '1px solid var(--border)', fontSize: 11, textTransform: 'uppercase', letterSpacing: '.08em' }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {[
              ['Should unmatched left rows appear with NULLs when this condition fails?', 'ON', 'Filter is part of the join relationship — unmatched rows are still kept'],
              ['Should unmatched left rows be excluded when this condition is NULL?', 'WHERE', 'If exclusion is desired, WHERE is correct — but this converts LEFT to INNER'],
              ['Is this condition on a left-table column only?', 'WHERE (safe)', 'Left-table conditions in WHERE never affect NULL row preservation'],
              ['Is this condition on a right-table column?', 'ON (for LEFT JOIN)', 'Right-table conditions in WHERE kill NULL rows — move to ON to preserve them'],
            ].map(([q, goes, why], i) => (
              <tr key={i} style={{ background: i % 2 === 0 ? 'transparent' : 'var(--surface)' }}>
                <td style={{ padding: '10px 14px', fontSize: 13, color: 'var(--text)', borderBottom: '1px solid var(--border)', lineHeight: 1.5 }}>{q}</td>
                <td style={{ padding: '10px 14px', fontFamily: 'var(--font-mono)', fontSize: 12, color: goes.startsWith('ON') ? '#00e676' : goes.startsWith('WHERE (safe)') ? C : '#f59e0b', borderBottom: '1px solid var(--border)', fontWeight: 700 }}>{goes}</td>
                <td style={{ padding: '10px 14px', fontSize: 13, color: 'var(--muted)', borderBottom: '1px solid var(--border)', lineHeight: 1.5 }}>{why}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <HR />

      {/* ── PART 06 ── */}
      <Part n="06" title="Multiple LEFT JOINs — Chaining Optional Relationships" />

      <P>Multiple LEFT JOINs chain together just like INNER JOINs. Each LEFT JOIN independently preserves all rows from the preceding result — adding NULLs for each table that has no match.</P>

      <SQLPlayground
        initialQuery={`-- All employees: with store details AND manager details
-- Both store and manager are optional (nullable FKs)
SELECT
  e.employee_id,
  e.first_name || ' ' || e.last_name    AS employee,
  e.role,
  e.salary,
  s.store_name,
  s.city                                AS store_city,
  mgr.first_name || ' ' || mgr.last_name AS manager_name
FROM employees AS e
LEFT JOIN stores    AS s   ON e.store_id   = s.store_id
LEFT JOIN employees AS mgr ON e.manager_id = mgr.employee_id
ORDER BY s.city NULLS LAST, e.salary DESC;`}
        height={215}
        showSchema={true}
      />

      <SQLPlayground
        initialQuery={`-- All stores: with order counts AND employee counts
-- Both relationships optional in this direction
SELECT
  s.store_id,
  s.store_name,
  s.city,
  s.monthly_target,
  COUNT(DISTINCT o.order_id)    AS order_count,
  COALESCE(ROUND(SUM(o.total_amount), 2), 0) AS revenue,
  COUNT(DISTINCT e.employee_id) AS employee_count
FROM stores AS s
LEFT JOIN orders    AS o ON s.store_id = o.store_id
  AND o.order_status = 'Delivered'
LEFT JOIN employees AS e ON s.store_id = e.store_id
GROUP BY s.store_id, s.store_name, s.city, s.monthly_target
ORDER BY revenue DESC;`}
        height={225}
        showSchema={false}
      />

      <H>Mixing INNER and LEFT JOINs</H>
      <P>You can mix INNER JOIN and LEFT JOIN in the same query. INNER JOIN for required relationships (the match is guaranteed), LEFT JOIN for optional ones (the match may not exist).</P>

      <SQLPlayground
        initialQuery={`-- Delivered orders (INNER JOIN required: order must have customer and store)
-- with optional product category breakdown (LEFT JOIN to order_items + products)
SELECT
  o.order_id,
  o.order_date,
  c.first_name || ' ' || c.last_name  AS customer,
  s.city           AS store_city,
  p.category,
  oi.quantity,
  oi.line_total
FROM orders AS o
JOIN customers   AS c  ON o.customer_id  = c.customer_id  -- required
JOIN stores      AS s  ON o.store_id     = s.store_id     -- required
LEFT JOIN order_items AS oi ON o.order_id    = oi.order_id   -- optional
LEFT JOIN products    AS p  ON oi.product_id = p.product_id  -- optional
WHERE o.order_status = 'Delivered'
ORDER BY o.order_id, p.category NULLS LAST
LIMIT 12;`}
        height={240}
        showSchema={false}
      />

      <HR />

      {/* ── PART 07 ── */}
      <Part n="07" title="COALESCE with LEFT JOIN — Replacing NULLs" />

      <P>LEFT JOIN produces NULLs for unmatched rows. COALESCE replaces those NULLs with meaningful defaults — turning NULL into 0 for counts and sums, or into a label like 'No orders' for display.</P>

      <SQLPlayground
        initialQuery={`-- Customer summary with COALESCE for clean display
SELECT
  c.customer_id,
  c.first_name || ' ' || c.last_name         AS customer,
  c.loyalty_tier,
  COALESCE(COUNT(o.order_id)::TEXT, '0')     AS order_count,
  COALESCE(
    ROUND(SUM(o.total_amount), 2)::TEXT,
    '₹0'
  )                                           AS total_spend,
  COALESCE(
    MAX(o.order_date)::TEXT,
    'Never ordered'
  )                                           AS last_order
FROM customers AS c
LEFT JOIN orders AS o
  ON c.customer_id = o.customer_id
  AND o.order_status = 'Delivered'
GROUP BY c.customer_id, c.first_name, c.last_name, c.loyalty_tier
ORDER BY total_spend DESC NULLS LAST;`}
        height={250}
        showSchema={true}
      />

      <SQLPlayground
        initialQuery={`-- Product metrics — COALESCE turns NULLs into zeros
SELECT
  p.product_name,
  p.category,
  p.unit_price,
  COALESCE(s.times_ordered, 0)     AS times_ordered,
  COALESCE(s.units_sold, 0)        AS units_sold,
  COALESCE(s.revenue, 0)           AS revenue,
  CASE
    WHEN s.revenue IS NULL         THEN 'No sales'
    WHEN s.revenue < 100           THEN 'Low'
    WHEN s.revenue < 500           THEN 'Medium'
    ELSE 'High'
  END                              AS sales_band
FROM products AS p
LEFT JOIN (
  SELECT
    product_id,
    COUNT(DISTINCT order_id)       AS times_ordered,
    SUM(quantity)                  AS units_sold,
    ROUND(SUM(line_total), 2)      AS revenue
  FROM order_items
  GROUP BY product_id
) AS s ON p.product_id = s.product_id
ORDER BY revenue DESC NULLS LAST;`}
        height={265}
        showSchema={false}
      />

      <HR />

      {/* ── PART 08 ── */}
      <Part n="08" title="RIGHT JOIN — The Mirror of LEFT JOIN" />

      <P>RIGHT JOIN keeps every row from the <Hl>right</Hl> table — whether or not it matches the left table. Left-side columns are NULL for unmatched right rows. RIGHT JOIN is the exact mirror of LEFT JOIN with the tables swapped.</P>

      <P>In practice, RIGHT JOIN is almost never used in production code. Any RIGHT JOIN can be rewritten as a LEFT JOIN by simply swapping the table positions — and the LEFT JOIN version is universally considered more readable because most developers read queries left-to-right and expect the "anchor" table to appear first.</P>

      <CodeBlock
        label="RIGHT JOIN — always rewritable as LEFT JOIN"
        code={`-- RIGHT JOIN: keep all orders, left-side NULL if no matching customer
SELECT c.first_name, o.order_id, o.total_amount
FROM customers AS c
RIGHT JOIN orders AS o ON c.customer_id = o.customer_id;

-- Identical result as LEFT JOIN with tables swapped:
SELECT c.first_name, o.order_id, o.total_amount
FROM orders AS o
LEFT JOIN customers AS c ON o.customer_id = c.customer_id;

-- Both return: all orders, with customer name NULL if no customer found
-- The LEFT JOIN version is preferred — the anchor table (orders) is on the left`}
      />

      <H>When RIGHT JOIN has legitimate use</H>
      <P>RIGHT JOIN can be useful when refactoring a complex query where swapping tables is difficult — for example, when a CTE or subquery is already in the left position and adding a RIGHT JOIN to an existing chain avoids restructuring the whole query. It is also occasionally used in data pipeline code where the right table is always the "source of truth" that must be fully preserved.</P>

      <SQLPlayground
        initialQuery={`-- RIGHT JOIN example — all orders with optional customer data
-- (demonstrates RIGHT JOIN; LEFT JOIN with swapped tables is preferred)
SELECT
  COALESCE(c.first_name || ' ' || c.last_name, 'Unknown Customer') AS customer,
  o.order_id,
  o.order_date,
  o.total_amount,
  o.order_status
FROM customers AS c
RIGHT JOIN orders AS o ON c.customer_id = o.customer_id
ORDER BY o.order_date DESC
LIMIT 8;`}
        height={205}
        showSchema={false}
      />

      <HR />

      {/* ── PART 09 ── */}
      <Part n="09" title="LEFT JOIN for Data Quality Checks" />

      <P>LEFT JOIN with IS NULL is the standard technique for finding data quality issues — orphaned records, missing references, incomplete data pipelines, and referential integrity violations that should have been caught by FK constraints.</P>

      <H>Find orders referencing non-existent customers</H>

      <SQLPlayground
        initialQuery={`-- Data quality: orders with no matching customer
-- In a well-designed FK schema this should return 0 rows
-- Useful after bulk imports or data migrations
SELECT
  o.order_id,
  o.customer_id,
  o.order_date,
  o.total_amount,
  o.order_status
FROM orders AS o
LEFT JOIN customers AS c ON o.customer_id = c.customer_id
WHERE c.customer_id IS NULL
ORDER BY o.order_date DESC;`}
        height={190}
        showSchema={true}
      />

      <H>Find order items with no matching order</H>

      <SQLPlayground
        initialQuery={`-- Data quality: order_items with no parent order
-- Should be impossible with FK constraints — useful in migrations
SELECT
  oi.item_id,
  oi.order_id,
  oi.product_id,
  oi.quantity,
  oi.line_total
FROM order_items AS oi
LEFT JOIN orders AS o ON oi.order_id = o.order_id
WHERE o.order_id IS NULL
ORDER BY oi.item_id;`}
        height={180}
        showSchema={false}
      />

      <H>Find stores with no employees assigned</H>

      <SQLPlayground
        initialQuery={`-- Stores with no employees — potential data gap
SELECT
  s.store_id,
  s.store_name,
  s.city,
  s.manager_name,
  s.monthly_target
FROM stores AS s
LEFT JOIN employees AS e ON s.store_id = e.store_id
WHERE e.employee_id IS NULL
ORDER BY s.city;`}
        height={175}
        showSchema={false}
      />

      <ProTip>
        Run LEFT JOIN + IS NULL checks on every table after a bulk data import or migration. These queries catch referential integrity violations that FK constraints would prevent in normal operation — but bulk imports sometimes bypass constraints. A 5-minute data quality check after any migration saves hours of debugging downstream when reports start showing wrong numbers.
      </ProTip>

      <HR />

      {/* ── PART 10 ── */}
      <Part n="10" title="LEFT JOIN vs NOT EXISTS vs NOT IN — Three Ways to Anti-Join" />

      <P>The anti-join (find rows with no match) can be written three ways. Each produces the same result for non-NULL values but differs in performance and NULL handling.</P>

      <H>Method 1 — LEFT JOIN + IS NULL</H>

      <SQLPlayground
        initialQuery={`-- Method 1: LEFT JOIN + IS NULL
-- Find customers who have never placed any order
SELECT c.customer_id, c.first_name, c.email
FROM customers AS c
LEFT JOIN orders AS o ON c.customer_id = o.customer_id
WHERE o.order_id IS NULL
ORDER BY c.customer_id;`}
        height={145}
        showSchema={true}
      />

      <H>Method 2 — NOT EXISTS</H>

      <SQLPlayground
        initialQuery={`-- Method 2: NOT EXISTS
-- Correlated subquery: for each customer, check if any order exists
SELECT c.customer_id, c.first_name, c.email
FROM customers AS c
WHERE NOT EXISTS (
  SELECT 1
  FROM orders AS o
  WHERE o.customer_id = c.customer_id
)
ORDER BY c.customer_id;`}
        height={155}
        showSchema={false}
      />

      <H>Method 3 — NOT IN</H>

      <SQLPlayground
        initialQuery={`-- Method 3: NOT IN
-- Note: NOT IN with a subquery that returns NULLs returns no rows
-- Safe here because customer_id in orders is NOT NULL
SELECT c.customer_id, c.first_name, c.email
FROM customers AS c
WHERE c.customer_id NOT IN (
  SELECT customer_id FROM orders
)
ORDER BY c.customer_id;`}
        height={150}
        showSchema={false}
      />

      <div style={{ overflowX: 'auto', margin: '20px 0 28px' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
          <thead>
            <tr>
              {['Method', 'NULL safe?', 'Performance', 'Readability', 'Preferred when'].map(h => (
                <th key={h} style={{ padding: '10px 14px', background: 'var(--surface)', color: 'var(--muted)', fontWeight: 700, textAlign: 'left', borderBottom: '1px solid var(--border)', fontSize: 11, textTransform: 'uppercase', letterSpacing: '.08em' }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {[
              ['LEFT JOIN + IS NULL', 'Yes', 'Good — uses index on join key', 'Moderate', 'Default choice for anti-join'],
              ['NOT EXISTS', 'Yes', 'Good — short-circuits on first match', 'High', 'Readable intent, correlated check'],
              ['NOT IN', 'No — NULLs break it', 'Worse on large lists', 'High', 'Only when subquery is guaranteed NULL-free'],
            ].map(([method, nulls, perf, read, when], i) => (
              <tr key={method} style={{ background: i % 2 === 0 ? 'transparent' : 'var(--surface)' }}>
                <td style={{ padding: '10px 14px', fontFamily: 'var(--font-mono)', fontSize: 12, color: C, borderBottom: '1px solid var(--border)' }}>{method}</td>
                <td style={{ padding: '10px 14px', fontSize: 12, color: nulls === 'Yes' ? '#00e676' : '#ff4757', borderBottom: '1px solid var(--border)', fontWeight: 700 }}>{nulls}</td>
                <td style={{ padding: '10px 14px', fontSize: 12, color: 'var(--text)', borderBottom: '1px solid var(--border)' }}>{perf}</td>
                <td style={{ padding: '10px 14px', fontSize: 12, color: 'var(--text)', borderBottom: '1px solid var(--border)' }}>{read}</td>
                <td style={{ padding: '10px 14px', fontSize: 12, color: 'var(--muted)', borderBottom: '1px solid var(--border)', lineHeight: 1.5 }}>{when}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Callout type="warning">
        NOT IN is dangerous when the subquery can return NULL values. NOT IN (1, 2, NULL) is equivalent to NOT (col = 1 OR col = 2 OR col = NULL). Since col = NULL is always NULL (never TRUE), the entire expression evaluates to NULL for every row — returning zero rows. Always use LEFT JOIN + IS NULL or NOT EXISTS when the subquery column might contain NULLs.
      </Callout>

      <HR />

      {/* ── PART 11 ── */}
      <Part n="11" title="What This Looks Like at Work" />

      <P>You are a data analyst at Sephora, India's beauty and personal care platform. The retention team runs a monthly lapsed-customer campaign. They need three lists: (1) customers who registered but never purchased, (2) customers who purchased at least once but not in the last 90 days, and (3) products that have been added to carts but never purchased. All three are anti-join or conditional LEFT JOIN queries — adapted here for FreshCart.</P>

      <TimeBlock time="10:00 AM" label="List 1 — registered but never purchased">
        Classic anti-join: customers in the customer table with no row in orders.
      </TimeBlock>

      <SQLPlayground
        initialQuery={`-- List 1: Never-purchased customers
SELECT
  c.customer_id,
  c.first_name || ' ' || c.last_name  AS customer,
  c.email,
  c.city,
  c.loyalty_tier,
  c.joined_date,
  CURRENT_DATE - c.joined_date        AS days_since_joining
FROM customers AS c
LEFT JOIN orders AS o ON c.customer_id = o.customer_id
WHERE o.order_id IS NULL
ORDER BY days_since_joining DESC;`}
        height={200}
        showSchema={true}
      />

      <TimeBlock time="10:20 AM" label="List 2 — purchased before but lapsed (90+ days)">
        LEFT JOIN to get last order date, then filter for customers whose last order was 90+ days ago.
      </TimeBlock>

      <SQLPlayground
        initialQuery={`-- List 2: Lapsed customers (last order 90+ days ago)
SELECT
  c.customer_id,
  c.first_name || ' ' || c.last_name   AS customer,
  c.email,
  c.loyalty_tier,
  MAX(o.order_date)                    AS last_order_date,
  CURRENT_DATE - MAX(o.order_date)     AS days_since_last_order,
  COUNT(o.order_id)                    AS total_orders,
  ROUND(SUM(o.total_amount), 2)        AS lifetime_value
FROM customers AS c
JOIN orders AS o
  ON c.customer_id = o.customer_id
  AND o.order_status = 'Delivered'
GROUP BY c.customer_id, c.first_name, c.last_name, c.email, c.loyalty_tier
HAVING MAX(o.order_date) < CURRENT_DATE - INTERVAL '90 days'
ORDER BY days_since_last_order DESC;`}
        height={235}
        showSchema={false}
      />

      <TimeBlock time="10:45 AM" label="List 3 — products never sold (unsold inventory)">
        Anti-join on products vs order_items — products with no sales record.
      </TimeBlock>

      <SQLPlayground
        initialQuery={`-- List 3: Products in catalogue but never sold
SELECT
  p.product_id,
  p.product_name,
  p.category,
  p.brand,
  p.unit_price,
  p.in_stock
FROM products AS p
LEFT JOIN order_items AS oi ON p.product_id = oi.product_id
WHERE oi.item_id IS NULL
ORDER BY p.category, p.unit_price DESC;`}
        height={185}
        showSchema={false}
      />

      <TimeBlock time="11:05 AM" label="All three lists delivered in 65 minutes">
        Three LEFT JOIN queries — two anti-joins and one HAVING filter — built and verified in 65 minutes. The retention team has three actionable segments: never-purchased for onboarding campaigns, lapsed for win-back campaigns, and unsold products for promotion planning.
      </TimeBlock>

      <ProTip>
        Retention analytics is almost entirely built on LEFT JOIN patterns. The questions "who hasn't done X?", "who did X but not recently?", and "what hasn't been Y?" all require keeping rows that have no match in the activity table. Build these three query patterns into your personal SQL library — you will write variations of them every week in product analytics.
      </ProTip>

      <HR />

      {/* ── PART 12 — Interview Prep ── */}
      <Part n="12" title="Interview Prep — 5 Questions With Complete Answers" />

      <IQ q="What is a LEFT JOIN and how does it differ from INNER JOIN?">
        <p style={{ margin: '0 0 14px' }}>LEFT JOIN returns every row from the left table whether or not it has a matching row in the right table. For rows that have a match, right-side columns are populated with the matched values. For rows with no match, right-side columns are filled with NULL. INNER JOIN returns only rows where the join condition is satisfied in both tables — unmatched rows from either side are excluded.</p>
        <p style={{ margin: '0 0 14px' }}>The key behavioural difference: INNER JOIN filters the left table — only rows with a match survive. LEFT JOIN never filters the left table — every row appears at least once. With a customers-to-orders LEFT JOIN, every customer appears in the result. With an INNER JOIN, only customers who have placed at least one order appear.</p>
        <p style={{ margin: 0 }}>When to choose which: use INNER JOIN when you only care about rows that have related data on both sides — orders with known customers, order items with known products. The FK constraints in a well-designed schema mean INNER JOIN and LEFT JOIN produce the same result for required relationships. Use LEFT JOIN when you need all rows from the left table regardless of whether a match exists — all products including unsold, all customers including those who have never ordered, all stores including those with no employees. The presence of NULL values in the right-side columns after LEFT JOIN carries meaning: it signals the absence of a relationship that the query was looking for.</p>
      </IQ>

      <IQ q="Explain the LEFT JOIN + WHERE IS NULL pattern. What does it find?">
        <p style={{ margin: '0 0 14px' }}>The LEFT JOIN + WHERE IS NULL pattern is called an anti-join. It finds rows in the left table that have no corresponding row in the right table. The structure is: SELECT left.* FROM left_table LEFT JOIN right_table ON left.key = right.key WHERE right.key IS NULL.</p>
        <p style={{ margin: '0 0 14px' }}>Why it works: LEFT JOIN produces NULLs in all right-side columns for every left row that found no match. The WHERE right.key IS NULL filter then keeps only those NULL rows — the unmatched ones. Rows that did match have a real key value (not NULL) and are excluded by the IS NULL filter. The result is exclusively the left rows with no right-side match.</p>
        <p style={{ margin: 0 }}>This pattern answers "which X has no Y?" — customers who have never ordered, products that have never been sold, employees without store assignments, stores with no employees, orders with no line items. It is one of the five SQL patterns every analyst must know. The anti-join is functionally equivalent to NOT EXISTS and NOT IN (for non-NULL cases), but LEFT JOIN + IS NULL is often the most readable and performs well with proper indexing on the join column. It appears constantly in retention analysis (lapsed users), inventory management (unsold stock), and data quality checks (orphaned records).</p>
      </IQ>

      <IQ q="Why does putting a WHERE condition on a right-table column convert a LEFT JOIN into an INNER JOIN?">
        <p style={{ margin: '0 0 14px' }}>LEFT JOIN adds NULL values to right-side columns for unmatched left rows. When a WHERE condition references a right-table column, it evaluates that condition on the NULL values. In SQL's three-valued logic, any comparison with NULL returns NULL — not TRUE and not FALSE. WHERE discards all rows where the condition does not evaluate to TRUE — which includes NULL. So rows with NULL right-side columns (the unmatched rows LEFT JOIN was supposed to preserve) are discarded by the WHERE filter.</p>
        <p style={{ margin: '0 0 14px' }}>Example: customers LEFT JOIN orders — all customers appear, with NULL order columns for unordered customers. Adding WHERE o.order_status = 'Delivered' evaluates 'Delivered' = NULL for unordered customers, which returns NULL, and WHERE discards those rows. The final result contains only customers with at least one delivered order — identical to INNER JOIN.</p>
        <p style={{ margin: 0 }}>The fix: move the right-table filter to the ON clause. ON o.order_status = 'Delivered' is applied during the join itself, before NULL rows are added. It restricts which right-table rows can match, but does not filter the left table. Customers with no delivered orders still appear — they just have NULL order columns because no delivered order matched. The decision rule: for LEFT JOIN, any condition that references right-table columns and should preserve unmatched left rows belongs in ON. Only left-table conditions and aggregate-level conditions belong in WHERE.</p>
      </IQ>

      <IQ q="How do you count records including groups with zero counts using LEFT JOIN?">
        <p style={{ margin: '0 0 14px' }}>To count records per group including groups with a count of zero, use LEFT JOIN from the group dimension table to the fact table, then COUNT the fact table's primary key (not COUNT(*)), combined with GROUP BY on the dimension table columns.</p>
        <p style={{ margin: '0 0 14px' }}>The key is COUNT(fact_table.pk) — not COUNT(*). COUNT(*) counts all rows including the NULL rows that LEFT JOIN adds for unmatched groups — it would return 1 for groups with no facts, not 0. COUNT(fact_table.pk) counts non-NULL values of the fact table's primary key. For unmatched groups, the pk is NULL, so COUNT returns 0. For matched groups, COUNT returns the number of matched rows.</p>
        <p style={{ margin: 0 }}>Example: to count orders per store including stores with no orders — SELECT s.store_id, s.city, COUNT(o.order_id) AS order_count FROM stores AS s LEFT JOIN orders AS o ON s.store_id = o.store_id GROUP BY s.store_id, s.city. Stores with no orders have o.order_id = NULL, so COUNT(o.order_id) = 0. If you use COUNT(*) instead, stores with no orders would incorrectly show 1 (the NULL row is still a row). The same principle applies to SUM — COALESCE(SUM(o.total_amount), 0) returns 0 instead of NULL for groups with no matching rows, since SUM of an empty set returns NULL.</p>
      </IQ>

      <IQ q="What is the difference between NOT IN, NOT EXISTS, and LEFT JOIN IS NULL for finding non-matching rows?">
        <p style={{ margin: '0 0 14px' }}>All three find rows in the left set that have no match in the right set, but they differ in NULL handling, performance, and readability. NOT IN is the most dangerous: NOT IN (subquery) returns zero rows if the subquery returns any NULL value — because NOT IN (1, 2, NULL) evaluates as NOT (col = 1 OR col = 2 OR col = NULL), and since col = NULL is always NULL, the entire expression is NULL for every row. This is a silent correctness bug. Only use NOT IN when you are absolutely certain the subquery column has no NULLs and will remain NULL-free.</p>
        <p style={{ margin: '0 0 14px' }}>NOT EXISTS is NULL-safe and usually the most semantically clear — "return rows where no matching row exists." The correlated subquery checks each left row individually. Most query optimisers convert NOT EXISTS to an efficient anti-join plan internally. NOT EXISTS short-circuits — it stops looking as soon as one match is found, making it efficient when matches are common.</p>
        <p style={{ margin: 0 }}>LEFT JOIN + IS NULL is also NULL-safe and usually the most familiar pattern for analysts who think in terms of table joins. It produces an explicit NULL for unmatched rows that the IS NULL filter then selects. Performance is generally equivalent to NOT EXISTS on modern optimisers — both are translated to anti-join plans internally. LEFT JOIN + IS NULL has one practical advantage: it allows you to also SELECT the right-table columns (to see the NULLs themselves) which is useful for debugging. NOT EXISTS cannot return right-table columns at all since the subquery's SELECT is not referenced. Preference in production code: NOT EXISTS for maximum semantic clarity, LEFT JOIN + IS NULL for analytical queries where seeing the NULL columns is useful for verification.</p>
      </IQ>

      <HR />

      {/* ── Error Library ── */}
      <Part n="13" title="Errors You Will Hit — And Exactly Why They Happen" />

      <Err
        msg="LEFT JOIN returns same row count as INNER JOIN — unmatched rows are missing"
        cause="A WHERE condition on a right-table column is filtering out the NULL rows that LEFT JOIN preserves for unmatched left rows. WHERE o.order_status = 'Delivered' on NULL order_status evaluates to NULL, which WHERE discards. The result excludes all customers with no delivered orders — identical to INNER JOIN behaviour."
        fix="Move right-table filter conditions from WHERE to the ON clause: LEFT JOIN orders AS o ON c.customer_id = o.customer_id AND o.order_status = 'Delivered'. The AND condition in ON restricts which right rows participate in matching, but does not filter the left table. Unmatched left rows (customers with no delivered orders) appear with NULL order columns. To diagnose: compare SELECT COUNT(*) FROM customers to the count from your LEFT JOIN query — if they differ, a WHERE condition is filtering out left rows."
      />

      <Err
        msg="Anti-join (LEFT JOIN IS NULL) returns zero rows — expected some unmatched rows"
        cause="The LEFT JOIN is being accidentally converted to an INNER JOIN by a WHERE condition on a right-table column (see above), so no NULL rows survive to be caught by IS NULL. Alternatively, every left-table row genuinely does have a match in the right table — the anti-join correctly returns zero rows because there are no unmatched rows."
        fix="Verify by running the LEFT JOIN without the WHERE IS NULL filter: SELECT COUNT(*) FROM left AS l LEFT JOIN right AS r ON l.key = r.key WHERE r.key IS NULL. If this returns 0 but SELECT COUNT(*) FROM left returns rows, every left row has a match — the anti-join correctly found nothing. If the counts differ but your WHERE IS NULL query still returns 0, check for a secondary WHERE condition on right-table columns that is eliminating the NULLs before IS NULL can filter them."
      />

      <Err
        msg="COUNT(*) returns 1 for groups with no matches — expected 0"
        cause="You used COUNT(*) after a LEFT JOIN. COUNT(*) counts all rows, including the NULL rows LEFT JOIN adds for unmatched groups. A store with no orders gets one NULL row in the joined result — COUNT(*) counts that row and returns 1, not 0."
        fix="Use COUNT(right_table.primary_key) instead of COUNT(*): COUNT(o.order_id) returns 0 for unmatched rows because order_id is NULL and COUNT(column) ignores NULLs. COALESCE is not needed for COUNT — it already returns 0 for all-NULL groups. For SUM and AVG on unmatched groups, wrap with COALESCE: COALESCE(SUM(o.total_amount), 0) returns 0 instead of NULL."
      />

      <Err
        msg="NOT IN subquery returns zero rows — even though unmatched rows clearly exist"
        cause="The NOT IN subquery returns at least one NULL value. NOT IN (1, 2, NULL) evaluates as NOT (col = 1 OR col = 2 OR col = NULL). Since col = NULL is always NULL (not TRUE), the entire OR expression can never be definitively TRUE for any col value — so NOT (NULL) = NULL for every row. WHERE discards all NULL rows, returning zero results."
        fix="Replace NOT IN with LEFT JOIN + IS NULL or NOT EXISTS — both handle NULLs correctly. If you must use NOT IN, add a WHERE filter to the subquery: WHERE subquery_column IS NOT NULL — ensuring the subquery never returns NULLs. Verify: SELECT customer_id FROM orders WHERE customer_id IS NULL — if this returns any rows, your NOT IN subquery is returning NULLs and will silently return zero rows."
      />

      <Err
        msg="LEFT JOIN with GROUP BY produces duplicate rows — customer appears multiple times"
        cause="A customer has multiple orders, so LEFT JOIN creates one row per (customer, order) pair. Without GROUP BY, each order for the same customer is a separate row — this is expected behaviour. If you then GROUP BY without listing all non-aggregate SELECT columns, the GROUP BY collapses inconsistently and produces unexpected duplicates."
        fix="Add GROUP BY for all non-aggregate columns in SELECT: GROUP BY c.customer_id, c.first_name, c.last_name, c.city, c.loyalty_tier. Use aggregate functions for order-level data: COUNT(o.order_id) for order count, SUM(o.total_amount) for total spend, MAX(o.order_date) for last order date. If you genuinely want one row per customer with aggregated order data, GROUP BY is required. If you want one row per order with customer details, do not GROUP BY — the multiple rows per customer are correct."
      />

      <HR />

      {/* ── Try It ── */}
      <TryItChallenge
        question="Write three queries using LEFT JOIN: (1) A query showing all product categories with their total delivered revenue and order count — including categories with zero sales. Show category, order_count, total_revenue (0 if none), and a 'sales_status' column: 'Active' if revenue > 0, 'No Sales' if zero. (2) An anti-join finding all customers who joined in 2023 or later but have never placed a delivered order. Show customer_id, full name, email, joined_date. (3) A query showing each store's employee count — including stores with no employees (show 0). Show store_id, city, employee_count, and avg_salary (NULL is fine for empty stores)."
        hint="Query 1: LEFT JOIN from products (distinct category) to order_items to orders. Query 2: LEFT JOIN customers to orders with delivered filter in ON, WHERE order_id IS NULL, AND joined_date filter in WHERE on left table. Query 3: LEFT JOIN stores to employees, GROUP BY store columns."
        answer={`-- Query 1: All categories with sales metrics (including zero)
SELECT
  p.category,
  COUNT(DISTINCT o.order_id)              AS order_count,
  COALESCE(ROUND(SUM(oi.line_total), 2), 0) AS total_revenue,
  CASE
    WHEN SUM(oi.line_total) > 0 THEN 'Active'
    ELSE 'No Sales'
  END                                     AS sales_status
FROM (SELECT DISTINCT category FROM products) AS p
LEFT JOIN products    AS prod ON p.category      = prod.category
LEFT JOIN order_items AS oi   ON prod.product_id = oi.product_id
LEFT JOIN orders      AS o    ON oi.order_id     = o.order_id
  AND o.order_status = 'Delivered'
GROUP BY p.category
ORDER BY total_revenue DESC;

-- Query 2: Customers who joined 2023+ with no delivered orders
SELECT
  c.customer_id,
  c.first_name || ' ' || c.last_name  AS full_name,
  c.email,
  c.joined_date
FROM customers AS c
LEFT JOIN orders AS o
  ON c.customer_id = o.customer_id
  AND o.order_status = 'Delivered'
WHERE o.order_id IS NULL
  AND c.joined_date >= '2023-01-01'
ORDER BY c.joined_date DESC;

-- Query 3: All stores with employee count including empty stores
SELECT
  s.store_id,
  s.city,
  COUNT(e.employee_id)          AS employee_count,
  ROUND(AVG(e.salary), 0)       AS avg_salary
FROM stores AS s
LEFT JOIN employees AS e ON s.store_id = e.store_id
GROUP BY s.store_id, s.city
ORDER BY employee_count DESC;`}
        explanation="Query 1 starts from a distinct category list to avoid product fan-out, then LEFT JOINs through the chain — categories with no matching sold products get NULLs throughout. COALESCE turns the NULL SUM into 0. The CASE uses SUM(line_total) directly — valid in SELECT after GROUP BY. Query 2 is a classic anti-join with an additional left-table filter: the joined_date filter goes in WHERE (it is a left-table condition — safe, does not affect NULL preservation), while the order_status filter goes in ON (right-table condition — must be in ON to preserve unordered customers). Query 3 is the standard 'count including zeros' pattern — COUNT(e.employee_id) not COUNT(*), so stores with no employees return 0. AVG(e.salary) correctly returns NULL for empty stores since AVG of NULL values = NULL."
      />

      <HR />

      {/* ── Key Takeaways ── */}
      <KeyTakeaways
        items={[
          'LEFT JOIN keeps every row from the left table. Right-side columns are NULL for rows with no match. The left table is never filtered — every row appears at least once in the result.',
          'Anti-join pattern: LEFT JOIN + WHERE right_table.pk IS NULL finds left rows with no match. This is the standard SQL idiom for "which X has no Y?" — customers with no orders, products never sold.',
          'The ON vs WHERE trap: a WHERE condition on a right-table column converts LEFT JOIN to INNER JOIN by filtering out NULL rows. Move right-table filters to the ON clause to preserve unmatched left rows.',
          'Left-table conditions in WHERE are always safe — they never affect NULL row preservation. Only right-table conditions in WHERE cause the trap.',
          'COUNT(right_table.pk) returns 0 for unmatched groups. COUNT(*) returns 1 — it counts the NULL row. Always use COUNT(column) not COUNT(*) when counting after a LEFT JOIN with GROUP BY.',
          'COALESCE wraps NULL aggregate results from LEFT JOIN: COALESCE(SUM(col), 0) and COALESCE(AVG(col), 0) replace NULL with zero for cleaner display.',
          'RIGHT JOIN is LEFT JOIN with tables swapped — always rewritable as LEFT JOIN with the anchor table on the left. Prefer LEFT JOIN for readability.',
          'NOT IN is dangerous when the subquery can return NULLs — it silently returns zero rows. Use LEFT JOIN + IS NULL or NOT EXISTS instead.',
          'Multiple LEFT JOINs chain independently — each preserves all rows from the preceding result. INNER JOIN and LEFT JOIN can be mixed in the same query.',
          'LEFT JOIN + IS NULL is the essential tool for data quality checks: orphaned records, missing references, incomplete pipeline outputs — all are found with this pattern.',
        ]}
      />

      {/* ── Next CTA ── */}
      <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 10, padding: '24px', marginTop: 40 }}>
        <p style={{ fontSize: 10, color: 'var(--muted)', letterSpacing: '.12em', textTransform: 'uppercase', fontFamily: 'var(--font-mono)', fontWeight: 700, margin: '0 0 10px' }}>What comes next</p>
        <p style={{ fontSize: 15, color: 'var(--text)', lineHeight: 1.85, margin: '0 0 20px' }}>
          In <strong>Module 33</strong>, you learn FULL OUTER JOIN — combining both LEFT and RIGHT behaviour to keep all rows from both tables, with real use cases for reconciliation, gap analysis, and symmetric difference queries.
        </p>
        <Link href="/learn/sql/full-outer-join" style={{ background: C, color: '#000', padding: '11px 24px', borderRadius: 7, fontWeight: 700, fontSize: 13, textDecoration: 'none', display: 'inline-block' }}>
          Module 33 → FULL OUTER JOIN
        </Link>
      </div>

    </LearnLayout>
  );
}