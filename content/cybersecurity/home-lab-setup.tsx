import { LearnLayout } from '@/components/content/LearnLayout'
import { KeyTakeaways } from '@/components/content/KeyTakeaways'
import { Callout } from '@/components/content/Callout'

const C = '#ff4757'

const Part = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <div style={{ marginBottom: 48 }}>
    <h2 style={{ fontSize: 22, fontWeight: 700, color: C, marginBottom: 16 }}>{title}</h2>
    {children}
  </div>
)
const H = ({ children }: { children: React.ReactNode }) => (
  <h3 style={{ fontSize: 17, fontWeight: 600, color: 'var(--text)', marginBottom: 8, marginTop: 24 }}>{children}</h3>
)
const P = ({ children }: { children: React.ReactNode }) => (
  <p style={{ fontSize: 15, color: 'var(--text)', lineHeight: 1.9, marginBottom: 14 }}>{children}</p>
)
const Hl = ({ children }: { children: React.ReactNode }) => (
  <span style={{ color: C, fontWeight: 600 }}>{children}</span>
)
const HR = () => <hr style={{ border: 'none', borderTop: `1px solid ${C}22`, margin: '32px 0' }} />
const Block = ({ children }: { children: React.ReactNode }) => (
  <pre style={{
    background: 'var(--code-bg, #1a1a2e)', color: '#e2e8f0', borderRadius: 8,
    padding: '16px 20px', fontSize: 13, overflowX: 'auto', marginBottom: 20,
    border: `1px solid ${C}33`, lineHeight: 1.7, whiteSpace: 'pre-wrap', wordBreak: 'break-word'
  }}>{children}</pre>
)
const IQ = ({ q, a }: { q: string; a: string }) => (
  <div style={{ background: `${C}11`, border: `1px solid ${C}44`, borderRadius: 8, padding: '14px 18px', marginBottom: 16 }}>
    <div style={{ color: C, fontWeight: 700, fontSize: 13, marginBottom: 6 }}>Interview Question</div>
    <div style={{ fontWeight: 600, fontSize: 14, marginBottom: 6, color: 'var(--text)' }}>{q}</div>
    <div style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.8 }}>{a}</div>
  </div>
)
const Err = ({ title, bad, good }: { title: string; bad: string; good: string }) => (
  <div style={{ background: '#1a0a0a', border: `1px solid ${C}66`, borderRadius: 8, padding: '14px 18px', marginBottom: 16 }}>
    <div style={{ color: C, fontWeight: 700, fontSize: 13, marginBottom: 6 }}>Common Mistake — {title}</div>
    <div style={{ fontSize: 13, marginBottom: 4 }}><span style={{ color: '#ff6b6b' }}>Bad: </span><span style={{ color: '#ccc' }}>{bad}</span></div>
    <div style={{ fontSize: 13 }}><span style={{ color: '#51cf66' }}>Good: </span><span style={{ color: '#ccc' }}>{good}</span></div>
  </div>
)
const ProTip = ({ children }: { children: React.ReactNode }) => (
  <div style={{ background: '#0a1628', border: '1px solid #1e40af', borderRadius: 8, padding: '12px 16px', marginBottom: 16, fontSize: 14, color: '#93c5fd', lineHeight: 1.8 }}>
    <span style={{ fontWeight: 700 }}>Pro Tip: </span>{children}
  </div>
)

