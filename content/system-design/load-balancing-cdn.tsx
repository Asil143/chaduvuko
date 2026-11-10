import { LearnLayout } from '@/components/content/LearnLayout'
import { Callout, Code, H3, KeyTakeaways, Mistakes, NextLesson, P, Part, Practice, Table } from '@/components/content/LessonKit'

export default function LoadBalancingCdn() {
  return (
    <LearnLayout
      title="Load Balancing, Reverse Proxies and CDNs"
      description="Understand reverse proxies, Layer 4 and Layer 7 load balancing, routing algorithms, health checks and safe CDN delivery."
      section="System Design — Lesson 04"
      readTime="35 min"
    >
      <Part n={1} label="Why distribute" title="One Application Instance Is a Capacity and Failure Limit">
        <P>
          A load balancer receives traffic and distributes it among backend instances. This can increase aggregate capacity,
          permit maintenance without taking the whole service offline and isolate failed instances from new traffic. It does
          not make the application itself correct or eliminate every failure: the balancer, network, shared database and
          deployment process still need attention.
        </P>
        <P>
          A reverse proxy sits in front of one or more services on behalf of clients. It can terminate TLS, route by host or
          path, apply limits and add observability. A load balancer is often implemented as or alongside a reverse proxy, but
          the terms describe related roles rather than one mandatory product shape.
        </P>
        <Code lang="text" code={`
Clients
   |
   v
DNS / edge protection
   |
   v
Load balancer or reverse proxy
   |             |             |
   v             v             v
App instance A  App instance B  App instance C
   |             |             |
   +-------------+-------------+
                 |
                 v
       Shared data and dependencies

A healthy route needs capacity in the shared dependencies too.
`} />
        <Callout type="info">
          Horizontal scaling adds instances; vertical scaling gives one instance more resources. Both have limits. A database
          connection pool or a single hot partition may become the bottleneck even when application CPU is low.
        </Callout>
      </Part>

      <Part n={2} label="Network layers" title="Layer 4 and Layer 7 See Different Information">
        <P>
          A Layer 4 balancer routes transport connections using information such as IP addresses and ports. It generally does
          not need to understand HTTP paths. A Layer 7 balancer understands application protocol details such as HTTP hosts,
          paths, headers or cookies, making richer routing and HTTP-aware controls possible. These capabilities vary by
          implementation; check the chosen platform rather than assuming every product has the same feature set.
        </P>
        <Table
          head={['Dimension', 'Layer 4 routing', 'Layer 7 routing']}
          rows={[
            ['Routing input', 'Connection-level addresses and ports', 'Application attributes such as host or path'],
            ['Protocol awareness', 'Transport-oriented', 'Understands the application protocol it proxies'],
            ['Typical use', 'High-throughput TCP or UDP distribution', 'HTTP routing, TLS termination or request policies'],
            ['Trade-off', 'Less request-aware policy', 'More inspection and policy complexity'],
          ]}
          caption="The OSI-layer framing is a useful mental model, not a substitute for checking product capabilities."
        />
        <P>
          If a request path routes to several versions of a service, define how headers and authentication are forwarded and
          which hop is trusted to set them. Never treat a client-supplied forwarding header as proof of the caller’s network
          identity. Proxy configuration is part of the security boundary.
        </P>
      </Part>

      <Part n={3} label="Routing algorithms" title="Choose a Routing Policy That Matches the Workload">
        <P>
          Round robin rotates across available targets and works well when instances have similar capacity and requests have
          similar cost. Weighted routing sends a larger share to a target with more capacity. Least-connections can help when
          requests remain open for different durations, but connection count is not always a good proxy for CPU or work. Hash
          routing can preserve affinity for a key, but hot keys may overload one target and stateful sessions make failover
          harder.
        </P>
        <Code lang="python" file="round_robin.py" code={`
class RoundRobin:
    def __init__(self, targets: list[str]):
        if not targets:
            raise ValueError("at least one target is required")
        self.targets = targets
        self.position = 0

    def next_target(self) -> str:
        target = self.targets[self.position]
        self.position = (self.position + 1) % len(self.targets)
        return target


router = RoundRobin(["app-a", "app-b", "app-c"])
print([router.next_target() for _ in range(7)])
`} />
        <P>
          This small program is only an algorithm demonstration; production routing must also exclude unhealthy targets,
          handle concurrency, connection draining, weights and failure recovery. A balancer may use different policies for
          long-lived connections than for individual HTTP requests.
        </P>
        <Callout type="example">
          If one learner’s requests must reach the same server because session state lives in process memory, sticky sessions
          may seem convenient. A shared session store or stateless authentication can make failover and scaling more
          predictable, but it changes where state is stored and how it is protected.
        </Callout>
      </Part>

      <Part n={4} label="Health and draining" title="A Health Check Must Match the Traffic You Send">
        <P>
          A liveness check asks whether a process should be restarted; a readiness check asks whether it can accept work now.
          They answer different questions. A process may be alive but unable to reach its required database. Conversely,
          marking every instance unready whenever an optional service is degraded can remove all capacity unnecessarily.
          Decide which dependencies are essential for each route and make checks resistant to transient noise.
        </P>
        <Code lang="python" file="healthy_target.py" code={`
def choose_target(targets: list[dict[str, object]], start: int = 0) -> str | None:
    if not targets:
        return None
    for offset in range(len(targets)):
        candidate = targets[(start + offset) % len(targets)]
        if candidate.get("ready") is True:
            return str(candidate["name"])
    return None


pool = [
    {"name": "app-a", "ready": False},
    {"name": "app-b", "ready": True},
]
print(choose_target(pool))
`} />
        <P>
          On deploy or scale-in, stop assigning new requests to an instance and allow in-flight work to finish within a bounded
          drain period. Long-lived connections need explicit handling. Monitor rejected requests, health transitions, queue
          depth and target utilization; “healthy” at the balancer is not proof that the user journey succeeds.
        </P>
        <Callout type="warning">
          A dependency-aware health endpoint can create a cascading outage if every application instance fails readiness at
          once. Define the intended response for degraded but recoverable dependencies and test the transition.
        </Callout>
      </Part>

      <Part n={5} label="Capacity and resilience" title="The Balancer Cannot Create Capacity">
        <P>
          Distribution helps only while there is spare capacity downstream. If each instance has finite throughput, the pool
          needs headroom for traffic variation, deployments and a target failure. Autoscaling can add capacity but needs a
          signal, a safe maximum, startup time and a plan for what happens before new instances are ready. Database pools,
          external API quotas and shared storage must be included in the capacity model.
        </P>
        <P>
          Keep sessions and files off ephemeral instance disks unless their loss is acceptable. Design graceful overload
          behaviour: reject low-priority work, shed optional features, or return a retryable response with appropriate
          guidance. Unbounded queues and unlimited retries move overload around rather than resolving it.
        </P>
        <Code lang="text" code={`
                 +--> instance A --+
Request --> LB --+--> instance B --+--> database connection pool
                 +--> instance C --+          |
                                             +--> primary database
                                             +--> optional search service

Adding app instances can saturate the shared pool; measure each dependency.
`} />
      </Part>

      <Part n={6} label="CDN" title="Serve Cacheable Content Near the User">
        <P>
          A content delivery network (CDN) serves content through edge locations closer to users. It is especially useful for
          versioned static assets and other content with safe cache rules. A cache hit can reduce origin requests and improve
          delivery latency; a cache miss, expired object or bypass still reaches the origin. CDN configuration does not make
          private data safe by itself.
        </P>
        <P>
          Cache keys commonly depend on the URL and may include selected query parameters or headers. Including every header
          can fragment the cache; ignoring a header that changes the response can leak one user's content to another. Use
          explicit cache-control policy, avoid shared caching for personalized responses unless the policy is designed for it,
          and test invalidation during a release. Signed URLs or cookies can gate private downloads when supported by the
          chosen delivery design.
        </P>
        <Table
          head={['Content', 'Typical edge-cache question', 'Caution']}
          rows={[
            ['Hashed JS/CSS assets', 'Does the URL change whenever the file changes?', 'Keep old assets available during client rollout'],
            ['Public course thumbnails', 'Can all users receive the same image?', 'Version the URL or define invalidation'],
            ['Personalized dashboard JSON', 'Does the response vary by identity or role?', 'Avoid shared caching without a safe key and policy'],
            ['Video segments', 'Are access controls and cache lifetime explicit?', 'Protect private media and plan egress limits'],
          ]}
        />
        <Callout type="tip">
          A content hash in an asset filename gives a new URL when the bytes change. That can let clients cache immutable assets
          for a long time while the HTML page points to the latest version.
        </Callout>
      </Part>

      <Part n={7} label="Pitfalls" title="Common Load-Balancing and CDN Mistakes">
        <Mistakes items={[
          { mistake: 'Treating a successful health check as proof the service works', cause: 'The check may not cover routing, dependencies or a real user request.', fix: 'Monitor end-to-end SLIs as well as liveness and readiness.' },
          { mistake: 'Scaling application instances without measuring shared services', cause: 'More callers can overload database pools or dependency quotas.', fix: 'Load-test the whole path and track saturation at every bottleneck.' },
          { mistake: 'Caching personalized responses as public content', cause: 'A cache key may not distinguish identity or authorization.', fix: 'Use conservative cache controls and verify isolation across users.' },
          { mistake: 'Depending on sticky sessions for correctness', cause: 'A target can fail or be removed while session state is local.', fix: 'Prefer explicit shared state or stateless requests when feasible.' },
        ]} />
      </Part>

      <Part n={8} label="Practice" title="Route a Course Platform Through an Edge">
        <Practice
          title="Draw a routing and content-delivery policy"
          tasks={[
            'Sketch the path from a browser to three application instances and a shared database.',
            'Choose a routing policy and explain whether instance capacity and request durations are similar.',
            'Define separate liveness, readiness and connection-draining behaviour for a deployment.',
            'Classify course thumbnails, hashed assets and learner dashboards as cacheable or private, with a reason.',
            'Name one shared dependency that could saturate after adding instances and identify a metric to monitor.',
          ]}
          hint="For every cache rule, say who may see the response, which request attributes change it and how an update becomes visible."
        />
      </Part>

      <KeyTakeaways items={[
        'A load balancer distributes requests but cannot fix an overloaded shared dependency or a faulty application.',
        'Layer 4 routing is connection-oriented; Layer 7 routing can use application-level request attributes.',
        'Round robin, weights, least-connections and affinity each rely on different workload assumptions.',
        'Liveness, readiness and draining have different roles during failure and deployment.',
        'A CDN reduces origin work for safely cacheable content; cache keys and privacy controls must be deliberate.',
        'Measure the full request path and design overload behaviour instead of assuming added instances guarantee resilience.',
      ]} />

      <H3>Next</H3>
      <NextLesson
        href="/learn/system-design/caching-strategies"
        label="Lesson 05 · Caching — Strategies, Invalidation and Redis"
        text="The edge can serve reusable content, but dynamic applications also need a deliberate cache policy. Next, compare cache-aside, write-through and write-back, then work through invalidation and stampedes."
      />
    </LearnLayout>
  )
}
