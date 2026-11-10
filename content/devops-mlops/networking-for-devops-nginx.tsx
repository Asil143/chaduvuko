import { Callout, Code, H3, KeyTakeaways, Mistakes, NextLesson, P, Part, Practice, Steps, Table } from '@/components/content/LessonKit'
import { LearnLayout } from '@/components/content/LearnLayout'

export default function NetworkingForDevopsNginx() {
  return (
    <LearnLayout
      title="Networking for DevOps — DNS, Load Balancers and Nginx"
      description="Follow a request from DNS to your application, understand TLS termination and load balancing, and configure Nginx as a reverse proxy."
      section="DevOps & Cloud Infrastructure — Lesson 07"
      readTime="40 min"
    >
      <Part n={1} label="The request path" title="Trace One Request Before You Configure Anything">
        <P>
          A learner in Vijayawada opens <code>learn.example.test</code> to check a course. The browser has to discover an address,
          establish a protected connection, pass through an entry point, and reach a healthy application instance. When any hop is
          unclear, teams tend to open broad firewall rules or change Nginx settings at random. Draw the path first and mark which
          component owns each decision.
        </P>
        <P>
          A common path is <strong>browser → DNS resolver → load balancer → Nginx → application</strong>. Small systems may skip a
          separate load balancer and let Nginx be the edge. Larger systems may terminate TLS at a cloud load balancer and use Nginx
          only inside the private network. The right shape depends on where certificates, routing policy, and health checks are
          managed; neither architecture is automatically more secure.
        </P>
        <Steps items={[
          'Resolve the host name to the public or private endpoint intended for this audience.',
          'Establish a TCP connection and, for HTTPS, negotiate TLS with the endpoint that owns the certificate.',
          'Route the HTTP request using its host and path, then forward it to a healthy upstream.',
          'Return the application response through the same controlled path to the browser.',
        ]} />
        <Callout type="info">
          A successful DNS lookup proves only that a name resolved. It does not prove that the endpoint accepts traffic, the TLS
          certificate is valid, or the application is healthy.
        </Callout>
      </Part>

      <Part n={2} label="DNS" title="DNS Names an Endpoint; It Does Not Balance Every Request">
        <P>
          DNS maps names to records. An A record maps a name to an IPv4 address; an AAAA record maps it to IPv6. A CNAME points one
          name to another name. In a cloud design, the public record commonly points at a provider load-balancer hostname rather
          than at a short-lived virtual-machine address. Private DNS can provide different answers to internal clients.
        </P>
        <P>
          DNS caching means a record change is not an instant, universal switch. Resolvers and clients cache answers for the
          record&apos;s time to live (TTL), and the previous endpoint may remain in use until cached entries expire. Plan cutovers with
          the existing TTL and health of both destinations in mind. DNS-based distribution can direct clients among endpoints,
          but an application load balancer can make per-request decisions using health checks and routing rules.
        </P>
        <Table
          head={['Record or component', 'Purpose', 'Operational question']}
          rows={[
            ['A / AAAA', 'Maps a name to an IPv4 / IPv6 address', 'Is this address stable and reachable from the intended network?'],
            ['CNAME', 'Aliases one DNS name to another name', 'Does the DNS provider allow this record at the zone apex?'],
            ['DNS TTL', 'Controls how long resolvers may cache an answer', 'How long could a cutover or rollback take to be seen?'],
            ['Load balancer', 'Routes connections or requests to backends', 'What is its health check, TLS policy, and failure behavior?'],
          ]}
        />
        <Callout type="tip">
          Use a provider-managed DNS name as the record target when the load balancer&apos;s addresses can change. Avoid pinning a
          production record to an ephemeral instance address.
        </Callout>
      </Part>

      <Part n={3} label="TLS and proxies" title="Know Where Encryption Ends and Restarts">
        <P>
          TLS protects data in transit and lets a client verify the identity of the endpoint presenting a certificate for the
          requested host. TLS termination is the point where that encrypted connection is decrypted. Termination may happen at a
          cloud load balancer or at Nginx. From there, the proxy can forward plain HTTP within a tightly controlled private network
          or establish a second TLS connection to the upstream. Choose deliberately based on the threat model and platform controls.
        </P>
        <P>
          A reverse proxy receives requests on behalf of an application. It can select an upstream, apply routing policy, and pass
          along relevant request context. Headers such as <code>X-Forwarded-For</code> and <code>X-Forwarded-Proto</code> communicate
          the original client address and scheme, but are not trustworthy merely because they exist: the edge must set or sanitize
          them, and the application must trust only the known proxy chain.
        </P>
        <Callout type="warning">
          Do not forward secrets, session tokens, or arbitrary client-supplied forwarding headers into logs. Logs are often more
          widely accessible and retained longer than application data.
        </Callout>
      </Part>

      <Part n={4} label="Nginx reverse proxy" title="Route HTTPS Traffic to an Application">
        <P>
          This example assumes a separate, trusted load balancer has already terminated public TLS and forwards traffic to Nginx
          over a private network. Nginx listens on port 8080, routes the application host to a service reachable at
          <code> 127.0.0.1:8000</code>, and preserves the original host and request path. Replace the illustrative host and upstream
          with values from your environment; the upstream must be reachable from the Nginx process.
        </P>
        <Code lang="nginx" file="orders.conf" code={`
upstream orders_api {
    server 127.0.0.1:8000;
}

server {
    listen 8080;
    server_name orders.example.test;

    location / {
        proxy_pass http://orders_api;
        proxy_http_version 1.1;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $http_x_forwarded_proto;
        proxy_connect_timeout 5s;
        proxy_read_timeout 30s;
    }
}
`} />
        <P>
          The incoming forwarded-proto header is safe to use here only if the network policy ensures that requests arrive from the
          trusted load balancer and that it overwrites the header. If users can connect directly to this listener, an attacker can
          forge it. In that case, configure the edge and application to use a verified proxy chain, or set a known scheme at the
          trusted boundary. Timeouts should match the application&apos;s real request profile rather than hiding a hung service.
        </P>
      </Part>

      <Part n={5} label="Validate the config" title="Test Before Reloading and Observe the Whole Route">
        <P>
          Nginx can reject a malformed configuration before it replaces the currently running configuration. Validate first, then
          reload using the service manager that owns your installation. A reload is not a substitute for checking the load
          balancer, firewall, DNS, and application health independently.
        </P>
        <Code lang="bash" code={`
# Check syntax and referenced files without changing the running service
sudo nginx -t

# After a successful test, ask the service manager to reload its configuration
sudo systemctl reload nginx

# Inspect response headers and status from a machine that can reach the endpoint
curl -sS -D - -o /dev/null https://orders.example.test/health

# Inspect name resolution from the same network as the client
getent ahosts orders.example.test
`} />
        <P>
          The last command checks the resolver used by that host; it may differ from a public recursive resolver or a browser using
          encrypted DNS. The health path should return a deliberate status and should not reveal dependency credentials or internal
          topology. Compare the observed host, certificate, response code, and application logs with the route you drew in Part 1.
        </P>
        <Steps items={[
          'Check that DNS resolves to the intended edge endpoint.',
          'Verify the certificate name, trust chain, and expiry with your organization-approved TLS tooling.',
          'Check load-balancer target health and the Nginx access and error logs.',
          'Confirm the application is listening on the configured upstream address and port.',
        ]} />
      </Part>

      <Part n={6} label="Traffic distribution" title="Load Balance for Capacity and Failure, Not as a Cure-All">
        <P>
          A load balancer can distribute requests across several healthy instances, but it cannot make a stateful application
          horizontally scalable by itself. If one instance keeps session state in local memory, a later request routed elsewhere
          may lose that session. Prefer stateless application instances with shared or signed session state where appropriate.
          Health checks should test the capability needed to serve traffic without making a temporary downstream issue cause every
          instance to be removed at once.
        </P>
        <Table
          head={['Signal', 'Useful check', 'What it cannot guarantee']}
          rows={[
            ['DNS', 'Expected record and resolver view', 'That the address accepts traffic or is healthy'],
            ['TLS', 'Correct host, valid certificate, trusted chain', 'That the application route works'],
            ['Load balancer', 'Healthy targets and expected listener rule', 'That an app dependency or user flow works'],
            ['Nginx', 'Valid config and upstream response', 'That the upstream is correct for every business request'],
            ['Application', 'Health endpoint and representative request', 'That every dependency will remain available'],
          ]}
        />
        <P>
          For a Swiggy-style delivery status API, one health endpoint might confirm the process can accept traffic, while a deeper
          diagnostic checks its database and queue. Keep diagnostic endpoints protected; publishing detailed dependency state can
          reveal internal information. Define which signal gates traffic and which pages the on-call engineer.
        </P>
      </Part>

      <Part n={7} label="Production concerns" title="Make Network Changes Reversible and Observable">
        <P>
          Before changing DNS, a certificate, a listener, or a proxy route, record the current state and prepare a rollback. Use a
          staging host or a local test endpoint first. Keep inbound network rules limited to the required source and destination;
          a proxy is not a reason to expose the application port to the whole internet. Terminate TLS at a documented boundary and
          encrypt another network hop when your security requirements call for it.
        </P>
        <P>
          Monitor request rate, error rate, response latency, upstream connection failures, and target health. Redact credentials
          and personal data from access logs. Correlate load-balancer and Nginx request IDs where supported, but avoid putting
          identity data in a public response header. For an incident, identify the first failing hop rather than restarting every
          component at once.
        </P>
        <Callout type="example">
          If an API returns 502, Nginx may be unable to connect to its upstream. Check the proxy error log, service listener,
          container health, and network policy before changing DNS; DNS may already be correct.
        </Callout>
      </Part>

      <Part n={8} label="Pitfalls" title="Common Mistakes">
        <Mistakes items={[
          { mistake: 'Pointing production DNS at a temporary VM address', cause: 'The instance can be replaced while DNS caches keep the old address.', fix: 'Target a stable managed endpoint and plan DNS cutovers around the existing TTL.' },
          { mistake: 'Assuming TLS is end-to-end after edge termination', cause: 'The first TLS connection ends at the load balancer unless another encrypted hop is configured.', fix: 'Document each TLS boundary and encrypt upstream traffic when the network or policy requires it.' },
          { mistake: 'Trusting X-Forwarded-For from any client', cause: 'A caller can send a forged header when the trusted edge does not overwrite it.', fix: 'Restrict direct access and trust only headers set by explicitly trusted proxies.' },
          { mistake: 'Treating a 502 as a DNS problem', cause: 'A proxy often returns 502 when its upstream is unreachable or rejects the connection.', fix: 'Check the proxy error log, upstream listener, health, and network rules in request-path order.' },
        ]} />
      </Part>

      <Part n={9} label="Practice" title="Trace and Proxy a Small API">
        <Practice
          title="A safe request path for a sample orders API"
          tasks={[
            'Draw a request path for browser, DNS, TLS endpoint, load balancer, Nginx, and two API replicas; label which hops are public.',
            'Create an Nginx server block for a local test API and pass the Host and trusted forwarding headers to the upstream.',
            'Run the Nginx syntax test before reload; intentionally break a directive in a disposable copy and observe the failure.',
            'Use resolver and HTTP tools from the client network to record name resolution, TLS identity, status code, and response time.',
            'Simulate an unavailable upstream in a non-production environment and identify the first useful log or health signal.',
          ]}
          hint="Keep the practice endpoint local or in an approved test environment. Do not expose a debug port or real customer traffic to the internet."
        />
      </Part>

      <KeyTakeaways items={[
        'A request typically passes through DNS, a TLS endpoint, a load balancer or reverse proxy, and the application; draw the route before debugging.',
        'DNS maps names to endpoints and caches answers; a load balancer can make per-request health and routing decisions.',
        'TLS termination is a specific boundary. Decide whether the upstream hop also needs encryption.',
        'Nginx reverse proxy headers carry request context, but trust only values sanitized by a controlled proxy chain.',
        'Test Nginx configuration before reload and verify each network hop with its own health signal.',
        'A load balancer does not make stateful applications stateless or guarantee healthy dependencies.',
      ]} />

      <H3>Next</H3>
      <NextLesson
        href="/learn/devops-mlops/terraform-infrastructure-as-code"
        label="Lesson 08 · Infrastructure as Code with Terraform"
        text="You can now trace traffic to an application. Next, define the network and cloud resources themselves as reviewable, repeatable infrastructure code."
      />
    </LearnLayout>
  )
}
