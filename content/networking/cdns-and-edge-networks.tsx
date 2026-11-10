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
const Warn = ({ children }: { children: ReactNode }) => <div style={{ background: 'rgba(251,191,36,.08)', border: '1px solid rgba(251,191,36,.3)', borderRadius: 12, padding: '16px 20px', margin: '22px 0', lineHeight: 1.85, color: 'var(--text)' }}><strong style={{ color: '#fbbf24' }}>Cache caution: </strong>{children}</div>
const Err = ({ children }: { children: ReactNode }) => <div style={{ background: 'rgba(239,68,68,.07)', border: '1px solid rgba(239,68,68,.25)', borderRadius: 12, padding: '16px 20px', margin: '22px 0', lineHeight: 1.85, color: 'var(--text)' }}><strong style={{ color: '#f87171' }}>Common mistake: </strong>{children}</div>

export default function CdnsAndEdgeNetworks() {
  return (
    <LearnLayout
      title="CDNs and Edge Networks"
      description="How caching, DNS steering, anycast, and edge compute bring content closer to users."
      section="Networking Fundamentals — Lesson 46"
      readTime="18–26 min"
    >
      <Para><strong>Prerequisites:</strong> Understand DNS resolution, HTTP responses, headers, TLS, and the role of an origin server.</Para>
      <Para><strong>Learning objectives:</strong> Trace a CDN cache hit and miss, design safe cache keys and freshness policy, explain invalidation and edge routing, and identify privacy and origin-protection risks.</Para>
      <Chapter n={1} title="Why Place Content Near the User?" />
      <StoryBox>
        A learner in Vijayawada opens a course video hosted by one origin region thousands of kilometres away. Every byte crossing that distance adds propagation delay, and one origin must serve users in many locations. A content delivery network (CDN) places copies or delivery capacity at many points of presence (PoPs), so suitable requests can be answered closer to the learner while the origin remains the source of truth.
      </StoryBox>
      <Para>
        A <Accent>CDN</Accent> is a distributed system of edge servers, routing and cache-control logic, and connections back to origin services. It can accelerate static files, video segments, downloads, and sometimes dynamic requests. “Edge” means computation or delivery near a user or device; it is broader than caching. A nearby edge server can still miss its cache, so proximity alone does not guarantee a fast response.
      </Para>
      <CodeBlock>{`Browser / app
    │ DNS or anycast routing selects an edge PoP
    ▼
Edge cache ── cache hit ──► response to user
    │ cache miss / revalidation
    ▼
Origin shield (optional shared cache)
    ▼
Origin application and object storage`}</CodeBlock>
      <Para>
        Benefits can include lower latency, fewer repeated origin requests, better absorption of traffic spikes, and a distributed place to apply TLS, request filtering, and rate controls. A CDN is not a substitute for application security, durable origin capacity, or a tested multi-region recovery plan.
      </Para>
      <Divider />

      <Chapter n={2} title="The Request: Edge Selection, Hit, and Miss" />
      <Para>
        Providers may direct users using DNS-based steering, anycast IP announcements, or a combination. With DNS steering, a resolver receives an answer selected using factors such as location and health; cached DNS answers can mean the change is not immediate for every client. With anycast, the same service address is announced from multiple locations and network routing usually carries a client to a nearby reachable PoP. “Nearby” is a routing outcome, not always the shortest geographic path.
      </Para>
      <Para>
        On arrival, the edge builds a <Accent>cache key</Accent> from configured request properties—commonly host, path, and selected query parameters or headers. If a fresh object matches, it is a hit. If not, the edge fetches from origin, may store the response if policy allows, then returns it. Revalidation can ask the origin whether a stored representation is still valid, using validators such as <code>ETag</code> or <code>Last-Modified</code>.
      </Para>
      <H2>What affects a cache key?</H2>
      <ul style={{ color: 'var(--text)', lineHeight: 1.9, paddingLeft: 22 }}>
        <li>Host and normalized path determine which resource is requested.</li>
        <li>Query parameters may be meaningful, ignorable, or require allow-listing.</li>
        <li>Headers in <code>Vary</code> can separate representations such as compressed and uncompressed responses.</li>
        <li>Cookies and authorization data usually signal personalized or private content and need careful handling.</li>
      </ul>
      <Err>
        An incomplete cache key can serve the wrong version to users—for example, mixing languages or device variants. An overly broad key can leak one user's personalized response to another. Treat cache-key design as correctness and privacy engineering, not just a speed setting.
      </Err>
      <Divider />

      <Chapter n={3} title="HTTP Caching and Freshness" />
      <Para>
        HTTP response headers describe whether and for how long a response can be reused. <code>Cache-Control: max-age</code> communicates freshness to caches; <code>s-maxage</code> applies to shared caches; <code>private</code> limits storage to a private cache; <code>no-store</code> says not to store the response. <code>ETag</code> supports conditional revalidation. A CDN may also have an explicit edge policy, so confirm how provider rules interact with origin headers.
      </Para>
      <CodeBlock>{`# Versioned public asset: safe to cache for a long time
HTTP/1.1 200 OK
Content-Type: text/css
Cache-Control: public, max-age=31536000, immutable
ETag: "asset-build-8f31"

# Personalized account response: do not store in shared caches
HTTP/1.1 200 OK
Content-Type: application/json
Cache-Control: private, no-store`}</CodeBlock>
      <Para>
        Long-lived caching is safest when the URL changes whenever the content changes, such as a build-hashed filename. For a stable URL whose content changes, use a shorter freshness window or revalidation. A stale-while-revalidate policy can let an edge serve a still-useful stale object while it refreshes, but only where temporary staleness is acceptable.
      </Para>
      <CodeBlock>{`# Inspect response cache headers without downloading the body
curl -sS -I https://static.example.test/assets/app.8f31.css

# A diagnostic response may expose provider-specific cache status
# Look for a documented cache-status header: HIT, MISS, or BYPASS
# The exact header name depends on the CDN.`}</CodeBlock>
      <Warn>
        Do not copy the numeric max-age from a sample into production without a content-update plan. A long TTL is a promise that a stale copy may remain visible until it expires or is explicitly invalidated.
      </Warn>
      <Divider />

      <Chapter n={4} title="Cacheability, Privacy, and Origin Protection" />
      <Para>
        Static files are natural cache candidates. Dynamic pages can be cacheable too if every user receives the same representation for a given key and the response policy says so. Account pages, payment status, one-time tokens, private API responses, and pages that embed session-specific data should not be shared-cacheable by accident. Review <code>Set-Cookie</code>, <code>Authorization</code>, and cache-control behavior together.
      </Para>
      <Para>
        A CDN can reduce origin load only when traffic actually hits cache or is otherwise absorbed at the edge. For a cache miss storm—such as a new release, a purge, or a popular object expiring—an <Accent>origin shield</Accent> can consolidate fetches from edge locations. Request coalescing, rate limits, and origin capacity plans further reduce stampedes. These protections must preserve correctness under concurrent updates.
      </Para>
      <CodeBlock>{`# A safe application decision, shown as pseudocode
if response_is_public_and_identical_for_all_users:
    set_header("Cache-Control", "public, max-age=300, s-maxage=1800")
else:
    set_header("Cache-Control", "private, no-store")

# Never rely on a CDN default to protect user-specific data.`}</CodeBlock>
      <Para>
        Keep origin access constrained where possible: allow only expected CDN egress ranges or use an authenticated origin connection supported by the provider. Otherwise, an attacker may bypass edge rate controls and hit the origin directly. Protect administrative endpoints separately and avoid treating IP allow-lists as user authentication.
      </Para>
      <Divider />

      <Chapter n={5} title="Invalidation and Content Updates" />
      <Para>
        Cache invalidation means making stored objects unavailable before their natural expiry. A broad purge is simple but may create a wave of origin misses. Purging by URL or tag is more targeted when the CDN and application support it. Another approach is <Accent>versioned URLs</Accent>: publish a new immutable filename and update the HTML that references it. This avoids waiting for an old file to expire and reduces the need for global purge operations.
      </Para>
      <H2>A release sequence that limits surprises</H2>
      <ol style={{ color: 'var(--text)', lineHeight: 1.9, paddingLeft: 22 }}>
        <li>Upload new versioned assets and verify them from the origin.</li>
        <li>Publish HTML or manifests that reference the new asset names.</li>
        <li>Warm critical paths if the release is expected to create a miss spike.</li>
        <li>Observe cache status, origin request volume, errors, and regional latency.</li>
        <li>Retain old assets long enough for cached HTML and clients still to reference them.</li>
      </ol>
      <Para>
        Purge APIs are provider-specific, and a purge request may be asynchronous. Do not assume that an accepted purge has already propagated everywhere. Confirm the semantics and test the user-visible result from representative regions.
      </Para>
      <Divider />

      <Chapter n={6} title="Edge Compute and Anycast Trade-Offs" />
      <Para>
        Edge functions can perform lightweight work near users: redirects, header normalization, A/B assignment, authentication checks, or routing to a nearby service. They run in a constrained environment and may have different limits, runtime APIs, and state models from a full application server. Keep authoritative writes and complex business rules in systems designed to own them unless the edge platform explicitly supports the required guarantees.
      </Para>
      <Para>
        Anycast can improve reachability and distribute traffic, but a route change or PoP failure can move a client to a different location. Do not assume edge-local memory is durable or shared across locations. If an edge function needs state, use a store with documented consistency and availability characteristics, and decide what happens when it is unavailable.
      </Para>
      <CodeBlock>{`# Edge decision flow (provider-neutral)
1. Validate the incoming host and path.
2. Reject malformed or disallowed requests early.
3. Redirect a canonical URL if required.
4. Serve a public cache hit when the cache key is safe.
5. Forward a miss to the configured origin.
6. Emit a request ID and timing metadata; never log secrets.`}</CodeBlock>
      <Warn>
        “At the edge” does not automatically mean private, compliant, or secure. Consider where logs and data are processed, what personal data is visible to edge code, and the geographic and contractual requirements that apply to your application.
      </Warn>
      <Divider />

      <Chapter n={7} title="Measure the User Experience, Not Just Hit Rate" />
      <Para>
        A high cache-hit ratio can coexist with slow pages if the hit objects are large, the user misses the nearest PoP, or the application has uncached API calls. Track latency percentiles by region and route, edge and origin error rates, bytes served, cache hit/miss/bypass, origin fetches, purge events, and TLS failures. Include the cache status and request ID in diagnostics without exposing tokens or personal data.
      </Para>
      <CodeBlock>{`# Compare response metadata from two locations you control
curl -sS -o /dev/null -w 'status=%{http_code} ttfb=%{time_starttransfer}s total=%{time_total}s\n' \
  https://www.example.test/catalog

# Repeat from a second approved region or monitoring probe.
# Compare like-for-like URLs and inspect documented CDN headers.`}</CodeBlock>
      <Para>
        When an incident occurs, distinguish edge failure from origin failure: compare a normal user request with a controlled origin check, inspect DNS and TLS, verify the cache status, and check whether recent changes altered routing or cache keys. Bypass tests should be limited to infrastructure you own or are authorised to operate.
      </Para>
      <Divider />

      <Chapter n={8} title="Mistakes to Avoid and Practice" />
      <ul style={{ color: 'var(--text)', lineHeight: 1.9, paddingLeft: 22 }}>
        <li><strong>Caching every 200 response:</strong> status code alone does not establish that a response is safe to share.</li>
        <li><strong>Ignoring query strings:</strong> parameters may select different products, pages, or language variants.</li>
        <li><strong>Purging everything on every deploy:</strong> broad purges can overwhelm an origin with simultaneous misses.</li>
        <li><strong>Assuming the nearest PoP is always used:</strong> routing policy, resolver location, and reachability affect selection.</li>
        <li><strong>Measuring only hit ratio:</strong> pair it with regional latency, origin load, and error rate.</li>
      </ul>
      <H2>Practice</H2>
      <ol style={{ color: 'var(--text)', lineHeight: 1.9, paddingLeft: 22 }}>
        <li>Choose cache headers for a build-hashed JavaScript file and explain why it can have a long TTL.</li>
        <li>Decide whether an order-status API response may be cached by a shared CDN. State the privacy assumptions.</li>
        <li>Draw a request path for a cache hit and a cache miss, including the origin shield if present.</li>
        <li>Explain one benefit and one risk of anycast-based edge selection.</li>
        <li>Plan a release that updates a frequently used asset without a global purge.</li>
      </ol>
      <Divider />
      <KeyTakeaways items={[
        'A CDN combines distributed edge infrastructure with routing and cache policy; edge delivery is more than a collection of copies.',
        'A cache key must distinguish every representation that matters while excluding private user-specific data.',
        'Use explicit HTTP cache directives, validators, and versioned URLs to manage freshness deliberately.',
        'Origin shields and request coalescing can protect the origin during miss spikes, but do not replace capacity planning.',
        'Anycast and DNS steering have different routing and convergence behavior; neither guarantees the geographically closest edge.',
        'Measure regional latency, cache status, origin load, errors, and privacy—not only hit ratio.',
      ]} />
    </LearnLayout>
  )
}
