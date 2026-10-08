import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { NETWORKING_CURRICULUM } from '@/data/networking-curriculum'
import { WithLessonNav } from '@/components/content/WithLessonNav'
import { NetworkingLesson } from '@/components/networking/NetworkingLesson'


const moduleMeta: Record<string, { title: string; description: string }> = {
  'what-is-a-network':        { title: 'What is a Network?',                                   description: 'Packets, nodes, protocols — and what actually happens when you press Enter in a browser.' },
  'network-types-topologies': { title: 'Network Types and Topologies',                          description: 'LAN, WAN, MAN, Bus, Star, Ring, Mesh — and why physical layout determines what can fail.' },
  'osi-model':                { title: 'The OSI Model — All 7 Layers',                          description: 'The universal framework every engineer uses to reason about networking problems.' },
  'tcp-ip-model':             { title: 'The TCP/IP Model — How the Internet Works',             description: 'The four-layer model that actually runs the internet — full packet walk-through.' },
  'data-transmission':        { title: 'Data Transmission — Signals, Bandwidth, and Latency',   description: 'How bits travel as electrical signals, light, and radio waves.' },
  'binary-and-hex':           { title: 'Binary and Hexadecimal for Network Engineers',           description: 'The two number systems behind every IP address, MAC address, and packet capture.' },
  'cables-and-connectors':    { title: 'Cables, Connectors, and Physical Media',                description: 'Cat5e vs Cat6A vs fiber — choosing the right physical layer for your network.' },
  'ethernet-and-switching':   { title: 'Ethernet, Switches, and MAC Addresses',                 description: 'How devices on the same network find and talk to each other at Layer 2.' },
  'arp':                      { title: 'ARP — How IP Maps to MAC',                              description: 'The protocol bridging Layer 3 to Layer 2 — and how attackers exploit it.' },
  'vlans':                    { title: 'VLANs — Network Segmentation Without Hardware',          description: '802.1Q tagging, trunk ports, inter-VLAN routing, and VLAN hopping attacks.' },
  'spanning-tree':            { title: 'Spanning Tree Protocol — Preventing Broadcast Storms',   description: 'How STP stops switch loops from taking down your entire network.' },
  'wireless-networking':      { title: 'Wi-Fi — 802.11 Standards, WPA2, WPA3',                  description: '2.4GHz vs 5GHz, channel overlap, WPA3-SAE, deauth attacks, evil twin APs.' },
  'ip-addressing':            { title: 'IPv4 Addressing — Complete Guide',                       description: 'Public vs private, RFC 1918, CIDR — everything about the 32-bit address.' },
  'subnetting':               { title: 'Subnetting — Divide Any Network with Confidence',        description: 'Subnet masks, network ID, host range, broadcast — the skill every interview tests.' },
  'ipv6':                     { title: 'IPv6 — The Protocol That Replaces IPv4',                 description: '128-bit addressing, SLAAC, EUI-64, dual stack — the transition happening now.' },
  'routing-fundamentals':     { title: 'Routing — How Packets Find Their Destination',           description: 'Routing tables, default gateway, longest prefix match, TTL, hop-by-hop decisions.' },
  'dynamic-routing':          { title: 'Dynamic Routing — OSPF, EIGRP, BGP',                    description: 'How routers learn paths automatically — link-state, distance-vector, AS numbers.' },
  'nat-and-dhcp':             { title: 'NAT and DHCP — How Private Networks Work',              description: 'How billions of private IPs share the internet via port mapping and DHCP.' },
  'icmp':                     { title: 'ICMP — Ping, Traceroute, and Error Messages',            description: 'The control plane of IP — ping, traceroute TTL trick, ICMP tunneling.' },
  'tcp-deep-dive':            { title: 'TCP — The Protocol That Guarantees Delivery',            description: '3-way handshake, sequence numbers, flow control, congestion control byte by byte.' },
  'udp':                      { title: 'UDP — When Speed Matters More Than Reliability',         description: 'DNS, video, gaming, QUIC — why connectionless is the right choice.' },
  'ports-and-sockets':        { title: 'Ports and Sockets — Where Applications Live',            description: 'Well-known ports, ephemeral ports, socket pairs, how the OS routes packets.' },
  'tls-ssl':                  { title: 'TLS — How Encryption Protects Every HTTPS Request',      description: 'Certificate chain, handshake, cipher suites, HSTS, TLS 1.3 improvements.' },
  'quic-http3':               { title: 'QUIC and HTTP/3 — The Future of Web Transport',          description: '0-RTT, stream multiplexing, connection migration — how Google replaced TCP.' },
  'dns':                      { title: 'DNS — How Domain Names Become IP Addresses',             description: 'Recursive resolution step by step, record types, cache poisoning, DNS over HTTPS.' },
  'http-and-https':           { title: 'HTTP and HTTPS — The Protocol Powering the Web',         description: 'Request-response, all headers, methods, status codes, HTTP/2 multiplexing.' },
  'email-protocols':          { title: 'Email Protocols — SMTP, IMAP, SPF, DKIM, DMARC',        description: 'How email travels from sender to inbox — and the records that stop spoofing.' },
  'ssh':                      { title: 'SSH — Secure Shell Complete Guide',                      description: 'Key exchange, agent forwarding, tunneling, ProxyJump, hardening sshd_config.' },
  'ftp-and-sftp':             { title: 'FTP, SFTP, and Secure File Transfer',                   description: 'Active vs passive mode, why FTP is dangerous, SFTP vs FTPS vs SCP.' },
  'dhcp-deep-dive':           { title: 'DHCP Deep Dive — Address Assignment Under the Hood',     description: 'DORA byte by byte, relay agents, rogue DHCP servers, starvation attacks.' },
  'snmp-and-syslog':          { title: 'SNMP and Syslog — How Networks Are Monitored',           description: 'MIB, OID, traps, community strings — and why SNMPv1 is still a disaster.' },
  'ntp':                      { title: 'NTP — Why Clock Synchronisation Is a Security Issue',    description: 'Stratum levels, clock drift, why wrong clocks break TLS and Kerberos.' },
  'network-attacks':          { title: 'Network Attacks — ARP Poisoning, MITM, Sniffing',        description: 'Every Layer 2/3 attack — how they work in Wireshark, how to defend.' },
  'firewalls-and-acls':       { title: 'Firewalls, ACLs, and Stateful Inspection',               description: 'Stateless vs stateful vs NGFW, ACL rule order, DMZ design, bypass techniques.' },
  'ids-and-ips':              { title: 'IDS and IPS — Detecting Attacks on the Wire',            description: 'Signature vs anomaly, Snort/Suricata rules, inline vs passive, evasion.' },
}

const LIVE_SLUGS = new Set(
  NETWORKING_CURRICULUM.flatMap(section => section.modules)
    .filter(module => module.status === 'live')
    .map(module => module.slug),
)

export const dynamicParams = false

export async function generateStaticParams() {
  return Array.from(LIVE_SLUGS).map(topic => ({ topic }))
}

export async function generateMetadata({ params }: { params: { topic: string } }): Promise<Metadata> {
  const meta = moduleMeta[params.topic]
  if (!meta) return { title: 'Networking | Chaduvuko' }
  return {
    title: `${meta.title} | Networking Fundamentals — Chaduvuko`,
    description: meta.description,
  }
}

export default function NetworkingTopicPage({ params }: { params: { topic: string } }) {
  if (!LIVE_SLUGS.has(params.topic)) notFound()
  return (
    <WithLessonNav href={`/learn/networking/${params.topic}`}>
      <NetworkingLesson slug={params.topic} />
    </WithLessonNav>
  )
}
