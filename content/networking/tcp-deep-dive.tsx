'use client'

import { useState } from 'react'
import { LearnLayout } from '@/components/content/LearnLayout'
import { KeyTakeaways } from '@/components/content/KeyTakeaways'

/* ── Helper components ────────────────────────────────────────────────────── */

const G = '#10b981'
const FONT_MONO = 'var(--font-mono)'
const FONT_DISPLAY = 'var(--font-display)'

const Chapter = ({ n, title }: { n: number; title: string }) => (
  <div style={{ marginBottom: 32 }}>
    <p style={{ fontSize: 11, color: G, fontFamily: FONT_MONO, fontWeight: 700, margin: '0 0 6px', letterSpacing: '.12em' }}>
      {`// CHAPTER ${String(n).padStart(2, '0')}`}
    </p>
    <h2 style={{ fontFamily: FONT_DISPLAY, fontSize: 'clamp(22px,3.5vw,34px)', fontWeight: 900, letterSpacing: '-1.5px', color: 'var(--text)', margin: 0 }}>{title}</h2>
  </div>
)

const Divider = () => <div style={{ borderTop: '1px solid var(--border)', margin: '56px 0' }} />

const Para = ({ children }: { children: React.ReactNode }) => (
  <p style={{ fontSize: 15, color: 'var(--text)', lineHeight: 1.9, margin: '0 0 18px' }}>{children}</p>
)

const H2 = ({ children }: { children: React.ReactNode }) => (
  <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(20px,3vw,30px)', fontWeight: 900, letterSpacing: '-1.5px', color: 'var(--text)', margin: '0 0 24px' }}>{children}</h2>
)

const H3 = ({ children }: { children: React.ReactNode }) => (
  <h3 style={{ fontSize: 17, fontWeight: 700, color: 'var(--text)', margin: '32px 0 12px' }}>{children}</h3>
)

const Accent = ({ children }: { children: React.ReactNode }) => (
  <strong style={{ color: G }}>{children}</strong>
)

const Code = ({ children }: { children: React.ReactNode }) => (
  <code style={{ fontFamily: 'var(--font-mono)', fontSize: 13, background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 4, padding: '1px 6px', color: G }}>{children}</code>
)

const CodeBlock = ({ children }: { children: React.ReactNode }) => (
  <pre style={{ fontFamily: 'var(--font-mono)', fontSize: 12.5, background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 8, padding: '16px 20px', overflowX: 'auto', lineHeight: 1.7, color: 'var(--text)', margin: '0 0 24px' }}>{children}</pre>
)

const StoryBox = ({ children }: { children: React.ReactNode }) => (
  <div style={{ background: 'rgba(59,130,246,0.07)', border: '1px solid rgba(59,130,246,0.2)', borderLeft: '4px solid #3b82f6', borderRadius: 10, padding: '18px 22px', margin: '22px 0', fontSize: 14.5, color: 'var(--text)', lineHeight: 1.85 }}>
    <span style={{ fontWeight: 700, color: '#3b82f6', fontSize: 11, fontFamily: FONT_MONO, letterSpacing: '.1em', display: 'block', marginBottom: 8 }}>// REAL-WORLD SCENARIO</span>
    {children}
  </div>
)

const WowBox = ({ emoji, title, children }: { emoji: string; title: string; children: React.ReactNode }) => (
  <div style={{ background: `${G}0d`, border: `1px solid ${G}30`, borderRadius: 10, padding: '18px 22px', margin: '22px 0', fontSize: 14.5, color: 'var(--text)', lineHeight: 1.85 }}>
    <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
      <span style={{ fontSize: 20 }}>{emoji}</span>
      <span style={{ fontWeight: 800, color: G, fontSize: 13 }}>{title}</span>
    </div>
    {children}
  </div>
)

const Warn = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <div style={{ background: 'rgba(245,158,11,0.07)', border: '1px solid rgba(245,158,11,0.25)', borderLeft: '4px solid #f59e0b', borderRadius: 10, padding: '18px 22px', margin: '22px 0', fontSize: 14.5, color: 'var(--text)', lineHeight: 1.85 }}>
    <span style={{ fontWeight: 700, color: '#f59e0b', fontSize: 12, fontFamily: FONT_MONO, display: 'block', marginBottom: 8 }}>⚠ {title}</span>
    {children}
  </div>
)

const Err = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <div style={{ background: 'rgba(239,68,68,0.07)', border: '1px solid rgba(239,68,68,0.25)', borderLeft: '4px solid #ef4444', borderRadius: 10, padding: '18px 22px', margin: '22px 0', fontSize: 14.5, color: 'var(--text)', lineHeight: 1.85 }}>
    <span style={{ fontWeight: 700, color: '#ef4444', fontSize: 12, fontFamily: FONT_MONO, display: 'block', marginBottom: 8 }}>✗ Common Mistake — {title}</span>
    {children}
  </div>
)

const LEVEL_COLORS: Record<string, string> = {
  Beginner: '#10b981',
  Intermediate: '#3b82f6',
  Senior: '#8b5cf6',
  PhD: '#f97316',
}

const IQ = ({ q, level, children }: { q: string; level: 'Beginner' | 'Intermediate' | 'Senior' | 'PhD'; children: React.ReactNode }) => (
  <div style={{ background: `${G}08`, border: `1px solid ${G}20`, borderRadius: 12, padding: '20px 24px', margin: '24px 0' }}>
    <span style={{ display: 'inline-block', fontSize: 11, fontWeight: 700, color: '#fff', background: LEVEL_COLORS[level], borderRadius: 20, padding: '3px 12px', marginBottom: 10 }}>{level}</span>
    <div style={{ fontWeight: 700, color: 'var(--text)', marginBottom: 8, lineHeight: 1.5 }}>{q}</div>
    <div style={{ fontSize: 14.5, color: 'var(--muted)', lineHeight: 1.85 }}>{children}</div>
  </div>
)

/* ── Interactive Component 1: TCP Three-Way Handshake Simulator ───────────── */

interface HandshakeStep {
  step: number
  name: string
  direction: string
  flags: string[]
  seqNum: string
  ackNum: string
  description: string
  state: { client: string; server: string }
  color: string
}

const HANDSHAKE_STEPS: HandshakeStep[] = [
  {
    step: 1,
    name: 'SYN',
    direction: 'Client → Server',
    flags: ['SYN'],
    seqNum: 'ISN_c = 1000 (random)',
    ackNum: '0 (none)',
    description: 'Client initiates connection. Picks a random Initial Sequence Number (ISN) — in practice a 32-bit random value. The SYN flag signals "I want to establish a connection." No data yet.',
    state: { client: 'SYN_SENT', server: 'LISTEN → SYN_RECEIVED' },
    color: '#f97316',
  },
  {
    step: 2,
    name: 'SYN-ACK',
    direction: 'Server → Client',
    flags: ['SYN', 'ACK'],
    seqNum: 'ISN_s = 5000 (random)',
    ackNum: 'ISN_c + 1 = 1001',
    description: 'Server acknowledges the client\'s SYN (ACK = client ISN + 1 = 1001) and sends its own SYN with its own random ISN. This is a combined SYN + ACK in one segment.',
    state: { client: 'SYN_SENT', server: 'SYN_RECEIVED' },
    color: '#3b82f6',
  },
  {
    step: 3,
    name: 'ACK',
    direction: 'Client → Server',
    flags: ['ACK'],
    seqNum: 'ISN_c + 1 = 1001',
    ackNum: 'ISN_s + 1 = 5001',
    description: 'Client acknowledges the server\'s SYN (ACK = server ISN + 1 = 5001). The connection is now ESTABLISHED on both sides. This ACK can carry data (TCP Fast Open, TFO).',
    state: { client: 'ESTABLISHED', server: 'ESTABLISHED' },
    color: G,
  },
]

const TEARDOWN_STEPS: HandshakeStep[] = [
  {
    step: 1,
    name: 'FIN',
    direction: 'Client → Server',
    flags: ['FIN', 'ACK'],
    seqNum: 'seq = 2001',
    ackNum: 'ack = 6001',
    description: 'Client signals end of its data (FIN). The client can no longer send new data but can still receive. Server must still send any remaining data before closing.',
    state: { client: 'FIN_WAIT_1', server: 'ESTABLISHED' },
    color: '#f97316',
  },
  {
    step: 2,
    name: 'ACK',
    direction: 'Server → Client',
    flags: ['ACK'],
    seqNum: 'seq = 6001',
    ackNum: 'ack = 2002',
    description: 'Server acknowledges the FIN. The connection is now half-closed — server can still send data. Client waits in FIN_WAIT_2 for the server\'s FIN.',
    state: { client: 'FIN_WAIT_2', server: 'CLOSE_WAIT' },
    color: '#3b82f6',
  },
  {
    step: 3,
    name: 'FIN',
    direction: 'Server → Client',
    flags: ['FIN', 'ACK'],
    seqNum: 'seq = 6001',
    ackNum: 'ack = 2002',
    description: 'Server sends its own FIN when it has no more data to send. Both sides have now initiated close.',
    state: { client: 'TIME_WAIT', server: 'LAST_ACK' },
    color: '#8b5cf6',
  },
  {
    step: 4,
    name: 'ACK',
    direction: 'Client → Server',
    flags: ['ACK'],
    seqNum: 'seq = 2002',
    ackNum: 'ack = 6002',
    description: 'Client sends final ACK. Client enters TIME_WAIT (2 × MSL = 60–240 seconds) to handle delayed packets. Server transitions to CLOSED. After TIME_WAIT expires, client transitions to CLOSED.',
    state: { client: 'TIME_WAIT → CLOSED', server: 'CLOSED' },
    color: G,
  },
]

