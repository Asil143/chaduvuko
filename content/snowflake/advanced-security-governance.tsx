import { BulletList, Callout, CodeBox, Divider, HighlightBox, KeyTakeaways, LearnLayout, Para, SectionTag, SectionTitle, SubTitle, Table } from './_shared'

export default function AdvancedSecurityGovernance() {
  return (
    <LearnLayout
      title="Advanced Security and Governance"
      description="Masking policies, row access policies, object tagging, classification, access history, and how they build on RBAC to protect sensitive data at query time."
      section="Snowflake — Module 15"
      readTime="65 min"
      updatedAt="September 2026"
      breadcrumbs={[
        { label: 'Learn', href: '/learn' },
        { label: 'Snowflake', href: '/learn/snowflake' },
        { label: 'Advanced Security and Governance', href: '/learn/snowflake/advanced-security-governance' },
      ]}
      prev={{ title: 'Cost Optimization', href: '/learn/snowflake/cost-optimization' }}
      next={{ title: 'Data Sharing and Marketplace', href: '/learn/snowflake/data-sharing-marketplace' }}
    >
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 01 — The plain-English idea" />
        <SectionTitle>RBAC Decides the Door; Governance Decides What's Inside the Room</SectionTitle>
        <Para>
          Roles and grants, covered in Roles and Security Basics, decide whether a role can reach a table at
          all — USAGE on the warehouse, database, schema, and SELECT on the table. That is a binary decision:
          a role either has SELECT on `GOLD.CUSTOMERS` or it does not. Real organizations need something more
          granular than binary. Finance needs to see a customer's full email address; support needs to see
          that the customer exists without seeing their email; a regional sales manager should see their
          region's rows but not another region's. Advanced governance features let the same table serve
          different audiences differently, without duplicating the table.
        </Para>
        <Para>
          This module covers four features that sit on top of RBAC: masking policies (hide or transform
          column values based on who is asking), row access policies (filter which rows are visible based on
          who is asking), object tagging (classify data so governance and cost tooling can reason about it),
          and access history (prove after the fact who actually read or wrote what).
        </Para>
        <HighlightBox>
          <Para>
            <strong>Plain-English definition:</strong> RBAC controls the door to the room. Masking policies
            blur specific sensitive fields once you're inside. Row access policies decide which rows of
            furniture you can see. Tags and access history are the labels and the security camera log that
            let you prove, later, what was classified and who looked at it.
          </Para>
        </HighlightBox>
        <CodeBox label="Mental model">{`RBAC:                Can this role query GOLD.CUSTOMERS at all?
Masking policy:       Of the columns it can see, which values are shown real vs. masked?
Row access policy:    Of the rows it can see, which ones are actually returned?
Tags:                 What is this column/table classified as (PII, PCI, internal)?
Access history:       Who actually read or wrote which columns, and when?`}
        </CodeBox>
      </section>

      <Divider />

      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 02 — Why RBAC alone is not enough" />
        <SectionTitle>The Same Table, Different Audiences</SectionTitle>
        <Para>
          Imagine `GOLD.CUSTOMERS` has an `email` column. Finance and support both need `SELECT` on this
          table — finance to verify billing disputes, support to look up a customer's ticket history. But
          finance is allowed to see the actual email address, and support should only see a masked version, so
          a support analyst cannot casually harvest emails for something unrelated to their job. Solving this
          with RBAC alone would mean creating two separate tables or views, keeping them in sync, and hoping
          nobody queries the wrong one.
        </Para>
        <Table
          headers={['Approach', 'How it handles the finance/support split', 'Downside']}
          rows={[
            ['RBAC only, one table.', 'Not possible — a role either has SELECT on the column or it does not.', 'Forces an all-or-nothing decision per column.'],
            ['Two separate tables/views, RBAC per table.', 'FINANCE_CUSTOMERS has real email, SUPPORT_CUSTOMERS has a masked column baked in.', 'Duplicate objects to maintain; easy for them to drift out of sync.'],
            ['One table, one masking policy on the email column.', 'CURRENT_ROLE() decides at query time what the column returns.', 'Requires understanding masking policy syntax, but scales cleanly to any number of roles.'],
          ]}
        />
        <Callout title="Assuming table SELECT grants alone satisfy privacy requirements" color="#ef4444">
          This is one of the most common governance mistakes. A role can have exactly the SELECT grant it
          needs and still see data it should not, because RBAC has no concept of "this specific value should
          look different depending on who is asking." That is what masking and row access policies exist for.
        </Callout>
      </section>

      <Divider />

      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 03 — Masking policy basics" />
        <SectionTitle>A Masking Policy Is a CASE Statement Attached to a Column</SectionTitle>
        <Para>
          A masking policy is a schema-level object defined once as a SQL expression that takes the column's
          real value as input and returns either the real value or a transformed/masked value, based on
          conditions you write — almost always checking `CURRENT_ROLE()`. Once created, the policy is attached
          to one or more table or view columns with `ALTER TABLE ... MODIFY COLUMN ... SET MASKING POLICY`.
          From that point on, the masking decision happens dynamically at query time: the same underlying
          stored value can appear real to one role and masked to another, in the exact same query text run by
          different sessions.
        </Para>
        <CodeBox label="Create and apply a masking policy">{`CREATE OR REPLACE MASKING POLICY EMAIL_MASK AS (val STRING) RETURNS STRING ->
  CASE
    WHEN CURRENT_ROLE() IN ('PII_FULL_ACCESS', 'FINANCE_READER') THEN val
    ELSE '***MASKED***'
  END;

ALTER TABLE GOLD.CUSTOMERS
  MODIFY COLUMN email SET MASKING POLICY EMAIL_MASK;`}
        </CodeBox>
        <Para>
          Masking is dynamic, not a separate copy of the data. There is only one `email` value stored per row.
          The masking policy decides, at the moment a query runs, what that stored value is allowed to render
          as for the session's active role. This means a masking policy applied once protects every query,
          every dashboard, and every ad hoc SELECT against that column — nobody can bypass it just by writing
          different SQL, because the check happens inside Snowflake's query execution, not in application code.
        </Para>
        <Table
          headers={['Masking style', 'Example transformation', 'When to use it']}
          rows={[
            ['Full mask.', "Replace entire value with '***MASKED***' or NULL.", 'Highly sensitive fields (SSN, payment card number) for roles with no legitimate need.'],
            ['Partial mask.', "Show first character, mask the rest: 'j***@***.com'.", 'Support/debugging contexts that need to confirm a record exists without exposing the full value.'],
            ['Hash mask.', 'Return a consistent hash of the value.', 'Analytics that need to group by customer without seeing the identifying value itself.'],
            ['Conditional pass-through.', 'Return the real value only for specific roles.', 'Finance, compliance, or data-owner roles with an approved need.'],
          ]}
        />
      </section>

      <Divider />

      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 04 — Masking policy patterns" />
        <SectionTitle>Partial Masks, Multiple Columns, and Reusable Policies</SectionTitle>
        <Para>
          A masking policy can be as simple as "hide everything" or as nuanced as partially revealing a value.
          The same policy can also be reused across multiple columns and tables if the masking rule is the
          same — for example, one `EMAIL_MASK` policy applied to every email column across the whole account,
          rather than writing a new policy per table.
        </Para>
        <CodeBox label="Partial mask showing only the domain">{`CREATE OR REPLACE MASKING POLICY EMAIL_PARTIAL_MASK AS (val STRING) RETURNS STRING ->
  CASE
    WHEN CURRENT_ROLE() IN ('PII_FULL_ACCESS') THEN val
    WHEN CURRENT_ROLE() IN ('SUPPORT_READER') THEN
      REGEXP_REPLACE(val, '(^.).*(@.*$)', '\\\\1***\\\\2')
    ELSE '***MASKED***'
  END;

ALTER TABLE GOLD.CUSTOMERS MODIFY COLUMN email SET MASKING POLICY EMAIL_PARTIAL_MASK;
ALTER TABLE SUPPORT.TICKETS MODIFY COLUMN customer_email SET MASKING POLICY EMAIL_PARTIAL_MASK;`}
        </CodeBox>
        <CodeBox label="Masking a numeric field like payment card or SSN">{`CREATE OR REPLACE MASKING POLICY SSN_MASK AS (val STRING) RETURNS STRING ->
  CASE
    WHEN CURRENT_ROLE() IN ('COMPLIANCE_OFFICER') THEN val
    ELSE 'XXX-XX-' || RIGHT(val, 4)
  END;

ALTER TABLE HR.EMPLOYEES MODIFY COLUMN ssn SET MASKING POLICY SSN_MASK;`}
        </CodeBox>
        <Callout title="Masking data in one table but exposing the same value in another view" color="#ef4444">
          A masking policy protects the column it is attached to. If the same raw value is copied into another
          table or exposed through a view built on top of the raw source rather than the masked column, the
          policy on the original column does nothing for that copy. Apply masking as close to the source of
          truth as possible, and be deliberate about anywhere the underlying raw value gets copied downstream.
        </Callout>
      </section>

      <Divider />

      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 05 — Row access policy basics" />
        <SectionTitle>Row Access Policies Filter Which Rows a Role Can See</SectionTitle>
        <Para>
          A row access policy is similar in spirit to a masking policy, but instead of transforming a column
          value, it returns a boolean that decides whether the entire row is visible to the current session.
          This is the mechanism behind row-level security: a sales rep only sees rows for their own region, a
          tenant only sees their own tenant's rows in a multi-tenant table, or a manager sees their direct
          reports' data but not the whole company's.
        </Para>
        <CodeBox label="Create and apply a row access policy">{`CREATE OR REPLACE ROW ACCESS POLICY REGION_POLICY AS (region STRING) RETURNS BOOLEAN ->
  CURRENT_ROLE() = 'GLOBAL_ANALYST'
  OR region = CURRENT_ROLE();

ALTER TABLE GOLD.SALES
  ADD ROW ACCESS POLICY REGION_POLICY ON (region);`}
        </CodeBox>
        <Para>
          In this example, a role literally named after its region — say, `EMEA_SALES_REP` — only sees rows
          where `region = 'EMEA_SALES_REP'`. A `GLOBAL_ANALYST` role bypasses the region check entirely and
          sees every row. In a real design you would more likely map roles to regions through a mapping table
          rather than naming roles identically to region values, but the mechanism is the same: the policy
          function runs once per row, per query, and decides inclusion.
        </Para>
        <CodeBox label="Row access policy driven by a mapping table">{`CREATE OR REPLACE TABLE SECURITY.ROLE_REGION_MAP (
  role_name STRING,
  region STRING
);

CREATE OR REPLACE ROW ACCESS POLICY REGION_POLICY_MAPPED AS (region STRING) RETURNS BOOLEAN ->
  CURRENT_ROLE() = 'GLOBAL_ANALYST'
  OR EXISTS (
    SELECT 1 FROM SECURITY.ROLE_REGION_MAP m
    WHERE m.role_name = CURRENT_ROLE()
      AND m.region = region
  );

ALTER TABLE GOLD.SALES DROP ROW ACCESS POLICY REGION_POLICY;
ALTER TABLE GOLD.SALES ADD ROW ACCESS POLICY REGION_POLICY_MAPPED ON (region);`}
        </CodeBox>
        <Table
          headers={['Row access pattern', 'Use case', 'Note']}
          rows={[
            ['Role name matches a data value.', 'Simple demos or small role sets.', 'Brittle at scale — role naming becomes a hidden dependency.'],
            ['Mapping table lookup.', 'Real production tenant/region/department isolation.', 'Easier to maintain as roles and regions change independently.'],
            ['Bypass role for global visibility.', 'An analyst or admin role that legitimately needs to see everything.', 'Keep this role tightly scoped and audited — it is the master key for that table.'],
          ]}
        />
      </section>

      <Divider />

      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 06 — Masking and row access work together" />
        <SectionTitle>The Same Table Can Carry Both Policy Types at Once</SectionTitle>
        <Para>
          Masking policies and row access policies are independent and composable. A table can have a masking
          policy on its `email` column and a row access policy on its `region` column simultaneously. A
          regional sales manager querying `GOLD.SALES` would only see their region's rows (row access policy),
          and within those rows, only see a masked customer email unless they also hold a PII-access role
          (masking policy).
        </Para>
        <CodeBox label="Both policy types on one table">{`ALTER TABLE GOLD.SALES ADD ROW ACCESS POLICY REGION_POLICY_MAPPED ON (region);
ALTER TABLE GOLD.SALES MODIFY COLUMN customer_email SET MASKING POLICY EMAIL_PARTIAL_MASK;

-- A REGIONAL_SALES_REP role querying this table:
--   1. only receives rows for their mapped region (row access policy)
--   2. sees customer_email partially masked unless also in PII_FULL_ACCESS (masking policy)
SELECT region, customer_email, total_usd FROM GOLD.SALES;`}
        </CodeBox>
        <HighlightBox>
          <Para>
            <strong>Mental model:</strong> think of the row access policy as a filter clause silently appended
            to every query's WHERE condition, and the masking policy as a CASE expression silently wrapped
            around every protected column in the SELECT list. Both are enforced by Snowflake itself, so they
            apply consistently whether the query comes from a SQL worksheet, a BI tool, or a dbt job.
          </Para>
        </HighlightBox>
      </section>

      <Divider />

      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 07 — Object tagging" />
        <SectionTitle>Tags Classify Objects So Governance Tooling Can Reason About Them</SectionTitle>
        <Para>
          A tag is a schema-level object, similar in creation to a masking policy, that lets you attach a
          key-value label to databases, schemas, tables, columns, warehouses, or other objects. Tags do not
          enforce anything by themselves — they are metadata. Their value comes from what you and your
          tooling do with them: reporting which columns are classified as PII, driving cost attribution (as
          covered in the Cost Optimization module), or feeding an access-review process.
        </Para>
        <CodeBox label="Create and apply tags for classification">{`CREATE TAG IF NOT EXISTS DATA_CLASSIFICATION
  ALLOWED_VALUES 'PII', 'PCI', 'INTERNAL', 'PUBLIC';

ALTER TABLE GOLD.CUSTOMERS MODIFY COLUMN email
  SET TAG DATA_CLASSIFICATION = 'PII';

ALTER TABLE GOLD.CUSTOMERS MODIFY COLUMN loyalty_tier
  SET TAG DATA_CLASSIFICATION = 'INTERNAL';

ALTER TABLE HR.EMPLOYEES MODIFY COLUMN ssn
  SET TAG DATA_CLASSIFICATION = 'PII';`}
        </CodeBox>
        <CodeBox label="Query which columns are tagged PII">{`SELECT
  object_database,
  object_schema,
  object_name,
  column_name,
  tag_name,
  tag_value
FROM SNOWFLAKE.ACCOUNT_USAGE.TAG_REFERENCES
WHERE tag_name = 'DATA_CLASSIFICATION'
  AND tag_value = 'PII';`}
        </CodeBox>
        <Table
          headers={['Tag use', 'Example', 'Why it matters']}
          rows={[
            ['Data classification.', 'Tag a column PII, PCI, INTERNAL, or PUBLIC.', 'Lets you enumerate every sensitive column in the account with one query.'],
            ['Ownership.', 'Tag a schema with its owning team.', 'Turns "who owns this" into a query instead of institutional memory.'],
            ['Cost attribution.', 'Tag a warehouse with a cost center.', 'Feeds chargeback/showback reporting.'],
            ['Lifecycle.', 'Tag a table as deprecated or scheduled for removal.', 'Helps cleanup and audit projects find stale objects.'],
          ]}
        />
      </section>

      <Divider />

      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 08 — Classification (automatic suggestions)" />
        <SectionTitle>Snowflake's Classification Feature Suggests, It Does Not Enforce</SectionTitle>
        <Para>
          Snowflake offers a classification feature that scans table contents and column names, and suggests
          likely semantic categories — for example, flagging a column as a probable email address, name, or
          phone number, along with a confidence level. This is genuinely useful as a starting point for a
          governance rollout, especially on large or unfamiliar schemas where nobody has manually reviewed
          every column.
        </Para>
        <Callout title="Described accurately: a suggestion tool, not automatic enforcement">
          Classification results are suggestions for a human or process to review and act on. Running
          classification does not, by itself, apply a masking policy, a row access policy, or a tag to
          anything. You still have to review the suggestions and explicitly apply the governance controls
          covered in this module. Treat classification as a discovery aid that speeds up the audit — not as a
          policy engine that protects data on its own.
        </Callout>
        <CodeBox label="Conceptual classification workflow">{`-- 1. Run classification (via Snowsight UI or the classification system procedures)
--    over a schema to get suggested semantic categories per column.
-- 2. Review suggestions: does this really look like PII, or a false positive?
-- 3. For confirmed sensitive columns, apply the real controls:
ALTER TABLE GOLD.CUSTOMERS MODIFY COLUMN email SET TAG DATA_CLASSIFICATION = 'PII';
ALTER TABLE GOLD.CUSTOMERS MODIFY COLUMN email SET MASKING POLICY EMAIL_PARTIAL_MASK;`}
        </CodeBox>
      </section>

      <Divider />

      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 09 — Access history" />
        <SectionTitle>ACCESS_HISTORY Tells You Who Actually Touched What</SectionTitle>
        <Para>
          `ACCESS_HISTORY` is an account usage view that records which specific columns and objects a query
          actually read or wrote, per query, per user. This is more granular than `QUERY_HISTORY`, which shows
          you the query text but not a structured record of exactly which columns were touched. Access history
          exists to answer the audit question directly: "who has actually read this sensitive column in the
          last 90 days," not just "who has permission to."
        </Para>
        <CodeBox label="Who read a specific sensitive column">{`SELECT
  user_name,
  query_start_time,
  direct_objects_accessed,
  base_objects_accessed
FROM SNOWFLAKE.ACCOUNT_USAGE.ACCESS_HISTORY
WHERE query_start_time >= DATEADD(day, -30, CURRENT_TIMESTAMP())
  AND EXISTS (
    SELECT 1
    FROM TABLE(FLATTEN(direct_objects_accessed)) f
    WHERE f.value:"objectName"::STRING = 'GOLD_DB.GOLD.CUSTOMERS'
  )
ORDER BY query_start_time DESC;`}
        </CodeBox>
        <Para>
          Access history is also how you verify least-privilege assumptions in practice, rather than in
          theory. RBAC review tells you who has SELECT on a table. Access history tells you who actually used
          it. A role that has held SELECT on a sensitive table for a year but has never once queried it is a
          strong candidate for having that access revoked.
        </Para>
        <Table
          headers={['Question', 'View to use', 'Note']}
          rows={[
            ['Who can access this table?', 'SHOW GRANTS ON TABLE.', 'Permission, not usage.'],
            ['Who has actually queried this table?', 'ACCESS_HISTORY or QUERY_HISTORY.', 'Usage evidence.'],
            ['Which specific columns were read, not just the table?', 'ACCESS_HISTORY (direct_objects_accessed).', 'Column-level granularity that QUERY_HISTORY does not give you directly.'],
            ['Has this granted role ever been used for its sensitive access?', 'Cross-reference SHOW GRANTS with ACCESS_HISTORY over a review window.', 'Basis for revoking unused privileged access.'],
          ]}
        />
      </section>

      <Divider />

      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 10 — How this builds on RBAC" />
        <SectionTitle>Every Policy's CASE Logic Usually Checks CURRENT_ROLE()</SectionTitle>
        <Para>
          Masking policies and row access policies do not replace the role hierarchy from Roles and Security
          Basics — they extend it. The `CASE` expression inside a masking policy, and the boolean expression
          inside a row access policy, almost always key off `CURRENT_ROLE()` (or occasionally
          `CURRENT_AVAILABLE_ROLES()` for hierarchy-aware checks). This means the role design work you already
          did — functional roles like `RAW_LOADER`, `DBT_TRANSFORMER`, `ANALYST_READER`, `PII_FULL_ACCESS` —
          is the same vocabulary these policies reason about.
        </Para>
        <CodeBox label="Policies reuse the functional roles from RBAC design">{`-- Roles created following the RBAC pattern from Roles and Security Basics:
--   PII_FULL_ACCESS, FINANCE_READER, SUPPORT_READER, GLOBAL_ANALYST

CREATE OR REPLACE MASKING POLICY EMAIL_MASK AS (val STRING) RETURNS STRING ->
  CASE
    WHEN CURRENT_ROLE() IN ('PII_FULL_ACCESS', 'FINANCE_READER') THEN val
    ELSE '***MASKED***'
  END;

-- If a messy role hierarchy makes it hard to answer
-- "which roles should see this?", that same confusion
-- will leak straight into every masking and row access policy you write.`}
        </CodeBox>
        <Callout title="If the role model is messy, advanced governance becomes messy too">
          A masking policy is only as clear as the role names it checks. If your account has ad hoc, poorly
          scoped, or overlapping roles, every policy you write inherits that confusion. Clean up RBAC first;
          governance policies are a thin, precise layer on top of it, not a substitute for it.
        </Callout>
      </section>

      <Divider />

      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 11 — Testing policies with real roles" />
        <SectionTitle>Always Test Governance Policies From the Role That Will Actually Use Them</SectionTitle>
        <Para>
          A masking or row access policy can look correct in the `CREATE` statement and still behave wrong in
          practice, because testing happened under `ACCOUNTADMIN` or `SYSADMIN`, roles that were never the
          intended audience. `ACCOUNTADMIN` may not even be included in the policy's `CASE` logic, which means
          testing under it can either falsely appear to work (if it matches a wildcard condition) or falsely
          appear broken (if it hits the masked branch and nobody expected that).
        </Para>
        <CodeBox label="Correct testing pattern">{`-- Wrong: proves almost nothing about the real BI tool or analyst experience
USE ROLE ACCOUNTADMIN;
SELECT email FROM GOLD.CUSTOMERS LIMIT 5;

-- Right: test with the exact role a support analyst or dbt service account uses
USE ROLE SUPPORT_READER;
USE WAREHOUSE WH_BI_S;
SELECT email FROM GOLD.CUSTOMERS LIMIT 5;

USE ROLE PII_FULL_ACCESS;
SELECT email FROM GOLD.CUSTOMERS LIMIT 5;`}
        </CodeBox>
        <Table
          headers={['Mistake', 'Why it hides bugs', 'Fix']}
          rows={[
            ['Applying policies without testing BI and dbt service roles.', 'A service role\'s pipeline can silently start receiving masked data mid-transformation.', 'Test every affected service role after deploying a new policy, not just human roles.'],
            ['Testing only as ACCOUNTADMIN.', 'ACCOUNTADMIN\'s behavior under the policy may not represent any real user.', 'Always test with the specific role the real workload uses.'],
            ['Creating governance rules with no documented owner.', 'Nobody knows who to ask when a policy needs to change or is suspected to be wrong.', 'Record an owner and a reason when a policy is created, same as RBAC role documentation.'],
          ]}
        />
      </section>

      <Divider />

      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 12 — Governed views as the default consumption layer" />
        <SectionTitle>Prefer Governed Views Over Direct Table Access for Broad Consumption</SectionTitle>
        <Para>
          Masking and row access policies protect a column or table no matter how it is queried, which is
          their strength. Even so, many teams still prefer to expose a governed view — a view built on top of
          the masked/filtered table — as the actual object that BI tools and analysts query, rather than
          granting broad `SELECT` directly on the base table. This keeps a single, documented "front door" for
          consumption, makes intent explicit, and leaves room to layer in additional business logic (renamed
          columns, joins to reference tables) alongside the governance controls.
        </Para>
        <CodeBox label="A governed view on top of policy-protected columns">{`CREATE OR REPLACE VIEW GOLD.CUSTOMERS_GOVERNED AS
SELECT
  customer_id,
  email,          -- masking policy on the base column still applies through the view
  loyalty_tier,
  region
FROM GOLD.CUSTOMERS;

GRANT SELECT ON VIEW GOLD.CUSTOMERS_GOVERNED TO ROLE SUPPORT_READER;
GRANT SELECT ON VIEW GOLD.CUSTOMERS_GOVERNED TO ROLE FINANCE_READER;`}
        </CodeBox>
        <Callout title="The base table's policy still applies through the view">
          Masking and row access policies attached to a base table's column continue to apply when that column
          is selected through a view, as long as the view does not transform the value in a way that bypasses
          it. This lets you combine "one governed view as the front door" with "policy enforcement follows the
          data no matter the path" — the two patterns reinforce each other rather than compete.
        </Callout>
      </section>

      <Divider />

      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 13 — Worked example: masking a PII column" />
        <SectionTitle>Securing a Customer Mart End to End</SectionTitle>
        <Para>
          Walk through a complete example: `GOLD.CUSTOMERS` has an `email` column that only a designated
          `PII_FULL_ACCESS` role should see unmasked. Everyone else — including support, BI, and general
          analysts — should see it masked. We also want the classification recorded as a tag and a way to
          audit who has actually read the real value.
        </Para>
        <CodeBox label="Step 1 — classify with a tag">{`CREATE TAG IF NOT EXISTS DATA_CLASSIFICATION
  ALLOWED_VALUES 'PII', 'PCI', 'INTERNAL', 'PUBLIC';

ALTER TABLE GOLD.CUSTOMERS MODIFY COLUMN email
  SET TAG DATA_CLASSIFICATION = 'PII';`}
        </CodeBox>
        <CodeBox label="Step 2 — create the masking policy">{`CREATE OR REPLACE MASKING POLICY EMAIL_MASK AS (val STRING) RETURNS STRING ->
  CASE
    WHEN CURRENT_ROLE() IN ('PII_FULL_ACCESS') THEN val
    ELSE '***MASKED***'
  END;`}
        </CodeBox>
        <CodeBox label="Step 3 — attach the policy to the column">{`ALTER TABLE GOLD.CUSTOMERS
  MODIFY COLUMN email SET MASKING POLICY EMAIL_MASK;`}
        </CodeBox>
        <CodeBox label="Step 4 — grant the unmasking role only where justified">{`USE ROLE SECURITYADMIN;

CREATE ROLE IF NOT EXISTS PII_FULL_ACCESS;
GRANT ROLE PII_FULL_ACCESS TO USER FINANCE_ANALYST_JORDAN;

-- Everyone else queries GOLD.CUSTOMERS through their normal role
-- and simply receives '***MASKED***' for the email column.`}
        </CodeBox>
        <CodeBox label="Step 5 — test with both roles">{`USE ROLE ANALYST_READER;
SELECT customer_id, email FROM GOLD.CUSTOMERS LIMIT 3;
-- email returns '***MASKED***'

USE ROLE PII_FULL_ACCESS;
SELECT customer_id, email FROM GOLD.CUSTOMERS LIMIT 3;
-- email returns the real address`}
        </CodeBox>
        <CodeBox label="Step 6 — audit who has actually seen the real value">{`SELECT
  user_name,
  query_start_time
FROM SNOWFLAKE.ACCOUNT_USAGE.ACCESS_HISTORY
WHERE query_start_time >= DATEADD(day, -90, CURRENT_TIMESTAMP())
  AND EXISTS (
    SELECT 1
    FROM TABLE(FLATTEN(direct_objects_accessed)) f
    WHERE f.value:"objectName"::STRING = 'GOLD_DB.GOLD.CUSTOMERS'
  );`}
        </CodeBox>
        <Para>
          This gives a complete, auditable governance story: the column is tagged PII so it shows up in any
          classification report, the masking policy enforces the visibility rule at query time regardless of
          how the data is queried, only one narrow role can see the real value, and access history provides
          evidence of exactly who queried the table and when — everything an auditor or incident responder
          would ask for.
        </Para>
      </section>

      <Divider />

      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 14 — Hands-on lab" />
        <SectionTitle>Hands-On Lab: Mask a Column and Filter Rows on One Table</SectionTitle>
        <Para>
          This lab combines a masking policy and a row access policy on the same table, then tests both with
          different roles.
        </Para>
        <CodeBox label="Lab setup">{`USE ROLE SYSADMIN;

CREATE DATABASE IF NOT EXISTS GOVERNANCE_LAB;
CREATE SCHEMA IF NOT EXISTS GOVERNANCE_LAB.GOLD;

CREATE OR REPLACE TABLE GOVERNANCE_LAB.GOLD.SALES (
  order_id STRING,
  region STRING,
  customer_email STRING,
  total_usd NUMBER(12,2)
);

INSERT INTO GOVERNANCE_LAB.GOLD.SALES VALUES
  ('O-1', 'EMEA', 'maya@example.com', 200.00),
  ('O-2', 'AMER', 'jordan@example.com', 150.00),
  ('O-3', 'EMEA', 'priya@example.com', 400.00);`}
        </CodeBox>
        <CodeBox label="Lab policies">{`USE ROLE SECURITYADMIN;

CREATE ROLE IF NOT EXISTS LAB_EMEA_REP;
CREATE ROLE IF NOT EXISTS LAB_GLOBAL_ANALYST;
CREATE ROLE IF NOT EXISTS LAB_PII_FULL_ACCESS;

USE ROLE SYSADMIN;

CREATE OR REPLACE MASKING POLICY LAB_EMAIL_MASK AS (val STRING) RETURNS STRING ->
  CASE
    WHEN CURRENT_ROLE() IN ('LAB_PII_FULL_ACCESS') THEN val
    ELSE '***MASKED***'
  END;

CREATE OR REPLACE ROW ACCESS POLICY LAB_REGION_POLICY AS (region STRING) RETURNS BOOLEAN ->
  CURRENT_ROLE() = 'LAB_GLOBAL_ANALYST'
  OR region = 'EMEA' AND CURRENT_ROLE() = 'LAB_EMEA_REP';

ALTER TABLE GOVERNANCE_LAB.GOLD.SALES
  MODIFY COLUMN customer_email SET MASKING POLICY LAB_EMAIL_MASK;

ALTER TABLE GOVERNANCE_LAB.GOLD.SALES
  ADD ROW ACCESS POLICY LAB_REGION_POLICY ON (region);`}
        </CodeBox>
        <SubTitle>Lab questions</SubTitle>
        <BulletList
          items={[
            'What rows and email values does LAB_EMEA_REP see when it queries the table?',
            'What rows and email values does LAB_GLOBAL_ANALYST see?',
            'What would LAB_PII_FULL_ACCESS need in addition to see both all rows and unmasked emails?',
            'How would you tag customer_email as PII so it shows up in a classification report?',
            'What query against ACCESS_HISTORY would show you whether LAB_PII_FULL_ACCESS has actually been used to read this table?',
          ]}
        />
      </section>

      <Divider />

      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 15 — Governance anti-patterns" />
        <SectionTitle>Governance Mistakes That Cause Real Incidents</SectionTitle>
        <Callout title="Avoid these" color="#ef4444">
          <BulletList
            items={[
              'Assuming table SELECT grants alone satisfy privacy requirements.',
              'Masking data in one table but exposing the same value unmasked in another table or a view built on the raw source.',
              'Applying policies without testing the actual BI tool and dbt service roles that will use them.',
              'Creating masking or row access policies with no documented owner or business justification.',
              'Ignoring access history until an audit or incident forces someone to look at it.',
              'Treating classification suggestions as if they were already-applied controls.',
              'Writing row access policy logic that names roles after data values instead of using a maintainable mapping table.',
              'Letting a "global access" bypass role grow beyond the small set of people who genuinely need it.',
            ]}
          />
        </Callout>
        <Para>
          Like RBAC mistakes, these look harmless in a demo and expensive later — usually discovered during an
          audit, a security review, or after a support analyst forwards an unmasked customer email somewhere
          it should not have gone.
        </Para>
      </section>

      <Divider />

      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 16 — Interview answer" />
        <SectionTitle>How to Explain Advanced Snowflake Governance in an Interview</SectionTitle>
        <Para>
          A strong answer sounds like this: RBAC decides whether a role can reach an object at all, but real
          organizations need finer-grained control than a binary SELECT grant. Masking policies are SQL
          expressions attached to a column with `ALTER TABLE ... MODIFY COLUMN ... SET MASKING POLICY` that
          return a real or transformed value based on `CURRENT_ROLE()` at query time, so the same stored value
          can appear masked or unmasked depending on who is asking. Row access policies do the equivalent for
          entire rows, using `CREATE ROW ACCESS POLICY` and a boolean expression, commonly for region or
          tenant isolation. Both are independent of and layer on top of RBAC — they check the same functional
          roles from the account's role hierarchy, so a messy role model makes governance messy too. Tags
          classify columns and objects, for example marking a column as PII, and Snowflake's classification
          feature can suggest likely sensitive columns automatically, but that is a suggestion tool, not
          enforcement — you still apply the tag and the policy yourself. Access history, via the
          `ACCESS_HISTORY` account usage view, tells you who actually read or wrote specific columns, which is
          how you audit usage and verify least-privilege assumptions rather than just permission grants. I
          would always test governance policies with the real target role, not `ACCOUNTADMIN`, and prefer
          exposing a governed view as the consumption front door even though the underlying policy protects
          the base table regardless of query path.
        </Para>
        <SubTitle>Questions you should answer out loud</SubTitle>
        <BulletList
          items={[
            'Why is RBAC alone not enough for a table like GOLD.CUSTOMERS?',
            'What is the syntax to create and apply a masking policy, and what does it check?',
            'How is a row access policy different from a masking policy?',
            'Can a table have both a masking policy and a row access policy at once?',
            'What does Snowflake\'s classification feature actually do, and what does it not do?',
            'What does ACCESS_HISTORY let you audit that SHOW GRANTS cannot?',
            'Why should governance policies key off CURRENT_ROLE() from the same functional role hierarchy as RBAC?',
            'Why must a masking or row access policy be tested with the actual target role, not ACCOUNTADMIN?',
          ]}
        />
      </section>

      <KeyTakeaways
        items={[
          'RBAC decides whether a role can reach an object; masking and row access policies decide what it sees once inside.',
          'A masking policy is a SQL CASE expression attached to a column that returns a real or masked value based on CURRENT_ROLE() at query time.',
          'A row access policy returns a boolean per row, commonly used for region or tenant isolation, and can be combined with masking policies on the same table.',
          'Tags classify objects and columns (e.g., DATA_CLASSIFICATION = \'PII\') and feed governance and cost-attribution reporting.',
          'Snowflake\'s classification feature suggests likely sensitive columns; it does not apply any control by itself.',
          'ACCESS_HISTORY records who actually read or wrote specific columns, letting you audit usage and verify least-privilege assumptions, not just permission grants.',
          'Governance policies reuse the same functional roles as RBAC, so a messy role model makes every policy harder to reason about.',
          'Always test governance policies with the real target role, and prefer a governed view as the consumption front door.',
        ]}
      />
    </LearnLayout>
  )
}
