import { LearnLayout } from '@/components/content/LearnLayout'
import { Callout, Code, H3, KeyTakeaways, Mistakes, NextLesson, P, Part, Practice, Steps, Table } from '@/components/content/LessonKit'

export default function MessageQueuesAsync() {
  return (
    <LearnLayout
      title="Message Queues and Asynchronous Processing"
      description="Decouple services with queues and event streams, background workers, delivery guarantees, retries and dead-letter queues."
      section="System Design — Lesson 07"
      readTime="35 min"
    >
      <Part n={1} label="Why asynchronous work" title="Keep the User Request Focused">
        <P>
          A checkout request may need to validate a cart and record an order, then send a receipt, update analytics, notify a
          restaurant, and schedule a delivery update. If the web request waits for every downstream system, the slowest call
          determines the user-facing latency. A failure in a nonessential email service can make a successful order appear to
          fail.
        </P>
        <P>
          A queue lets a producer persist a unit of work and return, while a worker handles that work independently. This
          decouples timing and lets consumers scale separately. It does not erase the work: it moves complexity into delivery,
          retries, ordering, duplicate handling, and operational monitoring.
        </P>
        <Code lang="text" code={`
Synchronous chain                         Asynchronous flow

Browser -> Checkout -> Email              Browser -> Checkout -> Order DB
                    -> Analytics                              |
                    -> Restaurant                              +-> Outbox -> Queue
                    -> Delivery                                              |
                                                            Email worker <-+
                                                            Analytics worker <-+
                                                            Restaurant worker <-+
`} />
        <Callout type="info">
          Use asynchronous processing when work can finish after the response, can be retried independently, or has bursty load.
          Keep a truly required decision synchronous unless the product can represent it as pending and finish it later.
        </Callout>
      </Part>

      <Part n={2} label="Queue and stream concepts" title="Messages, Consumers and Events Have Different Jobs">
        <P>
          A message is a request to perform work, such as send this order receipt. An event records a fact that has already
          happened, such as OrderPlaced. A queue commonly distributes work among competing consumers, where one consumer handles
          a given delivery. A pub/sub topic or event stream can let multiple independent consumer groups each process the same
          event history.
        </P>
        <Table
          head={['Concept', 'Typical behavior', 'Design question']}
          rows={[
            ['Queue', 'Competing workers consume pending tasks', 'What happens if the queue backs up?'],
            ['Pub/sub topic', 'Multiple subscriber groups receive events', 'Which consumers need independent copies?'],
            ['Event stream', 'Ordered log retained for replay within its retention policy', 'How far back must consumers replay?'],
            ['Worker', 'Claims work, performs it, then acknowledges', 'When is it safe to acknowledge?'],
            ['Dead-letter queue', 'Stores repeatedly failing work for inspection', 'Who diagnoses and replays it?'],
          ]}
        />
        <P>
          Product vocabulary varies by broker, so verify whether a feature means per-message acknowledgement, per-partition
          offset, visibility timeout, or consumer-group checkpoint. The underlying design questions remain the same even when
          queue APIs differ.
        </P>
      </Part>

      <Part n={3} label="Design the message" title="Make the Contract Small, Versioned and Safe">
        <P>
          A useful message has a stable identifier, event type, schema version, timestamp, and the minimum data a consumer needs
          to do its job. Do not put credentials, payment-card details, or unnecessary personal data in a queue payload. If a
          consumer needs current order state, the message can carry an order ID and the worker can fetch the authorized data.
        </P>
        <Code file="message_contract.py" code={`
from dataclasses import dataclass
from datetime import datetime


@dataclass(frozen=True)
class OrderPlacedV1:
    event_id: str
    order_id: str
    customer_id: str
    occurred_at: datetime
    schema_version: int = 1


def receipt_idempotency_key(event: OrderPlacedV1) -> str:
    return f"receipt:{event.event_id}"
`} />
        <P>
          Event IDs let a consumer identify a repeated delivery. Schema versions let producers add fields or publish a new
          contract without silently changing the meaning of existing data. Make consumers tolerate unknown optional fields,
          and keep compatibility policy explicit when changing required fields.
        </P>
        <Callout type="tip">
          An event should describe a past fact; a command should request an action. Keeping those intentions separate makes it
          easier to reason about replay, ownership, and whether a message is still valid after state changes.
        </Callout>
      </Part>

      <Part n={4} label="Reliability" title="Assume At-Least-Once Delivery and Make Effects Idempotent">
        <P>
          A worker can complete an action and crash before acknowledging the message. The broker then delivers it again. Many
          systems therefore provide at-least-once delivery under common configurations: a message is not intentionally lost,
          but the same message may be processed more than once. Exactly-once claims are scoped to a system boundary and do not
          automatically make an external payment or email exactly once.
        </P>
        <P>
          Idempotency means repeating an operation with the same key has the same intended effect as doing it once. Persist a
          processed-event record or use the downstream provider’s idempotency support where available. For order state, use a
          conditional transition such as pending to confirmed rather than blindly adding another charge or shipment.
        </P>
        <Code file="worker_idempotency.py" code={`
class DuplicateEvent(Exception):
    pass


def handle_order(event, processed_events, send_receipt):
    if event.event_id in processed_events:
        return "already processed"

    # The durable implementation must commit this marker and its effect
    # atomically, or use an idempotency key at the external side-effect boundary.
    send_receipt(event.order_id, idempotency_key=f"receipt:{event.event_id}")
    processed_events.add(event.event_id)
    return "processed"
`} />
        <Callout type="warning">
          A process-local set is only illustrative: it disappears on restart and is unsafe across workers. Production deduplication
          must be durable, concurrency-safe, retained for an appropriate period, and coordinated with the business side effect.
        </Callout>
      </Part>

      <Part n={5} label="Retries and backpressure" title="A Queue Is Not a Bottomless Buffer">
        <P>
          Transient network errors can be retried with bounded exponential backoff and jitter. Permanent failures such as an
          invalid schema should not be retried forever. After a configured number of attempts, move the message to a dead-letter
          queue with its error context and original ID. Operators need an alert, a diagnosis path, and a safe replay procedure.
        </P>
        <P>
          Monitor queue depth, oldest-message age, processing rate, retry count, and dead-letter volume. Queue depth rising for
          a sustained period means arrivals exceed processing capacity. Add workers only if the downstream database or API can
          accept more concurrency; otherwise additional consumers amplify the overload.
        </P>
        <Steps items={[
          'Choose a maximum in-flight count so each worker has bounded work.',
          'Set retry policy by error class and use backoff with jitter for transient failures.',
          'Move poison messages aside after bounded attempts and preserve enough context to investigate.',
          'Define ordering requirements: global order is costly; per-customer or per-order order may be sufficient.',
          'Test shutdown behavior so a worker finishes or releases its message safely.',
        ]} />
      </Part>

      <Part n={6} label="Reliable publishing" title="Avoid the Database-and-Queue Dual-Write Trap">
        <P>
          Imagine the checkout service commits an order row, then crashes before publishing OrderPlaced. The order exists but
          notification workers never learn about it. Reversing the sequence creates the opposite bug: a message announces an
          order whose database transaction rolled back. This is a dual-write problem because two independent systems cannot be
          committed atomically by an ordinary local transaction.
        </P>
        <Code lang="text" code={`
Checkout transaction:
  BEGIN
    INSERT order (...)
    INSERT outbox(event_id, type, payload, published_at = NULL)
  COMMIT

Outbox relay:
  read unpublished rows -> publish to broker -> mark row published
  (a crash can publish twice, so consumers still need idempotency)
`} />
        <P>
          The transactional outbox stores the business change and an event record in the same database transaction. A relay
          publishes outbox rows and records progress. It may publish duplicates if it crashes after publishing but before
          recording success, so consumer idempotency is still required. Retain, monitor, and clean up outbox rows deliberately.
        </P>
        <P>
          For high-volume stream processing, a log-based broker can also support replay and consumer offsets. Replaying is useful
          for rebuilding a projection or fixing a bug, but it can repeat external side effects. Keep projection rebuilds
          separate from sending another real-world receipt or payment request.
        </P>
      </Part>

      <Part n={7} label="Common mistakes" title="Make Failure Visible and Recoverable">
        <Mistakes items={[
          { mistake: 'Assuming a message is delivered exactly once', cause: 'A crash between the side effect and acknowledgement can cause redelivery.', fix: 'Design idempotent handlers and use durable deduplication or downstream idempotency keys.' },
          { mistake: 'Retrying poison messages forever', cause: 'Permanent errors never heal and consume worker capacity.', fix: 'Classify failures, cap attempts, and route exhausted messages to a monitored dead-letter queue.' },
          { mistake: 'Acknowledging before the work is durable', cause: 'A worker crash after acknowledgement loses the work.', fix: 'Acknowledge only after the durable effect or idempotency record has committed.' },
          { mistake: 'Publishing after a database write without an outbox', cause: 'A crash between the two independent writes drops or invents an event.', fix: 'Use a transactional outbox or a documented recovery mechanism, and keep consumers idempotent.' },
        ]} />
      </Part>

      <Part n={8} label="Practice" title="Design Order Notifications Without Blocking Checkout">
        <Practice
          title="Draw the failure paths, not just the happy path"
          tasks={[
            'Separate synchronous checkout requirements from receipt, analytics, and restaurant-notification work.',
            'Define an OrderPlaced event contract with an ID, version, minimum payload, and privacy-conscious fields.',
            'Sketch the outbox relay, broker, and at least two independent consumer groups.',
            'Walk through a worker crash after sending a receipt but before acknowledgement; explain how a duplicate is harmless.',
            'Choose retry limits and dead-letter alerts, then define who can safely replay a failed notification.',
          ]}
          hint="Mark every durable boundary and the moment an acknowledgement is sent. If a crash can happen between two steps, account for it."
        />
      </Part>

      <KeyTakeaways items={[
        'Queues decouple request latency and downstream capacity but add delivery, ordering, and recovery responsibilities.',
        'Distinguish a work command from an event recording a fact; choose queue, topic, or stream from consumer needs.',
        'Design versioned, privacy-conscious messages with stable IDs and small payloads.',
        'Assume duplicate delivery and make business effects idempotent; exactly-once behavior has a limited boundary.',
        'Use bounded retries, backpressure, dead-letter handling, and queue-age monitoring.',
        'A transactional outbox addresses database-and-broker dual writes, while consumers still handle duplicates safely.',
      ]} />

      <H3>Next</H3>
      <NextLesson
        href="/learn/system-design/consistency-cap-consensus"
        label="Lesson 08 · Consistency, CAP and Consensus"
        text="Queues expose how copies and consumers can disagree temporarily. Next, reason about consistency guarantees, network partitions, quorums, and leader coordination."
      />
    </LearnLayout>
  )
}
