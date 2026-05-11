import { notFound } from 'next/navigation'
import type { Metadata } from 'next'

const moduleMap: Record<string, () => Promise<{ default: React.ComponentType }>> = {
  'what-is-a-network':        () => import('@/content/networking/what-is-a-network'),
  'network-types-topologies': () => import('@/content/networking/network-types-topologies'),
  'osi-model':                () => import('@/content/networking/osi-model'),
  'tcp-ip-model':             () => import('@/content/networking/tcp-ip-model'),
  'data-transmission':        () => import('@/content/networking/data-transmission'),
  'binary-and-hex':           () => import('@/content/networking/binary-and-hex'),
  'cables-and-connectors':    () => import('@/content/networking/cables-and-connectors'),
  'ethernet-and-switching':   () => import('@/content/networking/ethernet-and-switching'),
  'arp':                      () => import('@/content/networking/arp'),
  'vlans':                    () => import('@/content/networking/vlans'),
  'spanning-tree':            () => import('@/content/networking/spanning-tree'),
  'wireless-networking':      () => import('@/content/networking/wireless-networking'),
  'ip-addressing':            () => import('@/content/networking/ip-addressing'),
  'subnetting':               () => import('@/content/networking/subnetting'),
  'ipv6':                     () => import('@/content/networking/ipv6'),
  'routing-fundamentals':     () => import('@/content/networking/routing-fundamentals'),
  'dynamic-routing':          () => import('@/content/networking/dynamic-routing'),
  'nat-and-dhcp':             () => import('@/content/networking/nat-and-dhcp'),
  'icmp':                     () => import('@/content/networking/icmp'),
  'tcp-deep-dive':            () => import('@/content/networking/tcp-deep-dive'),
  'udp':                      () => import('@/content/networking/udp'),
  'ports-and-sockets':        () => import('@/content/networking/ports-and-sockets'),
  'tls-ssl':                  () => import('@/content/networking/tls-ssl'),
  'quic-http3':               () => import('@/content/networking/quic-http3'),
  'dns':                      () => import('@/content/networking/dns'),
  'http-and-https':           () => import('@/content/networking/http-and-https'),
  'email-protocols':          () => import('@/content/networking/email-protocols'),
  'ssh':                      () => import('@/content/networking/ssh'),
  'ftp-and-sftp':             () => import('@/content/networking/ftp-and-sftp'),
  'dhcp-deep-dive':           () => import('@/content/networking/dhcp-deep-dive'),
  'snmp-and-syslog':          () => import('@/content/networking/snmp-and-syslog'),
  'ntp':                      () => import('@/content/networking/ntp'),
  'network-attacks':          () => import('@/content/networking/network-attacks'),
  'firewalls-and-acls':       () => import('@/content/networking/firewalls-and-acls'),
  'ids-and-ips':              () => import('@/content/networking/ids-and-ips'),
  'vpns-and-tunneling':       () => import('@/content/networking/vpns-and-tunneling'),
  'wireless-security':        () => import('@/content/networking/wireless-security'),
  'zero-trust-networking':    () => import('@/content/networking/zero-trust-networking'),
  'ddos':                     () => import('@/content/networking/ddos'),
  'network-troubleshooting':  () => import('@/content/networking/network-troubleshooting'),
  'wireshark':                () => import('@/content/networking/wireshark'),
  'tcpdump':                  () => import('@/content/networking/tcpdump'),
  'nmap':                     () => import('@/content/networking/nmap'),
  'network-monitoring':       () => import('@/content/networking/network-monitoring'),
}

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
  'vpns-and-tunneling':       { title: 'VPNs and Tunneling — IPSec, SSL, WireGuard',             description: 'How VPNs encrypt traffic — IKEv2, OpenVPN, WireGuard compared byte by byte.' },
  'wireless-security':        { title: 'Wireless Security — WPA2/WPA3 Attacks',                  description: 'KRACK, PMKID, deauth, evil twin — complete wireless attack surface.' },
  'zero-trust-networking':    { title: 'Zero Trust Networking — Never Trust, Always Verify',     description: 'BeyondCorp, microsegmentation, ZTNA vs VPN — the architecture replacing perimeters.' },
  'ddos':                     { title: 'DDoS — How It Works and How to Defend Against It',       description: 'Volumetric, protocol, application layer — Cloudflare, AWS Shield, anycast.' },
  'network-troubleshooting':  { title: 'Network Troubleshooting Methodology',                    description: 'OSI-layer-by-layer diagnosis with every command you run at each step.' },
  'wireshark':                { title: 'Wireshark — Packet Analysis Complete Guide',             description: 'Capture filters, display filters, following streams, decrypting TLS.' },
  'tcpdump':                  { title: 'tcpdump — Command-Line Packet Capture',                  description: 'BPF filter syntax, writing pcaps, piping to Wireshark.' },
  'nmap':                     { title: 'Nmap — Network Scanning and Host Discovery',             description: 'SYN scan, OS fingerprinting, NSE scripts, timing, evading firewalls.' },
  'network-monitoring':       { title: 'Network Monitoring — NetFlow, SNMP Polling, Dashboards', description: 'How enterprise networks are observed at scale — NetFlow, Grafana, alerting.' },
}

export async function generateStaticParams() {
  return Object.keys(moduleMap).map(topic => ({ topic }))
}

export async function generateMetadata({ params }: { params: { topic: string } }): Promise<Metadata> {
  const meta = moduleMeta[params.topic]
  if (!meta) return { title: 'Networking | Chaduvuko' }
  return {
    title: `${meta.title} | Networking Fundamentals — Chaduvuko`,
    description: meta.description,
  }
}

export default async function NetworkingTopicPage({ params }: { params: { topic: string } }) {
  const loader = moduleMap[params.topic]
  if (!loader) notFound()
  const { default: Content } = await loader()
  return <Content />
}
