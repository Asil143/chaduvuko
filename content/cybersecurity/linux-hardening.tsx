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

export default function Module16() {
  return (
    <LearnLayout
      title="Linux Hardening — From Default Install to Production-Ready"
      description="A systematic approach to hardening Linux servers: minimal install, user privilege management, SSH, kernel parameters, SELinux/AppArmor, audit logging, and CIS compliance."
      section="Cybersecurity — Module 16"
      readTime="44 min"
      updatedAt="May 2026"
    >
      <Part>
        <P>
          A default Linux install is configured for convenience, not security. Root login is often enabled. Unnecessary services are running. Kernel security features are not enabled. Password authentication is allowed over SSH. A hardening process systematically closes these gaps, reducing the attack surface before the server handles any production traffic.
        </P>
        <P>
          This module follows the <Hl>CIS (Center for Internet Security) Linux Benchmark</Hl> structure — the industry standard for Linux hardening. You'll work through each major category: minimal installation, filesystem security, user and permission management, SSH hardening, network and kernel parameters, mandatory access controls, audit logging, and automated compliance checking. Every control is explained at the level of why it matters, not just what commands to run.
        </P>
      </Part>

      <HR />

      <Part>
        <H>1. Minimal Installation and Attack Surface Reduction</H>
        <P>
          Every installed package is a potential vulnerability. Every running service is a potential entry point. The first hardening principle is to <Hl>install only what you need and run only what you need</Hl>. Start from a minimal base image (Ubuntu Server minimal, CentOS minimal, Debian netinstall) rather than a desktop or full server image.
        </P>
        <Block>{`# Audit installed packages — identify unnecessary software
dpkg --list | grep -E "^ii" | wc -l   # count installed packages

# Remove example unnecessary packages:
apt remove --purge telnet              # Use SSH instead
apt remove --purge rsh-server          # Obsolete, replace with SSH
apt remove --purge nis                 # Network Information Service (legacy)
apt remove --purge talk ntalk          # Chat services, no longer needed
apt remove --purge xinetd              # Legacy inetd superserver

# Clean up:
apt autoremove --purge
apt clean

# Audit running services:
systemctl list-units --type=service --state=running

# Disable unnecessary services:
systemctl disable --now avahi-daemon   # mDNS/Bonjour — not needed on servers
systemctl disable --now cups           # Printing — not needed on servers
systemctl disable --now bluetooth      # Servers don't need bluetooth
systemctl disable --now rpcbind        # NFS — only if not used

# Check open ports BEFORE and AFTER:
ss -tnlp                              # TCP listening ports + process names
# Before: 22, 80, 443, 111, 5353, ...
# After:  22, 80, 443 (only what you run)

# Verify no processes listening on unexpected ports:
ss -tnlp | grep -v "127.0.0.1\|::1"  # External-facing listeners only`}</Block>
      </Part>

      <HR />

      <Part>
        <H>2. User Account Security</H>
        <P>
          User accounts are a primary attack surface. Default configurations often have accounts with empty passwords, system accounts with shell access, and no enforcement of password quality. Hardening user accounts means ensuring every account is intentional, uses strong authentication, and has minimum necessary privileges.
        </P>
        <Block>{`# Audit user accounts
# Find accounts with empty passwords (critical):
awk -F: '($2 == "" || $2 == "!")' /etc/shadow
# Any output here = accounts with no password — immediate fix required

# Find accounts with UID 0 (root privileges):
awk -F: '($3 == 0) {print $1}' /etc/passwd
# Should output only: root
# Any other UID 0 accounts = backdoor

# Find system accounts with login shells (should have /sbin/nologin):
awk -F: '($3 < 1000 && $7 != "/sbin/nologin" && $7 != "/bin/false" && $1 != "root")' /etc/passwd

# Lock system accounts that don't need login:
usermod -s /sbin/nologin daemon
usermod -s /sbin/nologin bin
usermod -s /sbin/nologin nobody

# Password policy configuration (/etc/security/pwquality.conf):
minlen = 14          # Minimum 14 characters
minclass = 3         # Require 3 character classes (upper, lower, digit, special)
maxrepeat = 3        # No more than 3 consecutive identical characters
dcredit = -1         # At least 1 digit
ucredit = -1         # At least 1 uppercase
lcredit = -1         # At least 1 lowercase
ocredit = -1         # At least 1 special character

# Password aging (/etc/login.defs):
PASS_MAX_DAYS   90   # Expire after 90 days
PASS_MIN_DAYS   7    # Minimum 7 days between changes (prevent rapid cycling)
PASS_WARN_AGE   14   # Warn 14 days before expiry

# Apply aging to existing accounts:
chage --maxdays 90 --mindays 7 --warndays 14 username

# Account lockout (PAM — /etc/security/faillock.conf):
deny = 5             # Lock after 5 failures
unlock_time = 900    # 15 minute lockout
fail_interval = 900  # Count failures within 15-minute window`}</Block>
        <Block>{`# sudo configuration — principle of least privilege
# /etc/sudoers (edit with visudo ONLY — visudo validates syntax)

# BAD: Allows user to run anything as root, no password required
jenkins ALL=(ALL) NOPASSWD: ALL

# BETTER: Allow only specific commands
jenkins ALL=(root) NOPASSWD: /usr/bin/systemctl restart nginx
deploy  ALL=(root) NOPASSWD: /usr/local/bin/deploy.sh

# BEST: Also log all sudo usage (enabled by default in most distros)
# Check: /var/log/auth.log or journalctl -u sudo

# Require tty for sudo (prevents scripts from using sudo):
Defaults requiretty

# Limit sudo session timeout:
Defaults timestamp_timeout=5   # 5 minutes before password required again

# Alert on sudo usage (webhook/SIEM):
Defaults log_host, log_year, logfile="/var/log/sudo.log"`}</Block>
      </Part>

      <HR />

      <Part>
        <H>3. SSH Hardening — Comprehensive Configuration</H>
        <P>
          SSH is the most commonly exposed service on Linux servers. A hardened SSH configuration eliminates password-based brute force, restricts access to specific users and keys, and reduces the attack surface of the SSH daemon itself.
        </P>
        <Block>{`# /etc/ssh/sshd_config — production hardened configuration

# === Authentication ===
PasswordAuthentication no        # Key-based auth only — no passwords
PermitRootLogin no               # Never allow direct root SSH
PubkeyAuthentication yes
AuthorizedKeysFile .ssh/authorized_keys

# MFA with keys + TOTP (optional but recommended for privileged accounts):
# AuthenticationMethods publickey,keyboard-interactive

# === Protocol Settings ===
Protocol 2                       # SSH version 2 only (v1 is broken)
Port 22                          # Consider non-standard port (security by obscurity)
                                 # Better: firewall restricts source IPs to port 22
AddressFamily inet               # IPv4 only if not using IPv6

# === Algorithms (disable weak ciphers) ===
Ciphers chacha20-poly1305@openssh.com,aes256-gcm@openssh.com,aes128-gcm@openssh.com
MACs hmac-sha2-512-etm@openssh.com,hmac-sha2-256-etm@openssh.com
KexAlgorithms curve25519-sha256,curve25519-sha256@libssh.org,diffie-hellman-group18-sha512

# === Access Control ===
AllowUsers deploy admin          # Whitelist specific users (NEVER use DenyUsers alone)
# AllowGroups sshusers           # Or by group membership

# === Hardening ===
X11Forwarding no                 # No GUI forwarding on servers
AllowTcpForwarding no            # Disable tunneling unless needed
AllowStreamLocalForwarding no   # Disable Unix socket forwarding
GatewayPorts no                  # Don't allow remote hosts to connect to forwarded ports
PermitTunnel no                  # No VPN tunneling
MaxAuthTries 3                   # Disconnect after 3 failed attempts
MaxSessions 4                    # Limit concurrent sessions per connection
LoginGraceTime 30                # 30 seconds to authenticate before disconnect
ClientAliveInterval 300          # Check client every 5 minutes
ClientAliveCountMax 2            # Disconnect after 2 missed checks (idle timeout: 10 min)
TCPKeepAlive yes

# === Disable Dangerous Features ===
PermitEmptyPasswords no
PermitUserEnvironment no         # Don't allow users to set environment variables
UsePAM yes                       # Use PAM for additional authentication checks
PrintLastLog yes                 # Show last login info (security awareness)
Banner /etc/issue.net            # Legal warning banner

# Apply and test:
sshd -t && systemctl restart sshd    # Test config BEFORE restarting (prevent lockout!)`}</Block>
        <Block>{`# SSH key management best practices

# Generate strong SSH key pair (ED25519 preferred):
ssh-keygen -t ed25519 -C "user@company.com"
# Or RSA if ED25519 not supported:
ssh-keygen -t rsa -b 4096 -C "user@company.com"

# NEVER share private keys between users or systems
# Each user/role should have their own key pair

# authorized_keys restrictions (per key):
# Limit what a key can do, where it can connect from:
from="192.168.1.0/24",no-port-forwarding,no-X11-forwarding,no-agent-forwarding,command="/usr/local/bin/deploy.sh" ssh-ed25519 AAAA...

# Audit authorized_keys across all users:
for user in $(cut -d: -f1 /etc/passwd); do
    home=$(eval echo ~$user)
    if [ -f "$home/.ssh/authorized_keys" ]; then
        echo "=== $user ==="
        cat "$home/.ssh/authorized_keys"
    fi
done

# SSH certificate authority (for large environments):
# Instead of distributing individual public keys, use SSH CAs
# CA signs user keys → servers trust CA → no per-server authorized_keys
ssh-keygen -s ca_key -I "user@company.com" -n username -V +1d user_key.pub
# ← Signs user_key.pub, valid for 1 day, for principal "username"`}</Block>
      </Part>

      <HR />

      <Part>
        <H>4. Kernel Security Parameters (sysctl)</H>
        <P>
          Linux's <Hl>sysctl</Hl> system configures kernel parameters at runtime. Many security-relevant parameters are disabled by default. These settings harden the network stack, limit information exposure, and enable kernel-level protections.
        </P>
        <Block>{`# /etc/sysctl.d/99-security.conf — kernel security hardening

# ===== Network Security =====
# Disable IP forwarding (unless this is a router/firewall):
net.ipv4.ip_forward = 0
net.ipv6.conf.all.forwarding = 0

# Block source-routed packets (attacker-controlled routing):
net.ipv4.conf.all.accept_source_route = 0
net.ipv4.conf.default.accept_source_route = 0

# Reject ICMP redirects (prevent MITM via routing manipulation):
net.ipv4.conf.all.accept_redirects = 0
net.ipv4.conf.default.accept_redirects = 0
net.ipv4.conf.all.send_redirects = 0
net.ipv6.conf.all.accept_redirects = 0

# Enable TCP SYN cookies (prevent SYN flood):
net.ipv4.tcp_syncookies = 1
net.ipv4.tcp_max_syn_backlog = 2048

# Log martian packets (packets with impossible source addresses):
net.ipv4.conf.all.log_martians = 1

# Enable reverse path filtering (anti-spoofing):
net.ipv4.conf.all.rp_filter = 1
net.ipv4.conf.default.rp_filter = 1

# Disable ICMP broadcast responses (Smurf attack):
net.ipv4.icmp_echo_ignore_broadcasts = 1

# Ignore bogus ICMP errors:
net.ipv4.icmp_ignore_bogus_error_responses = 1

# ===== Kernel Security =====
# Restrict dmesg to root (kernel messages reveal system info):
kernel.dmesg_restrict = 1

# Restrict kernel pointers (prevent info leak of kernel addresses):
kernel.kptr_restrict = 2

# Disable core dumps (may contain sensitive data):
fs.suid_dumpable = 0

# Restrict ptrace (prevents process injection/debugging by unprivileged users):
kernel.yama.ptrace_scope = 1    # Only parent can ptrace child
# kernel.yama.ptrace_scope = 3  # Disable ptrace entirely (most restrictive)

# Randomise memory layout (ASLR):
kernel.randomize_va_space = 2   # Full randomisation (default on most distros)

# Restrict /proc to owner (prevent process enumeration by other users):
# Requires mounting proc with hidepid=2 (see fstab section)

# Apply immediately:
sysctl -p /etc/sysctl.d/99-security.conf`}</Block>
      </Part>

      <HR />

      <Part>
        <H>5. Filesystem Security — Permissions, Mount Options, and Integrity</H>
        <P>
          Filesystem hardening prevents attackers from using writable, executable directories to store and run malicious binaries. Mount options like <Hl>noexec</Hl>, <Hl>nosuid</Hl>, and <Hl>nodev</Hl> limit what can be done with files in specific partitions.
        </P>
        <Block>{`# /etc/fstab — secure mount options for key partitions

# /tmp: Writable by all users — attackers drop payloads here
tmpfs  /tmp      tmpfs  defaults,noexec,nosuid,nodev  0 0
#       ↑                         ↑       ↑      ↑
#       RAM-based                 no execute bits no SUID no device files
#       (tmpfs auto-cleaned on reboot)

# /var/tmp: Persists across reboots — more dangerous than /tmp
tmpfs  /var/tmp  tmpfs  defaults,noexec,nosuid,nodev  0 0

# /dev/shm: Shared memory — used by some exploit techniques
tmpfs  /dev/shm  tmpfs  defaults,noexec,nosuid,nodev  0 0

# /home: User directories — no SUID, no device files
/dev/sda3  /home  ext4  defaults,nosuid,nodev  0 2

# /boot: Boot files — no modification by non-root
/dev/sda1  /boot  ext4  defaults,nosuid,nodev,noexec,ro  0 2

# proc with hidepid (restricts process visibility):
proc  /proc  proc  defaults,hidepid=2,gid=proc  0 0
# hidepid=2: Non-root users can only see their own processes in /proc

# Apply without reboot:
mount -o remount /tmp
mount -o remount /dev/shm`}</Block>
        <Block>{`# Find dangerous permissions

# World-writable files (any user can modify):
find / -xdev -type f -perm -0002 -not -path "/proc/*" -not -path "/sys/*"

# World-writable directories (any user can add/remove files):
find / -xdev -type d -perm -0002 -not -path "/proc/*" -not -path "/tmp" -not -path "/var/tmp"

# SUID executables (run as file owner, not caller):
find / -xdev -perm -4000 -type f -not -path "/proc/*"
# Review each result: are these expected? (passwd, sudo, ping are normal)

# SGID executables:
find / -xdev -perm -2000 -type f -not -path "/proc/*"

# Files with no owner (orphaned after user deletion):
find / -xdev -nouser -o -nogroup 2>/dev/null

# Immutable files (use chattr to lock critical files):
chattr +i /etc/passwd /etc/shadow /etc/gshadow /etc/group
# ← Prevents modification even by root (until chattr -i removes it)
# lsattr /etc/passwd   → verify immutability flag set`}</Block>
        <Block>{`# File integrity monitoring with AIDE (Advanced Intrusion Detection Environment)

# Install and initialise:
apt install aide
aide --init
mv /var/lib/aide/aide.db.new /var/lib/aide/aide.db

# Run daily check (add to cron):
aide --check

# Output shows:
# Changed files: /etc/passwd (modifications made since baseline)
# Added files:   /tmp/backdoor (new file appeared)
# Removed files: /usr/bin/original (file deleted)

# Any change to critical binaries, configuration, or libraries
# should be correlated with a change ticket. Unexpected = investigation.

# /etc/aide.conf rules example:
/etc/      NORMAL        # Monitor /etc for any changes
/usr/bin/  NORMAL        # Monitor system binaries
/usr/sbin/ NORMAL
!/var/     # Exclude /var (changes constantly)
!/tmp/     # Exclude /tmp
!/proc/    # Exclude /proc`}</Block>
      </Part>

      <HR />

      <Part>
        <H>6. Mandatory Access Control — SELinux and AppArmor</H>
        <P>
          Standard Linux permissions (DAC — Discretionary Access Control) let the file owner decide who can access their files. <Hl>Mandatory Access Control (MAC)</Hl> adds a second layer that the OS enforces regardless of file permissions — a process can only do what its security policy explicitly permits, even if it runs as root.
        </P>
        <Block>{`SELinux (Red Hat / CentOS / Fedora):

Mode:
  Enforcing:   Policy enforced, violations blocked + logged
  Permissive:  Violations logged but NOT blocked (for testing/debugging)
  Disabled:    SELinux completely off (NOT recommended)

# Check status:
sestatus
getenforce    # Returns: Enforcing / Permissive / Disabled

# Check SELinux denials (what was blocked):
ausearch -m avc -ts recent         # Recent denials
audit2why < /var/log/audit/audit.log   # Human-readable explanations

# How SELinux works:
# Every process has a label: user:role:type:level (e.g., httpd_t for Apache)
# Every file has a label: user:role:type:level (e.g., httpd_sys_content_t)
# Policy rules: "httpd_t can read httpd_sys_content_t" — allowed
#               "httpd_t cannot write shadow_t" — Apache can't read /etc/shadow

# Apache webshell scenario:
# Attacker uploads PHP webshell → /var/www/html/shell.php
# Webshell tries to run: /bin/bash
# DAC: /bin/bash is executable, Apache runs as www-data = allowed!
# SELinux: httpd_t cannot execute bin_t → DENIED + logged
# Apache process is confined — webshell can't escape to shell

# Set correct SELinux context on files:
chcon -t httpd_sys_content_t /var/www/html/index.php
restorecon -R /var/www/html/  # Restore to default context per policy

# Create policy for new application:
audit2allow -M mypolicy < /var/log/audit/audit.log  # Generate from denials
semodule -i mypolicy.pp                              # Install policy`}</Block>
        <Block>{`AppArmor (Ubuntu / Debian):

AppArmor uses profiles that define what each program can do:
  Read/write specific paths
  Execute specific programs
  Network connections allowed
  Capabilities (CAP_NET_ADMIN, CAP_SYS_PTRACE, etc.)

# Check status:
aa-status
apparmor_status

# Profiles are in /etc/apparmor.d/

# Example profile for nginx:
# /etc/apparmor.d/usr.sbin.nginx
/usr/sbin/nginx {
  #include <abstractions/base>
  #include <abstractions/nameservice>

  capability dac_override,
  capability net_bind_service,
  capability setuid,
  capability setgid,

  /var/log/nginx/ r,
  /var/log/nginx/** rw,
  /var/www/html/** r,
  /etc/nginx/** r,
  /run/nginx.pid rw,

  deny /etc/shadow r,       # Explicit deny — nginx cannot read shadow
  deny /root/** rwx,        # Cannot access root's home
}

# Modes:
aa-enforce /usr/sbin/nginx    # Enforce the profile
aa-complain /usr/sbin/nginx   # Log violations only (for testing)
aa-disable /usr/sbin/nginx    # Disable profile

# Generate profile for new application:
aa-genprof /path/to/application   # Interactive profile generator`}</Block>
      </Part>

      <HR />

      <Part>
        <H>7. Audit Logging — auditd Configuration</H>
        <P>
          The Linux <Hl>auditd</Hl> daemon provides kernel-level audit logging that captures security-relevant events: file access, system calls, privilege changes, and authentication events. Unlike application logs, auditd operates at the kernel level and cannot be disabled by a process running as root without triggering an alert (if configured correctly).
        </P>
        <Block>{`# /etc/audit/rules.d/99-security.rules — comprehensive audit rules

# === Audit log configuration ===
-b 8192          # Buffer size for audit events
-f 2             # Fail mode: 2 = kernel panic if audit daemon fails
                 # (prevents audit bypass by killing auditd)

# === File system watches ===
# Watch critical files for any access or modification:
-w /etc/passwd -p wa -k identity_changes
-w /etc/shadow -p wa -k identity_changes
-w /etc/sudoers -p wa -k privilege_changes
-w /etc/sudoers.d/ -p wa -k privilege_changes
-w /etc/ssh/sshd_config -p wa -k sshd_config
-w /var/log/lastlog -p wa -k login_events
-w /var/log/faillog -p wa -k login_events

# Watch for binary modifications:
-w /usr/bin/ -p wa -k binary_modification
-w /usr/sbin/ -p wa -k binary_modification
-w /bin/ -p wa -k binary_modification
-w /sbin/ -p wa -k binary_modification

# === Privileged commands ===
# Log all use of setuid/setgid programs:
-a always,exit -F arch=b64 -S execve -F euid=0 -k root_commands

# Log sudo usage:
-w /usr/bin/sudo -p x -k sudo_usage

# === System calls ===
# Log privilege escalation attempts:
-a always,exit -F arch=b64 -S setuid -S setgid -k privilege_escalation
-a always,exit -F arch=b64 -S setresuid -S setresgid -k privilege_escalation

# Log kernel module loading (rootkit installation):
-w /sbin/insmod -p x -k kernel_modules
-w /sbin/rmmod -p x -k kernel_modules
-w /sbin/modprobe -p x -k kernel_modules

# Log scheduling (cron manipulation):
-w /etc/cron.d/ -p wa -k cron_changes
-w /etc/crontab -p wa -k cron_changes
-w /var/spool/cron/ -p wa -k cron_changes

# Lock rules (prevent auditd config changes without reboot):
-e 2

# Apply:
augenrules --load
systemctl restart auditd`}</Block>
        <Block>{`# Querying audit logs

# Search for identity change events:
ausearch -k identity_changes -ts today

# Search for all commands run by a specific user:
ausearch -ua 1001 -ts today    # By UID

# Search for failed file access:
ausearch -m SYSCALL -sc openat -sv no

# Search for privilege escalation:
ausearch -k privilege_escalation -ts today

# Generate report:
aureport --summary             # Quick summary
aureport --auth                # Authentication events
aureport --failed              # Failed operations
aureport --executable          # Programs executed

# Forward to SIEM (JSON output):
ausearch --format json -ts today | send_to_siem.py`}</Block>
      </Part>

      <HR />

      <Part>
        <H>8. Automated Compliance Checking</H>
        <P>
          After manual hardening, use automated tools to check compliance against security benchmarks. <Hl>Lynis</Hl> (open source, agentless) and <Hl>OpenSCAP</Hl> (the standard for government compliance) automate CIS Benchmark checks and produce actionable reports.
        </P>
        <Block>{`# Lynis — open-source security auditing tool

# Install:
apt install lynis

# Run audit:
lynis audit system

# Output sections:
# System tools
# Kernel
# Memory and processes
# Users, groups, authentication
# Shells
# File systems
# Storage
# Name services
# Ports and packages
# Networking
# Printers and spools
# Software: file integrity
# Software: System tooling
# Software: OpenSSL
# SSH support
# SNMP support
# Databases
# LDAP services
# PHP
# Squid
# Logging and files
# Insecure services
# Banners and identification
# Scheduled tasks
# Accounting
# Time and synchronization
# Cryptography
# Virtualization
# Containers
# Security frameworks
# File permissions
# Home directories
# Kernel hardening

# Hardening score (0-100):
# Lynis security scan score: 68 [########## ]
# Score < 50: Serious hardening gaps
# Score 50-70: Some work needed (typical default install)
# Score 70-85: Well-hardened
# Score 85+: Excellent (typical CIS hardened image)

# View specific suggestions:
grep -A 2 "Suggestion" /var/log/lynis.log | head -40`}</Block>
        <Block>{`# OpenSCAP — CIS Benchmark compliance checking

# Install:
apt install scap-security-guide openscap-scanner

# List available profiles:
oscap info /usr/share/xml/scap/ssg/content/ssg-ubuntu2204-ds.xml | grep -A1 "Profile ID"

# Run CIS Level 1 audit:
oscap xccdf eval \
  --profile xccdf_org.ssgproject.content_profile_cis_level1_server \
  --results /tmp/results.xml \
  --report /tmp/report.html \
  /usr/share/xml/scap/ssg/content/ssg-ubuntu2204-ds.xml

# Open report in browser:
firefox /tmp/report.html

# Report shows:
# Total rules evaluated: 234
# Passed:  187 (80%)
# Failed:   47 (20%) ← each is a finding with remediation steps
# Notapplicable: 0

# Also produces a script to fix all failures:
oscap xccdf generate fix --results /tmp/results.xml --output fix.sh
bash fix.sh   # Run remediation script (test on non-production first!)`}</Block>
        <ProTip>
          Run Lynis or OpenSCAP immediately after every new server setup as part of your provisioning pipeline. A baseline score gives you a benchmark to compare against after any changes. If your score drops unexpectedly, investigate why before deploying to production.
        </ProTip>
      </Part>

      <HR />

      <Part>
        <H>Putting It Together — Hardening Checklist</H>
        <Block>{`Linux Hardening Checklist (CIS Benchmark Level 1):

Filesystem:
  [ ] Separate partitions for /tmp, /var, /var/log, /home
  [ ] noexec, nosuid, nodev on /tmp, /dev/shm, /var/tmp
  [ ] hidepid=2 on /proc (restrict process visibility)
  [ ] AIDE installed, initialised, daily checks scheduled
  [ ] Immutable flag on /etc/passwd, /etc/shadow (chattr +i)

System:
  [ ] Minimal package installation (review all installed packages)
  [ ] Unnecessary services disabled and removed
  [ ] NTP configured and synchronised (auditd needs accurate time)
  [ ] Core dumps disabled (fs.suid_dumpable = 0)
  [ ] ASLR enabled (kernel.randomize_va_space = 2)

User Accounts:
  [ ] No accounts with empty passwords
  [ ] No non-root accounts with UID 0
  [ ] System accounts set to /sbin/nologin
  [ ] Password policy configured (length, complexity, aging)
  [ ] Account lockout configured (5 failures, 15-minute lockout)
  [ ] Root direct login disabled (SSH and console)
  [ ] sudo requires tty, has 5-minute timeout

SSH:
  [ ] PasswordAuthentication no
  [ ] PermitRootLogin no
  [ ] AllowUsers whitelist configured
  [ ] Weak ciphers/MACs disabled
  [ ] MaxAuthTries 3
  [ ] ClientAlive idle timeout configured (10-minute)
  [ ] X11Forwarding no, AllowTcpForwarding no

Kernel Parameters:
  [ ] IP forwarding disabled (unless router)
  [ ] SYN cookies enabled
  [ ] ICMP redirects rejected
  [ ] Reverse path filtering enabled
  [ ] kptr_restrict = 2, dmesg_restrict = 1
  [ ] ptrace_scope = 1+

Mandatory Access Control:
  [ ] SELinux enforcing (RHEL) or AppArmor enabled (Ubuntu)
  [ ] All services running under confined profiles
  [ ] Policy violations reviewed and resolved

Audit Logging:
  [ ] auditd installed and running
  [ ] Rules for identity, privilege, binary, and cron changes
  [ ] Log rotation and retention policy configured
  [ ] Logs forwarded to central SIEM or log aggregator
  [ ] auditd configured to panic on failure (-f 2)

Firewall:
  [ ] iptables/nftables/firewalld configured: default deny
  [ ] Only required ports open (SSH from specific IPs if possible)
  [ ] IPv6 firewall also configured (many forget this)

Automated Compliance:
  [ ] Lynis score > 70
  [ ] OpenSCAP CIS Level 1 pass rate > 90%
  [ ] Findings tracked and remediated`}</Block>
      </Part>

      <HR />

      <Part>
        <H>Interview Questions</H>

        <IQ q="What does SELinux actually protect against? Give a concrete example where SELinux stops an attack that DAC permissions would allow.">
          SELinux enforces mandatory access control policies that confine what processes can do, regardless of the file permissions (DAC) they would otherwise be allowed by. The canonical example is a web server compromise via a webshell. An attacker uploads a PHP file to /var/www/html/shell.php. The file has standard web server permissions — Apache can read it. The attacker uses the webshell to execute /bin/bash. With only DAC: Apache runs as www-data, /bin/bash is world-executable, so the shell runs successfully and the attacker has a shell.
          <br /><br />
          With SELinux in enforcing mode: Apache runs under the httpd_t SELinux type. The policy for httpd_t allows it to read httpd_sys_content_t files (web content) but does NOT allow it to execute bin_t files (/bin/bash). When the webshell tries to exec /bin/bash, the kernel's SELinux enforcement layer checks the policy — the operation is not permitted — and blocks it, logging an AVC denial. The attacker gets a permission denied error despite file permissions appearing to allow it. SELinux also prevents httpd_t from reading /etc/shadow, connecting to unauthorized network ports, or writing to system directories — confinement that pure file permissions cannot provide.
        </IQ>

        <IQ q="Explain the difference between noexec and nosuid mount options. When would you use each?">
          The noexec mount option prevents execution of any binary from that filesystem — if a file has the execute bit set, Linux will refuse to run it via exec() system calls when it resides on a noexec-mounted filesystem. This prevents attackers who can write files to /tmp, /dev/shm, or /var/tmp from executing payloads they've uploaded there. It's a critical control because those directories are world-writable by design.
          <br /><br />
          The nosuid option prevents SUID (Set User ID) and SGID bits from having effect on executables mounted there. A SUID binary runs as its file owner (often root) regardless of who calls it. If an attacker can place a SUID-root binary on a writable filesystem, they can escalate privileges. nosuid ensures SUID bits on executables in that filesystem are silently ignored by the kernel — the binary runs as the calling user's UID, not as root.
          <br /><br />
          Both should be applied to /tmp, /dev/shm, /var/tmp, and any user-writable directories. Neither applies to / or /usr (you need to execute system binaries and many of them are SUID for legitimate reasons). For /home, nosuid and nodev are appropriate, but noexec may interfere with legitimate user scripts — evaluate based on whether users legitimately execute binaries from their home directories.
        </IQ>

        <IQ q="What is auditd, and how is it different from regular application logging?">
          auditd is the Linux kernel's audit subsystem, operated through a userspace daemon. Unlike application logs (which are generated by the application and can be suppressed by a compromised application), auditd rules are loaded into the kernel and operate at the system call level. The kernel itself generates audit events — a process cannot suppress its own audit trail by modifying its application code, because the events are generated by the kernel when the system call happens, not by the application.
          <br /><br />
          Practically this means auditd captures events that application logs miss: which specific file was accessed by which process with which UID, which user ran which command as root, when /etc/passwd was modified and by whom, when a new kernel module was loaded. The -f 2 option (fail mode panic) makes the kernel panic if auditd stops functioning — an attacker cannot simply kill auditd to blind the logging system. This level of tamper-resistance is why regulated environments (PCI-DSS, HIPAA, FedRAMP) require auditd-based logging rather than or in addition to application logging. The events are also structured (with user, process, return code, timestamp) making them suitable for direct SIEM ingestion.
        </IQ>

        <IQ q="You're auditing a server and find that /tmp is mounted without noexec. What's the risk and how do you fix it without rebooting?">
          Without noexec on /tmp, any user who can write to /tmp can place an executable binary there and run it. This is particularly dangerous because /tmp is world-writable by design. An attacker who has code execution as any user (even www-data) can download a privilege escalation exploit or backdoor to /tmp, chmod +x it, and execute it. The same applies to /dev/shm (shared memory, also world-writable).
          <br /><br />
          The fix without rebooting: mount -o remount,noexec,nosuid,nodev /tmp. This changes the mount options on the already-mounted filesystem — no reboot required. Verify: touch /tmp/test.sh; chmod +x /tmp/test.sh; /tmp/test.sh should return "Permission denied." To persist across reboots, update /etc/fstab to include noexec,nosuid,nodev in the /tmp options. For tmpfs (RAM-based /tmp): "tmpfs /tmp tmpfs defaults,noexec,nosuid,nodev 0 0". If /tmp is currently a directory on the root filesystem (not a separate mount), you'll need to either create a separate tmpfs mount or bind-mount with new options — the remount trick only works on separate mount points.
        </IQ>

        <IQ q="Walk me through how you'd verify a Linux server hasn't been compromised after receiving a threat intelligence alert about an attack on your infrastructure.">
          I'd approach this as a structured forensic investigation using the system's logs and monitoring data, starting from the most tamper-resistant sources. First, check authentication logs: ausearch -k login_events -ts last-week and review /var/log/auth.log for unexpected successful logins, especially from unusual IPs or at unusual times. Cross-reference with successful logins and any sudo usage. Second, check running processes: compare ps aux output against a known-good baseline, and use ss -tnlp to identify any new listening services. Third, check for new accounts (diff /etc/passwd against a baseline), new SSH authorized keys (check all ~/.ssh/authorized_keys), new scheduled tasks (crontab -l for all users, /etc/cron.d/, /var/spool/cron/), and new sudo rules (/etc/sudoers.d/). Fourth, check file integrity using AIDE (if configured): aide --check will show any files modified since the baseline. Focus on /usr/bin/, /usr/sbin/, /etc/. Fifth, check for unusual network connections: ss -tnp shows all current connections. Look for connections to unexpected external IPs, especially from system processes. If the server has a SIEM, pull its process creation events (Event ID 4688 equivalent in auditd: ausearch -sc execve) and look for unusual command execution. Finally, check kernel integrity: lsmod shows loaded modules — anything not in the expected list could be a rootkit. Memory forensics with Volatility would be the definitive investigation if compromise is suspected.
        </IQ>
      </Part>

      <HR />

      <Part>
        <H>Error Library — Common Mistakes</H>

        <Err
          title="Running SELinux in permissive mode permanently"
          cause="When SELinux generates AVC denials for a new application, the quick fix is to set it to permissive mode — it stops blocking things. Many administrators do this temporarily for troubleshooting and never switch back to enforcing. Permissive mode logs violations but doesn't block them — the protection is completely gone."
          fix="Use permissive mode only for specific profiles during development: aa-complain /path/to/app (AppArmor) or semanage permissive -a httpd_t (SELinux). Keep the rest of the system in enforcing mode. Fix denials properly using audit2allow to understand why the denial occurred and create the correct policy, rather than disabling the control entirely."
        />

        <Err
          title="Setting sshd_config changes without testing the configuration first"
          cause="A typo or invalid directive in sshd_config causes sshd to fail to restart. If you're connected via SSH, your current session survives (it's already established), but you can't reconnect after the session ends. If it's a remote server with no console access, you've locked yourself out permanently until a rescue mode or support ticket resolves it."
          fix="Always run sshd -t before applying changes: it tests the configuration file syntax without restarting. Then use systemctl restart sshd (not stop/start separately). Maintain an open second SSH session when making changes so you can revert if the restart fails. For cloud servers, verify you have console/serial access as a fallback before making SSH changes."
        />

        <Err
          title="Forgetting to configure the IPv6 firewall"
          cause="Most administrators configure iptables rules for IPv4 but forget that IPv6 has a completely separate rule table (ip6tables or nftables inet family). If the server has an IPv6 address (very common in cloud environments and modern ISPs), all ports may be open via IPv6 even though the IPv4 firewall is correctly configured. Attackers scan IPv6 addresses too."
          fix="Always configure both ip6tables and iptables, or use nftables which handles both protocol families in unified rules. Check: ip6tables -L -n to see current IPv6 rules. The default policies should be the same as IPv4: ACCEPT established,related; allow needed services; DROP everything else."
        />

        <Err
          title="Not testing that hardening actually works"
          cause="Administrators apply a hardening script or Ansible playbook and assume it worked correctly. In practice, mount options may not persist (tmpfs with wrong fstab syntax), auditd rules may have syntax errors that silently fail to load, or SELinux context changes may not have been applied with restorecon. The hardening appears to be done but the controls aren't active."
          fix="Test every control you apply: after adding noexec to /tmp, actually try to execute a binary from /tmp and verify it's denied. After adding auditd rules, perform the action (modify /etc/passwd, run a SUID binary) and verify the event appears in the audit log. After applying SSH config, test in a second terminal before closing the current session. Run Lynis after hardening to score the result objectively."
        />

        <Err
          title="Using the same SSH key pair for multiple servers or users"
          cause="If one private key is used across many servers and it's compromised, all servers are compromised. Teams sometimes use a shared 'deploy key' or 'admin key' that's distributed to all servers and all engineers — convenient for key management but catastrophic when the key is lost or stolen."
          fix="Each user should have their own key pair. Each service should have its own key pair. Use an SSH certificate authority for large environments: instead of distributing individual public keys to every server, issue short-lived signed certificates from a CA. Servers trust the CA and accept any certificate it signs. Certificates can have expiry (daily, weekly) — a stolen certificate becomes useless quickly without the CA to re-sign."
        />
      </Part>

      <HR />

      <KeyTakeaways
        items={[
          'Minimal installation is the first hardening step — every installed package and running service is a potential attack surface. Start from minimal images and remove what you don\'t need.',
          'noexec on /tmp and /dev/shm prevents attackers who can write files there (www-data, compromised services) from executing payloads. Apply with mount -o remount,noexec,nosuid,nodev /tmp without rebooting.',
          'SSH hardening requires at minimum: PasswordAuthentication no, PermitRootLogin no, AllowUsers whitelist, MaxAuthTries 3. Always run sshd -t before restarting sshd on a remote server.',
          'sysctl hardening enables kernel-level protections: SYN cookies (SYN flood), ICMP redirect rejection (MITM prevention), reverse path filtering (anti-spoofing), kptr_restrict (kernel address hiding).',
          'SELinux confines processes to only what their policy permits — an Apache process with httpd_t type cannot execute /bin/bash or read /etc/shadow even if file permissions would normally allow it. Never leave SELinux in permissive mode permanently.',
          'auditd operates at the kernel level and cannot be silenced by a compromised process. The -f 2 flag causes a kernel panic if auditd fails, preventing an attacker from disabling audit logging to blind the detection.',
          'AIDE (file integrity monitoring) detects changes to critical binaries and configuration files by comparing against a cryptographic baseline. Unexpected changes to /usr/bin/ are strong indicators of compromise.',
          'The CIS Linux Benchmark provides a scored, reproducible hardening standard. OpenSCAP automates compliance checking against CIS profiles and generates remediation scripts for failed checks.',
          'chattr +i makes files immutable even to root — useful for /etc/passwd and /etc/shadow to prevent modification by a compromised root process. The immutability flag requires chattr -i to remove (requires physical/console access).',
          'IPv6 firewalls are separate from IPv4 — configure ip6tables (or nftables) with the same deny-all policy. Cloud servers often have public IPv6 addresses that bypass IPv4 firewall rules if IPv6 is not explicitly restricted.',
        ]}
      />

      <HR />

      <div style={{ background: 'var(--code-bg)', borderRadius: 12, padding: '28px 32px', marginTop: 40 }}>
        <div style={{ fontSize: 13, color: C, fontWeight: 700, marginBottom: 8, textTransform: 'uppercase', letterSpacing: 1 }}>
          Up Next — Module 17
        </div>
        <div style={{ fontSize: 22, fontWeight: 700, color: 'var(--heading)', marginBottom: 12 }}>
          Windows and Active Directory Security
        </div>
        <p style={{ ...s.p, marginBottom: 20 }}>
          In Module 17, you go deep into the Windows security model — how NTLM and Kerberos authentication work in a domain environment, how Active Directory stores and protects credentials, how Group Policy enforces security settings across thousands of machines, and what the most common AD misconfigurations are that attackers exploit in real enterprise breaches.
        </p>
        <Link
          href="/learn/cybersecurity/windows-active-directory"
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
          Continue to Module 17 →
        </Link>
      </div>
    </LearnLayout>
  )
}
