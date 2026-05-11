import type { Metadata } from 'next'
import Link from 'next/link'
import { LearnLayout } from '@/components/content/LearnLayout'
import { Callout } from '@/components/content/Callout'
import { KeyTakeaways } from '@/components/content/KeyTakeaways'

export const metadata: Metadata = {
  title: 'Cybersecurity Career Paths and the US Job Market (2026) | Chaduvuko',
  description: 'Every security role mapped with real US salary data, top hiring companies, and certifications ranked by value at each career stage.',
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

export default function CybersecurityCareersUS() {
  return (
    <LearnLayout
      title="Cybersecurity Career Paths and the US Job Market (2026)"
      description="Every security role mapped with real salary data, which certifications matter at which stage, and the companies hiring the most security engineers."
      section="Cybersecurity — Module 06"
      readTime="27 min"
      updatedAt="May 2026"
    >

      {/* ── PART 01 ── */}
      <Part n="01" title="The State of the US Cybersecurity Job Market" />

      <P>The US cybersecurity job market has a structural supply problem: there are consistently more open positions than qualified candidates to fill them. CyberSeek (the joint NIST/CompTIA/Lightcast workforce analytics platform) tracks this gap in real time. As of early 2026, the US has approximately 3.5 million open cybersecurity positions globally, with the US accounting for roughly 700,000 of those unfilled roles.</P>

      <P>This is not a soft market with a few niche openings. The Bureau of Labor Statistics projects <Hl>35% growth in information security analyst jobs from 2021 to 2031</Hl> — roughly five times the average for all occupations. Every major industry sector has security requirements: finance, healthcare, defense, technology, retail, energy, and government. The demand is not concentrated in one vertical.</P>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 14, margin: '20px 0 32px' }}>
        {[
          { stat: '~700K', label: 'Unfilled US security jobs', color: '#ff4757', sub: 'Structural shortage, not cyclical' },
          { stat: '35%', label: 'BLS projected job growth (10yr)', color: '#00e676', sub: '5× the national average' },
          { stat: '$120K', label: 'Median US security salary', color: '#4285f4', sub: 'Entry: $65K → Senior: $200K+' },
          { stat: '0%', label: 'Effective unemployment rate', color: '#7b61ff', sub: 'Qualified candidates find jobs fast' },
        ].map((item) => (
          <div key={item.stat} style={{ background: 'var(--surface)', border: `1px solid ${item.color}25`, borderLeft: `3px solid ${item.color}`, borderRadius: 10, padding: '16px 18px' }}>
            <div style={{ fontSize: 28, fontWeight: 900, color: item.color, fontFamily: 'var(--font-display)', letterSpacing: '-1px', marginBottom: 4 }}>{item.stat}</div>
            <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--text)', marginBottom: 4 }}>{item.label}</div>
            <div style={{ fontSize: 11, color: 'var(--muted)' }}>{item.sub}</div>
          </div>
        ))}
      </div>

      <Callout type="info">
        Security salary data varies significantly by source. The figures in this module are drawn from BLS Occupational Outlook, LinkedIn Salary Insights, Levels.fyi (for tech companies), and SANS 2025 Salary Survey. Real ranges depend heavily on: location (San Francisco vs Dallas vs remote), industry (Big Tech vs healthcare vs government), years of experience, specific skills, and clearance status.
      </Callout>

      <HR />

      {/* ── PART 02 ── */}
      <Part n="02" title="The Career Tracks — Six Paths into Security" />

      <P>Cybersecurity is not one career — it is six distinct career tracks that require different skills, attract different personality types, and lead to different senior roles. Choosing a track early focuses your certification and skill investment.</P>

      <div style={{ display: 'grid', gap: 16, margin: '20px 0 32px' }}>
        {[
          {
            track: 'Security Operations (SOC / IR)',
            color: '#4285f4',
            icon: '🔵',
            level: 'Best entry point',
            desc: 'Monitor alerts, investigate incidents, and respond to breaches. SOC analysts are the first responders of cybersecurity — they triage alerts, escalate real incidents, and build detection content. L1 SOC is the most accessible entry point into the field.',
            roles: ['SOC Analyst L1/L2/L3', 'Incident Responder', 'Threat Hunter', 'Detection Engineer'],
            entry: 'Security+ or no cert. Log analysis skills. Understanding of SIEM tools.',
            salary: 'L1: $50–70K → L3: $90–120K → IR Lead: $120–160K',
            progression: 'L1 → L2 → L3 → IR Lead → Threat Hunter → Security Architect',
          },
          {
            track: 'Penetration Testing / Offensive Security',
            color: '#ff4757',
            icon: '🔴',
            level: 'Competitive entry',
            desc: 'Attack systems with permission to find vulnerabilities before criminals do. Pentesters think like attackers, write reports like consultants, and need deep technical breadth. Entry is competitive — most pentesters have prior IT or developer experience.',
            roles: ['Penetration Tester', 'Red Team Operator', 'Vulnerability Researcher', 'Bug Bounty Hunter'],
            entry: 'OSCP strongly preferred. CTF experience. Programming skills (Python). Networking depth.',
            salary: 'Junior: $70–90K → Mid: $100–140K → Senior: $150–200K → Principal: $200K+',
            progression: 'Bug Bounty → Junior Pentester → Senior Pentester → Red Team Lead → VP Security',
          },
          {
            track: 'Application Security (AppSec)',
            color: '#7b61ff',
            icon: '💜',
            level: 'Strong entry for developers',
            desc: 'Embed security into the software development lifecycle — code review, threat modelling, SAST/DAST tools, secure design, and developer education. AppSec engineers have the highest earning potential because they combine software engineering depth with security knowledge.',
            roles: ['Application Security Engineer', 'Security Engineer (Product)', 'DevSecOps Engineer', 'Security Champion'],
            entry: 'Strong software development background. Understanding of OWASP Top 10. Code review skills.',
            salary: 'Entry: $90–120K → Mid: $130–180K → Senior: $170–250K (FAANG: $300K+ total comp)',
            progression: 'Developer → AppSec Engineer → Staff AppSec → Principal AppSec → CISO',
          },
          {
            track: 'Cloud Security',
            color: '#00e676',
            icon: '🟢',
            level: 'High demand, highest salaries',
            desc: 'Secure cloud infrastructure — IAM configuration, network policies, security monitoring, CSPM, and compliance in AWS, GCP, and Azure environments. Cloud security engineers are among the highest-paid in the field because cloud misconfigurations cause the majority of modern breaches.',
            roles: ['Cloud Security Engineer', 'Cloud Security Architect', 'CSPM Specialist', 'AWS Security Engineer'],
            entry: 'AWS/GCP/Azure certifications. Infrastructure as code. Understanding of cloud-native attack patterns.',
            salary: 'Mid: $130–160K → Senior: $160–220K → Architect: $200–280K (FAANG: $400K+ total comp)',
            progression: 'Cloud Engineer → Cloud Security Engineer → Cloud Security Architect → VP Infrastructure Security',
          },
          {
            track: 'Governance, Risk, and Compliance (GRC)',
            color: '#facc15',
            icon: '🟡',
            level: 'Policy and audit focused',
            desc: 'Manage the organisation\'s security policies, risk assessments, audit processes, and regulatory compliance. GRC roles require less hands-on technical depth but strong communication, policy writing, and business acumen. The path to CISO often runs through GRC.',
            roles: ['GRC Analyst', 'Risk Analyst', 'Compliance Manager', 'Security Auditor', 'CISO'],
            entry: 'CISM or CRISC certification. Understanding of NIST, ISO 27001, SOC 2, PCI-DSS frameworks.',
            salary: 'Analyst: $65–90K → Manager: $100–140K → Director: $150–200K → CISO: $200–400K+',
            progression: 'GRC Analyst → Risk Manager → Compliance Director → VP Risk → CISO',
          },
          {
            track: 'Security Engineering (Infrastructure)',
            color: '#f97316',
            icon: '🟠',
            level: 'Builder track',
            desc: 'Build and operate security infrastructure — SIEM platforms, identity systems, endpoint security, network security, and security automation. Security engineers are the people who deploy and configure the tools that every other track uses.',
            roles: ['Security Engineer', 'IAM Engineer', 'Detection Engineer', 'SIEM Engineer', 'Security Architect'],
            entry: 'Systems/networking background. SIEM experience (Splunk/Sentinel). Scripting (Python). Security+.',
            salary: 'Entry: $75–100K → Mid: $110–150K → Senior: $150–200K → Architect: $180–250K',
            progression: 'Systems Admin → Security Engineer → Senior Security Engineer → Security Architect → CISO',
          },
        ].map((item) => (
          <div key={item.track} style={{ background: 'var(--surface)', border: `1px solid ${item.color}20`, borderRadius: 12, padding: '20px 24px' }}>
            <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start', marginBottom: 12 }}>
              <div style={{ fontSize: 20 }}>{item.icon}</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 15, fontWeight: 800, color: item.color, marginBottom: 2 }}>{item.track}</div>
                <div style={{ fontSize: 11, color: 'var(--muted)', fontFamily: 'var(--font-mono)', background: `${item.color}15`, border: `1px solid ${item.color}30`, borderRadius: 4, padding: '2px 8px', display: 'inline-block' }}>{item.level}</div>
              </div>
            </div>
            <div style={{ fontSize: 13, color: 'var(--text)', lineHeight: 1.75, marginBottom: 12 }}>{item.desc}</div>
            <div style={{ display: 'grid', gap: 8 }}>
              <div style={{ fontSize: 12, color: 'var(--muted)' }}><strong style={{ color: 'var(--text)' }}>Roles: </strong>{item.roles.join(' → ')}</div>
              <div style={{ fontSize: 12, color: 'var(--muted)' }}><strong style={{ color: 'var(--text)' }}>Entry: </strong>{item.entry}</div>
              <div style={{ fontSize: 12, color: item.color, fontWeight: 700 }}>💰 {item.salary}</div>
            </div>
          </div>
        ))}
      </div>

      <HR />

      {/* ── PART 03 ── */}
      <Part n="03" title="Salaries by Role and Experience Level" />

      <P>These salary ranges are US national medians. Cost-of-living-adjusted remote roles from LCOL states often pay 80-90% of these figures. Bay Area and NYC roles can be 30-50% higher. Government and cleared roles often pay below market but offer stability, clearance sponsorship, and benefits that partially offset the difference.</P>

      <div style={{ overflowX: 'auto', marginBottom: 32 }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13, lineHeight: 1.6 }}>
          <thead>
            <tr>
              {['Role', 'Entry (0–2 yr)', 'Mid (3–6 yr)', 'Senior (7+ yr)', 'Principal / Director'].map((h) => (
                <th key={h} style={{ padding: '10px 14px', textAlign: 'left', fontWeight: 700, fontSize: 11, textTransform: 'uppercase', letterSpacing: '.08em', color: 'var(--muted)', borderBottom: '1px solid var(--border)', background: 'var(--bg2)' }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {[
              ['SOC Analyst', '$50–65K', '$70–90K', '$90–120K', '$120–150K (IR Lead)'],
              ['Penetration Tester', '$65–80K', '$90–130K', '$130–180K', '$180–250K'],
              ['Incident Responder', '$65–85K', '$90–120K', '$120–160K', '$160–200K'],
              ['AppSec Engineer', '$85–110K', '$120–160K', '$160–220K', '$220–350K+'],
              ['Cloud Security Engineer', '$90–120K', '$130–170K', '$160–230K', '$220–350K+'],
              ['Security Engineer (Infra)', '$75–95K', '$100–140K', '$140–190K', '$180–250K'],
              ['GRC Analyst', '$55–75K', '$80–110K', '$110–150K', '$150–200K'],
              ['Threat Intelligence Analyst', '$65–85K', '$90–120K', '$120–160K', '$160–200K'],
              ['Detection Engineer', '$75–95K', '$100–140K', '$140–190K', '$180–250K'],
              ['Vulnerability Manager', '$65–85K', '$90–120K', '$120–160K', '$150–200K'],
              ['Security Architect', '–', '$130–160K', '$160–220K', '$200–300K'],
              ['CISO', '–', '–', '$200–300K', '$300–500K+'],
            ].map(([role, e, m, s, p], i) => (
              <tr key={i} style={{ background: i % 2 === 0 ? 'var(--surface)' : 'var(--bg2)' }}>
                <td style={{ padding: '10px 14px', fontWeight: 700, color: 'var(--text)', borderBottom: '1px solid var(--border)' }}>{role}</td>
                <td style={{ padding: '10px 14px', color: 'var(--muted)', fontFamily: 'var(--font-mono)', fontSize: 12, borderBottom: '1px solid var(--border)' }}>{e}</td>
                <td style={{ padding: '10px 14px', color: 'var(--muted)', fontFamily: 'var(--font-mono)', fontSize: 12, borderBottom: '1px solid var(--border)' }}>{m}</td>
                <td style={{ padding: '10px 14px', color: 'var(--muted)', fontFamily: 'var(--font-mono)', fontSize: 12, borderBottom: '1px solid var(--border)' }}>{s}</td>
                <td style={{ padding: '10px 14px', color: '#00e676', fontFamily: 'var(--font-mono)', fontSize: 12, fontWeight: 700, borderBottom: '1px solid var(--border)' }}>{p}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Callout type="tip">
        Big Tech (FAANG + Microsoft, Salesforce, Stripe, Databricks) pays total compensation — base salary + stock (RSUs) + bonus. A senior AppSec engineer at Google or Meta earns $300–500K total comp, with base salary around $180–220K. Levels.fyi tracks these numbers. If financial optimization is the goal, AppSec and Cloud Security at Big Tech consistently outperform every other track.
      </Callout>

      <HR />

      {/* ── PART 04 ── */}
      <Part n="04" title="Top Hiring Companies and Sectors" />

      <H>Big Tech — Highest Pay, Hardest Entry</H>
      <P>Google, Microsoft, Amazon (AWS Security), Meta, Apple, Stripe, Cloudflare, Palo Alto Networks, CrowdStrike, and SentinelOne pay the highest total compensation. Entry is highly competitive — technical interviews include security knowledge assessments, coding challenges, and system design. These companies typically prefer candidates with 3+ years of experience, strong programming skills, and demonstrated impact.</P>

      <H>Financial Services — High Pay, Regulatory Focus</H>
      <P>JPMorgan Chase, Goldman Sachs, Morgan Stanley, Citi, Bank of America, Visa, Mastercard, and PayPal have massive security teams with thousands of positions. Financial services pay well ($120–200K+ for senior roles) and offer stability. Regulatory requirements (PCI-DSS, SOX, OCC guidelines) drive continuous security investment. The downside: heavily process-driven, slower to change, lots of compliance work alongside technical work.</P>

      <H>Defense and Intelligence — Clearance Required, Different Value Proposition</H>
      <P>Booz Allen Hamilton, Leidos, SAIC, Raytheon, Northrop Grumman, MITRE, and NSA/CISA/DOD direct positions. Secret or Top Secret clearance (sometimes TS/SCI) is required and takes 6-18 months to obtain if you do not already have it. Pay is below commercial for equivalent roles but includes excellent benefits, job security, interesting work, and the clearance itself (which makes you valuable to any future employer working with the government). If you are a US citizen with a clean background, pursuing clearance is a career advantage.</P>

      <H>Consulting — Breadth and Fast Career Development</H>
      <P>Big 4 (Deloitte, PwC, EY, KPMG) security practices, Mandiant (now Google), IBM Security, Optiv, NCC Group, Bishop Fox, and Rapid7 Professional Services. Consultants work across many clients simultaneously — you see more variety of environments in two years of consulting than most in-house engineers see in ten. The trade-offs: travel (for non-remote engagements), up-or-out culture, and lower pay than Big Tech. Strong consulting experience is highly valued when transitioning to in-house roles.</P>

      <H>Healthcare — High Growth, HIPAA Driver</H>
      <P>Epic, Optum (UnitedHealth), CVS Health, HCA Healthcare, and large hospital systems. Healthcare security is driven by HIPAA compliance requirements and a growing ransomware targeting pattern — hospitals are preferred ransomware targets because they cannot afford downtime. Pay is slightly below tech but demand is high and growth is strong as healthcare digitises.</P>

      <ProTip>The fastest path to a $150K+ security salary in the US: 3 years in a SOC or AppSec role at any company → move to Big Tech or Financial Services. Alternatively: strong programming background → AppSec directly at Big Tech with ~2 years total. The slow path is getting certifications without getting hands-on experience first. Certs open doors; skills close offers.</ProTip>

      <HR />

      {/* ── PART 05 ── */}
      <Part n="05" title="Certifications — Ranked by Value at Each Career Stage" />

      <P>Certifications serve two purposes: they open doors (getting past HR filters for jobs requiring them) and they provide structured learning (covering material you might not encounter in day-to-day work). The mistake beginners make is stacking certifications instead of getting experience — one cert plus real experience beats five certs and no job history.</P>

      <H>Entry Level — Your First Cert</H>

      <div style={{ display: 'grid', gap: 12, margin: '0 0 28px' }}>
        {[
          {
            cert: 'CompTIA Security+',
            color: '#00e676',
            cost: '$392 exam',
            time: '2–3 months of study',
            value: '★★★★★',
            desc: 'The most widely recognised entry-level certification. Meets DoD 8570 requirements (US government/defense jobs). Covers fundamental security concepts across all domains — no prerequisites required. Required for many government and consulting positions. The best first cert for anyone entering the field with no prior IT background.',
            best_for: 'Anyone entering security from zero, government roles, consulting',
          },
          {
            cert: 'CompTIA Network+',
            color: '#4285f4',
            cost: '$338 exam',
            time: '1–2 months of study',
            value: '★★★☆☆',
            desc: 'Covers networking fundamentals — subnetting, routing, protocols, troubleshooting. Not required for security roles but provides the networking foundation that Security+ assumes. Take it before Security+ if you have no networking background.',
            best_for: 'Complete beginners with no networking knowledge',
          },
          {
            cert: 'Google Cybersecurity Certificate (Coursera)',
            color: '#facc15',
            cost: '$49/month (Coursera subscription)',
            time: '3–6 months',
            value: '★★★☆☆',
            desc: 'A structured online curriculum designed for career changers. Covers Security+ equivalent material plus hands-on labs with Chronicle SIEM and other Google tools. Does not have the brand recognition of Security+ for job applications, but the structured curriculum is excellent for complete beginners who want guided learning.',
            best_for: 'Career changers who need structured learning before attempting Security+',
          },
        ].map((item) => (
          <div key={item.cert} style={{ background: 'var(--surface)', border: `1px solid ${item.color}20`, borderLeft: `3px solid ${item.color}`, borderRadius: 8, padding: '16px 20px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8, flexWrap: 'wrap', gap: 8 }}>
              <div style={{ fontSize: 14, fontWeight: 800, color: item.color }}>{item.cert}</div>
              <div style={{ fontSize: 14, color: '#facc15' }}>{item.value}</div>
            </div>
            <div style={{ display: 'flex', gap: 16, marginBottom: 8, flexWrap: 'wrap' }}>
              <div style={{ fontSize: 11, color: 'var(--muted)', fontFamily: 'var(--font-mono)' }}>💵 {item.cost}</div>
              <div style={{ fontSize: 11, color: 'var(--muted)', fontFamily: 'var(--font-mono)' }}>⏱ {item.time}</div>
            </div>
            <div style={{ fontSize: 13, color: 'var(--text)', lineHeight: 1.7, marginBottom: 6 }}>{item.desc}</div>
            <div style={{ fontSize: 11, color: item.color }}>Best for: {item.best_for}</div>
          </div>
        ))}
      </div>

      <H>Mid Level — After 1–3 Years of Experience</H>

      <div style={{ display: 'grid', gap: 12, margin: '0 0 28px' }}>
        {[
          {
            cert: 'OSCP (Offensive Security Certified Professional)',
            color: '#ff4757',
            cost: '$1,499 (90-day lab access)',
            time: '3–6 months',
            value: '★★★★★',
            desc: 'The gold standard for penetration testing. A hands-on exam where candidates must compromise a network of machines within 24 hours and write a professional report. OSCP holders have proven they can actually exploit systems, not just recite theory. Required or strongly preferred for most pentesting roles. Difficult — pass rates around 50–60%.',
            best_for: 'Anyone pursuing offensive security / pentesting',
          },
          {
            cert: 'AWS Security Specialty',
            color: '#f97316',
            cost: '$300 exam',
            time: '2–3 months',
            value: '★★★★★',
            desc: 'Validates deep AWS security knowledge — IAM, KMS, GuardDuty, Security Hub, VPC security, CloudTrail. Required or strongly preferred for cloud security roles at AWS-heavy organisations. Complements associate-level AWS certifications.',
            best_for: 'Cloud security track',
          },
          {
            cert: 'CEH (Certified Ethical Hacker)',
            color: '#facc15',
            cost: '$950–1,999',
            time: '2–3 months',
            value: '★★☆☆☆',
            desc: 'Covers ethical hacking concepts. Accepted for DoD 8570 compliance. Historically respected but increasingly seen as too theory-heavy compared to OSCP. Many hiring managers prefer OSCP for pentesting roles. Useful primarily if you need DoD compliance or prefer a multiple-choice format.',
            best_for: 'DoD-regulated environments, candidates who cannot attempt OSCP yet',
          },
          {
            cert: 'GCIH (GIAC Certified Incident Handler)',
            color: '#7b61ff',
            cost: '$949 exam + $949 course (usually bundled)',
            time: '2–3 months',
            value: '★★★★☆',
            desc: 'GIAC\'s incident response certification. Covers detection, response, and recovery. Well-respected in the security operations community. SANS-associated certifications carry significant weight with experienced practitioners.',
            best_for: 'SOC → IR track',
          },
        ].map((item) => (
          <div key={item.cert} style={{ background: 'var(--surface)', border: `1px solid ${item.color}20`, borderLeft: `3px solid ${item.color}`, borderRadius: 8, padding: '16px 20px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8, flexWrap: 'wrap', gap: 8 }}>
              <div style={{ fontSize: 14, fontWeight: 800, color: item.color }}>{item.cert}</div>
              <div style={{ fontSize: 14, color: '#facc15' }}>{item.value}</div>
            </div>
            <div style={{ display: 'flex', gap: 16, marginBottom: 8, flexWrap: 'wrap' }}>
              <div style={{ fontSize: 11, color: 'var(--muted)', fontFamily: 'var(--font-mono)' }}>💵 {item.cost}</div>
              <div style={{ fontSize: 11, color: 'var(--muted)', fontFamily: 'var(--font-mono)' }}>⏱ {item.time}</div>
            </div>
            <div style={{ fontSize: 13, color: 'var(--text)', lineHeight: 1.7, marginBottom: 6 }}>{item.desc}</div>
            <div style={{ fontSize: 11, color: item.color }}>Best for: {item.best_for}</div>
          </div>
        ))}
      </div>

      <H>Senior Level — After 5+ Years of Experience</H>

      <div style={{ display: 'grid', gap: 12, margin: '0 0 28px' }}>
        {[
          {
            cert: 'CISSP (Certified Information Systems Security Professional)',
            color: '#4285f4',
            cost: '$749 exam (+ 5 years experience required)',
            time: '3–6 months',
            value: '★★★★★',
            desc: 'The most recognised senior security certification globally. Required or strongly preferred for security manager, architect, and CISO roles. Covers all security domains at a management level. The exam requires endorsement from an existing CISSP — you must actually have 5 years of paid work experience. More valuable for management tracks than technical tracks.',
            best_for: 'Senior technical roles, management, CISO aspiration, GRC track',
          },
          {
            cert: 'CISM (Certified Information Security Manager)',
            color: '#7b61ff',
            cost: '$575 exam (ISACA member)',
            time: '2–3 months',
            value: '★★★★☆',
            desc: 'ISACA\'s management-focused certification. More practically oriented than CISSP for management roles. Strong recognition in GRC, financial services, and consulting. Preferred by some employers over CISSP for management roles because of its narrower management focus.',
            best_for: 'GRC track, security management, financial services',
          },
        ].map((item) => (
          <div key={item.cert} style={{ background: 'var(--surface)', border: `1px solid ${item.color}20`, borderLeft: `3px solid ${item.color}`, borderRadius: 8, padding: '16px 20px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8, flexWrap: 'wrap', gap: 8 }}>
              <div style={{ fontSize: 14, fontWeight: 800, color: item.color }}>{item.cert}</div>
              <div style={{ fontSize: 14, color: '#facc15' }}>{item.value}</div>
            </div>
            <div style={{ display: 'flex', gap: 16, marginBottom: 8, flexWrap: 'wrap' }}>
              <div style={{ fontSize: 11, color: 'var(--muted)', fontFamily: 'var(--font-mono)' }}>💵 {item.cost}</div>
            </div>
            <div style={{ fontSize: 13, color: 'var(--text)', lineHeight: 1.7, marginBottom: 6 }}>{item.desc}</div>
            <div style={{ fontSize: 11, color: item.color }}>Best for: {item.best_for}</div>
          </div>
        ))}
      </div>

      <HR />

      {/* ── PART 06 ── */}
      <Part n="06" title="The Entry-Level Path — From Zero to First Job" />

      <P>The most common questions from career changers: How do I get experience with no experience? What does the hiring process look like? How long will it take?</P>

      <H>Building Experience Without a Security Job</H>

      <div style={{ display: 'grid', gap: 12, margin: '0 0 24px' }}>
        {[
          { method: 'Home Lab + TryHackMe / Hack The Box', color: '#ff4757', desc: 'Build a virtual lab using free tools (VirtualBox + Kali Linux + vulnerable VMs from VulnHub). TryHackMe has guided learning paths for absolute beginners — structured rooms teaching specific skills with hands-on exercises. HackTheBox has a more competitive CTF-style format. Document your lab work as writeups on a GitHub or blog — this becomes portfolio evidence.' },
          { method: 'CTF Competitions', color: '#f97316', desc: 'Capture the Flag competitions present security challenges where you find "flags" (hidden strings) by solving puzzles. CTFs cover web exploitation, cryptography, reverse engineering, forensics, and binary exploitation. PicoCTF (beginner), CTFtime.org (all levels). CTF writeups demonstrate practical skill and are highly regarded by security hiring managers.' },
          { method: 'Bug Bounty Programs', color: '#7b61ff', desc: 'HackerOne and Bugcrowd host public bug bounty programs where you can legally test real company applications for vulnerabilities and earn money for valid findings. Finding your first valid bug bounty report demonstrates practical offensive skill. Many pentesters started with bug bounty.' },
          { method: 'Open Source Security Projects', color: '#4285f4', desc: 'Contribute to security tools — write a detection rule for Sigma, improve a Snort IDS signature, or contribute to an open-source SIEM. GitHub contributions to security projects are portfolio evidence. Security tools you build (a port scanner, a log parser, a password auditing script) show practical programming + security knowledge.' },
          { method: 'Entry-Level IT Roles', color: '#00e676', desc: 'Help desk → sysadmin → security is a well-worn path. 1-2 years in IT gives you the systems and networking fundamentals that make security learning significantly faster, and internal security team transitions are common. Many security engineers started in IT support.' },
        ].map((item) => (
          <div key={item.method} style={{ background: 'var(--surface)', border: `1px solid ${item.color}20`, borderLeft: `3px solid ${item.color}`, borderRadius: 8, padding: '14px 18px' }}>
            <div style={{ fontSize: 13, fontWeight: 800, color: item.color, marginBottom: 6 }}>{item.method}</div>
            <div style={{ fontSize: 13, color: 'var(--text)', lineHeight: 1.7 }}>{item.desc}</div>
          </div>
        ))}
      </div>

      <H>The Realistic Timeline</H>

      <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 12, padding: '24px', marginBottom: 24 }}>
        {[
          { month: 'Month 1–2', label: 'Fundamentals', body: 'Networking (TCP/IP, DNS, HTTP), Linux basics, how web applications work. TryHackMe Pre-Security path. Modules 01–06 of this track.' },
          { month: 'Month 3–4', label: 'Security+ preparation', body: 'Study for Security+ using Professor Messer\'s free course + practice exams. Take the exam. This is your baseline credential.' },
          { month: 'Month 5–8', label: 'Hands-on practice', body: 'TryHackMe SOC Level 1 path or Web Fundamentals path. Document all practice in writeups. Build a home lab. Start on Hack The Box easy machines.' },
          { month: 'Month 9–12', label: 'Specialisation and job applications', body: 'Choose your track. For SOC: get Splunk fundamentals certification (free). For AppSec: build web app security projects. Start applying for L1 SOC analyst, junior security analyst, or help desk + security roles.' },
          { month: 'Month 12–18', label: 'First job and continuing growth', body: 'Most motivated candidates with Security+ and demonstrated hands-on work find their first security role within this window. Start preparing your next cert (GCIH for SOC track, OSCP for offensive track).' },
        ].map((block) => (
          <div key={block.month} style={{ display: 'flex', gap: 20, marginBottom: 20 }}>
            <div style={{ flexShrink: 0, width: 100 }}>
              <div style={{ fontSize: 11, fontWeight: 700, color: C, fontFamily: 'var(--font-mono)' }}>{block.month}</div>
            </div>
            <div style={{ flex: 1, borderLeft: `2px solid ${C}30`, paddingLeft: 18, paddingBottom: 4 }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--text)', marginBottom: 4 }}>{block.label}</div>
              <div style={{ fontSize: 13, color: 'var(--muted)', lineHeight: 1.75 }}>{block.body}</div>
            </div>
          </div>
        ))}
      </div>

      <ProTip>The L1 SOC analyst role is the most accessible entry point. Most L1 roles do not require a degree (though having one helps). They do require: Security+ or equivalent knowledge, basic log analysis skills, familiarity with a SIEM (Splunk or Microsoft Sentinel free trial), and the ability to follow a playbook. The interview is typically knowledge-based (What is a SYN flood? Walk me through how you would triage this alert?) rather than hands-on technical challenges. The L1 SOC role is not glamorous — alert triage is repetitive — but it provides the experience needed for L2, IR, and threat hunting roles.</ProTip>

      <HR />

      {/* ── PART 07 ── */}
      <Part n="07" title="What Hiring Managers Actually Look For" />

      <P>Surveying security hiring managers produces consistent themes about what differentiates candidates:</P>

      <div style={{ display: 'grid', gap: 12, margin: '0 0 28px' }}>
        {[
          { factor: 'Demonstrated hands-on work', weight: 'Most important', desc: 'GitHub with security projects, CTF writeups, bug bounty reports, home lab documentation. "I did X and here is what I built" beats "I have a cert that says I know Y." Every hiring manager in the field says variants of this. The market is full of people with certs and no evidence of having used the knowledge.' },
          { factor: 'Communication skills', weight: 'Critical for all tracks', desc: 'Security engineers write reports, present findings to non-technical stakeholders, and explain vulnerabilities to developers who do not want to hear that their code is broken. Candidates who can clearly explain technical concepts win over candidates who can only demonstrate them. Practice writing clear, jargon-free explanations.' },
          { factor: 'Curiosity and learning rate', weight: 'High for junior roles', desc: 'The field changes faster than any curriculum. A junior candidate who demonstrates obsessive curiosity — who has a project they are building, who asks smart questions about the organisation\'s current threat landscape — is hired over a candidate who has a better cert but shows no evidence of ongoing learning.' },
          { factor: 'Specific technical skills matching the role', weight: 'Track-dependent', desc: 'SOC roles want SIEM experience (Splunk query writing). Pentesting wants evidence of having exploited something. AppSec wants code review experience. Research the specific tools and skills required for your target roles and demonstrate exactly those.' },
          { factor: 'Cultural fit and team dynamic', weight: 'Underestimated', desc: 'Security teams are small and under constant pressure. Candidates who demonstrate calm under pressure, collaborative instincts, and professional communication win over candidates who are technically superior but come across as difficult to work with. Never underestimate the soft skill component of a technical interview.' },
        ].map((item) => (
          <div key={item.factor} style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 8, padding: '14px 18px' }}>
            <div style={{ display: 'flex', gap: 10, marginBottom: 6, alignItems: 'center', flexWrap: 'wrap' }}>
              <div style={{ fontSize: 13, fontWeight: 800, color: C }}>{item.factor}</div>
              <div style={{ fontSize: 11, color: 'var(--muted)', background: 'var(--bg2)', border: '1px solid var(--border)', borderRadius: 4, padding: '1px 6px' }}>{item.weight}</div>
            </div>
            <div style={{ fontSize: 13, color: 'var(--text)', lineHeight: 1.7 }}>{item.desc}</div>
          </div>
        ))}
      </div>

      <HR />

      {/* ── PART 08 ── */}
      <Part n="08" title="Interview Prep — 5 Questions With Complete Answers" />

      <IQ q="Why do you want to work in cybersecurity and what draws you to this specific role?">
        This is asked at nearly every security interview, and weak answers ("I want to help people and I am good with computers") are immediately distinguishable from strong ones.
        {'\n\n'}
        A strong answer connects a specific genuine interest to the specific role: "I started learning security after reading about the SolarWinds supply chain attack — the way the attackers compromised thousands of organisations through a trusted software update was fascinating and alarming. I have spent the last eight months building a home lab, completing the TryHackMe SOC Level 1 path, and working through CTF challenges focused on detection. I applied for this L1 SOC role specifically because I want to build the alert triage and investigation skills that are the foundation of every other security career track."
        {'\n\n'}
        What makes this strong: it cites a specific event that sparked interest (showing genuine curiosity, not just career calculation), references specific hands-on work (credibility), and connects those to the specific role (showing you understand what L1 SOC actually is and why it makes sense as a starting point).
        {'\n\n'}
        What makes an answer weak: generic motivation statements, no specific hands-on experience, inability to describe what the role actually does, or an answer that suggests the candidate does not actually know what they are applying for.
      </IQ>

      <IQ q="How would you explain what a SOC analyst does to someone with no technical background?">
        This tests communication ability — a core security skill — not just technical knowledge.
        {'\n\n'}
        A strong answer: "A SOC analyst is a first responder for computer security incidents. Think of the way a 911 dispatcher receives calls, assesses urgency, and decides what resources to send — a SOC analyst does the same thing for security alerts. Security monitoring tools generate thousands of alerts every day — a login from an unexpected country, software trying to connect to an unusual website, files being accessed in an abnormal pattern. Most of these are false alarms. A SOC analyst reviews each alert, determines whether it represents a real threat or a benign anomaly, and if real, escalates to the right response team. The job requires pattern recognition, procedure discipline, and the ability to stay focused during routine work because the occasional real incident requires immediate accurate judgement."
        {'\n\n'}
        This answer works for a non-technical audience because it uses a relatable analogy (911 dispatcher), explains the volume problem (thousands of alerts), and describes the skills required without jargon.
      </IQ>

      <IQ q="What certifications do you have and which one would you pursue next?">
        This question assesses self-awareness about your own development and whether you have a coherent career plan.
        {'\n\n'}
        The right structure: state what you have, why you pursued it, what you learned from it, then articulate the next step with a specific rationale tied to your career goals.
        {'\n\n'}
        Example: "I have Security+, which gave me strong foundational coverage across all security domains and confirmed the networking and cryptography concepts I had been studying independently. The next certification I am working toward is GCIA — I want to go deeper on network traffic analysis and intrusion detection, which is directly relevant to the SOC analyst work I want to do. I have been doing Wireshark labs and working through the SANS reading material. I plan to take the GCIA exam in about four months."
        {'\n\n'}
        What this demonstrates: a coherent learning trajectory, self-directed motivation, specific actionable plans, and a connection between the cert and the role. Compare to a weak answer: "I have Security+ and I am thinking about getting OSCP next" from someone applying for a SOC role — a mismatch that suggests the candidate does not understand their own career path.
      </IQ>

      <IQ q="Walk me through how you would respond to a phishing alert where an employee clicked a link in a suspicious email.">
        This is a scenario-based question testing whether you can apply a process under pressure. No single answer is perfect — the interviewer wants to see systematic thinking, not memorised steps.
        {'\n\n'}
        Structure your answer: containment first, then investigation, then remediation.
        {'\n\n'}
        Containment: first, determine what happened and limit further damage. Has the user entered any credentials? Did any files download? Has the user reported any unusual system behaviour? If there is evidence of malware execution or credential entry, isolate the workstation from the network immediately — prevent lateral movement before doing anything else.
        {'\n\n'}
        Investigation: examine the email itself — what was the sender, the link, and the claimed content? Use a URL sandbox (VirusTotal, URLScan.io) to check the link without visiting it. Check the email gateway logs: did others receive the same email? Check the endpoint logs: was any file downloaded? Did any process spawn from the browser? Check authentication logs: were there any login attempts with the user's credentials from unusual locations after the click time?
        {'\n\n'}
        Remediation depends on findings: no malware, no credential entry — document, close, security awareness follow-up with the user. Credential entry suspected — reset the password immediately, invalidate all active sessions, enable additional monitoring on the account. Malware confirmed — escalate to incident response, rebuild the endpoint from a known-good image, expand the investigation to check for lateral movement.
        {'\n\n'}
        Throughout: document every step. Even if nothing serious happened, documentation creates a paper trail for the next alert. Notify your supervisor at the escalation point. Follow the documented playbook rather than improvising.
      </IQ>

      <IQ q="Where do you see yourself in five years in the security field?">
        The interviewer is checking for realistic career planning, genuine interest in the field, and alignment between your goals and what the role offers.
        {'\n\n'}
        The honest answer for someone entering L1 SOC: "I see the SOC analyst role as the foundational experience that most senior security careers are built on. In five years, I want to be working as a senior incident responder or a threat hunter — roles that require exactly the detection and investigation skills I will be building in L1 and L2. I am interested in developing expertise in threat intelligence — understanding attacker TTPs and applying that knowledge to improve detection coverage. If the opportunity exists within this organisation, I would love to grow into those roles here. If not, I plan to build the skills here and pursue them where they are available."
        {'\n\n'}
        This answer works because: it demonstrates understanding of career progression (L1 → senior IR → threat hunting is realistic), it shows commitment to the role without being evasive about future ambition, and it shows interest in staying at the company if growth is possible — which most hiring managers prefer.
      </IQ>

      <HR />

      {/* ── Error Library ── */}
      <Part n="09" title="Career Planning Mistakes That Cost Time and Opportunities" />

      <Err
        msg="Certification stacking without experience: CISSP + OSCP + CEH + Security+ with 0 years of work"
        cause="Candidates who believe that enough certifications can substitute for work experience consistently fail to get interviews. Certs get your resume past an automated filter — they do not create the experience that a competent hiring manager evaluates in an interview. A candidate with Security+ and a documented home lab and two CTF writeups is more competitive than a candidate with CISSP, OSCP, and CEH who has never actually exploited a machine or investigated a real alert. Certifications signal knowledge; demonstrated work signals capability."
        fix="Get Security+ (opens the first door), then focus your energy on building evidence: TryHackMe/HTB writeups on GitHub, CTF participation, a home lab with documented security experiments, and a blog or LinkedIn presence showing your learning. Apply for L1 SOC or junior security analyst roles after Security+ while continuing to build skills in parallel. The second cert (GCIH, OSCP, AWS Security) should be pursued after 12–18 months of experience, not before your first job."
      />

      <Err
        msg="Applying for senior pentesting roles with no experience and citing OSCP as sufficient"
        cause="OSCP demonstrates that you can compromise lab machines in a structured environment. It does not demonstrate that you can scope an engagement, communicate with a client, write a professional penetration test report, navigate real-world enterprise defences, or manage the legal and ethical complexity of a real engagement. Junior pentesting roles exist and require OSCP. Senior roles typically require 4+ years of consulting or in-house experience. Applying for senior roles with no experience and citing OSCP frustrates hiring managers and burns opportunities."
        fix="OSCP → Junior/Associate Penetration Tester (1–2 years at a consulting firm or in-house) → Mid-level Pentester (2–3 more years, expand scope, develop specialisation) → Senior Pentester. Bug bounty reports are an excellent parallel track — finding valid vulnerabilities on real targets demonstrates real-world skill. A junior pentesting role at a consulting firm is the fastest path to senior; they will send you on engagements immediately."
      />

      <Err
        msg="Ignoring the GRC track because it is 'not technical enough'"
        cause="GRC roles are frequently dismissed by technical candidates as being for people who could not do the real work. This misunderstanding leaves a well-paying, high-ceiling career track underexplored. CISO roles — which pay $200–500K+ — frequently come from GRC backgrounds because the CISO is fundamentally a risk management and business alignment role, not a technical execution role. GRC also provides natural entry into regulated industries (finance, healthcare, government) where GRC skills are highly valued."
        fix="If the technical track does not suit your skills or interests, GRC is a legitimate and well-paying path with excellent career ceiling. The CISM and CISSP certifications are the primary credentials. Strong writing, communication, risk analysis, and business acumen matter more than hands-on technical skills. The GRC career trajectory — GRC Analyst → Risk Manager → Compliance Director → VP Risk → CISO — pays very well at every level."
      />

      <Err
        msg="Taking the first job offer without evaluating whether it builds toward your next role"
        cause="Early career decisions compound. An L1 SOC role at a company that never promotes from within, does not invest in training, and processes only alert triage with no investigation leaves you stuck for years. Contrast with an L1 SOC role at a company with structured L1→L2→L3 progression, budget for SANS training, and a threat hunting team you can shadow. Both are L1 SOC roles on paper. One builds a 3-year career; the other builds 3 years of experience doing the same thing."
        fix="Before accepting any security role, ask specific questions in the interview: 'What does promotion from L1 to L2 look like here and what is the typical timeline?' 'What professional development budget is available?' 'Can you tell me about someone who was hired at L1 and where they are now?' 'Will I be involved in investigations or only initial triage?' The answers reveal whether the role is a stepping stone or a dead end. Accept the role that builds toward your three-year goal, not just the role that pays the most today."
      />

      <Err
        msg="Underestimating the value of a US government security clearance"
        cause="Many candidates avoid government and defense roles because pay is lower than commercial tech. They underestimate the compound value of the clearance itself. A Secret clearance opens access to a large class of defense and intelligence contracting jobs that pay market-rate or above despite government salary bands, simply because cleared candidates are scarce. A TS/SCI clearance (available in some intelligence community roles) is extraordinarily valuable — the private sector competition for cleared candidates drives salaries well above commercial averages."
        fix="If you are a US citizen with a clean background (no criminal record, manageable debt, no foreign connections that create conflicts), a junior security role that sponsors your clearance is worth accepting below-market for 2–3 years. The clearance then becomes a permanent career asset that pays dividends for decades. Many government positions also offer excellent benefits (federal health insurance, defined-benefit pension, generous leave) that partially offset the salary gap. Calculate total compensation, not just base salary."
      />

      {/* ── Key Takeaways ── */}
      <KeyTakeaways items={[
        'The US has approximately 700,000 unfilled cybersecurity positions as of 2026. BLS projects 35% job growth over 10 years — five times the national average. This is a structural shortage, not a cyclical one. Qualified candidates find employment quickly.',
        'Six distinct career tracks exist: Security Operations (most accessible entry), Penetration Testing (most competitive entry), Application Security (highest-paying, developer path), Cloud Security (highest salaries, high demand), GRC (management/compliance path), and Security Engineering (infrastructure builder track).',
        'Salaries range from $50K (entry L1 SOC) to $500K+ (CISO at major company). AppSec and Cloud Security at Big Tech pay $300–500K total compensation including RSUs. Government and defense pay below commercial but offer clearance sponsorship and stability.',
        'Top employers: Big Tech (Google, Microsoft, Amazon, Meta) for highest pay; Financial Services (JPMorgan, Goldman, Visa) for stability and high pay; Defense contractors (Booz Allen, Leidos, Raytheon) for clearance sponsorship; Big 4 consulting for breadth; Healthcare for high growth and HIPAA demand.',
        'Certifications serve two purposes: opening HR filters and providing structured learning. Security+ is the essential entry cert. OSCP is essential for pentesting. AWS Security Specialty for cloud security. CISSP for senior management roles. Never stack certs at the expense of hands-on experience — one cert plus demonstrated work beats five certs with no practical evidence.',
        'Entry-level path: Security+ → hands-on practice (TryHackMe/HTB/CTFs/home lab with documented writeups) → L1 SOC or junior analyst role → specialisation → second cert. The realistic timeline from complete beginner to first security job is 12–18 months for motivated candidates.',
        'The most accessible entry point is L1 SOC analyst. Requirements: Security+, basic log analysis, SIEM familiarity (Splunk/Sentinel free tier), ability to follow a playbook. The interview focuses on knowledge questions and scenario responses, not hands-on technical challenges. L1 SOC is the base of most security careers.',
        'Hiring managers weight: demonstrated hands-on work (most important — CTF writeups, projects, lab documentation), communication skills (reports and presentations are core deliverables), specific technical skills matching the role, and cultural fit. Certificates open doors; evidence of capability closes offers.',
        'US government security clearances are permanently valuable career assets. A Secret clearance opens large defense/intelligence contracting markets; TS/SCI is exceptionally valuable and scarce. Citizens with clean backgrounds should seriously consider government roles that sponsor clearance, even at below-market salaries, for the long-term career value.',
        'Early career decisions compound. Evaluate roles not just on immediate salary but on whether they build toward your three-year goal — whether they offer L1→L2→L3 progression, training budget, investigation exposure, and proximity to more senior practitioners who can accelerate your learning.',
      ]} />

      {/* ── Next Module CTA ── */}
      <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 10, padding: '24px', marginTop: 40 }}>
        <p style={{ fontSize: 10, color: 'var(--muted)', letterSpacing: '.12em', textTransform: 'uppercase', fontFamily: 'var(--font-mono)', fontWeight: 700, margin: '0 0 10px' }}>
          What comes next
        </p>
        <p style={{ fontSize: 15, color: 'var(--text)', lineHeight: 1.85, margin: '0 0 20px' }}>
          In <strong>Module 07</strong>, you make the shift from defender to attacker mindset — how attackers plan and execute campaigns, the kill chain model that maps every attack step, and the MITRE ATT&CK framework that every security team in the world uses to describe attacker behaviour.
        </p>
        <Link href="/learn/cybersecurity/attacker-mindset-kill-chain" style={{ background: C, color: '#fff', padding: '11px 24px', borderRadius: 7, fontWeight: 700, fontSize: 13, textDecoration: 'none', display: 'inline-block' }}>
          Module 07 → How Attackers Think — The Kill Chain and MITRE ATT&CK
        </Link>
      </div>

    </LearnLayout>
  )
}
