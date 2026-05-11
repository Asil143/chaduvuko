'use client'

import { useState } from 'react'
import { LearnLayout } from '@/components/content/LearnLayout'
import { KeyTakeaways } from '@/components/content/KeyTakeaways'

const N = '#10b981'

const Part = ({ n, title }: { n: string; title: string }) => (
  <div style={{ marginBottom: 28 }}>
    <p style={{ fontSize: 11, color: N, fontFamily: 'var(--font-mono)', fontWeight: 700, margin: '0 0 8px', letterSpacing: '.1em' }}>// Part {n}</p>
    <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(20px,3vw,30px)', fontWeight: 900, letterSpacing: '-1.5px', color: 'var(--text)', margin: 0 }}>{title}</h2>
  </div>
)
const P = ({ children }: { children: React.ReactNode }) => <p style={{ fontSize: 15, color: 'var(--text)', lineHeight: 1.9, margin: '0 0 18px' }}>{children}</p>
const H = ({ children }: { children: React.ReactNode }) => <h3 style={{ fontSize: 17, fontWeight: 700, color: 'var(--text)', margin: '32px 0 12px' }}>{children}</h3>
const Hl = ({ children }: { children: React.ReactNode }) => <strong style={{ color: N }}>{children}</strong>
const HR = () => <div style={{ borderTop: '1px solid var(--border)', margin: '48px 0' }} />
const ProTip = ({ children }: { children: React.ReactNode }) => (
  <div style={{ background: `${N}08`, border: `1px solid ${N}20`, borderRadius: 10, padding: '16px 20px', margin: '24px 0' }}>
    <p style={{ fontSize: 11, fontWeight: 700, color: N, fontFamily: 'var(--font-mono)', textTransform: 'uppercase', letterSpacing: '.1em', margin: '0 0 8px' }}>Pro Tip</p>
    <p style={{ fontSize: 14, color: 'var(--text)', lineHeight: 1.85, margin: 0 }}>{children}</p>
  </div>
)
const Err = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <div style={{ background: '#ef444408', border: '1px solid #ef444430', borderRadius: 10, padding: '16px 20px', margin: '24px 0' }}>
    <p style={{ fontSize: 11, fontWeight: 700, color: '#ef4444', fontFamily: 'var(--font-mono)', textTransform: 'uppercase', letterSpacing: '.1em', margin: '0 0 8px' }}>Common Mistake — {title}</p>
    <p style={{ fontSize: 14, color: 'var(--text)', lineHeight: 1.85, margin: 0 }}>{children}</p>
  </div>
)
const IQ = ({ q, children }: { q: string; children: React.ReactNode }) => (
  <div style={{ marginBottom: 40 }}>
    <div style={{ background: `${N}10`, border: `1px solid ${N}25`, borderRadius: '8px 8px 0 0', padding: '14px 18px', fontSize: 14, fontWeight: 700, color: 'var(--text)' }}>Q: {q}</div>
    <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderTop: 'none', borderRadius: '0 0 8px 8px', padding: '18px', fontSize: 14, color: 'var(--text)', lineHeight: 1.9 }}>{children}</div>
  </div>
)
const TimeBlock = ({ time, label, children }: { time: string; label: string; children: React.ReactNode }) => (
  <div style={{ display: 'flex', gap: 20, marginBottom: 28 }}>
    <div style={{ flexShrink: 0, textAlign: 'right', width: 100 }}>
      <div style={{ fontSize: 12, fontWeight: 700, color: N, fontFamily: 'var(--font-mono)' }}>{time}</div>
    </div>
    <div style={{ flex: 1, borderLeft: `2px solid ${N}30`, paddingLeft: 20, paddingBottom: 8 }}>
      <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--text)', marginBottom: 6 }}>{label}</div>
      <div style={{ fontSize: 14, color: 'var(--muted)', lineHeight: 1.8 }}>{children}</div>
    </div>
  </div>
)
const Term = ({ t, children }: { t: string; children: React.ReactNode }) => (
  <div style={{ display: 'flex', gap: 12, marginBottom: 16, alignItems: 'flex-start' }}>
    <code style={{ fontSize: 12, background: `${N}15`, color: N, padding: '3px 8px', borderRadius: 5, flexShrink: 0, marginTop: 2 }}>{t}</code>
    <span style={{ fontSize: 14, color: 'var(--muted)', lineHeight: 1.7 }}>{children}</span>
  </div>
)

