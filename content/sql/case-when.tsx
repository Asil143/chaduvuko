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

export default function CaseWhen() {
  return (
    <LearnLayout
      title="CASE WHEN — Conditional Logic"
      description="SQL's if-else statement — build custom categories, conditional columns, pivot tables, and handle complex branching logic directly inside any query"
      section="SQL — Module 16"
      readTime="12–16 min"
      updatedAt="April 2026"
    >

      {/* ── PART 01 ── */}
      <Part n="01" title="Why SQL Needs Conditional Logic" />

      <P>Every real business question involves conditional branching. A product is "High Margin" if its margin is above 40%, "Medium" if it is 25–40%, and "Low" otherwise. An order is "Fast" if delivered within 2 days, "Standard" if 3–5 days, "Slow" if more than 5 days. An employee is in the "Senior" band if their salary is above ₹60,000, otherwise "Junior."</P>

      <P>None of these categories exist as columns in the database. They are <Hl>derived</Hl> from existing values using conditional logic. In every programming language this is an if-else statement. In SQL, it is the <Hl>CASE WHEN</Hl> expression.</P>

      <P>CASE WHEN is one of the most powerful and frequently used constructs in SQL. It appears in SELECT for computed columns, in WHERE for complex filters, in ORDER BY for custom sort orders, and inside aggregate functions for conditional counting and summing. Mastering it unlocks an entire class of analytical queries that are impossible without it.</P>

      <HR />

      {/* ── PART 02 ── */}
      <Part n="02" title="CASE WHEN Syntax — The Two Forms" />

      <P>CASE WHEN has two forms. The <Hl>searched CASE</Hl> evaluates a condition for each WHEN — the most flexible and most commonly used form. The <Hl>simple CASE</Hl> compares one expression against multiple values — a cleaner shorthand when comparing a single column.</P>

      <H>Searched CASE — full conditional expressions</H>

      <CodeBlock
        label="Searched CASE syntax"
        code={`CASE
  WHEN condition1 THEN result1
  WHEN condition2 THEN result2
  WHEN condition3 THEN result3
  ELSE default_result      -- optional: what to return if no WHEN matches
END

-- Real example:
CASE
  WHEN unit_price - cost_price > unit_price * 0.40 THEN 'High Margin'
  WHEN unit_price - cost_price > unit_price * 0.25 THEN 'Medium Margin'
  ELSE 'Low Margin'
END  AS margin_band`}
      />

      <H>Simple CASE — comparing one value to many</H>

      <CodeBlock
        label="Simple CASE syntax"
        code={`CASE expression
  WHEN value1 THEN result1
  WHEN value2 THEN result2
  WHEN value3 THEN result3
  ELSE default_result
END

-- Real example:
CASE payment_method
  WHEN 'UPI'        THEN 'Digital Wallet'
  WHEN 'Card'       THEN 'Card Payment'
  WHEN 'NetBanking' THEN 'Bank Transfer'
  WHEN 'COD'        THEN 'Cash on Delivery'
  ELSE 'Unknown'
END  AS payment_category`}
      />

      <P>The simple CASE is syntactic sugar for the searched CASE — CASE payment_method WHEN 'UPI' THEN ... is identical to CASE WHEN payment_method = 'UPI' THEN .... Use whichever reads more clearly for the specific situation. The searched CASE handles everything the simple CASE can, plus complex conditions that go beyond simple equality.</P>

      <HR />

      {/* ── PART 03 ── */}
      <Part n="03" title="CASE WHEN in SELECT — Building Computed Categories" />

      <P>The most common use of CASE WHEN is inside SELECT to create a new computed column whose value depends on conditions evaluated for each row.</P>

      <H>Loyalty tier display label</H>

      <SQLPlayground
        initialQuery={`-- Simple CASE: map loyalty_tier codes to display labels
SELECT
  first_name || ' ' || last_name   AS customer,
  city,
  loyalty_tier,
  CASE loyalty_tier
    WHEN 'Platinum' THEN '⭐ Platinum Member'
    WHEN 'Gold'     THEN '🥇 Gold Member'
    WHEN 'Silver'   THEN '🥈 Silver Member'
    WHEN 'Bronze'   THEN '🥉 Bronze Member'
    ELSE 'Standard'
  END                               AS display_label
FROM customers
ORDER BY loyalty_tier;`}
        height={190}
        showSchema={true}
      />

      <H>Product margin banding</H>

      <SQLPlayground
        initialQuery={`-- Searched CASE: categorise products by profit margin
SELECT
  product_name,
  brand,
  unit_price,
  cost_price,
  ROUND((unit_price - cost_price) / unit_price * 100, 1)   AS margin_pct,
  CASE
    WHEN (unit_price - cost_price) / unit_price >= 0.40 THEN 'High'
    WHEN (unit_price - cost_price) / unit_price >= 0.25 THEN 'Medium'
    WHEN (unit_price - cost_price) / unit_price >= 0.10 THEN 'Low'
    ELSE 'Very Low'
  END                                                       AS margin_band
FROM products
ORDER BY margin_pct DESC;`}
        height={200}
        showSchema={false}
      />

      <H>Delivery speed classification</H>

      <SQLPlayground
        initialQuery={`-- Classify delivered orders by how fast delivery was
SELECT
  order_id,
  order_date,
  delivery_date,
  delivery_date - order_date                   AS days_taken,
  CASE
    WHEN delivery_date IS NULL               THEN 'Pending'
    WHEN delivery_date - order_date <= 1     THEN 'Same/Next Day'
    WHEN delivery_date - order_date <= 3     THEN 'Express'
    WHEN delivery_date - order_date <= 7     THEN 'Standard'
    ELSE                                          'Delayed'
  END                                         AS delivery_speed
FROM orders
ORDER BY days_taken NULLS LAST;`}
        height={195}
        showSchema={false}
      />

      <H>Order value tier</H>

      <SQLPlayground
        initialQuery={`-- Classify orders by total amount into business tiers
SELECT
  order_id,
  store_id,
  order_date,
  total_amount,
  CASE
    WHEN total_amount >= 2000 THEN 'Premium'
    WHEN total_amount >= 800  THEN 'Standard'
    WHEN total_amount >= 300  THEN 'Basic'
    ELSE                           'Micro'
  END                         AS order_tier
FROM orders
ORDER BY total_amount DESC;`}
        height={185}
        showSchema={false}
      />

      <HR />

      {/* ── PART 04 ── */}
      <Part n="04" title="How CASE WHEN Evaluates — Short-Circuit Logic" />

      <P>CASE WHEN evaluates conditions <Hl>top to bottom</Hl> and returns the result for the <Hl>first WHEN condition that is TRUE</Hl>. Once a match is found, the remaining WHEN clauses are not evaluated — this is called <Hl>short-circuit evaluation</Hl>.</P>

      <P>This behaviour is critical to understand for writing correct CASE expressions. Consider the margin bands query above. If a product has a 45% margin, it satisfies ALL three conditions:</P>

      <CodeBlock
        label="Short-circuit evaluation — first match wins"
        code={`-- margin = 45%

WHEN margin >= 0.40 THEN 'High'    -- TRUE: 0.45 >= 0.40 → returns 'High', stops here
WHEN margin >= 0.25 THEN 'Medium'  -- never evaluated
WHEN margin >= 0.10 THEN 'Low'     -- never evaluated
ELSE 'Very Low'                    -- never evaluated

-- Result: 'High' ✓

-- If the conditions were reversed (wrong order):
WHEN margin >= 0.10 THEN 'Low'    -- TRUE for 45% too! Returns 'Low' (wrong)
WHEN margin >= 0.25 THEN 'Medium' -- never reached
WHEN margin >= 0.40 THEN 'High'   -- never reached`}
      />

      <P><Hl>Always order WHEN conditions from most specific to least specific</Hl> — from the most restrictive condition to the most permissive. For range bands, order from highest threshold to lowest. For categories with overlap, put the more specific condition first.</P>

      <H>ELSE — the default catch-all</H>
      <P>The ELSE clause is optional. If a row matches no WHEN condition and there is no ELSE, the CASE expression returns NULL. This is a common silent bug — add an explicit ELSE to handle any unexpected values rather than letting them silently become NULL.</P>

      <SQLPlayground
        initialQuery={`-- Without ELSE: any unmatched row returns NULL
-- If a new payment_method is added to the data, it returns NULL silently
SELECT
  order_id,
  payment_method,
  CASE payment_method
    WHEN 'UPI'  THEN 'Digital'
    WHEN 'Card' THEN 'Digital'
    -- No ELSE: 'COD' and 'NetBanking' return NULL
  END   AS payment_type
FROM orders
ORDER BY payment_type NULLS LAST;`}
        height={160}
        showSchema={false}
      />

      <SQLPlayground
        initialQuery={`-- With ELSE: all values are handled explicitly
SELECT
  order_id,
  payment_method,
  CASE payment_method
    WHEN 'UPI'        THEN 'Digital'
    WHEN 'Card'       THEN 'Digital'
    WHEN 'NetBanking' THEN 'Digital'
    ELSE                   'Non-Digital'   -- catches COD and anything else
  END   AS payment_type
FROM orders
ORDER BY payment_type;`}
        height={165}
        showSchema={false}
      />

      <Callout type="tip">
        Always include ELSE in CASE expressions. If you genuinely expect no other values, use ELSE 'Unknown' or ELSE 'Other' — this makes unexpected values visible in your output rather than silently NULL. Debugging a report where some rows are mysteriously NULL is much harder than debugging one that shows 'Unknown' for unexpected values.
      </Callout>

      <HR />

      {/* ── PART 05 ── */}
      <Part n="05" title="CASE WHEN in WHERE — Complex Conditional Filtering" />

      <P>CASE WHEN can appear in WHERE clauses to express filtering logic that would be extremely complex with AND/OR alone.</P>

      <SQLPlayground
        initialQuery={`-- Different rules for different customer tiers:
-- Platinum: any amount qualifies
-- Gold: must be above ₹500
-- Silver/Bronze: must be above ₹1000
SELECT
  c.first_name || ' ' || c.last_name  AS customer,
  c.loyalty_tier,
  o.total_amount,
  o.order_status
FROM customers AS c
JOIN orders AS o ON c.customer_id = o.customer_id
WHERE CASE c.loyalty_tier
    WHEN 'Platinum' THEN TRUE
    WHEN 'Gold'     THEN o.total_amount > 500
    ELSE                 o.total_amount > 1000
  END
ORDER BY c.loyalty_tier, o.total_amount DESC;`}
        height={210}
        showSchema={true}
      />

      <SQLPlayground
        initialQuery={`-- Find products that need attention:
-- Out of stock AND high margin = urgent restock
-- In stock AND very low margin = pricing review
SELECT
  product_name,
  brand,
  unit_price,
  in_stock,
  ROUND((unit_price - cost_price) / unit_price * 100, 1)  AS margin_pct
FROM products
WHERE CASE
    WHEN in_stock = false
     AND (unit_price - cost_price) / unit_price > 0.30 THEN TRUE
    WHEN in_stock = true
     AND (unit_price - cost_price) / unit_price < 0.10 THEN TRUE
    ELSE FALSE
  END
ORDER BY in_stock, margin_pct;`}
        height={210}
        showSchema={false}
      />

      <HR />

      {/* ── PART 06 ── */}
      <Part n="06" title="CASE WHEN in ORDER BY — Custom Sort Orders" />

      <P>CASE WHEN in ORDER BY lets you sort by a custom priority order rather than alphabetical or numeric order. This is essential when a business has a specific priority ranking that does not match any natural sort order.</P>

      <SQLPlayground
        initialQuery={`-- Sort order_status by business priority:
-- Processing first (needs action), then Delivered, Returned, Cancelled last
SELECT
  order_id,
  order_date,
  order_status,
  total_amount
FROM orders
ORDER BY
  CASE order_status
    WHEN 'Processing' THEN 1
    WHEN 'Returned'   THEN 2
    WHEN 'Delivered'  THEN 3
    WHEN 'Cancelled'  THEN 4
    ELSE                   5
  END,
  order_date DESC;`}
        height={195}
        showSchema={true}
      />

      <SQLPlayground
        initialQuery={`-- Sort loyalty tiers from highest to lowest
-- Platinum → Gold → Silver → Bronze (not alphabetical)
SELECT
  first_name || ' ' || last_name  AS customer,
  city,
  loyalty_tier,
  joined_date
FROM customers
ORDER BY
  CASE loyalty_tier
    WHEN 'Platinum' THEN 1
    WHEN 'Gold'     THEN 2
    WHEN 'Silver'   THEN 3
    WHEN 'Bronze'   THEN 4
    ELSE                 5
  END,
  joined_date ASC;`}
        height={195}
        showSchema={false}
      />

      <HR />

      {/* ── PART 07 ── */}
      <Part n="07" title="CASE WHEN Inside Aggregate Functions — Conditional Aggregation" />

      <P>This is one of the most powerful SQL patterns — using CASE WHEN inside SUM, COUNT, or AVG to compute <Hl>conditional aggregates</Hl>. Instead of running multiple queries to count different subsets of data, you count all subsets in a single pass through the table.</P>

      <H>Conditional COUNT — count rows matching different conditions</H>

      <SQLPlayground
        initialQuery={`-- Count orders by status in a single query
-- Each CASE returns 1 when condition is true, else 0
-- SUM of 1s and 0s = count of matching rows
SELECT
  COUNT(*)                                                        AS total_orders,
  SUM(CASE WHEN order_status = 'Delivered'   THEN 1 ELSE 0 END)  AS delivered,
  SUM(CASE WHEN order_status = 'Processing'  THEN 1 ELSE 0 END)  AS processing,
  SUM(CASE WHEN order_status = 'Cancelled'   THEN 1 ELSE 0 END)  AS cancelled,
  SUM(CASE WHEN order_status = 'Returned'    THEN 1 ELSE 0 END)  AS returned
FROM orders;`}
        height={175}
        showSchema={true}
      />

      <SQLPlayground
        initialQuery={`-- Count customers by loyalty tier — all in one row
SELECT
  COUNT(*)                                                            AS total_customers,
  SUM(CASE WHEN loyalty_tier = 'Platinum' THEN 1 ELSE 0 END)        AS platinum_count,
  SUM(CASE WHEN loyalty_tier = 'Gold'     THEN 1 ELSE 0 END)        AS gold_count,
  SUM(CASE WHEN loyalty_tier = 'Silver'   THEN 1 ELSE 0 END)        AS silver_count,
  SUM(CASE WHEN loyalty_tier = 'Bronze'   THEN 1 ELSE 0 END)        AS bronze_count
FROM customers;`}
        height={165}
        showSchema={false}
      />

      <H>Conditional SUM — sum values only for matching rows</H>

      <SQLPlayground
        initialQuery={`-- Revenue split by payment method in one query
SELECT
  store_id,
  SUM(total_amount)                                                  AS total_revenue,
  SUM(CASE WHEN payment_method = 'UPI'        THEN total_amount ELSE 0 END) AS upi_revenue,
  SUM(CASE WHEN payment_method = 'Card'       THEN total_amount ELSE 0 END) AS card_revenue,
  SUM(CASE WHEN payment_method = 'COD'        THEN total_amount ELSE 0 END) AS cod_revenue,
  SUM(CASE WHEN payment_method = 'NetBanking' THEN total_amount ELSE 0 END) AS netbanking_revenue
FROM orders
WHERE order_status = 'Delivered'
GROUP BY store_id
ORDER BY total_revenue DESC;`}
        height={210}
        showSchema={false}
      />

      <H>Pivot tables with CASE WHEN</H>
      <P>Conditional aggregation is the SQL technique for creating <Hl>pivot tables</Hl> — transforming row values into columns. This is used constantly in reporting.</P>

      <SQLPlayground
        initialQuery={`-- Monthly order count pivoted into columns by status
-- Rows are months, columns are order statuses
SELECT
  CAST(strftime('%m', order_date) AS INTEGER)                         AS month,
  COUNT(*)                                                            AS total,
  SUM(CASE WHEN order_status = 'Delivered'  THEN 1 ELSE 0 END)       AS delivered,
  SUM(CASE WHEN order_status = 'Processing' THEN 1 ELSE 0 END)       AS processing,
  SUM(CASE WHEN order_status = 'Cancelled'  THEN 1 ELSE 0 END)       AS cancelled,
  SUM(CASE WHEN order_status = 'Returned'   THEN 1 ELSE 0 END)       AS returned
FROM orders
GROUP BY CAST(strftime('%m', order_date) AS INTEGER)
ORDER BY month;`}
        height={205}
        showSchema={false}
      />

      <ProTip>
        Conditional aggregation — SUM(CASE WHEN condition THEN value ELSE 0 END) — is one of the highest-leverage SQL patterns in analytics. It replaces multiple queries with a single pass through the table, dramatically improving performance. Any time you are running the same query multiple times with different WHERE conditions and then combining the results in Excel, this pattern replaces all of that with one query.
      </ProTip>

      <HR />

      {/* ── PART 08 ── */}
      <Part n="08" title="CASE WHEN and NULL — Careful Handling" />

      <P>CASE WHEN interacts with NULL in two important ways: when testing for NULL inside WHEN conditions, and when the CASE expression itself returns NULL.</P>

      <H>Testing for NULL inside CASE</H>
      <P>Use IS NULL and IS NOT NULL inside WHEN conditions — never = NULL. The same rule from Module 11 applies inside CASE.</P>

      <SQLPlayground
        initialQuery={`-- Correct NULL handling inside CASE
SELECT
  order_id,
  order_date,
  delivery_date,
  CASE
    WHEN delivery_date IS NULL THEN 'Not Yet Delivered'
    WHEN delivery_date - order_date <= 2 THEN 'Fast Delivery'
    ELSE 'Standard Delivery'
  END  AS delivery_label
FROM orders
ORDER BY delivery_date NULLS LAST;`}
        height={175}
        showSchema={false}
      />

      <H>CASE returning NULL when no WHEN matches and no ELSE</H>

      <SQLPlayground
        initialQuery={`-- When no WHEN matches and there is no ELSE: result is NULL
-- New payment methods added to the data would silently return NULL
SELECT
  order_id,
  payment_method,
  CASE payment_method
    WHEN 'UPI'  THEN 'Digital — Instant'
    WHEN 'Card' THEN 'Digital — T+1'
    -- No ELSE: COD and NetBanking return NULL
  END   AS settlement_type
FROM orders
ORDER BY settlement_type NULLS LAST;`}
        height={170}
        showSchema={false}
      />

      <H>Using COALESCE with CASE</H>
      <P>When a CASE might return NULL and you want a default value, wrap the entire CASE in COALESCE:</P>

      <CodeBlock
        label="COALESCE wrapping CASE for safe NULL handling"
        code={`-- Instead of relying on ELSE, use COALESCE as a safety net
COALESCE(
  CASE payment_method
    WHEN 'UPI'  THEN 'Digital — Instant'
    WHEN 'Card' THEN 'Digital — T+1'
  END,
  'Other'     -- COALESCE replaces NULL with 'Other'
) AS settlement_type

-- Equivalent to having ELSE 'Other' in the CASE
-- Useful when you cannot modify the CASE but need a null-safe wrapper`}
      />

      <HR />

      {/* ── PART 09 ── */}
      <Part n="09" title="Nested CASE WHEN — Multi-Dimensional Logic" />

      <P>CASE WHEN expressions can be nested — a THEN result can itself be another CASE expression. Use this sparingly — deeply nested CASE expressions become hard to read — but for two-dimensional logic it is sometimes the clearest approach.</P>

      <SQLPlayground
        initialQuery={`-- Two-dimensional classification:
-- First: is the product in stock?
-- Second: what is the margin band?
SELECT
  product_name,
  brand,
  in_stock,
  ROUND((unit_price - cost_price) / unit_price * 100, 1)   AS margin_pct,
  CASE
    WHEN in_stock = false THEN
      CASE
        WHEN (unit_price - cost_price) / unit_price > 0.30 THEN 'Restock Urgently'
        ELSE 'Low Priority Restock'
      END
    ELSE
      CASE
        WHEN (unit_price - cost_price) / unit_price >= 0.40 THEN 'Star Product'
        WHEN (unit_price - cost_price) / unit_price >= 0.25 THEN 'Good Product'
        ELSE 'Review Pricing'
      END
  END  AS product_action
FROM products
ORDER BY in_stock, margin_pct DESC;`}
        height={250}
        showSchema={true}
      />

      <Callout type="info">
        Nested CASE expressions beyond two levels become extremely difficult to read and debug. When you find yourself nesting three or more levels deep, consider whether the logic can be expressed differently — a CTE (WITH clause) that computes intermediate classifications, or breaking the logic into separate computed columns.
      </Callout>

      <HR />

      {/* ── PART 10 ── */}
      <Part n="10" title="Complete Business Analytics Examples" />

      <P>Here are complete, production-quality analytics queries that combine CASE WHEN with everything you have learned so far.</P>

      <H>Full product performance dashboard</H>

      <SQLPlayground
        initialQuery={`-- Complete product performance snapshot
SELECT
  p.product_name,
  p.category,
  p.brand,
  p.unit_price,
  ROUND((p.unit_price - p.cost_price) / p.unit_price * 100, 1)   AS margin_pct,
  CASE
    WHEN (p.unit_price - p.cost_price) / p.unit_price >= 0.40 THEN 'High'
    WHEN (p.unit_price - p.cost_price) / p.unit_price >= 0.25 THEN 'Medium'
    ELSE 'Low'
  END                                                             AS margin_band,
  CASE WHEN p.in_stock THEN 'Available' ELSE 'Out of Stock' END  AS stock_status,
  CASE
    WHEN p.in_stock = false
     AND (p.unit_price - p.cost_price) / p.unit_price > 0.30 THEN 'Urgent Restock'
    WHEN p.in_stock = false                                      THEN 'Restock'
    WHEN (p.unit_price - p.cost_price) / p.unit_price < 0.15   THEN 'Review Price'
    ELSE 'OK'
  END                                                             AS action_required
FROM products AS p
ORDER BY
  CASE action_required
    WHEN 'Urgent Restock' THEN 1
    WHEN 'Restock'        THEN 2
    WHEN 'Review Price'   THEN 3
    ELSE                       4
  END,
  margin_pct DESC;`}
        height={290}
        showSchema={false}
      />

      <H>Customer segmentation report</H>

      <SQLPlayground
        initialQuery={`-- Customer segments based on tier and join date
SELECT
  c.first_name || ' ' || c.last_name  AS customer,
  c.city,
  c.loyalty_tier,
  c.joined_date,
  CURRENT_DATE - c.joined_date        AS days_as_member,
  CASE
    WHEN c.loyalty_tier IN ('Gold', 'Platinum')
     AND CURRENT_DATE - c.joined_date > 365  THEN 'VIP Loyal'
    WHEN c.loyalty_tier IN ('Gold', 'Platinum') THEN 'VIP New'
    WHEN CURRENT_DATE - c.joined_date > 365   THEN 'Loyal Standard'
    ELSE 'New Standard'
  END                                 AS segment,
  CASE c.city
    WHEN 'Seattle' THEN 'South'
    WHEN 'Austin' THEN 'South'
    WHEN 'Chicago'   THEN 'South'
    WHEN 'New York'    THEN 'West'
    WHEN 'Boston'      THEN 'West'
    WHEN 'Delhi'     THEN 'North'
    ELSE 'Other'
  END                                 AS region
FROM customers AS c
ORDER BY
  CASE c.loyalty_tier
    WHEN 'Platinum' THEN 1
    WHEN 'Gold'     THEN 2
    WHEN 'Silver'   THEN 3
    ELSE                 4
  END;`}
        height={310}
        showSchema={false}
      />

      <HR />

      {/* ── PART 11 ── */}
      <Part n="11" title="What This Looks Like at Work" />

      <P>You are a senior analyst at Shopify. The finance team needs a weekly GMV (Gross Merchandise Value) report that breaks down revenue by order tier, payment method category, and delivery performance — all in a single table, one row per store. Previously this took three separate queries and manual Excel work. You build it as one CASE-driven query.</P>

      <TimeBlock time="3:00 PM" label="Requirements briefing">
        Finance wants: total GMV per store, GMV split by order tier (Premium above ₹1,500, Standard ₹500–1,500, Basic below ₹500), digital vs non-digital payment split, and percentage of orders delivered within 3 days. All in one row per store, one query.
      </TimeBlock>

      <TimeBlock time="3:20 PM" label="You build the conditional aggregation query">
        Every split requires a CASE WHEN inside an aggregate. The delivery percentage requires a conditional COUNT divided by total COUNT.
      </TimeBlock>

      <SQLPlayground
        initialQuery={`-- Weekly GMV report — all metrics in one query
SELECT
  o.store_id,
  s.city,
  -- Total GMV
  ROUND(SUM(o.total_amount), 2)                                    AS total_gmv,
  COUNT(o.order_id)                                                AS total_orders,
  -- Order tier split
  ROUND(SUM(CASE WHEN o.total_amount >= 1500 THEN o.total_amount ELSE 0 END), 2)
                                                                   AS premium_gmv,
  ROUND(SUM(CASE WHEN o.total_amount BETWEEN 500 AND 1499
                 THEN o.total_amount ELSE 0 END), 2)               AS standard_gmv,
  ROUND(SUM(CASE WHEN o.total_amount < 500   THEN o.total_amount ELSE 0 END), 2)
                                                                   AS basic_gmv,
  -- Payment split
  ROUND(SUM(CASE WHEN o.payment_method IN ('UPI','Card','NetBanking')
                 THEN o.total_amount ELSE 0 END), 2)               AS digital_gmv,
  ROUND(SUM(CASE WHEN o.payment_method = 'COD'
                 THEN o.total_amount ELSE 0 END), 2)               AS cod_gmv,
  -- Delivery performance
  ROUND(
    SUM(CASE WHEN o.delivery_date - o.order_date <= 3 THEN 1 ELSE 0 END) * 100.0
    / NULLIF(COUNT(CASE WHEN o.delivery_date IS NOT NULL THEN 1 END), 0)
  , 1)                                                             AS pct_delivered_3days
FROM orders AS o
JOIN stores AS s ON o.store_id = s.store_id
WHERE o.order_status = 'Delivered'
GROUP BY o.store_id, s.city
ORDER BY total_gmv DESC;`}
        height={310}
        showSchema={true}
      />

      <TimeBlock time="3:55 PM" label="One query replaces three reports and an Excel session">
        The finance director opens the result and immediately has the full picture: ST009 (Austin) has the highest GMV but the lowest 3-day delivery rate. ST001 (Seattle) leads on digital payment adoption. The entire briefing happens from one query result — no manual joins, no Excel pivots, no version control issues between three spreadsheets.
      </TimeBlock>

      <ProTip>
        Conditional aggregation — SUM(CASE WHEN ... END) inside GROUP BY — is what separates SQL analysts from SQL beginners. Once you internalise this pattern, you stop running three queries and combining them in Excel. You ask: "What conditions define each metric?" and write one CASE per metric inside one GROUP BY query. This is the single highest-leverage SQL skill for analytics work at Indian tech companies.
      </ProTip>

      <HR />

      {/* ── PART 12 — Interview Prep ── */}
      <Part n="12" title="Interview Prep — 5 Questions With Complete Answers" />

      <IQ q="What is CASE WHEN and what are its two forms?">
        <p style={{ margin: '0 0 14px' }}>CASE WHEN is SQL's conditional expression — equivalent to an if-else statement in programming languages. It evaluates a series of conditions in order and returns the result for the first condition that evaluates to TRUE. If no condition matches and there is an ELSE clause, the ELSE result is returned. If no condition matches and there is no ELSE, the expression returns NULL.</p>
        <p style={{ margin: '0 0 14px' }}>The searched CASE form evaluates arbitrary conditions for each WHEN: CASE WHEN condition1 THEN result1 WHEN condition2 THEN result2 ELSE default END. Each condition can be any Boolean expression — comparisons, range checks, IS NULL, BETWEEN, IN, even subqueries. This is the most flexible and commonly used form.</p>
        <p style={{ margin: 0 }}>The simple CASE form compares one expression against multiple equality values: CASE expression WHEN value1 THEN result1 WHEN value2 THEN result2 ELSE default END. CASE payment_method WHEN 'UPI' THEN 'Digital' WHEN 'COD' THEN 'Cash' END is cleaner than CASE WHEN payment_method = 'UPI' THEN 'Digital' WHEN payment_method = 'COD' THEN 'Cash' END. The simple form is syntactic sugar — it is always equivalent to the searched form with equality conditions, but reads more cleanly when all conditions are simple equality checks on the same column.</p>
      </IQ>

      <IQ q="In what order does CASE WHEN evaluate its conditions and why does this matter?">
        <p style={{ margin: '0 0 14px' }}>CASE WHEN evaluates conditions strictly top to bottom and returns the result for the first condition that is TRUE — it does not evaluate subsequent conditions after finding a match. This is called short-circuit evaluation. The order of WHEN clauses is therefore critical to the correctness of the result.</p>
        <p style={{ margin: '0 0 14px' }}>The importance becomes clear with overlapping conditions. Consider classifying products by margin: a product with 45% margin satisfies both margin {'>'}= 0.25 and margin {'>'}= 0.40. If WHEN margin {'>'}= 0.25 THEN 'Medium' appears before WHEN margin {'>'}= 0.40 THEN 'High', the 45% margin product is classified as 'Medium' — incorrectly. The correct order puts the more restrictive condition first: WHEN margin {'>'}= 0.40 THEN 'High', then WHEN margin {'>'}= 0.25 THEN 'Medium'.</p>
        <p style={{ margin: 0 }}>The professional rule: always order WHEN conditions from most specific (most restrictive) to least specific (most permissive). For numeric bands, put the highest threshold first. For boolean conditions with overlaps, put the more narrowly defined condition first. For conditions that are mutually exclusive (no overlap), order does not affect correctness but still matters for readability — put the most common or highest-priority case first. Testing your CASE expression against known edge cases — values that sit exactly at boundaries — is the most reliable way to verify the ordering is correct.</p>
      </IQ>

      <IQ q="What is conditional aggregation and how do you implement it?">
        <p style={{ margin: '0 0 14px' }}>Conditional aggregation is the technique of computing multiple different aggregate values in a single query pass by using CASE WHEN inside aggregate functions like SUM, COUNT, and AVG. Instead of running three separate queries with different WHERE conditions and combining the results, you compute all three metrics simultaneously in one GROUP BY query.</p>
        <p style={{ margin: '0 0 14px' }}>The pattern for conditional SUM: SUM(CASE WHEN condition THEN value ELSE 0 END). For each row, if the condition is true the actual value contributes to the sum; if false, 0 contributes (adding nothing). The result is the sum of values only for rows where the condition was true. For conditional COUNT: SUM(CASE WHEN condition THEN 1 ELSE 0 END) — or equivalently COUNT(CASE WHEN condition THEN 1 END) which implicitly skips NULL (the no-ELSE form returns NULL which COUNT ignores).</p>
        <p style={{ margin: 0 }}>A concrete example: to get total revenue, delivered revenue, and cancelled revenue in one query — SELECT SUM(total_amount) AS total, SUM(CASE WHEN status = 'Delivered' THEN total_amount ELSE 0 END) AS delivered, SUM(CASE WHEN status = 'Cancelled' THEN total_amount ELSE 0 END) AS cancelled FROM orders GROUP BY store_id. This single query replaces three queries. In data warehousing, this pattern is how pivot tables are built in SQL — each pivot column is one conditional aggregate. At Indian tech companies, conditional aggregation is used constantly for daily business reports, A/B test result analysis, funnel metrics, and any dashboard that shows data split by multiple categories simultaneously.</p>
      </IQ>

      <IQ q="What happens when no WHEN condition matches in a CASE expression?">
        <p style={{ margin: '0 0 14px' }}>When no WHEN condition matches and the CASE expression has an ELSE clause, the ELSE result is returned. When no WHEN condition matches and there is no ELSE clause, the CASE expression returns NULL. This is the default behaviour defined by the SQL standard.</p>
        <p style={{ margin: '0 0 14px' }}>The danger of a missing ELSE is that it creates silent NULL values in the result. If a new value is added to a column — a new payment method, a new order status, a new product category — and the CASE expression does not have a WHEN for that value and has no ELSE, the new rows produce NULL in the computed column with no error or warning. This corrupts aggregations (SUM treats NULL as 0-excluded, AVG ignores NULLs), breaks application code that expects a non-null value, and produces misleading reports.</p>
        <p style={{ margin: 0 }}>The professional practice: always include an ELSE in every CASE expression. For categorisation use ELSE 'Other' or ELSE 'Unknown' — this makes unexpected values visible. For numeric defaults use ELSE 0. For boolean logic use ELSE FALSE. The ELSE clause acts as a safety net: it guarantees that the CASE expression never returns NULL from a missing match, and makes unexpected values immediately visible in the output rather than silently missing. The only acceptable case for omitting ELSE is when you genuinely want NULL for unmatched rows and your downstream processing handles NULL correctly — which should be explicitly documented in a comment.</p>
      </IQ>

      <IQ q="Can CASE WHEN be used inside ORDER BY? Give a practical example.">
        <p style={{ margin: '0 0 14px' }}>Yes, CASE WHEN can be used inside ORDER BY to sort by a custom priority order rather than the natural alphabetical or numeric order of a column's values. This is one of the most useful applications of CASE WHEN in reporting contexts where business priority does not align with alphabetical or numeric sort order.</p>
        <p style={{ margin: '0 0 14px' }}>The technique: assign a numeric rank to each value using CASE WHEN and sort by that rank. ORDER BY CASE status WHEN 'Processing' THEN 1 WHEN 'Returned' THEN 2 WHEN 'Delivered' THEN 3 WHEN 'Cancelled' THEN 4 ELSE 5 END sorts orders by business priority — actionable statuses first — rather than alphabetically (Cancelled, Delivered, Processing, Returned). The numbers 1-4 are invisible in the output; they only control the sort order.</p>
        <p style={{ margin: 0 }}>Another common example: sorting loyalty tiers by tier value (Platinum, Gold, Silver, Bronze) rather than alphabetically (Bronze, Gold, Platinum, Silver). ORDER BY CASE loyalty_tier WHEN 'Platinum' THEN 1 WHEN 'Gold' THEN 2 WHEN 'Silver' THEN 3 WHEN 'Bronze' THEN 4 END. This can be combined with additional sort keys: ORDER BY CASE loyalty_tier... END ASC, joined_date DESC — sort by tier priority first, then by most recently joined within each tier. CASE in ORDER BY is also used to put specific rows at the top or bottom: ORDER BY CASE WHEN customer_id = 42 THEN 0 ELSE 1 END sorts one specific row to the top of any result regardless of other sort criteria.</p>
      </IQ>

      <HR />

      {/* ── Error Library ── */}
      <Part n="13" title="Errors You Will Hit — And Exactly Why They Happen" />

      <Err
        msg="CASE expression returns wrong category — all products show 'Low Margin' even with 45% margin"
        cause="WHEN conditions are in the wrong order — least restrictive first. CASE evaluates top to bottom and returns the first match. If WHEN margin >= 0.10 THEN 'Low Margin' appears before WHEN margin >= 0.40 THEN 'High Margin', a product with 45% margin matches the first WHEN (0.45 >= 0.10 is TRUE) and is classified as 'Low Margin' immediately. The 'High Margin' WHEN is never reached."
        fix="Order WHEN conditions from most restrictive to least restrictive — highest threshold first: WHEN margin >= 0.40 THEN 'High Margin', WHEN margin >= 0.25 THEN 'Medium Margin', WHEN margin >= 0.10 THEN 'Low Margin', ELSE 'Very Low Margin'. Always verify by running the query for a known edge case — a product with exactly 40% margin should return 'High Margin', one with 39.9% should return 'Medium Margin'."
      />

      <Err
        msg="Some rows show NULL in a CASE column unexpectedly"
        cause="No WHEN condition matched for those rows and there is no ELSE clause. NULL is the default return value when CASE has no matching WHEN and no ELSE. This silently happens when: a new value was added to the data that is not covered by any WHEN clause, the WHEN conditions have gaps (values between thresholds that no WHEN handles), or a NULL value in the input column causes all comparisons to evaluate to NULL (NULL compared to anything is NULL)."
        fix="Add an explicit ELSE clause to every CASE expression: ELSE 'Other' for text categories, ELSE 0 for numeric defaults, ELSE FALSE for boolean logic. To find which rows are returning NULL: SELECT * FROM table WHERE CASE ... END IS NULL — this identifies the unmatched rows. Check whether the column contains NULL values (which bypass all WHEN conditions) and add a WHEN col IS NULL THEN 'Unknown' as the first WHEN if needed."
      />

      <Err
        msg="ERROR: CASE types integer and character varying cannot be matched"
        cause="The THEN clauses in a CASE expression return values of incompatible data types. SQL requires all THEN results (and the ELSE result) to be the same type, or types that can be implicitly converted to a common type. CASE WHEN x > 5 THEN 'High' WHEN x > 2 THEN 3 ELSE 'Low' END mixes text ('High', 'Low') with integer (3) — the database cannot determine a single common type."
        fix="Make all THEN and ELSE results the same data type. For text categories: use strings in all branches. For numeric results: use numbers in all branches. If you need to mix, CAST explicitly: CASE WHEN x > 5 THEN 'High' WHEN x > 2 THEN CAST(3 AS VARCHAR) ELSE 'Low' END — though mixing numeric and text values in a CASE result is usually a design problem. Rethink what the CASE is trying to produce and whether a separate numeric column and a separate text column would be clearer."
      />

      <Err
        msg="Conditional aggregation returns wrong totals — SUM higher than expected"
        cause="The CASE inside SUM is missing the ELSE 0 clause and using NULL instead. SUM(CASE WHEN condition THEN value END) — without ELSE — returns NULL for non-matching rows. SUM ignores NULLs, so the total should be the same as SUM(CASE WHEN condition THEN value ELSE 0 END). However, if the CASE accidentally returns unexpected values for some rows due to a wrong condition, the SUM will be inflated. Also, double-counting occurs when conditions overlap — a row satisfying two conditions appears in two conditional sums."
        fix="Verify the CASE logic by running it as a SELECT column first: SELECT order_id, total_amount, CASE WHEN condition THEN total_amount ELSE 0 END AS conditional_value FROM orders — spot-check that each row's conditional_value is what you expect before wrapping in SUM. For overlap detection: SELECT order_id, COUNT(*) FROM orders WHERE condition1 OR condition2 GROUP BY order_id HAVING COUNT(*) > 1 — any row appearing twice is being double-counted."
      />

      <Err
        msg="CASE in WHERE does not filter correctly — returns all rows or too few rows"
        cause="CASE WHEN in WHERE must evaluate to TRUE for the row to be included. A common mistake is having the CASE return a string ('Yes'/'No') and comparing it to TRUE, or having the CASE return a value the WHERE clause does not evaluate as TRUE. WHERE CASE WHEN x > 5 THEN 'Yes' ELSE 'No' END does not filter anything — it evaluates the string 'Yes' or 'No' as a condition, which in PostgreSQL is a type error, and in MySQL both non-empty strings might be truthy."
        fix="CASE in WHERE should either return a boolean: WHERE CASE WHEN x > 5 THEN TRUE ELSE FALSE END, or be compared explicitly: WHERE CASE WHEN x > 5 THEN 'Yes' ELSE 'No' END = 'Yes'. The boolean form is cleaner and more portable. Alternatively, consider whether the CASE in WHERE can be rewritten as a simpler condition or as separate OR conditions — CASE in WHERE is often more complex than needed and a straightforward WHERE clause with AND/OR is more readable."
      />

      <HR />

      {/* ── Try It ── */}
      <TryItChallenge
        question="Write a single query that produces a store performance summary for FreshCart management. For each store show: store_id, city, total delivered orders, total delivered revenue (rounded to 2 decimal places), the revenue from high-value orders (above ₹1,000) as high_value_revenue, a performance_band column using CASE: 'Star' if total delivered revenue above ₹3,000, 'Good' if above ₹1,500, 'Needs Support' otherwise. Sort by total delivered revenue descending."
        hint="JOIN stores to orders. WHERE order_status = 'Delivered'. SUM(total_amount) for revenue. SUM(CASE WHEN total_amount > 1000 THEN total_amount ELSE 0 END) for high_value_revenue. CASE on the SUM result for performance_band — but you cannot use the alias in CASE, so repeat the expression."
        answer={`SELECT
  s.store_id,
  s.city,
  COUNT(o.order_id)                                                AS delivered_orders,
  ROUND(SUM(o.total_amount), 2)                                    AS delivered_revenue,
  ROUND(SUM(
    CASE WHEN o.total_amount > 1000 THEN o.total_amount ELSE 0 END
  ), 2)                                                            AS high_value_revenue,
  CASE
    WHEN SUM(o.total_amount) > 3000 THEN 'Star'
    WHEN SUM(o.total_amount) > 1500 THEN 'Good'
    ELSE 'Needs Support'
  END                                                              AS performance_band
FROM stores AS s
JOIN orders AS o ON s.store_id = o.store_id
WHERE o.order_status = 'Delivered'
GROUP BY s.store_id, s.city
ORDER BY delivered_revenue DESC;`}
        explanation="Three CASE-related techniques appear in this query. Conditional SUM for high_value_revenue — CASE inside SUM returns the amount only for orders above ₹1,000, zero otherwise. CASE on an aggregate for performance_band — CASE WHEN SUM(total_amount) > 3000 THEN 'Star' uses the aggregate function directly inside the CASE expression in SELECT (valid because GROUP BY has already produced the groups). ORDER BY delivered_revenue — this correctly uses the SELECT alias because ORDER BY runs after SELECT. Note that performance_band uses SUM(o.total_amount) again rather than the delivered_revenue alias — SELECT aliases cannot be referenced inside the same SELECT list, only in ORDER BY."
      />

      <HR />

      {/* ── Key Takeaways ── */}
      <KeyTakeaways
        items={[
          'CASE WHEN is SQL\'s if-else expression. It evaluates conditions top to bottom and returns the result for the first TRUE condition. It can appear in SELECT, WHERE, ORDER BY, and inside aggregate functions.',
          'Two forms: searched CASE (CASE WHEN condition THEN result) for arbitrary conditions, and simple CASE (CASE expression WHEN value THEN result) for equality checks against one column. Both produce identical results for equality conditions.',
          'Evaluation is top-to-bottom with short-circuit: the first matching WHEN wins and remaining WHENs are skipped. Order WHEN conditions from most restrictive to least restrictive.',
          'Always include ELSE. Without it, unmatched rows return NULL silently — breaking aggregations, application code, and reports. Use ELSE \'Other\', ELSE 0, or ELSE FALSE as appropriate.',
          'CASE WHEN in ORDER BY enables custom sort priorities: ORDER BY CASE status WHEN \'Processing\' THEN 1 WHEN \'Delivered\' THEN 2 END — sorts by business priority, not alphabetically.',
          'Conditional aggregation — SUM(CASE WHEN condition THEN value ELSE 0 END) — computes multiple metrics in one query pass. It replaces running the same query repeatedly with different WHERE conditions.',
          'Pivot tables in SQL use conditional aggregation: each pivot column is one CASE WHEN inside SUM or COUNT, grouped by the row dimension.',
          'NULL handling inside CASE: use IS NULL and IS NOT NULL in WHEN conditions — never = NULL. When the column being tested is NULL, all comparisons return NULL and no WHEN matches.',
          'All THEN and ELSE results must be the same data type or implicitly castable to a common type. Mixing text and numeric results causes a type error.',
          'Conditional aggregation is the highest-leverage CASE WHEN skill for analytics. Any report that shows data split by multiple categories simultaneously uses this pattern — master it and you eliminate entire categories of manual Excel work.',
        ]}
      />

      {/* ── Next CTA ── */}
      <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 10, padding: '24px', marginTop: 40 }}>
        <p style={{ fontSize: 10, color: 'var(--muted)', letterSpacing: '.12em', textTransform: 'uppercase', fontFamily: 'var(--font-mono)', fontWeight: 700, margin: '0 0 10px' }}>What comes next</p>
        <p style={{ fontSize: 15, color: 'var(--text)', lineHeight: 1.85, margin: '0 0 20px' }}>
          In <strong>Module 17</strong>, you learn about data types in SQL — what types exist, which to use for which data, and how type mismatches cause silent bugs in calculations and comparisons.
        </p>
        <Link href="/learn/sql/data-types" style={{ background: C, color: '#000', padding: '11px 24px', borderRadius: 7, fontWeight: 700, fontSize: 13, textDecoration: 'none', display: 'inline-block' }}>
          Module 17 → SQL Data Types
        </Link>
      </div>

    </LearnLayout>
  );
}