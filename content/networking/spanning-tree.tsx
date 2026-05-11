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

const P = ({ children }: { children: React.ReactNode }) => (
  <p style={{ fontSize: 15, color: 'var(--text)', lineHeight: 1.9, margin: '0 0 18px' }}>{children}</p>
)

const H = ({ children }: { children: React.ReactNode }) => (
  <h3 style={{ fontSize: 17, fontWeight: 700, color: 'var(--text)', margin: '32px 0 12px' }}>{children}</h3>
)

const Hl = ({ children }: { children: React.ReactNode }) => (
  <strong style={{ color: N }}>{children}</strong>
)

const HR = () => <div style={{ borderTop: '1px solid var(--border)', margin: '48px 0' }} />

const ProTip = ({ children }: { children: React.ReactNode }) => (
  <div style={{ background: `${N}08`, border: `1px solid ${N}20`, borderRadius: 10, padding: '16px 20px', margin: '24px 0' }}>
    <p style={{ fontSize: 11, fontWeight: 700, color: N, fontFamily: 'var(--font-mono)', textTransform: 'uppercase', letterSpacing: '.1em', margin: '0 0 8px' }}>Pro Tip</p>
    <p style={{ fontSize: 14, color: 'var(--text)', lineHeight: 1.85, margin: 0 }}>{children}</p>
  </div>
)

const Err = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <div style={{ background: '#ef444408', border: '1px solid #ef444430', borderRadius: 10, padding: '16px 20px', margin: '24px 0' }}>
    <p style={{ fontSize: 11, fontWeight: 700, color: '#ef4444', fontFamily: 'var(--font-mono)', textTransform: 'uppercase', letterSpacing: '.1em', margin: '0 0 8px' }}>Common Mistake — {title}</p>
    <p style={{ fontSize: 14, color: 'var(--text)', lineHeight: 1.85, margin: 0 }}>{children}</p>
  </div>
)

const IQ = ({ q, children }: { q: string; children: React.ReactNode }) => (
  <div style={{ marginBottom: 40 }}>
    <div style={{ background: `${N}10`, border: `1px solid ${N}25`, borderRadius: '8px 8px 0 0', padding: '14px 18px', fontSize: 14, fontWeight: 700, color: 'var(--text)' }}>Q: {q}</div>
    <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderTop: 'none', borderRadius: '0 0 8px 8px', padding: '18px', fontSize: 14, color: 'var(--text)', lineHeight: 1.9 }}>{children}</div>
  </div>
)

const TimeBlock = ({ time, label, children }: { time: string; label: string; children: React.ReactNode }) => (
  <div style={{ display: 'flex', gap: 20, marginBottom: 28 }}>
    <div style={{ flexShrink: 0, textAlign: 'right', width: 100 }}>
      <div style={{ fontSize: 12, fontWeight: 700, color: N, fontFamily: 'var(--font-mono)' }}>{time}</div>
    </div>
    <div style={{ flex: 1, borderLeft: `2px solid ${N}30`, paddingLeft: 20, paddingBottom: 8 }}>
      <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--text)', marginBottom: 6 }}>{label}</div>
      <div style={{ fontSize: 14, color: 'var(--muted)', lineHeight: 1.8 }}>{children}</div>
    </div>
  </div>
)

const Term = ({ t, children }: { t: string; children: React.ReactNode }) => (
  <div style={{ display: 'flex', gap: 12, marginBottom: 16, alignItems: 'flex-start' }}>
    <code style={{ fontSize: 12, background: `${N}15`, color: N, padding: '3px 8px', borderRadius: 5, flexShrink: 0, marginTop: 2 }}>{t}</code>
    <span style={{ fontSize: 14, color: 'var(--muted)', lineHeight: 1.7 }}>{children}</span>
  </div>
)

