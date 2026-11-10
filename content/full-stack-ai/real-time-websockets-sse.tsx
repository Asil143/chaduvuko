import { LearnLayout } from '@/components/content/LearnLayout'
import { Bullets, Callout, Code, H3, KeyTakeaways, Mistakes, NextLesson, P, Part, Practice, Steps, Table } from '@/components/content/LessonKit'

export default function RealTimeWebSocketsSse() {
  return (
    <LearnLayout
      title="Real-Time Features — WebSockets and Server-Sent Events"
      description="Push live updates to users with server-sent events and WebSockets, choose between them, and scale real-time connections."
      section="Full-Stack Development with AI — Lesson 12"
      readTime="35 min"
    >
      <Part n={1} label="Choose the interaction" title="Real-Time Does Not Mean the Same Transport Everywhere">
        <P>
          Most web requests follow a simple pattern: the browser asks for something and the server replies. A live feature
          needs the server to deliver a change while the page is still open. Think of a student dashboard that updates a
          course import, a Swiggy-style delivery tracker showing a status change, or a collaborative editor displaying a
          teammate&apos;s cursor. First decide what changes, who may see it, and how quickly it must appear; then choose the
          transport.
        </P>
        <P>
          Start with a durable source of truth, usually the database. A real-time message is a notification that something
          changed, not a replacement for saving that change. If a browser disconnects, it should be able to fetch current
          state again. This separation makes reconnects, debugging, and recovery much easier.
        </P>
        <Table head={['Option', 'Direction', 'Good fit', 'Main trade-off']} rows={[
          ['Polling', 'Browser asks repeatedly', 'Simple status checks; low update frequency', 'Unneeded requests between changes'],
          ['Server-Sent Events (SSE)', 'Server to browser', 'Progress, notifications, live dashboards', 'One-way stream over HTTP'],
          ['WebSocket', 'Both directions', 'Chat, collaboration, interactive sessions', 'More connection and protocol work'],
        ]} />
        <Callout type="info">
          Real-time delivery is usually best-effort. Persist the business action first, then publish an event. If event delivery
          fails, the page can refresh from the database instead of losing the user&apos;s actual work.
        </Callout>
      </Part>

      <Part n={2} label="Define the event" title="Design a Small, Versioned Message Contract">
        <P>
          An event should say what happened, identify the affected resource, and carry only the data its authorized recipients
          need. Do not send an entire database record by default. Use stable event names and identifiers, validate messages on
          both sides, and think about whether consumers can safely receive the same event twice.
        </P>
        <Code lang="typescript" file="src/realtime/order-events.ts" code={`import { z } from "zod"

export const orderStatusEventSchema = z.object({
  eventId: z.string().min(1),
  orderId: z.string().min(1),
  status: z.enum(["placed", "preparing", "out_for_delivery", "delivered"]),
  occurredAt: z.string().datetime(),
})

export type OrderStatusEvent = z.infer<typeof orderStatusEventSchema>

export function serializeOrderStatus(event: OrderStatusEvent): string {
  const valid = orderStatusEventSchema.parse(event)
  return JSON.stringify(valid)
}`} />
        <P>
          This contract deliberately omits a customer address, phone number, payment details, and internal notes. The server
          should check ownership before publishing, not rely on the client to hide fields. An event ID lets a consumer detect
          duplicates; a timestamp helps with display, but should not be treated as a perfectly ordered global clock.
        </P>
        <Callout type="tip">
          Include a schema version when messages must survive independent deployments. During a rollout, old and new servers
          may run at the same time, so avoid changing a field&apos;s meaning without a compatible migration plan.
        </Callout>
      </Part>

      <Part n={3} label="SSE server" title="Send One-Way Updates with Server-Sent Events">
        <P>
          SSE is a long-lived HTTP response with the content type <code>text/event-stream</code>. The browser&apos;s built-in
          <code> EventSource</code> reconnects after many dropped connections and understands event names, IDs, and retry
          hints. It is a good fit when the browser mostly listens and sends user actions through ordinary HTTP endpoints.
        </P>
        <P>
          This Express example keeps subscribers in process to make the stream lifecycle visible. The authentication,
          ownership, and publisher functions are application services; implement them with the session and database patterns
          from the earlier lessons. In-memory subscribers are not shared by multiple server instances.
        </P>
        <Code lang="typescript" file="src/routes/order-events.ts" code={`import { Router, type Request, type Response } from "express"
import type { OrderStatusEvent } from "../realtime/order-events"

const router = Router()
const listeners = new Map<string, Set<Response>>()

router.get("/orders/:orderId/events", async (request: Request, response: Response) => {
  const user = await requireSignedInUser(request)
  const orderId = request.params.orderId
  await assertCanViewOrder(user.id, orderId)

  response.status(200).set({
    "Content-Type": "text/event-stream; charset=utf-8",
    "Cache-Control": "no-cache, no-transform",
    "X-Content-Type-Options": "nosniff",
  })
  response.flushHeaders()
  response.write("retry: 3000\\n\\n")

  const group = listeners.get(orderId) ?? new Set<Response>()
  group.add(response)
  listeners.set(orderId, group)

  const heartbeat = setInterval(() => response.write(": keepalive\\n\\n"), 20000)
  response.on("close", () => {
    clearInterval(heartbeat)
    group.delete(response)
    if (group.size === 0) listeners.delete(orderId)
  })
})

export function publishOrderStatus(event: OrderStatusEvent) {
  const group = listeners.get(event.orderId)
  if (!group) return

  const payload = JSON.stringify(event)
  for (const response of group) {
    if (response.destroyed || response.writableEnded) {
      group.delete(response)
      continue
    }
    response.write("id: " + event.eventId + "\\n")
    response.write("event: order.status\\n")
    response.write("data: " + payload + "\\n\\n")
  }
}`} />
        <P>
          The route checks identity and order ownership before opening a stream. In a real application, cap connections per
          account, handle errors from the authorization service, and verify how your reverse proxy handles buffering and
          idle timeouts. A heartbeat helps keep some intermediaries from treating an active stream as idle; it does not
          guarantee that every network will stay connected.
        </P>
      </Part>

      <Part n={4} label="SSE client" title="Subscribe in React and Always Close the Stream">
        <P>
          Create the subscription in an effect because it is an external connection, and close it in the cleanup function.
          Validate incoming data before using it. Same-origin <code>EventSource</code> requests can use the browser&apos;s normal
          cookie session; the API still must authorize the requested order. Native EventSource does not let you set arbitrary
          request headers, so do not put a reusable bearer token into a query string as a workaround.
        </P>
        <Code lang="tsx" file="app/orders/OrderLiveStatus.tsx" code={`"use client"

import { useEffect, useState } from "react"
import { orderStatusEventSchema } from "@/src/realtime/order-events"

type Props = { orderId: string }

export function OrderLiveStatus({ orderId }: Props) {
  const [status, setStatus] = useState("Loading status…")
  const [connection, setConnection] = useState("connecting")

  useEffect(() => {
    const source = new EventSource(
      "/api/orders/" + encodeURIComponent(orderId) + "/events",
    )
    source.onopen = () => setConnection("connected")
    source.onerror = () => setConnection("reconnecting")
    source.addEventListener("order.status", (message) => {
      try {
        const event = orderStatusEventSchema.parse(JSON.parse(message.data))
        setStatus(event.status.replaceAll("_", " "))
      } catch {
        setConnection("received an invalid update")
      }
    })
    return () => source.close()
  }, [orderId])

  return <p aria-live="polite">Order: {status} ({connection})</p>
}`} />
        <P>
          Reconnection restores the transport, not necessarily every missed business event. When the stream opens again,
          fetch a fresh order snapshot or send a last-seen event ID that the server can replay from a durable event log.
          Keep the UI useful while reconnecting and avoid announcing every heartbeat to assistive technology.
        </P>
        <Callout type="example">
          For a long-running file import, store the latest state as <code>queued</code>, <code>running</code>,
          <code> complete</code>, or <code>failed</code>. SSE can make the progress feel immediate, while a normal GET remains
          the reliable way to recover the current state after the learner returns later.
        </Callout>
      </Part>

      <Part n={5} label="WebSocket" title="Use WebSockets When Both Sides Need to Talk">
        <P>
          A WebSocket begins with an HTTP upgrade and then carries messages in both directions on one persistent connection.
          A collaborative whiteboard can send cursor movements to the server and receive other learners&apos; movements without
          opening a new request for every small update. Do not use a WebSocket simply because it sounds more advanced: ordinary
          POST requests plus SSE may be simpler for a notification feed.
        </P>
        <P>
          Authenticate and authorize during the upgrade, restrict allowed origins for browser clients, set a maximum message
          size, validate every message, and rate-limit actions. This example shows the upgrade boundary with the popular
          <code> ws</code> package; the app-specific authorization helpers must verify the cookie session and access to the
          requested room before the connection is accepted.
        </P>
        <Code lang="typescript" file="src/realtime/websocket-server.ts" code={`import { WebSocketServer } from "ws"
import type { IncomingMessage, Server } from "node:http"

const webSockets = new WebSocketServer({ noServer: true, maxPayload: 16384 })

export function attachRealtime(server: Server) {
  server.on("upgrade", (request, socket, head) => {
    void authorizeRoomUpgrade(request as IncomingMessage)
      .then(({ userId, roomId }) => {
        webSockets.handleUpgrade(request, socket, head, (client) => {
          webSockets.emit("connection", client, request, { userId, roomId })
        })
      })
      .catch(() => socket.destroy())
  })

  webSockets.on("connection", (client, _request, context) => {
    client.on("message", async (raw) => {
      let message: unknown
      try {
        message = JSON.parse(raw.toString())
      } catch {
        client.close(1007, "Invalid message")
        return
      }

      const parsed = cursorMessageSchema.safeParse(message)
      if (!parsed.success) {
        client.close(1008, "Unsupported message")
        return
      }
      await assertCanEditRoom(context.userId, context.roomId)
      await publishCursor(context.roomId, context.userId, parsed.data)
    })
  })
}`} />
        <P>
          This is an upgrade and message-validation sketch, not a complete chat server: define the context type for your
          <code> ws</code> version and handle asynchronous failures, membership cleanup, and outgoing delivery. Never trust
          the room ID or user ID supplied in a message; derive identity from the authenticated connection and re-check
          permission for sensitive operations.
        </P>
      </Part>

      <Part n={6} label="Operate" title="Reconnect, Recover and Scale Beyond One Process">
        <P>
          A process-local map works only while one process owns every connection and every publication. Once you run multiple
          instances, a user may connect to instance A while an order update reaches instance B. Use a shared broker or managed
          realtime service to fan out notifications. Keep durable state in the database; a pub/sub broker distributes live
          messages but may not retain them for offline clients.
        </P>
        <Steps items={[
          'Commit the business state change and an event record in one database transaction when missed publication would matter.',
          'Publish from a worker or transactional outbox so a process crash cannot silently separate the database write from the notification.',
          'Route events through a shared broker to the instances that hold subscribers, and partition or authorize by resource.',
          'On reconnect, fetch a fresh snapshot or replay events after a durable cursor; make client updates idempotent.',
          'Track active connections, reconnects, send failures, queue depth, and end-to-end update delay without logging private payloads.',
        ]} />
        <Table head={['Concern', 'Practical response']} rows={[
          ['Dropped connection', 'Reconnect with bounded backoff; refresh the current snapshot'],
          ['Duplicate or late event', 'Deduplicate by ID and ignore state transitions older than the current version'],
          ['Slow consumer', 'Bound queues; drop replaceable presence updates or disconnect and resync'],
          ['Many server instances', 'Use a shared pub/sub layer or managed connection service'],
          ['Untrusted event data', 'Validate schema, authenticate connection, authorize each resource'],
        ]} />
        <Callout type="warning">
          Sticky sessions can help a load balancer keep a connection on one instance, but they do not broadcast updates
          between instances and do not replace a shared event layer.
        </Callout>
      </Part>

      <Part n={7} label="Pitfalls" title="Common Real-Time Mistakes">
        <Mistakes items={[
          { mistake: 'Using an in-memory subscriber map as a production event bus', cause: 'Each process has a different map, so users connected elsewhere never receive the update.', fix: 'Use a shared broker or managed realtime service when the app has multiple instances.' },
          { mistake: 'Treating a live event as the only copy of a change', cause: 'Networks disconnect and many transports do not retain messages for offline clients.', fix: 'Persist state, then recover by fetching a snapshot or replaying a durable event log.' },
          { mistake: 'Broadcasting every update to every connected user', cause: 'A transport connection does not grant access to every resource.', fix: 'Authorize subscriptions and publications against the signed-in user and resource.' },
          { mistake: 'Leaving streams or sockets open after navigation', cause: 'Orphaned connections consume file descriptors, memory, and server capacity.', fix: 'Close EventSource in effect cleanup; handle socket close and disconnect paths.' },
        ]} />
      </Part>

      <Part n={8} label="Practice" title="Add Live Status to a Study-Plan Import">
        <Practice
          title="A recoverable real-time progress panel"
          tasks={[
            'Define a typed import event with an event ID, import ID, status, progress message, and timestamp; validate it at the boundary.',
            'Add an authenticated SSE route that verifies ownership and removes listeners on close.',
            'Build a React status component that subscribes, validates messages, announces state politely, and closes on unmount.',
            'Simulate a dropped connection and confirm the UI can recover by fetching the latest stored import state.',
            'Write down how the design changes when there are two application instances and when an event must be replayed.',
          ]}
          hint="Keep the database as the source of truth. Use a shared broker only when multiple processes or delivery requirements call for it."
        />
      </Part>

      <KeyTakeaways items={[
        'Polling is simplest for infrequent checks; SSE fits one-way server updates; WebSockets fit low-latency, two-way messages.',
        'Design a small validated event contract and authorize every user-to-resource subscription.',
        'Persist important changes before publishing notifications; reconnecting clients must be able to recover state.',
        'EventSource reconnects automatically, but missed-event replay requires a durable cursor or a fresh snapshot.',
        'An in-memory subscriber collection is process-local; use shared fan-out for a multi-instance deployment.',
        'Bound connections and queues, clean up on disconnect, and measure reliability without logging private payloads.',
      ]} />

      <Bullets items={[
        <span key="mdn">Further reading: MDN documentation for <code>EventSource</code>, the WebSocket API, and the HTML server-sent events format; consult your current framework and proxy documentation for deployment settings.</span>,
      ]} />

      <H3>Next</H3>
      <NextLesson
        href="/learn/full-stack-ai/deploying-full-stack-apps"
        label="Lesson 13 · Deploying a Full-Stack App"
        text="Ship the app with separate environments, managed PostgreSQL, secure configuration, and post-deploy checks."
      />
    </LearnLayout>
  )
}
