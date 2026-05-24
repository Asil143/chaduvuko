'use client'

import { useState } from 'react'
import { LearnLayout } from '@/components/content/LearnLayout'
import { KeyTakeaways } from '@/components/content/KeyTakeaways'

/* ── helper components ─────────────────────────────────────────────── */
const G = '#10b981'

const Chapter = ({ n, title }: { n: number; title: string }) => (
  <div style={{ marginBottom: 32 }}>
    <p style={{ fontSize: 11, color: G, fontFamily: 'var(--font-mono)', fontWeight: 700, margin: '0 0 6px', letterSpacing: '.12em', textTransform: 'uppercase' }}>
      Chapter {String(n).padStart(2, '0')}
    </p>
    <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(22px,3.5vw,34px)', fontWeight: 900, letterSpacing: '-1.5px', color: 'var(--text)', margin: 0 }}>{title}</h2>
  </div>
)

const Divider = () => <div style={{ borderTop: '1px solid var(--border)', margin: '56px 0' }} />

const Para = ({ children }: { children: React.ReactNode }) => (
  <p style={{ fontSize: 15, color: 'var(--text)', lineHeight: 1.95, margin: '0 0 20px' }}>{children}</p>
)

const H2 = ({ children }: { children: React.ReactNode }) => (
  <h3 style={{ fontSize: 18, fontWeight: 800, color: 'var(--text)', margin: '36px 0 14px', letterSpacing: '-0.5px' }}>{children}</h3>
)

const H3 = ({ children }: { children: React.ReactNode }) => (
  <h4 style={{ fontSize: 15, fontWeight: 700, color: 'var(--text)', margin: '28px 0 10px' }}>{children}</h4>
)

const Accent = ({ children }: { children: React.ReactNode }) => (
  <strong style={{ color: G, fontWeight: 700 }}>{children}</strong>
)

const Code = ({ children }: { children: React.ReactNode }) => (
  <code style={{ fontSize: 13, background: `${G}15`, color: G, padding: '2px 7px', borderRadius: 5, fontFamily: 'var(--font-mono)' }}>{children}</code>
)

const CodeBlock = ({ children }: { children: React.ReactNode }) => (
  <pre style={{ background: '#0a0a0a', border: '1px solid #1f2937', borderRadius: 10, padding: '18px 20px', overflowX: 'auto', fontSize: 13, lineHeight: 1.75, color: '#e5e7eb', margin: '20px 0', fontFamily: 'var(--font-mono)' }}>
    {children}
  </pre>
)

const StoryBox = ({ children }: { children: React.ReactNode }) => (
  <div style={{ background: 'linear-gradient(135deg,#0f2027,#203a43,#2c5364)', border: `1px solid ${G}30`, borderRadius: 12, padding: '20px 24px', margin: '28px 0', position: 'relative', overflow: 'hidden' }}>
    <div style={{ position: 'absolute', top: 12, right: 16, fontSize: 22, opacity: 0.18 }}>📖</div>
    <p style={{ fontSize: 11, fontWeight: 700, color: G, fontFamily: 'var(--font-mono)', textTransform: 'uppercase', letterSpacing: '.12em', margin: '0 0 10px' }}>Story</p>
    <div style={{ fontSize: 14, color: '#d1fae5', lineHeight: 1.9 }}>{children}</div>
  </div>
)

const WowBox = ({ children }: { children: React.ReactNode }) => (
  <div style={{ background: 'linear-gradient(135deg,#1c1917,#292524)', border: '1px solid #f59e0b30', borderRadius: 12, padding: '20px 24px', margin: '28px 0', position: 'relative' }}>
    <div style={{ position: 'absolute', top: 12, right: 16, fontSize: 22, opacity: 0.25 }}>⚡</div>
    <p style={{ fontSize: 11, fontWeight: 700, color: '#f59e0b', fontFamily: 'var(--font-mono)', textTransform: 'uppercase', letterSpacing: '.12em', margin: '0 0 10px' }}>Wow Factor</p>
    <div style={{ fontSize: 14, color: '#fef3c7', lineHeight: 1.9 }}>{children}</div>
  </div>
)

const Warn = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <div style={{ background: '#f59e0b08', border: '1px solid #f59e0b35', borderRadius: 10, padding: '16px 20px', margin: '24px 0' }}>
    <p style={{ fontSize: 11, fontWeight: 700, color: '#f59e0b', fontFamily: 'var(--font-mono)', textTransform: 'uppercase', letterSpacing: '.1em', margin: '0 0 8px' }}>Caution — {title}</p>
    <div style={{ fontSize: 14, color: 'var(--text)', lineHeight: 1.85 }}>{children}</div>
  </div>
)

const Err = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <div style={{ background: '#ef444408', border: '1px solid #ef444430', borderRadius: 10, padding: '16px 20px', margin: '24px 0' }}>
    <p style={{ fontSize: 11, fontWeight: 700, color: '#ef4444', fontFamily: 'var(--font-mono)', textTransform: 'uppercase', letterSpacing: '.1em', margin: '0 0 8px' }}>Misconception — {title}</p>
    <div style={{ fontSize: 14, color: 'var(--text)', lineHeight: 1.85 }}>{children}</div>
  </div>
)

const LEVEL_COLORS: Record<string, string> = {
  Beginner: '#10b981',
  Intermediate: '#3b82f6',
  Senior: '#8b5cf6',
  PhD: '#f97316',
}

const IQ = ({ q, level, children }: { q: string; level: 'Beginner' | 'Intermediate' | 'Senior' | 'PhD'; children: React.ReactNode }) => (
  <div style={{ marginBottom: 32 }}>
    <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 0 }}>
      <span style={{ fontSize: 10, fontWeight: 700, color: '#000', background: LEVEL_COLORS[level], padding: '2px 9px', borderRadius: 20, letterSpacing: '.06em', textTransform: 'uppercase', flexShrink: 0 }}>{level}</span>
      <div style={{ background: `${LEVEL_COLORS[level]}12`, border: `1px solid ${LEVEL_COLORS[level]}30`, borderRadius: '0 8px 0 0', padding: '12px 16px', fontSize: 14, fontWeight: 700, color: 'var(--text)', flex: 1 }}>Q: {q}</div>
    </div>
    <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderTop: 'none', borderRadius: '0 0 8px 8px', padding: '16px 18px', fontSize: 14, color: 'var(--text)', lineHeight: 1.9 }}>{children}</div>
  </div>
)

/* ── helper functions ──────────────────────────────────────────────── */
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

/* ── interactive components ────────────────────────────────────────── */