const recordTypes = [
  { type: 'A', description: 'Maps hostname to IPv4 address', example: 'example.com. A 93.184.216.34' },
  { type: 'AAAA', description: 'Maps hostname to IPv6 address', example: 'example.com. AAAA 2606:2800:220:1:248:1893:25c8:1946' },
  { type: 'CNAME', description: 'Alias pointing to another hostname', example: 'www.example.com. CNAME example.com.' },
  { type: 'MX', description: 'Mail exchange server (with priority)', example: 'example.com. MX 10 mail.example.com.' },
  { type: 'NS', description: 'Authoritative name servers for a zone', example: 'example.com. NS ns1.example.com.' },
  { type: 'TXT', description: 'Arbitrary text; used for SPF, DKIM, DMARC, verification', example: 'example.com. TXT "v=spf1 include:_spf.google.com ~all"' },
  { type: 'SOA', description: 'Start of Authority — zone metadata (serial, refresh, retry, expire, TTL)', example: 'example.com. SOA ns1.example.com. admin.example.com. 2026051101 3600 900 604800 300' },
  { type: 'PTR', description: 'Reverse lookup: IP to hostname', example: '34.216.184.93.in-addr.arpa. PTR example.com.' },
  { type: 'SRV', description: 'Service location records with port, weight, priority', example: '_http._tcp.example.com. SRV 10 5 80 web.example.com.' },
  { type: 'CAA', description: 'Restrict which CAs can issue certificates for the domain', example: 'example.com. CAA 0 issue "letsencrypt.org"' },
]

function DNSRecordExplorer() {
  const [selected, setSelected] = useState<string | null>(null)
  const entry = recordTypes.find(r => r.type === selected)

  return (
    <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 12, padding: 24, margin: '32px 0' }}>
      <p style={{ fontSize: 13, fontWeight: 700, color: N, fontFamily: 'var(--font-mono)', margin: '0 0 16px', textTransform: 'uppercase', letterSpacing: '.1em' }}>DNS Record Types</p>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 20 }}>
        {recordTypes.map(r => (
          <button key={r.type} onClick={() => setSelected(selected === r.type ? null : r.type)} style={{ background: selected === r.type ? N : 'var(--bg)', color: selected === r.type ? '#000' : 'var(--text)', border: `1px solid ${selected === r.type ? N : 'var(--border)'}`, borderRadius: 6, padding: '6px 12px', fontSize: 13, fontWeight: 700, cursor: 'pointer', fontFamily: 'var(--font-mono)' }}>{r.type}</button>
        ))}
      </div>
      {entry ? (
        <div style={{ background: 'var(--bg)', border: '1px solid var(--border)', borderRadius: 8, padding: 16 }}>
          <div style={{ fontSize: 14, fontWeight: 700, color: N, marginBottom: 8 }}>{entry.type} Record</div>
          <div style={{ fontSize: 14, color: 'var(--text)', marginBottom: 12 }}>{entry.description}</div>
          <code style={{ fontSize: 12, background: `${N}10`, color: N, padding: '8px 12px', borderRadius: 6, display: 'block', fontFamily: 'var(--font-mono)', lineHeight: 1.6 }}>{entry.example}</code>
        </div>
      ) : (
        <div style={{ fontSize: 13, color: 'var(--muted)', textAlign: 'center', padding: '20px 0' }}>Click a record type to see details and example</div>
      )}
    </div>
  )
}

