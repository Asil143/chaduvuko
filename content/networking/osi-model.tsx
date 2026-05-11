'use client'

import { useState } from 'react'
import { LearnLayout } from '@/components/content/LearnLayout'
import { KeyTakeaways } from '@/components/content/KeyTakeaways'
import Link from 'next/link'

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

// ── Interactive OSI Stack ─────────────────────────────────────────────────────
const OSI_LAYERS = [
  {
    n: 7, name: 'Application', color: '#10b981',
    pdu: 'Data',
    proto: 'HTTP, HTTPS, DNS, SMTP, FTP, SSH, SNMP',
    devices: 'Web browsers, mail clients, apps',
    job: 'Provides network services directly to applications. This is where your app talks to the network.',
    realWorld: 'When Chrome sends an HTTP GET request, that is Layer 7. DNS queries are Layer 7. SMTP sending email is Layer 7.',
    header: 'Application-specific (HTTP headers, DNS query format, SMTP commands)',
    attack: 'SQL injection, XSS, HTTP request smuggling, slow loris DoS',
    tool: 'curl, Postman, Wireshark with HTTP dissector, browser DevTools',
  },
  {
    n: 6, name: 'Presentation', color: '#3b82f6',
    pdu: 'Data',
    proto: 'TLS/SSL, MIME, JPEG, MPEG, ASCII, Unicode',
    devices: 'Encryption engines (TLS termination), format converters',
    job: 'Translation, encryption/decryption, and compression. Ensures data from the Application layer of one system can be read by the Application layer of another.',
    realWorld: 'TLS encrypts your HTTPS traffic at Layer 6. JPEG compression of image data is Layer 6. Converting Unicode to ASCII is Layer 6.',
    header: 'Encoding flags, encryption record (TLS record layer)',
    attack: 'POODLE (SSLv3 downgrade), BEAST (TLS 1.0 CBC), certificate spoofing',
    tool: 'openssl s_client, sslyze, testssl.sh',
  },
  {
    n: 5, name: 'Session', color: '#8b5cf6',
    pdu: 'Data',
    proto: 'NetBIOS, RPC, SQL sessions, NFS, SMB',
    devices: 'Session management in middleware and databases',
    job: 'Establishes, manages, and terminates sessions between applications. Handles dialog control (who speaks when) and synchronization (checkpoints for long transfers).',
    realWorld: 'A database connection pool manages Layer 5 sessions. NFS file system mounts. NetBIOS name resolution on Windows networks.',
    header: 'Session ID, dialog control tokens, synchronization points',
    attack: 'Session hijacking, session fixation, cross-site request forgery (CSRF) at the session management layer',
    tool: 'netstat (shows established sessions), ss, Wireshark SMB/RPC dissectors',
  },
  {
    n: 4, name: 'Transport', color: '#f97316',
    pdu: 'Segment (TCP) / Datagram (UDP)',
    proto: 'TCP, UDP, SCTP, DCCP',
    devices: 'Load balancers (Layer 4), firewalls (stateful), NAT',
    job: 'End-to-end communication between processes. Port numbers identify which application gets the data. TCP provides reliable ordered delivery; UDP provides fast best-effort delivery.',
    realWorld: 'TCP port 443 for HTTPS, port 22 for SSH. UDP port 53 for DNS, port 443 for QUIC. A TCP 3-way handshake (SYN/SYN-ACK/ACK) establishes the connection before data flows.',
    header: 'Source port (2B), Destination port (2B), Sequence number (4B), Acknowledgment (4B), Flags (SYN/ACK/FIN/RST), Window size, Checksum',
    attack: 'SYN flood (half-open connection exhaustion), port scanning, TCP session hijacking, RST injection',
    tool: 'netstat, ss, nmap -sT/-sS, tcpdump port 443',
  },
  {
    n: 3, name: 'Network', color: '#06b6d4',
    pdu: 'Packet',
    proto: 'IPv4, IPv6, ICMP, OSPF, BGP, EIGRP',
    devices: 'Routers, Layer 3 switches, firewalls',
    job: 'Logical addressing and routing. IP addresses identify source and destination across networks. Routers use routing tables to forward packets hop-by-hop toward the destination.',
    realWorld: 'Your laptop\'s IP is 192.168.1.100. google.com resolves to 142.250.80.46. Every router between you and Google makes a forwarding decision based on the destination IP in the packet header.',
    header: 'Version (4b), IHL (4b), DSCP (6b), Total Length (2B), TTL (1B), Protocol (1B), Header Checksum (2B), Source IP (4B), Destination IP (4B)',
    attack: 'IP spoofing, ICMP redirect attacks, BGP hijacking, TTL expiry DoS, fragmentation attacks',
    tool: 'ping, traceroute, ip route show, Wireshark IP filter, mtr',
  },
  {
    n: 2, name: 'Data Link', color: '#f59e0b',
    pdu: 'Frame',
    proto: 'Ethernet (802.3), Wi-Fi (802.11), PPP, VLAN (802.1Q), STP (802.1D), ARP',
    devices: 'Switches, access points, bridges, NICs',
    job: 'Node-to-node delivery on the same physical network. MAC addresses identify devices. Ethernet switches use MAC tables to forward frames. ARP resolves IP to MAC. Error detection via CRC.',
    realWorld: 'Your laptop sends an ARP broadcast "who has 192.168.1.1?" — the router responds with its MAC address. Your NIC adds a source MAC and destination MAC to every frame. The switch reads the MAC and forwards to the correct port.',
    header: 'Destination MAC (6B), Source MAC (6B), EtherType/Length (2B), [VLAN tag 4B optional], Payload, FCS/CRC (4B)',
    attack: 'ARP poisoning (MITM), MAC flooding (overflow switch CAM table), VLAN hopping, rogue DHCP server',
    tool: 'arp -n, ip neigh, Wireshark eth filter, macchanger',
  },
  {
    n: 1, name: 'Physical', color: '#ef4444',
    pdu: 'Bits',
    proto: 'Ethernet (electrical), Wi-Fi (radio), fiber (optical), USB, Bluetooth',
    devices: 'Cables, NICs, hubs, repeaters, modems, fiber transceivers',
    job: 'Transmits raw bits over a physical medium. Defines voltage levels, frequencies, cable specifications, connector types, and timing. No addressing — just bit streams.',
    realWorld: 'Cat6A UTP cable carrying 10GBase-T signals at 500MHz. Single-mode fiber at 1310nm wavelength carrying 100G. Wi-Fi 6E radio frames at 6GHz. Your NIC\'s electrical signaling when it drives 0V for bit 0 and +2.5V for bit 1.',
    header: 'No header — raw bit encoding (Manchester, NRZ, PAM4)',
    attack: 'Physical wiretapping, fiber tapping with optical splitters, RF jamming, EMI injection',
    tool: 'Cable testers, optical power meters, spectrum analyzers, Wireshark (reads after NIC decodes)',
  },
]

