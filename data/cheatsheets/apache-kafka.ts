import type { TrackCheatSheet } from '@/lib/cheatsheet'

export const kafkaCheatSheet: TrackCheatSheet = {
  track: 'apache-kafka',
  title: 'Apache Kafka',
  trackHref: '/learn/apache-kafka',
  accent: '#e11d48',
  blurb: 'Topics, clients, delivery, schemas, Connect, and Streams — the Kafka patterns from the track on one page. Bookmark it.',
  sections: [
    {
      title: 'Topics and partitions',
      entries: [
        { label: 'Create and describe', code: `bin/kafka-topics.sh --bootstrap-server localhost:9092 --create --topic orders --partitions 3 --replication-factor 1\nbin/kafka-topics.sh --bootstrap-server localhost:9092 --describe --topic orders\n# KRaft mode needs no ZooKeeper\n# replication-factor cannot exceed the broker count` },
        { label: 'Where a record lives', code: `orders / partition 0 / offset 2\n# offsets start at 0 and grow inside one partition\n# order is guaranteed in that partition only, not across the topic` },
        { label: 'Read from the start', code: `bin/kafka-console-consumer.sh --bootstrap-server localhost:9092 --topic orders --from-beginning\n# without --from-beginning the console consumer starts at the latest offset` },
      ],
    },
    {
      title: 'Producers',
      entries: [
        { label: 'Console produce', code: `bin/kafka-console-producer.sh --bootstrap-server localhost:9092 --topic orders\n# bootstrap.servers only needs enough brokers to learn the leaders\n# the producer then appends to the leader of the chosen partition` },
        { label: 'Safe producer', code: `acks=all\nenable.idempotence=true\nretries=2147483647\ndelivery.timeout.ms=120000\ncompression.type=zstd\nlinger.ms=5\n# delivery.timeout.ms is the cap on retries\n# linger.ms waits so a batch can fill` },
        { label: 'What acks means', code: `acks=0    do not wait; the write can vanish\nacks=1    the leader has it; followers may not\nacks=all  wait for the in-sync replicas\n# consumers pull; brokers do not push` },
      ],
    },
    {
      title: 'Consumers and groups',
      entries: [
        { label: 'Group assignment', code: `orders has 3 partitions\nbilling:    A gets 0 and 1, B gets 2\nanalytics:  C gets 0, 1, and 2\n# one partition goes to one consumer in a group\n# extra members past the partition count sit idle\n# a second group has its own offsets` },
        { label: 'Consume as a group', code: `bin/kafka-console-consumer.sh --bootstrap-server localhost:9092 --topic orders --group billing --from-beginning\n# a second process with --group billing joins and triggers a rebalance` },
        { label: 'Commit after success', code: `enable.auto.commit=false\nmax.poll.interval.ms=300000\n# 1. poll a batch\n# 2. process with an idempotency key, such as order_id + event_type\n# 3. write the result\n# 4. commitSync only after step 3\n# a poison record goes to orders.dlq, then commit the original offset` },
        { label: 'Lag', code: `bin/kafka-consumer-groups.sh --bootstrap-server localhost:9092 --describe --group billing\n# lag is how far the group sits behind the end of each partition\n# committed offsets are stored in __consumer_offsets` },
      ],
    },
    {
      title: 'Keys and ordering',
      entries: [
        { label: 'Produce a key', code: `bin/kafka-console-producer.sh --bootstrap-server localhost:9092 --topic orders --property parse.key=true --property key.separator=:\ncustomer-42:{"order_id":"o1","total":19.5}\n# the same key keeps landing on the same partition` },
        { label: 'Pick the key', code: `events for one customer must stay in order  ->  customer_id\nindependent orders you want spread out      ->  order_id\ncountry on a global app                      ->  one hot partition\n# a null key does not keep entity order\n# more partitions do not fix a low-cardinality key` },
        { label: 'Do not resize casually', code: `# a new partition count remaps keys for records written after the change\n# old records stay on the partition where they were appended\n# a compacted topic needs a stable business key` },
      ],
    },
    {
      title: 'Replication and delivery',
      entries: [
        { label: 'Leader and ISR', code: `bin/kafka-topics.sh --bootstrap-server localhost:9092 --create --topic orders --partitions 6 --replication-factor 3 --config min.insync.replicas=2\n# the leader serves the partition; followers copy it\n# ISR means replicas caught up enough to take over\nunclean.leader.election.enable=false` },
        { label: 'acks with min ISR', code: `acks=all\nmin.insync.replicas=2\n# the write is acknowledged only when enough in-sync replicas have it\n# if the ISR shrinks below 2, the produce fails instead of pretending\n# replication factor 3 is durability, not 3x throughput` },
        { label: 'Three semantics', code: `# at-most-once:  commit, then process  -> a crash can lose the record\n# at-least-once: process, then commit -> a crash can deliver it twice\n# exactly-once inside Kafka: idempotent producer plus a transaction\n# a database outside Kafka still needs its own idempotent write` },
        { label: 'Idempotence and transactions', code: `enable.idempotence=true\ntransactional.id=checkout-1\nisolation.level=read_committed\n# isolation.level is a consumer setting so aborted transactions stay hidden\n# transactional.id stays stable for that producer instance` },
      ],
    },
    {
      title: 'Retention and compaction',
      entries: [
        { label: 'Delete by age', code: `cleanup.policy=delete\nretention.ms=604800000\nretention.bytes=-1\n# 7 days; -1 means no size cap\n# a slow consumer does not stop cleanup\n# replay works only for records retention still holds` },
        { label: 'Latest value per key', code: `cleanup.policy=compact\nmin.cleanable.dirty.ratio=0.5\n# compaction is asynchronous and needs a key\n# cleanup.policy=compact,delete also drops very old segments` },
        { label: 'Tombstone', code: `# key set, value null, on a compacted topic, deletes that key\ncustomer-7\ndelete.retention.ms=86400000\n# the tombstone stays long enough for consumers to observe the delete` },
      ],
    },
    {
      title: 'Schemas',
      entries: [
        { label: 'Avro record', code: `{\n  "type": "record",\n  "name": "Order",\n  "namespace": "app.orders",\n  "fields": [\n    {\n      "name": "order_id",\n      "type": "string"\n    },\n    {\n      "name": "total_usd",\n      "type": "double"\n    },\n    {\n      "name": "coupon_code",\n      "type": [\n        "null",\n        "string"\n      ],\n      "default": null\n    }\n  ]\n}\n# Kafka stores bytes; JSON is easy, Avro and Protobuf are schema-driven` },
        { label: 'Compatible change', code: `# version 1: order_id, total_usd\n# version 2: add coupon_code optional, with a default\n# BACKWARD  new consumers can read old records\n# FORWARD   old consumers can read new records\n# renaming total_usd breaks readers; an optional field usually does not` },
        { label: 'Subject', code: `# TopicNameStrategy stores the value schema as orders-value\n# set compatibility before a second team depends on the topic\n# Schema Registry keeps the version outside the record body` },
      ],
    },
    {
      title: 'Kafka Connect',
      entries: [
        { label: 'Source and sink', code: `# source: a file tail, or Debezium CDC, into a topic\n# sink: a topic out to a file, a database, or object storage\n# distributed workers store config, offsets, and status in internal topics\n# keep transforms small; business rules belong in the consumer or in Streams` },
        { label: 'File sink', code: `{\n  "name": "orders-file-sink",\n  "config": {\n    "connector.class": "org.apache.kafka.connect.file.FileStreamSinkConnector",\n    "tasks.max": "1",\n    "topics": "orders",\n    "file": "/tmp/orders.sink.txt",\n    "key.converter": "org.apache.kafka.connect.storage.StringConverter",\n    "value.converter": "org.apache.kafka.connect.json.JsonConverter",\n    "value.converter.schemas.enable": "false"\n  }\n}` },
        { label: 'Install and status', code: `curl -s -X POST localhost:8083/connectors -H 'Content-Type: application/json' -d @orders-sink.json\ncurl -s localhost:8083/connectors/orders-file-sink/status\n# the connector can exist while one task has failed\n# FileStreamSourceConnector uses topic; the sink uses topics` },
      ],
    },
    {
      title: 'Kafka Streams',
      entries: [
        { label: 'Windowed count', code: `StreamsBuilder builder = new StreamsBuilder();\nKStream<String, String> orders = builder.stream("orders");\norders.filter((storeId, json) -> json != null && !json.startsWith("test"))\n    .groupByKey()\n    .windowedBy(TimeWindows.ofSizeAndGrace(Duration.ofMinutes(5), Duration.ofMinutes(1)))\n    .count(Materialized.as("store-order-counts"))\n    .toStream()\n    .to("store-order-counts");\n// key the input by store_id; this app is a client, not a cluster` },
        { label: 'KStream and KTable', code: `KStream<String, String> orders = builder.stream("orders");\nKTable<String, String> customers = builder.table("customers");\norders.join(customers, (order, customer) -> order + "|" + customer)\n    .to("orders-enriched");\n// both sides use the same key, here customer_id\n// a stream is the history; a table is the latest value per key` },
        { label: 'App config', code: `application.id=store-order-counts\nbootstrap.servers=localhost:9092\nprocessing.guarantee=at_least_once\n# count() keeps a local store backed by a changelog topic\n# exactly_once_v2 is the stronger guarantee, and it still stops at Kafka` },
      ],
    },
    {
      title: 'Security',
      entries: [
        { label: 'TLS listener', code: `listeners=SASL_SSL://:9093\nsecurity.inter.broker.protocol=SASL_SSL\nssl.keystore.location=/var/kafka/kafka.keystore.jks\nssl.keystore.password=<secret>\nssl.truststore.location=/var/kafka/kafka.truststore.jks\nssl.truststore.password=<secret>\nsasl.enabled.mechanisms=SCRAM-SHA-512\nsasl.mechanism.inter.broker.protocol=SCRAM-SHA-512\nauthorizer.class.name=org.apache.kafka.metadata.authorizer.StandardAuthorizer\nallow.everyone.if.no.acl.found=false\nsuper.users=User:admin\n# KRaft authorizer; encrypt clients and broker-to-broker traffic` },
        { label: 'SASL client', code: `security.protocol=SASL_SSL\nsasl.mechanism=SCRAM-SHA-512\nsasl.jaas.config=org.apache.kafka.common.security.scram.ScramLoginModule required username="billing" password="<secret>";\nssl.truststore.location=/etc/kafka/client.truststore.jks\n# one principal per application, and rotate it like a database password` },
        { label: 'Least-privilege ACLs', code: `bin/kafka-acls.sh --bootstrap-server localhost:9093 --command-config admin.properties --add --allow-principal User:checkout --operation Write --operation Describe --topic orders\nbin/kafka-acls.sh --bootstrap-server localhost:9093 --command-config admin.properties --add --allow-principal User:billing --operation Read --operation Describe --topic orders\nbin/kafka-acls.sh --bootstrap-server localhost:9093 --command-config admin.properties --add --allow-principal User:billing --operation Read --group billing\n# no wildcard principal; grant a transactional id only to the producer that uses it` },
      ],
    },
  ],
  projects: [
    { title: 'Local orders topic', level: 'Beginner', build: 'Run one local broker, create an orders topic, produce a few text records, and read them back with --from-beginning. Describe the topic and name the partition and offset of one record.', skills: ['CLI', 'topics', 'partitions', 'offsets'] },
    { title: 'Keyed customer events', level: 'Beginner', build: 'Produce order events keyed by customer_id and confirm the same key stays on one partition. Then key by country and see why that partition gets hot.', skills: ['keys', 'ordering', 'partitioning'] },
    { title: 'Billing consumer group', level: 'Intermediate', build: 'Two consumers in group billing share the orders partitions, commit only after an idempotent write, and send bad records to orders.dlq. Watch lag while a second group reads the same topic on its own.', skills: ['consumer groups', 'commits', 'lag', 'DLQ'] },
    { title: 'Orders file sink', level: 'Intermediate', build: 'Run Connect in distributed mode and sink orders to a file with the built-in file connector. Check task status, then register an order schema and add one optional field without breaking old consumers.', skills: ['Kafka Connect', 'tasks', 'Avro', 'compatibility'] },
    { title: 'Windowed order counts', level: 'Advanced', build: 'A Kafka Streams app filters test orders, counts orders by store in five-minute windows, and writes the counts to a topic. Give the app its own principal with Read on the input, Write on the output, and no wildcard ACLs.', skills: ['Kafka Streams', 'windows', 'state', 'ACLs'] },
  ],
}
