import type { Metadata } from 'next'
import Link from 'next/link'
import { LearnLayout } from '@/components/content/LearnLayout'
import { Callout } from '@/components/content/Callout'
import { KeyTakeaways } from '@/components/content/KeyTakeaways'

export const metadata: Metadata = {
  title: 'The CIA Triad and Security Models | Chaduvuko',
  description: 'Confidentiality, Integrity, Availability — the three properties every security decision trades off. The foundational framework for reasoning about security.',
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

export default function CiaTriadSecurityModels() {
  return (
    <LearnLayout
      title="The CIA Triad and Security Models"
      description="Confidentiality, Integrity, Availability — the three properties every security decision trades off. How attacks target each and how controls defend it."
      section="Cybersecurity — Module 05"
      readTime="26 min"
      updatedAt="May 2026"
    >

      {/* ── PART 01 ── */}
      <Part n="01" title="Why Every Security Decision Needs a Framework" />

      <P>Security decisions are trade-offs. Strong encryption improves confidentiality but can hurt availability if key management fails. Aggressive access controls improve confidentiality but may block legitimate users. Detailed audit logging improves accountability but has a performance cost. Without a framework, these trade-offs are made inconsistently — and the inconsistencies create gaps attackers find.</P>

      <P>The CIA triad is that framework. It has been the foundation of information security for over 30 years because it captures something true: <Hl>every security property of a system can be expressed as some combination of Confidentiality, Integrity, and Availability</Hl>. Every attack violates at least one. Every security control protects at least one. Having this vocabulary makes security conversations precise.</P>

      <div style={{ background: `${C}08`, border: `1px solid ${C}25`, borderLeft: `4px solid ${C}`, borderRadius: '0 10px 10px 0', padding: '20px 24px', margin: '4px 0 28px' }}>
        <P>An important clarification upfront: the CIA triad is not a framework for building security systems — it is a vocabulary for analysing them. It does not tell you what to build. It tells you how to think about what you build, which attacks to worry about, and what properties you are trading off when you make a design decision.</P>
      </div>

      <HR />

      {/* ── PART 02 ── */}
      <Part n="02" title="Confidentiality — Information Is Accessible Only to the Authorised" />

      <P><Hl>Confidentiality</Hl> means that information is accessible only to those authorised to access it. Unauthorised parties — whether external attackers, curious employees, or compromised systems — should not be able to read protected data.</P>

      <H>What Protects Confidentiality</H>

      <div style={{ display: 'grid', gap: 12, margin: '0 0 28px' }}>
        {[
          { control: 'Encryption at rest', desc: 'Data stored in databases, files, or backups is encrypted. Even if an attacker obtains the physical storage medium or a database dump, they cannot read the data without the encryption key. AWS S3 server-side encryption, Linux LUKS disk encryption, and Transparent Data Encryption in databases implement this.' },
          { control: 'Encryption in transit', desc: 'Data moving over networks is encrypted (TLS). An attacker who intercepts network traffic sees only ciphertext. Without HTTPS, passwords and session tokens cross the network in plaintext — readable by anyone on the path.' },
          { control: 'Access controls', desc: 'Authentication verifies identity. Authorisation determines what that identity can access. Role-Based Access Control (RBAC) limits each user to the data their role requires — a customer service representative can view order history but not payment card numbers.' },
          { control: 'Data classification', desc: 'Not all data needs the same level of protection. Classifying data as Public, Internal, Confidential, and Restricted allows proportionate controls — applying bank-level encryption to an internal birthday list wastes resources; applying minimal controls to customer SSNs is a breach waiting to happen.' },
          { control: 'Tokenisation and masking', desc: 'Replace sensitive values with non-sensitive substitutes. A credit card number is replaced with a random token; the actual number lives only in the token vault. Log masking replaces SSNs with *** in application logs. The application handles the token; only the vault holds the sensitive value.' },
        ].map((item) => (
          <div key={item.control} style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderLeft: `3px solid #4285f4`, borderRadius: 8, padding: '12px 16px' }}>
            <div style={{ fontSize: 13, fontWeight: 800, color: '#4285f4', marginBottom: 6 }}>{item.control}</div>
            <div style={{ fontSize: 13, color: 'var(--text)', lineHeight: 1.7 }}>{item.desc}</div>
          </div>
        ))}
      </div>

      <H>Attacks That Target Confidentiality</H>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 12, margin: '0 0 28px' }}>
        {[
          { attack: 'Data breach', desc: 'Unauthorised access to a database or file system exposing protected records — customer PII, payment data, medical records.' },
          { attack: 'Eavesdropping / MITM', desc: 'Intercepting unencrypted network traffic to read credentials, session tokens, or sensitive content in transit.' },
          { attack: 'Credential theft', desc: 'Phishing or keylogging captures passwords, giving attackers authenticated access to data they should not see.' },
          { attack: 'Insider threat', desc: 'A malicious employee with legitimate access exfiltrates data they are authorised to view but not to share.' },
          { attack: 'SQL injection', desc: 'Injecting SQL into a query causes the database to return data from tables the application should not expose.' },
          { attack: 'Side-channel attacks', desc: 'Inferring confidential information from observable system behaviour — timing differences, power consumption, or error messages that reveal too much.' },
        ].map((item) => (
          <div key={item.attack} style={{ background: 'var(--surface)', border: '1px solid rgba(66,133,244,0.2)', borderRadius: 8, padding: '12px 14px' }}>
            <div style={{ fontSize: 12, fontWeight: 800, color: '#4285f4', marginBottom: 4 }}>{item.attack}</div>
            <div style={{ fontSize: 12, color: 'var(--muted)', lineHeight: 1.6 }}>{item.desc}</div>
          </div>
        ))}
      </div>

      <H>The Privacy Extension</H>
      <P>Privacy is confidentiality applied to personal data — with legal teeth. GDPR, CCPA, HIPAA, and similar regulations mandate specific confidentiality controls for personal data and impose fines for violations. A confidentiality failure involving personal data is simultaneously a security incident and a regulatory violation. In the US, HIPAA fines for healthcare data breaches range from $100 to $50,000 per record. A breach of 1 million records can result in $50 billion in potential maximum penalties.</P>

      <HR />

      {/* ── PART 03 ── */}
      <Part n="03" title="Integrity — Information Is Accurate and Unmodified" />

      <P><Hl>Integrity</Hl> means that information is accurate, complete, and has not been modified without authorisation. Data that has been tampered with — whether by an attacker, a software bug, or hardware failure — has lost its integrity.</P>

      <P>Integrity is often underweighted compared to confidentiality, but its violations can be more dangerous. A data breach exposes information. An integrity failure corrupts it — and a system that makes decisions based on corrupted data may behave in catastrophically wrong ways.</P>

      <H>Integrity Violations by Impact</H>

      <div style={{ display: 'grid', gap: 12, margin: '0 0 28px' }}>
        {[
          {
            scenario: 'Financial record tampering',
            color: '#ff4757',
            impact: 'An attacker modifies a pending payment\'s amount field from $100 to $0.01 before it is processed. Or a malicious insider changes account balances. The system records the transaction faithfully — but the data it is recording is wrong.',
            control: 'Immutable audit logs, digital signatures on financial records, dual-approval requirements for large transactions, database-level triggers that log all modifications',
          },
          {
            scenario: 'Software supply chain compromise',
            color: '#f97316',
            impact: 'An attacker compromises a software build pipeline and injects malicious code into a legitimate software package before it is signed and distributed. Users install what appears to be authentic, signed software but it contains malware. The SolarWinds attack compromised 18,000 organisations this way.',
            control: 'Code signing, reproducible builds, software bill of materials (SBOM), binary provenance verification, package signature verification in deployment pipelines',
          },
          {
            scenario: 'DNS record manipulation',
            color: '#f97316',
            impact: 'An attacker modifies DNS records to point a domain to a malicious server. Users resolve the domain and connect to the attacker, believing they are at the legitimate destination. This is an integrity attack on the DNS infrastructure, with confidentiality consequences for users.',
            control: 'DNSSEC cryptographically signs DNS records. Monitoring DNS records for unexpected changes provides detection.',
          },
          {
            scenario: 'Log tampering',
            color: '#7b61ff',
            impact: 'An attacker who achieves system access deletes or modifies log files to remove evidence of their activity. Without integrity protection on logs, incident response cannot reconstruct what happened.',
            control: 'Write-once log storage, centralised logging to a separate server the attacker cannot access, cryptographic log chaining (each log entry hashes the previous one — any deletion is detectable)',
          },
          {
            scenario: 'Medical record modification',
            color: '#facc15',
            impact: 'An attacker changes a patient\'s blood type, allergy records, or medication list in a hospital system. Clinical staff make decisions based on the corrupted record. This is a life-safety integrity violation.',
            control: 'Cryptographic audit trails for all record modifications, immutable original record storage, strict RBAC limiting who can modify records',
          },
        ].map((item) => (
          <div key={item.scenario} style={{ background: 'var(--surface)', border: `1px solid ${item.color}20`, borderLeft: `3px solid ${item.color}`, borderRadius: 8, padding: '14px 18px' }}>
            <div style={{ fontSize: 13, fontWeight: 800, color: item.color, marginBottom: 6 }}>{item.scenario}</div>
            <div style={{ fontSize: 13, color: 'var(--text)', lineHeight: 1.7, marginBottom: 8 }}>{item.impact}</div>
            <div style={{ fontSize: 11, color: 'var(--muted)', fontFamily: 'var(--font-mono)', lineHeight: 1.5 }}>🛡 {item.control}</div>
          </div>
        ))}
      </div>

      <H>What Protects Integrity</H>
      <P><Hl>Cryptographic hash functions</Hl> detect modification: SHA-256(data) produces a fixed digest. Any change to data changes the digest — the receiver can detect tampering by recomputing. <Hl>Digital signatures</Hl> prove both integrity and authenticity: a signature over a document proves it came from the key holder and was not modified. <Hl>MACs</Hl> detect modification by anyone without the secret key. <Hl>Version control systems</Hl> (git) use content-addressed storage — every commit is identified by the SHA-1 of its content, making undetected modification of history theoretically impossible. <Hl>Audit logs</Hl> record every action; immutable audit logs cannot be retroactively altered.</P>

      <HR />

      {/* ── PART 04 ── */}
      <Part n="04" title="Availability — Systems and Data Are Accessible When Needed" />

      <P><Hl>Availability</Hl> means that authorised users can access systems and data when they need to. A secure system that is permanently offline provides no security value — it is just broken. Availability is often underemphasised in security discussions despite being the property most visibly violated by modern attacks.</P>

      <H>Availability Threats</H>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 12, margin: '0 0 24px' }}>
        {[
          { threat: 'DDoS (Distributed Denial of Service)', color: '#ff4757', desc: 'Overwhelming a service with traffic from thousands of compromised machines (botnet) until legitimate users cannot be served. The 2016 Mirai DDoS attack peaked at 1.2 Tbps — enough to take down Dyn DNS and make major websites unreachable for hours.' },
          { threat: 'Ransomware', color: '#f97316', desc: 'Encrypts files and demands payment for the decryption key. Primarily an availability attack — the data may not be stolen, but it is inaccessible. Hospitals have cancelled surgeries, pipelines have shut down fuel supply, and governments have declared emergencies due to ransomware availability failures.' },
          { threat: 'Hardware failure', color: '#facc15', desc: 'Disk failure, power outage, network equipment failure, or datacenter disaster can take down systems without any attacker involvement. Availability requires resilience against both attacks and failures.' },
          { threat: 'Software bugs', color: '#7b61ff', desc: 'A deployment error, a bad configuration change, or a software crash can cause availability failures that look identical to an attack from the user\'s perspective. Many "incidents" are not security incidents at all.' },
          { threat: 'Resource exhaustion', color: '#4285f4', desc: 'A fork bomb fills the process table. A memory leak exhausts RAM. A slow query fills the connection pool. Without resource limits, one process can take down an entire server — no attacker required, but exploitable by one.' },
        ].map((item) => (
          <div key={item.threat} style={{ background: 'var(--surface)', border: `1px solid ${item.color}20`, borderLeft: `3px solid ${item.color}`, borderRadius: 8, padding: '12px 14px' }}>
            <div style={{ fontSize: 12, fontWeight: 800, color: item.color, marginBottom: 6 }}>{item.threat}</div>
            <div style={{ fontSize: 12, color: 'var(--muted)', lineHeight: 1.65 }}>{item.desc}</div>
          </div>
        ))}
      </div>

      <H>What Protects Availability</H>
      <P>Availability is protected through redundancy and resilience: multiple servers behind a load balancer mean no single failure takes down the service. Database replicas mean no single disk failure loses data. Multiple availability zones mean no single datacenter fire stops operations. DDoS protection services (Cloudflare, Akamai) absorb volumetric attacks before they reach the origin. Rate limiting prevents resource exhaustion from a single user or IP. Backups allow recovery after ransomware — if they are regularly tested and stored offline where ransomware cannot reach them.</P>

      <ProTip>Availability SLAs (Service Level Agreements) quantify this property: "99.9% availability" means no more than 8.76 hours of downtime per year. "99.99% availability" means no more than 52 minutes per year. "Five nines" (99.999%) means no more than 5.26 minutes per year. These numbers drive architecture decisions — four nines requires redundant everything; five nines requires active-active multi-region with automated failover. The cost of each additional nine grows exponentially.</ProTip>

      <HR />

      {/* ── PART 05 ── */}
      <Part n="05" title="The Trade-offs — CIA Properties Conflict" />

      <P>The CIA triad is more useful for reasoning about trade-offs than for building ideal systems, because these three properties conflict. You cannot maximise all three simultaneously — every system is a set of deliberate compromises.</P>

      <div style={{ display: 'grid', gap: 14, margin: '0 0 32px' }}>
        {[
          {
            conflict: 'Confidentiality vs Availability',
            color: '#ff4757',
            scenario: 'Strong encryption protects confidentiality. But if the encryption keys are lost — the key management system fails, a hardware security module malfunctions, or the key admin is the only one who knows the passphrase and leaves the company — the data is permanently inaccessible. Perfect confidentiality (no one can read it) and perfect availability (always accessible) are directly in tension.',
            example: 'A hospital encrypts patient records for confidentiality. During an emergency, the doctor needs immediate access to a patient\'s medication history but the key management system is down for maintenance. Maximum confidentiality has compromised critical availability.',
            resolution: 'Key escrow, hardware security modules with high availability, key recovery processes, and explicit risk decisions about when availability takes precedence over confidentiality.',
          },
          {
            conflict: 'Integrity vs Availability',
            color: '#f97316',
            scenario: 'Strict integrity controls require verification before action. A system that requires two-factor approval for every transaction, cryptographic signature verification before loading data, or rigorous schema validation before processing input is more correct — but slower. Under high load or during an incident, these integrity checks become bottlenecks that reduce availability.',
            example: 'A blockchain system where every transaction requires consensus across thousands of nodes — maximum integrity, but only processes 7-15 transactions per second (vs Visa\'s 65,000/sec). Ethereum\'s switch to proof-of-stake traded some integrity properties for energy efficiency and throughput.',
            resolution: 'Integrity checks scaled proportionally to risk. Low-value operations get lightweight checks; high-value operations get full verification even at the cost of latency.',
          },
          {
            conflict: 'Confidentiality vs Integrity',
            color: '#7b61ff',
            scenario: 'End-to-end encryption (E2EE) maximises confidentiality by ensuring only the endpoints can read the content — not even the service provider. But this means the service provider cannot scan for malware, detect abuse, or filter illegal content. Confidentiality prevents the integrity and content-verification functions that require seeing the plaintext.',
            example: 'Apple iMessage\'s end-to-end encryption means Apple cannot see message content — strong confidentiality. But it also means Apple cannot detect if someone is being harassed, if malware is being distributed via iMessage, or if illegal content is being shared.',
            resolution: 'Client-side scanning (controversial — moves the surveillance to the endpoint), trusted hardware enclaves, or accepting the trade-off explicitly and delegating abuse detection to metadata and behavioural signals.',
          },
        ].map((item) => (
          <div key={item.conflict} style={{ background: 'var(--surface)', border: `1px solid ${item.color}20`, borderRadius: 12, padding: '20px 24px' }}>
            <div style={{ fontSize: 14, fontWeight: 800, color: item.color, marginBottom: 10 }}>{item.conflict}</div>
            <div style={{ fontSize: 13, color: 'var(--text)', lineHeight: 1.8, marginBottom: 10 }}>{item.scenario}</div>
            <div style={{ background: 'var(--bg2)', border: '1px solid var(--border)', borderRadius: 8, padding: '10px 14px', marginBottom: 10 }}>
              <div style={{ fontSize: 11, color: 'var(--muted)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '.08em', marginBottom: 4 }}>Real-world example</div>
              <div style={{ fontSize: 12, color: 'var(--text)', lineHeight: 1.7 }}>{item.example}</div>
            </div>
            <div style={{ fontSize: 12, color: item.color, lineHeight: 1.6 }}><strong>Resolution approach: </strong>{item.resolution}</div>
          </div>
        ))}
      </div>

      <HR />

      {/* ── PART 06 ── */}
      <Part n="06" title="Security Models — Formalising the CIA Triad" />

      <P>Security models provide formal rules for enforcing CIA properties. They were developed primarily in the 1970s-80s for government and military systems but their principles are applied in modern access control systems, operating system design, and database security.</P>

      <H>Bell-LaPadula Model — Confidentiality Focus</H>
      <P>Bell-LaPadula is a formal model for mandatory access control focused on confidentiality. It defines two rules:</P>

      <div style={{ display: 'grid', gap: 10, margin: '0 0 24px' }}>
        {[
          { rule: 'Simple Security Property (No Read Up)', color: '#4285f4', desc: 'A subject at security level L can only read objects at level ≤ L. A Secret-cleared user cannot read Top Secret documents. This prevents a lower-clearance user from reading higher-classified data.' },
          { rule: '*-Property (No Write Down)', color: '#7b61ff', desc: 'A subject at security level L can only write to objects at level ≥ L. A Secret-cleared user cannot write to Unclassified documents. This prevents information from flowing from a higher classification to a lower one — even inadvertently.' },
        ].map((item) => (
          <div key={item.rule} style={{ background: 'var(--surface)', border: `1px solid ${item.color}25`, borderLeft: `3px solid ${item.color}`, borderRadius: 8, padding: '12px 16px' }}>
            <div style={{ fontSize: 13, fontWeight: 800, color: item.color, marginBottom: 4 }}>{item.rule}</div>
            <div style={{ fontSize: 13, color: 'var(--text)', lineHeight: 1.7 }}>{item.desc}</div>
          </div>
        ))}
      </div>

      <P>Modern application: government and military classification systems implement Bell-LaPadula. The principle of "no write down" also applies to cross-tenant data isolation in SaaS applications — a tenant's data must not flow to another tenant's context.</P>

      <H>Biba Model — Integrity Focus</H>
      <P>Biba is the integrity counterpart to Bell-LaPadula. It also defines two rules, but in the opposite direction:</P>

      <div style={{ display: 'grid', gap: 10, margin: '0 0 24px' }}>
        {[
          { rule: 'Simple Integrity Axiom (No Read Down)', color: '#00e676', desc: 'A subject at integrity level L can only read objects at level ≥ L. A high-integrity process should not read from a low-integrity source — doing so could corrupt the high-integrity process\'s state with unreliable data.' },
          { rule: '*-Integrity Axiom (No Write Up)', color: '#f97316', desc: 'A subject at integrity level L can only write to objects at level ≤ L. A low-integrity process cannot write to a high-integrity object — this prevents contaminating trusted data with untrusted input.' },
        ].map((item) => (
          <div key={item.rule} style={{ background: 'var(--surface)', border: `1px solid ${item.color}25`, borderLeft: `3px solid ${item.color}`, borderRadius: 8, padding: '12px 16px' }}>
            <div style={{ fontSize: 13, fontWeight: 800, color: item.color, marginBottom: 4 }}>{item.rule}</div>
            <div style={{ fontSize: 13, color: 'var(--text)', lineHeight: 1.7 }}>{item.desc}</div>
          </div>
        ))}
      </div>

      <P>Modern application: operating system privilege separation. A web browser (low integrity — it processes arbitrary internet content) is not allowed to write to system files (high integrity). This is enforced by OS-level access controls. Biba also explains why you should not trust input from lower-integrity sources without validation: user input is low-integrity and must not directly modify high-integrity application state.</P>

      <H>Brewer-Nash Model (Chinese Wall) — Conflict of Interest</H>
      <P>The Chinese Wall model addresses conflict of interest: a consultant who has worked with Coca-Cola should not access Pepsi's confidential data. Access is not based on classification level but on whether a conflict exists. This model is implemented in investment banking (analysts cannot access information about companies in competing deals) and law firms (attorneys cannot represent both sides of a dispute).</P>

      <H>Zero Trust — The Modern Security Architecture Model</H>
      <P>Zero Trust is not a product — it is an architectural principle: <Hl>never trust, always verify.</Hl> The traditional perimeter model granted trust to everything inside the network boundary. Zero Trust rejects this — a compromised internal device is just as dangerous as an external attacker, and the perimeter is increasingly meaningless in cloud and remote work environments.</P>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, margin: '20px 0 32px' }}>
        <div style={{ background: 'rgba(255,71,87,0.06)', border: '1px solid rgba(255,71,87,0.2)', borderRadius: 10, padding: '16px 18px' }}>
          <div style={{ fontSize: 12, fontWeight: 800, color: '#ff4757', marginBottom: 10 }}>Old Perimeter Model</div>
          <div style={{ fontSize: 12, color: 'var(--muted)', lineHeight: 1.7 }}>
            <p style={{ margin: '0 0 6px' }}>• External = untrusted</p>
            <p style={{ margin: '0 0 6px' }}>• Internal = trusted</p>
            <p style={{ margin: '0 0 6px' }}>• VPN gets you in → full access</p>
            <p style={{ margin: '0 0 6px' }}>• One-time authentication per session</p>
            <p style={{ margin: 0 }}>• Flat internal network</p>
          </div>
        </div>
        <div style={{ background: 'rgba(0,230,118,0.06)', border: '1px solid rgba(0,230,118,0.2)', borderRadius: 10, padding: '16px 18px' }}>
          <div style={{ fontSize: 12, fontWeight: 800, color: '#00e676', marginBottom: 10 }}>Zero Trust Model</div>
          <div style={{ fontSize: 12, color: 'var(--muted)', lineHeight: 1.7 }}>
            <p style={{ margin: '0 0 6px' }}>• Location = irrelevant</p>
            <p style={{ margin: '0 0 6px' }}>• Every request authenticated and authorised</p>
            <p style={{ margin: '0 0 6px' }}>• Least privilege access per request</p>
            <p style={{ margin: '0 0 6px' }}>• Continuous verification (device health, context)</p>
            <p style={{ margin: 0 }}>• Micro-segmentation prevents lateral movement</p>
          </div>
        </div>
      </div>

      <P>The five pillars of Zero Trust architecture: <Hl>Identity</Hl> (verify who every user and device is, every time). <Hl>Device</Hl> (verify the health and compliance of every device). <Hl>Network</Hl> (segment and encrypt internal traffic — no implicit trust on the LAN). <Hl>Application</Hl> (verify access per application, not per network). <Hl>Data</Hl> (classify data and apply controls at the data level, not just the perimeter).</P>

      <HR />

      {/* ── PART 07 ── */}
      <Part n="07" title="Extending the Triad — Parkerian Hexad and the Additional Properties" />

      <P>Some security frameworks extend the CIA triad with additional properties that are important in specific contexts:</P>

      <div style={{ display: 'grid', gap: 12, margin: '0 0 28px' }}>
        {[
          { prop: 'Authenticity', color: '#7b61ff', desc: 'The property of being genuine — verifying that a user, document, or system is what it claims to be. Authentication addresses this. Digital signatures prove the authenticity of a document. CIA does not explicitly include authenticity — it is a component of integrity (data is authentic if it was created by who claims to have created it) and access control (users are authentic if their identity is verified).' },
          { prop: 'Non-repudiation', color: '#f97316', desc: 'The inability to deny having performed an action. Digital signatures (not MACs) provide this — only the private key holder could have created the signature, so they cannot later claim they did not sign the document. Critical in legal, financial, and compliance contexts where proof of action is required.' },
          { prop: 'Accountability', color: '#facc15', desc: 'The ability to trace actions to the identities that performed them. Audit logs, multi-factor authentication, and unique user accounts (no shared accounts) support accountability. Without accountability, you know something happened but cannot determine who is responsible.' },
          { prop: 'Possession / Control', color: '#4285f4', desc: 'The property of having control over data — even if you cannot read encrypted data, the owner losing control of the encryption key means they have lost possession. The Parkerian Hexad adds Possession as a distinct property because you can violate possession without violating confidentiality (the data is still encrypted but now someone else controls the key).' },
        ].map((item) => (
          <div key={item.prop} style={{ background: 'var(--surface)', border: `1px solid ${item.color}25`, borderLeft: `3px solid ${item.color}`, borderRadius: 8, padding: '14px 18px' }}>
            <div style={{ fontSize: 13, fontWeight: 800, color: item.color, marginBottom: 6 }}>{item.prop}</div>
            <div style={{ fontSize: 13, color: 'var(--text)', lineHeight: 1.75 }}>{item.desc}</div>
          </div>
        ))}
      </div>

      <Callout type="info">
        For most security roles, CIA is sufficient. The Parkerian Hexad (Confidentiality, Possession, Integrity, Authenticity, Availability, Utility) appears in academic and some compliance contexts. The CISSP exam covers the CIA triad as the primary framework. Knowing the CIA triad deeply is more valuable than knowing the Hexad superficially.
      </Callout>

      <HR />

      {/* ── PART 08 ── */}
      <Part n="08" title="Applying the CIA Triad — Threat Modelling in Practice" />

      <P>The CIA triad is most useful when applied to a specific system. Threat modelling asks: for each asset, which CIA properties are at risk, from whom, and what controls address each?</P>

      <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 12, padding: '24px 28px', marginBottom: 24 }}>
        <div style={{ fontSize: 12, fontWeight: 700, color: C, marginBottom: 16 }}>Example: An e-commerce payment system</div>

        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 12 }}>
            <thead>
              <tr>
                {['Asset', 'C', 'I', 'A', 'Top Threat', 'Primary Control'].map((h) => (
                  <th key={h} style={{ padding: '8px 12px', textAlign: 'left', fontWeight: 700, fontSize: 11, textTransform: 'uppercase', color: 'var(--muted)', borderBottom: '1px solid var(--border)', background: 'var(--bg2)' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[
                ['Customer card data', '🔴 Critical', '🟡 High', '🟡 High', 'Data breach via SQL injection', 'Tokenisation + TLS + parameterised queries'],
                ['Order database', '🟡 High', '🔴 Critical', '🔴 Critical', 'Record modification / ransomware', 'Backups + integrity audit log + RBAC'],
                ['Payment processing API', '🟡 High', '🔴 Critical', '🔴 Critical', 'Transaction tampering / DDoS', 'TLS + signing + rate limiting + WAF'],
                ['Authentication system', '🔴 Critical', '🔴 Critical', '🔴 Critical', 'Credential stuffing / account takeover', 'MFA + rate limiting + breach password check'],
                ['Admin panel', '🔴 Critical', '🔴 Critical', '🟡 High', 'Insider threat / phishing admin', 'MFA + IP allowlist + session recording'],
                ['Static product images', '⚪ None', '🟢 Low', '🟡 High', 'CDN outage', 'CDN redundancy + availability monitoring'],
              ].map(([asset, c, i, a, threat, control], idx) => (
                <tr key={idx} style={{ background: idx % 2 === 0 ? 'var(--surface)' : 'var(--bg2)' }}>
                  <td style={{ padding: '8px 12px', fontWeight: 600, color: 'var(--text)', borderBottom: '1px solid var(--border)' }}>{asset}</td>
                  <td style={{ padding: '8px 12px', borderBottom: '1px solid var(--border)', textAlign: 'center' }}>{c}</td>
                  <td style={{ padding: '8px 12px', borderBottom: '1px solid var(--border)', textAlign: 'center' }}>{i}</td>
                  <td style={{ padding: '8px 12px', borderBottom: '1px solid var(--border)', textAlign: 'center' }}>{a}</td>
                  <td style={{ padding: '8px 12px', color: 'var(--muted)', borderBottom: '1px solid var(--border)', fontSize: 11 }}>{threat}</td>
                  <td style={{ padding: '8px 12px', color: 'var(--muted)', borderBottom: '1px solid var(--border)', fontSize: 11 }}>{control}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <P>The table makes explicit what is often implicit: static product images have no confidentiality requirement (they are public) and low integrity risk (a modified product image is a nuisance, not a crisis). But they have high availability requirements — when images fail to load, conversion rates drop. This tells you: invest in CDN redundancy for images, not encryption. For card data, the reverse: encrypt everything, accept slower processing.</P>

      <HR />

      {/* ── PART 09 ── */}
      <Part n="09" title="Interview Prep — 5 Questions With Complete Answers" />

      <IQ q="Explain the CIA triad with real-world examples of attacks against each property.">
        The CIA triad is the foundational framework for information security. It describes three properties that secure information systems must protect: Confidentiality, Integrity, and Availability. Every security decision can be analysed through this lens.
        {'\n\n'}
        Confidentiality means that information is accessible only to authorised parties. A data breach violates confidentiality — an attacker gains access to customer records, medical data, or financial information that they were not authorised to read. The 2021 T-Mobile breach exposed the personal data of 76 million customers. The 2018 Marriott breach exposed 500 million guest records. In both cases, the attack targeted confidentiality — the data was read by someone who should not have been able to read it. Controls: encryption, access controls, network segmentation, data classification.
        {'\n\n'}
        Integrity means that information is accurate and has not been modified without authorisation. Man-in-the-middle attacks on unencrypted connections can modify data in transit — an attacker between a client and server can change what the server receives. Software supply chain attacks violate integrity — the SolarWinds attack injected malicious code into legitimate software updates, meaning the software that users installed was not the software the vendor intended. Controls: cryptographic hashes, digital signatures, TLS, code signing, immutable audit logs.
        {'\n\n'}
        Availability means that systems and data are accessible when authorised users need them. Ransomware is primarily an availability attack — it encrypts files and makes them inaccessible until a ransom is paid. The 2017 NotPetya attack caused $10 billion in damages, largely by destroying data and taking systems offline. DDoS attacks target availability by overwhelming services with traffic. Controls: redundancy, load balancing, DDoS protection, backups (tested and stored offline), disaster recovery planning.
      </IQ>

      <IQ q="How would you use the CIA triad to evaluate a security decision?">
        The CIA triad provides a structured way to ask three questions about any security decision: does it improve or harm confidentiality? Does it improve or harm integrity? Does it improve or harm availability? And what are the trade-offs between these properties?
        {'\n\n'}
        Example: a company is deciding whether to enable full-disk encryption on all employee laptops. Applying the CIA triad: confidentiality — significantly improved. A lost or stolen laptop with full-disk encryption exposes no data. Without encryption, a thief can remove the drive and read all files. Integrity — encryption does not directly protect integrity. A compromised operating system with encryption enabled is still compromised. Availability — potential risk. If an employee forgets the encryption password or the recovery key is lost, the data is inaccessible — a confidentiality/availability trade-off. Hardware failure on an encrypted drive is also a more complex recovery situation.
        {'\n\n'}
        The CIA triad analysis concludes: enable encryption (confidentiality benefit outweighs availability risk), but mitigate the availability risk with a key escrow process (IT holds recovery keys) and backup policies. This is the kind of structured reasoning that distinguishes security engineering from ad-hoc decision-making.
        {'\n\n'}
        A second example: implementing rate limiting on an API. Confidentiality — minimal direct effect. Integrity — no direct effect. Availability — dual effect: it protects availability against denial-of-service from abusive clients, but too-aggressive rate limits could deny service to legitimate high-volume users. The decision: set limits high enough to allow legitimate traffic, low enough to stop abuse — a calibration decision informed by the CIA triad's availability analysis.
      </IQ>

      <IQ q="Why is ransomware primarily an availability attack, not a confidentiality attack?">
        Ransomware is classified primarily as an availability attack because its core mechanism is encrypting files and demanding payment for the decryption key — making data inaccessible, not necessarily stealing it.
        {'\n\n'}
        Modern ransomware operators have added a confidentiality component — "double extortion" — where they also exfiltrate data before encrypting it and threaten to publish it if the ransom is not paid. This extends the attack to target confidentiality as well. The 2020 Maze ransomware group pioneered this approach, followed by almost every major ransomware operation since.
        {'\n\n'}
        But the fundamental threat model of ransomware is availability: the organisation's operational data — databases, file shares, email — becomes inaccessible. Hospitals cannot access patient records. Manufacturers cannot access production systems. Government agencies cannot process applications. The ransom is paid not because secrets were exposed but because operations are stopped.
        {'\n\n'}
        This distinction matters for defences. If ransomware were purely a confidentiality attack, the defence would be encryption — encrypting your data before ransomware does prevents the threat. But since it is primarily an availability attack, the defence is backups: offline, tested, regularly verified backups allow recovery without paying the ransom. The NHS's response to the 2017 WannaCry attack was impaired because many systems lacked offline backups. Organisations with tested offline backups recovered from ransomware in hours rather than weeks.
        {'\n\n'}
        The backup must be offline or air-gapped — ransomware specifically searches for and encrypts network-connected backup systems. Online backups on the same network are compromised alongside everything else.
      </IQ>

      <IQ q="What is the principle of least privilege and which CIA property does it primarily protect?">
        The principle of least privilege states that every user, process, and system should have access to only the minimum resources and permissions necessary to perform its defined function — nothing more. A customer service representative needs to view order history; they do not need to export the entire customer database or modify pricing. A web server process needs to read web files; it does not need to write to system directories or read /etc/shadow.
        {'\n\n'}
        Least privilege primarily protects confidentiality: by limiting what each identity can access, it limits the blast radius of a compromise. A compromised customer service account cannot access cardholder data it was never authorised to see. A compromised web server process cannot read database credentials stored in a protected configuration file.
        {'\n\n'}
        But least privilege also protects integrity and availability. Integrity: if a process cannot write to critical system files, a compromised process cannot corrupt those files. Availability: if a user cannot delete the production database, a disgruntled or compromised user cannot take down the system by dropping tables.
        {'\n\n'}
        Implementing least privilege in practice: Role-Based Access Control (RBAC) defines roles with the minimum permissions each role needs. Service accounts for applications should have only the database permissions the application actually uses — SELECT on specific tables, not full DBA access. Temporary elevated access (privileged access management) provides elevated permissions only when needed and for a defined time window. Network segmentation limits which services can communicate, preventing lateral movement even by authenticated principals.
      </IQ>

      <IQ q="Explain Zero Trust architecture. How does it differ from the traditional perimeter security model?">
        The traditional perimeter security model is built on a distinction between "inside" and "outside": the internal network is trusted, the external network is not. Firewalls enforce the perimeter; once inside — through a VPN, a physical connection, or a compromised credential — an attacker has relatively free movement across the internal network. This model assumed that compromising the perimeter was hard, and that internal actors were trustworthy.
        {'\n\n'}
        Zero Trust rejects both assumptions. The principle is: never trust, always verify. Network location does not confer trust. A device on the internal corporate network is not more trusted than a device on the public internet. Every request must be authenticated and authorised, regardless of where it comes from.
        {'\n\n'}
        The practical implications of Zero Trust: strong identity verification before every access (MFA, certificate-based device authentication). Continuous authorisation — not just at login, but per request. Least-privilege access per application, not per network. Network micro-segmentation — each service can only communicate with other services it explicitly needs to reach, preventing lateral movement. Encryption everywhere — internal traffic is encrypted just as external traffic is. All access is logged and monitored regardless of network location.
        {'\n\n'}
        Why Zero Trust is necessary now: the corporate network perimeter has dissolved. Remote work means corporate devices connect from home networks, coffee shops, and hotels. SaaS applications are outside the corporate network entirely. Cloud workloads run in data centres the company does not control. The "inside" of the network is no longer a meaningful concept. Zero Trust is not a product you buy — it is an architectural principle that requires changes to identity systems, network architecture, access control policies, and monitoring.
        {'\n\n'}
        Zero Trust directly addresses the most common attack pattern: compromised credentials used to move laterally through a flat internal network. With Zero Trust, compromised credentials provide access only to the specific resources that credential was authorised to reach — not to everything on the internal network.
      </IQ>

      <HR />

      {/* ── Error Library ── */}
      <Part n="10" title="CIA Triad Failures That Appear in Real Incidents" />

      <Err
        msg="Confidentiality failure: sensitive data returned in error messages"
        cause="A web application returns verbose error messages in production. A SQL error message says: 'Error: column 'credit_card_number' from table 'payments' does not exist — near line 3 of stored procedure uspProcessPayment'. This error message reveals the database table structure, column names, stored procedure name, and the fact that credit card numbers are stored (not tokenised). An attacker deliberately triggers errors to enumerate the database structure before crafting a SQL injection attack."
        fix="Configure production applications to return generic error messages to users — 'An error occurred, please try again' — and log the detailed error server-side. Application frameworks support this via environment-based error display settings (Django's DEBUG=False, Express's error handler). Never include database schema details, stack traces, server paths, or configuration details in user-facing error messages. The detailed error is invaluable for debugging — on the server, in logs, never in the response."
      />

      <Err
        msg="Integrity failure: audit log modification after a security incident"
        cause="An attacker achieves root access on a server. The first action is clearing /var/log/auth.log and truncating /var/log/syslog to eliminate evidence of how they got in and what they did. The security team detects the compromise 48 hours later but cannot determine the initial access vector, the full extent of lateral movement, or what data was accessed because the logs do not exist."
        fix="Centralise logs to a remote, append-only log management system before you need them. rsyslog with TLS forwarding to a separate logging server, AWS CloudWatch Logs, or a SIEM like Splunk ensures that local log deletion cannot destroy the evidence trail. For highest integrity requirements, use immutable log storage where records cannot be modified or deleted for a defined retention period. Configure auditd on Linux systems to log at the kernel level — this captures events that application-level logging misses."
      />

      <Err
        msg="Availability failure: backup restoration fails during a ransomware incident"
        cause="An organisation has daily backups but has never tested restoration. During a ransomware attack, the operations team attempts to restore from backup. The backup files themselves were encrypted by ransomware three weeks ago (the ransomware had been dormant). Even the backups stored on the backup server were encrypted because it was reachable from the compromised network. The untested backups from before the ransomware infection are six months old."
        fix="Test backups by restoring them to a staging environment quarterly — not just by verifying the backup files exist. Use the 3-2-1 backup rule: three copies, two different media types, one offline (physically disconnected, not just logically separated). Offline or air-gapped backups cannot be encrypted by ransomware that accessed the network. Restore time is as important as backup frequency — a backup that takes three weeks to restore does not meet a 24-hour RTO (Recovery Time Objective). Test the restoration process end-to-end, not just the backup job."
      />

      <Err
        msg="CIA trade-off ignored: strong authentication breaks emergency access"
        cause="A hospital implements strict MFA — all clinical systems require a hardware token for authentication. The security posture improves significantly. During a code blue emergency, the on-call physician needs immediate access to a patient's medication list and allergy information. The physician does not have their hardware token — it is in their locker across the hospital. The clinical system is inaccessible. Maximum confidentiality has created a life-safety availability failure."
        fix="Security controls must be designed with the operational context of their users in mind. Healthcare systems use 'break-glass' accounts — emergency access procedures that bypass normal authentication controls during defined emergencies, with full audit logging of the break-glass access. Every use is reviewed after the fact. The CIA trade-off is explicit: availability takes precedence in a life-safety emergency, with accountability compensating for reduced access control. Security requirements do not override operational requirements — they must accommodate them with appropriate compensating controls."
      />

      <Err
        msg="Zero Trust not applied internally: compromised developer account = production database access"
        cause="A company implements Zero Trust at the network perimeter but maintains a flat internal network. Developer accounts are in the same Active Directory domain as production systems. A developer's laptop is compromised via a phishing email. The attacker uses the developer's credentials to browse the internal network, discovers the production database server on the same subnet, and connects directly using the developer's AD credentials — which also have read access to the production database because 'developers need it for debugging'."
        fix="Zero Trust must apply to the internal network, not just the perimeter. Micro-segment the network: production systems should be in a separate network segment reachable only from specific jump hosts with additional authentication. Production database access should require a separate credential distinct from the developer's workstation credential. Privileged access management (PAM) provides time-limited, logged access to production resources — accessed via a separate authentication step, not automatic inheritance from workstation credentials. The blast radius of a compromised developer laptop should not reach production databases."
      />

      {/* ── Key Takeaways ── */}
      <KeyTakeaways items={[
        'The CIA triad — Confidentiality, Integrity, Availability — is the foundational vocabulary for reasoning about information security. Every attack violates at least one property; every control protects at least one. Without this vocabulary, security decisions are made without a shared framework.',
        'Confidentiality: only authorised parties can read information. Protected by encryption, access controls, data classification, and tokenisation. Violated by data breaches, eavesdropping, SQL injection, and credential theft. Extending to privacy adds legal obligations via GDPR, HIPAA, and CCPA.',
        'Integrity: information is accurate and unmodified. Protected by cryptographic hashes, digital signatures, MACs, audit logs, and immutable storage. Violated by man-in-the-middle modifications, supply chain attacks, log tampering, and financial record manipulation. Integrity failures are often more dangerous than confidentiality failures — corrupted data leads to wrong decisions.',
        'Availability: systems and data are accessible when needed. Protected by redundancy, load balancing, DDoS mitigation, backups, and disaster recovery. Violated by ransomware, DDoS attacks, hardware failures, and software bugs. Availability SLAs (99.9%, 99.99%) drive architecture complexity and cost.',
        'CIA properties conflict and cannot all be maximised simultaneously. Confidentiality and availability trade off (lost encryption keys make data inaccessible). Integrity checks reduce throughput. End-to-end encryption prevents content moderation. Every security design is a deliberate set of trade-offs, not an optimisation.',
        'Bell-LaPadula enforces confidentiality: no read up (cannot read above your clearance), no write down (cannot write below your clearance — prevents information downgrade). Biba enforces integrity: no read down (do not trust lower-integrity sources), no write up (low-integrity subjects cannot modify high-integrity objects).',
        'Zero Trust rejects the premise that network location implies trust. Never trust, always verify — every request is authenticated and authorised regardless of where it originates. Identity, device health, context, and least-privilege access per request replace network perimeter as the primary security boundary.',
        'Threat modelling with the CIA triad makes implicit risks explicit: which assets are at risk, which CIA properties are at stake, what is the likelihood and impact of each threat, and which controls address each risk. This converts security from intuition to a documented, prioritised risk register.',
        'Ransomware is primarily an availability attack — data becomes inaccessible, not necessarily stolen. The defence is offline backups, not encryption. Modern ransomware adds double extortion (exfiltration + encryption), adding a confidentiality component. Know which property is being attacked to choose the right control.',
        'The principle of least privilege protects all three CIA properties: confidentiality (can only access what is needed), integrity (can only modify what is needed), availability (cannot accidentally or maliciously destroy resources beyond role scope). It directly limits the blast radius of any single compromised account.',
      ]} />

      {/* ── Next Module CTA ── */}
      <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 10, padding: '24px', marginTop: 40 }}>
        <p style={{ fontSize: 10, color: 'var(--muted)', letterSpacing: '.12em', textTransform: 'uppercase', fontFamily: 'var(--font-mono)', fontWeight: 700, margin: '0 0 10px' }}>
          What comes next
        </p>
        <p style={{ fontSize: 15, color: 'var(--text)', lineHeight: 1.85, margin: '0 0 20px' }}>
          In <strong>Module 06</strong>, you get the full picture of the US cybersecurity job market — every role mapped with real salary data, which certifications are worth pursuing at which stage, and the companies hiring the most security engineers right now.
        </p>
        <Link href="/learn/cybersecurity/cybersecurity-careers-us" style={{ background: C, color: '#fff', padding: '11px 24px', borderRadius: 7, fontWeight: 700, fontSize: 13, textDecoration: 'none', display: 'inline-block' }}>
          Module 06 → Cybersecurity Career Paths and the US Job Market
        </Link>
      </div>

    </LearnLayout>
  )
}
