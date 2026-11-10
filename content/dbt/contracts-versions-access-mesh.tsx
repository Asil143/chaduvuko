import { LearnLayout } from '@/components/content/LearnLayout'
import { KeyTakeaways } from '@/components/content/KeyTakeaways'
import { BulletList, Callout, CodeBox, Divider, HighlightBox, Para, SectionTag, SectionTitle, SubTitle, Table } from './DbtLessonParts'

export default function ContractsVersionsAccessMesh() {
  return (
    <LearnLayout
      title="Model Contracts, Versions and Access (dbt Mesh)"
      description="Define stable dbt model interfaces with enforced contracts, evolve breaking changes through model versions, and govern dependencies with access levels in a dbt Mesh architecture."
      section="dbt — Lesson 21"
      readTime="75 min"
      breadcrumbs={[
        { label: 'Learn', href: '/learn' },
        { label: 'dbt', href: '/learn/dbt' },
        { label: 'Model Contracts, Versions and Access (dbt Mesh)', href: '/learn/dbt/contracts-versions-access-mesh' },
      ]}
    >
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 01 — Treat models as interfaces" />
        <SectionTitle>Analytics Models Become Shared APIs When Teams Depend on Them</SectionTitle>
        <Para>
          A dbt model often starts as a convenient query for one analyst. Over time, dashboards, downstream models, and other teams depend on its columns and meaning. Renaming a field or changing its grain can then break consumers just as an incompatible API change can break applications. Contracts, versions, and access settings give a team tools to make those dependencies explicit and safer to evolve.
        </Para>
        <Para>
          dbt Mesh is an architectural approach for multiple dbt projects to publish and consume governed models. It is not a single switch that automatically creates secure boundaries. Teams still choose ownership, dependencies, environment strategy, permissions, and release processes. In this lesson we build from three concepts: contracts describe a model's shape; versions provide a migration path for incompatible changes; access levels limit which projects may reference a model.
        </Para>
        <HighlightBox>
          <Para><strong>Prerequisites:</strong> you should understand dbt models, YAML properties, project dependencies, and <code>ref()</code>. Versioning and cross-project references are most useful after teams have stable model ownership and a practical release workflow.</Para>
          <Para><strong>Learning objective:</strong> publish a customer model with a declared schema, evolve a breaking change through versions, and keep internal implementation models from becoming accidental cross-team dependencies.</Para>
        </HighlightBox>
        <Callout title="Start with the boundary">
          Before marking a model public, ask who owns its definition, who consumes it, what grain it represents, and which changes count as breaking. Tooling can enforce a declared boundary; it cannot decide the business meaning for you.
        </Callout>
      </section>

      <Divider />
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 02 — Model contracts" />
        <SectionTitle>Declare the Shape Consumers Can Rely On</SectionTitle>
        <Para>
          A model contract is a schema agreement between the SQL model and its declared columns. Enabling enforcement asks dbt to validate that the model output matches the declared column names and data types when the model is built. It catches accidental schema drift before the model is treated as a stable interface. Contracts are adapter- and feature-sensitive; check the supported contract capabilities for your dbt and warehouse versions, especially before relying on database constraints.
        </Para>
        <CodeBox label="models/marts/schema.yml — an enforced contract">{`models:
  - name: fct_orders
    description: One row per accepted customer order.
    config:
      contract:
        enforced: true
    columns:
      - name: order_id
        data_type: bigint
        description: Stable identifier for one order.
      - name: customer_id
        data_type: bigint
        description: Customer that placed the order.
      - name: ordered_at
        data_type: timestamp
      - name: net_amount
        data_type: numeric(12, 2)`}</CodeBox>
        <Para>
          The model's SQL must return the declared columns with compatible types. Be explicit with casts and aliases rather than assuming a warehouse will infer exactly the intended type from a CASE expression or a literal. The contract is not a replacement for descriptions, data tests, or business review: it describes structural shape, not whether the revenue calculation is correct.
        </Para>
        <CodeBox label="models/marts/fct_orders.sql — make output shape deliberate">{`select
    cast(order_id as bigint) as order_id,
    cast(customer_id as bigint) as customer_id,
    cast(ordered_at as timestamp) as ordered_at,
    cast(gross_amount - discount_amount as numeric(12, 2)) as net_amount
from {{ ref('int_accepted_orders') }}`}</CodeBox>
        <Callout title="Contracts have limits">
          A contract does not prove that downstream users interpret a field correctly, and it does not automatically make every warehouse constraint enforceable. Use dbt data tests for key/value expectations and confirm adapter support for the exact enforcement behavior you need.
        </Callout>
      </section>

      <Divider />
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 03 — Model versions" />
        <SectionTitle>Make Breaking Changes Explicit Instead of Forcing a Big-Bang Migration</SectionTitle>
        <Para>
          A model version lets a producer support multiple interfaces while consumers migrate at different speeds. Add a new version when a change is incompatible for an existing consumer—for example, changing a column's meaning, removing a field, or changing the grain. A non-breaking addition may not need a new version, but teams should document the compatibility policy they follow.
        </Para>
        <CodeBox label="models/marts/schema.yml — keep v1 while publishing v2">{`models:
  - name: dim_customers
    latest_version: 2
    versions:
      - v: 1
        columns:
          - name: customer_id
            data_type: bigint
          - name: full_name
            data_type: varchar
      - v: 2
        columns:
          - name: customer_id
            data_type: bigint
          - name: customer_name
            data_type: varchar
          - name: lifetime_value
            data_type: numeric(12, 2)`}</CodeBox>
        <Para>
          Versioned model configuration can declare version-specific columns, while each version has a corresponding model implementation following dbt's versioned model naming convention. Check the version and model configuration syntax supported by your installed dbt release. A version declaration is a migration tool, not a way to make incompatible output magically compatible.
        </Para>
        <CodeBox label="Consumer refs — opt into a specific interface">{`-- Default ref resolves to the model's latest_version.
select customer_id, customer_name, lifetime_value
from {{ ref('dim_customers') }}

-- A slower-moving consumer can pin its dependency during migration.
select customer_id, full_name
from {{ ref('dim_customers', v=1) }}`}</CodeBox>
        <Para>
          Tell consumers when the default advances, track which models still use the old version, and define a deprecation window that matches the organization's release cadence. Removing a version before consumers have a tested migration path turns versioning into documentation rather than compatibility management.
        </Para>
      </section>

      <Divider />
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 04 — Access and ownership" />
        <SectionTitle>Use Access Levels to Separate Public Interfaces From Internals</SectionTitle>
        <Para>
          Model access communicates where a model may be referenced. A private model is limited to its group, a protected model is available within its project, and a public model can be consumed across projects. Most implementation details should remain private or protected; reserve public access for supported interfaces with clear ownership and documentation. These controls are dbt's project-level dependency governance, not a substitute for warehouse permissions or data privacy controls.
        </Para>
        <CodeBox label="models/groups.yml — make ownership visible">{`groups:
  - name: customer_analytics
    owner:
      name: Customer Analytics
      email: data-team@example.com`}</CodeBox>
        <CodeBox label="models/marts/schema.yml — scope a model">{`models:
  - name: int_customer_value
    group: customer_analytics
    access: private
    description: Internal intermediate calculation for customer marts.

  - name: dim_customers
    group: customer_analytics
    access: public
    description: Governed customer dimension for analytics consumers.`}</CodeBox>
        <Table headers={['Access', 'Reference scope', 'Good fit']} rows={[
          ['private', 'Models in the same group.', 'Internal helpers that are not a supported interface.'],
          ['protected', 'Models within the same dbt project.', 'Project-level models intended for reuse by local teams.'],
          ['public', 'Cross-project consumers can reference the model.', 'Stable, owned interfaces with documented schema and change policy.'],
        ]} />
        <Callout title="Do not confuse access with security">
          Access configures whether dbt allows a model dependency. It does not grant or revoke warehouse-level SELECT permissions, mask sensitive columns, or replace row/column security. Configure those controls in the warehouse and review them independently.
        </Callout>
      </section>

      <Divider />
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 05 — Connect projects with Mesh" />
        <SectionTitle>Publish a Public Model, Then Consume It Through a Declared Dependency</SectionTitle>
        <Para>
          In a multi-project setup, each project has a name, its own ownership boundary, and a declared dependency on the upstream project it consumes. The consumer uses a cross-project <code>ref()</code> to create a graph edge; dbt can then reason about the dependency instead of hiding it in a hard-coded warehouse table name. Project dependency configuration and deployment artifacts must agree across environments.
        </Para>
        <CodeBox label="models/marts/fct_customer_orders.sql — consumer project">{`select
    orders.order_id,
    customers.customer_name,
    orders.net_amount
from {{ ref('orders_project', 'fct_orders') }} as orders
left join {{ ref('customer_project', 'dim_customers') }} as customers
    on orders.customer_id = customers.customer_id`}</CodeBox>
        <Para>
          For this reference to work, the consuming dbt project must declare the upstream project as a dependency using the project-dependency mechanism supported by the installed dbt version. The upstream model must be published with public access, and its production artifact and environment mapping must be available to the consumer. Follow your team's dbt Cloud or self-managed deployment pattern for state and environment setup; a cross-project ref is not a live network call between warehouses.
        </Para>
        <HighlightBox>
          <Para><strong>Contract + version + access work together:</strong> access says who may depend on the model, a contract states the expected schema, and versioning gives existing consumers a path through incompatible change. None of the three defines the metric or business semantics by itself.</Para>
        </HighlightBox>
      </section>

      <Divider />
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 06 — Safe evolution workflow" />
        <SectionTitle>Turn a Schema Change Into a Managed Consumer Migration</SectionTitle>
        <Para>Suppose the customer dimension changes from a full name to separate first and last names, and a finance model still reads the old field. Treat this as a deliberate release rather than an edit-and-hope deployment.</Para>
        <BulletList items={[
          'Inventory references and identify owners of the old interface; use the DAG, project artifacts, and team ownership records.',
          'Add the new version and its declared output, then validate the enforced contract and relevant data tests.',
          'Keep the old version available while consumers update to the new version; use explicit refs where they clarify a migration.',
          'Build consumer projects in CI against the intended upstream artifact and check that cross-project dependencies resolve.',
          'Communicate the migration and deprecation window; monitor remaining old-version consumers before removal.',
          'After the agreed window and consumer validation, retire the old version in a reviewed change.',
        ]} />
        <Para>
          This sequence is intentionally more than YAML. The technical version declaration only helps if teams can discover consumers and coordinate a release. For critical interfaces, publish an owner, grain, freshness expectations, definitions, and a change notice alongside the schema.
        </Para>
      </section>

      <Divider />
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 07 — Common mistakes" />
        <SectionTitle>Keep Governance Settings Honest</SectionTitle>
        <Table headers={['Mistake', 'Why it hurts', 'Better approach']} rows={[
          ['Marking every model public', 'Implementation details become de facto APIs.', 'Publish only stable interfaces; keep helpers private or protected.'],
          ['Assuming a contract checks business meaning', 'A structurally valid column can still be wrong.', 'Pair schema enforcement with data tests, unit tests, and review.'],
          ['Bumping a version for every harmless edit', 'Consumers inherit unnecessary migration work.', 'Agree on breaking-change criteria and use them consistently.'],
          ['Removing old versions immediately', 'Downstream models can fail at compile or build time.', 'Inventory consumers, communicate, migrate, then deprecate.'],
          ['Treating dbt access as warehouse authorization', 'A permitted dbt ref does not grant a secure data entitlement.', 'Manage database grants and sensitive-data controls separately.'],
        ]} />
      </section>

      <Divider />
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 08 — Practice and review" />
        <SectionTitle>Practice: Publish a Stable Customer Interface</SectionTitle>
        <Para>Use a development project or a small example project. Focus on the contract you want consumers to rely on and the migration steps they would need if it changes.</Para>
        <BulletList items={[
          'Add an enforced contract to a public mart and explicitly cast its output columns.',
          'Choose one change to the model and classify it as breaking or non-breaking; defend the decision with a consumer example.',
          'Declare v2 while keeping v1 available, and update one downstream ref to the new version.',
          'Create a group for the owning team and make an internal helper private; verify which models should still reference it.',
          'Sketch a two-project dependency and list the artifact, permissions, CI, and environment assumptions that must hold.',
          'Write a short deprecation notice listing the old version, replacement, owner, and migration deadline.',
        ]} />
        <SubTitle>Key takeaways</SubTitle>
        <KeyTakeaways items={[
          'An enforced contract checks model output against declared column names and data types, subject to adapter support.',
          'Use model versions to manage incompatible changes while consumers migrate deliberately.',
          'Access settings distinguish group-private, project-protected, and cross-project-public interfaces.',
          'dbt Mesh depends on explicit project ownership, dependencies, artifacts, and deployment practices—not one configuration flag.',
          'Cross-project refs keep dependencies in the DAG; avoid hard-coded relation names for governed project interfaces.',
          'dbt access is not warehouse authorization, and schema enforcement is not a data-quality guarantee.',
        ]} />
      </section>
    </LearnLayout>
  )
}
