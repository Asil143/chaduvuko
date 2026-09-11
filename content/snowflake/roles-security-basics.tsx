import { BulletList, Callout, CodeBox, Divider, HighlightBox, KeyTakeaways, LearnLayout, Para, SectionTag, SectionTitle, SubTitle, Table } from './_shared'

export default function RolesSecurityBasics() {
  return (
    <LearnLayout
      title="Roles and Security Basics"
      description="RBAC, users, roles, grants, ownership, future grants, least privilege, service roles, and the access mistakes that break Snowflake projects."
      section="Snowflake — Module 04"
      readTime="60 min"
      updatedAt="September 2026"
      breadcrumbs={[
        { label: 'Learn', href: '/learn' },
        { label: 'Snowflake', href: '/learn/snowflake' },
        { label: 'Roles and Security Basics', href: '/learn/snowflake/roles-security-basics' },
      ]}
      prev={{ title: 'Setup and SQL Basics', href: '/learn/snowflake/setup-and-sql-basics' }}
      next={{ title: 'Loading Data with Stages and COPY INTO', href: '/learn/snowflake/loading-data' }}
    >
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 01 — The plain-English idea" />
        <SectionTitle>Snowflake Security Starts With Roles</SectionTitle>
        <Para>
          Snowflake permissions are role-centered. A person signs in as a user, but the user does not
          normally receive table privileges directly. The user receives roles. Roles receive privileges.
          In a session, the active role determines which databases, schemas, tables, warehouses, views,
          stages, pipes, tasks, and administrative actions are available.
        </Para>
        <Para>
          This matters because Snowflake is rarely used by one person. A real account may have analysts,
          analytics engineers, data engineers, BI tools, dbt jobs, loading services, auditors, managers,
          contractors, and administrators. Each group needs a different amount of power. Role-based access
          control, usually called RBAC, is how Snowflake lets those groups work without turning every user
          into an administrator.
        </Para>
        <HighlightBox>
          <Para>
            <strong>Simple definition:</strong> a Snowflake role is a permission bundle. Give privileges
            to roles, give roles to users or other roles, and keep everyday work away from powerful admin
            roles.
          </Para>
        </HighlightBox>
        <Callout title="Everyday analogy">
          Imagine an office building. Your user is your identity card. A role is the badge level printed on
          it. Some badges open only the lobby. Some badges open the finance floor. A facilities badge can
          unlock maintenance rooms. A master badge can change the lock system itself. Good security is not
          giving everyone the master badge because it is convenient.
        </Callout>
      </section>

      <Divider />

      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 02 — Users, roles, privileges, objects" />
        <SectionTitle>The Four Words You Need Before Any Grant</SectionTitle>
        <Para>
          Snowflake access control becomes much easier when you keep four words separate: users, roles,
          privileges, and objects. A user is an identity. A role is a permission bundle. A privilege is an
          allowed action. An object is the thing being protected.
        </Para>
        <Table
          headers={['Word', 'Meaning', 'Snowflake example', 'Common confusion']}
          rows={[
            ['User', 'A human or service identity that logs in.', 'MAYA, DBT_PROD_USER, FIVETRAN_USER.', 'People grant tables directly to users, then access becomes impossible to manage.'],
            ['Role', 'A named bundle of privileges.', 'ANALYST_READER, RAW_LOADER, DBT_TRANSFORMER.', 'Teams use one giant role for every workload.'],
            ['Privilege', 'A permission to perform an action.', 'USAGE, SELECT, CREATE TABLE, OPERATE, MONITOR.', 'People grant SELECT but forget USAGE on database/schema/warehouse.'],
            ['Object', 'A protected Snowflake resource.', 'Warehouse, database, schema, table, view, stage, task.', 'People think database access automatically means table access.'],
          ]}
        />
        <CodeBox label="A minimal read-only path">{`-- A role cannot query a table with SELECT alone.
-- It also needs a warehouse and the object path above the table.

GRANT USAGE ON WAREHOUSE WH_BI_S TO ROLE ANALYST_READER;
GRANT USAGE ON DATABASE ANALYTICS TO ROLE ANALYST_READER;
GRANT USAGE ON SCHEMA ANALYTICS.GOLD TO ROLE ANALYST_READER;
GRANT SELECT ON TABLE ANALYTICS.GOLD.DAILY_REVENUE TO ROLE ANALYST_READER;

GRANT ROLE ANALYST_READER TO USER MAYA;`}
        </CodeBox>
        <Callout title="Most beginner access bug">
          A user says, "I have SELECT, but the table still does not work." Usually the role is missing
          USAGE on the warehouse, database, or schema. Snowflake checks the path, not just the final table.
        </Callout>
      </section>

      <Divider />

      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 03 — Built-in admin roles" />
        <SectionTitle>Understand the Built-In Roles Before You Create Your Own</SectionTitle>
        <Para>
          Snowflake accounts include powerful built-in roles. You should know what they are, but you should
          not use them casually. A common beginner mistake is running normal work as ACCOUNTADMIN because it
          makes permission errors disappear. That is like disabling every lock in a building because one door
          was hard to open.
        </Para>
        <Table
          headers={['Role', 'Purpose', 'How to use it safely']}
          rows={[
            ['ORGADMIN', 'Organization-level administration across accounts.', 'Use only for organization account management, not normal data work.'],
            ['ACCOUNTADMIN', 'Top account-level administrative role.', 'Reserve for break-glass and high-level account administration.'],
            ['SECURITYADMIN', 'Manage users, roles, and grants.', 'Use for RBAC administration and controlled privilege changes.'],
            ['SYSADMIN', 'Create and manage account objects such as warehouses and databases.', 'Often used as the parent for functional object-owning roles.'],
            ['USERADMIN', 'Manage users and roles.', 'Useful for identity administration under controlled processes.'],
            ['PUBLIC', 'Automatically granted to every user.', 'Do not put sensitive or broad production privileges here.'],
          ]}
        />
        <HighlightBox>
          <Para>
            <strong>Production habit:</strong> use admin roles to administer, then switch back to a
            workload role for real work. The role that creates dashboards, runs dbt, loads files, or queries
            finance data should not be ACCOUNTADMIN.
          </Para>
        </HighlightBox>
      </section>

      <Divider />

      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 04 — Role hierarchy" />
        <SectionTitle>Role Hierarchy Lets Roles Inherit Other Roles</SectionTitle>
        <Para>
          Snowflake roles can be granted to other roles. This creates inheritance. If ROLE_A is granted to
          ROLE_B, then ROLE_B inherits ROLE_A's privileges. This is useful when you want a senior role to
          include several smaller roles, but it can become confusing when the hierarchy is not documented.
        </Para>
        <CodeBox label="Role hierarchy example">{`USE ROLE SECURITYADMIN;

CREATE ROLE RAW_ORDER_READER;
CREATE ROLE RAW_CUSTOMER_READER;
CREATE ROLE ANALYTICS_ENGINEER;

GRANT SELECT ON ALL TABLES IN SCHEMA RAW.ORDERS TO ROLE RAW_ORDER_READER;
GRANT SELECT ON ALL TABLES IN SCHEMA RAW.CUSTOMERS TO ROLE RAW_CUSTOMER_READER;

-- ANALYTICS_ENGINEER inherits both smaller roles.
GRANT ROLE RAW_ORDER_READER TO ROLE ANALYTICS_ENGINEER;
GRANT ROLE RAW_CUSTOMER_READER TO ROLE ANALYTICS_ENGINEER;

GRANT ROLE ANALYTICS_ENGINEER TO USER JORDAN;`}
        </CodeBox>
        <Table
          headers={['Design style', 'What it means', 'When it helps', 'Risk']}
          rows={[
            ['Flat roles', 'Each role gets privileges directly.', 'Small accounts and simple access models.', 'Duplication grows quickly.'],
            ['Functional roles', 'Roles represent a job function or workload.', 'Most production teams: loader, transformer, analyst, BI reader.', 'Needs naming discipline.'],
            ['Inherited roles', 'Higher roles include smaller roles.', 'Senior or composite access patterns.', 'Hard to reason about if nested too deeply.'],
            ['Object-owner roles', 'Specific roles own databases/schemas/tables.', 'Clear lifecycle and grant management.', 'Ownership transfer must be controlled.'],
          ]}
        />
      </section>

      <Divider />

      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 05 — Designing real roles" />
        <SectionTitle>A Practical Role Model for a Snowflake Analytics Platform</SectionTitle>
        <Para>
          Good role design follows how the data platform actually works. Loading jobs need stage and table
          write access. Transformation jobs need read access to Raw and write access to Silver and Gold.
          Analysts usually need read access to curated Gold data. BI tools need stable read access, often
          through views. Administrators need management privileges, but not for every query.
        </Para>
        <Table
          headers={['Role', 'Job', 'Typical privileges', 'What it should not do']}
          rows={[
            ['RAW_LOADER', 'Loads source files or CDC output into Raw.', 'USAGE on load warehouse, stage access, INSERT/COPY into Raw tables.', 'Read every curated mart or administer users.'],
            ['DBT_TRANSFORMER', 'Builds Silver and Gold models.', 'Read Raw/Silver, create tables/views in transform schemas, use transform warehouse.', 'Use ACCOUNTADMIN or grant itself more privileges.'],
            ['ANALYST_READER', 'Queries approved business data.', 'USAGE on BI warehouse, SELECT on Gold tables/views.', 'Write production tables or read raw sensitive data by default.'],
            ['BI_READER', 'Runs dashboards and scheduled extracts.', 'SELECT on stable marts and views.', 'Explore raw schemas or own objects.'],
            ['DATA_STEWARD', 'Reviews quality, definitions, and access requests.', 'Read metadata, docs, selected data, maybe manage tags.', 'Become an all-powerful hidden admin role.'],
            ['SECURITY_OPERATOR', 'Handles grants and access reviews.', 'Grant management through SECURITYADMIN patterns.', 'Run pipelines or dashboards with admin role.'],
          ]}
        />
        <CodeBox label="Create workload-specific roles">{`USE ROLE SECURITYADMIN;

CREATE ROLE RAW_LOADER;
CREATE ROLE DBT_TRANSFORMER;
CREATE ROLE ANALYST_READER;
CREATE ROLE BI_READER;

-- Warehouse usage is separate from data access.
GRANT USAGE ON WAREHOUSE WH_LOAD_XS TO ROLE RAW_LOADER;
GRANT USAGE ON WAREHOUSE WH_TRANSFORM_M TO ROLE DBT_TRANSFORMER;
GRANT USAGE ON WAREHOUSE WH_BI_S TO ROLE ANALYST_READER;
GRANT USAGE ON WAREHOUSE WH_BI_S TO ROLE BI_READER;

-- Let the loader work only in Raw.
GRANT USAGE ON DATABASE RETAIL_ANALYTICS TO ROLE RAW_LOADER;
GRANT USAGE ON SCHEMA RETAIL_ANALYTICS.RAW TO ROLE RAW_LOADER;
GRANT INSERT ON ALL TABLES IN SCHEMA RETAIL_ANALYTICS.RAW TO ROLE RAW_LOADER;

-- Let dbt read Raw and manage modeled layers.
GRANT USAGE ON DATABASE RETAIL_ANALYTICS TO ROLE DBT_TRANSFORMER;
GRANT USAGE ON SCHEMA RETAIL_ANALYTICS.RAW TO ROLE DBT_TRANSFORMER;
GRANT SELECT ON ALL TABLES IN SCHEMA RETAIL_ANALYTICS.RAW TO ROLE DBT_TRANSFORMER;
GRANT USAGE, CREATE TABLE, CREATE VIEW ON SCHEMA RETAIL_ANALYTICS.SILVER TO ROLE DBT_TRANSFORMER;
GRANT USAGE, CREATE TABLE, CREATE VIEW ON SCHEMA RETAIL_ANALYTICS.GOLD TO ROLE DBT_TRANSFORMER;

-- Let readers consume only curated outputs.
GRANT USAGE ON DATABASE RETAIL_ANALYTICS TO ROLE ANALYST_READER;
GRANT USAGE ON SCHEMA RETAIL_ANALYTICS.GOLD TO ROLE ANALYST_READER;
GRANT SELECT ON ALL TABLES IN SCHEMA RETAIL_ANALYTICS.GOLD TO ROLE ANALYST_READER;`}
        </CodeBox>
      </section>

      <Divider />

      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 06 — Ownership" />
        <SectionTitle>OWNERSHIP Is Different From Normal Access</SectionTitle>
        <Para>
          OWNERSHIP is the most important object privilege to understand. The owning role controls the object.
          It can manage the object and usually grant privileges on it. A role can have SELECT on a table
          without owning it. A role can use a warehouse without owning it. Ownership decides who controls
          lifecycle and permission delegation.
        </Para>
        <Callout title="Why ownership matters" color="#ef4444">
          If random human users own production tables, production becomes fragile. When people leave, change
          teams, or lose access, ownership and grant behavior can become messy. Production objects should be
          owned by stable functional roles, not personal convenience roles.
        </Callout>
        <Table
          headers={['Object', 'Better owner', 'Weak owner', 'Reason']}
          rows={[
            ['RAW schema', 'RAW_OWNER or PLATFORM_OWNER.', 'A person who first created it.', 'Loading and grants should survive team changes.'],
            ['dbt production models', 'DBT_TRANSFORMER or DBT_PROD_OWNER.', 'An analyst experimenting in prod.', 'Transformation lifecycle should be controlled by deployment role.'],
            ['BI marts', 'MART_OWNER or ANALYTICS_ENGINEERING_OWNER.', 'Dashboard service account by accident.', 'Business metrics need clear stewardship.'],
            ['Security policies', 'SECURITYADMIN-governed role.', 'General analyst role.', 'Policy changes are sensitive and should be reviewed.'],
          ]}
        />
        <CodeBox label="Inspect ownership and grants">{`SHOW GRANTS ON TABLE RETAIL_ANALYTICS.GOLD.DAILY_REVENUE;
SHOW GRANTS TO ROLE ANALYST_READER;
SHOW GRANTS OF ROLE ANALYST_READER;

-- Ownership transfer should be deliberate.
GRANT OWNERSHIP ON TABLE RETAIL_ANALYTICS.GOLD.DAILY_REVENUE
  TO ROLE MART_OWNER
  COPY CURRENT GRANTS;`}
        </CodeBox>
      </section>

      <Divider />

      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 07 — Future grants" />
        <SectionTitle>Future Grants Prevent New Tables From Breaking Access</SectionTitle>
        <Para>
          If an analyst role has SELECT on all current tables in a schema, that does not automatically mean
          it can read new tables created tomorrow. Future grants solve this. They say, "when new tables are
          created in this schema, grant this privilege to this role." This is essential for stable curated
          schemas where new Gold tables should be readable by BI or analysts.
        </Para>
        <CodeBox label="Future grants for stable access">{`GRANT SELECT ON ALL TABLES IN SCHEMA RETAIL_ANALYTICS.GOLD
  TO ROLE ANALYST_READER;

GRANT SELECT ON FUTURE TABLES IN SCHEMA RETAIL_ANALYTICS.GOLD
  TO ROLE ANALYST_READER;

GRANT SELECT ON ALL VIEWS IN SCHEMA RETAIL_ANALYTICS.GOLD
  TO ROLE ANALYST_READER;

GRANT SELECT ON FUTURE VIEWS IN SCHEMA RETAIL_ANALYTICS.GOLD
  TO ROLE ANALYST_READER;`}
        </CodeBox>
        <Table
          headers={['Grant type', 'Applies to', 'Why you need it']}
          rows={[
            ['ALL TABLES', 'Objects that exist now.', 'Backfills current access.'],
            ['FUTURE TABLES', 'Tables created later.', 'Prevents new production models from being invisible.'],
            ['ALL VIEWS', 'Views that exist now.', 'Useful when BI reads governed views.'],
            ['FUTURE VIEWS', 'Views created later.', 'Keeps dbt/model deployments from requiring manual grants every time.'],
          ]}
        />
        <Callout title="Important detail">
          Future grants are scoped. A future grant on one schema does not automatically apply to every
          schema in every database. Be explicit, and test access with the intended role after deployment.
        </Callout>
      </section>

      <Divider />

      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 08 — Least privilege" />
        <SectionTitle>Least Privilege Means Enough Access, Not Maximum Access</SectionTitle>
        <Para>
          Least privilege is often misunderstood as "make access painful." That is not the goal. The goal is
          to give each person or service enough access to do the job safely, and no more. Analysts should not
          need admin roles to read dashboards. A loading service should not need access to payroll data. A
          BI tool should not own production schemas.
        </Para>
        <Table
          headers={['Need', 'Good grant', 'Dangerous shortcut']}
          rows={[
            ['Analyst reads revenue dashboard.', 'SELECT on curated Gold revenue views plus warehouse USAGE.', 'ACCOUNTADMIN because SELECT failed once.'],
            ['dbt builds models.', 'Create/manage objects in modeled schemas through deployment role.', 'SECURITYADMIN for every dbt run.'],
            ['Loader writes raw files.', 'INSERT/COPY into Raw tables and stage access.', 'SELECT on every database.'],
            ['Auditor checks access.', 'MONITOR/metadata views and selected read access.', 'Full ownership of production data.'],
          ]}
        />
        <BulletList
          items={[
            'Create roles by workload, not by random individual requests.',
            'Grant warehouse usage separately so compute access is visible.',
            'Prefer curated views for broad access to sensitive business data.',
            'Review powerful roles and service accounts regularly.',
            'Write down why a role exists and who owns approving changes to it.',
          ]}
        />
      </section>

      <Divider />

      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 09 — Service accounts" />
        <SectionTitle>Service Users Need Even Tighter Design Than Human Users</SectionTitle>
        <Para>
          A service user is an identity used by a tool or application: dbt, Fivetran, Airflow, Dagster,
          a BI platform, a reverse ETL tool, or a custom loading job. Service users are dangerous when they
          quietly accumulate broad privileges. They often run unattended, store credentials in external
          systems, and perform many operations every day.
        </Para>
        <CodeBox label="Service-role pattern">{`USE ROLE SECURITYADMIN;

CREATE USER DBT_PROD_USER
  TYPE = SERVICE
  DEFAULT_ROLE = DBT_TRANSFORMER
  DEFAULT_WAREHOUSE = WH_TRANSFORM_M;

GRANT ROLE DBT_TRANSFORMER TO USER DBT_PROD_USER;

-- Avoid granting ACCOUNTADMIN, SECURITYADMIN, or broad human roles
-- to service users unless there is a carefully reviewed reason.`}
        </CodeBox>
        <Table
          headers={['Service', 'Recommended role shape', 'Risk to avoid']}
          rows={[
            ['dbt production', 'Read Raw/Silver, create/update modeled schemas, use transform warehouse.', 'Running transformations as ACCOUNTADMIN.'],
            ['Ingestion tool', 'Write only landing/raw schemas, use load warehouse, stage permissions.', 'Read/write access to every curated mart.'],
            ['BI tool', 'Read curated Gold views, use BI warehouse.', 'Owning tables or querying sensitive raw data.'],
            ['Orchestrator', 'Operate tasks or call stored procedures as needed.', 'Full data access just to trigger jobs.'],
          ]}
        />
      </section>

      <Divider />

      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 10 — Debugging access errors" />
        <SectionTitle>How to Debug Snowflake Permission Problems</SectionTitle>
        <Para>
          Permission errors are common and usually solvable if you move step by step. Do not randomly grant
          bigger roles. First identify the active role, the object path, and the exact missing privilege.
        </Para>
        <CodeBox label="Access debugging checklist">{`SELECT CURRENT_USER(), CURRENT_ROLE(), CURRENT_WAREHOUSE();
SELECT CURRENT_DATABASE(), CURRENT_SCHEMA();

SHOW GRANTS TO USER MAYA;
SHOW GRANTS TO ROLE ANALYST_READER;
SHOW GRANTS ON DATABASE RETAIL_ANALYTICS;
SHOW GRANTS ON SCHEMA RETAIL_ANALYTICS.GOLD;
SHOW GRANTS ON TABLE RETAIL_ANALYTICS.GOLD.DAILY_REVENUE;

-- Test with the exact role the user or service uses.
USE ROLE ANALYST_READER;
USE WAREHOUSE WH_BI_S;
SELECT COUNT(*) FROM RETAIL_ANALYTICS.GOLD.DAILY_REVENUE;`}
        </CodeBox>
        <Table
          headers={['Symptom', 'Likely cause', 'Check']}
          rows={[
            ['Cannot see database.', 'Missing USAGE on database.', 'SHOW GRANTS ON DATABASE.'],
            ['Can see database but not schema.', 'Missing USAGE on schema.', 'SHOW GRANTS ON SCHEMA.'],
            ['Can see table but query fails.', 'Missing SELECT or warehouse USAGE.', 'SHOW GRANTS TO ROLE and CURRENT_WAREHOUSE.'],
            ['dbt model creates table but analysts cannot read it.', 'Missing future grants on modeled schema.', 'SHOW FUTURE GRANTS IN SCHEMA.'],
            ['User has role but still cannot query.', 'Wrong active role in session.', 'CURRENT_ROLE and USE ROLE.'],
          ]}
        />
      </section>

      <Divider />

      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 11 — Grant syntax deep dive" />
        <SectionTitle>The Grant Commands You Will Actually Use</SectionTitle>
        <Para>
          Snowflake security feels confusing until you know the repeatable grant patterns. Almost every
          beginner mistake comes from mixing these up: granting a role to a user, granting a role to another
          role, granting object privileges to a role, granting future object privileges, and transferring
          ownership. These are different operations. They solve different problems.
        </Para>
        <CodeBox label="Five grant patterns">{`-- 1. Give a role to a user.
GRANT ROLE ANALYST_READER TO USER MAYA;

-- 2. Give one role to another role, creating inheritance.
GRANT ROLE GOLD_READER TO ROLE SENIOR_ANALYST;

-- 3. Give an object privilege to a role.
GRANT SELECT ON TABLE ANALYTICS.GOLD.DAILY_REVENUE TO ROLE GOLD_READER;

-- 4. Give access to objects that will be created later.
GRANT SELECT ON FUTURE TABLES IN SCHEMA ANALYTICS.GOLD TO ROLE GOLD_READER;

-- 5. Transfer object control to another owner role.
GRANT OWNERSHIP ON SCHEMA ANALYTICS.GOLD
  TO ROLE MART_OWNER
  COPY CURRENT GRANTS;`}
        </CodeBox>
        <Table
          headers={['Command shape', 'Question it answers', 'Danger if misused']}
          rows={[
            ['GRANT ROLE x TO USER y', 'Which permission bundle can this identity activate?', 'Directly giving users too many broad roles.'],
            ['GRANT ROLE x TO ROLE y', 'Which smaller role should this bigger role inherit?', 'Deep hierarchy that nobody can reason about.'],
            ['GRANT SELECT ON TABLE x TO ROLE y', 'Can this role read this exact table?', 'Forgetting database/schema/warehouse USAGE.'],
            ['GRANT SELECT ON FUTURE TABLES...', 'Should new tables automatically be readable?', 'Granting future access in Raw when only Gold should be broad.'],
            ['GRANT OWNERSHIP...', 'Who controls the object now?', 'Breaking grants or handing control to the wrong role.'],
          ]}
        />
        <Callout title="Production rule">
          Before granting anything, write the sentence in English: "I am allowing this role to perform this
          action on this object because this workload needs it." If you cannot write that sentence clearly,
          the grant probably needs more thought.
        </Callout>
      </section>

      <Divider />

      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 12 — Database/schema/table access path" />
        <SectionTitle>Why SELECT Alone Is Not Enough</SectionTitle>
        <Para>
          In Snowflake, a table sits inside a schema, which sits inside a database. A query also needs a
          warehouse to execute. That means read access is a chain. If any link is missing, the user may see
          errors that sound unrelated to the real problem.
        </Para>
        <CodeBox label="Access path mental model">{`To run this query:

SELECT *
FROM RETAIL_ANALYTICS.GOLD.DAILY_REVENUE;

The active role needs:

1. USAGE on a warehouse
2. USAGE on database RETAIL_ANALYTICS
3. USAGE on schema RETAIL_ANALYTICS.GOLD
4. SELECT on table RETAIL_ANALYTICS.GOLD.DAILY_REVENUE`}
        </CodeBox>
        <Table
          headers={['Missing privilege', 'What the learner sees', 'Fix']}
          rows={[
            ['Warehouse USAGE', 'Cannot use warehouse or no active warehouse.', 'Grant USAGE on warehouse or switch to an allowed warehouse.'],
            ['Database USAGE', 'Database does not exist or not authorized.', 'Grant USAGE on database.'],
            ['Schema USAGE', 'Schema does not exist or not authorized.', 'Grant USAGE on schema.'],
            ['Table SELECT', 'Table does not exist or not authorized.', 'Grant SELECT on table/view, or expose approved view.'],
            ['Wrong active role', 'Privileges exist but query still fails.', 'USE ROLE the role that has the grants.'],
          ]}
        />
        <Para>
          This is also why access testing must use the exact target role. Testing as ACCOUNTADMIN proves
          almost nothing about whether an analyst, dbt service user, or BI dashboard can run the query.
        </Para>
      </section>

      <Divider />

      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 13 — Environment separation" />
        <SectionTitle>Separate Dev, Test, and Prod Access</SectionTitle>
        <Para>
          A serious Snowflake account should not treat development and production the same way. In
          development, engineers may create scratch tables, test new models, clone datasets, and inspect
          raw records. In production, access should be tighter, deployments should use service roles, and
          sensitive data should be masked or restricted.
        </Para>
        <Table
          headers={['Environment', 'Typical access', 'What to prevent']}
          rows={[
            ['DEV', 'Personal schemas, limited sample data, experimentation warehouses.', 'Developers accidentally using production admin roles.'],
            ['QA / STAGING', 'Production-like structure, controlled test runs, cloned data when allowed.', 'Sensitive clones exposed to everyone.'],
            ['PROD', 'Deployment roles, reader roles, audited service users.', 'Manual table edits, broad ownership, dashboard writes.'],
          ]}
        />
        <CodeBox label="Environment role naming pattern">{`Roles:
  DEV_ANALYST
  DEV_DBT_TRANSFORMER
  QA_DBT_TRANSFORMER
  PROD_DBT_TRANSFORMER
  PROD_BI_READER
  PROD_FINANCE_READER

Warehouses:
  WH_DEV_XS
  WH_QA_S
  WH_PROD_TRANSFORM_M
  WH_PROD_BI_S

Schemas:
  DEV_MAYA.SCRATCH
  RETAIL_QA.SILVER
  RETAIL_PROD.GOLD`}
        </CodeBox>
        <Callout title="Why this matters">
          Environment separation prevents learning experiments from turning into production incidents. It
          also lets you test grants, masking policies, dbt models, and pipeline changes before real users
          depend on them.
        </Callout>
      </section>

      <Divider />

      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 14 — Access request workflow" />
        <SectionTitle>How Access Should Be Requested and Approved</SectionTitle>
        <Para>
          In small projects, someone sends a chat message asking for access and an admin grants it. That
          works for a demo. It does not work for a real data platform. Production access needs enough process
          that people can explain who approved it, why it was needed, when it should expire, and what data
          classification was involved.
        </Para>
        <Table
          headers={['Request field', 'Example', 'Why it matters']}
          rows={[
            ['Requester', 'maya@company.com', 'Identifies who needs the access.'],
            ['Business reason', 'Build finance churn analysis for Q3 planning.', 'Prevents vague permanent access.'],
            ['Role requested', 'PROD_FINANCE_READER', 'Uses approved bundles instead of custom one-off grants.'],
            ['Data sensitivity', 'Customer revenue, no raw PII.', 'Determines approval and masking requirements.'],
            ['Duration', '90 days or permanent role membership.', 'Supports cleanup and least privilege.'],
            ['Approver', 'Finance data owner and security reviewer.', 'Creates accountability.'],
          ]}
        />
        <CodeBox label="Access review query examples">{`-- Who has a sensitive role?
SHOW GRANTS OF ROLE PROD_FINANCE_READER;

-- What can this role do?
SHOW GRANTS TO ROLE PROD_FINANCE_READER;

-- Who has queried a sensitive object recently?
SELECT user_name, query_start_time, direct_objects_accessed
FROM SNOWFLAKE.ACCOUNT_USAGE.ACCESS_HISTORY
WHERE query_start_time >= DATEADD(day, -30, CURRENT_TIMESTAMP());`}
        </CodeBox>
      </section>

      <Divider />

      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 15 — Auditing and evidence" />
        <SectionTitle>Security Is Not Real Until You Can Audit It</SectionTitle>
        <Para>
          A team can say it follows least privilege, but auditors and incident responders need evidence.
          Snowflake gives metadata views and SHOW commands that help answer who had access, what privileges
          existed, what queries ran, and which objects were touched. The exact views available and latency
          can depend on edition and account settings, but the habit is the same: use platform metadata as
          evidence.
        </Para>
        <Table
          headers={['Question', 'Snowflake evidence', 'What to look for']}
          rows={[
            ['Who has this role?', 'SHOW GRANTS OF ROLE.', 'Unexpected users or inherited roles.'],
            ['What can this role access?', 'SHOW GRANTS TO ROLE.', 'Broad Raw access, ownership, admin privileges.'],
            ['Who queried this data?', 'ACCESS_HISTORY / QUERY_HISTORY.', 'Sensitive object usage, unusual users, exports.'],
            ['Which warehouses cost money?', 'WAREHOUSE_METERING_HISTORY.', 'Service roles using wrong warehouse.'],
            ['Which tasks or loads failed?', 'TASK_HISTORY / COPY_HISTORY.', 'Broken pipelines affecting freshness.'],
          ]}
        />
        <CodeBox label="Monthly access review checklist">{`1. Export users assigned to privileged roles.
2. Export grants for production reader, loader, transformer, and admin roles.
3. Check for direct grants to users.
4. Check PUBLIC grants.
5. Check service accounts with admin roles.
6. Review access to raw schemas containing sensitive payloads.
7. Remove or expire access that no longer has a business owner.`}
        </CodeBox>
      </section>

      <Divider />

      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 16 — Hands-on lab" />
        <SectionTitle>Hands-On Lab: Build and Test a Least-Privilege Access Model</SectionTitle>
        <Para>
          This lab is the difference between reading RBAC and actually understanding it. Build a tiny
          warehouse with Raw and Gold schemas, create three roles, and test each role from the perspective
          of the user or service that will use it.
        </Para>
        <CodeBox label="Lab setup">{`USE ROLE SYSADMIN;

CREATE DATABASE IF NOT EXISTS RBAC_LAB;
CREATE SCHEMA IF NOT EXISTS RBAC_LAB.RAW;
CREATE SCHEMA IF NOT EXISTS RBAC_LAB.GOLD;

CREATE OR REPLACE WAREHOUSE WH_RBAC_LAB
  WAREHOUSE_SIZE = XSMALL
  AUTO_SUSPEND = 60
  AUTO_RESUME = TRUE
  INITIALLY_SUSPENDED = TRUE;

CREATE OR REPLACE TABLE RBAC_LAB.RAW.ORDERS_RAW (
  order_id STRING,
  customer_email STRING,
  total_usd NUMBER(12,2)
);

CREATE OR REPLACE VIEW RBAC_LAB.GOLD.ORDERS_PUBLIC AS
SELECT order_id, total_usd
FROM RBAC_LAB.RAW.ORDERS_RAW;`}
        </CodeBox>
        <CodeBox label="Lab grants">{`USE ROLE SECURITYADMIN;

CREATE ROLE RBAC_RAW_LOADER;
CREATE ROLE RBAC_GOLD_READER;
CREATE ROLE RBAC_SUPPORT_READER;

GRANT USAGE ON WAREHOUSE WH_RBAC_LAB TO ROLE RBAC_RAW_LOADER;
GRANT USAGE ON WAREHOUSE WH_RBAC_LAB TO ROLE RBAC_GOLD_READER;
GRANT USAGE ON WAREHOUSE WH_RBAC_LAB TO ROLE RBAC_SUPPORT_READER;

GRANT USAGE ON DATABASE RBAC_LAB TO ROLE RBAC_RAW_LOADER;
GRANT USAGE ON DATABASE RBAC_LAB TO ROLE RBAC_GOLD_READER;
GRANT USAGE ON DATABASE RBAC_LAB TO ROLE RBAC_SUPPORT_READER;

GRANT USAGE ON SCHEMA RBAC_LAB.RAW TO ROLE RBAC_RAW_LOADER;
GRANT INSERT ON TABLE RBAC_LAB.RAW.ORDERS_RAW TO ROLE RBAC_RAW_LOADER;

GRANT USAGE ON SCHEMA RBAC_LAB.GOLD TO ROLE RBAC_GOLD_READER;
GRANT SELECT ON VIEW RBAC_LAB.GOLD.ORDERS_PUBLIC TO ROLE RBAC_GOLD_READER;

-- SUPPORT_READER intentionally has no access yet.
-- Test that it fails, then grant only the approved view if needed.`}
        </CodeBox>
        <SubTitle>Lab questions</SubTitle>
        <BulletList
          items={[
            'Can RBAC_GOLD_READER query RBAC_LAB.GOLD.ORDERS_PUBLIC?',
            'Can RBAC_GOLD_READER query RBAC_LAB.RAW.ORDERS_RAW directly?',
            'Can RBAC_RAW_LOADER read customer_email after inserting rows?',
            'What exact grant is missing when SUPPORT_READER tries to query the Gold view?',
            'How would you add a masked support view without exposing raw customer_email?',
          ]}
        />
      </section>

      <Divider />

      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 17 — Dangerous shortcuts" />
        <SectionTitle>The Access Mistakes That Hurt Teams Later</SectionTitle>
        <Callout title="Avoid these" color="#ef4444">
          <BulletList
            items={[
              'Using ACCOUNTADMIN for normal analytics, dbt, loading, notebooks, or dashboard work.',
              'Granting privileges directly to users instead of roles.',
              'Putting sensitive privileges on PUBLIC.',
              'Letting personal roles own production tables and schemas.',
              'Giving BI tools write access because setup was rushed.',
              'Granting SELECT on raw PII tables when a masked or curated view would work.',
              'Forgetting future grants, causing every new model deployment to break downstream readers.',
              'Never reviewing service-account privileges after the first implementation.',
            ]}
          />
        </Callout>
        <Para>
          These mistakes often look harmless early because they make the first demo easier. The damage
          appears later: audits become painful, sensitive data is exposed, production objects have unclear
          owners, and every access request turns into detective work.
        </Para>
      </section>

      <Divider />

      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 18 — A complete mini-design" />
        <SectionTitle>Design RBAC for an Orders Analytics Warehouse</SectionTitle>
        <Para>
          Suppose a company has raw order files, customer records, dbt transformations, executive revenue
          dashboards, and support analysts. The access model should follow the work.
        </Para>
        <CodeBox label="Orders analytics RBAC design">{`Roles:
  RAW_LOADER
    - Uses WH_LOAD_XS
    - Writes RETAIL_ANALYTICS.RAW
    - Reads internal/external stage metadata needed for loads

  DBT_TRANSFORMER
    - Uses WH_TRANSFORM_M
    - Reads RETAIL_ANALYTICS.RAW
    - Owns/creates RETAIL_ANALYTICS.SILVER and RETAIL_ANALYTICS.GOLD models

  FINANCE_READER
    - Uses WH_BI_S
    - Reads finance-approved Gold marts
    - Does not read raw payment payloads

  SUPPORT_READER
    - Uses WH_BI_S
    - Reads support views with masked customer email/phone
    - Sees only fields needed for ticket resolution

  BI_READER
    - Uses WH_BI_S
    - Reads published Gold views only
    - No write access

  SECURITY_OPERATOR
    - Manages role grants through approved process
    - Reviews access history and privileged roles`}
        </CodeBox>
        <SubTitle>Why this is better than one giant role</SubTitle>
        <BulletList
          items={[
            'A loader cannot accidentally read executive finance marts.',
            'A BI tool cannot accidentally overwrite production tables.',
            'Finance and support can see different versions of customer data.',
            'dbt has enough power to build models without becoming account administrator.',
            'Access reviews can ask, "Does this role still need this job?" instead of reviewing every user-table pair manually.',
          ]}
        />
      </section>

      <Divider />

      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 19 — Where basic RBAC ends" />
        <SectionTitle>RBAC Is the Foundation, Not the Whole Security Story</SectionTitle>
        <Para>
          Basic roles and grants control object access. Production Snowflake security often needs more:
          masking policies, row access policies, tags, classification, network policies, SSO, SCIM, MFA,
          key-pair authentication for services, access history, and governance processes. Those advanced
          topics sit on top of RBAC. If the role model is messy, advanced governance becomes messy too.
        </Para>
        <Table
          headers={['Need', 'Snowflake feature', 'Example']}
          rows={[
            ['Hide sensitive columns.', 'Masking policy.', 'Show full email to PII_FULL_ACCESS, masked email to support.'],
            ['Limit visible rows.', 'Row access policy.', 'Regional manager sees only their region.'],
            ['Classify data.', 'Tags and classification.', 'Mark columns as PII, PCI, internal, public.'],
            ['Audit usage.', 'ACCESS_HISTORY and query history.', 'Find who queried customer data.'],
            ['Control login posture.', 'SSO, MFA, network policies.', 'Require corporate identity and trusted networks.'],
          ]}
        />
      </section>

      <Divider />

      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 20 — Interview answer" />
        <SectionTitle>How to Explain Snowflake RBAC in an Interview</SectionTitle>
        <Para>
          A strong answer sounds like this: Snowflake uses role-based access control. Users receive roles,
          roles receive privileges on objects, and the active role controls what a session can do. To query
          a table, a role needs USAGE on the warehouse, database, and schema, plus SELECT on the table or
          view. Production designs avoid direct user grants, avoid ACCOUNTADMIN for normal work, use
          functional roles for loaders, transformers, analysts, and BI tools, and use future grants so new
          objects do not break access. For sensitive data, RBAC should be combined with masking policies,
          row access policies, auditing, and regular access reviews.
        </Para>
        <SubTitle>Practice questions</SubTitle>
        <BulletList
          items={[
            'Why can a user have SELECT on a table but still fail to query it?',
            'What is the difference between a user and a role?',
            'Why is ACCOUNTADMIN dangerous for normal workloads?',
            'How would you design roles for dbt, BI, and a file loader?',
            'What are future grants and why do they matter?',
            'When would RBAC not be enough by itself?',
          ]}
        />
      </section>

      <KeyTakeaways
        items={[
          'Snowflake security starts with users, roles, privileges, and objects.',
          'To query a table, a role needs warehouse USAGE, database USAGE, schema USAGE, and table/view SELECT.',
          'Built-in admin roles should administer; they should not run everyday workloads.',
          'Production objects should be owned by stable functional roles, not random personal roles.',
          'Future grants keep new tables and views from breaking downstream access.',
          'Service users need narrow workload-specific roles.',
          'RBAC is the foundation for advanced governance features such as masking and row access policies.',
        ]}
      />
    </LearnLayout>
  )
}
