import { LearnLayout } from '@/components/content/LearnLayout'
import { Bullets, Callout, Code, H3, KeyTakeaways, Mistakes, NextLesson, P, Part, Practice, Steps, Table } from '@/components/content/LessonKit'

export default function BiDataModelsDax() {
  return (
    <LearnLayout
      title="BI Data Models and Measures — Star Schemas and DAX"
      description="Model data for BI tools with star schemas and relationships, write measures in DAX, and keep a semantic model fast and trustworthy."
      section="Data Analytics & Statistics — Lesson 13"
      readTime="40 min"
    >
      <Part n={1} label="The semantic layer" title="A Dashboard Is Only as Trustworthy as Its Model">
        <P>
          A dashboard model gives business terms a consistent meaning. A sales total should not change because two reports use
          different joins; a date filter should affect the same facts in a predictable way. A well-designed model separates
          measurable events from descriptive context and makes those relationships visible to analysts and report users.
        </P>
        <P>
          We will model order-line sales. A <strong>fact</strong> row represents one order line and stores numeric observations
          such as quantity and unit price. <strong>Dimensions</strong> describe who, what and when: customer, product and date.
          The model's declared grain is one row per order line, not one row per order and not one row per customer.
        </P>
        <Table
          head={['Model element', 'Example', 'Modeling question']}
          rows={[
            ['Fact table', 'FactOrderLine', 'What exactly does one row represent?'],
            ['Dimension', 'DimCustomer', 'Which descriptive attributes should filter facts?'],
            ['Relationship', 'DimProduct to FactOrderLine', 'Which unique key filters which foreign key?'],
            ['Measure', 'Revenue', 'What aggregation should respond to report context?'],
          ]}
        />
        <Callout type="info">
          Define grain before writing measures. If the source has multiple grains, split it into separate facts instead of
          repeating order-level totals across line-level rows.
        </Callout>
      </Part>

      <Part n={2} label="Shape the model" title="Build a Star Schema Before Decorating a Report">
        <P>
          A star schema puts a fact table in the centre and dimensions around it. Each dimension key should be unique, and the
          fact stores the matching foreign keys. Keep dimension attributes together so report authors do not need to navigate
          long chains of tables for ordinary filtering.
        </P>
        <Code file="model_contract.sql" lang="sql" code={`
-- A simplified source contract: one record per order line.
CREATE TABLE FactOrderLine (
    OrderLineKey BIGINT PRIMARY KEY,
    OrderID BIGINT NOT NULL,
    DateKey INTEGER NOT NULL,
    CustomerKey BIGINT NOT NULL,
    ProductKey BIGINT NOT NULL,
    Quantity INTEGER NOT NULL,
    NetUnitPrice NUMERIC(12, 2) NOT NULL
);

CREATE TABLE DimCustomer (
    CustomerKey BIGINT PRIMARY KEY,
    CustomerName TEXT NOT NULL,
    CustomerSegment TEXT,
    StateCode TEXT
);

CREATE TABLE DimProduct (
    ProductKey BIGINT PRIMARY KEY,
    ProductName TEXT NOT NULL,
    Category TEXT
);

CREATE TABLE DimDate (
    DateKey INTEGER PRIMARY KEY,
    Date DATE NOT NULL UNIQUE,
    CalendarYear INTEGER NOT NULL,
    MonthNumber INTEGER NOT NULL,
    MonthName TEXT NOT NULL
);
`} />
        <P>
          A real warehouse may create surrogate keys and track slowly changing attributes; this contract is a teaching model,
          not a complete ingestion design. Add a complete date dimension for every reporting date, mark it as the date table in
          Power BI, and relate its unique key to the fact. Use a separate fact for returns or inventory snapshots when their grain differs.
        </P>
        <Callout type="tip">
          A diagram should make filter direction and cardinality obvious: one dimension row filters many fact rows. Avoid
          many-to-many relationships unless the business rule truly needs them and you have designed the bridge explicitly.
        </Callout>
      </Part>

      <Part n={3} label="Relationships" title="Understand Filter Context Before Writing DAX">
        <P>
          In a typical single-direction star, a selected year filters DimDate, which filters related FactOrderLine rows. A
          selected customer segment filters DimCustomer and then its order lines. This propagation is the model's filter context.
          DAX measures evaluate against the rows visible in that context rather than returning one fixed value.
        </P>
        <Steps items={[
          'Confirm each dimension key is unique and the fact foreign keys are populated or have an explicit unknown member.',
          'Create one-to-many relationships from dimensions to facts, with a deliberate filter direction.',
          'Hide technical keys from report authors and expose a tidy set of descriptive fields.',
          'Mark and validate the date dimension, and use its fields instead of raw fact timestamps for calendar slicing.',
        ]} />
        <P>
          Bidirectional filtering can make a particular report work while introducing ambiguous paths or changing totals in
          other visuals. Prefer a simple relationship graph; use a measure or bridge table for a specific exceptional rule,
          and test the behavior with a small hand-checkable example.
        </P>
        <Callout type="warning">
          A visually plausible total can still be duplicated by a many-to-many join or a repeated dimension key. Compare model
          totals against a source-level reconciliation before publishing.
        </Callout>
      </Part>

      <Part n={4} label="Measures" title="Write Measures That Respond to Slicers">
        <P>
          A calculated column is stored row by row during refresh. A measure is evaluated when a visual requests a result under
          its current filters. Prefer measures for aggregations such as revenue, orders and average order value; use a column
          when a row-level attribute is truly needed for grouping or filtering.
        </P>
        <Code file="sales-measures.dax" lang="dax" code={`
Revenue =
    SUMX(
        FactOrderLine,
        FactOrderLine[Quantity] * FactOrderLine[NetUnitPrice]
    )

Orders =
    DISTINCTCOUNT(FactOrderLine[OrderID])

Units =
    SUM(FactOrderLine[Quantity])

Average Order Value =
    DIVIDE([Revenue], [Orders])
`} />
        <P>
          <code>SUMX</code> iterates fact rows and evaluates line revenue before adding it. <code>DIVIDE</code> safely returns
          blank for a zero denominator by default. In Power BI, create these as measures, format currency and percentages
          appropriately, and avoid naming a display measure so vaguely that users cannot tell what it includes.
        </P>
        <Callout type="example">
          If shipping, tax, discounts or refunds are included in revenue, state that in the metric definition. A measure name
          alone is not a contract; add a short description in the semantic model and align it with the finance definition.
        </Callout>
      </Part>

      <Part n={5} label="Time intelligence" title="Compare Periods Only with a Sound Date Table">
        <P>
          Time-intelligence measures need a continuous date table with one row per date and an active relationship to the fact's
          date key. The date table should cover all fact dates and be marked as a date table in Power BI. Decide whether the
          business compares calendar year, fiscal year, a rolling period or a like-for-like trading window.
        </P>
        <Code file="time-measures.dax" lang="dax" code={`
Revenue Prior Year =
    CALCULATE(
        [Revenue],
        SAMEPERIODLASTYEAR(DimDate[Date])
    )

Revenue YoY Change =
    [Revenue] - [Revenue Prior Year]

Revenue YoY Percent =
    DIVIDE(
        [Revenue YoY Change],
        [Revenue Prior Year]
    )
`} />
        <P>
          These measures retain the visual's other filters while changing the date context. A partial current month compared
          with a full prior-year month is not a like-for-like comparison. Restrict both periods to the same elapsed days or
          label the comparison clearly. Test totals, month selections and year boundaries in the report.
        </P>
        <Table
          head={['Check', 'Why it matters', 'Example validation']}
          rows={[
            ['Date continuity', 'Missing dates break time calculations', 'Count dates and inspect gaps across the reporting span'],
            ['Date relationship', 'The date filter must reach the fact', 'Select one day and reconcile fact rows'],
            ['Partial periods', 'Unequal windows can mislead', 'Compare month-to-date with the same prior-year dates'],
            ['Zero or missing base', 'A percent can be undefined', 'Use DIVIDE and explain blanks in the visual'],
          ]}
        />
      </Part>

      <Part n={6} label="Trust and performance" title="Validate Measures and Keep the Model Understandable">
        <P>
          Start with a few records whose expected revenue can be calculated by hand. Compare the total, order count and average
          order value at several filter levels: all rows, a single month, one customer segment and one product category. A
          measure that only reconciles at the grand total is not ready.
        </P>
        <P>
          Keep the model lean: remove unused columns, prefer integer relationship keys, aggregate at the right grain, and avoid
          creating many calculated columns that repeat source data. Performance also depends on the storage mode, source,
          cardinality and visuals; measure before optimizing. Document refresh cadence, ownership and the source of each metric.
        </P>
        <Callout type="tip">
          Use a dedicated measures table or consistent display folders to make measures discoverable. Hide raw IDs and organize
          measures by subject so a report author sees a curated model rather than every warehouse implementation detail.
        </Callout>
      </Part>

      <Part n={7} label="Access and governance" title="Treat a Semantic Model as a Product">
        <P>
          A shared model needs an owner, refresh monitoring, change control and a clear route to report discrepancies. Row-level
          security should be designed and tested with representative user roles; hiding a page or a column is not data security.
          Avoid embedding sensitive customer attributes in broad-access reports.
        </P>
        <P>
          Separate development and production models where the team needs controlled releases. Record measure definitions and
          communicate breaking changes. Review export permissions and workspace access, and check that refresh credentials are
          managed through approved platform mechanisms rather than copied into report files.
        </P>
        <Callout type="warning">
          A filter in a report is not row-level security. Verify access from the service using the intended identities before
          exposing customer or employee-level data.
        </Callout>
      </Part>

      <Part n={8} label="Pitfalls" title="Common Mistakes">
        <Mistakes items={[
          { mistake: 'Building visuals before defining fact grain', cause: 'Repeated totals can inflate when users slice or join.', fix: 'Document one-row meaning and split facts with incompatible grains.' },
          { mistake: 'Using a many-to-many relationship as a shortcut', cause: 'Filter propagation becomes ambiguous and totals can double-count.', fix: 'Use unique dimension keys and an explicit bridge when the business needs it.' },
          { mistake: 'Putting totals in calculated columns', cause: 'Stored row values do not respond like measures to report context.', fix: 'Use measures for dynamic aggregations and test them under slicers.' },
          { mistake: 'Comparing incomplete periods as if they were complete', cause: 'A partial month is naturally smaller than a full comparison month.', fix: 'Use like-for-like windows or label the limitation visibly.' },
        ]} />
      </Part>

      <Part n={9} label="Practice" title="Model a Small Order Dataset">
        <Practice
          title="Build and check a compact sales semantic model"
          tasks={[
            'Write down the grain and keys for an order-line fact plus Date, Customer and Product dimensions.',
            'Draw one-to-many relationships and explain the intended filter direction for every relationship.',
            'Create Revenue, Orders, Units and Average Order Value measures; test each on a hand-calculated sample.',
            'Add prior-year and year-over-year measures, then test full-year and partial-month selections.',
            'Draft a metric glossary entry for Revenue, including inclusion rules, owner, refresh cadence and known limitations.',
          ]}
          hint="A model that gives the correct grand total but a wrong segment total still has a grain, key or filter-context problem."
        />
      </Part>

      <KeyTakeaways items={[
        'A star schema separates measurable facts from descriptive dimensions and starts with an explicit grain.',
        'Unique dimension keys and deliberate one-to-many relationships make filter propagation predictable.',
        'Measures respond to report filter context; calculated columns store row-level values at refresh time.',
        'DAX time intelligence depends on a complete, marked date table and a valid relationship.',
        'Reconcile measures at multiple filter levels and document the business meaning behind each metric.',
        'Treat access, refresh, ownership and change communication as part of the semantic model product.',
      ]} />

      <Bullets items={[
        <span key="ref">For product-specific modeling behavior and DAX functions, check the current Microsoft Power BI documentation before release.</span>,
      ]} />

      <H3>Next</H3>
      <NextLesson
        href="/learn/analytics-engineering-data-analytics/data-storytelling"
        label="Lesson 14 · Data Storytelling — From Analysis to Decision"
        text="With a trustworthy model in place, learn to turn the result into a concise story and a clear decision for stakeholders."
      />
    </LearnLayout>
  )
}
