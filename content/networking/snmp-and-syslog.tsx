'use client'

import { useState } from 'react'
import { LearnLayout } from '@/components/content/LearnLayout'
import { KeyTakeaways } from '@/components/content/KeyTakeaways'

const N = '#10b981'
const Part = ({ n, title }: { n: string; title: string }) => (
  <div style={{ marginBottom: 28 }}>
    <p style={{ fontSize: 11, color: N, fontFamily: 'var(--font-mono)', fontWeight: 700, margin: '0 0 8px', letterSpacing: '.1em' }}>// Part {n}</p>
    <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(20px,3vw,30px)', fontWeight: 900, letterSpacing: '-1.5px', color: 'var(--text)', margin: 0 }}>{title}</h2>
  </div>
)
const P = ({ children }: { children: React.ReactNode }) => <p style={{ fontSize: 15, color: 'var(--text)', lineHeight: 1.9, margin: '0 0 18px' }}>{children}</p>
const H = ({ children }: { children: React.ReactNode }) => <h3 style={{ fontSize: 17, fontWeight: 700, color: 'var(--text)', margin: '32px 0 12px' }}>{children}</h3>
const Hl = ({ children }: { children: React.ReactNode }) => <strong style={{ color: N }}>{children}</strong>
const HR = () => <div style={{ borderTop: '1px solid var(--border)', margin: '48px 0' }} />
const ProTip = ({ children }: { children: React.ReactNode }) => (
  <div style={{ background: `${N}08`, border: `1px solid ${N}20`, borderRadius: 10, padding: '16px 20px', margin: '24px 0' }}>
    <p style={{ fontSize: 11, fontWeight: 700, color: N, fontFamily: 'var(--font-mono)', textTransform: 'uppercase', letterSpacing: '.1em', margin: '0 0 8px' }}>Pro Tip</p>
    <p style={{ fontSize: 14, color: 'var(--text)', lineHeight: 1.85, margin: 0 }}>{children}</p>
  </div>
)
const Err = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <div style={{ background: '#ef444408', border: '1px solid #ef444430', borderRadius: 10, padding: '16px 20px', margin: '24px 0' }}>
    <p style={{ fontSize: 11, fontWeight: 700, color: '#ef4444', fontFamily: 'var(--font-mono)', textTransform: 'uppercase', letterSpacing: '.1em', margin: '0 0 8px' }}>Common Mistake — {title}</p>
    <p style={{ fontSize: 14, color: 'var(--text)', lineHeight: 1.85, margin: 0 }}>{children}</p>
  </div>
)
const IQ = ({ q, children }: { q: string; children: React.ReactNode }) => (
  <div style={{ marginBottom: 40 }}>
    <div style={{ background: `${N}10`, border: `1px solid ${N}25`, borderRadius: '8px 8px 0 0', padding: '14px 18px', fontSize: 14, fontWeight: 700, color: 'var(--text)' }}>Q: {q}</div>
    <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderTop: 'none', borderRadius: '0 0 8px 8px', padding: '18px', fontSize: 14, color: 'var(--text)', lineHeight: 1.9 }}>{children}</div>
  </div>
)
const Term = ({ t, children }: { t: string; children: React.ReactNode }) => (
  <div style={{ display: 'flex', gap: 12, marginBottom: 16, alignItems: 'flex-start' }}>
    <code style={{ fontSize: 12, background: `${N}15`, color: N, padding: '3px 8px', borderRadius: 5, flexShrink: 0, marginTop: 2 }}>{t}</code>
    <span style={{ fontSize: 14, color: 'var(--muted)', lineHeight: 1.7 }}>{children}</span>
  </div>
)

const syslogSeverities = [
  { level: 0, name: 'EMERG', color: '#ef4444', desc: 'System unusable' },
  { level: 1, name: 'ALERT', color: '#ef4444', desc: 'Immediate action required' },
  { level: 2, name: 'CRIT', color: '#f97316', desc: 'Critical condition' },
  { level: 3, name: 'ERR', color: '#f97316', desc: 'Error condition' },
  { level: 4, name: 'WARNING', color: '#f59e0b', desc: 'Warning condition' },
  { level: 5, name: 'NOTICE', color: '#3b82f6', desc: 'Normal but significant' },
  { level: 6, name: 'INFO', color: N, desc: 'Informational message' },
  { level: 7, name: 'DEBUG', color: 'var(--muted)', desc: 'Debug-level message' },
]

