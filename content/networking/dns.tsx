'use client'

import { useState } from 'react'
import { LearnLayout } from '@/components/content/LearnLayout'
import { KeyTakeaways } from '@/components/content/KeyTakeaways'

const G = '#10b981'
const Chapter = ({ n }: { n: number }) => (
  <p style={{ fontSize: 11, color: G, fontFamily: 'var(--font-mono)', fontWeight: 700, margin: '0 0 6px', letterSpacing: '.12em', textTransform: 'uppercase' }}>// Chapter {n}</p>
)
const Divider = () => <div style={{ borderTop: '1px solid var(--border)', margin: '52px 0' }} />
const Para = ({ children }: { children: React.ReactNode }) => <p style={{ fontSize: 15, color: 'var(--text)', lineHeight: 1.9, margin: '0 0 18px' }}>{children}</p>
const H2 = ({ children }: { children: React.ReactNode }) => <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(20px,3vw,28px)', fontWeight: 900, letterSpacing: '-1px', color: 'var(--text)', margin: '0 0 20px' }}>{children}</h2>
const H3 = ({ children }: { children: React.ReactNode }) => <h3 style={{ fontSize: 17, fontWeight: 700, color: 'var(--text)', margin: '28px 0 12px' }}>{children}</h3>
const Accent = ({ children }: { children: React.ReactNode }) => <strong style={{ color: G }}>{children}</strong>
const Code = ({ children }: { children: React.ReactNode }) => <code style={{ fontFamily: 'var(--font-mono)', fontSize: 13, background: 'var(--code-bg)', padding: '2px 6px', borderRadius: 4, color: G }}>{children}</code>
const CodeBlock = ({ children }: { children: React.ReactNode }) => (
  <pre style={{ fontFamily: 'var(--font-mono)', fontSize: 13, background: 'var(--code-bg)', border: '1px solid var(--border)', borderRadius: 10, padding: '20px 24px', overflowX: 'auto', margin: '20px 0', lineHeight: 1.7, color: 'var(--text)' }}>{children}</pre>
)
const StoryBox = ({ children }: { children: React.ReactNode }) => (
  <div style={{ background: `${G}08`, border: `1px solid ${G}22`, borderRadius: 12, padding: '20px 24px', margin: '24px 0' }}>
    <p style={{ fontSize: 11, fontWeight: 700, color: G, fontFamily: 'var(--font-mono)', textTransform: 'uppercase', letterSpacing: '.1em', margin: '0 0 10px' }}>Story</p>
    <div style={{ fontSize: 15, color: 'var(--text)', lineHeight: 1.85 }}>{children}</div>
  </div>
)
const WowBox = ({ children }: { children: React.ReactNode }) => (
  <div style={{ background: '#8b5cf608', border: '1px solid #8b5cf630', borderRadius: 12, padding: '20px 24px', margin: '24px 0' }}>
    <p style={{ fontSize: 11, fontWeight: 700, color: '#8b5cf6', fontFamily: 'var(--font-mono)', textTransform: 'uppercase', letterSpacing: '.1em', margin: '0 0 10px' }}>Wow</p>
    <div style={{ fontSize: 15, color: 'var(--text)', lineHeight: 1.85 }}>{children}</div>
  </div>
)
const Warn = ({ children }: { children: React.ReactNode }) => (
  <div style={{ background: '#f59e0b08', border: '1px solid #f59e0b30', borderRadius: 12, padding: '20px 24px', margin: '24px 0' }}>
    <p style={{ fontSize: 11, fontWeight: 700, color: '#f59e0b', fontFamily: 'var(--font-mono)', textTransform: 'uppercase', letterSpacing: '.1em', margin: '0 0 10px' }}>Caution</p>
    <div style={{ fontSize: 15, color: 'var(--text)', lineHeight: 1.85 }}>{children}</div>
  </div>
)
const Err = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <div style={{ background: '#ef444408', border: '1px solid #ef444430', borderRadius: 12, padding: '20px 24px', margin: '24px 0' }}>
    <p style={{ fontSize: 11, fontWeight: 700, color: '#ef4444', fontFamily: 'var(--font-mono)', textTransform: 'uppercase', letterSpacing: '.1em', margin: '0 0 10px' }}>Misconception — {title}</p>
    <div style={{ fontSize: 15, color: 'var(--text)', lineHeight: 1.85 }}>{children}</div>
  </div>
)
const IQ = ({ level, children }: { level: 'Beginner' | 'Intermediate' | 'Senior' | 'PhD'; children: React.ReactNode }) => {
  const colors: Record<string, string> = { Beginner: '#10b981', Intermediate: '#3b82f6', Senior: '#8b5cf6', PhD: '#f97316' }
  const c = colors[level]
  return (
    <div style={{ background: `${c}08`, border: `1px solid ${c}30`, borderRadius: 12, padding: '20px 24px', margin: '24px 0' }}>
      <p style={{ fontSize: 11, fontWeight: 700, color: c, fontFamily: 'var(--font-mono)', textTransform: 'uppercase', letterSpacing: '.1em', margin: '0 0 10px' }}>IQ — {level}</p>
      <div style={{ fontSize: 15, color: 'var(--text)', lineHeight: 1.85 }}>{children}</div>
    </div>
  )
}

// ── Component 1: DNS Resolution Walkthrough ───────────────────────────────────
interface ResolutionStep { id: number; from: string; to: string; query: string; response: string; note: string }
const RESOLUTION_STEPS: ResolutionStep[] = [
  { id: 1, from: 'Browser', to: 'OS Stub Resolver', query: 'A www.example.com?', response: 'Check hosts file, local cache', note: 'OS stub resolver checks /etc/hosts first, then its own DNS cache (TTL-based). Cache hit = done in microseconds, no network hop.' },
  { id: 2, from: 'OS Stub Resolver', to: 'Recursive Resolver (8.8.8.8)', query: 'A www.example.com? (RD=1)', response: 'I will find it — recursion desired', note: 'The recursive (full-service) resolver does all iterative work on your behalf. Its large shared cache serves millions of users — a cache hit here is common and free.' },
  { id: 3, from: 'Recursive Resolver', to: 'Root Name Server (.)', query: 'A www.example.com?', response: 'Referral: .com NS → a.gtld-servers.net', note: 'Root servers know nothing about specific domains — they only store NS delegations for each TLD. 13 root server IP addresses, 1500+ anycast instances worldwide.' },
  { id: 4, from: 'Recursive Resolver', to: '.com TLD Server', query: 'A www.example.com?', response: 'Referral: example.com NS → ns1.example.com', note: 'TLD server returns NS records for the second-level domain plus glue A records (IP of ns1.example.com) to avoid infinite loop.' },
  { id: 5, from: 'Recursive Resolver', to: 'Auth NS (ns1.example.com)', query: 'A www.example.com?', response: 'A 93.184.216.34 TTL 3600 (AA=1)', note: 'Authoritative answer — AA flag set. This server owns the zone data. The resolver caches this and all intermediate records for their respective TTLs.' },
  { id: 6, from: 'Recursive Resolver', to: 'Browser', query: '—', response: 'A 93.184.216.34 (cached, TTL 3600)', note: 'Recursive resolver returns the cached answer. All subsequent clients asking the same question get a cached response instantly until TTL expires.' },
]

