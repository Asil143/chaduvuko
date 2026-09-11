import { LearnLayout } from '@/components/content/LearnLayout'
import { KeyTakeaways } from '@/components/content/KeyTakeaways'

const K = '#f97316'
const FONT_MONO = 'var(--font-mono)'
const FONT_DISPLAY = 'var(--font-display)'

const SectionTag = ({ text }: { text: string }) => (
  <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '.14em', textTransform: 'uppercase', color: 'var(--muted)', fontFamily: FONT_MONO, marginBottom: 10 }}>{text}</div>
)
const SectionTitle = ({ children }: { children: React.ReactNode }) => (
  <h2 style={{ fontSize: 'clamp(22px, 3vw, 32px)', fontWeight: 900, letterSpacing: '-1px', color: 'var(--text)', marginBottom: 18, fontFamily: FONT_DISPLAY, lineHeight: 1.2 }}>{children}</h2>
)
const SubTitle = ({ children }: { children: React.ReactNode }) => (
  <h3 style={{ fontSize: 'clamp(17px, 2vw, 22px)', fontWeight: 800, letterSpacing: '-0.4px', color: 'var(--text)', margin: '30px 0 12px', fontFamily: FONT_DISPLAY }}>{children}</h3>
)
const Para = ({ children }: { children: React.ReactNode }) => (
  <p style={{ fontSize: 15, color: 'var(--text)', lineHeight: 1.95, marginBottom: 20 }}>{children}</p>
)
const Divider = () => <div style={{ borderTop: '1px solid var(--border)', margin: '54px 0' }} />
const HighlightBox = ({ children }: { children: React.ReactNode }) => (
  <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 12, padding: '24px 28px', marginBottom: 26 }}>{children}</div>
)
const Callout = ({ title, children, color = K }: { title: string; children: React.ReactNode; color?: string }) => (
  <div style={{ background: `${color}0d`, border: `1px solid ${color}33`, borderLeft: `4px solid ${color}`, borderRadius: '0 12px 12px 0', padding: '18px 22px', margin: '26px 0' }}>
    <div style={{ fontSize: 11, fontWeight: 800, color, letterSpacing: '.1em', textTransform: 'uppercase', fontFamily: FONT_MONO, marginBottom: 8 }}>{title}</div>
    <div style={{ fontSize: 14.5, color: 'var(--text)', lineHeight: 1.9 }}>{children}</div>
  </div>
)
const CodeBox = ({ label, children }: { label: string; children: string }) => (
  <div style={{ marginBottom: 26 }}>
    <div style={{ fontSize: 11, fontWeight: 800, color: 'var(--muted)', letterSpacing: '.1em', textTransform: 'uppercase', marginBottom: 6, fontFamily: FONT_MONO }}>{label}</div>
    <pre style={{ background: 'var(--bg2)', border: '1px solid var(--border)', borderRadius: 10, padding: '18px 22px', overflowX: 'auto', fontSize: 13, lineHeight: 1.9, color: 'var(--text)', fontFamily: FONT_MONO, margin: 0, whiteSpace: 'pre-wrap' }}>
      <code>{children}</code>
    </pre>
  </div>
)
const Output = ({ children }: { children: string }) => (
  <div style={{ marginBottom: 24 }}>
    <div style={{ fontSize: 10, fontWeight: 700, color: 'var(--muted)', letterSpacing: '.1em', textTransform: 'uppercase', marginBottom: 6, fontFamily: FONT_MONO, display: 'flex', alignItems: 'center', gap: 6 }}>
      <span style={{ opacity: 0.6 }}>▸</span> output
    </div>
    <pre style={{ background: 'transparent', border: '1px dashed var(--border)', borderRadius: 10, padding: '14px 22px', overflowX: 'auto', fontSize: 13, lineHeight: 1.8, color: 'var(--muted)', fontFamily: FONT_MONO, margin: 0, whiteSpace: 'pre-wrap' }}>
      <code>{children}</code>
    </pre>
  </div>
)
const BulletList = ({ items }: { items: string[] }) => (
  <ul style={{ display: 'grid', gap: 11, margin: '0 0 22px', paddingLeft: 0, listStyle: 'none' }}>
    {items.map(item => (
      <li key={item} style={{ display: 'flex', gap: 11, alignItems: 'flex-start', fontSize: 14.5, color: 'var(--text)', lineHeight: 1.8 }}>
        <span style={{ color: K, fontWeight: 900, marginTop: 2 }}>✓</span><span>{item}</span>
      </li>
    ))}
  </ul>
)
const Table = ({ headers, rows }: { headers: string[]; rows: string[][] }) => (
  <div style={{ overflowX: 'auto', marginBottom: 30 }}>
    <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13.5 }}>
      <thead><tr>{headers.map(header => <th key={header} style={{ padding: '11px 16px', textAlign: 'left', fontSize: 11, fontWeight: 800, letterSpacing: '.08em', textTransform: 'uppercase', color: K, fontFamily: FONT_MONO, borderBottom: `2px solid ${K}55`, background: `${K}0d`, minWidth: 180 }}>{header}</th>)}</tr></thead>
      <tbody>
        {rows.map((row, i) => (
          <tr key={row.join('|')} style={{ background: i % 2 === 0 ? 'var(--surface)' : 'var(--bg2)' }}>
            {row.map((cell, j) => <td key={j} style={{ padding: '12px 16px', color: j === 0 ? 'var(--text)' : 'var(--muted)', borderBottom: '1px solid var(--border)', verticalAlign: 'top', lineHeight: 1.7, fontWeight: j === 0 ? 700 : 400 }}>{cell}</td>)}
          </tr>
        ))}
      </tbody>
    </table>
  </div>
)