function SyslogSeverityTable() {
  const [selected, setSelected] = useState<number | null>(null)
  return (
    <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 12, padding: 24, margin: '32px 0' }}>
      <p style={{ fontSize: 13, fontWeight: 700, color: N, fontFamily: 'var(--font-mono)', margin: '0 0 16px', textTransform: 'uppercase', letterSpacing: '.1em' }}>Syslog Severity Levels</p>
      {syslogSeverities.map(s => (
        <div key={s.level} onClick={() => setSelected(selected === s.level ? null : s.level)} style={{ display: 'flex', gap: 16, padding: '10px 12px', marginBottom: 4, background: selected === s.level ? `${s.color}10` : 'var(--bg)', border: `1px solid ${selected === s.level ? s.color : 'var(--border)'}`, borderRadius: 8, cursor: 'pointer', alignItems: 'center' }}>
          <code style={{ width: 20, textAlign: 'center', fontSize: 14, fontWeight: 700, color: s.color, fontFamily: 'var(--font-mono)', flexShrink: 0 }}>{s.level}</code>
          <code style={{ width: 70, fontSize: 12, fontWeight: 700, color: s.color, fontFamily: 'var(--font-mono)', flexShrink: 0 }}>{s.name}</code>
          <span style={{ fontSize: 13, color: 'var(--muted)' }}>{s.desc}</span>
        </div>
      ))}
      <div style={{ marginTop: 16, fontSize: 13, color: 'var(--muted)' }}>Lower number = higher severity. Most monitoring systems alert on levels 0–4. Production log level is typically INFO (6) or WARNING (4).</div>
    </div>
  )
}

