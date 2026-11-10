import { LearnLayout } from '@/components/content/LearnLayout'
import { Callout, Code, H3, KeyTakeaways, Mistakes, NextLesson, P, Part, Practice, Steps, Table } from '@/components/content/LessonKit'

export default function ReliabilityPatternsRateLimiting() {
  return (
    <LearnLayout
      title="Reliability Patterns — Timeouts, Retries, Circuit Breakers and Rate Limiting"
      description="Design for failure with timeouts, retries with backoff, circuit breakers, bulkheads, and token-bucket rate limiting."
      section="System Design — Lesson 09"
      readTime="40 min"
    >
      <Part n={1} label="Failure is normal" title="One Slow Dependency Can Consume Your Whole Service">
        <P>
          A request from a customer can cross an application server, database, cache, payment provider, and notification API.
          Any dependency can be slow, disconnected, overloaded, or return an error. If your service waits indefinitely, a small
          number of slow calls can occupy every worker and cause healthy requests to fail too. Reliability patterns limit that
          spread and make failure behavior explicit.
        </P>
        <P>
          Start by defining a request budget: how long the user-facing operation may take, how much time each dependency can use,
          and which work is optional. A timeout is not merely a local setting; it should fit inside the caller’s remaining budget.
        </P>
        <Code lang="text" code={`
Client deadline: 2 seconds
  API handler:     1.8 seconds maximum
    database:      0.6 seconds
    payment call:  0.9 seconds (only if time remains)
    response:      remaining time for validation and serialization

If the caller has already cancelled, do not start optional downstream work.
`} />
        <Callout type="info">
          A timeout means the caller stopped waiting. It does not prove that the remote operation did not happen. This matters
          for payments, orders, and any write that can be retried.
        </Callout>
      </Part>

      <Part n={2} label="Timeouts and retries" title="Retry Only When the Operation Can Safely Repeat">
        <P>
          Set connection and response deadlines for every network call. Retries help with transient failures, but they also add
          load precisely when a dependency may be struggling. Use a small retry budget, exponential backoff, and random jitter
          to avoid synchronized retry bursts. Do not retry malformed requests, authorization errors, or business-rule failures.
        </P>
        <Table
          head={['Failure class', 'Typical approach', 'Important check']}
          rows={[
            ['Connect timeout / temporary network error', 'Bounded retry with backoff and jitter', 'Is the operation idempotent?'],
            ['Server overload / transient 5xx', 'Retry only within caller deadline', 'Will retries worsen saturation?'],
            ['Validation or permission failure', 'Return or handle the failure; do not retry', 'Can the request be corrected?'],
            ['Ambiguous write timeout', 'Query operation status or retry with idempotency key', 'Could the first attempt have committed?'],
          ]}
        />
        <Code file="retry_policy.py" code={`
import random
import time


def retry_transient(operation, attempts=3, base_delay=0.1, max_delay=1.0):
    for attempt in range(attempts):
        try:
            return operation()
        except (TimeoutError, ConnectionError):
            if attempt + 1 == attempts:
                raise
            ceiling = min(max_delay, base_delay * (2 ** attempt))
            time.sleep(random.uniform(0, ceiling))

    raise RuntimeError("unreachable")
`} />
        <P>
          This small example retries only two transient exception classes, and its maximum wait is bounded per attempt. A real
          client also needs an overall deadline, observability, cancellation, and an idempotency strategy for writes. Avoid
          stacking several independent retry layers: three layers with multiple attempts can multiply the total requests.
        </P>
        <Callout type="warning">
          Retry amplification is a real outage pattern: an overloaded service gets retries from many callers, which increase
          load, which causes more timeouts and still more retries. Backoff, jitter, and a global request budget break that loop.
        </Callout>
      </Part>

      <Part n={3} label="Circuit breakers" title="Stop Calling a Dependency That Is Clearly Failing">
        <P>
          A circuit breaker tracks recent outcomes. In the closed state, calls flow normally. When failures exceed a threshold,
          it opens and fails fast without calling the dependency. After a cool-down, it allows a limited probe in the
          half-open state. Success closes the breaker; failure opens it again. The breaker protects capacity but does not
          repair the dependency or replace a useful fallback.
        </P>
        <Code file="circuit_breaker.py" code={`
from enum import Enum
import time


class State(Enum):
    CLOSED = "closed"
    OPEN = "open"
    HALF_OPEN = "half_open"


class CircuitBreaker:
    def __init__(self, failure_limit=3, reset_after=5.0):
        self.failure_limit = failure_limit
        self.reset_after = reset_after
        self.failures = 0
        self.opened_at = None
        self.state = State.CLOSED

    def allow_call(self):
        if self.state is State.OPEN and time.monotonic() - self.opened_at >= self.reset_after:
            self.state = State.HALF_OPEN
        return self.state is not State.OPEN

    def record_success(self):
        self.failures = 0
        self.opened_at = None
        self.state = State.CLOSED

    def record_failure(self):
        self.failures += 1
        if self.state is State.HALF_OPEN or self.failures >= self.failure_limit:
            self.state = State.OPEN
            self.opened_at = time.monotonic()
`} />
        <P>
          This is a teaching sketch, not a production library: it is not thread-safe, records no rolling time window, and
          treats every failure equally. Production breakers need concurrency control, metrics, carefully chosen thresholds,
          and a half-open probe policy that does not let all waiting requests through at once.
        </P>
      </Part>

      <Part n={4} label="Bulkheads and fallback" title="Limit the Damage to One Dependency">
        <P>
          A bulkhead gives a dependency or workload a bounded share of resources. If payment calls are slow, they should not
          occupy every worker needed to serve course pages or order history. Separate connection pools, concurrency limits, or
          worker pools can isolate failure domains. The limit must be measured and monitored; an undersized bulkhead can create
          needless queuing.
        </P>
        <P>
          A fallback can preserve a useful experience when an optional dependency fails: show cached catalog data, mark a
          notification as pending, or omit a nonessential recommendation. Do not silently substitute stale or fabricated data
          for a value that affects money, identity, or safety. Communicate degraded state where it matters.
        </P>
        <Table
          head={['Pattern', 'Protects against', 'Does not solve']}
          rows={[
            ['Timeout', 'A call waiting forever', 'Whether a timed-out write committed'],
            ['Retry', 'A transient failure', 'A permanent error or overload by itself'],
            ['Circuit breaker', 'Repeated calls to an unhealthy dependency', 'The dependency outage itself'],
            ['Bulkhead', 'One workload consuming all shared capacity', 'Incorrect capacity sizing'],
            ['Fallback', 'A poor user experience for optional work', 'A missing source of truth for critical state'],
          ]}
        />
        <Callout type="tip">
          Define a degraded mode before the incident. Decide what can be stale, omitted, or queued, and what must fail closed.
        </Callout>
      </Part>

      <Part n={5} label="Rate limiting" title="Protect Shared Capacity with a Token Bucket">
        <P>
          Rate limiting bounds how quickly a client or operation can consume capacity. The token bucket algorithm has a bucket
          with a maximum capacity. Tokens refill over time at a configured rate; each request consumes one or more tokens. A
          full bucket permits a short burst, while sustained traffic is limited by the refill rate. The values come from load
          testing and service objectives, not a universal formula.
        </P>
        <Code file="token_bucket.py" code={`
import time


class TokenBucket:
    def __init__(self, capacity: float, refill_per_second: float):
        if capacity <= 0 or refill_per_second <= 0:
            raise ValueError("capacity and refill rate must be positive")
        self.capacity = capacity
        self.refill_per_second = refill_per_second
        self.tokens = capacity
        self.updated_at = time.monotonic()

    def allow(self, cost: float = 1.0) -> bool:
        now = time.monotonic()
        elapsed = now - self.updated_at
        self.tokens = min(self.capacity, self.tokens + elapsed * self.refill_per_second)
        self.updated_at = now
        if cost <= 0 or cost > self.capacity or self.tokens < cost:
            return False
        self.tokens -= cost
        return True


limiter = TokenBucket(capacity=10, refill_per_second=2)
print(limiter.allow())
`} />
        <P>
          This single-process example is not a distributed limiter: each application instance has independent state, and it
          does not persist across restarts. A multi-instance service needs a shared atomic counter or a gateway that enforces
          limits consistently. Choose a key such as user, API token, tenant, or route; protect privacy, and define how anonymous
          traffic is handled. Return a clear limit response and, where appropriate, a retry hint.
        </P>
        <P>
          Fairness also matters. A global limit can let one large tenant consume the entire budget. Combine per-tenant limits
          with a global safety ceiling, and reserve capacity for critical internal traffic only through explicit policy.
        </P>
      </Part>

      <Part n={6} label="Operate the patterns" title="Instrument Symptoms and Test Failure Paths">
        <P>
          Track latency distributions, timeout counts, retry attempts, breaker state changes, rate-limit rejections, queue wait,
          and fallback use. Averages hide tail latency: the slowest fraction of calls can dominate the experience at scale.
          Correlate metrics with traces and request IDs, while avoiding sensitive payloads in logs.
        </P>
        <Steps items={[
          'Set a caller deadline and pass the remaining budget to each dependency.',
          'Use one primary retry policy with bounded attempts, jitter, and explicit retryable errors.',
          'Apply idempotency to operations that may be repeated after an ambiguous failure.',
          'Separate resource pools and cap concurrency for slow or expensive dependencies.',
          'Exercise timeouts, partial outages, recovery, and limit behavior in tests or controlled fault exercises.',
        ]} />
        <Callout type="example">
          If an external payment API times out, the checkout may show &quot;processing&quot; and reconcile by operation ID rather
          than report failure and invite a second charge. If menu recommendations fail, the order flow can continue without them.
        </Callout>
      </Part>

      <Part n={7} label="Common mistakes" title="Avoid Turning Protection into a Failure Multiplier">
        <Mistakes items={[
          { mistake: 'Using no timeout because the HTTP library has a default', cause: 'A default may be too long or may cover only connection setup.', fix: 'Set explicit connection and response deadlines within an overall request budget.' },
          { mistake: 'Retrying a non-idempotent write after a timeout', cause: 'The remote side may have committed the first attempt.', fix: 'Use an idempotency key or query operation status before attempting the effect again.' },
          { mistake: 'Opening a circuit breaker on every error type', cause: 'A client validation error says nothing about dependency health.', fix: 'Count only appropriate dependency failures and expose breaker state metrics.' },
          { mistake: 'Using a local token bucket as a global limit', cause: 'Every application process has its own independent bucket.', fix: 'Use shared atomic state or an enforcing gateway for distributed limits.' },
        ]} />
      </Part>

      <Part n={8} label="Practice" title="Protect a Checkout from a Slow Payment Provider">
        <Practice
          title="Define a graceful, safe failure policy"
          tasks={[
            'Set an end-to-end request budget and divide it among validation, payment, and response work.',
            'Classify payment errors into retryable, permanent, and ambiguous-outcome cases; describe the response for each.',
            'Sketch a circuit breaker with closed, open, and half-open states, and define a meaningful fallback.',
            'Choose separate concurrency limits for payment calls and noncritical recommendation requests.',
            'Design a token-bucket key and state where its shared state lives across multiple API instances.',
            'List metrics and a test that would reveal retry amplification or an unhealthy half-open probe policy.',
          ]}
          hint="Protect correctness first: a checkout with uncertain payment status should be reconciled, not charged again blindly."
        />
      </Part>

      <KeyTakeaways items={[
        'Set explicit timeouts and propagate an end-to-end deadline so slow dependencies cannot exhaust all capacity.',
        'Retry only transient failures, within a bounded budget, using backoff and jitter; make repeated writes idempotent.',
        'Circuit breakers fail fast during dependency trouble; bulkheads isolate resource pools; fallbacks must respect correctness.',
        'Token buckets allow controlled bursts while limiting sustained request rates.',
        'Distributed rate limits need shared coordination or a gateway; process-local state does not enforce a global policy.',
        'Monitor tail latency and failure-pattern metrics, and test degraded and recovery paths deliberately.',
      ]} />

      <H3>Next</H3>
      <NextLesson
        href="/learn/system-design/monoliths-microservices"
        label="Lesson 10 · Monoliths, Microservices and Service Boundaries"
        text="Reliability patterns protect calls across components. Next, decide which components should be separate services at all, and when a modular monolith is the stronger design."
      />
    </LearnLayout>
  )
}
