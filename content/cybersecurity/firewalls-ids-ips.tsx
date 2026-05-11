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

export default function Module30() {
  return (
    <LearnLayout
      title="Firewalls, IDS, and IPS — How Network Detection Actually Works"
      description="Stateful vs next-generation firewalls, intrusion detection and prevention systems, WAF architecture, firewall rule design, detection signatures, and tuning detection to catch real attacks without drowning in false positives."
      section="Cybersecurity — Module 30"
      readTime="31 min"
      updatedAt="May 2026"
    >
      <Part>
        <P>
          Network security controls are the oldest and most widely deployed layer of defence. They are also widely misunderstood: a firewall that allows all outbound traffic, an IDS generating 50,000 alerts per day that nobody reviews, and a WAF in detection-only mode are security theatre, not security. Understanding how these controls actually work — and how to configure them to be effective — is foundational defensive knowledge.
        </P>
        <P>
          The offensive modules showed you what attackers do when they encounter these controls: use allowed protocols (HTTPS for C2), live off the land with signed binaries to evade IDS signatures, and pivot through segments with no east-west inspection. This module teaches you how defenders close those gaps.
        </P>
      </Part>

      <HR />

      <Part>
        <H>Firewall Evolution — From Packet Filter to NGFW</H>
        <table style={s.table}>
          <thead>
            <tr>
              <th style={s.th}>Generation</th>
              <th style={s.th}>Inspects</th>
              <th style={s.th}>What it catches</th>
              <th style={s.th}>What it misses</th>
            </tr>
          </thead>
          <tbody>
            {[
              ['Packet filter (Gen 1)', 'IP, port, protocol per packet header', 'Blocked IPs and ports', 'Application-layer attacks, stateful evasion, tunneled protocols'],
              ['Stateful inspection (Gen 2)', 'Connection state table — tracks TCP handshakes', 'Port scan evasion, SYN flood (limited), invalid state packets', 'Application-layer content, encrypted traffic, C2 over allowed ports'],
              ['Application-layer NGFW (Gen 3)', 'Full payload up to Layer 7; TLS break-and-inspect', 'Application-aware policies, known malware signatures, DLP, user identity', 'Zero-day exploits, traffic not decrypted, evasion via allowed apps'],
              ['Cloud-native NGFW', 'All above plus cloud context (instance metadata, IAM identity)', 'Cloud-specific attacks, east-west in VPCs', 'Performance at scale; insider threats using legitimate access'],
            ].map(([g, i, c, m]) => (
              <tr key={g}>
                <td style={{ ...s.td, fontWeight: 600, color: C }}>{g}</td>
                <td style={s.td}>{i}</td>
                <td style={s.td}>{c}</td>
                <td style={{ ...s.td, color: '#aaa', fontSize: 13 }}>{m}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <P>
          Modern enterprise deployments use <Hl>Next-Generation Firewalls (NGFWs)</Hl> from vendors like Palo Alto Networks, Fortinet, and Check Point. They combine stateful inspection, application identification, user identity lookup, IPS, URL filtering, and TLS inspection in a single platform.
        </P>
        <Block>{`# Key NGFW capabilities:

1. APPLICATION IDENTIFICATION (App-ID)
   Identifies application regardless of port — blocks Tor even on port 443
   Allows "allow HTTPS to CDNs" without "allow everything on port 443"

2. USER IDENTITY (User-ID)
   Maps IP addresses to Active Directory users
   Policy: "sales-team can access Salesforce, not GitHub"
   Audit: "user jsmith accessed external RDP at 2am"

3. TLS INSPECTION (SSL Decryption)
   NGFW acts as MiTM: decrypts, inspects, re-encrypts
   Catches: malware C2 over HTTPS, data exfiltration, malicious downloads
   Privacy trade-off: all employee traffic decryptable by IT
   Exempt: banking, healthcare (certificate pinning breaks these)

4. POLICY EXAMPLE:
   Rule: allow app=ssl dest-zone=untrust user=domain\\hr-team
   Profiles: antivirus=strict, ips=strict, url-filter=block-gambling
   Logging: full session log to SIEM`}</Block>
      </Part>

      <HR />

      <Part>
        <H>Firewall Rule Design — Getting It Right</H>
        <P>
          Firewall rules accumulate over time and become unmanageable without discipline. The principles below keep rule sets effective and auditable:
        </P>
        <Block>{`# Firewall rule design principles (iptables examples)

# 1. DEFAULT DENY — most important rule (at the bottom)
iptables -P INPUT DROP
iptables -P FORWARD DROP
iptables -P OUTPUT DROP   # catches malware beaconing

# 2. ALLOW ESTABLISHED CONNECTIONS first (performance)
iptables -A INPUT -m conntrack --ctstate ESTABLISHED,RELATED -j ACCEPT

# 3. SPECIFIC ALLOWS — most specific first
# Web server — allow inbound HTTPS from anywhere
iptables -A INPUT -p tcp --dport 443 -j ACCEPT

# SSH — allow only from management network
iptables -A INPUT -p tcp --dport 22 -s 10.0.50.0/24 -j ACCEPT

# Database — allow only from app servers
iptables -A INPUT -p tcp --dport 5432 -s 10.0.1.0/24 -j ACCEPT

# 4. LOG BEFORE DROP — critical for incident response
iptables -A INPUT -m limit --limit 5/min -j LOG --log-prefix "FIREWALL_DROP: "
iptables -A INPUT -j DROP

# 5. AUDIT — find overly broad rules (AWS example)
aws ec2 describe-security-groups | \
  jq '.SecurityGroups[] | select(.IpPermissions[].IpRanges[].CidrIp == "0.0.0.0/0")'
# Finds: any security group allowing unrestricted inbound access`}</Block>
        <ProTip>
          Review every outbound allow rule by asking "what could an attacker do with this?" A rule allowing all outbound 443 from application servers enables C2 over HTTPS, data exfiltration, and tool downloads. Consider restricting outbound to specific destinations or routing through a web proxy with TLS inspection.
        </ProTip>
      </Part>

      <HR />

      <Part>
        <H>IDS and IPS — Detection Mechanisms</H>
        <table style={s.table}>
          <thead>
            <tr>
              <th style={s.th}>Detection method</th>
              <th style={s.th}>How it works</th>
              <th style={s.th}>Catches</th>
              <th style={s.th}>False positives</th>
            </tr>
          </thead>
          <tbody>
            {[
              ['Signature-based', 'Match traffic against known attack patterns (Snort/Suricata rules, YARA)', 'Known exploits, malware C2, scan patterns', 'Low for tuned rules; bypassed by obfuscation or novel variants'],
              ['Anomaly-based', 'Baseline normal traffic; alert on statistical deviations', 'Zero-days, novel attacks, insider threats', 'High initially — requires extensive tuning period'],
              ['Behaviour-based', 'Model expected behaviour; alert on deviation', 'Living-off-the-land, lateral movement, unusual data access', 'Medium — requires training period and model updates'],
              ['Threat intelligence IOCs', 'Match IPs, domains, hashes against threat intel feeds', 'Known attacker infrastructure, malware hashes', 'Low; but indicators expire quickly — old IOCs become noisy'],
            ].map(([d, h, c, f]) => (
              <tr key={d}>
                <td style={{ ...s.td, fontWeight: 600 }}>{d}</td>
                <td style={s.td}>{h}</td>
                <td style={s.td}>{c}</td>
                <td style={s.td}>{f}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <Block>{`# Suricata — open source network IDS/IPS

# Update rules and run:
suricata-update
suricata -c /etc/suricata/suricata.yaml -i eth0     # IDS mode
tail -f /var/log/suricata/fast.log                   # view alerts

# Example Suricata rule:
alert tcp $EXTERNAL_NET any -> $HOME_NET 22 (
  msg:"ET SCAN SSH Brute Force Attempt";
  flow:to_server,established;
  content:"SSH-";
  threshold:type both, track by_src, count 5, seconds 60;
  classtype:attempted-admin;
  sid:2001219; rev:20;
)
# Alerts when an external host makes 5+ SSH connections in 60 seconds

# Critical IDS placement:
# - Perimeter: catch external attacks (north-south)
# - Between DMZ and internal: catch pivoting
# - Between internal segments: catch lateral movement (east-west)
# North-south detection only is insufficient — attackers inside the perimeter bypass it`}</Block>
      </Part>

      <HR />

      <Part>
        <H>Web Application Firewalls (WAF)</H>
        <P>
          A <Hl>Web Application Firewall</Hl> inspects HTTP/HTTPS traffic for web application attack patterns. Unlike NGFWs that examine network-level traffic, WAFs understand HTTP structure — detecting SQL injection in POST bodies, XSS in cookie values, or path traversal in URL parameters.
        </P>
        <Block>{`WAF deployment models:

1. CLOUD WAF (CDN-integrated) — Cloudflare WAF, AWS WAF, Fastly
   No server changes; DDoS protection included; global edge
   Risk: attacker bypasses by targeting origin IP directly

2. REVERSE PROXY WAF — F5 Advanced WAF, Imperva, ModSecurity
   Sits between load balancer and application servers
   Full control and custom rules; operational overhead

3. RASP (Runtime Application Self-Protection)
   Agent inside application process; context-aware blocking
   Language-specific; application performance impact


# ModSecurity with OWASP CRS — most common open source WAF
# /etc/nginx/modsec/modsecurity.conf:
SecRuleEngine On           # DetectionOnly = log only
SecRequestBodyAccess On

Include /etc/nginx/modsec/coreruleset/crs-setup.conf
Include /etc/nginx/modsec/coreruleset/rules/*.conf

# Common WAF bypass techniques (from offensive modules):
# Case variation:     sElEcT vs SELECT
# Comment insertion:  SE/**/LECT
# Double encoding:    %2527 → %27 → ' (single quote)
# Unicode variants:   fullwidth SQL keywords`}</Block>
        <ProTip>
          WAFs are compensating controls, not fixes. A WAF alert on a SQL injection attempt should trigger a ticket to fix the vulnerable parameter, not just a WAF rule update. Use WAF alert volume to prioritise application remediation — not as a permanent substitute for secure coding.
        </ProTip>
      </Part>

      <HR />

      <Part>
        <H>IDS Tuning — The False Positive Problem</H>
        <P>
          An untuned IDS generating 50,000 daily alerts is useless — analysts cannot review them, alert fatigue sets in, and real attacks get missed in the noise.
        </P>
        <Block>{`IDS/IPS tuning methodology:

STEP 1: MEASURE
  Count alerts per day by rule; identify top 10 by volume
  Calculate: what % of high-volume rule alerts are real attacks?

STEP 2: SUPPRESS KNOWN GOOD
  Vulnerability scanner IPs → per-rule suppression
  Monitoring agents (DB health checks, uptime monitors)
  Known legitimate internal tools

STEP 3: TUNE THRESHOLDS
  SSH brute force rule: fires on 3 failures → tune to 10 in 60 seconds
  Reduces FP from developer testing while still catching real attacks

STEP 4: CONTEXTUALISE
  Port scan from external IP = high priority
  Port scan from internal vulnerability scanner = suppressed
  Same signature, different source/context = different action

STEP 5: FEEDBACK LOOP
  Every false positive → document → update suppression/threshold
  Track FP rate weekly — should decrease over time

TARGET METRICS:
  Total actionable alerts: < 100 per analyst per day
  False positive rate: < 10% for critical/high rules
  Mean time to triage: < 15 minutes per alert`}</Block>
      </Part>

      <HR />

      <Part>
        <H>Interview Questions — Firewalls, IDS, and IPS</H>
        <IQ q="What is the difference between an IDS and an IPS, and when would you choose each?">
          An IDS is passive — it analyses traffic and generates alerts without affecting traffic flow. An IPS sits inline and can drop or reject packets in real time. Use IDS where false positives would cause more harm than the attacks — critical production systems where a mis-blocking rule could cause outage. Use IPS at the perimeter where the cost of a blocked legitimate request is lower than the cost of an allowed attack. In practice, most deployments start IPS in detection mode, tune for weeks to reduce false positives, then enable blocking. Most NGFW IPS modules let you configure action per rule, so you can block high-confidence rules while only alerting on uncertain ones.
        </IQ>
        <IQ q="An attacker is using HTTPS for C2 communication. How can a firewall or IDS detect this without decrypting it?">
          Several TLS metadata analysis techniques work without decryption. JA3 fingerprinting captures the TLS client hello parameters (cipher suites, extensions, elliptic curves) and hashes them — known malware families have distinctive JA3 hashes that do not match legitimate browsers. SNI in the TLS handshake reveals the destination hostname — alert on newly registered domains, DGA-generated names, or known-malicious domains. Certificate anomalies — self-signed, mismatched common name, or unusual CA — indicate suspicious servers. Beacon timing via NetFlow: regular interval connections (every 60 seconds) to the same external IP are a C2 indicator detectable from connection metadata without payload inspection. If TLS break-and-inspect is deployed, the NGFW decrypts and can apply full DPI signatures.
        </IQ>
        <IQ q="What is a default deny firewall policy and why does it matter?">
          Default deny means all traffic not explicitly permitted by a preceding rule is dropped — the last rule is always "deny all". This contrasts with default allow which permits everything not explicitly blocked. Default deny matters because it makes the security posture explicit and forces documentation of every permitted traffic flow. New services must have firewall rules created before they work, which forces security review. With default allow, new services automatically work but may expose unexpected attack surface. Default deny is harder to operate — legitimate new traffic breaks silently — but it is the correct security default for all internal segments. The external-facing edge may need more permissive defaults operationally.
        </IQ>
        <IQ q="What can a WAF protect against, and what can it not?">
          A WAF protects against known web application attack patterns — SQL injection, XSS, command injection, path traversal, known CVE signatures, and common OWASP Top 10 techniques. It cannot protect against business logic vulnerabilities (IDOR, price manipulation, workflow bypass) because these use valid HTTP requests that the WAF cannot distinguish from legitimate ones. It cannot protect against authenticated attacks using valid credentials. WAF bypass techniques (encoding, obfuscation, splitting payloads) can defeat signature-based rules. Application-layer zero-days not yet in the signature database bypass it entirely. The WAF is a compensating control — the correct fix is always remediating the underlying application vulnerability.
        </IQ>
        <IQ q="How do you approach reducing alert fatigue from an IDS generating thousands of alerts per day?">
          Structured four steps. First, measure — identify the top 10 rules by alert volume and calculate their true positive rate. Second, suppress known good — add infrastructure IPs (scanners, monitoring agents, load balancers) to per-rule suppression lists. Third, tune thresholds — rules with high false positive rates get higher thresholds (SSH brute force at 20 attempts instead of 3). Fourth, contextualise — the same signature from an external IP versus an internal monitoring server is a different risk; use network context to prioritise. Goal: fewer than 100 actionable alerts per analyst per day with less than 10% false positive rate on critical rules. Track false positive rate weekly — it should decrease as tuning improves.
        </IQ>
      </Part>

      <HR />

      <Part>
        <H>Common Mistakes — Firewalls, IDS, and IPS</H>
        <Err
          title="WAF in detection-only mode indefinitely"
          cause="Team deploys WAF, sets it to detection only to avoid breaking the application, and never switches to blocking because 'we need to tune it first'. Detection mode is a logging system, not a security control."
          fix="Set a firm schedule: detection mode for 4 weeks (tune high-volume FP rules), then enable blocking on high-confidence severity rules. Use per-rule action configuration — block high-confidence rules, alert-and-review on ambiguous ones. Track which rules would block legitimate traffic and address the application behaviour causing them."
        />
        <Err
          title="Only filtering north-south traffic, ignoring east-west"
          cause="Perimeter firewall rules are well designed. But no rules exist between internal VLANs — once an attacker has a foothold on any internal server, they can reach all other internal servers directly."
          fix="Implement east-west inspection between network segments. At minimum: DMZ cannot reach management segment; application servers cannot reach domain controllers; database servers have no outbound internet access. Use host-based firewalls as a second layer where network firewalls cannot be placed between workloads."
        />
        <Err
          title="No egress filtering — all outbound traffic allowed"
          cause="Compromised servers freely beacon to C2, exfiltrate data over DNS, and download attacker tools from the internet. Without egress controls, detection relies entirely on endpoint controls."
          fix="Implement egress filtering: application servers communicate outbound only to known required endpoints. Route web traffic through an inspecting web proxy. Block outbound on ports not used by known legitimate applications. Alert on any outbound connection from servers to new, unexpected external IPs."
        />
        <Err
          title="Firewall rules with no owner or expiry date"
          cause="A rule added by a contractor for a temporary integration was never removed. After several years, hundreds of orphaned rules exist — many with broad allow permissions for systems that no longer exist."
          fix="Every firewall rule needs a ticket reference (business justification), a named owner (team or individual), and a review date. Automated quarterly expiry review: rules not recertified by their owner are disabled. Any rule with 'any source' or 'any destination' must have explicit documented justification."
        />
        <Err
          title="Relying on signature-based IDS alone for advanced threats"
          cause="Modern C2 frameworks use domain fronting, CDN infrastructure, and living-off-the-land binaries that do not match any Suricata or Snort signature. Signature-based IDS misses these entirely."
          fix="Layer detection: signatures for known threats, JA3/DNS anomaly detection for evasive C2, NetFlow analysis for beaconing patterns, and EDR behavioural detection on endpoints for post-exploitation tools. No single detection method catches everything — the combination is what matters."
        />
      </Part>

      <HR />

      <KeyTakeaways items={[
        'Next-generation firewalls inspect up to Layer 7: application identity, user identity, and payload content — not just IP and port. Policies can be "allow Salesforce for sales team, block everything else on 443".',
        'TLS break-and-inspect decrypts HTTPS traffic at the NGFW for deep packet inspection. Without it, most modern C2 traffic is invisible to the network security layer.',
        'Default deny drops all traffic not explicitly permitted — making security posture explicit and forcing review of every new traffic flow.',
        'IDS detects and alerts; IPS sits inline and blocks. Start IPS in detection mode, tune aggressively to reduce false positives, then enable blocking once the FP rate is acceptable.',
        'WAFs protect against known web application attack patterns but not business logic vulnerabilities, authenticated attacks, or novel bypasses. They are compensating controls, not permanent fixes.',
        'IDS alert fatigue is one of the most common SOC problems. Target fewer than 100 actionable alerts per analyst per day with less than 10% false positive rate on critical rules.',
        'East-west firewall rules between internal segments are as important as north-south perimeter rules. Lateral movement exploits the absence of east-west controls.',
        'Egress filtering catches compromised hosts beaconing to C2. Application servers should communicate outbound only to known, required destinations.',
        'Suricata rules are written in Snort-compatible syntax: action, protocol, source, destination, payload content, thresholds, and classification. Understanding rule structure enables custom detection logic.',
        'Every firewall rule needs a business justification, an owner, and a review date. Orphaned rules from decommissioned systems are one of the most common security audit findings.',
      ]} />

      <HR />

      <Callout type="info">
        Firewalls and IDS generate raw events. In{' '}
        <Link href="/learn/cybersecurity/siem-log-analysis">
          Module 31: SIEM and Log Analysis
        </Link>
        , you learn how to centralise those events, write detection rules that find real attacks in massive log volumes, build investigation workflows, and triage alerts from initial signal through to confirmed finding.
      </Callout>
    </LearnLayout>
  )
}
