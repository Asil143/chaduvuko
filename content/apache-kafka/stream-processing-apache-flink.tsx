import { LearnLayout } from '@/components/content/LearnLayout'
import { BulletList, Callout, Chapter, CodeBlock, DeepExplain, Divider, KeyTakeaways, P, Table } from './_lesson-ui'

export default function StreamProcessingApacheFlink() {
  return (
    <LearnLayout
      title="Stream Processing with Apache Flink"
      description="Understand Flink's event-time model, watermarks, stateful windows, checkpointing, and Kafka source-to-sink pipelines through a worked streaming example."
      section="Apache Kafka — Lesson 15"
      readTime="45 min"
      breadcrumbs={[
        { label: 'Learn', href: '/learn' },
        { label: 'Apache Kafka', href: '/learn/apache-kafka' },
        { label: 'Stream Processing with Apache Flink', href: '/learn/apache-kafka/stream-processing-apache-flink' },
      ]}
    >
      <Chapter n="01" title="Where Flink Fits" subtitle="Prerequisites: topics, partitions, consumer groups, and the difference between event time and processing time." />
      <P><strong>Learning objective:</strong> design a Kafka-to-Flink job that handles event time, bounded state, checkpoints, and an explicit output contract.</P>
      <P>Kafka stores and distributes an ordered log. It does not calculate a continuously updated answer by itself. Apache Flink is a distributed processing engine that reads events, maintains state, handles event-time windows, and emits derived results. Pairing Kafka with Flink is useful when an order, delivery, or payment stream must be aggregated or joined as events arrive rather than in a later batch.</P>
      <P>Imagine a delivery platform wants a five-minute total of order value by region. Kafka topics carry order events; Flink reads them, filters invalid records from the paid-order stream, groups them by region, updates a windowed total, and writes results to a separate topic for dashboards or downstream services. The stream is still unbounded: the job stays running, and its state evolves as new records and late records arrive.</P>
      <Callout title="Kafka Streams or Flink?" tone="blue">Kafka Streams is a client library embedded in an application and fits Kafka-centric transformations with a simpler operational footprint. Flink is a separate distributed engine with a richer runtime for stateful, event-time processing and multiple connectors. Choose based on workload, operations capability, source/sink needs, and state requirements—not on a claim that one tool always replaces the other.</Callout>
      <Divider />

      <Chapter n="02" title="Time, Windows, and Watermarks" />
      <DeepExplain title="Event time is not the time your code sees a record">
        <P>Processing time is when a task handles a record. Event time is when the business event happened, usually carried in the event itself. Networks, mobile devices, retries, and upstream queues reorder arrival: a phone may upload a delivery scan after connectivity returns. If the question is “orders placed between 10:00 and 10:05,” processing-time windows can place a late-arriving 10:03 event in the wrong window. Event-time processing uses the event timestamp.</P>
        <P>A watermark is the engine's progress estimate for event time. It does not prove that no older event will ever arrive. A bounded-out-of-orderness strategy says, in effect, “expect records to be up to this far behind.” When the watermark passes a window boundary, Flink can produce the result; later records may be dropped or handled by an allowed-lateness strategy. Watermark delay is a latency-versus-completeness tradeoff that must be chosen from observed source behavior.</P>
      </DeepExplain>
      <Table headers={['Concept', 'Question it answers', 'Example choice']} rows={[
        ['Event time', 'When did the business event happen?', 'Timestamp attached by the order service.'],
        ['Processing time', 'When did this task handle the event?', 'Useful for operational latency, not historical event grouping.'],
        ['Watermark', 'How far has event-time progress advanced?', 'Allow bounded disorder based on measured late arrivals.'],
        ['Window', 'Which events form one result?', 'Five-minute tumbling revenue per region.'],
      ]} />
      <Callout title="A watermark is not a guarantee" tone="red">A watermark is an estimate based on your policy and observed input. If late data matters for financial reconciliation, define whether to update an earlier result, route a correction, or recompute from retained events.</Callout>
      <Divider />

      <Chapter n="03" title="A Kafka-to-Flink Job" subtitle="The example uses line-delimited order records: region,amountCents,eventTimeEpochMs." />
      <P>Use a dedicated input topic and consumer group for the job. The source should preserve the event timestamp so Flink can assign timestamps before windowing. The example uses tuples to keep parsing visible; production events should use a versioned schema and a serializer such as Avro or Protobuf where appropriate.</P>
      <CodeBlock title="Java — Kafka source, event-time windows, and Kafka sink">{`import java.time.Duration;
import java.util.Objects;
import org.apache.flink.api.common.eventtime.WatermarkStrategy;
import org.apache.flink.api.common.functions.AggregateFunction;
import org.apache.flink.api.common.serialization.SimpleStringSchema;
import org.apache.flink.api.java.tuple.Tuple3;
import org.apache.flink.connector.base.DeliveryGuarantee;
import org.apache.flink.connector.kafka.sink.KafkaRecordSerializationSchema;
import org.apache.flink.connector.kafka.sink.KafkaSink;
import org.apache.flink.connector.kafka.source.KafkaSource;
import org.apache.flink.connector.kafka.source.enumerator.initializer.OffsetsInitializer;
import org.apache.flink.streaming.api.datastream.DataStream;
import org.apache.flink.streaming.api.environment.StreamExecutionEnvironment;
import org.apache.flink.streaming.api.functions.windowing.ProcessWindowFunction;
import org.apache.flink.streaming.api.windowing.assigners.TumblingEventTimeWindows;
import org.apache.flink.streaming.api.windowing.time.Time;
import org.apache.flink.streaming.api.windowing.windows.TimeWindow;
import org.apache.flink.util.Collector;

public class RegionRevenueJob {
  public static void main(String[] args) throws Exception {
    String brokers = Objects.requireNonNull(
        System.getenv("KAFKA_BOOTSTRAP_SERVERS"));
    StreamExecutionEnvironment env =
        StreamExecutionEnvironment.getExecutionEnvironment();
    env.enableCheckpointing(60_000);

    KafkaSource<String> source = KafkaSource.<String>builder()
        .setBootstrapServers(brokers).setTopics("orders")
        .setGroupId("region-revenue-v1")
        .setStartingOffsets(OffsetsInitializer.earliest())
        .setValueOnlyDeserializer(new SimpleStringSchema()).build();
    DataStream<String> lines = env.fromSource(source,
        WatermarkStrategy.<String>forBoundedOutOfOrderness(Duration.ofSeconds(20))
            .withTimestampAssigner((line, previous) ->
                Long.parseLong(line.split(",")[2])), "orders-source");

    DataStream<Tuple3<String, Long, Long>> orders = lines.map(line -> {
      String[] f = line.split(",");
      return Tuple3.of(f[0], Long.parseLong(f[1]), Long.parseLong(f[2]));
    }).filter(order -> order.f1 > 0);

    DataStream<String> totals = orders.keyBy(order -> order.f0)
        .window(TumblingEventTimeWindows.of(Time.minutes(5)))
        .aggregate(new AggregateFunction<Tuple3<String, Long, Long>, Long, Long>() {
          public Long createAccumulator() { return 0L; }
          public Long add(Tuple3<String, Long, Long> order, Long total) {
            return total + order.f1;
          }
          public Long getResult(Long total) { return total; }
          public Long merge(Long left, Long right) { return left + right; }
        }, new ProcessWindowFunction<Long, String, String, TimeWindow>() {
          public void process(String region, Context context, Iterable<Long> values,
                              Collector<String> out) {
            long total = values.iterator().next();
            out.collect(region + "," + context.window().getStart() + "," +
                context.window().getEnd() + "," + total);
          }
        });

    KafkaSink<String> sink = KafkaSink.<String>builder()
        .setBootstrapServers(brokers)
        .setRecordSerializer(KafkaRecordSerializationSchema.builder()
            .setTopic("region-revenue-5m")
            .setValueSerializationSchema(new SimpleStringSchema()).build())
        .setDeliveryGuarantee(DeliveryGuarantee.AT_LEAST_ONCE).build();
    totals.sinkTo(sink);
    env.execute("region-revenue");
  }
}`}</CodeBlock>
      <P>Build this example with the Kafka source and sink connector artifacts compatible with the Flink release you deploy; connector artifacts are separate from some Flink distributions. The parser assumes clean CSV for teaching. A production job should use a schema-aware format and route malformed records to a recoverable side output. The sink is explicitly at-least-once, so downstream consumers must handle retries idempotently.</P>
      <Callout title="Do not confuse output aggregation with an upsert" tone="orange">The reduce operation emits updated window results as the window progresses. A downstream table or dashboard must know whether each output is an update for a key/window or a new additive fact. Include a deterministic key and window boundaries in the output contract.</Callout>
      <Divider />

      <Chapter n="04" title="State and Checkpoints Make Recovery Possible" />
      <P>State is the information a job keeps between records: a running total for each key, a deduplication set, or a partial join buffer. Flink partitions state with the computation so tasks can process many keys in parallel. State grows with key cardinality and retention, so a seemingly small aggregation can become a storage problem when keys never expire.</P>
      <P>Checkpointing periodically captures a consistent snapshot of operator state and source progress. After a failure, Flink can restore a checkpoint and resume from corresponding source positions. For Kafka, this works best when the job has stable source identity, a configured checkpoint storage location, and a sink whose delivery semantics match the recovery model. Checkpoints are not backups of every external system and do not automatically make arbitrary side effects exactly once.</P>
      <CodeBlock title="Operational configuration sketch">{`// Configure before submitting the job; choose durable storage for checkpoints.
env.enableCheckpointing(60_000);
env.getCheckpointConfig().setCheckpointTimeout(30_000);

// Conceptual production checklist:
// - durable checkpoint storage accessible to the job after restart
// - Kafka source group and topic retention sized for recovery
// - sink delivery guarantee and transactional settings reviewed
// - restart policy, parallelism, and state backend tested under failure`}</CodeBlock>
      <P>The numbers above are illustrative starting points, not universal tuning values. Measure checkpoint duration, alignment time, state size, backpressure, consumer lag, and recovery time with representative data. Tune the interval against the freshness objective and the cost of replay.</P>
      <Divider />

      <Chapter n="05" title="Choose the Right Output and Delivery Contract" />
      <P>A stream job may write an enriched event, a continuously updated aggregate, or a correction event. Those are different contracts. For an order pipeline, one topic can preserve normalized order facts while a separate topic carries the region-and-window aggregate. If consumers require upsert or compaction semantics, also set the Kafka record key to the region/window identity. Make the key, schema, and update semantics explicit so readers do not sum replacement values twice.</P>
      <Table headers={['Design decision', 'Why it matters', 'Production check']} rows={[
        ['Input offset policy', 'Earliest replays retained history; latest starts from new records.', 'Document bootstrap and recovery behavior.'],
        ['Event-time delay', 'More delay can capture late events but increases result latency.', 'Use observed lateness and business tolerance.'],
        ['State retention', 'Longer state supports deduplication and joins but costs more.', 'Bound state and test cleanup behavior.'],
        ['Sink semantics', 'At-least-once can produce duplicates after retries.', 'Make consumers idempotent or configure transactional output.'],
      ]} />
      <Callout title="Exactly-once has a boundary" tone="green">Flink checkpoints can coordinate source progress and supported sink transactions, but a database write, email, or payment call outside that transaction is not magically covered. Use idempotency keys, an outbox, or an explicitly designed transactional sink for external effects.</Callout>
      <Divider />

      <Chapter n="06" title="Common Mistakes and Debugging" />
      <BulletList items={[
        'Using processing time for a business question defined by when the event occurred; fix it by carrying and validating event timestamps.',
        'Setting an arbitrary watermark delay; inspect lateness distributions and test the tradeoff with replayed data.',
        'Keeping unbounded state for every key; define state TTL or window boundaries and monitor state growth.',
        'Treating checkpoints as a substitute for sink idempotency; test duplicate behavior after a forced restart.',
        'Ignoring backpressure; inspect busy time, checkpoint health, source lag, and sink throughput together.',
      ]} />
      <CodeBlock title="A focused incident checklist">{`1. Is the job running, restarting, or stuck in a failing checkpoint?
2. Is Kafka source lag growing, and is it isolated to one partition?
3. Are watermarks advancing on every active input?
4. Is one key skewed and creating a hot task?
5. Is the sink slow, throttled, or rejecting records?
6. Can the job restore the latest checkpoint in the target environment?`}</CodeBlock>
      <Divider />

      <Chapter n="07" title="Practice and Takeaways" />
      <P>Use a local Kafka cluster or a disposable test environment. Keep real customer data out of sample topics; synthetic orders are enough to test parsing, windows, restart behavior, and output contracts.</P>
      <BulletList items={[
        'Create a synthetic order stream with event timestamps arriving out of order. Explain which five-minute window receives each event.',
        'Change the watermark delay and compare result latency with the number of late events.',
        'Add a malformed record path and record the topic, partition, offset, and parse error for each rejected event.',
        'Force a job restart and verify that outputs are not double-counted by a downstream consumer.',
        'Compare the same simple aggregation in Kafka Streams and Flink. Write down operational and feature tradeoffs for your workload.',
      ]} />
      <KeyTakeaways items={[
        'Kafka stores and distributes event logs; Flink executes distributed, stateful computations over them.',
        'Event time, watermarks, and windows define how late and reordered events affect results.',
        'Stateful jobs need bounded state, checkpoints, and a tested recovery path.',
        'Output keys and update semantics are part of the public data contract.',
        'Exactly-once claims must name the source, state, sink, and external-effect boundaries.',
      ]} />
    </LearnLayout>
  )
}
