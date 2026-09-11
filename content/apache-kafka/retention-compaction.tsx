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
  <div style={{ marginBottom: 26 }}>
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

export default function RetentionCompaction() {
  return (
    <LearnLayout
      title="Retention and Log Compaction"
      description="What retention.ms and retention.bytes actually delete, how segment-granular deletion works physically, the difference between delete and compact cleanup policies, tombstones, and picking the right policy for event streams versus entity changelogs."
      section="Apache Kafka — Module 08"
      readTime="60 min"
      updatedAt="September 2026"
      breadcrumbs={[
        { label: 'Learn', href: '/learn' },
        { label: 'Apache Kafka', href: '/learn/apache-kafka' },
        { label: 'Retention and Log Compaction', href: '/learn/apache-kafka/retention-compaction' },
      ]}
      prev={{ title: 'Keys, Ordering, and Partitioning Strategy', href: '/learn/apache-kafka/keys-ordering-partitioning' }}
      next={{ title: 'Delivery Semantics: At-Most, At-Least, Exactly-Once', href: '/learn/apache-kafka/delivery-semantics' }}
    >
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 01 — Retention is not optional forever-storage" />
        <SectionTitle>Kafka Deletes Old Data By Default — It Is Not a Database</SectionTitle>
        <Para>
          A very common mental model, especially for engineers coming from traditional databases, is that
          Kafka is a durable store that keeps everything you write to it forever, the way a table in Postgres
          keeps every row until you explicitly delete it. That model is wrong, and it matters because it leads
          teams to build systems that quietly assume history is available long after Kafka has already
          deleted it.
        </Para>
        <Para>
          Every Kafka topic has a retention policy, controlled primarily by two settings:
          <code>retention.ms</code> (how long, in milliseconds, records are kept before becoming eligible for
          deletion) and <code>retention.bytes</code> (a size cap per partition, after which the oldest data is
          deleted regardless of age). The out-of-the-box default for <code>retention.ms</code> is seven days.
          Unless a topic is explicitly configured otherwise, data written to it today will be gone in a week.
        </Para>
        <HighlightBox>
          <Para>
            <strong>Beginner model:</strong> Kafka is durable storage — once a record is written, it stays
            available indefinitely, like a row in a database table.
          </Para>
          <Para>
            <strong>Production model:</strong> Kafka is a bounded, time- or size-limited log by default.
            Records age out and are physically deleted according to <code>retention.ms</code> and
            <code>retention.bytes</code>. Anything that needs to survive longer than the configured retention
            window must be copied somewhere else — a data warehouse, an object store, a database — or the
            topic's retention must be deliberately extended (or set to effectively unlimited) for that
            specific use case.
          </Para>
        </HighlightBox>
        <CodeBox label="retention settings on a topic">
{`# Default retention — 7 days, whichever limit is hit first also applies
retention.ms=604800000          # 7 days in milliseconds
retention.bytes=-1              # -1 means "no size limit", so time is the only bound here

# A topic explicitly kept longer, e.g. for compliance/audit replay
retention.ms=2592000000         # 30 days

# A topic explicitly bounded by size instead of time (e.g. high-volume debug topic)
retention.bytes=10737418240     # 10 GB per partition — oldest data deleted once exceeded

# Both set together — whichever threshold is reached first triggers deletion
retention.ms=604800000
retention.bytes=53687091200     # 50 GB per partition`}
        </CodeBox>
        <Para>
          Whichever of these two limits is reached first is the one that triggers deletion. If a topic has
          both a time limit and a size limit configured, a sudden burst of volume can cause the size limit to
          delete data well before the time limit would have. This is a frequent source of "why is my data gone
          earlier than I expected" incidents — someone configured both without realizing the size limit was
          the tighter constraint under real production volume.
        </Para>
        <Para>
          It's worth sizing retention against a real, concrete number rather than picking a round figure like
          "7 days" out of habit. The right question is: how long does the slowest legitimate consumer of this
          topic need to be able to catch up after downtime, and how far back does replay ever realistically
          need to reach — a nightly batch job that only ever reads the last 24 hours needs far less retention
          than a topic that occasionally needs a full historical reprocess for a new consumer being onboarded.
          Retention set shorter than the real requirement causes silent, permanent data loss the moment a
          consumer falls behind by more than the window; retention set far longer than necessary just spends
          disk budget for no benefit.
        </Para>
      </section>

      <Divider />

      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 02 — Segment-granular deletion" />
        <SectionTitle>Deletion Happens by Segment, Not by Individual Record</SectionTitle>
        <Para>
          Understanding how retention is physically implemented explains a lot of Kafka's behavior that
          otherwise seems surprising. A partition's log is not one giant file that Kafka scans record by
          record looking for expired entries. It is split into segments — fixed-size files, commonly capped
          around a gigabyte by default, plus companion index files. Only one segment per partition, the active
          segment, is ever being written to; every other segment is closed and immutable.
        </Para>
        <Para>
          The broker's log cleaner (or, for time-based deletion specifically, a background retention thread)
          periodically checks each closed segment's newest record timestamp. If that timestamp is older than
          the retention window, the <em>entire segment file</em> becomes eligible for deletion and is removed
          from disk as one operation. This means deletion is granular at the segment level, not the individual
          record level — there is no operation in Kafka that deletes "just this one record" out of the middle
          of a segment while keeping the rest.
        </Para>
        <CodeBox label="segment-granular deletion, worked through">
{`# Partition on disk, retention.ms = 7 days, "today" = day 10

/data/kafka/freshcart.clicks-2/
    00000000000000000000.log   # covers day 1 - day 2 records  → newest record: day 2
    00000000000000480210.log   # covers day 2 - day 4 records  → newest record: day 4
    00000000000001102873.log   # covers day 4 - day 7 records  → newest record: day 7
    00000000000001987340.log   # covers day 7 - day 10 records → newest record: day 10 (ACTIVE)

# retention boundary: anything with newest-record-timestamp older than day 3 (10 - 7) is eligible
# (using day 10 as "now" and a 7-day window for this illustration)

# segment 1 (newest record: day 2) → ENTIRELY past the boundary → deleted as one file
# segment 2 (newest record: day 4) → newest record still within the window → KEPT ENTIRELY
#     even though this segment also contains some day-2 and day-3 records that are
#     individually "expired" by the 7-day rule — they are NOT deleted separately,
#     because the segment as a whole is not yet eligible
# segment 3, 4 → clearly within the window, kept

# Consequence: a record can sit on disk somewhat past its "logical" retention age
# if it shares a segment with newer records. Retention is a segment-boundary
# approximation of the configured time window, not an exact per-record guarantee.`}
        </CodeBox>
        <Callout title="Why this design, not per-record deletion" color="#38bdf8">
          Segment-granular deletion is what makes retention cheap. Deleting a whole file is a single,
          near-instant filesystem operation. Scanning a log and rewriting it with individual expired records
          removed would require reading and rewriting gigabytes of data continuously — exactly the kind of
          random, in-place mutation that append-only logs are designed to avoid. The trade-off is that
          retention is enforced at segment granularity, slightly coarser than the exact configured millisecond
          window, which is an acceptable approximation for the vast majority of use cases.
        </Callout>
        <Para>
          This also explains why shrinking <code>retention.ms</code> on a topic doesn't immediately free disk
          space in a smooth, proportional way. Space is freed in segment-sized chunks whenever a whole
          segment's newest record finally ages past the new boundary — not continuously as each record
          crosses the line.
        </Para>
      </section>

      <Divider />

      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 03 — cleanup.policy=delete" />
        <SectionTitle>The delete Policy: Time and Size, Nothing About Keys</SectionTitle>
        <Para>
          The behavior described in Parts 01 and 02 — segments aging out based on time or size — is
          controlled by a topic-level setting called <code>cleanup.policy</code>, and the value that enables
          this behavior is <code>cleanup.policy=delete</code>, which is the default for ordinary topics. Under
          this policy, Kafka has no concept of "keys" at all when deciding what to remove. It only looks at
          how old a segment is (or how much total data has accumulated) — every record, regardless of its key
          or whether other records share that key, is deleted purely by age or size.
        </Para>
        <Para>
          This is the right policy for what you'd intuitively call an "event stream" — a sequence of discrete
          things that happened, where each event is meaningful on its own and there is no notion of one event
          "superseding" another. A page-view event, a payment-captured event, a sensor reading, a click — each
          is a fact about a specific moment in time. Once that time window has passed and the data has been
          consumed and/or exported elsewhere, there's nothing more that record is "for."
        </Para>
        <CodeBox label="cleanup.policy=delete — what it deletes, and what it explicitly does not do">
{`cleanup.policy=delete
retention.ms=604800000   # 7 days

# freshcart.clicks — key = session_id, value = {page, timestamp, ...}

# offset 0: key=session_A  value={page:"/home", ts: day 1}
# offset 1: key=session_B  value={page:"/cart", ts: day 1}
# offset 2: key=session_A  value={page:"/checkout", ts: day 1}

# After 7 days pass and these records' segment ages out:
# ALL THREE are deleted together, once their segment crosses the retention boundary.
# Kafka does NOT look at the fact that session_A appears twice and keep only
# the newer session_A record — delete policy has no per-key awareness whatsoever.
# It is purely time/size-based, full stop.`}
        </CodeBox>
        <Callout title="delete policy has no opinion about keys" color="#f97316">
          It's a common and reasonable mistake to expect that Kafka somehow "deduplicates by key" under normal
          retention. It does not. Under cleanup.policy=delete, having a key at all is irrelevant to what gets
          deleted — a key here is purely for partitioning and ordering, covered in the companion module on
          keys and partitioning strategy, not for retention behavior. If you need "keep only the latest value
          per key," that is a different policy entirely, covered next.
        </Callout>
      </section>

      <Divider />

      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 04 — cleanup.policy=compact" />
        <SectionTitle>The compact Policy: Keep Only the Latest Value Per Key, Forever</SectionTitle>
        <Para>
          Some data isn't a stream of independent events — it's a series of updates to the current state of
          something. A customer's current shipping address. A product's current price. A user's current
          account-status flag. For data like this, what you actually want to retain is not "everything that
          ever happened," but "the most recent value for every key, indefinitely," regardless of how old that
          latest value is. Time-based retention is the wrong tool here — it would eventually delete even the
          single most recent, still-current value once it aged past the retention window.
        </Para>
        <Para>
          <code>cleanup.policy=compact</code> is built exactly for this. Instead of deleting whole segments
          by age, the log cleaner periodically scans a compacted topic's older segments and removes any record
          whose key has a newer record later in the log — keeping only the record with the highest offset for
          each key. The result is a log that, over time, shrinks down to hold at most one record per distinct
          key: the latest one.
        </Para>
        <CodeBox label="log compaction, worked through">
{`# freshcart.product-prices — cleanup.policy=compact
# key = product_id, value = current price snapshot

# BEFORE compaction (chronological order, by offset):
# offset 0: key=P1001  value={price: 18900}
# offset 1: key=P1002  value={price: 67500}
# offset 2: key=P1001  value={price: 19500}   ← price changed
# offset 3: key=P1003  value={price: 23400}
# offset 4: key=P1002  value={price: 69000}   ← price changed again
# offset 5: key=P1001  value={price: 21000}   ← price changed a third time

# AFTER compaction — the log cleaner keeps only the HIGHEST offset per key:
# offset 3: key=P1003  value={price: 23400}   ← only version that ever existed
# offset 4: key=P1002  value={price: 69000}   ← latest of two versions
# offset 5: key=P1001  value={price: 21000}   ← latest of three versions

# offsets 0, 1, 2 are gone — not because they aged out by time, but because
# a NEWER record for the same key made them obsolete

# A new consumer reading this topic from the beginning after compaction sees
# exactly one record per product — a complete, current snapshot of every
# product's price, reconstructed just by reading the log start to finish.`}
        </CodeBox>
        <Para>
          This pattern — a compacted topic acting as a "changelog" that any consumer can replay from the
          beginning to rebuild current state — is the foundation of Kafka Streams and ksqlDB state stores.
          When a streaming aggregation needs to recover after a crash or restart, it doesn't need to
          re-process the entire history of raw events; it rebuilds its in-memory state by replaying the much
          smaller compacted changelog topic that already holds just the latest aggregated value per key.
        </Para>
        <Table
          headers={['Property', 'Event stream (delete)', 'Entity changelog (compact)']}
          rows={[
            ['What is kept', 'Everything within the time/size window', 'One record per key — always the latest'],
            ['What triggers removal', 'Age or size of the segment', 'A newer record for the same key appearing later'],
            ['Can old values disappear while still "current"?', 'Yes — everything ages out eventually, even the latest fact', 'No — the latest value per key is retained indefinitely'],
            ['Full history available?', 'Yes, within the retention window', 'No — only the latest value per key survives compaction'],
            ['Typical use', 'Clicks, page views, raw sensor readings, order-lifecycle events', 'Current price per product, current address per customer, Kafka Streams state stores'],
          ]}
        />
        <SubTitle>The head and tail of a compacted log — and why compaction isn't instantaneous</SubTitle>
        <Para>
          A compacted partition is conceptually split into two regions. The tail is the portion the log
          cleaner has already compacted — guaranteed to hold at most one record per key. The head is the
          active segment (and possibly a few recent segments) still being written to, which the cleaner has
          not processed yet and which can still contain multiple records for the same key. This means a
          consumer reading a compacted topic in real time can briefly see more than one value for a key
          before that region is compacted — compaction is a background process running on a cycle, not an
          instantaneous rewrite on every new record.
        </Para>
        <CodeBox label="dirty ratio — what actually triggers a compaction pass">
{`# The log cleaner doesn't compact continuously on every write — it runs
# periodically, triggered by a "dirty ratio" threshold per partition:
#
#   dirty ratio = (bytes in the uncompacted "head" region)
#               / (total bytes in the partition)
#
# min.cleanable.dirty.ratio = 0.5 (default)
#
# Once the uncompacted portion exceeds 50% of the partition's total size,
# the log cleaner schedules a compaction pass for that partition.
#
# Lowering min.cleanable.dirty.ratio (e.g. to 0.1) triggers compaction more
# often — keeps the topic smaller and closer to true steady-state, at the
# cost of more constant background I/O from the cleaner.
#
# Raising it (e.g. to 0.8) compacts less often — less cleaner overhead, but
# the topic can temporarily grow larger than the steady-state estimate from
# Part 09 before the next pass catches up.`}
        </CodeBox>
        <Callout title="Practical implication: don't assume instant convergence" color="#f97316">
          If you write three updates for the same key in quick succession and immediately read the topic from
          the beginning, you may legitimately see all three records, not just the latest one — the region
          containing them hasn't been compacted yet. This is expected, not a bug. Code that depends on
          "exactly one record per key" holding at every instant (rather than eventually, once compaction
          catches up) needs to explicitly take the latest record it sees for a key, not assume the log itself
          enforces that uniqueness in real time.
        </Callout>
      </section>

      <Divider />

      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 05 — Tombstones" />
        <SectionTitle>Deleting a Key From a Compacted Topic: The Tombstone Record</SectionTitle>
        <Para>
          Log compaction as described so far only ever keeps the latest value per key — it has no way to
          represent "this key should be removed entirely." If a customer closes their account, or a product
          is discontinued, you need a way to eventually make that key disappear from the compacted topic
          altogether, not just stop updating it (which would leave its last known value sitting there forever,
          looking current).
        </Para>
        <Para>
          The mechanism is the tombstone: a record with the key you want to remove, and a <code>null</code>
          value. Compaction treats a null-value record specially. First, it acts as the "latest value" for
          that key during compaction, so any earlier real values for that key get compacted away as normal.
          Then, after a further configurable delay — <code>delete.retention.ms</code> — the tombstone record
          itself is also removed from the log, and at that point the key is gone from the topic entirely, as
          if it had never existed.
        </Para>
        <CodeBox label="a tombstone, from write to final removal">
{`# freshcart.product-prices — cleanup.policy=compact, delete.retention.ms=86400000 (24h)

# Product P1002 is discontinued. Producer writes:
producer.send(topic="freshcart.product-prices", key="P1002", value=None)   # tombstone

# Immediately after compaction runs:
# offset 3: key=P1003  value={price: 23400}
# offset 6: key=P1002  value=null              ← tombstone — marks P1002 for deletion
# offset 5: key=P1001  value={price: 21000}
# (P1002's earlier real price records are gone, same as any other compacted-away version)

# A consumer reading the topic right now still sees the tombstone itself —
# this is intentional: downstream consumers (e.g. a cache, a materialized view)
# need to SEE the null value so they know to remove P1002 from their own state.
# If the tombstone were invisible, downstream systems could never learn about the deletion.

# After delete.retention.ms (24 hours) passes:
# offset 6 (the tombstone) is ALSO removed by the log cleaner.
# P1002 no longer appears anywhere in the topic — not as a price, not as a tombstone.
# A brand new consumer starting today would never even know P1002 once existed.`}
        </CodeBox>
        <Callout title="Why the delay before removing the tombstone itself" color="#ef4444">
          If a tombstone were deleted instantly, a consumer that was even briefly behind could miss it
          entirely — it would simply never see the null value, and would have no way of knowing the key needed
          to be removed from its own downstream state. <code>delete.retention.ms</code> gives every reasonably
          current consumer a window to actually observe the tombstone before it disappears. Setting this too
          low risks consumers missing deletions; setting it very high just delays how quickly disk space from
          a deleted key is reclaimed.
        </Callout>
      </section>

      <Divider />

      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 06 — compact,delete together" />
        <SectionTitle>Combining Both: cleanup.policy=compact,delete</SectionTitle>
        <Para>
          The two policies are not mutually exclusive. Setting <code>cleanup.policy=compact,delete</code>
          applies both behaviors to the same topic: the log cleaner still compacts away superseded values for
          each key (keeping the latest per key), and time- or size-based retention still applies on top of
          that, eventually deleting even the latest surviving record for a key once it's old enough.
        </Para>
        <Para>
          This combination is useful when you want "latest value per key" semantics but also want a hard
          upper bound on how long a key's value can survive without being refreshed — effectively an
          automatic expiry for entities that stop being updated. A session-state topic is a good example: you
          want the latest state per session_id (compact), but you also don't want session records for users
          who vanished a year ago sitting around forever just because they were never explicitly tombstoned
          (delete).
        </Para>
        <CodeBox label="compact,delete together">
{`cleanup.policy=compact,delete
retention.ms=2592000000   # 30 days

# freshcart.active-sessions — key = session_id, value = current session state

# Compaction behavior: only the latest state per session_id is kept as usual
# Deletion behavior: even that latest record is deleted if its segment ages
#                     past 30 days without a newer update for that key

# Net effect: a session that keeps getting updated (user still active) keeps
# its latest record indefinitely, refreshed by compaction each time.
# A session that goes quiet for 30+ days with no new updates eventually
# has even its last known state deleted by the retention side of the policy —
# an automatic cleanup for entities nobody is updating anymore.`}
        </CodeBox>
      </section>

      <Divider />

      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 07 — Compaction is not history, and not time-ordering" />
        <SectionTitle>What Compaction Is Not: A Full History, or a Time-Ordering Tool</SectionTitle>
        <Para>
          It's worth stating a limitation of compaction clearly, because it's easy to reach for compaction as
          a general-purpose retention upgrade and be surprised later. Compaction is specifically for "what is
          the latest value for this key" use cases. It is not a way to retain full history more cheaply, and
          it is not a mechanism for preserving or reconstructing the sequence of changes over time.
        </Para>
        <Para>
          Once compaction removes the older records for a key, they are gone — there is no way to ask "what
          was P1001's price at offset 0" after compaction has run, because that record no longer exists on
          disk. If your use case needs the full change history of an entity — every price P1001 has ever had,
          with timestamps, for an audit trail or a time-series analysis — a compacted topic is the wrong tool
          entirely. You'd want an ordinary <code>delete</code>-policy topic (or an external store like a data
          warehouse) that retains every individual change event, not just the latest one.
        </Para>
        <Table
          headers={['Need', 'Right tool', 'Why']}
          rows={[
            ['Current price for every product, rebuildable on restart', 'compact', 'Only the latest value per key matters; history of changes is irrelevant to the use case'],
            ['Full audit trail of every price change with timestamps', 'delete, with long retention (or export to a warehouse)', 'Compaction would destroy the older values you specifically need to keep'],
            ['Kafka Streams state store for a running aggregation', 'compact', 'The store only needs to recover its latest aggregated state, not replay every raw update'],
            ['Clickstream / page-view events', 'delete', 'Every event is independently meaningful; there is no "latest value per key" to keep'],
          ]}
        />
        <Callout title="A common false expectation" color="#38bdf8">
          Compaction does not give you time-travel or point-in-time reconstruction of a key's value history.
          It gives you exactly one thing well: the current value per key, cheaply maintained forever. If a
          requirement starts to sound like "what did this look like at time T," that requirement needs full
          history, and compaction has already thrown that away by design.
        </Callout>
      </section>

      <Divider />

      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 08 — Picking the right policy" />
        <SectionTitle>Guidance: Choosing cleanup.policy for a New Topic</SectionTitle>
        <Para>
          The decision usually comes down to one question, asked honestly about the data: does a new record
          for a given key represent a completely new, independently meaningful fact, or does it represent an
          update that supersedes the previous value for that key? The first case wants <code>delete</code>.
          The second wants <code>compact</code>, possibly combined with <code>delete</code> if you also want an
          expiry for stale, unrefreshed keys.
        </Para>
        <BulletList
          items={[
            'Order-placed, payment-captured, page-view, click, sensor-reading events → delete. Each record is a fact about a moment in time; nothing "supersedes" it.',
            'Current customer address, current product price, current account status, current inventory count → compact. Only the latest value matters; history of prior values is not the point of this topic.',
            'Kafka Streams / ksqlDB state store changelog topics → compact. These are automatically managed by the stream processing framework specifically because they need cheap, forever-latest-value semantics for fast recovery.',
            'CDC (change-data-capture) "latest row state" topics mirroring a database table → compact, keyed by primary key. This is the canonical compacted-topic use case — the topic becomes a live mirror of current table state.',
            'A session-state or presence topic where stale, unrefreshed entities should eventually vanish → compact,delete together, so quiet keys expire automatically instead of accumulating forever.',
          ]}
        />
        <CodeBox label="quick decision reference">
{`Ask: "does a new record for this key REPLACE the meaning of the old one,
       or is it a NEW, separate fact alongside the old one?"

REPLACES  → cleanup.policy=compact  (optionally + delete for stale-key expiry)
NEW FACT  → cleanup.policy=delete   (set retention.ms/.bytes to your real need)

# Common tell: if you would ever write application code that does
# "look up the LATEST record for this key" — that's a compaction signal.
# If you would ever write code that does
# "give me EVERY record for this key in order" — that's a delete-policy signal.`}
        </CodeBox>
        <Para>
          It's worth revisiting this decision whenever a topic's actual usage pattern changes, not just at
          creation time. A topic originally designed as a straightforward event stream sometimes grows an
          unplanned second use case — a team starts treating "the latest event per entity" as a de facto
          current-state signal, reading the stream and keeping only the newest record they've seen for each
          key in application memory. That's a strong sign the topic itself should have been (or should become)
          a compacted changelog rather than leaving every consumer to reinvent the same latest-value logic on
          top of a delete-policy topic that was never designed for it.
        </Para>
      </section>

      <Divider />

      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 09 — Sizing disk for retention" />
        <SectionTitle>Operational Sizing: Disk Planning for Retention and Compaction</SectionTitle>
        <Para>
          Retention configuration is not just a data-lifecycle decision — it is directly a disk capacity
          decision. Every byte a topic retains is a byte sitting on broker disks, multiplied by the topic's
          replication factor, because every replica holds a full copy of the partition's retained data. Sizing
          this correctly up front avoids the worst kind of Kafka incident: a broker running out of disk space
          and refusing all writes for every topic it hosts, not just the one that grew unexpectedly.
        </Para>
        <Para>
          For a <code>delete</code>-policy topic, the calculation is straightforward: retained size is roughly
          bytes-per-second times retention window in seconds, multiplied by replication factor. For a
          <code>compact</code>-policy topic, sizing is different and, in a healthy design, usually much
          smaller — the steady-state size approaches roughly one record per distinct key (plus some slack for
          records awaiting the next compaction pass), regardless of how many total updates have ever been
          written. This is one of the practical operational benefits of choosing compaction correctly: the
          topic's disk footprint stops growing with total event volume and instead tracks key cardinality.
        </Para>
        <CodeBox label="sizing a delete-policy topic vs a compact-policy topic">
{`# ── delete-policy topic: freshcart.clicks ──────────────────────────────────
# Throughput: 40 MB/second sustained
# retention.ms: 7 days = 604,800 seconds
# replication.factor: 3

# raw retained data per partition (topic-wide, summed across partitions):
# 40 MB/sec * 604,800 sec = ~23.6 TB

# with replication factor 3, total disk footprint across the cluster:
# 23.6 TB * 3 = ~70.8 TB

# this number keeps growing if throughput grows, and resets the calculation
# every time retention.ms changes — this topic's disk footprint is coupled
# directly to (throughput * retention window), forever

# ── compact-policy topic: freshcart.product-prices ──────────────────────────
# Distinct keys (products): ~2 million
# Average record size: ~400 bytes
# replication.factor: 3

# steady-state size, AFTER compaction has caught up, regardless of how many
# total price-change events have ever been produced:
# 2,000,000 * 400 bytes = ~800 MB per full copy

# with replication factor 3:
# 800 MB * 3 = ~2.4 GB

# this number tracks the number of distinct products, NOT total historical
# volume of price changes — a product can be repriced a million times and
# the topic's steady-state size barely moves, because compaction keeps
# collapsing it back down to one record per key`}
        </CodeBox>
        <Table
          headers={['Factor', 'delete-policy topic', 'compact-policy topic']}
          rows={[
            ['What drives steady-state size', 'Throughput × retention window', 'Number of distinct keys × average record size'],
            ['Grows with total historical event volume?', 'Yes, until data ages out', 'No — compaction continually collapses history back to latest-per-key'],
            ['Grows with replication factor?', 'Yes, linearly', 'Yes, linearly'],
            ['Risk if unbounded', 'Disk exhaustion if throughput increases faster than planned', 'Disk exhaustion if key cardinality grows far beyond plan, or if compaction falls behind write rate'],
          ]}
        />
        <Callout title="Compaction needs to keep up with writes, or size assumptions break" color="#ef4444">
          The "compaction keeps the topic small" property assumes the log cleaner can compact segments as fast
          as new records arrive. Under extremely high write rates, or with the log cleaner under-resourced
          (too few cleaner threads, cleaner I/O throttled too aggressively), uncompacted data can accumulate
          faster than it's cleaned, temporarily inflating a compacted topic's size well past the steady-state
          estimate. Monitor the log cleaner's lag (how much uncompacted data is waiting) on any high-throughput
          compacted topic, not just the topic's total size.
        </Callout>
      </section>

      <Divider />

      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 10 — Retention and compaction in the consumer replay path" />
        <SectionTitle>What a Fresh Consumer Actually Sees When It Replays From the Beginning</SectionTitle>
        <Para>
          A useful way to consolidate everything in this module is to trace through what a brand-new consumer
          sees when it starts reading a topic from the very beginning (offset 0, or the earliest surviving
          offset), for each cleanup policy. This is exactly the scenario that matters for rebuilding a cache,
          bootstrapping a new service, or recovering a Kafka Streams state store after a failure.
        </Para>
        <Para>
          For a <code>delete</code>-policy topic, "the beginning" is not offset 0 in the absolute sense — it's
          whatever the oldest surviving offset happens to be after retention has deleted everything older.
          The consumer sees every event that hasn't yet aged out, in write order, and nothing more. There is
          no way to recover events that were deleted before the consumer started reading, even if the
          consumer has never read this topic before.
        </Para>
        <Para>
          For a <code>compact</code>-policy topic, "the beginning" is similarly the oldest surviving offset,
          but what's sitting there is fundamentally different: it's the latest surviving value for whichever
          keys have not been superseded again since the last compaction pass reached that region, plus, deeper
          in the tail, exactly one record per key overall. A fresh consumer reading start to finish ends up
          with a complete, current snapshot of every key that has ever existed and not been tombstoned — not
          a history of changes, but a full current-state table reconstructed purely by reading records key by
          key and keeping whichever one it saw last for each key (which, in the compacted tail, is by
          definition the only one it will see).
        </Para>
        <CodeBox label="the replay path, compared side by side">
{`# ── delete-policy topic, freshcart.clicks, retention.ms=7 days ──────────────
# Consumer starts reading from the oldest surviving offset.
# Sees: every click event from the last (up to) 7 days, in the order they happened.
# Does NOT see: anything older than 7 days — permanently gone, not reconstructable.
# Use case this supports: "replay recent activity", NOT "what is the full history".

# ── compact-policy topic, freshcart.product-prices ───────────────────────────
# Consumer starts reading from the oldest surviving offset.
# Sees: one record per product_id — its latest known price — regardless of
#       how long ago that product was first created or last repriced.
# Does NOT see: any of the intermediate price changes for a product that has
#               been repriced since — those were compacted away.
# Use case this supports: "give me current state for everything", NOT
#                          "give me the history of how prices changed".

# The mental shortcut: delete-policy replay reconstructs recent HISTORY.
# compact-policy replay reconstructs current STATE. Neither one does the other's job.`}
        </CodeBox>
        <Para>
          This is precisely why Kafka Streams state stores, ksqlDB materialized views, and CDC "current row
          state" topics all lean on compaction rather than long retention — their entire purpose is answering
          "what does this look like right now," and a compacted topic answers that question directly on
          replay, in a bounded amount of data, no matter how much write volume has accumulated over the
          topic's lifetime.
        </Para>
      </section>

      <Divider />

      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 11 — A real compliance use case: right-to-erasure" />
        <SectionTitle>Using Tombstones for GDPR-Style Deletion Requests</SectionTitle>
        <Para>
          Tombstones aren't just an internal cleanup mechanism — they map directly onto a real business
          requirement that any team running Kafka in a regulated industry eventually has to solve: a customer
          exercising a right-to-erasure request (GDPR "right to be forgotten," CCPA deletion requests, or
          similar). Understanding exactly what a tombstone does and doesn't guarantee is essential to
          answering "can we actually comply with this request" honestly.
        </Para>
        <Para>
          A tombstone, once compacted and once <code>delete.retention.ms</code> has passed, removes that key
          from the compacted topic entirely — no consumer reading the topic afterward will ever see any trace
          of that key again. That is a genuine, durable deletion, well-suited to a compacted "current customer
          state" topic. But it's critical to be precise about scope: the tombstone only removes that key's
          data from that one compacted topic. It says nothing about copies of that customer's data sitting in
          non-compacted event-stream topics (which contain that customer's historical order-placed events,
          click events, and so on, under <code>delete</code> policy), in downstream data warehouse tables, in
          consumer application caches, or in backups.
        </Para>
        <CodeBox label="what a tombstone actually covers — and what it doesn't">
{`# Customer requests deletion: customer_id = "cust_88213"

# freshcart.customer-profile (cleanup.policy=compact, keyed by customer_id)
producer.send(topic="freshcart.customer-profile", key="cust_88213", value=None)
# → after compaction + delete.retention.ms: cust_88213 is GONE from this topic. ✓

# freshcart.orders (cleanup.policy=delete, keyed by order_id, NOT customer_id)
# → cust_88213's historical orders are scattered across this topic under
#   different keys (order IDs). A tombstone on customer_id does NOTHING here —
#   this topic doesn't even use customer_id as its key. ✗ not covered

# Downstream data warehouse table built from freshcart.orders
# → still has every historical row referencing cust_88213 until a SEPARATE
#   deletion/anonymization job runs against the warehouse. ✗ not covered

# A consumer's local in-memory cache, built by replaying freshcart.customer-profile
# BEFORE the tombstone was produced
# → still holds the old value until that consumer restarts and replays again,
#   or explicitly handles the tombstone it eventually receives. ✗ not covered until then`}
        </CodeBox>
        <Callout title="A tombstone is one piece of a deletion pipeline, not the whole pipeline" color="#ef4444">
          Treat "produce a tombstone" as necessary but not sufficient for a compliance deletion request. A
          real erasure pipeline needs an inventory of every place that customer's data lands — every topic
          keyed by that identifier (tombstone each one), every non-compacted topic that references it in the
          value rather than the key (which needs a separate strategy, often waiting out retention or an
          explicit redaction/republish), every downstream sink, and every consumer-side cache — with an
          explicit owner and deadline for each. This is exactly the kind of cross-system accounting that data
          engineering teams get asked to produce evidence of during an audit.
        </Callout>
      </section>

      <Divider />

      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 12 — Schema evolution on compacted topics" />
        <SectionTitle>A Note on Schema Changes for Long-Lived Compacted Data</SectionTitle>
        <Para>
          Because a compacted topic can hold a record written years ago sitting right next to one written
          seconds ago — whichever happens to be the latest surviving value for each key — schema compatibility
          matters more here than on an ordinary event-stream topic. A delete-policy topic's oldest surviving
          record is at most as old as its retention window; a compact-policy topic's oldest surviving record
          can be arbitrarily old, for any key that simply hasn't been updated in a long time.
        </Para>
        <CodeBox label="why schema compatibility bites harder on compacted topics">
{`# freshcart.customer-profile — compact policy, no retention.ms limit on the latest value

# A customer's profile record was last written 3 years ago (schema v1) and has
# never been updated since — compaction keeps that v1 record indefinitely,
# because it's still the latest (and only) value for that key.

# Today, the schema evolves to v4, and every NEW write uses v4.

# A consumer reading this topic from the beginning today sees a MIX:
#   - some keys with v1 records (never updated since)
#   - some keys with v2 or v3 records (updated at some point in between)
#   - some keys with v4 records (updated recently)
# ALL AT ONCE, in a single pass — because compaction doesn't touch a key's
# record just because the schema evolved; it only acts when a NEWER record
# for that key arrives.

# On a delete-policy topic with 7-day retention, the oldest schema version a
# consumer could ever see is bounded by how recently a schema changed within
# that window. On a compact-policy topic, there is no such bound — the
# consumer's deserializer needs to handle every schema version that was ever
# written to a key that hasn't been updated since, indefinitely.`}
        </CodeBox>
        <Para>
          The practical takeaway is that a schema registry with enforced backward compatibility (new fields
          optional with defaults, never required) matters even more for compacted topics than for event
          streams, precisely because there's no retention window eventually flushing out old schema versions
          the way there is on a delete-policy topic. A consumer of a long-lived compacted topic should assume
          it may need to deserialize the very first schema version that topic ever had, for as long as that
          topic exists.
        </Para>
      </section>

      <Divider />

      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 13 — Monitoring retention and compaction health" />
        <SectionTitle>The Metrics That Tell You Retention and Compaction Are Actually Working</SectionTitle>
        <Para>
          Retention and compaction are background processes running on their own schedules, independent of
          producer and consumer activity. That independence is exactly why they need their own monitoring —
          a topic can look completely healthy from a producer/consumer throughput dashboard while retention
          silently fails to reclaim disk, or while a compacted topic's log cleaner falls further and further
          behind, both of which eventually surface as a disk-exhaustion incident with very little warning if
          nobody was watching the right metrics.
        </Para>
        <Table
          headers={['Metric', 'What it tells you', 'Concerning signal']}
          rows={[
            ['Per-broker disk usage, trended over time', 'Whether retention is actually reclaiming space as expected', 'Steady upward trend with no plateau, on a topic where retention.ms should be bounding growth'],
            ['Log cleaner lag / uncleanable partition count', 'Whether compaction is keeping up with write volume on compacted topics', 'Growing "dirty" (uncompacted) bytes per partition, or partitions the cleaner reports as stuck'],
            ['LogEndOffset minus earliest available offset, per partition', 'Roughly how much data retention is currently keeping around', 'A sudden, unexplained shrink can mean retention.ms or retention.bytes was set unintentionally low'],
            ['Compacted-topic total size vs. distinct-key-count estimate', 'Whether a compacted topic is converging to its expected steady-state size', 'Size persistently well above the (key count × average record size) estimate from Part 09'],
          ]}
        />
        <CodeBox label="a concrete alerting setup for retention and compaction health">
{`# Alert 1 — broker disk usage trending toward capacity
# ALERT if disk_used_percent > 75% AND slope over last 24h > 0
# (catches a slow leak before it becomes an emergency, same pattern as the
#  consumer-lag alerting logic from the companion module on producers/consumers)

# Alert 2 — log cleaner falling behind on a compacted topic
# ALERT if uncleanable_partitions_count > 0
#   (this specifically means the cleaner has HIT AN ERROR on a partition and
#    stopped compacting it — a corrupted segment, for example — not just that
#    it's running a bit behind; this one needs immediate investigation)
# ALERT if max_dirty_ratio_across_partitions > 0.7 for more than 30 minutes
#   (the cleaner is technically working but losing ground against write volume)

# Alert 3 — a compacted topic significantly exceeding its size estimate
# baseline = distinct_key_count * avg_record_size * replication_factor
# ALERT if actual_topic_size > baseline * 2 for more than 2 hours
#   (either key cardinality grew far beyond plan, or the cleaner is behind —
#    either way, worth a human looking at it before it becomes a capacity issue)`}
        </CodeBox>
        <Callout title="Retention and compaction failures are quiet by design" color="#ef4444">
          Neither a stuck log cleaner nor a misconfigured retention setting causes an immediate, loud error —
          producers keep producing successfully, consumers keep consuming successfully, and everything looks
          fine on the metrics teams usually watch first. The failure mode is purely "disk keeps filling up,"
          which is exactly the kind of slow-burning problem that turns into a full cluster outage (a broker
          out of disk space stops accepting writes for every topic it hosts, not just the misbehaving one) if
          nobody is specifically watching for it.
        </Callout>
      </section>

      <Divider />

      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 14 — Testing retention and compaction locally" />
        <SectionTitle>Verifying Cleanup Behavior Before It's Load-Bearing in Production</SectionTitle>
        <Para>
          Both retention and compaction are the kind of behavior that's easy to configure wrong and not
          notice for a long time — segments only get deleted when they age out, and compaction only runs once
          the dirty ratio threshold is crossed, so a misconfigured topic can look completely fine for hours or
          days before the problem becomes visible. It's worth being able to verify the actual behavior
          directly, on a local or test cluster, rather than trusting a config file alone.
        </Para>
        <Para>
          For fast local testing, the trick is to configure very short, unrealistic settings — retention
          measured in seconds and a small segment size instead of days and a gigabyte — so the behavior you'd
          normally wait days to observe happens in minutes. This is purely a testing technique; production
          topics should never run with these aggressive settings.
        </Para>
        <CodeBox label="local testing setup — forcing fast retention and compaction cycles">
{`# Create a test topic with deliberately tiny segment size and short retention
# so deletion is observable in minutes rather than days
kafka-topics --create --topic test.delete-behavior \\
  --partitions 1 --replication-factor 1 \\
  --config retention.ms=60000 \\
  --config segment.ms=10000

# Produce some records, wait ~90 seconds, then check what's left:
kafka-console-producer --topic test.delete-behavior --bootstrap-server localhost:9092
# (type a few test messages, Ctrl+D to exit)

# After waiting: the earliest available offset should have moved forward,
# confirming segments aged out and were deleted as expected
kafka-run-class kafka.tools.GetOffsetShell \\
  --broker-list localhost:9092 --topic test.delete-behavior --time -2   # earliest

# --- compaction test ---
kafka-topics --create --topic test.compact-behavior \\
  --partitions 1 --replication-factor 1 \\
  --config cleanup.policy=compact \\
  --config segment.ms=5000 \\
  --config min.cleanable.dirty.ratio=0.01   # compact aggressively for the test

# Produce several updates for the SAME key, wait a bit for a compaction pass,
# then consume from the beginning — you should see only the LATEST value:
kafka-console-consumer --topic test.compact-behavior --bootstrap-server localhost:9092 \\
  --from-beginning --property print.key=true

# --- tombstone test ---
# Produce a null-value record for a key you already wrote above:
kafka-console-producer --topic test.compact-behavior --bootstrap-server localhost:9092 \\
  --property "parse.key=true" --property "key.separator=:"
# type: cust_1: <press Ctrl+D or send an explicit null depending on client>
# after another compaction pass + delete.retention.ms, that key should no
# longer appear when consuming from the beginning`}
        </CodeBox>
        <Table
          headers={['What to verify', 'How to observe it locally', 'What confirms it\'s working']}
          rows={[
            ['Time-based retention actually deletes old segments', 'Short retention.ms + short segment.ms, produce, wait, check earliest offset', 'Earliest available offset advances past records that should have expired'],
            ['Compaction keeps only the latest value per key', 'Low min.cleanable.dirty.ratio, produce multiple updates for one key, wait, consume from beginning', 'Only the most recent value for that key appears'],
            ['Tombstones actually remove a key', 'Produce a null-value record for an existing key, wait through delete.retention.ms, consume from beginning', 'The key no longer appears at all, not even as a null value'],
            ['cleanup.policy=compact,delete expires stale keys', 'Combine both configs with short windows, stop updating one key, wait past retention.ms', 'That key eventually disappears even without an explicit tombstone'],
          ]}
        />
        <Callout title="A local test proves the mechanism, not the production timeline" color="#f97316">
          These tests confirm that retention and compaction are configured and behaving correctly in
          principle — they don't tell you whether your chosen production values (7-day retention, a 0.5 dirty
          ratio threshold) are the right numbers for your actual throughput and disk budget. Use Part 09's
          sizing approach for that decision, and use tests like these to catch outright misconfiguration
          (wrong cleanup.policy, a typo in a duration) before it ships, not to validate the specific numbers.
        </Callout>
      </section>

      <Divider />

      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 15 — Broker-level vs topic-level configuration" />
        <SectionTitle>Defaults Live on the Broker, Overrides Live on the Topic</SectionTitle>
        <Para>
          One last practical detail worth being precise about: every setting covered in this module —
          <code>retention.ms</code>, <code>retention.bytes</code>, <code>cleanup.policy</code>,
          <code>delete.retention.ms</code>, <code>min.cleanable.dirty.ratio</code> — exists at two levels.
          The broker has a cluster-wide default (configured as <code>log.retention.ms</code>,
          <code>log.retention.bytes</code>, <code>log.cleanup.policy</code>, and so on, in the broker's own
          configuration), and any individual topic can override that default with its own
          per-topic configuration. A topic created without an explicit override simply inherits whatever the
          broker's cluster-wide default happens to be.
        </Para>
        <CodeBox label="broker defaults vs. explicit topic overrides">
{`# Broker-level defaults (server.properties) — apply to every topic
# that doesn't explicitly override them:
log.retention.hours=168          # 7 days — note: HOURS at the broker level
log.retention.bytes=-1
log.cleanup.policy=delete
log.segment.bytes=1073741824     # 1 GB

# A specific topic overriding just the setting it needs:
kafka-configs --alter --entity-type topics --entity-name freshcart.product-prices \\
  --add-config cleanup.policy=compact,delete.retention.ms=86400000

# freshcart.product-prices now uses cleanup.policy=compact and
# delete.retention.ms=86400000 explicitly, while still inheriting the
# broker's log.segment.bytes=1073741824 for its segment size, since that
# wasn't overridden at the topic level.

# Checking what's actually in effect for a topic (override + inherited defaults):
kafka-configs --describe --entity-type topics --entity-name freshcart.product-prices \\
  --bootstrap-server broker:9092`}
        </CodeBox>
        <Callout title="A common source of surprise: unit mismatches between levels" color="#f97316">
          Broker-level retention is commonly expressed in hours (<code>log.retention.hours</code>), while the
          topic-level override is expressed in milliseconds (<code>retention.ms</code>). It's easy to set a
          topic override intending 7 days and accidentally type a value that's actually 7 milliseconds, 7
          seconds, or 7 minutes — always double check the unit, and confirm the effective value with
          <code>kafka-configs --describe</code> rather than assuming the value you typed was interpreted the
          way you meant it.
        </Callout>
        <Para>
          The practical habit worth building: never assume a topic's effective retention or cleanup policy
          just because you remember what the cluster default is supposed to be. Topics accumulate overrides
          over their lifetime — a one-off change made during an incident two years ago, a setting copied from
          a template topic that no longer matches the current cluster defaults — and <code>kafka-configs
          --describe</code> is the only reliable source of truth for what a specific topic is actually doing
          right now, as opposed to what it was configured to do when it was created.
        </Para>
      </section>

      <Divider />

      <section style={{ marginBottom: 64 }} data-toc-kind="myth">
        <SectionTag text="// Misconceptions" />
        <SectionTitle>Five Misconceptions About Retention and Compaction</SectionTitle>
        {[
          {
            wrong: '"Kafka keeps everything forever unless you explicitly delete it, like a database"',
            right: 'Part 01 is explicit that the default cleanup.policy=delete with retention.ms=7 days means data is actively deleted on a schedule by default. Anything that must outlive that window needs deliberately extended retention or a copy in external storage.',
          },
          {
            wrong: '"Retention deletes individual expired records as soon as they hit the time limit"',
            right: 'Part 02 covers the real mechanism: deletion is segment-granular. An entire closed segment is deleted once its newest record ages past the retention window — a record can sit on disk somewhat past its "logical" expiry if it shares a segment with newer records.',
          },
          {
            wrong: '"Under normal retention, Kafka automatically keeps only the latest record per key"',
            right: 'Part 03 is direct about this: cleanup.policy=delete has no awareness of keys at all — it deletes purely by segment age or size. Deduplicating by key, keeping only the latest value, requires explicitly switching to cleanup.policy=compact, covered in Part 04.',
          },
          {
            wrong: '"Log compaction is just a cheaper, longer-retention version of normal deletion"',
            right: 'Part 07 states the limitation plainly: compaction discards the older values for a key entirely, so it cannot answer "what was this value at time T" once compaction has run. It is specifically for "what is the latest value now," not for cheaper long-term history — if you need history, delete policy with long retention (or an external store) is the right tool.',
          },
          {
            wrong: '"Deleting a key from a compacted topic just means you stop producing updates for it"',
            right: 'Part 05 explains that simply stopping updates leaves the last known value sitting there indefinitely, looking current. Actually removing a key requires producing an explicit tombstone — a record with that key and a null value — which compaction eventually clears after delete.retention.ms.',
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
        <SectionTag text="// Real-World Story" />
        <SectionTitle>What This Looks Like on Day One</SectionTitle>
        <HighlightBox>
          <Para>
            <strong>At Plaid:</strong> a compliance request comes in asking for every raw transaction-sync
            event from the last 90 days for a specific set of linked accounts, for an audit. The on-call
            engineer discovers the transactions topic has <code>retention.ms</code> set to the 7-day default —
            nobody had extended it because the topic's downstream consumer was assumed to be the only
            consumer that would ever need this data, and it processes events within minutes. The 90-day
            window is unrecoverable from Kafka; the only path forward is checking whether the data warehouse
            sink job (which runs separately) captured those events before they aged out. The team's follow-up
            is a topic-by-topic retention audit against actual compliance requirements, not developer
            convenience defaults.
          </Para>
        </HighlightBox>
        <HighlightBox>
          <Para>
            <strong>At Shopify:</strong> a new engineer is designing the topic backing a "current inventory
            count per SKU" service used by multiple storefront services. Their first instinct is a normal
            <code>delete</code>-policy topic with very long retention, reasoning that "long retention means
            the data won't disappear." A senior engineer points out this is the wrong tool: with plain
            deletion, a consumer rebuilding its cache from scratch would have to replay potentially millions
            of historical inventory-adjustment events just to compute the current count for each SKU, and the
            topic would grow without bound. Switching to <code>cleanup.policy=compact</code>, keyed by SKU,
            means a fresh consumer replays the topic and lands directly on current state — one record per
            SKU — with no unbounded growth and no need to replay history that nobody cares about anymore.
          </Para>
        </HighlightBox>
        <HighlightBox>
          <Para>
            <strong>In a system design interview:</strong> "How would you use Kafka to keep a downstream cache
            in sync with a Postgres table via CDC?" The strong answer describes a compacted topic keyed by the
            table's primary key, with each row change producing a new record whose value is the row's current
            state — so the topic naturally converges to one record per row, the latest state, regardless of
            how many times a row was updated. It explicitly covers what happens on row deletion (a tombstone,
            not just silence) and states plainly that this pattern would be wrong for something like an
            orders-placed event stream, where every event matters independently and nothing should be
            compacted away. Distinguishing those two cases is exactly the point of this module.
          </Para>
        </HighlightBox>
      </section>

      <Divider />

      <section style={{ marginBottom: 64 }} data-toc-kind="prep">
        <SectionTag text="// Interview Prep" />
        <SectionTitle>5 Interview Questions — With Complete Answers</SectionTitle>
        {[
          {
            q: 'Q1. What does retention.ms actually control, and what happens once it expires for a record?',
            a: `retention.ms is the maximum time a record is guaranteed to be kept in a topic before it becomes eligible for deletion, per Part 01. It's not a database-style forever-store — the default is 7 days, and unless a topic's retention is explicitly extended, data written today is deleted roughly a week later regardless of whether anything ever consumed it.

The important physical detail, from Part 02, is that deletion happens at the segment level, not per individual record. A partition's log is split into closed, immutable segment files, and a whole segment is deleted once its newest record's timestamp is older than the retention window. So a given record's actual removal time can lag slightly behind the exact configured millisecond window if it shares a segment with newer records — retention.ms is a close approximation enforced at segment granularity, not an exact per-record guarantee.

I'd also mention retention.bytes, which caps retention by size per partition instead of or alongside time — whichever limit is hit first triggers deletion, which matters a lot if both are configured and a burst of volume causes the size cap to bind before the time window would have.`,
          },
          {
            q: 'Q2. Explain the difference between cleanup.policy=delete and cleanup.policy=compact, and when you\'d use each.',
            a: `delete removes data purely based on time or size — cleanup.policy=delete has no concept of keys at all when deciding what to remove, per Part 03. It's the right choice for event streams: page views, clicks, order-placed events, sensor readings — data where each record is an independently meaningful fact and nothing "supersedes" an earlier record.

compact instead keeps only the latest record per key, forever, regardless of age, per Part 04. The log cleaner scans older segments and removes any record whose key has a newer record later in the log. This is the right choice for entity state — current price, current address, current account status — anything where what you actually care about is "what's the value right now," not the full history of how it got there.

The two aren't mutually exclusive — cleanup.policy=compact,delete, from Part 06, applies both: keep the latest value per key, but also expire even that latest value if it's old enough with no refresh, useful for something like session state where stale, unrefreshed entities should eventually disappear entirely.`,
          },
          {
            q: 'Q3. How do you actually remove a key from a compacted topic, and why can\'t you just stop producing updates for it?',
            a: `You produce a tombstone — a record with the target key and a null value, per Part 05. Compaction treats a null value specially: during compaction it acts as the latest value for that key, so any earlier real values are cleaned up as usual, and then after a further delete.retention.ms delay, the tombstone record itself is also removed, at which point the key is entirely gone from the topic.

Simply not producing further updates for a key doesn't remove it — the last real value stays in the compacted log indefinitely, since compaction only ever keeps "the latest value per key," and with no tombstone, that last real value remains the latest value forever, looking current even though the entity should have been considered gone.

The delay before the tombstone itself is removed exists so that any reasonably current consumer gets a real chance to see the null value and react to it — for example, evicting the key from its own downstream cache. If the tombstone disappeared immediately, a slightly-behind consumer could miss the deletion signal entirely and never know to remove that key from its own state.`,
          },
          {
            q: 'Q4. A colleague proposes using a compacted topic to store a full audit history of every price change for every product, with timestamps. What\'s wrong with that plan?',
            a: `Compaction is fundamentally incompatible with that goal. By design, cleanup.policy=compact removes every older value for a key once a newer one exists, keeping only the single latest record per key, per Part 04 and Part 07. An audit trail needs the opposite — every historical value preserved, not just the current one.

If they used compaction for this, the moment a product's price changed a second time, the first price change would be silently removed from the log. There would be no way to answer "what was this product's price on a given date" after compaction runs, because that record no longer physically exists.

The right tool for a full audit trail is a plain cleanup.policy=delete topic with a long enough retention.ms to cover the required audit window (or, more robustly, exporting every change event to a data warehouse or object store with unbounded retention) — something that keeps every individual event rather than collapsing history down to the latest value per key.`,
          },
          {
            q: 'Q5. Walk through how you\'d decide cleanup.policy for a brand-new topic you\'re designing.',
            a: `The deciding question, from Part 08, is whether a new record for a given key represents a new, independently meaningful fact, or an update that supersedes the previous value for that key. If it's a new fact — an order placed, a click, a sensor reading — I'd use cleanup.policy=delete, with retention.ms and/or retention.bytes sized to the actual downstream needs (how long consumers need to be able to replay or catch up, and any compliance requirements around minimum retention).

If it's a value that gets superseded — current price, current status, current address, or a Kafka Streams state store changelog — I'd use cleanup.policy=compact, keyed by the entity's natural identifier (product_id, customer_id, whatever the primary key of that entity is), so the topic naturally converges to one current record per entity regardless of how many times it's updated.

If there's also a need for stale, no-longer-updated keys to eventually disappear entirely — a session or presence topic, for instance — I'd combine both with cleanup.policy=compact,delete, so keys that are still being actively updated keep their latest value indefinitely via compaction, while keys that go quiet for longer than the retention window get cleaned up automatically rather than accumulating forever.`,
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
        <SectionTitle>Mistakes Beginners Make Constantly</SectionTitle>
        {[
          {
            q: 'Assuming a Kafka topic keeps data forever unless told otherwise',
            a: 'Part 01 covers the default directly — cleanup.policy=delete with retention.ms=7 days deletes data on a schedule out of the box. Any downstream requirement that data survive longer needs deliberate retention configuration or an export to durable storage, decided up front, not discovered during an incident.',
          },
          {
            q: 'Expecting normal retention to automatically deduplicate by key and keep only the latest value',
            a: 'Part 03 is explicit: cleanup.policy=delete has no key awareness at all — it deletes by age or size only. "Latest value per key" requires explicitly switching to cleanup.policy=compact, covered in Part 04; the two behaviors are not the same thing and one does not imply the other.',
          },
          {
            q: 'Using log compaction to try to preserve full change history cheaply',
            a: 'Part 07 states plainly that compaction throws away older values for a key on purpose — it keeps exactly the latest value, nothing more. A requirement for full history, an audit trail, or point-in-time reconstruction needs a delete-policy topic with adequate retention (or an external store), not compaction.',
          },
          {
            q: 'Believing that no longer producing updates for a key removes it from a compacted topic',
            a: 'Part 05 corrects this directly: the last real value for a key stays in a compacted topic indefinitely unless an explicit tombstone (a null-value record for that key) is produced. Silence does not equal deletion under compaction.',
          },
          {
            q: 'Setting both retention.ms and retention.bytes without checking which one actually binds under real production volume',
            a: 'Part 01 flags this — whichever limit is hit first triggers deletion. A size cap configured without checking real throughput can silently delete data much sooner than the intended time-based window, especially during a traffic burst.',
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
        <SectionTitle>Errors and Symptoms You Will Hit — And Exactly Why</SectionTitle>
        {[
          {
            error: `A consumer group that was offline for an extended period tries to resume from its last committed offset and gets an OffsetOutOfRangeException`,
            cause: 'The consumer\'s last committed offset points into a segment that has already been deleted by retention, per Parts 01 and 02 — the consumer was offline longer than the topic\'s retention.ms (or the topic exceeded retention.bytes in that time), so the data at that offset physically no longer exists on any broker.',
            fix: 'Decide explicitly how the consumer should behave when this happens — reset to the earliest available offset (accepting some data loss for the gap) or to the latest offset (skipping the entire backlog) via auto.offset.reset, and treat a consumer being down longer than retention as an operational alert, not a silent recovery. If this keeps happening, the topic\'s retention may be too short for realistic consumer downtime.',
          },
          {
            error: `A "current inventory count" service rebuilds its in-memory cache on startup and the numbers come back wrong or wildly inflated`,
            cause: 'The topic backing this cache is using cleanup.policy=delete instead of compact, so it retains the full history of every inventory adjustment event rather than converging to one current-count record per SKU, per Part 04 and Part 08. The rebuild logic that assumes "the last record per key is the current state" breaks if the topic was never actually compacted down to that shape, or if it was recently switched to compact but hasn\'t finished a compaction pass yet.',
            fix: 'Confirm cleanup.policy is actually set to compact on the topic (it must be set before or shortly after topic creation — switching an existing large delete-policy topic to compact does not retroactively clean up old data instantly, compaction runs on its own schedule) and verify the producer is writing full current-state snapshots per SKU as the value, not incremental deltas that require summing history to get a correct count.',
          },
          {
            error: `A downstream cache never removes an entity that was deleted upstream — it keeps serving stale data for a customer or product that no longer exists`,
            cause: 'The upstream producer stopped writing updates for that key when the entity was deleted, but never produced an explicit tombstone, per Part 05. Under compaction, the last real value for that key is treated as still current indefinitely — silence is not a deletion signal.',
            fix: 'Change the deletion code path to explicitly produce a tombstone (a record with that key and a null value) whenever an entity is deleted, not just stop writing to that key. Verify delete.retention.ms is set to a window that gives downstream consumers a real chance to observe the tombstone before it is itself cleaned up.',
          },
          {
            error: `Disk usage on brokers doesn\'t drop noticeably right after lowering a topic\'s retention.ms, even though the change was applied hours ago`,
            cause: 'Retention enforcement is segment-granular, per Part 02 — a segment is only deleted once its newest record ages past the (now-shorter) retention boundary. If the active segment, or a recently-closed one, still has records within the new window, none of that segment\'s disk space is freed yet, even though some records inside it are individually past the new limit.',
            fix: 'This is expected behavior, not a bug — space is freed in segment-sized chunks as whole segments age out, not continuously per record. If immediate space recovery is required, reducing the segment size setting (so segments close and become eligible for deletion sooner) is the lever to pull, alongside the retention change, rather than expecting an instant drop from the retention change alone.',
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
          'Kafka is not forever-storage by default. cleanup.policy=delete with retention.ms=7 days (or retention.bytes) deletes old data on a schedule; anything that needs to survive longer must be explicitly configured or exported elsewhere.',
          'Deletion under the delete policy happens at segment granularity, not per record — a whole closed segment is removed once its newest record ages past the retention window, which is an approximation of the exact configured time, not an exact guarantee.',
          'cleanup.policy=compact keeps only the latest record per key, forever, regardless of age — the right tool for current-state data like prices, addresses, account status, or Kafka Streams state stores, not for event streams.',
          'Removing a key from a compacted topic requires an explicit tombstone (a null-value record for that key), not just silence — the tombstone itself is later cleaned up after delete.retention.ms, giving consumers time to observe the deletion.',
          'Compaction is not a cheaper way to keep full history — it specifically discards older values per key, so it cannot answer "what was this value at time T." Full history needs a delete-policy topic with adequate retention or an external store.',
          'cleanup.policy=compact,delete combines both: latest value per key is kept, but even that value expires if the key stops being updated for long enough — useful for entities like session state that should eventually disappear when abandoned.',
        ]}
      />
    </LearnLayout>
  )
}
