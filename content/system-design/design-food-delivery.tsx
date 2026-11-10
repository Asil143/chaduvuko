import { LearnLayout } from '@/components/content/LearnLayout'
import { Bullets, Callout, Code, H3, KeyTakeaways, Mistakes, NextLesson, P, Part, Practice, Steps, Table } from '@/components/content/LessonKit'

export default function DesignFoodDelivery() {
  return (
    <LearnLayout
      title="Case Study — Design a Food Delivery Platform"
      description="Restaurant search, ordering, payments, rider matching and live tracking for a food delivery app."
      section="System Design — Lesson 14"
      readTime="50 min"
    >
      <Part n={1} label="Requirements" title="Model Three People and One Time-Sensitive Order">
        <P>
          Design a food-delivery platform connecting customers, restaurants, and delivery riders. A customer discovers an
          open restaurant, checks a menu, places an order, pays, follows restaurant preparation, and sees delivery progress.
          A restaurant accepts or rejects the order; the platform assigns a nearby available rider and shares location
          updates until delivery. A user-friendly design must still behave correctly when a restaurant rejects an order, a
          payment callback is delayed, or no rider is available.
        </P>
        <Table
          head={['Area', 'First version', 'Important quality goal']}
          rows={[
            ['Discovery', 'Search restaurants by location, cuisine, and availability.', 'Results are geographically relevant and not stale for long.'],
            ['Ordering', 'Create an order from a menu with a quoted total.', 'Price and menu snapshot do not silently change after checkout.'],
            ['Payment', 'Authorize or collect payment and settle refunds on failure.', 'Retries never charge the customer twice.'],
            ['Fulfilment', 'Restaurant accepts, prepares, and hands off to a rider.', 'State transitions are visible and recoverable.'],
            ['Tracking', 'Customer sees status and recent rider location.', 'Location is fresh enough for an ETA, with privacy controls.'],
            ['Operations', 'Support can inspect the order timeline.', 'Every transition has an actor, time, and reason.'],
          ]}
          caption="Clarify delivery radius, service hours, cancellations, substitutions, tips, and partial refunds."
        />
        <P>
          Scope the first release to one city, one currency, and standard menus. Defer subscriptions and grocery delivery.
          Define cancellation rules and when a restaurant or rider can no longer be reassigned.
        </P>
        <Callout type="info">
          Keep the order total as a confirmed snapshot: item prices, quantities, taxes, delivery fee, and discounts at checkout.
          A restaurant's menu changing later must not rewrite a customer's existing order.
        </Callout>
      </Part>

      <Part n={2} label="Estimates" title="Estimate Orders, Search, and Location Separately">
        <P>
          Use illustrative scenario assumptions. Suppose 1 million daily active customers place an average of 0.2 orders per
          day; that yields 200,000 orders per day, or about 2.3 average order creations per second. Meal periods create peaks
          well above the average, so measure lunch and dinner patterns and provision with headroom. Restaurant search and
          menu reads are much more frequent than order writes and should be cached carefully, while availability and menu
          updates need bounded staleness.
        </P>
        <P>
          Location traffic is a different workload. If 20,000 active riders report location every few seconds, updates can
          outnumber orders by a wide margin. The exact interval should be tuned to movement, battery, network cost, and
          customer usefulness; do not broadcast every raw GPS point to every nearby client. Keep only the latest location in
          a fast ephemeral store, and retain longer history only when there is a clear operational or legal need.
        </P>
        <Code file="delivery_capacity.py" code={`
SECONDS_PER_DAY = 86_400
daily_active_customers = 1_000_000
orders_per_customer_per_day = 0.2
active_riders = 20_000
location_interval_seconds = 5

orders_per_day = daily_active_customers * orders_per_customer_per_day
average_orders_per_second = orders_per_day / SECONDS_PER_DAY
location_updates_per_second = active_riders / location_interval_seconds

print(f"orders/day: {orders_per_day:,.0f}")
print(f"average order creates/s: {average_orders_per_second:.1f}")
print(f"illustrative location updates/s: {location_updates_per_second:,.0f}")
print("measure real peak factors, fan-out, and payload sizes before sizing")
`} />
        <P>
          These paths need different storage: cache menu reads, persist orders transactionally, and optimize location for
          frequent updates. Their freshness, durability, and cost requirements differ.
        </P>
        <Callout type="tip">
          Ask which traffic is a read, a durable business event, and a rapidly expiring observation. That classification often
          reveals the right storage boundaries more clearly than a list of fashionable databases.
        </Callout>
      </Part>

      <Part n={3} label="API" title="Make Checkout and State Changes Explicit">
        <P>
          A customer first fetches nearby restaurants and menus, then submits an order with item IDs, quantities, and a client
          idempotency key. The server validates current menu availability and calculates the authoritative total. Restaurant,
          payment, and rider actions are separate authenticated commands. Tracking clients subscribe to an order they are
          authorized to view; they do not choose the order's status themselves.
        </P>
        <Code file="order_api.py" code={`
from dataclasses import dataclass
from decimal import Decimal

@dataclass(frozen=True)
class OrderLineRequest:
    menu_item_id: str
    quantity: int

@dataclass(frozen=True)
class CreateOrderRequest:
    restaurant_id: str
    lines: tuple[OrderLineRequest, ...]
    delivery_address_id: str
    idempotency_key: str

@dataclass(frozen=True)
class PriceQuote:
    subtotal: Decimal
    delivery_fee: Decimal
    total: Decimal

# POST /v1/orders -> 201 with order_id, status, confirmed quote
# POST /v1/orders/{id}/restaurant-decision -> authorized restaurant command
# GET  /v1/orders/{id}/events -> cursor-based customer timeline
`} />
        <P>
          Reject invalid quantities, unavailable items, stale quotes, or out-of-area addresses. Reuse an existing order only
          when an idempotency key and request payload match; the server calculates prices in integer minor units or decimal.
        </P>
        <Steps items={[
          'Validate identity, address, restaurant state, and item quantities.',
          'Recalculate the total from the current menu and persist the item and fee snapshot.',
          'Create the order and an outbox event in one transaction using the idempotency key.',
          'Return the stable order ID; process payment and fulfilment through explicit state transitions.',
        ]} />
        <Callout type="warning">
          A payment timeout does not tell the application whether the provider captured money. Query or reconcile the payment
          using a stable provider reference before trying a new charge or issuing a refund.
        </Callout>
      </Part>

      <Part n={4} label="Data model" title="Keep the Order Snapshot and Timeline Durable">
        <P>
          Orders are business records and should be durable. Keep an order header, immutable line snapshots, payment attempts,
          and an append-only event timeline. The state column supports current reads; the event history explains how that
          state was reached. Restaurant and rider data have separate ownership and lifecycles. A spatial database or geospatial
          index can serve restaurant and rider discovery, but do not couple the order's financial history to a volatile GPS
          table.
        </P>
        <Code lang="sql" file="delivery_schema.sql" code={`
CREATE TABLE orders (
    order_id UUID PRIMARY KEY,
    customer_id UUID NOT NULL,
    restaurant_id UUID NOT NULL,
    status VARCHAR(32) NOT NULL,
    currency CHAR(3) NOT NULL,
    subtotal_minor BIGINT NOT NULL,
    delivery_fee_minor BIGINT NOT NULL,
    total_minor BIGINT NOT NULL,
    idempotency_key VARCHAR(128) NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    UNIQUE (customer_id, idempotency_key)
);

CREATE TABLE order_lines (
    order_id UUID NOT NULL REFERENCES orders(order_id),
    line_number INTEGER NOT NULL,
    menu_item_id UUID NOT NULL,
    item_name_snapshot TEXT NOT NULL,
    unit_price_minor BIGINT NOT NULL,
    quantity INTEGER NOT NULL CHECK (quantity > 0),
    PRIMARY KEY (order_id, line_number)
);

CREATE TABLE order_events (
    event_id UUID PRIMARY KEY,
    order_id UUID NOT NULL REFERENCES orders(order_id),
    sequence BIGINT NOT NULL,
    event_type VARCHAR(64) NOT NULL,
    actor_id UUID,
    payload JSONB NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    UNIQUE (order_id, sequence)
);
`} />
        <P>
          Index customer history and restaurant queues based on real queries. Store payment references, not raw card details;
          define retention and access controls for addresses and rider location.
        </P>
        <P>
          Location records can be ephemeral: rider ID, coordinate, observed-at time, and a short-lived assignment reference.
          Each update replaces the previous current-location value. The order timeline can record assignment and hand-off
          events without storing a complete minute-by-minute route unless the product requires it.
        </P>
      </Part>

      <Part n={5} label="High-level design" title="Separate Discovery, Order Orchestration, and Live Tracking">
        <P>
          Customer search reads restaurant profiles, menus, and serviceability. Checkout writes an order and outbox event;
          orchestration coordinates payment, restaurant acknowledgement, and rider matching. Dedicated workers process
          retries and timeouts. A location service ingests rider updates and streams authorized, rate-limited tracking updates
          to the customer. Each downstream interaction is observable and can be retried or compensated where needed.
        </P>
        <Code lang="text" code={`
Customer App --> API Gateway --> Discovery Service --> Geo Index / Menu Cache
      |                 |
      |                 +--> Order Service --> Order DB + Transactional Outbox
      |                                           |
      |                                           v
      |                                      Event Broker
      |                                      /     |      \
      |                                     v      v       v
      |                              Payment   Restaurant  Dispatch Service
      |                              Adapter    Workflow         |
      |                                                        v
      |                                                Rider Matching / Geo Index
      |                                                        ^
      | Rider App -- location stream --> Location Ingest -----+
      |                                                        |
      +<---- Authorized Tracking Stream <---- Order / Location Fan-out
`} />
        <P>
          These can begin as modules in one application. Split services only when scale or ownership justifies the cost; a
          broker does not replace state transitions or reconciliation.
        </P>
      </Part>

      <Part n={6} label="Deep dives" title="Orchestrate the Order and Match Riders Carefully">
        <H3>Order lifecycle and payment</H3>
        <P>
          A simplified lifecycle is created, payment-pending, confirmed, restaurant-accepted, preparing, ready-for-pickup,
          rider-assigned, picked-up, delivered, or cancelled/refunded. Not every path visits every state. Validate transitions
          centrally and attach an idempotency token to external payment operations. If a restaurant rejects after payment
          authorization, release the authorization or refund according to the provider contract and record the compensating
          action. A saga coordinates these steps; it is not a distributed database transaction.
        </P>
        <Code file="order_state.py" code={`
ALLOWED = {
    "created": {"payment_pending", "cancelled"},
    "payment_pending": {"confirmed", "payment_failed", "cancelled"},
    "confirmed": {"restaurant_accepted", "cancelled"},
    "restaurant_accepted": {"preparing", "cancelled"},
    "preparing": {"ready_for_pickup", "cancelled"},
    "ready_for_pickup": {"rider_assigned", "cancelled"},
    "rider_assigned": {"picked_up", "cancelled"},
    "picked_up": {"delivered"},
}

def transition(current: str, target: str) -> str:
    if target not in ALLOWED.get(current, set()):
        raise ValueError(f"invalid transition: {current} -> {target}")
    return target

print(transition("preparing", "ready_for_pickup"))
`} />
        <P>
          Adapt this table to actual cancellation policies. Sequence transitions to reject concurrent stale updates, and
          reconcile orders stuck in payment or restaurant-pending states after timeouts.
        </P>
        <H3>Restaurant and rider workflow</H3>
        <P>
          Restaurants need an acceptance deadline and preparation milestones. Rider matching searches nearby available
          riders, ranks by ETA, workload, and constraints, then reserves a rider atomically to prevent conflicting assignments.
        </P>
        <Code file="candidate_ranking.py" code={`
def rank_candidates(candidates, pickup_lat, pickup_lon):
    ranked = []
    for rider in candidates:
        distance = abs(rider["lat"] - pickup_lat) + abs(rider["lon"] - pickup_lon)
        score = distance + rider["active_orders"] * 0.5
        ranked.append((score, rider["id"]))
    return [rider_id for _, rider_id in sorted(ranked)]

candidates = [
    {"id": "r-1", "lat": 16.50, "lon": 80.64, "active_orders": 0},
    {"id": "r-2", "lat": 16.52, "lon": 80.65, "active_orders": 1},
]
print(rank_candidates(candidates, 16.51, 80.64))
`} />
        <P>
          This uses coordinate distance only to demonstrate ranking. Production matching needs a spatial index and a
          road-network ETA; straight-line distance is not a guaranteed arrival time.
        </P>
        <H3>Live tracking</H3>
        <P>
          Reject stale or unauthorized rider updates and share them only with the active order's customer and permitted
          staff. Show the last-updated time, reduce stationary updates, and stop sharing after delivery or cancellation.
        </P>
      </Part>

      <Part n={7} label="Bottlenecks and trade-offs" title="Protect the Marketplace During the Dinner Peak">
        <Table
          head={['Bottleneck', 'Design response', 'Trade-off']}
          rows={[
            ['Popular restaurant overloads search or checkout.', 'Cache menu reads, reserve capacity, and rate-limit writes.', 'A menu may be briefly stale; checkout must revalidate.'],
            ['No nearby rider accepts.', 'Expand search gradually, adjust incentives by policy, or offer a revised ETA.', 'Longer assignment time or higher fulfillment cost.'],
            ['Payment callback arrives late or twice.', 'Idempotent provider reference, event deduplication, and reconciliation.', 'More workflow states and operational tooling.'],
            ['GPS updates overwhelm downstream clients.', 'Coalesce latest location and sample authorized fan-out.', 'Tracking is less granular but sufficient for progress.'],
            ['A hot city cell attracts many searches.', 'Partition geo indexes and cache by cell with bounded freshness.', 'Complexity when moving between cell boundaries.'],
          ]}
        />
        <P>
          Enforce confirmed pricing, valid state transitions, and one assignment per rider capacity. Search may be eventually
          consistent, but checkout must revalidate. Location can be delayed; expose freshness and monitor it.
        </P>
        <Bullets items={[
          'Measure restaurant acceptance time, payment outcomes, rider assignment latency, delivery duration, and stale location age.',
          'Use circuit breakers and bounded retries around payment, mapping, and notification providers.',
          'Provide operational queues for stuck orders, failed refunds, and unassigned deliveries.',
          'Protect customer and rider safety: restrict precise location access to the active delivery and authorized support roles.',
        ]} />
      </Part>

      <Part n={8} label="Pitfalls" title="Common Food-Delivery Design Mistakes">
        <Mistakes items={[
          { mistake: 'Recomputing a historical order from the current menu', cause: 'Restaurants can change prices or remove items after checkout.', fix: 'Persist a confirmed line-item and fee snapshot with the order.' },
          { mistake: 'Treating payment as a synchronous boolean', cause: 'Network timeouts and callbacks can leave the outcome unknown or duplicated.', fix: 'Model attempts, idempotency, callbacks, and reconciliation as explicit states.' },
          { mistake: 'Matching riders by nearest coordinate alone', cause: 'Straight-line distance ignores roads, workload, vehicle capacity, and pickup readiness.', fix: 'Use geo search for candidate generation, then rank with realistic ETA and constraints.' },
          { mistake: 'Broadcasting every raw GPS update', cause: 'It wastes bandwidth and can expose more location history than needed.', fix: 'Coalesce updates, scope access to active orders, and expire current-location data.' },
        ]} />
      </Part>

      <Part n={9} label="Practice" title="Trace One Failure From Checkout to Recovery">
        <Practice
          title="Design a recoverable order workflow"
          tasks={[
            'Write an order state diagram that includes payment timeout, restaurant rejection, customer cancellation, and refund completion.',
            'Calculate order and location event rates using a different city scenario, then state which path needs peak capacity.',
            'Define the exact idempotency behavior for a repeated checkout request and a repeated payment callback.',
            'Choose a geo-index cell strategy for rider candidates and explain how you avoid assigning one rider twice.',
            'List the minimum order events support needs to resolve a complaint without retaining unnecessary location history.',
          ]}
          hint="For every external side effect, write down how the workflow knows whether it succeeded and how it safely retries or compensates."
        />
        <KeyTakeaways items={[
          'Clarify customer, restaurant, rider, payment, and tracking behaviors before selecting components.',
          'Estimate orders, discovery reads, and location updates as distinct workloads with different storage needs.',
          'Persist confirmed price snapshots and use idempotency keys for checkout and payment operations.',
          'Represent order progress as guarded state transitions backed by a durable event timeline.',
          'Use geospatial search to find rider candidates, then rank and reserve assignments atomically.',
          'Treat location as sensitive, approximate, and short-lived; keep notification and mapping failures recoverable.',
        ]} />
      </Part>

      <H3>Next</H3>
      <NextLesson
        href="/learn/system-design/system-design-interview"
        label="Lesson 15 · System Design Interview — Framework and Practice Questions"
        text="You have worked through three different system shapes. Finish by practicing a repeatable interview framework, concise trade-off communication, and common question patterns."
      />
    </LearnLayout>
  )
}
