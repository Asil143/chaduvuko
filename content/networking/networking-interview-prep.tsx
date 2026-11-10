import type { ReactNode } from 'react'
import { LearnLayout } from '@/components/content/LearnLayout'
import { KeyTakeaways } from '@/components/content/KeyTakeaways'

const Chapter = ({ n, title }: { n: number; title: string }) => (
  <div style={{ marginBottom: 28 }}>
    <p style={{ fontSize: 11, color: '#10b981', fontFamily: 'var(--font-mono)', fontWeight: 700, letterSpacing: '.12em', textTransform: 'uppercase', margin: '0 0 6px' }}>Chapter {String(n).padStart(2, '0')}</p>
    <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(22px,3.5vw,34px)', fontWeight: 900, letterSpacing: '-1px', color: 'var(--text)', margin: 0 }}>{title}</h2>
  </div>
)
const Divider = () => <hr style={{ border: 0, borderTop: '1px solid var(--border)', margin: '40px 0' }} />
const Para = ({ children }: { children: ReactNode }) => <p style={{ fontSize: 15, color: 'var(--text)', lineHeight: 1.9, margin: '0 0 18px' }}>{children}</p>
const H2 = ({ children }: { children: ReactNode }) => <h3 style={{ fontSize: 19, fontWeight: 800, color: 'var(--text)', margin: '28px 0 12px' }}>{children}</h3>
const CodeBlock = ({ children }: { children: ReactNode }) => <pre style={{ background: '#0d1117', border: '1px solid var(--border)', borderRadius: 12, padding: '18px 20px', overflowX: 'auto', fontSize: 13, lineHeight: 1.75, color: '#e2e8f0', fontFamily: 'var(--font-mono)', margin: '18px 0' }}><code>{children}</code></pre>
const StoryBox = ({ children }: { children: ReactNode }) => <div style={{ borderLeft: '4px solid #3b82f6', background: 'rgba(59,130,246,.07)', borderRadius: '0 10px 10px 0', padding: '18px 22px', margin: '22px 0', color: 'var(--text)', lineHeight: 1.85 }}>{children}</div>
const Question = ({ n, level, title, children }: { n: number; level: string; title: string; children: ReactNode }) => (
  <div style={{ border: '1px solid var(--border)', borderRadius: 12, padding: '18px 20px', margin: '18px 0', background: 'var(--surface)' }}>
    <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
      <span style={{ flexShrink: 0, fontSize: 10, fontFamily: 'var(--font-mono)', fontWeight: 800, color: '#10b981', background: 'rgba(16,185,129,.12)', padding: '4px 8px', borderRadius: 6 }}>{String(n).padStart(2, '0')} · {level}</span>
      <strong style={{ color: 'var(--text)', fontSize: 15 }}>{title}</strong>
    </div>
    <div style={{ color: 'var(--text)', fontSize: 14, lineHeight: 1.85 }}>{children}</div>
  </div>
)
const Accent = ({ children }: { children: ReactNode }) => <strong style={{ color: '#10b981' }}>{children}</strong>