function TcpHandshakeSimulator() {
  const [mode, setMode] = useState<'connect' | 'close'>('connect')
  const [step, setStep] = useState(0)
  const steps = mode === 'connect' ? HANDSHAKE_STEPS : TEARDOWN_STEPS
  const current = steps[step]

  return (
    <div style={{ border: '1px solid var(--border)', borderRadius: 12, padding: 24, marginBottom: 32 }}>
      <h3 style={{ margin: '0 0 6px', fontSize: 16, fontWeight: 700, color: 'var(--text)' }}>TCP Connection Lifecycle Simulator</h3>
      <p style={{ margin: '0 0 16px', fontSize: 13, color: 'var(--text-muted)' }}>
        Step through the 3-way handshake (connect) or 4-way teardown (close) with sequence numbers and state transitions.
      </p>

      <div style={{ display: 'flex', gap: 8, marginBottom: 20 }}>
        <button onClick={() => { setMode('connect'); setStep(0) }}
          style={{ flex: 1, padding: '8px', borderRadius: 6, border: `1px solid ${mode === 'connect' ? G : 'var(--border)'}`, background: mode === 'connect' ? G : 'var(--surface)', color: mode === 'connect' ? '#fff' : 'var(--text)', cursor: 'pointer', fontWeight: 600 }}>
          3-Way Handshake (Connect)
        </button>
        <button onClick={() => { setMode('close'); setStep(0) }}
          style={{ flex: 1, padding: '8px', borderRadius: 6, border: `1px solid ${mode === 'close' ? G : 'var(--border)'}`, background: mode === 'close' ? G : 'var(--surface)', color: mode === 'close' ? '#fff' : 'var(--text)', cursor: 'pointer', fontWeight: 600 }}>
          4-Way Teardown (Close)
        </button>
      </div>

      <div style={{ display: 'flex', gap: 6, marginBottom: 20, flexWrap: 'wrap' }}>
        {steps.map((s, i) => (
          <button key={i} onClick={() => setStep(i)}
            style={{ padding: '6px 14px', borderRadius: 20, border: `1px solid ${i === step ? s.color : 'var(--border)'}`, background: i === step ? s.color : 'var(--surface)', color: i === step ? '#fff' : 'var(--text-muted)', fontSize: 12, fontWeight: i === step ? 700 : 400, cursor: 'pointer' }}>
            {i + 1}. {s.name}
          </button>
        ))}
      </div>

      {/* Packet diagram */}
      <div style={{ background: 'var(--surface)', border: `1px solid ${current.color}`, borderRadius: 10, overflow: 'hidden', marginBottom: 12 }}>
        <div style={{ background: current.color, color: '#fff', padding: '10px 16px', display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 8 }}>
          <span style={{ fontWeight: 700 }}>Step {current.step}: {current.name}</span>
          <span style={{ fontSize: 13, opacity: 0.9 }}>{current.direction}</span>
        </div>
        <div style={{ padding: '14px 16px', display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '10px 16px' }}>
          <div>
            <p style={{ margin: '0 0 4px', fontSize: 11, color: 'var(--text-muted)', fontWeight: 600 }}>FLAGS</p>
            <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap' }}>
              {current.flags.map(f => (
                <span key={f} style={{ background: current.color, color: '#fff', borderRadius: 4, padding: '2px 8px', fontSize: 11, fontWeight: 700 }}>{f}</span>
              ))}
            </div>
          </div>
          <div>
            <p style={{ margin: '0 0 4px', fontSize: 11, color: 'var(--text-muted)', fontWeight: 600 }}>SEQ</p>
            <p style={{ margin: 0, fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--text)' }}>{current.seqNum}</p>
          </div>
          <div>
            <p style={{ margin: '0 0 4px', fontSize: 11, color: 'var(--text-muted)', fontWeight: 600 }}>ACK</p>
            <p style={{ margin: 0, fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--text)' }}>{current.ackNum}</p>
          </div>
        </div>
        <div style={{ borderTop: '1px solid var(--border)', padding: '12px 16px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
          <div>
            <p style={{ margin: '0 0 4px', fontSize: 11, color: 'var(--text-muted)', fontWeight: 600 }}>CLIENT STATE</p>
            <p style={{ margin: 0, fontFamily: 'var(--font-mono)', fontSize: 12, color: '#3b82f6' }}>{current.state.client}</p>
          </div>
          <div>
            <p style={{ margin: '0 0 4px', fontSize: 11, color: 'var(--text-muted)', fontWeight: 600 }}>SERVER STATE</p>
            <p style={{ margin: 0, fontFamily: 'var(--font-mono)', fontSize: 12, color: '#8b5cf6' }}>{current.state.server}</p>
          </div>
        </div>
        <div style={{ borderTop: '1px solid var(--border)', padding: '12px 16px' }}>
          <p style={{ margin: 0, fontSize: 14, color: 'var(--text)', lineHeight: 1.7 }}>{current.description}</p>
        </div>
      </div>

      <div style={{ display: 'flex', gap: 8 }}>
        <button onClick={() => setStep(s => Math.max(0, s - 1))} disabled={step === 0}
          style={{ flex: 1, padding: '8px 0', borderRadius: 6, border: '1px solid var(--border)', background: 'var(--surface)', color: 'var(--text)', cursor: step === 0 ? 'not-allowed' : 'pointer', opacity: step === 0 ? 0.4 : 1 }}>
          ← Back
        </button>
        <button onClick={() => setStep(s => Math.min(steps.length - 1, s + 1))} disabled={step === steps.length - 1}
          style={{ flex: 1, padding: '8px 0', borderRadius: 6, border: '1px solid var(--border)', background: G, color: '#fff', cursor: step === steps.length - 1 ? 'not-allowed' : 'pointer', opacity: step === steps.length - 1 ? 0.5 : 1 }}>
          Next →
        </button>
      </div>
    </div>
  )
}

/* ── Interactive Component 2: TCP Congestion Control Visualizer ───────────── */

interface CcEvent {
  event: 'data' | 'ack' | 'loss' | 'timeout' | 'fast_recovery'
  cwnd: number
  ssthresh: number
  phase: string
  label: string
  color: string
}

function generateCcTimeline(): CcEvent[] {
  const events: CcEvent[] = []
  let cwnd = 1
  let ssthresh = 16
  // Slow start
  for (let i = 0; i < 4 && cwnd < ssthresh; i++) {
    events.push({ event: 'ack', cwnd, ssthresh, phase: 'Slow Start', label: `cwnd=${cwnd} (doubles per RTT)`, color: '#3b82f6' })
    cwnd = Math.min(cwnd * 2, ssthresh)
  }
  // Congestion avoidance
  for (let i = 0; i < 5; i++) {
    events.push({ event: 'ack', cwnd, ssthresh, phase: 'Congestion Avoidance', label: `cwnd=${cwnd} (+1 per RTT)`, color: G })
    cwnd += 1
  }
  // Triple duplicate ACK → Fast Retransmit/Recovery
  const lossPoint = cwnd
  ssthresh = Math.floor(lossPoint / 2)
  cwnd = ssthresh + 3
  events.push({ event: 'loss', cwnd: lossPoint, ssthresh, phase: 'Loss Detected', label: `3 dup ACKs — ssthresh=${ssthresh}`, color: '#ef4444' })
  events.push({ event: 'fast_recovery', cwnd, ssthresh, phase: 'Fast Recovery', label: `cwnd=${cwnd} (ssthresh+3)`, color: '#f97316' })
  // Exit fast recovery
  cwnd = ssthresh
  events.push({ event: 'ack', cwnd, ssthresh, phase: 'Congestion Avoidance', label: `cwnd=${cwnd} (back to ssthresh)`, color: G })
  // Grow again
  for (let i = 0; i < 4; i++) {
    events.push({ event: 'ack', cwnd, ssthresh, phase: 'Congestion Avoidance', label: `cwnd=${cwnd} (+1 per RTT)`, color: G })
    cwnd += 1
  }
  // Timeout loss
  const timeoutPoint = cwnd
  ssthresh = Math.floor(timeoutPoint / 2)
  cwnd = 1
  events.push({ event: 'timeout', cwnd: timeoutPoint, ssthresh, phase: 'Timeout', label: `Timeout! ssthresh=${ssthresh}, cwnd=1`, color: '#dc2626' })
  // Slow start again
  for (let i = 0; i < 3 && cwnd < ssthresh; i++) {
    events.push({ event: 'ack', cwnd, ssthresh, phase: 'Slow Start', label: `cwnd=${cwnd}`, color: '#3b82f6' })
    cwnd *= 2
  }
  return events
}

const CC_TIMELINE = generateCcTimeline()

function TcpCongestionVisualizer() {
  const [currentIdx, setCurrentIdx] = useState(0)
  const maxCwnd = Math.max(...CC_TIMELINE.map(e => e.cwnd)) + 2

  const phaseColor = (phase: string) => {
    if (phase === 'Slow Start') return '#3b82f6'
    if (phase === 'Congestion Avoidance') return G
    if (phase.includes('Loss') || phase === 'Timeout') return '#ef4444'
    return '#f97316'
  }

  return (
    <div style={{ border: '1px solid var(--border)', borderRadius: 12, padding: 24, marginBottom: 32 }}>
      <h3 style={{ margin: '0 0 6px', fontSize: 16, fontWeight: 700, color: 'var(--text)' }}>TCP Congestion Control Visualizer</h3>
      <p style={{ margin: '0 0 16px', fontSize: 13, color: 'var(--text-muted)' }}>
        Step through cwnd evolution: Slow Start → Congestion Avoidance → Fast Recovery → Timeout recovery.
      </p>

      {/* Chart */}
      <div style={{ position: 'relative', height: 160, background: 'var(--surface)', borderRadius: 8, border: '1px solid var(--border)', marginBottom: 16, overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, display: 'flex', alignItems: 'flex-end', padding: '8px 4px 24px', gap: 2 }}>
          {CC_TIMELINE.map((e, i) => {
            const h = Math.max(4, (e.cwnd / maxCwnd) * 100)
            const isActive = i === currentIdx
            const isPast = i < currentIdx
            return (
              <div
                key={i}
                onClick={() => setCurrentIdx(i)}
                style={{
                  flex: 1,
                  height: `${h}%`,
                  background: isActive ? e.color : isPast ? `${phaseColor(e.phase)}66` : 'var(--border)',
                  borderRadius: '2px 2px 0 0',
                  cursor: 'pointer',
                  transition: 'all .1s',
                  border: isActive ? `1px solid ${e.color}` : 'none',
                  minWidth: 4,
                }}
                title={`RTT ${i + 1}: cwnd=${e.cwnd}`}
              />
            )
          })}
        </div>
        {/* ssthresh line */}
        <div style={{ position: 'absolute', left: 4, right: 4, bottom: 24 + (CC_TIMELINE[currentIdx].ssthresh / maxCwnd) * 100 + '%', borderTop: '1px dashed #f97316', pointerEvents: 'none' }}>
          <span style={{ position: 'absolute', right: 2, top: -14, fontSize: 10, color: '#f97316', fontFamily: 'var(--font-mono)' }}>ssthresh={CC_TIMELINE[currentIdx].ssthresh}</span>
        </div>
        {/* X axis */}
        <div style={{ position: 'absolute', bottom: 4, left: 4, right: 4, fontSize: 10, color: 'var(--text-muted)', textAlign: 'center' }}>
          RTT (time) → &nbsp;&nbsp;&nbsp; Click a bar to inspect
        </div>
      </div>

      <div style={{ background: 'var(--surface)', border: `1px solid ${CC_TIMELINE[currentIdx].color}`, borderRadius: 8, padding: '12px 16px', marginBottom: 12 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8, flexWrap: 'wrap' }}>
          <span style={{ background: CC_TIMELINE[currentIdx].color, color: '#fff', borderRadius: 4, padding: '2px 10px', fontSize: 11, fontWeight: 700 }}>{CC_TIMELINE[currentIdx].phase}</span>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--text-muted)' }}>RTT #{currentIdx + 1}</span>
        </div>
        <p style={{ margin: 0, fontSize: 14, color: 'var(--text)' }}>{CC_TIMELINE[currentIdx].label}</p>
      </div>

      <div style={{ display: 'flex', gap: 8 }}>
        <button onClick={() => setCurrentIdx(i => Math.max(0, i - 1))} disabled={currentIdx === 0}
          style={{ flex: 1, padding: '8px 0', borderRadius: 6, border: '1px solid var(--border)', background: 'var(--surface)', color: 'var(--text)', cursor: currentIdx === 0 ? 'not-allowed' : 'pointer', opacity: currentIdx === 0 ? 0.4 : 1 }}>
          ← Back
        </button>
        <button onClick={() => setCurrentIdx(i => Math.min(CC_TIMELINE.length - 1, i + 1))} disabled={currentIdx === CC_TIMELINE.length - 1}
          style={{ flex: 1, padding: '8px 0', borderRadius: 6, border: '1px solid var(--border)', background: G, color: '#fff', cursor: currentIdx === CC_TIMELINE.length - 1 ? 'not-allowed' : 'pointer', opacity: currentIdx === CC_TIMELINE.length - 1 ? 0.5 : 1 }}>
          Next RTT →
        </button>
      </div>
    </div>
  )
}

/* ── Interactive Component 3: TCP Header Field Inspector ─────────────────── */

interface TcpField {
  name: string
  bits: string
  value: string
  description: string
  color: string
}

const TCP_HEADER_FIELDS: TcpField[] = [
  { name: 'Source Port', bits: '16 bits', value: '54321', description: 'Ephemeral port chosen by the client OS from the range 49152–65535. Identifies this specific connection endpoint on the client side. Multiple simultaneous connections to the same server differ only by source port.', color: '#3b82f6' },
  { name: 'Destination Port', bits: '16 bits', value: '443', description: 'Well-known port for HTTPS. The server listens on this port. Port numbers 0–1023 are well-known and require root privileges. 1024–49151 are registered. 49152–65535 are dynamic/ephemeral.', color: '#8b5cf6' },
  { name: 'Sequence Number', bits: '32 bits', value: '0x3A1B2C4D', description: 'Position of this segment\'s first byte in the byte stream. Sequence numbers wrap around at 2³² = 4,294,967,296. The initial ISN is randomized per RFC 6528 to prevent TCP sequence prediction attacks.', color: G },
  { name: 'Acknowledgment Number', bits: '32 bits', value: '0x1D2E3F50', description: 'The next sequence number the receiver expects. ACK = last successfully received byte + 1. This is cumulative — ACK 1001 means "I received everything up to and including byte 1000."', color: '#f97316' },
  { name: 'Data Offset', bits: '4 bits', value: '5 (20 bytes)', description: 'TCP header length in 32-bit words. Minimum is 5 (20 bytes, no options). Maximum is 15 (60 bytes, with all options). If options are present, the data offset increases accordingly.', color: '#06b6d4' },
  { name: 'Flags', bits: '9 bits', value: 'ACK | PSH', description: 'Control flags: URG (urgent data), ACK (acknowledgment field valid), PSH (push data to application immediately), RST (reset connection), SYN (synchronize sequence numbers), FIN (no more data). NS, CWR, ECE are used for ECN (Explicit Congestion Notification).', color: '#ec4899' },
  { name: 'Window Size', bits: '16 bits', value: '65535 (× scale)', description: 'Receive window — how many bytes the receiver is willing to accept before requiring an ACK. Limits sender throughput: max throughput = window / RTT. With TCP window scaling (RFC 1323), actual window = window_size × 2^scale_factor, enabling windows up to 1 GB.', color: '#f59e0b' },
  { name: 'Checksum', bits: '16 bits', value: '0x1A2B', description: 'One\'s complement checksum over TCP header + data + pseudo-header (src IP, dst IP, protocol, TCP length). Detects in-transit corruption. Note: the pseudo-header is not transmitted but is included in checksum calculation.', color: '#6b7280' },
  { name: 'Options', bits: 'Variable (0–40B)', value: 'MSS=1460, WScale=7, SACK', description: 'TCP options extend the protocol. Key options: MSS (Maximum Segment Size — negotiated during SYN), Window Scale (WScale — multiplier for window field), SACK (Selective Acknowledgment — acknowledge non-contiguous segments), Timestamps (round-trip timing, PAWS protection).', color: '#ef4444' },
]

function TcpHeaderInspector() {
  const [active, setActive] = useState<number | null>(null)

  return (
    <div style={{ border: '1px solid var(--border)', borderRadius: 12, padding: 24, marginBottom: 32 }}>
      <h3 style={{ margin: '0 0 6px', fontSize: 16, fontWeight: 700, color: 'var(--text)' }}>TCP Header Field Inspector</h3>
      <p style={{ margin: '0 0 16px', fontSize: 13, color: 'var(--text-muted)' }}>
        Click any field in the header layout to learn its purpose and operational significance.
      </p>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 4, marginBottom: 16 }}>
        {TCP_HEADER_FIELDS.map((f, i) => (
          <div
            key={f.name}
            onClick={() => setActive(active === i ? null : i)}
            style={{
              padding: '8px',
              borderRadius: 6,
              background: active === i ? f.color : `${f.color}18`,
              border: `1px solid ${f.color}`,
              cursor: 'pointer',
              textAlign: 'center',
              gridColumn: i === TCP_HEADER_FIELDS.length - 1 ? '1 / -1' : undefined,
              transition: 'all .15s',
            }}
          >
            <p style={{ margin: 0, fontSize: 10, fontWeight: 700, color: active === i ? '#fff' : f.color }}>{f.name}</p>
            <p style={{ margin: 0, fontSize: 10, color: active === i ? '#ffffffcc' : 'var(--text-muted)' }}>{f.bits}</p>
            <p style={{ margin: 0, fontSize: 11, fontFamily: 'var(--font-mono)', color: active === i ? '#fff' : 'var(--text)' }}>{f.value}</p>
          </div>
        ))}
      </div>

      {active !== null ? (
        <div style={{ background: 'var(--surface)', border: `1px solid ${TCP_HEADER_FIELDS[active].color}`, borderRadius: 8, padding: '14px 16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
            <span style={{ background: TCP_HEADER_FIELDS[active].color, color: '#fff', borderRadius: 4, padding: '2px 10px', fontSize: 12, fontWeight: 700 }}>
              {TCP_HEADER_FIELDS[active].name}
            </span>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--text-muted)' }}>{TCP_HEADER_FIELDS[active].bits}</span>
          </div>
          <p style={{ margin: 0, fontSize: 14, color: 'var(--text)', lineHeight: 1.7 }}>{TCP_HEADER_FIELDS[active].description}</p>
        </div>
      ) : (
        <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 8, padding: '12px 16px', textAlign: 'center', color: 'var(--text-muted)', fontSize: 13 }}>
          Click any field above to inspect it
        </div>
      )}
    </div>
  )
}