function DnsResolutionWalkthrough() {
  const [active, setActive] = useState<number | null>(null)
  return (
    <div style={{ border: '1px solid var(--border)', borderRadius: 14, padding: '28px 24px', margin: '32px 0' }}>
      <p style={{ fontSize: 13, fontWeight: 700, color: G, fontFamily: 'var(--font-mono)', textTransform: 'uppercase', letterSpacing: '.1em', margin: '0 0 18px' }}>DNS Resolution Walkthrough — click any step</p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 6, marginBottom: 20 }}>
        {RESOLUTION_STEPS.map(s => (
          <div key={s.id} onClick={() => setActive(active === s.id ? null : s.id)}
            style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '11px 14px', borderRadius: 8, border: `1px solid ${active === s.id ? G : 'var(--border)'}`, background: active === s.id ? `${G}10` : 'transparent', cursor: 'pointer', transition: 'all 0.15s' }}>
            <span style={{ fontSize: 11, color: G, fontFamily: 'var(--font-mono)', fontWeight: 700, minWidth: 20 }}>{s.id}.</span>
            <span style={{ fontSize: 13, color: 'var(--text)', flex: 1 }}><strong style={{ color: G }}>{s.from}</strong> → <strong style={{ color: '#8b5cf6' }}>{s.to}</strong></span>
            <span style={{ fontSize: 11, color: '#6b7280', fontFamily: 'var(--font-mono)', flexShrink: 0, display: 'none' }}>{s.query}</span>
          </div>
        ))}
      </div>
      {active !== null && (() => {
        const s = RESOLUTION_STEPS.find(x => x.id === active)!
        return (
          <div style={{ background: `${G}08`, border: `1px solid ${G}22`, borderRadius: 10, padding: '16px 18px' }}>
            <p style={{ fontSize: 12, fontWeight: 700, color: G, fontFamily: 'var(--font-mono)', textTransform: 'uppercase', letterSpacing: '.08em', margin: '0 0 10px' }}>Step {s.id}: {s.from} → {s.to}</p>
            <p style={{ fontSize: 14, color: 'var(--text)', lineHeight: 1.65, margin: '0 0 6px' }}><strong>Query:</strong> {s.query}</p>
            <p style={{ fontSize: 14, color: 'var(--text)', lineHeight: 1.65, margin: '0 0 10px' }}><strong>Response:</strong> {s.response}</p>
            <p style={{ fontSize: 13, color: '#a3a3a3', lineHeight: 1.65, margin: 0, fontStyle: 'italic', borderTop: '1px solid var(--border)', paddingTop: 10 }}>{s.note}</p>
          </div>
        )
      })()}
    </div>
  )
}

// ── Component 2: DNS Record Type Explorer ─────────────────────────────────────
interface DnsRecord { type: string; description: string; example: string; ttlNote: string; useCase: string }
const DNS_RECORDS: DnsRecord[] = [
  { type: 'A', description: 'Maps a hostname to an IPv4 address. The most fundamental record — the final answer in most DNS lookups.', example: 'www.example.com. 3600 IN A 93.184.216.34', ttlNote: 'TTL 300–3600s typical. Low for fast failover; high for cache efficiency.', useCase: 'Web servers, API endpoints, any IPv4-addressed service' },
  { type: 'AAAA', description: 'Maps a hostname to an IPv6 address (128-bit, quad-A name because it is 4× larger than an A record).', example: 'www.example.com. 3600 IN AAAA 2606:2800:220:1:248:1893:25c8:1946', ttlNote: 'Same considerations as A. Always publish both A and AAAA for dual-stack services.', useCase: 'IPv6-accessible services; dual-stack deployments; modern CDN endpoints' },
  { type: 'CNAME', description: 'Canonical Name — aliases one hostname to another. The target must resolve to an A/AAAA record. Cannot exist alongside other record types at the same name.', example: 'blog.example.com. 3600 IN CNAME example.com.', ttlNote: 'Each CNAME hop adds one DNS lookup. Avoid deep chains.', useCase: 'CDN integration, subdomain aliasing, www → apex redirects' },
  { type: 'MX', description: 'Mail Exchanger — which server receives email for the domain. Priority value (lower = preferred) enables failover routing.', example: 'example.com. 3600 IN MX 10 mail1.example.com.\nexample.com. 3600 IN MX 20 mail2.example.com.', ttlNote: 'High TTL (3600–86400s) — mail routing rarely changes, cache efficiency is valuable.', useCase: 'Email routing; Google Workspace, Office 365, Postfix configuration' },
  { type: 'TXT', description: 'Arbitrary text data. Used for machine-readable configuration: email security policies, domain verification tokens, and service metadata.', example: 'example.com. IN TXT "v=spf1 include:_spf.google.com ~all"\n_dmarc.example.com. IN TXT "v=DMARC1; p=reject"', ttlNote: 'SPF/DMARC: 3600s. Verification tokens can be long-lived (86400s).', useCase: 'SPF, DKIM, DMARC email security; domain ownership verification; ACME DNS challenges' },
  { type: 'NS', description: 'Name Server — delegates the zone to specific authoritative servers. Must exist at every zone apex.', example: 'example.com. 172800 IN NS ns1.example.com.\nexample.com. 172800 IN NS ns2.example.com.', ttlNote: 'High TTL (86400–172800s) — NS records are heavily cached at TLD servers and rarely change.', useCase: 'Zone delegation; pointing to DNS hosting (Route53, Cloudflare, NS1)' },
  { type: 'SOA', description: 'Start of Authority — metadata for the zone: primary NS, admin contact, serial number, timing parameters, negative cache TTL.', example: 'example.com. IN SOA ns1.example.com. admin.example.com. 2024012001 3600 900 604800 300', ttlNote: 'Serial must increment on every zone change (YYYYMMDDNN format is conventional).', useCase: 'Zone administration; secondary synchronization; NXDOMAIN caching TTL control' },
  { type: 'PTR', description: 'Pointer — reverse DNS. Maps IP → hostname. Lives in in-addr.arpa (IPv4) or ip6.arpa (IPv6). Requires delegation from IP space owner.', example: '34.216.184.93.in-addr.arpa. 3600 IN PTR www.example.com.', ttlNote: 'Requires your hosting provider or ISP to delegate the reverse zone to you.', useCase: 'Email server validation (spam filters), logging, security monitoring' },
  { type: 'CAA', description: 'Certification Authority Authorization — which CAs may issue TLS certificates for the domain. Prevents unauthorized certificate issuance by rogue CAs.', example: 'example.com. 3600 IN CAA 0 issue "letsencrypt.org"\nexample.com. 3600 IN CAA 0 iodef "mailto:security@example.com"', ttlNote: 'Set once and rarely changed. CAs must check before issuing.', useCase: 'Restrict certificate issuance to specific CAs; defense against unauthorized certs' },
]

