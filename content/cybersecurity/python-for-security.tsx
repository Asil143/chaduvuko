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

export default function Module14() {
  return (
    <LearnLayout
      title="Python for Security Engineers"
      description="Build real security tools in Python — port scanners, packet analysers, log parsers, API fuzzers, and automation scripts used daily in security work."
      section="Cybersecurity — Module 14"
      readTime="46 min"
      updatedAt="May 2026"
    >
      <Part>
        <P>
          Python is the lingua franca of security engineering. Nmap, Metasploit's Python bindings, Impacket (the AD attack toolkit), Volatility (memory forensics), SQLMap, Scapy, Burp Suite extensions, SIEM automation scripts — the security tool ecosystem runs on Python. If you're going to work in security, you need to be able to read, modify, and write Python tooling.
        </P>
        <P>
          This module is hands-on. You'll build a <Hl>port scanner from raw sockets</Hl>, a <Hl>packet analyser with Scapy</Hl>, a <Hl>log parser for threat hunting</Hl>, an <Hl>API security tester</Hl>, and a <Hl>credential checker against the HaveIBeenPwned API</Hl>. You'll understand how popular tools are structured so you can extend them. And you'll learn the Python security library ecosystem — which packages the industry actually uses and when to reach for each one.
        </P>
        <Callout type="warning">
          All tools in this module are for authorised use on systems you own or have explicit written permission to test. Running port scanners or packet captures against systems without authorisation violates computer fraud laws in most jurisdictions.
        </Callout>
      </Part>

      <HR />

      <Part>
        <H>The Security Python Ecosystem</H>
        <table style={s.table}>
          <thead>
            <tr>
              <th style={s.th}>Library</th>
              <th style={s.th}>Purpose</th>
              <th style={s.th}>Used In</th>
            </tr>
          </thead>
          <tbody>
            {[
              ['socket', 'Raw TCP/UDP connections, low-level networking', 'Port scanners, banner grabbers, custom protocols'],
              ['scapy', 'Packet crafting, sniffing, injection — any protocol', 'Network scanners, ARP poisoning, packet analysis'],
              ['requests / httpx', 'HTTP client — sessions, headers, auth', 'Web fuzzing, API testing, SSRF checks'],
              ['paramiko', 'SSH client/server in Python', 'SSH brute force, automated SSH commands'],
              ['impacket', 'Windows protocols: SMB, MSRPC, Kerberos, LDAP', 'PtH, Kerberoasting, DCSync (the library behind secretsdump)'],
              ['cryptography', 'TLS, AES, RSA, hashing — production-grade crypto', 'Implement TLS clients, verify certs, encrypt at rest'],
              ['pyOpenSSL / ssl', 'TLS certificate inspection and SSL client', 'Certificate transparency monitoring, TLS analysis'],
              ['pwntools', 'CTF and binary exploitation toolkit', 'Buffer overflow exploitation, shellcode, packing'],
              ['volatility3', 'Memory forensics — parse Windows/Linux memory dumps', 'Incident response, malware analysis'],
              ['yara-python', 'Run YARA signature rules against files/memory', 'Malware detection, threat hunting'],
              ['ldap3', 'LDAP client — enumerate Active Directory', 'AD enumeration, BloodHound data collection'],
              ['pyshark', 'Wireshark/tshark Python bindings', 'Parse pcap files, automated traffic analysis'],
            ].map(([lib, purpose, used]) => (
              <tr key={lib}>
                <td style={{ ...s.td, color: C, fontWeight: 600, fontFamily: 'monospace' }}>{lib}</td>
                <td style={s.td}>{purpose}</td>
                <td style={s.td}>{used}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Part>

      <HR />

      <Part>
        <H>Project 1 — TCP Port Scanner</H>
        <P>
          Understanding how nmap works at the socket level lets you write custom scanners for specific scenarios — faster scans of a known port set, scanners that blend with specific traffic patterns, or scanners that collect banner data in custom ways.
        </P>
        <Block>{`# port_scanner.py — threaded TCP port scanner from raw sockets
import socket
import concurrent.futures
import sys
from datetime import datetime

def scan_port(host: str, port: int, timeout: float = 1.0) -> tuple[int, bool, str]:
    """Returns (port, is_open, banner)"""
    try:
        sock = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
        sock.settimeout(timeout)
        result = sock.connect_ex((host, port))  # 0 = connected
        if result == 0:
            # Try banner grabbing
            banner = ""
            try:
                sock.send(b"HEAD / HTTP/1.0\r\n\r\n")
                banner = sock.recv(1024).decode('utf-8', errors='ignore').split('\n')[0].strip()
            except Exception:
                pass
            return port, True, banner
        return port, False, ""
    except socket.error:
        return port, False, ""
    finally:
        sock.close()

def scan(host: str, ports: list[int], max_workers: int = 100) -> list[tuple[int, str]]:
    open_ports = []
    with concurrent.futures.ThreadPoolExecutor(max_workers=max_workers) as executor:
        futures = {executor.submit(scan_port, host, port): port for port in ports}
        for future in concurrent.futures.as_completed(futures):
            port, is_open, banner = future.result()
            if is_open:
                open_ports.append((port, banner))
    return sorted(open_ports)

if __name__ == "__main__":
    target = sys.argv[1] if len(sys.argv) > 1 else "127.0.0.1"
    port_range = range(1, 1025)  # Top 1024 ports

    print(f"Scanning {target} — {datetime.now().strftime('%H:%M:%S')}")
    results = scan(target, list(port_range))

    for port, banner in results:
        service = socket.getservbyport(port, 'tcp') if port < 1024 else "unknown"
        print(f"  {port:5}/tcp  open  {service:15}  {banner[:60]}")

    print(f"\\nFound {len(results)} open ports")`}</Block>
        <Block>{`# Usage:
python port_scanner.py 192.168.1.1

  22/tcp   open  ssh             SSH-2.0-OpenSSH_8.9p1 Ubuntu
  80/tcp   open  http            HTTP/1.1 301 Moved Permanently
 443/tcp   open  https
3306/tcp   open  mysql

Found 4 open ports

# Key concepts:
# connect_ex() returns 0 if connection succeeds (port open)
#              returns errno (non-zero) if refused/timed out
# ThreadPoolExecutor: parallel scanning — 100 threads × 1s timeout = scan 100 ports simultaneously
# Banner grabbing: send HTTP HEAD request, read first line of response`}</Block>
        <ProTip>
          The thread count / timeout tradeoff is important. 100 threads × 1.0s timeout scans 1024 ports in ~10 seconds. Increase max_workers to 500 for faster scans on reliable networks. Decrease timeout to 0.3s for LAN scans, increase to 3.0s for WAN targets.
        </ProTip>
      </Part>

      <HR />

      <Part>
        <H>Project 2 — Packet Analyser with Scapy</H>
        <P>
          <Hl>Scapy</Hl> is Python's packet manipulation library — it can craft, send, receive, and dissect packets at any protocol layer. It's used in research tools, custom protocol testing, and packet-level analysis that goes beyond what Wireshark's display filters can do.
        </P>
        <Block>{`# packet_analyser.py — capture and analyse network traffic with Scapy
from scapy.all import sniff, ARP, IP, TCP, UDP, DNS, DNSQR, DNSRR, Raw
from collections import defaultdict
from datetime import datetime

# Track statistics
stats = defaultdict(int)
dns_queries = []
http_hosts = []

def analyse_packet(pkt):
    """Callback for each captured packet"""

    # ARP — detect potential ARP poisoning
    if ARP in pkt:
        if pkt[ARP].op == 2:  # ARP reply (who-has responses)
            stats['arp_replies'] += 1
            print(f"  [ARP] {pkt[ARP].psrc} is at {pkt[ARP].hwsrc}")

    # DNS — log all queries and detect tunneling
    if DNS in pkt and DNSQR in pkt:
        qname = pkt[DNSQR].qname.decode('utf-8', errors='ignore').rstrip('.')
        stats['dns_queries'] += 1
        dns_queries.append(qname)

        # Detect DNS tunneling: subdomains > 50 chars are suspicious
        subdomain = qname.split('.')[0]
        if len(subdomain) > 50:
            print(f"  [!] Possible DNS tunnel: {qname[:80]}")
        else:
            print(f"  [DNS] Query: {qname}")

    # HTTP — extract Host header from plaintext HTTP
    if TCP in pkt and Raw in pkt:
        payload = pkt[Raw].load.decode('utf-8', errors='ignore')
        if payload.startswith(('GET ', 'POST ', 'PUT ', 'DELETE ', 'HEAD ')):
            for line in payload.split('\r\n'):
                if line.lower().startswith('host:'):
                    host = line[5:].strip()
                    http_hosts.append(host)
                    print(f"  [HTTP] {pkt[IP].src} → {host}")
                    break

    # TCP SYN flood detection
    if TCP in pkt and pkt[TCP].flags == 0x02:  # SYN flag only
        stats['syn_packets'] += 1
        if stats['syn_packets'] % 1000 == 0:
            print(f"  [!] High SYN rate: {stats['syn_packets']} SYN packets seen")

# Capture on all interfaces, filter to interesting traffic
print(f"Starting capture at {datetime.now().strftime('%H:%M:%S')}")
print("Press Ctrl+C to stop\n")

sniff(
    filter="arp or (udp port 53) or (tcp port 80) or tcp",
    prn=analyse_packet,
    store=False,           # Don't store packets in memory
    iface="eth0",         # Change to your interface
    count=0               # 0 = capture indefinitely
)`}</Block>
        <Block>{`# Offline pcap analysis — analyse saved capture files
from scapy.all import rdpcap, IP, TCP

packets = rdpcap("capture.pcap")

# Find all unique source IPs and their connection counts
from collections import Counter
sources = Counter()

for pkt in packets:
    if IP in pkt and TCP in pkt:
        if pkt[TCP].flags == 0x002:  # SYN
            sources[pkt[IP].src] += 1

# Top talkers (potential scanners or C2 beacons)
print("Top SYN sources:")
for ip, count in sources.most_common(10):
    print(f"  {ip:15} {count:6} SYN packets")

# Detect beaconing: regular interval connections from same source
from itertools import groupby
import statistics

beacon_check = defaultdict(list)
for pkt in packets:
    if IP in pkt and TCP in pkt and pkt[TCP].dport == 443:
        beacon_check[pkt[IP].src].append(float(pkt.time))

for src, times in beacon_check.items():
    if len(times) > 10:
        intervals = [t2 - t1 for t1, t2 in zip(times, times[1:])]
        stdev = statistics.stdev(intervals) if len(intervals) > 1 else 0
        mean = statistics.mean(intervals)
        if stdev < 5 and mean < 120:  # Regular interval < 2 minutes
            print(f"  [!] Possible beacon: {src} every ~{mean:.0f}s (±{stdev:.1f}s)")`}</Block>
      </Part>

      <HR />

      <Part>
        <H>Project 3 — Log Parser for Threat Hunting</H>
        <P>
          Security operations generate terabytes of logs. The ability to write targeted parsers that extract specific patterns — failed logins, privilege escalation, suspicious processes — is a core SOC analyst skill. Python's speed advantage over grep for complex multi-field correlation makes it the right tool.
        </P>
        <Block>{`# auth_log_analyzer.py — hunt for brute force and privilege escalation
import re
import sys
from collections import defaultdict
from datetime import datetime, timedelta

# Parse /var/log/auth.log (Linux SSH/sudo logs)
FAILED_SSH = re.compile(
    r'(\w+ +\d+ \d+:\d+:\d+).*Failed password for (?:invalid user )?(\S+) from (\S+)'
)
ACCEPTED_SSH = re.compile(
    r'(\w+ +\d+ \d+:\d+:\d+).*Accepted (?:password|publickey) for (\S+) from (\S+)'
)
SUDO_CMD = re.compile(
    r'(\w+ +\d+ \d+:\d+:\d+).*sudo:.*?(\S+) : TTY=\S+ ; PWD=\S+ ; USER=(\S+) ; COMMAND=(.*)'
)

def parse_auth_log(filepath: str):
    failed: defaultdict = defaultdict(list)      # ip → [timestamps]
    accepted = []
    sudo_events = []

    with open(filepath, 'r', errors='ignore') as f:
        for line in f:
            # Failed login attempts
            m = FAILED_SSH.search(line)
            if m:
                ts, user, src_ip = m.groups()
                failed[src_ip].append({'time': ts, 'user': user})
                continue

            # Successful logins
            m = ACCEPTED_SSH.search(line)
            if m:
                ts, user, src_ip = m.groups()
                accepted.append({'time': ts, 'user': user, 'ip': src_ip})
                continue

            # Sudo commands
            m = SUDO_CMD.search(line)
            if m:
                ts, user, run_as, command = m.groups()
                sudo_events.append({'time': ts, 'user': user, 'run_as': run_as, 'cmd': command})

    return failed, accepted, sudo_events

def report(filepath: str):
    failed, accepted, sudo_events = parse_auth_log(filepath)

    # Brute force: >10 failures from same IP
    print("=== Brute Force Candidates ===")
    for ip, attempts in sorted(failed.items(), key=lambda x: -len(x[1])):
        if len(attempts) >= 10:
            users = list({a['user'] for a in attempts})
            print(f"  {ip:15} {len(attempts):5} failures  Users tried: {', '.join(users[:5])}")

    # Successful logins after failures (credential stuffing success)
    print("\n=== Successful Login After Failures ===")
    failed_ips = set(failed.keys())
    for event in accepted:
        if event['ip'] in failed_ips:
            prior = len(failed[event['ip']])
            print(f"  [!] {event['ip']} logged in as {event['user']} after {prior} failures  ({event['time']})")

    # Suspicious sudo usage
    print("\n=== Sudo to Root ===")
    for event in sudo_events:
        if event['run_as'] == 'root':
            cmd_preview = event['cmd'][:80]
            print(f"  {event['user']:15} → root: {cmd_preview}  ({event['time']})")

if __name__ == "__main__":
    logfile = sys.argv[1] if len(sys.argv) > 1 else "/var/log/auth.log"
    report(logfile)`}</Block>
        <Block>{`# Windows Event Log parsing with python-evtx
# pip install python-evtx lxml

from Evtx.Evtx import Evtx
import xml.etree.ElementTree as ET

NS = '{http://schemas.microsoft.com/win/2004/08/events/event}'

def get_event_data(record) -> dict:
    """Extract fields from Windows Event XML"""
    xml_str = record.xml()
    root = ET.fromstring(xml_str)
    data = {}

    sys_elem = root.find(f'{NS}System')
    if sys_elem is not None:
        eid = sys_elem.find(f'{NS}EventID')
        data['event_id'] = eid.text if eid is not None else None
        tc = sys_elem.find(f'{NS}TimeCreated')
        data['time'] = tc.get('SystemTime') if tc is not None else None

    event_data = root.find(f'{NS}EventData')
    if event_data is not None:
        for d in event_data.findall(f'{NS}Data'):
            name = d.get('Name', '')
            data[name] = d.text

    return data

# Hunt for Event ID 4625 (failed logon) and 4624 (successful logon)
WATCH_IDS = {'4624', '4625', '4688', '4698', '4720'}

with Evtx("Security.evtx") as log:
    for record in log.records():
        evt = get_event_data(record)
        eid = evt.get('event_id')

        if eid == '4625':  # Failed logon
            print(f"[FAIL] {evt.get('TargetUserName')} from {evt.get('IpAddress')} @ {evt.get('time')}")
        elif eid == '4688':  # New process created
            cmd = evt.get('CommandLine', '')
            if any(x in cmd.lower() for x in ['mimikatz', 'vssadmin', 'wce.exe', 'pwdump']):
                print(f"[!!!] Suspicious process: {cmd[:100]}")
        elif eid == '4698':  # Scheduled task created
            print(f"[SCHED] New scheduled task: {evt.get('TaskName')} @ {evt.get('time')}")`}</Block>
      </Part>

      <HR />

      <Part>
        <H>Project 4 — API Security Tester</H>
        <P>
          API security testing involves systematically probing endpoints for common vulnerabilities: IDOR (insecure direct object references), authentication bypass, injection, excessive data exposure, and rate limit absence. A simple Python script can automate a large portion of this testing.
        </P>
        <Block>{`# api_security_tester.py — automated API vulnerability checks
import requests
import json
from urllib.parse import urljoin

BASE_URL = "https://api.example.com"  # Change to target
AUTH_TOKEN = "your_valid_token_here"

session = requests.Session()
session.headers.update({
    "Authorization": f"Bearer {AUTH_TOKEN}",
    "Content-Type": "application/json",
    "User-Agent": "SecurityTest/1.0"
})

def check_idor(endpoint_template: str, valid_id: int, test_ids: list[int]):
    """Check if endpoint leaks other users' data (IDOR)"""
    print(f"\n[IDOR] Testing {endpoint_template}")
    own_url = endpoint_template.format(id=valid_id)
    own_resp = session.get(urljoin(BASE_URL, own_url))
    own_data = own_resp.json() if own_resp.ok else {}

    for test_id in test_ids:
        if test_id == valid_id:
            continue
        url = endpoint_template.format(id=test_id)
        resp = session.get(urljoin(BASE_URL, url))
        if resp.status_code == 200:
            data = resp.json()
            # Check if we got a different user's data
            if data and data != own_data:
                print(f"  [!!!] IDOR: Got data for ID {test_id} — {str(data)[:100]}")
            else:
                print(f"  [ OK] ID {test_id} → same data or empty")
        elif resp.status_code in (401, 403):
            print(f"  [ OK] ID {test_id} → properly blocked ({resp.status_code})")
        else:
            print(f"  [?] ID {test_id} → {resp.status_code}")

def check_auth_bypass(endpoints: list[str]):
    """Check endpoints without authentication"""
    print("\n[AUTH] Testing unauthenticated access")
    unauth_session = requests.Session()  # No token

    for endpoint in endpoints:
        url = urljoin(BASE_URL, endpoint)
        resp = unauth_session.get(url)
        if resp.status_code == 200:
            size = len(resp.content)
            print(f"  [!!!] Unauth access: {endpoint} → 200 OK ({size} bytes)")
        else:
            print(f"  [ OK] {endpoint} → {resp.status_code}")

def check_rate_limiting(endpoint: str, requests_count: int = 50):
    """Check if endpoint has rate limiting"""
    print(f"\n[RATE] Testing rate limit on {endpoint}")
    url = urljoin(BASE_URL, endpoint)
    blocked = False
    for i in range(requests_count):
        resp = session.get(url)
        if resp.status_code == 429:  # Too Many Requests
            print(f"  [ OK] Rate limited after {i+1} requests")
            blocked = True
            break
        if 'retry-after' in resp.headers:
            print(f"  [ OK] Retry-After header present")
            blocked = True
            break
    if not blocked:
        print(f"  [!!!] No rate limiting detected after {requests_count} requests")

def check_verbose_errors(endpoint: str, payloads: list[dict]):
    """Check if errors reveal stack traces, SQL, or internal paths"""
    print(f"\n[ERR] Testing error verbosity on {endpoint}")
    url = urljoin(BASE_URL, endpoint)
    keywords = ['traceback', 'stack trace', 'sqlexception', 'ora-', 'mysql', 'syntax error',
                'at line', 'exception', '/home/', '/var/', 'c:\\\\', 'internal server']

    for payload in payloads:
        resp = session.post(url, json=payload)
        body = resp.text.lower()
        found = [kw for kw in keywords if kw in body]
        if found:
            print(f"  [!!!] Verbose error for {payload}: keywords={found}")
            print(f"        Response: {resp.text[:200]}")
        else:
            print(f"  [ OK] {payload} → {resp.status_code}, no verbose errors")

# Run tests
check_idor("/api/users/{id}/profile", valid_id=12345, test_ids=[1, 2, 12344, 99999])
check_auth_bypass(["/api/users", "/api/admin", "/api/reports", "/api/health"])
check_rate_limiting("/api/auth/login")
check_verbose_errors("/api/search", [
    {"q": "' OR 1=1 --"},
    {"q": "<script>alert(1)</script>"},
    {"q": "A" * 10000},
    {"id": {"$gt": ""}},  # NoSQL injection
])`}</Block>
      </Part>

      <HR />

      <Part>
        <H>Project 5 — Subdomain Enumerator</H>
        <P>
          Subdomain enumeration discovers subdomains of a target domain — often revealing development environments, staging servers, admin panels, and forgotten assets that are less well-protected than the main site. This is a core recon task in bug bounty hunting and penetration testing.
        </P>
        <Block>{`# subdomain_enum.py — enumerate subdomains via DNS brute force + CT logs
import socket
import concurrent.futures
import requests
import json
import sys

def check_subdomain(subdomain: str, domain: str) -> tuple[str, list[str]] | None:
    """Check if subdomain resolves — returns (fqdn, [IPs]) or None"""
    fqdn = f"{subdomain}.{domain}"
    try:
        ips = socket.gethostbyname_ex(fqdn)[2]
        return fqdn, ips
    except socket.gaierror:
        return None

def bruteforce_subdomains(domain: str, wordlist_path: str, max_workers: int = 50):
    """DNS brute force from wordlist"""
    print(f"[*] Brute forcing {domain} with {wordlist_path}")
    found = []

    with open(wordlist_path) as f:
        words = [line.strip() for line in f if line.strip()]

    with concurrent.futures.ThreadPoolExecutor(max_workers=max_workers) as executor:
        futures = {executor.submit(check_subdomain, word, domain): word for word in words}
        for future in concurrent.futures.as_completed(futures):
            result = future.result()
            if result:
                fqdn, ips = result
                found.append((fqdn, ips))
                print(f"  [+] {fqdn:40} {', '.join(ips)}")

    return found

def ct_log_search(domain: str) -> list[str]:
    """Query Certificate Transparency logs via crt.sh (no auth needed)"""
    print(f"\n[*] Querying CT logs for *.{domain}")
    url = f"https://crt.sh/?q=%.{domain}&output=json"
    try:
        resp = requests.get(url, timeout=30)
        entries = resp.json()
        subdomains = set()
        for entry in entries:
            name = entry.get('name_value', '')
            for sub in name.split('\n'):
                sub = sub.strip().lstrip('*.')
                if sub.endswith(f".{domain}") or sub == domain:
                    subdomains.add(sub)
        return sorted(subdomains)
    except Exception as e:
        print(f"  [!] CT log query failed: {e}")
        return []

if __name__ == "__main__":
    if len(sys.argv) < 2:
        print("Usage: python subdomain_enum.py example.com [wordlist.txt]")
        sys.exit(1)

    domain = sys.argv[1]
    wordlist = sys.argv[2] if len(sys.argv) > 2 else None

    # Method 1: Certificate Transparency logs (passive, no traffic to target)
    ct_subs = ct_log_search(domain)
    print(f"  Found {len(ct_subs)} subdomains in CT logs")
    for sub in ct_subs[:20]:
        result = check_subdomain(sub.replace(f".{domain}", ""), domain)
        if result:
            fqdn, ips = result
            print(f"  [+] {fqdn:40} {', '.join(ips)}")

    # Method 2: DNS brute force (active — generates DNS traffic)
    if wordlist:
        bruteforce_subdomains(domain, wordlist)`}</Block>
      </Part>

      <HR />

      <Part>
        <H>Project 6 — SIEM Alert Automation with Python</H>
        <P>
          Security teams often need to automate repetitive investigation tasks: enriching alerts with threat intel, correlating events across systems, and generating reports. Python's ability to call APIs and parse JSON makes it ideal for this automation layer.
        </P>
        <Block>{`# alert_enricher.py — enrich security alerts with threat intelligence
import requests
import ipaddress
import hashlib
from functools import lru_cache

VT_API_KEY = "your_virustotal_api_key"  # Free tier: 4 req/min

@lru_cache(maxsize=1000)
def virustotal_ip(ip: str) -> dict:
    """Query VirusTotal for IP reputation"""
    headers = {"x-apikey": VT_API_KEY}
    url = f"https://www.virustotal.com/api/v3/ip_addresses/{ip}"
    resp = requests.get(url, headers=headers, timeout=10)
    if not resp.ok:
        return {}
    data = resp.json().get('data', {}).get('attributes', {})
    return {
        'malicious': data.get('last_analysis_stats', {}).get('malicious', 0),
        'suspicious': data.get('last_analysis_stats', {}).get('suspicious', 0),
        'country': data.get('country', 'unknown'),
        'asn': data.get('asn', 'unknown'),
        'as_owner': data.get('as_owner', 'unknown'),
    }

@lru_cache(maxsize=1000)
def virustotal_hash(sha256: str) -> dict:
    """Query VirusTotal for file hash reputation"""
    headers = {"x-apikey": VT_API_KEY}
    url = f"https://www.virustotal.com/api/v3/files/{sha256}"
    resp = requests.get(url, headers=headers, timeout=10)
    if not resp.ok:
        return {'verdict': 'unknown'}
    data = resp.json().get('data', {}).get('attributes', {})
    stats = data.get('last_analysis_stats', {})
    malicious = stats.get('malicious', 0)
    return {
        'verdict': 'malicious' if malicious > 5 else 'suspicious' if malicious > 0 else 'clean',
        'malicious_count': malicious,
        'total_engines': sum(stats.values()),
        'name': data.get('meaningful_name', 'unknown'),
        'type': data.get('type_description', 'unknown'),
    }

def is_private_ip(ip: str) -> bool:
    try:
        return ipaddress.ip_address(ip).is_private
    except ValueError:
        return False

def enrich_alert(alert: dict) -> dict:
    """Add threat intel to a security alert"""
    enriched = alert.copy()

    # Enrich IP addresses
    for field in ('src_ip', 'dst_ip', 'remote_ip'):
        ip = alert.get(field)
        if ip and not is_private_ip(ip):
            vt = virustotal_ip(ip)
            enriched[f'{field}_intel'] = vt
            if vt.get('malicious', 0) > 3:
                enriched['priority'] = 'HIGH'
                enriched['intel_verdict'] = f"Known malicious IP ({vt['malicious']} engines)"

    # Enrich file hashes
    for field in ('file_hash', 'sha256', 'process_hash'):
        h = alert.get(field)
        if h and len(h) == 64:  # SHA-256
            vt = virustotal_hash(h)
            enriched[f'{field}_intel'] = vt
            if vt['verdict'] == 'malicious':
                enriched['priority'] = 'CRITICAL'
                enriched['intel_verdict'] = f"Known malware: {vt['name']} ({vt['malicious_count']}/{vt['total_engines']})"

    return enriched

# Example usage with a simulated alert
sample_alert = {
    'alert_id': 'ALT-20240509-1234',
    'type': 'Suspicious outbound connection',
    'src_ip': '192.168.1.50',
    'dst_ip': '185.220.101.1',  # Tor exit node
    'dst_port': 443,
    'process': 'powershell.exe',
    'process_hash': 'a665a45920422f9d417e4867efdc4fb8a04a1f3fff1fa07e998e86f7f7a27ae3',
}

result = enrich_alert(sample_alert)
import json
print(json.dumps(result, indent=2))`}</Block>
      </Part>

      <HR />

      <Part>
        <H>Security-Specific Python Patterns</H>
        <P>
          Beyond tools, certain Python patterns come up repeatedly in security code. Understanding these makes you a faster reader of existing tools and a better writer of new ones.
        </P>
        <Block>{`# Pattern 1: Safe subprocess execution (avoid shell=True)
import subprocess

# DANGEROUS — shell injection if user_input contains ; rm -rf /
subprocess.run(f"ping {user_input}", shell=True)

# SAFE — no shell, input is a list element, never interpreted as shell
subprocess.run(["ping", "-c", "1", user_input], capture_output=True, timeout=5)

# Pattern 2: Secrets from environment (never hardcode)
import os

# BAD
api_key = "sk-1234567890abcdef"

# GOOD
api_key = os.environ.get("API_KEY")
if not api_key:
    raise ValueError("API_KEY environment variable not set")

# Pattern 3: Secure random for cryptographic purposes
import secrets
import os

# BAD — random is not cryptographically secure
import random
token = ''.join(random.choices('abcdef0123456789', k=32))

# GOOD — cryptographically secure random
token = secrets.token_hex(32)        # 64-char hex string
token_b64 = secrets.token_urlsafe(32)  # URL-safe base64

# Pattern 4: Password hashing (Argon2 via argon2-cffi)
from argon2 import PasswordHasher
ph = PasswordHasher(time_cost=3, memory_cost=65536, parallelism=4)

# Hash at registration
hashed = ph.hash("user_password")  # e.g., $argon2id$v=19$m=65536,...

# Verify at login
try:
    ph.verify(hashed, "user_password")
    print("Password correct")
except Exception:
    print("Wrong password")

# Pattern 5: Certificate pinning (don't trust system CAs)
import ssl
import certifi

# Custom CA bundle or pinned certificate
context = ssl.create_default_context(cafile="pinned_cert.pem")
# OR use certifi for system-wide CA bundle
context = ssl.create_default_context(cafile=certifi.where())

import urllib.request
with urllib.request.urlopen("https://api.example.com", context=context) as r:
    data = r.read()

# Pattern 6: Timing-safe string comparison (prevent timing attacks)
import hmac

# BAD — short-circuit comparison leaks length/content via timing
if user_token == expected_token:
    grant_access()

# GOOD — constant-time comparison regardless of where strings differ
if hmac.compare_digest(user_token.encode(), expected_token.encode()):
    grant_access()`}</Block>
      </Part>

      <HR />

      <Part>
        <H>Structuring a Security Tool for Production</H>
        <P>
          Security tools used in real engagements need more than just working logic — they need proper output formatting, rate limiting, error handling, and audit logging. Here's the pattern for production-quality security tooling.
        </P>
        <Block>{`# production_tool_template.py
"""
Security tool template — use as starting point for new tools.
Always: rate limiting, structured output, error handling, audit log.
"""
import argparse
import logging
import json
import time
import sys
from datetime import datetime
from pathlib import Path

# Structured logging — outputs JSON for SIEM ingestion
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s %(levelname)s %(message)s',
    handlers=[
        logging.StreamHandler(sys.stderr),         # Progress to stderr
        logging.FileHandler(f"tool_{datetime.now().strftime('%Y%m%d_%H%M%S')}.log")
    ]
)
log = logging.getLogger(__name__)

class RateLimiter:
    """Simple token bucket rate limiter"""
    def __init__(self, requests_per_second: float):
        self.delay = 1.0 / requests_per_second
        self._last = 0.0

    def wait(self):
        elapsed = time.monotonic() - self._last
        if elapsed < self.delay:
            time.sleep(self.delay - elapsed)
        self._last = time.monotonic()

class AuditLog:
    """Write all actions to an audit trail"""
    def __init__(self, path: str):
        self.path = Path(path)

    def record(self, action: str, target: str, result: str, **kwargs):
        entry = {
            'timestamp': datetime.utcnow().isoformat() + 'Z',
            'action': action,
            'target': target,
            'result': result,
            **kwargs
        }
        with open(self.path, 'a') as f:
            f.write(json.dumps(entry) + '\n')
        log.info(f"{action} → {target}: {result}")

def parse_args():
    parser = argparse.ArgumentParser(description='Security tool description')
    parser.add_argument('target', help='Target host or IP')
    parser.add_argument('--rate', type=float, default=10.0,
                        help='Requests per second (default: 10)')
    parser.add_argument('--output', default='results.json',
                        help='Output file (default: results.json)')
    parser.add_argument('--timeout', type=int, default=5,
                        help='Connection timeout seconds (default: 5)')
    return parser.parse_args()

def main():
    args = parse_args()
    limiter = RateLimiter(args.rate)
    audit = AuditLog(f"audit_{args.target.replace('.', '_')}.jsonl")
    results = []

    log.info(f"Starting scan of {args.target}")
    audit.record('scan_start', args.target, 'initiated', rate=args.rate)

    try:
        # Your tool logic here
        pass

    except KeyboardInterrupt:
        log.info("Scan interrupted by user")
    finally:
        # Always save results, even on interruption
        with open(args.output, 'w') as f:
            json.dump(results, f, indent=2)
        audit.record('scan_end', args.target, 'completed', findings=len(results))
        log.info(f"Results written to {args.output}")

if __name__ == "__main__":
    main()`}</Block>
      </Part>

      <HR />

      <Part>
        <H>Interview Questions</H>

        <IQ q="How would you write a Python script to detect whether an HTTP API has IDOR vulnerabilities?">
          An IDOR (Insecure Direct Object Reference) test works by obtaining a valid resource ID as a legitimate user, then attempting to access resources belonging to other IDs. In Python, I'd use requests with a valid auth token to first establish what my own user's resources look like. Then I'd iterate through a set of other IDs — adjacent IDs (own_id ± 1, ± 2), small IDs (1, 2, 3 — often admin or test accounts), and large random IDs — and compare the response status codes and data.
          <br /><br />
          Key signals: a 200 response with data different from my own data means IDOR. A 403 or 404 means properly access-controlled. I also check whether the response includes identifiers that belong to other users (email addresses, usernames, account numbers). The script should log each test with timestamp, endpoint, tested ID, response status, and a summary of what data was returned — this creates evidence for the finding report and avoids having to rerun tests.
        </IQ>

        <IQ q="Explain the difference between shell=True and shell=False in subprocess calls, and why shell=True is dangerous in security tools.">
          In Python's subprocess module, shell=True passes the command to the OS shell (/bin/sh on Unix, cmd.exe on Windows) for interpretation. The shell interprets special characters: semicolons separate commands, pipe characters redirect output, backticks execute subcommands. When shell=False (the default), the command is passed directly to exec() as an argument list — no shell interpretation occurs.
          <br /><br />
          The danger in security tools: if user-controlled input flows into a shell=True command string, an attacker can inject shell metacharacters. For example, if your tool runs subprocess.run(f"nmap {'{target}'}", shell=True) and the user passes "192.168.1.1; rm -rf /", the shell executes both nmap and rm -rf /. With shell=False and a list argument (subprocess.run(["nmap", target])), the string "192.168.1.1; rm -rf /" is passed as a single argument to nmap — which nmap rejects as an invalid target, with no shell command injection. Security tools that accept user input should always use shell=False with argument lists.
        </IQ>

        <IQ q="You're writing a script to check if a user's password was in a known data breach. How do you query HaveIBeenPwned without sending the actual password?">
          HaveIBeenPwned's password API uses k-anonymity to prevent the API from ever learning the actual password. The process: compute the SHA-1 hash of the password, take the first 5 characters of the hex digest, send that 5-character prefix to the HIBP API at the /range/ endpoint. The API returns all hash suffixes that share that prefix (typically hundreds to thousands), along with how many times each appears in breaches. The client then searches the returned list for its own hash suffix (the remaining 35 characters after the prefix). If found, the count tells you how many breaches contained this password.
          <br /><br />
          The API never receives more than 5 characters of the hash — and a 5-character prefix matches thousands of different passwords, so HIBP cannot determine which specific password was checked. In Python this is about 10 lines: hashlib.sha1(password.encode()).hexdigest().upper(), split at position 5, GET request to the HIBP API with the prefix, parse the response lines for the suffix match.
        </IQ>

        <IQ q="How would you use Python's asyncio to make a port scanner significantly faster than a threaded version?">
          Threaded port scanners are limited by the GIL for CPU work, though for I/O-bound operations (socket connections) threads work reasonably well — the GIL is released during I/O. However, threads have overhead: each Python thread has a 4-8MB stack, context switching is expensive, and the OS scheduler imposes limits. With asyncio, a single thread handles thousands of concurrent connections through cooperative multitasking — there's no context switching overhead and no per-thread memory cost.
          <br /><br />
          For a port scanner: use asyncio.open_connection() which uses the event loop's non-blocking socket operations. Wrap each port check in an async function that awaits the connection attempt with a timeout. Use asyncio.gather() to run thousands of coroutines concurrently. The event loop efficiently multiplexes all pending connections — when one is waiting for a response, others proceed. With asyncio you can reasonably run 5,000-10,000 concurrent connection attempts on a capable machine, versus 500-1000 practical threads before performance degrades from scheduling overhead. The tradeoff is that asyncio code is more complex to write and debug, and all libraries called must be async-compatible.
        </IQ>

        <IQ q="How do you handle secrets (API keys, credentials) in Python security tooling?">
          The rule is simple: never hardcode secrets in source code, and never commit them to version control. The industry standard approach has three layers. First, environment variables — read secrets at runtime with os.environ.get('API_KEY'). This separates secrets from code, and the code can be open-source while secrets stay in the environment. Second, for team environments, use a secrets manager: AWS Secrets Manager, HashiCorp Vault, Azure Key Vault, or similar — the tool authenticates to the secrets manager with a service identity (IAM role, workload identity) and retrieves secrets at startup. Third, for local development, .env files loaded by python-dotenv are acceptable — but .env must be in .gitignore and never committed.
          <br /><br />
          Additional practices: rotate secrets regularly, use different secrets per environment (dev/staging/prod), prefer short-lived secrets (OIDC tokens, AWS assumed roles with 1-hour tokens) over long-lived API keys, and audit secret access via the secrets manager's access logs. For tools that need credentials for target systems (like an AD enumeration script), prompt for the password at runtime rather than storing it — or use OS credential storage (keyring library on macOS/Windows/Linux).
        </IQ>
      </Part>

      <HR />

      <Part>
        <H>Error Library — Common Mistakes</H>

        <Err
          title="Using shell=True with any input that touches user-controlled data"
          cause="Shell metacharacters (;, |, &, $(), backticks) in user input become command injections when passed to a shell. A port scanner that runs subprocess.run(f'nmap {target}', shell=True) lets an attacker run arbitrary commands by providing a target like '127.0.0.1; cat /etc/shadow'."
          fix="Always use shell=False (the default) and pass command arguments as a list: subprocess.run(['nmap', '-sV', target]). The string target is then treated as a literal argument to nmap, never parsed by a shell. This is safe regardless of what target contains."
        />

        <Err
          title="Using random instead of secrets for security-sensitive values"
          cause="Python's random module uses the Mersenne Twister PRNG, which is not cryptographically secure. Its output can be predicted if an attacker observes enough output. Using random for session tokens, CSRF tokens, API keys, or temporary passwords creates guessable values."
          fix="Use the secrets module (Python 3.6+) for all security-sensitive random values: secrets.token_hex(), secrets.token_urlsafe(), secrets.choice(). For cryptographic key generation, use os.urandom() or the cryptography library. The secrets module is backed by the OS CSPRNG (/dev/urandom on Linux, CryptGenRandom on Windows)."
        />

        <Err
          title="Catching bare exceptions and silently continuing in security tools"
          cause="Security tools often process large batches (thousands of IPs, millions of log lines). Developers add except Exception: pass to keep the tool running, inadvertently swallowing errors that indicate bugs, encoding issues, or unexpected data — leading to silently incomplete results that look complete."
          fix="Log exceptions explicitly: except Exception as e: log.warning(f'Failed for {target}: {e}'). For critical operations, let exceptions propagate. For batch operations, collect failures in a list and report them in the summary: 'Processed 10,000 items, 47 errors (see errors.log)'. Silent failures in security tools lead to false confidence."
        />

        <Err
          title="Not rate limiting outbound requests in automated tools"
          cause="A script that fires 1,000 API requests per second will quickly exhaust rate limits, get IP-banned, trigger WAF blocks, or violate the target API's terms of service. In penetration testing, this also generates massive noise that triggers all the client's detections — defeating the purpose of a quiet assessment."
          fix="Build rate limiting into every tool that makes outbound requests: a simple time.sleep(delay) between requests, or a token bucket limiter class. For API testing, respect the target's rate limit headers (X-RateLimit-Remaining, Retry-After). Make rate the configurable — expose a --rate flag so operators can tune it per engagement."
        />

        <Err
          title="Writing security output only to stdout without an audit trail"
          cause="When a tool finds a vulnerability or performs an action (a successful login in a credential check, a packet injection, a file access), that finding needs to be reproducible and documented. Printing to stdout means results are lost if the terminal closes, can't be easily correlated with other evidence, and provide no timestamp record."
          fix="Write structured output (JSON, JSONL) to a file alongside human-readable stdout. Include timestamps with every finding. For penetration testing tools, maintain an audit log of every action taken — this is both legally important (proves scope compliance) and operationally useful when writing the final report."
        />
      </Part>

      <HR />

      <KeyTakeaways
        items={[
          'Python is the security industry\'s primary scripting language. Impacket, Scapy, Volatility, pwntools, and most SOC automation scripts are Python. Reading and writing security Python is a core professional skill.',
          'socket.connect_ex() returns 0 for open ports and errno for closed/filtered — the basis of every Python port scanner. Thread pools (ThreadPoolExecutor) parallelize the I/O-bound work efficiently.',
          'Scapy operates at every protocol layer. It can craft ARP replies, forge DNS responses, sniff packets, and reassemble TCP streams — all from Python. It\'s the Swiss Army knife of network security scripting.',
          'subprocess.run() with shell=False and a list of arguments prevents command injection — the target string is never interpreted by a shell. Always use this pattern when any part of the command comes from user input.',
          'The secrets module provides cryptographically secure random values for tokens, passwords, and keys. The random module is not cryptographically secure and must never be used for security-sensitive values.',
          'The HaveIBeenPwned API uses k-anonymity — only the first 5 characters of the SHA-1 hash are sent, so the API never learns what password was checked. Integrate this at registration and password change.',
          'Rate limiting is not optional in automated security tools. Unconstrained tools get IP-banned, trigger WAFs, violate terms of service, and generate so much noise they defeat stealth engagements.',
          'Structured JSON output + timestamped audit logs are production requirements for security tooling. Finding results must be reproducible, documented, and timestamped for report writing and legal compliance.',
          'Security tool patterns: use os.environ for secrets (never hardcode), hmac.compare_digest for constant-time comparison, ssl context with certifi for TLS verification, argon2 for password hashing.',
          'asyncio port scanners can run 5,000-10,000 concurrent connection attempts on capable hardware — an order of magnitude beyond practical thread pools, with lower memory overhead per concurrent connection.',
        ]}
      />

      <HR />

      <div style={{ background: 'var(--code-bg)', borderRadius: 12, padding: '28px 32px', marginTop: 40 }}>
        <div style={{ fontSize: 13, color: C, fontWeight: 700, marginBottom: 8, textTransform: 'uppercase', letterSpacing: 1 }}>
          Up Next — Module 15
        </div>
        <div style={{ fontSize: 22, fontWeight: 700, color: 'var(--heading)', marginBottom: 12 }}>
          Networking Deep Dive
        </div>
        <p style={{ ...s.p, marginBottom: 20 }}>
          In Module 15, you go deeper into the protocols that underpin everything. How TCP/IP works at the segment level, how routing decisions are made, how firewalls inspect packets versus stateful session tracking, how NAT works and where it breaks security assumptions, and how modern zero-trust network architectures are structured — and why they make traditional perimeter security obsolete.
        </p>
        <Link
          href="/learn/cybersecurity/networking-deep-dive"
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
          Continue to Module 15 →
        </Link>
      </div>
    </LearnLayout>
  )
}
