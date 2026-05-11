import { LearnLayout } from '@/components/content/LearnLayout'
import { KeyTakeaways } from '@/components/content/KeyTakeaways'
import { Callout } from '@/components/content/Callout'
import Link from 'next/link'

const C = '#ff4757'

const s = {
  p: { fontSize: 15, color: 'var(--text)', lineHeight: 1.9, marginBottom: 16 } as React.CSSProperties,
  h: { fontSize: 20, fontWeight: 700, color: 'var(--heading)', marginTop: 36, marginBottom: 12 } as React.CSSProperties,
  hl: { color: C, fontWeight: 600 } as React.CSSProperties,
  block: {
    background: 'var(--code-bg)', border: '1px solid var(--border)',
    borderRadius: 8, padding: '16px 20px', fontFamily: 'monospace',
    fontSize: 13, lineHeight: 1.8, marginBottom: 20, whiteSpace: 'pre-wrap' as const,
    overflowX: 'auto' as const,
  },
  table: { width: '100%', borderCollapse: 'collapse' as const, marginBottom: 24, fontSize: 14 },
  th: { background: 'var(--code-bg)', padding: '10px 14px', textAlign: 'left' as const, fontWeight: 600, borderBottom: '2px solid var(--border)' },
  td: { padding: '10px 14px', borderBottom: '1px solid var(--border)', verticalAlign: 'top' as const },
  divider: { border: 'none', borderTop: '1px solid var(--border)', margin: '40px 0' },
  iqBox: { background: 'var(--code-bg)', borderLeft: `4px solid ${C}`, borderRadius: 6, padding: '16px 20px', marginBottom: 20 },
  errBox: { background: '#1a0a0a', borderLeft: '4px solid #ff4757', borderRadius: 6, padding: '16px 20px', marginBottom: 20 },
}

function Part({ children }: { children: React.ReactNode }) { return <div style={{ marginBottom: 48 }}>{children}</div> }
function H({ children }: { children: React.ReactNode }) { return <h2 style={s.h}>{children}</h2> }
function P({ children }: { children: React.ReactNode }) { return <p style={s.p}>{children}</p> }
function Hl({ children }: { children: React.ReactNode }) { return <span style={s.hl}>{children}</span> }
function HR() { return <hr style={s.divider} /> }
function Block({ children }: { children: React.ReactNode }) { return <pre style={s.block}>{children}</pre> }
function IQ({ q, children }: { q: string; children: React.ReactNode }) {
  return (
    <div style={s.iqBox}>
      <div style={{ fontWeight: 700, color: C, marginBottom: 8 }}>Q: {q}</div>
      <div style={{ fontSize: 14, color: 'var(--text)', lineHeight: 1.8 }}>{children}</div>
    </div>
  )
}
function Err({ title, cause, fix }: { title: string; cause: string; fix: string }) {
  return (
    <div style={s.errBox}>
      <div style={{ color: '#ff4757', fontWeight: 700, marginBottom: 6 }}>✗ {title}</div>
      <div style={{ fontSize: 13, color: '#ccc', marginBottom: 4 }}><strong>Why it happens:</strong> {cause}</div>
      <div style={{ fontSize: 13, color: '#ccc' }}><strong>Fix:</strong> {fix}</div>
    </div>
  )
}
function ProTip({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ background: '#0a1a0a', borderLeft: '4px solid #2ed573', borderRadius: 6, padding: '14px 18px', marginBottom: 20, fontSize: 14, color: '#ccc', lineHeight: 1.8 }}>
      <strong style={{ color: '#2ed573' }}>Pro tip:</strong> {children}
    </div>
  )
}

