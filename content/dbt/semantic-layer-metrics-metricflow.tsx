import { LearnLayout } from '@/components/content/LearnLayout'
import { KeyTakeaways } from '@/components/content/KeyTakeaways'
import { BulletList, Callout, CodeBox, Divider, HighlightBox, Para, SectionTag, SectionTitle, SubTitle, Table } from './DbtLessonParts'

export default function SemanticLayerMetricsMetricflow() {
  return (
    <LearnLayout
      title="The dbt Semantic Layer and Metrics (MetricFlow)"
      description="Define reusable business metrics on dbt models with semantic models, entities, dimensions, and measures, then query them consistently with MetricFlow and the dbt Semantic Layer."
      section="dbt — Lesson 22"
      readTime="75 min"
      breadcrumbs={[
        { label: 'Learn', href: '/learn' },
        { label: 'dbt', href: '/learn/dbt' },
        { label: 'The dbt Semantic Layer and Metrics (MetricFlow)', href: '/learn/dbt/semantic-layer-metrics-metricflow' },
      ]}
    >
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 01 — Why a semantic layer" />
        <SectionTitle>Define a Metric Once, Then Let Different Consumers Ask Different Questions</SectionTitle>
        <Para>
          Imagine product, finance, and operations each reporting monthly revenue. If every dashboard independently writes a SUM expression, teams can quietly disagree about cancelled orders, refunds, timezones, or the date used for grouping. A semantic layer centralizes the meaning of metrics and the relationships needed to analyze them, so supported consumers can query a shared definition instead of copying business logic into every chart.
        </Para>
        <Para>
          dbt's Semantic Layer uses MetricFlow to define and query metrics from dbt models. A semantic model maps a prepared dbt model into entities, dimensions, and measures. A metric gives a business-facing definition built from a measure or other supported metric inputs. The Semantic Layer then plans queries using those definitions and the declared entity relationships. It does not repair ambiguous source data or decide what a company means by revenue.
        </Para>
        <HighlightBox>
          <Para><strong>Prerequisites:</strong> you should understand dimensional modeling, model grain, primary/foreign-key relationships, and basic aggregation. Have a stable fact model with trustworthy timestamps and numeric measures before exposing metrics.</Para>
          <Para><strong>Learning objective:</strong> define a simple metric from a model with a clear grain, select dimensions for analysis, and validate a query for join fanout and time semantics.</Para>
          <Para><strong>Important distinction:</strong> MetricFlow is the semantic query engine and modeling approach; the managed dbt Semantic Layer and its integrations are part of dbt's supported platform offering. Access, setup, and query interfaces depend on your dbt deployment and account configuration.</Para>
        </HighlightBox>
        <Callout title="Start from business meaning">
          Before writing YAML, agree on the definition, grain, filters, and time basis of a metric. A perfectly valid metric configuration can still encode the wrong definition if stakeholders have not aligned on those details.
        </Callout>
      </section>

      <Divider />
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 02 — A semantic model" />
        <SectionTitle>Describe the Entities, Dimensions and Measures in a Fact Model</SectionTitle>
        <Para>
          Let <code>fct_orders</code> contain one row per order. Its order ID identifies the row, its customer ID links to a customer, <code>ordered_at</code> is the event time, and <code>net_amount</code> is the amount eligible for the revenue definition. Declare the model as a semantic model so MetricFlow understands its grain, join paths, descriptive attributes, and aggregatable values.
        </Para>
        <CodeBox label="models/semantic/orders.yml — semantic model">{`semantic_models:
  - name: orders
    description: One row per accepted customer order.
    model: ref('fct_orders')
    defaults:
      agg_time_dimension: ordered_at
    entities:
      - name: order
        type: primary
        expr: order_id
      - name: customer
        type: foreign
        expr: customer_id
    dimensions:
      - name: ordered_at
        type: time
        type_params:
          time_granularity: day
      - name: order_status
        type: categorical
    measures:
      - name: order_count
        description: Number of accepted orders.
        agg: count
        expr: order_id
      - name: net_revenue
        description: Net amount for accepted orders.
        agg: sum
        expr: net_amount`}</CodeBox>
        <Para>
          The entity is the join key and grain vocabulary; the dimension is a way to filter or group; the measure is an aggregatable value. A time dimension supplies the time axis, and the default aggregation time dimension tells MetricFlow which one to use when a query asks for metric time without naming a different time field. Keep the semantic model aligned with the actual grain of the dbt relation.
        </Para>
        <Table headers={['Concept', 'Role', 'Example in orders']} rows={[
          ['Entity', 'Identifies a record or relationship used to join semantic models.', 'order is primary; customer is foreign.'],
          ['Dimension', 'Categorical or time attribute used to filter/group results.', 'order_status or ordered_at.'],
          ['Measure', 'A base aggregation over model rows.', 'sum of net_amount or count of order_id.'],
          ['Metric', 'A named business calculation available for querying.', 'net revenue, order count, or conversion rate.'],
        ]} />
      </section>

      <Divider />
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 03 — Define a metric" />
        <SectionTitle>Promote a Measure Into a Reusable Business Definition</SectionTitle>
        <Para>
          A measure says how to aggregate model values. A metric gives that aggregation a governed business name and exposes it for analysis. Here, the measure <code>net_revenue</code> becomes a simple metric. Descriptions and labels help people discover the definition, but they do not replace agreed filters, grain, and ownership.
        </Para>
        <CodeBox label="models/semantic/metrics.yml — simple metrics">{`metrics:
  - name: net_revenue
    label: Net Revenue
    description: Net amount for accepted orders, grouped by the requested dimensions.
    type: simple
    type_params:
      measure: net_revenue

  - name: order_count
    label: Accepted Orders
    description: Count of accepted orders.
    type: simple
    type_params:
      measure: order_count`}</CodeBox>
        <Para>
          A simple metric is a metric built directly from a measure. MetricFlow supports additional metric types for more involved calculations; check the current schema and platform capabilities before choosing one. For ratios, for example, define and validate the numerator and denominator at a compatible grain, then review how zero or missing denominators should behave.
        </Para>
        <Callout title="A metric is not just a label">
          If two teams disagree on what to exclude, adding a shared name alone will not resolve the disagreement. Record the rule in the definition and its tests, and make the owning team responsible for approving changes.
        </Callout>
      </section>

      <Divider />
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 04 — Query by dimensions" />
        <SectionTitle>Ask for a Metric and a Grouping, Not a New Copy of the Formula</SectionTitle>
        <Para>
          A consumer can ask for net revenue grouped by month, or by month and order status, without authoring the aggregation against the underlying tables. The configured Semantic Layer client or MetricFlow interface compiles a query from the metric definition, semantic model, entity paths, and requested dimensions. The exact credential, API, BI, or CLI workflow depends on whether you use dbt Cloud or another supported MetricFlow setup.
        </Para>
        <CodeBox label="Example dbt Cloud CLI query (with Semantic Layer access configured)">{`dbt sl query \
  --metrics net_revenue,order_count \
  --group-by metric_time__month,order_status`}</CodeBox>
        <Para>
          The selected time grouping is derived from the semantic model's time dimension and requested granularity. Query interfaces may expose metric time groupings with a generated name such as <code>metric_time__month</code>; verify available dimensions and command syntax for the installed client and environment. The important behavior is that users select approved metrics and dimensions rather than reimplementing joins and aggregation rules in each report.
        </Para>
        <HighlightBox>
          <Para><strong>What gets centralized:</strong> metric definitions, join paths, time semantics, and governed model metadata. <strong>What remains local:</strong> a consumer's visualization choices, dashboard layout, and any analysis-specific question that does not belong in the shared metric contract.</Para>
        </HighlightBox>
      </section>

      <Divider />
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 05 — Entity relationships and joins" />
        <SectionTitle>Declare Join Paths Carefully to Avoid Plausible but Wrong Totals</SectionTitle>
        <Para>
          MetricFlow uses entities to reason about how semantic models connect. Suppose an orders model has a foreign customer entity and a customer semantic model declares customer as its primary entity. That matching identity provides the relationship MetricFlow needs to plan a customer-level grouping. A join that multiplies fact rows can inflate a sum while still producing numbers that look believable.
        </Para>
        <CodeBox label="A customer semantic model adds a safe grouping dimension">{`semantic_models:
  - name: customers
    model: ref('dim_customers')
    entities:
      - name: customer
        type: primary
        expr: customer_id
    dimensions:
      - name: customer_region
        type: categorical
      - name: customer_tier
        type: categorical`}</CodeBox>
        <Para>
          Before exposing a customer dimension for an order metric, check that the customer table has one row per customer at the relevant point in time. If customer attributes are historized or slowly changing, decide whether the metric should join to the current customer, the customer version at order time, or another intended relationship. State and test the rule rather than assuming entity names alone solve temporal joins.
        </Para>
        <Callout title="Validate the grain before the join">
          If orders are one row per order and customers are one row per customer, grouping order revenue by customer region should not multiply each order. Confirm that relationship with data tests and compare an independently computed control total.
        </Callout>
      </section>

      <Divider />
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 06 — Governance and validation" />
        <SectionTitle>Review Metrics Like Shared Production Interfaces</SectionTitle>
        <Para>
          The Semantic Layer can reduce definition drift, but a shared definition also increases the impact of a bad change. Treat metric YAML as production code: assign an owner, review semantic changes, validate the dbt project, and communicate changes to dashboard and application teams. Protect sensitive dimensions and control access through the deployment and warehouse security model.
        </Para>
        <BulletList items={[
          'Document business definition, grain, time dimension, inclusions, exclusions, owner, and intended consumers.',
          'Test the underlying dbt model for uniqueness, null behavior, and relationship assumptions that affect metric accuracy.',
          'Compare a representative metric query with a trusted finance or product control total before broad adoption.',
          'Check generated query plans and warehouse cost when adding dimensions or high-cardinality joins.',
          'Use CI and a non-production target to validate semantic configuration before publishing a change.',
          'Manage Semantic Layer credentials and permissions with least privilege; do not assume public metrics mean public data.',
        ]} />
        <Table headers={['Risk', 'How it appears', 'Useful control']} rows={[
          ['Definition drift', 'Two dashboards disagree on revenue.', 'One owned metric definition and reviewed change process.'],
          ['Fanout', 'Totals increase after adding a dimension.', 'Validate entity cardinality and compare control totals.'],
          ['Time mismatch', 'Monthly values differ between systems.', 'Specify the event time, timezone, and time grain.'],
          ['High query cost', 'A broad dimension query scans large fact tables.', 'Review generated SQL, filters, and warehouse query profile.'],
          ['Sensitive data exposure', 'A consumer can query an inappropriate attribute.', 'Apply platform and warehouse authorization independently.'],
        ]} />
      </section>

      <Divider />
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 07 — Common mistakes" />
        <SectionTitle>Keep the Semantic Model Both Accurate and Useful</SectionTitle>
        <Table headers={['Mistake', 'Why it hurts', 'Better approach']} rows={[
          ['Defining a measure without confirming fact grain', 'Counts and sums can be duplicated or misinterpreted.', 'Write down what one row represents and validate keys.'],
          ['Using a dimension as if it were a measure', 'Grouping attributes do not define an aggregation.', 'Choose dimensions for grouping and measures for aggregation.'],
          ['Assuming the semantic layer fixes bad data', 'Incorrect source values remain incorrect when queried centrally.', 'Keep upstream quality tests and reconciliation checks.'],
          ['Declaring an unverified join path', 'Fanout creates incorrect totals without obvious SQL errors.', 'Test cardinality and inspect query results with realistic data.'],
          ['Treating the CLI example as universal setup', 'Access and syntax vary with the installed client and platform.', "Follow the current setup guide for the team's configured environment."],
        ]} />
      </section>

      <Divider />
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 08 — Practice and review" />
        <SectionTitle>Practice: Publish Monthly Net Revenue</SectionTitle>
        <Para>Use a fact model with an agreed grain and a timestamp. Build the semantic definition in development, then validate the result against a query your team already trusts.</Para>
        <BulletList items={[
          'Write a one-sentence net revenue definition that makes refunds, cancellations, and discounts explicit.',
          "Declare the fact model's primary and foreign entities, time dimension, and one categorical dimension.",
          'Create a sum measure and simple metric; explain why the model grain supports that aggregation.',
          'Query monthly net revenue by customer region and verify the customer join does not inflate totals.',
          'Compare the output with an independent SQL control query for a bounded date range.',
          'Add an ownership and review note describing how consumers will learn about a breaking definition change.',
        ]} />
        <SubTitle>Key takeaways</SubTitle>
        <KeyTakeaways items={[
          'A semantic model maps a dbt relation into entities, dimensions, and measures that MetricFlow can use to plan queries.',
          'A measure defines an aggregation over model data; a metric exposes a governed business calculation for consumers.',
          'Entity relationships define potential join paths, so grain and cardinality must be validated to prevent fanout.',
          'The dbt Semantic Layer helps consumers reuse definitions instead of copying calculations into every BI query.',
          'Setup and query interfaces depend on the configured platform and client; verify commands against the environment in use.',
          'Semantic definitions do not replace upstream data tests, reconciliation, warehouse access controls, or cost review.',
        ]} />
      </section>
    </LearnLayout>
  )
}
