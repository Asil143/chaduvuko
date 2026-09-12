import { BulletList, Callout, CodeBox, Divider, HighlightBox, KeyTakeaways, LearnLayout, Para, SectionTag, SectionTitle, SubTitle, Table } from './_shared'

export default function DataSharingMarketplace() {
  return (
    <LearnLayout
      title="Data Sharing and Marketplace"
      description="Secure Data Sharing, shares, reader accounts, the Snowflake Marketplace, data clean rooms, governance over shared objects, and a worked provider/consumer walkthrough."
      section="Snowflake — Module 16"
      readTime="65 min"
      updatedAt="September 2026"
      breadcrumbs={[
        { label: 'Learn', href: '/learn' },
        { label: 'Snowflake', href: '/learn/snowflake' },
        { label: 'Data Sharing and Marketplace', href: '/learn/snowflake/data-sharing-marketplace' },
      ]}
      prev={{ title: 'Advanced Security and Governance', href: '/learn/snowflake/advanced-security-governance' }}
      next={{ title: 'Snowflake with dbt', href: '/learn/snowflake/snowflake-with-dbt' }}
    >
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 01 — The plain-English idea" />
        <SectionTitle>Sharing Data Without Copying It Anywhere</SectionTitle>
        <Para>
          Most data exchange between organizations still happens through files: a nightly export, a CSV
          attached to an email, an S3 bucket a partner polls. Every one of those copies is stale the moment
          it is written, and every one of them multiplies the number of places sensitive data lives. Snowflake's
          Secure Data Sharing removes the copy step entirely. A provider account grants another Snowflake
          account read access to specific database objects. The consumer account then queries those objects
          directly, as if they were local tables, but no bytes of data ever move between accounts.
        </Para>
        <Para>
          This works because Snowflake separates storage from compute at the platform level. Sharing is
          implemented as a pointer to the provider's storage metadata plus a grant that lets the consumer's
          compute read it. The consumer runs their own warehouse against the provider's data. The provider's
          storage never gets duplicated, and because there is no copy, the consumer always sees current data
          the instant the provider updates it — there is no batch job to wait on and no sync to break.
        </Para>
        <HighlightBox>
          <Para>
            <strong>Plain-English definition:</strong> a Snowflake share is a live, read-only window into
            specific objects in your account, opened for another account. The other account queries through
            the window; they never receive their own copy of what's behind it.
          </Para>
        </HighlightBox>
        <CodeBox label="Mental model">{`Traditional file exchange              Snowflake Secure Data Sharing
------------------------              ------------------------------
Provider exports a file        vs      Provider grants access to an object
File is copied to consumer             No copy is made, ever
Consumer's copy goes stale             Consumer always sees live data
N consumers = N stale copies           N consumers = 1 source, N grants
Compute cost: provider's ETL           Compute cost: consumer's own warehouse`}
        </CodeBox>
        <Callout title="Why this is Snowflake's headline differentiator">
          Most warehouses can export data. Very few can let another organization query your live data with
          their own compute, under your governance, with zero duplication. That combination — live, governed,
          uncopied — is what people mean when they say Snowflake sharing is a genuine product differentiator,
          not just a feature.
        </Callout>
      </section>

      <Divider />

      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 02 — Why sharing beats ETL for external data exchange" />
        <SectionTitle>The Old Way Creates Copies; the New Way Creates Grants</SectionTitle>
        <Para>
          Before evaluating syntax, it helps to be explicit about what problem sharing solves and where it
          does not apply. Sharing is for distributing data between accounts — provider to partner, provider to
          customer, provider to another business unit that runs its own Snowflake account. It is not a
          replacement for your internal ELT pipeline; you still build Bronze/Silver/Gold layers inside your own
          account exactly as covered in the medallion architecture module. Sharing is what happens at the edge
          of that pipeline, when a Gold-layer object needs to leave your account's walls without leaving your
          account's storage.
        </Para>
        <Table
          headers={['Exchange method', 'Data freshness', 'Duplication', 'Governance after handoff']}
          rows={[
            ['File export (CSV/Parquet to S3, email)', 'Stale as soon as written.', 'Full copy leaves your control.', 'None — consumer can do anything with the file.'],
            ['API pull', 'As fresh as the last sync job.', 'Copy exists in the consumer\'s system.', 'Limited to what the API enforces per call.'],
            ['Replicated database', 'Depends on replication lag.', 'Full copy, ongoing storage cost both sides.', 'Consumer owns the replica outright.'],
            ['Snowflake Secure Data Sharing', 'Live — no lag, no batch.', 'Zero. No object is duplicated.', "Provider's masking/row policies still apply."],
          ]}
        />
        <Para>
          The governance column is the one people underestimate. When you hand someone a file, your control
          ends at the handoff. When you share through Snowflake, your control does not end — it is why Part 09
          of this module, on governance, is one of the most important sections here.
        </Para>
      </section>

      <Divider />

      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 03 — Creating a share" />
        <SectionTitle>CREATE SHARE Is a Named Container of Grants</SectionTitle>
        <Para>
          A share is a first-class Snowflake object. On its own it is empty — you create it, then grant usage
          on a database and schema, then grant select on specific tables or views inside that schema, then add
          one or more consumer accounts. The share only exposes exactly what you grant into it; nothing about
          the rest of your account becomes visible.
        </Para>
        <CodeBox label="Create a share and add objects">{`-- Step 1: create the empty share container
CREATE SHARE PARTNER_ANALYTICS_SHARE
  COMMENT = 'Curated Gold-layer data for Acme Corp partnership';

-- Step 2: grant usage on the database and schema that hold the shared objects
GRANT USAGE ON DATABASE ANALYTICS TO SHARE PARTNER_ANALYTICS_SHARE;
GRANT USAGE ON SCHEMA ANALYTICS.PARTNER_VIEWS TO SHARE PARTNER_ANALYTICS_SHARE;

-- Step 3: grant select on the specific objects you intend to expose
GRANT SELECT ON VIEW ANALYTICS.PARTNER_VIEWS.MONTHLY_USAGE_SUMMARY
  TO SHARE PARTNER_ANALYTICS_SHARE;

-- Step 4: add the consumer account
ALTER SHARE PARTNER_ANALYTICS_SHARE
  ADD ACCOUNTS = XY12345;

-- Inspect what a share contains before handing it off
SHOW GRANTS TO SHARE PARTNER_ANALYTICS_SHARE;
SHOW SHARES;`}
        </CodeBox>
        <Table
          headers={['Statement', 'What it does']}
          rows={[
            ['CREATE SHARE', 'Creates the empty named share object.'],
            ['GRANT USAGE ON DATABASE/SCHEMA ... TO SHARE', 'Lets the share "see into" the namespace holding the objects.'],
            ['GRANT SELECT ON TABLE/VIEW ... TO SHARE', 'Actually exposes read access to that specific object.'],
            ['ALTER SHARE ... ADD ACCOUNTS = ...', 'Names which consumer account(s) may attach to the share.'],
            ['SHOW GRANTS TO SHARE', 'Audits exactly what a share currently exposes — run this before every handoff.'],
          ]}
        />
        <Callout title="Grant the minimum, always">
          A share only exposes what you explicitly grant. There is no implicit inheritance of everything in a
          schema — but that also means it is easy to accidentally under-grant (consumer gets an access error)
          or, worse, grant a whole schema's worth of tables when you meant to share one curated view. Treat
          `SHOW GRANTS TO SHARE` as a pre-flight checklist every time you touch a share's grants.
        </Callout>
      </section>

      <Divider />

      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 04 — The consumer side" />
        <SectionTitle>Consuming a Share Creates a Read-Only Database</SectionTitle>
        <Para>
          On the consumer account, an incoming share shows up as an available share to attach. The consumer
          creates a database from that share. This database behaves like a normal database for querying
          purposes — the consumer's own warehouse runs the SELECT, the consumer pays their own compute credits
          — but it is entirely read-only. There is no INSERT, UPDATE, DELETE, DDL, or ownership transfer;
          the consumer cannot write back into the provider's data through the shared database.
        </Para>
        <CodeBox label="Consumer side: attach and query the share">{`-- List shares available to this account
SHOW SHARES;

-- Create a local, read-only database from the inbound share
CREATE DATABASE PARTNER_ANALYTICS
  FROM SHARE PROVIDER_ACCOUNT_LOCATOR.PARTNER_ANALYTICS_SHARE;

-- Query it exactly like a normal database, using the consumer's own warehouse
SELECT *
FROM PARTNER_ANALYTICS.PARTNER_VIEWS.MONTHLY_USAGE_SUMMARY
WHERE usage_month >= '2026-01-01';`}
        </CodeBox>
        <BulletList
          items={[
            'The consumer pays for the compute (warehouse credits) used to query shared data.',
            'The provider pays only for the storage of the underlying objects, exactly as if no one were sharing them.',
            'A shared database cannot be modified, cloned into a writable copy for editing, or have objects added to it by the consumer.',
            'If the provider updates the underlying table, the consumer sees the change on their very next query — no refresh, no lag.',
          ]}
        />
      </section>

      <Divider />

      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 05 — Reader accounts" />
        <SectionTitle>Reader Accounts Let You Share With Organizations That Aren't on Snowflake</SectionTitle>
        <Para>
          Secure Data Sharing as described so far requires the consumer to already have their own Snowflake
          account. That is not always true — a small partner, a vendor still running a legacy warehouse, or an
          internal business unit that has never provisioned Snowflake all lack an account to attach a share to.
          For these cases, Snowflake supports reader accounts: a special, restricted account that the provider
          creates and fully manages on the consumer's behalf, purely so that consumer can query shared data.
        </Para>
        <HighlightBox>
          <Para>
            <strong>Mental model:</strong> a reader account is a Snowflake account with training wheels that
            the provider hands to a consumer who has no Snowflake account of their own. The provider creates
            it, administers it, and — critically — pays for it.
          </Para>
        </HighlightBox>
        <CodeBox label="Provider creates and shares into a reader account">{`CREATE MANAGED ACCOUNT partner_reader_acct
  ADMIN_NAME = 'partner_admin',
  ADMIN_PASSWORD = 'TemporaryStrongPassword123!',
  TYPE = READER;

-- Share the same way as with a full consumer account
ALTER SHARE PARTNER_ANALYTICS_SHARE
  ADD ACCOUNTS = partner_reader_acct;`}
        </CodeBox>
        <Callout title="The real cost implication" color="#ef4444">
          This is the detail people most often miss: a reader account has no warehouses of its own that the
          consumer pays for. Every query the reader-account user runs consumes the provider's warehouse
          credits. If you hand a partner a reader account and they run large exploratory queries all day, that
          bill lands on you, the provider — not them. Reader accounts are a real cost commitment, not just an
          onboarding convenience, and should be sized, monitored, and possibly rate-limited accordingly.
        </Callout>
        <Table
          headers={['Consumer type', 'Has own Snowflake account', 'Who pays compute', 'When to use']}
          rows={[
            ['Full consumer account', 'Yes', 'Consumer, via their own warehouse', 'Partner or customer already on Snowflake.'],
            ['Reader account', 'No', 'Provider, via the reader account\'s warehouse', 'Partner has no Snowflake account and won\'t provision one.'],
          ]}
        />
      </section>

      <Divider />

      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 06 — The Snowflake Marketplace" />
        <SectionTitle>Marketplace Turns Shares Into Discoverable Listings</SectionTitle>
        <Para>
          A share by itself is a private, point-to-point arrangement: you know exactly which account you're
          granting to. The Snowflake Marketplace is a public (and private, org-scoped) directory built on top
          of the same sharing primitive, where a provider publishes a listing describing a data product, and
          any Snowflake customer can discover and request it without the provider individually negotiating and
          configuring each grant by hand.
        </Para>
        <Table
          headers={['Listing type', 'Description', 'Example']}
          rows={[
            ['Free / standard listing', 'Publicly discoverable, no purchase step; consumer just gets it into their account.', 'Public weather data, currency exchange rates, COVID datasets.'],
            ['Paid listing', 'Commercial data product with billing tied to the Snowflake Marketplace.', 'Consumer spending panels, firmographic/company data, industry benchmarks.'],
            ['Private listing', 'Scoped to specific accounts or an organization, not publicly searchable.', 'A company sharing curated data with a named set of enterprise customers.'],
          ]}
        />
        <Para>
          Conceptually, a Marketplace listing wraps a share (or a set of shares) with metadata: a description,
          sample queries, refresh cadence, pricing (for paid listings), and a request/approval or
          auto-fulfillment flow. Once a consumer accepts a listing, the mechanics underneath are identical to
          the manual `CREATE DATABASE ... FROM SHARE` flow — Marketplace is a distribution and discovery layer
          on top of Secure Data Sharing, not a separate sharing technology.
        </Para>
        <BulletList
          items={[
            'A listing is how a provider makes a data product discoverable instead of hand-configuring per-account shares.',
            'Free listings are common for reference data (holidays, FX rates, points of interest) used to bootstrap ecosystem adoption.',
            'Paid listings turn a company\'s data assets into a monetizable product without building separate delivery infrastructure.',
            'Consumers get the product into their account with a few clicks — no file transfer, no custom pipeline to maintain.',
          ]}
        />
        <Callout title="Marketplace is a distribution layer, not a new access model">
          It's easy to think of Marketplace as some separate sharing mechanism. It isn't. Everything you know
          about grants, governance, and read-only consumption from Parts 03–04 still applies to a Marketplace
          listing — Marketplace just handles discovery, request/approval, and (for paid listings) billing.
        </Callout>
      </section>

      <Divider />

      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 07 — Data clean rooms" />
        <SectionTitle>Clean Rooms: Joint Analysis Without Exposing Raw Rows</SectionTitle>
        <Para>
          Sometimes two organizations want to analyze combined data — a retailer and an ad platform matching
          purchase data against ad exposure, or two companies computing shared-customer overlap — but neither
          party is willing (or legally permitted) to hand the other their raw, row-level data. A data clean
          room is a pattern for exactly this: a governed environment where both parties contribute data, agreed
          computations run against the combined dataset, and each party receives only the aggregated or derived
          output, never the counterparty's underlying rows.
        </Para>
        <HighlightBox>
          <Para>
            <strong>Plain-English definition:</strong> a clean room lets two parties ask a joint question of
            their combined data — "how many of my customers also bought from you?" — and get an answer, without
            either party ever being able to browse the other's raw records.
          </Para>
        </HighlightBox>
        <Table
          headers={['Property', 'What it guarantees']}
          rows={[
            ['No raw row access', 'Each party can only see approved, aggregated, or derived outputs of a query — never the counterparty\'s source rows.'],
            ['Approved computations', 'Analyses that can run inside the clean room are constrained/approved in advance, not arbitrary ad hoc SQL against the raw data.'],
            ['Privacy thresholds', 'Aggregate results are typically only released when they represent enough underlying rows to prevent re-identifying an individual.'],
            ['Governed by both parties', 'Neither side unilaterally controls the environment — it is a jointly governed space.'],
          ]}
        />
        <Callout title="This is an advanced, evolving feature — describe it, don't overstate it">
          Clean rooms are one of the newer and more advanced capabilities built on top of Snowflake's sharing
          and governance primitives, and the exact implementation mechanics (which functions, which UI, which
          approval workflow) continue to evolve. For interview and design purposes, know the concept cold —
          privacy-preserving joint analysis without raw-row exposure — rather than memorizing implementation
          specifics that may have shifted by the time you use them.
        </Callout>
      </section>

      <Divider />

      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 08 — Curated views, not raw tables" />
        <SectionTitle>What You Share Should Be a Deliberate Product, Not a Convenient Export</SectionTitle>
        <Para>
          The single most common sharing mistake is granting a share direct SELECT access to a raw or Silver
          table because it was the fastest way to unblock a partner request. That table's column names, types,
          and row-level detail instantly become part of an external contract. If you rename a column or change
          its meaning internally, you break the partner's pipeline without warning. The discipline that applies
          to Gold-layer marts inside your own account (see the medallion architecture module) applies doubly
          to anything crossing an account boundary.
        </Para>
        <CodeBox label="Share a curated Gold view, not a raw table">{`-- Bad: exposes internal Silver-layer shape directly
GRANT SELECT ON TABLE ANALYTICS.SILVER.ORDERS TO SHARE PARTNER_ANALYTICS_SHARE;

-- Good: a stable, purpose-built view is the actual contract
CREATE OR REPLACE VIEW ANALYTICS.PARTNER_VIEWS.MONTHLY_USAGE_SUMMARY AS
SELECT
  DATE_TRUNC('month', order_ts) AS usage_month,
  COUNT(*) AS order_count,
  SUM(total_usd) AS gross_revenue_usd
FROM ANALYTICS.GOLD.FCT_ORDERS
WHERE status NOT IN ('cancelled', 'fraud')
GROUP BY 1;

GRANT SELECT ON VIEW ANALYTICS.PARTNER_VIEWS.MONTHLY_USAGE_SUMMARY
  TO SHARE PARTNER_ANALYTICS_SHARE;`}
        </CodeBox>
        <BulletList
          items={[
            'A dedicated PARTNER_VIEWS (or similarly named) schema keeps shared objects isolated from internal working tables.',
            'Views let you reshape, rename, and filter columns freely without changing the underlying Silver/Gold tables.',
            'Treat a shared view\'s schema as a versioned API — breaking changes need communication, not a silent redeploy.',
            'Document freshness (how often the underlying Gold table refreshes) alongside the shared object.',
          ]}
        />
      </section>

      <Divider />

      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 09 — Governance still applies to shared data" />
        <SectionTitle>Masking and Row Access Policies Follow the Data Through the Share</SectionTitle>
        <Para>
          This is the most important, and most non-obvious, governance fact in this entire module: sharing an
          object does not bypass the masking policies or row access policies attached to it. If a column has a
          masking policy that hides email addresses from users without a `PII_VIEWER` role, a consumer querying
          that column through a share still sees the masked value — because the consumer's session, not the
          provider's, is what gets evaluated against the policy at query time. A shared object cannot be used as
          a backdoor around governance that would otherwise block the same query run internally.
        </Para>
        <CodeBox label="A masking policy still applies to consumer queries">{`-- Policy defined and attached on the provider side (see advanced-security-governance module)
CREATE OR REPLACE MASKING POLICY EMAIL_MASK AS (val STRING) RETURNS STRING ->
  CASE
    WHEN CURRENT_ROLE() IN ('PII_VIEWER') THEN val
    ELSE '***MASKED***'
  END;

ALTER TABLE ANALYTICS.GOLD.DIM_CUSTOMERS
  MODIFY COLUMN email SET MASKING POLICY EMAIL_MASK;

-- The share exposes DIM_CUSTOMERS (or a view over it) as usual
GRANT SELECT ON TABLE ANALYTICS.GOLD.DIM_CUSTOMERS TO SHARE PARTNER_ANALYTICS_SHARE;

-- On the consumer side, this query still returns '***MASKED***' for email,
-- because the masking policy evaluates against the CONSUMER's session role,
-- not any role the provider holds.
SELECT customer_id, email FROM PARTNER_ANALYTICS.GOLD.DIM_CUSTOMERS;`}
        </CodeBox>
        <Callout title="Do not treat sharing as a governance escape hatch">
          A surprising number of teams assume that because sharing exposes an object "externally," internal
          policies somehow don't apply anymore. The opposite is true: shared objects are still subject to every
          masking policy and row access policy defined on them. If you actually want a consumer to see
          unmasked data, that requires deliberately reworking the policy definition (or the object they query)
          — never assume sharing implicitly grants an exemption.
        </Callout>
        <Table
          headers={['Governance control', 'Applies through a share?', 'What this means for the provider']}
          rows={[
            ['Column masking policy', 'Yes — evaluated against the consumer\'s session.', 'Safe by default; consumer sees masked values unless the policy explicitly permits otherwise.'],
            ['Row access policy', 'Yes — filters rows for the consumer\'s session too.', 'You can share one object with different row visibility per account if the policy is designed for it.'],
            ['Object-level grants inside the share', 'Only what was explicitly granted to the share.', 'The share itself is the outer boundary; policies are the inner boundary.'],
          ]}
        />
      </section>

      <Divider />

      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 10 — Monitoring and lifecycle" />
        <SectionTitle>A Share Is a Product With a Lifecycle, Not a One-Time Setup</SectionTitle>
        <Para>
          Once a share is live, it needs the same operational care as any other production data product:
          monitoring whether consumers are actually using it, tracking which accounts are attached, and having
          a deprecation plan if a shared object needs to change shape.
        </Para>
        <CodeBox label="Auditing share usage">{`-- What is currently granted into a share
SHOW GRANTS TO SHARE PARTNER_ANALYTICS_SHARE;

-- Which accounts are attached to a share
SHOW GRANTS OF SHARE PARTNER_ANALYTICS_SHARE;

-- Provider-side query history filtered to objects known to be shared
-- (queries against shared objects still run on the CONSUMER's warehouse,
-- so this is best tracked via consumer-reported usage or Marketplace listing analytics
-- rather than the provider's own QUERY_HISTORY, which won't show consumer-side queries)
SELECT *
FROM SNOWFLAKE.ACCOUNT_USAGE.GRANTS_TO_SHARES
WHERE share_name = 'PARTNER_ANALYTICS_SHARE'
ORDER BY created_on DESC;`}
        </CodeBox>
        <BulletList
          items={[
            'Revoke access with ALTER SHARE ... REMOVE ACCOUNTS = ... when a partnership ends.',
            'Version breaking schema changes: add a new view rather than silently altering the shape of an existing shared one.',
            'Keep an owner assigned to every share, the same way Gold tables need an owner (see the medallion architecture module).',
            'Periodically review SHOW GRANTS TO SHARE against what should still be exposed — grants drift over time as teams add "just one more column."',
          ]}
        />
      </section>

      <Divider />

      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 11 — Anti-patterns" />
        <SectionTitle>Common Sharing Anti-Patterns</SectionTitle>
        <Callout title="Avoid these" color="#ef4444">
          <BulletList
            items={[
              'Granting a share SELECT on raw or Silver tables instead of a curated, stable view.',
              'Assuming masking or row access policies stop applying once data is shared — they do not.',
              'Handing out reader accounts without monitoring the compute cost they generate against your warehouse.',
              'Never running SHOW GRANTS TO SHARE, so the share silently exposes more than intended after months of changes.',
              'Treating a share as a one-time setup with no owner, no documentation, and no deprecation plan.',
              'Publishing a Marketplace listing without a clear freshness/refresh cadence documented for consumers.',
              'Assuming clean rooms give either party unrestricted query access to the other\'s raw data.',
            ]}
          />
        </Callout>
      </section>

      <Divider />

      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 12 — A full provider-to-consumer walkthrough" />
        <SectionTitle>Every Statement, in Order, on Both Sides of the Account Boundary</SectionTitle>
        <Para>
          The pieces of sharing have been introduced separately so far — creating a share, granting into it,
          adding an account, consuming it. It helps to see the entire thing as one continuous story, provider
          statements followed immediately by the matching consumer statements, so the handoff between accounts
          is unambiguous. Assume a supplier ("provider account", locator `AB12345`) wants to give a retail
          partner ("consumer account", locator `XY98765`) live read access to a curated inventory feed.
        </Para>
        <CodeBox label="Provider side, start to finish">{`-- 1. Build the curated object the partner is actually allowed to see.
--    Never point a share at a raw or Silver table directly (see Part 08).
CREATE OR REPLACE VIEW ANALYTICS.PARTNER_VIEWS.INVENTORY_FEED AS
SELECT
  sku,
  warehouse_region,
  quantity_on_hand,
  last_restocked_at
FROM ANALYTICS.GOLD.DIM_INVENTORY
WHERE is_discontinued = FALSE;

-- 2. Create the empty share container.
CREATE SHARE INVENTORY_FEED_SHARE
  COMMENT = 'Live inventory feed for Retail Partner Co.';

-- 3. Grant the share visibility into the namespace, then the object itself.
GRANT USAGE ON DATABASE ANALYTICS TO SHARE INVENTORY_FEED_SHARE;
GRANT USAGE ON SCHEMA ANALYTICS.PARTNER_VIEWS TO SHARE INVENTORY_FEED_SHARE;
GRANT SELECT ON VIEW ANALYTICS.PARTNER_VIEWS.INVENTORY_FEED TO SHARE INVENTORY_FEED_SHARE;

-- 4. Attach the partner's account locator to the share.
ALTER SHARE INVENTORY_FEED_SHARE ADD ACCOUNTS = XY98765;

-- 5. Confirm exactly what is exposed before telling the partner it's ready.
SHOW GRANTS TO SHARE INVENTORY_FEED_SHARE;`}
        </CodeBox>
        <CodeBox label="Consumer side, immediately after the provider hands off the locator + share name">{`-- 6. Confirm the share is visible to this account.
SHOW SHARES;

-- 7. Materialize it as a local, read-only database.
CREATE DATABASE PARTNER_INVENTORY
  FROM SHARE AB12345.INVENTORY_FEED_SHARE;

-- 8. Query it like any other database, on the consumer's own warehouse.
SELECT sku, warehouse_region, quantity_on_hand
FROM PARTNER_INVENTORY.PARTNER_VIEWS.INVENTORY_FEED
WHERE warehouse_region = 'US-WEST'
ORDER BY quantity_on_hand ASC;`}
        </CodeBox>
        <Table
          headers={['Step', 'Which account runs it', 'What breaks if skipped']}
          rows={[
            ['Curated view (step 1)', 'Provider', 'Consumer sees raw internal column names/shape as a permanent external contract.'],
            ['CREATE SHARE (step 2)', 'Provider', 'Nothing to grant into or attach an account to.'],
            ['GRANT USAGE + GRANT SELECT (step 3)', 'Provider', 'Consumer gets "object does not exist" even after attaching — usage on the schema is easy to forget.'],
            ['ALTER SHARE ... ADD ACCOUNTS (step 4)', 'Provider', "Share exists but the partner's account never sees it in SHOW SHARES."],
            ['CREATE DATABASE ... FROM SHARE (step 7)', 'Consumer', 'The share is attached but nothing queryable exists yet in the consumer account.'],
          ]}
        />
        <Callout title="The two most common breakages happen in steps 3 and 4">
          Granting SELECT on the view but forgetting GRANT USAGE on its schema, and creating the share but
          never running ALTER SHARE ... ADD ACCOUNTS, are the two mistakes that generate almost all
          "the partner says they can't see anything" support tickets. SHOW GRANTS TO SHARE catches the first;
          SHOW GRANTS OF SHARE catches the second.
        </Callout>
        <Para>
          Notice, too, that nothing in the consumer's steps required contacting the provider's Snowflake
          support team, filing a data-transfer ticket, or waiting on a batch export window. Once the provider
          hands over two pieces of information — their account locator and the share's name — the consumer
          self-serves the rest in three statements. That speed is the actual business value of sharing over a
          traditional data exchange: onboarding a new partner into a live feed is minutes of DDL, not a
          multi-week file-transfer integration project.
        </Para>
      </section>

      <Divider />

      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 13 — Auditing access and versioning shared objects" />
        <SectionTitle>A Share Needs an Access Audit Trail and a Non-Breaking Upgrade Path</SectionTitle>
        <Para>
          Two production questions come up constantly once a share has been live for a while: exactly who has
          access to it right now, and how do you change the shape of what's shared without silently breaking
          every consumer's downstream query the moment you deploy. Both deserve concrete patterns, not just
          "be careful."
        </Para>
        <CodeBox label="Answering 'who has access to this share, right now'">{`-- Every account currently attached to the share
SHOW GRANTS OF SHARE INVENTORY_FEED_SHARE;

-- Every object currently exposed through the share
SHOW GRANTS TO SHARE INVENTORY_FEED_SHARE;

-- Cross-reference against an approved allow-list maintained outside Snowflake
-- (a spreadsheet, a ticket, a config file) -- SHOW SHARES tells you the
-- technical truth, not whether each attached account is still authorized.
SELECT share_name, kind, database_name
FROM SNOWFLAKE.ACCOUNT_USAGE.SHARES
WHERE deleted_on IS NULL
ORDER BY share_name;`}
        </CodeBox>
        <CodeBox label="Revoking a partner's access when a contract ends">{`ALTER SHARE INVENTORY_FEED_SHARE REMOVE ACCOUNTS = XY98765;

-- Confirm the removal took effect
SHOW GRANTS OF SHARE INVENTORY_FEED_SHARE;`}
        </CodeBox>
        <Para>
          Versioning is the harder problem, because a shared view is effectively a public API contract:
          renaming a column, changing a type, or removing a row silently breaks whatever the partner built on
          top of it, with no compiler or test suite on your side to catch it. The safe pattern is to add a new
          versioned view alongside the old one, rather than mutating the existing one's shape in place.
        </Para>
        <CodeBox label="Versioning a shared view instead of breaking it in place">{`-- Do NOT do this if partners already depend on the v1 shape:
-- CREATE OR REPLACE VIEW ANALYTICS.PARTNER_VIEWS.INVENTORY_FEED AS
--   SELECT sku, region_code, qty FROM ANALYTICS.GOLD.DIM_INVENTORY ...  -- renamed columns!

-- Instead, publish a new version and grant it into the share alongside the old one:
CREATE OR REPLACE VIEW ANALYTICS.PARTNER_VIEWS.INVENTORY_FEED_V2 AS
SELECT
  sku,
  warehouse_region AS region_code,
  quantity_on_hand AS qty,
  last_restocked_at
FROM ANALYTICS.GOLD.DIM_INVENTORY
WHERE is_discontinued = FALSE;

GRANT SELECT ON VIEW ANALYTICS.PARTNER_VIEWS.INVENTORY_FEED_V2
  TO SHARE INVENTORY_FEED_SHARE;

-- Communicate a deprecation date for INVENTORY_FEED (v1) to consumers,
-- then REVOKE it from the share only after they have migrated to v2.`}
        </CodeBox>
        <Para>
          One more distinction worth keeping straight: `SHOW GRANTS TO SHARE` and `SHOW GRANTS OF SHARE`
          answer two different questions, and mixing them up wastes time during an incident. `TO SHARE` lists
          what a share exposes — the objects inside it. `OF SHARE` lists who the share is exposed to — the
          consumer accounts attached to it. A partner reporting "I can't see the new column" is a `TO SHARE`
          question; a partner reporting "we lost access entirely" is an `OF SHARE` question.
        </Para>
        <Table
          headers={['Change type', 'Safe to deploy in place?', 'Recommended approach']}
          rows={[
            ['Adding a new column to an existing shared view.', 'Usually yes.', 'Consumers selecting explicit columns are unaffected; SELECT * consumers should be warned anyway.'],
            ['Renaming or removing a column.', 'No.', 'Publish a new versioned view (e.g. _V2); deprecate the old one on a communicated timeline.'],
            ['Changing a column\'s data type or unit (e.g. cents to dollars).', 'No.', 'Same versioned-view approach — a silent type/unit change is worse than a missing column.'],
            ['Adding row-level filtering that changes result volume.', 'Usually no.', 'Communicate first; a consumer\'s downstream aggregate may silently shift.'],
          ]}
        />
        <Callout title="Treat the underlying table rename/drop risk as real, not theoretical" color="#ef4444">
          If the table a shared view selects from is dropped or renamed without updating the view, the shared
          view breaks silently — the provider's own queries may look fine while the consumer's every query
          starts failing. Any migration touching a table feeding a shared view must check
          `SHOW GRANTS TO SHARE` for dependents before the change, not after a partner reports an outage.
        </Callout>
        <Para>
          It is worth building a short internal checklist around exactly this scenario, because it recurs
          every time a provider-side data model evolves. Before renaming, dropping, or retyping any column in
          a table that feeds a shared view, cross-reference every share in the account against the objects it
          depends on, confirm a versioned replacement view exists and has been communicated with a concrete
          deprecation date, and only then make the underlying change. Skipping straight to the change because
          "it's just an internal refactor" is exactly how an internal refactor becomes an external outage.
        </Para>
        <BulletList
          items={[
            'Before touching a table: list every share whose granted objects reference it, directly or through a view.',
            'For any breaking change, publish a new versioned view rather than mutating the existing shape.',
            'Communicate a concrete deprecation date for the old version before removing it from the share.',
            'Only revoke the old version from the share once consumer usage against it has actually dropped to zero, not on the deprecation date alone.',
          ]}
        />
      </section>

      <Divider />

      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 14 — Hands-on lab" />
        <SectionTitle>Hands-On Lab: Share a Gold-Layer View With a Partner Account</SectionTitle>
        <Para>
          This lab walks through the provider side of a realistic scenario: a retail analytics account wants
          to share monthly order summaries with a partner's Snowflake account, without exposing raw order rows
          or customer PII.
        </Para>
        <CodeBox label="Lab setup: provider-side objects">{`CREATE OR REPLACE DATABASE SHARING_LAB;
CREATE OR REPLACE SCHEMA SHARING_LAB.GOLD;
CREATE OR REPLACE SCHEMA SHARING_LAB.PARTNER_VIEWS;

CREATE OR REPLACE TABLE SHARING_LAB.GOLD.FCT_ORDERS (
  order_id STRING,
  customer_id STRING,
  order_ts TIMESTAMP_NTZ,
  status STRING,
  total_usd NUMBER(12,2)
);

INSERT INTO SHARING_LAB.GOLD.FCT_ORDERS VALUES
  ('O-1', 'C-1', '2026-09-01 10:00:00', 'completed', 120.00),
  ('O-2', 'C-2', '2026-09-03 14:30:00', 'completed', 45.50),
  ('O-3', 'C-1', '2026-09-10 09:15:00', 'cancelled', 80.00);`}
        </CodeBox>
        <CodeBox label="Lab: curated view, share, and grants">{`CREATE OR REPLACE VIEW SHARING_LAB.PARTNER_VIEWS.MONTHLY_USAGE_SUMMARY AS
SELECT
  DATE_TRUNC('month', order_ts) AS usage_month,
  COUNT(*) AS order_count,
  SUM(total_usd) AS gross_revenue_usd
FROM SHARING_LAB.GOLD.FCT_ORDERS
WHERE status NOT IN ('cancelled', 'fraud')
GROUP BY 1;

CREATE OR REPLACE SHARE LAB_PARTNER_SHARE
  COMMENT = 'Lab: monthly usage summary for a partner account';

GRANT USAGE ON DATABASE SHARING_LAB TO SHARE LAB_PARTNER_SHARE;
GRANT USAGE ON SCHEMA SHARING_LAB.PARTNER_VIEWS TO SHARE LAB_PARTNER_SHARE;
GRANT SELECT ON VIEW SHARING_LAB.PARTNER_VIEWS.MONTHLY_USAGE_SUMMARY
  TO SHARE LAB_PARTNER_SHARE;

-- In a real scenario, replace with the partner's actual account locator
ALTER SHARE LAB_PARTNER_SHARE ADD ACCOUNTS = PARTNER_ACCOUNT_LOCATOR;

SHOW GRANTS TO SHARE LAB_PARTNER_SHARE;`}
        </CodeBox>
        <SubTitle>Lab questions</SubTitle>
        <BulletList
          items={[
            'Why does the lab share a view instead of granting SELECT directly on FCT_ORDERS?',
            'What would show up in SHOW GRANTS TO SHARE after this setup?',
            'If FCT_ORDERS had a masking policy on customer_id, would this share leak it? Why or why not — note that the view above doesn\'t even select customer_id, but reason through what would happen if it did.',
            'How would you change this lab setup to serve a partner who has no Snowflake account of their own?',
            'What would you add to make this a Marketplace listing instead of a private one-account share?',
          ]}
        />
      </section>

      <Divider />

      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 15 — Interview answer" />
        <SectionTitle>How to Explain Data Sharing and Marketplace in an Interview</SectionTitle>
        <Para>
          A strong answer sounds like this: Snowflake's Secure Data Sharing lets a provider account expose
          selected database objects to a consumer account without copying any data — the consumer queries
          through their own compute against the provider's storage, so there's zero duplication and the
          consumer always sees live data. I'd create a share, grant usage on the database/schema and select on
          curated views (never raw tables), and add consumer accounts with ALTER SHARE. For partners without
          their own Snowflake account, I'd use a reader account, keeping in mind the provider's warehouse pays
          for all of that account's queries. The Marketplace is a discovery and distribution layer built on the
          same sharing primitive — free or paid listings that let consumers self-serve a share without
          point-to-point negotiation. Data clean rooms extend this further for privacy-preserving joint
          analysis where neither party sees the other's raw rows. The single most important governance point is
          that masking policies and row access policies still apply to a consumer's queries through a share —
          sharing is not a way to bypass governance, it inherits it.
        </Para>
        <SubTitle>Questions you should answer out loud</SubTitle>
        <BulletList
          items={[
            'What actually moves between accounts when you create a Snowflake share — data, or just a grant?',
            'Who pays the compute cost when a consumer queries shared data through a full consumer account? Through a reader account?',
            'What is the difference between a share and a Marketplace listing?',
            'What does a data clean room prevent each party from seeing?',
            'Do masking policies and row access policies still apply to a consumer querying shared data? Why?',
            'Why should you share a curated view instead of a raw table?',
            'How would you monitor and eventually deprecate a share?',
          ]}
        />
      </section>

      <KeyTakeaways
        items={[
          'Secure Data Sharing exposes live data to another account through grants, not copies — zero duplication, always-current data.',
          'CREATE SHARE, then GRANT USAGE/SELECT into it, then ALTER SHARE ... ADD ACCOUNTS to attach consumers.',
          'A consumer account queries shared data with its own compute; the provider only pays for storage.',
          'Reader accounts let you share with organizations that have no Snowflake account — but the provider\'s warehouse pays for every reader-account query.',
          'The Marketplace is a discovery/distribution layer (free and paid listings) built on top of the same sharing primitive.',
          'Data clean rooms allow privacy-preserving joint analysis without either party seeing the other\'s raw rows.',
          "Masking policies and row access policies still apply to a consumer's queries — sharing never bypasses governance.",
          'Share curated, stable views — never raw tables — and treat every share as an owned, documented, monitored product.',
        ]}
      />
    </LearnLayout>
  )
}
