import type { LessonQuick } from '@/lib/lesson-quick'

const K = '/learn/apache-kafka'

// Kafka needs a running broker, so CLI and client snippets are shown as code. The few Python
// examples are small simulations of a mechanism (labelled as such) and are run.
export const KAFKA_QUICK: Record<string, LessonQuick> = {
  [`${K}/what-is-apache-kafka`]: {
    answer: 'Apache Kafka is a distributed, durable event log. Producers append events to topics, Kafka stores them for a configured time, and any number of consumers read them independently and can replay them, because reading an event does not remove it.',
    points: [
      'Kafka decouples producers from consumers\' uptime, speed and release schedules.',
      'The log is append-only, ordered and non-destructive.',
      'One event stream can feed many systems at once.',
    ],
    example: {
      label: 'A log that several readers consume independently (simulation)',
      lang: 'python',
      code: `log = []
for event in ["order_placed:1001", "order_paid:1001", "order_shipped:1001"]:
    log.append(event)                       # producers only ever append

positions = {"billing": 2, "email": 0, "analytics": 3}
for reader, pos in positions.items():
    print(f"{reader:9} next reads: {log[pos:]}")
print("the log still holds", len(log), "events")`,
    },
    check: {
      question: 'What happens to a Kafka event after a consumer reads it?',
      options: ['It is deleted', 'It stays in the log until retention removes it', 'It moves to another topic', 'It becomes invisible to other consumers'],
      answer: 1,
      explanation: 'Reading is non-destructive; other consumers, and replays, can read the same event.',
    },
  },

  [`${K}/events-topics-partitions`]: {
    answer: 'An event is an immutable record with a key, a value, a timestamp and optional headers. A topic is a named stream split into partitions, each an ordered log; an event\'s address is topic + partition + offset. Kafka guarantees order only within a partition.',
    points: [
      'Partitions exist for parallelism in writes and reads.',
      'Offsets count up independently in each partition.',
      'Events with the same key go to the same partition, so they stay in order.',
    ],
    example: {
      label: 'Create a topic with three partitions',
      lang: 'bash',
      code: `kafka-topics.sh --bootstrap-server localhost:9092 \\
  --create --topic orders --partitions 3 --replication-factor 1

kafka-topics.sh --bootstrap-server localhost:9092 --describe --topic orders`,
      static: true,
    },
    check: {
      question: 'Across a topic with several partitions, what order does Kafka guarantee?',
      options: ['Global order across the whole topic', 'Order within each partition only', 'Order by timestamp', 'No order at all'],
      answer: 1,
      explanation: 'Each partition is an ordered log; there is no ordering guarantee between partitions.',
    },
  },

  [`${K}/producers-consumers-brokers`]: {
    answer: 'Producers send records to the broker that leads each partition, batching and compressing them; brokers store and replicate the logs; consumers poll brokers for records and commit how far they have read. Clients discover leaders through metadata, and a controller (KRaft) coordinates leadership.',
    points: [
      'acks decides when a write counts as successful.',
      'linger.ms and batch.size trade a little latency for throughput.',
      'Consumers pull at their own pace, which gives natural backpressure.',
    ],
    example: {
      label: 'Producer settings that decide durability and throughput',
      lang: 'text',
      code: `bootstrap.servers=broker1:9092,broker2:9092
acks=all                    # wait for all in-sync replicas
enable.idempotence=true     # no duplicates from retries
linger.ms=10                # wait up to 10 ms to fill a batch
batch.size=65536
compression.type=zstd`,
      static: true,
    },
    check: {
      question: 'Which broker does a producer send a record to?',
      options: ['Any broker', 'The leader of the record\'s partition', 'The controller', 'Every broker'],
      answer: 1,
      explanation: 'Writes go to the partition leader; followers replicate from it.',
    },
  },

  [`${K}/local-setup-cli`]: {
    answer: 'You can run a single-broker Kafka in KRaft mode (no ZooKeeper) from one Docker Compose file, then use the bundled CLI tools: kafka-topics.sh to create and describe topics, and kafka-console-producer.sh and kafka-console-consumer.sh to send and read messages.',
    points: [
      '--describe shows each partition\'s leader, replicas and in-sync replicas.',
      '--from-beginning reads the full retained history.',
      'Adding --group makes the console consumer commit offsets like a real one.',
    ],
    example: {
      label: 'Produce and consume from the command line',
      lang: 'bash',
      code: `kafka-console-producer.sh --bootstrap-server localhost:9092 --topic orders \\
  --property parse.key=true --property key.separator=:
> cust-7:{"order_id":1042,"total":59.69}

kafka-console-consumer.sh --bootstrap-server localhost:9092 --topic orders \\
  --from-beginning --property print.key=true`,
      static: true,
    },
    check: {
      question: 'What does --from-beginning do for a console consumer?',
      options: ['Deletes the topic', 'Reads all retained messages, not just new ones', 'Resets every group\'s offsets', 'Creates the topic'],
      answer: 1,
      explanation: 'Without it, a new consumer starts at the end and only sees messages produced afterwards.',
    },
  },

  [`${K}/consumer-groups-offsets`]: {
    answer: 'A consumer group shares a topic\'s partitions among its members: each partition is read by exactly one member at a time, so adding members adds parallelism up to the partition count. The group commits offsets to Kafka to remember how far it has read; separate groups read independently.',
    points: [
      'More consumers than partitions leaves some idle.',
      'A member joining or leaving triggers a rebalance.',
      'Consumer lag is the latest offset minus the committed offset.',
    ],
    example: {
      label: 'Six partitions assigned across a group (simulation)',
      lang: 'python',
      code: `partitions = list(range(6))
for members in (2, 3, 8):
    assignment = {f"c{m}": [] for m in range(members)}
    for p in partitions:
        assignment[f"c{p % members}"].append(p)
    idle = [c for c, ps in assignment.items() if not ps]
    print(f"{members} consumers -> busy {members - len(idle)}, idle {len(idle)}")`,
    },
    check: {
      question: 'A topic has 4 partitions and a group has 6 consumers. How many consumers sit idle?',
      options: ['0', '2', '4', '6'],
      answer: 1,
      explanation: 'Each partition goes to one member, so at most 4 can work; 2 are idle.',
    },
  },

  [`${K}/replication-leaders-isr`]: {
    answer: 'Kafka keeps replication.factor copies of each partition on different brokers. One replica is the leader and serves reads and writes; followers copy its log. The in-sync replica set (ISR) lists those fully caught up, and with acks=all and min.insync.replicas a write succeeds only when enough of them have it.',
    points: [
      'If a leader fails, an in-sync follower becomes leader.',
      'replication.factor=3 with min.insync.replicas=2 survives one broker loss without losing writes.',
      'Unclean leader election trades data loss for availability; keep it off.',
    ],
    example: {
      label: 'Topic settings for durable writes',
      lang: 'bash',
      code: `kafka-topics.sh --bootstrap-server localhost:9092 --create --topic payments \\
  --partitions 6 --replication-factor 3 \\
  --config min.insync.replicas=2
# producers use acks=all`,
      static: true,
    },
    check: {
      question: 'replication.factor=3, min.insync.replicas=2, acks=all. Two replicas fail. What happens to writes?',
      options: ['They succeed on the one remaining replica', 'They are rejected until another replica catches up', 'They are queued forever', 'They go to another topic'],
      answer: 1,
      explanation: 'Only one in-sync replica remains, fewer than the required two, so the broker refuses acks=all writes.',
    },
  },

  [`${K}/keys-ordering-partitioning`]: {
    answer: 'A record\'s key decides its partition: the default partitioner hashes the key and takes it modulo the number of partitions, so all events with the same key land in the same partition and stay in order. Records without a key are spread evenly with no ordering between them.',
    points: [
      'Key by the entity whose events must stay ordered, such as order_id.',
      'A few very busy keys create hot partitions.',
      'Adding partitions later remaps keys and breaks per-key ordering for a while.',
    ],
    example: {
      label: 'hash(key) % partitions keeps a key\'s events together (simplified hash)',
      lang: 'python',
      code: `import zlib

def partition(key, partitions=3):
    return zlib.crc32(key.encode()) % partitions   # Kafka uses murmur2; same idea

events = [("order-1", "placed"), ("order-2", "placed"), ("order-1", "paid"), ("order-1", "shipped")]
for key, event in events:
    print(f"{key} {event:8} -> partition {partition(key)}")`,
    },
    check: {
      question: 'Why give order events the key order_id?',
      options: ['To compress them better', 'So each order\'s events go to one partition and stay in order', 'To spread them randomly', 'Keys are required'],
      answer: 1,
      explanation: 'Same key, same partition; ordering is guaranteed within a partition.',
    },
  },

  [`${K}/retention-compaction`]: {
    answer: 'Kafka deletes old data by policy. With cleanup.policy=delete, whole log segments are removed once they are older than retention.ms (or exceed retention.bytes). With cleanup.policy=compact, Kafka keeps only the latest record for each key, indefinitely, which suits current-state data.',
    points: [
      'The default retention is 7 days; data does not live forever.',
      'Deletion happens per segment, not per record.',
      'A null value (tombstone) deletes a key from a compacted topic.',
    ],
    example: {
      label: 'What compaction keeps (simulation)',
      lang: 'python',
      code: `log = [("price:milk", 3.49), ("price:eggs", 5.99), ("price:milk", 3.59),
       ("price:bread", 2.99), ("price:eggs", None), ("price:milk", 3.79)]

latest = {}
for key, value in log:
    latest[key] = value
compacted = {k: v for k, v in latest.items() if v is not None}   # tombstones drop the key
print(compacted)`,
    },
    check: {
      question: 'Which cleanup policy suits "the current price of each product"?',
      options: ['delete with 7-day retention', 'compact', 'delete with infinite retention', 'No policy'],
      answer: 1,
      explanation: 'Compaction keeps the latest value per key forever, exactly a current-state table.',
    },
  },

  [`${K}/delivery-semantics`]: {
    answer: 'At-most-once may lose messages but never duplicates them; at-least-once never loses them but may duplicate; exactly-once (effectively once) aims for neither, using the idempotent producer and Kafka transactions, with consumers reading only committed data.',
    points: [
      'Commit offsets after processing for at-least-once.',
      'The idempotent producer drops duplicate retries within one producer session.',
      'Transactions make a read-process-write cycle and its offset commit atomic.',
    ],
    example: {
      label: 'Why commit order decides the semantics (simulation)',
      lang: 'python',
      code: `def run(commit_first, crash_at=2):
    processed, committed = [], 0
    for offset in range(4):
        if commit_first:
            committed = offset + 1
            if offset == crash_at: break         # crash after commit, before processing
            processed.append(offset)
        else:
            processed.append(offset)
            if offset == crash_at: break         # crash after processing, before commit
            committed = offset + 1
    return processed + list(range(committed, 4))   # restart from the committed offset

print("commit first (at-most-once):  processed", run(True))
print("commit after (at-least-once): processed", run(False))`,
    },
    check: {
      question: 'A consumer commits its offset only after processing each message. Which guarantee is that?',
      options: ['At-most-once', 'At-least-once', 'Exactly-once', 'None'],
      answer: 1,
      explanation: 'A crash after processing but before committing re-delivers the message: no loss, possible duplicates.',
    },
  },

  [`${K}/schemas-serialization`]: {
    answer: 'Kafka stores bytes and enforces no format, so producers and consumers must agree on one. Avro and Protobuf are compact binary formats validated against a schema; a Schema Registry stores schemas, gives each an ID sent with the message, and rejects incompatible changes.',
    points: [
      'Raw JSON accepts any shape, so breaking changes slip through.',
      'Backward compatibility lets new consumers read old data.',
      'Add fields with defaults; never reuse or repurpose a field.',
    ],
    example: {
      label: 'An Avro schema with a safely added field',
      lang: 'json',
      code: `{
  "type": "record",
  "name": "Order",
  "fields": [
    { "name": "order_id", "type": "long" },
    { "name": "total", "type": "double" },
    { "name": "currency", "type": "string", "default": "USD" }
  ]
}`,
      static: true,
    },
    check: {
      question: 'Which schema change is backward compatible in Avro?',
      options: ['Renaming a field', 'Adding a field with a default', 'Changing a field\'s type', 'Removing a required field\'s default'],
      answer: 1,
      explanation: 'New readers fill the default when reading old records that lack the field.',
    },
  },

  [`${K}/producer-design`]: {
    answer: 'A production producer chooses acks, idempotence and a retry and timeout budget deliberately, sends asynchronously with a delivery callback instead of blocking on each message, handles callback errors by category, and flushes before shutting down.',
    points: [
      'Blocking on every send can cut throughput by around 100x.',
      'A callback error means internal retries already failed.',
      'Call flush() and close() on shutdown, or buffered messages are lost.',
    ],
    example: {
      label: 'Async sends with a delivery callback (confluent-kafka)',
      lang: 'python',
      code: `from confluent_kafka import Producer

producer = Producer({"bootstrap.servers": "localhost:9092", "acks": "all", "enable.idempotence": True})

def on_delivery(err, msg):
    if err:
        log.error("delivery failed for key %s: %s", msg.key(), err)

for order in orders:
    producer.produce("orders", key=str(order["id"]), value=json.dumps(order), on_delivery=on_delivery)
    producer.poll(0)          # serve callbacks
producer.flush(10)            # deliver what is buffered before exit`,
      static: true,
    },
    check: {
      question: 'Why should a producer call flush() before the process exits?',
      options: ['To compress messages', 'To deliver records still buffered in memory', 'To commit offsets', 'To create the topic'],
      answer: 1,
      explanation: 'Sends are batched in memory; exiting without flush drops whatever has not been delivered yet.',
    },
  },

  [`${K}/consumer-design`]: {
    answer: 'A production consumer sets group.id, auto.offset.reset and enable.auto.commit on purpose, commits offsets after processing, makes processing idempotent because redelivery happens, sends poison messages to a dead letter topic after bounded retries, and shuts down cleanly.',
    points: [
      'Commit after processing means at-least-once; idempotency handles the duplicates.',
      'One bad message must not block a whole partition.',
      'Close the consumer on shutdown so the group rebalances quickly.',
    ],
    example: {
      label: 'Poll, process, then commit (confluent-kafka)',
      lang: 'python',
      code: `from confluent_kafka import Consumer

consumer = Consumer({"bootstrap.servers": "localhost:9092", "group.id": "billing",
                     "enable.auto.commit": False, "auto.offset.reset": "earliest"})
consumer.subscribe(["orders"])
try:
    while running:
        msg = consumer.poll(1.0)
        if msg is None or msg.error():
            continue
        handle(msg)                              # idempotent: upsert by order_id
        consumer.commit(message=msg, asynchronous=False)
finally:
    consumer.close()`,
      static: true,
    },
    check: {
      question: 'What stops one malformed message from blocking a partition forever?',
      options: ['Raising max.poll.records', 'Retry a few times, then send it to a dead letter topic', 'Restarting the consumer', 'Disabling commits'],
      answer: 1,
      explanation: 'Bounded retries plus a dead letter topic let the consumer move on while keeping the bad message for inspection.',
    },
  },

  [`${K}/kafka-connect`]: {
    answer: 'Kafka Connect runs reusable connectors, configured rather than coded, that move data between Kafka and other systems. Source connectors (Debezium, JDBC) bring data in; sink connectors (S3, Elasticsearch, JDBC) send it out. In distributed mode, workers share tasks and recover from failures.',
    points: [
      'Standalone mode is for local development only.',
      'Connectors are created and managed through a REST API.',
      'Single Message Transforms make light per-record changes.',
    ],
    example: {
      label: 'Create an S3 sink connector through the REST API',
      lang: 'bash',
      code: `curl -X POST localhost:8083/connectors -H 'Content-Type: application/json' -d '{
  "name": "orders-to-s3",
  "config": {
    "connector.class": "io.confluent.connect.s3.S3SinkConnector",
    "topics": "orders",
    "s3.bucket.name": "acme-lake",
    "format.class": "io.confluent.connect.s3.format.parquet.ParquetFormat",
    "flush.size": "10000",
    "tasks.max": "3"
  }
}'`,
      static: true,
    },
    check: {
      question: 'Which connector type writes Kafka data out to S3?',
      options: ['Source connector', 'Sink connector', 'Transform', 'Converter'],
      answer: 1,
      explanation: 'Sinks read from Kafka and write to an external system; sources do the opposite.',
    },
  },

  [`${K}/stream-processing-kafka-streams`]: {
    answer: 'Stream processing transforms events continuously as they arrive. Kafka Streams is a Java library you embed in your own application (no separate cluster): a KStream is a sequence of events, a KTable is the latest value per key, and windows bound aggregations over time.',
    points: [
      'Unbounded streams need windows for aggregates such as counts per minute.',
      'Stateful operations keep local state backed by changelog topics.',
      'Scale by running more instances of your application.',
    ],
    example: {
      label: 'Orders per store in 1-minute tumbling windows (simulation)',
      lang: 'python',
      code: `from collections import Counter

events = [("ST001", "09:00:12"), ("ST002", "09:00:40"), ("ST001", "09:00:55"),
          ("ST001", "09:01:03"), ("ST002", "09:01:30")]
windows = Counter((store, ts[:5]) for store, ts in events)   # window = the minute
for (store, minute), count in sorted(windows.items()):
    print(f"{minute} {store}: {count}")`,
    },
    check: {
      question: 'How does a KTable treat a new record for an existing key?',
      options: ['As another independent event', 'As an update replacing the previous value', 'It ignores it', 'It deletes the key'],
      answer: 1,
      explanation: 'A KTable represents current state, like a compacted topic; a KStream treats every record as an event.',
    },
  },

  [`${K}/security-acls-sasl-tls`]: {
    answer: 'An unsecured Kafka cluster lets anyone who can reach it read and write every topic. Secure it with TLS for encryption in transit, SASL (SCRAM, OAuth, Kerberos) or mutual TLS to authenticate clients, and ACLs to authorise each principal for specific topics and operations.',
    points: [
      'SASL/PLAIN must always run over TLS (SASL_SSL).',
      'SCRAM never sends the password itself.',
      'Grant least privilege: each service gets only its topics and operations.',
    ],
    example: {
      label: 'Allow the billing service to read one topic',
      lang: 'bash',
      code: `kafka-acls.sh --bootstrap-server broker1:9093 --command-config admin.properties \\
  --add --allow-principal User:billing-svc \\
  --operation Read --topic orders --group billing`,
      static: true,
    },
    check: {
      question: 'Why must SASL/PLAIN always run over TLS?',
      options: ['It is faster', 'It sends credentials essentially in plain text', 'TLS is needed for ACLs', 'It only works with ZooKeeper'],
      answer: 1,
      explanation: 'Without TLS, anyone on the network can read the username and password.',
    },
  },

  [`${K}/monitoring-observability`]: {
    answer: 'Kafka health lives in Kafka-specific metrics, not just CPU and disk: under-replicated partitions (should be 0), active controller count (exactly 1 across the cluster), offline partitions, request latency, and consumer lag. Expose them over JMX, scrape with Prometheus, and alert on sustained problems.',
    points: [
      'Any sustained under-replicated partition is lost redundancy.',
      'Consumer lag shows whether consumers keep up.',
      'Alert on sustained conditions, not single spikes.',
    ],
    example: {
      label: 'Check consumer lag per partition',
      lang: 'bash',
      code: `kafka-consumer-groups.sh --bootstrap-server localhost:9092 --describe --group billing
# GROUP    TOPIC   PARTITION  CURRENT-OFFSET  LOG-END-OFFSET  LAG
# billing  orders  0          10412           10420           8`,
      static: true,
    },
    check: {
      question: 'What value should under-replicated partitions show on a healthy cluster?',
      options: ['Equal to the partition count', '0', '1', 'Any value below 10'],
      answer: 1,
      explanation: 'Every replica should be in sync; any sustained non-zero value means redundancy is reduced.',
    },
  },

  [`${K}/performance-tuning`]: {
    answer: 'Kafka tuning trades latency against throughput toward a stated target: larger batches (batch.size, linger.ms) and compression (zstd, lz4) raise producer throughput; brokers rely on the OS page cache, so keep the JVM heap modest; consumers tune fetch sizes; and partition counts set the parallelism ceiling.',
    points: [
      'Bigger batches compress better.',
      'Leave most RAM to the page cache; about 6 GB of heap is a common start.',
      'Measure against a target before and after each change.',
    ],
    example: {
      label: 'Throughput-oriented producer settings',
      lang: 'text',
      code: `linger.ms=20
batch.size=262144
compression.type=zstd
buffer.memory=134217728
max.in.flight.requests.per.connection=5   # safe with idempotence`,
      static: true,
    },
    check: {
      question: 'What does raising linger.ms trade?',
      options: ['Durability for speed', 'A little latency for higher throughput', 'Memory for CPU', 'Ordering for speed'],
      answer: 1,
      explanation: 'Waiting a few milliseconds fills bigger batches, which raises throughput at a small latency cost.',
    },
  },

  [`${K}/scaling-capacity-planning`]: {
    answer: 'Size a Kafka cluster from numbers: disk = peak throughput × retention × replication factor (plus headroom), partitions to cover peak consumer parallelism with room to grow, and network for replication traffic too. Scale out by adding brokers and reassigning partitions with throttling.',
    points: [
      'Plan against peak, not average, throughput.',
      'Adding partitions later remaps keys, so plan ahead.',
      'Throttle reassignments so they do not starve live traffic.',
    ],
    example: {
      label: 'Disk needed for a topic',
      lang: 'python',
      code: `peak_mb_per_sec = 40
retention_days = 7
replication = 3
headroom = 1.3

disk_tb = peak_mb_per_sec * 86_400 * retention_days * replication * headroom / 1_000_000
print(f"about {disk_tb:.1f} TB across the cluster")`,
    },
    check: {
      question: 'Why plan partition counts with growth headroom?',
      options: ['Partitions are free', 'Increasing them later reshuffles which partition each key maps to', 'Kafka forbids adding partitions', 'It reduces disk use'],
      answer: 1,
      explanation: 'hash(key) % partitions changes when the count changes, disturbing per-key ordering.',
    },
  },

  [`${K}/disaster-recovery-multi-region`]: {
    answer: 'Replication and rack awareness protect against broker and zone failures, but not a whole region failing. Disaster recovery copies topics to another region with MirrorMaker 2 (or a managed equivalent), in active-passive or active-active setups chosen per topic from its recovery point and recovery time objectives (RPO and RTO).',
    points: [
      'Monitor replication lag to the DR cluster like any production SLO.',
      'Plan for schemas, ACLs and client configs, not only data.',
      'Tier topics: not everything needs a hot standby.',
    ],
    example: {
      label: 'MirrorMaker 2 replicating from us-east to us-west',
      lang: 'text',
      code: `clusters = east, west
east.bootstrap.servers = east-broker:9092
west.bootstrap.servers = west-broker:9092
east->west.enabled = true
east->west.topics = orders, payments
replication.factor = 3
sync.group.offsets.enabled = true`,
      static: true,
    },
    check: {
      question: 'What does RPO measure?',
      options: ['How long recovery takes', 'How much data you can afford to lose', 'Replication factor', 'Partition count'],
      answer: 1,
      explanation: 'Recovery point objective is the acceptable data loss window; recovery time objective is how fast you must recover.',
    },
  },

  [`${K}/event-driven-architecture`]: {
    answer: 'Event-driven architecture is a design style where services publish facts ("order placed") and other services react independently, instead of calling each other and waiting. Kafka is a common backbone. Consumers must be idempotent, and the outbox pattern publishes events reliably alongside database changes.',
    points: [
      'Notification events say something happened; state-transfer events carry the data.',
      'Choreography lets services react; orchestration has one coordinator.',
      'Event-driven architecture is not the same as event sourcing.',
    ],
    example: {
      label: 'An idempotent consumer ignores a redelivered event (simulation)',
      lang: 'python',
      code: `processed_ids = set()
inventory = {"milk": 10}

def on_order_placed(event):
    if event["event_id"] in processed_ids:
        return "duplicate ignored"
    processed_ids.add(event["event_id"])
    inventory[event["item"]] -= event["qty"]
    return f"reserved, milk left {inventory['milk']}"

event = {"event_id": "e-77", "item": "milk", "qty": 2}
print(on_order_placed(event))
print(on_order_placed(event))     # at-least-once delivery sent it again`,
    },
    check: {
      question: 'Why must consumers in an event-driven system be idempotent?',
      options: ['Kafka requires it', 'At-least-once delivery can deliver the same event twice', 'It makes them faster', 'Events are mutable'],
      answer: 1,
      explanation: 'Redelivery is normal; without idempotency a duplicate becomes a double charge or double shipment.',
    },
  },

  [`${K}/cdc-debezium`]: {
    answer: 'Change data capture streams every committed insert, update and delete as an event. Debezium, a Kafka Connect source connector, reads the database\'s own log (PostgreSQL WAL via pgoutput, MySQL binlog) rather than querying tables, so it captures deletes and every change with little load on the source.',
    points: [
      'Polling misses deletes and intermediate changes.',
      'Debezium first snapshots existing rows, then streams changes.',
      'Each event has before, after, op and source fields.',
    ],
    example: {
      label: 'A Debezium PostgreSQL connector config',
      lang: 'json',
      code: `{
  "name": "shop-cdc",
  "config": {
    "connector.class": "io.debezium.connector.postgresql.PostgresConnector",
    "plugin.name": "pgoutput",
    "database.hostname": "db.internal",
    "database.dbname": "shop",
    "table.include.list": "public.orders,public.customers",
    "topic.prefix": "shop"
  }
}`,
      static: true,
    },
    check: {
      question: 'What does Debezium read to capture changes from PostgreSQL?',
      options: ['The tables, every minute', 'The write-ahead log', 'Application logs', 'Database backups'],
      answer: 1,
      explanation: 'It reads the WAL through logical decoding, which records every committed change in order.',
    },
  },

  [`${K}/managed-kafka-cloud`]: {
    answer: 'Managed Kafka services run the brokers for you: Confluent Cloud offers the broadest ecosystem (managed Schema Registry, Connect, ksqlDB), Amazon MSK integrates deeply with AWS IAM and VPCs, and Redpanda and WarpStream are Kafka-compatible alternatives. Strimzi runs Kafka on Kubernetes yourself.',
    points: [
      'Self-hosting costs engineering time: upgrades, on-call, capacity planning.',
      'Compare total cost, including networking and connectors.',
      'Kafka-API compatibility lets you switch with fewer client changes.',
    ],
    example: {
      label: 'Questions to settle before choosing',
      lang: 'text',
      code: `Throughput and retention?        → sizing and price
Cloud and network constraints?    → MSK inside AWS, private links
Need Schema Registry and Connect? → Confluent Cloud bundles them
On-call capacity for brokers?     → self-host only with a platform team`,
      static: true,
    },
    check: {
      question: 'What is the main hidden cost of self-hosting Kafka?',
      options: ['Licence fees', 'Ongoing engineering time for operations', 'Client libraries', 'Topic limits'],
      answer: 1,
      explanation: 'Upgrades, capacity planning, security and on-call are continuing work, not one-off setup.',
    },
  },

  [`${K}/testing-debugging`]: {
    answer: 'Test Kafka code in layers: unit-test business logic as plain functions with no Kafka at all, mock the thin client adapter, run integration tests against a real broker in Docker with Testcontainers, and test Kafka Streams topologies with TopologyTestDriver.',
    points: [
      'Keep logic separate from the Kafka client so it is easy to test.',
      'Testcontainers gives real-broker fidelity in CI.',
      'When debugging, check offsets, lag and keys before code.',
    ],
    example: {
      label: 'Business logic tested with no broker',
      lang: 'python',
      code: `def order_total(event):                      # pure logic, no Kafka client
    return round(sum(i["qty"] * i["price"] for i in event["items"]), 2)

def test_order_total():
    event = {"items": [{"qty": 2, "price": 3.49}, {"qty": 1, "price": 5.99}]}
    assert order_total(event) == 12.97

test_order_total()
print("test passed")`,
    },
    check: {
      question: 'What does Testcontainers provide for Kafka tests?',
      options: ['A mocked client', 'A real broker in Docker for the test', 'A schema linter', 'Load testing'],
      answer: 1,
      explanation: 'It starts a real Kafka container, so integration tests exercise genuine broker behaviour.',
    },
  },

  [`${K}/kafka-interview-system-design`]: {
    answer: 'Kafka design interviews check whether partitioning, delivery semantics, schemas, consumer-group layout and monitoring follow from the requirements. Recurring tools: a keyed topic for per-entity ordering, a compacted topic for current state, separate groups for independent consumers, and a dead letter topic for bad messages.',
    points: [
      'Pick keys from the ordering the business needs.',
      'Choose acks and idempotence from the cost of losing data.',
      'Say how you would detect lag and failures.',
    ],
    example: {
      label: 'A sketch for an order-events platform',
      lang: 'text',
      code: `orders          key=order_id, 12 partitions, RF=3, acks=all, idempotent producer
order-state     compacted, key=order_id (current status)
consumers       billing, email, analytics → one group each
failures        orders.dlq after 3 retries
alerts          under-replicated > 0, billing lag > 10k for 5 min`,
      static: true,
    },
    check: {
      question: 'Several teams each need every order event. How do you lay out consumers?',
      options: ['One group shared by all teams', 'A separate consumer group per team', 'One partition per team', 'Copy the topic per team'],
      answer: 1,
      explanation: 'Each group keeps its own offsets and receives every message; a shared group would split messages between teams.',
    },
  },
}
