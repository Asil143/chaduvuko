import type { TrackCheatSheet } from '@/lib/cheatsheet'

export const networkingCheatSheet: TrackCheatSheet = {
  track: 'networking',
  title: 'Networking',
  trackHref: '/learn/networking',
  accent: '#22d3ee',
  blurb: 'Models, addressing, subnetting, TCP/UDP, DNS, HTTP and routing — the numbers and headers from the track on one page. Bookmark it.',
  sections: [
    {
      title: 'Models',
      entries: [
        { label: 'OSI and TCP/IP', code: `OSI              PDU        TCP/IP\n7 Application    data       Application\n6 Presentation\n5 Session\n4 Transport      segment    Transport\n3 Network        packet     Internet\n2 Data Link      frame      Link\n1 Physical       bits` },
        { label: 'Encapsulation', code: `# top down, each layer adds a header\ndata → segment (TCP/UDP)\n     → packet  (IP)\n     → frame   (Ethernet)\n     → bits\n# a hop strips what it must, then rebuilds` },
        { label: 'Bandwidth and delay', code: `# bandwidth   capacity, bits/sec\n# throughput  what you actually get\n# latency     one-way delay\n# RTT         there and back\n# jitter      delay that keeps changing` },
      ],
    },
    {
      title: 'Addresses',
      entries: [
        { label: 'Bits and hex', code: `# one hex digit = 4 bits (a nibble)\n# 0xFB = 11111011 = 251\n# octet = 8 bits = 0–255\n192.168.1.10\n= 11000000 10101000 00000001 00001010` },
        { label: 'MAC vs IP', code: `# MAC  48 bits, layer 2, this link\n#      3c:22:fb:a0:14:09\n# IPv4 32 bits, layer 3, end to end\n# a switch forwards on MAC\n# a router forwards on IP` },
        { label: 'Private IPv4', code: `10.0.0.0/8          RFC 1918\n172.16.0.0/12\n192.168.0.0/16\n127.0.0.0/8        loopback\n169.254.0.0/16     link-local` },
        { label: 'On this host', code: `ip addr     # addresses and masks\nip route    # the routing table\n# default via 192.168.1.1 dev eth0` },
      ],
    },
    {
      title: 'Subnetting',
      entries: [
        { label: 'A /24', code: `192.168.1.0/24\nmask       255.255.255.0\nnetwork    192.168.1.0\nfirst host 192.168.1.1\nlast host  192.168.1.254\nbroadcast  192.168.1.255` },
        { label: 'How many hosts', code: `# usable = 2^(32 - prefix) - 2\n# /24 → 254    /26 → 62    /30 → 2\n# /32 is one host route\n# /31 point-to-point uses both\n# addresses (no broadcast)` },
        { label: 'Four /26s', code: `# block = 2^(32-26) = 64\n192.168.1.0/26     .0   – .63\n192.168.1.64/26    .64  – .127\n192.168.1.128/26   .128 – .191\n192.168.1.192/26   .192 – .255` },
        { label: 'VLSM vs FLSM', code: `# FLSM: every subnet the same length\n# VLSM: mix lengths in one network\n# /26 for a LAN, /30 for a link,\n# /28 for a small lab\n# subnets must not overlap` },
      ],
    },
    {
      title: 'IPv6',
      entries: [
        { label: 'Writing an address', code: `# 8 groups of 16 bits\n2001:db8:0:0:0:0:0:1 → 2001:db8::1\n# one :: only; drop leading zeros\n::1            loopback\nfe80::/10      link-local\n2000::/3       global unicast` },
        { label: 'Address kinds', code: `# unicast    one interface\n# multicast  a group (ff00::/8)\n# anycast    nearest of a shared address\n# no broadcast\n# a LAN prefix is usually a /64` },
        { label: 'SLAAC and NDP', code: `# router advertisement gives the prefix\n# EUI-64: split the MAC, insert ff:fe,\n#   flip the universal/local bit\n# Neighbor Solicitation replaces ARP` },
      ],
    },
    {
      title: 'Link layer',
      entries: [
        { label: 'Ethernet frame', code: `# dst MAC | src MAC | type | payload | FCS\n# 0x0800 IPv4   0x0806 ARP\n# 0x86DD IPv6\n# switch learns source MAC → port\n# that table is the CAM table` },
        { label: 'ARP', code: `# who has 192.168.1.1?\n#   tell 192.168.1.10\n# reply: the MAC, then it is cached\n# same subnet → frame to the host MAC\n# other subnet → frame to the gateway` },
        { label: '802.1Q', code: `# tag after the source MAC\n# TPID 0x8100 | PCP | VLAN id (12 bits)\n# access port: one VLAN, untagged\n# trunk: many VLANs, tagged\n# VLAN id 1–4094` },
      ],
    },
    {
      title: 'TCP & UDP',
      entries: [
        { label: 'Handshake and close', code: `# open\nclient → SYN\nserver → SYN-ACK\nclient → ACK\n# close: FIN/ACK each way\n# RST aborts; no polite close` },
        { label: 'TCP header', code: `# src port, dst port\n# sequence, acknowledgment\n# flags: SYN ACK FIN RST\n# window: how much the receiver allows\n# cwnd: sender slows after loss` },
        { label: 'UDP', code: `# src, dst, length, checksum — then data\n# no handshake, no retry, no order\n# DNS, voice, games\n# HTTP/3 (QUIC) rides on UDP` },
        { label: 'Ports', code: `# 22 SSH   53 DNS\n# 80 HTTP  443 HTTPS\n# client port: ephemeral, often high\n# socket = src IP+port, dst IP+port,\n#   and TCP or UDP` },
      ],
    },
    {
      title: 'Routing',
      entries: [
        { label: 'Longest prefix', code: `10.1.0.0/16   via A\n10.1.8.0/24   via B   # more specific wins\n0.0.0.0/0     via gw  # default\n# TTL drops by 1 each hop\n# TTL 0 → ICMP Time Exceeded` },
        { label: 'Who learns routes', code: `# static: you type the next hop\n# OSPF: link-state, inside one AS\n# BGP: path vector, between ASes\n# a route is prefix + next hop + out iface` },
        { label: 'Forwarding', code: `# same subnet? send to that host MAC\n# else send to the gateway MAC\n# the IP addresses do not change\n# the MACs are rewritten each hop` },
      ],
    },
    {
      title: 'DNS',
      entries: [
        { label: 'Resolution', code: `# stub → recursive resolver\n#   → root → TLD → authoritative\n# the answer is cached until TTL\n# the resolver does the walking` },
        { label: 'Record types', code: `A       name → IPv4\nAAAA    name → IPv6\nCNAME   alias → canonical name\nMX      where mail goes\nNS      who is authoritative\nTXT     SPF and other text` },
        { label: 'Look up', code: `dig example.com A +short\ndig example.com AAAA\ndig example.com MX\ndig example.com NS` },
      ],
    },
    {
      title: 'HTTP',
      entries: [
        { label: 'Request', code: `GET /learn/networking HTTP/1.1\nHost: example.com\n\n# GET    safe and idempotent\n# PUT    idempotent\n# POST   neither\n# DELETE idempotent` },
        { label: 'Status classes', code: `# 1xx informational\n# 2xx  200 OK   201 Created\n# 3xx  301  302  304 Not Modified\n# 4xx  400  401  403  404\n# 5xx  500  502  503` },
        { label: 'Headers', code: `Content-Type: application/json\nAuthorization: Bearer …\nCache-Control, Set-Cookie\n# HTTP/2: many streams, one connection\n# HTTPS is HTTP on port 443` },
        { label: 'TLS idea', code: `# ClientHello\n# ServerHello + certificate\n# client checks the chain to a trusted CA\n# then application data is encrypted\n# TLS 1.3 folds this into fewer flights` },
      ],
    },
    {
      title: 'NAT, DHCP & ICMP',
      entries: [
        { label: 'NAT / PAT', code: `# many private hosts, one public IP\n# table: private IP:port\n#    ↔  public IP:port\n# outbound creates the row\n# inbound needs a mapping you made` },
        { label: 'DHCP DORA', code: `# Discover  client broadcast\n# Offer     a server proposes an address\n# Request   client accepts it\n# Ack       lease starts\n# renew before the lease ends` },
        { label: 'Ping and traceroute', code: `# ICMP echo request / echo reply = ping\nping -c 3 192.168.1.1\n# traceroute sends TTL 1, then 2, then 3\n# each hop answers Time Exceeded` },
      ],
    },
  ],
  projects: [
    { title: 'Quarter a /16', level: 'Beginner', build: 'Split 10.0.0.0/16 into four equal subnets. For each, write the prefix, mask, network address, first host, last host and broadcast.', skills: ['CIDR', 'subnet mask', 'host range'] },
    { title: 'One GET, every layer', level: 'Beginner', build: 'Follow a single HTTP GET from a laptop to a server. At each TCP/IP layer name the PDU, the address used, and the header that gets added.', skills: ['encapsulation', 'TCP/IP', 'HTTP'] },
    { title: 'Two VLANs and a link', level: 'Intermediate', build: 'From 192.168.10.0/24, carve two /26 VLANs and a /30 router link. Give each VLAN a gateway and a DHCP range that excludes the gateway and the network address.', skills: ['VLSM', 'DHCP', 'default gateway'] },
    { title: 'Read a TCP header', level: 'Intermediate', build: 'Given ports, flags, a sequence number and an acknowledgment, say whether the segment is a SYN, in-flight data, or a FIN. Map the destination port to a well-known service.', skills: ['TCP header', 'flags', 'ports'] },
    { title: 'Names and a default route', level: 'Advanced', build: 'Choose A, AAAA, CNAME and MX records for a small site, an internal OSPF area, and a default route to the ISP. Show two overlapping prefixes and which one longest-prefix match selects.', skills: ['DNS', 'OSPF', 'longest prefix match'] },
  ],
}
