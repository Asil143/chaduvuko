import { LearnLayout } from '@/components/content/LearnLayout'
import { Bullets, Callout, Code, H3, KeyTakeaways, Mistakes, NextLesson, P, Part, Practice, Steps, Table } from '@/components/content/LessonKit'

export default function AnalyticsCaseStudyChurn() {
  return (
    <LearnLayout
      title="Analytics Case Study — Customer Churn from Question to Dashboard"
      description="Take a churn question from stakeholder brief to SQL, analysis, a dashboard and a recommendation memo."
      section="Data Analytics & Statistics — Lesson 15"
      readTime="50 min"
    >
      <Part n={1} label="The brief" title="Turn a Vague Churn Request into a Decision">
        <P>
          A subscription product lead says, &quot;Churn is up. Find out why and tell us what to do.&quot; That request contains a
          symptom, not a complete analysis plan. Start by asking what decision is pending, who will make it, which customer
          relationship is in scope, and what time period triggered concern.
        </P>
        <P>
          For this case, the fictional company sells a monthly learning subscription. A customer is active when a paid plan
          covers the reporting date. Monthly logo churn means customers active at the start of a calendar month whose paid
          subscription ended in that month, divided by customers active at the start. We exclude trials and count each customer
          once. The result is descriptive: the analysis can locate patterns, but it cannot establish a cause on its own.
        </P>
        <Table
          head={['Brief element', 'Working definition', 'Why it matters']}
          rows={[
            ['Decision', 'Which retention intervention should be tested next?', 'Keeps analysis tied to an action'],
            ['Population', 'Paid customers active at month start', 'Makes numerator and denominator compatible'],
            ['Outcome', 'Paid subscription ended during the month', 'Avoids treating any quiet period as churn'],
            ['Comparison', 'Month, plan, acquisition source and tenure bands', 'Surfaces patterns while controlling the question scope'],
            ['Limit', 'Observational data, not a causal experiment', 'Prevents an association from becoming a promise'],
          ]}
        />
        <Callout type="info">
          Write the metric contract before running a query. Confirm how cancellations, pauses, refunds, reactivations and
          mid-month starts are treated with the business owner and billing source.
        </Callout>
      </Part>

      <Part n={2} label="Plan the data" title="Map the Grain, Sources and Failure Modes">
        <P>
          Assume two source tables: <code>subscriptions</code> contains customer, plan, start, end and status dates; and
          <code> customer_attributes</code> contains one current acquisition source per customer. In production, attributes
          can change and subscription history may contain overlaps. Confirm the source-of-truth system, timezone, late-arriving
          updates and customer identity rules before treating the sample query as final.
        </P>
        <Steps items={[
          'Agree the churn event and denominator with the product and finance owners.',
          'Inspect source keys, date coverage, duplicate records, status values and null rates.',
          'Build a customer-month dataset with one record per customer per reporting month.',
          'Reconcile a sample of customer-month rows with billing records and record known limitations.',
          'Publish only segments that have adequate data and a clear operational interpretation.',
        ]} />
        <P>
          This case uses monthly calendar periods. If the business contract uses a rolling 30-day window or a different fiscal
          calendar, change the definition and validate it rather than relabeling the same calculation.
        </P>
        <Callout type="warning">
          Subscription status fields can be overwritten by the latest state. If historical snapshots are not available, a
          current-state table cannot reliably reconstruct past churn. Find a history or event source before presenting trends.
        </Callout>
      </Part>

      <Part n={3} label="Build the metric" title="Calculate Churn from Customer-Months">
        <P>
          The SQL below is PostgreSQL-style. It expands each subscription across the months it covers, selects customers
          active on the first day of a month and identifies an end date within that month. The example assumes one subscription
          per customer at a time; production handling for overlaps and pauses must follow the agreed rules.
        </P>
        <Code file="customer_month_churn.sql" lang="sql" code={`
WITH month_starts AS (
    SELECT generate_series(
        DATE '2025-01-01',
        DATE '2025-12-01',
        INTERVAL '1 month'
    )::date AS month_start
), active_at_start AS (
    SELECT DISTINCT
        m.month_start,
        s.customer_id,
        s.plan_id,
        s.acquisition_source,
        s.end_date
    FROM month_starts m
    JOIN subscriptions s
      ON s.start_date < m.month_start + INTERVAL '1 day'
     AND (s.end_date IS NULL OR s.end_date >= m.month_start)
    WHERE s.status IN ('active', 'ended')
), monthly AS (
    SELECT
        a.month_start,
        a.plan_id,
        a.acquisition_source,
        COUNT(DISTINCT a.customer_id) AS customers_at_start,
        COUNT(DISTINCT a.customer_id) FILTER (
            WHERE a.end_date >= a.month_start
              AND a.end_date < a.month_start + INTERVAL '1 month'
        ) AS churned_customers
    FROM active_at_start a
    GROUP BY a.month_start, a.plan_id, a.acquisition_source
)
SELECT
    month_start,
    plan_id,
    acquisition_source,
    customers_at_start,
    churned_customers,
    churned_customers::numeric / NULLIF(customers_at_start, 0) AS monthly_logo_churn
FROM monthly
ORDER BY month_start, plan_id, acquisition_source;
`} />
        <P>
          Review the interval boundaries carefully: the example uses the first day of the month as the snapshot and counts
          end dates before the next month begins. If your data stores timestamps, define the timezone before converting to dates.
          The source joins and active-status rule need adjustment if customers can hold multiple plans or restart service.
        </P>
        <Callout type="example">
          A customer who ends a subscription at month end is counted according to the agreed end-date convention. Make this
          edge case explicit in a test row; boundary disagreements often explain why finance and product reports differ.
        </Callout>
      </Part>

      <Part n={4} label="Explore patterns" title="Check the Trend Before Explaining It">
        <P>
          First chart the overall monthly rate and its numerator and denominator. Then segment by plan, acquisition source and
          customer tenure. Compare equivalent months, inspect segment sizes, and look for data or product changes that coincide
          with a break in the series. Do not turn every visible fluctuation into a product story.
        </P>
        <Code file="inspect_churn.py" lang="python" code={`
import pandas as pd
import matplotlib.pyplot as plt

# Export one row per month and segment from the validated SQL model.
monthly = pd.read_csv("monthly_churn.csv", parse_dates=["month_start"])
monthly["monthly_logo_churn"] = (
    monthly["churned_customers"] / monthly["customers_at_start"]
)

# Keep the overall trend separate from segment comparisons.
overall = (
    monthly.groupby("month_start", as_index=False)
    .agg(
        churned_customers=("churned_customers", "sum"),
        customers_at_start=("customers_at_start", "sum"),
    )
)
overall["churn_rate"] = overall["churned_customers"] / overall["customers_at_start"]

ax = overall.plot(
    x="month_start", y="churn_rate", marker="o", legend=False,
    figsize=(9, 4), ylim=(0, 1),
)
ax.set_ylabel("Monthly logo churn")
ax.set_xlabel("Month")
ax.set_title("Paid-customer churn; denominator = active at month start")
ax.grid(True, alpha=0.25)
plt.tight_layout()
plt.show()
`} />
        <P>
          A segment's rate can be high because its customers differ in tenure or plan mix. Show counts, define the comparison
          period and check whether each segment is mature. If the rate changed after a billing migration, validate the event
          pipeline before treating it as customer behavior.
        </P>
        <Table
          head={['Observation', 'Possible explanations', 'Validation before action']}
          rows={[
            ['Increase across all plans', 'Billing change, product issue or broad experience shift', 'Check tracking, release timing and support volume'],
            ['Increase isolated to new customers', 'Onboarding friction or acquisition mix', 'Compare activation milestones and source composition'],
            ['Higher rate in one source', 'Audience fit, campaign promise or channel mix', 'Check cohort sizes, tenure and offer terms'],
            ['Spike in one month only', 'Seasonality, outage, data correction or genuine event', 'Review calendar, incidents and source history'],
          ]}
        />
      </Part>

      <Part n={5} label="Investigate the journey" title="Connect Churn to Product Behavior Without Overclaiming">
        <P>
          Add leading indicators such as first lesson completion, weekly active days, support contact and time to first useful
          result. Compare these features among customers who later churned and those who remained, using a clear lookback window
          that ends before the outcome. A feature measured after cancellation may leak the answer into the analysis.
        </P>
        <P>
          Use retention curves and funnel analysis to understand where new customers stop progressing. A difference between
          groups is a hypothesis, not proof: people who complete a lesson may already be more motivated. To estimate an
          intervention's impact, define a randomized experiment or another defensible causal design with the product team.
        </P>
        <Callout type="tip">
          Write findings as three separate statements: what the data shows, what might explain it, and what evidence would
          distinguish the explanations. This keeps a useful recommendation honest about uncertainty.
        </Callout>
      </Part>

      <Part n={6} label="Dashboard and recommendation" title="Make the Result Useful in a Review Meeting">
        <P>
          Build a compact dashboard around the decision. Put the metric definition, current rate, prior trend and customer
          counts near the top. Add segment filters only when they answer a likely follow-up question; a page of unrelated charts
          makes it harder to find the point. Show refresh date and an owner for metric questions.
        </P>
        <P>
          A short recommendation memo can follow this structure: decision requested, metric and population, key observation,
          evidence and limitations, proposed next test, owner and success measure. For example, if early activation is associated
          with later retention, propose a bounded onboarding experiment and monitor activation plus guardrails such as support
          contacts and refunds. Do not promise that the association guarantees lower churn.
        </P>
        <Steps items={[
          'Lead with one sentence that answers the stakeholder question.',
          'Show the denominator and time window alongside the rate.',
          'Separate observed evidence from hypotheses and causal claims.',
          'Recommend one testable next action with an owner and guardrail.',
        ]} />
        <Callout type="example">
          A decision-ready headline might say: &quot;New paid customers from channel A have lower 60-day lesson completion and
          higher observed churn; validate onboarding fit with a controlled welcome-flow test.&quot; The headline states the
          pattern and next check without asserting that channel A caused churn.
        </Callout>
      </Part>

      <Part n={7} label="Test and ship" title="Make the Analysis Safe to Refresh">
        <P>
          Turn assumptions into checks: one row per customer-month, nonnegative denominators, churned customers no greater than
          customers at start, allowed status values, and no impossible end dates. Test month boundaries and a customer who
          cancels, pauses, reactivates or changes plans. Reconcile totals with the billing source and preserve a query/model version.
        </P>
        <Code file="quality_checks.sql" lang="sql" code={`
-- The modeled output should have one row per month and declared segment.
SELECT month_start, plan_id, acquisition_source, COUNT(*) AS row_count
FROM monthly_churn
GROUP BY month_start, plan_id, acquisition_source
HAVING COUNT(*) > 1;

-- Rates must have valid denominators and consistent numerator bounds.
SELECT *
FROM monthly_churn
WHERE customers_at_start <= 0
   OR churned_customers < 0
   OR churned_customers > customers_at_start;

-- Inspect missing segment assignments rather than silently dropping them.
SELECT COUNT(*) AS rows_without_source
FROM monthly_churn
WHERE acquisition_source IS NULL;
`} />
        <P>
          The SQL returns rows that need investigation; a clean result is empty for the uniqueness and bounds checks. Decide how
          null acquisition sources appear in the report. Schedule refreshes only after source readiness, monitor failures, and
          assign an owner to review metric changes before stakeholder distribution.
        </P>
        <Table
          head={['Rubric area', 'Strong submission', 'Needs rework']}
          rows={[
            ['Definition', 'Population, event, dates and edge cases are written down', 'Uses churn without an operational rule'],
            ['Data quality', 'Grain, duplicates and reconciliations are checked', 'Assumes source data is complete'],
            ['Analysis', 'Shows counts, comparable periods and limitations', 'Explains a rate change from one chart'],
            ['Communication', 'A decision and next test are explicit', 'Lists findings without an owner or action'],
            ['Production', 'Refresh, access, tests and ownership are documented', 'No repeatability or privacy review'],
          ]}
          caption="Use this rubric to review the case study before sharing it with stakeholders."
        />
      </Part>

      <Part n={8} label="Extensions" title="Where to Take the Case Next">
        <P>
          For a stronger portfolio project, add cohort retention by signup month, segment revenue churn separately from logo
          churn, and quantify uncertainty when comparing small groups. Add a data dictionary and a short dashboard walkthrough.
          If you build an experiment proposal, specify randomization unit, eligibility, primary metric, guardrails and stopping
          rules before launch.
        </P>
        <Callout type="warning">
          Customer-level churn data can reveal sensitive behavior. Use only approved datasets, minimize identifiers, restrict
          access, and aggregate outputs before sharing outside the authorized team.
        </Callout>
      </Part>

      <Part n={9} label="Practice" title="Deliver a Churn Review Pack">
        <Practice
          title="Recreate the workflow with a fictional subscription dataset"
          tasks={[
            'Write a one-paragraph metric contract that settles the population, churn event, observation window and edge cases.',
            'Profile source tables, identify the grain, check duplicates and find missing history before querying.',
            'Build monthly customer counts, churn rates and two clearly labeled segment views in SQL.',
            'Add one behavioral indicator measured before the churn outcome and describe why it is only an association.',
            'Deliver a dashboard outline, a five-sentence recommendation memo and tests for key assumptions.',
          ]}
          hint="For every rate, keep its numerator and denominator visible. Ask what decision the chart is supposed to change."
        />
      </Part>

      <KeyTakeaways items={[
        'A useful churn case starts with a stakeholder decision and a written metric contract.',
        'Choose a customer-time grain and verify that the source preserves historical status.',
        'Compare equivalent periods, show counts and validate data before interpreting a trend.',
        'Behavioral associations can motivate a hypothesis but do not establish causal impact.',
        'A decision-ready dashboard combines definitions, trends, denominators, limitations and a next action.',
        'Production readiness includes quality tests, refresh ownership, access control and privacy.',
      ]} />

      <Bullets items={[
        <span key="ref">For warehouse-specific SQL date generation and filtering syntax, consult the official documentation for your database engine.</span>,
      ]} />

      <H3>Next</H3>
      <NextLesson
        href="/learn/analytics-engineering-data-analytics/data-analyst-interview-prep"
        label="Lesson 16 · Data Analyst Interview Prep"
        text="You have followed a question through metrics, SQL, analysis and a recommendation. Next, practice explaining that work in interviews."
      />
    </LearnLayout>
  )
}
