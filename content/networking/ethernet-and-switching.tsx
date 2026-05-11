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

const P = ({ children }: { children: React.ReactNode }) => (
  <p style={{ fontSize: 15, color: 'var(--text)', lineHeight: 1.9, margin: '0 0 18px' }}>{children}</p>
)

const H = ({ children }: { children: React.ReactNode }) => (
  <h3 style={{ fontSize: 17, fontWeight: 700, color: 'var(--text)', margin: '32px 0 12px' }}>{children}</h3>
)

const Hl = ({ children }: { children: React.ReactNode }) => (
  <strong style={{ color: N }}>{children}</strong>
)

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

const TimeBlock = ({ time, label, children }: { time: string; label: string; children: React.ReactNode }) => (
  <div style={{ display: 'flex', gap: 20, marginBottom: 28 }}>
    <div style={{ flexShrink: 0, textAlign: 'right', width: 100 }}>
      <div style={{ fontSize: 12, fontWeight: 700, color: N, fontFamily: 'var(--font-mono)' }}>{time}</div>
    </div>
    <div style={{ flex: 1, borderLeft: `2px solid ${N}30`, paddingLeft: 20, paddingBottom: 8 }}>
      <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--text)', marginBottom: 6 }}>{label}</div>
      <div style={{ fontSize: 14, color: 'var(--muted)', lineHeight: 1.8 }}>{children}</div>
    </div>
  </div>
)

const Term = ({ word, def }: { word: string; def: string }) => (
  <div style={{ display: 'flex', gap: 0, marginBottom: 12, border: '1px solid var(--border)', borderRadius: 8, overflow: 'hidden' }}>
    <div style={{ background: `${N}12`, borderRight: `1px solid ${N}20`, padding: '10px 16px', minWidth: 160, display: 'flex', alignItems: 'center' }}>
      <span style={{ fontFamily: 'var(--font-mono)', fontSize: 13, fontWeight: 700, color: N }}>{word}</span>
    </div>
    <div style={{ padding: '10px 16px', fontSize: 13, color: 'var(--muted)', lineHeight: 1.7 }}>{def}</div>
  </div>
)

// ── Ethernet Frame Viewer ─────────────────────────────────────────────────────
const ETHER_FIELDS = [
  { name: 'Preamble', bytes: '7 B', value: 'AA AA AA…', color: '#6b7280', desc: '101010…pattern, clock sync', detail: 'Seven bytes of alternating 1s and 0s (0xAA). Allows the receiver\'s clock to synchronize with the sender\'s clock rate before actual data arrives.' },
  { name: 'SFD', bytes: '1 B', value: 'AB', color: '#6b7280', desc: 'Start Frame Delimiter', detail: '0xAB (10101011) — the final byte of the preamble with a changed last bit signals the start of actual frame data.' },
  { name: 'Dst MAC', bytes: '6 B', value: 'FF:FF:FF:FF:FF:FF', color: '#3b82f6', desc: 'Destination MAC address', detail: 'Layer 2 destination. Broadcast (all Fs) reaches all devices in the broadcast domain. Multicast uses the I/G bit (LSB of first byte = 1). Unicast has I/G = 0.' },
  { name: 'Src MAC', bytes: '6 B', value: 'A4:C3:F0:12:34:56', color: '#8b5cf6', desc: 'Source MAC address', detail: '48-bit hardware address burned into the NIC. First 3 bytes are the OUI (Organizationally Unique Identifier) assigned to the manufacturer by IEEE. Last 3 bytes are device-unique.' },
  { name: 'EtherType', bytes: '2 B', value: '0x0800', color: N, desc: 'Protocol type (IPv4=0x0800, IPv6=0x86DD)', detail: 'Values ≥ 0x0600 (1536) indicate EtherType — the type of payload. Values < 0x0600 indicate IEEE 802.3 length field (pre-EtherType standard). 0x8100 = 802.1Q VLAN tag.' },
  { name: 'Payload', bytes: '46–1500 B', value: 'IP header + data…', color: '#f59e0b', desc: 'Layer 3 packet (padded to 46B min)', detail: 'Minimum 46 bytes — if the IP packet is smaller, the payload is padded to meet the minimum frame size requirement (64 bytes total including headers). Maximum 1500 bytes (standard MTU).' },
  { name: 'FCS', bytes: '4 B', value: 'CRC-32', color: '#ef4444', desc: 'Frame Check Sequence (CRC-32)', detail: 'A CRC-32 checksum computed over the entire frame contents. The receiver recalculates the CRC — any mismatch means the frame was corrupted in transit and it is silently discarded.' },
]

