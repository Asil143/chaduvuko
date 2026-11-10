import { LearnLayout } from '@/components/content/LearnLayout'
import { Bullets, Callout, Code, H3, KeyTakeaways, Mistakes, NextLesson, P, Part, Practice, Steps, Table } from '@/components/content/LessonKit'

export default function DesignChatNotifications() {
  return (
    <LearnLayout
      title="Case Study — Design a Chat and Notification System"
      description="Real-time messaging with WebSockets, message storage, delivery receipts, presence, and push notifications at scale."
      section="System Design — Lesson 13"
      readTime="50 min"
    >
      <Part n={1} label="Requirements" title="Separate Message Delivery From User Notification">
        <P>
          Design a chat product for direct conversations and small groups. A sender submits a message; members can receive it
          in real time, fetch history later, and see delivery or read state. A user who is offline should still find the message
          when they reconnect, and may receive a push notification if notification settings allow it. Push is a hint that new
          content exists, not the durable message itself.
        </P>
        <Table
          head={['Area', 'First version', 'Clarify before expanding']}
          rows={[
            ['Messaging', 'Text messages with conversation history.', 'Attachments, edits, deletes, reactions, and retention.'],
            ['Delivery', 'Persist once and deliver to active members.', 'Meaning of sent, delivered, and read; ordering scope.'],
            ['Groups', 'Small groups with membership checks.', 'Maximum size and behavior when membership changes.'],
            ['Realtime', 'WebSocket connection for active clients.', 'Reconnect behavior and multiple devices per user.'],
            ['Notifications', 'Push for eligible offline recipients.', 'Quiet hours, preferences, and privacy on lock screens.'],
            ['Quality', 'Durable history, privacy, and practical latency.', 'Whether end-to-end encryption is in scope.'],
          ]}
          caption="Keep durable message storage, live delivery, and push notification as separate responsibilities."
        />
        <P>
          State a modest first release: no voice/video, no public channels, no end-to-end encryption protocol design, and no
          arbitrary broadcast groups. These exclusions make the discussion tractable. If encryption is required, it changes
          key management, search, moderation, and what the server can inspect; call that out rather than casually promising
          it as a checkbox.
        </P>
        <Callout type="info">
          Clarify ordering. A practical guarantee is that messages in one conversation have a stable sequence, while no global
          order across all conversations is promised. This avoids paying for a global ordering service no user needs.
        </Callout>
      </Part>

      <Part n={2} label="Estimates" title="Estimate Writes, Fan-Out, and Retained History">
        <P>
          Use visible assumptions. Suppose the scenario has 5 million daily active users and each sends 30 messages per day.
          That is 150 million messages a day, roughly 1,740 average message writes per second across the service. Peak traffic
          can be a multiple of the average; the correct factor comes from observed usage patterns and must be monitored. If
          the average message plus indexes and metadata costs a few hundred bytes, raw message data alone reaches tens of
          gigabytes per day before replication and backups. Retention and attachments can dominate storage.
        </P>
        <P>
          Delivery work multiplies writes by recipient count. If a conversation averages a few recipients, recipient fan-out
          is several times the message write rate. Do not copy every message into a separate per-user inbox without first
          considering read models, group size, and history access. For very large groups, a single message may create a burst
          of pushes and deliveries; rate limits and asynchronous queues smooth that work.
        </P>
        <Code file="chat_capacity.py" code={`
SECONDS_PER_DAY = 86_400
daily_active_users = 5_000_000
messages_per_user = 30
average_recipients = 3

messages_per_day = daily_active_users * messages_per_user
average_writes_per_second = messages_per_day / SECONDS_PER_DAY
recipient_deliveries_per_day = messages_per_day * average_recipients

print(f"messages/day: {messages_per_day:,}")
print(f"average writes/s: {average_writes_per_second:.0f}")
print(f"recipient deliveries/day: {recipient_deliveries_per_day:,}")
print("peak throughput needs an observed peak factor and headroom")
`} />
        <P>
          Each number is illustrative. Track concurrent sockets, active users, messages per conversation, average group size,
          history retention, and push provider limits. The system should stay correct when a notification vendor is slow or
          unavailable; it must not block durable message acceptance on that external dependency.
        </P>
      </Part>

      <Part n={3} label="API" title="Give Clients Idempotent Send and Cursor-Based History">
        <P>
          A client creates a stable client-generated message ID before sending. The server authenticates the user, verifies
          membership, and deduplicates a retry with that ID. A successful response returns the server's canonical sequence
          and timestamp. History uses a cursor rather than offset pagination because message streams grow and new messages
          arrive while a client scrolls.
        </P>
        <Code file="message_api.py" code={`
from dataclasses import dataclass
from datetime import datetime

@dataclass(frozen=True)
class SendMessageRequest:
    conversation_id: str
    client_message_id: str
    body: str

@dataclass(frozen=True)
class MessageAccepted:
    message_id: str
    conversation_id: str
    sequence: int
    created_at: datetime

# POST /v1/conversations/{id}/messages -> 201 or replayed canonical result
# GET  /v1/conversations/{id}/messages?before={cursor}&limit={n}
# WebSocket events: message.created, message.delivered, message.read
`} />
        <P>
          Bound message size and validate payloads before persistence. Avoid accepting a user ID in the body as proof of
          identity: derive the sender from the authenticated session. WebSocket connections require authentication and
          conversation-level authorization for each subscription. If a connection drops after persistence but before the
          acknowledgement arrives, retry with the same client message ID and return the original result.
        </P>
        <Steps items={[
          'Authenticate the sender and verify current membership in the conversation.',
          'Deduplicate on sender and client message ID; reject a reused ID with different content.',
          'Persist the message and assign a per-conversation sequence in one atomic operation.',
          'Acknowledge durable acceptance, then publish an event for fan-out workers.',
        ]} />
        <Callout type="warning">
          A WebSocket send acknowledgement is not proof every recipient received the message. Distinguish accepted, delivered
          to a device, and read by a person in both API semantics and UI labels.
        </Callout>
      </Part>

      <Part n={4} label="Data model" title="Partition Message History by Conversation">
        <P>
          Store membership separately from messages. The main message access pattern is a conversation's newest messages,
          followed by older pages. A composite key containing conversation ID and sequence supports that query and keeps
          ordering local. Store client message IDs for idempotency. Delivery state can be compact per-recipient cursors instead
          of one row for every message-device pair, depending on required receipt detail and group size.
        </P>
        <Code lang="sql" file="chat_schema.sql" code={`
CREATE TABLE conversation_members (
    conversation_id UUID NOT NULL,
    user_id UUID NOT NULL,
    joined_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    last_read_sequence BIGINT NOT NULL DEFAULT 0,
    PRIMARY KEY (conversation_id, user_id)
);

CREATE TABLE messages (
    conversation_id UUID NOT NULL,
    sequence BIGINT NOT NULL,
    message_id UUID NOT NULL UNIQUE,
    sender_id UUID NOT NULL,
    client_message_id VARCHAR(128) NOT NULL,
    body TEXT NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (conversation_id, sequence),
    UNIQUE (sender_id, client_message_id)
);
CREATE INDEX messages_sender_time_idx ON messages (sender_id, created_at);

CREATE TABLE outbox_events (
    event_id UUID PRIMARY KEY,
    aggregate_id UUID NOT NULL,
    event_type VARCHAR(64) NOT NULL,
    payload JSONB NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    published_at TIMESTAMPTZ
);
`} />
        <P>
          The outbox row is written in the same database transaction as the message, then a worker publishes it to a broker.
          This avoids the failure gap where the database commit succeeds but a direct broker publish fails. Consumers may
          process an event more than once, so they should deduplicate by event ID. A production schema also needs explicit
          membership removal, retention, deletion, and encryption-at-rest decisions.
        </P>
        <Callout type="tip">
          A per-conversation sequence can be allocated by a conversation row update or a partitioned log. Both serialize
          writes for that conversation. That is usually acceptable for direct chat, but can bottleneck an unusually active
          large group; identify the product's maximum group size before selecting the mechanism.
        </Callout>
      </Part>

      <Part n={5} label="High-level design" title="Persist First, Then Fan Out to Connected Devices">
        <P>
          The send path authenticates and persists before acknowledging. An outbox publisher emits a message-created event;
          fan-out workers find current members and route to connected device gateways. Offline recipients discover messages
          through history sync and may receive a push request. Separate notification preferences and provider integration
          from the message store so a slow push provider cannot delay chat.
        </P>
        <Code lang="text" code={`
Mobile / Web Clients -- WebSocket --> Connection Gateways --> Presence Directory
         |                                  ^                      |
         +-- HTTPS send --> Chat API        | live delivery       +--> Device Sessions
                                |            |
                                v            |
                   Message Store + Outbox --+--> Event Broker --> Fan-out Workers
                                                        |             |
                                                        |             +--> Push Queue --> Push Provider
                                                        +--> Receipt / Read State

History Sync -- HTTPS / cursor --> Chat API --> Message Store
`} />
        <P>
          Gateways maintain many client sockets but should not own durable conversation history. The presence directory is
          ephemeral and can expire if a gateway crashes; the message store is authoritative. When a client reconnects, it
          supplies a last-seen cursor and fetches missed messages. This repairs gaps even when an event was lost during a
          network disconnect.
        </P>
      </Part>

      <Part n={6} label="Deep dives" title="Ordering, Delivery Receipts, and Presence">
        <H3>Ordering and retries</H3>
        <P>
          Guarantee order within one conversation, not across the whole service. Route messages for a conversation to the same
          logical partition or serialize sequence allocation transactionally. Broker delivery may be at least once, so
          consumers use event IDs and message IDs to suppress duplicates. Clients deduplicate the canonical message ID and
          sort by sequence, not by device wall-clock time, which can drift.
        </P>
        <Code file="ordered_messages.py" code={`
from dataclasses import dataclass

@dataclass(frozen=True)
class Event:
    event_id: str
    conversation_id: str
    sequence: int
    message_id: str

class Inbox:
    def __init__(self) -> None:
        self.seen: set[str] = set()
        self.messages: dict[tuple[str, int], str] = {}

    def apply(self, event: Event) -> bool:
        if event.event_id in self.seen:
            return False
        key = (event.conversation_id, event.sequence)
        self.messages[key] = event.message_id
        self.seen.add(event.event_id)
        return True

inbox = Inbox()
event = Event("evt-1", "conv-9", 1, "msg-1")
print(inbox.apply(event), inbox.apply(event))
`} />
        <P>
          This in-memory example illustrates idempotent event application; a real consumer persists its deduplication marker
          and state update atomically. If a duplicate event uses a different message ID for the same sequence, do not silently
          overwrite: alert and reconcile because it indicates an allocation or data-integrity bug.
        </P>
        <H3>Receipts and presence</H3>
        <P>
          A delivered receipt means a device has acknowledged receipt according to the product definition; read means the
          user has viewed the conversation. Multiple devices make these states tricky. A compact per-user last-read sequence
          answers which messages are read up to a point. Presence is approximate: devices send heartbeats, and a short-lived
          lease expires after disconnect or missed heartbeat. Do not promise exact online status based on one socket.
        </P>
        <H3>Push and privacy</H3>
        <P>
          Push providers can delay, duplicate, or drop notifications. Enqueue a push only after message persistence, check user
          preferences, collapse redundant alerts when appropriate, and use a generic preview when lock-screen privacy is
          required. Store provider tokens securely and remove invalid tokens after provider feedback. The app always fetches
          actual message content from its authenticated API.
        </P>
      </Part>

      <Part n={7} label="Bottlenecks and trade-offs" title="Scale Hot Conversations and Long-Lived Connections">
        <Table
          head={['Bottleneck', 'Mitigation', 'Trade-off']}
          rows={[
            ['A very large group creates a fan-out spike.', 'Queue recipient delivery, apply backpressure, and consider lazy fan-out for history.', 'Some recipients see updates later; history reads become more important.'],
            ['One conversation partition is write-hot.', 'Bound group size, shard delivery work, or use a dedicated high-volume path.', 'Ordering and membership queries become more complex.'],
            ['Gateway restart drops sockets.', 'Reconnect with backoff and resume from a durable cursor.', 'Clients may briefly show stale presence.'],
            ['Push provider is unavailable.', 'Retry through a queue with limits and dead-letter handling.', 'Notifications are delayed, but chat remains available.'],
            ['Receipt rows grow with members and messages.', 'Store per-user read cursors or aggregate receipts.', 'Fine-grained per-device audit becomes less precise.'],
          ]}
        />
        <P>
          WebSocket gateways need connection limits, graceful draining, and observable reconnect rates. Apply backpressure when
          a client cannot consume events rather than allowing one slow socket to grow memory without bound. Keep message
          history queries paginated and bounded. Metrics should include persistence latency, event lag, delivery success,
          reconnect rate, push queue age, and authorization failures, without logging private message bodies.
        </P>
        <Bullets items={[
          'Use per-user and per-conversation send limits to reduce spam and abusive bursts.',
          'Encrypt transport and storage, restrict operational access, and define message retention clearly.',
          'Rebuild connection state after deploys; never rely on presence memory as durable truth.',
          'Treat queue lag as a user-visible freshness measure, not just an infrastructure statistic.',
        ]} />
      </Part>

      <Part n={8} label="Pitfalls" title="Common Chat-System Design Mistakes">
        <Mistakes items={[
          { mistake: 'Equating sent, delivered, and read', cause: 'Each state has different evidence and can involve multiple devices.', fix: 'Define each receipt precisely and represent only what the system can observe.' },
          { mistake: 'Sending push before the message is durable', cause: 'A device can be notified about content that the store later loses.', fix: 'Persist first, then publish an outbox event for delivery and push.' },
          { mistake: 'Using client timestamps for authoritative order', cause: 'Clock skew and offline retries reorder messages.', fix: 'Assign a server sequence within each conversation and deduplicate stable client IDs.' },
          { mistake: 'Making analytics or push synchronous with send', cause: 'External slowness becomes message latency and availability risk.', fix: 'Use asynchronous workers and keep durable acceptance as the send-path boundary.' },
        ]} />
      </Part>

      <Part n={9} label="Practice" title="Explain the Failure Path, Not Just the Happy Path">
        <Practice
          title="Design a reliable reconnect and delivery flow"
          tasks={[
            'State the contract when the server stores a message but the acknowledgement is lost, then show how the retry is deduplicated.',
            'Choose a sequence-allocation mechanism and explain its behavior for two concurrent sends in the same conversation.',
            'Walk through one recipient online on two devices and another offline; distinguish message delivery from push delivery.',
            'Design a read cursor update that supports paginated history without creating one receipt row per device per message.',
            'List three metrics and two alerts that reveal a growing event-delivery backlog before users report missing updates.',
          ]}
          hint="Start with persisted truth and cursor-based recovery. Real-time transport improves immediacy; it should not be the only way to retrieve a message."
        />
        <KeyTakeaways items={[
          'Define scope and distinguish durable messages, live delivery, receipts, presence, and push notifications.',
          'Estimate message writes and recipient fan-out separately; retention and group size shape the design.',
          'Use authenticated, idempotent send APIs and cursor-based history pagination.',
          'Partition ordering by conversation and make at-least-once event processing safe with deduplication.',
          'Persist before notifying; offline clients recover from durable history after reconnect.',
          'Treat presence as temporary and approximate, and keep push-provider failures off the message critical path.',
        ]} />
      </Part>

      <H3>Next</H3>
      <NextLesson
        href="/learn/system-design/design-food-delivery"
        label="Lesson 14 · Case Study — Design a Food Delivery Platform"
        text="Chat focuses on ordered streams and fan-out. Next, combine geospatial search, an order lifecycle, payment safety, rider matching, and live location updates in a food-delivery system."
      />
    </LearnLayout>
  )
}