export default function NetworkingInterviewPrep() {
  return (
    <LearnLayout
      title="Networking Interview Prep"
      description="Practice core networking questions with structured answers, troubleshooting scenarios, and design trade-offs."
      section="Networking Fundamentals — Lesson 49"
      readTime="25–35 min"
    >
      <Para><strong>Prerequisites:</strong> Review IP addressing, DNS, routing, TCP/UDP, TLS, HTTP, cloud network controls, and basic troubleshooting tools.</Para>
      <Para><strong>Learning objectives:</strong> Structure concise technical answers, trace requests and failures by layer, explain design trade-offs, and verify conclusions with evidence.</Para>
      <Chapter n={1} title="Answer Like an Engineer, Not a Flashcard" />
      <StoryBox>
        Interview questions often test how you reason under incomplete information. A strong answer gives a short definition, walks through a packet or failure path, names the assumptions, and explains how you would verify the result. If you do not know a provider-specific detail, say what you would check instead of inventing a setting.
      </StoryBox>
      <Para>
        Use a compact structure: <Accent>clarify the scenario → state the model → trace the flow → identify failure modes → verify with evidence</Accent>. For design questions, ask about traffic, availability, security boundaries, scale, and operational constraints before choosing a product. For troubleshooting questions, avoid jumping directly to a fix: isolate the layer where the observed behavior begins.
      </Para>
      <CodeBlock>{`A useful troubleshooting outline

1. Define the symptom, scope, and recent changes.
2. Reproduce one representative request.
3. Check name resolution and destination selection.
4. Trace routes and policy in both directions.
5. Check transport and application responses.
6. Correlate logs, metrics, and packet evidence.
7. Make one controlled change; verify and document.`}</CodeBlock>
      <Divider />

      <Chapter n={2} title="Core Concepts and Addressing" />
      <Question n={1} level="Foundation" title="What happens after a user enters a URL in a browser?">
        <p><strong>Model answer:</strong> The browser parses the URL, resolves the hostname through DNS if it is not already cached, and establishes a transport connection to the selected address. For HTTPS it negotiates TLS and validates the server certificate. It then sends an HTTP request; routers forward packets toward the destination, the server or edge processes the request, and the response returns over the connection. Caches, proxies, and connection reuse can change details, so I would identify which path applies to the system.</p>
        <p><strong>What interviewers look for:</strong> A layered sequence, DNS and TLS in the right place, and awareness that a CDN or existing connection may shorten the path.</p>
      </Question>
      <Question n={2} level="Foundation" title="How do a switch and a router differ?">
        <p><strong>Model answer:</strong> A Layer 2 switch forwards Ethernet frames within a broadcast domain using MAC-address learning. A router forwards IP packets between networks using routing information and a next hop. A multilayer switch can perform both roles, so I would describe the forwarding function rather than rely only on the appliance name.</p>
        <p><strong>What interviewers look for:</strong> Distinguishing frame/MAC forwarding from packet/IP routing without claiming that every physical device has only one function.</p>
      </Question>
      <Question n={3} level="Intermediate" title="A host has an IP address and mask. How do you find its subnet?">
        <p><strong>Model answer:</strong> The prefix length tells how many leading bits identify the network. I apply the mask to the address to obtain the network address, then compare the destination to that prefix. As an example, an address in <code>192.0.2.0/24</code> shares the first 24 bits with other addresses in that prefix. In real work I use a trusted IP calculator or a language library and check the intended address plan.</p>
        <p><strong>What interviewers look for:</strong> Correct prefix reasoning, not memorized classful ranges, plus attention to usable host and special-address rules when the design requires them.</p>
      </Question>
      <Question n={4} level="Intermediate" title="What is the difference between a public and a private IP address?">
        <p><strong>Model answer:</strong> Private IPv4 ranges are reserved for use inside private networks and are not globally routed as public destinations on the internet. A public address is globally unique in the public routing system at a given time. Private addresses often reach external services through NAT, but NAT is address translation, not a complete security policy. IPv6 has its own global and local addressing distinctions.</p>
        <p><strong>What interviewers look for:</strong> Awareness of RFC 1918 private ranges, NAT's purpose, and the fact that private addressing alone does not secure a workload.</p>
      </Question>
      <Question n={5} level="Intermediate" title="Why does longest-prefix match matter in routing?">
        <p><strong>Model answer:</strong> A router may have several routes that match a destination. It chooses the most specific matching prefix—the one with the greatest number of network bits—before using route preference or other selection rules among equivalent prefixes. This lets a specific subnet route override a broader summary or default route.</p>
        <p><strong>What interviewers look for:</strong> A clear example and separation between prefix specificity and administrative preference or metric.</p>
      </Question>
      <Divider />

      <Chapter n={3} title="Transport, DNS, and Web Traffic" />
      <Question n={6} level="Foundation" title="Compare TCP and UDP. When would you use each?">
        <p><strong>Model answer:</strong> TCP provides an ordered, reliable byte stream with connection establishment, acknowledgements, retransmission, and congestion control. UDP sends independent datagrams without TCP's delivery and ordering guarantees. Applications choose based on their needs: HTTP commonly uses TCP, while DNS queries and real-time media often use UDP, with application protocols adding their own behavior where needed. QUIC uses UDP transport while implementing reliability and security at a higher layer.</p>
        <p><strong>What interviewers look for:</strong> Correct transport properties and examples without saying that UDP is inherently faster for every workload or that it cannot be used reliably by an application protocol.</p>
      </Question>
      <Question n={7} level="Intermediate" title="What does a TCP three-way handshake accomplish?">
        <p><strong>Model answer:</strong> The initiator sends SYN with an initial sequence number; the listener responds with SYN-ACK acknowledging it and providing its own sequence number; the initiator sends ACK. Both endpoints establish connection state and synchronize sequence-number expectations. The handshake does not prove that the application is healthy or that later packets will be delivered.</p>
        <p><strong>What interviewers look for:</strong> The SYN, SYN-ACK, ACK order, sequence-space purpose, and distinction between transport reachability and application success.</p>
      </Question>
      <Question n={8} level="Foundation" title="A DNS lookup returns the wrong address. What would you check?">
        <p><strong>Model answer:</strong> Check the exact name and record type, local resolver and browser caches, TTL, authoritative answers, split-horizon DNS, and whether a CDN or load balancer intentionally returns different addresses. Compare answers from the configured resolver and an authoritative source, then verify the destination's route and TLS host name. A DNS response can be correct for one resolver location and different for another.</p>
        <p><strong>What interviewers look for:</strong> A layered diagnostic approach that considers caching and intentional geo/load steering rather than assuming DNS is a single static file.</p>
      </Question>
      <Question n={9} level="Intermediate" title="What does TLS protect, and what does a certificate prove?">
        <p><strong>Model answer:</strong> TLS provides encryption in transit and integrity, and server authentication when the client validates the certificate chain and hostname. A certificate binds a public key to an identity under a trust system; it does not prove that the application is safe, that the server is uncompromised, or that the user is authenticated. Mutual TLS can also authenticate a client when both sides are configured to validate certificates.</p>
        <p><strong>What interviewers look for:</strong> Accurate trust boundaries, hostname and chain validation, and no claim that a lock icon certifies the website's business behavior.</p>
      </Question>
      <Question n={10} level="Intermediate" title="How does a reverse proxy differ from a forward proxy?">
        <p><strong>Model answer:</strong> A reverse proxy represents one or more origin servers to clients and can route, balance, cache, or terminate TLS. A forward proxy represents clients when they access other services, often for egress control or privacy policy. Both proxy traffic, but the trust relationship and whose identity is being represented differ.</p>
        <p><strong>What interviewers look for:</strong> Direction and role clarity, plus awareness that proxies can add security and availability responsibilities.</p>
      </Question>
      <Divider />

      <Chapter n={4} title="Routing, Cloud, and Security Boundaries" />
      <Question n={11} level="Intermediate" title="What is the difference between a security group and a network ACL?">
        <p><strong>Model answer:</strong> In common cloud designs, a security group is a stateful filter associated with a workload or interface, while a network ACL is a stateless filter at a subnet boundary. Stateful rules track a permitted flow so return traffic is handled automatically; stateless rules need explicit rules for both directions, including relevant ephemeral ports. I would verify the specific provider's defaults and evaluation semantics.</p>
        <p><strong>What interviewers look for:</strong> The stateful/stateless distinction, policy placement, and provider-aware precision.</p>
      </Question>
      <Question n={12} level="Intermediate" title="Why might two peered cloud networks still be unable to communicate?">
        <p><strong>Model answer:</strong> Peering alone does not guarantee a working flow. Check non-overlapping CIDRs, routes in both VPCs, security-group and subnet-ACL rules, host firewalls, destination listeners, and any required DNS settings. Peering is typically non-transitive, so a route through a third peered VPC may not work. I would trace the exact source-to-destination flow and inspect flow logs where available.</p>
        <p><strong>What interviewers look for:</strong> Both route directions, filters, overlap, and non-transitivity—not just “the peer is active.”</p>
      </Question>
      <Question n={13} level="Intermediate" title="What problem does NAT solve, and what does it not solve?">
        <p><strong>Model answer:</strong> NAT translates address or port information so private-addressed hosts can communicate through an address used on another network. It helps conserve IPv4 address space and can enable outbound access from private workloads. It does not replace firewall rules, identity checks, or application security, and inbound behavior depends on explicit mappings and policy.</p>
        <p><strong>What interviewers look for:</strong> Translation versus filtering, outbound versus inbound behavior, and no blanket claim that NAT makes a network secure.</p>
      </Question>
      <Question n={14} level="Advanced" title="How would you design a highly available web service across zones?">
        <p><strong>Model answer:</strong> I would clarify availability and recovery goals, then use redundant stateless application instances across failure domains behind a health-checked load balancer. I would examine database replication and failover, queue behavior, dependency availability, DNS or edge routing, and deployment strategy. I would define health signals, capacity headroom, backup and restore, and test failover under realistic conditions. A multi-zone design still needs a plan for regional failure and shared dependencies.</p>
        <p><strong>What interviewers look for:</strong> End-to-end availability, failure domains, stateful dependencies, explicit SLO/RTO/RPO assumptions, and tested recovery rather than a single load balancer diagram.</p>
      </Question>
      <Divider />

      <Chapter n={5} title="Troubleshooting and Operations" />
      <Question n={15} level="Intermediate" title="A service is reachable by IP but not by hostname. How do you investigate?">
        <p><strong>Model answer:</strong> Compare DNS answers and caches, check the exact hostname and search suffix, and test from the affected client and resolver. If DNS points to a proxy or CDN, verify its route, certificate hostname, and host-based routing. A successful IP request may use a different virtual host or bypass TLS name validation, so I would compare equivalent requests rather than treat the IP test as proof that the service is healthy.</p>
        <p><strong>What interviewers look for:</strong> DNS, TLS SNI/hostname, virtual hosting, and controlled apples-to-apples tests.</p>
      </Question>
      <Question n={16} level="Intermediate" title="A user reports high latency. What data do you collect first?">
        <p><strong>Model answer:</strong> Clarify which action is slow, how many users and regions are affected, when it began, and whether latency is network, server, or dependency time. Compare percentiles and error rates, trace a request across hops, and check DNS, connection setup, retransmissions, queueing, CPU, and downstream calls. I would compare a healthy baseline and a representative affected request before changing routes or scaling.</p>
        <p><strong>What interviewers look for:</strong> Scope, timelines, measurable signals, and separating propagation/transport delay from service processing time.</p>
      </Question>
      <Question n={17} level="Intermediate" title="What is the difference between packet loss and congestion?">
        <p><strong>Model answer:</strong> Packet loss is an observation that packets did not arrive or were discarded. Congestion is one possible cause, often when queues or links are overloaded, but loss can also come from wireless interference, faulty interfaces, policy drops, or routing problems. I would correlate loss with interface counters, queue drops, retransmissions, path measurements, and timing before attributing cause.</p>
        <p><strong>What interviewers look for:</strong> Distinguishing symptom from cause and using multiple observations to locate where loss occurs.</p>
      </Question>
      <Question n={18} level="Advanced" title="How do you make a network configuration change safely?">
        <p><strong>Model answer:</strong> Define the intended state and blast radius, review a diff, validate syntax and policy, snapshot current state, and test in a lab or canary. Apply in bounded batches with a stop condition, then verify both device state and service traffic. Have a tested rollback or compensating action, track partial outcomes, and record the change. Emergency procedures should still preserve access control and audit as much as possible.</p>
        <p><strong>What interviewers look for:</strong> Change management, staged rollout, service-level verification, recovery, and clear handling of partial failure.</p>
      </Question>
      <Divider />

      <Chapter n={6} title="A Practical Diagnostic Toolkit" />
      <Para>
        Use tools to answer a question, not simply because they are familiar. <code>dig</code> tests name resolution, <code>curl</code> inspects application responses, <code>ip route</code> shows the local route table on Linux, and <code>traceroute</code> or <code>tracepath</code> helps reveal path behavior. A packet capture can confirm what left an interface and what returned, but it does not automatically explain why a remote firewall dropped traffic.
      </Para>
      <CodeBlock>{`# Read-only examples; run only on systems you administer
getent ahosts api.example.test
dig api.example.test
ip route get 203.0.113.20
curl -sS -D - -o /dev/null https://api.example.test/health

# Compare each command's result with a known-good host or time window.`}</CodeBlock>
      <Para>
        In an interview, explain which observation would change your next step. For example, if DNS resolves correctly but TCP connection establishment fails, look at routing, filtering, and listener state before investigating application payloads. If TLS succeeds but HTTP returns an error, the network path is working at least far enough to reach an HTTP-speaking endpoint; continue with proxy and application logs.
      </Para>
      <CodeBlock>{`Layer-by-layer evidence map

Name lookup       -> resolver answer, TTL, authoritative record
Route selection   -> source route table, next hop, path
Transport         -> connect result, retransmission, reset, timeout
TLS               -> certificate chain, hostname, handshake result
HTTP              -> status, headers, request ID, response timing
Application       -> dependency traces, logs, saturation, queue depth`}</CodeBlock>
      <Divider />

      <Chapter n={7} title="System Design Scenario: A Regional Learning Platform" />
      <Para>
        Suppose a platform serves course pages, videos, quizzes, and account data to users across India. A thoughtful design separates public delivery from private services. Static versioned assets and video segments can be served through a CDN with deliberate cache headers. A load balancer routes HTTPS requests to stateless application instances in multiple zones. Account and payment data remain behind private network boundaries; service-to-service access is narrowly scoped. A managed database and queue need their own availability, backup, and recovery design.
      </Para>
      <Para>
        Ask how many regions and languages matter, which data is personalized, what freshness users require, how quizzes behave during an outage, and what recovery objectives exist. Avoid caching authenticated responses in a shared CDN, exposing the database to the internet, or assuming a second application instance solves a single-region failure. Add tracing and request IDs so a slow lesson load can be separated into edge, app, database, and storage time.
      </Para>
      <H2>Trade-offs to state explicitly</H2>
      <ul style={{ color: 'var(--text)', lineHeight: 1.9, paddingLeft: 22 }}>
        <li>Cache more static content to reduce latency and origin load; keep private content isolated.</li>
        <li>Use multiple zones for availability, while accounting for state replication and consistency.</li>
        <li>Use private connectivity for service communication, but retain explicit authorization at the service.</li>
        <li>Choose multi-region complexity only when recovery goals justify its operational cost.</li>
      </ul>
      <Divider />

      <Chapter n={8} title="Practice: Explain, Troubleshoot, Design" />
      <H2>Common mistakes</H2>
      <ul style={{ color: 'var(--text)', lineHeight: 1.9, paddingLeft: 22 }}>
        <li><strong>Jumping to a fix:</strong> clarify scope and collect evidence before changing routes or firewall rules.</li>
        <li><strong>Mixing layers:</strong> an IP response does not test DNS, and a successful TCP connection does not prove the application is healthy.</li>
        <li><strong>Overstating certainty:</strong> state assumptions and verify provider-specific defaults rather than guessing.</li>
        <li><strong>Listing tools without a question:</strong> explain what each command will prove and what result changes your next step.</li>
      </ul>
      <H2>Practice tasks</H2>
      <ol style={{ color: 'var(--text)', lineHeight: 1.9, paddingLeft: 22 }}>
        <li>Give a two-minute explanation of a browser request from DNS lookup through HTTPS response, naming where a CDN can answer.</li>
        <li>For a private app-to-database timeout, walk through routes, both security boundaries, host firewalls, and the listener.</li>
        <li>Design the smallest useful set of metrics for a load balancer and its backend pool. Explain how each can reveal a different failure.</li>
        <li>Explain why NAT is not a security group and why private addresses do not remove the need for access policy.</li>
        <li>Design a safe rollout for changing a route across a fleet. Include a canary, stop condition, verification, and recovery plan.</li>
        <li>Choose one answer above and deliver it aloud in under 90 seconds, then identify one assumption you would clarify.</li>
      </ol>
      <Para>
        After each mock answer, ask a peer to identify the assumptions you made and the evidence you would collect next. Good preparation improves precision and structure; it does not require pretending to have operated every vendor platform.
      </Para>
      <Divider />
      <KeyTakeaways items={[
        'Clarify the scenario, state the networking model, trace the flow, name failure modes, and explain how you would verify them.',
        'Keep layers distinct: DNS selects names, routing selects paths, transport manages delivery, TLS protects a connection, and HTTP carries application semantics.',
        'Treat symptoms such as loss, latency, and timeouts as evidence—not as root causes.',
        'For cloud and security questions, discuss routes, return paths, least privilege, and provider-specific semantics.',
        'Availability designs include stateful dependencies, failure domains, backups, and tested recovery—not just redundant servers.',
        'For changes, show a reviewed plan, staged rollout, service-level verification, and an explicit recovery strategy.',
      ]} />
    </LearnLayout>
  )
}