function EtherFrameViewer() {
  const [selected, setSelected] = useState<number | null>(null)

  return (
    <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 14, overflow: 'hidden', margin: '28px 0' }}>
      <div style={{ padding: '18px 22px', borderBottom: '1px solid var(--border)', background: `${N}06` }}>
        <p style={{ fontSize: 11, color: N, fontFamily: 'var(--font-mono)', fontWeight: 700, letterSpacing: '.1em', margin: '0 0 4px' }}>// INTERACTIVE — ETHERNET II FRAME ANATOMY</p>
        <p style={{ fontSize: 13, color: 'var(--muted)', margin: 0 }}>Click any field for a detailed explanation of its purpose and format.</p>
      </div>
      <div style={{ padding: '20px 22px' }}>
        <div style={{ display: 'flex', borderRadius: 8, overflow: 'hidden', border: '1px solid var(--border)', marginBottom: 20, flexWrap: 'wrap' }}>
          {ETHER_FIELDS.map((f, i) => (
            <button
              key={i}
              onClick={() => setSelected(selected === i ? null : i)}
              style={{
                flex: i >= 2 && i <= 3 ? '6 1 0' : i === 5 ? '15 1 0' : '1 1 0',
                minWidth: 0, border: 'none', cursor: 'pointer', padding: 0, background: 'none',
                outline: selected === i ? `2px solid ${f.color}` : 'none', outlineOffset: -2,
              }}
            >
              <div style={{ background: f.color + (selected === i ? 'ff' : '90'), padding: '10px 8px', textAlign: 'center', borderRight: '1px solid rgba(255,255,255,0.15)', transition: 'all .15s' }}>
                <div style={{ fontSize: 10, fontWeight: 700, color: '#fff', fontFamily: 'var(--font-mono)', letterSpacing: '.04em', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{f.name}</div>
                <div style={{ fontSize: 9, color: 'rgba(255,255,255,0.7)', marginTop: 2 }}>{f.bytes}</div>
              </div>
              <div style={{ background: selected === i ? `${f.color}18` : 'var(--background)', padding: '8px', textAlign: 'center', borderRight: '1px solid var(--border)', borderTop: '1px solid var(--border)' }}>
                <div style={{ fontSize: 9, color: 'var(--muted)', fontFamily: 'var(--font-mono)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{f.value}</div>
              </div>
            </button>
          ))}
        </div>

        {selected !== null ? (
          <div style={{ background: `${ETHER_FIELDS[selected].color}10`, border: `1px solid ${ETHER_FIELDS[selected].color}40`, borderRadius: 10, padding: '16px 20px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 10 }}>
              <div>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: 14, fontWeight: 900, color: ETHER_FIELDS[selected].color }}>{ETHER_FIELDS[selected].name}</span>
                <span style={{ fontSize: 12, color: 'var(--muted)', marginLeft: 10 }}>{ETHER_FIELDS[selected].bytes}</span>
              </div>
              <span style={{ fontSize: 11, color: 'var(--muted)', fontFamily: 'var(--font-mono)', fontStyle: 'italic' }}>{ETHER_FIELDS[selected].desc}</span>
            </div>
            <p style={{ fontSize: 13, color: 'var(--text)', lineHeight: 1.8, margin: 0 }}>{ETHER_FIELDS[selected].detail}</p>
          </div>
        ) : (
          <div style={{ padding: '12px 16px', background: 'var(--background)', border: '1px solid var(--border)', borderRadius: 8, fontSize: 13, color: 'var(--muted)', textAlign: 'center' }}>
            Click a field above to see detailed information.
          </div>
        )}

        <div style={{ marginTop: 16, padding: '12px 16px', background: `${N}08`, borderRadius: 8, fontSize: 12, color: 'var(--muted)', lineHeight: 1.7 }}>
          Total frame size: <strong style={{ color: 'var(--text)' }}>64–1518 bytes</strong> (minimum 64 to detect collisions on half-duplex). With 802.1Q VLAN tag: 68–1522 bytes. Jumbo frames: up to 9014 bytes (non-standard, requires switch and NIC support).
        </div>
      </div>
    </div>
  )
}

// ── Switch Learning Simulator ─────────────────────────────────────────────────
type MACEntry = { port: number; mac: string; age: number }

const INITIAL_TABLE: MACEntry[] = []

const SCENARIO_FRAMES = [
  { src: 'A4:C3:F0:11:11:11', dst: 'FF:FF:FF:FF:FF:FF', srcPort: 1, label: 'ARP broadcast from PC-A (port 1)' },
  { src: 'B8:27:EB:22:22:22', dst: 'A4:C3:F0:11:11:11', srcPort: 3, label: 'Reply from PC-C (port 3) to PC-A' },
  { src: 'D4:6A:6A:33:33:33', dst: 'B8:27:EB:22:22:22', srcPort: 2, label: 'Frame from PC-B (port 2) to PC-C' },
  { src: 'A4:C3:F0:11:11:11', dst: 'D4:6A:6A:33:33:33', srcPort: 1, label: 'Frame from PC-A (port 1) to PC-B' },
  { src: 'E8:65:D4:44:44:44', dst: 'A4:C3:F0:11:11:11', srcPort: 4, label: 'New device PC-D (port 4) to PC-A' },
]

function SwitchSim() {
  const [step, setStep] = useState(-1)
  const [table, setTable] = useState<MACEntry[]>(INITIAL_TABLE)
  const [log, setLog] = useState<string[]>([])

  const handleNext = () => {
    const nextStep = step + 1
    if (nextStep >= SCENARIO_FRAMES.length) return
    const frame = SCENARIO_FRAMES[nextStep]

    const newTable = [...table]
    let logEntry = ''

    // Learn source MAC
    const existingIdx = newTable.findIndex(e => e.mac === frame.src)
    if (existingIdx >= 0) {
      newTable[existingIdx].port = frame.srcPort
      newTable[existingIdx].age = 0
      logEntry += `Refresh: ${frame.src} → port ${frame.srcPort}. `
    } else {
      newTable.push({ port: frame.srcPort, mac: frame.src, age: 0 })
      logEntry += `Learned: ${frame.src} → port ${frame.srcPort}. `
    }

    // Forwarding decision
    if (frame.dst === 'FF:FF:FF:FF:FF:FF') {
      logEntry += `Dst is broadcast → FLOOD all ports except port ${frame.srcPort}.`
    } else {
      const dstEntry = newTable.find(e => e.mac === frame.dst)
      if (dstEntry) {
        logEntry += `Dst ${frame.dst} known → FORWARD to port ${dstEntry.port} only.`
      } else {
        logEntry += `Dst ${frame.dst} unknown → FLOOD all ports except port ${frame.srcPort}.`
      }
    }

    setTable(newTable)
    setLog(prev => [...prev, `[Frame ${nextStep + 1}] ${frame.label}: ${logEntry}`])
    setStep(nextStep)
  }

  const handleReset = () => {
    setStep(-1)
    setTable(INITIAL_TABLE)
    setLog([])
  }

  return (
    <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 14, overflow: 'hidden', margin: '28px 0' }}>
      <div style={{ padding: '18px 22px', borderBottom: '1px solid var(--border)', background: `${N}06` }}>
        <p style={{ fontSize: 11, color: N, fontFamily: 'var(--font-mono)', fontWeight: 700, letterSpacing: '.1em', margin: '0 0 4px' }}>// INTERACTIVE — SWITCH MAC TABLE LEARNING SIMULATOR</p>
        <p style={{ fontSize: 13, color: 'var(--muted)', margin: 0 }}>Step through frames and watch the switch build its MAC address table in real time.</p>
      </div>

      <div style={{ padding: '20px 22px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
        {/* MAC Table */}
        <div>
          <p style={{ fontSize: 11, fontWeight: 700, color: N, fontFamily: 'var(--font-mono)', textTransform: 'uppercase', letterSpacing: '.08em', margin: '0 0 10px' }}>MAC Address Table</p>
          {table.length === 0 ? (
            <div style={{ padding: '20px', textAlign: 'center', color: 'var(--muted)', fontSize: 12, border: '1px solid var(--border)', borderRadius: 8 }}>Empty — send first frame to populate</div>
          ) : (
            <div style={{ border: '1px solid var(--border)', borderRadius: 8, overflow: 'hidden' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', background: `${N}12`, padding: '8px 12px', fontSize: 10, fontWeight: 700, color: N, fontFamily: 'var(--font-mono)', textTransform: 'uppercase', letterSpacing: '.06em' }}>
                <span>Port</span>
                <span>MAC Address</span>
              </div>
              {table.map((e, i) => (
                <div key={i} style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', padding: '8px 12px', borderTop: '1px solid var(--border)', background: i % 2 === 0 ? 'var(--surface)' : 'var(--background)', fontSize: 12 }}>
                  <span style={{ fontFamily: 'var(--font-mono)', fontWeight: 700, color: N }}>Port {e.port}</span>
                  <span style={{ fontFamily: 'var(--font-mono)', color: 'var(--text)', fontSize: 11 }}>{e.mac}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Next frame preview */}
        <div>
          <p style={{ fontSize: 11, fontWeight: 700, color: N, fontFamily: 'var(--font-mono)', textTransform: 'uppercase', letterSpacing: '.08em', margin: '0 0 10px' }}>Next Frame</p>
          {step + 1 < SCENARIO_FRAMES.length ? (
            <div style={{ background: 'var(--background)', border: '1px solid var(--border)', borderRadius: 8, padding: '14px 16px', fontSize: 13 }}>
              <div style={{ fontWeight: 700, color: 'var(--text)', marginBottom: 8 }}>{SCENARIO_FRAMES[step + 1].label}</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                <span style={{ fontSize: 11, color: 'var(--muted)' }}>Src: <span style={{ fontFamily: 'var(--font-mono)', color: 'var(--text)' }}>{SCENARIO_FRAMES[step + 1].src}</span> (port {SCENARIO_FRAMES[step + 1].srcPort})</span>
                <span style={{ fontSize: 11, color: 'var(--muted)' }}>Dst: <span style={{ fontFamily: 'var(--font-mono)', color: 'var(--text)' }}>{SCENARIO_FRAMES[step + 1].dst}</span></span>
              </div>
            </div>
          ) : (
            <div style={{ padding: '20px', textAlign: 'center', color: N, fontSize: 13, fontWeight: 700, border: `1px solid ${N}30`, borderRadius: 8 }}>
              All frames processed — MAC table fully populated
            </div>
          )}

          <div style={{ display: 'flex', gap: 8, marginTop: 12 }}>
            <button
              onClick={handleNext}
              disabled={step + 1 >= SCENARIO_FRAMES.length}
              style={{ flex: 1, padding: '10px 16px', background: step + 1 < SCENARIO_FRAMES.length ? N : 'var(--border)', color: '#fff', border: 'none', borderRadius: 8, fontSize: 13, fontWeight: 700, cursor: step + 1 < SCENARIO_FRAMES.length ? 'pointer' : 'default' }}
            >
              Send Frame {step + 2 <= SCENARIO_FRAMES.length ? step + 2 : '—'}
            </button>
            <button
              onClick={handleReset}
              style={{ padding: '10px 16px', background: 'var(--background)', border: '1px solid var(--border)', borderRadius: 8, fontSize: 13, color: 'var(--text)', cursor: 'pointer' }}
            >
              Reset
            </button>
          </div>
        </div>
      </div>

      {log.length > 0 && (
        <div style={{ padding: '0 22px 20px' }}>
          <p style={{ fontSize: 11, fontWeight: 700, color: N, fontFamily: 'var(--font-mono)', textTransform: 'uppercase', letterSpacing: '.08em', margin: '0 0 8px' }}>Decision Log</p>
          <div style={{ background: '#0a0a0a', borderRadius: 8, padding: '14px 16px', fontFamily: 'var(--font-mono)', fontSize: 11, lineHeight: 1.8 }}>
            {log.map((entry, i) => (
              <div key={i} style={{ color: i === log.length - 1 ? N : '#6b7280' }}>{entry}</div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default function EthernetAndSwitching() {
  return (
    <LearnLayout
      title="Ethernet and Switching"
      description="How Ethernet frames work, how switches learn and forward, VLANs, STP, and what actually happens when two devices on the same switch talk to each other."
      section="Networking Fundamentals"
      readTime="28 min"
      updatedAt="May 2026"
    >

      {/* ── PART 1 ── */}
      <Part n="01" title="Ethernet: The Protocol That Won" />

      <P>
        In the 1980s and 1990s, half a dozen competing LAN technologies fought for dominance: Token Ring (IBM), FDDI, ATM, ArcNet, and Ethernet. Ethernet won completely and permanently. Today, every enterprise network, data center, home router, and cloud hyperscaler interconnect uses Ethernet at the physical level. Understanding why Ethernet works the way it does — and why specific design decisions were made — is the foundation for understanding every LAN you will ever touch.
      </P>
      <P>
        <Hl>Ethernet</Hl> is a family of technologies defined in IEEE 802.3 that specifies how frames are formatted, addressed, and transmitted over various physical media. The name comes from the original conception of a passive &quot;ether&quot; through which signals would propagate — all devices shared a single coaxial cable (the bus topology). That physical model is long gone, but the frame format and MAC addressing scheme it defined in 1973 at Xerox PARC (by Robert Metcalfe and David Boggs) persists unchanged in every packet flowing through the internet today.
      </P>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 10, margin: '24px 0 32px' }}>
        {[
          { label: 'First Ethernet', value: '2.94 Mbps', desc: 'Xerox PARC, 1973' },
          { label: '10BASE-T', value: '10 Mbps', desc: 'Star topology, 1990' },
          { label: 'Fast Ethernet', value: '100 Mbps', desc: '100BASE-TX, 1995' },
          { label: 'Gigabit', value: '1 Gbps', desc: '1000BASE-T, 1999' },
          { label: '10 Gigabit', value: '10 Gbps', desc: '10GBASE-T / SR, 2006' },
          { label: '400 Gigabit', value: '400 Gbps', desc: '400GBASE-DR4, 2018' },
        ].map(item => (
          <div key={item.label} style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 10, padding: '12px 14px', textAlign: 'center' }}>
            <div style={{ fontSize: 10, color: 'var(--muted)', fontFamily: 'var(--font-mono)', textTransform: 'uppercase', letterSpacing: '.08em', marginBottom: 4 }}>{item.label}</div>
            <div style={{ fontSize: 16, fontWeight: 900, color: N, fontFamily: 'var(--font-mono)' }}>{item.value}</div>
            <div style={{ fontSize: 11, color: 'var(--muted)', marginTop: 2 }}>{item.desc}</div>
          </div>
        ))}
      </div>

      <HR />

      {/* ── PART 2 ── */}
      <Part n="02" title="MAC Addresses: The Layer 2 Identity System" />

      <P>
        Every network interface card (NIC) has a <Hl>MAC (Media Access Control) address</Hl> — a 48-bit (6-byte) identifier that is (in theory) globally unique and burned into the hardware at the factory. In hexadecimal notation with colons, it looks like: <code style={{ fontFamily: 'var(--font-mono)', background: 'var(--surface)', padding: '2px 6px', borderRadius: 4, fontSize: 13 }}>A4:C3:F0:12:34:56</code>.
      </P>

      <H>MAC Address Structure</H>
      <div style={{ overflowX: 'auto', margin: '12px 0 24px' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13, minWidth: 600 }}>
          <thead>
            <tr style={{ background: `${N}12` }}>
              {['Bytes', 'Field', 'Description'].map(h => (
                <th key={h} style={{ padding: '10px 14px', textAlign: 'left', fontFamily: 'var(--font-mono)', fontSize: 11, color: N, fontWeight: 700, letterSpacing: '.06em', textTransform: 'uppercase', border: '1px solid var(--border)' }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {[
              ['Bytes 0–2', 'OUI (Organizationally Unique Identifier)', 'Assigned by IEEE to the manufacturer. A4:C3:F0 = Raspberry Pi Foundation; 00:0C:29 = VMware; F0:18:98 = Cisco. Databases of OUI-to-manufacturer mappings allow identifying device brands from MAC addresses.'],
              ['Bytes 3–5', 'Device-specific identifier', 'Assigned by the manufacturer — typically sequential or random. Must be unique within the OUI space.'],
              ['Bit 0 of byte 0 (LSB)', 'I/G bit (Individual/Group)', 'I/G = 0: unicast (one specific device). I/G = 1: multicast (group address, e.g., 01:00:5E:xx:xx:xx for IPv4 multicast).'],
              ['Bit 1 of byte 0', 'U/L bit (Universal/Local)', 'U/L = 0: universally administered (manufacturer-assigned, globally unique). U/L = 1: locally administered (manually set or randomized — as in modern iOS/Android MAC randomization).'],
            ].map((row, i) => (
              <tr key={i} style={{ background: i % 2 === 0 ? 'var(--surface)' : 'var(--background)' }}>
                <td style={{ padding: '9px 14px', border: '1px solid var(--border)', fontFamily: 'var(--font-mono)', fontWeight: 700, color: N, whiteSpace: 'nowrap' }}>{row[0]}</td>
                <td style={{ padding: '9px 14px', border: '1px solid var(--border)', fontWeight: 600, color: 'var(--text)' }}>{row[1]}</td>
                <td style={{ padding: '9px 14px', border: '1px solid var(--border)', color: 'var(--muted)', lineHeight: 1.6 }}>{row[2]}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <H>Unicast, Multicast, and Broadcast</H>
      <Term word="Unicast" def="I/G = 0. Delivered to exactly one device. The switch looks up the destination MAC in its table and forwards to a single port." />
      <Term word="Multicast" def="I/G = 1, not all-Fs. Delivered to a subscribed group. IPv4 multicast maps to 01:00:5E:xx:xx:xx addresses. Used by routing protocols (OSPF, EIGRP), mDNS, IGMP." />
      <Term word="Broadcast" def="All bits set: FF:FF:FF:FF:FF:FF. Delivered to every device in the broadcast domain. ARP uses broadcast: 'Who has IP 192.168.1.1?'" />

      <ProTip>
        Modern smartphones (iOS 14+, Android 10+) use MAC address randomization by default when scanning for Wi-Fi networks. The randomized address has U/L = 1 (locally administered) and a random OUI, preventing tracking across networks. This broke many enterprise WiFi captive portals and network access control (NAC) systems that relied on MAC addresses for identity. On wired networks, MAC randomization is not typically used because the device is physically connected to a specific port. On managed enterprise WiFi, per-network persistent random MACs are now used for compliance.
      </ProTip>

      <HR />

      {/* ── PART 3 ── */}
      <Part n="03" title="The Ethernet Frame: Anatomy of Every LAN Packet" />

      <P>
        Every piece of data that traverses a LAN — a DNS query, a database response, a Netflix video chunk — travels inside an Ethernet frame at the data link layer. The frame is the atomic unit of Ethernet communication: it is what the NIC hardware creates and what the switch hardware forwards. Understanding the frame structure explains why certain limits exist (the 1500-byte MTU, the 64-byte minimum, the CRC checksum behavior) and how switches make their forwarding decisions in hardware.
      </P>

      <EtherFrameViewer />

      <H>Jumbo Frames</H>
      <P>
        Standard Ethernet has a 1500-byte MTU (Maximum Transmission Unit) for the payload — a decision made in 1982 based on the memory constraints of the era. <Hl>Jumbo frames</Hl> extend this to 9000 bytes (commonly 9000 or 9014 bytes including headers). Every device in the path (all switches, all NICs, all interfaces) must be configured for the same jumbo MTU, or the oversized frames will be fragmented or silently dropped. Jumbo frames reduce CPU overhead for high-throughput flows like NFS, iSCSI, and large file transfers — fewer frames to process means less interrupt overhead. Data center SANs and NFS clusters typically run jumbo frames; standard internet paths use 1500-byte MTU because mixing is not possible.
      </P>

      <Err title="Jumbo frames causing silent failures in mixed networks">
        Enabling jumbo frames on servers connected to switches that do not support jumbo frames causes the switch to silently drop the oversized frames — there is no error message, only a performance mystery where large transfers fail or stall while small transfers work normally. The symptom is that ping succeeds (small packets) but large file copies fail. Always verify end-to-end MTU consistency with: <code style={{ fontFamily: 'var(--font-mono)', background: 'var(--surface)', padding: '2px 6px', borderRadius: 4, fontSize: 12 }}>ping -s 8972 -M do &lt;destination&gt;</code> (Linux) before enabling jumbo frames — this sends the maximum payload size with the &apos;don&apos;t fragment&apos; bit set.
      </Err>

      <HR />

      {/* ── PART 4 ── */}
      <Part n="04" title="How Switches Work: Hardware Forwarding at Line Rate" />

      <P>
        A <Hl>switch</Hl> is a Layer 2 device that forwards Ethernet frames between ports based on destination MAC addresses. Unlike a hub (which electrically repeats every signal to every port), a switch makes intelligent forwarding decisions that keep traffic isolated to the relevant ports — a frame from PC-A to PC-B is never seen by PC-C&apos;s NIC. This is the fundamental reason switches replaced hubs: they create separate collision domains per port and reduce unnecessary traffic.
      </P>

      <H>The Three Operations of a Switch</H>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 12, margin: '16px 0 28px' }}>
        {[
          { op: '1. Learn', color: '#3b82f6', desc: 'When a frame arrives, the switch reads the source MAC address and records which port it came from in the MAC address table (also called the CAM table — Content Addressable Memory). The entry is timestamped; entries age out after 300 seconds by default (Cisco). This builds a map of "where is each device?"' },
          { op: '2. Forward / Filter', color: N, desc: 'When forwarding a frame, the switch looks up the destination MAC in the CAM table. If found, forward to that port only (unicast forwarding). If the source and destination are on the same port (e.g., two devices on a hub plugged into one switch port), the frame is filtered (discarded). Filtering eliminates unnecessary traffic across the fabric.' },
          { op: '3. Flood', color: '#f59e0b', desc: 'If the destination MAC is not in the CAM table (unknown unicast) or is a broadcast/multicast, the switch floods the frame to all ports except the one it arrived on. This is how ARP requests reach their destination — the ARP broadcast is flooded to all ports, and only the device with the matching IP responds.' },
        ].map(item => (
          <div key={item.op} style={{ background: 'var(--surface)', border: `1px solid ${item.color}30`, borderRadius: 12, padding: '16px 18px' }}>
            <div style={{ fontSize: 13, fontWeight: 900, color: item.color, marginBottom: 10 }}>{item.op}</div>
            <p style={{ fontSize: 13, color: 'var(--text)', lineHeight: 1.75, margin: 0 }}>{item.desc}</p>
          </div>
        ))}
      </div>

      <H>ASIC Hardware Forwarding vs Software Switching</H>
      <P>
        Enterprise switches perform MAC table lookups in dedicated <Hl>ASIC</Hl> (Application-Specific Integrated Circuit) hardware that processes frames at <Hl>line rate</Hl> — a 48-port Gigabit switch can forward 48 × 1 Gbps = 48 Gbps simultaneously without any CPU involvement. The MAC table is stored in a specialized memory called <Hl>TCAM (Ternary Content Addressable Memory)</Hl> that can look up a MAC address in a single clock cycle by searching all entries in parallel. This is why forwarding latency on enterprise switches is measured in microseconds, not milliseconds. When a switch exceeds its TCAM capacity (typically 8,000–128,000 MAC entries depending on the model), older entries are evicted and the switch must fall back to flooding for those destinations — a significant performance degradation on large, flat Layer 2 networks.
      </P>

      <SwitchSim />

      <HR />

      {/* ── PART 5 ── */}
      <Part n="05" title="VLANs: Logical Segmentation on Physical Infrastructure" />

      <P>
        <Hl>VLANs (Virtual LANs)</Hl> divide a single physical switch into multiple isolated broadcast domains. Without VLANs, every device on every port of a switch is in the same broadcast domain — all ARP broadcasts, DHCP discovers, and spanning tree BPDUs reach every port. At 1,000 devices, ARP storms and STP reconvergence events can saturate a flat network. VLANs solve this by tagging frames with a 12-bit VLAN ID (1–4094) and enforcing that frames only reach ports in the same VLAN.
      </P>

      <H>IEEE 802.1Q VLAN Tagging</H>
      <P>
        The IEEE 802.1Q standard adds a 4-byte VLAN tag between the source MAC address and the EtherType field in an Ethernet frame. The tag contains: 3 bits of PCP (Priority Code Point — used for QoS, 802.1p), 1 bit DEI (Drop Eligible Indicator), and 12 bits of VLAN ID. The EtherType 0x8100 signals that the next 4 bytes are a VLAN tag. Tagged frames are called <Hl>dot1q</Hl> frames; untagged frames carry no VLAN tag and are assigned to the port&apos;s native VLAN (PVID).
      </P>

      <div style={{ overflowX: 'auto', margin: '12px 0 24px' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13, minWidth: 600 }}>
          <thead>
            <tr style={{ background: `${N}12` }}>
              {['Port Mode', 'Tag Behavior', 'Use Case', 'Allowed VLANs'].map(h => (
                <th key={h} style={{ padding: '10px 14px', textAlign: 'left', fontFamily: 'var(--font-mono)', fontSize: 11, color: N, fontWeight: 700, letterSpacing: '.06em', textTransform: 'uppercase', border: '1px solid var(--border)' }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {[
              ['Access', 'Receives untagged, strips tag on egress', 'End devices (PCs, phones, cameras)', 'One VLAN only (the access VLAN / PVID)'],
              ['Trunk', 'Passes tagged frames for multiple VLANs; native VLAN is untagged', 'Switch-to-switch links, switch-to-router, uplinks', 'Configured VLAN allow-list (trunk allowed VLANs)'],
              ['Hybrid / General', 'Can mix tagged and untagged per VLAN', 'IP phones + PC on same port (voice VLAN)', 'Multiple VLANs, one untagged'],
              ['QinQ (802.1ad)', 'Double-tagged (outer + inner VLAN tag)', 'ISP Ethernet services — carrier VLAN wrapping customer VLANs', 'All 4094 inner VLANs within one outer VLAN'],
            ].map((row, i) => (
              <tr key={i} style={{ background: i % 2 === 0 ? 'var(--surface)' : 'var(--background)' }}>
                {row.map((cell, j) => (
                  <td key={j} style={{ padding: '9px 14px', border: '1px solid var(--border)', fontFamily: j === 0 ? 'var(--font-mono)' : undefined, fontWeight: j === 0 ? 700 : 400, color: j === 0 ? N : 'var(--text)' }}>{cell}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <H>Inter-VLAN Routing</H>
      <P>
        Devices in different VLANs cannot communicate at Layer 2 — that is the entire point of VLAN segmentation. To route between VLANs, you need Layer 3: either a router with one sub-interface per VLAN (<Hl>router-on-a-stick</Hl>) or a Layer 3 switch with IP interfaces per VLAN (SVIs — Switched Virtual Interfaces). A Layer 3 switch is a Layer 2 switch with a built-in router; inter-VLAN routing happens in ASIC hardware at line rate rather than being punted to a CPU. A router-on-a-stick uses a single physical uplink from the switch carrying 802.1Q-tagged traffic for all VLANs — the router has sub-interfaces (e.g., Gi0/0.10, Gi0/0.20) each configured for a different VLAN and IP subnet. Traffic between VLANs must traverse the router (or SVI), creating a natural chokepoint where access control lists (ACLs) can filter inter-VLAN communication.
      </P>

      <Err title="Leaving default VLAN 1 in use for production traffic">
        VLAN 1 is the default VLAN on Cisco, Juniper, and Aruba switches — all ports belong to VLAN 1 if not configured otherwise, and control plane traffic (CDP, VTP, LLDP, STP BPDUs) travels in VLAN 1 by default. Using VLAN 1 for production user traffic mixes it with control plane traffic and makes traffic analysis harder. Best practice: create dedicated VLANs for user traffic (e.g., VLAN 10 for users, VLAN 20 for servers, VLAN 30 for management), leave VLAN 1 empty, and configure all switch management interfaces on a dedicated management VLAN.
      </Err>

      <HR />

      {/* ── PART 6 ── */}
      <Part n="06" title="Spanning Tree Protocol: Preventing Layer 2 Loops" />

      <P>
        Ethernet frames have no TTL field — a frame in a loop circulates forever. If you connect two switches with two cables (a perfectly reasonable redundancy measure), without Spanning Tree Protocol the network immediately enters a broadcast storm: a broadcast frame entering one switch gets forwarded out both cables, arrives at the second switch on both cables, gets forwarded again, and within milliseconds the network is saturated with infinite copies of the same frame. STP exists solely to prevent this.
      </P>

      <H>How STP Works (802.1D)</H>
      <P>
        STP (IEEE 802.1D) operates by electing a <Hl>Root Bridge</Hl> — the switch with the lowest Bridge ID (8 bytes: 2-byte priority + 6-byte MAC address). All other switches build a shortest-path tree rooted at the Root Bridge. Redundant links that would create loops are identified and put into a <Hl>Blocking</Hl> state — they receive frames but do not forward them. If the primary path fails, the blocking port transitions to Forwarding after the STP convergence timers complete. Classic 802.1D convergence takes 30–50 seconds, which is unacceptable for modern networks.
      </P>

      <div style={{ overflowX: 'auto', margin: '12px 0 24px' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13, minWidth: 600 }}>
          <thead>
            <tr style={{ background: `${N}12` }}>
              {['Port State', 'Forwards Traffic?', 'Learns MACs?', 'Duration'].map(h => (
                <th key={h} style={{ padding: '10px 14px', textAlign: 'left', fontFamily: 'var(--font-mono)', fontSize: 11, color: N, fontWeight: 700, letterSpacing: '.06em', textTransform: 'uppercase', border: '1px solid var(--border)' }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {[
              ['Blocking', 'No', 'No', '20s (Max Age timer)'],
              ['Listening', 'No', 'No', '15s (Forward Delay)'],
              ['Learning', 'No', 'Yes', '15s (Forward Delay)'],
              ['Forwarding', 'Yes', 'Yes', 'Permanent (active)'],
              ['Disabled', 'No', 'No', 'Admin shutdown'],
            ].map((row, i) => (
              <tr key={i} style={{ background: i % 2 === 0 ? 'var(--surface)' : 'var(--background)' }}>
                {row.map((cell, j) => (
                  <td key={j} style={{ padding: '9px 14px', border: '1px solid var(--border)', fontFamily: j === 0 ? 'var(--font-mono)' : undefined, fontWeight: j === 0 ? 700 : 400, color: j === 0 ? N : 'var(--text)' }}>{cell}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <H>RSTP and MSTP: Modern STP</H>
      <P>
        <Hl>RSTP (Rapid Spanning Tree Protocol — 802.1w)</Hl> reduces convergence from 30–50 seconds to 1–3 seconds using explicit proposal-agreement handshakes between switches instead of timer-based transitions. RSTP is the modern standard and is included in 802.1D-2004. All enterprise switches default to RSTP (or its VLAN-aware extension, <Hl>PVST+</Hl> on Cisco, which runs one STP instance per VLAN). <Hl>MSTP (Multiple Spanning Tree Protocol — 802.1s)</Hl> maps multiple VLANs to a small number of STP instances, reducing the CPU overhead of per-VLAN STP while still allowing different VLANs to use different paths.
      </P>
      <P>
        <Hl>PortFast</Hl> is a critical RSTP feature for access ports: it skips the Listening and Learning states and immediately moves a port to Forwarding when a device connects. Without PortFast, every PC would wait 30 seconds before it could send traffic after booting — the PC would try to get a DHCP address (which times out in 5–10 seconds) before STP has even allowed the port to forward. Always enable PortFast on access ports connected to end devices. <Hl>BPDU Guard</Hl> should accompany PortFast — it immediately shuts down a PortFast-enabled port if it receives an STP BPDU (which means someone plugged in a switch, creating a potential loop).
      </P>

      <Err title="Not enabling PortFast on access ports">
        If PortFast is not configured on access ports, every time a PC, printer, or phone boots, it must wait through STP&apos;s Listening (15s) + Learning (15s) states = 30 seconds before it can forward traffic. During this time DHCP discovers time out, Windows domain authentication fails, and users call the help desk. PortFast is not optional — it is a required configuration on every access port connected to an end device. In IOS: <code style={{ fontFamily: 'var(--font-mono)', background: 'var(--surface)', padding: '2px 6px', borderRadius: 4, fontSize: 12 }}>spanning-tree portfast</code> per-interface, or <code style={{ fontFamily: 'var(--font-mono)', background: 'var(--surface)', padding: '2px 6px', borderRadius: 4, fontSize: 12 }}>spanning-tree portfast default</code> globally.
      </Err>

      <HR />

      {/* ── PART 7 ── */}
      <Part n="07" title="Link Aggregation (LACP): Bonding Multiple Cables" />

      <P>
        <Hl>Link Aggregation Control Protocol (LACP — IEEE 802.3ad)</Hl> bonds multiple physical links between two switches into a single logical interface with combined bandwidth and redundancy. Two 10G ports in an LACP aggregate provide 20 Gbps aggregate bandwidth and remain functional if one cable fails. The traffic is distributed across member links using a hash of packet header fields (typically source/destination MAC, IP, and port numbers) — <Hl>not</Hl> round-robin per-packet, because packet reordering would break TCP. This means a single TCP flow always uses the same physical link, so a single flow cannot exceed the bandwidth of one member link. Load balancing benefits only aggregate flows across multiple connections.
      </P>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 10, margin: '16px 0 24px' }}>
        {[
          { label: 'Static LAG', desc: 'No negotiation protocol — both sides must match manually. Fails silently if misconfigured (a cable connected to the wrong switch looks fine).', risk: 'High — no detection of misconfiguration' },
          { label: 'LACP Active', desc: 'Actively sends LACP PDUs. Will form an aggregate with a passive partner. Preferred mode — detects mismatches and cabling errors.', risk: 'Low' },
          { label: 'LACP Passive', desc: 'Responds to LACP PDUs but does not initiate. Will form an aggregate only with an Active partner.', risk: 'Low (with Active partner)' },
        ].map(item => (
          <div key={item.label} style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 10, padding: '14px 16px' }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: N, fontFamily: 'var(--font-mono)', marginBottom: 8 }}>{item.label}</div>
            <p style={{ fontSize: 12, color: 'var(--text)', lineHeight: 1.6, margin: '0 0 8px' }}>{item.desc}</p>
            <div style={{ fontSize: 11, color: item.risk.startsWith('High') ? '#ef4444' : N }}>Misconfiguration risk: {item.risk}</div>
          </div>
        ))}
      </div>

      <ProTip>
        When aggregating server NICs, use LACP with a hash policy of &quot;layer3+4&quot; (hashes on IP + TCP/UDP port numbers) rather than the default &quot;layer2&quot; (hashes on MAC addresses only). In server environments where a single server sends all traffic from one source MAC to one destination MAC (e.g., a database server), a layer2 hash results in all traffic using one link and the aggregate providing no benefit. Layer3+4 distributes flows from the same source-dest MAC pair across links using port numbers.
      </ProTip>

      <HR />

      {/* ── PART 8 ── */}
      <Part n="08" title="Day in the Life — Microsoft Azure: Broadcast Storm During Network Upgrade" />

      <P>
        <strong>Company:</strong> Microsoft Azure · <strong>Role:</strong> Network Infrastructure Engineer · <strong>Location:</strong> Azure South Central US datacenter (San Antonio) · <strong>Date:</strong> Wednesday, September 18, 2024
      </P>

      <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 12, padding: '20px 24px', margin: '20px 0 28px' }}>
        <p style={{ fontSize: 12, color: 'var(--muted)', fontFamily: 'var(--font-mono)', margin: '0 0 12px' }}>INCIDENT: Broadcast storm triggered during VLAN migration; partial fabric outage, 14 minutes</p>

        <TimeBlock time="02:00 AM" label="Planned maintenance begins — VLAN migration on distribution layer">
          The maintenance window opens at 2:00 AM for a scheduled VLAN migration: moving approximately 300 servers from VLAN 100 (legacy application tier) to VLAN 200 (new micro-segmented application tier). The change involves modifying port configurations on four distribution switches. The first two switches are migrated without incident — the access ports are changed from VLAN 100 to VLAN 200, servers receive new IP addresses via DHCP, and connectivity is verified.
        </TimeBlock>

        <TimeBlock time="02:22 AM" label="Engineer begins third switch — introduces trunk misconfiguration">
          On the third switch (dist-03), the change script incorrectly modifies an inter-switch trunk link: instead of adding VLAN 200 to the allowed list, it removes VLAN 100 from the allowed list on a trunk that connects dist-03 to the access layer. This causes the access switches on that segment to lose their uplink for VLAN 100 traffic. Some servers go offline. The engineer notices the errors but decides to quickly add VLAN 200 to the trunk before investigating — a fatigue-induced mistake under time pressure at 2:22 AM.
        </TimeBlock>

        <TimeBlock time="02:24 AM" label="Second mistake: STP root bridge changed inadvertently">
          While troubleshooting, the engineer runs a global STP reconfiguration command intended for dist-03 but accidentally runs it on the entire distribution layer management session. This changes the STP priority to 0 on dist-03, making it the root bridge for all VLANs — displacing the previously configured root (dist-01). RSTP convergence begins: links that were Forwarding go to Discarding, new paths are calculated, and during the convergence window (about 4 seconds of transition), a previously stable loop path briefly becomes active. An ARP flood that was already present from the VLAN 100 disruption enters the loop and explodes into a broadcast storm.
        </TimeBlock>

        <TimeBlock time="02:25 AM" label="Broadcast storm — CPU saturation, control plane collapse">
          Within 15 seconds, all four distribution switches report CPU utilization at 99%. The storm is consuming approximately 800,000 frames per second on the affected segment. The control plane (SSH, SNMP, LLDP) becomes unresponsive on two of the four switches — the CPU cannot process management traffic because the storm packets are consuming all interrupt cycles. The network monitoring system fires P0 alerts. On-call escalation begins.
        </TimeBlock>

        <TimeBlock time="02:27 AM" label="Mitigation: Storm Control and port shutdown">
          The engineer and the on-call senior engineer, now on a bridge call, take a coordinated approach: (1) enable storm control on the affected access ports (limits broadcast traffic to 20% of port bandwidth, discarding excess) — this is done via the OOB (out-of-band) management network which is on a separate physical switch not affected by the storm; (2) manually shut down the non-root-bridge uplinks on dist-02 and dist-04 to break the loop path; (3) restore the original STP root priority on dist-01.
        </TimeBlock>

        <TimeBlock time="02:39 AM" label="Resolution and post-incident review">
          The storm subsides within 90 seconds of the mitigations. RSTP reconverges with the correct topology in under 3 seconds after the loop is broken. All servers that were offline come back online as DHCP leases renew. Total outage: 14 minutes, affecting approximately 220 servers in the datacenter segment. The postmortem identifies four deficiencies: (1) no storm control configured on distribution trunk ports (now mandatory); (2) no pre-change verification of current STP root state; (3) the change script had no dry-run mode that showed the diff before executing; (4) the change window was too short — a 60-minute window for 4 switches was aggressive, and fatigue contributed to the scripting error. Action items: mandatory storm control in the switch configuration standard, automated STP topology verification in the CI/CD pipeline for all switch changes, and a minimum 90-minute change window for multi-switch migrations.
        </TimeBlock>
      </div>

      <Err title="Confusing collision domains and broadcast domains">
        A collision domain is the set of devices that can cause a collision — on a hub, all devices share one collision domain. Each switch port is its own collision domain (full-duplex eliminates collisions entirely). A broadcast domain is the set of devices that receive a Layer 2 broadcast — a switch (without VLANs) is one broadcast domain; adding VLANs creates one broadcast domain per VLAN. Routers and Layer 3 interfaces always separate broadcast domains. The confusing part: a Layer 3 switch&apos;s SVI (routed VLAN interface) terminates the broadcast domain just like a router interface does. ARP does not cross a Layer 3 interface — that is why large flat Layer 2 networks with thousands of devices create ARP storms.
      </Err>

      <HR />

      {/* ── PART 9 ── */}
      <Part n="09" title="Switch Port Security and Access Control" />

      <P>
        <Hl>Port security</Hl> restricts which MAC addresses can communicate on a switch port, providing a baseline defense against MAC flooding attacks (where an attacker fills the CAM table with fake entries, causing the switch to flood all traffic, enabling snooping) and unauthorized device connections. When enabled, port security limits the number of MAC addresses allowed on a port (typically 1 for access ports), and takes a configurable action when a violation occurs: <Hl>protect</Hl> (silently drop), <Hl>restrict</Hl> (drop and log), or <Hl>shutdown</Hl> (immediately err-disable the port).
      </P>

      <H>DHCP Snooping</H>
      <P>
        <Hl>DHCP snooping</Hl> prevents rogue DHCP servers by designating switch ports as trusted (connected to the legitimate DHCP server) or untrusted (access ports, connected to end devices). Untrusted ports are not permitted to send DHCP OFFER or ACK messages — only the trusted ports can respond to DHCP requests. Without DHCP snooping, an attacker can plug a device with a DHCP server into any access port and serve rogue IP addresses and default gateways (a man-in-the-middle attack). DHCP snooping also builds a binding table (IP-to-MAC-to-port-to-VLAN) used by Dynamic ARP Inspection.
      </P>

      <H>Dynamic ARP Inspection (DAI)</H>
      <P>
        ARP has no authentication — any device can send a gratuitous ARP claiming to own any IP address, causing other devices to update their ARP caches with false MAC-to-IP mappings (ARP spoofing / ARP poisoning). <Hl>DAI</Hl> uses the DHCP snooping binding table to validate ARP packets: if an ARP request or reply arrives on an untrusted port claiming an IP-MAC mapping that is not in the binding table, the switch drops the ARP. This prevents ARP poisoning attacks where an attacker inserts themselves as the default gateway.
      </P>

      <ProTip>
        In a campus environment, enable DHCP snooping and DAI on all access VLANs, storm control on all trunk and access ports, and BPDU Guard on all PortFast-enabled access ports. These four features together prevent the most common Layer 2 attacks (MAC flooding, ARP poisoning, rogue DHCP, and accidental STP loops) with minimal operational overhead. They should be in the default switch configuration template, not applied case-by-case.
      </ProTip>

      <HR />

      {/* ── PART 10 ── */}
      <Part n="10" title="Interview Prep — 8 Questions With Complete Answers" />

      <IQ q="What is the difference between a hub, a bridge, and a switch?">
        <p style={{ margin: '0 0 14px' }}>A hub is a Layer 1 device that electrically repeats every signal to every port — it has no intelligence and creates one large collision domain. All devices connected to a hub share the same bandwidth (a 100 Mbps hub gives ~10 Mbps effective bandwidth to 10 devices). Hubs are obsolete.</p>
        <p style={{ margin: '0 0 14px' }}>A bridge is a Layer 2 device that connects two network segments and makes forwarding decisions based on MAC addresses. A bridge with 2 ports creates 2 collision domains and one broadcast domain. Bridges were the precursor to switches but operated in software, making forwarding decisions in milliseconds rather than microseconds.</p>
        <p style={{ margin: 0 }}>A switch is a multi-port bridge with ASIC hardware forwarding. Each port is its own collision domain (essentially eliminated with full-duplex). All ports on a switch (without VLANs) share one broadcast domain. A switch learns MAC-to-port mappings in a CAM table and forwards frames to the specific destination port only. Modern switches operate at Layer 2 and optionally Layer 3 (routing between VLANs via SVIs). The key advance over a bridge is line-rate hardware forwarding (a 48-port GbE switch can forward 48 Gbps simultaneously) and the CAM table hardware implementation.</p>
      </IQ>

      <IQ q="Explain how a switch learns MAC addresses and what happens when a destination MAC is unknown.">
        <p style={{ margin: '0 0 14px' }}>When a frame arrives on a switch port, the switch reads the <strong>source MAC address</strong> and records it in the MAC address table (CAM table) associated with the incoming port. This builds the map: &quot;MAC address X is reachable via port Y.&quot; Entries are timestamped and age out after 300 seconds (default) — if a device stops sending, its entry eventually disappears.</p>
        <p style={{ margin: '0 0 14px' }}>When forwarding, the switch looks up the <strong>destination MAC</strong> in the CAM table. Three outcomes: (1) Found → forward to the specific port only (unicast forwarding). (2) Not found → flood to all ports except the incoming port (unknown unicast flooding). (3) Broadcast (FF:FF:FF:FF:FF:FF) or multicast → flood to all ports in the VLAN except the incoming port.</p>
        <p style={{ margin: 0 }}>An attacker can exploit this with a MAC flooding attack: send frames with thousands of fake source MACs, filling the CAM table until it has no room for legitimate entries. The switch then floods all traffic (because all destinations become unknown), allowing the attacker to capture traffic intended for other devices. Port security mitigates this by limiting the number of MACs per port.</p>
      </IQ>

      <IQ q="What is a VLAN and why would you use one? How does 802.1Q tagging work?">
        <p style={{ margin: '0 0 14px' }}>A VLAN (Virtual LAN) is a logical segmentation of a physical switch into multiple isolated broadcast domains. VLANs are used for three main reasons: (1) security — devices in different VLANs cannot communicate without going through a router, where ACLs can enforce policy; (2) performance — reducing broadcast domain size eliminates ARP floods and STP reconvergence events that affect unrelated devices; (3) network design — multiple logical networks can share physical infrastructure (same switches and cables) with different IP subnets.</p>
        <p style={{ margin: '0 0 14px' }}>802.1Q adds a 4-byte tag in the Ethernet frame between the source MAC address and EtherType. The tag contains: EtherType 0x8100 (indicating a tagged frame), 3 bits of PCP (priority), 1 bit DEI (drop eligibility), and 12 bits of VLAN ID (1–4094). Tagged frames travel on trunk links between switches. Access port frames are untagged — the switch adds or strips the tag at the edge.</p>
        <p style={{ margin: 0 }}>Traffic between VLANs must be routed at Layer 3. A Layer 3 switch with SVIs (Switched Virtual Interfaces) routes inter-VLAN traffic in hardware at line rate. A router-on-a-stick uses sub-interfaces on a single physical link for the same purpose but is limited by the physical link bandwidth and the router&apos;s CPU.</p>
      </IQ>

      <IQ q="What is Spanning Tree Protocol and why is it necessary?">
        <p style={{ margin: '0 0 14px' }}>STP is necessary because Ethernet frames have no TTL — a frame in a network loop circulates forever. In a redundant switched network (two switches connected by two cables), without STP, a broadcast frame arriving on one switch gets forwarded out both links, arrives at the second switch twice, gets forwarded again, and within milliseconds the network is saturated by an exponentially growing number of broadcast copies. This is a broadcast storm, and it immediately takes down the network.</p>
        <p style={{ margin: '0 0 14px' }}>STP prevents loops by electing a Root Bridge and computing a spanning tree (loop-free path from every switch to the Root). Redundant paths that would create loops are put into a Blocking state. If the active path fails, the blocked port transitions to Forwarding after convergence.</p>
        <p style={{ margin: 0 }}>Modern networks use RSTP (802.1w) which converges in 1–3 seconds vs 30–50 seconds for classic STP. Always configure PortFast on access ports (skips STP transitions for end devices), BPDU Guard to shut down ports that unexpectedly receive STP BPDUs, and Root Guard to prevent downstream switches from becoming the Root Bridge. In data centers, STP is increasingly replaced by EVPN/VXLAN or vendor proprietary technologies (Cisco FabricPath, Arista MLAG) that provide loop prevention at a higher level.</p>
      </IQ>

      <IQ q="What is a broadcast storm and how do you prevent and mitigate one?">
        <p style={{ margin: '0 0 14px' }}>A broadcast storm occurs when broadcast or multicast frames circulate indefinitely in a switching loop, exponentially multiplying until they saturate all switch CPU and interface bandwidth. The typical trigger is a Layer 2 loop (two paths between switches without STP) combined with any broadcast traffic. Symptoms: all switches show 100% CPU utilization, control plane (SSH/SNMP) becomes unresponsive, and network traffic stops flowing within seconds to minutes.</p>
        <p style={{ margin: '0 0 14px' }}>Prevention: (1) RSTP/PVST+ configured correctly with an explicit Root Bridge (set the priority to 4096 on the primary distribution switch, 8192 on the secondary — never leave it at the default 32768 which means any new switch could become Root); (2) BPDU Guard on all access ports (shuts port immediately if a BPDU arrives, indicating an unauthorized switch); (3) Storm Control on trunk and uplink ports (rate-limits broadcast traffic to a configured percentage of port bandwidth, dropping excess before it saturates the CPU).</p>
        <p style={{ margin: 0 }}>Mitigation during an active storm: use the out-of-band management network to access switches (a separate physical switch or cellular-connected console servers). Identify the loop by checking interface counters for ports with abnormally high broadcast rates. Shut down the redundant link that created the loop. Once the storm stops, re-enable STP correctly and verify the topology before restoring the port.</p>
      </IQ>

      <IQ q="Explain the difference between a Layer 2 switch and a Layer 3 switch.">
        <p style={{ margin: '0 0 14px' }}>A Layer 2 switch operates only at the data link layer — it makes forwarding decisions based on destination MAC addresses and maintains a CAM (MAC address) table. It has no awareness of IP addresses or routing. All devices on a Layer 2 switch (without VLANs) are in one broadcast domain. A Layer 2 switch cannot route traffic between different IP subnets.</p>
        <p style={{ margin: '0 0 14px' }}>A Layer 3 switch (also called a multilayer switch) adds routing capability in dedicated ASIC hardware. It can create SVIs (Switched Virtual Interfaces) — IP interfaces for each VLAN — and route between VLANs at wire speed. It can also run dynamic routing protocols (OSPF, EIGRP, BGP) and maintain a routing table (FIB — Forwarding Information Base) in TCAM hardware. Inter-VLAN routing on a Layer 3 switch happens at 10–400 Gbps; routing on a CPU-based router happens at much lower speeds under load.</p>
        <p style={{ margin: 0 }}>When to use which: use a Layer 2 switch for access layer ports where all you need is MAC-based forwarding and VLANs. Use a Layer 3 switch at the distribution and core layers where inter-VLAN routing and potentially routing protocol participation are needed. In modern data centers, every Top-of-Rack (TOR) switch is typically a Layer 3 switch because BGP is run down to the server level in leaf-spine architectures.</p>
      </IQ>

      <IQ q="What is LACP and how does it differ from a simple bonded/static LAG?">
        <p style={{ margin: '0 0 14px' }}>LACP (Link Aggregation Control Protocol, IEEE 802.3ad) is a protocol that negotiates link aggregation between two directly connected devices. Each side sends LACP PDUs advertising its system ID and the set of ports it wants to aggregate. Both sides must agree on the aggregate configuration before any links are added to the bundle. This negotiation catches misconfigurations automatically — if you accidentally connect the wrong ports or connect to the wrong switch, LACP will not form the aggregate and the ports remain as individual non-aggregated links (rather than forwarding in an undefined state).</p>
        <p style={{ margin: '0 0 14px' }}>A static LAG (also called manual LAG or mode &quot;on&quot; in Cisco terminology) forces ports into an aggregate without any negotiation. Both ends must be manually configured to match — there is no automatic detection of mismatches. A static LAG connected to the wrong switch will form and forward traffic, potentially creating a loop if STP is not properly configured.</p>
        <p style={{ margin: 0 }}>For load balancing: neither LACP nor static LAG provides per-packet load balancing (that would reorder packets and break TCP). Traffic is hashed to a member link based on a hash of configured fields (L2: src/dst MAC; L3: src/dst IP; L4: src/dst TCP/UDP port). A single flow always uses the same link. Maximum single-flow throughput is one member link&apos;s bandwidth. LACP provides redundancy (remaining links continue if one fails) and aggregate throughput improvement for multiple concurrent flows.</p>
      </IQ>

      <IQ q="What is MAC address table overflow (CAM table overflow) attack and how do you defend against it?">
        <p style={{ margin: '0 0 14px' }}>A CAM table overflow attack (a form of MAC flooding) sends a continuous stream of frames with thousands of fake source MAC addresses from an attacker-controlled port. The switch dutifully learns each new fake MAC and fills its CAM table (which has limited TCAM memory — typically 8,000–128,000 entries). Once the table is full, the switch has no room for legitimate MAC entries and can no longer do unicast forwarding — it falls back to flooding all traffic out all ports (because every destination is now unknown). This allows the attacker to capture traffic intended for other devices using a simple packet sniffer.</p>
        <p style={{ margin: '0 0 14px' }}>The attack is trivially launched with tools like Macof (part of dsniff) which can generate 155,000 fake MAC frames per minute. A standard switch fills its CAM table in under 60 seconds.</p>
        <p style={{ margin: 0 }}>Defense: Port security on all access ports. Configure <code style={{ fontFamily: 'var(--font-mono)', fontSize: 12 }}>switchport port-security maximum 1</code> (or 2–3 for a port with a phone + PC) and <code style={{ fontFamily: 'var(--font-mono)', fontSize: 12 }}>switchport port-security violation restrict</code> to drop and log. With a maximum of 1, the switch immediately stops accepting new MACs from that port once one is learned — the flood of fake MACs is silently dropped. The <code style={{ fontFamily: 'var(--font-mono)', fontSize: 12 }}>sticky</code> option saves the first learned MAC to the running config automatically, reducing manual configuration overhead for large deployments.</p>
      </IQ>

      <HR />

      {/* ── PART 11 ── */}
      <Part n="11" title="Common Misconceptions" />

      <Err title="A switch creates separate broadcast domains">
        A basic switch (without VLANs) creates separate collision domains per port but only ONE broadcast domain. Every broadcast frame (ARP, DHCP discover, NetBIOS) reaches every port on the switch. Only VLANs, routers, and Layer 3 switch interfaces create separate broadcast domains. This is why a flat 500-device switch segment generates so much ARP and DHCP traffic that it degrades performance — all 500 devices hear every ARP request. The solution is VLAN segmentation, keeping broadcast domains to under 500 devices as a rule of thumb, with inter-VLAN routing at Layer 3.
      </Err>

      <Err title="Full-duplex switches eliminate collisions, so CSMA/CD is active">
        Full-duplex ports (every modern switch port) have separate TX and RX pairs — data flows simultaneously in both directions without collision. CSMA/CD (Carrier Sense Multiple Access with Collision Detection) is the collision avoidance mechanism from half-duplex Ethernet. On a full-duplex switch port, CSMA/CD is entirely disabled — the hardware simply never detects a collision because the physical medium makes collision impossible. This is why modern switches run at their rated speed with zero collision overhead. CSMA/CD is only relevant for troubleshooting legacy half-duplex interfaces or when a duplex mismatch occurs (one side full-duplex, other half-duplex).
      </Err>

      <Err title="Higher-priority spanning tree bridge priority means it is more likely to become Root Bridge">
        STP elects the Root Bridge using the lowest Bridge ID — lower is better. The Bridge ID priority field defaults to 32768. Setting priority to 4096 makes a switch MORE likely to be elected Root (lower priority number = higher election priority). The naming is counterintuitive: &quot;priority 4096&quot; makes the switch a higher-priority Root candidate than &quot;priority 32768.&quot; Always explicitly configure the intended Root Bridge with priority 4096 (or 0 for the absolute root) and document it — leaving priority at the default means any switch could become Root if it has the lowest MAC address.
      </Err>

      <HR />

      <KeyTakeaways items={[
        'Ethernet II frames contain: Preamble (7B) + SFD (1B) + Dst MAC (6B) + Src MAC (6B) + EtherType (2B) + Payload (46–1500B) + FCS CRC-32 (4B). Minimum 64 bytes total, maximum 1518 bytes (1522 with 802.1Q tag).',
        'MAC addresses are 48-bit identifiers: first 3 bytes are the OUI (manufacturer), I/G bit 0 = unicast/multicast, U/L bit 1 = locally vs universally administered.',
        'Switches learn MAC-to-port mappings by reading source MAC addresses on arrival (Learn), forward to specific ports for known destinations (Forward), and flood to all ports for unknown destinations and broadcasts (Flood).',
        'VLANs create separate broadcast domains on shared physical infrastructure. 802.1Q adds a 4-byte tag (EtherType 0x8100 + PCP + DEI + 12-bit VLAN ID). Inter-VLAN routing requires a Layer 3 device.',
        'STP prevents Layer 2 loops by blocking redundant links. RSTP (802.1w) converges in 1–3 seconds vs 30–50s for classic STP. PortFast skips STP transitions for access ports; BPDU Guard shuts down ports receiving BPDUs unexpectedly.',
        'A switch creates one collision domain per port (full-duplex) but one broadcast domain for all ports. VLANs partition broadcast domains; routers and L3 SVIs separate them.',
        'LACP negotiates link aggregation via PDUs, detecting misconfigurations automatically. Load balancing uses per-flow hashing (not per-packet round-robin). Maximum single-flow bandwidth is one member link.',
        'DHCP snooping (trusted vs untrusted ports), Dynamic ARP Inspection (validates ARP against DHCP binding table), and port security (limits MACs per port) are the Layer 2 security triad for access networks.',
        'Storm control limits broadcast/multicast rate on ports, preventing a loop from saturating the CPU. Deploy on all trunk and access ports as a baseline configuration.',
        'CAM table overflow attacks fill the MAC table with fake entries, causing the switch to flood all traffic. Port security with maximum 1 MAC per access port is the standard countermeasure.',
      ]} />

    </LearnLayout>
  )
}
