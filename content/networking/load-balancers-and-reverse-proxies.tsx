import type { ReactNode } from 'react'
import { LearnLayout } from '@/components/content/LearnLayout'
import { KeyTakeaways } from '@/components/content/KeyTakeaways'

const Chapter = ({ n, title }: { n: number; title: string }) => (
  <div style={{ marginBottom: 28 }}>
    <p style={{ fontSize: 11, color: '#10b981', fontFamily: 'var(--font-mono)', fontWeight: 700, letterSpacing: '.12em', textTransform: 'uppercase', margin: '0 0 6px' }}>Chapter {String(n).padStart(2, '0')}</p>
    <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(22px,3.5vw,34px)', fontWeight: 900, letterSpacing: '-1px', color: 'var(--text)', margin: 0 }}>{title}</h2>
  </div>
)
const Divider = () => <hr style={{ border: 0, borderTop: '1px solid var(--border)', margin: '44px 0' }} />
const Para = ({ children }: { children: ReactNode }) => <p style={{ fontSize: 15, color: 'var(--text)', lineHeight: 1.9, margin: '0 0 18px' }}>{children}</p>
const H2 = ({ children }: { children: ReactNode }) => <h3 style={{ fontSize: 19, fontWeight: 800, color: 'var(--text)', margin: '28px 0 12px' }}>{children}</h3>
const Accent = ({ children }: { children: ReactNode }) => <strong style={{ color: '#10b981' }}>{children}</strong>
const CodeBlock = ({ children }: { children: ReactNode }) => <pre style={{ background: '#0d1117', border: '1px solid var(--border)', borderRadius: 12, padding: '18px 20px', overflowX: 'auto', fontSize: 13, lineHeight: 1.75, color: '#e2e8f0', fontFamily: 'var(--font-mono)', margin: '18px 0' }}><code>{children}</code></pre>
const StoryBox = ({ children }: { children: ReactNode }) => <div style={{ borderLeft: '4px solid #3b82f6', background: 'rgba(59,130,246,.07)', borderRadius: '0 10px 10px 0', padding: '18px 22px', margin: '22px 0', color: 'var(--text)', lineHeight: 1.85 }}>{children}</div>
const Warn = ({ children }: { children: ReactNode }) => <div style={{ background: 'rgba(251,191,36,.08)', border: '1px solid rgba(251,191,36,.3)', borderRadius: 12, padding: '16px 20px', margin: '22px 0', lineHeight: 1.85, color: 'var(--text)' }}><strong style={{ color: '#fbbf24' }}>Design caution: </strong>{children}</div>
const Err = ({ children }: { children: ReactNode }) => <div style={{ background: 'rgba(239,68,68,.07)', border: '1px solid rgba(239,68,68,.25)', borderRadius: 12, padding: '16px 20px', margin: '22px 0', lineHeight: 1.85, color: 'var(--text)' }}><strong style={{ color: '#f87171' }}>Common mistake: </strong>{children}</div>

