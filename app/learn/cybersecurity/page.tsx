'use client'

import { useState } from 'react'
import Link from 'next/link'
import { LearnLayout } from '@/components/content/LearnLayout'

type PhaseFilter = 'all' | '1' | '2' | '3' | '4' | '5' | '6'

interface Module {
  num: string
  title: string
  slug: string
  readTime: string
  status: 'live' | 'soon'
  phase: number
  description: string
  topics: string[]
  color: string
}

const phaseColors: Record<number, string> = {
  1: '#00e676',
  2: '#ff4757',
  3: '#f97316',
  4: '#7b61ff',
  5: '#4285f4',
  6: '#facc15',
}

const phaseInfo = [
  { id: 1, title: 'What Even Is This?'        },
  { id: 2, title: 'How Attacks Work'           },
  { id: 3, title: 'Core Technical Skills'      },
  { id: 4, title: 'Offensive Security'         },
  { id: 5, title: 'Defensive Security'         },
  { id: 6, title: 'Career & Production'        },
]

const modules: Module[] = [
  // ── Phase 1 — green ──────────────────────────────────────────────────────
  {
    num: '01', phase: 1, color: phaseColors[1], status: 'live', readTime: '25 min',
    title: 'What is Cybersecurity?',
    slug: 'what-is-cybersecurity',
    description: 'The threat landscape, the roles, and why this field exists. What attackers actually want and how defenders think. The clearest possible starting point.',
    topics: ['Threat landscape', 'Attackers vs defenders', 'Why security matters', 'The field mapped'],
  },
  {
    num: '02', phase: 1, color: phaseColors[1], status: 'live', readTime: '40 min',
    title: 'How the Internet Works — A Security Engineer\'s View',
    slug: 'how-the-internet-works',
    description: 'TCP/IP, DNS, HTTP, TLS — explained from the security angle. Every layer hides attack surfaces. This module shows you where they are and why they exist.',
    topics: ['TCP/IP model', 'DNS explained', 'HTTP and HTTPS', 'TLS handshake', 'Attack surfaces per layer'],
  },
  {
    num: '03', phase: 1, color: phaseColors[1], status: 'live', readTime: '45 min',
    title: 'Linux for Security Engineers',
    slug: 'linux-for-security',
    description: 'The operating system every hacker and every defender lives in. File permissions, processes, users, logs, and the commands you will use every single day.',
    topics: ['File permissions', 'Users and groups', 'Processes and signals', 'Log files', 'Essential commands'],
  },
  {
    num: '04', phase: 1, color: phaseColors[1], status: 'live', readTime: '50 min',
    title: 'Cryptography From Scratch',
    slug: 'cryptography-fundamentals',
    description: 'How encryption actually works — symmetric, asymmetric, hashing, digital signatures. Not math proofs — practical understanding of what protects data and what breaks it.',
    topics: ['Symmetric encryption', 'Asymmetric (public key)', 'Hashing', 'Digital signatures', 'TLS internals', 'Common attacks'],
  },
  {
    num: '05', phase: 1, color: phaseColors[1], status: 'live', readTime: '30 min',
    title: 'The CIA Triad and Security Models',
    slug: 'cia-triad-security-models',
    description: 'The three properties every security decision protects or trades off: Confidentiality, Integrity, Availability. The frameworks built around them.',
    topics: ['Confidentiality', 'Integrity', 'Availability', 'Security models', 'Trade-offs in design'],
  },
  {
    num: '06', phase: 1, color: phaseColors[1], status: 'live', readTime: '35 min',
    title: 'Cybersecurity Career Paths and the US Job Market (2026)',
    slug: 'cybersecurity-careers-us',
    description: 'Every security role mapped — SOC analyst to CISO. Real US salary data, top hiring companies, the certifications that actually matter, and how to break in.',
    topics: ['Role map', 'US salaries by role', 'Top hiring companies', 'Certifications ranked', 'Breaking in'],
  },

  // ── Phase 2 — red ────────────────────────────────────────────────────────
  {
    num: '07', phase: 2, color: phaseColors[2], status: 'live', readTime: '40 min',
    title: 'How Attackers Think — The Kill Chain and MITRE ATT&CK',
    slug: 'attacker-mindset-kill-chain',
    description: 'The attacker\'s playbook from first reconnaissance to full compromise. MITRE ATT&CK explained. Understanding this framework is what makes defenders effective.',
    topics: ['Cyber Kill Chain', 'MITRE ATT&CK', 'Attack lifecycle', 'TTPs explained', 'Defender implications'],
  },
  {
    num: '08', phase: 2, color: phaseColors[2], status: 'live', readTime: '35 min',
    title: 'Social Engineering and Phishing',
    slug: 'social-engineering-phishing',
    description: 'The most successful attack vector in history requires zero technical skill. How social engineering works, why humans are the hardest vulnerability to patch.',
    topics: ['Phishing types', 'Spear phishing', 'Vishing and smishing', 'Pretexting', 'Defense strategies'],
  },
  {
    num: '09', phase: 2, color: phaseColors[2], status: 'live', readTime: '60 min',
    title: 'Web Application Attacks — OWASP Top 10 From First Principles',
    slug: 'web-attacks-owasp',
    description: 'SQL injection, XSS, SSRF, IDOR, broken auth — every OWASP Top 10 vulnerability explained from scratch with real attack examples and why they exist.',
    topics: ['SQL injection', 'XSS', 'SSRF', 'IDOR', 'Broken auth', 'Security misconfig', 'OWASP Top 10'],
  },
  {
    num: '10', phase: 2, color: phaseColors[2], status: 'live', readTime: '45 min',
    title: 'Network Attacks — MITM, Sniffing, ARP Poisoning, DNS Hijacking',
    slug: 'network-attacks',
    description: 'How attackers position themselves between you and the internet. The mechanics of interception, spoofing, and protocol-level abuse at the network layer.',
    topics: ['MITM explained', 'ARP poisoning', 'DNS hijacking', 'Sniffing packets', 'SSL stripping'],
  },
  {
    num: '11', phase: 2, color: phaseColors[2], status: 'live', readTime: '40 min',
    title: 'Malware — Types, Behavior, and How It Spreads',
    slug: 'malware-types-behavior',
    description: 'Viruses, worms, ransomware, rootkits, spyware, RATs — what each one does differently, how they spread, and what defenders look for to detect them.',
    topics: ['Malware taxonomy', 'Ransomware mechanics', 'Rootkits', 'RATs', 'Command & control', 'Detection evasion'],
  },
  {
    num: '12', phase: 2, color: phaseColors[2], status: 'live', readTime: '45 min',
    title: 'Authentication Attacks — Credential Theft, Brute Force, Pass-the-Hash',
    slug: 'authentication-attacks',
    description: 'How attackers steal, crack, and replay credentials. Password hashing, rainbow tables, credential stuffing, and pass-the-hash — from the attacker\'s perspective.',
    topics: ['Password cracking', 'Credential stuffing', 'Pass-the-hash', 'Token theft', 'MFA bypass', 'Defense patterns'],
  },
  {
    num: '13', phase: 2, color: phaseColors[2], status: 'live', readTime: '35 min',
    title: 'Vulnerabilities and Exploits — CVEs, Zero-Days, and Patch Management',
    slug: 'vulnerabilities-and-exploits',
    description: 'What a vulnerability is, how exploits are built, how CVEs work, and what zero-days mean in practice. The lifecycle from discovery to patch to exploitation.',
    topics: ['CVE system', 'CVSS scoring', 'Zero-days', 'Exploit development basics', 'Patch lifecycle', 'Responsible disclosure'],
  },

  // ── Phase 3 — orange ─────────────────────────────────────────────────────
  {
    num: '14', phase: 3, color: phaseColors[3], status: 'live', readTime: '55 min',
    title: 'Python for Security Engineers',
    slug: 'python-for-security',
    description: 'Not Python basics — Python for security. Port scanners, log parsers, hash crackers, API fuzzers, and the scripts every security engineer actually runs.',
    topics: ['Socket programming', 'Port scanning', 'Log parsing', 'Hash cracking', 'HTTP fuzzing', 'Automation scripts'],
  },
  {
    num: '15', phase: 3, color: phaseColors[3], status: 'live', readTime: '50 min',
    title: 'Networking Deep Dive — Subnets, Routing, Firewalls, VPNs',
    slug: 'networking-deep-dive',
    description: 'The networking knowledge that separates a security professional from someone who just ran a tool. Subnetting, routing tables, firewall rules, and VPN internals.',
    topics: ['Subnetting', 'Routing and gateways', 'Firewall rule logic', 'NAT explained', 'VPN protocols', 'Network segmentation'],
  },
  {
    num: '16', phase: 3, color: phaseColors[3], status: 'live', readTime: '45 min',
    title: 'Linux Hardening — From Default to Secure',
    slug: 'linux-hardening',
    description: 'A default Linux install is full of attack surface. This module covers every hardening step — from SSH configuration to file permissions to service minimisation.',
    topics: ['SSH hardening', 'User and sudo config', 'File permissions audit', 'Service minimisation', 'Firewall setup', 'Audit logging'],
  },
  {
    num: '17', phase: 3, color: phaseColors[3], status: 'live', readTime: '50 min',
    title: 'Windows Security and Active Directory',
    slug: 'windows-active-directory',
    description: 'Most enterprise environments run on Windows and Active Directory. How AD works, how it is attacked (Kerberoasting, DCSync, Pass-the-Ticket), and how to defend it.',
    topics: ['Active Directory basics', 'Kerberos auth', 'Kerberoasting', 'Pass-the-Ticket', 'DCSync', 'AD hardening'],
  },
  {
    num: '18', phase: 3, color: phaseColors[3], status: 'live', readTime: '45 min',
    title: 'Cloud Security — Shared Responsibility and IAM Misconfiguration',
    slug: 'cloud-security',
    description: 'The shared responsibility model, the most common cloud attack patterns (S3 buckets, overpermissioned IAM roles, metadata service abuse), and how to fix them.',
    topics: ['Shared responsibility model', 'IAM misconfig', 'S3 exposure', 'SSRF to metadata', 'Cloud security posture', 'Least privilege'],
  },
  {
    num: '19', phase: 3, color: phaseColors[3], status: 'live', readTime: '45 min',
    title: 'API Security and Container Security',
    slug: 'api-container-security',
    description: 'Modern applications live in containers and communicate via APIs. Both are full of attack surface. Authentication, authorisation, and isolation for both.',
    topics: ['API auth patterns', 'OWASP API Top 10', 'JWT attacks', 'Container escape', 'Kubernetes RBAC', 'Image scanning'],
  },
  {
    num: '20', phase: 3, color: phaseColors[3], status: 'live', readTime: '50 min',
    title: 'Secure Coding — Building Software That Does Not Break Under Attack',
    slug: 'secure-coding',
    description: 'Input validation, parameterised queries, output encoding, secure defaults. The patterns that prevent the OWASP Top 10 from ever reaching a running application.',
    topics: ['Input validation', 'Parameterised queries', 'Output encoding', 'Secure defaults', 'Dependency management', 'Code review patterns'],
  },

  // ── Phase 4 — purple ─────────────────────────────────────────────────────
  {
    num: '21', phase: 4, color: phaseColors[4], status: 'live', readTime: '45 min',
    title: 'Penetration Testing — Methodology, Scoping, and Legal Framework',
    slug: 'penetration-testing-methodology',
    description: 'How professional pentesting works. The rules of engagement, scoping a test, the phases of an engagement, and the report that comes at the end.',
    topics: ['Rules of engagement', 'Scoping', 'Pentest phases', 'Types of pentests', 'Legal framework', 'Report writing'],
  },
  {
    num: '22', phase: 4, color: phaseColors[4], status: 'live', readTime: '50 min',
    title: 'Reconnaissance — OSINT and Footprinting',
    slug: 'reconnaissance-osint',
    description: 'Everything an attacker can learn before touching the target — from public sources alone. OSINT tools, WHOIS, certificate transparency, and passive recon.',
    topics: ['Passive recon', 'OSINT tools', 'WHOIS and DNS recon', 'Certificate transparency', 'Google dorking', 'Shodan'],
  },
  {
    num: '23', phase: 4, color: phaseColors[4], status: 'live', readTime: '45 min',
    title: 'Scanning and Enumeration',
    slug: 'scanning-enumeration',
    description: 'Active discovery — finding open ports, running services, and version numbers. nmap from basics to advanced, banner grabbing, and service fingerprinting.',
    topics: ['nmap fundamentals', 'Port scanning techniques', 'Service enumeration', 'OS fingerprinting', 'Web directory bruteforce', 'Stealth scanning'],
  },
  {
    num: '24', phase: 4, color: phaseColors[4], status: 'live', readTime: '55 min',
    title: 'Exploitation — Techniques, Payloads, and Common Vulnerabilities',
    slug: 'exploitation-techniques',
    description: 'How exploitation actually works — from identifying a vulnerable service to executing code. Buffer overflows, command injection, and exploitation frameworks.',
    topics: ['Exploitation concepts', 'Buffer overflows', 'Command injection', 'Metasploit basics', 'Payloads and shells', 'Avoiding detection'],
  },
  {
    num: '25', phase: 4, color: phaseColors[4], status: 'live', readTime: '60 min',
    title: 'Web Application Pentesting — SQL Injection to IDOR',
    slug: 'web-app-pentesting',
    description: 'Finding and exploiting web vulnerabilities in a structured way. Manual testing methodology, Burp Suite workflow, and the most impactful vulns to hunt first.',
    topics: ['Testing methodology', 'Burp Suite workflow', 'SQLi exploitation', 'XSS exploitation', 'IDOR hunting', 'Auth bypass'],
  },
  {
    num: '26', phase: 4, color: phaseColors[4], status: 'live', readTime: '55 min',
    title: 'Post-Exploitation — Privilege Escalation, Persistence, Lateral Movement',
    slug: 'post-exploitation',
    description: 'Getting in is only the start. What attackers do after initial access — escalating privileges, maintaining persistence, and moving across the network.',
    topics: ['PrivEsc Linux', 'PrivEsc Windows', 'Persistence mechanisms', 'Lateral movement', 'Credential harvesting', 'Covering tracks'],
  },
  {
    num: '27', phase: 4, color: phaseColors[4], status: 'live', readTime: '40 min',
    title: 'CTF Skills — Problem Types, Approach, and Getting Your First Flag',
    slug: 'ctf-skills',
    description: 'Capture the Flag competitions are how security people learn hands-on. The categories, the mindset, the tools, and a structured approach to your first CTF.',
    topics: ['CTF categories', 'Web challenges', 'Crypto challenges', 'Forensics', 'Reversing basics', 'CTF platforms'],
  },

  // ── Phase 5 — blue ───────────────────────────────────────────────────────
  {
    num: '28', phase: 5, color: phaseColors[5], status: 'live', readTime: '45 min',
    title: 'Security Architecture — Defense in Depth and Zero Trust',
    slug: 'security-architecture',
    description: 'How to design systems that are hard to attack. Defense in depth, network segmentation, Zero Trust architecture, and the principles behind every secure design.',
    topics: ['Defense in depth', 'Network segmentation', 'Zero Trust model', 'DMZ design', 'Secure architecture patterns', 'Threat modelling'],
  },
  {
    num: '29', phase: 5, color: phaseColors[5], status: 'live', readTime: '45 min',
    title: 'Identity and Access Management — MFA, RBAC, Privileged Access',
    slug: 'identity-access-management',
    description: 'Identity is the new perimeter. MFA, RBAC, PAM, SSO, OAuth 2.0, and SAML — the controls that determine who gets access to what, and how they are abused.',
    topics: ['MFA mechanics', 'RBAC and ABAC', 'PAM for privileged users', 'SSO and federation', 'OAuth 2.0', 'Identity attacks'],
  },
  {
    num: '30', phase: 5, color: phaseColors[5], status: 'live', readTime: '40 min',
    title: 'Firewalls, IDS, and IPS — How Detection Actually Works',
    slug: 'firewalls-ids-ips',
    description: 'The three layers of network-based defence. How firewalls decide to block, how IDS detects, how IPS responds, and how attackers evade all three.',
    topics: ['Firewall types', 'Stateful inspection', 'IDS vs IPS', 'Signature vs anomaly', 'Evasion techniques', 'NGFW capabilities'],
  },
  {
    num: '31', phase: 5, color: phaseColors[5], status: 'live', readTime: '50 min',
    title: 'SIEM and Log Analysis — Finding Attacks in the Noise',
    slug: 'siem-log-analysis',
    description: 'Security Information and Event Management — how logs from hundreds of systems become actionable alerts. Correlation rules, baseline behaviour, and hunting for anomalies.',
    topics: ['SIEM concepts', 'Log sources and normalisation', 'Correlation rules', 'Baseline and anomaly', 'Alert triage', 'Log analysis patterns'],
  },
  {
    num: '32', phase: 5, color: phaseColors[5], status: 'live', readTime: '40 min',
    title: 'Vulnerability Management — Scanning, Prioritisation, Remediation',
    slug: 'vulnerability-management',
    description: 'Finding vulnerabilities before attackers do. The scanning lifecycle, CVSS scoring, prioritisation by risk, and the remediation workflow that actually gets things fixed.',
    topics: ['Vulnerability scanning', 'CVSS scoring', 'Risk prioritisation', 'Remediation workflow', 'Patch management', 'Continuous scanning'],
  },
  {
    num: '33', phase: 5, color: phaseColors[5], status: 'live', readTime: '50 min',
    title: 'Incident Response — From Alert to Recovery',
    slug: 'incident-response',
    description: 'What happens when the breach has happened. The six phases of incident response, evidence preservation, containment strategies, and the post-incident review.',
    topics: ['IR phases', 'Detection and triage', 'Containment', 'Evidence preservation', 'Eradication', 'Recovery and PIR'],
  },
  {
    num: '34', phase: 5, color: phaseColors[5], status: 'live', readTime: '45 min',
    title: 'Threat Intelligence and Threat Hunting',
    slug: 'threat-intelligence-hunting',
    description: 'Going from reactive to proactive. Threat intelligence feeds, IOCs, TTPs, and how threat hunters actively look for attackers who have not triggered any alert.',
    topics: ['Threat intel types', 'IOCs and IOAs', 'Intel feeds', 'Hunting hypothesis', 'Hunting in logs', 'MITRE ATT&CK for hunting'],
  },

  // ── Phase 6 — yellow ─────────────────────────────────────────────────────
  {
    num: '35', phase: 6, color: phaseColors[6], status: 'live', readTime: '45 min',
    title: 'DevSecOps — Security Embedded in the Pipeline',
    slug: 'devsecops',
    description: 'Shifting security left — integrating SAST, DAST, dependency scanning, secrets detection, and container scanning into CI/CD pipelines before code reaches production.',
    topics: ['SAST and DAST', 'Dependency scanning', 'Secrets detection', 'Container scanning', 'Security gates in CI', 'Shift-left culture'],
  },
  {
    num: '36', phase: 6, color: phaseColors[6], status: 'live', readTime: '40 min',
    title: 'Compliance Frameworks — NIST, SOC 2, ISO 27001, PCI-DSS',
    slug: 'compliance-frameworks',
    description: 'The frameworks every US security team operates under. What each one requires, how they relate to each other, and what an audit actually looks like from the inside.',
    topics: ['NIST CSF', 'SOC 2 Type II', 'ISO 27001', 'PCI-DSS', 'HIPAA basics', 'Audit preparation'],
  },
  {
    num: '37', phase: 6, color: phaseColors[6], status: 'live', readTime: '35 min',
    title: 'Security Certifications — Which One to Get First',
    slug: 'security-certifications',
    description: 'CompTIA Security+, CEH, OSCP, CISSP, CISM, AWS Security — ranked by value for each career stage. What each cert covers, costs, and what doors it actually opens.',
    topics: ['Security+ overview', 'CEH vs OSCP', 'CISSP and CISM', 'Cloud security certs', 'Cert by career stage', 'Study strategy'],
  },
  {
    num: '38', phase: 6, color: phaseColors[6], status: 'live', readTime: '40 min',
    title: 'Bug Bounty Hunting — From Beginner to First Valid Report',
    slug: 'bug-bounty-hunting',
    description: 'How to find and report real vulnerabilities in real systems — legally and for money. Platform selection, methodology, the reports that get paid, and the ones that get closed.',
    topics: ['Platform selection', 'Scope understanding', 'Hunting methodology', 'Report writing', 'IDOR and logic bugs', 'Getting your first payout'],
  },
  {
    num: '39', phase: 6, color: phaseColors[6], status: 'live', readTime: '40 min',
    title: 'Building a Home Lab for Cybersecurity Practice',
    slug: 'home-lab-setup',
    description: 'A complete, free practice environment — virtualisation, intentionally vulnerable machines, network setup, and the practice path from beginner to intermediate.',
    topics: ['VirtualBox / VMware', 'Kali Linux setup', 'Metasploitable and DVWA', 'Network lab design', 'Practice path', 'TryHackMe and HackTheBox'],
  },
  {
    num: '40', phase: 6, color: phaseColors[6], status: 'live', readTime: '90 min',
    title: 'Interview Prep — 60 Complete Answers for Security Roles',
    slug: 'interview-prep-security',
    description: '60 complete interview answers across networking, cryptography, web security, pentesting, incident response, compliance, and behavioural — written at senior depth.',
    topics: ['Networking questions', 'Crypto questions', 'Web security', 'Pentesting Q&A', 'IR questions', 'Compliance', 'Behavioural'],
  },
]

