import { LearnLayout } from '@/components/content/LearnLayout'
import { Callout } from '@/components/content/Callout'
import { CodeBlock } from '@/components/content/CodeBlock'
import { KeyTakeaways } from '@/components/content/KeyTakeaways'

export const metadata = { title: 'Cloud Pub/Sub' }

const publishCode = `# Pub/Sub Publisher — send events to a topic
from google.cloud import pubsub_v1
import json
from datetime import datetime

publisher = pubsub_v1.PublisherClient()
topic_path = publisher.topic_path('your-project', 'sales-events')

def publish_sale_event(order_id: str, customer_id: str, amount: float, region: str):
    event = {
        'order_id':   order_id,
        'customer_id': customer_id,
        'amount':     amount,
        'region':     region,
        'timestamp':  datetime.utcnow().isoformat(),
    }
    # Messages must be bytes
    data = json.dumps(event).encode('utf-8')
    
    # Add attributes for server-side filtering
    future = publisher.publish(
        topic_path,
        data=data,
        region=region,           # Attribute for subscription filtering
        event_type='sale'
    )
    print(f"Published message ID: {future.result()}")

# Publish 100 sale events
for i in range(100):
    publish_sale_event(f'ORD-{i}', f'CUST-{i % 20}', 99.99 * i, 'US-EAST')`

const subscribeCode = `# Pub/Sub Subscriber — pull and process messages
from google.cloud import pubsub_v1
import json

subscriber = pubsub_v1.SubscriberClient()
subscription_path = subscriber.subscription_path('your-project', 'sales-events-sub')

def process_message(message: pubsub_v1.types.ReceivedMessage):
    data = json.loads(message.data.decode('utf-8'))
    print(f"Processing order {data['order_id']} — \${data['amount']} from {data['region']}")
    
    # Your processing logic here
    # save_to_database(data)
    
    # IMPORTANT: Always acknowledge the message after processing
    # Unacknowledged messages are redelivered
    message.ack()

# Pull messages with streaming pull (most efficient)
streaming_pull_future = subscriber.subscribe(
    subscription_path,
    callback=process_message
)

print(f"Listening for messages on {subscription_path}")
with subscriber:
    try:
        streaming_pull_future.result(timeout=60)
    except Exception:
        streaming_pull_future.cancel()`

export default function PubSubPage() {
  return (
    <LearnLayout
      title="Cloud Pub/Sub"
      description="Cloud Pub/Sub is GCP's real-time messaging service. It decouples event producers from consumers and handles millions of messages per second — the streaming foundation of every GCP data pipeline."
      section="Section 02 · GCP Track"
      readTime="12 min read"
      updatedAt="March 2025"
      breadcrumbs={[
        { label: 'GCP Track', href: '/learn/gcp/introduction' },
        { label: 'Cloud Pub/Sub', href: '/learn/gcp/pubsub' },
      ]}
    >
      <h2 id="what-is-pubsub">What Pub/Sub does and why it matters</h2>
      <p>
        Cloud Pub/Sub is GCP's equivalent of Azure Event Hubs and Amazon Kinesis. Its core job is decoupling — separating the services that produce events (your web app, mobile app, IoT device) from the services that consume and process them (Dataflow, BigQuery). Producers publish messages to a topic. Consumers subscribe to that topic and receive messages.
      </p>
      <p>
        This decoupling means if your Dataflow processing job goes down for maintenance, messages queue up in Pub/Sub and are delivered when it comes back. No events are lost. Producers and consumers can scale independently.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-6">
        {[
          { icon: '📤', title: 'Topics', desc: 'Where producers publish messages. Think of a topic as a named channel. Your app publishes sale events to the sales-events topic.' },
          { icon: '📥', title: 'Subscriptions', desc: 'Where consumers receive messages. A topic can have multiple subscriptions — Dataflow and BigQuery can both subscribe to the same topic.' },
          { icon: '✅', title: 'Acknowledgements', desc: 'Messages must be acknowledged after processing. Unacknowledged messages are redelivered. This guarantees at-least-once delivery.' },
        ].map(item => (
          <div key={item.title} className="rounded-xl p-4 text-center" style={{ background: 'var(--bg2)', border: '1px solid var(--border)' }}>
            <div className="text-2xl mb-2">{item.icon}</div>
            <div className="font-display font-semibold text-sm mb-1.5" style={{ color: 'var(--text)' }}>{item.title}</div>
            <p className="text-xs leading-relaxed" style={{ color: 'var(--muted)', fontFamily: 'Lora, serif' }}>{item.desc}</p>
          </div>
        ))}
      </div>

      <h2 id="publishing">Publishing events to Pub/Sub</h2>
      <CodeBlock code={publishCode} language="python" filename="pubsub_publisher.py" />

      <h2 id="subscribing">Subscribing and processing messages</h2>
      <CodeBlock code={subscribeCode} language="python" filename="pubsub_subscriber.py" />

      <Callout type="warning">
        Always acknowledge messages after successful processing. If your code throws an error before calling message.ack(), Pub/Sub will redeliver the message. This is intentional — it guarantees no message is lost — but it means your processing logic must handle duplicate messages gracefully (idempotency).
      </Callout>

      <KeyTakeaways items={[
        'Pub/Sub decouples event producers from consumers — equivalent to Azure Event Hubs and Amazon Kinesis',
        'Topics are where producers publish. Subscriptions are where consumers receive. One topic can have many subscriptions',
        'Always acknowledge messages after processing — unacknowledged messages are redelivered automatically',
        'The most common pattern: app publishes to Pub/Sub → Dataflow reads from Pub/Sub → writes to BigQuery',
        'Pub/Sub guarantees at-least-once delivery — design your processing logic to handle duplicate messages safely',
        'Messages are retained for 7 days by default — useful for replaying events if a consumer goes down',
      ]} />
    </LearnLayout>
  )
}