export default function KafkaConnect() {
  return (
    <LearnLayout
      title="Kafka Connect"
      description="What Kafka Connect actually is, source vs sink connectors, standalone vs distributed mode, configuring a real connector through the REST API, offset tracking, Single Message Transforms, converters and Schema Registry, and when to reach for Connect instead of a hand-written producer or consumer."
      section="Apache Kafka — Module 13"
      readTime="60 min"
      updatedAt="September 2026"
      breadcrumbs={[
        { label: 'Learn', href: '/learn' },
        { label: 'Apache Kafka', href: '/learn/apache-kafka' },
        { label: 'Kafka Connect', href: '/learn/apache-kafka/kafka-connect' },
      ]}
      prev={{ title: 'Consumer Design', href: '/learn/apache-kafka/consumer-design' }}
      next={{ title: 'Stream Processing and Kafka Streams', href: '/learn/apache-kafka/stream-processing-kafka-streams' }}
    >
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 01 — The problem Connect solves" />
        <SectionTitle>Kafka Connect Exists Because Integration Code Is Repetitive and Dangerous to Hand-Write</SectionTitle>
        <Para>
          Every team that adopts Kafka eventually needs to move data between Kafka and something that is
          not Kafka — a Postgres database, an Elasticsearch cluster, an S3 bucket, a Salesforce API. The
          naive approach is to write a small service: connect to the database, poll for new rows, produce
          them to a topic. Write a second small service: consume from a topic, batch the records, write
          them to S3. Multiply this by every system you need to integrate with, and you end up with a
          fleet of one-off scripts, each with its own bugs around offset handling, retries, backoff,
          schema drift, and restart behavior.
        </Para>
        <Para>
          Kafka Connect is a framework, shipped as part of Kafka itself, purpose-built to eliminate that
          repetition. It is not a new kind of broker and it is not a stream processing engine. It is a
          standardized runtime for running <strong>connectors</strong> — pluggable, configuration-driven
          components that move data between Kafka and external systems, without you writing a bespoke
          producer or consumer application for each integration.
        </Para>
        <HighlightBox>
          <Para>
            <strong>What Connect gives you, that hand-rolled glue code usually gets wrong the first few times:</strong>
          </Para>
          <Para>
            <strong>Offset management</strong> — Connect tracks exactly how far each connector has progressed
            through the external system (a database's binlog position, a file's byte offset, an API's
            pagination cursor) and persists it durably, so a restart resumes from the right place instead
            of reprocessing everything or skipping records.
          </Para>
          <Para>
            <strong>Fault tolerance</strong> — in distributed mode, Connect runs as a cluster of worker
            processes. If a worker dies, the connector tasks it was running are automatically reassigned
            to surviving workers, with no manual intervention.
          </Para>
          <Para>
            <strong>A uniform configuration and operations model</strong> — every connector, whether it
            talks to Postgres or S3 or Elasticsearch, is configured the same way (a JSON config submitted
            to a REST API) and monitored the same way. Engineers do not need to learn a new deployment
            model for every integration.
          </Para>
        </HighlightBox>
        <Para>
          The trade-off is that Connect is only as good as the connector plugin available for your system.
          For common integrations — relational databases, S3, Elasticsearch, MongoDB, Salesforce, Snowflake
          — mature, battle-tested connectors already exist, usually from Confluent, the community, or the
          vendor itself. For a bespoke internal system with business logic that does not map cleanly onto
          "read a record, write a record," you are often better off with a hand-written producer or
          consumer, which this module covers in the last section.
        </Para>
      </section>

      <Divider />

      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 02 — Source vs sink connectors" />
        <SectionTitle>Source Connectors Pull Data In, Sink Connectors Push Data Out</SectionTitle>
        <Para>
          Connect has exactly two categories of connector, and the direction of data flow is the entire
          distinction. Every connector you will ever configure is one or the other.
        </Para>
        <SubTitle>Source connectors — external system into Kafka</SubTitle>
        <Para>
          A source connector reads data from an external system and produces it into one or more Kafka
          topics. It acts as the producer so you do not have to write one. Common source connectors
          include a JDBC source connector that polls a relational database's tables and turns new or
          changed rows into Kafka records, and Debezium — the dominant open-source project for
          change data capture (CDC) — which reads a database's write-ahead log or binlog directly (rather
          than polling tables) and emits a Kafka record for every insert, update, and delete, including
          the before-and-after row state.
        </Para>
        <SubTitle>Sink connectors — Kafka into an external system</SubTitle>
        <Para>
          A sink connector consumes records from one or more Kafka topics and writes them to an external
          system. It acts as the consumer so you do not have to write one. Common sink connectors include
          an S3 sink connector that batches records and writes them as partitioned Parquet or JSON files
          in an S3 bucket, an Elasticsearch sink connector that indexes records for search, and a JDBC
          sink connector that upserts records into a relational database table.
        </Para>
        <CodeBox label="the direction rule, in one picture">
{`   External system                 Kafka                External system
  ┌────────────────┐    SOURCE    ┌───────┐    SINK    ┌────────────────┐
  │  Postgres (CDC) │ ───────────▶│ topic  │───────────▶│  S3 bucket      │
  │  via Debezium   │  connector   │  logs  │  connector │  (Parquet)      │
  └────────────────┘              └───────┘             └────────────────┘

  Source connector = Connect acting as a PRODUCER on your behalf.
  Sink connector   = Connect acting as a CONSUMER on your behalf.
  A single Connect cluster commonly runs both kinds of connector
  at once, for completely unrelated pipelines.`}
        </CodeBox>
        <Table
          headers={['', 'Source connector', 'Sink connector']}
          rows={[
            ['Data direction', 'External system → Kafka topic', 'Kafka topic → external system'],
            ['Acts as', 'A producer, written for you', 'A consumer, written for you'],
            ['Common examples', 'Debezium (CDC), JDBC source, MongoDB source', 'S3 sink, Elasticsearch sink, JDBC sink'],
            ['Tracks progress via', 'Source offsets (see Part 05) — position in the external system', 'Consumer group-style offsets — position in the Kafka topic'],
            ['Typical use', 'Stream database changes into Kafka for other services to consume', 'Land Kafka events into a data lake, search index, or warehouse'],
          ]}
        />
        <Callout title="A connector is not magic — it is still a producer or consumer under the hood" color={K}>
          It is easy to think of Connect as a black box, but every source connector is, mechanically, a
          Kafka producer with a plugin-specific way of pulling data from the outside world, and every sink
          connector is a Kafka consumer with a plugin-specific way of pushing data out. Everything you
          already know about producer batching, consumer offsets, and delivery guarantees still applies —
          Connect just standardizes the plumbing around it.
        </Callout>
      </section>

      <Divider />

      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 03 — Standalone vs distributed mode" />
        <SectionTitle>Standalone Mode Is for Local Testing. Distributed Mode Is for Production.</SectionTitle>
        <Para>
          Connect workers — the JVM processes that actually run connectors — can run in one of two modes.
          The mode is a deployment decision, not a per-connector setting; a given Connect cluster is
          entirely standalone or entirely distributed.
        </Para>
        <SubTitle>Standalone mode</SubTitle>
        <Para>
          A single worker process runs all configured connectors and tasks. Configuration lives in a local
          properties file on disk, and offsets are stored in a local file as well. There is no fault
          tolerance — if the worker process dies, every connector it was running stops, and nothing
          reassigns the work elsewhere. Standalone mode is appropriate for local development, quick
          experiments, and single-machine edge deployments where a Connect cluster would be overkill (for
          example, shipping logs from one specific edge device).
        </Para>
        <SubTitle>Distributed mode</SubTitle>
        <Para>
          Multiple worker processes form a Connect cluster. Connector configurations are submitted through
          a REST API rather than a local file, and are stored in Kafka itself (an internal config topic).
          Worker processes coordinate through Kafka's group membership protocol — the same underlying
          mechanism consumer groups use — to divide the work of running connectors and their tasks across
          available workers. If a worker fails, the connectors and tasks it was running are automatically
          rebalanced onto the surviving workers. This is the mode every production Kafka Connect deployment
          runs in.
        </Para>
        <Table
          headers={['', 'Standalone mode', 'Distributed mode']}
          rows={[
            ['Worker processes', 'Exactly one', 'A cluster of two or more, typically'],
            ['Configuration', 'Local properties file on the worker\'s filesystem', 'Submitted via REST API, stored in an internal Kafka config topic'],
            ['Offset storage', 'Local file on disk', 'An internal, replicated Kafka topic'],
            ['Fault tolerance', 'None — worker dies, connectors stop', 'Automatic — tasks rebalance to surviving workers'],
            ['Scaling', 'Not possible — one process', 'Add workers to the cluster to increase task capacity'],
            ['Use for', 'Local development, single-node edge cases', 'Production — the default assumption for this whole module'],
          ]}
        />
        <Para>
          The rest of this module assumes distributed mode, because that is what you will actually operate
          in production, and because the REST API workflow it uses is also the more instructive one to
          learn — you interact with Connect the same way whether you manage two connectors or two hundred.
        </Para>
      </section>

      <Divider />

      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 04 — Configuring a real source connector" />
        <SectionTitle>A Worked Example — Submitting a JDBC Source Connector via the REST API</SectionTitle>
        <Para>
          In distributed mode, every Connect worker exposes a REST API, typically on port 8083. You do not
          SSH into a machine and edit a file to add, update, or remove a connector — you send an HTTP
          request. This is deliberate: it means connector management can be automated, version-controlled,
          and driven from CI/CD the same way any other infrastructure configuration is.
        </Para>
        <Para>
          Consider a concrete case: FreshCart, a grocery delivery company, wants every new row inserted
          into its Postgres <code>orders</code> table to appear as an event on a Kafka topic, so the
          fulfillment service can react to it without polling the database directly. Here is the connector
          configuration, submitted as JSON.
        </Para>
        <CodeBox label="jdbc-source-orders.json — the connector configuration">
{`{
  "name": "freshcart-orders-jdbc-source",
  "config": {
    "connector.class": "io.confluent.connect.jdbc.JdbcSourceConnector",
    "tasks.max": "2",
    "connection.url": "jdbc:postgresql://db.internal:5432/freshcart",
    "connection.user": "connect_reader",
    "connection.password": "\${file:/secrets/connect-creds.properties:db_password}",
    "table.whitelist": "orders",
    "mode": "incrementing",
    "incrementing.column.name": "order_id",
    "topic.prefix": "freshcart.pg.",
    "poll.interval.ms": "5000",
    "key.converter": "org.apache.kafka.connect.json.JsonConverter",
    "key.converter.schemas.enable": "false",
    "value.converter": "io.confluent.connect.avro.AvroConverter",
    "value.converter.schema.registry.url": "http://schema-registry:8081"
  }
}`}
        </CodeBox>
        <BulletList
          items={[
            'connector.class — the fully-qualified Java class of the connector plugin. This is how Connect knows which plugin JAR to load.',
            'tasks.max — the upper bound on how many parallel tasks this connector can split its work into (see Part 04b below on tasks vs connectors).',
            'connection.url / connection.user / connection.password — connector-specific properties; the JDBC source connector defines these, an S3 sink connector would define completely different ones.',
            'mode: "incrementing" — tells the JDBC source connector how to detect new rows: by watching a strictly increasing column (order_id here) rather than a timestamp column or full-table dumps.',
            'topic.prefix — new rows from the orders table land on the topic freshcart.pg.orders (prefix + table name).',
            'key.converter / value.converter — covered in depth in Part 07; these control how record keys and values are serialized onto the topic.',
          ]}
        />
        <Para>
          Submitting this configuration is one HTTP POST to the cluster's REST endpoint.
        </Para>
        <CodeBox label="submitting the connector via curl">
{`curl -X POST http://connect-worker-1:8083/connectors \\
  -H "Content-Type: application/json" \\
  -d @jdbc-source-orders.json`}
        </CodeBox>
        <Output>{`{
  "name": "freshcart-orders-jdbc-source",
  "config": { ... },
  "tasks": [
    { "connector": "freshcart-orders-jdbc-source", "task": 0 },
    { "connector": "freshcart-orders-jdbc-source", "task": 1 }
  ],
  "type": "source"
}`}</Output>
        <SubTitle>Connectors vs tasks — where the parallelism actually lives</SubTitle>
        <Para>
          A connector itself does not move any data. It is a coordinator: it splits the overall job into
          one or more <strong>tasks</strong>, up to the <code>tasks.max</code> limit, and it is the tasks
          that actually read from or write to the external system, running on Connect workers across the
          cluster. For the JDBC source connector above, with <code>tasks.max: 2</code> and only one table
          in the whitelist, Connect will typically run just one task, since there is only one table to
          split work across. A source connector reading five tables with <code>tasks.max: 5</code> could
          run five tasks in parallel, each responsible for one table, spread across however many workers
          the cluster has.
        </Para>
        <Table
          headers={['Operation', 'Endpoint']}
          rows={[
            ['List connectors', 'GET /connectors'],
            ['Create a connector', 'POST /connectors'],
            ['Get connector status', 'GET /connectors/{name}/status'],
            ['Update connector config', 'PUT /connectors/{name}/config'],
            ['Pause a connector', 'PUT /connectors/{name}/pause'],
            ['Resume a connector', 'PUT /connectors/{name}/resume'],
            ['Restart a failed task', 'POST /connectors/{name}/tasks/{taskId}/restart'],
            ['Delete a connector', 'DELETE /connectors/{name}'],
          ]}
        />
        <Callout title="Checking connector health is a REST call, not a log grep" color="#38bdf8">
          <code>GET /connectors/{'{name}'}/status</code> returns the connector's overall state and, per
          task, whether it is RUNNING, PAUSED, or FAILED, along with a stack trace if it failed. This is
          the first place to look when a connector stops moving data — not the worker's application logs,
          though those are useful for deeper root-causing once you know which task failed and why.
        </Callout>
      </section>

      <Divider />

      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 05 — Offset tracking" />
        <SectionTitle>Connect Tracks Its Own Offsets — Separate from Consumer Group Offsets</SectionTitle>
        <Para>
          A common point of confusion: Connect offsets are not the same thing as Kafka consumer group
          offsets, even though both are called "offsets" and both serve the same conceptual purpose —
          remembering how far progress has gotten so work is not repeated or skipped after a restart.
        </Para>
        <SubTitle>Source connector offsets — position in the external system</SubTitle>
        <Para>
          A source connector's job is to track its position within the external system it is reading from,
          not within Kafka. For the JDBC source connector in Part 04, the offset is the last
          <code>order_id</code> value it has successfully read and produced. For Debezium reading a
          database's write-ahead log, the offset is a log sequence number (LSN) or binlog file-and-position
          pair. These offsets are stored by Connect itself, in an internal Kafka topic (by default named
          <code>connect-offsets</code> in distributed mode), completely independent of any consumer group.
        </Para>
        <CodeBox label="why source offsets cannot be consumer-group offsets">
{`A source connector does not consume from a Kafka topic at all --
it reads from Postgres, MongoDB, a filesystem, an API. There is no
Kafka partition and offset to track on the READ side.

Instead, Connect stores a (source partition -> source offset) pair
per connector, where "source partition" is a connector-defined
concept -- for the JDBC connector, one source partition per table:

  source partition: {"table": "orders"}
  source offset:     {"incrementing": 48213}

On restart, the JDBC source connector reads this back from the
connect-offsets topic and resumes with:
  "SELECT * FROM orders WHERE order_id > 48213 ORDER BY order_id"`}
        </CodeBox>
        <SubTitle>Sink connector offsets — ordinary consumer group offsets</SubTitle>
        <Para>
          A sink connector, by contrast, genuinely is a Kafka consumer under the hood — it consumes records
          from a topic. Its progress is tracked exactly the way any consumer group's progress is tracked:
          through the standard <code>__consumer_offsets</code> internal topic, using a consumer group ID
          derived from the connector name. This is the one place where Connect's offset model maps directly
          onto ordinary Kafka consumer semantics.
        </Para>
        <Table
          headers={['Connector type', 'What the offset represents', 'Where it is stored']}
          rows={[
            ['Source', 'Position within the external system (a row ID, a binlog LSN, a file byte offset)', 'Internal connect-offsets Kafka topic, managed by Connect'],
            ['Sink', 'Position within the Kafka topic being consumed (a normal partition + offset)', '__consumer_offsets, the same topic every consumer group uses'],
          ]}
        />
        <Callout title="Resetting a connector's offsets is not the same operation for both types" color="#ff4757">
          Resetting a stuck sink connector's progress is a familiar consumer-group offset reset. Resetting a
          stuck source connector requires deleting and recreating its entry in the connect-offsets topic (or
          using the offset-reset REST endpoint on recent Kafka versions) — a completely different mechanism,
          because there is no consumer group to reset in the first place.
        </Callout>
      </section>

      <Divider />

      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 06 — Single Message Transforms" />
        <SectionTitle>Single Message Transforms — Lightweight In-Flight Record Editing</SectionTitle>
        <Para>
          Often you need a small, mechanical change to every record passing through a connector — rename a
          field, drop a sensitive column, add a static field, route records to different topics based on a
          value — without writing and deploying a full transformation pipeline. Single Message Transforms
          (SMTs) are Connect's answer: small, chainable, configuration-only transformations applied to each
          record as it passes through a connector, before a source connector's record reaches Kafka, or
          before a sink connector's record reaches the external system.
        </Para>
        <SubTitle>A worked example — masking a sensitive field and renaming a column</SubTitle>
        <Para>
          Continuing the FreshCart example: the <code>orders</code> table includes a
          <code>customer_email</code> column, which should not be broadcast onto a Kafka topic that many
          internal services can read, and a legacy column name, <code>cust_id</code>, that downstream
          consumers expect renamed to <code>customer_id</code>.
        </Para>
        <CodeBox label="SMT chain added to the connector config">
{`{
  "transforms": "maskEmail,renameCustomerId",

  "transforms.maskEmail.type": "org.apache.kafka.connect.transforms.MaskField$Value",
  "transforms.maskEmail.fields": "customer_email",
  "transforms.maskEmail.replacement": "REDACTED",

  "transforms.renameCustomerId.type": "org.apache.kafka.connect.transforms.ReplaceField$Value",
  "transforms.renameCustomerId.renames": "cust_id:customer_id"
}`}
        </CodeBox>
        <Para>
          The <code>transforms</code> property lists the transform names in the order they are applied —
          order matters, because each transform receives the output of the one before it. Each named
          transform then gets its own <code>transforms.&lt;name&gt;.type</code> and
          <code>transforms.&lt;name&gt;.*</code> configuration properties, exactly like a connector gets
          its own <code>connector.class</code> and connector-specific properties.
        </Para>
        <Table
          headers={['Common SMT', 'What it does']}
          rows={[
            ['MaskField', 'Replaces a field\'s value with a fixed replacement, or a hash — for redacting PII before it reaches a topic'],
            ['ReplaceField', 'Renames, includes, or excludes specific fields'],
            ['InsertField', 'Adds a new field with a static value or metadata (e.g. the source connector\'s name, a timestamp)'],
            ['TimestampConverter', 'Converts between timestamp formats — epoch millis, string, Date'],
            ['RegexRouter', 'Rewrites the destination topic name using a regex — commonly used to route records into per-tenant or per-region topics'],
            ['Flatten', 'Flattens a nested record structure into a flat one, or the reverse'],
          ]}
        />
        <Callout title="SMTs are for mechanical edits, not business logic" color={K}>
          The rule of thumb: if the transformation can be described in one sentence without an "if this
          customer, then..." branch, an SMT is probably the right tool. Real business logic — joining data
          from another topic, computing a derived value that depends on external state, conditional routing
          based on complex rules — belongs in a stream processing job (Module 14) or a custom application,
          not in an SMT chain. SMTs that grow too elaborate are a sign the transformation has outgrown Connect.
        </Callout>
      </section>

      <Divider />

      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 07 — Converters and Schema Registry" />
        <SectionTitle>Converters — How Connect Serializes Record Keys and Values</SectionTitle>
        <Para>
          A converter is the component that translates between Connect's internal, in-memory representation
          of a record and the actual bytes stored on a Kafka topic (for a source connector) or read from a
          Kafka topic (for a sink connector). Every connector configuration sets a
          <code>key.converter</code> and a <code>value.converter</code>, and it is entirely normal — and
          common — for the two to differ, since keys are often simple strings or numbers while values carry
          the full record structure.
        </Para>
        <SubTitle>JSON converter — simple, but no schema enforcement</SubTitle>
        <Para>
          <code>org.apache.kafka.connect.json.JsonConverter</code> serializes records as plain JSON. It is
          simple to inspect and debug — you can read the raw bytes on a topic with any JSON-aware tool — but
          it carries no schema enforcement at all. Nothing prevents a producer from silently changing a
          field's type or removing a field, and every consumer discovers this only when its own
          deserialization or business logic breaks.
        </Para>
        <SubTitle>Avro converter with Schema Registry — schema enforcement across the pipeline</SubTitle>
        <Para>
          <code>io.confluent.connect.avro.AvroConverter</code> serializes records as Avro binary, registering
          the record's schema with a separate Schema Registry service the first time it is used, and storing
          only a small schema ID alongside the compact binary payload in each Kafka record after that. Every
          consumer of the topic — whether another Connect sink connector, a Kafka Streams application, or a
          hand-written consumer — looks up that schema ID against the same Schema Registry to know exactly
          how to deserialize the bytes, and the registry can be configured to reject schema changes that
          would break existing consumers.
        </Para>
        <CodeBox label="the same record, two converter choices">
{`# With JsonConverter -- readable, unenforced:
{"order_id": 48213, "customer_id": "C-991", "total_cents": 4599}

# With AvroConverter + Schema Registry -- compact binary, schema-checked:
# (not human-readable on the wire -- shown here as what it decodes to)
magic byte | schema_id=117 | <avro-encoded binary payload>

# A downstream consumer with AvroConverter configured:
# 1. Reads schema_id=117 from the record header
# 2. Fetches schema 117 from the Schema Registry (cached after first lookup)
# 3. Decodes the binary payload using that exact schema
# If the producer's schema changes incompatibly, the Schema Registry
# rejects the new schema at registration time -- before it ever
# reaches a topic and breaks a downstream consumer.`}
        </CodeBox>
        <Table
          headers={['Converter', 'Format on the wire', 'Schema enforcement', 'When to use']}
          rows={[
            ['JsonConverter', 'Plain JSON text', 'None — any shape can be written at any time', 'Prototyping, low-stakes topics, or when nothing downstream needs strict schema guarantees'],
            ['AvroConverter', 'Compact Avro binary + schema ID', 'Full — Schema Registry enforces compatibility rules on every write', 'Production pipelines feeding multiple downstream consumers, especially across teams'],
            ['ProtobufConverter / JsonSchemaConverter', 'Protobuf or JSON Schema-validated binary', 'Full, same registry mechanism as Avro', 'Teams already standardized on Protobuf or JSON Schema elsewhere in their stack'],
          ]}
        />
        <Callout title="Key and value converter mismatches are a common source of connector startup failures" color="#ff4757">
          If a sink connector's <code>value.converter</code> is set to <code>AvroConverter</code> but the
          topic it is reading was actually written with <code>JsonConverter</code>, every record fails to
          deserialize and the connector's task fails immediately with a converter exception. The converter
          configuration on a sink connector must match how the data was actually serialized when it was
          written — Connect has no way to auto-detect this.
        </Callout>
      </section>

      <Divider />

      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 08 — Delivery guarantees" />
        <SectionTitle>What Delivery Guarantee Does Connect Actually Give You?</SectionTitle>
        <Para>
          Because a source connector is really a producer and a sink connector is really a consumer, the
          delivery guarantees from earlier modules apply directly, and it is worth being precise about
          which guarantee you are actually getting by default.
        </Para>
        <SubTitle>Source connectors — at-least-once by default</SubTitle>
        <Para>
          A source connector commits its source offset only after the corresponding record has been
          successfully produced to Kafka. If the connector crashes after producing a record but before
          persisting the updated offset, it will re-read and re-produce that same record on restart —
          at-least-once delivery, meaning downstream consumers can see the same record twice. Some source
          connectors, including recent versions of Debezium with idempotent producer settings enabled and
          exactly-once support in newer Connect versions, can reduce this to effectively-once for specific
          setups, but the safe default assumption for any source connector is at-least-once.
        </Para>
        <SubTitle>Sink connectors — depends on the target system's own idempotency</SubTitle>
        <Para>
          A sink connector, being a consumer, commits its Kafka offset after writing to the external system.
          The same at-least-once risk applies in the other direction: a crash between writing to the
          external system and committing the offset causes the same record to be written again on restart.
          Whether that matters depends entirely on whether the write to the external system is naturally
          idempotent — an upsert into a database keyed by a unique ID tolerates a duplicate write with no
          visible effect, while an S3 sink appending records to a file, or a message queue that does not
          deduplicate, can end up with genuine duplicates.
        </Para>
        <Table
          headers={['Connector type', 'Default guarantee', 'How duplicates are avoided in practice']}
          rows={[
            ['Source', 'At-least-once', 'Downstream consumers should be idempotent, or the source system\'s ID should be used as the Kafka record key so downstream compaction/upserts naturally deduplicate'],
            ['Sink', 'At-least-once', 'Prefer sink connectors and target systems that write via upsert/idempotent keys (JDBC sink upsert mode, Elasticsearch indexing by document ID) over pure appends'],
          ]}
        />
      </section>

      <Divider />

      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 09 — Error handling inside Connect" />
        <SectionTitle>Errors Tolerance and Dead Letter Queues — Connect Has Its Own Built-In DLQ Pattern</SectionTitle>
        <Para>
          A hand-written consumer needs custom code to route a poison message to a dead letter queue rather
          than blocking the whole partition, as covered in the message-brokers module. Connect builds this
          pattern in directly, as a small set of connector-level configuration properties, so you rarely
          need to write DLQ-handling logic yourself for a sink connector's conversion or transformation
          failures.
        </Para>
        <SubTitle>errors.tolerance — stop on the first bad record, or skip it and keep going</SubTitle>
        <Para>
          By default, <code>errors.tolerance</code> is <code>none</code> — the first record that fails to
          convert, transform, or be written to the target system fails the entire connector task, and the
          task stops until an operator intervenes. Setting <code>errors.tolerance</code> to
          <code>all</code> tells the connector to skip the offending record, log the failure, and keep
          processing subsequent records — the Connect equivalent of the retry-then-DLQ loop covered for
          hand-written consumers.
        </Para>
        <CodeBox label="error handling properties added to a sink connector config">
{`{
  "errors.tolerance": "all",
  "errors.log.enable": "true",
  "errors.log.include.messages": "true",

  "errors.deadletterqueue.topic.name": "freshcart.orders.dlq",
  "errors.deadletterqueue.topic.replication.factor": "3",
  "errors.deadletterqueue.context.headers.enable": "true"
}`}
        </CodeBox>
        <Para>
          With these properties set, a record that fails deserialization, an SMT, or the write to the
          target system is routed to the configured DLQ topic instead of stopping the task, and — with
          <code>errors.deadletterqueue.context.headers.enable</code> set — Connect attaches headers to the
          DLQ record recording exactly which connector, task, and stage the failure happened at, and the
          original topic, partition, and offset, mirroring the manually-constructed DLQ event structure
          covered in the message-brokers module, but produced automatically by the framework.
        </Para>
        <Table
          headers={['Setting', 'What it controls']}
          rows={[
            ['errors.tolerance', '"none" (default) fails the task on the first bad record; "all" skips it and continues'],
            ['errors.log.enable', 'Whether failure details are written to the Connect worker\'s own application log, independent of the DLQ'],
            ['errors.deadletterqueue.topic.name', 'The Kafka topic failed records (sink connectors only) are routed to — must be created or auto-creation must be enabled'],
            ['errors.retry.timeout / errors.retry.delay.max.ms', 'How long and how aggressively Connect retries a transient failure before treating it as a permanent one and applying the tolerance policy'],
          ]}
        />
        <Callout title="The built-in DLQ is sink-connector-only" color="#ff4757">
          <code>errors.deadletterqueue.topic.name</code> only applies to sink connectors, because it routes
          failed records to a Kafka topic — and a source connector's failures happen on the way into Kafka,
          before there is anywhere within Kafka to route a DLQ record to. A source connector's errors are
          handled through <code>errors.tolerance</code> and logging alone; there is no equivalent DLQ
          destination for a source-side failure.
        </Callout>
      </section>

      <Divider />

      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 10 — Operating Connect" />
        <SectionTitle>Monitoring and Operating a Connect Cluster in Production</SectionTitle>
        <Para>
          Connect exposes its own set of JMX metrics, separate from broker and consumer metrics, and
          because a single Connect cluster commonly runs many unrelated connectors at once, monitoring
          needs to be per-connector and per-task, not just cluster-wide.
        </Para>
        <Table
          headers={['Metric', 'What it tells you']}
          rows={[
            ['connector-status (via REST, or the status metric)', 'Whether the connector as a whole, and each of its tasks individually, is RUNNING, PAUSED, or FAILED'],
            ['source-record-poll-rate / sink-record-send-rate', 'Throughput — records per second flowing through a source or sink connector, the equivalent of producer/consumer throughput metrics'],
            ['source-record-write-rate', 'For a source connector, how many of the polled records were actually successfully produced to Kafka — a gap versus poll-rate points at production-side failures'],
            ['task-count vs tasks.max', 'Whether the connector is actually running the number of tasks it was configured for, or has fewer running due to failures'],
            ['deadletterqueue-produce-requests / deadletterqueue-produce-failures', 'How often records are being routed to the DLQ, and whether the DLQ write itself is succeeding — a silently failing DLQ write is a double failure'],
          ]}
        />
        <Para>
          Operationally, the single highest-leverage practice is alerting on any task transitioning to
          FAILED state, since Connect does not automatically retry a permanently failed task — it sits idle
          until an operator issues a <code>POST /connectors/{'{name}'}/tasks/{'{taskId}'}/restart</code> or
          diagnoses and fixes the underlying cause. A connector silently stuck in FAILED for hours is one of
          the most common causes of a "why hasn't data shown up in three hours" incident, and it produces no
          error on the producing or consuming side of the pipeline — from outside Connect, data simply stops
          flowing.
        </Para>
        <CodeBox label="a minimal but effective Connect alerting rule">
{`# Pseudocode for a monitoring check run every minute per connector:

for connector in list_connectors():
    status = get_connector_status(connector)
    if status.connector.state == "FAILED":
        alert(f"Connector {connector} itself has FAILED")
    for task in status.tasks:
        if task.state == "FAILED":
            alert(f"Connector {connector} task {task.id} has FAILED: "
                  f"{task.trace}")
        if task.state == "PAUSED" and not connector.expected_paused:
            alert(f"Connector {connector} task {task.id} is unexpectedly PAUSED")`}
        </CodeBox>
        <Callout title="Connect security follows the same model as any other Kafka client" color="#38bdf8">
          Because every connector is, mechanically, a producer or a consumer, Connect workers authenticate
          to the Kafka cluster the same way any client does — SASL/TLS credentials configured on the
          worker, with ACLs granting the worker's principal permission to produce to or consume from the
          specific topics its connectors need. A separate, second layer of authentication protects the
          Connect REST API itself (basic auth or a bearer token, commonly placed behind an API gateway),
          since the REST API is what lets someone submit or modify a connector configuration — arguably as
          sensitive an operation as direct topic access, since a malicious connector config can exfiltrate
          data to an arbitrary external endpoint.
        </Callout>
      </section>

      <Divider />

      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 10b — Rebalancing and scaling a Connect cluster" />
        <SectionTitle>How a Distributed Connect Cluster Actually Rebalances Work</SectionTitle>
        <Para>
          A distributed Connect cluster's workers coordinate the same way a consumer group does, because
          under the hood they use the same group membership protocol described in Module 03 — one worker
          acts as the group leader, and the set of connectors and tasks is divided among all currently
          active workers. Adding a worker, removing one, or a worker crashing all trigger a rebalance, in
          which tasks are redistributed across whichever workers are currently part of the cluster.
        </Para>
        <SubTitle>Incremental cooperative rebalancing — the current default</SubTitle>
        <Para>
          Older Connect versions used eager rebalancing: every worker stopped every task it was running the
          moment any rebalance began, even tasks that would be reassigned right back to the same worker, and
          the whole cluster paused until every worker had its new assignment. Current Connect versions
          default to incremental cooperative rebalancing — the same underlying idea as the cooperative
          consumer group protocol covered in Module 03 — where only the specific tasks that actually need to
          move are stopped and reassigned, and every other task on every unaffected worker keeps running
          uninterrupted through the rebalance.
        </Para>
        <CodeBox label="a worker joining a 2-worker Connect cluster, cooperative rebalancing">
{`Before: worker-1 runs tasks [A-0, A-1, B-0]
        worker-2 runs tasks [B-1, C-0]

worker-3 joins the cluster.

Eager rebalancing (old):
  ALL five tasks are revoked across worker-1 and worker-2.
  Cluster is idle while a brand new full assignment is computed
  and handed out -- even A-0, which ends up back on worker-1.

Incremental cooperative rebalancing (current default):
  Only the minimal set of tasks needed to balance load moves --
  e.g. B-0 moves from worker-1 to worker-3, C-0 moves from
  worker-2 to worker-3. A-0, A-1, and B-1 never stop running.
  Net result: 2 tasks paused briefly, not all 5.`}
        </CodeBox>
        <Para>
          The practical takeaway for operating a Connect cluster is that scaling it out — adding workers to
          handle more connectors or higher-throughput tasks — is a low-disruption operation on current
          Connect versions, similar to how a rolling deploy of a well-configured consumer group is low
          disruption. This is part of why distributed mode is unambiguously the right choice for any
          production deployment, beyond just the fault-tolerance argument from Part 03.
        </Para>
        <Table
          headers={['Event', 'What happens to running tasks']}
          rows={[
            ['A new worker joins', 'Some tasks are reassigned to the new worker to balance load; unaffected tasks keep running (cooperative rebalancing)'],
            ['A worker is gracefully stopped', 'Its tasks are reassigned to remaining workers; a brief pause only for the tasks that were on that worker'],
            ['A worker crashes without warning', 'The cluster detects the missed session heartbeat and reassigns that worker\'s tasks once the session timeout elapses — slightly slower than a graceful stop, since the failure has to be detected first'],
            ['A connector\'s config is updated (PUT /connectors/{name}/config)', 'Only that connector\'s own tasks restart with the new configuration; other connectors are unaffected'],
          ]}
        />
      </section>

      <Divider />

      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 10c — Header converters and naming conventions" />
        <SectionTitle>Header Converters, and Why Topic and Connector Naming Discipline Matters at Scale</SectionTitle>
        <Para>
          Kafka records carry an optional set of key-value headers separate from the record's key and
          value — small pieces of metadata attached to a record without needing to be part of its actual
          payload schema. Connect has a third converter setting, <code>header.converter</code>, alongside
          <code>key.converter</code> and <code>value.converter</code>, controlling how those headers are
          serialized. Most teams leave this at the simple default,
          <code>org.apache.kafka.connect.storage.SimpleHeaderConverter</code>, since headers are typically
          small, loosely-typed metadata (a trace ID, a source system tag) rather than data that benefits
          from the same schema enforcement the record value gets from Avro and Schema Registry.
        </Para>
        <SubTitle>Naming conventions become an operational necessity, not a nicety</SubTitle>
        <Para>
          A single Connect cluster in a mid-sized company commonly runs dozens to low hundreds of connectors
          within a year of adoption — one per table being CDC'd, one per destination system, often
          multiplied across environments. Without a naming convention, `GET /connectors` returns an
          unreadable list, and figuring out which connector produces to which topic, and why a given topic
          suddenly has no new data, becomes a manual archaeology exercise.
        </Para>
        <CodeBox label="a naming convention that scales past the first handful of connectors">
{`Connector name pattern:
  {source-or-sink}-{system}-{entity}-{env}

  source-postgres-orders-prod
  source-postgres-customers-prod
  sink-s3-orders-archive-prod
  sink-elasticsearch-orders-search-prod

Topic name pattern (source connectors):
  {company}.{source-system}.{entity}

  freshcart.pg.orders
  freshcart.pg.customers

DLQ topic pattern (Part 09):
  {original-topic}.dlq

  freshcart.pg.orders.dlq`}
        </CodeBox>
        <Para>
          The specific convention matters less than having one applied consistently from the very first
          connector — retrofitting a naming scheme across dozens of already-deployed connectors and their
          downstream consumers is a much larger, riskier migration than establishing the pattern before the
          second connector is ever created.
        </Para>
        <Table
          headers={['Without a naming convention', 'With one']}
          rows={[
            ['"orders-connector-2" — what does it do, source or sink, which environment?', '"source-postgres-orders-prod" — self-describing from the name alone'],
            ['Finding every connector touching the orders table requires reading every config', 'A substring match on "orders" in connector or topic names finds everything at once'],
            ['DLQ topics scattered with inconsistent names, easy to miss when alerting', 'Every DLQ topic matches a predictable *.dlq suffix — one alerting rule covers all of them'],
          ]}
        />
      </section>

      <Divider />

      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 10d — Exactly-once source connectors" />
        <SectionTitle>Exactly-Once Support for Source Connectors — A Newer, Connector-Specific Guarantee</SectionTitle>
        <Para>
          Part 08 established that source connectors default to at-least-once delivery. Newer versions of
          Connect (Kafka 3.3 and later) support an opt-in exactly-once mode for source connectors,
          <code>exactly.once.source.support</code>, but — unlike Kafka Streams' <code>exactly_once_v2</code>
          from Module 14, which applies uniformly to any Kafka Streams topology — exactly-once source
          support in Connect must be explicitly implemented by each individual connector plugin. Enabling
          the worker-level setting does nothing on its own for a connector plugin that was never built to
          support it.
        </Para>
        <CodeBox label="worker-level and connector-level configuration for exactly-once sources">
{`# On every worker's connect-distributed.properties:
exactly.once.source.support=enabled

# On the specific connector's config, IF that connector plugin
# actually implements transactional source support:
{
  "name": "freshcart-orders-jdbc-source",
  "config": {
    "connector.class": "io.confluent.connect.jdbc.JdbcSourceConnector",
    "transaction.boundary": "poll",
    ...
  }
}

# A connector plugin that does NOT implement this support simply
# ignores the setting and continues operating at-least-once --
# Connect does not error out, which makes this easy to misconfigure
# and assume a guarantee that was never actually granted.`}
        </CodeBox>
        <Table
          headers={['', 'Kafka Streams exactly_once_v2', 'Connect exactly-once source support']}
          rows={[
            ['Applies to', 'Any Kafka Streams topology uniformly', 'Only connectors whose plugin explicitly implements it'],
            ['Enabling it is enough on its own?', 'Yes — it is a framework-level guarantee', 'No — the specific connector plugin must also support it, or the setting has no effect'],
            ['How you verify it actually applies', 'It always applies once configured', 'Check the specific connector\'s own documentation for exactly-once support before relying on it'],
          ]}
        />
        <Callout title="Never assume exactly-once source support without checking the specific connector's documentation" color="#ff4757">
          Because Connect silently continues operating at-least-once when a connector plugin doesn't
          implement exactly-once source support, a team can enable <code>exactly.once.source.support</code>
          at the worker level, believe they've eliminated duplicate risk, and be wrong — with no error or
          warning surfaced anywhere. Confirm the specific connector plugin's release notes or documentation
          explicitly claim exactly-once source support before depending on it for anything where duplicates
          have a real cost.
        </Callout>
        <Para>
          In practice, most teams that need a true end-to-end exactly-once guarantee for a database
          integration reach for Debezium specifically, since it has invested heavily in transactional source
          support and is the most widely deployed CDC connector in production Kafka deployments — but even
          then, the guarantee only covers the Debezium-to-Kafka leg. Anything downstream still needs its own
          idempotency handling, exactly as covered for sink connectors in Part 08, unless that downstream
          consumer is itself a Kafka Streams application running exactly_once_v2 against the same cluster.
        </Para>
        <Para>
          The pragmatic default worth remembering across this entire module: assume at-least-once unless you
          have specifically verified otherwise for both the connector plugin in use and the version of
          Connect it is deployed on, since the exactly-once story for source connectors has changed across
          Kafka versions and is not uniformly available the way it is for Kafka Streams topologies covered
          in Module 14.
        </Para>
        <Para>
          That framing — check the specific plugin and version rather than trusting a framework-wide
          assumption — is also the right instinct for converter compatibility (Part 07), SMT behavior across
          Connect versions (Part 06), and error-handling configuration defaults (Part 09): Connect
          standardizes the operational surface across every connector, but the actual guarantees underneath
          that surface are still connector-specific, and reading the specific plugin's documentation before
          depending on any of them in production is not optional diligence — it is the only way to know what
          you actually have.
        </Para>
      </section>

      <Divider />

      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 10e — Deploying Connect workers" />
        <SectionTitle>Deploying Connect Workers — What Actually Runs in Production</SectionTitle>
        <Para>
          A Connect worker is a JVM process started from the Kafka distribution's
          <code>connect-distributed.sh</code> script (or the equivalent entry point in a container image),
          pointed at a properties file containing cluster-wide settings — bootstrap servers, the internal
          config/offset/status topic names, and converter defaults that individual connectors can override.
          In production, teams almost always run Connect workers as containers under Kubernetes or a similar
          orchestrator, precisely because the cooperative rebalancing behavior from Part 10b tolerates
          workers being added, removed, or replaced gracefully — a property container orchestration takes
          advantage of naturally during rolling deploys and autoscaling.
        </Para>
        <CodeBox label="the shape of a worker's cluster-wide properties file">
{`bootstrap.servers=broker-1:9092,broker-2:9092,broker-3:9092
group.id=freshcart-connect-cluster

# Internal topics Connect creates and manages itself
config.storage.topic=connect-configs
offset.storage.topic=connect-offsets
status.storage.topic=connect-status
config.storage.replication.factor=3
offset.storage.replication.factor=3
status.storage.replication.factor=3

# Cluster-wide default converters -- individual connectors can override these
key.converter=org.apache.kafka.connect.json.JsonConverter
value.converter=io.confluent.connect.avro.AvroConverter
value.converter.schema.registry.url=http://schema-registry:8081

plugin.path=/usr/share/kafka/plugins`}
        </CodeBox>
        <Para>
          The three internal topics — config, offset, and status storage — are what make distributed mode
          genuinely distributed: every worker in the cluster reads from these same topics, so any worker can
          answer a REST request about any connector's configuration or status, and a newly-joined worker
          picks up the full picture of what the cluster is currently running just by consuming these topics
          from the beginning, with no manual state transfer needed.
        </Para>
        <Table
          headers={['Internal topic', 'What it stores', 'Sizing guidance']}
          rows={[
            ['connect-configs', 'Every connector\'s current configuration — small, low-volume, compacted', 'A single partition is typically sufficient; this topic is never a throughput bottleneck'],
            ['connect-offsets', 'Source connector offsets (Part 05) — one entry per source partition per connector', 'Multiple partitions for higher-volume clusters with many source connectors tracking many tables/entities'],
            ['connect-status', 'Live connector and task state (RUNNING/FAILED/PAUSED), read by the REST API status endpoints', 'A handful of partitions; written to frequently on state transitions but each write is tiny'],
          ]}
        />
      </section>

      <Divider />

      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 11 — Connect vs a hand-written producer or consumer" />
        <SectionTitle>When Connect Is the Right Tool — and When It Is Not</SectionTitle>
        <Para>
          Connect is a force multiplier for standard integrations, but it is not a universal replacement
          for application code that talks to Kafka. The deciding question is whether the integration is
          "move data from system A to system B, shaped roughly as-is" or whether it requires real business
          logic that a generic connector and a short SMT chain cannot express.
        </Para>
        <SubTitle>Reach for Kafka Connect when</SubTitle>
        <BulletList
          items={[
            'A mature, well-maintained connector already exists for the system you need to integrate with — writing a bespoke integration for a solved problem is wasted engineering time.',
            'The transformation needed is mechanical: renaming fields, masking a column, adding a static field, routing by a simple rule — squarely within what an SMT chain can express.',
            'You want the integration to be config-driven and REST-managed rather than a deployable application — useful for teams that want data engineers, not software engineers, to own and adjust connectors.',
            'You need the fault tolerance and rebalancing that a Connect cluster gives you for free, without writing that coordination logic yourself.',
          ]}
        />
        <SubTitle>Write a custom producer or consumer when</SubTitle>
        <BulletList
          items={[
            'The integration requires real business logic — conditional processing, calling another service mid-pipeline, joining against data that is not simply another Kafka topic or the source database itself.',
            'No connector exists for the system, and building one would take longer than a purpose-built application, particularly for a one-off or low-volume integration.',
            'You need fine-grained control over batching, partitioning strategy, or error handling that goes beyond what a connector\'s configuration surface exposes.',
            'The integration is really a stream processing job — aggregating, joining, or windowing events — which belongs in Kafka Streams (Module 14), not in a source or sink connector.',
          ]}
        />
        <CodeBox label="a decision FreshCart actually made">
{`Need: stream Postgres 'orders' table changes into Kafka.
  -> Debezium source connector. Solved problem, mature connector,
     mechanical mapping (row change -> Kafka record). Connect wins.

Need: land order events into S3 as Parquet, partitioned by date.
  -> S3 sink connector. Solved problem, standard partitioning
     behavior is exactly what the connector already does. Connect wins.

Need: when an order is marked "high fraud risk" by ML scoring AND
the customer has 2+ chargebacks in 90 days, call the risk API,
hold the order, and notify a Slack channel.
  -> Custom consumer. This is multi-step conditional business logic
     with an external API call and a lookup against historical state
     -- far beyond an SMT chain, and not a stream processing
     aggregation either. Hand-written service wins.`}
        </CodeBox>
        <Callout title="Connect and custom code are not mutually exclusive" color="#38bdf8">
          A mature Kafka platform typically runs both side by side: Connect handles the boring, high-volume,
          mechanical integrations (databases, S3, search indexes), freeing engineering time for the
          hand-written services and stream processing jobs that actually encode the business's unique logic.
          Treating this as an either/or choice at the platform level is a common early mistake — the right
          question is per-integration, not per-company.
        </Callout>
      </section>

      <Divider />

      <section style={{ marginBottom: 64 }} data-toc-kind="myth">
        <SectionTag text="// Misconceptions" />
        <SectionTitle>Five Misconceptions About Kafka Connect</SectionTitle>
        {[
          {
            wrong: '"Kafka Connect is a separate product you install instead of Kafka"',
            right: 'Part 01 is explicit that Connect ships as part of Kafka itself, as a framework for running connector plugins. It runs its own worker processes, distinct from brokers, but it is not a competing or optional add-on system — it is the standard way to do bulk integration with Kafka.',
          },
          {
            wrong: '"A connector moves data itself — tasks.max is just a performance tuning knob"',
            right: 'Part 04\'s connectors-vs-tasks breakdown is precise about this: the connector coordinates and splits work, but tasks are what actually read from or write to the external system. Setting tasks.max higher than the connector can actually split work into (e.g. more tasks than tables) does not create more parallelism — the connector still only creates as many tasks as it has independent units of work.',
          },
          {
            wrong: '"Source connector offsets and consumer group offsets are the same mechanism"',
            right: 'Part 05 draws the distinction directly: a source connector tracks its position in the external system (a row ID, a binlog position) in an internal connect-offsets topic, while only sink connectors — which are genuinely consumers — use ordinary __consumer_offsets. Resetting one does not touch the other.',
          },
          {
            wrong: '"SMTs can replace a stream processing job if you chain enough of them together"',
            right: 'Part 06 and Part 09 both draw this line explicitly: SMTs are for mechanical, single-record, config-only edits. Anything involving a join, an aggregation, a window, or a lookup against external state belongs in Kafka Streams, covered in Module 14, not in a growing SMT chain that becomes unreadable and untestable.',
          },
          {
            wrong: '"Kafka Connect guarantees exactly-once delivery out of the box"',
            right: 'Part 08 is direct about this: the default assumption for both source and sink connectors is at-least-once delivery. True exactly-once requires specific connector support and configuration (and is not universally available across all connector plugins) — never assume it without checking the specific connector\'s documentation.',
          },
        ].map((item, i) => (
          <div key={i} style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 10, padding: '20px 24px', marginBottom: 16 }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--red,#ff4757)', marginBottom: 8, fontFamily: FONT_MONO }}>✕ &quot;{item.wrong}&quot;</div>
            <div style={{ fontSize: 14, color: 'var(--muted)', lineHeight: 1.7 }}>{item.right}</div>
          </div>
        ))}
      </section>

      <Divider />

      <section style={{ marginBottom: 64 }} data-toc-kind="story">
        <SectionTag text="// What This Looks Like at Work" />
        <SectionTitle>What This Looks Like on Day One</SectionTitle>
        <HighlightBox>
          <Para>
            <strong>At Toast:</strong> the payments platform team needs every new row in a restaurant's
            order-history table replicated into Kafka so the analytics team can build near-real-time
            dashboards without hammering the production database with polling queries. Rather than writing
            and operating a custom polling service, they deploy a Debezium source connector against a read
            replica, configure <code>tasks.max</code> per table volume, and use Part 06's SMT pattern to
            mask a `card_last_four` field before it ever reaches a topic other teams can subscribe to. The
            entire integration is a JSON config and a REST POST, not a new deployable service to maintain.
          </Para>
        </HighlightBox>
        <HighlightBox>
          <Para>
            <strong>At Rippling:</strong> the data platform team is asked why an S3 sink connector landing
            payroll events keeps failing its tasks after a schema change to the source topic. Following
            Part 07, they check the sink connector's <code>value.converter</code> configuration against the
            Schema Registry compatibility mode on that topic and find a required field was added without a
            default value — a backward-incompatible change the registry should have rejected at write time
            but didn't, because the producer's client library had compatibility checking disabled. Fixing
            the compatibility mode, not the connector, is the actual root cause.
          </Para>
        </HighlightBox>
        <HighlightBox>
          <Para>
            <strong>In a systems design interview:</strong> "How would you get changes from a production
            database into Kafka without adding load to the database from polling?" The strong answer,
            straight from Part 02, is change data capture via a tool like Debezium, which reads the
            database's write-ahead log directly rather than issuing SELECT queries — a fundamentally
            different, much lower-impact mechanism than a JDBC source connector's polling mode, and the
            answer a database-conscious interviewer is listening for.
          </Para>
        </HighlightBox>
      </section>

      <Divider />

      <section style={{ marginBottom: 64 }} data-toc-kind="prep">
        <SectionTag text="// Interview Prep" />
        <SectionTitle>5 Interview Questions — With Complete Answers</SectionTitle>
        {[
          {
            q: 'Q1. What is the difference between a source connector and a sink connector, and how does each get its fault tolerance in production?',
            a: `A source connector reads from an external system and produces into Kafka — it is effectively a producer Connect writes for you. A sink connector consumes from Kafka and writes to an external system — effectively a consumer Connect writes for you. Debezium and a JDBC source connector are examples of the former; an S3 sink or Elasticsearch sink connector are examples of the latter, as covered in Part 02.

Both get their fault tolerance the same way: by running in distributed mode, as Part 03 covers. A Connect cluster of multiple worker processes coordinates using Kafka's own group membership protocol, the same mechanism consumer groups use for partition assignment. If a worker dies, the tasks it was running — whether source or sink — are automatically reassigned to the surviving workers, with no manual intervention needed.

I'd add that standalone mode exists but has none of this — it's a single process with local file-based config and offsets, appropriate only for local development or single-machine edge cases, never for anything production needs to stay up.`,
          },
          {
            q: 'Q2. Walk me through how a source connector avoids reprocessing all of a database\'s data every time it restarts.',
            a: `This comes down to source offset tracking, covered in Part 05. A source connector doesn't track a Kafka offset on the read side — there's no Kafka partition being consumed. Instead, Connect stores a connector-defined (source partition, source offset) pair for each unit of work — for the JDBC source connector, typically one entry per table, where the offset is the last value seen in an incrementing or timestamp column.

This is persisted in an internal Kafka topic, connect-offsets by default, separate from the ordinary __consumer_offsets topic that only sink connectors use. On restart, the connector reads back its last committed offset for each source partition and resumes from there — for example, re-issuing a query filtered to rows newer than the last-seen ID.

The guarantee this gives you is at-least-once, not exactly-once, by default: if the connector crashes after producing a record to Kafka but before its offset commit is persisted, it will re-read and re-produce that same record on restart. Whether that matters depends on whether downstream consumers are idempotent or the record's natural key is used to deduplicate.`,
          },
          {
            q: 'Q3. When would you choose Kafka Connect for an integration, and when would you write a custom producer or consumer instead?',
            a: `Part 09 is the reference framework here. Connect is the right call when a mature connector already exists for the system in question and the transformation needed is mechanical — renaming a field, masking PII, adding a static field, simple topic routing — all things a Single Message Transform chain can express in configuration alone.

I'd reach for a custom producer or consumer when the integration requires real business logic: conditional processing based on multiple signals, calling out to another service mid-pipeline, or anything that needs state beyond what a single record carries. I'd also write custom code if no connector exists for the target system and building a proper one would take longer than a purpose-built, narrower application solves the actual need.

The two aren't mutually exclusive at the platform level — most production Kafka setups run Connect for the boring, high-volume, mechanical integrations, and reserve custom services and stream processing jobs (Kafka Streams, Module 14) for logic that's genuinely specific to the business.`,
          },
          {
            q: 'Q4. What is a Single Message Transform, and what is it not appropriate for?',
            a: `An SMT is a small, chainable, configuration-only transformation applied to each record as it passes through a connector — before a source connector's record reaches Kafka, or before a sink connector's record reaches the external system. Part 06 covers common built-in ones: MaskField for redacting sensitive columns, ReplaceField for renaming or dropping fields, InsertField for adding static metadata, and RegexRouter for rewriting destination topic names.

The transforms property on a connector config lists the chain in order, and each named transform gets its own type and configuration properties, similar to how the connector itself is configured.

What it's not appropriate for is anything resembling business logic — a conditional branch based on multiple fields, a join against another data source, an aggregation over time. SMTs operate on one record at a time with no access to external state or other records. That kind of logic belongs in a stream processing job or a custom application; trying to force it into a long SMT chain produces something unreadable and hard to test, and is a sign the transformation has outgrown what Connect is designed for.`,
          },
          {
            q: 'Q5. Explain the difference between using JsonConverter and AvroConverter with Schema Registry for a connector, and why a production team would choose one over the other.',
            a: `Both are converters — the component responsible for serializing a record to bytes on the way into Kafka (for a source connector) and deserializing bytes back into a record on the way out (for a sink connector), as Part 07 covers. JsonConverter writes plain, human-readable JSON with zero schema enforcement — nothing stops a producer from silently changing a field's type or dropping a field, and every downstream consumer only discovers the change when something breaks.

AvroConverter, paired with a Schema Registry, serializes records as compact Avro binary and registers the record's schema centrally, storing only a small schema ID in each record afterward. Every consumer configured with the same converter looks up that schema ID to decode correctly, and critically, the registry enforces compatibility rules — it can reject an incompatible schema change at registration time, before it ever reaches a topic and breaks a downstream consumer.

For a production pipeline feeding multiple downstream consumers, especially across team boundaries, I'd choose Avro with Schema Registry every time — the schema enforcement is exactly the safety net that prevents a silent breaking change from cascading through every consumer of that topic at once. JsonConverter is fine for prototyping or genuinely low-stakes, single-consumer topics where that enforcement doesn't earn its complexity.`,
          },
        ].map((item, i) => (
          <div key={i} style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 12, padding: '24px 28px', marginBottom: 20 }}>
            <div style={{ fontSize: 14, fontWeight: 800, color: 'var(--text)', marginBottom: 14, lineHeight: 1.4 }}>{item.q}</div>
            <div style={{ fontSize: 14, color: 'var(--muted)', lineHeight: 1.85, whiteSpace: 'pre-line' }}>{item.a}</div>
          </div>
        ))}
      </section>

      <Divider />

      <section style={{ marginBottom: 64 }} data-toc-kind="plain">
        <SectionTag text="// Common Mistakes" />
        <SectionTitle>Mistakes Teams Make Running Kafka Connect</SectionTitle>
        {[
          {
            q: 'Running Connect in standalone mode for a production integration',
            a: 'Part 03 is explicit that standalone mode has zero fault tolerance — a worker crash stops every connector it was running with nothing to reassign the work. Any integration that matters in production needs distributed mode, run as an actual multi-worker cluster.',
          },
          {
            q: 'Assuming tasks.max controls throughput the way adding more consumers does',
            a: 'Part 04\'s connectors-vs-tasks section covers this: a connector only creates as many tasks as it has independent units of work to split across (tables, files, partitions of the external system). Raising tasks.max beyond that ceiling does nothing — the bottleneck is how the specific connector plugin splits work, not a generic dial.',
          },
          {
            q: 'Letting an SMT chain grow until it is effectively encoding business logic',
            a: 'Part 06 and Interview Prep Q4 both flag this directly: SMTs are for mechanical, single-record edits. A chain that starts branching on business conditions is a sign the transformation belongs in a stream processing job or custom service instead, not in connector configuration.',
          },
          {
            q: 'Mismatching a sink connector\'s converter with how the topic was actually serialized',
            a: 'Part 07\'s callout covers this precisely: a sink connector configured with AvroConverter reading a topic actually written with JsonConverter fails every task immediately with a deserialization error. The converter setting must match how the data was actually written — Connect cannot auto-detect the serialization format.',
          },
          {
            q: 'Assuming Connect delivers exactly-once by default and skipping idempotency on the target system',
            a: 'Part 08 is explicit that both source and sink connectors default to at-least-once. Writing to a target system through a non-idempotent operation (a pure append rather than an upsert by unique key) means a connector restart after a crash can produce visible duplicates — design the sink write to tolerate that from the start.',
          },
        ].map((item, i) => (
          <div key={i} style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 12, padding: '24px 28px', marginBottom: 20 }}>
            <div style={{ fontSize: 14, fontWeight: 800, color: 'var(--text)', marginBottom: 14, lineHeight: 1.4 }}>{item.q}</div>
            <div style={{ fontSize: 14, color: 'var(--muted)', lineHeight: 1.85 }}>{item.a}</div>
          </div>
        ))}
      </section>

      <Divider />

      <section style={{ marginBottom: 64 }} data-toc-kind="plain">
        <SectionTag text="// Error Library" />
        <SectionTitle>Errors You Will Hit — And Exactly Why They Happen</SectionTitle>
        {[
          {
            error: `POST /connectors returns 500 with "Failed to find any class that implements Connector and which name matches io.confluent.connect.jdbc.JdbcSourceConnector"`,
            cause: 'The connector plugin JAR for the class named in connector.class is not present on the classpath of any worker in the Connect cluster — it was never installed into the plugin path, or was installed on only some workers instead of all of them.',
            fix: 'Install the connector plugin (its JAR and dependencies) into the directory listed in every worker\'s plugin.path configuration, then restart the worker processes so they pick it up. In distributed mode, every worker in the cluster needs the plugin installed identically, since any worker could be assigned that connector\'s tasks.',
          },
          {
            error: `A sink connector's task status shows FAILED with a DataException mentioning "Unknown magic byte" during deserialization`,
            cause: 'The value.converter is set to AvroConverter (or another Schema Registry-based converter) but the topic actually contains records written with a plain JsonConverter or a different serialization format entirely — the magic byte AvroConverter expects at the start of every record is not there.',
            fix: 'Confirm how the topic was actually written — check the producing connector or application\'s converter configuration — and set the sink connector\'s value.converter (and key.converter, if relevant) to match exactly, per Part 07. There is no converter setting that auto-detects format.',
          },
          {
            error: `A JDBC source connector stops producing new records even though new rows are visibly being inserted into the source table`,
            cause: 'The connector is running in incrementing mode against a column that is not actually strictly increasing for new rows — for example, a UUID primary key, or an integer column that gets reused or reset — so the connector\'s "greater than last seen offset" query never matches genuinely new rows the way it expects.',
            fix: 'Use a column that is genuinely monotonically increasing (an auto-incrementing integer ID, or a reliable updated_at timestamp with the connector\'s timestamp or timestamp+incrementing mode) as the tracking column, per Part 04\'s worked example — mode selection has to match the actual guarantees the source table\'s schema provides.',
          },
          {
            error: `Downstream consumers of a sink-fed system report the exact same record appearing twice, with no error visible in Connect\'s own logs`,
            cause: 'This is expected at-least-once behavior, not a bug: a Connect worker restarted (deploy, crash, or rebalance) between the sink connector successfully writing a record to the external system and committing the corresponding Kafka offset, so the same record was reprocessed and written again on resume, exactly as Part 08 describes.',
            fix: 'Make the sink write idempotent at the target system level — an upsert keyed by a unique record ID rather than a pure append — so a duplicate write has no visible effect. This is a target-system design decision, not something a Connect configuration flag can fix on its own.',
          },
          {
            error: `A connector\'s status shows RUNNING but no new records have appeared on its topic in hours, despite the external system clearly having new data`,
            cause: 'Most commonly, poll.interval.ms is set far higher than expected for a JDBC-style polling source connector, or an SMT in the chain (commonly a RegexRouter or a Filter transform) is silently routing or dropping every record before it reaches the topic you are actually watching.',
            fix: 'Check the connector\'s actual configuration for poll.interval.ms and step through its transforms list in order, per Part 06, to confirm none of them are filtering or rerouting records away from the topic being monitored. GET /connectors/{name}/config against the live cluster is more trustworthy here than a config file that may be stale.',
          },
        ].map((item, i) => (
          <div key={i} style={{ background: 'var(--bg2)', border: '1px solid var(--border)', borderRadius: 10, padding: '20px 24px', marginBottom: 16 }}>
            <div style={{ fontFamily: FONT_MONO, fontSize: 12, color: 'var(--red,#ff4757)', marginBottom: 12, background: 'rgba(255,71,87,0.08)', border: '1px solid rgba(255,71,87,0.2)', borderRadius: 6, padding: '8px 12px', lineHeight: 1.5 }}>
              {item.error}
            </div>
            <div style={{ marginBottom: 8 }}>
              <span style={{ fontSize: 10, fontWeight: 700, color: 'var(--muted)', fontFamily: FONT_MONO, letterSpacing: '.1em', textTransform: 'uppercase' }}>Cause: </span>
              <span style={{ fontSize: 13, color: 'var(--muted)', lineHeight: 1.7 }}>{item.cause}</span>
            </div>
            <div>
              <span style={{ fontSize: 10, fontWeight: 700, color: 'var(--accent)', fontFamily: FONT_MONO, letterSpacing: '.1em', textTransform: 'uppercase' }}>Fix: </span>
              <span style={{ fontSize: 13, color: 'var(--muted)', lineHeight: 1.7 }}>{item.fix}</span>
            </div>
          </div>
        ))}
      </section>

      <KeyTakeaways
        items={[
          'Kafka Connect is a framework, shipped with Kafka, for running reusable, configuration-driven connectors that move data between Kafka and external systems, replacing repetitive hand-written producer and consumer glue code for standard integrations.',
          'Source connectors pull data into Kafka (Debezium for CDC, JDBC source) and act as a producer on your behalf. Sink connectors push data out of Kafka (S3 sink, Elasticsearch sink, JDBC sink) and act as a consumer on your behalf.',
          'Standalone mode is a single worker with local file-based config and offsets and zero fault tolerance — for local development only. Distributed mode is a cluster of workers, configured via REST API, with automatic task rebalancing on worker failure — the production default.',
          'Connectors are configured as JSON submitted to a REST API (POST /connectors). A connector coordinates work but does not move data itself — tasks, up to tasks.max, actually do the reading and writing, split according to the connector\'s own logic.',
          'Source connectors track their own offsets — position within the external system — in an internal connect-offsets topic, entirely separate from the __consumer_offsets topic that sink connectors (which are genuinely consumers) use.',
          'Single Message Transforms apply lightweight, chainable, per-record edits — renaming fields, masking sensitive data, adding static fields, routing by topic — entirely in configuration. They are not a substitute for real business logic or stream processing.',
          'Converters (key.converter/value.converter) control serialization. JsonConverter is simple but has no schema enforcement. AvroConverter with Schema Registry enforces compatibility centrally and is the standard choice for production pipelines with multiple downstream consumers.',
          'Both source and sink connectors default to at-least-once delivery. Design target-system writes to be idempotent (upsert by unique key) rather than assuming exactly-once behavior without checking the specific connector\'s guarantees.',
          'Use Connect for standard, mechanical integrations where a mature connector plugin exists. Write a custom producer or consumer when the integration needs real business logic, external state, or anything beyond what a connector and an SMT chain can express.',
        ]}
      />
    </LearnLayout>
  )
}