export default function CybersecurityTrack() {
  const [activePhase, setActivePhase] = useState<PhaseFilter>('all')

  const filtered =
    activePhase === 'all'
      ? modules
      : modules.filter((m) => m.phase === parseInt(activePhase))

  const totalTopics  = modules.reduce((sum, m) => sum + m.topics.length, 0)
  const totalMinutes = modules.reduce((sum, m) => sum + parseInt(m.readTime), 0)
  const totalHours   = Math.round(totalMinutes / 60)

  return (
    <LearnLayout
      title="Cybersecurity"
      description="From zero to job-ready security engineer — 40 modules, no prerequisites"
      section="Cybersecurity"
      readTime="Self-paced"
      updatedAt="May 2026"
    >

      {/* ── Who This Is For ────────────────────────────────────────────── */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: 12,
        marginBottom: 40,
      }}>
        {[
          { icon: '🎓', label: 'Complete beginners — zero security knowledge required' },
          { icon: '💻', label: 'Developers who want to write secure code' },
          { icon: '🔴', label: 'Anyone preparing for red team or pentesting roles' },
          { icon: '🔵', label: 'Aspiring SOC analysts and security engineers' },
        ].map((item) => (
          <div key={item.label} style={{
            background: 'var(--surface)',
            border: '1px solid var(--border)',
            borderRadius: 10,
            padding: '14px 16px',
            display: 'flex',
            alignItems: 'center',
            gap: 10,
          }}>
            <span style={{ fontSize: 20 }}>{item.icon}</span>
            <span style={{ fontSize: 13, color: 'var(--text)', lineHeight: 1.5 }}>{item.label}</span>
          </div>
        ))}
      </div>

      {/* ── Stats bar ──────────────────────────────────────────────────── */}
      <div style={{
        display: 'flex',
        gap: 28,
        flexWrap: 'wrap',
        background: 'var(--surface)',
        border: '1px solid var(--border)',
        borderRadius: 12,
        padding: '20px 28px',
        marginBottom: 36,
      }}>
        {[
          { value: `${modules.length}`, label: 'Modules'        },
          { value: '6',                 label: 'Phases'          },
          { value: `${totalTopics}+`,   label: 'Topics covered'  },
          { value: `${totalHours}h`,    label: 'Total content'   },
          { value: '100%',              label: 'Free forever'    },
        ].map((s) => (
          <div key={s.label}>
            <div style={{
              fontSize: 24, fontWeight: 900,
              color: '#ff4757', fontFamily: 'var(--font-display)',
            }}>
              {s.value}
            </div>
            <div style={{ fontSize: 12, color: 'var(--muted)', marginTop: 2 }}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* ── Red team + Blue team note ──────────────────────────────────── */}
      <div style={{
        background: 'rgba(255,71,87,0.06)',
        border: '1px solid rgba(255,71,87,0.2)',
        borderRadius: 10,
        padding: '16px 20px',
        marginBottom: 40,
        fontSize: 14,
        color: 'var(--text)',
        lineHeight: 1.7,
      }}>
        <strong style={{ color: '#ff4757' }}>Both sides. Full spectrum.</strong>{' '}
        This track covers how attacks work (red team) and how defences are built (blue team).
        The best security engineers understand both — defenders who think like attackers catch
        what tools miss. Phases 2–4 are attacker perspective. Phases 5–6 are defender perspective.
      </div>

      {/* ── Curriculum heading + phase filter ─────────────────────────── */}
      <div style={{ marginTop: 48, marginBottom: 8 }}>
        <div style={{
          fontSize: 10, fontWeight: 700, letterSpacing: '.12em',
          textTransform: 'uppercase', color: 'var(--muted)',
          fontFamily: 'var(--font-mono)', marginBottom: 10,
        }}>
          // Curriculum
        </div>

        <div style={{
          display: 'flex', justifyContent: 'space-between',
          alignItems: 'flex-end', flexWrap: 'wrap', gap: 16, marginBottom: 6,
        }}>
          <div>
            <h2 style={{
              fontSize: 'clamp(20px, 2.5vw, 28px)', fontWeight: 900,
              letterSpacing: '-1px', color: 'var(--text)',
              fontFamily: 'var(--font-display)', marginBottom: 6,
            }}>
              40 Modules. Zero to Job-Ready.
            </h2>
            <p style={{ fontSize: 14, color: 'var(--muted)', lineHeight: 1.7, maxWidth: 520, margin: 0 }}>
              Follow in order. Each module builds on the last. Attack patterns before
              defence. Concepts before tools. Every idea earned before the next one.
            </p>
          </div>

          {/* Phase filter tabs */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
            {(['all', '1', '2', '3', '4', '5', '6'] as PhaseFilter[]).map((f) => {
              const col = f === 'all' ? '#ff4757' : phaseColors[parseInt(f)]
              const isActive = activePhase === f
              return (
                <button
                  key={f}
                  onClick={() => setActivePhase(f)}
                  style={{
                    fontSize: 11, fontWeight: 700, fontFamily: 'var(--font-mono)',
                    letterSpacing: '.08em', textTransform: 'uppercase',
                    padding: '6px 12px', borderRadius: 8, cursor: 'pointer',
                    border: isActive ? `1px solid ${col}` : '1px solid var(--border)',
                    background: isActive ? `${col}18` : 'var(--surface)',
                    color: isActive ? col : 'var(--muted)',
                    transition: 'all 0.15s',
                  }}
                >
                  {f === 'all' ? 'All' : `P${f}`}
                </button>
              )
            })}
          </div>
        </div>
      </div>

      {/* ── Module Cards ───────────────────────────────────────────────── */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginTop: 28 }}>
        {filtered.map((mod, idx) => {
          const isLive = mod.status === 'live'
          const href   = isLive ? `/learn/cybersecurity/${mod.slug}` : '#'

          return (
            <div key={mod.num}>

              {/* Phase section header — 'all' view only */}
              {activePhase === 'all' && (idx === 0 || filtered[idx - 1].phase !== mod.phase) && (
                <div style={{
                  display: 'flex', alignItems: 'center', gap: 10,
                  padding: idx === 0 ? '16px 0 10px' : '28px 0 10px',
                }}>
                  <div style={{
                    width: 26, height: 26, borderRadius: '50%', flexShrink: 0,
                    background: `${mod.color}18`, border: `1px solid ${mod.color}44`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: 11, fontWeight: 900, color: mod.color,
                    fontFamily: 'var(--font-mono)',
                  }}>
                    {mod.phase}
                  </div>
                  <span style={{
                    fontSize: 11, fontWeight: 700, color: mod.color,
                    fontFamily: 'var(--font-mono)', letterSpacing: '.1em',
                    textTransform: 'uppercase',
                  }}>
                    Phase {mod.phase} — {phaseInfo[mod.phase - 1].title}
                  </span>
                </div>
              )}

              {/* Card */}
              <div style={{
                background: 'var(--surface)',
                border: '1px solid var(--border)',
                borderRadius: 12,
                overflow: 'hidden',
                opacity: isLive ? 1 : 0.88,
                transition: 'border-color 0.2s',
              }}>
                {/* Colored top accent bar */}
                <div style={{ height: 3, background: mod.color, opacity: 0.75 }} />

                <div style={{ padding: '20px 24px' }}>
                  <div style={{
                    display: 'flex', alignItems: 'flex-start',
                    justifyContent: 'space-between', gap: 16, flexWrap: 'wrap',
                  }}>

                    {/* Left */}
                    <div style={{ flex: 1, minWidth: 240 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
                        <span style={{
                          fontFamily: 'var(--font-mono)', fontSize: 11, fontWeight: 700,
                          color: mod.color,
                          background: `${mod.color}18`,
                          border: `1px solid ${mod.color}33`,
                          borderRadius: 6, padding: '3px 8px',
                        }}>
                          MODULE {mod.num}
                        </span>
                        {isLive ? (
                          <span style={{
                            fontSize: 10, fontWeight: 700, color: 'var(--green)',
                            background: 'rgba(0,230,118,0.12)',
                            border: '1px solid rgba(0,230,118,0.3)',
                            borderRadius: 20, padding: '2px 10px', letterSpacing: '.08em',
                          }}>
                            ✓ LIVE
                          </span>
                        ) : (
                          <span style={{
                            fontSize: 10, fontWeight: 600, color: 'var(--muted)',
                            background: 'var(--bg2)', border: '1px solid var(--border)',
                            borderRadius: 20, padding: '2px 10px', letterSpacing: '.08em',
                          }}>
                            COMING SOON
                          </span>
                        )}
                      </div>

                      <h3 style={{
                        fontSize: 17, fontWeight: 800, color: 'var(--text)',
                        fontFamily: 'var(--font-display)', marginBottom: 6,
                        letterSpacing: '-0.4px', lineHeight: 1.3,
                      }}>
                        {mod.title}
                      </h3>

                      <p style={{
                        fontSize: 13, color: 'var(--muted)', lineHeight: 1.65,
                        marginBottom: 14, maxWidth: 560,
                      }}>
                        {mod.description}
                      </p>

                      {/* Topic pills */}
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                        {mod.topics.map((topic) => (
                          <span key={topic} style={{
                            fontSize: 11, color: 'var(--muted)',
                            background: 'var(--bg2)', border: '1px solid var(--border)',
                            borderRadius: 20, padding: '3px 10px',
                            fontFamily: 'var(--font-mono)',
                          }}>
                            {topic}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Right — read time + CTA */}
                    <div style={{
                      display: 'flex', flexDirection: 'column',
                      alignItems: 'flex-end', gap: 12, paddingTop: 4,
                    }}>
                      <div style={{ textAlign: 'right' }}>
                        <div style={{
                          fontSize: 18, fontWeight: 800, color: 'var(--text)',
                          fontFamily: 'var(--font-display)',
                        }}>
                          {mod.readTime}
                        </div>
                        <div style={{ fontSize: 11, color: 'var(--muted)' }}>read time</div>
                      </div>

                      {isLive ? (
                        <Link href={href} style={{
                          display: 'inline-block',
                          background: mod.color,
                          color: '#000',
                          fontSize: 12, fontWeight: 700,
                          borderRadius: 8, padding: '8px 18px',
                          textDecoration: 'none',
                          letterSpacing: '.04em', whiteSpace: 'nowrap',
                        }}>
                          Start →
                        </Link>
                      ) : (
                        <span style={{
                          display: 'inline-block',
                          background: 'var(--bg2)', color: 'var(--muted)',
                          fontSize: 12, fontWeight: 600,
                          borderRadius: 8, padding: '8px 18px',
                          letterSpacing: '.04em', cursor: 'not-allowed',
                          border: '1px solid var(--border)', whiteSpace: 'nowrap',
                        }}>
                          Soon
                        </span>
                      )}
                    </div>

                  </div>
                </div>
              </div>

            </div>
          )
        })}
      </div>

      {/* ── Bottom CTA ─────────────────────────────────────────────────── */}
      <div style={{
        marginTop: 56,
        background: 'linear-gradient(135deg, rgba(255,71,87,0.06) 0%, rgba(123,97,255,0.06) 100%)',
        border: '1px solid var(--border)',
        borderRadius: 14,
        padding: '36px 32px',
        textAlign: 'center',
      }}>
        <div style={{
          fontSize: 10, fontWeight: 700, letterSpacing: '.12em',
          textTransform: 'uppercase', color: '#ff4757',
          fontFamily: 'var(--font-mono)', marginBottom: 14,
        }}>
          // Ready to start?
        </div>
        <h3 style={{
          fontSize: 'clamp(18px, 2.5vw, 26px)', fontWeight: 900,
          color: 'var(--text)', fontFamily: 'var(--font-display)',
          letterSpacing: '-1px', marginBottom: 12,
        }}>
          Start with Module 01. Build from zero.
        </h3>
        <p style={{
          fontSize: 14, color: 'var(--muted)', lineHeight: 1.7,
          maxWidth: 480, margin: '0 auto 24px',
        }}>
          No security background needed. Each module assumes only the previous one.
          The attacker perspective comes first — because defenders who understand attacks
          are the ones who actually stop them.
        </p>
        <Link href="/learn/cybersecurity/what-is-cybersecurity" style={{
          display: 'inline-block', background: '#ff4757',
          color: '#fff', fontWeight: 700, fontSize: 13,
          borderRadius: 8, padding: '10px 24px', textDecoration: 'none',
        }}>
          Start Module 01 →
        </Link>
      </div>

    </LearnLayout>
  )
}
