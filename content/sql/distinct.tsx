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

export default function Distinct() {
  return (
    <LearnLayout
      title="Removing Duplicates — DISTINCT"
      description="Return only unique values, understand how DISTINCT works across single and multiple columns, its performance cost, and when to use GROUP BY instead"
      section="SQL — Module 10"
      readTime="25 min"
      updatedAt="April 2026"
    >

      {/* ── PART 01 ── */}
      <Part n="01" title="The Problem DISTINCT Solves" />

      <P>By default, SELECT returns every row that satisfies your WHERE condition — including duplicates. If ten customers all live in Bangalore, a query for cities returns "Bangalore" ten times. If thirty orders were placed across five stores, a query for store IDs returns five store IDs across thirty rows — with many repeats.</P>

      <P>Sometimes you want those repeats — when you are counting transactions, listing orders, or analysing every individual record. But sometimes you want to know the <Hl>unique set of values</Hl> — which cities does FreshMart serve, which categories of products exist, which payment methods have been used. This is what DISTINCT does: it eliminates duplicate rows from your result, returning each unique value exactly once.</P>

      <SQLPlayground
        initialQuery={`-- Without DISTINCT: every customer's city, with repeats
-- 20 rows returned — many cities appear multiple times
SELECT city
FROM customers
ORDER BY city;`}
        height={110}
        showSchema={true}
      />

      <SQLPlayground
        initialQuery={`-- With DISTINCT: each city appears exactly once
-- Much smaller result — the unique set of cities FreshMart serves
SELECT DISTINCT city
FROM customers
ORDER BY city;`}
        height={110}
        showSchema={false}
      />

      <P>Same table, same column, one keyword difference — completely different results. The first query answers "what city is each customer in?" The second answers "which cities do our customers come from?"</P>

      <HR />

      {/* ── PART 02 ── */}
      <Part n="02" title="How DISTINCT Works Internally" />

      <P>Understanding what DISTINCT does inside the database helps you predict its performance and know when to use it.</P>

      <H>The deduplication process</H>
      <P>When the database executes a DISTINCT query, it collects all rows that would normally be returned, then eliminates any row whose combination of column values has already been seen. The result is the unique set of rows. Internally, the database does this using one of two mechanisms:</P>

      <P><Hl>Sorting:</Hl> The database sorts all rows by the SELECT columns. Identical rows end up adjacent, making duplicates easy to identify and skip. This is why DISTINCT queries often show sorted output in practice — though this is a side effect of the implementation, not a guarantee.</P>

      <P><Hl>Hashing:</Hl> The database computes a hash of each row's values and uses a hash table to track which combinations have been seen. When a row's hash matches an existing entry, it is a duplicate and is discarded. Hashing avoids the sort step and is often faster when the result fits in memory.</P>

      <P>Both approaches require processing every row in the result before any rows can be returned — DISTINCT cannot return the first row until it has seen all rows, because the first row might turn out to be a duplicate of the last row. This is why <Hl>DISTINCT has a cost that grows with the number of input rows</Hl> and cannot return results early the way LIMIT can.</P>

      <H>Where DISTINCT fits in execution order</H>
      <P>DISTINCT is applied after SELECT but before ORDER BY. The execution order for a query with DISTINCT is: FROM → WHERE → SELECT (project columns) → DISTINCT (eliminate duplicates) → ORDER BY → LIMIT. This means DISTINCT operates on the projected columns — the set of columns you listed in SELECT — not on all columns in the table.</P>

      <HR />

      {/* ── PART 03 ── */}
      <Part n="03" title="DISTINCT on a Single Column" />

      <P>The most common use of DISTINCT is finding the unique values in one column — all distinct cities, all distinct categories, all distinct statuses. This is often called finding the <Hl>domain</Hl> or <Hl>cardinality</Hl> of a column.</P>

      <SQLPlayground
        initialQuery={`-- All distinct cities where FreshMart has customers
SELECT DISTINCT city
FROM customers
ORDER BY city;`}
        height={110}
        showSchema={true}
      />

      <SQLPlayground
        initialQuery={`-- All distinct product categories
SELECT DISTINCT category
FROM products
ORDER BY category;`}
        height={110}
        showSchema={false}
      />

      <SQLPlayground
        initialQuery={`-- All distinct order statuses — what states can an order be in?
SELECT DISTINCT order_status
FROM orders
ORDER BY order_status;`}
        height={110}
        showSchema={false}
      />

      <SQLPlayground
        initialQuery={`-- All distinct payment methods used
SELECT DISTINCT payment_method
FROM orders
ORDER BY payment_method;`}
        height={110}
        showSchema={false}
      />

      <SQLPlayground
        initialQuery={`-- All distinct loyalty tiers
SELECT DISTINCT loyalty_tier
FROM customers
ORDER BY loyalty_tier;`}
        height={110}
        showSchema={false}
      />

      <P>These five queries are the most useful exploratory queries when joining a new project. Before you write any filtering queries on these columns, run DISTINCT to know exactly what values exist in the data — including any unexpected values, typos, or formatting inconsistencies that would cause your WHERE conditions to miss rows.</P>

      <HR />

      {/* ── PART 04 ── */}
      <Part n="04" title="DISTINCT on Multiple Columns" />

      <P>When you list multiple columns in a DISTINCT query, the database returns each unique <Hl>combination</Hl> of those columns — not just unique values in each column independently. A row is a duplicate only if every column in the SELECT list has an identical value.</P>

      <SQLPlayground
        initialQuery={`-- Each unique city + loyalty_tier combination
-- Not just unique cities, not just unique tiers —
-- each distinct PAIR that exists in the data
SELECT DISTINCT city, loyalty_tier
FROM customers
ORDER BY city, loyalty_tier;`}
        height={130}
        showSchema={true}
      />

      <SQLPlayground
        initialQuery={`-- Each unique store + order_status combination
-- Which stores have had which order statuses?
SELECT DISTINCT store_id, order_status
FROM orders
ORDER BY store_id, order_status;`}
        height={120}
        showSchema={false}
      />

      <SQLPlayground
        initialQuery={`-- Each unique category + sub_category combination
-- The full product taxonomy tree
SELECT DISTINCT category, sub_category
FROM products
ORDER BY category, sub_category;`}
        height={120}
        showSchema={false}
      />

      <H>The combination rule in practice</H>

      <P>Consider DISTINCT city, loyalty_tier on a customers table with 20 rows. There are 7 distinct cities and 4 distinct tiers. The number of distinct combinations is NOT 7 + 4 = 11. It is however many unique city-tier pairs actually appear in the data — some cities might have customers at all four tiers, others might only have Bronze and Silver customers. DISTINCT returns only the combinations that genuinely exist.</P>

      <Callout type="info">
        DISTINCT applies to the entire SELECT list as a unit. You cannot write SELECT DISTINCT city, first_name and expect DISTINCT to only deduplicate on city while returning all first_names. DISTINCT always operates on the full combination of all listed columns. If you want unique cities with one representative name per city, you need GROUP BY — covered in Module 28.
      </Callout>

      <HR />

      {/* ── PART 05 ── */}
      <Part n="05" title="DISTINCT with WHERE and ORDER BY" />

      <P>DISTINCT works seamlessly with WHERE and ORDER BY. WHERE filters rows before DISTINCT processes them — so DISTINCT only sees and deduplicates the rows that passed the filter. ORDER BY sorts the unique result set after deduplication.</P>

      <SQLPlayground
        initialQuery={`-- Distinct cities where Gold or Platinum customers live
-- WHERE filters first, DISTINCT deduplicates the filtered rows
SELECT DISTINCT city
FROM customers
WHERE loyalty_tier IN ('Gold', 'Platinum')
ORDER BY city;`}
        height={120}
        showSchema={true}
      />

      <SQLPlayground
        initialQuery={`-- Distinct payment methods used for high-value orders (above ₹1000)
SELECT DISTINCT payment_method
FROM orders
WHERE total_amount > 1000
ORDER BY payment_method;`}
        height={110}
        showSchema={false}
      />

      <SQLPlayground
        initialQuery={`-- Distinct stores that have had cancelled or returned orders
-- Operations team uses this to identify stores with fulfilment issues
SELECT DISTINCT store_id
FROM orders
WHERE order_status = 'Cancelled'
   OR order_status = 'Returned'
ORDER BY store_id;`}
        height={130}
        showSchema={false}
      />

      <SQLPlayground
        initialQuery={`-- Distinct categories of in-stock products under ₹100
-- What affordable product categories are available?
SELECT DISTINCT category
FROM products
WHERE in_stock = true
  AND unit_price < 100
ORDER BY category;`}
        height={120}
        showSchema={false}
      />

      <HR />

      {/* ── PART 06 ── */}
      <Part n="06" title="COUNT DISTINCT — Counting Unique Values" />

      <P>One of the most common analytical questions is not "what are the unique values?" but "how many unique values are there?" For this, SQL provides <Hl>COUNT(DISTINCT column)</Hl> — it counts the number of distinct non-null values in a column.</P>

      <SQLPlayground
        initialQuery={`-- How many distinct cities do our customers come from?
SELECT COUNT(DISTINCT city) AS distinct_cities
FROM customers;`}
        height={100}
        showSchema={true}
      />

      <SQLPlayground
        initialQuery={`-- How many distinct customers have placed orders?
-- Not the count of orders — the count of unique customer_ids
SELECT COUNT(DISTINCT customer_id) AS customers_who_ordered
FROM orders;`}
        height={100}
        showSchema={false}
      />

      <SQLPlayground
        initialQuery={`-- How many distinct products have been ordered?
SELECT COUNT(DISTINCT product_id) AS products_ordered
FROM order_items;`}
        height={100}
        showSchema={false}
      />

      <SQLPlayground
        initialQuery={`-- Compare: total orders vs distinct customers who ordered
-- The difference tells you how many customers are repeat buyers
SELECT
  COUNT(*)                    AS total_orders,
  COUNT(DISTINCT customer_id) AS unique_customers,
  COUNT(*) - COUNT(DISTINCT customer_id) AS repeat_order_count
FROM orders;`}
        height={130}
        showSchema={false}
      />

      <H>COUNT(*) vs COUNT(DISTINCT column) vs COUNT(column)</H>

      <div style={{ overflowX: 'auto', margin: '16px 0 28px' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
          <thead>
            <tr>
              {['Expression', 'What it counts', 'NULL handling'].map(h => (
                <th key={h} style={{ padding: '10px 14px', background: 'var(--surface)', color: 'var(--muted)', fontWeight: 700, textAlign: 'left', borderBottom: '1px solid var(--border)', fontSize: 11, textTransform: 'uppercase', letterSpacing: '.08em' }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {[
              ['COUNT(*)', 'Every row, regardless of values', 'Counts rows even if every column is NULL'],
              ['COUNT(column)', 'Rows where column is NOT NULL', 'NULLs are excluded from the count'],
              ['COUNT(DISTINCT column)', 'Unique non-NULL values in column', 'NULLs are excluded; only one NULL would be counted anyway'],
            ].map(([expr, what, nulls], i) => (
              <tr key={expr} style={{ background: i % 2 === 0 ? 'transparent' : 'var(--surface)' }}>
                <td style={{ padding: '10px 14px', fontFamily: 'var(--font-mono)', fontSize: 12, color: C, borderBottom: '1px solid var(--border)' }}>{expr}</td>
                <td style={{ padding: '10px 14px', fontSize: 13, color: 'var(--text)', borderBottom: '1px solid var(--border)', lineHeight: 1.6 }}>{what}</td>
                <td style={{ padding: '10px 14px', fontSize: 13, color: 'var(--muted)', borderBottom: '1px solid var(--border)', lineHeight: 1.6 }}>{nulls}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <SQLPlayground
        initialQuery={`-- Demonstrate all three COUNT variations on orders
SELECT
  COUNT(*)                     AS total_rows,
  COUNT(delivery_date)         AS rows_with_delivery_date,
  COUNT(DISTINCT customer_id)  AS unique_customers
FROM orders;
-- total_rows > rows_with_delivery_date
-- because some orders have NULL delivery_date (not yet delivered)`}
        height={140}
        showSchema={false}
      />

      <HR />

      {/* ── PART 07 ── */}
      <Part n="07" title="DISTINCT vs GROUP BY — When to Use Which" />

      <P>DISTINCT and GROUP BY both return unique combinations of values. For simple deduplication, they produce identical results. But they serve different purposes and have different capabilities.</P>

      <CodeBlock
        label="DISTINCT and GROUP BY producing the same result"
        code={`-- Both return the same list of unique cities
SELECT DISTINCT city
FROM customers
ORDER BY city;

-- Equivalent with GROUP BY
SELECT city
FROM customers
GROUP BY city
ORDER BY city;`}
      />

      <P>When they diverge is when you want to <Hl>calculate something per unique value</Hl>. DISTINCT cannot do this — it only removes duplicates. GROUP BY can aggregate: count how many customers per city, sum revenue per store, find the average price per category. You will learn GROUP BY fully in Module 28, but here is the key distinction:</P>

      <CodeBlock
        label="DISTINCT vs GROUP BY — the key difference"
        code={`-- DISTINCT: unique cities only — no aggregation possible
SELECT DISTINCT city
FROM customers;

-- GROUP BY: unique cities WITH a count of customers in each
-- This is impossible with DISTINCT alone
SELECT city, COUNT(*) AS customer_count
FROM customers
GROUP BY city
ORDER BY customer_count DESC;

-- Rule of thumb:
-- Just unique values → DISTINCT
-- Unique values + any calculation → GROUP BY`}
      />

      <H>Performance comparison</H>
      <P>For simple deduplication, DISTINCT and GROUP BY have similar performance — both require the database to process all rows and identify unique combinations. GROUP BY often has a slight edge because it is more directly optimised in most database engines. For large tables, if you only need unique values with no aggregation, both are valid — but GROUP BY is preferred in professional code because it is more expressive and extensible (you can add COUNT or SUM later without rewriting the query structure).</P>

      <ProTip>
        In production code, prefer GROUP BY over DISTINCT for deduplication when working with large tables — it is more explicit about intent, easier to extend with aggregations, and often slightly faster. Use DISTINCT for quick exploration and profiling, and when the query is simple enough that GROUP BY would add unnecessary verbosity.
      </ProTip>

      <HR />

      {/* ── PART 08 ── */}
      <Part n="08" title="DISTINCT and Performance — The Hidden Cost" />

      <P>DISTINCT is not free. Before returning any row, the database must process all rows in the result set and eliminate duplicates. On small tables this is imperceptible. On tables with millions of rows, DISTINCT can be significantly slower than a plain SELECT — and significantly slower than a well-designed GROUP BY with an index.</P>

      <H>When DISTINCT is expensive</H>
      <P>DISTINCT requires a <Hl>sort or hash of the entire projected result set</Hl>. If 5 million rows pass through WHERE, DISTINCT must hash or sort all 5 million before returning any. Memory usage grows with result size — large DISTINCT operations may spill to disk, causing further slowdown.</P>

      <H>When DISTINCT is cheap</H>
      <P>If the column being deduplicated has an index, the database can often use an <Hl>index scan</Hl> to find unique values without processing every row. For a column with 7 distinct values in a 10-million-row table, the database can scan just the index (far smaller than the table) and return 7 values almost instantly. For columns with few distinct values relative to total rows (low cardinality — like city, status, category), DISTINCT is fast even on large tables.</P>

      <H>DISTINCT as a debugging smell</H>
      <P>Experienced SQL writers know that DISTINCT in a complex query — especially a query with JOINs — is often a sign that something else is wrong. If a JOIN is producing more rows than expected (a fan-out from a one-to-many relationship), adding DISTINCT might mask the problem rather than fix it. Before reaching for DISTINCT, ask: <Hl>why are there duplicates?</Hl> If the answer is "my JOIN is returning more rows than I expect," fix the JOIN rather than hiding the extra rows with DISTINCT.</P>

      <Callout type="warning">
        SELECT DISTINCT in a query with JOIN is a red flag. It often means the JOIN is creating a cartesian product or joining on a non-unique key, producing duplicate rows. DISTINCT hides this but does not fix it — and it adds a significant performance cost. Investigate the source of duplicates and fix the JOIN condition instead. You will learn JOIN in depth in Modules 30–35.
      </Callout>

      <HR />

      {/* ── PART 09 ── */}
      <Part n="09" title="Practical DISTINCT Patterns — Real Business Uses" />

      <P>These are the DISTINCT patterns you will write most frequently in real analytics work.</P>

      <H>Schema exploration — what values exist in this column?</H>

      <SQLPlayground
        initialQuery={`-- Before filtering on a column, always check what values exist
-- This prevents WHERE conditions that match nothing
SELECT DISTINCT department
FROM employees
ORDER BY department;`}
        height={110}
        showSchema={true}
      />

      <SQLPlayground
        initialQuery={`-- What brands does FreshMart stock?
SELECT DISTINCT brand
FROM products
ORDER BY brand;`}
        height={110}
        showSchema={false}
      />

      <H>Reach analysis — which entities touched a segment?</H>

      <SQLPlayground
        initialQuery={`-- Which stores received at least one UPI order?
-- Distinct stores, filtered by payment method
SELECT DISTINCT store_id
FROM orders
WHERE payment_method = 'UPI'
ORDER BY store_id;`}
        height={110}
        showSchema={false}
      />

      <SQLPlayground
        initialQuery={`-- Which customers have placed at least one order?
-- (Some customers may have never ordered)
SELECT DISTINCT customer_id
FROM orders
ORDER BY customer_id;`}
        height={110}
        showSchema={false}
      />

      <H>Data quality checks — find unexpected values</H>

      <SQLPlayground
        initialQuery={`-- Check all distinct order statuses
-- If anything other than Delivered/Processing/Cancelled/Returned appears,
-- there is a data quality issue
SELECT DISTINCT order_status
FROM orders
ORDER BY order_status;`}
        height={110}
        showSchema={false}
      />

      <SQLPlayground
        initialQuery={`-- Check all distinct states — any unexpected abbreviations or typos?
SELECT DISTINCT state
FROM customers
ORDER BY state;`}
        height={110}
        showSchema={false}
      />

      <H>Cardinality profiling — how many unique values?</H>

      <SQLPlayground
        initialQuery={`-- Profile the cardinality of key columns
-- Low cardinality = good candidate for a partial index
-- High cardinality = good candidate for a B-tree index
SELECT
  COUNT(DISTINCT city)           AS distinct_cities,
  COUNT(DISTINCT loyalty_tier)   AS distinct_tiers,
  COUNT(DISTINCT state)          AS distinct_states,
  COUNT(*)                       AS total_customers
FROM customers;`}
        height={150}
        showSchema={false}
      />

      <HR />

      {/* ── PART 10 ── */}
      <Part n="10" title="What This Looks Like at Work" />

      <P>You are a data analyst at Zepto, the quick commerce startup. The product team is preparing a feature that lets customers filter products by brand. Before the engineering team builds the filter UI, they need to know exactly which brands exist in the product catalogue — the complete, deduplicated list with no repeats.</P>

      <TimeBlock time="11:00 AM" label="Request arrives">
        The product manager sends a message: "We need the list of all distinct brands in our catalogue for the filter dropdown. Should be alphabetical. Also, how many distinct brands do we have total? And which brands appear in more than one category — those need a special multi-category indicator in the UI."
      </TimeBlock>

      <TimeBlock time="11:08 AM" label="Query 1 — complete distinct brand list">
        The dropdown list itself — every brand exactly once, alphabetically.
      </TimeBlock>

      <SQLPlayground
        initialQuery={`-- All distinct brands for the filter dropdown
SELECT DISTINCT brand
FROM products
WHERE in_stock = true
ORDER BY brand;`}
        height={110}
        showSchema={true}
      />

      <TimeBlock time="11:12 AM" label="Query 2 — total brand count">
        The product manager asked for a total. One line.
      </TimeBlock>

      <SQLPlayground
        initialQuery={`-- How many distinct brands in the catalogue?
SELECT COUNT(DISTINCT brand) AS total_brands
FROM products
WHERE in_stock = true;`}
        height={100}
        showSchema={false}
      />

      <TimeBlock time="11:15 AM" label="Query 3 — brands across multiple categories">
        Brands that appear in more than one category need a "multi-category" flag in the UI. This requires COUNT DISTINCT per brand — a GROUP BY query (preview of Module 28).
      </TimeBlock>

      <SQLPlayground
        initialQuery={`-- Brands that appear in more than one category
-- Uses GROUP BY + HAVING (preview of Modules 28-29)
SELECT brand, COUNT(DISTINCT category) AS category_count
FROM products
WHERE in_stock = true
GROUP BY brand
HAVING COUNT(DISTINCT category) > 1
ORDER BY category_count DESC, brand;`}
        height={150}
        showSchema={false}
      />

      <TimeBlock time="11:25 AM" label="All three delivered in 25 minutes">
        The product manager shares the results with engineering and design. The dropdown list, the count for the filter header ("Filter by Brand — 12 brands"), and the multi-category flag list. Three precise queries, three answers, zero back-and-forth. The engineering team starts building the filter the same afternoon.
      </TimeBlock>

      <ProTip>
        DISTINCT is one of the most useful tools for data profiling — understanding a new dataset before writing production queries on it. When you join a new project, spend an hour running SELECT DISTINCT on every important column in every important table. You will find unexpected values, inconsistent capitalisation, typos, deprecated statuses, and missing data — all of which affect every query you will write on that column. Discovering these issues before writing business logic saves hours of debugging later.
      </ProTip>

      <HR />

      {/* ── PART 11 — Interview Prep ── */}
      <Part n="11" title="Interview Prep — 5 Questions With Complete Answers" />

      <IQ q="What does SELECT DISTINCT do and how does it differ from a plain SELECT?">
        <p style={{ margin: '0 0 14px' }}>SELECT DISTINCT returns only unique rows — it eliminates duplicate rows from the result set before returning them to the caller. A plain SELECT returns every row that satisfies the WHERE condition, including duplicates. The deduplication applies to the complete combination of all columns listed in SELECT: a row is considered a duplicate only if every column in the SELECT list has an identical value to another row.</p>
        <p style={{ margin: '0 0 14px' }}>The practical difference: SELECT city FROM customers returns one row per customer — 20 rows if there are 20 customers, with cities repeated for customers in the same city. SELECT DISTINCT city FROM customers returns one row per unique city — 7 rows if customers are distributed across 7 cities, regardless of how many customers are in each.</p>
        <p style={{ margin: 0 }}>Internally, DISTINCT requires the database to process all result rows and eliminate duplicates before returning any. This is done through sorting (duplicates become adjacent) or hashing (track seen values in a hash table). Both approaches require processing the full result set, making DISTINCT a blocking operation — it cannot return partial results early the way LIMIT can. The cost grows with the number of input rows and the number of columns in the SELECT list.</p>
      </IQ>

      <IQ q="What is the difference between COUNT(*), COUNT(column), and COUNT(DISTINCT column)?">
        <p style={{ margin: '0 0 14px' }}>COUNT(*) counts every row in the result set regardless of the values in any column. It includes rows where all columns are NULL. It is the correct function for counting how many rows a query returns — total orders, total customers, total products.</p>
        <p style={{ margin: '0 0 14px' }}>COUNT(column) counts rows where the specified column is NOT NULL. If delivery_date is NULL for undelivered orders, COUNT(delivery_date) counts only the delivered orders — those where delivery_date has a real value. This makes COUNT(column) useful for counting non-missing values: how many orders have been assigned a delivery date, how many employees have a specified manager.</p>
        <p style={{ margin: 0 }}>COUNT(DISTINCT column) counts the number of unique non-null values in the specified column. COUNT(DISTINCT customer_id) from the orders table counts how many distinct customers have placed at least one order — not how many total orders, and not including customers who have never ordered. This is the cardinality question: how many unique values exist. A common analytical pattern combining all three: SELECT COUNT(*) AS total_orders, COUNT(delivery_date) AS delivered_orders, COUNT(DISTINCT customer_id) AS unique_customers FROM orders — each answers a different question about the same table.</p>
      </IQ>

      <IQ q="How does DISTINCT behave when applied to multiple columns?">
        <p style={{ margin: '0 0 14px' }}>When multiple columns are listed in a SELECT DISTINCT query, DISTINCT applies to the full combination of all listed columns — not to each column independently. A row is eliminated as a duplicate only if every column in the SELECT list has an identical value to another row. If any one column differs, the row is considered unique and is included in the result.</p>
        <p style={{ margin: '0 0 14px' }}>Concrete example: SELECT DISTINCT city, loyalty_tier FROM customers. The result contains every unique city-tier pair that exists in the data. If Bangalore has customers at Gold and Platinum tiers, two rows appear: (Bangalore, Gold) and (Bangalore, Platinum). If Hyderabad only has Silver customers, one row appears: (Hyderabad, Silver). The total number of result rows is the count of unique combinations — not the sum of distinct values in each column independently.</p>
        <p style={{ margin: 0 }}>This combination behaviour is important to understand because it means adding more columns to a DISTINCT query increases the number of rows returned (or keeps it the same — never decreases it). If every combination of city and loyalty_tier is unique, SELECT DISTINCT city, loyalty_tier returns as many rows as SELECT DISTINCT city. Only if multiple rows share the exact same city AND loyalty_tier does DISTINCT reduce the count. The more columns you add, the more specific the combination and the fewer rows get eliminated as duplicates.</p>
      </IQ>

      <IQ q="When would you use DISTINCT vs GROUP BY?">
        <p style={{ margin: '0 0 14px' }}>Both DISTINCT and GROUP BY can return unique combinations of column values — for simple deduplication they produce identical results. The choice depends on whether you need to calculate anything per unique combination.</p>
        <p style={{ margin: '0 0 14px' }}>Use DISTINCT when you only need the unique values themselves with no aggregation: SELECT DISTINCT city FROM customers. It is concise and communicates intent clearly — you want the unique set of cities, nothing more. DISTINCT is also the appropriate choice in COUNT(DISTINCT column) expressions inside aggregate queries.</p>
        <p style={{ margin: 0 }}>Use GROUP BY when you need unique values plus any calculation per group: SELECT city, COUNT(*) AS customer_count FROM customers GROUP BY city. DISTINCT cannot perform this — it only eliminates duplicates, it does not aggregate. GROUP BY is also preferred in production code for large tables because it is more directly optimised in most database engines and is more extensible — you can add SUM, AVG, or MAX columns without changing the query structure. A practical rule: if the query only has DISTINCT with no aggregate functions, GROUP BY is an equally valid and often preferable alternative. If you need aggregation per group, GROUP BY is the only option.</p>
      </IQ>

      <IQ q="Why is DISTINCT in a query with JOINs considered a warning sign?">
        <p style={{ margin: '0 0 14px' }}>DISTINCT in a JOIN query is a warning sign because it often indicates that the JOIN is producing more rows than intended — and DISTINCT is being used to hide the problem rather than fix it. The most common cause is a one-to-many JOIN that fans out rows: if you join customers to orders on customer_id, and a customer has 5 orders, that customer's row appears 5 times in the result. Adding DISTINCT collapses those 5 rows back to 1 — but you have also lost the information that there were 5 orders, and you are paying the cost of both the fan-out and the deduplication.</p>
        <p style={{ margin: '0 0 14px' }}>The correct fix depends on what you actually want. If you want one row per customer with an order count, use GROUP BY: SELECT customer_id, COUNT(order_id) AS order_count FROM customers JOIN orders USING (customer_id) GROUP BY customer_id. If you want customers who have placed at least one order (existence check), use EXISTS: SELECT customer_id FROM customers WHERE EXISTS (SELECT 1 FROM orders WHERE orders.customer_id = customers.customer_id). Both are more correct and more efficient than joining and then applying DISTINCT.</p>
        <p style={{ margin: 0 }}>The general principle: when you find yourself adding DISTINCT to remove unexpected duplicates, stop and investigate why the duplicates exist. The answer is almost always a JOIN issue — wrong join column, missing join condition creating a cartesian product, or a one-to-many relationship producing more rows than expected. Fixing the root cause gives you correct results with better performance. DISTINCT on top of a broken JOIN gives you correct-looking results that hide a performance problem and a misunderstood data model.</p>
      </IQ>

      <HR />

      {/* ── Error Library ── */}
      <Part n="12" title="Errors You Will Hit — And Exactly Why They Happen" />

      <Err
        msg="SELECT DISTINCT returns more rows than expected — expected 5 unique cities but got 12 rows"
        cause="DISTINCT is applied to the combination of ALL columns in SELECT, not just the first column. If your SELECT list includes multiple columns — SELECT DISTINCT city, loyalty_tier — the result contains unique city-tier pairs, not just unique cities. If you have 7 cities but some cities have customers at multiple loyalty tiers, the number of unique (city, tier) combinations is larger than the number of unique cities alone."
        fix="Reduce your SELECT list to only the columns you want uniqueness on. To get unique cities only: SELECT DISTINCT city FROM customers. If you also need loyalty_tier in the output but want one row per city, use GROUP BY with an aggregate to select which tier to show: SELECT city, MAX(loyalty_tier) FROM customers GROUP BY city — or rethink what 'unique' means for your use case. DISTINCT is not a column-level operation — it always applies to the full row."
      />

      <Err
        msg="DISTINCT query is very slow — takes 45 seconds on a large table"
        cause="DISTINCT requires processing all rows in the result before returning any, using either a sort or hash-based deduplication. On a large table with millions of rows and no index on the SELECT columns, this is an expensive O(n log n) or O(n) operation. If the table has no index covering the DISTINCT columns, the database performs a full table scan followed by a full sort or hash of all rows."
        fix="Three approaches in order of preference. First, add an index on the columns used in DISTINCT — the database can then scan the index (much smaller than the table) to find unique values. Second, rewrite as GROUP BY which may use a more efficient execution plan: SELECT city FROM customers GROUP BY city. Third, if you need COUNT(DISTINCT column), consider caching or pre-computing the value in a summary table if it is queried frequently. Use EXPLAIN ANALYZE to see the actual execution plan and confirm whether an index is being used."
      />

      <Err
        msg="COUNT(DISTINCT column) returns a different number than expected — lower than the manual count"
        cause="COUNT(DISTINCT column) excludes NULL values from its count. If the column contains NULL values, those rows are not counted. For example, if the brand column is NULL for 3 products and there are 12 non-null distinct brands, COUNT(DISTINCT brand) returns 12, not 15. Additionally, values that appear to be different but are actually the same due to trailing spaces or case differences ('Amul' vs 'amul') may count as two distinct values when you expected one."
        fix="First, check for NULLs: SELECT COUNT(*) FROM products WHERE brand IS NULL — this shows how many NULL brand rows exist. If NULLs should be counted as a distinct value, add a COALESCE: COUNT(DISTINCT COALESCE(brand, 'Unknown')). Second, check for case or whitespace inconsistencies: SELECT DISTINCT LOWER(TRIM(brand)) FROM products — this normalises the values and shows what you actually have. If inconsistencies exist, fix the data at source or use COUNT(DISTINCT LOWER(TRIM(brand))) in your query."
      />

      <Err
        msg="DISTINCT removed rows that should be different — two orders with the same data are collapsed into one"
        cause="DISTINCT considers two rows identical if every column in the SELECT list has the same value. If your SELECT list does not include a unique identifier (like order_id), two genuinely different orders with identical visible data — same customer, same date, same amount — will be collapsed into one row by DISTINCT. This is a data loss bug, not a DISTINCT bug."
        fix="Include a unique identifier column (primary key) in your SELECT list when using DISTINCT on transactional data. SELECT DISTINCT order_id, customer_id, total_amount ensures each order is unique because order_id is unique. If including the primary key defeats the purpose of your DISTINCT (you wanted to find duplicates at a different level of granularity), reconsider whether DISTINCT is the right tool — GROUP BY with HAVING COUNT(*) > 1 is better for finding genuine duplicates."
      />

      <Err
        msg="SELECT DISTINCT with ORDER BY error — ORDER BY column must appear in SELECT list"
        cause="In some databases (notably older MySQL versions and some SQL Server configurations), when using SELECT DISTINCT, all columns in ORDER BY must also appear in the SELECT list. This is logically required: if DISTINCT is deduplicating on specific columns, sorting by a column not in the SELECT list would produce an ambiguous result — the database does not know which instance of the duplicate value to use for sorting."
        fix="Add the ORDER BY column to the SELECT list: instead of SELECT DISTINCT city FROM customers ORDER BY loyalty_tier — which fails because loyalty_tier is not in the SELECT — use SELECT DISTINCT city, loyalty_tier FROM customers ORDER BY loyalty_tier, city. If you do not want loyalty_tier in the output, use GROUP BY instead: SELECT city FROM customers GROUP BY city ORDER BY MIN(loyalty_tier) — GROUP BY allows ordering by an aggregate of a non-selected column."
      />

      <HR />

      {/* ── Try It ── */}
      <TryItChallenge
        question="The FreshMart marketing team wants to understand their customer reach across India. Write three queries: (1) All distinct states where FreshMart has customers, sorted alphabetically. (2) The total count of distinct cities across all customers. (3) All distinct store-city combinations — which city each store is in — sorted by city."
        hint="Query 1: SELECT DISTINCT state FROM customers ORDER BY state. Query 2: SELECT COUNT(DISTINCT city) FROM customers. Query 3: SELECT DISTINCT store_id, city FROM stores ORDER BY city — use the stores table, not customers."
        answer={`-- Query 1: All distinct states
SELECT DISTINCT state
FROM customers
ORDER BY state;

-- Query 2: Total count of distinct cities
SELECT COUNT(DISTINCT city) AS total_cities
FROM customers;

-- Query 3: Store-city combinations from the stores table
SELECT DISTINCT store_id, city
FROM stores
ORDER BY city, store_id;`}
        explanation="Query 1 uses DISTINCT on state to find the unique set of states — eliminating repeated states from 20 customer rows down to a clean list. Query 2 uses COUNT(DISTINCT city) to get a single number — the cardinality of the city column. Query 3 uses the stores table (not customers) because we want the store-to-city mapping, not the customer-to-city mapping. Since each store has exactly one city, every row in stores is already unique — DISTINCT here is technically redundant but communicates intent clearly. All three are common patterns in any customer geography analysis."
      />

      <HR />

      {/* ── Key Takeaways ── */}
      <KeyTakeaways
        items={[
          'SELECT DISTINCT eliminates duplicate rows from the result. Each unique combination of the listed columns appears exactly once.',
          'DISTINCT applies to the full combination of ALL columns in SELECT — not to individual columns independently. Adding more columns to SELECT DISTINCT increases or maintains the result count, never decreases it.',
          'DISTINCT requires processing all result rows before returning any. It cannot return partial results early. On large tables this is expensive — always check whether an index covers the DISTINCT columns.',
          'COUNT(DISTINCT column) counts unique non-null values in a column. COUNT(*) counts all rows. COUNT(column) counts non-null values. All three answer different questions.',
          'DISTINCT and GROUP BY produce the same result for simple deduplication. Use DISTINCT for quick deduplication with no aggregation. Use GROUP BY when you need unique values plus any calculation (COUNT, SUM, AVG) per group.',
          'DISTINCT in a JOIN query is a warning sign — it usually means the JOIN is producing unexpected duplicates. Investigate and fix the JOIN rather than hiding duplicates with DISTINCT.',
          'The most valuable use of DISTINCT in professional work is schema exploration: run SELECT DISTINCT on key columns in a new table to discover all existing values, including unexpected typos, casing inconsistencies, and deprecated statuses.',
          'Low-cardinality columns (few distinct values like status, category, tier) are cheap to DISTINCT on. High-cardinality columns (many distinct values like email, order_id) are expensive without an index.',
          'DISTINCT excludes NULL from its deduplication — NULL is not considered equal to NULL for DISTINCT purposes. If your column has NULLs and you want them counted, use COALESCE to replace NULL with a sentinel value.',
          'Before writing any WHERE condition that filters on a column you are unfamiliar with, run SELECT DISTINCT column FROM table first — this reveals all actual values and prevents WHERE conditions that silently match nothing due to unexpected formatting.',
        ]}
      />

      {/* ── Next CTA ── */}
      <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 10, padding: '24px', marginTop: 40 }}>
        <p style={{ fontSize: 10, color: 'var(--muted)', letterSpacing: '.12em', textTransform: 'uppercase', fontFamily: 'var(--font-mono)', fontWeight: 700, margin: '0 0 10px' }}>What comes next</p>
        <p style={{ fontSize: 15, color: 'var(--text)', lineHeight: 1.85, margin: '0 0 20px' }}>
          In <strong>Module 11</strong>, you master NULL values completely — what NULL means, why it behaves differently from every other value, how it propagates through calculations and comparisons, and every technique for handling it correctly in your queries.
        </p>
        <Link href="/learn/sql/null-values" style={{ background: C, color: '#000', padding: '11px 24px', borderRadius: 7, fontWeight: 700, fontSize: 13, textDecoration: 'none', display: 'inline-block' }}>
          Module 11 → Working with NULL Values
        </Link>
      </div>

    </LearnLayout>
  );
}