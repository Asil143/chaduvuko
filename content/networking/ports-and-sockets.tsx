'use client'

import { useState } from 'react'
import { LearnLayout } from '@/components/content/LearnLayout'
import { KeyTakeaways } from '@/components/content/KeyTakeaways'

const N = '#10b981'

const Part = ({ n, title }: { n: string; title: string }) => (
  <div style={{ marginBottom: 28 }}>
    <p style={{ fontSize: 11, color: N, fontFamily: 'var(--font-mono)', fontWeight: 700, margin: '0 0 8px', letterSpacing: '.1em' }}>// Part {n}</p>
    <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(20px,3vw,30px)', fontWeight: 900, letterSpacing: '-1.5px', color: 'var(--text)', margin: 0 }}>{title}</h2>
  </div>
)
const P = ({ children }: { children: React.ReactNode }) => <p style={{ fontSize: 15, color: 'var(--text)', lineHeight: 1.9, margin: '0 0 18px' }}>{children}</p>
const H = ({ children }: { children: React.ReactNode }) => <h3 style={{ fontSize: 17, fontWeight: 700, color: 'var(--text)', margin: '32px 0 12px' }}>{children}</h3>
const Hl = ({ children }: { children: React.ReactNode }) => <strong style={{ color: N }}>{children}</strong>
const HR = () => <div style={{ borderTop: '1px solid var(--border)', margin: '48px 0' }} />
const ProTip = ({ children }: { children: React.ReactNode }) => (
  <div style={{ background: `${N}08`, border: `1px solid ${N}20`, borderRadius: 10, padding: '16px 20px', margin: '24px 0' }}>
    <p style={{ fontSize: 11, fontWeight: 700, color: N, fontFamily: 'var(--font-mono)', textTransform: 'uppercase', letterSpacing: '.1em', margin: '0 0 8px' }}>Pro Tip</p>
    <p style={{ fontSize: 14, color: 'var(--text)', lineHeight: 1.85, margin: 0 }}>{children}</p>
  </div>
)
const IQ = ({ q, children }: { q: string; children: React.ReactNode }) => (
  <div style={{ marginBottom: 40 }}>
    <div style={{ background: `${N}10`, border: `1px solid ${N}25`, borderRadius: '8px 8px 0 0', padding: '14px 18px', fontSize: 14, fontWeight: 700, color: 'var(--text)' }}>Q: {q}</div>
    <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderTop: 'none', borderRadius: '0 0 8px 8px', padding: '18px', fontSize: 14, color: 'var(--text)', lineHeight: 1.9 }}>{children}</div>
  </div>
)
const Term = ({ t, children }: { t: string; children: React.ReactNode }) => (
  <div style={{ display: 'flex', gap: 12, marginBottom: 16, alignItems: 'flex-start' }}>
    <code style={{ fontSize: 12, background: `${N}15`, color: N, padding: '3px 8px', borderRadius: 5, flexShrink: 0, marginTop: 2 }}>{t}</code>
    <span style={{ fontSize: 14, color: 'var(--muted)', lineHeight: 1.7 }}>{children}</span>
  </div>
)