export default function SNMPAndSyslogModule() {
  return (
    <LearnLayout
      title="SNMP and Syslog — Network Monitoring Protocols"
      description="SNMP gives you a structured way to query device metrics across your entire infrastructure. Syslog gives every device a common language for reporting what's happening. Together they're the backbone of network monitoring."
      section="Networking Fundamentals"
      readTime="16 min"
      updatedAt="May 2026"
    >
      <Part n="01" title="SNMP: Querying Network Device Metrics" />
      <P><Hl>SNMP (Simple Network Management Protocol)</Hl>, currently version 3 (RFC 3410–3415), is the standard protocol for monitoring and managing network devices — routers, switches, UPS units, printers, servers, and more. SNMP uses UDP ports 161 (queries) and 162 (traps). Devices run an SNMP agent; a management system (NMS) polls agents and receives traps.</P>

      <H>MIB and OID</H>
      <P>All SNMP-accessible data is organized in a hierarchical tree called the <Hl>MIB (Management Information Base)</Hl>. Each piece of data has a unique <Hl>OID (Object Identifier)</Hl> — a dot-separated number sequence like 1.3.6.1.2.1.2.2.1.10 (ifInOctets — incoming bytes on an interface). Standard MIBs cover common devices; vendor-specific enterprise MIBs extend them with proprietary metrics. You browse OIDs with tools like MIB browsers (Paessler, iReasoning) to find what's available.</P>

      <H>SNMP Operations</H>
      <P><Hl>GetRequest</Hl>: NMS fetches specific OID values from an agent. <Hl>GetNextRequest / GetBulkRequest</Hl>: Walk a MIB subtree (e.g., all interface counters). <Hl>SetRequest</Hl>: Write a value to an agent — used for configuration (enable/disable interfaces, set speed). <Hl>Trap / InformRequest</Hl>: Agent proactively notifies NMS of events (link down, threshold exceeded, config change) — traps are fire-and-forget; InformRequest requires ACK.</P>

      <H>SNMPv1 vs v2c vs v3</H>
      <P>SNMPv1 and v2c use <Hl>community strings</Hl> — plaintext passwords ("public" for read-only, "private" for read-write). These travel unencrypted over UDP. Anyone sniffing the network can read your community strings and poll/modify your devices. <Hl>SNMPv3</Hl> adds proper authentication (HMAC-MD5/SHA) and privacy (DES/AES encryption). Always use SNMPv3 on any security-conscious network. Never use default community strings "public" or "private" — change them to random strings even on v2c.</P>

      <Err title="Leaving SNMPv1 or v2c with default community strings">
        Default community strings "public" (read) and "private" (write) are scanned by attackers within minutes of a device coming online. With read access, an attacker can enumerate your entire network topology, device types, interface IPs, and routing tables — all the information needed for a targeted attack. With write access, they can modify routing tables, disable interfaces, or change configurations. SNMPv3 with authentication and encryption is the only acceptable option for production.
      </Err>

      <HR />
      <Part n="02" title="Syslog: The Universal Device Log Protocol" />
      <P><Hl>Syslog</Hl> (RFC 5424) is the standard protocol for forwarding log messages from network devices, servers, and applications to a central log server. It uses UDP port 514 (or TCP 601 / TLS 6514 for reliable delivery). Every Unix/Linux system, most network devices (Cisco IOS, Junos, Arista EOS), and many applications support syslog.</P>

      <H>Syslog Message Format</H>
      <P>A syslog message has a <Hl>facility</Hl> (source type: kernel, mail, auth, cron, user, local0–local7) and a <Hl>severity</Hl> (0=EMERG to 7=DEBUG). The priority value in the message header encodes both: priority = (facility × 8) + severity. The message also includes timestamp, hostname, process name, PID, message ID, structured data, and free-form message text.</P>

      <SyslogSeverityTable />

      <H>Centralized Log Management</H>
      <P>Forwarding syslog to a central server (syslog-ng, rsyslog, or a SIEM like Splunk/ELK) enables: correlating events across devices (a network attack will appear in multiple device logs simultaneously), long-term retention for compliance (PCI DSS requires 1 year of log retention), alerting on severity thresholds (EMERG/ALERT automatically page on-call), and forensic investigation after incidents (reconstruct exactly what happened and when).</P>

      <ProTip>
        Test syslog reception: <code style={{ fontSize: 12, background: `${N}15`, color: N, padding: '2px 5px', borderRadius: 4 }}>logger -n syslog-server -p local0.info "test message"</code>. View recent syslog on Linux: <code style={{ fontSize: 12, background: `${N}15`, color: N, padding: '2px 5px', borderRadius: 4 }}>journalctl -f</code> or <code style={{ fontSize: 12, background: `${N}15`, color: N, padding: '2px 5px', borderRadius: 4 }}>tail -f /var/log/syslog</code>. For Cisco devices: <code style={{ fontSize: 12, background: `${N}15`, color: N, padding: '2px 5px', borderRadius: 4 }}>logging host 10.0.0.5</code> and <code style={{ fontSize: 12, background: `${N}15`, color: N, padding: '2px 5px', borderRadius: 4 }}>logging trap informational</code> sets the minimum severity to forward.
      </ProTip>

      <HR />
      <Part n="03" title="Interview Questions" />
      <IQ q="What's the difference between SNMP polling and SNMP traps?">
        SNMP polling (GetRequest): the NMS queries the agent at regular intervals (e.g., every 5 minutes) to collect metrics — CPU load, interface counters, memory usage. Polling detects changes only at the polling interval — a 1-minute outage could be missed with a 5-minute poll. SNMP traps: the agent proactively sends a notification to the NMS when an event occurs — link goes down, threshold exceeded, device rebooted. Traps are immediate and don't require polling. The limitation: traps use UDP fire-and-forget — if the NMS is unreachable, the trap is lost. SNMP InformRequest solves this with acknowledgment.
      </IQ>
      <IQ q="Why is SNMPv3 required and what does it add over v2c?">
        SNMPv1/v2c use community strings (cleartext passwords) with no encryption. Anyone intercepting UDP traffic can read community strings and query or modify devices. SNMPv3 adds: authentication (USM — User Security Model — with HMAC-MD5 or HMAC-SHA, preventing spoofed messages), privacy (DES or AES-128/256 encryption of the PDU payload), and access control (VACM — View-Based Access Control Model — restricting which OIDs each user can read/write). SNMPv3 with authPriv (both auth and privacy) provides the same security level as TLS for SNMP traffic.
      </IQ>

      <HR />
      <Part n="04" title="Key Terminology" />
      <Term t="MIB">Management Information Base — hierarchical tree of all SNMP-accessible data on a device.</Term>
      <Term t="OID">Object Identifier — dot-notation address of a specific data point in the MIB tree.</Term>
      <Term t="SNMP Trap">Unsolicited notification from agent to NMS on event occurrence. UDP, fire-and-forget.</Term>
      <Term t="Community string">SNMPv1/v2c cleartext "password." Never use defaults "public" or "private" in production.</Term>
      <Term t="Syslog facility">Category of the log source: kern, mail, auth, cron, user, local0–local7.</Term>
      <Term t="Syslog severity">0=EMERG (highest) to 7=DEBUG (lowest). Alert on levels 0–4 in production.</Term>

      <KeyTakeaways items={[
        'SNMP queries device metrics via OIDs in a hierarchical MIB; traps provide proactive event notification.',
        'Always use SNMPv3 with authPriv — SNMPv1/v2c community strings travel in plaintext and are easily intercepted.',
        'Syslog (RFC 5424) forwards log messages by facility and severity from devices to central log servers.',
        'Syslog severity 0 (EMERG) to 7 (DEBUG): alert on 0–4 in production; use INFO (6) for normal operations.',
        'Centralized syslog enables cross-device correlation, long-term retention, alerting, and incident forensics.',
      ]} />
    </LearnLayout>
  )
}
