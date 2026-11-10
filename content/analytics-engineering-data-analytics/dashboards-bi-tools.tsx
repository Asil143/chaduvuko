import { LearnLayout } from '@/components/content/LearnLayout'
import { Callout, Code, H3, KeyTakeaways, Mistakes, NextLesson, P, Part, Practice, Table } from '@/components/content/LessonKit'

export default function DashboardsBiTools() {
  return (
    <LearnLayout
      title="Dashboards with Power BI, Tableau and Looker Studio"
      description="Design a dashboard for a decision, model data for BI, choose charts, add filters, and manage refresh and access."
      section="Data Analytics & Statistics — Lesson 06"
      readTime="40 min"
    >
      <Part n={1} label="Why dashboards?" title="A Dashboard Is an Interface for a Decision">
        <P>
          A dashboard is useful when it helps a defined audience answer a recurring question and take an appropriate next
          step. A CEO may need a small set of trends and risk indicators; a category manager may need daily stock, order,
          and cancellation details. One dashboard rarely serves both well. Start with the decision, user, cadence, and action
          rather than with a list of charts.
        </P>
        <P>
          Clarify what is monitored, what requires investigation, and who owns the response. A chart should have a named
          metric definition, relevant comparison, reporting period, and explanation of freshness. Show when data was last
          refreshed and provide a safe path to inspect detail. Avoid exposing customer-level information to audiences that
          only need aggregates.
        </P>
        <Table
          head={['Audience question', 'Useful view', 'Likely action']}
          rows={[
            ['Are orders on track today?', 'Hourly completed orders vs a relevant baseline', 'Check operational coverage if a drop persists'],
            ['Where are delays rising?', 'p50 and p90 delivery time by service area', 'Investigate affected routes or capacity'],
            ['Did a category change over time?', 'Weekly GMV and order count with annotations', 'Ask whether mix, promotions or tracking changed'],
          ]}
          caption="Design each visual around a question and a response."
        />
        <Callout type="info">
          A dashboard is not a data warehouse, metric dictionary, or substitute for investigation. Keep it focused on the
          decisions it is meant to support.
        </Callout>
      </Part>

      <Part n={2} label="Choose a tool" title="Select BI by Workflow, Governance and Cost">
        <P>
          Power BI, Tableau, Looker Studio, and Metabase can all support reporting, but they serve different environments.
          Compare the team's existing identity and data stack, analyst skills, semantic modelling, sharing and access needs,
          refresh constraints, deployment workflow, and total operating cost. Product capabilities and plan limits change;
          verify current official documentation before procurement rather than relying on a remembered feature list.
        </P>
        <Table
          head={['Tool', 'Often a fit when…', 'Questions to verify']}
          rows={[
            ['Power BI', 'The organisation already relies on Microsoft tools and managed BI workspaces', 'Licensing, gateway and refresh needs, row-level security, deployment governance'],
            ['Tableau', 'Teams value interactive visual exploration and an established Tableau ecosystem', 'Creator / viewer access, server or cloud operations, published data-source governance'],
            ['Looker Studio', 'A lightweight shared report fits a Google-oriented workflow', 'Connector behaviour, credentials, data freshness, sharing and access controls'],
            ['Metabase', 'A team wants approachable SQL-backed exploration and dashboards', 'Hosting and upgrades, permissions, model governance, query performance'],
          ]}
          caption="These are decision prompts, not exhaustive product comparisons. Validate current details with vendors and your data platform."
        />
        <P>
          A tool with many features can still be the wrong fit if report ownership is unclear or sensitive data can be shared
          too broadly. Prototype one representative workflow—from curated data to refresh, access review, and a business
          user's decision—before building a large catalogue of reports.
        </P>
        <Callout type="tip">
          Separate the BI tool from the data model. Well-defined warehouse tables and measures make it easier to change a
          visualisation product later without redefining every KPI.
        </Callout>
      </Part>

      <Part n={3} label="Data modelling" title="Use a Star Schema for Dashboard Queries">
        <P>
          A star schema organises measurable events in a fact table linked to descriptive dimensions. A fact table has a
          declared grain such as one row per order line or one row per completed order. Dimensions describe entities such as
          customer, product, date, and location. Explicit grain prevents the most common reporting error: joining tables at
          different detail levels and multiplying counts or amounts.
        </P>
        <P>
          For an e-commerce dashboard, a sales fact might contain one record per order line with quantity, gross item value,
          discount, and order identifiers. Product, date, customer segment, and fulfilment zone dimensions let a report group
          and filter those facts. Keep identifiers stable, define slowly changing attributes where history matters, and
          avoid joining two independent facts through an ambiguous many-to-many path without a deliberate model.
        </P>
        <Code file="star_schema.sql" lang="sql" code={`
-- Fact grain: one row per order line. Dimensions have one row per key at query time.
SELECT
  d.month_start,
  p.category_name,
  z.service_area,
  SUM(f.quantity * f.unit_price_rupees) AS gross_item_value_rupees,
  COUNT(DISTINCT f.order_id) AS orders
FROM mart.fact_order_line AS f
JOIN mart.dim_date AS d ON d.date_key = f.order_date_key
JOIN mart.dim_product AS p ON p.product_key = f.product_key
JOIN mart.dim_zone AS z ON z.zone_key = f.zone_key
WHERE d.month_start >= DATE '2026-07-01'
  AND d.month_start <  DATE '2026-10-01'
GROUP BY d.month_start, p.category_name, z.service_area
ORDER BY d.month_start, p.category_name, z.service_area;
`} />
        <P>
          The example sums gross item value before discounts and returns, so it is not automatically net GMV, recognised
          revenue, or profit. Put business treatment in the metric definition. Validate each dimension join is one-to-one at
          the selected key, or totals can multiply. Test aggregated results against a trusted source at the same grain.
        </P>
      </Part>

      <Part n={4} label="Dashboard structure" title="Put the Overview Before the Drill-Down">
        <P>
          A practical layout starts with a clear title and reporting period, then a small number of headline metrics, a trend
          with a relevant comparison, a breakdown that helps diagnose movement, and a detail table for follow-up. Put
          filters where users expect them, show active filter state, and make reset behaviour obvious. Use consistent units,
          readable labels, and meaningful default periods; avoid forcing viewers to discover a hidden control to understand a
          chart.
        </P>
        <P>
          Add context such as targets, prior comparable periods, or seasonality only when the comparison is meaningful. A
          target should have an owner and definition. A red badge without an agreed threshold creates alarm but not clarity.
          Include data freshness and a contact or owner for metric questions. For a live operations dashboard, distinguish
          late data from a genuine zero in activity.
        </P>
        <Code file="dashboard_spec.md" lang="text" code={`
Audience: City operations lead
Decision: Where should capacity be investigated today?
Refresh: Hourly; show last successful refresh time
Top row: completed orders, late-delivery rate, p90 delivery minutes
Trend: hourly p50 and p90 against comparable weekdays
Breakdown: service area by order volume and late rate
Detail: affected routes with minimum-count suppression
Filters: date, city, service area; visible active filter chips
Owner: Operations Analytics; metric definitions linked from each title
`} />
        <Callout type="example">
          If p90 delay rises in one area while order volume also doubles, a raw comparison may hide the demand change. Show
          both measures and provide enough context for an operator to ask the next question.
        </Callout>
      </Part>

      <Part n={5} label="Choose a chart" title="Match the Visual to the Comparison">
        <P>
          A line chart is a natural choice for a time trend. A bar chart compares categories; sort it to make relative size
          clear. A scatter plot helps explore relationships between two numeric measures. A histogram shows a distribution;
          a box plot offers a compact view of centre and spread across groups. A table is often best when exact values and
          lookup matter more than pattern recognition.
        </P>
        <P>
          Use a map only when location is central to the question and geographic encoding adds useful information. Avoid pie
          charts for many similar categories, 3D effects that distort comparisons, and dual axes that imply a relationship
          through arbitrary scaling. Keep colour meaning stable and do not rely on colour alone to distinguish states. Use
          direct labels and accessible contrast, especially for dense mobile screens.
        </P>
        <Table
          head={['Analytical task', 'Good starting chart', 'Check before publishing']}
          rows={[
            ['Trend over time', 'Line', 'Consistent time interval and clear treatment of missing dates'],
            ['Compare categories', 'Sorted bar', 'Readable labels, units and a reasonable category count'],
            ['Inspect distribution', 'Histogram or box plot', 'Bin choices, sample size and outlier context'],
            ['Show exact lookup values', 'Table', 'Sort order, totals and visible filters'],
          ]}
        />
      </Part>

      <Part n={6} label="Performance and access" title="Keep Dashboards Fast, Fresh and Safe">
        <P>
          Dashboard performance depends on query design, data volume, concurrency, refresh strategy, and the BI engine.
          Filter early when appropriate, aggregate to the audience's needed grain, and avoid retrieving every row for a
          summary view. Use warehouse partitions and pre-aggregations where they fit the workload. Measure query duration
          and user experience rather than assuming a particular storage mode is always faster.
        </P>
        <P>
          Establish refresh expectations and expose the last successful refresh. Handle failed refreshes visibly instead of
          showing stale data as current. Review who can view, edit, export, and share the report; use row-level controls when
          different audiences are permitted different records. Test those controls with representative roles, and avoid
          putting sensitive information into URLs, screenshots, or broad exports.
        </P>
        <Code file="aggregate_before_bi.sql" lang="sql" code={`
-- A daily aggregate can serve an overview more efficiently than scanning raw events each time.
SELECT
  event_date,
  city,
  COUNT(DISTINCT customer_id) AS active_customers,
  COUNT(DISTINCT order_id) AS completed_orders,
  SUM(order_value_rupees) AS gross_order_value_rupees
FROM mart.order_activity
WHERE event_date >= CURRENT_DATE - INTERVAL '30' DAY
  AND order_status = 'completed'
GROUP BY event_date, city;
`} />
        <P>
          Aggregation is safe only when the metric is additive at the chosen dimensions. Distinct users across days are not
          additive; summing daily active users does not produce monthly active users. Preserve the correct grain or compute
          the distinct set over the full requested period.
        </P>
      </Part>

      <Part n={7} label="Validate and maintain" title="Treat a Dashboard as a Product">
        <P>
          Before publishing, verify key totals against a trusted query, test edge dates and empty filters, inspect the mobile
          layout, and check access as a viewer. Ask a target user to complete the intended task without coaching. If they
          cannot explain the metric, comparison, or next action, improve the dashboard rather than adding another chart.
        </P>
        <P>
          Keep a small inventory of dashboards with owner, audience, purpose, source, refresh schedule, and last review. Retire
          duplicates that lack active users. Version metric and model changes, announce material shifts, and track whether
          the dashboard is actually used for the decision it was built to support. Data freshness and definition links
          should remain visible after redesigns.
        </P>
        <Callout type="warning">
          A dashboard can be technically correct and still mislead if a filter hides the denominator, a stale extract looks
          current, or a many-to-many join duplicates GMV. Validate the experience and the underlying calculation together.
        </Callout>
      </Part>

      <Part n={8} label="Pitfalls" title="Common BI and Dashboard Mistakes">
        <Mistakes items={[
          { mistake: 'Starting with a chart library rather than a user decision', cause: 'The result becomes a gallery of visuals without a clear next action.', fix: 'Specify the audience, decision, cadence, and owner before choosing charts.' },
          { mistake: 'Joining facts at incompatible grains', cause: 'A one-to-many join can duplicate counts and monetary values.', fix: 'Declare fact grain and validate key cardinality and totals after joins.' },
          { mistake: 'Summing non-additive metrics across dimensions', cause: 'Distinct users and rates do not behave like additive amounts.', fix: 'Recompute from the correct underlying population at the requested grain.' },
          { mistake: 'Showing data freshness only in documentation', cause: 'Viewers may act on a stale extract as if it were current.', fix: 'Display the last successful refresh and clearly mark delays or failures.' },
        ]} />
      </Part>

      <Part n={9} label="Practice" title="Design an Operations Dashboard for a Marketplace">
        <Practice
          title="From star schema to a decision-ready BI page"
          tasks={[
            'Choose Power BI, Tableau, Looker Studio, or Metabase for a hypothetical team and document the workflow assumptions you would validate.',
            'Define the grain and measures for order-line fact data plus date, product, customer, and service-area dimensions.',
            'Write a SQL query for weekly completed orders and GMV in ₹ by category; include the cancellation / refund policy in the specification.',
            'Sketch an operations dashboard with audience, decision, KPIs, trend, breakdown, filters, freshness, and owner.',
            'Test totals against source data, verify empty and filtered states, check viewer permissions, and ask a user to perform the target task.',
          ]}
          hint="Keep the BI model separate from chart layout. State each measure's grain and determine whether it is additive before aggregating."
        />
      </Part>

      <KeyTakeaways items={[
        'A dashboard should answer a recurring question for a specific audience and support an explicit action.',
        'Choose a BI product based on workflow, governance, access, refresh, operations, and current verified capabilities.',
        'A star schema makes dashboard queries clearer when fact grain and dimension relationships are explicit.',
        'Match chart type to the task, label comparisons and units, and keep filters and data freshness visible.',
        'Do not sum non-additive measures such as distinct users across dates; calculate them at the requested grain.',
        'Validate totals, performance, usability, freshness, and permissions before publishing and maintain dashboard ownership.',
      ]} />

      <H3>Next</H3>
      <NextLesson
        href="/learn/analytics-engineering-data-analytics/data-storytelling"
        label="Lesson 07 · Data Storytelling — From Analysis to Decision"
        text="A dashboard helps users explore. In the final lesson, turn the evidence into a concise story with a clear chart, useful annotation, executive summary, and decision request."
      />
    </LearnLayout>
  )
}
