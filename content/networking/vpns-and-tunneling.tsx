import { LearnLayout } from '@/components/content/LearnLayout'
import { KeyTakeaways } from '@/components/content/KeyTakeaways'

const Chapter = ({ n, title }: { n: number; title: string }) => <div style={{ marginBottom: '0.25rem' }}><span style={{ fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#6366f1' }}>Chapter {n}</span><h2 style={{ fontSize: '1.6rem', fontWeight: 800, color: '#1e293b', margin: '0.25rem 0 0.75rem' }}>{title}</h2></div>
const Divider = () => <hr style={{ border: 'none', borderTop: '2px solid #e2e8f0', margin: '2.5rem 0' }} />
const Para = ({ children }: { children: React.ReactNode }) => <p style={{ lineHeight: 1.85, color: '#334155', marginBottom: '1rem', fontSize: '1.02rem' }}>{children}</p>
const CodeBlock = ({ children }: { children: React.ReactNode }) => <pre style={{ background: '#0f172a', color: '#e2e8f0', borderRadius: '10px', padding: '1.25rem 1.5rem', fontSize: '0.85rem', fontFamily: 'monospace', overflowX: 'auto', lineHeight: 1.7, margin: '1rem 0' }}><code>{children}</code></pre>
const Callout = ({ children }: { children: React.ReactNode }) => <div style={{ background: '#f0f9ff', border: '2px solid #0ea5e9', borderRadius: '12px', padding: '1.1rem 1.3rem', margin: '1.25rem 0', lineHeight: 1.8, color: '#0c4a6e' }}>{children}</div>
const Warn = ({ children }: { children: React.ReactNode }) => <div style={{ background: '#fffbeb', border: '2px solid #f59e0b', borderRadius: '12px', padding: '1.1rem 1.3rem', margin: '1.25rem 0', lineHeight: 1.8, color: '#78350f' }}>{children}</div>

export default function VpnsAndTunneling() {
  return <LearnLayout title="VPNs and Tunneling — IPSec, SSL, WireGuard" description="How VPNs protect traffic with encryption, authentication, and tunnel encapsulation." section="Networking Fundamentals — Lesson 36" readTime="20–28 min">
    <Chapter n={1} title="A Private Path Through a Public Network" />
    <Para>When a developer in Hyderabad opens an internal dashboard from home, the packets cross an untrusted ISP network. A virtual private network (VPN) creates a protected logical path across that shared infrastructure. The VPN does not make the internet private; it authenticates peers, encrypts selected traffic, and wraps the original packet in an outer packet that can cross the public network.</Para>
    <Para>Keep three goals distinct: <strong>confidentiality</strong> hides payloads from observers, <strong>integrity</strong> detects modification, and <strong>authentication</strong> verifies the peer. Encryption without correct peer verification can securely deliver data to the wrong endpoint. A VPN also does not automatically make a device safe from malware or prevent an authorised user from accessing data.</Para>
    <Callout><strong>Prerequisites:</strong> IP addressing, routing, TCP/UDP, and the difference between a packet's source and destination. Imagine an envelope inside another envelope: the inner address is the protected destination; the outer address routes the tunnel between VPN peers.</Callout>
    <Divider />
    <Chapter n={2} title="Tunnels, Modes, and Protocol Families" />
    <Para><strong>Tunneling</strong> encapsulates one network-layer packet inside another. In IPsec transport mode, the original IP header remains for host-to-host communication while the payload is protected. In tunnel mode, an entire original IP packet is protected and receives a new outer IP header; this is common for gateway-to-gateway VPNs. The outer header is routable on the underlay; the inner packet follows the private overlay's routes.</Para>
    <Para>IPsec combines the Encapsulating Security Payload (ESP) data plane with Internet Key Exchange (IKE) negotiation. IKE authenticates peers and agrees on algorithms and keys; ESP protects packets. TLS-based remote-access VPNs use a TLS connection and often integrate with browser or endpoint identity. WireGuard is a compact, key-based Layer 3 tunnel protocol. Product names differ, but the useful questions stay the same: who is the peer, what traffic is included, how are keys rotated, and where does routing send packets?</Para>
    <CodeBlock>{`# Inspect the route selected for an internal destination (Linux)
ip route get 10.20.4.15

# Inspect a tunnel interface and its addresses
ip -brief address
ip route show

# Show WireGuard peer/interface status; do not share private keys
sudo wg show`}</CodeBlock>
    <Callout>These commands inspect a system you administer. A route through a tunnel proves only that the local routing table selected that interface; it does not prove that the far end is healthy or that application traffic is authorised.</Callout>
    <Divider />
    <Chapter n={3} title="Follow One Packet Through the VPN" />
    <Para>Suppose a company laptop at <code>10.8.0.24</code> accesses an internal service at <code>10.20.4.15</code>. The operating system first chooses the most specific matching route. It gives the inner packet to the VPN interface. The tunnel encrypts and authenticates it, then sends an outer packet from the laptop's current network address to the VPN gateway's public address. The gateway verifies and decrypts it, applies its access policy, and routes the inner packet to the service. Return traffic follows an allowed route back through the tunnel.</Para>
    <Para>Encryption protects content between tunnel endpoints, not necessarily every hop after the gateway. If a gateway decrypts traffic before forwarding it into a data centre, controls inside that network still matter. DNS requests may also follow a different path than application traffic, which can create privacy leaks or failures if policy and routing disagree.</Para>
    <CodeBlock>{`# Example routing decision output (illustrative)
10.20.4.15 dev wg0 src 10.8.0.24

# A public destination may still use the ordinary default route
203.0.113.20 via 192.168.1.1 dev wlan0 src 192.168.1.40`}</CodeBlock>
    <Divider />
    <Chapter n={4} title="Full Tunnel, Split Tunnel, and DNS" />
    <Para>A <strong>full tunnel</strong> directs all eligible device traffic through the VPN. It simplifies central egress inspection, but increases gateway bandwidth needs and can add latency. A <strong>split tunnel</strong> sends only selected corporate prefixes through the VPN and uses the local network for other destinations. Split tunneling can improve performance, but the endpoint is simultaneously attached to two trust domains; policy must prevent unintended forwarding between them.</Para>
    <Para>DNS is part of the routing design. If internal names are resolved by corporate DNS but the query travels outside the tunnel, the lookup may fail or reveal internal names. Define which resolver handles each namespace, confirm routes to it, and test both internal and public lookups. Also consider IPv6: a VPN that captures IPv4 only may leave IPv6 traffic on the local network.</Para>
    <CodeBlock>{`# Checklist for a client route and DNS review
ip route get 10.20.4.15
ip route get 1.1.1.1
resolvectl status

# Verify an internal name against the intended resolver
getent hosts app.internal.example`}</CodeBlock>
    <Divider />
    <Chapter n={5} title="Operational Design and Failure Modes" />
    <Para>Use managed identity or device certificates where possible; protect private keys in the operating system's credential store; revoke access promptly when a device is lost or a person leaves. Keep tunnel software and gateways patched, limit routes to business need, and require multi-factor authentication for interactive access. Prefer current, maintained cryptographic configurations rather than copying old cipher lists from a blog.</Para>
    <Para>Plan for failure: redundant gateways, a tested revocation path, capacity headroom, configuration backups, and clear alerts for tunnel establishment, packet loss, and certificate expiry. A VPN concentrator is a high-value boundary and potential bottleneck. Monitor what it decrypts and forwards, and do not treat tunnel membership as a substitute for application authorisation.</Para>
    <Warn>Do not send real credentials, private keys, or sensitive packet captures in support tickets. Collect only the diagnostics needed, redact identifiers, and use your organisation's approved secure channel.</Warn>
    <Divider />
    <Chapter n={6} title="Mistakes, Practice, and Review" />
    <Para><strong>Common mistakes:</strong> assuming the VPN hides traffic after it leaves the gateway; confusing a tunnel interface with an encrypted session; sending all DNS outside the tunnel; and granting broad network routes when an application-specific access path would suffice. Diagnose by comparing route selection, name resolution, tunnel state, and gateway policy instead of repeatedly reconnecting the client.</Para>
    <Para><strong>Practice:</strong> (1) Draw the outer and inner packet addresses for a remote user opening an internal site. (2) Compare full and split tunnel trade-offs for a video-call-heavy team. (3) On a lab machine you administer, inspect routes before and after connecting a VPN and record which destinations change interface. (4) Write a checklist for lost-device key revocation. (5) Explain why a working tunnel does not guarantee application access.</Para>
    <KeyTakeaways items={['A VPN combines peer authentication, integrity, encryption, and routing policy; none of those guarantees are interchangeable.','Tunneling adds an outer packet around an inner packet; IPsec transport and tunnel modes protect different portions of the original packet.','Full tunnel centralises egress but costs capacity and latency; split tunnel requires careful route, DNS, and endpoint controls.','The VPN gateway is a security boundary: traffic may be decrypted there and must still be protected downstream.','Inspect route choice, DNS, and tunnel state independently when troubleshooting.','Use managed identities/keys, least-privilege routes, patching, revocation, and monitoring in production.']} />
    <p style={{ marginTop: '2rem' }}><a href="/learn/networking/wireless-security" style={{ color: '#2563eb', fontWeight: 700 }}>Next: Lesson 37 · Wireless Security →</a></p>
  </LearnLayout>
}
