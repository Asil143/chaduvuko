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

export default function TestingDebuggingKafka() {
  return (
    <LearnLayout
      title="Testing and Debugging Kafka Systems"
      description="Why Kafka-dependent code is hard to test, unit testing producer/consumer logic by mocking the client, integration testing with Testcontainers, testing Kafka Streams topologies with TopologyTestDriver, schema contract testing, and the exact steps to diagnose the most common production symptoms."
      section="Apache Kafka — Module 23"
      readTime="60 min"
      updatedAt="September 2026"
      breadcrumbs={[
        { label: 'Learn', href: '/learn' },
        { label: 'Apache Kafka', href: '/learn/apache-kafka' },
        { label: 'Testing and Debugging Kafka Systems', href: '/learn/apache-kafka/testing-debugging' },
      ]}
      prev={{ title: 'Managed Kafka and Cloud Choices', href: '/learn/apache-kafka/managed-kafka-cloud' }}
      next={{ title: 'Kafka Interview and System Design Guide', href: '/learn/apache-kafka/kafka-interview-system-design' }}
    >
      {/* ── Part 01 ─────────────────────────────────────────────────── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 01 — Why Kafka Code Is Hard to Test" />
        <SectionTitle>Why Testing Kafka-Dependent Code Is Harder Than Testing a Plain Function</SectionTitle>
        <Para>
          A pure function is trivial to test: call it with inputs, assert on the output, done. Code that
          talks to Kafka breaks that model in three separate ways at once. It is <strong>asynchronous</strong> —
          a produced record is not guaranteed to be readable the instant <code>produce()</code> returns,
          so a naive test that produces then immediately asserts on consumer output is a race condition
          disguised as a test. It is <strong>distributed</strong> — the behavior you actually care about
          (partition assignment, rebalances, replication, offset commits) only exists when there is a real
          broker coordinating multiple parties, not inside a single process. And it <strong>needs a
          realistic broker</strong> to exercise correctly — mocking the wire protocol yourself reproduces
          bugs Kafka itself does not have, and misses ones it does.
        </Para>
        <Para>
          This module treats testing as a spectrum rather than a single technique, because no single
          technique covers everything worth testing. At one end is fast, isolated unit testing of your own
          business logic with the Kafka client mocked out entirely — cheap, instant, and blind to anything
          Kafka-specific. At the other end is a full integration test against a real broker running in
          Docker — slower, but the only way to catch bugs in partitioning, serialization wire format, or
          consumer group rebalancing. In between sits topology testing for Kafka Streams, which gets you
          Kafka Streams' actual processing semantics without a broker at all, and contract testing, which
          catches schema-compatibility breakage before it ever reaches a shared topic.
        </Para>
        <HighlightBox>
          <Para>
            <strong>The rule of thumb this module builds toward:</strong> test your transformation and
            business logic with mocks — fast feedback, run on every commit. Test your actual
            producer/consumer wiring, partitioning, and serialization against a real ephemeral broker via
            Testcontainers — slower, run in CI before merge. Test Kafka Streams topologies with
            <code>TopologyTestDriver</code> — fast and broker-free, but only for stream-processing logic.
            Test schema changes against the Schema Registry's compatibility API before deploy — catches a
            whole category of production incident that no amount of unit testing would ever surface.
          </Para>
        </HighlightBox>
        <Table
          headers={['Technique', 'What it actually tests', 'Speed', 'Needs a broker?']}
          rows={[
            ['Mocked producer/consumer unit tests', 'Your own business logic in isolation — the transformation, validation, and routing code you wrote.', 'Milliseconds', 'No'],
            ['Testcontainers integration tests', 'The real end-to-end path — serialization, partitioning, consumer group behavior, actual broker responses.', 'Seconds, sometimes tens of seconds', 'Yes — a real, ephemeral one'],
            ['TopologyTestDriver', 'Kafka Streams topology logic — joins, aggregations, windowing, state stores.', 'Milliseconds', 'No — simulated in-process'],
            ['Schema Registry contract tests', 'Whether a proposed schema change is safe to deploy without breaking existing producers or consumers.', 'Seconds — an HTTP call to the registry', 'No, but needs a registry'],
          ]}
        />
      </section>

      <Divider />

      {/* ── Part 02 ─────────────────────────────────────────────────── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 02 — Unit Testing With a Mocked Client" />
        <SectionTitle>Unit Testing Producer and Consumer Logic by Mocking the Kafka Client</SectionTitle>
        <Para>
          The single most valuable testing habit for Kafka-dependent services is separating "code that
          talks to Kafka" from "code that decides what to do with the data." If your order-validation
          logic is buried inside a function that also calls <code>consumer.poll()</code> directly, you
          cannot test the validation logic without also standing up a broker. If you extract the
          validation logic into its own function that takes a plain Python dict or a deserialized object
          and returns a result, you can test it with zero Kafka dependency at all — and that is most of
          what actually needs testing on every commit.
        </Para>
        <SubTitle>Structuring code so the Kafka client is a thin, mockable boundary</SubTitle>
        <Para>
          The pattern is: a thin adapter layer owns the actual <code>Producer</code>/<code>Consumer</code>
          client objects and nothing else. Everything with real logic — parsing, validating, enriching,
          deciding what to produce next — lives in plain functions or classes that take and return normal
          data structures, never a Kafka client object. The adapter layer is what you mock in unit tests;
          the logic layer is what you actually assert against.
        </Para>
        <CodeBox label="separating Kafka plumbing from business logic — the pattern">
{`# order_processor.py — pure logic, zero Kafka imports
def validate_and_price(order: dict) -> dict:
    if order.get("quantity", 0) <= 0:
        raise ValueError(f"invalid quantity: {order.get('quantity')}")
    unit_price = get_unit_price(order["sku"])          # some lookup, not Kafka
    return {**order, "total_cents": unit_price * order["quantity"]}

# consumer_service.py — thin adapter, owns the Kafka client only
from order_processor import validate_and_price

def run_consumer_loop(consumer, producer, output_topic):
    for msg in consumer:
        order = deserialize(msg.value())
        priced = validate_and_price(order)               # <- the part worth unit testing
        producer.produce(output_topic, value=serialize(priced))
        consumer.commit()`}
        </CodeBox>
        <Para>
          <code>validate_and_price</code> above needs no mock at all — it is a plain function, tested with
          plain dicts. The value of mocking shows up one layer up, when you want to verify that
          <code>run_consumer_loop</code> correctly wires deserialization, the logic call, serialization,
          production, and commit ordering together — without needing a real broker to do it.
        </Para>
        <CodeBox label="mocking the producer and consumer to test the wiring, not the broker">
{`from unittest.mock import MagicMock, call

def test_consumer_loop_produces_priced_order_and_commits():
    fake_message = MagicMock()
    fake_message.value.return_value = b'{"sku": "P100", "quantity": 3}'

    mock_consumer = MagicMock()
    mock_consumer.__iter__.return_value = iter([fake_message])

    mock_producer = MagicMock()

    run_consumer_loop(mock_consumer, mock_producer, "orders.priced")

    # Assert the producer was called with the right topic and a correctly priced payload
    args, kwargs = mock_producer.produce.call_args
    assert kwargs["topic"] == "orders.priced" if "topic" in kwargs else args[0] == "orders.priced"
    assert b'"total_cents"' in kwargs.get("value", args[1] if len(args) > 1 else b"")

    # Assert the offset was committed exactly once, after the produce call
    mock_consumer.commit.assert_called_once()`}
        </CodeBox>
        <Para>
          Notice what this test does <em>not</em> prove: it does not prove your consumer will actually be
          assigned the right partitions, that your serializer produces bytes a real Avro/JSON deserializer
          on the other end can read, or that your commit strategy survives a real rebalance. Those are
          integration-test concerns, covered in Part 03. What this test does prove, cheaply and
          repeatably, on every commit: the loop calls the logic function correctly, routes the result to
          the right topic, and commits only after producing — exactly the kind of wiring bug that is easy
          to introduce during a refactor and easy to miss in code review.
        </Para>
        <Callout title="Mock the client, not your own logic" color={K}>
          A common anti-pattern is mocking so aggressively that the test only checks that mocked functions
          were called with mocked arguments, proving nothing about actual behavior. Keep the boundary
          narrow: mock the Kafka client objects (network, brokers, offsets) because those are genuinely
          expensive and non-deterministic to run for real in a unit test. Never mock your own business
          logic — that is the part the test exists to verify.
        </Callout>
      </section>

      <Divider />

      {/* ── Part 03 ─────────────────────────────────────────────────── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 03 — Integration Testing With Testcontainers" />
        <SectionTitle>Integration Testing With an Ephemeral, Real Broker via Testcontainers</SectionTitle>
        <Para>
          Mocked unit tests cannot catch bugs in partitioning behavior, actual serialization wire format,
          consumer group rebalancing, or anything that depends on Kafka's real semantics — because a mock,
          by definition, only does what you told it to do. To catch that entire category of bug, you need
          a real broker. The older approach to this was running an embedded Kafka broker inside the same
          JVM process as the test suite (EmbeddedKafka, in the Java ecosystem). It works, but it is
          heavyweight to set up, ties your test infrastructure to the JVM even for non-JVM services, and
          the embedded broker's behavior can drift from what a real, separately-deployed broker does.
        </Para>
        <Para>
          The modern standard is <strong>Testcontainers</strong> — a library that spins up real Docker
          containers for the duration of a test run and tears them down afterward. For Kafka specifically,
          Testcontainers ships an official Kafka module that starts an actual Kafka broker (the real
          binary, running in KRaft mode) in a container, exposes its bootstrap address to your test code,
          and destroys the container when the test finishes. You get a genuinely real broker, isolated per
          test run, with no persistent infrastructure to maintain and no risk of test pollution between
          runs.
        </Para>
        <SubTitle>Why Testcontainers beat embedded-Kafka-in-JVM as the default</SubTitle>
        <Table
          headers={['', 'Embedded Kafka (JVM-in-process)', 'Testcontainers (real broker in Docker)']}
          rows={[
            ['What actually runs', 'A Kafka broker instance running inside your test process\'s own JVM.', 'The real, unmodified Kafka broker binary in its own container.'],
            ['Language/runtime coupling', 'Effectively Java/Scala-only — awkward or impossible from Python, Go, Node services.', 'Works from any language — the test process just needs a Kafka client and a Docker daemon.'],
            ['Fidelity to production', 'Close, but subtle differences in networking and process isolation can mask real bugs.', 'High — it is the same broker image you would run in production, just ephemeral.'],
            ['Startup cost', 'Fast — no container overhead.', 'A few seconds per test run to pull and start the container (cacheable across a suite).'],
            ['Isolation between test runs', 'Requires care — shared JVM state can leak between tests if not reset.', 'Strong by default — a fresh container per test class/module, torn down after.'],
          ]}
        />
        <CodeBox label="a Testcontainers-backed integration test — Python, pytest">
{`import json
import pytest
from testcontainers.kafka import KafkaContainer
from confluent_kafka import Producer, Consumer

@pytest.fixture(scope="module")
def kafka_bootstrap():
    with KafkaContainer("confluentinc/cp-kafka:7.6.0") as kafka:
        yield kafka.get_bootstrap_server()

def test_order_flows_through_real_broker(kafka_bootstrap):
    producer = Producer({"bootstrap.servers": kafka_bootstrap})
    consumer = Consumer({
        "bootstrap.servers": kafka_bootstrap,
        "group.id": "test-group",
        "auto.offset.reset": "earliest",
    })
    consumer.subscribe(["orders.raw"])

    producer.produce("orders.raw", key="C42", value=json.dumps({"sku": "P100", "quantity": 2}))
    producer.flush()

    msg = consumer.poll(timeout=10.0)
    assert msg is not None and msg.error() is None
    payload = json.loads(msg.value())
    assert payload["sku"] == "P100"`}
        </CodeBox>
        <Para>
          Because this test drives an actual broker, it exercises real partition assignment, real
          serialization bytes on the wire, and a real consumer group joining and receiving an assignment —
          none of which a mock can meaningfully simulate. The trade-off is speed: this test takes seconds,
          not milliseconds, largely dominated by container startup. The usual pattern is to scope the
          container fixture to the whole test module or session (as above, with
          <code>scope="module"</code>) so the cost of starting the broker is paid once, not once per test
          function.
        </Para>
        <Callout title="What to actually put in Testcontainers tests" color="#22c55e">
          Do not try to re-test every branch of your business logic against a real broker — that is what
          the fast mocked unit tests from Part 02 are for. Reserve Testcontainers tests for the things only
          a real broker can prove: that your producer's partitioning key lands records where you expect,
          that your consumer group correctly rebalances when a second consumer joins, that your actual
          serializer/deserializer pair round-trips real bytes correctly, and that your end-to-end
          produce-then-consume path works with real timing, not a mocked instant callback.
        </Callout>
      </section>

      <Divider />

      {/* ── Part 04 ─────────────────────────────────────────────────── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 04 — Testing Kafka Streams Topologies" />
        <SectionTitle>Testing Kafka Streams Topologies With TopologyTestDriver</SectionTitle>
        <Para>
          Kafka Streams topologies — the KStream/KTable pipelines covered in the stream-processing module —
          present a distinct testing problem. A topology can contain joins, windowed aggregations, and
          stateful transformations, and you want to verify that logic is correct without paying the cost
          of a real broker and real wall-clock time for windows to close. <code>TopologyTestDriver</code>
          solves exactly this: it runs your actual topology definition against simulated input and output
          topics, entirely in-process, with full control over simulated time — no broker, no Docker, no
          waiting for a real window to elapse.
        </Para>
        <Para>
          The key idea is that <code>TopologyTestDriver</code> does not fake Kafka Streams' processing
          logic — it runs the real topology code, the same <code>Topology</code> object you would deploy
          to production. What it fakes is the I/O boundary: instead of reading from and writing to real
          Kafka topics over the network, it reads from and writes to in-memory test topics you control
          directly, and instead of relying on real clock time for windowing, you advance a simulated clock
          explicitly in the test.
        </Para>
        <CodeBox label="testing a windowed aggregation topology with TopologyTestDriver">
{`from confluent_kafka import TopicPartition
# (Java/Scala shown here — the canonical TopologyTestDriver API; the concept
#  is identical whatever language wraps Kafka Streams' JVM core)

StreamsBuilder builder = new StreamsBuilder();
builder.stream("orders.raw", Consumed.with(Serdes.String(), orderSerde))
    .groupByKey()
    .windowedBy(TimeWindows.of(Duration.ofMinutes(5)))
    .count()
    .toStream()
    .to("orders.count.5min", Produced.with(WindowedSerdes.timeWindowedSerdeFrom(String.class), Serdes.Long()));

Topology topology = builder.build();

try (TopologyTestDriver driver = new TopologyTestDriver(topology, props)) {
    TestInputTopic<String, Order> input = driver.createInputTopic(
        "orders.raw", new StringSerializer(), orderSerializer);
    TestOutputTopic<Windowed<String>, Long> output = driver.createOutputTopic(
        "orders.count.5min", new StringDeserializer(), new LongDeserializer());

    input.pipeInput("C42", order1, Instant.parse("2026-09-11T10:00:00Z"));
    input.pipeInput("C42", order2, Instant.parse("2026-09-11T10:02:00Z"));

    // Advance simulated time past the 5-minute window boundary explicitly —
    // no real waiting, the test controls the clock
    input.pipeInput("C42", order3, Instant.parse("2026-09-11T10:06:00Z"));

    KeyValue<Windowed<String>, Long> result = output.readKeyValue();
    assertEquals(2L, result.value);  // orders 1 and 2 fell in the same 5-minute window
}`}
        </CodeBox>
        <Para>
          This runs in milliseconds because nothing about it touches a network, a disk, or a real clock.
          You get deterministic control over exactly when a window closes, which is essential for testing
          windowing edge cases (a record arriving right at the boundary, a late-arriving record after
          grace period expiry) that would be painfully flaky to test against real wall-clock time.
        </Para>
        <Callout title="TopologyTestDriver tests the topology, not the deployment" color={K}>
          A passing <code>TopologyTestDriver</code> suite proves your joins, aggregations, and windowing
          logic are correct. It does not prove your state stores are configured with the right changelog
          topic replication, that your app correctly recovers state after a restart against a real broker,
          or that your Streams app handles a real rebalance cleanly — those still belong in a
          Testcontainers-backed integration test, same as any other Kafka client.
        </Callout>
      </section>

      <Divider />

      {/* ── Part 05 ─────────────────────────────────────────────────── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 05 — Contract Testing for Schemas" />
        <SectionTitle>Contract Testing — Validating Schema Changes Against the Registry Before Deploy</SectionTitle>
        <Para>
          The schemas-and-serialization module covered how the Schema Registry enforces compatibility
          rules (backward, forward, or full) so a producer's schema change cannot silently break a
          consumer that has not been updated yet. Contract testing takes that enforcement and moves it
          earlier — from "the registry rejects a bad schema at deploy time in production" to "CI catches
          the same rejection on every pull request, before it ever reaches a shared environment."
        </Para>
        <Para>
          The mechanism is the Schema Registry's own compatibility-check API, which you can call from CI
          without actually registering the new schema. You submit the candidate schema against a subject
          (a topic's registered schema name) and the registry evaluates it against the currently
          configured compatibility mode and returns whether it is compatible — the exact same check the
          registry would perform if you tried to register it for real, but without side effects.
        </Para>
        <CodeBox label="a CI step that checks schema compatibility before merge">
{`#!/usr/bin/env bash
# ci/check-schema-compatibility.sh
# Fails the build if the candidate schema breaks compatibility for the subject

SUBJECT="orders.raw-value"
REGISTRY_URL="https://schema-registry.internal:8081"

curl -s -X POST \\
  -H "Content-Type: application/vnd.schemaregistry.v1+json" \\
  --data "{\\"schema\\": $(jq -Rs . < schemas/orders.raw.avsc)}" \\
  "$REGISTRY_URL/compatibility/subjects/$SUBJECT/versions/latest" \\
  | tee /tmp/compat-result.json

IS_COMPATIBLE=$(jq -r '.is_compatible' /tmp/compat-result.json)

if [ "$IS_COMPATIBLE" != "true" ]; then
  echo "Schema change is NOT compatible with subject $SUBJECT — failing build."
  exit 1
fi

echo "Schema change is compatible. Proceeding."`}
        </CodeBox>
        <Para>
          Wired into a pull-request CI pipeline, this turns a category of incident that used to surface as
          a production deserialization failure — a downstream consumer suddenly throwing exceptions on
          every message because a field it depends on was removed — into a failed CI check on the PR that
          introduced the change, with a clear, actionable error message, days before it would otherwise
          have shipped.
        </Para>
        <SubTitle>What contract testing does not catch</SubTitle>
        <Para>
          Compatibility-mode enforcement catches structural breakage — removing a required field, changing
          a field's type incompatibly, removing an enum value a consumer still switches on. It does not
          catch semantic breakage: a schema-compatible change that is nonetheless wrong, like renaming
          <code>total_cents</code> to <code>total_amount_cents</code> while keeping the same type (fully
          compatible from the registry's point of view if you also keep the old field as an alias) but
          silently changing what downstream consumers actually compute from it. Contract testing is a
          necessary layer, not a complete substitute for reviewing what a schema change actually means.
        </Para>
        <Callout title="Run this on every PR that touches a schema file, not just before a major release" color="#22c55e">
          Teams that only check compatibility manually before a big migration miss the much more common
          case: a small, well-intentioned field change in a routine PR that quietly breaks one consumer
          nobody thought to check. Automating this check in CI, gated on any diff to a schema file, catches
          both the big migrations and the small everyday changes with the same mechanism.
        </Callout>
      </section>

      <Divider />

      {/* ── Part 06 ─────────────────────────────────────────────────── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 06 — Debugging: Consumer Isn't Receiving Messages" />
        <SectionTitle>Diagnosing &quot;My Consumer Isn&apos;t Receiving Any Messages&quot;</SectionTitle>
        <Para>
          This is the single most common Kafka support ticket, and it almost always has a small, mechanical
          root cause once you check things in the right order rather than guessing. Work through the
          checklist below in sequence — each step rules out an entire category of cause before you move to
          the next.
        </Para>
        <SubTitle>Step 1 — confirm messages are actually landing on the topic at all</SubTitle>
        <Para>
          Before suspecting the consumer, rule out the producer side entirely. Use the CLI consumer to
          check the topic directly, independent of your application's consumer code.
        </Para>
        <CodeBox label="checking whether anything is actually on the topic">
{`kafka-console-consumer.sh \\
  --bootstrap-server localhost:9092 \\
  --topic orders.raw \\
  --from-beginning \\
  --max-messages 5`}
        </CodeBox>
        <Output>{`No output after 30+ seconds and no timeout error
-> messages genuinely are not landing on this topic; go check the producer, not the consumer`}</Output>
        <Para>
          If the CLI consumer sees nothing, your consumer code was never the problem — go debug the
          producer (is it actually calling <code>produce()</code>, is it catching and swallowing an
          exception, is it pointed at the wrong topic name or the wrong cluster entirely). If the CLI
          consumer <em>does</em> see messages, the problem is specifically in your application's consumer,
          and you move to step 2.
        </Para>
        <SubTitle>Step 2 — check group.id and subscription</SubTitle>
        <Para>
          A consumer group's committed offset is scoped to the exact <code>group.id</code> string. A typo,
          an environment-variable that resolved differently than expected, or an accidental
          copy-paste from another service are extremely common causes — the consumer connects fine, joins
          a group fine, and simply never receives anything because it subscribed under a
          <code>group.id</code> nobody is producing an assignment worth reading for, or because the topic
          name it subscribed to does not match the topic name being produced to (a trailing environment
          suffix like <code>-staging</code> is a classic culprit).
        </Para>
        <CodeBox label="checking what a consumer group is actually assigned and committed to">
{`kafka-consumer-groups.sh --bootstrap-server localhost:9092 \\
  --describe --group order-processing-group`}
        </CodeBox>
        <Output>{`GROUP                  TOPIC         PARTITION  CURRENT-OFFSET  LOG-END-OFFSET  LAG
order-processing-group orders.raw    0          182391          182391          0
order-processing-group orders.raw    1          177204          177204          0`}</Output>
        <Para>
          If this command shows no rows for your group at all, the group has never committed anything for
          that topic — either it has never successfully subscribed, or it is a brand-new group with
          nothing consumed yet. If it shows rows with a healthy assignment and zero lag, the consumer group
          mechanics are fine and the bug is almost certainly in what your application does with the
          records after receiving them (silently swallowing an exception before it logs anything, for
          example).
        </Para>
        <SubTitle>Step 3 — check partition assignment specifically</SubTitle>
        <Para>
          If <code>--describe</code> shows the group exists but a specific partition is missing from the
          assignment, or the group has more members than the topic has partitions, some consumers in the
          group are sitting idle by design — Kafka never assigns more than one consumer per partition
          within a group, so a group with 8 consumers on a 4-partition topic always has 4 idle members. If
          this is unexpected, it usually means the topic's partition count is lower than assumed, or a
          recent repartitioning was not communicated to whoever is running the consumer fleet.
        </Para>
        <Table
          headers={['Symptom', 'Likely cause']}
          rows={[
            ['CLI consumer sees nothing on the topic at all', 'Producer-side issue — not a consumer bug. Check producer logs, config, and target topic name.'],
            ['CLI consumer sees messages, application consumer sees none', 'Wrong group.id, wrong topic name, or an unhandled connection/auth failure the app is swallowing silently.'],
            ['Consumer group shows in --describe with zero lag but the app does nothing', 'Records are being received — the bug is in application logic after poll(), not in Kafka plumbing.'],
            ['Some consumers in the group are permanently idle', 'More consumers than partitions — expected behavior, not a bug, unless partition count is unexpectedly low.'],
          ]}
        />
      </section>

      <Divider />

      {/* ── Part 07 ─────────────────────────────────────────────────── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 07 — Debugging: Producer send() Is Hanging" />
        <SectionTitle>Diagnosing &quot;producer.send() Is Hanging&quot;</SectionTitle>
        <Para>
          A producer that appears to freeze on <code>send()</code> (or on <code>flush()</code>, or on the
          future/callback never resolving) almost always traces to one of three causes, and they are
          diagnosable in order of likelihood rather than by guesswork.
        </Para>
        <SubTitle>Cause 1 — metadata fetch is failing</SubTitle>
        <Para>
          Before a producer can send its first record to a topic, it must fetch metadata (which brokers
          lead which partitions) for that topic, as covered in the producers-and-brokers module. If the
          producer cannot reach any broker in <code>bootstrap.servers</code> at all, or the topic does not
          exist and auto-creation is disabled, the metadata fetch itself blocks — and depending on client
          configuration, that block can look identical to <code>send()</code> hanging, because the send is
          queued behind a metadata fetch that never completes.
        </Para>
        <CodeBox label="checking whether metadata is even reachable, independent of your application">
{`kafka-topics.sh --bootstrap-server localhost:9092 --describe --topic orders.raw`}
        </CodeBox>
        <Output>{`Error while executing topic command: Topic 'orders.raw' does not exist as expected
[2026-09-11 14:02:11] ERROR org.apache.kafka.common.errors.UnknownTopicOrPartitionException`}</Output>
        <Para>
          If the topic genuinely does not exist and your cluster has <code>auto.create.topics.enable</code>
          set to false (the correct production setting), the producer will sit retrying the metadata fetch
          for up to <code>max.block.ms</code> before finally raising a timeout — which, if
          <code>max.block.ms</code> is left at a high default, looks a great deal like an indefinite hang
          rather than a clear, fast error.
        </Para>
        <SubTitle>Cause 2 — max.block.ms is set too high, masking a real failure as a hang</SubTitle>
        <Para>
          <code>max.block.ms</code> bounds how long a call like <code>send()</code> will block waiting for
          metadata to become available or for buffer space to free up, before finally raising an exception.
          A high or default value (60 seconds in many clients) is often mistaken for "the producer is
          broken" when it is actually working as configured — it just has not yet reached the point where
          it gives up and tells you why. Lowering it in a debugging session (never permanently, without
          understanding the trade-off) turns a mysterious multi-minute hang into a fast, clear exception
          that names the actual underlying problem.
        </Para>
        <CodeBox label="temporarily lowering max.block.ms to surface the real error fast">
{`# Debugging config, not a production default:
producer = Producer({
    "bootstrap.servers": "broker:9092",
    "max.block.ms": 5000,   # fail fast in 5s instead of blocking up to 60s
})

# Now instead of a mysterious hang, you get within 5 seconds:
# KafkaException: Failed to update metadata after 5000 ms
# -> immediately actionable: go check broker reachability or topic existence`}
        </CodeBox>
        <SubTitle>Cause 3 — network or broker reachability is the root cause underneath both of the above</SubTitle>
        <Para>
          Both of the causes above are usually symptoms of a simpler underlying problem: the producer
          genuinely cannot reach any broker, whether from a firewall rule, a DNS resolution failure inside
          a container network, a broker that is up but not accepting new connections because it is
          overloaded, or TLS/SASL credentials that are silently rejected rather than cleanly erroring.
          Confirming basic reachability first, before chasing client-config theories, saves the most time.
        </Para>
        <CodeBox label="the fastest possible reachability check, before touching any client config">
{`nc -zv broker-1.internal 9092
# Connection to broker-1.internal 9092 port [tcp/*] succeeded!
#   -> network path is fine; the problem is almost certainly auth, topic config, or client settings

nc -zv broker-1.internal 9092
# nc: connect to broker-1.internal port 9092 (tcp) failed: Connection timed out
#   -> network/firewall issue; stop debugging client config until this is fixed`}
        </CodeBox>
        <Callout title="Diagnose in this order, every time" color={K}>
          Reachability first (can the network even reach a broker at all), then metadata (does the topic
          exist and is a leader known), then client-side timeouts (is <code>max.block.ms</code> masking a
          real error as a slow hang). Debugging client configuration before confirming basic reachability
          is the single most common way engineers waste an hour on what turns out to be a firewall rule.
        </Callout>
      </section>

      <Divider />

      {/* ── Part 08 ─────────────────────────────────────────────────── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 08 — Debugging: Duplicate Records Downstream" />
        <SectionTitle>Diagnosing &quot;Duplicate Records Downstream&quot;</SectionTitle>
        <Para>
          Duplicate records reaching a downstream system are almost always explained by one of the exact
          mechanisms covered in the delivery-semantics module, and the fix depends entirely on identifying
          which one is actually at fault — treating every duplicate-records ticket the same way (usually
          "just add idempotence somewhere") wastes time chasing the wrong layer.
        </Para>
        <SubTitle>Check 1 — is producer-side idempotence actually enabled?</SubTitle>
        <Para>
          The first, cheapest check: confirm <code>enable.idempotence=true</code> is actually set on the
          producer that writes to the topic in question. Without it, a lost acknowledgement followed by a
          safe client-side retry writes the same logical record twice at the broker level, before a
          consumer is even involved. This is the easiest duplicate source to rule out and the easiest to
          fix — a one-line config change with no downstream code impact.
        </Para>
        <SubTitle>Check 2 — consumer commit timing relative to processing</SubTitle>
        <Para>
          If idempotence is already enabled and duplicates persist, the far more common real cause is
          consumer-side: the consumer processes a record (writes to a database, calls a downstream API,
          sends a notification) and then crashes or gets rebalanced away <em>before</em> committing the
          offset for that record. On restart or reassignment, the record is re-delivered from the last
          committed offset — and reprocessed, producing a genuine duplicate side effect, even though Kafka
          itself delivered nothing incorrectly.
        </Para>
        <CodeBox label="the exact commit-timing gap that produces downstream duplicates">
{`t=0    poll() returns order event, offset 4021
t=1    consumer writes the order to the database        <- side effect happens here
t=2    consumer process crashes before commit() runs     <- offset 4021 was never committed
t=restart  consumer resumes from last committed offset, which is still 4020
t=restart  offset 4021 (the same order) is delivered and processed again
           -> the database write from t=1 happens a second time`}
        </CodeBox>
        <Para>
          This is not a bug in Kafka — at-least-once delivery, which is what a consumer gets by committing
          after processing, guarantees a record is never silently lost, at the cost of allowing exactly
          this kind of re-delivery after a crash between processing and committing. The fix, as the
          delivery-semantics module covers, is making the downstream side effect itself idempotent — a
          database write keyed on a unique, stable event ID with an upsert rather than an insert, so
          reprocessing the same record twice produces the same end state rather than two rows.
        </Para>
        <Table
          headers={['Where duplicates originate', 'How to confirm it', 'Fix']}
          rows={[
            ['Producer retries without idempotence', 'Check enable.idempotence on the producer config directly.', 'Set enable.idempotence=true — closes the gap with zero downstream changes.'],
            ['Consumer commits before finishing processing', 'Check commit call placement — is it before or after the side effect completes?', 'Move the commit to after the side effect durably succeeds, or use manual commitSync().'],
            ['Consumer processes then crashes before committing', 'Check consumer restart/rebalance logs around the time duplicates started.', 'Make the downstream side effect idempotent — upsert keyed on a stable event ID, not a plain insert.'],
            ['A genuinely new producer session re-sends the same logical event', 'Check for a producer restart around the time duplicates appeared; idempotence resets per session.', 'Application-level deduplication keyed on event ID — idempotent producer alone does not cover producer restarts.'],
          ]}
        />
      </section>

      <Divider />

      {/* ── Part 09 ─────────────────────────────────────────────────── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 09 — Low-Level Disk Inspection" />
        <SectionTitle>Low-Level Inspection — What Is Actually on Disk</SectionTitle>
        <Para>
          Sometimes the client-level view (offsets, lag, consumer group state) is not enough, and you need
          to look at what is physically written to a partition's log segment on disk — the raw bytes
          Kafka's storage layer actually persisted, including headers, timestamps, compression, and batch
          metadata that never surface through a normal consumer API.
        </Para>
        <SubTitle>kafka-console-consumer.sh — the fast, everyday tool</SubTitle>
        <Para>
          For the vast majority of debugging, <code>kafka-console-consumer.sh</code> is the right tool: it
          reads real records through the normal consumer client and prints their values, which is enough
          to confirm data is landing, check its shape, or spot an obviously malformed payload.
        </Para>
        <CodeBox label="printing keys, values, and a specific offset range">
{`kafka-console-consumer.sh \\
  --bootstrap-server localhost:9092 \\
  --topic orders.raw \\
  --partition 2 \\
  --offset 981200 \\
  --max-messages 3 \\
  --property print.key=true \\
  --property print.partition=true \\
  --property print.offset=true \\
  --property print.timestamp=true`}
        </CodeBox>
        <SubTitle>kafka-dump-log.sh — the low-level tool for what the client API cannot show you</SubTitle>
        <Para>
          When the question is not "what is the record's value" but "what is actually in the segment file
          on disk" — is a batch corrupted, what compression codec was actually used, is a tombstone record
          present, what is the exact byte offset of a given logical offset — <code>kafka-dump-log.sh</code>
          reads the raw <code>.log</code> segment file directly and prints its internal structure, below
          the level any consumer client ever exposes.
        </Para>
        <CodeBox label="dumping a segment file's raw batch and record structure">
{`kafka-dump-log.sh \\
  --files /data/kafka/orders.raw-2/00000000000000981200.log \\
  --print-data-log \\
  --deep-iteration`}
        </CodeBox>
        <Output>{`baseOffset: 981200 lastOffset: 981204 count: 5 baseSequence: 1180 lastSequence: 1184
  producerId: 5001 producerEpoch: 0 partitionLeaderEpoch: 12 isTransactional: false
  isControl: false position: 0 CreateTime: 1757606400123 size: 842 magic: 2
  compresscodec: LZ4 crc: 3821994102 isvalid: true
| offset: 981200 CreateTime: 1757606400123 keySize: 4 valueSize: 156
  key: C4291 payload: {"sku":"P100","quantity":2,"total_cents":3980}`}
        </Output>
        <Para>
          The <code>producerId</code> and <code>baseSequence</code> fields visible here are exactly the
          idempotence bookkeeping described in the broker-internals module — seeing them directly on disk
          is the definitive way to confirm whether a specific batch was written under an idempotent
          producer session, which is otherwise invisible from a normal consumer's point of view.
        </Para>
        <Callout title="Reach for kafka-dump-log.sh rarely, but know it exists" color="#38bdf8">
          Most debugging never needs this tool — consumer-group lag, CLI consumer output, and application
          logs solve the overwhelming majority of incidents. It earns its place for the rare, genuinely
          low-level cases: suspected disk corruption, verifying compaction actually removed old keys, or
          confirming exactly what compression codec and batch structure a producer wrote, when nothing at
          the client-API level can answer the question.
        </Callout>
      </section>

      <Divider />

      {/* ── Part 10 ─────────────────────────────────────────────────── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 10 — Local Reproduction of a Production Bug" />
        <SectionTitle>Building a Local Reproduction Environment for a Production Bug</SectionTitle>
        <Para>
          A production incident report rarely arrives with enough detail to fix blind — "consumers are
          lagging" or "some orders are missing fields" is a starting point, not a diagnosis. The fastest
          path to a real fix is almost always reproducing the exact failure locally, against real Kafka
          behavior, rather than reasoning about it purely from logs and metrics.
        </Para>
        <Para>
          The local-setup-cli module's docker-compose pattern is the right foundation for this — a
          single-broker KRaft-mode Kafka container you can start in seconds — extended with seeded test
          data that reproduces the specific shape of the production problem.
        </Para>
        <CodeBox label="extending the local docker-compose setup with a seed script for bug reproduction">
{`# docker-compose.yml (from the local-setup-cli module, unchanged)
services:
  kafka:
    image: apache/kafka:3.7.0
    ports: ["9092:9092"]
    environment:
      KAFKA_NODE_ID: 1
      KAFKA_PROCESS_ROLES: broker,controller
      KAFKA_LISTENERS: PLAINTEXT://:9092,CONTROLLER://:9093
      KAFKA_ADVERTISED_LISTENERS: PLAINTEXT://localhost:9092

# seed_repro.py — reproduces the exact production shape of the bug
# (e.g. a malformed record that the on-call engineer pulled from the DLQ)
import json
from confluent_kafka import Producer

producer = Producer({"bootstrap.servers": "localhost:9092"})

# The actual malformed payload captured from the production DLQ topic,
# pasted in verbatim rather than guessed at — this is the key step
malformed_from_prod = {
    "sku": "P100",
    "quantity": None,     # <- production incident: null quantity crashed the consumer
}
producer.produce("orders.raw", key="C4291", value=json.dumps(malformed_from_prod))
producer.flush()
print("Seeded the exact production failure case locally.")`}
        </CodeBox>
        <Para>
          The critical discipline here is using the <em>actual</em> payload pulled from the production DLQ
          (Part 08 of the message-brokers-and-queues module covers how DLQ events preserve the original
          record for exactly this purpose), not a guessed-at approximation of what might have caused the
          failure. A guessed reproduction can pass locally while the real bug remains unfixed; the actual
          captured payload either reproduces the failure immediately or proves your working theory about
          the cause is wrong before you spend time on a fix for the wrong problem.
        </Para>
        <Para>
          Once the failure reproduces locally against a real broker, you have a fast, disposable feedback
          loop: run the consumer against the local cluster, watch it fail the same way, fix the code,
          re-run, confirm it now handles the case correctly — all in seconds per iteration, entirely
          disconnected from production, and with the fix validated against the exact case that caused the
          incident before it ever ships.
        </Para>
        <Callout title="Keep reproduction scripts, don't throw them away" color={K}>
          A seed script that reproduces a real production bug is a good candidate to keep as a regression
          test — either promoted into the Testcontainers integration suite from Part 03, or at minimum
          committed alongside the fix so the exact failure case is documented and re-checked automatically
          rather than relying on institutional memory of "we had a null-quantity incident once."
        </Callout>
      </section>

      <Divider />

      {/* ── Part 11 ─────────────────────────────────────────────────── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 11 — CI Pipeline Design for Kafka Services" />
        <SectionTitle>Wiring All Four Testing Layers Into a Single CI Pipeline</SectionTitle>
        <Para>
          Each testing technique covered above has a different cost, and a well-designed CI pipeline runs
          them in increasing order of cost, failing fast on the cheap layers before ever paying for the
          expensive ones. A pull request that breaks basic business logic should fail in seconds from the
          mocked unit tests in Part 02, not minutes later after a Testcontainers integration test has already
          spent time pulling and starting a broker container.
        </Para>
        <CodeBox label="a staged CI pipeline ordering testing layers by cost">
{`stages:
  - name: unit-tests
    run: pytest tests/unit/ -x          # mocked client, Part 02 — seconds
    fail_fast: true

  - name: schema-compatibility
    run: ./ci/check-schema-compatibility.sh   # Part 05 — a few seconds, HTTP only
    fail_fast: true
    only_if: schema files changed in this PR

  - name: streams-topology-tests
    run: ./gradlew test --tests "*TopologyTest"   # Part 04 — no broker, milliseconds
    fail_fast: true

  - name: integration-tests
    run: pytest tests/integration/ --testcontainers  # Part 03 — real broker, tens of seconds
    fail_fast: false   # run all of them even if one fails, for full visibility
    only_if: earlier stages passed

  - name: merge-gate
    requires: [unit-tests, schema-compatibility, streams-topology-tests, integration-tests]`}
        </CodeBox>
        <Para>
          The <code>only_if</code> gating on the schema-compatibility stage is worth calling out
          specifically: running it unconditionally on every PR regardless of whether a schema file changed
          wastes a small amount of CI time on every single PR in the repository, while gating it on "did this
          diff touch a schema file" keeps the fast-path fast for the vast majority of PRs that never touch a
          schema at all, without ever skipping the check on the PRs that actually need it.
        </Para>
        <SubTitle>What belongs in CI versus what stays a manual pre-release check</SubTitle>
        <Para>
          Not everything from this module belongs gated on every PR. Part 10's local-reproduction technique
          is explicitly a manual, incident-driven activity — you would not wire a specific captured production
          bug's reproduction script into the standard PR pipeline forever, though promoting a fixed bug's
          reproduction into the permanent Testcontainers suite, as Part 10's closing callout recommends, is
          exactly how it earns a permanent home in the automated pipeline going forward, rather than living as
          a one-off script nobody remembers to re-run.
        </Para>
        <Table
          headers={['Pipeline stage', 'Runs on', 'Typical duration']}
          rows={[
            ['Mocked unit tests', 'Every PR, every commit', 'Seconds'],
            ['Schema compatibility check', 'Every PR touching a schema file', 'A few seconds'],
            ['TopologyTestDriver tests', 'Every PR touching Streams topology code', 'Milliseconds to low seconds'],
            ['Testcontainers integration tests', 'Every PR, gating merge', 'Tens of seconds to a couple of minutes'],
            ['Manual local reproduction of a specific incident', 'Ad hoc, during an active incident investigation', 'Minutes, one-off, then optionally promoted into the permanent suite'],
          ]}
        />
        <Callout title="A slow integration suite gets skipped, not fixed — keep it fast" color={K}>
          If the Testcontainers suite grows slow enough that engineers start reaching for a
          <code>--skip-integration</code> flag out of habit, the suite has effectively stopped protecting
          anything. Keep integration tests focused on what only a real broker can prove (Part 03's callout),
          push everything else down into the cheaper mocked and topology-driver layers, and treat a growing
          integration suite runtime as a signal to prune, not just to tolerate.
        </Callout>
      </section>

      <Divider />

      {/* ── Part 12 ─────────────────────────────────────────────────── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 12 — Load Testing and Chaos Scenarios" />
        <SectionTitle>Load Testing and Injecting Failure Deliberately, Before Production Does It For You</SectionTitle>
        <Para>
          Everything covered so far verifies correctness under normal operation. A separate, complementary
          discipline is deliberately testing behavior under the conditions that actually cause Kafka
          incidents in production — sustained high load, a broker disappearing mid-write, or a consumer group
          rebalancing under pressure. None of the earlier techniques exercise these conditions by default,
          because a mocked test, a Testcontainers test running a handful of records, and a
          <code>TopologyTestDriver</code> run all execute far below the throughput and failure conditions
          that reveal these bugs.
        </Para>
        <SubTitle>Load testing with a real producer/consumer pair against Testcontainers</SubTitle>
        <Para>
          The same Testcontainers-backed broker from Part 03 can be driven at meaningfully higher throughput
          in a dedicated load test, separate from the fast correctness-focused integration suite that runs on
          every PR. The goal here is different: not "does this produce the right output" but "does throughput
          hold up, does consumer lag stay bounded, does the producer's buffer stay comfortably below
          <code>buffer.memory</code>" under a sustained, realistic load profile.
        </Para>
        <CodeBox label="a throughput-focused load test against a real Testcontainers broker">
{`import time
from confluent_kafka import Producer

def test_producer_sustains_target_throughput_without_buffer_pressure(kafka_bootstrap):
    producer = Producer({
        "bootstrap.servers": kafka_bootstrap,
        "linger.ms": 10,
        "batch.size": 65536,
        "buffer.memory": 33554432,
    })

    target_rate = 20_000  # records/sec, a realistic peak for this service
    duration_sec = 10
    sent = 0
    start = time.monotonic()

    while time.monotonic() - start < duration_sec:
        producer.produce("load.test.topic", value=b"x" * 200)
        sent += 1
        if sent % 1000 == 0:
            producer.poll(0)   # let delivery callbacks fire, avoid local queue buildup

    producer.flush(timeout=10)
    actual_rate = sent / duration_sec
    assert actual_rate >= target_rate * 0.95, f"only sustained {actual_rate:.0f}/sec"`}
        </CodeBox>
        <Para>
          A load test like this run in a dedicated, less-frequent CI stage (nightly, or on-demand before a
          major release) rather than on every PR — per Part 11's cost-ordering principle, it is meaningfully
          more expensive than the correctness-focused suite and answers a different question, so gating every
          PR on it would slow down the common case for a check that only matters occasionally.
        </Para>
        <SubTitle>Chaos scenarios worth deliberately exercising</SubTitle>
        <Para>
          Testcontainers' ability to stop, pause, or restart a running container mid-test makes it possible
          to simulate the exact broker-failure scenarios the durability and ordering modules described
          conceptually, and actually observe your own client code's behavior under them rather than trusting
          it will behave as documented.
        </Para>
        <Table
          headers={['Chaos scenario', 'What it verifies', 'How to induce it with Testcontainers']}
          rows={[
            ['Broker container killed mid-produce', 'Producer correctly retries against a newly elected leader rather than silently dropping the batch.', 'Call the container\'s stop() partway through a sustained produce loop, then assert the consumer eventually sees every record once connectivity resumes.'],
            ['Consumer process killed before committing', 'Records are re-delivered on restart rather than skipped — confirms at-least-once behavior end to end, not just in theory.', 'Kill the consumer thread/process after processing but deliberately before calling commit(), restart it, and assert the same record is delivered again.'],
            ['A second consumer joins mid-stream, forcing a rebalance', 'In-flight processing is not silently duplicated or dropped across the rebalance boundary.', 'Start a second consumer instance against the same group.id partway through the test and assert the total record count processed across both instances matches exactly, with no gaps.'],
            ['Network partition between producer and broker', 'max.block.ms and retry configuration surface a clear, actionable error rather than an indefinite hang.', 'Use a Testcontainers network toxic-proxy or pause the container briefly, then assert the producer raises within its configured timeout rather than blocking forever.'],
          ]}
        />
        <Callout title="Chaos testing earns its cost when it catches something the correctness suite cannot" color={K}>
          These scenarios are meaningfully more expensive to write and run than the correctness-focused tests
          from Parts 02-05, and not every service needs all four. Reserve them for services where the cost of
          getting broker-failure or rebalance behavior wrong is high — a payment or order-processing path, in
          the language of this track's capstone module, rather than a low-stakes internal analytics pipeline
          where an occasional gap is genuinely tolerable.
        </Callout>
      </section>

      <Divider />

      {/* ── Part 13 ─────────────────────────────────────────────────── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 13 — Managing Test Data and Fixtures" />
        <SectionTitle>Keeping Test Data Realistic and Test Suites Maintainable Over Time</SectionTitle>
        <Para>
          A testing strategy that is technically sound but relies on hand-typed, oversimplified test payloads
          tends to degrade over time — real production events accumulate fields, edge cases, and quirks that
          a test suite's inline JSON literals quietly stop reflecting. Two practices keep test data close
          enough to reality that the tests above keep catching real bugs rather than just passing forever.
        </Para>
        <SubTitle>Generating test fixtures from the actual registered schema</SubTitle>
        <Para>
          Rather than hand-writing example payloads that drift from the real schema over time, generate them
          directly from whatever the Schema Registry currently has registered for a subject. This guarantees
          test fixtures are always structurally valid against the schema contract from Part 05, and a schema
          change that adds a new required field is immediately reflected in newly generated fixtures rather
          than silently leaving old, now-incomplete hand-written fixtures in the suite.
        </Para>
        <CodeBox label="generating a valid test fixture from the registered Avro schema">
{`from confluent_kafka.schema_registry import SchemaRegistryClient
import fastavro
import random

def generate_fixture(subject: str, registry_url: str) -> dict:
    client = SchemaRegistryClient({"url": registry_url})
    schema = client.get_latest_version(subject).schema.schema_str
    parsed = fastavro.schema.parse_schema(json.loads(schema))

    # Populate every field with a type-appropriate random/realistic value
    # rather than hand-typing each one -- stays correct as the schema evolves
    return {
        field["name"]: _realistic_value_for(field["type"])
        for field in parsed["fields"]
    }`}
        </CodeBox>
        <SubTitle>Keeping a small library of real, sanitized production payloads for regression tests</SubTitle>
        <Para>
          Generated fixtures are good for broad structural coverage, but they rarely reproduce the specific,
          messy edge cases that caused real incidents — the payload from Part 10's local-reproduction pattern,
          for example. Maintaining a small, deliberately curated set of real (personally-identifiable
          information stripped or replaced with synthetic equivalents) production payloads that previously
          caused bugs, checked into the repository alongside the test suite, turns each past incident into a
          permanent, automatically-checked regression test rather than a one-time fire drill.
        </Para>
        <Table
          headers={['Fixture source', 'What it is good at catching', 'What it misses']}
          rows={[
            ['Hand-written inline JSON in the test', 'Fast to read and write, fine for a single obvious happy-path case.', 'Drifts from the real schema over time; rarely reflects real-world messiness.'],
            ['Generated from the current registered schema', 'Structural correctness against the live schema contract; catches new-required-field regressions automatically.', 'Values are synthetic — will not reproduce a specific real-world edge case that caused a past incident.'],
            ['Curated, sanitized real production payloads', 'Exactly reproduces past incidents as permanent regression tests.', 'Needs deliberate maintenance — someone has to actually add the payload after each incident for it to help.'],
          ]}
        />
        <Callout title="Sanitize before committing — never check in raw production PII" color="#ef4444">
          A captured production payload used as a test fixture must have any personally identifiable or
          otherwise sensitive fields replaced with synthetic equivalents before it is committed to a
          repository — a customer's real email address or payment details have no business living in a test
          fixture file, regardless of how useful the payload's structure is for reproducing a bug.
        </Callout>
      </section>

      <Divider />

      {/* ── Misconceptions ─────────────────────────────────────────── */}
      <section style={{ marginBottom: 64 }} data-toc-kind="myth">
        <SectionTag text="// Misconceptions" />
        <SectionTitle>Five Misconceptions About Testing Kafka Systems</SectionTitle>
        {[
          {
            wrong: '"Mocking the Kafka client thoroughly enough is the same as an integration test"',
            right: 'Part 02 and Part 03 draw the actual line: a mock only does what you told it to, so it cannot catch real partitioning behavior, real serialization wire-format mismatches, or real consumer-group rebalancing. Those need an actual broker, which is exactly what Testcontainers gives you without the weight of a persistent shared test cluster.',
          },
          {
            wrong: '"TopologyTestDriver tests are basically integration tests since they run real Streams code"',
            right: 'Part 04 is explicit: TopologyTestDriver runs real topology logic but fakes the I/O boundary entirely — no broker, no real changelog topic replication, no real state-store recovery after a restart. It proves the processing logic is correct, not that the deployed app behaves correctly against a real cluster.',
          },
          {
            wrong: '"If the schema change passes Schema Registry compatibility checking, it is definitely safe to ship"',
            right: 'Part 05 draws the distinction directly: compatibility mode enforcement catches structural breakage, not semantic breakage. A field rename with a compatible alias is a good example of a change that passes every compatibility check while still silently changing what a downstream consumer actually computes.',
          },
          {
            wrong: '"enable.idempotence=true means duplicate records downstream can no longer happen"',
            right: 'Part 08 shows the far more common real-world cause of downstream duplicates is consumer-side commit timing after a crash, not producer retries — idempotence only closes the producer-retry gap, which is usually not the actual source once you check.',
          },
          {
            wrong: '"A hanging producer.send() call means the broker is down"',
            right: 'Part 07 walks through three separate causes, and broker downtime is only one of them — a missing topic with auto-creation disabled, or simply a high max.block.ms masking a fast underlying failure as a long hang, are both at least as common and are ruled out (or confirmed) with different checks entirely.',
          },
        ].map((item, i) => (
          <div key={i} style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 10, padding: '20px 24px', marginBottom: 16 }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--red,#ff4757)', marginBottom: 8, fontFamily: FONT_MONO }}>✕ &quot;{item.wrong}&quot;</div>
            <div style={{ fontSize: 14, color: 'var(--muted)', lineHeight: 1.7 }}>{item.right}</div>
          </div>
        ))}
      </section>

      <Divider />

      {/* ── Story ──────────────────────────────────────────────────── */}
      <section style={{ marginBottom: 64 }} data-toc-kind="story">
        <SectionTag text="// What This Looks Like at Work" />
        <SectionTitle>What This Looks Like on Day One</SectionTitle>
        <HighlightBox>
          <Para>
            <strong>At Segment:</strong> a new engineer's PR adds a transformation step to an event-pipeline
            consumer and ships with a full suite of mocked unit tests — every branch of the transformation
            logic green. It still breaks in staging within an hour, because the mocked tests never exercised
            the real Avro deserializer against the real registered schema, and a field the transformation
            depended on had a slightly different type than the mock assumed. The team's postmortem action
            item is exactly Part 03's guidance: any PR touching deserialization logic must also pass a
            Testcontainers test against a real broker and the real schema, not mocks alone.
          </Para>
        </HighlightBox>
        <HighlightBox>
          <Para>
            <strong>At Amplitude:</strong> an on-call engineer is paged for a consumer group with growing
            lag on an events topic. Following Part 06's checklist in order, the CLI consumer confirms
            messages are landing fine, and <code>kafka-consumer-groups.sh --describe</code> shows a healthy
            assignment with zero rebalance churn — ruling out both the producer side and the consumer-group
            mechanics within two minutes. The actual cause, found next, is a downstream API call inside the
            consumer loop that started timing out after a partner's service degraded — nothing to do with
            Kafka at all, but ruled in only after the Kafka-specific checks were ruled out first, in order.
          </Para>
        </HighlightBox>
        <HighlightBox>
          <Para>
            <strong>At Cloudflare:</strong> a stream-processing team adds a new windowed aggregation to an
            existing topology and wants confidence in the late-arrival and grace-period edge cases before
            shipping — cases that would take real wall-clock hours to test against a live cluster.
            <code>TopologyTestDriver</code>, per Part 04, lets them pipe in records at explicit simulated
            timestamps and assert on exactly which window each one lands in, including a deliberately
            late-arriving record right at the grace-period boundary — the entire edge-case suite runs in
            under a second and is checked on every commit, not just before a release.
          </Para>
        </HighlightBox>
      </section>

      <Divider />

      {/* ── Interview Prep ─────────────────────────────────────────── */}
      <section style={{ marginBottom: 64 }} data-toc-kind="prep">
        <SectionTag text="// Interview Prep" />
        <SectionTitle>5 Interview Questions — With Complete Answers</SectionTitle>
        {[
          {
            q: 'Q1. How would you structure a Kafka consumer service so its business logic can be unit tested without a broker?',
            a: `I'd separate the code into two layers, per Part 02: a thin adapter layer that owns the actual Kafka client objects — the Consumer, the Producer, poll and commit calls — and does essentially nothing else, and a logic layer made of plain functions or classes that take and return normal data structures with zero Kafka imports at all.

The adapter layer is what gets mocked in a unit test, because mocking network calls and broker state is exactly what a unit test should avoid paying for. The logic layer needs no mock at all — you call it directly with plain dicts or objects and assert on the return value, the same as testing any other pure function.

What I'd be careful to avoid is the common failure mode where the test suite only proves mocked functions were called with mocked arguments, which technically passes but verifies almost nothing about real behavior. The mock exists to isolate the Kafka boundary, not to replace the assertions that actually matter.`,
          },
          {
            q: 'Q2. Why would you use Testcontainers instead of an embedded, in-process Kafka broker for integration tests?',
            a: `Per Part 03, the biggest practical reason is fidelity and language independence. An embedded broker running inside the same JVM as the test process is effectively a Java/Scala-only pattern, and even within the JVM ecosystem it can diverge subtly from how a real, separately-deployed broker actually behaves — differences in networking and process isolation that can mask bugs a real broker would surface.

Testcontainers instead starts the actual Kafka broker binary in its own Docker container — the same image you'd run in production, just ephemeral and isolated per test run. That means the integration test is exercising real partition assignment, real wire-format serialization, and real consumer-group rebalancing, not an approximation of them.

The trade-off is speed: a Testcontainers-backed test suite takes seconds rather than milliseconds, dominated by container startup. I'd scope the container fixture to the whole test module or session rather than per test function, so that cost is paid once per run instead of once per test case.`,
          },
          {
            q: 'Q3. What does TopologyTestDriver actually let you test, and what does it not prove?',
            a: `TopologyTestDriver runs your actual Kafka Streams Topology object — the real processing logic, joins, aggregations, and windowing — against simulated input and output topics entirely in-process, with a simulated clock you control explicitly. That means I can test tricky windowing edge cases, like a record arriving right at a window boundary or just past a grace period, deterministically and in milliseconds, without waiting on real wall-clock time or standing up a broker.

What it explicitly does not prove, per Part 04, is anything about the deployment: it doesn't exercise real changelog-topic replication for state stores, real state recovery after an app restart against an actual broker, or real rebalance behavior for a Streams app running with multiple instances. Those still need a Testcontainers-backed integration test against a real broker — TopologyTestDriver and Testcontainers integration tests are complementary, not substitutes for each other.`,
          },
          {
            q: 'Q4. How would you catch a breaking schema change before it reaches production, beyond code review?',
            a: `I'd wire a CI check, per Part 05, that calls the Schema Registry's own compatibility-check API against the candidate schema for the relevant subject, gated on any pull request that touches a schema file — not just before major migrations. That API evaluates the proposed schema against the subject's configured compatibility mode, the same check the registry performs on real registration, but without actually registering anything, so it's safe to run on every PR.

I'd be clear in the PR description or a comment about what this catches and what it doesn't: compatibility-mode enforcement catches structural breakage — a removed required field, an incompatible type change — but not semantic breakage, like a field rename that's technically compatible via an alias but silently changes what a downstream consumer actually computes. So the CI check is a necessary automated gate, not a substitute for a human actually reviewing what the schema change means in practice.`,
          },
          {
            q: 'Q5. Walk me through how you would debug a producer whose send() call appears to hang indefinitely.',
            a: `Per Part 07, I'd work through three causes in a specific order rather than guessing. First, basic network reachability — a quick nc check against the broker's host and port, because if the network can't even reach a broker, nothing else is worth debugging yet. Second, metadata — whether the topic actually exists and a partition leader is known, using kafka-topics.sh --describe independent of my application code, since a producer can't send its first record until metadata resolves, and that metadata fetch is what's actually blocking behind the scenes.

Third, and often the real culprit when the first two look fine: max.block.ms set too high, which bounds how long send() will block before finally raising a clear exception. If it's left at a high default, a fast, real underlying failure gets disguised as a mysterious multi-minute hang instead of a fast, actionable error. I'd temporarily lower it in a debugging session specifically to surface the real underlying exception quickly, then investigate whatever that exception actually names.

I'd deliberately avoid jumping straight to client configuration theories before confirming reachability first — that ordering is what turns an hour of guessing into a two-minute diagnosis.`,
          },
        ].map((item, i) => (
          <div key={i} style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 12, padding: '24px 28px', marginBottom: 20 }}>
            <div style={{ fontSize: 14, fontWeight: 800, color: 'var(--text)', marginBottom: 14, lineHeight: 1.4 }}>{item.q}</div>
            <div style={{ fontSize: 14, color: 'var(--muted)', lineHeight: 1.85, whiteSpace: 'pre-line' }}>{item.a}</div>
          </div>
        ))}
      </section>

      <Divider />

      {/* ── Common Mistakes ───────────────────────────────────────── */}
      <section style={{ marginBottom: 64 }} data-toc-kind="plain">
        <SectionTag text="// Common Mistakes" />
        <SectionTitle>The Mistakes That Make Kafka Testing Ineffective or Misleading</SectionTitle>
        {[
          {
            q: 'Treating a fully mocked unit-test suite as sufficient confidence to skip integration testing entirely',
            a: 'A mock only does what you told it to — it cannot catch real partitioning, real serialization drift, or real rebalance behavior. Part 03\'s Testcontainers pattern exists specifically to close this gap, cheaply enough to run in CI on every PR.',
          },
          {
            q: 'Writing a race-condition test that produces a record and immediately asserts on consumer output with no polling or timeout',
            a: 'Kafka delivery is asynchronous even against a real broker. A test with no bounded poll/retry loop around the assertion will flake constantly under any load, and the fix is almost always a short poll-with-timeout loop, not a longer fixed sleep.',
          },
          {
            q: 'Debugging client configuration before confirming basic network reachability to the broker',
            a: 'Part 07\'s ordering exists because this is the single most common way engineers burn an hour on what turns out to be a firewall rule — a 5-second nc check rules out or confirms the whole category immediately.',
          },
          {
            q: 'Assuming every duplicate-records incident is a producer idempotence problem',
            a: 'Part 08 is explicit that consumer-side commit timing after a crash is the more common real cause in practice — checking enable.idempotence first is cheap, but stopping there without checking commit placement misses the actual bug most of the time.',
          },
          {
            q: 'Reproducing a production bug locally from a guessed-at approximation of the failing payload instead of the actual captured record',
            a: 'Part 10\'s discipline of pulling the exact payload from the production DLQ, not reconstructing it from memory, is what prevents "fixing" a bug that was never actually reproduced in the first place.',
          },
        ].map((item, i) => (
          <div key={i} style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 12, padding: '24px 28px', marginBottom: 20 }}>
            <div style={{ fontSize: 14, fontWeight: 800, color: 'var(--text)', marginBottom: 14, lineHeight: 1.4 }}>{item.q}</div>
            <div style={{ fontSize: 14, color: 'var(--muted)', lineHeight: 1.85 }}>{item.a}</div>
          </div>
        ))}
      </section>

      <Divider />

      {/* ── Error Library ─────────────────────────────────────────── */}
      <section style={{ marginBottom: 64 }} data-toc-kind="plain">
        <SectionTag text="// Error Library" />
        <SectionTitle>Errors You Will Hit While Testing and Debugging — And Exactly Why</SectionTitle>
        {[
          {
            error: `UnknownTopicOrPartitionException raised repeatedly by a producer that used to work fine`,
            cause: 'Per Part 07, the topic does not exist from this producer\'s point of view — either it was genuinely never created, auto-creation is disabled (the correct production setting) and nobody created it, or the producer is pointed at the wrong cluster or environment entirely.',
            fix: 'Run kafka-topics.sh --describe against the exact bootstrap servers the producer is configured with, independent of the application, to confirm the topic exists on the cluster the producer actually thinks it is talking to.',
          },
          {
            error: `A Testcontainers-backed test suite is flaky, occasionally failing with a connection timeout to the broker`,
            cause: 'The most common cause is a test racing the container\'s own readiness — the container process has started but the broker inside it has not finished its own startup sequence yet, and the test\'s first client call fires before that finishes.',
            fix: 'Confirm the Testcontainers Kafka module\'s wait strategy is actually being respected (it should block get_bootstrap_server() until the broker is genuinely ready) rather than being bypassed by a custom container configuration; avoid adding a fixed sleep as a workaround, since that just hides the same race under different timing.',
          },
          {
            error: `TopologyTestDriver test asserts on an output record that never appears, even though the input was piped in correctly`,
            cause: 'Almost always a windowing issue: the test piped input at timestamps that never actually advance the simulated clock past a window\'s close, so the aggregation is still open and has not yet emitted a result — this is a test-design issue, not a topology bug.',
            fix: 'Explicitly pipe a later-timestamped record (or use the driver\'s clock-advance API where available) past the window boundary and grace period before asserting on output — the window will not emit until simulated time has genuinely moved past it.',
          },
          {
            error: `Schema Registry compatibility check returns is_compatible: false for a change that looks harmless`,
            cause: 'Per Part 05, "harmless-looking" and "compatible" are evaluated by strict structural rules, not intent — removing a field that has no default value, or narrowing a numeric type, both fail backward compatibility even if no current consumer happens to use that field yet.',
            fix: 'Add an explicit default value to the field being removed or changed (making it optional rather than removing it outright), or confirm with every consuming team that the field is genuinely unused before overriding compatibility mode for that subject — overriding should be a deliberate, reviewed decision, not a default response to a failed check.',
          },
          {
            error: `A local reproduction script does not reproduce the production failure at all, even using the payload pulled from the DLQ`,
            cause: 'Per Part 10, this usually means the DLQ payload captured only the message value, while the actual failure depended on something not preserved there — a specific header, the partition or offset context, or timing relative to other records the consumer was processing concurrently.',
            fix: 'Check exactly what the DLQ event schema preserves (per the message-brokers-and-queues module\'s DLQ pattern, it should include source partition and offset) and, if headers or ordering context are missing, capture those explicitly from production logs or a broker-level dump via kafka-dump-log.sh before concluding the reproduction attempt failed.',
          },
        ].map((item, i) => (
          <div key={i} style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 12, padding: '22px 26px', marginBottom: 18 }}>
            <div style={{ fontSize: 13.5, fontWeight: 700, color: '#ff4757', marginBottom: 10, fontFamily: FONT_MONO, lineHeight: 1.5 }}>{item.error}</div>
            <div style={{ fontSize: 14, color: 'var(--text)', lineHeight: 1.8, marginBottom: 10 }}><strong>Why: </strong>{item.cause}</div>
            <div style={{ fontSize: 14, color: 'var(--muted)', lineHeight: 1.8 }}><strong>Fix: </strong>{item.fix}</div>
          </div>
        ))}
      </section>

      <Divider />

      <KeyTakeaways items={[
        'Kafka-dependent code is hard to test because it is asynchronous, distributed, and needs a real broker to exercise correctly — no single technique covers all of that, so treat testing as a spectrum, not one method.',
        'Separate your business logic from the Kafka client boundary so the logic can be unit tested with plain data structures and zero mocking, while the thin adapter layer is what actually gets mocked.',
        'Testcontainers, running a real Kafka broker in Docker for the duration of a test, is the modern standard for integration testing — far better than the older embedded-Kafka-in-JVM approach in fidelity, speed of setup, and language independence.',
        'TopologyTestDriver tests real Kafka Streams topology logic deterministically with a simulated clock and no broker at all — ideal for windowing and aggregation edge cases, but it does not prove your deployed app behaves correctly against a real cluster.',
        'Contract testing a schema change against the Schema Registry\'s compatibility API in CI catches structural breakage before deploy, on every PR that touches a schema file — not a substitute for reviewing what a compatible-but-meaningfully-different change actually does downstream.',
        'Diagnose production symptoms in a fixed, mechanical order rather than guessing: for a silent consumer, confirm data is landing via the CLI consumer before suspecting your application; for a hanging producer, confirm reachability before chasing client-config theories.',
        'A local reproduction environment built from the actual captured production payload — not a guessed approximation — is the fastest path to a validated fix, and a good candidate to keep as a permanent regression test afterward.',
      ]} />
    </LearnLayout>
  )
}
