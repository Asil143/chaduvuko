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
const ProTip = ({ children }: { children: React.ReactNode }) => (
  <div style={{ background: '#0a1628', border: '1px solid #1e40af', borderRadius: 8, padding: '12px 16px', marginBottom: 16, fontSize: 14, color: '#93c5fd', lineHeight: 1.8 }}>
    <span style={{ fontWeight: 700 }}>Pro Tip: </span>{children}
  </div>
)

export default function Module40() {
  return (
    <LearnLayout
      title="Interview Prep — Landing Your First Security Job"
      description="40 modules of knowledge meets the hiring process. Master technical and behavioural security interviews, position yourself effectively, negotiate your offer, and build the professional network that accelerates your entire career."
      section="Cybersecurity — Module 40"
      readTime="40 min"
      updatedAt="May 2026"
    >

      <Part title="The Security Job Market">
        <P>
          The US cybersecurity workforce shortage exceeds 500,000 open positions. Demand dramatically outstrips supply — which means qualified candidates, even entry-level ones, are in a strong negotiating position. The challenge is not that jobs do not exist; it is standing out in a field where everyone lists the same certifications.
        </P>
        <P>
          The most important insight: <Hl>hiring managers are not looking for someone who knows everything — they are looking for someone who can learn, can communicate, and has demonstrated they take security seriously</Hl>. Hands-on labs, CTF write-ups, and thoughtful answers to technical questions signal this far better than a certification list.
        </P>

        <H>Job Titles and What They Mean</H>
        <div style={{ overflowX: 'auto', marginBottom: 20 }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
            <thead>
              <tr style={{ background: `${C}22` }}>
                {['Title', 'Core Responsibilities', 'Entry Level?', 'Typical Salary Range (US)'].map(h => (
                  <th key={h} style={{ padding: '10px 14px', textAlign: 'left', color: C, fontWeight: 700, border: `1px solid ${C}33` }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[
                ['SOC Analyst (Tier 1)', 'Alert triage, escalation, basic investigation', 'Yes', '$55,000–$75,000'],
                ['SOC Analyst (Tier 2)', 'Incident investigation, threat hunting, custom detections', 'Near-entry (1-3 yr)', '$75,000–$100,000'],
                ['Security Analyst', 'Vulnerability management, compliance support, security reviews', 'Yes', '$65,000–$90,000'],
                ['Penetration Tester / Jr Pentester', 'Authorised attacks on client systems, report writing', 'Near-entry (1-2 yr)', '$70,000–$100,000'],
                ['Application Security Engineer', 'SAST/DAST pipelines, code review, secure SDLC', 'Mid (2-4 yr)', '$100,000–$150,000'],
                ['Cloud Security Engineer', 'Cloud posture management, IAM, DevSecOps', 'Mid (2-4 yr)', '$110,000–$160,000'],
                ['Security Engineer', 'Build security tooling and automation, detection engineering', 'Mid (3-5 yr)', '$120,000–$170,000'],
                ['Incident Responder / DFIR', 'Investigate and contain breaches, forensics', 'Mid (2-4 yr)', '$85,000–$130,000'],
                ['GRC Analyst', 'Compliance frameworks, risk assessments, audits', 'Yes (compliance bg)', '$65,000–$100,000'],
                ['Security Architect', 'Design enterprise security architectures', 'Senior (7+ yr)', '$150,000–$220,000'],
                ['CISO', 'Lead the security programme, report to board', 'Senior (10+ yr)', '$200,000–$400,000+'],
              ].map(([t, r, e, s], i) => (
                <tr key={i} style={{ background: i % 2 === 0 ? 'transparent' : `${C}08` }}>
                  {[t, r, e, s].map((c, j) => (
                    <td key={j} style={{ padding: '9px 14px', color: 'var(--text)', border: `1px solid ${C}22`, fontSize: 13 }}>{c}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <H>Where to Find Jobs</H>
        <Block>{`Job search channels (prioritised):

1. LinkedIn Jobs — most security roles are posted here
   - Set up alerts for: "security analyst", "SOC analyst", "penetration tester"
   - Location: remote OR your target city
   - Date posted: "past week" (new postings only)

2. Direct company career pages
   - Big tech (Google, Microsoft, Amazon, Meta) — high comp, competitive
   - Government contractors (Booz Allen, Leidos, SAIC, MITRE) — often DoD clearance
   - Financial sector (JPMorgan, Goldman, Citibank) — strong security teams
   - Consulting (Deloitte, PwC, Big4) — fast learning, variety of clients

3. Job boards:
   - CyberSecJobs.com — security-specific
   - SecurityClearanceJobs.com — cleared roles
   - Indeed / Dice — broad coverage
   - USAJobs.gov — US federal government positions

4. Community referrals (most effective):
   - ISSA (Information Systems Security Association) local chapters
   - OWASP chapter events
   - BSides conferences
   - DEF CON, Black Hat hiring villages

5. LinkedIn networking (proactive outreach):
   - Message security professionals at target companies
   - "Informational interview" ask — not "do you have a job for me?"
   - Attend virtual meetups and comment thoughtfully on posts`}
        </Block>
      </Part>

      <HR />

      <Part title="Resume and Portfolio">
        <H>Security Resume Structure</H>
        <Block>{`Security resume format (1 page, ATS-optimised):

[Name] | [City, State] | [Email] | [LinkedIn] | [GitHub]

SUMMARY (3 sentences — tailor to job description):
  Security-focused [role] with hands-on experience in [relevant skills].
  Built [specific lab/project] demonstrating [relevant capability].
  Seeking [role] to [contribution to team].

CERTIFICATIONS (near top — this is what recruiters filter on first):
  CompTIA Security+ (SY0-701) — 2026
  eJPT — INE Security — 2026
  [Target your next cert here too as "In Progress"]

TECHNICAL SKILLS:
  Offensive: nmap, Metasploit, Burp Suite, CrackMapExec, BloodHound
  Defensive: Splunk SPL, Microsoft Sentinel KQL, Sysmon, Suricata
  Cloud: AWS IAM, CloudTrail, GuardDuty, Security Hub
  Languages: Python (scripting/automation), PowerShell, Bash

PROJECTS / HOME LAB (the key differentiator):
  Active Directory Attack and Detection Lab — 2026
    - Built 4-VM Windows AD environment with intentional misconfigurations
    - Executed Kerberoasting, Pass-the-Hash, and DCSync attack chains
    - Deployed ELK SIEM with Sysmon telemetry; wrote detection rules for each attack
    - GitHub: github.com/yourname/ad-lab-writeups

  TryHackMe / HackTheBox (top X% of users):
    - Completed [N] rooms / [N] machines including [specific notable ones]
    - Write-ups at github.com/yourname/ctf-writeups

WORK EXPERIENCE:
  [Most recent first. Include any IT experience — helpdesk counts.]
  [Quantify: "reduced MTTR from 45 to 12 minutes", "triaged 200+ alerts/week"]
  [Even if not security: "implemented MFA rollout for 300 users" is relevant]

EDUCATION:
  [Degree, if any] — Institution — Year
  [Relevant coursework if recent graduate]`}
        </Block>

        <H>GitHub Portfolio — What to Include</H>
        <Block>{`Impactful GitHub portfolio for security roles:

1. Lab write-ups (most important):
   Repo: ad-lab-writeups
   Content: Step-by-step documentation of AD attack chains you executed
   Format: Markdown with screenshots, commands, and SIEM detection queries
   Message: "I don't just read about attacks — I run them and build detections"

2. Security tools / scripts:
   Repo: security-scripts
   Content: Python/Bash scripts you wrote for automation tasks
   Examples: SIEM alert enrichment script, IOC lookup tool, log parsing utility
   Message: "I can code and automate security operations"

3. CTF write-ups:
   Repo: ctf-writeups
   Content: Walkthroughs of CTF challenges you solved
   Message: "I continuously practice on novel problems"

4. Detection rules:
   Repo: detection-library
   Content: Sigma rules or Splunk/KQL queries you developed
   Message: "I understand attacker behaviour at a technical level"

README quality matters:
  Every repo needs: purpose, setup instructions, what you learned
  Bad: empty repo, no README, single commit
  Good: clear README, commit history showing work over time, linked to portfolio`}
        </Block>

        <ProTip>Put your LinkedIn profile and GitHub URL prominently at the top of your resume. Before submitting any application, Google yourself — check that your LinkedIn and GitHub are up-to-date, public, and show the same story as your resume. Many recruiters check LinkedIn before reading the resume attachment.</ProTip>
      </Part>

      <HR />

      <Part title="Technical Interview Questions — Fundamentals">
        <P>
          Technical security interviews test whether you understand concepts at a level that lets you do the job, not whether you have memorised every RFC. Explain clearly, use specific examples from your lab work, and connect technical details to their security impact.
        </P>

        <IQ
          q="Explain what happens when you type a URL into a browser and hit Enter. What are the security considerations at each step?"
          a="DNS resolution first: browser queries a DNS resolver to convert the hostname to an IP. Security risk: DNS hijacking or poisoning could redirect to a malicious server — DNSSEC and DoH mitigate this. TCP three-way handshake: SYN, SYN-ACK, ACK establishes the connection. TLS handshake: certificate presented, validated against trusted CA chain, session keys negotiated. Security risks: expired cert, weak cipher suite, HSTS bypass, certificate substitution by a MITM. HTTP request sent over encrypted tunnel: Host header, cookies, and session tokens transmitted. Security risks: CSRF if tokens lack SameSite, session hijacking if cookie lacks Secure and HttpOnly flags. Server processes request, returns response. Security risks: reflected XSS in response, clickjacking if X-Frame-Options missing. Browser renders HTML, executes JavaScript. Security risks: DOM-based XSS, malicious third-party scripts (supply chain), CSP bypass. Each step has an attack surface — defence in depth means controls at DNS, TLS, HTTP headers, application logic, and browser security policies."
        />

        <IQ
          q="What is the difference between symmetric and asymmetric encryption? When do you use each?"
          a="Symmetric encryption uses the same key for encryption and decryption — it is fast but requires both parties to securely share the key in advance. AES-256 is the standard symmetric algorithm — used for encrypting data at rest (databases, disk encryption) and data in transit once a session is established. Asymmetric encryption uses a mathematically linked key pair — public key encrypts, private key decrypts (or private key signs, public key verifies). It solves the key distribution problem: you can share your public key openly without compromising security. RSA and ECDSA are the main asymmetric algorithms. In practice they are always used together: TLS uses asymmetric (RSA or ECDH) to securely exchange a symmetric session key, then uses that symmetric key for the bulk of data encryption — getting the security benefits of both without the performance cost of encrypting everything asymmetrically."
        />

        <IQ
          q="What is the CIA triad? Give a real-world example of a violation of each."
          a="CIA stands for Confidentiality, Integrity, and Availability — the three core properties that information security aims to protect. Confidentiality: preventing unauthorised access to information. Violation: an attacker exfiltrates a database containing user email addresses and passwords — the data is read by someone who should not have access. Integrity: ensuring data is not modified in an unauthorised or undetected way. Violation: an attacker gains write access to a financial application and modifies transaction records — the data has been tampered with. Availability: ensuring systems and data are accessible to authorised users when needed. Violation: a ransomware attack encrypts all files on a hospital's servers — clinical staff cannot access patient records during a medical emergency. Most attacks target multiple properties simultaneously — ransomware attacks both integrity (encrypts files) and availability (makes them inaccessible)."
        />

        <IQ
          q="Explain TCP vs UDP. When would an attacker prefer each?"
          a="TCP (Transmission Control Protocol) is connection-oriented: it establishes a connection with a three-way handshake, guarantees ordered and reliable delivery, and handles retransmission of lost packets. UDP (User Datagram Protocol) is connectionless: it sends packets without establishing a connection, no guarantee of delivery or order, much lower overhead. Attackers prefer UDP for initial scanning and exfiltration in some scenarios: UDP ports are often less monitored than TCP, DNS (UDP 53) and NTP (UDP 123) are widely allowed through firewalls, and UDP is used for DNS tunneling as a covert channel. Attackers prefer TCP for reliable data exfiltration, established C2 channels (where packet loss would break the connection), and attacks that require a reliable connection like reverse shells. Defenders should: monitor UDP traffic for anomalies (DNS tunneling has long queries), block unused UDP services at the firewall, and inspect UDP traffic in IDS rules."
        />

        <IQ
          q="What is a SQL injection attack? How do you prevent it?"
          a="SQL injection occurs when untrusted user input is incorporated into a database query without proper sanitisation, allowing an attacker to manipulate the query logic. Classic example: a login form that builds a query as string concatenation — if the username field accepts 'admin' OR '1'='1' -- the query becomes SELECT * FROM users WHERE username='admin' OR '1'='1' -- AND password='anything', which returns the admin user without knowing the password. The single quotes end the string literal and the comment sequence (--) discards the rest of the query. Prevention has two layers. Primary: parameterised queries (prepared statements) — the query structure is sent to the database separately from the data, so user input can never modify the query structure. Secondary: stored procedures, input validation (allowlist), output encoding, least-privilege database accounts, and WAF rules. Never build SQL queries by string concatenation. The parameterised approach works in every language: Python's psycopg2 cursor.execute('SELECT * FROM users WHERE id = %s', (user_id,)), Java's PreparedStatement, Node's pg library with $1 placeholders."
        />
      </Part>

      <HR />

      <Part title="Technical Interview Questions — Role-Specific">
        <H>SOC Analyst Questions</H>

        <IQ
          q="Walk me through how you would triage a high-severity alert for a possible data exfiltration event."
          a="Start by understanding the alert before doing anything else — what data source triggered it, what threshold was crossed, and what the normal baseline looks like for this asset. Step one: understand the context. Which user and which host? Is this a high-value system (PCI in-scope, HR data)? When did the anomaly start? Step two: gather evidence. Pull authentication logs for the past 24 hours for that account. Check EDR for running processes and network connections. Look at proxy/firewall logs for the destination IP/domain — is it newly registered, a known-bad IOC, or a legitimate cloud service? Check data volume: how much was transferred? Step three: determine scope. Has this account been used from any other hosts? Are there lateral movement indicators? Step four: decide. If this is a benign confirmed activity — close with documentation. If confirmed malicious — escalate to incident, isolate the host, notify the IR team. If uncertain — escalate to Tier 2 with all evidence gathered. Never close an ambiguous high alert without escalation documentation."
        />

        <IQ
          q="What are the most important Windows Event IDs to monitor in a SOC?"
          a="Prioritise by attack phase. For initial access and authentication: 4624 (successful logon) with attention to logon type 3 (network) and unusual source IPs; 4625 (failed logon) for brute force patterns; 4648 (logon with explicit credentials — credential reuse). For privilege escalation: 4672 (special privileges assigned) indicating admin/system access; 4698 (scheduled task created) for persistence. For lateral movement: 4624 type 3 from internal source IPs; 7045 (service installed) — often PsExec installs PSEXESVC; 5140 (network share access to ADMIN$ or C$). For credential access: Sysmon Event 10 (LSASS process access) for Mimikatz indicators. For persistence: 4698/4702 (task created/modified); registry run key changes (Sysmon 13). For impact: spikes in 4663 (object access) indicating ransomware file modification. These 10-15 event IDs, when tuned with context, cover the most critical attack techniques in the MITRE ATT&CK Enterprise matrix."
        />

        <H>Penetration Tester Questions</H>

        <IQ
          q="Describe your methodology for an external network penetration test."
          a="I follow a five-phase structure. Reconnaissance: passive first — crt.sh for subdomains via certificate transparency, Shodan for internet-exposed services, theHarvester for email addresses, GitHub for leaked credentials or internal hostnames. I map the full attack surface before touching a single endpoint. Scanning: nmap SYN scan of all discovered IPs, full port range on targets of interest, service version detection, and NSE scripting for known vulnerabilities. I also run Nuclei against discovered web services for quick wins. Enumeration: for each service, enumerate further — gobuster for web directories, API endpoint discovery, technology fingerprinting, authentication mechanism assessment. Exploitation: target the highest-confidence, highest-impact findings first. I prefer manual exploitation to automated scanners — understand the vulnerability before running an exploit. Document every step with command output and screenshots. Post-exploitation: upon gaining a foothold, assess impact — what data can I access, what systems can I reach? This determines the actual risk narrative in the report. Reporting: document every finding with CVSS score, proof of concept, business impact, and remediation guidance. The report is the deliverable, not the exploitation."
        />

        <IQ
          q="You find a SQL injection vulnerability during a pentest. What do you do next?"
          a="Establish the minimal proof of concept needed to demonstrate the vulnerability, then stop. I do not need to dump the entire database to prove SQL injection is present and impactful. In a real pentest, I would: confirm the injection with a boolean-based or time-based payload that does not modify any data, document the exact request, response, and payload, note the type of SQL injection and the database version if determinable from error messages, and assess what data is accessible from the vulnerable query's context. I would then report it with a severity rating based on what data is exposed and how. I would NOT run sqlmap --dump against production data — extracting real customer data goes beyond proof-of-concept and is explicitly prohibited in most engagement Rules of Engagement. If the client wants me to demonstrate data access impact, I would ask explicitly for permission and use test data only."
        />

        <H>Cloud Security Engineer Questions</H>

        <IQ
          q="An AWS S3 bucket containing customer data was publicly accessible for 48 hours before being discovered. What do you do?"
          a="This is an active incident. Immediate containment first: remove the public access block immediately — aws s3api put-public-access-block with BlockPublicAcls, IgnorePublicAcls, BlockPublicPolicy, and RestrictPublicBuckets all set to true. Then revoke any bucket ACLs granting public access. Now investigate scope: pull S3 access logs for the 48-hour window — who accessed the bucket, what objects were accessed, what IPs made requests? CloudTrail shows configuration changes — when did it become public, who made that change, was it accidental or malicious? Determine what data was in the bucket: classify it (PII, financial, PHI?), count the records. If customer personal data was accessed by unauthorised parties, this is likely a reportable breach — notify Legal immediately (GDPR 72-hour clock, state breach laws). Remediation: implement SCPs to prevent public S3 buckets organisation-wide, enable AWS Config rule s3-bucket-public-read-prohibited with auto-remediation, enable Macie for ongoing sensitive data detection. Post-incident review: how did this happen, who has permission to make buckets public, and what detective control should have caught this sooner?"
        />

        <IQ
          q="What is the difference between an IAM role and an IAM user in AWS? When should you use each?"
          a="An IAM user is a persistent identity with long-term credentials — an access key ID and secret access key. It represents a specific person or application and credentials do not change until manually rotated. An IAM role is an identity with temporary credentials — assumed by a principal (EC2 instance, Lambda function, another account, a person via SSO) and the credentials are automatically rotated every hour. Best practice: use roles for everything programmatic. An EC2 instance should assume a role to access S3 — never embed access keys in code or metadata. A Lambda function should assume a role for DynamoDB access. A CI/CD pipeline should use OIDC federation to assume a role — no long-lived keys stored anywhere. IAM users are only appropriate for: legacy systems that cannot use roles, break-glass root-account emergency access, or service accounts with no OIDC support. In any modern AWS environment, the goal is zero long-lived access keys: eliminate IAM users in favour of SSO + roles for humans and instance profiles + roles for workloads."
        />
      </Part>

      <HR />

      <Part title="Behavioural Interview Questions">
        <P>
          Behavioural questions assess how you handle real situations — conflict, mistakes, learning, and collaboration. Use the <Hl>STAR method</Hl>: Situation (set the context briefly), Task (what was your responsibility), Action (what did you specifically do), Result (what was the outcome).
        </P>

        <IQ
          q="Tell me about a time you identified a security vulnerability. What did you do?"
          a="Use your home lab or CTF experience if you lack professional examples. Example: 'During a HackTheBox challenge, I identified an IDOR vulnerability where the application failed to verify that the authenticated user owned the resource being requested. [Situation: testing a simulated web application] My task was to map the attack surface and identify authentication/authorisation weaknesses. [Task] I created two test accounts, made a request as Account A to access a resource created by Account B by incrementing the ID in the request, and confirmed the server returned Account B's data with a 200 OK response. I documented the exact request, payload, and response, noted the potential real-world impact — access to all users' private data — and wrote up the finding with CVSS scoring and a suggested remediation: server-side ownership verification before returning resource data. [Action] The write-up helped me understand IDOR mechanics deeply enough that I could explain it in detail and identify similar patterns in real applications. [Result]' Adapt to your actual experience — a lab finding is a legitimate answer for an entry-level role."
        />

        <IQ
          q="Tell me about a time you had to explain a technical security concept to a non-technical audience."
          a="If you have any experience — tutoring, a student project presentation, explaining something to a family member — use it. Example: 'A manager at a part-time IT support role asked me to explain to the team why we were rolling out MFA. [Situation] I needed to make the business case for the inconvenience without losing the audience in technical jargon. [Task] I used an analogy: your ATM card requires both the card (something you have) AND a PIN (something you know) — if a thief steals just the card, they cannot withdraw cash. MFA applies the same principle to your email account. Even if someone steals your password, they cannot log in without the second factor. I kept it to three sentences, showed a 30-second demo of the approval notification, and let them ask questions. [Action] The rollout had 95% adoption within two days instead of the expected two weeks. [Result]' The key is showing that you tailored the communication to the audience, not just repeated the technical explanation more slowly."
        />

        <IQ
          q="Describe a situation where you had to learn something new quickly under pressure."
          a="Security requires constant learning — this question tests whether you are an independent learner. Example: 'During a CTF competition, I encountered a binary exploitation challenge involving a format string vulnerability — a technique I had studied briefly but never applied hands-on. [Situation] I had four hours to solve it. [Task] I spent the first 30 minutes reviewing the pwntools documentation on fmtstr_payload, set up a local debug environment with GDB and pwndbg, and worked through the exploit step by step — first understanding the stack layout, then identifying the format string offset, then crafting the payload. I used the CTF Discord to find a conceptual hint without spoiling the full solution. I got it working in 2.5 hours and spent the remaining time improving my exploit to be more reliable. [Action] Solved the challenge, wrote a detailed write-up explaining my learning process for my GitHub portfolio. [Result]' This shows research skills, resourcefulness, and resilience — all critical for a security role."
        />

        <IQ
          q="Tell me about a time you disagreed with a teammate or manager about a security decision."
          a="Frame disagreements as professional, evidence-based advocacy — not stubbornness. Example: 'During a group project, a teammate wanted to store API keys directly in the application code for simplicity. [Situation] I was responsible for the application security review. [Task] I explained the risk: if the code was ever shared, committed to version control, or leaked, those keys would be permanently compromised. I suggested a two-line alternative: read keys from environment variables instead. I offered to implement it myself in five minutes rather than just raising the concern. [Action] They agreed once they understood the risk was real and the fix was trivial. We also set up a gitleaks pre-commit hook to prevent future accidental commits of secrets. [Result]' The key elements: you raised the concern with evidence, proposed a solution, did not make it personal, and got a better outcome than if you had either stayed silent or dug in stubbornly."
        />
      </Part>

      <HR />

      <Part title="Questions to Ask the Interviewer">
        <P>
          The questions you ask reveal as much about you as your answers. Thoughtful questions signal genuine interest, preparation, and strategic thinking. Generic questions ("What is the company culture like?") signal you did not prepare.
        </P>

        <Block>{`High-signal questions to ask:

About the security programme:
  "What does your current detection coverage look like, and where are the biggest gaps?"
  "How does the security team engage with engineering teams — is it a gate or a partnership?"
  "What was the most interesting incident or investigation the team handled in the past year?"
  "How is the security team resourced relative to the company's attack surface?"

About the role and growth:
  "What would success look like in this role after 90 days?"
  "What are the most common ways someone in this role grows into more senior responsibilities?"
  "What tooling does the team use, and is there appetite to evaluate alternatives?"

About the team:
  "How does the team stay current on threat intelligence and new attack techniques?"
  "What does the on-call rotation look like for this role?"
  "How is cross-functional collaboration handled — especially with engineering and legal?"

About the interview process:
  "What are the next steps in the process and what is the expected timeline?"

Questions to AVOID:
  "What does your company do?" (do your homework first)
  "How much vacation do I get?" (save for after offer)
  "Can I work remotely?" (save for after offer, or already answered in job posting)
  "What does this job pay?" (let them bring it up first, or address after offer)`}
        </Block>
      </Part>

      <HR />

      <Part title="Offer Negotiation and Career Planning">
        <H>Salary Negotiation for Security Roles</H>
        <Block>{`Salary negotiation framework:

Step 1 — Research before interviewing:
  Use: Levels.fyi, Glassdoor, LinkedIn Salary, Burroughs/comp data
  For security roles: check H1B visa disclosure data (public, shows exact salaries)
  Target: know the 25th, 50th, and 75th percentile before negotiating

Step 2 — Let them make the first offer:
  If asked your expectations early: "I am focused on finding the right fit
  and trust you have a competitive range — what does the budget look like?"
  If pressed: "Based on my research, I am targeting $X-Y range"

Step 3 — When the offer comes:
  Never accept on the spot — "I am very excited about this opportunity.
  Can I have 48-72 hours to review the full package?"
  Review: base, bonus, equity/RSUs, benefits, PTO, remote policy, 401k match

Step 4 — Counter with a specific number:
  "I am very excited to join. Based on my research into market rates
  for this role and my background in [specific relevant skill],
  I was hoping we could get to $X. Is there flexibility?"
  Counter 10-20% above their offer — they expect it

Step 5 — Non-salary levers (when base is fixed):
  - Sign-on bonus ("Can we add a sign-on bonus to bridge the gap?")
  - Additional PTO days
  - Remote work flexibility
  - Professional development budget (cert reimbursement, conference attendance)
  - Earlier performance review (6 months instead of 12)
  - Title adjustment ("Senior Analyst" instead of "Analyst")`}
        </Block>

        <H>The First 90 Days</H>
        <Block>{`What to do in your first 90 days in a security role:

Days 1-30 — Listen and learn:
  - Meet every team member — understand their role and what they own
  - Read every policy, runbook, and procedure document
  - Understand the incident history — what happened last year?
  - Map the tech stack: what SIEM, EDR, vulnerability scanner, and ticketing tools?
  - Do NOT make major recommendations yet — you do not have context

Days 31-60 — Contribute:
  - Take on escalations without waiting to be asked
  - Fix one small thing that has been bothering the team (broken alert, outdated runbook)
  - Shadow senior team members on investigations
  - Start tracking your own metrics: how many alerts triaged, MTTR on your tickets

Days 61-90 — Build:
  - Identify one gap you can own: a missing detection rule, an untested playbook
  - Propose an improvement with data: "I noticed we have X false positives per week
    on this rule — here is a tuning suggestion that would reduce it by 60%"
  - Establish your reputation: reliable, curious, communicates proactively

30-60-90 day plan in interview context:
  If asked "what would you do in your first 90 days?":
  This framework is your answer — learn first, contribute second, build third.
  Interviewers love candidates who do not plan to "fix everything" on day one.`}
        </Block>

        <H>Building Your Professional Network</H>
        <Block>{`Networking that actually leads to opportunities:

Community involvement (highest ROI):
  - Attend local ISSA/OWASP chapter meetings — monthly, usually free
  - Volunteer at BSides conferences (free admission, meet everyone)
  - Attend DEF CON (Las Vegas, August) — largest hacker conference globally
  - Join CTF teams — you meet people through competitions
  - Discord servers: TryHackMe, HackTheBox, TCM Security, BHIS communities

LinkedIn strategy (active, not passive):
  - Post once per week: a lab finding, a technique you learned, a CTF write-up
  - Comment thoughtfully on security professionals' posts — not just "great post!"
  - Connect with people after events with a personalised note ("We met at BSides X")
  - Write recommendations for people who helped you — they often reciprocate

Informational interviews:
  - Message 2-3 security professionals per week:
    "I am transitioning into security from [background]. I would love 15 minutes
    to learn about your path and what you wish you had known starting out."
  - People love talking about their careers — most say yes
  - Do NOT ask for a job referral on first contact

Mentorship:
  - Identify one more-senior person willing to meet monthly
  - Bring specific questions; do not waste their time with generalities
  - ISSA and local chapters often have formal mentorship programmes`}
        </Block>

        <IQ
          q="I have been applying to entry-level security jobs for three months with no interviews. What am I doing wrong?"
          a="Three possibilities, in order of likelihood. First, resume filtering: your resume is not getting past the ATS (applicant tracking system) or the first 10-second human scan. Check that your resume includes keywords from the job description verbatim — ATS systems match on exact terms. 'Security+' is better than 'CompTIA certification.' Make sure your certifications are prominent, near the top. Second, the gap between your profile and what is listed: many entry-level job postings list '2-3 years experience required' — this is aspirational, not disqualifying. Apply anyway and include a cover letter addressing how your lab work and certifications compensate for formal experience. Third, no differentiation: if your resume shows only Security+ and no lab work or demonstrated skills, you look identical to hundreds of other applicants. Add a projects section with your home lab description and any CTF write-ups. Even one write-up posted on GitHub and linked in your resume creates differentiation. If the first two are addressed and you are still not getting interviews after 50+ applications, your network is likely more powerful than more applications — focus on community involvement and direct outreach."
        />
      </Part>

      <HR />

      <KeyTakeaways items={[
        'Cybersecurity has a 500,000+ open position gap in the US — demand dramatically exceeds supply, putting qualified entry-level candidates in a strong position.',
        'Hiring managers look for demonstrated learning ability, communication skills, and evidence of taking security seriously — not encyclopedic knowledge.',
        'A home lab write-up demonstrating AD attacks and SIEM detection rules outweighs a second certification for most entry-level technical roles.',
        'Tailor your resume to each job description using the exact keywords from the posting — ATS systems filter on exact term matches before a human ever reads it.',
        'For behavioural questions, use the STAR method: Situation (brief context), Task (your responsibility), Action (what you specifically did), Result (outcome with specifics).',
        'The questions you ask interviewers signal as much as your answers — ask about detection coverage gaps, team dynamics, and growth paths; never ask about salary or PTO in first rounds.',
        'Never accept an offer on the spot — take 48-72 hours to review the full package, research market rates, and prepare a specific counter-offer (typically 10-20% above the initial offer).',
        'The first 90 days formula: listen and learn (days 1-30), contribute reliably (days 31-60), identify and own one improvement (days 61-90) — never recommend sweeping changes before you have context.',
        'Networking yields jobs more reliably than job board applications — community involvement (BSides, ISSA, OWASP), thoughtful LinkedIn engagement, and informational interviews open doors that applications cannot.',
        'This is not the end — the best security professionals commit to learning continuously. Every module in this course is a foundation; the field changes faster than any curriculum can track. Stay curious, stay in the lab, and stay connected to the community.',
      ]} />

      <Callout type="info">
        <strong>You Have Completed the Cybersecurity Course</strong><br />
        You have covered 40 modules spanning the full spectrum of modern cybersecurity — from TCP/IP fundamentals through advanced Active Directory attacks, from SIEM detection engineering to compliance frameworks, from CTF skills to professional interview preparation. The knowledge is yours. Now build the lab, earn the cert, write the write-up, and get hired. The industry needs you.
      </Callout>

    </LearnLayout>
  )
}
