import { LearnLayout } from '@/components/content/LearnLayout';
import { Callout } from '@/components/content/Callout';
import { KeyTakeaways } from '@/components/content/KeyTakeaways';
import Link from 'next/link';

const C = '#06b6d4';
const Part = ({ n, title }: { n: string; title: string }) => <div style={{ margin: '32px 0 16px' }}><p style={{ color: C, fontFamily: 'var(--font-mono)', fontSize: 11, fontWeight: 700, margin: '0 0 7px' }}>// Part {n}</p><h2 style={{ color: 'var(--text)', fontSize: 'clamp(20px,3vw,30px)', letterSpacing: '-1px', margin: 0 }}>{title}</h2></div>;
const P = ({ children }: { children: React.ReactNode }) => <p style={{ color: 'var(--text)', fontSize: 15, lineHeight: 1.9, margin: '0 0 18px' }}>{children}</p>;
const CodeBlock = ({ label, code }: { label: string; code: string }) => <div style={{ border: '1px solid var(--border)', borderRadius: 10, margin: '16px 0 24px', overflow: 'hidden' }}><div style={{ background: 'var(--surface)', borderBottom: '1px solid var(--border)', color: 'var(--muted)', fontFamily: 'var(--font-mono)', fontSize: 11, padding: '8px 14px' }}>{label}</div><pre style={{ background: 'var(--bg2)', color: 'var(--text)', fontFamily: 'var(--font-mono)', fontSize: 12, lineHeight: 1.8, margin: 0, overflowX: 'auto', padding: '14px 16px', whiteSpace: 'pre' }}>{code}</pre></div>;

