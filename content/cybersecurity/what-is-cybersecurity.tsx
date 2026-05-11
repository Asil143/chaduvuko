import type { Metadata } from 'next'
import Link from 'next/link'
import { LearnLayout } from '@/components/content/LearnLayout'
import { Callout } from '@/components/content/Callout'
import { KeyTakeaways } from '@/components/content/KeyTakeaways'

export const metadata: Metadata = {
  title: 'What is Cybersecurity? | Chaduvuko',
  description: 'The threat landscape, the roles, why the field exists, and what attackers actually want. The clearest starting point for anyone entering security.',
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

export default function WhatIsCybersecurity() {
  return (
    <LearnLayout
      title="What is Cybersecurity?"
      description="The threat landscape, the roles, and why this field exists. What attackers actually want and how defenders think."
      section="Cybersecurity — Module 01"
      readTime="25 min"
      updatedAt="May 2026"
    >

      {/* ── PART 01 ── */}
      <Part n="01" title="The Definition That Actually Explains It" />

      <P>Search "what is cybersecurity" and you get answers like <em>"protecting systems from digital attacks"</em> or <em>"keeping data safe online."</em> These are not wrong. They are useless. A lock on a door protects a system from attack. Security guards keep things safe. What makes cybersecurity different is the nature of what is being protected and who is attacking it.</P>

      <P>Here is the definition that explains it:</P>

      <div style={{ background: `${C}08`, border: `1px solid ${C}25`, borderLeft: `4px solid ${C}`, borderRadius: '0 10px 10px 0', padding: '20px 24px', margin: '4px 0 24px' }}>
        <P>Cybersecurity is the practice of protecting computers, networks, software, and data from attackers who are actively trying to steal, disrupt, or destroy them — and doing so continuously, at scale, from anywhere in the world, often against targets that do not know they are targets yet.</P>
      </div>

      <P>The three words that make cybersecurity different from any other form of security: <Hl>continuously, scale, anywhere.</Hl> A physical thief can rob one bank at a time. A cybercriminal can simultaneously attempt to compromise tens of thousands of systems from a laptop in a different country. The economics of attack are asymmetric in a way that physical security never faced.</P>

      <HR />

      {/* ── PART 02 ── */}
      <Part n="02" title="What Attackers Actually Want" />

      <P>Every cyberattack has a motivation. Understanding motivation is what lets you reason about threats — because attackers optimise their methods for their goal, and defenders who understand that goal can anticipate the method.</P>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 14, margin: '20px 0 32px' }}>
        {[
          { goal: 'Financial gain', color: '#facc15', examples: 'Ransomware encrypts your files, demands payment. Credential theft sells on dark web markets. Bank fraud, crypto theft, fake invoices. This is the majority of attacks — crime is profitable.', who: 'Criminal organisations, lone actors' },
          { goal: 'Espionage', color: '#4285f4', examples: 'Nation-state actors steal intellectual property, government secrets, military designs, negotiating positions. APT groups operate for years inside targeted networks without detection.', who: 'Nation-states (China, Russia, Iran, North Korea, US)' },
          { goal: 'Disruption', color: '#ff4757', examples: 'Hacktivists take down websites of companies they oppose. Nation-states attack power grids, water treatment, financial systems to cause chaos during geopolitical conflicts.', who: 'Hacktivists, nation-states' },
          { goal: 'Data theft', color: '#7b61ff', examples: 'Personal data (name, SSN, health records) sold for identity fraud. Corporate data sold to competitors. Customer lists, internal documents, source code — everything has a buyer.', who: 'Criminal groups, insider threats, competitors' },
          { goal: 'Reputation damage', color: '#f97316', examples: 'Defacement of public websites, leaking embarrassing internal communications, publishing private customer data publicly to cause reputational and regulatory harm.', who: 'Competitors, disgruntled employees, hacktivists' },
          { goal: 'Access as a service', color: '#00e676', examples: 'Initial Access Brokers break into companies and sell that access to other criminals who then deploy ransomware, steal data, or conduct fraud. Access itself is the product.', who: 'Specialised criminal groups' },
        ].map((item) => (
          <div key={item.goal} style={{ background: 'var(--surface)', border: `1px solid ${item.color}25`, borderLeft: `3px solid ${item.color}`, borderRadius: 10, padding: '16px 18px' }}>
            <div style={{ fontSize: 13, fontWeight: 800, color: item.color, marginBottom: 6 }}>{item.goal}</div>
            <div style={{ fontSize: 12, color: 'var(--muted)', lineHeight: 1.65, marginBottom: 8 }}>{item.examples}</div>
            <div style={{ fontSize: 11, color: item.color, fontFamily: 'var(--font-mono)' }}>Who: {item.who}</div>
          </div>
        ))}
      </div>

      <ProTip>In an interview, "what motivates attackers?" is a warm-up question. The strong answer names the motivation taxonomy — financial, espionage, disruption, data theft — and then links motivation to method: ransomware actors want payment-capable targets, so they prioritise hospitals, schools, and municipalities who cannot afford downtime. Showing that you connect motivation to technique is what separates a security-aware answer from a memorised one.</ProTip>

      <HR />

      {/* ── PART 03 ── */}
      <Part n="03" title="The Threat Landscape — Who Is Actually Attacking" />

      <H>Nation-State Actors (Advanced Persistent Threats)</H>
      <P>Nation-states operate the most sophisticated and well-resourced attack programs in the world. They have unlimited time, professional teams, and zero-day exploits that cost millions of dollars. The word <Hl>persistent</Hl> in Advanced Persistent Threat describes their approach: they do not smash and grab. They establish long-term access, often living undetected inside a network for months or years while exfiltrating data.</P>
      <P>Notable examples: the SolarWinds compromise (attributed to Russia's SVR) compromised thousands of organisations including US government agencies by backdooring a trusted software update. The attackers had access for months before detection. This is what nation-state attacks look like — not dramatic explosions, but quiet, methodical, and devastating.</P>

      <H>Criminal Organisations</H>
      <P>Organised crime has moved into cybercrime because the returns are extraordinary and the risk of prosecution is relatively low. Ransomware-as-a-Service operations work like franchises: a core technical group builds the ransomware, affiliate groups deploy it against targets, and the two split the ransom payment. LockBit, BlackCat, and Clop have each collected hundreds of millions of dollars.</P>

      <H>Hacktivists</H>
      <P>Hacktivists attack organisations to make a political statement. Anonymous, LulzSec, and similar collectives have defaced government websites, leaked internal documents, and taken down corporate infrastructure to protest policies they oppose. Their technical sophistication varies widely — some are expert, most rely on widely available tools.</P>

      <H>Insider Threats</H>
      <P>The most underestimated threat in most organisations. A disgruntled employee with legitimate access can exfiltrate data, sabotage systems, or sell access to external attackers — and they bypass most perimeter defences entirely because they are already inside. The 2023 Tesla data breach involved two former employees leaking 100GB of data including personal information on 75,000+ employees.</P>

      <H>Script Kiddies and Opportunistic Attackers</H>
      <P>The most common type of attack you will actually see in logs is automated and untargeted. Bots continuously scan the entire internet for known vulnerabilities — exposed SSH servers, unpatched CMS plugins, default credentials on routers. These attacks are not targeted at you specifically; your IP address showed up in a scan, and a known exploit exists. Volume and automation are their weapons.</P>

      <HR />

      {/* ── PART 04 ── */}
      <Part n="04" title="The Two Sides — Red and Blue" />

      <P>Cybersecurity is fundamentally adversarial. There are attackers and there are defenders. The industry has formalised this into colour-coded teams:</P>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, margin: '20px 0 32px' }}>
        <div style={{ background: 'rgba(255,71,87,0.06)', border: '2px solid rgba(255,71,87,0.3)', borderRadius: 12, padding: '20px 22px' }}>
          <div style={{ fontSize: 14, fontWeight: 800, color: '#ff4757', marginBottom: 12 }}>🔴 Red Team — Offense</div>
          <div style={{ fontSize: 13, color: 'var(--text)', lineHeight: 1.75 }}>
            <p style={{ margin: '0 0 8px' }}>Simulates real attackers to find weaknesses before criminals do.</p>
            <p style={{ margin: '0 0 6px', color: 'var(--muted)', fontSize: 12 }}>• Penetration testers</p>
            <p style={{ margin: '0 0 6px', color: 'var(--muted)', fontSize: 12 }}>• Vulnerability researchers</p>
            <p style={{ margin: '0 0 6px', color: 'var(--muted)', fontSize: 12 }}>• Bug bounty hunters</p>
            <p style={{ margin: '0 0 6px', color: 'var(--muted)', fontSize: 12 }}>• Exploit developers</p>
          </div>
        </div>
        <div style={{ background: 'rgba(66,133,244,0.06)', border: '2px solid rgba(66,133,244,0.3)', borderRadius: 12, padding: '20px 22px' }}>
          <div style={{ fontSize: 14, fontWeight: 800, color: '#4285f4', marginBottom: 12 }}>🔵 Blue Team — Defense</div>
          <div style={{ fontSize: 13, color: 'var(--text)', lineHeight: 1.75 }}>
            <p style={{ margin: '0 0 8px' }}>Detects, responds to, and prevents attacks in production systems.</p>
            <p style={{ margin: '0 0 6px', color: 'var(--muted)', fontSize: 12 }}>• SOC analysts</p>
            <p style={{ margin: '0 0 6px', color: 'var(--muted)', fontSize: 12 }}>• Incident responders</p>
            <p style={{ margin: '0 0 6px', color: 'var(--muted)', fontSize: 12 }}>• Threat hunters</p>
            <p style={{ margin: '0 0 6px', color: 'var(--muted)', fontSize: 12 }}>• Security engineers</p>
          </div>
        </div>
      </div>

      <P>There is also a <Hl>Purple Team</Hl> — red and blue working together, sharing findings in real time so defences improve continuously rather than waiting for a formal report. Most mature security organisations operate as purple teams in practice.</P>

      <Callout type="info">
        This track covers both. Phases 2–4 are the red team perspective — how attacks are built and executed. Phases 5–6 are the blue team perspective — how attacks are detected and stopped. The best security engineers understand both sides deeply. Defenders who think like attackers catch what automated tools miss.
      </Callout>

      <HR />

      {/* ── PART 05 ── */}
      <Part n="05" title="The Security Roles — Who Does What" />

      <div style={{ overflowX: 'auto', marginBottom: 32 }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13, lineHeight: 1.6 }}>
          <thead>
            <tr>
              {['Role', 'What They Do', 'Team', 'Entry Path'].map((h, i) => (
                <th key={h} style={{ padding: '10px 14px', textAlign: 'left', fontWeight: 700, fontSize: 11, letterSpacing: '.08em', textTransform: 'uppercase', color: 'var(--muted)', borderBottom: '1px solid var(--border)', background: 'var(--bg2)', minWidth: i === 0 ? 160 : 140 }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {[
              ['SOC Analyst (L1/L2/L3)', 'Monitor alerts, triage incidents, investigate threats', 'Blue', 'Security+, entry-level, no experience required'],
              ['Penetration Tester', 'Attack systems with permission to find vulnerabilities', 'Red', 'CEH, OSCP, CTFs, bug bounty'],
              ['Incident Responder', 'Lead response when breaches happen — contain, eradicate, recover', 'Blue', 'GCIH, IR experience from SOC'],
              ['Vulnerability Analyst', 'Scan systems, prioritise CVEs, track remediation', 'Blue', 'Security+, scanning tool experience'],
              ['Security Engineer', 'Build and maintain security infrastructure — SIEM, firewalls, IAM', 'Blue', 'Software engineering + security knowledge'],
              ['Threat Hunter', 'Proactively search for attackers not caught by alerts', 'Blue', 'Advanced — 3+ years SOC experience'],
              ['Malware Analyst / Reverse Engineer', 'Disassemble and analyse malicious code', 'Blue/Red', 'Assembly, debugging, scripting'],
              ['Application Security Engineer', 'Embed security into software development — SAST, code review, threat modelling', 'Blue', 'Software dev + security training'],
              ['Cloud Security Engineer', 'Secure cloud infrastructure — IAM, network policies, CSPM', 'Blue', 'Cloud certifications + security knowledge'],
              ['CISO', 'Lead entire security strategy for an organisation', 'Executive', 'CISSP, 10+ years experience'],
            ].map(([role, what, team, path], i) => (
              <tr key={i} style={{ background: i % 2 === 0 ? 'var(--surface)' : 'var(--bg2)' }}>
                <td style={{ padding: '10px 14px', fontWeight: 700, color: 'var(--text)', fontSize: 13, borderBottom: '1px solid var(--border)' }}>{role}</td>
                <td style={{ padding: '10px 14px', color: 'var(--muted)', borderBottom: '1px solid var(--border)' }}>{what}</td>
                <td style={{ padding: '10px 14px', color: team === 'Red' ? '#ff4757' : team === 'Blue' ? '#4285f4' : team === 'Blue/Red' ? '#7b61ff' : 'var(--muted)', fontWeight: 700, fontSize: 12, borderBottom: '1px solid var(--border)' }}>{team}</td>
                <td style={{ padding: '10px 14px', color: 'var(--muted)', fontSize: 12, borderBottom: '1px solid var(--border)' }}>{path}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <HR />

      {/* ── PART 06 ── */}
      <Part n="06" title="The Attack Surface — What Gets Attacked" />

      <P>An <Hl>attack surface</Hl> is every point where an attacker could try to enter or extract data. Understanding your attack surface is the first step in defending it. Modern organisations have four overlapping attack surfaces:</P>

      {[
        { surface: 'Network surface', icon: '🌐', desc: 'Every exposed port, protocol, and service reachable from the internet. An organisation with 10,000 IP addresses might have millions of potential entry points when you count all exposed services. VPNs, firewalls, and network segmentation reduce this surface.', example: 'An unpatched VPN appliance with a known CVE — exploited within hours of the CVE being published because automated scanners search for it immediately.' },
        { surface: 'Application surface', icon: '💻', desc: 'Every web app, API, and software service the organisation runs. Login forms accept input from the internet. APIs expose business logic. Third-party libraries have vulnerabilities the organisation did not write and may not know exist.', example: 'A SQL injection in a login form allows an attacker to bypass authentication and dump the entire user database without a valid password.' },
        { surface: 'Human surface', icon: '👤', desc: 'Every employee who can be phished, social-engineered, or bribed. A single employee clicking a phishing link can give an attacker a foothold inside the network that bypasses every technical control.', example: 'A finance employee receives a convincing email from "the CEO" requesting an urgent wire transfer to a new vendor. This is business email compromise (BEC) — losses run into billions of dollars annually.' },
        { surface: 'Supply chain surface', icon: '🔗', desc: 'Every third-party vendor, software package, and service the organisation depends on. If the attacker cannot breach the target directly, they breach a trusted supplier first. The SolarWinds attack is the defining example.', example: 'A compromised npm package with millions of weekly downloads includes a credential stealer. Every company using the package becomes a victim automatically.' },
      ].map((item) => (
        <div key={item.surface} style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 12, padding: '20px 24px', marginBottom: 14 }}>
          <div style={{ fontSize: 14, fontWeight: 800, color: C, marginBottom: 6 }}>{item.icon} {item.surface}</div>
          <div style={{ fontSize: 14, color: 'var(--text)', lineHeight: 1.8, marginBottom: 10 }}>{item.desc}</div>
          <div style={{ fontSize: 12, color: 'var(--muted)', fontFamily: 'var(--font-mono)', background: 'var(--bg2)', border: '1px solid var(--border)', borderRadius: 6, padding: '8px 12px', lineHeight: 1.6 }}>Real example: {item.example}</div>
        </div>
      ))}

      <HR />

      {/* ── PART 07 ── */}
      <Part n="07" title="Why the Field Exists — The Structural Reason Security Is Hard" />

      <P>Cybersecurity is permanently difficult for three structural reasons that have nothing to do with how smart defenders are:</P>

      <div style={{ display: 'grid', gap: 14, margin: '20px 0 32px' }}>
        {[
          {
            reason: 'The asymmetry of attack and defence',
            color: '#ff4757',
            body: 'An attacker needs to find one way in. A defender needs to block every possible way in. This asymmetry is fundamental — it cannot be engineered away. No matter how good your defences are, an attacker with enough time and motivation will find the gap you missed.',
          },
          {
            reason: 'Complexity creates attack surface',
            color: '#f97316',
            body: 'A modern web application depends on hundreds of libraries, runs on virtual infrastructure managed by cloud providers, processes data through third-party APIs, and is operated by humans. Every dependency is a potential vulnerability. Complexity grows faster than the ability to secure it.',
          },
          {
            reason: 'Software has bugs — always',
            color: '#7b61ff',
            body: 'The average large codebase contains between 1 and 25 bugs per 1,000 lines of code. A complex enterprise application might have 10 million lines of code. Some percentage of those bugs will be security vulnerabilities. This is not a failure of engineering — it is a mathematical reality of software complexity.',
          },
        ].map((item) => (
          <div key={item.reason} style={{ background: 'var(--surface)', border: `1px solid ${item.color}20`, borderLeft: `3px solid ${item.color}`, borderRadius: 10, padding: '16px 20px' }}>
            <div style={{ fontSize: 13, fontWeight: 800, color: item.color, marginBottom: 8 }}>{item.reason}</div>
            <div style={{ fontSize: 14, color: 'var(--text)', lineHeight: 1.8 }}>{item.body}</div>
          </div>
        ))}
      </div>

      <ProTip>These structural reasons are why "just patch everything" and "just don't make mistakes" are not real security strategies. Defenders operate under the assumption that attackers will eventually find a way in — defence is about detection speed, response time, and minimising blast radius, not just prevention.</ProTip>

      <HR />

      {/* ── PART 08 ── */}
      <Part n="08" title="Core Security Concepts Every Beginner Must Know" />

      <H>Vulnerability, Threat, and Risk</H>
      <P>These three words are used interchangeably in everyday speech but mean different things in security: a <Hl>vulnerability</Hl> is a weakness that could be exploited (an unlocked door). A <Hl>threat</Hl> is an actor or event that might exploit that weakness (a burglar). <Hl>Risk</Hl> is the combination of likelihood and impact — the probability that the threat exploits the vulnerability and the damage it would cause. Security prioritises by risk, not by vulnerability count.</P>

      <H>Authentication vs Authorisation</H>
      <P><Hl>Authentication</Hl> answers "who are you?" — verifying identity via password, biometric, or certificate. <Hl>Authorisation</Hl> answers "what are you allowed to do?" — determining permissions after identity is established. These are separate systems that are often confused. You can be authenticated (logged in as a real user) but not authorised (not permitted to access a specific resource). Broken authorisation — where authenticated users can access resources they should not — is one of the most common web vulnerabilities.</P>

      <H>Confidentiality, Integrity, Availability (CIA)</H>
      <P>Every security control protects one or more of these three properties. Encryption protects confidentiality. Cryptographic hashes verify integrity. Redundant systems protect availability. Every attack targets one or more of these properties. Module 05 covers the CIA triad in depth — it is the foundational framework for reasoning about any security decision.</P>

      <H>Defence in Depth</H>
      <P>No single security control is perfect. Defence in depth means layering multiple controls so that when one fails — and it will — others remain. A phishing email that bypasses the spam filter is stopped by endpoint detection. Malware that evades endpoint detection is stopped by network monitoring. Lateral movement is stopped by network segmentation. The attacker must defeat every layer sequentially.</P>

      <HR />

      {/* ── PART 09 ── */}
      <Part n="09" title="What This Looks Like at Work — A Day in the Life" />

      <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 12, padding: '24px 28px', marginBottom: 24 }}>
        <div style={{ fontSize: 11, fontWeight: 700, color: C, background: `${C}15`, border: `1px solid ${C}30`, borderRadius: 6, padding: '4px 10px', fontFamily: 'var(--font-mono)', display: 'inline-block', marginBottom: 20, letterSpacing: '.1em', textTransform: 'uppercase' }}>
          Scenario — Monday morning at a mid-size fintech company
        </div>

        {[
          { time: '08:30', label: 'SOC Analyst arrives, reviews overnight alerts', body: 'The SIEM generated 847 alerts overnight. A triage script auto-closed 820 as known false positives (automated scanner noise, routine auth failures). 27 remain. The analyst starts with the highest severity: a login from a new country for a privileged admin account.' },
          { time: '08:45', label: 'Investigating the suspicious login', body: 'The login came from a Tor exit node. The admin account normally logs in from a specific IP range. The login succeeded — valid credentials. Either the admin is travelling and using Tor (unlikely) or credentials were compromised. The analyst calls the admin. The admin is at home, did not log in.' },
          { time: '09:00', label: 'Incident declared, response begins', body: 'The account is disabled immediately. The security team reviews what the account did in the 3 hours it was active: a new admin user was created, and two security group memberships were modified. The attacker gained persistence. This is now a full incident response.' },
          { time: '10:00', label: 'Parallel track: how did the credential get stolen?', body: 'The admin receives a phishing simulation report from two weeks ago. They clicked the link. But this was not a drill — it was a real phishing email disguised as the simulation. The credential was captured then. The attacker waited two weeks before using it.' },
          { time: '14:00', label: 'Penetration tester from a different team gets involved', body: 'The red team is asked to look for any other accounts the attacker might have compromised. They find two more accounts with similar login patterns. The scope expanded — what looked like one incident is a broader breach. The CISO is notified.' },
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
          This scenario is a compressed version of real incidents. The 3-hour window between compromise and detection is considered fast — average dwell time (time between breach and detection) across all industries is 204 days. The attackers who waited two weeks are practicing operational security — long enough for any automated detection of credential theft to have been investigated and closed.
        </Callout>
      </div>

      <HR />

      {/* ── PART 10 ── */}
      <Part n="10" title="Interview Prep — 5 Questions With Complete Answers" />

      <IQ q="What is the difference between a vulnerability, a threat, and a risk?">
        A vulnerability is a weakness in a system, application, or process that could be exploited. An unpatched software bug, a misconfigured firewall rule, an employee who has not received security training — all are vulnerabilities. The vulnerability exists whether or not anyone is trying to exploit it.
        {'\n\n'}
        A threat is an actor or event that might exploit a vulnerability — a criminal gang, a nation-state, a disgruntled employee, a natural disaster that takes down your data centre. Threats are external to the vulnerability.
        {'\n\n'}
        Risk is the intersection of the two: the probability that a specific threat will exploit a specific vulnerability multiplied by the impact if it does. A critical vulnerability in a system that is air-gapped and not reachable from the internet has low risk despite high severity. A medium severity vulnerability in an internet-facing login page used by millions of customers carries higher risk. Security teams prioritise by risk, not by vulnerability severity alone, because patching every vulnerability immediately is impossible — resources must go where they matter most.
      </IQ>

      <IQ q="What is the CIA triad and why does it matter?">
        The CIA triad is the foundational framework for thinking about information security. The three properties are Confidentiality, Integrity, and Availability, and every security control, attack, and policy can be analysed through this lens.
        {'\n\n'}
        Confidentiality means that information is accessible only to those authorised to access it. Encryption, access controls, and data classification all protect confidentiality. Attacks that violate confidentiality include data breaches, eavesdropping, and credential theft.
        {'\n\n'}
        Integrity means that information is accurate and has not been tampered with. Cryptographic hashes, digital signatures, and audit logs protect integrity. Attacks that violate integrity include man-in-the-middle attacks that modify data in transit, or malware that alters financial records.
        {'\n\n'}
        Availability means that systems and data are accessible when needed by authorised users. Redundancy, backups, and DDoS protection preserve availability. Ransomware is primarily an availability attack — it does not steal data, it makes it inaccessible until payment.
        {'\n\n'}
        Why it matters: every security decision involves trade-offs between these three properties. Strong encryption improves confidentiality but can reduce availability if keys are lost. Aggressive access controls improve confidentiality but may reduce availability for legitimate users. The CIA triad provides the vocabulary for having those trade-off conversations precisely.
      </IQ>

      <IQ q="What is the difference between authentication and authorisation?">
        Authentication is the process of verifying identity — proving that you are who you claim to be. A username and password, a fingerprint, a hardware token, or a digital certificate can all authenticate a user. Authentication answers the question: "Who are you?"
        {'\n\n'}
        Authorisation is the process of determining what an authenticated identity is permitted to do. Once you have proven who you are, authorisation determines which resources you can access, which actions you can perform, and what data you can see. Authorisation answers the question: "What are you allowed to do?"
        {'\n\n'}
        The two are completely separate and both must be correct. A broken authentication system lets an attacker impersonate a legitimate user. A broken authorisation system lets a legitimately authenticated user access resources they should not — reading another user's private data, escalating their own privileges, or taking administrative actions.
        {'\n\n'}
        Insecure Direct Object Reference (IDOR) is a classic authorisation failure: a user is authenticated, but the application does not verify that the resource they are requesting belongs to them. Changing /api/invoice?id=1001 to /api/invoice?id=1002 retrieves another user's invoice — the user is authenticated but should not be authorised to access that record. This is one of the most common and impactful web vulnerabilities.
      </IQ>

      <IQ q="What is defence in depth and why can't we just rely on a single strong control?">
        Defence in depth is the security principle of layering multiple independent controls so that when any single control fails — and eventually any control will fail — the others continue to provide protection. The term comes from military strategy, where multiple defensive lines mean an attacker must breach each one sequentially, depleting resources at each layer.
        {'\n\n'}
        In cybersecurity, a single strong control is insufficient because no control is perfect. A firewall can be bypassed via a compromised VPN credential. An endpoint detection system can be evaded by a sophisticated attacker who understands its signature database. A strong password policy does nothing against phishing that captures the password before it is used.
        {'\n\n'}
        A layered defence works differently: a phishing email that bypasses the email filter is blocked by browser isolation. Malware that bypasses browser isolation is detected by endpoint detection. Malware that evades endpoint detection is caught by network anomaly detection. Lateral movement after initial compromise is stopped by network segmentation. Each layer independently reduces the probability of a successful attack, and the combined effect is multiplicative, not additive.
        {'\n\n'}
        Practically, defence in depth means: perimeter controls, network controls, endpoint controls, application controls, data controls, and people controls — all simultaneously. An attacker who defeats the perimeter still faces endpoint detection. One who evades endpoint detection still faces network monitoring. The goal is not to be unbreachable but to ensure that a breach at any one layer does not immediately translate to full compromise.
      </IQ>

      <IQ q="Why is the insider threat considered one of the hardest threats to defend against?">
        Insider threats are difficult to defend against for a structural reason: insiders already have legitimate access to the systems they could harm. All perimeter defences — firewalls, intrusion detection, external threat monitoring — are designed to detect outsiders trying to get in. An insider who is already authenticated and authorised bypasses all of them by definition.
        {'\n\n'}
        The typical security model grants trust based on identity and access level. An employee with valid credentials accessing files they are authorised to access looks identical in logs to a malicious insider doing the same thing — until the behaviour pattern reveals an anomaly. A data engineer exfiltrating a customer database does the same query a legitimate reporting job does; the difference is the destination.
        {'\n\n'}
        Insider threats take several forms: malicious employees who intentionally steal data or sabotage systems; compromised employees whose credentials have been stolen by external attackers (the threat is now an "insider" who is actually external); and negligent employees who cause incidents through mistakes rather than malice.
        {'\n\n'}
        Defences focus on: least privilege access (limiting what any insider can access to only what they need for their role), user behaviour analytics (detecting anomalies in access patterns — accessing data at unusual hours, downloading unusually large volumes), data loss prevention systems, and separation of duties (requiring two people for sensitive operations). None of these eliminate insider threats, but they reduce the damage any single insider can cause and improve the odds of detection before major harm occurs.
      </IQ>

      <HR />

      {/* ── Error Library ── */}
      <Part n="11" title="Misconceptions That Will Get You in Trouble" />

      <Err
        msg="We are too small to be a target — attackers only go after big companies"
        cause="This reasoning is based on the assumption that attacks are targeted and manual. The majority of attacks are automated and indiscriminate — bots scan every IP address on the internet continuously, looking for any exploitable service. A startup with 10 employees running an unpatched WordPress site will be compromised before a Fortune 500 company with a full security team, because the startup is easier. Small organisations are disproportionately attacked because they invest less in security while still holding valuable data."
        fix="Threat modelling cannot begin with 'we are not interesting.' Every internet-connected system is interesting to someone. Ask instead: what data do we hold that has value? Customer PII, payment information, and employee data are valuable regardless of company size. Base your security investment on the value of what you protect, not on assumptions about whether attackers would target you."
      />

      <Err
        msg="We have a firewall and antivirus so we are secure"
        cause="A firewall and antivirus address a small subset of the attack surface. A firewall blocks unwanted incoming connections — it does nothing against phishing emails that deliver malware via user action. Antivirus detects known malware signatures — it does not detect novel malware, living-off-the-land attacks that use legitimate system tools, or credential theft that never touches the filesystem. These are necessary controls, not sufficient ones."
        fix="Layered security: email filtering, endpoint detection and response (EDR), multi-factor authentication, user training, network monitoring, patch management, and incident response planning — these complement the firewall and antivirus. The question is never 'do we have security tools?' but 'can we detect and respond to an attack that bypasses our preventive controls?'"
      />

      <Err
        msg="The security team is responsible for security — developers do not need to worry about it"
        cause="Application security vulnerabilities are written into code by developers. SQL injection, XSS, insecure authentication — these cannot be detected or fixed by a firewall. By the time a security team finds a vulnerability in production, it may have existed for months. The security team cannot review every line of code before it ships, and attempting to do so creates bottlenecks that slow delivery."
        fix="Security is a shared responsibility. Developers need enough security knowledge to avoid common vulnerabilities during development — input validation, parameterised queries, output encoding. Security teams provide training, tooling (SAST scanners in CI/CD), and guidance. This is called DevSecOps or shifting security left. Security defects are cheapest to fix before they are written, not after they reach production."
      />

      <Err
        msg="Strong passwords are sufficient — MFA is inconvenient overhead"
        cause="Passwords can be compromised without being guessed or brute-forced. Phishing captures the password as the user types it. Credential stuffing tries breached passwords from other services — and 65% of people reuse passwords across accounts. Keystroke loggers capture passwords before they are sent. The strength of the password is irrelevant in all these scenarios."
        fix="Multi-factor authentication (MFA) defeats all credential-based attacks by requiring a second factor the attacker does not have. A phished password combined with a TOTP code that expires in 30 seconds is useless to an attacker who receives it 10 minutes later. MFA is not optional overhead — it is the single highest-ROI security control an organisation can implement. The inconvenience of MFA is trivially small compared to the cost of a credential compromise."
      />

      <Err
        msg="We do not need to worry about security until after launch — we will add it later"
        cause="Security added after the fact is exponentially more expensive than security built in from the start. A SQL injection vulnerability found in code review takes 30 minutes to fix. The same vulnerability found in production after exploitation requires forensic investigation, system rebuild, customer notification, regulatory reporting, and reputational repair. IBM's Cost of a Data Breach Report consistently shows that breaches discovered and contained early cost a fraction of those discovered months later."
        fix="Security decisions made at architecture time are cheap — choose a framework that prevents SQL injection by default, use an authentication library rather than rolling your own, enable HTTPS from day one. Decisions reversed after launch are expensive. The hardest security problems to fix are the ones baked into the core architecture: a data model that stores PII in ways that make deletion difficult, a service that must talk to the internet for valid reasons but was built with no authentication."
      />

      {/* ── Key Takeaways ── */}
      <KeyTakeaways items={[
        'Cybersecurity is the practice of protecting systems, networks, and data from attackers who operate continuously, at scale, and from anywhere — the economics of attack are asymmetric in a way physical security never faced.',
        'Attackers are motivated by financial gain (ransomware, fraud), espionage (nation-states stealing secrets), disruption (hacktivists, nation-state infrastructure attacks), and data theft (PII sold for identity fraud). Understanding motivation predicts method.',
        'The threat landscape includes nation-state actors (sophisticated, persistent, well-resourced), criminal organisations (ransomware-as-a-service, credential markets), hacktivists, insider threats, and the most common attacker: automated bots scanning for known vulnerabilities at internet scale.',
        'Red teams simulate attackers to find weaknesses before criminals do. Blue teams detect, respond to, and prevent attacks. Purple teams do both simultaneously. The best security engineers understand both perspectives — defenders who think like attackers catch what tools miss.',
        'The four attack surfaces: network (exposed ports and services), application (web apps and APIs), human (phishing and social engineering), and supply chain (third-party vendors and dependencies). All four must be addressed — attackers choose the easiest path.',
        'Security is structurally hard for three reasons that cannot be engineered away: the asymmetry of attack vs defence (attackers need one way in, defenders must block all), complexity creating attack surface (every dependency is a potential vulnerability), and software always having bugs.',
        'Core vocabulary: vulnerability (weakness), threat (actor who might exploit it), risk (probability × impact). Security teams prioritise by risk, not by vulnerability count — a critical severity bug on an air-gapped system may be lower priority than a medium severity bug on a public login page.',
        'Authentication verifies identity ("who are you?"). Authorisation determines permissions ("what are you allowed to do?"). Both must be correct. IDOR is a classic authorisation failure — authenticated users accessing data that should be restricted to other users.',
        'Defence in depth layers multiple independent controls so that when any single control fails, others remain. No single control is perfect — a firewall does not stop phishing, antivirus does not catch novel malware, MFA does not prevent authorisation flaws.',
        'Security is a shared responsibility — developers write the vulnerabilities that security teams cannot fix after the fact. Security built into architecture decisions and code is exponentially cheaper than security retrofitted onto a shipped product.',
      ]} />

      {/* ── Next Module CTA ── */}
      <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 10, padding: '24px', marginTop: 40 }}>
        <p style={{ fontSize: 10, color: 'var(--muted)', letterSpacing: '.12em', textTransform: 'uppercase', fontFamily: 'var(--font-mono)', fontWeight: 700, margin: '0 0 10px' }}>
          What comes next
        </p>
        <p style={{ fontSize: 15, color: 'var(--text)', lineHeight: 1.85, margin: '0 0 20px' }}>
          In <strong>Module 02</strong>, you go inside the internet — how TCP/IP actually routes a packet, what DNS really does, how HTTP and HTTPS work, and where every layer hides attack surfaces. Security engineers need to know the internet better than the people who built it.
        </p>
        <Link href="/learn/cybersecurity/how-the-internet-works" style={{ background: C, color: '#fff', padding: '11px 24px', borderRadius: 7, fontWeight: 700, fontSize: 13, textDecoration: 'none', display: 'inline-block' }}>
          Module 02 → How the Internet Works
        </Link>
      </div>

    </LearnLayout>
  )
}