export default function Module15() {
  return (
    <LearnLayout
      title="Networking Deep Dive — Subnets, Routing, Firewalls, VPNs, Zero Trust"
      description="How packets move, how firewalls make decisions, how VPNs work under the hood, and why zero-trust architecture makes the traditional perimeter obsolete."
      section="Cybersecurity — Module 15"
      readTime="41 min"
      updatedAt="May 2026"
    >
      <Part>
        <P>
          Networking is the substrate of every security problem. Firewalls make decisions based on IP addresses and port numbers. VPNs extend trust across untrusted networks. Network segmentation limits lateral movement after a breach. Zero Trust replaces the network perimeter with identity and device posture checks. You cannot design or operate any of these without understanding how packets actually move.
        </P>
        <P>
          This module builds on Module 02 (how the internet works) and Module 10 (network attacks) to go deeper: <Hl>subnetting and CIDR</Hl>, <Hl>stateful vs stateless firewalls</Hl>, <Hl>NAT and its security implications</Hl>, <Hl>IPSec and WireGuard VPN mechanics</Hl>, <Hl>network segmentation patterns</Hl>, and the <Hl>Zero Trust architecture</Hl> model. By the end you'll be able to read firewall rule sets, design segmentation for a corporate network, and explain why "trust but verify" died as a security model.
        </P>
      </Part>

      <HR />

      <Part>
        <H>IP Addressing and CIDR — The Foundation of Network Security</H>
        <P>
          Every firewall rule, network segment, and routing decision is based on IP addresses. <Hl>CIDR (Classless Inter-Domain Routing)</Hl> notation specifies IP ranges using a prefix length: 192.168.1.0/24 means "the first 24 bits are fixed, the last 8 bits vary" — a range of 256 addresses (192.168.1.0–192.168.1.255).
        </P>
        <Block>{`CIDR quick reference:

Notation  Subnet Mask       Host Count  Example Range
/8        255.0.0.0         16,777,214  10.0.0.0 – 10.255.255.255
/16       255.255.0.0       65,534      172.16.0.0 – 172.16.255.255
/24       255.255.255.0     254         192.168.1.0 – 192.168.1.254
/25       255.255.255.128   126         192.168.1.0 – 192.168.1.127
/26       255.255.255.192   62          192.168.1.0 – 192.168.1.63
/28       255.255.255.240   14          192.168.1.0 – 192.168.1.15
/30       255.255.255.252   2           192.168.1.0 – 192.168.1.3
/32       255.255.255.255   1 (host)    192.168.1.50 – 192.168.1.50

Reserved private ranges (RFC 1918):
  10.0.0.0/8          Class A private (large corporations)
  172.16.0.0/12       Class B private (172.16–172.31)
  192.168.0.0/16      Class C private (home/small office)

Loopback:
  127.0.0.0/8         Never leaves the host (127.0.0.1 = localhost)

Link-local (APIPA):
  169.254.0.0/16      Auto-assigned when DHCP fails

IPv6 private:
  fc00::/7  (ULA — Unique Local Addresses, similar to RFC 1918)
  ::1       Loopback

Security implication: Firewall rules use CIDR to specify allowed/denied ranges.
  10.0.0.0/8  = "all internal traffic" (risky — allows all internal lateral movement)
  10.10.1.0/24 = "only production subnet 1" (better — scoped access)`}</Block>
        <P>
          Network segmentation using CIDR is the primary control against lateral movement. If an attacker compromises a workstation in the 10.10.5.0/24 (user) subnet, firewall rules that block 10.10.5.0/24 from reaching 10.10.1.0/24 (production servers) prevent lateral movement — even if the attacker has admin credentials.
        </P>
      </Part>

      <HR />

      <Part>
        <H>How Routing Decisions Are Made</H>
        <P>
          When a host sends a packet, it decides whether the destination is local (same subnet) or remote (requires a router). This decision is made using the subnet mask. If the destination IP ANDed with the subnet mask equals the local network address, it's local — send directly via ARP. Otherwise, send to the default gateway.
        </P>
        <Block>{`Routing decision example:

Host: 192.168.1.50, Subnet: /24 (mask 255.255.255.0)
Network: 192.168.1.0

Sending to 192.168.1.100 (local):
  192.168.1.100 AND 255.255.255.0 = 192.168.1.0  ← matches local network
  → ARP for 192.168.1.100, send directly

Sending to 8.8.8.8 (remote):
  8.8.8.8 AND 255.255.255.0 = 8.8.8.0  ← does NOT match 192.168.1.0
  → Send to default gateway (192.168.1.1)
  → Router looks up 8.8.8.8 in routing table → forwards to ISP

Router routing table (ip route on Linux):
  Destination     Gateway        Interface
  0.0.0.0/0       203.0.113.1    eth0      ← default route (everything else)
  10.10.0.0/16    10.10.0.1      eth1      ← internal network
  192.168.1.0/24  directly       eth2      ← local subnet

Longest prefix match:
  When multiple routes match, the most specific (longest) prefix wins.
  Packet to 10.10.5.50:
    0.0.0.0/0  matches (default)
    10.10.0.0/16 matches ← wins (more specific)

  This is why /32 host routes override /24 subnet routes —
  and why BGP hijackers announce more-specific prefixes.`}</Block>
      </Part>

      <HR />

      <Part>
        <H>Firewalls — Stateless vs Stateful vs NGFW</H>
        <P>
          A firewall enforces rules on network traffic. The evolution from stateless to stateful to next-generation firewalls corresponds to increasing context — and increasing ability to block sophisticated attacks.
        </P>
        <table style={s.table}>
          <thead>
            <tr>
              <th style={s.th}>Type</th>
              <th style={s.th}>What It Inspects</th>
              <th style={s.th}>State Tracking</th>
              <th style={s.th}>Limitation</th>
            </tr>
          </thead>
          <tbody>
            {[
              ['Stateless (ACL)', 'IP src/dst, port, protocol per packet', 'None', 'Must explicitly allow return traffic; can\'t track connections'],
              ['Stateful', 'Connection state (SYN, ESTABLISHED, FIN)', 'Yes — tracks connection table', 'Can\'t inspect payload content — just headers'],
              ['Application layer (ALG)', 'Protocol compliance (HTTP, FTP, SIP)', 'Yes + application state', 'Resource-intensive; signature-dependent'],
              ['NGFW (Next-Gen)', 'Deep packet inspection, application identity, user identity, TLS inspection', 'Yes + application + user', 'Requires TLS break-and-inspect; expensive'],
            ].map(([t, w, st, l]) => (
              <tr key={t}>
                <td style={{ ...s.td, color: C, fontWeight: 600 }}>{t}</td>
                <td style={s.td}>{w}</td>
                <td style={s.td}>{st}</td>
                <td style={s.td}>{l}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <Block>{`Stateful firewall — connection tracking:

Problem with stateless firewalls:
  Allow outbound TCP/80 (HTTP requests):
    Rule: PERMIT src=internal dst=any port=80 tcp

  Need to allow return traffic:
    Rule: PERMIT src=any dst=internal dport=1024-65535 tcp
    ← This also allows ANY external host to connect to any high port
      on any internal host — a massive hole

Stateful solution:
  Firewall maintains a connection table:
    (src_ip, src_port, dst_ip, dst_port, protocol, state)

  When internal host sends TCP SYN to 93.184.216.34:80:
    Table entry: (10.0.1.50, 54321, 93.184.216.34, 80, TCP, SYN_SENT)

  When 93.184.216.34 sends SYN-ACK back:
    Firewall checks table: is there an entry matching this return flow?
    Yes → PERMIT (it's a response to an established connection)

  Unsolicited inbound from 1.2.3.4:80 → 10.0.1.50:54321?
    No matching table entry → DROP
    Even though 54321 is in the 1024-65535 range

NGFW — TLS inspection (break-and-inspect):
  Problem: Most traffic is HTTPS — firewall can't see the payload

  Solution: NGFW acts as a TLS proxy
  1. Client connects to NGFW (TLS handshake with NGFW's certificate)
  2. NGFW connects to real server (separate TLS session)
  3. NGFW sees plaintext — can scan for malware, data loss, policy violations
  4. Re-encrypts to client

  Security implication: NGFW's CA cert must be trusted by all clients
  This is why corporate-managed devices have extra CA certs in their trust store
  (installed via MDM/Group Policy)`}</Block>
        <Block>{`Reading firewall rules (iptables example):

# Show all rules with line numbers
iptables -L -n -v --line-numbers

Chain INPUT (policy DROP)     ← Default: deny all inbound
num  pkts bytes target   prot  src            dst       dport
1    1.2M  960M ACCEPT   all   anywhere       anywhere  state RELATED,ESTABLISHED
2    847  62178 ACCEPT   tcp   anywhere       anywhere  tcp dport:22    ← SSH
3    12K  1.3M  ACCEPT   tcp   10.0.0.0/8     anywhere  tcp dport:8080  ← App (internal only)
4      0      0 LOG      all   anywhere       anywhere  LOG prefix="DROP "
5      0      0 DROP     all   anywhere       anywhere  ← Everything else dropped

Chain FORWARD (policy DROP)   ← Block forwarding by default
Chain OUTPUT (policy ACCEPT)  ← Allow all outbound

Key concepts:
  - Rules processed top-to-bottom; first match wins
  - state RELATED,ESTABLISHED: stateful — allows return traffic
  - policy DROP: implicit deny (implicit allow would be "policy ACCEPT")
  - LOG before DROP: capture drops for analysis without allowing traffic

Security hardening:
  - Default policy: DROP (deny-all, allow-what-you-need)
  - Never: ACCEPT all + block bad (allow-all, deny-what-you-know — fails against unknowns)
  - Log drops: essential for detecting scan attempts and blocked attacks`}</Block>
      </Part>

      <HR />

      <Part>
        <H>NAT — Network Address Translation and Its Security Implications</H>
        <P>
          <Hl>NAT</Hl> allows many devices with private IP addresses to share a single public IP address. A home router or corporate gateway performs NAT by rewriting source IP addresses in outbound packets and tracking the mapping to route return traffic correctly.
        </P>
        <Block>{`NAT mechanics:

Internal network: 10.0.0.0/24
Public IP: 203.0.113.1 (the router/gateway)

Outbound packet:
  Internal host:  10.0.0.50:54321 → 93.184.216.34:443

  Router rewrites source:
  After NAT:      203.0.113.1:41234 → 93.184.216.34:443

  Router NAT table:
  (10.0.0.50, 54321, 93.184.216.34, 443) ↔ (203.0.113.1, 41234)

Return packet:
  93.184.216.34:443 → 203.0.113.1:41234

  Router reverses translation:
  After un-NAT:   93.184.216.34:443 → 10.0.0.50:54321
  ← Delivered to correct internal host

Security properties of NAT:
  ✓ Internal IPs are hidden from external observers
  ✓ Unsolicited inbound connections are blocked (no NAT entry exists)
  ✓ Obscures internal network structure from attackers

Security limitations of NAT:
  ✗ NAT is NOT a firewall — it's address translation, not access control
    (though the translation table provides stateful-like inbound blocking)
  ✗ Internal hosts can still make outbound connections to malicious sites
  ✗ Malware on internal hosts tunnels C2 through allowed outbound ports
  ✗ IPv6 does not use NAT — all IPv6 hosts get public addresses (new exposure)

Port forwarding (DNAT — Destination NAT):
  Rule: traffic to 203.0.113.1:22 → forward to 10.0.0.100:22
  Exposes internal service to internet
  Common misconfiguration: accidentally exposing RDP (3389), SSH (22),
  admin panels (8080), databases (3306) to internet`}</Block>
      </Part>

      <HR />

      <Part>
        <H>VPNs — IPSec and WireGuard Under the Hood</H>
        <P>
          A <Hl>Virtual Private Network (VPN)</Hl> creates an encrypted tunnel through an untrusted network (the internet), making remote clients appear to be on the corporate network. Understanding the protocols helps you distinguish between VPNs that are secure by design and those that rely on outdated or weak cryptography.
        </P>
        <Block>{`IPSec VPN (traditional enterprise standard):

Two modes:
  Transport mode: Encrypts only payload, IP headers unchanged
                  Used for host-to-host encryption

  Tunnel mode:   Encrypts the entire original IP packet + new IP header added
                 Used for site-to-site and remote access VPNs

Two protocols:
  AH (Authentication Header): Integrity + authentication, NO encryption
  ESP (Encapsulating Security Payload): Integrity + authentication + encryption
  ← ESP is used almost exclusively in practice

IKE (Internet Key Exchange) — the negotiation protocol:
  Phase 1 (IKE SA): Establish secure channel to negotiate Phase 2
    Algorithms: AES-256-GCM, SHA-256, DH Group 14+ (2048-bit)
    Result: Encrypted channel between peers

  Phase 2 (Child SA): Negotiate encryption for actual data
    Result: IPSec SA with keys for encrypting traffic

Weaknesses in legacy IPSec deployments:
  - IKEv1 with aggressive mode: leaks identity information, crackable offline
  - DH Group 2 (1024-bit): breakable by nation-states (Logjam attack)
  - MD5 or SHA-1 for HMAC: deprecated

Modern: IKEv2 + AES-256-GCM + SHA-256 + DH Group 20 (ECDH P-384) = secure`}</Block>
        <Block>{`WireGuard — modern VPN protocol:

Design philosophy: Simple, fast, auditable
Lines of code: ~4,000 (vs OpenVPN ~70,000, IPSec ~400,000)
Smaller codebase = smaller attack surface

Cryptography (hardcoded — no negotiation, no weak options):
  Key exchange:   Curve25519 (ECDH)
  Encryption:     ChaCha20-Poly1305 (AEAD)
  Hashing:        BLAKE2s
  Handshake:      Noise protocol framework

Configuration (server side):
  [Interface]
  PrivateKey = <base64-encoded server private key>
  Address = 10.0.0.1/24           # VPN tunnel address
  ListenPort = 51820               # UDP port

  [Peer]
  PublicKey = <client public key>
  AllowedIPs = 10.0.0.2/32        # What IPs this client can send

Configuration (client side):
  [Interface]
  PrivateKey = <client private key>
  Address = 10.0.0.2/24
  DNS = 10.0.0.1

  [Peer]
  PublicKey = <server public key>
  Endpoint = vpn.company.com:51820
  AllowedIPs = 0.0.0.0/0          # Route all traffic through VPN
  PersistentKeepalive = 25        # Keep NAT open

Security advantages over traditional VPNs:
  - No algorithm negotiation → no downgrade attacks
  - Cryptographically modern algorithms (ChaCha20, Curve25519)
  - Roaming: Reconnects instantly when IP changes (mobile-friendly)
  - No UDP/TCP handshake visible to passive observer until authenticated`}</Block>
      </Part>

      <HR />

      <Part>
        <H>Network Segmentation — Designing Defense in Depth</H>
        <P>
          Network segmentation divides a network into isolated zones, limiting how far an attacker can move after gaining a foothold. The principle: <Hl>breach containment</Hl>. Even if the attacker compromises one zone, firewall rules prevent them from reaching higher-value zones without additional exploitation.
        </P>
        <Block>{`Segmentation model — tiered security zones:

Internet
    |
    | [DMZ Firewall — allow 443/80 inbound from internet to DMZ]
    |
  DMZ (10.10.0.0/24)
    Web servers, load balancers, public APIs
    Rules: Allow 443/80 from internet; Allow 8080 to App tier; DENY everything else
    |
    | [Internal Firewall — allow only specific app traffic]
    |
  App Tier (10.10.1.0/24)
    Application servers, microservices
    Rules: Allow from DMZ on app ports; Allow DB port to Data tier; DENY rest
    |
    | [DB Firewall — very restrictive]
    |
  Data Tier (10.10.2.0/24)
    Databases, file servers, secrets managers
    Rules: Allow 5432/3306 from App tier only; DENY all else
    |
    | [Management VLAN — separate, highly restricted]
    |
  Management (10.10.99.0/24)
    Jump hosts, monitoring, backup systems
    Rules: Allow SSH/RDP from bastion only; Allow monitoring ports from monitoring only

User/Workstation VLAN (10.10.5.0/24)
    No access to Data tier
    No access to Management VLAN
    Access to App tier limited to needed ports only
    Internet access via proxy only

Firewall rule audit questions:
  - Does the rule apply the principle of least privilege?
  - Is the source as specific as possible (/32 preferred over /24 over 0.0.0.0/0)?
  - Is there a documented business justification for this rule?
  - When was this rule last reviewed? (Shadow rules: rules no longer in use)
  - Does any rule allow 0.0.0.0/0 as source to internal resources?
    ← Most dangerous finding in a firewall audit`}</Block>
        <ProTip>
          The most common firewall audit finding is rules with source 0.0.0.0/0 (any) to internal services — often added years ago for "temporary" access that was never removed. Run a quarterly review of firewall rules and require documented justification for any rule with any/any or /8 source ranges.
        </ProTip>
      </Part>

      <HR />

      <Part>
        <H>Zero Trust Architecture — The End of the Network Perimeter</H>
        <P>
          Traditional network security assumed the network perimeter was trustworthy. Employees inside the corporate network were trusted; outsiders were not. <Hl>Zero Trust</Hl> rejects this model entirely. The principle: <Hl>"Never trust, always verify."</Hl> Every access request — regardless of network location — must be authenticated, authorised, and verified against device health before access is granted.
        </P>
        <P>
          The death of the traditional perimeter was not a design choice — it was forced by reality. Cloud services moved workloads outside the corporate network. Remote work moved users outside the corporate network. Mobile devices accessed corporate resources from anywhere. VPNs that grant broad network access became the attack vector (MOVEit, Citrix, Pulse Secure breaches all exploited VPN infrastructure). The perimeter collapsed.
        </P>
        <Block>{`Zero Trust principles (NIST SP 800-207):

1. All data sources and computing services are resources
   Nothing is trusted by virtue of being "on the network"

2. All communication is secured regardless of network location
   TLS for everything; mTLS for service-to-service

3. Access to individual resources is granted per-session
   Not "this user has VPN access, so they can reach everything"
   But "this user, on this device, with this posture, can access this service"

4. Access is determined by dynamic policy including:
   - User identity (who)
   - Device health (is it managed? up to date? no malware?)
   - Requested resource sensitivity
   - Environmental context (location, time, behaviour)

5. All resource authentication and authorisation is dynamic and strictly enforced

6. Collect security telemetry, use it to improve posture

Zero Trust components:
  Identity Provider (IdP): Okta, Azure AD, Google Workspace
    Authenticates users with MFA (preferably FIDO2)
    Issues short-lived access tokens (JWT, SAML assertions)

  Device Trust: MDM (Intune, Jamf) + EDR (CrowdStrike, Defender)
    Checks: Is the device managed? Is it encrypted? Is the OS patched?
    Is there malware detected? Is the EDR running?
    Device certificate issued only to compliant devices

  Policy Engine: Conditional Access (Azure), BeyondCorp, Zscaler
    Decision: Should this user on this device get this resource?
    Input: identity + device posture + resource sensitivity + context
    Output: allow / deny / step-up MFA / limited access

  Network: Micro-segmentation
    Application-layer policies replace IP-based network ACLs
    Each service only accepts connections from authenticated, authorised principals`}</Block>
        <Block>{`Zero Trust vs VPN comparison:

Traditional VPN:
  User connects to VPN → receives corporate IP → has network-level access
  Problems:
  - VPN credentials stolen → attacker has full network access
  - VPN software has vulnerabilities (Pulse Secure, Citrix → mass exploitation)
  - Inside the VPN = trusted (but attacker is already inside)
  - Encrypted tunnel hides malware C2 from network monitoring

Zero Trust (ZTNA — Zero Trust Network Access):
  User authenticates to IdP (MFA) → Policy engine checks device posture
  → If compliant: get token for specific application only
  → Application proxy validates token before proxying request to backend

  Benefits:
  - No broad network access even after authentication
  - Device health check blocks BYOD or compromised managed devices
  - Attacker with stolen credentials: blocked by device posture check
  - Each application independently authenticated
  - Full visibility into who accessed what, when, from where

  Products: Cloudflare Access, Zscaler ZPA, BeyondCorp (Google),
            Tailscale (WireGuard-based, simpler), Palo Alto Prisma Access

Implementation sequence:
  1. Enforce MFA for all users (baseline)
  2. Deploy device management (MDM) + EDR
  3. Enable Conditional Access policies (require compliant device)
  4. Migrate internet-facing apps from VPN to ZTNA proxy
  5. Apply micro-segmentation to internal east-west traffic
  6. Enforce mTLS for service-to-service communication`}</Block>
      </Part>

      <HR />

      <Part>
        <H>Network Security Monitoring — What to Watch</H>
        <P>
          Network visibility is the foundation of detection. You can't detect lateral movement, C2 communication, or data exfiltration if you can't see the network traffic. The modern network security stack captures traffic at strategic points.
        </P>
        <Block>{`Network monitoring architecture:

Network TAP (Test Access Point):
  Physical/virtual device that copies all traffic on a link
  Passive — doesn't affect traffic, can't be discovered by attackers
  Sends copy to IDS/NSM (Network Security Monitoring) system

SPAN port (Switched Port Analyzer):
  Switch feature: copies specified traffic to a monitor port
  Less reliable than TAP (may drop packets under load)
  Configured on managed switches, simpler to deploy

NetFlow/IPFIX:
  Flow records: who talked to whom, when, how much data
  Does NOT capture packet contents — just metadata
  Much lower storage cost than full packet capture
  Use case: detect beaconing (regular intervals), data exfiltration (high volume)
  Collected by: Cisco Stealthwatch, Zeek, ntopng, Plixer Scrutinizer

Full packet capture:
  Store entire packet (header + payload)
  Highest cost — 10Gbps link generates ~108TB/day
  Typically retained for 24-72 hours (hot), indexed by flow ID
  Use case: deep dive into specific incidents

IDS/IPS placement:
  North-South: Internet ↔ DMZ boundary (detect inbound attacks)
  East-West: Between internal segments (detect lateral movement)
  Key signals to alert on:
    - Connections to known C2 IPs/domains (threat intelligence)
    - DNS queries with high entropy (tunneling)
    - Unusual protocol on standard port (HTTP on port 443)
    - Large outbound transfers to unknown destinations
    - Internal host connecting to TOR exit nodes`}</Block>
      </Part>

      <HR />

      <Part>
        <H>Interview Questions</H>

        <IQ q="Explain the difference between a stateful and stateless firewall. Which one should you use and why?">
          A stateless firewall (packet filter) makes a decision on each packet independently based only on information in that packet's headers: source IP, destination IP, source port, destination port, and protocol. It has no memory of previous packets — it can't tell if a packet is part of an established connection or an unsolicited inbound probe. To allow return traffic for outbound connections, you must explicitly permit a range of source ports (typically 1024-65535), which also allows any external host to initiate connections to those ports on internal machines — a significant security hole.
          <br /><br />
          A stateful firewall tracks connection state in a table. When an internal host initiates a TCP connection (SYN), the firewall records it. When the return SYN-ACK arrives, the firewall checks the table — if it's a response to an established connection, it allows it. Unsolicited inbound packets with no matching table entry are dropped, even if they arrive on an "allowed" port. This eliminates the need to allow all high ports inbound.
          <br /><br />
          In practice, always use stateful firewalls (or NGFWs) for internet-facing boundaries. Stateless ACLs are appropriate for high-throughput internal routing where performance is critical and the traffic is already inside a trusted zone. The default firewall in any cloud provider (AWS Security Groups, Azure NSGs) is stateful — you only write rules for outbound or inbound, not both directions.
        </IQ>

        <IQ q="What is Zero Trust and how does it differ from a traditional VPN-based approach?">
          Traditional network security uses a castle-and-moat model: the VPN is the drawbridge, and once inside (connected to VPN), you're trusted. The VPN grants access to the corporate network — from which you can reach many or all internal resources. If an attacker steals VPN credentials or exploits the VPN appliance itself, they have broad network access. This model also doesn't account for the fact that sensitive data and applications have moved to cloud services that aren't inside the corporate perimeter anyway.
          <br /><br />
          Zero Trust replaces network location as a trust signal with identity, device health, and dynamic policy. Instead of "you're on the VPN, so you're trusted," the model is "you authenticated with MFA on a managed, compliant device, and you're requesting access to this specific application, so you may access it — and only it." Access is granted per-session per-resource, not as broad network access. A Zero Trust Network Access (ZTNA) solution like Cloudflare Access or Zscaler ZPA proxies each application independently — users never get a network route to the application's IP, only authenticated HTTP sessions.
          <br /><br />
          The practical difference in a breach scenario: with VPN, compromised credentials give the attacker network access to everything on the VPN subnet. With ZTNA, compromised credentials hit a device posture check — if the attacker's device isn't enrolled in MDM and doesn't have the correct device certificate, access is denied. Even if they pass, they only get access to the specific applications the user is authorised for, not broad network access.
        </IQ>

        <IQ q="A developer says 'NAT protects us, we don't need a firewall.' What's wrong with this?">
          NAT provides a coincidental blocking effect for unsolicited inbound connections — because the NAT translation table has no entry for an inbound packet that doesn't correspond to an established outbound connection, the router drops it. But NAT is not access control — it has no rules engine, no logging, no policy, and no understanding of application protocols.
          <br /><br />
          The gaps: First, NAT does nothing about outbound connections. Malware on an internal host freely connects outbound to C2 servers on port 443 — NAT translates the address and forwards the packet. A firewall with outbound rules, URL filtering, and DNS-based controls blocks this. Second, NAT provides no visibility — it doesn't log connections in a format that security teams can query. A firewall logs every allowed and denied connection with timestamps, source/destination, and protocol. Third, port forwarding creates holes in NAT: any port-forwarding rule or UPnP-enabled device punches a direct hole through NAT to an internal host. Fourth, IPv6 doesn't use NAT at all — all IPv6 hosts have globally routable addresses, and without a stateful IPv6 firewall, they're directly exposed.
          <br /><br />
          NAT is a side effect of IPv4 address exhaustion, not a security architecture. A proper firewall provides explicit access control rules, logging, stateful inspection, and application awareness that NAT cannot.
        </IQ>

        <IQ q="How does WireGuard differ from IPSec, and what are the security tradeoffs?">
          WireGuard and IPSec take opposite design philosophies. IPSec was designed by committee to support every possible cryptographic algorithm, every key exchange method, and every deployment scenario — resulting in a protocol suite with hundreds of configuration options, many of which are insecure (DES, 3DES, MD5, DH Group 1/2, IKEv1 aggressive mode). Every IPSec deployment involves negotiating which algorithms to use, and misconfiguration allows downgrade to weak algorithms.
          <br /><br />
          WireGuard hardcodes its cryptographic primitives: Curve25519 for key exchange, ChaCha20-Poly1305 for encryption, BLAKE2s for hashing, and the Noise protocol framework for the handshake. There is no algorithm negotiation — there's nothing to downgrade. This also makes the codebase dramatically smaller (~4,000 lines vs IPSec's hundreds of thousands), which means a much smaller attack surface for implementation bugs.
          <br /><br />
          Tradeoffs: WireGuard lacks some enterprise features that IPSec provides — no built-in certificate-based authentication (WireGuard uses static public keys, more similar to SSH), limited support for legacy hardware with IPSec offload, and no IKEv2-based identity federation. WireGuard also doesn't hide the fact that WireGuard is being used — IPSec can be tunneled over TCP or disguised. For enterprises requiring compatibility with existing IPSec infrastructure or regulatory compliance around specific algorithms, IPSec (with IKEv2 and modern algorithms) remains relevant. For new deployments, WireGuard's simplicity and modern cryptography make it the better choice.
        </IQ>

        <IQ q="Design a network segmentation architecture for a three-tier web application handling financial data.">
          I'd design four security zones with strict inter-zone firewall rules, following the principle of least privilege at each boundary.
          <br /><br />
          The outermost zone is the DMZ, containing the web/application load balancer and WAF (Web Application Firewall). Only ports 443 and 80 (redirecting to 443) are allowed inbound from the internet. The WAF sits inline, inspecting all HTTP traffic before it reaches application servers. The DMZ firewall allows only HTTPS/443 inbound from internet, and only the specific application port (e.g., 8080) outbound to the App Tier — no other outbound connections.
          <br /><br />
          The App Tier contains application servers and background job processors. The App Tier firewall allows inbound traffic only from the DMZ's specific IP range on port 8080. Outbound: only PostgreSQL/5432 to the Database Tier, Redis/6379 to the Cache Tier, and HTTPS/443 to specific external APIs (allowlisted domains, not any/any). No other connections allowed.
          <br /><br />
          The Database Tier is the most restricted zone — PostgreSQL instances, encryption key management. Firewall: allow only 5432 from App Tier IP range. No outbound connections except to the backup system's specific IP. No SSH directly to DB servers — access only via the Management/Bastion zone.
          <br /><br />
          The Management Zone contains the bastion/jump host, monitoring systems, and deployment pipeline. Engineers access everything through the bastion via SSH with certificate-based auth. The bastion is the only path to production systems — direct SSH from engineer laptops is blocked at all tier firewalls. All management access is logged through the bastion's session recording.
        </IQ>
      </Part>

      <HR />

      <Part>
        <H>Error Library — Common Mistakes</H>

        <Err
          title="Treating NAT as a security boundary"
          cause="NAT translates addresses but provides no access control rules, no logging, and no application awareness. Many organisations operate with minimal firewall rules because they believe NAT protects them. NAT also provides no protection against outbound malware, and port-forwarding rules or UPnP can inadvertently expose internal services."
          fix="Deploy a stateful firewall with explicit allow rules (default deny) and logging. NAT and firewalling are separate concerns. All cloud environments (AWS, Azure, GCP) have firewalling separate from NAT — Security Groups and NSGs are firewalls, not NAT features."
        />

        <Err
          title="Writing firewall rules with overly broad source ranges"
          cause="Rules like 'allow any → internal-db:3306' or 'allow 10.0.0.0/8 → production-server:22' are extremely common. IT added them for convenience — 'just allow all internal traffic, it's trusted.' These rules eliminate the segmentation benefit: if any host in the /8 range is compromised, it can directly access the database or SSH into production."
          fix="Write rules with the most specific source possible. Allow only the specific app server IPs (or /32 hosts) that legitimately need database access. Use security groups or firewall tags to apply rules by role rather than IP range — 'allow app-servers-sg → db:5432' is more maintainable than a CIDR range that grows stale."
        />

        <Err
          title="Forgetting east-west (internal) traffic in network monitoring"
          cause="Most organisations monitor north-south traffic (internet ↔ corporate boundary) but have no visibility into east-west traffic (between internal segments). Attackers who achieve an initial foothold move laterally between internal systems — this traffic never crosses the internet-facing monitoring point. Large breaches often go undetected for months because internal lateral movement is invisible."
          fix="Deploy network monitoring sensors at internal segment boundaries, not just at the internet perimeter. Network TAPs or SPAN ports on switches between VLANs, with IDS signatures tuned for lateral movement patterns (SMB connections, LDAP enumeration, Kerberos anomalies). Zero Trust micro-segmentation also helps: if each application requires authentication, lateral movement attempts generate identity events in the IdP logs."
        />

        <Err
          title="Assuming VPN = Zero Trust"
          cause="VPN vendors began marketing their products as 'Zero Trust VPN' in response to ZTA hype. A VPN with MFA is better than a VPN without MFA, but it's not Zero Trust. The VPN still grants network-level access, not per-application access. Device posture checking is often optional and not enforced. The fundamental architecture (broad network access after authentication) is unchanged."
          fix="Evaluate whether your VPN grants network-level access (route to corporate subnets) or application-level access (authenticated proxy per app). Only the latter is ZTNA. True Zero Trust requires: per-application access control, device posture enforcement as an access prerequisite, identity-based policies, and visibility into all access events. Assess products against NIST SP 800-207 criteria, not marketing claims."
        />

        <Err
          title="Not documenting or reviewing firewall rules"
          cause="Firewall rule sets grow organically over years. Each rule was added for a reason — but after a few years, systems are decommissioned, network redesigns happen, and the original context is lost. 'Shadow rules' — rules that no longer serve any purpose but continue to allow traffic — are extremely common. A 5-year-old rule allowing any→any on port 8080 may have no legitimate traffic passing through it, but it's a persistent attack path."
          fix="Quarterly firewall rule review: for each rule, document the business justification, the systems it applies to, and the owner. Use firewall management tools (FireMon, AlgoSec, Tufin) that track rule usage — rules with zero traffic in 90 days are candidates for removal. Require change tickets for every new rule, with an expiry date for temporary rules."
        />
      </Part>

      <HR />

      <KeyTakeaways
        items={[
          'CIDR notation specifies IP ranges as a prefix length (/24 = 256 addresses). Network segmentation using CIDR is the primary technical control against lateral movement.',
          'Stateful firewalls track TCP connection state — they allow return traffic for established connections without opening broad port ranges. Always use stateful firewalls at network boundaries.',
          'NAT provides coincidental inbound blocking by dropping packets with no matching translation table entry. It is NOT a firewall and provides no access control, logging, or outbound traffic inspection.',
          'IPSec supports hundreds of algorithm combinations — many deprecated. IKEv2 with AES-256-GCM, SHA-256, and DH Group 19+ (ECDH P-256) is the modern baseline. Avoid IKEv1, DES/3DES, MD5, and DH Groups 1/2/5.',
          'WireGuard hardcodes Curve25519, ChaCha20-Poly1305, and BLAKE2s with no algorithm negotiation — eliminating downgrade attacks. Its 4,000-line codebase is orders of magnitude smaller than IPSec.',
          'Zero Trust rejects network location as a trust signal. Every access request — inside or outside the corporate network — must be verified by identity, device health, and dynamic policy.',
          'ZTNA (Zero Trust Network Access) grants access to specific applications, not network routes. Compromised credentials blocked by device posture check; even valid users can\'t reach applications their device isn\'t entitled to.',
          'East-west (internal segment) traffic monitoring is as critical as north-south monitoring. Most lateral movement happens entirely within the internal network and never crosses the internet perimeter sensor.',
          'Firewall rules should follow deny-all, allow-what-you-need. Source ranges should be as specific as possible (/32 for individual hosts). Rules with source 0.0.0.0/0 to internal services are the most dangerous finding in a firewall audit.',
          'Network TAPs are passive devices that copy all traffic on a link without affecting it. Unlike SPAN ports, they don\'t drop packets under load and can\'t be detected or disabled by attackers on the segment.',
        ]}
      />

      <HR />

      <div style={{ background: 'var(--code-bg)', borderRadius: 12, padding: '28px 32px', marginTop: 40 }}>
        <div style={{ fontSize: 13, color: C, fontWeight: 700, marginBottom: 8, textTransform: 'uppercase', letterSpacing: 1 }}>
          Up Next — Module 16
        </div>
        <div style={{ fontSize: 22, fontWeight: 700, color: 'var(--heading)', marginBottom: 12 }}>
          Linux Hardening
        </div>
        <p style={{ ...s.p, marginBottom: 20 }}>
          In Module 16, you systematically harden a Linux server. Minimal install, user privilege management, SSH hardening, mandatory access controls (SELinux/AppArmor), kernel security parameters, audit logging, and automated compliance checking with tools like Lynis and OpenSCAP. You'll work through a CIS Benchmark checklist and understand which controls matter most for servers exposed to the internet.
        </p>
        <Link
          href="/learn/cybersecurity/linux-hardening"
          style={{
            display: 'inline-block',
            background: C,
            color: '#fff',
            padding: '12px 28px',
            borderRadius: 8,
            fontWeight: 700,
            fontSize: 15,
            textDecoration: 'none',
          }}
        >
          Continue to Module 16 →
        </Link>
      </div>
    </LearnLayout>
  )
}