function DnsRecordExplorer() {
  const [sel, setSel] = useState('A')
  const active = DNS_RECORDS.find(r => r.type === sel)!
  return (
    <div style={{ border: '1px solid var(--border)', borderRadius: 14, padding: '28px 24px', margin: '32px 0' }}>
      <p style={{ fontSize: 13, fontWeight: 700, color: G, fontFamily: 'var(--font-mono)', textTransform: 'uppercase', letterSpacing: '.1em', margin: '0 0 18px' }}>DNS Record Type Explorer</p>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 7, marginBottom: 22 }}>
        {DNS_RECORDS.map(r => (
          <button key={r.type} onClick={() => setSel(r.type)}
            style={{ padding: '6px 14px', borderRadius: 8, border: `1px solid ${sel === r.type ? G : 'var(--border)'}`, background: sel === r.type ? `${G}15` : 'transparent', color: sel === r.type ? G : 'var(--text)', fontSize: 13, fontWeight: 700, cursor: 'pointer', fontFamily: 'var(--font-mono)' }}>
            {r.type}
          </button>
        ))}
      </div>
      <div style={{ background: `${G}07`, border: `1px solid ${G}22`, borderRadius: 10, padding: '18px 20px' }}>
        <p style={{ fontSize: 14, fontWeight: 700, color: G, fontFamily: 'var(--font-mono)', margin: '0 0 10px' }}>{active.type} Record</p>
        <p style={{ fontSize: 14, color: 'var(--text)', lineHeight: 1.65, margin: '0 0 14px' }}>{active.description}</p>
        <p style={{ fontSize: 11, fontWeight: 700, color: '#6b7280', fontFamily: 'var(--font-mono)', textTransform: 'uppercase', letterSpacing: '.08em', margin: '0 0 6px' }}>Example</p>
        <pre style={{ fontFamily: 'var(--font-mono)', fontSize: 12, background: 'var(--code-bg)', borderRadius: 8, padding: '12px 14px', overflowX: 'auto', margin: '0 0 14px', lineHeight: 1.6, color: 'var(--text)' }}>{active.example}</pre>
        <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
          {[{ label: 'TTL Note', val: active.ttlNote }, { label: 'Use Case', val: active.useCase }].map(f => (
            <div key={f.label} style={{ flex: 1, minWidth: 180, background: 'var(--code-bg)', borderRadius: 8, padding: '10px 12px' }}>
              <p style={{ fontSize: 11, fontWeight: 700, color: '#6b7280', fontFamily: 'var(--font-mono)', textTransform: 'uppercase', letterSpacing: '.06em', margin: '0 0 4px' }}>{f.label}</p>
              <p style={{ fontSize: 13, color: 'var(--text)', lineHeight: 1.5, margin: 0 }}>{f.val}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

// ── Component 3: DNSSEC Chain of Trust ────────────────────────────────────────
interface DnssecLevel { id: string; zone: string; record: string; signs: string; note: string }
const DNSSEC_CHAIN: DnssecLevel[] = [
  { id: 'root', zone: 'Root Zone (.)', record: 'Trust Anchor DNSKEY — hardcoded in every validating resolver', signs: '.com KSK via DS record', note: 'The root KSK was rolled for the first time in October 2018 — a coordinated global event. Misconfigured resolvers that failed to update would have lost DNS resolution for the entire internet.' },
  { id: 'com', zone: '.com TLD Zone', record: 'DS record for example.com — hash of example.com KSK', signs: 'example.com KSK via DS record', note: 'DS (Delegation Signer) is the cryptographic bridge from parent to child zone. The .com zone stores the hash of example.com\'s KSK, signed by the .com ZSK.' },
  { id: 'example', zone: 'example.com Zone', record: 'DNSKEY (KSK + ZSK), RRSIG over every RRset, NSEC3 records', signs: 'All resource records via ZSK RRSIG', note: 'Two-key separation: KSK signs only DNSKEY records (long-lived, high-value, stored offline in HSM). ZSK signs all other records (rotated monthly, limits exposure).' },
  { id: 'leaf', zone: 'www.example.com', record: 'A 93.184.216.34 + RRSIG(A) signed by ZSK', signs: '—', note: 'The RRSIG covers the entire RRset — all A records for www.example.com. The resolver verifies: RRSIG → ZSK → KSK → DS in parent → … → root trust anchor.' },
]

function DnssecChainExplorer() {
  const [sel, setSel] = useState('root')
  const active = DNSSEC_CHAIN.find(d => d.id === sel)!
  const levelColor = (id: string) => id === 'root' ? '#f97316' : id === 'com' ? '#8b5cf6' : id === 'example' ? '#3b82f6' : G
  return (
    <div style={{ border: '1px solid var(--border)', borderRadius: 14, padding: '28px 24px', margin: '32px 0' }}>
      <p style={{ fontSize: 13, fontWeight: 700, color: G, fontFamily: 'var(--font-mono)', textTransform: 'uppercase', letterSpacing: '.1em', margin: '0 0 18px' }}>DNSSEC Chain of Trust — click a level</p>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 0, marginBottom: 22 }}>
        {DNSSEC_CHAIN.map((level, i) => (
          <div key={level.id} style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <div onClick={() => setSel(level.id)}
              style={{ width: '100%', maxWidth: 440, padding: '12px 18px', border: `2px solid ${sel === level.id ? levelColor(level.id) : 'var(--border)'}`, borderRadius: 10, background: sel === level.id ? `${levelColor(level.id)}10` : 'var(--code-bg)', cursor: 'pointer', transition: 'all 0.15s', textAlign: 'center' }}>
              <p style={{ fontSize: 12, fontWeight: 700, color: levelColor(level.id), fontFamily: 'var(--font-mono)', margin: '0 0 3px' }}>{level.zone}</p>
              <p style={{ fontSize: 11, color: '#6b7280', fontFamily: 'var(--font-mono)', margin: 0 }}>{level.record.slice(0, 55)}{level.record.length > 55 ? '…' : ''}</p>
            </div>
            {i < DNSSEC_CHAIN.length - 1 && (
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', margin: '3px 0' }}>
                <div style={{ width: 2, height: 8, background: 'var(--border)' }} />
                <span style={{ fontSize: 10, color: '#6b7280', fontFamily: 'var(--font-mono)' }}>validates</span>
                <div style={{ width: 2, height: 8, background: 'var(--border)' }} />
              </div>
            )}
          </div>
        ))}
      </div>
      <div style={{ background: `${levelColor(active.id)}08`, border: `1px solid ${levelColor(active.id)}28`, borderRadius: 10, padding: '16px 18px' }}>
        <p style={{ fontSize: 12, fontWeight: 700, color: levelColor(active.id), fontFamily: 'var(--font-mono)', textTransform: 'uppercase', letterSpacing: '.08em', margin: '0 0 10px' }}>{active.zone}</p>
        <p style={{ fontSize: 14, color: 'var(--text)', lineHeight: 1.65, margin: '0 0 6px' }}><strong>Record:</strong> {active.record}</p>
        {active.signs !== '—' && <p style={{ fontSize: 14, color: 'var(--text)', lineHeight: 1.65, margin: '0 0 10px' }}><strong>Signs:</strong> {active.signs}</p>}
        <p style={{ fontSize: 13, color: '#a3a3a3', lineHeight: 1.65, margin: 0, fontStyle: 'italic', borderTop: '1px solid var(--border)', paddingTop: 10 }}>{active.note}</p>
      </div>
    </div>
  )
}

// ── Page ──────────────────────────────────────────────────────────────────────
export default function DnsPage() {
  return (
    <LearnLayout
      title="DNS"
      description="The Domain Name System: the world's largest distributed database, resolving 3.5 trillion queries per day — and the infrastructure that can redirect or bring down the entire internet when misconfigured."
      section="Networking Fundamentals — Module 25"
      readTime="28–38 min"
      updatedAt="May 2026"
    >

      <Chapter n={1} />
      <H2>The Phone Book That Runs the Internet</H2>

      <StoryBox>
        <Para>1983. The internet has grown from a handful of ARPANET nodes to hundreds of machines. Every computer keeps a local HOSTS.TXT file, downloaded from a central server at Stanford Research Institute. It maps hostnames to IP addresses. You add a new machine — you submit a request to SRI, wait for the next update, and hope every other machine downloads it. With hundreds of machines this was manageable. By the time the internet had thousands of machines, it was impossible. Elizabeth Feinler's team at SRI was drowning in update requests.</Para>
        <Para>Paul Mockapetris invented the Domain Name System in 1983 (RFC 882, 883). Instead of one central file, DNS is a distributed, hierarchical, delegated database. No single machine knows all the answers. Queries are routed to whoever is authoritative for each piece of the namespace. Every organization manages its own zone. The same protocol scales to 3.5 trillion queries daily serving 3.5 billion internet users — from the same design invented 40 years ago.</Para>
      </StoryBox>

      <Para>DNS translates human-readable names (<Code>www.example.com</Code>) into machine-routable numbers (<Code>93.184.216.34</Code>). But it is far more than a phone book — it is a general-purpose distributed key-value database that stores email routing, security policies, certificate restrictions, service discovery, and cryptographic keys.</Para>

      <WowBox>
        <Para>DNS handles approximately 3.5 trillion queries per day globally. Cloudflare's 1.1.1.1 alone handles over 1 trillion daily. Every web page load triggers 10–40 DNS queries. DNS failure is catastrophic: in 2021, a Fastly CDN misconfiguration took down Reddit, GitHub, Hacker News, the BBC, and hundreds of other sites simultaneously — not because of a routing failure, but because their DNS records pointed to Fastly infrastructure that suddenly became unreachable. DNS is the single point of failure for the entire internet.</Para>
      </WowBox>

      <Divider />

      <Chapter n={2} />
      <H2>The Hierarchy: Dots, Zones, and Delegation</H2>

      <Para>Domain names are read right-to-left. In <Code>www.example.com.</Code>, the trailing dot is the root zone (usually omitted but always implied). <Code>com</Code> is a Top-Level Domain. <Code>example</Code> is a second-level domain registered under .com. <Code>www</Code> is a hostname within example.com's zone. Each dot represents a delegation boundary — a handoff from one authority to another.</Para>

      <H3>Zones vs Domains</H3>
      <Para>A <Accent>zone</Accent> is an administrative unit of delegation. The <Code>example.com</Code> zone contains all records that example.com's administrators control. They could delegate <Code>blog.example.com</Code> to a different team or hosting provider, creating a new zone with its own NS records and authoritative servers. The parent zone stores only the delegation (NS records pointing to blog's servers and glue A records). A <Accent>domain</Accent> is the full namespace subtree — example.com includes all sub-zones, whereas the example.com zone is just what hasn't been delegated away.</Para>

      <H3>Root Zone, TLDs, and IANA</H3>
      <Para>The root zone contains ~1,500 entries — one NS delegation per TLD. Root zone data is managed by IANA and published to 13 root server addresses (a–m.root-servers.net). These 13 logical addresses are served by over 1,600 physical anycast instances in 130+ countries. Your resolver bootstraps the entire chain from a hardcoded "root hints" file listing these 13 addresses.</Para>

      <Para>ICANN delegates TLDs to registry operators: Verisign operates .com and .net, Public Interest Registry operates .org, and country code TLDs (.uk, .de, .jp) are delegated to national registries. New Generic TLDs (.app, .dev, .io, .ai) were allocated through ICANN's gTLD program starting in 2012.</Para>

      <Divider />

      <Chapter n={3} />
      <H2>DNS Resolution: The Full Walk</H2>

      <StoryBox>
        <Para>When you type <Code>www.example.com</Code> and press Enter, your browser doesn't know the IP address. Your OS doesn't know. Your home router doesn't know. But through a chain of referrals — root to TLD to authoritative server — the answer is found within milliseconds. And once found, it is cached so the next person asking pays nothing. This distributed cache structure is why DNS handles trillions of queries per day without breaking.</Para>
      </StoryBox>

      <DnsResolutionWalkthrough />

      <H3>Recursive vs Iterative Queries</H3>
      <Para>Your computer sends a <Accent>recursive query</Accent> (RD=1 bit set): "please find this for me." The recursive resolver does all the work. When the recursive resolver queries root and TLD servers, it uses <Accent>iterative queries</Accent>: "what can you tell me?" and follows referrals step by step. The resolver caches every intermediate result — NS records, glue records, final A records — to avoid repeating the walk for subsequent queries.</Para>

      <H3>Negative Caching</H3>
      <Para>NXDOMAIN (Non-Existent Domain) responses are also cached — for the duration of the SOA MINIMUM field (RFC 2308). Without negative caching, every query for a nonexistent name would traverse the full resolution chain on every attempt. The negative TTL is typically much shorter than positive TTL — 300s is common — to allow recently-created domains to become reachable quickly.</Para>

      <CodeBlock>{`# Manual DNS resolution trace
dig +trace www.example.com        # shows every referral step, root to auth
dig @8.8.8.8 A www.example.com    # query Google recursive resolver
dig @a.root-servers.net A www.example.com  # iterative query to root

# Clean answer with TTL
dig +nocmd +noall +answer www.example.com

# Reverse DNS
dig -x 93.184.216.34

# Check from multiple resolvers
for r in 8.8.8.8 1.1.1.1 9.9.9.9 208.67.222.222; do
  echo -n "$r: "; dig +short @"$r" A www.example.com
done`}</CodeBlock>

      <Divider />

      <Chapter n={4} />
      <H2>DNS Record Types</H2>

      <Para>DNS records are the data stored in zones. Each record has a name, class (always IN for internet), type, TTL, and RDATA (record-specific data). Records with the same name and type form an <Accent>RRset</Accent> (Resource Record Set) — always cached and returned together. Understanding record types is essential for configuring everything from web hosting to email security to TLS certificate management.</Para>

      <DnsRecordExplorer />

      <H3>The CNAME Restriction</H3>
      <Para>RFC 1912 prohibits a CNAME at a name that has any other records. This creates a critical operational constraint: you cannot put a CNAME at a zone apex (<Code>example.com</Code> itself) because zone apexes require NS and SOA records. This is why CDN providers offer proprietary "ALIAS" or "ANAME" records — they behave like CNAME but are stored as A records internally, resolving at the server side, allowing apex usage. Route53 calls these "Alias records"; Cloudflare calls it a "CNAME flattening."</Para>

      <Warn>
        <Para>CNAME chains multiply latency: a chain A → B → C → D requires four DNS lookups before returning an IP. RFC 1034 says resolvers should follow at most 8 CNAMEs before giving up. Circular CNAMEs (A → B → A) cause resolution failures. Keep chains short — one CNAME hop is usually enough. Each CDN or alias layer you add is another round trip.</Para>
      </Warn>

      <Divider />

      <Chapter n={5} />
      <H2>TTL: The Cache Management Knob</H2>

      <Para>TTL (Time-to-Live) is the number of seconds a resolver may cache a DNS record. It is the most important operational parameter in DNS — getting it wrong causes either stale data (TTL too high) or excessive DNS query load and latency (TTL too low).</Para>

      <H3>TTL Strategy by Record Type</H3>
      <Para>• <Accent>Static content, CDN endpoints</Accent>: 3600–86400s. These rarely change; high TTL improves global cache hit rates.</Para>
      <Para>• <Accent>Services that might failover</Accent>: 60–300s. Low enough that failover changes propagate within minutes.</Para>
      <Para>• <Accent>MX, NS records</Accent>: 3600–86400s. Rarely change; high TTL reduces unnecessary queries to authoritative servers.</Para>
      <Para>• <Accent>Planned maintenance</Accent>: lower TTL to 60–300s at least 24 hours before the change (to let all caches pick up the short TTL), make the change, then raise TTL back. Never lower TTL immediately before a change — existing caches may already hold a 24-hour TTL copy.</Para>

      <WowBox>
        <Para>Cloudflare's 1.1.1.1 claims to be the world's fastest public DNS resolver at ~11ms average response time globally. Google's 8.8.8.8 averages ~20ms. Both use anycast routing to 200+ PoPs worldwide. Quad9 (9.9.9.9) focuses on security — it blocks malicious domains by default using threat intelligence feeds. OpenDNS (208.67.222.222) has offered content filtering since 2007. All four are free, high-availability, privacy-varying alternatives to ISP resolvers.</Para>
      </WowBox>

      <Divider />

      <Chapter n={6} />
      <H2>Authoritative Servers and Zone Files</H2>

      <Para>Authoritative name servers hold the definitive data for a zone and respond with the AA (Authoritative Answer) flag set. When you register example.com and configure it to use Cloudflare DNS, Cloudflare's servers become authoritative for your zone — they are the source of truth.</Para>

      <H3>Zone File Format (RFC 1035)</H3>
      <Para>DNS zone data is stored in master file format. The <Code>$ORIGIN</Code> directive sets the default domain suffix. The <Code>@</Code> symbol refers to the current origin. The SOA record is mandatory first — it defines zone metadata including the serial number that triggers secondary synchronization.</Para>

      <CodeBlock>{`; example.com zone file (RFC 1035 master format)
$ORIGIN example.com.
$TTL 3600

@  IN SOA ns1.example.com. admin.example.com. (
          2024012001  ; Serial — YYYYMMDDNN, must increment on every change
          3600        ; Refresh — seconds between secondary polls
          900         ; Retry — if refresh fails
          604800      ; Expire — secondary stops serving after 7 days
          300 )       ; Negative cache TTL (NXDOMAIN)

; Name servers
@    IN NS  ns1.example.com.
@    IN NS  ns2.example.com.

; A records
@    IN A    93.184.216.34
www  IN A    93.184.216.34
api  IN A    93.184.216.100

; AAAA
@    IN AAAA 2606:2800:220:1:248:1893:25c8:1946

; Email
@    IN MX  10 mail.example.com.
@    IN TXT "v=spf1 ip4:93.184.216.50 ~all"
_dmarc IN TXT "v=DMARC1; p=reject; rua=mailto:dmarc@example.com"

; Certificate authority restriction
@    IN CAA 0 issue "letsencrypt.org"`}</CodeBlock>

      <H3>Zone Transfers: AXFR and IXFR</H3>
      <Para>Secondary servers replicate zone data from the primary via zone transfers. <Accent>AXFR</Accent> (full transfer): the secondary requests the complete zone whenever the SOA serial is higher than its own copy. <Accent>IXFR</Accent> (incremental): only changed records are transferred — efficient for large zones with frequent small updates. Modern DNS hosting (Route53, Cloudflare DNS) abstracts all of this — all servers share the same backend, with no traditional primary/secondary relationship.</Para>

      <Warn>
        <Para>Unrestricted AXFR (zone transfer) exposes your entire zone — every hostname, IP, and record — to anyone who asks. Always restrict AXFR to known secondary server IPs with <Code>{'allow-transfer { IP; };'}</Code> in BIND. Information exposed via AXFR has been used in reconnaissance before targeted attacks. Many registrars and DNS providers disable AXFR entirely for security.</Para>
      </Warn>

      <Divider />

      <Chapter n={7} />
      <H2>DNSSEC: Signing the Internet's Phone Book</H2>

      <StoryBox>
        <Para>2008. Security researcher Dan Kaminsky discovers a critical vulnerability in DNS: cache poisoning can be performed with only 65,536 guesses — trivially achievable. The attack floods a recursive resolver with forged responses faster than the real response arrives, tricking it into caching a malicious IP for a legitimate domain. Kaminsky secretly coordinated with DNS vendors for a simultaneous patch. When the vulnerability was disclosed, every major recursive resolver in the world was patched simultaneously — the largest coordinated security response in internet history. The fix (source port randomization) increased the attack complexity to ~4 billion guesses — but DNSSEC was the real solution.</Para>
      </StoryBox>

      <DnssecChainExplorer />

      <H3>How DNSSEC Verification Works</H3>
      <Para>Every RRset in a DNSSEC-signed zone has a corresponding <Accent>RRSIG</Accent> record — a digital signature. The signature is made by the ZSK (Zone Signing Key). The ZSK public key is in a DNSKEY record, signed by the KSK (Key Signing Key). The KSK is validated via a DS record in the parent zone (the hash of the KSK), which is signed by the parent's ZSK, walking the chain up to the root trust anchor hardcoded in every validating resolver. A validating resolver checks every signature in this chain — any invalid signature triggers SERVFAIL.</Para>

      <H3>NSEC3: Authenticated Denial Without Zone Walking</H3>
      <Para>DNSSEC must also prove a name does <em>not</em> exist. NSEC records create a signed ordered chain through all zone names — but enable "zone walking": an attacker can enumerate all hostnames in a zone by following NSEC links. NSEC3 hashes the names before creating the chain, making enumeration computationally expensive. RFC 9276 (2022) recommends NSEC3 with zero iterations to prevent offline dictionary attacks against the hashes.</Para>

      <CodeBlock>{`# Check DNSSEC signatures
dig +dnssec A www.example.com       # request RRSIG in response
dig +dnssec DNSKEY example.com      # fetch public signing keys
dig +dnssec DS example.com @a.gtld-servers.net  # parent DS record

# Full DNSSEC validation (delv does the chain verification)
delv @1.1.1.1 A www.example.com

# Check DNSSEC status online
# https://dnssec-analyzer.verisignlabs.com/example.com
# https://www.dnssec-debugger.verisignlabs.com`}</CodeBlock>

      <Divider />

      <Chapter n={8} />
      <H2>DNS over HTTPS and DNS over TLS</H2>

      <Para>Traditional DNS sends queries in plaintext over UDP port 53. Any observer on the network path — your ISP, a coffee shop operator, a government monitor — can see every domain you query. Your DNS queries reveal which services you use, when, and can infer sensitive personal information.</Para>

      <H3>DNS over TLS (DoT) — RFC 7858</H3>
      <Para>DoT wraps DNS in a TLS tunnel over TCP port 853. The DNS wire format is unchanged — only the transport is encrypted. Clean conceptual separation, easy to deploy on Android (Private DNS setting) and Linux (systemd-resolved). Disadvantage: port 853 is visible and easy to detect or block in corporate firewalls and national filtering systems.</Para>

      <H3>DNS over HTTPS (DoH) — RFC 8484</H3>
      <Para>DoH carries DNS queries as HTTPS POST or GET requests over port 443. Traffic is completely indistinguishable from normal web browsing. Firefox and Chrome have built-in DoH support. Advantage: cannot be selectively blocked without blocking all HTTPS. Disadvantage: centralizes DNS into a few large providers (Cloudflare 1.1.1.1, Google 8.8.8.8), bypasses corporate DNS filtering policies and local network controls.</Para>

      <WowBox>
        <Para>DoH caused a major enterprise security controversy. Corporate IT uses DNS filtering to block malware C2 domains, phishing sites, and policy violations. Browser-integrated DoH routes queries directly to Cloudflare or Google over port 443 — completely bypassing corporate DNS. Mozilla delayed DoH rollout after pushback from enterprise customers and UK's NCSC, which named Mozilla an "internet villain" for 2019. The privacy vs. enterprise-visibility tradeoff remains unresolved — enterprise browsers now support "canary domains" that signal DoH should be disabled on managed networks.</Para>
      </WowBox>

      <CodeBlock>{`# Configure DoT with systemd-resolved
# /etc/systemd/resolved.conf:
# [Resolve]
# DNS=1.1.1.1#cloudflare-dns.com 9.9.9.9#dns.quad9.net
# DNSOverTLS=yes

# Test DoT with kdig (from knot-dnsutils package)
kdig -d @1.1.1.1 +tls A www.example.com

# DoH query via curl (JSON API)
curl -H 'accept: application/dns-json' \
  'https://cloudflare-dns.com/dns-query?name=www.example.com&type=A'

# DNS over QUIC (DoQ) — RFC 9250
# Emerging standard, each DNS query in its own QUIC stream`}</CodeBlock>

      <Divider />

      <Chapter n={9} />
      <H2>DNS as an Attack Vector</H2>

      <Para>DNS is both a critical target and a powerful tool for attackers. The combination of ubiquitous access, UDP's lack of source verification, and the central role of DNS in all internet communication creates a rich attack surface.</Para>

      <H3>DNS Cache Poisoning</H3>
      <Para>Pre-Kaminsky: 16-bit transaction ID = 65,536 guesses. Post-patch: source port randomization adds ~16 bits → ~4.3 billion guesses. With DNSSEC validation enabled, cache poisoning becomes cryptographically infeasible — the forged response would fail signature verification regardless of the transaction ID match.</Para>

      <H3>DNS Amplification DDoS</H3>
      <Para>UDP source addresses can be spoofed. An attacker sends DNS queries with the victim's IP as source. The resolver sends its large response to the victim. Amplification factors: DNS ANY query: up to 100x. DNSKEY query: 40–75x. A single 1 Gbps botnet can generate 40–100 Gbps of attack traffic targeting a victim via DNS amplification. Mitigations: BCP38 source address validation at ISPs, DNS Response Rate Limiting (RRL), refusing ANY queries, using TCP for large responses (TC bit set).</Para>

      <H3>DNS Tunneling</H3>
      <Para>Data can be encoded in DNS queries: <Code>aGVsbG8gd29ybGQ=.c2.evil.com</Code>. An attacker who controls the authoritative server for evil.com receives this data — creating a covert exfiltration or C2 channel that bypasses most firewalls (DNS is almost never blocked). Tools like iodine and dnscat2 implement full bidirectional IP-over-DNS tunneling. Detection: entropy analysis of queried names, unusually long subdomain labels, high query volume to unknown domains.</Para>

      <H3>BGP Hijacking of DNS Infrastructure</H3>
      <Para>In 2018, attackers hijacked BGP routes to Amazon Route53's authoritative servers, intercepting DNS responses for MyEtherWallet and stealing ~$150,000 in cryptocurrency. The attack worked because DNS had no authentication — the BGP-hijacked responses were accepted as legitimate. DNSSEC validation would have detected the tampered responses. DoH/DoT with certificate pinning would have prevented the BGP interception from being effective.</Para>

      <Divider />

      <Chapter n={10} />
      <H2>DNS Load Balancing and High Availability</H2>

      <Para>DNS is often the first tier of traffic management. By controlling which IP addresses are returned — and with what TTL and weighting — you implement load distribution, geographic routing, and automatic failover.</Para>

      <H3>Round-Robin DNS</H3>
      <Para>Multiple A records for the same name cause resolvers to return them in rotating order. Simple and stateless. Limitation: no health awareness — traffic continues to dead servers until TTL expires. Not true load balancing — resolvers cache all records and rotate; actual load depends on TTL expiration rate and how many clients share a resolver's cache.</Para>

      <H3>GeoDNS and Anycast</H3>
      <Para>GeoDNS returns different answers based on the <em>resolver's</em> geographic location (not the end user's — an important distinction for CDN accuracy). A resolver in Tokyo gets a Tokyo IP; a resolver in London gets London. Anycast takes a different approach: advertise the same IP address from multiple data centers via BGP. The network automatically routes each user to the topologically nearest instance — without any DNS intelligence required. Cloudflare's 1.1.1.1 and 8.8.8.8 both use anycast.</Para>

      <H3>Health-Checked DNS Failover</H3>
      <Para>Route53, Cloudflare Load Balancing, and NS1 perform continuous health checks against your endpoints. A failed health check removes the unhealthy IP from DNS responses automatically. With a 60s TTL, downtime is limited to ~60 seconds for automatic failover — no manual intervention required. RTO (Recovery Time Objective) of under 2 minutes for full datacenter failures is achievable with DNS failover alone.</Para>

      <Divider />

      <Chapter n={11} />
      <H2>DNS Email Security: SPF, DKIM, DMARC</H2>

      <Para>Three email authentication mechanisms live entirely in DNS TXT records. Together they prevent email spoofing and phishing at the source — by giving receiving mail servers a way to verify that a message claiming to be from example.com was actually authorized by example.com's administrators.</Para>

      <H3>SPF — Sender Policy Framework</H3>
      <Para>A TXT record listing all IP addresses and mail services authorized to send email for a domain. <Code>v=spf1 include:_spf.google.com ip4:93.184.216.50 ~all</Code>: Google's servers and the listed IP may send; all others are softfail (~all) or hardfail (-all). Receiving servers check the SPF record during the SMTP connection and can reject or mark messages from unauthorized senders. SPF checks the envelope MAIL FROM address, not the From: header a user sees.</Para>

      <H3>DKIM — DomainKeys Identified Mail</H3>
      <Para>The sending mail server signs outgoing messages with an RSA or Ed25519 private key. The public key is published in DNS at <Code>selector._domainkey.example.com</Code> as a TXT record. Receiving servers verify the signature — proving the message was not modified in transit and that the signer controls the DNS record. DKIM signatures survive forwarding (unlike SPF, which breaks on relay). The <Code>selector</Code> allows multiple keys for key rotation without downtime.</Para>

      <H3>DMARC — Domain-based Message Authentication Reporting & Conformance</H3>
      <Para>DMARC ties SPF and DKIM together with a policy: what to do when both fail? <Code>p=none</Code> (monitor only), <Code>p=quarantine</Code> (send to spam folder), <Code>p=reject</Code> (refuse the message). DMARC also enables aggregate reports (<Code>rua=</Code>) — daily XML summaries from every receiving mail server showing which messages passed/failed, sent to your monitoring address. This visibility lets you tune SPF/DKIM before enforcing rejection.</Para>

      <CodeBlock>{`# Check email DNS records
dig TXT example.com +short          # SPF record
dig TXT _dmarc.example.com +short   # DMARC policy
dig TXT selector1._domainkey.example.com +short  # DKIM public key

# Validate with mxtoolbox
# https://mxtoolbox.com/emailhealth/example.com/

# Example SPF record with common providers:
# "v=spf1 include:_spf.google.com include:mailgun.org ~all"

# Example DMARC with report email:
# "v=DMARC1; p=reject; rua=mailto:dmarc@example.com; pct=100"`}</CodeBlock>

      <Divider />

      <Chapter n={12} />
      <H2>Debugging DNS: A Systematic Toolkit</H2>

      <Para>DNS problems cause a disproportionate fraction of outages. Systematic diagnosis requires querying different resolvers and servers at each level of the hierarchy.</Para>

      <CodeBlock>{`# 1. Verify authoritative servers
dig NS example.com +short
dig @ns1.example.com A www.example.com   # bypass cache — query auth directly

# 2. Check for propagation (cache expiry)
for r in 8.8.8.8 1.1.1.1 9.9.9.9; do
  echo -n "$r: "; dig +short @"$r" A www.example.com
done

# 3. Trace from root to answer
dig +trace www.example.com

# 4. Check DNSSEC validation
delv +root @8.8.8.8 A www.example.com
# Look for: "fully validated" vs "validation failed"

# 5. Check negative cache (NXDOMAIN TTL)
dig +ttlunits A nonexistent.example.com @8.8.8.8
# SOA minimum field controls negative cache TTL

# 6. Check for split-horizon (internal vs external DNS)
dig @your-internal-dns A host.example.com
dig @8.8.8.8 A host.example.com

# 7. Find DNS TTL remaining (time until cache refresh)
dig A www.example.com   # TTL column decrements until refresh`}</CodeBlock>

      <Divider />

      <Chapter n={13} />
      <H2>Common Misconceptions</H2>

      <Err title="DNS changes take 24–48 hours to propagate">
        <Para>There is no propagation. DNS changes are instant on authoritative servers — the new record is live the moment you save it. The delay is existing caches expiring at their TTL. If your TTL is 300 seconds, all caches expire within 5 minutes. If your TTL is 86400s and you just changed a record, some resolvers will serve the old value for up to 24 hours. Always lower TTL 24+ hours before planned changes. The "24–48 hour" figure comes from default 86400s TTLs set by many domain registrars.</Para>
      </Err>

      <Err title="DNSSEC encrypts your DNS traffic">
        <Para>DNSSEC provides authentication and integrity — not confidentiality. DNS queries and responses with DNSSEC are still transmitted in plaintext UDP. Any network observer can see every domain you query. DNSSEC only proves the answers haven't been tampered with. For confidentiality, use DNS over TLS (DoT) or DNS over HTTPS (DoH). These are orthogonal — you can and should use both DNSSEC validation and DoT/DoH simultaneously.</Para>
      </Err>

      <Err title="DNS is just for translating domains to IPs">
        <Para>DNS is a general-purpose distributed key-value database. It stores: email routing (MX), email security (SPF/DKIM/DMARC in TXT), certificate authority restrictions (CAA), service discovery (SRV), SSH fingerprints (SSHFP), TLS certificate associations (TLSA/DANE), and zone administration metadata (SOA, NS). Hundreds of protocols use DNS TXT records for configuration and discovery. The "phone book" analogy captures less than 20% of actual DNS usage.</Para>
      </Err>

      <Err title="All DNS resolvers return the same answers">
        <Para>GeoDNS returns different IP addresses based on resolver location. A CDN-backed domain may return a Tokyo IP when queried from Japan and a London IP when queried from the UK. Split-horizon DNS (common in corporate environments) returns different answers for internal vs. external resolvers. Filtering resolvers (9.9.9.9, 1.1.1.3, OpenDNS) return NXDOMAIN for blocked domains. Resolver choice materially affects the answers you receive — this matters for debugging latency, troubleshooting connectivity, and understanding corporate DNS behavior.</Para>
      </Err>

      <Err title="A PTR record is automatically created when you create an A record">
        <Para>PTR records (reverse DNS) are in a separate zone — the in-addr.arpa zone — delegated to whoever owns the IP address space, not the domain name. If your server is at 93.184.216.34, the PTR record lives in the zone managed by IANA/the ISP owning that IP block, not in example.com's zone. You must request PTR delegation from your IP space owner (your cloud provider or ISP). AWS, Google Cloud, and Azure all allow you to set reverse DNS through their respective console or API — but you must do it explicitly.</Para>
      </Err>

      <Divider />

      <Chapter n={14} />
      <H2>IQ Depth Check</H2>

      <IQ level="Beginner">
        <Para>DNS is like a phone book for the internet — it converts website names (like google.com) into IP addresses (like 142.250.80.46) that computers use to connect. Your computer asks a DNS server, which finds the answer and sends it back. The answer is saved (cached) for a set time called TTL. Different record types serve different purposes: A records for IP addresses, MX for email, TXT for security settings. When you register a domain, you point it at name servers that host your DNS records.</Para>
      </IQ>

      <IQ level="Intermediate">
        <Para>DNS is hierarchical: root → TLD (.com) → second-level domain → hostnames. Resolution is recursive: your stub resolver asks a recursive resolver (8.8.8.8), which walks iteratively — root referral, TLD referral, authoritative answer — and caches every step. DNSSEC cryptographically signs records to prevent cache poisoning. DoT/DoH encrypt queries for privacy. "DNS propagation" is cache expiration controlled by TTL — lower TTL before planned changes. SPF, DKIM, DMARC are email security policies published as DNS TXT records. GeoDNS and health-checked failover use DNS for traffic management and automatic recovery.</Para>
      </IQ>

      <IQ level="Senior">
        <Para>DNS caches at four levels: browser (60s), OS stub (TTL-respecting), recursive resolver (shared, massive, no flush API), negative cache (SOA MINIMUM). DNSSEC uses ZSK/KSK separation: ZSK monthly rotation for regular records; KSK annual/biennial for DNSKEY signing; DS records in parent zones bridge trust. NSEC3 with 0 iterations prevents zone enumeration and offline hash attacks. Cache poisoning post-Kaminsky: ~4.3 billion guesses (16-bit TxID × 16-bit source port). DNS amplification: DNSKEY queries achieve 40–75x amplification on spoofed UDP. DNS tunneling detected by subdomain entropy analysis, query rate, and label length. CNAME cannot coexist with other record types at same name, preventing apex CNAME — workarounds: ALIAS/ANAME records via provider-specific CNAME flattening. RFC 7816 qname minimization reduces information exposure to each authoritative server by sending only the minimal necessary QNAME.</Para>
      </IQ>

      <IQ level="PhD">
        <Para>The Kaminsky attack exploits the birthday paradox: with TxID space of 65,536 and source port space of 65,536 (post-patch combined space ~4.3×10^9), an attacker sending ~1,000 forged responses/second requires ~50 days on average — vs. ~33 seconds pre-patch. DNS COOKIE (RFC 7873) provides per-server-per-client authentication tokens eliminating off-path injection without DNSSEC overhead. The DNSSEC root KSK ceremony (ICANN) uses FIPS-140-2 Level 4 Hardware Security Modules in two geographically separate facilities with publicly-livestreamed signing ceremonies and community trust representatives — the most elaborate key ceremony in internet history. NSEC3 with iterations parameter: RFC 9276 recommends 0 iterations (disabled) because each iteration only increases attacker cost by O(1) while imposing O(1) signing cost on every zone update — the asymmetry is insufficient. RFC 7816 qname minimization reduces QNAME to just the labels needed at each delegation point — root server sees only ".", .com server sees "com." — limiting the information exposure even from operators of resolvers. Open problems: DNSSEC post-quantum migration (current RSA-2048/ECDSA P-256 RRSIG sizes: 256–512 bytes; post-quantum FALCON-512 or Dilithium signatures: 1280–2420 bytes, potentially exceeding 512-byte UDP DNS limit requiring EDNS0 buffer sizes or TCP fallback for all signed responses — a significant operational change); DNSSEC key ceremony automation without sacrificing ceremony integrity; encrypted SNI (ECH) plus DoH as a complete network-level traffic analysis mitigation system.</Para>
      </IQ>

      <Divider />

      <KeyTakeaways items={[
        'DNS is a hierarchical, delegated, distributed database — not a simple phone book. It stores email routing, security policies, certificate restrictions, and service discovery records.',
        'Resolution is recursive: stub resolver → recursive resolver (does all work) → iterative root/TLD/auth queries → cached answer at every step.',
        '"DNS propagation" is cache expiration at TTL — changes on authoritative servers are instant. Lower TTL 24+ hours before planned changes.',
        'DNSSEC provides cryptographic authentication via a chain of signatures from root trust anchor → TLD DS record → zone KSK → ZSK → RRSIG on every RRset.',
        'DNSSEC provides authentication and integrity, NOT confidentiality. Use DNS over TLS (DoT, port 853) or DNS over HTTPS (DoH, port 443) for encrypted queries.',
        'Cache poisoning post-Kaminsky requires ~4 billion guesses (TxID + source port randomization). DNSSEC makes it cryptographically infeasible regardless of guesses.',
        'DNS amplification attacks exploit UDP source spoofing to reflect large responses to victims — up to 75x amplification with DNSKEY queries.',
        'CNAME cannot coexist with other records at the same name, preventing CNAME at zone apex — CDN providers offer ALIAS/ANAME records as workarounds.',
        'SPF, DKIM, and DMARC are email authentication mechanisms published as DNS TXT records, together preventing email spoofing and phishing.',
        'DNS is used for load balancing (round-robin, GeoDNS, health-checked failover), DNS tunneling (covert channel via subdomain encoding), and as an attack target for BGP hijacking.',
      ]} />
    </LearnLayout>
  )
}