/* ── Main export ──────────────────────────────────────────────────────────── */

export default function TcpDeepDive() {
  return (
    <LearnLayout
      title="TCP Deep Dive"
      description="A complete exploration of TCP — from the 3-way handshake and sequence number mechanics to congestion control algorithms, flow control, TIME_WAIT, TCP options, performance tuning, and the subtle failure modes that make TCP connections mysteriously hang."
      section="Networking Fundamentals — Module 20"
      readTime="28–38 min"
      updatedAt="May 2026"
    >
      {/* Chapter 01 */}
      <Chapter n={1} title="The Contract That Makes the Internet Work" />

      <StoryBox>
        The internet&apos;s physical infrastructure drops packets. Routers get congested and discard frames. Optical links have bit error rates. Switches lose packets during buffer overflow. IP itself is explicitly defined as &quot;best effort&quot; — it makes no delivery guarantees whatsoever.
        <br /><br />
        Yet when you download a file, you get every byte in order with no corruption. When you stream video, the player does not stutter from random reordering. When you send an email, it arrives complete.
        <br /><br />
        This reliability is not a property of the network — it is a property of TCP. TCP builds a reliable, ordered, bidirectional byte stream on top of an unreliable packet network. It does this by tracking every byte sent, acknowledging every byte received, retransmitting what was lost, and ordering what arrived out of sequence. TCP is the contract that transforms an unreliable network into a reliable data transport.
      </StoryBox>

      <Para>TCP (Transmission Control Protocol) is defined in RFC 793 (1981) with significant extensions in RFC 1122, RFC 2581, RFC 5681, and many others. It provides: <Accent>reliability</Accent> (guaranteed delivery via acknowledgment and retransmission), <Accent>ordering</Accent> (sequence numbers ensure bytes are delivered in transmission order), <Accent>flow control</Accent> (receive window prevents sender from overwhelming receiver), <Accent>congestion control</Accent> (adaptive sending rate prevents network saturation), and <Accent>error detection</Accent> (checksum over header and data).</Para>

      <WowBox emoji="⚡" title="50 Years Unchanged — TCP's Enduring Design">
        TCP was designed in 1974 by Vint Cerf and Bob Kahn for a network of perhaps a few hundred nodes. Yet the same core protocol — with only modest extensions — now carries petabytes per second across a global network of billions of devices. No redesign, no replacement, no breaking change in 50 years. The congestion control algorithms added in the 1980s by Van Jacobson still run on every TCP implementation today.
      </WowBox>

      <H3>TCP vs. UDP — When to Choose Each</H3>
      <Para>TCP&apos;s reliability comes at a cost: latency, complexity, and head-of-line blocking. Choosing between TCP and UDP requires understanding these trade-offs:</Para>
      <Para>• <Accent>Use TCP</Accent>: HTTP, HTTPS, email (SMTP/IMAP/POP), file transfers, database connections, anything where correctness matters more than latency.</Para>
      <Para>• <Accent>Use UDP</Accent>: DNS queries (short request-response, timeout-and-retry is sufficient), video streaming (a dropped frame is better than pausing to retransmit), games (old state is worthless, just send new state), DHCP.</Para>
      <Para>• <Accent>Use QUIC</Accent> (UDP-based with TLS): HTTP/3, modern video conferencing (WebRTC data channels). QUIC recovers TCP&apos;s reliability in user space while eliminating head-of-line blocking.</Para>

      <Divider />

      {/* Chapter 02 */}
      <Chapter n={2} title="The Three-Way Handshake" />

      <StoryBox>
        Two processes on different machines want to exchange data. Before a single byte of application data can flow, they need to agree on: starting sequence numbers (so they can detect reordering and track delivery), initial window sizes (so neither side overwhelms the other), and TCP options (MSS, window scaling, SACK). All of this happens in three packets — the three-way handshake.
        <br /><br />
        The three-way handshake is elegant because it solves the two-army problem: how do you get two parties to agree on a shared state when messages can be lost? The answer: you need three messages minimum. Two is not enough — one side can&apos;t know if the other received the final confirmation. With three messages, both sides have sent and received a confirmation.
      </StoryBox>

      <TcpHandshakeSimulator />

      <H3>SYN Cookies and SYN Flood Defense</H3>
      <Para>A SYN flood attack sends thousands of SYN packets per second with spoofed source IPs. The server responds to each with SYN-ACK and creates a half-open connection entry, consuming memory. If enough SYN-ACKs are sent with no ACK completing the handshake, the server&apos;s connection table fills and legitimate connections are rejected.</Para>

      <Para><Accent>SYN cookies</Accent> (RFC 4987) eliminate the need to store state for half-open connections. Instead of storing connection state after receiving a SYN, the server encodes all necessary connection information (client IP, port, ISN, MSS, timestamp) in the initial sequence number of the SYN-ACK. When the legitimate ACK arrives, the server decodes the ISN to reconstruct the connection. No state stored, no memory exhaustion — SYN flood mitigation without resource consumption.</Para>

      <CodeBlock>{`# Check SYN cookie status (Linux)
sysctl net.ipv4.tcp_syncookies          # Should be 1 (enabled)

# Monitor SYN flood activity
netstat -an | grep SYN_RECV | wc -l    # Count half-open connections
ss -n state syn-recv | wc -l           # Alternative

# Full connection state counts
ss -tan | awk '{print $1}' | sort | uniq -c | sort -rn

# tuning
sysctl -w net.ipv4.tcp_max_syn_backlog=65536   # Increase SYN backlog queue
sysctl -w net.ipv4.tcp_synack_retries=2         # Reduce SYN-ACK retries (flood mitigation)`}</CodeBlock>

      <Divider />

      {/* Chapter 03 */}
      <Chapter n={3} title="TCP Header — Every Bit Counts" />

      <StoryBox>
        The TCP header is 20 bytes minimum — less than one millisecond to transmit on a 1 Gbps link. Yet those 20 bytes contain the entire machinery for reliable delivery: sequence tracking, acknowledgment, flow control, connection state, and checksum. Every field is load-bearing. Understanding each field is the difference between reading a packet capture like a book and seeing random hex.
      </StoryBox>

      <TcpHeaderInspector />

      <H3>TCP Flags Deep Dive</H3>
      <Para>TCP flags occupy 9 bits in the header. The operationally significant flags:</Para>
      <Para>• <Accent>SYN</Accent>: synchronize sequence numbers. Only set during connection establishment. A SYN with ACK is the server&apos;s half of the handshake.</Para>
      <Para>• <Accent>ACK</Accent>: acknowledgment number is valid. Set in virtually every packet after the initial SYN. The absence of ACK in a non-SYN packet indicates something unusual.</Para>
      <Para>• <Accent>FIN</Accent>: no more data from sender. Initiates graceful close. Both sides must send FIN to fully close.</Para>
      <Para>• <Accent>RST</Accent>: reset — abort connection immediately. No graceful close. Used when a packet arrives for a closed port, when the connection is aborted due to error, or explicitly by applications using SO_LINGER with timeout=0.</Para>
      <Para>• <Accent>PSH</Accent>: push data to application immediately without buffering. Used for interactive applications (SSH, telnet) where each keystroke should be delivered immediately, not wait for a full buffer.</Para>
      <Para>• <Accent>URG</Accent>: urgent pointer field is significant. Rarely used in modern protocols — superceded by application-layer priority mechanisms. Old telnet break signal used this.</Para>
      <Para>• <Accent>ECE + CWR</Accent>: Explicit Congestion Notification (ECN). When a router experiences congestion, it sets the ECN codepoint in the IP header. The receiver echoes this to the sender via ECE. The sender confirms action taken via CWR. This avoids packet loss as the congestion signal, improving performance.</Para>

      <Divider />

      {/* Chapter 04 */}
      <Chapter n={4} title="Sequence Numbers and Reliability" />

      <StoryBox>
        TCP&apos;s reliability mechanism is built on one key insight: every byte in the data stream has a unique number. By numbering bytes, not packets, TCP can handle packet fragmentation, reordering, and loss transparently. A sender can retransmit a lost segment. A receiver can reorder out-of-sequence segments. The application layer sees a clean byte stream — the network messiness is completely hidden.
      </StoryBox>

      <Para>The <Accent>Initial Sequence Number (ISN)</Accent> is the starting point for each direction&apos;s byte numbering. Modern OSes choose ISNs using a time-based pseudo-random algorithm (RFC 6528: ISN = MD5(src_ip, src_port, dst_ip, dst_port, secret) + clock_offset). This prevents TCP sequence prediction attacks where an attacker could inject data into an existing connection by guessing the sequence number.</Para>

      <H3>Cumulative vs. Selective Acknowledgment</H3>
      <Para>Basic TCP uses <Accent>cumulative acknowledgment</Accent>: ACK=N means &quot;I have received all bytes up to N-1 successfully.&quot; If segment 1001–2000 arrives but 2001–3000 is lost, ACK=1001 is sent. When 3001–4000 arrives (out of order), ACK=1001 is still sent (three duplicate ACKs). The sender must retransmit from 2001 onward — even though 3001–4000 was received.</Para>

      <Para><Accent>SACK (Selective Acknowledgment, RFC 2018)</Accent> allows the receiver to inform the sender exactly which segments are received and which are missing. The SACK option contains block pairs (left_edge, right_edge) for each out-of-order segment received. The sender can retransmit only the specific missing segments — not everything after the loss. This dramatically improves performance over lossy links (Wi-Fi, satellite, mobile).</Para>

      <CodeBlock>{`# Check TCP options negotiated in a connection (Linux)
ss -ti dst 8.8.8.8       # Show TCP internals: cwnd, ssthresh, retrans, RTT, MSS, SACK

# Example output from ss -ti:
# cubic wscale:7,7 rto:204 rtt:4.121/1.052 ato:40 mss:1448 pmtu:1500 rcvmss:1448
# rcvbuf:131072 sndbuf:87380 lastsnd:68 lastrcv:68 lastack:68
# pacing_rate 36.8Mbps delivery_rate 25.2Mbps unacked:0 retrans:0/0 dsack_dups:0
# rcv_space:14480 rcv_ssthresh:64448 minrtt:3.5

# Check SACK is enabled
sysctl net.ipv4.tcp_sack           # Should be 1

# Capture SACK options in tcpdump
tcpdump -i eth0 'tcp[tcpflags] & tcp-ack != 0' -vvv | grep SACK`}</CodeBlock>

      <Warn title="Disabling TCP timestamps also disables PAWS sequence number protection">
        The <Accent>PAWS (Protection Against Wrapped Sequence Numbers)</Accent> mechanism uses TCP timestamps (RFC 7323) to prevent old duplicate segments from being accepted when sequence numbers wrap around. At 10 Gbps, a 32-bit sequence number wraps in ~3.4 seconds. Without PAWS, a delayed segment from a previous connection could arrive and corrupt the current stream. PAWS uses the timestamp option to detect and discard these wrapped duplicates. Disabling TCP timestamps (<Code>net.ipv4.tcp_timestamps=0</Code>) disables PAWS — safe only on networks with RTTs &gt; wrap-around period (nearly impossible at high bandwidth).
      </Warn>

      <Divider />

      {/* Chapter 05 */}
      <Chapter n={5} title="Flow Control and the Receive Window" />

      <StoryBox>
        A 1 Gbps server is sending data to a 10 Mbps client. Without flow control, the server would blast data a hundred times faster than the client can process it. The client&apos;s receive buffer would fill, overflow, and start dropping packets — causing the server to retransmit, making the situation worse.
        <br /><br />
        TCP&apos;s receive window solves this by allowing the receiver to tell the sender exactly how much buffer space it has available. The sender cannot transmit more than window bytes of unacknowledged data. As the receiver&apos;s application reads data from the buffer, it increases the window advertisement. If the receiver&apos;s buffer fills, the window shrinks to zero — the sender must pause.
      </StoryBox>

      <Para>The <Accent>receive window (rwnd)</Accent> is a 16-bit field in the TCP header — originally limiting maximum window size to 65,535 bytes (65 KB). On modern networks with 100+ ms round-trip times, the bandwidth-delay product can be hundreds of megabytes — far exceeding 65 KB. Enter <Accent>TCP Window Scaling (RFC 7323)</Accent>: negotiated during the handshake via a scale factor (0–14 bits), making the effective window up to 1 GB (65535 × 2¹⁴).</Para>

      <Para>The <Accent>Zero Window</Accent> condition occurs when rwnd = 0. The sender pauses. The receiver sends a <Accent>Window Update</Accent> (pure ACK with non-zero rwnd) when space becomes available. If this update is lost, the sender waits indefinitely — deadlock. TCP prevents this with the <Accent>Persist Timer</Accent>: the sender periodically sends a Window Probe to check if the window has reopened.</Para>

      <H3>Nagle Algorithm and PSH</H3>
      <Para>The <Accent>Nagle algorithm</Accent> (RFC 896) buffers small writes: if there is unacknowledged data in flight, hold small new segments until either the buffer fills to MSS or all previous data is acknowledged. This coalesces many small writes (interactive typing) into fewer larger segments, dramatically improving efficiency. Side effect: latency. For interactive applications (SSH, gaming), disable Nagle with <Code>TCP_NODELAY</Code> socket option.</Para>

      <CodeBlock>{`# Disable Nagle algorithm in code (Go example)
conn, _ := net.Dial("tcp", "server:port")
tcpConn := conn.(*net.TCPConn)
tcpConn.SetNoDelay(true)   // TCP_NODELAY — disables Nagle

# Python
import socket
s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
s.setsockopt(socket.IPPROTO_TCP, socket.TCP_NODELAY, 1)

# Check Nagle on existing connections
ss -ti | grep nodelay   # Shows if TCP_NODELAY is set

# Diagnose delayed ACK + Nagle interaction (a common performance problem)
# Symptom: 40ms delays on small write-read interactions
# Cause: sender holds small write (Nagle), receiver holds ACK (delayed ACK timer 40ms)
# Fix: TCP_NODELAY on sender OR TCP_QUICKACK on receiver (or both)`}</CodeBlock>

      <Divider />

      {/* Chapter 06 */}
      <Chapter n={6} title="Congestion Control — TCP's Self-Regulation" />

      <StoryBox>
        In 1986, the internet experienced its first congestion collapse. TCP at the time had no mechanism to back off when the network was congested. Routers dropped packets. TCP senders retransmitted. More retransmissions created more congestion. Throughput fell by a factor of 1000 on some paths.
        <br /><br />
        Van Jacobson at Lawrence Berkeley Laboratory had 32 kbps of leased line to the internet. On a good day, it ran at 32 kbps. During congestion collapse, he measured 40 bps — 800× degradation. He went home that weekend and invented TCP congestion control. By Monday, throughput had recovered to 32 kbps. The same algorithms run on every TCP implementation today.
      </StoryBox>

      <Para>TCP congestion control is the mechanism by which senders adapt their transmission rate to avoid overloading the network. It uses packet loss and ECN as congestion signals, and maintains a <Accent>congestion window (cwnd)</Accent> that limits how much data can be in flight. The actual sending rate is limited by <Code>min(cwnd, rwnd)</Code>.</Para>

      <TcpCongestionVisualizer />

      <H3>Congestion Control Phases</H3>
      <Para>• <Accent>Slow Start</Accent>: begins at cwnd=1 MSS. For each ACK received, cwnd increases by 1 MSS (exponential growth). Continues until cwnd reaches ssthresh (slow start threshold) or packet loss occurs. Despite the name, this is the fastest growth phase.</Para>

      <Para>• <Accent>Congestion Avoidance</Accent>: once cwnd reaches ssthresh, growth becomes additive — 1 MSS per RTT (linear). This is the AIMD (Additive Increase, Multiplicative Decrease) algorithm: cautious probing for available bandwidth.</Para>

      <Para>• <Accent>Fast Retransmit / Fast Recovery</Accent>: three duplicate ACKs signal a lost segment (not timeout — the network is still delivering later segments). ssthresh = cwnd/2. cwnd = ssthresh + 3. Retransmit the lost segment. Resume from Congestion Avoidance at ssthresh — not Slow Start. This avoids the performance penalty of dropping to cwnd=1.</Para>

      <Para>• <Accent>Timeout</Accent>: retransmission timer expires — much more severe signal. ssthresh = cwnd/2. cwnd = 1 MSS. Restart Slow Start from scratch.</Para>

      <H3>Modern Congestion Control Algorithms</H3>
      <Para>Classic Reno and CUBIC are loss-based: they reduce cwnd only when packet loss occurs. This works well on wired networks but is aggressive on shared links and slow to converge on high-bandwidth links (100G+ WANs):</Para>

      <Para>• <Accent>CUBIC (Linux default)</Accent>: uses a cubic function to grow cwnd, allowing faster recovery from loss events on high-bandwidth-delay product (BDP) networks. Standard on Linux since kernel 2.6.19.</Para>
      <Para>• <Accent>BBR (Bottleneck Bandwidth and RTT)</Accent>: Google&apos;s delay-based algorithm. Instead of reacting to loss, BBR models network state (bandwidth and RTT) and sends at the estimated optimal rate. Dramatically improves performance on lossy links (mobile, intercontinental). Enabled on YouTube&apos;s servers since 2016.</Para>
      <Para>• <Accent>QUIC&apos;s congestion control</Accent>: QUIC (HTTP/3) implements congestion control in user space, allowing per-connection algorithm selection. Different connections from the same app can use different algorithms simultaneously.</Para>

      <CodeBlock>{`# Check and change congestion control algorithm (Linux)
sysctl net.ipv4.tcp_congestion_control       # Show current algorithm
sysctl net.ipv4.tcp_available_congestion_control  # Show available algorithms

# Switch to BBR
sysctl -w net.ipv4.tcp_congestion_control=bbr
sysctl -w net.core.default_qdisc=fq          # BBR works best with fair queueing

# Per-connection in code (Linux):
# setsockopt(fd, IPPROTO_TCP, TCP_CONGESTION, "bbr", strlen("bbr") + 1)

# Monitor congestion window live
watch -n 0.5 'ss -ti | grep -A1 ESTABLISHED'`}</CodeBlock>

      <Divider />

      {/* Chapter 07 */}
      <Chapter n={7} title="Retransmission and RTO" />

      <StoryBox>
        TCP sends a segment and starts a timer. If no ACK arrives before the timer expires, it retransmits. Simple in concept — but setting the timer correctly is one of the hardest problems in distributed systems. Set it too short and you retransmit unnecessarily, wasting bandwidth. Set it too long and you wait too long after a loss, wasting time.
        <br /><br />
        The solution is adaptive measurement. TCP measures the RTT of each segment (using timestamps or manual timing), computes a smoothed RTT estimate (SRTT), tracks variance (RTTVAR), and sets the timeout as SRTT + 4 × RTTVAR. This Jacobson algorithm adapts to changing network conditions automatically — a key insight from 1988 that remains state-of-the-art.
      </StoryBox>

      <Para>The <Accent>Retransmission Timeout (RTO)</Accent> is computed using the Jacobson algorithm:</Para>
      <Para>• <Code>SRTT = (1 - α) × SRTT + α × RTTsample</Code> (α = 1/8)</Para>
      <Para>• <Code>RTTVAR = (1 - β) × RTTVAR + β × |RTTsample - SRTT|</Code> (β = 1/4)</Para>
      <Para>• <Code>RTO = SRTT + max(G, 4 × RTTVAR)</Code> (G = clock granularity, typically 1ms)</Para>

      <Para>On each retransmission, RTO is doubled (exponential back-off) up to a maximum (typically 60–120 seconds). This prevents retransmission storms during severe congestion. The RTO resets when a segment is successfully acknowledged.</Para>

      <WowBox emoji="⏱️" title="Karn's Algorithm and TCP Timestamps">
        TCP Timestamps option (RFC 7323) enables precise per-segment RTT measurement. Without timestamps, TCP can only measure RTT from ACK timing — which is ambiguous for retransmitted segments (Karn&apos;s Algorithm: don&apos;t update RTT estimate for retransmitted segments, since you don&apos;t know if the ACK is for the original or the retransmission). Timestamps uniquely identify each segment, resolving the ambiguity and allowing precise RTT measurement for every segment including retransmits.
      </WowBox>

      <Divider />

      {/* Chapter 08 */}
      <Chapter n={8} title="TIME_WAIT — The State Everyone Wants to Fix" />

      <StoryBox>
        A high-traffic load balancer processes 50,000 connections per second. Each connection after close enters TIME_WAIT for 60–120 seconds (2 × MSL, Maximum Segment Lifetime). At steady state, the load balancer has 3–6 million sockets in TIME_WAIT. The OS runs out of ephemeral ports. New connections fail with &quot;Address already in use.&quot; The operations team wants to reduce TIME_WAIT to 5 seconds to fix the problem. This makes things worse.
        <br /><br />
        TIME_WAIT exists for a reason. Eliminating it or reducing it too aggressively introduces subtle, catastrophic bugs.
      </StoryBox>

      <Para>TIME_WAIT serves two purposes:</Para>
      <Para>1. <Accent>Delayed segment absorption</Accent>: delayed segments from the closed connection could arrive after a new connection reuses the same 4-tuple. TIME_WAIT (2 × MSL) ensures all delayed segments from the old connection have expired before the 4-tuple can be reused, preventing them from corrupting the new connection&apos;s data stream.</Para>
      <Para>2. <Accent>Reliable FIN-ACK delivery</Accent>: the final ACK may be lost. The passive closer (server) retransmits its FIN. The active closer must be in TIME_WAIT to respond with ACK — if it were in CLOSED, it would send RST, confusing the server.</Para>

      <H3>TIME_WAIT Reduction Techniques</H3>
      <Para>• <Accent>TCP_REUSE</Accent> (<Code>net.ipv4.tcp_tw_reuse=1</Code>): allow reuse of TIME_WAIT sockets for new outbound connections when safe (requires TCP Timestamps to disambiguate segments). Safe to enable for outbound connections on busy servers.</Para>
      <Para>• <Accent>SO_REUSEADDR</Accent>: allows binding to a port that has sockets in TIME_WAIT. Necessary for server restart without waiting for TIME_WAIT expiry.</Para>
      <Para>• <Accent>Architectural</Accent>: use connection pooling so connections are reused rather than closed and reopened. The best fix is fewer connection close events.</Para>

      <Warn title="tcp_tw_recycle is removed from Linux — it breaks NAT'd connections">
        <Code>tcp_tw_recycle</Code> (net.ipv4.tcp_tw_recycle) was removed from Linux kernel 4.12. It caused connection failures for NAT&apos;ed clients (multiple clients behind NAT share the same public IP, so their timestamps appear to go backwards from the server&apos;s perspective). Never use it — the feature was fundamentally broken. Use <Code>tcp_tw_reuse</Code> instead, which is safe because it only reuses TIME_WAIT sockets for NEW connections, not for the same 4-tuple.
      </Warn>

      <Divider />

      {/* Chapter 09 */}
      <Chapter n={9} title="TCP Performance Tuning" />

      <StoryBox>
        A cloud storage application is transferring files between two servers 50ms apart (New York to London). The measured throughput is 5 Mbps on a 1 Gbps link — 0.5% utilization. The engineer assumes packet loss. But packet loss is zero. The bottleneck is the receive window: 65,535 bytes / 0.05 seconds = ~10 Mbps theoretical maximum. The application uses default socket buffer sizes. By increasing the socket receive buffer to 4 MB, throughput jumps to 80 Mbps. A single parameter change, a 16× improvement.
      </StoryBox>

      <Para>TCP throughput is bounded by the <Accent>bandwidth-delay product (BDP)</Accent>: the maximum data &quot;in flight&quot; at any moment. For a 1 Gbps link with 100ms RTT, BDP = 1,000,000,000 bits/second × 0.1 seconds = 100 Mb = 12.5 MB. The TCP window must be at least 12.5 MB to fully utilize the link. Default Linux socket buffers (4 MB) cannot saturate a 1 Gbps intercontinental path.</Para>

      <CodeBlock>{`# TCP buffer tuning for high-BDP paths (Linux)
# View current settings
sysctl net.ipv4.tcp_rmem              # [min, default, max] receive buffer
sysctl net.ipv4.tcp_wmem              # [min, default, max] send buffer

# Increase for high-bandwidth, high-latency paths
sysctl -w net.ipv4.tcp_rmem="4096 131072 67108864"   # max 64 MB receive
sysctl -w net.ipv4.tcp_wmem="4096 65536 67108864"    # max 64 MB send
sysctl -w net.core.rmem_max=67108864
sysctl -w net.core.wmem_max=67108864

# Enable auto-tuning (default on modern Linux — should already be on)
sysctl -w net.ipv4.tcp_moderate_rcvbuf=1

# Enable TCP window scaling (should be default)
sysctl -w net.ipv4.tcp_window_scaling=1

# Calculate required buffer for your BDP:
# bandwidth_bits/s × RTT_seconds / 8 = bytes
# Example: 10 Gbps × 0.1s / 8 = 125 MB minimum buffer for full utilization`}</CodeBlock>

      <H3>TCP Offload — Moving Work to Hardware</H3>
      <Para>Modern NICs offload TCP processing from the CPU:</Para>
      <Para>• <Accent>TSO (TCP Segmentation Offload)</Accent>: the kernel hands the NIC a large buffer; the NIC splits it into MSS-sized segments and computes checksums. Saves CPU cycles for segmentation and checksum calculation.</Para>
      <Para>• <Accent>GRO (Generic Receive Offload)</Accent>: the NIC aggregates small incoming segments into larger buffers before passing to the kernel. Reduces per-packet interrupt overhead.</Para>
      <Para>• <Accent>RSS (Receive Side Scaling)</Accent>: distributes incoming connections across multiple CPU cores using hardware hashing, enabling multi-core TCP processing.</Para>

      <Divider />

      {/* Chapter 10 */}
      <Chapter n={10} title="TCP Options — The Protocol Extension Mechanism" />

      <StoryBox>
        TCP Options are the evolutionary mechanism that has kept TCP relevant for five decades. The base protocol from 1981 has 20 bytes of fixed header. Options in the remaining 40 bytes have enabled window scaling, SACK, timestamps, fast open, multipath, authentication, and dozens of other features — all while remaining backward compatible with implementations from 1981 that ignore options they don&apos;t understand.
      </StoryBox>

      <Para>Key TCP options and their operational importance:</Para>
      <Para>• <Accent>MSS (Maximum Segment Size, Option 2)</Accent>: each side advertises the maximum segment it can receive in the SYN. Default TCP MSS = 536 bytes; Ethernet default = 1460 bytes (1500 MTU - 20 IP - 20 TCP). MSS is NOT negotiated — each side independently declares its limit; the sender uses the minimum.</Para>
      <Para>• <Accent>Window Scale (Option 3)</Accent>: scale factor for the window field. Negotiated in SYN/SYN-ACK only. If one side doesn&apos;t include it, window scaling is disabled for the connection. Always present on modern systems.</Para>
      <Para>• <Accent>SACK (Option 4 — SACK Permitted) + Option 5 (SACK Blocks)</Accent>: SACK Permitted advertised in SYN/SYN-ACK. SACK blocks (up to 4 ranges) carried in ACKs to report out-of-order receipt. Critical for performance over lossy links.</Para>
      <Para>• <Accent>Timestamps (Option 8)</Accent>: TSval (timestamp value) and TSecr (timestamp echo reply). Enables precise RTT measurement, PAWS protection, and improved retransmission decisions.</Para>
      <Para>• <Accent>TCP Fast Open, TFO (Option 34)</Accent>: allows data to be sent in the SYN packet on subsequent connections, eliminating one RTT of setup latency. Uses a cookie mechanism to prevent SYN data amplification.</Para>
      <Para>• <Accent>Multipath TCP, MPTCP (RFC 8684)</Accent>: multiple subflows over different paths (e.g., WiFi + cellular), transparent to applications. Used on iOS for Siri and FaceTime for seamless handoff between networks.</Para>

      <Divider />

      {/* Chapter 11 */}
      <Chapter n={11} title="TCP Connection Failures and Debugging" />

      <StoryBox>
        An application connects to a database. The connection succeeds. It sends a query. Silence. 30 seconds later: &quot;connection timeout.&quot; The database is running. The network is up. Ping works. Ports are open. What happened?
        <br /><br />
        A packet capture reveals the answer: the query packet (1500 bytes with DF bit) reaches a VPN tunnel interface with MTU 1400. The VPN gateway sends ICMP Fragmentation Needed back to the application server — but the firewall between the app server and VPN gateway blocks all ICMP. The app server never learns about the MTU constraint. It keeps sending 1500-byte packets that silently disappear at the VPN gateway. The database never receives the query.
        <br /><br />
        MTU mismatch + ICMP filtering = the invisible silent killer of TCP connections.
      </StoryBox>

      <CodeBlock>{`# TCP connection debugging toolkit

# 1. Check connection state
ss -tn dst 10.0.0.5:5432               # Specific connection state
ss -tn state established               # All established connections
ss -tn state syn-sent                  # Connections waiting for SYN-ACK (connect timeout)
ss -tn state time-wait | wc -l         # TIME_WAIT count (high = rapid connection cycling)

# 2. Check TCP retransmissions (high = packet loss or MTU issue)
ss -ti dst 10.0.0.5 | grep retrans
netstat -s | grep -i retran
cat /proc/net/snmp | grep Tcp

# 3. Capture the problem
tcpdump -i eth0 -w /tmp/capture.pcap 'host 10.0.0.5 and port 5432'
# Look for: retransmissions (same seq twice), zero window, RSTs

# 4. Check MTU on the path
ping -M do -s 1452 10.0.0.5           # Test 1480 byte packets
tracepath 10.0.0.5                     # Shows MTU changes at each hop

# 5. Check kernel TCP error counters
netstat -s | grep -E "failed|reset|error|timeout"

# 6. Watch real-time TCP events (Linux ftrace)
echo 1 > /sys/kernel/debug/tracing/events/tcp/enable`}</CodeBlock>

      <Divider />

      {/* Chapter 12 */}
      <Chapter n={12} title="TCP in Modern Applications" />

      <StoryBox>
        HTTP/1.1 reuses connections (keep-alive), but sends one request at a time. HTTP/2 multiplexes streams — dozens of requests in parallel over a single TCP connection. HTTP/3 runs over QUIC (UDP) to eliminate TCP&apos;s head-of-line blocking. Each generation is a response to TCP limitations becoming bottlenecks at larger scale.
        <br /><br />
        Understanding TCP helps you understand why HTTP/2 was built, why QUIC was necessary, and what trade-offs HTTP/3 makes. It is not just about TCP itself — it is about understanding the constraints that shape every protocol built on top of it.
      </StoryBox>

      <H3>TCP Head-of-Line Blocking</H3>
      <Para>TCP delivers bytes in order. If packet N is lost, packets N+1, N+2, ... are buffered and not delivered to the application until N is retransmitted and received. This is TCP head-of-line blocking: a single lost packet holds up everything behind it in the stream.</Para>

      <Para>HTTP/2 multiplexes multiple request/response streams over one TCP connection. If one stream&apos;s data is lost, TCP holds up ALL streams — including those with no data loss. A 1% packet loss that only affects one stream stalls all 30 streams in an HTTP/2 connection. HTTP/3 / QUIC solves this by implementing independent stream delivery in user space: a lost packet only blocks the one QUIC stream that contained it, not others.</Para>

      <H3>TCP Fast Open</H3>
      <Para>Standard TCP requires 1 RTT for handshake + 1 RTT minimum for the first request. On a 100ms path, that is 200ms before the server processes the first byte of the request. TCP Fast Open (TFO, RFC 7413) allows data in the SYN packet on repeat connections, reducing first-request latency to 1 RTT. Chrome and iOS use TFO for performance-sensitive connections.</Para>

      <CodeBlock>{`# Enable TCP Fast Open (Linux)
sysctl -w net.ipv4.tcp_fastopen=3      # 1=client, 2=server, 3=both

# Verify TFO in connection
ss -ti | grep tfo                       # Look for "fastopen" in output

# TFO in server code (Python)
import socket
s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
s.setsockopt(socket.SOL_TCP, socket.TCP_FASTOPEN, 5)   # 5 = backlog for TFO
s.bind(('0.0.0.0', 8080))
s.listen()`}</CodeBlock>

      <Divider />

      {/* Chapter 13 */}
      <Chapter n={13} title="Common Misconceptions" />

      <Err title="TCP guarantees delivery all the way to the application">
        <strong>TCP guarantees delivery and ordering end-to-end.</strong> TCP guarantees delivery and ordering from the sender&apos;s kernel to the receiver&apos;s kernel (socket buffer). It does NOT guarantee that the application processed the data, that the application acknowledged receipt, or that the data was written to disk. A server can ACK data and then crash before the application reads it. For application-level guarantees, use application-layer acknowledgments (database transactions, message queue ACKs).
      </Err>

      <Err title="RST immediately and reliably terminates a connection on both sides">
        <strong>RST immediately terminates a connection on both sides.</strong> RST is sent by one side and received by the other. The sender transitions to CLOSED. The receiver, upon receiving RST, aborts the connection. But if RST is lost (UDP drops it, firewall blocks it), the other side remains in its current state until timeout. More importantly, an RST with an out-of-window sequence number is silently discarded — this is by design to prevent RST injection attacks, but means RST can appear to &quot;not work&quot; if sequence numbers are out of sync.
      </Err>

      <Err title="Larger TCP buffers always improve performance">
        <strong>Increasing TCP buffer sizes always improves performance.</strong> Increasing socket buffers helps when the bottleneck is the bandwidth-delay product. But it cannot help if the bottleneck is actual link capacity, CPU, application processing, or disk I/O. Oversized buffers can increase latency (bufferbloat) — data queues up in large buffers rather than being dropped and retransmitted quickly. On LAN paths (sub-millisecond RTT), default buffers are already more than adequate. Tune buffers only when measurements show the window is the actual bottleneck.
      </Err>

      <Err title="Nagle + Delayed ACK are always safe and independent optimizations">
        <strong>The Nagle algorithm and delayed ACK are both optimizations that never cause problems.</strong> Nagle + Delayed ACK interaction is a classic performance anti-pattern. Nagle waits to send small writes until the previous data is ACKed. Delayed ACK waits 40ms before sending an ACK for a segment without data to piggyback. When both are active in the same connection with interactive small writes, every exchange incurs a 40ms delay: sender writes small data, Nagle holds it, receiver delays ACK 40ms, Nagle releases data, cycle repeats. Fix: <Code>TCP_NODELAY</Code> on the sender (disable Nagle).
      </Err>

      <Err title="TIME_WAIT is a bug or inefficiency that should be eliminated">
        <strong>TIME_WAIT is a bug or inefficiency that should be minimized.</strong> TIME_WAIT prevents two real correctness problems: delayed segment acceptance (old segments arriving after connection close) and reliable final ACK delivery. Aggressive reduction causes subtle data corruption on high-traffic servers — corrupted data streams where an old segment arrives and is accepted as belonging to the new connection because TIME_WAIT was skipped. The correct approach: connection pooling (avoid close events) and <Code>tcp_tw_reuse</Code> (safe reuse for outbound connections), not <Code>tcp_fin_timeout</Code> reduction below 30 seconds.
      </Err>

      <Err title="Three duplicate ACKs signal network-wide congestion">
        <strong>Three duplicate ACKs signal network congestion.</strong> Three duplicate ACKs signal a missing segment — likely packet loss at a specific link, not network-wide congestion. Fast Retransmit/Recovery (not full Slow Start) is appropriate because later segments are still arriving, indicating the path is functional. A timeout (no ACKs at all) better signals severe congestion or link failure, and justifies the more aggressive Slow Start. Misclassifying the signal leads to inappropriate cwnd reduction: too aggressive on 3-dup-ACK, too conservative on timeouts.
      </Err>

      <Divider />

      {/* Chapter 14 */}
      <Chapter n={14} title="Depth Check" />

      <IQ q="What is the TCP three-way handshake and why does it need three messages?" level="Beginner">
        SYN: client proposes connection and sends its ISN. SYN-ACK: server acknowledges client&apos;s ISN and sends its own ISN. ACK: client acknowledges server&apos;s ISN. Three messages are the minimum to establish bidirectional agreement: two would leave one side uncertain whether the other received confirmation.
      </IQ>

      <IQ q="What is the difference between flow control and congestion control?" level="Intermediate">
        Flow control prevents the sender from overwhelming the receiver&apos;s buffer — managed via the receive window (rwnd) in the TCP header, set by the receiver. Congestion control prevents the sender from overwhelming the network — managed via the congestion window (cwnd) in the sender&apos;s kernel, adjusted based on loss signals. Actual sending rate is limited by min(cwnd, rwnd). Both are necessary: a fast receiver with a congested network still needs congestion control.
      </IQ>

      <IQ q="Why does TIME_WAIT exist and what is the risk of reducing it?" level="Intermediate">
        TIME_WAIT (2 × MSL ≈ 60–120s) serves two purposes: absorbing delayed segments from the closed connection before the 4-tuple can be reused, and ensuring reliable delivery of the final ACK. Reducing it risks two bugs: a delayed segment from an old connection arriving and being accepted by a new connection reusing the same 4-tuple (data corruption), and the passive closer retransmitting its final FIN finding no TIME_WAIT socket to respond — receiving RST instead of ACK.
      </IQ>

      <IQ q="Explain SACK and how it improves performance over cumulative ACK alone." level="Senior">
        Selective Acknowledgment allows the receiver to report non-contiguous received segments. Rather than ACKing only the highest contiguous byte (cumulative ACK), SACK blocks encode the edges of received ranges. Example: if bytes 1–1000 and 2001–3000 are received but 1001–2000 is missing, SACK reports {'{'}sack(2001, 3000){'}'} — the sender retransmits only 1001–2000. Without SACK, the sender retransmits from the last cumulative ACK onward (Go-Back-N behavior), wasting bandwidth re-sending already-received data. SACK is critical for performance over lossy links (satellite, Wi-Fi) where multiple segments may be lost in one window.
      </IQ>

      <IQ q="How does TCP Fast Open work and what security concern does it address?" level="Senior">
        TFO allows data to be sent in the SYN packet on repeat connections, saving 1 RTT of setup overhead. The mechanism: on the first connection, the server generates a TFO cookie (HMAC of client IP + secret) and sends it to the client in the TFO option. On subsequent SYNs, the client includes the cookie. The server validates the cookie before accepting SYN data, preventing amplification attacks (an attacker cannot forge valid cookies to send arbitrary data to the server pretending to be a different IP). The limitation: TFO data is not protected against replay on the same connection — the server may process SYN data twice if the SYN is retransmitted. Application-layer idempotency is required for SYN-carried data.
      </IQ>

      <IQ q="Describe the interaction between CUBIC congestion control, BBR, and fairness when both run simultaneously on the same bottleneck link." level="PhD">
        CUBIC and BBR use fundamentally different congestion signals. CUBIC is loss-based: it backs off only when it detects loss (cwnd reduction on 3-dup-ACKs or timeout). BBR is model-based: it probes bandwidth and RTT, maintaining a model of network state. When CUBIC and BBR share a bottleneck: CUBIC aggressively fills the buffer (high queuing delay, high throughput for CUBIC). BBR sees increased RTT as congestion and reduces its rate. CUBIC flows get disproportionately high bandwidth because they are willing to inflate queues that BBR backs away from. In practice, BBR flows may get 30–70% less throughput than CUBIC flows on the same path — an unfairness that Google has partially addressed in BBRv2 (which adds loss-based congestion response to complement the model-based mechanism). The fundamental tension: loss-based protocols build queues aggressively; delay-based protocols yield. This remains an active area of research in TCP fairness and AQM (Active Queue Management) algorithm design.
      </IQ>

      <Divider />

      <KeyTakeaways items={[
        'TCP provides reliability, ordering, flow control, and congestion control over an unreliable IP network by numbering every byte and acknowledging receipt.',
        'The three-way handshake (SYN → SYN-ACK → ACK) establishes bidirectional agreement on initial sequence numbers and TCP options (MSS, window scale, SACK, timestamps).',
        'SYN cookies allow servers to handle SYN flood attacks without storing state for half-open connections — encoding connection info in the ISN and recovering it from the final ACK.',
        'Congestion control phases: Slow Start (exponential cwnd growth) → Congestion Avoidance (linear growth, AIMD) → Fast Recovery (triggered by 3 dup-ACKs, avoids Slow Start restart) → Timeout (Slow Start from cwnd=1).',
        'The receive window (rwnd) prevents buffer overflow at the receiver. Window scaling (RFC 7323) extends the 16-bit window to handle high-BDP paths (100ms RTT × 10 Gbps requires ~125 MB window).',
        'TIME_WAIT exists for correctness: delayed segment absorption and reliable final ACK delivery. Reducing it aggressively risks data corruption. Use connection pooling and tcp_tw_reuse instead.',
        'Nagle algorithm + Delayed ACK interaction causes 40ms delays on interactive small writes. Fix with TCP_NODELAY on the sender to disable Nagle buffering.',
        'SACK allows the sender to retransmit only missing segments rather than everything from the last ACK — critical for performance over lossy links (Wi-Fi, mobile, satellite).',
        'TCP head-of-line blocking: a single lost packet stalls all HTTP/2 streams over that TCP connection. HTTP/3 / QUIC solves this with independent per-stream delivery in user space.',
        'BBR (Bottleneck Bandwidth and RTT) model-based congestion control outperforms loss-based CUBIC on lossy links (mobile, intercontinental) but can be unfairly out-competed by CUBIC on shared queues.',
      ]} />
    </LearnLayout>
  )
}