function OSIStack() {
  const [active, setActive] = useState<number | null>(null)
  const activeLayer = active !== null ? OSI_LAYERS.find(l => l.n === active) : null

  return (
    <div style={{ margin: '24px 0 32px' }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, alignItems: 'start' }}>
        {/* Stack */}
        <div>
          <p style={{ fontSize: 11, color: 'var(--muted)', fontFamily: 'var(--font-mono)', margin: '0 0 10px', letterSpacing: '.06em' }}>SENDER (encapsulates ↓)</p>
          {OSI_LAYERS.map(layer => (
            <div
              key={layer.n}
              onClick={() => setActive(active === layer.n ? null : layer.n)}
              style={{
                display: 'flex', alignItems: 'center', gap: 12,
                padding: '11px 14px', marginBottom: 3,
                borderRadius: 8, cursor: 'pointer',
                border: active === layer.n ? `2px solid ${layer.color}` : '2px solid transparent',
                background: active === layer.n ? `${layer.color}15` : 'var(--surface)',
                transition: 'all 0.15s',
              }}
            >
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, fontWeight: 800, color: layer.color, width: 20, textAlign: 'center' }}>L{layer.n}</span>
              <span style={{ fontSize: 13, fontWeight: active === layer.n ? 700 : 500, color: 'var(--text)', flex: 1 }}>{layer.name}</span>
              <span style={{ fontSize: 11, color: 'var(--muted)', fontFamily: 'var(--font-mono)' }}>{layer.pdu}</span>
            </div>
          ))}
          <p style={{ fontSize: 10, color: 'var(--muted)', fontFamily: 'var(--font-mono)', margin: '10px 0 0', letterSpacing: '.06em', textAlign: 'center' }}>← click any layer for details</p>
        </div>

        {/* Detail panel */}
        <div style={{ border: '1px solid var(--border)', borderRadius: 10, overflow: 'hidden', minHeight: 320 }}>
          {activeLayer ? (
            <div>
              <div style={{ background: `${activeLayer.color}18`, borderBottom: `1px solid ${activeLayer.color}30`, padding: '14px 18px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <span style={{ background: activeLayer.color, color: '#fff', fontSize: 12, fontWeight: 800, fontFamily: 'var(--font-mono)', padding: '3px 9px', borderRadius: 4 }}>Layer {activeLayer.n}</span>
                  <span style={{ fontSize: 16, fontWeight: 800, color: 'var(--text)' }}>{activeLayer.name}</span>
                </div>
              </div>
              <div style={{ padding: '16px 18px', fontSize: 13, color: 'var(--muted)', lineHeight: 1.8 }}>
                <p style={{ color: 'var(--text)', marginBottom: 12, lineHeight: 1.7 }}>{activeLayer.job}</p>
                <div style={{ marginBottom: 10 }}>
                  <span style={{ fontSize: 11, fontWeight: 700, color: activeLayer.color, fontFamily: 'var(--font-mono)', textTransform: 'uppercase', letterSpacing: '.08em' }}>Protocols: </span>
                  <span style={{ fontSize: 12 }}>{activeLayer.proto}</span>
                </div>
                <div style={{ marginBottom: 10 }}>
                  <span style={{ fontSize: 11, fontWeight: 700, color: activeLayer.color, fontFamily: 'var(--font-mono)', textTransform: 'uppercase', letterSpacing: '.08em' }}>Devices: </span>
                  <span style={{ fontSize: 12 }}>{activeLayer.devices}</span>
                </div>
                <div style={{ marginBottom: 10 }}>
                  <span style={{ fontSize: 11, fontWeight: 700, color: activeLayer.color, fontFamily: 'var(--font-mono)', textTransform: 'uppercase', letterSpacing: '.08em' }}>Attacks: </span>
                  <span style={{ fontSize: 12 }}>{activeLayer.attack}</span>
                </div>
                <div style={{ fontSize: 11, color: 'var(--muted)', fontFamily: 'var(--font-mono)', marginTop: 10, padding: '8px 12px', background: 'var(--bg)', borderRadius: 6, lineHeight: 1.6 }}>
                  <strong style={{ color: activeLayer.color }}>Header: </strong>{activeLayer.header}
                </div>
              </div>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: 320, color: 'var(--muted)' }}>
              <div style={{ fontSize: 32, marginBottom: 12, opacity: 0.3 }}>◈</div>
              <p style={{ fontSize: 13, textAlign: 'center', maxWidth: 180, lineHeight: 1.6 }}>Click any layer on the left to explore its protocols, header fields, attacks, and real-world role.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

// ── Encapsulation Diagram ─────────────────────────────────────────────────────
function EncapsulationDiagram() {
  const steps = [
    { layer: 'L7 Application', add: 'HTTP Request (GET /index.html)', color: '#10b981', pdu: 'Data' },
    { layer: 'L6 Presentation', add: '+ TLS encryption record', color: '#3b82f6', pdu: 'Data' },
    { layer: 'L5 Session', add: '+ Session identifier', color: '#8b5cf6', pdu: 'Data' },
    { layer: 'L4 Transport', add: '+ TCP header (src:52431 → dst:443)', color: '#f97316', pdu: 'Segment' },
    { layer: 'L3 Network', add: '+ IP header (src:10.0.1.5 → dst:142.250.80.46)', color: '#06b6d4', pdu: 'Packet' },
    { layer: 'L2 Data Link', add: '+ Ethernet frame (src MAC → dst MAC) + CRC', color: '#f59e0b', pdu: 'Frame' },
    { layer: 'L1 Physical', add: '→ 01001000 11010101... transmitted as electrical/optical/radio signal', color: '#ef4444', pdu: 'Bits' },
  ]

  return (
    <div style={{ margin: '20px 0 32px', overflowX: 'auto' }}>
      {steps.map((s, i) => (
        <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 0, marginBottom: 4 }}>
          <div style={{ width: 160, flexShrink: 0, fontSize: 11, fontFamily: 'var(--font-mono)', fontWeight: 700, color: s.color, textAlign: 'right', paddingRight: 14 }}>{s.layer}</div>
          <div style={{
            flex: 1, padding: '9px 14px', borderRadius: 6,
            background: `${s.color}12`, border: `1px solid ${s.color}30`,
            fontSize: 12, color: 'var(--text)', lineHeight: 1.5,
            paddingLeft: 14 + i * 12,
          }}>
            {s.add}
            <span style={{ float: 'right', fontSize: 10, fontFamily: 'var(--font-mono)', color: s.color, fontWeight: 700 }}>{s.pdu}</span>
          </div>
        </div>
      ))}
      <p style={{ fontSize: 11, color: 'var(--muted)', fontFamily: 'var(--font-mono)', margin: '10px 0 0', textAlign: 'center' }}>encapsulation: each layer wraps the previous layer&apos;s data in its own header</p>
    </div>
  )
}

