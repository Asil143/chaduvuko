import type { LessonQuick } from '@/lib/lesson-quick'

const N = '/learn/networking'

// Python examples use only the standard library and no network access, and are run for their
// output. Commands that need a live network (ping, dig, ssh) are shown as code.
export const NETWORKING_QUICK: Record<string, LessonQuick> = {
  [`${N}/what-is-a-network`]: {
    answer: 'A network is two or more devices that exchange data by following shared rules called protocols. The internet is a network of networks that splits data into packets, sends each one independently, and reassembles them at the destination.',
    points: [
      'Packet switching lets traffic route around failures and share links efficiently.',
      'TCP gives reliable, ordered delivery; UDP is faster with no guarantees.',
      'Every device needs an address so packets can reach it.',
    ],
    example: {
      label: 'A message split into packets that arrive out of order, then reassembled',
      lang: 'python',
      code: `message = "Hello from Seattle to Austin"
packets = [(i, message[i:i + 8]) for i in range(0, len(message), 8)]
arrived = [packets[2], packets[0], packets[3], packets[1]]     # took different paths
print("arrived:", [seq for seq, _ in arrived])
print("rebuilt:", "".join(chunk for _, chunk in sorted(arrived)))`,
    },
    check: {
      question: 'What is packet switching?',
      options: ['Reserving a dedicated circuit for each call', 'Splitting data into packets that travel independently', 'Switching between Wi-Fi and cable', 'Encrypting every packet'],
      answer: 1,
      explanation: 'Packets take independent routes and are reassembled at the destination, which makes the internet resilient.',
    },
  },

  [`${N}/network-types-topologies`]: {
    answer: 'Networks are described on two independent axes. Type is about scope and ownership: PAN, LAN (one site, you own it), MAN, WAN (many sites, usually leased) and SAN. Topology is about the shape of the connections: bus, star, ring, mesh or tree.',
    points: [
      'Star is the modern LAN standard: every device connects to a switch.',
      'A full mesh is the most resilient and the most expensive.',
      'Bus topology survives only in embedded systems such as a car\'s CAN bus.',
    ],
    example: {
      label: 'Links needed: star vs full mesh',
      lang: 'python',
      code: `for devices in (5, 10, 50):
    star = devices                      # each device to one central switch
    mesh = devices * (devices - 1) // 2 # every pair directly connected
    print(f"{devices:>2} devices: star {star:>3} links, full mesh {mesh:>4} links")`,
    },
    check: {
      question: 'Which topology connects every device to a central switch?',
      options: ['Bus', 'Ring', 'Star', 'Mesh'],
      answer: 2,
      explanation: 'In a star, a failed cable only affects one device, which is why it dominates modern LANs.',
    },
  },

  [`${N}/osi-model`]: {
    answer: 'The OSI model splits networking into seven layers: Physical (bits), Data Link (frames, MAC), Network (packets, IP), Transport (segments, TCP/UDP), Session, Presentation and Application. Each layer adds its header on the way down and removes it on the way up.',
    points: [
      'Encapsulation: each layer wraps the data from the layer above.',
      'Each layer reads only its own header.',
      'Troubleshoot bottom-up: cable, then link, then IP, then ports.',
    ],
    example: {
      label: 'Encapsulation as data moves down the stack',
      lang: 'python',
      code: `data = "GET /index.html"
segment = f"[TCP dst=443]{data}"
packet = f"[IP dst=93.184.216.34]{segment}"
frame = f"[ETH dst=aa:bb:cc:dd:ee:ff]{packet}[FCS]"
for layer, unit in [("L7 data", data), ("L4 segment", segment), ("L3 packet", packet), ("L2 frame", frame)]:
    print(f"{layer:10} {unit}")`,
    },
    check: {
      question: 'Which OSI layer handles IP addresses and routing?',
      options: ['Layer 2, Data Link', 'Layer 3, Network', 'Layer 4, Transport', 'Layer 7, Application'],
      answer: 1,
      explanation: 'Layer 3 moves packets between networks using IP addresses; layer 2 uses MAC addresses within a link.',
    },
  },

  [`${N}/tcp-ip-model`]: {
    answer: 'The TCP/IP model is the four-layer stack the internet actually runs: Network Access (Ethernet, Wi-Fi), Internet (IP routing between networks), Transport (TCP and UDP between processes) and Application (HTTP, DNS, SSH). It follows the end-to-end principle: a simple network, smart endpoints.',
    points: [
      'IP is best-effort: no delivery guarantee.',
      'TTL drops packets that loop; traceroute uses it.',
      'The IP protocol field says what is inside: 1 ICMP, 6 TCP, 17 UDP.',
    ],
    example: {
      label: 'Read the fields of a real IPv4 header',
      lang: 'python',
      code: `import struct, socket

header = bytes.fromhex("450000543a2b40004006b1e6c0a8010a5db8d822")
ver_ihl, tos, length, ident, flags, ttl, proto, csum, src, dst = struct.unpack("!BBHHHBBH4s4s", header)
print("version", ver_ihl >> 4, "| header bytes", (ver_ihl & 0xF) * 4, "| total length", length)
print("TTL", ttl, "| protocol", proto, "(TCP)" if proto == 6 else "")
print("from", socket.inet_ntoa(src), "to", socket.inet_ntoa(dst))`,
    },
    check: {
      question: 'How many layers does the TCP/IP model have?',
      options: ['4', '5', '7', '3'],
      answer: 0,
      explanation: 'Network Access, Internet, Transport and Application; OSI\'s top three layers fold into Application.',
    },
  },

  [`${N}/data-transmission`]: {
    answer: 'Data travels as signals: analog signals vary continuously, digital signals use discrete levels that can be regenerated perfectly. Bandwidth is capacity (bits per second); latency is delay, made of propagation, transmission, processing and queuing time. More bandwidth does not reduce propagation delay.',
    points: [
      'Baud is symbols per second; bit rate is bits per second.',
      'Light in fibre travels about 200,000 km/s, so distance sets a floor on latency.',
      'Throughput is what you actually get, usually below bandwidth.',
    ],
    example: {
      label: 'Propagation delay sets a minimum round-trip time',
      lang: 'python',
      code: `fiber_km_per_ms = 200            # about 200,000 km/s in glass
for route, km in [("Seattle-Portland", 280), ("New York-London", 5_570), ("New York-Sydney", 16_000)]:
    rtt_ms = 2 * km / fiber_km_per_ms
    print(f"{route:17} at least {rtt_ms:6.1f} ms round trip")`,
    },
    check: {
      question: 'Upgrading a link from 1 Gbps to 10 Gbps mostly reduces which delay?',
      options: ['Propagation delay', 'Transmission (serialisation) delay', 'Speed of light', 'DNS lookup time'],
      answer: 1,
      explanation: 'Faster links put bits on the wire faster; the signal still takes the same time to travel the distance.',
    },
  },

  [`${N}/binary-and-hex`]: {
    answer: 'Networking numbers are binary underneath: IPv4 addresses are 32 bits, MAC addresses 48 bits, IPv6 addresses 128 bits. Hexadecimal is shorthand where each hex digit is exactly 4 bits, and bitwise operations such as AND are how subnet masks work.',
    points: [
      'A digit is worth digit × base^position in any base.',
      'One octet ranges from 0 to 255 (8 bits).',
      'IP AND mask gives the network address.',
    ],
    example: {
      label: 'One octet in three bases, and a mask with AND',
      lang: 'python',
      code: `for n in (10, 172, 255):
    print(f"{n:>3} = {n:08b} = 0x{n:02X}")

ip, mask = 0b11000000_10101000_00000001_01100100, 0xFFFFFF00   # 192.168.1.100 / 255.255.255.0
net = ip & mask
print(".".join(str((net >> s) & 255) for s in (24, 16, 8, 0)))`,
    },
    check: {
      question: 'How many bits does one hexadecimal digit represent?',
      options: ['2', '4', '8', '16'],
      answer: 1,
      explanation: 'Hex digits run 0–F, sixteen values, which is exactly four bits.',
    },
  },

  [`${N}/cables-and-connectors`]: {
    answer: 'Networks run over twisted-pair copper (Cat5e, Cat6, Cat6a with RJ45), fibre optic (single-mode for long distance, multi-mode for short runs), coaxial cable, and radio. Twisting cancels interference, and fibre carries light immune to electrical noise.',
    points: [
      'Copper Ethernet is limited to 100 m per run.',
      'Cat6a is the minimum for new 10 Gbps installations.',
      'Single-mode fibre reaches tens of kilometres; multi-mode a few hundred metres.',
    ],
    example: {
      label: 'Picking a medium by distance and speed',
      lang: 'text',
      code: `Desk to switch, 40 m, 1–10 Gbps     → Cat6a copper, RJ45
Server rack, 3 m, 25 Gbps           → DAC cable or short multi-mode fibre
Between buildings, 2 km, 10 Gbps    → single-mode fibre, LC connectors
Warehouse floor, no cabling         → Wi-Fi 6 access points`,
      static: true,
    },
    check: {
      question: 'What is the maximum length of a standard copper Ethernet run?',
      options: ['10 m', '100 m', '500 m', '2 km'],
      answer: 1,
      explanation: 'Twisted-pair Ethernet standards specify 100 metres per segment; longer runs need fibre or a switch in between.',
    },
  },

  [`${N}/ethernet-and-switching`]: {
    answer: 'Ethernet moves frames between devices on a local network using 48-bit MAC addresses. A switch learns which MAC address is on which port by reading source addresses, forwards each frame only to the right port, and floods frames whose destination it has not learned yet.',
    points: [
      'A frame carries destination MAC, source MAC, EtherType, payload and a CRC.',
      'Corrupted frames fail the CRC and are dropped silently.',
      'Switches gave every port its own collision domain, replacing hubs.',
    ],
    example: {
      label: 'A switch learning MAC addresses (simulation)',
      lang: 'python',
      code: `table = {}

def receive(port, src, dst):
    table[src] = port                                    # learn where src lives
    out = table.get(dst)
    return f"to port {out}" if out is not None else "flood to all other ports"

print("A→B:", receive(1, "aa:aa", "bb:bb"))
print("B→A:", receive(2, "bb:bb", "aa:aa"))
print("A→B:", receive(1, "aa:aa", "bb:bb"))
print("table:", table)`,
    },
    check: {
      question: 'What does a switch do with a frame whose destination MAC is not in its table?',
      options: ['Drops it', 'Floods it out every other port', 'Sends it to the router', 'Returns it to the sender'],
      answer: 1,
      explanation: 'It floods unknown destinations, then learns the port from the reply.',
    },
  },

  [`${N}/arp`]: {
    answer: 'ARP (Address Resolution Protocol) finds the MAC address for an IP address on the local network: a host broadcasts "Who has 192.168.1.1?" and the owner replies with its MAC. Hosts cache the answers. For destinations outside the subnet, the host ARPs for its gateway instead.',
    points: [
      'ARP requests are broadcast; replies are unicast.',
      'ARP only works within one subnet.',
      'ARP has no authentication, which enables ARP spoofing.',
    ],
    example: {
      label: 'View the ARP cache on your machine',
      lang: 'bash',
      code: `arp -a                 # macOS, Windows
ip neigh show          # Linux
# ? (192.168.1.1) at 3c:84:6a:12:9b:01 on en0 ifscope [ethernet]`,
      static: true,
    },
    check: {
      question: 'You send a packet to a server on another network. Whose MAC address does your machine ARP for?',
      options: ['The server\'s', 'The default gateway\'s', 'The DNS server\'s', 'Nobody\'s'],
      answer: 1,
      explanation: 'Frames only travel within the local link, so they go to the gateway, which forwards the packet onward.',
    },
  },

  [`${N}/vlans`]: {
    answer: 'A VLAN splits one physical switch network into separate logical networks (broadcast domains). Access ports carry one VLAN untagged to an end device; trunk ports carry many VLANs between switches, each frame marked with an 802.1Q tag holding a 12-bit VLAN ID.',
    points: [
      'Traffic between VLANs must go through a router or layer 3 switch.',
      'VLAN IDs run 1–4094.',
      'VLANs separate guests, staff, cameras and servers on shared hardware.',
    ],
    example: {
      label: 'Access and trunk ports (Cisco IOS)',
      lang: 'text',
      code: `interface GigabitEthernet0/5
 switchport mode access
 switchport access vlan 20          ! staff laptops
!
interface GigabitEthernet0/48
 switchport mode trunk
 switchport trunk allowed vlan 10,20,30`,
      static: true,
    },
    check: {
      question: 'How do devices in VLAN 10 talk to devices in VLAN 20?',
      options: ['Directly, through the switch', 'Through a router or layer 3 switch', 'They never can', 'Through ARP'],
      answer: 1,
      explanation: 'Each VLAN is its own broadcast domain and IP subnet, so traffic between them must be routed.',
    },
  },

  [`${N}/spanning-tree`]: {
    answer: 'Spanning Tree Protocol prevents loops in switched networks with redundant links. Switches elect a root bridge (lowest bridge ID), then each keeps its best path toward the root and blocks redundant ports, forming a loop-free tree that reactivates backups when a link fails.',
    points: [
      'A loop without STP causes a broadcast storm in seconds.',
      'Set bridge priority so your core switch becomes root.',
      'Rapid STP (RSTP) converges in about a second, versus 30–50 seconds.',
    ],
    example: {
      label: 'Root bridge election: lowest priority, then lowest MAC',
      lang: 'python',
      code: `switches = [
    ("core-1", 4096, "00:1a:2b:00:00:10"),
    ("core-2", 4096, "00:1a:2b:00:00:05"),
    ("access-7", 32768, "00:1a:2b:00:00:01"),
]
root = min(switches, key=lambda s: (s[1], s[2]))
print("root bridge:", root[0])`,
    },
    check: {
      question: 'Which switch becomes the STP root bridge?',
      options: ['The one with the most ports', 'The one with the lowest bridge ID (priority, then MAC)', 'The newest one', 'The one with the highest MAC'],
      answer: 1,
      explanation: 'Bridge ID compares priority first and MAC address second; the lowest wins.',
    },
  },

  [`${N}/wireless-networking`]: {
    answer: 'Wi-Fi (IEEE 802.11) shares radio channels among all nearby devices, taking turns with CSMA/CA, so it is half-duplex and slows with contention. The 2.4 GHz band reaches further but has only three non-overlapping channels; 5 and 6 GHz offer far more. Use WPA3, or at least WPA2 with AES.',
    points: [
      'Use channels 1, 6 and 11 on 2.4 GHz.',
      'Wi-Fi 6 adds OFDMA to serve many clients at once.',
      'WEP and WPA (TKIP) are broken; never use them.',
    ],
    example: {
      label: 'Which 2.4 GHz channels overlap (20 MHz wide, 5 MHz apart)',
      lang: 'python',
      code: `def overlap(a, b):
    return abs(a - b) * 5 < 20

chosen = [1, 6, 11]
print("1, 6, 11 overlap:", any(overlap(a, b) for a in chosen for b in chosen if a < b))
print("1 and 4 overlap:", overlap(1, 4))`,
    },
    check: {
      question: 'Which set of 2.4 GHz channels do not overlap?',
      options: ['1, 2, 3', '1, 6, 11', '2, 7, 12', 'All 11 channels'],
      answer: 1,
      explanation: 'Channels are 5 MHz apart but 20 MHz wide, so only 1, 6 and 11 are far enough apart.',
    },
  },

  [`${N}/ip-addressing`]: {
    answer: 'An IPv4 address is 32 bits written as four decimal octets, split into a network part and a host part by a prefix length (CIDR, such as /24). Private ranges (10.0.0.0/8, 172.16.0.0/12, 192.168.0.0/16) are reused inside organisations and reach the internet through NAT.',
    points: [
      'A /24 has 256 addresses and 254 usable hosts.',
      'The first address is the network; the last is broadcast.',
      'Classful A/B/C addressing was replaced by CIDR in 1993.',
    ],
    example: {
      label: 'Inspect a network with the ipaddress module',
      lang: 'python',
      code: `import ipaddress

net = ipaddress.ip_network("192.168.10.0/24")
hosts = list(net.hosts())
print("network", net.network_address, "| broadcast", net.broadcast_address)
print("usable hosts", len(hosts), "from", hosts[0], "to", hosts[-1])
print("10.4.2.9 is private:", ipaddress.ip_address("10.4.2.9").is_private)`,
    },
    check: {
      question: 'How many usable host addresses does a /24 network have?',
      options: ['256', '254', '255', '24'],
      answer: 1,
      explanation: '2⁸ = 256 addresses, minus the network and broadcast addresses.',
    },
  },

  [`${N}/subnetting`]: {
    answer: 'Subnetting divides a network into smaller ones by borrowing host bits for the network prefix. Each borrowed bit doubles the number of subnets and halves their size; a subnet\'s block size is 2^(host bits), and every subnet starts at a multiple of that block size.',
    points: [
      '/26 = 64 addresses per subnet, 62 usable.',
      'Pick the prefix from the hosts you need, plus room to grow.',
      'Variable-length subnetting (VLSM) sizes each subnet to its need.',
    ],
    example: {
      label: 'Split a /24 into four /26 subnets',
      lang: 'python',
      code: `import ipaddress

for subnet in ipaddress.ip_network("10.20.30.0/24").subnets(new_prefix=26):
    hosts = list(subnet.hosts())
    print(f"{subnet}  usable {hosts[0]} – {hosts[-1]}  ({len(hosts)} hosts)")`,
    },
    check: {
      question: 'You need 50 hosts in one subnet. What is the smallest prefix that fits?',
      options: ['/27', '/26', '/25', '/28'],
      answer: 1,
      explanation: '/27 gives 30 usable hosts, too few; /26 gives 62.',
    },
  },

  [`${N}/ipv6`]: {
    answer: 'IPv6 uses 128-bit addresses written as eight groups of four hex digits, enough to end address shortage. You can drop leading zeros in each group and replace one run of all-zero groups with ::. It replaces ARP with Neighbor Discovery, has no broadcast, and every interface gets a link-local fe80:: address.',
    points: [
      ':: can appear only once in an address.',
      'Hosts can configure themselves with SLAAC.',
      'Sites typically receive a /48 and use /64 per subnet.',
    ],
    example: {
      label: 'Compress and expand IPv6 addresses',
      lang: 'python',
      code: `import ipaddress

addr = ipaddress.IPv6Address("2001:0db8:0000:0000:0000:ff00:0042:8329")
print("compressed:", addr.compressed)
print("expanded:  ", addr.exploded)
print("link-local fe80::1:", ipaddress.IPv6Address("fe80::1").is_link_local)
print("addresses in a /64:", 2 ** 64)`,
    },
    check: {
      question: 'How many times can :: appear in one IPv6 address?',
      options: ['Never', 'Once', 'Twice', 'Unlimited'],
      answer: 1,
      explanation: 'With two, you could not tell how many zero groups each one stands for.',
    },
  },

  [`${N}/routing-fundamentals`]: {
    answer: 'Routers forward packets hop by hop using their routing tables. For each packet a router picks the route with the longest matching prefix; if several sources know the same prefix, the lowest administrative distance wins (connected 0, static 1, OSPF 110, RIP 120).',
    points: [
      'Longest prefix match: /24 beats /16 beats the default route /0.',
      'The default route 0.0.0.0/0 catches everything else.',
      'Each router decides only the next hop.',
    ],
    example: {
      label: 'Longest prefix match in a routing table',
      lang: 'python',
      code: `import ipaddress

routes = {"0.0.0.0/0": "ISP", "10.0.0.0/8": "core", "10.20.0.0/16": "datacenter", "10.20.30.0/24": "db-subnet"}

def next_hop(ip):
    matches = [ipaddress.ip_network(r) for r in routes if ipaddress.ip_address(ip) in ipaddress.ip_network(r)]
    best = max(matches, key=lambda n: n.prefixlen)
    return f"{ip} → {best} via {routes[str(best)]}"

for ip in ["10.20.30.7", "10.20.99.1", "10.1.1.1", "8.8.8.8"]:
    print(next_hop(ip))`,
    },
    check: {
      question: 'A router has routes 10.0.0.0/8 and 10.1.0.0/16. Which is used for 10.1.5.5?',
      options: ['10.0.0.0/8', '10.1.0.0/16', 'Both, load-balanced', 'The default route'],
      answer: 1,
      explanation: 'The most specific (longest) matching prefix wins.',
    },
  },

  [`${N}/dynamic-routing`]: {
    answer: 'Dynamic routing protocols let routers learn routes automatically. OSPF is link-state: routers share the full topology and each runs Dijkstra\'s shortest-path algorithm. EIGRP is an advanced distance-vector protocol. BGP connects autonomous systems across the internet and chooses paths by policy.',
    points: [
      'OSPF areas limit how far topology updates flood.',
      'OSPF neighbours stuck in EXSTART usually mean an MTU mismatch.',
      'BGP picks paths by attributes and policy, not just distance.',
    ],
    example: {
      label: 'Dijkstra shortest paths, as OSPF computes them',
      lang: 'python',
      code: `import heapq

links = {"R1": {"R2": 10, "R3": 5}, "R2": {"R1": 10, "R4": 1}, "R3": {"R1": 5, "R2": 3, "R4": 9}, "R4": {"R2": 1, "R3": 9}}

def spf(source):
    dist, queue = {source: 0}, [(0, source)]
    while queue:
        d, node = heapq.heappop(queue)
        for nbr, cost in links[node].items():
            if d + cost < dist.get(nbr, float("inf")):
                dist[nbr] = d + cost
                heapq.heappush(queue, (d + cost, nbr))
    return dict(sorted(dist.items()))

print("cost from R1:", spf("R1"))`,
    },
    check: {
      question: 'Which protocol routes between autonomous systems on the internet?',
      options: ['OSPF', 'RIP', 'BGP', 'EIGRP'],
      answer: 2,
      explanation: 'BGP is the inter-domain protocol; OSPF and EIGRP route inside one organisation.',
    },
  },

  [`${N}/nat-and-dhcp`]: {
    answer: 'NAT lets many private addresses share public ones by rewriting packet addresses at the network edge; PAT (port address translation) multiplexes thousands of devices onto one public IP using port numbers. DHCP hands out IP addresses, gateways and DNS servers automatically when devices join.',
    points: [
      'The NAT table maps inside IP:port to outside IP:port.',
      'NAT is not a firewall, though it blocks unsolicited inbound traffic as a side effect.',
      'DHCP leases expire and are renewed.',
    ],
    example: {
      label: 'A PAT translation table (simulation)',
      lang: 'python',
      code: `public_ip, next_port, table = "203.0.113.7", 40000, {}

def outbound(inside_ip, inside_port):
    global next_port
    key = (inside_ip, inside_port)
    if key not in table:
        table[key] = (public_ip, next_port)
        next_port += 1
    return table[key]

for host in [("192.168.1.10", 51515), ("192.168.1.11", 51515), ("192.168.1.10", 51515)]:
    print(host, "→", outbound(*host))`,
    },
    check: {
      question: 'How does PAT let many devices share one public IP address?',
      options: ['Different MAC addresses', 'Different source port numbers in the translation table', 'Time-sharing the address', 'VLAN tags'],
      answer: 1,
      explanation: 'Each inside connection gets its own public port, so replies can be mapped back to the right device.',
    },
  },

  [`${N}/icmp`]: {
    answer: 'ICMP carries error and diagnostic messages for IP: echo request and reply (ping), destination unreachable, and time exceeded. traceroute sends probes with rising TTL values and lists the routers that return "time exceeded" at each hop.',
    points: [
      'Never block ICMP "fragmentation needed": it breaks path MTU discovery.',
      'Stars (*) in traceroute mean a hop did not reply, not necessarily a fault.',
      'Ping measures reachability and round-trip time.',
    ],
    example: {
      label: 'ping and traceroute',
      lang: 'bash',
      code: `ping -c 4 8.8.8.8
# 64 bytes from 8.8.8.8: icmp_seq=1 ttl=117 time=12.4 ms

traceroute chaduvuko.com
#  1  192.168.1.1   1.2 ms
#  2  10.64.0.1     8.9 ms
#  3  * * *`,
      static: true,
    },
    check: {
      question: 'How does traceroute discover each hop?',
      options: ['It asks DNS', 'It sends probes with increasing TTL and reads the ICMP time-exceeded replies', 'It reads the routing table', 'It uses ARP'],
      answer: 1,
      explanation: 'A probe with TTL N expires at hop N, and that router reports back with ICMP time exceeded.',
    },
  },

  [`${N}/tcp-deep-dive`]: {
    answer: 'TCP gives reliable, ordered byte streams over unreliable IP. It opens with a three-way handshake (SYN, SYN-ACK, ACK), numbers every byte, retransmits what is not acknowledged, uses a receive window for flow control, and adjusts its sending rate with congestion control.',
    points: [
      'The handshake agrees on starting sequence numbers and options such as MSS.',
      'Flow control protects the receiver; congestion control protects the network.',
      'TIME_WAIT keeps a closed connection\'s ports reserved briefly.',
    ],
    example: {
      label: 'Congestion window: slow start, then congestion avoidance (simulation)',
      lang: 'python',
      code: `cwnd, ssthresh = 1, 16
history = []
for rtt in range(8):
    history.append(cwnd)
    cwnd = cwnd * 2 if cwnd < ssthresh else cwnd + 1
print("cwnd per round trip (segments):", history)`,
    },
    check: {
      question: 'What is the order of the TCP three-way handshake?',
      options: ['ACK, SYN, SYN-ACK', 'SYN, SYN-ACK, ACK', 'SYN, ACK, FIN', 'HELLO, OK, START'],
      answer: 1,
      explanation: 'The client sends SYN, the server answers SYN-ACK, and the client confirms with ACK.',
    },
  },

  [`${N}/udp`]: {
    answer: 'UDP sends independent datagrams with an 8-byte header and nothing else: no connection, no acknowledgements, no retransmission, no ordering. That makes it fast and simple, so it carries DNS, DHCP, NTP, voice and video, and QUIC.',
    points: [
      'A datagram arrives whole or not at all.',
      'Applications add whatever reliability they need.',
      'DHCP uses UDP because a new client has no IP address yet.',
    ],
    example: {
      label: 'Send a UDP datagram over the loopback interface',
      lang: 'python',
      code: `import socket

server = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
server.bind(("127.0.0.1", 0))
port = server.getsockname()[1]

client = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
client.sendto(b"temp=21.5C", ("127.0.0.1", port))      # no handshake first

data, sender = server.recvfrom(1024)
print("received", data.decode(), "| header bytes: 8 | handshake: none")`,
    },
    check: {
      question: 'Why does DNS normally use UDP?',
      options: ['UDP is encrypted', 'A query and answer fit in one round trip with no handshake', 'TCP is not allowed', 'UDP guarantees delivery'],
      answer: 1,
      explanation: 'Skipping the TCP handshake makes a small lookup faster; DNS falls back to TCP for large answers.',
    },
  },

  [`${N}/ports-and-sockets`]: {
    answer: 'Ports (0–65535) identify which application on a machine receives traffic. A connection is uniquely identified by its 5-tuple: source IP, source port, destination IP, destination port and protocol, so one server port can hold thousands of connections at once.',
    points: [
      '0–1023 are well-known ports (80 HTTP, 443 HTTPS, 22 SSH).',
      'Clients use ephemeral source ports chosen by the OS.',
      'A socket is the program\'s endpoint for a connection.',
    ],
    example: {
      label: 'Well-known services by port',
      lang: 'python',
      code: `import socket

for port in (22, 25, 53, 80, 443):
    print(port, socket.getservbyport(port, "tcp"))`,
    },
    check: {
      question: 'How can a web server handle many clients on port 443 at once?',
      options: ['It opens a new port per client', 'Each connection\'s 5-tuple differs by client IP and port', 'It uses UDP', 'Only one client is allowed'],
      answer: 1,
      explanation: 'The server port stays 443; the clients\' addresses and source ports make each connection unique.',
    },
  },

  [`${N}/tls-ssl`]: {
    answer: 'TLS encrypts and authenticates connections such as HTTPS. In the handshake, the server proves its identity with a certificate signed by a trusted certificate authority, and both sides agree on session keys with (EC)DHE; the data is then encrypted with a fast symmetric cipher. TLS 1.3 needs one round trip.',
    points: [
      'Asymmetric crypto sets up the session; symmetric crypto protects the data.',
      'Forward secrecy: past sessions stay safe even if the server key leaks later.',
      'SSL is obsolete; use TLS 1.2 or 1.3.',
    ],
    example: {
      label: 'Diffie-Hellman with toy numbers: a shared secret over a public channel',
      lang: 'python',
      code: `p, g = 23, 5                       # public values (real ones are huge)
alice_secret, bob_secret = 6, 15     # never sent

A = pow(g, alice_secret, p)          # sent in public
B = pow(g, bob_secret, p)            # sent in public
print("public values:", A, B)
print("alice computes:", pow(B, alice_secret, p), "| bob computes:", pow(A, bob_secret, p))`,
    },
    check: {
      question: 'What does the server\'s certificate prove in TLS?',
      options: ['The connection is fast', 'The server is who it claims to be, vouched for by a trusted CA', 'The data is compressed', 'The client is authenticated'],
      answer: 1,
      explanation: 'The CA signature binds the domain name to the server\'s public key; encryption alone would not stop impersonation.',
    },
  },

  [`${N}/quic-http3`]: {
    answer: 'QUIC is an encrypted transport built on UDP that combines the transport and TLS 1.3 handshakes into one round trip and carries many independent streams. HTTP/3 runs over QUIC, so one lost packet stalls only its own stream, not every request on the connection as with TCP.',
    points: [
      'TCP + TLS needs two round trips to start; QUIC needs one (or zero on resumption).',
      'Connections survive network changes through connection IDs.',
      'QUIC implements its own congestion control in user space.',
    ],
    example: {
      label: 'Round trips before the first request is sent',
      lang: 'python',
      code: `rtt_ms = 80
setups = {"TCP + TLS 1.2": 3, "TCP + TLS 1.3": 2, "QUIC (HTTP/3)": 1, "QUIC 0-RTT resume": 0}
for name, rtts in setups.items():
    print(f"{name:18} {rtts} RTT = {rtts * rtt_ms:3} ms before the request goes out")`,
    },
    check: {
      question: 'Which problem does HTTP/3 remove compared with HTTP/2 over TCP?',
      options: ['Plain-text headers', 'Transport-level head-of-line blocking across streams', 'Cookies', 'DNS lookups'],
      answer: 1,
      explanation: 'In TCP a lost packet stalls the whole byte stream; QUIC streams recover independently.',
    },
  },

  [`${N}/dns`]: {
    answer: 'DNS turns names such as chaduvuko.com into IP addresses and other records. Your stub resolver asks a recursive resolver, which walks the hierarchy (root → .com → the domain\'s authoritative server) and caches each answer for its TTL. Records include A, AAAA, CNAME, MX, TXT and NS.',
    points: [
      '"Propagation" is really caches expiring at their TTL.',
      'Lower the TTL a day before a planned change.',
      'TXT records also hold SPF, DKIM and domain verification.',
    ],
    example: {
      label: 'Querying records with dig',
      lang: 'bash',
      code: `dig +short chaduvuko.com A
dig +short chaduvuko.com MX
dig +trace chaduvuko.com      # walk root → .com → authoritative`,
      static: true,
    },
    check: {
      question: 'Which record type maps a name to an IPv4 address?',
      options: ['AAAA', 'A', 'MX', 'CNAME'],
      answer: 1,
      explanation: 'A is IPv4, AAAA is IPv6, MX names mail servers, and CNAME aliases one name to another.',
    },
  },

  [`${N}/http-and-https`]: {
    answer: 'HTTP is the web\'s request/response protocol: a client sends a method (GET, POST, PUT, PATCH, DELETE), a path, headers and an optional body; the server returns a status code, headers and a body. It is stateless, and HTTPS is HTTP inside TLS.',
    points: [
      'GET, PUT and DELETE are idempotent; POST is not.',
      '2xx success, 3xx redirect, 4xx client error, 5xx server error.',
      '401 means not authenticated; 403 means not allowed.',
    ],
    example: {
      label: 'Build and parse a raw HTTP request',
      lang: 'python',
      code: `request = "GET /learn/sql HTTP/1.1\\r\\nHost: chaduvuko.com\\r\\nAccept: text/html\\r\\n\\r\\n"
request_line, *header_lines = request.split("\\r\\n\\r\\n")[0].split("\\r\\n")
method, path, version = request_line.split(" ")
headers = dict(line.split(": ", 1) for line in header_lines)
print(method, path, version)
print(headers)`,
    },
    check: {
      question: 'Which status code means "you are logged in but not allowed to do this"?',
      options: ['401', '403', '404', '500'],
      answer: 1,
      explanation: '401 means authentication is missing or invalid; 403 means the identity is known but lacks permission.',
    },
  },

  [`${N}/email-protocols`]: {
    answer: 'Email is sent and relayed with SMTP (ports 25, 587, 465) and read with IMAP (synchronised, port 993) or POP3 (download, port 995). Because SMTP does not authenticate the From address, three DNS-based checks fight spoofing: SPF (allowed sending servers), DKIM (a signature) and DMARC (policy and reports).',
    points: [
      'SMTP 4xx codes mean retry later; 5xx means permanent failure.',
      'DMARC requires SPF or DKIM to align with the visible From domain.',
      'Start DMARC at p=none, then move to quarantine and reject.',
    ],
    example: {
      label: 'SPF, DKIM and DMARC records in DNS',
      lang: 'text',
      code: `acme.com.                 TXT "v=spf1 include:_spf.google.com -all"
s1._domainkey.acme.com.   TXT "v=DKIM1; k=rsa; p=MIIBIjANBgkqh..."
_dmarc.acme.com.          TXT "v=DMARC1; p=quarantine; rua=mailto:dmarc@acme.com"`,
      static: true,
    },
    check: {
      question: 'Which record lists the servers allowed to send mail for a domain?',
      options: ['DKIM', 'SPF', 'DMARC', 'MX'],
      answer: 1,
      explanation: 'SPF lists permitted senders; DKIM signs messages; DMARC sets the policy; MX is for receiving.',
    },
  },

  [`${N}/ssh`]: {
    answer: 'SSH gives an encrypted, authenticated remote shell, file transfer (SFTP, scp) and port forwarding over one connection on port 22. The client verifies the server\'s host key, the two sides agree session keys (for example with Curve25519), and the user logs in, preferably with a key pair rather than a password.',
    points: [
      'Use Ed25519 keys and disable password login on servers.',
      'Check the host key fingerprint on first connect.',
      'ssh -L and -R forward ports through the tunnel.',
    ],
    example: {
      label: 'Key-based login and a port forward',
      lang: 'bash',
      code: `ssh-keygen -t ed25519 -C "ava@laptop"
ssh-copy-id ava@db-bastion.acme.com
ssh -L 5433:db.internal:5432 ava@db-bastion.acme.com   # local 5433 → private database`,
      static: true,
    },
    check: {
      question: 'Why prefer SSH keys to passwords?',
      options: ['Keys are shorter', 'Keys resist guessing and phishing; the private key never leaves your machine', 'Passwords are not supported', 'Keys disable encryption'],
      answer: 1,
      explanation: 'The server checks a signature from your private key; there is no reusable secret to steal or brute-force.',
    },
  },

  [`${N}/ftp-and-sftp`]: {
    answer: 'FTP transfers files over two TCP connections (control on port 21, plus a data connection) and sends credentials and data in clear text. FTPS adds TLS to FTP; SFTP is a different protocol that runs inside SSH on one port. Use SFTP (or HTTPS) today.',
    points: [
      'Never use plain FTP across the internet.',
      'Passive FTP is easier through firewalls than active.',
      'SFTP needs only port 22 open.',
    ],
    example: {
      label: 'Transferring files with SFTP',
      lang: 'bash',
      code: `sftp -i ~/.ssh/id_ed25519 partner@files.acme.com
sftp> put orders_2024-03-15.csv /inbound/
sftp> ls /outbound
sftp> get /outbound/ack_2024-03-15.json`,
      static: true,
    },
    check: {
      question: 'Which protocol runs inside SSH?',
      options: ['FTP', 'FTPS', 'SFTP', 'TFTP'],
      answer: 2,
      explanation: 'SFTP is an SSH subsystem; FTPS is FTP wrapped in TLS, with FTP\'s two-channel design.',
    },
  },

  [`${N}/dhcp-deep-dive`]: {
    answer: 'DHCP configures devices automatically through four messages, DORA: the client broadcasts Discover, a server sends an Offer, the client broadcasts a Request for it, and the server confirms with an ACK. The lease is renewed at 50% of its time (T1), rebound at 87.5% (T2), and lost when it expires.',
    points: [
      'DHCP uses UDP ports 67 and 68.',
      'A relay agent forwards DHCP across subnets.',
      'DHCP snooping blocks rogue servers.',
    ],
    example: {
      label: 'Lease renewal timers',
      lang: 'python',
      code: `lease_hours = 24
print(f"T1 renew  at {lease_hours * 0.5:.1f} h (unicast to the same server)")
print(f"T2 rebind at {lease_hours * 0.875:.1f} h (broadcast to any server)")
print(f"expires   at {lease_hours:.1f} h (start DORA again)")`,
    },
    check: {
      question: 'What are the four DHCP messages, in order?',
      options: ['Discover, Offer, Request, Acknowledge', 'Request, Offer, Discover, Acknowledge', 'Offer, Discover, Accept, Reply', 'Hello, Offer, Lease, Done'],
      answer: 0,
      explanation: 'DORA: Discover, Offer, Request, Acknowledge.',
    },
  },

  [`${N}/snmp-and-syslog`]: {
    answer: 'Network devices report on themselves in two main ways. SNMP lets a manager poll values, addressed by OIDs defined in MIBs, and devices push traps or informs. Syslog streams event messages with a facility and a severity from 0 (emergency) to 7 (debug). Use SNMPv3 with authPriv; v1 and v2c send community strings in clear text.',
    points: [
      'Informs are acknowledged; traps are fire-and-forget.',
      'Lower syslog severity numbers are more urgent.',
      'Send syslog to a central collector for search and alerting.',
    ],
    example: {
      label: 'Decode a syslog priority value',
      lang: 'python',
      code: `SEVERITIES = ["emerg", "alert", "crit", "err", "warning", "notice", "info", "debug"]
FACILITIES = {4: "auth", 16: "local0", 23: "local7"}

for line in ["<187>Mar 15 09:30:01 core-sw1 %LINK-3-UPDOWN: Gi0/1 down", "<38>Mar 15 09:31:12 vpn sshd: accepted key"]:
    pri = int(line[1:line.index(">")])
    print(f"PRI {pri}: facility {FACILITIES.get(pri // 8, pri // 8)}, severity {SEVERITIES[pri % 8]}")`,
    },
    check: {
      question: 'Which SNMP version should production networks use?',
      options: ['SNMPv1', 'SNMPv2c', 'SNMPv3 with authPriv', 'Any version'],
      answer: 2,
      explanation: 'Only SNMPv3 authPriv authenticates and encrypts; earlier versions send community strings in clear text.',
    },
  },

  [`${N}/ntp`]: {
    answer: 'NTP keeps clocks synchronised over UDP port 123. A client exchanges four timestamps with a server to estimate both its clock offset and the network delay, and servers form a stratum hierarchy down from reference clocks such as GPS. Accurate time matters for TLS certificates, Kerberos, logs and distributed systems.',
    points: [
      'Stratum 1 servers connect directly to a reference clock.',
      'Offset = ((T2 − T1) + (T3 − T4)) / 2.',
      'Asymmetric network paths cause systematic error.',
    ],
    example: {
      label: 'Offset and delay from the four NTP timestamps',
      lang: 'python',
      code: `t1 = 100.000   # client sends (client clock)
t2 = 100.530   # server receives (server clock)
t3 = 100.531   # server replies (server clock)
t4 = 100.041   # client receives (client clock)

offset = ((t2 - t1) + (t3 - t4)) / 2
delay = (t4 - t1) - (t3 - t2)
print(f"client clock is {offset * 1000:.1f} ms behind; round-trip delay {delay * 1000:.1f} ms")`,
    },
    check: {
      question: 'Why can a wrong clock break HTTPS?',
      options: ['TLS needs low latency', 'Certificate validity periods are checked against the local clock', 'Clocks set the encryption key', 'DNS depends on time'],
      answer: 1,
      explanation: 'A clock outside a certificate\'s not-before / not-after window makes valid certificates look expired or not yet valid.',
    },
  },

  [`${N}/network-attacks`]: {
    answer: 'Many network attacks exploit protocols that trust by default: ARP spoofing redirects LAN traffic through an attacker (man-in-the-middle), MAC flooding turns a switch into a hub, DHCP spoofing hands out a malicious gateway, and SYN floods exhaust server connection state. Defences include DAI, DHCP snooping, port security and SYN cookies.',
    points: [
      'ARP and DHCP have no authentication.',
      'TLS defeats sniffing even when traffic is intercepted.',
      'Switch-level features stop most LAN attacks.',
    ],
    example: {
      label: 'Spot ARP spoofing: one MAC claiming several IPs (simulation)',
      lang: 'python',
      code: `arp_replies = [("192.168.1.1", "3c:84:6a:12:9b:01"), ("192.168.1.20", "a4:5e:60:c1:22:9f"),
               ("192.168.1.1", "a4:5e:60:c1:22:9f")]          # attacker claims the gateway

claims = {}
for ip, mac in arp_replies:
    claims.setdefault(mac, set()).add(ip)
    if ip == "192.168.1.1" and mac != "3c:84:6a:12:9b:01":
        print(f"ALERT: gateway IP now claimed by {mac}")
print({mac: sorted(ips) for mac, ips in claims.items()})`,
    },
    check: {
      question: 'Which switch feature defends against ARP spoofing?',
      options: ['Port speed settings', 'Dynamic ARP Inspection with DHCP snooping', 'Jumbo frames', 'VLAN trunking'],
      answer: 1,
      explanation: 'DAI checks ARP replies against the DHCP snooping table of known IP-to-MAC bindings.',
    },
  },

  [`${N}/firewalls-and-acls`]: {
    answer: 'Access control lists are ordered permit and deny rules checked top to bottom; the first match wins and everything unmatched is denied implicitly. Stateful firewalls also track connections so reply traffic is allowed automatically, and next-generation firewalls identify applications and users, not just ports.',
    points: [
      'Put specific rules above general ones.',
      'Every ACL ends with an implicit deny all.',
      'Stateless filters need explicit rules for return traffic.',
    ],
    example: {
      label: 'First-match ACL evaluation',
      lang: 'python',
      code: `import ipaddress

acl = [
    ("permit", "10.0.5.0/24", 5432),   # app servers → database
    ("deny",   "10.0.0.0/8",  5432),   # everyone else internal
    ("permit", "0.0.0.0/0",   443),    # HTTPS from anywhere
]

def check(src, port):
    for action, net, p in acl:
        if ipaddress.ip_address(src) in ipaddress.ip_network(net) and port == p:
            return action
    return "deny (implicit)"

for src, port in [("10.0.5.21", 5432), ("10.0.9.4", 5432), ("198.51.100.8", 443), ("198.51.100.8", 22)]:
    print(f"{src:13} :{port:<5} {check(src, port)}")`,
    },
    check: {
      question: 'What happens to traffic that matches no ACL rule?',
      options: ['It is allowed', 'It is denied by the implicit deny', 'It is logged only', 'It goes to the next router'],
      answer: 1,
      explanation: 'Every ACL ends with an invisible deny all.',
    },
  },

  [`${N}/ids-and-ips`]: {
    answer: 'An intrusion detection system (IDS) watches traffic and alerts on attacks; an intrusion prevention system (IPS) sits inline and can block them. They detect with signatures (known patterns), anomalies (deviations from a baseline) and heuristics, and must be tuned to cut false positives before blocking.',
    points: [
      'Signatures catch known attacks with few false positives.',
      'Anomaly detection can catch new attacks but is noisy.',
      'An untuned IPS blocks legitimate traffic.',
    ],
    example: {
      label: 'A Suricata rule that alerts on a SQL injection attempt',
      lang: 'text',
      code: `alert http $EXTERNAL_NET any -> $HOME_NET any (
  msg:"Possible SQL injection: UNION SELECT in URI";
  flow:to_server,established;
  http.uri; content:"union"; nocase; content:"select"; nocase; distance:0;
  classtype:web-application-attack; sid:1000001; rev:1;)`,
      static: true,
    },
    check: {
      question: 'What is the key difference between an IDS and an IPS?',
      options: ['An IDS is hardware', 'An IPS sits inline and can block traffic; an IDS only alerts', 'An IDS encrypts traffic', 'There is none'],
      answer: 1,
      explanation: 'IDS is passive monitoring; IPS is inline enforcement.',
    },
  },
}
