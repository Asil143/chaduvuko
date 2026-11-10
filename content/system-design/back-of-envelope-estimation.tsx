import { LearnLayout } from '@/components/content/LearnLayout'
import { Callout, Code, H3, KeyTakeaways, Mistakes, NextLesson, P, Part, Practice, Table } from '@/components/content/LessonKit'

export default function BackOfEnvelopeEstimation() {
  return (
    <LearnLayout
      title="Back-of-the-Envelope Estimation"
      description="Estimate request rates, storage, bandwidth and rough capacity from explicit assumptions, then use the results to guide system design."
      section="System Design — Lesson 02"
      readTime="30 min"
    >
      <Part n={1} label="Why estimate" title="A Few Assumptions Can Eliminate the Wrong Architecture">
        <P>
          Back-of-the-envelope estimation is a fast way to bound a workload before selecting components. It is not a forecast
          and it does not replace measurement. The purpose is to discover whether an idea is in the right order of magnitude:
          is this a few requests per second or thousands at peak? Is retained media a small table or the dominant storage cost?
        </P>
        <P>
          Write assumptions where others can inspect them. “One million users” is incomplete: some are inactive, some return
          several times a day, and only a fraction of actions reach a particular endpoint. Separate active users, actions per
          user, payload size, retention period and peak-to-average ratio. If the prompt gives better inputs, use those instead
          of generic rules of thumb.
        </P>
        <Callout type="info">
          Estimates are decision aids, not fake precision. Keep units on every number, round intermediate results, and refine
          only the assumptions that could change a design choice.
        </Callout>
      </Part>

      <Part n={2} label="Traffic" title="Convert Daily Activity into Average and Peak Request Rates">
        <P>
          Requests per second (RPS) is a rate. If 200,000 daily users each open a course page 8 times, that is 1.6 million
          page views per day. Divide by the number of seconds in a day for an average, then apply a peak factor that reflects
          real usage patterns. This example deliberately uses round assumptions; a live product should derive them from
          analytics, time zones, event schedules and observed bursts.
        </P>
        <Code lang="python" file="traffic_estimate.py" code={`
SECONDS_PER_DAY = 24 * 60 * 60

def estimate_requests_per_second(
    daily_users: int,
    actions_per_user: int,
    peak_factor: float = 1.0,
) -> tuple[float, float]:
    if daily_users < 0 or actions_per_user < 0 or peak_factor < 1:
        raise ValueError("use non-negative counts and a peak factor of at least 1")
    daily_requests = daily_users * actions_per_user
    average_rps = daily_requests / SECONDS_PER_DAY
    return average_rps, average_rps * peak_factor


average, peak = estimate_requests_per_second(200_000, 8, peak_factor=4)
print(f"average: {average:.1f} requests/s")
print(f"estimated peak: {peak:.1f} requests/s")
`} />
        <P>
          Count the actual operation being designed. Page views may trigger several API calls, while a cached static asset may
          never reach the application servers. Reads and writes also have different cost and correctness requirements. Keep
          separate estimates for login, search, checkout and progress updates rather than hiding them in one total.
        </P>
        <Callout type="example">
          For an exam-results portal, the yearly average can look modest while traffic surges when results are announced.
          Design discussions should test that event peak explicitly instead of multiplying an average by a convenient factor
          and calling it proven capacity.
        </Callout>
      </Part>

      <Part n={3} label="Storage" title="Estimate Retained Data, Not Just Incoming Rows">
        <P>
          A first storage estimate is records per day multiplied by average bytes per record and retention days. Then ask what
          the byte estimate excludes: indexes, replicas, backups, logs, attachments, compaction overhead and growth. A text
          row with a short status is not the same size as a row containing a full JSON document. If an exact size is unknown,
          choose a plausible range and show how the answer changes at both ends.
        </P>
        <Code lang="python" file="storage_estimate.py" code={`
BYTES_PER_GIB = 1024 ** 3

def retained_gib(records_per_day: int, average_bytes: int, retention_days: int) -> float:
    if min(records_per_day, average_bytes, retention_days) < 0:
        raise ValueError("inputs must not be negative")
    total_bytes = records_per_day * average_bytes * retention_days
    return total_bytes / BYTES_PER_GIB


records_daily = 750_000
bytes_each = 900
retention = 365
print(f"raw retained data: {retained_gib(records_daily, bytes_each, retention):.1f} GiB")
`} />
        <P>
          This is raw logical payload only. Physical storage depends on the database engine, indexes, replicas and backup
          policy; do not multiply by an invented universal overhead factor. List those terms separately and ask the platform
          team or measure a representative dataset before sizing a production cluster.
        </P>
        <Table
          head={['Data class', 'Questions to estimate', 'Design implication']}
          rows={[
            ['Transactional rows', 'Writes per day, row size, retention, indexes', 'Database capacity and backup growth'],
            ['Images or documents', 'Average and maximum object size, retention', 'Object storage and CDN egress'],
            ['Events and logs', 'Events per action, payload, useful retention', 'Partitioning, lifecycle and query cost'],
            ['Derived data', 'Rebuildability and refresh cadence', 'May be recomputed instead of backed up equally'],
          ]}
          caption="Keep data classes separate because they have different access and retention patterns."
        />
      </Part>

      <Part n={4} label="Bandwidth" title="Payload Size Turns Request Rate into Network Load">
        <P>
          Approximate outbound bandwidth as responses per second multiplied by average response bytes. Do the same for inbound
          requests, then account for response compression where appropriate. Separate application traffic from static asset
          delivery. A thumbnail, a course video and a small JSON status response have radically different sizes and should not
          share one average payload assumption.
        </P>
        <Code lang="python" file="bandwidth_estimate.py" code={`
def megabits_per_second(requests_per_second: float, bytes_per_response: int) -> float:
    bits_per_second = requests_per_second * bytes_per_response * 8
    return bits_per_second / 1_000_000


peak_api_rps = 320
average_json_bytes = 12_000
bandwidth = megabits_per_second(peak_api_rps, average_json_bytes)
print(f"uncompressed response rate: {bandwidth:.1f} Mbit/s")
`} />
        <P>
          The conversion uses decimal megabits per second and excludes protocol overhead, retransmissions and compression.
          State those boundaries in your notes. If a browser downloads the same public asset repeatedly, a CDN may serve much
          of that traffic without involving the application origin; private or highly dynamic content may behave differently.
        </P>
      </Part>

      <Part n={5} label="Capacity" title="Use Workload Estimates to Ask Better Server Questions">
        <P>
          If an instance has demonstrated sustainable throughput C for the target request mix and you want planned utilization
          no higher than U, a rough instance count is peak load divided by C times U, rounded up. Both C and U must come from
          load tests and operational goals, not a generic internet number. CPU, memory, database pools, dependency limits and
          tail latency can each become the limiting factor before raw request throughput does.
        </P>
        <Code lang="python" file="instance_count.py" code={`
import math

def rough_instance_count(peak_rps: float, tested_rps_per_instance: float, target_utilization: float) -> int:
    if peak_rps < 0 or tested_rps_per_instance <= 0:
        raise ValueError("peak must be non-negative and tested capacity must be positive")
    if not 0 < target_utilization <= 1:
        raise ValueError("target utilization must be in (0, 1]")
    usable_capacity = tested_rps_per_instance * target_utilization
    return math.ceil(peak_rps / usable_capacity)


print(rough_instance_count(800, tested_rps_per_instance=180, target_utilization=0.65))
`} />
        <P>
          Treat the output as a starting hypothesis. It does not include redundancy during a failure or deployment, autoscaling
          delay, uneven routing or a sudden burst. Run representative load tests, inspect saturation and latency percentiles,
          then choose headroom based on the consequences of being overloaded.
        </P>
        <Callout type="warning">
          Never interpret a capacity estimate as a guarantee. A result from a synthetic benchmark is valid only for the code,
          data shape, hardware, dependencies and concurrency that the benchmark actually exercised.
        </Callout>
      </Part>

      <Part n={6} label="Latency" title="Averages Hide the Users Who Wait the Longest">
        <P>
          Latency percentiles describe the distribution: p50 is the median; p95 is the value at or below which 95 percent of
          measured operations complete; p99 makes slow outliers more visible. Always name the operation, time window and
          measurement boundary. A browser's full page load is not necessarily the same as API server processing time.
        </P>
        <P>
          A request may wait on sequential steps—authentication, a database lookup, an external payment call—and overlap
          parallel work such as fetching independent recommendations. Add only sequential durations; the longest branch often
          determines a parallel join. Real latency also includes queues, connection setup, retries and network variation. Use
          traces and measurements to replace the sketch once the system exists.
        </P>
        <Code lang="python" file="sequential_latency.py" code={`
steps_ms = {
    "authentication": 18,
    "order_lookup": 42,
    "payment_provider": 210,
    "response_serialization": 8,
}

sequential_total = sum(steps_ms.values())
print(f"illustrative sequential request path: {sequential_total} ms")
for name, duration in steps_ms.items():
    print(f"{name}: {duration} ms")
`} />
        <P>
          The values above are made-up example inputs, not reference latency numbers. Their point is to make the budget visible:
          if a target is already exceeded by the slowest dependency, optimizing response serialization will not solve the
          problem. Decide which work can be removed, cached, parallelized or deferred without changing the product contract.
        </P>
      </Part>

      <Part n={7} label="Pitfalls" title="Common Estimation Mistakes">
        <Mistakes items={[
          { mistake: 'Using monthly active users as the request rate', cause: 'Users do not perform one action per month, and some actions create multiple requests.', fix: 'Model actions per active user and divide by seconds in the measurement window.' },
          { mistake: 'Sizing only for the average', cause: 'Events, batch jobs and daily patterns create concentrated peaks.', fix: 'Estimate peak explicitly and validate it with observed traffic or a load test.' },
          { mistake: 'Reporting raw data as total storage', cause: 'Indexes, replicas, backups and media can dominate the physical footprint.', fix: 'Show logical data first, then list each physical-storage factor separately.' },
          { mistake: 'Mixing bytes, bits, MB and MiB', cause: 'Unit conversions can move a capacity estimate by a meaningful amount.', fix: 'Write units beside each input and label decimal versus binary conversions.' },
        ]} />
      </Part>

      <Part n={8} label="Practice" title="Estimate a Results-Day Service">
        <Practice
          title="Build and challenge a small capacity model"
          tasks={[
            'Assume a number of daily learners and page views per learner; calculate average and peak page-view RPS.',
            'Estimate API calls per page and separate dynamic API requests from static assets.',
            'Estimate one year of progress-event storage using an explicit payload size and retention assumption.',
            'Compute outbound API bandwidth for a stated peak rate and response size, including the units in your answer.',
            'Change one major assumption by a factor of two and explain whether your architecture decision changes.',
          ]}
          hint="Write an assumption table beside the arithmetic. Mark hypothetical values as assumptions, not facts about a real service."
        />
      </Part>

      <KeyTakeaways items={[
        'Estimation bounds a workload so that architecture choices are based on scale rather than intuition alone.',
        'Convert active users and actions into operation-specific average and peak request rates.',
        'Estimate retained payload separately from indexes, replicas, backups, logs and media.',
        'Convert response rate and payload size into bandwidth with explicit bit and byte units.',
        'Capacity depends on measured throughput for a representative workload, desired headroom and failure scenarios.',
        'Percentiles and end-to-end traces reveal latency behaviour that averages conceal.',
      ]} />

      <H3>Next</H3>
      <NextLesson
        href="/learn/system-design/apis-and-service-communication"
        label="Lesson 03 · APIs and Service Communication — REST, gRPC, GraphQL and Webhooks"
        text="You can now describe a workload in measurable terms. Next, define the interfaces that clients and services use to exchange commands, results and events safely."
      />
    </LearnLayout>
  )
}