function SubnetCalculator() {
  const [baseIP, setBaseIP] = useState('10.0.0.0')
  const [prefix, setPrefix] = useState(16)
  const [subPrefix, setSubPrefix] = useState(24)

  const octets = parseIP(baseIP)
  const valid = octets !== null && prefix >= 1 && prefix <= 30 && subPrefix > prefix && subPrefix <= 30

  let subnets: { net: string; broadcast: string; first: string; last: string; hosts: number }[] = []
  let subnetCount = 0
  let hostsPerSubnet = 0
  let subnetMask = ''

  if (valid && octets) {
    const mask = cidrToMask(prefix)
    const netNum = (ipToNum(octets) & ipToNum(mask)) >>> 0
    subnetCount = 1 << (subPrefix - prefix)
    hostsPerSubnet = (1 << (32 - subPrefix)) - 2
    subnetMask = cidrToMask(subPrefix).join('.')

    const maxShow = Math.min(subnetCount, 8)
    const subSize = 1 << (32 - subPrefix)
    for (let i = 0; i < maxShow; i++) {
      const subNet = (netNum + i * subSize) >>> 0
      const broadcast = (subNet + subSize - 1) >>> 0
      subnets.push({
        net: numToIP(subNet),
        broadcast: numToIP(broadcast),
        first: numToIP(subNet + 1),
        last: numToIP(broadcast - 1),
        hosts: hostsPerSubnet,
      })
    }
  }

  return (
    <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 14, padding: 24, margin: '32px 0' }}>
      <p style={{ fontSize: 13, fontWeight: 700, color: G, fontFamily: 'var(--font-mono)', margin: '0 0 4px', textTransform: 'uppercase', letterSpacing: '.1em' }}>Interactive — Subnet Calculator</p>
      <p style={{ fontSize: 12, color: 'var(--muted)', margin: '0 0 20px' }}>Enter a base network and choose a subnet prefix to see how subnetting divides the address space.</p>

      <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginBottom: 20, alignItems: 'flex-end' }}>
        <div>
          <label style={{ fontSize: 12, color: 'var(--muted)', display: 'block', marginBottom: 4 }}>Base Network</label>
          <input value={baseIP} onChange={e => setBaseIP(e.target.value)}
            style={{ background: 'var(--bg)', border: `1px solid ${valid ? 'var(--border)' : '#ef4444'}`, borderRadius: 6, padding: '7px 12px', color: G, fontSize: 14, fontFamily: 'var(--font-mono)', width: 150 }} />
        </div>
        <div>
          <label style={{ fontSize: 12, color: 'var(--muted)', display: 'block', marginBottom: 4 }}>Original /{prefix}</label>
          <input type="range" min={8} max={28} value={prefix} onChange={e => { setPrefix(Number(e.target.value)); if (subPrefix <= Number(e.target.value)) setSubPrefix(Number(e.target.value) + 2) }}
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
              { label: 'Subnet Count', value: subnetCount.toLocaleString(), color: '#3b82f6' },
              { label: 'Hosts Per Subnet', value: hostsPerSubnet.toLocaleString(), color: G },
              { label: 'Subnet Mask', value: subnetMask, color: '#8b5cf6' },
              { label: 'Bits Borrowed', value: String(subPrefix - prefix), color: '#f59e0b' },
            ].map(item => (
              <div key={item.label} style={{ background: 'var(--bg)', border: '1px solid var(--border)', borderRadius: 8, padding: '8px 14px' }}>
                <div style={{ fontSize: 11, color: 'var(--muted)' }}>{item.label}</div>
                <div style={{ fontSize: 14, fontWeight: 700, color: item.color, fontFamily: 'var(--font-mono)' }}>{item.value}</div>
              </div>
            ))}
          </div>

          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 12, fontFamily: 'var(--font-mono)' }}>
              <thead>
                <tr style={{ background: `${G}15` }}>
                  {['#', 'Network', 'Broadcast', 'First Host', 'Last Host', 'Hosts'].map(h => (
                    <th key={h} style={{ padding: '8px 12px', textAlign: 'left', color: G, fontWeight: 700, fontSize: 11, textTransform: 'uppercase' }}>{h}</th>
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
                    <td colSpan={6} style={{ padding: '8px 12px', color: 'var(--muted)', textAlign: 'center', fontStyle: 'italic' }}>
                      ... {(subnetCount - 8).toLocaleString()} more subnets not shown
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </>
      )}

      {!valid && (
        <div style={{ background: '#ef444410', border: '1px solid #ef444430', borderRadius: 8, padding: 12 }}>
          <p style={{ fontSize: 13, color: '#ef4444', margin: 0 }}>Invalid input. Ensure subnet prefix is larger than original prefix (max /30).</p>
        </div>
      )}
    </div>
  )
}

function VLSMPlanner() {
  type Requirement = { name: string; needed: number; prefix: number; allocated: string; hosts: number }

  const BASE = '192.168.0.0'
  const BASE_PREFIX = 22

  const requirements: Requirement[] = [
    { name: 'Engineering', needed: 120, prefix: 25, allocated: '192.168.0.0/25', hosts: 126 },
    { name: 'Sales', needed: 60, prefix: 26, allocated: '192.168.0.128/26', hosts: 62 },
    { name: 'Servers', needed: 30, prefix: 27, allocated: '192.168.0.192/27', hosts: 30 },
    { name: 'HR', needed: 14, prefix: 28, allocated: '192.168.0.224/28', hosts: 14 },
    { name: 'Management', needed: 6, prefix: 29, allocated: '192.168.0.240/29', hosts: 6 },
    { name: 'Router links', needed: 2, prefix: 30, allocated: '192.168.0.248/30', hosts: 2 },
  ]

  const [selected, setSelected] = useState<string | null>(null)
  const sel = requirements.find(r => r.name === selected)

  return (
    <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 14, padding: 24, margin: '32px 0' }}>
      <p style={{ fontSize: 13, fontWeight: 700, color: G, fontFamily: 'var(--font-mono)', margin: '0 0 4px', textTransform: 'uppercase', letterSpacing: '.1em' }}>Interactive — VLSM Planner</p>
      <p style={{ fontSize: 12, color: 'var(--muted)', margin: '0 0 4px' }}>Base network: {BASE}/{BASE_PREFIX} (1022 addresses). Allocated efficiently using VLSM — largest to smallest.</p>
      <p style={{ fontSize: 12, color: 'var(--muted)', margin: '0 0 20px' }}>Click a subnet to see allocation details.</p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
        <div style={{ display: 'grid', gridTemplateColumns: '100px 80px 80px 160px 60px', padding: '8px 12px', background: `${G}15`, borderRadius: '8px 8px 0 0', fontSize: 11, fontWeight: 700, color: G, fontFamily: 'var(--font-mono)', textTransform: 'uppercase', gap: 0 }}>
          <span>Department</span><span>Needed</span><span>Prefix</span><span>Allocated</span><span>Hosts</span>
        </div>
        {requirements.map((r, i) => (
          <div key={r.name} onClick={() => setSelected(selected === r.name ? null : r.name)}
            style={{ display: 'grid', gridTemplateColumns: '100px 80px 80px 160px 60px', padding: '10px 12px', background: selected === r.name ? `${G}12` : i % 2 === 0 ? 'var(--bg)' : 'var(--surface)', border: `1px solid ${selected === r.name ? G : 'var(--border)'}`, borderTop: i === 0 ? '1px solid var(--border)' : 'none', borderRadius: i === requirements.length - 1 ? '0 0 8px 8px' : 0, cursor: 'pointer', transition: 'all .15s', alignItems: 'center', gap: 0 }}>
            <span style={{ fontSize: 13, fontWeight: 700, color: selected === r.name ? G : 'var(--text)' }}>{r.name}</span>
            <span style={{ fontSize: 12, color: 'var(--muted)', fontFamily: 'var(--font-mono)' }}>{r.needed}</span>
            <span style={{ fontSize: 12, fontWeight: 700, color: G, fontFamily: 'var(--font-mono)' }}>/{r.prefix}</span>
            <code style={{ fontSize: 12, color: G, fontFamily: 'var(--font-mono)' }}>{r.allocated}</code>
            <span style={{ fontSize: 12, color: '#f59e0b', fontFamily: 'var(--font-mono)' }}>{r.hosts}</span>
          </div>
        ))}
      </div>

      {sel && (
        <div style={{ marginTop: 12, background: `${G}10`, border: `1px solid ${G}30`, borderRadius: 8, padding: 14 }}>
          <p style={{ fontSize: 13, fontWeight: 700, color: G, margin: '0 0 6px' }}>{sel.name} — {sel.allocated}</p>
          <p style={{ fontSize: 13, color: 'var(--text)', margin: 0 }}>
            Needed: {sel.needed} hosts. Smallest prefix that fits: /{sel.prefix} (2^{32 - sel.prefix} - 2 = {sel.hosts} usable hosts).
            Waste: {sel.hosts - sel.needed} addresses. VLSM assigns the largest subnets first, then fits smaller departments into the remaining space.
          </p>
        </div>
      )}

      <div style={{ marginTop: 16, padding: '12px 16px', background: 'var(--bg)', borderRadius: 8, border: '1px solid var(--border)' }}>
        <p style={{ fontSize: 12, color: 'var(--muted)', margin: 0 }}>
          Total allocated: {requirements.reduce((s, r) => s + (1 << (32 - r.prefix)), 0)} addresses out of {1 << (32 - BASE_PREFIX)} available. Remaining space: {(1 << (32 - BASE_PREFIX)) - requirements.reduce((s, r) => s + (1 << (32 - r.prefix)), 0)} addresses (192.168.0.252/30 onwards).
        </p>
      </div>
    </div>
  )
}

