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

export default function ComplexWhere() {
  return (
    <LearnLayout
      title="Complex WHERE — Combining Conditions"
      description="Mastering brackets, operator precedence, AND vs OR logic, multi-layer filters, and building WHERE clauses that express any business rule precisely"
      section="SQL — Module 17"
      readTime="30 min"
      updatedAt="April 2026"
    >

      {/* ── PART 01 ── */}
      <Part n="01" title="When Simple Conditions Are Not Enough" />

      <P>Module 06 taught you the WHERE clause with a single condition. Module 07 introduced AND, OR, and NOT. By now you have used them across dozens of queries. But real production queries combine all of these — often with four, five, or six conditions across multiple operators — and the way you structure those conditions determines whether your query is correct, readable, and maintainable.</P>

      <P>This module is about mastering the WHERE clause at the level required for production analytics work. Not just making queries that return results — making queries that return <Hl>exactly the right results</Hl>, are <Hl>immediately readable</Hl> by anyone on your team, and <Hl>do not break</Hl> when data or requirements change.</P>

      <P>The three skills this module builds:</P>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: 12, margin: '20px 0 32px' }}>
        {[
          { n: '01', title: 'Precedence mastery', desc: 'Know exactly what the database evaluates first — and use parentheses to make the order explicit and correct.' },
          { n: '02', title: 'Condition grouping', desc: 'Group related conditions with parentheses to express multi-dimensional business logic in a single WHERE clause.' },
          { n: '03', title: 'Readable structure', desc: 'Format complex WHERE clauses so they read like natural language and are easy to audit, debug, and modify.' },
        ].map(item => (
          <div key={item.n} style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 10, padding: '16px' }}>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: C, marginBottom: 8 }}>{item.n}</div>
            <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--text)', marginBottom: 6 }}>{item.title}</div>
            <div style={{ fontSize: 12, color: 'var(--muted)', lineHeight: 1.65 }}>{item.desc}</div>
          </div>
        ))}
      </div>

      <HR />

      {/* ── PART 02 ── */}
      <Part n="02" title="Precedence — The Exact Evaluation Order" />

      <P>SQL evaluates operators in a fixed precedence order — just like arithmetic. Understanding this order is not optional: it is the difference between a query that is correct and one that silently returns wrong data.</P>

      <div style={{ overflowX: 'auto', margin: '20px 0 28px' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
          <thead>
            <tr>
              {['Priority', 'Operator / Category', 'Examples', 'Evaluated'].map(h => (
                <th key={h} style={{ padding: '10px 14px', background: 'var(--surface)', color: 'var(--muted)', fontWeight: 700, textAlign: 'left', borderBottom: '1px solid var(--border)', fontSize: 11, textTransform: 'uppercase', letterSpacing: '.08em' }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {[
              ['1st (highest)', 'Parentheses', '(a OR b)', 'Always first — overrides everything'],
              ['2nd', 'Arithmetic', '+ - * / %', 'Before comparisons'],
              ['3rd', 'Comparisons', '= <> < > <= >= LIKE BETWEEN IN IS NULL', 'Produce TRUE/FALSE/NULL'],
              ['4th', 'NOT', 'NOT condition', 'Negates the immediately following condition'],
              ['5th', 'AND', 'cond1 AND cond2', 'Evaluated before OR'],
              ['6th (lowest)', 'OR', 'cond1 OR cond2', 'Evaluated last — loosest binding'],
            ].map(([pri, op, ex, when], i) => (
              <tr key={pri} style={{ background: i % 2 === 0 ? 'transparent' : 'var(--surface)' }}>
                <td style={{ padding: '10px 14px', fontFamily: 'var(--font-mono)', fontSize: 12, color: C, borderBottom: '1px solid var(--border)', whiteSpace: 'nowrap' }}>{pri}</td>
                <td style={{ padding: '10px 14px', fontSize: 13, fontWeight: 700, color: 'var(--text)', borderBottom: '1px solid var(--border)' }}>{op}</td>
                <td style={{ padding: '10px 14px', fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--muted)', borderBottom: '1px solid var(--border)' }}>{ex}</td>
                <td style={{ padding: '10px 14px', fontSize: 13, color: 'var(--muted)', borderBottom: '1px solid var(--border)', lineHeight: 1.6 }}>{when}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <H>The AND-before-OR rule in practice</H>
      <P>This is the rule that causes the most production bugs. AND binds more tightly than OR. When you write A OR B AND C, the database reads it as A OR (B AND C) — not (A OR B) AND C. These produce completely different results.</P>

      <SQLPlayground
        initialQuery={`-- The classic precedence bug
-- INTENTION: "Gold OR Platinum customers from Seattle"
-- ACTUAL: "All Gold customers (any city) + Platinum customers from Seattle"

SELECT first_name, city, loyalty_tier
FROM customers
WHERE loyalty_tier = 'Gold'
   OR loyalty_tier = 'Platinum'
  AND city = 'Seattle'
ORDER BY loyalty_tier, city;
-- Count the Gold customers from non-Seattle cities — they should not be here`}
        height={160}
        showSchema={true}
      />

      <SQLPlayground
        initialQuery={`-- CORRECT: parentheses enforce the intended grouping
-- Now both Gold AND Platinum require the Seattle condition

SELECT first_name, city, loyalty_tier
FROM customers
WHERE (loyalty_tier = 'Gold' OR loyalty_tier = 'Platinum')
  AND city = 'Seattle'
ORDER BY loyalty_tier;`}
        height={140}
        showSchema={false}
      />

      <P>Run both queries and compare the row counts. The first returns more rows — the extra rows are Gold customers from cities other than Seattle that should not appear. The second returns only what was intended.</P>

      <Callout type="warning">
        The AND-before-OR precedence bug is a <strong>silent data quality issue</strong> — the query runs without error and returns results that look plausible. The only way to catch it is to understand precedence rules and verify row counts against expectations. Always use parentheses when mixing AND and OR.
      </Callout>

      <HR />

      {/* ── PART 03 ── */}
      <Part n="03" title="Parentheses — The Tool for Explicit Grouping" />

      <P>Parentheses override all precedence rules. Anything inside parentheses is evaluated as a complete unit before being combined with conditions outside. They are the most important formatting tool for complex WHERE clauses — not just for correctness, but for readability.</P>

      <H>Single level of grouping</H>

      <SQLPlayground
        initialQuery={`-- Two groups connected by AND:
-- Group 1: store is ST001 OR ST005
-- Group 2: payment method is UPI OR Card
-- Both groups must be satisfied
SELECT order_id, store_id, payment_method, total_amount
FROM orders
WHERE (store_id = 'ST001' OR store_id = 'ST005')
  AND (payment_method = 'UPI' OR payment_method = 'Card')
ORDER BY store_id, total_amount DESC;`}
        height={145}
        showSchema={true}
      />

      <SQLPlayground
        initialQuery={`-- Problem order + high value:
-- Status is Cancelled or Returned
-- AND total above ₹500
SELECT order_id, order_date, order_status, total_amount
FROM orders
WHERE (order_status = 'Cancelled' OR order_status = 'Returned')
  AND total_amount > 500
ORDER BY total_amount DESC;`}
        height={135}
        showSchema={false}
      />

      <H>Multiple levels of grouping</H>

      <SQLPlayground
        initialQuery={`-- Multi-level: inner OR groups, outer AND conditions
-- (Seattle Platinum OR Austin Gold) AND joined after 2021
SELECT
  first_name || ' ' || last_name  AS customer,
  city,
  loyalty_tier,
  joined_date
FROM customers
WHERE (
    (city = 'Seattle' AND loyalty_tier = 'Platinum')
    OR
    (city = 'Austin' AND loyalty_tier = 'Gold')
  )
  AND joined_date >= '2022-01-01'
ORDER BY city;`}
        height={185}
        showSchema={false}
      />

      <SQLPlayground
        initialQuery={`-- Three-group complex filter:
-- (High-value delivered) OR (any cancelled above ₹300) OR (UPI orders from ST001)
SELECT order_id, store_id, order_status, payment_method, total_amount
FROM orders
WHERE (order_status = 'Delivered' AND total_amount > 1000)
   OR (order_status = 'Cancelled' AND total_amount > 300)
   OR (store_id = 'ST001' AND payment_method = 'UPI')
ORDER BY total_amount DESC;`}
        height={155}
        showSchema={false}
      />

      <ProTip>
        A useful mental model: read your WHERE clause in English first, identify every "and" and "or" in the business rule, then map them to parenthesised groups. "I want Gold or Platinum customers from Seattle who joined after 2021" breaks down as: (Gold OR Platinum) AND Seattle AND joined after 2021. Write the parentheses to match the English groupings, not to match the left-to-right order of the words.
      </ProTip>

      <HR />

      {/* ── PART 04 ── */}
      <Part n="04" title="AND vs OR — Narrowing vs Broadening" />

      <P>The mental model for AND and OR is simple but important to internalise deeply for complex queries.</P>

      <P><Hl>AND narrows.</Hl> Every AND condition you add reduces the number of rows returned. A row must satisfy ALL AND conditions to be included. Adding more AND conditions can only keep or reduce the result — never increase it.</P>

      <P><Hl>OR broadens.</Hl> Every OR condition you add potentially increases the number of rows returned. A row needs to satisfy ANY ONE OR condition to be included. Adding more OR conditions can only keep or increase the result — never reduce it.</P>

      <SQLPlayground
        initialQuery={`-- Demonstrate AND narrowing:
-- Each added AND reduces the result
SELECT COUNT(*) AS all_orders FROM orders;`}
        height={90}
        showSchema={true}
      />

      <SQLPlayground
        initialQuery={`SELECT COUNT(*) AS delivered FROM orders
WHERE order_status = 'Delivered';`}
        height={90}
        showSchema={false}
      />

      <SQLPlayground
        initialQuery={`SELECT COUNT(*) AS delivered_upi FROM orders
WHERE order_status = 'Delivered'
  AND payment_method = 'UPI';`}
        height={90}
        showSchema={false}
      />

      <SQLPlayground
        initialQuery={`SELECT COUNT(*) AS delivered_upi_high FROM orders
WHERE order_status = 'Delivered'
  AND payment_method = 'UPI'
  AND total_amount > 500;
-- Each AND reduces the count further`}
        height={100}
        showSchema={false}
      />

      <SQLPlayground
        initialQuery={`-- Demonstrate OR broadening:
-- Each added OR increases the result
SELECT COUNT(*) AS cancelled FROM orders
WHERE order_status = 'Cancelled';`}
        height={90}
        showSchema={false}
      />

      <SQLPlayground
        initialQuery={`SELECT COUNT(*) AS cancelled_or_returned FROM orders
WHERE order_status = 'Cancelled'
   OR order_status = 'Returned';
-- Count goes up — OR added more rows`}
        height={95}
        showSchema={false}
      />

      <SQLPlayground
        initialQuery={`SELECT COUNT(*) AS cancelled_returned_processing FROM orders
WHERE order_status = 'Cancelled'
   OR order_status = 'Returned'
   OR order_status = 'Processing';
-- Count goes up again`}
        height={100}
        showSchema={false}
      />

      <H>Using the narrowing/broadening model to debug</H>
      <P>When your query returns too many rows, look for OR conditions that should be AND. When it returns too few rows, look for AND conditions that should be OR — or for missing parentheses that are causing an AND to steal from your OR group.</P>

      <HR />

      {/* ── PART 05 ── */}
      <Part n="05" title="De Morgan's Laws — Rewriting NOT Conditions" />

      <P>De Morgan's Laws are logical identities that let you rewrite NOT expressions. They are useful when you want to simplify a complex NOT condition or convert between equivalent forms.</P>

      <CodeBlock
        label="De Morgan's Laws in SQL"
        code={`-- Law 1: NOT (A OR B) = NOT A AND NOT B
NOT (city = 'Seattle' OR city = 'New York')
-- is identical to:
city <> 'Seattle' AND city <> 'New York'

-- Law 2: NOT (A AND B) = NOT A OR NOT B
NOT (in_stock = true AND unit_price > 200)
-- is identical to:
in_stock = false OR unit_price <= 200

-- Practical use:
-- NOT IN is De Morgan applied: NOT IN (a, b, c) = <> a AND <> b AND <> c
-- That is why NOT IN with NULL fails (AND with NULL = NULL)`}
      />

      <SQLPlayground
        initialQuery={`-- Three equivalent ways to write the same filter:
-- Find customers NOT in the two largest metros

-- Version 1: NOT with OR group
SELECT COUNT(*) AS v1 FROM customers
WHERE NOT (city = 'Seattle' OR city = 'New York');`}
        height={100}
        showSchema={false}
      />

      <SQLPlayground
        initialQuery={`-- Version 2: De Morgan applied — NOT A AND NOT B
SELECT COUNT(*) AS v2 FROM customers
WHERE city <> 'Seattle'
  AND city <> 'New York';`}
        height={90}
        showSchema={false}
      />

      <SQLPlayground
        initialQuery={`-- Version 3: NOT IN
SELECT COUNT(*) AS v3 FROM customers
WHERE city NOT IN ('Seattle', 'New York');
-- All three return identical counts`}
        height={90}
        showSchema={false}
      />

      <P>All three produce the same result. Choose whichever reads most clearly for the specific condition. NOT IN is usually the most readable for lists. NOT (A OR B) is clearest when you want to emphasise "not any of these." The De Morgan equivalent is useful when you want to write positive conditions rather than negative ones.</P>

      <HR />

      {/* ── PART 06 ── */}
      <Part n="06" title="Translating Business Rules Into WHERE Clauses" />

      <P>The most valuable skill in this module is the ability to read a business requirement written in plain English and translate it directly into a correctly structured WHERE clause. Here is the systematic process.</P>

      <H>Step 1 — identify the entities and their conditions</H>
      <P>Read the requirement and underline every condition. Each condition becomes a comparison expression. The words "and", "or", and "not" become AND, OR, and NOT. The words "either...or", "any of", and "one of" indicate OR. The words "both", "all of", "must also" indicate AND.</P>

      <H>Step 2 — identify the groupings</H>
      <P>Look for conditions that belong together as a unit — connected by OR within a larger AND structure. These become parenthesised groups. Read the requirement in English and identify where the "and" applies to the whole phrase versus just the last part.</P>

      <H>Step 3 — write the WHERE clause with explicit parentheses</H>
      <P>Write each group in parentheses. Connect groups with AND or OR. Always use parentheses even when precedence would give the correct result — explicit is always better than implicit.</P>

      <H>Worked examples</H>

      <div style={{ background: 'var(--surface)', border: `1px solid ${C}20`, borderRadius: 10, padding: '20px 24px', margin: '20px 0 24px' }}>
        <p style={{ fontSize: 11, color: C, fontFamily: 'var(--font-mono)', fontWeight: 700, margin: '0 0 12px', textTransform: 'uppercase', letterSpacing: '.1em' }}>Business Rule 01</p>
        <p style={{ fontSize: 14, color: 'var(--text)', fontStyle: 'italic', lineHeight: 1.7, margin: '0 0 14px' }}>"Find all delivered orders paid by UPI OR Card, where the total is above ₹500, placed in January or February 2024."</p>
        <p style={{ fontSize: 13, color: 'var(--muted)', lineHeight: 1.7, margin: 0 }}>
          Groups: (UPI OR Card) AND total &gt; 500 AND (Jan OR Feb 2024)
        </p>
      </div>

      <SQLPlayground
        initialQuery={`SELECT order_id, order_date, payment_method, total_amount
FROM orders
WHERE order_status = 'Delivered'
  AND (payment_method = 'UPI' OR payment_method = 'Card')
  AND total_amount > 500
  AND (
    (order_date >= '2024-01-01' AND order_date < '2024-02-01')
    OR
    (order_date >= '2024-02-01' AND order_date < '2024-03-01')
  )
ORDER BY total_amount DESC;`}
        height={175}
        showSchema={true}
      />

      <div style={{ background: 'var(--surface)', border: `1px solid ${C}20`, borderRadius: 10, padding: '20px 24px', margin: '28px 0 24px' }}>
        <p style={{ fontSize: 11, color: C, fontFamily: 'var(--font-mono)', fontWeight: 700, margin: '0 0 12px', textTransform: 'uppercase', letterSpacing: '.1em' }}>Business Rule 02</p>
        <p style={{ fontSize: 14, color: 'var(--text)', fontStyle: 'italic', lineHeight: 1.7, margin: '0 0 14px' }}>"Find products that either: (a) are out of stock AND have a margin above 25%, OR (b) are in stock AND priced below ₹30."</p>
        <p style={{ fontSize: 13, color: 'var(--muted)', lineHeight: 1.7, margin: 0 }}>
          Groups: (out-of-stock AND high-margin) OR (in-stock AND cheap)
        </p>
      </div>

      <SQLPlayground
        initialQuery={`SELECT
  product_name,
  brand,
  unit_price,
  in_stock,
  ROUND((unit_price - cost_price) / unit_price * 100, 1)  AS margin_pct
FROM products
WHERE (
    in_stock = false
    AND (unit_price - cost_price) / unit_price > 0.25
  )
  OR (
    in_stock = true
    AND unit_price < 30
  )
ORDER BY in_stock, margin_pct DESC;`}
        height={195}
        showSchema={false}
      />

      <div style={{ background: 'var(--surface)', border: `1px solid ${C}20`, borderRadius: 10, padding: '20px 24px', margin: '28px 0 24px' }}>
        <p style={{ fontSize: 11, color: C, fontFamily: 'var(--font-mono)', fontWeight: 700, margin: '0 0 12px', textTransform: 'uppercase', letterSpacing: '.1em' }}>Business Rule 03</p>
        <p style={{ fontSize: 14, color: 'var(--text)', fontStyle: 'italic', lineHeight: 1.7, margin: '0 0 14px' }}>"Find employees who are either Store Managers with salary above ₹50,000, OR Cashiers in Seattle stores, OR any employee hired before 2020 earning more than ₹60,000."</p>
        <p style={{ fontSize: 13, color: 'var(--muted)', lineHeight: 1.7, margin: 0 }}>
          Three OR groups, each group has internal AND conditions
        </p>
      </div>

      <SQLPlayground
        initialQuery={`SELECT
  e.first_name || ' ' || e.last_name  AS employee,
  e.role,
  e.salary,
  e.hire_date,
  s.city
FROM employees AS e
JOIN stores AS s ON e.store_id = s.store_id
WHERE (e.role = 'Store Manager' AND e.salary > 50000)
   OR (e.role = 'Cashier' AND s.city = 'Seattle')
   OR (e.hire_date < '2020-01-01' AND e.salary > 60000)
ORDER BY e.salary DESC;`}
        height={195}
        showSchema={false}
      />

      <HR />

      {/* ── PART 07 ── */}
      <Part n="07" title="Formatting Complex WHERE Clauses for Readability" />

      <P>A WHERE clause that is logically correct but unreadable is a maintenance liability. Six months from now, a colleague — or you — will need to modify it, and an unreadable WHERE clause gets misread and broken. Professional SQL formatting makes complex conditions immediately scannable.</P>

      <H>The conventions</H>

      <CodeBlock
        label="Professional formatting for complex WHERE clauses"
        code={`-- Convention 1: AND/OR at the START of each line
-- Makes it easy to comment out individual conditions
WHERE order_status = 'Delivered'
  AND payment_method = 'UPI'
  AND total_amount > 500

-- Convention 2: Indent grouped conditions
-- The indentation shows which conditions are inside which group
WHERE (order_status = 'Cancelled' OR order_status = 'Returned')
  AND total_amount > 300

-- Convention 3: Align opening parentheses with the operator before them
WHERE (city = 'Seattle' AND loyalty_tier = 'Platinum')
   OR (city = 'Austin' AND loyalty_tier = 'Gold')

-- Convention 4: Multi-line groups use consistent indentation
WHERE (
    (city = 'Seattle' AND loyalty_tier = 'Platinum')
    OR
    (city = 'Austin' AND loyalty_tier = 'Gold')
  )
  AND joined_date >= '2022-01-01'

-- Convention 5: Comment the business rule above the WHERE
-- "Active high-value delivered orders from metro stores"
WHERE order_status = 'Delivered'
  AND total_amount > 1000
  AND store_id IN ('ST001', 'ST002', 'ST005')`}
      />

      <H>Before and after — the same logic, two readability levels</H>

      <CodeBlock
        label="Before — correct but unreadable"
        code={`SELECT * FROM orders WHERE order_status='Delivered' AND payment_method IN ('UPI','Card') AND total_amount>500 AND store_id IN ('ST001','ST005','ST008') OR order_status='Processing' AND total_amount>200 ORDER BY total_amount DESC;`}
      />

      <CodeBlock
        label="After — same logic, professional formatting"
        code={`-- Delivered high-value digital orders from key stores,
-- OR any processing order above ₹200
SELECT *
FROM orders
WHERE (
    order_status = 'Delivered'
    AND payment_method IN ('UPI', 'Card')
    AND total_amount > 500
    AND store_id IN ('ST001', 'ST005', 'ST008')
  )
  OR (
    order_status = 'Processing'
    AND total_amount > 200
  )
ORDER BY total_amount DESC;`}
      />

      <P>The second version takes 5 seconds longer to write and saves 5 minutes every time someone reads or modifies it. In a shared codebase or data team, the formatted version is the only acceptable standard.</P>

      <HR />

      {/* ── PART 08 ── */}
      <Part n="08" title="Debugging Complex WHERE Clauses" />

      <P>When a complex WHERE returns wrong results — too many rows, too few rows, or rows that should not be there — here is the systematic debugging process.</P>

      <H>Step 1 — verify the row count expectation</H>
      <P>Before you can say a result is wrong, you need to know what is right. Run COUNT(*) with a mental estimate: "I expect about 8 rows from this filter." If you get 15, the filter is too broad. If you get 2, it is too narrow.</P>

      <H>Step 2 — test each condition group in isolation</H>
      <P>Replace the full WHERE with each group independently and check how many rows each group returns. This identifies which group is misbehaving.</P>

      <SQLPlayground
        initialQuery={`-- Debugging technique: test each group separately

-- Group 1 alone: how many delivered UPI orders?
SELECT COUNT(*) AS group1
FROM orders
WHERE order_status = 'Delivered'
  AND payment_method = 'UPI';`}
        height={110}
        showSchema={true}
      />

      <SQLPlayground
        initialQuery={`-- Group 2 alone: how many cancelled orders above ₹500?
SELECT COUNT(*) AS group2
FROM orders
WHERE order_status = 'Cancelled'
  AND total_amount > 500;`}
        height={100}
        showSchema={false}
      />

      <SQLPlayground
        initialQuery={`-- Combined: should be group1 + group2 (with OR)
-- But might differ if rows satisfy BOTH conditions
SELECT COUNT(*) AS combined
FROM orders
WHERE (order_status = 'Delivered' AND payment_method = 'UPI')
   OR (order_status = 'Cancelled' AND total_amount > 500);`}
        height={110}
        showSchema={false}
      />

      <H>Step 3 — add SELECT columns to see what is being included</H>
      <P>Remove any LIMIT and look at the actual rows being returned. Compare them against your expectation. A row that should not be there tells you which condition is too permissive.</P>

      <H>Step 4 — add conditions one at a time</H>
      <P>Start with the simplest version of the WHERE clause and add conditions one by one, checking the row count after each addition. The count should narrow monotonically as you add AND conditions. If it unexpectedly broadens, you have accidentally used OR when you meant AND.</P>

      <SQLPlayground
        initialQuery={`-- Build the filter incrementally:
-- Step 1: start broad
SELECT COUNT(*) AS step1 FROM orders
WHERE order_status = 'Delivered';`}
        height={90}
        showSchema={false}
      />

      <SQLPlayground
        initialQuery={`-- Step 2: add AND (count should decrease or stay same)
SELECT COUNT(*) AS step2 FROM orders
WHERE order_status = 'Delivered'
  AND payment_method = 'UPI';`}
        height={90}
        showSchema={false}
      />

      <SQLPlayground
        initialQuery={`-- Step 3: add AND (count should decrease or stay same)
SELECT COUNT(*) AS step3 FROM orders
WHERE order_status = 'Delivered'
  AND payment_method = 'UPI'
  AND total_amount > 800;
-- If count goes UP between steps, you accidentally wrote OR instead of AND`}
        height={100}
        showSchema={false}
      />

      <ProTip>
        The fastest debugging technique for a complex WHERE: temporarily replace the SELECT columns with SELECT *, remove LIMIT, and scan the results for any row that should obviously not be there. A Gold customer from Delhi appearing in a "Platinum Seattle customers" query tells you immediately that the loyalty_tier condition or the city condition has a precedence bug. One wrong row is usually enough to identify the broken condition.
      </ProTip>

      <HR />

      {/* ── PART 09 ── */}
      <Part n="09" title="Short-Circuit Evaluation and Performance" />

      <P>SQL databases use <Hl>short-circuit evaluation</Hl> for WHERE conditions — once the result of an expression is determined, remaining conditions may not be evaluated. This has performance implications for complex WHERE clauses.</P>

      <H>AND short-circuit — FALSE stops evaluation</H>
      <P>For AND conditions, if any condition is FALSE, the entire AND expression is FALSE — remaining conditions do not need to be evaluated. The database typically evaluates the cheapest or most selective condition first (when conditions are independent), using query optimiser statistics to determine which condition eliminates the most rows.</P>

      <H>OR short-circuit — TRUE stops evaluation</H>
      <P>For OR conditions, if any condition is TRUE, the entire OR expression is TRUE — remaining conditions are skipped. Put the most commonly satisfied condition first in an OR chain.</P>

      <H>Ordering conditions for performance</H>
      <P>While the query optimiser handles most reordering automatically, these manual guidelines help when the optimiser cannot reorder (due to side effects or complex expressions):</P>

      <CodeBlock
        label="Condition ordering for performance"
        code={`-- For AND chains: put the most selective condition first
-- Most selective = eliminates the most rows
WHERE order_id = 1007          -- PK lookup: eliminates all but 1 row (BEST FIRST)
  AND order_status = 'Delivered' -- secondary condition on surviving row

-- For OR chains: put the most commonly satisfied condition first
-- Most common = TRUE for the most rows
WHERE order_status = 'Delivered'   -- ~60% of rows (most common → check first)
   OR order_status = 'Processing'  -- ~20% of rows
   OR order_status = 'Cancelled'   -- ~15% of rows
   OR order_status = 'Returned'    -- ~5% of rows (least common → check last)

-- Avoid expensive functions on the left side of AND
-- Put cheap comparisons first, expensive calculations after
WHERE customer_id = 42            -- index lookup, cheap (FIRST)
  AND ROUND(salary / 12.0, 2) > 5000  -- calculation, slightly more expensive (AFTER)`}
      />

      <Callout type="info">
        Modern query optimisers (PostgreSQL, MySQL) automatically reorder independent WHERE conditions for optimal performance based on table statistics. Manual ordering matters most for conditions that cannot be reordered — those with side effects, functions that cannot be pushed down, or when you are writing conditions the optimiser cannot statistically evaluate. When in doubt, write conditions in the order that is most readable, and use EXPLAIN ANALYZE to verify the actual execution plan.
      </Callout>

      <HR />

      {/* ── PART 10 ── */}
      <Part n="10" title="Real Production WHERE Clauses" />

      <P>Here are complete, production-quality complex WHERE clauses with real business context.</P>

      <H>Fraud detection — suspicious order pattern</H>

      <SQLPlayground
        initialQuery={`-- Orders that match a fraud pattern:
-- High value COD orders from the same customer in a short window
-- OR cancelled orders that were previously refunded (returned)
SELECT
  o.order_id,
  o.customer_id,
  o.store_id,
  o.order_date,
  o.order_status,
  o.payment_method,
  o.total_amount
FROM orders AS o
WHERE (
    o.payment_method = 'COD'
    AND o.total_amount > 1500
    AND o.order_status IN ('Cancelled', 'Returned')
  )
  OR (
    o.order_status = 'Returned'
    AND o.total_amount > 800
  )
ORDER BY o.total_amount DESC;`}
        height={220}
        showSchema={true}
      />

      <H>Campaign targeting — multi-segment customer list</H>

      <SQLPlayground
        initialQuery={`-- Campaign segments:
-- Segment A: Platinum customers anywhere (VIP treatment)
-- Segment B: Gold customers in metro cities who joined recently
-- Segment C: Silver customers with long tenure (loyalty reward)
SELECT
  c.customer_id,
  c.first_name || ' ' || c.last_name  AS customer,
  c.city,
  c.loyalty_tier,
  c.joined_date,
  CASE
    WHEN c.loyalty_tier = 'Platinum' THEN 'Segment A'
    WHEN c.loyalty_tier = 'Gold'
     AND c.city IN ('Seattle','New York','Delhi','Austin') THEN 'Segment B'
    ELSE 'Segment C'
  END  AS campaign_segment
FROM customers AS c
WHERE c.loyalty_tier = 'Platinum'
   OR (
    c.loyalty_tier = 'Gold'
    AND c.city IN ('Seattle', 'New York', 'Delhi', 'Austin')
    AND c.joined_date >= '2022-01-01'
  )
   OR (
    c.loyalty_tier = 'Silver'
    AND c.joined_date < '2022-01-01'
  )
ORDER BY campaign_segment, c.loyalty_tier;`}
        height={270}
        showSchema={false}
      />

      <H>Inventory alert — multi-condition product filter</H>

      <SQLPlayground
        initialQuery={`-- Products needing attention:
-- (Out of stock AND high margin) needs urgent restock
-- (In stock AND very low margin AND expensive) needs pricing review
-- (In stock AND category is Dairy AND price > 100) premium dairy check
SELECT
  product_name,
  category,
  brand,
  unit_price,
  in_stock,
  ROUND((unit_price - cost_price) / unit_price * 100, 1)  AS margin_pct
FROM products
WHERE (
    in_stock = false
    AND (unit_price - cost_price) / unit_price > 0.30
  )
  OR (
    in_stock = true
    AND (unit_price - cost_price) / unit_price < 0.12
    AND unit_price > 100
  )
  OR (
    in_stock = true
    AND category = 'Dairy'
    AND unit_price > 100
  )
ORDER BY in_stock, margin_pct;`}
        height={250}
        showSchema={false}
      />

      <HR />

      {/* ── PART 11 ── */}
      <Part n="11" title="What This Looks Like at Work" />

      <P>You are an analyst at Venmo, India's largest UPI payments platform. The risk team sends a request: they need a list of transactions matching a specific suspicious pattern for manual review. The pattern has multiple conditions across three dimensions — amount, timing, and transaction type.</P>

      <TimeBlock time="2:00 PM" label="Risk team requirement arrives">
        The risk manager describes the pattern in plain English: "We want transactions that are either: (1) UPI transactions above ₹50,000 at any merchant, (2) transactions between ₹10,000 and ₹50,000 where the same user made more than 3 transactions in a single day, or (3) any wallet transfer to a new account where the receiver joined in the last 30 days AND the amount is above ₹5,000."
      </TimeBlock>

      <TimeBlock time="2:20 PM" label="You translate the requirement">
        You identify three OR groups, each with internal AND conditions. You adapt this to the FreshCart schema for illustration.
      </TimeBlock>

      <SQLPlayground
        initialQuery={`-- Adapted fraud pattern for FreshCart orders:
-- Group 1: Very high value COD orders (cash fraud risk)
-- Group 2: Multiple orders from same customer in same day
-- Group 3: New customers with large first orders

SELECT
  o.order_id,
  o.customer_id,
  o.order_date,
  o.payment_method,
  o.total_amount,
  o.order_status,
  CASE
    WHEN o.payment_method = 'COD' AND o.total_amount > 1500
      THEN 'High-Value COD'
    WHEN o.total_amount BETWEEN 500 AND 1500
     AND o.order_status IN ('Cancelled','Returned')
      THEN 'Mid-Value Problem'
    ELSE 'New Customer Large Order'
  END  AS risk_flag
FROM orders AS o
JOIN customers AS c ON o.customer_id = c.customer_id
WHERE (
    o.payment_method = 'COD'
    AND o.total_amount > 1500
  )
  OR (
    o.total_amount BETWEEN 500 AND 1500
    AND o.order_status IN ('Cancelled', 'Returned')
  )
  OR (
    c.joined_date >= '2023-06-01'
    AND o.total_amount > 1000
    AND o.order_status = 'Delivered'
  )
ORDER BY o.total_amount DESC;`}
        height={290}
        showSchema={true}
      />

      <TimeBlock time="2:45 PM" label="Query verified and delivered">
        You verify each group in isolation before combining them — group 1 returns 3 rows, group 2 returns 4 rows, group 3 returns 6 rows. Combined with OR they produce 11 rows (some overlap). You add a CASE WHEN to flag which risk pattern triggered each row. The risk team gets an immediately actionable list with risk labels — no manual categorisation needed.
      </TimeBlock>

      <HR />

      {/* ── PART 12 — Interview Prep ── */}
      <Part n="12" title="Interview Prep — 5 Questions With Complete Answers" />

      <IQ q="What is operator precedence in SQL WHERE clauses and why does it cause bugs?">
        <p style={{ margin: '0 0 14px' }}>Operator precedence determines the order in which SQL evaluates logical operators when multiple operators appear in the same WHERE clause without explicit parentheses. The order is: parentheses first (highest), then arithmetic operators, then comparison operators (=, &lt;&gt;, LIKE, BETWEEN, IN, IS NULL), then NOT, then AND, and finally OR (lowest). This means AND binds more tightly than OR.</p>
        <p style={{ margin: '0 0 14px' }}>The most common precedence bug arises when mixing AND and OR without parentheses. WHERE tier = 'Gold' OR tier = 'Platinum' AND city = 'Seattle' is evaluated as WHERE tier = 'Gold' OR (tier = 'Platinum' AND city = 'Seattle') — because AND is evaluated before OR. This returns all Gold customers from any city, plus Platinum customers only from Seattle. The intended query — Gold or Platinum customers from Seattle — requires explicit parentheses: WHERE (tier = 'Gold' OR tier = 'Platinum') AND city = 'Seattle'.</p>
        <p style={{ margin: 0 }}>The bug is insidious because the query runs without error and returns results that look plausible — it just returns more rows than intended. Without knowing the exact expected count, the bug is invisible. The prevention is simple: always use explicit parentheses when mixing AND and OR in the same WHERE clause. Even when precedence would give the correct result, parentheses make the intent clear and prevent future bugs when conditions are modified.</p>
      </IQ>

      <IQ q="How do you translate a complex business rule into a correctly structured WHERE clause?">
        <p style={{ margin: '0 0 14px' }}>The systematic process: first, read the business rule in plain English and identify every condition. Each condition becomes a comparison expression. The words "and", "both", "must also" map to AND. The words "or", "either...or", "any of" map to OR. The word "not" maps to NOT.</p>
        <p style={{ margin: '0 0 14px' }}>Second, identify the groupings — which conditions belong together as a unit before being combined with others. In the rule "Gold or Platinum customers from Seattle who joined after 2021," the "from Seattle" and "joined after 2021" apply to the combined (Gold OR Platinum) group — not just to Platinum. The parenthesised structure is: (Gold OR Platinum) AND Seattle AND after 2021.</p>
        <p style={{ margin: 0 }}>Third, write the WHERE clause with explicit parentheses matching the English groupings: WHERE (loyalty_tier = 'Gold' OR loyalty_tier = 'Platinum') AND city = 'Seattle' AND joined_date {'>'}= '2022-01-01'. Fourth, verify by running COUNT(*) with each condition group in isolation, then combined, and checking that each count makes sense. A quick sanity check: does each row in the result satisfy all the conditions described in the business rule? Sample 5 rows and verify manually. This four-step process — identify, group, write, verify — works for any business rule regardless of complexity.</p>
      </IQ>

      <IQ q="What are De Morgan's Laws and how are they useful in SQL?">
        <p style={{ margin: '0 0 14px' }}>De Morgan's Laws are logical identities that describe how NOT distributes over AND and OR. Law 1: NOT (A OR B) equals NOT A AND NOT B. Law 2: NOT (A AND B) equals NOT A OR NOT B. These identities mean you can always rewrite a NOT expression over a group by distributing the NOT into each sub-expression and flipping OR to AND (or AND to OR).</p>
        <p style={{ margin: '0 0 14px' }}>In SQL, De Morgan's Laws explain the equivalence between different ways of writing exclusion conditions. NOT IN (a, b, c) is exactly De Morgan applied: it expands to NOT (col = a OR col = b OR col = c), which by De Morgan equals col &lt;&gt; a AND col &lt;&gt; b AND col &lt;&gt; c. This also explains why NOT IN fails when the list contains NULL — the col &lt;&gt; NULL term always evaluates to NULL, making the entire AND expression NULL for every row.</p>
        <p style={{ margin: 0 }}>Practical uses in SQL: simplifying double negatives (NOT (NOT condition) = condition), rewriting NOT IN as explicit AND chains for clarity or portability, and understanding why NOT with OR behaves differently than expected. When debugging a NOT condition that excludes more rows than expected, apply De Morgan to rewrite it in positive terms — the positive form is usually easier to reason about. WHERE NOT (status = 'Cancelled' OR status = 'Returned') rewritten as WHERE status &lt;&gt; 'Cancelled' AND status &lt;&gt; 'Returned' makes it immediately clear which values are excluded.</p>
      </IQ>

      <IQ q="How do you debug a WHERE clause that returns the wrong number of rows?">
        <p style={{ margin: '0 0 14px' }}>The systematic debugging process starts with establishing the expected count. Before declaring the result wrong, calculate what you expect: "This table has 30 orders. About 18 are delivered. Of those, maybe 8 were paid by UPI. Of those, maybe 4 were above ₹500." If the query returns 12 instead of 4, the filter is too broad.</p>
        <p style={{ margin: '0 0 14px' }}>Next, test each condition group in isolation. Replace the full WHERE with just the first group and run COUNT(*). Then test the second group alone. Then combine them. For AND chains, each added condition should reduce or maintain the count. If adding a condition increases the count, you accidentally wrote OR. For OR chains, each added alternative should increase or maintain the count. If adding an OR alternative reduces the count, you have a precedence issue where AND is stealing from your OR group.</p>
        <p style={{ margin: 0 }}>The most effective visual debugging technique: SELECT * from the full query (remove LIMIT) and scan the results for any row that obviously should not be there. A Gold customer from Delhi in a "Platinum Seattle customers" result immediately identifies a missing parenthesis around the loyalty tier OR condition. One wrong row tells you more than a count discrepancy because you can see exactly which condition failed for that specific row. Once identified, fix the condition, rerun, and verify the count matches the expectation before closing the debug session.</p>
      </IQ>

      <IQ q="When should you split a complex WHERE into a subquery or CTE instead of keeping it in one WHERE clause?">
        <p style={{ margin: '0 0 14px' }}>A single WHERE clause is appropriate when all conditions apply directly to columns in the available tables, the conditions are logically parallel (all ANDs, or a flat list of ORs), and the number of conditions is manageable — typically fewer than six to eight conditions. Single-level WHERE clauses with good formatting remain readable and maintainable up to this complexity.</p>
        <p style={{ margin: '0 0 14px' }}>A subquery or CTE (WITH clause) is better when: you need to filter on the result of an aggregation (WHERE total_orders {'>'} 5 — requires counting first), the filter depends on a derived value that appears in multiple conditions (defining margin_pct once and using it in two conditions avoids repeating the expression), or the logic has two clearly distinct phases (first identify the qualifying customers, then get their orders) that would be clearer as separate steps.</p>
        <p style={{ margin: 0 }}>A CTE specifically helps when the same complex condition needs to be reused — define it once in WITH and reference it cleanly in the main query. It also helps when the WHERE conditions are so numerous that even well-formatted parentheses become hard to follow. As a practical rule: if you cannot explain what your WHERE clause does in one sentence, consider whether a CTE would make the steps explicit and self-documenting. The goal is always a query that any analyst on your team can read and immediately understand — formatting, parentheses, and CTE decomposition are all tools toward that goal.</p>
      </IQ>

      <HR />

      {/* ── Error Library ── */}
      <Part n="13" title="Errors You Will Hit — And Exactly Why They Happen" />

      <Err
        msg="Query returns more rows than expected — Gold customers from other cities appear in a Seattle-only result"
        cause="Operator precedence bug: AND evaluated before OR. WHERE tier = 'Gold' OR tier = 'Platinum' AND city = 'Seattle' evaluates as WHERE tier = 'Gold' OR (tier = 'Platinum' AND city = 'Seattle'). The AND only binds to the Platinum condition, not the Gold condition. Gold customers from any city are returned because there is no city restriction on the Gold side of the OR."
        fix="Add parentheses to group the OR conditions first: WHERE (tier = 'Gold' OR tier = 'Platinum') AND city = 'Seattle'. Run COUNT(*) with and without the parentheses to verify the row count difference matches your expectation. As a general rule: any time you mix AND and OR in the same WHERE clause, add parentheses around every OR group regardless of whether precedence would technically give the correct result."
      />

      <Err
        msg="Removing one condition causes the row count to increase — adding AND returns more rows than without it"
        cause="You accidentally wrote OR when you meant AND, or you have a parenthesisation error where an AND is inside an OR group that makes it less restrictive than intended. For example: WHERE (status = 'Delivered' AND amount > 500) OR store_id = 'ST001' — removing the AND amount > 500 condition does not change the OR group's store_id = 'ST001' branch, so the overall count depends on what you removed from which branch."
        fix="Test each condition group in isolation to identify which group is behaving unexpectedly. For each group, run SELECT COUNT(*) FROM table WHERE [group] and compare to your mental model. Then verify the combined query's count is consistent with the isolated counts. If adding a condition to an AND chain increases the count, you have an OR hiding inside the chain — check for missing parentheses."
      />

      <Err
        msg="Complex WHERE is correct but nobody on the team understands it — causes a breaking change when modified"
        cause="Poorly formatted WHERE clause with no parentheses, no line breaks, and no comments. When conditions are all on one line with mixed AND/OR, even the original author cannot reliably modify it without introducing a bug. This is a code quality issue, not a SQL error — but it causes real production incidents when someone modifies the condition incorrectly."
        fix="Reformat the WHERE clause: one condition per line, AND/OR at the start of each line, explicit parentheses around every OR group, and a comment above the WHERE block describing the business rule in plain English. If the conditions represent logically distinct segments, consider extracting them into a CTE (WITH clause) with descriptive names. A WHERE clause that takes 2 minutes to write correctly and 2 seconds to read is infinitely better than one that takes 30 seconds to write and 5 minutes to reason about."
      />

      <Err
        msg="NOT condition excludes rows that should be included — WHERE NOT (status = 'Cancelled' OR status = 'Returned') misses NULL status rows"
        cause="NOT propagates NULL. Rows where order_status IS NULL evaluate as: NOT (NULL = 'Cancelled' OR NULL = 'Returned') = NOT (NULL OR NULL) = NOT NULL = NULL. The WHERE clause discards all NULL results, so rows with NULL status are silently excluded. They are neither Cancelled nor Returned — but they are also not included in the NOT result."
        fix="Add explicit OR IS NULL handling: WHERE (order_status NOT IN ('Cancelled', 'Returned') OR order_status IS NULL). Or use the De Morgan equivalent: WHERE order_status &lt;&gt; 'Cancelled' AND order_status &lt;&gt; 'Returned' OR order_status IS NULL. To diagnose: run SELECT COUNT(*) FROM orders WHERE order_status IS NULL — if this returns any rows, your NOT condition is excluding them silently."
      />

      <Err
        msg="Query is slow after adding multiple OR conditions — execution time jumps from 0.1s to 45s"
        cause="OR conditions prevent index optimisation across the full condition. With a single condition WHERE status = 'Delivered', the database uses an index on status. With multiple OR conditions across different columns — WHERE status = 'Delivered' OR payment_method = 'UPI' OR store_id = 'ST001' — the database cannot use a single index to satisfy all three alternatives and may resort to a full table scan for each OR branch or the entire condition."
        fix="Several approaches depending on the data size: (1) UNION ALL: run each OR branch as a separate query and combine results — each sub-query can use its own index. SELECT * FROM orders WHERE status = 'Delivered' UNION ALL SELECT * FROM orders WHERE payment_method = 'UPI' UNION ALL SELECT * FROM orders WHERE store_id = 'ST001'. (2) Add a composite index that covers the most common combination. (3) Analyse with EXPLAIN ANALYZE to confirm which conditions are causing the scan and whether indexes exist on those columns. OR-based queries are inherently harder to optimise than AND-based queries — the query optimiser has fewer options."
      />

      <HR />

      {/* ── Try It ── */}
      <TryItChallenge
        question="The FreshCart operations director needs a priority order list with three tiers. Write a single query that returns orders matching ANY of these three conditions: (1) High-priority: Cancelled or Returned orders above ₹800 from stores ST001, ST005, or ST009. (2) Medium-priority: Processing orders older than order_id 1010 with UPI payment. (3) Low-priority: Delivered orders in January 2024 with total above ₹1,200. Show order_id, store_id, order_date, order_status, payment_method, total_amount, and a priority column using CASE WHEN. Sort by priority ascending then total_amount descending."
        hint="Three OR groups each with internal AND conditions. CASE WHEN for priority labelling. The CASE for priority should mirror the three OR groups. Order by CASE WHEN priority THEN 1/2/3 END for the sort."
        answer={`SELECT
  order_id,
  store_id,
  order_date,
  order_status,
  payment_method,
  total_amount,
  CASE
    WHEN order_status IN ('Cancelled','Returned')
     AND total_amount > 800
     AND store_id IN ('ST001','ST005','ST009')    THEN 'High'
    WHEN order_status = 'Processing'
     AND order_id > 1010
     AND payment_method = 'UPI'                   THEN 'Medium'
    ELSE                                               'Low'
  END  AS priority
FROM orders
WHERE (
    order_status IN ('Cancelled', 'Returned')
    AND total_amount > 800
    AND store_id IN ('ST001', 'ST005', 'ST009')
  )
  OR (
    order_status = 'Processing'
    AND order_id > 1010
    AND payment_method = 'UPI'
  )
  OR (
    order_status = 'Delivered'
    AND order_date BETWEEN '2024-01-01' AND '2024-01-31'
    AND total_amount > 1200
  )
ORDER BY
  CASE priority
    WHEN 'High'   THEN 1
    WHEN 'Medium' THEN 2
    ELSE               3
  END,
  total_amount DESC;`}
        explanation="This query demonstrates the full complex WHERE toolkit. Three OR groups each with internal AND conditions — parentheses are essential to prevent AND from stealing conditions from adjacent OR branches. The CASE WHEN in SELECT mirrors the OR groups exactly — each branch matches one group's conditions. ORDER BY uses a CASE to convert the text priority label into a sortable number (1, 2, 3). Note that the CASE in ORDER BY cannot reference the 'priority' SELECT alias — the CASE must be repeated because ORDER BY, despite running after SELECT, cannot always use computed column aliases inside expressions. Alternatively, you could wrap the entire query in a CTE and ORDER BY the alias in the outer query."
      />

      <HR />

      {/* ── Key Takeaways ── */}
      <KeyTakeaways
        items={[
          'Operator precedence order: parentheses → arithmetic → comparisons → NOT → AND → OR. AND always evaluates before OR when no parentheses are present.',
          'The most common production bug: WHERE tier = \'Gold\' OR tier = \'Platinum\' AND city = \'Seattle\' is not "(Gold OR Platinum) AND Seattle" — AND runs first, making it "Gold (any city) OR (Platinum AND Seattle)."',
          'Always use explicit parentheses when mixing AND and OR. Even when precedence gives the correct answer, parentheses communicate intent and prevent future bugs when conditions are modified.',
          'AND narrows: every added AND can only reduce or maintain the result count. OR broadens: every added OR can only increase or maintain the result count. If adding AND increases the count, you have an OR where you meant AND.',
          'De Morgan\'s Laws: NOT (A OR B) = NOT A AND NOT B. NOT (A AND B) = NOT A OR NOT B. Use these to rewrite NOT conditions into equivalent positive forms for clarity.',
          'Translate business rules systematically: identify every condition, map "and/both/must" to AND and "or/either/any" to OR, identify which conditions group together, then write WITH explicit parentheses matching the English groupings.',
          'Format WHERE clauses professionally: one condition per line, AND/OR at the start of each line, indented groups, comments above the WHERE block describing the business rule.',
          'Debug by isolation: test each condition group alone with COUNT(*), then combine. For AND chains, count should decrease with each condition added. If it increases, you have an OR bug.',
          'NOT conditions silently exclude NULL rows — any NULL in the column being compared evaluates the NOT condition to NULL, which WHERE discards. Add OR column IS NULL explicitly when NULL rows should be included in NOT results.',
          'Multiple OR conditions across different columns can prevent index optimisation. If an OR-heavy query is slow, consider UNION ALL (each branch uses its own index) or restructure with EXISTS subqueries.',
        ]}
      />

      {/* ── Next CTA ── */}
      <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 10, padding: '24px', marginTop: 40 }}>
        <p style={{ fontSize: 10, color: 'var(--muted)', letterSpacing: '.12em', textTransform: 'uppercase', fontFamily: 'var(--font-mono)', fontWeight: 700, margin: '0 0 10px' }}>What comes next</p>
        <p style={{ fontSize: 15, color: 'var(--text)', lineHeight: 1.85, margin: '0 0 20px' }}>
          In <strong>Module 18</strong>, you learn SQL data types — what types exist, which to use for each situation, and how wrong type choices cause silent bugs in calculations, comparisons, and joins.
        </p>
        <Link href="/learn/sql/data-types" style={{ background: C, color: '#000', padding: '11px 24px', borderRadius: 7, fontWeight: 700, fontSize: 13, textDecoration: 'none', display: 'inline-block' }}>
          Module 18 → SQL Data Types
        </Link>
      </div>

    </LearnLayout>
  );
}