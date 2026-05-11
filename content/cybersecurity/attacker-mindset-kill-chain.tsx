import type { Metadata } from 'next'
import Link from 'next/link'
import { LearnLayout } from '@/components/content/LearnLayout'
import { Callout } from '@/components/content/Callout'
import { KeyTakeaways } from '@/components/content/KeyTakeaways'

export const metadata: Metadata = {
  title: "How Attackers Think — The Kill Chain and MITRE ATT&CK | Chaduvuko",
  description: "The attacker's playbook from reconnaissance to full compromise — the framework that makes defenders effective.",
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

const Block = ({ children }: { children: React.ReactNode }) => (
  <pre style={{ fontFamily: 'var(--font-mono)', fontSize: 12, background: 'var(--bg2)', border: '1px solid var(--border)', borderRadius: 8, padding: '16px 20px', overflowX: 'auto', lineHeight: 1.75, color: 'var(--text)', margin: '0 0 20px' }}>{children}</pre>
)

export default function AttackerMindsetKillChain() {
  return (
    <LearnLayout
      title="How Attackers Think — The Kill Chain and MITRE ATT&CK"
      description="The attacker's playbook from reconnaissance to full compromise. The frameworks that make defenders effective by understanding what attackers do next."
      section="Cybersecurity — Module 07"
      readTime="30 min"
      updatedAt="May 2026"
    >

      {/* ── PART 01 ── */}
      <Part n="01" title="Why Defenders Must Think Like Attackers" />

      <P>Every security control exists in reaction to an attack technique. Firewalls block unwanted connections because attackers probe open ports. MFA defeats credential theft because attackers steal passwords. EDR detects process injection because attackers inject code into legitimate processes. A defender who does not understand the attack does not understand why the control matters — and cannot evaluate whether it actually works.</P>

      <P>This is not a philosophical point. It has operational consequences: a SOC analyst who does not understand the attacker's kill chain cannot prioritise which alerts matter. A security engineer who does not understand lateral movement techniques cannot design network segmentation that stops them. A CISO who does not understand attacker motivations cannot make the right investment decisions.</P>

      <div style={{ background: `${C}08`, border: `1px solid ${C}25`, borderLeft: `4px solid ${C}`, borderRadius: '0 10px 10px 0', padding: '20px 24px', margin: '4px 0 28px' }}>
        <P>Two frameworks structure attacker thinking for defenders: the <Hl>Cyber Kill Chain</Hl> (Lockheed Martin, 2011) models an attack as a sequential chain of phases — breaking the chain at any phase stops the attack. <Hl>MITRE ATT&CK</Hl> (MITRE Corporation, 2015–present) catalogs specific tactics, techniques, and procedures (TTPs) used by real threat actors with real-world evidence. Together they form the vocabulary of modern threat-informed defence.</P>
      </div>

      <HR />

      {/* ── PART 02 ── */}
      <Part n="02" title="The Cyber Kill Chain — An Attack in Seven Phases" />

      <P>The Kill Chain model views an intrusion as a sequence of steps that an attacker must complete to achieve their objective. Each step is an opportunity for defenders to detect or disrupt. The key insight: attackers must complete every phase; defenders only need to break one.</P>

      <div style={{ display: 'grid', gap: 0, margin: '20px 0 32px' }}>
        {[
          {
            phase: '01 Reconnaissance',
            color: '#7b61ff',
            desc: 'The attacker researches the target before touching any system. OSINT (Open Source Intelligence) from LinkedIn, company websites, GitHub, job postings, and DNS records. The attacker learns employee names, email formats, technology stack, IP ranges, and exposed services — all without alerting the target.',
            examples: 'LinkedIn scraping for employee emails. Shodan/Censys scanning for exposed services. Job postings revealing technology stack. Certificate Transparency logs enumerating subdomains.',
            defence: 'Limit information disclosure: clean up WHOIS records, monitor CT logs, review what developers commit to public repos, audit LinkedIn for overshared technical details.',
          },
          {
            phase: '02 Weaponisation',
            color: '#f97316',
            desc: 'The attacker creates the attack payload — a malicious document, exploit code, or phishing page. They pair a delivery mechanism with an exploit. This phase happens entirely on attacker infrastructure — the defender cannot observe it.',
            examples: 'Creating a Word document with a malicious macro. Configuring Metasploit with the right payload for the target OS. Building a convincing phishing page cloning the target login portal.',
            defence: 'Cannot directly defend this phase — it happens offline. Threat intelligence feeds identify known weaponisation infrastructure and payload hashes.',
          },
          {
            phase: '03 Delivery',
            color: '#ff4757',
            desc: 'The attacker delivers the weaponised payload to the target. This is typically the most observable phase for defenders — delivery leaves traces in email logs, web proxy logs, and endpoint telemetry.',
            examples: 'Phishing email with malicious attachment. Watering hole attack on a website the target visits. USB drop. Exploiting an internet-facing vulnerability directly.',
            defence: 'Email filtering with attachment sandboxing. Web proxy with URL categorisation. Endpoint detection. User awareness training. Patching internet-facing services.',
          },
          {
            phase: '04 Exploitation',
            color: '#ff4757',
            desc: 'The payload executes — a vulnerability is triggered, a macro runs, a user double-clicks a file. Code execution is achieved on the target system. The attacker now has a running process on the victim machine.',
            examples: 'CVE-2021-44228 (Log4Shell) remote code execution. User opens phishing attachment, macro executes PowerShell. Browser exploit executes code in browser context.',
            defence: 'Patch management. Application whitelisting. Disable macros in Office documents. Browser sandbox isolation.',
          },
          {
            phase: '05 Installation',
            color: '#f97316',
            desc: 'The attacker installs a persistent backdoor — a RAT, a web shell, or a modified system service. The goal: survive reboots and maintain access even if the initial payload is detected and removed.',
            examples: 'Adding a web shell (PHP file) to the web root. Installing a scheduled task that runs malware on boot. Adding an SSH key to authorized_keys. Registering a malicious Windows service.',
            defence: 'File integrity monitoring detects new files in web root. Endpoint detection catches unusual persistence mechanisms. Monitor for new scheduled tasks, services, registry run keys.',
          },
          {
            phase: '06 Command and Control (C2)',
            color: '#facc15',
            desc: 'The attacker establishes a channel to communicate with the compromised system. C2 traffic must blend in with legitimate traffic to evade detection. HTTP/HTTPS C2 is common because port 80/443 is almost never blocked.',
            examples: 'Beacon calling back to attacker server every 60 seconds over HTTPS. DNS-based C2 where commands are encoded in DNS queries. Cobalt Strike, Sliver, or Havoc framework managing multiple sessions.',
            defence: 'Network monitoring for anomalous outbound connections. DNS monitoring for high-entropy query names. Behaviour-based detection of beaconing patterns.',
          },
          {
            phase: '07 Actions on Objectives',
            color: '#00e676',
            desc: 'The attacker achieves their actual goal. This may be data exfiltration, ransomware deployment, espionage, lateral movement to a higher-value target, or sabotage. Stopping the attacker at any earlier phase prevents reaching this phase.',
            examples: 'Exfiltrating customer database. Deploying ransomware. Pivoting to a domain controller. Destroying production databases.',
            defence: 'Data loss prevention systems. Alerting on large outbound transfers. Network segmentation limiting what compromised hosts can reach. Principle of least privilege.',
          },
        ].map((item, i) => (
          <div key={item.phase}>
            <div style={{ display: 'flex', gap: 16, alignItems: 'stretch' }}>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flexShrink: 0 }}>
                <div style={{ width: 36, height: 36, borderRadius: '50%', background: `${item.color}20`, border: `2px solid ${item.color}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 900, color: item.color, flexShrink: 0 }}>{i + 1}</div>
                {i < 6 && <div style={{ width: 2, flex: 1, background: `${item.color}30`, margin: '4px 0' }} />}
              </div>
              <div style={{ flex: 1, paddingBottom: 20 }}>
                <div style={{ background: 'var(--surface)', border: `1px solid ${item.color}20`, borderRadius: 10, padding: '16px 20px' }}>
                  <div style={{ fontSize: 14, fontWeight: 800, color: item.color, marginBottom: 8 }}>{item.phase}</div>
                  <div style={{ fontSize: 13, color: 'var(--text)', lineHeight: 1.75, marginBottom: 10 }}>{item.desc}</div>
                  <div style={{ fontSize: 11, color: 'var(--muted)', marginBottom: 6 }}><strong style={{ color: 'var(--text)' }}>Examples: </strong>{item.examples}</div>
                  <div style={{ fontSize: 11, color: '#00e676' }}><strong style={{ color: '#00e676' }}>Defend: </strong>{item.defence}</div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <ProTip>In an interview, never just recite Kill Chain phases as a list. The strong answer connects the Kill Chain to defensive strategy: "The Kill Chain is most useful for identifying detection opportunities. Building detection at Delivery, Exploitation, and C2 gives multiple chances to break the chain before data leaves the network — a defender who only monitors at Actions on Objectives sees the breach after the damage is done."</ProTip>

      <HR />

      {/* ── PART 03 ── */}
      <Part n="03" title="MITRE ATT&CK — The World's Largest Attacker Playbook" />

      <P>The Kill Chain describes attack phases at a high level. MITRE ATT&CK catalogs the specific techniques attackers use at each phase — documented with real-world evidence from actual intrusions. As of 2026, the Enterprise matrix contains 14 tactics and over 200 techniques with 400+ sub-techniques.</P>

      <P>ATT&CK is the reference framework used by SOC analysts (writing detection rules), red teams (planning realistic attack simulations), threat hunters (knowing what to look for), and security product vendors (mapping their detection capabilities). Understanding ATT&CK is expected knowledge for anyone working in security operations or offensive security.</P>

      <H>The 14 MITRE ATT&CK Tactics</H>

      <div style={{ display: 'grid', gap: 10, margin: '0 0 28px' }}>
        {[
          { id: 'TA0043', tactic: 'Reconnaissance', color: '#7b61ff', desc: 'Gathering information about the target — active scanning, OSINT, phishing for information.' },
          { id: 'TA0042', tactic: 'Resource Development', color: '#7b61ff', desc: 'Building capabilities — acquiring infrastructure, developing tools, compromising accounts to use as staging.' },
          { id: 'TA0001', tactic: 'Initial Access', color: '#ff4757', desc: 'Getting into the target environment — phishing, exploitation of public-facing applications, valid accounts.' },
          { id: 'TA0002', tactic: 'Execution', color: '#ff4757', desc: 'Running attacker-controlled code — command line, scripts, scheduled tasks, user execution of malicious files.' },
          { id: 'TA0003', tactic: 'Persistence', color: '#f97316', desc: 'Maintaining access across reboots — boot autostart, scheduled tasks, account manipulation, web shells.' },
          { id: 'TA0004', tactic: 'Privilege Escalation', color: '#f97316', desc: 'Gaining higher privileges — SUID exploitation, sudo misconfiguration, token impersonation, kernel exploits.' },
          { id: 'TA0005', tactic: 'Defence Evasion', color: '#facc15', desc: 'Avoiding detection — disabling security tools, deleting logs, obfuscating malware, living off the land.' },
          { id: 'TA0006', tactic: 'Credential Access', color: '#facc15', desc: 'Stealing credentials — keylogging, credential dumping (Mimikatz), phishing, brute force.' },
          { id: 'TA0007', tactic: 'Discovery', color: '#4285f4', desc: 'Learning about the environment — network scanning, account enumeration, file system discovery.' },
          { id: 'TA0008', tactic: 'Lateral Movement', color: '#4285f4', desc: 'Moving through the network — pass the hash, remote services, internal spearphishing.' },
          { id: 'TA0009', tactic: 'Collection', color: '#00e676', desc: 'Gathering data to exfiltrate — file collection, screen capture, keylogging, browser data.' },
          { id: 'TA0011', tactic: 'Command and Control', color: '#00e676', desc: 'Communicating with compromised systems — encrypted channels, DNS tunnelling, web services as C2.' },
          { id: 'TA0010', tactic: 'Exfiltration', color: '#00e676', desc: 'Stealing data — exfiltration over C2, alternative protocols, cloud storage, scheduled transfers.' },
          { id: 'TA0040', tactic: 'Impact', color: '#ff4757', desc: 'Achieving objectives — data encryption (ransomware), destruction, defacement, denial of service.' },
        ].map((item) => (
          <div key={item.id} style={{ background: 'var(--surface)', border: `1px solid ${item.color}20`, borderLeft: `3px solid ${item.color}`, borderRadius: 8, padding: '10px 16px', display: 'flex', gap: 14, alignItems: 'flex-start' }}>
            <div style={{ fontSize: 11, color: item.color, fontFamily: 'var(--font-mono)', fontWeight: 700, minWidth: 64, flexShrink: 0 }}>{item.id}</div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 13, fontWeight: 800, color: item.color, marginBottom: 2 }}>{item.tactic}</div>
              <div style={{ fontSize: 12, color: 'var(--muted)', lineHeight: 1.6 }}>{item.desc}</div>
            </div>
          </div>
        ))}
      </div>

      <H>How ATT&CK Techniques Are Documented</H>

      <Block>{`Example: T1059.001 — Command and Scripting Interpreter: PowerShell

Tactic: Execution (TA0002)
Platforms: Windows
Permissions Required: User, Administrator

Description: Adversaries abuse PowerShell for execution. PowerShell is a powerful
interactive command-line interface included in the Windows operating system.

Procedure Examples (real attacker usage):
  APT32: Used PowerShell to download payloads and execute commands
  FIN7:  Used PowerShell for execution and persistence
  Cobalt Group: Used malicious PowerShell scripts for initial access

Detection:
  Monitor PowerShell process creation. Alert on:
    - PowerShell launching from unusual parent processes (Word, Excel, Outlook)
    - PowerShell with -EncodedCommand flag (obfuscation indicator)
    - PowerShell making network connections
    - PowerShell downloading content from the internet

Mitigations:
  M1042: Disable or Remove Feature — Disable PowerShell v2 (lacks logging)
  M1049: Antivirus/Antimalware
  M1038: Execution Prevention — AppLocker or WDAC policy`}</Block>

      <HR />

      {/* ── PART 04 ── */}
      <Part n="04" title="Threat Actor Profiles — Who Is Actually Attacking and How" />

      <div style={{ display: 'grid', gap: 14, margin: '0 0 32px' }}>
        {[
          {
            group: 'APT29 / Cozy Bear',
            nation: '🇷🇺 Russia (SVR)',
            color: '#ff4757',
            targets: 'Government, think tanks, healthcare, energy, technology',
            signature: 'Supply chain attacks, living-off-the-land, long dwell times (months to years), sophisticated C2. Responsible for SolarWinds SUNBURST backdoor that compromised 18,000 organisations.',
            ttps: 'T1195 (Supply Chain Compromise), T1027 (Obfuscated Files), T1078 (Valid Accounts)',
          },
          {
            group: 'APT41 / Double Dragon',
            nation: '🇨🇳 China (MSS + criminal)',
            color: '#f97316',
            targets: 'Healthcare, technology, telecommunications, gaming, government',
            signature: 'Combines nation-state espionage with financially motivated cybercrime. Uses supply chain compromises and zero-days. Extensive operational security.',
            ttps: 'T1190 (Exploit Public-Facing Application), T1133 (External Remote Services), T1543 (Create/Modify System Process)',
          },
          {
            group: 'Lazarus Group',
            nation: '🇰🇵 North Korea (Reconnaissance General Bureau)',
            color: '#7b61ff',
            targets: 'Financial institutions, cryptocurrency exchanges, defense, government',
            signature: 'Primarily financially motivated — responsible for $1.7B+ in cryptocurrency theft. Uses spearphishing with fake job offers. WannaCry ransomware attributed to this group.',
            ttps: 'T1566 (Phishing), T1055 (Process Injection), T1486 (Data Encrypted for Impact)',
          },
          {
            group: 'LockBit',
            nation: '🌐 Criminal (ransomware-as-a-service)',
            color: '#00e676',
            targets: 'Any — healthcare, manufacturing, government, professional services',
            signature: 'Most prolific ransomware group by victim count. Operates as RaaS — core team develops ransomware; affiliates conduct attacks and split the ransom. Double extortion.',
            ttps: 'T1486 (Data Encrypted for Impact), T1490 (Inhibit System Recovery), T1562 (Impair Defenses)',
          },
        ].map((item) => (
          <div key={item.group} style={{ background: 'var(--surface)', border: `1px solid ${item.color}20`, borderLeft: `3px solid ${item.color}`, borderRadius: 10, padding: '18px 22px' }}>
            <div style={{ display: 'flex', gap: 12, marginBottom: 8, flexWrap: 'wrap', alignItems: 'center' }}>
              <div style={{ fontSize: 14, fontWeight: 800, color: item.color }}>{item.group}</div>
              <div style={{ fontSize: 12, color: 'var(--muted)', background: 'var(--bg2)', border: '1px solid var(--border)', borderRadius: 4, padding: '2px 8px' }}>{item.nation}</div>
            </div>
            <div style={{ fontSize: 12, color: 'var(--muted)', marginBottom: 6 }}><strong style={{ color: 'var(--text)' }}>Targets: </strong>{item.targets}</div>
            <div style={{ fontSize: 13, color: 'var(--text)', lineHeight: 1.7, marginBottom: 8 }}>{item.signature}</div>
            <div style={{ fontSize: 11, color: item.color, fontFamily: 'var(--font-mono)' }}>{item.ttps}</div>
          </div>
        ))}
      </div>

      <HR />

      {/* ── PART 05 ── */}
      <Part n="05" title="Living Off the Land — The Evasion Technique Defenders Fear Most" />

      <P><Hl>Living off the land (LotL)</Hl> is an attack technique where the attacker uses legitimate system tools already present on the victim machine rather than deploying custom malware. This technique is extremely effective because antivirus and EDR products detect malicious files — but cannot block trusted system binaries. A defender who sees PowerShell, WMI, or certutil running must distinguish legitimate usage from malicious usage based on behaviour context — a much harder problem than blocking a known-malicious file hash.</P>

      <Block>{`Windows LOLBins (Living Off the Land Binaries) abused by attackers:

powershell.exe  → Execute scripts, download payloads, bypass execution policy
certutil.exe    → Download files from internet, decode base64 payloads
mshta.exe       → Execute HTML Application files (HTA) containing VBScript
regsvr32.exe    → Register COM objects — can load DLLs from remote URLs
wmic.exe        → Execute commands on local/remote systems, enumerate environment
bitsadmin.exe   → Download files silently in the background
rundll32.exe    → Execute DLL functions — evades simple process-based detection

Example attack chain using only LOLBins (no malware files):
1. Phishing document opened → macro runs:
   powershell.exe -EncodedCommand [base64 download cradle]
2. PowerShell downloads next stage:
   certutil.exe -decode encoded.txt payload.exe
3. Payload runs via: rundll32.exe
4. Persistence via WMI subscription (survives reboot, no file in startup folder)

All steps used only signed Windows binaries — no malware detected by AV`}</Block>

      <H>Detecting LOLBin Abuse</H>
      <P>Detection shifts to behavioural analysis: <Hl>process lineage</Hl> (PowerShell spawned by Word.exe is suspicious), <Hl>command line arguments</Hl> (certutil with a URL is unusual), <Hl>network connections</Hl> (certutil.exe making outbound HTTP), and <Hl>timing anomalies</Hl> (WMI at 2am from a workstation). Sigma rules provide a community-maintained library of LOLBin detection rules convertible to Splunk, Elastic, and Sentinel query languages.</P>

      <HR />

      {/* ── PART 06 ── */}
      <Part n="06" title="Applying ATT&CK — Threat-Informed Defence" />

      <P>Threat-informed defence uses knowledge of specific attacker TTPs to prioritise defensive investment. Rather than defending against every possible attack equally, identify which threat actors are most relevant and focus detection on those actors' specific techniques.</P>

      <div style={{ display: 'grid', gap: 12, margin: '0 0 28px' }}>
        {[
          { step: '1', title: 'Identify relevant threat actors', desc: 'A US healthcare system faces ransomware operators (LockBit, BlackCat) and healthcare-specific APTs. A defense contractor faces nation-state APTs. A retailer faces financially motivated criminal groups (FIN7). Industry threat reporting identifies which actors are active in your sector.' },
          { step: '2', title: 'Map their TTPs to ATT&CK', desc: 'MITRE ATT&CK Group pages document which techniques each actor uses with real-world evidence. Export to ATT&CK Navigator to create a heatmap of their techniques relevant to your environment.' },
          { step: '3', title: 'Test your detection coverage', desc: 'For each relevant technique, ask: do we have a detection? Have we validated it works? Run a red team simulation using those techniques and see which are detected. The gaps are your highest-priority detection engineering work.' },
          { step: '4', title: 'Build detections for gaps', desc: 'Write SIEM rules (Sigma format) for the undetected techniques. Test against both red team activity and normal traffic to calibrate false positive rate. MITRE CALDERA automates adversary emulation to validate detection coverage.' },
        ].map((item) => (
          <div key={item.step} style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 8, padding: '14px 18px', display: 'flex', gap: 14 }}>
            <div style={{ width: 28, height: 28, borderRadius: '50%', background: `${C}20`, border: `2px solid ${C}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 900, color: C, flexShrink: 0 }}>{item.step}</div>
            <div>
              <div style={{ fontSize: 13, fontWeight: 800, color: 'var(--text)', marginBottom: 4 }}>{item.title}</div>
              <div style={{ fontSize: 13, color: 'var(--muted)', lineHeight: 1.7 }}>{item.desc}</div>
            </div>
          </div>
        ))}
      </div>

      <HR />

      {/* ── PART 07 ── */}
      <Part n="07" title="What This Looks Like at Work — A Real Attack Mapped to ATT&CK" />

      <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 12, padding: '24px 28px', marginBottom: 24 }}>
        <div style={{ fontSize: 11, fontWeight: 700, color: C, background: `${C}15`, border: `1px solid ${C}30`, borderRadius: 6, padding: '4px 10px', fontFamily: 'var(--font-mono)', display: 'inline-block', marginBottom: 20, letterSpacing: '.1em', textTransform: 'uppercase' }}>
          Real incident: A healthcare company ransomware attack mapped to ATT&CK
        </div>

        {[
          { time: 'Day -14', ttp: 'T1591 — Gather Victim Org Information', body: 'Attacker researched the target on LinkedIn and Shodan. Job postings revealed VMware vSphere + Windows Server 2019. The VPN appliance was identified as running an unpatched Pulse Secure version.' },
          { time: 'Day -10', ttp: 'T1190 — Exploit Public-Facing Application', body: 'Exploited CVE-2021-22893 (Pulse Secure authentication bypass). The company had not patched despite 4+ months of patch availability. Attacker obtained valid VPN session tokens without credentials.' },
          { time: 'Day -8', ttp: 'T1098 — Account Manipulation', body: 'Created a new Active Directory account with a name similar to an existing IT staff account (john.smith vs johnsmith). Added to Domain Admins group. Went undetected for 8 days.' },
          { time: 'Day -5', ttp: 'T1018 + T1021 — Remote System Discovery + Remote Services', body: 'Used BloodHound to map all domain-joined systems. Identified file servers, backup systems, and domain controllers. Connected to each via RDP using the DA account.' },
          { time: 'Day 0, 2am', ttp: 'T1048 + T1486 — Exfiltration + Data Encrypted for Impact', body: '500GB of patient data exfiltrated to attacker server. LockBit deployed via Group Policy startup script to all domain-joined systems simultaneously. All file servers and the backup server encrypted. Clinical operations stopped.' },
        ].map((block) => (
          <div key={block.time} style={{ display: 'flex', gap: 20, marginBottom: 20 }}>
            <div style={{ flexShrink: 0, width: 70 }}>
              <div style={{ fontSize: 11, fontWeight: 700, color: C, fontFamily: 'var(--font-mono)' }}>{block.time}</div>
            </div>
            <div style={{ flex: 1, borderLeft: `2px solid ${C}30`, paddingLeft: 18, paddingBottom: 4 }}>
              <div style={{ fontSize: 11, color: 'var(--muted)', fontFamily: 'var(--font-mono)', marginBottom: 4 }}>{block.ttp}</div>
              <div style={{ fontSize: 13, color: 'var(--muted)', lineHeight: 1.75 }}>{block.body}</div>
            </div>
          </div>
        ))}

        <Callout type="warning">
          Kill Chain breakpoints where this attack could have been stopped: patching the Pulse Secure CVE (Initial Access), monitoring for new Domain Admin account creation (Persistence — Day -8, 12 days before ransomware), network segmentation preventing DA access to backup systems (Lateral Movement), alerting on 500GB outbound transfer at 2am (Exfiltration). Any one of these breaks the chain.
        </Callout>
      </div>

      <HR />

      {/* ── PART 08 ── */}
      <Part n="08" title="Interview Prep — 5 Questions With Complete Answers" />

      <IQ q="What is the Cyber Kill Chain and how do defenders use it?">
        The Cyber Kill Chain is a model that describes a cyberattack as a seven-phase sequential process: Reconnaissance, Weaponisation, Delivery, Exploitation, Installation, Command and Control, and Actions on Objectives.
        {'\n\n'}
        The key insight for defenders is that it is a chain — the attacker must complete every phase to succeed. Breaking any single link stops the attack. This reframes defence from "prevent every attack" (impossible) to "force attackers to fail at one of seven phases" (achievable with layered defences).
        {'\n\n'}
        Defenders use the Kill Chain in three practical ways. First, for detection strategy: building monitoring at multiple phases means the attacker must evade detection seven times rather than once. A SOC that only monitors at Phase 7 sees the breach after the damage is done. Monitoring at Delivery, Exploitation, and C2 gives earlier opportunities.
        {'\n\n'}
        Second, for incident response: when an incident is detected, mapping it to the Kill Chain tells investigators what has already happened and what comes next. If an attacker is detected in Phase 5 (Installation), they have already exploited the system and installed a backdoor — investigators know to look for both the delivery mechanism and all persistence mechanisms.
        {'\n\n'}
        Third, for threat modelling: blocking at the earliest effective phase is cheapest. Blocking a phishing email (Phase 3) is more effective than detecting malware execution (Phase 4) — but both are necessary because some phishing emails bypass filters.
      </IQ>

      <IQ q="What is MITRE ATT&CK and how is it different from the Kill Chain?">
        MITRE ATT&CK is a knowledge base of adversary behaviour based on real-world intrusion observations. It is organized into 14 Tactics (the attacker's goal) and 200+ Techniques (the specific method). As of 2026, every technique has evidence from real incidents and documented detection and mitigation guidance.
        {'\n\n'}
        The Kill Chain and ATT&CK address the same problem at different levels of abstraction. The Kill Chain is a high-level sequential model with 7 phases that describes the broad shape of an attack. ATT&CK is a granular catalog of specific techniques that maps to those phases with real-world evidence of how each technique has been used by specific named threat actor groups.
        {'\n\n'}
        Practically: you use the Kill Chain to understand the architecture of an attack — what phase are we in, what comes next? You use ATT&CK to write specific SIEM detections, map red team test coverage, understand specific threat actors (APT29 consistently uses T1195 supply chain compromise — do we detect that?), and communicate about threats precisely with a shared vocabulary.
        {'\n\n'}
        ATT&CK is also the lingua franca of security — when a vendor says their product detects MITRE ATT&CK T1003 (Credential Dumping), it is a specific verifiable claim. This makes ATT&CK useful for evaluating security products.
      </IQ>

      <IQ q="What does 'living off the land' mean and why is it hard to detect?">
        Living off the land (LotL) is an attack technique where adversaries use legitimate system tools already present on the target — PowerShell, certutil, mshta, regsvr32, WMI — rather than deploying custom malware.
        {'\n\n'}
        LotL is hard to detect for two fundamental reasons. First, signature-based detection cannot block it: antivirus and many EDR products compare file hashes and code patterns against known-malicious signatures. Signed Windows system binaries will never appear in that database — they are legitimate trusted files. Powershell.exe running a malicious script produces the same process as PowerShell running a legitimate backup script.
        {'\n\n'}
        Second, blocking the tools themselves would break operations: PowerShell is used extensively for Windows administration and automation. Certutil is used for certificate operations. Blocking them would break management at scale, so they must remain available.
        {'\n\n'}
        Detection shifts to behavioural analysis: process lineage (PowerShell spawned by Word.exe is anomalous — Word should not launch PowerShell), command line inspection (PowerShell with -EncodedCommand is a common obfuscation indicator), network connections (certutil making outbound HTTP connections), timing (admin tools at 2am from a workstation), and volume (WMI called thousands of times per hour). UEBA systems build baselines of normal behaviour and alert on deviations — they are specifically designed for LotL because they focus on behaviour patterns rather than file signatures.
      </IQ>

      <IQ q="A threat intelligence report says a threat actor targeting your industry uses T1078 (Valid Accounts). What does this mean for your defences?">
        T1078 (Valid Accounts) means the threat actor uses legitimate credentials — stolen through phishing, purchased from credential markets, or obtained via brute force — to log into systems as real users rather than exploiting vulnerabilities. This bypasses detection mechanisms looking for exploit behaviour or malicious code: a login with valid credentials looks identical to a legitimate login.
        {'\n\n'}
        Prevention: if the attacker is using stolen credentials, improve credential security. Mandatory MFA on all accounts eliminates credential-only attacks — a stolen password without the TOTP code is useless. Implement credential monitoring that alerts when company email addresses appear in breached credential databases. Enforce strong, unique passwords.
        {'\n\n'}
        Detection: since valid logins cannot be blocked, detect anomalous ones. Impossible travel alerts fire when the same account logs in from two geographically distant locations within a timeframe that cannot be explained by travel. New country login alerts. Time-based anomalies — a developer account at 2am when this has never happened. Device-based anomalies — login from an unregistered device.
        {'\n\n'}
        Response: conditional access policies requiring additional verification for logins from new devices, new locations, or outside normal hours. Just-In-Time (JIT) access for privileged accounts — privileges are not permanently assigned but granted on-demand for defined time windows with full logging. Least-privilege access limits blast radius of any compromised account.
      </IQ>

      <IQ q="What is a 'threat actor group' in the context of ATT&CK and why does knowing which groups target your industry matter?">
        A threat actor group in ATT&CK is a named collection of intrusion activity attributed to a specific organisation, nation-state, or criminal enterprise based on consistent use of tools, infrastructure, and techniques across multiple incidents. APT29 is attributed to Russia's SVR. APT41 is attributed to Chinese MSS. Lazarus Group is attributed to North Korea. LockBit is a criminal ransomware operation. These groups are named because their behaviour is consistent — the same tools, infrastructure, and techniques appear across separate intrusions, allowing attribution.
        {'\n\n'}
        Why knowing which groups target your industry matters: different threat actors have different objectives, capabilities, and techniques. Defending against all possible attackers equally is inefficient. If you are a US healthcare organisation, ransomware operators (LockBit, BlackCat, Clop) are your immediate operational threat — they specifically target healthcare because hospitals cannot afford downtime and have historically paid ransoms. Healthcare-specific APTs (APT10 has targeted pharmaceutical companies) are your intelligence threat.
        {'\n\n'}
        With this knowledge, you can build and test detection coverage for these specific groups' documented TTPs — from ATT&CK's Group pages. Your SIEM rules, monitoring, and red team scenarios focus on the techniques that are actually being used against your sector, not a generic all-possible-attacks coverage approach. This is more efficient and produces better outcomes with the same security investment.
      </IQ>

      <HR />

      {/* ── Error Library ── */}
      <Part n="09" title="Attacker Mindset Misconceptions That Limit Defenders" />

      <Err
        msg="Detection built to catch malware files — attacker used no malware files"
        cause="An organisation's security stack is heavily tuned toward detecting malicious files: antivirus, file hash reputation, sandboxing for email attachments. An advanced attacker lands using a valid phishing credential (no file), establishes persistence using a registry run key pointing to PowerShell (no malware file), and moves laterally using WMI and RDP (no malware files). The entire attack used only LOLBins. The security stack has excellent file-based detection with zero behavioural detection — and misses everything."
        fix="Balance signature-based controls with behavioural controls. EDR products with process behaviour analysis, network anomaly detection, UEBA, and process lineage monitoring detect LotL attacks where file-based detection fails. Evaluate your stack's ability to detect an attack that uses no custom malware — most environments fail this test. A red team using only LOLBins will reveal the gap."
      />

      <Err
        msg="The phishing campaign was blocked — incident closed"
        cause="An organisation blocks a phishing campaign. Emails are quarantined, the malicious domain is blocked, and the response is declared a success. The attacker notes the failed attempt and pivots to a different delivery method — watering hole on an industry news site the target employees read. The perimeter block was an obstacle, not a stop. Advanced attackers have multiple delivery mechanisms planned; a block is a signal to try a different approach."
        fix="When you block a delivery attempt, research the threat actor responsible. If the actor is known to use multiple delivery methods, assume they will try again. Expand monitoring to cover the actor's other known TTPs. A blocked phishing campaign is a signal that your organisation is being actively targeted — it is a reason to increase vigilance, not stand down."
      />

      <Err
        msg="One account compromised — damage limited to that account's access"
        cause="The compromised account had standard user permissions with no direct access to sensitive data. The team contained the account and closed the ticket. Two weeks later, the attacker — who used the account as a pivot — had identified through BloodHound that the account's group membership allowed reading a service account's GMSA password, which had full access to the backup server. The attacker exfiltrated everything through that chain without the original account directly touching sensitive data."
        fix="Initial access is a starting position, not a destination. Assume any compromised account is the first step in a lateral movement chain. Run BloodHound or Microsoft's Attack Path analysis to identify what attack paths exist from the compromised account to sensitive resources. Contain all accounts in the attack path. Active Directory attack path analysis should be routine in any Windows environment incident investigation."
      />

      <Err
        msg="Post-incident: attacker is gone because we rebuilt the compromised server"
        cause="An organisation detects malware on a web server, rebuilds it from a clean image, and closes the incident. The attacker had added a webhook to the GitHub Actions CI/CD pipeline two weeks earlier using credentials obtained during initial access. Every new deployment reinstalls the attacker's backdoor. The attacker persists through the rebuild because their persistence mechanism is upstream of the server."
        fix="Persistence investigation must extend beyond the compromised system to everything that system touched: CI/CD pipelines, source code repositories, cloud service credentials, configuration management systems, and service accounts the server's identity could authenticate as. Rebuilding only the compromised server without investigating upstream systems is incomplete remediation."
      />

      <Err
        msg="We mapped our security controls to ATT&CK and have 80% coverage — we are well protected"
        cause="Coverage mapping is a starting point, not a conclusion. Claiming 80% ATT&CK coverage assumes that every detection that maps to a technique actually fires reliably, that the technique was correctly mapped, that the detection has not drifted due to data pipeline changes, and that 80% coverage is sufficient for the specific threat actors relevant to the organisation. None of these assumptions is validated by the mapping exercise itself."
        fix="ATT&CK coverage mapping must be validated by adversary emulation — actually executing the techniques against your environment with your detection stack running and measuring what fires, what does not, and what fires with too many false positives to be useful. MITRE CALDERA or a red team validates coverage; a spreadsheet only claims it. Prioritise coverage for the specific techniques used by threat actors most relevant to your sector, rather than optimising for the percentage metric."
      />

      {/* ── Key Takeaways ── */}
      <KeyTakeaways items={[
        'Defenders who do not understand attacker techniques cannot evaluate whether their controls work. The Kill Chain and MITRE ATT&CK provide the vocabulary for thinking like an attacker — understanding attack structure makes defence decisions precise rather than intuitive.',
        'The Cyber Kill Chain has seven phases: Reconnaissance, Weaponisation, Delivery, Exploitation, Installation, C2, and Actions on Objectives. The attacker must complete every phase; the defender only needs to break one. Layered defences create multiple break points.',
        'MITRE ATT&CK catalogs 14 tactics and 200+ techniques with real-world evidence from actual intrusions. It is the standard framework for writing detections, evaluating security products, planning red team exercises, and communicating about threats precisely.',
        'Living off the land (LotL) uses legitimate system tools (PowerShell, certutil, WMI) to evade file-based detection. Detection requires behavioural analysis — process lineage, command line inspection, network connections, and timing anomalies — not file signatures.',
        'Named threat actor groups have documented TTPs in ATT&CK. Knowing which groups target your industry enables threat-informed defence: prioritise detections for techniques those specific actors use rather than defending against all possible attacks equally.',
        'Threat-informed defence workflow: identify relevant threat actors → map their ATT&CK TTPs → test detection coverage through adversary emulation (MITRE CALDERA or red team) → build detections for gaps. Coverage percentages claimed without validation are meaningless.',
        'Initial access is a starting position. Advanced attackers use BloodHound to map AD attack paths from any compromised account to sensitive resources. Incident response must investigate the attack path forward from the compromised account, not just the compromise itself.',
        'C2 traffic is designed to blend in: HTTP/HTTPS C2 on ports that cannot be blocked, DNS C2 using a protocol that cannot be blocked. Detection uses anomaly detection — regular beaconing intervals, high-entropy domain names, DNS query volumes exceeding baselines.',
        'The Kill Chain provides incident response context: knowing which phase an attacker is in tells investigators what has already happened and what defences to prioritise. Phase 5 detection means exploitation and installation have already occurred.',
        'ATT&CK coverage must be validated by adversary emulation, not just mapped. A spreadsheet claiming 80% coverage is not validated coverage. A red team executing those 80% of techniques and confirming which detections fire is validated coverage.',
      ]} />

      {/* ── Next Module CTA ── */}
      <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 10, padding: '24px', marginTop: 40 }}>
        <p style={{ fontSize: 10, color: 'var(--muted)', letterSpacing: '.12em', textTransform: 'uppercase', fontFamily: 'var(--font-mono)', fontWeight: 700, margin: '0 0 10px' }}>
          What comes next
        </p>
        <p style={{ fontSize: 15, color: 'var(--text)', lineHeight: 1.85, margin: '0 0 20px' }}>
          In <strong>Module 08</strong>, you go inside the most successful attack vector in history — social engineering and phishing. How attackers manipulate human psychology, what makes a phishing campaign effective, and why humans remain the hardest security problem to solve.
        </p>
        <Link href="/learn/cybersecurity/social-engineering-phishing" style={{ background: C, color: '#fff', padding: '11px 24px', borderRadius: 7, fontWeight: 700, fontSize: 13, textDecoration: 'none', display: 'inline-block' }}>
          Module 08 → Social Engineering and Phishing
        </Link>
      </div>

    </LearnLayout>
  )
}
