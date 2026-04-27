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

const FnRow = ({ fn, desc, example }: { fn: string; desc: string; example: string }) => (
  <div style={{ display: 'grid', gridTemplateColumns: '200px 1fr 1fr', gap: 12, padding: '10px 0', borderBottom: '1px solid var(--border)' }}>
    <code style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: C, fontWeight: 700 }}>{fn}</code>
    <span style={{ fontSize: 13, color: 'var(--text)', lineHeight: 1.5 }}>{desc}</span>
    <code style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--muted)' }}>{example}</code>
  </div>
);

export default function DateTimeFunctions() {
  return (
    <LearnLayout
      title="Date and Time Functions"
      description="Extract parts, calculate differences, truncate to periods, format for display, handle timezones — every temporal operation for time-series analytics and reporting"
      section="SQL — Module 42"
      readTime="38 min"
      updatedAt="April 2026"
    >

      {/* ── PART 01 ── */}
      <Part n="01" title="Date and Time Types — What You Are Working With" />

      <P>SQL has four primary temporal data types. Understanding which type a column uses determines which functions apply and how arithmetic works.</P>

      <div style={{ overflowX: 'auto', margin: '20px 0 32px' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
          <thead>
            <tr>
              {['Type', 'Stores', 'Example', 'Use for'].map(h => (
                <th key={h} style={{ padding: '10px 14px', background: 'var(--surface)', color: 'var(--muted)', fontWeight: 700, textAlign: 'left', borderBottom: '1px solid var(--border)', fontSize: 11, textTransform: 'uppercase', letterSpacing: '.08em' }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {[
              ['DATE', 'Calendar date only — no time', '2024-01-15', 'Order dates, birthdays, hire dates'],
              ['TIME', 'Time of day only — no date', '14:30:00', 'Store hours, shift times'],
              ['TIMESTAMP', 'Date + time, no timezone', '2024-01-15 14:30:00', 'Event logs, created_at, updated_at'],
              ['TIMESTAMPTZ', 'Date + time + timezone offset', '2024-01-15 14:30:00+05:30', 'Multi-region events, audit logs'],
            ].map(([type, stores, ex, use], i) => (
              <tr key={type} style={{ background: i % 2 === 0 ? 'transparent' : 'var(--surface)' }}>
                <td style={{ padding: '10px 14px', fontFamily: 'var(--font-mono)', fontSize: 12, color: C, borderBottom: '1px solid var(--border)', fontWeight: 700 }}>{type}</td>
                <td style={{ padding: '10px 14px', fontSize: 13, color: 'var(--text)', borderBottom: '1px solid var(--border)' }}>{stores}</td>
                <td style={{ padding: '10px 14px', fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--muted)', borderBottom: '1px solid var(--border)' }}>{ex}</td>
                <td style={{ padding: '10px 14px', fontSize: 13, color: 'var(--muted)', borderBottom: '1px solid var(--border)', lineHeight: 1.5 }}>{use}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <SQLPlayground
        initialQuery={`-- See the date types in FreshCart
SELECT
  date('now')                           AS today_date,
  datetime('now')                       AS now_timestamp,
  MIN(order_date)                       AS earliest_order,
  MAX(order_date)                       AS latest_order,
  typeof(order_date)                    AS order_date_type
FROM orders;`}
        height={175}
        showSchema={true}
      />

      <HR />

      {/* ── PART 02 ── */}
      <Part n="02" title="Current Date and Time — Getting Now" />

      <CodeBlock
        label="Current date/time functions"
        code={`-- Current date (no time component)
CURRENT_DATE                    -- 2024-02-15 (SQL standard)
CURDATE()                       -- MySQL equivalent

-- Current timestamp (date + time)
CURRENT_TIMESTAMP               -- 2024-02-15 09:30:00+05:30 (SQL standard)
NOW()                           -- same as CURRENT_TIMESTAMP (widely supported)
LOCALTIMESTAMP                  -- current timestamp without timezone

-- Current time only
CURRENT_TIME                    -- 09:30:00+05:30

-- DuckDB specific:
TODAY()                         -- current date
GET_CURRENT_TIMESTAMP()         -- current timestamp

-- Key difference: CURRENT_DATE vs NOW()
-- CURRENT_DATE returns a DATE (no time)
-- NOW() returns a TIMESTAMP (date + time)
-- For date comparisons, CURRENT_DATE is cleaner
-- For audit trails and event logging, NOW() or CURRENT_TIMESTAMP`}
      />

      <SQLPlayground
        initialQuery={`-- Days since each order was placed
SELECT
  order_id,
  order_date,
  order_status,
  date('now')                                            AS today,
  CAST(julianday('now') - julianday(order_date) AS INTEGER) AS days_ago,
  CASE
    WHEN julianday('now') - julianday(order_date) <= 7  THEN 'This week'
    WHEN julianday('now') - julianday(order_date) <= 30 THEN 'This month'
    WHEN julianday('now') - julianday(order_date) <= 90 THEN 'Last 3 months'
    ELSE 'Older'
  END                                                    AS recency
FROM orders
ORDER BY order_date DESC
LIMIT 10;`}
        height={225}
        showSchema={false}
      />

      <HR />

      {/* ── PART 03 ── */}
      <Part n="03" title="EXTRACT — Pulling Out Date Parts" />

      <P>EXTRACT pulls a single numeric component out of a date or timestamp. It is the most commonly used date function in analytics — grouping by month, filtering by year, or computing the day of the week.</P>

      <CodeBlock
        label="EXTRACT fields"
        code={`EXTRACT(field FROM date_or_timestamp)

-- Common fields:
EXTRACT(YEAR        FROM order_date)    -- 2024
EXTRACT(MONTH       FROM order_date)    -- 1-12
EXTRACT(DAY         FROM order_date)    -- 1-31
EXTRACT(DOW         FROM order_date)    -- 0=Sunday, 6=Saturday (PostgreSQL/DuckDB)
EXTRACT(ISODOW      FROM order_date)    -- 1=Monday, 7=Sunday (ISO standard)
EXTRACT(WEEK        FROM order_date)    -- ISO week number (1-53)
EXTRACT(QUARTER     FROM order_date)    -- 1-4
EXTRACT(HOUR        FROM timestamp_col) -- 0-23
EXTRACT(MINUTE      FROM timestamp_col) -- 0-59
EXTRACT(SECOND      FROM timestamp_col) -- 0-59
EXTRACT(EPOCH       FROM timestamp_col) -- seconds since 1970-01-01 00:00:00 UTC
EXTRACT(DAYOFYEAR   FROM date_col)      -- 1-366 (DuckDB)

-- Shorthand in DuckDB (more readable):
YEAR(order_date)    -- same as EXTRACT(YEAR FROM order_date)
MONTH(order_date)   -- same as EXTRACT(MONTH FROM order_date)
DAY(order_date)     -- same as EXTRACT(DAY FROM order_date)`}
      />

      <SQLPlayground
        initialQuery={`-- Extract date components from order dates
SELECT
  order_id,
  order_date,
  CAST(strftime('%Y', order_date) AS INTEGER)              AS order_year,
  CAST(strftime('%m', order_date) AS INTEGER)              AS order_month,
  CAST(strftime('%d', order_date) AS INTEGER)              AS order_day,
  CAST(strftime('%w', order_date) AS INTEGER)              AS day_of_week,  -- 0=Sun
  (CAST(strftime('%m', order_date) AS INTEGER) + 2) / 3   AS quarter,
  CAST(strftime('%W', order_date) AS INTEGER)              AS week_number
FROM orders
ORDER BY order_date
LIMIT 8;`}
        height={205}
        showSchema={true}
      />

      <SQLPlayground
        initialQuery={`-- Group orders by month — the classic time-series aggregation
SELECT
  strftime('%Y', order_date)             AS yr,
  strftime('%m', order_date)             AS mo,
  COUNT(*)                               AS order_count,
  ROUND(SUM(total_amount), 2)            AS revenue,
  ROUND(AVG(total_amount), 2)            AS avg_order
FROM orders
WHERE order_status = 'Delivered'
GROUP BY
  strftime('%Y', order_date),
  strftime('%m', order_date)
ORDER BY yr, mo;`}
        height={210}
        showSchema={false}
      />

      <SQLPlayground
        initialQuery={`-- Day-of-week analysis: which days have the most orders?
SELECT
  CAST(strftime('%w', order_date) AS INTEGER)  AS day_num,
  CASE CAST(strftime('%w', order_date) AS INTEGER)
    WHEN 0 THEN 'Sunday'
    WHEN 1 THEN 'Monday'
    WHEN 2 THEN 'Tuesday'
    WHEN 3 THEN 'Wednesday'
    WHEN 4 THEN 'Thursday'
    WHEN 5 THEN 'Friday'
    WHEN 6 THEN 'Saturday'
  END                                          AS day_name,
  COUNT(*)                                     AS order_count,
  ROUND(AVG(total_amount), 2)                  AS avg_order_value
FROM orders
WHERE order_status = 'Delivered'
GROUP BY CAST(strftime('%w', order_date) AS INTEGER)
ORDER BY order_count DESC;`}
        height={240}
        showSchema={false}
      />

      <HR />

      {/* ── PART 04 ── */}
      <Part n="04" title="DATE_TRUNC — Rounding Down to a Period" />

      <P>DATE_TRUNC truncates a date or timestamp to the start of a specified period — the first day of the month, the first day of the week, the first hour of the day. It is the foundation of time-series grouping: every date in the same month truncates to the same value, making GROUP BY work cleanly across all dates in that period.</P>

      <CodeBlock
        label="DATE_TRUNC periods"
        code={`DATE_TRUNC(precision, date_or_timestamp)

-- Precision options:
DATE_TRUNC('year',    '2024-03-15')   -- 2024-01-01 00:00:00
DATE_TRUNC('quarter', '2024-03-15')   -- 2024-01-01 00:00:00 (Q1 start)
DATE_TRUNC('month',   '2024-03-15')   -- 2024-03-01 00:00:00
DATE_TRUNC('week',    '2024-03-15')   -- 2024-03-11 00:00:00 (Monday)
DATE_TRUNC('day',     '2024-03-15 14:30:00') -- 2024-03-15 00:00:00
DATE_TRUNC('hour',    '2024-03-15 14:30:00') -- 2024-03-15 14:00:00
DATE_TRUNC('minute',  '2024-03-15 14:30:45') -- 2024-03-15 14:30:00

-- DuckDB also supports:
DATE_TRUNC('day', order_date)::DATE  -- cast back to DATE for clean display

-- Why DATE_TRUNC instead of EXTRACT for grouping:
-- EXTRACT(MONTH FROM date) gives just the number (1-12) — loses year
-- DATE_TRUNC('month', date) gives 2024-01-01 — preserves year AND month
-- With EXTRACT: January 2023 and January 2024 both appear as month=1
-- With DATE_TRUNC: 2023-01-01 and 2024-01-01 are distinct values`}
      />

      <SQLPlayground
        initialQuery={`-- Monthly revenue using date() — correct year + month grouping
SELECT
  date(order_date, 'start of month')     AS month_start,
  COUNT(*)                               AS orders,
  ROUND(SUM(total_amount), 2)            AS revenue,
  ROUND(AVG(total_amount), 2)            AS avg_order
FROM orders
WHERE order_status = 'Delivered'
GROUP BY date(order_date, 'start of month')
ORDER BY month_start;`}
        height={195}
        showSchema={true}
      />

      <SQLPlayground
        initialQuery={`-- Weekly order trend (week starts Sunday)
SELECT
  date(order_date, '-' || strftime('%w', order_date) || ' days') AS week_start,
  COUNT(*)                               AS order_count,
  ROUND(SUM(total_amount), 2)            AS weekly_revenue
FROM orders
WHERE order_status = 'Delivered'
GROUP BY date(order_date, '-' || strftime('%w', order_date) || ' days')
ORDER BY week_start;`}
        height={175}
        showSchema={false}
      />

      <SQLPlayground
        initialQuery={`-- Compare: strftime month vs date() start-of-month for multi-year data
-- strftime('%m') alone would merge Jan 2023 + Jan 2024
SELECT
  -- date() 'start of month' preserves the year — unique per calendar month
  date(order_date, 'start of month')            AS month_period,
  -- strftime gives only the number — loses year context without '%Y'
  CAST(strftime('%Y', order_date) AS INTEGER)   AS yr,
  CAST(strftime('%m', order_date) AS INTEGER)   AS mo,
  COUNT(*)                                      AS orders
FROM orders
GROUP BY date(order_date, 'start of month'), yr, mo
ORDER BY month_period;`}
        height={205}
        showSchema={false}
      />

      <Callout type="tip">
        Always use DATE_TRUNC for time-series grouping — never just EXTRACT(MONTH). EXTRACT loses the year, causing January 2023 and January 2024 to collapse into the same group. DATE_TRUNC('month', date) produces a unique value per calendar month that can be correctly sorted, compared, and joined to other month-level data.
      </Callout>

      <HR />

      {/* ── PART 05 ── */}
      <Part n="05" title="Date Arithmetic — Adding and Subtracting Time" />

      <P>SQL dates support arithmetic — you can add or subtract intervals to compute future dates, calculate differences, and define rolling time windows.</P>

      <CodeBlock
        label="Date arithmetic syntax"
        code={`-- Adding intervals to dates
order_date + INTERVAL '7 days'          -- one week later
order_date + INTERVAL '1 month'         -- one month later
order_date + INTERVAL '1 year'          -- one year later
order_date + INTERVAL '2 hours 30 mins' -- timestamp arithmetic

-- Subtracting intervals
CURRENT_DATE - INTERVAL '30 days'       -- 30 days ago
CURRENT_DATE - INTERVAL '3 months'      -- 3 months ago
CURRENT_DATE - INTERVAL '1 year'        -- 1 year ago

-- Date difference: subtract two dates
order_date - '2024-01-01'               -- integer (days)
delivery_date - order_date              -- days between two dates

-- DATEDIFF (MySQL / some databases):
DATEDIFF(end_date, start_date)          -- days between (MySQL order: end, start)

-- DuckDB / PostgreSQL: subtract dates directly
'2024-02-15'::DATE - '2024-01-01'::DATE  -- returns 45 (days)`}
      />

      <SQLPlayground
        initialQuery={`-- Delivery time analysis
SELECT
  order_id,
  order_date,
  delivery_date,
  -- Days to deliver (julianday diff in SQLite)
  CAST(julianday(delivery_date) - julianday(order_date) AS INTEGER) AS delivery_days,
  -- Expected delivery (3 business days approximation)
  date(order_date, '+3 days')                         AS expected_by,
  -- Was it on time?
  CASE
    WHEN delivery_date <= date(order_date, '+3 days') THEN '✓ On time'
    WHEN delivery_date IS NULL THEN '⏳ Pending'
    ELSE '⚠ Late'
  END                                                 AS delivery_status
FROM orders
WHERE order_status = 'Delivered'
ORDER BY delivery_days DESC
LIMIT 10;`}
        height={235}
        showSchema={true}
      />

      <SQLPlayground
        initialQuery={`-- Rolling 30-day window: orders in the last 30 days
SELECT
  order_date,
  order_id,
  total_amount,
  order_status
FROM orders
WHERE order_date >= date('now', '-30 days')
  AND order_date <= date('now')
ORDER BY order_date DESC;`}
        height={175}
        showSchema={false}
      />

      <SQLPlayground
        initialQuery={`-- Employee tenure: how long have they worked at FreshCart?
SELECT
  employee_id,
  first_name || ' ' || last_name      AS employee,
  hire_date,
  CAST(julianday('now') - julianday(hire_date) AS INTEGER)        AS tenure_days,
  CAST((julianday('now') - julianday(hire_date)) / 365 AS INTEGER) AS tenure_years,
  CAST((julianday('now') - julianday(hire_date)) / 30.44 AS INTEGER) AS tenure_months
FROM employees
ORDER BY hire_date;`}
        height={220}
        showSchema={false}
      />

      <HR />

      {/* ── PART 06 ── */}
      <Part n="06" title="AGE — Human-Readable Time Differences" />

      <P>AGE computes the difference between two dates as an interval — expressed in years, months, and days rather than a raw number of days. It is the right tool when you want to display tenure, age, or time elapsed in a human-readable format.</P>

      <SQLPlayground
        initialQuery={`-- Tenure: years and months of service (julianday approximation)
WITH t AS (
  SELECT
    employee_id, first_name, hire_date,
    CAST((julianday('now') - julianday(hire_date)) / 365.25 AS INTEGER) AS yrs,
    CAST((julianday('now') - julianday(hire_date)) / 30.44 AS INTEGER) % 12 AS mos
  FROM employees
)
SELECT
  employee_id,
  first_name,
  hire_date,
  yrs                           AS years,
  mos                           AS months,
  yrs || ' yr ' || mos || ' mo' AS tenure_label
FROM t
ORDER BY hire_date;`}
        height={225}
        showSchema={true}
      />

      <SQLPlayground
        initialQuery={`-- Customer age since joining (julianday approximation)
SELECT
  customer_id,
  first_name || ' ' || last_name  AS customer,
  joined_date,
  CAST((julianday('now') - julianday(joined_date)) / 30.44 AS INTEGER) AS months_as_member
FROM customers
ORDER BY joined_date
LIMIT 8;`}
        height={190}
        showSchema={false}
      />

      <HR />

      {/* ── PART 07 ── */}
      <Part n="07" title="Date Formatting — TO_CHAR and strftime" />

      <P>Date formatting converts a date or timestamp into a human-readable string for display. PostgreSQL uses TO_CHAR. DuckDB (this playground) uses strftime. Both follow format codes where letters represent date parts.</P>

      <CodeBlock
        label="Format codes — TO_CHAR (PostgreSQL) and strftime (DuckDB)"
        code={`-- PostgreSQL TO_CHAR:
TO_CHAR(date_col, 'format_string')
TO_CHAR(order_date, 'DD Mon YYYY')      -- '15 Jan 2024'
TO_CHAR(order_date, 'Month DD, YYYY')   -- 'January 15, 2024'
TO_CHAR(order_date, 'YYYY-MM-DD')       -- '2024-01-15'
TO_CHAR(order_date, 'Day')              -- 'Tuesday  '
TO_CHAR(timestamp, 'HH24:MI:SS')        -- '14:30:00'

-- DuckDB strftime:
strftime(date_col, 'format_string')
strftime(order_date, '%d %b %Y')        -- '15 Jan 2024'
strftime(order_date, '%B %d, %Y')       -- 'January 15, 2024'
strftime(order_date, '%Y-%m-%d')        -- '2024-01-15'
strftime(order_date, '%A')              -- 'Tuesday'
strftime(order_date, '%H:%M:%S')        -- '14:30:00'

-- Common format codes (strftime style):
-- %Y = 4-digit year    %m = month (01-12)    %d = day (01-31)
-- %B = full month name  %b = abbreviated month  %A = full weekday name
-- %H = hour 24h (00-23) %I = hour 12h (01-12)  %M = minutes  %S = seconds`}
      />

      <SQLPlayground
        initialQuery={`-- Format order dates for display using strftime (SQLite)
-- Note: SQLite strftime takes format FIRST, then date (opposite of DuckDB)
-- %B, %A, %b not supported — use CASE for month/day names
SELECT
  order_id,
  order_date,
  strftime('%d/%m/%Y', order_date)          AS indian_format,
  strftime('%Y-%m-%d', order_date)          AS iso_format,
  'Week ' || strftime('%W', order_date) || ', ' || strftime('%Y', order_date) AS week_label,
  CASE CAST(strftime('%w', order_date) AS INTEGER)
    WHEN 0 THEN 'Sunday'    WHEN 1 THEN 'Monday'    WHEN 2 THEN 'Tuesday'
    WHEN 3 THEN 'Wednesday' WHEN 4 THEN 'Thursday'
    WHEN 5 THEN 'Friday'    WHEN 6 THEN 'Saturday'
  END                                       AS day_name,
  CASE CAST(strftime('%m', order_date) AS INTEGER)
    WHEN 1 THEN 'Jan' WHEN 2 THEN 'Feb' WHEN 3 THEN 'Mar' WHEN 4 THEN 'Apr'
    WHEN 5 THEN 'May' WHEN 6 THEN 'Jun' WHEN 7 THEN 'Jul' WHEN 8 THEN 'Aug'
    WHEN 9 THEN 'Sep' WHEN 10 THEN 'Oct' WHEN 11 THEN 'Nov' WHEN 12 THEN 'Dec'
  END || ' ' || strftime('%Y', order_date)  AS month_year
FROM orders
ORDER BY order_date DESC
LIMIT 8;`}
        height={205}
        showSchema={true}
      />

      <SQLPlayground
        initialQuery={`-- Monthly report labels — formatted for display
SELECT
  date(order_date, 'start of month')  AS month_start,
  CASE CAST(strftime('%m', order_date) AS INTEGER)
    WHEN 1 THEN 'Jan' WHEN 2 THEN 'Feb' WHEN 3 THEN 'Mar' WHEN 4 THEN 'Apr'
    WHEN 5 THEN 'May' WHEN 6 THEN 'Jun' WHEN 7 THEN 'Jul' WHEN 8 THEN 'Aug'
    WHEN 9 THEN 'Sep' WHEN 10 THEN 'Oct' WHEN 11 THEN 'Nov' WHEN 12 THEN 'Dec'
  END || ' ' || strftime('%Y', order_date) AS month_label,
  COUNT(*)                            AS orders,
  ROUND(SUM(total_amount), 2)         AS revenue
FROM orders
WHERE order_status = 'Delivered'
GROUP BY date(order_date, 'start of month')
ORDER BY month_start;`}
        height={195}
        showSchema={false}
      />

      <HR />

      {/* ── PART 08 ── */}
      <Part n="08" title="Date Construction — MAKE_DATE and Casting" />

      <P>Sometimes you need to build a date from parts — constructing the first day of a month, creating a date from year and month numbers, or parsing a date from a string.</P>

      <CodeBlock
        label="Building dates from parts"
        code={`-- MAKE_DATE: construct a date from year, month, day integers
MAKE_DATE(2024, 1, 15)                -- 2024-01-15
MAKE_DATE(EXTRACT(YEAR FROM CURRENT_DATE)::INT, 1, 1)  -- Jan 1 of current year

-- First day of the current month:
DATE_TRUNC('month', CURRENT_DATE)::DATE   -- cleanest approach
MAKE_DATE(EXTRACT(YEAR FROM CURRENT_DATE)::INT,
          EXTRACT(MONTH FROM CURRENT_DATE)::INT, 1)  -- same result

-- Last day of the current month:
DATE_TRUNC('month', CURRENT_DATE + INTERVAL '1 month')::DATE - 1

-- Casting strings to dates:
'2024-01-15'::DATE                    -- ISO format — always works
CAST('2024-01-15' AS DATE)            -- same, SQL standard syntax

-- Date from epoch (seconds since 1970-01-01):
TO_TIMESTAMP(1705276800)              -- timestamp from Unix epoch integer`}
      />

      <SQLPlayground
        initialQuery={`-- Build date ranges and period boundaries (SQLite)
SELECT
  date('now', 'start of month')                              AS month_start,
  date(date('now', 'start of month'), '+1 month', '-1 day') AS month_end,
  date('now', 'start of year')                               AS year_start,
  date(date('now', 'start of year'), '+1 year', '-1 day')   AS year_end,
  date('now', '-30 days')                                    AS thirty_days_ago,
  date('now', '-7 days')                                     AS seven_days_ago;`}
        height={230}
        showSchema={false}
      />

      <SQLPlayground
        initialQuery={`-- Reconstruct the first day of an order's month
SELECT
  order_id,
  order_date,
  -- Using SQLite date modifier (simplest)
  date(order_date, 'start of month')              AS first_of_month,
  -- Or build it as a string from extracted parts
  strftime('%Y', order_date) || '-' || strftime('%m', order_date) || '-01' AS first_of_month_alt,
  -- How many days into the month did this order occur?
  CAST(strftime('%d', order_date) AS INTEGER) - 1 AS days_into_month
FROM orders
ORDER BY order_date
LIMIT 8;`}
        height={215}
        showSchema={true}
      />

      <HR />

      {/* ── PART 09 ── */}
      <Part n="09" title="Time-Series Analysis Patterns" />

      <P>Date functions are the engine of time-series analytics. The patterns in this part — period-over-period comparison, rolling windows, cohort dating, and gap detection — appear in almost every analytical dashboard.</P>

      <H>Month-over-month growth</H>

      <SQLPlayground
        initialQuery={`-- Month-over-month revenue growth
WITH monthly AS (
  SELECT
    date(order_date, 'start of month')     AS month_start,
    ROUND(SUM(total_amount), 2)            AS revenue
  FROM orders
  WHERE order_status = 'Delivered'
  GROUP BY date(order_date, 'start of month')
)
SELECT
  month_start,
  revenue,
  LAG(revenue) OVER (ORDER BY month_start)   AS prev_month_revenue,
  ROUND(
    revenue - LAG(revenue) OVER (ORDER BY month_start)
  , 2)                                       AS mom_change,
  ROUND(
    (revenue - LAG(revenue) OVER (ORDER BY month_start))
    / NULLIF(LAG(revenue) OVER (ORDER BY month_start), 0) * 100
  , 1)                                       AS mom_pct_change
FROM monthly
ORDER BY month_start;`}
        height={265}
        showSchema={true}
      />

      <H>Cohort analysis — when did customers first order?</H>

      <SQLPlayground
        initialQuery={`-- Customer cohort: first order month + subsequent activity
WITH first_orders AS (
  SELECT
    customer_id,
    MIN(order_date)                          AS first_order_date,
    date(MIN(order_date), 'start of month')  AS cohort_month
  FROM orders
  WHERE order_status = 'Delivered'
  GROUP BY customer_id
)
SELECT
  cohort_month,
  COUNT(DISTINCT fo.customer_id)               AS cohort_size,
  COUNT(DISTINCT CASE
    WHEN o.order_date > fo.first_order_date THEN fo.customer_id
  END)                                         AS returned_customers,
  ROUND(
    CAST(COUNT(DISTINCT CASE
      WHEN o.order_date > fo.first_order_date THEN fo.customer_id
    END) AS REAL)
    / COUNT(DISTINCT fo.customer_id) * 100
  , 1)                                         AS retention_pct
FROM first_orders AS fo
LEFT JOIN orders AS o
  ON fo.customer_id = o.customer_id
  AND o.order_status = 'Delivered'
GROUP BY cohort_month
ORDER BY cohort_month;`}
        height={290}
        showSchema={false}
      />

      <H>Rolling 7-day average</H>

      <SQLPlayground
        initialQuery={`-- 7-day rolling average order value
WITH daily AS (
  SELECT
    order_date,
    COUNT(*)                      AS daily_orders,
    ROUND(SUM(total_amount), 2)   AS daily_revenue
  FROM orders
  WHERE order_status = 'Delivered'
  GROUP BY order_date
)
SELECT
  order_date,
  daily_orders,
  daily_revenue,
  ROUND(AVG(daily_revenue) OVER (
    ORDER BY order_date
    ROWS BETWEEN 6 PRECEDING AND CURRENT ROW
  ), 2)                           AS rolling_7day_avg
FROM daily
ORDER BY order_date;`}
        height={245}
        showSchema={false}
      />

      <HR />

      {/* ── PART 10 ── */}
      <Part n="10" title="Timezone Handling" />

      <P>Timezones matter for any platform with users or stores in multiple regions. India uses IST (UTC+5:30) — a single timezone, which simplifies things. Global platforms need to store timestamps in UTC and convert for display.</P>

      <CodeBlock
        label="Timezone functions"
        code={`-- AT TIME ZONE: convert between timezones
-- Convert UTC timestamp to IST for display:
NOW() AT TIME ZONE 'UTC' AT TIME ZONE 'Asia/Kolkata'
-- Or with the offset directly:
NOW() AT TIME ZONE 'Asia/Kolkata'

-- Common Indian timezone: 'Asia/Kolkata' (IST = UTC+5:30)

-- TIMEZONE() in DuckDB:
timezone('Asia/Kolkata', NOW())

-- Best practices for multi-region platforms:
-- 1. Store all timestamps as TIMESTAMPTZ (with timezone) in UTC
-- 2. Convert to local timezone only at display time
-- 3. For filtering: convert the filter value to UTC, not the stored value
--    (applying timezone conversion to a column prevents index usage)

-- Correct pattern for filtering by local time:
WHERE created_at >= '2024-01-15 00:00:00+05:30'
  AND created_at <  '2024-01-16 00:00:00+05:30'
-- Database converts the literals to UTC internally — index can be used`}
      />

      <SQLPlayground
        initialQuery={`-- SQLite has no timezone support — datetime() operates in UTC
-- Manually add IST offset (+5:30) for display
SELECT
  datetime('now')                              AS utc_now,
  datetime('now', '+5 hours', '+30 minutes')   AS ist_approx,
  date('now', '+5 hours', '+30 minutes')       AS ist_date,
  time('now', '+5 hours', '+30 minutes')       AS ist_time;`}
        height={145}
        showSchema={false}
      />

      <HR />

      {/* ── PART 11 ── */}
      <Part n="11" title="Complete Date Function Reference" />

      <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 10, padding: '16px 20px', margin: '20px 0 32px' }}>
        <div style={{ padding: '8px 0', borderBottom: '1px solid var(--border)', marginBottom: 8 }}>
          <div style={{ display: 'grid', gridTemplateColumns: '200px 1fr 1fr', gap: 12 }}>
            <span style={{ fontSize: 10, fontWeight: 700, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '.08em' }}>Function</span>
            <span style={{ fontSize: 10, fontWeight: 700, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '.08em' }}>Description</span>
            <span style={{ fontSize: 10, fontWeight: 700, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '.08em' }}>Example → Result</span>
          </div>
        </div>
        {[
          ['CURRENT_DATE', 'Today\'s date', 'CURRENT_DATE → 2024-02-15'],
          ['CURRENT_TIMESTAMP / NOW()', 'Current date + time', 'NOW() → 2024-02-15 09:30:00'],
          ['EXTRACT(part FROM date)', 'Pull one numeric component', 'EXTRACT(MONTH FROM order_date) → 2'],
          ['DATE_TRUNC(\'period\', date)', 'Round down to period start', 'DATE_TRUNC(\'month\', date) → 2024-02-01'],
          ['date + INTERVAL \'n unit\'', 'Add time to a date', '\'2024-01-15\' + INTERVAL \'7 days\' → 2024-01-22'],
          ['date1 - date2', 'Days between two dates', '\'2024-02-15\'::DATE - \'2024-01-15\'::DATE → 31'],
          ['AGE(date2, date1)', 'Human-readable interval', 'AGE(\'2024-04-01\', \'2022-01-15\') → 2 years 2 mons 17 days'],
          ['strftime(date, fmt)', 'Format date as string (DuckDB)', 'strftime(date, \'%d %b %Y\') → 15 Jan 2024'],
          ['TO_CHAR(date, fmt)', 'Format date as string (PostgreSQL)', 'TO_CHAR(date, \'DD Mon YYYY\') → 15 Jan 2024'],
          ['MAKE_DATE(y, m, d)', 'Build date from integers', 'MAKE_DATE(2024, 1, 15) → 2024-01-15'],
          ['date::DATE', 'Cast to date type', '\'2024-01-15\'::DATE'],
          ['DATEADD(unit, n, date)', 'Add n units (MySQL/SQL Server)', 'DATEADD(day, 7, order_date)'],
          ['DATEDIFF(unit, d1, d2)', 'Difference in units (MySQL)', 'DATEDIFF(day, \'2024-01-01\', \'2024-02-01\') → 31'],
        ].map(([fn, desc, ex]) => (
          <FnRow key={fn} fn={fn} desc={desc} example={ex} />
        ))}
      </div>

      <HR />

      {/* ── PART 12 ── */}
      <Part n="12" title="What This Looks Like at Work" />

      <P>You are a data analyst at Instacart. The growth team runs a weekly business review and needs three reports every Monday morning: (1) last week's revenue by day of week, (2) month-to-date revenue versus the same period last month, and (3) a 30-day delivery time trend. All three are date function queries.</P>

      <TimeBlock time="8:00 AM" label="Report 1 — last week by day">
        Filter to the last 7 days, group by day name, sort by revenue.
      </TimeBlock>

      <SQLPlayground
        initialQuery={`-- Last 7 days: revenue by day of week
SELECT
  order_date,
  CASE CAST(strftime('%w', order_date) AS INTEGER)
    WHEN 0 THEN 'Sunday'    WHEN 1 THEN 'Monday'    WHEN 2 THEN 'Tuesday'
    WHEN 3 THEN 'Wednesday' WHEN 4 THEN 'Thursday'
    WHEN 5 THEN 'Friday'    WHEN 6 THEN 'Saturday'
  END                                     AS day_name,
  strftime('%d ', order_date) ||
  CASE CAST(strftime('%m', order_date) AS INTEGER)
    WHEN 1 THEN 'Jan' WHEN 2 THEN 'Feb' WHEN 3 THEN 'Mar' WHEN 4 THEN 'Apr'
    WHEN 5 THEN 'May' WHEN 6 THEN 'Jun' WHEN 7 THEN 'Jul' WHEN 8 THEN 'Aug'
    WHEN 9 THEN 'Sep' WHEN 10 THEN 'Oct' WHEN 11 THEN 'Nov' WHEN 12 THEN 'Dec'
  END                                     AS date_display,
  COUNT(*)                                AS orders,
  ROUND(SUM(total_amount), 2)             AS revenue
FROM orders
WHERE order_status = 'Delivered'
  AND order_date >= date('now', '-7 days')
GROUP BY order_date
ORDER BY order_date;`}
        height={210}
        showSchema={true}
      />

      <TimeBlock time="8:20 AM" label="Report 2 — MTD vs prior MTD">
        Month-to-date uses DATE_TRUNC for the period boundary; prior MTD uses the same logic offset by one month.
      </TimeBlock>

      <SQLPlayground
        initialQuery={`-- Month-to-date revenue vs same period last month
WITH current_mtd AS (
  SELECT ROUND(SUM(total_amount), 2) AS revenue, COUNT(*) AS orders
  FROM orders
  WHERE order_status = 'Delivered'
    AND order_date >= date('now', 'start of month')
    AND order_date <  date('now')
),
prior_mtd AS (
  SELECT ROUND(SUM(total_amount), 2) AS revenue, COUNT(*) AS orders
  FROM orders
  WHERE order_status = 'Delivered'
    AND order_date >= date('now', 'start of month', '-1 month')
    AND order_date <  date('now', '-1 month')
)
SELECT
  c.revenue                              AS current_mtd_revenue,
  p.revenue                              AS prior_mtd_revenue,
  c.orders                               AS current_mtd_orders,
  p.orders                               AS prior_mtd_orders,
  ROUND(c.revenue - p.revenue, 2)        AS revenue_change,
  ROUND((c.revenue - p.revenue)
    / NULLIF(p.revenue, 0) * 100, 1)     AS pct_change
FROM current_mtd AS c, prior_mtd AS p;`}
        height={295}
        showSchema={false}
      />

      <TimeBlock time="8:45 AM" label="Report 3 — 30-day delivery trend">
        DATE_TRUNC to week gives a clean weekly trend line.
      </TimeBlock>

      <SQLPlayground
        initialQuery={`-- 30-day delivery time trend by week
SELECT
  date(order_date, '-' || strftime('%w', order_date) || ' days') AS week_start,
  COUNT(*)                                 AS delivered_orders,
  ROUND(AVG(julianday(delivery_date) - julianday(order_date)), 1) AS avg_delivery_days,
  CAST(MIN(julianday(delivery_date) - julianday(order_date)) AS INTEGER) AS fastest,
  CAST(MAX(julianday(delivery_date) - julianday(order_date)) AS INTEGER) AS slowest
FROM orders
WHERE order_status = 'Delivered'
  AND delivery_date IS NOT NULL
  AND order_date >= date('now', '-30 days')
GROUP BY date(order_date, '-' || strftime('%w', order_date) || ' days')
ORDER BY week_start;`}
        height={225}
        showSchema={false}
      />

      <TimeBlock time="9:00 AM" label="All three reports delivered before stand-up">
        Three date-function queries — each under 15 lines — producing the complete weekly business review pack. The growth team has actionable numbers before the 9 AM stand-up.
      </TimeBlock>

      <ProTip>
        Save commonly used date boundaries as variables or CTEs at the top of your reporting queries: current month start, prior month start, MTD cutoff. Then reference them throughout rather than recomputing DATE_TRUNC('month', CURRENT_DATE) ten times. A single CTE named report_dates with all your period boundaries makes the query readable and ensures consistency — one change at the top updates every reference.
      </ProTip>

      <HR />

      {/* ── PART 13 — Interview Prep ── */}
      <Part n="13" title="Interview Prep — 5 Questions With Complete Answers" />

      <IQ q="What is the difference between EXTRACT and DATE_TRUNC for grouping time-series data?">
        <p style={{ margin: '0 0 14px' }}>EXTRACT pulls a single numeric component from a date — EXTRACT(MONTH FROM date) returns the number 1 through 12. DATE_TRUNC rounds a date down to the start of a specified period — DATE_TRUNC('month', date) returns a complete date value representing the first day of that month.</p>
        <p style={{ margin: '0 0 14px' }}>For time-series grouping, this distinction is critical. EXTRACT(MONTH FROM date) loses the year — January 2023 and January 2024 both return 1 from EXTRACT(MONTH). If you GROUP BY EXTRACT(MONTH FROM order_date), orders from different years collapse into the same group, producing incorrect multi-year totals. DATE_TRUNC('month', date) returns 2023-01-01 and 2024-01-01 respectively — distinct values that sort correctly and do not merge across years.</p>
        <p style={{ margin: 0 }}>Always use DATE_TRUNC for time-series GROUP BY. Use EXTRACT only when you specifically want just the numeric component — for example, filtering by month number across all years (WHERE EXTRACT(MONTH FROM order_date) = 1 to get all Januaries), or for day-of-week analysis where you want to aggregate all Mondays together regardless of the specific date. The rule: if ordering and uniqueness across years matters, use DATE_TRUNC. If you want to aggregate across multiple years intentionally, use EXTRACT.</p>
      </IQ>

      <IQ q="How do you calculate the number of days between two dates in SQL?">
        <p style={{ margin: '0 0 14px' }}>In PostgreSQL and DuckDB, subtract two DATE values directly — the result is an integer representing the number of days: delivery_date - order_date returns the number of days between them. For TIMESTAMP values, subtraction returns an INTERVAL — extract the day component with EXTRACT(DAY FROM (timestamp2 - timestamp1)) or convert to epoch seconds and divide: EXTRACT(EPOCH FROM (ts2 - ts1)) / 86400.</p>
        <p style={{ margin: '0 0 14px' }}>In MySQL, use DATEDIFF(end_date, start_date) — note the argument order is end then start, which returns positive values for end {'>'} start. DATEDIFF('2024-02-15', '2024-01-15') returns 31. In SQL Server, DATEDIFF(day, start_date, end_date) — note the unit is first and the argument order is reversed from MySQL.</p>
        <p style={{ margin: 0 }}>For business days (excluding weekends), there is no standard SQL function — you need a calendar table or a more complex expression. A simple approximation: total_days - (total_weeks * 2) where total_weeks is FLOOR(total_days / 7) — this works for approximate business day counts. For precise business day calculations accounting for holidays, a calendar dimension table with an is_business_day flag is the correct approach. The AGE function provides a human-readable interval (years, months, days) rather than a raw day count — use AGE for display purposes (tenure display, customer age) and direct date subtraction for arithmetic calculations.</p>
      </IQ>

      <IQ q="How do you write a query to find orders placed in the last 30 days?">
        <p style={{ margin: '0 0 14px' }}>The standard pattern: WHERE order_date {'>'}= CURRENT_DATE - INTERVAL '30 days'. This filters orders where the order_date is within the last 30 days from today. CURRENT_DATE gives today's date; subtracting INTERVAL '30 days' gives the cutoff date. The {'>'}= operator includes the cutoff date itself.</p>
        <p style={{ margin: '0 0 14px' }}>Variations for different databases: MySQL uses DATE_SUB(CURDATE(), INTERVAL 30 DAY) or NOW() - INTERVAL 30 DAY. SQL Server uses DATEADD(day, -30, GETDATE()). The PostgreSQL/DuckDB interval syntax (INTERVAL '30 days') is the most readable and closest to the SQL standard.</p>
        <p style={{ margin: 0 }}>Important nuances: CURRENT_DATE - INTERVAL '30 days' is not the same as "one calendar month ago" — 30 days is always 30 days regardless of month length. For "same period last calendar month", use WHERE order_date {'>'}= DATE_TRUNC('month', CURRENT_DATE) - INTERVAL '1 month' AND order_date &lt; DATE_TRUNC('month', CURRENT_DATE). For "last N months", use INTERVAL 'N months' — this correctly handles month-length differences: CURRENT_DATE - INTERVAL '3 months' gives the date 3 calendar months ago, not 90 days ago. For performance, never apply functions to the indexed column — WHERE order_date {'>'}= CURRENT_DATE - INTERVAL '30 days' allows index range scan; WHERE EXTRACT(MONTH FROM order_date) = ... requires a full table scan.</p>
      </IQ>

      <IQ q="What is DATE_TRUNC used for and how does it enable time-series reporting?">
        <p style={{ margin: '0 0 14px' }}>DATE_TRUNC truncates a date or timestamp to the beginning of a specified time period — 'month' gives the first day of the month, 'year' gives January 1st, 'week' gives Monday of that week, 'hour' gives the top of the hour. The key behaviour: all dates within the same period truncate to the same value. Every day in January 2024 truncates to 2024-01-01. This makes DATE_TRUNC the foundation of time-series GROUP BY.</p>
        <p style={{ margin: '0 0 14px' }}>For time-series reporting: GROUP BY DATE_TRUNC('month', order_date) groups all January orders together, all February orders together, and produces one row per calendar month. The truncated date is a complete, sortable, comparable value — ORDER BY DATE_TRUNC('month', order_date) correctly sorts months chronologically. You can also join the truncated date to a calendar dimension table to fill in months with zero activity.</p>
        <p style={{ margin: 0 }}>The practical reporting pattern: SELECT DATE_TRUNC('month', order_date)::DATE AS month, SUM(revenue) AS monthly_revenue FROM orders GROUP BY DATE_TRUNC('month', order_date) ORDER BY month. The ::DATE cast converts the TIMESTAMP result of DATE_TRUNC to a clean DATE for display. This pattern — DATE_TRUNC in both SELECT and GROUP BY — is the correct, idiomatic time-series aggregation in PostgreSQL and DuckDB. In MySQL, use DATE_FORMAT(date, '%Y-%m-01') to achieve the same effect: '%Y-%m-01' formats the date as the first day of its month, grouping all days in the same month to the same string value.</p>
      </IQ>

      <IQ q="How do you handle timezones in SQL for a multi-region application?">
        <p style={{ margin: '0 0 14px' }}>The foundational rule: store all timestamps in UTC. Use the TIMESTAMPTZ (timestamp with time zone) column type in PostgreSQL. When data is inserted, the database converts the local time to UTC for storage. When data is read, it can be converted back to any local timezone for display. Storing in UTC means the stored values are unambiguous — there is no confusion about which timezone an event occurred in, and daylight saving time transitions do not create duplicates or gaps.</p>
        <p style={{ margin: '0 0 14px' }}>To convert for display: SELECT created_at AT TIME ZONE 'Asia/Kolkata' AS ist_time FROM events. This converts the UTC-stored timestamp to IST for display without modifying the stored value. In DuckDB: timezone('Asia/Kolkata', created_at). The AT TIME ZONE expression handles DST transitions automatically when using named timezone identifiers ('Asia/Kolkata') rather than fixed offsets ('+05:30') — named identifiers know about DST rules, fixed offsets do not.</p>
        <p style={{ margin: 0 }}>For filtering: never apply timezone conversion to the stored column in WHERE — this prevents index usage. Instead, convert the filter boundary values to UTC: WHERE created_at {'>'}= '2024-01-15 00:00:00+05:30' AND created_at {'<'} '2024-01-16 00:00:00+05:30'. The database converts the literal values to UTC internally and compares against the UTC-stored timestamps — the index can be used for a range scan. For reports aggregated by local day: convert to local timezone first (in a CTE or derived table), then truncate and group. India has a single timezone (IST, UTC+5:30) which simplifies timezone handling significantly — the real complexity arises in platforms serving users in multiple countries with different timezones and DST rules.</p>
      </IQ>

      <HR />

      {/* ── Error Library ── */}
      <Part n="14" title="Errors You Will Hit — And Exactly Why They Happen" />

      <Err
        msg="Time-series GROUP BY collapses multiple years into one — January 2023 and January 2024 merged"
        cause="GROUP BY EXTRACT(MONTH FROM order_date) uses only the month number (1-12) with no year. Both January 2023 and January 2024 extract to month = 1 and collapse into the same group. This is the most common date aggregation mistake — months from different years are silently merged."
        fix="Replace EXTRACT(MONTH) with DATE_TRUNC('month', order_date): GROUP BY DATE_TRUNC('month', order_date). DATE_TRUNC returns a complete date value (2023-01-01 vs 2024-01-01) that is unique per calendar month across all years. Cast to DATE for clean display: DATE_TRUNC('month', order_date)::DATE. If you must use EXTRACT, include the year: GROUP BY EXTRACT(YEAR FROM order_date), EXTRACT(MONTH FROM order_date) — this prevents year-collapsing but the result is less convenient to sort and display."
      />

      <Err
        msg="Date filter is not using an index — query is slow on large tables"
        cause="A function is applied to the date column in the WHERE clause: WHERE EXTRACT(YEAR FROM order_date) = 2024 or WHERE DATE_TRUNC('month', order_date) = '2024-01-01'. Applying any function to an indexed column in WHERE prevents the database from using a B-tree index on that column — it must evaluate the function for every row (full table scan)."
        fix="Rewrite the filter to compare the raw column against literal date boundaries. Instead of WHERE EXTRACT(YEAR FROM order_date) = 2024, use WHERE order_date >= '2024-01-01' AND order_date < '2025-01-01'. Instead of WHERE DATE_TRUNC('month', order_date) = '2024-01-01', use WHERE order_date >= '2024-01-01' AND order_date < '2024-02-01'. The raw column comparison allows the database to use an index range scan — orders of magnitude faster on large tables. For frequently used date columns, ensure an index exists: CREATE INDEX idx_orders_date ON orders(order_date)."
      />

      <Err
        msg="INTERVAL arithmetic gives wrong result — adding '1 month' skips or duplicates a day"
        cause="Adding INTERVAL '1 month' to January 31 produces February 28 (or 29 in leap years) — the database clamps to the last valid day of the resulting month. This is correct behaviour but unexpected if you assumed months are always 30 or 31 days. Similarly, INTERVAL '30 days' and INTERVAL '1 month' are not the same — 1 month is always one calendar month regardless of actual day count."
        fix="Use INTERVAL '1 month' when you want one calendar month (January → February, regardless of day count). Use INTERVAL '30 days' when you want exactly 30 days. For month-end reporting, always derive the last day of month via DATE_TRUNC rather than adding a fixed interval: (DATE_TRUNC('month', date) + INTERVAL '1 month' - INTERVAL '1 day')::DATE gives the last day of any month correctly. Be explicit about which semantics you need — document in a comment whether your date arithmetic is calendar-month-based or fixed-day-based."
      />

      <Err
        msg="AGE() returns unexpected negative months or days for close dates"
        cause="AGE(date1, date2) computes date1 - date2. If date1 is the earlier date (smaller value) and date2 is the later date, the result is a negative interval. Also, AGE can produce mixed signs within the interval for dates that cross month boundaries in complex ways — for example, AGE('2024-02-15', '2024-01-31') returns '0 years 0 mons 15 days' but AGE('2024-01-15', '2024-02-28') may return an unexpected result."
        fix="Always pass the later date as the first argument to AGE: AGE(end_date, start_date) or AGE(CURRENT_DATE, hire_date) — this gives a positive interval. For simple day-count differences, use date subtraction (end_date - start_date) rather than AGE — it is simpler and returns a plain integer. Use AGE only when you need a human-readable interval in years, months, and days. For tenure displays: EXTRACT(YEAR FROM AGE(CURRENT_DATE, hire_date)) gives complete years; EXTRACT(MONTH FROM AGE(CURRENT_DATE, hire_date)) gives the remaining months."
      />

      <Err
        msg="strftime / TO_CHAR returns wrong month or day name — locale issue"
        cause="Date format functions return month and day names in the database server's locale setting. A server configured with a non-English locale may return 'janvier' instead of 'January', or 'lunes' instead of 'Monday'. This is a server configuration issue, not a query bug, but it affects query output."
        fix="For locale-independent month labels, use EXTRACT to get the month number and a CASE statement to map to the desired language: CASE EXTRACT(MONTH FROM order_date) WHEN 1 THEN 'January' WHEN 2 THEN 'February' ... END. Alternatively, set the session locale before running the query: SET lc_time = 'en_US.UTF-8' in PostgreSQL. For date formats that avoid language entirely, use ISO format: strftime(date, '%Y-%m-%d') or TO_CHAR(date, 'YYYY-MM-DD') — these are locale-independent numbers and separators."
      />

      <HR />

      {/* ── Try It ── */}
      <TryItChallenge
        question="Write a comprehensive date analytics query that produces a store performance summary for January and February 2024. For each store show: store_id, city, the month (formatted as 'Jan 2024' or 'Feb 2024'), order_count, total_revenue, avg_order_value, avg_delivery_days (rounded to 1 decimal, NULL if no deliveries), fastest_delivery (min days), and a month_label that is 'January' or 'February'. Use DATE_TRUNC for the period grouping, strftime for the display label, and date arithmetic for delivery days. Only include delivered orders. Sort by store_id then month."
        hint="GROUP BY store_id AND DATE_TRUNC month. strftime(DATE_TRUNC('month', order_date)::DATE, '%b %Y') for the label. delivery_date - order_date for days. CASE on month number for month_label."
        answer={`SELECT
  s.store_id,
  s.city,
  date(o.order_date, 'start of month')               AS month_start,
  CASE CAST(strftime('%m', o.order_date) AS INTEGER)
    WHEN 1 THEN 'Jan 2024'
    WHEN 2 THEN 'Feb 2024'
  END                                                AS month_display,
  CASE CAST(strftime('%m', o.order_date) AS INTEGER)
    WHEN 1 THEN 'January'
    WHEN 2 THEN 'February'
  END                                                AS month_label,
  COUNT(o.order_id)                                  AS order_count,
  ROUND(SUM(o.total_amount), 2)                      AS total_revenue,
  ROUND(AVG(o.total_amount), 2)                      AS avg_order_value,
  ROUND(AVG(julianday(o.delivery_date) - julianday(o.order_date)), 1) AS avg_delivery_days,
  CAST(MIN(julianday(o.delivery_date) - julianday(o.order_date)) AS INTEGER) AS fastest_delivery
FROM stores AS s
JOIN orders AS o
  ON s.store_id = o.store_id
WHERE o.order_status = 'Delivered'
  AND o.order_date >= '2024-01-01'
  AND o.order_date <  '2024-03-01'
GROUP BY
  s.store_id,
  s.city,
  date(o.order_date, 'start of month')
ORDER BY s.store_id, month_start;`}
        explanation="DATE_TRUNC('month', order_date) in GROUP BY correctly groups all January dates together and all February dates together — without losing year context. The same DATE_TRUNC expression in SELECT (cast to ::DATE for clean display) gives the period start date. strftime formats it as 'Jan 2024' for the display label. The CASE on EXTRACT(MONTH) maps the numeric month to the full name — a locale-independent approach that works regardless of server language settings. The date filter uses raw column comparison (>= '2024-01-01' AND < '2024-03-01') rather than applying functions to order_date — this allows index usage. AVG(delivery_date - order_date) naturally returns NULL for stores with no delivery_date values (NULLs are excluded from AVG automatically) — no special handling needed. MIN() on the difference gives the fastest delivery without needing a separate subquery."
      />

      <HR />

      {/* ── Key Takeaways ── */}
      <KeyTakeaways
        items={[
          'SQL has four temporal types: DATE (date only), TIME (time only), TIMESTAMP (date+time, no timezone), TIMESTAMPTZ (date+time+timezone). Use TIMESTAMPTZ for audit trails and multi-region event logging.',
          'CURRENT_DATE gives today\'s date. NOW() / CURRENT_TIMESTAMP gives the current date and time. Use CURRENT_DATE for date comparisons, NOW() for timestamps.',
          'EXTRACT(part FROM date) returns a single numeric component. Use it to filter by month number or day-of-week — not for time-series grouping.',
          'DATE_TRUNC(\'period\', date) rounds down to the period start and preserves the year. Always use DATE_TRUNC for time-series GROUP BY — EXTRACT loses the year, collapsing different years into the same group.',
          'Date arithmetic: date + INTERVAL \'n days\' adds time. date1 - date2 returns integer days (PostgreSQL/DuckDB). INTERVAL \'1 month\' is one calendar month, not 30 days.',
          'AGE(end_date, start_date) returns a human-readable interval in years, months, days. Always put the later date first to get a positive result.',
          'strftime(date, format) in DuckDB and TO_CHAR(date, format) in PostgreSQL format dates as strings for display. ISO format codes (%Y-%m-%d) are locale-independent.',
          'Never apply functions to indexed date columns in WHERE — WHERE EXTRACT(YEAR FROM date) = 2024 prevents index use. Use range comparisons: WHERE date >= \'2024-01-01\' AND date < \'2025-01-01\'.',
          'Store timestamps in UTC using TIMESTAMPTZ. Convert to local timezone at display time only (AT TIME ZONE \'Asia/Kolkata\'). Convert filter boundaries to UTC rather than applying timezone functions to stored columns.',
          'For rolling windows: combine DATE_TRUNC for period grouping with LAG() window function for period-over-period comparisons. The date arithmetic gives the offset; the window function gives the prior period value.',
        ]}
      />

      {/* ── Next CTA ── */}
      <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 10, padding: '24px', marginTop: 40 }}>
        <p style={{ fontSize: 10, color: 'var(--muted)', letterSpacing: '.12em', textTransform: 'uppercase', fontFamily: 'var(--font-mono)', fontWeight: 700, margin: '0 0 10px' }}>What comes next</p>
        <p style={{ fontSize: 15, color: 'var(--text)', lineHeight: 1.85, margin: '0 0 20px' }}>
          In <strong>Module 43</strong>, you learn math and numeric functions — ROUND, FLOOR, CEIL, ABS, MOD, POWER, SQRT, LOG, and every numeric operation for financial calculations, statistical summaries, and data transformation.
        </p>
        <Link href="/learn/sql/math-functions" style={{ background: C, color: '#000', padding: '11px 24px', borderRadius: 7, fontWeight: 700, fontSize: 13, textDecoration: 'none', display: 'inline-block' }}>
          Module 43 → Math Functions
        </Link>
      </div>

    </LearnLayout>
  );
}