function SubnetQuiz() {
  const questions = [
    { q: '192.168.5.200/26 — what is the network address?', answer: '192.168.5.192', options: ['192.168.5.0', '192.168.5.192', '192.168.5.200', '192.168.5.128'], explain: '/26 = mask 255.255.255.192. 200 in binary = 11001000. AND with 11000000 = 11000000 = 192. Network: 192.168.5.192' },
    { q: '10.10.10.0/28 — how many usable host addresses?', answer: '14', options: ['14', '16', '30', '32'], explain: '/28 host bits = 32-28 = 4. Total addresses = 2^4 = 16. Usable = 16 - 2 = 14.' },
    { q: 'Are 172.16.5.10/24 and 172.16.6.10/24 in the same subnet?', answer: 'No', options: ['Yes', 'No'], explain: 'A /24 uses the first 24 bits. 172.16.5 vs 172.16.6 — the third octet differs. They are in different /24 subnets.' },
    { q: 'What is the broadcast address of 10.0.4.0/22?', answer: '10.0.7.255', options: ['10.0.4.255', '10.0.7.255', '10.0.3.255', '10.0.5.255'], explain: '/22 = host bits = 10. Block size = 2^10 = 1024. Network 10.0.4.0. Broadcast = 10.0.4.0 + 1023 = 10.0.7.255.' },
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
    if (current < questions.length - 1) {
      setCurrent(c => c + 1)
      setSelected(null)
    } else {
      setDone(true)
    }
  }

  const reset = () => { setCurrent(0); setSelected(null); setScore(0); setDone(false) }

  return (
    <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 14, padding: 24, margin: '32px 0' }}>
      <p style={{ fontSize: 13, fontWeight: 700, color: G, fontFamily: 'var(--font-mono)', margin: '0 0 4px', textTransform: 'uppercase', letterSpacing: '.1em' }}>Interactive — Subnetting Quiz</p>
      <p style={{ fontSize: 12, color: 'var(--muted)', margin: '0 0 20px' }}>Test your mental subnetting skills — no calculator needed.</p>

      {!done ? (
        <>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 16 }}>
            <span style={{ fontSize: 12, color: 'var(--muted)' }}>Question {current + 1} / {questions.length}</span>
            <span style={{ fontSize: 12, color: G }}>Score: {score}</span>
          </div>
          <p style={{ fontSize: 15, fontWeight: 700, color: 'var(--text)', margin: '0 0 16px' }}>{q.q}</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 16 }}>
            {q.options.map(opt => {
              let bg = 'var(--bg)'
              let border = 'var(--border)'
              let color = 'var(--text)'
              if (selected !== null) {
                if (opt === q.answer) { bg = `${G}15`; border = G; color = G }
                else if (opt === selected && opt !== q.answer) { bg = '#ef444412'; border = '#ef4444'; color = '#ef4444' }
              }
              return (
                <div key={opt} onClick={() => handleSelect(opt)}
                  style={{ padding: '10px 16px', background: bg, border: `2px solid ${border}`, borderRadius: 8, cursor: selected === null ? 'pointer' : 'default', color, fontSize: 14, fontFamily: 'var(--font-mono)', fontWeight: opt === q.answer && selected !== null ? 700 : 400, transition: 'all .1s' }}>
                  {opt}
                </div>
              )
            })}
          </div>
          {selected !== null && (
            <div style={{ background: isCorrect ? `${G}10` : '#ef444410', border: `1px solid ${isCorrect ? G : '#ef4444'}30`, borderRadius: 8, padding: 12, marginBottom: 14 }}>
              <p style={{ fontSize: 13, color: isCorrect ? G : '#ef4444', margin: '0 0 4px', fontWeight: 700 }}>
                {isCorrect ? 'Correct!' : 'Incorrect.'}
              </p>
              <p style={{ fontSize: 13, color: 'var(--text)', margin: 0 }}>{q.explain}</p>
            </div>
          )}
          {selected !== null && (
            <button onClick={next} style={{ background: G, color: '#000', border: 'none', borderRadius: 6, padding: '8px 18px', fontSize: 13, fontWeight: 700, cursor: 'pointer' }}>
              {current < questions.length - 1 ? 'Next Question' : 'Finish'}
            </button>
          )}
        </>
      ) : (
        <div style={{ textAlign: 'center', padding: '20px 0' }}>
          <p style={{ fontSize: 32, fontWeight: 900, color: score >= 3 ? G : '#f59e0b', margin: '0 0 8px' }}>{score}/{questions.length}</p>
          <p style={{ fontSize: 14, color: 'var(--muted)', margin: '0 0 20px' }}>
            {score === 4 ? 'Perfect! You can subnet in your head.' : score >= 3 ? 'Strong subnetting skills.' : score >= 2 ? 'Good foundation — keep practicing.' : 'Review the binary method and try again.'}
          </p>
          <button onClick={reset} style={{ background: G, color: '#000', border: 'none', borderRadius: 6, padding: '8px 20px', fontSize: 13, fontWeight: 700, cursor: 'pointer' }}>Try Again</button>
        </div>
      )}
    </div>
  )
}

