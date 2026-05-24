'use client'

import { useState } from 'react'
import { LearnLayout } from '@/components/content/LearnLayout'
import { KeyTakeaways } from '@/components/content/KeyTakeaways'

// ─── helper components ────────────────────────────────────────────────────────
const Chapter = ({ n, title }: { n: number; title: string }) => (
  <div style={{ marginBottom: '0.25rem' }}>
    <span style={{ fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#6366f1' }}>
      Chapter {n}
    </span>
    <h2 style={{ fontSize: '1.6rem', fontWeight: 800, color: '#1e293b', margin: '0.25rem 0 0.75rem' }}>{title}</h2>
  </div>
)
const Divider = () => <hr style={{ border: 'none', borderTop: '2px solid #e2e8f0', margin: '2.5rem 0' }} />
const Para = ({ children }: { children: React.ReactNode }) => (
  <p style={{ lineHeight: 1.85, color: '#334155', marginBottom: '1rem', fontSize: '1.02rem' }}>{children}</p>
)
const H2 = ({ children }: { children: React.ReactNode }) => (
  <h2 style={{ fontSize: '1.3rem', fontWeight: 700, color: '#1e293b', margin: '1.75rem 0 0.6rem' }}>{children}</h2>
)
const H3 = ({ children }: { children: React.ReactNode }) => (
  <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#475569', margin: '1.25rem 0 0.4rem' }}>{children}</h3>
)
const Accent = ({ children }: { children: React.ReactNode }) => (
  <span style={{ fontWeight: 700, color: '#6366f1' }}>{children}</span>
)
const Code = ({ children }: { children: React.ReactNode }) => (
  <code style={{ background: '#f1f5f9', border: '1px solid #e2e8f0', borderRadius: '4px', padding: '0.1rem 0.4rem', fontSize: '0.88rem', fontFamily: 'monospace', color: '#0f172a' }}>{children}</code>
)
const CodeBlock = ({ children }: { children: React.ReactNode }) => (
  <pre style={{ background: '#0f172a', color: '#e2e8f0', borderRadius: '10px', padding: '1.25rem 1.5rem', fontSize: '0.85rem', fontFamily: 'monospace', overflowX: 'auto', lineHeight: 1.7, margin: '1rem 0' }}>
    <code>{children}</code>
  </pre>
)
const StoryBox = ({ children }: { children: React.ReactNode }) => (
  <div style={{ background: 'linear-gradient(135deg,#f0f9ff,#e0f2fe)', border: '2px solid #0ea5e9', borderRadius: '12px', padding: '1.25rem 1.5rem', margin: '1.25rem 0', lineHeight: 1.8, color: '#0c4a6e' }}>
    {children}
  </div>
)
const WowBox = ({ children }: { children: React.ReactNode }) => (
  <div style={{ background: 'linear-gradient(135deg,#fdf4ff,#fae8ff)', border: '2px solid #a855f7', borderRadius: '12px', padding: '1.25rem 1.5rem', margin: '1.25rem 0', lineHeight: 1.8, color: '#581c87' }}>
    <span style={{ fontWeight: 800, color: '#7c3aed' }}>WOW: </span>{children}
  </div>
)
const Warn = ({ children }: { children: React.ReactNode }) => (
  <div style={{ background: '#fffbeb', border: '2px solid #f59e0b', borderRadius: '12px', padding: '1.25rem 1.5rem', margin: '1.25rem 0', lineHeight: 1.8, color: '#78350f' }}>
    <span style={{ fontWeight: 800, color: '#d97706' }}>WARN: </span>{children}
  </div>
)
const Err = ({ children }: { children: React.ReactNode }) => (
  <div style={{ background: '#fff1f2', border: '2px solid #f43f5e', borderRadius: '12px', padding: '1.25rem 1.5rem', margin: '1.25rem 0', lineHeight: 1.8, color: '#881337' }}>
    <span style={{ fontWeight: 800, color: '#e11d48' }}>MISCONCEPTION: </span>{children}
  </div>
)
const LEVEL_COLORS: Record<string, string> = {
  Beginner: '#10b981', Intermediate: '#3b82f6', Senior: '#8b5cf6', PhD: '#f97316'
}
const IQ = ({ level, children }: { level: string; children: React.ReactNode }) => (
  <div style={{ background: '#f8fafc', border: `2px solid ${LEVEL_COLORS[level]}`, borderRadius: '12px', padding: '1.25rem 1.5rem', margin: '1.25rem 0', lineHeight: 1.8, color: '#1e293b' }}>
    <span style={{ display: 'inline-block', background: LEVEL_COLORS[level], color: '#fff', fontWeight: 700, fontSize: '0.75rem', borderRadius: '6px', padding: '0.15rem 0.6rem', marginBottom: '0.5rem', letterSpacing: '0.05em' }}>{level}</span>
    <div>{children}</div>
  </div>
)

// ─── interactive component 1: Detection Method Comparator ────────────────────
type DetectionMethod = {
  id: string
  name: string
  howItWorks: string
  strength: string
  weakness: string
  falsePositive: string
  falseNegative: string
  useCases: string
  color: string
}
const DETECTION_METHODS: DetectionMethod[] = [
  {
    id: 'signature',
    name: 'Signature-Based Detection',
    howItWorks: 'Maintains a database of known attack patterns (signatures). Each packet or stream is compared against signatures. A match triggers an alert. Like antivirus — looks for known bad.',
    strength: 'Very low false positives for known attacks; highly specific; fast (pattern matching on ASICs); well-understood results',
    weakness: 'Zero-day blind spot — cannot detect unknown attacks; requires constant signature updates; attackers can modify exploits to evade specific signatures',
    falsePositive: 'Low (well-tuned signatures rarely match benign traffic)',
    falseNegative: 'High for unknown attacks; moderate for known attacks with evasion',
    useCases: 'Known malware C2 traffic, known exploit attempts, CVE-specific attack patterns, policy violations (P2P, forbidden applications)',
    color: '#3b82f6',
  },
  {
    id: 'anomaly',
    name: 'Anomaly-Based / Statistical',
    howItWorks: 'Learns a baseline of normal network behavior (traffic volumes, protocols, connection patterns, timing). Flags deviations from baseline as suspicious. Can detect unknown attacks.',
    strength: 'Can detect zero-days and insider threats; finds behavioral anomalies regardless of attack type; effective for detecting exfiltration and lateral movement',
    weakness: 'High false positive rate (everything unusual looks malicious, including legitimate changes); requires training period; normal baselines shift with business cycles',
    falsePositive: 'High (seasonal traffic spikes, software updates, new applications all look anomalous)',
    falseNegative: 'Low for genuinely unusual behavior; can miss attacks that blend with normal traffic',
    useCases: 'Data exfiltration detection, credential stuffing, insider threats, novel protocol abuse, DDoS early warning',
    color: '#10b981',
  },
  {
    id: 'heuristic',
    name: 'Heuristic / Rule-Based',
    howItWorks: 'Applies logical rules that describe suspicious behavior patterns without matching exact byte sequences. Example: "more than 5 failed logins in 60 seconds from the same IP" or "SSH on a non-standard port with a known vulnerable banner".',
    strength: 'Flexible; can catch variants of known attacks; easier to write than exact signatures; adaptable to environment',
    weakness: 'Requires security expertise to write good rules; can be tuned by attackers once rules are known; still misses genuinely novel attacks',
    falsePositive: 'Medium (depends on rule quality)',
    falseNegative: 'Medium',
    useCases: 'Policy violations, slow brute-force attacks, beaconing detection, unusual DNS patterns',
    color: '#8b5cf6',
  },
  {
    id: 'ml',
    name: 'Machine Learning / AI',
    howItWorks: 'Trained on labeled data (known attacks + known-good traffic) to classify new traffic. Deep learning models can identify subtle patterns. Unsupervised models cluster traffic and flag outliers.',
    strength: 'Can identify complex multi-step attack patterns; adapts to environment; reduces analyst fatigue with triage scoring; effective for encrypted traffic classification',
    weakness: 'Opaque decisions (hard to explain alerts); requires large training datasets; adversarial attacks can fool models; high compute cost',
    falsePositive: 'Variable (depends on training quality)',
    falseNegative: 'Low for attack patterns seen in training; high for truly novel attacks',
    useCases: 'Encrypted C2 detection, behavioral user/entity analytics (UEBA), network traffic classification, fraud detection',
    color: '#f97316',
  },
]
const DET_FIELDS: (keyof DetectionMethod)[] = ['howItWorks', 'strength', 'weakness', 'falsePositive', 'falseNegative', 'useCases']
const DET_LABELS: Record<string, string> = { howItWorks: 'How It Works', strength: 'Strengths', weakness: 'Weaknesses', falsePositive: 'False Positive Rate', falseNegative: 'False Negative Rate', useCases: 'Use Cases' }

function DetectionMethodComparator() {
  const [sel, setSel] = useState<string>('signature')
  const m = DETECTION_METHODS.find(x => x.id === sel)!

  return (
    <div style={{ background: '#f8fafc', border: '2px solid #6366f1', borderRadius: '14px', padding: '1.5rem', margin: '1.5rem 0' }}>
      <h3 style={{ fontWeight: 800, color: '#6366f1', marginBottom: '0.25rem' }}>IDS/IPS Detection Method Comparator</h3>
      <p style={{ color: '#64748b', fontSize: '0.9rem', marginBottom: '1.25rem' }}>Select a detection approach to understand its strengths, weaknesses, and best use cases.</p>
      <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '1.25rem' }}>
        {DETECTION_METHODS.map(d => (
          <button key={d.id} onClick={() => setSel(d.id)}
            style={{ padding: '0.45rem 1rem', borderRadius: '8px', border: `2px solid ${d.color}`, background: sel === d.id ? d.color : '#fff', color: sel === d.id ? '#fff' : d.color, fontWeight: 700, cursor: 'pointer', fontSize: '0.88rem' }}>
            {d.name.split(' ')[0]}
          </button>
        ))}
      </div>
      <div style={{ background: '#fff', borderRadius: '10px', border: `2px solid ${m.color}`, overflow: 'hidden' }}>
        {DET_FIELDS.map((f, i) => (
          <div key={f} style={{ display: 'flex', borderBottom: i < DET_FIELDS.length - 1 ? '1px solid #e2e8f0' : 'none' }}>
            <div style={{ width: '150px', minWidth: '150px', background: '#f8fafc', padding: '0.65rem 0.9rem', fontWeight: 700, color: '#475569', fontSize: '0.82rem', borderRight: '1px solid #e2e8f0' }}>{DET_LABELS[f]}</div>
            <div style={{ flex: 1, padding: '0.65rem 0.9rem', color: '#1e293b', fontSize: '0.9rem', lineHeight: 1.6 }}>{m[f]}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

// ─── interactive component 2: Suricata Rule Builder ─────────────────────────
type SuricataRule = {
  id: string
  rule: string
  action: string
  protocol: string
  src: string
  dst: string
  options: { key: string; value: string; desc: string }[]
  explanation: string
  category: string
}
const SURICATA_RULES: SuricataRule[] = [
  {
    id: 'sql-injection',
    rule: 'alert http $EXTERNAL_NET any -> $HTTP_SERVERS $HTTP_PORTS (msg:"SQL Injection Attempt"; flow:to_server,established; content:"UNION SELECT"; http_uri; nocase; classtype:web-application-attack; sid:1001; rev:1;)',
    action: 'alert',
    protocol: 'http',
    src: '$EXTERNAL_NET any',
    dst: '$HTTP_SERVERS $HTTP_PORTS',
    options: [
      { key: 'msg', value: '"SQL Injection Attempt"', desc: 'Human-readable alert description displayed in logs and SIEM' },
      { key: 'flow', value: 'to_server,established', desc: 'Match only on established connections going to the server (HTTP request direction)' },
      { key: 'content', value: '"UNION SELECT"', desc: 'Match this exact byte sequence in the matched buffer' },
      { key: 'http_uri', value: '(buffer modifier)', desc: 'Apply content match to the HTTP URI (URL path + query string) only, not the full packet' },
      { key: 'nocase', value: '(flag)', desc: 'Case-insensitive matching: matches "union select", "UNION SELECT", "Union Select"' },
      { key: 'classtype', value: 'web-application-attack', desc: 'Categorize for SIEM routing and priority assignment' },
      { key: 'sid', value: '1001', desc: 'Unique rule identifier — must be unique in your rule set' },
    ],
    explanation: 'This rule alerts on HTTP requests containing "UNION SELECT" in the URI — a classic SQL injection indicator. The flow modifier ensures we only inspect requests, not responses. nocase makes evasion by capitalization ineffective.',
    category: 'Web Attack',
  },
  {
    id: 'port-scan',
    rule: 'alert tcp any any -> $HOME_NET any (msg:"Nmap SYN Scan Detected"; flags:S; threshold:type threshold,track by_src,count 20,seconds 10; classtype:network-scan; sid:1002; rev:1;)',
    action: 'alert',
    protocol: 'tcp',
    src: 'any any',
    dst: '$HOME_NET any',
    options: [
      { key: 'msg', value: '"Nmap SYN Scan Detected"', desc: 'Alert description' },
      { key: 'flags', value: 'S', desc: 'Match TCP packets with ONLY the SYN flag set (SYN without ACK = new connection attempt, half-open scan)' },
      { key: 'threshold', value: 'type threshold,track by_src,count 20,seconds 10', desc: 'Alert only when the same source IP matches this rule 20+ times in 10 seconds — filters out noise from legitimate single connections' },
      { key: 'classtype', value: 'network-scan', desc: 'Categorize as a scanning event' },
      { key: 'sid', value: '1002', desc: 'Unique rule ID' },
    ],
    explanation: 'Detects rapid SYN-only packets from a single source — the fingerprint of a SYN/half-open port scan. The threshold prevents alerting on normal single connection SYNs. 20 SYNs in 10 seconds from one IP to different ports is almost certainly a scan.',
    category: 'Reconnaissance',
  },
  {
    id: 'dns-tunnel',
    rule: 'alert dns $HOME_NET any -> any 53 (msg:"Possible DNS Tunneling - Long FQDN"; dns_query; content:"."; pcre:"/[a-zA-Z0-9]{30,}\\./"; classtype:policy-violation; sid:1003; rev:1;)',
    action: 'alert',
    protocol: 'dns',
    src: '$HOME_NET any',
    dst: 'any 53',
    options: [
      { key: 'msg', value: '"Possible DNS Tunneling - Long FQDN"', desc: 'Alert description' },
      { key: 'dns_query', value: '(buffer modifier)', desc: 'Apply match to the DNS question/query portion of the DNS message only' },
      { key: 'content', value: '"."', desc: 'Quick content filter: ensure the query contains a dot (all FQDNs do)' },
      { key: 'pcre', value: '"/[a-zA-Z0-9]{30,}\\./"', desc: 'Perl Compatible Regular Expression: match a label of 30+ alphanumeric characters before a dot. DNS tunnel tools encode data as long base64/hex labels like "aGVsbG93b3JsZA.c2VjcmV0.attacker.com"' },
      { key: 'classtype', value: 'policy-violation', desc: 'Classify for routing to appropriate analyst queue' },
      { key: 'sid', value: '1003', desc: 'Unique rule ID' },
    ],
    explanation: 'DNS tunneling tools encode data in long base32/base64 labels (iodine uses up to 63-char labels). Legitimate DNS queries rarely have labels longer than 30 characters. The PCRE match catches any label ≥30 chars — a strong indicator of tunneling or DGA domain generation.',
    category: 'Exfiltration',
  },
  {
    id: 'c2-beacon',
    rule: 'alert http $HOME_NET any -> $EXTERNAL_NET any (msg:"Possible C2 Beaconing - Regular HTTP Interval"; flow:to_server,established; http_method; content:"GET"; http_uri; content:"/update"; detection_filter:track by_src,count 10,seconds 60; classtype:trojan-activity; sid:1004; rev:1;)',
    action: 'alert',
    protocol: 'http',
    src: '$HOME_NET any',
    dst: '$EXTERNAL_NET any',
    options: [
      { key: 'msg', value: '"Possible C2 Beaconing"', desc: 'Alert description for analyst review' },
      { key: 'flow', value: 'to_server,established', desc: 'Outbound established connections only' },
      { key: 'http_method; content:"GET"', value: '', desc: 'Match GET requests specifically in the HTTP method buffer' },
      { key: 'http_uri; content:"/update"', value: '', desc: 'Match URI containing "/update" — a common C2 check-in path pattern' },
      { key: 'detection_filter', value: 'track by_src,count 10,seconds 60', desc: 'Only alert if the same source makes 10+ matches in 60 seconds — beacons repeat regularly, legitimate traffic does not' },
    ],
    explanation: 'C2 malware typically checks in with its server on a regular interval (beaconing). This rule flags hosts that make 10+ HTTP GET requests to "/update" on an external host within 60 seconds. The regularity is the signature of beaconing rather than a single request.',
    category: 'Command & Control',
  },
]

function SuricataRuleExplorer() {
  const [sel, setSel] = useState<string>('sql-injection')
  const [activeOpt, setActiveOpt] = useState<number | null>(0)
  const r = SURICATA_RULES.find(x => x.id === sel)!
  const opt = activeOpt !== null ? r.options[activeOpt] : null
  const CAT_COLORS: Record<string, string> = { 'Web Attack': '#ef4444', 'Reconnaissance': '#3b82f6', 'Exfiltration': '#f97316', 'Command & Control': '#8b5cf6' }

  return (
    <div style={{ background: '#f8fafc', border: '2px solid #10b981', borderRadius: '14px', padding: '1.5rem', margin: '1.5rem 0' }}>
      <h3 style={{ fontWeight: 800, color: '#10b981', marginBottom: '0.25rem' }}>Suricata Rule Anatomy</h3>
      <p style={{ color: '#64748b', fontSize: '0.9rem', marginBottom: '1.25rem' }}>Select a rule, then click an option keyword to understand what each part does.</p>
      <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '1.25rem' }}>
        {SURICATA_RULES.map(rule => (
          <button key={rule.id} onClick={() => { setSel(rule.id); setActiveOpt(0) }}
            style={{ padding: '0.4rem 0.85rem', borderRadius: '7px', border: `2px solid ${CAT_COLORS[rule.category]}`, background: sel === rule.id ? CAT_COLORS[rule.category] : '#fff', color: sel === rule.id ? '#fff' : CAT_COLORS[rule.category], fontWeight: 700, cursor: 'pointer', fontSize: '0.82rem' }}>
            {rule.category}
          </button>
        ))}
      </div>
      <div style={{ background: '#0f172a', borderRadius: '8px', padding: '0.85rem 1rem', marginBottom: '1rem', fontFamily: 'monospace', fontSize: '0.78rem', color: '#e2e8f0', overflowX: 'auto', lineHeight: 1.6 }}>
        {r.rule}
      </div>
      <div style={{ color: '#334155', lineHeight: 1.7, marginBottom: '1rem', fontSize: '0.92rem' }}>{r.explanation}</div>
      <div style={{ fontWeight: 700, color: '#475569', fontSize: '0.85rem', marginBottom: '0.5rem' }}>OPTION DETAILS — click to inspect</div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem', marginBottom: '1rem' }}>
        {r.options.map((o, i) => (
          <div key={i}
            onClick={() => setActiveOpt(activeOpt === i ? null : i)}
            style={{ cursor: 'pointer', borderRadius: '7px', border: `1.5px solid ${activeOpt === i ? '#10b981' : '#e2e8f0'}`, background: activeOpt === i ? '#ecfdf5' : '#fff', padding: '0.5rem 0.85rem', display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
            <code style={{ fontFamily: 'monospace', fontWeight: 800, color: '#10b981', fontSize: '0.85rem', minWidth: '130px', flexShrink: 0 }}>{o.key}</code>
            <span style={{ fontFamily: 'monospace', fontSize: '0.82rem', color: '#475569' }}>{o.value}</span>
          </div>
        ))}
      </div>
      {opt && (
        <div style={{ background: '#fff', borderRadius: '9px', border: '2px solid #10b981', padding: '0.85rem 1.1rem', color: '#334155', lineHeight: 1.7 }}>
          <span style={{ fontWeight: 800, color: '#10b981' }}>{opt.key}: </span>{opt.desc}
        </div>
      )}
    </div>
  )
}

// ─── interactive component 3: Alert Triage Decision Tree ────────────────────
type AlertScenario = {
  id: string
  alertText: string
  details: string[]
  verdict: 'True Positive' | 'False Positive' | 'Needs Investigation'
  reasoning: string
  response: string
  color: string
}
const ALERT_SCENARIOS: AlertScenario[] = [
  {
    id: 'sqli-fp',
    alertText: 'SQL Injection Attempt detected — Source: 10.0.1.50, Dst: 192.168.3.10:443',
    details: ['Source is internal application server', 'Destination is internal DB host on port 443 (non-standard)', 'Content match: "UNION SELECT" in URI', 'Time: 2:30 PM business hours, same pattern for 3 weeks'],
    verdict: 'False Positive',
    reasoning: 'The "UNION SELECT" appears in a legitimate internal application\'s API call that uses this as part of its normal query syntax (perhaps a reporting query). The regular daily pattern and internal source suggest this is application behavior that happens to match the signature, not an attack.',
    response: 'Tune the rule with an exception for this specific source IP + destination. Document the exception with the application owner\'s approval. Consider adding a whitelist entry rather than disabling the rule.',
    color: '#10b981',
  },
  {
    id: 'scan-tp',
    alertText: 'Port Scan Detected — Source: 45.33.32.156 (Linode/Nmap Inc), 2,000 ports in 15s',
    details: ['Source IP resolves to known Nmap scanning service / Shodan', 'Scanning happened at 3:47 AM', 'Touched 2,000 unique destination ports', 'No legitimate business reason for this IP to scan'],
    verdict: 'True Positive',
    reasoning: 'External IP scanning 2,000 ports at 3 AM is unambiguously a port scan from an external entity. The source IP belonging to a known scanning service confirms this. This is reconnaissance against the perimeter — legitimate behavior.',
    response: 'Block the source IP. Check firewall rules to confirm all unexpected open ports are closed. Review what services are exposed. No incident required, but log for trend tracking.',
    color: '#ef4444',
  },
  {
    id: 'beacon-investigate',
    alertText: 'Possible C2 Beaconing — Src: 10.0.1.25 (Marketing laptop), Dst: 52.10.15.200, every 60s for 4 hours',
    details: ['HTTP GET /update every 60 seconds for 4+ hours, 240 requests total', 'Destination IP resolves to AWS, no known domain', 'No certificate for the destination (plain HTTP)', 'User logged in, active during business hours', 'Process: chrome.exe (unusual for this user agent)'],
    verdict: 'Needs Investigation',
    reasoning: 'Regular beaconing to an unknown AWS IP on plain HTTP with no domain name is highly suspicious. It could be a legitimate software updater, or it could be malware C2. The lack of a domain name (using raw IP) and plain HTTP are unusual for legitimate software.',
    response: 'Isolate the host from the network. Collect memory dump and disk image. Analyze the process making the connections (chrome.exe with unusual user agent may indicate injected code). Contact the user. Open incident. Escalate to IR team.',
    color: '#f59e0b',
  },
  {
    id: 'tunnel-tp',
    alertText: 'DNS Tunneling Detected — Src: 10.0.2.15, 500 queries/min to attacker.example.com with 50+ char labels',
    details: ['500 DNS queries per minute (normal: ~1-5/min)', 'All queries to *.random50chars.attacker.example.com', 'Labels contain base32-encoded data patterns', 'System is a workstation, started after 23:00 last night', 'No browser activity during this period'],
    verdict: 'True Positive',
    reasoning: '500 DNS queries per minute with long base32-encoded labels to a single external domain at night with no user activity is DNS tunneling. This is a textbook iodine/dnscat2 exfiltration or C2 channel. There is no benign explanation for this traffic pattern.',
    response: 'CRITICAL: Isolate host immediately. Block attacker.example.com at DNS + firewall. Preserve forensic evidence. Open P1 incident. Assume the host is compromised and data may have been exfiltrated. Check which user was logged in and review their access.',
    color: '#ef4444',
  },
]

function AlertTriageExplorer() {
  const [sel, setSel] = useState<string>('beacon-investigate')
  const a = ALERT_SCENARIOS.find(x => x.id === sel)!
  const vColor = { 'True Positive': '#ef4444', 'False Positive': '#10b981', 'Needs Investigation': '#f59e0b' }

  return (
    <div style={{ background: '#f8fafc', border: '2px solid #8b5cf6', borderRadius: '14px', padding: '1.5rem', margin: '1.5rem 0' }}>
      <h3 style={{ fontWeight: 800, color: '#8b5cf6', marginBottom: '0.25rem' }}>Alert Triage Scenarios</h3>
      <p style={{ color: '#64748b', fontSize: '0.9rem', marginBottom: '1.25rem' }}>Select a real-world IDS alert and see how an analyst triages it.</p>
      <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '1.25rem' }}>
        {ALERT_SCENARIOS.map(s => (
          <button key={s.id} onClick={() => setSel(s.id)}
            style={{ padding: '0.4rem 0.85rem', borderRadius: '7px', border: `2px solid ${s.color}`, background: sel === s.id ? s.color : '#fff', color: sel === s.id ? '#fff' : s.color, fontWeight: 700, cursor: 'pointer', fontSize: '0.82rem' }}>
            {s.verdict === 'False Positive' ? 'FP: SQLi' : s.verdict === 'Needs Investigation' ? '? Beacon' : s.id === 'scan-tp' ? 'TP: Scan' : 'TP: DNS'}
          </button>
        ))}
      </div>
      <div style={{ background: '#fff', borderRadius: '10px', border: `2px solid ${a.color}`, padding: '1.1rem 1.25rem' }}>
        <div style={{ background: '#f0f4ff', borderRadius: '7px', padding: '0.65rem 1rem', marginBottom: '0.75rem', fontFamily: 'monospace', fontSize: '0.88rem', color: '#1e293b' }}>{a.alertText}</div>
        <div style={{ marginBottom: '0.75rem' }}>
          <div style={{ fontWeight: 700, color: '#475569', fontSize: '0.82rem', marginBottom: '0.35rem' }}>EVIDENCE</div>
          <ul style={{ margin: 0, paddingLeft: '1.25rem' }}>
            {a.details.map((d, i) => <li key={i} style={{ color: '#334155', fontSize: '0.9rem', lineHeight: 1.7 }}>{d}</li>)}
          </ul>
        </div>
        <div style={{ background: vColor[a.verdict] + '15', border: `2px solid ${vColor[a.verdict]}`, borderRadius: '8px', padding: '0.65rem 1rem', marginBottom: '0.75rem' }}>
          <span style={{ fontWeight: 800, color: vColor[a.verdict], fontSize: '1rem' }}>VERDICT: {a.verdict}</span>
        </div>
        <div style={{ marginBottom: '0.65rem' }}>
          <div style={{ fontWeight: 700, color: '#475569', fontSize: '0.82rem', marginBottom: '0.25rem' }}>REASONING</div>
          <div style={{ color: '#334155', lineHeight: 1.7, fontSize: '0.92rem' }}>{a.reasoning}</div>
        </div>
        <div>
          <div style={{ fontWeight: 700, color: '#475569', fontSize: '0.82rem', marginBottom: '0.25rem' }}>RESPONSE</div>
          <div style={{ color: '#334155', lineHeight: 1.7, fontSize: '0.92rem' }}>{a.response}</div>
        </div>
      </div>
    </div>
  )
}

// ─── main export ─────────────────────────────────────────────────────────────
export default function IdsAndIpsPage() {
  return (
    <LearnLayout
      title="IDS and IPS"
      description="From signature matching to machine learning anomaly detection: how intrusion detection and prevention systems work, why they alert on everything and nothing, and how to make them useful."
      section="Networking Fundamentals — Module 35"
      readTime="28–38 min"
      updatedAt="May 2026"
    >
      {/* ── Chapter 1 ─────────────────────────────────────────── */}
      <Chapter n={1} title="The Alert That Saved a Network — and the One That Was Ignored" />
      <StoryBox>
        2013. Target Corporation. An HVAC contractor's credentials are stolen via phishing. The attacker uses them to access Target's vendor portal, moves laterally to point-of-sale systems, and installs malware that exfiltrates 40 million credit card numbers. The shocking part: Target had a state-of-the-art intrusion detection system (FireEye) that detected the malware and generated alerts — days before the data was stolen. The alerts were reviewed by analysts in Bangalore who flagged them as suspicious and escalated. The escalations were ignored by the Minneapolis security team. The FireEye system was actually doing its job. The human processes failed.
      </StoryBox>
      <Para>
        Intrusion Detection Systems (IDS) and Intrusion Prevention Systems (IPS) are security tools that monitor network traffic for malicious activity. An IDS detects and alerts; an IPS also takes automated action (blocks, resets connections, drops packets). Both are only as good as their rules, their tuning, and — crucially — the humans who respond to their alerts.
      </Para>
      <Para>
        Understanding IDS/IPS requires understanding both the technology (how detection works, what rules look like, how placement affects visibility) and the operational reality (alert fatigue, false positives, tuning, analyst workflow). The technology is learnable in a day. The operational excellence takes years.
      </Para>
      <WowBox>
        The average Security Operations Center receives 10,000+ alerts per day. Studies show that 45% of alerts are never investigated, and of those investigated, 66% are false positives. Alert fatigue — where analysts become desensitized to alerts and stop treating them seriously — is cited as a primary factor in major breaches that were technically detected before the damage occurred.
      </WowBox>

      <Divider />
      {/* ── Chapter 2 ─────────────────────────────────────────── */}
      <Chapter n={2} title="IDS vs. IPS: Detection vs. Prevention" />
      <StoryBox>
        The distinction seems simple: IDS watches and reports, IPS watches and acts. But the operational consequences of this distinction are profound. An IPS that blocks too aggressively disrupts legitimate business traffic — resulting in calls from executives and engineers complaining that the security team broke something. An IDS that alerts too liberally creates noise that hides real incidents. Both failure modes are common. Both are usually the result of poor tuning, not poor technology.
      </StoryBox>
      <H2>Network IDS/IPS (NIDS/NIPS)</H2>
      <Para>
        <Accent>NIDS</Accent>: passively monitors network traffic. Receives traffic via a network tap or span port (mirrored copy). Since it receives copies of packets, it cannot block traffic — it can only detect and alert. If it generates a false positive, no traffic is disrupted. If it misses an attack, the attack succeeds.
      </Para>
      <Para>
        <Accent>NIPS</Accent>: sits inline in the traffic path. Traffic must pass through the IPS before reaching its destination. The IPS can drop, modify, or reset packets. False positive = legitimate traffic blocked. True positive = attack stopped before reaching the target. The inline placement introduces latency and creates a potential network availability risk (if the IPS fails, does traffic continue?).
      </Para>
      <H2>Host-Based IDS/IPS (HIDS/HIPS)</H2>
      <Para>
        <Accent>HIDS</Accent>: an agent running on a specific host that monitors system calls, file access, process behavior, and log events. Can detect attacks that bypass network detection (e.g., an attack originating from a permitted connection, insider threats, local privilege escalation). Examples: OSSEC, Wazuh, Falco (containers), auditd.
      </Para>
      <Para>
        <Accent>HIPS</Accent>: same as HIDS but can take blocking actions (kill processes, quarantine files, block specific system calls via seccomp). Modern endpoint protection platforms (CrowdStrike Falcon, SentinelOne) are HIPS with behavioral detection and ML.
      </Para>
      <H2>Deployment Modes</H2>
      <Para>
        <Accent>Inline (IPS mode)</Accent>: traffic passes through. Can block. Single point of failure. Introduces latency. Requires bypass/fail-open capability for HA.
      </Para>
      <Para>
        <Accent>Passive tap (IDS mode)</Accent>: receives a copy of traffic. Cannot block. No single point of failure. Zero latency impact. Can send TCP RSTs to terminate detected sessions.
      </Para>
      <Para>
        <Accent>Span/mirror port</Accent>: traffic is mirrored from a switch port to the IDS. No physical inline risk. But switch CPU overhead can cause dropped packets in mirroring, leading to missed detections.
      </Para>

      <Divider />
      {/* ── Chapter 3 ─────────────────────────────────────────── */}
      <Chapter n={3} title="Detection Methods: From Signatures to Machine Learning" />
      <StoryBox>
        In 1999, the first version of Snort was released by Marty Roesch. It was a simple rule-based packet sniffer that grew into the world's most widely deployed intrusion detection system. Snort's signature language defined the template for IDS rules for 25 years. But signature-based detection has a fundamental limitation: it can only detect what it already knows. Every zero-day, every custom malware, every novel attack technique is invisible to signatures. This drove the development of anomaly-based and machine-learning approaches.
      </StoryBox>
      <DetectionMethodComparator />
      <H2>The Detection Accuracy Matrix</H2>
      <Para>
        IDS detection has four outcomes for any event:
      </Para>
      <Para>
        — <Accent>True Positive (TP)</Accent>: the system correctly identifies an attack. This is what we want.
      </Para>
      <Para>
        — <Accent>False Positive (FP)</Accent>: the system alerts on legitimate traffic. Alert fatigue, wasted analyst time, potential blocking of legitimate activity.
      </Para>
      <Para>
        — <Accent>True Negative (TN)</Accent>: the system correctly allows legitimate traffic. Silent success — most IDS actions.
      </Para>
      <Para>
        — <Accent>False Negative (FN)</Accent>: the system misses an attack. Silent failure — the attack succeeds undetected. The most dangerous outcome.
      </Para>
      <Para>
        The tradeoff between FP and FN is the core challenge of IDS tuning. More sensitive detection → more TPs but also more FPs. Less sensitive → fewer FPs but more FNs. The right balance depends on the environment: a high-security financial network tolerates more FPs to minimize FNs; a high-availability e-commerce site might prioritize FP reduction to minimize disruption.
      </Para>

      <Divider />
      {/* ── Chapter 4 ─────────────────────────────────────────── */}
      <Chapter n={4} title="Suricata: The Modern Open-Source IDS/IPS" />
      <StoryBox>
        Suricata was released by the Open Information Security Foundation (OISF) in 2010 as a multi-threaded alternative to Snort. Where Snort was largely single-threaded (limited to one core), Suricata was designed to take advantage of multi-core CPUs and high-speed network interfaces. Today, Suricata is used in cloud-native environments, powers AWS Network Firewall's inspection engine, and processes traffic at 40 Gbps+ on modern hardware.
      </StoryBox>
      <H2>Suricata Rule Structure</H2>
      <Para>
        Suricata rules follow the format: <Code>action protocol src_ip src_port direction dst_ip dst_port (options)</Code>
      </Para>
      <SuricataRuleExplorer />
      <H2>Key Suricata Features</H2>
      <Para>
        <Accent>Multi-threaded</Accent>: each CPU core handles separate packet streams. Can process 10-40 Gbps on commodity hardware.
      </Para>
      <Para>
        <Accent>Protocol parsers</Accent>: understands HTTP, DNS, TLS, SMTP, FTP, SSH at the application layer. Rules can match specific HTTP headers, DNS query types, TLS certificates.
      </Para>
      <Para>
        <Accent>File extraction</Accent>: can extract files from HTTP, FTP, SMTP streams and submit to antivirus or sandbox.
      </Para>
      <Para>
        <Accent>Flowbits</Accent>: track state across multiple packets — set a flag on packet 1, check it on packet 3. Enables multi-stage attack detection.
      </Para>
      <Para>
        <Accent>Lua scripting</Accent>: write detection logic in Lua for complex conditions that rules can't express.
      </Para>
      <CodeBlock>{`# Suricata YAML configuration (suricata.yaml)
vars:
  address-groups:
    HOME_NET: "[10.0.0.0/8,172.16.0.0/12,192.168.0.0/16]"
    EXTERNAL_NET: "!$HOME_NET"
    HTTP_SERVERS: "$HOME_NET"
    DNS_SERVERS: "$HOME_NET"

# Rule sources
default-rule-path: /etc/suricata/rules
rule-files:
  - suricata.rules
  - emerging-attack_response.rules
  - emerging-malware.rules
  - local.rules   # your custom rules

# Output: eve.json for SIEM integration
outputs:
  - eve-log:
      enabled: yes
      filetype: regular
      filename: /var/log/suricata/eve.json
      types:
        - alert
        - http
        - dns
        - tls

# AF_PACKET for high-performance capture
af-packet:
  - interface: eth0
    cluster-id: 99
    cluster-type: cluster_flow
    defrag: yes
    threads: auto`}</CodeBlock>

      <Divider />
      {/* ── Chapter 5 ─────────────────────────────────────────── */}
      <Chapter n={5} title="Snort: The Classic IDS" />
      <StoryBox>
        Snort was to IDS what Linux was to operating systems: an open-source tool that democratized a technology previously available only to large organizations with big budgets. Released in 1998, it became the world's most deployed IDS. Snort's rule language — action, header, options — became the de facto standard. The Emerging Threats (ET) rule set, compatible with both Snort and Suricata, provides thousands of community-maintained rules updated daily.
      </StoryBox>
      <H2>Snort Rule Format</H2>
      <CodeBlock>{`# Snort/Suricata compatible rule format
# action proto src_ip src_port dir dst_ip dst_port (options)

# Example: detect Metasploit meterpreter HTTP reverse shell
alert tcp $HOME_NET any -> $EXTERNAL_NET $HTTP_PORTS (
  msg:"MALWARE-CNC Win.Trojan.Meterpreter HTTP variant outbound connection";
  flow:to_server,established;
  urilen:>600;
  http_uri;
  content:"/C_YYYYYYY";
  classtype:trojan-activity;
  sid:5001;
  rev:2;
)

# Detect cleartext FTP credentials
alert tcp any any -> any 21 (
  msg:"FTP Password Transmitted in Cleartext";
  flow:to_server,established;
  content:"PASS ";
  nocase;
  classtype:policy-violation;
  sid:5002;
  rev:1;
)`}</CodeBlock>
      <H2>Emerging Threats Rule Sets</H2>
      <Para>
        Emerging Threats (ET) provides free and commercial rule sets:
      </Para>
      <Para>
        <Code>ET Open</Code>: free, community rules. Updated several times per day. Covers: malware, exploit kits, C2, policy, scanning, web attacks.
      </Para>
      <Para>
        <Code>ET Pro</Code>: commercial rules with faster updates and broader coverage.
      </Para>
      <Para>
        Rules are distributed as .rules files that are downloaded and referenced in the IDS configuration. Rule updates should be automated (daily or hourly for active threat environments).
      </Para>

      <Divider />
      {/* ── Chapter 6 ─────────────────────────────────────────── */}
      <Chapter n={6} title="IDS Placement Strategy" />
      <StoryBox>
        A network architect debates where to place IDS sensors: at the internet edge (sees all incoming attacks), inside the DMZ (sees attacks that pass the firewall), or distributed throughout the internal network (sees lateral movement). The answer is: all of the above. Each placement sees different traffic, has different blind spots, and catches different attack stages.
      </StoryBox>
      <H2>Internet Edge (Outside Firewall)</H2>
      <Para>
        Sees all internet traffic, including traffic the firewall will block. Provides insight into the threat landscape ("are we being scanned?", "are there attacks against a port we have open?"). High noise level — internet-facing sensors see enormous volumes of background scanning and probing. Useful for: threat intelligence, firewall policy validation, understanding your external attack surface.
      </Para>
      <H2>DMZ Segment</H2>
      <Para>
        Sees traffic that passed the perimeter firewall. Alerts here indicate either a firewall policy gap or an attack against explicitly permitted services. Essential for monitoring web servers, email gateways, and other internet-exposed hosts. Lower volume than edge sensors, higher signal.
      </Para>
      <H2>Internal Segments</H2>
      <Para>
        Sees east-west traffic between internal VLANs. This is where lateral movement, internal reconnaissance, and data exfiltration from compromised internal hosts are visible. Critical for detecting compromised internal systems. Most organizations have no internal IDS visibility — their IDS is only at the perimeter, which is why lateral movement goes undetected for months.
      </Para>
      <H2>Tap vs. SPAN Port</H2>
      <Para>
        <Accent>Network tap</Accent>: hardware device that passively copies all traffic. Transparent to the network. No packet loss. Preserves electrical signal independently. More expensive but more reliable.
      </Para>
      <Para>
        <Accent>SPAN port</Accent>: switch feature that mirrors traffic from one or more ports to a dedicated monitor port. Free (software feature). Risk: SPAN ports can drop packets under high load, creating IDS blind spots. Also: some switches cannot SPAN their own management traffic.
      </Para>
      <Warn>
        SPAN ports configured to mirror too many source ports (many gigabits of traffic) to a single 1G monitor port will silently drop packets. The IDS receives an incomplete view of the network. Monitor SPAN port utilization and ensure the mirror port has sufficient capacity for the traffic being monitored.
      </Warn>

      <Divider />
      {/* ── Chapter 7 ─────────────────────────────────────────── */}
      <Chapter n={7} title="Alert Triage and False Positive Management" />
      <StoryBox>
        A Tier 1 analyst at a SOC opens their morning queue to find 847 unreviewed alerts. They have 4 hours before the next shift. That is one alert every 17 seconds. In this environment, "triaging" means rapidly classifying each alert as credible or noise. 80% are immediately dismissed based on pattern recognition. 15% get a 2-minute investigation. 5% get escalated. Two of the escalated alerts turn out to be a red teamer running a scan (expected). Three turn out to be legitimate incidents. This is the daily reality of IDS operations.
      </StoryBox>
      <AlertTriageExplorer />
      <H2>Tuning to Reduce False Positives</H2>
      <Para>
        1. <Accent>Suppress rules for known-good traffic</Accent>: add suppress rules that prevent alerting from specific source IPs or to specific destinations that you know generate FPs.
      </Para>
      <Para>
        2. <Accent>Threshold rules</Accent>: require N occurrences in X seconds before alerting. Eliminates one-off matches that are almost always coincidental.
      </Para>
      <Para>
        3. <Accent>Pass rules</Accent>: explicitly allow traffic that matches an attack signature but is known-good. Pass rules have higher priority than alert rules.
      </Para>
      <Para>
        4. <Accent>Context enrichment</Accent>: tag alerts with asset context (is the destination a web server? is the source an internal server?). An XSS alert against a database server is different from one against a web application server.
      </Para>
      <CodeBlock>{`# Suricata: suppress FP for known-good internal scanner
suppress gen_id 1, sig_id 1002, track by_src, ip 10.0.5.10/32
# This suppresses rule SID 1002 when source is the internal vulnerability scanner

# Threshold: alert only after 10 hits in 5 minutes
threshold gen_id 1, sig_id 1001, type limit, track by_src, count 10, seconds 300

# Pass rule (higher priority than alert rules)
pass tcp 10.0.3.5 any -> any 443 (msg:"Known good backup agent"; sid:9001;)`}</CodeBlock>

      <Divider />
      {/* ── Chapter 8 ─────────────────────────────────────────── */}
      <Chapter n={8} title="IPS Inline Mode: The Prevention Trade-Off" />
      <StoryBox>
        A security team deploys an IPS in inline mode. Within the first week, it blocks a legitimate vulnerability scanner operated by the company's own red team. Then it blocks traffic from a load balancer because the balancer's health check matched an attack signature. Then it blocks a critical database sync because the query pattern resembled SQL injection. Three incidents in one week, all caused by FPs. The security team is under pressure to disable the IPS. They tune it — but the tuning takes weeks of careful analysis.
      </StoryBox>
      <H2>Fail-Open vs. Fail-Closed</H2>
      <Para>
        An inline IPS must handle hardware or software failure. Two modes:
      </Para>
      <Para>
        <Accent>Fail-open</Accent>: on IPS failure, traffic bypasses the IPS and flows normally. Network stays available. Security gap during failure.
      </Para>
      <Para>
        <Accent>Fail-closed</Accent>: on IPS failure, all traffic is blocked. Network goes down. Maximum security, zero availability. Appropriate only for the most critical paths where the risk of a breach exceeds the risk of an outage.
      </Para>
      <Para>
        Most production IPS deployments use fail-open with out-of-band alerting on IPS failure, so network operations know immediately when the IPS is bypassed.
      </Para>
      <H2>IPS Modes for New Deployments</H2>
      <Para>
        Best practice for deploying a new IPS:
      </Para>
      <Para>
        1. Start in IDS mode (detection only). Collect 2-4 weeks of data. Analyze FP rate for each rule.
      </Para>
      <Para>
        2. Tune high-FP rules: add suppressions, tune thresholds, disable rules that never TP.
      </Para>
      <Para>
        3. Move high-confidence, low-FP rules to IPS mode first (known malware signatures, CVE-specific rules).
      </Para>
      <Para>
        4. Gradually move more rules to IPS mode as confidence builds.
      </Para>
      <Para>
        5. Keep anomaly-detection rules in IDS mode indefinitely — they have inherently high FP rates and should not block.
      </Para>

      <Divider />
      {/* ── Chapter 9 ─────────────────────────────────────────── */}
      <Chapter n={9} title="Evasion Techniques: How Attackers Bypass IDS/IPS" />
      <StoryBox>
        An attacker wants to exploit a web server. The IDS has a signature for the exact exploit string. The attacker splits the exploit across multiple TCP segments, each too short to match the signature alone. The IDS reassembles TCP streams — but its reassembly differs from the target server's reassembly in edge cases. The attacker exploits this difference: the IDS sees innocent data, the server reconstructs the exploit. This class of attacks — insertion/evasion using TCP/IP fragmentation — was described by Ptacek and Newsham in their seminal 1998 paper.
      </StoryBox>
      <H2>Packet Fragmentation</H2>
      <Para>
        IP fragmentation splits a packet across multiple IP fragments. The IDS must reassemble them to inspect the complete payload. Attackers can overlap fragments (second fragment overlaps bytes from first) where different OS implementations handle the overlap differently. The IDS may reconstruct one version; the target OS another — the exploit is in the version the target sees.
      </Para>
      <H2>TCP Segmentation</H2>
      <Para>
        Attackers split signatures across TCP segments. "UNION SELECT" becomes "UNI" in one TCP segment and "ON SELECT" in the next. A naive IDS checks only individual segments. A stream-aware IDS must reassemble the TCP stream and then check — but must handle all the edge cases of TCP (retransmissions, out-of-order delivery, overlapping data).
      </Para>
      <H2>Encoding and Obfuscation</H2>
      <Para>
        URL encoding: <Code>UNION%20SELECT</Code> — the %20 is decoded to space by the web server but may not match a raw-bytes signature. Unicode encoding. Double encoding. Null bytes in payloads. Character case variations. IDS must normalize the traffic before matching signatures.
      </Para>
      <H2>Protocol Compliance Exploitation</H2>
      <Para>
        Sending protocol violations that the IDS drops but the target accepts. For example, HTTP requests with invalid content-length headers that confuse stream reassembly. The Ptacek-Newsham paper identified 15+ such techniques. Modern IDS engines address these with normalization passes before signature matching.
      </Para>
      <H2>Encryption</H2>
      <Para>
        TLS encryption completely hides payload from network IDS. Without TLS inspection, an IDS can only see: TLS SNI (hostname), certificate details, connection timing, traffic volume patterns. Behavioral detection on encrypted traffic (detecting C2 beaconing by timing patterns) is the primary mechanism for encrypted traffic analysis.
      </Para>

      <Divider />
      {/* ── Chapter 10 ─────────────────────────────────────────── */}
      <Chapter n={10} title="Network Detection and Response (NDR)" />
      <StoryBox>
        A CISO asks: "We have a Suricata deployment with 50,000 ET rules. Why did we miss the attacker who spent 4 months inside our network?" The answer: the attacker used a custom implant with no known signature, moved laterally using valid credentials, and exfiltrated data in small chunks via HTTPS to a cloud storage service that the firewall allows. No signature matched. NDR (Network Detection and Response) approaches this problem from the other direction: not "do I recognize this as bad?" but "does this behavior deviate from what is normal?"
      </StoryBox>
      <H2>NDR vs. Traditional IDS</H2>
      <Para>
        Traditional IDS: pattern-matching against known signatures. Fast, precise, zero-day blind.
      </Para>
      <Para>
        NDR: machine learning on network traffic patterns, connection metadata, protocol timing, flow statistics. Detects anomalous behavior even from novel attacks. Higher FP rate, requires analyst investigation, but finds what signatures miss.
      </Para>
      <H2>NDR Data Sources</H2>
      <Para>
        <Accent>NetFlow/IPFIX</Accent>: connection metadata. Who talked to whom, how much, when. No payload. Enables lateral movement detection (internal hosts that suddenly start connecting to many other internal hosts).
      </Para>
      <Para>
        <Accent>Full packet capture (PCAP)</Accent>: complete packet contents for post-incident investigation. Extremely storage-intensive. Usually selective (capture only from suspicious hosts or segments).
      </Para>
      <Para>
        <Accent>DNS logs</Accent>: all DNS queries and responses. DGA (domain generation algorithm) domain detection, DNS tunneling detection, C2 domain lookups.
      </Para>
      <Para>
        <Accent>TLS metadata</Accent>: certificate details, cipher suites, JA3 fingerprints (TLS fingerprinting based on ClientHello parameters). Identifies malware that uses distinctive TLS configurations even in encrypted traffic.
      </Para>
      <H2>JA3 TLS Fingerprinting</H2>
      <Para>
        JA3 creates a fingerprint from the TLS ClientHello: SSL/TLS version + cipher suites + extensions + elliptic curves + elliptic curve point formats, all concatenated and MD5-hashed. Many malware families have consistent JA3 fingerprints regardless of the destination — the malware's TLS implementation is fingerprinted, not the content. Known malware JA3 fingerprints are published and can be used as IDS signatures for encrypted C2 traffic.
      </Para>

      <Divider />
      {/* ── Chapter 11 ─────────────────────────────────────────── */}
      <Chapter n={11} title="SIEM Integration and the Security Operations Pipeline" />
      <StoryBox>
        An IDS alert in isolation is a data point. The same alert correlated with authentication logs, endpoint data, and threat intelligence becomes context. An alert for "port scan from 10.0.1.50" means nothing. The same alert correlated with "10.0.1.50 had 50 failed logins 5 minutes ago" + "10.0.1.50 is a laptop assigned to a terminated employee" = credible incident with defined scope and response path. This is the SIEM's job.
      </StoryBox>
      <H2>The Alert Pipeline</H2>
      <Para>
        IDS (Suricata) → eve.json → log shipper (Filebeat/Fluent Bit) → SIEM (Elasticsearch/Splunk) → correlation rules → enrichment (GeoIP, threat intel, asset data) → prioritized alert queue → analyst workflow → incident response.
      </Para>
      <H2>SIEM Correlation Rules</H2>
      <Para>
        SIEM correlation rules aggregate multiple events into higher-confidence alerts:
      </Para>
      <CodeBlock>{`# Elasticsearch SIEM detection rule (EQL)
# Detect: port scan followed by successful authentication within 10 minutes
sequence by source.ip with maxspan=10m
  [network where event.type=="connection" and destination.port < 1024
   and count(*) > 50]
  [authentication where event.outcome=="success"]

# This creates a high-priority alert that requires both:
# 1. A port scan (>50 connections to ports <1024) from a source IP
# 2. AND a successful auth from the same IP within 10 minutes
# The sequence is much more suspicious than either event alone`}</CodeBlock>
      <H2>Threat Intelligence Integration</H2>
      <Para>
        MISP, Recorded Future, VirusTotal, AlienVault OTX provide threat intelligence feeds: known malicious IPs, domains, file hashes, attack patterns (MITRE ATT&CK TTPs). IDS rules can reference these feeds. SIEM correlation can auto-classify alerts against TI.
      </Para>

      <Divider />
      {/* ── Chapter 12 ─────────────────────────────────────────── */}
      <Chapter n={12} title="Cloud-Native IDS/IPS: AWS, Azure, GCP" />
      <StoryBox>
        A company migrates to AWS. They ask: "Do we need IDS?" The answer is different in the cloud. There is no network tap to install. SPAN ports don't exist in VPCs. But threat actors still target cloud workloads. AWS provides cloud-native IDS capabilities that integrate with the fabric of the cloud platform — without needing physical taps.
      </StoryBox>
      <H2>AWS GuardDuty</H2>
      <Para>
        AWS GuardDuty is a managed threat detection service that analyzes: VPC Flow Logs (connection metadata), DNS query logs (within VPC), CloudTrail API logs (AWS API calls), and EKS audit logs. GuardDuty uses ML and threat intelligence to detect: compromised EC2 instances communicating with known C2, unusual API calls (credential misuse), port scanning from EC2 instances, cryptocurrency mining.
      </Para>
      <H2>AWS Network Firewall + Suricata</H2>
      <Para>
        AWS Network Firewall uses Suricata rules for stateful deep packet inspection. Compatible with ET rule sets. Deployed as a managed VPC inspection endpoint. Inspect traffic between subnets, to internet, or from AWS Transit Gateway.
      </Para>
      <H2>VPC Traffic Mirroring</H2>
      <Para>
        AWS VPC Traffic Mirroring copies ENI traffic to a target (another ENI running an IDS appliance or a Network Load Balancer for scale). This is the cloud equivalent of a SPAN port — allows deploying a traditional IDS (Suricata, Zeek) in AWS without modifying application architecture.
      </Para>

      <Divider />
      {/* ── Chapter 13 ─────────────────────────────────────────── */}
      <Chapter n={13} title="Misconceptions About IDS and IPS" />
      <Err>
        "IPS blocks attacks, so we're protected." — IPS blocks traffic that matches rules. It does not block: zero-day attacks (no signature), encrypted C2 that passes TLS inspection exclusions, lateral movement using valid credentials, insider threats, attacks embedded in permitted protocols. IPS is one layer. Assume some attacks will pass and invest equally in detection and response capability.
      </Err>
      <Err>
        "More signatures equal better detection." — Signature bloat degrades performance and increases false positive rates. A rule set of 50,000 rules where 40,000 never fire and 5,000 generate mostly FPs is worse than 500 well-tuned, high-fidelity rules. Quality over quantity. Disable rules that are irrelevant to your environment (Windows-specific rules on a Linux-only network, for example).
      </Err>
      <Err>
        "IDS/IPS can inspect TLS traffic." — Without TLS inspection (MITM proxy), IDS only sees ciphertext in TLS payloads. It can inspect TLS metadata (SNI, certificate, cipher suite, JA3 fingerprint) and behavioral patterns, but not the actual HTTP request/response inside TLS. This is a growing blind spot as 95%+ of web traffic is now HTTPS.
      </Err>
      <Err>
        "Anomaly detection is better than signature detection." — Neither is strictly better. Anomaly detection finds behavioral deviations but has high FP rates that overwhelm analysts. Signature detection has low FP rates for known attacks but is blind to novel ones. Best practice is layered: signatures for known attacks, anomaly detection for novel behavior, behavioral rules for patterns in between. The combination provides broader coverage than either alone.
      </Err>
      <Err>
        "False negatives are acceptable as long as false positives are low." — False negatives mean attacks succeed undetected. The goal is to minimize both, not sacrifice one for the other. Tuning to eliminate FPs by disabling rules eliminates the TPs those rules provide. The right approach is to tune specific conditions that cause FPs (add suppressions, adjust thresholds) rather than disabling entire rules.
      </Err>

      <Divider />
      {/* ── Chapter 14 ─────────────────────────────────────────── */}
      <Chapter n={14} title="IQ Depth Check: IDS/IPS Mastery" />
      <IQ level="Beginner">
        <strong>What is the difference between IDS and IPS?</strong><br />
        IDS (Intrusion Detection System) monitors traffic and generates alerts when it detects suspicious activity. It is passive — it does not block traffic. IPS (Intrusion Prevention System) sits inline in the traffic path and can take automated actions: drop packets, send TCP resets, or block source IPs. The key tradeoff: IPS can stop attacks in real time but false positives disrupt legitimate traffic. IDS cannot stop attacks but false positives only waste analyst time.
      </IQ>
      <IQ level="Intermediate">
        <strong>Explain the false positive / false negative trade-off in IDS tuning.</strong><br />
        A False Positive (FP) occurs when IDS alerts on legitimate traffic — wasting analyst time, potentially blocking allowed traffic (in IPS mode), and contributing to alert fatigue. A False Negative (FN) occurs when the IDS misses an actual attack — the attack succeeds without detection. These trade off: increasing detection sensitivity catches more attacks (fewer FNs) but also matches more legitimate traffic (more FPs). Tuning involves finding the optimal sensitivity point for your environment, adding suppressions for known-good traffic patterns, and using thresholds to require repeated matches before alerting. High-security environments accept more FPs; high-availability environments may accept more FNs.
      </IQ>
      <IQ level="Senior">
        <strong>How do attackers use TCP stream reassembly differences to evade network IDS?</strong><br />
        TCP stream reassembly is necessary for IDS to inspect multi-packet content (URLs, SQL queries, file transfers). The evasion: send packets with conflicting or ambiguous data — multiple segments covering the same byte sequence with different content (overlapping segments). Different OS implementations handle these ambiguities differently (RFC 793 leaves some edge cases implementation-defined). By carefully crafting the overlap, an attacker can ensure the IDS reconstructs version A (innocent) while the target OS reconstructs version B (exploit). Similarly, sending segments out of order with unusual timestamps, or exploiting TCP window size limits, can cause IDS and endpoint to reconstruct different streams. Modern IDS engines mitigate this with normalization passes (pick the more conservative interpretation) and by emulating target-OS reassembly behavior.
      </IQ>
      <IQ level="PhD">
        <strong>Describe JA3 TLS fingerprinting and explain why it can detect encrypted malware C2 traffic, and what its limitations are.</strong><br />
        JA3 fingerprints are computed from the TLS ClientHello message before encryption: TLS version + cipher suite list + extension list + elliptic curve list + EC point format list, all concatenated with dashes and hashed with MD5. Each TLS client library (OpenSSL, NSS, BoringSSL, custom implementations) generates a distinctive combination of these parameters based on the library's defaults. Malware families often ship with a specific version of a library (sometimes statically linked) with a specific set of supported ciphers, producing a consistent JA3 fingerprint across all C2 connections. The fingerprint is visible in plaintext in the ClientHello — before the TLS handshake completes, before any application data is exchanged. Limitations: (1) JA3 fingerprints are not unique to malware — legitimate applications use the same libraries. A JA3 from an OpenSSL 1.1.1 default configuration matches both legitimate apps and malware using that OpenSSL version. The fingerprint is a contributing indicator, not definitive proof; (2) sophisticated malware can randomize ClientHello parameters (JA3S fingerprint on server side, JARM active fingerprinting) to defeat JA3; (3) CDN and cloud services mediate TLS connections, hiding the backend client's fingerprint; (4) JA3 databases require constant maintenance as library versions and malware change.
      </IQ>

      <Divider />
      <KeyTakeaways items={[
        'IDS detects and alerts (passive); IPS sits inline and can block (active). False positives in IPS mode disrupt legitimate traffic — deploy carefully, tune before enabling blocking.',
        'Detection methods: signature (known patterns, low FP), anomaly (behavioral baseline, high FP, catches zero-days), heuristic (logic rules, medium), ML (pattern classification, variable).',
        'Suricata/Snort rule format: action + protocol + src + direction + dst + (options). Options include content buffers (http_uri, dns_query), flow direction, thresholds, PCRE.',
        'The FP/FN tradeoff is the core IDS tuning challenge. High sensitivity → more TPs but more FPs. Tune with suppressions, thresholds, and pass rules — not by disabling entire rules.',
        'SPAN port mirroring can drop packets under high load, creating IDS blind spots. Use hardware network taps for reliable passive capture.',
        'TCP stream reassembly evasion: fragmentation, overlapping segments, out-of-order delivery. IDS must normalize traffic before signature matching.',
        'Encrypted traffic (TLS) hides payload from network IDS. JA3 fingerprints (from ClientHello) can identify malware TLS implementations in encrypted flows.',
        'NDR analyzes network behavior (flow data, timing, volume) rather than content. Detects lateral movement and C2 beaconing invisible to signature-based IDS.',
        'Alert triage requires context: the same alert means different things based on source type, destination, time, and correlated events. Integrate IDS with SIEM for enriched alerts.',
        'AWS GuardDuty provides cloud-native IDS via VPC Flow Logs, DNS logs, and CloudTrail. AWS Network Firewall uses Suricata for deep packet inspection.',
      ]} />
    </LearnLayout>
  )
}