function DNSResolutionSim() {
  const [step, setStep] = useState(0)

  const steps = [
    { actor: '🖥 Browser', msg: 'Check local cache', detail: 'Has the OS seen www.example.com recently? Check /etc/hosts, then the OS DNS cache (nscd, systemd-resolved, or Windows DNS Client service). Cache hit → done immediately.' },
    { actor: '📡 Recursive Resolver (ISP/8.8.8.8)', msg: 'Query received', detail: 'The OS sends the query to the configured recursive resolver (ISP DNS or 8.8.8.8). The resolver checks its own cache. Cache hit → return answer. Cache miss → start recursive resolution.' },
    { actor: '🌐 Root Nameserver', msg: 'Resolver asks root: who handles .com?', detail: 'The resolver queries one of 13 root nameserver clusters (a.root-servers.net through m.root-servers.net). The root returns NS records pointing to the .com TLD nameservers.' },
    { actor: '🌐 .com TLD Nameserver', msg: 'Resolver asks TLD: who handles example.com?', detail: 'The resolver queries Verisign\'s .com TLD nameservers. They return NS records for example.com\'s authoritative nameservers (e.g., ns1.example.com).' },
    { actor: '🌐 Authoritative NS (ns1.example.com)', msg: 'Resolver queries authoritative server', detail: 'The resolver queries ns1.example.com. This is the server that holds the actual DNS zone data. It returns the A record: www.example.com. A 93.184.216.34, TTL 3600.' },
    { actor: '📡 Recursive Resolver', msg: 'Cache result + return to client', detail: 'Resolver caches the answer for TTL=3600 seconds. Returns 93.184.216.34 to the OS. OS caches it. Browser connects to 93.184.216.34:443.' },
  ]

  return (
    <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 12, padding: 24, margin: '32px 0' }}>
      <p style={{ fontSize: 13, fontWeight: 700, color: N, fontFamily: 'var(--font-mono)', margin: '0 0 4px', textTransform: 'uppercase', letterSpacing: '.1em' }}>DNS Resolution Walkthrough</p>
      <p style={{ fontSize: 13, color: 'var(--muted)', margin: '0 0 16px' }}>Resolving www.example.com — cold cache</p>

      <div style={{ minHeight: 180, marginBottom: 16 }}>
        {steps.slice(0, step).map((s, i) => (
          <div key={i} style={{ display: 'flex', gap: 12, marginBottom: 10 }}>
            <div style={{ fontSize: 14, flexShrink: 0 }}>{s.actor.split(' ')[0]}</div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--text)' }}>{s.msg}</div>
              {i === step - 1 && <div style={{ fontSize: 12, color: 'var(--muted)', marginTop: 4, background: `${N}06`, borderRadius: 6, padding: '6px 10px' }}>{s.detail}</div>}
            </div>
          </div>
        ))}
        {step === 0 && <div style={{ fontSize: 13, color: 'var(--muted)', textAlign: 'center', paddingTop: 60 }}>Click Next to trace a DNS lookup from scratch</div>}
      </div>

      <div style={{ display: 'flex', gap: 10 }}>
        <button onClick={() => setStep(s => Math.max(0, s - 1))} disabled={step === 0} style={{ background: 'transparent', color: 'var(--muted)', border: '1px solid var(--border)', borderRadius: 6, padding: '7px 16px', fontSize: 13, cursor: step === 0 ? 'default' : 'pointer', opacity: step === 0 ? 0.4 : 1 }}>← Back</button>
        <button onClick={() => setStep(s => Math.min(steps.length, s + 1))} disabled={step >= steps.length} style={{ background: N, color: '#000', border: 'none', borderRadius: 6, padding: '7px 16px', fontSize: 13, fontWeight: 700, cursor: step >= steps.length ? 'default' : 'pointer', opacity: step >= steps.length ? 0.5 : 1 }}>Next →</button>
        <button onClick={() => setStep(0)} style={{ background: 'transparent', color: 'var(--muted)', border: '1px solid var(--border)', borderRadius: 6, padding: '7px 16px', fontSize: 13, cursor: 'pointer' }}>Reset</button>
      </div>
    </div>
  )
}

