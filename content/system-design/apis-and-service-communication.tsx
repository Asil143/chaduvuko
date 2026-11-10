import { LearnLayout } from '@/components/content/LearnLayout'
import { Callout, Code, H3, KeyTakeaways, Mistakes, NextLesson, P, Part, Practice, Table } from '@/components/content/LessonKit'

export default function ApisAndServiceCommunication() {
  return (
    <LearnLayout
      title="APIs and Service Communication — REST, gRPC, GraphQL and Webhooks"
      description="Design clear APIs and choose between REST, gRPC, GraphQL and webhooks while handling pagination, versioning, retries and idempotency."
      section="System Design — Lesson 03"
      readTime="35 min"
    >
      <Part n={1} label="The contract" title="An API Is a Promise Between Independent Callers">
        <P>
          An API describes what a caller may ask for, what result or error to expect, and which constraints apply. A useful
          contract names resources or operations, request and response shapes, authentication, authorization, validation,
          pagination, compatibility and failure behaviour. It is a product boundary: changing a field, default or error can
          break a mobile app that has not been updated yet.
        </P>
        <P>
          Begin with a use case and its ownership. For example, the order service owns order state; a customer app requests an
          order, but should not directly write an arbitrary status into the database. The interface should represent allowed
          transitions and make the result understandable to both the caller and the service team.
        </P>
        <Callout type="tip">
          Design the interface around a stable domain action, not the current shape of an internal table. Internal storage can
          evolve without forcing every client to migrate in lockstep.
        </Callout>
      </Part>

      <Part n={2} label="REST" title="Use Resource-Oriented HTTP When It Fits the Interaction">
        <P>
          REST-style APIs commonly represent resources with URLs and use HTTP methods to express operations: retrieve a
          resource, create one, replace or partially update it, or remove it. HTTP status codes communicate broad outcomes;
          a structured response body can add a stable machine-readable error code and a safe message. Do not return stack
          traces, database details or secrets to clients.
        </P>
        <Code lang="text" code={`
POST /api/orders
Authorization: Bearer <access-token>
Idempotency-Key: 8f9e...client-generated-key
Content-Type: application/json

{"items":[{"productId":"course-42","quantity":1}],"addressId":"addr-7"}

201 Created
Location: /api/orders/order-812
{"id":"order-812","status":"pending_payment"}
`} />
        <P>
          The response indicates that the resource was created and gives its location. The exact status code and representation
          are design choices for the contract; consistency matters more than copying a sample blindly. Define validation errors,
          authentication failures, conflicts and transient service failures in the API documentation and tests.
        </P>
        <Code lang="python" file="build_url.py" code={`
from urllib.parse import urlencode


def course_search_url(base_url: str, query: str, page_size: int, cursor: str | None = None) -> str:
    if page_size < 1:
        raise ValueError("page_size must be positive")
    params = {"q": query, "limit": page_size}
    if cursor is not None:
        params["cursor"] = cursor
    return f"{base_url.rstrip('/')}/api/courses?{urlencode(params)}"


print(course_search_url("https://learn.example", "data engineering", 20, "next-page"))
`} />
        <P>
          Encoding parameters avoids corrupting a URL when a search term contains spaces or punctuation. Real clients should
          also enforce reasonable page-size limits and handle authentication, cancellation, timeouts and non-success responses.
        </P>
      </Part>

      <Part n={3} label="Choose a protocol" title="REST, gRPC, GraphQL and Webhooks Solve Different Problems">
        <P>
          REST over HTTP is broadly interoperable and easy to inspect. gRPC uses typed service definitions and is often useful
          for efficient service-to-service calls and streaming, especially when both ends can use its tooling. GraphQL lets a
          client request a shape of data through a schema; it can reduce over-fetching for complex clients but needs careful
          authorization, query-cost limits and caching. Webhooks are outbound HTTP notifications from one system to another;
          they are not a replacement for a request-response API.
        </P>
        <Table
          head={['Style', 'Useful when', 'Costs to plan for']}
          rows={[
            ['REST / HTTP', 'Public or browser-facing resources and broad compatibility', 'Resource and error consistency, pagination, versioning'],
            ['gRPC', 'Typed internal calls, generated clients or streaming', 'Protocol tooling, gateway needs and coordinated schemas'],
            ['GraphQL', 'Clients need flexible, related data shapes', 'Authorization per field, query complexity and caching strategy'],
            ['Webhook', 'A receiver needs to learn that an event occurred', 'Delivery retries, signatures, duplicates and replay handling'],
          ]}
          caption="Choose based on clients, interaction pattern and operating constraints—not on a protocol popularity list."
        />
        <Code lang="text" code={`
Mobile app  -- HTTPS request --> API gateway --> Order service
                                                  |       |
                                                  |       +--> order database
                                                  |
                                                  +-- event --> durable queue --> notification worker
                                                                        |
Payment provider -- signed webhook --> webhook endpoint ----------------+

The API response acknowledges the order action; downstream notifications
and payment events have their own delivery and retry contracts.
`} />
        <Callout type="example">
          If a payment provider calls your webhook, verify its signature using the provider's documented method, store the
          event identifier and process it idempotently. Do not trust a public request merely because its JSON looks valid.
        </Callout>
      </Part>

      <Part n={4} label="Pagination and compatibility" title="Keep Large Collections and Evolving Clients Safe">
        <P>
          Do not return an unbounded collection. Offset pagination is easy to understand, but deep offsets can become costly
          and concurrent inserts can move results between pages. Cursor pagination returns a continuation token based on a
          stable ordering. Treat the cursor as opaque to clients and bind it to the relevant filters and sort order; validate
          it rather than trusting client-provided internals.
        </P>
        <P>
          Backward-compatible changes generally add optional fields or new capabilities without changing the meaning of
          existing ones. Removing a field, changing units or repurposing an enum value can break older clients. Versioning
          should be an explicit policy with a deprecation window, usage visibility and a migration path—not an excuse to avoid
          compatibility tests.
        </P>
        <Code lang="python" file="cursor_page.py" code={`
from dataclasses import dataclass

@dataclass
class Page:
    items: list[str]
    next_cursor: str | None


def page(items: list[str], start: int, page_size: int) -> Page:
    if start < 0 or page_size < 1:
        raise ValueError("start must be non-negative and page_size positive")
    selected = items[start:start + page_size]
    next_start = start + len(selected)
    next_cursor = str(next_start) if next_start < len(items) else None
    return Page(selected, next_cursor)


catalog = ["python", "sql", "distributed systems", "cloud"]
print(page(catalog, start=0, page_size=2))
`} />
        <P>
          This example uses a plain offset encoded as a cursor only to illustrate response shape. A production cursor should
          represent a stable ordering key and should be opaque, validated and scoped to the query. A timestamp alone can be
          ambiguous when records share the same timestamp; use a deterministic tie-breaker such as an identifier.
        </P>
      </Part>

      <Part n={5} label="Safe retries" title="Make Writes Idempotent Before Retrying Them">
        <P>
          A timeout does not tell the client whether the server completed the operation. If the client blindly repeats a
          payment or enrolment request, it may create duplicate effects. Idempotency means repeating the same operation with
          the same key and payload produces one logical result. Persist the key, request identity and outcome for an appropriate
          retention period; reject reuse of the key with a different payload. The exact storage design depends on the domain.
        </P>
        <Code lang="python" file="idempotency_keys.py" code={`
import hashlib
import json


def request_fingerprint(payload: dict) -> str:
    canonical = json.dumps(payload, sort_keys=True, separators=(",", ":"))
    return hashlib.sha256(canonical.encode("utf-8")).hexdigest()


payload = {"course_id": "course-42", "learner_id": "learner-9"}
print(request_fingerprint(payload))
`} />
        <P>
          A fingerprint can detect payload changes, but a hash function alone does not make an operation idempotent. The
          application must atomically claim a unique client key, run or resume the operation, and persist the outcome so
          concurrent retries do not race. Never put sensitive data into a key merely because it is opaque.
        </P>
        <Callout type="warning">
          Retry only failures that may be transient, with a bounded policy and backoff. Do not retry validation or permission
          errors. Respect any server-provided retry guidance and avoid retrying at multiple layers without a total attempt budget.
        </Callout>
      </Part>

      <Part n={6} label="Communication" title="Synchronous Calls Need Deadlines; Events Need Delivery Rules">
        <P>
          A synchronous service call is easy to reason about while every dependency is fast, but one slow dependency can hold
          resources and push tail latency through the entire request chain. Give calls a deadline, propagate the remaining
          budget, limit concurrency and return a clear outcome when the deadline expires. A timeout does not cancel work
          automatically unless the client and server propagate cancellation.
        </P>
        <P>
          Asynchronous communication can isolate slow work and smooth bursts. It changes the contract: callers may receive
          “accepted” or “pending,” consumers may see duplicates, and status becomes visible later. Define event schema
          compatibility, ordering requirements, retries, dead-letter handling and how a consumer safely repeats work. An
          event notification is not necessarily the source of truth; identify which system owns the durable state.
        </P>
        <Table
          head={['Concern', 'Synchronous request', 'Asynchronous event']}
          rows={[
            ['User feedback', 'Immediate success or failure', 'Usually pending, followed by a later update'],
            ['Failure behaviour', 'Timeout and dependency failure affect caller', 'Queue retention and consumer recovery matter'],
            ['Duplicate handling', 'Idempotent request keys', 'Idempotent event processing'],
            ['Best fit', 'Decision needed before response', 'Independent work that may complete later'],
          ]}
        />
      </Part>

      <Part n={7} label="Pitfalls" title="Common API Design Mistakes">
        <Mistakes items={[
          { mistake: 'Returning a database row as the public contract', cause: 'Internal schema changes then become client-breaking changes.', fix: 'Define a stable, documented representation around the domain use case.' },
          { mistake: 'Retrying a write after every timeout', cause: 'The first request may already have committed its side effect.', fix: 'Use an idempotency key and make the operation outcome durable.' },
          { mistake: 'Returning every record in one response', cause: 'Large responses waste bandwidth and can overload memory or databases.', fix: 'Use bounded pagination with stable ordering and an opaque cursor.' },
          { mistake: 'Treating a webhook as trusted input', cause: 'Any reachable client can send a forged or replayed request.', fix: 'Verify signatures, validate schema, deduplicate and process safely.' },
        ]} />
      </Part>

      <Part n={8} label="Practice" title="Design an Enrolment API Contract">
        <Practice
          title="Specify the contract before writing the handler"
          tasks={[
            'Define a request and response for enrolling a learner in a course, including the relevant identifiers.',
            'List expected validation, authorization, conflict and transient failure outcomes.',
            'Choose a pagination approach for the learner’s course history and explain its ordering key.',
            'Describe an idempotency-key lifecycle for a client that retries after a timeout.',
            'Decide whether an enrolment confirmation email is part of the response path or an asynchronous event.',
          ]}
          hint="Write down ownership: the enrolment service decides whether a learner is enrolled; an email worker should not invent that state."
        />
      </Part>

      <KeyTakeaways items={[
        'An API contract defines operations, data shapes, errors, access rules and compatibility expectations.',
        'REST, gRPC, GraphQL and webhooks fit different client and communication needs; compare their operating costs.',
        'Bound collection responses and use deterministic pagination that can tolerate concurrent data changes.',
        'A timeout leaves outcome uncertain; idempotency protects writes from duplicate side effects.',
        'Synchronous calls need deadlines and bounded retries; asynchronous events need delivery, ordering and deduplication rules.',
        'Keep public contracts independent of private database schemas and verify external callbacks.',
      ]} />

      <H3>Next</H3>
      <NextLesson
        href="/learn/system-design/load-balancing-cdn"
        label="Lesson 04 · Load Balancing, Reverse Proxies and CDNs"
        text="You have defined how clients and services communicate. Next, learn how a proxy routes requests across healthy application instances and how a CDN brings cacheable content closer to users."
      />
    </LearnLayout>
  )
}
