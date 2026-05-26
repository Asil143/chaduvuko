'use client'

import { useState } from 'react'
import { LearnLayout } from '@/components/content/LearnLayout'
import { KeyTakeaways } from '@/components/content/KeyTakeaways'

// ─── Design tokens ────────────────────────────────────────────────────────────
const G = '#10b981'
const FONT_MONO = 'var(--font-mono)'
const FONT_DISPLAY = 'var(--font-display)'

// ─── Helper components ────────────────────────────────────────────────────────

function Chapter({ n, title, subtitle }: { n: string; title: string; subtitle?: string }) {
  return (
    <div style={{ marginBottom: 32 }}>
      <p style={{ fontSize: 11, color: G, fontFamily: FONT_MONO, fontWeight: 700, margin: '0 0 6px', letterSpacing: '.12em' }}>
        // CHAPTER {n}
      </p>
      <h2 style={{ fontFamily: FONT_DISPLAY, fontSize: 'clamp(22px,3.5vw,34px)', fontWeight: 900, letterSpacing: '-1.5px', color: 'var(--text)', margin: 0 }}>
        {title}
      </h2>
      {subtitle && (
        <p style={{ fontSize: 15, color: 'var(--muted)', margin: '8px 0 0', fontStyle: 'italic' }}>{subtitle}</p>
      )}
    </div>
  )
}

function Divider() {
  return <div style={{ borderTop: '1px solid var(--border)', margin: '56px 0' }} />
}

function Para({ children }: { children: React.ReactNode }) {
  return <p style={{ fontSize: 15, color: 'var(--text)', lineHeight: 1.9, margin: '0 0 18px' }}>{children}</p>
}

function H2({ children }: { children: React.ReactNode }) {
  return <h3 style={{ fontSize: 20, fontWeight: 800, color: 'var(--text)', margin: '36px 0 14px', letterSpacing: '-0.5px' }}>{children}</h3>
}

function H3({ children }: { children: React.ReactNode }) {
  return <h4 style={{ fontSize: 16, fontWeight: 700, color: 'var(--text)', margin: '28px 0 10px' }}>{children}</h4>
}

function Accent({ children }: { children: React.ReactNode }) {
  return <strong style={{ color: G, fontWeight: 700 }}>{children}</strong>
}

function StoryBox({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ borderLeft: `4px solid #3b82f6`, background: 'rgba(59,130,246,0.07)', borderRadius: '0 10px 10px 0', padding: '18px 22px', margin: '28px 0' }}>
      <p style={{ fontSize: 11, color: '#60a5fa', fontFamily: FONT_MONO, fontWeight: 700, margin: '0 0 8px', letterSpacing: '.1em' }}>// REAL-WORLD SCENARIO</p>
      <div style={{ fontSize: 15, color: 'var(--text)', lineHeight: 1.8 }}>{children}</div>
    </div>
  )
}

function WowBox({ emoji, title, children }: { emoji: string; title: string; children: React.ReactNode }) {
  return (
    <div style={{ background: 'rgba(16,185,129,0.08)', border: `1px solid rgba(16,185,129,0.25)`, borderRadius: 12, padding: '18px 22px', margin: '28px 0' }}>
      <p style={{ fontSize: 13, color: G, fontWeight: 800, margin: '0 0 8px' }}>{emoji} {title}</p>
      <div style={{ fontSize: 15, color: 'var(--text)', lineHeight: 1.8 }}>{children}</div>
    </div>
  )
}

function Warn({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div style={{ background: 'rgba(251,191,36,0.08)', border: '1px solid rgba(251,191,36,0.3)', borderRadius: 12, padding: '18px 22px', margin: '28px 0' }}>
      <p style={{ fontSize: 13, color: '#fbbf24', fontWeight: 800, margin: '0 0 8px' }}>⚠ {title}</p>
      <div style={{ fontSize: 15, color: 'var(--text)', lineHeight: 1.8 }}>{children}</div>
    </div>
  )
}

function Err({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div style={{ background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.3)', borderRadius: 12, padding: '18px 22px', margin: '28px 0' }}>
      <p style={{ fontSize: 13, color: '#f87171', fontWeight: 800, margin: '0 0 8px' }}>✗ Common Mistake — {title}</p>
      <div style={{ fontSize: 15, color: 'var(--text)', lineHeight: 1.8 }}>{children}</div>
    </div>
  )
}

function IQ({ q, level, children }: { q: string; level: 'Beginner' | 'Intermediate' | 'Senior' | 'PhD'; children: React.ReactNode }) {
  const colors: Record<string, string> = {
    Beginner: '#34d399', Intermediate: '#60a5fa', Senior: '#a78bfa', PhD: '#f472b6',
  }
  const c = colors[level]
  return (
    <div style={{ border: `1px solid ${c}33`, borderRadius: 12, padding: '18px 22px', margin: '18px 0' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
        <span style={{ fontSize: 11, fontFamily: FONT_MONO, fontWeight: 700, color: c, background: `${c}18`, padding: '3px 10px', borderRadius: 99 }}>{level}</span>
        <p style={{ fontSize: 14, fontWeight: 700, color: 'var(--text)', margin: 0 }}>{q}</p>
      </div>
      <div style={{ fontSize: 14, color: 'var(--muted)', lineHeight: 1.8 }}>{children}</div>
    </div>
  )
}

function CodeBlock({ title, children }: { title?: string; children: React.ReactNode }) {
  return (
    <div style={{ background: '#0d1117', borderRadius: 10, overflow: 'hidden', margin: '20px 0', border: '1px solid #30363d' }}>
      {title && (
        <div style={{ background: '#161b22', padding: '8px 16px', borderBottom: '1px solid #30363d', fontSize: 12, color: '#8b949e', fontFamily: FONT_MONO }}>
          {title}
        </div>
      )}
      <pre style={{ margin: 0, padding: '16px 20px', fontSize: 13, lineHeight: 1.7, color: '#e6edf3', fontFamily: FONT_MONO, overflowX: 'auto', whiteSpace: 'pre' }}>
        {children}
      </pre>
    </div>
  )
}

// ─── Interactive: Number Base Converter ───────────────────────────────────────

function BaseConverter() {
  const [input, setInput] = useState('192')
  const [fromBase, setFromBase] = useState(10)

  let value = NaN
  try { value = parseInt(input, fromBase) } catch { value = NaN }
  const valid = !isNaN(value) && value >= 0

  const bases = [
    { base: 2,  label: 'Binary',  prefix: '0b', digits: '0–1' },
    { base: 8,  label: 'Octal',   prefix: '0o', digits: '0–7' },
    { base: 10, label: 'Decimal', prefix: '',   digits: '0–9' },
    { base: 16, label: 'Hex',     prefix: '0x', digits: '0–9,A–F' },
  ]

  function toBase(n: number, base: number) {
    if (!valid) return '—'
    return n.toString(base).toUpperCase()
  }

  // Bit breakdown for binary
  const bits = valid ? value.toString(2).padStart(Math.max(8, value.toString(2).length % 4 === 0 ? value.toString(2).length : value.toString(2).length + (4 - value.toString(2).length % 4)), '0') : ''

  return (
    <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 14, padding: 24, margin: '28px 0' }}>
      <p style={{ fontSize: 12, color: G, fontFamily: FONT_MONO, fontWeight: 700, margin: '0 0 16px' }}>// NUMBER BASE CONVERTER</p>
      <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginBottom: 16 }}>
        <div style={{ flex: 1, minWidth: 200 }}>
          <p style={{ fontSize: 12, color: 'var(--muted)', margin: '0 0 6px' }}>Input value</p>
          <input
            value={input}
            onChange={e => setInput(e.target.value)}
            style={{ width: '100%', padding: '9px 14px', borderRadius: 8, border: '1px solid var(--border)', background: 'var(--bg)', color: 'var(--text)', fontFamily: FONT_MONO, fontSize: 16, boxSizing: 'border-box' }}
          />
        </div>
        <div style={{ minWidth: 140 }}>
          <p style={{ fontSize: 12, color: 'var(--muted)', margin: '0 0 6px' }}>From base</p>
          <div style={{ display: 'flex', gap: 4 }}>
            {[2, 8, 10, 16].map(b => (
              <button key={b} onClick={() => setFromBase(b)}
                style={{ padding: '8px 12px', borderRadius: 8, fontSize: 13, fontFamily: FONT_MONO, fontWeight: 700, cursor: 'pointer', border: `1px solid ${b === fromBase ? G : 'var(--border)'}`, background: b === fromBase ? 'rgba(16,185,129,0.15)' : 'transparent', color: b === fromBase ? G : 'var(--muted)' }}>
                {b}
              </button>
            ))}
          </div>
        </div>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: 12, marginBottom: 16 }}>
        {bases.map(b => (
          <div key={b.base} style={{ background: 'var(--bg)', border: `1px solid ${b.base === fromBase ? G + '44' : 'var(--border)'}`, borderRadius: 10, padding: '12px 16px' }}>
            <p style={{ fontSize: 11, color: 'var(--muted)', margin: '0 0 4px', fontFamily: FONT_MONO }}>{b.label} (base {b.base}) {b.prefix}</p>
            <p style={{ fontSize: 18, color: b.base === fromBase ? G : 'var(--text)', fontFamily: FONT_MONO, fontWeight: 700, margin: 0, wordBreak: 'break-all' }}>
              {b.prefix}{toBase(value, b.base)}
            </p>
            <p style={{ fontSize: 10, color: 'var(--muted)', margin: '4px 0 0' }}>digits: {b.digits}</p>
          </div>
        ))}
      </div>
      {valid && bits && (
        <div>
          <p style={{ fontSize: 12, color: 'var(--muted)', margin: '0 0 8px' }}>Binary bit groups (nibbles)</p>
          <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
            {bits.match(/.{1,4}/g)?.map((nibble, i) => (
              <div key={i} style={{ background: '#0d1117', border: '1px solid #30363d', borderRadius: 8, padding: '6px 10px', textAlign: 'center' }}>
                <p style={{ fontSize: 14, fontFamily: FONT_MONO, color: '#e6edf3', margin: '0 0 2px', letterSpacing: 2 }}>{nibble}</p>
                <p style={{ fontSize: 11, color: G, fontFamily: FONT_MONO, margin: 0 }}>
                  {parseInt(nibble, 2).toString(16).toUpperCase()}
                </p>
              </div>
            ))}
          </div>
          <p style={{ fontSize: 12, color: 'var(--muted)', marginTop: 8 }}>Each group of 4 binary digits = 1 hex digit. Decimal value: {value}</p>
        </div>
      )}
    </div>
  )
}

