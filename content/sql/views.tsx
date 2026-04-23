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

const ViewCard = ({ type, color, stored, fresh, updatable, use }: {
  type: string; color: string; stored: string; fresh: string; updatable: string; use: string;
}) => (
  <div style={{ background: 'var(--surface)', border: `1px solid ${color}30`, borderRadius: 12, overflow: 'hidden', marginBottom: 14 }}>
    <div style={{ padding: '12px 16px', background: `${color}10`, borderBottom: `1px solid ${color}20` }}>
      <span style={{ fontFamily: 'var(--font-mono)', fontSize: 14, fontWeight: 700, color }}>{type}</span>
    </div>
    <div style={{ padding: '14px 16px', display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(170px, 1fr))', gap: 12 }}>
      {[['Data stored?', stored], ['Always fresh?', fresh], ['Updatable?', updatable], ['Best for', use]].map(([label, val]) => (
        <div key={label}>
          <p style={{ fontSize: 10, fontWeight: 700, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '.08em', margin: '0 0 4px' }}>{label}</p>
          <p style={{ fontSize: 12, color: 'var(--text)', margin: 0, lineHeight: 1.5 }}>{val}</p>
        </div>
      ))}
    </div>
  </div>
);

export default function Views() {
  return (
    <LearnLayout
      title="Views — Virtual Tables"
      description="Store a query as a named database object — create, replace, and drop views, build layered reporting abstractions, control access with views, and understand when materialized views beat regular ones"
      section="SQL — Module 46"
      readTime="32 min"
      updatedAt="April 2026"
    >

      {/* ── PART 01 ── */}
      <Part n="01" title="What a View Is" />

      <P>A view is a <Hl>named query stored in the database schema</Hl>. Once created, it can be queried exactly like a table — you write SELECT * FROM view_name and the database executes the underlying query transparently. No data is physically stored in the view itself (for regular views). The view is simply a saved query definition that the database substitutes at query time.</P>

      <P>Views solve three problems simultaneously: they eliminate repeated complex queries by giving them a stable name, they create a security boundary by exposing only the columns and rows a user should see, and they build an abstraction layer that shields downstream consumers from schema changes in base tables.</P>

      <CodeBlock
        label="View lifecycle — CREATE, USE, DROP"
        code={`-- Create a view
CREATE VIEW view_name AS
SELECT col1, col2, computed_col
FROM base_table
WHERE condition
JOIN other_table ON ...;

-- Query it exactly like a table
SELECT * FROM view_name;
SELECT col1 FROM view_name WHERE condition;
SELECT v.col1, t.col2 FROM view_name AS v JOIN other_table AS t ON ...;

-- Replace (update) a view definition
CREATE OR REPLACE VIEW view_name AS
SELECT ...;    -- new definition

-- Drop (delete) a view
DROP VIEW view_name;
DROP VIEW IF EXISTS view_name;     -- no error if view does not exist

-- List all views in the current schema (PostgreSQL)
SELECT table_name FROM information_schema.views
WHERE table_schema = 'public';`}
      />

      <HR />

      {/* ── PART 02 ── */}
      <Part n="02" title="The Three Types of Views" />

      <ViewCard
        type="Regular View (Standard View)"
        color={C}
        stored="No — query definition only"
        fresh="Yes — always executes fresh against base tables"
        updatable="Limited — simple views only"
        use="Simplifying complex joins, access control, abstraction layers"
      />
      <ViewCard
        type="Materialized View"
        color="#8b5cf6"
        stored="Yes — result physically stored on disk"
        fresh="No — stale until manually or automatically refreshed"
        updatable="No — read-only snapshot"
        use="Expensive aggregations queried frequently, dashboard caches, pre-computed metrics"
      />
      <ViewCard
        type="Updatable View"
        color="#10b981"
        stored="No — query definition only"
        fresh="Yes — always fresh"
        updatable="Yes — INSERT/UPDATE/DELETE pass through to base table"
        use="Simplified DML interface, row-level security enforcement"
      />

      <HR />

      {/* ── PART 03 ── */}
      <Part n="03" title="Creating Your First Views" />

      <H>A simple aggregation view</H>

      <CodeBlock
        label="Create a store revenue view"
        code={`-- Create the view once
CREATE VIEW vw_store_revenue AS
SELECT
  s.store_id,
  s.store_name,
  s.city,
  s.monthly_target,
  COUNT(o.order_id)                      AS order_count,
  ROUND(SUM(o.total_amount), 2)          AS total_revenue,
  ROUND(AVG(o.total_amount), 2)          AS avg_order_value,
  ROUND(SUM(o.total_amount)
    / s.monthly_target * 100, 1)         AS target_pct
FROM stores AS s
LEFT JOIN orders AS o
  ON s.store_id    = o.store_id
  AND o.order_status = 'Delivered'
GROUP BY s.store_id, s.store_name, s.city, s.monthly_target;

-- Now any query can use it as if it were a table:
SELECT * FROM vw_store_revenue ORDER BY total_revenue DESC;
SELECT city, total_revenue FROM vw_store_revenue WHERE target_pct >= 100;`}
      />

      <SQLPlayground
        initialQuery={`-- Simulate what the view would return (DuckDB playground doesn't persist DDL)
-- This is the view query run directly
SELECT
  s.store_id,
  s.store_name,
  s.city,
  s.monthly_target,
  COUNT(o.order_id)                       AS order_count,
  ROUND(SUM(o.total_amount), 2)           AS total_revenue,
  ROUND(AVG(o.total_amount), 2)           AS avg_order_value,
  ROUND(
    COALESCE(SUM(o.total_amount), 0)
    / s.monthly_target * 100
  , 1)                                    AS target_pct
FROM stores AS s
LEFT JOIN orders AS o
  ON s.store_id      = o.store_id
  AND o.order_status = 'Delivered'
GROUP BY s.store_id, s.store_name, s.city, s.monthly_target
ORDER BY total_revenue DESC NULLS LAST;`}
        height={255}
        showSchema={true}
      />

      <H>A customer summary view</H>

      <CodeBlock
        label="Create a customer summary view"
        code={`CREATE VIEW vw_customer_summary AS
SELECT
  c.customer_id,
  c.first_name || ' ' || c.last_name    AS full_name,
  c.email,
  c.city,
  c.loyalty_tier,
  c.joined_date,
  COUNT(o.order_id)                     AS order_count,
  COALESCE(ROUND(SUM(o.total_amount), 2), 0)  AS lifetime_value,
  MAX(o.order_date)                     AS last_order_date,
  CURRENT_DATE - MAX(o.order_date)      AS days_since_last_order
FROM customers AS c
LEFT JOIN orders AS o
  ON c.customer_id   = o.customer_id
  AND o.order_status = 'Delivered'
GROUP BY
  c.customer_id, c.first_name, c.last_name,
  c.email, c.city, c.loyalty_tier, c.joined_date;

-- Downstream queries are now simple:
SELECT * FROM vw_customer_summary WHERE loyalty_tier = 'Platinum';
SELECT * FROM vw_customer_summary WHERE days_since_last_order > 90;
SELECT city, COUNT(*), AVG(lifetime_value)
FROM vw_customer_summary GROUP BY city;`}
      />

      <SQLPlayground
        initialQuery={`-- vw_customer_summary equivalent query
SELECT
  c.customer_id,
  c.first_name || ' ' || c.last_name     AS full_name,
  c.email,
  c.city,
  c.loyalty_tier,
  c.joined_date,
  COUNT(o.order_id)                      AS order_count,
  COALESCE(ROUND(SUM(o.total_amount), 2), 0)   AS lifetime_value,
  MAX(o.order_date)                      AS last_order_date,
  CAST(julianday('now') - julianday(MAX(o.order_date)) AS INTEGER) AS days_since_last_order
FROM customers AS c
LEFT JOIN orders AS o
  ON c.customer_id   = o.customer_id
  AND o.order_status = 'Delivered'
GROUP BY
  c.customer_id, c.first_name, c.last_name,
  c.email, c.city, c.loyalty_tier, c.joined_date
ORDER BY lifetime_value DESC NULLS LAST
LIMIT 10;`}
        height={265}
        showSchema={false}
      />

      <HR />

      {/* ── PART 04 ── */}
      <Part n="04" title="Querying Views Like Tables" />

      <P>Once a view exists, every SQL construct works on it — WHERE, GROUP BY, ORDER BY, JOINs, subqueries, CTEs. The database executes the view's underlying query and treats the result as the input for any additional clauses you add.</P>

      <CodeBlock
        label="All standard SQL works on views"
        code={`-- Filter a view
SELECT * FROM vw_customer_summary
WHERE lifetime_value > 1000
  AND loyalty_tier = 'Gold';

-- Aggregate a view
SELECT city, COUNT(*) AS customer_count, AVG(lifetime_value) AS avg_ltv
FROM vw_customer_summary
GROUP BY city
ORDER BY avg_ltv DESC;

-- JOIN two views together
SELECT
  cs.full_name,
  cs.loyalty_tier,
  cs.lifetime_value,
  sr.total_revenue AS store_revenue
FROM vw_customer_summary AS cs
JOIN vw_store_revenue AS sr
  ON cs.city = sr.city    -- customers and their local store revenue
WHERE cs.lifetime_value > 500;

-- Use a view inside a CTE
WITH high_value AS (
  SELECT * FROM vw_customer_summary
  WHERE lifetime_value > 1000
)
SELECT loyalty_tier, COUNT(*) AS count, AVG(lifetime_value) AS avg_ltv
FROM high_value
GROUP BY loyalty_tier;

-- Use a view in a subquery
SELECT * FROM vw_customer_summary
WHERE lifetime_value > (
  SELECT AVG(lifetime_value) FROM vw_customer_summary
);`}
      />

      <SQLPlayground
        initialQuery={`-- Querying the customer summary view with filtering and aggregation
-- (view defined inline as a CTE for the playground)
WITH vw_customer_summary AS (
  SELECT
    c.customer_id,
    c.first_name || ' ' || c.last_name   AS full_name,
    c.city,
    c.loyalty_tier,
    c.joined_date,
    COUNT(o.order_id)                    AS order_count,
    COALESCE(ROUND(SUM(o.total_amount), 2), 0) AS lifetime_value,
    MAX(o.order_date)                    AS last_order_date
  FROM customers AS c
  LEFT JOIN orders AS o
    ON c.customer_id   = o.customer_id
    AND o.order_status = 'Delivered'
  GROUP BY c.customer_id, c.first_name, c.last_name,
           c.city, c.loyalty_tier, c.joined_date
)
-- Now query the view — just like a table
SELECT
  city,
  loyalty_tier,
  COUNT(*)                               AS customers,
  ROUND(AVG(lifetime_value), 2)          AS avg_ltv,
  MAX(lifetime_value)                    AS max_ltv
FROM vw_customer_summary
GROUP BY city, loyalty_tier
ORDER BY avg_ltv DESC;`}
        height={295}
        showSchema={true}
      />

      <HR />

      {/* ── PART 05 ── */}
      <Part n="05" title="Layered Views — Building Abstractions" />

      <P>Views can reference other views — creating layers of abstraction where each layer builds on the previous. The base layer joins raw tables. The mid layer computes metrics. The top layer provides the final business view. Changes to the base tables propagate automatically through all layers.</P>

      <CodeBlock
        label="Three-layer view architecture"
        code={`-- Layer 1: clean base data
CREATE VIEW vw_delivered_orders AS
SELECT *
FROM orders
WHERE order_status = 'Delivered'
  AND order_date >= '2024-01-01';

-- Layer 2: per-store metrics (references Layer 1)
CREATE VIEW vw_store_metrics AS
SELECT
  store_id,
  COUNT(*)                       AS order_count,
  ROUND(SUM(total_amount), 2)    AS revenue,
  ROUND(AVG(total_amount), 2)    AS avg_order
FROM vw_delivered_orders           -- references Layer 1 view
GROUP BY store_id;

-- Layer 3: full store report (references Layer 2 + base tables)
CREATE VIEW vw_store_report AS
SELECT
  s.store_name,
  s.city,
  s.monthly_target,
  m.order_count,
  m.revenue,
  m.avg_order,
  ROUND(m.revenue / s.monthly_target * 100, 1) AS target_pct
FROM stores AS s
JOIN vw_store_metrics AS m ON s.store_id = m.store_id;  -- Layer 2

-- Business query is now trivial:
SELECT * FROM vw_store_report WHERE target_pct >= 80 ORDER BY revenue DESC;`}
      />

      <SQLPlayground
        initialQuery={`-- Simulate the three-layer view architecture with CTEs
WITH
-- Layer 1: clean base
vw_delivered AS (
  SELECT * FROM orders
  WHERE order_status = 'Delivered'
),
-- Layer 2: store metrics (references Layer 1)
vw_store_metrics AS (
  SELECT
    store_id,
    COUNT(*)                       AS order_count,
    ROUND(SUM(total_amount), 2)    AS revenue,
    ROUND(AVG(total_amount), 2)    AS avg_order
  FROM vw_delivered
  GROUP BY store_id
),
-- Layer 3: full report (references Layer 2 + stores)
vw_store_report AS (
  SELECT
    s.store_id,
    s.store_name,
    s.city,
    s.monthly_target,
    m.order_count,
    m.revenue,
    m.avg_order,
    ROUND(m.revenue / s.monthly_target * 100, 1) AS target_pct
  FROM stores AS s
  JOIN vw_store_metrics AS m ON s.store_id = m.store_id
)
-- Final business query — trivially simple
SELECT *
FROM vw_store_report
WHERE target_pct IS NOT NULL
ORDER BY target_pct DESC;`}
        height={310}
        showSchema={true}
      />

      <ProTip>
        Limit view layering to 3 levels maximum. Deep view chains (5+ levels) become hard to debug and optimise — when a query is slow, you have to trace through multiple view definitions to understand what the database is actually computing. Flatten or materialise deep chains where performance matters.
      </ProTip>

      <HR />

      {/* ── PART 06 ── */}
      <Part n="06" title="Views for Security — Column and Row Masking" />

      <P>Views are the standard SQL mechanism for column-level and row-level security. Instead of granting access to a base table directly, grant SELECT on a view that exposes only the columns and rows a user should see. The underlying sensitive columns and filtered-out rows are completely invisible.</P>

      <H>Column masking — hide sensitive data</H>

      <CodeBlock
        label="Column-level security via views"
        code={`-- Base table: customers (has sensitive columns)
-- employee_id, first_name, last_name, email, phone, salary, national_id, ...

-- View for customer support team: no salary, no national_id
CREATE VIEW vw_customers_support AS
SELECT
  customer_id,
  first_name,
  last_name,
  -- Email partially masked for support staff
  LEFT(email, 3) || '***@' || SPLIT_PART(email, '@', 2) AS email_masked,
  city,
  loyalty_tier,
  joined_date
  -- salary, national_id, full email EXCLUDED
FROM customers;

-- Grant SELECT only on the view, not the base table:
GRANT SELECT ON vw_customers_support TO support_team_role;
REVOKE SELECT ON customers FROM support_team_role;

-- Support staff query the view — they never see sensitive columns
SELECT * FROM vw_customers_support WHERE customer_id = 42;`}
      />

      <H>Row-level security — filter which rows are visible</H>

      <CodeBlock
        label="Row-level security via views"
        code={`-- Each store manager should only see their own store's orders
-- In a multi-tenant or role-based system:

CREATE VIEW vw_my_store_orders AS
SELECT *
FROM orders
WHERE store_id = current_setting('app.current_store_id');
-- current_setting() reads a session variable set at login

-- Or for a specific store (simpler, single-tenant):
CREATE VIEW vw_bangalore_orders AS
SELECT o.*
FROM orders AS o
JOIN stores AS s ON o.store_id = s.store_id
WHERE s.city = 'Bangalore';

-- Staff in Bangalore only have access to this view:
-- SELECT * FROM vw_bangalore_orders
-- They cannot query orders for other cities`}
      />

      <SQLPlayground
        initialQuery={`-- Simulate a masked customer view (column security)
-- In production this would be a CREATE VIEW + GRANT pattern
SELECT
  customer_id,
  first_name,
  last_name,
  -- Mask email: show only first 3 chars before @ (SQLite: SUBSTR + INSTR)
  SUBSTR(email, 1, 3) || '***@' || SUBSTR(email, INSTR(email, '@') + 1) AS email_masked,
  -- Mask phone if present (show last 4 digits only)
  CASE
    WHEN phone IS NOT NULL
    THEN '****-****-' || SUBSTR(REPLACE(phone, ' ', ''), -4)
    ELSE NULL
  END                                                     AS phone_masked,
  city,
  loyalty_tier,
  joined_date
  -- Sensitive columns (full email, full phone) not included
FROM customers
ORDER BY customer_id
LIMIT 8;`}
        height={250}
        showSchema={true}
      />

      <HR />

      {/* ── PART 07 ── */}
      <Part n="07" title="Updating Views — CREATE OR REPLACE" />

      <P>View definitions change when business requirements change — a new column added to a base table should appear in the view, a filter condition needs updating, or a new JOIN is required. The safest way to update a view is <Hl>CREATE OR REPLACE VIEW</Hl> — it updates the definition atomically without dropping and recreating, preserving any permissions granted on the view.</P>

      <CodeBlock
        label="Updating a view definition"
        code={`-- Original view
CREATE VIEW vw_store_revenue AS
SELECT store_id, SUM(total_amount) AS revenue
FROM orders WHERE order_status = 'Delivered'
GROUP BY store_id;

-- Later: add order_count and avg_order to the view
CREATE OR REPLACE VIEW vw_store_revenue AS
SELECT
  store_id,
  COUNT(*)                      AS order_count,    -- NEW
  ROUND(SUM(total_amount), 2)   AS revenue,
  ROUND(AVG(total_amount), 2)   AS avg_order       -- NEW
FROM orders WHERE order_status = 'Delivered'
GROUP BY store_id;

-- CREATE OR REPLACE rules:
-- ✓ Can add new columns at the end
-- ✓ Can change column expressions
-- ✓ Can change WHERE conditions
-- ✗ Cannot remove or reorder existing columns (in PostgreSQL)
--   → DROP VIEW + CREATE VIEW required for structural changes

-- ALTER VIEW (rename only in most databases):
ALTER VIEW vw_store_revenue RENAME TO vw_delivered_store_revenue;`}
      />

      <H>Dropping views safely</H>

      <CodeBlock
        label="DROP VIEW with CASCADE"
        code={`-- Simple drop
DROP VIEW vw_store_revenue;

-- Safe drop (no error if view doesn't exist)
DROP VIEW IF EXISTS vw_store_revenue;

-- CASCADE: also drops views that depend on this view
-- (views that SELECT FROM this view)
DROP VIEW vw_store_revenue CASCADE;

-- Without CASCADE: dropping a view that other views depend on → ERROR
-- PostgreSQL: ERROR: cannot drop view vw_store_revenue
--             because other objects depend on it
-- Solution: DROP CASCADE or drop dependent views first

-- Check what depends on a view before dropping:
SELECT dependent_ns.nspname, dependent_view.relname
FROM pg_depend
JOIN pg_rewrite ON pg_depend.objid = pg_rewrite.oid
JOIN pg_class dependent_view ON pg_rewrite.ev_class = dependent_view.oid
JOIN pg_class source_table ON pg_depend.refobjid = source_table.oid
JOIN pg_namespace dependent_ns ON dependent_view.relnamespace = dependent_ns.oid
WHERE source_table.relname = 'vw_store_revenue';`}
      />

      <HR />

      {/* ── PART 08 ── */}
      <Part n="08" title="Materialized Views — Stored Snapshots" />

      <P>A regular view re-executes its query every time it is queried — always fresh, but always paying the computation cost. A <Hl>materialized view</Hl> stores the result physically on disk. Queries against it read the stored result — instant, regardless of how expensive the underlying computation is. The tradeoff: the data becomes stale the moment the base tables change, and must be explicitly refreshed.</P>

      <CodeBlock
        label="Materialized view — create, query, refresh"
        code={`-- Create materialized view (PostgreSQL syntax)
CREATE MATERIALIZED VIEW mvw_monthly_revenue AS
SELECT
  DATE_TRUNC('month', order_date)::DATE  AS month_start,
  store_id,
  COUNT(*)                               AS order_count,
  ROUND(SUM(total_amount), 2)            AS revenue
FROM orders
WHERE order_status = 'Delivered'
GROUP BY DATE_TRUNC('month', order_date), store_id
ORDER BY month_start, store_id;

-- Query it instantly — reads from stored result, not base tables
SELECT * FROM mvw_monthly_revenue WHERE store_id = 'ST001';

-- Refresh manually (re-executes the underlying query, updates stored result)
REFRESH MATERIALIZED VIEW mvw_monthly_revenue;

-- Refresh without blocking reads (PostgreSQL 9.4+)
-- Requires a UNIQUE index on the materialized view
REFRESH MATERIALIZED VIEW CONCURRENTLY mvw_monthly_revenue;

-- Add index on materialized view for fast queries
CREATE INDEX idx_mvw_monthly_revenue_store
  ON mvw_monthly_revenue(store_id);

-- Drop a materialized view
DROP MATERIALIZED VIEW IF EXISTS mvw_monthly_revenue;`}
      />

      <H>When to materialise vs when to use a regular view</H>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 10, margin: '20px 0 28px' }}>
        {[
          {
            q: 'The underlying query runs in under 1 second',
            answer: 'Regular view',
            color: C,
            why: 'No performance problem to solve — regular view always returns fresh data',
          },
          {
            q: 'The query joins 5 large tables and takes 30 seconds',
            answer: 'Materialized view',
            color: '#8b5cf6',
            why: 'Expensive computation queried frequently — materialise and refresh periodically',
          },
          {
            q: 'Dashboard queries run 1,000 times per day on the same aggregation',
            answer: 'Materialized view',
            color: '#8b5cf6',
            why: 'Compute once, serve 1,000 times — huge reduction in database load',
          },
          {
            q: 'Data must always reflect the most recent transaction',
            answer: 'Regular view',
            color: C,
            why: 'Materialized view would be stale — freshness requirement rules it out',
          },
          {
            q: 'Monthly historical reports where data does not change after month-end',
            answer: 'Materialized view',
            color: '#8b5cf6',
            why: 'Historical data is immutable — materialise once at month-end, never refresh',
          },
          {
            q: 'Access control — hide sensitive columns from a role',
            answer: 'Regular view',
            color: C,
            why: 'Security is about query filtering, not performance — regular view is correct',
          },
        ].map((item, i) => (
          <div key={i} style={{ display: 'flex', gap: 14, background: 'var(--surface)', border: `1px solid ${item.color}20`, borderRadius: 10, padding: '14px 16px' }}>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 13, color: 'var(--muted)', fontStyle: 'italic', marginBottom: 6 }}>"{item.q}"</div>
              <div style={{ fontSize: 13, color: 'var(--text)', lineHeight: 1.6 }}>{item.why}</div>
            </div>
            <div style={{ flexShrink: 0, display: 'flex', alignItems: 'flex-start', paddingTop: 2 }}>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, fontWeight: 700, color: item.color, background: `${item.color}15`, padding: '3px 8px', borderRadius: 4, whiteSpace: 'nowrap' }}>{item.answer}</span>
            </div>
          </div>
        ))}
      </div>

      <HR />

      {/* ── PART 09 ── */}
      <Part n="09" title="Updatable Views — DML Through a View" />

      <P>Simple views — those that select directly from one base table with no aggregation, DISTINCT, LIMIT, or complex expressions — are <Hl>updatable</Hl>. INSERT, UPDATE, and DELETE on the view pass through to the base table transparently. More complex views require INSTEAD OF triggers to handle DML.</P>

      <CodeBlock
        label="Updatable view rules and WITH CHECK OPTION"
        code={`-- A simple updatable view (one table, no aggregation)
CREATE VIEW vw_active_customers AS
SELECT customer_id, first_name, last_name, email, city, loyalty_tier
FROM customers
WHERE loyalty_tier != 'Bronze';   -- row filter

-- UPDATE through the view (updates the base table):
UPDATE vw_active_customers
SET city = 'Hyderabad'
WHERE customer_id = 5;
-- This executes: UPDATE customers SET city = 'Hyderabad' WHERE customer_id = 5

-- INSERT through the view (inserts into base table):
INSERT INTO vw_active_customers (first_name, last_name, email, city, loyalty_tier)
VALUES ('Ananya', 'Reddy', 'ananya@test.com', 'Pune', 'Gold');

-- PROBLEM: a user could INSERT a Bronze customer through the view
-- even though the view filters out Bronze customers
-- WITH CHECK OPTION prevents this:

CREATE OR REPLACE VIEW vw_active_customers AS
SELECT customer_id, first_name, last_name, email, city, loyalty_tier
FROM customers
WHERE loyalty_tier != 'Bronze'
WITH CHECK OPTION;   -- INSERT/UPDATE must satisfy the view's WHERE condition
-- Now: INSERT of a Bronze customer through this view → ERROR
-- "new row violates check option for view vw_active_customers"`}
      />

      <H>Conditions that make a view non-updatable</H>

      <div style={{ overflowX: 'auto', margin: '20px 0 28px' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
          <thead>
            <tr>
              {['View contains', 'Updatable?', 'Why'].map(h => (
                <th key={h} style={{ padding: '10px 14px', background: 'var(--surface)', color: 'var(--muted)', fontWeight: 700, textAlign: 'left', borderBottom: '1px solid var(--border)', fontSize: 11, textTransform: 'uppercase', letterSpacing: '.08em' }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {[
              ['Single base table, no aggregation', '✅ Yes', 'DML maps directly to the base table'],
              ['GROUP BY or aggregate functions', '❌ No', 'Cannot map DML to individual base rows'],
              ['DISTINCT', '❌ No', 'Deduplication prevents row-level DML mapping'],
              ['UNION / UNION ALL', '❌ No', 'Multiple sources — ambiguous which table to modify'],
              ['Subquery in SELECT list', '❌ No', 'Computed columns have no base column to update'],
              ['JOIN of multiple tables', '❌ No in most DBs', 'PostgreSQL allows DML on one side with INSTEAD OF triggers'],
              ['LIMIT / OFFSET', '❌ No', 'Cannot identify which base row to modify'],
              ['Window functions', '❌ No', 'Computed from multiple rows — no single base row'],
            ].map(([cond, updatable, why], i) => (
              <tr key={cond} style={{ background: i % 2 === 0 ? 'transparent' : 'var(--surface)' }}>
                <td style={{ padding: '10px 14px', fontSize: 13, color: 'var(--text)', borderBottom: '1px solid var(--border)', lineHeight: 1.5 }}>{cond}</td>
                <td style={{ padding: '10px 14px', fontSize: 12, color: updatable.startsWith('✅') ? '#00e676' : '#ff4757', borderBottom: '1px solid var(--border)', fontWeight: 700 }}>{updatable}</td>
                <td style={{ padding: '10px 14px', fontSize: 13, color: 'var(--muted)', borderBottom: '1px solid var(--border)', lineHeight: 1.5 }}>{why}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <HR />

      {/* ── PART 10 ── */}
      <Part n="10" title="Views vs CTEs vs Derived Tables — When to Use Each" />

      <P>Views, CTEs, and derived tables all create named intermediate result sets. Choosing between them depends on scope, reuse, and persistence requirements.</P>

      <div style={{ overflowX: 'auto', margin: '20px 0 32px' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
          <thead>
            <tr>
              {['', 'View', 'CTE (WITH)', 'Derived Table'].map(h => (
                <th key={h} style={{ padding: '10px 14px', background: 'var(--surface)', color: 'var(--muted)', fontWeight: 700, textAlign: 'left', borderBottom: '1px solid var(--border)', fontSize: 11, textTransform: 'uppercase', letterSpacing: '.08em' }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {[
              ['Scope', 'Database-wide — any query in any session', 'Current query only', 'Current query only, single use'],
              ['Persistence', 'Stored in schema permanently', 'Temporary — gone after query ends', 'Temporary — gone after query ends'],
              ['Reusable across sessions', '✅ Yes', '❌ No', '❌ No'],
              ['Reusable within one query', '✅ Yes', '✅ Yes', '❌ No (once inline)'],
              ['Can be indexed', 'Materialized views only', '❌ No', '❌ No'],
              ['Access control', '✅ GRANT/REVOKE on view', '❌ No', '❌ No'],
              ['Version-controlled', 'Via DDL migration scripts', 'Embedded in query', 'Embedded in query'],
              ['Best for', 'Shared reporting logic, access control, API contract', 'Complex multi-step single query', 'Short single-use pre-aggregation'],
            ].map(([criterion, view, cte, dt], i) => (
              <tr key={criterion} style={{ background: i % 2 === 0 ? 'transparent' : 'var(--surface)' }}>
                <td style={{ padding: '10px 14px', fontWeight: 600, color: 'var(--text)', borderBottom: '1px solid var(--border)', lineHeight: 1.5 }}>{criterion}</td>
                <td style={{ padding: '10px 14px', fontSize: 12, color: 'var(--text)', borderBottom: '1px solid var(--border)', lineHeight: 1.5 }}>{view}</td>
                <td style={{ padding: '10px 14px', fontSize: 12, color: 'var(--text)', borderBottom: '1px solid var(--border)', lineHeight: 1.5 }}>{cte}</td>
                <td style={{ padding: '10px 14px', fontSize: 12, color: 'var(--text)', borderBottom: '1px solid var(--border)', lineHeight: 1.5 }}>{dt}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <ProTip>
        The decision rule: if the same query logic is needed in more than one separate query or by more than one person or application — create a view. If the logic is needed only within a single complex query — use a CTE. If it is a short one-time pre-aggregation — use a derived table inline. Views are team assets; CTEs and derived tables are query-private tools.
      </ProTip>

      <HR />

      {/* ── PART 11 ── */}
      <Part n="11" title="What This Looks Like at Work" />

      <P>You are a senior data engineer at BigBasket. The analytics team runs 15 different reports — all of which need the same "delivered order with product details" JOIN across four tables. Currently every analyst copies and pastes the same 20-line JOIN query into their reports. When the schema changes (a new column, a renamed table), every one of those 15 reports breaks and needs updating manually.</P>

      <TimeBlock time="10:00 AM" label="The problem is identified">
        15 reports all share the same base JOIN. Any schema change breaks all 15. The fix: create a view that encapsulates the join logic. All 15 reports reference the view. Future schema changes update the view definition once and all reports are fixed.
      </TimeBlock>

      <TimeBlock time="10:20 AM" label="Design the view hierarchy">
        Layer 1: vw_delivered_order_lines — full order detail with product info. Layer 2: vw_product_performance — aggregated product metrics. Layer 3: vw_store_product_performance — per-store product breakdown.
      </TimeBlock>

      <SQLPlayground
        initialQuery={`-- Layer 1: the shared base JOIN (replaces the 20-line copy-paste)
-- In production: CREATE VIEW vw_delivered_order_lines AS ...
SELECT
  o.order_id,
  o.order_date,
  o.store_id,
  s.city                                          AS store_city,
  o.customer_id,
  c.first_name || ' ' || c.last_name             AS customer_name,
  c.loyalty_tier,
  oi.product_id,
  p.product_name,
  p.category,
  p.brand,
  p.unit_price,
  p.cost_price,
  oi.quantity,
  oi.line_total,
  ROUND((p.unit_price - p.cost_price) * oi.quantity, 2) AS gross_profit
FROM orders      AS o
JOIN order_items AS oi ON o.order_id    = oi.order_id
JOIN products    AS p  ON oi.product_id = p.product_id
JOIN stores      AS s  ON o.store_id    = s.store_id
JOIN customers   AS c  ON o.customer_id = c.customer_id
WHERE o.order_status = 'Delivered'
ORDER BY o.order_date DESC
LIMIT 12;`}
        height={300}
        showSchema={true}
      />

      <SQLPlayground
        initialQuery={`-- Layer 2: product performance view (builds on Layer 1)
-- In production: CREATE VIEW vw_product_performance AS
-- SELECT ... FROM vw_delivered_order_lines GROUP BY ...
WITH vw_delivered_order_lines AS (
  SELECT
    o.order_id, o.order_date, o.store_id,
    oi.product_id, p.product_name, p.category, p.brand,
    p.unit_price, p.cost_price,
    oi.quantity, oi.line_total,
    ROUND((p.unit_price - p.cost_price) * oi.quantity, 2) AS gross_profit
  FROM orders AS o
  JOIN order_items AS oi ON o.order_id    = oi.order_id
  JOIN products    AS p  ON oi.product_id = p.product_id
  WHERE o.order_status = 'Delivered'
)
SELECT
  product_id,
  product_name,
  category,
  brand,
  unit_price,
  cost_price,
  SUM(quantity)                               AS units_sold,
  ROUND(SUM(line_total), 2)                   AS revenue,
  ROUND(SUM(gross_profit), 2)                 AS total_gross_profit,
  ROUND(SUM(gross_profit) / NULLIF(SUM(line_total), 0) * 100, 1) AS margin_pct,
  COUNT(DISTINCT order_id)                    AS times_ordered
FROM vw_delivered_order_lines
GROUP BY product_id, product_name, category, brand, unit_price, cost_price
ORDER BY revenue DESC;`}
        height={310}
        showSchema={false}
      />

      <TimeBlock time="11:15 AM" label="Views created and deployed">
        The two views replace 15 copy-pasted JOIN queries. Every existing report is updated to reference vw_delivered_order_lines instead of the raw JOIN. The next schema change (adding a discount_amount column to order_items) requires updating only the view definition — all 15 reports benefit immediately without any individual changes.
      </TimeBlock>

      <ProTip>
        Version-control your view definitions just like application code. Store every CREATE OR REPLACE VIEW statement in a migrations file. When a view definition changes, the migration captures the before and after states. This makes it possible to roll back a view change if it breaks downstream reports, and gives you a full audit trail of how the view has evolved over time.
      </ProTip>

      <HR />

      {/* ── PART 12 — Interview Prep ── */}
      <Part n="12" title="Interview Prep — 5 Questions With Complete Answers" />

      <IQ q="What is a view in SQL and what are its main use cases?">
        <p style={{ margin: '0 0 14px' }}>A view is a named query stored in the database schema. When queried, the database executes the view's underlying query and presents the result as if it were a table. No data is physically stored in a regular view — it is purely a saved query definition. The view is transparent to the query engine: SELECT * FROM vw_store_revenue is exactly equivalent to embedding the view's full query inline.</p>
        <p style={{ margin: '0 0 14px' }}>Three primary use cases. First, abstraction and simplification: complex JOIN logic spanning multiple tables is defined once in a view and referenced by name in all downstream queries. When the schema changes, only the view definition needs updating — all queries that reference it automatically benefit. This is the most common production use of views in data engineering: a team of analysts queries clean, pre-joined views rather than raw base tables.</p>
        <p style={{ margin: 0 }}>Second, security: views enforce column-level and row-level access control. A view can expose only a subset of columns (hiding salary, national ID, or full email) and only a subset of rows (filtering to rows belonging to a specific region or store). Granting SELECT on the view and revoking SELECT on the base table means users can only access what the view exposes. Third, API stability: when an application queries a database, the view is the stable API contract. The underlying table structure can change — columns renamed, tables split — without breaking the application, as long as the view is updated to maintain the same output column names and types.</p>
      </IQ>

      <IQ q="What is the difference between a regular view and a materialized view?">
        <p style={{ margin: '0 0 14px' }}>A regular view stores only the query definition — no data is physically stored. Every time the view is queried, the database executes the underlying query against the current base table data and returns the result. The data is always current because it is computed on demand. The cost is that every query against the view pays the full computation cost of the underlying query.</p>
        <p style={{ margin: '0 0 14px' }}>A materialized view stores the result of the query physically on disk — it is a snapshot of the data at the time the view was last refreshed. Queries against a materialized view read the stored result, not the base tables — they are as fast as querying a regular indexed table. The cost is staleness: the stored result becomes out of date the moment the base tables change. Refresh must be triggered manually (REFRESH MATERIALIZED VIEW) or scheduled (via pg_cron or an external scheduler) to update the stored data.</p>
        <p style={{ margin: 0 }}>Choose regular view when data freshness is required — financial transactions, real-time inventory, live order status. Choose materialized view when the underlying query is expensive (multi-table aggregation, complex analytics) and is queried frequently, and when slightly stale data is acceptable. A monthly revenue report that is refreshed nightly is a perfect materialized view candidate — the computation runs once at midnight, and the next day's 10,000 dashboard queries each read the stored result in milliseconds instead of recomputing a 5-second aggregation.</p>
      </IQ>

      <IQ q="Can you INSERT, UPDATE, or DELETE through a view?">
        <p style={{ margin: '0 0 14px' }}>Yes, for simple views. A view is updatable when it meets these conditions: it selects from exactly one base table, it contains no GROUP BY or aggregate functions, no DISTINCT, no UNION, no LIMIT, no subqueries in the SELECT list, and no window functions. For updatable views, DML operations on the view are transparently passed through to the underlying base table — UPDATE vw_active_customers SET city = 'Mumbai' WHERE customer_id = 5 executes as UPDATE customers SET city = 'Mumbai' WHERE customer_id = 5.</p>
        <p style={{ margin: '0 0 14px' }}>WITH CHECK OPTION is an important addition to updatable views that have a WHERE filter. Without it, a user could INSERT a row through a view that does not satisfy the view's WHERE condition — the row would be inserted into the base table but immediately invisible through the view. WITH CHECK OPTION prevents this: any INSERT or UPDATE through the view must produce a row that satisfies the view's WHERE filter, or the operation fails with an error.</p>
        <p style={{ margin: 0 }}>For complex views (those with JOINs, aggregations, or other features that make automatic DML mapping impossible), PostgreSQL supports INSTEAD OF triggers — trigger functions that intercept DML on the view and execute custom logic to update the appropriate base tables. This allows any view to appear updatable, but requires explicit implementation of the DML logic. In practice, most views that need to be updatable are deliberately kept simple to avoid the complexity of INSTEAD OF triggers.</p>
      </IQ>

      <IQ q="How do views help with database security?">
        <p style={{ margin: '0 0 14px' }}>Views implement two types of access control. Column-level security: a view can SELECT only a subset of columns from the base table, omitting sensitive columns entirely. CREATE VIEW vw_customers_public AS SELECT customer_id, first_name, city FROM customers — no email, no phone, no date of birth. When the support team is granted SELECT on vw_customers_public and has their SELECT permission on the base customers table revoked, they can query customer data but never see sensitive fields. The base table's sensitive columns are completely invisible to them.</p>
        <p style={{ margin: '0 0 14px' }}>Row-level security: a view can include a WHERE clause that limits which rows are visible. CREATE VIEW vw_my_region_orders AS SELECT * FROM orders WHERE region = current_setting('app.user_region') — each session that sets their region variable sees only their region's orders. This is how multi-tenant applications implement data isolation in PostgreSQL before row-level security policies (RLS) were available, and it remains a simple, portable approach.</p>
        <p style={{ margin: 0 }}>The security model works by granting USAGE on the schema and SELECT on the view, while explicitly REVOKE-ing SELECT on the base tables. PostgreSQL also supports native Row Level Security (RLS) policies which are more flexible — they attach security rules directly to tables and enforce them automatically regardless of whether the user queries the table directly or through a view. For column masking, views remain the most portable approach across all SQL databases. For row filtering, both views and RLS policies are valid — RLS is preferred for complex multi-role scenarios because it cannot be bypassed by a direct table query as a view-only approach can be (if someone is accidentally granted direct table access).</p>
      </IQ>

      <IQ q="What happens to a view when its underlying base table changes?">
        <p style={{ margin: '0 0 14px' }}>The behaviour depends on the nature of the change. For additive changes (adding a new column to the base table), the view is unaffected — it continues to select its defined columns and the new column simply does not appear in the view unless the view definition is updated to include it. For destructive changes (removing or renaming a column that the view references), the view becomes invalid — querying it will fail with an error like "column does not exist" or "view definition is no longer valid."</p>
        <p style={{ margin: '0 0 14px' }}>PostgreSQL checks view validity lazily — the error appears when the view is queried, not when the underlying table is altered. Some databases (SQL Server, Oracle) track dependencies and can warn or prevent dropping a column that is referenced by a view. In PostgreSQL, you can check for stale views after a schema change by running SELECT definition FROM pg_views and parsing the definitions, or by attempting to query each view in a test environment.</p>
        <p style={{ margin: 0 }}>This is exactly why views are valuable as an API stability layer. If you change the base table (split one large table into two, rename a column, add a column that should be computed differently) you update the view definition to maintain the same output structure. Downstream consumers — applications, reports, other views — never know the schema changed. The view absorbs the change. The migration process is: make the base table change, update the view definition (CREATE OR REPLACE VIEW or DROP + CREATE), verify the view still returns the expected output, and the downstream systems are unaffected. Without a view layer, every query that references the renamed column would need to be updated individually.</p>
      </IQ>

      <HR />

      {/* ── Error Library ── */}
      <Part n="13" title="Errors You Will Hit — And Exactly Why They Happen" />

      <Err
        msg="ERROR: cannot drop view because other objects depend on it"
        cause="Another view (or trigger, or rule) references the view being dropped. PostgreSQL tracks dependencies between views and prevents dropping a view that would invalidate a dependent object. This happens when views are layered — dropping a base-layer view breaks views in higher layers."
        fix="Use DROP VIEW view_name CASCADE to automatically drop the dependent views as well. Before doing so, list what depends on the view: SELECT dependent_ns.nspname || '.' || dependent_view.relname FROM pg_depend JOIN pg_rewrite ON pg_depend.objid = pg_rewrite.oid JOIN pg_class dependent_view ON pg_rewrite.ev_class = dependent_view.oid JOIN pg_class source ON pg_depend.refobjid = source.oid WHERE source.relname = 'your_view_name'. If the dependent views should be preserved, update their definitions to not reference the view being dropped before dropping it."
      />

      <Err
        msg="ERROR: cannot update view — view contains aggregate functions"
        cause="DML (UPDATE, INSERT, DELETE) is attempted on a view that contains GROUP BY, aggregate functions (SUM, COUNT, AVG), DISTINCT, or UNION. These features make it impossible for the database to determine which base table rows correspond to the view rows being modified — there is no direct row-level mapping."
        fix="For read-only analytical views, this is expected and correct — they are not meant to be updatable. Remove the DML attempt. If the view genuinely needs to support DML, simplify the view to contain only a single base table with a WHERE filter — no aggregation, no JOINs. For complex views that must support DML, implement INSTEAD OF triggers in PostgreSQL which intercept the DML and execute custom logic to update the appropriate base table rows."
      />

      <Err
        msg="View returns stale data — changes to base table not reflected"
        cause="This is a materialized view, not a regular view. Materialized views store a physical snapshot that is not automatically updated when base tables change. A regular view always reflects current base table data; a materialized view reflects data as of the last REFRESH."
        fix="Run REFRESH MATERIALIZED VIEW view_name to update the stored snapshot. For production: schedule REFRESH on a cron job (pg_cron extension in PostgreSQL) at an appropriate frequency — hourly for dashboards, nightly for monthly reports. For REFRESH without blocking concurrent reads, first create a unique index on the materialized view and use REFRESH MATERIALIZED VIEW CONCURRENTLY view_name. If data must always be current, convert to a regular view (DROP MATERIALIZED VIEW, CREATE VIEW with the same definition) — the performance cost of re-executing the query on each access may be acceptable."
      />

      <Err
        msg="ERROR: column 'col_name' of view must be unique — cannot create or replace view"
        cause="The view's SELECT list contains two or more columns with the same name (either because two base tables both have a column called 'id', or because two computed expressions were not given aliases). Views require all output column names to be unique."
        fix="Add explicit AS aliases to disambiguate: SELECT a.id AS customer_id, b.id AS order_id FROM customers AS a JOIN orders AS b ON ... All columns that would produce duplicate names must be aliased. Also ensure computed expressions have aliases: SELECT COUNT(*) AS order_count rather than SELECT COUNT(*). Check for ambiguity when using SELECT * in views — if two joined tables share column names, SELECT * will produce duplicates. Explicitly list columns instead of using SELECT *."
      />

      <Err
        msg="View query is very slow — slower than running the underlying query directly"
        cause="The query planner is not optimally handling the view — either predicate pushdown is not working (filters on the view are not being pushed into the view's query), or the view nests multiple layers and the planner cannot see through all the abstraction. Also, a materialized view may not have the necessary indexes."
        fix="Use EXPLAIN ANALYZE on SELECT * FROM view_name WHERE condition to see the execution plan. If the filter is not pushed into the inner query, try rewriting as a CTE: WITH v AS NOT MATERIALIZED (view_definition) SELECT * FROM v WHERE condition — NOT MATERIALIZED forces the planner to inline the view definition and push predicates. For deeply nested view chains, consider flattening to a single view or a materialized view. For materialized views, add CREATE INDEX on the columns most commonly used in WHERE and JOIN conditions: CREATE INDEX idx_mv_col ON mv_name(column)."
      />

      <HR />

      {/* ── Try It ── */}
      <TryItChallenge
        question="Design three views for FreshMart's reporting layer. Write the CREATE VIEW statements AND the verification SELECT queries for each. (1) vw_product_catalogue — a clean product view showing product_id, product_name (Title Case), category, brand, unit_price, cost_price, margin_amount (unit_price - cost_price), margin_pct (rounded to 1dp), price_band ('Budget' <50, 'Standard' <150, 'Premium' <300, 'Luxury' otherwise), and in_stock. (2) vw_customer_segments — customer_id, full_name, city, loyalty_tier, lifetime_value (sum of delivered orders, 0 if none), order_count, last_order_date, and a segment: 'Champion' if lifetime_value > 1500, 'Loyal' if > 500, 'Promising' if order_count > 0, 'New/Inactive' otherwise. (3) vw_daily_sales — order_date, order_count, total_revenue, avg_order_value, unique_customers, and unique_products_sold — for delivered orders only. Then write one query that JOINs vw_product_catalogue to show the top 3 products by margin_pct in each price_band."
        hint="View 1: INITCAP(LOWER()) for title case, ROUND for margin_pct, CASE for price_band. View 2: LEFT JOIN customers to aggregated orders, CASE on lifetime_value and order_count. View 3: GROUP BY order_date. JOIN query: use RANK() OVER (PARTITION BY price_band ORDER BY margin_pct DESC)."
        answer={`-- View 1: Clean product catalogue
CREATE VIEW vw_product_catalogue AS
SELECT
  product_id,
  product_name,
  category,
  brand,
  unit_price,
  cost_price,
  ROUND(unit_price - cost_price, 2)                 AS margin_amount,
  ROUND((unit_price - cost_price)
    / NULLIF(unit_price, 0) * 100, 1)               AS margin_pct,
  CASE
    WHEN unit_price < 50  THEN 'Budget'
    WHEN unit_price < 150 THEN 'Standard'
    WHEN unit_price < 300 THEN 'Premium'
    ELSE                       'Luxury'
  END                                               AS price_band,
  in_stock
FROM products;

-- Verify View 1:
-- SELECT * FROM vw_product_catalogue ORDER BY margin_pct DESC LIMIT 5;

-- View 2: Customer segments
CREATE VIEW vw_customer_segments AS
SELECT
  c.customer_id,
  c.first_name || ' ' || c.last_name               AS full_name,
  c.city,
  c.loyalty_tier,
  COALESCE(ROUND(SUM(o.total_amount), 2), 0)       AS lifetime_value,
  COUNT(o.order_id)                                AS order_count,
  MAX(o.order_date)                                AS last_order_date,
  CASE
    WHEN COALESCE(SUM(o.total_amount), 0) > 1500   THEN 'Champion'
    WHEN COALESCE(SUM(o.total_amount), 0) > 500    THEN 'Loyal'
    WHEN COUNT(o.order_id) > 0                     THEN 'Promising'
    ELSE                                                 'New/Inactive'
  END                                              AS segment
FROM customers AS c
LEFT JOIN orders AS o
  ON c.customer_id   = o.customer_id
  AND o.order_status = 'Delivered'
GROUP BY c.customer_id, c.first_name, c.last_name,
         c.city, c.loyalty_tier;

-- Verify View 2:
-- SELECT segment, COUNT(*), ROUND(AVG(lifetime_value),2) AS avg_ltv
-- FROM vw_customer_segments GROUP BY segment ORDER BY avg_ltv DESC;

-- View 3: Daily sales
CREATE VIEW vw_daily_sales AS
SELECT
  o.order_date,
  COUNT(DISTINCT o.order_id)                       AS order_count,
  ROUND(SUM(o.total_amount), 2)                    AS total_revenue,
  ROUND(AVG(o.total_amount), 2)                    AS avg_order_value,
  COUNT(DISTINCT o.customer_id)                    AS unique_customers,
  COUNT(DISTINCT oi.product_id)                    AS unique_products_sold
FROM orders      AS o
JOIN order_items AS oi ON o.order_id = oi.order_id
WHERE o.order_status = 'Delivered'
GROUP BY o.order_date;

-- Verify View 3:
-- SELECT * FROM vw_daily_sales ORDER BY order_date;

-- ── JOIN QUERY: top 3 products by margin_pct per price_band ──
-- (uses vw_product_catalogue inline as CTE for playground)
WITH vw_product_catalogue AS (
  SELECT
    product_id,
    product_name,
    category, brand, unit_price, cost_price,
    ROUND(unit_price - cost_price, 2)               AS margin_amount,
    ROUND((unit_price - cost_price)
      / NULLIF(unit_price, 0) * 100, 1)             AS margin_pct,
    CASE
      WHEN unit_price < 50  THEN 'Budget'
      WHEN unit_price < 150 THEN 'Standard'
      WHEN unit_price < 300 THEN 'Premium'
      ELSE                       'Luxury'
    END                                             AS price_band,
    in_stock
  FROM products
)
SELECT price_band, product_name, category, margin_pct, unit_price
FROM (
  SELECT
    price_band, product_name, category, margin_pct, unit_price,
    RANK() OVER (PARTITION BY price_band ORDER BY margin_pct DESC) AS rnk
  FROM vw_product_catalogue
  WHERE in_stock = 1
) AS ranked
WHERE rnk <= 3
ORDER BY price_band, rnk;`}
        explanation="View 1 encapsulates all product display logic — INITCAP(LOWER(TRIM())) for consistent name formatting, NULLIF on unit_price for the margin percentage division, and a CASE for the price_band classification. Any query needing product data queries this view rather than the base table. View 2 uses LEFT JOIN to preserve customers with no delivered orders (segment = 'New/Inactive'). COALESCE(SUM(), 0) handles the NULL that LEFT JOIN produces for unmatched customers. The CASE evaluates lifetime_value (the aggregate) in precedence order — Champions first so a high-value customer is not labelled 'Promising'. View 3 aggregates to order_date using COUNT(DISTINCT) to avoid fan-out — orders has one row per order but join to order_items produces multiple rows per order, so COUNT(DISTINCT o.order_id) correctly counts orders. The top-3 query wraps vw_product_catalogue in a window function — RANK() OVER (PARTITION BY price_band ORDER BY margin_pct DESC) — and filters WHERE rnk <= 3. Window functions cannot be used in WHERE directly so the derived table wrapper is required."
      />

      <HR />

      {/* ── Key Takeaways ── */}
      <KeyTakeaways
        items={[
          'A view is a named query stored in the database schema. Querying it executes the underlying query transparently — no data is stored in a regular view, only the query definition.',
          'Three types: regular view (always fresh, no data stored), materialized view (data stored on disk, must be refreshed, fast to query), updatable view (simple views that allow INSERT/UPDATE/DELETE through to the base table).',
          'Views eliminate repeated complex JOIN logic. Define the join once in a view; every report queries the view by name. Schema changes update the view definition once — all downstream queries benefit.',
          'Views enforce access control. Grant SELECT on the view, revoke SELECT on the base table. Column-level security: omit sensitive columns. Row-level security: add a WHERE clause to filter rows.',
          'CREATE OR REPLACE VIEW updates a view definition atomically without dropping it — preserves all granted permissions. Cannot remove or reorder existing columns without DROP + CREATE.',
          'DROP VIEW CASCADE removes the view and all dependent views. Without CASCADE, dropping a view referenced by other views raises an error.',
          'Materialized views store query results physically. Use them when the underlying query is expensive and queried frequently and slightly stale data is acceptable. REFRESH MATERIALIZED VIEW updates the stored result.',
          'WITH CHECK OPTION on an updatable view prevents INSERT or UPDATE from creating rows that would not be visible through the view\'s WHERE filter.',
          'Views vs CTEs vs derived tables: views are database-wide and persistent — team assets. CTEs are query-scoped — single-query tools. If logic is shared across queries or sessions, create a view.',
          'Version-control view definitions in migration scripts alongside table DDL. A view is part of the schema contract — treat changes to view definitions with the same rigour as table alterations.',
        ]}
      />

      {/* ── Next CTA ── */}
      <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 10, padding: '24px', marginTop: 40 }}>
        <p style={{ fontSize: 10, color: 'var(--muted)', letterSpacing: '.12em', textTransform: 'uppercase', fontFamily: 'var(--font-mono)', fontWeight: 700, margin: '0 0 10px' }}>What comes next</p>
        <p style={{ fontSize: 15, color: 'var(--text)', lineHeight: 1.85, margin: '0 0 20px' }}>
          In <strong>Module 47</strong>, you learn Indexes — how the database finds rows without scanning every row, when to create them, which type to choose, and how to diagnose slow queries with EXPLAIN ANALYZE.
        </p>
        <Link href="/learn/sql/indexes" style={{ background: C, color: '#000', padding: '11px 24px', borderRadius: 7, fontWeight: 700, fontSize: 13, textDecoration: 'none', display: 'inline-block' }}>
          Module 47 → Indexes
        </Link>
      </div>

    </LearnLayout>
  );
}