export type ModuleStatus = 'live' | 'soon'

export interface NetModule {
  id: number
  slug: string
  title: string
  description: string
  tags: string[]
  status: ModuleStatus
  readTime: string
}

export interface NetSection {
  id: number
  title: string
  color: string
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced'
  modules: NetModule[]
}

export const NETWORKING_CURRICULUM: NetSection[] = [
  {
    id: 1, title: 'How Networks Work', color: '#10b981', difficulty: 'Beginner',
    modules: [
      { id: 1,  slug: 'what-is-a-network',        title: 'What is a Network?',                                  description: 'Packets, nodes, protocols — and what actually happens when you press Enter in a browser',           tags: ['Packets','Nodes','Clients & servers','Protocols','Why networks exist'],                             status: 'live', readTime: '18–24 min' },
      { id: 2,  slug: 'network-types-topologies',  title: 'Network Types and Topologies',                        description: 'LAN, WAN, MAN — and why the physical layout of your network determines what can go wrong',        tags: ['LAN','WAN','MAN','Star','Mesh','Bus','Ring','Hybrid'],                                               status: 'live', readTime: '20–26 min' },
      { id: 3,  slug: 'osi-model',                 title: 'The OSI Model — All 7 Layers',                        description: 'The universal framework every engineer uses to reason about networking problems',                  tags: ['OSI','Physical','Data Link','Network','Transport','Session','Presentation','Application'],           status: 'live', readTime: '22–30 min' },
      { id: 4,  slug: 'tcp-ip-model',              title: 'The TCP/IP Model — How the Internet Works',           description: 'The four-layer model that actually runs the internet — full packet walk-through from click to server', tags: ['TCP/IP','Link layer','Internet layer','Transport layer','Application layer','Encapsulation'],         status: 'live', readTime: '20–26 min' },
      { id: 5,  slug: 'data-transmission',         title: 'Data Transmission — Signals, Bandwidth, and Latency', description: 'How bits travel as electrical signals, light, and radio waves — and why latency kills more apps than bandwidth', tags: ['Bandwidth','Latency','Throughput','Jitter','Analog vs digital','Encoding','Noise'],               status: 'live', readTime: '16–22 min' },
      { id: 6,  slug: 'binary-and-hex',            title: 'Binary and Hexadecimal for Network Engineers',         description: 'The two number systems that appear in every IP address, MAC address, and packet capture',        tags: ['Binary','Hexadecimal','Decimal conversion','Bits & bytes','Nibbles','Why networking uses hex'],      status: 'live', readTime: '14–20 min' },
    ],
  },
  {
    id: 2, title: 'Physical and Data Link Layer', color: '#3b82f6', difficulty: 'Beginner',
    modules: [
      { id: 7,  slug: 'cables-and-connectors',     title: 'Cables, Connectors, and Physical Media',              description: 'Cat5e vs Cat6A vs fiber — and why the cable you choose determines your ceiling',                  tags: ['Cat5e','Cat6','Cat6A','Fiber','Coaxial','RJ-45','SFP','PoE','TIA-568'],                              status: 'live', readTime: '16–22 min' },
      { id: 8,  slug: 'ethernet-and-switching',    title: 'Ethernet, Switches, and MAC Addresses',               description: 'How devices on the same network find and talk to each other — frames, CAM tables, full duplex', tags: ['Ethernet','Frames','MAC address','Switch','CAM table','CSMA/CD','Full duplex','Collision domain'],   status: 'live', readTime: '20–26 min' },
      { id: 9,  slug: 'arp',                       title: 'ARP — How IP Maps to MAC',                            description: 'The protocol that bridges Layer 3 addresses to Layer 2 — and how attackers exploit it',          tags: ['ARP','ARP cache','ARP request','ARP reply','Gratuitous ARP','ARP spoofing','ARP poisoning'],         status: 'live', readTime: '16–22 min' },
      { id: 10, slug: 'vlans',                     title: 'VLANs — Network Segmentation Without Hardware',        description: '802.1Q tagging, trunk ports, inter-VLAN routing — and why VLANs are the first line of internal defence', tags: ['VLAN','802.1Q','Trunk','Access port','Native VLAN','Inter-VLAN routing','VLAN hopping'],            status: 'live', readTime: '18–24 min' },
      { id: 11, slug: 'spanning-tree',             title: 'Spanning Tree Protocol — Preventing Broadcast Storms', description: 'How STP stops switch loops from bringing down your entire network in under 1 second',           tags: ['STP','RSTP','Root bridge','Port states','Broadcast storm','BPDU','Convergence','PVST'],              status: 'live', readTime: '18–24 min' },
      { id: 12, slug: 'wireless-networking',       title: 'Wi-Fi — 802.11 Standards, WPA2, WPA3',                description: '2.4GHz vs 5GHz vs 6GHz, channel overlap, WPA3-SAE, and every way wireless gets attacked',       tags: ['802.11ac','Wi-Fi 6','WPA3','SSID','Channel','CSMA/CA','Evil twin','Deauth','PMKID'],                 status: 'live', readTime: '20–28 min' },
    ],
  },
  {
    id: 3, title: 'The IP Layer — Addressing and Routing', color: '#8b5cf6', difficulty: 'Intermediate',
    modules: [
      { id: 13, slug: 'ip-addressing',             title: 'IPv4 Addressing — Complete Guide',                    description: 'Public vs private, RFC 1918, CIDR notation, address anatomy — everything about the 32-bit address that finds every device', tags: ['IPv4','32-bit','Dotted decimal','Public IP','Private IP','RFC 1918','CIDR','Address classes'],        status: 'live', readTime: '18–26 min' },
      { id: 14, slug: 'subnetting',                title: 'Subnetting — Divide Any Network with Confidence',     description: 'Subnet masks, network ID, host range, broadcast — the skill every network interview tests',     tags: ['Subnet mask','Network ID','Host range','Broadcast','CIDR','/24','/16','/30','VLSM','FLSM'],         status: 'live', readTime: '24–32 min' },
      { id: 15, slug: 'ipv6',                      title: 'IPv6 — The Protocol That Replaces IPv4',              description: '128-bit addressing, EUI-64, SLAAC, link-local, dual stack — and why you will manage both for the next decade', tags: ['IPv6','128-bit','EUI-64','SLAAC','Link-local','Global unicast','Dual stack','NDP','DHCPv6'],          status: 'live', readTime: '18–26 min' },
      { id: 16, slug: 'routing-fundamentals',      title: 'Routing — How Packets Find Their Destination',        description: 'Routing tables, default gateway, longest prefix match, TTL, how every hop decision is made',     tags: ['Routing table','Default gateway','Longest prefix match','TTL','Hop','Static route','Next hop'],      status: 'live', readTime: '18–24 min' },
      { id: 17, slug: 'dynamic-routing',           title: 'Dynamic Routing — OSPF, EIGRP, BGP',                  description: 'How routers learn paths automatically — link-state vs distance-vector, AS numbers, BGP hijacking', tags: ['OSPF','BGP','EIGRP','RIP','Link-state','Distance-vector','AS number','BGP hijacking','Route redistribution'], status: 'live', readTime: '20–28 min' },
      { id: 18, slug: 'nat-and-dhcp',              title: 'NAT and DHCP — How Private Networks Work',            description: 'How 4 billion private IPs share the internet — port mapping, DORA, lease times, starvation attacks', tags: ['NAT','PAT','SNAT','DNAT','DHCP','DORA','IP lease','DHCP starvation','APIPA'],                        status: 'live', readTime: '18–24 min' },
      { id: 19, slug: 'icmp',                      title: 'ICMP — Ping, Traceroute, and Error Messages',         description: 'The control plane of IP — how ping works at the packet level, traceroute TTL trick, ICMP tunneling', tags: ['ICMP','Ping','Traceroute','TTL exceeded','Echo request','Echo reply','ICMP tunneling','MTU discovery'], status: 'live', readTime: '14–20 min' },
    ],
  },
  {
    id: 4, title: 'Transport Layer', color: '#f97316', difficulty: 'Intermediate',
    modules: [
      { id: 20, slug: 'tcp-deep-dive',             title: 'TCP — The Protocol That Guarantees Delivery',         description: '3-way handshake byte by byte, sequence numbers, flow control, congestion control, FIN vs RST',    tags: ['TCP','SYN','ACK','3-way handshake','Sequence numbers','Flow control','Congestion control','RST','FIN'], status: 'live', readTime: '22–30 min' },
      { id: 21, slug: 'udp',                       title: 'UDP — When Speed Matters More Than Reliability',      description: 'DNS, video, gaming, QUIC — why connectionless is the right choice more often than you think',    tags: ['UDP','Datagram','Connectionless','DNS','VoIP','Gaming','UDP flood','Amplification attack'],          status: 'live', readTime: '14–20 min' },
      { id: 22, slug: 'ports-and-sockets',         title: 'Ports and Sockets — Where Applications Live',         description: 'Well-known ports, ephemeral ports, socket pairs, how an OS routes packets to the right process',  tags: ['Ports','Sockets','Well-known ports','Ephemeral ports','Socket pair','netstat','ss','TCP states'],     status: 'live', readTime: '16–22 min' },
      { id: 23, slug: 'tls-ssl',                   title: 'TLS — How Encryption Protects Every HTTPS Request',   description: 'Certificate chain, handshake byte by byte, cipher suites, HSTS, certificate pinning, TLS 1.3 vs 1.2', tags: ['TLS','SSL','Certificate','CA','Handshake','Cipher suite','HSTS','SNI','Perfect forward secrecy','TLS 1.3'], status: 'live', readTime: '22–30 min' },
      { id: 24, slug: 'quic-http3',                title: 'QUIC and HTTP/3 — The Future of Web Transport',       description: 'How Google replaced TCP+TLS for web traffic — 0-RTT, stream multiplexing, connection migration',  tags: ['QUIC','HTTP/3','0-RTT','Multiplexing','Head-of-line blocking','Connection migration','UDP-based'],   status: 'live', readTime: '14–20 min' },
    ],
  },
  {
    id: 5, title: 'Application Layer Protocols', color: '#06b6d4', difficulty: 'Intermediate',
    modules: [
      { id: 25, slug: 'dns',                       title: 'DNS — How Domain Names Become IP Addresses',          description: 'Recursive resolution step by step, all record types, zone transfers, cache poisoning, DNS over HTTPS', tags: ['DNS','A record','MX','CNAME','TXT','SOA','NS','Recursive resolver','DNSSEC','Cache poisoning','DoH'], status: 'live', readTime: '22–30 min' },
      { id: 26, slug: 'http-and-https',            title: 'HTTP and HTTPS — The Protocol Powering the Web',      description: 'Request-response lifecycle, all headers, methods, status codes, cookies, HTTP/2 multiplexing',    tags: ['HTTP','HTTPS','GET','POST','PUT','DELETE','Status codes','Headers','Cookies','HTTP/2','Keep-alive'], status: 'live', readTime: '22–30 min' },
      { id: 27, slug: 'email-protocols',           title: 'Email Protocols — SMTP, IMAP, POP3, SPF, DKIM, DMARC', description: 'How email actually travels from sender to inbox — and the three records that stop spoofing',      tags: ['SMTP','IMAP','POP3','SPF','DKIM','DMARC','MX record','Phishing infrastructure','Email headers'],    status: 'live', readTime: '18–26 min' },
      { id: 28, slug: 'ssh',                       title: 'SSH — Secure Shell Complete Guide',                   description: 'How SSH key exchange works, agent forwarding, tunneling, ProxyJump — and every hardening step',  tags: ['SSH','RSA','Ed25519','Key exchange','Agent forwarding','Tunneling','ProxyJump','sshd_config','Hardening'], status: 'live', readTime: '20–28 min' },
      { id: 29, slug: 'ftp-and-sftp',             title: 'FTP, SFTP, and Secure File Transfer',                 description: 'Active vs passive mode, why FTP is dangerous, SFTP vs FTPS vs SCP, real-world file transfer', tags: ['FTP','SFTP','FTPS','SCP','Active mode','Passive mode','Credentials in cleartext','rsync'],           status: 'live', readTime: '14–20 min' },
      { id: 30, slug: 'dhcp-deep-dive',            title: 'DHCP Deep Dive — Address Assignment Under the Hood',  description: 'DORA byte by byte, option 43, relay agents, rogue DHCP servers, starvation and spoofing attacks', tags: ['DHCP','DORA','Discover','Offer','Request','ACK','Option 53','Relay agent','Rogue DHCP','Starvation'], status: 'live', readTime: '16–22 min' },
      { id: 31, slug: 'snmp-and-syslog',          title: 'SNMP and Syslog — How Networks Are Monitored',        description: 'MIB, OID, traps, community strings — and why SNMPv1 is a security disaster still running in 2026', tags: ['SNMP','SNMPv3','MIB','OID','Trap','Community string','Syslog','Severity levels','Log aggregation'],  status: 'live', readTime: '14–20 min' },
      { id: 32, slug: 'ntp',                       title: 'NTP — Why Clock Synchronisation Is a Security Issue', description: 'Stratum levels, how NTP works, why wrong clocks break TLS certificates and Kerberos authentication', tags: ['NTP','Stratum','Clock drift','NTP amplification','Authenticated NTP','Kerberos time window'],       status: 'live', readTime: '12–16 min' },
    ],
  },
  {
    id: 6, title: 'Network Security', color: '#ef4444', difficulty: 'Advanced',
    modules: [
      { id: 33, slug: 'network-attacks',           title: 'Network Attacks — ARP Poisoning, MITM, Sniffing',     description: 'Every Layer 2 and Layer 3 attack — how they work, what they look like in Wireshark, how to defend', tags: ['ARP poisoning','MITM','MAC flooding','VLAN hopping','Sniffing','Passive vs active','Ettercap','Responder'], status: 'live', readTime: '22–30 min' },
      { id: 34, slug: 'firewalls-and-acls',        title: 'Firewalls, ACLs, and Stateful Inspection',            description: 'Stateless vs stateful vs NGFW, ACL rule order, DMZ design, common bypass techniques',           tags: ['Stateless firewall','Stateful firewall','NGFW','ACL','DMZ','Rule order','NAT firewall','Bypass'],    status: 'live', readTime: '20–28 min' },
      { id: 35, slug: 'ids-and-ips',               title: 'IDS and IPS — Detecting Attacks on the Wire',         description: 'Signature vs anomaly detection, Snort/Suricata rules, inline vs passive, evasion techniques',    tags: ['IDS','IPS','Snort','Suricata','Signature','Anomaly','Inline','Passive','False positive','Evasion'],  status: 'live', readTime: '18–26 min' },
      { id: 36, slug: 'vpns-and-tunneling',        title: 'VPNs and Tunneling — IPSec, SSL, WireGuard',          description: 'How VPNs encrypt and encapsulate traffic — IKEv2, OpenVPN, WireGuard compared byte by byte',    tags: ['VPN','IPSec','IKEv2','OpenVPN','WireGuard','Tunnel mode','Transport mode','Split tunneling','GRE'],  status: 'live', readTime: '20–28 min' },
      { id: 37, slug: 'wireless-security',         title: 'Wireless Security — WPA2/WPA3 Attacks',               description: 'KRACK, PMKID attack, deauth frames, evil twin AP, rogue AP detection — complete wireless attack surface', tags: ['WPA2','WPA3','KRACK','PMKID','4-way handshake','Deauth','Evil twin','aircrack-ng','hcxtools'],       status: 'live', readTime: '20–28 min' },
      { id: 38, slug: 'zero-trust-networking',     title: 'Zero Trust Networking — Never Trust, Always Verify',  description: 'BeyondCorp, microsegmentation, identity-based perimeter, ZTNA vs VPN — the architecture replacing VPNs', tags: ['Zero trust','BeyondCorp','Microsegmentation','ZTNA','Identity perimeter','SDP','SASE','mTLS'],       status: 'live', readTime: '16–22 min' },
      { id: 39, slug: 'ddos',                      title: 'DDoS — How It Works and How to Defend Against It',    description: 'Volumetric, protocol, application layer — Cloudflare, AWS Shield, anycast — real attack breakdowns', tags: ['DDoS','Volumetric','SYN flood','HTTP flood','Amplification','Cloudflare','BGP anycast','Rate limiting'], status: 'live', readTime: '18–24 min' },
    ],
  },
  {
    id: 7, title: 'Tools and Troubleshooting', color: '#f59e0b', difficulty: 'Advanced',
    modules: [
      { id: 40, slug: 'network-troubleshooting',   title: 'Network Troubleshooting Methodology',                 description: 'The OSI-layer-by-layer methodology that resolves 90% of issues — with every command you run at each step', tags: ['Troubleshooting','ping','traceroute','nslookup','netstat','ss','ip route','arp -a','Methodology'],   status: 'live', readTime: '18–24 min' },
      { id: 41, slug: 'wireshark',                 title: 'Wireshark — Packet Analysis Complete Guide',          description: 'Capture filters, display filters, following streams, decrypting TLS, real-world pcap analysis',  tags: ['Wireshark','Capture filter','Display filter','TCP stream','pcap','Decrypting TLS','Protocol dissector'], status: 'live', readTime: '22–30 min' },
      { id: 42, slug: 'tcpdump',                   title: 'tcpdump — Command-Line Packet Capture',               description: 'BPF filter syntax, writing pcaps, piping to Wireshark — the tool every Linux engineer needs',    tags: ['tcpdump','BPF','Capture filter','pcap','-w flag','-r flag','Expressions','Remote capture'],          status: 'live', readTime: '16–22 min' },
      { id: 43, slug: 'nmap',                      title: 'Nmap — Network Scanning and Host Discovery',          description: 'SYN scan, OS fingerprinting, NSE scripts, timing, evading firewalls — complete offensive and defensive use', tags: ['Nmap','SYN scan','-sV','-O','NSE','Timing','Firewall evasion','Host discovery','Port states'],       status: 'live', readTime: '20–28 min' },
      { id: 44, slug: 'network-monitoring',        title: 'Network Monitoring — NetFlow, SNMP Polling, Dashboards', description: 'How enterprise networks are observed at scale — NetFlow, SNMP polling, Grafana, alerting',      tags: ['NetFlow','sFlow','SNMP polling','Grafana','Prometheus','Alertmanager','Bandwidth monitoring','NOC'],  status: 'live', readTime: '16–22 min' },
    ],
  },
]