// ─── Interactive: IP Address Binary Breakdown ─────────────────────────────────

const PRESET_IPS = [
  { label: '192.168.1.1',   ip: '192.168.1.1'   },
  { label: '10.0.0.1',      ip: '10.0.0.1'      },
  { label: '172.16.0.1',    ip: '172.16.0.1'    },
  { label: '255.255.255.0', ip: '255.255.255.0' },
  { label: '255.255.255.255',ip: '255.255.255.255'},
  { label: '0.0.0.0',       ip: '0.0.0.0'       },
]

function toBin8(n: number) {
  return n.toString(2).padStart(8, '0')
}

function toHex2(n: number) {
  return n.toString(16).padStart(2, '0').toUpperCase()
}

function IPBinaryBreakdown() {
  const [ipStr, setIpStr] = useState('192.168.1.1')
  const octets = ipStr.split('.').map(s => parseInt(s, 10))
  const valid = octets.length === 4 && octets.every(o => !isNaN(o) && o >= 0 && o <= 255)

  const octetColors = ['#60a5fa', '#34d399', '#f59e0b', '#f472b6']

  return (
    <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 14, padding: 24, margin: '28px 0' }}>
      <p style={{ fontSize: 12, color: G, fontFamily: FONT_MONO, fontWeight: 700, margin: '0 0 16px' }}>// IPv4 ADDRESS BINARY BREAKDOWN</p>
      <div style={{ marginBottom: 16 }}>
        <p style={{ fontSize: 12, color: 'var(--muted)', margin: '0 0 6px' }}>IP Address</p>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 10 }}>
          {PRESET_IPS.map(p => (
            <button key={p.ip} onClick={() => setIpStr(p.ip)}
              style={{ padding: '5px 12px', borderRadius: 99, fontSize: 12, fontFamily: FONT_MONO, cursor: 'pointer', border: `1px solid ${ipStr === p.ip ? G : 'var(--border)'}`, background: ipStr === p.ip ? 'rgba(16,185,129,0.1)' : 'transparent', color: ipStr === p.ip ? G : 'var(--muted)' }}>
              {p.label}
            </button>
          ))}
        </div>
        <input
          value={ipStr}
          onChange={e => setIpStr(e.target.value)}
          placeholder="e.g. 192.168.1.1"
          style={{ padding: '9px 14px', borderRadius: 8, border: '1px solid var(--border)', background: 'var(--bg)', color: 'var(--text)', fontFamily: FONT_MONO, fontSize: 15, width: 220 }}
        />
      </div>
      {valid ? (
        <div>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ borderCollapse: 'collapse', width: '100%', minWidth: 520 }}>
              <thead>
                <tr>
                  <th style={{ fontSize: 11, color: 'var(--muted)', fontFamily: FONT_MONO, padding: '6px 10px', textAlign: 'left', fontWeight: 600 }}>Octet</th>
                  <th style={{ fontSize: 11, color: 'var(--muted)', fontFamily: FONT_MONO, padding: '6px 10px', textAlign: 'right', fontWeight: 600 }}>Decimal</th>
                  <th style={{ fontSize: 11, color: 'var(--muted)', fontFamily: FONT_MONO, padding: '6px 10px', textAlign: 'left', fontWeight: 600 }}>Binary (8 bits)</th>
                  <th style={{ fontSize: 11, color: 'var(--muted)', fontFamily: FONT_MONO, padding: '6px 10px', textAlign: 'right', fontWeight: 600 }}>Hex</th>
                </tr>
              </thead>
              <tbody>
                {octets.map((o, i) => (
                  <tr key={i} style={{ borderTop: '1px solid var(--border)' }}>
                    <td style={{ padding: '10px', fontSize: 13, color: octetColors[i], fontFamily: FONT_MONO, fontWeight: 700 }}>Octet {i + 1}</td>
                    <td style={{ padding: '10px', fontSize: 16, color: octetColors[i], fontFamily: FONT_MONO, fontWeight: 800, textAlign: 'right' }}>{o}</td>
                    <td style={{ padding: '10px' }}>
                      <div style={{ display: 'flex', gap: 2 }}>
                        {toBin8(o).split('').map((bit, j) => (
                          <span key={j} style={{ fontFamily: FONT_MONO, fontSize: 15, fontWeight: 700, color: bit === '1' ? octetColors[i] : 'var(--muted)', background: bit === '1' ? `${octetColors[i]}15` : 'transparent', padding: '2px 4px', borderRadius: 3 }}>
                            {bit}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td style={{ padding: '10px', fontSize: 15, color: '#a78bfa', fontFamily: FONT_MONO, fontWeight: 700, textAlign: 'right' }}>0x{toHex2(o)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div style={{ marginTop: 16, background: '#0d1117', borderRadius: 10, padding: '12px 16px', border: '1px solid #30363d' }}>
            <p style={{ fontSize: 11, color: '#8b949e', fontFamily: FONT_MONO, margin: '0 0 6px' }}>Full 32-bit binary representation</p>
            <p style={{ fontSize: 14, fontFamily: FONT_MONO, color: '#e6edf3', margin: 0, wordBreak: 'break-all', letterSpacing: 1 }}>
              {octets.map((o, i) => (
                <span key={i}>
                  <span style={{ color: octetColors[i] }}>{toBin8(o)}</span>
                  {i < 3 && <span style={{ color: '#444' }}>.</span>}
                </span>
              ))}
            </p>
            <p style={{ fontSize: 11, color: '#8b949e', fontFamily: FONT_MONO, margin: '6px 0 0' }}>
              Hex: {octets.map(o => toHex2(o)).join(':')} &nbsp;|&nbsp; Decimal: {octets.reduce((acc, o, i) => acc + (o * Math.pow(256, 3 - i)), 0)}
            </p>
          </div>
        </div>
      ) : (
        <p style={{ color: '#f87171', fontSize: 13, fontFamily: FONT_MONO }}>Invalid IPv4 address — enter 4 octets separated by dots (0–255 each)</p>
      )}
    </div>
  )
}

// ─── Interactive: Bitwise Operations Visualizer ───────────────────────────────

type BitwiseOp = 'AND' | 'OR' | 'XOR' | 'NOT' | 'SHL' | 'SHR'

const OPS: { op: BitwiseOp; label: string; symbol: string; color: string; desc: string }[] = [
  { op: 'AND', label: 'AND',           symbol: '&',  color: '#60a5fa', desc: 'Both bits must be 1 → 1. Used for masking (extracting specific bits). Subnet masking is AND.' },
  { op: 'OR',  label: 'OR',            symbol: '|',  color: '#34d399', desc: 'Either bit is 1 → 1. Used to set specific bits. Setting a flag field in a header.' },
  { op: 'XOR', label: 'XOR',           symbol: '^',  color: '#f59e0b', desc: 'Exactly one bit is 1 → 1. Used in parity, CRC, checksums, encryption (OTP XOR).' },
  { op: 'NOT', label: 'NOT (invert)',   symbol: '~',  color: '#a78bfa', desc: 'Flip every bit. Used to compute wildcard masks from subnet masks.' },
  { op: 'SHL', label: 'Shift Left <<', symbol: '<<', color: '#f472b6', desc: 'Shift all bits left by N positions. Each left shift × 2. Used in CIDR prefix construction.' },
  { op: 'SHR', label: 'Shift Right >>',symbol: '>>', color: '#fb923c', desc: 'Shift all bits right by N positions. Each right shift ÷ 2. Extracting bit fields from headers.' },
]

function BitwiseVisualizer() {
  const [op, setOp] = useState<BitwiseOp>('AND')
  const [aStr, setAStr] = useState('192')
  const [bStr, setBStr] = useState('255')
  const [shift, setShift] = useState(2)

  const a = parseInt(aStr, 10)
  const b = parseInt(bStr, 10)
  const aOk = !isNaN(a) && a >= 0 && a <= 255
  const bOk = !isNaN(b) && b >= 0 && b <= 255

  function compute(): number | null {
    if (!aOk) return null
    switch (op) {
      case 'AND': return bOk ? a & b : null
      case 'OR':  return bOk ? a | b : null
      case 'XOR': return bOk ? a ^ b : null
      case 'NOT': return (~a) & 0xFF
      case 'SHL': return (a << shift) & 0xFF
      case 'SHR': return (a >> shift) & 0xFF
    }
  }

  const result = compute()
  const cur = OPS.find(o => o.op === op)!
  const needsB = op === 'AND' || op === 'OR' || op === 'XOR'
  const needsShift = op === 'SHL' || op === 'SHR'

  function BitRow({ val, label, color }: { val: number; label: string; color: string }) {
    const bits = toBin8(val < 0 ? 0 : val > 255 ? 255 : val)
    return (
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
        <span style={{ fontSize: 12, color, fontFamily: FONT_MONO, fontWeight: 700, minWidth: 80 }}>{label} = {val}</span>
        <div style={{ display: 'flex', gap: 3 }}>
          {bits.split('').map((bit, i) => (
            <span key={i} style={{ fontFamily: FONT_MONO, fontSize: 15, fontWeight: 700, width: 22, textAlign: 'center', color: bit === '1' ? color : '#444', background: bit === '1' ? `${color}18` : 'transparent', borderRadius: 4, padding: '2px 0' }}>
              {bit}
            </span>
          ))}
        </div>
        <span style={{ fontSize: 13, color: '#a78bfa', fontFamily: FONT_MONO }}>0x{toHex2(val < 0 ? 0 : val > 255 ? 255 : val)}</span>
      </div>
    )
  }

  return (
    <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 14, padding: 24, margin: '28px 0' }}>
      <p style={{ fontSize: 12, color: G, fontFamily: FONT_MONO, fontWeight: 700, margin: '0 0 16px' }}>// BITWISE OPERATIONS VISUALIZER</p>
      <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 20 }}>
        {OPS.map(o => (
          <button key={o.op} onClick={() => setOp(o.op)}
            style={{ padding: '6px 14px', borderRadius: 8, fontSize: 12, fontFamily: FONT_MONO, fontWeight: 700, cursor: 'pointer', border: `1px solid ${o.op === op ? o.color : 'var(--border)'}`, background: o.op === op ? `${o.color}18` : 'transparent', color: o.op === op ? o.color : 'var(--muted)' }}>
            {o.symbol} {o.label}
          </button>
        ))}
      </div>
      <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginBottom: 20 }}>
        <div>
          <p style={{ fontSize: 12, color: 'var(--muted)', margin: '0 0 6px' }}>A (0–255)</p>
          <input value={aStr} onChange={e => setAStr(e.target.value)}
            style={{ width: 90, padding: '8px 12px', borderRadius: 8, border: '1px solid var(--border)', background: 'var(--bg)', color: 'var(--text)', fontFamily: FONT_MONO, fontSize: 15 }} />
        </div>
        {needsB && (
          <div>
            <p style={{ fontSize: 12, color: 'var(--muted)', margin: '0 0 6px' }}>B (0–255)</p>
            <input value={bStr} onChange={e => setBStr(e.target.value)}
              style={{ width: 90, padding: '8px 12px', borderRadius: 8, border: '1px solid var(--border)', background: 'var(--bg)', color: 'var(--text)', fontFamily: FONT_MONO, fontSize: 15 }} />
          </div>
        )}
        {needsShift && (
          <div>
            <p style={{ fontSize: 12, color: 'var(--muted)', margin: '0 0 6px' }}>Shift amount</p>
            <div style={{ display: 'flex', gap: 4 }}>
              {[1, 2, 3, 4].map(n => (
                <button key={n} onClick={() => setShift(n)}
                  style={{ padding: '7px 12px', borderRadius: 8, fontSize: 13, fontFamily: FONT_MONO, fontWeight: 700, cursor: 'pointer', border: `1px solid ${n === shift ? cur.color : 'var(--border)'}`, background: n === shift ? `${cur.color}18` : 'transparent', color: n === shift ? cur.color : 'var(--muted)' }}>
                  {n}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
      {aOk && (needsB ? bOk : true) && result !== null && (
        <div style={{ background: '#0d1117', borderRadius: 10, padding: '16px 18px', border: '1px solid #30363d' }}>
          <BitRow val={a} label="A" color={cur.color} />
          {needsB && bOk && <BitRow val={b} label="B" color="#94a3b8" />}
          {needsShift && <p style={{ fontSize: 12, fontFamily: FONT_MONO, color: '#8b949e', margin: '4px 0 8px 90px' }}>shift by {shift}</p>}
          <div style={{ borderTop: '1px solid #30363d', margin: '10px 0', paddingTop: 2 }}>
            <span style={{ fontSize: 11, color: '#8b949e', fontFamily: FONT_MONO, marginLeft: 90 }}>
              {op === 'AND' ? '────── & ──────' : op === 'OR' ? '────── | ──────' : op === 'XOR' ? '────── ^ ──────' : op === 'NOT' ? '─ ~ (invert) ─' : op === 'SHL' ? `──── << ${shift} ────` : `──── >> ${shift} ────`}
            </span>
          </div>
          <BitRow val={result} label="Result" color={G} />
        </div>
      )}
      <p style={{ fontSize: 13, color: 'var(--muted)', marginTop: 14, lineHeight: 1.7 }}>{cur.desc}</p>
    </div>
  )
}

// ─── Page component ───────────────────────────────────────────────────────────

export default function BinaryAndHex() {
  return (
    <LearnLayout
      title="Binary, Hex & Number Systems"
      description="A complete, gap-free treatment of every number system used in networking — binary, hexadecimal, octal, and decimal — plus bitwise operations, two's complement, endianness, and how they appear in IP addresses, MAC addresses, subnets, and packet headers."
      section="Networking Fundamentals"
      readTime="45 min"
    >
      {/* ── Ch 01 ── */}
      <Chapter n="01" title="Why Number Systems Matter in Networking" subtitle="Binary and hex are not abstract math — they are everywhere in protocols" />
      <Para>
        Every network protocol is ultimately a specification of bits. IPv4 addresses are 32-bit binary numbers. MAC addresses are 48-bit hex numbers. A TCP port number is a 16-bit unsigned integer. A subnet mask is a sequence of 1s followed by 0s. VLAN tags, DSCP values, TTL fields, sequence numbers, checksum calculations — all require you to think in binary and hexadecimal fluently.
      </Para>
      <Para>
        Engineers who only work in decimal are forced to convert mentally — and they make mistakes. An engineer fluent in binary and hex reads <Accent>0xFF</Accent> and instantly knows it's 255, a full octet of ones, a broadcast address octet or a fully-set mask. They see <Accent>/24</Accent> and immediately know the mask is 11111111.11111111.11111111.00000000 = 255.255.255.0. This chapter builds that fluency from first principles.
      </Para>
      <StoryBox>
        You're on call. A firewall ACL is blocking traffic. The rule says: <strong>permit ip 172.16.0.0 0.0.255.255</strong>. Is 172.16.48.200 matched by this rule? To answer, you need to understand that 0.0.255.255 is a wildcard mask — the inverse of a subnet mask. You AND the address with the mask and compare to the network. Getting this wrong under pressure means an outage that lasts hours instead of minutes. Binary fluency is not academic — it is a professional survival skill.
      </StoryBox>

      <Divider />

      {/* ── Ch 02 ── */}
      <Chapter n="02" title="Positional Number Systems" subtitle="How any base works — the universal framework" />
      <Para>
        All positional number systems follow the same rule: the value of a digit depends on its <Accent>position</Accent>. Each position represents a power of the base. You already know this from decimal — you just never thought about why.
      </Para>
      <CodeBlock title="Positional value — the universal rule">
{`Decimal (base 10):
  4,729 = 4×10³ + 7×10² + 2×10¹ + 9×10⁰
        = 4×1000 + 7×100 + 2×10 + 9×1
        = 4000 + 700 + 20 + 9 = 4,729

Binary (base 2):
  1011 = 1×2³ + 0×2² + 1×2¹ + 1×2⁰
       = 8    + 0    + 2    + 1   = 11 (decimal)

Hexadecimal (base 16):
  2F  = 2×16¹ + F×16⁰
      = 2×16  + 15×1
      = 32    + 15 = 47 (decimal)

The pattern:
  Position 0 (rightmost) = base⁰ = 1
  Position 1             = base¹ = base
  Position 2             = base² = base×base
  Position n             = baseⁿ`}
      </CodeBlock>
      <Para>
        Every number system uses exactly this framework. Once you understand it in decimal, understanding binary (base 2) and hex (base 16) is just swapping the base. The only difference: what digits are available. Decimal has 10 digits (0–9). Binary has 2 (0–1). Hex has 16 (0–9, then A–F representing 10–15).
      </Para>

      <H2>Powers of 2 — Memorize These</H2>
      <Para>
        Binary powers of 2 appear constantly in networking. Memorizing at least through 2¹⁶ pays off immediately:
      </Para>
      <CodeBlock title="Powers of 2 — essential table">
{`2⁰  = 1          2⁸  = 256         2¹⁶ = 65,536
2¹  = 2          2⁹  = 512         2¹⁷ = 131,072
2²  = 4          2¹⁰ = 1,024       2¹⁸ = 262,144
2³  = 8          2¹¹ = 2,048       2²⁴ = 16,777,216
2⁴  = 16         2¹² = 4,096       2³² = 4,294,967,296
2⁵  = 32         2¹³ = 8,192
2⁶  = 64         2¹⁴ = 16,384
2⁷  = 128        2¹⁵ = 32,768

Networking anchor points:
  2⁸  = 256  → number of values in one IPv4 octet (0–255)
  2¹⁶ = 65,536 → max TCP/UDP port number (0–65535)
  2³² = 4.3 billion → total IPv4 address space
  2⁴⁸ → total MAC address space
  2¹²⁸ → total IPv6 address space`}
      </CodeBlock>

      <Divider />

      {/* ── Ch 03 ── */}
      <Chapter n="03" title="Binary (Base 2)" subtitle="The native language of every computer and network device" />
      <Para>
        Binary is not a convenience — it is the <Accent>only number system that maps directly to the physical reality</Accent> of digital electronics. A transistor is either on (saturated) or off (cut off). A capacitor is either charged or discharged. Voltage is either above a threshold (1) or below it (0). Binary digit = bit (binary digit). All other representations are abstractions built on top of binary.
      </Para>

      <H2>Converting Decimal to Binary</H2>
      <Para>
        Two methods. The <Accent>subtraction method</Accent> is fastest for networking (IP addresses, subnet masks):
      </Para>
      <CodeBlock title="Subtraction method — fastest for IP addresses">
{`Convert 192 to binary:

Powers of 2:  128  64  32  16   8   4   2   1
              2⁷   2⁶  2⁵  2⁴  2³  2²  2¹  2⁰

Step 1: 192 ≥ 128? Yes → bit 7 = 1, remainder = 192 - 128 = 64
Step 2:  64 ≥ 64?  Yes → bit 6 = 1, remainder = 64 - 64 = 0
Step 3:   0 ≥ 32?  No  → bit 5 = 0
Step 4:   0 ≥ 16?  No  → bit 4 = 0
Step 5:   0 ≥ 8?   No  → bit 3 = 0
Step 6:   0 ≥ 4?   No  → bit 2 = 0
Step 7:   0 ≥ 2?   No  → bit 1 = 0
Step 8:   0 ≥ 1?   No  → bit 0 = 0

192 = 11000000

Verify: 128 + 64 = 192 ✓`}
      </CodeBlock>
      <CodeBlock title="Division method — systematic, good for any number">
{`Convert 172 to binary (divide by 2, track remainders):

172 ÷ 2 = 86  remainder 0  ← LSB (bit 0)
 86 ÷ 2 = 43  remainder 0
 43 ÷ 2 = 21  remainder 1
 21 ÷ 2 = 10  remainder 1
 10 ÷ 2 =  5  remainder 0
  5 ÷ 2 =  2  remainder 1
  2 ÷ 2 =  1  remainder 0
  1 ÷ 2 =  0  remainder 1  ← MSB (bit 7)

Read remainders bottom to top: 10101100
172 = 10101100

Verify: 128 + 0 + 32 + 0 + 8 + 4 + 0 + 0 = 172 ✓`}
      </CodeBlock>

      <H2>Converting Binary to Decimal</H2>
      <Para>
        Write down the bit values for each position, multiply each bit by its position value, sum the results:
      </Para>
      <CodeBlock title="Binary to decimal">
{`Binary:   1  1  0  1  0  1  0  0
Position: 7  6  5  4  3  2  1  0
Value:   128 64 32 16  8  4  2  1

Bits set: positions 7, 6, 4, 2 → 128 + 64 + 16 + 4 = 212

Shortcut for memorized subnet masks:
  11111111 = 128+64+32+16+8+4+2+1 = 255
  11111110 = 255 - 1 = 254
  11111100 = 255 - 3 = 252
  11111000 = 255 - 7 = 248
  11110000 = 255 - 15 = 240
  11100000 = 255 - 31 = 224
  11000000 = 255 - 63 = 192
  10000000 = 255 - 127 = 128`}
      </CodeBlock>

      <H2>Bits, Nibbles, Bytes, and Words</H2>
      <Para>
        <Accent>Bit:</Accent> One binary digit (0 or 1). The fundamental unit.
      </Para>
      <Para>
        <Accent>Nibble:</Accent> 4 bits. Can represent values 0–15. Exactly one hex digit. Why nibbles matter: you split a byte into two nibbles to convert to hex. A VLAN ID (12 bits) is three nibbles.
      </Para>
      <Para>
        <Accent>Byte (octet):</Accent> 8 bits. Can represent 256 values (0–255). One IPv4 address octet. One ASCII character. In networking, "octet" is technically more precise than "byte" because "byte" historically meant variable bit counts (5, 6, 7, or 8 bits) — the term "octet" always means exactly 8 bits.
      </Para>
      <Para>
        <Accent>Word:</Accent> Platform-dependent — historically 16 bits on 16-bit systems, 32 bits on 32-bit, 64 bits on 64-bit. In networking, "word" usually means 32 bits (IPv4 header fields are measured in 32-bit words — the IHL field says "header length in 32-bit words").
      </Para>
      <CodeBlock title="Size hierarchy">
{`1 bit      = 0 or 1
4 bits     = 1 nibble = 1 hex digit  (0–15, 0x0–0xF)
8 bits     = 1 byte/octet            (0–255, 0x00–0xFF)
16 bits    = 2 bytes                 (0–65535, used for ports)
32 bits    = 4 bytes                 (IPv4 address, TCP seq number)
48 bits    = 6 bytes                 (MAC address)
64 bits    = 8 bytes                 (IPv6 half-address)
128 bits   = 16 bytes                (IPv6 full address, UUID)

Common confusions:
  "Kbps" vs "KBps": lowercase b = bits, uppercase B = bytes
  1 Mbps download = 1,000,000 bits/s ÷ 8 = 125,000 bytes/s = 125 KB/s
  Your "100 Mbps" ISP link: max file download speed ≈ 12.5 MB/s`}
      </CodeBlock>

      <Divider />

      {/* ── Ch 04 ── */}
      <Chapter n="04" title="Hexadecimal (Base 16)" subtitle="The compact notation for binary data" />
      <Para>
        Hexadecimal exists for one reason: binary is <em>hard to read</em> for humans. A 48-bit MAC address in binary is 48 characters of 0s and 1s — impossible to parse at a glance. In hex, the same address is 12 characters: <Accent>A4:C3:F0:85:AC:2B</Accent>. Every group of 4 binary bits maps to exactly one hex digit. This makes hex the natural compression format for binary data.
      </Para>

      <H2>Hex Digits</H2>
      <CodeBlock title="Hex digit table — the full mapping">
{`Decimal  Binary  Hex    Decimal  Binary  Hex
   0     0000    0         8     1000    8
   1     0001    1         9     1001    9
   2     0010    2        10     1010    A
   3     0011    3        11     1011    B
   4     0100    4        12     1100    C
   5     0101    5        13     1101    D
   6     0110    6        14     1110    E
   7     0111    7        15     1111    F

Prefix conventions:
  C/Python/Wireshark:   0xFF, 0xC0A80101
  Assembly:             FFh
  HTML/CSS color codes: #FF6600
  Network (MAC/IPv6):   A4:C3:F0:85:AC:2B or A4-C3-F0-85-AC-2B`}
      </CodeBlock>

      <H2>Binary ↔ Hex: The 4-Bit Shortcut</H2>
      <Para>
        Because 16 = 2⁴, every group of exactly 4 binary bits corresponds to exactly one hex digit. This makes conversion trivial — no arithmetic needed:
      </Para>
      <CodeBlock title="Binary ↔ Hex via nibble grouping">
{`Binary to hex — split into groups of 4 from the right:
  11000000.10101000.00000001.00000001  (192.168.1.1)

  Split each octet: 1100 0000 | 1010 1000 | 0000 0001 | 0000 0001
  Look up each:       C    0  |  A    8   |  0    1   |  0    1
  Result: C0.A8.01.01 = 0xC0A80101

Hex to binary — expand each hex digit to 4 bits:
  0xDEADBEEF
  D    E    A    D    B    E    E    F
  1101 1110 1010 1101 1011 1110 1110 1111

MAC address 00:1A:2B:3C:4D:5E:
  00   = 0000 0000
  1A   = 0001 1010
  2B   = 0010 1011
  3C   = 0011 1100
  4D   = 0100 1101
  5E   = 0101 1110`}
      </CodeBlock>

      <H2>Hex in Networking — Where You See It</H2>
      <Para>
        <Accent>MAC addresses:</Accent> 48-bit addresses written as 6 hex octets: <code style={{ fontFamily: FONT_MONO, fontSize: 13 }}>A4:C3:F0:85:AC:2B</code>. The first 3 octets (OUI — Organizationally Unique Identifier) identify the manufacturer. Wireshark resolves OUIs to vendor names.
      </Para>
      <Para>
        <Accent>IPv6 addresses:</Accent> 128-bit addresses written as 8 groups of 4 hex digits: <code style={{ fontFamily: FONT_MONO, fontSize: 13 }}>2001:0db8:85a3:0000:0000:8a2e:0370:7334</code>. Each group is 16 bits = 4 hex digits. Consecutive groups of all zeros can be compressed with <code style={{ fontFamily: FONT_MONO, fontSize: 13 }}>::</code>.
      </Para>
      <Para>
        <Accent>Ethernet EtherType field:</Accent> 2-byte hex code in every Ethernet frame header identifying the Layer 3 protocol: <code style={{ fontFamily: FONT_MONO, fontSize: 13 }}>0x0800</code> = IPv4, <code style={{ fontFamily: FONT_MONO, fontSize: 13 }}>0x0806</code> = ARP, <code style={{ fontFamily: FONT_MONO, fontSize: 13 }}>0x86DD</code> = IPv6, <code style={{ fontFamily: FONT_MONO, fontSize: 13 }}>0x8100</code> = VLAN (802.1Q).
      </Para>
      <Para>
        <Accent>Packet captures (Wireshark/tcpdump):</Accent> The hex dump view shows raw packet bytes in hex pairs. Reading a packet header directly requires converting hex fields to understand protocol values.
      </Para>
      <Para>
        <Accent>Cryptography and TLS:</Accent> Keys, IVs, hashes, certificate fingerprints — all expressed in hex. A SHA-256 hash is 256 bits = 32 bytes = 64 hex characters.
      </Para>

      <BaseConverter />

      <Divider />

      {/* ── Ch 05 ── */}
      <Chapter n="05" title="Octal (Base 8)" subtitle="Less common today, but still appears in Unix file permissions" />
      <Para>
        Octal (base 8) uses digits 0–7. Each octal digit represents exactly 3 binary bits. Octal was more common when computers had 6-bit, 12-bit, or 36-bit architectures. In modern networking, octal is rare — but you'll encounter it in one critical context: Unix/Linux file permissions.
      </Para>
      <CodeBlock title="Octal in Unix file permissions">
{`ls -la /etc/passwd
-rw-r--r-- 1 root root 2048 May 26 /etc/passwd

Permission bits: rw- r-- r--
Each group of 3 bits → one octal digit:

  Owner:  rw- = 110 = 6
  Group:  r-- = 100 = 4
  Other:  r-- = 100 = 4

chmod 644 /etc/passwd  ← octal 644 = owner rw, group r, other r
chmod 755 /etc/script  ← 7=rwx owner, 5=r-x group, 5=r-x other
chmod 600 ~/.ssh/id_rsa ← 6=rw owner only (SSH requires this)

3 bits per position × 3 positions = 9 permission bits
Plus 3 special bits (setuid, setgid, sticky) → full mode is 12 bits / 4 octal digits
  chmod 4755 /usr/bin/sudo ← setuid (4) + owner rwx (7) + group r-x (5) + other r-x (5)`}
      </CodeBlock>

      <H2>Binary ↔ Octal</H2>
      <Para>
        Group binary bits in sets of 3 (from the right) to convert to octal — each group of 3 bits = one octal digit:
      </Para>
      <CodeBlock title="Binary ↔ Octal">
{`Binary: 1 1 0 1 0 1 0 0
Group in 3s from right: 11 | 010 | 100
  → 011 | 010 | 100   (pad leftmost group to 3 bits)
  →   3     2     4
Octal: 324

Octal to decimal: 3×64 + 2×8 + 4×1 = 192 + 16 + 4 = 212
Decimal 212 → binary 11010100 → octal 324 ✓`}
      </CodeBlock>

      <Divider />

      {/* ── Ch 06 ── */}
      <Chapter n="06" title="Number System Conversions — Complete Reference" subtitle="Every conversion path, with worked examples" />
      <Para>
        The converter below lets you practice all conversions interactively. The conceptual map of all conversion paths:
      </Para>
      <CodeBlock title="Conversion paths summary">
{`  Decimal ←→ Binary:   division-by-2 method / positional sum
  Decimal ←→ Hex:      division-by-16 method / positional sum
    (or: Decimal → Binary → Hex via nibble grouping)
  Binary  ←→ Hex:      group 4 bits = 1 hex digit (fastest)
  Binary  ←→ Octal:    group 3 bits = 1 octal digit
  Hex     ←→ Octal:    Hex → Binary → Octal (no direct shortcut)

Fast mental conversions for networking:
  /8  mask  = 255.0.0.0      = 0xFF000000 = 11111111.00000000.00000000.00000000
  /16 mask  = 255.255.0.0    = 0xFFFF0000
  /24 mask  = 255.255.255.0  = 0xFFFFFF00
  /25 mask  = 255.255.255.128 = 0xFFFFFF80 (10000000)
  /26 mask  = 255.255.255.192 = 0xFFFFFFC0 (11000000)
  /27 mask  = 255.255.255.224 = 0xFFFFFFE0 (11100000)
  /28 mask  = 255.255.255.240 = 0xFFFFFFF0 (11110000)
  /29 mask  = 255.255.255.248 = 0xFFFFFFF8 (11111000)
  /30 mask  = 255.255.255.252 = 0xFFFFFFFC (11111100)
  /31 mask  = 255.255.255.254 = 0xFFFFFFFE (11111110)
  /32 mask  = 255.255.255.255 = 0xFFFFFFFF (all 1s)`}
      </CodeBlock>

      <IPBinaryBreakdown />

      <Divider />

      {/* ── Ch 07 ── */}
      <Chapter n="07" title="Signed Numbers and Two's Complement" subtitle="How negative numbers work in binary — and why it matters for protocol fields" />
      <Para>
        Networking protocol fields are mostly unsigned integers (port numbers, TTL, sequence numbers are always non-negative). But understanding signed binary arithmetic matters when: reading C code that parses headers, understanding TCP sequence number wraparound, analyzing signed vs unsigned overflow vulnerabilities, and working with routing metrics that can be negative.
      </Para>

      <H2>Sign-Magnitude (naive approach — not used)</H2>
      <Para>
        The obvious idea: use the most-significant bit as a sign bit (0 = positive, 1 = negative), with the remaining bits as the magnitude. Problem: two representations of zero (+0 = 00000000, -0 = 10000000), and subtraction circuits don't simplify. This approach was used in very early computers but abandoned.
      </Para>

      <H2>Two's Complement (universal standard)</H2>
      <Para>
        In two's complement, the MSB has a negative positional value: for an 8-bit signed integer, bit 7 = -128 instead of +128. All other bits retain their normal positive values.
      </Para>
      <CodeBlock title="Two's complement — signed 8-bit range">
{`Bit pattern   Unsigned value   Signed (two's complement)
00000000           0                  0
00000001           1                  1
01111111          127                127   ← max positive
10000000          128               -128   ← MSB = -128
10000001          129               -127
11111110          254                 -2
11111111          255                 -1

Value formula: -(bit7 × 128) + (bit6 × 64) + ... + (bit0 × 1)

For 10000001:
  -(1 × 128) + (0×64) + (0×32) + (0×16) + (0×8) + (0×4) + (0×2) + (1×1)
  = -128 + 1 = -127 ✓`}
      </CodeBlock>

      <H2>Computing Two's Complement (negating a number)</H2>
      <Para>
        To negate a number in two's complement: <Accent>invert all bits, then add 1</Accent>.
      </Para>
      <CodeBlock title="Two's complement negation">
{`Negate +45 (00101101) to get -45:

Step 1 — Invert all bits:  00101101 → 11010010
Step 2 — Add 1:            11010010 + 00000001 = 11010011

Verify: 11010011 = -(1×128) + (1×64) + (0×32) + (1×16) + (0×8) + (0×4) + (1×2) + (1×1)
                 = -128 + 64 + 16 + 2 + 1 = -45 ✓

Practical application — One's complement in checksums:
  The Internet Checksum (TCP, UDP, IPv4 headers) uses one's complement addition
  One's complement = just invert all bits (no +1)
  The checksum is designed so that summing all words + checksum = all 1s (0xFFFF)
  At receiver: if sum ≠ 0xFFFF, the header is corrupted`}
      </CodeBlock>

      <H2>Integer Overflow and TCP Sequence Numbers</H2>
      <Para>
        TCP sequence numbers are 32-bit unsigned integers (0 to 4,294,967,295). They wrap around: after 4,294,967,295, the next sequence number is 0. TCP is designed to handle this correctly using modular arithmetic comparisons — <code style={{ fontFamily: FONT_MONO, fontSize: 13 }}>SEQ_GT(a, b)</code> uses <code style={{ fontFamily: FONT_MONO, fontSize: 13 }}>(a - b) &gt; 0</code> with unsigned arithmetic to handle wraparound.
      </Para>
      <Para>
        On a 10 Gbps link transferring data at full speed: 10 Gbps = 1.25 GB/s. 4 GB / 1.25 GB/s = 3.2 seconds to cycle through all sequence numbers. The TCP Protection Against Wrapped Sequences (PAWS) extension uses timestamps to disambiguate wrapped-around sequence numbers.
      </Para>

      <Divider />

      {/* ── Ch 08 ── */}
      <Chapter n="08" title="Bitwise Operations in Networking" subtitle="AND, OR, XOR, NOT, shifts — the operations behind subnetting and headers" />
      <Para>
        Bitwise operations work on individual bits of a number. They are not abstract algebra — they appear constantly in real protocol processing: subnet calculation, header field extraction, flag setting/testing, and checksum computation.
      </Para>

      <BitwiseVisualizer />

      <H2>AND — Subnet Masking</H2>
      <Para>
        Bitwise AND is the operation behind every subnet calculation. To find the network address of an IP address:
        <Accent> Network = IP AND Subnet Mask</Accent>
      </Para>
      <CodeBlock title="Subnet masking with AND">
{`IP address:    192.168.10.45   = 11000000.10101000.00001010.00101101
Subnet mask:   255.255.255.0   = 11111111.11111111.11111111.00000000
                                 ────────────────────────────────────── AND
Network addr:  192.168.10.0    = 11000000.10101000.00001010.00000000

Rule: wherever the mask bit is 1 → keep the IP bit
      wherever the mask bit is 0 → force bit to 0
The result is the network address.

For /26 subnet (255.255.255.192 = ...11000000):
IP:    192.168.1.100 = ...01100100
Mask:  255.255.255.192 = ...11000000
                         ─────────── AND
Network: 192.168.1.64  = ...01000000`}
      </CodeBlock>

      <H2>OR — Setting Bits</H2>
      <Para>
        OR sets specific bits to 1 without affecting others. Used to: calculate broadcast addresses, set flag fields in headers, construct IP addresses from network+host portions.
      </Para>
      <CodeBlock title="Broadcast address with OR">
{`Broadcast = Network OR Wildcard_Mask
Wildcard mask = bitwise NOT of subnet mask

Network:  192.168.10.0   = ...00001010.00000000
Wildcard: 0.0.0.255      = ...00000000.11111111
                           ──────────────────── OR
Broadcast:192.168.10.255 = ...00001010.11111111

Setting the ACK flag in a TCP flags byte:
  current_flags = 0x02  (00000010 = SYN set)
  ACK_bit = 0x10        (00010000 = ACK position)
  new_flags = 0x02 | 0x10 = 0x12 (00010010 = SYN+ACK)`}
      </CodeBlock>

      <H2>XOR — Checksums and Encryption</H2>
      <Para>
        XOR has a unique property: <Accent>A XOR B XOR B = A</Accent>. XORing with the same value twice gives back the original. This makes XOR the foundation of stream ciphers (one-time pad: ciphertext = plaintext XOR key; recover plaintext = ciphertext XOR key). It's also used in RAID-5/6 parity: Parity = Block1 XOR Block2 XOR Block3. If one block is lost, it's recovered by XOR of the remaining blocks with parity.
      </Para>
      <CodeBlock title="XOR properties — networking uses">
{`A XOR A = 0      (anything XORed with itself = 0)
A XOR 0 = A      (XOR with 0 = identity)
A XOR B = B XOR A (commutative)

CRC computation (simplified): treat data as polynomial, XOR operations
  throughout — CRC-32 = polynomial division using XOR, no borrowing

Wireshark highlights XOR in VXLAN/GENEVE UDP source port selection:
  Source port = hash of inner L2/L3/L4 headers → distribute across ECMP paths
  Hash typically uses XOR of source+dest IPs and ports`}
      </CodeBlock>

      <H2>NOT — Inverting Masks</H2>
      <Para>
        Bitwise NOT flips every bit. In networking: <Accent>Wildcard mask = NOT(Subnet mask)</Accent>. Cisco ACLs use wildcard masks (inverted subnet masks). A wildcard mask of 0.0.0.255 means "match any value in the last octet."
      </Para>
      <CodeBlock title="Wildcard mask = NOT subnet mask">
{`Subnet mask:   255.255.255.0 = 11111111.11111111.11111111.00000000
NOT:                           00000000.00000000.00000000.11111111
Wildcard mask: 0.0.0.255

ACL rule: permit ip 10.0.0.0 0.255.255.255
  → match any IP with first octet = 10 (10.0.0.0/8)

Rule: in wildcard masks, 0 = must match, 1 = don't care
  (opposite of subnet mask: 1 = match, 0 = don't care)`}
      </CodeBlock>

      <H2>Bit Shifts — Extracting Header Fields</H2>
      <Para>
        Left shift (<code style={{ fontFamily: FONT_MONO, fontSize: 13 }}>{'<<'}</code>) multiplies by 2ⁿ. Right shift (<code style={{ fontFamily: FONT_MONO, fontSize: 13 }}>{'>>'}</code>) divides by 2ⁿ. In networking, shifts extract or insert multi-bit fields within a byte or word:
      </Para>
      <CodeBlock title="Bit shifts — reading packet header fields">
{`IPv4 header first byte:
  Version (bits 7-4) | IHL (bits 3-0)

Read version from first byte (0x45 = 0100 0101):
  version = (0x45 >> 4) = 0x04 = 4    ← shift right 4, keep upper nibble
  ihl     = (0x45 & 0x0F) = 0x05 = 5  ← AND with 0x0F, keep lower nibble
  header_length_bytes = ihl × 4 = 20 bytes

Constructing a byte with two 4-bit fields:
  version = 4  (0100)
  ihl     = 5  (0101)
  first_byte = (version << 4) | ihl
             = (0x04 << 4) | 0x05
             = 0x40 | 0x05 = 0x45 ✓

DSCP field extraction from IPv4 ToS byte:
  tos_byte = 0xB8 (1011 1000) = EF (Expedited Forwarding)
  dscp = tos_byte >> 2       = 0x2E = 46 (DSCP EF)
  ecn  = tos_byte & 0x03     = 0x00 (no ECN)`}
      </CodeBlock>

      <Err title="Forgetting operator precedence in bitwise expressions">
        <Para>In C and most languages, <code style={{ fontFamily: FONT_MONO, fontSize: 13 }}>x &amp; 0x0F == 0</code> is evaluated as <code style={{ fontFamily: FONT_MONO, fontSize: 13 }}>x &amp; (0x0F == 0)</code> — not <code style={{ fontFamily: FONT_MONO, fontSize: 13 }}>(x &amp; 0x0F) == 0</code> — because == has higher precedence than &amp;. This is a real source of bugs in packet parsing code. Always use explicit parentheses: <code style={{ fontFamily: FONT_MONO, fontSize: 13 }}>(x &amp; 0x0F) == 0</code>.</Para>
      </Err>

      <Divider />

      {/* ── Ch 09 ── */}
      <Chapter n="09" title="Binary in IP Addressing and Subnetting" subtitle="Binary thinking is the only way to truly understand IP" />
      <Para>
        IPv4 addresses and subnet masks only make sense in binary. Decimal notation (192.168.1.0/24) is a human-readable convenience — every routing and forwarding decision is made in binary.
      </Para>

      <H2>CIDR Prefix Length</H2>
      <Para>
        A CIDR prefix /N means the first N bits are the <Accent>network portion</Accent> and the remaining (32-N) bits are the <Accent>host portion</Accent>. The subnet mask is simply N consecutive 1s followed by (32-N) zeros:
      </Para>
      <CodeBlock title="CIDR prefix to subnet mask">
{`/24 → 24 ones, 8 zeros:
  11111111 11111111 11111111 00000000 = 255.255.255.0
  Hosts: 2⁸ - 2 = 254 (subtract network and broadcast)

/26 → 26 ones, 6 zeros:
  11111111 11111111 11111111 11000000 = 255.255.255.192
  Hosts: 2⁶ - 2 = 62

/30 → 30 ones, 2 zeros:
  11111111 11111111 11111111 11111100 = 255.255.255.252
  Hosts: 2² - 2 = 2  (point-to-point links use /30 or /31)

/31 → 31 ones, 1 zero:
  11111111 11111111 11111111 11111110 = 255.255.255.254
  RFC 3021: /31 allows 2 usable addresses (no network/broadcast — point-to-point)

/32 → all 32 ones:
  11111111 11111111 11111111 11111111 = 255.255.255.255
  Host route — exactly one specific address`}
      </CodeBlock>

      <H2>Subnetting Step by Step (Binary Method)</H2>
      <Para>
        Given: network 192.168.1.0/24, need 4 equal subnets. Each subnet borrows 2 bits (2² = 4 subnets):
      </Para>
      <CodeBlock title="Subnetting in binary">
{`Original: 192.168.1.0/24 = 192.168.1.  00000000
Borrow 2 host bits → /26 = 192.168.1.  XX000000

Subnet 00: 192.168.1.00000000 = 192.168.1.0/26   (hosts: .1–.62)
Subnet 01: 192.168.1.01000000 = 192.168.1.64/26  (hosts: .65–.126)
Subnet 10: 192.168.1.10000000 = 192.168.1.128/26 (hosts: .129–.190)
Subnet 11: 192.168.1.11000000 = 192.168.1.192/26 (hosts: .193–.254)

Network increment = 2^(host bits) = 2^6 = 64
Verify: 0, 64, 128, 192 — each subnet starts 64 apart ✓

Broadcast of each subnet = next subnet address - 1:
  .0/26 broadcast = .63
  .64/26 broadcast = .127
  .128/26 broadcast = .191
  .192/26 broadcast = .255`}
      </CodeBlock>

      <H2>Is This Host in This Subnet? (Binary Test)</H2>
      <Para>
        To determine if two addresses are in the same subnet, AND both with the subnet mask and compare the results:
      </Para>
      <CodeBlock title="Subnet membership test">
{`Is 192.168.1.100 in subnet 192.168.1.64/26?

Host:   192.168.1.100 = ...01100100
Mask:   255.255.255.192 = ...11000000
                          ──────────── AND
Result: 192.168.1.64  = ...01000000  ← network address

Subnet: 192.168.1.64
Match? 192.168.1.64 == 192.168.1.64 → YES ✓

Is 192.168.1.200 in subnet 192.168.1.64/26?
Host:   ...11001000
Mask:   ...11000000
                    AND
Result: ...11000000 = 192.168.1.192 ≠ 192.168.1.64 → NO ✗`}
      </CodeBlock>

      <WowBox emoji="🔢" title="IPv6 addresses and hex">
        <Para>IPv6 addresses are 128 bits, written as 8 groups of 4 hex digits (32 hex chars total). <code style={{ fontFamily: FONT_MONO, fontSize: 13 }}>2001:0db8:85a3:0000:0000:8a2e:0370:7334</code>. Two compression rules: (1) leading zeros in each group can be omitted: <code style={{ fontFamily: FONT_MONO, fontSize: 13 }}>2001:db8:85a3:0:0:8a2e:370:7334</code>; (2) one consecutive run of all-zero groups can be replaced with <code style={{ fontFamily: FONT_MONO, fontSize: 13 }}>::</code>: <code style={{ fontFamily: FONT_MONO, fontSize: 13 }}>2001:db8:85a3::8a2e:370:7334</code>. The <code style={{ fontFamily: FONT_MONO, fontSize: 13 }}>::</code> can only appear once. IPv6 prefix length works the same as IPv4: /64 means the first 64 bits are the network prefix.</Para>
      </WowBox>

      <Divider />

      {/* ── Ch 10 ── */}
      <Chapter n="10" title="Endianness" subtitle="Byte order — why the same number looks different on different machines" />
      <Para>
        When a multi-byte number (like a 32-bit IP address or a 16-bit port number) is stored in memory or transmitted over a network, the bytes must be placed in some order. <Accent>Endianness</Accent> is the convention that determines which byte comes first.
      </Para>

      <H2>Big-Endian vs Little-Endian</H2>
      <Para>
        <Accent>Big-endian</Accent> (network byte order): the most significant byte (MSB) is stored at the lowest memory address / sent first on the wire. Storing the 32-bit value 0x12345678 in memory starting at address 0x1000:
      </Para>
      <CodeBlock title="Big-endian vs Little-endian storage">
{`Value: 0x12345678 (decimal: 305,419,896)
Bytes: [0x12] [0x34] [0x56] [0x78]

Big-endian (network byte order):
  Address: 0x1000  0x1001  0x1002  0x1003
  Byte:      0x12    0x34    0x56    0x78
  MSB first (most significant byte at lowest address)

Little-endian (x86/x86-64, ARM in default mode):
  Address: 0x1000  0x1001  0x1002  0x1003
  Byte:      0x78    0x56    0x34    0x12
  LSB first (least significant byte at lowest address)

Networks always use big-endian — this is why it's called "network byte order".
All protocol field values in packet headers are big-endian.`}
      </CodeBlock>

      <H2>Why It Matters for Networking Code</H2>
      <Para>
        x86/x86-64 CPUs (virtually all PCs and servers) are little-endian. Network protocols are big-endian. Every time you read a multi-byte field from a packet in C code, you must convert:
      </Para>
      <CodeBlock title="Byte order conversion in C">
{`#include <arpa/inet.h>

// Network to host (big-endian → CPU native endian)
uint16_t port = ntohs(tcp_header->dest_port);   // 16-bit
uint32_t addr = ntohl(ip_header->dest_addr);     // 32-bit

// Host to network (CPU native → big-endian for sending)
tcp_header->dest_port = htons(443);              // 16-bit
ip_header->dest_addr  = htonl(0xC0A80101);      // 32-bit

// On big-endian systems (SPARC, MIPS, some ARM):
//   ntohs/htons are no-ops — no byte swap needed
// On little-endian (x86/x86-64):
//   these functions reverse the bytes

Python equivalent (using struct module):
  import struct
  port = struct.unpack('!H', data[0:2])[0]  # '!' = network byte order
  addr = struct.unpack('!I', data[0:4])[0]  # 'I' = unsigned 32-bit int`}
      </CodeBlock>

      <H2>Wireshark and Endianness</H2>
      <Para>
        Wireshark handles byte-order conversion transparently — it reads raw network (big-endian) bytes and displays them as human-readable decimal or hex values. When you see a TCP port of 443 in Wireshark, the actual bytes in the packet are <code style={{ fontFamily: FONT_MONO, fontSize: 13 }}>0x01 0xBB</code> (big-endian: 0×256 + 187 = 443). If you look at the raw hex dump in Wireshark's packet bytes panel, you'll see these raw bytes.
      </Para>

      <Warn title="Endianness trap in protocol parsing">
        <Para>A common bug: reading a 16-bit port number without byte-swap conversion on a little-endian machine. Port 443 (0x01BB) would be read as 0xBB01 = 47873 — completely wrong. Always use htons/ntohs (C) or struct.pack with '!' prefix (Python) for any multi-byte field read from a packet.</Para>
      </Warn>

      <Divider />

      {/* ── Ch 11 ── */}
      <Chapter n="11" title="Binary in Packet Headers" subtitle="Reading real protocol headers in hex and binary" />
      <Para>
        Everything you've learned now combines. Let's read a real IPv4 header byte by byte, extracting every field in binary and hex.
      </Para>

      <H2>IPv4 Header — Binary Field Extraction</H2>
      <CodeBlock title="Real IPv4 header hex dump → field parsing">
{`Raw hex bytes (first 20 bytes = minimum IPv4 header):
45 00 00 3c 1a 46 40 00 40 06 a6 ec c0 a8 01 01 c0 a8 01 02

Byte-by-byte breakdown:
  0x45 → Version=4 (0100), IHL=5 (0101) → header=20 bytes
  0x00 → DSCP=0 (best effort), ECN=0
  0x00 0x3c → Total Length = 0x003C = 60 bytes
  0x1a 0x46 → Identification = 0x1A46 = 6726
  0x40 0x00 → Flags=010 (DF set, no MF), Fragment Offset=0
              0x40 = 0100 0000 → bit 6 set = DF (Don't Fragment)
  0x40 → TTL = 64 hops
  0x06 → Protocol = 6 = TCP
  0xa6 0xec → Header Checksum = 0xA6EC
  0xc0 0xa8 0x01 0x01 → Src IP = 192.168.1.1
  0xc0 0xa8 0x01 0x02 → Dst IP = 192.168.1.2

Flags field (3 bits): 0x40 >> 5 = 010
  bit 0 (MSB): reserved = 0
  bit 1: DF (Don't Fragment) = 1 ← set
  bit 2: MF (More Fragments) = 0`}
      </CodeBlock>

      <H2>TCP Header — Binary Field Extraction</H2>
      <CodeBlock title="TCP header hex dump → field parsing">
{`TCP header start (20 bytes minimum):
c8 f6 01 bb 00 00 00 01 00 00 00 00 a0 02 ff ff ...

  0xc8 0xf6 → Source Port = 0xC8F6 = 51446
  0x01 0xbb → Dest Port   = 0x01BB = 443  (HTTPS)
  0x00 0x00 0x00 0x01 → Sequence Number = 1
  0x00 0x00 0x00 0x00 → Acknowledgment Number = 0
  0xa0 → Data Offset = 0xA >> = 10 (in nibble: 1010 → 10 words = 40 bytes header)
          (0xa0 = 1010 0000 → upper nibble 1010 = 10, lower nibble 0000 = reserved)
  0x02 → Flags byte = 0000 0010 = SYN set
          bit 0 (FIN) = 0
          bit 1 (SYN) = 1 ← SYN packet
          bit 2 (RST) = 0
          bit 3 (PSH) = 0
          bit 4 (ACK) = 0
          bit 5 (URG) = 0
  0xff 0xff → Window Size = 65535 bytes`}
      </CodeBlock>

      <H2>MAC Address OUI Lookup</H2>
      <CodeBlock title="MAC address breakdown">
{`MAC: A4:C3:F0:85:AC:2B

Bytes:  A4   C3   F0   85   AC   2B
Hex:   0xA4 0xC3 0xF0 0x85 0xAC 0x2B
Bin:  10100100 11000011 11110000 10000101 10101100 00101011

First byte (0xA4 = 10100100):
  bit 0 (LSB): multicast bit = 0 → unicast address
  bit 1:       locally administered bit = 0 → globally unique (OUI-assigned)
  bits 7-2:    part of OUI

OUI (first 3 bytes): A4:C3:F0 = Apple, Inc.

Special MAC addresses:
  FF:FF:FF:FF:FF:FF = broadcast (all bits 1)
  01:00:5E:xx:xx:xx = IPv4 multicast (first 3 bytes fixed, last 23 bits = low 23 bits of multicast group)
  33:33:xx:xx:xx:xx = IPv6 multicast (first 2 bytes = 0x3333)
  00:00:00:00:00:00 = unset/invalid`}
      </CodeBlock>

      <Divider />

      {/* ── Ch 12 ── */}
      <Chapter n="12" title="Practical Tools for Binary and Hex" subtitle="Working with binary in the real world" />
      <Para>
        Theory is only useful if you can apply it at the command line, in code, and in protocol analysis tools.
      </Para>

      <H2>Command-Line Number Conversions</H2>
      <CodeBlock title="Shell and Python conversions">
{`# Bash — printf for base conversion
printf "%d\\n" 0xFF         # hex to decimal: 255
printf "%x\\n" 255          # decimal to hex: ff
printf "%o\\n" 255          # decimal to octal: 377
printf "%08b\\n" 192        # decimal to binary (zsh/bash with printf %b): 11000000

# Python — most flexible
>>> bin(192)        # '0b11000000'
>>> hex(192)        # '0xc0'
>>> oct(192)        # '0o300'
>>> int('C0', 16)   # 192  ← hex string to int
>>> int('11000000', 2)  # 192  ← binary string to int
>>> format(192, '08b')  # '11000000'  ← zero-padded binary
>>> format(192, '02x')  # 'c0'  ← zero-padded hex

# Python socket library for IP address binary
>>> import socket, struct
>>> socket.inet_aton('192.168.1.1')        # b'\\xc0\\xa8\\x01\\x01'
>>> socket.inet_ntoa(b'\\xc0\\xa8\\x01\\x01')  # '192.168.1.1'

# Python struct for network byte order
>>> import struct
>>> struct.pack('!H', 443)           # b'\\x01\\xbb'  (big-endian port 443)
>>> struct.unpack('!H', b'\\x01\\xbb') # (443,)`}
      </CodeBlock>

      <H2>ipcalc — Subnet Calculator</H2>
      <CodeBlock title="ipcalc output">
{`$ ipcalc 192.168.10.45/26

Address:   192.168.10.45        11000000.10101000.00001010. 00101101
Netmask:   255.255.255.192 = 26  11111111.11111111.11111111. 11000000
Wildcard:  0.0.0.63             00000000.00000000.00000000. 00111111
Network:   192.168.10.0/26      11000000.10101000.00001010. 00000000
HostMin:   192.168.10.1         11000000.10101000.00001010. 00000001
HostMax:   192.168.10.62        11000000.10101000.00001010. 00111110
Broadcast: 192.168.10.63        11000000.10101000.00001010. 00111111
Hosts/Net: 62                   Class C, Private Internet`}
      </CodeBlock>

      <H2>Wireshark Hex Dump</H2>
      <Para>
        In Wireshark: select any packet → bottom panel shows raw bytes. Left column = hex pairs, right column = ASCII interpretation (dots for non-printable bytes). Clicking on a field in the middle panel highlights the corresponding hex bytes at the bottom. This is how you verify your binary/hex understanding against real traffic.
      </Para>
      <CodeBlock title="tcpdump hex output">
{`# Capture and display hex+ascii dump
tcpdump -XX -i eth0 -n host 192.168.1.1

# Output example (first packet):
IP 192.168.1.1 > 192.168.1.2: ICMP echo request
    0x0000:  4500 003c 1a46 4000 4001 a6f0 c0a8 0101  E..<.F@.@.......
    0x0010:  c0a8 0102 0800 ...                        ................
             ────────────────
             c0a8 0101 = 192.168.1.1  (source IP in hex, big-endian)
             c0a8 0102 = 192.168.1.2  (dest IP in hex, big-endian)`}
      </CodeBlock>

      <Divider />

      {/* ── Ch 13 ── */}
      <Chapter n="13" title="Interview Questions" subtitle="From beginner to PhD" />

      <IQ q="Convert 172.16.5.0/22 to binary. How many hosts does this subnet support?" level="Beginner">
        172.16.5.0 in binary: 10101100.00010000.00000101.00000000. /22 means 22 bits of network, 10 bits of host. Hosts = 2¹⁰ - 2 = 1022. The subnet covers 172.16.4.0 through 172.16.7.255 (4 × /24 blocks).
      </IQ>

      <IQ q="What is 0xC0A80101? What is its significance in networking?" level="Beginner">
        0xC0 = 192, 0xA8 = 168, 0x01 = 1, 0x01 = 1 → 192.168.1.1. This is a private IPv4 address (RFC 1918 range 192.168.0.0/16), commonly used as a default gateway address on home/office routers.
      </IQ>

      <IQ q="A router receives a packet for 10.10.15.200. Its routing table has 10.10.0.0/16 and 10.10.15.0/24. Which route wins and why?" level="Intermediate">
        10.10.15.0/24 wins — longest prefix match. 10.10.15.200 AND 255.255.255.0 = 10.10.15.0 ✓ (matches /24). 10.10.15.200 AND 255.255.0.0 = 10.10.0.0 ✓ (also matches /16). When multiple routes match, routers always use the most specific (longest prefix) match. This is fundamental to IP routing and enables hierarchical aggregation without losing reachability to specific subnets.
      </IQ>

      <IQ q="Explain the TCP flags byte: what does 0x12 mean, and how do you extract individual flags using bitwise operations?" level="Intermediate">
        0x12 = 0001 0010 in binary. Bit 1 (SYN) = 1, bit 4 (ACK) = 1 → SYN-ACK packet (the second message in the TCP 3-way handshake). Extract flags: <code style={{ fontFamily: FONT_MONO, fontSize: 13 }}>syn = (flags {'>'}{'>'}  1) & 1</code>, <code style={{ fontFamily: FONT_MONO, fontSize: 13 }}>ack = (flags {'>'}{'>'}  4) & 1</code>. Or test: <code style={{ fontFamily: FONT_MONO, fontSize: 13 }}>is_ack = (flags & 0x10) != 0</code>.
      </IQ>

      <IQ q="What is network byte order? Why does it exist, and what happens if you forget to convert in a protocol parser?" level="Senior">
        Network byte order is big-endian (MSB first), standardized in RFC 791. It exists because different CPU architectures store multi-byte integers in different orders (x86 is little-endian, SPARC is big-endian). Without a standard, a port number written as 0x01BB by one machine would be read as 0xBB01 by another. Forgetting to convert: a 16-bit port 443 (0x01BB) is read as 47873 on a little-endian machine — a port that's almost certainly closed, causing silent connection failures that are hard to debug. In C, always use ntohs()/ntohl() for reading and htons()/htonl() for writing. In Python, use struct with '!' prefix.
      </IQ>

      <IQ q="Explain how IPv6 address compression works. What is the full expansion of 2001:db8::1? Design an algorithm to compress an IPv6 address." level="PhD">
        <Para>Full expansion of 2001:db8::1: the <code style={{ fontFamily: FONT_MONO, fontSize: 13 }}>::</code> replaces all consecutive zero groups needed to make 8 total. 2001:db8 is 2 groups → 5 zero groups needed → <code style={{ fontFamily: FONT_MONO, fontSize: 13 }}>2001:0db8:0000:0000:0000:0000:0000:0001</code>.</Para>
        <Para>Compression algorithm: (1) Split address into 8 16-bit groups. (2) Find all runs of consecutive zero groups. (3) Replace the longest run with <code style={{ fontFamily: FONT_MONO, fontSize: 13 }}>::</code> (if tie, replace the first). (4) Within each remaining group, remove leading zeros. RFC 5952 adds tie-breaking rules: if equal-length zero runs exist, replace the first one; the compressed form must be canonical (lowercase hex). Edge cases: <code style={{ fontFamily: FONT_MONO, fontSize: 13 }}>0:0:0:0:0:0:0:1</code> → <code style={{ fontFamily: FONT_MONO, fontSize: 13 }}>::1</code> (loopback); <code style={{ fontFamily: FONT_MONO, fontSize: 13 }}>0:0:0:0:0:0:0:0</code> → <code style={{ fontFamily: FONT_MONO, fontSize: 13 }}>::</code> (unspecified); IPv4-mapped: <code style={{ fontFamily: FONT_MONO, fontSize: 13 }}>0:0:0:0:0:FFFF:C0A8:0101</code> → <code style={{ fontFamily: FONT_MONO, fontSize: 13 }}>::ffff:192.168.1.1</code>.</Para>
      </IQ>

      <Divider />

      <KeyTakeaways items={[
        'All positional number systems follow the same rule: digit value × base^position. Binary (base 2) and hex (base 16) are just different bases of the same framework.',
        'Binary is the native language of computers — every IP address, MAC address, port number, and header field is ultimately a binary number. Decimal and hex are human conveniences.',
        'Each hex digit represents exactly 4 binary bits (a nibble). This makes hex ↔ binary conversion trivial — group bits in sets of 4 and look up the table.',
        'Memorize powers of 2 through 2¹⁶: 2⁸=256 (IPv4 octet range), 2¹⁶=65536 (port numbers), 2³²=4.3 billion (IPv4 address space).',
        'Two\'s complement is the universal standard for signed integers: negate by inverting all bits then adding 1. MSB has a negative weight (-128 for 8-bit).',
        'AND is subnet masking (network = IP & mask). OR sets bits (broadcast = network | wildcard). XOR is used in CRC, parity, and encryption. NOT inverts masks (wildcard = NOT mask).',
        'CIDR prefix /N means N bits of network, (32-N) bits of host. 2^(32-N) - 2 = usable hosts. Subnet boundaries are always multiples of 2^(32-N).',
        'Network byte order is big-endian (MSB first). x86/x86-64 CPUs are little-endian. Always use ntohs/ntohl (C) or struct with "!" (Python) when reading multi-byte fields from packets.',
        'IPv6 uses 128-bit hex addresses. Leading zeros in each group and consecutive all-zero groups (::) can be compressed. :: can only appear once per address.',
        'Bitwise operations on header fields: shift right to extract upper nibble (version), AND with mask to extract lower nibble (IHL), shift left to reconstruct. Always parenthesize bitwise expressions.',
        'ipcalc, Python struct/socket, and Wireshark hex dump are the practical tools for binary/hex work. Wireshark shows raw hex with field highlighting for protocol learning.',
      ]} />
    </LearnLayout>
  )
}