const wellKnownPorts = [
  { port: 20, proto: 'TCP', service: 'FTP Data', notes: 'Active mode data channel' },
  { port: 21, proto: 'TCP', service: 'FTP Control', notes: 'Commands and responses' },
  { port: 22, proto: 'TCP', service: 'SSH', notes: 'Secure shell, SFTP, SCP' },
  { port: 23, proto: 'TCP', service: 'Telnet', notes: 'Legacy; cleartext; avoid' },
  { port: 25, proto: 'TCP', service: 'SMTP', notes: 'Mail transfer between servers' },
  { port: 53, proto: 'TCP/UDP', service: 'DNS', notes: 'UDP for queries, TCP for large/zone transfer' },
  { port: 67, proto: 'UDP', service: 'DHCP Server', notes: 'Server listens here' },
  { port: 68, proto: 'UDP', service: 'DHCP Client', notes: 'Client listens here' },
  { port: 80, proto: 'TCP', service: 'HTTP', notes: 'Unencrypted web traffic' },
  { port: 110, proto: 'TCP', service: 'POP3', notes: 'Mail retrieval (legacy)' },
  { port: 123, proto: 'UDP', service: 'NTP', notes: 'Time synchronization' },
  { port: 143, proto: 'TCP', service: 'IMAP', notes: 'Mail access protocol' },
  { port: 161, proto: 'UDP', service: 'SNMP', notes: 'Network management queries' },
  { port: 162, proto: 'UDP', service: 'SNMP Trap', notes: 'Asynchronous notifications' },
  { port: 389, proto: 'TCP', service: 'LDAP', notes: 'Directory services' },
  { port: 443, proto: 'TCP', service: 'HTTPS', notes: 'HTTP over TLS' },
  { port: 465, proto: 'TCP', service: 'SMTPS', notes: 'SMTP over TLS (legacy)' },
  { port: 514, proto: 'UDP', service: 'Syslog', notes: 'System log messages' },
  { port: 587, proto: 'TCP', service: 'SMTP Submission', notes: 'Client → server mail submission with auth' },
  { port: 636, proto: 'TCP', service: 'LDAPS', notes: 'LDAP over TLS' },
  { port: 993, proto: 'TCP', service: 'IMAPS', notes: 'IMAP over TLS' },
  { port: 995, proto: 'TCP', service: 'POP3S', notes: 'POP3 over TLS' },
  { port: 3306, proto: 'TCP', service: 'MySQL', notes: 'MySQL/MariaDB database' },
  { port: 3389, proto: 'TCP', service: 'RDP', notes: 'Windows Remote Desktop' },
  { port: 5432, proto: 'TCP', service: 'PostgreSQL', notes: 'PostgreSQL database' },
  { port: 6379, proto: 'TCP', service: 'Redis', notes: 'Redis in-memory store' },
  { port: 8080, proto: 'TCP', service: 'HTTP Alt', notes: 'Development servers, proxies' },
  { port: 8443, proto: 'TCP', service: 'HTTPS Alt', notes: 'Alt HTTPS for dev/non-root' },
]

