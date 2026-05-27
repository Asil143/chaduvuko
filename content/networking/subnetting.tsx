'use client'

import { useState } from 'react'
import { LearnLayout } from '@/components/content/LearnLayout'
import { KeyTakeaways } from '@/components/content/KeyTakeaways'

/* ── design tokens ──────────────────────────────────────────────────── */
const G = '#10b981'
const FONT_MONO = 'var(--font-mono)'
const FONT_DISPLAY = 'var(--font-display)'

/* ── helper components ──────────────────────────────────────────────── */
const Chapter = ({ n, title, subtitle }: { n: string; title: string; subtitle?: string }) => (
  <div style={{ marginBottom: 36 }}>
    <p style={{ fontSize: 11, color: G, fontFamily: FONT_MONO, fontWeight: 700, margin: '0 0 6px', letterSpacing: '.12em' }}>
      {`// CHAPTER ${n}`}
    </p>
    <h2 style={{ fontFamily: FONT_DISPLAY, fontSize: 'clamp(22px,3.5vw,34px)', fontWeight: 900, letterSpacing: '-1.5px', color: 'var(--text)', margin: subtitle ? '0 0 8px' : 0 }}>{title}</h2>
    {subtitle && <p style={{ fontSize: 15, color: 'var(--muted)', margin: 0, lineHeight: 1.6 }}>{subtitle}</p>}
  </div>
)

const Divider = () => <div style={{ borderTop: '1px solid var(--border)', margin: '56px 0' }} />

const Para = ({ children }: { children: React.ReactNode }) => (
  <p style={{ fontSize: 15, color: 'var(--text)', lineHeight: 1.95, margin: '0 0 20px' }}>{children}</p>
)

const H2 = ({ children }: { children: React.ReactNode }) => (
  <h3 style={{ fontSize: 18, fontWeight: 800, color: 'var(--text)', margin: '40px 0 14px', letterSpacing: '-0.5px' }}>{children}</h3>
)

const H3 = ({ children }: { children: React.ReactNode }) => (
  <h4 style={{ fontSize: 15, fontWeight: 700, color: 'var(--text)', margin: '28px 0 10px' }}>{children}</h4>
)

const Accent = ({ children }: { children: React.ReactNode }) => (
  <strong style={{ color: G, fontWeight: 700 }}>{children}</strong>
)

const Code = ({ children }: { children: React.ReactNode }) => (
  <code style={{ fontSize: 13, background: `${G}18`, color: G, padding: '2px 7px', borderRadius: 5, fontFamily: FONT_MONO }}>{children}</code>
)

const CodeBlock = ({ title, children }: { title?: string; children: React.ReactNode }) => (
  <div style={{ margin: '24px 0', borderRadius: 10, overflow: 'hidden', border: '1px solid #30363d' }}>
    {title && (
      <div style={{ background: '#161b22', padding: '8px 16px', borderBottom: '1px solid #30363d' }}>
        <span style={{ fontSize: 12, color: '#8b949e', fontFamily: FONT_MONO }}>{title}</span>
      </div>
    )}
    <pre style={{ background: '#0d1117', padding: '18px 20px', overflowX: 'auto', fontSize: 13, lineHeight: 1.75, color: '#e6edf3', margin: 0, fontFamily: FONT_MONO }}>
      {children}
    </pre>
  </div>
)

const StoryBox = ({ children }: { children: React.ReactNode }) => (
  <div style={{ background: 'rgba(59,130,246,0.07)', border: '1px solid rgba(59,130,246,0.25)', borderLeft: '3px solid #3b82f6', borderRadius: 10, padding: '20px 24px', margin: '28px 0' }}>
    <p style={{ fontSize: 11, fontWeight: 700, color: '#3b82f6', fontFamily: FONT_MONO, letterSpacing: '.12em', margin: '0 0 10px' }}>// REAL-WORLD SCENARIO</p>
    <div style={{ fontSize: 14, color: 'var(--text)', lineHeight: 1.9 }}>{children}</div>
  </div>
)

const WowBox = ({ emoji, title, children }: { emoji: string; title: string; children: React.ReactNode }) => (
  <div style={{ background: `${G}0d`, border: `1px solid ${G}30`, borderRadius: 10, padding: '20px 24px', margin: '28px 0' }}>
    <p style={{ fontSize: 11, fontWeight: 700, color: G, fontFamily: FONT_MONO, letterSpacing: '.12em', margin: '0 0 10px' }}>{emoji} {title}</p>
    <div style={{ fontSize: 14, color: 'var(--text)', lineHeight: 1.9 }}>{children}</div>
  </div>
)

const Warn = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <div style={{ background: 'rgba(245,158,11,0.07)', border: '1px solid rgba(245,158,11,0.3)', borderRadius: 10, padding: '16px 20px', margin: '24px 0' }}>
    <p style={{ fontSize: 12, fontWeight: 700, color: '#f59e0b', fontFamily: FONT_MONO, letterSpacing: '.1em', margin: '0 0 8px' }}>⚠ {title}</p>
    <div style={{ fontSize: 14, color: 'var(--text)', lineHeight: 1.85 }}>{children}</div>
  </div>
)

const Err = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <div style={{ background: 'rgba(239,68,68,0.07)', border: '1px solid rgba(239,68,68,0.25)', borderRadius: 10, padding: '16px 20px', margin: '24px 0' }}>
    <p style={{ fontSize: 12, fontWeight: 700, color: '#ef4444', fontFamily: FONT_MONO, letterSpacing: '.1em', margin: '0 0 8px' }}>✗ Common Mistake — {title}</p>
    <div style={{ fontSize: 14, color: 'var(--text)', lineHeight: 1.85 }}>{children}</div>
  </div>
)

const LEVEL_COLORS: Record<string, string> = {
  Beginner: '#10b981', Intermediate: '#3b82f6', Senior: '#8b5cf6', PhD: '#f97316',
}

const IQ = ({ q, level, children }: { q: string; level: 'Beginner' | 'Intermediate' | 'Senior' | 'PhD'; children: React.ReactNode }) => (
  <div style={{ marginBottom: 32 }}>
    <div style={{ display: 'flex', alignItems: 'flex-start', gap: 10, marginBottom: 0 }}>
      <span style={{ fontSize: 10, fontWeight: 700, color: '#fff', background: LEVEL_COLORS[level], padding: '3px 10px', borderRadius: 20, letterSpacing: '.06em', whiteSpace: 'nowrap', marginTop: 3, flexShrink: 0 }}>{level}</span>
      <div style={{ background: `${LEVEL_COLORS[level]}12`, border: `1px solid ${LEVEL_COLORS[level]}30`, borderRadius: '0 8px 0 0', padding: '12px 16px', fontSize: 14, fontWeight: 700, color: 'var(--text)', flex: 1 }}>{q}</div>
    </div>
    <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderTop: 'none', borderRadius: '0 0 8px 8px', padding: '16px 18px', fontSize: 14, color: 'var(--muted)', lineHeight: 1.9 }}>{children}</div>
  </div>
)

/* ── helper functions ───────────────────────────────────────────────── */
function cidrToMask(prefix: number): number[] {
  const mask = ~((1 << (32 - prefix)) - 1) >>> 0
  return [(mask >>> 24) & 0xFF, (mask >>> 16) & 0xFF, (mask >>> 8) & 0xFF, mask & 0xFF]
}

function parseIP(ip: string): number[] | null {
  const parts = ip.split('.').map(Number)
  if (parts.length !== 4) return null
  if (parts.some(p => isNaN(p) || p < 0 || p > 255)) return null
  return parts
}

function ipToNum(octets: number[]): number {
  return ((octets[0] << 24) | (octets[1] << 16) | (octets[2] << 8) | octets[3]) >>> 0
}

function numToIP(n: number): string {
  return `${(n >>> 24) & 0xFF}.${(n >>> 16) & 0xFF}.${(n >>> 8) & 0xFF}.${n & 0xFF}`
}