export default function Module39() {
  return (
    <LearnLayout
      title="Building a Home Lab for Cybersecurity Practice"
      description="Build a realistic cybersecurity lab on your own hardware or for free in the cloud. Set up virtualisation, a vulnerable Active Directory environment, SIEM, IDS, and a safe isolated network to practice every technique in this course legally."
      section="Cybersecurity — Module 39"
      readTime="38 min"
      updatedAt="May 2026"
    >

      <Part title="Why You Need a Home Lab">
        <P>
          Reading about attacks and defences is not the same as doing them. A home lab gives you a legal, isolated environment to practise every technique in this course — privilege escalation, Active Directory attacks, SIEM queries, incident response, malware analysis — without risk to real systems or legal consequences.
        </P>
        <P>
          A home lab is also <Hl>the most compelling portfolio item for entry-level interviews</Hl>. "Tell me about your home lab" is a standard screening question. A candidate who can describe their AD environment, how they configured their SIEM, and what attacks they practised against it stands out from everyone who only has certifications.
        </P>

        <H>Lab Tiers by Budget</H>
        <div style={{ overflowX: 'auto', marginBottom: 20 }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
            <thead>
              <tr style={{ background: `${C}22` }}>
                {['Tier', 'Hardware / Cost', 'What You Can Run', 'Best For'].map(h => (
                  <th key={h} style={{ padding: '10px 14px', textAlign: 'left', color: C, fontWeight: 700, border: `1px solid ${C}33` }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[
                ['Free (Cloud)', '$0 — AWS/Azure free tier', 'Single Linux VMs, basic web app testing, cloud security labs', 'Getting started immediately, no hardware'],
                ['Laptop (Beginner)', 'Existing laptop, 8+ GB RAM', '2-3 VMs: Kali + one target, basic AD with 2 machines', 'Entry-level offensive/defensive labs'],
                ['Workstation (Serious)', '$300-600 used — 32+ GB RAM', 'Full AD lab: DC + 2-3 workstations + Kali + SIEM', 'Realistic enterprise environment simulation'],
                ['Dedicated Server', '$600-1200 — 64+ GB RAM', 'Full enterprise simulation: AD, SIEM, IDS, firewall, multiple domains', 'Advanced research, red team simulation'],
                ['Mini PC Cluster', '$400 — 3x Intel NUC / mini PCs', 'Distributed environment, real network traffic, physical labs', 'Realistic network topology simulation'],
              ].map(([t, h, w, b], i) => (
                <tr key={i} style={{ background: i % 2 === 0 ? 'transparent' : `${C}08` }}>
                  {[t, h, w, b].map((c, j) => (
                    <td key={j} style={{ padding: '9px 14px', color: 'var(--text)', border: `1px solid ${C}22`, fontSize: 13 }}>{c}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Part>

      <HR />

      <Part title="Virtualisation Platform Setup">
        <P>
          Virtualisation lets you run multiple operating systems simultaneously on one machine. Each VM is an isolated sandbox — malware, attack tools, and misconfigured systems cannot escape to your host machine or home network (when configured correctly).
        </P>

        <H>Choosing a Hypervisor</H>
        <Block>{`Hypervisor comparison for home labs:

VMware Workstation Pro (Windows/Linux):
  - Best performance and features for home labs
  - Cost: $199 (permanent licence) — or free since 2024 for personal use
  - Supports: nested virtualisation, NAT/host-only/bridged networks, snapshots
  - Best for: Windows-heavy labs, AD environments

VirtualBox (Windows/macOS/Linux — free):
  - Free and open-source
  - Slightly lower performance than VMware
  - Excellent for beginners on any OS
  - Supports: all network modes, snapshots, guest additions
  - Download: virtualbox.org

Proxmox VE (dedicated server/PC):
  - Free, enterprise-grade hypervisor
  - Web UI — manage all VMs from browser
  - Supports: containers (LXC) AND full VMs side by side
  - Best for: dedicated lab machine, running 10+ VMs simultaneously
  - Install on bare metal: proxmox.com/downloads

UTM (macOS — free):
  - Native Apple Silicon support
  - Best choice for M1/M2/M3 Mac users
  - Runs x86 VMs via QEMU emulation (slower) or ARM natively
  - Download: mac.getutm.app

Recommendation by budget:
  - $0 laptop: VirtualBox
  - Windows workstation: VMware Workstation Pro (now free for personal use)
  - macOS M-series: UTM
  - Dedicated lab machine: Proxmox VE`}
        </Block>

        <H>VM Network Architecture</H>
        <Block>{`Home lab network design — CRITICAL: isolate lab from home network

Network mode types:
  Host-Only:   VMs can talk to each other and host — NOT to internet
               Use for: malware analysis, isolated AD labs, anything dangerous

  NAT:         VMs get outbound internet through host — cannot receive inbound
               Use for: downloading tools, internet-connected but isolated lab

  Bridged:     VM appears as real device on home network
               Use ONLY when you need real network interaction (usually don't)
               NEVER use for malware analysis or attack tools

  Internal:    VMs can only talk to each other — completely isolated
               Use for: maximum isolation malware labs

Recommended lab network topology:

  [Internet]
       |
  [Home Router] — home network (phones, personal laptops)
       |
  [Host Machine / Hypervisor]
       |
  ─────────────────────────────────────────────────────
  |                                                   |
  [Lab NAT Network - 192.168.100.0/24]    [Host-Only - 10.10.10.0/24]
  ├─ Kali Linux (attacker)                ├─ Malware analysis VMs
  ├─ Windows DC (domain controller)       └─ No internet access
  ├─ Windows 10 workstations
  └─ Ubuntu (web server target)

Rule: attack lab (offensive tools, vulnerable VMs) on NAT
      Malware / dangerous payloads on Host-Only only`}
        </Block>

        <H>Snapshot Strategy</H>
        <Block>{`Snapshot best practices:

ALWAYS take a snapshot:
  - After OS install + updates (clean baseline)
  - After installing tools (save configuration work)
  - Before running any attack (easy rollback)
  - Before any major configuration change

Snapshot naming convention:
  [VM Name] — [Date] — [State Description]
  "Win10-Workstation — 2026-05-10 — Clean, domain joined, no tools"
  "Kali — 2026-05-10 — Post-setup, all tools installed"
  "DC01 — 2026-05-10 — AD configured, 5 users, Kerberoasting target ready"

VMware snapshot command (CLI):
  vmrun snapshot "path/to/vm.vmx" "snapshot-name"
  vmrun revertToSnapshot "path/to/vm.vmx" "snapshot-name"

Proxmox snapshot (CLI):
  qm snapshot 100 clean-baseline --description "Clean OS, no config"
  qm rollback 100 clean-baseline`}
        </Block>
      </Part>

      <HR />

      <Part title="Building an Active Directory Lab">
        <P>
          Active Directory is the authentication and authorisation backbone of most enterprise environments. The majority of major breaches involve AD compromise. Building an AD lab lets you practise every attack covered in Modules 26 and beyond — Kerberoasting, Pass-the-Hash, DCSync, BloodHound — safely.
        </P>

        <H>Required VMs</H>
        <Block>{`Minimum AD lab VMs:

VM 1 — Windows Server 2019/2022 (Domain Controller)
  RAM: 2 GB minimum (4 GB recommended)
  Storage: 60 GB
  Role: DC, DNS, DHCP
  Cost: Free evaluation (180 days) from Microsoft evaluation centre

VM 2 — Windows 10/11 Pro (Workstation 1)
  RAM: 2 GB minimum
  Storage: 50 GB
  Role: domain-joined workstation, simulated user
  Cost: Free from Microsoft (without activation key — watermark only)

VM 3 — Windows 10/11 Pro (Workstation 2 — optional but recommended)
  RAM: 2 GB minimum
  Storage: 50 GB
  Role: second workstation for lateral movement practise

VM 4 — Kali Linux (Attacker)
  RAM: 2 GB minimum (4 GB recommended)
  Storage: 50 GB
  Cost: Free (kali.org/downloads)

Total RAM: 8-12 GB for a functional AD lab
Download free evaluations: microsoft.com/en-us/evalcenter/`}
        </Block>

        <H>Domain Controller Setup</H>
        <Block>{`# Step-by-step DC setup (Windows Server 2019/2022)

# 1. Set static IP on the DC
# Network adapter: Host-Only adapter (192.168.100.x range)
# IP: 192.168.100.10
# Subnet: 255.255.255.0
# Gateway: 192.168.100.1
# DNS: 127.0.0.1 (itself)

# 2. Set hostname before promoting to DC
Rename-Computer -NewName "DC01" -Restart

# 3. Install AD Domain Services role
Install-WindowsFeature -Name AD-Domain-Services -IncludeManagementTools

# 4. Promote to domain controller (creates new forest)
# Run as a single command (line breaks shown for readability):
Install-ADDSForest -DomainName "corp.local" -DomainNetbiosName "CORP" -SafeModeAdministratorPassword (ConvertTo-SecureString "Lab@Password1" -AsPlainText -Force) -InstallDns:$true -Force:$true
# System will restart automatically

# 5. Post-restart: verify AD is running
Get-ADDomain
Get-ADForest

# 6. Create a realistic user population
# Create OUs (Organisational Units)
New-ADOrganizationalUnit -Name "IT" -Path "DC=corp,DC=local"
New-ADOrganizationalUnit -Name "HR" -Path "DC=corp,DC=local"
New-ADOrganizationalUnit -Name "Finance" -Path "DC=corp,DC=local"

# Create users (one command per user for lab simplicity)
New-ADUser -Name "Alice Smith" -SamAccountName "asmith" -Path "OU=IT,DC=corp,DC=local" -AccountPassword (ConvertTo-SecureString "Password123!" -AsPlainText -Force) -Enabled $true -PasswordNeverExpires $true
New-ADUser -Name "Bob Jones"   -SamAccountName "bjones" -Path "OU=HR,DC=corp,DC=local" -AccountPassword (ConvertTo-SecureString "Summer2024!" -AsPlainText -Force)  -Enabled $true -PasswordNeverExpires $true
New-ADUser -Name "Carol White" -SamAccountName "cwhite" -Path "OU=Finance,DC=corp,DC=local" -AccountPassword (ConvertTo-SecureString "Winter2024!" -AsPlainText -Force)  -Enabled $true -PasswordNeverExpires $true
New-ADUser -Name "Dave Brown"  -SamAccountName "dbrown" -Path "OU=IT,DC=corp,DC=local" -AccountPassword (ConvertTo-SecureString "Spring2024!" -AsPlainText -Force)  -Enabled $true -PasswordNeverExpires $true

# 7. Create a service account with SPN (Kerberoasting target)
New-ADUser -Name "svc-sql" -SamAccountName "svc-sql" -Path "DC=corp,DC=local" -AccountPassword (ConvertTo-SecureString "Sqlserver1!" -AsPlainText -Force) -Enabled $true -PasswordNeverExpires $true

# Set SPN (makes this account Kerberoastable)
setspn -s MSSQLSvc/sql01.corp.local:1433 svc-sql

# 8. Add a domain admin (misconfiguration — realistic)
Add-ADGroupMember -Identity "Domain Admins" -Members "asmith"
# Now asmith is a domain admin — a common real-world misconfiguration`}
        </Block>

        <H>Joining Workstations to the Domain</H>
        <Block>{`# On each Windows workstation VM:

# 1. Set DNS to point to DC IP
# Network Settings > IPv4 > DNS: 192.168.100.10

# 2. Verify connectivity to DC
ping DC01.corp.local

# 3. Join the domain
# GUI: System Properties > Computer Name > Change > Domain: corp.local
# PowerShell (single command):
Add-Computer -DomainName "corp.local" -Credential (Get-Credential) -OUPath "OU=IT,DC=corp,DC=local" -Restart

# 4. Log in with domain user
# Username: CORP\asmith
# Password: Password123!

# 5. Verify domain membership
whoami            # CORP\asmith
whoami /groups    # shows domain group membership
nltest /dsgetdc:corp.local  # verify DC connectivity`}
        </Block>

        <H>Intentional Misconfigurations (Lab Realism)</H>
        <Block>{`Add these intentional weaknesses to make the lab realistic for attack practice:

# Weak Kerberoastable service account (already done above — svc-sql)

# AS-REP Roasting target (account with pre-auth disabled)
Set-ADAccountControl -Identity bjones -DoesNotRequirePreAuth $true

# Local admin password reuse (common real-world weakness)
# Set same local admin password on all workstations
# This enables Pass-the-Hash lateral movement

# Excessive ACL permissions (Attack Path for BloodHound)
# Give asmith GenericAll on dbrown (can reset their password)
# Run in PowerShell on the DC:
$asmith = Get-ADUser "asmith"
$dbrown = Get-ADUser "dbrown"
$dnPath = "AD:" + $dbrown.DistinguishedName
$acl = Get-Acl $dnPath
$ace = New-Object System.DirectoryServices.ActiveDirectoryAccessRule($asmith.SID, "GenericAll", "Allow")
$acl.AddAccessRule($ace)
Set-Acl $dnPath $acl

# Unconstrained delegation (allows Kerberos ticket theft)
Set-ADComputer -Identity "WS01" -TrustedForDelegation $true

# SMB signing disabled (enables relay attacks)
# Group Policy: Computer Config > Windows Settings > Security Settings >
# Local Policies > Security Options > Microsoft network server: Digitally sign communications: Disabled`}
        </Block>

        <IQ
          q="I only have 8 GB of RAM. Can I still build a useful AD lab?"
          a="Yes — it requires careful VM configuration. Run DC01 at 2 GB RAM (Windows Server runs fine at 2 GB in a lab), one Windows 10 workstation at 2 GB, and Kali at 2 GB. That leaves 2 GB for your host OS. The trick is to only run the VMs you are actively using — not all at once. Use snapshots aggressively so you can boot clean VMs quickly. Alternatively, use Vagrant + VMware/VirtualBox to automate VM provisioning: define your lab in code, spin it up when practising, tear it down when done. DETECTION Lab and Game of Active Directory (GOAD) are ready-made Vagrant-based AD labs you can deploy on any machine with 8 GB RAM."
        />
      </Part>

      <HR />

      <Part title="Attack Lab — Vulnerable Targets">
        <H>Vulnerable-by-Design Machines</H>
        <Block>{`Ready-made vulnerable environments for practice:

DVWA (Damn Vulnerable Web Application):
  - PHP web app with every OWASP Top 10 vulnerability
  - Docker: docker run -d -p 80:80 vulnerables/web-dvwa
  - Login: admin / password
  - Difficulty levels: Low / Medium / High / Impossible

Metasploitable 2 (Linux VM):
  - Intentionally vulnerable Linux system
  - Services: FTP with anonymous login, SSH, Samba, DVWA, tikiwiki
  - Download: sourceforge.net/projects/metasploitable/
  - Set to Host-Only network — never expose to internet

VulnHub (collection of vulnerable VMs):
  - Free download: vulnhub.com
  - Thousands of vulnerable VMs, all levels
  - Set to Host-Only network
  - Recommended starters: Kioptrix 1, Mr-Robot, DC-1

TryHackMe (cloud labs — no local hardware needed):
  - Browser-based; no VM setup required
  - Free tier gives access to many rooms
  - tryhackme.com

HackTheBox (cloud labs):
  - More realistic; more challenging
  - Requires active VPN connection
  - hackthebox.com

GOAD (Game of Active Directory):
  - Multi-domain AD lab (5 VMs, 3 domains) for advanced AD attack practice
  - Automated setup with Vagrant + Ansible
  - github.com/Orange-Cyberdefense/GOAD
  - Requires: 16+ GB RAM for full deployment (mini version: 8 GB)

Detection Lab:
  - Full SIEM lab: Windows AD + Splunk + Fleet + osquery
  - github.com/clong/DetectionLab
  - Requires: 16+ GB RAM, Vagrant + VMware/VirtualBox`}
        </Block>

        <H>Kali Linux Setup</H>
        <Block>{`# Kali Linux — your attacker machine

# Download: kali.org/downloads (Installer, VirtualBox, or VMware image)
# Pre-built VM images save setup time — download .ova for VirtualBox

# First boot: update everything
sudo apt update && sudo apt upgrade -y

# Install additional tools not in default Kali
sudo apt install -y \
  bloodhound \
  neo4j \
  impacket-scripts \
  evil-winrm \
  crackmapexec \
  responder \
  ligolo-ng \
  seclists \
  wordlists \
  feroxbuster \
  gobuster \
  nuclei \
  amass \
  subfinder \
  httpx-toolkit

# Install tools from GitHub
# PowerSploit (AD attack scripts)
git clone https://github.com/PowerShellMafia/PowerSploit /opt/PowerSploit

# Impacket (already in Kali, but update to latest)
pip3 install impacket --upgrade

# BloodHound setup (graph-based AD attack path visualisation)
sudo neo4j start
# Visit http://localhost:7474 — change password from neo4j/neo4j
bloodhound &
# In BloodHound: connect to neo4j with your new password

# Collect AD data for BloodHound (run from domain-joined Windows)
# SharpHound (C# collector — run on Windows)
# Or from Kali with valid creds:
bloodhound-python -u asmith -p 'Password123!' -d corp.local -ns 192.168.100.10 --zip`}
        </Block>
      </Part>

      <HR />

      <Part title="Defensive Lab — SIEM and Detection">
        <H>Setting Up a Free SIEM</H>
        <Block>{`Option 1: Elastic Stack (ELK) — free, most common in industry

# Deploy with Docker Compose (easiest setup)
# docker-compose.yml for Elasticsearch + Kibana + Logstash

version: '3'
services:
  elasticsearch:
    image: docker.elastic.co/elasticsearch/elasticsearch:8.13.0
    environment:
      - discovery.type=single-node
      - xpack.security.enabled=true
      - ELASTIC_PASSWORD=LabPassword1
      - ES_JAVA_OPTS=-Xms1g -Xmx1g
    ports: ["9200:9200"]
    volumes: ["elastic-data:/usr/share/elasticsearch/data"]

  kibana:
    image: docker.elastic.co/kibana/kibana:8.13.0
    environment:
      - ELASTICSEARCH_HOSTS=http://elasticsearch:9200
      - ELASTICSEARCH_USERNAME=kibana_system
      - ELASTICSEARCH_PASSWORD=LabPassword1
    ports: ["5601:5601"]
    depends_on: [elasticsearch]

volumes:
  elastic-data:

# Start: docker compose up -d
# Kibana UI: http://localhost:5601 (admin / LabPassword1)

# Ship Windows logs to Elastic with Winlogbeat
# On Windows VM, install Winlogbeat:
# https://www.elastic.co/downloads/beats/winlogbeat
# Edit winlogbeat.yml:
#   output.elasticsearch.hosts: ["http://192.168.100.1:9200"]
#   output.elasticsearch.username: "elastic"
#   output.elasticsearch.password: "LabPassword1"
winlogbeat setup -e
Start-Service winlogbeat`}
        </Block>

        <Block>{`Option 2: Splunk Free (limited — 500 MB/day ingestion)

# Download: splunk.com/en_us/download/splunk-enterprise.html
# Free licence: up to 500 MB/day — sufficient for a home lab

# Install on Ubuntu/Kali:
tar xvzf splunk-*.tgz -C /opt
/opt/splunk/bin/splunk start --accept-license --gen-and-print-passwd
# Note the generated password from output

# Splunk Universal Forwarder (ship logs from Windows VMs)
# Download: splunk.com/en_us/download/universal-forwarder.html
# Install on Windows workstations and DC

# Configure forwarder to send to your Splunk instance:
# $SPLUNK_HOME/etc/system/local/outputs.conf
[tcpout]
defaultGroup = default-autolb-group
[tcpout:default-autolb-group]
server = 192.168.100.1:9997

# Enable inputs (Windows Event Logs):
# $SPLUNK_HOME/etc/system/local/inputs.conf
[WinEventLog://Security]
disabled = 0
[WinEventLog://System]
disabled = 0
[WinEventLog://Application]
disabled = 0`}
        </Block>

        <H>Sysmon — Enhanced Windows Telemetry</H>
        <Block>{`# Sysmon captures process creation, network connections, file creation,
# registry modification — far richer than default Windows event logs

# Download Sysmon from Sysinternals
Invoke-WebRequest -Uri https://download.sysinternals.com/files/Sysmon.zip -OutFile Sysmon.zip
Expand-Archive Sysmon.zip -DestinationPath C:\Tools\Sysmon\

# Download SwiftOnSecurity Sysmon config (excellent baseline ruleset)
Invoke-WebRequest -Uri https://raw.githubusercontent.com/SwiftOnSecurity/sysmon-config/master/sysmonconfig-export.xml -OutFile C:\Tools\Sysmon\sysmonconfig.xml

# Install Sysmon with the config
C:\Tools\Sysmon\Sysmon64.exe -accepteula -i C:\Tools\Sysmon\sysmonconfig.xml

# Verify it is running
Get-Service sysmon64

# Key Sysmon Event IDs to watch:
# Event 1:  Process creation (with full command line and parent)
# Event 3:  Network connection (process → IP:port)
# Event 7:  Image loaded (DLL injection detection)
# Event 8:  CreateRemoteThread (code injection indicator)
# Event 10: Process access (LSASS access — credential dumping)
# Event 11: File creation
# Event 13: Registry value set
# Event 22: DNS query (detect C2 beaconing by domain)

# Search in Splunk for Sysmon events:
# index=windows source="WinEventLog:Microsoft-Windows-Sysmon/Operational"`}
        </Block>

        <H>Suricata IDS on Your Lab Network</H>
        <Block>{`# Suricata — network-based IDS/IPS
# Install on your lab host or a dedicated VM that monitors traffic

# Install on Ubuntu
sudo apt update && sudo apt install -y suricata

# Download Emerging Threats rules (free)
sudo suricata-update

# Configure interface to monitor
# /etc/suricata/suricata.yaml
af-packet:
  - interface: eth0    # your lab network interface

# Enable logging to SIEM-friendly format
outputs:
  - eve-log:
      enabled: yes
      filetype: regular
      filename: /var/log/suricata/eve.json
      types:
        - alert:
        - dns:
        - http:
        - tls:
        - ssh:
        - smtp:

# Start Suricata
sudo systemctl start suricata
sudo systemctl enable suricata

# Watch alerts in real time
tail -f /var/log/suricata/fast.log

# Ship eve.json to Splunk:
# Install Splunk Universal Forwarder on the Suricata VM
# Configure inputs.conf to monitor /var/log/suricata/eve.json`}
        </Block>

        <H>Practice Scenarios — Making the Most of Your Lab</H>
        <Block>{`Lab practice scenarios (work through these sequentially):

BEGINNER (week 1-2):
  □ Run nmap against your lab network — identify all hosts and services
  □ Enumerate DVWA manually — find all OWASP Top 10 vulnerabilities
  □ Exploit Metasploitable 2 with Metasploit — get a Meterpreter shell
  □ View the attacks in your SIEM — search for the nmap scans in logs

INTERMEDIATE (week 3-6):
  □ Enumerate the AD environment with nmap, enum4linux, CrackMapExec
  □ Run BloodHound collection and visualise attack paths
  □ Kerberoast the svc-sql account and crack the hash with hashcat
  □ AS-REP Roast bjones (pre-auth disabled)
  □ Pass-the-Hash lateral movement between workstations
  □ Collect Windows Event Logs and Sysmon events for each attack
  □ Write a SIEM detection rule for each attack technique

ADVANCED (week 7+):
  □ Full AD compromise: from unprivileged user to domain admin
  □ DCSync attack with secretsdump.py
  □ Golden Ticket creation and use
  □ Build a detection rule in Splunk for each technique you ran
  □ Write a incident report for the simulated breach
  □ Set up Responder and capture NTLMv2 hashes from network`}
        </Block>

        <IQ
          q="How do you present your home lab in an interview?"
          a="Describe it in operational terms, not hardware terms. Do not say 'I have a virtual machine.' Instead: 'I have a three-tier home lab running on Proxmox. The corporate environment tier has a Windows Server 2022 domain controller, two domain-joined workstations, and a simulated internal web server. The attacker tier runs Kali with BloodHound, Impacket, and CrackMapExec. The defensive tier has an ELK stack ingesting Sysmon telemetry and Windows Security Events from all domain machines. I practise attack techniques — I recently worked through the full Kerberoasting and DCSync attack chain — and then write SIEM detection rules for each technique I run. My most recent detection work was building an EQL query that fires on Sysmon Event 10 LSASS access attempts with the specific GrantedAccess flags used by Mimikatz.' This demonstrates practical knowledge, tool familiarity, and most importantly — that you connect offence to defence."
        />
      </Part>

      <HR />

      <Part title="Cloud Lab — Free Tier Options">
        <P>
          No hardware at all? Use free cloud tiers to build a lab. AWS, Azure, and Google Cloud each offer free tier resources that can host a small but functional lab.
        </P>

        <H>AWS Free Tier Lab</H>
        <Block>{`AWS Free Tier resources (12 months from account creation):
  - 750 hours/month EC2 t2.micro/t3.micro (Linux or Windows)
  - 30 GB EBS storage
  - 750 hours/month RDS t2.micro
  - 5 GB S3 storage

# Basic security lab on AWS free tier:

# 1. Create a VPC with public + private subnets
# Public subnet: attack machine (Kali)
# Private subnet: vulnerable target (no direct internet access)

# 2. Launch Kali Linux from AWS Marketplace (official Kali AMI)
aws ec2 run-instances \
  --image-id ami-KALI_IMAGE_ID \
  --instance-type t2.micro \
  --key-name my-lab-key \
  --security-group-ids sg-xxx \
  --subnet-id subnet-public-xxx

# 3. Launch Ubuntu vulnerable server in private subnet
aws ec2 run-instances \
  --image-id ami-UBUNTU_IMAGE_ID \
  --instance-type t2.micro \
  --key-name my-lab-key \
  --security-group-ids sg-private-xxx \
  --subnet-id subnet-private-xxx

# 4. Install DVWA on Ubuntu
sudo apt update
sudo docker run -d -p 80:80 vulnerables/web-dvwa

# AWS-specific security practice:
# - Misconfigure IAM roles and practice exploitation
# - Use Pacu (AWS pentesting framework): github.com/RhinoSecurityLabs/pacu
# - Practice IAM privilege escalation scenarios
# - Enable AWS GuardDuty (free 30-day trial) and generate findings`}
        </Block>

        <H>Azure Free Tier Lab</H>
        <Block>{`Azure Free Account:
  - $200 credit for 30 days (anything)
  - 12 months of popular free services
  - Always free: Azure AD free tier, Azure Functions (1M executions)

# Azure AD security lab (always free):
# Create an Azure AD tenant — practice IAM security
az ad user create --display-name "Test User" --user-principal-name testuser@yourtenant.onmicrosoft.com \
  --password "LabPassword123!" --force-change-password-next-login false

# Practice Azure AD security scenarios:
# - Conditional Access policies
# - Privileged Identity Management (PIM)
# - Service principal security
# - App registrations and OAuth consent phishing

# Microsoft Defender for Endpoint (free trial 30 days):
# Onboard a Windows VM and generate detections by running attack techniques
# Review alerts in the Security portal (security.microsoft.com)

# Azure Security Benchmark labs:
# docs.microsoft.com/security/benchmark/azure/ — free lab exercises`}
        </Block>

        <Err
          title="Exposing vulnerable lab machines to the internet"
          bad="Set Metasploitable or DVWA to a bridged network adapter or give it a public IP — it gets compromised by automated scanners within minutes."
          good="Always run vulnerable lab machines on Host-Only or isolated NAT networks with no direct internet exposure. A bridged adapter means the VM is visible on your home network and potentially the internet. Use host-only for anything intentionally vulnerable — connect the attacker VM to the same host-only network instead."
        />

        <Err
          title="Never using the lab defensively"
          bad="Set up a lab to run attacks, practise offensive techniques, but never look at the logs or write detection rules for what you just did."
          good="Every offensive session should end with a defensive session: pull the logs from what you did, search the SIEM for the attack, and write a detection rule. This dual-use practice is what makes you understand both sides — and it is what hiring managers for both offensive and defensive roles want to see."
        />

        <Err
          title="Not automating lab setup"
          bad="Manually recreate your AD lab from scratch every time you want a clean slate — spending 3 hours on setup instead of practice."
          good="Script your lab setup with PowerShell or Ansible. Once you have a working lab, document every configuration step as a script. To reset: run destroy.sh, then provision.sh. Ready in 15 minutes. Tools: Vagrant automates VM creation, Ansible automates configuration. GOAD is a fully scripted AD lab you can tear down and rebuild with one command."
        />
      </Part>

      <HR />

      <Part title="Lab Documentation and Portfolio">
        <P>
          An undocumented lab is a missed opportunity. Your lab write-ups are your portfolio — evidence that you have hands-on skills that certificates cannot prove. Write-ups for your most interesting lab sessions belong on GitHub, LinkedIn, or a personal blog.
        </P>

        <H>Write-Up Template</H>
        <Block>{`Lab session write-up template:

Title: [Attack Name] — [Lab Environment]
Date: YYYY-MM-DD
Duration: X hours
Objective: What were you trying to accomplish?

Environment:
  - DC01: Windows Server 2022 (192.168.100.10)
  - WS01: Windows 10 Pro (192.168.100.20) — domain joined
  - Kali: 192.168.100.5

Attack Path:
  1. Reconnaissance
     [Commands run, output observed]

  2. Initial Access
     [How you got the first foothold, credential or vulnerability]

  3. Privilege Escalation / Lateral Movement
     [Step-by-step with commands and screenshots]

  4. Objective Achieved
     [Evidence: flag, domain admin shell, DCSync output]

Detection Opportunity:
  SIEM query that would have caught this attack:
  [Paste SPL / KQL / EQL query]

  Windows Event IDs triggered: [list IDs]

  Why this technique might evade the query:
  [Evasion considerations]

Key Learnings:
  - What worked
  - What failed and why
  - What you would do differently
  - One new technique you discovered`}
        </Block>

        <ProTip>Post your lab write-ups on GitHub (as Markdown files) and link them in your resume and LinkedIn profile. Hiring managers for both offensive and defensive roles look specifically for demonstrated lab work. A write-up that shows "I ran Kerberoasting, cracked the hash, then wrote a SIEM detection rule" demonstrates both offensive knowledge and defensive thinking — the combination that makes you stand out.</ProTip>
      </Part>

      <HR />

      <KeyTakeaways items={[
        'A home lab is the most compelling portfolio item for entry-level interviews — candidates who can describe their AD environment and the attacks they practised against it stand out from certification-only candidates.',
        'Always run vulnerable lab VMs on Host-Only or isolated NAT networks — never bridge them to your home network or the internet.',
        'Snapshots are your safety net: take one after OS install, after tool installation, and before every attack session so you can roll back instantly.',
        'A minimum viable AD lab requires just 8 GB RAM: Windows Server DC at 2 GB, one Windows 10 workstation at 2 GB, and Kali at 2 GB.',
        'Intentional misconfigurations make labs realistic: weak Kerberoastable service accounts, AS-REP roasting targets, ACL abuse paths, and unconstrained delegation are all common in real enterprises.',
        'Sysmon transforms Windows event logging from basic to forensically rich — install it with the SwiftOnSecurity configuration on every Windows VM in your lab.',
        'Every offensive lab session should include a defensive session: pull the logs, find the attack in your SIEM, and write a detection rule for what you just did.',
        'GOAD (Game of Active Directory) is a fully scripted multi-domain AD lab you can deploy with one command — the fastest path to a realistic AD environment for attack practice.',
        'Free cloud options (AWS free tier, Azure AD free) let you build a functional lab with no hardware investment — especially useful for practising cloud-specific security scenarios.',
        'Document every lab session with a write-up: attack path, commands, screenshots, detection queries. These write-ups are your portfolio evidence of hands-on skill.',
      ]} />

      <Callout type="info">
        <strong>Up Next — Module 40: Interview Preparation and Landing Your First Security Job</strong><br />
        The final module brings everything together. You will learn how to position yourself for security roles, answer the most common technical and behavioural interview questions, negotiate your first offer, and build the professional network that accelerates your career. This is where 39 modules of knowledge becomes a job.
      </Callout>

    </LearnLayout>
  )
}