function PortLookup() {
  const [search, setSearch] = useState('')
  const filtered = wellKnownPorts.filter(p =>
    p.port.toString().includes(search) ||
    p.service.toLowerCase().includes(search.toLowerCase()) ||
    p.notes.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 12, padding: 24, margin: '32px 0' }}>
      <p style={{ fontSize: 13, fontWeight: 700, color: N, fontFamily: 'var(--font-mono)', margin: '0 0 16px', textTransform: 'uppercase', letterSpacing: '.1em' }}>Common Port Reference</p>
      <input
        value={search}
        onChange={e => setSearch(e.target.value)}
        placeholder="Search port, service, or keyword…"
        style={{ width: '100%', boxSizing: 'border-box', background: 'var(--bg)', border: '1px solid var(--border)', borderRadius: 6, padding: '8px 12px', color: 'var(--text)', fontSize: 13, marginBottom: 16 }}
      />
      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
          <thead>
            <tr>
              {['Port', 'Proto', 'Service', 'Notes'].map(h => (
                <th key={h} style={{ textAlign: 'left', padding: '8px 12px', color: 'var(--muted)', fontSize: 11, fontWeight: 700, fontFamily: 'var(--font-mono)', textTransform: 'uppercase', borderBottom: '1px solid var(--border)' }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map(p => (
              <tr key={p.port} style={{ borderBottom: '1px solid var(--border)' }}>
                <td style={{ padding: '8px 12px', fontFamily: 'var(--font-mono)', fontWeight: 700, color: N }}>{p.port}</td>
                <td style={{ padding: '8px 12px', fontSize: 12, color: p.proto === 'UDP' ? '#3b82f6' : p.proto === 'TCP/UDP' ? '#8b5cf6' : 'var(--text)' }}>{p.proto}</td>
                <td style={{ padding: '8px 12px', color: 'var(--text)', fontWeight: 600 }}>{p.service}</td>
                <td style={{ padding: '8px 12px', color: 'var(--muted)', fontSize: 12 }}>{p.notes}</td>
              </tr>
            ))}
            {filtered.length === 0 && <tr><td colSpan={4} style={{ padding: '24px 12px', color: 'var(--muted)', textAlign: 'center' }}>No matching ports</td></tr>}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default function PortsAndSocketsModule() {
  return (
    <LearnLayout
      title="Ports and Sockets"
      description="Ports are the mechanism that lets one IP address run hundreds of services simultaneously. Sockets are the API that connects application code to the network stack."
      section="Networking Fundamentals"
      readTime="16 min"
      updatedAt="May 2026"
    >
      <Part n="01" title="The Problem: Multiplexing Many Services on One IP" />
      <P>
        A server at IP address 203.0.113.10 might simultaneously be running a web server, an SSH daemon, a database, a mail server, and a monitoring agent. How does an arriving packet know which application should receive it? The answer is <Hl>ports</Hl> — 16-bit numbers in the TCP and UDP headers that identify the destination service on the receiving host.
      </P>
      <P>
        A port number ranges from 0 to 65,535 (2¹⁶ − 1). Together with an IP address and transport protocol, a port defines a <Hl>socket endpoint</Hl>. A <Hl>connection</Hl> (in TCP) is identified by a 4-tuple: source IP, source port, destination IP, destination port. Two connections can share a destination port (e.g., thousands of clients connecting to port 443) as long as any other element of the 4-tuple differs — most commonly the source IP or source port.
      </P>

      <H>Port Ranges</H>
      <P>
        <Hl>Well-known ports (0–1023)</Hl>: Assigned by IANA to standard services. Binding to these ports requires root/administrator privileges on most OSes. HTTP=80, HTTPS=443, SSH=22, DNS=53, SMTP=25. <Hl>Registered ports (1024–49151)</Hl>: IANA-registered for specific applications but no privilege required to bind. MySQL=3306, PostgreSQL=5432, Redis=6379, RDP=3389. <Hl>Dynamic/Ephemeral ports (49152–65535)</Hl>: Allocated automatically by the OS as source ports for outbound connections. Linux actually uses 32768–60999 by default (configurable in <code style={{ fontSize: 13 }}>/proc/sys/net/ipv4/ip_local_port_range</code>).
      </P>

      <PortLookup />

      <HR />
      <Part n="02" title="Sockets: The Network Programming Interface" />

      <P>
        A <Hl>socket</Hl> is a programming abstraction — a file descriptor that represents one end of a network connection. The Berkeley Sockets API (BSD sockets), created in 1983, became the universal interface for network programming. Every language's networking library (Python's <code style={{ fontSize: 13 }}>socket</code>, Node.js's <code style={{ fontSize: 13 }}>net</code>, Go's <code style={{ fontSize: 13 }}>net</code>) builds on this API.
      </P>

      <H>Server Socket Lifecycle</H>
      <P>
        A TCP server: <code style={{ fontSize: 13 }}>socket()</code> — create a socket; <code style={{ fontSize: 13 }}>bind()</code> — associate it with a local IP and port (e.g., 0.0.0.0:443 to listen on all interfaces); <code style={{ fontSize: 13 }}>listen()</code> — mark it as a passive socket and set the backlog queue size; <code style={{ fontSize: 13 }}>accept()</code> — block until a connection arrives, return a new socket for that connection; <code style={{ fontSize: 13 }}>read()/write()</code> — exchange data; <code style={{ fontSize: 13 }}>close()</code> — send FIN and close. The original listening socket stays open for new connections; the accepted socket handles the specific client.
      </P>

      <H>Client Socket Lifecycle</H>
      <P>
        A TCP client: <code style={{ fontSize: 13 }}>socket()</code>; <code style={{ fontSize: 13 }}>connect(dest_ip, dest_port)</code> — triggers the 3-way handshake, OS picks an ephemeral source port automatically; <code style={{ fontSize: 13 }}>write()</code> / <code style={{ fontSize: 13 }}>read()</code>; <code style={{ fontSize: 13 }}>close()</code>. The OS assigns the ephemeral source port from the dynamic range. This port, combined with the server's IP and port, forms the unique 4-tuple identifying this connection.
      </P>

      <H>The Listen Backlog</H>
      <P>
        The <code style={{ fontSize: 13 }}>listen(backlog)</code> parameter sets the maximum number of pending connections waiting in the queue before <code style={{ fontSize: 13 }}>accept()</code> is called. Under high connection rates, if the application can't call <code style={{ fontSize: 13 }}>accept()</code> fast enough, the queue fills. New SYN packets are silently dropped — clients see a timeout. This is a common cause of connection timeouts under load, even when the server has CPU and memory to spare. High-performance servers set large backlogs (e.g., <code style={{ fontSize: 13 }}>listen(4096)</code>) and use the kernel parameter <code style={{ fontSize: 13 }}>net.core.somaxconn</code> to allow it.
      </P>

      <HR />
      <Part n="03" title="SO_REUSEADDR, SO_REUSEPORT, and Non-Blocking I/O" />

      <H>SO_REUSEADDR</H>
      <P>
        When a server restarts, it tries to bind to its listening port again. The old listening socket may be in TIME_WAIT (from recently closed connections). Without <code style={{ fontSize: 13 }}>SO_REUSEADDR</code>, <code style={{ fontSize: 13 }}>bind()</code> fails with "Address already in use." <code style={{ fontSize: 13 }}>SO_REUSEADDR</code> allows binding to a port in TIME_WAIT, enabling fast server restarts. Always set this option on server sockets.
      </P>

      <H>SO_REUSEPORT</H>
      <P>
        <code style={{ fontSize: 13 }}>SO_REUSEPORT</code> (Linux 3.9+) allows multiple sockets to bind to the same IP:port — the kernel distributes incoming connections across them via consistent hashing. This enables multi-process and multi-threaded servers to scale without a single accept() bottleneck. nginx uses SO_REUSEPORT: each worker process has its own listening socket, eliminating the thundering herd problem of all workers waking up for each incoming connection.
      </P>

      <H>Non-Blocking I/O and Event Loops</H>
      <P>
        By default, socket operations block: <code style={{ fontSize: 13 }}>accept()</code> blocks until a connection arrives; <code style={{ fontSize: 13 }}>read()</code> blocks until data is available. For high-performance servers, blocking is unacceptable — a single blocked call stops the whole thread from handling other connections. Non-blocking sockets (<code style={{ fontSize: 13 }}>O_NONBLOCK</code>) return immediately with EAGAIN if no data is available. Combined with <code style={{ fontSize: 13 }}>epoll</code> (Linux), <code style={{ fontSize: 13 }}>kqueue</code> (macOS/BSD), or <code style={{ fontSize: 13 }}>io_uring</code>, you can monitor thousands of sockets with a single thread — the foundation of Node.js, nginx, Redis, and virtually all modern high-performance network servers.
      </P>

      <ProTip>
        <code style={{ fontSize: 12, background: `${N}15`, color: N, padding: '2px 5px', borderRadius: 4 }}>ss -tlnp</code> shows all listening TCP sockets with process names — essential for finding what's using a port. <code style={{ fontSize: 12, background: `${N}15`, color: N, padding: '2px 5px', borderRadius: 4 }}>ss -s</code> gives aggregate socket statistics. <code style={{ fontSize: 12, background: `${N}15`, color: N, padding: '2px 5px', borderRadius: 4 }}>ss -tnp state established</code> lists all active connections. On macOS, <code style={{ fontSize: 12, background: `${N}15`, color: N, padding: '2px 5px', borderRadius: 4 }}>lsof -i :[port]</code> identifies the process using a specific port.
      </ProTip>

      <HR />
      <Part n="04" title="Interview Questions" />

      <IQ q="How can two connections share the same destination port on a server?">
        A TCP connection is uniquely identified by a 4-tuple: source IP, source port, destination IP, destination port. The destination IP and port are the same for all connections to a server (e.g., 203.0.113.10:443), but the source IP or source port differs for each client. Two clients with different IP addresses can use the same source port and the connections are still distinct. Two connections from the same client IP must use different source ports (ephemeral ports). The 4-tuple uniqueness allows a single listening port to handle millions of simultaneous connections.
      </IQ>

      <IQ q="What is the listen backlog and what happens when it fills?">
        The listen backlog is the maximum number of connections waiting to be accepted (in SYN_RCVD state) or fully established (in ESTABLISHED, waiting for accept()). When the backlog is full and a new SYN arrives, the kernel silently drops it (or sends RST depending on configuration). The client sees a connection timeout or ECONNREFUSED. This is a common under-load failure mode for servers that call accept() too slowly or set too small a backlog. Fix: increase backlog size (listen(4096)), increase net.core.somaxconn, and ensure the application calls accept() quickly, ideally in a non-blocking event loop.
      </IQ>

      <IQ q="Why do servers need SO_REUSEADDR?">
        When a server process restarts, the listening port may still have connections in TIME_WAIT state (connections closed recently, waiting 2×MSL before full cleanup). Without SO_REUSEADDR, bind() returns EADDRINUSE and the server can't start for up to 4 minutes until TIME_WAIT expires. SO_REUSEADDR tells the kernel to allow binding to a port with TIME_WAIT connections — the old connections are still tracked; the new server just takes ownership of the listening socket. Always set SO_REUSEADDR before bind() on server sockets.
      </IQ>

      <HR />
      <Part n="05" title="Key Terminology" />
      <Term t="Port">16-bit number identifying a service endpoint on a host. 0–1023: well-known (root-only), 1024–49151: registered, 49152–65535: ephemeral.</Term>
      <Term t="Socket">OS file descriptor representing one end of a network connection. Created with socket(), bound with bind(), connected with connect().</Term>
      <Term t="4-tuple">src IP + src port + dst IP + dst port — uniquely identifies a TCP connection.</Term>
      <Term t="Ephemeral port">Temporary source port assigned by the OS for outbound connections. Linux default range: 32768–60999.</Term>
      <Term t="Backlog">listen() parameter: max pending connections before new SYNs are dropped. Set high for loaded servers.</Term>
      <Term t="SO_REUSEADDR">Socket option allowing bind() to ports in TIME_WAIT — enables fast server restarts.</Term>
      <Term t="epoll">Linux kernel interface for monitoring many file descriptors efficiently — foundation of modern event-driven servers.</Term>

      <KeyTakeaways items={[
        'Ports (0–65535) multiplex many services on one IP address; a TCP connection is uniquely identified by a 4-tuple: src IP, src port, dst IP, dst port.',
        'Well-known ports (0–1023) require root; registered (1024–49151) are assigned to services; ephemeral (49152–65535) are for outbound connections.',
        'The BSD socket API: socket() → bind() → listen() → accept() (server) or connect() (client) → read()/write() → close().',
        'The listen backlog limits pending connections — when full, new SYNs are dropped silently, causing client timeouts under load.',
        'SO_REUSEADDR allows servers to rebind immediately after restart even with TIME_WAIT connections on the port.',
        'SO_REUSEPORT and non-blocking I/O with epoll/kqueue are the foundation of scalable multi-connection servers like nginx and Redis.',
      ]} />
    </LearnLayout>
  )
}
