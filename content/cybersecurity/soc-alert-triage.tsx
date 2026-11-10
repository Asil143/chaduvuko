import Link from 'next/link'
import { LearnLayout } from '@/components/content/LearnLayout'
import { KeyTakeaways } from '@/components/content/KeyTakeaways'
import { Callout } from '@/components/content/Callout'

const C = '#4285f4'
const Part = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <section style={{ marginBottom: 44 }}>
    <h2 style={{ color: C, fontSize: 22, fontWeight: 700, marginBottom: 14 }}>{title}</h2>
    {children}
  </section>
)
const H = ({ children }: { children: React.ReactNode }) => (
  <h3 style={{ color: 'var(--heading)', fontSize: 17, fontWeight: 650, margin: '24px 0 8px' }}>{children}</h3>
)
const P = ({ children }: { children: React.ReactNode }) => (
  <p style={{ color: 'var(--text)', fontSize: 15, lineHeight: 1.9, marginBottom: 14 }}>{children}</p>
)
const Block = ({ children }: { children: React.ReactNode }) => (
  <pre style={{ background: 'var(--code-bg)', border: '1px solid var(--border)', borderRadius: 8, padding: '16px 20px', fontSize: 13, lineHeight: 1.8, whiteSpace: 'pre-wrap', overflowX: 'auto', marginBottom: 18 }}>{children}</pre>
)
const Hl = ({ children }: { children: React.ReactNode }) => <strong style={{ color: C }}>{children}</strong>