function STPSim() {
  const [step, setStep] = useState(0)
  const [root, setRoot] = useState('SW-1')

  const switchDefs = [
    { id: 'SW-1', priority: 4096, mac: '00:00:00:00:00:01' },
    { id: 'SW-2', priority: 32768, mac: '00:00:00:00:00:02' },
    { id: 'SW-3', priority: 32768, mac: '00:00:00:00:00:03' },
  ]

  const steps = [
    { title: 'All switches boot and claim to be root', desc: 'Each switch sends Hello BPDUs every 2 seconds claiming it is the root. Bridge ID = Priority + MAC address. Lowest BID wins.' },
    { title: 'Root bridge elected', desc: `${root} wins with the lowest Bridge ID. All ports on the root bridge become Designated (forwarding). All other switches stop claiming root status.` },
    { title: 'Root Ports selected on non-root switches', desc: `Each non-root switch picks its Root Port — the port with the lowest path cost to the root bridge. Direct 1G links cost 4; the SW-2↔SW-3 indirect path via root costs 4+4=8.` },
    { title: 'Designated and Blocked ports on SW-2↔SW-3 link', desc: 'One end of the SW-2↔SW-3 link is Designated (forwarding), the other is Blocked (discarding). The switch with the lower Bridge ID wins the Designated role. The loser\'s port is Blocked to break the loop.' },
    { title: 'Spanning tree converged', desc: 'Loop-free topology active. Classic STP took 30–50 s (Listening→Learning→Forwarding); RSTP reduces this to under 1 second via Proposal/Agreement handshake.' },
  ]

  return (
    <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 12, padding: 24, margin: '32px 0' }}>
      <p style={{ fontSize: 13, fontWeight: 700, color: N, fontFamily: 'var(--font-mono)', margin: '0 0 16px', textTransform: 'uppercase', letterSpacing: '.1em' }}>STP Election Walkthrough</p>

      <div style={{ display: 'flex', gap: 8, marginBottom: 16, flexWrap: 'wrap' }}>
        {switchDefs.map(sw => (
          <div
            key={sw.id}
            onClick={() => { setRoot(sw.id); setStep(0) }}
            style={{ background: sw.id === root ? `${N}15` : 'var(--bg)', border: `2px solid ${sw.id === root ? N : 'var(--border)'}`, borderRadius: 8, padding: '10px 16px', cursor: 'pointer', transition: 'all .15s' }}
          >
            <div style={{ fontSize: 12, fontWeight: 700, color: sw.id === root ? N : 'var(--text)' }}>{sw.id} {sw.id === root ? '👑 ROOT' : ''}</div>
            <div style={{ fontSize: 11, color: 'var(--muted)', fontFamily: 'var(--font-mono)' }}>Priority: {sw.priority}</div>
          </div>
        ))}
      </div>
      <p style={{ fontSize: 12, color: 'var(--muted)', marginBottom: 16 }}>Click a switch to simulate it as root (lower priority = preferred root)</p>

      <div style={{ background: 'var(--bg)', border: '1px solid var(--border)', borderRadius: 8, padding: 16, marginBottom: 16 }}>
        <div style={{ fontSize: 13, fontWeight: 700, color: N, marginBottom: 8 }}>Step {step + 1}/{steps.length}: {steps[step].title}</div>
        <div style={{ fontSize: 13, color: 'var(--muted)', lineHeight: 1.8 }}>{steps[step].desc}</div>
      </div>

      <div style={{ display: 'flex', gap: 10 }}>
        <button onClick={() => setStep(s => Math.max(0, s - 1))} disabled={step === 0} style={{ background: 'transparent', color: 'var(--muted)', border: '1px solid var(--border)', borderRadius: 6, padding: '7px 16px', fontSize: 13, cursor: step === 0 ? 'default' : 'pointer', opacity: step === 0 ? 0.4 : 1 }}>← Back</button>
        <button onClick={() => setStep(s => Math.min(steps.length - 1, s + 1))} disabled={step === steps.length - 1} style={{ background: N, color: '#000', border: 'none', borderRadius: 6, padding: '7px 16px', fontSize: 13, fontWeight: 700, cursor: step === steps.length - 1 ? 'default' : 'pointer', opacity: step === steps.length - 1 ? 0.5 : 1 }}>Next →</button>
      </div>
    </div>
  )
}

