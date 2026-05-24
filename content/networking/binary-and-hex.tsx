'use client'

import { useState } from 'react'
import { LearnLayout } from '@/components/content/LearnLayout'
import { KeyTakeaways } from '@/components/content/KeyTakeaways'

// ─── Helper components ────────────────────────────────────────────────────────

const ACC = '#10b981'

function Chapter({ n, title }: { n: number; title: string }) {
  const num = String(n).padStart(2, '0')
  return (
    <div style={{ marginBottom: 32 }}>
      <p style={{ fontSize: 11, color: ACC, fontFamily: 'var(--font-mono)', fontWeight: 700, margin: '0 0 6px', letterSpacing: '.12em' }}>
        // CHAPTER {num}
      </p>
      <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(22px,3.5vw,34px)', fontWeight: 900, letterSpacing: '-1.5px', color: 'var(--text)', margin: 0 }}>
        {title}
      </h2>
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
  return <strong style={{ color: ACC, fontWeight: 700 }}>{children}</strong>
}

function Code({ children }: { children: React.ReactNode }) {
  return <code style={{ fontFamily: 'var(--font-mono)', fontSize: 13, background: '#1e293b', color: '#e2e8f0', padding: '2px 7px', borderRadius: 5 }}>{children}</code>
}

function CodeBlock({ children }: { children: React.ReactNode }) {
  return (
    <pre style={{ fontFamily: 'var(--font-mono)', fontSize: 12.5, background: '#0d1525', border: '1px solid #1e293b', borderRadius: 10, padding: '18px 20px', overflowX: 'auto', lineHeight: 1.7, color: '#94a3b8', margin: '18px 0 24px' }}>
      {children}
    </pre>
  )
}

function StoryBox({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ background: '#0a1628', border: '1px solid #1e3a5f', borderLeft: '4px solid #3b82f6', borderRadius: 10, padding: '18px 22px', margin: '22px 0', fontSize: 14.5, color: '#cbd5e1', lineHeight: 1.85 }}>
      {children}
    </div>
  )
}

function WowBox({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ background: '#0a1a12', border: '1px solid #166534', borderLeft: '4px solid #10b981', borderRadius: 10, padding: '18px 22px', margin: '22px 0', fontSize: 14.5, color: '#bbf7d0', lineHeight: 1.85 }}>
      <span style={{ fontWeight: 800, color: '#10b981', fontSize: 12, letterSpacing: '.1em', display: 'block', marginBottom: 6 }}>WOW FACT</span>
      {children}
    </div>
  )
}

function Warn({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ background: '#1a1400', border: '1px solid #854d0e', borderLeft: '4px solid #f59e0b', borderRadius: 10, padding: '18px 22px', margin: '22px 0', fontSize: 14.5, color: '#fef08a', lineHeight: 1.85 }}>
      <span style={{ fontWeight: 800, color: '#f59e0b', fontSize: 12, letterSpacing: '.1em', display: 'block', marginBottom: 6 }}>CAUTION</span>
      {children}
    </div>
  )
}

function Err({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ background: '#1a0a0a', border: '1px solid #991b1b', borderLeft: '4px solid #ef4444', borderRadius: 10, padding: '18px 22px', margin: '22px 0', fontSize: 14.5, color: '#fecaca', lineHeight: 1.85 }}>
      <span style={{ fontWeight: 800, color: '#ef4444', fontSize: 12, letterSpacing: '.1em', display: 'block', marginBottom: 6 }}>MISCONCEPTION</span>
      {children}
    </div>
  )
}

const LEVEL_COLORS: Record<string, string> = {
  Beginner: '#10b981',
  Intermediate: '#3b82f6',
  Senior: '#8b5cf6',
  PhD: '#f97316',
}

function IQ({ level, children }: { level: 'Beginner' | 'Intermediate' | 'Senior' | 'PhD'; children: React.ReactNode }) {
  const c = LEVEL_COLORS[level]
  return (
    <div style={{ background: '#080d18', border: `1px solid ${c}40`, borderRadius: 12, padding: '18px 22px', margin: '22px 0' }}>
      <span style={{ display: 'inline-block', fontSize: 10, fontWeight: 800, color: c, background: `${c}18`, border: `1px solid ${c}40`, borderRadius: 20, padding: '3px 10px', letterSpacing: '.1em', textTransform: 'uppercase', marginBottom: 10 }}>
        {level}
      </span>
      <div style={{ fontSize: 14.5, color: '#cbd5e1', lineHeight: 1.85 }}>{children}</div>
    </div>
  )
}

// ─── Interactive 1: Number Base Converter ─────────────────────────────────────

