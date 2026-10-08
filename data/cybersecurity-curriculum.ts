export interface CyberModule {
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

export const CYBER_PHASE_COLORS: Record<number, string> = {
  1: '#00e676',
  2: '#ff4757',
  3: '#f97316',
  4: '#7b61ff',
  5: '#4285f4',
  6: '#facc15',
}

export const CYBER_PHASES = [
  { id: 1, title: 'What Even Is This?'        },
  { id: 2, title: 'How Attacks Work'           },
  { id: 3, title: 'Core Technical Skills'      },
  { id: 4, title: 'Offensive Security'         },
  { id: 5, title: 'Defensive Security'         },
  { id: 6, title: 'Career & Production'        },
]

export const CYBER_MODULES: CyberModule[] = [
  // ── Phase 1 — green ──────────────────────────────────────────────────────
  {
    num: '01', phase: 1, color: CYBER_PHASE_COLORS[1], status: 'live', readTime: '25 min',
    title: 'What is Cybersecurity?',
    slug: 'what-is-cybersecurity',
    description: 'The threat landscape, the roles, and why this field exists. What attackers actually want and how defenders think. The clearest possible starting point.',
    topics: ['Threat landscape', 'Attackers vs defenders', 'Why security matters', 'The field mapped'],
  },
  {
    num: '02', phase: 1, color: CYBER_PHASE_COLORS[1], status: 'live', readTime: '40 min',
    title: 'How the Internet Works — A Security Engineer\'s View',
    slug: 'how-the-internet-works',
    description: 'TCP/IP, DNS, HTTP, TLS — explained from the security angle. Every layer hides attack surfaces. This module shows you where they are and why they exist.',
    topics: ['TCP/IP model', 'DNS explained', 'HTTP and HTTPS', 'TLS handshake', 'Attack surfaces per layer'],
  },
  {
    num: '03', phase: 1, color: CYBER_PHASE_COLORS[1], status: 'live', readTime: '45 min',
    title: 'Linux for Security Engineers',
    slug: 'linux-for-security',
    description: 'The operating system every hacker and every defender lives in. File permissions, processes, users, logs, and the commands you will use every single day.',
    topics: ['File permissions', 'Users and groups', 'Processes and signals', 'Log files', 'Essential commands'],
  },
  {
    num: '04', phase: 1, color: CYBER_PHASE_COLORS[1], status: 'live', readTime: '50 min',
    title: 'Cryptography From Scratch',
    slug: 'cryptography-fundamentals',
    description: 'How encryption actually works — symmetric, asymmetric, hashing, digital signatures. Not math proofs — practical understanding of what protects data and what breaks it.',
    topics: ['Symmetric encryption', 'Asymmetric (public key)', 'Hashing', 'Digital signatures', 'TLS internals', 'Common attacks'],
  },
  {
    num: '05', phase: 1, color: CYBER_PHASE_COLORS[1], status: 'live', readTime: '30 min',
    title: 'The CIA Triad and Security Models',
    slug: 'cia-triad-security-models',
    description: 'The three properties every security decision protects or trades off: Confidentiality, Integrity, Availability. The frameworks built around them.',
    topics: ['Confidentiality', 'Integrity', 'Availability', 'Security models', 'Trade-offs in design'],
  },
  {
    num: '06', phase: 1, color: CYBER_PHASE_COLORS[1], status: 'live', readTime: '35 min',
    title: 'Cybersecurity Career Paths and the US Job Market (2026)',
    slug: 'cybersecurity-careers-us',
    description: 'Every security role mapped — SOC analyst to CISO. Real US salary data, top hiring companies, the certifications that actually matter, and how to break in.',
    topics: ['Role map', 'US salaries by role', 'Top hiring companies', 'Certifications ranked', 'Breaking in'],
  },

  // ── Phase 2 — red ────────────────────────────────────────────────────────
  {
    num: '07', phase: 2, color: CYBER_PHASE_COLORS[2], status: 'live', readTime: '40 min',
    title: 'How Attackers Think — The Kill Chain and MITRE ATT&CK',
    slug: 'attacker-mindset-kill-chain',
    description: 'The attacker\'s playbook from first reconnaissance to full compromise. MITRE ATT&CK explained. Understanding this framework is what makes defenders effective.',
    topics: ['Cyber Kill Chain', 'MITRE ATT&CK', 'Attack lifecycle', 'TTPs explained', 'Defender implications'],
  },
  {
    num: '08', phase: 2, color: CYBER_PHASE_COLORS[2], status: 'live', readTime: '35 min',
    title: 'Social Engineering and Phishing',
    slug: 'social-engineering-phishing',
    description: 'The most successful attack vector in history requires zero technical skill. How social engineering works, why humans are the hardest vulnerability to patch.',
    topics: ['Phishing types', 'Spear phishing', 'Vishing and smishing', 'Pretexting', 'Defense strategies'],
  },
  {
    num: '09', phase: 2, color: CYBER_PHASE_COLORS[2], status: 'live', readTime: '60 min',
    title: 'Web Application Attacks — OWASP Top 10 From First Principles',
    slug: 'web-attacks-owasp',
    description: 'SQL injection, XSS, SSRF, IDOR, broken auth — every OWASP Top 10 vulnerability explained from scratch with real attack examples and why they exist.',
    topics: ['SQL injection', 'XSS', 'SSRF', 'IDOR', 'Broken auth', 'Security misconfig', 'OWASP Top 10'],
  },
  {
    num: '10', phase: 2, color: CYBER_PHASE_COLORS[2], status: 'live', readTime: '45 min',
    title: 'Network Attacks — MITM, Sniffing, ARP Poisoning, DNS Hijacking',
    slug: 'network-attacks',
    description: 'How attackers position themselves between you and the internet. The mechanics of interception, spoofing, and protocol-level abuse at the network layer.',
    topics: ['MITM explained', 'ARP poisoning', 'DNS hijacking', 'Sniffing packets', 'SSL stripping'],
  },
  {
    num: '11', phase: 2, color: CYBER_PHASE_COLORS[2], status: 'live', readTime: '40 min',
    title: 'Malware — Types, Behavior, and How It Spreads',
    slug: 'malware-types-behavior',
    description: 'Viruses, worms, ransomware, rootkits, spyware, RATs — what each one does differently, how they spread, and what defenders look for to detect them.',
    topics: ['Malware taxonomy', 'Ransomware mechanics', 'Rootkits', 'RATs', 'Command & control', 'Detection evasion'],
  },
  {
    num: '12', phase: 2, color: CYBER_PHASE_COLORS[2], status: 'live', readTime: '45 min',
    title: 'Authentication Attacks — Credential Theft, Brute Force, Pass-the-Hash',
    slug: 'authentication-attacks',
    description: 'How attackers steal, crack, and replay credentials. Password hashing, rainbow tables, credential stuffing, and pass-the-hash — from the attacker\'s perspective.',
    topics: ['Password cracking', 'Credential stuffing', 'Pass-the-hash', 'Token theft', 'MFA bypass', 'Defense patterns'],
  },
  {
    num: '13', phase: 2, color: CYBER_PHASE_COLORS[2], status: 'live', readTime: '35 min',
    title: 'Vulnerabilities and Exploits — CVEs, Zero-Days, and Patch Management',
    slug: 'vulnerabilities-and-exploits',
    description: 'What a vulnerability is, how exploits are built, how CVEs work, and what zero-days mean in practice. The lifecycle from discovery to patch to exploitation.',
    topics: ['CVE system', 'CVSS scoring', 'Zero-days', 'Exploit development basics', 'Patch lifecycle', 'Responsible disclosure'],
  },

  // ── Phase 3 — orange ─────────────────────────────────────────────────────
  {
    num: '14', phase: 3, color: CYBER_PHASE_COLORS[3], status: 'live', readTime: '55 min',
    title: 'Python for Security Engineers',
    slug: 'python-for-security',
    description: 'Not Python basics — Python for security. Port scanners, log parsers, hash crackers, API fuzzers, and the scripts every security engineer actually runs.',
    topics: ['Socket programming', 'Port scanning', 'Log parsing', 'Hash cracking', 'HTTP fuzzing', 'Automation scripts'],
  },
  {
    num: '15', phase: 3, color: CYBER_PHASE_COLORS[3], status: 'live', readTime: '50 min',
    title: 'Networking Deep Dive — Subnets, Routing, Firewalls, VPNs',
    slug: 'networking-deep-dive',
    description: 'The networking knowledge that separates a security professional from someone who just ran a tool. Subnetting, routing tables, firewall rules, and VPN internals.',
    topics: ['Subnetting', 'Routing and gateways', 'Firewall rule logic', 'NAT explained', 'VPN protocols', 'Network segmentation'],
  },
  {
    num: '16', phase: 3, color: CYBER_PHASE_COLORS[3], status: 'live', readTime: '45 min',
    title: 'Linux Hardening — From Default to Secure',
    slug: 'linux-hardening',
    description: 'A default Linux install is full of attack surface. This module covers every hardening step — from SSH configuration to file permissions to service minimisation.',
    topics: ['SSH hardening', 'User and sudo config', 'File permissions audit', 'Service minimisation', 'Firewall setup', 'Audit logging'],
  },
  {
    num: '17', phase: 3, color: CYBER_PHASE_COLORS[3], status: 'live', readTime: '50 min',
    title: 'Windows Security and Active Directory',
    slug: 'windows-active-directory',
    description: 'Most enterprise environments run on Windows and Active Directory. How AD works, how it is attacked (Kerberoasting, DCSync, Pass-the-Ticket), and how to defend it.',
    topics: ['Active Directory basics', 'Kerberos auth', 'Kerberoasting', 'Pass-the-Ticket', 'DCSync', 'AD hardening'],
  },
  {
    num: '18', phase: 3, color: CYBER_PHASE_COLORS[3], status: 'live', readTime: '45 min',
    title: 'Cloud Security — Shared Responsibility and IAM Misconfiguration',
    slug: 'cloud-security',
    description: 'The shared responsibility model, the most common cloud attack patterns (S3 buckets, overpermissioned IAM roles, metadata service abuse), and how to fix them.',
    topics: ['Shared responsibility model', 'IAM misconfig', 'S3 exposure', 'SSRF to metadata', 'Cloud security posture', 'Least privilege'],
  },
  {
    num: '19', phase: 3, color: CYBER_PHASE_COLORS[3], status: 'live', readTime: '45 min',
    title: 'API Security and Container Security',
    slug: 'api-container-security',
    description: 'Modern applications live in containers and communicate via APIs. Both are full of attack surface. Authentication, authorisation, and isolation for both.',
    topics: ['API auth patterns', 'OWASP API Top 10', 'JWT attacks', 'Container escape', 'Kubernetes RBAC', 'Image scanning'],
  },
  {
    num: '20', phase: 3, color: CYBER_PHASE_COLORS[3], status: 'live', readTime: '50 min',
    title: 'Secure Coding — Building Software That Does Not Break Under Attack',
    slug: 'secure-coding',
    description: 'Input validation, parameterised queries, output encoding, secure defaults. The patterns that prevent the OWASP Top 10 from ever reaching a running application.',
    topics: ['Input validation', 'Parameterised queries', 'Output encoding', 'Secure defaults', 'Dependency management', 'Code review patterns'],
  },

  // ── Phase 4 — purple ─────────────────────────────────────────────────────
  {
    num: '21', phase: 4, color: CYBER_PHASE_COLORS[4], status: 'live', readTime: '45 min',
    title: 'Penetration Testing — Methodology, Scoping, and Legal Framework',
    slug: 'penetration-testing-methodology',
    description: 'How professional pentesting works. The rules of engagement, scoping a test, the phases of an engagement, and the report that comes at the end.',
    topics: ['Rules of engagement', 'Scoping', 'Pentest phases', 'Types of pentests', 'Legal framework', 'Report writing'],
  },
  {
    num: '22', phase: 4, color: CYBER_PHASE_COLORS[4], status: 'live', readTime: '50 min',
    title: 'Reconnaissance — OSINT and Footprinting',
    slug: 'reconnaissance-osint',
    description: 'Everything an attacker can learn before touching the target — from public sources alone. OSINT tools, WHOIS, certificate transparency, and passive recon.',
    topics: ['Passive recon', 'OSINT tools', 'WHOIS and DNS recon', 'Certificate transparency', 'Google dorking', 'Shodan'],
  },
  {
    num: '23', phase: 4, color: CYBER_PHASE_COLORS[4], status: 'live', readTime: '45 min',
    title: 'Scanning and Enumeration',
    slug: 'scanning-enumeration',
    description: 'Active discovery — finding open ports, running services, and version numbers. nmap from basics to advanced, banner grabbing, and service fingerprinting.',
    topics: ['nmap fundamentals', 'Port scanning techniques', 'Service enumeration', 'OS fingerprinting', 'Web directory bruteforce', 'Stealth scanning'],
  },
  {
    num: '24', phase: 4, color: CYBER_PHASE_COLORS[4], status: 'live', readTime: '55 min',
    title: 'Exploitation — Techniques, Payloads, and Common Vulnerabilities',
    slug: 'exploitation-techniques',
    description: 'How exploitation actually works — from identifying a vulnerable service to executing code. Buffer overflows, command injection, and exploitation frameworks.',
    topics: ['Exploitation concepts', 'Buffer overflows', 'Command injection', 'Metasploit basics', 'Payloads and shells', 'Avoiding detection'],
  },
  {
    num: '25', phase: 4, color: CYBER_PHASE_COLORS[4], status: 'live', readTime: '60 min',
    title: 'Web Application Pentesting — SQL Injection to IDOR',
    slug: 'web-app-pentesting',
    description: 'Finding and exploiting web vulnerabilities in a structured way. Manual testing methodology, Burp Suite workflow, and the most impactful vulns to hunt first.',
    topics: ['Testing methodology', 'Burp Suite workflow', 'SQLi exploitation', 'XSS exploitation', 'IDOR hunting', 'Auth bypass'],
  },
  {
    num: '26', phase: 4, color: CYBER_PHASE_COLORS[4], status: 'live', readTime: '55 min',
    title: 'Post-Exploitation — Privilege Escalation, Persistence, Lateral Movement',
    slug: 'post-exploitation',
    description: 'Getting in is only the start. What attackers do after initial access — escalating privileges, maintaining persistence, and moving across the network.',
    topics: ['PrivEsc Linux', 'PrivEsc Windows', 'Persistence mechanisms', 'Lateral movement', 'Credential harvesting', 'Covering tracks'],
  },
  {
    num: '27', phase: 4, color: CYBER_PHASE_COLORS[4], status: 'live', readTime: '40 min',
    title: 'CTF Skills — Problem Types, Approach, and Getting Your First Flag',
    slug: 'ctf-skills',
    description: 'Capture the Flag competitions are how security people learn hands-on. The categories, the mindset, the tools, and a structured approach to your first CTF.',
    topics: ['CTF categories', 'Web challenges', 'Crypto challenges', 'Forensics', 'Reversing basics', 'CTF platforms'],
  },

  // ── Phase 5 — blue ───────────────────────────────────────────────────────
  {
    num: '28', phase: 5, color: CYBER_PHASE_COLORS[5], status: 'live', readTime: '45 min',
    title: 'Security Architecture — Defense in Depth and Zero Trust',
    slug: 'security-architecture',
    description: 'How to design systems that are hard to attack. Defense in depth, network segmentation, Zero Trust architecture, and the principles behind every secure design.',
    topics: ['Defense in depth', 'Network segmentation', 'Zero Trust model', 'DMZ design', 'Secure architecture patterns', 'Threat modelling'],
  },
  {
    num: '29', phase: 5, color: CYBER_PHASE_COLORS[5], status: 'live', readTime: '45 min',
    title: 'Identity and Access Management — MFA, RBAC, Privileged Access',
    slug: 'identity-access-management',
    description: 'Identity is the new perimeter. MFA, RBAC, PAM, SSO, OAuth 2.0, and SAML — the controls that determine who gets access to what, and how they are abused.',
    topics: ['MFA mechanics', 'RBAC and ABAC', 'PAM for privileged users', 'SSO and federation', 'OAuth 2.0', 'Identity attacks'],
  },
  {
    num: '30', phase: 5, color: CYBER_PHASE_COLORS[5], status: 'live', readTime: '40 min',
    title: 'Firewalls, IDS, and IPS — How Detection Actually Works',
    slug: 'firewalls-ids-ips',
    description: 'The three layers of network-based defence. How firewalls decide to block, how IDS detects, how IPS responds, and how attackers evade all three.',
    topics: ['Firewall types', 'Stateful inspection', 'IDS vs IPS', 'Signature vs anomaly', 'Evasion techniques', 'NGFW capabilities'],
  },
  {
    num: '31', phase: 5, color: CYBER_PHASE_COLORS[5], status: 'live', readTime: '50 min',
    title: 'SIEM and Log Analysis — Finding Attacks in the Noise',
    slug: 'siem-log-analysis',
    description: 'Security Information and Event Management — how logs from hundreds of systems become actionable alerts. Correlation rules, baseline behaviour, and hunting for anomalies.',
    topics: ['SIEM concepts', 'Log sources and normalisation', 'Correlation rules', 'Baseline and anomaly', 'Alert triage', 'Log analysis patterns'],
  },
  {
    num: '32', phase: 5, color: CYBER_PHASE_COLORS[5], status: 'live', readTime: '40 min',
    title: 'Vulnerability Management — Scanning, Prioritisation, Remediation',
    slug: 'vulnerability-management',
    description: 'Finding vulnerabilities before attackers do. The scanning lifecycle, CVSS scoring, prioritisation by risk, and the remediation workflow that actually gets things fixed.',
    topics: ['Vulnerability scanning', 'CVSS scoring', 'Risk prioritisation', 'Remediation workflow', 'Patch management', 'Continuous scanning'],
  },
  {
    num: '33', phase: 5, color: CYBER_PHASE_COLORS[5], status: 'live', readTime: '50 min',
    title: 'Incident Response — From Alert to Recovery',
    slug: 'incident-response',
    description: 'What happens when the breach has happened. The six phases of incident response, evidence preservation, containment strategies, and the post-incident review.',
    topics: ['IR phases', 'Detection and triage', 'Containment', 'Evidence preservation', 'Eradication', 'Recovery and PIR'],
  },
  {
    num: '34', phase: 5, color: CYBER_PHASE_COLORS[5], status: 'live', readTime: '45 min',
    title: 'Threat Intelligence and Threat Hunting',
    slug: 'threat-intelligence-hunting',
    description: 'Going from reactive to proactive. Threat intelligence feeds, IOCs, TTPs, and how threat hunters actively look for attackers who have not triggered any alert.',
    topics: ['Threat intel types', 'IOCs and IOAs', 'Intel feeds', 'Hunting hypothesis', 'Hunting in logs', 'MITRE ATT&CK for hunting'],
  },

  // ── Phase 6 — yellow ─────────────────────────────────────────────────────
  {
    num: '35', phase: 6, color: CYBER_PHASE_COLORS[6], status: 'live', readTime: '45 min',
    title: 'DevSecOps — Security Embedded in the Pipeline',
    slug: 'devsecops',
    description: 'Shifting security left — integrating SAST, DAST, dependency scanning, secrets detection, and container scanning into CI/CD pipelines before code reaches production.',
    topics: ['SAST and DAST', 'Dependency scanning', 'Secrets detection', 'Container scanning', 'Security gates in CI', 'Shift-left culture'],
  },
  {
    num: '36', phase: 6, color: CYBER_PHASE_COLORS[6], status: 'live', readTime: '40 min',
    title: 'Compliance Frameworks — NIST, SOC 2, ISO 27001, PCI-DSS',
    slug: 'compliance-frameworks',
    description: 'The frameworks every US security team operates under. What each one requires, how they relate to each other, and what an audit actually looks like from the inside.',
    topics: ['NIST CSF', 'SOC 2 Type II', 'ISO 27001', 'PCI-DSS', 'HIPAA basics', 'Audit preparation'],
  },
  {
    num: '37', phase: 6, color: CYBER_PHASE_COLORS[6], status: 'live', readTime: '35 min',
    title: 'Security Certifications — Which One to Get First',
    slug: 'security-certifications',
    description: 'CompTIA Security+, CEH, OSCP, CISSP, CISM, AWS Security — ranked by value for each career stage. What each cert covers, costs, and what doors it actually opens.',
    topics: ['Security+ overview', 'CEH vs OSCP', 'CISSP and CISM', 'Cloud security certs', 'Cert by career stage', 'Study strategy'],
  },
  {
    num: '38', phase: 6, color: CYBER_PHASE_COLORS[6], status: 'live', readTime: '40 min',
    title: 'Bug Bounty Hunting — From Beginner to First Valid Report',
    slug: 'bug-bounty-hunting',
    description: 'How to find and report real vulnerabilities in real systems — legally and for money. Platform selection, methodology, the reports that get paid, and the ones that get closed.',
    topics: ['Platform selection', 'Scope understanding', 'Hunting methodology', 'Report writing', 'IDOR and logic bugs', 'Getting your first payout'],
  },
  {
    num: '39', phase: 6, color: CYBER_PHASE_COLORS[6], status: 'live', readTime: '40 min',
    title: 'Building a Home Lab for Cybersecurity Practice',
    slug: 'home-lab-setup',
    description: 'A complete, free practice environment — virtualisation, intentionally vulnerable machines, network setup, and the practice path from beginner to intermediate.',
    topics: ['VirtualBox / VMware', 'Kali Linux setup', 'Metasploitable and DVWA', 'Network lab design', 'Practice path', 'TryHackMe and HackTheBox'],
  },
  {
    num: '40', phase: 6, color: CYBER_PHASE_COLORS[6], status: 'live', readTime: '90 min',
    title: 'Interview Prep — 60 Complete Answers for Security Roles',
    slug: 'interview-prep-security',
    description: '60 complete interview answers across networking, cryptography, web security, pentesting, incident response, compliance, and behavioural — written at senior depth.',
    topics: ['Networking questions', 'Crypto questions', 'Web security', 'Pentesting Q&A', 'IR questions', 'Compliance', 'Behavioural'],
  },
]