/* ── interactive: Subnet Calculator ────────────────────────────────── */
function SubnetCalculator() {
  const [baseIP, setBaseIP] = useState('10.0.0.0')
  const [prefix, setPrefix] = useState(16)
  const [subPrefix, setSubPrefix] = useState(24)

  const octets = parseIP(baseIP)
  const valid = octets !== null && prefix >= 1 && prefix <= 30 && subPrefix > prefix && subPrefix <= 30

  let subnets: { net: string; broadcast: string; first: string; last: string; hosts: number }[] = []
  let subnetCount = 0, hostsPerSubnet = 0, subnetMask = '', bitsAdded = 0

  if (valid && octets) {
    const mask = cidrToMask(prefix)
    const netNum = (ipToNum(octets) & ipToNum(mask)) >>> 0
    bitsAdded = subPrefix - prefix
    subnetCount = 1 << bitsAdded
    hostsPerSubnet = (1 << (32 - subPrefix)) - 2
    subnetMask = cidrToMask(subPrefix).join('.')
    const maxShow = Math.min(subnetCount, 8)
    const subSize = 1 << (32 - subPrefix)
    for (let i = 0; i < maxShow; i++) {
      const subNet = (netNum + i * subSize) >>> 0
      const broadcast = (subNet + subSize - 1) >>> 0
      subnets.push({ net: numToIP(subNet), broadcast: numToIP(broadcast), first: numToIP(subNet + 1), last: numToIP(broadcast - 1), hosts: hostsPerSubnet })
    }
  }

  return (
    <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 14, padding: 24, margin: '32px 0' }}>
      <p style={{ fontSize: 13, fontWeight: 700, color: G, fontFamily: FONT_MONO, margin: '0 0 4px', letterSpacing: '.1em' }}>SUBNET CALCULATOR</p>
      <p style={{ fontSize: 12, color: 'var(--muted)', margin: '0 0 20px' }}>Enter a base network and choose a subnet prefix to see how subnetting divides the address space.</p>

      <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', marginBottom: 20, alignItems: 'flex-end' }}>
        <div>
          <label style={{ fontSize: 12, color: 'var(--muted)', display: 'block', marginBottom: 4 }}>Base Network</label>
          <input value={baseIP} onChange={e => setBaseIP(e.target.value)}
            style={{ background: 'var(--bg)', border: `1px solid ${valid ? 'var(--border)' : '#ef4444'}`, borderRadius: 6, padding: '7px 12px', color: G, fontSize: 14, fontFamily: FONT_MONO, width: 148, outline: 'none' }} />
        </div>
        <div>
          <label style={{ fontSize: 12, color: 'var(--muted)', display: 'block', marginBottom: 4 }}>Original /{prefix}</label>
          <input type="range" min={8} max={28} value={prefix} onChange={e => { const v = Number(e.target.value); setPrefix(v); if (subPrefix <= v) setSubPrefix(v + 2) }}
            style={{ width: 110 }} />
        </div>
        <div>
          <label style={{ fontSize: 12, color: 'var(--muted)', display: 'block', marginBottom: 4 }}>Subnet /{subPrefix}</label>
          <input type="range" min={prefix + 1} max={30} value={subPrefix} onChange={e => setSubPrefix(Number(e.target.value))}
            style={{ width: 110 }} />
        </div>
      </div>

      {valid && (
        <>
          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginBottom: 16 }}>
            {[
              { label: 'Subnets Created', value: subnetCount.toLocaleString(), color: '#3b82f6' },
              { label: 'Hosts Per Subnet', value: hostsPerSubnet.toLocaleString(), color: G },
              { label: 'Subnet Mask', value: subnetMask, color: '#8b5cf6' },
              { label: 'Bits Borrowed', value: String(bitsAdded), color: '#f59e0b' },
            ].map(item => (
              <div key={item.label} style={{ background: 'var(--bg)', border: '1px solid var(--border)', borderRadius: 8, padding: '8px 14px' }}>
                <div style={{ fontSize: 11, color: 'var(--muted)', marginBottom: 2 }}>{item.label}</div>
                <div style={{ fontSize: 14, fontWeight: 700, color: item.color, fontFamily: FONT_MONO }}>{item.value}</div>
              </div>
            ))}
          </div>

          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 12, fontFamily: FONT_MONO }}>
              <thead>
                <tr style={{ background: `${G}15` }}>
                  {['#', 'Network', 'Broadcast', 'First Host', 'Last Host', 'Hosts'].map(h => (
                    <th key={h} style={{ padding: '8px 12px', textAlign: 'left', color: G, fontWeight: 700, fontSize: 11 }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {subnets.map((s, i) => (
                  <tr key={i} style={{ background: i % 2 === 0 ? 'var(--bg)' : 'var(--surface)', borderBottom: '1px solid var(--border)' }}>
                    <td style={{ padding: '7px 12px', color: 'var(--muted)' }}>{i + 1}</td>
                    <td style={{ padding: '7px 12px', color: G, fontWeight: 700 }}>{s.net}/{subPrefix}</td>
                    <td style={{ padding: '7px 12px', color: '#ef4444' }}>{s.broadcast}</td>
                    <td style={{ padding: '7px 12px', color: 'var(--text)' }}>{s.first}</td>
                    <td style={{ padding: '7px 12px', color: 'var(--text)' }}>{s.last}</td>
                    <td style={{ padding: '7px 12px', color: '#f59e0b' }}>{s.hosts}</td>
                  </tr>
                ))}
                {subnetCount > 8 && (
                  <tr style={{ background: 'var(--surface)' }}>
                    <td colSpan={6} style={{ padding: '8px 12px', color: 'var(--muted)', textAlign: 'center', fontSize: 12 }}>
                      … {(subnetCount - 8).toLocaleString()} more subnets not shown
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </>
      )}

      {!valid && (
        <div style={{ background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.3)', borderRadius: 8, padding: 12 }}>
          <p style={{ fontSize: 13, color: '#ef4444', margin: 0, fontFamily: FONT_MONO }}>Subnet prefix must be larger than original prefix (max /30).</p>
        </div>
      )}
    </div>
  )
}

/* ── interactive: VLSM Planner ──────────────────────────────────────── */
function VLSMPlanner() {
  const requirements = [
    { name: 'Engineering', needed: 120, prefix: 25, allocated: '192.168.0.0/25', hosts: 126, waste: 6 },
    { name: 'Sales', needed: 60, prefix: 26, allocated: '192.168.0.128/26', hosts: 62, waste: 2 },
    { name: 'Servers', needed: 30, prefix: 27, allocated: '192.168.0.192/27', hosts: 30, waste: 0 },
    { name: 'HR', needed: 14, prefix: 28, allocated: '192.168.0.224/28', hosts: 14, waste: 0 },
    { name: 'Management', needed: 6, prefix: 29, allocated: '192.168.0.240/29', hosts: 6, waste: 0 },
    { name: 'Router link A', needed: 2, prefix: 30, allocated: '192.168.0.248/30', hosts: 2, waste: 0 },
    { name: 'Router link B', needed: 2, prefix: 30, allocated: '192.168.0.252/30', hosts: 2, waste: 0 },
  ]

  const [selected, setSelected] = useState<string | null>(null)
  const sel = requirements.find(r => r.name === selected)
  const totalUsed = requirements.reduce((s, r) => s + (1 << (32 - r.prefix)), 0)
  const totalAvail = 1024

  return (
    <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 14, padding: 24, margin: '32px 0' }}>
      <p style={{ fontSize: 13, fontWeight: 700, color: G, fontFamily: FONT_MONO, margin: '0 0 4px', letterSpacing: '.1em' }}>VLSM PLANNER</p>
      <p style={{ fontSize: 12, color: 'var(--muted)', margin: '0 0 4px' }}>Base: 192.168.0.0/22 (1022 usable). Allocated largest-first using VLSM.</p>
      <p style={{ fontSize: 12, color: 'var(--muted)', margin: '0 0 20px' }}>Click any row to see the allocation detail and efficiency.</p>

      <div style={{ borderRadius: 8, overflow: 'hidden', border: '1px solid var(--border)' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '150px 70px 60px 1fr 60px', padding: '8px 14px', background: `${G}15`, fontSize: 11, fontWeight: 700, color: G, fontFamily: FONT_MONO, gap: 0 }}>
          <span>Segment</span><span>Needed</span><span>Prefix</span><span>Allocated Block</span><span>Hosts</span>
        </div>
        {requirements.map((r, i) => (
          <div key={r.name} onClick={() => setSelected(selected === r.name ? null : r.name)}
            style={{ display: 'grid', gridTemplateColumns: '150px 70px 60px 1fr 60px', padding: '10px 14px', background: selected === r.name ? `${G}12` : i % 2 === 0 ? 'var(--bg)' : 'var(--surface)', borderBottom: i < requirements.length - 1 ? '1px solid var(--border)' : 'none', cursor: 'pointer', transition: 'all .15s', alignItems: 'center' }}>
            <span style={{ fontSize: 13, fontWeight: 600, color: selected === r.name ? G : 'var(--text)' }}>{r.name}</span>
            <span style={{ fontSize: 12, color: 'var(--muted)', fontFamily: FONT_MONO }}>{r.needed}</span>
            <span style={{ fontSize: 12, fontWeight: 700, color: G, fontFamily: FONT_MONO }}>/{r.prefix}</span>
            <code style={{ fontSize: 11, color: G, fontFamily: FONT_MONO }}>{r.allocated}</code>
            <span style={{ fontSize: 12, color: '#f59e0b', fontFamily: FONT_MONO }}>{r.hosts}</span>
          </div>
        ))}
      </div>

      {sel && (
        <div style={{ marginTop: 12, background: `${G}0d`, border: `1px solid ${G}30`, borderRadius: 8, padding: 14 }}>
          <p style={{ fontSize: 12, fontWeight: 700, color: G, margin: '0 0 6px', fontFamily: FONT_MONO }}>{sel.name} — {sel.allocated}</p>
          <p style={{ fontSize: 13, color: 'var(--text)', margin: 0, lineHeight: 1.8 }}>
            Required: {sel.needed} hosts. Smallest fitting prefix: /{sel.prefix} → 2<sup>{32 - sel.prefix}</sup> − 2 = {sel.hosts} usable.
            Address waste: {sel.waste} ({sel.hosts - sel.needed} unused out of {sel.hosts}). Fixed-length /25 throughout would waste far more.
          </p>
        </div>
      )}

      <div style={{ marginTop: 16, background: 'var(--bg)', border: '1px solid var(--border)', borderRadius: 8, padding: '12px 16px', display: 'flex', gap: 24, flexWrap: 'wrap' }}>
        <div>
          <div style={{ fontSize: 11, color: 'var(--muted)', marginBottom: 2 }}>Addresses Used</div>
          <div style={{ fontSize: 14, fontWeight: 700, color: G, fontFamily: FONT_MONO }}>{totalUsed} / {totalAvail}</div>
        </div>
        <div>
          <div style={{ fontSize: 11, color: 'var(--muted)', marginBottom: 2 }}>Remaining</div>
          <div style={{ fontSize: 14, fontWeight: 700, color: '#f59e0b', fontFamily: FONT_MONO }}>{totalAvail - totalUsed} addresses free</div>
        </div>
        <div>
          <div style={{ fontSize: 11, color: 'var(--muted)', marginBottom: 2 }}>Efficiency</div>
          <div style={{ fontSize: 14, fontWeight: 700, color: '#3b82f6', fontFamily: FONT_MONO }}>{Math.round((totalUsed / totalAvail) * 100)}% allocated</div>
        </div>
      </div>
    </div>
  )
}

/* ── interactive: Subnetting Quiz ───────────────────────────────────── */
function SubnetQuiz() {
  const questions = [
    {
      q: '192.168.5.200/26 — what is the network address?',
      answer: '192.168.5.192',
      options: ['192.168.5.0', '192.168.5.192', '192.168.5.200', '192.168.5.128'],
      explain: '/26 block size = 64. 200 ÷ 64 = 3 rem 8. Network = 3 × 64 = 192. Network: 192.168.5.192/26. Broadcast: 192.168.5.255.'
    },
    {
      q: '10.10.10.0/28 — how many usable host addresses?',
      answer: '14',
      options: ['14', '16', '30', '32'],
      explain: '/28 host bits = 32−28 = 4. Total addresses = 2⁴ = 16. Usable = 16 − 2 = 14. Mask: 255.255.255.240.'
    },
    {
      q: 'Are 172.16.5.10/24 and 172.16.6.10/24 in the same subnet?',
      answer: 'No',
      options: ['Yes', 'No'],
      explain: '/24 looks at first 24 bits. 172.16.5 ≠ 172.16.6 in the third octet — different networks. Would need /23 to contain both.'
    },
    {
      q: 'What is the broadcast of 10.0.4.0/22?',
      answer: '10.0.7.255',
      options: ['10.0.4.255', '10.0.7.255', '10.0.3.255', '10.0.5.255'],
      explain: '/22 host bits = 10. Block size = 1024 = 4×256. Network 10.0.4.0. Broadcast = 10.0.4.0 + 1023 = 10.0.7.255 (4+3=7 in 3rd octet, 255 in 4th).'
    },
    {
      q: 'A /22 is subnetted from a /16. How many bits were borrowed?',
      answer: '6',
      options: ['4', '6', '8', '2'],
      explain: '22 − 16 = 6 bits borrowed. This creates 2⁶ = 64 /22 subnets from the original /16.'
    },
    {
      q: 'Summarize 10.4.0.0/24, 10.4.1.0/24, 10.4.2.0/24, 10.4.3.0/24 into one prefix.',
      answer: '10.4.0.0/22',
      options: ['10.4.0.0/21', '10.4.0.0/22', '10.4.0.0/23', '10.4.0.0/24'],
      explain: '4 contiguous /24s. Binary of 3rd octet: 00, 01, 10, 11 — common prefix is 6 bits. Total: 16+6 = /22. Block size = 1024 = 4×256. Covers .0.0 through .3.255 exactly.'
    },
  ]

  const [current, setCurrent] = useState(0)
  const [selected, setSelected] = useState<string | null>(null)
  const [score, setScore] = useState(0)
  const [done, setDone] = useState(false)

  const q = questions[current]
  const isCorrect = selected === q.answer

  const handleSelect = (opt: string) => {
    if (selected !== null) return
    setSelected(opt)
    if (opt === q.answer) setScore(s => s + 1)
  }

  const next = () => {
    if (current < questions.length - 1) { setCurrent(c => c + 1); setSelected(null) }
    else setDone(true)
  }

  const reset = () => { setCurrent(0); setSelected(null); setScore(0); setDone(false) }

  return (
    <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 14, padding: 24, margin: '32px 0' }}>
      <p style={{ fontSize: 13, fontWeight: 700, color: G, fontFamily: FONT_MONO, margin: '0 0 4px', letterSpacing: '.1em' }}>SUBNETTING QUIZ</p>
      <p style={{ fontSize: 12, color: 'var(--muted)', margin: '0 0 20px' }}>Mental subnetting — solve without a calculator.</p>

      {!done ? (
        <>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 14 }}>
            <span style={{ fontSize: 12, color: 'var(--muted)' }}>Question {current + 1} / {questions.length}</span>
            <span style={{ fontSize: 12, color: G, fontFamily: FONT_MONO }}>Score: {score}</span>
          </div>
          <p style={{ fontSize: 15, fontWeight: 700, color: 'var(--text)', margin: '0 0 16px', lineHeight: 1.5 }}>{q.q}</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 16 }}>
            {q.options.map(opt => {
              let bg = 'var(--bg)', border = 'var(--border)', color = 'var(--text)'
              if (selected !== null) {
                if (opt === q.answer) { bg = `${G}15`; border = G; color = G }
                else if (opt === selected) { bg = 'rgba(239,68,68,0.12)'; border = '#ef4444'; color = '#ef4444' }
              }
              return (
                <div key={opt} onClick={() => handleSelect(opt)}
                  style={{ padding: '10px 16px', background: bg, border: `2px solid ${border}`, borderRadius: 8, cursor: selected === null ? 'pointer' : 'default', color, fontSize: 14, fontFamily: FONT_MONO, fontWeight: opt === q.answer && selected !== null ? 700 : 400, transition: 'all .1s' }}>
                  {opt}
                </div>
              )
            })}
          </div>
          {selected !== null && (
            <>
              <div style={{ background: isCorrect ? `${G}10` : 'rgba(239,68,68,0.1)', border: `1px solid ${isCorrect ? G : '#ef4444'}30`, borderRadius: 8, padding: 12, marginBottom: 14 }}>
                <p style={{ fontSize: 13, color: isCorrect ? G : '#ef4444', margin: '0 0 4px', fontWeight: 700 }}>{isCorrect ? 'Correct!' : 'Incorrect.'}</p>
                <p style={{ fontSize: 13, color: 'var(--text)', margin: 0, lineHeight: 1.7 }}>{q.explain}</p>
              </div>
              <button onClick={next} style={{ background: G, color: '#000', border: 'none', borderRadius: 6, padding: '8px 20px', fontSize: 13, fontWeight: 700, cursor: 'pointer' }}>
                {current < questions.length - 1 ? 'Next' : 'Finish'}
              </button>
            </>
          )}
        </>
      ) : (
        <div style={{ textAlign: 'center', padding: '20px 0' }}>
          <p style={{ fontSize: 36, fontWeight: 900, color: score >= 5 ? G : score >= 3 ? '#f59e0b' : '#ef4444', margin: '0 0 8px', fontFamily: FONT_MONO }}>{score}/{questions.length}</p>
          <p style={{ fontSize: 14, color: 'var(--muted)', margin: '0 0 20px' }}>
            {score === questions.length ? 'Perfect — you can subnet without a calculator.' : score >= 4 ? 'Strong subnetting skills.' : score >= 2 ? 'Good foundation — keep practicing the block-size method.' : 'Review the binary arithmetic and try again.'}
          </p>
          <button onClick={reset} style={{ background: G, color: '#000', border: 'none', borderRadius: 6, padding: '8px 24px', fontSize: 13, fontWeight: 700, cursor: 'pointer' }}>Try Again</button>
        </div>
      )}
    </div>
  )
}