export default function OSIModel() {
  return (
    <LearnLayout
      title="The OSI Model — All 7 Layers"
      description="The universal framework every network engineer uses to reason about where a problem lives and which tool fixes it. Layer by layer, byte by byte."
      section="Networking Fundamentals — Module 03"
      readTime="24–30 min"
      updatedAt="May 2026"
    >

      {/* ── PART 01 ── */}
      <Part n="01" title="Why a 7-Layer Framework Changed Everything" />

      <P>In 1970, two computers from different manufacturers could not communicate, even if you connected them with a cable. IBM&apos;s System/360 used one protocol. DEC&apos;s PDP systems used another. UNIVAC had its own. Each vendor&apos;s network was a proprietary silo. This was an engineering crisis at civilizational scale — the world was spending billions on computers that could not work together.</P>

      <P>The ISO (International Organization for Standardization) formed a committee in 1977. Their mandate: define a universal reference model that any vendor could implement, any protocol could map to, and any engineer could use to reason about interoperability problems. In 1984, after seven years of debate, <Hl>ISO 7498 was published — the Open Systems Interconnection (OSI) Reference Model.</Hl></P>

      <P>The model never became a deployment reality. TCP/IP, simpler and already proven by the ARPAnet, won the protocol war decisively by the early 1990s. But the <Hl>framework itself became indispensable</Hl>. Today, thirty years after TCP/IP won, every network engineer still uses OSI layer numbers daily. &quot;That&apos;s a Layer 2 problem&quot; and &quot;we need Layer 7 load balancing&quot; are sentences you will say and hear in every networking job you will ever hold.</P>

      <div style={{ background: `${N}08`, border: `1px solid ${N}25`, borderLeft: `4px solid ${N}`, borderRadius: '0 10px 10px 0', padding: '20px 24px', margin: '4px 0 28px' }}>
        <p style={{ fontSize: 13, fontWeight: 700, color: N, margin: '0 0 8px', fontFamily: 'var(--font-mono)' }}>THE ENGINEER&apos;S MENTAL MODEL</p>
        <p style={{ fontSize: 15, color: 'var(--text)', lineHeight: 1.85, margin: 0 }}>
          The OSI model is a <strong>diagnostic and design framework</strong>, not a protocol specification. When something is broken, the OSI layers give you a systematic checklist: is there a physical signal? (L1) Is the frame formed correctly? (L2) Is the IP route present? (L3) Is the port open? (L4) Is TLS negotiating? (L6) Is the application sending valid requests? (L7). Start at Layer 1 and work up — or start at Layer 7 and work down — until you find the layer where things break. The layer where the break lives tells you exactly which tool fixes it.
        </p>
      </div>

      <HR />

      {/* ── PART 02 ── */}
      <Part n="02" title="All 7 Layers — Interactive Reference" />

      <P>The seven layers run from <Hl>Layer 1 (Physical)</Hl> at the bottom — raw bits traveling over wire, fiber, or radio — to <Hl>Layer 7 (Application)</Hl> at the top — the interface your apps use to communicate. Data flows down the stack on the sender (each layer adding its header), across the network, and back up the stack on the receiver (each layer removing its header).</P>

      <P>The mnemonic <em>&quot;Please Do Not Throw Sausage Pizza Away&quot;</em> gives you layers 1→7 bottom-up (Physical, Data Link, Network, Transport, Session, Presentation, Application). Or top-down: <em>&quot;All People Seem To Need Data Processing.&quot;</em> Pick one and use it forever — these are the first seven things you say when you are troubleshooting anything.</P>

      <OSIStack />

      <HR />

      {/* ── PART 03 ── */}
      <Part n="03" title="Encapsulation — How Data Travels Down the Stack" />

      <P>When your browser requests a webpage, data does not just jump across the network. It travels down the OSI stack on your machine, gets wrapped in progressively more headers at each layer, crosses the network as a series of frames, then travels back up the stack on the server — with each layer removing its header. This process is called <Hl>encapsulation</Hl> on the sender side and <Hl>decapsulation</Hl> on the receiver side.</P>

      <EncapsulationDiagram />

      <H>Why Encapsulation Is Not Just Academic</H>
      <P>Every performance analysis, every security audit, and every troubleshooting session requires understanding what each layer adds and what it costs. The TCP header alone is 20–60 bytes per segment. On a 1460-byte TCP payload, that is 1.4–4.1% overhead from TCP alone. Add the IP header (20 bytes), Ethernet frame header (14 bytes), and FCS (4 bytes), and you are paying 58–98 bytes of overhead per 1460 bytes of useful data — a 4–6.7% tax on every transmission.</P>

      <P>This matters at Netflix&apos;s scale. Netflix streams roughly 700 Tbps globally. If they save 1% on header overhead through protocol optimization (e.g., HTTP/2 header compression, QUIC&apos;s more efficient framing), that is 7 Tbps of saved bandwidth — several billion dollars annually in CDN and transit costs. The engineers who optimize protocols are directly reasoning about encapsulation overhead at every layer.</P>

      <Term word="PDU" def="Protocol Data Unit — the name for data at each layer. At L7: 'Data'. At L4: 'Segment' (TCP) or 'Datagram' (UDP). At L3: 'Packet'. At L2: 'Frame'. At L1: 'Bits'. Knowing the PDU name tells you which layer you are discussing." />
      <Term word="Encapsulation" def="The process of wrapping data with a layer's header (and sometimes trailer) as it moves down the OSI stack. Each layer only reads its own header — it treats everything above as opaque payload." />
      <Term word="Decapsulation" def="The reverse process at the receiver — each layer strips its own header and passes the payload up to the layer above." />
      <Term word="SAP" def="Service Access Point — the mechanism by which a layer passes data to the layer above it. The IP protocol field in the IP header (e.g., 6 = TCP, 17 = UDP) is how Layer 3 tells Layer 4 which protocol to use." />

      <HR />

      {/* ── PART 04 ── */}
      <Part n="04" title="Layer 1 — Physical: The Bits That Actually Travel" />

      <P>Layer 1 is where abstraction ends and physics begins. Everything above Layer 1 is software. Layer 1 is hardware, physics, and mathematics. It defines <Hl>how bits are encoded onto a physical medium</Hl> — electrical signals on copper, light pulses on fiber, radio waves in air.</P>

      <H>Signal Encoding: Not Just Voltage High/Low</H>
      <P>You might assume that a &quot;1&quot; is a high voltage and a &quot;0&quot; is a low voltage. For early RS-232 serial, that was approximately true. But modern networking uses far more sophisticated encoding:</P>

      <ul style={{ fontSize: 14, color: 'var(--muted)', lineHeight: 2, paddingLeft: 24 }}>
        <li><Hl>Manchester encoding</Hl> (10BASE-T): every bit has a transition. A rising edge mid-bit = 1, falling edge = 0. Self-clocking — the receiver derives its clock from the signal transitions.</li>
        <li><Hl>NRZ-L</Hl> (Non-Return to Zero Level): high voltage = 1, low voltage = 0. Simple but loses clock sync on long runs of identical bits.</li>
        <li><Hl>4B/5B + NRZI</Hl> (Fast Ethernet 100BASE-TX): four data bits encoded as 5-bit symbols (guarantees transitions for clock recovery), then NRZI encoding of those symbols.</li>
        <li><Hl>PAM4</Hl> (Pulse Amplitude Modulation 4-level): used by 400GbE and 800GbE. Four distinct voltage levels encode 2 bits per symbol. Your data center&apos;s 400G links use PAM4 on DAC (Direct Attach Copper) and fiber.</li>
      </ul>

      <H>The Physical Layer Devices You Will Actually Touch</H>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, margin: '16px 0 24px' }}>
        {[
          { name: 'NIC (Network Interface Card)', desc: 'Converts digital data to/from electrical/optical/radio signals. Handles MAC addressing at L2 but physically sends bits at L1. Every device on a network has one.' },
          { name: 'Fiber Transceiver (SFP/QSFP)', desc: 'Optical module that converts electrical signals to laser light and back. SFP = 1G, SFP+ = 10G, QSFP28 = 100G, QSFP56 = 400G. Every data center switch uses dozens of these.' },
          { name: 'Repeater / Hub', desc: 'Amplifies and retransmits signals without understanding frames. Extends cable distance but also extends collision domains. Hubs are Layer 1 devices.' },
          { name: 'Cable (Cat5e/Cat6A/fiber)', desc: 'The medium itself. Cat6A: 10GbE at up to 100m. Single-mode fiber: 100GbE at up to 40km. Multimode fiber: 100GbE at up to 100m. Physical specs define Layer 1 limits.' },
        ].map((d, i) => (
          <div key={i} style={{ border: '1px solid var(--border)', borderRadius: 8, padding: '14px 16px', background: 'var(--surface)' }}>
            <p style={{ fontSize: 13, fontWeight: 700, color: '#ef4444', margin: '0 0 6px' }}>{d.name}</p>
            <p style={{ fontSize: 13, color: 'var(--muted)', lineHeight: 1.7, margin: 0 }}>{d.desc}</p>
          </div>
        ))}
      </div>

      <ProTip>Layer 1 problems are diagnosed with physical tools: a cable tester (Fluke Networks CableIQ) measures continuity and wire pair mapping; an optical power meter measures light levels on fiber (measured in dBm — too low means attenuation or dirty connector); a spectrum analyzer finds RF interference for Wi-Fi problems. When Wireshark shows CRC errors or physical errors on a link, start at Layer 1 — software cannot fix a bad cable.</ProTip>

      <HR />

      {/* ── PART 05 ── */}
      <Part n="05" title="Layer 2 — Data Link: MAC Addresses, Frames, and Switches" />

      <P>Layer 2 is responsible for node-to-node delivery on a <Hl>single network segment</Hl>. It addresses the fundamental question: if Layer 3 knows the destination IP, how does a frame actually get from one physical machine to the next physical machine on the same local network? The answer is MAC addresses, ARP, and the Ethernet frame.</P>

      <H>Anatomy of an Ethernet Frame</H>

      <div style={{ margin: '16px 0 28px', overflowX: 'auto' }}>
        <div style={{ display: 'flex', borderRadius: 8, overflow: 'hidden', border: '1px solid var(--border)', minWidth: 700 }}>
          {[
            { name: 'Preamble', bytes: '7B', color: '#374151', desc: '10101010 × 7 bytes — synchronizes clock between sender and receiver NIC' },
            { name: 'SFD', bytes: '1B', color: '#4b5563', desc: 'Start Frame Delimiter (10101011) — marks start of frame' },
            { name: 'Dst MAC', bytes: '6B', color: '#f59e0b', desc: '48-bit hardware address of destination NIC on local segment' },
            { name: 'Src MAC', bytes: '6B', color: '#f97316', desc: '48-bit hardware address of sending NIC' },
            { name: 'Type/Len', bytes: '2B', color: '#8b5cf6', desc: 'EtherType (0x0800=IPv4, 0x86DD=IPv6, 0x0806=ARP) or payload length' },
            { name: 'Payload', bytes: '46–1500B', color: '#10b981', desc: 'The encapsulated IP packet (or ARP, etc). Min 46B — padded if shorter.' },
            { name: 'FCS', bytes: '4B', color: '#ef4444', desc: 'CRC-32 checksum. Receiver recalculates and drops frame if mismatch.' },
          ].map((f, i) => (
            <div key={i} style={{ flex: i === 5 ? 3 : 1, minWidth: 0 }}>
              <div style={{ background: f.color, padding: '7px 8px', textAlign: 'center' }}>
                <div style={{ fontSize: 10, fontWeight: 700, color: '#fff', fontFamily: 'var(--font-mono)', letterSpacing: '.04em' }}>{f.name}</div>
                <div style={{ fontSize: 9, color: 'rgba(255,255,255,0.7)', marginTop: 2 }}>{f.bytes}</div>
              </div>
              <div style={{ background: 'var(--surface)', padding: '7px 8px', textAlign: 'center', borderTop: '1px solid var(--border)' }}>
                <div style={{ fontSize: 10, color: 'var(--muted)', lineHeight: 1.5 }}>{f.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <H>How a Switch Learns: The MAC Address Table</H>
      <P>A switch starts life with an empty MAC address table. When it first receives a frame, it reads the <Hl>source MAC address</Hl> and records it against the port the frame arrived on. This is called <em>learning</em>. When a frame arrives with an unknown destination MAC, the switch <em>floods</em> it out all ports except the one it arrived on — just like a hub. But once the destination device replies, its source MAC gets learned, and all future frames to it are forwarded only to its specific port.</P>

      <P>The MAC table has a limited size — typically 8,000–128,000 entries on enterprise switches. This is why MAC flooding attacks work: an attacker sends thousands of frames with random fake source MACs, filling the CAM table (Content Addressable Memory). The switch cannot learn new entries and starts flooding all traffic — turning the switch into a hub and making all traffic visible to the attacker.</P>

      <H>ARP: Bridging Layer 3 to Layer 2</H>
      <P>ARP (Address Resolution Protocol) is the critical glue between IP addressing (Layer 3) and MAC addressing (Layer 2). When your laptop needs to send a packet to the default gateway (say, 192.168.1.1), it knows the IP but not the MAC. ARP sends a broadcast: <em>&quot;Who has 192.168.1.1? Tell 192.168.1.100.&quot;</em> The router responds with its MAC. Your laptop caches this mapping and uses it for all subsequent frames to the router.</P>

      <ProTip>Run <code style={{ fontFamily: 'var(--font-mono)', background: 'var(--surface)', padding: '1px 5px', borderRadius: 4 }}>arp -n</code> or <code style={{ fontFamily: 'var(--font-mono)', background: 'var(--surface)', padding: '1px 5px', borderRadius: 4 }}>ip neigh show</code> on any Linux/macOS machine to see the current ARP cache. Every IP that your machine has recently communicated with on the local subnet will be there, with its MAC address. ARP cache poisoning attacks work by sending gratuitous ARP replies that replace legitimate entries with the attacker&apos;s MAC — all traffic intended for the gateway then flows through the attacker&apos;s machine.</ProTip>

      <HR />

      {/* ── PART 06 ── */}
      <Part n="06" title="Layer 3 — Network: IP Addresses and Routing" />

      <P>Layer 3 solves the problem Layer 2 cannot: delivering data between <Hl>different networks</Hl>. Layer 2 only works within one broadcast domain — your switch can forward frames to any MAC on the local LAN, but it has no way to send frames to a server in another city. Layer 3 introduces IP addressing and routing: a globally unique address space and a hop-by-hop forwarding mechanism that can span arbitrary network boundaries.</P>

      <H>The IP Packet Header</H>

      <div style={{ margin: '16px 0 28px', overflowX: 'auto' }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 3, border: '1px solid var(--border)', borderRadius: 8, padding: 8, background: 'var(--surface)' }}>
          {[
            { field: 'Version', size: '4 bits', desc: '4 for IPv4', color: '#06b6d4' },
            { field: 'IHL', size: '4 bits', desc: 'Header length in 32-bit words (min 5 = 20 bytes)', color: '#06b6d4' },
            { field: 'DSCP/ECN', size: '8 bits', desc: 'QoS marking + congestion signal', color: '#8b5cf6' },
            { field: 'Total Length', size: '16 bits', desc: 'Entire packet including header (max 65535B)', color: '#06b6d4' },
            { field: 'ID', size: '16 bits', desc: 'Identifies fragments of the same packet', color: '#f59e0b' },
            { field: 'Flags/Offset', size: '16 bits', desc: 'DF (Don\'t Fragment), MF (More Fragments), fragment offset', color: '#f59e0b' },
            { field: 'TTL', size: '8 bits', desc: 'Decremented by each router. Packet discarded at 0. Traceroute exploits this.', color: '#ef4444' },
            { field: 'Protocol', size: '8 bits', desc: '6=TCP, 17=UDP, 1=ICMP, 89=OSPF', color: '#10b981' },
            { field: 'Checksum', size: '16 bits', desc: 'Header-only checksum. Recalculated at each router.', color: '#374151' },
            { field: 'Source IP', size: '32 bits', desc: 'Sender\'s IP address (4 octets)', color: '#10b981' },
            { field: 'Dest IP', size: '32 bits', desc: 'Destination\'s IP address', color: '#10b981' },
            { field: 'Options', size: '0–40 bytes', desc: 'Rarely used. Record Route, Strict Source Route, timestamps.', color: '#4b5563' },
          ].map((f, i) => (
            <div key={i} style={{ border: `1px solid ${f.color}30`, borderRadius: 6, padding: '6px 10px', background: `${f.color}08` }}>
              <div style={{ fontSize: 11, fontWeight: 700, color: f.color, fontFamily: 'var(--font-mono)' }}>{f.field}</div>
              <div style={{ fontSize: 10, color: 'var(--muted)', marginTop: 2 }}>{f.size}</div>
              <div style={{ fontSize: 11, color: 'var(--muted)', marginTop: 4, lineHeight: 1.4 }}>{f.desc}</div>
            </div>
          ))}
        </div>
      </div>

      <H>How Routing Works: Longest Prefix Match</H>
      <P>Every router maintains a routing table — a database of network prefixes and their next hops. When a packet arrives, the router looks up the destination IP in its routing table and uses <Hl>longest prefix match</Hl>: the most specific matching route wins.</P>

      <div style={{ fontFamily: 'var(--font-mono)', fontSize: 12, background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 8, padding: '14px 16px', margin: '12px 0 24px', lineHeight: 2 }}>
        <div style={{ color: 'var(--muted)', marginBottom: 6 }}># Example routing table</div>
        <div><span style={{ color: '#06b6d4' }}>10.0.0.0/8</span>       <span style={{ color: 'var(--muted)' }}>via</span> <span style={{ color: '#10b981' }}>192.168.1.1</span>  <span style={{ color: 'var(--muted)' }}>(prefix length 8)</span></div>
        <div><span style={{ color: '#06b6d4' }}>10.5.0.0/16</span>      <span style={{ color: 'var(--muted)' }}>via</span> <span style={{ color: '#f97316' }}>10.0.0.5</span>    <span style={{ color: 'var(--muted)' }}>(prefix length 16 — more specific)</span></div>
        <div><span style={{ color: '#06b6d4' }}>10.5.3.0/24</span>      <span style={{ color: 'var(--muted)' }}>via</span> <span style={{ color: '#8b5cf6' }}>10.5.0.1</span>    <span style={{ color: 'var(--muted)' }}>(prefix length 24 — most specific)</span></div>
        <div><span style={{ color: '#06b6d4' }}>0.0.0.0/0</span>        <span style={{ color: 'var(--muted)' }}>via</span> <span style={{ color: '#ef4444' }}>203.0.113.1</span>  <span style={{ color: 'var(--muted)' }}>(default route — catches everything)</span></div>
        <div style={{ color: 'var(--muted)', marginTop: 8 }}># Packet to 10.5.3.44 matches all 4, but uses /24 (most specific)</div>
        <div style={{ color: 'var(--muted)' }}># Packet to 10.99.1.1 matches /8 only → forwarded via 192.168.1.1</div>
        <div style={{ color: 'var(--muted)' }}># Packet to 8.8.8.8 matches only default route → forwarded to ISP</div>
      </div>

      <P>This longest-prefix-match algorithm runs in hardware on modern routers using TCAMs (Ternary Content-Addressable Memory) — specialized chips that can compare a destination IP against all routing table entries simultaneously in a single clock cycle. A Cisco ASR 9000 routes at 400 million packets per second using this mechanism. Without TCAM hardware, a software lookup against a table of 900,000 BGP routes (the current size of the global routing table) would be far too slow.</P>

      <H>TTL: The Expiring Passport</H>
      <P>The TTL (Time to Live) field in the IP header is set by the sender (typically 64 or 128) and decremented by 1 at every router hop. When it hits 0, the router discards the packet and sends an ICMP &quot;Time Exceeded&quot; message back to the sender. This prevents packets from looping forever on misconfigured networks.</P>
      <P><Hl>Traceroute exploits TTL deliberately</Hl>: it sends packets with TTL=1, 2, 3, 4... The router at hop 1 decrements to 0 and sends back an ICMP Time Exceeded — revealing its IP. The router at hop 2 does the same when TTL=2 expires there. Repeat until the destination is reached. You just mapped every router on the path to any destination on the internet.</P>

      <HR />

      {/* ── PART 07 ── */}
      <Part n="07" title="Layer 4 — Transport: TCP vs UDP, Ports and End-to-End Delivery" />

      <P>Layer 3 delivers packets between networks. But it delivers them to machines, not to applications. If your laptop is simultaneously running a browser (port 443), an SSH session (port 22), and a VoIP call (port 5060), Layer 3 alone cannot tell which incoming IP packet belongs to which application. <Hl>Layer 4 solves this with port numbers</Hl> — and adds two radically different delivery guarantees through TCP and UDP.</P>

      <H>The Socket: The Real Unit of Network Communication</H>
      <P>A socket is the combination of IP address + protocol + port number. The <Hl>4-tuple</Hl> (source IP : source port, destination IP : destination port) uniquely identifies every active network connection on earth. When your browser opens a TCP connection to GitHub at 140.82.114.4:443, the OS assigns an ephemeral source port (say, 54231). The 4-tuple becomes {'{'}10.0.1.5:54231 ↔ 140.82.114.4:443{'}'} and is unique — no other connection in the world has this exact 4-tuple right now.</P>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, margin: '20px 0 28px' }}>
        <div style={{ border: '1px solid #f97316' + '40', borderRadius: 10, padding: '16px 18px', background: '#f97316' + '08' }}>
          <p style={{ fontSize: 12, fontWeight: 700, color: '#f97316', fontFamily: 'var(--font-mono)', textTransform: 'uppercase', letterSpacing: '.1em', margin: '0 0 10px' }}>TCP — Transmission Control Protocol</p>
          <ul style={{ fontSize: 13, color: 'var(--muted)', lineHeight: 1.9, margin: 0, paddingLeft: 18 }}>
            <li>Connection-oriented (3-way handshake)</li>
            <li>Guaranteed delivery (ACKs, retransmission)</li>
            <li>Ordered delivery (sequence numbers)</li>
            <li>Flow control (window size)</li>
            <li>Congestion control (CUBIC, BBR)</li>
            <li>20–60 byte header overhead</li>
            <li>Use for: HTTP, HTTPS, SSH, SMTP, FTP</li>
          </ul>
        </div>
        <div style={{ border: '1px solid #06b6d4' + '40', borderRadius: 10, padding: '16px 18px', background: '#06b6d4' + '08' }}>
          <p style={{ fontSize: 12, fontWeight: 700, color: '#06b6d4', fontFamily: 'var(--font-mono)', textTransform: 'uppercase', letterSpacing: '.1em', margin: '0 0 10px' }}>UDP — User Datagram Protocol</p>
          <ul style={{ fontSize: 13, color: 'var(--muted)', lineHeight: 1.9, margin: 0, paddingLeft: 18 }}>
            <li>Connectionless (no handshake)</li>
            <li>No delivery guarantee (fire and forget)</li>
            <li>No ordering guarantee</li>
            <li>No flow control or congestion control</li>
            <li>8-byte header only</li>
            <li>Use for: DNS, DHCP, VoIP, gaming, QUIC, NTP</li>
          </ul>
        </div>
      </div>

      <H>The 3-Way Handshake</H>
      <P>Every TCP connection starts with a 3-way handshake — three packets that establish synchronized sequence numbers before any data flows:</P>

      <div style={{ fontFamily: 'var(--font-mono)', fontSize: 12, background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 8, padding: '14px 16px', margin: '12px 0 24px', lineHeight: 2.1 }}>
        <div><span style={{ color: '#10b981' }}>Client</span> → <span style={{ color: '#3b82f6' }}>Server</span>:  <span style={{ color: '#f97316' }}>SYN</span>  seq=1000, &quot;I want to connect, my sequence starts at 1000&quot;</div>
        <div><span style={{ color: '#3b82f6' }}>Server</span> → <span style={{ color: '#10b981' }}>Client</span>:  <span style={{ color: '#f97316' }}>SYN-ACK</span>  seq=5000, ack=1001, &quot;OK, my sequence starts at 5000, received your 1000&quot;</div>
        <div><span style={{ color: '#10b981' }}>Client</span> → <span style={{ color: '#3b82f6' }}>Server</span>:  <span style={{ color: '#f97316' }}>ACK</span>  ack=5001, &quot;Received your 5000. Connection established.&quot;</div>
        <div style={{ color: 'var(--muted)', marginTop: 8 }}># Now data can flow in both directions</div>
        <div style={{ color: 'var(--muted)' }}># SYN flood attack: send millions of SYNs, never respond to SYN-ACKs</div>
        <div style={{ color: 'var(--muted)' }}># Server exhausts its half-open connection table → legitimate connections refused</div>
      </div>

      <HR />

      {/* ── PART 08 ── */}
      <Part n="08" title="Layers 5, 6, 7 — Session, Presentation, Application" />

      <P>The upper three OSI layers are often called the &quot;upper layers&quot; and are where most application-level work happens. In the TCP/IP model, they are collapsed into a single &quot;Application layer,&quot; but the OSI distinctions remain conceptually useful — especially for understanding where security mechanisms live.</P>

      <H>Layer 5 — Session: Who Speaks When</H>
      <P>The Session layer manages the <Hl>dialog</Hl> between two applications — establishing, maintaining, synchronizing, and terminating sessions. In modern applications, session management is handled by the application itself (HTTP sessions via cookies, database connection pools, WebSocket connections), but the OSI model gives us vocabulary to describe these mechanisms.</P>
      <P>The most visible Layer 5 protocol in the US enterprise is <Hl>SMB (Server Message Block)</Hl> — the Windows file sharing protocol. SMB sessions are established at Layer 5, persist while files are being read/written, and terminate cleanly. When WannaCry ransomware propagated in 2017, it exploited a buffer overflow in the SMB protocol&apos;s session establishment code — a Layer 5 vulnerability with Layer 1–3 propagation speed.</P>

      <H>Layer 6 — Presentation: Speaking the Same Language</H>
      <P>The Presentation layer handles <Hl>data format translation and encryption</Hl>. Its most important modern role is TLS/SSL — the protocol that encrypts HTTPS connections. When your browser connects to any HTTPS site, TLS operates at Layer 6: negotiating cipher suites, exchanging certificates, deriving session keys, and encrypting/decrypting all application data.</P>
      <P>Other Layer 6 concerns: character encoding (UTF-8 vs UTF-16), image/video compression (JPEG, H.264), serialization formats (JSON, Protocol Buffers, MessagePack). When a Python server serializes a response as JSON and a JavaScript client deserializes it, that encoding/decoding is Layer 6 functionality.</P>

      <H>Layer 7 — Application: Where Your Code Lives</H>
      <P>The Application layer is the interface between the network and the application. It does not mean your application itself — it means the network-facing protocols your application uses. HTTP, DNS, SMTP, SSH, FTP, SNMP, NTP — all of these are Layer 7 protocols.</P>
      <P>Layer 7 is where most modern security work happens. <Hl>Layer 7 firewalls</Hl> (NGFW — Next-Generation Firewalls) can inspect HTTP request bodies, block SQL injection attempts in web traffic, terminate TLS and inspect decrypted content, and apply application-specific policies. A Palo Alto Networks NGFW at a US Fortune 500 company typically processes 5–20 Gbps of Layer 7 inspection traffic continuously.</P>

      <HR />

      {/* ── PART 09 ── */}
      <Part n="09" title="A Day at Palo Alto Networks TAC — The OSI Troubleshooting Ladder" />

      <P>You are a <Hl>Palo Alto Networks NGFW Support Engineer</Hl>. A customer at a large US investment bank (1,200 employees, 8 Gbps firewall throughput) has opened a critical ticket: traders cannot reach the Bloomberg Terminal over HTTPS for the past 23 minutes. Bloomberg Terminal connectivity is directly tied to trading operations. Every minute of outage has regulatory and financial implications.</P>

      <TimeBlock time="09:03 AM" label="Ticket Opened — Start at Layer 1">
        Your first action is always the physical layer. Are the firewall&apos;s uplink interfaces showing link? The customer confirms: all interfaces show green. Optical power levels are normal on the fiber uplinks. No physical errors in the interface counters. Layer 1 is healthy.

        Layer 1 ruled out. Move up.
      </TimeBlock>

      <TimeBlock time="09:06 AM" label="Layer 2 Check — Switch and MAC Table">
        You ask the customer to check the switch connected to the firewall&apos;s external interface. Are there any MAC address table flaps? Any STP topology changes in the last 30 minutes?

        The customer&apos;s network admin pulls the switch logs: 09:01 AM — STP topology change event on the distribution switch. A spanning tree reconvergence happened 2 minutes before the outage. During STP reconvergence, the switch briefly flushes its MAC table and floods traffic — this can disrupt established connections.

        But wait — Bloomberg Terminal connections are HTTPS (TCP). A brief Layer 2 flap would cause a short interruption, not a persistent 23-minute outage. STP reconvergence takes 30–50 seconds maximum with rapid STP. Something else is broken too.

        Layer 2 partially implicated (caused the initial disruption) but not the root cause of the ongoing outage. Move up.
      </TimeBlock>

      <TimeBlock time="09:11 AM" label="Layer 3 Check — Routing and Connectivity">
        You ask the customer to ping Bloomberg&apos;s IP addresses (169.137.0.0/16 — Bloomberg&apos;s public range) from the firewall&apos;s CLI. Pings succeed with normal latency (12ms to NY Bloomberg PoP — the bank is in Manhattan). The routing table shows the correct default route pointing to the ISP.

        Layer 3 is healthy. IP-level connectivity exists. Move up.
      </TimeBlock>

      <TimeBlock time="09:14 AM" label="Layer 4 Check — TCP Connection State">
        Now you look at TCP. You ask the customer to run a test TCP connection to Bloomberg Terminal&apos;s port 443 from a trader&apos;s workstation using <code style={{ fontFamily: 'var(--font-mono)', background: 'var(--surface)', padding: '1px 5px', borderRadius: 4 }}>telnet 169.137.x.x 443</code>. It connects immediately. TCP 3-way handshake succeeds. Layer 4 is healthy.

        Move up to Layer 5/6.
      </TimeBlock>

      <TimeBlock time="09:17 AM" label="Layer 6 Check — TLS Negotiation">
        TCP connects but the application fails. The problem is in Layer 5/6 (TLS). You run an SSL test:

        <code style={{ display: 'block', fontFamily: 'var(--font-mono)', background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 6, padding: '10px 14px', margin: '10px 0', fontSize: 12, color: N }}>openssl s_client -connect 169.137.x.x:443 -tls1_2</code>

        Result: TLS negotiation fails with alert code 40 (handshake_failure). The firewall is receiving a TLS ClientHello but sending back a fatal alert instead of a ServerHello. This is a Layer 6 issue.

        You pull the Palo Alto firewall&apos;s SSL inspection configuration. There it is: the decryption policy for HTTPS traffic was updated at 08:58 AM — five minutes before the outage started. The STP flap at 09:01 interrupted existing connections. When traders tried to reconnect, the new decryption policy was in effect.

        The updated decryption profile has a certificate pinning bypass disabled — Bloomberg Terminal uses certificate pinning and expects a specific certificate. The firewall&apos;s SSL inspection replaces the Bloomberg certificate with the firewall&apos;s own CA certificate. Bloomberg&apos;s client-side certificate pinning detects this mismatch and refuses the connection.

        Root cause: SSL inspection policy change broke Bloomberg Terminal&apos;s certificate pinning. The STP flap forced reconnection which exposed the already-broken policy.

        Fix: add Bloomberg Terminal&apos;s IP ranges (169.137.0.0/16) to the SSL inspection exclusion list. All Bloomberg traffic bypasses decryption — the firewall forwards it transparently. Traders have connectivity restored within 90 seconds of the policy change.

        Total diagnosis: 14 minutes. OSI-layer-by-layer elimination was the entire methodology.
      </TimeBlock>

      <HR />

      {/* ── PART 10 ── */}
      <Part n="10" title="Interview Questions — OSI Edition" />

      <IQ q="What is the OSI model and why does it matter if TCP/IP won?">
        <P>The OSI model is a 7-layer framework for understanding and designing network communication, published by ISO in 1984. Its value is not as a protocol specification (TCP/IP protocols don&apos;t implement it precisely) but as a universal diagnostic and design vocabulary.</P>
        <P>TCP/IP won the protocol war, but OSI terminology won the language war. When an engineer says &quot;that&apos;s a Layer 2 problem&quot; — they mean a MAC addressing or frame-forwarding issue. &quot;Layer 7 load balancer&quot; means it makes routing decisions based on HTTP content. &quot;Layer 3 switch&quot; means a switch that can route IP packets. This vocabulary is consistent across Cisco, Juniper, Palo Alto, AWS, and every other vendor — because they all use OSI layer numbers. You cannot have a networking conversation with senior engineers without this framework.</P>
      </IQ>

      <IQ q="What happens at each layer when you type google.com in a browser?">
        <P>Layer 7: Browser generates an HTTP GET request. DNS resolves google.com to 142.250.80.46 (another UDP query at L7, also going through all layers). Browser initiates a TCP connection to 142.250.80.46:443.</P>
        <P>Layer 6: TLS negotiation establishes an encrypted channel. Certificate chain is validated. Symmetric session keys are derived.</P>
        <P>Layer 5: The HTTPS session is maintained for the duration of the connection (HTTP/1.1 keep-alive or HTTP/2 multiplexing).</P>
        <P>Layer 4: TCP SYN/SYN-ACK/ACK handshake. Sequence numbers synchronized. Source port ~52000 (ephemeral), destination port 443.</P>
        <P>Layer 3: IP packet created with source 192.168.1.100 (your laptop) and destination 142.250.80.46 (Google). TTL set to 64. Routed via default gateway.</P>
        <P>Layer 2: ARP resolves default gateway IP to its MAC. Ethernet frame created with destination MAC = gateway MAC. Frame sent to the switch.</P>
        <P>Layer 1: NIC encodes the frame as electrical signals (Cat6A) or light pulses (fiber to ISP) and transmits to the next hop.</P>
      </IQ>

      <IQ q="What layer does a switch operate at, and what about a router?">
        <P>A traditional (unmanaged) switch operates at <strong>Layer 2</strong>: it reads Ethernet frame headers (destination MAC), looks up the destination MAC in its MAC address table, and forwards the frame to the appropriate port. It makes no decisions based on IP addresses.</P>
        <P>A router operates at <strong>Layer 3</strong>: it reads IP packet headers (destination IP), looks up the destination in its routing table using longest-prefix-match, and forwards the packet to the next hop. It strips and replaces the Layer 2 frame at each hop.</P>
        <P>A <em>Layer 3 switch</em> (also called a multilayer switch) does both: it routes IP traffic between VLANs at wire speed using ASICs, and switches Ethernet frames within each VLAN. A Cisco Catalyst 9300 is a Layer 3 switch — most enterprise core and distribution switches are. They are functionally equivalent to routers for most campus network use cases but faster at hardware-accelerated forwarding.</P>
      </IQ>

      <IQ q="A user reports 'the website is slow.' Where in the OSI model do you start troubleshooting?">
        <P>Start at Layer 1 and work up systematically — but check each layer&apos;s specific failure signature first to avoid wasting time.</P>
        <P>Fast triage: ping the server (L3 connectivity, also gives RTT). If ping fails, you have a Layer 1–3 issue. If ping succeeds but the website fails, you have a Layer 4–7 issue. If ping times are high (say, 200ms when you expect 10ms), you have a Layer 3 routing problem (suboptimal path) or a Layer 1/2 physical issue causing retransmissions.</P>
        <P>For &quot;slow website&quot; with working ping: use traceroute to find which hop adds latency (L3). Use curl -v to see where in the HTTP conversation time is spent (L7). Check TLS negotiation time separately (L6). Use netstat to see if TCP connections are TIME_WAIT accumulating (L4). Check server logs for slow query times (L7 application). The OSI model is the roadmap — symptoms tell you which layer to examine first.</P>
      </IQ>

      <IQ q="What is encapsulation and why does it enable protocol independence?">
        <P>Encapsulation is the process where each OSI layer adds its own header (and sometimes trailer) to the data it receives from the layer above, before passing it to the layer below. Each layer treats the layer above&apos;s output as opaque payload — it adds its header and does not modify the content inside.</P>
        <P>This enables protocol independence because each layer can be changed without affecting layers above or below. IPv4 can be replaced by IPv6 at Layer 3 without changing the TCP protocol at Layer 4 or HTTP at Layer 7. Ethernet can be replaced by Wi-Fi at Layer 2 without changing IP at Layer 3. This modularity is why you can run HTTP/3 over QUIC/UDP while HTTP/2 runs over TCP/TLS — both HTTP versions work over any Layer 4 protocol because HTTP (Layer 7) does not know or care what is below it. TLS (Layer 6) does not know if it is over TCP or QUIC. This layered abstraction is the foundational design principle of the internet.</P>
      </IQ>

      <HR />

      <Part n="11" title="OSI vs TCP/IP — The Model That Ships vs The Model That Explains" />

      <P>The TCP/IP model (also called the Department of Defense or DoD model) collapses OSI&apos;s 7 layers into 4:</P>

      <div style={{ margin: '16px 0 28px', overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
          <thead>
            <tr>
              {['OSI Layers', 'TCP/IP Layer', 'Protocols'].map((h, i) => (
                <th key={i} style={{ padding: '10px 14px', textAlign: 'left', fontFamily: 'var(--font-mono)', fontSize: 11, fontWeight: 700, color: N, letterSpacing: '.06em', border: '1px solid var(--border)', background: 'var(--surface)' }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {[
              ['L7 Application + L6 Presentation + L5 Session', 'Application', 'HTTP, DNS, SMTP, SSH, FTP, TLS, RPC'],
              ['L4 Transport', 'Transport', 'TCP, UDP, SCTP'],
              ['L3 Network', 'Internet', 'IPv4, IPv6, ICMP, OSPF, BGP'],
              ['L2 Data Link + L1 Physical', 'Network Access / Link', 'Ethernet, Wi-Fi, PPP, fiber, copper'],
            ].map((r, i) => (
              <tr key={i} style={{ background: i % 2 === 0 ? 'transparent' : 'var(--surface)' }}>
                {r.map((v, j) => (
                  <td key={j} style={{ padding: '10px 14px', color: 'var(--muted)', border: '1px solid var(--border)', fontSize: 13 }}>{v}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <P>For daily networking work, you will use OSI layer numbers (L2, L3, L4, L7) as vocabulary. When you are reading RFCs or writing protocol specifications, you will use TCP/IP model terminology. Both models are describing the same underlying reality from different levels of granularity. Neither is &quot;wrong.&quot;</P>

      <Err title="Confusing OSI Layers 5 and 6 as separate from 7 in TCP/IP">
        When someone says &quot;the application layer&quot; in a TCP/IP context, they mean OSI layers 5, 6, AND 7 combined. TLS is &quot;application layer&quot; in TCP/IP terms even though it maps to OSI Layer 6. DNS is &quot;application layer&quot; in TCP/IP terms even though it also involves OSI Layer 7. Do not try to force precise OSI layer mapping onto TCP/IP protocol descriptions — the models are intentionally different abstractions.
      </Err>

      <HR />

      <KeyTakeaways items={[
        'The OSI model is a diagnostic and design framework, not a protocol specification. Its value is universal vocabulary — every engineer from Cisco to Google uses L1–L7 terminology.',
        'Encapsulation adds headers layer by layer on the sender; decapsulation strips them on the receiver. Each layer treats the layer above as opaque payload — this modularity enables protocol independence.',
        'Layer 1 (Physical): raw bits, voltage/light/radio encoding. Problems diagnosed with cable testers and optical power meters, not software.',
        'Layer 2 (Data Link): MAC addresses, Ethernet frames, switches. ARP bridges L3 IP to L2 MAC. MAC flooding and ARP poisoning are the primary attacks.',
        'Layer 3 (Network): IP addresses, routing. Longest-prefix-match decides the next hop. TTL prevents routing loops and enables traceroute.',
        'Layer 4 (Transport): TCP provides reliable ordered delivery; UDP provides fast best-effort. Port numbers demultiplex traffic to the correct application.',
        'Layer 6 (Presentation): TLS encrypts HTTPS traffic here. Certificate pinning, cipher suite negotiation, and encryption record handling are all Layer 6.',
        'Layer 7 (Application): HTTP, DNS, SMTP, SSH — the protocols your applications use. Most modern attacks (SQLi, XSS, CSRF) and security inspection (NGFW) operate here.',
        'OSI troubleshooting: start at L1 (physical connectivity), work up systematically. The layer where behavior breaks tells you exactly which tool and protocol to investigate.',
        'TCP/IP collapses OSI L5+L6+L7 into Application, and L1+L2 into Link. Use OSI layer numbers as vocabulary; use TCP/IP model when reading RFCs and protocol specs.',
      ]} />

      <HR />

      <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 12, padding: '24px', textAlign: 'center', margin: '16px 0' }}>
        <p style={{ fontSize: 11, color: N, fontFamily: 'var(--font-mono)', fontWeight: 700, letterSpacing: '.1em', margin: '0 0 8px' }}>NEXT MODULE</p>
        <p style={{ fontSize: 20, fontWeight: 800, color: 'var(--text)', margin: '0 0 8px', letterSpacing: '-0.5px' }}>The TCP/IP Model — How the Internet Works</p>
        <p style={{ fontSize: 14, color: 'var(--muted)', margin: '0 0 18px', lineHeight: 1.7 }}>The four-layer model that actually runs the internet. Complete packet walk-through from your browser to a server on the other side of the planet and back.</p>
        <Link href="/learn/networking/tcp-ip-model" style={{ display: 'inline-block', background: N, color: '#fff', padding: '10px 28px', borderRadius: 8, fontSize: 14, fontWeight: 700, textDecoration: 'none', letterSpacing: '.02em' }}>
          Continue to TCP/IP Model →
        </Link>
      </div>

    </LearnLayout>
  )
}
