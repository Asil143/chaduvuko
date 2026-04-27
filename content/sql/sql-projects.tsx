import { LearnLayout } from '@/components/content/LearnLayout';
import { Callout } from '@/components/content/Callout';
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

const H = ({ children }: { children: React.ReactNode }) => (
  <h3 style={{ fontSize: 17, fontWeight: 700, color: 'var(--text)', margin: '32px 0 12px' }}>{children}</h3>
);

const H4 = ({ children }: { children: React.ReactNode }) => (
  <h4 style={{ fontSize: 14, fontWeight: 700, color: C, fontFamily: 'var(--font-mono)', margin: '24px 0 8px', letterSpacing: '.05em' }}>{children}</h4>
);

const Hl = ({ children }: { children: React.ReactNode }) => (
  <strong style={{ color: C }}>{children}</strong>
);

const HR = () => <div style={{ borderTop: '1px solid var(--border)', margin: '48px 0' }} />;

const Step = ({ n, label, children }: { n: string; label: string; children: React.ReactNode }) => (
  <div style={{ display: 'flex', gap: 20, marginBottom: 36 }}>
    <div style={{ flexShrink: 0 }}>
      <div style={{ width: 40, height: 40, borderRadius: '50%', background: `${C}15`, border: `2px solid ${C}50`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--font-mono)', fontSize: 14, fontWeight: 900, color: C }}>{n}</div>
    </div>
    <div style={{ flex: 1, borderLeft: `2px solid ${C}20`, paddingLeft: 22, paddingBottom: 4 }}>
      <p style={{ fontSize: 15, fontWeight: 700, color: 'var(--text)', margin: '6px 0 12px' }}>{label}</p>
      <div style={{ fontSize: 14, color: 'var(--muted)', lineHeight: 1.85 }}>{children}</div>
    </div>
  </div>
);

const Why = ({ children }: { children: React.ReactNode }) => (
  <div style={{ background: 'rgba(139,92,246,0.07)', border: '1px solid rgba(139,92,246,0.25)', borderRadius: 10, padding: '14px 18px', margin: '16px 0 24px' }}>
    <p style={{ fontSize: 11, fontWeight: 700, color: '#8b5cf6', fontFamily: 'var(--font-mono)', textTransform: 'uppercase', letterSpacing: '.1em', margin: '0 0 8px' }}>Why this matters</p>
    <p style={{ fontSize: 14, color: 'var(--text)', lineHeight: 1.85, margin: 0 }}>{children}</p>
  </div>
);

const Interpret = ({ children }: { children: React.ReactNode }) => (
  <div style={{ background: 'rgba(0,230,118,0.05)', border: '1px solid rgba(0,230,118,0.2)', borderRadius: 10, padding: '14px 18px', margin: '16px 0 24px' }}>
    <p style={{ fontSize: 11, fontWeight: 700, color: '#00e676', fontFamily: 'var(--font-mono)', textTransform: 'uppercase', letterSpacing: '.1em', margin: '0 0 8px' }}>How to read this output</p>
    <p style={{ fontSize: 14, color: 'var(--text)', lineHeight: 1.85, margin: 0 }}>{children}</p>
  </div>
);

const Pitfall = ({ children }: { children: React.ReactNode }) => (
  <div style={{ background: 'rgba(255,71,87,0.06)', border: '1px solid rgba(255,71,87,0.25)', borderRadius: 10, padding: '14px 18px', margin: '16px 0 24px' }}>
    <p style={{ fontSize: 11, fontWeight: 700, color: '#ff4757', fontFamily: 'var(--font-mono)', textTransform: 'uppercase', letterSpacing: '.1em', margin: '0 0 8px' }}>Common mistake</p>
    <p style={{ fontSize: 14, color: 'var(--text)', lineHeight: 1.85, margin: 0 }}>{children}</p>
  </div>
);

const Insight = ({ label, children }: { label: string; children: React.ReactNode }) => (
  <div style={{ background: `${C}08`, border: `1px solid ${C}25`, borderRadius: 10, padding: '14px 18px', margin: '16px 0 24px' }}>
    <p style={{ fontSize: 11, fontWeight: 700, color: C, fontFamily: 'var(--font-mono)', textTransform: 'uppercase', letterSpacing: '.1em', margin: '0 0 8px' }}>{label}</p>
    <p style={{ fontSize: 14, color: 'var(--text)', lineHeight: 1.85, margin: 0 }}>{children}</p>
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

const ProjectBrief = ({ num, title, role, company, problem, deliverable, skills, time }: {
  num: string; title: string; role: string; company: string;
  problem: string; deliverable: string; skills: string[]; time: string;
}) => (
  <div style={{ background: 'var(--surface)', border: `2px solid ${C}30`, borderRadius: 16, overflow: 'hidden', margin: '0 0 40px' }}>
    <div style={{ padding: '20px 26px', background: `${C}08`, borderBottom: `1px solid ${C}20` }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 12, flexWrap: 'wrap', marginBottom: 12 }}>
        <p style={{ fontSize: 11, color: C, fontFamily: 'var(--font-mono)', fontWeight: 700, letterSpacing: '.12em', margin: 0 }}>PROJECT {num} / 03</p>
        <span style={{ fontSize: 11, color: 'var(--muted)', background: 'var(--bg)', padding: '3px 12px', borderRadius: 20, border: '1px solid var(--border)' }}>{time}</span>
      </div>
      <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(18px,2.5vw,28px)', fontWeight: 900, letterSpacing: '-1px', color: 'var(--text)', margin: '0 0 6px' }}>{title}</h3>
      <p style={{ fontSize: 13, color: C, fontFamily: 'var(--font-mono)', margin: 0 }}>{role} @ {company}</p>
    </div>
    <div style={{ padding: '20px 26px', display: 'grid', gap: 16 }}>
      <div>
        <p style={{ fontSize: 11, fontWeight: 700, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '.09em', margin: '0 0 6px' }}>Business Problem</p>
        <p style={{ fontSize: 14, color: 'var(--text)', lineHeight: 1.75, margin: 0 }}>{problem}</p>
      </div>
      <div>
        <p style={{ fontSize: 11, fontWeight: 700, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '.09em', margin: '0 0 6px' }}>Your Deliverable</p>
        <p style={{ fontSize: 14, color: '#00e676', lineHeight: 1.75, margin: 0 }}>{deliverable}</p>
      </div>
      <div>
        <p style={{ fontSize: 11, fontWeight: 700, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '.09em', margin: '0 0 8px' }}>SQL Skills Applied</p>
        <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
          {skills.map(s => (
            <span key={s} style={{ fontSize: 11, color: C, background: `${C}10`, border: `1px solid ${C}20`, padding: '4px 12px', borderRadius: 20 }}>{s}</span>
          ))}
        </div>
      </div>
    </div>
  </div>
);

export default function SqlProjects() {
  return (
    <LearnLayout
      title="3 Real SQL Projects"
      description="Three production-grade analytical projects — revenue intelligence, customer lifecycle analysis, and schema design — built step by step with business context and interpretation"
      section="SQL — Module 62"
      readTime="90 min"
      updatedAt="April 2026"
    >

      {/* ── INTRO ── */}
      <Part n="00" title="How to Work Through These Projects" />

      <P>These are not exercises with a predetermined answer at the bottom. They are structured the same way a senior data analyst actually works: receive a business problem, decompose it into analytical questions, write queries that answer each question, interpret the output, and form a recommendation. Each project has five to seven steps — skip none of them, because the reasoning in each step directly informs the next.</P>

      <P>Every project uses the <Hl>FreshCart dataset</Hl> already loaded in each playground. The data is real and consistent — every query you run will produce results you can actually interpret. By the end of each project, you should be able to write two or three sentences summarizing what you found and what the business should do about it. That synthesis is the point.</P>

      <Callout type="info">
        Each playground is independent — changes you make in one do not carry over. But the dataset is the same everywhere, so results will be consistent across steps. Run every query, read the output, and work through the interpretation prompts before moving to the next step.
      </Callout>

      <HR />

      {/* ═══════════════════════════════════════════════════════════ */}
      {/* PROJECT 1 */}
      {/* ═══════════════════════════════════════════════════════════ */}

      <ProjectBrief
        num="01"
        title="Revenue Intelligence Report"
        role="Data Analyst"
        company="FreshCart Analytics Team"
        problem="The Head of Revenue Operations needs to understand what drove FreshCart's performance this period. She needs to know which stores are leading and lagging, which customer segments are most valuable, whether the business is growing or contracting month-over-month, and where concentration risk exists. She has 20 minutes before the leadership review. She needs numbers, not descriptions."
        deliverable="A complete revenue breakdown across store, loyalty tier, payment method, and time — with anomaly flags for stores or segments deviating significantly from the mean, and a one-paragraph written summary you could hand to the CEO."
        skills={['GROUP BY', 'Window Functions', 'SUM() OVER()', 'LAG()', 'CASE WHEN', 'CTEs', 'HAVING', 'Conditional Aggregation']}
        time="30 min"
      />

      <Step n="1" label="Establish the North Star: Baseline KPIs">
        <p style={{ margin: '0 0 12px' }}>Before any breakdown, you need one row that anchors everything else. Every percentage in the rest of the report is relative to these totals. If you skip this step, numbers in later slides have no context — is ₹85,000 good or bad? You cannot know without the total.</p>
        <p style={{ margin: 0 }}>Write a single query returning: total delivered orders, total revenue, average order value, count of unique customers who ordered, total items sold, and revenue per customer. These are your KPIs.</p>
      </Step>

      <SQLPlayground
        initialQuery={`-- Step 1: Baseline KPIs — the anchor for everything that follows
SELECT
  COUNT(DISTINCT o.order_id)                    AS total_orders,
  ROUND(SUM(o.total_amount), 2)                 AS total_revenue,
  ROUND(AVG(o.total_amount), 2)                 AS avg_order_value,
  COUNT(DISTINCT o.customer_id)                 AS unique_customers,
  COALESCE(SUM(oi.quantity), 0)                 AS total_units_sold,
  ROUND(SUM(o.total_amount)
    / NULLIF(COUNT(DISTINCT o.customer_id), 0), 2) AS revenue_per_customer,
  COUNT(CASE WHEN o.order_status = 'Cancelled' THEN 1 END) AS cancellations,
  ROUND(100.0 *
    COUNT(CASE WHEN o.order_status = 'Cancelled' THEN 1 END)
    / NULLIF(COUNT(*), 0), 1)                   AS cancellation_rate_pct
FROM orders AS o
LEFT JOIN order_items AS oi ON oi.order_id = o.order_id
  AND o.order_status = 'Delivered';`}
        height={215}
        showSchema={true}
      />

      <Interpret>
        Note the cancellation_rate_pct alongside revenue. A high cancellation rate with high total revenue can be misleading — you are measuring orders that completed, not orders that were placed. If cancellation_rate is above 10%, that is worth calling out in the executive summary as a separate concern. Revenue_per_customer is the most important single number here: it tells you the average economic value of acquiring one FreshCart customer.
      </Interpret>

      <Step n="2" label="Decompose Revenue by Store — Find the Leaders and Laggards">
        <p style={{ margin: '0 0 12px' }}>Revenue concentration by store reveals two things: which stores are driving growth (should receive more investment, inventory priority) and which stores are underperforming relative to their expected contribution (need investigation — staffing problem? Catchment area? Logistics?). You need absolute revenue, order count, average order value, and share of total.</p>
        <p style={{ margin: 0 }}>The critical addition: compute each store's deviation from the mean average order value. A store with high revenue but low AOV is processing many small orders. A store with low order count but high AOV has fewer but more valuable customers. These are very different operational profiles requiring different interventions.</p>
      </Step>

      <SQLPlayground
        initialQuery={`-- Step 2: Store performance breakdown with deviation analysis
WITH store_stats AS (
  SELECT
    s.store_id,
    s.store_name,
    s.city,
    COUNT(o.order_id)                        AS orders,
    COUNT(DISTINCT o.customer_id)            AS unique_customers,
    ROUND(SUM(o.total_amount), 2)            AS revenue,
    ROUND(AVG(o.total_amount), 2)            AS aov,
    ROUND(SUM(o.total_amount)
      / NULLIF(COUNT(DISTINCT o.customer_id),0), 2) AS rev_per_customer
  FROM orders AS o
  JOIN stores AS s ON s.store_id = o.store_id
  WHERE o.order_status = 'Delivered'
  GROUP BY s.store_id, s.store_name, s.city
),
averages AS (
  SELECT
    AVG(aov)             AS mean_aov,
    AVG(rev_per_customer) AS mean_rpc
  FROM store_stats
)
SELECT
  ss.store_name,
  ss.city,
  ss.orders,
  ss.unique_customers,
  ss.revenue,
  ss.aov,
  ROUND(ss.aov - a.mean_aov, 2)            AS aov_vs_mean,
  ROUND(100.0 * ss.revenue
    / SUM(ss.revenue) OVER (), 1)           AS revenue_share_pct,
  ss.rev_per_customer,
  CASE
    WHEN ss.aov < a.mean_aov * 0.85 THEN 'LOW AOV — investigate'
    WHEN ss.aov > a.mean_aov * 1.15 THEN 'HIGH AOV — premium customers'
    ELSE 'Normal'
  END                                       AS aov_flag
FROM store_stats AS ss
CROSS JOIN averages AS a
ORDER BY ss.revenue DESC;`}
        height={310}
        showSchema={true}
      />

      <Interpret>
        The aov_vs_mean column is the most actionable number on this slide. A store that is -₹150 below the mean AOV is not serving high-value customers — its growth lever is increasing basket size (bundle promotions, minimum order discounts) rather than acquiring more customers. A store that is +₹200 above mean AOV already has high-value customers — its lever is increasing visit frequency. The revenue_share_pct column immediately surfaces concentration risk: if two stores account for 60%+ of revenue, a logistics disruption at either location is a business-level risk.
      </Interpret>

      <Step n="3" label="Customer Segment Analysis — Where Revenue Actually Comes From">
        <p style={{ margin: '0 0 12px' }}>The Pareto principle in e-commerce: roughly 20% of customers generate 80% of revenue. Your job is to quantify this precisely, identify which loyalty tiers hold that 20%, and compute the economic gap between tiers — which tells you the value of successfully upgrading a Silver customer to Gold.</p>
        <p style={{ margin: 0 }}>The metric that matters most here is revenue per customer within each tier, not total revenue. Total revenue is a function of how many customers are in each tier. Revenue per customer tells you the economic profile of one customer in each segment — that is what drives upgrade and retention strategy.</p>
      </Step>

      <SQLPlayground
        initialQuery={`-- Step 3: Loyalty tier economics — the Pareto breakdown
WITH tier_metrics AS (
  SELECT
    c.loyalty_tier,
    COUNT(DISTINCT c.customer_id)                 AS customers,
    COUNT(o.order_id)                             AS orders,
    ROUND(SUM(o.total_amount), 2)                 AS total_revenue,
    ROUND(AVG(o.total_amount), 2)                 AS avg_order_value,
    ROUND(SUM(o.total_amount)
      / NULLIF(COUNT(DISTINCT c.customer_id),0), 2) AS revenue_per_customer,
    ROUND(CAST(COUNT(o.order_id) AS REAL)
      / NULLIF(COUNT(DISTINCT c.customer_id),0), 2)  AS orders_per_customer
  FROM customers AS c
  JOIN orders    AS o ON o.customer_id = c.customer_id
    AND o.order_status = 'Delivered'
  GROUP BY c.loyalty_tier
)
SELECT
  loyalty_tier,
  customers,
  orders,
  total_revenue,
  avg_order_value,
  revenue_per_customer,
  orders_per_customer,
  -- Share of total customers vs share of total revenue
  ROUND(100.0 * customers
    / SUM(customers) OVER (), 1)    AS customer_share_pct,
  ROUND(100.0 * total_revenue
    / SUM(total_revenue) OVER (), 1) AS revenue_share_pct,
  -- If revenue_share > customer_share: this tier punches above its weight
  ROUND(
    (100.0 * total_revenue / SUM(total_revenue) OVER ())
    - (100.0 * customers  / SUM(customers) OVER ())
  , 1)                               AS revenue_concentration_delta
FROM tier_metrics
ORDER BY revenue_per_customer DESC;`}
        height={295}
        showSchema={true}
      />

      <Interpret>
        The revenue_concentration_delta is the key insight column. A positive delta means that tier generates a disproportionately large share of revenue relative to its size — these are your most valuable customers per head. A negative delta means the tier has many customers but each generates relatively little revenue. In most datasets, Platinum and Gold tiers show positive deltas (10–30+ points above their customer share), while Bronze shows a large negative delta. This quantifies exactly how much revenue concentration exists. The upgrade value calculation: if a Silver customer generates ₹X per period and a Gold customer generates ₹Y, each successful tier upgrade is worth ₹(Y−X) per period to the business.
      </Interpret>

      <Pitfall>
        A common mistake here is to look only at total_revenue per tier and conclude that Bronze generates the least value. Bronze often has the most customers — total revenue can be misleading. Always look at revenue_per_customer. A tier with 5 Platinum customers each spending ₹5,000 (₹25,000 total) is more valuable per customer than 100 Bronze customers spending ₹400 each (₹40,000 total), even though Platinum has lower total revenue.
      </Pitfall>

      <Step n="4" label="Time Trend — Is the Business Growing or Contracting?">
        <p style={{ margin: '0 0 12px' }}>Raw revenue numbers without a time axis are nearly useless for decision-making. ₹85,000 this month is good if last month was ₹70,000. It is alarming if last month was ₹120,000. Month-over-month change is the minimum viable trend analysis. Adding a 3-month rolling average smooths seasonal noise so you can distinguish genuine trend from one-off spikes.</p>
        <p style={{ margin: 0 }}>The output you want is: monthly revenue, MoM absolute change, MoM percentage change, and a trailing 3-month average. This is the exact format used in weekly business reviews at every data-driven company.</p>
      </Step>

      <SQLPlayground
        initialQuery={`-- Step 4: Monthly revenue trend with MoM change and rolling average
WITH monthly AS (
  SELECT
    strftime('%Y-%m', order_date)         AS month,
    COUNT(*)                              AS orders,
    ROUND(SUM(total_amount), 2)           AS revenue,
    ROUND(AVG(total_amount), 2)           AS aov
  FROM orders
  WHERE order_status = 'Delivered'
  GROUP BY strftime('%Y-%m', order_date)
)
SELECT
  month,
  orders,
  revenue,
  aov,
  -- Month-over-month change
  LAG(revenue) OVER (ORDER BY month)     AS prev_month_rev,
  ROUND(revenue
    - LAG(revenue) OVER (ORDER BY month), 2) AS mom_abs_change,
  ROUND(100.0 *
    (revenue - LAG(revenue) OVER (ORDER BY month))
    / NULLIF(LAG(revenue) OVER (ORDER BY month), 0)
  , 1)                                   AS mom_pct_change,
  -- 3-month rolling average (smooths noise)
  ROUND(AVG(revenue) OVER (
    ORDER BY month
    ROWS BETWEEN 2 PRECEDING AND CURRENT ROW
  ), 2)                                  AS rolling_3m_avg,
  -- Cumulative revenue (progress toward annual target)
  ROUND(SUM(revenue) OVER (
    ORDER BY month
    ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW
  ), 2)                                  AS cumulative_revenue
FROM monthly
ORDER BY month;`}
        height={270}
        showSchema={true}
      />

      <Interpret>
        Read the mom_pct_change column first. Two consecutive months of negative MoM growth is a trend. One negative month is noise. Three or more is a crisis. The rolling_3m_avg should be your headline growth metric — it eliminates month-to-month variance. If rolling_3m_avg is declining while individual months occasionally spike, the business has a volatility problem: a few large orders are masking an underlying decline in regular purchase frequency. Compare the aov column alongside revenue: if revenue is growing but aov is declining, growth is coming from volume (more customers or more orders per customer) — that is healthier than growth from a few large orders.
      </Interpret>

      <Step n="5" label="Anomaly Detection — Flag What Needs Investigation">
        <p style={{ margin: '0 0 12px' }}>Averages hide problems. A store performing at 40% below the network mean average order value is not just "lower" — it is a signal that something specific is wrong there. The final step of any revenue report is surfacing these anomalies so the operations team knows exactly where to look.</p>
        <p style={{ margin: 0 }}>Use standard deviation to define "significantly different from normal". A store whose AOV is more than 1.5 standard deviations below the mean is flagged for investigation. A payment method showing unusually high cancellation rates is flagged for the payments team. These flags convert a passive report into an action list.</p>
      </Step>

      <SQLPlayground
        initialQuery={`-- Step 5: Anomaly detection — stores and payment methods needing attention
WITH store_aov AS (
  SELECT
    s.store_name,
    s.city,
    ROUND(AVG(o.total_amount), 2) AS store_aov,
    COUNT(o.order_id)             AS orders
  FROM orders AS o
  JOIN stores AS s ON s.store_id = o.store_id
  WHERE o.order_status = 'Delivered'
  GROUP BY s.store_id, s.store_name, s.city
),
network_stats AS (
  SELECT
    AVG(store_aov)   AS mean_aov,
    -- SQLite: manual stddev via variance formula
    SQRT(AVG(store_aov * store_aov) - AVG(store_aov) * AVG(store_aov)) AS stddev_aov
  FROM store_aov
)
SELECT
  sa.store_name,
  sa.city,
  sa.store_aov,
  ROUND(ns.mean_aov, 2)          AS network_mean_aov,
  ROUND(ns.stddev_aov, 2)        AS network_stddev,
  ROUND((sa.store_aov - ns.mean_aov)
    / NULLIF(ns.stddev_aov, 0), 2) AS z_score,
  CASE
    WHEN (sa.store_aov - ns.mean_aov)
      / NULLIF(ns.stddev_aov, 0) < -1.5
    THEN 'ANOMALY: AOV significantly below mean — investigate'
    WHEN (sa.store_aov - ns.mean_aov)
      / NULLIF(ns.stddev_aov, 0) > 1.5
    THEN 'OUTLIER: AOV significantly above mean — understand why'
    ELSE 'Normal range'
  END                            AS flag
FROM store_aov AS sa
CROSS JOIN network_stats AS ns
ORDER BY z_score;`}
        height={285}
        showSchema={true}
      />

      <Insight label="The z-score technique">
        A z-score measures how many standard deviations a data point is from the mean. Z = 0 means exactly average. Z = -2 means two standard deviations below — in a normal distribution, only 2.5% of values fall this far below. When you see a store with z = -1.8 on AOV, you are not looking at normal variation. You are looking at a structural difference that needs explanation. This is the difference between a report that says "Store X has low revenue" and one that says "Store X is a statistical outlier — its AOV is 1.8 standard deviations below the network average, consistent across 45 orders."
      </Insight>

      <HR />

      {/* ═══════════════════════════════════════════════════════════ */}
      {/* PROJECT 2 */}
      {/* ═══════════════════════════════════════════════════════════ */}

      <ProjectBrief
        num="02"
        title="Customer Lifecycle and Churn Architecture"
        role="Senior Analytics Engineer"
        company="FreshCart Growth Team"
        problem="The Growth team has a problem: they do not know which customers are about to churn until after they already have. By the time a customer has been inactive for 6 months, win-back costs 5x more than retention would have. You need to build a customer health monitoring system that identifies churn signals early — declining order frequency, shrinking basket size, increasing time between purchases — so that the CRM team can act proactively."
        deliverable="A customer lifecycle model that: (1) defines churn rigorously, (2) computes behavioral signals that precede churn, (3) scores every customer on risk level, (4) outputs a prioritized intervention list ranked by expected value of successful retention, (5) validates the model by checking whether the signals actually correlate with eventual churn."
        skills={['Cohort Analysis', 'Window Functions', 'LAG()', 'RFM Scoring', 'Date Arithmetic', 'CASE WHEN', 'CTEs', 'Conditional Aggregation', 'Statistical Correlation']}
        time="30 min"
      />

      <Step n="1" label="Define Churn — The Most Important Decision in the Whole Project">
        <p style={{ margin: '0 0 12px' }}>Churn is not a universal concept — it depends entirely on the expected purchase frequency of your business. A customer who hasn't ordered in 30 days might be churned for a daily-delivery app. For a quarterly subscription box, 30 days of silence is completely normal. Before writing a single line of analysis, you must define churn for your specific business context.</p>
        <p style={{ margin: 0 }}>Start by computing the distribution of inter-purchase intervals (time between consecutive orders for the same customer). The median inter-purchase interval is your baseline. Churn should be defined as: inactive for more than 2x–3x the median inter-purchase interval. This is data-driven churn definition, not an arbitrary threshold.</p>
      </Step>

      <SQLPlayground
        initialQuery={`-- Step 1: Compute the inter-purchase interval distribution
-- This tells us: what is the "normal" time between orders?
WITH ordered_events AS (
  SELECT
    customer_id,
    order_date,
    LAG(order_date) OVER (
      PARTITION BY customer_id
      ORDER BY order_date
    ) AS prev_order_date
  FROM orders
  WHERE order_status = 'Delivered'
),
gaps AS (
  SELECT
    customer_id,
    CAST(julianday(order_date) - julianday(prev_order_date) AS INTEGER) AS days_between_orders
  FROM ordered_events
  WHERE prev_order_date IS NOT NULL    -- skip first order (no previous)
)
SELECT
  MIN(days_between_orders)            AS min_gap,
  -- Approximate 25th percentile
  MAX(CASE WHEN pct <= 0.25 THEN days_between_orders END) AS p25_gap,
  -- Approximate median (50th percentile)
  MAX(CASE WHEN pct <= 0.50 THEN days_between_orders END) AS median_gap,
  -- Approximate 75th percentile
  MAX(CASE WHEN pct <= 0.75 THEN days_between_orders END) AS p75_gap,
  MAX(days_between_orders)            AS max_gap,
  ROUND(AVG(days_between_orders), 1)  AS mean_gap,
  COUNT(*)                            AS sample_size
FROM (
  SELECT days_between_orders,
    CAST(ROW_NUMBER() OVER (ORDER BY days_between_orders) AS REAL)
    / COUNT(*) OVER ()                AS pct
  FROM gaps
);`}
        height={270}
        showSchema={true}
      />

      <Interpret>
        The median_gap is your most important output. If median is 14 days, then a customer who has not ordered in 42 days (3x median) is showing a meaningful churn signal. If median is 45 days, then 90 days of silence is the churn threshold. Set your churn definition as: inactive for more than 2x the 75th percentile gap. Using the 75th percentile (not median) accounts for the fact that customers naturally have variable purchasing rhythms — you do not want to flag occasional customers as churned just because they match their own normal pattern.
      </Interpret>

      <Step n="2" label="Build the Customer Behavioral Fingerprint">
        <p style={{ margin: '0 0 12px' }}>Before you can detect churn, you need a behavioral baseline for each customer — what their "normal" looks like. A customer who normally orders every 7 days missing a 10-day window is more significant than a customer who normally orders every 60 days missing 10 days. The behavioral fingerprint captures: average inter-purchase interval, average order value, trend in order value over time (growing or shrinking basket), and purchase frequency velocity (are they ordering more or less frequently in recent months vs. their history).</p>
        <p style={{ margin: 0 }}>This is the data you would store in a "customer features" table in a production system, refreshed nightly, and used as input to a churn prediction model.</p>
      </Step>

      <SQLPlayground
        initialQuery={`-- Step 2: Build per-customer behavioral fingerprint
WITH customer_orders AS (
  SELECT
    customer_id,
    order_id,
    order_date,
    total_amount,
    ROW_NUMBER() OVER (PARTITION BY customer_id ORDER BY order_date) AS order_seq,
    COUNT(*) OVER (PARTITION BY customer_id)                         AS total_orders,
    LAG(order_date) OVER (PARTITION BY customer_id ORDER BY order_date) AS prev_date
  FROM orders
  WHERE order_status = 'Delivered'
),
with_gaps AS (
  SELECT
    customer_id,
    order_seq,
    total_orders,
    total_amount,
    order_date,
    CAST(julianday(order_date) - julianday(prev_date) AS INTEGER) AS gap_days
  FROM customer_orders
),
fingerprint AS (
  SELECT
    customer_id,
    total_orders,
    ROUND(AVG(total_amount), 2)               AS avg_order_value,
    -- Early half of orders vs late half (is basket growing or shrinking?)
    ROUND(AVG(CASE WHEN order_seq <= total_orders / 2
      THEN total_amount END), 2)              AS early_avg_value,
    ROUND(AVG(CASE WHEN order_seq > total_orders / 2
      THEN total_amount END), 2)              AS recent_avg_value,
    -- Average and recent inter-purchase intervals
    ROUND(AVG(gap_days), 1)                   AS avg_gap_days,
    ROUND(AVG(CASE WHEN order_seq > total_orders - 3
      THEN gap_days END), 1)                  AS recent_gap_days,
    MAX(order_date)                           AS last_order_date,
    CAST(julianday('now') - julianday(MAX(order_date)) AS INTEGER) AS days_since_last
  FROM with_gaps
  GROUP BY customer_id, total_orders
  HAVING total_orders >= 2   -- need at least 2 orders for gap analysis
)
SELECT
  customer_id,
  total_orders,
  avg_order_value,
  early_avg_value,
  recent_avg_value,
  ROUND(recent_avg_value - early_avg_value, 2)  AS value_trend,
  avg_gap_days,
  recent_gap_days,
  ROUND(recent_gap_days - avg_gap_days, 1)      AS gap_trend,
  days_since_last,
  last_order_date
FROM fingerprint
ORDER BY gap_trend DESC    -- customers whose gaps are widening most
LIMIT 15;`}
        height={350}
        showSchema={true}
      />

      <Interpret>
        The two trend columns are the early warning signals. value_trend is positive if the customer's recent baskets are larger than their early baskets — a healthy sign. Negative value_trend means the customer is spending less per order over time — a churn precursor. gap_trend is positive if the customer is taking longer between orders recently than they historically did — this is the most important churn signal. A customer whose average gap was 12 days but whose recent 3 orders had a 22-day gap is already showing behavioral change. This is the signal you want to detect 30 days before the customer becomes officially "inactive" by any threshold.
      </Interpret>

      <Step n="3" label="RFM Scoring — Classify Every Customer on Three Dimensions">
        <p style={{ margin: '0 0 12px' }}>RFM (Recency, Frequency, Monetary) is the industry-standard framework for segmenting customers by economic behavior. The key insight is that all three dimensions together are much more predictive than any one alone. A customer who ordered yesterday (high recency) but has only ever ordered once (low frequency) for ₹50 (low monetary) is very different from a customer who ordered yesterday, orders every week, and spends ₹1,000 each time.</p>
        <p style={{ margin: 0 }}>Score each dimension 1–5 (not 1–3 as in the intro module) for finer segmentation. A total score of 13–15 is a Champion. A customer with R=1, F=4, M=4 is "Used to be great, now gone" — a high-priority win-back target. A customer with R=4, F=1, M=4 placed one large order recently — a promising Prospect who needs a second purchase incentive.</p>
      </Step>

      <SQLPlayground
        initialQuery={`-- Step 3: Full 1-5 RFM scoring with segment classification
WITH base AS (
  SELECT
    c.customer_id,
    c.first_name,
    c.loyalty_tier,
    CAST(julianday('now') - julianday(MAX(o.order_date)) AS INTEGER) AS recency_days,
    COUNT(o.order_id)               AS frequency,
    ROUND(SUM(o.total_amount), 2)   AS monetary
  FROM customers AS c
  JOIN orders    AS o ON o.customer_id = c.customer_id
    AND o.order_status = 'Delivered'
  GROUP BY c.customer_id, c.first_name, c.loyalty_tier
),
-- Compute quintile boundaries for each dimension
quantiles AS (
  SELECT
    -- Recency: lower = better (scored in reverse)
    MAX(CASE WHEN r_pct <= 0.20 THEN recency_days END) AS r_q1,
    MAX(CASE WHEN r_pct <= 0.40 THEN recency_days END) AS r_q2,
    MAX(CASE WHEN r_pct <= 0.60 THEN recency_days END) AS r_q3,
    MAX(CASE WHEN r_pct <= 0.80 THEN recency_days END) AS r_q4,
    -- Frequency: higher = better
    MAX(CASE WHEN f_pct <= 0.20 THEN frequency END)    AS f_q1,
    MAX(CASE WHEN f_pct <= 0.40 THEN frequency END)    AS f_q2,
    MAX(CASE WHEN f_pct <= 0.60 THEN frequency END)    AS f_q3,
    MAX(CASE WHEN f_pct <= 0.80 THEN frequency END)    AS f_q4
  FROM (
    SELECT recency_days, frequency, monetary,
      CAST(ROW_NUMBER() OVER (ORDER BY recency_days)  AS REAL) / COUNT(*) OVER () AS r_pct,
      CAST(ROW_NUMBER() OVER (ORDER BY frequency)     AS REAL) / COUNT(*) OVER () AS f_pct,
      CAST(ROW_NUMBER() OVER (ORDER BY monetary)      AS REAL) / COUNT(*) OVER () AS m_pct
    FROM base
  )
),
scored AS (
  SELECT
    b.*,
    -- R score: 5 = most recent, 1 = least recent
    CASE
      WHEN b.recency_days <= q.r_q1 THEN 5
      WHEN b.recency_days <= q.r_q2 THEN 4
      WHEN b.recency_days <= q.r_q3 THEN 3
      WHEN b.recency_days <= q.r_q4 THEN 2
      ELSE 1
    END AS r_score,
    -- F score: 5 = most frequent
    CASE
      WHEN b.frequency > q.f_q4  THEN 5
      WHEN b.frequency > q.f_q3  THEN 4
      WHEN b.frequency > q.f_q2  THEN 3
      WHEN b.frequency > q.f_q1  THEN 2
      ELSE 1
    END AS f_score,
    -- M score: based on absolute thresholds
    CASE
      WHEN b.monetary >= 3000 THEN 5
      WHEN b.monetary >= 1500 THEN 4
      WHEN b.monetary >= 800  THEN 3
      WHEN b.monetary >= 300  THEN 2
      ELSE 1
    END AS m_score
  FROM base AS b
  CROSS JOIN quantiles AS q
)
SELECT
  customer_id, first_name, loyalty_tier,
  recency_days, frequency, monetary,
  r_score, f_score, m_score,
  r_score + f_score + m_score          AS rfm_total,
  CASE
    WHEN r_score >= 4 AND f_score >= 4 AND m_score >= 4 THEN 'Champion'
    WHEN r_score >= 3 AND f_score >= 3 AND m_score >= 4 THEN 'Loyal High-Value'
    WHEN r_score >= 4 AND f_score <= 2                  THEN 'New / Promising'
    WHEN r_score <= 2 AND f_score >= 4 AND m_score >= 4 THEN 'At Risk (was Champion)'
    WHEN r_score <= 2 AND f_score >= 3                  THEN 'At Risk'
    WHEN r_score = 1  AND f_score <= 2                  THEN 'Lost'
    WHEN r_score >= 3 AND m_score <= 2                  THEN 'Low-Value Active'
    ELSE 'Needs Nurturing'
  END                                  AS segment
FROM scored
ORDER BY rfm_total DESC;`}
        height={410}
        showSchema={true}
      />

      <Insight label="The most valuable cell in the RFM matrix">
        The "At Risk (was Champion)" segment — R=1 or 2, F=4 or 5, M=4 or 5 — is where your highest win-back ROI lives. These customers have proven they will spend significantly and order frequently. Their recency has dropped, but their historical behavior shows they are capable of high engagement. The expected value of winning one back is (their historical monetary / their historical frequency) × expected remaining orders. This is the exact list the CRM team should be working from for win-back campaigns, with the highest-monetary customers first.
      </Insight>

      <Step n="4" label="Cohort Retention Analysis — Measure Whether Your Retention is Improving">
        <p style={{ margin: '0 0 12px' }}>Cohort retention is the single most important metric for product health. It answers: of the customers who first ordered in month X, what percentage are still ordering 1, 2, 3 months later? If your M1 retention (% still ordering one month after first purchase) is improving across cohorts, your product is getting better at retaining customers. If it is declining, you have a worsening retention problem that more acquisition will not fix.</p>
        <p style={{ margin: 0 }}>The standard output is a retention matrix — rows are cohorts (acquisition months), columns are periods (M0, M1, M2...). Each cell shows absolute count and percentage of M0 that is still active. You want to see the percentages stable or improving as you read down the rows (newer cohorts).</p>
      </Step>

      <SQLPlayground
        initialQuery={`-- Step 4: Full cohort retention matrix with percentages
WITH first_order AS (
  SELECT
    customer_id,
    MIN(order_date)                    AS first_date,
    strftime('%Y-%m', MIN(order_date)) AS cohort_month
  FROM orders WHERE order_status = 'Delivered'
  GROUP BY customer_id
),
periods AS (
  SELECT
    o.customer_id,
    f.cohort_month,
    CAST(
      (strftime('%Y', o.order_date) - strftime('%Y', f.first_date)) * 12
      + strftime('%m', o.order_date) - strftime('%m', f.first_date)
    AS INTEGER) AS period
  FROM orders      AS o
  JOIN first_order AS f ON f.customer_id = o.customer_id
  WHERE o.order_status = 'Delivered'
),
cohort_counts AS (
  SELECT cohort_month,
    COUNT(DISTINCT CASE WHEN period = 0 THEN customer_id END) AS m0,
    COUNT(DISTINCT CASE WHEN period = 1 THEN customer_id END) AS m1,
    COUNT(DISTINCT CASE WHEN period = 2 THEN customer_id END) AS m2,
    COUNT(DISTINCT CASE WHEN period = 3 THEN customer_id END) AS m3,
    COUNT(DISTINCT CASE WHEN period = 4 THEN customer_id END) AS m4
  FROM periods
  GROUP BY cohort_month
)
SELECT
  cohort_month,
  m0                                            AS cohort_size,
  m1,
  ROUND(100.0 * m1 / NULLIF(m0,0), 1)          AS m1_retention_pct,
  m2,
  ROUND(100.0 * m2 / NULLIF(m0,0), 1)          AS m2_retention_pct,
  m3,
  ROUND(100.0 * m3 / NULLIF(m0,0), 1)          AS m3_retention_pct,
  m4,
  ROUND(100.0 * m4 / NULLIF(m0,0), 1)          AS m4_retention_pct
FROM cohort_counts
ORDER BY cohort_month;`}
        height={300}
        showSchema={true}
      />

      <Interpret>
        Read across each row (one cohort): M1/M0 is your 1-month retention rate. Industry benchmarks for e-commerce are 20–40% M1 retention. Below 20% means most customers try the service once and never return — a product or experience problem. Then read down each column: if M1_retention_pct is 25% for the oldest cohort and 35% for the newest, retention is improving — your product or onboarding is getting better. If it is declining, acquisition is outpacing retention improvement — you are filling a leaky bucket. The cell that matters most for LTV calculation is M3 retention: customers who order in months 0, 1, 2, and 3 are typically loyal long-term customers — their LTV is 3–5x a one-time purchaser.
      </Interpret>

      <Step n="5" label="Build the Prioritized Intervention List">
        <p style={{ margin: '0 0 12px' }}>The final output of any churn analysis is actionable: a ranked list of customers who should receive a specific intervention, ordered by the expected value of successful retention. Expected value = (probability of successful win-back × expected future revenue). Since you cannot easily compute probability without a trained model, use a proxy: customers with high historical monetary and frequency who have recently gone silent are both high-value to win back AND historically more likely to respond (they were engaged customers).</p>
        <p style={{ margin: 0 }}>Combine all the signals from steps 1–4: days_since_last, gap_trend, rfm score, monetary value. Output a ranked list with a recommended action for each tier of risk.</p>
      </Step>

      <SQLPlayground
        initialQuery={`-- Step 5: Prioritized intervention list — ranked by expected retention value
WITH base AS (
  SELECT
    c.customer_id, c.first_name, c.loyalty_tier,
    COUNT(o.order_id)               AS frequency,
    ROUND(SUM(o.total_amount), 2)   AS lifetime_value,
    ROUND(AVG(o.total_amount), 2)   AS avg_order_value,
    MAX(o.order_date)               AS last_order_date,
    CAST(julianday('now') - julianday(MAX(o.order_date)) AS INTEGER) AS days_inactive,
    -- Average gap between purchases (historical rhythm)
    ROUND(CAST(
      julianday(MAX(o.order_date)) - julianday(MIN(o.order_date))
    AS REAL) / NULLIF(COUNT(o.order_id) - 1, 0), 1) AS avg_purchase_interval
  FROM customers AS c
  JOIN orders    AS o ON o.customer_id = c.customer_id
    AND o.order_status = 'Delivered'
  GROUP BY c.customer_id, c.first_name, c.loyalty_tier
),
scored AS (
  SELECT *,
    -- How many "expected purchase intervals" have passed since last order?
    ROUND(days_inactive / NULLIF(avg_purchase_interval, 0), 1) AS intervals_missed,
    -- Risk score: composite of recency overrun + value
    CASE
      WHEN days_inactive > avg_purchase_interval * 3 THEN 'CRITICAL'
      WHEN days_inactive > avg_purchase_interval * 2 THEN 'HIGH'
      WHEN days_inactive > avg_purchase_interval * 1.5 THEN 'MEDIUM'
      ELSE 'LOW'
    END AS churn_risk
  FROM base
  WHERE frequency >= 2   -- must have enough history to compute interval
)
SELECT
  customer_id, first_name, loyalty_tier,
  frequency, lifetime_value, avg_order_value,
  days_inactive, avg_purchase_interval, intervals_missed,
  churn_risk,
  -- Prioritize by: risk level × lifetime value
  CASE churn_risk
    WHEN 'CRITICAL' THEN 'Win-back campaign — offer 20% discount on next order'
    WHEN 'HIGH'     THEN 'Re-engagement email — highlight new products'
    WHEN 'MEDIUM'   THEN 'Reminder push notification'
    ELSE            'Monitor — no action needed yet'
  END AS recommended_action
FROM scored
WHERE churn_risk IN ('CRITICAL', 'HIGH')
ORDER BY lifetime_value DESC;`}
        height={335}
        showSchema={true}
      />

      <Insight label="The intervals_missed column">
        This is more meaningful than raw days_inactive. A customer whose average purchase interval is 7 days who has been inactive for 21 days has missed 3 intervals — that is deeply abnormal for them specifically. A customer whose average interval is 90 days inactive for 21 days is perfectly on track. The same 21-day number means completely different things for these two customers. intervals_missed normalizes recency to each customer's own behavioral baseline, which is exactly what a production churn model does.
      </Insight>

      <HR />

      {/* ═══════════════════════════════════════════════════════════ */}
      {/* PROJECT 3 */}
      {/* ═══════════════════════════════════════════════════════════ */}

      <ProjectBrief
        num="03"
        title="Schema Design: Delivery SLA Tracking System"
        role="Database Engineer"
        company="FreshCart Infrastructure Team"
        problem="FreshCart is launching a delivery SLA guarantee: orders within city limits will be delivered within 2 hours of placement, or the customer receives a ₹100 store credit. The current orders table has a delivery_date column but no delivery timestamps, no SLA tracking, no credit issuance records, and no delivery partner assignment. You need to design a complete schema extension that supports: sub-minute delivery tracking, SLA compliance reporting, automatic credit calculation, and performance analytics by delivery partner, store, and time-of-day."
        deliverable="A fully normalized schema design with DDL, constraint rationale, index strategy, and five analytical queries that answer the SLA monitoring questions the operations team will ask daily."
        skills={['DDL', 'CREATE TABLE', 'Normalization (1NF–3NF)', 'CHECK Constraints', 'FOREIGN KEY Design', 'Index Strategy', 'Analytical Queries', 'Temporal Data Design']}
        time="30 min"
      />

      <Step n="1" label="Requirements Analysis — What Questions Must This Schema Answer?">
        <p style={{ margin: '0 0 12px' }}>Schema design always starts from queries, not from tables. A schema is good if it efficiently answers the questions the business will ask. Write out every analytical question before touching DDL. If you design tables first, you will discover mid-project that you cannot efficiently answer a critical question and will need to restructure.</p>
        <p style={{ margin: 0 }}>The operational questions for this system: What percentage of orders met SLA today / this week / by store? Which delivery partners have the worst SLA compliance? What time-of-day has the highest SLA breach rate? What is the total credit liability issued this month? Which customers received more than two credits (potential policy abuse)? How does weather / order volume affect delivery time?</p>
      </Step>

      <Why>
        Every question in that list maps to a JOIN path in the schema. "By delivery partner" means there must be a delivery_partners table and a foreign key linking deliveries to it. "Time-of-day breach rate" means delivery timestamps must be stored with time precision, not just date. "Customer credit count" means a credits table with a customer_id FK. Writing questions first forces you to enumerate all the entities and relationships before you start writing CREATE TABLE — you cannot miss an entity if you derive tables from questions.
      </Why>

      <Step n="2" label="Entity Identification and Normalization">
        <p style={{ margin: '0 0 12px' }}>From the requirements, extract every entity (noun that needs its own facts stored) and every relationship (FK). Entities: delivery_partners (their name, zone, rating), deliveries (one per order, with timestamps), sla_policies (what the SLA is per store zone), sla_breaches (a breach record when SLA is missed), customer_credits (credit issued per breach).</p>
        <p style={{ margin: 0 }}>Normalization check: is any non-key attribute dependent on another non-key attribute (transitive dependency — 3NF violation)? The store's SLA zone should not be stored in the deliveries table — that creates update anomalies if the zone changes. It belongs in a stores extension or an sla_policies lookup. Breach amount should not be hard-coded in deliveries — it belongs in sla_policies so it can change without data migration.</p>
      </Step>

      <CodeBlock
        label="Entity-Relationship reasoning before writing DDL"
        code={`-- ENTITIES and their key attributes:
-- delivery_partners: id, name, phone, home_zone, vehicle_type, active
-- deliveries:        id, order_id (FK), partner_id (FK), policy_id (FK),
--                    dispatched_at, pickup_at, delivered_at, distance_km
-- sla_policies:      id, store_id (FK), zone_name, sla_minutes, breach_credit_amount
-- sla_breaches:      id, delivery_id (FK), expected_by, actual_at, minutes_late
-- customer_credits:  id, customer_id (FK), breach_id (FK), amount, issued_at, redeemed_at

-- RELATIONSHIPS:
-- orders(1) → deliveries(1)           one order has one delivery
-- delivery_partners(1) → deliveries(N) one partner handles many deliveries
-- sla_policies(1) → deliveries(N)      one policy applies to many deliveries
-- deliveries(1) → sla_breaches(0..1)   a delivery may or may not breach SLA
-- sla_breaches(1) → customer_credits(1) each breach generates one credit

-- NORMALIZATION DECISIONS:
-- breach_credit_amount in sla_policies (NOT in sla_breaches) — 3NF
--   if stored in breach, it duplicates the policy and can drift from policy
-- sla_minutes in sla_policies (NOT in deliveries) — 3NF
--   the deadline is derived: dispatched_at + sla_minutes, not stored
-- zone assignment: store → policy (store_id FK in sla_policies)
--   changing a store's zone only updates one policy row, not all deliveries`}
      />

      <Step n="3" label="Write the DDL — Every Constraint Has a Reason">
        <p style={{ margin: '0 0 12px' }}>Professional DDL does not just create tables — every constraint has a documented reason. NOT NULL because this column is always required to answer a business question. CHECK because this column has a bounded domain (SLA minutes cannot be 0 or negative). UNIQUE because duplicates here would corrupt downstream reports. FOREIGN KEY with ON DELETE RESTRICT (not CASCADE) when the child records are financial — you do not want deleting a delivery partner to cascade-delete their breach records and the customer credits those breaches generated.</p>
        <p style={{ margin: 0 }}>Run this in the playground and verify the tables were created correctly by querying sqlite_master.</p>
      </Step>

      <SQLPlayground
        initialQuery={`-- Step 3: Full schema DDL with annotated constraints
CREATE TABLE IF NOT EXISTS delivery_partners (
  partner_id    INTEGER PRIMARY KEY,
  partner_name  TEXT    NOT NULL,
  phone         TEXT    NOT NULL UNIQUE,          -- one phone per partner
  home_zone     TEXT    NOT NULL,
  vehicle_type  TEXT    NOT NULL
                CHECK (vehicle_type IN ('bike','scooter','car','van')),
  is_active     INTEGER NOT NULL DEFAULT 1
                CHECK (is_active IN (0, 1)),
  joined_at     TEXT    NOT NULL DEFAULT (date('now'))
);

CREATE TABLE IF NOT EXISTS sla_policies (
  policy_id            INTEGER PRIMARY KEY,
  store_id             TEXT    NOT NULL REFERENCES stores(store_id)
                                ON DELETE RESTRICT,
  zone_name            TEXT    NOT NULL,
  sla_minutes          INTEGER NOT NULL CHECK (sla_minutes > 0),
  breach_credit_amount REAL    NOT NULL CHECK (breach_credit_amount >= 0),
  valid_from           TEXT    NOT NULL DEFAULT (date('now')),
  valid_until          TEXT,   -- NULL means currently active
  UNIQUE (store_id, zone_name, valid_from) -- one policy per store-zone per period
);

CREATE TABLE IF NOT EXISTS deliveries (
  delivery_id    INTEGER PRIMARY KEY,
  order_id       INTEGER NOT NULL UNIQUE              -- one delivery per order
                         REFERENCES orders(order_id) ON DELETE RESTRICT,
  partner_id     INTEGER NOT NULL
                         REFERENCES delivery_partners(partner_id) ON DELETE RESTRICT,
  policy_id      INTEGER NOT NULL
                         REFERENCES sla_policies(policy_id) ON DELETE RESTRICT,
  dispatched_at  TEXT    NOT NULL,                   -- ISO 8601 timestamp
  pickup_at      TEXT,                               -- NULL until picked up
  delivered_at   TEXT,                               -- NULL until delivered
  distance_km    REAL    CHECK (distance_km > 0),
  -- Derived SLA deadline: dispatched_at + sla_minutes (NOT stored — computed on read)
  CHECK (pickup_at IS NULL OR pickup_at >= dispatched_at),
  CHECK (delivered_at IS NULL OR delivered_at >= dispatched_at)
);

CREATE TABLE IF NOT EXISTS sla_breaches (
  breach_id      INTEGER PRIMARY KEY,
  delivery_id    INTEGER NOT NULL UNIQUE              -- one breach per delivery max
                         REFERENCES deliveries(delivery_id) ON DELETE RESTRICT,
  expected_by    TEXT    NOT NULL,                   -- computed SLA deadline
  actual_at      TEXT    NOT NULL,                   -- when actually delivered
  minutes_late   REAL    NOT NULL CHECK (minutes_late > 0)
);

CREATE TABLE IF NOT EXISTS customer_credits (
  credit_id    INTEGER PRIMARY KEY,
  customer_id  INTEGER NOT NULL
               REFERENCES customers(customer_id) ON DELETE RESTRICT,
  breach_id    INTEGER NOT NULL UNIQUE              -- one credit per breach
               REFERENCES sla_breaches(breach_id) ON DELETE RESTRICT,
  amount       REAL    NOT NULL CHECK (amount > 0),
  issued_at    TEXT    NOT NULL DEFAULT (datetime('now')),
  redeemed_at  TEXT,                               -- NULL until used
  CHECK (redeemed_at IS NULL OR redeemed_at >= issued_at)
);

-- Verify all tables created successfully
SELECT name, type FROM sqlite_master
WHERE type = 'table'
  AND name IN ('delivery_partners','sla_policies','deliveries',
               'sla_breaches','customer_credits')
ORDER BY name;`}
        height={400}
        showSchema={false}
      />

      <Step n="4" label="Index Strategy — Design Indexes From the Query Access Patterns">
        <p style={{ margin: '0 0 12px' }}>Indexes are not free — every index slows down writes and consumes storage. Create indexes only where the query access pattern justifies them. For each index, articulate exactly which query it enables and what the cost without it would be. The primary key columns already have indexes in SQLite. You need to add indexes for: every foreign key column (SQLite does not auto-index FK columns, unlike PostgreSQL), and every column that appears in a WHERE clause in the operational queries.</p>
        <p style={{ margin: 0 }}>The five operational queries for this system: (1) all deliveries by partner today, (2) breaches in the last 7 days by store, (3) unredeemed credits by customer, (4) SLA compliance rate by hour-of-day, (5) partner performance ranking this month. Map each query to the indexes it needs.</p>
      </Step>

      <SQLPlayground
        initialQuery={`-- Step 4: Create indexes justified by access patterns
-- (Run after Step 3 to ensure tables exist)

-- FK columns: SQLite does not auto-index these (PostgreSQL does)
-- Without these, every JOIN on these FKs = full table scan
CREATE INDEX IF NOT EXISTS idx_deliveries_partner
  ON deliveries(partner_id);

CREATE INDEX IF NOT EXISTS idx_deliveries_policy
  ON deliveries(policy_id);

CREATE INDEX IF NOT EXISTS idx_breaches_delivery
  ON sla_breaches(delivery_id);

CREATE INDEX IF NOT EXISTS idx_credits_customer
  ON customer_credits(customer_id);

CREATE INDEX IF NOT EXISTS idx_credits_breach
  ON customer_credits(breach_id);

-- Operational query indexes
-- Q1: "all deliveries today" — dispatched_at is the filter
CREATE INDEX IF NOT EXISTS idx_deliveries_dispatched
  ON deliveries(dispatched_at);

-- Q2: "breaches in last 7 days" — actual_at is the filter
CREATE INDEX IF NOT EXISTS idx_breaches_actual_at
  ON sla_breaches(actual_at);

-- Q3: "unredeemed credits by customer" — composite index
-- covers WHERE customer_id = ? AND redeemed_at IS NULL
CREATE INDEX IF NOT EXISTS idx_credits_customer_redeemed
  ON customer_credits(customer_id, redeemed_at);

-- Verify indexes
SELECT name, tbl_name, sql
FROM sqlite_master
WHERE type = 'index'
  AND tbl_name IN ('deliveries','sla_breaches','customer_credits')
ORDER BY tbl_name, name;`}
        height={320}
        showSchema={false}
      />

      <Step n="5" label="Seed Data and Validate With Analytical Queries">
        <p style={{ margin: '0 0 12px' }}>A schema is only proven correct when you can answer the business questions from it. Insert realistic test data, then run all five operational queries. If any query is unexpectedly complex or slow, go back and reconsider the schema — that is schema validation. The complexity of a query is often a signal of a schema design problem.</p>
        <p style={{ margin: 0 }}>Insert: 2 delivery partners, 1 SLA policy, 3 deliveries (2 on-time, 1 breached), 1 breach record, 1 credit. Then answer: SLA compliance rate, total credit liability, and which partner had the breach.</p>
      </Step>

      <SQLPlayground
        initialQuery={`-- Step 5: Seed + analytical validation
-- Re-create tables (in case this playground hasn't run Steps 3-4)
CREATE TABLE IF NOT EXISTS delivery_partners (
  partner_id INTEGER PRIMARY KEY, partner_name TEXT NOT NULL,
  phone TEXT NOT NULL UNIQUE, home_zone TEXT NOT NULL,
  vehicle_type TEXT NOT NULL CHECK (vehicle_type IN ('bike','scooter','car','van')),
  is_active INTEGER NOT NULL DEFAULT 1
);
CREATE TABLE IF NOT EXISTS sla_policies (
  policy_id INTEGER PRIMARY KEY, store_id TEXT NOT NULL,
  zone_name TEXT NOT NULL, sla_minutes INTEGER NOT NULL CHECK (sla_minutes > 0),
  breach_credit_amount REAL NOT NULL CHECK (breach_credit_amount >= 0)
);
CREATE TABLE IF NOT EXISTS deliveries (
  delivery_id INTEGER PRIMARY KEY,
  order_id INTEGER NOT NULL UNIQUE,
  partner_id INTEGER NOT NULL, policy_id INTEGER NOT NULL,
  dispatched_at TEXT NOT NULL, pickup_at TEXT, delivered_at TEXT
);
CREATE TABLE IF NOT EXISTS sla_breaches (
  breach_id INTEGER PRIMARY KEY, delivery_id INTEGER NOT NULL UNIQUE,
  expected_by TEXT NOT NULL, actual_at TEXT NOT NULL,
  minutes_late REAL NOT NULL CHECK (minutes_late > 0)
);
CREATE TABLE IF NOT EXISTS customer_credits (
  credit_id INTEGER PRIMARY KEY, customer_id INTEGER NOT NULL,
  breach_id INTEGER NOT NULL UNIQUE,
  amount REAL NOT NULL CHECK (amount > 0),
  issued_at TEXT NOT NULL DEFAULT (datetime('now')), redeemed_at TEXT
);

-- Seed data
INSERT OR IGNORE INTO delivery_partners VALUES
  (1,'Ravi Kumar',  '9900000001','Mumbai Central','bike',   1),
  (2,'Priya Singh', '9900000002','Mumbai South',  'scooter',1);

INSERT OR IGNORE INTO sla_policies VALUES
  (1,'ST001','Mumbai Central',120,100.00);

-- 3 deliveries: order_ids 1,2,3 from FreshCart orders table
INSERT OR IGNORE INTO deliveries VALUES
  (1,1,1,1,'2024-03-15 10:00','2024-03-15 10:20','2024-03-15 11:45'), -- on time (105 min)
  (2,2,2,1,'2024-03-15 11:00','2024-03-15 11:25','2024-03-15 13:15'), -- BREACH (135 min, +15 late)
  (3,3,1,1,'2024-03-15 14:00','2024-03-15 14:18','2024-03-15 15:50'); -- on time (110 min)

INSERT OR IGNORE INTO sla_breaches VALUES
  (1,2,'2024-03-15 13:00','2024-03-15 13:15',15.0);

-- Customer_id for order 2 (from FreshCart data)
INSERT OR IGNORE INTO customer_credits
  SELECT 1, o.customer_id, 1, 100.00, datetime('now'), NULL
  FROM orders AS o WHERE o.order_id = 2;

-- ── ANALYTICAL QUERY 1: SLA compliance rate ──────────────────
SELECT
  COUNT(*) FILTER (WHERE d.delivered_at IS NOT NULL)    AS completed_deliveries,
  COUNT(b.breach_id)                                    AS breaches,
  COUNT(*) FILTER (WHERE d.delivered_at IS NOT NULL)
    - COUNT(b.breach_id)                                AS on_time,
  ROUND(100.0 *
    (COUNT(*) FILTER (WHERE d.delivered_at IS NOT NULL) - COUNT(b.breach_id))
    / NULLIF(COUNT(*) FILTER (WHERE d.delivered_at IS NOT NULL), 0)
  , 1)                                                  AS sla_compliance_pct
FROM deliveries AS d
LEFT JOIN sla_breaches AS b ON b.delivery_id = d.delivery_id;`}
        height={400}
        showSchema={false}
      />

      <SQLPlayground
        initialQuery={`-- ANALYTICAL QUERY 2: Delivery time distribution by partner
-- (Run after Step 5 seed query above)
SELECT
  dp.partner_name,
  COUNT(d.delivery_id)                    AS deliveries,
  ROUND(AVG(
    (julianday(d.delivered_at) - julianday(d.dispatched_at)) * 1440
  ), 1)                                   AS avg_delivery_minutes,
  ROUND(MIN(
    (julianday(d.delivered_at) - julianday(d.dispatched_at)) * 1440
  ), 1)                                   AS fastest_minutes,
  ROUND(MAX(
    (julianday(d.delivered_at) - julianday(d.dispatched_at)) * 1440
  ), 1)                                   AS slowest_minutes,
  COUNT(b.breach_id)                      AS breaches,
  ROUND(100.0 * COUNT(b.breach_id)
    / NULLIF(COUNT(d.delivery_id), 0), 1) AS breach_rate_pct
FROM delivery_partners AS dp
JOIN deliveries        AS d  ON d.partner_id    = dp.partner_id
LEFT JOIN sla_breaches AS b  ON b.delivery_id   = d.delivery_id
WHERE d.delivered_at IS NOT NULL
GROUP BY dp.partner_id, dp.partner_name
ORDER BY breach_rate_pct DESC;`}
        height={230}
        showSchema={false}
      />

      <Interpret>
        Partner 2 (Priya Singh) shows a 100% breach rate in the seed data — one delivery, one breach. In a real dataset with hundreds of deliveries, this query surfaces exactly which partners consistently underperform SLA. The avg_delivery_minutes column enables a complementary analysis: a partner with 0% breaches but avg_delivery_minutes close to the SLA limit (110 out of 120 minutes) is a latent risk — one traffic incident makes them a breacher. The truly reliable partners show low avg with low breach rate.
      </Interpret>

      <Step n="6" label="Schema Retrospective — What Would Break at Scale?">
        <p style={{ margin: '0 0 12px' }}>Good engineers design schemas not just for the current load but for 100x the current load. Review the schema and identify: (1) which tables will grow fastest, (2) which queries will become slow as data accumulates, (3) what partitioning or archival strategy will be needed.</p>
        <p style={{ margin: 0 }}>In this schema: deliveries and sla_breaches grow with every order — at 10,000 orders/day they accumulate 300,000 rows/month. The operational queries all filter on time columns (dispatched_at, actual_at). Without composite indexes on (partner_id, dispatched_at) and (store_id, actual_at), monthly reports become full table scans. For reporting at scale, a separate analytics table denormalizing delivery + breach + policy into one row per delivery would dramatically speed up aggregations at the cost of some write complexity.</p>
      </Step>

      <CodeBlock
        label="Scale considerations — additional indexes and partitioning strategy"
        code={`-- At scale: composite indexes for the most common analytical filters
-- "Partner performance this month"
CREATE INDEX idx_deliveries_partner_dispatched
  ON deliveries(partner_id, dispatched_at);

-- "Store SLA compliance this week"
CREATE INDEX idx_deliveries_policy_dispatched
  ON deliveries(policy_id, dispatched_at);

-- "Unredeemed credits this month"
CREATE INDEX idx_credits_redeemed_issued
  ON customer_credits(redeemed_at, issued_at)
  WHERE redeemed_at IS NULL;     -- partial index — only unredeemed rows indexed

-- Archival strategy:
-- After 90 days: move old deliveries to deliveries_archive (same schema)
-- Keep deliveries table to last 90 days for operational queries
-- Analytical queries JOIN both tables via UNION ALL or a view

-- At PostgreSQL scale: partition deliveries by month
-- CREATE TABLE deliveries_2024_03 PARTITION OF deliveries
--   FOR VALUES FROM ('2024-03-01') TO ('2024-04-01');
-- SQLite: emulate with separate tables + UNION ALL view`}
      />

      <HR />

      <KeyTakeaways
        items={[
          'Revenue intelligence: always compute revenue_per_customer, not just total revenue. Use z-scores to flag stores deviating significantly from the network mean — that is a statistical anomaly, not noise.',
          'Churn definition must be data-driven: compute the inter-purchase interval distribution, then define churn as inactive for 2–3x the P75 gap. Arbitrary thresholds (30 days, 90 days) ignore each customer\'s actual purchase rhythm.',
          'The behavioral fingerprint signals that precede churn: widening gap between recent purchases (gap_trend > 0) and shrinking basket size (value_trend < 0). These appear 2–4 weeks before a customer crosses the official "inactive" threshold.',
          'RFM scoring on quintiles (not fixed thresholds) makes the segmentation relative to your actual customer population — it adapts to dataset size and distribution.',
          'The "At Risk (was Champion)" RFM cell — high F and M, low R — is the highest expected-value win-back target. These customers have proven they will spend; you just need to reactivate them.',
          'Schema design starts from queries, not tables. Write out every analytical question the schema must answer, derive the entities and relationships from those questions, then write DDL.',
          'Every constraint has a reason: NOT NULL because the column is required for correctness; CHECK for bounded domains; UNIQUE for business uniqueness rules; ON DELETE RESTRICT (not CASCADE) for financial records.',
          'Index only what you need: every index slows writes. Justify each index with the specific query it enables. Composite indexes (partner_id, dispatched_at) support range queries within a partition. Partial indexes (WHERE redeemed_at IS NULL) index only the rows that matter for operational queries.',
        ]}
      />

      <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 10, padding: '24px', marginTop: 40 }}>
        <p style={{ fontSize: 10, color: 'var(--muted)', letterSpacing: '.12em', textTransform: 'uppercase', fontFamily: 'var(--font-mono)', fontWeight: 700, margin: '0 0 10px' }}>You have completed all 62 SQL modules</p>
        <p style={{ fontSize: 15, color: 'var(--text)', lineHeight: 1.85, margin: '0 0 20px' }}>
          The curriculum is complete — from SELECT basics to production-grade analytical systems. The next step is real data: find a dataset you are genuinely curious about, define a business question, and build the answer end to end. That is the work.
        </p>
        <Link href="/learn/sql" style={{ background: C, color: '#000', padding: '11px 24px', borderRadius: 7, fontWeight: 700, fontSize: 13, textDecoration: 'none', display: 'inline-block' }}>
          Back to SQL Curriculum
        </Link>
      </div>

    </LearnLayout>
  );
}
