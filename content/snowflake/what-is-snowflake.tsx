import { BulletList, Callout, CodeBox, Divider, HighlightBox, KeyTakeaways, LearnLayout, Para, SectionTag, SectionTitle, SubTitle, Table } from './_shared'

export default function WhatIsSnowflake() {
  return (
    <LearnLayout
      title="What is Snowflake?"
      description="Snowflake explained from scratch: warehouse vs database, OLAP vs OLTP, storage vs compute, and why companies use it."
      section="Snowflake — Module 01"
      readTime="55 min"
      updatedAt="September 2026"
      breadcrumbs={[
        { label: 'Learn', href: '/learn' },
        { label: 'Snowflake', href: '/learn/snowflake' },
        { label: 'What is Snowflake?', href: '/learn/snowflake/what-is-snowflake' },
      ]}
      next={{ title: 'Snowflake Architecture', href: '/learn/snowflake/architecture' }}
    >
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 01 — The real definition" />
        <SectionTitle>Snowflake Is a Cloud Data Warehouse for Analytics</SectionTitle>
        <Para>
          Snowflake is a cloud data warehouse. That means it is built to store and query large volumes of
          business data for analytics, reporting, data engineering, data science, and machine learning. It
          is not usually the database behind the button a customer clicks in your application. It is the
          analytical system where data from many operational systems is collected, cleaned, modeled, and
          queried.
        </Para>
        <Para>
          If a customer places an order, the checkout application usually writes that order to an
          operational database such as PostgreSQL, MySQL, SQL Server, DynamoDB, or another OLTP system.
          Later, a pipeline copies that order into Snowflake so the company can answer questions such as:
          how much revenue did we make yesterday, which customers are churning, which product categories
          are growing, and what changed after the latest promotion?
        </Para>
        <HighlightBox>
          <Para>
            <strong>Plain-English definition:</strong> Snowflake is where a company brings together data
            from many systems so people can analyze the business with SQL, dashboards, models, and governed
            data products.
          </Para>
        </HighlightBox>
        <Table
          headers={['System', 'Optimized for', 'Example question']}
          rows={[
            ['PostgreSQL / MySQL', 'Small fast application reads and writes.', 'Can this user log in right now?'],
            ['Kafka', 'Durable event streaming between systems.', 'What events happened and who needs to react?'],
            ['S3 / ADLS / GCS', 'Cheap file storage at huge scale.', 'Where can we keep all raw data files?'],
            ['Snowflake', 'Analytical SQL across large curated datasets.', 'What was revenue by customer segment last quarter?'],
          ]}
        />
      </section>

      <Divider />

      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 02 — OLTP vs OLAP" />
        <SectionTitle>Why Snowflake Is Different From a Normal Application Database</SectionTitle>
        <Para>
          The fastest way to understand Snowflake is to separate OLTP from OLAP. OLTP means online
          transaction processing: many small reads and writes that keep an application running. OLAP means
          online analytical processing: fewer but much larger queries that scan, join, aggregate, and analyze
          data.
        </Para>
        <Table
          headers={['Dimension', 'OLTP database', 'Snowflake / OLAP warehouse']}
          rows={[
            ['Main job', 'Run the live product.', 'Analyze the business.'],
            ['Typical query', 'Find one customer by id.', 'Scan millions or billions of rows.'],
            ['Write pattern', 'Many tiny inserts/updates every second.', 'Bulk loads, ELT, batch or streaming ingestion.'],
            ['Storage pattern', 'Row-oriented in many OLTP systems.', 'Columnar storage for analytical scans.'],
            ['Users', 'Application backend services.', 'Analysts, engineers, BI tools, ML workflows.'],
            ['Failure impact', 'Checkout/login/payment breaks immediately.', 'Reports, dashboards, and models are delayed or wrong.'],
          ]}
        />
        <Callout title="Do not use Snowflake for this" color="#ef4444">
          Do not put Snowflake directly in the request path for a checkout, login, payment authorization,
          inventory reservation, or customer-facing sub-second feature. Snowflake is excellent for analytics;
          it is not a replacement for your transactional application database.
        </Callout>
      </section>

      <Divider />

      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 03 — Why companies choose it" />
        <SectionTitle>What Problems Snowflake Solves</SectionTitle>
        <Para>
          Before cloud warehouses, companies often ran data warehouses on fixed clusters. Scaling was slow.
          Storage and compute were tightly coupled. One department's giant query could slow down everyone
          else. Administrators spent time tuning infrastructure instead of helping teams deliver data.
        </Para>
        <BulletList
          items={[
            'It separates storage from compute so teams can scale query power independently from stored data.',
            'It is fully managed, so teams do not manage warehouse servers, disks, patches, or cluster nodes.',
            'It supports SQL, semi-structured data, sharing, governance, and elastic compute in one platform.',
            'It lets multiple workloads use different virtual warehouses against the same stored data.',
            'It supports Time Travel and zero-copy cloning, which make recovery and development workflows easier.',
          ]}
        />
        <CodeBox label="The job Snowflake plays in a modern data stack">{`Application DBs       SaaS tools         Event streams        Files
     │                  │                   │                │
     └────────────── ingestion / ELT / CDC / batch ──────────┘
                               │
                            Snowflake
                               │
        ┌───────────────┬──────┴──────┬────────────────┐
        │               │             │                │
   BI dashboards     dbt marts   data science      governed sharing`}
        </CodeBox>
      </section>

      <Divider />

      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 04 — The central architecture idea" />
        <SectionTitle>Storage Is Shared, Compute Is Isolated</SectionTitle>
        <Para>
          Snowflake's core architecture separates data storage from query compute. Your data lives in
          Snowflake-managed cloud storage. Queries run on virtual warehouses, which are compute clusters
          that can start, stop, resize, and operate independently.
        </Para>
        <Para>
          This is why a data loading job can run on one warehouse while analysts query the same data from
          another warehouse. The loading workload and dashboard workload do not need to fight for the same
          CPU. They share the same tables but use separate compute.
        </Para>
        <Table
          headers={['Layer', 'Purpose', 'Simple analogy']}
          rows={[
            ['Storage', 'Keeps compressed table data and metadata.', 'The library shelves.'],
            ['Virtual warehouse', 'Runs SQL and loads/transforms data.', 'The workers reading books and answering questions.'],
            ['Cloud services', 'Handles metadata, optimization, auth, transactions.', 'The catalog, security desk, and coordinator.'],
          ]}
        />
        <Callout title="One sentence to remember">
          Snowflake stores data once and lets many separate compute warehouses query or transform it.
        </Callout>
      </section>

      <Divider />

      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 05 — What Snowflake is not" />
        <SectionTitle>The Misunderstandings That Cause Bad Snowflake Designs</SectionTitle>
        <BulletList
          items={[
            'Snowflake is not a queue; use Kafka, SQS, Pub/Sub, or similar tools for event transport.',
            'Snowflake is not a low-latency serving cache; use Redis, Elasticsearch, or an application database for that.',
            'Snowflake is not automatically cheap; bad warehouse settings and dashboard queries can burn credits quickly.',
            'Snowflake is not automatically clean data; it stores what you load, including duplicates and bad rows.',
            'Snowflake constraints such as primary keys are not a full replacement for dbt tests and pipeline quality checks.',
          ]}
        />
        <HighlightBox>
          <Para>
            <strong>Senior framing:</strong> Snowflake is an analytical platform. The value comes from
            combining the platform with good data modeling, reliable ingestion, explicit quality checks,
            sensible warehouse sizing, governance, and cost ownership.
          </Para>
        </HighlightBox>
      </section>

      <Divider />

      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 06 — Interview answer" />
        <SectionTitle>How to Explain Snowflake Clearly</SectionTitle>
        <Para>
          In an interview, say: Snowflake is a fully managed cloud data warehouse for analytical workloads.
          It separates storage from compute. Data is stored in compressed columnar micro-partitions in
          Snowflake-managed cloud storage, and queries run on virtual warehouses that can be sized,
          suspended, resumed, and isolated by workload. Snowflake supports SQL, semi-structured data, Time
          Travel, zero-copy cloning, secure data sharing, RBAC, streams, tasks, and integrations with tools
          like dbt. It is used for analytics and ELT, not as a low-latency OLTP application database.
        </Para>
        <SubTitle>You should now be able to answer</SubTitle>
        <BulletList
          items={[
            'What is Snowflake in one sentence?',
            'Why is Snowflake not the same as PostgreSQL?',
            'What does separating storage and compute mean?',
            'Why do companies use Snowflake in a modern data stack?',
            'What kinds of workloads should not run directly on Snowflake?',
          ]}
        />
      </section>

      <KeyTakeaways
        items={[
          'Snowflake is a cloud data warehouse for analytics, not a normal app database.',
          'It is built for OLAP workloads: scans, joins, aggregates, dashboards, ELT, and governed data products.',
          'Its core architectural idea is separated storage and compute.',
          'Virtual warehouses provide isolated compute over shared data.',
          'Snowflake still requires good modeling, ingestion, security, quality checks, and cost governance.',
        ]}
      />
    </LearnLayout>
  )
}