export default function DNSModule() {
  return (
    <LearnLayout
      title="DNS — The Internet's Phone Book"
      description="Every URL you visit, every API call you make, starts with a DNS lookup. DNS is why you type names instead of IP addresses — and understanding it deeply makes you a better engineer."
      section="Networking Fundamentals"
      readTime="22 min"
      updatedAt="May 2026"
    >
      <Part n="01" title="What DNS Is and Why It Exists" />
      <P>
        The internet runs on IP addresses. Computers route packets to 93.184.216.34, not to "example.com." But humans can't remember 4-billion possible IPv4 addresses, let alone 128-bit IPv6 addresses. <Hl>DNS — Domain Name System</Hl>, defined in RFCs 1034 and 1035 (1987), is the distributed, hierarchical database that maps human-readable hostnames to machine-readable IP addresses (and much more).
      </P>
      <P>
        DNS is the most critical infrastructure protocol on the internet. When DNS fails, everything fails — even services whose IPs haven't changed. On average, each web page load triggers 20–30 DNS queries. Modern browsers make HTTPS connections to dozens of domains per page. DNS must be fast (&lt;10 ms from cache, &lt;100 ms from resolver), highly available (redundant nameservers globally), and increasingly secure (DNSSEC, DoH, DoT).
      </P>

      <H>The DNS Hierarchy</H>
      <P>
        DNS is organized as a tree. At the top is the <Hl>root zone</Hl> (".") — 13 root nameserver clusters (actually hundreds of anycast nodes) maintained by IANA and operated by various organizations (Verisign, ICANN, NASA, etc.). Below root are <Hl>TLD nameservers</Hl> — .com, .org, .net, .uk, country codes, new gTLDs. Below TLDs are <Hl>authoritative nameservers</Hl> for individual domains — maintained by domain owners or their DNS providers (Route 53, Cloudflare DNS, NS1). The domain www.example.com is read right-to-left: . (root) → com (TLD) → example (second-level domain) → www (subdomain/hostname).
      </P>

      <DNSResolutionSim />

      <HR />
      <Part n="02" title="DNS Record Types" />

      <DNSRecordExplorer />

      <H>TTL and Caching</H>
      <P>
        Each DNS record has a <Hl>TTL (Time To Live)</Hl> in seconds — how long resolvers and clients should cache the answer. Low TTL (60–300 seconds): fast propagation for records you change frequently (DNS failover, blue-green deployments). High TTL (3600–86400 seconds): better cache hit rates, less resolver load, faster resolution. The rule of thumb: lower TTL before a planned change, make the change, then raise TTL back.
      </P>
      <P>
        When you change a DNS record, the old value persists in caches until their TTL expires. If your current A record has TTL=86400 and you change it, some clients will use the old IP for up to 24 hours. This is why production DNS changes require planning: lower TTL to 60 seconds 24 hours before the change, verify propagation, make the change, wait for all old TTL-86400 caches to expire (~24 hours), then raise TTL back.
      </P>

      <HR />
      <Part n="03" title="DNSSEC, DoH, and DoT" />

      <H>DNSSEC: Signing DNS Responses</H>
      <P>
        Standard DNS has no authentication — a man-in-the-middle can inject forged DNS responses (DNS spoofing / cache poisoning). <Hl>DNSSEC (DNS Security Extensions)</Hl> adds cryptographic signatures to DNS records. Each zone signs its records with a Zone Signing Key (ZSK); the zone's public key is published as a DNSKEY record; the parent zone signs the child's DS record, creating a chain of trust from the root. A DNSSEC-validating resolver verifies the signature chain before accepting responses. DNSSEC prevents response forgery but doesn't encrypt queries (they're still visible to network observers).
      </P>

      <H>DNS over HTTPS (DoH) and DNS over TLS (DoT)</H>
      <P>
        Traditional DNS queries are sent in plaintext UDP — anyone on the network path (ISP, network admin, attacker on shared Wi-Fi) can see every domain you resolve. <Hl>DNS over TLS (DoT)</Hl> — RFC 7858 — sends DNS queries over a TLS-encrypted TCP connection to port 853. <Hl>DNS over HTTPS (DoH)</Hl> — RFC 8484 — sends DNS queries as HTTPS requests to port 443, indistinguishable from regular web traffic. DoH is now the default in Chrome, Firefox, and Windows 11 when using compatible resolvers (Cloudflare 1.1.1.1, Google 8.8.8.8, NextDNS).
      </P>

      <Err title="Assuming DNS is fast when it's not cached">
        DNS from cache takes &lt;1 ms. DNS requiring a full recursive lookup (root → TLD → authoritative) takes 50–200+ ms on a cold cache. Applications that make DNS lookups on every request without caching responses can add hundreds of milliseconds of latency. Always implement DNS caching at the application layer for performance-critical paths, and be aware that TTLs represent the maximum cache time — some resolvers honor TTL precisely, others apply minimum TTLs.
      </Err>

      <HR />
      <Part n="04" title="A Day in the Life: DNS Outage" />

      <TimeBlock time="10:15 AM" label="Monitoring alert: 100% error rate on all services">
        Every service shows errors. SSH to app servers works (IP-based). curl to the same servers by hostname fails. DNS resolution is broken.
      </TimeBlock>
      <TimeBlock time="10:18 AM" label="Diagnose with dig">
        Run <code style={{ fontSize: 12 }}>dig @8.8.8.8 api.example.com</code> — works. Run <code style={{ fontSize: 12 }}>dig api.example.com</code> — SERVFAIL. The default resolver (10.0.0.2, internal DNS server) is failing. The internal DNS server handles split-horizon DNS for private addresses.
      </TimeBlock>
      <TimeBlock time="10:23 AM" label="Find the root cause">
        The internal DNS server (10.0.0.2) is unresponsive. Check the server — disk full (99.8%). The DNS server logs filled the disk, causing the daemon to crash. Failed health checks weren't alerting because the health check server also used the same DNS server for its hostname lookup.
      </TimeBlock>
      <TimeBlock time="10:30 AM" label="Mitigation and prevention">
        Free disk space (delete old logs). Restart DNS daemon. Services recover within 30 seconds as resolvers repopulate caches. Post-incident: add redundant secondary DNS server, configure /etc/resolv.conf with both primary and fallback. Implement disk space alerting at 80% threshold. Use IP-based health checks for DNS servers.
      </TimeBlock>

      <HR />
      <Part n="05" title="Interview Questions" />

      <IQ q="Walk through what happens when you type 'google.com' and press Enter.">
        (1) Browser checks its own DNS cache. (2) OS checks /etc/hosts, then its DNS cache. (3) OS resolver sends UDP query to configured DNS server (e.g., 8.8.8.8). (4) If not cached: recursive resolver queries root nameservers → .com TLD nameservers → google.com authoritative nameservers (ns1.google.com etc.). (5) Returns A/AAAA records with TTL. (6) OS caches result. Browser connects to the IP via TCP+TLS. (7) Browser sends HTTPS GET /. Full resolution from cold cache takes 50–200ms; from cache, &lt;1ms.
      </IQ>

      <IQ q="What's the difference between authoritative and recursive DNS servers?">
        An authoritative DNS server holds the actual zone data for a domain — it returns definitive answers for records in zones it's responsible for. Authoritative servers are managed by domain owners or their DNS providers. A recursive resolver (also called a caching resolver) accepts queries from clients and performs the full resolution process on their behalf, querying root → TLD → authoritative servers and caching results. Your ISP's DNS, 8.8.8.8, and 1.1.1.1 are recursive resolvers. Authoritative servers don't accept recursive queries; recursive resolvers cache answers from authoritative servers.
      </IQ>

      <IQ q="What is a DNS cache poisoning attack and how does DNSSEC prevent it?">
        DNS cache poisoning: an attacker races to inject a forged DNS response into a resolver's cache before the legitimate response arrives. Classic Kaminsky attack (2008): an attacker sends many spoofed responses with different transaction IDs and source ports while flooding the resolver with queries for random subdomains of the target domain. If any spoofed response matches the query ID and port, it's cached — redirecting all users of that resolver to the attacker's IP. DNSSEC prevents this by signing all DNS responses with cryptographic signatures. The resolver validates the signature using the published public key chain (trusting the root of trust). A spoofed response without a valid signature is rejected, regardless of arriving first.
      </IQ>

      <HR />
      <Part n="06" title="Key Terminology" />
      <Term t="Recursive resolver">DNS server that performs full resolution on behalf of clients, caching results. ISP DNS, 8.8.8.8, 1.1.1.1.</Term>
      <Term t="Authoritative NS">DNS server holding the actual zone data for a domain. Returns definitive answers, not cached.</Term>
      <Term t="TTL">Time To Live — how long a DNS answer should be cached. Low TTL = fast propagation; high TTL = better caching.</Term>
      <Term t="DNSSEC">DNS Security Extensions — cryptographic signatures on DNS records to prevent cache poisoning.</Term>
      <Term t="DoH / DoT">DNS over HTTPS / DNS over TLS — encrypted DNS to prevent ISP/attacker visibility into DNS queries.</Term>
      <Term t="SOA">Start of Authority — zone metadata including primary NS, admin email, serial number, and negative TTL.</Term>

      <KeyTakeaways items={[
        'DNS maps hostnames to IP addresses using a hierarchical distributed database: root → TLD → authoritative nameservers.',
        'Recursive resolvers (ISP DNS, 8.8.8.8) do the lookup work; authoritative servers hold the actual zone data.',
        'TTL controls how long records are cached — lower TTL before planned changes, raise it back after.',
        'Standard DNS is plaintext; DNSSEC adds signatures for integrity, DoH/DoT add encryption for privacy.',
        'DNS resolution from cache is &lt;1ms; cold recursive lookup is 50–200ms — application-layer caching matters.',
        'DNS cache poisoning (Kaminsky attack) injects forged records into resolvers; DNSSEC defeats it with cryptographic signatures.',
      ]} />
    </LearnLayout>
  )
}
