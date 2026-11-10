import { LearnLayout } from '@/components/content/LearnLayout'
import { KeyTakeaways } from '@/components/content/KeyTakeaways'
import { BulletList, Callout, CodeBox, Divider, HighlightBox, Para, SectionTag, SectionTitle, SubTitle, Table } from './DbtLessonParts'

export default function UnitTestsInDbt() {
  return (
    <LearnLayout
      title="Unit Tests in dbt"
      description="Use dbt 1.8+ unit_tests YAML to validate model SQL against small, controlled fixtures before you trust a full warehouse run."
      section="dbt — Lesson 20"
      readTime="65 min"
      breadcrumbs={[
        { label: 'Learn', href: '/learn' },
        { label: 'dbt', href: '/learn/dbt' },
        { label: 'Unit Tests in dbt', href: '/learn/dbt/unit-tests-in-dbt' },
      ]}
    >
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 01 — Why unit tests" />
        <SectionTitle>Test SQL Logic With Tiny Inputs, Before Your Data Is Ready</SectionTitle>
        <Para>
          A data test asks whether the rows in a built model satisfy a condition, such as every order having a unique ID. A unit test asks a different question: given a small set of known input rows, does this model's SQL produce the exact expected output? That distinction matters when a model contains tricky joins, CASE expressions, date boundaries, or null handling. A production-sized table is a slow and noisy place to debug one branch of a transformation.
        </Para>
        <Para>
          dbt introduced unit tests in dbt Core 1.8. They are declared in YAML next to model metadata. dbt substitutes fixture rows for the model's upstream inputs, runs the model SQL against those fixtures, and compares the result with your expected rows. You are testing the model's transformation logic—not the real source data, the warehouse's ingestion pipeline, or every possible input combination.
        </Para>
        <HighlightBox>
          <Para><strong>Prerequisites:</strong> you should already know models, <code>ref()</code>, YAML model properties, and the difference between generic/singular data tests and a model build. A unit test does not replace those tests: it complements them by exercising selected behavior deterministically.</Para>
          <Para><strong>Outcome:</strong> after this lesson you can define fixture inputs and expected rows, cover important edge cases, select unit tests in a CI job, and recognize where a fixture is not a useful substitute for integration testing.</Para>
        </HighlightBox>
        <Callout title="Think like a function test">
          Treat a model as a transformation whose dependencies are inputs. Choose a few rows that force an important decision, then specify the result you expect. The most valuable fixtures are small enough to understand at a glance and targeted enough to fail when the logic regresses.
        </Callout>
      </section>

      <Divider />
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 02 — Model under test" />
        <SectionTitle>Start With a Small Model Whose Logic Deserves a Test</SectionTitle>
        <Para>
          Consider an order mart that joins raw order records to customers, excludes test orders, and classifies each order by value. A wrong join key can multiply rows; an incorrect filter can drop a valid order; a threshold change can put an order in the wrong band. Those are clear behaviors to test.
        </Para>
        <CodeBox label="models/marts/fct_order_value.sql">{`with orders as (
    select * from {{ ref('stg_orders') }}
), customers as (
    select * from {{ ref('dim_customers') }}
)

select
    orders.order_id,
    customers.customer_tier,
    orders.amount,
    case
        when orders.amount >= 10000 then 'high'
        when orders.amount >= 1000 then 'standard'
        else 'small'
    end as value_band
from orders
left join customers using (customer_id)
where orders.is_test_order = false`}</CodeBox>
        <Para>
          Keep the model itself readable. Unit tests are easiest to reason about when the transformation has clear inputs and deterministic output. Avoid adding test-only branches to production SQL; a fixture should replace an upstream relation, not change the business logic you are trying to validate.
        </Para>
        <Callout title="A unit test boundary">
          Your SQL still runs on your configured adapter. Unit tests control the input relations, but they are not an in-memory SQL interpreter and do not prove that every warehouse-specific behavior is identical across engines.
        </Callout>
      </section>

      <Divider />
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 03 — YAML fixtures" />
        <SectionTitle>Declare Inputs and Expected Rows in a Unit Test</SectionTitle>
        <Para>
          Each entry under <code>unit_tests</code> names a test, points to a model, provides one or more <code>given</code> inputs, and lists the <code>expect</code> rows. Use <code>input: ref(...)</code> or <code>input: source(...)</code> to provide upstream fixture data. A model's own relation can be supplied using <code>input: this</code> where appropriate.
        </Para>
        <CodeBox label="models/marts/schema.yml — test the value bands">{`unit_tests:
  - name: high_value_orders_are_classified
    description: Verify the boundary and customer join for a high-value order.
    model: fct_order_value
    given:
      - input: ref('stg_orders')
        rows:
          - {order_id: 501, customer_id: 9, amount: 10000, is_test_order: false}
          - {order_id: 502, customer_id: 9, amount: 999, is_test_order: false}
          - {order_id: 503, customer_id: 9, amount: 20000, is_test_order: true}
      - input: ref('dim_customers')
        rows:
          - {customer_id: 9, customer_tier: gold}
    expect:
      rows:
        - {order_id: 501, customer_tier: gold, amount: 10000, value_band: high}
        - {order_id: 502, customer_tier: gold, amount: 999, value_band: small}`}</CodeBox>
        <Para>
          The fixture includes one value exactly at the high threshold, a value below the standard threshold, and an excluded test order. The expected rows encode the intended outcomes. The omitted 503 row is intentional: it must be filtered out. YAML scalar values such as <code>gold</code> and <code>high</code> are strings here; quote them if they could be parsed as booleans, numbers, or special YAML values.
        </Para>
        <Table headers={['YAML field', 'Purpose', 'Design check']} rows={[
          ['name', 'Stable, unique unit-test identifier.', 'Use a behavior-oriented name, not a vague label like test_1.'],
          ['model', 'The model whose SQL is evaluated.', 'Use the dbt model name, not a file path or relation name.'],
          ['given', 'Fixture rows for model inputs.', 'Cover only upstream inputs needed by the tested behavior.'],
          ['expect', 'The rows the model should return.', 'Include the output columns needed to make the assertion clear.'],
        ]} />
      </section>

      <Divider />
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 04 — Edge cases" />
        <SectionTitle>Choose Fixtures That Expose Real Failure Modes</SectionTitle>
        <Para>
          A unit test is only as good as the behavior it distinguishes. Repeating ordinary rows does little if every row follows the same branch. Instead, design inputs around business boundaries and failure-prone SQL: exact threshold values, nulls, missing dimension matches, duplicate-like keys, late-arriving records, and inclusive versus exclusive date ranges.
        </Para>
        <CodeBox label="A second test: missing dimension match stays visible">{`unit_tests:
  - name: order_without_customer_keeps_null_tier
    model: fct_order_value
    given:
      - input: ref('stg_orders')
        rows:
          - {order_id: 504, customer_id: 404, amount: 1200, is_test_order: false}
      - input: ref('dim_customers')
        rows: []
    expect:
      rows:
        - {order_id: 504, customer_tier: null, amount: 1200, value_band: standard}`}</CodeBox>
        <Para>
          This fixture states the intended behavior for a left join with no matching customer: preserve the order, return a null tier, and still classify the amount. If the join accidentally becomes an inner join, the expected row disappears and the unit test fails. Null is written as YAML <code>null</code>, not as the quoted string <code>&quot;null&quot;</code>.
        </Para>
        <BulletList items={[
          'Boundary: test values just below, exactly on, and just above a threshold when the operator matters.',
          'Join cardinality: include a fixture that would reveal dropped rows or accidental row multiplication.',
          'Null behavior: decide whether null is propagated, defaulted, or excluded; encode that decision explicitly.',
          'Date logic: include values on both sides of the cutoff and test timezone assumptions separately where relevant.',
        ]} />
        <Callout title="Keep fixtures minimal">
          A 3-row fixture can be more powerful than 3,000 rows when each row covers a deliberately chosen branch. Large fixtures increase review effort and make a failure harder to diagnose.
        </Callout>
      </section>

      <Divider />
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 05 — Run and interpret" />
        <SectionTitle>Run Unit Tests Deliberately in Development and CI</SectionTitle>
        <Para>
          Run a focused unit test while developing, then include relevant tests in the normal pull-request validation. dbt 1.8+ supports selecting unit tests with the <code>test_type:unit</code> selector. A full build also places unit tests before model builds, so invalid logic can fail early; check your dbt version and project conventions when composing selector syntax in an existing CI job.
        </Para>
        <CodeBox label="Focused development commands">{`# Select unit tests for one model
dbt test --select fct_order_value,test_type:unit

# Select unit tests across the project
dbt test --select test_type:unit

# Build selected resources and their applicable tests
dbt build --select fct_order_value+`}</CodeBox>
        <Para>
          The exact selector combination can be adjusted to the resources your team wants to include. In a PR job, keep execution isolated from production relations and make sure the CI target has safe permissions and representative adapter behavior. Unit tests should be quick enough to run often; use data tests and integration checks for broader guarantees.
        </Para>
        <HighlightBox>
          <Para><strong>Read failures by layer:</strong> a compilation error usually points to malformed YAML, an invalid input name, or unsupported SQL. A result mismatch means the executed model output differs from expected rows. A SQL runtime error may reveal adapter-specific syntax or assumptions in the model.</Para>
          <Para>When a test fails, inspect the fixture and the actual rows first. Resist changing expected output just to make CI green: update the expectation only after confirming the business rule changed.</Para>
        </HighlightBox>
      </section>

      <Divider />
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 06 — What unit tests do not prove" />
        <SectionTitle>Use Unit Tests Alongside, Not Instead of, Data Tests</SectionTitle>
        <Para>
          Fixtures isolate model logic. They do not measure production completeness, check that a source table arrived on time, validate referential integrity across the entire warehouse, or prove that a service account can access a production schema. Those are different tests with different evidence. Keep generic tests for invariants on built data, singular tests for project-specific SQL assertions, and end-to-end checks for the deployed pipeline.
        </Para>
        <Table headers={['Test type', 'What it answers', 'Typical example']} rows={[
          ['Unit test', 'Does model logic map controlled inputs to expected rows?', 'A cancellation is excluded and a threshold boundary is classified correctly.'],
          ['Generic / data test', 'Does the built dataset satisfy a reusable rule?', 'Order IDs are unique and not null in the current table.'],
          ['Singular test', 'Does a project-specific query return zero violating rows?', 'Daily revenue reconciles to a finance control total.'],
          ['Integration / operations', 'Can the pipeline run with real services and permissions?', 'A scheduled job can read sources, build marts, and publish results.'],
        ]} />
        <Callout title="Adapter and macro limitations">
          SQL that depends on a warehouse-specific function, a complex package macro, or dynamic introspection may need a different test strategy. Keep the fixture test for the logic it can exercise, and validate adapter-specific behavior in a warehouse integration run.
        </Callout>
      </section>

      <Divider />
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 07 — Common mistakes" />
        <SectionTitle>Make the Test Fail for the Right Reason</SectionTitle>
        <Table headers={['Mistake', 'Why it hurts', 'Better approach']} rows={[
          ['Treating unit tests as data-quality tests', 'Fixture output says nothing about every production row.', 'Keep generic and singular tests on the built model.'],
          ['Testing only the happy path', 'Boundary, null, and join regressions still pass.', 'Select fixtures that exercise distinct branches.'],
          ['Copying large real datasets into YAML', 'Fixtures become hard to review and brittle.', 'Reduce to the smallest rows that prove the behavior.'],
          ['Changing expected rows to silence a failure', 'The test stops being a trustworthy specification.', 'Confirm the intended rule and investigate actual output first.'],
        ]} />
      </section>

      <Divider />
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 08 — Practice and review" />
        <SectionTitle>Practice: Turn Business Rules Into Small Fixtures</SectionTitle>
        <Para>Use a staging model and a mart from your own project, or adapt the order example. Write the expected outcome before writing the fixture so the test expresses an intentional contract.</Para>
        <BulletList items={[
          'Add a unit test for the exact standard-band boundary and explain why it would catch a >= versus > regression.',
          'Test that a test order is excluded without affecting a legitimate order with the same amount.',
          'Add a missing-customer fixture and decide whether the order is retained or filtered; document the business reason.',
          'Write a unit test for a date-window model with one row before the cutoff and one exactly on the cutoff.',
          'Compare your fixture tests with generic tests on the resulting model. State one condition each kind can prove that the other cannot.',
          'Add the relevant selector to a safe CI command and describe how the job avoids production writes.',
        ]} />
        <SubTitle>Key takeaways</SubTitle>
        <KeyTakeaways items={[
          'dbt unit tests (dbt 1.8+) exercise a model with controlled fixture inputs and explicit expected output rows.',
          'A useful fixture is small, readable, and chosen to hit a meaningful branch or boundary.',
          'Use ref(), source(), and this inputs where appropriate; keep fixtures aligned with the model’s actual dependencies.',
          'Unit tests validate transformation logic, while data tests validate properties of the built dataset.',
          'Select unit tests deliberately in development and CI, and use an isolated target with safe permissions.',
          'Adapter-specific and production-data behavior still needs appropriate integration and data-quality checks.',
        ]} />
      </section>
    </LearnLayout>
  )
}