/* ── main export ────────────────────────────────────────────────────── */
export default function SubnettingModule() {
  return (
    <LearnLayout
      title="Subnetting"
      description="The craft of dividing IP address space into precisely sized broadcast domains. From bit manipulation and block-size arithmetic to VLSM, route summarization, and cloud subnet planning — subnetting is the most tested skill in network engineering."
      section="Networking Fundamentals"
      readTime="55 min"
    >

      {/* ──────────────────────────────────────────── CHAPTER 1 */}
      <Chapter n="01" title="Why Subnetting Exists" subtitle="Broadcast domains, the cost of a flat network, and what RFC 917 solved" />

      <StoryBox>
        Before subnetting existed, a company receiving a Class B allocation (e.g., 172.16.0.0/16) placed all 65,534 hosts on one flat broadcast domain. Every ARP request hit every host. Every DHCP Discover hit every host. Every NetBIOS name query hit every host. By 1983, networks with more than a few hundred devices were functionally unusable — the broadcast storm from normal operation consumed most of the available bandwidth. Dr. Jeff Mogul at Stanford published RFC 917 in 1984, proposing subnetting: take the single large allocation and divide it using a "subnet mask" into smaller, router-separated sub-networks. One flat /16 (one broadcast domain, 65,534 hosts) becomes 256 routed /24 subnets (256 broadcast domains of 254 hosts each). Broadcasts no longer propagate across the entire company. RFC 950 (1985) formalized the subnet mask mechanism. It became required in RFC 1122 (1989). Modern networking is built on it.
      </StoryBox>

      <Para>
        <Accent>Subnetting</Accent> is the process of dividing a larger IP network into smaller sub-networks by extending the network portion of the address — borrowing bits from the host portion to create more networks, each with fewer hosts. The mathematical operation is simple: the subnet mask ANDed with the IP address yields the network address, and the boundary where the network portion ends is where the subnet is "cut."
      </Para>

      <H2>Why Subnetting Still Matters in 2024</H2>

      <Para>
        <Accent>Broadcast domain segmentation:</Accent> ARP, DHCP, OSPF hello packets, and other broadcast/multicast traffic are contained within their subnet. A switch with 1,000 ports and no subnetting delivers every ARP flood to all 1,000 devices. Subdivided into /24 subnets (254 hosts each), an ARP flood reaches only 253 other hosts.
      </Para>

      <Para>
        <Accent>Security enforcement:</Accent> Routers between subnets create packet inspection boundaries. Firewall rules, ACLs, and security group policies operate between subnets. A flat network cannot be selectively restricted — every host can reach every other host directly. Subnets are the granularity at which security policy is applied in nearly every enterprise, cloud, and container environment.
      </Para>

      <Para>
        <Accent>Address efficiency:</Accent> A department with 30 devices gets a /27 (30 hosts) rather than a /24 (254 hosts). The saved addresses serve other subnets. In RFC 1918 private space this matters less — but in cloud environments (AWS, GCP, Azure), VPC CIDR blocks are finite and subnetting determines how many services can be deployed.
      </Para>

      <Para>
        <Accent>Routing hierarchy and summarization:</Accent> Hierarchically allocated subnets enable route aggregation. A site with 20 /24 subnets from 10.5.0.0/20 can advertise one summary route (/20) to the rest of the network instead of 20 individual entries. This reduces routing table sizes by orders of magnitude.
      </Para>

      <WowBox emoji="🧠" title="Subnetting is the #1 Tested Skill in Network Engineering Interviews">
        Across Cisco CCNA/CCNP/CCIE, CompTIA Network+, AWS Solutions Architect, and nearly every network engineer technical interview, subnetting questions appear. Not because they're artificially hard, but because they test binary fluency — the foundation of all network addressing. Engineers who can subnet in their heads (no calculator) demonstrate genuine understanding of IP address structure. The technique is straightforward once you internalize the binary relationship: everything is powers of 2, block sizes are always powers of 2, subnet boundaries are always multiples of the block size.
      </WowBox>

      <Divider />

      {/* ──────────────────────────────────────────── CHAPTER 2 */}
      <Chapter n="02" title="The Binary Mechanics of Subnetting" subtitle="Borrowing bits, block sizes, and subnet boundaries from first principles" />

      <Para>
        Subnetting is pure binary arithmetic. To subnet a /24 network, you take the last 8 bits (the host portion) and decide how many to "donate" to the network portion. Each donated bit:
      </Para>

      <Para>
        — doubles the number of available subnets<br />
        — halves the number of hosts per subnet<br />
        — halves the block size (the address range each subnet covers)
      </Para>

      <CodeBlock title="Subnetting a /24 — bit borrowing visualization">
{`Original /24:
  11000000.10101000.00000001 | 00000000
  ←─────── 24 network bits ────────→ ← 8 host →

Borrow 1 → /25:  ...00000001.0 | 0000000  (2 subnets, 126 hosts, block 128)
Borrow 2 → /26:  ...00000001.00 | 000000  (4 subnets,  62 hosts, block  64)
Borrow 3 → /27:  ...00000001.000 | 00000  (8 subnets,  30 hosts, block  32)
Borrow 4 → /28:  ...00000001.0000 | 0000  (16 subnets, 14 hosts, block  16)
Borrow 5 → /29:  ...00000001.00000 | 000  (32 subnets,  6 hosts, block   8)
Borrow 6 → /30:  ...00000001.000000 | 00  (64 subnets,  2 hosts, block   4)
Borrow 7 → /31:  ...00000001.0000000 | 0  (RFC 3021 point-to-point, 2 usable)
Borrow 8 → /32:  all bits = network, 0 hosts (host route)`}
      </CodeBlock>

      <H2>The Block Size: The Most Useful Mental Tool</H2>

      <Para>
        The <Accent>block size</Accent> is the total number of addresses in each subnet, including network and broadcast. It equals 2^(host bits) = 2^(32 - prefix). For a /26, block size = 2^6 = 64. For a /27, block size = 2^5 = 32.
      </Para>

      <Para>
        The critical insight: <Accent>all subnets of a given prefix must start at addresses that are multiples of their block size</Accent>. This is subnet boundary alignment. A /26 (block 64) must start at 0, 64, 128, or 192 in the relevant octet. A /27 (block 32) at 0, 32, 64, 96, 128, 160, 192, 224. This is not arbitrary — it flows directly from the binary AND operation used to compute network addresses.
      </Para>

      <CodeBlock title="Why alignment is mandatory — binary AND verification">
{`/26 at a VALID boundary (192.168.1.64):
  IP:   11000000.10101000.00000001.01000000  (192.168.1.64)
  Mask: 11111111.11111111.11111111.11000000  (/26)
  AND:  11000000.10101000.00000001.01000000  = 192.168.1.64 ✓ (= itself)

/26 at an INVALID boundary (192.168.1.70):
  IP:   11000000.10101000.00000001.01000110  (192.168.1.70)
  Mask: 11111111.11111111.11111111.11000000  (/26)
  AND:  11000000.10101000.00000001.01000000  = 192.168.1.64 ✗

→ 192.168.1.70 is NOT a network address for /26 — it's a host in 192.168.1.64/26.
   A router configured with 192.168.1.70/26 will calculate the wrong subnet.`}
      </CodeBlock>

      <H2>Core Formulas</H2>

      <Para>
        Given original prefix /n and borrowing k bits to create /{'{n+k}'} subnets:
      </Para>

      <CodeBlock title="Subnetting formulas">
{`Number of subnets   = 2^k
Hosts per subnet    = 2^(32 - n - k) - 2   [subtract network + broadcast]
Block size          = 2^(32 - n - k)        [= hosts + 2]
Subnet mask         = 255.255.255.{256 - block_size}  [for /25–/30 in 4th octet]

For /29 (borrowing 5 bits from /24):
  k = 5 → subnets = 2^5 = 32
  host bits = 32-24-5 = 3 → hosts = 2^3 - 2 = 6
  block = 8 → mask = 255.255.255.248

The "256 - block_size" trick works only for prefixes in the 4th octet (/25–/30).
For 3rd-octet prefixes (/17–/24), apply to the 3rd octet instead.`}
      </CodeBlock>

      <H2>Full /24 Subnetting Reference</H2>

      <CodeBlock title="All subnets derivable from a /24">
{`Prefix  Mask                Block  Subnets  Hosts  Boundaries (4th octet)
/25    255.255.255.128       128      2      126   0, 128
/26    255.255.255.192        64      4       62   0, 64, 128, 192
/27    255.255.255.224        32      8       30   0,32,64,96,128,160,192,224
/28    255.255.255.240        16     16       14   0,16,32,...,224,240
/29    255.255.255.248         8     32        6   0,8,16,...,248
/30    255.255.255.252         4     64        2   0,4,8,...,252
/31    255.255.255.254         2    128    2 (P2P) 0,2,4,...,254
/32    255.255.255.255         1    256    0 (host) 0,1,2,...,255`}
      </CodeBlock>

      <SubnetCalculator />

      <Divider />

      {/* ──────────────────────────────────────────── CHAPTER 3 */}
      <Chapter n="03" title="Mental Subnetting: The Four-Step Method" subtitle="Solve any subnet question in under 10 seconds without a calculator" />

      <StoryBox>
        A CCIE written exam has 100 questions in 2 hours. At 72 seconds per question, you cannot open a subnet calculator. When the question says "10.0.0.0/8 is subnetted into /20s — which subnet contains host 10.5.100.50?", you need the answer in under 8 seconds. The mental method: /20 → interesting octet is 3rd (prefix 17-24 = 3rd octet territory; prefix 25-32 = 4th octet territory; prefix 9-16 = 2nd octet territory; prefix 1-8 = 1st). Block size in 3rd octet = 2^(24-20) = 16. 100 ÷ 16 = 6 remainder 4. Network = 6 × 16 = 96. Subnet: 10.5.96.0/20. Done. Eight seconds.
      </StoryBox>

      <H2>Step 1 — Find the Prefix</H2>

      <Para>
        Given a host count requirement, find the minimum host bits that satisfy hosts + 2 ≤ 2^h. Then prefix = 32 − h.
      </Para>

      <CodeBlock title="Finding the right prefix for a given host count">
{`Hosts needed → minimum 2^h → prefix
    2    → 2^2=4   → /30    (2 usable hosts)
    6    → 2^3=8   → /29    (6 usable)
   14    → 2^4=16  → /28    (14 usable)
   30    → 2^5=32  → /27    (30 usable)
   50    → 2^6=64  → /26    (62 usable)
   60    → 2^6=64  → /26    (62 usable)
  100    → 2^7=128 → /25    (126 usable)
  200    → 2^8=256 → /24    (254 usable)
  500    → 2^9=512 → /23    (510 usable)
 1000    → 2^10=1024 → /22  (1022 usable)
 2000    → 2^11=2048 → /21  (2046 usable)`}
      </CodeBlock>

      <H2>Step 2 — Identify the Interesting Octet</H2>

      <Para>
        The "interesting octet" is the octet where the prefix boundary falls — where some bits are network and some are host. Prefixes /1–/8 are interesting in the 1st octet, /9–/16 in the 2nd, /17–/24 in the 3rd, /25–/32 in the 4th.
      </Para>

      <CodeBlock title="Identifying the interesting octet">
{`Prefix   Interesting octet   Example
/8       1st                 10.x.x.x — whole network is "10"
/16      2nd                 172.16.x.x — block increments in octet 2
/20      3rd                 10.5.96.0 — block increments in octet 3
/24      3rd (last bit)      192.168.5.0 — whole 3rd octet = network
/26      4th                 192.168.1.64/26 — block in 4th octet
/30      4th                 10.0.0.4/30 — tiny P2P blocks in 4th octet`}
      </CodeBlock>

      <H2>Step 3 — Find the Block Size in the Interesting Octet</H2>

      <Para>
        Block size in the interesting octet = 2^(bits left after the prefix in that octet). For /26 in the 4th octet: 32 − 26 = 6 host bits. Block = 2^6 = 64. For /20 in the 3rd octet: 24 − 20 = 4 bits. Block in 3rd octet = 2^4 = 16 (meaning subnet boundaries in the 3rd octet are 0, 16, 32, 48 ... etc).
      </Para>

      <H2>Step 4 — Find Which Subnet Contains the Host</H2>

      <Para>
        Take the interesting octet value from the IP address. Divide by block size (integer division). Multiply back. That's your network address in that octet. Broadcast = network + block − 1 in that octet.
      </Para>

      <CodeBlock title="Mental method worked examples">
{`Example 1: Which subnet is 192.168.1.100 in for /26?
  Interesting octet: 4th. Block = 64.
  100 ÷ 64 = 1, rem 36. Network = 1×64 = 64.
  → Network: 192.168.1.64/26. Broadcast: 192.168.1.127. Hosts: .65–.126

Example 2: Which subnet is 10.5.100.50 in for /20?
  Interesting octet: 3rd. Block in 3rd = 2^(24-20) = 16.
  100 ÷ 16 = 6, rem 4. Network = 6×16 = 96.
  → Network: 10.5.96.0/20. Broadcast: 10.5.111.255. Hosts: .96.1–.111.254

Example 3: Which subnet is 172.16.250.10 in for /12?
  Interesting octet: 2nd. Block in 2nd = 2^(16-12) = 16.
  16 ÷ 16 = 1, rem 0. Network = 1×16 = 16.
  → Network: 172.16.0.0/12. Broadcast: 172.31.255.255.
  (All of 172.16.x.x–172.31.x.x is within this /12 block.)`}
      </CodeBlock>

      <SubnetQuiz />

      <Divider />

      {/* ──────────────────────────────────────────── CHAPTER 4 */}
      <Chapter n="04" title="VLSM — Variable Length Subnet Masking" subtitle="Different prefix lengths for different needs — the universal standard" />

      <StoryBox>
        A company gets 192.168.0.0/22 (1022 usable addresses) and must connect: Engineering (120 users), Sales (60 users), Servers (30 machines), HR (14 users), Management VLAN (6 switches), and 2 router point-to-point links (2 endpoints each). If you use fixed-length /25 subnets (126 hosts each): you get 8 subnets × 126 hosts = 1008 possible assignments. But the router links use only 2 of their 126 slots each — wasting 248 addresses on router cables. VLSM assigns exactly what each segment needs: /25 for Engineering, /26 for Sales, /27 for Servers, /28 for HR, /29 for Management, /30 for each router link. Total allocated: 252 of 1022 addresses. Total wasted: only 8 (alignment gaps) rather than hundreds.
      </StoryBox>

      <Para>
        <Accent>VLSM (Variable Length Subnet Masking)</Accent> allows different subnets within the same address space to use different prefix lengths. This has been standard practice since OSPF version 2 (1991) introduced classless routing updates. Fixed-length subnetting — where every subnet is the same size — still appears in coursework but is considered wasteful in any production environment.
      </Para>

      <H2>The VLSM Design Process: Largest First</H2>

      <Para>
        The cardinal rule: <Accent>always allocate the largest subnet first</Accent>. Starting with the smallest leaves insufficient contiguous space for larger subnets (which have stronger alignment requirements). A /25 must start at 0 or 128 in the 4th octet — if you've already placed small subnets at 0 and 4 and 8, there may be no valid /25 boundary remaining.
      </Para>

      <CodeBlock title="VLSM allocation procedure">
{`Base: 192.168.0.0/22 (1024 total, 1022 usable)

1. Sort requirements largest to smallest:
   Engineering: 120 hosts → /25 (126 usable), block 128
   Sales:         60 hosts → /26  (62 usable), block  64
   Servers:       30 hosts → /27  (30 usable), block  32
   HR:            14 hosts → /28  (14 usable), block  16
   Management:     6 hosts → /29   (6 usable), block   8
   Router link A:  2 hosts → /30   (2 usable), block   4
   Router link B:  2 hosts → /30   (2 usable), block   4

2. Allocate sequentially from 192.168.0.0:
   192.168.0.0/25    → Engineering  (0–127, usable 1–126)
   192.168.0.128/26  → Sales        (128–191, usable 129–190)
   192.168.0.192/27  → Servers      (192–223, usable 193–222)
   192.168.0.224/28  → HR           (224–239, usable 225–238)
   192.168.0.240/29  → Management   (240–247, usable 241–246)
   192.168.0.248/30  → Router link A (248–251, usable 249–250)
   192.168.0.252/30  → Router link B (252–255, usable 253–254)

3. Verify: 128+64+32+16+8+4+4 = 256 addresses used (192.168.0.0/24 range)
   Remaining: 192.168.1.0/24 through 192.168.3.255 (768 addresses) for future growth`}
      </CodeBlock>

      <VLSMPlanner />

      <H2>VLSM Alignment Verification</H2>

      <Para>
        After allocating each subnet, verify: does the network address divide evenly by the block size? If not, the subnet is misaligned — there is a gap in the allocation or an overlap.
      </Para>

      <CodeBlock title="Alignment check">
{`Check 192.168.0.128/26 (block 64):
  128 ÷ 64 = 2 with remainder 0 ✓ — valid boundary

Check 192.168.0.192/27 (block 32):
  192 ÷ 32 = 6 with remainder 0 ✓ — valid

What if we tried to start the /28 at 230 instead of 224?
  230 ÷ 16 = 14 remainder 6 ✗ — invalid. Nearest valid: 224 or 240.`}
      </CodeBlock>

      <Warn title="Non-contiguous VLSM creates routing black holes">
        VLSM relies on contiguous sequential allocation. If you assign 192.168.0.0/25, then jump to 192.168.0.200/27 without assigning 192.168.0.128/26, the range 192.168.0.128–199 is unallocated but potentially covered by a summary route. Packets to those addresses are delivered to the router advertising the summary but have no more-specific route — they are silently dropped. Always allocate sequentially from the base network.
      </Warn>

      <Divider />

      {/* ──────────────────────────────────────────── CHAPTER 5 */}
      <Chapter n="05" title="Supernetting and Route Aggregation" subtitle="Combining contiguous subnets into one summary prefix — reducing routing table size" />

      <Para>
        The reverse of subnetting is <Accent>supernetting</Accent> — combining multiple smaller prefixes into one larger aggregate prefix for routing advertisement. This reduces routing table entries and is essential for scalable network design. A router advertising one /20 covers 16 /24 subnets with one table entry rather than 16.
      </Para>

      <H2>Requirements for Valid Summarization</H2>

      <Para>
        For networks to be summarized into a single prefix: (1) they must be contiguous in binary — no gaps; (2) the set must be a power-of-2 multiple (1, 2, 4, 8, 16...) starting at a boundary aligned to the summary prefix's block size; (3) the summary prefix must exactly cover the aggregate — no more, no less — or you'll advertise address space you don't own.
      </Para>

      <H2>Finding the Summary Route via Binary</H2>

      <Para>
        Write all network addresses in binary, aligned. Find the rightmost bit position where all addresses agree. The summary prefix length is that position. The summary network address uses all the common bits, with the remaining bits set to 0.
      </Para>

      <CodeBlock title="Route summarization examples">
{`Example 1: Summarize four /24s
10.4.0.0/24:  ...00000100.00000000
10.4.1.0/24:  ...00000100.00000001
10.4.2.0/24:  ...00000100.00000010
10.4.3.0/24:  ...00000100.00000011
                              ↑↑ last two bits differ
Common prefix in 3rd octet: 000001xx — 6 bits agree.
Total: 16 + 6 = /22. Summary: 10.4.0.0/22 ✓

Example 2: Summarize 192.168.8.0/24 and 192.168.9.0/24
3rd octet: 00001000 (8) vs 00001001 (9)
                                   ↑ differs at bit 0
Common: 0000100x — 7 bits. Total: 16+7 = /23. Summary: 192.168.8.0/23 ✓

Example 3: Can we summarize 192.168.8.0/24 and 192.168.10.0/24?
3rd octet: 00001000 (8) vs 00001010 (10)
                                 ↑ differs at bit 1
Summary would be /22 (covering .8, .9, .10, .11).
BUT .9 and .11 are not in our list — advertising /22 claims space we don't own.
→ These cannot be cleanly summarized. They need separate route entries.`}
      </CodeBlock>

      <H2>Discontinuous Summarization: A Dangerous Trap</H2>

      <Para>
        A summary route that covers address space you don't control is actively harmful. If your router advertises 10.4.0.0/22 but only controls 10.4.0.0/24 and 10.4.3.0/24 (not .1 or .2), traffic to 10.4.1.x and 10.4.2.x will reach your router (following the summary) but find no more-specific route — packets are blackholed. Always verify that a summary prefix covers exactly the networks you're advertising and no more.
      </Para>

      <H2>Supernetting and CIDR on the Internet</H2>

      <Para>
        BGP relies on supernetting for scalability. An ISP with 100 customer /24 allocations from the contiguous block 203.0.0.0/16 advertises one /16 to the global BGP table instead of 100 /24s. This is why internet BGP tables have ~900K entries rather than tens of millions. Each entry in the DFZ (Default-Free Zone) table represents a prefix where further aggregation is impossible — either due to multi-homing (customer announcing its /24 from two ISPs to control inbound routing) or non-contiguous historical allocations.
      </Para>

      <Divider />

      {/* ──────────────────────────────────────────── CHAPTER 6 */}
      <Chapter n="06" title="Subnetting Across Octets" subtitle="When the interesting octet is not the fourth — /8, /16, and cross-boundary subnets" />

      <StoryBox>
        A CCIE candidate stalls on the exam question: "10.0.0.0/8 is subnetted with mask 255.248.0.0 — how many subnets, and which subnet contains host 10.25.100.50?" Students who memorized /25–/30 tables hit a wall here. But the method is identical. The mask 255.248.0.0 = /13. Interesting octet: 2nd (prefix between /9 and /16 falls in the 2nd octet). Block in 2nd octet = 2^(16-13) = 8. Subnets from /8 to /13 = 2^(13-8) = 32. Host 10.25.100.50: 2nd octet = 25. 25 ÷ 8 = 3, rem 1. Network in 2nd octet = 3 × 8 = 24. Subnet: 10.24.0.0/13. Broadcast: 10.31.255.255. Problem solved.
      </StoryBox>

      <Para>
        The four-step mental method works identically for any prefix length — the only variable is which octet is "interesting." Prefixes /9–/16 affect the 2nd octet; /17–/24 affect the 3rd octet.
      </Para>

      <CodeBlock title="Cross-octet subnetting examples">
{`/16 subnets from 10.0.0.0/8:
  Interesting: 2nd octet. Block in 2nd = 2^(16-16) = 1.
  Subnets: 10.0.0.0/16, 10.1.0.0/16, ..., 10.255.0.0/16 (256 subnets)

/20 subnets from 172.16.0.0/16:
  Interesting: 3rd octet. Block in 3rd = 2^(24-20) = 16.
  Subnets: 172.16.0.0/20, 172.16.16.0/20, ..., 172.16.240.0/20 (16 subnets)
  Host 172.16.35.10: 35 ÷ 16 = 2 rem 3. Network = 2×16 = 32. → 172.16.32.0/20

/12 subnets from 10.0.0.0/8:
  Interesting: 2nd octet. Block in 2nd = 2^(16-12) = 16.
  Subnets: 10.0.0.0/12, 10.16.0.0/12, 10.32.0.0/12, ..., 10.240.0.0/12 (16 subnets)

/23 subnets from 192.168.0.0/16:
  Interesting: 3rd octet. Block in 3rd = 2^(24-23) = 2.
  Subnets: 192.168.0.0/23, 192.168.2.0/23, ..., 192.168.254.0/23 (128 subnets)
  Each covers two consecutive 3rd-octet values (.0+.1, .2+.3, etc.)`}
      </CodeBlock>

      <H2>The /24 as a Boundary Anchor</H2>

      <Para>
        The /24 is a special case: the prefix boundary falls exactly at the end of the 3rd octet, so the entire 4th octet is host space. This makes /24s the most intuitive subnet to work with — the 3rd octet identifies the network (e.g., "the 10.1.5 subnet"), the 4th octet identifies the host. Most IT practitioners and documentation use /24 as the default subnet size because of this clean boundary. It's not always the right choice (wasteful for small segments, undersized for large ones), but it's the cognitive baseline.
      </Para>

      <Divider />

      {/* ──────────────────────────────────────────── CHAPTER 7 */}
      <Chapter n="07" title="/31 and /32: Special Prefix Cases" subtitle="RFC 3021, host routes, loopbacks, and when 'no broadcast' matters" />

      <H2>/30 — The Classical Point-to-Point Subnet</H2>

      <Para>
        Before RFC 3021, every routed link between two network devices was assigned a /30 — the smallest "normal" subnet with 2 usable host addresses. Block size 4: addresses .0 (network), .1 (router A), .2 (router B), .3 (broadcast). The network and broadcast are "wasted" in the sense that they can never be assigned to a host, but this was accepted as the minimum overhead for a routed link.
      </Para>

      <H2>/31 — RFC 3021 Point-to-Point (No Network/Broadcast)</H2>

      <Para>
        RFC 3021 (2000) recognized that the network and broadcast addresses serve no purpose on a strictly point-to-point link — there are only two devices, and neither ARP nor broadcast is needed. A /31 contains exactly 2 addresses, and RFC 3021 explicitly permits both to be assigned to hosts. This saves 2 addresses per link compared to /30.
      </Para>

      <Para>
        In a large ISP with 10,000 router links, the difference between /30 and /31 is 20,000 addresses — an entire /18 recovered. Cisco IOS (since 12.2), Juniper JunOS, Arista EOS, and all modern router platforms support /31 on point-to-point interfaces. The only constraint: the connected host must also support /31 (no legacy equipment expecting a broadcast address on point-to-point links).
      </Para>

      <CodeBlock title="/30 vs /31 on router interfaces">
{`# /30 — classical approach
interface GigabitEthernet0/0
 ip address 10.0.0.1 255.255.255.252   ! .1 is router A, .2 is router B
 ! Network: 10.0.0.0, broadcast: 10.0.0.3 — both wasted

# /31 — RFC 3021
interface GigabitEthernet0/0
 ip address 10.0.0.0 255.255.255.254   ! .0 is router A, .1 is router B
 ! No network/broadcast — both addresses usable

# IPv6 equivalent (/127, RFC 6164)
interface GigabitEthernet0/0
 ipv6 address 2001:db8::1/127          ! .0 and .1 both usable`}
      </CodeBlock>

      <H2>/32 — Host Routes</H2>

      <Para>
        A /32 is a single IP address with no subnet context. It identifies one specific interface. Uses: loopback interfaces on routers (Loopback0 with /32 IP, used as the OSPF router ID and stable management address — never goes down even if physical interfaces fail), policy routing to override normal routing for a specific host, BGP network statements to advertise exactly one IP, and VPN endpoint addressing. A /32 is also used in security contexts: a /32 ACL entry matches exactly one host with no possibility of matching adjacent hosts accidentally.
      </Para>

      <CodeBlock title="/32 host routes in routing tables">
{`# Cisco — inject specific host route
ip route 10.10.10.50 255.255.255.255 10.0.0.1

# This /32 overrides any less-specific route (e.g., 10.10.10.0/24) via LPM

# Loopback0 — router management IP as /32
interface Loopback0
 ip address 10.255.255.1 255.255.255.255   ! Router ID, always up

# Routing table result:
# C   10.255.255.1/32 is directly connected, Loopback0
# → Reachable even when all physical interfaces flap`}
      </CodeBlock>

      <Divider />

      {/* ──────────────────────────────────────────── CHAPTER 8 */}
      <Chapter n="08" title="Subnetting in IPv6" subtitle="128-bit addresses, the /64 standard, and why address exhaustion is mathematically impossible" />

      <Para>
        IPv6 subnetting follows identical binary logic to IPv4 — the only difference is the address is 128 bits instead of 32. But this quantitative difference produces a qualitative change in how subnetting is practiced. IPv6 is so address-rich that conservation is unnecessary — the design philosophy shifts from "how do we fit these devices into this limited space" to "how do we allocate clearly and document well."
      </Para>

      <H2>The Fixed /64 Boundary</H2>

      <Para>
        The standard IPv6 LAN subnet is <Accent>/64</Accent> — always. This is not arbitrary: SLAAC (Stateless Address Autoconfiguration, RFC 4862) requires a /64 prefix for its EUI-64-based address generation. When a host generates a SLAAC address, it takes the 64-bit network prefix from the Router Advertisement and appends a 64-bit Interface Identifier derived from the MAC address. This only works if the prefix is exactly /64. Breaking this convention (using /65 or /48 for LANs) requires DHCPv6 only — no SLAAC.
      </Para>

      <Para>
        A /64 has 2^64 = 18.4 × 10^18 possible addresses per subnet. Every /64 assigned to a home or office LAN has more addresses than there are humans on Earth. IPv6 address conservation is a non-concept at the /64 level.
      </Para>

      <H2>IPv6 Prefix Hierarchy</H2>

      <CodeBlock title="IPv6 allocation hierarchy">
{`IANA → RIR: /12 to /23 blocks
RIR → ISP:   typically /32 per ISP
ISP → Customer: typically /48 per site (residential may get /56 or /64)
Customer → LAN: /64 per subnet (SLAAC standard)
P2P links: /127 (RFC 6164 — same motivation as /31 in IPv4)
Loopbacks: /128 (equivalent of /32)

Example: Customer gets 2001:db8:abcd::/48
  Available /64 subnets: 2^(64-48) = 2^16 = 65,536
  First LAN:    2001:db8:abcd:0001::/64
  Second LAN:   2001:db8:abcd:0002::/64
  DMZ:          2001:db8:abcd:0010::/64
  Management:   2001:db8:abcd:00ff::/64
  ...and 65,531 more available`}
      </CodeBlock>

      <H2>EUI-64 Interface Identifier Generation</H2>

      <Para>
        SLAAC uses the MAC address to generate the 64-bit interface identifier. Process: take the 48-bit MAC, insert FF:FE in the middle (making it 64 bits), then flip the 7th bit of the first byte (the Universal/Local bit). This is EUI-64.
      </Para>

      <CodeBlock title="EUI-64 generation">
{`MAC address: 00:1A:2B:3C:4D:5E

1. Split: 00:1A:2B | 3C:4D:5E
2. Insert FF:FE in middle: 00:1A:2B:FF:FE:3C:4D:5E
3. Flip bit 7 of first byte:
   00 = 00000000 → flip bit 7 → 00000010 = 02
4. Interface identifier: 02:1A:2B:FF:FE:3C:4D:5E
   Formatted as IPv6: 021a:2bff:fe3c:4d5e

With network prefix 2001:db8:abcd:1::/64:
SLAAC address: 2001:db8:abcd:1:021a:2bff:fe3c:4d5e`}
      </CodeBlock>

      <WowBox emoji="∞" title="IPv6 Has More Addresses Than Atoms on Earth">
        IPv6 provides 2^128 = 340,282,366,920,938,463,463,374,607,431,768,211,456 addresses. That's 340 undecillion. For comparison, the estimated number of atoms on Earth is 1.33 × 10^50 — about 10^8 times fewer than IPv6 addresses. Every star in the observable universe could have a trillion networks, each with a trillion devices, and IPv6 would still have room. The /64 per LAN approach "wastes" 18 quintillion addresses per subnet intentionally — simplicity of SLAAC and future-proofing are worth more than address conservation at these scales.
      </WowBox>

      <Divider />

      {/* ──────────────────────────────────────────── CHAPTER 9 */}
      <Chapter n="09" title="Subnetting in Cloud and Container Environments" subtitle="AWS VPC CIDR, Azure VNet, GCP, Kubernetes pod networks" />

      <H2>AWS VPC Subnetting</H2>

      <Para>
        An AWS VPC is assigned a CIDR block between /16 and /28. This VPC CIDR is then divided into subnets, each placed in a specific Availability Zone. AWS enforces a 5-address reservation in every subnet: <Code>.0</Code> (network address), <Code>.1</Code> (VPC router), <Code>.2</Code> (DNS server), <Code>.3</Code> (future AWS use), and the last address (broadcast). A /24 AWS subnet therefore has 256 − 5 = 251 usable addresses, not the traditional 254.
      </Para>

      <CodeBlock title="AWS subnet planning">
{`VPC: 10.0.0.0/16 (65,536 total addresses)

AZ us-east-1a:
  Public subnet:    10.0.0.0/24   (251 usable for EC2, ELB)
  Private subnet:   10.0.1.0/24   (251 usable for app tier)
  Data subnet:      10.0.2.0/24   (251 usable for RDS, ElastiCache)

AZ us-east-1b:
  Public subnet:    10.0.10.0/24
  Private subnet:   10.0.11.0/24
  Data subnet:      10.0.12.0/24

AZ us-east-1c:
  Public subnet:    10.0.20.0/24
  Private subnet:   10.0.21.0/24
  Data subnet:      10.0.22.0/24

Reserved for services:
  VPC Endpoints:    10.0.100.0/24  (PrivateLink, Interface endpoints)
  Transit Gateway:  10.0.200.0/28  (/28 minimum for TGW attachment subnets)
  Lambda:           10.0.201.0/24  (Lambda VPC networking ENIs)

Remaining: 10.0.3.0 → 10.0.9.255 etc. — growth headroom`}
      </CodeBlock>

      <H2>Kubernetes Pod and Service CIDR</H2>

      <Para>
        Kubernetes uses three separate CIDR ranges: the node network (actual IP addresses of nodes in the VPC/datacenter), the <Accent>pod CIDR</Accent> (virtual IPs assigned to pods by the CNI plugin), and the <Accent>service CIDR</Accent> (virtual IPs for Kubernetes Services, not routable outside the cluster). These must not overlap with each other or with the node network.
      </Para>

      <CodeBlock title="Kubernetes network planning">
{`# kubeadm init example
kubeadm init \
  --pod-network-cidr=10.244.0.0/16 \    # Pod CIDR (flannel default)
  --service-cidr=10.96.0.0/12           # Service CIDR (kube-proxy)

# Node network: 192.168.1.0/24 (actual machines, not pods)

# Per-node pod subnet (kubelet assigns each node a /24 from pod CIDR):
# Node 1: 10.244.0.0/24 — up to 254 pods
# Node 2: 10.244.1.0/24 — up to 254 pods
# Node 3: 10.244.2.0/24 — up to 254 pods

# /16 pod CIDR gives: 2^8 = 256 nodes × 254 pods = 65,024 total pods
# For larger clusters: use /14 (1024 nodes) or /12 (4096 nodes)

# Common mistake: pod CIDR overlaps with VPC CIDR
# If VPC is 10.0.0.0/8 and pod CIDR is 10.244.0.0/16 → OVERLAP → pods
# can't reach AWS services that use 10.x.x.x addresses`}
      </CodeBlock>

      <H2>Docker Default Network</H2>

      <Para>
        Docker creates a default bridge network at 172.17.0.0/16 on every installation. Containers on the bridge network get IPs from 172.17.0.0/16. If your enterprise uses 172.17.x.x for internal systems, Docker containers cannot reach those systems — same-subnet destination, Docker routes to the local bridge instead of through the host gateway. Fix: change Docker's default bridge network to a range not used by your infrastructure (<Code>{"\"bip\": \"192.168.200.1/24\""}</Code> in /etc/docker/daemon.json).
      </Para>

      <Divider />

      {/* ──────────────────────────────────────────── CHAPTER 10 */}
      <Chapter n="10" title="Classless Routing Protocols and Subnet Masks in Updates" subtitle="Why RIPv1 broke VLSM and how OSPF, EIGRP, BGP fixed it" />

      <Para>
        Subnetting and VLSM only work if routing protocols carry subnet mask information in their routing updates. <Accent>Classful protocols</Accent> (RIPv1, IGRP — both obsolete) assume all subnets have the same prefix length as the class default. They don't include mask information in updates. <Accent>Classless protocols</Accent> (RIPv2, OSPF, EIGRP, IS-IS, BGP) include the subnet mask in every routing update — enabling VLSM.
      </Para>

      <CodeBlock title="Classful vs classless routing update behavior">
{`Network: 10.0.0.0/8 subnetted with VLSM:
  10.1.0.0/16 — Site A
  10.2.0.0/24 — Server VLAN
  10.3.0.0/30 — Router P2P link

RIPv1 (classful) update would send:
  → "10.0.0.0" (no mask) — receiver assumes /8 per Class A default
  → ALL subnets collapse to one entry: loses granularity, can't build
     accurate routing table, breaks VLSM

OSPF (classless) LSA (Link State Advertisement) includes:
  → 10.1.0.0 255.255.0.0   (/16 preserved)
  → 10.2.0.0 255.255.255.0 (/24 preserved)
  → 10.3.0.0 255.255.255.252 (/30 preserved)
  → Each subnet is individually reachable

BGP NLRI (Network Layer Reachability Information):
  prefix: 10.4.0.0/22 length: 22  ← explicit prefix length in every advertisement`}
      </CodeBlock>

      <Para>
        This is why RIPv1 and IGRP are not just obsolete — they are actively incompatible with VLSM. Any network using variable-length subnets requires a classless routing protocol. All modern networks use OSPF, EIGRP, or BGP for dynamic routing. RIPv2 (classless) works for simple networks but scales poorly. OSPF is the dominant enterprise interior protocol; BGP handles all inter-domain (internet) routing.
      </Para>

      <Divider />

      {/* ──────────────────────────────────────────── CHAPTER 11 */}
      <Chapter n="11" title="Practical Subnetting: Enterprise Network Design" subtitle="Real allocation decisions, growth planning, and point-to-point addressing" />

      <StoryBox>
        A medium enterprise has 8 office sites, a data center, and AWS cloud presence. The network architect receives 10.0.0.0/8 from the RFC 1918 pool. Day 1 decision: how to allocate this. Option A — just start assigning /24s as needed: within 2 years there are 47 disconnected /24s across multiple second-octet ranges, no summarization possible, routing table at HQ has 47 entries for internal subnets, adding a new site requires checking all existing allocations for conflicts. Option B — hierarchical design: each site gets a /16 (sites 1–8: 10.1–10.8), data center gets 10.100.0.0/16, cloud gets 10.200.0.0/16, each floor/VLAN gets /24 from its site's /16. Site routers advertise one /16 each. HQ routing table has 10 entries for internal networks. Option B takes one afternoon to plan. Option A fixes cost months.
      </StoryBox>

      <H2>Enterprise Hierarchical Address Plan</H2>

      <CodeBlock title="Enterprise address plan — hierarchical allocation">
{`Organization: 10.0.0.0/8 (16.7M addresses)
│
├── Site 1 (HQ):           10.1.0.0/16  → advertises /16 to WAN
│   ├── VLAN 10 — Servers:   10.1.1.0/24   (static: .1–.50, DHCP: .100–.200)
│   ├── VLAN 20 — Users:     10.1.2.0/23   (DHCP pool: 510 hosts)
│   ├── VLAN 30 — VoIP:      10.1.4.0/24   (IP phones, DSCP EF)
│   ├── VLAN 40 — Guest:     10.1.5.0/24   (isolated, internet only)
│   ├── VLAN 50 — Mgmt:      10.1.6.0/27   (switches, APs, printers)
│   ├── VLAN 60 — DMZ:       10.1.7.0/28   (web servers, reverse proxies)
│   └── P2P links:           10.1.255.0/24 (carved into /31s: .0, .2, .4...)
│
├── Site 2 (Branch):       10.2.0.0/16  → advertises /16 to WAN
│   └── (same VLAN structure, different second octet)
│
├── Data Center:           10.100.0.0/16
│   ├── Production:          10.100.1.0/23
│   ├── Staging:             10.100.3.0/24
│   ├── Storage (iSCSI):     10.100.100.0/24
│   └── OOB management:      10.100.200.0/24
│
├── Cloud (AWS VPC):       10.200.0.0/16
│   └── (AZ subnets: 10.200.1.0/24, 10.200.2.0/24 per AZ)
│
└── Future expansion:      10.10.0.0/16 — 10.99.0.0/16 (reserved)`}
      </CodeBlock>

      <H2>Point-to-Point Link Addressing Strategy</H2>

      <Para>
        Every routed link between network devices requires addressing. Best practice is to carve these from a dedicated /24 block (e.g., 10.1.255.0/24) using /31 pairs. This keeps P2P link addresses separate from user/server ranges and simplifies ACLs (allow management access to 10.1.255.0/24 = allow access to all P2P link addresses at this site).
      </Para>

      <H2>Growth Planning: Subnet Utilization Thresholds</H2>

      <Para>
        Monitor subnet DHCP utilization. Common thresholds: alert at 70% (plan expansion), critical at 85% (expansion required), take action at 90%. When a DHCP scope is exhausted, no new devices can join the network without manual intervention. A /24 with 254 usable addresses that hits 90% means only ~25 addresses remain — a single team onboarding event can exhaust it.
      </Para>

      <Para>
        Re-addressing a subnet is expensive: DHCP scope change, gateway IP change (if migrating to a larger network), update all static assignments, update DNS reverse records, update firewall rules and ACLs referencing the old prefix. The cost of proactively using /23 instead of /24 at deployment is nearly zero; the cost of re-addressing 500 hosts 18 months later is enormous.
      </Para>

      <Divider />

      {/* ──────────────────────────────────────────── CHAPTER 12 */}
      <Chapter n="12" title="Subnetting Tools and Automation" subtitle="Python ipaddress module, ipcalc, and infrastructure-as-code subnet management" />

      <H2>Python — The ipaddress Module</H2>

      <CodeBlock title="Python ipaddress module — full capabilities">
{`import ipaddress

# Parse and analyze a network
net = ipaddress.IPv4Network('10.0.4.0/22', strict=True)
print(net.network_address)    # 10.0.4.0
print(net.broadcast_address)  # 10.0.7.255
print(net.netmask)            # 255.255.252.0
print(net.num_addresses)      # 1024
print(list(net.hosts())[0])   # 10.0.4.1 (first host)
print(list(net.hosts())[-1])  # 10.0.7.254 (last host)

# Check if an IP is in a network
ip = ipaddress.IPv4Address('10.0.5.100')
print(ip in net)              # True

# Subnet a /22 into /24s
for subnet in net.subnets(new_prefix=24):
    print(f"{subnet} — {subnet.num_addresses - 2} usable hosts")

# Supernet
a = ipaddress.IPv4Network('10.4.0.0/24')
b = ipaddress.IPv4Network('10.4.1.0/24')
c = ipaddress.IPv4Network('10.4.2.0/24')
d = ipaddress.IPv4Network('10.4.3.0/24')
summary = ipaddress.collapse_addresses([a, b, c, d])
print(list(summary))          # [IPv4Network('10.4.0.0/22')]

# Check overlap
x = ipaddress.IPv4Network('10.0.0.0/16')
y = ipaddress.IPv4Network('10.0.5.0/24')
print(x.overlaps(y))          # True (y is a subset of x)

# VLSM planning helper
def plan_vlsm(base: str, requirements: list[int]):
    pool = ipaddress.IPv4Network(base)
    available = list(pool.subnets(new_prefix=32))
    idx = 0
    for needed in sorted(requirements, reverse=True):
        bits = (needed + 2 - 1).bit_length()
        prefix = 32 - bits
        # align to block size
        block = 2 ** bits
        start_num = (idx // block + (1 if idx % block else 0)) * block
        subnet = ipaddress.IPv4Network(f"{available[start_num]}/{prefix}", strict=False)
        print(f"/{prefix} for {needed} hosts: {subnet}")
        idx = start_num + block`}
      </CodeBlock>

      <H2>CLI Tools</H2>

      <CodeBlock title="CLI subnetting utilities">
{`# Linux — ipcalc (human-readable breakdown)
ipcalc 192.168.10.0/26

# sipcalc — more detailed, supports VLSM planning
sipcalc -s 24 10.0.0.0/22          # shows all /24 subnets in a /22

# nmap network sweep (implicit subnet discovery)
nmap -sn 10.0.0.0/24               # ping sweep of /24

# Verify routing for specific destination
ip route get 10.5.100.50           # shows which subnet/interface handles this IP

# Show all subnets on a Linux host
ip addr show                        # all interfaces with prefix lengths
ip route show                       # all routes including connected subnets`}
      </CodeBlock>

      <Divider />

      {/* ──────────────────────────────────────────── CHAPTER 13 */}
      <Chapter n="13" title="Worked Practice Problems" subtitle="Five complete problems from CIDR basics to VLSM design — with full solutions" />

      <CodeBlock title="Practice problem set — complete solutions">
{`───────────────────────────────────────────────────────────────────
PROBLEM 1: Network identification
  Host: 172.16.200.130, Mask: 255.255.255.192
  Find: network, broadcast, first/last host, prefix

  /26 → block size 64.
  200 ÷ 64 = 3 remainder 8. Network = 3×64 = 192.
  Network:   172.16.200.192/26
  Broadcast: 172.16.200.255  (192 + 64 - 1)
  First:     172.16.200.193
  Last:      172.16.200.254
  Usable: 62 hosts

───────────────────────────────────────────────────────────────────
PROBLEM 2: Cross-octet subnet
  Host: 10.25.100.50, Prefix: /13
  Find: network and broadcast addresses.

  /13 → interesting octet: 2nd. Block in 2nd = 2^(16-13) = 8.
  2nd octet = 25. 25 ÷ 8 = 3 rem 1. Network 2nd octet = 3×8 = 24.
  Network:   10.24.0.0/13
  Broadcast: 10.31.255.255  (3rd and 4th octets all-1s, 2nd = 24+8-1=31)

───────────────────────────────────────────────────────────────────
PROBLEM 3: Number of subnets
  Network: 192.168.50.0/24 subnetted into /28.
  How many subnets? How many total addresses? Hosts per subnet?

  Bits borrowed = 28-24 = 4. Subnets = 2^4 = 16.
  Block = 16. Hosts per subnet = 16-2 = 14.
  Total addresses = 16×16 = 256 (= original /24 ✓)

───────────────────────────────────────────────────────────────────
PROBLEM 4: VLSM design
  Given: 172.20.0.0/24
  Requirements: LAN A: 100 hosts, LAN B: 50 hosts, LAN C: 25 hosts,
  WAN link 1: 2 hosts, WAN link 2: 2 hosts.

  LAN A: 100+2=102 → 2^7=128 → /25.  Block 128. → 172.20.0.0/25
  LAN B:  50+2=52  → 2^6=64  → /26.  Block  64. → 172.20.0.128/26
  LAN C:  25+2=27  → 2^5=32  → /27.  Block  32. → 172.20.0.192/27
  WAN 1:   2+2=4   → 2^2=4   → /30.  Block   4. → 172.20.0.224/30
  WAN 2:   2+2=4   → 2^2=4   → /30.  Block   4. → 172.20.0.228/30
  Remaining: 172.20.0.232 – 172.20.0.255 (24 addresses for future)

───────────────────────────────────────────────────────────────────
PROBLEM 5: Route summarization
  Networks: 192.168.32.0/24, 192.168.33.0/24, 192.168.34.0/24, 192.168.35.0/24
  Can they be summarized? If yes, what is the summary prefix?

  3rd octet binary: 32=00100000, 33=00100001, 34=00100010, 35=00100011
  Common bits: 001000xx — 6 common bits.
  Summary prefix: 16 + 6 = /22. Summary: 192.168.32.0/22.
  Verify: block = 1024. 32.0 → 35.255 = exactly 4×256=1024 addresses. ✓
  All four /24s are contiguous and the block starts at /22-aligned boundary
  (32 is a multiple of 4 in the 3rd octet for a /22). ✓`}
      </CodeBlock>

      <Divider />

      {/* ──────────────────────────────────────────── CHAPTER 14 */}
      <Chapter n="14" title="Common Misconceptions" subtitle="Subnetting errors that appear in production and in interviews" />

      <Err title="A larger prefix number means a larger network">
        Prefix length and network size are inversely related. /24 is larger than /28. /16 is larger than /24. The prefix number counts network bits — more network bits means fewer host bits means a smaller subnet. When someone says "I need a bigger subnet," they mean a smaller prefix number (e.g., change /25 to /24 to double the host space). The confusion often comes from everyday language where "bigger number = more" — in subnetting it's the opposite for the prefix count.
      </Err>

      <Err title="Subnets can start at any convenient address">
        Subnet boundaries must be aligned to their block size. A /26 (block 64) must start at a multiple of 64: 0, 64, 128, or 192. A /27 (block 32) at multiples of 32. If you configure a subnet at a non-boundary address (e.g., 192.168.1.70/26), the router calculates the network address as 192.168.1.64 (ANDing .70 with the /26 mask) — your configured "network" address is wrong. This causes routing failures where the router silently forwards or drops packets based on the correctly-calculated subnet, not your intended one.
      </Err>

      <Err title="The network and broadcast addresses are wasted due to poor design">
        The reservation of network and broadcast addresses is intrinsic to the subnet model, not a design flaw. The network address identifies the subnet in routing entries. The broadcast address is used for subnet-wide Layer 2 broadcast delivery (ARP, DHCP, OSPF hello on broadcast networks). These serve real purposes. RFC 3021 /31s only eliminate them for point-to-point links specifically because P2P links have no use for broadcast — it's a special case opt-in, not evidence of a general waste.
      </Err>

      <Err title="VLSM requires special hardware or configuration">
        VLSM is purely a design and protocol concept. Any modern router and any classless routing protocol (OSPF, EIGRP, RIPv2, BGP) supports VLSM — these protocols include subnet mask information in routing updates. The router hardware doesn't need to know or care. Only classful protocols (RIPv1, IGRP — both obsolete since the early 2000s) are incompatible with VLSM. Every production network deployed today uses VLSM.
      </Err>

      <Err title="Discontinuous subnets can always be summarized if they share some bits">
        Summarization requires contiguous address space and an exact coverage boundary. 192.168.8.0/24 and 192.168.10.0/24 share bits but are not contiguous — 192.168.9.0/24 is the gap. A summary 192.168.8.0/22 would cover .8, .9, .10, .11 — but you don't own .9 and .11. Advertising that summary claims address space you don't control, potentially causing other organizations' traffic to be routed to you and dropped. Always verify that a candidate summary route covers exactly your address space and nothing more.
      </Err>

      <Err title="AWS /24 subnets give 254 usable hosts like normal subnets">
        AWS reserves 5 addresses per subnet (network, router, DNS, future, broadcast) compared to the standard 2 (network, broadcast). A /24 in AWS provides 256 − 5 = 251 usable addresses, not 254. For smaller subnets the impact is proportionally larger: a /28 (16 total, standard = 14 usable) becomes 16 − 5 = 11 usable in AWS. This matters when provisioning subnets for services that need a specific minimum host count. The AWS minimum subnet size is /28.
      </Err>

      <Divider />

      {/* ──────────────────────────────────────────── CHAPTER 15 */}
      <Chapter n="15" title="Interview Questions" subtitle="What network engineering interviews actually test about subnetting" />

      <IQ q="How many subnets and hosts per subnet does /27 create from a /24?" level="Beginner">
        Bits borrowed = 27 − 24 = 3. Subnets = 2³ = 8. Host bits remaining = 32 − 27 = 5. Hosts per subnet = 2⁵ − 2 = 30. Block size = 32. Subnet mask = 255.255.255.224. Boundaries in 4th octet: 0, 32, 64, 96, 128, 160, 192, 224.
      </IQ>

      <IQ q="A host has IP 192.168.50.130/26. What is its network address, broadcast, and usable range?" level="Beginner">
        /26 → block 64. 130 ÷ 64 = 2, rem 2. Network = 2 × 64 = 128. Network address: 192.168.50.128/26. Broadcast: 192.168.50.128 + 64 − 1 = 192.168.50.191. First host: .129. Last host: .190. Usable hosts: 62.
      </IQ>

      <IQ q="Explain VLSM and design a subnet scheme for: 100 hosts, 50 hosts, 25 hosts, and 2 point-to-point router links. Base network: 192.168.0.0/24." level="Intermediate">
        VLSM uses different prefix lengths for different subnets to match actual host requirements. Allocate largest first: 100 hosts → /25 (126 usable), 50 hosts → /26 (62 usable), 25 hosts → /27 (30 usable), each P2P link → /30 (2 usable). Allocation: 192.168.0.0/25 (100-host LAN, .1–.126), 192.168.0.128/26 (50-host LAN, .129–.190), 192.168.0.192/27 (25-host LAN, .193–.222), 192.168.0.224/30 (link A, .225–.226), 192.168.0.228/30 (link B, .229–.230). Total: 128+64+32+4+4 = 232 of 256 addresses. Remaining: 192.168.0.232–.255 (24 addresses for future).
      </IQ>

      <IQ q="How do you find the summary route for 4 contiguous /24s: 10.4.0.0, 10.4.1.0, 10.4.2.0, 10.4.3.0?" level="Intermediate">
        Write the 3rd octet in binary: 0=00000000, 1=00000001, 2=00000010, 3=00000011. The last 2 bits differ; the first 6 bits (000000) agree. Total prefix = 16 + 6 = /22. Summary: 10.4.0.0/22. Verification: block size for /22 is 2^10 = 1024. Starting at 10.4.0.0, the /22 covers 10.4.0.0–10.4.3.255 = exactly the four /24s. The starting address (0 in the 3rd octet) is a multiple of 4, satisfying /22 boundary alignment.
      </IQ>

      <IQ q="Design a multi-site enterprise address plan using 10.0.0.0/8 that enables route summarization at each layer. Support 16 sites, each with up to 16 buildings, each with up to 16 VLANs." level="Senior">
        Three-level hierarchy: (1) Site level: allocate 16 sites from /8 using /12 blocks (2^(12-8) = 16 allocations). Site 1 = 10.0.0.0/12, Site 2 = 10.16.0.0/12 … Site 16 = 10.240.0.0/12. Each site router advertises one /12 to the WAN. (2) Building level: each site's /12 divided into /16 per building (2^(16-12) = 16 buildings per site). Site 1 Building 1 = 10.0.0.0/16, Building 2 = 10.1.0.0/16. Each building distribution switch advertises one /16 to the site router. (3) VLAN level: each /16 divided into /20 per VLAN cluster (2^(20-16) = 16 VLANs per building). 10.0.0.0/20 = VLAN cluster 1 (containing /24 subnets 10.0.0.0–10.0.15.255). Core routing sees at most 16 summary routes (one per site). Site sees at most 16 (one per building). Result: WAN routing table has 16 entries total for all internal traffic; adding a new VLAN anywhere adds zero entries to the WAN routing table.
      </IQ>

      <IQ q="Why does VLSM require classless routing protocols, and what breaks if you use RIPv1 with VLSM subnets?" level="PhD">
        Classless routing protocols include subnet mask information in every routing update (OSPF LSAs, EIGRP DUAL updates, BGP NLRI). This allows each subnet with a different prefix length to be advertised independently and correctly. RIPv1 (classful) omits mask information from updates — when a router receives "update for 10.1.0.0," it has no mask, so it assumes the Class A default (/8). All subnets of 10.0.0.0/8 collapse to one entry. The router believes all of 10.0.0.0/8 is reachable via this one update — but it cannot distinguish between 10.1.0.0/16, 10.2.0.0/24, and 10.3.0.0/30. Traffic destined for 10.3.0.1 routes to the right next-hop (10.0.0.0/8 matches), but once it arrives at the subnet edge, the router knows 10.3.0.0/30 (from its directly connected interface) but sent a classful /8 update outward — so remote routers have no specific route. Result: routing loops, unreachable subnets, or traffic blackholed at the wrong boundary. RIPv2 (1993) added mask fields to updates, enabling VLSM. OSPF has always been classless. This is why RIPv1 and IGRP were obsoleted — they are structurally incompatible with modern variable-length subnet design.
      </IQ>

      <KeyTakeaways items={[
        'Subnetting borrows bits from the host portion: each borrowed bit doubles subnet count and halves host count. Block size = 2^(host bits) — all subnet boundaries are multiples of the block size.',
        'Mental method: (1) find prefix from host count; (2) identify interesting octet; (3) block size in that octet = 2^(bits left); (4) network = (interesting octet ÷ block) × block.',
        'The four-step method works for any prefix — /26 in 4th octet, /20 in 3rd octet, /12 in 2nd octet. The approach is identical; only the interesting octet changes.',
        'VLSM allocates different prefix lengths to different subnets — always largest first to avoid alignment conflicts. Alignment rule: subnet start address must be divisible by block size.',
        'Route summarization requires contiguous address space at an aligned boundary — discontinuous networks cannot be summarized without advertising address space you don\'t own.',
        '/30 is the classical P2P link subnet (2 usable hosts); /31 (RFC 3021) eliminates network/broadcast for P2P, saving 2 addresses per link; /32 is a host route for loopbacks.',
        'IPv6 uses fixed /64 per LAN (SLAAC requires it), /127 for P2P, /128 for loopbacks. A /48 allocation provides 65,536 /64 subnets — more than any organization will ever need.',
        'AWS reserves 5 addresses per subnet (not 2), so a /24 gives 251 usable hosts. Kubernetes pod and service CIDRs must not overlap each other or the node/VPC network.',
        'VLSM requires classless routing protocols (OSPF, EIGRP, RIPv2, BGP). RIPv1 and IGRP are classful — they omit subnet masks from updates and cannot distinguish VLSM subnets.',
        'Hierarchical address planning enables route summarization: sites advertise /16 summaries to WAN, buildings advertise /20 to site — scaling to thousands of subnets with tens of routing table entries.',
      ]} />
    </LearnLayout>
  )
}