export default function Module41() {
  return (
    <LearnLayout
      title="SOC Alert Triage and Incident Response"
      description="Work an alert from first signal to disposition: SOC roles, triage, MITRE ATT&CK mapping, incident response, and reporting considerations."
      section="Cybersecurity — Lesson 41"
      readTime="40 min"
    >
      <Part title="From SIEM Alert to a Defensible Decision">
        <P>A Security Operations Center (SOC) monitors an organisation's systems, investigates suspicious activity, and coordinates response. A SIEM alert is a lead—not proof of compromise. Good triage tests the detection against reliable evidence, documents uncertainty, and gets the right people involved without delaying urgent containment.</P>
        <P>SOC staffing models differ. In a common tiered model, Tier 1 analysts monitor queues, enrich and classify alerts, and escalate; Tier 2 analysts investigate incidents across multiple data sources and coordinate response; Tier 3 specialists handle complex threat hunting, detection engineering, malware analysis, or forensics. A SOC lead or incident commander manages priorities and communications. Smaller teams combine roles, and managed SOCs may use different labels.</P>
        <H>SIEM alert lifecycle</H>
        <Block>{`Telemetry collected → parsed and normalised → correlated by a rule or analytic
→ alert generated and prioritised → analyst validates context and evidence
→ disposition: benign / false positive / suspicious / confirmed incident
→ escalation or response action → case documented and closed
→ detection tuned and lessons fed back`}</Block>
        <P>Keep the original event, rule name and version, timestamps and time zone, affected identities and assets, severity rationale, evidence sources, actions, owner, and disposition in the case record. A changed rule should not silently rewrite what the analyst originally saw.</P>
      </Part>

      <Part title="A Repeatable Triage Checklist">
        <P>Start with the alert's hypothesis and the reason it fired. Then validate what happened using independent data sources; record what is known, unknown, and inferred.</P>
        <Block>{`1. Scope: alert ID, rule, time window, source, severity, and detection logic.
2. Asset context: owner, business purpose, criticality, exposure, and baseline.
3. Identity context: account type, recent sign-ins, privilege, MFA, and peer activity.
4. Event details: process/command, parent process, destination, protocol, and result.
5. Correlate: endpoint, identity, DNS, proxy, firewall, cloud, and SIEM events.
6. Establish timeline: what preceded and followed the alert? What is the earliest evidence?
7. Assess impact: systems, accounts, data, persistence, and scope still unknown.
8. Decide and record: benign, false positive, suspicious, or confirmed incident.
9. Escalate promptly when evidence or impact crosses the team's threshold.
10. Preserve relevant evidence; follow the approved playbook before disruptive action.`}</Block>
        <H>True positive is not the same as confirmed incident</H>
        <P>A <Hl>true positive</Hl> means the detection correctly identified the activity it was designed to detect. That activity may be a policy violation or an authorised test, not a security incident. A <Hl>false positive</Hl> is a detection that fired for activity outside its intended malicious or suspicious condition—for example, a documented backup job matching an overly broad rule. A <Hl>false negative</Hl> is relevant activity that the detection missed. Record analyst disposition and business context separately so tuning does not hide genuine risk.</P>
        <P>Do not close solely because an IP reputation lookup is clean or an endpoint scan finds nothing. Conversely, do not label an event malicious solely because it matches a tool name or a single indicator. Verify time, identity, host, behaviour, and corroborating evidence.</P>
      </Part>

      <Part title="Map Evidence to MITRE ATT&CK">
        <P>MITRE ATT&CK gives defenders a shared vocabulary for adversary tactics (the goal) and techniques (the method). Map observed behaviour to a technique only when the evidence supports it; ATT&CK is not a severity score, proof of attribution, or a checklist that every incident must match.</P>
        <Block>{`Example evidence: an endpoint reports PowerShell launched by an unusual
parent process, followed by an outbound connection.

Triage notes: preserve the process tree and command-line evidence; correlate
user logons, script-block logs, DNS/proxy records, and endpoint telemetry.

ATT&CK mapping: select the most specific technique supported by the evidence;
record the source and confidence. Keep alternative explanations (e.g. admin
automation) open until validated.`}</Block>
        <P>Use the mapping to communicate what is observed, identify relevant telemetry gaps, and connect detections to defensive mitigations. Document the ATT&CK version and distinguish observed facts from analyst interpretation.</P>
      </Part>

      <Part title="Incident Response and Reporting in India">
        <P>Use the organisation's approved incident response plan and escalation matrix. A commonly taught NIST SP 800-61 Rev. 2 lifecycle groups work into <Hl>Preparation</Hl>; <Hl>Detection and Analysis</Hl>; <Hl>Containment, Eradication, and Recovery</Hl>; and <Hl>Post-Incident Activity</Hl>. Follow the version and procedures adopted by your organisation; preserve evidence and coordinate containment with system owners, legal, privacy, communications, and leadership as appropriate.</P>
        <P>In India, organisations within scope must report certain cyber security incidents to CERT-In. The April 2022 CERT-In directions are widely known for a six-hour reporting window after noticing an incident or it being brought to its notice. <Hl>Do not assume every event is reportable or that this summary determines the deadline:</Hl> check the current CERT-In directions, applicable incident categories and reporting process, and any sector-specific requirements. Escalate promptly to the organisation's legal or compliance lead so applicability and timing are assessed.</P>
        <P>For practice, work only with alerts, logs, and packet captures from systems you own or are explicitly authorised to monitor. Do not investigate or access another organisation's systems without written permission.</P>
      </Part>

      <KeyTakeaways items={[
        'A SIEM alert is a lead to validate, not proof of compromise; document the evidence, uncertainty, and disposition.',
        'SOC tier labels vary, but clear ownership, escalation thresholds, and a complete case record matter in every model.',
        'Correlate asset, identity, endpoint, network, and cloud context before closing or escalating an alert.',
        'A true positive detection can describe authorised or benign activity; keep detection accuracy distinct from incident status.',
        'Use MITRE ATT&CK to describe evidence-backed behaviour and detection coverage, not to assert attribution.',
        'NIST SP 800-61 Rev. 2 commonly groups response into four lifecycle phases; follow the current plan your organisation adopts.',
        'CERT-In reporting applies to certain incidents and organisations within scope; verify current directions and seek timely compliance advice.',
        'Use monitoring and investigation techniques only on systems and data you are authorised to handle.',
      ]} />

      <Callout type="info">
        <strong>Up Next — Lesson 42: Packet Analysis with Wireshark</strong><br />
        Move from alert context to network evidence: practise filters, TCP stream review, and defensively recognising suspicious patterns in an authorised capture.{' '}
        <Link href="/learn/cybersecurity/wireshark-packet-analysis" style={{ color: C, fontWeight: 700 }}>Continue to Lesson 42 →</Link>
      </Callout>
    </LearnLayout>
  )
}
