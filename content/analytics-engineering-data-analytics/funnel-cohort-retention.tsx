import { LearnLayout } from '@/components/content/LearnLayout'
import { Bullets, Callout, Code, H3, KeyTakeaways, Mistakes, NextLesson, P, Part, Practice, Steps, Table } from '@/components/content/LessonKit'

export default function FunnelCohortRetention() {
  return (
    <LearnLayout
      title="Funnel, Cohort and Retention Analysis"
      description="Build conversion funnels, cohort tables and retention curves in SQL and Python, and explain what they say about a product."
      section="Data Analytics & Statistics — Lesson 11"
      readTime="40 min"
    >
      <Part n={1} label="Start with a decision" title="A Funnel Is a Sequence, Not a Chart">
        <P>
          A product team may ask why fewer new customers complete their first purchase. A funnel turns that broad question into
          an ordered set of user actions, such as <code>visit</code>, <code>add_to_cart</code>, and <code>purchase</code>. It
          tells you where observed progression thins out; by itself it does not explain why or prove that a change caused the drop.
        </P>
        <P>
          Before querying, agree on the population, time window, event definitions, ordering rule, and denominator. Is the funnel
          for first-time visitors in a week, or all sessions? Can a user complete the steps across multiple sessions? Does the
          first event start the clock? Each choice changes the answer, so write it down before you compare teams or time periods.
        </P>
        <Table
          head={['Analysis', 'Unit and starting point', 'Question it answers']}
          rows={[
            ['Funnel', 'Users or sessions that begin at a defined step', 'Where do eligible journeys fail to reach the next step?'],
            ['Cohort', 'Entities grouped by a shared start date or event', 'How do groups with a common starting point behave later?'],
            ['Retention', 'Members of a cohort active again in a later period', 'What share returns, and how does that change with age?'],
            ['Churn', 'Customers who meet an explicit exit rule', 'How many stop being customers during the defined period?'],
          ]}
        />
        <Callout type="info">
          A funnel conversion rate is conditional on reaching its denominator step. Overall conversion and step-to-step conversion
          are different metrics; label both rather than using the word conversion without a definition.
        </Callout>
      </Part>

      <Part n={2} label="Prepare the events" title="Choose a Grain and Make Events Trustworthy">
        <P>
          Assume an append-only event table with one row per recorded event: <code>user_id</code>, <code>event_name</code>,
          <code> event_time</code>, <code>event_id</code>, <code>ingested_at</code>, and optional <code>session_id</code>. The query below uses PostgreSQL
          syntax. A stable event ID helps remove duplicate ingestion; filtering invalid users and a bounded analysis window makes
          the population reproducible.
        </P>
        <Code file="eligible_events.sql" lang="sql" code={`
WITH eligible_events AS (
    SELECT DISTINCT ON (event_id)
        user_id,
        event_name,
        event_time,
        session_id
    FROM product_events
    WHERE user_id IS NOT NULL
      AND event_time >= TIMESTAMP '2026-01-01 00:00:00'
      AND event_time <  TIMESTAMP '2026-02-01 00:00:00'
      AND event_name IN ('visit', 'add_to_cart', 'purchase')
    ORDER BY event_id, ingested_at DESC
)
SELECT user_id, event_name, event_time, session_id
FROM eligible_events;
`} />
        <P>
          Deduplication needs a documented tie-breaker, here the most recently ingested copy of an event ID. Do not deduplicate
          on <code>user_id</code> plus <code>event_name</code>: a person can legitimately view or add items more than once.
          Also check event-time timezone handling and late arrivals before freezing a report.
        </P>
        <Callout type="warning">
          The fixed dates are illustrative analysis parameters, not a recommended reporting period. In a scheduled model, pass
          the window in a controlled way and record its timezone and refresh cutoff.
        </Callout>
      </Part>

      <Part n={3} label="Build the funnel" title="Enforce Step Order at the User Grain">
        <P>
          The user-level query finds the first timestamp for each event type, then counts a step only if its timestamp follows
          all required earlier steps. This allows different sessions. If the business rule requires one session, partition by
          session and count qualifying sessions instead; do not silently mix grains.
        </P>
        <Code file="funnel_by_user.sql" lang="sql" code={`
WITH user_steps AS (
    SELECT
        user_id,
        MIN(event_time) FILTER (WHERE event_name = 'visit') AS visited_at,
        MIN(event_time) FILTER (WHERE event_name = 'add_to_cart') AS carted_at,
        MIN(event_time) FILTER (WHERE event_name = 'purchase') AS purchased_at
    FROM product_events
    WHERE user_id IS NOT NULL
      AND event_time >= TIMESTAMP '2026-01-01 00:00:00'
      AND event_time <  TIMESTAMP '2026-02-01 00:00:00'
      AND event_name IN ('visit', 'add_to_cart', 'purchase')
    GROUP BY user_id
), qualified AS (
    SELECT
        user_id,
        visited_at,
        CASE WHEN carted_at >= visited_at THEN carted_at END AS carted_after_visit,
        CASE WHEN purchased_at >= visited_at
                  AND carted_at >= visited_at
                  AND purchased_at >= carted_at THEN purchased_at END AS purchased_after_cart
    FROM user_steps
    WHERE visited_at IS NOT NULL
)
SELECT
    COUNT(*) AS visitors,
    COUNT(carted_after_visit) AS visitors_who_carted,
    COUNT(purchased_after_cart) AS visitors_who_purchased,
    COUNT(carted_after_visit)::numeric / NULLIF(COUNT(*), 0) AS visit_to_cart_rate,
    COUNT(purchased_after_cart)::numeric / NULLIF(COUNT(carted_after_visit), 0) AS cart_to_purchase_rate
FROM qualified;
`} />
        <P>
          This simple definition takes the earliest occurrence of each event in the window. It can miss a valid later sequence
          when an earlier purchase was recorded before a later cart. For complex journeys, use ordered event matching or a
          window-function approach that explicitly finds the first valid sequence. Validate sampled users against raw events.
        </P>
        <Steps items={[
          'Define who is eligible to enter and how the entry event is selected.',
          'Specify the allowed time between steps and whether sessions may differ.',
          'Compute each step only after its required predecessor; keep the entity grain consistent.',
          'Publish counts alongside rates so a percentage is never detached from its denominator.',
        ]} />
      </Part>

      <Part n={4} label="Form cohorts" title="Group Customers by a Meaningful Start">
        <P>
          A cohort is a set of entities sharing a meaningful event or date. Signup month is common for retention; first purchase
          month may be better for a commerce reactivation question. Make the cohort anchor stable and avoid letting a later
          activity redefine membership.
        </P>
        <Code file="monthly_retention.sql" lang="sql" code={`
WITH first_activity AS (
    SELECT user_id, MIN(event_time)::date AS first_seen
    FROM product_events
    WHERE event_name = 'signup'
      AND user_id IS NOT NULL
    GROUP BY user_id
), cohort_members AS (
    SELECT user_id, DATE_TRUNC('month', first_seen)::date AS cohort_month
    FROM first_activity
), active_months AS (
    SELECT DISTINCT user_id, DATE_TRUNC('month', event_time)::date AS activity_month
    FROM product_events
    WHERE event_name IN ('session_started', 'purchase')
), cohort_activity AS (
    SELECT
        c.cohort_month,
        ((EXTRACT(YEAR FROM a.activity_month) - EXTRACT(YEAR FROM c.cohort_month)) * 12
          + EXTRACT(MONTH FROM a.activity_month) - EXTRACT(MONTH FROM c.cohort_month))::int AS month_number,
        c.user_id
    FROM cohort_members c
    JOIN active_months a ON a.user_id = c.user_id
    WHERE a.activity_month >= c.cohort_month
), cohort_sizes AS (
    SELECT cohort_month, COUNT(*) AS cohort_size
    FROM cohort_members
    GROUP BY cohort_month
)
SELECT
    a.cohort_month,
    a.month_number,
    s.cohort_size,
    COUNT(DISTINCT a.user_id) AS active_users,
    COUNT(DISTINCT a.user_id)::numeric / NULLIF(s.cohort_size, 0) AS retention_rate
FROM cohort_activity a
JOIN cohort_sizes s USING (cohort_month)
GROUP BY a.cohort_month, a.month_number, s.cohort_size
ORDER BY a.cohort_month, a.month_number;
`} />
        <P>
          Month zero is the signup month and will commonly be 100 percent if signup itself counts as activity. State whether
          that month is included. The query also treats any listed activity as retained. A paid subscription business might
          instead use an active paid status at the end of each month; select a definition that fits the product contract.
        </P>
        <Callout type="tip">
          A retention curve needs a clear return event. Logging a screen view, completing a meaningful task, and paying again
          are not interchangeable definitions of active.
        </Callout>
      </Part>

      <Part n={5} label="Read the curve" title="Compare Like with Like and Respect Censoring">
        <P>
          Plot cohort age on the horizontal axis and retention rate on the vertical axis. Newer cohorts have not had time to
          reach later ages, so a blank month is not zero retention. Compare cohorts only at ages with enough observation time,
          and show the cohort size or uncertainty when counts are small.
        </P>
        <Code file="plot_retention.py" lang="python" code={`
import pandas as pd
import matplotlib.pyplot as plt

# CSV exported from the SQL cohort query: cohort_month, month_number,
# cohort_size, active_users, retention_rate.
retention = pd.read_csv("monthly_retention.csv", parse_dates=["cohort_month"])
wide = retention.pivot(
    index="cohort_month",
    columns="month_number",
    values="retention_rate",
).sort_index()

ax = wide.T.plot(marker="o", figsize=(9, 5), ylim=(0, 1))
ax.set_xlabel("Months since cohort start")
ax.set_ylabel("Share active under the chosen definition")
ax.set_title("Monthly cohort retention")
ax.grid(True, alpha=0.25)
plt.tight_layout()
plt.show()
`} />
        <P>
          Keep missing ages as missing so the chart does not imply a measured zero. Inspect the underlying counts before
          interpreting an unusual slope. A small cohort can swing sharply when just a few people return.
        </P>
        <Table
          head={['Pattern', 'Possible interpretation', 'Next check']}
          rows={[
            ['Sharp early decline', 'Activation or expectation mismatch', 'Check onboarding steps and first-value time'],
            ['Stable early, then gradual decay', 'Recurring value may weaken over time', 'Segment by acquisition source and product use'],
            ['One cohort breaks trend', 'Product, campaign or data change', 'Inspect release dates, tracking changes and mix'],
            ['New cohorts look unusually strong', 'Improvement or incomplete observation', 'Compare only equal cohort ages and validate maturity'],
          ]}
        />
      </Part>

      <Part n={6} label="Churn carefully" title="Do Not Infer Churn from a Quiet Month">
        <P>
          A customer with no event this month may be on vacation, may use the service irregularly, or may have left. For a
          subscription, churn can mean cancellation or a paid subscription ending; for a marketplace, inactivity needs an
          explicit observation window and is better described as inactivity risk. Report the operational definition and the
          date at which status is evaluated.
        </P>
        <P>
          Segmenting by signup source, plan, geography, or first-week behavior can help locate patterns. Keep segments large
          enough to be interpretable, compare equivalent calendar periods, and separate descriptive evidence from a causal
          explanation. A discount cohort that retains better does not prove the discount caused retention; customer mix may differ.
        </P>
        <Callout type="example">
          For a subscription dashboard, a defensible monthly logo churn numerator might be customers active at the start of the
          month whose paid subscription ended during that month. Divide by the active starting customer count and separately
          track reactivations. Document treatment of trials, pauses, refunds and plan changes.
        </Callout>
      </Part>

      <Part n={7} label="Production checks" title="Make the Metric Reproducible">
        <P>
          Before publishing, verify that IDs are non-null, event timestamps use one timezone, events are deduplicated by a stable
          key, and the cohort denominator matches the declared population. Reconcile a small sample to source records, and
          compare totals with an independent query or product-system report.
        </P>
        <P>
          Instrumentation often changes after launch. Version event definitions, record the date of semantic changes, and avoid
          comparing pre-change and post-change curves without a note. Apply access controls and aggregate small groups where
          learner, health, payment or other sensitive activity could be exposed.
        </P>
        <Callout type="warning">
          A polished retention chart can make weak tracking look authoritative. If an event definition or tracking gap makes a
          conclusion unsafe, label the limitation and fix measurement before recommending a product intervention.
        </Callout>
      </Part>

      <Part n={8} label="Pitfalls" title="Common Mistakes">
        <Mistakes items={[
          { mistake: 'Counting event rows instead of distinct users', cause: 'One person may fire the same event repeatedly.', fix: 'Choose a user or session grain and count that entity consistently.' },
          { mistake: 'Ignoring event order', cause: 'Independent event totals can include a cart that happened before the visit.', fix: 'Require each timestamp to follow its predecessor and validate actual sequences.' },
          { mistake: 'Treating immature cohorts as failures', cause: 'Recent cohorts have not reached older observation windows.', fix: 'Show age-based maturity and compare only periods observed for every cohort.' },
          { mistake: 'Calling inactivity churn without a rule', cause: 'Different products have different natural usage cycles.', fix: 'Define churn from the product contract or label the metric inactivity.' },
        ]} />
      </Part>

      <Part n={9} label="Practice" title="Analyse a Fictional Delivery-App Funnel">
        <Practice
          title="From event table to a retention recommendation"
          tasks={[
            'Write an event dictionary for visit, menu_view, checkout_started and order_completed, including properties and timezone.',
            'Build a user-level funnel with ordered steps and publish both step counts and conditional conversion rates.',
            'Create signup-month cohorts and define retention as at least one completed order in a later month.',
            'Plot the cohort table; mask unobserved cohort ages and annotate the minimum cohort size you consider useful.',
            'Write a short recommendation that distinguishes an observed pattern, a plausible explanation and the next validation.' ,
          ]}
          hint="Start with the exact entity grain and eligibility rule. Then hand-check a few users whose event order is ambiguous."
        />
      </Part>

      <KeyTakeaways items={[
        'A funnel is a defined, ordered journey; its grain, eligibility, time window and denominator must be explicit.',
        'Cohorts group entities by a stable starting event and compare later behavior at the same cohort age.',
        'Retention depends on an agreed meaningful return event; inactivity is not automatically churn.',
        'Use event ordering, deduplication and sample checks to make SQL counts trustworthy.',
        'Treat unobserved retention periods as missing, not zero, and compare cohorts at equal maturity.',
        'Descriptive patterns identify where to investigate; they do not prove why behavior changed.',
      ]} />

      <Bullets items={[
        <span key="ref">For SQL date and window-function details, use the documentation for your database engine; this lesson's date syntax is PostgreSQL-oriented.</span>,
      ]} />

      <H3>Next</H3>
      <NextLesson
        href="/learn/analytics-engineering-data-analytics/dashboards-bi-tools"
        label="Lesson 12 · Dashboards with Power BI, Tableau and Looker Studio"
        text="You have a set of measures and a retention story. Next, design a dashboard that helps a stakeholder take the right action."
      />
    </LearnLayout>
  )
}
