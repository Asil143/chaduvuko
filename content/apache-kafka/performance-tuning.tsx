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

export default function PerformanceTuning() {
  return (
    <LearnLayout
      title="Performance Tuning"
      description="Tuning Kafka for real throughput and latency targets: producer batching and compression trade-offs, broker page-cache and thread sizing, consumer fetch tuning, disk and filesystem choices, network settings, JVM heap sizing, and a real benchmarking methodology."
      section="Apache Kafka — Module 17"
      readTime="60 min"
      updatedAt="September 2026"
      breadcrumbs={[
        { label: 'Learn', href: '/learn' },
        { label: 'Apache Kafka', href: '/learn/apache-kafka' },
        { label: 'Performance Tuning', href: '/learn/apache-kafka/performance-tuning' },
      ]}
      prev={{ title: 'Monitoring and Observability', href: '/learn/apache-kafka/monitoring-observability' }}
      next={{ title: 'Scaling and Capacity Planning', href: '/learn/apache-kafka/scaling-capacity-planning' }}
    >
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 01 — The Fundamental Trade-off" />
        <SectionTitle>Every Kafka Tuning Knob Is Trading Latency for Throughput, or the Reverse</SectionTitle>
        <Para>
          The monitoring module taught you how to see when something is wrong — under-replicated partitions,
          rising retry rate, growing consumer lag. This module is about what to actually change once you know
          a system is underperforming, and just as importantly, what target you are tuning toward in the first
          place. Almost every setting covered here sits on one axis: latency versus throughput. Nothing is free.
          A change that makes the system faster in aggregate almost always makes some individual record slower,
          and a change that makes an individual record faster almost always costs you aggregate throughput.
        </Para>
        <Para>
          This is why performance tuning without a stated target is not really tuning — it is guessing. Before
          touching a single config, you need to answer: what does this pipeline actually need? A payment
          confirmation path that a user is waiting on cares about the 99th-percentile latency of a single
          record far more than it cares about aggregate megabytes per second. A batch ingestion pipeline
          loading a data warehouse overnight cares about aggregate throughput and essentially nothing about
          the latency of any individual record. These two workloads should not share the same producer
          configuration, the same consumer configuration, or the same mental model of "fast."
        </Para>
        <HighlightBox>
          <Para>
            <strong>Latency-sensitive workload —</strong> an API request that blocks on a Kafka write before
            responding to a user, a fraud-check pipeline that must score a transaction within milliseconds.
            Tune for small batches, low <code>linger.ms</code>, cheap compression codecs, fast <code>acks</code>.
          </Para>
          <Para>
            <strong>Throughput-sensitive workload —</strong> log aggregation, clickstream ingestion, bulk
            change-data-capture replication, nightly warehouse loads. Tune for large batches, higher
            <code>linger.ms</code>, strong compression, larger fetch sizes — accepting more per-record delay
            in exchange for dramatically fewer requests and less CPU/network overhead per byte moved.
          </Para>
        </HighlightBox>
        <Para>
          Every section below names which side of this trade-off a setting pushes you toward. Keep that frame
          in mind — the goal of this module is not to memorize "good" values, because there are no universally
          good values. The goal is to understand which lever moves which needle, so you can pick values that
          match your actual workload.
        </Para>
        <Para>
          It is worth naming the cost of tuning carelessly up front, because it motivates the discipline the
          rest of this module asks for. A change to <code>linger.ms</code> or <code>compression.type</code>
          applied to the wrong producer can silently regress user-facing latency for weeks before anyone
          notices, because the symptom shows up in an unrelated API's own latency dashboard, not in any
          Kafka-specific metric. A JVM heap increased "to be safe" can quietly degrade an entire cluster's read
          performance and occasionally spike replication lag, without a single broker log line announcing the
          cause. Every recommendation in this module comes with a specific reason attached — read the reasoning,
          not just the recommended value, before applying it to a system you are responsible for.
        </Para>
        <Callout title="Tune the bottleneck, not the first knob you find" color={K}>
          Before changing any setting in this module, confirm — using the metrics from the monitoring module —
          which part of the pipeline is actually the bottleneck. Doubling <code>batch.size</code> does nothing
          if your producer is CPU-bound on compression. Raising <code>fetch.min.bytes</code> does nothing if
          your consumer's processing logic, not the fetch itself, is the slow part. Measure first, per Part 09.
        </Callout>
        <SubTitle>A quick map from symptom to likely cause</SubTitle>
        <Para>
          Before diving into the individual settings, it helps to have a rough map from an observed symptom to
          which part of this module is likely to contain the fix — this is not a substitute for the monitoring
          module's diagnostic process, but a starting point for where to look first.
        </Para>
        <Table
          headers={['Observed symptom', 'Likely area to investigate', 'Covered in']}
          rows={[
            ['High per-record producer latency, throughput is fine', 'linger.ms too high for this workload, or acks/compression choice adding avoidable delay', 'Part 02'],
            ['Producer CPU maxed out, throughput plateaued below expected', 'Compression codec choice, or batches too small to amortize per-batch compression overhead', 'Part 02, Part 09'],
            ['Broker request latency high, disk/CPU look idle', 'num.network.threads undersized for connection/request volume', 'Part 03'],
            ['Broker request latency high, disk/CPU genuinely busy', 'num.io.threads undersized, or a genuinely disk-bound broker needing more/faster disks', 'Part 03, Part 05'],
            ['Broker replication lag or GC-correlated slowdowns', 'JVM heap oversized, starving the OS page cache and lengthening GC pauses', 'Part 03, Part 07'],
            ['Consumer throughput plateaus with broker headroom to spare', 'fetch.min.bytes too low for the workload, generating excess small fetch requests', 'Part 04'],
            ['Cross-region link underperforming its advertised bandwidth', 'Socket buffer sizes smaller than the link\'s bandwidth-delay product', 'Part 06'],
          ]}
        />
      </section>

      <Divider />

      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 02 — Producer Throughput Tuning" />
        <SectionTitle>batch.size, linger.ms, buffer.memory, and compression.type</SectionTitle>
        <Para>
          The producer's batching mechanics were introduced in Module 03: records accumulate into a batch per
          partition, and the batch is sent when it hits <code>batch.size</code> bytes or <code>linger.ms</code>
          milliseconds elapse, whichever comes first. Tuning throughput on the producer side is mostly about
          deliberately widening that batch rather than accepting whatever falls out of default settings.
        </Para>
        <SubTitle>batch.size — the ceiling on how big one batch can get</SubTitle>
        <Para>
          <code>batch.size</code> (default 16 KB) is a per-partition limit, not a global one — a producer
          writing to 20 partitions can have 20 batches accumulating simultaneously, each up to this size. Raising
          it does not force bigger batches on its own; it only raises the ceiling. Under light load, batches
          rarely fill regardless of the ceiling because <code>linger.ms</code> or an idle network round trip
          flushes them first. Raising <code>batch.size</code> pays off specifically under sustained high load,
          where records are arriving fast enough that the ceiling, not the timer, becomes the limiting factor.
        </Para>
        <SubTitle>linger.ms — deliberately delaying a send to let a batch fill</SubTitle>
        <Para>
          Module 03 covered <code>linger.ms</code> as the throughput knob it is: a value of 0 sends immediately
          whenever the network is free, and a value of 10-50ms lets more records accumulate first. For this
          module's purposes, the operational guidance is to set <code>linger.ms</code> based on the workload
          classification from Part 01 — near 0 for latency-sensitive paths, 10-100ms for throughput-oriented
          bulk producers, and to always change it together with <code>batch.size</code>, since a higher
          <code>linger.ms</code> with a small <code>batch.size</code> ceiling gains you very little — the
          batch fills and flushes before the linger timer would have mattered anyway.
        </Para>
        <SubTitle>buffer.memory — the pool all unsent batches draw from</SubTitle>
        <Para>
          <code>buffer.memory</code> (default 32 MB) is the total amount of memory the producer can use across
          all its in-flight, unsent batches for every partition combined. If your producer writes to many
          partitions with a large <code>batch.size</code> and a generous <code>linger.ms</code>, you can
          accumulate many partially-filled batches simultaneously, and this pool can run out before any
          individual batch's own limits are hit. When it does, <code>send()</code> blocks for up to
          <code>max.block.ms</code> waiting for space to free up — a real, measurable latency spike that shows
          up as producer-side stalls with no broker-side symptom at all, which makes it easy to misdiagnose as
          a broker problem when the actual constraint is producer memory.
        </Para>
        <CodeBox label="sizing buffer.memory for a high-partition-count producer">
{`# A producer writing to a topic with 200 partitions
# batch.size = 32KB, linger.ms = 20 (throughput-tuned)

# Worst case: every partition has a nearly-full batch outstanding at once
worst_case_memory = 200 partitions * 32 KB = 6.4 MB

# Default buffer.memory (32 MB) comfortably covers this with headroom
# for retries and compression overhead. But if partition count grows
# to 2,000 (a 10x fan-out across more topics), the same math:
worst_case_memory = 2,000 * 32 KB = 64 MB

# Now buffer.memory=32MB (the default) is UNDERSIZED for the worst case
# -> send() calls start blocking under sustained peak load
# -> fix: raise buffer.memory, or reduce batch.size, or reduce partition fan-out per producer`}
        </CodeBox>
        <SubTitle>compression.type — trading CPU for network and disk</SubTitle>
        <Para>
          Module 03 introduced the four common codecs at a glance. Here is the trade-off in more operational
          depth, because compression is one of the highest-leverage settings for throughput-bound pipelines
          and one of the easiest to get wrong for latency-bound ones.
        </Para>
        <Table
          headers={['Codec', 'CPU cost to compress', 'Typical ratio', 'Latency impact', 'Best fit']}
          rows={[
            ['none', 'None', '1:1', 'None', 'Payloads already compressed, or extremely low-volume topics where compression overhead is not worth it.'],
            ['snappy', 'Low', 'Moderate', 'Negligible', 'Older default; still fine for high-throughput pipelines that need low CPU cost per byte.'],
            ['lz4', 'Low, fastest of the four', 'Moderate', 'Negligible', 'The common modern default — near-snappy CPU cost with slightly better ratio and faster decompression on the consumer side.'],
            ['zstd', 'Moderate', 'High', 'Small, usually acceptable', 'Best ratio-per-CPU-cycle in most published benchmarks; a strong default when brokers have CPU headroom and network/disk cost matters.'],
            ['gzip', 'High', 'Highest', 'Noticeable under sustained high volume', 'Only when network or storage cost dominates and CPU is genuinely cheap relative to bandwidth — rare as a first choice in 2026.'],
          ]}
        />
        <Para>
          The CPU cost is paid once, by the producer, when the batch is built — not by the broker, and not
          repeatedly. This is why compressing at the batch level (after records accumulate) rather than the
          record level matters so much: a bigger batch, built by a higher <code>linger.ms</code>/<code>batch.size</code>,
          compresses to a meaningfully better ratio than the same records compressed individually, because
          repeated JSON keys and similar field values across many records in one batch compress well together.
          This is the concrete mechanism behind the guidance from Module 03 that batching and compression
          settings reinforce each other and should be tuned together, not independently.
        </Para>
        <Callout title="zstd is usually the right default in 2026" color="#22c55e">
          Unless you have measured that CPU is the actual constraint on your producers, <code>zstd</code> is a
          reasonable default choice for most throughput-oriented pipelines — it typically beats
          <code>lz4</code>/<code>snappy</code> on compression ratio for only a modest additional CPU cost, which
          translates directly into less network traffic and less broker disk consumed for the same retention
          window (see Part 02 of the scaling module for the disk math this feeds into).
        </Callout>
        <SubTitle>When aggressive batching actively hurts a pipeline</SubTitle>
        <Para>
          It is worth being explicit about the failure mode of over-applying this section's advice. A team that
          reads "bigger batches are more efficient" and raises <code>linger.ms</code> and <code>batch.size</code>
          uniformly across every producer in their organization, including ones serving latency-sensitive request
          paths, trades away real, user-visible responsiveness for a throughput gain nobody asked for on that
          specific path. The added delay is not hidden — it shows up directly as slower API responses, because
          the producer's <code>send()</code> call is often sitting inside the critical path of a synchronous
          request handler waiting on a delivery confirmation.
        </Para>
        <CodeBox label="the cost of applying throughput settings to a latency-sensitive path by mistake">
{`# A checkout service producer writes a "payment authorized" event
# and the API handler waits for the delivery result before
# responding to the user (a common, reasonable pattern for an
# event that must be durably recorded before confirming success)

# Throughput-tuned settings applied here by mistake:
linger.ms = 30
batch.size = 131072

# Every checkout request now waits AT LEAST up to 30ms longer than
# necessary for its own event to even be sent, on top of normal
# network and broker processing time -- multiplied across every
# single checkout, this is a real, measurable latency regression
# that shows up in the API's own p50/p99 dashboards, not Kafka's

# Correct: this producer should use Profile A from Part 09,
# not Profile B, regardless of what a separate analytics producer
# writing to a different topic on the same cluster is doing`}
        </CodeBox>
      </section>

      <Divider />

      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 03 — Broker-Side Tuning" />
        <SectionTitle>Thread Pools, the Page Cache, and Why a Huge JVM Heap Can Hurt</SectionTitle>
        <SubTitle>num.network.threads and num.io.threads</SubTitle>
        <Para>
          A broker splits its work into two thread pools. Network threads (<code>num.network.threads</code>,
          default 3) read requests off the wire, do minimal parsing, and hand them to a request queue —
          they do not touch disk. I/O threads (<code>num.io.threads</code>, default 8) pull requests off that
          queue and do the actual work: appending to the log, reading from disk, replicating to followers. If
          network threads are too few for the connection count and request rate a broker handles, requests
          queue up waiting just to be received, which shows up as elevated request latency with the disk itself
          barely busy. If I/O threads are too few, requests pile up waiting for actual log work, which shows up
          alongside real disk and CPU utilization.
        </Para>
        <Table
          headers={['Symptom', 'Likely thread pool to increase', 'How to confirm before changing anything']}
          rows={[
            ['High request latency, low disk/CPU utilization, many connections', 'num.network.threads', 'Check the network processor idle ratio metric from the monitoring module — a low idle ratio here with disk/CPU otherwise quiet points at the network pool being the bottleneck.'],
            ['High request latency, high disk I/O or CPU utilization', 'num.io.threads', 'Check the request handler idle ratio — a low idle ratio alongside real disk activity points at the I/O pool, not the network pool.'],
          ]}
        />
        <Para>
          A common rough starting point is to size <code>num.io.threads</code> to roughly the number of disks
          (or, on SSD/NVMe hosts with fewer physical spindle constraints, a multiple of CPU core count) attached
          to the broker for log storage, since I/O threads are what actually perform the disk reads and writes.
          <code>num.network.threads</code> is usually left closer to its default unless a broker serves an
          unusually large number of concurrent client connections.
        </Para>
        <CodeBox label="a worked thread-pool sizing example">
{`# Broker host: 4 dedicated NVMe disks for log.dirs, 16 CPU cores,
# serving roughly 3,000 concurrent producer/consumer connections

# num.io.threads starting point:
#   rule of thumb -- roughly 1x to 2x the number of log disks,
#   adjusted upward if the broker also does meaningful CPU work
#   per request (e.g. SSL termination)
num.io.threads = 8   # 2x the 4 disks, room for concurrent disk ops

# num.network.threads starting point:
#   default (3) is often fine up to a few hundred connections;
#   a broker fielding thousands of connections benefits from more
num.network.threads = 6   # doubled from default given connection count

# Confirm the choice with the monitoring module's idle-ratio
# metrics after deploying -- request handler idle ratio and
# network processor idle ratio should both stay comfortably above
# zero under normal peak load; a ratio consistently near zero on
# either pool means that specific pool needs more threads`}
        </CodeBox>
        <SubTitle>Kafka relies on the OS page cache, not the JVM heap, for read performance</SubTitle>
        <Para>
          This is the single most counter-intuitive and most consequential broker-tuning fact, and it is the
          reason a naive instinct — "give the JVM a bigger heap, more memory should mean faster" — is often
          exactly backwards for Kafka. Kafka's storage engine writes to the filesystem directly (as covered in
          the retention and compaction module) and relies on the operating system's page cache, not JVM-managed
          memory, to serve reads efficiently. When a consumer near the head of the log reads recent data, that
          data is almost always still sitting in the OS page cache in RAM, so the broker serves it without
          touching physical disk at all — this is part of why Kafka can serve many consumers reading the same
          recent data with very little disk I/O.
        </Para>
        <CodeBox label="why an oversized JVM heap actively hurts broker performance">
{`# A broker machine with 64 GB of RAM

# BAD: JVM heap set to 32 GB ("give Kafka more memory")
#   -> only 32 GB left for the OS page cache
#   -> less recent log data stays cached in RAM
#   -> more reads fall through to physical disk
#   -> a 32 GB heap also means longer, more disruptive GC pauses
#      (see the consumer session-timeout GC discussion in Module 03)
#      GC pauses on a broker can delay replication and request handling

# GOOD: JVM heap set to 6 GB, the rest left to the OS
#   -> ~58 GB available for the page cache
#   -> most reads for recently-produced data are served from RAM
#   -> shorter, less disruptive GC pauses on a small heap
#   -> Kafka's own object footprint (mostly metadata, not message
#      payloads -- payloads are handled via zero-copy sendfile,
#      bypassing the JVM heap almost entirely for the read path)
#      comfortably fits in a heap far smaller than the machine's total RAM`}
        </CodeBox>
        <Callout title="Broker heap sizing rule of thumb" color={K}>
          A broker JVM heap of roughly 6 GB is a common, well-tested starting point regardless of whether the
          machine has 32 GB or 256 GB of RAM — the extra RAM belongs to the OS page cache, not the heap. This is
          a genuinely different rule than most JVM applications, where more heap is usually assumed to be better;
          size the Kafka broker heap for its own bookkeeping, not for the volume of data flowing through it.
        </Callout>
        <SubTitle>Checking page cache effectiveness in practice</SubTitle>
        <Para>
          The claim that Kafka relies on the page cache is easy to state and easy to verify operationally. On a
          Linux broker host, standard OS tooling (<code>free -h</code>, or the <code>cached</code>/<code>buff</code>
          figures it reports) shows how much RAM the kernel is currently using for the page cache versus how
          much is genuinely free or held by processes — on a well-tuned Kafka broker with a modest JVM heap,
          this figure should represent the large majority of the machine's RAM, growing to fill whatever is not
          claimed by the heap and other processes. A broker where the page cache figure looks unexpectedly small
          relative to total RAM is a strong signal that something — an oversized heap, another memory-hungry
          process sharing the host — is starving the cache the read path depends on.
        </Para>
        <CodeBox label="a rough operational check">
{`free -h
#               total        used        free      shared  buff/cache
# Mem:           64Gi        7.2Gi       1.1Gi       0.1Gi       56Gi

# ~56 GB of the 64 GB total is buff/cache -- the OS page cache and
# related buffers. Roughly what you'd expect from a broker running
# a ~6GB JVM heap on a 64GB host, with the remainder available to
# the page cache. This is a healthy-looking distribution.

# Compare against a broker running a 32GB heap on the same 64GB host:
# Mem:           64Gi       34.5Gi       1.8Gi       0.1Gi       27Gi
# Only ~27 GB left for buff/cache -- roughly half of what the
# well-tuned broker above has available for the same total RAM,
# directly illustrating Part 03's core finding in a single command`}
        </CodeBox>
        <SubTitle>log.segment.bytes — segment size trade-offs</SubTitle>
        <Para>
          <code>log.segment.bytes</code> (default 1 GB, from the retention and compaction module's storage
          model) controls how large each segment file grows before a new one is rolled. Smaller segments roll
          more often, which means more, smaller files to manage, more frequent index-file creation overhead, and
          — for compacted topics — compaction can act sooner on a recently-closed segment, reclaiming space from
          duplicate keys faster. Larger segments mean fewer files and less rolling overhead, but retention
          deletion (which operates at the segment level, per the retention module) becomes coarser-grained —
          an entire 1 GB+ segment must age out before any of its data is reclaimed, even if only its oldest
          message crossed the retention boundary.
        </Para>
        <Table
          headers={['Segment size', 'Effect on compaction', 'Effect on retention granularity', 'Effect on file-handle overhead']}
          rows={[
            ['Smaller (e.g. 256 MB)', 'Segments close and become compactable sooner — faster reclaim of space on high-churn compacted topics', 'Finer-grained deletion — less "wasted" retained data past the boundary', 'More open file handles and index files per partition'],
            ['Larger (e.g. 2 GB+)', 'Segments stay open longer before compaction can act on them', 'Coarser deletion — a whole segment must fully age out', 'Fewer file handles, less filesystem metadata overhead'],
          ]}
        />
      </section>

      <Divider />

      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 04 — Consumer Throughput Tuning" />
        <SectionTitle>fetch.min.bytes, fetch.max.wait.ms, and max.partition.fetch.bytes</SectionTitle>
        <Para>
          Module 03 covered the poll loop's timing settings — <code>max.poll.records</code>,
          <code>max.poll.interval.ms</code> — which govern how much work one call to <code>poll()</code> hands
          your application and how long you have to process it. The settings in this section govern something
          earlier in the pipeline: how the consumer's underlying fetch requests to the broker are shaped, which
          is a separate lever from how the returned records are batched for your application code.
        </Para>
        <SubTitle>fetch.min.bytes and fetch.max.wait.ms — the same trade-off as linger.ms, mirrored on the read side</SubTitle>
        <Para>
          By default, a consumer's fetch request returns as soon as any data is available, even a single small
          record — this minimizes latency but means the broker handles many small fetch requests under light,
          steady load. <code>fetch.min.bytes</code> (default 1 byte, effectively "return immediately") tells the
          broker to hold the fetch request open until at least this many bytes are available to return, batching
          more data into each response. <code>fetch.max.wait.ms</code> (default 500ms) caps how long the broker
          will wait for that minimum before returning whatever it has anyway, so a genuinely idle topic does not
          leave the consumer waiting indefinitely.
        </Para>
        <CodeBox label="fetch.min.bytes and fetch.max.wait.ms working together">
{`fetch.min.bytes = 1 (default)
-> broker returns data the instant any is available
-> lowest possible per-record latency
-> many small fetch requests under light, steady load

fetch.min.bytes = 100000 (100 KB)
fetch.max.wait.ms = 500
-> broker waits until either 100KB has accumulated OR 500ms has
   passed, whichever comes first, before responding
-> under high volume: fewer, larger fetch responses, much better
   throughput per request
-> under low volume: consumer waits up to 500ms for data that
   never reaches 100KB, adding up to 500ms of latency
-> this is functionally the read-side mirror of the producer's
   batch.size / linger.ms trade-off from Part 02`}
        </CodeBox>
        <SubTitle>max.partition.fetch.bytes — the ceiling per partition, per fetch</SubTitle>
        <Para>
          <code>max.partition.fetch.bytes</code> (default 1 MB) caps how much data one fetch request can return
          from a single partition. This interacts with how many partitions one consumer is assigned: a consumer
          owning many partitions with this set high can receive a very large total response in one fetch,
          increasing both consumer-side memory pressure and the time spent deserializing before the next
          <code>poll()</code> — which, per Module 03's rebalancing discussion, risks tripping
          <code>max.poll.interval.ms</code> if processing that large a batch takes too long. Raising this value
          trades higher per-fetch throughput for a larger memory footprint and a longer window between polls.
        </Para>
        <Table
          headers={['Setting', 'Low value effect', 'High value effect']}
          rows={[
            ['fetch.min.bytes', 'Lower latency, more frequent small fetch requests, more broker request overhead under load', 'Fewer, larger fetch responses; higher throughput per request; more latency on genuinely low-volume topics'],
            ['fetch.max.wait.ms', 'Caps latency tightly even if fetch.min.bytes is high — data returns sooner on a quiet topic', 'Allows fetch.min.bytes more time to be satisfied, at the cost of higher worst-case latency on quiet topics'],
            ['max.partition.fetch.bytes', 'Smaller responses, less consumer memory pressure, more fetch round trips for a high-volume partition', 'Larger single-fetch throughput per partition, more consumer memory used, longer per-poll processing time'],
          ]}
        />
        <Callout title="Consumer fetch tuning and producer batching should be reasoned about together" color="#38bdf8">
          A throughput-tuned producer sending large, compressed batches and a consumer left at
          <code>fetch.min.bytes=1</code> will still fetch efficiently, since the broker returns whatever is
          available (potentially a full large batch) immediately once available — but a latency-tuned producer
          sending small, frequent, uncompressed records into a consumer tuned with a high
          <code>fetch.min.bytes</code> will add real, avoidable latency, since the consumer now waits for volume
          that a latency-oriented producer was never going to generate quickly. Match both sides of the pipeline
          to the same workload classification from Part 01.
        </Callout>
        <SubTitle>A worked example: request-count reduction on the consumer side</SubTitle>
        <Para>
          The same request-count math Module 03 walked through for producer batching applies symmetrically on
          the fetch side, and concrete numbers again make the trade-off easier to evaluate than the settings
          alone.
        </Para>
        <CodeBox label="fetch requests per second at different fetch.min.bytes values">
{`Topic throughput: 40 MB/sec sustained, average record size 400 bytes
Consumer group: 10 consumers, each responsible for roughly 4 MB/sec

fetch.min.bytes = 1 (effectively immediate return):
  each fetch returns whatever small amount has accumulated since
  the last request -- under sustained load, this still batches
  somewhat due to network round-trip time, but nowhere near the
  broker's serving capacity per request
  approx. 800 fetch requests/sec per consumer at this volume

fetch.min.bytes = 65536 (64 KB), fetch.max.wait.ms = 200:
  each fetch waits for either 64KB to accumulate or 200ms to pass
  approx. 65 fetch requests/sec per consumer at the same volume

Same data volume consumed. ~12x fewer fetch requests per consumer.
Broker-side request-handling overhead per byte moved drops
correspondingly -- meaningful at 10 consumers, more meaningful
still at 100.`}
        </CodeBox>
        <Para>
          As with the producer-side version of this calculation, the added latency is bounded and predictable —
          at most <code>fetch.max.wait.ms</code> of extra wait on a quiet moment for the topic — while the
          reduction in request overhead compounds across every consumer in the group. This is why raising
          <code>fetch.min.bytes</code> from its near-zero default is one of the higher-leverage, lower-risk
          consumer-side tuning changes for a throughput-oriented pipeline, mirroring Part 02's guidance about
          <code>linger.ms</code> on the producer side.
        </Para>
      </section>

      <Divider />

      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 05 — Disk and Filesystem" />
        <SectionTitle>Sequential I/O, XFS vs ext4, and Separating Logs From the OS Disk</SectionTitle>
        <SubTitle>Sequential I/O is the reason Kafka is fast at all</SubTitle>
        <Para>
          The retention and compaction module covered the commit log as an append-only structure. The
          performance implication is worth making explicit here: sequential disk writes — writing to the end of
          a file, never seeking backward to modify existing bytes — can approach the raw throughput limit of the
          storage device itself, even on spinning disks, because the disk head (or, on SSDs, the internal
          controller) never has to jump around. Random writes, by contrast, are dramatically slower, because
          every write requires relocating to a different part of the disk first. Kafka's entire storage design —
          append-only segments, no in-place updates, sequential reads from a consumer's offset forward — exists
          specifically to keep every disk operation sequential.
        </Para>
        <CodeBox label="why this matters even on modern SSD/NVMe hardware">
{`# It is tempting to assume "SSDs are fast at random I/O anyway, so this
# doesn't matter on modern hardware" -- this undersells two things:

# 1. Sequential I/O is still meaningfully faster than random I/O even
#    on NVMe, especially for large sustained throughput, because larger
#    contiguous writes reduce per-operation overhead and enable better
#    write coalescing and read-ahead at the OS and controller level.

# 2. Kafka's real performance advantage over many alternative systems
#    is that it was designed around sequential I/O from the start --
#    this is what lets a single broker sustain very high throughput on
#    commodity disks, not exotic hardware. The design assumption pays
#    off regardless of which storage tier you run it on.`}
        </CodeBox>
        <SubTitle>XFS vs ext4</SubTitle>
        <Para>
          Both XFS and ext4 are common production choices for Kafka broker log directories. XFS is generally the
          more commonly recommended default in current Kafka deployment guides, largely because of better
          out-of-the-box performance characteristics for the large sequential file operations and large numbers
          of files (many segments across many partitions) that a broker's log directory involves, without
          requiring as much manual tuning as ext4 to reach comparable throughput. ext4 remains a perfectly
          workable choice, particularly on teams already standardized on it operationally, but if you are
          choosing a filesystem for a new Kafka deployment with no existing constraint, XFS is the safer default.
        </Para>
        <SubTitle>Separate disks for Kafka log data and the OS</SubTitle>
        <Para>
          Placing Kafka's log directories on a dedicated disk (or dedicated set of disks/volumes), separate from
          the disk the operating system, its logs, and swap live on, matters for two reasons. First, contention —
          OS-level disk activity (system logging, package updates, swap activity under memory pressure) competing
          with Kafka's own sequential write pattern for the same physical disk introduces exactly the kind of
          random-access interference that Part 05's sequential-I/O design is trying to avoid. Second, isolation —
          if the OS disk fills up or degrades, a shared disk risks taking the broker's log writes down with it;
          a dedicated log disk isolates that failure domain. On multi-disk broker hosts, Kafka also supports
          configuring multiple log directories (<code>log.dirs</code>, a comma-separated list) so partitions can
          be spread across several physical disks, increasing aggregate disk throughput available to one broker.
        </Para>
        <Callout title="RAID and log.dirs are not the same solution" color="#ef4444">
          Some teams reach for RAID striping across log disks to get more throughput from a single logical
          volume. Kafka's own replication already provides redundancy across brokers, so RAID for redundancy is
          often redundant with what Kafka already guarantees — but RAID striping purely for throughput, or
          simply listing multiple independent disks in <code>log.dirs</code> and letting Kafka spread partitions
          across them, are both reasonable approaches; pick based on whether you want the filesystem or Kafka
          itself deciding the data placement.
        </Callout>
        <SubTitle>Mount options and a few smaller filesystem details worth checking</SubTitle>
        <Para>
          A handful of smaller filesystem-level decisions compound with the sequential-I/O design rather than
          replacing it. Mounting the log directory with the <code>noatime</code> option (skipping the write that
          would otherwise update each file's last-accessed timestamp on every read) removes a write operation
          that provides Kafka no benefit, since Kafka does not rely on file access-time metadata for anything —
          on a broker doing enormous volumes of sequential reads, this avoids a meaningful number of otherwise
          unnecessary metadata writes. Pre-allocating segment files at their configured
          <code>log.segment.bytes</code> size rather than growing them incrementally (Kafka does this by
          default) also avoids repeated filesystem metadata updates during the busiest part of a segment's life.
        </Para>
        <Table
          headers={['Filesystem detail', 'What it avoids', 'Relevant setting']}
          rows={[
            ['noatime mount option', 'An unnecessary metadata write on every single file read', 'Set at the OS mount level for the log.dirs volume, not a Kafka broker config.'],
            ['Segment pre-allocation', 'Repeated incremental file-growth metadata updates while a segment is actively being written to', 'log.preallocate (broker config, off by default in some distributions — confirm the default for your Kafka version).'],
            ['Filesystem choice (XFS vs ext4)', 'ext4\'s comparatively higher tuning burden to reach equivalent large-file, high-file-count throughput', 'An OS-level choice made when provisioning the broker, not a runtime Kafka setting.'],
          ]}
        />
      </section>

      <Divider />

      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 06 — Network Tuning" />
        <SectionTitle>Socket Buffer Sizes for High-Throughput, High-Latency Links</SectionTitle>
        <Para>
          Most Kafka deployments run within a single data center or availability zone, where network latency is
          low enough that default socket buffer sizes rarely become the bottleneck. This changes when a
          producer, consumer, or cross-region replication link (covered in more depth in the disaster recovery
          module) has to traverse a high-latency network path — cross-region traffic, or a client connecting
          from outside the cluster's own network. On a high-bandwidth, high-latency link, the default TCP socket
          buffer sizes can become the actual limiting factor on throughput, independent of how well-tuned every
          other Kafka setting is.
        </Para>
        <Para>
          The underlying reason is the bandwidth-delay product: the amount of data that can be "in flight" on a
          network connection before an acknowledgment can possibly return is bandwidth multiplied by round-trip
          latency. If the socket's send/receive buffers are smaller than this product, the connection cannot
          fill the available bandwidth no matter how fast either endpoint is — it spends time waiting for
          acknowledgments instead of sending more data.
        </Para>
        <CodeBox label="socket.send.buffer.bytes and socket.receive.buffer.bytes — bandwidth-delay product">
{`# Example: a producer in one AWS region writing to a Kafka cluster
# in another region, over a 1 Gbps link with 80ms round-trip latency

bandwidth_delay_product = (1,000,000,000 bits/sec / 8) * 0.080 sec
                         = 125,000,000 bytes/sec * 0.080 sec
                         = 10,000,000 bytes  (~10 MB)

# Kafka's default socket.send.buffer.bytes / socket.receive.buffer.bytes
# is often 100KB (broker) or OS-default (client) -- far below 10 MB

# Result: the connection cannot use the full 1 Gbps of available
# bandwidth, regardless of batch.size, linger.ms, or compression
# tuning -- the socket buffer itself is the ceiling

# Fix: raise socket.send.buffer.bytes / socket.receive.buffer.bytes
# (and the OS-level net.core.rmem_max / net.core.wmem_max on Linux,
# since the OS must also be configured to allow buffers this large)
# to comfortably exceed the calculated bandwidth-delay product`}
        </CodeBox>
        <Para>
          This tuning is specific to genuinely high-latency links. On a low-latency local network, the
          bandwidth-delay product is small enough that default buffer sizes are almost never the constraint, and
          raising them has little to no effect — it is worth confirming which situation you are actually in
          before spending time here, per the "tune the bottleneck" guidance from Part 01.
        </Para>
        <Table
          headers={['Network path', 'Typical round-trip latency', 'Is socket buffer tuning usually worth the effort?']}
          rows={[
            ['Same availability zone', '&lt; 1ms', 'Rarely — bandwidth-delay product is tiny; default buffers are almost never the constraint.'],
            ['Same region, cross-AZ', '1-5ms', 'Occasionally, only at very high sustained throughput — check the calculated bandwidth-delay product before spending time here.'],
            ['Cross-region, same continent', '20-60ms', 'Usually yes for any meaningfully high-throughput link — this is the common case in Part 06\'s worked example.'],
            ['Cross-region, intercontinental', '80-200ms+', 'Almost always yes — the bandwidth-delay product at these latencies is large enough that default buffers routinely underperform, sometimes dramatically.'],
          ]}
        />
      </section>

      <Divider />

      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 07 — JVM Tuning" />
        <SectionTitle>G1GC and Avoiding the Instinct to Oversize the Heap</SectionTitle>
        <Para>
          Part 03 already established the core broker-heap insight — keep it small, let the OS page cache have
          the rest of the machine's RAM. This section covers the garbage collector choice that makes a
          reasonably small heap perform well under sustained broker load.
        </Para>
        <Para>
          G1GC (Garbage-First Garbage Collector) is the standard recommended collector for Kafka brokers and is
          the default in current JVM versions used with current Kafka releases. Its defining characteristic
          relevant to Kafka is that it targets a configurable maximum pause time
          (<code>-XX:MaxGCPauseMillis</code>) rather than optimizing purely for throughput at the cost of
          occasional long stop-the-world pauses. Since a long GC pause on a broker can delay replication
          heartbeats and request handling — the same mechanism covered in Module 03's discussion of a Java
          consumer's heartbeat thread freezing during a GC pause — a collector that keeps individual pauses
          short and predictable matters more for a broker than one that maximizes raw allocation throughput.
        </Para>
        <CodeBox label="a common, well-tested broker JVM flag set">
{`-Xms6g -Xmx6g
-XX:+UseG1GC
-XX:MaxGCPauseMillis=20
-XX:InitiatingHeapOccupancyPercent=35

# -Xms == -Xmx: fixes the heap size rather than letting it grow
#   dynamically, avoiding resize pauses and giving predictable
#   page-cache headroom on the rest of the machine
# MaxGCPauseMillis: a target, not a guarantee -- G1GC tries to keep
#   individual pauses under this, trading it against throughput
# InitiatingHeapOccupancyPercent: starts a concurrent GC cycle
#   earlier, reducing the chance of a larger, more disruptive
#   full GC being needed later under sustained load`}
        </CodeBox>
        <Callout title="A bigger heap does not mean fewer GC pauses" color={K}>
          The instinct that "more memory should reduce GC pressure" is true for many applications but misleading
          for a broker specifically, because a larger heap does not just mean fewer collections — it means each
          collection has more live/garbage data to scan through, which lengthens individual pause times. Combined
          with Part 03's page-cache finding, both the throughput case and the GC-pause case point the same
          direction: keep the broker heap modest and deliberately sized, not maximized.
        </Callout>
        <SubTitle>What actually lives on the broker heap</SubTitle>
        <Para>
          It helps to be concrete about what the broker heap holds, since "modest heap is fine" can otherwise
          feel like it contradicts the sheer volume of data a broker handles. Message payloads themselves are
          not the answer — the read path uses a zero-copy transfer mechanism (the OS moves bytes from the page
          cache directly to the network socket without passing through JVM-managed memory at all), and the write
          path similarly avoids copying record bytes into heap-managed objects unnecessarily. What the heap
          actually holds is bounded, comparatively small bookkeeping: request/response object overhead, replica
          and partition metadata, client connection state, and various in-memory indexes and caches the broker
          maintains for its own coordination — none of which scales with the volume of message data flowing
          through the broker, only with the number of partitions, connections, and in-flight requests.
        </Para>
        <Table
          headers={['Heap size choice', 'Effect on GC pause length', 'Effect on page cache', 'Net effect on broker performance']}
          rows={[
            ['Too small (e.g. 2 GB on a busy broker)', 'Frequent collections, though individually short', 'Maximizes page cache — good for reads', 'Can cause its own problems: frequent GC activity competing for CPU, occasional allocation failures under a metadata spike'],
            ['Well-tested (≈6 GB on most brokers)', 'Infrequent, short, predictable pauses', 'Large page cache on any reasonably sized modern host', 'The balance point most production Kafka deployments converge on'],
            ['Oversized (e.g. 32 GB "to be safe")', 'Rare but long, disruptive pauses', 'Starved — less RAM available for the page cache', 'Actively worse for both read latency and GC-related replication delays, per this Part\'s core finding'],
          ]}
        />
      </section>

      <Divider />

      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 08 — Benchmarking Methodology" />
        <SectionTitle>Measuring Before and After With kafka-producer-perf-test.sh and kafka-consumer-perf-test.sh</SectionTitle>
        <Para>
          Every trade-off in this module is only worth making if you can measure whether it actually helped your
          workload. Kafka ships two command-line benchmarking tools specifically for this — they generate
          synthetic load against a real topic and report throughput and latency numbers, letting you compare a
          setting change against a baseline under controlled, repeatable conditions rather than guessing from
          production noise.
        </Para>
        <SubTitle>kafka-producer-perf-test.sh</SubTitle>
        <CodeBox label="baseline producer benchmark">
{`kafka-producer-perf-test.sh \\
  --topic perf-test-topic \\
  --num-records 5000000 \\
  --record-size 512 \\
  --throughput -1 \\
  --producer-props bootstrap.servers=broker-1:9092 \\
                    acks=all \\
                    linger.ms=0 \\
                    batch.size=16384 \\
                    compression.type=none

# --throughput -1 means "as fast as possible" -- useful for finding
# the ceiling. Set a specific number (e.g. 50000) to simulate a
# realistic sustained load instead, which is usually more useful
# than a raw ceiling number for capacity-planning purposes.`}
        </CodeBox>
        <Output>{`5000000 records sent, 812743.234567 records/sec (396.85 MB/sec),
1.42 ms avg latency, 88.00 ms max latency, 1 ms 50th, 3 ms 95th,
12 ms 99th, 45 ms 99.9th.`}</Output>
        <CodeBox label="the same benchmark, tuned for throughput per Part 02">
{`kafka-producer-perf-test.sh \\
  --topic perf-test-topic \\
  --num-records 5000000 \\
  --record-size 512 \\
  --throughput -1 \\
  --producer-props bootstrap.servers=broker-1:9092 \\
                    acks=all \\
                    linger.ms=20 \\
                    batch.size=131072 \\
                    compression.type=zstd`}
        </CodeBox>
        <Output>{`5000000 records sent, 2145890.112233 records/sec (1048.77 MB/sec),
9.85 ms avg latency, 210.00 ms max latency, 8 ms 50th, 22 ms 95th,
61 ms 99th, 140 ms 99.9th.`}</Output>
        <Para>
          Reading these two runs side by side is the whole point of the exercise: throughput went up roughly
          2.6x, but average latency went from 1.42ms to 9.85ms and tail latency (99th percentile) went from
          12ms to 61ms. This is Part 01's trade-off made concrete and numeric, on your own hardware, with your
          own record shape — not a rule of thumb borrowed from someone else's blog post. Whether this trade is
          worth it depends entirely on which workload classification from Part 01 you are tuning for.
        </Para>
        <SubTitle>kafka-consumer-perf-test.sh</SubTitle>
        <CodeBox label="consumer-side benchmark">
{`kafka-consumer-perf-test.sh \\
  --topic perf-test-topic \\
  --messages 5000000 \\
  --bootstrap-server broker-1:9092 \\
  --consumer.config consumer-perf.properties

# consumer-perf.properties contains the settings being tested, e.g.:
#   fetch.min.bytes=65536
#   fetch.max.wait.ms=200
#   max.partition.fetch.bytes=2097152`}
        </CodeBox>
        <Output>{`start.time, end.time, data.consumed.in.MB, MB.sec,
data.consumed.in.nMsg, nMsg.sec
2026-09-04 10:12:01, 2026-09-04 10:12:07, 2441.40, 406.90,
5000000, 833333.33`}</Output>
        <SubTitle>The methodology, not just the tools</SubTitle>
        <Para>
          A few operational details separate a trustworthy benchmark from a misleading one, beyond simply
          running the tool and reading the output number.
        </Para>
        <BulletList
          items={[
            'Benchmark against a dedicated topic, not a production topic — synthetic load and real traffic sharing a topic invalidates both the benchmark and the production metrics.',
            'Change one setting at a time between runs. Changing linger.ms, compression.type, and batch.size together tells you the combined effect but not which one actually mattered.',
            'Run each configuration multiple times and look at the spread, not a single number — a single run can be skewed by an unrelated, transient blip on the broker or network.',
            'Match record size and record count to your real workload\'s shape — a benchmark using tiny records to test a pipeline that actually sends large, complex payloads will mislead you about compression ratio and batching behavior specifically.',
            'Benchmark on hardware that matches production as closely as possible — disk type, network path, and broker sizing all affect the numbers meaningfully; a benchmark run from a laptop against a cloud cluster measures the laptop-to-cloud network path as much as it measures Kafka.',
          ]}
        />
        <Callout title="A benchmark without a baseline measures nothing" color="#ef4444">
          Always run the current, unmodified configuration first and record its numbers before changing
          anything. "Tuned settings produced 1,048 MB/sec" is meaningless without knowing the untuned baseline
          was 396 MB/sec — the delta is the actual finding, not the absolute number.
        </Callout>
        <SubTitle>Why percentiles matter more than averages when reading benchmark output</SubTitle>
        <Para>
          Both perf-test tools report latency as a set of percentiles — 50th, 95th, 99th, 99.9th — rather than a
          single average, and reading the percentiles rather than just the average is not optional detail; it
          changes the conclusion you draw from a benchmark. An average can look perfectly acceptable while a
          meaningful fraction of requests experience latency far worse than that average suggests, and for many
          real systems it is specifically the tail — the 99th or 99.9th percentile — that determines whether
          users notice a problem, because a system serving thousands of requests per second hits its 99th
          percentile constantly, not rarely.
        </Para>
        <CodeBox label="why the average alone would have missed the real story in Part 08's tuned-settings result">
{`# Tuned settings result from earlier in this Part:
#   avg latency: 9.85 ms
#   50th percentile: 8 ms
#   95th percentile: 22 ms
#   99th percentile: 61 ms
#   99.9th percentile: 140 ms

# If you only looked at the average (9.85ms), you might conclude
# this configuration is barely slower than the untuned baseline's
# 1.42ms average and call it an easy win with no real cost.

# The 99th percentile tells a different story: roughly 1 in 100
# requests under this configuration waits 61ms or more -- more
# than 40x the average. For a latency-sensitive path where even a
# small fraction of slow requests matters (a user-facing API,
# a real-time bidding system), this tail latency is the number
# that actually determines whether the tuning change is acceptable,
# not the average that looked comfortable at a glance.`}
        </CodeBox>
        <Para>
          This is exactly why Part 01 frames the choice between the two tuning profiles in Part 09 as a genuine
          decision with real costs on both sides, not a free lunch — a throughput gain that looks good in an
          average-latency number can hide a tail-latency regression that matters a great deal to whichever
          workload is actually latency-sensitive. Always inspect at least the 99th percentile before accepting a
          throughput-oriented change for any pipeline where individual request latency has a real cost.
        </Para>
      </section>

      <Divider />

      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 09 — Putting It Together" />
        <SectionTitle>Two Complete Tuning Profiles, Side by Side</SectionTitle>
        <Para>
          Every setting in this module has been presented individually, with its own trade-off. In practice,
          you rarely tune one setting in isolation — a real pipeline needs a coherent profile where producer,
          broker, and consumer settings all point the same direction on the latency-versus-throughput axis from
          Part 01. Presenting two complete, opposite profiles side by side makes the coherence requirement
          concrete, and gives you a starting point to adjust from rather than a blank page.
        </Para>
        <SubTitle>Profile A — latency-sensitive (a fraud-check API path a user is waiting on)</SubTitle>
        <Table
          headers={['Setting', 'Value', 'Why']}
          rows={[
            ['linger.ms', '0', 'Send immediately — no deliberate delay is acceptable on a path a user is blocked on.'],
            ['batch.size', 'Default (16 KB) or lower', 'Small batches are expected and fine; the goal is not to force artificial batching that adds latency.'],
            ['compression.type', 'lz4 or none', 'Lowest CPU cost per record; a few percent of compression ratio is not worth added per-record latency here.'],
            ['acks', 'all, with min.insync.replicas=2', 'A fraud decision has real business consequences if the underlying event is lost — durability still matters even on a latency-sensitive path.'],
            ['fetch.min.bytes (downstream consumer)', '1 (default)', 'The downstream scoring service needs the record the instant it is available, not after a batching delay.'],
          ]}
        />
        <SubTitle>Profile B — throughput-sensitive (nightly clickstream warehouse load)</SubTitle>
        <Table
          headers={['Setting', 'Value', 'Why']}
          rows={[
            ['linger.ms', '20-50ms', 'Nobody is waiting on any individual record; maximize batch fill for fewer, larger requests.'],
            ['batch.size', '128 KB - 256 KB', 'Large batches amortize per-request overhead and compress far better as a unit.'],
            ['compression.type', 'zstd', 'Best ratio-per-CPU-cost for a workload where CPU is available and network/disk savings compound at scale.'],
            ['acks', 'all, or acks=1 if some loss is acceptable for this specific analytical use case', 'Depends on whether this data feeds a system where occasional loss has real cost — decide deliberately per Module 03\'s producer design rule, not by copying Profile A.'],
            ['fetch.min.bytes (downstream consumer)', '64 KB - 1 MB, with a bounded fetch.max.wait.ms', 'Maximize throughput per fetch request; the consumer is a batch job with no per-record latency requirement at all.'],
          ]}
        />
        <Callout title="Pick a profile per pipeline, not per cluster" color={K}>
          A single Kafka cluster commonly hosts both kinds of topics simultaneously — this is expected and
          correct. The tuning decisions in this module apply at the producer-config and consumer-config level,
          which are per-application settings, not cluster-wide settings. A fraud-check producer and a clickstream
          warehouse-load producer writing to the same cluster should have entirely different
          <code>linger.ms</code> and <code>compression.type</code> values, because they are answering different
          questions about what "fast" means for their own workload.
        </Callout>
        <SubTitle>Profile C — a common middle ground (order-confirmation events with a downstream analytics fan-out)</SubTitle>
        <Para>
          Not every pipeline sits cleanly at one extreme. A topic like order-confirmation events is often read
          by two very different kinds of consumer at once: a notification service that wants the event with low
          latency, and an analytics pipeline reading the same topic that cares only about aggregate throughput.
          Since consumer groups are independent (Module 03), each consumer can be tuned separately even though
          they read the same topic — the notification-service consumer group keeps
          <code>fetch.min.bytes</code> low, while the analytics consumer group raises it, both reading the same
          underlying data with no coordination required between the two tunings.
        </Para>
        <Table
          headers={['Component', 'Tuning choice', 'Why']}
          rows={[
            ['Producer (order service)', 'linger.ms=5, acks=all, compression.type=lz4', 'A modest linger.ms balances the fact that some downstream consumers care about latency without fully sacrificing batching efficiency; acks=all is non-negotiable for an order event.'],
            ['Notification-service consumer group', 'fetch.min.bytes=1 (default)', 'This consumer needs the event as soon as possible to notify the customer promptly.'],
            ['Analytics consumer group', 'fetch.min.bytes=131072, fetch.max.wait.ms=500', 'This consumer only cares about eventual aggregate throughput and benefits from larger, less frequent fetches.'],
          ]}
        />
        <Para>
          This pattern — one producer with a moderate, shared-compromise configuration, and multiple independent
          consumer groups each tuned for their own use case — is common enough in practice that it is worth
          recognizing as a distinct third option, not just a failure to pick between Profile A and Profile B.
        </Para>
        <SubTitle>A short checklist before calling a tuning pass complete</SubTitle>
        <BulletList
          items={[
            'Did you classify the workload as latency-sensitive or throughput-sensitive before picking any value, per Part 01?',
            'Did you confirm, using the monitoring module\'s metrics, which part of the pipeline was actually the bottleneck before changing settings, per Part 01\'s closing guidance?',
            'Did you check broker heap size against Part 03\'s page-cache guidance rather than assuming bigger is better?',
            'Did you change producer batching/compression and consumer fetch settings together, per Part 04\'s callout, rather than tuning only one side of the pipeline?',
            'Did you benchmark the change against a recorded baseline with kafka-producer-perf-test.sh / kafka-consumer-perf-test.sh, per Part 08, before rolling it to production?',
            'Did you re-check the same monitoring metrics after rollout to confirm the benchmark\'s findings held under real production traffic, not just synthetic load?',
          ]}
        />
      </section>

      <Divider />

      <section style={{ marginBottom: 64 }} data-toc-kind="myth">
        <SectionTag text="// Misconceptions" />
        <SectionTitle>Five Misconceptions About Kafka Performance Tuning</SectionTitle>
        {[
          {
            wrong: '"Giving the broker JVM more heap will make it faster"',
            right: 'Part 03 covers why this is often exactly backwards — Kafka relies on the OS page cache, not the JVM heap, to serve reads efficiently, and a larger heap both steals RAM from that page cache and lengthens individual GC pause times. A broker heap around 6 GB, regardless of total machine RAM, is a well-tested starting point.',
          },
          {
            wrong: '"Maximum compression (gzip) is always the best choice since it saves the most bandwidth and disk"',
            right: 'Part 02\'s codec comparison shows gzip has the highest CPU cost of the common codecs, and under sustained high volume that CPU cost becomes the real bottleneck. zstd typically offers a much better ratio-to-CPU-cost trade-off, and for latency-sensitive paths, lz4/snappy\'s lower CPU cost usually matters more than an incrementally better ratio.',
          },
          {
            wrong: '"linger.ms should always be 0 for the lowest possible latency"',
            right: 'Part 01 and Part 02 both frame this as workload-dependent. A linger.ms of 0 is correct for a latency-sensitive path a user is waiting on, but for throughput-oriented bulk ingestion, a small nonzero linger.ms (10-50ms) usually produces a dramatically better throughput-to-latency trade, per the worked request-count math from Module 03.',
          },
          {
            wrong: '"Since Kafka uses sequential I/O, disk type and filesystem choice barely matter"',
            right: 'Part 05 covers why sequential I/O is still meaningfully faster on the right filesystem and dedicated hardware — XFS is generally preferred over ext4 for Kafka log directories, and sharing a log disk with OS activity introduces exactly the kind of contention and random-access interference the sequential design is trying to avoid in the first place.',
          },
          {
            wrong: '"Once you have picked good settings, they apply to every topic in the cluster equally"',
            right: 'Part 01\'s core framing is that tuning is workload-specific — a payment-confirmation topic and a clickstream-ingestion topic legitimately want different linger.ms, compression.type, and fetch settings on their respective producers and consumers, because they sit at different points on the latency-versus-throughput trade-off. There is no single "correct" global setting.',
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
            <strong>At Reddit:</strong> a team ingesting comment and vote events into Kafka for real-time
            ranking finds their producer is CPU-bound on a shared host during peak traffic hours. Following
            Part 02\'s codec table, they switch from gzip to zstd and raise linger.ms from 0 to 15ms for this
            specific, throughput-oriented pipeline — not for their separately tuned, latency-sensitive
            moderation-alert topic — and confirm the change with kafka-producer-perf-test.sh per Part 08 before
            rolling it to production, seeing producer CPU utilization drop meaningfully at the same message
            volume.
          </Para>
        </HighlightBox>
        <HighlightBox>
          <Para>
            <strong>At Pinterest:</strong> a newly provisioned Kafka cluster is set up with brokers configured
            with a 24 GB JVM heap "to be safe," on 128 GB machines. Broker GC pause metrics show unusually long
            pauses correlating with occasional replication lag spikes. Following Part 03 and Part 07\'s guidance,
            the platform team drops the heap to 6 GB with G1GC and a tuned MaxGCPauseMillis, freeing the
            remaining RAM for the OS page cache — read latency for recently-produced data improves, and the
            correlated replication lag spikes stop appearing.
          </Para>
        </HighlightBox>
        <HighlightBox>
          <Para>
            <strong>At Yelp:</strong> a review-ingestion pipeline replicating data to a Kafka cluster in a
            second region over a cross-region link starts hitting a throughput ceiling well below the link\'s
            advertised bandwidth. Using the bandwidth-delay product calculation from Part 06, an engineer
            confirms the default socket buffer sizes are far smaller than what the link\'s latency and bandwidth
            require, raises socket.send.buffer.bytes and the corresponding OS-level net.core.wmem_max, and the
            replication link\'s achieved throughput rises to close to its theoretical ceiling.
          </Para>
        </HighlightBox>
      </section>

      <Divider />

      <section style={{ marginBottom: 64 }} data-toc-kind="prep">
        <SectionTag text="// Interview Prep" />
        <SectionTitle>5 Interview Questions — With Complete Answers</SectionTitle>
        {[
          {
            q: 'Q1. Why would you set a Kafka broker\'s JVM heap much smaller than the total RAM on the machine?',
            a: `Kafka's storage engine relies heavily on the operating system's page cache rather than JVM-managed memory to serve reads efficiently, per Part 03. Message payloads are largely handled via zero-copy transfer for the read path, bypassing the JVM heap almost entirely, so the heap mainly needs to hold Kafka's own internal bookkeeping and metadata, not the actual message data flowing through the broker.

If you give the JVM a very large heap, you're taking memory away from the page cache that would otherwise let recently-produced data be served straight from RAM instead of falling through to physical disk on every read. You're also making garbage collection pauses longer, since a larger heap has more live and garbage data to scan on each collection cycle, and long GC pauses on a broker can delay replication heartbeats and request handling in ways that show up as replication lag or client timeouts.

A common, well-tested starting point is around 6 GB of heap regardless of whether the machine has 32 GB or 256 GB of RAM — the rest deliberately belongs to the OS page cache.`,
          },
          {
            q: 'Q2. Walk me through the trade-off you are making when you raise linger.ms and batch.size for a producer.',
            a: `Raising linger.ms tells the producer to deliberately wait up to that many milliseconds after the first record in a batch arrives, hoping more records show up to fill it, before sending. Raising batch.size raises the ceiling on how large that batch is allowed to get before it's sent regardless of the timer. Together they push the producer toward fewer, larger, more efficient requests instead of many small ones.

The cost is per-record latency — an individual record can now sit in an unsent batch for up to linger.ms before it's even transmitted, on top of whatever network and broker processing time follows. There's also more unsent data sitting in producer memory at any given moment, bounded by buffer.memory, which is more data at risk if the producer process crashes before the batch is sent.

The trade only makes sense for a workload where aggregate throughput matters more than any single record's latency — bulk ingestion, log aggregation, clickstream data. For a latency-sensitive path, like an API request that blocks on a Kafka write before responding to a user, I'd keep linger.ms low or at zero and accept the smaller batches.`,
          },
          {
            q: 'Q3. A producer is CPU-bound and throughput has plateaued even though the network and broker both have headroom. What would you check?',
            a: `The first thing I'd suspect is compression.type, since compression is the most CPU-intensive step in the producer's send path for most workloads. If the producer is using gzip, which has the highest CPU cost among the common codecs, switching to lz4 or zstd usually recovers a meaningful amount of CPU headroom while still keeping most of the compression benefit — zstd in particular tends to offer a strong ratio for a moderate CPU cost.

I'd also check batch.size and linger.ms. Counterintuitively, very small batches can increase CPU overhead per byte, since the fixed per-batch and per-request cost (serialization, compression setup, network framing) is being paid more often for less data each time. Raising both toward the throughput-tuned end of Part 01's spectrum, so each compression and network operation amortizes over more bytes, often helps a CPU-bound producer as much as it helps overall throughput.

I would confirm the diagnosis rather than guess, using kafka-producer-perf-test.sh with the current settings as a baseline, then compare against a run with the codec and batching changes applied, before rolling the change to production.`,
          },
          {
            q: 'Q4. Why does Kafka\'s use of sequential disk I/O matter for performance, and does it still matter on SSD/NVMe hardware?',
            a: `Kafka's storage engine, going back to the commit-log design covered in the retention and compaction module, only ever appends to the end of a partition's log — no in-place updates, no random writes into the middle of a file. Sequential writes can approach the raw throughput limit of the underlying storage device because the disk (or, on SSDs, the internal controller) never has to relocate to a different part of the disk between operations; random writes are dramatically slower because every write pays that relocation cost.

It still matters on modern SSD/NVMe hardware, even though those devices handle random I/O far better than spinning disks did. Sequential access is still meaningfully faster for large sustained throughput, since larger contiguous operations reduce per-operation overhead and enable better write coalescing and read-ahead at the OS and controller level. More importantly, Kafka's whole performance story — sustaining very high throughput on commodity hardware — is built around this design assumption from the start, so the benefit holds regardless of which storage tier you deploy it on; it's a design advantage, not a workaround for a specific hardware limitation.`,
          },
          {
            q: 'Q5. How would you benchmark a proposed Kafka tuning change before rolling it out to production?',
            a: `I'd use Kafka's own kafka-producer-perf-test.sh and kafka-consumer-perf-test.sh tools against a dedicated benchmark topic, never a live production topic, so the synthetic load doesn't distort real traffic and real traffic doesn't distort the benchmark's numbers.

First I'd run the current, unmodified configuration to get a baseline — throughput and latency percentiles, not just an average. Then I'd change exactly one setting, rerun the same benchmark with the same record size and count, and compare. Changing multiple settings — say, linger.ms, batch.size, and compression.type — all at once tells you the combined effect but not which individual change actually drove it, which matters if I later need to reason about a regression or explain the change to someone else.

I'd also make sure the benchmark's record size and volume roughly match the real workload's shape, since compression ratio and batching behavior are both sensitive to that, and run each configuration more than once to make sure a single run wasn't skewed by an unrelated, transient blip on the broker or network. Only after seeing a consistent, reproducible improvement against the baseline would I roll the change out, and even then I'd watch the same metrics in production afterward to confirm the benchmark's findings held under real traffic.`,
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
        <SectionTitle>The Mistakes That Undermine Kafka Performance Tuning</SectionTitle>
        {[
          {
            q: 'Oversizing the broker JVM heap on the assumption that more memory always helps',
            a: 'Part 03 covers why this is backwards for a broker specifically — it steals RAM from the OS page cache that read performance actually depends on, and it lengthens GC pause times, which can delay replication and request handling.',
          },
          {
            q: 'Changing multiple settings at once and declaring victory on aggregate throughput alone',
            a: 'Part 08\'s methodology is explicit that changing one setting at a time, and looking at both throughput and latency percentiles, is what actually tells you which change mattered — a single combined number can hide a large latency regression behind a modest throughput win.',
          },
          {
            q: 'Applying the same producer and consumer settings uniformly across every topic regardless of workload',
            a: 'Part 01\'s core framing is that tuning is workload-specific. A payment-confirmation topic and a clickstream-ingestion topic sit at different points on the latency-versus-throughput trade-off and should not share the same linger.ms, compression.type, or fetch settings.',
          },
          {
            q: 'Tuning a setting without first confirming, via metrics, which part of the pipeline is actually the bottleneck',
            a: 'Part 01\'s closing guidance and Part 03\'s thread-pool table both stress measuring first — doubling batch.size does nothing if the producer is CPU-bound on compression, and raising fetch.min.bytes does nothing if consumer processing logic, not the fetch, is the actual slow part.',
          },
          {
            q: 'Running a compression or batching benchmark with unrealistic record sizes',
            a: 'Part 08 covers why this specifically misleads compression-ratio and batching conclusions — a benchmark using tiny synthetic records to represent a workload that sends large, structured payloads in production will not reflect how those settings actually behave on real traffic.',
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
        <SectionTitle>Symptoms You Will Hit While Tuning — And Exactly Why They Happen</SectionTitle>
        {[
          {
            error: `producer send() calls start blocking, and application threads stall waiting on Kafka writes with no broker-side error at all`,
            cause: 'Per Part 02, buffer.memory has been exhausted — too many partially-filled batches, across too many partitions, are sitting unsent at once for the configured pool size, often after batch.size or linger.ms was raised for throughput without also checking buffer.memory against the new worst-case memory usage.',
            fix: 'Calculate worst-case outstanding-batch memory as partition count times batch.size and confirm it fits comfortably under buffer.memory with headroom for retries and compression overhead; either raise buffer.memory or reduce batch.size / partition fan-out per producer instance.',
          },
          {
            error: `broker GC pause metrics show unusually long individual pauses, correlated with occasional replication lag spikes`,
            cause: 'Per Part 03 and Part 07, the JVM heap is oversized relative to what a broker actually needs, which both starves the OS page cache of RAM the read path depends on and lengthens each garbage collection cycle, since there is more live and garbage data to scan per pause.',
            fix: 'Reduce the broker heap toward a well-tested starting point around 6 GB with -Xms equal to -Xmx, confirm G1GC is in use with a reasonable MaxGCPauseMillis target, and let the freed RAM serve the OS page cache instead.',
          },
          {
            error: `consumer throughput plateaus well below what the topic's producer rate and partition count should support, with the broker showing plenty of headroom`,
            cause: 'Per Part 04, fetch.min.bytes is left at its low default while the workload is throughput-oriented, so the consumer is issuing many small fetch requests instead of fewer, larger ones — the bottleneck is fetch request overhead, not broker capacity or consumer processing speed.',
            fix: 'Raise fetch.min.bytes (with a bounded fetch.max.wait.ms so a quiet topic does not add unacceptable latency) to let the broker batch more data into each fetch response, and re-benchmark with kafka-consumer-perf-test.sh to confirm the change actually moved the needle.',
          },
          {
            error: `a cross-region replication or producer link achieves far less throughput than the link's advertised bandwidth, despite low CPU and disk usage on both ends`,
            cause: 'Per Part 06, the connection\'s socket buffers are smaller than the bandwidth-delay product for that link\'s latency and bandwidth, so the connection cannot keep enough data in flight to saturate the available bandwidth, regardless of how well-tuned every other Kafka setting is.',
            fix: 'Calculate the bandwidth-delay product for the specific link (bandwidth times round-trip latency) and raise socket.send.buffer.bytes / socket.receive.buffer.bytes, along with the corresponding OS-level net.core.rmem_max / net.core.wmem_max on Linux, to comfortably exceed that figure.',
          },
          {
            error: `a benchmarking run with kafka-producer-perf-test.sh shows dramatically better throughput than production ever achieves for what looks like the same settings`,
            cause: 'Per Part 08, the benchmark\'s record size, record count, or hardware path does not actually match production\'s real workload shape — a common cause is benchmarking with small, uniform synthetic records against a workload that sends larger, more variable real payloads, which changes both compression ratio and batching behavior.',
            fix: 'Re-run the benchmark using record sizes and counts that reflect the real workload, from infrastructure that matches production\'s network path and broker sizing as closely as possible, before trusting the comparison.',
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
          'Every performance setting in Kafka trades latency for throughput or the reverse — tune toward a stated workload target (latency-sensitive vs throughput-sensitive), not toward a universally "good" value.',
          'batch.size and linger.ms are the producer\'s main throughput levers; compression.type compounds with them, since bigger batches compress better — zstd is usually the best ratio-per-CPU-cost default, gzip the highest-ratio but highest-CPU choice.',
          'Kafka relies on the OS page cache, not the JVM heap, to serve reads efficiently — an oversized broker heap steals RAM from the page cache and lengthens GC pauses; ~6 GB is a well-tested starting point regardless of total machine RAM.',
          'num.network.threads and num.io.threads are separate broker bottlenecks — network threads receive requests, I/O threads do the actual disk and replication work; diagnose which pool is constrained before resizing either.',
          'fetch.min.bytes and fetch.max.wait.ms are the consumer-side mirror of batch.size and linger.ms — raising fetch.min.bytes trades latency for fewer, larger fetch responses under high volume.',
          'Sequential disk I/O is why Kafka is fast; XFS is generally preferred over ext4 for Kafka log directories, and dedicated disks for Kafka logs (separate from the OS disk) avoid contention that undermines the sequential-write advantage.',
          'Socket buffer sizes matter specifically for high-bandwidth, high-latency links (cross-region traffic) — size them against the calculated bandwidth-delay product, not default values built for local, low-latency networks.',
          'Always benchmark with kafka-producer-perf-test.sh and kafka-consumer-perf-test.sh against a dedicated topic, changing one setting at a time against a recorded baseline, before rolling a tuning change to production.',
        ]}
      />
    </LearnLayout>
  )
}