export default function SpanningTreeModule() {
  return (
    <LearnLayout
      title="STP — Preventing Broadcast Storms"
      description="Spanning Tree Protocol keeps redundant switch links from creating Layer 2 loops that would crash your entire network in seconds."
      section="Networking Fundamentals"
      readTime="22 min"
      updatedAt="May 2026"
    >
      <Part n="01" title="The Problem: Layer 2 Loops Are Catastrophic" />
      <P>
        Redundancy is good — if a switch or link fails, you want a backup path. So engineers connect switches in a mesh with multiple links. But Ethernet at Layer 2 has no TTL field to stop loops. Send a broadcast frame into a loop and it circulates forever, duplicating on every switch it passes through. Within seconds, switch CPUs are overwhelmed processing millions of frames per second, MAC tables fill with contradictory entries, and the entire network goes dark. This is a <Hl>broadcast storm</Hl> — one of the most destructive Layer 2 failure modes.
      </P>
      <P>
        <Hl>Spanning Tree Protocol (STP)</Hl>, defined in IEEE 802.1D (1990) and invented by Radia Perlman at Digital Equipment Corporation, solves this: it computes a loop-free tree topology spanning all switches and blocks redundant links. If a link fails, STP unblocks the next-best path automatically. You get redundancy without loops.
      </P>

      <STPSim />

      <HR />
      <Part n="02" title="STP Election Process" />

      <H>Bridge ID and Root Election</H>
      <P>
        Every switch has a <Hl>Bridge ID (BID)</Hl> — 2-byte priority (default 32768, configurable in multiples of 4096) followed by the switch MAC address. The switch with the <em>lowest</em> BID becomes the root bridge. You manually lower priority on your best-connected switches to ensure they become root, not the oldest switch with the lowest MAC.
      </P>
      <P>
        At boot, every switch claims to be root. They exchange <Hl>BPDUs (Bridge Protocol Data Units)</Hl> — Hello messages every 2 seconds — comparing Bridge IDs. When a switch receives a BPDU with a lower BID, it stops claiming root and propagates the better BID. Election converges within the MaxAge timer of 20 seconds.
      </P>

      <H>Port Roles</H>
      <P>
        After root election, each port gets a role. <Hl>Root Port (RP)</Hl>: one per non-root switch; the port with the lowest path cost to the root. <Hl>Designated Port (DP)</Hl>: one per link segment; provides the best path to root for that segment. All root bridge ports are Designated. <Hl>Blocked Port</Hl>: all remaining — receives BPDUs but discards data frames, breaking the loop.
      </P>
      <P>
        Path costs in classic STP: 10 Mbps = 100, 100 Mbps = 19, 1 Gbps = 4, 10 Gbps = 2. On a cost tie: compare sender Bridge ID, then sender port ID, then receiver port ID.
      </P>

      <H>Port States (Classic STP)</H>
      <P>
        Classic 802.1D ports transition through: <Hl>Blocking</Hl> (20 s, receiving BPDUs only) → <Hl>Listening</Hl> (15 s, election participation, no data) → <Hl>Learning</Hl> (15 s, building MAC table, no forwarding) → <Hl>Forwarding</Hl> (active). Total convergence after a failure: up to 50 seconds. RSTP eliminates these delays.
      </P>

      <Err title="Forgetting to set root bridge priority">
        Without manual priority configuration, STP elects root based on lowest MAC address — often the oldest, lowest-capacity switch. A new high-capacity core switch loses the election and becomes a leaf. Always set <code style={{ fontSize: 13 }}>spanning-tree vlan [id] priority 4096</code> on your distribution/core switches.
      </Err>

      <HR />
      <Part n="03" title="RSTP: Rapid Spanning Tree" />

      <P>
        IEEE 802.1w (2001, now in 802.1D-2004) introduced <Hl>Rapid STP (RSTP)</Hl> which converges in under 1 second. Key improvements:
      </P>
      <P>
        <Hl>New port roles</Hl>: Alternate port (pre-selected backup Root Port, immediately usable on failure) and Backup port (pre-selected backup Designated Port). These are ready before any failure, enabling instant failover without waiting for timers.
      </P>
      <P>
        <Hl>Proposal/Agreement handshake</Hl>: When a link comes up, switches exchange Proposal/Agreement BPDUs to rapidly sync port states. A receiving switch blocks its non-edge ports, sends Agreement back, and both sides immediately transition to Forwarding — no 30-second wait.
      </P>
      <P>
        <Hl>Edge ports (PortFast)</Hl>: Ports connected to end hosts skip Listening/Learning entirely and go directly to Forwarding. On Cisco: <code style={{ fontSize: 13, background: `${N}15`, color: N, padding: '2px 6px', borderRadius: 4 }}>spanning-tree portfast</code>. Never enable PortFast on switch-facing ports — a loop formed on a PortFast port immediately destroys the network.
      </P>

      <H>MSTP: Multiple Spanning Tree Protocol</H>
      <P>
        Classic STP/RSTP runs one spanning tree instance for all VLANs — all VLANs share blocked ports, wasting redundant links. Cisco's <Hl>PVST+</Hl> runs a separate instance per VLAN for load balancing but uses CPU for each instance.
      </P>
      <P>
        <Hl>MSTP (IEEE 802.1s)</Hl> maps multiple VLANs to fewer spanning tree instances: VLANs 1–100 on Instance 1 (root = SW-1), VLANs 101–200 on Instance 2 (root = SW-2). Two STP instances instead of 200, with load balancing across redundant links.
      </P>

      <ProTip>
        In modern data centers, Layer 2 domains are kept small and STP is minimized. Many designs use "Layer 3 to the access layer" — routed uplinks directly from top-of-rack switches — eliminating spanning tree entirely. VXLAN over a routed underlay has largely replaced bridged Layer 2 fabrics.
      </ProTip>

      <HR />
      <Part n="04" title="BPDU Guard, Root Guard, and Loop Guard" />

      <H>BPDU Guard</H>
      <P>
        <Hl>BPDU Guard</Hl> immediately shuts down (err-disables) a PortFast port if any BPDU is received on it. This prevents unauthorized switches plugged into end-host ports from disrupting the spanning tree topology — one of the most common accidental and intentional misconfiguration vectors.
      </P>

      <H>Root Guard</H>
      <P>
        <Hl>Root Guard</Hl> prevents a switch connected to a Designated port from displacing your configured root bridge. If a superior BID BPDU arrives on a Root Guard port, the port enters root-inconsistent (non-forwarding) state, protecting your topology from rogue or misconfigured switches.
      </P>

      <H>Loop Guard</H>
      <P>
        <Hl>Loop Guard</Hl> protects against unidirectional link failures. If a non-designated port stops receiving BPDUs due to a unidirectional failure, STP would normally transition it to Forwarding (creating a loop). Loop Guard detects the missing BPDUs and puts the port into loop-inconsistent state instead.
      </P>

      <HR />
      <Part n="05" title="A Day in the Life: Broadcast Storm at 11 PM" />

      <TimeBlock time="11:03 PM" label="NOC alarm: core switch CPU 99%, interfaces pegged at 100G">
        Every core switch is maxed out. Users on the affected floor are completely offline. Classic broadcast storm symptoms.
      </TimeBlock>
      <TimeBlock time="11:07 PM" label="Identify the loop via OOB console">
        Main network is down — connect via out-of-band management. Run <code style={{ fontSize: 12 }}>show spanning-tree detail</code> — topology change count incrementing thousands of times per second. MAC address table filling and clearing rapidly. A physical loop exists.
      </TimeBlock>
      <TimeBlock time="11:12 PM" label="Find the offending port">
        Check interface error counters across distribution switches. One port to IDF-3 shows millions of input errors/second. Investigation: a facilities tech plugged both ends of a patch cable into the same unmanaged switch on the 4th floor. Unmanaged switches don't run STP — invisible to the topology.
      </TimeBlock>
      <TimeBlock time="11:15 PM" label="Resolution">
        Shut down the uplink to IDF-3 — traffic drops immediately from 100G to 2G. Network recovers in 30 seconds. Physical loop removed, port re-enabled. Post-incident: deploy BPDU Guard on all access ports; evaluate loop-detection firmware on unmanaged edge switches.
      </TimeBlock>

      <HR />
      <Part n="06" title="Interview Questions" />

      <IQ q="Walk me through the STP root bridge election process.">
        Every switch starts claiming to be root and broadcasts BPDUs with its Bridge ID (priority + MAC). Switches compare incoming BPDUs to their own: if a BPDU has a lower Bridge ID, the switch stops claiming root and starts advertising the better ID. This continues until all switches agree on the lowest Bridge ID — that switch becomes root. All root bridge ports are Designated (forwarding). Non-root switches calculate their Root Port (lowest-cost path to root) and block remaining redundant ports.
      </IQ>

      <IQ q="What's the difference between STP PortFast and BPDU Guard, and why use both together?">
        PortFast skips Listening and Learning (30 seconds combined) on an end-host port, going directly to Forwarding. This is safe only on ports that will never connect to a switch. BPDU Guard enforces this contract: if any BPDU arrives on a PortFast port, the port is immediately err-disabled. PortFast alone speeds up convergence; BPDU Guard makes it safe. Always configure both on access ports.
      </IQ>

      <IQ q="How does RSTP achieve sub-second convergence vs. classic STP's 30–50 seconds?">
        RSTP pre-selects Alternate and Backup ports before any failure, so failover is instantaneous rather than requiring a new election. It replaces timer-based state transitions (20 s + 15 s + 15 s) with a Proposal/Agreement handshake between adjacent switches — ports negotiate state changes in milliseconds. It eliminates the Listening state entirely for most transitions. The result is topology recovery in under 1 second compared to STP's worst-case 50 seconds.
      </IQ>

      <HR />
      <Part n="07" title="Key Terminology" />
      <Term t="Bridge ID">2-byte priority + 6-byte MAC. Lowest Bridge ID wins root bridge election.</Term>
      <Term t="BPDU">Bridge Protocol Data Unit — topology messages exchanged between switches every 2 seconds (Hello timer).</Term>
      <Term t="Root Bridge">The elected STP tree root. All traffic paths are computed relative to it.</Term>
      <Term t="Root Port">The forwarding port on a non-root switch with the lowest-cost path to the root. One per switch.</Term>
      <Term t="Designated Port">The forwarding port on each link segment. All root bridge ports are Designated.</Term>
      <Term t="RSTP">Rapid Spanning Tree (802.1w) — sub-second convergence via Proposal/Agreement and pre-selected Alternate ports.</Term>
      <Term t="PortFast">Skips STP Listening/Learning on end-host ports for immediate Forwarding transition.</Term>
      <Term t="BPDU Guard">Err-disables a PortFast port the moment any BPDU is received, preventing rogue switch connections.</Term>

      <KeyTakeaways items={[
        'STP prevents Layer 2 broadcast storms by blocking redundant switch links while maintaining a loop-free spanning tree.',
        'Root bridge election: lowest Bridge ID (priority + MAC) wins — always manually set priority lower on core/distribution switches.',
        'Port roles: Root Port (best path to root), Designated Port (best path on a segment), Blocked Port (loop prevention).',
        'Classic STP convergence takes 30–50 seconds; RSTP (802.1w) converges in under 1 second via Proposal/Agreement handshake.',
        'Always pair PortFast with BPDU Guard on access ports: PortFast speeds up end-host connections; BPDU Guard prevents loops.',
        'MSTP maps multiple VLANs to fewer STP instances, enabling load balancing across redundant links with minimal CPU overhead.',
      ]} />
    </LearnLayout>
  )
}
