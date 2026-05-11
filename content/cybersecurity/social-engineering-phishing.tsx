import type { Metadata } from 'next'
import Link from 'next/link'
import { LearnLayout } from '@/components/content/LearnLayout'
import { Callout } from '@/components/content/Callout'
import { KeyTakeaways } from '@/components/content/KeyTakeaways'

export const metadata: Metadata = {
  title: 'Social Engineering and Phishing | Chaduvuko',
  description: 'The most successful attack vector in history — how social engineering works, why humans are the hardest patch, and how organisations defend against it.',
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

export default function SocialEngineeringPhishing() {
  return (
    <LearnLayout
      title="Social Engineering and Phishing"
      description="The most successful attack vector in history — how social engineering works, why humans are the hardest patch, and how organisations defend against it."
      section="Cybersecurity — Module 08"
      readTime="28 min"
      updatedAt="May 2026"
    >

      {/* ── PART 01 ── */}
      <Part n="01" title="The Attack That Never Fails — Social Engineering" />

      <P>You can patch every vulnerability in your software. You can deploy the best firewall, the most advanced EDR, the most sophisticated SIEM. You cannot patch human psychology. Social engineering exploits not a flaw in your code but a feature of the human brain — the cognitive shortcuts, social instincts, and emotional responses that make humans functional in society. These same features make humans reliably manipulable.</P>

      <P>The numbers are unambiguous. The Verizon Data Breach Investigations Report (DBIR) consistently attributes <Hl>68–80% of breaches to the human element</Hl> — phishing, credential reuse, or social engineering in some form. The most sophisticated technical attacks frequently begin with a phishing email that delivers an employee's credentials to an attacker. The SolarWinds supply chain attack — which compromised US government agencies, Microsoft, and thousands of organisations — began with a credential compromise.</P>

      <div style={{ background: `${C}08`, border: `1px solid ${C}25`, borderLeft: `4px solid ${C}`, borderRadius: '0 10px 10px 0', padding: '20px 24px', margin: '4px 0 28px' }}>
        <P>Social engineering is the art of manipulating people into taking actions or divulging information they should not. It does not require technical sophistication. The best social engineering attacks require psychological sophistication — understanding how people think, what they respond to, and what mental shortcuts can be exploited. This module covers both how attacks work and how defences address a problem that cannot be solved by patching.</P>
      </div>

      <HR />

      {/* ── PART 02 ── */}
      <Part n="02" title="The Psychological Principles Social Engineering Exploits" />

      <P>Robert Cialdini's research on influence (Influence: The Psychology of Persuasion, 1984) identified six principles of persuasion. Social engineers weaponise all six — not as an academic exercise, but as explicit techniques in attack methodologies.</P>

      <div style={{ display: 'grid', gap: 12, margin: '0 0 28px' }}>
        {[
          {
            principle: 'Authority',
            color: '#ff4757',
            how: 'People comply with requests from perceived authority figures. An email claiming to be from the CEO, IRS, Microsoft Support, or a senior manager is more likely to produce compliance than one from an unknown sender.',
            attack: 'Business Email Compromise (BEC): email appearing to come from the CEO instructing finance to wire money to a new vendor urgently. CEO fraud costs US businesses $2.7 billion annually.',
            example: '"Hi Susan, this is David Chen from IT Security. We have detected suspicious activity on your account and need you to verify your credentials immediately to prevent lockout."',
          },
          {
            principle: 'Urgency / Scarcity',
            color: '#f97316',
            how: 'When people believe they must act immediately or lose something, they bypass deliberate thinking and act reflexively. Urgency disables the evaluation that would reveal the manipulation.',
            attack: 'Phishing emails with "Your account will be suspended in 24 hours", "Your Microsoft subscription is expiring", "Immediate action required to prevent access loss."',
            example: '"URGENT: Suspicious login detected on your account from Russia. Click here immediately to secure your account or access will be suspended in 2 hours."',
          },
          {
            principle: 'Social Proof',
            color: '#7b61ff',
            how: 'People look to others\' behaviour to determine what is appropriate. If everyone else is doing something, it must be the right thing to do. Attackers claim consensus to reduce resistance.',
            attack: '"All employees have already updated their credentials to the new system. Your account is the only one pending." Creates fear of being the non-compliant exception.',
            example: '"Following the company-wide security upgrade last week, all 847 employees have migrated to the new authentication system. Please complete your migration to avoid service disruption."',
          },
          {
            principle: 'Reciprocity',
            color: '#4285f4',
            how: 'People feel obligated to return favours. An attacker who provides something of value first creates a psychological debt that the target wants to repay.',
            attack: 'Spearphishing with a "free" useful resource: "I put together this industry report specifically for your team" — the attachment contains malware. The gift creates goodwill that disables suspicion.',
            example: 'Attacker sends a genuinely useful document to establish trust, then follows up weeks later with the malicious payload — exploiting the goodwill established by the initial gift.',
          },
          {
            principle: 'Liking',
            color: '#00e676',
            how: 'People comply with requests from people they like. Attackers build rapport — using the target\'s name, referencing shared interests, mentioning mutual connections — before making their request.',
            attack: 'Pretexting: an attacker calls posing as a fellow employee who mentions their common manager, refers to a recent company event, and establishes enough familiarity that a small request feels natural.',
            example: '"Hi! I\'m Alex from the Chicago office. I was just talking to your manager Mike about the Salesforce migration. I\'m in a pinch — can you reset my VPN access? Mike said you were the right person to ask."',
          },
          {
            principle: 'Commitment / Consistency',
            color: '#facc15',
            how: 'Once people commit to something — even something small — they feel psychological pressure to remain consistent with that commitment. Small initial compliance leads to larger later compliance.',
            attack: 'Foot-in-the-door technique: get the target to agree to a small request first, then escalate. A small security survey leads to a credential submission. An initial helpful interaction leads to a larger favour later.',
            example: 'Attacker establishes contact over multiple calls, getting small confirmations each time. By the fifth call, the target has been consistently helpful — and a request for sensitive information seems like just more of the same.',
          },
        ].map((item) => (
          <div key={item.principle} style={{ background: 'var(--surface)', border: `1px solid ${item.color}20`, borderLeft: `3px solid ${item.color}`, borderRadius: 10, padding: '16px 20px' }}>
            <div style={{ fontSize: 14, fontWeight: 800, color: item.color, marginBottom: 8 }}>{item.principle}</div>
            <div style={{ fontSize: 13, color: 'var(--text)', lineHeight: 1.7, marginBottom: 10 }}>{item.how}</div>
            <div style={{ fontSize: 12, color: 'var(--muted)', marginBottom: 8 }}><strong style={{ color: 'var(--text)' }}>In attacks: </strong>{item.attack}</div>
            <div style={{ fontSize: 11, fontFamily: 'var(--font-mono)', color: 'var(--muted)', background: 'var(--bg2)', border: '1px solid var(--border)', borderRadius: 6, padding: '8px 12px', lineHeight: 1.6 }}>"{item.example}"</div>
          </div>
        ))}
      </div>

      <HR />

      {/* ── PART 03 ── */}
      <Part n="03" title="Phishing — The Most Productive Attack in Existence" />

      <P>Phishing is the act of deceiving people into revealing sensitive information or performing actions by impersonating a trusted entity via electronic communication — email, SMS, voice calls, and increasingly social media. It is the most common initial access technique across all attack categories: ransomware, nation-state espionage, and financial fraud all rely on phishing as a primary or secondary vector.</P>

      <H>Types of Phishing Attacks</H>

      <div style={{ display: 'grid', gap: 12, margin: '0 0 28px' }}>
        {[
          {
            type: 'Mass phishing',
            color: '#4285f4',
            scale: 'Millions of recipients',
            sophistication: 'Low',
            desc: 'Generic phishing sent to millions of addresses at once. Low conversion rate (0.1–1%) but massive volume ensures thousands of victims. Pretends to be banks, Microsoft, PayPal, Amazon, or government agencies. Grammar and visual design may be poor.',
            example: '"Your PayPal account has been limited. Click here to restore access." Sent to 5 million email addresses. Even 0.01% success rate = 500 victims.',
          },
          {
            type: 'Spearphishing',
            color: '#7b61ff',
            scale: 'Single individual',
            sophistication: 'High',
            desc: 'Targeted phishing crafted for a specific individual using researched personal details — their manager\'s name, a recent project, their company\'s technology stack, their LinkedIn profile. High conversion rate because it is convincing.',
            example: '"Hi Sarah, Mike Chen asked me to follow up on the Q3 budget reconciliation you were working on. The spreadsheet didn\'t come through — can you re-upload to this secure link?"',
          },
          {
            type: 'Whaling',
            color: '#f97316',
            scale: 'C-suite executives',
            sophistication: 'Very high',
            desc: 'Spearphishing targeting executives (CEO, CFO, CISO) who have the authority to authorise large transfers or access sensitive data. The research investment is justified by the potential payoff.',
            example: 'A synthetic voice call (using AI-cloned voice) impersonating the CEO instructs the CFO to wire $4M to a vendor for a confidential acquisition — the CFO recognises the voice and complies.',
          },
          {
            type: 'Vishing (voice phishing)',
            color: '#ff4757',
            scale: 'Individual or small group',
            sophistication: 'Medium-High',
            desc: 'Phone-based social engineering. Attackers call pretending to be IT support, the IRS, Microsoft technical support, or law enforcement. Voice creates urgency and authority that text lacks.',
            example: '"This is Microsoft Support calling about your computer sending error reports. If we don\'t fix this today, your computer will be locked." Classic tech support scam targeting elderly victims.',
          },
          {
            type: 'Smishing (SMS phishing)',
            color: '#00e676',
            scale: 'Mass or targeted',
            sophistication: 'Low-Medium',
            desc: 'SMS-based phishing. Mobile users click links more readily on their phones. SMS phishing for package delivery notifications, bank alerts, and account verification are extremely common.',
            example: '"USPS: Your package #94001116 requires action. Verify delivery address: [malicious link]" Sent during peak holiday shopping season when people expect package deliveries.',
          },
          {
            type: 'Business Email Compromise (BEC)',
            color: '#facc15',
            scale: 'Single organisation',
            sophistication: 'Very high',
            desc: 'The attacker compromises or impersonates a business email account to conduct fraud — instructing wire transfers, changing vendor payment information, or requesting sensitive data. BEC losses exceed all other cybercrime combined.',
            example: 'Attacker monitors a compromised email account for weeks, learning payment processes and vendor relationships. Then intercepts a legitimate invoice thread and redirects payment to attacker-controlled account.',
          },
        ].map((item) => (
          <div key={item.type} style={{ background: 'var(--surface)', border: `1px solid ${item.color}20`, borderRadius: 10, padding: '16px 20px' }}>
            <div style={{ display: 'flex', gap: 12, marginBottom: 8, flexWrap: 'wrap', alignItems: 'center' }}>
              <div style={{ fontSize: 14, fontWeight: 800, color: item.color }}>{item.type}</div>
              <div style={{ fontSize: 11, color: 'var(--muted)', background: 'var(--bg2)', border: '1px solid var(--border)', borderRadius: 4, padding: '1px 6px' }}>{item.scale}</div>
              <div style={{ fontSize: 11, color: 'var(--muted)', background: 'var(--bg2)', border: '1px solid var(--border)', borderRadius: 4, padding: '1px 6px' }}>Sophistication: {item.sophistication}</div>
            </div>
            <div style={{ fontSize: 13, color: 'var(--text)', lineHeight: 1.7, marginBottom: 8 }}>{item.desc}</div>
            <div style={{ fontSize: 11, fontFamily: 'var(--font-mono)', color: 'var(--muted)', background: 'var(--bg2)', border: '1px solid var(--border)', borderRadius: 6, padding: '8px 12px', lineHeight: 1.6 }}>Example: {item.example}</div>
          </div>
        ))}
      </div>

      <HR />

      {/* ── PART 04 ── */}
      <Part n="04" title="Anatomy of a Phishing Email — What Makes One Convincing" />

      <P>Understanding what makes a phishing email convincing helps both security teams design better training and users recognize real attacks. A sophisticated phishing email has several key components:</P>

      <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 12, padding: '24px', marginBottom: 24 }}>
        <div style={{ fontSize: 12, fontWeight: 700, color: C, marginBottom: 16, fontFamily: 'var(--font-mono)' }}>Anatomy of a sophisticated phishing email</div>

        {[
          { element: 'From address', desc: 'May be spoofed (without SPF/DKIM), use a look-alike domain (paypa1.com, microsft.com), or a compromised legitimate account. The display name can say anything — "Microsoft Security Team" — but the actual address reveals the truth.', indicator: 'Check the full email address, not just the display name. Look for substitutions (l→1, o→0) or extra words (microsoft-security.com vs microsoft.com).' },
          { element: 'Subject line', desc: 'Engineered to trigger urgency or curiosity: "URGENT: Action Required", "Your account has been compromised", "Invoice #4721 due today", "Unusual sign-in activity". The subject determines whether the email is opened.', indicator: 'Urgency, threat of loss, or unexpected notifications warrant extra caution before clicking anything.' },
          { element: 'Personalisation', desc: 'Spearphishing includes your real name, your manager\'s name, your company name, your role, and references to real internal projects or systems. This information comes from LinkedIn, company websites, and data breaches.', indicator: 'Personalisation makes an email feel legitimate — but it only proves the attacker did research, not that the email is real.' },
          { element: 'Body content', desc: 'Creates a plausible scenario with emotional pressure. May include company branding (logos, colours copied from real communications). May include real background information about recent events to increase credibility.', indicator: 'Requests for credentials, wire transfers, gift cards, or unusual actions — even in a seemingly normal context — should trigger verification through a separate channel.' },
          { element: 'Call to action', desc: 'Every phishing email wants the victim to do something: click a link, open an attachment, reply with information, call a phone number. The call to action is designed to feel natural and urgent.', indicator: 'Any link should be verified by hovering to see the actual URL. Any attachment should be questioned: was this expected? From this person?' },
          { element: 'The landing page', desc: 'Phishing links lead to credential harvesting pages — pixel-perfect clones of legitimate login pages (Microsoft 365, Gmail, Outlook). The page submits credentials to the attacker\'s server before optionally redirecting to the real site.', indicator: 'Check the URL bar — the domain must match. A page that looks exactly like Microsoft login at a domain that is not microsoft.com is a phishing page regardless of visual accuracy.' },
        ].map((item, i) => (
          <div key={item.element} style={{ marginBottom: 16, paddingBottom: 16, borderBottom: i < 5 ? '1px solid var(--border)' : 'none' }}>
            <div style={{ fontSize: 13, fontWeight: 800, color: C, marginBottom: 4 }}>{item.element}</div>
            <div style={{ fontSize: 13, color: 'var(--text)', lineHeight: 1.7, marginBottom: 6 }}>{item.desc}</div>
            <div style={{ fontSize: 12, color: '#00e676' }}>🔍 Spot it: {item.indicator}</div>
          </div>
        ))}
      </div>

      <HR />

      {/* ── PART 05 ── */}
      <Part n="05" title="Other Social Engineering Attack Forms" />

      <H>Pretexting — Creating a False Context</H>
      <P>Pretexting is building a fabricated scenario (the pretext) to extract information or access. The attacker adopts a persona — IT support, a vendor representative, an auditor, a new employee — and uses that persona to make requests that seem reasonable within the constructed context.</P>
      <P>A famous real-world example: Kevin Mitnick (one of the most notorious hackers in history) described how pretexting worked in practice. An attacker calls the help desk claiming to be a recently promoted VP who forgot their password before an important board presentation. The urgency, the high-status persona, and the sympathetic scenario cause the help desk to bypass normal verification procedures and reset the password without proper authentication. No technical skill was used.</P>

      <H>Vishing — The Phone That Never Lies</H>
      <P>Voice creates psychological effects that text cannot replicate: voice conveys authority, urgency, and emotional state in ways that text cannot fake easily. AI-powered voice synthesis has changed the threat landscape significantly — attackers can now clone a voice from as little as three seconds of audio. A CFO who receives a call from what sounds exactly like the CEO's voice is much harder to train to resist.</P>
      <P>The 2020 CWT ransomware attack involved the attackers calling CWT executives directly after encrypting systems, negotiating the $4.5M ransom payment over the phone — demonstrating that voice-based social engineering occurs even at the resolution phase of attacks.</P>

      <H>Baiting — USB Drops and Free Malware</H>
      <P>Baiting uses curiosity or greed to deliver malware. The classic attack: USB drives labelled "Q3 Salaries" or "Confidential HR Records" are left in a parking lot, lobby, or conference room. An employee picks one up and plugs it in — automounting malware or exploiting browser auto-run functionality. The 2008 compromise of a US military classified network began with an infected USB drive found in a parking lot at a base in the Middle East.</P>

      <H>Quid Pro Quo — The IT Support Scam</H>
      <P>An attacker calls employees randomly, claiming to be IT support fixing a problem everyone is experiencing. Most people are not experiencing the problem — they hang up. But some are (or believe they might be) — and they allow the attacker to walk them through "troubleshooting" steps that install malware or provide remote access.</P>

      <H>Watering Hole Attacks — Compromising Trusted Sites</H>
      <P>Rather than going to the target, the attacker waits at a place the target reliably visits. Industry news sites, professional forums, and vendor websites frequented by the target organisation are compromised. When employees visit these legitimate sites, malware is delivered via browser exploits. The APT group behind the 2013 iOS developer forum attack compromised a legitimate Apple developer site, infecting employee machines at multiple technology companies including Facebook, Twitter, and Apple itself.</P>

      <HR />

      {/* ── PART 06 ── */}
      <Part n="06" title="Email Authentication — SPF, DKIM, DMARC" />

      <P>Email was designed without authentication — any server can claim to send email from any address. Three protocols address this, and all three must be correctly configured to prevent email spoofing:</P>

      <div style={{ display: 'grid', gap: 12, margin: '0 0 28px' }}>
        {[
          {
            protocol: 'SPF (Sender Policy Framework)',
            color: '#4285f4',
            desc: 'A DNS TXT record that lists which mail servers are authorised to send email for your domain. Receiving mail servers check whether the sending server IP is in the SPF record.',
            config: 'v=spf1 include:_spf.google.com include:mail.example.com ~all',
            limitation: 'SPF only checks the envelope sender (the SMTP MAIL FROM), not the From: header that users see. An attacker can pass SPF while showing a spoofed From: header.',
          },
          {
            protocol: 'DKIM (DomainKeys Identified Mail)',
            color: '#7b61ff',
            desc: 'Adds a cryptographic signature to emails. The sending server signs the email with a private key. The recipient verifies the signature using the public key published in DNS.',
            config: 'A DNS TXT record: selector._domainkey.example.com containing the public key',
            limitation: 'DKIM proves the email was signed by the domain\'s key but does not tell the recipient what to do with email that fails DKIM validation. DMARC does.',
          },
          {
            protocol: 'DMARC (Domain-based Message Authentication, Reporting, and Conformance)',
            color: '#00e676',
            desc: 'A DNS policy that tells receiving servers what to do with email that fails SPF or DKIM: none (monitoring only), quarantine (send to spam), or reject (block the email). Also enables aggregate and forensic reporting.',
            config: 'v=DMARC1; p=reject; rua=mailto:dmarc@example.com; ruf=mailto:dmarc@example.com',
            limitation: 'Enforcing DMARC rejection requires correct SPF and DKIM for all legitimate email sources — misconfiguration can block legitimate emails. A monitoring-only policy (p=none) with DMARC provides visibility without enforcement risk.',
          },
        ].map((item) => (
          <div key={item.protocol} style={{ background: 'var(--surface)', border: `1px solid ${item.color}20`, borderLeft: `3px solid ${item.color}`, borderRadius: 8, padding: '14px 18px' }}>
            <div style={{ fontSize: 13, fontWeight: 800, color: item.color, marginBottom: 6 }}>{item.protocol}</div>
            <div style={{ fontSize: 13, color: 'var(--text)', lineHeight: 1.7, marginBottom: 8 }}>{item.desc}</div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--muted)', background: 'var(--bg2)', border: '1px solid var(--border)', borderRadius: 6, padding: '6px 10px', marginBottom: 8 }}>{item.config}</div>
            <div style={{ fontSize: 11, color: '#f97316' }}>⚠ Limitation: {item.limitation}</div>
          </div>
        ))}
      </div>

      <Callout type="tip">
        The correct configuration is SPF + DKIM + DMARC with p=reject. This combination means: SPF verifies the sending server is authorised. DKIM verifies the message signature. DMARC tells receivers to reject any email that fails both SPF and DKIM alignment. Many organisations have SPF without DMARC enforcement — which means a spoofed email can still be delivered if the attacker sends from an unrelated server.
      </Callout>

      <HR />

      {/* ── PART 07 ── */}
      <Part n="07" title="Defending Against Social Engineering — What Actually Works" />

      <P>Social engineering defences operate at three levels: technical controls that reduce attack surface, process controls that make attacks harder to execute, and awareness training that improves human detection. No single level is sufficient — all three must work together.</P>

      <H>Technical Controls</H>
      <div style={{ display: 'grid', gap: 10, margin: '0 0 24px' }}>
        {[
          { control: 'Email authentication (SPF + DKIM + DMARC)', impact: 'High', desc: 'DMARC with p=reject prevents domain spoofing — the most common way phishing emails pretend to come from your organisation.' },
          { control: 'MFA on all accounts', impact: 'Very High', desc: 'A phished password is useless without the second factor. Phishing-resistant MFA (hardware keys, passkeys) defeats even real-time phishing attacks that capture TOTP codes.' },
          { control: 'Email gateway with sandboxing', impact: 'Medium-High', desc: 'Scans attachments in a sandbox before delivery. Blocks known-malicious URLs. Strips active content from Office documents. Catches mass phishing but struggles against targeted, novel attacks.' },
          { control: 'Browser isolation', impact: 'Medium', desc: 'Renders web content in a remote environment. Even if a user clicks a phishing link, malicious code executes in isolation and cannot reach the endpoint.' },
          { control: 'Conditional access / zero trust', impact: 'High', desc: 'Even with a valid credential, access requires device compliance, MFA, and contextual signals. A phished credential without the registered device cannot complete login.' },
          { control: 'Anti-spoofing display name checks', impact: 'Medium', desc: 'Email gateways can flag emails where the display name matches an internal executive but the email address is external — detecting display name spoofing without domain spoofing.' },
        ].map((item) => (
          <div key={item.control} style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 8, padding: '12px 16px', display: 'flex', gap: 12, alignItems: 'flex-start' }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: item.impact === 'Very High' ? '#00e676' : item.impact === 'High' ? '#4285f4' : '#f97316', background: 'var(--bg2)', border: '1px solid var(--border)', borderRadius: 4, padding: '2px 6px', flexShrink: 0, whiteSpace: 'nowrap' }}>{item.impact}</div>
            <div>
              <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--text)', marginBottom: 4 }}>{item.control}</div>
              <div style={{ fontSize: 12, color: 'var(--muted)', lineHeight: 1.65 }}>{item.desc}</div>
            </div>
          </div>
        ))}
      </div>

      <H>Process Controls</H>
      <P><Hl>Out-of-band verification:</Hl> Any unusual request — wire transfers, password resets for executives, access to sensitive data — should be verified through a second, independent channel. If a request comes via email, call the requester at their known phone number (not a number provided in the suspicious email). This single control defeats BEC attacks because the attacker cannot intercept the verification call.</P>
      <P><Hl>Dual control for financial transactions:</Hl> Wire transfers above a defined threshold require approval from two people. The attacker who has compromised one person cannot complete the transfer without also compromising the approver. The 2016 Bangladesh Bank heist ($81M stolen via SWIFT) succeeded partly because the bank lacked dual-control requirements for large transfers.</P>
      <P><Hl>Verification playbooks for help desk:</Hl> The help desk should have explicit verification procedures for every type of request — password resets, account unlocks, MFA device additions. "Your manager told me to do this" should not bypass verification. "I am a senior executive and need this done now" should not bypass verification. Written procedures that staff are trained and empowered to follow are more effective than individual judgment.</P>

      <H>Security Awareness Training — What Works and What Does Not</H>
      <P><Hl>What does not work:</Hl> Annual compliance training that employees click through without engagement. Generic "do not click phishing links" messaging without examples. Training that treats employees as the problem rather than as the last line of defence. Shame-based training that embarrasses employees who fail phishing simulations.</P>
      <P><Hl>What works:</Hl> Frequent, short, engaging training (microlearning) rather than annual marathons. Simulated phishing campaigns with immediate educational feedback — when an employee clicks a simulated phishing link, they immediately see an explanation of what they missed, rather than finding out at the next training session. Role-specific training — the finance team needs training focused on BEC; the development team needs training focused on supply chain attacks and credential theft. Creating a culture where reporting suspicious emails is celebrated rather than ignored.</P>

      <ProTip>The most effective phishing awareness programme metric is not "click rate reduced from 30% to 5%." It is "the number of phishing reports submitted by employees." An employee who recognises a phishing email and reports it has just given your security team an early warning. An organisation where employees reliably report suspicious emails — even if they do not always recognise them correctly — catches real attacks earlier than one where employees silently delete or ignore suspicious emails.</ProTip>

      <HR />

      {/* ── PART 08 ── */}
      <Part n="08" title="What This Looks Like at Work — A BEC Attack Investigation" />

      <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 12, padding: '24px 28px', marginBottom: 24 }}>
        <div style={{ fontSize: 11, fontWeight: 700, color: C, background: `${C}15`, border: `1px solid ${C}30`, borderRadius: 6, padding: '4px 10px', fontFamily: 'var(--font-mono)', display: 'inline-block', marginBottom: 20, letterSpacing: '.1em', textTransform: 'uppercase' }}>
          Scenario — A $200,000 wire transfer fraud investigation
        </div>

        {[
          {
            time: '09:30',
            label: 'Finance reports a suspicious wire transfer',
            body: 'The CFO calls the security team: the company wired $200,000 to a new vendor yesterday afternoon. This morning, the CFO received a call from the real CEO asking about the Q3 budget and discovered no acquisition is in progress. The CEO did not send the wire transfer request email.',
          },
          {
            time: '09:45',
            label: 'Examining the fraudulent email',
            body: 'The email came from ceo@company-corp.com — the company domain is company.com, not company-corp.com. The display name showed the CEO\'s full name. The email was sent at 4:45pm on a Friday — a known pattern: attackers exploit end-of-day timing when urgency discourages verification. The email requested a confidential wire transfer for an acquisition and explicitly said "Do not discuss this with anyone until the deal closes."',
          },
          {
            time: '10:00',
            label: 'Checking email authentication logs',
            body: 'The company\'s email gateway logs show the fraudulent email passed SPF (the attacker registered company-corp.com and configured valid SPF). DMARC policy is p=none (monitoring only, not enforcement) — so even though the email failed DMARC alignment, it was not rejected. If DMARC had been set to p=reject, the email would never have reached the inbox.',
          },
          {
            time: '10:30',
            label: 'Tracing the funds',
            body: 'The finance team works with their bank to attempt a wire recall. The funds have already been moved to a third bank in Hong Kong and then to cryptocurrency. Approximately $40,000 is recovered; $160,000 is unrecoverable. The FBI IC3 (Internet Crime Complaint Center) is notified — BEC is federal territory. The attacker is never identified.',
          },
          {
            time: '11:00',
            label: 'Remediation and prevention',
            body: 'DMARC policy upgraded to p=reject. Wire transfer policy updated to require phone verification with the requester at their known number for any transfer above $5,000. A dual-approval process added for transfers above $10,000. The executive team completes a targeted BEC awareness training session. The entire incident cost $160,000 plus investigation time — preventable with a 60-second phone call.',
          },
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

        <Callout type="warning">
          BEC is the most financially devastating cybercrime category — the FBI IC3 reported $2.7 billion in BEC losses in 2022 in the US alone, more than all other cybercrime categories combined. The attack requires no technical sophistication. It requires only a convincing email, a well-timed request, and a target organisation without out-of-band verification procedures.
        </Callout>
      </div>

      <HR />

      {/* ── PART 09 ── */}
      <Part n="09" title="Interview Prep — 5 Questions With Complete Answers" />

      <IQ q="What is social engineering and why is it the most effective attack vector despite all the technical security investment?">
        Social engineering is the manipulation of people into taking actions or revealing information by exploiting psychological tendencies rather than technical vulnerabilities. It is effective for a structural reason: every technical security control was designed to solve a technical problem — firewalls block unwanted network connections, antivirus detects known malicious code, encryption protects data in transit. None of these controls addresses the human who is authorised to access the systems they protect.
        {'\n\n'}
        An attacker who can manipulate an authorised employee bypasses the firewall (the employee is inside it), bypasses the antivirus (the employee can open files), and bypasses the encryption (the employee can read the data). The technical controls are designed to stop unauthorised access. Social engineering makes the attack look authorised.
        {'\n\n'}
        The persistence of social engineering as the dominant attack vector comes from fundamental human psychology. People are evolved to cooperate within social groups, to defer to authority, to respond to urgency, to reciprocate favours. These traits are adaptive in normal social contexts. Attackers deliberately construct situations that trigger these traits in ways that produce insecure behaviour. Patching software removes a vulnerability. Patching human psychology is not a category that exists.
        {'\n\n'}
        The DBIR (Verizon Data Breach Investigations Report) consistently shows 68–80% of breaches involve the human element in some form. Not because defenders have not tried to address it, but because there is no complete solution — only risk reduction through layers of technical, process, and training controls.
      </IQ>

      <IQ q="What is spearphishing and how is it different from regular phishing?">
        Regular phishing is a mass operation — the same generic email sent to millions of addresses with minimal customisation. The sender pretends to be a bank, Microsoft, PayPal, or government agency. The email is not targeted at you specifically: you happen to be on a list, your email address appeared in a data breach, or you are one of millions of addresses being sprayed. Conversion rates are low (0.1–1%) but volume compensates.
        {'\n\n'}
        Spearphishing is a targeted attack crafted for a specific individual using researched personal details. The attacker invests time in reconnaissance — examining the target's LinkedIn profile, their company website, public GitHub, job postings (which reveal technology stack), and the company's organisational chart. The resulting email includes the target's real name, their manager's name, a reference to a real project or system they use, and context that makes the scenario plausible.
        {'\n\n'}
        The conversion rate difference is dramatic: spearphishing can achieve 30–70% click rates in assessments, compared to 5–15% for generic phishing. The investment in research pays off because the email passes the mental filters that detect generic attacks — it appears to come from someone who knows the target.
        {'\n\n'}
        A spearphishing example targeting a financial analyst: "Hi Jennifer, I was just on a call with your CFO Mike Sullivan about the Q3 consolidation. He mentioned you are the right person to ask about the Oracle ERP export format — I have attached the data specification we discussed. Could you confirm the column mapping matches what your system expects?" This includes her name, her CFO's name, a plausible internal project, and a request that seems routine. The attachment contains a malicious macro.
      </IQ>

      <IQ q="What is Business Email Compromise (BEC) and why does it cause more financial loss than ransomware?">
        Business Email Compromise is a fraud scheme where attackers impersonate or compromise business email accounts to deceive employees into conducting financial transactions or revealing sensitive information. The most common forms: fake executive emails requesting wire transfers (CEO fraud), fake vendor emails changing payment account details (vendor email compromise), and compromised accounts used to intercept real financial communications and redirect them.
        {'\n\n'}
        BEC causes more financial loss than ransomware because the losses are direct and often unrecoverable. When ransomware strikes, the damage is operational — systems are unavailable until payment or recovery. The losses are real and significant, but they include recovery costs, downtime costs, and ransom. With BEC, the loss is cash: money wired to an attacker-controlled account is typically moved through multiple countries and converted to cryptocurrency within hours. Wire recalls succeed in recovering 5–10% of BEC losses on average; the rest is permanent.
        {'\n\n'}
        The FBI IC3 reported $2.7 billion in BEC losses in the US in 2022. The same report showed all other cybercrime categories combined at approximately $7 billion — so BEC is roughly 40% of total cybercrime losses.
        {'\n\n'}
        BEC works because it exploits authority (email from the CEO), urgency (confidential acquisition that must be completed today), and trust (the email address looks legitimate). It requires no technical sophistication — the most successful BEC attacks use only social engineering and a registrar account to set up a look-alike domain. The defence is process: out-of-band verification of all unusual financial requests, dual approval for large transfers, and explicit policies that empower employees to question unusual requests from executives.
      </IQ>

      <IQ q="Explain SPF, DKIM, and DMARC. How do they work together to prevent email spoofing?">
        Email was designed without authentication — the SMTP protocol allows any server to claim to send email from any address. SPF, DKIM, and DMARC are three complementary standards that add authentication to email.
        {'\n\n'}
        SPF (Sender Policy Framework) publishes a DNS record listing which mail servers are authorised to send email for a domain. When a receiving server gets an email claiming to be from example.com, it checks the sending server's IP against example.com's SPF record. If the IP is not listed, the email fails SPF. SPF limitation: it only validates the envelope sender (the SMTP MAIL FROM used during delivery), not the From: header that users see in their email client. An attacker can pass SPF while displaying a spoofed From: address.
        {'\n\n'}
        DKIM (DomainKeys Identified Mail) adds a cryptographic signature to every outgoing email. The sending server signs the email content using a private key. A corresponding public key is published in DNS. The receiving server verifies the signature. If the email was modified in transit or was not signed by the claimed domain, DKIM fails. DKIM limitation: it proves the message was signed by the domain but does not tell the receiver what to do if verification fails.
        {'\n\n'}
        DMARC (Domain-based Message Authentication, Reporting, and Conformance) ties SPF and DKIM together with a policy. A DMARC record says: "If an email claims to be from example.com and fails both SPF alignment and DKIM validation, reject it / quarantine it / do nothing (monitoring)." DMARC also enables reporting — receiving servers send aggregate reports back to the domain owner showing authentication results, enabling monitoring for spoofing attempts. p=reject is the most protective policy; p=quarantine delivers to spam; p=none monitors without action.
        {'\n\n'}
        Used together: SPF prevents unauthorised sending servers. DKIM proves message integrity. DMARC enforces a policy for failures and provides visibility. Without all three with DMARC enforcement, an attacker can register a look-alike domain, configure valid SPF for it, and send convincing phishing emails that pass basic authentication checks.
      </IQ>

      <IQ q="What does effective security awareness training look like, and how do you measure whether it works?">
        Effective security awareness training has several characteristics that distinguish it from compliance checkbox training. First, frequency and format: short, frequent microlearning (5–10 minutes monthly) is significantly more effective than annual hour-long sessions. People forget 70% of training content within 24 hours; spaced repetition over time builds durable knowledge.
        {'\n\n'}
        Second, simulated phishing campaigns with immediate educational feedback: when an employee clicks a simulated phishing link, they immediately see an explanation of the specific indicators they missed — the sender domain, the urgency language, the suspicious link. This teachable moment, occurring right when the behaviour happened, is far more effective than a training session weeks later. The tone must be educational and non-shaming — employees who are publicly embarrassed become less likely to report real phishing in the future.
        {'\n\n'}
        Third, role-specific relevance: the finance team should train on BEC and payment fraud scenarios. Developers should train on supply chain attacks, credential theft, and code signing. Executives should train on whaling and deepfake voice attacks. Generic training that does not connect to the employee's actual risk context is less engaging and less effective.
        {'\n\n'}
        How to measure effectiveness: click rate on simulated phishing is commonly tracked and useful — a decrease from 25% to 8% over six months shows improvement. But the most important metric is reporting rate: the percentage of simulated phishing emails that are reported to the security team rather than clicked or silently deleted. An organisation where 40% of employees actively report suspicious emails provides the security team with early warning signals for real attacks. This metric reflects employees acting as active participants in security rather than passive targets.
        {'\n\n'}
        What not to measure: punishing individuals for clicking simulated phishing creates a culture of fear rather than participation. Focus on cohort-level improvements and celebrate high reporting rates rather than shaming individuals who click.
      </IQ>

      <HR />

      {/* ── Error Library ── */}
      <Part n="10" title="Social Engineering Defences That Are Weaker Than They Appear" />

      <Err
        msg="DMARC deployed with p=none — email spoofing still works"
        cause="An organisation deployed DMARC monitoring policy (p=none) to analyse their email landscape before enforcement. Two years later, the monitoring was never reviewed and the policy was never upgraded to p=quarantine or p=reject. Attackers spoofed the company domain to send phishing emails to customers and partners. DMARC monitoring sent reports that nobody read. The technical control was deployed but never completed."
        fix="DMARC deployment is a project, not a one-time configuration. The correct sequence: deploy p=none and subscribe to the aggregate report feed. Review reports over 2–4 weeks to identify all legitimate email sending sources. Ensure all legitimate sources have SPF and DKIM configured. Upgrade to p=quarantine to test enforcement. Monitor for legitimate email going to spam. Upgrade to p=reject. Set a calendar reminder to review DMARC policy quarterly. DMARC with p=none is a start, not a finish."
      />

      <Err
        msg="Annual phishing simulation showed 3% click rate — training programme considered successful"
        cause="Annual simulated phishing campaigns train employees to recognize the specific simulation scenarios used — not to recognize novel phishing techniques. An organisation that simulates only generic mass phishing will have employees who recognise those attacks, but who are still vulnerable to targeted spearphishing, BEC, voice phishing, and advanced techniques that the annual simulation never covered. The 3% click rate measures recognition of the specific simulations run, not general phishing resilience."
        fix="Run multiple phishing simulations per year using varied attack types: generic phishing, spearphishing tailored to specific roles, BEC scenarios, and scenarios using current events (tax season, open enrolment, COVID, layoffs). Measure both click rate (lower is better) and report rate (higher is better). The goal is building broad recognition skills, not conditioning employees to recognise one specific attack format."
      />

      <Err
        msg="The help desk followed procedure — but the procedure was wrong"
        cause="A company's help desk verification procedure required callers to provide their employee ID and manager's name to receive account assistance. An attacker who spent 20 minutes on LinkedIn had the target's employee ID (on a conference badge photo) and manager's name. The procedure was followed correctly — and a credential reset was processed for the attacker. The procedure was compliant with policy but inadequate for the threat it faced."
        fix="Help desk verification procedures should be evaluated against the threat model, not just documented and trained on. Weak verification methods (information that is publicly available) should be supplemented with stronger ones: callback to the employee's registered phone number (not a number provided by the caller), manager callback for sensitive requests, an offline passcode system for emergency procedures. Procedures that look good on paper but do not withstand attacker research are false security."
      />

      <Err
        msg="We trained employees not to click links — they now call IT every time they receive an email"
        cause="Security awareness training that generates excessive false positives creates a different problem: alert fatigue and productivity loss. If employees are trained to be suspicious of every email link, they stop functioning effectively — or they start ignoring IT security entirely because every warning seems equally urgent. Training that is too aggressive creates a culture where security is seen as the department that breaks work rather than enables it."
        fix="Training should teach employees to recognise specific indicators of phishing, not to distrust all email. Teach them what to look for: mismatched sender domains, urgency language for unusual requests, unexpected attachments, link previews that do not match the link text. Provide a simple, frictionless reporting mechanism (a Report Phishing button in the email client). Acknowledge and thank employees who report — even false positives. Celebrate the reporting culture, not the zero-click culture."
      />

      <Err
        msg="We have MFA — phishing cannot steal our credentials"
        cause="Standard TOTP MFA (Google Authenticator, Authy) is effective against offline credential theft but vulnerable to real-time phishing. An adversary-in-the-middle (AiTM) phishing proxy sits between the victim and the legitimate site. The victim enters credentials and TOTP on the fake site. The proxy forwards them in real time to the legitimate site, receives the session cookie, and now has an authenticated session — the TOTP code was valid when used. Tools like Evilginx2, Modlishka, and Muraena automate AiTM attacks. Microsoft reports that AiTM phishing bypasses MFA in millions of attacks monthly."
        fix="Phishing-resistant MFA defeats AiTM attacks: hardware security keys (FIDO2/WebAuthn) and passkeys are bound to the origin — the authentication only succeeds if the user is at the legitimate domain. A phishing proxy cannot forward a FIDO2 challenge because the challenge is cryptographically bound to the legitimate origin, and the browser rejects the challenge from any other domain. Transition to phishing-resistant MFA (hardware keys or device-bound passkeys) for all privileged accounts as a minimum."
      />

      {/* ── Key Takeaways ── */}
      <KeyTakeaways items={[
        'Social engineering exploits human psychology — authority, urgency, social proof, reciprocity, liking, and commitment — not software vulnerabilities. These psychological tendencies cannot be patched because they are features, not bugs, of human cognition.',
        '68–80% of breaches involve the human element (Verizon DBIR). Social engineering is the most common initial access technique across all attack categories. The most sophisticated technical intrusions frequently begin with a phishing email.',
        'Phishing types range from mass phishing (millions of generic emails) to spearphishing (targeted individual with researched personal details) to whaling (C-suite executives) to BEC (financial fraud via email impersonation). Each requires different defences.',
        'BEC (Business Email Compromise) causes more financial loss than ransomware — $2.7 billion in 2022 in the US alone. Losses are cash wired to attacker accounts, typically unrecoverable. The defence is process: out-of-band verification for unusual financial requests, not technical controls.',
        'SPF prevents unauthorised sending servers. DKIM proves message integrity via cryptographic signatures. DMARC enforces a policy for failures and enables reporting. All three together with DMARC p=reject prevent domain spoofing. DMARC monitoring (p=none) without enforcement is not a defence.',
        'AiTM (Adversary-in-the-Middle) phishing bypasses standard TOTP MFA by forwarding credentials in real time and capturing the session cookie. Phishing-resistant MFA (FIDO2 hardware keys, passkeys) is cryptographically bound to the origin and cannot be forwarded — defeating AiTM.',
        'Effective awareness training: frequent microlearning over annual sessions, simulated phishing with immediate educational feedback, role-specific scenarios (BEC for finance, supply chain for dev), and celebration of reporting rather than shaming of clicking.',
        'The most valuable awareness training metric is reporting rate — not click rate. An employee who reports suspicious emails provides early warning for real attacks. A culture of active security participation is more valuable than a culture that simply does not click.',
        'Pretexting builds false context to extract information: an attacker posing as IT support, an auditor, or a new employee uses a fabricated scenario to make requests seem legitimate. Verification procedures that can be defeated with LinkedIn research are inadequate.',
        'Process controls matter as much as technical controls: out-of-band verification for unusual requests, dual approval for large transfers, and help desk verification procedures that cannot be defeated with publicly available information are the most effective defences against social engineering at the organisational level.',
      ]} />

      {/* ── Next Module CTA ── */}
      <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 10, padding: '24px', marginTop: 40 }}>
        <p style={{ fontSize: 10, color: 'var(--muted)', letterSpacing: '.12em', textTransform: 'uppercase', fontFamily: 'var(--font-mono)', fontWeight: 700, margin: '0 0 10px' }}>
          What comes next
        </p>
        <p style={{ fontSize: 15, color: 'var(--text)', lineHeight: 1.85, margin: '0 0 20px' }}>
          In <strong>Module 09</strong>, you dive into the OWASP Top 10 from first principles — SQL injection, XSS, SSRF, IDOR, and every major web vulnerability class explained with real attack examples. The module every developer and every pentester needs.
        </p>
        <Link href="/learn/cybersecurity/web-attacks-owasp" style={{ background: C, color: '#fff', padding: '11px 24px', borderRadius: 7, fontWeight: 700, fontSize: 13, textDecoration: 'none', display: 'inline-block' }}>
          Module 09 → Web Application Attacks — OWASP Top 10 From First Principles
        </Link>
      </div>

    </LearnLayout>
  )
}
