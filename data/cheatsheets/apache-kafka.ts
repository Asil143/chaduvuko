import type { TrackCheatSheet } from '@/lib/cheatsheet'

export const kafkaCheatSheet: TrackCheatSheet = {
  track: 'apache-kafka',
  title: 'Apache Kafka',
  trackHref: '/learn/apache-kafka',
  accent: '#e11d48',
  blurb: 'Topics, partitions, consumers, delivery, retention, schemas, Connect, and Streams — the commands and settings from the Kafka track on one page.',
  sections: [
    {
      title: 'Topics and partitions',
      entries: [
        { label: 'Create a topic', code: `kafka-topics --create --topic orders \\\n  --partitions 6 --replication-factor 3 \\\n  --bootstrap-server localhost:9092` },
        { label: 'What a record is', code: `topic + partition + offset\nkey decides the partition\nvalue is the payload\n# same key stays in order inside one partition` },
        { label: 'Describe', code: `kafka-topics --describe --topic orders \\\n  --bootstrap-server localhost:9092` },
      ],
    },
    {
      title: 'Produce and consume',
      entries: [
        { label: 'Console producer', code: `kafka-console-producer \\\n  --topic orders --bootstrap-server localhost:9092\n# then one JSON object per line` },
        { label: 'Console consumer', code: `kafka-console-consumer --topic orders \\\n  --from-beginning --group demo \\\n  --bootstrap-server localhost:9092` },
        { label: 'Key and acks', code: `acks=all          # wait for the ISR\nacks=1            # leader only\nenable.idempotence=true\n# retries then do not duplicate` },
      ],
    },
    {
      title: 'Groups and offsets',
      entries: [
        { label: 'One group, many members', code: `# partitions are split across members\n# a partition has one consumer in the group\n# add members up to the partition count` },
        { label: 'Commit', code: `enable.auto.commit=false\n# process the record, then commit\n# commit before processing: you can lose it\n# commit after: a crash can redeliver it` },
        { label: 'Where to start', code: `auto.offset.reset=earliest   # new group, no offset yet\nauto.offset.reset=latest     # skip history` },
      ],
    },
    {
      title: 'Replication and retention',
      entries: [
        { label: 'ISR', code: `leader + in-sync replicas = ISR\nmin.insync.replicas=2\nacks=all\n# a write succeeds only if enough replicas have it` },
        { label: 'Keep or compact', code: `retention.ms=604800000          # 7 days\ncleanup.policy=delete\n# or compact: keep the latest value per key\ncleanup.policy=compact` },
        { label: 'Ordering', code: `# order is per partition, not per topic\n# a new key scheme is a new ordering promise\n# do not assume two partitions share a clock` },
      ],
    },
    {
      title: 'Delivery',
      entries: [
        { label: 'Three promises', code: `at-most-once   send and forget, or commit first\nat-least-once  retry, so a consumer may see it twice\nexactly-once   idempotent producer + transactions\n# pick the one the business can stand` },
        { label: 'Consumer idempotency', code: `# store the event id you already applied\n# a second delivery is a no-op\n# at-least-once plus an idempotent write` },
      ],
    },
    {
      title: 'Schemas, Connect, Streams',
      entries: [
        { label: 'Schema', code: `# register a schema, send the id with the bytes\n# consumers reject a breaking change\n# evolve by adding optional fields` },
        { label: 'Connect', code: `# source connector: database → topic\n# sink connector: topic → warehouse\n# the worker runs the connectors; your app does not` },
        { label: 'Streams', code: `builder.stream("orders")\n  .groupByKey()\n  .count()\n  .toStream()\n  .to("orders-count");\n# state lives in a changelog topic` },
      ],
    },
    {
      title: 'Security and ops',
      entries: [
        { label: 'ACL idea', code: `# principal, host, operation, resource\n# allow a group to read one topic\n# deny is not a substitute for a short allow list` },
        { label: 'What to watch', code: `under-replicated partitions\nconsumer lag, by group and partition\nrequest rate and produce latency\n# lag is the work not yet read` },
      ],
    },
  ],
  projects: [
    { title: 'Orders topic on your laptop', level: 'Beginner', build: 'Create a topic with 3 partitions, produce ten keyed orders, and consume them with a group. Restart the consumer and show that committed offsets are not read again.', skills: ['topics', 'keys', 'consumer groups'] },
    { title: 'Same key, same partition', level: 'Beginner', build: 'Produce the same customer id many times and print the partition. Explain why that customer’s events stay in order and another customer’s may not.', skills: ['partitioning', 'ordering', 'keys'] },
    { title: 'At-least-once inbox', level: 'Intermediate', build: 'A consumer writes each event id to a table before it applies the change. Crash it mid-batch and show the replay does not double-apply.', skills: ['offsets', 'idempotency', 'delivery'] },
    { title: 'Compacted profile topic', level: 'Intermediate', build: 'A topic of user profiles with cleanup.policy=compact. Update one user three times and show a new consumer sees the latest value for that key.', skills: ['compaction', 'keys', 'retention'] },
    { title: 'Connect plus a count', level: 'Advanced', build: 'A source connector lands changes on a topic. A Kafka Streams job counts them by key into another topic, and you graph consumer lag while you stop one instance.', skills: ['Connect', 'Streams', 'lag'] },
  ],
}
