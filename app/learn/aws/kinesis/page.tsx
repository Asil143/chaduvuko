import { LearnLayout } from '@/components/content/LearnLayout'
import { CodeBlock } from '@/components/content/CodeBlock'

export const metadata = { title: 'Amazon Kinesis — Real-Time Streaming on AWS — Asil' }

export default function KinesisPage() {
  return (
    <LearnLayout
      title="Amazon Kinesis — Real-Time Data Streaming on AWS"
      description="Kinesis is how you get data into AWS in real time. Instead of waiting for a file to land in S3, Kinesis captures events the moment they happen — clicks, transactions, sensor readings — and makes them available for processing within seconds."
      section="AWS Track"
      readTime="13 min"
      updatedAt="March 2025"
      breadcrumbs={[
        { label: 'AWS', href: '/learn/aws/introduction' },
        { label: 'Amazon Kinesis', href: '/learn/aws/kinesis' },
      ]}
    >
      <h2>Four services, one name — know the difference</h2>
      <p>
        Amazon Kinesis is an umbrella brand for four related but different services. Interviewers sometimes ask about "Kinesis" expecting you to clarify which one.
      </p>
      <p>
        <strong>Kinesis Data Streams</strong> — the core streaming service. Producers write events to a stream, consumers read from it in real time or near-real time. You control the shards (parallel lanes), retention period, and consumers. This is the one most data engineers mean when they say "Kinesis."
      </p>
      <p>
        <strong>Kinesis Data Firehose</strong> — a managed delivery service. It reads from a stream and delivers data to S3, Redshift, OpenSearch, or Splunk automatically. No consumer code to write. Best for the common case of "stream data → land in S3 as Parquet."
      </p>
      <p>
        <strong>Kinesis Data Analytics</strong> — run SQL or Apache Flink code directly on a stream without managing infrastructure. Best for real-time aggregations and anomaly detection on streaming data.
      </p>
      <p>
        <strong>Kinesis Video Streams</strong> — for video. Not relevant to data engineering.
      </p>

      <h2>How Kinesis Data Streams works</h2>
      <p>
        A stream is divided into shards. Each shard handles up to 1,000 records per second for writes and 2 MB per second for reads. If you need more throughput, you add more shards.
      </p>
      <p>
        Records are retained in the stream for 24 hours by default (extendable to 7 days or 365 days). Consumers can read at their own pace — one slow consumer does not block a fast one.
      </p>
      <CodeBlock language="python" filename="kinesis_producer.py" code={`import boto3
import json
from datetime import datetime

kinesis = boto3.client('kinesis', region_name='us-east-1')

# Producer: push an event to the stream
def send_order_event(order):
    response = kinesis.put_record(
        StreamName='company-order-events',
        Data=json.dumps({
            'order_id': order['id'],
            'customer_id': order['customer_id'],
            'amount': order['amount'],
            'event_time': datetime.utcnow().isoformat(),
            'event_type': 'order_placed'
        }),
        PartitionKey=str(order['customer_id'])  # same customer → same shard → ordered events
    )
    return response['SequenceNumber']

# Send 10 test orders
for i in range(10):
    seq = send_order_event({'id': f'ORD-{i}', 'customer_id': i % 3, 'amount': 99.99 * i})
    print(f"Sent order {i}, sequence: {seq[:20]}...")`} />

      <CodeBlock language="python" filename="kinesis_consumer.py" code={`import boto3
import json
import time

kinesis = boto3.client('kinesis', region_name='us-east-1')

def read_from_stream(stream_name: str, shard_id: str):
    # Get a shard iterator (TRIM_HORIZON = from the beginning)
    iterator_resp = kinesis.get_shard_iterator(
        StreamName=stream_name,
        ShardId=shard_id,
        ShardIteratorType='TRIM_HORIZON'
    )
    shard_iterator = iterator_resp['ShardIterator']

    print("Reading from stream...")
    while True:
        response = kinesis.get_records(ShardIterator=shard_iterator, Limit=100)
        records = response['Records']

        for record in records:
            event = json.loads(record['Data'])
            print(f"Order: {event['order_id']}, Amount: {event['amount']}")

        shard_iterator = response['NextShardIterator']

        if not records:
            time.sleep(1)  # no records, wait before polling again

read_from_stream('company-order-events', 'shardId-000000000000')`} />

      <h2>Kinesis Firehose — the easier path for most use cases</h2>
      <p>
        If your goal is to land streaming data in S3 as Parquet files every few minutes, Firehose is far simpler than writing a consumer. You configure a Firehose delivery stream in the AWS Console, point it at your Kinesis Data Stream, set the destination to S3, and it handles buffering, converting, and writing automatically.
      </p>
      <CodeBlock language="python" filename="firehose_direct.py" code={`# You can also write directly to Firehose without a Kinesis stream in between
firehose = boto3.client('firehose', region_name='us-east-1')

# Send a batch of records directly to Firehose
records = [
    {'Data': json.dumps({'order_id': f'ORD-{i}', 'amount': 50.0 * i}).encode()}
    for i in range(50)
]

response = firehose.put_record_batch(
    DeliveryStreamName='company-orders-to-s3',
    Records=records
)

failed = response.get('FailedPutCount', 0)
print(f"Sent 50 records, {failed} failed")`} />

      <h2>Kinesis vs Kafka — what to say in interviews</h2>
      <p>
        Interviewers often ask you to compare these. Here is the honest answer:
      </p>
      <p>
        Kinesis is fully managed by AWS — no servers to run, no Zookeeper to maintain, easy to set up. But you are locked into AWS, shard management is manual, and replay is limited to 7 days maximum.
      </p>
      <p>
        Apache Kafka (or Confluent Cloud) is more complex to operate but gives you much more control — unlimited retention, exactly-once semantics, richer consumer group management, and it works on any cloud. Large companies with strict requirements or multi-cloud setups usually choose Kafka.
      </p>
      <p>
        For an AWS-native stack where simplicity matters more than portability — Kinesis. For anything else — Kafka.
      </p>
    </LearnLayout>
  )
}