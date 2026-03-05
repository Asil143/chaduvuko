import { LearnLayout } from '@/components/content/LearnLayout'
import { Callout } from '@/components/content/Callout'
import { CodeBlock } from '@/components/content/CodeBlock'
import { KeyTakeaways } from '@/components/content/KeyTakeaways'

export const metadata = { title: 'Azure Event Hubs' }

const producerCode = `# Send events to Event Hubs using Python SDK
# pip install azure-eventhub

import asyncio
import json
from azure.eventhub.aio import EventHubProducerClient
from azure.eventhub import EventData
from datetime import datetime

CONNECTION_STRING = "Endpoint=sb://yournamespace.servicebus.windows.net/;..."
EVENT_HUB_NAME   = "sales-events"

async def send_events():
    producer = EventHubProducerClient.from_connection_string(
        conn_str=CONNECTION_STRING,
        eventhub_name=EVENT_HUB_NAME
    )

    async with producer:
        # Create a batch — Event Hubs sends in batches for efficiency
        event_batch = await producer.create_batch()

        # Add events to the batch
        for i in range(10):
            payload = {
                "event_id":   f"EVT-{i:04d}",
                "customer_id": f"CUST-{i * 100}",
                "amount":      round(99.99 + i * 10, 2),
                "timestamp":   datetime.utcnow().isoformat(),
                "event_type":  "purchase"
            }
            event_batch.add(EventData(json.dumps(payload)))

        # Send the whole batch in one network call
        await producer.send_batch(event_batch)
        print(f"Sent batch of {len(event_batch)} events")

asyncio.run(send_events())`

const consumerCode = `# Read events from Event Hubs — consumer group pattern
# Multiple consumers can read the same stream independently

import asyncio
from azure.eventhub.aio import EventHubConsumerClient
from azure.eventhub.extensions.checkpointstoreblobaio import BlobCheckpointStore

# Checkpoint store tracks which events have been processed
# If consumer restarts, it resumes from last checkpoint — not from the start
CHECKPOINT_STORE = BlobCheckpointStore.from_connection_string(
    conn_str="DefaultEndpointsProtocol=https;AccountName=yourstorage;...",
    container_name="eventhub-checkpoints"
)

async def on_event(partition_context, event):
    # Process the event
    payload = json.loads(event.body_as_str())
    print(f"Partition {partition_context.partition_id}: {payload['event_id']}")

    # Write to database, trigger downstream processing, etc.
    # ...

    # Checkpoint — marks this event as processed
    await partition_context.update_checkpoint(event)

async def consume():
    client = EventHubConsumerClient.from_connection_string(
        conn_str=CONNECTION_STRING,
        consumer_group="$Default",          # or a named consumer group
        eventhub_name=EVENT_HUB_NAME,
        checkpoint_store=CHECKPOINT_STORE,  # enables resume on restart
    )

    async with client:
        await client.receive(
            on_event=on_event,
            starting_position="-1",  # -1 = read from beginning of stream
        )

asyncio.run(consume())`

const captureCode = `// Event Hubs Capture — automatically archive events to ADLS Gen2
// Configure in Azure Portal: Event Hub → Features → Capture

// Capture writes Avro files to your storage account in this path format:
// {Namespace}/{EventHub}/{PartitionId}/{Year}/{Month}/{Day}/{Hour}/{Minute}/{Second}.avro

// Example file path:
// myNamespace/sales-events/0/2025/03/15/14/30/00.avro

// Read captured Avro files in Databricks:
from pyspark.sql import SparkSession

spark = SparkSession.builder.appName("ReadEventHubCapture").getOrCreate()

# Read all captured Avro files for today
df = spark.read.format("avro").load(
    "abfss://capture@yourstorage.dfs.core.windows.net/myNamespace/sales-events/*/2025/03/15/*/*/*.avro"
)

# Event Hubs Capture wraps your payload in a Body column (binary)
import pyspark.sql.functions as F

df_parsed = df.withColumn(
    "payload",
    F.from_json(F.col("Body").cast("string"), schema)
)

df_parsed.select("payload.*").show()`

