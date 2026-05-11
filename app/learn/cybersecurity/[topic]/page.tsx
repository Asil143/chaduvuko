import { notFound } from 'next/navigation';
import type { Metadata } from 'next';

const moduleMap: Record<string, () => Promise<{ default: React.ComponentType }>> = {
  'what-is-cybersecurity':          () => import('@/content/cybersecurity/what-is-cybersecurity'),
  'how-the-internet-works':         () => import('@/content/cybersecurity/how-the-internet-works'),
  'linux-for-security':             () => import('@/content/cybersecurity/linux-for-security'),
  'cryptography-fundamentals':      () => import('@/content/cybersecurity/cryptography-fundamentals'),
  'cia-triad-security-models':      () => import('@/content/cybersecurity/cia-triad-security-models'),
  'cybersecurity-careers-us':       () => import('@/content/cybersecurity/cybersecurity-careers-us'),
  'attacker-mindset-kill-chain':    () => import('@/content/cybersecurity/attacker-mindset-kill-chain'),
  'social-engineering-phishing':    () => import('@/content/cybersecurity/social-engineering-phishing'),
  'web-attacks-owasp':              () => import('@/content/cybersecurity/web-attacks-owasp'),
  'network-attacks':                () => import('@/content/cybersecurity/network-attacks'),
  'malware-types-behavior':         () => import('@/content/cybersecurity/malware-types-behavior'),
  'authentication-attacks':         () => import('@/content/cybersecurity/authentication-attacks'),
  'vulnerabilities-and-exploits':   () => import('@/content/cybersecurity/vulnerabilities-and-exploits'),
  'python-for-security':            () => import('@/content/cybersecurity/python-for-security'),
  'networking-deep-dive':           () => import('@/content/cybersecurity/networking-deep-dive'),
  'linux-hardening':                () => import('@/content/cybersecurity/linux-hardening'),
  'windows-active-directory':       () => import('@/content/cybersecurity/windows-active-directory'),
  'cloud-security':                 () => import('@/content/cybersecurity/cloud-security'),
  'api-container-security':         () => import('@/content/cybersecurity/api-container-security'),
  'secure-coding':                  () => import('@/content/cybersecurity/secure-coding'),
  'penetration-testing-methodology':() => import('@/content/cybersecurity/penetration-testing-methodology'),
  'reconnaissance-osint':           () => import('@/content/cybersecurity/reconnaissance-osint'),
  'scanning-enumeration':           () => import('@/content/cybersecurity/scanning-enumeration'),
  'exploitation-techniques':        () => import('@/content/cybersecurity/exploitation-techniques'),
  'web-app-pentesting':             () => import('@/content/cybersecurity/web-app-pentesting'),
  'post-exploitation':              () => import('@/content/cybersecurity/post-exploitation'),
  'ctf-skills':                     () => import('@/content/cybersecurity/ctf-skills'),
  'security-architecture':          () => import('@/content/cybersecurity/security-architecture'),
  'identity-access-management':     () => import('@/content/cybersecurity/identity-access-management'),
  'firewalls-ids-ips':              () => import('@/content/cybersecurity/firewalls-ids-ips'),
  'siem-log-analysis':              () => import('@/content/cybersecurity/siem-log-analysis'),
  'vulnerability-management':       () => import('@/content/cybersecurity/vulnerability-management'),
  'incident-response':              () => import('@/content/cybersecurity/incident-response'),
  'threat-intelligence-hunting':    () => import('@/content/cybersecurity/threat-intelligence-hunting'),
  'devsecops':                      () => import('@/content/cybersecurity/devsecops'),
  'compliance-frameworks':          () => import('@/content/cybersecurity/compliance-frameworks'),
  'security-certifications':        () => import('@/content/cybersecurity/security-certifications'),
  'bug-bounty-hunting':             () => import('@/content/cybersecurity/bug-bounty-hunting'),
  'home-lab-setup':                 () => import('@/content/cybersecurity/home-lab-setup'),
  'interview-prep-security':        () => import('@/content/cybersecurity/interview-prep-security'),
};

