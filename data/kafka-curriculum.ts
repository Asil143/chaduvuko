export type KafkaModuleStatus = 'live' | 'soon'

export interface KafkaLesson {
  id: number
  slug: string
  title: string
  description: string
  tags: string[]
  status: KafkaModuleStatus
  readTime: string
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced'
  plainEnglish: string
  analogy: string
  coreIdeas: string[]
  walkthrough: string[]
  exampleTitle: string
  example: string
  commonMistakes: string[]
  advancedNotes: string[]
  checklist: string[]
  takeaways: string[]
}

export interface KafkaSection {
  id: number
  title: string
  color: string
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced'
  modules: KafkaLesson[]
}

export const KAFKA_CURRICULUM: KafkaSection[] = [
  {
    id: 1,
    title: 'Kafka From Zero',
    color: '#f97316',
    difficulty: 'Beginner',
    modules: [
      {
        id: 1,
        slug: 'what-is-apache-kafka',
        title: 'What is Apache Kafka?',
        description: 'Kafka explained without jargon: events, streams, producers, consumers, and why companies use it.',
        tags: ['Events', 'Streams', 'Producers', 'Consumers', 'Real-time data'],
        status: 'live',
        readTime: '14-18 min',
        difficulty: 'Beginner',
        plainEnglish: 'Apache Kafka is a durable event streaming platform. Apps write facts such as "order created" or "payment failed" into Kafka, and many other apps can read those facts at their own pace.',
        analogy: 'Think of Kafka as a shared company notebook that records every important business event in order. Teams do not interrupt each other with phone calls; they read the notebook whenever they need the latest facts.',
        coreIdeas: [
          'An event is a recorded fact that already happened.',
          'A stream is a continuously growing sequence of events.',
          'A producer writes events to Kafka.',
          'A consumer reads events from Kafka.',
          'Kafka keeps events for a configured time or size, so more than one consumer can read the same history.',
        ],
        walkthrough: [
          'A checkout service writes an OrderCreated event.',
          'Kafka stores that event in a topic called orders.',
          'The billing service reads the event and charges the card.',
          'The warehouse service reads the same event and prepares the package.',
          'The analytics team can read the event later without asking checkout to send it again.',
        ],
        exampleTitle: 'One Event, Many Readers',
        example: `OrderCreated
  order_id: 1024
  customer_id: 88
  total_usd: 149.00

Billing reads it -> charge payment
Warehouse reads it -> pick items
Analytics reads it -> update dashboard`,
        commonMistakes: [
          'Thinking Kafka is only a queue. Kafka can behave like a queue for a consumer group, but it also keeps a log that multiple groups can replay.',
          'Thinking Kafka processes data by itself. Kafka stores and moves events; Kafka Streams, Flink, Spark, or applications do the processing.',
        ],
        advancedNotes: [
          'Kafka is built around an append-only commit log. Appending is fast, sequential, and easy to replicate.',
          'Kafka is best when many systems need the same stream of facts without tightly coupling to each other.',
        ],
        checklist: [
          'Can you explain the difference between an event and a request?',
          'Can you name one producer and two consumers in a shopping app?',
          'Can you explain why replaying old events is useful?',
        ],
        takeaways: [
          'Kafka stores ordered streams of events.',
          'Producers write; consumers read.',
          'Kafka decouples systems because writers and readers do not need to know about each other.',
        ],
      },
      {
        id: 2,
        slug: 'events-topics-partitions',
        title: 'Events, Topics, and Partitions',
        description: 'The three words every Kafka learner must understand before touching code.',
        tags: ['Event', 'Topic', 'Partition', 'Offset', 'Ordering'],
        status: 'live',
        readTime: '16-20 min',
        difficulty: 'Beginner',
        plainEnglish: 'A topic is a named stream, like orders or payments. A partition is one ordered lane inside that topic. Each event gets a position number called an offset.',
        analogy: 'A topic is a highway name. Partitions are lanes. Events are cars. Offset numbers are mile markers showing where each car appears in its lane.',
        coreIdeas: [
          'Topics group related events.',
          'Partitions let Kafka spread one topic across multiple brokers and consumers.',
          'Ordering is guaranteed inside one partition, not across every partition in a topic.',
          'Offsets are per partition, starting at 0 and increasing as events arrive.',
          'A message key controls which partition usually receives the event.',
        ],
        walkthrough: [
          'Create an orders topic with three partitions.',
          'Events with customer_id 42 use the same key and land in the same partition.',
          'Kafka appends each event to the end of that partition log.',
          'Consumers track offsets so they know the next event to read.',
        ],
        exampleTitle: 'Topic Layout',
        example: `orders topic
  partition 0: offset 0, offset 1, offset 2
  partition 1: offset 0, offset 1
  partition 2: offset 0, offset 1, offset 2, offset 3

Ordering is reliable inside each partition lane.`,
        commonMistakes: [
          'Expecting total ordering across all partitions. Kafka only guarantees order within a single partition.',
          'Creating too many partitions without reason. Partitions improve parallelism, but they also add metadata, files, and operational overhead.',
        ],
        advancedNotes: [
          'Partition count is a design decision because increasing it later can change key-to-partition mapping.',
          'A compacted topic can retain the latest value per key instead of only retaining by time or size.',
        ],
        checklist: [
          'Can you identify the topic, partition, and offset in a record location?',
          'Can you explain why keyed events preserve customer-level order?',
          'Can you explain why partitions enable parallel consumers?',
        ],
        takeaways: [
          'A topic is split into partitions.',
          'Offsets identify positions inside partitions.',
          'Use keys when related events must stay ordered together.',
        ],
      },
      {
        id: 3,
        slug: 'producers-consumers-brokers',
        title: 'Producers, Consumers, and Brokers',
        description: 'Who writes data, who reads data, and who stores it safely.',
        tags: ['Producer', 'Consumer', 'Broker', 'Cluster', 'Client'],
        status: 'live',
        readTime: '15-19 min',
        difficulty: 'Beginner',
        plainEnglish: 'A broker is a Kafka server. A cluster is a group of brokers. Producers send records to brokers; consumers fetch records from brokers.',
        analogy: 'Kafka brokers are library branches. Producers deliver new books. Consumers borrow copies of books. The library catalog helps everyone find the right shelf.',
        coreIdeas: [
          'Brokers store topic partitions on disk.',
          'Producers choose a topic and send records to the leader broker for the target partition.',
          'Consumers ask brokers for records and control their own read pace.',
          'A Kafka cluster survives failures by replicating partitions across brokers.',
          'Clients talk to bootstrap servers first, then learn the full cluster metadata.',
        ],
        walkthrough: [
          'A producer connects to one bootstrap broker.',
          'The broker returns metadata: topics, partitions, and current leaders.',
          'The producer sends the record to the partition leader.',
          'A consumer connects, fetches records, processes them, and commits its position.',
        ],
        exampleTitle: 'Minimal Client Flow',
        example: `producer -> bootstrap broker -> cluster metadata
producer -> partition leader -> append record
consumer -> partition leader -> fetch records
consumer -> __consumer_offsets -> commit progress`,
        commonMistakes: [
          'Thinking bootstrap.servers must list every broker. It only needs enough reachable brokers to discover cluster metadata.',
          'Thinking brokers push events to consumers. Kafka consumers pull, which helps them control backpressure.',
        ],
        advancedNotes: [
          'The metadata path matters during incidents: stale metadata can cause temporary NotLeaderOrFollower errors while clients refresh.',
          'A broker can lead some partitions while following replicas for others.',
        ],
        checklist: [
          'Can you describe the role of a broker?',
          'Can you explain why clients need metadata?',
          'Can you explain why consumers pull instead of Kafka pushing?',
        ],
        takeaways: [
          'Brokers store partitions.',
          'Producers append records; consumers fetch records.',
          'Kafka clients discover partition leaders through cluster metadata.',
        ],
      },
      {
        id: 4,
        slug: 'local-setup-cli',
        title: 'Local Setup and Kafka CLI',
        description: 'Install Kafka locally, create a topic, produce messages, and consume them safely.',
        tags: ['Install', 'CLI', 'KRaft', 'Topics', 'Console tools'],
        status: 'live',
        readTime: '18-24 min',
        difficulty: 'Beginner',
        plainEnglish: 'The fastest way to learn Kafka is to run one local broker, create one topic, type a few messages, and read them back.',
        analogy: 'Before learning traffic engineering, first stand beside one road and watch cars enter and leave. The CLI gives you that simple roadside view.',
        coreIdeas: [
          'Modern Kafka can run without ZooKeeper using KRaft mode.',
          'The CLI tools are useful for learning, debugging, and operations.',
          'A local broker is not a production cluster, but it teaches the same vocabulary.',
          'Console producer writes text records; console consumer reads them.',
          'Topics can be created manually or automatically if the cluster allows it.',
        ],
        walkthrough: [
          'Start a local Kafka broker using the official distribution or a container.',
          'Create a topic named orders.',
          'Use kafka-console-producer.sh to type messages.',
          'Use kafka-console-consumer.sh with --from-beginning to replay from offset 0.',
        ],
        exampleTitle: 'First CLI Session',
        example: `bin/kafka-topics.sh --bootstrap-server localhost:9092 \\
  --create --topic orders --partitions 3 --replication-factor 1

bin/kafka-console-producer.sh --bootstrap-server localhost:9092 --topic orders
order-1
order-2

bin/kafka-console-consumer.sh --bootstrap-server localhost:9092 \\
  --topic orders --from-beginning`,
        commonMistakes: [
          'Using replication-factor 3 on a one-broker local cluster. That cannot work because there are not three brokers to hold replicas.',
          'Forgetting --from-beginning and thinking messages disappeared. The consumer starts at the latest offset unless configured otherwise.',
        ],
        advancedNotes: [
          'KRaft replaced ZooKeeper for Kafka metadata management in modern Kafka deployments.',
          'Local CLI testing should never be treated as proof of production readiness because it lacks real replication, security, and load.',
        ],
        checklist: [
          'Can you create a topic from the CLI?',
          'Can you produce and consume a message?',
          'Can you explain why local replication-factor is usually 1?',
        ],
        takeaways: [
          'CLI tools make Kafka concrete.',
          'Use --from-beginning when you want to replay old records.',
          'One local broker is enough to learn concepts, not enough for production resilience.',
        ],
      },
    ],
  },
  {
    id: 2,
    title: 'Core Kafka Mechanics',
    color: '#06b6d4',
    difficulty: 'Intermediate',
    modules: [
      {
        id: 5,
        slug: 'consumer-groups-offsets',
        title: 'Consumer Groups and Offsets',
        description: 'How Kafka scales readers, remembers progress, and rebalances work.',
        tags: ['Consumer group', 'Offset commit', 'Rebalance', 'Lag', '__consumer_offsets'],
        status: 'live',
        readTime: '18-24 min',
        difficulty: 'Intermediate',
        plainEnglish: 'A consumer group is a team of consumers sharing work. Each partition is read by only one member of the group at a time, and Kafka stores the group position as committed offsets.',
        analogy: 'Imagine a team reading a stack of numbered forms. Each person owns certain stacks. When someone leaves, the remaining people divide the abandoned stacks.',
        coreIdeas: [
          'Consumer groups provide horizontal scaling for reads.',
          'One partition can be assigned to only one consumer in the same group.',
          'Different groups can independently read the same topic.',
          'Offsets are committed to remember progress.',
          'Consumer lag is the distance between the latest record and the group committed or current position.',
        ],
        walkthrough: [
          'Start one consumer in group billing.',
          'Kafka assigns all partitions to that consumer.',
          'Start a second consumer in the same group.',
          'Kafka rebalances partitions so both consumers share the work.',
          'Start another group named analytics and it reads the topic independently.',
        ],
        exampleTitle: 'Group Assignment',
        example: `orders has 3 partitions

billing group:
  consumer A -> partition 0, partition 1
  consumer B -> partition 2

analytics group:
  consumer C -> partition 0, partition 1, partition 2`,
        commonMistakes: [
          'Adding more consumers than partitions and expecting all to work. Extra consumers in the same group sit idle.',
          'Committing offsets before processing is safely finished. That can lose work after a crash.',
        ],
        advancedNotes: [
          'Cooperative rebalancing reduces stop-the-world disruption compared with older eager rebalancing.',
          'Static group membership can reduce churn for stable deployments.',
        ],
        checklist: [
          'Can you explain why partitions limit parallelism inside one group?',
          'Can you explain what consumer lag measures?',
          'Can you describe when to commit offsets?',
        ],
        takeaways: [
          'Consumer groups split partition work.',
          'Offsets are progress markers.',
          'Lag is one of the first Kafka health signals to watch.',
        ],
      },
      {
        id: 6,
        slug: 'replication-leaders-isr',
        title: 'Replication, Leaders, and ISR',
        description: 'How Kafka keeps data available when brokers fail.',
        tags: ['Replication', 'Leader', 'Follower', 'ISR', 'acks'],
        status: 'live',
        readTime: '20-26 min',
        difficulty: 'Intermediate',
        plainEnglish: 'Kafka copies each partition to multiple brokers. One replica is the leader for reads and writes. In-sync replicas, called ISR, are caught up enough to become safe leaders if the current leader fails.',
        analogy: 'A team keeps copies of the same checklist. One person writes the official copy. Others copy it quickly. If the official writer leaves, a caught-up copy holder takes over.',
        coreIdeas: [
          'Replication factor controls how many broker copies a partition has.',
          'The leader handles client reads and writes for a partition.',
          'Followers replicate data from the leader.',
          'ISR means in-sync replica set.',
          'acks=all waits for the configured in-sync replicas before confirming a write.',
        ],
        walkthrough: [
          'Create a topic with replication factor 3.',
          'Kafka places replicas on three brokers.',
          'A producer writes to the leader.',
          'Followers fetch and append the same record.',
          'If the leader fails, Kafka elects a new leader from the ISR.',
        ],
        exampleTitle: 'Replica Placement',
        example: `orders partition 0
  broker 1: leader
  broker 2: follower, in sync
  broker 3: follower, in sync

Producer with acks=all waits for the required in-sync replicas.`,
        commonMistakes: [
          'Thinking replication factor 3 means three times the throughput. It means three copies for durability and availability.',
          'Using acks=0 for important business events. The producer may never learn that a write failed.',
        ],
        advancedNotes: [
          'min.insync.replicas works with acks=all to prevent acknowledged writes when too few replicas are healthy.',
          'Unclean leader election can improve availability but risks data loss, so it is usually disabled for critical data.',
        ],
        checklist: [
          'Can you define leader, follower, and ISR?',
          'Can you explain why acks=all matters?',
          'Can you explain the tradeoff in unclean leader election?',
        ],
        takeaways: [
          'Replication protects Kafka from broker failure.',
          'Leaders serve partition traffic.',
          'ISR determines which replicas are safe takeover candidates.',
        ],
      },
      {
        id: 7,
        slug: 'keys-ordering-partitioning',
        title: 'Keys, Ordering, and Partitioning Strategy',
        description: 'Design keys so related events stay ordered without creating hot partitions.',
        tags: ['Keys', 'Ordering', 'Partitioner', 'Hot partition', 'Skew'],
        status: 'live',
        readTime: '18-24 min',
        difficulty: 'Intermediate',
        plainEnglish: 'A key is the value Kafka uses to pick a partition. Good keys keep related events together. Bad keys overload one partition or break the order your business needs.',
        analogy: 'If a call center routes all VIP customers to one desk, that desk becomes overloaded. If it routes one customer to different desks every time, nobody has the full story.',
        coreIdeas: [
          'Same key usually maps to the same partition.',
          'Ordering is only guaranteed for records in the same partition.',
          'High-cardinality keys spread load better than low-cardinality keys.',
          'Null keys may be distributed without preserving entity order.',
          'Changing partition count can change key mapping for new records.',
        ],
        walkthrough: [
          'Choose order_id if each order is independent.',
          'Choose customer_id if customer actions must be processed in sequence.',
          'Avoid country as a key if most traffic comes from one country.',
          'Monitor partition-level throughput to catch skew early.',
        ],
        exampleTitle: 'Choosing a Key',
        example: `Need all events for one customer in order?
  key = customer_id

Need spread across many independent orders?
  key = order_id

Bad key for global app:
  key = country
  result: US partition may become too hot`,
        commonMistakes: [
          'Using a timestamp as a key when entity order matters. Nearby times do not group related business events.',
          'Assuming more partitions fixes a bad low-cardinality key. If one key dominates, it still maps to one partition.',
        ],
        advancedNotes: [
          'Custom partitioners can solve special routing needs, but they make behavior harder for new engineers to predict.',
          'Compacted topics usually need stable business keys because compaction keeps the latest value for each key.',
        ],
        checklist: [
          'Can you state what must be ordered?',
          'Can you estimate key cardinality?',
          'Can you identify a hot partition risk?',
        ],
        takeaways: [
          'Keys control partition placement.',
          'Ordering and scaling are connected design choices.',
          'A good key matches the business entity that needs ordered processing.',
        ],
      },
      {
        id: 8,
        slug: 'retention-compaction',
        title: 'Retention and Log Compaction',
        description: 'Why Kafka can replay history, expire old events, or keep the latest value per key.',
        tags: ['Retention', 'Compaction', 'Tombstone', 'Replay', 'Storage'],
        status: 'live',
        readTime: '18-24 min',
        difficulty: 'Intermediate',
        plainEnglish: 'Retention decides how long Kafka keeps records. Compaction is a special cleanup mode that keeps the latest record for each key instead of simply deleting by age.',
        analogy: 'Retention is throwing away receipts older than 30 days. Compaction is keeping only the latest address card for every customer.',
        coreIdeas: [
          'Kafka stores records after consumers read them.',
          'Time retention deletes segments older than a configured time.',
          'Size retention limits disk usage by topic or partition.',
          'Compaction keeps the latest value for each key.',
          'A tombstone is a key with a null value used to delete compacted state.',
        ],
        walkthrough: [
          'Use delete retention for clickstream events that age out.',
          'Use compaction for customer profiles where latest state matters.',
          'Use both policies when you need latest state plus a bounded history.',
          'Watch disk usage because slow consumers do not stop retention cleanup.',
        ],
        exampleTitle: 'Compacted Customer Topic',
        example: `customer-7 -> email=a@example.com
customer-8 -> email=b@example.com
customer-7 -> email=new@example.com

After compaction, Kafka can keep:
customer-8 -> email=b@example.com
customer-7 -> email=new@example.com`,
        commonMistakes: [
          'Assuming Kafka keeps data forever. Retention is configurable and production topics often expire records.',
          'Using compaction without keys. Compaction needs keys to know which records replace older records.',
        ],
        advancedNotes: [
          'Compaction is asynchronous, so older duplicate keys can remain until cleanup runs.',
          'Segment size affects when retention and compaction can clean data because Kafka cleans closed log segments.',
        ],
        checklist: [
          'Can you choose delete vs compact for a topic?',
          'Can you explain tombstones?',
          'Can you explain why replay depends on retention?',
        ],
        takeaways: [
          'Retention controls how long history remains.',
          'Compaction keeps latest state per key.',
          'Replay is only possible for records Kafka still has.',
        ],
      },
      {
        id: 9,
        slug: 'delivery-semantics',
        title: 'Delivery Semantics: At-Most, At-Least, Exactly-Once',
        description: 'What delivery guarantees really mean, without marketing fog.',
        tags: ['At-most-once', 'At-least-once', 'Exactly-once', 'Duplicates', 'Idempotency'],
        status: 'live',
        readTime: '20-28 min',
        difficulty: 'Intermediate',
        plainEnglish: 'Delivery semantics describe what can happen during failure: lose a message, process it more than once, or coordinate processing so Kafka-side results are exactly once.',
        analogy: 'Mailing a bill with no receipt may lose it. Mailing until you get a receipt may send duplicates. Using a tracked payment system can make the final account update happen once.',
        coreIdeas: [
          'At-most-once can lose records but avoids duplicates.',
          'At-least-once avoids loss but can create duplicates.',
          'Exactly-once in Kafka depends on idempotent producers and transactions for supported Kafka workflows.',
          'External systems still need idempotent writes or deduplication.',
          'Most business systems prefer at-least-once plus idempotent processing.',
        ],
        walkthrough: [
          'If a consumer commits before processing and then crashes, work can be lost.',
          'If it processes then crashes before commit, the work may happen twice.',
          'Idempotency makes retrying safe.',
          'Transactions can atomically consume, process, and produce to Kafka topics in supported designs.',
        ],
        exampleTitle: 'Safe Consumer Shape',
        example: `1. Read record
2. Process with an idempotency key, such as order_id + event_type
3. Write result safely
4. Commit offset only after step 3 succeeds`,
        commonMistakes: [
          'Believing exactly-once means every external database write is automatically exactly once. Kafka cannot control every outside system.',
          'Ignoring duplicates. Even well-designed distributed systems can retry after ambiguous failures.',
        ],
        advancedNotes: [
          'enable.idempotence=true prevents duplicate records caused by producer retries for a single producer session.',
          'Transactional IDs let Kafka fence old producers and coordinate consumed offsets with produced output records.',
        ],
        checklist: [
          'Can you explain the failure window around offset commits?',
          'Can you define idempotency in one sentence?',
          'Can you say what Kafka transactions do and do not cover?',
        ],
        takeaways: [
          'At-least-once is common and practical.',
          'Idempotency is a core Kafka application skill.',
          'Exactly-once has precise boundaries; understand them before promising it.',
        ],
      },
    ],
  },
  {
    id: 3,
    title: 'Building Kafka Applications',
    color: '#22c55e',
    difficulty: 'Intermediate',
    modules: [
      {
        id: 10,
        slug: 'schemas-serialization',
        title: 'Serialization and Schema Design',
        description: 'JSON, Avro, Protobuf, schema evolution, and compatibility rules.',
        tags: ['JSON', 'Avro', 'Protobuf', 'Schema Registry', 'Compatibility'],
        status: 'live',
        readTime: '20-26 min',
        difficulty: 'Intermediate',
        plainEnglish: 'Serialization is how your event becomes bytes. A schema is the contract that tells readers what those bytes mean.',
        analogy: 'A schema is the form template. Serialization is scanning the completed form into a compact file. Without the template, the file is hard to interpret correctly.',
        coreIdeas: [
          'Kafka stores bytes; applications decide the data format.',
          'JSON is easy to read but larger and loosely controlled.',
          'Avro and Protobuf are compact and schema-driven.',
          'Schema compatibility prevents producers from breaking consumers.',
          'Schema Registry stores schemas and versions outside Kafka records.',
        ],
        walkthrough: [
          'Start with a clear event name and business meaning.',
          'Define required and optional fields.',
          'Choose a serialization format.',
          'Set compatibility rules before multiple teams depend on the topic.',
          'Evolve schemas by adding optional fields instead of renaming fields suddenly.',
        ],
        exampleTitle: 'Compatible Change',
        example: `Version 1:
  order_id: string
  total_usd: double

Version 2:
  order_id: string
  total_usd: double
  coupon_code: optional string

Adding an optional field is usually safer than renaming total_usd.`,
        commonMistakes: [
          'Treating event fields like private code variables. Once published, consumers may depend on them.',
          'Putting huge blobs into Kafka records. Store large files elsewhere and send references when possible.',
        ],
        advancedNotes: [
          'Backward compatibility means new consumers can read old data; forward compatibility means old consumers can read new data.',
          'Subject naming strategy matters when many topics share event types.',
        ],
        checklist: [
          'Can old consumers survive your schema change?',
          'Can new consumers replay old records?',
          'Is each field named as a business fact rather than an implementation detail?',
        ],
        takeaways: [
          'Kafka records are bytes, so schemas matter.',
          'Compatibility rules protect consumers.',
          'Good event design is a long-term contract.',
        ],
      },
      {
        id: 11,
        slug: 'producer-design',
        title: 'Producer Design',
        description: 'Batching, compression, retries, acks, idempotence, and safe producer defaults.',
        tags: ['acks', 'Retries', 'Batching', 'Compression', 'Idempotent producer'],
        status: 'live',
        readTime: '20-26 min',
        difficulty: 'Intermediate',
        plainEnglish: 'A Kafka producer is not just a send button. It batches records, retries failures, compresses data, and decides how much confirmation is required before a write counts as successful.',
        analogy: 'A delivery driver can carry one envelope at a time or wait briefly to fill a bag. Waiting improves efficiency, but urgent envelopes may need faster handling.',
        coreIdeas: [
          'acks controls how many broker confirmations the producer waits for.',
          'Retries handle temporary network and leader changes.',
          'Idempotent producers reduce duplicates from retries.',
          'Batching improves throughput but can add a small delay.',
          'Compression lowers network and disk cost for many workloads.',
        ],
        walkthrough: [
          'Use acks=all for important records.',
          'Enable idempotence for safer retries.',
          'Tune linger.ms and batch.size for throughput-sensitive workloads.',
          'Use compression such as lz4, snappy, or zstd after measuring.',
          'Record producer errors instead of silently dropping events.',
        ],
        exampleTitle: 'Safe Producer Settings',
        example: `acks=all
enable.idempotence=true
retries=2147483647
delivery.timeout.ms=120000
compression.type=zstd
linger.ms=5`,
        commonMistakes: [
          'Setting retries without understanding delivery timeout. Retries stop when the delivery timeout is reached.',
          'Optimizing for benchmark throughput before defining durability requirements.',
        ],
        advancedNotes: [
          'max.in.flight.requests.per.connection interacts with ordering and idempotence in older client versions.',
          'Producer metrics such as record-error-rate, request-latency-avg, and batch-size-avg reveal most client-side issues.',
        ],
        checklist: [
          'Is data loss acceptable for this topic?',
          'Have you enabled idempotence for important producers?',
          'Are batching and compression measured under realistic load?',
        ],
        takeaways: [
          'Producer settings encode business risk.',
          'acks=all plus idempotence is a strong default for important data.',
          'Batching and compression are throughput tools, not magic switches.',
        ],
      },
      {
        id: 12,
        slug: 'consumer-design',
        title: 'Consumer Design',
        description: 'Polling, processing, commits, retries, dead-letter topics, and backpressure.',
        tags: ['Poll loop', 'Manual commit', 'DLQ', 'Retries', 'Backpressure'],
        status: 'live',
        readTime: '20-28 min',
        difficulty: 'Intermediate',
        plainEnglish: 'A consumer is a careful loop: fetch records, process them safely, handle failures, then commit progress only when it is safe.',
        analogy: 'A teacher grades papers from a stack. They should mark a paper complete only after grading it, not when they first pick it up.',
        coreIdeas: [
          'Consumers poll Kafka for batches of records.',
          'Processing time must stay within group timing settings or rebalances can happen.',
          'Manual commits give more control than auto commits.',
          'Poison messages need a plan: retry, skip, or dead-letter.',
          'Backpressure protects downstream systems from overload.',
        ],
        walkthrough: [
          'Poll records in batches.',
          'Validate each record.',
          'Process records idempotently.',
          'Send permanently bad records to a dead-letter topic with error context.',
          'Commit offsets after successful processing.',
        ],
        exampleTitle: 'Consumer Failure Flow',
        example: `record arrives
  -> validation fails
  -> produce to orders.dlq with error reason
  -> commit original offset

temporary database outage
  -> retry with backoff
  -> pause partitions if needed
  -> resume when healthy`,
        commonMistakes: [
          'Leaving enable.auto.commit=true for workflows that write to databases or call APIs.',
          'Retrying poison messages forever and blocking the entire partition.',
        ],
        advancedNotes: [
          'pause and resume let consumers apply backpressure per partition.',
          'max.poll.interval.ms protects the group from consumers that stop polling while still holding assignments.',
        ],
        checklist: [
          'What happens to a malformed event?',
          'When exactly do you commit offsets?',
          'How does the consumer behave when the downstream database is slow?',
        ],
        takeaways: [
          'Commit only after safe processing.',
          'Dead-letter topics make bad data visible instead of invisible.',
          'Consumers need backpressure and retry design.',
        ],
      },
      {
        id: 13,
        slug: 'kafka-connect',
        title: 'Kafka Connect',
        description: 'Move data between Kafka and databases, files, search engines, and cloud systems.',
        tags: ['Kafka Connect', 'Source connector', 'Sink connector', 'Tasks', 'CDC'],
        status: 'live',
        readTime: '20-26 min',
        difficulty: 'Intermediate',
        plainEnglish: 'Kafka Connect is Kafka’s integration framework. Instead of writing custom code for every database or storage system, you configure connectors.',
        analogy: 'Connect is a set of adapters. Instead of rewiring every appliance by hand, you use the right adapter for the outlet.',
        coreIdeas: [
          'Source connectors bring data into Kafka.',
          'Sink connectors write Kafka data to external systems.',
          'Workers run connectors and tasks.',
          'Distributed mode provides scaling and fault tolerance.',
          'Transforms can make small record changes, but heavy business logic belongs elsewhere.',
        ],
        walkthrough: [
          'Run a Connect worker cluster.',
          'Install a connector plugin such as JDBC, S3, Elasticsearch, or Debezium.',
          'Create connector configuration through the REST API.',
          'Monitor task status and connector lag.',
          'Handle schema and error tolerance deliberately.',
        ],
        exampleTitle: 'Connector Categories',
        example: `Source:
  PostgreSQL CDC -> Kafka topic
  File tail -> Kafka topic

Sink:
  Kafka topic -> S3 data lake
  Kafka topic -> Elasticsearch index`,
        commonMistakes: [
          'Using Connect transforms for complex business rules. Keep Connect focused on movement and light shaping.',
          'Ignoring connector task failures. A connector can exist while one or more tasks are failed.',
        ],
        advancedNotes: [
          'Connect stores connector config, offsets, and status in internal Kafka topics.',
          'Exactly-once support depends on connector type, Kafka version, and target system behavior.',
        ],
        checklist: [
          'Is this source or sink connector?',
          'Where are connector offsets stored?',
          'How will failed records be reported and replayed?',
        ],
        takeaways: [
          'Kafka Connect reduces custom integration code.',
          'Connectors run as scalable tasks.',
          'Monitor task health, not just connector existence.',
        ],
      },
      {
        id: 14,
        slug: 'stream-processing-kafka-streams',
        title: 'Stream Processing and Kafka Streams',
        description: 'Filter, join, aggregate, and enrich Kafka events in real time.',
        tags: ['Kafka Streams', 'KTable', 'State store', 'Window', 'Join'],
        status: 'live',
        readTime: '22-30 min',
        difficulty: 'Intermediate',
        plainEnglish: 'Stream processing turns raw events into useful results continuously. Kafka Streams is a Java library for building these processors directly on Kafka.',
        analogy: 'Raw events are ingredients moving on a conveyor belt. Stream processing is the kitchen station that chops, combines, cooks, and sends out finished dishes.',
        coreIdeas: [
          'A stream is an unbounded sequence of events.',
          'Kafka Streams applications are normal client applications, not a separate cluster.',
          'KStream represents event history; KTable represents changing state.',
          'State stores keep local processing state and are backed by changelog topics.',
          'Windows group events by time for counts, sums, and joins.',
        ],
        walkthrough: [
          'Read orders from an input topic.',
          'Filter out test orders.',
          'Group by store_id.',
          'Count orders in five-minute windows.',
          'Write the rolling count to an output topic.',
        ],
        exampleTitle: 'Stream Processing Shape',
        example: `orders stream
  -> filter valid orders
  -> group by store_id
  -> window by 5 minutes
  -> count
  -> store-order-counts topic`,
        commonMistakes: [
          'Treating stream processing like a nightly batch job. Late events, event time, and state size must be designed.',
          'Forgetting that local state needs changelog topics for recovery.',
        ],
        advancedNotes: [
          'Event-time processing uses timestamps in events rather than wall-clock processing time.',
          'Interactive queries can expose local state, but routing requests to the right instance needs extra design.',
        ],
        checklist: [
          'Do you need event time or processing time?',
          'What state does the processor keep?',
          'How will late events affect the result?',
        ],
        takeaways: [
          'Stream processing continuously transforms event streams.',
          'Kafka Streams is a library backed by Kafka topics.',
          'State, windows, and time semantics are the hard parts.',
        ],
      },
    ],
  },
  {
    id: 4,
    title: 'Operations, Security, and Scale',
    color: '#8b5cf6',
    difficulty: 'Advanced',
    modules: [
      {
        id: 15,
        slug: 'security-acls-sasl-tls',
        title: 'Kafka Security: TLS, SASL, and ACLs',
        description: 'Encrypt traffic, authenticate clients, and authorize topic access.',
        tags: ['TLS', 'SASL', 'ACL', 'mTLS', 'Authorization'],
        status: 'live',
        readTime: '22-30 min',
        difficulty: 'Advanced',
        plainEnglish: 'Kafka security answers three questions: is the connection encrypted, who is this client, and what is this client allowed to do?',
        analogy: 'A secure office has locked doors, employee badges, and room permissions. TLS is the locked hallway, SASL or certificates identify the person, ACLs decide which rooms they can enter.',
        coreIdeas: [
          'TLS encrypts network traffic between clients and brokers.',
          'Authentication proves client identity using mechanisms such as SASL or client certificates.',
          'ACLs authorize operations such as Read, Write, Create, and Describe.',
          'Principals should map to applications or teams, not shared everyone accounts.',
          'Secrets must be rotated and protected like database credentials.',
        ],
        walkthrough: [
          'Enable TLS listeners for encrypted client traffic.',
          'Choose an authentication mechanism supported by your platform.',
          'Create separate principals for producers, consumers, and Connect workers.',
          'Grant the smallest topic and group permissions needed.',
          'Audit denied operations and remove unused permissions.',
        ],
        exampleTitle: 'Permission Thinking',
        example: `checkout-producer:
  Write orders
  Describe orders

billing-consumer:
  Read orders
  Read group billing
  Describe orders`,
        commonMistakes: [
          'Giving every service wildcard access. It is easy today and painful after the first incident.',
          'Encrypting public client traffic but leaving broker-to-broker traffic unprotected in shared networks.',
        ],
        advancedNotes: [
          'Kafka ACLs are resource-pattern based; prefixed ACLs can simplify topic families but require discipline.',
          'Managed Kafka platforms often integrate Kafka authentication with cloud IAM, but the same identity and least-privilege principles apply.',
        ],
        checklist: [
          'Is traffic encrypted?',
          'Can you identify each application separately?',
          'Does each principal have only the operations it needs?',
        ],
        takeaways: [
          'Kafka security is encryption plus authentication plus authorization.',
          'Use least privilege for topics, groups, and transactional IDs.',
          'Treat Kafka credentials as production secrets.',
        ],
      },
      {
        id: 16,
        slug: 'monitoring-observability',
        title: 'Monitoring and Observability',
        description: 'Metrics, logs, lag, broker health, and what to alert on.',
        tags: ['Lag', 'JMX', 'Metrics', 'Alerting', 'Observability'],
        status: 'live',
        readTime: '20-28 min',
        difficulty: 'Advanced',
        plainEnglish: 'Kafka observability tells you whether data is arriving, whether consumers are keeping up, whether brokers are healthy, and whether disks or networks are close to trouble.',
        analogy: 'Kafka monitoring is like an airport control tower. You watch arrivals, departures, runway congestion, fuel levels, and delayed flights all at once.',
        coreIdeas: [
          'Consumer lag shows whether readers are falling behind.',
          'Under-replicated partitions signal durability or broker problems.',
          'Offline partitions are urgent because data is unavailable.',
          'Request latency and network throughput show pressure on brokers.',
          'Disk usage matters because Kafka is a log stored on disk.',
        ],
        walkthrough: [
          'Collect broker JMX metrics.',
          'Track consumer lag by group and topic.',
          'Alert on offline partitions and under-replicated partitions.',
          'Watch disk growth and retention behavior.',
          'Use logs to correlate leader elections, rebalances, and client errors.',
        ],
        exampleTitle: 'Core Alerts',
        example: `Critical:
  OfflinePartitionsCount > 0
  ActiveControllerCount != 1

Warning:
  UnderReplicatedPartitions > 0
  Consumer lag growing for important groups
  Disk usage above planned threshold`,
        commonMistakes: [
          'Only watching broker CPU. Kafka incidents often appear first as lag, disk pressure, replication trouble, or network saturation.',
          'Alerting on any lag at all. Some batch consumers intentionally lag; alert on unexpected or growing lag.',
        ],
        advancedNotes: [
          'Burrow-style lag evaluation can detect whether lag is increasing, decreasing, or stalled instead of using a single threshold.',
          'Client metrics are as important as broker metrics because many incidents begin with producer or consumer behavior.',
        ],
        checklist: [
          'Can you tell whether records are still being produced?',
          'Can you identify the slow consumer group?',
          'Can you detect partition unavailability quickly?',
        ],
        takeaways: [
          'Lag, replication health, and disk usage are Kafka essentials.',
          'Broker and client metrics both matter.',
          'Good alerts reflect business impact, not just raw numbers.',
        ],
      },
      {
        id: 17,
        slug: 'performance-tuning',
        title: 'Performance Tuning',
        description: 'Tune producers, consumers, partitions, compression, batching, and broker resources.',
        tags: ['Throughput', 'Latency', 'Batching', 'Compression', 'Partitions'],
        status: 'live',
        readTime: '22-30 min',
        difficulty: 'Advanced',
        plainEnglish: 'Kafka performance is a set of tradeoffs. You can optimize for low latency, high throughput, durability, cost, or simplicity, but not all of them equally at the same time.',
        analogy: 'A delivery network can send one motorcycle immediately for every package or fill trucks and move huge volume. Both are valid; the right choice depends on the promise to customers.',
        coreIdeas: [
          'Batching increases throughput by sending more records per request.',
          'Compression reduces network and disk usage but costs CPU.',
          'Partition count controls parallelism and overhead.',
          'Consumer fetch settings influence latency and throughput.',
          'Broker disks and network bandwidth often define the real ceiling.',
        ],
        walkthrough: [
          'Define the target: p99 latency, records per second, or MB per second.',
          'Measure baseline producer, broker, and consumer metrics.',
          'Tune batching and compression on producers.',
          'Tune fetch sizes and processing parallelism on consumers.',
          'Scale partitions and brokers only after understanding the bottleneck.',
        ],
        exampleTitle: 'Throughput-Oriented Producer',
        example: `compression.type=zstd
linger.ms=10
batch.size=65536
acks=all

Measure latency after changing these settings; do not copy blindly.`,
        commonMistakes: [
          'Increasing partitions as the first move. It can help, but it can also increase rebalances, open files, and metadata load.',
          'Copying benchmark settings from another company without matching record size, durability, and workload pattern.',
        ],
        advancedNotes: [
          'p99 and p999 latency are more useful than averages for user-facing systems.',
          'Page cache behavior is central to Kafka performance because Kafka relies heavily on sequential disk I/O and OS cache.',
        ],
        checklist: [
          'What exact metric are you optimizing?',
          'Which component is the bottleneck?',
          'Did the change improve p95/p99, not just averages?',
        ],
        takeaways: [
          'Tune from measurements, not folklore.',
          'Batching and compression are major levers.',
          'Partitions are powerful but not free.',
        ],
      },
      {
        id: 18,
        slug: 'scaling-capacity-planning',
        title: 'Scaling and Capacity Planning',
        description: 'Plan partitions, brokers, replication, disk, network, and growth.',
        tags: ['Capacity', 'Scaling', 'Replication factor', 'Disk sizing', 'Network'],
        status: 'live',
        readTime: '22-30 min',
        difficulty: 'Advanced',
        plainEnglish: 'Capacity planning estimates how much data Kafka must store and move, then chooses enough brokers, disks, network, and partitions to handle normal growth and failure.',
        analogy: 'Planning Kafka is like planning a warehouse. You need shelf space, loading docks, backup aisles, and room for holiday traffic.',
        coreIdeas: [
          'Ingress rate determines how fast data enters Kafka.',
          'Retention determines how long data stays on disk.',
          'Replication factor multiplies storage and network requirements.',
          'Consumer fan-out increases broker read traffic.',
          'Headroom is required because failures reduce available capacity.',
        ],
        walkthrough: [
          'Estimate daily incoming data by topic.',
          'Multiply by retention days and replication factor.',
          'Add index overhead and safety margin.',
          'Estimate producer writes and consumer reads for network throughput.',
          'Choose partition counts based on parallelism and expected growth.',
        ],
        exampleTitle: 'Rough Disk Estimate',
        example: `100 GB/day incoming
7 days retention
replication factor 3

100 x 7 x 3 = 2100 GB before overhead and headroom
Plan more than 2.1 TB usable capacity.`,
        commonMistakes: [
          'Sizing disk from producer traffic but forgetting replication and retention.',
          'Planning for normal traffic only. Kafka should survive a broker failure without immediately running out of room.',
        ],
        advancedNotes: [
          'Tiered storage can move older log segments to cheaper object storage in supported platforms.',
          'Rack awareness helps keep replicas on separate failure domains.',
        ],
        checklist: [
          'How much data arrives per day?',
          'How long must each topic be retained?',
          'What happens to capacity during one broker failure?',
        ],
        takeaways: [
          'Storage equals ingress times retention times replication plus headroom.',
          'Read fan-out affects network planning.',
          'Capacity planning must include failure scenarios.',
        ],
      },
      {
        id: 19,
        slug: 'disaster-recovery-multi-region',
        title: 'Disaster Recovery and Multi-Region Kafka',
        description: 'Backups, replication, failover, MirrorMaker 2, active-passive, and active-active tradeoffs.',
        tags: ['DR', 'MirrorMaker 2', 'RPO', 'RTO', 'Multi-region'],
        status: 'live',
        readTime: '24-32 min',
        difficulty: 'Advanced',
        plainEnglish: 'Disaster recovery is the plan for keeping Kafka useful when a region, cluster, or major dependency fails. Multi-region Kafka is possible, but it adds latency, cost, and operational complexity.',
        analogy: 'A business can keep a second office ready in another city. That helps during a building outage, but staff need a plan for who moves, what data is current, and how customers are routed.',
        coreIdeas: [
          'RPO is how much data loss the business can tolerate.',
          'RTO is how long recovery can take.',
          'Active-passive keeps a standby region ready.',
          'Active-active serves traffic in more than one region but complicates ordering and conflict handling.',
          'MirrorMaker 2 and managed replication tools copy topics between clusters.',
        ],
        walkthrough: [
          'Define RPO and RTO with product owners.',
          'Decide which topics need cross-region replication.',
          'Replicate schemas, ACLs, and topic configs where required.',
          'Test failover and failback instead of only documenting them.',
          'Design consumers to handle duplicate or replayed records after failover.',
        ],
        exampleTitle: 'DR Decision Matrix',
        example: `Low criticality:
  restore from backup, longer RTO

High criticality:
  active-passive replication, tested failover

Global low-latency product:
  active-active, explicit conflict strategy`,
        commonMistakes: [
          'Assuming cross-region replication is the same as zero data loss. Replication is asynchronous in many designs.',
          'Replicating records but forgetting schemas, ACLs, service credentials, and consumer offset strategy.',
        ],
        advancedNotes: [
          'Offset translation is a key multi-cluster challenge because offsets are local to partitions in each cluster.',
          'Exactly-once guarantees generally do not extend cleanly across independent clusters and external systems.',
        ],
        checklist: [
          'What are the RPO and RTO?',
          'Which topics are truly critical?',
          'Has failover been tested with real consumers?',
        ],
        takeaways: [
          'DR starts with business recovery targets.',
          'Multi-region Kafka adds real complexity.',
          'Test failover before the emergency.',
        ],
      },
    ],
  },
  {
    id: 5,
    title: 'Architecture and Real-World Practice',
    color: '#ef4444',
    difficulty: 'Advanced',
    modules: [
      {
        id: 20,
        slug: 'event-driven-architecture',
        title: 'Event-Driven Architecture',
        description: 'Use Kafka to decouple services, publish facts, and design business events.',
        tags: ['EDA', 'Domain events', 'Decoupling', 'Choreography', 'Event contracts'],
        status: 'live',
        readTime: '22-30 min',
        difficulty: 'Advanced',
        plainEnglish: 'Event-driven architecture means systems communicate by publishing facts about what happened, instead of directly telling every other system what to do.',
        analogy: 'When a store rings a bell after a sale, the warehouse, accountant, and manager can each respond. The cashier does not need to personally call every department.',
        coreIdeas: [
          'Domain events describe meaningful business facts.',
          'Events decouple producers from consumers.',
          'Choreography lets services react independently.',
          'Event contracts must be stable and well documented.',
          'Not every interaction should be an event; direct requests still matter.',
        ],
        walkthrough: [
          'Identify business moments worth recording.',
          'Name events in past tense, such as OrderPlaced.',
          'Include the data consumers need without leaking private internals.',
          'Publish once from the system of record.',
          'Let consumers build their own workflows from the event stream.',
        ],
        exampleTitle: 'Good Event Names',
        example: `Better:
  OrderPlaced
  PaymentAuthorized
  ShipmentDispatched

Weaker:
  SendEmailNow
  UpdateTableX
  CallBillingService`,
        commonMistakes: [
          'Publishing commands instead of facts. Commands tell another service what to do; events say what already happened.',
          'Making event payloads mirror database tables exactly. Events are contracts, not accidental table dumps.',
        ],
        advancedNotes: [
          'The outbox pattern helps publish events reliably when a service also writes to its own database.',
          'Sagas coordinate long-running workflows but require careful compensation and observability.',
        ],
        checklist: [
          'Is this message a fact or a command?',
          'Who owns the event contract?',
          'Can consumers understand the event without knowing producer internals?',
        ],
        takeaways: [
          'Events publish facts, not instructions.',
          'Kafka is a strong backbone for event-driven systems.',
          'Good event contracts are product design, not just code.',
        ],
      },
      {
        id: 21,
        slug: 'cdc-debezium',
        title: 'Change Data Capture with Debezium',
        description: 'Stream database changes into Kafka without fragile polling jobs.',
        tags: ['CDC', 'Debezium', 'Outbox', 'Database log', 'Snapshot'],
        status: 'live',
        readTime: '22-30 min',
        difficulty: 'Advanced',
        plainEnglish: 'Change Data Capture reads database change logs and turns inserts, updates, and deletes into Kafka events.',
        analogy: 'Instead of asking a shop every minute what changed, CDC reads the cash register tape as each transaction is recorded.',
        coreIdeas: [
          'CDC captures committed database changes.',
          'Debezium is a popular open-source CDC platform built on Kafka Connect.',
          'Initial snapshots load existing rows before streaming new changes.',
          'Database log retention must be long enough for connectors to keep up.',
          'The outbox pattern turns application events into reliable database rows that CDC publishes.',
        ],
        walkthrough: [
          'Enable logical replication or binlog support in the database.',
          'Configure a Debezium source connector.',
          'Run an initial snapshot if needed.',
          'Stream ongoing changes into Kafka topics.',
          'Use schema and delete handling deliberately for downstream consumers.',
        ],
        exampleTitle: 'CDC Flow',
        example: `PostgreSQL WAL
  -> Debezium connector
  -> Kafka Connect task
  -> dbserver.public.orders topic
  -> consumers and sinks`,
        commonMistakes: [
          'Treating raw CDC topics as clean business events. Raw row changes often need shaping before broad consumption.',
          'Forgetting delete semantics. Consumers must know whether deletes appear as tombstones, delete events, or both.',
        ],
        advancedNotes: [
          'Outbox event routing can publish domain events while preserving database transaction boundaries.',
          'CDC lag can threaten database log retention if the connector is stopped too long.',
        ],
        checklist: [
          'Can the database retain logs while the connector is down?',
          'Do consumers need raw row changes or domain events?',
          'How are deletes represented?',
        ],
        takeaways: [
          'CDC streams committed database changes.',
          'Debezium commonly runs through Kafka Connect.',
          'Raw CDC and business events are related but not identical.',
        ],
      },
      {
        id: 22,
        slug: 'managed-kafka-cloud',
        title: 'Managed Kafka and Cloud Choices',
        description: 'Compare self-managed Kafka, Confluent Cloud, MSK, Azure Event Hubs Kafka API, and other managed options.',
        tags: ['Managed Kafka', 'Confluent', 'MSK', 'Cloud', 'Cost'],
        status: 'live',
        readTime: '18-24 min',
        difficulty: 'Intermediate',
        plainEnglish: 'Managed Kafka means a provider runs much of the broker infrastructure for you. You still design topics, schemas, applications, security, and costs.',
        analogy: 'Renting an apartment removes roof maintenance, but you still choose furniture, pay utilities, and lock your door.',
        coreIdeas: [
          'Self-managed Kafka gives maximum control and maximum operational responsibility.',
          'Managed Kafka reduces broker operations but does not remove application design work.',
          'Cloud networking, IAM, private connectivity, and egress fees matter.',
          'Kafka-compatible services may not support every Kafka feature exactly the same way.',
          'Cost depends on throughput, storage, retention, partitions, networking, and support tier.',
        ],
        walkthrough: [
          'List required Kafka features and compliance needs.',
          'Estimate throughput, retention, and region requirements.',
          'Check private networking and identity integration.',
          'Test client compatibility with your libraries.',
          'Model cost under normal and peak traffic.',
        ],
        exampleTitle: 'Decision Checklist',
        example: `Choose managed when:
  small team
  production uptime needed
  operations skill is limited

Choose self-managed when:
  strict custom control needed
  team has Kafka operations depth
  cost model favors owned infrastructure`,
        commonMistakes: [
          'Assuming managed means no Kafka expertise is needed. Topic design, consumer lag, schemas, and client behavior remain your responsibility.',
          'Ignoring network egress costs when consumers run in another region or cloud.',
        ],
        advancedNotes: [
          'Some managed services separate broker capacity from storage differently than open-source Kafka.',
          'Tiered storage, serverless Kafka, and quota models can change both operations and architecture.',
        ],
        checklist: [
          'Does the service support the client features you use?',
          'Are producers and consumers in the same region and network?',
          'Have you estimated storage plus network plus support cost?',
        ],
        takeaways: [
          'Managed Kafka reduces infrastructure burden.',
          'It does not remove Kafka design responsibility.',
          'Networking and cost modeling are part of architecture.',
        ],
      },
      {
        id: 23,
        slug: 'testing-debugging',
        title: 'Testing and Debugging Kafka Systems',
        description: 'Local tests, embedded clusters, Testcontainers, contract tests, replay, and incident debugging.',
        tags: ['Testing', 'Debugging', 'Testcontainers', 'Replay', 'Contracts'],
        status: 'live',
        readTime: '20-28 min',
        difficulty: 'Advanced',
        plainEnglish: 'Kafka systems need tests for message shape, processing behavior, failure handling, and replay. Debugging usually starts with topic data, consumer lag, client logs, and offsets.',
        analogy: 'Testing Kafka is rehearsing a relay race: baton shape, handoff timing, runner recovery, and what happens when someone drops the baton.',
        coreIdeas: [
          'Unit tests validate pure transformation logic.',
          'Integration tests validate real producer and consumer behavior.',
          'Contract tests protect event schemas and meanings.',
          'Replay tests prove consumers can handle old records safely.',
          'Debugging often requires checking offsets, keys, headers, timestamps, and lag.',
        ],
        walkthrough: [
          'Test event builders and validators without Kafka first.',
          'Use Testcontainers or a test cluster for client integration tests.',
          'Validate schema compatibility in CI.',
          'Create small replay fixtures for important topics.',
          'During incidents, inspect consumer group offsets before resetting anything.',
        ],
        exampleTitle: 'Debug Order Consumer',
        example: `1. Is the producer writing to the expected topic?
2. Are records keyed correctly?
3. Is the consumer group assigned partitions?
4. Is lag growing?
5. Are errors going to logs or a DLQ?
6. Was the offset committed past failed work?`,
        commonMistakes: [
          'Only testing with mocks. Mocks miss serialization, broker metadata, rebalances, and offset behavior.',
          'Resetting offsets during an incident without recording the current position first.',
        ],
        advancedNotes: [
          'Headers can carry correlation IDs for tracing event journeys across services.',
          'Consumer group offset resets should be treated like database migrations: reviewed, logged, and reversible when possible.',
        ],
        checklist: [
          'Do tests use the real serializer?',
          'Can consumers replay old events?',
          'Can you trace one event across systems?',
        ],
        takeaways: [
          'Test business logic and Kafka integration separately.',
          'Replay safety is essential.',
          'Offset changes are powerful and dangerous.',
        ],
      },
      {
        id: 24,
        slug: 'kafka-interview-system-design',
        title: 'Kafka Interview and System Design Guide',
        description: 'Prepare for Kafka interviews and design reviews with practical tradeoff language.',
        tags: ['Interview', 'System design', 'Tradeoffs', 'Architecture', 'Scenarios'],
        status: 'live',
        readTime: '22-30 min',
        difficulty: 'Advanced',
        plainEnglish: 'Kafka interviews test whether you can explain the core model, design reliable event flows, choose tradeoffs, and operate the system when things fail.',
        analogy: 'A strong Kafka engineer is not someone who memorizes knobs. They are someone who can explain what happens when the road is busy, one bridge closes, and deliveries must still arrive.',
        coreIdeas: [
          'Start every design with business requirements: volume, latency, durability, retention, and consumers.',
          'Explain topic, key, partition, and schema choices.',
          'Discuss failure modes before tuning details.',
          'Use idempotency and replay as reliability language.',
          'Mention observability, security, and operations in production designs.',
        ],
        walkthrough: [
          'Clarify workload and data criticality.',
          'Sketch producers, topics, partitions, consumers, and sinks.',
          'Choose keys based on ordering requirements.',
          'State delivery semantics and duplicate handling.',
          'Describe monitoring, alerting, and recovery.',
        ],
        exampleTitle: 'Design Prompt Skeleton',
        example: `Design real-time order tracking:
  producers: checkout, payment, warehouse
  topics: order-events, shipment-events
  keys: order_id
  consumers: notification, analytics, support dashboard
  risks: duplicate notifications, late events, consumer lag
  controls: idempotency keys, DLQ, lag alerts, schema compatibility`,
        commonMistakes: [
          'Jumping straight to partition counts before understanding ordering and throughput.',
          'Saying exactly-once without explaining scope, external systems, and idempotency.',
        ],
        advancedNotes: [
          'Good system design answers include what you would measure after launch.',
          'Senior answers discuss tradeoffs and failure behavior, not only happy-path diagrams.',
        ],
        checklist: [
          'Did you ask about throughput, retention, and latency?',
          'Did you justify the message key?',
          'Did you cover duplicates, replay, security, and monitoring?',
        ],
        takeaways: [
          'Kafka design starts with requirements.',
          'Ordering, partitions, keys, and schemas are connected.',
          'Production readiness includes failures, monitoring, and security.',
        ],
      },
    ],
  },
]

export const KAFKA_MODULES = KAFKA_CURRICULUM.flatMap(section =>
  section.modules.map(module => ({ ...module, sectionId: section.id, sectionTitle: section.title, color: section.color }))
)

export const KAFKA_MODULE_BY_SLUG = Object.fromEntries(
  KAFKA_MODULES.map(module => [module.slug, module])
) as Record<string, KafkaLesson & { sectionId: number; sectionTitle: string; color: string }>
