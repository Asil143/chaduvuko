import type { Metadata } from 'next'
import Link from 'next/link'
import { LearnLayout } from '@/components/content/LearnLayout'
import { Callout } from '@/components/content/Callout'
import { KeyTakeaways } from '@/components/content/KeyTakeaways'

export const metadata: Metadata = {
  title: 'How the Internet Works — A Security Engineer\'s View | Chaduvuko',
  description: 'TCP/IP, DNS, HTTP, TLS — every layer\'s attack surfaces explained from first principles. What happens when you type a URL, and where attackers intercept it.',
}

const C = '#ff4757'

const Part = ({ n, title }: { n: string; title: string }) => (
  <div style={{ marginBottom: 28 }}>
    <p style={{ fontSize: 11, color: C, fontFamily: 'var(--font-mono)', fontWeight: 700, margin: '0 0 8px', letterSpacing: '.1em' }}>// Part {n}</p>
    <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(20px,3vw,30px)', fontWeight: 900, letterSpacing: '-1.5px', color: 'var(--text)', margin: 0 }}>{title}</h2>
  </div>
)

const P = ({ children }: { children: React.ReactNode }) => (
  <p style={{ fontSize: 15, color: 'var(--text)', lineHeight: 1.9, margin: '0 0 18px' }}>{children}</p>
)

const H = ({ children }: { children: React.ReactNode }) => (
  <h3 style={{ fontSize: 17, fontWeight: 700, color: 'var(--text)', margin: '32px 0 12px' }}>{children}</h3>
)

const Hl = ({ children }: { children: React.ReactNode }) => (
  <strong style={{ color: C }}>{children}</strong>
)

const HR = () => <div style={{ borderTop: '1px solid var(--border)', margin: '48px 0' }} />

const IQ = ({ q, children }: { q: string; children: React.ReactNode }) => (
  <div style={{ marginBottom: 40 }}>
    <div style={{ background: `${C}10`, border: `1px solid ${C}25`, borderRadius: '8px 8px 0 0', padding: '14px 18px', fontSize: 14, fontWeight: 700, color: 'var(--text)' }}>Q: {q}</div>
    <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderTop: 'none', borderRadius: '0 0 8px 8px', padding: '18px', fontSize: 14, color: 'var(--text)', lineHeight: 1.9 }}>{children}</div>
  </div>
)

const Err = ({ msg, cause, fix }: { msg: string; cause: string; fix: string }) => (
  <div style={{ marginBottom: 24, border: '1px solid var(--border)', borderRadius: 10, overflow: 'hidden' }}>
    <div style={{ background: 'rgba(255,71,87,0.09)', borderBottom: '1px solid var(--border)', padding: '10px 16px', fontFamily: 'var(--font-mono)', fontSize: 12, color: '#ff4757', wordBreak: 'break-all', lineHeight: 1.6 }}>{msg}</div>
    <div style={{ padding: '14px 16px' }}>
      <p style={{ fontSize: 13, color: 'var(--muted)', lineHeight: 1.7, margin: '0 0 8px' }}><strong style={{ color: 'var(--text)' }}>Cause: </strong>{cause}</p>
      <p style={{ fontSize: 13, color: 'var(--muted)', lineHeight: 1.7, margin: 0 }}><strong style={{ color: '#00e676' }}>Fix: </strong>{fix}</p>
    </div>
  </div>
)

const ProTip = ({ children }: { children: React.ReactNode }) => (
  <div style={{ background: `${C}08`, border: `1px solid ${C}20`, borderRadius: 10, padding: '16px 20px', margin: '24px 0' }}>
    <p style={{ fontSize: 11, fontWeight: 700, color: C, fontFamily: 'var(--font-mono)', textTransform: 'uppercase', letterSpacing: '.1em', margin: '0 0 8px' }}>🎯 Pro Tip</p>
    <p style={{ fontSize: 14, color: 'var(--text)', lineHeight: 1.85, margin: 0 }}>{children}</p>
  </div>
)

const Code = ({ children }: { children: React.ReactNode }) => (
  <code style={{ fontFamily: 'var(--font-mono)', fontSize: 12, background: 'var(--bg2)', border: '1px solid var(--border)', borderRadius: 4, padding: '1px 6px', color: 'var(--text)' }}>{children}</code>
)

const Block = ({ children }: { children: React.ReactNode }) => (
  <pre style={{ fontFamily: 'var(--font-mono)', fontSize: 12, background: 'var(--bg2)', border: '1px solid var(--border)', borderRadius: 8, padding: '16px 20px', overflowX: 'auto', lineHeight: 1.75, color: 'var(--text)', margin: '0 0 20px' }}>{children}</pre>
)