export default function RollupCubeGroupingSets() {
  return <LearnLayout title="ROLLUP, CUBE and GROUPING SETS" description="Build subtotal and grand-total rows for business reports using PostgreSQL grouping extensions, then understand their dialect equivalents." section="SQL — Lesson 59" readTime="14–20 min">
    <Part n="01" title="One report, several aggregation levels" />
    <P>A regular <code>GROUP BY</code> returns one row per requested group. A report may also need subtotals by city, totals by product category, and a grand total. The naive approach is several queries joined with <code>UNION ALL</code>. SQL grouping extensions request those aggregation levels together, usually with less repeated query logic.</P>
    <P>We will use FreshCart orders and stores. The business question is: how much delivered sales did each city earn by month, what was each city’s monthly subtotal, and what was the monthly total across all cities? The same idea applies to product category, channel, and region dimensions.</P>
    <Callout type="info">Prerequisites: <code>GROUP BY</code>, aggregates, and handling <code>NULL</code>. Objective: choose between the hierarchical subtotal pattern (<code>ROLLUP</code>), every combination (<code>CUBE</code>), or explicitly listed levels (<code>GROUPING SETS</code>).</Callout>

    <Part n="02" title="ROLLUP: hierarchical subtotals" />
    <P><code>ROLLUP(a, b, c)</code> produces a hierarchy of grouping levels: <code>(a, b, c)</code>, <code>(a, b)</code>, <code>(a)</code>, then <code>()</code> for the grand total. Think “detail, subtotal, subtotal, overall.” The order of the columns matters because the roll-up follows the listed hierarchy.</P>
    <CodeBlock label="PostgreSQL — city and month detail, city subtotal, grand total" code={`SELECT
  s.city,
  date_trunc('month', o.order_date)::date AS month,
  SUM(o.total_amount) AS revenue,
  GROUPING(s.city) AS city_is_rolled_up,
  GROUPING(date_trunc('month', o.order_date)) AS month_is_rolled_up
FROM orders AS o
JOIN stores AS s USING (store_id)
WHERE o.order_status = 'Delivered'
GROUP BY ROLLUP (
  s.city,
  date_trunc('month', o.order_date)::date
)
ORDER BY city_is_rolled_up, s.city, month_is_rolled_up, month;`} />
    <P>Here <code>ROLLUP(city, month)</code> creates detail rows by city and month, a subtotal for each city, and one grand total. It does <strong>not</strong> create a separate subtotal for each month across all cities, because that is not one of this hierarchy’s levels. Add the levels you need deliberately, or use explicit grouping sets.</P>

    <Part n="03" title="CUBE: every combination of dimensions" />
    <P><code>CUBE(a, b)</code> computes all four combinations: <code>(a, b)</code>, <code>(a)</code>, <code>(b)</code>, and <code>()</code>. With three dimensions it generates eight grouping combinations. This is useful for multidimensional summaries, but the number of grouping levels grows exponentially: <code>2ⁿ</code> combinations for <code>n</code> dimensions.</P>
    <CodeBlock label="PostgreSQL — category and store-city cube" code={`SELECT
  p.category,
  s.city,
  SUM(oi.line_total) AS sales,
  GROUPING(p.category) AS category_is_rolled_up,
  GROUPING(s.city) AS city_is_rolled_up
FROM order_items AS oi
JOIN orders AS o USING (order_id)
JOIN products AS p USING (product_id)
JOIN stores AS s USING (store_id)
WHERE o.order_status = 'Delivered'
GROUP BY CUBE (p.category, s.city)
ORDER BY category_is_rolled_up, p.category,
         city_is_rolled_up, s.city;`} />
    <P>The result includes category-by-city detail, category totals across cities, city totals across categories, and the grand total. A full cube over many columns can create a large and confusing result. Use only dimensions that answer an actual reporting question.</P>
    <Callout type="warning">A cube does not “group by all columns” in the ordinary sense. It emits several kinds of subtotal row. Each extra dimension doubles the set of grouping combinations, so a broad cube can be expensive and difficult to interpret.</Callout>

    <Part n="04" title="GROUPING SETS: name exactly the levels you need" />
    <P>When the report needs a few non-hierarchical combinations, <code>GROUPING SETS</code> is clearer than <code>CUBE</code>. It accepts the exact grouping combinations. An empty set <code>()</code> requests the grand total. It can also combine a rollup with independent groups.</P>
    <CodeBlock label="PostgreSQL — details, city totals, month totals, and grand total" code={`SELECT
  s.city,
  date_trunc('month', o.order_date)::date AS month,
  SUM(o.total_amount) AS revenue,
  GROUPING(s.city) AS city_rolled_up,
  GROUPING(date_trunc('month', o.order_date)::date) AS month_rolled_up
FROM orders AS o
JOIN stores AS s USING (store_id)
WHERE o.order_status = 'Delivered'
GROUP BY GROUPING SETS (
  (s.city, date_trunc('month', o.order_date)::date),
  (s.city),
  (date_trunc('month', o.order_date)::date),
  ()
);`} />
    <P>This produces four clearly defined levels: city-month detail, city subtotal, month subtotal, and grand total. Each row still has the same output columns; dimensions not included in that row’s grouping set are set to <code>NULL</code>.</P>

    <Part n="05" title="Distinguish a subtotal NULL from source data NULL" />
    <P>A displayed <code>NULL</code> can mean “this actual source value is unknown” or “the grouping extension omitted this dimension for a subtotal.” Those meanings are not the same. Use the <code>GROUPING(column)</code> function to produce a flag, and label the output with a <code>CASE</code>. This avoids reporting a city that is genuinely NULL as though it were a grand total.</P>
    <CodeBlock label="Label subtotal rows without confusing them with missing source values" code={`SELECT
  CASE
    WHEN GROUPING(s.city) = 1 THEN 'All cities'
    WHEN s.city IS NULL THEN '(city not recorded)'
    ELSE s.city
  END AS city_label,
  CASE
    WHEN GROUPING(date_trunc('month', o.order_date)::date) = 1
      THEN 'All months'
    ELSE to_char(date_trunc('month', o.order_date), 'YYYY-MM')
  END AS month_label,
  SUM(o.total_amount) AS revenue
FROM orders AS o
JOIN stores AS s USING (store_id)
WHERE o.order_status = 'Delivered'
GROUP BY GROUPING SETS (
  (s.city, date_trunc('month', o.order_date)::date),
  (s.city),
  (date_trunc('month', o.order_date)::date),
  ()
);`} />
    <P>The <code>GROUPING</code> function returns 1 when that expression is absent from the current grouping set and 0 when it is present. Use separate flags for each dimension you need to label. If order matters, sort by those flags and the original dimensions rather than relying on output order.</P>

    <Part n="06" title="Dialect notes and a practical choice" />
    <div style={{ overflowX: 'auto', margin: '18px 0 26px' }}><table style={{ borderCollapse: 'collapse', color: 'var(--text)', fontSize: 13, width: '100%' }}><thead><tr>{['Engine', 'Support pattern', 'Portability note'].map(x => <th key={x} style={{ borderBottom: `2px solid ${C}`, padding: 10, textAlign: 'left' }}>{x}</th>)}</tr></thead><tbody>{[
      ['PostgreSQL', 'ROLLUP, CUBE, GROUPING SETS, and GROUPING()', 'Use standard grouping syntax; expression casts and date functions are PostgreSQL-specific.'],
      ['MySQL', 'ROLLUP is available with GROUP BY; GROUPING() distinguishes super-aggregate rows in supported versions.', 'Do not assume CUBE or GROUPING SETS syntax exists; express selected levels with UNION ALL if necessary.'],
      ['SQL Server', 'ROLLUP, CUBE, GROUPING SETS, GROUPING(), and GROUPING_ID()', 'Use SQL Server date expressions and aliases; confirm the target compatibility level.'],
      ['Snowflake', 'ROLLUP, CUBE, GROUPING SETS, GROUPING(), and GROUPING_ID()', 'The grouping concepts are similar; use Snowflake-specific date functions and verify exact expression rules.'],
    ].map(row => <tr key={row[0]}>{row.map(cell => <td key={cell} style={{ borderBottom: '1px solid var(--border)', lineHeight: 1.7, padding: 10, verticalAlign: 'top' }}>{cell}</td>)}</tr>)}</tbody></table></div>
    <P>Choose <code>ROLLUP</code> for a natural parent-to-child hierarchy, <code>CUBE</code> when all dimensional combinations are useful and manageable, and <code>GROUPING SETS</code> when the reporting specification lists exact levels. If your engine lacks the needed extension, separate aggregate queries combined with <code>UNION ALL</code> are explicit and portable, though more verbose.</P>
    <Callout type="tip">Document the grain of each output row—detail, subtotal, or grand total—so application code and dashboard users do not accidentally add a subtotal to its underlying detail rows.</Callout>

    <Part n="07" title="Common mistakes and practice" />
    <div style={{ background: 'rgba(255,71,87,.05)', border: '1px solid rgba(255,71,87,.2)', borderRadius: 9, margin: '12px 0', padding: '13px 16px' }}><p style={{ color: '#ff4757', fontSize: 13, fontWeight: 700, margin: '0 0 5px' }}>1. Reading every NULL as a subtotal marker</p><p style={{ color: 'var(--text)', fontSize: 14, lineHeight: 1.8, margin: 0 }}>Source data can have real NULLs. Use <code>GROUPING()</code> flags to distinguish omitted grouping columns from missing source values.</p></div>
    <div style={{ background: 'rgba(255,71,87,.05)', border: '1px solid rgba(255,71,87,.2)', borderRadius: 9, margin: '12px 0', padding: '13px 16px' }}><p style={{ color: '#ff4757', fontSize: 13, fontWeight: 700, margin: '0 0 5px' }}>2. Assuming ROLLUP generates every subtotal</p><p style={{ color: 'var(--text)', fontSize: 14, lineHeight: 1.8, margin: 0 }}>ROLLUP only creates the hierarchy implied by the listed column order. Use GROUPING SETS when you need independent month and city totals.</p></div>
    <div style={{ background: 'rgba(255,71,87,.05)', border: '1px solid rgba(255,71,87,.2)', borderRadius: 9, margin: '12px 0', padding: '13px 16px' }}><p style={{ color: '#ff4757', fontSize: 13, fontWeight: 700, margin: '0 0 5px' }}>3. Using CUBE for too many dimensions</p><p style={{ color: 'var(--text)', fontSize: 14, lineHeight: 1.8, margin: 0 }}>The combinations grow as 2ⁿ. Limit dimensions to those needed, or list the required combinations explicitly.</p></div>
    <div style={{ background: 'rgba(255,71,87,.05)', border: '1px solid rgba(255,71,87,.2)', borderRadius: 9, margin: '12px 0', padding: '13px 16px' }}><p style={{ color: '#ff4757', fontSize: 13, fontWeight: 700, margin: '0 0 5px' }}>4. Double-counting summary rows</p><p style={{ color: 'var(--text)', fontSize: 14, lineHeight: 1.8, margin: 0 }}>Detail rows and their totals coexist. Filter by grouping flags or use the right grain before aggregating this report again.</p></div>
    <P>Practice tasks:</P>
    <ol style={{ color: 'var(--text)', fontSize: 14, lineHeight: 2, paddingLeft: 22 }}>
      <li>Write a <code>ROLLUP</code> for delivered order revenue by city and month. Identify every output grain.</li>
      <li>Write <code>GROUPING SETS</code> for city-month detail, city total, month total, and grand total.</li>
      <li>For category and city, predict the four grouping levels emitted by <code>CUBE</code> before running it.</li>
      <li>Add a genuine unknown-city label and a separate “all cities” label using <code>GROUPING()</code>.</li>
      <li>Rewrite the selected levels using <code>UNION ALL</code> for an engine that lacks grouping sets.</li>
    </ol>
    <KeyTakeaways items={['ROLLUP emits hierarchical detail and subtotal levels in the listed order.', 'CUBE emits every combination of its dimensions, growing exponentially.', 'GROUPING SETS names exactly which aggregation levels to return.', 'GROUPING(column) distinguishes a subtotal placeholder NULL from a real source NULL.', 'Subtotal rows coexist with detail rows; define the row grain and avoid double-counting.', 'Dialect support varies, especially for MySQL CUBE and GROUPING SETS.']} />
    <h3 style={{ color: 'var(--text)', fontSize: 17, margin: '28px 0 10px' }}>Next</h3>
    <P>Next, work with semi-structured values stored alongside relational data using JSON and PostgreSQL <code>jsonb</code>.</P>
    <Link href="/learn/sql/json-in-sql" style={{ color: C, fontWeight: 700, textDecoration: 'none' }}>Lesson 60 → Working with JSON in SQL</Link>
  </LearnLayout>;
}
