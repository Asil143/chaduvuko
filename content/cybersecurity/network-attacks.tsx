import { LearnLayout } from '@/components/content/LearnLayout'
import { KeyTakeaways } from '@/components/content/KeyTakeaways'
import { Callout } from '@/components/content/Callout'
import Link from 'next/link'

const C = '#ff4757'

const s = {
  p: { fontSize: 15, color: 'var(--text)', lineHeight: 1.9, marginBottom: 16 } as React.CSSProperties,
  h: { fontSize: 20, fontWeight: 700, color: 'var(--heading)', marginTop: 36, marginBottom: 12 } as React.CSSProperties,
  hl: { color: C, fontWeight: 600 } as React.CSSProperties,
  block: {
    background: 'var(--code-bg)', border: '1px solid var(--border)',
    borderRadius: 8, padding: '16px 20px', fontFamily: 'monospace',
    fontSize: 13, lineHeight: 1.8, marginBottom: 20, whiteSpace: 'pre-wrap' as const,
    overflowX: 'auto' as const,
  },
  table: { width: '100%', borderCollapse: 'collapse' as const, marginBottom: 24, fontSize: 14 },
  th: { background: 'var(--code-bg)', padding: '10px 14px', textAlign: 'left' as const, fontWeight: 600, borderBottom: '2px solid var(--border)' },
  td: { padding: '10px 14px', borderBottom: '1px solid var(--border)', verticalAlign: 'top' as const },
  divider: { border: 'none', borderTop: '1px solid var(--border)', margin: '40px 0' },
  iqBox: { background: 'var(--code-bg)', borderLeft: `4px solid ${C}`, borderRadius: 6, padding: '16px 20px', marginBottom: 20 },
  errBox: { background: '#1a0a0a', borderLeft: '4px solid #ff4757', borderRadius: 6, padding: '16px 20px', marginBottom: 20 },
}

function Part({ children }: { children: React.ReactNode }) {
  return <div style={{ marginBottom: 48 }}>{children}</div>
}

function H({ children }: { children: React.ReactNode }) {
  return <h2 style={s.h}>{children}</h2>
}

function P({ children }: { children: React.ReactNode }) {
  return <p style={s.p}>{children}</p>
}

function Hl({ children }: { children: React.ReactNode }) {
  return <span style={s.hl}>{children}</span>
}

function HR() {
  return <hr style={s.divider} />
}

function Block({ children }: { children: React.ReactNode }) {
  return <pre style={s.block}>{children}</pre>
}

function IQ({ q, children }: { q: string; children: React.ReactNode }) {
  return (
    <div style={s.iqBox}>
      <div style={{ fontWeight: 700, color: C, marginBottom: 8 }}>Q: {q}</div>
      <div style={{ fontSize: 14, color: 'var(--text)', lineHeight: 1.8 }}>{children}</div>
    </div>
  )
}

function Err({ title, cause, fix }: { title: string; cause: string; fix: string }) {
  return (
    <div style={s.errBox}>
      <div style={{ color: '#ff4757', fontWeight: 700, marginBottom: 6 }}>✗ {title}</div>
      <div style={{ fontSize: 13, color: '#ccc', marginBottom: 4 }}><strong>Why it happens:</strong> {cause}</div>
      <div style={{ fontSize: 13, color: '#ccc' }}><strong>Fix:</strong> {fix}</div>
    </div>
  )
}

function ProTip({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ background: '#0a1a0a', borderLeft: '4px solid #2ed573', borderRadius: 6, padding: '14px 18px', marginBottom: 20, fontSize: 14, color: '#ccc', lineHeight: 1.8 }}>
      <strong style={{ color: '#2ed573' }}>Pro tip:</strong> {children}
    </div>
  )
}