function NumberConverter() {
  const [input, setInput] = useState('192')
  const [base, setBase] = useState<'decimal' | 'binary' | 'hex' | 'octal'>('decimal')

  let value = 0
  let parseError = false
  try {
    if (base === 'decimal') value = parseInt(input, 10)
    else if (base === 'binary') value = parseInt(input, 2)
    else if (base === 'hex') value = parseInt(input, 16)
    else value = parseInt(input, 8)
    if (isNaN(value) || value < 0 || value > 0xFFFFFFFF) parseError = true
  } catch {
    parseError = true
  }

  const dec = parseError ? '—' : value.toString(10)
  const bin = parseError ? '—' : value.toString(2).padStart(value > 255 ? 32 : value > 15 ? 8 : 4, '0')
  const hex = parseError ? '—' : value.toString(16).toUpperCase().padStart(2, '0')
  const oct = parseError ? '—' : value.toString(8)

  // Build nibble groups for binary
  const binGroups = !parseError ? (bin.match(/.{1,4}/g) ?? []) : []
  const hexGroups = !parseError && bin.length > 8
    ? (value.toString(16).toUpperCase().padStart(8, '0').match(/.{1,2}/g) ?? [])
    : []

  const COLORS = ['#10b981', '#3b82f6', '#8b5cf6', '#f97316', '#ef4444', '#06b6d4', '#ec4899', '#f59e0b']

  return (
    <div style={{ margin: '28px 0', background: '#080d18', border: '1px solid #1e293b', borderRadius: 14, overflow: 'hidden' }}>
      {/* Input */}
      <div style={{ padding: '16px 20px', borderBottom: '1px solid #1e293b', display: 'flex', flexWrap: 'wrap', gap: 10, alignItems: 'center' }}>
        <input
          value={input}
          onChange={e => setInput(e.target.value)}
          style={{ background: '#0d1525', border: `1px solid ${parseError ? '#ef4444' : '#1e293b'}`, borderRadius: 8, color: '#e2e8f0', padding: '8px 14px', fontSize: 16, fontFamily: 'monospace', width: 160 }}
          placeholder="Enter a number"
        />
        <div style={{ display: 'flex', gap: 6 }}>
          {(['decimal', 'binary', 'hex', 'octal'] as const).map(b => (
            <button
              key={b}
              onClick={() => setBase(b)}
              style={{
                padding: '6px 12px', borderRadius: 16, border: `1px solid ${base === b ? ACC : '#1e293b'}`,
                background: base === b ? `${ACC}18` : 'transparent',
                color: base === b ? ACC : '#64748b',
                fontSize: 11, fontWeight: 700, cursor: 'pointer', fontFamily: 'monospace',
              }}
            >{b}</button>
          ))}
        </div>
      </div>

      <div style={{ padding: '18px 20px' }}>
        {/* Results grid */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 20 }}>
          {[
            { label: 'Decimal (base 10)', value: dec, color: '#10b981' },
            { label: 'Hexadecimal (base 16)', value: `0x${hex}`, color: '#3b82f6' },
            { label: 'Octal (base 8)', value: `0${oct}`, color: '#8b5cf6' },
          ].map(r => (
            <div key={r.label} style={{ background: '#0d1525', borderRadius: 8, padding: '12px 16px' }}>
              <div style={{ fontSize: 11, color: '#475569', fontFamily: 'monospace', marginBottom: 4 }}>{r.label}</div>
              <div style={{ fontSize: 18, fontWeight: 800, color: r.color, fontFamily: 'monospace' }}>{r.value}</div>
            </div>
          ))}
          <div style={{ background: '#0d1525', borderRadius: 8, padding: '12px 16px', gridColumn: '1 / -1' }}>
            <div style={{ fontSize: 11, color: '#475569', fontFamily: 'monospace', marginBottom: 8 }}>Binary (base 2)</div>
            {!parseError && (
              <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap' }}>
                {binGroups.map((g, gi) => (
                  <div key={gi} style={{ display: 'flex', gap: 2 }}>
                    {g.split('').map((b, bi) => (
                      <div key={bi} style={{
                        width: 28, height: 28, borderRadius: 5, display: 'flex', alignItems: 'center', justifyContent: 'center',
                        background: b === '1' ? `${COLORS[gi % COLORS.length]}20` : '#0a0f1e',
                        border: `1px solid ${b === '1' ? COLORS[gi % COLORS.length] + '60' : '#1e293b'}`,
                        color: b === '1' ? COLORS[gi % COLORS.length] : '#334155',
                        fontSize: 13, fontWeight: 800, fontFamily: 'monospace',
                      }}>{b}</div>
                    ))}
                    {gi < binGroups.length - 1 && <div style={{ width: 4 }} />}
                  </div>
                ))}
              </div>
            )}
            {parseError && <div style={{ color: '#ef4444', fontFamily: 'monospace', fontSize: 13 }}>invalid input for {base} base</div>}
          </div>
        </div>

        {/* Byte breakdown for > 1 byte values */}
        {!parseError && value > 255 && hexGroups.length > 0 && (
          <div style={{ background: '#0a0f1e', borderRadius: 8, padding: '12px 16px', marginBottom: 12 }}>
            <div style={{ fontSize: 11, color: '#475569', fontFamily: 'monospace', marginBottom: 8 }}>Byte breakdown (most significant first)</div>
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              {hexGroups.map((hb, i) => (
                <div key={i} style={{ background: `${COLORS[i % COLORS.length]}10`, border: `1px solid ${COLORS[i % COLORS.length]}40`, borderRadius: 6, padding: '6px 10px', textAlign: 'center' }}>
                  <div style={{ fontSize: 14, fontWeight: 800, color: COLORS[i % COLORS.length], fontFamily: 'monospace' }}>0x{hb}</div>
                  <div style={{ fontSize: 10, color: '#475569', fontFamily: 'monospace' }}>byte {i + 1}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        <div style={{ fontSize: 11, color: '#334155', fontFamily: 'monospace', textAlign: 'center' }}>
          try networking values: 255, 192, 172, 10, 65535, 0xDEADBEEF
        </div>
      </div>
    </div>
  )
}

// ─── Interactive 2: Bitwise Operations Lab ────────────────────────────────────

const BITWISE_OPS = [
  { name: 'AND (&)', symbol: '&', color: '#10b981', op: (a: number, b: number) => a & b, desc: 'Both bits must be 1 to get 1. Used for subnet masks — extracts the network portion of an IP address.' },
  { name: 'OR (|)', symbol: '|', color: '#3b82f6', op: (a: number, b: number) => a | b, desc: 'Either bit being 1 produces 1. Used to set specific bits in a flags register.' },
  { name: 'XOR (^)', symbol: '^', color: '#8b5cf6', op: (a: number, b: number) => a ^ b, desc: 'Exactly one bit must be 1 to get 1. Used in CRC checksums and parity calculations.' },
  { name: 'NOT (~)', symbol: '~', color: '#f97316', op: (a: number) => (~a) & 0xFF, desc: 'Flips every bit. Used to invert subnet masks: ~255.0.0.0 = 0.255.255.255 (wildcard mask for ACLs).' },
  { name: 'Left Shift (<<)', symbol: '<<', color: '#ef4444', op: (a: number, b: number) => (a << b) & 0xFF, desc: 'Shifts bits left, filling right with zeros. Left shift by n = multiply by 2ⁿ. Used for fast power-of-2 operations.' },
  { name: 'Right Shift (>>)', symbol: '>>', color: '#06b6d4', op: (a: number, b: number) => (a >> b) & 0xFF, desc: 'Shifts bits right, filling left with zeros. Right shift by n = integer divide by 2ⁿ. Used to extract high bytes.' },
]

function toBin8(n: number) {
  return (n & 0xFF).toString(2).padStart(8, '0')
}

function BitwiseLab() {
  const [opIdx, setOpIdx] = useState(0)
  const [inputA, setInputA] = useState('192')
  const [inputB, setInputB] = useState('255')

  const op = BITWISE_OPS[opIdx]
  const a = parseInt(inputA, 10) & 0xFF
  const b = parseInt(inputB, 10) & 0xFF
  const isUnary = op.name.startsWith('NOT')
  const isShift = op.name.includes('Shift')
  const result = isUnary ? op.op(a, 0) : op.op(a, isShift ? (b & 7) : b)
  const aBin = toBin8(a)
  const bBin = toBin8(b)
  const rBin = toBin8(result)
  const COLORS = ['#10b981', '#3b82f6', '#8b5cf6', '#f97316', '#ef4444', '#06b6d4', '#ec4899']

  return (
    <div style={{ margin: '28px 0', background: '#080d18', border: '1px solid #1e293b', borderRadius: 14, overflow: 'hidden' }}>
      {/* Op selector */}
      <div style={{ padding: '14px 18px', borderBottom: '1px solid #1e293b', display: 'flex', flexWrap: 'wrap', gap: 8 }}>
        {BITWISE_OPS.map((o, i) => (
          <button
            key={o.name}
            onClick={() => setOpIdx(i)}
            style={{
              padding: '5px 12px', borderRadius: 16, border: `1px solid ${i === opIdx ? o.color : '#1e293b'}`,
              background: i === opIdx ? `${o.color}18` : 'transparent',
              color: i === opIdx ? o.color : '#64748b',
              fontSize: 11, fontWeight: 700, cursor: 'pointer', fontFamily: 'monospace',
            }}
          >{o.name}</button>
        ))}
      </div>

      <div style={{ padding: '18px 20px' }}>
        <p style={{ fontSize: 13, color: '#94a3b8', marginBottom: 18 }}>{op.desc}</p>

        {/* Inputs */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20, flexWrap: 'wrap' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
            <label style={{ fontSize: 11, color: '#475569', fontFamily: 'monospace' }}>A (0-255)</label>
            <input value={inputA} onChange={e => setInputA(e.target.value)} style={{ background: '#0d1525', border: '1px solid #1e293b', borderRadius: 6, color: '#e2e8f0', padding: '6px 10px', fontSize: 14, fontFamily: 'monospace', width: 80 }} />
          </div>
          {!isUnary && (
            <>
              <div style={{ fontSize: 22, color: op.color, fontFamily: 'monospace', fontWeight: 900, marginTop: 18 }}>{op.symbol}</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                <label style={{ fontSize: 11, color: '#475569', fontFamily: 'monospace' }}>{isShift ? 'Shift by (0-7)' : 'B (0-255)'}</label>
                <input value={inputB} onChange={e => setInputB(e.target.value)} style={{ background: '#0d1525', border: '1px solid #1e293b', borderRadius: 6, color: '#e2e8f0', padding: '6px 10px', fontSize: 14, fontFamily: 'monospace', width: 80 }} />
              </div>
            </>
          )}
        </div>

        {/* Bit grid */}
        {[
          { label: `A = ${a} (0x${a.toString(16).padStart(2, '0').toUpperCase()})`, bits: aBin, color: '#94a3b8' },
          ...(!isUnary ? [{ label: `${isShift ? 'Shift' : 'B'} = ${isShift ? b & 7 : b}`, bits: bBin, color: '#64748b' }] : []),
          { label: `Result = ${result} (0x${result.toString(16).padStart(2, '0').toUpperCase()})`, bits: rBin, color: op.color },
        ].map((row, ri) => (
          <div key={ri} style={{ marginBottom: ri === (isUnary ? 1 : 2) ? 0 : 8, display: 'flex', alignItems: 'center', gap: 12 }}>
            <span style={{ fontSize: 11, color: row.color, fontFamily: 'monospace', minWidth: ri === (isUnary ? 1 : 2) ? 160 : 140 }}>{row.label}</span>
            <div style={{ display: 'flex', gap: 3 }}>
              {row.bits.split('').map((b, bi) => (
                <div key={bi} style={{
                  width: 28, height: 28, borderRadius: 5, display: 'flex', alignItems: 'center', justifyContent: 'center',
                  background: b === '1' ? `${row.color}20` : '#0a0f1e',
                  border: `1px solid ${b === '1' ? row.color + '60' : '#1e293b'}`,
                  color: b === '1' ? row.color : '#334155',
                  fontSize: 13, fontWeight: 800, fontFamily: 'monospace',
                  transition: 'all .15s',
                }}>{b}</div>
              ))}
            </div>
          </div>
        ))}

        {/* Networking context */}
        <div style={{ marginTop: 20, background: '#0a1628', borderLeft: `3px solid ${op.color}`, borderRadius: 8, padding: '12px 16px' }}>
          <div style={{ fontSize: 11, color: op.color, fontFamily: 'monospace', fontWeight: 800, marginBottom: 6 }}>NETWORKING USE</div>
          {opIdx === 0 && (
            <div style={{ fontSize: 12, color: '#94a3b8', fontFamily: 'monospace' }}>
              IP 192.168.1.50 AND mask 255.255.255.0 = 192.168.1.0 (network address)<br />
              Try: A=192, B=255 → 192.168.1.x is on network 192.168.1.0/24
            </div>
          )}
          {opIdx === 1 && (
            <div style={{ fontSize: 12, color: '#94a3b8', fontFamily: 'monospace' }}>
              Network 192.168.1.0 OR broadcast suffix 0.0.0.255 = 192.168.1.255<br />
              Used to calculate broadcast address from network + wildcard mask
            </div>
          )}
          {opIdx === 2 && (
            <div style={{ fontSize: 12, color: '#94a3b8', fontFamily: 'monospace' }}>
              CRC calculation XORs data bits with polynomial repeatedly<br />
              XOR of same value = 0: used for parity checks across multiple bytes
            </div>
          )}
          {opIdx === 3 && (
            <div style={{ fontSize: 12, color: '#94a3b8', fontFamily: 'monospace' }}>
              ~255 = 0 (inverts subnet mask → wildcard for Cisco ACLs)<br />
              ~252 = 3 → /30 subnet wildcard (0.0.0.3, allows 4 hosts)
            </div>
          )}
          {opIdx === 4 && (
            <div style={{ fontSize: 12, color: '#94a3b8', fontFamily: 'monospace' }}>
              1 {'<<'} 7 = 128 (MSB set, /1 mask)<br />
              Used to build subnet masks: (0xFFFFFFFF {'<<'} (32-prefix)) creates any /prefix
            </div>
          )}
          {opIdx === 5 && (
            <div style={{ fontSize: 12, color: '#94a3b8', fontFamily: 'monospace' }}>
              Extract octets: (0xC0A80132 {'>>'} 24) & 0xFF = 192 (first octet)<br />
              (0xC0A80132 {'>>'} 16) & 0xFF = 168, {'>>'} 8 & 0xFF = 1, & 0xFF = 50
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

// ─── Interactive 3: IP Address Dissector ──────────────────────────────────────

function parseIPv4(ip: string): number[] | null {
  const parts = ip.split('.')
  if (parts.length !== 4) return null
  const nums = parts.map(p => parseInt(p, 10))
  if (nums.some(n => isNaN(n) || n < 0 || n > 255)) return null
  return nums
}

function cidrToMask(prefix: number): number[] {
  const mask = prefix === 0 ? 0 : (~0 << (32 - prefix)) >>> 0
  return [(mask >>> 24) & 0xFF, (mask >>> 16) & 0xFF, (mask >>> 8) & 0xFF, mask & 0xFF]
}

function IPDissector() {
  const [ipStr, setIpStr] = useState('192.168.10.50')
  const [prefix, setPrefix] = useState(24)

  const octets = parseIPv4(ipStr)
  const valid = octets !== null
  const mask = cidrToMask(prefix)

  const networkOctets = octets ? octets.map((o, i) => o & mask[i]) : []
  const broadcastOctets = octets ? networkOctets.map((o, i) => o | (~mask[i] & 0xFF)) : []
  const firstHost = networkOctets.length ? [...networkOctets.slice(0, 3), networkOctets[3] + 1] : []
  const lastHost = broadcastOctets.length ? [...broadcastOctets.slice(0, 3), broadcastOctets[3] - 1] : []
  const totalHosts = prefix < 31 ? Math.pow(2, 32 - prefix) - 2 : prefix === 31 ? 2 : 1

  const OCTET_COLORS = ['#10b981', '#3b82f6', '#8b5cf6', '#f97316']

  function OctetBits({ octet, highlight, color }: { octet: number; highlight: number; color: string }) {
    const bits = octet.toString(2).padStart(8, '0')
    return (
      <div style={{ display: 'flex', gap: 2 }}>
        {bits.split('').map((b, i) => (
          <div key={i} style={{
            width: 22, height: 22, borderRadius: 4, display: 'flex', alignItems: 'center', justifyContent: 'center',
            background: i < highlight ? `${color}25` : '#0a0f1e',
            border: `1px solid ${i < highlight ? color + '70' : '#1e293b'}`,
            color: i < highlight ? color : '#334155',
            fontSize: 11, fontWeight: 800, fontFamily: 'monospace',
          }}>{b}</div>
        ))}
      </div>
    )
  }

  // Compute per-octet highlight counts
  const highlights = [
    Math.min(prefix, 8),
    Math.min(Math.max(prefix - 8, 0), 8),
    Math.min(Math.max(prefix - 16, 0), 8),
    Math.min(Math.max(prefix - 24, 0), 8),
  ]

  return (
    <div style={{ margin: '28px 0', background: '#080d18', border: '1px solid #1e293b', borderRadius: 14, overflow: 'hidden' }}>
      <div style={{ padding: '16px 20px', borderBottom: '1px solid #1e293b', display: 'flex', flexWrap: 'wrap', gap: 12, alignItems: 'center' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
          <label style={{ fontSize: 11, color: '#475569', fontFamily: 'monospace' }}>IPv4 Address</label>
          <input
            value={ipStr}
            onChange={e => setIpStr(e.target.value)}
            style={{ background: '#0d1525', border: `1px solid ${valid ? '#1e293b' : '#ef4444'}`, borderRadius: 6, color: '#e2e8f0', padding: '6px 12px', fontSize: 14, fontFamily: 'monospace', width: 160 }}
          />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
          <label style={{ fontSize: 11, color: '#475569', fontFamily: 'monospace' }}>Prefix length: /{prefix}</label>
          <input type="range" min={1} max={32} value={prefix} onChange={e => setPrefix(Number(e.target.value))}
            style={{ width: 160, accentColor: ACC }} />
        </div>
      </div>

      {valid && octets && (
        <div style={{ padding: '18px 20px' }}>
          {/* Bit layout */}
          <div style={{ marginBottom: 20 }}>
            <div style={{ fontSize: 11, color: '#475569', fontFamily: 'monospace', marginBottom: 10 }}>
              IP address bit layout — <span style={{ color: '#10b981' }}>network bits (/{prefix})</span> / <span style={{ color: '#334155' }}>host bits</span>
            </div>
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', alignItems: 'flex-start' }}>
              {octets.map((octet, i) => (
                <div key={i} style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: 11, color: OCTET_COLORS[i], fontFamily: 'monospace', marginBottom: 4, fontWeight: 700 }}>
                    .{octet}
                  </div>
                  <OctetBits octet={octet} highlight={highlights[i]} color={OCTET_COLORS[i]} />
                </div>
              ))}
            </div>
          </div>

          {/* Results */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
            {[
              { label: 'Subnet Mask', value: mask.join('.'), color: '#10b981' },
              { label: 'Network Address', value: networkOctets.join('.'), color: '#3b82f6' },
              { label: 'Broadcast Address', value: broadcastOctets.join('.'), color: '#ef4444' },
              { label: 'Usable Hosts', value: totalHosts.toLocaleString(), color: '#f97316' },
              { label: 'First Host', value: firstHost.join('.'), color: '#8b5cf6' },
              { label: 'Last Host', value: lastHost.join('.'), color: '#06b6d4' },
            ].map(r => (
              <div key={r.label} style={{ background: '#0d1525', borderRadius: 8, padding: '10px 14px' }}>
                <div style={{ fontSize: 10, color: '#475569', fontFamily: 'monospace', marginBottom: 3 }}>{r.label}</div>
                <div style={{ fontSize: 15, fontWeight: 800, color: r.color, fontFamily: 'monospace' }}>{r.value}</div>
              </div>
            ))}
          </div>

          <div style={{ marginTop: 14, padding: '10px 14px', background: '#0a0f1e', borderRadius: 8, fontSize: 12, color: '#475569', fontFamily: 'monospace' }}>
            Try: 10.0.0.1/8 (Class A), 172.16.0.1/12 (Class B), 192.168.0.1/24 (Class C), 192.168.1.200/28 (/28 subnet)
          </div>
        </div>
      )}
      {!valid && (
        <div style={{ padding: '20px', textAlign: 'center', color: '#ef4444', fontFamily: 'monospace', fontSize: 13 }}>
          invalid IPv4 address — enter 4 octets 0-255 separated by dots
        </div>
      )}
    </div>
  )
}

// ─── Module ────────────────────────────────────────────────────────────────────

export default function BinaryAndHexPage() {
  return (
    <LearnLayout
      title="Binary and Hexadecimal"
      description="The mathematical foundation of all networking — every IP address, MAC address, and subnet mask is binary arithmetic in disguise."
      section="Networking Fundamentals — Module 06"
      readTime="20–28 min"
      updatedAt="May 2026"
    >
      {/* ── Chapter 01 ── */}
      <Chapter n={1} title="Why Computers Only Know Two Things" />

      <StoryBox>
        You&apos;re a hardware engineer in 1945. You need to build a machine that can do arithmetic.
        You could use 10 voltage levels for decimal digits — but distinguishing 0.1V from 0.2V from 0.3V
        at speed, in the presence of electrical noise, is nearly impossible. Or you use just two levels:
        5V (one) and 0V (zero). A signal is either clearly high or clearly low. If noise adds 0.5V to a
        0V signal, you still read it as zero. This tolerance for noise is why every digital computer
        ever built — from ENIAC to your iPhone — operates in binary.
      </StoryBox>

      <Para>
        Binary isn&apos;t arbitrary. It&apos;s the natural language of circuits, transistors, and physical switches —
        things that are either on or off, conducting or not conducting, magnetized one way or the other.
        Decimal is the natural language of human beings who have 10 fingers. Hexadecimal exists because
        binary numbers get long and hard to read, and four binary digits map perfectly to one hex digit.
      </Para>

      <Para>
        In networking, you use all three constantly: IP addresses and subnet masks are binary arithmetic.
        MAC addresses, TCP flags, and Ethernet types are expressed in hexadecimal. Subnet calculations
        are binary AND operations. DNS record sizes are in decimal. You cannot fully understand any of
        these without understanding the number systems underneath.
      </Para>

      <WowBox>
        The binary number system was mathematically formalized by Gottfried Wilhelm Leibniz in 1703,
        who was inspired by the I Ching — an ancient Chinese divination system using broken and unbroken
        lines (which can be interpreted as 0 and 1). Leibniz saw it as proof that all reasoning could
        be reduced to calculation. He was 240 years ahead of the transistor that would make this possible.
      </WowBox>

      <Divider />

      {/* ── Chapter 02 ── */}
      <Chapter n={2} title="Decimal: The System You Already Know" />

      <Para>
        Understanding decimal&apos;s structure lets you understand every other base. Decimal (base 10) uses
        10 symbols: 0, 1, 2, 3, 4, 5, 6, 7, 8, 9. Each position in a number represents a power of 10,
        increasing from right to left.
      </Para>

      <CodeBlock>{`Decimal 4,937 decomposed:
  4 × 10³ = 4 × 1,000 = 4,000
  9 × 10² = 9 × 100   =   900
  3 × 10¹ = 3 × 10    =    30
  7 × 10⁰ = 7 × 1     =     7
  ────────────────────────────
                         4,937

The pattern: digit × (base)^(position from right starting at 0)
This same pattern works for binary (base 2) and hex (base 16)`}</CodeBlock>

      <Para>
        The insight: number bases are just conventions about <Accent>how many symbols you use before
        you roll over to the next position</Accent>. Base 10 rolls over at 10. Base 2 rolls over at 2.
        Base 16 rolls over at 16. The underlying quantity — "how many things" — is the same regardless
        of how you write it.
      </Para>

      <Divider />

      {/* ── Chapter 03 ── */}
      <Chapter n={3} title="Binary: The Language of Hardware" />

      <Para>
        Binary (base 2) uses only two symbols: 0 and 1. Each position represents a power of 2.
        A single binary digit is a <Accent>bit</Accent> (binary digit). Eight bits make a <Accent>byte</Accent>.
        A byte can represent 2⁸ = 256 distinct values (0–255), which is why IPv4 octets range from 0 to 255.
      </Para>

      <H2>Converting Binary to Decimal</H2>

      <CodeBlock>{`Binary 11000000 → Decimal:
  1 × 2⁷ = 1 × 128 = 128
  1 × 2⁶ = 1 × 64  =  64
  0 × 2⁵ = 0 × 32  =   0
  0 × 2⁴ = 0 × 16  =   0
  0 × 2³ = 0 × 8   =   0
  0 × 2² = 0 × 4   =   0
  0 × 2¹ = 0 × 2   =   0
  0 × 2⁰ = 0 × 1   =   0
  ────────────────────────
                      192   ← first octet of 192.168.x.x networks

Shortcut — memorize these powers of 2:
  2⁷  2⁶  2⁵  2⁴  2³  2²  2¹  2⁰
  128  64  32  16   8   4   2   1`}</CodeBlock>

      <H2>Converting Decimal to Binary</H2>

      <CodeBlock>{`Method 1: Subtraction (greedily subtract largest power of 2 that fits)
  172 → 128 fits? Yes. Bit 7 = 1. Remainder = 172 - 128 = 44
        64 fits? No. Bit 6 = 0.
        32 fits? Yes. Bit 5 = 1. Remainder = 44 - 32 = 12
        16 fits? No. Bit 4 = 0.
         8 fits? Yes. Bit 3 = 1. Remainder = 12 - 8 = 4
         4 fits? Yes. Bit 2 = 1. Remainder = 4 - 4 = 0
         2 fits? No. Bit 1 = 0.
         1 fits? No. Bit 0 = 0.
  Result: 10101100 (172 in binary)

Method 2: Division by 2 (collect remainders, read bottom to top)
  172 ÷ 2 = 86  r 0
   86 ÷ 2 = 43  r 0
   43 ÷ 2 = 21  r 1
   21 ÷ 2 = 10  r 1
   10 ÷ 2 =  5  r 0
    5 ÷ 2 =  2  r 1
    2 ÷ 2 =  1  r 0
    1 ÷ 2 =  0  r 1
  Read bottom to top: 10101100 ✓`}</CodeBlock>

      <H3>The Critical 8 IP Address Octets to Memorize</H3>

      <CodeBlock>{`Decimal  Binary      Hex   Networking meaning
──────────────────────────────────────────────────────────
0        00000000    0x00  All-zero octet (network bits)
10       00001010    0x0A  Class A private range start
128      10000000    0x80  /1 mask, MSB set
172      10101100    0xAC  Class B private range start
192      11000000    0xC0  Class C private range start
224      11100000    0xE0  Class D multicast start
240      11110000    0xF0  /4 subnet mask (nibble boundary)
255      11111111    0xFF  All-ones (255.255.255.255 broadcast)`}</CodeBlock>

      <WowBox>
        The IPv4 address 192.168.1.1 in binary is 11000000.10101000.00000001.00000001.
        Every router decision — "does this packet stay on my local network or go to the gateway?" —
        is computed by ANDing the destination IP and subnet mask in binary and comparing to the
        network address. Routers do this for every single packet, millions of times per second,
        entirely in binary arithmetic implemented in silicon.
      </WowBox>

      <Divider />

      {/* ── Chapter 04 ── */}
      <Chapter n={4} title="Hexadecimal: Binary Made Human-Readable" />

      <Para>
        Binary is precise but verbose. Writing a MAC address as
        <Code>00100000110001100110001100011001001101000110</Code> is error-prone and unreadable.
        Hexadecimal (base 16) solves this: every 4 binary bits map to exactly 1 hex digit.
        The same MAC address becomes <Code>20:C6:63:19:34:60</Code>.
      </Para>

      <H2>Hex Symbols</H2>

      <CodeBlock>{`Hex needs 16 symbols (0-15). Letters extend the decimal digits 0-9:
  Decimal:  0   1   2   3   4   5   6   7   8   9  10  11  12  13  14  15
  Hex:      0   1   2   3   4   5   6   7   8   9   A   B   C   D   E   F
  Binary: 0000 0001 0010 0011 0100 0101 0110 0111 1000 1001 1010 1011 1100 1101 1110 1111

Prefix conventions:
  0x prefix: C code, Python, Wireshark  → 0xFF = 255
  # prefix:  CSS colors                  → #FF0000 = red
  h suffix:  Assembly, some docs         → FFh = 255
  \\x escape: byte strings in Python      → b"\\xFF"`}</CodeBlock>

      <H2>Converting Between Binary and Hex</H2>

      <CodeBlock>{`Binary → Hex: group into nibbles (4 bits) from right, convert each

  Binary: 1100 0000 . 1010 1000 . 0000 0001 . 0011 0010
  Groups:  C    0     A    8      0    1      3    2
  Hex:    C0        A8           01           32

  → 0xC0A80132 = 192.168.1.50 as a 32-bit integer

Hex → Binary: expand each hex digit to 4 bits

  MAC: AC:DE:48:00:00:80
  A    C    D    E    4    8    0    0    0    0    8    0
  1010 1100 1101 1110 0100 1000 0000 0000 0000 0000 1000 0000`}</CodeBlock>

      <H3>Hex in Networking: Where You&apos;ll See It Daily</H3>

      <CodeBlock>{`Context                    Example                    What it means
──────────────────────────────────────────────────────────────────────────────
MAC address                00:1A:2B:3C:4D:5E          6-byte hardware address
EtherType field            0x0800                     IPv4 packet follows
IPv6 address               2001:0db8::1               128-bit address in hex
TCP flags (hex dump)       0x002 = 0000 0000 0010     SYN flag set
IP packet (hex dump)       45 00 00 3c 1c 46 40 00    IP header bytes
ARP opcode                 0x0001 = request           0x0002 = reply
VLAN tag                   0x8100                     802.1Q tagged frame
HTTP/2 frame               00 00 12 01 04             HEADERS frame, 18 bytes`}</CodeBlock>

      <NumberConverter />

      <Divider />

      {/* ── Chapter 05 ── */}
      <Chapter n={5} title="Octal: The Forgotten Third Base" />

      <Para>
        Octal (base 8) uses digits 0–7. Each octal digit represents 3 binary bits. While less common than
        hex in networking, octal appears in Unix/Linux file permissions and occasionally in legacy protocols.
      </Para>

      <CodeBlock>{`Unix file permissions: chmod 755
  7 = 111 = rwx (owner: read, write, execute)
  5 = 101 = r-x (group: read, execute)
  5 = 101 = r-x (others: read, execute)

chmod 644:
  6 = 110 = rw- (owner: read, write)
  4 = 100 = r-- (group: read only)
  4 = 100 = r-- (others: read only)

chmod 600:  private SSH key  (owner read/write only)
chmod 755:  executables, directories
chmod 644:  public files (configs, HTML)

Python octal literal: 0o755 = 493 decimal = 0x1ED hex`}</CodeBlock>

      <Para>
        When you see a decimal number starting with 0 in C code (<Code>0755</Code>), it&apos;s an octal literal
        — a common source of bugs. In Python 3, octal requires the <Code>0o</Code> prefix to avoid confusion.
        In networking code, always be explicit about your base.
      </Para>

      <Divider />

      {/* ── Chapter 06 ── */}
      <Chapter n={6} title="Bits, Bytes, and the Data Size Hierarchy" />

      <Para>
        Networking uses a consistent set of data units. The confusion between bits and bytes causes real
        problems — ISPs advertise speeds in bits (Mbps) while operating systems show downloads in bytes (MB/s).
        A "100 Mbps" connection delivers a maximum of 12.5 MB/s of actual data.
      </Para>

      <H2>Units and Prefixes</H2>

      <CodeBlock>{`Unit      Symbol  Size              Common use
──────────────────────────────────────────────────────────────────────
Bit       b       1 binary digit    Network speeds (Mbps, Gbps)
Nibble    —       4 bits            One hex digit
Byte      B       8 bits            File sizes, RAM, storage
Kilobyte  KB      1,024 bytes       Small files, packets
Megabyte  MB      1,048,576 bytes   Files, RAM
Gigabyte  GB      1,073,741,824 B   Storage, RAM
Terabyte  TB      1,099,511,627,776 Disk arrays, backups

SI prefix (decimal) vs IEC prefix (binary):
  KB = 1,000 bytes    KiB = 1,024 bytes
  MB = 1,000,000 B    MiB = 1,048,576 B
  GB = 10⁹ B          GiB = 2³⁰ B

Network speeds are in BITS:
  100 Mbps = 100,000,000 bits/sec = 12,500,000 bytes/sec ≈ 11.9 MiB/s

MTU:    1,500 bytes = 1,500 × 8 = 12,000 bits per Ethernet frame
IPv4 header: 20 bytes minimum = 160 bits
TCP header:  20 bytes minimum = 160 bits`}</CodeBlock>

      <Warn>
        <Code>Mb</Code> ≠ <Code>MB</Code>. Megabit vs Megabyte, a factor of 8 difference.
        <Code>Mbps</Code> = megabits per second (network speed). <Code>MB/s</Code> = megabytes per second
        (file transfer rate). When a speed test shows 100 Mbps and your download manager shows 11 MB/s,
        that&apos;s correct — 100 / 8 = 12.5 MB/s, minus some overhead = ~11 MB/s. ISPs advertise in bits.
        Operating systems display in bytes. Keep the factor of 8 in your head at all times.
      </Warn>

      <Divider />

      {/* ── Chapter 07 ── */}
      <Chapter n={7} title="Bitwise Operations: Binary Arithmetic on Networks" />

      <Para>
        Bitwise operations work on individual bits of numbers. They are the foundation of subnet calculations,
        packet flag manipulation, access control list matching, and cryptographic operations.
        Every modern CPU has hardware instructions for all bitwise operations — they execute in a single clock cycle.
      </Para>

      <BitwiseLab />

      <H2>Subnet Masking: AND in Action</H2>

      <Para>
        Every router on the planet uses bitwise AND to make routing decisions. When a packet arrives, the
        router ANDs the destination IP with each route&apos;s mask and compares to the route&apos;s network address.
        The longest matching prefix wins:
      </Para>

      <CodeBlock>{`Packet destination: 192.168.10.55

Route 1: 0.0.0.0/0    → match ANY (default route)
  mask:  00000000.00000000.00000000.00000000
  IP:    11000000.10101000.00001010.00110111
  AND:   00000000.00000000.00000000.00000000 = 0.0.0.0 = route prefix ✓ (0-bit match)

Route 2: 192.168.0.0/16 → wider match
  mask:  11111111.11111111.00000000.00000000
  IP:    11000000.10101000.00001010.00110111
  AND:   11000000.10101000.00000000.00000000 = 192.168.0.0 ✓ (16-bit match)

Route 3: 192.168.10.0/24 → most specific match → WINNER
  mask:  11111111.11111111.11111111.00000000
  IP:    11000000.10101000.00001010.00110111
  AND:   11000000.10101000.00001010.00000000 = 192.168.10.0 ✓ (24-bit match)`}</CodeBlock>

      <Divider />

      {/* ── Chapter 08 ── */}
      <Chapter n={8} title="Subnet Masks: Binary Boundaries for Networks" />

      <Para>
        A subnet mask is a 32-bit number where all network bits are 1 and all host bits are 0.
        The network bits must be contiguous from the left — there are no gaps allowed in a valid mask.
        CIDR notation (e.g., /24) simply counts the number of 1 bits.
      </Para>

      <H2>Building Subnet Masks from Prefix Length</H2>

      <CodeBlock>{`/8  mask = 11111111.00000000.00000000.00000000 = 255.0.0.0
/16 mask = 11111111.11111111.00000000.00000000 = 255.255.0.0
/24 mask = 11111111.11111111.11111111.00000000 = 255.255.255.0
/25 mask = 11111111.11111111.11111111.10000000 = 255.255.255.128
/26 mask = 11111111.11111111.11111111.11000000 = 255.255.255.192
/27 mask = 11111111.11111111.11111111.11100000 = 255.255.255.224
/28 mask = 11111111.11111111.11111111.11110000 = 255.255.255.240
/29 mask = 11111111.11111111.11111111.11111000 = 255.255.255.248
/30 mask = 11111111.11111111.11111111.11111100 = 255.255.255.252
/31 mask = 11111111.11111111.11111111.11111110 = 255.255.255.254 (point-to-point)
/32 mask = 11111111.11111111.11111111.11111111 = 255.255.255.255 (host route)

Formula for usable hosts: 2^(32-prefix) - 2
  /24 → 2⁸ - 2 = 254 hosts
  /25 → 2⁷ - 2 = 126 hosts
  /26 → 2⁶ - 2 =  62 hosts
  /27 → 2⁵ - 2 =  30 hosts
  /28 → 2⁴ - 2 =  14 hosts
  /29 → 2³ - 2 =   6 hosts
  /30 → 2² - 2 =   2 hosts (point-to-point links)`}</CodeBlock>

      <IPDissector />

      <H2>Calculating Subnets Mentally</H2>

      <Para>
        For any subnet, you need four values: network address, subnet mask, broadcast address, and usable host range.
        The pattern for the last octet (for /24 through /32):
      </Para>

      <CodeBlock>{`For 192.168.1.0/26 (64 addresses per subnet, 4 subnets in /24):
  Subnet 0: 192.168.1.0   – 192.168.1.63   (hosts .1-.62)
  Subnet 1: 192.168.1.64  – 192.168.1.127  (hosts .65-.126)
  Subnet 2: 192.168.1.128 – 192.168.1.191  (hosts .129-.190)
  Subnet 3: 192.168.1.192 – 192.168.1.255  (hosts .193-.254)

Block size = 256 - mask_octet = 256 - 192 = 64
Subnets start at multiples of block size: 0, 64, 128, 192
Given 192.168.1.100: 100/64 = 1 → subnet 192.168.1.64/26`}</CodeBlock>

      <Divider />

      {/* ── Chapter 09 ── */}
      <Chapter n={9} title="MAC Addresses: 48-Bit Hardware Identity" />

      <Para>
        A MAC (Media Access Control) address is a 48-bit (6-byte) identifier burned into every network
        interface card at manufacture. It&apos;s expressed as 6 pairs of hex digits separated by colons
        (Linux: <Code>aa:bb:cc:dd:ee:ff</Code>) or hyphens (Windows: <Code>AA-BB-CC-DD-EE-FF</Code>).
      </Para>

      <H2>MAC Address Structure</H2>

      <CodeBlock>{`MAC address: 00:1A:2B:3C:4D:5E

  Byte 0   Byte 1   Byte 2   | Byte 3   Byte 4   Byte 5
  ─────────────────────────────────────────────────────
  0 0 : 1 A : 2 B             3 C : 4 D : 5 E
  └──────────────────┘         └─────────────────────┘
      OUI (Organizationally       Device identifier
      Unique Identifier)          (vendor-assigned)
      = 00:1A:2B = vendor

Bit 0 of byte 0 (LSB) = multicast bit:
  0 = unicast (one device)
  1 = multicast/broadcast (group of devices)

Bit 1 of byte 0 = locally administered:
  0 = globally unique (factory-assigned OUI)
  1 = locally administered (manually set, VM-generated)

Special addresses:
  FF:FF:FF:FF:FF:FF  = broadcast (all devices on segment)
  01:00:5E:xx:xx:xx  = IPv4 multicast (IANA-assigned prefix)
  33:33:xx:xx:xx:xx  = IPv6 multicast`}</CodeBlock>

      <H3>OUI Lookup</H3>

      <Para>
        The first 3 bytes of a MAC address identify the vendor. IEEE maintains the OUI (Organizationally
        Unique Identifier) database. You can use this to identify devices on a network:
        <Code>00:0C:29</Code> = VMware virtual machine, <Code>AC:DE:48</Code> = Private (locally administered),
        <Code>00:50:56</Code> = VMware, <Code>2C:F0:5D</Code> = Apple.
        Wireshark automatically resolves OUIs in captured packets.
      </Para>

      <WowBox>
        IPv6 Stateless Address Autoconfiguration (SLAAC) derives a host&apos;s IPv6 address from its MAC address
        using a process called EUI-64. The MAC address <Code>00:1A:2B:3C:4D:5E</Code> becomes the IPv6 interface
        identifier <Code>021A:2BFF:FE3C:4D5E</Code> by inserting <Code>FF:FE</Code> in the middle and flipping
        bit 6 of byte 0. This made IPv6 addresses predictable — a privacy concern. RFC 4941 introduced
        "privacy extensions" that use random addresses instead. Your laptop probably changes its IPv6 address
        every few hours.
      </WowBox>

      <Divider />

      {/* ── Chapter 10 ── */}
      <Chapter n={10} title="Hex Dumps: Reading Raw Network Data" />

      <Para>
        When you capture network traffic with Wireshark or tcpdump, the raw bytes are displayed as a hex dump.
        Learning to read hex dumps lets you verify exactly what a protocol sends — the ground truth beneath
        all abstractions.
      </Para>

      <H2>Anatomy of a Hex Dump</H2>

      <CodeBlock>{`$ tcpdump -X -c 1 host 8.8.8.8
16:42:31 IP myhost.54321 > dns.google.domain: 12345+ A? google.com. (28)
        0x0000:  4500 003c 1c46 4000 4011 f8c7 c0a8 0132  E..<.F@.@......2
        0x0010:  0808 0808 d431 0035 0028 3d4b abcd 0100  .....1.5.(=K....
        0x0020:  0001 0000 0000 0000 0667 6f6f 676c 6503  .........google.
        0x0030:  636f 6d00 0001 0001                      com.....

Offset  Hex bytes (16 per line)           ASCII (. = non-printable)
──────────────────────────────────────────────────────────────────────
0x0000: 45 00  = IP version (4) + IHL (5), DSCP/ECN = 0
        00 3c  = Total length = 60 bytes
        1c 46  = ID = 0x1C46
        40 00  = Flags (Don't Fragment), Fragment offset 0
        40     = TTL = 64
        11     = Protocol = 17 (UDP)
        f8 c7  = Header checksum
        c0 a8 01 32 = Source IP 192.168.1.50
        08 08 08 08 = Destination IP 8.8.8.8

0x0010: d4 31  = Source port 54321 (UDP header)
        00 35  = Destination port 53 (DNS)
        00 28  = UDP length 40 bytes
        3d 4b  = UDP checksum

0x0012+: DNS query bytes (ID, flags, question for "google.com" A record)`}</CodeBlock>

      <H2>Reading Hex Dumps Systematically</H2>

      <CodeBlock>{`Step 1: Identify the protocol layer (first byte tells you a lot)
  0x45 → 4 = IPv4, 5 = 5×4=20 byte header (IHL)
  First 20 bytes = IPv4 header

Step 2: Find protocol field (byte 9 in IP header = 0x06 TCP, 0x11 UDP, 0x01 ICMP)
  Then parse the next header accordingly

Step 3: Use Wireshark's "Follow TCP Stream" to see application-layer data decoded
  or use: wireshark -R "http" -T fields -e http.request.uri capture.pcap

Quick reference for common first bytes:
  45 = IPv4, IHL=20 (common)
  60 = IPv6 (version 6, traffic class 0)
  FF FF FF FF = broadcast MAC or broadcast IP
  08 00 = EtherType IPv4
  86 DD = EtherType IPv6
  08 06 = EtherType ARP`}</CodeBlock>

      <Divider />

      {/* ── Chapter 11 ── */}
      <Chapter n={11} title="Binary in Protocols: Flags, Fields, and Bit Manipulation" />

      <Para>
        Protocols pack enormous amounts of information into small numbers of bytes using individual bits
        as flags. The TCP header is a masterclass in this: 20 bytes contain the complete state of a
        TCP connection, with 9 individual control bits.
      </Para>

      <H2>TCP Flags: 9 Bits That Control Everything</H2>

      <CodeBlock>{`TCP Control Bits (flags) — bits 8-15 of bytes 12-13 in TCP header:
  Bit 8:  CWR (Congestion Window Reduced) — ECN response
  Bit 9:  ECE (ECN-Echo) — router signaled congestion
  Bit 10: URG (Urgent) — urgent pointer field is valid
  Bit 11: ACK (Acknowledgment) — ack number is valid
  Bit 12: PSH (Push) — deliver data to application immediately
  Bit 13: RST (Reset) — abort connection
  Bit 14: SYN (Synchronize) — start of connection
  Bit 15: FIN (Finish) — sender has finished sending

Common flag combinations:
  0x002 = 0000 0010 = SYN          (connection initiation)
  0x012 = 0001 0010 = SYN+ACK      (server response)
  0x010 = 0001 0000 = ACK          (acknowledgment)
  0x018 = 0001 1000 = PSH+ACK      (data with push)
  0x011 = 0001 0001 = FIN+ACK      (graceful close)
  0x004 = 0000 0100 = RST          (connection abort)

In Wireshark display filter:
  tcp.flags.syn == 1              → show SYN packets
  tcp.flags == 0x002              → show only pure SYN (no ACK)
  tcp.flags.rst == 1              → show RST (connection resets)`}</CodeBlock>

      <H3>IPv4 Flags and Fragment Offset</H3>

      <CodeBlock>{`IPv4 flags (3 bits in bits 6-8 of the 6th and 7th bytes):
  Bit 6 (reserved): always 0
  Bit 7: DF (Don't Fragment) — router MUST NOT fragment, or drop+ICMP error
  Bit 8: MF (More Fragments) — more fragments follow this one

Fragment offset (13 bits): byte offset of this fragment ÷ 8

Example - 4000-byte packet sent over 1500-byte MTU link:
  Fragment 1: offset=0,   MF=1, data bytes 0-1479
  Fragment 2: offset=185, MF=1, data bytes 1480-2959 (1480÷8=185)
  Fragment 3: offset=370, MF=0, data bytes 2960-3999 (last fragment)`}</CodeBlock>

      <Divider />

      {/* ── Chapter 12 ── */}
      <Chapter n={12} title="Practical Conversions: Mental Arithmetic for Network Engineers" />

      <Para>
        You&apos;ll need to do conversions quickly in your head during troubleshooting. Here are the patterns
        that experienced network engineers recognize instantly.
      </Para>

      <H2>Subnet Mask Quick Reference</H2>

      <CodeBlock>{`/prefix  Mask                 Block size  Hosts  Hex mask
────────────────────────────────────────────────────────────────────────
/8       255.0.0.0            16,777,216  16M    0xFF000000
/16      255.255.0.0          65,536      65K    0xFFFF0000
/24      255.255.255.0        256         254    0xFFFFFF00
/25      255.255.255.128      128         126    0xFFFFFF80
/26      255.255.255.192      64           62    0xFFFFFFC0
/27      255.255.255.224      32           30    0xFFFFFFE0
/28      255.255.255.240      16           14    0xFFFFFFF0
/29      255.255.255.248      8             6    0xFFFFFFF8
/30      255.255.255.252      4             2    0xFFFFFFFC

Trick: last octet of mask = 256 - block_size
  /26 → block = 64 → mask last octet = 256 - 64 = 192 ✓
  /27 → block = 32 → mask last octet = 256 - 32 = 224 ✓`}</CodeBlock>

      <H2>Private IP Ranges in Binary</H2>

      <CodeBlock>{`RFC 1918 private ranges — binary pattern makes them memorable:

10.0.0.0/8:
  Binary: 0000 1010. xxxxxxxx. xxxxxxxx. xxxxxxxx
  Hex:    0x0A000000/0xFF000000 (16,777,216 addresses)

172.16.0.0/12:
  Binary: 1010 1100. 0001xxxx. xxxxxxxx. xxxxxxxx
  Hex:    0xAC100000/0xFFF00000 (1,048,576 addresses)
  Range:  172.16.0.0 – 172.31.255.255

192.168.0.0/16:
  Binary: 1100 0000. 1010 1000. xxxxxxxx. xxxxxxxx
  Hex:    0xC0A80000/0xFFFF0000 (65,536 addresses)

Loopback: 127.0.0.0/8
  Binary: 0111 1111. xxxxxxxx. xxxxxxxx. xxxxxxxx
  127.0.0.1 = the local machine (lo interface)`}</CodeBlock>

      <Divider />

      {/* ── Chapter 13 ── */}
      <Chapter n={13} title="Common Misconceptions" />

      <Err>
        <strong>"Hexadecimal and binary are separate number systems."</strong><br /><br />
        They represent the same quantity — just written differently. <Code>0xC0</Code>, <Code>11000000</Code>,
        and <Code>192</Code> are identical values. Hex is just a compact notation for binary:
        every hex digit is exactly 4 binary bits. Converting between them is substitution, not calculation.
        When a Wireshark hex dump shows <Code>0x0800</Code>, you&apos;re not reading "hexadecimal" —
        you&apos;re reading "2048 expressed in hex because it&apos;s easier than 0000100000000000 in binary."
      </Err>

      <Err>
        <strong>"The subnet mask 255.255.255.0 means you can have 255 hosts."</strong><br /><br />
        A /24 (255.255.255.0) network has 256 addresses (0–255) but only 254 usable hosts.
        The all-zeros host (e.g., 192.168.1.0) is the network address — cannot be assigned to a host.
        The all-ones host (192.168.1.255) is the broadcast address — packets sent here reach all hosts.
        Both are reserved. 256 − 2 = 254 usable hosts. For /30 (point-to-point): 4 − 2 = 2 hosts,
        which is exactly right for a router-to-router link.
      </Err>

      <Err>
        <strong>"A /16 subnet can only have hosts in the 172.16.x.x range."</strong><br /><br />
        A subnet mask of /16 means the first 16 bits are the network, the last 16 bits are the host.
        But which bits are network and which are host depends entirely on what the network address is.
        10.0.0.0/16 means hosts 10.0.0.1 through 10.0.255.254 — completely different range from
        172.16.0.0/16. The mask defines the <em>structure</em>; the network address defines
        the <em>range</em>. You can subnet any address space with any valid prefix length.
      </Err>

      <Err>
        <strong>"Bits and bytes are the same thing."</strong><br /><br />
        1 byte = 8 bits. This factor-of-8 confusion causes real-world misunderstandings constantly.
        Your ISP sells you "100 Mbps" (megabits per second). Your browser shows download at "11 MB/s"
        (megabytes per second). Both are correct — 100 Mbps ÷ 8 = 12.5 MB/s, minus protocol overhead
        ≈ 11–12 MB/s. Network engineers abbreviate: lowercase b = bit (Mb), uppercase B = byte (MB).
        Mixing them up in calculations gives results off by a factor of 8.
      </Err>

      <Err>
        <strong>"FF:FF:FF:FF:FF:FF is an invalid/error MAC address."</strong><br /><br />
        FF:FF:FF:FF:FF:FF is the valid, standard Ethernet broadcast address. Every bit is 1.
        Frames sent to this address are received and processed by every device on the local network segment.
        ARP uses it to ask "who has IP x.x.x.x?" — the request must reach all devices because no one
        knows the answer yet. DHCP discover packets are also sent to the broadcast MAC address.
        It is not an error — it&apos;s a deliberately designed group address.
      </Err>

      <Err>
        <strong>"You can&apos;t have a valid subnet mask like 255.255.255.128."</strong><br /><br />
        <Code>255.255.255.128</Code> is a perfectly valid /25 subnet mask. The binary is
        11111111.11111111.11111111.10000000 — all ones on the left, all zeros on the right, no gaps.
        Any mask that is a contiguous sequence of 1s followed by contiguous 0s is valid. A mask like
        255.255.128.255 would be invalid (gap in the 1s). With /25, a /24 network is split in half:
        0–127 and 128–255, giving two subnets of 126 usable hosts each.
      </Err>

      <Divider />

      {/* ── Chapter 14 ── */}
      <Chapter n={14} title="Test Your Understanding" />

      <IQ level="Beginner">
        <strong>Q: What is the decimal value of the binary number 10110100?</strong>
        <br /><br />
        Reading each bit from left (bit 7) to right (bit 0):
        1×128 + 0×64 + 1×32 + 1×16 + 0×8 + 1×4 + 0×2 + 0×1 = 128 + 32 + 16 + 4 = 180.
        Quick check: 10110100 in hex — group as 1011 (= B = 11) and 0100 (= 4) = 0xB4 = 11×16 + 4 = 176 + 4 = 180. ✓
      </IQ>

      <IQ level="Beginner">
        <strong>Q: A server has IP address 10.20.30.40 and subnet mask 255.255.255.0. What is its network address and broadcast address?</strong>
        <br /><br />
        Network address = IP AND mask: 10.20.30.40 AND 255.255.255.0 = 10.20.30.0.
        (The last octet: 40 AND 0 = 0.)
        Broadcast address = network OR (NOT mask): NOT 255.255.255.0 = 0.0.0.255.
        10.20.30.0 OR 0.0.0.255 = 10.20.30.255.
        Usable hosts: 10.20.30.1 through 10.20.30.254 (254 hosts).
      </IQ>

      <IQ level="Intermediate">
        <strong>Q: You need 50 hosts on a subnet. What is the smallest subnet (/prefix) that works, and what is the waste?</strong>
        <br /><br />
        Need 50 hosts → need 50 + 2 = 52 addresses (network + broadcast).
        Next power of 2 ≥ 52 is 64 = 2⁶, which means 6 host bits → /26 (32 - 6 = 26).
        /26 provides 2⁶ - 2 = 62 usable hosts. Waste = 62 - 50 = 12 host addresses wasted.
        /27 provides only 2⁵ - 2 = 30 hosts — not enough.
        So /26 (255.255.255.192) is the answer. Block size = 64, subnets start at multiples of 64.
      </IQ>

      <IQ level="Intermediate">
        <strong>Q: A Wireshark hex dump shows the bytes <Code>C0 A8 01 01</Code>. What IPv4 address does this represent?</strong>
        <br /><br />
        Convert each byte from hex to decimal: 0xC0 = 192, 0xA8 = 168, 0x01 = 1, 0x01 = 1.
        The IPv4 address is 192.168.1.1 — a common default gateway address.
        The conversion: C0 = 12×16 + 0 = 192; A8 = 10×16 + 8 = 168; both 01 = 1.
        In binary: 11000000.10101000.00000001.00000001.
      </IQ>

      <IQ level="Senior">
        <strong>Q: How would you programmatically generate all subnet addresses for 10.0.0.0/8 divided into /24 subnets using bitwise operations in Python?</strong>
        <br /><br />
        The key insight: /8 to /24 means 16 bits of subnet space (256 × 256 = 65,536 subnets).
        <CodeBlock>{`import ipaddress

# Bit-manipulation approach
network_int = 0x0A000000  # 10.0.0.0 as 32-bit int
mask_24 = 0xFFFFFF00      # /24 mask

# Number of /24 subnets in a /8 = 2^(24-8) = 65536
for subnet_id in range(1 << (24 - 8)):   # 0 to 65535
    # Left-shift subnet_id into the 16-24 bit range
    subnet_net = network_int | (subnet_id << 8)
    # Extract octets
    o = [(subnet_net >> (24 - 8*i)) & 0xFF for i in range(4)]
    print(f"{o[0]}.{o[1]}.{o[2]}.{o[3]}/24")
    # → 10.0.0.0/24, 10.0.1.0/24, ..., 10.255.255.0/24`}</CodeBlock>
        The <Code>&lt;&lt; 8</Code> shifts the subnet counter to occupy bits 8–23 (the middle two octets),
        preserving the 10.x.x.0 structure. The bit manipulation directly mirrors how hardware computes
        subnet boundaries.
      </IQ>

      <IQ level="Senior">
        <strong>Q: IPv6 uses EUI-64 to derive interface identifiers from MAC addresses. What is the binary manipulation involved, and why was it considered a privacy problem?</strong>
        <br /><br />
        EUI-64 process for MAC <Code>00:1A:2B:3C:4D:5E</Code>:
        (1) Split MAC at byte 3: <Code>00:1A:2B</Code> | <Code>3C:4D:5E</Code>
        (2) Insert <Code>FF:FE</Code> in the middle: <Code>00:1A:2B:FF:FE:3C:4D:5E</Code>
        (3) Flip bit 6 (Universal/Local bit) of first byte: <Code>00</Code> → bit 1 = 0 → flip → 0x02 → <Code>02:1A:2B:FF:FE:3C:4D:5E</Code>
        (4) The 64-bit interface ID is <Code>021A:2BFF:FE3C:4D5E</Code>

        Privacy issue: the interface ID is derived deterministically from the hardware MAC, which never changes.
        An observer seeing IPv6 traffic from <Code>2001:db8:1::021A:2BFF:FE3C:4D5E</Code> can extract the
        MAC address (revealing device vendor), track the device across different networks (same interface ID
        regardless of prefix), and correlate activity over time. RFC 4941 (2007) introduced privacy
        extensions: the interface identifier is replaced with a random value that changes every few hours,
        making long-term tracking significantly harder. Modern OS implementations (Linux, macOS, Windows)
        use privacy extensions by default.
      </IQ>

      <IQ level="PhD">
        <strong>Q: Analyze the VLSM (Variable Length Subnet Masking) design for an enterprise with these requirements: 200 hosts in HQ, 50 hosts in Branch-A, 25 hosts in Branch-B, 6 WAN links each needing 2 hosts. Minimize address space waste using 192.168.1.0/24.</strong>
        <br /><br />
        VLSM allocates the largest subnets first from the address space, then fills smaller ones into gaps.
        Sort requirements descending and assign smallest fitting prefix:

        <CodeBlock>{`Requirement          Hosts needed  /prefix  Block   Waste
──────────────────────────────────────────────────────────────
HQ (200 hosts)       202 total     /24*     —       — (too big! need /23)

Actually 200 hosts needs /24 → 254 hosts. 200 ≤ 254 ✓

Allocation from 192.168.1.0/24:
  HQ:          192.168.1.0/25    (126 hosts) — only 126! Adjust:

Recalculate with /24 = 254 hosts for HQ:
  → Need 192.168.0.0/23 or choose different base

Fitting in 192.168.1.0/24 (256 total addresses):
  200 hosts → /24 is the whole block → can't fit Branch-A/B too!

Realistic fit:
  Use 192.168.0.0/22 (1022 hosts total):
  HQ:        192.168.0.0/24  → 254 hosts (200 used, 54 waste)
  Branch-A:  192.168.1.0/26  →  62 hosts (50 used, 12 waste)
  Branch-B:  192.168.1.64/27 →  30 hosts (25 used, 5 waste)
  WAN-1..6:  192.168.1.96/30 ..192.168.1.116/30 → 2 hosts each
             (6 × 4 = 24 addresses, all in 192.168.1.96/27)

Summary: 200+50+25+12 = 287 used, 1022 total, ~28% waste
vs flat /22: 287/1022 = 72% efficiency
vs /24-only: would need multiple /24s, wasting 65,249 addresses`}</CodeBlock>
        VLSM is powerful because it prevents the situation where a 200-host requirement forces allocating
        a /24 (254 addresses) which then wastes 54 addresses that could have served another subnet.
        Modern IPAM (IP Address Management) software automates this, but understanding the binary math
        lets you verify allocations and debug misconfigurations.
      </IQ>

      <IQ level="PhD">
        <strong>Q: How does Hamming code detect and correct single-bit errors, and what is its relationship to the parity bits in ECC RAM?</strong>
        <br /><br />
        Hamming codes (Richard Hamming, 1950) add redundancy bits at positions that are powers of 2
        (1, 2, 4, 8, 16...). Each parity bit covers a specific subset of data bits — those whose position
        number has that power of 2 set in binary.
        <br /><br />
        For 4 data bits (d1-d4), Hamming(7,4) adds 3 parity bits (p1, p2, p4):
        p1 covers positions 1,3,5,7 (bit 0 set in position binary)
        p2 covers positions 2,3,6,7 (bit 1 set)
        p4 covers positions 4,5,6,7 (bit 2 set)
        <br /><br />
        To correct an error: receiver recomputes all parity bits and XORs them with received values.
        Non-zero result = syndrome. The syndrome is the binary number of the corrupted bit position —
        flip that bit to correct it. A syndrome of 0b101 = 5 means bit position 5 is corrupted.
        <br /><br />
        ECC RAM uses Hamming extended with an extra overall parity bit (SECDED: Single Error Correct,
        Double Error Detect). A 64-bit data word gets 8 ECC bits, stored as 72 bits total. On every
        read, the DRAM controller recomputes ECC. Single-bit errors are silently corrected (SECDED detects
        and corrects). Double-bit errors are detected and reported as uncorrectable (causing kernel panic).
        ECC RAM is required for servers, not because bit errors are common (cosmic ray rate ≈ 1 error/GB-month),
        but because uncorrected errors cause silent data corruption — worse than a crash, because you don&apos;t
        know the data is wrong. At cloud scale (millions of DRAM chips), ECC prevents thousands of potential
        data corruptions per day.
      </IQ>

      <Divider />

      <KeyTakeaways items={[
        'Binary (base 2) is the language of hardware — circuits are either on (1) or off (0). Decimal and hex are human-readable encodings of binary values.',
        'Every hex digit represents exactly 4 binary bits. Converting between binary and hex is substitution, not arithmetic.',
        'IP address math is binary AND, OR, and NOT operations. Subnet masking = IP AND mask = network address.',
        'A /prefix means that many bits are 1 in the mask (from the left). Usable hosts = 2^(32−prefix) − 2.',
        'Byte = 8 bits. Network speeds are in bits (Mbps). File sizes are in bytes (MB). 100 Mbps ÷ 8 = 12.5 MB/s.',
        'TCP flags are individual bits in a 16-bit field. SYN=0x002, SYN+ACK=0x012, ACK=0x010, RST=0x004, FIN+ACK=0x011.',
        'MAC addresses are 48-bit hex values. First 3 bytes = OUI (vendor). All-ones FF:FF:FF:FF:FF:FF = broadcast.',
        'Bitwise AND extracts network address. NOT inverts mask for wildcard ACL calculation. XOR forms CRC checksums.',
        'VLSM allocates variable prefix lengths — largest subnets first — to minimize IP address waste.',
        'ECC RAM uses Hamming codes (SECDED) to automatically correct single-bit errors and detect double-bit errors.',
      ]} />
    </LearnLayout>
  )
}