export default function HowTheInternetWorks() {
  return (
    <LearnLayout
      title="How the Internet Works — A Security Engineer's View"
      description="TCP/IP, DNS, HTTP, TLS — every layer's attack surfaces explained from first principles. What happens in the network when you type a URL."
      section="Cybersecurity — Module 02"
      readTime="28 min"
      updatedAt="May 2026"
    >

      {/* ── PART 01 ── */}
      <Part n="01" title="Why Every Security Engineer Must Understand the Network" />

      <P>Security tools — firewalls, IDS systems, packet capture, network monitoring — all operate at the network layer. An attacker who understands TCP/IP can craft packets that evade detection. A defender who does not understand TCP/IP cannot interpret what those tools are telling them. Network literacy is not optional background knowledge for a security engineer. It is the foundation everything else is built on.</P>

      <P>This module answers one question from first principles: <Hl>what happens when you type https://bank.example.com into a browser?</Hl> Every step in that journey — DNS resolution, TCP connection, TLS handshake, HTTP request, HTTP response — is an attack surface. By the end, you will know exactly where attackers intercept, redirect, forge, and eavesdrop on network traffic.</P>

      <div style={{ background: `${C}08`, border: `1px solid ${C}25`, borderLeft: `4px solid ${C}`, borderRadius: '0 10px 10px 0', padding: '20px 24px', margin: '4px 0 24px' }}>
        <P>The internet is not a single network. It is a collection of autonomous systems — networks owned by ISPs, universities, governments, and companies — that agree to route packets between each other using a shared set of protocols. Those protocols were designed in the 1970s and 1980s with trust, not security, as the primary design goal. Security was retrofitted on top. This is why so many fundamental attacks still work.</P>
      </div>

      <HR />

      {/* ── PART 02 ── */}
      <Part n="02" title="The TCP/IP Model — Every Layer Is an Attack Surface" />

      <P>The TCP/IP model describes how data moves from one machine to another by breaking the problem into layers. Each layer adds its own header information, passes the data to the layer below it, and the receiving end strips each layer in reverse. Understanding which layer each attack targets makes security architecture comprehensible.</P>

      <div style={{ overflowX: 'auto', marginBottom: 32 }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13, lineHeight: 1.6 }}>
          <thead>
            <tr>
              {['Layer', 'What It Does', 'Key Protocols', 'Attack Examples'].map((h) => (
                <th key={h} style={{ padding: '10px 14px', textAlign: 'left', fontWeight: 700, fontSize: 11, letterSpacing: '.08em', textTransform: 'uppercase', color: 'var(--muted)', borderBottom: '1px solid var(--border)', background: 'var(--bg2)' }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {[
              ['Application', 'The data the user sees — web pages, emails, files. This is where browsers, email clients, and APIs live.', 'HTTP, HTTPS, DNS, SMTP, FTP, SSH', 'SQL injection, XSS, phishing, DNS poisoning, credential theft'],
              ['Transport', 'Breaks application data into segments and ensures reliable delivery (TCP) or fast fire-and-forget delivery (UDP).', 'TCP, UDP', 'SYN flood, port scanning, session hijacking, TCP reset attacks'],
              ['Internet', 'Routes packets between networks using IP addresses. Does not guarantee delivery — best effort.', 'IP, ICMP', 'IP spoofing, ICMP redirect attacks, BGP hijacking, fragmentation attacks'],
              ['Network Access', 'Moves data between devices on the same physical network using MAC addresses. Also called the Link layer.', 'Ethernet, ARP, Wi-Fi (802.11)', 'ARP poisoning, MAC flooding, rogue Wi-Fi access points, VLAN hopping'],
            ].map(([layer, what, protocols, attacks], i) => (
              <tr key={i} style={{ background: i % 2 === 0 ? 'var(--surface)' : 'var(--bg2)' }}>
                <td style={{ padding: '10px 14px', fontWeight: 700, color: C, borderBottom: '1px solid var(--border)', whiteSpace: 'nowrap' }}>{layer}</td>
                <td style={{ padding: '10px 14px', color: 'var(--text)', borderBottom: '1px solid var(--border)' }}>{what}</td>
                <td style={{ padding: '10px 14px', color: 'var(--muted)', fontSize: 12, fontFamily: 'var(--font-mono)', borderBottom: '1px solid var(--border)' }}>{protocols}</td>
                <td style={{ padding: '10px 14px', color: 'var(--muted)', fontSize: 12, borderBottom: '1px solid var(--border)' }}>{attacks}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <P>The key security insight: <Hl>each layer trusts the layer above and below it.</Hl> The Transport layer does not verify whether the IP address it received from the Internet layer is the legitimate origin. The Application layer does not verify that the TCP connection it received is not being proxied by an attacker. This trust model is where most network attacks live.</P>

      <ProTip>When analysing a network attack, always identify which layer it operates at first. ARP poisoning is a Layer 2 (Network Access) attack — a firewall operating at Layer 3 (Internet) will not stop it because the firewall never sees ARP traffic. Understanding layers prevents you from applying the wrong defence to the right problem.</ProTip>

      <HR />

      {/* ── PART 03 ── */}
      <Part n="03" title="IP Addresses and Routing — What Actually Moves a Packet" />

      <H>IP Addresses</H>
      <P>Every device on the internet has an IP address — a number that identifies its location on the network. IPv4 uses 32-bit addresses written in dotted-decimal notation: <Code>192.168.1.1</Code>. IPv6 uses 128-bit addresses: <Code>2001:0db8:85a3::8a2e:0370:7334</Code>. The internet ran out of IPv4 addresses in 2011, which is why Network Address Translation (NAT) is ubiquitous — multiple devices share one public IP behind a router.</P>

      <P><Hl>IP spoofing</Hl> — setting a false source IP on a packet — is trivially easy. The Internet Protocol does not authenticate source addresses. A packet claiming to come from <Code>1.2.3.4</Code> may actually come from <Code>99.99.99.99</Code>. This is the foundation of many attacks: reflection attacks that use spoofed source IPs to direct responses at a victim, and it is why you cannot trust an IP address as proof of identity.</P>

      <H>Routing — How Packets Find Their Destination</H>
      <P>Routers are the post offices of the internet. Each router maintains a routing table — a list of network prefixes and which direction to send packets matching each prefix. Packets hop from router to router, each making a local forwarding decision, until they reach the destination. The <Code>traceroute</Code> (or <Code>tracert</Code> on Windows) command shows every hop a packet takes.</P>

      <Block>{`$ traceroute google.com
traceroute to google.com (142.250.80.46), 30 hops max
 1  192.168.1.1 (your home router)          1.2 ms
 2  10.10.0.1 (your ISP's first router)     5.8 ms
 3  72.14.232.1 (Google's network edge)    18.4 ms
 4  142.250.80.46 (google.com)             19.1 ms`}</Block>

      <P>The Border Gateway Protocol (BGP) is the routing protocol that determines how these inter-network routes are chosen. <Hl>BGP hijacking</Hl> — announcing false routes to attract traffic meant for another network — has been used to redirect internet traffic, intercept communications, and conduct surveillance. A BGP error in 2010 briefly redirected 15% of internet traffic through China Telecom. BGP has no authentication built in; this is a known design flaw with no universal fix deployed.</P>

      <H>Private vs Public Addresses</H>
      <P>Three IP ranges are reserved for private networks: <Code>10.0.0.0/8</Code>, <Code>172.16.0.0/12</Code>, and <Code>192.168.0.0/16</Code>. These addresses are not routed on the public internet — they are used inside corporate networks, data centres, and home networks. Network Address Translation (NAT) maps private addresses to a public IP at the network boundary. This matters for security: when a scanner finds <Code>192.168.x.x</Code> addresses in a web response or DNS record, it has learned about internal network structure — information that should never be exposed.</P>

      <HR />

      {/* ── PART 04 ── */}
      <Part n="04" title="TCP — Reliable Delivery and Its Attack Surface" />

      <H>The Three-Way Handshake</H>
      <P>TCP (Transmission Control Protocol) provides reliable, ordered delivery. Before any data is exchanged, TCP establishes a connection using a three-way handshake:</P>

      <Block>{`Client → Server: SYN    (I want to connect, my sequence number starts at X)
Server → Client: SYN-ACK (Acknowledged. My sequence number starts at Y)
Client → Server: ACK    (Acknowledged. Connection established.)

[DATA TRANSFER BEGINS]

Either party → FIN → FIN-ACK → ACK (connection teardown)`}</Block>

      <P>Every web request, SSH session, and email starts with this handshake. The handshake creates state on the server — the server must remember every half-open connection (SYN received, SYN-ACK sent, ACK not yet received).</P>

      <H>SYN Flood — Exhausting Server State</H>
      <P>A <Hl>SYN flood attack</Hl> exploits the three-way handshake by sending massive numbers of SYN packets with spoofed source IPs. The server sends SYN-ACK responses to addresses that never complete the handshake, maintaining state for each half-open connection. When the connection table fills up, the server cannot accept legitimate connections. This is a Denial of Service attack at the Transport layer.</P>

      <P>SYN cookies are the standard mitigation — the server encodes connection state into the sequence number rather than storing it in memory, so spoofed SYNs do not exhaust resources. Most modern operating systems enable SYN cookies automatically.</P>

      <H>Port Scanning — Mapping the Attack Surface</H>
      <P>TCP ports range from 0 to 65535. Services listen on specific ports: HTTP on 80, HTTPS on 443, SSH on 22, FTP on 21. <Hl>Port scanning</Hl> sends connection attempts to every port to discover which services are running. nmap is the standard tool:</P>

      <Block>{`$ nmap -sV -p 1-65535 192.168.1.1

PORT     STATE  SERVICE    VERSION
22/tcp   open   ssh        OpenSSH 8.9
80/tcp   open   http       nginx 1.22.1
443/tcp  open   https      nginx 1.22.1
3306/tcp open   mysql      MySQL 8.0.32    ← database exposed to network
6379/tcp open   redis      Redis 7.0        ← unauthenticated by default`}</Block>

      <P>Every open port is a potential entry point. A Redis instance exposed on port 6379 with default (no authentication) configuration has been used to compromise systems by overwriting SSH authorized_keys files. The attack is trivial once the port scan reveals the exposure.</P>

      <H>Session Hijacking</H>
      <P>TCP connections are identified by source IP, source port, destination IP, and destination port, plus sequence numbers. If an attacker can predict or observe the sequence numbers and has a position on the network path, they can inject packets into an existing TCP session — <Hl>session hijacking</Hl>. Before HTTPS was ubiquitous, this was used to steal authenticated web sessions over public Wi-Fi.</P>

      <HR />

      {/* ── PART 05 ── */}
      <Part n="05" title="DNS — How Names Become Addresses and How Attackers Abuse It" />

      <P>The Domain Name System (DNS) translates human-readable domain names (<Code>google.com</Code>) into IP addresses (<Code>142.250.80.46</Code>). It is the phone book of the internet, and it is involved in almost every internet communication.</P>

      <H>How DNS Resolution Works</H>

      <Block>{`You type: https://bank.example.com

Step 1: Check local cache — has your computer looked this up recently?
Step 2: Ask your configured DNS resolver (usually your ISP or 8.8.8.8)
Step 3: Resolver asks a Root DNS server: "Who handles .com?"
Step 4: Root server: "Ask the .com TLD servers"
Step 5: Resolver asks .com TLD: "Who handles example.com?"
Step 6: TLD server: "Ask ns1.example.com"
Step 7: Resolver asks ns1.example.com: "What is bank.example.com?"
Step 8: ns1.example.com: "It is 93.184.216.34"
Step 9: Resolver caches the answer for the TTL duration, returns to you

Total time: 10-100ms on first lookup, <1ms from cache`}</Block>

      <H>DNS Record Types</H>
      <P>DNS stores more than IP addresses. The common record types each serve a different purpose:</P>

      <div style={{ display: 'grid', gap: 10, margin: '0 0 24px' }}>
        {[
          { type: 'A', color: '#00e676', desc: 'Maps a hostname to an IPv4 address. The most common record.', attack: 'DNS hijacking — change this record and all traffic goes to attacker' },
          { type: 'AAAA', color: '#4285f4', desc: 'Maps a hostname to an IPv6 address.', attack: 'Same as A record — IPv6 DNS hijacking is often overlooked in defences' },
          { type: 'CNAME', color: '#7b61ff', desc: 'Canonical name — an alias. example.com CNAME points to cdn.provider.com.', attack: 'Subdomain takeover — dangling CNAME to deprovisioned services' },
          { type: 'MX', color: '#f97316', desc: 'Mail exchange — which servers receive email for this domain.', attack: 'MX record manipulation redirects email, enabling credential interception' },
          { type: 'TXT', color: '#facc15', desc: 'Arbitrary text — used for SPF, DKIM, domain verification.', attack: 'Missing SPF/DKIM records enable email spoofing' },
          { type: 'NS', color: '#ff4757', desc: 'Nameserver — which servers are authoritative for this domain.', attack: 'NS hijacking gives full control over all DNS records for the domain' },
          { type: 'PTR', color: 'var(--muted)', desc: 'Reverse lookup — IP address to hostname mapping.', attack: 'Missing PTR records often indicate shadow IT or unknown infrastructure' },
        ].map((row) => (
          <div key={row.type} style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderLeft: `3px solid ${row.color}`, borderRadius: 8, padding: '12px 16px', display: 'flex', gap: 16, alignItems: 'flex-start' }}>
            <div style={{ fontSize: 14, fontWeight: 900, color: row.color, fontFamily: 'var(--font-mono)', minWidth: 48 }}>{row.type}</div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 13, color: 'var(--text)', marginBottom: 4 }}>{row.desc}</div>
              <div style={{ fontSize: 11, color: 'var(--muted)', fontFamily: 'var(--font-mono)' }}>⚠ {row.attack}</div>
            </div>
          </div>
        ))}
      </div>

      <H>DNS Attack Types</H>

      <P><Hl>DNS Cache Poisoning:</Hl> A resolver caches DNS responses for the TTL (time-to-live) duration. If an attacker can inject a forged DNS response into the resolver's cache — either by predicting the transaction ID or exploiting an unpatched resolver — all users of that resolver will receive the false IP address until the TTL expires. The Kaminsky attack (2008) demonstrated this at scale against every major DNS resolver. DNSSEC (DNS Security Extensions) cryptographically signs DNS records to prevent this, but adoption remains incomplete.</P>

      <P><Hl>DNS Hijacking:</Hl> Rather than poisoning a cache, the attacker modifies the authoritative DNS record itself. This requires compromising the domain registrar account or the authoritative DNS server. In 2019, a wave of DNS hijacking attacks targeted government and corporate domains by compromising registrar accounts with weak credentials, redirecting traffic to attacker-controlled infrastructure where valid TLS certificates were obtained via ACME/Let's Encrypt.</P>

      <P><Hl>Subdomain Takeover:</Hl> An organisation uses a CNAME record pointing <Code>api.example.com</Code> to a third-party service (<Code>myapp.service.io</Code>). The organisation stops using the service but forgets to remove the CNAME record. The subdomain on the third-party service is now unregistered — anyone can claim it. An attacker registers the same subdomain on the provider and now controls <Code>api.example.com</Code>. This enables cookie theft if the main domain shares cookies with subdomains, phishing, and content injection.</P>

      <P><Hl>DNS over HTTPS (DoH) and DNS over TLS (DoT):</Hl> Traditional DNS is sent in plaintext — anyone between you and your resolver can see every domain you visit. DoH and DoT encrypt DNS queries. This protects user privacy but also means network defenders lose visibility into DNS-based threat intelligence (blocking malicious domains at the DNS layer). This is the privacy vs security trade-off inherent in DNS encryption.</P>

      <ProTip>DNS is involved in almost every cyberattack. Malware calls home via DNS. C2 servers use domain generation algorithms that register new domains daily. Data exfiltration encodes stolen data in DNS query subdomains. Every security platform — SIEM, threat intelligence, firewalls — does DNS-based detection. Understanding DNS is not optional networking knowledge; it is a core security skill.</ProTip>

      <HR />

      {/* ── PART 06 ── */}
      <Part n="06" title="HTTP — The Protocol That Powers the Web (and Leaks Everything)" />

      <P>HTTP (Hypertext Transfer Protocol) is the application-layer protocol that web browsers use to request pages and APIs use to exchange data. It is a text-based, stateless request-response protocol. Stateless means each request is independent — the server does not remember the previous request. Cookies exist specifically to add state on top of this stateless protocol.</P>

      <H>Anatomy of an HTTP Request</H>

      <Block>{`GET /account/dashboard HTTP/1.1
Host: bank.example.com
User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36
Accept: text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8
Accept-Language: en-US,en;q=0.5
Accept-Encoding: gzip, deflate, br
Cookie: session_id=abc123def456; user_pref=dark_mode
Referer: https://bank.example.com/login
Connection: keep-alive`}</Block>

      <P>Security-relevant information visible in this single request: the exact browser and operating system (<Code>User-Agent</Code>), the previous page visited (<Code>Referer</Code>), the session identifier (<Code>Cookie</Code>), and the requested resource path. In HTTP (not HTTPS), this is all visible to anyone on the network path.</P>

      <H>HTTP Methods and Their Security Implications</H>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 12, margin: '0 0 24px' }}>
        {[
          { method: 'GET', color: '#00e676', desc: 'Retrieve a resource. Should have no side effects — no state changes on the server. Parameters in the URL are logged by default in web server logs, proxies, and browser history.', risk: 'Sensitive data in URL parameters (tokens, search terms) leaked to logs' },
          { method: 'POST', color: '#4285f4', desc: 'Submit data to the server. Body is not logged by default. Used for login forms, API calls, file uploads.', risk: 'CSRF attacks submit POST requests from attacker-controlled pages' },
          { method: 'PUT / PATCH', color: '#f97316', desc: 'Update a resource. Should be idempotent (same result if called multiple times). Often used in REST APIs.', risk: 'Mass assignment — submitting extra fields that update unintended properties' },
          { method: 'DELETE', color: '#ff4757', desc: 'Delete a resource. Requires proper authorisation — without it, any authenticated user can delete any resource.', risk: 'Missing authorisation checks — DELETE /api/posts/123 deletes another user\'s post' },
          { method: 'OPTIONS', color: '#7b61ff', desc: 'Query which methods are supported. Used in CORS preflight requests.', risk: 'Overly permissive CORS headers enable cross-origin data theft' },
        ].map((item) => (
          <div key={item.method} style={{ background: 'var(--surface)', border: `1px solid ${item.color}25`, borderLeft: `3px solid ${item.color}`, borderRadius: 8, padding: '14px 16px' }}>
            <div style={{ fontSize: 13, fontWeight: 900, color: item.color, fontFamily: 'var(--font-mono)', marginBottom: 8 }}>{item.method}</div>
            <div style={{ fontSize: 12, color: 'var(--text)', lineHeight: 1.65, marginBottom: 8 }}>{item.desc}</div>
            <div style={{ fontSize: 11, color: '#ff4757', fontFamily: 'var(--font-mono)', lineHeight: 1.5 }}>⚠ {item.risk}</div>
          </div>
        ))}
      </div>

      <H>HTTP Response Headers — Your Security Configuration</H>
      <P>HTTP response headers sent by the server tell the browser how to behave. Security-relevant headers prevent common web attacks:</P>

      <Block>{`HTTP/1.1 200 OK
Content-Type: text/html; charset=UTF-8
Strict-Transport-Security: max-age=31536000; includeSubDomains  ← force HTTPS
Content-Security-Policy: default-src 'self'; script-src 'self'  ← prevent XSS
X-Frame-Options: DENY                                            ← prevent clickjacking
X-Content-Type-Options: nosniff                                  ← prevent MIME sniffing
Referrer-Policy: strict-origin-when-cross-origin                 ← control Referer header
Set-Cookie: session=abc123; HttpOnly; Secure; SameSite=Strict    ← protect cookies`}</Block>

      <P>A server missing <Code>Strict-Transport-Security</Code> allows downgrade attacks — an attacker who intercepts the first HTTP request can prevent the HTTPS upgrade. Missing <Code>Content-Security-Policy</Code> means any injected script runs with the page's full permissions. Missing <Code>HttpOnly</Code> on cookies means JavaScript can steal them. These headers are a five-minute configuration that prevents entire classes of attack.</P>

      <HR />

      {/* ── PART 07 ── */}
      <Part n="07" title="TLS — What HTTPS Actually Does and What It Does Not" />

      <P>TLS (Transport Layer Security) is the protocol that encrypts HTTP traffic to create HTTPS. When you see the padlock icon in a browser, TLS is active. Understanding what TLS actually provides — and what it does not — is critical because a surprising number of attacks work against HTTPS targets.</P>

      <H>The TLS Handshake — Step by Step</H>

      <Block>{`1. Client Hello
   Client → Server
   "I support TLS 1.2 and 1.3. Here are the cipher suites I support.
   My random value: [32 random bytes]"

2. Server Hello + Certificate
   Server → Client
   "We will use TLS 1.3 with AES-256-GCM-SHA384.
   My random value: [32 random bytes]
   Here is my certificate (signed by DigiCert, proves I am bank.example.com)"

3. Client Verifies Certificate
   Client checks:
   - Is the certificate signed by a trusted Certificate Authority?
   - Does the domain on the cert match the domain I requested?
   - Is the certificate expired?
   - Has it been revoked? (OCSP check)

4. Key Exchange (Elliptic Curve Diffie-Hellman)
   Client and server exchange key material.
   Each derives the same session keys independently.
   A passive eavesdropper cannot derive the keys even if they captured all traffic.
   (This is Perfect Forward Secrecy — keys are ephemeral, not reused)

5. Client Finished / Server Finished
   Both sides confirm the handshake succeeded.
   All subsequent traffic is encrypted with the derived session keys.`}</Block>

      <H>What TLS Protects</H>
      <P>TLS provides three security properties when functioning correctly:</P>

      <div style={{ display: 'grid', gap: 12, margin: '0 0 24px' }}>
        {[
          { prop: 'Confidentiality', color: '#00e676', body: 'The content of requests and responses is encrypted. An attacker who intercepts network traffic sees only encrypted bytes, not the HTML, JSON, passwords, or cookies being transmitted.' },
          { prop: 'Integrity', color: '#4285f4', body: 'TLS uses message authentication codes (MACs) to detect tampering. If an attacker modifies a single byte in transit, the receiver detects the mismatch and drops the connection.' },
          { prop: 'Authentication', color: '#7b61ff', body: 'The certificate proves the server is who it claims to be — that this is actually bank.example.com and not an impostor. The certificate is signed by a Certificate Authority that your browser trusts.' },
        ].map((item) => (
          <div key={item.prop} style={{ background: 'var(--surface)', border: `1px solid ${item.color}25`, borderLeft: `3px solid ${item.color}`, borderRadius: 8, padding: '14px 18px', display: 'flex', gap: 14 }}>
            <div style={{ fontSize: 13, fontWeight: 800, color: item.color, minWidth: 120 }}>{item.prop}</div>
            <div style={{ fontSize: 13, color: 'var(--text)', lineHeight: 1.75 }}>{item.body}</div>
          </div>
        ))}
      </div>

      <H>What TLS Does NOT Protect</H>

      <Callout type="warning">
        TLS encrypts data in transit. It does not protect data at rest, once it reaches the server. A server that stores passwords in plaintext, has a SQL injection vulnerability, or is compromised by an attacker still loses data — despite HTTPS. The padlock means "the network path is encrypted." It does not mean "this website is secure."
      </Callout>

      <P>Additionally, TLS does not protect against:</P>
      <P>• <Hl>Malicious servers with valid certificates:</Hl> Let's Encrypt will issue a free certificate to any domain — including phishing sites. A perfect HTTPS padlock on <Code>bank-secure-login.com</Code> means only that the connection to the fake site is encrypted, not that the site is legitimate.</P>
      <P>• <Hl>TLS interception (SSL inspection):</Hl> Corporate networks and security appliances often perform "man-in-the-middle" TLS inspection — the appliance terminates the TLS connection, inspects the plaintext, then re-encrypts to the destination. From the browser's perspective, TLS looks valid because the corporate CA is trusted. This is legal on corporate equipment but breaks the privacy guarantee for employees.</P>
      <P>• <Hl>Client-side attacks:</Hl> Malware on the endpoint can read data after decryption, before it reaches the network. The network is encrypted; the browser's memory is not.</P>

      <H>Certificate Transparency</H>
      <P>Every TLS certificate issued by a public CA must be logged in a public Certificate Transparency (CT) log. This means you can see every certificate ever issued for any domain — including certificates issued for subdomains you did not know existed. Tools like <Code>crt.sh</Code> and <Code>censys.io</Code> query CT logs and are standard reconnaissance tools for both attackers discovering attack surface and defenders auditing their certificate inventory.</P>

      <HR />

      {/* ── PART 08 ── */}
      <Part n="08" title="Putting It Together — The Full Journey of an HTTPS Request" />

      <P>Here is the complete sequence of events when a user types <Code>https://bank.example.com/login</Code> and presses Enter — with every attack vector annotated:</P>

      <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 12, padding: '24px 28px', marginBottom: 24 }}>
        {[
          {
            step: '1', label: 'DNS Resolution',
            body: 'The browser checks its local DNS cache, then queries the configured DNS resolver for the IP address of bank.example.com.',
            attack: 'DNS cache poisoning, DNS hijacking, or DNS-over-HTTP interception returns a malicious IP',
            color: '#ff4757',
          },
          {
            step: '2', label: 'TCP Connection',
            body: 'The browser initiates a three-way handshake with the server at the resolved IP on port 443.',
            attack: 'TCP reset injection terminates the connection; SYN flood blocks access entirely',
            color: '#f97316',
          },
          {
            step: '3', label: 'TLS Handshake',
            body: 'The browser and server negotiate cipher suites, exchange certificates, and derive session keys.',
            attack: 'MITM with rogue certificate (requires CA compromise or user accepting invalid cert); TLS downgrade to weaker protocol version',
            color: '#facc15',
          },
          {
            step: '4', label: 'HTTP Request',
            body: 'The browser sends the encrypted GET /login HTTP/1.1 request with headers, cookies, and any query parameters.',
            attack: 'CSRF (forged cross-origin request); cookie theft if HttpOnly not set; Referer header leaks sensitive URL parameters',
            color: '#00e676',
          },
          {
            step: '5', label: 'Server Processing',
            body: 'The web server receives the decrypted request, processes it (database queries, business logic), and generates a response.',
            attack: 'SQL injection, command injection, authentication bypass, server-side request forgery (SSRF) — all happen here',
            color: '#4285f4',
          },
          {
            step: '6', label: 'HTTP Response',
            body: 'The server sends back the encrypted response — HTML, cookies, security headers.',
            attack: 'Missing security headers enable XSS, clickjacking; insecure cookie flags enable theft; sensitive data in response body',
            color: '#7b61ff',
          },
          {
            step: '7', label: 'Browser Rendering',
            body: 'The browser decrypts, parses HTML, executes JavaScript, loads sub-resources (CSS, images, fonts, scripts).',
            attack: 'XSS in page content executes attacker JavaScript; malicious CDN script; clickjacking via iframe overlay',
            color: '#ff4757',
          },
        ].map((item) => (
          <div key={item.step} style={{ display: 'flex', gap: 20, marginBottom: 20 }}>
            <div style={{ flexShrink: 0 }}>
              <div style={{ width: 32, height: 32, borderRadius: '50%', background: `${item.color}20`, border: `2px solid ${item.color}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 900, color: item.color }}>{item.step}</div>
            </div>
            <div style={{ flex: 1, borderLeft: `2px solid ${item.color}20`, paddingLeft: 18, paddingBottom: 4 }}>
              <div style={{ fontSize: 13, fontWeight: 800, color: 'var(--text)', marginBottom: 4 }}>{item.label}</div>
              <div style={{ fontSize: 13, color: 'var(--muted)', lineHeight: 1.7, marginBottom: 6 }}>{item.body}</div>
              <div style={{ fontSize: 11, color: item.color, fontFamily: 'var(--font-mono)', lineHeight: 1.5 }}>⚠ Attack: {item.attack}</div>
            </div>
          </div>
        ))}
      </div>

      <HR />

      {/* ── PART 09 ── */}
      <Part n="09" title="What This Looks Like at Work — Reading a Packet Capture" />

      <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 12, padding: '24px 28px', marginBottom: 24 }}>
        <div style={{ fontSize: 11, fontWeight: 700, color: C, background: `${C}15`, border: `1px solid ${C}30`, borderRadius: 6, padding: '4px 10px', fontFamily: 'var(--font-mono)', display: 'inline-block', marginBottom: 20, letterSpacing: '.1em', textTransform: 'uppercase' }}>
          Scenario — Investigating suspicious outbound traffic
        </div>

        {[
          {
            time: '09:15',
            label: 'SIEM alert: unusual DNS activity from workstation WKSTN-0042',
            body: 'The alert shows WKSTN-0042 making 800+ DNS queries per hour to domains with high entropy names — a10b3c.xyz, 7f2k9p.net, q8r2m5.io. Normal workstations make 10-50 DNS queries per hour, mostly to known CDN domains. High entropy, newly registered domains are a strong indicator of Domain Generation Algorithm (DGA) malware.',
          },
          {
            time: '09:22',
            label: 'Capturing traffic with Wireshark',
            body: 'The analyst captures traffic from WKSTN-0042 using the corporate network tap. Filtering for DNS (port 53) confirms: the workstation is making DNS queries for seemingly random domains. The queries include subdomains like: dGhpcyBpcyBhIHRlc3Q.a10b3c.xyz — that subdomain is base64 encoded. The malware is exfiltrating data via DNS queries.',
          },
          {
            time: '09:35',
            label: 'Decoding the DNS exfiltration',
            body: 'The analyst decodes the subdomain: echo "dGhpcyBpcyBhIHRlc3Q" | base64 --decode → "this is a test". The malware encodes stolen data as DNS subdomains. Each query sends a chunk of data to an attacker-controlled DNS server. DNS exfiltration is effective against organisations that do not inspect DNS content, only filter known-malicious domains.',
          },
          {
            time: '09:50',
            label: 'Correlating with HTTP traffic',
            body: 'Looking at HTTPS traffic from WKSTN-0042: there is no TLS decryption on this network segment, so the content is encrypted. But the SNI (Server Name Indication) field in the TLS handshake — which is sent in plaintext before encryption — reveals the destination domain. SNI shows connections to the same suspicious domains. The C2 communication uses both DNS and HTTPS for redundancy.',
          },
          {
            time: '10:15',
            label: 'Containment and root cause',
            body: 'WKSTN-0042 is isolated from the network. Memory forensics reveals the malware process. The infection vector: a phishing email with a malicious Excel macro three days prior. The malware has been exfiltrating data for 72 hours. Network-level detection caught it only when the DNS query volume exceeded the threshold. Endpoint detection missed it because the macro ran inside a trusted Office process.',
          },
        ].map((block) => (
          <div key={block.time} style={{ display: 'flex', gap: 20, marginBottom: 20 }}>
            <div style={{ flexShrink: 0, width: 60, textAlign: 'right' }}>
              <div style={{ fontSize: 12, fontWeight: 700, color: C, fontFamily: 'var(--font-mono)' }}>{block.time}</div>
            </div>
            <div style={{ flex: 1, borderLeft: `2px solid ${C}30`, paddingLeft: 18, paddingBottom: 4 }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--text)', marginBottom: 4 }}>{block.label}</div>
              <div style={{ fontSize: 13, color: 'var(--muted)', lineHeight: 1.75 }}>{block.body}</div>
            </div>
          </div>
        ))}

        <Callout type="tip">
          DNS exfiltration is harder to detect than HTTP exfiltration because DNS is a necessary protocol that cannot be blocked. The defences are: DNS query rate monitoring (unusual volume), entropy analysis of queried domain names (random-looking names are suspicious), and DNS sinkholing — returning false responses for known DGA domains to break C2 communication while preserving the ability to track infected machines.
        </Callout>
      </div>

      <HR />

      {/* ── PART 10 ── */}
      <Part n="10" title="Interview Prep — 5 Questions With Complete Answers" />

      <IQ q="Explain what happens when you type https://google.com into a browser and hit Enter.">
        This is one of the most famous technical interview questions across all engineering disciplines. For a security role, the expectation is that you articulate the attack surfaces at each step, not just the mechanics.
        {'\n\n'}
        First, DNS resolution: the browser checks its local cache, then queries the configured resolver (typically the ISP or 8.8.8.8) for google.com's IP address. The resolver performs a recursive lookup through the root servers, TLD servers, and google.com's authoritative nameservers. The result is cached for the TTL duration. Attack surface: DNS cache poisoning returns a malicious IP; DNS hijacking modifies the authoritative record.
        {'\n\n'}
        Second, TCP connection: the browser initiates a three-way handshake (SYN, SYN-ACK, ACK) with the resolved IP on port 443. This establishes a reliable, ordered delivery channel. Attack surface: TCP reset injection terminates the session; SYN flood exhausts server connection state.
        {'\n\n'}
        Third, TLS handshake: the browser and server negotiate a cipher suite, the server presents its certificate, the browser verifies the certificate chain against trusted root CAs, and both sides derive session keys via Diffie-Hellman key exchange. All subsequent traffic is encrypted. Attack surface: MITM with a rogue certificate (requires CA compromise or user accepting an invalid cert); TLS downgrade forces a weaker protocol version.
        {'\n\n'}
        Fourth, HTTP request: the browser sends the encrypted GET / HTTP/1.1 request with headers including cookies, Accept, and User-Agent. Attack surface: CSRF submits forged requests; cookie theft if HttpOnly is absent.
        {'\n\n'}
        Fifth, server processing and response: the server processes the request, queries databases, generates HTML, and returns it with response headers including security controls like HSTS, CSP, and X-Frame-Options. Attack surface: SQL injection, XSS, SSRF, missing security headers.
        {'\n\n'}
        Sixth, rendering: the browser parses HTML, executes JavaScript, and loads subresources. Attack surface: stored XSS executes attacker JavaScript; malicious third-party scripts included via CDN.
      </IQ>

      <IQ q="What is DNS cache poisoning and how does DNSSEC prevent it?">
        DNS cache poisoning injects false DNS records into a resolver's cache so that clients using that resolver receive incorrect IP addresses — directing them to attacker-controlled servers rather than the legitimate destination.
        {'\n\n'}
        The attack works because DNS was designed without authentication. When a resolver queries an authoritative nameserver and receives a response, it has historically had no way to verify the response actually came from the legitimate nameserver rather than a forged response. The original Kaminsky attack (2008) exploited the fact that DNS uses UDP (easily spoofed) and transaction IDs are only 16 bits (65,535 possible values, feasibly brute-forced). An attacker sending many forged responses with guessed transaction IDs could win the race against the legitimate response and poison the cache.
        {'\n\n'}
        DNSSEC (DNS Security Extensions) prevents this by adding cryptographic signatures to DNS records. Each zone signs its records with a private key. The public key is published in a DNSKEY record. Resolvers retrieve the DNSKEY and verify that every DNS record they receive has a valid signature from the zone's signing key. A forged response cannot have a valid signature because the attacker does not have the private key.
        {'\n\n'}
        The limitation of DNSSEC is deployment: it requires every zone in the delegation chain to be signed, and the resolver must enforce validation. Many zones are not DNSSEC-signed, and many resolvers do not enforce validation. Additionally, DNSSEC prevents content tampering but does not encrypt DNS queries — DNS-over-HTTPS and DNS-over-TLS address the privacy concern separately.
      </IQ>

      <IQ q="What is the difference between HTTP and HTTPS? What does the padlock actually guarantee?">
        HTTP (Hypertext Transfer Protocol) sends all data in plaintext — anyone on the network path between client and server can read the full request and response, including cookies, passwords, and page content. An attacker on the same Wi-Fi network can capture this with a packet sniffer.
        {'\n\n'}
        HTTPS is HTTP over TLS (Transport Layer Security). TLS adds three security properties: confidentiality (content is encrypted and cannot be read by network observers), integrity (content cannot be modified in transit without detection), and authentication (the server's certificate proves it is the legitimate owner of the domain).
        {'\n\n'}
        What the padlock guarantees: the connection to the server is encrypted, and the certificate was signed by a Certificate Authority that the browser trusts, for the domain in the address bar. This means a passive observer on the network cannot read the content, and the server is who the domain name says it is.
        {'\n\n'}
        What the padlock does NOT guarantee: the website is safe, legitimate, or trustworthy. Let's Encrypt issues free certificates to any domain owner — phishing sites routinely have valid HTTPS certificates. The padlock means "my connection to this site is encrypted," not "this site is not malicious." A phishing site at https://bank0famerica-secure-login.com will have a padlock. The padlock does not protect against server-side vulnerabilities (SQL injection, XSS), data breaches once data reaches the server, or malware on the client device that reads data before encryption.
      </IQ>

      <IQ q="What is ARP poisoning and what layer of the network does it operate at?">
        ARP (Address Resolution Protocol) poisoning is a Layer 2 (Network Access / Data Link layer) attack that allows an attacker on the same local network segment to intercept, modify, or stop traffic between two other hosts.
        {'\n\n'}
        ARP is the protocol that maps IP addresses to MAC addresses on a local network. When device A wants to send a packet to device B at IP 192.168.1.2, it broadcasts an ARP request: "Who has 192.168.1.2? Tell me your MAC address." Device B responds with its MAC. Device A caches this mapping in its ARP table and sends packets directly to that MAC address. Crucially, ARP is completely unauthenticated — any device can send an ARP reply claiming to have any IP address.
        {'\n\n'}
        In an ARP poisoning attack, the attacker sends unsolicited (gratuitous) ARP replies to both device A and the router, claiming that the attacker's MAC address is associated with both the router's IP and device A's IP. Both devices update their ARP tables with the false mapping. Now, traffic from A to the router goes to the attacker, who can read it, modify it, or drop it before optionally forwarding it to the real router. This is a classic man-in-the-middle position at Layer 2.
        {'\n\n'}
        Mitigations: Dynamic ARP Inspection (DAI) on managed switches validates ARP packets against a DHCP snooping binding table; static ARP entries for critical hosts; network segmentation that limits who shares a Layer 2 broadcast domain; detection tools like arpwatch that monitor for ARP table changes. ARP poisoning is only possible if the attacker is already on the local network segment — it cannot be performed from the internet.
      </IQ>

      <IQ q="What are security-relevant HTTP headers and what attacks does each one prevent?">
        Security-relevant HTTP response headers instruct the browser how to handle the page content and impose restrictions that prevent common web attacks. They are one of the highest-ROI security controls for web applications because they require only server configuration, not code changes.
        {'\n\n'}
        Strict-Transport-Security (HSTS): instructs the browser to only connect to this domain over HTTPS for a specified duration, even if the user types http://. Prevents SSL stripping attacks that downgrade HTTPS connections to HTTP by intercepting the initial unencrypted redirect.
        {'\n\n'}
        Content-Security-Policy (CSP): defines which sources of content (scripts, styles, images, fonts) the browser is permitted to load. A strict CSP like script-src 'self' prevents execution of injected scripts that are not served from the same origin — the primary defence against Cross-Site Scripting (XSS) in modern browsers.
        {'\n\n'}
        X-Frame-Options or frame-ancestors CSP directive: prevents the page from being embedded in an iframe on another site. Stops clickjacking attacks where attackers overlay transparent iframes over their pages to trick users into clicking buttons on the target site.
        {'\n\n'}
        X-Content-Type-Options: nosniff — prevents the browser from interpreting files as a different MIME type than declared. Stops attacks where an attacker uploads an image file containing HTML/JavaScript and forces the browser to execute it.
        {'\n\n'}
        Set-Cookie with HttpOnly, Secure, and SameSite attributes: HttpOnly prevents JavaScript from reading the cookie (stops XSS from stealing session cookies). Secure ensures the cookie is only sent over HTTPS connections. SameSite=Strict prevents the cookie from being sent with cross-origin requests — the primary CSRF mitigation in modern web development.
        {'\n\n'}
        Referrer-Policy: controls what URL is included in the Referer header when users navigate away. Prevents sensitive URL parameters (tokens, IDs) from leaking to third-party analytics and advertisement domains.
      </IQ>

      <HR />

      {/* ── Error Library ── */}
      <Part n="11" title="Common Network Misunderstandings That Create Vulnerabilities" />

      <Err
        msg="HTTPS means the website is secure — I can trust any site with a padlock"
        cause="The padlock icon indicates that the TLS connection to the server is encrypted and that the certificate was signed by a trusted CA for the domain name shown. It says nothing about what the server does with your data, whether the site is legitimate, or whether the server has security vulnerabilities. Certificate Authorities issue certificates to any domain owner who can prove domain control — phishing sites and malware distribution sites routinely use HTTPS with valid certificates. In 2022, over 80% of phishing sites used HTTPS."
        fix="Train users that HTTPS only means 'my connection to this specific domain is encrypted.' Evaluate trust based on the domain name (is it the real domain?), the site's reputation, and what you are being asked to provide. Security awareness training must explicitly break the padlock = safe mental model. For technical defences: HSTS preloading, Certificate Transparency monitoring, and browser extensions that validate certificate history."
      />

      <Err
        msg="Our internal services do not need HTTPS — they are on the internal network and attackers cannot reach them"
        cause="The assumption that the internal network is a trusted environment has been the premise of the now-obsolete perimeter security model. Modern attacks routinely begin with a compromised endpoint or user on the internal network. Once an attacker is inside, plaintext internal HTTP traffic is trivially intercepted via ARP poisoning or by compromising a network device. Internal credentials, session tokens, and sensitive data transmitted over HTTP are accessible to any attacker with internal network access."
        fix="TLS everywhere, including internal services. Certificate management tooling like HashiCorp Vault or cert-manager in Kubernetes makes internal TLS certificates manageable at scale. mTLS (mutual TLS) provides bidirectional authentication — not only does the client verify the server's certificate, but the server verifies the client's — preventing lateral movement via impersonating internal services. Zero Trust architecture explicitly rejects the 'internal = trusted' assumption."
      />

      <Err
        msg="Closing port 80 will prevent attacks — if a port is closed, it is safe"
        cause="Closing unused ports reduces attack surface, but port closure is not a security strategy by itself. Most modern attacks exploit open ports that serve legitimate traffic. Port 443 (HTTPS) is open and necessary — but SQL injection, XSS, authentication bypass, and SSRF all operate through legitimate HTTPS traffic. Port 22 (SSH) is open and necessary — but brute force, credential stuffing, and key theft all attack it. The attack surface is the application running on the open port, not the port itself."
        fix="Close ports that have no legitimate purpose (defence-in-depth, reduces scanner noise). But never mistake port closure for security of the applications behind open ports. Security testing must exercise the applications through the ports they legitimately use. A web application firewall (WAF) inspects traffic on port 443; an IDS inspects traffic on port 22. Port closure is a starting condition, not a destination."
      />

      <Err
        msg="DNS is just infrastructure — attackers do not target DNS"
        cause="DNS is infrastructure, which is precisely why attackers target it — a single DNS hijack gives an attacker redirection capability for every service under the affected domain. Notable DNS attacks: the 2019 Sea Turtle campaign hijacked DNS for government and commercial targets in 13 countries by compromising registrar accounts; BGP route hijacking combined with DNS manipulation redirected cryptocurrency transactions; DNS cache poisoning at ISP level redirects all customers to phishing pages; DNS-based data exfiltration evades many perimeter controls because DNS is a permitted protocol."
        fix="Treat DNS as security-critical infrastructure. Enable registrar-level account MFA. Enable DNSSEC for your domains. Monitor Certificate Transparency logs for unexpected certificates issued for your domains (this detects DNS hijacking via certificate issuance). Monitor DNS records for your domains daily — change alerts on A, MX, and NS records are a free early warning system. Log and monitor internal DNS resolution for DGA indicators and data exfiltration patterns."
      />

      <Err
        msg="TLS 1.0 / 1.1 should be fine — older clients need to connect"
        cause="TLS 1.0 (1999) and TLS 1.1 (2006) have known cryptographic weaknesses: the BEAST, POODLE, and CRIME attacks exploit specific weaknesses in how older TLS versions implement cipher block chaining. These are not theoretical vulnerabilities — exploit code is publicly available. Major browsers deprecated TLS 1.0 and 1.1 in 2020. PCI-DSS 3.1 prohibited TLS 1.0 for payment data. Supporting old TLS versions for 'compatibility' exposes any modern client to forced downgrade attacks."
        fix="Disable TLS 1.0 and 1.1 entirely. Require TLS 1.2 as a minimum and prefer TLS 1.3. TLS 1.3 removes all insecure cipher suites, mandates perfect forward secrecy, and reduces handshake round trips from 2 to 1. Any client still requiring TLS 1.0 is itself a security risk that needs replacement, not an accommodation that should weaken your server configuration. Use SSL Labs (ssllabs.com/ssltest/) to verify your TLS configuration against current best practices."
      />

      {/* ── Key Takeaways ── */}
      <KeyTakeaways items={[
        'The TCP/IP model has four layers (Application, Transport, Internet, Network Access) and each layer is an independent attack surface. A firewall at Layer 3 does not stop ARP poisoning at Layer 2. Match the defence to the layer of the attack.',
        'IP spoofing — forging the source IP address on packets — is trivially easy because the Internet Protocol has no authentication for source addresses. IP addresses cannot be used as proof of identity. BGP hijacking exploits routing protocol trust to redirect internet traffic at scale.',
        'The TCP three-way handshake establishes state on the server. SYN flood attacks exhaust this state by sending SYNs without completing the handshake. Port scanning maps attack surfaces by probing which ports have services listening.',
        'DNS translates names to IP addresses through a chain of resolvers and authoritative servers. DNS cache poisoning injects false records; DNS hijacking modifies authoritative records; subdomain takeover claims abandoned CNAME destinations; DNS exfiltration encodes stolen data as subdomain labels. DNS is involved in almost every attack chain.',
        'TLS provides confidentiality (encryption), integrity (tamper detection), and authentication (certificate verification) for data in transit. It does not protect data at the server, does not validate that the site is legitimate, and does not protect against server-side vulnerabilities. The padlock means the connection is encrypted, not that the site is safe.',
        'HTTP exposes significant information in headers — User-Agent, Referer, cookies, and request paths are all visible to network observers in plaintext HTTP. Security-relevant response headers (HSTS, CSP, X-Frame-Options, X-Content-Type-Options, SameSite cookies) prevent entire classes of attack with simple server configuration.',
        'The TLS handshake uses Diffie-Hellman key exchange to derive session keys that are never transmitted — even a passive observer who recorded the full handshake cannot decrypt the session without the private key. Perfect Forward Secrecy means ephemeral keys are used per session, so compromise of the server private key does not decrypt past sessions.',
        'The complete journey of an HTTPS request crosses seven distinct attack surfaces: DNS resolution, TCP connection, TLS handshake, HTTP request, server processing, HTTP response, and browser rendering. Attackers choose the weakest link — understanding all seven is what separates a security engineer from someone who just knows HTTPS exists.',
        'Certificate Transparency logs record every TLS certificate issued by public CAs. Monitoring CT logs for your domain detects DNS hijacking (new certificates issued for your domain you did not request), shadow IT (subdomains you did not know existed), and certificate misuse.',
        'Network literacy is not optional for security engineers. Firewalls, IDS/IPS, SIEM, packet capture, network-based threat detection — all require understanding what you are looking at. An analyst who cannot read a packet capture cannot do incident response at the network layer.',
      ]} />

      {/* ── Next Module CTA ── */}
      <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 10, padding: '24px', marginTop: 40 }}>
        <p style={{ fontSize: 10, color: 'var(--muted)', letterSpacing: '.12em', textTransform: 'uppercase', fontFamily: 'var(--font-mono)', fontWeight: 700, margin: '0 0 10px' }}>
          What comes next
        </p>
        <p style={{ fontSize: 15, color: 'var(--text)', lineHeight: 1.85, margin: '0 0 20px' }}>
          In <strong>Module 03</strong>, you get hands-on with the operating system every security professional lives in — Linux. File permissions, processes, users, logs, and the specific commands that appear on every incident response and penetration test engagement.
        </p>
        <Link href="/learn/cybersecurity/linux-for-security" style={{ background: C, color: '#fff', padding: '11px 24px', borderRadius: 7, fontWeight: 700, fontSize: 13, textDecoration: 'none', display: 'inline-block' }}>
          Module 03 → Linux for Security Engineers
        </Link>
      </div>

    </LearnLayout>
  )
}
