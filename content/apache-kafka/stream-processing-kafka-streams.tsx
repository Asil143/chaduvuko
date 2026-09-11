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

export default function StreamProcessingKafkaStreams() {
  return (
    <LearnLayout
      title="Stream Processing and Kafka Streams"
      description="What stream processing actually means, Kafka Streams as a client library instead of a separate cluster, KStream vs KTable, stateless vs stateful operations, windowing and event-time, KStream-KTable and KStream-KStream joins, exactly-once processing, and a worked real-time fraud-detection example."
      section="Apache Kafka — Module 14"
      readTime="60 min"
      updatedAt="September 2026"
      breadcrumbs={[
        { label: 'Learn', href: '/learn' },
        { label: 'Apache Kafka', href: '/learn/apache-kafka' },
        { label: 'Stream Processing and Kafka Streams', href: '/learn/apache-kafka/stream-processing-kafka-streams' },
      ]}
      prev={{ title: 'Kafka Connect', href: '/learn/apache-kafka/kafka-connect' }}
      next={{ title: 'Kafka Security: TLS, SASL, and ACLs', href: '/learn/apache-kafka/security-acls-sasl-tls' }}
    >
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 01 — What stream processing means" />
        <SectionTitle>Stream Processing Is Continuous Computation Over Data That Never Ends</SectionTitle>
        <Para>
          Batch processing operates on a bounded dataset: a file, a table snapshot, a day's worth of rows
          extracted from a warehouse. The job starts, reads everything that exists as of that moment,
          computes a result, and finishes. The defining property is that "all the data" is a knowable,
          fixed set at the moment the job runs — yesterday's orders table has an exact row count, and a
          batch job can process every row and then simply be done.
        </Para>
        <Para>
          Stream processing operates on an unbounded stream: events keep arriving indefinitely, and there
          is no moment at which "all the data" exists, because more of it is always still coming. A stream
          processing job does not run once and finish — it runs continuously, computing and updating
          results as each new event arrives, for as long as the application is deployed. The question a
          stream processing job answers is not "what is the total for today" computed once at the end of
          the day, but "what is the running total right now" continuously, updated with every new event.
        </Para>
        <HighlightBox>
          <Para>
            <strong>Batch:</strong> read the whole orders table as of 11:59 PM, compute yesterday's revenue,
            write one row to a summary table, job ends. Latency from event to result: hours.
          </Para>
          <Para>
            <strong>Stream:</strong> a long-running process subscribed to the orders topic recomputes
            revenue-so-far every time a new order event arrives, continuously, forever. Latency from event
            to result: milliseconds to seconds.
          </Para>
        </HighlightBox>
        <Para>
          Kafka topics are naturally unbounded logs — a topic never "finishes" the way a file does — which
          is why Kafka is the dominant storage substrate stream processing systems are built against. A
          stream processing engine reads continuously from one or more topics, applies transformations,
          aggregations, and joins as data arrives, and typically writes its output back to other Kafka
          topics, which downstream consumers or other stream processing jobs can read from in turn.
        </Para>
        <Table
          headers={['', 'Batch processing', 'Stream processing']}
          rows={[
            ['Input', 'A bounded, fixed dataset (a file, a table snapshot)', 'An unbounded stream of events that never stops arriving'],
            ['Execution model', 'Runs once, processes everything available, terminates', 'Runs continuously, processes each event as it arrives, never terminates'],
            ['Latency', 'Minutes to hours, depending on schedule', 'Milliseconds to seconds'],
            ['Typical trigger', 'A schedule (hourly, nightly) or a manual run', 'The arrival of new events, continuously'],
            ['Example question answered', '"What was total revenue yesterday?"', '"What is total revenue right now, updated live?"'],
          ]}
        />
        <Callout title="Stream processing is not just 'batch processing, but faster'" color={K}>
          The conceptual difference is not merely speed. A batch job can always look at "everything," so
          questions like sorting, global aggregation, or exact deduplication across the whole dataset are
          straightforward. A stream processing job never has "everything" — it only ever has what has
          arrived so far — so every aggregation, join, and window in this module exists specifically to
          answer well-defined questions despite that constraint, which is the recurring theme of this
          whole module.
        </Callout>
      </section>

      <Divider />

      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 02 — Kafka Streams as a library" />
        <SectionTitle>Kafka Streams Is a Client Library, Not a Separate Cluster</SectionTitle>
        <Para>
          This is the single most important architectural fact about Kafka Streams, and the thing that
          distinguishes it from both Kafka Connect (Module 13) and from external stream processing
          frameworks like Apache Flink or Spark Structured Streaming. Kafka Streams is a Java library that
          you add as a dependency to your own application. There is no separate "Kafka Streams cluster" to
          deploy or operate — a Kafka Streams application is simply your own JVM process, running your own
          business logic, that happens to use the Kafka Streams library to read from and write to Kafka
          topics with stream processing semantics built in.
        </Para>
        <CodeBox label="the deployment model, contrasted">
{`Kafka Connect:
  You submit a JSON config to a Connect cluster (separate worker
  processes you or your platform team operate). Your code is the
  configuration; the connector plugin does the work.

External engine (Flink, Spark Structured Streaming):
  You submit a job to a separately-operated cluster (JobManager /
  TaskManagers, or a Spark cluster). Your job runs on infrastructure
  someone deploys and scales independently of your application.

Kafka Streams:
  You write a normal application (say, a Java service, or a
  Dockerized JVM process) and add the kafka-streams library as a
  dependency. YOUR application IS the stream processing job. You
  deploy it exactly like any other service -- Kubernetes, ECS,
  a JAR on a VM -- and scale it exactly like any other service.`}
        </CodeBox>
        <Para>
          This has real operational consequences. A Kafka Streams application does not need a separate
          operations team running a stream processing cluster — the same deployment, monitoring, and
          on-call practices your organization already uses for any other service apply directly. Scaling
          out a Kafka Streams application means running more instances of your own application, each of
          which automatically claims a share of the input topic's partitions, using the same consumer
          group rebalancing protocol covered in Module 03.
        </Para>
        <Table
          headers={['Property', 'Kafka Streams']}
          rows={[
            ['Deployment unit', 'Your own application process — no separate cluster to run'],
            ['Scaling mechanism', 'Run more instances of your application; partitions rebalance across them automatically'],
            ['Underlying primitive', 'A regular Kafka consumer and producer, wrapped in a higher-level DSL'],
            ['State storage', 'Local, embedded state stores (typically RocksDB) inside your own application\'s process, backed by changelog topics — see Part 04'],
            ['Fault tolerance', 'Comes from Kafka itself: consumer group rebalancing plus changelog topics let state be rebuilt on any instance'],
          ]}
        />
        <Callout title="Why this matters when choosing a stream processing approach" color="#38bdf8">
          If your team is already comfortable deploying and operating JVM services, and your processing
          logic reads from and writes to Kafka topics without needing to integrate with non-Kafka systems
          mid-pipeline, Kafka Streams is usually the lowest-operational-overhead choice — there is no new
          cluster type to learn, secure, or scale. Reach for an external engine like Flink when you need
          capabilities Kafka Streams does not provide, such as true multi-language support beyond the JVM,
          or processing sources that are not Kafka at all.
        </Callout>
      </section>

      <Divider />

      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 03 — KStream vs KTable" />
        <SectionTitle>KStream and KTable — Two Ways to Interpret the Same Kind of Data</SectionTitle>
        <Para>
          Kafka Streams gives you two core abstractions for working with a topic, and choosing the right
          one for a given topic is the first design decision in any Kafka Streams application.
        </Para>
        <SubTitle>KStream — a record stream, every event is independent</SubTitle>
        <Para>
          A <code>KStream</code> treats every record on a topic as an independent, immutable event. A
          KStream of order events is a sequence of "order placed" facts — each one meaningful on its own,
          none of them superseding or replacing another. Reading a KStream never "loses" an earlier record
          in favor of a later one with the same key; every record is retained and processed.
        </Para>
        <SubTitle>KTable — a changelog, the latest value per key is all that matters</SubTitle>
        <Para>
          A <code>KTable</code> treats a topic as a changelog of updates to a keyed table: each record
          represents the current, latest state for its key, and a new record with the same key
          <em>replaces</em> the previous value rather than adding to a sequence. A KTable of customer
          profiles keyed by <code>customer_id</code> represents "what is the current state of each
          customer" — conceptually the same relationship a compacted topic (Module on log compaction) has
          to its keys, and in fact KTables are commonly backed by, or materialized as, compacted topics
          internally for exactly this reason.
        </Para>
        <CodeBox label="the same three records, interpreted two different ways">
{`Records arriving, in order, key = customer_id:

  key=C1  value={"tier": "silver"}
  key=C2  value={"tier": "gold"}
  key=C1  value={"tier": "gold"}     <- C1 upgraded

As a KStream (customerTierChanges):
  Three independent events are seen and can each be processed --
  e.g. "send a congratulations email on every tier upgrade event"
  needs to see the transition, not just the final state.

As a KTable (customerCurrentTier):
  The table's current state, after all three records:
    C1 -> gold   (the second C1 record replaced the first)
    C2 -> gold
  A join against this KTable always sees the LATEST tier for a
  customer, never an intermediate value that has since changed.`}
        </CodeBox>
        <Table
          headers={['', 'KStream', 'KTable']}
          rows={[
            ['Interpretation', 'A sequence of independent events', 'The current, latest value per key — a changelog'],
            ['New record with an existing key', 'Added as a new, separate event', 'Replaces the previous value for that key'],
            ['Conceptually similar to', 'An unbounded event log', 'A compacted topic, or a database table\'s current state'],
            ['Natural question it answers', '"What happened?" (a sequence of facts)', '"What is true right now?" (current state)'],
            ['Typical source data', 'Clicks, page views, transactions, sensor readings', 'Customer profiles, product prices, account status, inventory levels'],
          ]}
        />
        <Para>
          Kafka Streams also has a third, less commonly used abstraction, <code>GlobalKTable</code>, which
          is a KTable fully replicated to every application instance rather than partitioned across them —
          useful for small reference datasets (a country-code lookup table, a small product catalog) that
          every instance needs complete local access to for joins, without caring which partition a given
          key would normally land on.
        </Para>
      </section>

      <Divider />

      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 04 — Stateless vs stateful operations" />
        <SectionTitle>Stateless Operations Need No Memory. Stateful Operations Need Local Storage.</SectionTitle>
        <Para>
          Every operation in Kafka Streams falls into one of two categories, and the distinction determines
          whether Kafka Streams needs to maintain any durable local state on your behalf.
        </Para>
        <SubTitle>Stateless operations — process each record independently</SubTitle>
        <Para>
          A stateless operation transforms or filters each record using only that record's own contents —
          it never needs to remember anything about records it has already seen. <code>map</code> (transform
          each record), <code>filter</code> (keep or drop each record based on a predicate), and
          <code>branch</code> (split a stream into multiple streams based on a predicate) are the canonical
          examples. These operations are cheap: no local storage, no changelog topic, no state to rebuild
          after a restart.
        </Para>
        <SubTitle>Stateful operations — need to remember something across records</SubTitle>
        <Para>
          A stateful operation needs information beyond the current record to compute its result —
          aggregations (a running count, sum, or average per key) and joins (matching a record against
          previously-seen records from another stream or table) are the two major categories. Since Kafka
          Streams applications can be restarted, rebalanced, or scaled, this "memory" cannot simply live in
          a plain in-memory variable — it needs to be durable and recoverable. Kafka Streams solves this
          with local <strong>state stores</strong>, typically backed by RocksDB (an embedded key-value store
          that lives on local disk, extremely fast for the small, localized reads and writes a state store
          needs), one instance per application instance, holding only the portion of state relevant to the
          partitions that instance currently owns.
        </Para>
        <CodeBox label="how a state store survives a crash — the changelog topic">
{`Every stateful operation's state store is backed by a changelog
topic -- an internal, compacted Kafka topic that Kafka Streams
creates and manages automatically, one per state store.

Every update to the local RocksDB state store is ALSO written to
its changelog topic, roughly like a write-ahead log:

  local state store: user_txn_count[user_42] = 7
       |
       v  (also written to)
  changelog topic:  key=user_42  value=7

If the application instance crashes and its work is reassigned to
a different instance (or the same instance restarts on a fresh
disk), the new owner does NOT recompute from the entire history of
the input topic. It instead replays the much smaller, compacted
changelog topic to rebuild just the latest state per key into a
fresh local RocksDB store -- fast recovery, because the changelog
only has to replay the latest value per key, not every input event
ever processed.`}
        </CodeBox>
        <Table
          headers={['Category', 'Examples', 'Needs a state store?', 'Needs a changelog topic?']}
          rows={[
            ['Stateless', 'map, mapValues, filter, filterNot, branch, flatMap', 'No', 'No'],
            ['Stateful — aggregation', 'count, reduce, aggregate, groupBy + windowedBy', 'Yes — RocksDB-backed, local per instance', 'Yes — automatically created and managed'],
            ['Stateful — join', 'KStream-KTable join, KStream-KStream join, KTable-KTable join', 'Yes — the KTable/join side maintains a state store', 'Yes, for the KTable side'],
          ]}
        />
        <Callout title="A stateful topology is only as fault-tolerant as its changelog topics" color="#ff4757">
          Setting a very short retention or aggressive deletion policy on a Kafka Streams application's
          internal changelog topics — or deleting them manually, which operators occasionally do by
          accident during cleanup — destroys the ability to recover state after a crash or rebalance. These
          internal topics are typically named with an
          <code>{'{application.id}-{store-name}-changelog'}</code> pattern and should be treated as
          critical infrastructure, not disposable scratch topics, even though Kafka Streams created them
          automatically rather than a human.
        </Callout>
      </section>

      <Divider />

      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 05 — Windowing" />
        <SectionTitle>Windowing — Bounding an Otherwise-Unbounded Aggregation by Time</SectionTitle>
        <Para>
          "Count all transactions for this user" is not a well-defined question on an unbounded stream —
          the count would simply grow forever, with no moment at which it is "done" or meaningfully
          comparable across users. "Count transactions for this user in the last 5 minutes" is well-defined,
          because it bounds the otherwise-infinite aggregation to a specific slice of time. This is what
          windowing is for: grouping stream-time into fixed-size buckets so aggregations produce a
          meaningful, finite result per bucket instead of one number that only ever grows.
        </Para>
        <SubTitle>Tumbling windows — fixed-size, non-overlapping</SubTitle>
        <Para>
          A tumbling window divides time into fixed-size, back-to-back, non-overlapping buckets. A 5-minute
          tumbling window produces buckets of [00:00-00:05), [00:05-00:10), [00:10-00:15), and so on — every
          event belongs to exactly one window, with no overlap and no gaps.
        </Para>
        <SubTitle>Hopping windows — fixed-size, overlapping</SubTitle>
        <Para>
          A hopping window is also fixed-size, but advances ("hops") by an interval smaller than the window
          size, so windows overlap and a single event can belong to more than one window. A 10-minute
          hopping window that advances every 5 minutes produces buckets [00:00-00:10), [00:05-00:15),
          [00:10-00:20) — each event falls into two overlapping windows, useful for smoother, more
          frequently-updated aggregates (a rolling 10-minute average recomputed every 5 minutes, rather than
          jumping discretely every 10 minutes).
        </Para>
        <SubTitle>Sliding windows — driven by event pairs, not a fixed clock</SubTitle>
        <Para>
          A sliding window (specifically as Kafka Streams defines it) is defined relative to pairs of
          events rather than fixed clock boundaries — two events fall in the same sliding window if they
          occur within the window's time difference of each other. This is most useful for join-like
          "events near each other in time" questions rather than fixed-interval reporting buckets.
        </Para>
        <CodeBox label="tumbling vs hopping, visualized on a timeline">
{`Tumbling window, size=5min:
  |--- W1: 0-5 ---|--- W2: 5-10 ---|--- W3: 10-15 ---|
  Every event belongs to exactly ONE window. No overlap.

Hopping window, size=10min, advance=5min:
  |------ W1: 0-10 ------|
        |------ W2: 5-15 ------|
              |------ W3: 10-20 ------|
  An event at t=7 belongs to BOTH W1 and W2.
  Windows overlap; each event can update multiple window results.`}
        </CodeBox>
        <SubTitle>Event-time vs processing-time — why the distinction changes your answer</SubTitle>
        <Para>
          Every windowing decision depends on which clock is used to place an event into a window.
          <strong> Event time</strong> is the timestamp of when the event actually happened in the real
          world, usually carried as a field in the record itself or as the Kafka record's embedded
          timestamp set by the producer. <strong>Processing time</strong> is the timestamp of when the
          stream processing application happens to handle the record, which can lag behind event time by
          anywhere from milliseconds to hours, depending on network delays, producer retries, or a consumer
          catching up after downtime.
        </Para>
        <Para>
          Using processing time for a "transactions per 5 minutes" fraud aggregation means a burst of
          delayed events arriving all at once — say, after a network partition resolves — gets counted in
          whatever window happens to be open when they finally arrive, not the window they actually
          occurred in. This can produce a materially wrong answer to "how many transactions did this user
          make between 2:00 and 2:05," which is why Kafka Streams defaults to event-time semantics for
          windowing, extracting a timestamp from each record via a configurable timestamp extractor, rather
          than defaulting to the wall-clock time of the processing machine.
        </Para>
        <Callout title="Late data and grace periods" color={K}>
          Because event time can lag arrival, a window cannot close the instant its time range ends — a few
          more events legitimately belonging to that window might still be in flight. Kafka Streams handles
          this with a configurable grace period per window: the window stays open to accept late-arriving
          events for that additional duration after its nominal end, after which it is finally closed and
          further late events for it are dropped. Setting this too short causes legitimate late events to
          be silently excluded; setting it too long delays how soon a window's result can be considered
          final and delays cleanup of its state.
        </Callout>
      </section>

      <Divider />

      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 06 — Joins" />
        <SectionTitle>Joining Streams and Tables — Enriching Events With Context</SectionTitle>
        <Para>
          A join combines records from two sources that share a common key, and Kafka Streams supports
          several shapes of join, each with different semantics driven by whether each side is a KStream
          (a sequence of events) or a KTable (a current-state snapshot).
        </Para>
        <SubTitle>KStream-KTable join — enrich each event with the latest known state</SubTitle>
        <Para>
          A KStream-KTable join is the most common enrichment pattern: for every incoming event on the
          KStream side, look up the current value for that event's key in the KTable, and combine them.
          This join is not windowed and does not wait — it uses whatever the KTable's latest value happens
          to be at the moment the KStream event is processed. Enriching an order event with the customer's
          current tier (from a KTable of customer profiles) is the canonical example: every order gets
          joined against whatever the customer's tier currently is, not the tier at some point in the past.
        </Para>
        <SubTitle>KStream-KStream join — needs a join window, because two streams never "finish"</SubTitle>
        <Para>
          A KStream-KStream join matches events from two unbounded streams that share a key and occurred
          near each other in time — for example, joining a stream of "page view" events with a stream of
          "add to cart" events, keyed by session ID, to find sessions where a view was quickly followed by
          a cart addition. Because neither stream ever "finishes," Kafka Streams cannot wait indefinitely
          hoping a matching event on the other side eventually arrives — doing so would mean holding every
          unmatched event in memory forever. This is why a KStream-KStream join always requires an explicit
          join window: only events on both sides that fall within that time window of each other are
          considered a match.
        </Para>
        <SubTitle>KTable-KTable join — a join of two current-state views</SubTitle>
        <Para>
          A KTable-KTable join combines two changelogs on a shared key into a new KTable representing the
          combined current state — for example, joining a KTable of customer profiles with a KTable of
          customer loyalty-program status to produce one combined "current customer view" KTable. Like the
          KStream-KTable join, this is not windowed — it always reflects the latest state on both sides.
        </Para>
        <Table
          headers={['Join type', 'Windowed?', 'What it answers']}
          rows={[
            ['KStream-KTable', 'No', '"Enrich this event with whatever the current reference state is right now"'],
            ['KStream-KStream', 'Yes — required', '"Did an event on stream A happen near (within this window of) a matching event on stream B?"'],
            ['KTable-KTable', 'No', '"Combine two current-state views into one combined current-state view"'],
          ]}
        />
        <Callout title="Forgetting the join window is not optional for KStream-KStream" color="#ff4757">
          Kafka Streams will not let you build a KStream-KStream join without specifying a join window — the
          API requires it. This is a deliberate design constraint, not an oversight: an unwindowed join of
          two unbounded streams is not a well-defined operation, since it would require holding an
          unbounded amount of unmatched state in memory forever, waiting for a match that may never come.
        </Callout>
      </section>

      <Divider />

      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 07 — Exactly-once processing" />
        <SectionTitle>Exactly-Once Processing in Kafka Streams — Built on Kafka Transactions</SectionTitle>
        <Para>
          A Kafka Streams application, at its core, is a read-process-write loop: consume input records,
          update local state, produce output records. By default this is at-least-once — a crash between
          updating local state and having that update durably reflected can cause the same input to be
          reprocessed on recovery, potentially producing duplicate output records or double-counting an
          aggregation.
        </Para>
        <Para>
          Setting <code>processing.guarantee=exactly_once_v2</code> changes this. Under the hood, Kafka
          Streams uses exactly the transactional producer mechanism covered in the message-brokers module:
          every batch of output records produced, every state store update reflected in its changelog
          topic, and the consumer offset commit for the corresponding input records are wrapped in a single
          Kafka transaction. Either the entire unit — outputs, state changes, and input offset advancement
          — commits atomically, or none of it does. On a crash mid-transaction, the transaction is aborted,
          and any partial output is invisible to downstream consumers configured with
          <code>isolation.level=read_committed</code>.
        </Para>
        <CodeBox label="what exactly_once_v2 actually wraps in one transaction">
{`Without exactly_once_v2 (at_least_once, the default):
  1. consume input record
  2. update local state store (+ write to changelog topic)
  3. produce output record
  4. commit input offset
  -- if the process crashes between steps 2 and 4, on restart the
     same input record is reprocessed: state may be double-updated,
     and a duplicate output record may be produced.

With exactly_once_v2:
  BEGIN TRANSACTION
    update local state store (+ changelog write)
    produce output record
    commit input offset  (as part of the SAME transaction)
  COMMIT TRANSACTION
  -- a crash before commit means the whole transaction is aborted;
     on restart, the input record is reprocessed as if nothing had
     happened yet -- no partial state update, no duplicate output,
     because nothing partial was ever visible to begin with.`}
        </CodeBox>
        <Table
          headers={['Setting', 'Guarantee', 'Cost']}
          rows={[
            ['processing.guarantee=at_least_once (default)', 'No duplicate loss, but reprocessing after a crash can produce duplicate output or state updates', 'Lowest latency and overhead'],
            ['processing.guarantee=exactly_once_v2', 'State updates, output records, and input offset commits succeed or fail together, atomically, per Kafka transaction semantics', 'Higher latency from transaction coordination overhead; downstream consumers should use isolation.level=read_committed'],
          ]}
        />
        <Callout title="Exactly-once here means exactly-once within Kafka's own boundary" color={K}>
          The guarantee applies to the read-from-Kafka, update-local-state, write-to-Kafka loop entirely
          within the Kafka Streams application and the Kafka cluster it talks to. It does not automatically
          extend to a side effect outside that boundary — calling an external API, or writing to a database
          from inside a Kafka Streams processor, is not covered by the transaction and can still be executed
          more than once on reprocessing. That kind of external side effect needs its own idempotency design,
          exactly as covered for sink connectors in Module 13.
        </Callout>
      </section>

      <Divider />

      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 08 — Interactive queries" />
        <SectionTitle>Interactive Queries — Reading a State Store Without a Separate Database</SectionTitle>
        <Para>
          A Kafka Streams application's state stores hold genuinely useful, continuously up-to-date data —
          the running transaction count per user from Part 08's worked example, or a materialized KTable of
          current customer tiers. The naive way to expose that to the rest of your organization is to also
          write it out to an external database and query that database instead. Interactive Queries offer a
          different option: querying a Kafka Streams application's own local state stores directly, over a
          thin API you build yourself (commonly a small REST endpoint inside the same application), without
          standing up or synchronizing a separate datastore at all.
        </Para>
        <Para>
          The complication is that a state store's data is partitioned across every instance of the
          application — a single instance only holds the state for the partitions it currently owns, not
          the whole picture. Kafka Streams exposes metadata about which application instance owns which
          key, so a query received by any instance can either answer it locally (if it owns the relevant
          partition) or forward the request to the instance that does.
        </Para>
        <CodeBox label="interactive query — looking up one user's current window count">
{`ReadOnlyWindowStore<String, Long> store = streams.store(
    StoreQueryParameters.fromNameAndType(
        "user-txn-counts-5min",
        QueryableStoreTypes.windowStore()
    )
);

// Does THIS instance own the partition for "U-88213"?
KeyQueryMetadata meta = streams.queryMetadataForKey(
    "user-txn-counts-5min", "U-88213", keySerde.serializer()
);

if (meta.activeHost().equals(thisInstance)) {
    // Answer locally -- this instance owns the relevant partition
    WindowStoreIterator<Long> results = store.fetch(
        "U-88213", Instant.now().minus(Duration.ofMinutes(5)), Instant.now()
    );
} else {
    // Forward the HTTP request to meta.activeHost() instead --
    // that instance is the one that actually owns this key's data
}`}
        </CodeBox>
        <Table
          headers={['Approach', 'What it costs', 'When it fits']}
          rows={[
            ['Interactive Queries against local state stores', 'You build the query-routing layer yourself; no extra infrastructure or sync lag', 'Internal, low-to-moderate query volume, especially when the querying service is itself part of the same team/platform'],
            ['Materialize state to an external database (write-through)', 'Extra infrastructure to run, plus replication lag between the state store and the database', 'External or high-volume query access, or when consumers need query capabilities (complex filtering, joins across unrelated data) a key-value state store cannot offer'],
          ]}
        />
        <Callout title="Interactive Queries answer 'what does this app currently know', not 'query anything'" color={K}>
          A state store queried this way is still just a key-value or windowed key-value store — you get
          point lookups and range scans on windows, not arbitrary filtering or cross-key joins. For the
          FreshCart fraud example, "what is this user's count in the current window" is a perfect fit;
          "which users had counts in the top 1% across all of yesterday" is not, and would need a proper
          analytical store instead.
        </Callout>
      </section>

      <Divider />

      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 09 — The Processor API and testing" />
        <SectionTitle>The Processor API — For When the DSL Isn't Expressive Enough, and Testing Without a Real Cluster</SectionTitle>
        <Para>
          Everything covered so far — <code>map</code>, <code>filter</code>, <code>groupByKey</code>,
          <code>windowedBy</code>, joins — is part of the Kafka Streams <strong>DSL</strong> (domain-specific
          language), a high-level, declarative API that covers the large majority of real stream processing
          needs. Underneath the DSL sits the lower-level <strong>Processor API</strong>, which gives direct
          control over the processing topology: custom logic per record, direct access to state stores, and
          the ability to schedule periodic work independent of record arrival (via <code>punctuate</code>),
          none of which the DSL exposes directly.
        </Para>
        <Para>
          Most Kafka Streams applications never need the Processor API — the DSL's built-in operations,
          including the ability to drop down into a custom <code>transform</code> or <code>process</code>
          step within an otherwise-DSL topology, cover nearly everything. Reach for the full Processor API
          when you need genuinely custom control flow, such as emitting a result on a fixed wall-clock
          schedule regardless of whether new records have arrived, which the record-driven DSL has no clean
          way to express.
        </Para>
        <SubTitle>Testing a topology without a running Kafka cluster</SubTitle>
        <Para>
          A meaningful advantage of Kafka Streams being a library rather than a submitted job to an external
          engine is that its topology can be tested with an in-memory driver, <code>TopologyTestDriver</code>,
          with no real Kafka broker, Zookeeper, or KRaft controller running at all — a genuine unit test, not
          an integration test requiring test infrastructure.
        </Para>
        <CodeBox label="testing the fraud-detection topology with TopologyTestDriver">
{`TopologyTestDriver testDriver = new TopologyTestDriver(builder.build(), props);

TestInputTopic<String, Transaction> input = testDriver.createInputTopic(
    "freshcart.transactions", Serdes.String().serializer(), transactionSerde.serializer()
);
TestOutputTopic<String, FraudAlert> output = testDriver.createOutputTopic(
    "freshcart.fraud-alerts", Serdes.String().deserializer(), fraudAlertSerde.deserializer()
);

// Push 9 transactions for the same user within one window
for (int i = 0; i < 9; i++) {
    input.pipeInput("U-1", new Transaction("U-1", 42.00), baseTime.plusSeconds(i * 10));
}

// Assert an alert was produced -- 9 > threshold of 8
assertFalse(output.isEmpty());
FraudAlert alert = output.readValue();
assertEquals(9, alert.getTransactionCount());`}
        </CodeBox>
        <Callout title="Fast, deterministic tests are a direct consequence of the library architecture" color="#38bdf8">
          Because Kafka Streams has no separate cluster, TopologyTestDriver can advance simulated time and
          feed records directly into the topology in-process, making window and grace-period behavior
          exactly reproducible in a test — something considerably harder to set up deterministically against
          a real, wall-clock-driven cluster. This is one of the more underrated practical benefits of Part
          02's architecture choice.
        </Callout>
      </section>

      <Divider />

      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 09b — Scaling, standby replicas, and partitions" />
        <SectionTitle>Scaling a Kafka Streams Application — Tasks, Standby Replicas, and the Partition Ceiling</SectionTitle>
        <Para>
          Kafka Streams divides a topology's work into <strong>stream tasks</strong>, where the number of
          tasks is determined by the number of partitions on the input topics — the same partition-driven
          parallelism ceiling covered for consumer groups in Module 03 applies directly here, because a
          Kafka Streams application's underlying mechanism is still ordinary consumer group partition
          assignment. A topology reading from an 8-partition topic has, at most, 8 stream tasks, and running
          more than 8 application instances means some instances sit idle with no tasks assigned, exactly as
          an oversized consumer group does.
        </Para>
        <CodeBox label="scaling a fraud-detection application from 2 to 4 instances">
{`freshcart.transactions has 8 partitions.

2 application instances running:
  instance-1: tasks for partitions [0,1,2,3]
  instance-2: tasks for partitions [4,5,6,7]

Scale to 4 application instances:
  instance-1: tasks for partitions [0,1]
  instance-2: tasks for partitions [2,3]
  instance-3: tasks for partitions [4,5]
  instance-4: tasks for partitions [6,7]

Scale to 10 application instances (beyond the partition count):
  8 instances get exactly one partition's tasks each.
  2 instances get NO tasks at all -- idle, doing nothing, exactly
  as an oversized consumer group behaves.`}
        </CodeBox>
        <SubTitle>Standby replicas — trading extra resource cost for faster recovery</SubTitle>
        <Para>
          Part 04 covered that a state store's changelog topic is what allows state to be rebuilt after a
          crash or rebalance — but replaying a changelog topic from scratch still takes time proportional to
          how much state exists, during which queries against that store (including Interactive Queries from
          Part 08) return incomplete results. Setting <code>num.standby.replicas</code> to 1 or more tells
          Kafka Streams to maintain additional, continuously-updated replicas of each state store on other
          application instances — essentially a hot standby, kept current by consuming the same changelog
          topic in real time rather than only reading it during recovery. When a rebalance moves a task, if a
          standby replica for that task's state already exists and is current on the instance it's assigned
          to, the instance can serve from it almost immediately instead of replaying the changelog from
          scratch.
        </Para>
        <Table
          headers={['Setting', 'Recovery time after a rebalance', 'Resource cost']}
          rows={[
            ['num.standby.replicas = 0 (default)', 'Full changelog replay on the new owner — proportional to state size', 'No extra storage or network cost'],
            ['num.standby.replicas = 1', 'Near-instant handoff if a current standby exists on the target instance', 'Roughly doubles local storage and changelog consumption per additional replica'],
          ]}
        />
        <Callout title="Standby replicas are a latency-vs-cost trade, not a correctness feature" color={K}>
          A state store without standby replicas is not at risk of losing data — the changelog topic is
          still durable and replicated by Kafka itself, exactly as any topic is. Standby replicas only
          affect how quickly a rebalanced task's state becomes queryable again, which matters most for
          applications like the fraud detector, where an incomplete count during a brief recovery window
          could mean a missed alert, not for applications that can tolerate a short state-rebuild pause.
        </Callout>
      </section>

      <Divider />

      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 09c — Repartitioning" />
        <SectionTitle>Repartitioning — When Kafka Streams Silently Creates Its Own Internal Topics</SectionTitle>
        <Para>
          Every stateful operation in Kafka Streams requires its input to be correctly partitioned by the
          key the operation groups on — the same key must always land on the same partition, or an
          aggregation or join could see only part of a given key's data on any one application instance.
          Whenever you re-key a stream with <code>groupBy</code>, <code>map</code>, or a
          <code>selectKey</code> call that changes the record's key, Kafka Streams cannot simply continue
          processing in place — it has to route each record to whichever partition the new key belongs on,
          which may be a different partition, and possibly owned by a different application instance
          entirely.
        </Para>
        <Para>
          Kafka Streams handles this automatically by creating an internal <strong>repartition topic</strong>:
          it produces the re-keyed records to this new, internally-managed topic, and then consumes from it
          as if it were the actual input to the next step — effectively performing a full produce-and-consume
          round trip through Kafka in the middle of the topology, invisible in the DSL code but very real in
          terms of latency and Kafka throughput consumed.
        </Para>
        <CodeBox label="a groupBy that silently triggers a repartition, versus groupByKey which does not">
{`KStream<String, Transaction> transactions = builder.stream("freshcart.transactions");
// Assume this topic is keyed by transaction_id, NOT user_id

// groupByKey() -- uses the EXISTING key (transaction_id). No repartition,
// but also not useful here since we want to aggregate per USER.
transactions.groupByKey().count();

// groupBy() -- re-keys by user_id, which differs from the topic's
// existing key. Kafka Streams MUST create an internal repartition
// topic to route records to the correct partition for their new key.
transactions
    .groupBy((txnId, txn) -> txn.getUserId())   // <- re-keying happens here
    .windowedBy(TimeWindows.ofSizeAndGrace(Duration.ofMinutes(5), Duration.ofSeconds(30)))
    .count();
// Internally creates: fraud-txn-count-detector-<generated-name>-repartition`}
        </CodeBox>
        <Table
          headers={['Operation', 'Triggers a repartition topic?', 'Why']}
          rows={[
            ['groupByKey()', 'No', 'Groups by the stream\'s existing key — no re-keying, so existing partitioning is already correct'],
            ['groupBy(keySelector)', 'Yes, if the new key differs from partitioning behavior', 'The new key may not match the current partition assignment, so records must be routed to the right partition first'],
            ['selectKey() followed by a stateful op', 'Yes', 'Same reasoning — changing the key invalidates the existing partition alignment for anything downstream that groups or joins on it'],
            ['map() that only changes the value, not the key', 'No', 'The key is unchanged, so partitioning remains valid'],
          ]}
        />
        <Callout title="This is exactly why the fraud-detection example used groupByKey(), not groupBy()" color="#ff4757">
          Part 08's (now Part 10's) worked example deliberately kept the <code>freshcart.transactions</code>
          topic keyed by <code>user_id</code> from the start, specifically so the fraud-count aggregation
          could use <code>groupByKey()</code> and avoid an unnecessary repartition topic and its added
          latency and Kafka throughput cost. Designing upstream topics to already be keyed by the field a
          downstream aggregation needs is a cheap, high-leverage decision made once at the producer, instead
          of paying a repartition cost on every consuming Kafka Streams application forever after.
        </Callout>
      </section>

      <Divider />

      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 09d — Monitoring a Kafka Streams application" />
        <SectionTitle>Monitoring — What to Watch on a Running Kafka Streams Application</SectionTitle>
        <Para>
          Because a Kafka Streams application is your own deployed service, it inherits whatever
          application-level monitoring your organization already runs — CPU, memory, restart counts — but
          it also exposes a specific set of Kafka Streams and underlying consumer/producer metrics that
          matter for diagnosing stream-processing-specific problems no generic application metric would
          catch.
        </Para>
        <Table
          headers={['Metric', 'What it tells you']}
          rows={[
            ['process-latency-avg / process-rate', 'How long the topology takes to process each record, and how many records per second it is handling — the stream-processing equivalent of request latency and throughput'],
            ['record-lateness-avg / record-lateness-max', 'How far behind event-time the records actually being processed are — directly relevant to whether Part 05\'s grace period is set appropriately'],
            ['rebalance-total / rebalance-rate-per-hour', 'How often the underlying consumer group is rebalancing — frequent rebalances mean brief state-store unavailability windows, the same diagnostic signal covered for ordinary consumer groups in Module 03'],
            ['restore-consumer records consumed (during startup)', 'How much changelog data is currently being replayed to rebuild state stores after a restart or rebalance — directly explains the "why is my count temporarily low" pattern from the Error Library'],
            ['commit-latency-avg', 'Under exactly_once_v2 (Part 07), how long transaction commits are taking — a rising trend points at transaction coordinator load or broker-side contention'],
          ]}
        />
        <Callout title="record-lateness is the single most diagnostic metric for a windowed pipeline" color={K}>
          A windowed aggregation that looks "wrong" almost always traces back to either an incorrectly
          configured timestamp extractor or a grace period that doesn't match real-world lateness. Watching
          <code>record-lateness-max</code> over time tells you empirically how late your actual input data
          tends to arrive relative to its own event time — the number to size a grace period against,
          rather than guessing a round value like 30 seconds and hoping it happens to be enough.
        </Callout>
        <Para>
          Most of these metrics are exposed the standard way any JVM application exposes metrics — JMX, with
          a Prometheus JMX exporter sidecar being the most common production pattern — so they flow into the
          same dashboards and alerting infrastructure the rest of an organization's services already use.
          There is no Kafka-Streams-specific monitoring stack to stand up; the only real work is knowing
          which of these particular metrics matter for a stream processing workload specifically, since a
          generic "CPU and memory look fine" dashboard would miss every one of the problems this table
          actually catches.
        </Para>
        <Para>
          The single habit worth building early: treat consumer-group-style lag and rebalance metrics, state
          store restoration progress, and record lateness as a package deal for any stateful, windowed
          application, the same way Part 10 (Error Library) and Part 09b (scaling) both assume you already
          have visibility into all three before diagnosing a live incident — reconstructing that visibility
          for the first time during an active fraud-detection outage is a much worse position to be in.
        </Para>
      </section>

      <Divider />

      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 09e — Deploying a Kafka Streams application" />
        <SectionTitle>Deploying a Kafka Streams Application — Ordinary Service Infrastructure</SectionTitle>
        <Para>
          Because Kafka Streams is a library rather than a submitted job, deploying it is genuinely no
          different from deploying any other JVM service — a JAR or container image, built through the same
          CI/CD pipeline as everything else, running under Kubernetes, ECS, or whatever your platform
          standardizes on. There is no Kafka-Streams-specific deployment artifact type and no separate
          scheduler to submit a job to.
        </Para>
        <CodeBox label="the shape of a minimal container deployment">
{`# Dockerfile
FROM eclipse-temurin:17-jre
COPY target/fraud-txn-count-detector.jar /app/app.jar
ENTRYPOINT ["java", "-jar", "/app/app.jar"]

# Kubernetes deployment -- an ordinary Deployment, nothing
# Kafka-Streams-specific about the manifest itself
apiVersion: apps/v1
kind: Deployment
metadata:
  name: fraud-txn-count-detector
spec:
  replicas: 4    # <- scaling is literally this number, per Part 09b
  template:
    spec:
      containers:
        - name: app
          image: freshcart/fraud-txn-count-detector:1.4.0
          env:
            - name: KAFKA_BOOTSTRAP_SERVERS
              value: "broker-1:9092,broker-2:9092"
          volumeMounts:
            - name: state-dir
              mountPath: /var/kafka-streams   # local RocksDB state, Part 04
      volumes:
        - name: state-dir
          persistentVolumeClaim:
            claimName: fraud-detector-state`}
        </CodeBox>
        <Para>
          The one Kafka-Streams-specific deployment consideration worth calling out is the local state
          directory (<code>state.dir</code>) — since state stores are RocksDB files on local disk, backed
          by changelog topics for recoverability per Part 04, mounting a persistent volume rather than
          ephemeral container storage means a pod restart on the same node can reuse its existing local
          state instead of always replaying the full changelog from scratch, shortening recovery time
          without needing standby replicas at all for that specific failure mode.
        </Para>
        <Table
          headers={['Deployment detail', 'Why it matters for Kafka Streams specifically']}
          rows={[
            ['application.id', 'Doubles as the underlying consumer group ID and as a prefix for every internal topic (repartition and changelog topics) the application creates — changing it means starting from a cold state with no history'],
            ['state.dir persistence', 'Ephemeral storage forces a full changelog replay on every single restart, even a routine deploy; a persistent volume avoids that for same-node restarts'],
            ['Graceful shutdown (SIGTERM handling)', 'Calling streams.close() on shutdown lets Kafka Streams leave the consumer group cleanly, avoiding an unnecessary session-timeout-driven rebalance on every routine deploy'],
            ['Replica count vs partition count', 'Per Part 09b, replicas beyond the input topic\'s partition count sit idle — right-size replicas to partitions, not to a generic scaling heuristic'],
          ]}
        />
      </section>

      <Divider />

      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 10 — Worked example: real-time fraud detection" />
        <SectionTitle>A Worked Example — Flagging Users Over a Transaction-Count Threshold in a 5-Minute Window</SectionTitle>
        <Para>
          FreshCart's fraud team wants a real-time signal: flag any user who makes more than 8 card
          transactions within any 5-minute tumbling window, a pattern strongly associated with card-testing
          fraud (an attacker rapidly trying small transactions on a stolen card number to check whether it
          is still valid). This is a textbook stateful, windowed aggregation — the exact shape of problem
          Kafka Streams' DSL is built for.
        </Para>
        <SubTitle>Step 1 — model the input as a KStream, keyed by user</SubTitle>
        <Para>
          The source topic, <code>freshcart.transactions</code>, carries one record per transaction. Each
          record's key is already the <code>user_id</code>, which matters because Kafka Streams'
          <code>groupByKey</code> avoids an unnecessary repartition when the stream is already keyed
          correctly for the aggregation that follows — re-keying with <code>groupBy</code> instead would
          force a repartition topic and added latency for no reason here.
        </Para>
        <SubTitle>Step 2 — group by key, window, and count</SubTitle>
        <Para>
          This is expressed with the Kafka Streams DSL as a chain: read the topic as a KStream, group the
          already-keyed stream, apply a 5-minute tumbling window, and count records per user per window.
        </Para>
        <CodeBox label="fraud detection topology — Kafka Streams DSL (Java-style)">
{`StreamsBuilder builder = new StreamsBuilder();

KStream<String, Transaction> transactions = builder.stream(
    "freshcart.transactions",
    Consumed.with(Serdes.String(), transactionSerde)
);

KTable<Windowed<String>, Long> txnCountsPerWindow = transactions
    .groupByKey()
    .windowedBy(TimeWindows.ofSizeAndGrace(
        Duration.ofMinutes(5),
        Duration.ofSeconds(30)   // grace period for late-arriving events
    ))
    .count(Materialized.as("user-txn-counts-5min"));

KStream<String, FraudAlert> alerts = txnCountsPerWindow
    .toStream()
    .filter((windowedUserId, count) -> count > 8)
    .map((windowedUserId, count) -> KeyValue.pair(
        windowedUserId.key(),
        new FraudAlert(
            windowedUserId.key(),
            count,
            windowedUserId.window().startTime(),
            windowedUserId.window().endTime()
        )
    ));

alerts.to("freshcart.fraud-alerts", Produced.with(Serdes.String(), fraudAlertSerde));

Properties props = new Properties();
props.put(StreamsConfig.APPLICATION_ID_CONFIG, "fraud-txn-count-detector");
props.put(StreamsConfig.BOOTSTRAP_SERVERS_CONFIG, "broker-1:9092,broker-2:9092");
props.put(StreamsConfig.PROCESSING_GUARANTEE_CONFIG, StreamsConfig.EXACTLY_ONCE_V2);

KafkaStreams streams = new KafkaStreams(builder.build(), props);
streams.start();`}
        </CodeBox>
        <Para>
          Walking through what this actually does at runtime: every transaction record for a given user
          updates that user's count in the current 5-minute window's local state store (RocksDB-backed, per
          Part 04, with the update also written to the operation's changelog topic for fault tolerance).
          <code>windowedBy</code> means the count is tracked separately per window — a user's count in
          window [12:00-12:05) is entirely independent of their count in [12:05-12:10). The downstream
          <code>filter(count {'>'} 8)</code> only lets through window results that actually exceed the
          threshold, and the result is produced to a dedicated <code>freshcart.fraud-alerts</code> topic
          that a separate alerting service consumes.
        </Para>
        <SubTitle>Step 3 — what a downstream alert actually looks like</SubTitle>
        <CodeBox label="output landing on freshcart.fraud-alerts">
{`{
  "user_id": "U-88213",
  "transaction_count": 11,
  "window_start": "2026-09-11T14:35:00Z",
  "window_end": "2026-09-11T14:40:00Z"
}`}
        </CodeBox>
        <Output>{`Alert consumed by fraud-response-service:
  User U-88213 made 11 transactions between 14:35 and 14:40 UTC
  -> threshold (8) exceeded
  -> triggers: temporary card hold + risk-team review queue
  -> latency from 8th transaction to alert produced: ~340ms`}</Output>
        <SubTitle>Why event-time and the grace period both matter here</SubTitle>
        <Para>
          If this topology used processing time instead of event time, a burst of delayed transaction
          events arriving together after a brief network hiccup upstream could all land in whatever window
          happens to be open at the moment they finally arrive — potentially causing a false fraud alert
          for a user whose transactions were actually spread across a much longer real-world period, or
          missing a genuine pattern whose events get scattered into windows they did not actually belong
          to. The <code>Duration.ofSeconds(30)</code> grace period in the code above accepts transactions
          that arrive up to 30 seconds after their window's nominal end, still correctly attributed to the
          right window, before that window's result is finally considered closed.
        </Para>
        <Callout title="Why exactly_once_v2 is the right setting for this specific pipeline" color={K}>
          A card-testing fraud detector that double-counts transactions due to reprocessing after a crash
          could produce a false alert, or under-count and miss a genuine attack pattern by splitting what
          should have been one window's count across a reprocessed duplicate. Given the cost of both a false
          positive (an unnecessary card hold, a support burden) and a false negative (a missed fraud
          pattern), the added latency of <code>exactly_once_v2</code> is a reasonable trade here — exactly
          the kind of business-driven decision Part 07 frames this setting around.
        </Callout>
      </section>

      <Divider />

      <section style={{ marginBottom: 64 }} data-toc-kind="myth">
        <SectionTag text="// Misconceptions" />
        <SectionTitle>Five Misconceptions About Stream Processing and Kafka Streams</SectionTitle>
        {[
          {
            wrong: '"Kafka Streams needs its own cluster, the same way Kafka Connect does"',
            right: 'Part 02 is explicit that Kafka Streams is a client library embedded in your own application process, not a separately-operated cluster. Scaling it means running more instances of your own application, not adding nodes to some Kafka Streams-specific infrastructure.',
          },
          {
            wrong: '"A KTable is just a KStream with a different name"',
            right: 'Part 03 draws the real distinction: a KStream treats every record as an independent event, while a KTable treats a new record for an existing key as replacing the prior value — a changelog of current state, not a sequence of facts. The same topic can be read either way, and the choice changes what a join or aggregation against it actually means.',
          },
          {
            wrong: '"Windowing just groups events by arrival time, so it always reflects when things really happened"',
            right: 'Part 05 is direct that Kafka Streams defaults to event-time semantics precisely because arrival (processing) time can lag real event time — sometimes by hours after an outage. Confusing the two can put events in the wrong window entirely, producing a materially wrong aggregation.',
          },
          {
            wrong: '"You can join two KStreams the same way you join a KStream to a KTable, just without a window if you don\'t need one"',
            right: 'Part 06 is explicit that the Kafka Streams API requires a join window for any KStream-KStream join — it is not optional. Two unbounded streams cannot be joined without bounding how far apart in time a match is allowed to be, or the operation would need to hold unmatched state forever.',
          },
          {
            wrong: '"Setting exactly_once_v2 makes every side effect in my topology exactly-once, including calls to external systems"',
            right: 'Part 07\'s closing callout is precise about the boundary: exactly_once_v2 covers state updates, output records, and offset commits within Kafka Streams\' own transaction against the Kafka cluster. A call to an external API or database from inside a processor is outside that boundary and needs its own idempotency handling.',
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
            <strong>At Samsara:</strong> the fleet telemetry team needs to detect when a vehicle's sensor
            readings show a sustained speed violation — not a single spike, but a pattern over a rolling
            window — and raise an alert within seconds, not after a nightly batch job runs. They build a
            Kafka Streams application using a hopping window over the vehicle-telemetry topic, following
            Part 05's pattern, so the violation check re-evaluates every 30 seconds over a 5-minute window
            rather than waiting for a full window to close before producing any signal at all.
          </Para>
        </HighlightBox>
        <HighlightBox>
          <Para>
            <strong>At Faire:</strong> the marketplace trust team wants to enrich every incoming order event
            with the seller's current trust-score tier before routing it to a risk-scoring service. Rather
            than calling a trust-score API synchronously on every order (adding latency and a hard
            dependency to the checkout path), they materialize seller trust scores as a KTable from a
            change-data-capture topic and perform a KStream-KTable join, per Part 06 — every order is
            enriched with whatever the seller's trust tier currently is, entirely inside the streaming
            application, with no external call in the hot path.
          </Para>
        </HighlightBox>
        <HighlightBox>
          <Para>
            <strong>In a systems design interview:</strong> "Design a real-time system that flags a user
            attempting more than N logins in M minutes." The strong answer, straight from Part 08's worked
            example, is a stateful, windowed count keyed by user ID over the login-attempts topic — using
            Kafka Streams' groupByKey().windowedBy().count() shape, with an explicit discussion of why
            event-time windowing and a grace period matter for correctness under network delay, not just
            "count events in the last N minutes" as a vague description.
          </Para>
        </HighlightBox>
      </section>

      <Divider />

      <section style={{ marginBottom: 64 }} data-toc-kind="prep">
        <SectionTag text="// Interview Prep" />
        <SectionTitle>5 Interview Questions — With Complete Answers</SectionTitle>
        {[
          {
            q: 'Q1. What is the fundamental difference between batch and stream processing, and why does that difference shape everything else about how a system like Kafka Streams is designed?',
            a: `Batch processing operates over a bounded, fixed dataset — a job starts, reads everything that exists at that moment, computes a result, and finishes, as Part 01 covers. Stream processing operates over an unbounded stream that never finishes arriving — there is no moment at which "all the data" exists, so a stream processing job runs continuously, producing and updating results as new events show up, for as long as it stays deployed.

That difference is why concepts like windowing exist at all. A batch job can always answer "what is the total" by looking at everything, but a stream processing job never has everything — only what has arrived so far — so a running count needs to be explicitly bounded by time (a window) to be a meaningful, finite answer rather than a number that only ever grows.

It's also why stateful operations in Kafka Streams need durable, recoverable local state — a batch job can simply restart and reread its bounded input, but a long-running stream processing job needs to survive a crash or rebalance without recomputing its entire history, which is exactly what changelog-topic-backed state stores are for, covered in Part 04.`,
          },
          {
            q: 'Q2. Explain what makes Kafka Streams architecturally different from Kafka Connect or an external engine like Flink.',
            a: `The core distinction, from Part 02, is that Kafka Streams is a client library, not a separately-operated cluster. You add it as a dependency to your own application, and your application — deployed and scaled exactly like any other service in your infrastructure — IS the stream processing job. There's no Kafka Streams cluster to stand up, secure, or operate.

Kafka Connect, by contrast, runs its own worker processes that you submit connector configurations to via REST — the connector logic runs inside Connect's infrastructure, not your application. An external engine like Flink or Spark Structured Streaming goes further still: you submit a job to a genuinely separate cluster (JobManager/TaskManagers, or a Spark cluster) that someone operates independently of any individual application.

The practical consequence is operational: if your team already knows how to deploy and scale a normal service, and your processing logic only needs to read from and write to Kafka topics, Kafka Streams usually has the lowest operational overhead, because there's no new cluster type to learn or maintain — scaling out is just running more instances of your application, and partition assignment rebalances across them using the same consumer group protocol covered in Module 03.`,
          },
          {
            q: 'Q3. When would you model a Kafka topic as a KStream versus a KTable, and what changes about a join depending on which one you use?',
            a: `The choice depends on what the topic actually represents, per Part 03. If every record is an independent fact that matters on its own — an order placed, a page view, a sensor reading — model it as a KStream, where a new record with the same key is simply another event, not a replacement. If the topic represents the latest state of an entity — a customer's current tier, a product's current price, an account's current status — model it as a KTable, where a new record for an existing key replaces the previous value, the same relationship a compacted topic has to its keys.

This directly changes what a join means. A KStream-KTable join, from Part 06, enriches each incoming event with whatever the KTable's current value is at that moment — not windowed, since the KTable is always "the latest state," so there's nothing to bound in time. A KStream-KStream join, on the other hand, is matching two genuinely unbounded event sequences against each other, which requires an explicit join window, because neither side ever finishes and Kafka Streams can't hold unmatched state forever waiting for a possible match.

Getting this modeling choice wrong — say, treating a customer-profile topic as a KStream — means a join or aggregation sees every historical profile update as a separate fact rather than always reflecting the latest one, which is rarely the intended business meaning.`,
          },
          {
            q: 'Q4. Why does event-time windowing matter more than processing-time windowing for a real aggregation like counting transactions per user in a time window?',
            a: `Because processing time — when the stream processing application happens to handle a record — can lag meaningfully behind event time, the actual real-world moment something happened, due to network delays, producer retries, or a consumer catching up after downtime, as Part 05 covers. If windowing used processing time, a burst of delayed events arriving together after an outage would all land in whatever window happens to be open at that moment, not the windows they actually occurred in — producing a wrong answer to "how many transactions happened between 2:00 and 2:05," which matters a lot for something like the fraud-detection example in Part 08.

Kafka Streams defaults to event-time semantics for exactly this reason, extracting a timestamp from each record via a configurable timestamp extractor rather than using the processing machine's wall clock.

The remaining wrinkle is that because event time can legitimately lag arrival even under event-time semantics, a window can't close the instant its nominal time range ends — a few more events belonging to it might still be in flight. That's what the grace period configuration is for: it keeps a window open a bit longer to accept legitimately late events before finally closing it, trading a small delay in finality for correctness.`,
          },
          {
            q: 'Q5. Walk me through how you would design a real-time fraud signal that flags a user making more than 8 transactions in any 5-minute window, and why you\'d choose exactly_once_v2 for it.',
            a: `This is a stateful, windowed aggregation, per Part 08's worked example. I'd read the transactions topic as a KStream already keyed by user ID — using groupByKey() rather than groupBy() specifically to avoid an unnecessary repartition, since the data is already correctly keyed for this aggregation. I'd apply a 5-minute tumbling window with windowedBy(TimeWindows.ofSizeAndGrace(...)), including a modest grace period to correctly handle transactions that arrive slightly after their window's nominal end, then count() per user per window.

The result is a KTable of (windowed user key) -> count, which I'd convert back to a stream and filter for counts exceeding the threshold, then produce those as fraud-alert records to a dedicated output topic that a separate alerting service consumes.

For the delivery guarantee, I'd set processing.guarantee=exactly_once_v2, from Part 07. The reasoning is a cost-of-error argument: without it, a crash and reprocessing could either double-count a user's transactions in a window, producing a false fraud alert and an unnecessary card hold, or split what should be one window's true count across a reprocessed duplicate, potentially masking a genuine attack pattern. Given both a false positive and a false negative carry real cost here, the added transaction-coordination latency of exactly_once_v2 is a reasonable trade for this specific pipeline — though I'd be explicit that this guarantee only covers the read-process-write loop within Kafka itself, not any external side effect like calling a card-network API, which would need its own idempotency handling regardless.`,
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
        <SectionTitle>Mistakes Teams Make Building Kafka Streams Applications</SectionTitle>
        {[
          {
            q: 'Modeling a current-state topic (profiles, prices, account status) as a KStream instead of a KTable',
            a: 'Part 03 is the reference: a KStream treats every record as a separate historical fact, so a join or aggregation against it sees every past update instead of always reflecting the latest value — rarely what "enrich with current state" actually means.',
          },
          {
            q: 'Using groupBy() when the data is already correctly keyed, forcing an unnecessary repartition',
            a: 'Part 08\'s worked example calls this out directly: groupByKey() avoids a repartition topic and its added latency when the input stream is already keyed the way the aggregation needs; groupBy() re-keys and always triggers a repartition, which should be a deliberate choice, not a default habit.',
          },
          {
            q: 'Windowing on processing time without realizing it, instead of event time',
            a: 'Part 05 shows how this silently misattributes delayed events to the wrong window when there is any lag between when something happened and when the application processes it — confirm which timestamp extractor is actually configured rather than assuming Kafka Streams\' event-time default is automatically doing the right thing with your specific record schema.',
          },
          {
            q: 'Attempting a KStream-KStream join without thinking through what join window is actually correct for the business question',
            a: 'Part 06 notes the API forces you to specify a window, but a window chosen without real thought (arbitrarily "5 minutes" copied from another pipeline) can silently miss genuinely related events that fall just outside it, or match unrelated events that happen to fall inside it — the window size is a business decision, not a technical formality to satisfy the compiler.',
          },
          {
            q: 'Treating exactly_once_v2 as covering side effects to systems outside Kafka',
            a: 'Part 07\'s closing callout and Interview Prep Q5 both flag this: a database write or external API call made from inside a Kafka Streams processor is not part of the Kafka transaction and can still execute more than once on reprocessing — it needs its own idempotency design regardless of the processing.guarantee setting.',
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
            error: `Application fails to start with "TopologyException: Invalid topology: KStream-KStream join requires a join window to be specified"`,
            cause: 'A KStream-KStream join was defined (e.g. via stream.join(otherStream, joiner, ...)) without a JoinWindows argument. Per Part 06, this is not an optional parameter — the Kafka Streams DSL will not construct a topology that tries to join two unbounded streams without a bound on how far apart in time a match is allowed.',
            fix: 'Add an explicit JoinWindows.ofTimeDifferenceWithNoGrace(Duration...) (or the grace-period variant) to the join call, sized to whatever "near each other in time" genuinely means for the business question — not an arbitrary default.',
          },
          {
            error: `A fraud/aggregation count is visibly lower than expected right after a rolling deploy of the Kafka Streams application, then slowly climbs back to the correct value over the following minutes`,
            cause: 'After a deploy, application instances restarted and some partitions were reassigned to different instances. The new owner of those partitions had to rebuild its local RocksDB state store by replaying that store\'s changelog topic from the beginning, per Part 04 — until that replay finishes, queries against the (still-rebuilding) state store return an incomplete count.',
            fix: 'This is expected recovery behavior, not data loss — the changelog replay will complete and the count will become accurate. If recovery time itself is a problem, consider standby replicas (num.standby.replicas > 0), which keep a warm, continuously-updated replica of each state store on another instance so a rebalance can switch to an already-current store instead of replaying from scratch.',
          },
          {
            error: `A windowed aggregation silently drops transactions that clearly happened within the intended window, based on their embedded event timestamp`,
            cause: 'The window\'s grace period, from Part 05, has already elapsed by the time those specific records are processed — they arrived late enough (beyond the configured grace duration past the window\'s nominal end) that Kafka Streams considers the window already closed and discards them rather than including them.',
            fix: 'Increase the grace period on the window definition (TimeWindows.ofSizeAndGrace(...)) to accommodate the realistic worst-case lag your specific upstream data source exhibits, weighing that against how much longer window results take to become final and how much longer their state must be retained.',
          },
          {
            error: `An application configured with processing.guarantee=exactly_once_v2 shows noticeably higher end-to-end latency than an equivalent at_least_once pipeline, and the team assumes something is misconfigured`,
            cause: 'This is the expected cost of the guarantee, not a misconfiguration, per Part 07\'s comparison table — wrapping state updates, output production, and offset commits into one Kafka transaction per batch adds real transaction-coordination overhead compared to the simpler at_least_once path.',
            fix: 'Confirm the latency is actually a problem for the specific business requirement before reverting the setting — if occasional duplicate output or double-counted state on reprocessing is genuinely tolerable for this pipeline, at_least_once may be the correct trade instead. Do not treat exactly_once_v2\'s added latency as an implementation bug to be optimized away without weighing what it buys.',
          },
          {
            error: `A KStream-KTable join produces no output at all for a topic that clearly has matching keys on both sides`,
            cause: 'The most common cause is a co-partitioning mismatch: Kafka Streams requires both sides of the join to have the same number of partitions and be partitioned by the same key, so a given key\'s records land on the corresponding partition index on both sides. If the KTable\'s source topic has a different partition count than the KStream\'s, the join silently fails to find matches for keys that are, from the topic\'s partition assignment perspective, never actually co-located.',
            fix: 'Ensure both source topics have the same partition count and are keyed identically. If they are not, repartition one side explicitly (via through() or an internal repartition step) before the join, rather than assuming Kafka Streams will reconcile a partition-count mismatch automatically — it does not.',
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
          'Stream processing operates continuously over an unbounded event stream and never "finishes," unlike batch processing over a bounded, fixed dataset — this is why aggregations need explicit windows to produce well-defined, finite results.',
          'Kafka Streams is a client library embedded in your own application, not a separate cluster — unlike Kafka Connect or external engines like Flink, scaling it means running more of your own application instances, which rebalance partitions using the same consumer group protocol as any other Kafka consumer.',
          'A KStream treats every record as an independent event; a KTable treats a new record for an existing key as replacing the prior value, representing current state — the same relationship a compacted topic has to its keys.',
          'Stateless operations (map, filter, branch) need no local memory. Stateful operations (aggregations, joins) need local, RocksDB-backed state stores, each backed by an automatically-managed changelog topic that allows state to be rebuilt after a crash or rebalance.',
          'Windowing bounds an otherwise-unbounded aggregation by time — tumbling windows are fixed and non-overlapping, hopping windows overlap by advancing faster than their size, and sliding windows are defined relative to pairs of nearby events.',
          'Kafka Streams defaults to event-time windowing, not processing-time, because arrival lag can otherwise misattribute events to the wrong window — a configurable grace period accepts legitimately late events before a window is finally closed.',
          'KStream-KTable and KTable-KTable joins are unwindowed and always reflect the latest state. KStream-KStream joins require an explicit join window, since neither side of two unbounded streams can wait indefinitely for a match.',
          'processing.guarantee=exactly_once_v2 wraps state updates, output records, and input offset commits into one Kafka transaction, preventing duplicate output or double-counted state on reprocessing — but it does not cover side effects to systems outside Kafka, which need their own idempotency design.',
          'A real-time, windowed count-per-key aggregation (like flagging a user over a transaction threshold in a 5-minute tumbling window) is the canonical Kafka Streams pattern: groupByKey, windowedBy, count, filter, and produce alerts to an output topic — all inside one long-running application.',
        ]}
      />
    </LearnLayout>
  )
}
