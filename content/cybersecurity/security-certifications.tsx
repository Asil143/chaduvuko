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

export default function Module37() {
  return (
    <LearnLayout
      title="Security Certifications and Career Paths"
      description="Navigate the certification landscape strategically. Learn which certs matter for which roles, the most efficient study paths, exam strategies, and how to build a portfolio that gets you hired in the US cybersecurity job market."
      section="Cybersecurity — Module 37"
      readTime="35 min"
      updatedAt="May 2026"
    >

      <Part title="Certifications vs Experience — Setting Expectations">
        <P>
          Certifications open doors — especially in the US federal government, defence contracting, and enterprise IT markets, where they are often listed as hard requirements. But they are signals, not substitutes for real skill. <Hl>A certification tells a recruiter you can pass a test; your portfolio and GitHub tell them you can do the work</Hl>.
        </P>
        <P>
          The most effective career strategy combines: one or two certifications appropriate to your target role, a home lab demonstrating practical skills, write-ups from CTFs or bug bounty programmes, and work experience (internship, junior role, or volunteer work). Each of these independently is weak; together they are compelling.
        </P>

        <H>Certification Landscape Overview</H>
        <div style={{ overflowX: 'auto', marginBottom: 20 }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
            <thead>
              <tr style={{ background: `${C}22` }}>
                {['Category', 'Level', 'Top Certs', 'Target Roles'].map(h => (
                  <th key={h} style={{ padding: '10px 14px', textAlign: 'left', color: C, fontWeight: 700, border: `1px solid ${C}33` }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[
                ['Vendor-neutral foundational', 'Entry', 'CompTIA Security+, Google Cybersecurity, ISC2 CC', 'Helpdesk, SOC Tier 1, IT security analyst'],
                ['Vendor-neutral intermediate', 'Mid', 'CompTIA CySA+, CASP+, eJPT, CEH', 'SOC Tier 2, security analyst, junior pentester'],
                ['Offensive / Pentesting', 'Mid-Advanced', 'PNPT, OSCP, OSWE, eCPPTv2', 'Penetration tester, red team, AppSec'],
                ['Cloud security', 'Mid-Advanced', 'AWS Security Specialty, GCP PCSE, Azure SC-200', 'Cloud security engineer, DevSecOps'],
                ['Defensive / Blue team', 'Mid-Advanced', 'SC-200, AZ-500, BTL1, Splunk Core Certified', 'SOC analyst, threat hunter, IR analyst'],
                ['GRC / Management', 'Mid-Advanced', 'CISM, CRISC, ISO 27001 Lead Auditor', 'GRC analyst, security manager, compliance'],
                ['Senior / Leadership', 'Advanced', 'CISSP, CISA, CCSP', 'CISO, security architect, vCISO'],
                ['Specialised offensive', 'Advanced', 'OSED, OSMR, GXPN, OSED', 'Exploit developer, malware analyst, red team lead'],
              ].map(([cat, lvl, cert, role], i) => (
                <tr key={i} style={{ background: i % 2 === 0 ? 'transparent' : `${C}08` }}>
                  {[cat, lvl, cert, role].map((c, j) => (
                    <td key={j} style={{ padding: '9px 14px', color: 'var(--text)', border: `1px solid ${C}22`, fontSize: 13 }}>{c}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Part>

      <HR />

      <Part title="Entry-Level Certifications">
        <H>CompTIA Security+ — The Universal Entry Ticket</H>
        <P>
          Security+ is the most widely recognised entry-level security certification in the US. The US Department of Defense mandates it (DoD 8570/8140) for all personnel with access to information systems. It is frequently listed as "preferred" or "required" in junior security analyst job postings.
        </P>
        <Block>{`CompTIA Security+ SY0-701 (current exam, valid until Nov 2026):

Exam format:
  - 90 questions (multiple choice + performance-based)
  - 90 minutes
  - Passing score: 750/900
  - Cost: ~$392 USD (vouchers on sale at CompTIA store, sometimes 30-40% off)
  - No prerequisites (no required experience)
  - Validity: 3 years (renew with CEs or retake)

Domain coverage:
  1. General Security Concepts      (12%)
  2. Threats, Vulnerabilities, Mitigation (22%)
  3. Security Architecture          (18%)
  4. Security Operations            (28%)
  5. Security Program Management and Oversight (20%)

Study path (60-90 days, 1 hour/day):
  Week 1-4:  Professor Messer free course (professormesser.com) — watch all videos
  Week 5-6:  Jason Dion practice exams on Udemy (6 full practice tests)
  Week 7-8:  Focus on weak areas; Darril Gibson SY0-701 book
  Week 9:    CertMaster Labs for performance-based question practice
  Day before: Rest; review notes; sleep well

Performance-based questions (PBQs) — how to approach:
  - Drag-and-drop network diagrams, configure firewall rules, analyse logs
  - Skip PBQs first pass, answer MCQs, return to PBQs with remaining time
  - Partial credit is awarded even for incomplete PBQ answers`}
        </Block>

        <H>ISC2 Certified in Cybersecurity (CC) — Free Entry Point</H>
        <P>
          ISC2 launched the CC certification in 2022 and made the self-paced training and exam voucher free — making it the lowest-barrier entry into formal certifications. It is less recognised than Security+ in job postings but valuable as a supplement and stepping stone to CISSP.
        </P>
        <Block>{`ISC2 CC (Certified in Cybersecurity):

Cost: Free (exam voucher + self-paced course — free until supply exhausted)
      Check isc2.org for current availability
Format: 100 MCQ, 2 hours, 700/1000 passing
Validity: 3 years (9 CPE credits per year to maintain)

Domains:
  1. Security Principles
  2. Incident Response, Business Continuity, Disaster Recovery
  3. Access Controls Concepts
  4. Network Security
  5. Security Operations

Best use case: Complete CC while studying for Security+
  - CC provides conceptual foundation
  - Security+ goes deeper and is more job-market recognised
  - Both together signal commitment to the field`}
        </Block>

        <H>Google Cybersecurity Certificate — Beginner Friendly</H>
        <Block>{`Google Cybersecurity Certificate (Coursera):
  - 6 months at 7 hours/week (can go faster)
  - ~$50/month on Coursera (Financial aid available for free)
  - Covers: Linux, Python, SIEM, network security, IDS, security operations
  - Prepares for CompTIA Security+ (aligned with exam domains)
  - Practical labs included throughout

Best for: complete beginners with no IT background
Not for:  replacing Security+ for job applications — use it as prep, then take Security+`}
        </Block>

        <IQ
          q="I have no experience in cybersecurity. Which certification should I start with?"
          a="Start with Security+ — it is the most universally recognised entry-level certification in the US market, meets DoD 8570 requirements, and is specifically listed in more junior security job postings than any other cert. If budget is a constraint, do the ISC2 CC first (free) to build a conceptual foundation, then immediately move to Security+. Do not stack multiple entry-level certs — one Security+ plus a home lab project (e.g., a TryHackMe write-up or a SIEM lab in AWS) is more compelling than three certificates with no demonstrated hands-on skills. After Security+, target a role — even helpdesk with security exposure — and plan your next cert based on what you actually do in the job."
        />
      </Part>

      <HR />

      <Part title="Offensive Security Certifications">
        <P>
          Penetration testing certifications are the most respected in the offensive security field — and the hardest to fake. Most top certs require you to actually compromise systems in a lab exam, not just answer multiple choice questions. <Hl>Hiring managers in pentesting know which certs require real skill and which are memorisation exercises</Hl>.
        </P>

        <H>The Offensive Certification Path</H>
        <Block>{`Recommended offensive security certification progression:

Entry: eJPT (eLearnSecurity Junior Penetration Tester)
  - Cost: $200 (includes lab access)
  - Format: 3-day practical exam on a lab network (72 hours)
  - Prerequisites: none — good for true beginners
  - Skills: nmap, Metasploit, basic web exploitation, pivoting
  - Value: demonstrates hands-on basics; shows employers you can actually hack

Intermediate: PNPT (Practical Network Penetration Tester)
  - Provider: TCM Security (Heath Adams / The Cyber Mentor)
  - Cost: $400 (includes training course)
  - Format: 5-day practical exam + 2-day professional report writing
  - Skills: external/internal pentest, AD attacks (Kerberoasting, PtH, BloodHound)
  - Value: widely respected in the community; report requirement proves professional communication
  - Recommended: take the TCM Security Practical Ethical Hacking course first

Gold standard: OSCP (Offensive Security Certified Professional)
  - Provider: Offensive Security
  - Cost: $1,499 (Learn One subscription with 90 days lab) — check for sales
  - Format: 23h 45min practical exam + 24h report writing
  - Prerequisites: solid networking, Linux, scripting knowledge required
  - Skills: manual exploitation without Metasploit (mostly), privilege escalation, AD
  - Value: industry gold standard for penetration testing — listed in virtually all senior pentest job postings
  - Prep: complete TryHackMe OSCP path, HackTheBox Pro Labs (RastaLabs, Offshore), TCM course first

Advanced: OSWE, OSEP, OSED (specialisations)
  - OSWE: Web application exploitation (source code review, complex chains)
  - OSEP: Evasion techniques and advanced red team
  - OSED: Windows exploit development and shellcoding
  - OSCP is typically prerequisite for these

Alternative paths:
  - eCPPTv2 (eLearnSecurity): practical, respected, less expensive than OSCP
  - CRTP (Certified Red Team Professional): AD-focused, Pentester Academy
  - CRTO (Certified Red Team Operator): Cobalt Strike + C2 focused`}
        </Block>

        <H>OSCP Exam Strategy</H>
        <Block>{`OSCP exam (23h 45min, 100 points total):

Scoring structure:
  Active Directory set (3 machines): 40 points (all or nothing — must get all 3)
  Standalone machines (3 machines): 20 points each (10 initial access + 10 root)
  Passing score: 70 points

Recommended approach:
  Hour 1: Read all machine descriptions, decide attack order
  Hours 1-4: Tackle AD set first (40 points; eliminates biggest risk early)
    - Enumerate with nmap, BloodHound, enum4linux
    - Try common AD paths: Kerberoasting, AS-REP, ACL abuse
    - Note: 3 hours on AD with no progress → pivot to standalones

  Hours 4-14: Work standalone machines
    - For each: nmap → service enumeration → research CVEs → exploit → privesc
    - Don't rabbit-hole: 30 minutes without progress → next machine
    - Document EVERYTHING as you go (screenshots + commands)

  Hours 14-22: Return to stuck machines with fresh eyes
    - Read all your notes again — answers often emerge from pattern matching
    - Try simpler things first: default creds, version-specific exploits

  Hour 22-23: Review documentation, clean up screenshots
    - Verify every flag screenshot shows: flag content + proof.txt command + IP

Report (24 hours after exam):
  - Write report immediately after exam — memory is fresh
  - Use official OSCP report template
  - Include every step: command → output → explanation
  - Missing documentation = lost points (even if you got the flag)`}
        </Block>

        <Err
          title="Taking OSCP without adequate preparation"
          bad="Buy OSCP access and start the exam after only completing a few beginner boxes on HackTheBox — wasting $1,499 on a premature attempt."
          good="Prepare until you can reliably root 70% of HackTheBox machines you attempt without hints. Complete the TryHackMe OSCP prep path, work through at least 50 HackTheBox boxes (mix of Easy/Medium), and practice report writing on every machine. OSCP is designed to be hard — the preparation investment makes the difference between passing and failing."
        />
      </Part>

      <HR />

      <Part title="Defensive and Blue Team Certifications">
        <H>Blue Team Level 1 (BTL1)</H>
        <Block>{`BTL1 — Security Blue Team:
  Cost: ~$395 (training + exam included)
  Format: 24-hour practical exam — investigate a simulated incident
  Skills: SIEM triage, phishing analysis, threat hunting, digital forensics, Splunk
  Value: excellent practical blue team cert; often paired with Security+
  Prep: included course covers all exam topics; practice in labs

Best for: SOC analysts, incident responders, those pivoting from IT to security`}
        </Block>

        <H>Microsoft Certifications — SC-200 and AZ-500</H>
        <Block>{`Microsoft Security certifications (high value if your org uses Azure/M365):

SC-200: Microsoft Security Operations Analyst
  - Focuses on Microsoft Sentinel (KQL), Defender for Endpoint, Defender XDR
  - Cost: $165
  - Format: 45-60 MCQ + case studies, 2 hours
  - Value: directly marketable if target orgs use M365/Azure (most enterprises do)
  - Prep: Microsoft Learn free path + John Christopher practice tests

AZ-500: Microsoft Azure Security Engineer Associate
  - Focuses on Azure IAM, Key Vault, Defender for Cloud, network security
  - Cost: $165
  - Prerequisite: AZ-104 (Azure Administrator) knowledge recommended
  - Value: essential for cloud security roles in Azure environments

SC-300: Microsoft Identity and Access Administrator
  - Focuses on Azure AD, Conditional Access, MFA, PIM
  - Cost: $165
  - Value: pairs well with IAM-focused security roles`}
        </Block>

        <H>AWS Security Specialty</H>
        <Block>{`AWS Certified Security — Specialty (SCS-C02):
  Cost: $300
  Format: 65 questions, 170 minutes
  Prerequisites: AWS Solutions Architect Associate recommended (or equivalent experience)
  Skills: IAM advanced, KMS, CloudTrail, GuardDuty, Security Hub, Config, WAF, Shield
  Value: strong differentiator for cloud security engineer roles at AWS shops

Domains:
  1. Threat detection and incident response (14%)
  2. Security logging and monitoring (18%)
  3. Infrastructure security (20%)
  4. Identity and access management (16%)
  5. Data protection (18%)
  6. Management and security governance (14%)

Study path:
  - Stephane Maarek + Jon Bonso courses on Udemy
  - AWS Skill Builder practice exams (official)
  - ACloudGuru hands-on labs
  - Build the labs yourself: set up GuardDuty, Security Hub, Config rules in a test account`}
        </Block>

        <H>Splunk Core Certified User / Power User</H>
        <Block>{`Splunk certifications (free to cheap, high value for SOC roles):

Splunk Core Certified User:
  - Free certification (exam cost: $130, or free through Splunk training)
  - Covers: search fundamentals, SPL, dashboards, reports
  - Good foundation for any SOC role using Splunk

Splunk Core Certified Power User:
  - Builds on User cert: custom commands, subsearches, macros, lookups
  - Cost: $130

Splunk Enterprise Certified Admin:
  - For those managing Splunk infrastructure (indexers, search heads)
  - Less relevant for pure analysts

Study path:
  - Splunk free self-paced courses on splunk.com (Splunk Fundamentals 1/2)
  - Practise SPL daily: write queries for every module 31 scenario in this course
  - BOTS (Boss of the SOC) — free Splunk CTF with datasets for practise`}
        </Block>
      </Part>

      <HR />

      <Part title="Senior and Leadership Certifications">
        <H>CISSP — The Management Gold Standard</H>
        <P>
          CISSP (Certified Information Systems Security Professional) is the most recognised senior security certification globally. It is primarily a management certification — it proves broad knowledge across all security domains, not deep technical skill. Most CISO roles list it as preferred or required.
        </P>
        <Block>{`CISSP (ISC2):
  Cost: $749 (exam) + ~$150/year membership after passing
  Format: 125-175 adaptive questions, 4 hours (CAT format — adapts to your level)
  Experience requirement: 5 years in 2+ of the 8 CISSP domains
  Without experience: pass exam → become Associate of ISC2 → gain experience → upgrade to CISSP
  Validity: 3 years (120 CPE credits)

8 CISSP Domains:
  1. Security and Risk Management        (15%)
  2. Asset Security                      (10%)
  3. Security Architecture and Engineering (13%)
  4. Communication and Network Security  (13%)
  5. Identity and Access Management      (13%)
  6. Security Assessment and Testing     (12%)
  7. Security Operations                 (13%)
  8. Software Development Security       (11%)

Study resources:
  - "CISSP All-in-One Exam Guide" by Shon Harris (definitive reference — long)
  - Mike Chapple & David Seidl "CISSP Official Study Guide"
  - Destination Certification MindMaps (YouTube — free, excellent concept map approach)
  - Boson Practice Exams (hardest practice questions available — worth it)
  - (ISC)2 Official Practice Tests

CISSP exam mindset — "think like a manager":
  Most wrong answers come from thinking technically (what works?)
  Think instead: what is the best risk management decision?
  When in doubt: choose the answer that reduces risk first, then fixes technically`}
        </Block>

        <H>CISM — Security Management</H>
        <Block>{`CISM (Certified Information Security Manager) — ISACA:
  Cost: $575 (member) / $760 (non-member)
  Experience: 5 years in information security management
  Domains:
    1. Information Security Governance
    2. Information Security Risk Management
    3. Information Security Program
    4. Incident Management
  Value: strong alternative to CISSP; more management/governance focused
  Common combination: CISM for GRC/management roles + OSCP for technical credibility`}
        </Block>

        <H>CCSP — Cloud Security</H>
        <Block>{`CCSP (Certified Cloud Security Professional) — ISC2/CSA:
  Cost: $599 (exam)
  Experience: 5 years IT + 3 years information security + 1 year cloud security
  Domains:
    1. Cloud Concepts, Architecture and Design
    2. Cloud Data Security
    3. Cloud Platform and Infrastructure Security
    4. Cloud Application Security
    5. Cloud Security Operations
    6. Legal, Risk and Compliance
  Value: top cloud security management cert; pairs with CISSP for cloud-focused CISOs
  Note: CISSP holders can become CCSP with 1 year cloud experience (domain substitution)`}
        </Block>

        <IQ
          q="I want to eventually become a CISO. What certification path should I follow?"
          a="The path to CISO is built on both technical credibility and business fluency. Early career: Security+ to prove you understand the fundamentals; then get hands-on experience in SOC, IR, or engineering. Mid-career: pursue CISSP once you have 5 years of experience — it is the most universally recognised leadership cert and signals breadth of knowledge. Concurrently: build cloud skills (AWS Security Specialty or CCSP) since most CISO roles now require cloud fluency. If you want GRC credibility: add CISM or ISO 27001 Lead Auditor. The certifications matter less than the trajectory: CISOs get hired based on their track record of building and leading security programmes, surviving audits, managing incidents, and communicating risk to boards. The certs are table stakes; the leadership story is what gets you hired."
        />
      </Part>

      <HR />

      <Part title="Study Strategies and Exam Tips">
        <H>Active vs Passive Learning</H>
        <Block>{`Active learning beats passive learning 3:1 in retention:

Passive (low retention):
  - Watch video lectures without pausing
  - Read textbook without taking notes
  - Review flashcards you already know

Active (high retention):
  - Pause videos after each concept and explain it back in your own words
  - Build a lab and reproduce each concept (hands-on)
  - Do practice questions BEFORE reading the material (struggle then learn)
  - Teach a concept to a rubber duck or a study partner
  - Write your own summary after each topic — not copy/paste

Spaced repetition:
  - Review material 1 day, 3 days, 7 days, 21 days after initial study
  - Use Anki (free flashcard app with built-in spaced repetition)
  - Download community Security+ / CISSP / OSCP decks from Anki

Practice exam strategy:
  - Take a cold exam first (before studying) — baseline your knowledge
  - Review EVERY wrong answer and understand WHY it was wrong
  - Review correct answers you were unsure about — luck is not learning
  - Last week before exam: do 2 full practice exams per day
  - Target 80%+ on practice before sitting the real exam`}
        </Block>

        <H>Exam Day Checklist</H>
        <Block>{`Before exam day:
  □ Schedule exam at your peak energy time (morning for most people)
  □ Verify testing centre location OR ensure Pearson OnVUE/Proctorio tech works
  □ Bring valid photo ID (government-issued)
  □ Review exam policy: what can/cannot be brought in
  □ Sleep 8 hours — sleep is the most effective last-day study aid

Exam strategy:
  □ Read questions fully before looking at answers
  □ For 2-option ties: pick the answer that addresses the root cause, not the symptom
  □ Flag uncertain questions and return to them
  □ Do NOT change your first answer unless you have new information
     (first instinct is correct more often than second-guessing)
  □ Time management: Security+ = 60 seconds/question max
  □ Performance-based questions: skip on first pass, answer MCQs, return to PBQs

For practical exams (OSCP, PNPT, BTL1):
  □ Take thorough notes and screenshots AS YOU GO — not after
  □ Document every command and its output
  □ Include timestamp in screenshots (or note time in documentation)
  □ If stuck: take a break (15-30 min away clears the mental block)
  □ Start report template before exam ends while memory is fresh`}
        </Block>

        <H>Free and Low-Cost Study Resources</H>
        <div style={{ overflowX: 'auto', marginBottom: 20 }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
            <thead>
              <tr style={{ background: `${C}22` }}>
                {['Resource', 'Cost', 'Best For', 'URL'].map(h => (
                  <th key={h} style={{ padding: '10px 14px', textAlign: 'left', color: C, fontWeight: 700, border: `1px solid ${C}33` }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[
                ['Professor Messer', 'Free', 'Security+, Network+', 'professormesser.com'],
                ['TryHackMe', 'Free / $14/mo', 'Hands-on, all levels', 'tryhackme.com'],
                ['HackTheBox', 'Free / $14/mo', 'Intermediate-advanced pentesting', 'hackthebox.com'],
                ['PentesterLab', 'Free / $20/mo', 'Web application security', 'pentesterlab.com'],
                ['TCM Security', '$30/course', 'PNPT prep, practical hacking', 'tcm-sec.com'],
                ['Cybrary', 'Free / $59/mo', 'Wide course library, SOC/blue team', 'cybrary.it'],
                ['SANS Cyber Aces', 'Free', 'Networking/OS fundamentals', 'cyberaces.org'],
                ['OWASP', 'Free', 'Web security standards, testing guide', 'owasp.org'],
                ['Microsoft Learn', 'Free', 'Azure/M365 certs, SC-200, AZ-500', 'learn.microsoft.com'],
                ['AWS Skill Builder', 'Free / paid labs', 'AWS Security Specialty prep', 'skillbuilder.aws'],
                ['Splunk Free Training', 'Free', 'Splunk certification prep', 'splunk.com/training'],
                ['Destination Certification', 'Free (YouTube)', 'CISSP concept maps', 'youtube.com/c/DestinationCertification'],
              ].map(([r, c, b, u], i) => (
                <tr key={i} style={{ background: i % 2 === 0 ? 'transparent' : `${C}08` }}>
                  {[r, c, b, u].map((v, j) => (
                    <td key={j} style={{ padding: '9px 14px', color: 'var(--text)', border: `1px solid ${C}22`, fontSize: 13 }}>{v}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <Err
          title="Collecting certifications instead of building skills"
          bad="Stack Security+, CySA+, CEH, and CCSP back-to-back in 18 months without any hands-on lab work or job experience."
          good="One cert + one lab project + one CTF write-up beats four certs with no demonstrated skill. After Security+, spend 3-4 months on TryHackMe/HackTheBox before your next cert. Employers hiring for technical roles will ask you to demonstrate the skill in an interview — certifications without hands-on experience collapse under technical questioning."
        />

        <Err
          title="Studying only from brain dumps"
          bad="Memorise answers from exam dumps without understanding the underlying concepts — pass the multiple choice but cannot do the job."
          good="Brain dumps are a form of cheating and are prohibited by most certification bodies (they can revoke your cert). More practically, MCQ certs do not make you competent — if you pass Security+ via dumps and get a SOC job, you will struggle from day one. Study to understand, not to pass. The cert is the byproduct; the knowledge is the goal."
        />

        <ProTip>Employer reimbursement: most Fortune 500 companies reimburse employees for certification exam fees — often $1,000-$5,000 per year. If you are already employed, check your HR portal before paying out of pocket. Many also pay for training courses and lab subscriptions.</ProTip>
      </Part>

      <HR />

      <Part title="Career Paths by Role">
        <H>SOC Analyst Path</H>
        <Block>{`SOC Analyst career progression:

Tier 1 — Alert triage (entry):
  Target cert: Security+ → BTL1
  Core skills: SIEM queries, phishing analysis, alert triage, basic networking
  Salary range: $55,000 - $75,000 (US, entry level)

Tier 2 — Investigation and response (1-3 years):
  Target cert: SC-200, CySA+, Splunk Power User
  Core skills: threat hunting, DFIR basics, malware analysis, custom detection rules
  Salary range: $75,000 - $100,000

Tier 3 — Threat hunter / IR lead (3-7 years):
  Target cert: GCIH (SANS), Splunk Enterprise, CCSP
  Core skills: advanced hunting, incident command, threat intelligence
  Salary range: $100,000 - $130,000

Management — SOC Manager / Security Manager:
  Target cert: CISM or CISSP
  Core skills: team management, metrics, vendor management, executive reporting
  Salary range: $130,000 - $180,000`}
        </Block>

        <H>Penetration Tester Path</H>
        <Block>{`Penetration Tester career progression:

Junior Pentester (entry, 0-2 years):
  Target cert: eJPT → PNPT
  Core skills: nmap, Metasploit, web exploitation, report writing
  Portfolio: TryHackMe/HackTheBox write-ups, lab documentation
  Salary range: $70,000 - $90,000

Mid-level Pentester (2-5 years):
  Target cert: OSCP (required at most shops), eCPPTv2
  Core skills: AD attacks, manual exploitation, custom tooling, client management
  Salary range: $90,000 - $130,000

Senior Pentester / Red Team (5+ years):
  Target cert: OSEP, OSWE, CRTO, GPEN
  Core skills: C2 framework ops, evasion, advanced web, full red team ops
  Salary range: $130,000 - $180,000+

Red Team Lead / Principal:
  Target cert: CISSP or CISM for management track
  Core skills: programme ownership, threat intelligence integration, purple team leadership
  Salary range: $160,000 - $220,000+`}
        </Block>

        <H>Cloud Security Engineer Path</H>
        <Block>{`Cloud Security Engineer career progression:

Junior Cloud Security (1-3 years, often from DevOps/SysAdmin):
  Target cert: AWS SAA (Solutions Architect Associate) → AWS Security Specialty
  Core skills: IAM, security groups, CloudTrail, CSPM basics
  Salary range: $90,000 - $120,000

Mid Cloud Security Engineer (3-6 years):
  Target cert: AWS Security Specialty + CKS (Certified Kubernetes Security Specialist)
  Core skills: IaC security (Checkov/tfsec), container security, runtime monitoring
  Salary range: $120,000 - $160,000

Senior Cloud Security Architect (6+ years):
  Target cert: CCSP, possibly CISSP
  Core skills: multi-cloud strategy, zero trust architecture, security programme design
  Salary range: $160,000 - $200,000+`}
        </Block>

        <IQ
          q="I have a Computer Science degree but no security experience. How do I break into cybersecurity?"
          a="Three parallel tracks, all at once. First, certifications: Security+ to prove baseline security knowledge — CS degree already gives you most of the prerequisite understanding. Second, practical skills: spend 2-3 hours per week on TryHackMe (start with the Pre-Security path, then SOC Level 1 or Jr Penetration Tester paths). Document everything you learn — write-ups of rooms you complete become portfolio pieces. Third, networking: join local ISSA, OWASP, or DEF CON chapters; attend local BSides conferences (often free or cheap); connect with security professionals on LinkedIn and ask for informational interviews — not job referrals, just learning conversations. The CS degree gives you a significant advantage in understanding technical concepts. Apply for junior roles after 3-4 months — entry-level security, IT support with security exposure, or DevSecOps if you have software development experience. Your first job does not need to be ideal; it needs to exist."
        />
      </Part>

      <HR />

      <KeyTakeaways items={[
        'Certifications open doors — especially in federal, defence, and enterprise markets — but demonstrate skill through labs, CTFs, and write-ups to survive the technical interview.',
        'For US entry-level roles, CompTIA Security+ is the most impactful first certification: DoD 8570 compliant, widely listed in job postings, vendor-neutral.',
        'Offensive certs are hard to fake: eJPT → PNPT → OSCP is the proven practical pentesting path; OSCP is the gold standard listed in nearly all senior pentest job postings.',
        'OSCP exam strategy: tackle the Active Directory set first (40 points, all-or-nothing) then work standalone machines; document every command and screenshot as you go.',
        'For blue team/SOC roles, BTL1 combined with SC-200 (Microsoft Sentinel) provides strong practical and vendor-specific skills that align with most enterprise environments.',
        'CISSP is the senior leadership cert: pass it thinking like a risk manager and business leader, not a technical implementer — "what reduces risk?" not "what technically works?"',
        'Active learning retains 3x more than passive: practise in a lab, teach concepts back to yourself, and do practice questions before reading the material.',
        'Exam dumps are unethical and counterproductive — they let you pass without understanding, which means you fail on the job; study to understand, not to pass.',
        'Check employer reimbursement programmes before paying for certifications — most Fortune 500 companies reimburse $1,000-$5,000 per year in professional development.',
        'No single certification makes a career: one cert + one lab project + one CTF write-up + one networking conversation is more powerful than four certs with no demonstrated hands-on skill.',
      ]} />

      <Callout type="info">
        <strong>Up Next — Module 38: Bug Bounty Hunting</strong><br />
        Module 38 teaches you to earn money finding real vulnerabilities. You will learn how to choose the right programmes, set up an efficient recon workflow, escalate discoveries into valid high-severity reports, and build a bug bounty reputation on HackerOne and Bugcrowd — from first submission to consistent payouts.
      </Callout>

    </LearnLayout>
  )
}
