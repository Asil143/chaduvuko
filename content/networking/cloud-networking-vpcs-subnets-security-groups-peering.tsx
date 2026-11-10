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
const Warn = ({ children }: { children: ReactNode }) => <div style={{ background: 'rgba(251,191,36,.08)', border: '1px solid rgba(251,191,36,.3)', borderRadius: 12, padding: '16px 20px', margin: '22px 0', lineHeight: 1.85, color: 'var(--text)' }}><strong style={{ color: '#fbbf24' }}>Network-design caution: </strong>{children}</div>
const Err = ({ children }: { children: ReactNode }) => <div style={{ background: 'rgba(239,68,68,.07)', border: '1px solid rgba(239,68,68,.25)', borderRadius: 12, padding: '16px 20px', margin: '22px 0', lineHeight: 1.85, color: 'var(--text)' }}><strong style={{ color: '#f87171' }}>Common mistake: </strong>{children}</div>

export default function CloudNetworkingVpcsSubnetsSecurityGroupsPeering() {
  return (
    <LearnLayout
      title="Cloud Networking — VPCs, Subnets, Security Groups and Peering"
      description="Build a mental model of cloud virtual networks, route tables, stateful security groups, and private connectivity."
      section="Networking Fundamentals — Lesson 47"
      readTime="22–30 min"
    >
      <Para><strong>Prerequisites:</strong> Know IPv4/CIDR notation, routing tables, basic firewall rules, and the difference between inbound and outbound traffic.</Para>
      <Para><strong>Learning objectives:</strong> Plan non-overlapping VPC address space, trace routes between subnets, apply least-privilege security-group intent, and diagnose peering paths.</Para>
      <Chapter n={1} title="A Network You Define in Software" />
      <StoryBox>
        A learning platform runs a public web tier, private application services, and a database that should not accept internet connections. In a cloud environment, you define isolated address space and virtual routing rather than plugging in physical switches. The same familiar questions still apply: which addresses are valid, which routes exist, where are the trust boundaries, and which flow is allowed?
      </StoryBox>
      <Para>
        A <Accent>Virtual Private Cloud (VPC)</Accent>—called a virtual network or VNet by some providers—is a logically isolated network boundary in a cloud region or equivalent scope. It has an IP address range, subnets, route tables, and attachment points to other networks. It is not automatically private from every other cloud service, and it does not replace identity and workload security.
      </Para>
      <Para>
        A useful starting design is to reserve non-overlapping address space before creating resources. For example, a VPC could use <code>10.20.0.0/16</code> and allocate smaller ranges to availability zones and tiers. Leave room for growth, future peering, VPNs, and on-premises networks; overlapping CIDRs can make later connectivity difficult or impossible without translation or renumbering.
      </Para>
      <CodeBlock>{`VPC: 10.20.0.0/16

Availability zone A              Availability zone B
10.20.0.0/24  public edge         10.20.10.0/24 public edge
10.20.1.0/24  app workloads       10.20.11.0/24 app workloads
10.20.2.0/24  data tier           10.20.12.0/24 data tier
       │                                  │
       └──────── private service paths ──┘`}</CodeBlock>
      <Divider />

      <Chapter n={2} title="Subnets, Route Tables, and Internet Paths" />
      <Para>
        A <Accent>subnet</Accent> is a slice of a VPC's address range associated with a location or availability zone. A subnet alone does not make a workload public or private. Its attached route table determines where traffic can go. A subnet with a route to an internet gateway may be considered public by the provider's model; a private subnet generally has no direct inbound internet route. Workloads in a private subnet may still have controlled outbound access through a NAT service or private endpoints.
      </Para>
      <Para>
        Route tables use destination prefixes and next hops. The most-specific matching route generally wins, so a route for a VPC-local prefix can remain more specific than a default route. A path requires more than one route: the sender needs a route out, the destination needs a return route, and security controls on the path must permit the flow.
      </Para>
      <CodeBlock>{`Example route intent (not provider CLI syntax)

Public subnet route table:
10.20.0.0/16   -> local VPC routing
0.0.0.0/0      -> internet gateway

Private app subnet route table:
10.20.0.0/16   -> local VPC routing
0.0.0.0/0      -> managed NAT for outbound updates only

Private data subnet route table:
10.20.0.0/16   -> local VPC routing
(no default route to the public internet)`}</CodeBlock>
      <Para>
        An internet gateway route does not automatically assign a public IP or open a security rule. Public reachability requires an address and an allowed path in both directions. Similarly, NAT typically enables outbound-initiated connections and their return traffic; it is not a general inbound publishing mechanism. Provider behavior and route terminology differ, so validate the precise service model in the chosen cloud.
      </Para>
      <Divider />

      <Chapter n={3} title="Plan Address Space Before Peering" />
      <Para>
        CIDR notation describes a prefix and the number of network bits. Python's standard <code>ipaddress</code> library can help check planned ranges before they become cloud resources. The following program reports whether proposed subnets fit inside a VPC and whether any overlap. Run it locally with Python; it makes no network calls.
      </Para>
      <CodeBlock>{`from ipaddress import ip_network

vpc = ip_network("10.20.0.0/16")
subnets = [
    ip_network("10.20.0.0/24"),
    ip_network("10.20.1.0/24"),
    ip_network("10.20.10.0/24"),
]

for index, subnet in enumerate(subnets):
    if not subnet.subnet_of(vpc):
        raise ValueError(f"{subnet} is outside {vpc}")
    for other in subnets[:index]:
        if subnet.overlaps(other):
            raise ValueError(f"{subnet} overlaps {other}")

print("All subnets fit and are non-overlapping")`}</CodeBlock>
      <Para>
        This is a small guardrail, not a complete IPAM system. A production source of truth should also reserve ranges, track ownership, include existing VPCs and connected networks, and prevent two teams from independently allocating the same block. Review both IPv4 and IPv6 plans when dual-stack connectivity is required.
      </Para>
      <Err>
        Choosing a convenient <code>10.0.0.0/16</code> everywhere creates an overlap trap. Check corporate VPN ranges, acquired-company networks, partner networks, and other cloud accounts before locking in a CIDR.
      </Err>
      <Divider />

      <Chapter n={4} title="Security Groups: Stateful Workload Rules" />
      <Para>
        A <Accent>security group</Accent> is a virtual network policy attached to a workload or network interface in many cloud platforms. It commonly acts as a stateful filter: when an allowed connection is established, return traffic for that flow is allowed automatically. Rules usually describe protocol, port range, and source or destination. Some platforms express separate ingress and egress rules; check the provider's defaults rather than assuming either direction is unrestricted or denied.
      </Para>
      <CodeBlock>{`Application tier security-group intent

Ingress:
  TCP 443 from the public load-balancer security group
  TCP 8080 from the internal API security group

Egress:
  TCP 5432 to the database security group
  TCP 443 to approved update and service endpoints

Database tier security-group intent

Ingress:
  TCP 5432 from the application security group only
  No public ingress rule`}</CodeBlock>
      <Para>
        Referencing another security group (or an equivalent workload identity) expresses a relationship more robustly than allowing a broad IP range. It also narrows access to members that carry that identity, but it does not replace application authentication. Keep the port and direction specific, and remove temporary rules after their approved window.
      </Para>
      <Warn>
        A security group rule allowing a management port from the whole internet is not a safe shortcut. Prefer a managed access path, a tightly scoped administrative network, short-lived credentials, and audited access. Avoid embedding passwords or private keys in startup scripts.
      </Warn>
      <Divider />

      <Chapter n={5} title="Network ACLs and Layered Filtering" />
      <Para>
        Some clouds also offer subnet-level network access control lists (NACLs). A common distinction is that security groups are stateful and attached to workloads, while NACLs are stateless and applied at subnet boundaries. A stateless policy must allow both request and return traffic explicitly, including appropriate ephemeral port ranges. Exact evaluation order, defaults, and feature names vary by provider.
      </Para>
      <Para>
        Use subnet ACLs when a coarse subnet boundary policy is useful, not as a substitute for precise workload rules. Two layers of filters can make troubleshooting harder: a flow may be rejected by a security group, an ACL, a route, a host firewall, or the application. Document each layer's intended role and test both directions.
      </Para>
      <CodeBlock>{`Flow checklist: app -> database

1. Does the app have a route to the database address?
2. Does the database subnet have a return route?
3. Does the app security policy permit the database port?
4. Does the database policy allow this app identity as source?
5. Do subnet ACLs permit request AND return packets?
6. Does the host firewall and database listener accept the flow?
7. Can logs and flow records confirm the result?`}</CodeBlock>
      <Divider />

      <Chapter n={6} title="Private Connectivity and VPC Peering" />
      <Para>
        <Accent>VPC peering</Accent> creates private connectivity between two virtual networks, typically by adding a connection and corresponding routes on both sides. A peering link is generally non-transitive: if VPC A peers with B and B peers with C, that alone does not make A able to reach C through B. Each cloud provider has specific limits, routing rules, and support for cross-account or cross-region links.
      </Para>
      <Para>
        Peering is relatively direct for a small number of networks but can become a mesh as the network count grows. A transit gateway, hub-and-spoke router, VPN, private service endpoint, or service mesh may be a better fit depending on the traffic and trust model. These options are not interchangeable: a private endpoint may expose a particular service without granting broad network reachability.
      </Para>
      <CodeBlock>{`App VPC: 10.20.0.0/16          Data VPC: 10.30.0.0/16
       │                                      │
route 10.30.0.0/16 -> peer      route 10.20.0.0/16 -> peer
       └──────────── peering connection ─────┘

A route on only one side is not enough.
A -> B -> C does not imply a transitive A -> C route.`}</CodeBlock>
      <Para>
        Before enabling peering, check for overlapping address ranges, confirm route tables on each side, scope security rules to the intended peer, and decide who owns monitoring and incident response. Review whether DNS names resolve to private addresses across the connection and whether the provider requires explicit DNS options.
      </Para>
      <Divider />

      <Chapter n={7} title="A Safe Design and Troubleshooting Workflow" />
      <Para>
        Start with the flows, not a list of cloud products. For each flow, record source workload, destination, protocol and port, business purpose, direction, expected volume, and owner. Then draw the VPC boundaries, subnet ranges, route tables, gateways, and filters. This makes a required rule explainable and gives reviewers a way to identify unnecessary reachability.
      </Para>
      <ol style={{ color: 'var(--text)', lineHeight: 1.9, paddingLeft: 22 }}>
        <li>Allocate non-overlapping address ranges and reserve growth capacity.</li>
        <li>Separate public entry points from application and data tiers.</li>
        <li>Write explicit routes and least-privilege ingress and egress policy.</li>
        <li>Review connectivity with security and application owners before deployment.</li>
        <li>Apply changes through versioned infrastructure code and review the plan.</li>
        <li>Test allowed and denied flows, then retain flow logs and configuration history.</li>
      </ol>
      <Para>
        For a failed connection, test from the actual source workload, confirm DNS and destination address, inspect both route tables, evaluate all filters, and check the destination listener. Cloud flow logs can show accepted or rejected traffic, but logging may be delayed or sampled depending on the service. They do not prove that the application completed a request.
      </Para>
      <Divider />

      <Chapter n={8} title="Mistakes to Avoid and Practice" />
      <ul style={{ color: 'var(--text)', lineHeight: 1.9, paddingLeft: 22 }}>
        <li><strong>Calling a subnet public because of its name:</strong> inspect its routes, addresses, and filters.</li>
        <li><strong>Opening database ports broadly:</strong> use workload identity or the narrowest stable source range.</li>
        <li><strong>Assuming peering is transitive:</strong> design the actual routes or choose a hub architecture.</li>
        <li><strong>Forgetting return paths:</strong> routing and stateless ACLs must support both directions.</li>
        <li><strong>Treating NAT as a firewall:</strong> use explicit policy to control allowed traffic.</li>
      </ul>
      <H2>Practice</H2>
      <ol style={{ color: 'var(--text)', lineHeight: 1.9, paddingLeft: 22 }}>
        <li>Plan two VPC CIDRs for a new service and a future partner connection. Check that they do not overlap.</li>
        <li>Draw a public load balancer, private application tier, and private database across two zones. Label each route.</li>
        <li>Write the minimum security-group intent for browser-to-load-balancer, load-balancer-to-app, and app-to-database flows.</li>
        <li>A peered application cannot connect to a database. List the route and policy checks you would make on both sides.</li>
        <li>Explain the stateful security-group versus stateless subnet-ACL distinction to a teammate.</li>
      </ol>
      <Divider />
      <KeyTakeaways items={[
        'A VPC is an isolated virtual network boundary; subnets and route tables define address placement and paths.',
        'A subnet is not public merely because of its name. Public reachability requires routes, addressing, and permitted flows.',
        'Security groups commonly provide stateful workload filtering; subnet ACLs are often stateless and require return-path rules.',
        'Use non-overlapping CIDRs and plan for VPN, peering, and future connectivity before allocating address space.',
        'VPC peering usually requires routes on both sides and is not automatically transitive.',
        'Trace a failed connection through routes, filters, host policy, and the listening application rather than changing rules blindly.',
      ]} />
    </LearnLayout>
  )
}