export default function LoadBalancersAndReverseProxies() {
  return (
    <LearnLayout
      title="Load Balancers and Reverse Proxies"
      description="Distribute requests, terminate connections safely, and understand health checks, algorithms, and failure modes."
      section="Networking Fundamentals — Lesson 45"
      readTime="20–28 min"
    >
      <Para><strong>Prerequisites:</strong> Be comfortable with IP routing, TCP connections, DNS, HTTP requests, and TLS at a conceptual level.</Para>
      <Para><strong>Learning objectives:</strong> Distinguish Layer 4 and Layer 7 balancing, select a backend strategy, design health checks and draining, and reason about proxy timeouts and trust boundaries.</Para>
      <Chapter n={1} title="One Service, Many Servers" />
      <StoryBox>
        Imagine a ticketing service handling a popular concert sale. A single application server is easy to understand, but it can run out of CPU, memory, or open connections while thousands of people refresh. Putting more servers behind one stable entry point lets the service spread work, replace unhealthy instances, and grow without asking every customer to learn a new address.
      </StoryBox>
      <Para>
        A <Accent>load balancer</Accent> accepts client connections or requests and chooses a backend to handle each one. A <Accent>reverse proxy</Accent> accepts requests on behalf of servers, then forwards them to an origin. These roles overlap: a reverse proxy often balances traffic, while a load balancer commonly proxies connections. The important distinction is the responsibility being discussed, not the product label.
      </Para>
      <Para>
        Typical reasons to put this layer in front of an application include scaling across instances, centralising TLS, routing different paths or hostnames, hiding backend addresses, applying limits, and draining instances during deployments. It does not automatically make application code fault-tolerant: a shared database, queue, or downstream API can still be the bottleneck.
      </Para>
      <CodeBlock>{`Client
  │ HTTPS request: api.example.test/orders
  ▼
Load balancer / reverse proxy
  ├── app-a:8080  (healthy)
  ├── app-b:8080  (healthy)
  └── app-c:8080  (draining)
        │
        ▼
   Shared database / queue`}</CodeBlock>
      <Divider />

      <Chapter n={2} title="Layer 4 and Layer 7 Decisions" />
      <Para>
        A <Accent>Layer 4 balancer</Accent> makes choices using transport and network connection information—such as destination IP and TCP or UDP port—without parsing the HTTP request. This is useful for high-throughput forwarding and non-HTTP protocols. A <Accent>Layer 7 balancer</Accent> understands application details such as HTTP host, path, headers, or cookies, so it can route <code>/api</code> and <code>/assets</code> differently or apply HTTP-aware policies.
      </Para>
      <Para>
        Application awareness adds flexibility and responsibility. An L7 proxy may need to parse requests, manage certificates, enforce header limits, and maintain connection pools. A proxy that terminates TLS sees plaintext at that point, so access to its logs, memory, and configuration becomes part of the security boundary. Re-encrypting from proxy to backend protects that second network hop.
      </Para>
      <H2>Common proxy patterns</H2>
      <ul style={{ color: 'var(--text)', lineHeight: 1.9, paddingLeft: 22 }}>
        <li><strong>Reverse proxy:</strong> clients know the proxy; it selects an origin.</li>
        <li><strong>Forward proxy:</strong> clients send outbound traffic through a proxy that represents them.</li>
        <li><strong>TLS pass-through:</strong> the balancer forwards encrypted bytes; the backend owns the TLS session.</li>
        <li><strong>TLS termination:</strong> the proxy decrypts client TLS and may open a separate connection to the backend.</li>
      </ul>
      <Err>
        Do not assume that “HTTPS at the load balancer” means traffic is encrypted end-to-end. Check whether the proxy uses HTTP or HTTPS to each backend, where certificates are validated, and which systems can inspect request bodies.
      </Err>
      <Divider />

      <Chapter n={3} title="How a Backend Is Chosen" />
      <Para>
        Scheduling algorithms trade off simplicity, fairness, and knowledge of backend load. <Accent>Round robin</Accent> rotates through eligible servers and works well when servers and requests are similar. <Accent>Weighted round robin</Accent> sends proportionally more work to larger instances. <Accent>Least connections</Accent> favors a server with fewer active connections; it can help when requests last different lengths, but connection count is not the same as CPU or queue depth. Hash-based selection can keep a client or key near one backend, but can create hotspots and makes membership changes affect the mapping.
      </Para>
      <table style={{ width: '100%', borderCollapse: 'collapse', margin: '18px 0 24px', fontSize: 14, color: 'var(--text)' }}>
        <thead><tr style={{ textAlign: 'left', background: 'rgba(16,185,129,.1)' }}>{['Strategy', 'Useful when', 'Watch for'].map(x => <th key={x} style={{ padding: 10, borderBottom: '1px solid var(--border)' }}>{x}</th>)}</tr></thead>
        <tbody>{[
          ['Round robin', 'Requests and instances are broadly similar', 'Unequal instance capacity or long-lived connections'],
          ['Weighted', 'Backends have known capacity differences', 'Weights become stale after scaling or hardware changes'],
          ['Least connections', 'Connection duration varies materially', 'A few costly requests can overload a server with a low count'],
          ['Consistent hash', 'A key benefits from repeatable backend placement', 'Hot keys, membership churn, or accidental stickiness'],
        ].map((row, i) => <tr key={row[0]} style={{ background: i % 2 ? 'var(--surface)' : 'transparent' }}>{row.map(cell => <td key={cell} style={{ padding: 10, borderBottom: '1px solid var(--border)', verticalAlign: 'top' }}>{cell}</td>)}</tr>)}</tbody>
      </table>
      <Para>
        Algorithms distribute requests, not necessarily user sessions. Prefer stateless application instances and store session state in a shared service. If a legacy application requires affinity, understand its timeout, failover behavior, and uneven-load consequences rather than treating stickiness as a cure for state design.
      </Para>
      <Divider />

      <Chapter n={4} title="Health Checks and Safe Removal" />
      <Para>
        A health check is a recurring test used to decide whether a backend should receive traffic. A TCP check proves that a port accepts connections; an HTTP check can prove that a specific path returns an acceptable response. A good readiness endpoint tests the dependencies needed to serve real traffic, but should be fast, bounded, and designed so that a brief optional dependency issue does not eject every instance.
      </Para>
      <CodeBlock>{`# Conceptual health-check policy (provider-neutral)
interval: 10s
connect_timeout: 2s
healthy_after: 2 consecutive successes
unhealthy_after: 3 consecutive failures
request:
  method: GET
  path: /readyz
expected_status: 200`}</CodeBlock>
      <Para>
        Detection has a delay: interval, timeout, and failure threshold determine how long a broken backend may continue receiving work. Too aggressive a policy can cause flapping during a short pause; too lenient a policy extends user impact. During a deployment, mark an instance as <Accent>draining</Accent>, stop assigning new requests, allow in-flight work to finish within a bounded grace period, and only then terminate it. Long-lived WebSocket or streaming connections need an explicit drain strategy.
      </Para>
      <Warn>
        A green health check is not proof that every customer journey works. Monitor end-to-end error rate and latency, and test that the balancer actually removes a deliberately unhealthy test instance in a controlled environment.
      </Warn>
      <Divider />

      <Chapter n={5} title="A Small Reverse-Proxy Configuration" />
      <Para>
        The following Nginx excerpt illustrates a common pattern: TLS ends at the proxy, requests go to a named upstream, and the original host and client address are forwarded. Certificate paths and backend names are deployment-specific; the example is not a complete production TLS policy.
      </Para>
      <CodeBlock>{`upstream app_pool {
    least_conn;
    server app-a.internal:8080 max_fails=3 fail_timeout=10s;
    server app-b.internal:8080 max_fails=3 fail_timeout=10s;
    keepalive 32;
}

server {
    listen 443 ssl;
    server_name api.example.test;

    location / {
        proxy_pass http://app_pool;
        proxy_http_version 1.1;
        proxy_set_header Host $host;
        proxy_set_header X-Forwarded-Proto https;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header Connection "";
    }
}`}</CodeBlock>
      <Para>
        The application must only trust forwarded headers from known proxies. Otherwise, a direct client can send a forged <code>X-Forwarded-For</code> value and confuse audit logs, rate limits, or IP-based policy. Restrict backend access so clients cannot bypass the proxy, configure trusted proxy hops, and avoid using a client IP as an authentication factor.
      </Para>
      <Divider />

      <Chapter n={6} title="Timeouts, Retries, and the Failure Cascade" />
      <Para>
        Proxies add queues, connection pools, and timeouts. Set finite connect, read, and idle timeouts that match the service contract. If a backend is slow, queued work can consume memory and connections; if every layer retries independently, one request can multiply into several backend attempts and amplify load. Retries are safest for operations known to be idempotent and should have a small budget, backoff, and a deadline shared across the request path.
      </Para>
      <CodeBlock>{`# Retry decision checklist
request is safe to repeat?      yes / no
failure is plausibly transient?  yes / no
request deadline remains?       yes / no
retry budget remains?           yes / no

If any answer is no: return the original failure.
For writes, use an application idempotency key rather than
assuming a timeout means the server did not commit the action.`}</CodeBlock>
      <Para>
        Use connection limits and queue limits to protect the proxy and its backends. Return an explicit overload response when the system is at capacity instead of accepting unlimited work that will time out later. Observe requests per backend, active connections, queue time, health transitions, 4xx/5xx rates, and latency percentiles; aggregate metrics can hide one failing instance.
      </Para>
      <Divider />

      <Chapter n={7} title="Debugging the Request Path" />
      <Para>
        Trace one request hop by hop. Verify DNS points to the expected frontend; inspect TLS certificate and SNI; check that the proxy selected the expected route and backend; compare proxy and application logs using a request ID; then test backend reachability from the proxy network. Record the request ID in logs, but never place secrets or full sensitive payloads in it.
      </Para>
      <CodeBlock>{`# Useful read-only checks from an authorised environment
curl -sS -D - -o /dev/null https://api.example.test/readyz
curl -sS -H 'X-Request-ID: lab-001' https://api.example.test/health

# Compare DNS answers and the TLS peer certificate
getent ahosts api.example.test
openssl s_client -connect api.example.test:443 -servername api.example.test </dev/null`}</CodeBlock>
      <Para>
        A 502 commonly means the proxy could not obtain a valid upstream response; a 503 often means no backend is considered available or the service is refusing work; a 504 indicates the proxy timed out waiting. These are clues, not universal definitions: examine the specific proxy's logs and documentation. Also check asymmetric routing, firewall rules, mismatched ports, name resolution from the proxy, and backend TLS trust.
      </Para>
      <Divider />

      <Chapter n={8} title="Mistakes to Avoid and Production Review" />
      <ul style={{ color: 'var(--text)', lineHeight: 1.9, paddingLeft: 22 }}>
        <li><strong>One giant health endpoint:</strong> slow dependency checks can make every instance fail together. Keep readiness scoped and bounded.</li>
        <li><strong>Unlimited retries:</strong> retries turn a partial outage into a load spike. Bound attempts and honor deadlines.</li>
        <li><strong>Trusting client-supplied proxy headers:</strong> accept them only from the known proxy chain.</li>
        <li><strong>Assuming sticky sessions provide resilience:</strong> affinity can pin users to a broken or overloaded server.</li>
        <li><strong>Ignoring proxy logs:</strong> log route, backend, status, duration, and request ID while redacting sensitive data.</li>
      </ul>
      <H2>Practice</H2>
      <ol style={{ color: 'var(--text)', lineHeight: 1.9, paddingLeft: 22 }}>
        <li>Sketch the client-to-proxy-to-two-backend path for a service used by a mobile app. Mark where TLS starts and ends.</li>
        <li>Choose a balancing strategy for identical stateless API instances, then explain why least-connections might not reflect CPU load.</li>
        <li>Design a readiness check for an order API. Which dependencies are essential, and what timeout prevents a cascade?</li>
        <li>Describe a safe rolling deployment for a service with long-running requests.</li>
        <li>A user reports intermittent 502s. List five observations you would collect before changing configuration.</li>
      </ol>
      <Divider />
      <KeyTakeaways items={[
        'A reverse proxy represents backend servers to clients; a load balancer distributes work. One component can do both jobs.',
        'Layer 4 decisions use connection information; Layer 7 decisions can use HTTP hosts, paths, and headers.',
        'Choose scheduling based on request duration, instance capacity, and state—not by habit.',
        'Health checks, draining, finite timeouts, and bounded retries are part of availability design.',
        'TLS termination creates a trust boundary; protect the proxy-to-backend hop and trust forwarded headers only from known proxies.',
        'Observe per-backend latency, error rates, health transitions, queue time, and request IDs to diagnose failures.',
      ]} />
    </LearnLayout>
  )
}
