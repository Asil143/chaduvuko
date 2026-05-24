'use client'

import { useState } from 'react'
import { LearnLayout } from '@/components/content/LearnLayout'
import { KeyTakeaways } from '@/components/content/KeyTakeaways'

// ─── helper components ────────────────────────────────────────────────────────
const Chapter = ({ n, title }: { n: number; title: string }) => (
  <div style={{ marginBottom: '0.25rem' }}>
    <span style={{ fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#6366f1' }}>
      Chapter {n}
    </span>
    <h2 style={{ fontSize: '1.6rem', fontWeight: 800, color: '#1e293b', margin: '0.25rem 0 0.75rem' }}>{title}</h2>
  </div>
)
const Divider = () => <hr style={{ border: 'none', borderTop: '2px solid #e2e8f0', margin: '2.5rem 0' }} />
const Para = ({ children }: { children: React.ReactNode }) => (
  <p style={{ lineHeight: 1.85, color: '#334155', marginBottom: '1rem', fontSize: '1.02rem' }}>{children}</p>
)
const H2 = ({ children }: { children: React.ReactNode }) => (
  <h2 style={{ fontSize: '1.3rem', fontWeight: 700, color: '#1e293b', margin: '1.75rem 0 0.6rem' }}>{children}</h2>
)
const H3 = ({ children }: { children: React.ReactNode }) => (
  <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#475569', margin: '1.25rem 0 0.4rem' }}>{children}</h3>
)
const Accent = ({ children }: { children: React.ReactNode }) => (
  <span style={{ fontWeight: 700, color: '#6366f1' }}>{children}</span>
)
const Code = ({ children }: { children: React.ReactNode }) => (
  <code style={{ background: '#f1f5f9', border: '1px solid #e2e8f0', borderRadius: '4px', padding: '0.1rem 0.4rem', fontSize: '0.88rem', fontFamily: 'monospace', color: '#0f172a' }}>{children}</code>
)
const CodeBlock = ({ children }: { children: React.ReactNode }) => (
  <pre style={{ background: '#0f172a', color: '#e2e8f0', borderRadius: '10px', padding: '1.25rem 1.5rem', fontSize: '0.85rem', fontFamily: 'monospace', overflowX: 'auto', lineHeight: 1.7, margin: '1rem 0' }}>
    <code>{children}</code>
  </pre>
)
const StoryBox = ({ children }: { children: React.ReactNode }) => (
  <div style={{ background: 'linear-gradient(135deg,#f0f9ff,#e0f2fe)', border: '2px solid #0ea5e9', borderRadius: '12px', padding: '1.25rem 1.5rem', margin: '1.25rem 0', lineHeight: 1.8, color: '#0c4a6e' }}>
    {children}
  </div>
)
const WowBox = ({ children }: { children: React.ReactNode }) => (
  <div style={{ background: 'linear-gradient(135deg,#fdf4ff,#fae8ff)', border: '2px solid #a855f7', borderRadius: '12px', padding: '1.25rem 1.5rem', margin: '1.25rem 0', lineHeight: 1.8, color: '#581c87' }}>
    <span style={{ fontWeight: 800, color: '#7c3aed' }}>WOW: </span>{children}
  </div>
)
const Warn = ({ children }: { children: React.ReactNode }) => (
  <div style={{ background: '#fffbeb', border: '2px solid #f59e0b', borderRadius: '12px', padding: '1.25rem 1.5rem', margin: '1.25rem 0', lineHeight: 1.8, color: '#78350f' }}>
    <span style={{ fontWeight: 800, color: '#d97706' }}>WARN: </span>{children}
  </div>
)
const Err = ({ children }: { children: React.ReactNode }) => (
  <div style={{ background: '#fff1f2', border: '2px solid #f43f5e', borderRadius: '12px', padding: '1.25rem 1.5rem', margin: '1.25rem 0', lineHeight: 1.8, color: '#881337' }}>
    <span style={{ fontWeight: 800, color: '#e11d48' }}>MISCONCEPTION: </span>{children}
  </div>
)
const LEVEL_COLORS: Record<string, string> = {
  Beginner: '#10b981', Intermediate: '#3b82f6', Senior: '#8b5cf6', PhD: '#f97316'
}
const IQ = ({ level, children }: { level: string; children: React.ReactNode }) => (
  <div style={{ background: '#f8fafc', border: `2px solid ${LEVEL_COLORS[level]}`, borderRadius: '12px', padding: '1.25rem 1.5rem', margin: '1.25rem 0', lineHeight: 1.8, color: '#1e293b' }}>
    <span style={{ display: 'inline-block', background: LEVEL_COLORS[level], color: '#fff', fontWeight: 700, fontSize: '0.75rem', borderRadius: '6px', padding: '0.15rem 0.6rem', marginBottom: '0.5rem', letterSpacing: '0.05em' }}>{level}</span>
    <div>{children}</div>
  </div>
)

// ─── interactive component 1: SNMP OID Tree Browser ──────────────────────────
type OidNode = {
  oid: string
  name: string
  description: string
  type: string
  example: string
  children?: string[]
}
const OID_TREE: OidNode[] = [
  { oid: '1.3.6.1', name: 'internet', description: 'Root of the Internet subtree under ISO (1) > org (3) > dod (6) > internet (1).', type: 'OID', example: 'N/A', children: ['1.3.6.1.2', '1.3.6.1.4', '1.3.6.1.6'] },
  { oid: '1.3.6.1.2', name: 'mgmt', description: 'Management subtree. Contains MIB-II (standard device management objects).', type: 'OID', example: 'N/A', children: ['1.3.6.1.2.1'] },
  { oid: '1.3.6.1.2.1', name: 'mib-2', description: 'MIB-II root. Standard objects for all TCP/IP managed nodes.', type: 'OID', example: 'N/A', children: ['1.3.6.1.2.1.1', '1.3.6.1.2.1.2', '1.3.6.1.2.1.4', '1.3.6.1.2.1.25'] },
  { oid: '1.3.6.1.2.1.1', name: 'system', description: 'System group: device identity, uptime, contact, location.', type: 'Group', example: 'N/A', children: ['1.3.6.1.2.1.1.1', '1.3.6.1.2.1.1.3', '1.3.6.1.2.1.1.5'] },
  { oid: '1.3.6.1.2.1.1.1', name: 'sysDescr', description: 'Full description of device hardware and OS version.', type: 'DisplayString', example: 'Cisco IOS Version 15.7 RELEASE SOFTWARE' },
  { oid: '1.3.6.1.2.1.1.3', name: 'sysUpTime', description: 'Time since last network management re-initialization (in hundredths of seconds).', type: 'TimeTicks', example: '4328100 (= 500 days)' },
  { oid: '1.3.6.1.2.1.1.5', name: 'sysName', description: 'Administratively assigned name — typically the FQDN.', type: 'DisplayString', example: 'router01.corp.example.com' },
  { oid: '1.3.6.1.2.1.2', name: 'interfaces', description: 'Interface group: list of all network interfaces, their state and counters.', type: 'Group', example: 'N/A', children: ['1.3.6.1.2.1.2.2.1'] },
  { oid: '1.3.6.1.2.1.2.2.1', name: 'ifTable', description: 'Table of network interface entries. Indexed by ifIndex (integer per interface).', type: 'Table', example: 'N/A', children: ['1.3.6.1.2.1.2.2.1.2', '1.3.6.1.2.1.2.2.1.8', '1.3.6.1.2.1.2.2.1.10', '1.3.6.1.2.1.2.2.1.16'] },
  { oid: '1.3.6.1.2.1.2.2.1.2', name: 'ifDescr', description: 'Interface description string (e.g., "GigabitEthernet0/1").', type: 'DisplayString', example: 'GigabitEthernet0/1' },
  { oid: '1.3.6.1.2.1.2.2.1.8', name: 'ifOperStatus', description: 'Operational state: 1=up, 2=down, 3=testing, 4=unknown, 5=dormant.', type: 'Integer', example: '1 (up)' },
  { oid: '1.3.6.1.2.1.2.2.1.10', name: 'ifInOctets', description: 'Total bytes received on interface (32-bit counter, wraps at 4GB).', type: 'Counter32', example: '3029384710' },
  { oid: '1.3.6.1.2.1.2.2.1.16', name: 'ifOutOctets', description: 'Total bytes transmitted on interface.', type: 'Counter32', example: '1293847623' },
  { oid: '1.3.6.1.2.1.25', name: 'host', description: 'Host Resources MIB: CPU utilization, memory, storage, running processes.', type: 'Group', example: 'N/A', children: ['1.3.6.1.2.1.25.3.3.1.2'] },
  { oid: '1.3.6.1.2.1.25.3.3.1.2', name: 'hrProcessorLoad', description: 'Average CPU load % on each processor over the past minute.', type: 'Integer', example: '42 (42% CPU)' },
  { oid: '1.3.6.1.4', name: 'private', description: 'Private/enterprise subtree. Vendor-specific MIBs live here.', type: 'OID', example: 'N/A', children: ['1.3.6.1.4.1'] },
  { oid: '1.3.6.1.4.1', name: 'enterprise', description: 'Enterprise MIBs. 1.3.6.1.4.1.9 = Cisco, .2636 = Juniper, .2011 = Huawei, .8072 = Net-SNMP.', type: 'OID', example: '1.3.6.1.4.1.9 (Cisco)' },
]

function SnmpOidBrowser() {
  const [selected, setSelected] = useState<string>('1.3.6.1.2.1.1.3')
  const node = OID_TREE.find(n => n.oid === selected)!

  return (
    <div style={{ background: '#f8fafc', border: '2px solid #6366f1', borderRadius: '14px', padding: '1.5rem', margin: '1.5rem 0' }}>
      <h3 style={{ fontWeight: 800, color: '#6366f1', marginBottom: '0.25rem' }}>SNMP OID Tree Browser</h3>
      <p style={{ color: '#64748b', fontSize: '0.9rem', marginBottom: '1.25rem' }}>Select an OID to see its meaning, data type, and example value.</p>
      <div style={{ display: 'flex', gap: '0.35rem', flexWrap: 'wrap', marginBottom: '1.25rem' }}>
        {OID_TREE.map(n => (
          <button key={n.oid} onClick={() => setSelected(n.oid)}
            style={{ padding: '0.3rem 0.7rem', borderRadius: '6px', border: `1.5px solid ${selected === n.oid ? '#6366f1' : '#e2e8f0'}`, background: selected === n.oid ? '#eef2ff' : '#fff', color: selected === n.oid ? '#6366f1' : '#475569', fontWeight: selected === n.oid ? 800 : 500, cursor: 'pointer', fontSize: '0.78rem', fontFamily: 'monospace' }}>
            {n.name}
          </button>
        ))}
      </div>
      <div style={{ background: '#fff', borderRadius: '10px', border: '2px solid #6366f1', padding: '1.1rem 1.25rem' }}>
        <div style={{ fontFamily: 'monospace', color: '#6366f1', fontWeight: 800, fontSize: '0.95rem', marginBottom: '0.35rem' }}>{node.oid}</div>
        <div style={{ fontWeight: 800, color: '#1e293b', fontSize: '1.05rem', marginBottom: '0.5rem' }}>{node.name}</div>
        <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.65rem' }}>
          <span style={{ background: '#f0f4ff', color: '#6366f1', borderRadius: '5px', padding: '0.1rem 0.5rem', fontSize: '0.8rem', fontWeight: 700 }}>Type: {node.type}</span>
        </div>
        <div style={{ color: '#334155', lineHeight: 1.7, marginBottom: '0.5rem' }}>{node.description}</div>
        {node.example !== 'N/A' && (
          <div><span style={{ fontWeight: 700, color: '#475569', fontSize: '0.82rem' }}>EXAMPLE: </span><code style={{ fontFamily: 'monospace', fontSize: '0.88rem', color: '#0f172a' }}>{node.example}</code></div>
        )}
        {node.children && (
          <div style={{ marginTop: '0.65rem' }}>
            <span style={{ fontWeight: 700, color: '#475569', fontSize: '0.82rem' }}>CHILDREN: </span>
            {node.children.map(c => {
              const child = OID_TREE.find(n => n.oid === c)
              return child ? (
                <button key={c} onClick={() => setSelected(c)}
                  style={{ marginLeft: '0.4rem', padding: '0.1rem 0.45rem', borderRadius: '5px', border: '1.5px solid #6366f1', background: '#f0f4ff', color: '#6366f1', fontWeight: 700, cursor: 'pointer', fontSize: '0.8rem' }}>
                  {child.name}
                </button>
              ) : null
            })}
          </div>
        )}
      </div>
    </div>
  )
}

// ─── interactive component 2: Syslog Severity Explorer ───────────────────────
type SyslogLevel = {
  severity: number
  name: string
  keyword: string
  meaning: string
  examples: string[]
  color: string
  action: string
}
const SYSLOG_LEVELS: SyslogLevel[] = [
  { severity: 0, name: 'Emergency', keyword: 'emerg', meaning: 'System is unusable. Immediate action required.', examples: ['Kernel panic', 'Core dump on boot', 'Hardware failure preventing all operations'], color: '#dc2626', action: 'Wake up everyone. System is down.' },
  { severity: 1, name: 'Alert', keyword: 'alert', meaning: 'Action must be taken immediately.', examples: ['Database corruption detected', 'RAID array degraded', 'Critical service cannot start'], color: '#ea580c', action: 'Page on-call immediately.' },
  { severity: 2, name: 'Critical', keyword: 'crit', meaning: 'Critical conditions — major component failures.', examples: ['Hardware errors', 'Primary network interface down', 'OOM killer invoked'], color: '#f97316', action: 'Page on-call, open incident.' },
  { severity: 3, name: 'Error', keyword: 'err', meaning: 'Error conditions. Service degraded but not completely failed.', examples: ['Application startup failed', 'Connection refused', 'File not found'], color: '#b45309', action: 'Open ticket, investigate within 1 hour.' },
  { severity: 4, name: 'Warning', keyword: 'warning', meaning: 'Warning conditions. Possible problems, not yet failures.', examples: ['Disk space above 80%', 'High memory usage', 'Retry limit approaching'], color: '#d97706', action: 'Monitor closely, schedule remediation.' },
  { severity: 5, name: 'Notice', keyword: 'notice', meaning: 'Normal but significant conditions. No action required.', examples: ['Service started successfully', 'User logged in', 'Config file reloaded'], color: '#0284c7', action: 'Log and review in daily audit.' },
  { severity: 6, name: 'Informational', keyword: 'info', meaning: 'Informational messages. Normal operational details.', examples: ['Request processed', 'Scheduled job completed', 'Connection established'], color: '#0891b2', action: 'Retain per policy, no action.' },
  { severity: 7, name: 'Debug', keyword: 'debug', meaning: 'Debug-level messages. High volume diagnostic data.', examples: ['SQL query text', 'Variable values', 'Function entry/exit'], color: '#7c3aed', action: 'Enable only during troubleshooting.' },
]

function SyslogSeverityExplorer() {
  const [active, setActive] = useState<number>(3)
  const l = SYSLOG_LEVELS[active]

  return (
    <div style={{ background: '#f8fafc', border: '2px solid #10b981', borderRadius: '14px', padding: '1.5rem', margin: '1.5rem 0' }}>
      <h3 style={{ fontWeight: 800, color: '#10b981', marginBottom: '0.25rem' }}>Syslog Severity Level Explorer</h3>
      <p style={{ color: '#64748b', fontSize: '0.9rem', marginBottom: '1.25rem' }}>Click a severity level to see its meaning, examples, and when to act.</p>
      <div style={{ display: 'flex', gap: '0.4rem', marginBottom: '1.25rem' }}>
        {SYSLOG_LEVELS.map(s => (
          <button key={s.severity} onClick={() => setActive(s.severity)}
            style={{ flex: 1, padding: '0.45rem 0.5rem', borderRadius: '7px', border: `2px solid ${s.color}`, background: active === s.severity ? s.color : '#fff', color: active === s.severity ? '#fff' : s.color, fontWeight: 700, cursor: 'pointer', fontSize: '0.78rem', textAlign: 'center' }}>
            {s.severity}
          </button>
        ))}
      </div>
      <div style={{ background: '#fff', borderRadius: '10px', border: `2px solid ${l.color}`, padding: '1.1rem 1.25rem' }}>
        <div style={{ display: 'flex', gap: '0.65rem', alignItems: 'center', marginBottom: '0.6rem' }}>
          <span style={{ background: l.color, color: '#fff', borderRadius: '7px', padding: '0.25rem 0.7rem', fontWeight: 800, fontSize: '1rem' }}>{l.severity}</span>
          <span style={{ fontWeight: 800, color: '#1e293b', fontSize: '1.1rem' }}>{l.name}</span>
          <code style={{ background: '#f1f5f9', border: '1px solid #e2e8f0', borderRadius: '4px', padding: '0.1rem 0.4rem', fontSize: '0.85rem', color: '#0f172a' }}>{l.keyword}</code>
        </div>
        <div style={{ color: '#334155', lineHeight: 1.7, marginBottom: '0.75rem' }}>{l.meaning}</div>
        <div style={{ fontWeight: 700, color: '#475569', fontSize: '0.82rem', marginBottom: '0.35rem' }}>EXAMPLES</div>
        <ul style={{ margin: '0 0 0.75rem', paddingLeft: '1.25rem' }}>
          {l.examples.map((e, i) => <li key={i} style={{ color: '#334155', lineHeight: 1.65, fontSize: '0.9rem' }}>{e}</li>)}
        </ul>
        <div style={{ background: '#f0f4ff', borderRadius: '8px', padding: '0.65rem 1rem', color: '#1e293b', fontSize: '0.9rem' }}>
          <span style={{ fontWeight: 800, color: l.color }}>ACTION: </span>{l.action}
        </div>
      </div>
    </div>
  )
}

// ─── interactive component 3: SNMP vs Syslog Comparator ──────────────────────
type MonitoringTool = {
  id: string
  name: string
  model: string
  transport: string
  port: string
  security: string
  dataType: string
  useCase: string
  weaknesses: string
  modernAlt: string
  color: string
}
const MONITORING_TOOLS: MonitoringTool[] = [
  {
    id: 'snmpv1', name: 'SNMPv1', model: 'Poll-based (GET) + async traps',
    transport: 'UDP', port: '161 (GET), 162 (Trap)', security: 'Community string (cleartext password) — easily sniffable',
    dataType: 'Structured MIB objects (typed OIDs)', useCase: 'Legacy network device monitoring (pre-2000 hardware)',
    weaknesses: 'No encryption, no authentication, 32-bit counters wrap at ~4GB, GetBulk missing', modernAlt: 'SNMPv3 with authPriv', color: '#ef4444',
  },
  {
    id: 'snmpv3', name: 'SNMPv3', model: 'Poll-based (GET/GetBulk) + Inform (acknowledged traps)',
    transport: 'UDP (or TCP with TLS in RFC 6353)', port: '161, 162', security: 'USM: authentication (HMAC-SHA-256) + privacy (AES-256); VACM for access control',
    dataType: 'Structured MIB objects, 64-bit counters (Counter64)', useCase: 'Production network device monitoring with security requirements',
    weaknesses: 'Complex configuration, UDP unreliability for Inform without TCP, MIB management overhead', modernAlt: 'SNMP + Prometheus node_exporter for hybrid', color: '#10b981',
  },
  {
    id: 'syslog', name: 'Syslog (RFC 5424)', model: 'Push-based (device sends logs)',
    transport: 'UDP (RFC 3164) or TCP/TLS (RFC 6587, 5425)', port: '514 (UDP/TCP), 6514 (TLS)', security: 'None by default (UDP/514); TLS on 6514 for encrypted transport',
    dataType: 'Unstructured/structured text messages with facility + severity', useCase: 'System event logs, security audit trails, application logging',
    weaknesses: 'UDP: no delivery guarantee; high volume; no standardized schema (legacy); time skew without NTP', modernAlt: 'Structured logging → Elasticsearch/Loki/Splunk', color: '#3b82f6',
  },
  {
    id: 'netflow', name: 'NetFlow/IPFIX', model: 'Push-based flow records',
    transport: 'UDP or TCP', port: '2055 (NetFlow), 4739 (IPFIX)', security: 'None in base protocol; TLS optional',
    dataType: 'Flow records: src/dst IP+port, protocol, bytes, packets, timestamps', useCase: 'Traffic analysis, capacity planning, security anomaly detection, billing',
    weaknesses: 'Sampling loses granularity; high volume; no payload; 1% sampling common on high-speed links', modernAlt: 'eBPF-based flow collection', color: '#8b5cf6',
  },
]
const MON_FIELDS: (keyof MonitoringTool)[] = ['model', 'transport', 'port', 'security', 'dataType', 'useCase', 'weaknesses', 'modernAlt']
const MON_LABELS: Record<string, string> = {
  model: 'Model', transport: 'Transport', port: 'Port(s)', security: 'Security', dataType: 'Data Type', useCase: 'Use Case', weaknesses: 'Weaknesses', modernAlt: 'Modern Alt',
}

function MonitoringComparator() {
  const [sel, setSel] = useState<string>('snmpv3')
  const t = MONITORING_TOOLS.find(x => x.id === sel)!

  return (
    <div style={{ background: '#f8fafc', border: '2px solid #8b5cf6', borderRadius: '14px', padding: '1.5rem', margin: '1.5rem 0' }}>
      <h3 style={{ fontWeight: 800, color: '#8b5cf6', marginBottom: '0.25rem' }}>Network Monitoring Protocol Comparator</h3>
      <p style={{ color: '#64748b', fontSize: '0.9rem', marginBottom: '1.25rem' }}>Select a protocol to compare its architecture, security, and use cases.</p>
      <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '1.25rem' }}>
        {MONITORING_TOOLS.map(m => (
          <button key={m.id} onClick={() => setSel(m.id)}
            style={{ padding: '0.45rem 1rem', borderRadius: '8px', border: `2px solid ${m.color}`, background: sel === m.id ? m.color : '#fff', color: sel === m.id ? '#fff' : m.color, fontWeight: 700, cursor: 'pointer', fontSize: '0.88rem' }}>
            {m.name}
          </button>
        ))}
      </div>
      <div style={{ background: '#fff', borderRadius: '10px', border: `2px solid ${t.color}`, overflow: 'hidden' }}>
        {MON_FIELDS.map((f, i) => (
          <div key={f} style={{ display: 'flex', borderBottom: i < MON_FIELDS.length - 1 ? '1px solid #e2e8f0' : 'none' }}>
            <div style={{ width: '120px', minWidth: '120px', background: '#f8fafc', padding: '0.65rem 0.9rem', fontWeight: 700, color: '#475569', fontSize: '0.82rem', borderRight: '1px solid #e2e8f0' }}>{MON_LABELS[f]}</div>
            <div style={{ flex: 1, padding: '0.65rem 0.9rem', color: '#1e293b', fontSize: '0.9rem', lineHeight: 1.6 }}>{t[f]}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

// ─── main export ─────────────────────────────────────────────────────────────
export default function SnmpAndSyslogPage() {
  return (
    <LearnLayout
      title="SNMP and Syslog"
      description="From community strings to SNMPv3 authPriv, from syslog UDP to structured logging pipelines: how networks tell you when something goes wrong — and how to actually listen."
      section="Networking Fundamentals — Module 31"
      readTime="28–38 min"
      updatedAt="May 2026"
    >
      {/* ── Chapter 1 ─────────────────────────────────────────── */}
      <Chapter n={1} title="The Night the Router Went Silent" />
      <StoryBox>
        2003. A major ISP's core router fails silently at 2 AM. No alarm sounds. No page fires. The failure begins as a gradual memory leak — CPU climbs, BGP sessions flap, traffic takes suboptimal routes. By 5 AM, two metropolitan areas have no internet. At 6 AM, a customer calls the help desk. Total downtime: 4 hours. Root cause: SNMP was configured but the network monitoring system's trap receiver had been disabled during a firewall change six weeks earlier. The failure was visible in the data — no one was watching.
      </StoryBox>
      <Para>
        Network management has two fundamental problems: <Accent>observability</Accent> (what is the current state of everything?) and <Accent>alerting</Accent> (when does something change that I need to know about?). SNMP and Syslog address these from different angles. SNMP is a structured, typed, polled protocol for querying and modifying device state. Syslog is an asynchronous, text-based stream of events emitted by devices.
      </Para>
      <Para>
        Together, they form the monitoring backbone of most enterprise and carrier networks. Understanding both — their design, their security properties, and their limitations — is essential for anyone operating or securing network infrastructure.
      </Para>
      <WowBox>
        The world's largest networks generate billions of syslog events per day. A single busy firewall can emit 100,000+ events per second during an attack. Without a structured pipeline — filtering, aggregation, indexing — this is not visibility, it is noise. The discipline of log management at scale is why products like Splunk, Elasticsearch, and Loki exist.
      </WowBox>

      <Divider />
      {/* ── Chapter 2 ─────────────────────────────────────────── */}
      <Chapter n={2} title="SNMP Architecture: Managers, Agents, and MIBs" />
      <StoryBox>
        SNMP's model is deceptively simple: every managed device runs an <em>agent</em> that exposes a tree of variables. A central <em>manager</em> queries those variables. Each variable is identified by an <em>OID</em> — an Object Identifier — a dot-separated sequence of integers that encodes a path through a global tree. The variable for "CPU utilization on processor 1" is the same OID on a Cisco router and a Linux server — because they both implement the same MIB standard.
      </StoryBox>
      <H2>The SNMP Model</H2>
      <Para>
        <Accent>Manager (NMS)</Accent>: the Network Management System — Nagios, Zabbix, PRTG, Prometheus with SNMP exporter. Sends GET, GETNEXT, GETBULK, SET requests to agents. Receives Trap/Inform notifications.
      </Para>
      <Para>
        <Accent>Agent</Accent>: software running on the managed device (router, switch, server, UPS). Listens on UDP/161. Responds to manager requests. Sends Traps/Informs on UDP/162 when events occur.
      </Para>
      <Para>
        <Accent>MIB</Accent> (Management Information Base): a definition file written in SMI (Structure of Management Information) syntax that defines what OIDs exist and what types they have. MIBs are compiled by management software to translate numeric OIDs to human-readable names. Standard MIBs (MIB-II, IF-MIB, HOST-RESOURCES-MIB) apply to all devices; vendor-specific enterprise MIBs extend them.
      </Para>
      <H2>OID Namespace</H2>
      <Para>
        OIDs form a global tree rooted at ISO (1). Every device's manageable variables are leaves in this tree:
      </Para>
      <CodeBlock>{`OID structure:
1 (ISO)
└── 3 (org)
    └── 6 (dod)
        └── 1 (internet)
            ├── 2 (mgmt)
            │   └── 1 (mib-2)
            │       ├── 1 (system)
            │       │   ├── 1.0 = sysDescr (device description)
            │       │   ├── 3.0 = sysUpTime (uptime in 1/100s)
            │       │   └── 5.0 = sysName (hostname)
            │       └── 2 (interfaces)
            │           └── 2.1 (ifTable)
            │               ├── 2.1.2.N = ifDescr.N
            │               ├── 2.1.8.N = ifOperStatus.N
            │               └── 2.1.10.N = ifInOctets.N
            └── 4.1 (enterprise)
                ├── 9 = Cisco
                ├── 2636 = Juniper
                └── 8072 = Net-SNMP`}</CodeBlock>
      <SnmpOidBrowser />

      <Divider />
      {/* ── Chapter 3 ─────────────────────────────────────────── */}
      <Chapter n={3} title="SNMP Operations: GET, SET, TRAP, and INFORM" />
      <StoryBox>
        SNMP has a small vocabulary of operations. GET reads a variable. SET writes it. TRAP sends an unsolicited alert from agent to manager. GETNEXT and GETBULK walk through the MIB tree efficiently. INFORM is a reliable trap with acknowledgement. Understanding when to use each — and how they behave over unreliable UDP — is the difference between a monitoring system that works and one that lies to you.
      </StoryBox>
      <H2>GET and GETNEXT</H2>
      <Para>
        <Accent>GET</Accent>: retrieve the value of a specific OID. The manager sends a GetRequest PDU with one or more OID bindings. The agent replies with a GetResponse containing the values.
      </Para>
      <Para>
        <Accent>GETNEXT</Accent>: retrieve the next OID in the MIB tree after the specified OID. Used to walk the MIB sequentially — useful for exploring what an agent supports or enumerating table entries.
      </Para>
      <H2>GETBULK (SNMPv2c/v3)</H2>
      <Para>
        GetBulk retrieves multiple values in a single request, reducing round-trips when enumerating tables. Parameters: <Code>non-repeaters</Code> (how many OIDs to GET once) and <Code>max-repetitions</Code> (how many times to GETNEXT the remaining OIDs). Essential for polling large routing tables or interface tables efficiently.
      </Para>
      <CodeBlock>{`# snmpwalk: GETNEXT traversal
snmpwalk -v2c -c public 192.168.1.1 1.3.6.1.2.1.2.2.1.8
# → lists ifOperStatus for all interfaces

# snmpget: precise OID retrieval
snmpget -v2c -c public 192.168.1.1 sysUpTime.0
# → SNMPv2-MIB::sysUpTime.0 = Timeticks: (4328100) 5 days, 0:13:21.00

# snmpbulkwalk: GetBulk traversal (faster for large tables)
snmpbulkwalk -v2c -c public 192.168.1.1 ifTable`}</CodeBlock>
      <H2>SET</H2>
      <Para>
        SET writes a value to a writable OID on the agent. Used for remote configuration: setting interface admin status (ifAdminStatus = 2 to shut down an interface), VLAN assignments, SNMP community string rotation. Requires the community string to have write privileges (SNMPv1/v2c) or a user with write access (SNMPv3).
      </Para>
      <Warn>
        SNMPv1/v2c SET with write community string exposed is extremely dangerous. An attacker who knows the community string can shut down interfaces, change routing configurations, or brick the device. Always use read-only community strings for monitoring; reserve SET access for SNMPv3 with strong authentication, and ideally restrict it to the management network only.
      </Warn>
      <H2>TRAP vs. INFORM</H2>
      <Para>
        <Accent>Trap</Accent>: agent sends a one-way UDP notification to the manager. No acknowledgement. If the manager is down or the UDP packet is lost, the trap is gone forever. Fast and simple.
      </Para>
      <Para>
        <Accent>Inform</Accent> (SNMPv2c/v3): the agent sends the notification and waits for the manager to acknowledge. If no ACK, the agent retransmits. More reliable but requires the manager to respond promptly. Most production monitoring uses Informs for critical alerts.
      </Para>

      <Divider />
      {/* ── Chapter 4 ─────────────────────────────────────────── */}
      <Chapter n={4} title="SNMPv1 and v2c: The Community String Era" />
      <StoryBox>
        When SNMP was designed in 1988, network security was an afterthought. The authentication mechanism chosen was a "community string" — essentially a plaintext password. It is transmitted in every packet, visible to anyone sniffing the wire. The default community strings ("public" for read, "private" for write) were hardcoded in millions of devices. By 2000, entire internet segments were queryable by anyone who knew the defaults.
      </StoryBox>
      <H2>Community Strings</H2>
      <Para>
        A community string is a text string that must match between manager and agent for the exchange to succeed. SNMPv1 and v2c carry it in plaintext in every PDU. Three typical community strings:
      </Para>
      <Para>
        — <Accent>public</Accent>: default read-only. Present in default configurations of most network devices. Should be changed before deployment.
      </Para>
      <Para>
        — <Accent>private</Accent>: default read-write. Even more dangerous. Must be changed.
      </Para>
      <Para>
        — Custom: use a long random string, treat it like a password, store in secrets manager.
      </Para>
      <H2>SNMPv2c Improvements</H2>
      <Para>
        SNMPv2c (RFC 1901) added GetBulk (critical for performance), 64-bit counters (Counter64 — essential for 1Gbps+ interfaces where 32-bit counters wrap in seconds), and the Inform PDU. Security remained community-string-based.
      </Para>
      <H2>The Counter Wrap Problem</H2>
      <Para>
        SNMPv1 uses Counter32 (32-bit) for interface octets. A 32-bit counter wraps at 2^32 bytes = 4.29 GB. On a 1 Gbps interface running at full speed, that is 34 seconds to wrap. A monitoring system polling every 5 minutes cannot distinguish "counter wrapped once" from "zero traffic." SNMPv2c's Counter64 wraps at 2^64 bytes — a 10 Gbps interface running flat out would take 46 years to wrap.
      </Para>
      <WowBox>
        The classic "interface utilization graph goes to zero and back up" in old monitoring systems is almost always a Counter32 wrap. The monitoring system subtracts current from previous sample, gets a large negative number, and treats it as zero. Always use Counter64 (SNMPv2c+) and poll frequently relative to the counter wrap time.
      </WowBox>

      <Divider />
      {/* ── Chapter 5 ─────────────────────────────────────────── */}
      <Chapter n={5} title="SNMPv3: Security at Last" />
      <StoryBox>
        By 2002, SNMP's security problems were widely understood. Community strings in plaintext, no per-user access control, no encryption of GET responses (which could contain sensitive configuration data). RFC 3411-3418 defined SNMPv3 with a security architecture that was a complete redesign. It was powerful and secure. It was also complex enough that misconfigured SNMPv3 setups are common even today.
      </StoryBox>
      <H2>SNMPv3 Security Model (USM)</H2>
      <Para>
        SNMPv3 uses the <Accent>User-based Security Model</Accent> (USM) with three security levels:
      </Para>
      <Para>
        <Accent>noAuthNoPriv</Accent>: no authentication, no encryption. As insecure as SNMPv1/v2c but with a username. Only acceptable for isolated lab networks.
      </Para>
      <Para>
        <Accent>authNoPriv</Accent>: authenticated (HMAC), no encryption. Prevents tampering and replay attacks but SNMP data is visible on the wire.
      </Para>
      <Para>
        <Accent>authPriv</Accent>: authenticated + encrypted. The correct setting for production. Uses HMAC-SHA-256 (or stronger) for auth and AES-256 for encryption.
      </Para>
      <H2>SNMPv3 Configuration</H2>
      <CodeBlock>{`# Cisco IOS SNMPv3 configuration
snmp-server group MONITORING-GROUP v3 priv read MONITORING-VIEW
snmp-server user monitor MONITORING-GROUP v3 auth sha-256 Auth$ecret123 priv aes 256 Priv$ecret456
snmp-server view MONITORING-VIEW internet included

# Net-SNMP agent (Linux) /etc/snmp/snmpd.conf
createUser monitor SHA-256 "Auth$ecret123" AES "Priv$ecret456"
rouser monitor priv

# Query with SNMPv3
snmpget -v3 -l authPriv -u monitor \
  -a SHA-256 -A "Auth$ecret123" \
  -x AES -X "Priv$ecret456" \
  192.168.1.1 sysUpTime.0`}</CodeBlock>
      <H2>VACM: View-based Access Control</H2>
      <Para>
        SNMPv3 includes the <Accent>View-based Access Control Model</Accent> (VACM), which controls which OIDs each user or group can access (read/write/notify). A monitoring user can be restricted to read-only access on specific MIB subtrees — they cannot SET, and they cannot read sensitive enterprise MIBs containing credentials.
      </Para>
      <MonitoringComparator />

      <Divider />
      {/* ── Chapter 6 ─────────────────────────────────────────── */}
      <Chapter n={6} title="MIBs in Depth: Standard and Enterprise" />
      <StoryBox>
        Walking into a network operations center, you see dashboards showing interface utilization, CPU load, BGP peer state, and fan temperatures for hundreds of devices. All this data comes from OIDs. Some OIDs are universal — defined in standard MIBs that every SNMP-capable device implements. Others are vendor-specific — Cisco's memory utilization OID is different from Juniper's. Understanding which MIBs to use (and which to avoid) determines what you can monitor.
      </StoryBox>
      <H2>MIB-II (RFC 1213): The Universal Foundation</H2>
      <Para>
        MIB-II defines the minimum set of objects required for all TCP/IP managed nodes. Groups within MIB-II:
      </Para>
      <Para>
        <Code>system</Code> (1.3.6.1.2.1.1): sysDescr, sysUpTime, sysContact, sysName, sysLocation, sysObjectID.
      </Para>
      <Para>
        <Code>interfaces</Code> (1.3.6.1.2.1.2): ifTable — one row per interface with ifDescr, ifType, ifSpeed, ifOperStatus, ifInOctets, ifOutOctets, error counters.
      </Para>
      <Para>
        <Code>ip</Code> (1.3.6.1.2.1.4): IP forwarding tables, ARP cache, IP statistics.
      </Para>
      <Para>
        <Code>tcp</Code> (1.3.6.1.2.1.6): TCP connection table, statistics.
      </Para>
      <Para>
        <Code>udp</Code> (1.3.6.1.2.1.7): UDP statistics.
      </Para>
      <H2>IF-MIB (RFC 2863): Modern Interface Monitoring</H2>
      <Para>
        IF-MIB extends the interfaces group with 64-bit counters (ifHCInOctets, ifHCOutOctets — the HC stands for High Capacity) and ifAlias (operator-set description). Always use IF-MIB's 64-bit counters for modern high-speed interfaces.
      </Para>
      <H2>HOST-RESOURCES-MIB (RFC 2790)</H2>
      <Para>
        Provides operating system-level data: hrProcessorLoad (CPU%), hrStorageTable (disk/memory), hrSWRunTable (running processes), hrSWInstalled (installed software). Works on Linux, Windows, BSD, and any OS with a conformant SNMP agent.
      </Para>
      <H2>Enterprise MIBs</H2>
      <Para>
        Vendor MIBs live under 1.3.6.1.4.1.ENTERPRISE_ID. You must obtain the vendor's MIB files, compile them into your NMS, and then you can query vendor-specific data: Cisco's per-interface QoS policy stats, Juniper's routing engine temperature, HP's iLO power consumption. Enterprise MIBs are the richest source of data but require vendor-specific effort.
      </Para>

      <Divider />
      {/* ── Chapter 7 ─────────────────────────────────────────── */}
      <Chapter n={7} title="Syslog: The Event Stream" />
      <StoryBox>
        Every operating system, network device, and application generates events: a user logged in, a firewall rule fired, a disk error occurred, a BGP peer went down. Syslog is the protocol that collects these events from thousands of devices and ships them to a central log server. Before Syslog, every device had its own proprietary log format and local storage — correlation was impossible. With Syslog, all events flow to one place with a common structure.
      </StoryBox>
      <H2>Syslog Origins: RFC 3164 (BSD Syslog)</H2>
      <Para>
        The original syslog protocol was not standardized — it was the convention used by BSD Unix in the early 1980s. RFC 3164 (2001) documented the existing practice without truly standardizing it. The "format" was loose: a priority value encoding facility and severity, an optional timestamp, a hostname, and a message. No structured fields, no defined escaping, no versioning.
      </Para>
      <H2>Modern Syslog: RFC 5424</H2>
      <Para>
        RFC 5424 (2009) defined a proper syslog format with a structured header: VERSION TIMESTAMP HOSTNAME APP-NAME PROCID MSGID [STRUCTURED-DATA] MSG. The structured data section allows key-value pairs, enabling machines to parse fields without string matching.
      </Para>
      <CodeBlock>{`# RFC 5424 syslog message format:
<priority>VERSION TIMESTAMP HOSTNAME APP-NAME PROCID MSGID [SD] MSG

# Example:
<165>1 2026-05-24T10:00:00.123Z fw01.corp.com sshd 12345 - - Failed password for alice from 203.0.113.5 port 49832 ssh2

# Priority = (Facility * 8) + Severity
# Facility 20 (local4) = 20*8 = 160
# Severity 5 (notice) = 5
# Priority = 165

# Structured data example:
<134>1 2026-05-24T10:01:00Z webserver apache 9801 - [request@12345 method="POST" uri="/api/login" status="401" bytes="230"] authentication failure`}</CodeBlock>
      <H2>Syslog Facility Codes</H2>
      <Para>
        The facility identifies the source of the message. 24 defined facilities:
      </Para>
      <Para>
        <Code>0</Code> kern (kernel), <Code>1</Code> user, <Code>2</Code> mail, <Code>3</Code> daemon, <Code>4</Code> auth/security, <Code>5</Code> syslog, <Code>6</Code> lpr, <Code>7</Code> news, <Code>8</Code> uucp, <Code>9</Code> cron, <Code>10</Code> authpriv, <Code>16-23</Code> local0–local7 (for application use).
      </Para>
      <Para>
        Security-relevant events (authentication, authorization, audit) should use facility <Code>authpriv</Code> (10) to separate them from general system logs — most log servers can route authpriv to a separate, access-controlled log file.
      </Para>
      <SyslogSeverityExplorer />

      <Divider />
      {/* ── Chapter 8 ─────────────────────────────────────────── */}
      <Chapter n={8} title="Syslog Transport: UDP vs. TCP vs. TLS" />
      <StoryBox>
        Syslog's original transport is UDP port 514. This was practical for the 1980s LAN environment where it was designed. For modern security monitoring, UDP/514 has three problems: no delivery guarantee (packets can be lost), no authentication (anyone can forge syslog messages), no encryption (logs contain sensitive data in plaintext). Each problem has a solution, but they require configuration.
      </StoryBox>
      <H2>UDP/514: The Default (and Its Problems)</H2>
      <Para>
        UDP/514 is the legacy syslog transport. Advantages: zero configuration on most devices, no connection management overhead, simple firewall rules. Disadvantages: no delivery guarantee — during high-traffic periods or network congestion, log messages are silently dropped. No sequence numbers means drops are invisible. No auth means anyone can inject fake log entries.
      </Para>
      <H2>TCP/514: Reliable Delivery</H2>
      <Para>
        RFC 6587 defines syslog over TCP. TCP provides delivery guarantees — the sender knows if the receiver got the message. Messages are framed with octet-counting (preferred) or newline-delimited. TCP/514 is unencrypted but reliable. Better than UDP for environments where lost logs are unacceptable but encryption is not required.
      </Para>
      <H2>TLS/6514: Encrypted and Authenticated</H2>
      <Para>
        RFC 5425 defines syslog over TLS (port 6514). Provides: delivery guarantees (TCP), encryption (TLS), and mutual authentication (client and server certificates). This is the correct transport for security-critical syslog in production environments.
      </Para>
      <CodeBlock>{`# rsyslog TLS client configuration (/etc/rsyslog.conf)
global(
  defaultNetstreamDriver="gtls"
  defaultNetstreamDriverCAFile="/etc/ssl/certs/siem-ca.pem"
  defaultNetstreamDriverCertFile="/etc/ssl/certs/client-cert.pem"
  defaultNetstreamDriverKeyFile="/etc/ssl/private/client-key.pem"
)

*.* action(
  type="omfwd"
  target="siem.corp.example.com"
  port="6514"
  protocol="tcp"
  StreamDriver="gtls"
  StreamDriverMode="1"
  StreamDriverAuthMode="x509/name"
  StreamDriverPermittedPeers="siem.corp.example.com"
)`}</CodeBlock>
      <Warn>
        UDP/514 syslog with no authentication allows log injection: an attacker who can reach your syslog server can forge log entries, potentially covering their tracks or causing false alerts. Always use TLS/6514 for syslog from untrusted networks; at minimum use TCP/514 on trusted internal networks with firewall restrictions.
      </Warn>

      <Divider />
      {/* ── Chapter 9 ─────────────────────────────────────────── */}
      <Chapter n={9} title="Centralized Logging: The Modern Stack" />
      <StoryBox>
        A security operations center receives 2 billion syslog events per day from 3,000 devices. No human reads individual logs. The pipeline: rsyslog on devices → Kafka (message queue) → Logstash/Fluentd (parsing, normalization) → Elasticsearch (indexing, search) → Kibana (dashboards) → PagerDuty (alerting). The pipeline converts raw syslog into structured, searchable, correlated events.
      </StoryBox>
      <H2>The ELK/EFK Stack</H2>
      <Para>
        <Accent>Elasticsearch</Accent>: distributed search and analytics engine. Indexes log data as JSON documents. Supports full-text search, aggregations, and time-series queries. Used to store and search logs.
      </Para>
      <Para>
        <Accent>Logstash / Fluentd / Fluent Bit</Accent>: log collection and processing agents. Accept logs from syslog, file, beats, or API; parse structured fields (regex, Grok patterns); filter, transform, and route to output destinations. Fluent Bit is preferred for containers (low memory footprint).
      </Para>
      <Para>
        <Accent>Kibana</Accent>: visualization and dashboard layer for Elasticsearch. Builds time-series graphs, geo maps, alert rules, and SIEM-style investigation workflows.
      </Para>
      <H2>Loki + Grafana: Lightweight Alternative</H2>
      <Para>
        Grafana Loki indexes only log labels (timestamp, host, service, level), not the full log text — making it much cheaper to store and index than Elasticsearch. Queries are fast for label filtering but slower for full-text search across all log content. Ideal for infrastructure logs where you know what you're looking for.
      </Para>
      <H2>Structured Logging vs. Unstructured Syslog</H2>
      <Para>
        Traditional syslog messages are unstructured text — "Failed password for alice from 203.0.113.5". Extracting "alice" and "203.0.113.5" requires fragile regex patterns that break when message formats change. Modern applications output structured JSON logs:
      </Para>
      <CodeBlock>{`# Unstructured (legacy syslog):
May 24 10:00:00 server1 sshd[12345]: Failed password for alice from 203.0.113.5 port 49832 ssh2

# Structured (modern JSON log):
{
  "timestamp": "2026-05-24T10:00:00Z",
  "hostname": "server1",
  "service": "sshd",
  "event": "auth_failure",
  "username": "alice",
  "src_ip": "203.0.113.5",
  "src_port": 49832,
  "protocol": "ssh2"
}`}</CodeBlock>
      <Para>
        Structured logs are directly indexable, queryable without regex, and consistent across software versions. The tradeoff: higher log volume (JSON overhead) and requires application-level changes. For new applications, always emit structured logs.
      </Para>

      <Divider />
      {/* ── Chapter 10 ─────────────────────────────────────────── */}
      <Chapter n={10} title="NetFlow, IPFIX, and Traffic Analysis" />
      <StoryBox>
        A security team notices unusual outbound traffic at 3 AM — 50 GB transferred to a single external IP. How do they know? Not from syslog (which records events, not bytes). Not from SNMP (which gives totals, not per-flow details). From NetFlow: a protocol that records every TCP/UDP conversation on the network — source IP, destination IP, ports, protocol, byte count, packet count, start and end time.
      </StoryBox>
      <H2>What Is a Flow?</H2>
      <Para>
        A <Accent>flow</Accent> is a unidirectional sequence of packets sharing the same 5-tuple: source IP, destination IP, source port, destination port, IP protocol. NetFlow exports flow records when flows expire (TCP FIN/RST, or timeout). Records do not contain payload — just metadata about the conversation.
      </Para>
      <H2>NetFlow Architecture</H2>
      <Para>
        <Accent>Exporter</Accent>: the router or switch that observes traffic and creates flow records. Sends them via UDP/2055 to the collector.
      </Para>
      <Para>
        <Accent>Collector</Accent>: receives and stores flow records. Examples: Ntopng, ElastiFlow, nfdump, Grafana + flow exporters.
      </Para>
      <Para>
        <Accent>Analyzer</Accent>: queries the collector to answer questions: who is my top talker? what is the protocol breakdown? is there anomalous traffic to unusual destinations?
      </Para>
      <H2>IPFIX: The Standard</H2>
      <Para>
        IPFIX (IP Flow Information Export, RFC 7011) is the IETF standardization of NetFlow v9. It adds a flexible template system allowing exporters to define any set of fields per flow record — not just the standard 5-tuple + counters. IPFIX is the modern standard; NetFlow v5 and v9 remain common in legacy infrastructure.
      </Para>
      <Warn>
        NetFlow sampling means you may miss events. On high-speed interfaces, exporters often sample 1 in 1000 or 1 in 10000 packets for performance reasons. A 1% sample means exfiltration of {'<'}100 packets (e.g., DNS tunneling, icmp tunneling) will likely not appear in flow data. Supplement with full-capture on critical segments.
      </Warn>

      <Divider />
      {/* ── Chapter 11 ─────────────────────────────────────────── */}
      <Chapter n={11} title="SNMP Security Hardening" />
      <StoryBox>
        The Shodan search engine returns thousands of results for SNMP agents with the community string "public" exposed on the internet. Each one is a device that can be fully enumerated: hostname, location, interface inventory, routing table, ARP cache, connected hosts. Some accept SET with "private". In 2014, a technique called SNMP amplification was used in DDoS attacks — attackers sent forged GetBulk requests with a spoofed victim IP, causing the SNMP server to flood the victim with large responses. SNMP security matters.
      </StoryBox>
      <H2>Essential SNMP Hardening Steps</H2>
      <Para>
        1. <Accent>Disable SNMPv1 and SNMPv2c entirely</Accent> if possible. Use SNMPv3 authPriv only.
      </Para>
      <Para>
        2. <Accent>Change default community strings</Accent> on all devices. Use long random strings; treat them as passwords.
      </Para>
      <Para>
        3. <Accent>Restrict SNMP access to management IPs</Accent> with ACLs. SNMP should only be reachable from the NMS IP(s), not from the internet or untrusted VLANs.
      </Para>
      <Para>
        4. <Accent>Disable SNMP SET</Accent> if not needed for active management. Read-only for monitoring is sufficient.
      </Para>
      <Para>
        5. <Accent>Block port 161 and 162 at the internet border</Accent>. No SNMP should be reachable from untrusted networks.
      </Para>
      <Para>
        6. <Accent>Audit SNMP community strings</Accent> regularly. They often persist for years after deployment without rotation.
      </Para>
      <CodeBlock>{`# iptables: allow SNMP only from NMS
iptables -A INPUT -p udp --dport 161 -s 10.0.0.5/32 -j ACCEPT
iptables -A INPUT -p udp --dport 161 -j DROP

# Cisco IOS: restrict SNMP to NMS IP
access-list 10 permit 10.0.0.5
access-list 10 deny any log
snmp-server community RANDOM_COMPLEX_STRING ro 10
no snmp-server community public
no snmp-server community private`}</CodeBlock>

      <Divider />
      {/* ── Chapter 12 ─────────────────────────────────────────── */}
      <Chapter n={12} title="The Modern Observability Stack: Beyond SNMP and Syslog" />
      <StoryBox>
        In 2026, many organizations are replacing SNMP polling with Prometheus metrics, syslog with structured logging to Loki, and NetFlow with eBPF-based observability. The new stack is more expressive, easier to query, and integrates better with cloud-native infrastructure. But SNMP and Syslog remain essential for the billions of network devices — routers, switches, firewalls — that will never run a Prometheus exporter.
      </StoryBox>
      <H2>Prometheus and SNMP Exporter</H2>
      <Para>
        The <Accent>SNMP Exporter</Accent> bridges the old and new worlds: it queries devices via SNMP and exposes the results as Prometheus metrics. Prometheus scrapes the exporter on a schedule; Grafana visualizes the time-series data. The SNMP exporter uses a YAML configuration file generated from MIB definitions (generator tool).
      </Para>
      <CodeBlock>{`# prometheus.yml scrape config
scrape_configs:
  - job_name: 'snmp'
    static_configs:
      - targets:
          - 192.168.1.1  # router to monitor
    metrics_path: /snmp
    params:
      auth: [snmpv3_auth]
      module: [if_mib]
    relabel_configs:
      - source_labels: [__address__]
        target_label: __param_target
      - target_label: __address__
        replacement: snmp-exporter:9116`}</CodeBlock>
      <H2>OpenTelemetry: The Future of Observability</H2>
      <Para>
        OpenTelemetry (OTel) defines vendor-neutral APIs and protocols for traces, metrics, and logs. Network devices are beginning to export telemetry via gRPC/protobuf streaming (gNMI — gRPC Network Management Interface), which replaces SNMP polling with push-based high-frequency streaming. Cisco's Model-Driven Telemetry and Juniper's Junos Telemetry Interface stream operational data at sub-second intervals — not possible with poll-based SNMP.
      </Para>
      <H2>YANG and gNMI: The Future of Device Management</H2>
      <Para>
        YANG (RFC 6020) is a data modeling language that replaces MIBs. NETCONF and RESTCONF expose YANG-modeled device state and configuration via XML/JSON over SSH or HTTPS. gNMI (gRPC Network Management Interface) uses Protocol Buffers for compact binary encoding with streaming subscriptions. Together these form the foundation of programmable, model-driven network management.
      </Para>

      <Divider />
      {/* ── Chapter 13 ─────────────────────────────────────────── */}
      <Chapter n={13} title="Misconceptions About SNMP and Syslog" />
      <Err>
        "SNMPv3 is automatically secure if I configure a username." — SNMPv3 has three security levels: noAuthNoPriv (useless), authNoPriv (auth only), and authPriv (auth + encryption). Many devices default to noAuthNoPriv or authNoPriv. Only authPriv with AES-256 and SHA-256 authentication provides meaningful security. Check your security level configuration explicitly.
      </Err>
      <Err>
        "Syslog is a reliable log transport." — UDP/514 (the default) provides no delivery guarantees. Under load, on lossy networks, or if the log server is busy, messages are silently dropped. No counter, no error message. For security logging, use TCP/514 or TLS/6514, and implement buffering (rsyslog's queue action) to handle temporary collector outages.
      </Err>
      <Err>
        "SNMP community strings are like passwords — changing them is enough." — Community strings are transmitted in plaintext and can be captured by anyone with access to the network path between the NMS and the device. Even a strong, unique community string can be sniffed. The correct solution is SNMPv3 authPriv, which encrypts the PDU including the authentication credentials.
      </Err>
      <Err>
        "SNMP gives me real-time traffic data." — SNMP polls counters at intervals (typically 5 minutes). The rate you compute is an average over the polling interval — you cannot see traffic spikes shorter than the polling interval. For real-time flow data, use NetFlow/IPFIX or streaming telemetry (gNMI). SNMP counters are sufficient for capacity planning but not for security investigation.
      </Err>
      <Err>
        "Syslog timestamps tell me exactly when something happened." — Syslog timestamps are generated by the sending device, which may have drifted from the true time if NTP is misconfigured or unavailable. Cross-correlating events across multiple devices is only possible if all clocks are synchronized. Always deploy NTP alongside syslog infrastructure.
      </Err>

      <Divider />
      {/* ── Chapter 14 ─────────────────────────────────────────── */}
      <Chapter n={14} title="IQ Depth Check: Network Observability Mastery" />
      <IQ level="Beginner">
        <strong>What is an OID in SNMP and how is it structured?</strong><br />
        An OID (Object Identifier) is a globally unique sequence of integers separated by dots that identifies a specific variable in the SNMP management tree. The tree starts with ISO (1) and branches through org (3), dod (6), internet (1), management (2), mib-2 (1). For example, sysUpTime is 1.3.6.1.2.1.1.3.0 — the .0 at the end means it is a scalar (single instance). Interface counters have a table index: ifInOctets.3 (1.3.6.1.2.1.2.2.1.10.3) refers to interface 3.
      </IQ>
      <IQ level="Intermediate">
        <strong>Explain syslog priority encoding and what the calculated value 165 means.</strong><br />
        Syslog priority = (Facility × 8) + Severity. Priority 165: 165 ÷ 8 = 20 remainder 5. Facility 20 = local4 (application-defined); Severity 5 = Notice (normal but significant). The priority is encoded as a decimal integer inside angle brackets at the start of each syslog message: &lt;165&gt;. This compact encoding allows a single byte-range value (0–191) to carry both the source category and the urgency of the message.
      </IQ>
      <IQ level="Senior">
        <strong>Why is Counter32 inadequate for monitoring 10 Gbps interfaces with SNMP, and what is the solution?</strong><br />
        Counter32 is a 32-bit unsigned integer that wraps at 2^32 = 4,294,967,295 bytes (~4.29 GB). A 10 Gbps interface at full utilization transfers 1,250 MB/s = 1.25 GB/s. The counter wraps in 4.29 / 1.25 ≈ 3.4 seconds. A monitoring system polling every 5 minutes (300 seconds) cannot know how many times the counter wrapped — the difference between current and previous sample is meaningless. Counter64 (available in SNMPv2c+, from IF-MIB's ifHCInOctets/ifHCOutOctets) uses 64-bit integers. A 10 Gbps interface would take 2^64 bytes / (1.25 × 10^9 bytes/s) ≈ 468 years to wrap. Always use IF-MIB's high-capacity counters for interfaces operating at 100 Mbps or faster.
      </IQ>
      <IQ level="PhD">
        <strong>Describe the SNMPv3 USM security mechanisms — specifically how replay attacks are prevented and how message privacy is achieved.</strong><br />
        SNMPv3's User Security Model (USM, RFC 3414) uses two mechanisms: authentication and privacy. Authentication uses HMAC (SHA-1, SHA-256, or SHA-512). The HMAC key is derived from the user's auth passphrase using the SNMP key localization algorithm: passwordToKey(passphrase, agentEngineID, hashAlg) — the agent's engineID is mixed into the key derivation, binding the key to a specific agent. This prevents using captured auth data against a different agent. Replay protection uses a timeliness window: each USM message includes msgAuthoritativeEngineBoots (number of agent reboots) and msgAuthoritativeEngineTime (seconds since last reboot). The manager tracks the agent's engine time; a message is rejected if it is more than 150 seconds outside the expected time window. Since the agent's time is monotonically increasing, a replayed old message will fall outside this window. Privacy uses AES-128 or AES-256 in CFB mode. The AES key is derived from the privacy passphrase via the same localization algorithm. The initialization vector is constructed from msgAuthoritativeEngineBoots (32-bit) + msgAuthoritativeEngineTime (32-bit) + a 64-bit salt — ensuring IV uniqueness per message without a separate IV field. The encrypted scope PDU (containing the actual SNMP operation) is opaque to anyone without the privacy key; only the message authentication wrapper is visible.
      </IQ>

      <Divider />
      <KeyTakeaways items={[
        'SNMP uses a tree of OIDs (Object Identifiers) to address manageable variables; MIBs define the OID tree and data types; MIB-II is the universal standard baseline.',
        'SNMPv1/v2c use plaintext community strings — no real security; SNMPv3 with authPriv (HMAC-SHA-256 + AES-256) is required for production environments.',
        'SNMP Trap = fire-and-forget UDP notification; Inform = acknowledged notification with retransmission — use Inform for critical alerts.',
        'Counter32 wraps at ~4GB; use SNMPv2c+ Counter64 (IF-MIB ifHCInOctets/ifHCOutOctets) for any interface above 100 Mbps.',
        'Syslog priority encodes facility (source category) and severity (urgency) as priority = (facility × 8) + severity; always check both when filtering.',
        'Syslog has 8 severity levels (0=Emergency to 7=Debug); severity 0-2 require immediate response; 3-4 require investigation; 5-7 are informational.',
        'UDP/514 syslog provides no delivery guarantee and allows log injection; use TLS/6514 (RFC 5425) for security-critical log transport.',
        'NetFlow/IPFIX records per-flow metadata (5-tuple + bytes + packets) without payload; sampling on high-speed interfaces means small flows may be missed.',
        'SNMPv3 replay protection uses engineBoots + engineTime within a 150-second timeliness window; the AES IV combines engineBoots+engineTime+salt for uniqueness.',
        'The modern observability stack (Prometheus, OpenTelemetry, gNMI/YANG) supplements SNMP/Syslog; SNMP remains essential for network infrastructure devices.',
      ]} />
    </LearnLayout>
  )
}