export default function Module10() {
  return (
    <LearnLayout
      title="Network Attacks — MITM, Sniffing, ARP Poisoning, DNS Hijacking"
      description="How attackers intercept, spoof, and abuse protocol-level weaknesses at the network layer — and how defenders detect and stop them."
      section="Cybersecurity — Module 10"
      readTime="42 min"
      updatedAt="May 2026"
    >
      <Part>
        <P>
          Every packet that crosses a network trusts the infrastructure beneath it. ARP tables assume other devices are honest. DNS answers assume resolvers haven't been poisoned. BGP routes assume peers announce their own prefixes. TCP sessions assume nobody is watching the sequence numbers. These assumptions are decades old, designed for a cooperative academic network — and attackers have been exploiting them ever since.
        </P>
        <P>
          This module goes to the wire. You'll understand exactly how a <Hl>Man-in-the-Middle attack</Hl> positions itself between two hosts, how <Hl>ARP poisoning</Hl> works at the Ethernet frame level, how DNS and BGP hijacking redirect entire networks, and what the capture looks like in Wireshark when it happens. By the end, you'll know how to detect these attacks and what controls actually stop them.
        </P>
      </Part>

      <HR />

      <Part>
        <H>The Anatomy of a Man-in-the-Middle Attack</H>
        <P>
          A Man-in-the-Middle (MITM) attack is not a single technique — it is a <Hl>position</Hl> that an attacker achieves. Once positioned between two communicating parties (Alice and Bob), the attacker can read, modify, drop, or replay every message in transit. Neither Alice nor Bob knows they are not talking directly to each other.
        </P>
        <P>
          The attacker needs two things: a mechanism to <Hl>intercept traffic</Hl> (ARP poisoning, rogue Wi-Fi, DNS hijacking) and optionally a mechanism to <Hl>terminate and re-originate</Hl> the connection (SSL stripping, sslsplit). Without the second step, encrypted traffic remains unreadable even when intercepted.
        </P>
        <Block>{`MITM position (conceptual):

  Alice ──────────→ Attacker ──────────→ Bob
         ←──────────         ←──────────

  Alice thinks she's talking to Bob.
  Bob thinks he's talking to Alice.
  Attacker sees all plaintext, can modify in transit.

Classic MITM variants:
  Passive:  Capture only — sniff credentials, session tokens
  Active:   Modify content — inject malicious JS, change amounts
  Relay:    Forward everything unchanged — stay invisible
  Drop:     Selectively block packets — cause partial failures`}</Block>
        <P>
          The most common MITM setup on a local network uses ARP poisoning to intercept. On the internet, BGP hijacking, DNS hijacking, or SSL stripping serve the same purpose at larger scale. Each technique exploits a different trust assumption baked into internet protocols.
        </P>
      </Part>

      <HR />

      <Part>
        <H>ARP Poisoning — Hijacking the Local Network</H>
        <P>
          The <Hl>Address Resolution Protocol (ARP)</Hl> maps IP addresses to MAC addresses within a LAN segment. When Alice (192.168.1.10) wants to send a packet to the gateway (192.168.1.1), she broadcasts: "Who has 192.168.1.1? Tell 192.168.1.10." The gateway replies with its MAC address. Alice caches this in her ARP table.
        </P>
        <P>
          The critical weakness: <Hl>ARP has no authentication</Hl>. Any host can send an unsolicited ARP reply claiming any IP-to-MAC mapping, and most operating systems will accept and cache it without question. This is called a <Hl>Gratuitous ARP</Hl>.
        </P>
        <Block>{`Normal ARP exchange:

  Alice (192.168.1.10)  →  BROADCAST: "Who has 192.168.1.1?"
  Gateway (192.168.1.1) →  UNICAST:   "192.168.1.1 is at aa:bb:cc:dd:ee:ff"
  Alice caches:  192.168.1.1 → aa:bb:cc:dd:ee:ff

ARP poisoning attack:

  Attacker sends to Alice:
    "192.168.1.1 is at 11:22:33:44:55:66"  (attacker's MAC)

  Attacker sends to Gateway:
    "192.168.1.10 is at 11:22:33:44:55:66" (attacker's MAC)

  Result:
    Alice → Gateway traffic now flows:
    Alice → Attacker → Gateway → Alice (invisible relay)

  Attacker's ARP table manipulation:
    Alice's ARP:   192.168.1.1 → 11:22:33:44:55:66  ← poisoned
    Gateway ARP:   192.168.1.10 → 11:22:33:44:55:66 ← poisoned`}</Block>
        <P>
          The attacker must keep sending these spoofed ARP replies because ARP cache entries expire (typically 10-20 minutes). Tools like <Hl>arpspoof</Hl> (part of dsniff) and <Hl>Ettercap</Hl> automate this continuously. The attacker also enables IP forwarding on their machine so that intercepted packets are actually delivered to the destination — otherwise the connection breaks and the victim notices.
        </P>
        <Block>{`# Tool: arpspoof (for authorised lab use only)
# Poison Alice's ARP cache (tell Alice that gateway is at our MAC)
arpspoof -i eth0 -t 192.168.1.10 192.168.1.1

# Simultaneously poison gateway's ARP cache
arpspoof -i eth0 -t 192.168.1.1 192.168.1.10

# Enable IP forwarding so packets actually reach their destination
echo 1 > /proc/sys/net/ipv4/ip_forward

# Now all Alice↔Gateway traffic flows through us
# Capture with tcpdump or Wireshark on eth0

Detection in Wireshark:
  Filter: arp.duplicate-address-detected
  or:     arp.opcode == 2 && arp.src.hw_mac != expected_mac

Detection via arp -a (victim machine):
  $ arp -a
  gateway (192.168.1.1) at 11:22:33:44:55:66 [ether]
  ← if gateway's real MAC is aa:bb:cc:dd:ee:ff, this is poisoned`}</Block>
        <ProTip>
          On macOS and Linux you can spot ARP poisoning by running <code>arp -a</code> and checking if the gateway's MAC matches the MAC printed on your router's label. If they differ, your ARP cache is poisoned.
        </ProTip>
      </Part>

      <HR />

      <Part>
        <H>Packet Sniffing — What Wireshark Sees</H>
        <P>
          Once positioned in the traffic path, an attacker captures packets with a <Hl>packet analyser</Hl> (sniffer). Wireshark is the standard tool. Understanding what it sees — and what it can't — is essential for both offense and defense.
        </P>
        <Block>{`What a sniffer captures in plaintext (no TLS):
  - HTTP: full URLs, headers, body, cookies, form submissions
  - FTP: username + password in clear
  - Telnet: every keystroke including passwords
  - SMTP/POP3/IMAP (without STARTTLS): email body + creds
  - DNS: all queries and responses (domain lookups)

What remains opaque with TLS:
  - The encrypted payload (HTTPS body, data)
  - Session cookies and auth tokens (inside TLS)

What TLS doesn't hide:
  - IP source/destination (visible in IP header)
  - Port numbers
  - Packet sizes and timing (traffic analysis)
  - SNI (Server Name Indication) — the hostname you're visiting
    (now hidden with Encrypted Client Hello / ECH in TLS 1.3+)

Useful Wireshark display filters:
  http                         # all HTTP traffic
  http.request.method == POST  # form submissions
  dns                          # all DNS queries/responses
  tcp.port == 443              # HTTPS traffic
  ip.addr == 192.168.1.50      # traffic to/from one host
  frame contains "password"    # literal string search`}</Block>
        <P>
          Network interfaces operate in <Hl>promiscuous mode</Hl> during sniffing — the NIC accepts all frames on the wire, not just those addressed to its MAC. On a switched network (which is almost everything today), you normally only see broadcast traffic and your own unicast traffic. ARP poisoning solves this by routing traffic through you, making promiscuous mode effective for targeted captures.
        </P>
        <Block>{`# tcpdump — command-line capture for servers/headless systems
# Capture all traffic on eth0, save to file
tcpdump -i eth0 -w capture.pcap

# Capture only HTTP (port 80) traffic
tcpdump -i eth0 port 80 -w http.pcap

# Capture traffic to/from a specific host
tcpdump -i eth0 host 192.168.1.50

# Read a saved capture file
tcpdump -r capture.pcap

# Decode packet payloads as ASCII (-A) or hex+ASCII (-X)
tcpdump -i eth0 -A port 80

# Analysis workflow for incident response:
1. tcpdump -r capture.pcap -nn | head -100     # quick overview
2. Open in Wireshark for GUI analysis
3. Statistics > Protocol Hierarchy               # what protocols are present?
4. Statistics > Conversations                    # who talked to whom?
5. Follow TCP Stream                             # reassemble full conversations`}</Block>
      </Part>

      <HR />

      <Part>
        <H>SSL Stripping — Downgrading HTTPS to HTTP</H>
        <P>
          TLS encryption protects intercepted traffic — but only if the connection is actually using TLS. <Hl>SSL stripping</Hl>, developed by Moxie Marlinspike in 2009, exploits the moment before TLS is established. When a user types "amazon.com" (without https://), the browser initially sends a plaintext HTTP request. The attacker intercepts this, makes their own HTTPS connection to the real server, then serves the victim a plain HTTP page. The victim's browser shows a padlock-less connection and many users don't notice.
        </P>
        <Block>{`SSL Stripping flow:

  Victim's browser:  HTTP GET http://amazon.com/
                     ↓
  Attacker:          Receives plaintext HTTP request
                     Makes HTTPS connection to real amazon.com
                     Receives HTTPS response
                     Rewrites all "https://" links → "http://"
                     Serves modified HTTP response to victim
                     ↓
  Victim sees:       Page looks normal but browser bar shows http://
                     No padlock. All form submissions in plaintext.

Defence — HSTS (HTTP Strict Transport Security):
  Server sends header:
    Strict-Transport-Security: max-age=31536000; includeSubDomains; preload

  Browser remembers: "Only ever use HTTPS for this domain"
  HSTS preload list: browser ships with ~100K domains hard-coded as HTTPS-only

  SSL stripping fails against HSTS-preloaded domains because the browser
  refuses to send the initial HTTP request at all.`}</Block>
        <P>
          HSTS preloading is the definitive defence against SSL stripping. Major sites (google.com, facebook.com, amazon.com) are all on the preload list. As a developer, you should submit your domain to <Hl>hstspreload.org</Hl> once you're committed to full HTTPS deployment.
        </P>
      </Part>

      <HR />

      <Part>
        <H>DNS Hijacking — Redirecting at the Name Layer</H>
        <P>
          While ARP poisoning works at Layer 2 within a LAN, <Hl>DNS hijacking</Hl> works at Layer 7 and can affect victims at any scale — from a single device to an entire country's internet traffic. DNS hijacking redirects DNS queries so that a legitimate domain name resolves to an attacker-controlled IP address.
        </P>
        <table style={s.table}>
          <thead>
            <tr>
              <th style={s.th}>Hijacking Method</th>
              <th style={s.th}>How It Works</th>
              <th style={s.th}>Scale</th>
              <th style={s.th}>Example</th>
            </tr>
          </thead>
          <tbody>
            {[
              ['Local host file', 'Edit /etc/hosts or C:\\Windows\\System32\\drivers\\etc\\hosts', 'Single device', 'Malware adds bank.com → 1.2.3.4'],
              ['Router/DHCP poisoning', 'Compromise router, change DNS server setting pushed via DHCP', 'Local network', 'ISP router compromise 2018 (Brazil)'],
              ['DNS cache poisoning', 'Inject forged DNS responses into a recursive resolver\'s cache', 'Thousands of users', 'Kaminsky attack (2008), patched by randomising ports'],
              ['Rogue DNS server (MITM)', 'Intercept DNS queries on the wire, reply with spoofed answers', 'LAN segment', 'After ARP poisoning, intercept UDP port 53'],
              ['Authoritative NS compromise', 'Hack the authoritative nameserver or DNS registrar account', 'All users worldwide', 'DNSpionage (2019) — ME/EU government domains'],
              ['BGP hijacking', 'Announce more-specific routes for DNS server IP ranges', 'Regional/global', 'Amazon Route53 hijack (2018) — MyEtherWallet'],
            ].map(([m, h, sc, ex]) => (
              <tr key={m}>
                <td style={{ ...s.td, color: C, fontWeight: 600 }}>{m}</td>
                <td style={s.td}>{h}</td>
                <td style={s.td}>{sc}</td>
                <td style={s.td}>{ex}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <P>
          The <Hl>Kaminsky attack</Hl> (2008) was the most significant DNS vulnerability discovered before DNSSEC became widespread. Dan Kaminsky found that an attacker could flood a recursive resolver with forged DNS responses (guessing the transaction ID), poisoning its cache with a malicious NS record that redirected an entire domain. The fix was <Hl>source port randomisation</Hl> — making the attacker guess both the 16-bit transaction ID and the 16-bit source port, expanding the brute-force space from 65,536 to 4 billion combinations.
        </P>
        <Block>{`DNS cache poisoning (Kaminsky attack concept):

Target: Poison resolver's cache for example.com

Attacker races to respond to resolver's upstream query:
  1. Trigger resolver to look up random.example.com
  2. Flood with forged responses:
     Transaction ID: 0001, Answer: example.com NS → evil.ns.
     Transaction ID: 0002, Answer: example.com NS → evil.ns.
     Transaction ID: 0003, Answer: example.com NS → evil.ns.
     ... (65536 attempts — 50% success in ~few seconds on old resolvers)
  3. First correct guess poisons cache for TTL duration
  4. All users using this resolver now resolve example.com via evil.ns

Defences:
  - DNSSEC: Authoritative server signs records with private key
             Resolver verifies signature — forged responses rejected
  - DNS-over-HTTPS (DoH) / DNS-over-TLS (DoT): Encrypt DNS transport
  - Source port randomisation: Already standard since Kaminsky disclosure
  - 0x20 encoding: Mix case in queries (exAmple.com) — forged responses
                   must match exactly, harder to predict`}</Block>
        <ProTip>
          Check if a DNS resolver validates DNSSEC: <code>dig +dnssec sigfail.verteiltesysteme.net</code>. If you get SERVFAIL, DNSSEC validation is working. If you get NOERROR, the resolver is not validating signatures and is vulnerable to Kaminsky-style attacks.
        </ProTip>
      </Part>

      <HR />

      <Part>
        <H>BGP Hijacking — Rerouting the Internet</H>
        <P>
          <Hl>Border Gateway Protocol (BGP)</Hl> is how internet routers exchange routing information — which IP prefixes are reachable via which autonomous systems (ASes). There are ~75,000 autonomous systems on the internet, each announcing their IP address ranges. BGP assumes every peer is honest. It has no cryptographic authentication of route announcements.
        </P>
        <P>
          A BGP hijack happens when an attacker (or misconfigured router) announces a more-specific prefix for someone else's IP space. Because BGP prefers the most-specific prefix, traffic destined for the victim's IPs gets routed to the attacker's network instead.
        </P>
        <Block>{`BGP hijacking concept:

Legitimate: Amazon AS16509 announces 54.0.0.0/8 (owns this range)
            All internet traffic to 54.x.x.x routes to Amazon

Hijack:     Attacker AS99999 announces 54.239.0.0/16
            More-specific prefix — BGP prefers it
            Traffic to 54.239.x.x now goes to attacker

Real incident — MyEtherWallet (April 2018):
  - Amazon Route53 DNS servers are on specific IP ranges
  - Attackers hijacked Route53 DNS server IPs via BGP
  - All MyEtherWallet DNS queries went to attacker's DNS server
  - Attacker returned their own IP for myetherwallet.com
  - Victims landed on phishing site with invalid TLS cert
  - Users who clicked through lost ~$152,000 in cryptocurrency

  Duration: ~2 hours before detected and withdrawn
  Affected: ~1,300 Ethereum transactions

Defence — RPKI (Resource Public Key Infrastructure):
  - Each IP prefix owner signs a Route Origin Authorization (ROA)
  - ROA states: "Only AS16509 may announce 54.0.0.0/8"
  - Routers with RPKI validation reject unauthorized announcements
  - Adoption: ~50% of global prefixes covered (growing)

Detection:
  - BGPmon.net: Real-time BGP hijacking alerts
  - RIPE NCC RIS: Route collector network with historical data
  - Prefix hijack detection: Unexpected new origin AS in BGP table`}</Block>
      </Part>

      <HR />

      <Part>
        <H>TCP-Level Attacks — SYN Floods and Session Hijacking</H>
        <P>
          TCP's handshake and state machine expose two classic attack surfaces: the <Hl>SYN flood</Hl> exhausts server connection state, and <Hl>TCP session hijacking</Hl> exploits predictable or known sequence numbers to inject data into an established connection.
        </P>
        <Block>{`TCP 3-way handshake:
  Client → Server: SYN (seq=100)
  Server → Client: SYN-ACK (seq=200, ack=101)
  Client → Server: ACK (ack=201)
  ← Connection established ←

SYN flood attack:
  Attacker sends thousands of SYN packets (spoofed source IPs)
  Server allocates state for each half-open connection (SYN_RCVD)
  Server sends SYN-ACK to spoofed IPs — never gets ACK back
  Half-open connections fill the backlog queue
  Legitimate connections are dropped: connection timed out

SYN flood defence — SYN Cookies:
  Server does NOT allocate state on receiving SYN
  Server encodes session info into the sequence number of SYN-ACK
  If client sends ACK with correct sequence number → legitimate
  Only then does server allocate connection state
  Cost: server state only for completed handshakes
  Enable: sysctl net.ipv4.tcp_syncookies=1 (Linux)

TCP session hijacking:
  Requires: MITM position + ability to observe sequence numbers

  1. Attacker observes Alice ↔ Server connection
     Learns current seq/ack numbers from captured packets
  2. Attacker sends forged TCP segment to Server:
     Source IP: Alice's IP
     Seq number: correct next expected value
     ACK number: correct value
     Data: malicious payload (e.g., rm -rf /tmp/*)
  3. Server accepts the packet as if from Alice
  4. Alice receives unexpected ACK, connection desynchronises

  Defence: TLS encrypts payload AND authenticates source — forged
           segment payload is rejected by TLS record layer`}</Block>
        <P>
          Modern operating systems generate cryptographically random initial sequence numbers (ISNs), which makes blind TCP session hijacking (without a MITM position) extremely difficult. But if an attacker already has a MITM position and can observe the sequence numbers in plaintext, the sequence randomness doesn't help — which is why the fundamental defence is TLS, not TCP-level mitigations.
        </P>
      </Part>

      <HR />

      <Part>
        <H>Network Reconnaissance — nmap, Wireshark, tcpdump</H>
        <P>
          Before an attacker launches network attacks, they map the target network. The three most important tools are <Hl>nmap</Hl> (host discovery and port scanning), <Hl>Wireshark</Hl> (packet capture and analysis), and <Hl>tcpdump</Hl> (command-line capture). Defenders use the same tools for network inventory and incident response.
        </P>
        <Block>{`# nmap — network mapper
# Host discovery (find live hosts on subnet)
nmap -sn 192.168.1.0/24

# Port scan (top 1000 ports)
nmap -sV 192.168.1.10

# Full port scan with OS detection and service versions
nmap -sV -sC -O -p- 192.168.1.10

# Stealthy SYN scan (doesn't complete handshake)
nmap -sS 192.168.1.10

# UDP scan (slower — common for DNS/SNMP discovery)
nmap -sU -p 53,161 192.168.1.10

# Aggressive scan with scripts
nmap -A 192.168.1.10

# Output to all formats (grepable, XML, normal)
nmap -oA scan_results 192.168.1.0/24

# nmap scan types and what they tell you:
#  -sS  SYN scan:    open (SYN-ACK), closed (RST), filtered (no response)
#  -sV  Version:     banner grab to identify service and version
#  -sC  Scripts:     run default NSE scripts (vuln checks, info gathering)
#  -O   OS detect:   fingerprint OS from TCP/IP stack behaviour`}</Block>
        <Block>{`# Interpreting nmap output:
PORT     STATE    SERVICE  VERSION
22/tcp   open     ssh      OpenSSH 8.9p1 Ubuntu
80/tcp   open     http     nginx 1.22.0
443/tcp  open     ssl/http nginx 1.22.0
3306/tcp filtered mysql
8080/tcp closed   http-proxy

# open:     Service is listening, connection accepted
# filtered: Firewall dropping packets (no response)
# closed:   Port reachable but no service listening

# Common ports to check:
21   FTP (often anonymous login)
22   SSH (brute force target)
23   Telnet (plaintext, should not exist)
25   SMTP (relay open?)
53   DNS (zone transfer possible?)
80   HTTP (application enumeration)
443  HTTPS
445  SMB (EternalBlue, ransomware spread)
3306 MySQL (exposed to internet?)
3389 RDP (BlueKeep, brute force)
5985 WinRM (lateral movement)
6379 Redis (often no auth)
9200 Elasticsearch (often no auth)`}</Block>
        <Callout type="warning">
          Only run nmap against systems you own or have explicit written authorisation to test. Unauthorised port scanning is illegal in most jurisdictions under computer fraud laws (18 U.S.C. § 1030 in the US). Many organisations treat incoming nmap scans as active attacks and will report them to your ISP.
        </Callout>
      </Part>

      <HR />

      <Part>
        <H>Rogue Access Point and Evil Twin Attacks</H>
        <P>
          Wireless networks add an entirely new interception surface. A <Hl>rogue access point</Hl> is an unauthorised Wi-Fi AP plugged into a corporate network — it gives attackers a wireless entry point into the wired LAN. An <Hl>evil twin</Hl> is a Wi-Fi AP that impersonates a legitimate network by using the same SSID (and optionally the same BSSID), tricking clients into connecting to the attacker instead.
        </P>
        <Block>{`Evil twin attack flow:

1. Reconnaissance
   Attacker discovers target SSID: "CoffeeShop_WiFi"
   Notes the BSSID (MAC): aa:bb:cc:dd:ee:ff
   Notes the channel: 6

2. Create evil twin AP
   Set up hostapd with SSID "CoffeeShop_WiFi"
   Optionally spoof BSSID to match legitimate AP
   Broadcast on same or adjacent channel with higher power

3. Deauthentication attack (force clients to reconnect)
   Send spoofed 802.11 deauth frames to clients on legitimate AP
   Clients disconnect and scan for same SSID
   Evil twin AP is loudest — clients connect to attacker

4. Capture credentials
   If captive portal: clients log in → harvest credentials
   If WPA2: capture 4-way handshake → offline crack
   If open network: MITM all traffic

WPA2 handshake capture:
  airmon-ng start wlan0           # enable monitor mode
  airodump-ng wlan0mon            # scan for networks
  airodump-ng -c 6 --bssid aa:bb:cc:dd:ee:ff -w capture wlan0mon
  aireplay-ng --deauth 10 -a aa:bb:cc:dd:ee:ff wlan0mon
  # When client reconnects, WPA2 4-way handshake is captured
  # Offline crack: hashcat -m 22000 capture.hc22000 wordlist.txt

Defence:
  - 802.1X (WPA3-Enterprise): Mutual authentication — clients verify AP cert
  - Wi-Fi deauth protection: 802.11w (Management Frame Protection)
  - Corporate: Wireless IDS (detect rogue APs and deauth floods)
  - Always use VPN on untrusted Wi-Fi (tunnel encrypts everything)`}</Block>
      </Part>

      <HR />

      <Part>
        <H>Detection and Defence — Layered Network Security</H>
        <P>
          Network attacks require a <Hl>layered defence</Hl>. No single control stops all attack variants. The goal is to make each attack either impossible (cryptographic controls) or detectable (monitoring controls) before significant damage occurs.
        </P>
        <table style={s.table}>
          <thead>
            <tr>
              <th style={s.th}>Attack</th>
              <th style={s.th}>Prevention</th>
              <th style={s.th}>Detection</th>
            </tr>
          </thead>
          <tbody>
            {[
              ['ARP Poisoning', 'Dynamic ARP Inspection (DAI) on managed switches; static ARP entries for gateways', 'ARP watch tools; Wireshark filter arp.duplicate-address-detected'],
              ['DNS Hijacking', 'DNSSEC validation; DNS-over-HTTPS; monitor DNS changes', 'Alert on unexpected DNS resolver changes; compare DNS results from multiple sources'],
              ['SSL Stripping', 'HSTS + HSTS preload; force HTTPS redirects at load balancer', 'Monitor for HTTP traffic on port 80 for domains that should be HTTPS-only'],
              ['BGP Hijacking', 'RPKI + Route Origin Validation; prefix filtering on BGP peers', 'BGPmon.net alerts; detect unexpected ASN in path for your prefixes'],
              ['Packet Sniffing', 'Encrypt everything (TLS 1.3 everywhere); network segmentation', 'Promiscuous mode detection (send ARP to random MAC, see if host responds)'],
              ['SYN Flood', 'SYN cookies; rate limiting; DDoS scrubbing services (Cloudflare, AWS Shield)', 'Monitor for high SYN/SYN-ACK ratio; netstat showing thousands of SYN_RCVD'],
              ['Rogue AP', '802.1X port authentication; wireless IDS; Management Frame Protection', 'WIDS scanning for unauthorised SSIDs; detect deauth floods'],
            ].map(([a, p, d]) => (
              <tr key={a}>
                <td style={{ ...s.td, color: C, fontWeight: 600 }}>{a}</td>
                <td style={s.td}>{p}</td>
                <td style={s.td}>{d}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <Block>{`# Dynamic ARP Inspection (DAI) — Cisco switch config
ip dhcp snooping                     # Enable DHCP snooping (builds IP-MAC table)
ip dhcp snooping vlan 10             # On VLAN 10

interface GigabitEthernet0/1         # Uplink to router
 ip dhcp snooping trust              # Trust this port (allow all ARP)

interface GigabitEthernet0/2         # Client port
 ip arp inspection limit rate 100    # Max 100 ARP packets/second
 ! Untrusted by default — DAI validates against DHCP snooping table

# Network Segmentation — limit blast radius
# If ARP poisoning succeeds on VLAN 10, attacker can only
# MITM traffic within VLAN 10. Cross-VLAN traffic goes
# through a router/firewall where ARP doesn't apply.

# Zero Trust Network Access (ZTNA):
# Assume network is hostile. Authenticate every connection.
# Mutual TLS (mTLS) — both sides present certificates
# Software-defined perimeter — no implicit trust by network location`}</Block>
      </Part>

      <HR />

      <Part>
        <H>Workplace Scenario — MITM Detected on Corporate Wi-Fi</H>
        <P>
          A financial services firm's SOC receives an alert from their network anomaly detection system: a workstation on the trading floor (192.168.50.45) is sending ARP replies at 800 packets/second. Normal hosts send fewer than 10 ARP packets per minute.
        </P>
        <Block>{`Incident timeline:

09:14 — Alert: ARP flood from 192.168.50.45 (MAC: de:ad:be:ef:00:01)
         "Possible ARP cache poisoning attack detected"

09:15 — SOC analyst checks Wireshark capture from network TAP:
         Frame 4412: 192.168.50.45 tells 192.168.50.12:
           "192.168.50.1 (default gateway) is at de:ad:be:ef:00:01"
         Frame 4413: 192.168.50.45 tells 192.168.50.1:
           "192.168.50.12 is at de:ad:be:ef:00:01"
         → Bidirectional ARP poisoning confirmed

09:16 — Check what's on 192.168.50.45:
         DHCP lease: "TRADING-WS-07" (Windows workstation)
         Asset DB: Assigned to trader John D., desk 4-C

09:17 — Was the machine compromised, or is this a rogue device?
         MAC de:ad:be:ef:00:01 is NOT in DHCP snooping table
         DHCP snooping table shows TRADING-WS-07 has MAC 08:00:27:1a:2b:3c
         → Different MAC — rogue device plugged into desk 4-C's port

09:18 — Check switch port:
         Switch port GigE2/0/47 shows TWO MACs (port-security violation)
         08:00:27:1a:2b:3c (legitimate WS)
         de:ad:be:ef:00:01 (attacker device)

09:19 — Physical investigation: Security camera footage shows
         unknown laptop plugged into network jack under desk 4-C at 08:52

09:20 — Remediation:
         Shutdown port GigE2/0/47 (isolates rogue device)
         Enable port-security max-mac-addresses 1 on all access ports
         Review: was any plaintext traffic captured during 09:00–09:19?
         Check: HTTP traffic in 19-minute window for credential exposure`}</Block>
        <P>
          The attacker had physical access — a 19-minute window between plugging in the rogue laptop and detection. The key defences that limited the damage: DHCP snooping identified the MAC mismatch, DAI generated the ARP flood alert, and most internal traffic used TLS so credential exposure was limited to legacy HTTP endpoints.
        </P>
      </Part>

      <HR />

      <Part>
        <H>Interview Questions</H>

        <IQ q="Explain how ARP poisoning enables a MITM attack. What does the attacker need to do to stay invisible?">
          ARP poisoning works by exploiting ARP's lack of authentication. The attacker sends gratuitous ARP replies to both victim and gateway, claiming their own MAC address corresponds to the other party's IP. Both devices update their ARP caches, and all traffic between them is routed through the attacker's machine.
          <br /><br />
          To stay invisible, the attacker must do two things. First, continuously resend the spoofed ARP replies — ARP cache entries expire (typically 10-20 minutes), and the legitimate devices would refresh their caches from real ARP traffic if the attacker stopped. Second, enable IP forwarding on their machine (echo 1 &gt; /proc/sys/net/ipv4/ip_forward on Linux) so that intercepted packets are actually forwarded to their destination. Without forwarding, packets are dropped at the attacker's machine and the victim's connections fail — immediately obvious. With forwarding, everything works normally from the victim's perspective while the attacker reads all traffic.
        </IQ>

        <IQ q="What is DNSSEC and how does it prevent DNS cache poisoning?">
          DNSSEC (DNS Security Extensions) adds cryptographic signatures to DNS records. The authoritative nameserver for a domain signs each DNS record (A, AAAA, MX, etc.) with its private key. When a DNSSEC-validating recursive resolver receives a DNS response, it retrieves the corresponding public key (DNSKEY record) and verifies the signature on the record.
          <br /><br />
          This prevents cache poisoning because a forged response cannot include a valid signature — the attacker doesn't have the authoritative server's private key. Without a valid signature, a validating resolver rejects the response with SERVFAIL. The Kaminsky attack and similar techniques are defeated because the resolver won't accept any DNS response that lacks a valid DNSSEC signature chain from the root zone down to the authoritative zone.
          <br /><br />
          DNSSEC doesn't encrypt DNS traffic (that's DoH/DoT), but it provides data integrity and authenticity. The main limitation is that adoption is still incomplete — roughly 30-40% of DNS zones are signed, and not all resolvers validate. DNSSEC is critical but not universally deployed.
        </IQ>

        <IQ q="A user on your corporate network reports that google.com is loading slowly and shows a certificate warning. What do you investigate first?">
          A certificate warning combined with slow loading is a strong indicator of either a MITM attack or DNS hijacking. I'd investigate in this order: First, run <code>arp -a</code> on the affected workstation and compare the gateway's MAC address against the known-good MAC. If they differ, ARP poisoning is occurring. Second, run <code>nslookup google.com</code> and <code>nslookup google.com 8.8.8.8</code> — if the first returns a different IP than the second, the local DNS resolver has been poisoned or the machine's DNS configuration has been changed. Third, inspect the certificate presented by google.com — an invalid cert could indicate SSL interception by a proxy (corporate DLP tools do this legitimately) or an attacker's interception device. Check the issuing CA — a corporate CA is expected; an unknown CA is suspicious. Finally, check the workstation's network adapter settings for unexpected DNS servers or proxy configurations, which can indicate malware.
        </IQ>

        <IQ q="What is the difference between a SYN flood and a volumetric DDoS attack? How would you defend against each?">
          A SYN flood is a protocol attack that exhausts server-side connection state. Each SYN packet causes the server to allocate a half-open connection entry and send a SYN-ACK. With spoofed source IPs, the ACK never arrives, so the half-open table fills up and legitimate connections are rejected. This can be accomplished with relatively low bandwidth. Defence: SYN cookies (server embeds state in sequence number, allocates resources only on ACK), and rate limiting SYN packets per source IP.
          <br /><br />
          A volumetric DDoS saturates bandwidth — flooding the network link with UDP, ICMP, or amplification traffic (DNS amplification, NTP amplification). The server's connection state is irrelevant; the pipe is simply full. Defence requires upstream mitigation — cloud scrubbing services (Cloudflare Magic Transit, AWS Shield Advanced, Akamai Prolexic) that absorb traffic at the network edge before it reaches your infrastructure. BGP anycast and scrubbing centres are the primary mitigation; local firewall rules are insufficient because the bandwidth is already consumed upstream.
        </IQ>

        <IQ q="How does RPKI help prevent BGP hijacking? What are its limitations?">
          RPKI (Resource Public Key Infrastructure) allows IP address holders to cryptographically attest which Autonomous Systems are authorised to announce their prefixes. An organisation creates a Route Origin Authorization (ROA) that states, for example, "Only AS16509 may announce 54.0.0.0/8." This ROA is signed with the organisation's certificate, which chains up to a Regional Internet Registry (ARIN, RIPE NCC, etc.).
          <br /><br />
          Routers that perform Route Origin Validation (ROV) check incoming BGP announcements against the signed ROA database. If a router announces a prefix that doesn't match any ROA, or matches an ROA that names a different origin AS, the route is marked "invalid" and dropped.
          <br /><br />
          Limitations: RPKI only validates the origin AS, not the full AS path. A more sophisticated attacker that hijacks BGP while staying in the legitimate AS path (path prepending attacks, route leaks) is not prevented. Adoption is also incomplete — only about 50% of global routes have ROAs, and not all routers perform ROV. Both the ROA publisher and the validating router must participate for the protection to work. Full BGP security requires BGPsec (which validates the full AS path) but BGPsec adoption is negligible due to performance and operational complexity.
        </IQ>
      </Part>

      <HR />

      <Part>
        <H>Error Library — Common Mistakes</H>

        <Err
          title="Assuming HTTPS prevents MITM attacks"
          cause="HTTPS provides encryption and server authentication, but doesn't prevent the attacker from being positioned in the path. If the attacker can present a trusted certificate (via a compromised CA or a user clicking through a warning), they can still decrypt traffic. SSL stripping also downgrades the connection before TLS is established."
          fix="HSTS with preloading prevents SSL stripping by refusing the initial HTTP connection. Certificate Transparency and public key pinning (HPKP, though deprecated) detect fraudulent certs. The real defence is HTTPS + HSTS preload + monitoring for unexpected cert changes via services like crt.sh or CT log monitoring."
        />

        <Err
          title="Thinking packet sniffing only works on hubs"
          cause="A common misconception is that switched networks are safe from sniffing because switches only forward frames to the correct port. This is true for passive sniffing without a MITM position. But ARP poisoning routes traffic through the attacker's machine, making the switch topology irrelevant. The attacker sees all traffic as it transits their NIC, switch or not."
          fix="The correct protection against sniffing on switched networks is encryption — TLS for all application traffic, not segmentation alone. Layer 2 controls like DAI and port security reduce ARP poisoning risk but aren't a substitute for TLS."
        />

        <Err
          title="Relying on IP source address for authentication"
          cause="IP source addresses are trivially spoofed. UDP has no handshake and accepts packets with any source IP. TCP with a blind MITM is harder to spoof, but an attacker with network access can spoof source IPs freely for UDP-based attacks (DNS, NTP, SSDP amplification) or services that trust IPs (old NFS setups, rpcbind)."
          fix="Authenticate callers with cryptographic credentials (TLS client certificates, SSH keys, signed JWTs), not by source IP. IP allowlisting adds a layer of defence-in-depth but cannot be the primary authentication mechanism."
        />

        <Err
          title="Treating nmap as a passive reconnaissance tool"
          cause="nmap generates network traffic that appears in logs and triggers IDS alerts. Even a basic TCP connect scan (-sT) leaves entries in server access logs. Teams often underestimate how visible their nmap scans are to defenders. Running nmap against production systems during a pentest without coordination triggers incident response."
          fix="Coordinate timing and IP ranges with the client before scanning. During engagements, use scan logs to prove scope compliance. In lab environments, nmap is fully appropriate. In production, use slow timing (-T2 or -T1) and targeted port lists rather than -p- full scans, which generate massive log volumes."
        />

        <Err
          title="Thinking DNS-over-HTTPS prevents DNS hijacking"
          cause="DoH (DNS-over-HTTPS) encrypts DNS traffic in transit and prevents a network observer from seeing your queries. It does NOT prevent hijacking if the DoH resolver itself is compromised, or if malware on the endpoint modifies the hosts file directly. DoH also routes through a specific provider (Cloudflare 1.1.1.1, Google 8.8.8.8) — you're trusting that provider instead of your ISP."
          fix="DoH + DNSSEC together provide both transport security and data integrity. For endpoint protection, monitor hosts file modifications and DNS client settings changes via endpoint security tools. Neither DoH nor DNSSEC helps if malware has already established a MITM position on the host itself."
        />
      </Part>

      <HR />

      <KeyTakeaways
        items={[
          'ARP poisoning exploits the fact that ARP has no authentication — any host can claim any IP-to-MAC mapping via gratuitous ARP, and most OSes accept it without question.',
          'MITM requires two things: a mechanism to intercept traffic (ARP poisoning, rogue AP) and optionally a mechanism to decrypt it (SSL stripping, rogue CA). Without the second, TLS-encrypted traffic remains opaque.',
          'SSL stripping downgrades HTTPS to HTTP by intercepting the initial plaintext request. HSTS preloading defeats it by making the browser refuse to send HTTP requests for the domain at all.',
          'DNS cache poisoning (Kaminsky attack) floods a resolver with forged responses guessing transaction IDs. DNSSEC defeats this by requiring signatures that the attacker cannot forge.',
          'BGP hijacking announces more-specific prefixes for someone else\'s IP space, rerouting internet traffic. RPKI/ROV prevents unauthorised announcements but only covers origin AS validation, not full path.',
          'SYN cookies defend against SYN floods by encoding session state in the sequence number instead of allocating memory for half-open connections.',
          'nmap\'s -sS (SYN scan) is the most common discovery technique — it identifies open, closed, and filtered ports without completing the TCP handshake, generating less log noise than a full connect scan.',
          'Dynamic ARP Inspection (DAI) on managed switches validates ARP replies against the DHCP snooping table, dropping spoofed entries before they poison host ARP caches.',
          'Evil twin attacks on Wi-Fi combine deauthentication frames (forcing clients to disconnect) with a cloned SSID (pulling clients to connect to the attacker). 802.11w (Management Frame Protection) prevents deauth floods.',
          'The fundamental defence against most network interception attacks is encryption everywhere — TLS 1.3 for all traffic, DNSSEC for DNS integrity, DoH/DoT for DNS transport privacy, and RPKI for BGP route validity.',
        ]}
      />

      <HR />

      <div style={{ background: 'var(--code-bg)', borderRadius: 12, padding: '28px 32px', marginTop: 40 }}>
        <div style={{ fontSize: 13, color: C, fontWeight: 700, marginBottom: 8, textTransform: 'uppercase', letterSpacing: 1 }}>
          Up Next — Module 11
        </div>
        <div style={{ fontSize: 22, fontWeight: 700, color: 'var(--heading)', marginBottom: 12 }}>
          Malware Types and Behavior
        </div>
        <p style={{ ...s.p, marginBottom: 20 }}>
          In Module 11, you go inside the malware. How ransomware encrypts files and why paying doesn't guarantee recovery. How rootkits hide from the operating system at ring-0. How Remote Access Trojans (RATs) establish C2 channels, how worms self-replicate across networks, and how modern EDR tools detect each family based on behavioral signatures rather than file hashes.
        </p>
        <Link
          href="/learn/cybersecurity/malware-types-behavior"
          style={{
            display: 'inline-block',
            background: C,
            color: '#fff',
            padding: '12px 28px',
            borderRadius: 8,
            fontWeight: 700,
            fontSize: 15,
            textDecoration: 'none',
          }}
        >
          Continue to Module 11 →
        </Link>
      </div>
    </LearnLayout>
  )
}
