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

function Part({ children }: { children: React.ReactNode }) { return <div style={{ marginBottom: 48 }}>{children}</div> }
function H({ children }: { children: React.ReactNode }) { return <h2 style={s.h}>{children}</h2> }
function P({ children }: { children: React.ReactNode }) { return <p style={s.p}>{children}</p> }
function Hl({ children }: { children: React.ReactNode }) { return <span style={s.hl}>{children}</span> }
function HR() { return <hr style={s.divider} /> }
function Block({ children }: { children: React.ReactNode }) { return <pre style={s.block}>{children}</pre> }
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

export default function Module17() {
  return (
    <LearnLayout
      title="Windows Security and Active Directory"
      description="How Active Directory works, what the most dangerous AD misconfigurations are, how Group Policy enforces security, and how to defend Windows enterprise environments."
      section="Cybersecurity — Module 17"
      readTime="45 min"
      updatedAt="May 2026"
    >
      <Part>
        <P>
          Over 90% of Fortune 500 companies run Microsoft Active Directory. It's the central nervous system of Windows enterprise environments — managing authentication, authorisation, group membership, and Group Policy configuration for every device and user in the domain. It's also the primary target once an attacker gets a foothold, because Domain Admin access to AD means access to everything.
        </P>
        <P>
          This module covers the Windows and AD security model: <Hl>how AD stores and protects credentials</Hl>, what <Hl>Group Policy Objects (GPOs)</Hl> can enforce, how <Hl>tiered administration</Hl> limits the blast radius of compromise, the top <Hl>AD misconfigurations</Hl> attackers look for (and you should fix), and how BloodHound reveals attack paths through trust relationships that administrators didn't know existed.
        </P>
      </Part>

      <HR />

      <Part>
        <H>Active Directory — The Core Concepts</H>
        <P>
          Active Directory is a <Hl>hierarchical directory service</Hl> built on LDAP (Lightweight Directory Access Protocol). It stores objects — users, computers, groups, GPOs, and service accounts — in a tree structure of domains and organizational units (OUs).
        </P>
        <Block>{`AD structure:

Forest: CORP.LOCAL             ← Root of the trust hierarchy
  Domain: CORP.LOCAL           ← Primary domain
    OU: Workstations           ← Organizational Unit
      Computer: DESKTOP-01
      Computer: LAPTOP-42
    OU: Servers
      OU: Production
        Computer: WEB-01
        Computer: DB-01
      OU: Development
        Computer: DEV-01
    OU: Users
      OU: Executives
        User: ceo@corp.local
      OU: IT
        User: admin@corp.local
      OU: Staff
        User: jsmith@corp.local
    OU: Service Accounts
      User: svc_backup
      User: svc_monitoring
    OU: Groups
      Group: Domain Admins
      Group: Enterprise Admins
      Group: IT-Helpdesk

Domain Controller (DC): Runs AD services
  - Authentication (Kerberos KDC, NTLM)
  - LDAP directory (AD database in NTDS.dit)
  - DNS (AD-integrated DNS)
  - Sysvol share (GPOs stored here)
  - Global Catalog (cross-domain object search)

Key privileged groups:
  Domain Admins:      Full control of domain
  Enterprise Admins:  Full control of entire forest (all domains)
  Schema Admins:      Can modify AD schema (rarely needed)
  Administrators:     Local admin on Domain Controllers
  KRBTGT:             Fake service account — its hash enables Golden Tickets`}</Block>
        <Block>{`How credentials are stored in AD:

NTDS.dit file:
  Location: C:\Windows\NTDS\NTDS.dit (on Domain Controllers only)
  Format: Extensible Storage Engine (ESE) database
  Contains: All domain user attributes including:
    - NT hash (MD4 of password)
    - LM hash (legacy, disabled by default)
    - Kerberos keys (DES, RC4, AES-128, AES-256)
    - Password history
    - Account flags (disabled, locked, etc.)

Encryption:
  NT hashes in NTDS.dit are encrypted with:
    1. Domain-wide encryption key
    2. Per-account salt derived from account's SID
  This prevents extracting raw hashes directly from the file

DCSync attack bypasses this:
  MS-DRSR protocol allows one DC to sync hashes from another DC
  An account with Replicating Directory Changes + All can perform DCSync
  secretsdump.py decrypts hashes client-side using the Domain encryption key
  Result: all plaintext-equivalent NT hashes for all domain accounts`}</Block>
      </Part>

      <HR />

      <Part>
        <H>Group Policy — Enforcing Security Across the Domain</H>
        <P>
          <Hl>Group Policy Objects (GPOs)</Hl> are the primary mechanism for enforcing security configuration across thousands of Windows machines. A GPO is a collection of settings that applies to users and computers in an OU when they log in or at regular refresh intervals (every 90 minutes by default). Security hardening via GPO is far more scalable and reliable than manual configuration.
        </P>
        <Block>{`GPO processing order (LSDOU — later overwrites earlier):
  1. Local Policy        (Local Group Policy on each machine)
  2. Site Policy         (Applied to AD sites)
  3. Domain Policy       (Applies to entire domain)
  4. OU Policy           (Applies to specific OU, most specific wins)

Last writer wins — OU GPOs override Domain GPOs which override Local.

Critical security GPOs to configure:

Account Policy (Domain level only):
  Password Length: 14+ characters
  Password Complexity: Enabled
  Password History: 24 passwords remembered
  Maximum Password Age: 90 days
  Account Lockout Threshold: 5 attempts
  Account Lockout Duration: 15 minutes
  Reset Lockout Counter After: 15 minutes

Security Options:
  Interactive logon: Display user information when session locked → Do not display
  Interactive logon: Machine inactivity limit → 900 seconds
  Network security: LAN Manager authentication level → Send NTLMv2 only
                    ← Disables LM and NTLMv1 (old, crackable)
  Network access: Do not allow anonymous enumeration of SAM accounts → Enabled
  Network access: Do not allow anonymous enumeration of SAM accounts and shares → Enabled
  User Account Control: Run all administrators in Admin Approval Mode → Enabled

Windows Firewall via GPO:
  Configure Windows Defender Firewall with domain, private, public profiles
  Block all inbound connections by default
  Allow only specific ports needed (e.g., 445 for SMB between file server and clients)

Windows Update:
  Configure WSUS or Windows Update for Business
  Automatic installation: Critical and Security updates
  Deadline: 3 days for Critical patches`}</Block>
        <Block>{`PowerShell logging — catch attacker activity:

# GPO → Computer Configuration → Administrative Templates
#      → Windows Components → Windows PowerShell

Module Logging:
  Enable: Log all PowerShell module activity
  This captures: PowerShell commands executed, their output
  Logs to: Event ID 4103

Script Block Logging:
  Enable: Log all PowerShell script blocks (including obfuscated scripts)
  Key: Windows decodes the script before logging — obfuscation is irrelevant
  Attacker runs: powershell -enc <base64>
  Log captures: decoded script content
  Logs to: Event ID 4104

Transcription:
  Save all PowerShell session output to a text file
  Configure path: \\server\pslogs\%computername%_%date%.txt
  Logs to: Configured path

Command Line Logging:
  Enable: Include command line in process creation events
  GPO path: Audit Policy → Object Access → Audit Process Creation
  Logs command lines to: Security Event Log, Event ID 4688

# These four settings together make PowerShell-based attacks
# nearly fully visible in SIEM logs`}</Block>
      </Part>

      <HR />

      <Part>
        <H>Active Directory Tiered Administration Model</H>
        <P>
          The <Hl>Active Directory Tiered Administration Model</Hl> (also called the Administrative Tier Model) is Microsoft's recommendation for isolating privileged credentials from credential theft attacks. The core insight: credentials used on Tier 2 (workstations) should never touch Tier 0 (Domain Controllers). If a workstation is compromised, the attacker shouldn't be able to harvest credentials that give them access to higher-tier systems.
        </P>
        <Block>{`Three-tier model:

Tier 0: Domain Controllers, AD, PKI, ADFS
  Highest value, highest risk
  Controls: Only Tier 0 admins can administer Tier 0 systems
  Tier 0 admins: Separate accounts (DA-jsmith) used ONLY on Tier 0 systems
  Tier 0 admin workstations: Dedicated, hardened, internet-restricted PAWs

Tier 1: Servers (web, app, file, database)
  Medium value
  Controls: Tier 1 admins (SA-jsmith) can administer servers
            Tier 1 admin accounts CANNOT log into Tier 0 or Tier 2
  Tier 1 admin workstation: Dedicated PAW for server management

Tier 2: Workstations and devices
  Lowest tier, most exposed (users browse web, open email)
  Controls: Helpdesk accounts (HD-jsmith) can administer workstations
            Helpdesk accounts CANNOT log into Tier 0 or Tier 1

PAW (Privileged Access Workstation):
  Dedicated, locked-down workstation for admin tasks only
  No email, no web browsing, no user apps
  No local admin for the PAW user (admin tasks via credential prompts)
  Outbound internet blocked (admin tools only)
  USB restricted, full disk encryption, Credential Guard enabled

Enforcement via Group Policy:
  Deny logon rights: DA-jsmith cannot log into workstations
    User Rights Assignment → Deny logon locally → Domain Admins
    User Rights Assignment → Deny logon via RDP → Domain Admins
  Logon restrictions: Only Tier 0 admins can log into DCs

Real-world impact:
  Before tiering: IT helpdesk logs into workstations as Domain Admin
                  Workstation compromised → Domain Admin hash extracted
                  → Full domain compromise

  After tiering:  IT helpdesk uses HD-jsmith on workstations
                  Workstation compromised → HD-jsmith hash extracted
                  HD-jsmith has no access to servers or DCs
                  → Lateral movement blocked at workstation tier`}</Block>
      </Part>

      <HR />

      <Part>
        <H>Top Active Directory Misconfigurations</H>
        <P>
          AD misconfigurations are the attack surface that red teams and attackers target after initial access. These aren't theoretical vulnerabilities — they're found in virtually every enterprise environment because they accumulated over years of "quick fixes" and "temporary" exceptions.
        </P>
        <table style={s.table}>
          <thead>
            <tr>
              <th style={s.th}>Misconfiguration</th>
              <th style={s.th}>What It Enables</th>
              <th style={s.th}>How to Find It</th>
              <th style={s.th}>Fix</th>
            </tr>
          </thead>
          <tbody>
            {[
              ['Service accounts as Domain Admins', 'Kerberoasting → Domain Admin', 'BloodHound: ServiceAccounts group membership', 'Least privilege; use gMSA'],
              ['Users with DCSync rights', 'Direct hash extraction without DC access', 'BloodHound: DCSync edge on non-DCs', 'Remove rights; DCs only'],
              ['Unconstrained delegation', 'Steal TGTs of any user who connects', 'Get-ADComputer -Filter {TrustedForDelegation -eq $true}', 'Use constrained/resource-based delegation'],
              ['AdminSDHolder misconfiguration', 'Backdoor to Domain Admins', 'Check AdminSDHolder ACLs', 'Audit protected accounts regularly'],
              ['Default Kerberos settings', 'RC4 tickets (faster to crack)', 'Check msDS-SupportedEncryptionTypes', 'Enforce AES; disable RC4'],
              ['LLMNR/NBT-NS enabled', 'Credential capture via Responder', 'Get-NetAdapter | ...LLMNR check', 'Disable via GPO'],
              ['Weak account lockout', 'Password spraying', 'Check Domain Policy', 'Lockout after 5 failures'],
              ['Stale computer accounts', 'Lateral movement via stale machines', 'Get computers not logged in 90+ days', 'Disable/delete stale accounts'],
              ['Everyone/Authenticated Users ACLs', 'Any user can modify paths to privilege', 'BloodHound: dangerous ACL edges', 'Audit and restrict ACLs'],
            ].map(([m, e, h, f]) => (
              <tr key={m}>
                <td style={{ ...s.td, color: C, fontWeight: 600 }}>{m}</td>
                <td style={s.td}>{e}</td>
                <td style={s.td}>{h}</td>
                <td style={s.td}>{f}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <Block>{`# PowerShell commands to audit AD misconfigurations

# 1. Find service accounts with Domain Admin membership:
Get-ADGroupMember -Identity "Domain Admins" | Where-Object {
    (Get-ADUser $_.SamAccountName -Properties ServicePrincipalName).ServicePrincipalName -ne $null
}

# 2. Find accounts with unconstrained delegation:
Get-ADComputer -Filter {TrustedForDelegation -eq $true} -Properties TrustedForDelegation |
    Select-Object Name, TrustedForDelegation
Get-ADUser -Filter {TrustedForDelegation -eq $true} -Properties TrustedForDelegation |
    Select-Object Name, TrustedForDelegation

# 3. Find accounts with "Do not require Kerberos pre-authentication" (AS-REP roasting):
Get-ADUser -Filter {DoesNotRequirePreAuth -eq $true} -Properties DoesNotRequirePreAuth |
    Select-Object Name, DoesNotRequirePreAuth

# 4. Find accounts that haven't changed passwords in 180+ days:
$cutoff = (Get-Date).AddDays(-180)
Get-ADUser -Filter {PasswordLastSet -lt $cutoff -and Enabled -eq $true} -Properties PasswordLastSet |
    Select-Object Name, PasswordLastSet

# 5. Find stale computer accounts (not logged in 90+ days):
$cutoff = (Get-Date).AddDays(-90)
Get-ADComputer -Filter {LastLogonTimeStamp -lt $cutoff -and Enabled -eq $true} -Properties LastLogonTimeStamp |
    Select-Object Name, @{N='LastLogon';E={[DateTime]::FromFileTime($_.LastLogonTimeStamp)}}`}</Block>
      </Part>

      <HR />

      <Part>
        <H>BloodHound — Mapping Attack Paths Through AD</H>
        <P>
          <Hl>BloodHound</Hl> is an open-source tool that collects Active Directory relationship data (group memberships, session data, ACLs, trust paths) and visualises attack paths from any user to Domain Admin. It's used by both red teams (finding paths to exploit) and blue teams (identifying and closing those paths before attackers find them).
        </P>
        <Block>{`BloodHound architecture:

Data collection (SharpHound):
  SharpHound.exe or SharpHound.ps1 runs in the domain context
  Collects via LDAP and Windows APIs:
    - Group memberships (who is in what group)
    - Active sessions (who is logged into which computer)
    - ACLs (who has what rights over which AD objects)
    - SPNs (service accounts for Kerberoasting)
    - Delegation settings

Analysis (BloodHound GUI):
  Neo4j graph database backend
  Visualises trust relationships as a directed graph
  Pre-built queries for common attack paths

Critical BloodHound queries:
  "Find all Domain Admins"
  "Find shortest path to Domain Admin from [username]"
  "Find all paths from [compromised host] to Domain Admin"
  "Find computers where Domain Admins have sessions"
  "Find users with Kerberoastable accounts"
  "Find AS-REP roastable users"
  "Find principals with DCSync rights"
  "Find unconstrained delegation computers"
  "Find dangerous ACLs" (WriteDACL, GenericAll, WriteOwner on privileged groups)

Defender use case:
  Run BloodHound quarterly as an AD security assessment
  Sort findings by impact: paths to Domain Admin are highest priority
  Close paths by:
    - Removing unnecessary group memberships
    - Fixing over-permissive ACLs
    - Disabling delegation on workstations
    - Tiering admin accounts`}</Block>
        <Block>{`Common BloodHound attack paths explained:

Path: jsmith (low-priv user)
  → MemberOf → IT-Helpdesk (group)
  → HasSession → DESKTOP-42 (computer)
  → AdminTo → IT-ADMIN-01 (admin computer)
  → HasSession → DA-admin (Domain Admin has active session)
  → Domain Admin compromise

Reading this:
  jsmith is in IT-Helpdesk group
  IT-Helpdesk has local admin on DESKTOP-42
  DESKTOP-42 → IT-ADMIN-01 (DA has session, somehow)
  Compromise DESKTOP-42 → wait for/steal DA's session → DA hash

GenericAll edge:
  IT-Support-Group has GenericAll rights on Domain Admins group
  jsmith is in IT-Support-Group
  Attack: jsmith can add any user to Domain Admins
  → Add jsmith to Domain Admins
  → Instant Domain Admin without compromising any admin account

WriteDACL edge:
  jsmith has WriteDACL on Domain Admins
  jsmith can modify the ACL of Domain Admins group
  → Grant jsmith GenericAll on Domain Admins
  → Add jsmith to Domain Admins

These ACL-based attacks:
  - Leave no obvious traces (no failed logins)
  - Don't require credential theft
  - Often missed by traditional monitoring
  - Detected by BloodHound analysis`}</Block>
      </Part>

      <HR />

      <Part>
        <H>Windows Defender and Modern Windows Security Controls</H>
        <P>
          Modern Windows (10/11 Enterprise) ships with a substantial set of built-in security controls that significantly raise the bar for attackers. Many are disabled by default or require specific hardware. Understanding what these controls do and how to enable them is core Windows security knowledge.
        </P>
        <Block>{`Windows security controls overview:

Windows Defender Antivirus:
  Real-time protection (signature + cloud-delivered signatures)
  Controlled Folder Access: Prevents ransomware from modifying Documents, Pictures, Desktop
  Network Protection: Blocks connections to known-malicious domains/IPs
  Tamper Protection: Prevents malware from disabling Defender settings

Microsoft Defender for Endpoint (MDE):
  Enterprise EDR: Behavioural detection, threat hunting, automated investigation
  Attack Surface Reduction (ASR) rules:
    Block Office macros calling Win32 APIs
    Block executable content from email client
    Block credential stealing from LSASS process
    Block process injections from Office apps
    Block execution of potentially obfuscated scripts
  Enable via: Intune, SCCM, or GPO

Credential Guard:
  Uses Hyper-V isolated VM (VSM) to store LSASS credentials
  NT hashes no longer in accessible LSASS memory
  Mimikatz sekurlsa::logonpasswords returns (null)
  Requires: UEFI, Secure Boot, 64-bit processor with virtualisation

Secure Boot:
  UEFI firmware validates bootloader signature before executing
  Prevents bootkits and UEFI-level rootkits from persisting
  Requires: UEFI firmware + Secure Boot key enrollment

BitLocker:
  Full disk encryption (AES-256 or AES-128 with XTS mode)
  TPM binding: key released only when boot measurements match
  Protects against offline attacks (stolen laptop, cold boot)
  Network Unlock: Servers can auto-unlock in data centres

Windows Firewall:
  Host-based stateful firewall
  Separate profiles: Domain, Private, Public
  Deploy rules via GPO across domain machines

AppLocker / WDAC (Windows Defender Application Control):
  Application allowlisting — only approved software can execute
  WDAC: Policy enforced by kernel (harder to bypass than AppLocker)
  Blocks: Unsigned executables, scripts, DLLs not in allowlist
  Highly effective against malware — most malware isn't allowlisted`}</Block>
        <Block>{`Enabling key security controls via PowerShell / GPO:

# Enable Credential Guard (requires UEFI + Secure Boot):
# GPO: Computer Configuration → Administrative Templates
#      → System → Device Guard → Turn on Virtualization Based Security
# Or via PowerShell (Windows 10 2004+):
Set-VMSecurity -VMName "..." -VirtualizationBasedSecurityOptOut $false

# Enable ASR rules (requires Defender for Endpoint):
Set-MpPreference -AttackSurfaceReductionRules_Ids @(
    "75668C1F-73B5-4CF0-BB93-3ECF5CB7CC84"  # Block Office from creating child processes
    "D4F940AB-401B-4EFC-AADC-AD5F3C50688A"  # Block Office from creating executable content
    "3B576869-A4EC-4529-8536-B80A7769E899"  # Block Office from injecting into other processes
    "BE9BA2D9-53EA-4CDC-84E5-9B1EEEE46550"  # Block executable content from email
    "9E6C4E1F-7D60-472F-BA1A-A39EF669E4B0"  # Block credential stealing from LSASS
    "D3E037E1-3EB8-44C8-A917-57927947596D"  # Block JavaScript and VBScript from launching processes
) -AttackSurfaceReductionRules_Actions @(
    "Enabled", "Enabled", "Enabled", "Enabled", "Enabled", "Enabled"
)

# Enable Windows Defender Tamper Protection (prevent disabling Defender):
Set-MpPreference -TamperProtection 5  # On (requires SYSTEM or Intune to change)

# Enable Controlled Folder Access (anti-ransomware):
Set-MpPreference -EnableControlledFolderAccess Enabled`}</Block>
      </Part>

      <HR />

      <Part>
        <H>Windows Event Logging for Security</H>
        <P>
          Windows Event Logs are the primary data source for detecting attacks in Windows environments. The Security event log records authentication, privilege use, and object access. But default logging is insufficient — many critical events require explicit configuration.
        </P>
        <Block>{`Critical Security Event IDs for detection:

Authentication:
  4624 - Successful logon (with Logon Type: 3=network, 10=remote interactive)
  4625 - Failed logon (brute force detection)
  4648 - Logon using explicit credentials (runas, PtH patterns)
  4768 - Kerberos TGT request (authentication)
  4769 - Kerberos service ticket request (Kerberoasting: many = suspicious)
  4771 - Kerberos pre-authentication failed (wrong password)

Privilege Use:
  4672 - Special privileges assigned (admin equivalent rights)
  4698 - Scheduled task created (persistence mechanism)
  4702 - Scheduled task updated
  4720 - User account created
  4728 - User added to security group (especially Domain Admins)
  4732 - User added to local group
  4756 - User added to universal group

Process:
  4688 - New process created (requires Process Tracking audit + command line logging)
  4689 - Process exited

Credential Access:
  4776 - NTLM authentication (domain or local)
  4104 - PowerShell script block logged (requires PowerShell logging GPO)
  4103 - PowerShell module logging

Object Access:
  4663 - Object access (file, registry) — requires SACL on object
  4670 - Object permissions changed

SIEM alerts to configure from these events:
  4625 (>5 in 5 min, same source) → brute force
  4769 (>20 in 5 min, same user) → Kerberoasting
  4720 or 4728 after hours → suspicious account creation
  4688 where ParentProcessName=winword.exe, NewProcessName=cmd.exe → macro exploit
  4688 CommandLine contains: mimikatz, sekurlsa, vssadmin delete shadows → immediate alert`}</Block>
      </Part>

      <HR />

      <Part>
        <H>Interview Questions</H>

        <IQ q="What is Active Directory and why is it the primary target after an attacker gains initial access to a Windows network?">
          Active Directory is a directory service that stores and manages information about network resources — users, computers, printers, and applications — and provides authentication and authorisation for a Windows domain. Every Windows workstation and server in the domain authenticates against AD, so AD credentials grant access to all domain resources. Group Policy allows AD to push configuration changes to every machine in the domain simultaneously.
          <br /><br />
          It's the primary target after initial access because AD is the centralised key to everything. Domain Admin access means you can authenticate as any user, access any system, deploy software via GPO to any machine, disable security controls, and exfiltrate any data — simultaneously. A single Domain Controller compromise effectively means the entire organisation is compromised. This is why sophisticated attackers spend significant time (weeks) between initial access and ransomware deployment: they use that time to achieve Domain Admin, establish multiple persistence mechanisms, and map the AD environment with BloodHound before executing their final objective.
        </IQ>

        <IQ q="What is Kerberos unconstrained delegation and why is it dangerous?">
          Kerberos delegation allows a service to impersonate a user when connecting to another service on that user's behalf. Unconstrained delegation is the least-restricted form: when a user authenticates to a server that has unconstrained delegation enabled, that server receives a copy of the user's Ticket Granting Ticket (TGT). The TGT is the master ticket — it can be used to request service tickets for any service in the domain on behalf of that user.
          <br /><br />
          The danger: if an attacker compromises a server with unconstrained delegation enabled, they can steal TGTs from memory for every user who authenticated to that server. If a Domain Admin connects to the server (perhaps via a GPO push, or checking on a service, or even nmap triggering a network authentication), their TGT is in that server's memory. The attacker uses mimikatz to extract it and can then impersonate the Domain Admin for the TGT's lifetime (10 hours by default). The attacker then requests service tickets as the Domain Admin and moves to the Domain Controller.
          <br /><br />
          The fix is to use constrained delegation (which restricts which services a server can impersonate users to) or resource-based constrained delegation (RBCD). BloodHound identifies all computers with unconstrained delegation. Workstations and application servers should never have unconstrained delegation — remove it and test that delegated applications still function.
        </IQ>

        <IQ q="Explain what BloodHound does and how a defender should use it.">
          BloodHound collects Active Directory relationship data — group memberships, ACLs, trust paths, and session information — and imports it into a Neo4j graph database. It then provides graph-based queries that reveal attack paths: given a starting point (any user), what series of relationships leads to Domain Admin? These paths might involve group membership (user A is in group B which has admin rights on server C where Domain Admin has an active session) or ACL abuse (user A has WriteDACL on Domain Admins, enabling them to grant themselves membership).
          <br /><br />
          Defenders should run BloodHound quarterly using SharpHound collection (or a read-only LDAP service account for continuous collection). The priority queries: shortest paths to Domain Admin from Tier 2 accounts (any path found means compromise of those accounts leads to full domain compromise), accounts with dangerous ACLs on privileged groups, computers with unconstrained delegation, and service accounts with Domain Admin membership. For each attack path found, document the relationship that enables it and remediate: remove unnecessary group memberships, fix ACL misconfigurations, tier admin accounts. After remediation, re-run BloodHound to verify the path is closed.
        </IQ>

        <IQ q="What is Credential Guard and what attacks does it protect against?">
          Credential Guard uses hardware-based virtualisation (Hyper-V's Virtual Secure Mode / VSM) to isolate the LSASS process in a separate, isolated virtual machine. When Credential Guard is enabled, LSASS-stored credentials (NT hashes, Kerberos keys) are in the isolated VM's memory, not in the regular OS's memory. Even a process running at SYSTEM or kernel level cannot directly read this memory.
          <br /><br />
          This defeats Pass-the-Hash attacks that rely on dumping NT hashes from LSASS memory using tools like mimikatz. The sekurlsa::logonpasswords command returns "(null)" for NTLM hashes and Kerberos keys for accounts protected by Credential Guard. The attack requires extracting hashes another way — DCSync (which requires Domain Admin rights to other DCs), or SAM database access for local accounts. Credential Guard does not protect against: Kerberoasting (hashes derived from service ticket offline crack, not from LSASS), Pass-the-Ticket (Kerberos tickets can still be stolen), or password capture from memory of applications that store credentials in non-LSASS processes. But it eliminates the most common credential dumping technique used in enterprise breaches.
        </IQ>

        <IQ q="Your company uses PowerShell heavily for automation. An attacker might use PowerShell for malicious activity. How do you configure Windows to detect PowerShell abuse while allowing legitimate use?">
          Enable four PowerShell logging settings via Group Policy, all under Computer Configuration → Administrative Templates → Windows Components → Windows PowerShell. Module Logging (Event ID 4103) records all PowerShell commands and their output as they execute. Script Block Logging (Event ID 4104) records the content of script blocks before they execute — critically, Windows decodes obfuscated scripts before logging, so base64-encoded or heavily obfuscated scripts are logged in their decoded form. Transcription saves a full text record of each PowerShell session to a configured central share. Command Line Logging (Event ID 4688 with command line enabled) records the exact command used to launch PowerShell, including any -EncodedCommand or -File arguments.
          <br /><br />
          In SIEM, alert on: Event 4104 containing known-malicious patterns (Invoke-Mimikatz, vssadmin delete, Add-MpPreference -ExclusionPath), Event 4103/4104 from PowerShell sessions spawned by unexpected parent processes (cmd.exe spawned by winword.exe spawned by outlook.exe is a clear chain of macro execution), Event 4688 with PowerShell process using -enc flag and unusual parent processes, and PowerShell sessions to remote hosts that never normally use PowerShell remotely (WinRM anomalies).
          <br /><br />
          The enabling policy does NOT block legitimate PowerShell use — it only adds logging. The logs are centralised to a SIEM where detection rules identify malicious patterns. This is the correct model: broad logging + specific alerting, not blocking PowerShell entirely which would break legitimate automation.
        </IQ>
      </Part>

      <HR />

      <Part>
        <H>Error Library — Common Mistakes</H>

        <Err
          title="Placing all IT admins in Domain Admins for convenience"
          cause="Helpdesk staff, server administrators, and application owners are often added to Domain Admins because it's simpler than figuring out the minimum required permissions. Domain Admin credentials then get used on workstations (for 'quick fixes'), exposing the highest-privilege credential to the most-compromised systems."
          fix="Implement the tiered administration model. Create separate admin accounts per tier: DA-username for Domain Admin tasks only, SA-username for server administration, HD-username for helpdesk. Domain Admin accounts should never log into workstations. Enforce this via GPO: Deny logon locally and via Remote Desktop Services for Domain Admins on workstation OUs."
        />

        <Err
          title="Leaving LLMNR and NBT-NS enabled"
          cause="LLMNR (Link-Local Multicast Name Resolution) and NBT-NS (NetBIOS Name Service) are fallback name resolution protocols that respond to name queries with challenges. When a Windows client tries to resolve a name that DNS doesn't answer, it broadcasts an LLMNR query. An attacker running Responder on the same subnet replies to this query, receives the client's NTLMv2 hash, and cracks it offline. This is one of the most common internal penetration testing findings."
          fix="Disable both LLMNR and NBT-NS via GPO. LLMNR: Computer Configuration → Administrative Templates → Network → DNS Client → Turn off multicast name resolution → Enabled. NBT-NS: DHCP option or WMI script to set NodeType. After disabling, verify DNS resolution for all internal resources works correctly — LLMNR/NBT-NS only matter if DNS is missing records for internal hosts."
        />

        <Err
          title="Not monitoring Event ID 4769 for Kerberoasting"
          cause="Kerberoasting requests service tickets via normal Kerberos protocol flows — there are no authentication failures or suspicious binary executions. Without specific monitoring for high-volume TGS requests (Event ID 4769 with TicketEncryptionType=0x17, indicating RC4), Kerberoasting runs silently. Many organisations have no detection for this attack despite it being extremely common in penetration tests."
          fix="Configure SIEM alert: Event ID 4769 where TicketEncryptionType is 0x17 (RC4) AND ServiceName does not match krbtgt AND frequency > 10 in 5 minutes from same source. Also enable AES-only enforcement (msDS-SupportedEncryptionTypes = 24 for AES-128+256) which makes RC4 unavailable — kerberoasting can still request AES tickets but they're significantly slower to crack."
        />

        <Err
          title="Thinking that Credential Guard protects all credentials"
          cause="Credential Guard protects domain credentials stored in LSASS. It does NOT protect: local account passwords (SAM database, accessible via shadow copy), application credentials stored in plaintext config files, browser-saved passwords (DPAPI-based, accessible as the user), service account credentials used by running services, and Kerberos tickets (which can still be stolen via pass-the-ticket). Teams often overestimate Credential Guard's scope."
          fix="Credential Guard is one layer in a defence-in-depth stack, not a complete credential protection solution. Complement with: password manager policy (no browser-saved passwords for sensitive accounts), DPAPI-aware EDR detection, network monitoring for unusual Kerberos ticket use, application secret management (no plaintext config files with credentials), and LAPS for local accounts."
        />

        <Err
          title="Not reviewing AD ACLs as part of security assessments"
          cause="AD object ACLs control who can modify users, groups, OUs, and other AD objects. Over years of AD administration, ACLs accumulate excessive permissions: groups granted GenericAll on Domain Admins, service accounts with WriteDACL on OU containers, users with ForceChangePassword on other privileged users. These permissions create attack paths (BloodHound edges) that standard security reviews don't catch because they're not file permissions — they're AD object permissions."
          fix="Run BloodHound quarterly focusing specifically on the 'Dangerous Privileges' category of edges: GenericAll, WriteDACL, WriteOwner, GenericWrite on privileged groups and OUs. For any edge found between non-admin accounts and privileged AD objects, investigate how the permission was granted (audit trail) and remove it if not required. Establish a periodic ACL review process for critical AD objects."
        />
      </Part>

      <HR />

      <KeyTakeaways
        items={[
          'Active Directory stores all domain credentials in NTDS.dit on Domain Controllers. DCSync attacks use the MS-DRSR replication protocol to extract all password hashes without needing physical DC access.',
          'The tiered administration model isolates credential exposure: Domain Admin accounts never touch workstations, helpdesk accounts never touch servers. Enforcement via GPO deny-logon rights prevents tier violations.',
          'BloodHound graphs AD relationships and reveals attack paths from compromised accounts to Domain Admin. Run it quarterly as a defender to find and close paths before attackers exploit them.',
          'Unconstrained delegation stores TGTs of connecting users in server memory. An attacker who compromises a server with unconstrained delegation can steal Domain Admin TGTs and achieve full domain compromise.',
          'Kerberoasting requests service tickets for any SPN — encrypted with the service account hash. It generates Event 4769 (RC4 ticket requests) and leaves no failed authentication events. Service account passwords should be 25+ characters or use gMSA.',
          'Credential Guard stores LSASS credentials in a Hyper-V isolated VM, making mimikatz-style hash extraction fail. It doesn\'t protect Kerberos tickets, local accounts, or application-stored credentials.',
          'PowerShell Script Block Logging (Event 4104) captures script content before execution — even obfuscated scripts are logged decoded. This is essential for detecting PowerShell-based attacks and is enabled via GPO.',
          'LLMNR and NBT-NS enable Responder attacks: any failed DNS lookup causes a broadcast that Responder answers, collecting NTLMv2 hashes for offline cracking. Disable both via GPO on all domain machines.',
          'Windows Defender Attack Surface Reduction (ASR) rules block specific high-risk behaviors: Office macros calling Win32 APIs, credential stealing from LSASS, executable content from email. Enable in audit mode first, then enforce.',
          'AD ACL misconfigurations (GenericAll, WriteDACL on privileged groups) create privilege escalation paths that bypass authentication entirely. BloodHound identifies these; quarterly ACL audits of critical objects close them.',
        ]}
      />

      <HR />

      <div style={{ background: 'var(--code-bg)', borderRadius: 12, padding: '28px 32px', marginTop: 40 }}>
        <div style={{ fontSize: 13, color: C, fontWeight: 700, marginBottom: 8, textTransform: 'uppercase', letterSpacing: 1 }}>
          Up Next — Module 18
        </div>
        <div style={{ fontSize: 22, fontWeight: 700, color: 'var(--heading)', marginBottom: 12 }}>
          Cloud Security — AWS, Azure, and GCP
        </div>
        <p style={{ ...s.p, marginBottom: 20 }}>
          In Module 18, you learn cloud security from first principles: the shared responsibility model and exactly where cloud provider responsibility ends and yours begins, how IAM works across AWS/Azure/GCP, the most dangerous cloud misconfigurations (public S3 buckets, over-permissive IAM roles, exposed metadata services), and how cloud-native security tools detect threats in cloud environments.
        </p>
        <Link
          href="/learn/cybersecurity/cloud-security"
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
          Continue to Module 18 →
        </Link>
      </div>
    </LearnLayout>
  )
}
