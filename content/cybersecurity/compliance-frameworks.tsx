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

export default function Module36() {
  return (
    <LearnLayout
      title="Compliance Frameworks — SOC 2, PCI-DSS, HIPAA, ISO 27001, NIST"
      description="Navigate the compliance landscape without losing your mind. Learn what each major framework requires, how they overlap, how to build a unified control library, and how to prepare for and survive an audit."
      section="Cybersecurity — Module 36"
      readTime="36 min"
      updatedAt="May 2026"
    >

      <Part title="Compliance vs Security — Understanding the Difference">
        <P>
          Compliance means meeting the minimum requirements set by a framework, regulation, or auditor. Security means actually protecting systems and data from attackers. <Hl>Compliance is a floor, not a ceiling</Hl> — an organisation can be fully compliant and still breach because they treated compliance as a checkbox exercise rather than a security investment.
        </P>
        <P>
          That said, compliance frameworks are valuable: they provide a baseline of controls, create accountability, and give security teams executive-level leverage to get security investments approved. The right mindset: use compliance to accelerate your security programme, not replace it.
        </P>

        <H>Major Frameworks at a Glance</H>
        <div style={{ overflowX: 'auto', marginBottom: 20 }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
            <thead>
              <tr style={{ background: `${C}22` }}>
                {['Framework', 'Type', 'Who It Applies To', 'Enforced By', 'Audit Frequency'].map(h => (
                  <th key={h} style={{ padding: '10px 14px', textAlign: 'left', color: C, fontWeight: 700, border: `1px solid ${C}33` }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[
                ['SOC 2 Type II', 'Voluntary attestation', 'SaaS/cloud service providers', 'Customer contracts, sales requirements', 'Annual'],
                ['PCI-DSS v4.0', 'Mandatory regulation', 'Any org that processes credit cards', 'Card brands (Visa, MC) via acquiring bank', 'Annual (SAQ or QSA assessment)'],
                ['HIPAA', 'US law', 'Healthcare providers, health plans, business associates', 'HHS Office for Civil Rights', 'No set schedule; enforcement via breach'],
                ['ISO 27001:2022', 'International standard (voluntary)', 'Any organisation seeking certification', 'Accredited certification body (BSI, SGS)', 'Annual surveillance + 3-year re-certification'],
                ['NIST CSF 2.0', 'Framework (voluntary)', 'All sectors (US-centric, globally used)', 'No enforcement; self-assessment', 'Continuous self-assessment'],
                ['NIST 800-53', 'Control catalogue', 'US federal agencies + contractors', 'FedRAMP, DoD, agency AOs', 'Continuous monitoring + triennial'],
                ['GDPR', 'EU law', 'Any org processing EU personal data', 'EU Data Protection Authorities', 'No set schedule; enforcement via complaint/breach'],
                ['SOX (ITGC)', 'US law (IT controls)', 'US public companies', 'SEC; external auditors', 'Annual (part of financial audit)'],
                ['FedRAMP', 'US federal cloud', 'Cloud providers serving US agencies', 'Joint Authorization Board', 'Annual'],
              ].map(([f, t, w, e, a], i) => (
                <tr key={i} style={{ background: i % 2 === 0 ? 'transparent' : `${C}08` }}>
                  {[f, t, w, e, a].map((c, j) => (
                    <td key={j} style={{ padding: '9px 14px', color: 'var(--text)', border: `1px solid ${C}22`, fontSize: 13 }}>{c}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <IQ
          q="What is the difference between SOC 2 Type I and Type II?"
          a="SOC 2 Type I is a point-in-time assessment: an auditor reviews your security controls as they are designed on a specific date and attests that they are suitably designed to meet the Trust Service Criteria. Type II is an assessment over a period of time (typically 6-12 months) that also verifies the controls were operating effectively throughout that period — not just that they existed on audit day. Type II is significantly more valuable: customers trust it because it proves controls work consistently, not just that they were set up. Almost all enterprise sales now require SOC 2 Type II. Type I is useful early in the programme when you want evidence of design before you have a full operating period to show."
        />
      </Part>

      <HR />

      <Part title="SOC 2 — Trust Service Criteria">
        <P>
          SOC 2 (Service Organization Control 2) is the most commonly requested compliance attestation for SaaS and cloud service providers in the US market. It is based on AICPA's Trust Service Criteria (TSC) and examines five criteria areas.
        </P>

        <H>The Five Trust Service Criteria</H>
        <div style={{ overflowX: 'auto', marginBottom: 20 }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
            <thead>
              <tr style={{ background: `${C}22` }}>
                {['Criteria', 'Description', 'Commonly Required?', 'Example Controls'].map(h => (
                  <th key={h} style={{ padding: '10px 14px', textAlign: 'left', color: C, fontWeight: 700, border: `1px solid ${C}33` }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[
                ['Security (CC)', 'Protection against unauthorised access', 'Always required', 'MFA, access control, monitoring, encryption, patching'],
                ['Availability (A)', 'System availability per commitments', 'Often required', 'SLA monitoring, incident response, DR testing, capacity'],
                ['Processing Integrity (PI)', 'Complete, accurate, timely processing', 'For financial/data processing', 'Input validation, error handling, change management'],
                ['Confidentiality (C)', 'Protecting confidential information', 'For enterprise data handling', 'DLP, NDA processes, data classification, access controls'],
                ['Privacy (P)', 'Personal information handling', 'When processing personal data', 'Privacy notice, consent, data subject rights, retention'],
              ].map(([c, d, r, e], i) => (
                <tr key={i} style={{ background: i % 2 === 0 ? 'transparent' : `${C}08` }}>
                  {[c, d, r, e].map((v, j) => (
                    <td key={j} style={{ padding: '9px 14px', color: 'var(--text)', border: `1px solid ${C}22`, fontSize: 13 }}>{v}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <H>SOC 2 Common Controls (CC) — What Auditors Check</H>
        <Block>{`SOC 2 Security criteria key control categories:

CC1 — Control Environment:
  ✓ Security policies documented and communicated to all employees
  ✓ Org chart shows security responsibilities
  ✓ Background checks for employees with access to sensitive data

CC2 — Communication and Information:
  ✓ Employees complete security awareness training annually
  ✓ Incident response plan exists and is communicated
  ✓ Vendor contracts include security requirements

CC3 — Risk Assessment:
  ✓ Annual risk assessment process documented
  ✓ Risks identified, rated (likelihood × impact), and treated

CC6 — Logical and Physical Access Controls:
  ✓ MFA enforced for all systems in scope
  ✓ Access provisioning follows formal request/approval process
  ✓ Quarterly access reviews (user access reviews)
  ✓ Terminated employee access revoked within 24 hours
  ✓ Encryption at rest and in transit for all sensitive data

CC7 — System Operations:
  ✓ Vulnerability scanning performed regularly
  ✓ Critical patches applied within defined SLA
  ✓ Logging and monitoring for security events
  ✓ Alerts for anomalous access or configuration changes

CC8 — Change Management:
  ✓ All production changes go through formal change process
  ✓ Changes tested in non-production before deployment
  ✓ Changes reviewed and approved before deployment
  ✓ Emergency change procedure for critical patches

CC9 — Risk Mitigation:
  ✓ Business continuity plan exists and is tested
  ✓ Vendor risk assessments for critical vendors`}
        </Block>

        <H>SOC 2 Audit Evidence Examples</H>
        <Block>{`Auditors will ask for evidence (screenshots, exports, logs):

Control: MFA is required for all production system access
Evidence:
  - Screenshot of Okta/Azure AD policy showing MFA enforced
  - User list export showing MFA enrolled for 100% of users
  - Exception list (if any) with documented risk acceptance

Control: Access reviews are performed quarterly
Evidence:
  - Access review tickets in Jira for Q1/Q2/Q3/Q4 of audit period
  - Screenshots of review process (reviewers confirming or revoking access)
  - Evidence of revocations actioned within 5 business days of review

Control: Security training completed by all employees
Evidence:
  - LMS completion report: 100% of employees, dates, training name
  - Confirmation new hire training completed within 30 days of joining

Control: Vulnerabilities patched within SLA
Evidence:
  - VM dashboard screenshot showing 0 criticals older than 7 days
  - Sample of patch tickets: opened date, CVSS, closed date, verified rescan

Control: Vendor security reviews performed
Evidence:
  - Vendor risk assessment for top 5 critical vendors
  - Evidence of annual review cycle (prior year + current year assessment)
  - Contracts with security addenda (DPA, security provisions)`}
        </Block>

        <ProTip>Evidence collection is the most time-consuming part of a SOC 2 audit. Use a GRC platform (Drata, Vanta, Sprinto, Tugboat Logic) that auto-collects evidence via API integrations with your cloud, IdP, and HR system — this reduces audit prep from 3 months to 2 weeks.</ProTip>
      </Part>

      <HR />

      <Part title="PCI-DSS — Payment Card Industry">
        <P>
          PCI-DSS (Payment Card Industry Data Security Standard) is mandatory for any organisation that stores, processes, or transmits cardholder data (CHD) — credit card numbers, CVVs, PINs, or magnetic stripe data. Non-compliance can result in fines, increased transaction fees, or loss of the ability to process cards.
        </P>
        <P>
          PCI-DSS v4.0 (released 2022, fully effective March 2025) introduced significant changes including customised implementation options and more explicit requirements for multi-factor authentication and web-skimming prevention.
        </P>

        <H>PCI-DSS 12 Requirements</H>
        <Block>{`PCI-DSS v4.0 — 12 core requirements:

1.  Install and maintain network security controls
    → Firewalls, network segmentation, inbound/outbound rule review

2.  Apply secure configurations to all system components
    → Harden all systems, disable unnecessary services, change default creds

3.  Protect stored account data
    → Encrypt PANs (AES-256), truncate, tokenise — NEVER store CVV2

4.  Protect cardholder data with strong cryptography during transmission
    → TLS 1.2+ only; no SSLv3, TLS 1.0, TLS 1.1

5.  Protect all systems and networks from malicious software
    → Antivirus/EDR on all systems, regular scans, auto-update

6.  Develop and maintain secure systems and software
    → SAST, DAST, penetration testing, secure SDLC

7.  Restrict access to system components and cardholder data by business need to know
    → Role-based access, least privilege, documented access matrix

8.  Identify users and authenticate access to system components
    → MFA required for all access to CDE, unique user IDs, password policy

9.  Restrict physical access to cardholder data
    → Physical security controls for data centres, badge access, CCTV

10. Log and monitor all access to system components and cardholder data
    → Centralised log management, tamper-evident logging, 12-month retention

11. Test security of systems and networks regularly
    → Quarterly vulnerability scans (ASV), annual penetration test, IDS/IPS, FIM

12. Support information security with organisational policies and programmes
    → Written security policy, annual review, risk assessment, security awareness`}
        </Block>

        <H>Cardholder Data Environment (CDE) Scoping</H>
        <P>
          The CDE is the set of systems that store, process, or transmit cardholder data, plus any systems that can affect the security of those systems. <Hl>Reducing CDE scope is the single most effective way to reduce PCI-DSS compliance effort</Hl>.
        </P>
        <Block>{`CDE scope reduction strategies:

Strategy 1 — Tokenisation
  Replace PANs with tokens before they reach your systems
  Customer enters card → payment processor handles PAN → you receive token
  Your systems never see the real card number
  Impact: CDE scope dramatically reduced (you only handle tokens)
  Tools: Stripe, Braintree, Spreedly, your acquirer's tokenisation service

Strategy 2 — Hosted Payment Page (HPP)
  Card entry form is hosted by the payment processor, not your servers
  PAN never traverses your network or is rendered on your pages
  Impact: removes your web application from CDE scope in most cases
  Requirement 6.4.3 (v4.0): must still verify integrity of all scripts on payment page

Strategy 3 — Network segmentation
  Isolate CDE on separate network segment with strict firewall rules
  Prevents non-CDE systems from connecting to CDE
  Impact: limits CDE scope to systems that genuinely need CHD access
  Requirement: segmentation verified by penetration test annually

Strategy 4 — SAQ selection (self-assessment questionnaire)
  SAQ A: Card-not-present, fully outsourced, HPP — 22 requirements
  SAQ A-EP: e-commerce with third-party payment, your server in path — 191 requirements
  SAQ D: Full merchant, stores PANs — all 360 requirements
  Lower SAQ = significantly less compliance burden`}
        </Block>

        <H>Key PCI-DSS Technical Controls</H>
        <Block>{`Critical technical controls auditors verify:

Never store CVV2/CVC2/CID (req 3.3.1):
  ✓ Database schema review — no CVV column
  ✓ Application code review — CVV not written to logs or storage
  ✓ If found: must delete immediately and redesign the flow

PAN masking and encryption (req 3.3, 3.5):
  ✓ Displayed PAN must show only first 6 and last 4 digits (XXXX-XXXX-XXXX-1234)
  ✓ Stored PAN encrypted with AES-256, unique encryption keys per environment
  ✓ Key management: key custodians, split knowledge, key rotation policy

TLS enforcement (req 4.2.1):
  ✓ TLS 1.2 or 1.3 only — verify with: nmap --script ssl-enum-ciphers -p 443 host
  ✓ No weak cipher suites (RC4, DES, 3DES, export ciphers)
  ✓ Certificate validity and pinning for internal services

MFA for all CDE access (req 8.4.2):
  ✓ All users (not just admins) require MFA to access any CDE system
  ✓ No exceptions — even internal network access to CDE requires MFA

File Integrity Monitoring (FIM) (req 11.5.2):
  ✓ FIM alerts on changes to critical system files (OS, application config)
  ✓ Weekly reviews of all changes to confirm they are authorised
  Tools: Tripwire, OSSEC, AWS Config, Wazuh`}
        </Block>

        <IQ
          q="Your startup is about to start processing credit card payments. What PCI-DSS steps should you take first?"
          a="The most important first step is scope reduction. Use a hosted payment page (Stripe Elements, Braintree Drop-in UI, or equivalent) so cardholder data never enters your servers. This qualifies you for SAQ A — the simplest self-assessment with just 22 requirements instead of 360. If that is not possible, use tokenisation: the payment processor handles the PAN and returns a token your system stores. Never build your own payment form that submits card data to your backend. Once scope is minimised, complete the appropriate SAQ honestly, ensure you have basic controls (MFA, logging, encryption, vulnerability scanning), and engage your acquiring bank about your compliance level. For early-stage startups, the goal is: never touch raw card data if you can avoid it."
        />
      </Part>

      <HR />

      <Part title="HIPAA — Healthcare Data Protection">
        <P>
          HIPAA (Health Insurance Portability and Accountability Act) protects Protected Health Information (PHI) — individually identifiable health data. It applies to covered entities (healthcare providers, health plans, healthcare clearinghouses) and their business associates (any vendor that handles PHI on their behalf).
        </P>

        <H>HIPAA Rules Overview</H>
        <Block>{`HIPAA consists of three rules:

Privacy Rule:
  - Governs HOW PHI can be used and disclosed
  - PHI can only be used for treatment, payment, or healthcare operations
  - Patients have rights: access their records, request corrections, receive NPP
  - Minimum necessary principle: only disclose the minimum PHI needed

Security Rule:
  - Governs technical, administrative, and physical safeguards for ePHI
  - Required: access controls, audit controls, integrity controls, transmission security
  - Addressable: encryption, automatic logoff, encryption/decryption (must implement or document why not)
  - Risk analysis required: identify threats and vulnerabilities to ePHI

Breach Notification Rule:
  - Covered entities must notify affected individuals within 60 days of discovery
  - Breaches affecting 500+ individuals: notify HHS and media within 60 days
  - Breaches affecting fewer than 500: annual report to HHS
  - Business associates must notify covered entity within 60 days

Definition of PHI (18 identifiers):
  Name, address, phone, fax, email, SSN, medical record number,
  health plan beneficiary number, account number, certificate/license number,
  vehicle identifiers, device identifiers, URLs, IP addresses,
  biometric identifiers (fingerprints, voice), full-face photos,
  any other unique identifying number or code, dates (except year) related to individual`}
        </Block>

        <H>HIPAA Technical Safeguards</H>
        <Block>{`Required technical safeguards (non-negotiable):

Access Control (required):
  ✓ Unique user identification — no shared accounts for ePHI access
  ✓ Emergency access procedure — documented break-glass process
  ✓ Automatic logoff — session timeout on ePHI-accessing systems

Audit Controls (required):
  ✓ Hardware/software activity records for ePHI systems
  ✓ Review audit logs for inappropriate access (quarterly minimum)
  ✓ Retain audit logs for 6 years (HIPAA record retention minimum)

Integrity Controls (required):
  ✓ ePHI must not be altered or destroyed in unauthorised manner
  ✓ Electronic mechanisms to confirm ePHI has not been improperly altered
  ✓ Digital signatures or checksums for transmitted ePHI

Transmission Security (required):
  ✓ Guard against unauthorised access to ePHI in transit
  ✓ Encryption of ePHI in transit (addressable — but required in practice)
  ✓ TLS 1.2+ for all ePHI transmission

Addressable safeguards (must implement or document equivalent alternative):
  ✓ Automatic logoff
  ✓ Encryption/decryption of ePHI at rest
  ✓ In practice: AES-256 encryption of databases, storage volumes, backups
    containing ePHI is industry standard — "we chose not to encrypt" is not viable

Business Associate Agreements (BAA):
  ✓ Required with every vendor that accesses/processes/stores ePHI
  ✓ AWS, Azure, GCP, Google Workspace all offer BAAs (must be signed)
  ✓ No BAA = HIPAA violation regardless of technical controls`}
        </Block>
      </Part>

      <HR />

      <Part title="ISO 27001 — Information Security Management">
        <P>
          ISO 27001 is an international standard for information security management systems (ISMS). Unlike SOC 2 (US-focused) or HIPAA (US law), ISO 27001 is globally recognised — a single certification accepted in most international markets. It is process-oriented: it certifies that you have a systematic, risk-based approach to managing information security.
        </P>

        <H>ISO 27001:2022 Structure</H>
        <Block>{`ISO 27001:2022 has two parts:

Part 1 — Management Requirements (mandatory, clauses 4-10):
  Clause 4:  Context — understand org, interested parties, scope of ISMS
  Clause 5:  Leadership — top management commitment, security policy
  Clause 6:  Planning — risk assessment, risk treatment plan, objectives
  Clause 7:  Support — resources, competence, awareness, communication, documentation
  Clause 8:  Operation — implement risk treatment, manage operational security
  Clause 9:  Performance evaluation — monitoring, internal audit, management review
  Clause 10: Improvement — nonconformity, corrective action, continual improvement

Part 2 — Annex A Controls (114 controls in 27001:2022, organised in 4 themes):
  A5: Organisational controls (37 controls) — policies, roles, threat intel, IR, legal
  A6: People controls (8 controls)  — HR security, remote working, awareness
  A7: Physical controls (14 controls) — physical security, equipment, clear desk
  A8: Technological controls (34 controls) — access, crypto, logging, dev security

The organisation selects which Annex A controls apply based on risk assessment.
Controls not selected must be excluded in the Statement of Applicability (SoA)
with documented justification.`}
        </Block>

        <H>Risk Assessment Process</H>
        <Block>{`ISO 27001 risk assessment methodology:

Step 1 — Asset identification
  List all information assets: databases, applications, servers, laptops,
  cloud accounts, physical records, people knowledge

Step 2 — Threat and vulnerability identification
  For each asset: what threats exist? What vulnerabilities do they exploit?
  Example: Database (asset) → SQL injection (threat) → unpatched web app (vulnerability)

Step 3 — Impact and likelihood assessment
  Rate each risk on two dimensions (typically 1-5 scale):
  - Likelihood: How probable is the threat being realised?
  - Impact: What is the business impact if it is realised?
  Risk score = Likelihood × Impact

Step 4 — Risk treatment options (choose one per risk):
  - Treat (mitigate): implement a control to reduce the risk
  - Transfer: buy cyber insurance, outsource to vendor
  - Tolerate (accept): document acceptance if risk is within appetite
  - Terminate: stop the activity that creates the risk

Step 5 — Statement of Applicability (SoA)
  Document: which Annex A controls are applicable, which are excluded,
  and justification for each exclusion. This is a core audit deliverable.

Step 6 — Annual review
  Re-assess risks annually and after significant changes`}
        </Block>

        <H>ISO 27001 vs SOC 2 — When to Choose Which</H>
        <Block>{`Decision guide:

Choose SOC 2 when:
  - Primary customers are US enterprises
  - Selling SaaS to US companies that request it (very common)
  - Shorter timeline: Type I achievable in 3-6 months
  - Scope: focuses on your specific service offering

Choose ISO 27001 when:
  - Selling internationally (EU, UK, APAC, MEA markets)
  - Government contracts requiring ISO certification
  - Want a certification that covers the entire organisation, not just one service
  - Timeline acceptable: typically 12-18 months to initial certification

Choose both when:
  - Selling globally with a mix of US and international enterprise customers
  - Many controls overlap — unified control framework serves both
  - GRC platforms (Drata, Vanta) support parallel certification programmes`}
        </Block>

        <IQ
          q="A customer's security questionnaire asks whether you are SOC 2 or ISO 27001 certified. You have neither. How do you respond?"
          a="Be honest — misrepresenting your compliance posture is both ethically wrong and a contractual/legal risk. Explain your current security programme and controls directly: 'We are not yet SOC 2 certified. We are currently in our audit preparation period and expect to complete SOC 2 Type II by [date]. In the meantime, I can share our information security policy, penetration test report, and complete your security questionnaire in detail.' Most enterprise procurement teams have worked with vendors at various stages of compliance maturity — they want to see a serious programme in progress, not a checkbox. If the customer has a hard requirement for a current certification, ask about a timeline waiver or whether a penetration test and completed questionnaire satisfy their needs while you complete the audit."
        />
      </Part>

      <HR />

      <Part title="NIST Frameworks">
        <H>NIST Cybersecurity Framework 2.0</H>
        <P>
          NIST CSF is a voluntary framework published by the US National Institute of Standards and Technology. CSF 2.0 (released February 2024) added a sixth function — Govern — to address organisational accountability. It is the most widely adopted security framework in the US and is frequently referenced in compliance conversations.
        </P>
        <Block>{`NIST CSF 2.0 — Six Functions:

GOVERN (new in 2.0):
  Cybersecurity risk strategy, policy, roles, supply chain risk management
  → Without governance, the other five functions are uncoordinated

IDENTIFY:
  Asset management, business environment, risk assessment, supply chain
  → Know what you have and what is at risk

PROTECT:
  Identity and access, awareness training, data security, secure config, maintenance
  → Prevent or limit adverse events

DETECT:
  Anomalies and events, continuous monitoring, detection processes
  → Find adverse events quickly

RESPOND:
  Response planning, communications, analysis, mitigation, improvements
  → Contain and manage adverse events

RECOVER:
  Recovery planning, improvements, communications
  → Restore capabilities after an incident

CSF Tiers (maturity levels):
  Tier 1 — Partial: ad-hoc, no formal process
  Tier 2 — Risk Informed: risk-aware but not organisation-wide
  Tier 3 — Repeatable: formal processes, consistently applied
  Tier 4 — Adaptive: continuous improvement based on lessons learned

CSF Profiles:
  Current Profile: describes current security posture
  Target Profile:  describes desired security posture
  Gap analysis:    identifies what needs to change`}
        </Block>

        <H>NIST 800-53 — Control Catalogue</H>
        <P>
          NIST SP 800-53 Rev 5 is the comprehensive control catalogue required for US federal systems and FedRAMP-authorised cloud services. It has 20 control families and over 1,000 controls.
        </P>
        <Block>{`NIST 800-53 key control families:

AC — Access Control          (26 controls)
AT — Awareness and Training   (6 controls)
AU — Audit and Accountability (16 controls)
CA — Assessment & Authorisation (9 controls)
CM — Configuration Management (14 controls)
CP — Contingency Planning     (13 controls)
IA — Identification and Authentication (13 controls)
IR — Incident Response        (10 controls)
MP — Media Protection         (8 controls)
PE — Physical Protection      (23 controls)
PL — Planning                 (11 controls)
PM — Programme Management     (33 controls)
PS — Personnel Security       (9 controls)
PT — PII Processing           (8 controls)
RA — Risk Assessment          (10 controls)
SA — System and Services Acquisition (23 controls)
SC — System and Communications Protection (51 controls)
SI — System and Information Integrity (23 controls)
SR — Supply Chain Risk Management (12 controls)

Three impact baselines (Low / Moderate / High):
  Low:      ~130 controls  (minor adverse effect)
  Moderate: ~300 controls  (serious adverse effect) — most common baseline
  High:     ~400+ controls (severe or catastrophic effect)`}
        </Block>
      </Part>

      <HR />

      <Part title="GDPR — EU Data Protection">
        <P>
          GDPR (General Data Protection Regulation) applies to any organisation worldwide that processes personal data of EU residents. <Hl>Data residency does not determine applicability — the location of the data subject does</Hl>. A US company with EU customers is subject to GDPR.
        </P>

        <H>Six Lawful Bases for Processing</H>
        <Block>{`GDPR requires a lawful basis for every data processing activity:

1. Consent:
   Must be freely given, specific, informed, and unambiguous
   Pre-ticked boxes = invalid consent
   Right to withdraw must be as easy as giving consent

2. Contract:
   Processing necessary to perform a contract with the individual
   Example: processing delivery address to ship a product

3. Legal obligation:
   Processing required to comply with EU or member state law
   Example: retaining financial records for tax purposes

4. Vital interests:
   To protect someone's life — limited to genuine emergencies

5. Public task:
   For a public authority performing an official function

6. Legitimate interests:
   Broadest basis — must balance your interests against individual rights
   Requires Legitimate Interests Assessment (LIA)
   Cannot override fundamental rights`}
        </Block>

        <H>GDPR Technical Requirements for Engineers</H>
        <Block>{`Privacy by Design technical requirements:

Pseudonymisation:
  Replace direct identifiers with pseudonyms that can be reversed with a key
  Separate the pseudonymisation key from the data
  Example: store user_id as SHA-256(user_email + salt), keep mapping separately

Data minimisation:
  Collect only what is needed for the specified purpose
  Delete when no longer needed (defined retention period)
  Example: do not collect date of birth if age verification only needs 18+

Encryption:
  Encrypt personal data at rest and in transit
  Separate encryption keys from the data they protect
  Key management and rotation policy documented

Data Subject Rights (must implement endpoints/processes):
  Right of Access: export all data for a specific user (DSAR — 30 day deadline)
  Right to Erasure: delete all data for a specific user (right to be forgotten)
  Right to Portability: export in machine-readable format (JSON, CSV)
  Right to Restriction: flag account to restrict processing without deleting
  Right to Object: stop processing for direct marketing on objection

Technical DSAR implementation:
  // Collect all data for user_id across all tables/services
  // Return as structured export within 30 days
  GET /api/admin/dsar?user_id=xxx → triggers data collection across microservices
  // Export format: JSON or CSV per Article 20(1)

Breach Notification:
  Notify supervisory authority within 72 hours of becoming aware of breach
  Notify affected individuals without undue delay if high risk to their rights
  Document all breaches in breach register (even those not requiring notification)`}
        </Block>

        <Err
          title="Assuming GDPR does not apply because you are a US company"
          bad="Your US SaaS company has European customers but decides GDPR does not apply because you are not based in the EU."
          good="GDPR applies based on the location of the data subjects, not the company. If you process personal data of EU residents (including website analytics, contact forms, or customer accounts), GDPR applies. At minimum: add a cookie consent banner, publish a compliant privacy notice, implement data subject rights processes, sign a DPA with all vendors that process EU data, and appoint an EU representative if required."
        />

        <Err
          title="Treating compliance as a one-time project"
          bad="Complete the SOC 2 audit, achieve certification, and consider compliance 'done' until next year's audit."
          good="Compliance is continuous. Controls must operate every day — not just during audit periods. Evidence collection tools (Drata, Vanta) monitor controls continuously and alert when they drift. Auditors review operating effectiveness across the entire period, not just the week before the audit. Treat each new system, vendor, or process as a compliance question to address at adoption time, not retrospectively."
        />

        <Err
          title="Confusing compliance with security"
          bad="After achieving SOC 2 certification, tell the board 'we are now secure' — no additional security investment needed."
          good="Compliance is the minimum bar, not the security ceiling. SOC 2 does not require threat hunting, advanced detection engineering, or red team exercises. Many breached organisations were compliance-certified. Use compliance as a foundation and baseline, then layer real security programme maturity on top. The combination is what actually reduces breach risk."
        />
      </Part>

      <HR />

      <Part title="Building a Unified Control Library">
        <P>
          Running multiple compliance programmes simultaneously (SOC 2 + ISO 27001 + PCI-DSS) does not mean tripling your work. The controls overlap significantly. A unified control library maps a single set of controls to multiple frameworks, reducing audit effort by 40-60%.
        </P>

        <H>Control Overlap Map</H>
        <Block>{`Control → Framework mapping (sample controls):

Control: MFA required for all privileged access
  SOC 2:    CC6.1 (logical access controls)
  PCI-DSS:  Req 8.4.2 (MFA for CDE access)
  HIPAA:    Technical Safeguard (access controls)
  ISO 27001: A.8.5 (secure authentication)
  NIST 800-53: IA-2 (identification and authentication)

Control: Vulnerability scanning monthly + critical patches within 7 days
  SOC 2:    CC7.1 (system operations — monitoring)
  PCI-DSS:  Req 11.3.1 (quarterly internal scan), Req 6.3.3 (patches)
  HIPAA:    Security Rule (risk management safeguard)
  ISO 27001: A.8.8 (management of technical vulnerabilities)
  NIST 800-53: RA-5 (vulnerability monitoring and scanning), SI-2 (flaw remediation)

Control: Annual penetration test by qualified tester
  SOC 2:    CC4.1 (monitoring activities — pentesting)
  PCI-DSS:  Req 11.4.1 (annual pentest)
  ISO 27001: A.8.8 (technical vulnerability management)
  NIST 800-53: CA-8 (penetration testing)

Control: Encryption at rest (AES-256) and in transit (TLS 1.2+)
  SOC 2:    CC6.7 (encryption of data at rest/transit)
  PCI-DSS:  Req 3.5 (protect stored PAN), Req 4.2.1 (secure transmission)
  HIPAA:    Technical Safeguard (transmission security, encryption addressable)
  ISO 27001: A.8.24 (use of cryptography)
  NIST 800-53: SC-28 (protection of information at rest), SC-8 (transmission)`}
        </Block>

        <H>GRC Platform Approach</H>
        <Block>{`GRC (Governance, Risk, and Compliance) platforms streamline compliance:

Commercial platforms (common in enterprise):
  Drata:    Auto-collects evidence from AWS, GCP, Azure, Okta, GitHub, Jira
            Supports SOC 2, ISO 27001, HIPAA, PCI-DSS, GDPR simultaneously
            Real-time control monitoring with Slack/Jira alerts on failures

  Vanta:    Similar automation focus; strong for fast-growing startups
            Guided SOC 2 and ISO 27001 pathways; auditor network built-in

  Sprinto:  India-based, competitive pricing for international orgs
            Multi-framework support with automated evidence collection

  Tugboat Logic / OneTrust:
            Enterprise-focused; strong policy management and risk modules

Open-source / lower cost alternatives:
  Eramba: Open-source GRC with full risk management and audit modules
  Simple Machines GRC: small team GRC workflow

What a GRC platform gives you:
  ✓ Automated evidence collection (no more screenshots manually)
  ✓ Continuous control monitoring (alert when MFA policy breaks)
  ✓ Policy lifecycle management (version control, annual review reminders)
  ✓ Vendor risk management (questionnaire portal for vendors)
  ✓ Auditor access portal (share evidence directly with your auditor)
  ✓ Multi-framework control mapping (SOC 2 + ISO 27001 from one control set)`}
        </Block>

        <IQ
          q="Your company needs SOC 2 Type II and is also being asked for ISO 27001. How do you approach running both programmes simultaneously?"
          a="Build a unified control library from the start rather than running two separate programmes. Map each control to both frameworks — most controls satisfy requirements in both. Start with SOC 2 since it is faster (no external certification body, just an auditor attestation) and likely the most urgent commercially. While running the SOC 2 audit period, layer in the additional ISO 27001 requirements: formal risk assessment and treatment plan, Statement of Applicability, internal audit, and management review. ISO 27001 requires a longer operating period for the ISMS before certification — use the SOC 2 audit period as the ISO ISMS operating history. Both share core requirements: access control, vulnerability management, incident response, change management, backup and recovery, security awareness. Use a GRC platform to map controls once and collect evidence that satisfies both auditors simultaneously."
        />

        <IQ
          q="How do you explain the difference between NIST CSF and NIST 800-53 to a non-technical manager?"
          a="NIST CSF is a strategic framework that describes what a mature security programme should be doing — identifying risks, protecting systems, detecting threats, responding to incidents, and recovering from them. It is like a roadmap that tells you where you need to go and how to measure your progress. NIST 800-53 is a detailed control catalogue — hundreds of specific security requirements that tell you exactly what to implement. Think of CSF as the GPS showing you the destination, and 800-53 as the turn-by-turn directions. For federal agencies and FedRAMP cloud providers, 800-53 compliance is mandatory. For everyone else, CSF is a voluntary benchmark to measure and improve your security posture without being prescriptive about exactly how to achieve it."
        />
      </Part>

      <HR />

      <KeyTakeaways items={[
        'Compliance is a floor, not a ceiling — achieving SOC 2 or PCI-DSS certification does not mean you are secure; it means you meet the minimum baseline defined by the framework.',
        'SOC 2 Type II (6-12 month operating period) is more valuable than Type I (point-in-time) because it proves controls work consistently, not just that they were designed correctly.',
        'PCI-DSS scope reduction is the highest-leverage activity: using a hosted payment page or tokenisation can reduce scope from SAQ D (360 requirements) to SAQ A (22 requirements).',
        'PCI-DSS absolutely prohibits storing CVV2/CVC2/CID values after authorisation — not anywhere, not encrypted, not in logs. This is a zero-tolerance requirement.',
        'HIPAA applies to covered entities and their business associates — every vendor that accesses ePHI needs a signed Business Associate Agreement (BAA) before receiving any PHI.',
        'GDPR applies based on where the data subjects are located, not where your company is based — any company with EU customers must comply regardless of their headquarters.',
        'ISO 27001 is internationally recognised and process-oriented; SOC 2 is US-centric and service-specific. Both are needed for global enterprise sales.',
        'NIST CSF 2.0 added Govern as a sixth function — without organisational governance, the other five functions (Identify, Protect, Detect, Respond, Recover) remain uncoordinated.',
        'A unified control library maps a single set of controls to multiple frameworks, reducing audit effort by 40-60% compared to running separate programmes for each framework.',
        'GRC platforms (Drata, Vanta, Sprinto) automate evidence collection via API integrations — reducing SOC 2 audit preparation from three months to two weeks.',
      ]} />

      <Callout type="info">
        <strong>Up Next — Module 37: Security Certifications and Career Paths</strong><br />
        Module 37 maps the cybersecurity certification landscape: which certs matter for which roles, the most efficient study paths, exam strategies, and how to build a portfolio that gets you hired. From CompTIA Security+ for entry-level to OSCP for offensive roles and CISSP for security leadership — learn where to invest your time.
      </Callout>

    </LearnLayout>
  )
}