const concepts = [
  { term: 'Namespace',      color: '#00c2ff', desc: 'The top-level container for Event Hubs — like a server. One namespace can contain multiple Event Hubs. The namespace has the connection string.' },
  { term: 'Event Hub',      color: '#0078d4', desc: 'A single stream/topic inside a namespace. Equivalent to a Kafka topic. One Event Hub typically represents one data source (e.g. clickstream, transactions).' },
  { term: 'Partition',      color: '#7b61ff', desc: 'Events are distributed across partitions for parallelism. Each partition is an ordered, immutable sequence of events. More partitions = more throughput.' },
  { term: 'Consumer Group', color: '#00e676', desc: 'A view of the entire Event Hub for one application. Multiple consumer groups read the same events independently — a streaming pipeline and an ML model can both read the same stream.' },
  { term: 'Checkpoint',     color: '#f5c542', desc: 'A saved position in the stream. When a consumer restarts, it resumes from the last checkpoint instead of reprocessing everything from the start.' },
  { term: 'Capture',        color: '#ff9800', desc: 'Auto-archive feature. Automatically writes incoming events to ADLS Gen2 or Blob Storage as Avro files on a time/size schedule — no consumer code needed.' },
]

const tiers = [
  { name: 'Basic',    throughput: '1 MB/s in, 2 MB/s out', retention: '1 day',    partitions: 'Up to 32',  use: 'Dev/test only' },
  { name: 'Standard', throughput: '1 MB/s per TU',         retention: '7 days',   partitions: 'Up to 32',  use: 'Most production workloads' },
  { name: 'Premium',  throughput: 'Processing units',      retention: '90 days',  partitions: 'Up to 100', use: 'High-throughput, low latency' },
  { name: 'Dedicated',throughput: 'Dedicated cluster',     retention: '90 days',  partitions: 'Up to 1024',use: 'Enterprise, petabyte scale' },
]