/* ── main module ───────────────────────────────────────────────────── */

export default function SubnettingModule() {
  return (
    <LearnLayout
      title="Subnetting"
      description="The craft of dividing IP address space into precisely sized networks. From exam questions to production network design — subnetting is the single most tested skill in network engineering."
      section="Networking Fundamentals — Module 14"
      readTime="28–40 min"
      updatedAt="May 2026"
    >
      {/* ── Chapter 1 ── */}
      <Chapter n={1} title="Why Subnetting Exists" />

      <StoryBox>
        Before subnetting, a company received a single Class B address (e.g., 172.16.0.0/16) and all 65,534 hosts were on one flat network — one massive broadcast domain. Every ARP request, every DHCP discover, every NetBIOS broadcast was sent to all 65,534 devices simultaneously. By 1985, networks with more than a few hundred hosts were functionally unusable under broadcast load. Dr. Jeff Mogul at Stanford published RFC 917 in 1984, proposing subnetting: take the single large address block and subdivide it into smaller, manageable networks. One /16 becomes 256 /24 subnets, each a separate broadcast domain. Broadcast traffic stays within the /24. Routers separate the subnets. The network becomes manageable.
      </StoryBox>

      <Para>
        <Accent>Subnetting</Accent> is the process of dividing a larger IP network into smaller sub-networks (subnets). This is achieved by extending the network portion of the address — borrowing bits from the host portion to create more networks with fewer hosts each.
      </Para>

      <Para>
        The motivations for subnetting are multiple and compounding. <Accent>Broadcast control:</Accent> smaller subnets mean smaller broadcast domains — fewer devices receive each broadcast frame, reducing noise and improving performance. <Accent>Security segmentation:</Accent> routers between subnets create natural enforcement points for access control policies. <Accent>Address conservation:</Accent> instead of allocating a /24 to a 10-device network, use a /28 (14 hosts) and conserve the remaining addresses for other uses. <Accent>Routing efficiency:</Accent> hierarchical subnetting enables route summarization, reducing routing table sizes.
      </Para>

      <WowBox>
        Network engineers who can subnet quickly in their heads — without calculators — are highly valued in interviews and production environments. The skill isn't about memorizing formulas; it's about understanding binary. Once you see that "borrowing 2 bits" creates 4 subnets (2^2), or that a /27 has 32 addresses (2^5) and 30 usable hosts, everything else follows from first principles. The interview question "subnet this network" is testing whether you understand bits, not whether you've memorized tables.
      </WowBox>

      <Divider />

      {/* ── Chapter 2 ── */}
      <Chapter n={2} title="The Subnetting Mechanics" />

      <H2>Borrowing Bits from the Host Portion</H2>

      <Para>
        Given a /24 network (192.168.1.0/24), the first 24 bits are the network portion and the last 8 bits are the host portion. To create subnets, we "borrow" bits from the left of the host portion. Each borrowed bit doubles the number of subnets:
      </Para>

      <CodeBlock>
{`Original /24:  11000000.10101000.00000001 | 00000000
                ←────── 24 network bits ─────→ ←8 host→

Borrow 1 bit:  11000000.10101000.00000001.0 | 0000000  → /25 (2 subnets, 126 hosts each)
Borrow 2 bits: 11000000.10101000.00000001.00 | 000000  → /26 (4 subnets, 62 hosts each)
Borrow 3 bits: 11000000.10101000.00000001.000 | 00000  → /27 (8 subnets, 30 hosts each)
Borrow 4 bits: 11000000.10101000.00000001.0000 | 0000  → /28 (16 subnets, 14 hosts each)
Borrow 5 bits: 11000000.10101000.00000001.00000 | 000  → /29 (32 subnets, 6 hosts each)
Borrow 6 bits: 11000000.10101000.00000001.000000 | 00  → /30 (64 subnets, 2 hosts each)
Borrow 7 bits: 11000000.10101000.00000001.0000000 | 0  → /31 (RFC 3021 point-to-point, 0 hosts)
Borrow 8 bits: all host bits used for network — no hosts possible`}
      </CodeBlock>

      <H2>The Core Formula</H2>

      <Para>
        Given a network with prefix /n that you want to subnet into /{'{'}n+k{'}'} subnets:
      </Para>

      <Para>
        <Accent>Number of subnets</Accent> = 2^k (where k is the number of bits borrowed)
      </Para>

      <Para>
        <Accent>Hosts per subnet</Accent> = 2^(32 - n - k) - 2 = 2^(remaining host bits) - 2
      </Para>

      <Para>
        <Accent>Block size</Accent> (address count per subnet) = 2^(32 - n - k) = hosts per subnet + 2
      </Para>

      <Para>
        The "block size" is the most useful mental shortcut. For a /26 subnet (block size = 2^6 = 64), subnets start at multiples of 64: 0, 64, 128, 192. For a /27 (block size 32): 0, 32, 64, 96, 128, 160, 192, 224.
      </Para>

      <H2>The Subnet Mask Relationship</H2>

      <Para>
        The subnet mask is always 255 in octets fully covered by the prefix, and in the "interesting octet" (the octet where the prefix boundary falls), it equals 256 minus the block size.
      </Para>

      <Para>
        Example: /26 prefix. The first two octets are fully 255 (network portion). The third octet is 255. The fourth octet has 2 network bits: block size = 2^6 = 64. Mask in 4th octet = 256 - 64 = 192. Subnet mask: 255.255.255.192.
      </Para>

      <Para>
        /27: block size = 32. Mask = 256 - 32 = 224. Mask: 255.255.255.224.
        /28: block size = 16. Mask = 256 - 16 = 240. Mask: 255.255.255.240.
        /29: block size = 8. Mask = 256 - 8 = 248. Mask: 255.255.255.248.
        /30: block size = 4. Mask = 256 - 4 = 252. Mask: 255.255.255.252.
      </Para>

      <SubnetCalculator />

      <Divider />

      {/* ── Chapter 3 ── */}
      <Chapter n={3} title="Mental Subnetting: The Quick Method" />

      <StoryBox>
        In a CCIE practical exam, you have 8 hours to complete a complex lab. There is no time to set up a spreadsheet. When the examiner says "subnet 172.16.0.0/16 into subnets of at most 60 hosts each," you need the answer in 10 seconds: /26 (62 hosts), subnets start at 0, 64, 128, 192 in the fourth octet. The examiner asks "which subnet is 172.16.5.100 in?" You calculate: 100/64 = 1 remainder 36. Subnet: 172.16.5.64/26. You move on.
      </StoryBox>

      <H2>The Four-Step Mental Method</H2>

      <Para>
        <Accent>Step 1: Find the prefix.</Accent> Given a host requirement, find the smallest power of 2 greater than (hosts + 2). For 50 hosts: 2^5=32 (too small), 2^6=64 (sufficient). Prefix = 32 - 6 = /26. For 100 hosts: 2^7=128. Prefix = /25.
      </Para>

      <Para>
        <Accent>Step 2: Find the block size.</Accent> Block size = 2^(host bits) = 256 - (interesting octet of mask). For /26: block size = 64. Subnets start at 0, 64, 128, 192.
      </Para>

      <Para>
        <Accent>Step 3: Find which subnet an IP is in.</Accent> Divide the interesting octet by the block size (integer division). Multiply back to find the subnet start. For IP x.x.x.100 in a /26 (block size 64): 100 ÷ 64 = 1, remainder 36. Subnet start: 1 × 64 = 64. Network: x.x.x.64.
      </Para>

      <Para>
        <Accent>Step 4: Find network, broadcast, first, and last hosts.</Accent> Network = subnet start. Broadcast = subnet start + block size - 1. First host = network + 1. Last host = broadcast - 1.
      </Para>

      <H2>Quick Reference Table</H2>

      <CodeBlock>
{`Prefix  Mask               Block  Subnets   Hosts
/24    255.255.255.0       256     1      254
/25    255.255.255.128     128     2      126
/26    255.255.255.192      64     4       62
/27    255.255.255.224      32     8       30
/28    255.255.255.240      16    16       14
/29    255.255.255.248       8    32        6
/30    255.255.255.252       4    64        2
/31    255.255.255.254       2   128     0 (RFC 3021: 2 usable P2P)
/32    255.255.255.255       1   256     0 (host route)`}
      </CodeBlock>

      <SubnetQuiz />

      <Divider />

      {/* ── Chapter 4 ── */}
      <Chapter n={4} title="VLSM — Variable Length Subnet Masking" />

      <StoryBox>
        A company has 192.168.0.0/22 and the following departments: Engineering (120 hosts), Sales (60 hosts), Servers (30 hosts), HR (14 hosts), Management (6 hosts), 3 router point-to-point links (2 hosts each). Fixed-length subnetting with /25 (126 hosts each) would give 8 identical subnets — but the router links only need 2 hosts each and waste 124 addresses per link. VLSM allocates exactly what each department needs, starting with the largest.
      </StoryBox>

      <Para>
        <Accent>VLSM (Variable Length Subnet Masking)</Accent> uses different prefix lengths for different subnets, allocating address space to fit actual requirements rather than forcing every subnet to the same size. VLSM is the standard approach in all modern networks — "fixed-length subnetting" (every subnet the same size) is now considered wasteful.
      </Para>

      <H2>VLSM Design Process</H2>

      <Para>
        <Accent>1. List all subnets and their host requirements, sorted largest to smallest.</Accent> This is critical — you must satisfy the largest requirements first to prevent the large subnets from stepping on small ones.
      </Para>

      <Para>
        <Accent>2. For each requirement, find the smallest prefix that fits.</Accent> Hosts needed + 2 (network + broadcast) ≤ 2^(host bits). Choose the smallest host-bits value satisfying this.
      </Para>

      <Para>
        <Accent>3. Allocate the address space sequentially.</Accent> Start from the base network. Assign the first large subnet, then the next subnet starts immediately after the first's broadcast address.
      </Para>

      <Para>
        <Accent>4. Verify no overlap.</Accent> Each subnet must be on a boundary aligned to its block size. A /26 must start at a multiple of 64; a /27 must start at a multiple of 32.
      </Para>

      <VLSMPlanner />

      <H2>VLSM Alignment Rule</H2>

      <Para>
        A subnet of prefix /n must start at an address that is a multiple of its block size (2^(32-n)) in the last octet (or across octets for larger subnets). A /26 (block size 64) must start at 0, 64, 128, or 192. A /27 (block size 32) must start at 0, 32, 64, ..., 224. If you try to put a /27 starting at 70, you've violated alignment — the network boundary must be at a multiple of 32, so the valid choices are 64 or 96.
      </Para>

      <Warn title="VLSM alignment errors">
        Misaligned subnets (starting at non-boundary addresses) are a common error in both exam questions and production networks. A /26 starting at 192.168.1.100 is invalid — 100 is not a multiple of 64. The router will accept the configuration but calculate incorrect network/broadcast addresses, causing hosts to be unreachable or in the wrong subnet.
      </Warn>

      <Divider />

      {/* ── Chapter 5 ── */}
      <Chapter n={5} title="Supernetting and Route Summarization" />

      <Para>
        The reverse of subnetting is <Accent>supernetting</Accent> — combining multiple smaller networks into a single larger one for the purposes of routing. This is also called <Accent>route aggregation</Accent> or <Accent>route summarization</Accent>. It reduces the size of routing tables and simplifies routing.
      </Para>

      <H2>When Can Networks Be Summarized?</H2>

      <Para>
        For networks to be summarizable into a single prefix, they must: (1) be contiguous in address space, (2) form a set that is a power-of-2 multiple starting at an aligned boundary. The summary prefix covers the addresses from the first network to the last network — if any holes exist (non-contiguous), summarization includes address space not in the original set.
      </Para>

      <CodeBlock>
{`# Example: Can we summarize these four /24s into one prefix?
10.10.0.0/24
10.10.1.0/24
10.10.2.0/24
10.10.3.0/24

# In binary, 3rd octet:
# 10.10.00000000 = 0
# 10.10.00000001 = 1
# 10.10.00000010 = 2
# 10.10.00000011 = 3
# Common prefix: 10.10.000000xx — 22 common bits
# Summary: 10.10.0.0/22 covers all four /24s exactly

# Verification: block size for /22 = 2^(32-22) = 1024 addresses
# 10.10.0.0 to 10.10.3.255 = 1024 addresses
# ✓ Covers all four /24s with no extra addresses`}
      </CodeBlock>

      <H2>Finding the Summary Route</H2>

      <Para>
        To find the summary route for a group of networks: (1) write all network addresses in binary, (2) find the longest common prefix (the rightmost bit where all networks agree), (3) the summary prefix length is the position of that last agreeing bit.
      </Para>

      <Para>
        Example: summarize 192.168.8.0/24 and 192.168.9.0/24.
        Third octets in binary: 00001000 (8) and 00001001 (9). Common prefix: 0000100x — 7 bits agree. Total prefix for the summary: 16 (first two octets) + 7 = /23. Summary: 192.168.8.0/23.
      </Para>

      <Divider />

      {/* ── Chapter 6 ── */}
      <Chapter n={6} title="Subnetting Across Octets" />

      <StoryBox>
        The exam question shows up: "Subnet 10.0.0.0/8 to create subnets with at least 500 hosts each. How many subnets can you create?" Most students panic when subnetting crosses into the second or third octet. But the method is identical — the only difference is which octet is "interesting." For 500 hosts: 2^9 = 512. Host bits = 9. Prefix = /23. Subnets from /8 to /23 = 2^15 = 32,768 subnets. Simple.
      </StoryBox>

      <H2>The "Interesting Octet" Changes</H2>

      <Para>
        Subnetting a /8 to /23: the interesting octet is the third octet (23 bits total = 8 bits in first octet + 8 bits in second + 7 bits into third). Block size in the third octet = 2^(24-23) = 2. Subnets: 10.0.0.0/23, 10.0.2.0/23, 10.0.4.0/23 ... the third octet increments by 2.
      </Para>

      <Para>
        Subnetting a /16 to /20: interesting octet is the third. 20 bits = 8+8+4. Block size = 2^(24-20) = 16. Subnets: 172.16.0.0/20, 172.16.16.0/20, 172.16.32.0/20 ... third octet increments by 16.
      </Para>

      <CodeBlock>
{`# 10.0.0.0/8 subnetted to /16 — subnets in the second octet
Block size = 2^(16-16)? No — /16 means prefix=16, so interesting octet is octet 2.
Block size in octet 2 = 2^(16-16) = 1. Subnets:
10.0.0.0/16, 10.1.0.0/16, 10.2.0.0/16 ... 10.255.0.0/16

# 172.16.0.0/16 subnetted to /20 — interesting octet = 3
Block size in octet 3 = 2^(24-20) = 16. Subnets:
172.16.0.0/20, 172.16.16.0/20, 172.16.32.0/20 ... 172.16.240.0/20

# 10.0.0.0/8 subnetted to /12 — interesting octet = 2
Block size in octet 2 = 2^(16-12) = 16. Subnets:
10.0.0.0/12, 10.16.0.0/12, 10.32.0.0/12 ... 10.240.0.0/12`}
      </CodeBlock>

      <Divider />

      {/* ── Chapter 7 ── */}
      <Chapter n={7} title="Practical Subnetting: Enterprise Design" />

      <H2>Designing a Campus Network</H2>

      <Para>
        A company is assigned 10.100.0.0/16 for their campus network. They have: 4 buildings, each with up to 5 floors; each floor has up to 3 access-layer VLANs with up to 200 hosts each; plus infrastructure (management, DMZ, server farm).
      </Para>

      <Para>
        Hierarchical design: allocate /24 blocks per floor, /20 blocks per building, /16 for the site. Building 1: 10.100.0.0/20 (10.100.0.0 – 10.100.15.255). Building 2: 10.100.16.0/20. Building 3: 10.100.32.0/20. Building 4: 10.100.48.0/20. Remaining 10.100.64.0/18 for servers/DMZ/growth.
      </Para>

      <Para>
        Within Building 1, Floor 1: 10.100.0.0/24. Floor 2: 10.100.1.0/24. Floor 3: 10.100.2.0/24. The router for Building 1 needs only one summary route (10.100.0.0/20) in its advertisements to the rest of the campus — 16 floor subnets are hidden behind one route entry.
      </Para>

      <H2>Point-to-Point Link Addressing</H2>

      <Para>
        Every routed link between network devices needs a subnet. A /30 provides exactly 2 usable addresses (perfect for a two-endpoint link with minimal waste). A /31 (RFC 3021) eliminates the network/broadcast overhead entirely, providing 2 addresses both usable — Cisco IOS, Juniper JunOS, and most modern routers support /31 on point-to-point links.
      </Para>

      <CodeBlock>
{`# /30 point-to-point link (classic approach)
interface GigabitEthernet0/0
 ip address 10.100.255.1 255.255.255.252   ! /30 — next router gets .2

# /31 point-to-point link (RFC 3021 — saves 2 addresses per link)
interface GigabitEthernet0/0
 ip address 10.100.255.0 255.255.255.254   ! /31 — next router gets .1

# Verify
show ip interface brief
show ip route connected`}
      </CodeBlock>

      <Divider />

      {/* ── Chapter 8 ── */}
      <Chapter n={8} title="Subnetting in IPv6" />

      <Para>
        IPv6 subnetting follows the same binary logic but with 128-bit addresses. Standard IPv6 subnetting assigns /64 to every LAN segment — leaving 64 bits for host addressing (giving 18.4 × 10^18 addresses per subnet). This fixed /64 boundary is not arbitrary: <Accent>SLAAC (Stateless Address Autoconfiguration)</Accent> requires a /64 network prefix for its EUI-64-based address generation algorithm.
      </Para>

      <H2>IPv6 Prefix Hierarchy</H2>

      <Para>
        IANA allocates large blocks to RIRs (/12 to /23). RIRs allocate to ISPs (typically /32). ISPs allocate to customers (typically /48). Customers subnet /48 into /64 LANs. A /48 provides 2^16 = 65,536 /64 subnets — enough for any organization.
      </Para>

      <CodeBlock>
{`# IPv6 subnetting example
Customer receives: 2001:db8:abcd::/48
Available subnets (/64): 2^(64-48) = 2^16 = 65,536

First /64:         2001:db8:abcd:0000::/64  = subnet 0
Second /64:        2001:db8:abcd:0001::/64  = subnet 1
...
Last /64:          2001:db8:abcd:ffff::/64  = subnet 65535

# Infrastructure (/127 for P2P links in IPv6)
interface GigabitEthernet0/0
 ipv6 address 2001:db8:abcd:ff00::1/127   ! RFC 6164`}
      </CodeBlock>

      <WowBox>
        A /48 IPv6 allocation gives an organization 65,536 /64 subnets. At the rate of one new VLAN per day, it would take 179 years to exhaust those subnets. And if that somehow happened, requesting a second /48 from the ISP costs essentially nothing — the IPv6 address space contains 2^128 addresses, roughly 340 undecillion. Every square meter of Earth's surface could have ~670 quadrillion IPv6 addresses assigned to it simultaneously.
      </WowBox>

      <Divider />

      {/* ── Chapter 9 ── */}
      <Chapter n={9} title="Subnetting in Cloud Environments" />

      <Para>
        Cloud providers have their own conventions that extend traditional subnetting concepts. Understanding these is essential for cloud network engineers.
      </Para>

      <H2>AWS VPC Subnetting</H2>

      <Para>
        An AWS VPC (Virtual Private Cloud) is assigned a CIDR block (/16 to /28). The VPC is then divided into subnets, each in a specific Availability Zone. AWS reserves 5 addresses in every subnet: the network address (.0), the VPC router (.1), DNS server (.2), future use (.3), and the broadcast address (.255 or last).
      </Para>

      <Para>
        A /24 subnet in AWS has 256 - 5 = 251 usable addresses (vs. 254 in traditional subnetting). When sizing AWS subnets, account for this 5-address overhead. A best practice for AWS: use /24 subnets for AZ-level subnets (private, public, database layers), aggregate under a /16 VPC, use /28 for PrivateLink endpoints where address conservation matters.
      </Para>

      <H2>Kubernetes Pod CIDR</H2>

      <Para>
        Kubernetes assigns IP addresses to pods from a dedicated pod CIDR. Each node gets a sub-range (typically a /24) from the pod CIDR. With a /16 pod CIDR and /24 per node: up to 256 nodes, each with 254 pods. Planning the pod CIDR incorrectly (too small) is a common Kubernetes networking mistake that causes pod scheduling failures.
      </Para>

      <Divider />

      {/* ── Chapter 10 ── */}
      <Chapter n={10} title="Subnetting Tools and Automation" />

      <H2>Python for Subnetting</H2>

      <CodeBlock>
{`import ipaddress

# Analyze a subnet
network = ipaddress.IPv4Network('192.168.10.0/26', strict=True)
print(f"Network: {network.network_address}")
print(f"Broadcast: {network.broadcast_address}")
print(f"First host: {next(network.hosts())}")
print(f"Usable hosts: {network.num_addresses - 2}")

# Subnet a /24 into /27s
parent = ipaddress.IPv4Network('10.10.10.0/24')
subnets = list(parent.subnets(new_prefix=27))
for s in subnets:
    print(f"{s} — {s.num_addresses - 2} hosts")

# Check if IP is in subnet
ip = ipaddress.IPv4Address('192.168.10.50')
if ip in network:
    print(f"{ip} is in {network}")

# Supernet
net1 = ipaddress.IPv4Network('192.168.8.0/24')
net2 = ipaddress.IPv4Network('192.168.9.0/24')
supernet = net1.supernet(new_prefix=23)
print(f"Summary: {supernet}")`}
      </CodeBlock>

      <H2>CLI Tools</H2>

      <CodeBlock>
{`# Linux — ipcalc
ipcalc 192.168.1.0/26

# Linux — sipcalc (detailed)
sipcalc 10.0.0.0/22 -s 24

# Python one-liner subnet check
python3 -c "import ipaddress; n=ipaddress.ip_network('10.0.0.0/24'); print(list(n.subnets(new_prefix=27)))"

# macOS/Linux — show routing for an IP
ip route get 8.8.8.8

# Netmask utility
netmask 192.168.1.1/255.255.255.192`}
      </CodeBlock>

      <Divider />

      {/* ── Chapter 11 ── */}
      <Chapter n={11} title="Real-World Subnetting Decisions" />

      <H2>How Much to Over-Provision?</H2>

      <Para>
        Network engineers consistently debate how much spare capacity to include in subnet sizing. Too small: you run out of IPs before the next maintenance window. Too large: you waste address space.
      </Para>

      <Para>
        A practical rule: size subnets for 2× current requirement, or the next power of 2 above current requirement + 30% growth. A segment with 80 current devices that might grow to 120: use /24 (254 hosts), not /25 (126 hosts — might not fit at 120 + infrastructure devices). The address cost of over-provisioning is low within private address space; the operational cost of re-addressing a subnet that outgrew its allocation is very high.
      </Para>

      <H2>The Re-Addressing Nightmare</H2>

      <Para>
        When a subnet outgrows its address space, the only solutions are: (1) migrate all hosts to a larger subnet (requires DHCP scope changes, gateway IP changes, static IP reconfiguration on servers, DNS updates, firewall rule updates) — extremely disruptive; (2) create a secondary subnet and route between them (adds complexity and adds a router hop); or (3) use NAT444 (multiple layers of NAT — avoided in all sane environments). Plan for growth.
      </Para>

      <Divider />

      {/* ── Chapter 12 ── */}
      <Chapter n={12} title="Subnetting Practice Problems" />

      <H2>Problem Set</H2>

      <CodeBlock>
{`Problem 1:
Given 172.16.0.0/16, create subnets of 500 hosts each.
Solution: 500+2 = 502 → 2^9=512 ≥ 502. Host bits = 9. Prefix = /23.
Subnets: 2^(23-16) = 128 subnets.
Addresses: 172.16.0.0/23, 172.16.2.0/23 (block=512)

Problem 2:
192.168.100.200 with mask 255.255.255.240 — what subnet?
/28: block size = 16. 200/16 = 12, remainder 8. Network: 192.168.100.192.
Broadcast: 192.168.100.207. Hosts: 193-206.

Problem 3:
Summarize: 10.4.0.0/24, 10.4.1.0/24, 10.4.2.0/24, 10.4.3.0/24
3rd octet binary: 00, 01, 10, 11 → common: 000000xx → 6 bits agree.
Total prefix: 16+6=22. Summary: 10.4.0.0/22 ✓

Problem 4:
You have 10.0.0.0/8. Create subnets for:
- 4 offices of 1000 hosts each
- 20 server VLANs of 100 hosts each
- 50 P2P router links
Offices: 1000+2 → 2^10=1024 → /22. Servers: 100+2 → 2^7=128 → /25. P2P: /30.
Offices: 10.0.0.0/22, 10.0.4.0/22, 10.0.8.0/22, 10.0.12.0/22
Servers: 10.0.16.0/25, 10.0.16.128/25, 10.0.17.0/25 ... ×20
P2P: 10.0.24.0/30, 10.0.24.4/30 ... ×50`}
      </CodeBlock>

      <Divider />

      {/* ── Chapter 13 ── */}
      <Chapter n={13} title="Common Misconceptions" />

      <Err title="Subnets can start at any IP address">
        Subnets must start at an address that is a multiple of their block size. A /27 (block size 32) must start at 0, 32, 64, 96, 128, 160, 192, or 224 in the last octet. Starting a /27 at x.x.x.50 is invalid — the network address would actually be at x.x.x.32 (the closest multiple of 32 below 50). Routers calculate network address by ANDing IP with mask — if your "network" IP doesn't equal the result, the addressing is wrong.
      </Err>

      <Err title="Larger prefix = larger network">
        Prefix length and network size have an inverse relationship. A /24 is larger than a /28. The prefix length counts network bits — more network bits = fewer host bits = smaller subnet. A /30 is a tiny 4-address subnet. A /16 is a large 65,536-address network. When someone says "they gave us a bigger subnet," they mean a shorter prefix (e.g., /22 instead of /24) — more addresses, not a larger number.
      </Err>

      <Err title="The network address is usable for hosts">
        The network address (all host bits = 0) and broadcast address (all host bits = 1) are reserved and cannot be assigned to hosts. The network address is the identifier for the subnet in routing tables. The broadcast address is used for subnet-wide broadcast delivery. Assigning a host the network address causes IP conflicts and connectivity failures — the host's ARP replies will confuse the gateway.
      </Err>

      <Err title="VLSM requires special hardware or protocols">
        VLSM is a design methodology, not a protocol feature. Any modern router and any classless routing protocol (OSPF, EIGRP, BGP, RIPv2) supports VLSM — they include subnet mask information in routing updates, allowing different prefix lengths for different networks. Only classful protocols (RIPv1, IGRP — obsolete) don't carry mask information and assume all networks have the same prefix length. All modern networking uses classless routing.
      </Err>

      <Err title="A /32 is not a usable subnet">
        A /32 host route is perfectly valid and widely used. It identifies a single specific IP address — used for: loopback interfaces on routers (routers' management IPs are often on loopback /32s), specific host routes injected to override summary routes, BGP network statements for specific IPs, and VPN endpoint addressing. A /32 has no usable hosts in the traditional sense (no room for network or broadcast), but as a host route it addresses the interface IP directly — the interface itself is the "host."
      </Err>

      <Err title="Summarization always reduces routing table size">
        Summarization reduces size only when the summarized networks are truly contiguous and the summary accurately represents the reachable address space. If 10.10.0.0/22 is advertised as a summary but only 10.10.0.0/24 and 10.10.1.0/24 are actually reachable (not 10.10.2.0/24 or 10.10.3.0/24), routers will blackhole traffic destined for the missing subnets. Summary routes must be verified to cover exactly the reachable address space — not more, not less.
      </Err>

      <Divider />

      {/* ── Chapter 14 ── */}
      <Chapter n={14} title="Interview Questions" />

      <IQ q="How many subnets and hosts per subnet does /27 provide when applied to a /24?" level="Beginner">
        A /24 has 8 host bits. Moving to /27 borrows 3 bits (27 - 24 = 3) for subneting. Number of subnets = 2^3 = 8. Remaining host bits = 32 - 27 = 5. Hosts per subnet = 2^5 - 2 = 30. Block size = 32. Subnets start at 0, 32, 64, 96, 128, 160, 192, 224. Subnet mask: 255.255.255.224.
      </IQ>

      <IQ q="A host has IP 192.168.50.130 with subnet mask 255.255.255.192. What is its network address, broadcast, and usable range?" level="Beginner">
        Mask 255.255.255.192 = /26, block size 64. 130 / 64 = 2, remainder 2. Network = 2 × 64 = 128. Network address: 192.168.50.128. Broadcast: 192.168.50.128 + 64 - 1 = 192.168.50.191. First host: .129. Last host: .190. Usable hosts: 62.
      </IQ>

      <IQ q="Explain VLSM and provide a concrete design example." level="Intermediate">
        VLSM allows different subnets to use different prefix lengths, allocating exactly the address space needed for each subnet rather than forcing a single fixed size. Design approach: sort requirements largest to smallest; find the smallest prefix fitting each requirement; allocate sequentially from the base network. Example: Given 192.168.0.0/24, design subnets for: 100 hosts (→ /25, 126 hosts), 50 hosts (→ /26, 62 hosts), 25 hosts (→ /27, 30 hosts), 2 router links (→ /30, 2 hosts each). Allocation: 192.168.0.0/25 (100-host), 192.168.0.128/26 (50-host), 192.168.0.192/27 (25-host), 192.168.0.224/30 (link 1), 192.168.0.228/30 (link 2). Total used: 128+64+32+4+4 = 232 of 256 addresses, with 24 addresses remaining for future use.
      </IQ>

      <IQ q="How do you summarize 10.4.0.0/24, 10.4.1.0/24, 10.4.2.0/24, and 10.4.3.0/24 into a single route?" level="Intermediate">
        Write the third octet of each network in binary: 0=00000000, 1=00000001, 2=00000010, 3=00000011. The common bits are the first 6: 000000xx. The third octet contributes 6 bits to the common prefix. Total common prefix: 16 (first two octets) + 6 = /22. Summary route: 10.4.0.0/22. Verification: a /22 has block size 2^10 = 1024. Starting at 10.4.0.0, the block covers 10.4.0.0 through 10.4.3.255 — exactly the four /24s. This works because the four networks are contiguous and start at an aligned /22 boundary (0 is a multiple of 4).
      </IQ>

      <IQ q="You're designing a multi-site enterprise network with the allocation 10.0.0.0/8. How would you structure the address plan to enable route summarization at each layer?" level="Senior">
        Hierarchical approach: (1) Divide by site: each of 16 sites gets a /12 (2^(12-8)=16 allocations from /8). Site 1: 10.0.0.0/12, Site 2: 10.16.0.0/12, ... Site 16: 10.240.0.0/12. Each site can advertise one /12 summary to headquarters. (2) Within each site, divide by building: each of 16 buildings gets a /16. Building 1 in Site 1: 10.0.0.0/16, Building 2: 10.1.0.0/16. Each building summarizes to one /16 toward the site router. (3) Within each building, divide by floor/function: /24 per VLAN/floor. A summary /20 covers 16 /24s. (4) Infrastructure: reserve 10.254.0.0/16 for management, 10.255.0.0/16 for transit links. Result: Headquarters sees ≤16 route prefixes (one per site). Site routers see ≤16 prefixes (one per building). Building routers see ≤256 prefixes (one per floor/VLAN). This is O(n) total entries rather than O(n²) — fundamental to routing table scalability.
      </IQ>

      <IQ q="Explain how CIDR route aggregation and the BGP routing table interact, and why the internet's routing table has ~900K entries rather than billions." level="PhD">
        Without aggregation, the internet routing table would need one entry per assigned host IP — billions of entries, impossible to hold in any router's memory or process at line rate. CIDR aggregation works at multiple levels: (1) RIR-level: IANA assigns /8–/12 blocks to RIRs; RIRs advertise summary routes. If ARIN holds 99.0.0.0/8, it can announce one /8 covering 16M addresses rather than 16M /32 host routes. (2) ISP-level: a large ISP holding 203.0.113.0/24 through 203.0.255.0/24 (contiguous) can announce 203.0.0.0/16. (3) Customer-level: multi-homed customers announce their specific prefixes while their ISPs provide default route aggregation. The ~900K entries in the current DFZ (Default-Free Zone — the internet's full BGP table) represent a trade-off: each entry represents a prefix where the ISP responsible for an address block cannot or will not aggregate further (often because the block is announced from multiple providers or contains non-contiguous sub-allocations). The table has grown from ~200K in 2012 because: increasing multi-homing (customers announce specifics to control inbound traffic), legacy fragmented allocations (pre-CIDR era blocks don't aggregate cleanly), and PI (Provider-Independent) space used by small organizations needing multi-homing without portability. RPKI (Resource Public Key Infrastructure) and BGP Origin Validation are being deployed to prevent route origin hijacking, but don't directly reduce table size. The fundamental tension: more specific announcements give operators finer traffic control at the cost of larger global routing tables.
      </IQ>

      <KeyTakeaways items={[
        'Subnetting borrows bits from the host portion of an IP address to create smaller broadcast domains — each borrowed bit doubles the subnet count and halves the host count.',
        'Block size = 2^(host bits) = 256 - (interesting octet of mask). Subnets always start at multiples of the block size.',
        'For n borrowed bits: subnets = 2^n, hosts per subnet = 2^(original host bits - n) - 2.',
        'Mental method: find the smallest power of 2 ≥ needed hosts + 2, prefix = 32 - that power; block size = 2^power; network = (IP octet ÷ block size) × block size.',
        'VLSM allocates different prefix lengths to different subnets, fitting each to its actual size requirement — always allocate largest to smallest to prevent overlap.',
        '/30 gives 2 usable hosts (router point-to-point links); /31 (RFC 3021) eliminates network/broadcast overhead for true point-to-point efficiency.',
        'Route summarization (supernetting) combines contiguous subnets into a single larger prefix — requires contiguous address space aligned to a power-of-2 boundary.',
        'Subnets must be aligned to their block size — a /27 (block 32) must start at 0, 32, 64... Misaligned subnets cause silent routing failures.',
        'IPv6 standard LAN subnetting uses /64 (SLAAC requires it); /127 for point-to-point links (RFC 6164); a /48 allocation provides 65,536 /64 subnets per organization.',
        'AWS reserves 5 addresses per subnet (network, router, DNS, future, broadcast) — a /24 in AWS has 251 usable addresses, not 254.',
      ]} />
    </LearnLayout>
  )
}
