import { LearnLayout } from '@/components/content/LearnLayout'
import { Bullets, Callout, Code, H3, KeyTakeaways, Mistakes, NextLesson, P, Part, Practice, Steps, Table } from '@/components/content/LessonKit'

export default function SqlForAnalytics() {
  return (
    <LearnLayout
      title="SQL for Analytics — The Queries Analysts Write Daily"
      description="Aggregations, joins, CASE, date handling, window functions and CTEs applied to real business questions, with links to the full SQL course."
      section="Data Analytics & Statistics — Lesson 02"
      readTime="40 min"
    >
      <Part n={1} label="Ask a business question" title="Translate the Question into Rows and Measures">
        <P>
          SQL lets an analyst ask a database for a defined slice of its data. Suppose a product team wants weekly completed
          orders and the share delivered late by city. Before writing a query, identify the row grain in each table, the
          population, the time window, the measures, and how the output will be grouped. This keeps a syntactically valid
          query from quietly answering a different question.
        </P>
        <P>
          In a typical schema, an <code>orders</code> table might have one row per order and a <code>customers</code> table one
          row per customer. A one-to-many relationship, such as one order with several line items, can multiply rows after a
          join. Learn the keys and table grain before adding any join. Keep business definitions close to the query so a
          reviewer can see what counts as an order or a late delivery.
        </P>
        <Table
          head={['SQL concept', 'Analyst question', 'Check before trusting']}
          rows={[
            ['WHERE', 'Which records are in scope?', 'Population, dates and null handling'],
            ['GROUP BY', 'How should results be segmented?', 'Output grain and group sizes'],
            ['JOIN', 'Which attributes belong together?', 'Key uniqueness and row multiplication'],
            ['Window function', 'How does each row compare with peers?', 'Partition, ordering and tie rules'],
          ]}
          caption="The query's grain should be clear before selecting columns."
        />
        <Callout type="info">
          Start by writing the expected output in plain language: &quot;one row per city and week, with completed order count
          and late-order rate.&quot; That sentence becomes your grain check.
        </Callout>
      </Part>

      <Part n={2} label="Filter and group" title="Aggregate Carefully and Name Every Measure">
        <P>
          <code>WHERE</code> filters rows before grouping; <code>GROUP BY</code> forms groups; aggregate functions such as
          <code> COUNT</code>, <code>SUM</code>, and <code>AVG</code> calculate values for each group. <code>COUNT(*)</code>
          counts rows, while <code>COUNT(column)</code> ignores nulls in that column. <code>COUNT(DISTINCT customer_id)</code>
          counts unique customers. These answer different questions, so choose based on the unit you mean to count.
        </P>
        <Code file="orders_by_city.sql" lang="sql" code={`
SELECT
    city,
    COUNT(*) AS completed_order_rows,
    COUNT(DISTINCT customer_id) AS unique_customers,
    SUM(order_value) AS gross_order_value,
    AVG(delivery_minutes) AS average_delivery_minutes
FROM orders
WHERE status = 'completed'
  AND order_date >= DATE '2026-01-01'
  AND order_date < DATE '2026-02-01'
GROUP BY city
ORDER BY gross_order_value DESC;
`} />
        <P>
          The date literal syntax and date functions vary across database engines. The half-open interval includes the start
          and excludes the next boundary, so it works cleanly when a timestamp contains a time of day. If your field stores
          a local business date, document its timezone and calendar. Never use a display-formatted date assumption without
          checking the actual column type.
        </P>
        <Callout type="tip">
          Give output fields business-readable aliases with units where useful. A column called <code>avg_delay_min</code> is
          safer to reuse than an unqualified <code>average</code>.
        </Callout>
      </Part>

      <Part n={3} label="Conditional metrics" title="Use CASE to Make Definitions Explicit">
        <P>
          <code>CASE</code> maps row-level conditions to labels or values. It is useful for categorising delays, mapping event
          types into a funnel, or calculating a numerator under the same filter as its denominator. A conditional aggregate
          can retain groups with zero qualifying events, unlike filtering those rows away before the group is formed.
        </P>
        <Code file="late_rate_by_city.sql" lang="sql" code={`
SELECT
    city,
    COUNT(*) AS completed_orders,
    SUM(CASE WHEN delivered_at > promised_at THEN 1 ELSE 0 END) AS late_orders,
    1.0 * SUM(CASE WHEN delivered_at > promised_at THEN 1 ELSE 0 END)
        / NULLIF(COUNT(*), 0) AS late_order_rate
FROM orders
WHERE status = 'completed'
  AND order_date >= DATE '2026-01-01'
  AND order_date < DATE '2026-02-01'
GROUP BY city
HAVING COUNT(*) >= 20
ORDER BY late_order_rate DESC;
`} />
        <P>
          <code>NULLIF</code> prevents division by zero. The multiplication by a decimal is a common way to avoid integer
          division, but exact casting syntax differs by engine. The <code>HAVING</code> condition filters groups after
          aggregation; it does not change the row-level population. Here the minimum-volume rule is part of the stated
          comparison, not a way to hide inconvenient cities.
        </P>
        <Table
          head={['Clause', 'When it applies', 'Example use']}
          rows={[
            ['WHERE', 'Before groups are built', 'Keep completed orders in the date window'],
            ['GROUP BY', 'Forms output groups', 'One result per city'],
            ['HAVING', 'After aggregates exist', 'Restrict to groups with enough records'],
            ['ORDER BY', 'After result rows are formed', 'Sort by late rate or value'],
          ]}
          caption="Clause order is a logical explanation, not necessarily the database execution plan."
        />
      </Part>

      <Part n={4} label="Join tables" title="Join at the Right Grain and Reconcile the Row Count">
        <P>
          A join combines rows using a relationship. An <code>INNER JOIN</code> keeps matching keys; a <code>LEFT JOIN</code>
          keeps all rows from its left side and adds matching values where available. If an order has several items, joining
          orders to items creates one row per item, not one row per order. Summing order-level revenue after that join can
          overcount. Aggregate line items to the order grain first, or use a measure whose grain matches the joined rows.
        </P>
        <Code file="orders_with_customer.sql" lang="sql" code={`
SELECT
    o.order_id,
    o.order_date,
    o.city,
    o.order_value,
    c.customer_segment
FROM orders AS o
LEFT JOIN customers AS c
    ON o.customer_id = c.customer_id
WHERE o.status = 'completed';
`} />
        <P>
          Check that the right-side key is unique if you expect one customer record per customer ID. Compare row counts before
          and after the join, inspect null match rates, and sample keys with multiple matches. If a dimension is versioned
          over time, a simple ID join may attach the wrong historical segment; use the effective dates and intended
          as-of-date rule defined by the data model.
        </P>
        <Steps items={[
          'Write down the expected grain of each input and the output.',
          'Check key uniqueness on the side expected to be one-to-one or many-to-one.',
          'Run the join for a small sample and inspect duplicated IDs and unmatched keys.',
          'Reconcile totals and distinct entity counts against a pre-join baseline.',
        ]} />
      </Part>

      <Part n={5} label="Dates and cohorts" title="Use Calendar Boundaries Instead of Guessing at Dates">
        <P>
          Date analysis depends on the business calendar, timezone, and timestamp semantics. Filtering a timestamp with an
          inclusive end-of-day value can omit later fractional seconds; a half-open range avoids that boundary problem. To
          group by week or month, use the function supported by your database and state whether weeks start on Monday,
          Sunday, or another business-defined day. Do not silently mix UTC timestamps and local reporting dates.
        </P>
        <Code file="daily_orders.sql" lang="sql" code={`
-- Date truncation syntax differs by SQL engine; adapt to your database.
SELECT
    CAST(order_date AS DATE) AS order_day,
    COUNT(*) AS completed_orders,
    SUM(order_value) AS gross_order_value
FROM orders
WHERE status = 'completed'
  AND order_date >= DATE '2026-01-01'
  AND order_date < DATE '2026-02-01'
GROUP BY CAST(order_date AS DATE)
ORDER BY order_day;
`} />
        <Callout type="warning">
          A missing date may mean there were no events, that ingestion failed, or that the source was not connected. Do not
          automatically fill gaps with zero until the data contract confirms what an absent row means.
        </Callout>
      </Part>

      <Part n={6} label="Window functions" title="Compare Rows Without Collapsing Them">
        <P>
          Aggregations reduce each group to one row. A window function calculates over related rows while preserving each
          input row. Use <code>PARTITION BY</code> to define groups and <code>ORDER BY</code> to define sequence. Functions like
          <code> ROW_NUMBER</code> can select the latest event per customer; <code>LAG</code> compares a row with a previous
          row; an aggregate with a window can calculate a running total. Specify tie-breaking columns when ordering is not
          unique.
        </P>
        <Code file="latest_order_per_customer.sql" lang="sql" code={`
WITH ranked_orders AS (
    SELECT
        customer_id,
        order_id,
        order_date,
        order_value,
        ROW_NUMBER() OVER (
            PARTITION BY customer_id
            ORDER BY order_date DESC, order_id DESC
        ) AS row_num
    FROM orders
    WHERE status = 'completed'
)
SELECT customer_id, order_id, order_date, order_value
FROM ranked_orders
WHERE row_num = 1;
`} />
        <P>
          Here the order ID breaks equal-date ties for a deterministic result; the correct tie-break should reflect the
          source's semantics. A CTE gives the ranking step a name and separates it from the final filter. CTEs improve
          readability but are not automatically faster; inspect the query plan and database documentation when performance
          matters.
        </P>
        <Callout type="example">
          A running seven-day metric needs an explicit frame and a clear definition of whether seven rows or seven calendar
          days are intended. Missing dates make those meanings differ.
        </Callout>
      </Part>

      <Part n={7} label="Build and validate" title="Turn Queries into an Auditable Analysis">
        <P>
          Write a query in small steps: inspect the base table, apply row filters, join validated dimensions, derive fields,
          aggregate, then sort. Use CTEs for meaningful stages instead of nesting a long expression that nobody can review.
          Keep assumptions near the query, parameterise dates in scheduled work, and avoid selecting every column when you
          need only a few. A smaller output is easier to inspect and may reduce unnecessary data movement.
        </P>
        <P>
          Validate outputs with invariants: rates should be within their expected range; counts should not exceed the
          relevant population; category totals should reconcile; and a known small sample should produce a manually checked
          result. Query limits are useful for exploration, but a limited result is not a representative sample unless the
          selection method is appropriate. Follow your organisation's rules for access, retention, and personal data.
        </P>
        <Bullets items={[
          'Confirm the output grain and the meaning of every measure.',
          'Check nulls, duplicate keys, unmatched joins, and row-count changes.',
          'Compare a small sample with a source-system or independently calculated total.',
          'Record date boundaries, timezone, filters, definitions, and SQL dialect.',
          'Use read-only access for analysis and follow data governance requirements.',
        ]} />
        <Callout type="tip">
          This lesson focuses on the analyst patterns used daily. For a complete SQL path covering fundamentals, joins,
          database behavior, and advanced query design, continue with the full SQL course.
        </Callout>
        <NextLesson
        href="/learn/analytics-engineering-data-analytics/python-for-analysts-pandas"
        label="Lesson 03 · Python for Analysts — The pandas Analysis Workflow"
        text="Load, clean, reshape, group and visualise data with pandas in a notebook, and turn the result into a shareable report."
        />
      </Part>

      <Part n={8} label="Pitfalls" title="Common SQL Analysis Mistakes">
        <Mistakes items={[
          { mistake: 'Counting rows and calling them customers or orders', cause: 'A join or line-item table can repeat the same entity across several rows.', fix: 'Know each table’s grain and use a distinct entity key or an appropriately aggregated source.' },
          { mistake: 'Filtering away zero-activity groups before calculating a rate', cause: 'The denominator population or set of eligible groups may shrink without being noticed.', fix: 'Keep the required base population and use conditional aggregation for the numerator.' },
          { mistake: 'Using a date boundary that excludes part of the final day', cause: 'Timestamp values include hours and fractional seconds.', fix: 'Use a documented half-open time interval and confirm the reporting timezone.' },
          { mistake: 'Assuming a join cannot multiply rows', cause: 'The join key may match multiple records on the other side.', fix: 'Check uniqueness, row counts, null matches, and measure grain before trusting aggregates.' },
        ]} />
      </Part>

      <Part n={9} label="Practice" title="Answer a Weekly Operations Question">
        <Practice
          title="Build a query that a teammate can verify"
          tasks={[
            'Write the output grain and define completed orders, late delivery, and the reporting date window.',
            'Query one row per city with completed order count, late-order count, late rate, and average delivery minutes.',
            'Join a city-to-region table and report unmatched cities without dropping the orders.',
            'Rank cities by late rate using a window function, while displaying the order count beside each rank.',
            'Use a CTE to select the latest completed order for each customer and state how ties are resolved.',
            'Validate the results with row counts, distinct order IDs, a small manual sample, and one independent total.',
          ]}
          hint="Start with the simplest query for one city and one week. Add joins and windows only after the base metric reconciles. Adapt date and casting syntax to your database."
        />
      </Part>

      <KeyTakeaways items={[
        'Translate a business question into population, period, measure, segment, and output grain before writing SQL.',
        'COUNT rows, non-null values, and distinct entities are different calculations.',
        'Use CASE with conditional aggregates for explicit numerators and denominators; use HAVING for group-level filters.',
        'Check join keys and grain because one-to-many joins can multiply rows and inflate measures.',
        'Handle timestamps with documented half-open boundaries and a clear timezone and calendar.',
        'Window functions preserve row detail; CTEs make analytical stages easier to read and test.',
        'Reconcile totals, counts, nulls and sample rows before communicating a result.',
      ]} />

      <H3>Next</H3>
      <NextLesson
        href="/learn/analytics-engineering-data-analytics/python-for-analysts-pandas"
        label="Lesson 03 · Python for Analysts — The pandas Analysis Workflow"
        text="SQL retrieves and aggregates records. Next, use pandas for a repeatable notebook workflow that cleans and reshapes analysis data."
      />
    </LearnLayout>
  )
}
