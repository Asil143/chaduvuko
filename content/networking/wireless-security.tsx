import { LearnLayout } from '@/components/content/LearnLayout'
import { KeyTakeaways } from '@/components/content/KeyTakeaways'

const Chapter = ({ n, title }: { n: number; title: string }) => <div style={{ marginBottom: '0.25rem' }}><span style={{ fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#6366f1' }}>Chapter {n}</span><h2 style={{ fontSize: '1.6rem', fontWeight: 800, color: '#1e293b', margin: '0.25rem 0 0.75rem' }}>{title}</h2></div>
const Divider = () => <hr style={{ border: 'none', borderTop: '2px solid #e2e8f0', margin: '2.5rem 0' }} />
const Para = ({ children }: { children: React.ReactNode }) => <p style={{ lineHeight: 1.85, color: '#334155', marginBottom: '1rem', fontSize: '1.02rem' }}>{children}</p>
const CodeBlock = ({ children }: { children: React.ReactNode }) => <pre style={{ background: '#0f172a', color: '#e2e8f0', borderRadius: '10px', padding: '1.25rem 1.5rem', fontSize: '0.85rem', fontFamily: 'monospace', overflowX: 'auto', lineHeight: 1.7, margin: '1rem 0' }}><code>{children}</code></pre>
const Callout = ({ children }: { children: React.ReactNode }) => <div style={{ background: '#f0f9ff', border: '2px solid #0ea5e9', borderRadius: '12px', padding: '1.1rem 1.3rem', margin: '1.25rem 0', lineHeight: 1.8, color: '#0c4a6e' }}>{children}</div>
const Warn = ({ children }: { children: React.ReactNode }) => <div style={{ background: '#fffbeb', border: '2px solid #f59e0b', borderRadius: '12px', padding: '1.1rem 1.3rem', margin: '1.25rem 0', lineHeight: 1.8, color: '#78350f' }}>{children}</div>

export default function WirelessSecurity() {
  return <LearnLayout title="Wireless Security — WPA2/WPA3 Attacks" description="Secure wireless deployments, threat models, monitoring, and incident response." section="Networking Fundamentals — Lesson 37" readTime="20–28 min">
    <Chapter n={1} title="The Air Is a Shared Medium" />
    <Para>An Ethernet switch usually delivers a frame to a selected port. A wireless access point broadcasts radio signals into a physical area, where intended clients, neighbouring devices, and sometimes outsiders can hear transmissions. Wi-Fi security must therefore protect both access to the network and the confidentiality of data moving through the air.</Para>
    <Para><strong>Prerequisites:</strong> understand SSIDs, access points, MAC addresses, and the basics of authentication and encryption. An SSID is a network name, not a secret. Hiding it does not provide meaningful security, and MAC address filtering is not a robust identity control because addresses are observable and can be changed.</Para>
    <Callout>Think in layers: secure the client identity and credentials, protect management and data frames, segment guests from internal systems, and monitor the radio environment. A strong Wi-Fi password alone does not solve rogue access points or compromised client devices.</Callout>
    <Divider />
    <Chapter n={2} title="WPA2, WPA3, and Authentication Choices" />
    <Para>WPA2-Personal commonly uses a shared passphrase to derive keys. Everyone knowing the same passphrase makes attribution and revocation difficult: removing one employee may require changing every device. WPA2-Enterprise uses 802.1X and an authentication server so users or devices can have distinct credentials and policy. WPA3-Personal uses SAE, which improves resistance to offline password guessing compared with the older personal handshake design, but weak passphrases and unsafe deployment remain risks.</Para>
    <Para>WPA3-Enterprise and enterprise 802.1X deployments can provide stronger identity and policy control. Configure clients to validate the authentication server certificate; otherwise, a convincing rogue network may trick a user into submitting credentials to an impostor. Protected Management Frames (PMF, 802.11w) helps protect certain management frames against forgery, and is required in WPA3-certified deployments, but it does not eliminate every radio-layer disruption.</Para>
    <CodeBlock>{`# Defensive wireless configuration review (document the answers)
SSID: Chaduvuko-Staff
Authentication: WPA2-Enterprise or WPA3-Enterprise where supported
Client certificate validation: required and pinned to approved CA
Guest network: separate VLAN and internet-only policy
Protected Management Frames: enabled / required where clients support it
Default administrator credentials: changed; management interface restricted`}</CodeBlock>
    <Divider />
    <Chapter n={3} title="Threats Without Turning Them into a How-To" />
    <Para>Common risks include weak shared passphrases, credential harvesting through an evil-twin access point, rogue access points plugged into an office port, vulnerable clients, and denial-of-service against radio availability. Researchers have also disclosed protocol implementation flaws such as KRACK; affected vendors issued patches, and the right response is to update clients and infrastructure rather than assume a protocol label guarantees safety.</Para>
    <Para>Deauthentication and disassociation frames can interrupt clients when protections are absent or misconfigured. They are availability threats, not a way to decrypt protected application data. A nearby unauthorised access point may imitate an SSID, but an SSID match alone is not proof of legitimacy. Defenders compare controller inventory, BSSID, channel, signal patterns, certificate identity, and wired switch-port location. Avoid testing these attack patterns outside an explicitly authorised, isolated lab.</Para>
    <Warn>Never capture handshakes, attempt password recovery, impersonate an access point, or disrupt clients on a network without written authorisation and a tightly scoped test plan. For this lesson, focus on configuration review and detection evidence.</Warn>
    <Divider />
    <Chapter n={4} title="Secure the Deployment" />
    <Para>Separate staff, guest, IoT, and management networks. Give guests internet access without routes to internal systems. Use per-user or per-device credentials, disable unused radios and services, update firmware, and keep the controller management plane reachable only from a protected administrator network. Choose radio channels and power levels deliberately: excess coverage can extend exposure beyond the building, while poor planning causes interference and unreliable roaming.</Para>
    <Para>For enterprise clients, manage trusted certificate authorities and server names centrally. Test certificate validation and roaming behaviour before changing production policy. For small deployments, use a unique, long passphrase, rotate it after suspected exposure, and avoid reusing it for unrelated services. Maintain an inventory of access points and approved firmware versions.</Para>
    <CodeBlock>{`# Example inventory record for a managed access point
name: floor-2-east
model: approved-hardware-model
location: building-A / floor-2
management-address: 10.50.2.18
firmware-approved: true
staff-ssid: Chaduvuko-Staff
guest-ssid: Chaduvuko-Guest
guest-to-internal: deny
owner: network-operations`}</CodeBlock>
    <Divider />
    <Chapter n={5} title="Monitoring and Incident Response" />
    <Para>Use controller telemetry and a wireless intrusion detection capability to identify unknown BSSIDs, unexpected SSIDs, unusual channel changes, repeated authentication failures, and access points connected to unauthorised switch ports. Correlate radio observations with wired inventory: a suspicious radio may be a neighbour's legitimate network, while a rogue AP connected inside the building has a different risk profile.</Para>
    <Para>During an incident, preserve timestamps and controller logs, identify affected users and areas, and determine whether credentials or data may have been exposed. Disable or isolate a confirmed rogue device through authorised facilities and network procedures. If credentials may have been harvested, revoke them and review sign-in activity. Do not retaliate against the radio source; radio interference affects uninvolved neighbours and can violate local rules.</Para>
    <CodeBlock>{`# A compact triage record
observed_at: 2026-11-09T10:15:00Z
sensor: building-A-floor-2
suspected-bssid: 02:11:22:33:44:55
ssid: Chaduvuko-Staff
first_seen: 10:12Z
controller-match: no
wired-port-match: pending
next_action: correlate with AP inventory and facilities`}</CodeBlock>
    <Divider />
    <Chapter n={6} title="Mistakes, Practice, and Review" />
    <Para><strong>Common mistakes:</strong> treating a hidden SSID as a security control; relying on MAC filtering; allowing clients to skip certificate validation; and mixing guest devices with corporate services. Another frequent error is labelling every unknown SSID an attack before checking neighbouring businesses and personal hotspots.</Para>
    <Para><strong>Practice:</strong> (1) Design staff, guest, and IoT wireless segments for a small campus. (2) Explain why a long shared password is still hard to revoke for one user. (3) Draft a certificate-validation test plan for enterprise Wi-Fi clients. (4) Given an unknown BSSID, list the evidence needed before calling it rogue. (5) Create a response checklist for suspected credential harvesting.</Para>
    <KeyTakeaways items={['Wireless signals cross physical boundaries, so authentication, encryption, segmentation, and monitoring all matter.','WPA2/WPA3-Personal use shared credentials; enterprise 802.1X gives distinct identities and better revocation.','Validate the authentication server certificate to reduce evil-twin credential exposure.','PMF, updates, and secure client configuration reduce risk but do not prevent every availability attack.','Use controller and wired-network evidence together to identify rogue access points.','Test only inside authorised environments; respond to incidents through isolation, evidence preservation, and credential revocation.']} />
    <p style={{ marginTop: '2rem' }}><a href="/learn/networking/zero-trust-networking" style={{ color: '#2563eb', fontWeight: 700 }}>Next: Lesson 38 · Zero Trust Networking →</a></p>
  </LearnLayout>
}