const moduleMeta: Record<string, { title: string; description: string }> = {
  'what-is-cybersecurity':          { title: 'What is Cybersecurity?',                                      description: 'The threat landscape, the roles, and why this field exists — the clearest starting point.' },
  'how-the-internet-works':         { title: 'How the Internet Works — A Security Engineer\'s View',        description: 'TCP/IP, DNS, HTTP, TLS — every layer\'s attack surfaces explained from first principles.' },
  'linux-for-security':             { title: 'Linux for Security Engineers',                                description: 'File permissions, processes, users, logs, and the commands every security professional uses daily.' },
  'cryptography-fundamentals':      { title: 'Cryptography From Scratch',                                   description: 'Symmetric, asymmetric, hashing, digital signatures — practical understanding of what protects and what breaks.' },
  'cia-triad-security-models':      { title: 'The CIA Triad and Security Models',                           description: 'Confidentiality, Integrity, Availability — the three properties every security decision trades off.' },
  'cybersecurity-careers-us':       { title: 'Cybersecurity Career Paths and the US Job Market (2026)',     description: 'Every security role mapped with real US salary data, top hiring companies, and certifications ranked.' },
  'attacker-mindset-kill-chain':    { title: 'How Attackers Think — The Kill Chain and MITRE ATT&CK',      description: 'The attacker\'s playbook from reconnaissance to full compromise — the framework that makes defenders effective.' },
  'social-engineering-phishing':    { title: 'Social Engineering and Phishing',                             description: 'The most successful attack vector in history — how it works, why humans are the hardest patch.' },
  'web-attacks-owasp':              { title: 'Web Application Attacks — OWASP Top 10 From First Principles', description: 'SQL injection, XSS, SSRF, IDOR — every OWASP vulnerability explained with real attack examples.' },
  'network-attacks':                { title: 'Network Attacks — MITM, Sniffing, ARP Poisoning, DNS Hijacking', description: 'How attackers intercept, spoof, and abuse protocol-level weaknesses at the network layer.' },
  'malware-types-behavior':         { title: 'Malware — Types, Behavior, and How It Spreads',              description: 'Ransomware, rootkits, RATs, worms — what each does differently and what defenders look for.' },
  'authentication-attacks':         { title: 'Authentication Attacks — Credential Theft, Pass-the-Hash',   description: 'How attackers steal, crack, and replay credentials — from the attacker\'s perspective.' },
  'vulnerabilities-and-exploits':   { title: 'Vulnerabilities and Exploits — CVEs, Zero-Days, Patches',    description: 'The lifecycle from vulnerability discovery to exploit to patch — and what zero-days mean in practice.' },
  'python-for-security':            { title: 'Python for Security Engineers',                               description: 'Port scanners, log parsers, hash crackers, HTTP fuzzers — scripts every security engineer actually runs.' },
  'networking-deep-dive':           { title: 'Networking Deep Dive — Subnets, Routing, Firewalls, VPNs',   description: 'The networking depth that separates a security professional from someone who just ran a tool.' },
  'linux-hardening':                { title: 'Linux Hardening — From Default to Secure',                    description: 'Every hardening step — SSH, file permissions, service minimisation, audit logging.' },
  'windows-active-directory':       { title: 'Windows Security and Active Directory',                       description: 'How AD works, how it is attacked (Kerberoasting, DCSync), and how to defend it.' },
  'cloud-security':                 { title: 'Cloud Security — Shared Responsibility and IAM Misconfiguration', description: 'The most common cloud attack patterns and how to prevent them.' },
  'api-container-security':         { title: 'API Security and Container Security',                         description: 'JWT attacks, OWASP API Top 10, container escape, Kubernetes RBAC.' },
  'secure-coding':                  { title: 'Secure Coding — Building Software That Does Not Break Under Attack', description: 'Input validation, parameterised queries, output encoding — patterns that prevent OWASP Top 10.' },
  'penetration-testing-methodology':{ title: 'Penetration Testing — Methodology, Scoping, and Legal Framework', description: 'How professional pentesting works — rules of engagement, phases, and report writing.' },
  'reconnaissance-osint':           { title: 'Reconnaissance — OSINT and Footprinting',                    description: 'Everything an attacker can learn before touching the target — from public sources alone.' },
  'scanning-enumeration':           { title: 'Scanning and Enumeration',                                    description: 'Active discovery — nmap, port scanning, service enumeration, OS fingerprinting.' },
  'exploitation-techniques':        { title: 'Exploitation — Techniques, Payloads, and Common Vulnerabilities', description: 'How exploitation actually works from identifying a vulnerable service to executing code.' },
  'web-app-pentesting':             { title: 'Web Application Pentesting — SQL Injection to IDOR',          description: 'Burp Suite workflow, manual testing methodology, and the most impactful vulnerabilities to hunt.' },
  'post-exploitation':              { title: 'Post-Exploitation — Privilege Escalation, Persistence, Lateral Movement', description: 'What attackers do after initial access — escalating, persisting, and moving across the network.' },
  'ctf-skills':                     { title: 'CTF Skills — Problem Types, Approach, and Getting Your First Flag', description: 'The categories, mindset, tools, and approach to your first Capture the Flag competition.' },
  'security-architecture':          { title: 'Security Architecture — Defense in Depth and Zero Trust',     description: 'How to design systems that are hard to attack — from network segmentation to Zero Trust.' },
  'identity-access-management':     { title: 'Identity and Access Management — MFA, RBAC, Privileged Access', description: 'MFA, RBAC, PAM, SSO, OAuth 2.0 — identity controls and how they are abused.' },
  'firewalls-ids-ips':              { title: 'Firewalls, IDS, and IPS — How Detection Actually Works',     description: 'How firewalls decide to block, how IDS detects, how IPS responds, and how attackers evade all three.' },
  'siem-log-analysis':              { title: 'SIEM and Log Analysis — Finding Attacks in the Noise',        description: 'How logs from hundreds of systems become actionable alerts — correlation, baseline, anomaly.' },
  'vulnerability-management':       { title: 'Vulnerability Management — Scanning, Prioritisation, Remediation', description: 'Finding vulnerabilities before attackers do — the full lifecycle from scan to patch.' },
  'incident-response':              { title: 'Incident Response — From Alert to Recovery',                  description: 'The six phases of IR — detection, containment, eradication, recovery, and post-incident review.' },
  'threat-intelligence-hunting':    { title: 'Threat Intelligence and Threat Hunting',                      description: 'IOCs, TTPs, intel feeds, and how hunters actively find attackers who have not triggered any alert.' },
  'devsecops':                      { title: 'DevSecOps — Security Embedded in the Pipeline',               description: 'SAST, DAST, dependency scanning, secrets detection, container scanning in CI/CD.' },
  'compliance-frameworks':          { title: 'Compliance Frameworks — NIST, SOC 2, ISO 27001, PCI-DSS',    description: 'What each framework requires, how they relate, and what an audit looks like from the inside.' },
  'security-certifications':        { title: 'Security Certifications — Which One to Get First',            description: 'CompTIA Security+, CEH, OSCP, CISSP, CISM ranked by value at each career stage.' },
  'bug-bounty-hunting':             { title: 'Bug Bounty Hunting — From Beginner to First Valid Report',    description: 'Platform selection, methodology, the reports that get paid, and getting your first payout.' },
  'home-lab-setup':                 { title: 'Building a Home Lab for Cybersecurity Practice',              description: 'Free practice environment — virtualisation, vulnerable machines, network setup, and practice path.' },
  'interview-prep-security':        { title: 'Interview Prep — 60 Complete Answers for Security Roles',     description: '60 complete answers across networking, crypto, web security, IR, compliance, and behavioural.' },
};

export function generateStaticParams() {
  return Object.keys(moduleMap).map(topic => ({ topic }));
}

export async function generateMetadata({
  params,
}: {
  params: { topic: string };
}): Promise<Metadata> {
  const meta = moduleMeta[params.topic];
  if (!meta) return { title: 'Cybersecurity | Chaduvuko' };
  return {
    title: `${meta.title} | Cybersecurity | Chaduvuko`,
    description: meta.description,
  };
}

export default async function CyberSecurityModulePage({
  params,
}: {
  params: { topic: string };
}) {
  const loader = moduleMap[params.topic];
  if (!loader) notFound();
  const { default: Content } = await loader();
  return <Content />;
}