export default function EventHubsPage() {
  return (
    <LearnLayout
      title="Azure Event Hubs"
      description="Event Hubs is Azure's managed event streaming service — the Azure-native equivalent of Apache Kafka. It ingests millions of events per second from applications, IoT devices, and microservices, then makes them available for real-time processing or batch archiving."
      section="Section 02 · Azure Track"
      readTime="14 min read"
      updatedAt="March 2025"
      breadcrumbs={[
        { label: 'Azure Track', href: '/learn/azure/introduction' },
        { label: 'Azure Event Hubs', href: '/learn/azure/event-hubs' },
      ]}
      prev={{ title: 'Azure Synapse Analytics', href: '/learn/azure/synapse' }}
      next={{ title: 'Azure Key Vault', href: '/learn/azure/key-vault' }}
    >
      <h2>What is Azure Event Hubs?</h2>
      <p>
        Event Hubs is a fully managed, real-time data ingestion service. Producers send events (clicks, transactions, sensor readings, logs) into Event Hubs. Consumers read those events and process them — either in real time or in batches after they have been archived to storage.
      </p>
      <p>
        The key thing to understand about Event Hubs: it is Kafka-compatible. You can use the Kafka protocol to produce and consume events without changing your application code. If you know Kafka, you know Event Hubs.
      </p>

      <Callout type="info" label="Event Hubs vs Azure Service Bus">
        Event Hubs is for high-throughput event streaming — millions of events, multiple consumers, replay. Service Bus is for reliable message delivery — one consumer, guaranteed delivery, dead-letter queues. Use Event Hubs for data pipelines. Use Service Bus for application-to-application messaging.
      </Callout>

      <h2>Core Concepts</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 my-6">
        {concepts.map(c => (
          <div key={c.term} className="p-4 rounded-xl" style={{ background: 'var(--surface)', border: `1px solid ${c.color}30` }}>
            <div className="text-xs font-mono font-bold mb-1" style={{ color: c.color }}>{c.term}</div>
            <p className="text-sm" style={{ color: 'var(--text2)' }}>{c.desc}</p>
          </div>
        ))}
      </div>

      <h2>Sending Events — Producer Code</h2>
      <p>
        Producers send events in batches for efficiency. Each event is a JSON payload (or any binary format) representing something that happened — a sale, a click, a sensor reading.
      </p>
      <CodeBlock code={producerCode} language="python" filename="event_producer.py" />

      <h2>Consuming Events — Consumer Code</h2>
      <p>
        Consumers read events and process them. The checkpoint store ensures that if your consumer crashes and restarts, it picks up exactly where it left off — no events are missed or reprocessed.
      </p>
      <CodeBlock code={consumerCode} language="python" filename="event_consumer.py" />

      <Callout type="tip" label="Consumer Groups for Fan-Out">
        Create separate consumer groups for each downstream system. Your real-time dashboard reads from consumer group &quot;dashboard&quot;. Your Databricks pipeline reads from consumer group &quot;pipeline&quot;. Both get every event independently — neither blocks or affects the other.
      </Callout>

      <h2>Event Hubs Capture — Archive to ADLS Gen2</h2>
      <p>
        Capture is the simplest way to get streaming data into your data lake. Enable it in the Azure Portal and Event Hubs automatically writes incoming events to ADLS Gen2 as Avro files — no consumer code needed. Then Databricks reads the archived files for batch processing.
      </p>
      <CodeBlock code={captureCode} language="python" filename="read_capture.py" />

      <h2>Pricing Tiers</h2>
      <div className="overflow-x-auto my-6">
        <table className="w-full text-sm" style={{ borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ borderBottom: '2px solid var(--border)' }}>
              {['Tier', 'Throughput', 'Retention', 'Partitions', 'Use Case'].map(h => (
                <th key={h} className="text-left py-3 px-4 text-xs font-mono uppercase" style={{ color: 'var(--muted)' }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {tiers.map((t, i) => (
              <tr key={t.name} style={{ borderBottom: '1px solid var(--border)', background: i % 2 === 0 ? 'var(--surface)' : 'transparent' }}>
                <td className="py-3 px-4 font-mono text-xs font-bold" style={{ color: 'var(--accent)' }}>{t.name}</td>
                <td className="py-3 px-4 text-xs" style={{ color: 'var(--text2)' }}>{t.throughput}</td>
                <td className="py-3 px-4 text-xs" style={{ color: 'var(--text2)' }}>{t.retention}</td>
                <td className="py-3 px-4 text-xs" style={{ color: 'var(--text2)' }}>{t.partitions}</td>
                <td className="py-3 px-4 text-xs" style={{ color: 'var(--text2)' }}>{t.use}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Callout type="warning" label="Start with Standard tier">
        For most production data engineering workloads, Standard tier with 1-2 Throughput Units is sufficient. Dedicated clusters are only needed at very high scale (10,000+ events/second sustained).
      </Callout>

      <h2>Event Hubs in a Real Pipeline</h2>
      <p>
        The canonical Azure streaming pipeline looks like this:
      </p>
      <div className="my-6 p-5 rounded-xl font-mono text-sm" style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}>
        <div className="flex flex-wrap items-center gap-2" style={{ color: 'var(--text2)' }}>
          <span className="px-3 py-1 rounded" style={{ background: '#0078d415', color: '#0078d4' }}>Application / IoT Device</span>
          <span style={{ color: 'var(--muted)' }}>→</span>
          <span className="px-3 py-1 rounded" style={{ background: '#7b61ff15', color: '#7b61ff' }}>Event Hubs</span>
          <span style={{ color: 'var(--muted)' }}>→</span>
          <span className="px-3 py-1 rounded" style={{ background: '#00c2ff15', color: '#00c2ff' }}>Stream Analytics / Databricks</span>
          <span style={{ color: 'var(--muted)' }}>→</span>
          <span className="px-3 py-1 rounded" style={{ background: '#00e67615', color: '#00e676' }}>ADLS Gen2 / Synapse</span>
        </div>
      </div>

      <KeyTakeaways items={[
        'Event Hubs is Kafka-compatible — the same producer/consumer code works with both',
        'Partitions control throughput — more partitions enable more parallel consumers',
        'Consumer groups allow multiple independent readers on the same stream',
        'Capture archives events to ADLS Gen2 automatically — no consumer code needed for batch use cases',
        'Checkpointing ensures consumers resume from the right position after restart',
        'Standard tier handles most production DE workloads — start there',
      ]} />
    </LearnLayout>
  )
}