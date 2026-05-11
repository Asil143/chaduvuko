import { LearnLayout } from '@/components/content/LearnLayout'
import { Callout } from '@/components/content/Callout'
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

const Packet = ({ fields }: { fields: { name: string; value: string; bytes: string; color: string; desc: string }[] }) => (
  <div style={{ margin: '20px 0 32px', overflowX: 'auto' }}>
    <div style={{ display: 'flex', borderRadius: 8, overflow: 'hidden', border: '1px solid var(--border)', minWidth: 560 }}>
      {fields.map((f, i) => (
        <div key={i} style={{ flex: 1, minWidth: 0 }}>
          <div style={{ background: f.color, padding: '8px 10px', textAlign: 'center' }}>
            <div style={{ fontSize: 10, fontWeight: 700, color: '#fff', fontFamily: 'var(--font-mono)', letterSpacing: '.06em' }}>{f.name}</div>
            <div style={{ fontSize: 9, color: 'rgba(255,255,255,0.7)', marginTop: 2 }}>{f.bytes}</div>
          </div>
          <div style={{ background: 'var(--surface)', padding: '8px 10px', textAlign: 'center', borderTop: '1px solid var(--border)' }}>
            <div style={{ fontSize: 11, color: 'var(--text)', fontFamily: 'var(--font-mono)', fontWeight: 700, marginBottom: 4 }}>{f.value}</div>
            <div style={{ fontSize: 10, color: 'var(--muted)', lineHeight: 1.5 }}>{f.desc}</div>
          </div>
        </div>
      ))}
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

export default function WhatIsANetwork() {
  return (
    <LearnLayout
      title="What is a Network?"
      description="Packets, nodes, protocols, bandwidth, latency — and exactly what happens in the network the moment you press Enter in a browser"
      section="Networking Fundamentals — Module 01"
      readTime="18–24 min"
      updatedAt="May 2026"
    >

      {/* ── PART 01 ── */}
      <Part n="01" title="The Definition That Actually Explains Everything" />

      <P>Most explanations of computer networks start with: <em>"a network is a collection of connected devices."</em> That is technically accurate and completely useless. A power strip connects devices. A USB hub connects devices. What makes a <Hl>computer network</Hl> fundamentally different is not the physical connection — it is what that connection allows those devices to do: <Hl>share data, share resources, and coordinate with each other at arbitrary scale, across arbitrary distance, using agreed-upon rules.</Hl></P>

      <P>Here is the definition that actually works:</P>

      <div style={{ background: `${N}08`, border: `1px solid ${N}25`, borderLeft: `4px solid ${N}`, borderRadius: '0 10px 10px 0', padding: '20px 24px', margin: '4px 0 24px' }}>
        <P>A computer network is a system of two or more devices that communicate by exchanging <strong>packets</strong> — discrete chunks of data — over physical or wireless transmission media, governed by <strong>protocols</strong> — precise rules specifying exactly how that data is formatted, addressed, transmitted, received, and acknowledged — enabling devices to share information and resources regardless of distance or scale.</P>
      </div>

      <P>Every word is doing work. Let us go through the key terms.</P>

      <P><Hl>"Two or more devices"</Hl> — the absolute minimum for a network. Even this smallest case (two laptops connected by an Ethernet cable) contains every fundamental networking concept: addressing, protocols, transmission media. Everything larger is just this scaled up.</P>

      <P><Hl>"Packets"</Hl> — data is not sent as one continuous stream. It is chopped into small, numbered chunks called packets. A 10 MB file becomes roughly 7,000 packets of 1,460 bytes each. Each packet travels independently across the network, possibly taking different routes, and is reassembled at the destination. This design is one of the most important engineering decisions in the history of computing. It means no single connection needs to be dedicated for the entire duration of a file transfer — many devices can share the same wire simultaneously by interleaving their packets. It also means if one packet is lost, only that packet needs to be retransmitted, not the entire file.</P>

      <P><Hl>"Protocols"</Hl> — the agreed-upon rules. A protocol defines exactly: how large a packet can be, what goes in the header (addressing information), how the sender says "I want to communicate," how the receiver says "I got it," what happens when a packet is lost, how fast data can flow. Without protocols, two devices cannot understand each other regardless of how they are physically connected. TCP, UDP, IP, HTTP, DNS, TLS — these are all protocols. You will learn every one of them in this course.</P>

      <P><Hl>"Physical or wireless transmission media"</Hl> — networks do not move data by magic. Bits travel as electrical voltage changes along copper cable, as pulses of laser light along fiber optic strands, or as modulated electromagnetic waves through the air (Wi-Fi). The choice of medium determines maximum speed, maximum distance, susceptibility to interference, and cost. We cover this in depth in Module 07.</P>

      <HR />

      {/* ── PART 02 ── */}
      <Part n="02" title="The Real-World Scale: What Networks Actually Look Like in 2026" />

      <P>Understanding what a network is at the abstract level is only half the story. The other half is appreciating the <Hl>absurd scale</Hl> of the networks you interact with every day — because this scale is what makes networking engineering hard and what makes it interesting.</P>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: 12, margin: '20px 0 32px' }}>
        {[
          { company: 'Netflix',     color: '#e50914', stat: '700 Tbps', context: 'Peak outbound traffic from Netflix CDN servers during evening hours in North America. That is 700 trillion bits per second flowing across networks to stream video to 270 million subscribers simultaneously.' },
          { company: 'Google',      color: '#4285f4', stat: '200+ PoPs', context: 'Google operates over 200 Points of Presence worldwide — locations where their network peers directly with ISPs. This means a Google search result often never leaves Google\'s own private network fiber backbone until the last mile.' },
          { company: 'Cloudflare',  color: '#f6821f', stat: '296 cities', context: 'Cloudflare\'s network spans 296 cities, handling roughly 20% of all web traffic. When you visit a Cloudflare-protected site, the TLS handshake and DDoS mitigation happen at a data center within ~10ms of you.' },
          { company: 'AWS',         color: '#ff9900', stat: '33 regions', context: 'AWS operates 33 geographic regions, each with multiple Availability Zones — isolated data centers connected by redundant private fiber. When your app says "us-east-1," it is pointing at Northern Virginia with ~12ms round-trip to most of the US East Coast.' },
          { company: 'Meta',        color: '#1877f2', stat: '3.2B users', context: 'Meta\'s infrastructure handles 3.2 billion daily active users. Their backbone network — private undersea cables and terrestrial fiber — spans 6 continents, carrying WhatsApp messages, Instagram reels, and Facebook posts simultaneously.' },
          { company: 'Your ISP',    color: N,         stat: 'Last mile', context: 'Every device in this list ultimately connects to end users through an ISP\'s "last mile" — the final link from their network to your home. This is usually the slowest, most contended, and most failure-prone part of the entire journey.' },
        ].map(item => (
          <div key={item.company} style={{ background: 'var(--surface)', border: `1px solid ${item.color}25`, borderRadius: 10, padding: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
              <span style={{ width: 10, height: 10, borderRadius: 3, background: item.color, display: 'inline-block', flexShrink: 0 }} />
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: 13, fontWeight: 700, color: 'var(--text)' }}>{item.company}</span>
              <span style={{ fontSize: 12, color: item.color, fontWeight: 700, marginLeft: 'auto', fontFamily: 'var(--font-mono)' }}>{item.stat}</span>
            </div>
            <p style={{ fontSize: 12, color: 'var(--muted)', margin: 0, lineHeight: 1.65 }}>{item.context}</p>
          </div>
        ))}
      </div>

      <P>None of this is magic. Every one of these systems — Netflix streaming to 270 million people simultaneously, Google's 200+ PoPs, AWS's 33 regions — is built on the same fundamental protocols you are about to learn. TCP, IP, Ethernet, BGP, DNS. The protocols do not change. The scale just multiplies.</P>

      <HR />

      {/* ── PART 03 ── */}
      <Part n="03" title="Nodes, Hosts, Clients, Servers — The Vocabulary You Must Own" />

      <P>Networking has a precise vocabulary. Imprecise use of these words in an interview signals that you are a beginner. Here are the foundational terms, defined exactly.</P>

      <Term word="Node" def="Any device connected to a network and capable of sending, receiving, or forwarding data. Includes computers, phones, routers, switches, printers, IoT sensors, and servers. Every device on a network is a node." />
      <Term word="Host" def="A node that runs applications that initiate or receive network communication. Your laptop is a host. A web server is a host. A router is NOT a host — it forwards traffic between networks but does not initiate application-level communication. The distinction matters in routing tables and firewall rules." />
      <Term word="Client" def="A host that initiates a request to another host. Your browser is a client when it requests a web page. A client contacts a server, waits for a response, and uses that response to accomplish something. Clients are typically end-user devices, though servers can act as clients to other servers." />
      <Term word="Server" def="A host that listens for incoming requests and responds to them. A web server listens on port 80/443 for HTTP requests. A DNS server listens on port 53 for resolution queries. The word 'server' refers to a role — software listening on a port — not necessarily powerful hardware. Your laptop can run a server." />
      <Term word="Peer" def="A node that acts as both client and server simultaneously. BitTorrent nodes are peers — they download from others (client role) and upload to others (server role) at the same time. Video calls work the same way. P2P networks have no central server." />
      <Term word="Router" def="A device that forwards packets between different networks based on destination IP addresses. Your home router connects your LAN to your ISP's WAN. Enterprise routers at ISPs make decisions about how to route packets across the global internet. Routers operate at Layer 3 (Network layer) of the OSI model." />
      <Term word="Switch" def="A device that forwards frames between devices on the same network based on MAC addresses. Switches operate at Layer 2 (Data Link layer). They learn which MAC address is connected to which port and build a table to send frames directly rather than broadcasting to everyone." />
      <Term word="Access Point" def="A device that creates a wireless LAN, bridging Wi-Fi clients to a wired network. An AP is not a router — it connects wireless devices to an existing network. Most home 'routers' are actually a router + switch + access point combined in one box." />

      <Callout type="info">
        The client-server model is the dominant architecture of the internet. When you open Instagram, your phone (client) sends an HTTP request to Instagram's servers. The server responds with data. Your phone renders it. This request-response cycle happens billions of times per second across the internet. Every web app, every API, every database query follows this model. Understanding it deeply is prerequisite to understanding security, performance, and reliability engineering.
      </Callout>

      <HR />

      {/* ── PART 04 ── */}
      <Part n="04" title="What a Packet Actually Is — Anatomy of Every Message on the Internet" />

      <P>Every piece of data that crosses a network — a single keystroke in an SSH session, a 4K Netflix frame, a Google search query — travels as one or more <Hl>packets</Hl>. Understanding packet structure is the single most important concept in networking. It is what makes Wireshark readable, what makes protocol design logical, and what makes security analysis possible.</P>

      <P>A packet has two parts: a <Hl>header</Hl> and a <Hl>payload</Hl>.</P>

      <H>The Header</H>
      <P>The header is the packet's envelope. It contains the metadata needed to deliver the payload: source address, destination address, how long the packet is, what protocol the payload uses, and control flags. Every protocol at every layer adds its own header. When you send an HTTP request, the data gets wrapped in a TCP header, then an IP header, then an Ethernet frame header — each layer adding its own addressing and control information. This wrapping process is called <Hl>encapsulation</Hl>. At the destination, each layer strips its header off as the data moves up — this is called <Hl>decapsulation</Hl>.</P>

      <H>The Payload</H>
      <P>The payload is the actual data being transported — the part that matters to the application. For an HTTP request, the payload is your GET /search?q=networking. For a video stream, it is compressed video data. For a DNS query, it is the domain name you are resolving. The network layers (IP, TCP, Ethernet) treat the payload as opaque bytes — they do not look inside it. Only the destination application interprets the payload.</P>

      <H>A Real HTTP Packet — Laid Out as Bytes</H>
      <P>Here is what a single HTTP GET request packet looks like at each layer, from the outermost wrapper to the innermost payload:</P>

      <Packet fields={[
        { name: 'ETHERNET HEADER', value: 'Dest MAC + Src MAC + EtherType', bytes: '14 bytes', color: '#334155', desc: 'Layer 2. Identifies this frame on the local network segment. EtherType 0x0800 = IPv4.' },
        { name: 'IP HEADER',       value: 'Src IP + Dst IP + TTL + Proto', bytes: '20 bytes', color: '#1e40af', desc: 'Layer 3. Routes the packet across networks. TTL=64. Protocol=6 (TCP).' },
        { name: 'TCP HEADER',      value: 'Src Port + Dst Port + Seq + Flags', bytes: '20 bytes', color: '#6d28d9', desc: 'Layer 4. Ensures reliable delivery. Dst port 80. Flags: PSH+ACK.' },
        { name: 'HTTP PAYLOAD',    value: 'GET / HTTP/1.1\r\nHost: example.com', bytes: '~40 bytes', color: '#065f46', desc: 'Layer 7. The actual request. This is the only part the web server cares about.' },
      ]} />

      <P>The entire packet is 94 bytes — 54 bytes of headers and 40 bytes of actual content. That ratio shows you how much overhead networking adds. For small packets (like a short DNS query), headers can be <em>larger</em> than the payload. For large file transfers, the payload dominates and the header overhead becomes negligible.</P>

      <H>Maximum Transmission Unit (MTU)</H>
      <P>Ethernet has a maximum frame size of <Hl>1,500 bytes</Hl> of payload (the MTU). This limit comes from the original Ethernet specification and has remained a constant for 40 years. Every IP packet must fit within this limit. When you send a 10 MB file, it is split into approximately 6,897 packets of up to 1,460 bytes each (1,500 MTU minus 20 bytes IP header minus 20 bytes TCP header). This process is called <Hl>fragmentation</Hl>. Modern networks prefer that the sender fragments rather than having routers in the middle do it — this is called Path MTU Discovery and is why you sometimes see ICMP "Fragmentation Needed" messages.</P>

      <ProTip>
        When troubleshooting network issues where large files transfer slowly but small ones work fine, or where VPN connections work but certain applications fail over VPN, the first thing to check is MTU. VPN tunnels add their own headers (typically 40–80 bytes), reducing the available payload space. If the MTU is not adjusted to account for VPN overhead, large packets cannot fit and fragmentation — or worse, packet drops — occurs. The fix: set interface MTU to 1420 (or similar) on VPN clients.
      </ProTip>

      <HR />

      {/* ── PART 05 ── */}
      <Part n="05" title="Protocols — The Rules That Make Communication Possible" />

      <P>Imagine two people trying to have a conversation when one only speaks Mandarin and the other only speaks Spanish. The physical ability to produce and hear sounds exists — but without a shared protocol (language, grammar, turn-taking rules), no communication happens. Networks face the same problem multiplied by billions of devices made by thousands of manufacturers across six decades.</P>

      <P>A <Hl>network protocol</Hl> is a formal specification — published as an RFC (Request for Comments) by the IETF (Internet Engineering Task Force) — that defines exactly:</P>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, margin: '16px 0 28px' }}>
        {[
          { label: 'Message format',      desc: 'What fields are in the header, how many bytes each field occupies, what values are valid, what byte order (endianness) is used.' },
          { label: 'Addressing',           desc: 'How senders and receivers are identified. IP uses 32-bit (IPv4) or 128-bit (IPv6) addresses. Ethernet uses 48-bit MAC addresses.' },
          { label: 'State machine',        desc: 'What states a connection can be in, and what events trigger transitions. TCP\'s state machine defines CLOSED → SYN_SENT → ESTABLISHED → FIN_WAIT → TIME_WAIT → CLOSED.' },
          { label: 'Error handling',       desc: 'What happens when a packet is corrupted, lost, arrives out of order, or arrives duplicate. TCP retransmits. UDP discards. IP drops and may send ICMP back.' },
          { label: 'Flow control',         desc: 'How the receiver tells the sender to slow down when its buffer is filling up. TCP\'s sliding window prevents a fast sender from overwhelming a slow receiver.' },
          { label: 'Security',             desc: 'Whether messages are authenticated, encrypted, or integrity-checked. HTTP sends plaintext. HTTPS wraps HTTP in TLS. SSH encrypts everything including the authentication.' },
        ].map(item => (
          <div key={item.label} style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 8, padding: '14px 16px', borderLeft: `3px solid ${N}` }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: N, marginBottom: 6 }}>{item.label}</div>
            <div style={{ fontSize: 13, color: 'var(--muted)', lineHeight: 1.65 }}>{item.desc}</div>
          </div>
        ))}
      </div>

      <H>The Protocol Stack — Why There Are So Many Protocols</H>
      <P>Rather than one monolithic protocol that handles everything, the internet uses a <Hl>layered architecture</Hl> — a stack of protocols where each layer solves one problem and provides a service to the layer above it. This is one of the greatest engineering decisions in the history of computing. The benefit: you can swap out one layer without affecting the others. When Wi-Fi 6 replaced Wi-Fi 5, TCP/IP above it did not change. When HTTP/2 replaced HTTP/1.1, TCP below it did not change. The layers are independent.</P>

      <div style={{ overflowX: 'auto', margin: '20px 0 32px' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
          <thead>
            <tr>
              {['Layer', 'Protocols', 'What it does', 'Device that operates here'].map((h, i) => (
                <th key={h} style={{ padding: '12px 16px', background: 'var(--surface)', color: 'var(--muted)', fontWeight: 700, textAlign: 'left', borderBottom: '1px solid var(--border)', fontSize: 11, textTransform: 'uppercase', letterSpacing: '.08em', whiteSpace: 'nowrap' }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {[
              ['Application', 'HTTP, HTTPS, DNS, SSH, SMTP, FTP, SNMP', 'Provides services to user applications — web browsing, email, file transfer, name resolution', 'Application software'],
              ['Transport',   'TCP, UDP, QUIC',                         'Multiplexes multiple conversations over one IP connection; TCP adds reliability and ordering',    'Host operating system'],
              ['Network',     'IP (IPv4, IPv6), ICMP, OSPF, BGP',       'Addresses and routes packets between networks; determines the path from source to destination',   'Router'],
              ['Data Link',   'Ethernet, Wi-Fi (802.11), PPP, VLAN',    'Frames data for transmission on a single network segment; MAC addressing; error detection',      'Switch, Access Point'],
              ['Physical',    'Cat5e/6/6A, Fiber, 802.11 RF',           'Transmits raw bits over physical medium — electrical signals, light pulses, radio waves',         'NIC, Cable, Hub'],
            ].map(([layer, proto, does, device], i) => (
              <tr key={layer} style={{ background: i % 2 === 0 ? 'transparent' : 'var(--surface)' }}>
                <td style={{ padding: '12px 16px', color: N, fontWeight: 700, fontFamily: 'var(--font-mono)', fontSize: 13, borderBottom: '1px solid var(--border)', whiteSpace: 'nowrap' }}>{layer}</td>
                <td style={{ padding: '12px 16px', color: 'var(--text)', fontFamily: 'var(--font-mono)', fontSize: 11, borderBottom: '1px solid var(--border)', lineHeight: 1.7 }}>{proto}</td>
                <td style={{ padding: '12px 16px', color: 'var(--muted)', borderBottom: '1px solid var(--border)', lineHeight: 1.7 }}>{does}</td>
                <td style={{ padding: '12px 16px', color: 'var(--text)', borderBottom: '1px solid var(--border)', lineHeight: 1.7, whiteSpace: 'nowrap' }}>{device}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <P>You will learn every row of this table in depth over the next 43 modules. For now, understand the key insight: <Hl>each layer only talks to the layer directly above and below it</Hl>. IP does not care whether the data below it is carried over fiber or Wi-Fi. HTTP does not care whether the data below it uses TCP or QUIC. The abstractions are clean and deliberate.</P>

      <HR />

      {/* ── PART 06 ── */}
      <Part n="06" title="Bandwidth, Latency, Throughput, and Jitter — The Four Numbers That Define Network Performance" />

      <P>Networking engineers live and die by four metrics. Every application performance problem you will ever debug comes back to one of these four. Every conversation about network capacity involves all four. Know them precisely.</P>

      <H>Bandwidth</H>
      <P><Hl>Bandwidth</Hl> is the maximum theoretical data rate of a link — how many bits per second the medium can carry. Your home internet might be "1 Gbps" — meaning a gigabit Ethernet link with 1,000,000,000 bits per second theoretical capacity. Bandwidth is a property of the physical medium and interface. Cat5e cable can carry up to 1 Gbps. Single-mode fiber can carry 100 Gbps or more. Wi-Fi 6 (802.11ax) can carry up to 9.6 Gbps theoretical maximum (shared across all connected clients).</P>
      <P>Critical point: <Hl>bandwidth is a ceiling, not a guarantee</Hl>. Having a 1 Gbps link does not mean you will transfer files at 1 Gbps. Actual speed is limited by latency, protocol overhead, TCP window size, CPU processing speed, and the speed of the other end. Most home users with "1 Gbps" internet connections see 40–80 MB/s in real file transfers — around 50% of theoretical maximum — after all overhead is accounted for.</P>

      <H>Latency</H>
      <P><Hl>Latency</Hl> is the time for a single bit (or packet) to travel from source to destination — the one-way delay. Measured in milliseconds. Round-trip time (RTT) is the time for a packet to go to a destination and come back — what you measure with ping. Sources of latency include:</P>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 8, margin: '12px 0 24px' }}>
        {[
          { source: 'Propagation delay',  cause: 'Speed of light through the medium (~200,000 km/s through fiber). New York to London is ~5,570 km, giving a minimum one-way delay of ~28ms just for light travel time.',                          example: 'A transatlantic ping has a floor of ~56ms RTT regardless of bandwidth.' },
          { source: 'Transmission delay', cause: 'Time to push all packet bits onto the wire. A 1500-byte packet on a 10 Mbps link takes 1.2ms just to transmit. On a 1 Gbps link, the same packet takes 0.000012ms.',                      example: 'Critical for real-time applications over low-bandwidth links.' },
          { source: 'Processing delay',   cause: 'Time for a router or switch to receive a packet, look up the routing table, and begin forwarding. Modern routers do this in microseconds, but every hop adds some.',                            example: 'A packet crossing 20 hops across the internet accumulates processing delay at each router.' },
          { source: 'Queuing delay',       cause: 'Time a packet spends waiting in a router\'s queue behind other packets. The most variable source of latency. Under load, buffers fill and packets wait. Buffers too large = "bufferbloat."', example: 'Your gaming latency spikes from 20ms to 200ms when someone starts downloading — queuing delay.' },
        ].map(row => (
          <div key={row.source} style={{ border: '1px solid var(--border)', borderRadius: 8, padding: '14px 16px', background: 'var(--surface)' }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: N, marginBottom: 4 }}>{row.source}</div>
            <div style={{ fontSize: 13, color: 'var(--muted)', lineHeight: 1.7, marginBottom: 6 }}>{row.cause}</div>
            <div style={{ fontSize: 12, color: 'var(--text)', fontFamily: 'var(--font-mono)', background: 'var(--background)', borderRadius: 4, padding: '4px 10px' }}>→ {row.example}</div>
          </div>
        ))}
      </div>

      <P><Hl>Latency kills real-time applications</Hl>. For video calls, humans start noticing delay at ~150ms one-way. Above 300ms, natural conversation becomes impossible — you accidentally interrupt the other person because your brain thinks they have finished speaking. Twitch game streaming requires latency below 80ms to feel responsive. High-frequency trading systems are co-located in the same data center as exchange servers specifically to reduce latency to microseconds — even one millisecond of advantage can mean billions in annual profit.</P>

      <H>Throughput</H>
      <P><Hl>Throughput</Hl> is the actual data rate achieved in practice — what you measure when you run a file transfer and see "45 MB/s." It is always less than bandwidth due to protocol overhead, TCP slow start, retransmissions, and all the other sources of inefficiency. The gap between bandwidth and throughput is one of the most common sources of confusion for beginners. "I have a 1 Gbps connection, why is my file copying at 120 MB/s?" — 120 MB/s is 960 Mbps. That is 96% of theoretical maximum. That is actually exceptional. More commonly, throughput is 50–80% of bandwidth.</P>

      <H>Jitter</H>
      <P><Hl>Jitter</Hl> is the variation in latency over time — the inconsistency of delay. If your first packet takes 20ms, the second takes 22ms, the third takes 19ms — the jitter is approximately ±2ms. Low jitter is critical for real-time applications: VoIP, video conferencing, gaming, live streaming. These applications generate audio or video at a fixed rate and need packets to arrive at a fixed rate. High jitter means packets arrive irregularly — some early, some late — causing audio glitches, video artifacts, and the choppy quality you hear in bad phone calls.</P>

      <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 10, padding: '18px 20px', margin: '12px 0 28px' }}>
        <div style={{ fontSize: 10, color: 'var(--muted)', fontFamily: 'var(--font-mono)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '.1em', marginBottom: 14 }}>Target values for common applications</div>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 12 }}>
            <thead>
              <tr>
                {['Application','Minimum bandwidth','Max acceptable latency','Max acceptable jitter'].map(h => (
                  <th key={h} style={{ padding: '8px 12px', color: 'var(--muted)', textAlign: 'left', borderBottom: '1px solid var(--border)', fontWeight: 700, whiteSpace: 'nowrap' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[
                ['VoIP (G.711)',          '64 Kbps',   '< 150ms one-way', '< 30ms'],
                ['Video call (1080p)',    '3–4 Mbps',  '< 150ms',         '< 50ms'],
                ['Online gaming (FPS)',   '3–6 Mbps',  '< 50ms',          '< 10ms'],
                ['4K Netflix streaming', '25 Mbps',   '1–2 seconds',     'Tolerant'],
                ['HTTP web browsing',     '1 Mbps',    '< 300ms',         'Tolerant'],
                ['File transfer (SCP)',   'Maximise',  'Doesn\'t matter', 'Doesn\'t matter'],
              ].map(([app, bw, lat, jit], i) => (
                <tr key={app} style={{ background: i % 2 === 0 ? 'transparent' : 'rgba(255,255,255,0.02)' }}>
                  <td style={{ padding: '8px 12px', color: 'var(--text)', fontWeight: 600, borderBottom: '1px solid var(--border)' }}>{app}</td>
                  <td style={{ padding: '8px 12px', color: 'var(--muted)', borderBottom: '1px solid var(--border)', fontFamily: 'var(--font-mono)' }}>{bw}</td>
                  <td style={{ padding: '8px 12px', color: 'var(--muted)', borderBottom: '1px solid var(--border)', fontFamily: 'var(--font-mono)' }}>{lat}</td>
                  <td style={{ padding: '8px 12px', color: 'var(--muted)', borderBottom: '1px solid var(--border)', fontFamily: 'var(--font-mono)' }}>{jit}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <HR />

      {/* ── PART 07 ── */}
      <Part n="07" title="What Happens When You Press Enter — The Complete Journey of One HTTP Request" />

      <P>This is the question that appears in every senior networking interview at Google, Amazon, Cloudflare, and Netflix. Walking through it precisely — not vaguely — is the clearest demonstration of real networking knowledge. Here is the complete, technically accurate answer for a request to <code style={{ fontFamily: 'var(--font-mono)', background: 'var(--surface)', padding: '2px 6px', borderRadius: 4, fontSize: 13 }}>https://www.example.com/</code></P>

      <H>Step 1 — DNS Resolution</H>
      <P>Your browser needs the IP address for <em>www.example.com</em>. It first checks its local DNS cache. If no cache hit, it asks the operating system. The OS checks its own cache and the hosts file (/etc/hosts on Linux/macOS, C:\Windows\System32\drivers\etc\hosts on Windows). If still no result, the OS asks your configured DNS resolver — typically your router's IP address, which forwards to your ISP's resolver, or 8.8.8.8 (Google) or 1.1.1.1 (Cloudflare) if you have changed it.</P>
      <P>Your DNS resolver performs recursive resolution: it asks a root nameserver where .com lives, gets referred to Verisign's .com nameservers, asks those where example.com lives, gets referred to example.com's authoritative nameservers, and finally receives the answer: 93.184.216.34. The entire process typically takes 1–50ms. We cover DNS recursion in exhaustive detail in Module 25.</P>

      <H>Step 2 — TCP Connection (3-Way Handshake)</H>
      <P>Now that your browser has the IP address 93.184.216.34, it needs to establish a TCP connection to port 443 (HTTPS). TCP requires a <Hl>3-way handshake</Hl> before any data can flow:</P>
      <div style={{ fontFamily: 'var(--font-mono)', fontSize: 12, background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 8, padding: '16px 20px', margin: '12px 0 20px', lineHeight: 2 }}>
        <div><span style={{ color: N }}>Client → Server:</span> SYN (seq=1000) <span style={{ color: 'var(--muted)' }}>// "I want to connect, my initial sequence number is 1000"</span></div>
        <div><span style={{ color: '#3b82f6' }}>Server → Client:</span> SYN-ACK (seq=5000, ack=1001) <span style={{ color: 'var(--muted)' }}>// "OK, my seq is 5000, I acknowledge your seq+1"</span></div>
        <div><span style={{ color: N }}>Client → Server:</span> ACK (ack=5001) <span style={{ color: 'var(--muted)' }}>// "Acknowledged. Connection established."</span></div>
      </div>
      <P>This costs one round-trip time before any data moves. On a 50ms RTT link (e.g., coast-to-coast US), the handshake alone takes 50ms. This is why latency matters so much for web performance — every new TCP connection costs at minimum one RTT before the first byte of useful data arrives.</P>

      <H>Step 3 — TLS Handshake</H>
      <P>Since this is HTTPS, after the TCP handshake, the client and server perform a TLS 1.3 handshake to establish encryption. TLS 1.3 has been optimized to complete in <Hl>one round-trip</Hl> (previous TLS 1.2 required two). During this handshake, the server presents its certificate (proving it is really example.com), the client verifies it against trusted Certificate Authorities, and both parties derive shared encryption keys using elliptic curve Diffie-Hellman key exchange. After this — typically another 50ms — all data flows encrypted. Module 23 covers TLS in full byte-by-byte detail.</P>

      <H>Step 4 — HTTP Request</H>
      <P>Now the browser sends the actual HTTP GET request inside the encrypted TLS connection:</P>
      <div style={{ fontFamily: 'var(--font-mono)', fontSize: 12, background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 8, padding: '16px 20px', margin: '12px 0 20px', lineHeight: 1.8 }}>
        <div style={{ color: N }}>GET / HTTP/1.1</div>
        <div style={{ color: 'var(--muted)' }}>Host: www.example.com</div>
        <div style={{ color: 'var(--muted)' }}>User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)...</div>
        <div style={{ color: 'var(--muted)' }}>Accept: text/html,application/xhtml+xml...</div>
        <div style={{ color: 'var(--muted)' }}>Accept-Language: en-US,en;q=0.9</div>
        <div style={{ color: 'var(--muted)' }}>Connection: keep-alive</div>
      </div>

      <H>Step 5 — The Packet's Journey Across the Internet</H>
      <P>Your HTTP request is now inside a TCP segment, inside an IP packet, inside an Ethernet frame. Here is what happens at the network layer as it travels:</P>
      <P>Your laptop sends the Ethernet frame to your home router (default gateway). Your router strips the Ethernet frame, looks at the destination IP (93.184.216.34), consults its routing table, determines this needs to go to your ISP, and forwards it — wrapped in a new Ethernet frame addressed to the ISP's router. This process repeats at every router hop. Each router strips the Layer 2 frame, reads the Layer 3 IP header, makes a routing decision, and sends a new Layer 2 frame to the next hop. The IP packet is unchanged through this entire process — only the Ethernet frame is recreated at each hop. Typically 10–20 hops for a request to a US server.</P>

      <H>Step 6 — Server Response and TCP Acknowledgments</H>
      <P>The server receives your request, generates an HTTP 200 response with the HTML content, and sends it back. TCP splits the response into multiple packets if it exceeds 1,460 bytes (the typical MSS — Maximum Segment Size). Your browser acknowledges each packet received. If a packet is lost, the server retransmits it. Once all packets are received and acknowledged, TCP considers the transfer complete.</P>

      <H>Step 7 — Browser Renders the Page</H>
      <P>Your browser receives the HTML, parses it, discovers it needs CSS files, JavaScript files, and images. For each resource, it may open a new TCP connection (or reuse the existing one with HTTP keep-alive, or open multiple streams if HTTP/2 is used). DNS resolution may be needed for CDN domains. The entire process of loading a modern webpage can involve 50–200 individual network requests across multiple servers and CDN nodes.</P>

      <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 10, padding: '16px 20px', margin: '12px 0 28px', fontFamily: 'var(--font-mono)', fontSize: 12, lineHeight: 2 }}>
        <div style={{ fontSize: 10, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '.1em', fontWeight: 700, marginBottom: 8 }}>Total time for a simple page load (50ms RTT to server)</div>
        <div><span style={{ color: '#f59e0b' }}>DNS resolution:</span>                <span style={{ color: 'var(--text)' }}>~20ms</span> <span style={{ color: 'var(--muted)' }}>(cached after first visit)</span></div>
        <div><span style={{ color: '#3b82f6' }}>TCP handshake:</span>                 <span style={{ color: 'var(--text)' }}>~50ms</span> <span style={{ color: 'var(--muted)' }}>(one RTT)</span></div>
        <div><span style={{ color: '#8b5cf6' }}>TLS 1.3 handshake:</span>             <span style={{ color: 'var(--text)' }}>~50ms</span> <span style={{ color: 'var(--muted)' }}>(one RTT)</span></div>
        <div><span style={{ color: N }}>HTTP request + first byte:</span>     <span style={{ color: 'var(--text)' }}>~50ms</span> <span style={{ color: 'var(--muted)' }}>(one RTT for server processing)</span></div>
        <div style={{ borderTop: '1px solid var(--border)', marginTop: 8, paddingTop: 8 }}><span style={{ color: '#ef4444', fontWeight: 700 }}>Time to first byte (TTFB):</span> <span style={{ color: 'var(--text)', fontWeight: 700 }}>~170ms</span> <span style={{ color: 'var(--muted)' }}>(before any rendering begins)</span></div>
      </div>

      <P>This is why CDNs (Content Delivery Networks) like Cloudflare, AWS CloudFront, and Fastly exist. Instead of every user's request travelling to a single origin server, CDNs cache content at hundreds of edge locations worldwide. A user in Tokyo hits a Cloudflare edge in Tokyo (5ms) instead of an origin server in Virginia (150ms). The 145ms difference in TTFB translates directly to a faster page load and higher user engagement — Google's research shows a 100ms improvement in load time increases conversion rates by 1%.</P>

      <HR />

      {/* ── PART 08 ── */}
      <Part n="08" title="A Day in the Life — Network Engineering at a US Tech Company" />

      <P>You are a Network Engineer at Cloudflare, one month after starting. Here is an actual day — not a theoretical one — showing how everything you are learning applies in production.</P>

      <TimeBlock time="7:45 AM" label="PagerDuty alert fires before your alarm">
        A high-priority alert: latency to one of Cloudflare's European PoPs has increased from 12ms to 340ms. This affects every website that Cloudflare serves for users in that region. You open the NOC (Network Operations Center) dashboard on your laptop. The monitoring system shows packet loss spiking on a specific BGP peering link — a physical fiber connection between Cloudflare and a Tier 1 ISP.
      </TimeBlock>

      <TimeBlock time="8:00 AM" label="Diagnosis — layer by layer">
        You SSH into the edge router at the affected PoP. You run <code style={{ fontFamily: 'var(--font-mono)', fontSize: 11, background: 'var(--surface)', padding: '1px 5px', borderRadius: 3 }}>ping</code> to the peer — getting 30% packet loss. You run <code style={{ fontFamily: 'var(--font-mono)', fontSize: 11, background: 'var(--surface)', padding: '1px 5px', borderRadius: 3 }}>traceroute</code> — loss starts at hop 3, which is the upstream provider's router. You run <code style={{ fontFamily: 'var(--font-mono)', fontSize: 11, background: 'var(--surface)', padding: '1px 5px', borderRadius: 3 }}>show interface counters</code> on the router — input errors spiking, suggesting Layer 1 or Layer 2 physical issue. You check the fiber transceiver's optical receive power — it is reading -14 dBm where it should be -3 to -8 dBm. The fiber is degraded, probably a dirty connector.
      </TimeBlock>

      <TimeBlock time="8:20 AM" label="Mitigation — before the fix">
        While the on-site technician is dispatched to clean/replace the fiber connector (ETA 45 minutes), you use BGP to shift traffic away from the degraded link. You increase the BGP local preference on an alternate path so traffic automatically reroutes. Latency goes from 340ms back to 18ms (slightly higher than normal due to the longer alternate path). The user-facing impact ends. You post in the incident Slack channel: "Traffic rerouted via alternate path. Root cause: fiber transceiver degradation. Hardware fix ETA 45 min."
      </TimeBlock>

      <TimeBlock time="9:30 AM" label="Recovery and post-incident review">
        The technician cleans the fiber connector. Optical power returns to -5 dBm. You shift BGP traffic back to the primary path. Latency returns to 12ms. You write the incident review: timeline, root cause, impact (800,000 requests routed suboptimally for ~35 minutes, no user-facing errors), and the follow-up action (install optical power monitoring alerts for all peering links so degradation is detected before it causes user impact rather than after).
      </TimeBlock>

      <TimeBlock time="10:30 AM" label="Capacity planning project">
        Your longer-term project: the Amsterdam PoP is approaching 70% utilization on its uplink. When utilization exceeds 70%, queuing delay starts affecting latency. You run NetFlow analysis to understand traffic composition — 40% is video streaming, 30% API traffic, 20% cached static assets, 10% DNS. You model three growth scenarios (10%, 20%, 30% traffic growth) to determine when you need to upgrade from 100G to 400G uplinks, and write the capacity request with financial justification.
      </TimeBlock>

      <TimeBlock time="2:00 PM" label="Security incident — DDoS">
        An alert fires: one of Cloudflare's customers (a mid-size e-commerce site) is receiving a 380 Gbps UDP amplification attack — attackers are sending spoofed UDP packets to misconfigured NTP servers worldwide, which amplify the traffic 100x and reflect it at the target. You engage Cloudflare's DDoS mitigation — BGP blackholing of the attack source prefixes, rate limiting of UDP on port 123 (NTP) at the edge, and anycast absorption distributing the attack across all 296 PoPs so no single location is overwhelmed. Attack mitigated in under 3 minutes.
      </TimeBlock>

      <ProTip>
        The most important skill a network engineer develops is not memorising protocol details — it is the debugging methodology. Start at Layer 1 (is the cable plugged in, is the transceiver getting light), work up through Layer 2 (are Ethernet frames transmitting), Layer 3 (is the IP routing correct), Layer 4 (is TCP establishing correctly), to Layer 7 (is the application responding). This OSI-layer-by-layer approach systematically eliminates entire categories of problems at each step and is why Module 40 (Network Troubleshooting Methodology) is a dedicated module.
      </ProTip>

      <HR />

      {/* ── PART 09 ── */}
      <Part n="09" title="Interview Prep — 5 Questions With Complete Answers" />

      <IQ q="What is a computer network and what is a packet?">
        <p style={{ margin: '0 0 14px' }}>A computer network is a system of two or more devices that communicate by exchanging packets over physical or wireless transmission media, governed by protocols — agreed-upon rules specifying exactly how data is formatted, addressed, transmitted, received, and acknowledged.</p>
        <p style={{ margin: '0 0 14px' }}>A packet is a discrete chunk of data with a specific structure: a header containing addressing and control information (source address, destination address, sequence number, protocol type, TTL) and a payload containing the actual data being transferred. Data is broken into packets rather than sent as a continuous stream for two key reasons: first, multiple devices can share the same transmission medium by interleaving packets (statistical multiplexing); second, if one packet is lost, only that packet needs retransmission, not the entire transfer.</p>
        <p style={{ margin: 0 }}>A typical Ethernet packet (technically a frame at Layer 2) has a maximum size of 1,518 bytes — 14 bytes Ethernet header, 20 bytes IP header, 20 bytes TCP header, up to 1,460 bytes of payload, and a 4-byte checksum. Every network communication, from a single DNS query to a Netflix video stream, is composed of packets following this structure.</p>
      </IQ>

      <IQ q="What is the difference between bandwidth, latency, and throughput?">
        <p style={{ margin: '0 0 14px' }}>Bandwidth is the maximum theoretical data rate of a link — the ceiling. A 1 Gbps Ethernet link can carry at most 1 billion bits per second. It is a property of the physical medium and interface, not the actual speed you will achieve in practice.</p>
        <p style={{ margin: '0 0 14px' }}>Latency is the time for a packet to travel from source to destination — typically measured in milliseconds. It is the sum of propagation delay (speed of light through the medium), transmission delay (time to push bits onto the wire), processing delay (routing table lookups at each hop), and queuing delay (waiting in router buffers). Latency is the critical metric for real-time applications — a 300ms latency VoIP call is unusable regardless of how much bandwidth is available.</p>
        <p style={{ margin: 0 }}>Throughput is the actual data rate achieved in practice, always less than bandwidth due to protocol overhead, TCP slow start, packet loss and retransmissions, and other inefficiencies. The relationship is: throughput ≤ bandwidth. A common confusion: users with gigabit internet who see "only" 900 Mbps in speed tests are seeing 90% throughput efficiency, which is excellent. Users who see 50 Mbps on a gigabit line have a different problem — usually wireless, VPN overhead, or a congested last mile.</p>
      </IQ>

      <IQ q="What is a protocol? Give three examples and explain what each one does.">
        <p style={{ margin: '0 0 14px' }}>A network protocol is a formal specification defining the exact rules for communication between network devices — including message format, addressing, state management, error handling, and flow control. Protocols are published as RFCs (Requests for Comments) by the IETF and implemented independently by different vendors; because they follow the same specification, they interoperate perfectly.</p>
        <p style={{ margin: '0 0 14px' }}>TCP (Transmission Control Protocol — RFC 793) operates at the Transport layer and provides reliable, ordered delivery of a byte stream between two endpoints. Before any data flows, TCP performs a 3-way handshake (SYN/SYN-ACK/ACK). During data transfer, every packet is numbered with a sequence number, and the receiver acknowledges what it has received. Lost packets are retransmitted. A sliding window controls how much unacknowledged data can be in flight. TCP is used by HTTP, HTTPS, SSH, SMTP — anything that needs reliable delivery.</p>
        <p style={{ margin: '0 0 14px' }}>IP (Internet Protocol — RFC 791) operates at the Network layer and handles addressing and routing. Every packet carries a source IP address and destination IP address in its header. Routers read the destination IP and use routing tables to determine where to forward the packet next. IP is connectionless and provides no reliability guarantees — it makes a best-effort attempt to deliver each packet. Reliability is provided by TCP above IP.</p>
        <p style={{ margin: 0 }}>DNS (Domain Name System — RFC 1034/1035) operates at the Application layer and translates human-readable domain names into IP addresses. When your browser needs to connect to google.com, it sends a DNS query (typically UDP on port 53) to a resolver, which recursively queries the DNS hierarchy — root servers, TLD servers, and authoritative servers — to return the IP address. Without DNS, every internet connection would require humans to memorise IP addresses.</p>
      </IQ>

      <IQ q="What is the difference between a router, a switch, and an access point?">
        <p style={{ margin: '0 0 14px' }}>A switch operates at Layer 2 (Data Link layer) and forwards Ethernet frames within a single network based on MAC addresses. When a frame arrives, the switch reads the destination MAC address, looks up its CAM (Content Addressable Memory) table to find which port that MAC is connected to, and forwards the frame only to that port. If the MAC is unknown, it floods the frame to all ports. Switches create separate collision domains per port and enable full-duplex communication. They connect devices within the same network — the same IP subnet.</p>
        <p style={{ margin: '0 0 14px' }}>A router operates at Layer 3 (Network layer) and forwards IP packets between different networks. It reads the destination IP address, consults its routing table to find the best next hop, and forwards accordingly. Routers connect separate networks — your home LAN (192.168.1.0/24) to your ISP's WAN. They perform NAT (Network Address Translation) to allow many private IP addresses to share one public IP. Routers are the devices that make the internet function — every packet crosses multiple routers on its journey.</p>
        <p style={{ margin: 0 }}>An access point (AP) operates at Layer 2 and bridges wireless clients to a wired network. It creates a wireless LAN by broadcasting an SSID, authenticating clients (via WPA2/WPA3), and translating between 802.11 wireless frames and Ethernet frames. An AP is not a router — it connects wireless clients to an existing network segment. Most consumer devices labelled "router" are actually a router + 4-port switch + access point in a single box: three different functional roles combined.</p>
      </IQ>

      <IQ q="Walk me through what happens when you type google.com in a browser.">
        <p style={{ margin: '0 0 14px' }}>First, DNS resolution. The browser checks its DNS cache. If no hit, the OS checks its cache and the hosts file. If still no result, a DNS query is sent to the configured resolver (often the gateway router, which forwards to the ISP's resolver or a public resolver like 8.8.8.8). The resolver performs recursive resolution: root servers direct to .com servers, which direct to google.com's authoritative nameservers, which return 142.250.x.x. This takes 5–50ms on first query, near-zero on subsequent requests due to caching.</p>
        <p style={{ margin: '0 0 14px' }}>Second, TCP connection. The browser opens a TCP connection to port 443 at the resolved IP using the 3-way handshake: SYN from client, SYN-ACK from server, ACK from client. This costs one round-trip time — typically 15–100ms depending on geographic distance.</p>
        <p style={{ margin: '0 0 14px' }}>Third, TLS handshake. Since HTTPS is being used, a TLS 1.3 handshake establishes encryption in one additional round-trip. The server presents its certificate, the browser verifies it against its trusted CA store, and both derive session keys via ECDHE key exchange.</p>
        <p style={{ margin: '0 0 14px' }}>Fourth, HTTP request. The browser sends a GET / HTTP/1.1 request with headers including Host: google.com. Google's servers — likely a load balancer fronting thousands of web servers — process the request and return an HTTP 302 redirect to www.google.com, repeating the process for the redirected URL.</p>
        <p style={{ margin: 0 }}>At the network layer, each IP packet crosses 10–20 routers between your home and Google. Your home router performs NAT, replacing your private IP with your public IP. Each router makes an independent forwarding decision based on its routing table, constructed from BGP (Border Gateway Protocol) advertisements from neighboring ASes. Google's BGP anycast means your DNS query and HTTP request likely hit different Google data centers optimized for different functions — CDN edges for static content, search backends for query processing.</p>
      </IQ>

      <HR />

      {/* ── PART 10 ── */}
      <Part n="10" title="Common Misconceptions — What Beginners Get Wrong" />

      <P>These are the misconceptions that confuse beginners and cause incorrect answers in interviews and incorrect diagnoses in troubleshooting:</P>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 12, margin: '12px 0 32px' }}>
        {[
          {
            wrong: '"More bandwidth always means faster internet"',
            right: 'Bandwidth is only one of four performance factors. If latency is 200ms (common with cheap ISPs or poor routing), adding bandwidth does nothing for interactive applications. A 1 Gbps connection with 200ms latency will load pages slower for real users than a 100 Mbps connection with 20ms latency. Fix latency first.',
          },
          {
            wrong: '"Wi-Fi speed is the network speed"',
            right: 'Wi-Fi speed (the 802.11 link rate) is the speed between your device and the access point — typically 300 Mbps to 2.4 Gbps. Your internet speed is the bandwidth from your router to your ISP — often 100 Mbps to 1 Gbps. The actual ceiling is the minimum of all links in the path. A 2.4 Gbps Wi-Fi 6 link connected to a 100 Mbps cable modem gives 100 Mbps to the internet.',
          },
          {
            wrong: '"A firewall stops attacks"',
            right: 'A firewall controls which traffic is allowed to reach your systems — it is a traffic filter, not an attack stopper. A firewall that allows HTTPS traffic (port 443) cannot distinguish a legitimate request from an application-layer attack (like SQL injection or XSS) inside that HTTPS request. Firewalls stop unauthorized connections; they do not analyze the content of authorized ones. That requires a WAF or IDS/IPS.',
          },
          {
            wrong: '"The router assigns IP addresses"',
            right: 'Routers route packets between networks — they do not inherently assign IP addresses. IP address assignment is done by DHCP (Dynamic Host Configuration Protocol), which is a separate service. On a home network, the DHCP server usually runs on the router as a combined function, but in enterprise networks, DHCP servers are dedicated systems completely separate from the routers.',
          },
          {
            wrong: '"Packets take the same path every time"',
            right: 'IP routing is stateless and per-packet. Each packet in a TCP connection can take a completely different path through the internet depending on current routing table states. Two consecutive TCP segments can travel through different routers and arrive out of order (TCP reorders them). This is also why traceroute results can vary between runs — routing decisions change dynamically as BGP updates propagate.',
          },
          {
            wrong: '"Private IP addresses are more secure than public ones"',
            right: 'Private IP addresses (RFC 1918: 10.x.x.x, 172.16-31.x.x, 192.168.x.x) are not routable on the public internet — they are isolated from direct external access by NAT. But this is not the same as security. An attacker who gains access to your internal network can attack any private IP address directly. Most breaches target internal network systems after initial access, exploiting the false assumption that "it\'s on the internal network so it\'s safe."',
          },
        ].map((item, i) => (
          <div key={i} style={{ border: '1px solid var(--border)', borderRadius: 8, overflow: 'hidden' }}>
            <div style={{ background: 'rgba(239,68,68,0.08)', borderBottom: '1px solid var(--border)', padding: '10px 16px', fontSize: 13, color: '#ef4444', fontFamily: 'var(--font-mono)' }}>
              ✗ &quot;{item.wrong.replace(/['"]/g, '')}&quot;
            </div>
            <div style={{ padding: '12px 16px', fontSize: 13, color: 'var(--text)', lineHeight: 1.75 }}>
              <span style={{ color: N, fontWeight: 700 }}>✓ Reality: </span>{item.right}
            </div>
          </div>
        ))}
      </div>

      <HR />

      <KeyTakeaways items={[
        'A network is a system of devices that communicate by exchanging packets over physical or wireless media, governed by protocols — agreed-upon rules specifying format, addressing, error handling, and flow control.',
        'A packet has a header (addressing and control metadata) and a payload (the actual data). Data is packetised because multiple devices can share the same medium by interleaving packets, and lost packets can be individually retransmitted.',
        'Protocols are formal IETF specifications that define exactly how two devices communicate. The internet uses a layered protocol stack — Physical, Data Link, Network, Transport, Application — where each layer serves the one above it and is served by the one below.',
        'Bandwidth is the ceiling (maximum theoretical rate). Throughput is what you actually achieve. Latency is the one-way delay. Jitter is variation in latency. Real-time applications (VoIP, gaming, video calls) need low latency and low jitter — more bandwidth does not fix high latency.',
        'The journey of one HTTP request involves DNS resolution (20–50ms), TCP handshake (one RTT), TLS handshake (one RTT in TLS 1.3), HTTP request processing, and response delivery — typically 100–200ms total before the first byte renders for a US server.',
        'The four types of latency: propagation delay (speed of light), transmission delay (time to push bits onto wire), processing delay (routing decisions at each hop), queuing delay (waiting in router buffers). Queuing delay is the most variable and is the cause of most latency spikes under load.',
        'Nodes are all network devices. Hosts are nodes that run applications. Clients initiate requests. Servers listen for and respond to requests. Routers forward packets between networks (Layer 3). Switches forward frames within a network (Layer 2). Access Points bridge wireless clients to wired networks (Layer 2).',
        'MTU (Maximum Transmission Unit) for Ethernet is 1,500 bytes. Packets larger than MTU must be fragmented. VPN tunnels reduce effective MTU because they add their own headers — this causes large-packet failures that are a common real-world troubleshooting problem.',
        'CDNs (Cloudflare, AWS CloudFront, Fastly) cache content at hundreds of edge locations worldwide so that users hit a nearby PoP (5–20ms) instead of an origin server across the world (100–200ms). The latency difference directly improves page load time and user engagement.',
        'The most common misconceptions: more bandwidth always helps (no — latency matters more for interactive apps), firewalls stop attacks (no — they filter connections, not content), private IPs are secure (no — internal networks are regularly exploited after initial access), packets take the same path (no — IP routing is stateless and per-packet).',
      ]} />

      {/* ── Next ── */}
      <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 10, padding: '24px', marginTop: 40 }}>
        <p style={{ fontSize: 10, color: 'var(--muted)', letterSpacing: '.12em', textTransform: 'uppercase', fontFamily: 'var(--font-mono)', fontWeight: 700, margin: '0 0 10px' }}>
          What comes next
        </p>
        <p style={{ fontSize: 15, color: 'var(--text)', lineHeight: 1.85, margin: '0 0 20px' }}>
          In <strong>Module 02</strong>, we go from abstract to concrete — you see every network topology (Bus, Star, Ring, Mesh, Hybrid) as interactive 3D diagrams, learn exactly how each one fails, and understand why every enterprise network today is a hybrid of Star at the access layer, Mesh at the core, and why the internet itself is a full mesh of autonomous systems connected by BGP.
        </p>
        <Link href="/learn/networking/network-types-topologies" style={{ background: N, color: '#fff', padding: '11px 24px', borderRadius: 7, fontWeight: 700, fontSize: 13, textDecoration: 'none', display: 'inline-block' }}>
          Module 02 → Network Types and Topologies
        </Link>
      </div>

    </LearnLayout>
  )
}
