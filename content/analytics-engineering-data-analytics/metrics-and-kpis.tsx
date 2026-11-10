import { LearnLayout } from '@/components/content/LearnLayout'
import { Callout, Code, H3, KeyTakeaways, Mistakes, NextLesson, P, Part, Practice, Table } from '@/components/content/LessonKit'

export default function MetricsAndKpis() {
  return (
    <LearnLayout
      title="Defining Metrics and KPIs"
      description="North-star and guardrail metrics, funnels, cohorts, retention, writing a metric definition, and building a metrics layer."
      section="Data Analytics & Statistics — Lesson 04"
      readTime="35 min"
    >
      <Part n={1} label="From data to decisions" title="A Metric Needs a Decision Behind It">
        <P>
          A metric is a consistently calculated measure used to understand a process or make a decision. A KPI is a metric
          that a team explicitly prioritises because it reflects progress toward an objective. A chart full of numbers does
          not create alignment: two teams can use the word “conversion” while counting different users, events, or time
          windows. Define the decision and population before choosing the aggregation.
        </P>
        <P>
          Use a metric definition that can be implemented repeatedly: name, purpose, formula, numerator, denominator, unit,
          grain, event or source tables, time zone, filters, exclusions, owner, refresh cadence, and known limitations.
          Decide how late-arriving or cancelled events are handled. For a metric such as orders per customer, specify
          whether the denominator is all registered users, active shoppers, or users who started checkout.
        </P>
        <Table
          head={['Field', 'Example definition']}
          rows={[
            ['Metric', 'Completed order conversion rate'],
            ['Numerator / denominator', 'Unique eligible visitors with a completed order / unique eligible visitors'],
            ['Grain and window', 'Visitor, calendar day in Asia/Kolkata'],
            ['Exclusions', 'Internal test traffic and cancelled test orders'],
            ['Owner / decision', 'Checkout product team; monitor funnel changes'],
          ]}
          caption="A written definition prevents silent metric drift across dashboards."
        />
        <Callout type="info">
          Metric definitions are product contracts. Put them somewhere analysts, engineers, and decision-makers can find and
          review when business rules change.
        </Callout>
      </Part>

      <Part n={2} label="North star" title="Pick a North-Star Metric with Guardrails">
        <P>
          A north-star metric expresses durable customer value delivered by the product, not just activity that is easy to
          increase. For a marketplace, “successful orders delivered on time” might be more aligned to value than raw app
          opens. The exact metric depends on the business model and strategy; it should be understandable, measurable, and
          connected to outcomes the team can influence.
        </P>
        <P>
          Pair the north star with guardrails that expose harmful trade-offs. A delivery marketplace may watch refund rate,
          late deliveries, support contacts, repeat purchase, and contribution margin. A team that optimises only order
          volume could increase low-quality or unprofitable transactions. Review leading indicators and lagging outcomes
          together, and avoid turning every measure into an individual performance target.
        </P>
        <Callout type="example">
          If an e-commerce team promotes orders with deep discounts, GMV may rise while margin and repeat use fall. A guardrail
          can surface that trade-off before the north-star number becomes a misleading success story.
        </Callout>
      </Part>

      <Part n={3} label="Metric arithmetic" title="DAU, MAU, GMV and Rates Need Exact Rules">
        <P>
          DAU counts distinct active users on a day; MAU counts distinct active users in a month. Define “active” from
          meaningful behaviour—such as viewing a product or placing an order—and specify how accounts, devices, and
          anonymous-to-known identities are deduplicated. DAU/MAU is sometimes used as a rough engagement ratio, but its
          meaning depends on product usage patterns and the exact definitions; it is not a universal quality score.
        </P>
        <P>
          Gross merchandise value (GMV) represents the value of goods transacted through a marketplace over a period, under
          a stated policy for cancellations, discounts, shipping, taxes, and refunds. It is not necessarily revenue or
          profit. In an Indian e-commerce report, label whether amounts are in ₹ and whether they include GST, delivery
          charges, or refunded orders. Avoid mixing a count of orders with a sum of item values without explaining it.
        </P>
        <Code file="daily_active_users.sql" lang="sql" code={`
-- events has one row per tracked event; timestamps are stored in UTC.
-- Convert the reporting date explicitly to the agreed business timezone.
SELECT
  DATE(event_ts AT TIME ZONE 'Asia/Kolkata') AS activity_date,
  COUNT(DISTINCT user_id) AS dau
FROM analytics.events
WHERE event_name IN ('product_view', 'add_to_cart', 'order_completed')
  AND user_id IS NOT NULL
GROUP BY 1
ORDER BY 1;
`} />
        <P>
          SQL timezone syntax can vary by warehouse. Confirm the engine's conversion semantics and use a single calendar
          definition throughout the metric layer. Identity resolution and event quality matter as much as the final
          <code> COUNT(DISTINCT ...)</code> expression.
        </P>
      </Part>

      <Part n={4} label="Funnels" title="Measure the Steps Between Intent and Value">
        <P>
          A funnel describes the sequence of behaviours required to reach an outcome—for example product viewed, added to
          cart, checkout started, payment attempted, and order completed. Decide whether each step is counted as unique users
          or events, whether order matters, how much time is allowed between steps, and how repeated attempts are handled.
          Without these rules, conversion rates from two dashboards are not comparable.
        </P>
        <Code file="checkout_funnel.sql" lang="sql" code={`
WITH user_steps AS (
  SELECT
    user_id,
    MAX(CASE WHEN event_name = 'product_view' THEN 1 ELSE 0 END) AS viewed,
    MAX(CASE WHEN event_name = 'add_to_cart' THEN 1 ELSE 0 END) AS added,
    MAX(CASE WHEN event_name = 'checkout_started' THEN 1 ELSE 0 END) AS checkout_started,
    MAX(CASE WHEN event_name = 'order_completed' THEN 1 ELSE 0 END) AS completed
  FROM analytics.events
  WHERE event_ts >= TIMESTAMP '2026-10-01 00:00:00'
    AND event_ts <  TIMESTAMP '2026-10-08 00:00:00'
    AND user_id IS NOT NULL
  GROUP BY user_id
)
SELECT
  COUNT(*) FILTER (WHERE viewed = 1) AS viewers,
  COUNT(*) FILTER (WHERE added = 1) AS adders,
  COUNT(*) FILTER (WHERE checkout_started = 1) AS checkouts,
  COUNT(*) FILTER (WHERE completed = 1) AS purchasers
FROM user_steps;
`} />
        <P>
          This simple illustration counts whether each user performed a step during the same week; it does not enforce step
          order, a fixed session, or a conversion window. A production funnel should encode its intended sequence and cohort
          logic, often with first-event timestamps and a bounded period between steps. State the denominator for every
          conversion rate.
        </P>
        <Callout type="warning">
          A funnel chart can make a step look like a cause of drop-off, but event loss or identity stitching changes may also
          remove users from later steps. Validate instrumentation before proposing a product fix.
        </Callout>
      </Part>

      <Part n={5} label="Retention" title="Build Retention Cohorts with SQL">
        <P>
          A cohort groups people by a shared starting event or date, such as the month of first purchase. Retention asks what
          fraction of that cohort returns and performs a defined activity in a later period. Distinguish classic retention
          (“active on day 7”) from rolling retention (“active on or after day 7”) and unbounded retention. Define the return
          event and the cohort denominator; exclude users whose follow-up period has not elapsed when comparing mature
          cohorts.
        </P>
        <Code file="monthly_retention.sql" lang="sql" code={`
WITH first_order AS (
  SELECT customer_id, MIN(order_date) AS cohort_date
  FROM commerce.orders
  WHERE status = 'completed'
  GROUP BY customer_id
), monthly_activity AS (
  SELECT DISTINCT customer_id,
         DATE_TRUNC('month', order_date) AS activity_month
  FROM commerce.orders
  WHERE status = 'completed'
), cohort_activity AS (
  SELECT f.cohort_date, a.activity_month,
         (EXTRACT(YEAR FROM a.activity_month) - EXTRACT(YEAR FROM f.cohort_date)) * 12
         + EXTRACT(MONTH FROM a.activity_month) - EXTRACT(MONTH FROM f.cohort_date) AS month_number,
         a.customer_id
  FROM first_order f
  JOIN monthly_activity a ON a.customer_id = f.customer_id
  WHERE a.activity_month >= DATE_TRUNC('month', f.cohort_date)
)
SELECT cohort_date, month_number,
       COUNT(DISTINCT customer_id) AS retained_customers
FROM cohort_activity
GROUP BY cohort_date, month_number
ORDER BY cohort_date, month_number;
`} />
        <P>
          To calculate a retention rate, divide retained customers in each cohort-period by the cohort's eligible starting
          customer count. The SQL above returns counts so the denominator can be audited separately. Use calendar boundaries
          consistently and ensure all periods are complete before interpreting a downward trend in recent cohorts.
        </P>
      </Part>

      <Part n={6} label="Metric quality" title="Protect the Meaning of the Number">
        <P>
          Good metric systems make definitions reusable and testable. Validate uniqueness at the intended grain, allowed
          values, non-null identifiers, event freshness, and reconciliation against source records. Monitor changes in
          instrumentation and identity joins. A sudden change in DAU may represent a tracking release rather than a product
          shift; annotate known releases and backfills in the reporting surface.
        </P>
        <Code file="metric_checks.sql" lang="sql" code={`
-- Check that completed orders have a customer and a non-negative amount.
SELECT
  COUNT(*) AS completed_order_rows,
  COUNT(*) FILTER (WHERE customer_id IS NULL) AS missing_customer_rows,
  COUNT(*) FILTER (WHERE total_amount < 0) AS negative_amount_rows,
  COUNT(DISTINCT order_id) AS unique_order_ids,
  SUM(total_amount) AS gross_amount_rupees
FROM commerce.orders
WHERE status = 'completed'
  AND order_date >= DATE '2026-10-01'
  AND order_date <  DATE '2026-11-01';
`} />
        <P>
          For a GMV dashboard, reconcile a sample of orders to item-level details and document refund treatment. For funnel
          metrics, monitor the proportion of sessions with each critical event and the share with a stable user identifier.
          Data quality checks belong near the metric logic, not only in a report analyst's memory.
        </P>
      </Part>

      <Part n={7} label="Metric governance" title="Create a Shared Metric Layer">
        <P>
          A shared semantic or metrics layer centralises definitions so dashboards and experiments use compatible logic.
          Keep the implementation close to source transformations where feasible, name measures consistently, expose owners
          and descriptions, and version important logic changes. Document whether metrics are additive across dimensions:
          daily distinct users cannot simply be summed to get monthly distinct users because one person can appear on many
          days.
        </P>
        <P>
          Set a review path for proposed metric changes. A definition may need to change when policy, event tracking, or the
          product changes; record the effective date and evaluate whether historical values should be restated. Communicate
          breaking changes before dashboards silently shift. Access controls should also prevent sensitive customer-level
          records from being exposed unnecessarily through a broad metrics surface.
        </P>
        <Table
          head={['Metric', 'Grain', 'Important caveat']}
          rows={[
            ['DAU', 'User × calendar date', 'Daily distinct counts are not additive across dates'],
            ['Checkout conversion', 'Eligible visitor × experiment window', 'Specify denominator, attribution window, and identity rule'],
            ['GMV', 'Order or item × period', 'State cancellation, refund, tax, shipping and discount policy'],
            ['Monthly retention', 'Cohort × month number', 'Recent cohorts may not have full follow-up'],
          ]}
        />
      </Part>

      <Part n={8} label="Pitfalls" title="Common Metric and KPI Mistakes">
        <Mistakes items={[
          { mistake: 'Choosing a KPI because it is easy to count', cause: 'Convenient activity can be weakly connected to customer value.', fix: 'Tie the metric to an explicit outcome and pair it with guardrails.' },
          { mistake: 'Reporting GMV as revenue or profit', cause: 'Transaction value may include amounts the marketplace does not earn.', fix: 'Name the value precisely and publish the policy for taxes, refunds and fees.' },
          { mistake: 'Summing daily unique users to report monthly users', cause: 'The same person may be counted on multiple dates.', fix: 'Recompute the distinct count over the monthly population.' },
          { mistake: 'Calling a funnel a sequence without enforcing order', cause: 'A user may complete later events before earlier ones within the window.', fix: 'Use event timestamps, order constraints and an explicit conversion window.' },
        ]} />
      </Part>

      <Part n={9} label="Practice" title="Design Metrics for an Indian Marketplace">
        <Practice
          title="A reusable analytics specification"
          tasks={[
            'Write a metric definition for completed-order conversion, including numerator, denominator, identity, timezone, window, and exclusions.',
            'Propose one north-star metric and three guardrails for an e-commerce product; explain which decision each supports.',
            'Write SQL for DAU using meaningful activity and for monthly GMV in ₹ with your cancellation and refund policy stated.',
            'Build a three-step checkout funnel and explicitly encode whether it is user-, session-, or event-based.',
            'Create monthly first-purchase cohorts, calculate retained-customer counts, and divide by cohort size only for mature periods.',
          ]}
          hint="Start with the business definition and grain, then write SQL. Check that the denominator is observable and that distinct counts are not incorrectly summed across periods."
        />
      </Part>

      <KeyTakeaways items={[
        'A useful KPI connects to a decision and has a written formula, grain, population, owner, and limitations.',
        'Pair north-star measures with guardrails so growth does not hide quality, customer, or financial harm.',
        'DAU, MAU, conversion, and GMV require explicit definitions for identities, events, dates, and business rules.',
        'Funnel analysis needs a defined sequence, denominator, time window, and reliable instrumentation.',
        'Retention cohorts group customers by a starting event and compare later activity using mature follow-up periods.',
        'Validate metric quality and govern shared definitions so teams do not unknowingly compare different calculations.',
      ]} />

      <H3>Next</H3>
      <NextLesson
        href="/learn/analytics-engineering-data-analytics/ab-testing"
        label="Lesson 05 · A/B Testing — Design, Analysis and Pitfalls"
        text="With trustworthy measures in place, test product changes systematically. Next, plan randomisation, sample size, and analysis while avoiding peeking, sample-ratio mismatch, and novelty effects."
      />
    </LearnLayout>
  )
}
