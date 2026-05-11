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

const Term = ({ word, def }: { word: string; def: string }) => (
  <div style={{ display: 'flex', gap: 0, marginBottom: 12, border: '1px solid var(--border)', borderRadius: 8, overflow: 'hidden' }}>
    <div style={{ background: `${N}12`, borderRight: `1px solid ${N}20`, padding: '10px 16px', minWidth: 160, display: 'flex', alignItems: 'center' }}>
      <span style={{ fontFamily: 'var(--font-mono)', fontSize: 13, fontWeight: 700, color: N }}>{word}</span>
    </div>
    <div style={{ padding: '10px 16px', fontSize: 13, color: 'var(--muted)', lineHeight: 1.7 }}>{def}</div>
  </div>
)

// ── Interactive Base Converter ────────────────────────────────────────────────
function BaseConverter() {
  const [input, setInput] = useState('192')
  const [base, setBase] = useState<'decimal' | 'binary' | 'hex'>('decimal')

  let decimal = 0
  let parseError = false

  try {
    if (base === 'decimal') {
      decimal = parseInt(input, 10)
      if (isNaN(decimal) || decimal < 0 || decimal > 4294967295) parseError = true
    } else if (base === 'binary') {
      if (!/^[01]+$/.test(input)) parseError = true
      else decimal = parseInt(input, 2)
    } else {
      if (!/^[0-9a-fA-F]+$/.test(input)) parseError = true
      else decimal = parseInt(input, 16)
    }
  } catch {
    parseError = true
  }

  const toBin = (n: number) => n.toString(2).padStart(8, '0')
  const toHex = (n: number) => n.toString(16).toUpperCase().padStart(2, '0')

  const isOctet = !parseError && decimal >= 0 && decimal <= 255
  const isValidU32 = !parseError && decimal >= 0 && decimal <= 4294967295

  const binStr = isValidU32 ? decimal.toString(2).padStart(32, '0') : '????????????????????????????????????????'
  const octets = isOctet ? [decimal] : isValidU32 ? [
    (decimal >>> 24) & 0xff,
    (decimal >>> 16) & 0xff,
    (decimal >>> 8) & 0xff,
    decimal & 0xff,
  ] : []

  return (
    <div style={{ background: 'var(--surface)', border: `1px solid ${N}30`, borderRadius: 12, padding: '24px', margin: '28px 0' }}>
      <p style={{ fontSize: 11, fontWeight: 700, color: N, fontFamily: 'var(--font-mono)', textTransform: 'uppercase', letterSpacing: '.1em', margin: '0 0 16px' }}>Interactive Base Converter</p>

      {/* Base selector */}
      <div style={{ display: 'flex', gap: 8, marginBottom: 16 }}>
        {(['decimal', 'binary', 'hex'] as const).map(b => (
          <button
            key={b}
            onClick={() => { setBase(b); setInput(b === 'decimal' ? '192' : b === 'binary' ? '11000000' : 'C0') }}
            style={{
              padding: '6px 16px', borderRadius: 6, border: `1px solid ${base === b ? N : 'var(--border)'}`,
              background: base === b ? `${N}18` : 'transparent',
              color: base === b ? N : 'var(--muted)', fontSize: 13, fontWeight: 600, cursor: 'pointer', textTransform: 'capitalize',
            }}
          >{b}</button>
        ))}
      </div>

      <input
        value={input}
        onChange={e => setInput(e.target.value)}
        placeholder={base === 'decimal' ? '0–4294967295' : base === 'binary' ? '00000000–11111111' : '00–FF'}
        style={{
          width: '100%', padding: '10px 14px', borderRadius: 8,
          border: `1px solid ${parseError ? '#ef4444' : N + '40'}`,
          background: 'var(--bg)', color: 'var(--text)', fontSize: 15,
          fontFamily: 'var(--font-mono)', boxSizing: 'border-box', marginBottom: 20,
        }}
      />

      {parseError && <p style={{ color: '#ef4444', fontSize: 13, margin: '-12px 0 16px' }}>Invalid {base} value</p>}

      {!parseError && isValidU32 && (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 12, marginBottom: 20 }}>
          {[
            { label: 'Decimal', value: decimal.toString(10), accent: '#3b82f6' },
            { label: 'Binary', value: decimal.toString(2), accent: '#f59e0b' },
            { label: 'Hexadecimal', value: '0x' + decimal.toString(16).toUpperCase(), accent: N },
          ].map(({ label, value, accent }) => (
            <div key={label} style={{ background: `${accent}08`, border: `1px solid ${accent}25`, borderRadius: 8, padding: '12px 14px' }}>
              <p style={{ fontSize: 11, color: accent, fontFamily: 'var(--font-mono)', fontWeight: 700, margin: '0 0 6px', textTransform: 'uppercase' }}>{label}</p>
              <p style={{ fontSize: 14, fontFamily: 'var(--font-mono)', fontWeight: 700, color: 'var(--text)', margin: 0, wordBreak: 'break-all' }}>{value}</p>
            </div>
          ))}
        </div>
      )}

      {/* Octet visual for single 0–255 value */}
      {isOctet && (
        <>
          <p style={{ fontSize: 12, color: 'var(--muted)', margin: '0 0 8px' }}>8-bit positional breakdown:</p>
          <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap' }}>
            {[128, 64, 32, 16, 8, 4, 2, 1].map((pw, i) => {
              const bit = (decimal >> (7 - i)) & 1
              return (
                <div key={pw} style={{ textAlign: 'center', minWidth: 44 }}>
                  <div style={{ fontSize: 10, color: 'var(--muted)', fontFamily: 'var(--font-mono)', marginBottom: 4 }}>2{String(7 - i).replace(/(\d)/, (m) => ['⁰','¹','²','³','⁴','⁵','⁶','⁷'][parseInt(m)] || m)}</div>
                  <div style={{ fontSize: 10, color: 'var(--muted)', fontFamily: 'var(--font-mono)', marginBottom: 4 }}>{pw}</div>
                  <div style={{
                    width: 40, height: 40, borderRadius: 6, display: 'flex', alignItems: 'center', justifyContent: 'center',
                    background: bit ? `${N}20` : '#ffffff08', border: `1px solid ${bit ? N : 'var(--border)'}`,
                    fontSize: 16, fontWeight: 700, fontFamily: 'var(--font-mono)', color: bit ? N : 'var(--muted)',
                  }}>{bit}</div>
                </div>
              )
            })}
          </div>
          <p style={{ fontSize: 12, color: 'var(--muted)', margin: '12px 0 0', fontFamily: 'var(--font-mono)' }}>
            {[128, 64, 32, 16, 8, 4, 2, 1].filter((pw, i) => ((decimal >> (7 - i)) & 1)).map(pw => pw).join(' + ') || '0'} = {decimal}
          </p>
        </>
      )}

      {/* IPv4 address breakdown for 32-bit values */}
      {isValidU32 && !isOctet && octets.length === 4 && (
        <>
          <p style={{ fontSize: 12, color: 'var(--muted)', margin: '0 0 10px' }}>As IPv4 address — four 8-bit octets:</p>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', alignItems: 'center' }}>
            {octets.map((oct, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <div style={{ background: `${N}10`, border: `1px solid ${N}25`, borderRadius: 8, padding: '8px 14px', textAlign: 'center' }}>
                  <p style={{ fontSize: 10, color: N, fontFamily: 'var(--font-mono)', margin: '0 0 4px' }}>Octet {i + 1}</p>
                  <p style={{ fontSize: 15, fontFamily: 'var(--font-mono)', fontWeight: 700, color: 'var(--text)', margin: '0 0 2px' }}>{oct}</p>
                  <p style={{ fontSize: 11, fontFamily: 'var(--font-mono)', color: 'var(--muted)', margin: 0 }}>{toBin(oct)}</p>
                  <p style={{ fontSize: 11, fontFamily: 'var(--font-mono)', color: N, margin: 0 }}>0x{toHex(oct)}</p>
                </div>
                {i < 3 && <span style={{ fontSize: 18, color: 'var(--muted)', fontWeight: 700 }}>.</span>}
              </div>
            ))}
          </div>
          <p style={{ fontSize: 13, fontFamily: 'var(--font-mono)', color: 'var(--muted)', margin: '12px 0 0' }}>
            IPv4: {octets.join('.')} &nbsp;|&nbsp; Binary: {binStr.match(/.{8}/g)?.join('.') ?? binStr}
          </p>
        </>
      )}
    </div>
  )
}

// ── Subnet Mask Visualizer ────────────────────────────────────────────────────
const SUBNET_PRESETS = [
  { label: '/8', cidr: 8, mask: '255.0.0.0', hosts: 16777214 },
  { label: '/16', cidr: 16, mask: '255.255.0.0', hosts: 65534 },
  { label: '/24', cidr: 24, mask: '255.255.255.0', hosts: 254 },
  { label: '/25', cidr: 25, mask: '255.255.255.128', hosts: 126 },
  { label: '/26', cidr: 26, mask: '255.255.255.192', hosts: 62 },
  { label: '/27', cidr: 27, mask: '255.255.255.224', hosts: 30 },
  { label: '/28', cidr: 28, mask: '255.255.255.240', hosts: 14 },
  { label: '/30', cidr: 30, mask: '255.255.255.252', hosts: 2 },
]

function SubnetVisualizer() {
  const [selected, setSelected] = useState(2) // /24 default
  const preset = SUBNET_PRESETS[selected]
  const bits = Array.from({ length: 32 }, (_, i) => i < preset.cidr ? 1 : 0)

  return (
    <div style={{ background: 'var(--surface)', border: `1px solid ${N}30`, borderRadius: 12, padding: '24px', margin: '28px 0' }}>
      <p style={{ fontSize: 11, fontWeight: 700, color: N, fontFamily: 'var(--font-mono)', textTransform: 'uppercase', letterSpacing: '.1em', margin: '0 0 16px' }}>Subnet Mask Bit Visualizer</p>

      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 20 }}>
        {SUBNET_PRESETS.map((p, i) => (
          <button
            key={p.label}
            onClick={() => setSelected(i)}
            style={{
              padding: '6px 14px', borderRadius: 6,
              border: `1px solid ${selected === i ? N : 'var(--border)'}`,
              background: selected === i ? `${N}18` : 'transparent',
              color: selected === i ? N : 'var(--muted)', fontSize: 13, fontWeight: 600, cursor: 'pointer',
            }}
          >{p.label}</button>
        ))}
      </div>

      {/* 32-bit grid */}
      <div style={{ display: 'flex', gap: 3, flexWrap: 'wrap', marginBottom: 12 }}>
        {bits.map((bit, i) => (
          <div
            key={i}
            style={{
              width: 24, height: 24, borderRadius: 4, display: 'flex', alignItems: 'center', justifyContent: 'center',
              background: bit ? `${N}25` : '#ef444415',
              border: `1px solid ${bit ? N + '50' : '#ef444440'}`,
              fontSize: 10, fontFamily: 'var(--font-mono)', fontWeight: 700,
              color: bit ? N : '#ef4444',
            }}
          >{bit}</div>
        ))}
      </div>

      <div style={{ display: 'flex', gap: 16, fontSize: 12, color: 'var(--muted)', marginBottom: 16 }}>
        <span style={{ color: N, fontWeight: 600 }}>■ Network bits: {preset.cidr}</span>
        <span style={{ color: '#ef4444', fontWeight: 600 }}>■ Host bits: {32 - preset.cidr}</span>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12 }}>
        <div style={{ background: '#ffffff05', borderRadius: 8, padding: '12px 14px', border: '1px solid var(--border)' }}>
          <p style={{ fontSize: 11, color: 'var(--muted)', margin: '0 0 4px', textTransform: 'uppercase', fontFamily: 'var(--font-mono)' }}>Subnet Mask</p>
          <p style={{ fontSize: 14, fontFamily: 'var(--font-mono)', fontWeight: 700, color: 'var(--text)', margin: 0 }}>{preset.mask}</p>
        </div>
        <div style={{ background: '#ffffff05', borderRadius: 8, padding: '12px 14px', border: '1px solid var(--border)' }}>
          <p style={{ fontSize: 11, color: 'var(--muted)', margin: '0 0 4px', textTransform: 'uppercase', fontFamily: 'var(--font-mono)' }}>Usable Hosts</p>
          <p style={{ fontSize: 14, fontFamily: 'var(--font-mono)', fontWeight: 700, color: N, margin: 0 }}>{preset.hosts.toLocaleString()}</p>
        </div>
        <div style={{ background: '#ffffff05', borderRadius: 8, padding: '12px 14px', border: '1px solid var(--border)' }}>
          <p style={{ fontSize: 11, color: 'var(--muted)', margin: '0 0 4px', textTransform: 'uppercase', fontFamily: 'var(--font-mono)' }}>Total Addresses</p>
          <p style={{ fontSize: 14, fontFamily: 'var(--font-mono)', fontWeight: 700, color: 'var(--text)', margin: 0 }}>{(preset.hosts + 2).toLocaleString()}</p>
        </div>
      </div>
    </div>
  )
}

// ── Hex Color Decoder ─────────────────────────────────────────────────────────
function HexColorDecoder() {
  const [hex, setHex] = useState('FF5733')
  const clean = hex.replace('#', '').slice(0, 6).toUpperCase()
  const isValid = /^[0-9A-Fa-f]{6}$/.test(clean)
  const r = isValid ? parseInt(clean.slice(0, 2), 16) : 0
  const g = isValid ? parseInt(clean.slice(2, 4), 16) : 0
  const b = isValid ? parseInt(clean.slice(4, 6), 16) : 0

  return (
    <div style={{ background: 'var(--surface)', border: `1px solid ${N}30`, borderRadius: 12, padding: '24px', margin: '28px 0' }}>
      <p style={{ fontSize: 11, fontWeight: 700, color: N, fontFamily: 'var(--font-mono)', textTransform: 'uppercase', letterSpacing: '.1em', margin: '0 0 16px' }}>Hex Color Decoder — CSS Colors Are Pure Hex Math</p>
      <div style={{ display: 'flex', gap: 12, alignItems: 'center', marginBottom: 20, flexWrap: 'wrap' }}>
        <input
          value={hex}
          onChange={e => setHex(e.target.value.replace(/[^0-9a-fA-F#]/g, ''))}
          placeholder="FF5733"
          style={{
            padding: '10px 14px', borderRadius: 8, border: `1px solid ${N}40`,
            background: 'var(--bg)', color: 'var(--text)', fontSize: 15,
            fontFamily: 'var(--font-mono)', width: 140,
          }}
        />
        {isValid && (
          <div style={{
            width: 56, height: 40, borderRadius: 8, border: '1px solid var(--border)',
            background: `#${clean}`,
          }} />
        )}
      </div>

      {isValid && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12 }}>
          {[
            { ch: 'Red', hex: clean.slice(0, 2), val: r, accent: '#ef4444' },
            { ch: 'Green', hex: clean.slice(2, 4), val: g, accent: '#22c55e' },
            { ch: 'Blue', hex: clean.slice(4, 6), val: b, accent: '#3b82f6' },
          ].map(({ ch, hex: h, val, accent }) => (
            <div key={ch} style={{ background: `${accent}10`, border: `1px solid ${accent}30`, borderRadius: 8, padding: '14px' }}>
              <p style={{ fontSize: 11, fontWeight: 700, color: accent, fontFamily: 'var(--font-mono)', textTransform: 'uppercase', margin: '0 0 6px' }}>{ch}</p>
              <p style={{ fontSize: 18, fontFamily: 'var(--font-mono)', fontWeight: 700, color: 'var(--text)', margin: '0 0 4px' }}>0x{h}</p>
              <p style={{ fontSize: 13, color: 'var(--muted)', margin: '0 0 2px', fontFamily: 'var(--font-mono)' }}>{val} decimal</p>
              <p style={{ fontSize: 12, color: 'var(--muted)', margin: 0, fontFamily: 'var(--font-mono)' }}>{val.toString(2).padStart(8, '0')} binary</p>
              <div style={{ marginTop: 8, height: 6, borderRadius: 3, background: 'var(--border)' }}>
                <div style={{ height: '100%', borderRadius: 3, background: accent, width: `${(val / 255) * 100}%` }} />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default function BinaryAndHex() {
  return (
    <LearnLayout
      title="Binary and Hexadecimal"
      description="Every IP address, MAC address, subnet mask, and port number is binary under the hood. Learn to read and manipulate the number systems that power every networking concept in this course."
      section="Networking Fundamentals"
      readTime="30 min"
      updatedAt="May 2026"
    >

      {/* ── PART 1 ── */}
      <Part n="01" title="Why Engineers Must Own These Number Systems" />

      <P>
        A network engineer who cannot read binary is like a surgeon who cannot read an X-ray. You can follow a procedure, but you cannot diagnose. When a Cisco router prints <Hl>10.0.0.0/8</Hl> in a routing table, when Wireshark shows <Hl>0x0800</Hl> as the EtherType, when an AWS security group rule shows <Hl>192.168.1.0/255.255.255.192</Hl> — you need to decompose those values instantly, in your head, without a calculator.
      </P>

      <P>
        This module is not about math for its own sake. Every concept here maps directly to something you will configure, debug, or explain within the next ten modules. Subnetting is nothing but binary AND operations on two 32-bit numbers. VLANs are identified by 12-bit binary tags. TLS record lengths are encoded as big-endian hex in packet captures. MAC addresses are 48-bit hex literals. VXLAN uses a 24-bit network identifier. IPv6 is 128-bit hex. The pattern is everywhere.
      </P>

      <P>
        There are three number systems a network engineer uses daily: <Hl>decimal</Hl> (base-10, for human communication), <Hl>binary</Hl> (base-2, for what hardware actually processes), and <Hl>hexadecimal</Hl> (base-16, for a compact human representation of binary). All three represent the same underlying values — just in different notations. Converting between them is mechanical and fast once your fingers know the patterns.
      </P>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16, margin: '28px 0' }}>
        {[
          { base: 'Binary', symbol: '2', digits: '0, 1', useCase: 'Subnet masks, CIDR bits, flag fields, hardware logic', accent: '#f59e0b' },
          { base: 'Decimal', symbol: '10', useCase: 'IPv4 octets displayed to humans, port numbers, TTL values', digits: '0–9', accent: '#3b82f6' },
          { base: 'Hexadecimal', symbol: '16', useCase: 'MAC addresses, EtherTypes, IPv6 addresses, TLS record parsing', digits: '0–9, A–F', accent: N },
        ].map(({ base, symbol, digits, useCase, accent }) => (
          <div key={base} style={{ background: `${accent}08`, border: `1px solid ${accent}25`, borderRadius: 10, padding: '18px' }}>
            <div style={{ fontSize: 28, fontFamily: 'var(--font-mono)', fontWeight: 900, color: accent, marginBottom: 8 }}>Base {symbol}</div>
            <p style={{ fontSize: 13, fontWeight: 700, color: 'var(--text)', margin: '0 0 4px' }}>{base}</p>
            <p style={{ fontSize: 12, color: 'var(--muted)', margin: '0 0 10px', fontFamily: 'var(--font-mono)' }}>Digits: {digits}</p>
            <p style={{ fontSize: 12, color: 'var(--muted)', lineHeight: 1.7, margin: 0 }}>{useCase}</p>
          </div>
        ))}
      </div>

      <HR />

      {/* ── PART 2 ── */}
      <Part n="02" title="Binary: The Language of Silicon" />

      <P>
        A transistor has two states: on (1) and off (0). Every CPU, NIC, switch ASIC, and router forwarding engine is built from billions of these switches. When data travels over a wire, it is literally voltage pulses representing 1s and 0s. Binary is not an abstraction — it is the physical reality of networking hardware.
      </P>

      <H>Place Values and Positional Notation</H>

      <P>
        In decimal, each digit position is a power of 10: the ones column (10⁰=1), tens (10¹=10), hundreds (10²=100), and so on. Binary uses the same positional logic, but each position is a power of 2.
      </P>

      <P>
        For an 8-bit value (one octet — the fundamental unit of IPv4), the place values from left (most significant) to right (least significant) are: <Hl>128, 64, 32, 16, 8, 4, 2, 1</Hl>. These eight values sum to 255, which is 2⁸−1, the maximum 8-bit unsigned integer. To decode a binary octet, identify which bits are 1, then add their corresponding place values.
      </P>

      <div style={{ background: 'var(--surface)', border: `1px solid ${N}25`, borderRadius: 10, padding: '20px 24px', margin: '24px 0', fontFamily: 'var(--font-mono)', fontSize: 13 }}>
        <p style={{ color: N, margin: '0 0 12px', fontWeight: 700 }}>// Decode binary 11000000 (the first octet of 192.168.1.1)</p>
        <p style={{ color: 'var(--muted)', margin: '0 0 6px' }}>Position:  128  64  32  16   8   4   2   1</p>
        <p style={{ color: 'var(--muted)', margin: '0 0 6px' }}>Bit:         1   1   0   0   0   0   0   0</p>
        <p style={{ color: 'var(--text)', margin: '0 0 8px' }}>Active:    128 + 64 = 192  ✓</p>
        <p style={{ color: 'var(--muted)', margin: '0 0 6px' }}>Position:  128  64  32  16   8   4   2   1</p>
        <p style={{ color: 'var(--muted)', margin: '0 0 6px' }}>Bit:         1   0   1   0   1   0   0   0</p>
        <p style={{ color: 'var(--text)', margin: 0 }}>Active:    128 + 32 + 8 = 168  ✓  (second octet of 192.168.1.1)</p>
      </div>

      <H>Decimal to Binary: The Subtraction Method</H>

      <P>
        To convert decimal to binary, work left to right through the place values. At each position, if the remaining value is ≥ that place value, write a 1 and subtract. Otherwise write a 0 and move on. This is the method CCNA students use to calculate subnet boundaries in under 10 seconds on an exam.
      </P>

      <div style={{ background: 'var(--surface)', border: `1px solid ${N}25`, borderRadius: 10, padding: '20px 24px', margin: '24px 0', fontFamily: 'var(--font-mono)', fontSize: 13 }}>
        <p style={{ color: N, margin: '0 0 12px', fontWeight: 700 }}>// Convert 172 to binary</p>
        <p style={{ color: 'var(--muted)', margin: '0 0 4px' }}>172 ≥ 128? YES → bit=1, remainder = 172-128 = 44</p>
        <p style={{ color: 'var(--muted)', margin: '0 0 4px' }}> 44 ≥  64? NO  → bit=0, remainder = 44</p>
        <p style={{ color: 'var(--muted)', margin: '0 0 4px' }}> 44 ≥  32? YES → bit=1, remainder = 44-32 = 12</p>
        <p style={{ color: 'var(--muted)', margin: '0 0 4px' }}> 12 ≥  16? NO  → bit=0, remainder = 12</p>
        <p style={{ color: 'var(--muted)', margin: '0 0 4px' }}> 12 ≥   8? YES → bit=1, remainder = 12-8 = 4</p>
        <p style={{ color: 'var(--muted)', margin: '0 0 4px' }}>  4 ≥   4? YES → bit=1, remainder = 4-4 = 0</p>
        <p style={{ color: 'var(--muted)', margin: '0 0 4px' }}>  0 ≥   2? NO  → bit=0</p>
        <p style={{ color: 'var(--muted)', margin: '0 0 12px' }}>  0 ≥   1? NO  → bit=0</p>
        <p style={{ color: 'var(--text)', margin: 0, fontWeight: 700 }}>172 (decimal) = 10101100 (binary) ✓</p>
      </div>

      <ProTip>
        Memorize the 8 place values: 128, 64, 32, 16, 8, 4, 2, 1. Senior engineers recite them like a phone number. For any octet between 0–255, you can decode it in about 3 seconds. In a live troubleshooting session, being able to verify &ldquo;10.10.50.0/24 — the .50 octet is 00110010 so the first host is .1 and broadcast is .255&rdquo; without opening a calculator signals competence.
      </ProTip>

      <H>The Critical Subnet Mask Binary Patterns</H>

      <P>
        Subnet masks have a specific constraint: all network bits must be <Hl>contiguous 1s from the left</Hl>, followed by contiguous 0s. This means only 9 valid octet values appear in subnet masks: 0, 128, 192, 224, 240, 248, 252, 254, 255. Knowing their binary representations cold is non-negotiable for subnetting.
      </P>

      <div style={{ overflowX: 'auto', margin: '24px 0' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13, fontFamily: 'var(--font-mono)' }}>
          <thead>
            <tr style={{ borderBottom: `2px solid ${N}30` }}>
              {['Decimal', 'Binary', 'Network Bits', 'Usage'].map(h => (
                <th key={h} style={{ padding: '10px 14px', textAlign: 'left', color: N, fontWeight: 700, fontSize: 11, textTransform: 'uppercase', letterSpacing: '.05em' }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {[
              ['0',   '00000000', '0', 'All host bits — last octet of /8, /16, /24'],
              ['128', '10000000', '1', 'Last octet of /25 split'],
              ['192', '11000000', '2', 'Last octet of /26 split (64 hosts each)'],
              ['224', '11100000', '3', 'Last octet of /27 split (32 hosts each)'],
              ['240', '11110000', '4', 'Last octet of /28 split (16 hosts each)'],
              ['248', '11111000', '5', 'Last octet of /29 split (8 hosts each)'],
              ['252', '11111100', '6', 'Last octet of /30 — point-to-point links'],
              ['254', '11111110', '7', 'Last octet of /31 — loopback / RFC 3021'],
              ['255', '11111111', '8', 'Fully masked octet — classful A/B/C boundary'],
            ].map(([dec, bin, bits, usage], i) => (
              <tr key={dec} style={{ background: i % 2 ? 'var(--surface)' : 'transparent', borderBottom: '1px solid var(--border)' }}>
                <td style={{ padding: '10px 14px', color: '#3b82f6', fontWeight: 700 }}>{dec}</td>
                <td style={{ padding: '10px 14px', color: '#f59e0b', letterSpacing: 2 }}>{bin}</td>
                <td style={{ padding: '10px 14px', color: N }}>{bits}</td>
                <td style={{ padding: '10px 14px', color: 'var(--muted)', fontFamily: 'inherit', fontSize: 12 }}>{usage}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Err title="Treating /24 and 255.255.255.0 as different things">
        They are identical. <code style={{ fontFamily: 'var(--font-mono)', color: N }}>/24</code> (CIDR notation) and <code style={{ fontFamily: 'var(--font-mono)', color: N }}>255.255.255.0</code> (dotted-decimal notation) both mean 24 consecutive 1-bits: <code style={{ fontFamily: 'var(--font-mono)', color: '#f59e0b' }}>11111111.11111111.11111111.00000000</code>. The confusion leads to copy-paste errors in firewall rules — someone types <code>/255.255.255.0</code> in a CIDR field and wonders why the rule rejects.
      </Err>

      <H>Binary Bitwise Operations</H>

      <P>
        Three bitwise operations appear constantly in networking. The most critical is AND — it is literally how a router calculates the network address from an IP address and subnet mask.
      </P>

      <div style={{ background: 'var(--surface)', border: `1px solid ${N}25`, borderRadius: 10, padding: '20px 24px', margin: '24px 0', fontFamily: 'var(--font-mono)', fontSize: 13 }}>
        <p style={{ color: N, margin: '0 0 16px', fontWeight: 700 }}>// AND — both bits must be 1 → used for network address calculation</p>
        <p style={{ color: 'var(--muted)', margin: '0 0 4px' }}>IP:   192.168.10.50  →  11000000.10101000.00001010.00110010</p>
        <p style={{ color: 'var(--muted)', margin: '0 0 4px' }}>Mask: 255.255.255.0  →  11111111.11111111.11111111.00000000</p>
        <p style={{ color: 'var(--text)', margin: '0 0 4px' }}>AND:  192.168.10.0   →  11000000.10101000.00001010.00000000</p>
        <p style={{ color: N, margin: '20px 0 8px', fontWeight: 700 }}>// OR — either bit is 1 → used to derive broadcast address</p>
        <p style={{ color: 'var(--muted)', margin: '0 0 4px' }}>Network: 192.168.10.0  →  ...00001010.00000000</p>
        <p style={{ color: 'var(--muted)', margin: '0 0 4px' }}>Inv mask: 0.0.0.255     →  ...00000000.11111111</p>
        <p style={{ color: 'var(--text)', margin: '0 0 4px' }}>OR:       192.168.10.255 →  ...00001010.11111111</p>
        <p style={{ color: N, margin: '20px 0 8px', fontWeight: 700 }}>// NOT — flip all bits → used to compute wildcard masks (Cisco ACLs)</p>
        <p style={{ color: 'var(--muted)', margin: '0 0 4px' }}>Mask:     255.255.255.0  →  11111111.11111111.11111111.00000000</p>
        <p style={{ color: 'var(--text)', margin: 0 }}>Wildcard: 0.0.0.255      →  00000000.00000000.00000000.11111111</p>
      </div>

      <P>
        When you configure a Cisco access-list with <Hl>access-list 1 permit 10.0.0.0 0.0.0.255</Hl>, that <code style={{ fontFamily: 'var(--font-mono)' }}>0.0.0.255</code> is a wildcard mask — the bitwise NOT of <code style={{ fontFamily: 'var(--font-mono)' }}>255.255.255.0</code>. Bits set to 0 in the wildcard must match exactly; bits set to 1 are &ldquo;don&rsquo;t care.&rdquo; This is a different convention than subnet masks, which trips up many candidates.
      </P>

      <SubnetVisualizer />

      <HR />

      {/* ── PART 3 ── */}
      <Part n="03" title="Hexadecimal: Binary Made Readable" />

      <P>
        Binary is unambiguous and hardware-native, but reading 48 bits of 0s and 1s for a MAC address is slow and error-prone. Hexadecimal solves this by grouping every 4 binary bits into one hex digit. Since 2⁴ = 16, each hex digit maps exactly to one nibble (4 bits), and one byte (8 bits) = two hex digits. This makes hex the standard representation for any binary data in protocol documentation, packet captures, and hardware addresses.
      </P>

      <H>The Hex Digit Map</H>

      <div style={{ overflowX: 'auto', margin: '20px 0' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
          <thead>
            <tr style={{ borderBottom: `2px solid ${N}30` }}>
              {['Decimal', 'Binary (4-bit)', 'Hex'].map(h => (
                <th key={h} style={{ padding: '10px 14px', textAlign: 'left', color: N, fontWeight: 700, fontSize: 11, textTransform: 'uppercase' }}>{h}</th>
              ))}
              {['Decimal', 'Binary (4-bit)', 'Hex'].map(h => (
                <th key={h + '2'} style={{ padding: '10px 14px', textAlign: 'left', color: N, fontWeight: 700, fontSize: 11, textTransform: 'uppercase', borderLeft: `1px solid ${N}20` }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {[
              [0, '0000', '0', 8, '1000', '8'],
              [1, '0001', '1', 9, '1001', '9'],
              [2, '0010', '2', 10, '1010', 'A'],
              [3, '0011', '3', 11, '1011', 'B'],
              [4, '0100', '4', 12, '1100', 'C'],
              [5, '0101', '5', 13, '1101', 'D'],
              [6, '0110', '6', 14, '1110', 'E'],
              [7, '0111', '7', 15, '1111', 'F'],
            ].map(([d1, b1, h1, d2, b2, h2], i) => (
              <tr key={i} style={{ background: i % 2 ? 'var(--surface)' : 'transparent', borderBottom: '1px solid var(--border)' }}>
                <td style={{ padding: '8px 14px', fontFamily: 'var(--font-mono)', color: '#3b82f6' }}>{d1}</td>
                <td style={{ padding: '8px 14px', fontFamily: 'var(--font-mono)', color: '#f59e0b', letterSpacing: 2 }}>{b1}</td>
                <td style={{ padding: '8px 14px', fontFamily: 'var(--font-mono)', color: N, fontWeight: 700 }}>{h1}</td>
                <td style={{ padding: '8px 14px', fontFamily: 'var(--font-mono)', color: '#3b82f6', borderLeft: `1px solid ${N}20` }}>{d2}</td>
                <td style={{ padding: '8px 14px', fontFamily: 'var(--font-mono)', color: '#f59e0b', letterSpacing: 2 }}>{b2}</td>
                <td style={{ padding: '8px 14px', fontFamily: 'var(--font-mono)', color: N, fontWeight: 700 }}>{h2}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <P>
        The digits 0–9 are the same in decimal and hex. A–F are the critical additions. The trick most engineers use: if you see A, it&rsquo;s 10. B=11, C=12, D=13, E=14, F=15. &ldquo;Alphabetically after 9, count up from 10.&rdquo;
      </P>

      <H>Converting Between Binary and Hex</H>

      <P>
        This conversion is the one you do most frequently in packet analysis. The rule is: split binary into groups of 4, convert each group to one hex digit. Going the other way, expand each hex digit to exactly 4 binary bits.
      </P>

      <div style={{ background: 'var(--surface)', border: `1px solid ${N}25`, borderRadius: 10, padding: '20px 24px', margin: '24px 0', fontFamily: 'var(--font-mono)', fontSize: 13 }}>
        <p style={{ color: N, margin: '0 0 12px', fontWeight: 700 }}>// Binary → Hex: group by 4 bits</p>
        <p style={{ color: 'var(--muted)', margin: '0 0 4px' }}>Binary: 1010 1111 0001 0011</p>
        <p style={{ color: 'var(--muted)', margin: '0 0 4px' }}>Groups: 1010 | 1111 | 0001 | 0011</p>
        <p style={{ color: 'var(--text)', margin: '0 0 20px' }}>Hex:    A      F      1      3   →  0xAF13</p>

        <p style={{ color: N, margin: '0 0 12px', fontWeight: 700 }}>// Hex → Binary: expand each digit to 4 bits</p>
        <p style={{ color: 'var(--muted)', margin: '0 0 4px' }}>Hex:    0x2C → 2    C</p>
        <p style={{ color: 'var(--muted)', margin: '0 0 4px' }}>Binary:        0010 1100</p>
        <p style={{ color: 'var(--text)', margin: 0 }}>Decimal: 0x2C = 2×16 + 12 = 32 + 12 = 44</p>
      </div>

      <H>Hex in Networking: Real-World Appearances</H>

      <div style={{ margin: '24px 0' }}>
        <Term word="MAC Address" def="48-bit hardware address, written as 6 hex octets: aa:bb:cc:dd:ee:ff — first 3 octets (OUI) identify the manufacturer, last 3 are the device serial." />
        <Term word="EtherType" def="2-byte hex field in Ethernet frames: 0x0800 = IPv4, 0x0806 = ARP, 0x86DD = IPv6, 0x8100 = 802.1Q VLAN tag. Wireshark shows these constantly." />
        <Term word="IPv6 Address" def="128 bits written as 8 groups of 4 hex digits: 2001:0db8:85a3:0000:0000:8a2e:0370:7334. Leading zeros per group can be collapsed." />
        <Term word="TLS Record" def="Each TLS record starts with a 1-byte content type, 2-byte version, 2-byte length — all shown in hex in Wireshark&apos;s bytes pane." />
        <Term word="VLAN Tag (802.1Q)" def="4-byte insertion into Ethernet header: 0x8100 (TPID) + 3-bit PCP + 1-bit DEI + 12-bit VLAN ID. The 12-bit ID supports 4094 VLANs (0x000 and 0xFFF reserved)." />
        <Term word="BGP AS Number" def="32-bit values shown in hex in low-level BGP packets: AS 65000 = 0xFDE8. 2-byte ASNs (legacy) fit in 0x0000–0xFFFF." />
      </div>

      <HexColorDecoder />

      <P>
        The hex color decoder demonstrates something useful: CSS colors like <Hl>#FF5733</Hl> are pure hex math — two digits per RGB channel, each representing 0–255. When you&rsquo;ve internalized hex, you can look at <code style={{ fontFamily: 'var(--font-mono)' }}>#0A0A0A</code> and instantly know it&rsquo;s a very dark near-black (10, 10, 10 in RGB). The same mental model applies to reading packet bytes.
      </P>

      <HR />

      {/* ── PART 4 ── */}
      <Part n="04" title="The Interactive Converter and Deep Practice" />

      <BaseConverter />

      <H>Hex Arithmetic: Adding and Subtracting</H>

      <P>
        You occasionally need to add or subtract hex values manually — for example, calculating the last usable host in a subnet or decoding a relative sequence number offset in a TCP stream. The rules are the same as decimal arithmetic, but you carry at 16 instead of 10.
      </P>

      <div style={{ background: 'var(--surface)', border: `1px solid ${N}25`, borderRadius: 10, padding: '20px 24px', margin: '24px 0', fontFamily: 'var(--font-mono)', fontSize: 13 }}>
        <p style={{ color: N, margin: '0 0 12px', fontWeight: 700 }}>// Hex addition: 0xA8 + 0x3F</p>
        <p style={{ color: 'var(--muted)', margin: '0 0 4px' }}>Ones column: 8 + F = 8 + 15 = 23 decimal = 1×16 + 7 → write 7, carry 1</p>
        <p style={{ color: 'var(--muted)', margin: '0 0 4px' }}>Sixteens col: A + 3 + 1(carry) = 10 + 3 + 1 = 14 decimal = E</p>
        <p style={{ color: 'var(--text)', margin: '0 0 20px' }}>0xA8 + 0x3F = 0xE7  (168 + 63 = 231 ✓)</p>

        <p style={{ color: N, margin: '0 0 12px', fontWeight: 700 }}>// Practical: last host in 192.168.1.0/26 (64 addresses)</p>
        <p style={{ color: 'var(--muted)', margin: '0 0 4px' }}>Network:   192.168.1.0   → last octet 0x00</p>
        <p style={{ color: 'var(--muted)', margin: '0 0 4px' }}>Block size: 64 = 0x40</p>
        <p style={{ color: 'var(--muted)', margin: '0 0 4px' }}>Broadcast: 0x00 + 0x40 - 0x01 = 0x3F = 63</p>
        <p style={{ color: 'var(--text)', margin: 0 }}>Last host: 192.168.1.62 | Broadcast: 192.168.1.63</p>
      </div>

      <H>Two&rsquo;s Complement: Negative Numbers in Binary</H>

      <P>
        Network protocols rarely use negative numbers in headers, but understanding two&rsquo;s complement matters for: interpreting TCP sequence number arithmetic (which wraps at 2³²), understanding signed vs unsigned port/length fields, and reading error codes in ICMP or BGP NOTIFICATION messages.
      </P>

      <P>
        In an n-bit two&rsquo;s complement system, the most significant bit is the sign bit: 0 = positive, 1 = negative. To negate a value, invert all bits then add 1. For an 8-bit signed integer, the range is −128 to +127 (0x80 to 0x7F). For 16-bit signed: −32768 to +32767. TCP sequence numbers are 32-bit <Hl>unsigned</Hl> (0 to 2³²−1) — they wrap around, and TCP&rsquo;s sequence number comparison uses modular arithmetic rather than simple greater-than.
      </P>

      <div style={{ background: 'var(--surface)', border: `1px solid ${N}25`, borderRadius: 10, padding: '20px 24px', margin: '24px 0', fontFamily: 'var(--font-mono)', fontSize: 13 }}>
        <p style={{ color: N, margin: '0 0 12px', fontWeight: 700 }}>// Two&apos;s complement of -1 in 8-bit</p>
        <p style={{ color: 'var(--muted)', margin: '0 0 4px' }}>+1 in binary: 00000001</p>
        <p style={{ color: 'var(--muted)', margin: '0 0 4px' }}>Invert bits:  11111110</p>
        <p style={{ color: 'var(--muted)', margin: '0 0 4px' }}>Add 1:        11111111  ← this is -1 (0xFF)</p>
        <p style={{ color: 'var(--text)', margin: '0 0 20px' }}>0xFF as signed 8-bit = -1.  As unsigned 8-bit = 255.</p>

        <p style={{ color: N, margin: '0 0 8px', fontWeight: 700 }}>// TCP sequence number wrap-around (RFC 793)</p>
        <p style={{ color: 'var(--muted)', margin: '0 0 4px' }}>Max uint32: 0xFFFFFFFF = 4,294,967,295</p>
        <p style={{ color: 'var(--text)', margin: 0 }}>SEQ 0xFFFFFF00 + 512 bytes → wraps to 0x000001FF  (valid, expected)</p>
      </div>

      <ProTip>
        When you see 0xFF in a protocol field, immediately think &ldquo;all ones&rdquo; — 11111111 in binary. This value often has special meaning: ARP uses 0xFF:FF:FF:FF:FF:FF as the broadcast MAC, ICMP uses TTL=0xFF (255) for some probe tools, and VLAN 0xFFF (4095) is reserved and cannot be assigned. All-ones patterns signal broadcast, maximum, or reserved in protocol design.
      </ProTip>

      <HR />

      {/* ── PART 5 ── */}
      <Part n="05" title="How This Applies to Every Module Ahead" />

      <H>IPv4 Addressing (Module 10–11)</H>

      <P>
        Every IPv4 address is a 32-bit binary number. Subnetting is binary AND between the address and mask. CIDR notation is a count of leading 1-bits. The number of host addresses in a subnet is <Hl>2^(host bits) − 2</Hl> (subtract network and broadcast). You cannot subnet without binary.
      </P>

      <div style={{ background: 'var(--surface)', border: `1px solid ${N}25`, borderRadius: 10, padding: '20px 24px', margin: '24px 0', fontFamily: 'var(--font-mono)', fontSize: 13 }}>
        <p style={{ color: N, margin: '0 0 10px', fontWeight: 700 }}>// How many hosts fit in 10.0.0.0/22?</p>
        <p style={{ color: 'var(--muted)', margin: '0 0 4px' }}>/22 means 22 network bits, 10 host bits</p>
        <p style={{ color: 'var(--muted)', margin: '0 0 4px' }}>Host addresses = 2^10 - 2 = 1024 - 2 = 1,022</p>
        <p style={{ color: 'var(--text)', margin: '0 0 16px' }}>Range: 10.0.0.1 → 10.0.3.254  | Broadcast: 10.0.3.255</p>
        <p style={{ color: N, margin: '0 0 10px', fontWeight: 700 }}>// Subnet mask for /22</p>
        <p style={{ color: 'var(--muted)', margin: '0 0 4px' }}>11111111.11111111.11111100.00000000</p>
        <p style={{ color: 'var(--text)', margin: 0 }}>255.255.252.0</p>
      </div>

      <H>MAC Addresses and Ethernet (Module 08–09)</H>

      <P>
        MAC addresses are 48-bit binary numbers written in hex: <Hl>aa:bb:cc:dd:ee:ff</Hl>. The OUI (Organizationally Unique Identifier) is the first 24 bits (3 bytes). The broadcast MAC is all 1s: <Hl>ff:ff:ff:ff:ff:ff</Hl>. The multicast bit is bit 0 of the first byte (LSB) — if it&rsquo;s 1, the address is multicast. You need hex to read these.
      </P>

      <H>IPv6 (Module 12)</H>

      <P>
        IPv6 is 128-bit hex. That&rsquo;s it. The address <Hl>2001:0db8:85a3::8a2e:0370:7334</Hl> is eight groups of 16-bit hex values. The <Hl>::</Hl> is shorthand for consecutive all-zero groups. Expanding it: <code style={{ fontFamily: 'var(--font-mono)' }}>2001:0db8:85a3:0000:0000:8a2e:0370:7334</code>. Without hex fluency, IPv6 addresses are just noise.
      </P>

      <H>VLANs, QoS, and 802.1Q (Module 15)</H>

      <P>
        The 802.1Q tag inserts a 4-byte field into the Ethernet header. Bytes 1–2 are always <Hl>0x8100</Hl> (the TPID). The next 12 bits are the VLAN ID (0–4095, with 0 and 4095 reserved). Reading a 802.1Q tag in Wireshark requires you to extract the 12-bit VLAN ID from a 2-byte hex field by applying a binary mask: <code style={{ fontFamily: 'var(--font-mono)' }}>0x10AC & 0x0FFF = 0x00AC = VLAN 172</code>.
      </P>

      <H>TLS and Packet Analysis (Module 18)</H>

      <P>
        TLS records in Wireshark are displayed as raw hex bytes. The first byte tells you the record type: <Hl>0x16</Hl> = Handshake, <Hl>0x17</Hl> = Application Data, <Hl>0x15</Hl> = Alert. Bytes 2–3 encode the TLS version: <Hl>0x0303</Hl> = TLS 1.2, <Hl>0x0304</Hl> = TLS 1.3 (legacy_record_version). Bytes 4–5 are a big-endian 16-bit length. You decode this from hex in real-time during a packet analysis session.
      </P>

      <HR />

      {/* ── PART 6 ── */}
      <Part n="06" title="A Day in the Life: Google SRE Debugs a Routing Loop" />

      <P>
        <strong>Company:</strong> Google, Mountain View, CA. <strong>Role:</strong> Network SRE, Core WAN team. <strong>Date:</strong> Tuesday morning, 9:12 AM. <strong>Situation:</strong> A BGP route leak combined with a misconfigured prefix-list using wrong hex masks is causing a forwarding loop affecting 3% of traffic toward a Google Cloud region. The on-call SRE needs to isolate and fix it — fast.
      </P>

      <div style={{ background: 'var(--surface)', border: `1px solid ${N}20`, borderRadius: 12, padding: '24px 28px', margin: '28px 0' }}>

        <TimeBlock time="09:12" label="PagerDuty fires — elevated RTT to us-west1">
          The alert shows RTT from backbone PoP to us-west1 jumped from 8ms to 340ms. The SRE opens the internal traffic dashboard and sees a TTL-exceeded ICMP flood in the MPLS core. TTL exhaustion means packets are looping. First task: find the loop.
        </TimeBlock>

        <TimeBlock time="09:17" label="Router trace shows suspicious hop">
          Running a traceroute from the Google backbone: hops 7 and 8 repeat, with TTL decrementing each time. The SRE SSH&rsquo;s into both routers to check the forwarding table. BGP shows a route for <code style={{ fontFamily: 'var(--font-mono)', color: N }}>10.88.64.0/18</code> pointing back and forth between the two routers. Neither has a valid exit path for that prefix — they are forwarding to each other.
        </TimeBlock>

        <TimeBlock time="09:24" label="Investigate prefix-list — find the hex mistake">
          The route is being accepted because a prefix-list filter on both routers is supposed to block <code style={{ fontFamily: 'var(--font-mono)', color: N }}>10.88.64.0/18</code> and more-specifics, but it&rsquo;s not matching. The SRE reads the filter config: <code style={{ fontFamily: 'var(--font-mono)', color: '#ef4444' }}>prefix-list BLOCK seq 10 deny 10.88.0.0/14 ge 18</code>. This should block /18s within 10.88.0.0/14. But 10.88.64.0 is not in 10.88.0.0/14 — it&rsquo;s in <code style={{ fontFamily: 'var(--font-mono)', color: N }}>10.88.0.0/10</code>.
          <br /><br />
          The SRE runs the binary check: 10.88.0.0/14 → last two bits of the 10-bit prefix determine the /14 boundary. 10.88 in binary: 00001010.01011000. A /14 mask covers the first 14 bits: 00001010.010110xx. The range is 10.88.0.0–10.91.255.255. The leaked route is 10.88.64.0 — which IS in range. So the prefix-list should match. Why doesn&rsquo;t it?
        </TimeBlock>

        <TimeBlock time="09:33" label="Binary decoding reveals the root cause">
          The SRE pulls the raw router config via RESTCONF and sees the prefix-list was generated by an automation script that produced the wrong mask. The script computed the mask in hex and got the bit boundary wrong: it output <code style={{ fontFamily: 'var(--font-mono)', color: '#ef4444' }}>0xFFFC0000</code> (which is /14 correct) but the ge 18 condition was never applied because the version of the script used a signed integer comparison — it treated the prefix length as a signed 8-bit value and compared it to 18, but the leaked route had a prefix length field in the NLRI encoded as <code style={{ fontFamily: 'var(--font-mono)', color: '#ef4444' }}>0x92</code> in the BGP UPDATE. In unsigned 8-bit, 0x92 = 146. In signed 8-bit two&rsquo;s complement, 0x92 = −110. The filter was comparing −110 &gt;= 18 → false. Route passes. Loop forms.
        </TimeBlock>

        <TimeBlock time="09:41" label="Fix deployed — loop breaks within 30 seconds">
          The SRE patches the automation script to use unsigned 8-bit comparison (prefix lengths are always 0–32 for IPv4, so they fit in 6 bits — treating them as signed 8-bit was the bug). The correct filter is pushed. Both routers drop the looping route. BGP converges. RTT returns to 8ms. Incident closed: 29 minutes.
        </TimeBlock>

        <TimeBlock time="10:05" label="Postmortem: binary type safety in automation">
          The postmortem action item: add a test suite to the prefix-list generator that verifies all prefix lengths are decoded as unsigned. The document notes that 0x80–0xFF in BGP NLRI prefix-length fields should be treated as invalid (prefix lengths &gt; 128 for IPv6 or &gt; 32 for IPv4 are impossible), and the parser should reject them rather than coercing them through signed arithmetic. A new validation check is added that flags any hex-decoded prefix length where the high bit is set.
        </TimeBlock>

      </div>

      <P>
        The entire incident traces back to one wrong assumption: that a binary byte used for a prefix length could be treated as a signed integer. The SRE who diagnosed it needed to know: (1) two&rsquo;s complement representation of 0x92, (2) that 0x92 unsigned = 146 and signed = −110, and (3) that BGP NLRI prefix-length fields are unsigned. All three are binary/hex fundamentals.
      </P>

      <HR />

      {/* ── PART 7 ── */}
      <Part n="07" title="Number System Fast-Reference" />

      <H>Powers of 2 You Must Know Cold</H>

      <div style={{ overflowX: 'auto', margin: '20px 0' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13, fontFamily: 'var(--font-mono)' }}>
          <thead>
            <tr style={{ borderBottom: `2px solid ${N}30` }}>
              {['Power', 'Value', 'Hex', 'Networking significance'].map(h => (
                <th key={h} style={{ padding: '10px 14px', textAlign: 'left', color: N, fontWeight: 700, fontSize: 11, textTransform: 'uppercase' }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {[
              ['2⁰', '1', '0x01', 'Minimum /32 host route'],
              ['2¹', '2', '0x02', '/31 p2p subnet (RFC 3021), 0 usable hosts by old rules'],
              ['2²', '4', '0x04', '/30 point-to-point (2 usable hosts)'],
              ['2³', '8', '0x08', '/29 (6 usable)'],
              ['2⁴', '16', '0x10', '/28 (14 usable), one hex digit'],
              ['2⁵', '32', '0x20', '/27 (30 usable)'],
              ['2⁶', '64', '0x40', '/26 (62 usable)'],
              ['2⁷', '128', '0x80', '/25, also the MSB of a byte'],
              ['2⁸', '256', '0x100', '/24 (254 usable) — most common subnet'],
              ['2⁹', '512', '0x200', '/23 (510 usable)'],
              ['2¹⁰', '1,024', '0x400', '/22 (1022 usable), also 1 KB'],
              ['2¹²', '4,096', '0x1000', 'Max VLANs (802.1Q 12-bit field)'],
              ['2¹⁶', '65,536', '0x10000', '/16 subnet, 65,534 usable, also 64 KB'],
              ['2²⁴', '16,777,216', '0x1000000', '/8 (Class A), BGP max-prefix common limit'],
              ['2³²', '4,294,967,296', '0x100000000', 'Max IPv4 addresses, also uint32 overflow boundary'],
              ['2⁴⁸', '281,474,976,710,656', '~281T', 'MAC address space (48-bit)'],
              ['2¹²⁸', '~3.4×10³⁸', '—', 'IPv6 total address space'],
            ].map(([pw, val, hex, note], i) => (
              <tr key={pw} style={{ background: i % 2 ? 'var(--surface)' : 'transparent', borderBottom: '1px solid var(--border)' }}>
                <td style={{ padding: '8px 14px', color: '#f59e0b', fontWeight: 700 }}>{pw}</td>
                <td style={{ padding: '8px 14px', color: 'var(--text)' }}>{val}</td>
                <td style={{ padding: '8px 14px', color: N }}>{hex}</td>
                <td style={{ padding: '8px 14px', color: 'var(--muted)', fontFamily: 'inherit', fontSize: 12 }}>{note}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <H>Quick Conversion Cheat Sheet</H>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, margin: '20px 0' }}>
        <div style={{ background: '#f59e0b08', border: '1px solid #f59e0b25', borderRadius: 10, padding: '18px' }}>
          <p style={{ fontSize: 12, fontWeight: 700, color: '#f59e0b', fontFamily: 'var(--font-mono)', textTransform: 'uppercase', margin: '0 0 12px' }}>Binary → Decimal</p>
          <p style={{ fontSize: 13, color: 'var(--muted)', lineHeight: 1.8, fontFamily: 'var(--font-mono)', margin: 0 }}>
            1. Read bits left to right<br />
            2. Sum place values where bit = 1<br />
            3. 11000000 = 128+64 = 192<br />
            4. 10101000 = 128+32+8 = 168
          </p>
        </div>
        <div style={{ background: `${N}08`, border: `1px solid ${N}25`, borderRadius: 10, padding: '18px' }}>
          <p style={{ fontSize: 12, fontWeight: 700, color: N, fontFamily: 'var(--font-mono)', textTransform: 'uppercase', margin: '0 0 12px' }}>Decimal → Binary</p>
          <p style={{ fontSize: 13, color: 'var(--muted)', lineHeight: 1.8, fontFamily: 'var(--font-mono)', margin: 0 }}>
            1. Work through 128,64,32,16,8,4,2,1<br />
            2. Subtract if ≥ value, write 1<br />
            3. 192 → 128✓64✓ = 11000000<br />
            4. 168 → 128✓32✓8✓ = 10101000
          </p>
        </div>
        <div style={{ background: '#3b82f608', border: '1px solid #3b82f625', borderRadius: 10, padding: '18px' }}>
          <p style={{ fontSize: 12, fontWeight: 700, color: '#3b82f6', fontFamily: 'var(--font-mono)', textTransform: 'uppercase', margin: '0 0 12px' }}>Hex → Decimal</p>
          <p style={{ fontSize: 13, color: 'var(--muted)', lineHeight: 1.8, fontFamily: 'var(--font-mono)', margin: 0 }}>
            1. Each digit × 16^position<br />
            2. 0xC0 = 12×16 + 0 = 192<br />
            3. 0xA8 = 10×16 + 8 = 168<br />
            4. 0x1F4 = 1×256 + 15×16 + 4 = 500
          </p>
        </div>
        <div style={{ background: '#8b5cf608', border: '1px solid #8b5cf625', borderRadius: 10, padding: '18px' }}>
          <p style={{ fontSize: 12, fontWeight: 700, color: '#8b5cf6', fontFamily: 'var(--font-mono)', textTransform: 'uppercase', margin: '0 0 12px' }}>Hex → Binary</p>
          <p style={{ fontSize: 13, color: 'var(--muted)', lineHeight: 1.8, fontFamily: 'var(--font-mono)', margin: 0 }}>
            1. Each hex digit → 4 bits<br />
            2. 0xC0 = C(1100) 0(0000) = 11000000<br />
            3. 0xA8 = A(1010) 8(1000) = 10101000<br />
            4. 0xFF = F(1111) F(1111) = 11111111
          </p>
        </div>
      </div>

      <HR />

      {/* ── PART 8 ── */}
      <Part n="08" title="Interview Questions" />

      <IQ q="What is the binary representation of 255.255.255.192, and what CIDR prefix does it represent?">
        <p style={{ margin: '0 0 10px' }}>255.255.255.192 in binary:</p>
        <ul style={{ margin: '0 0 12px', paddingLeft: 24, lineHeight: 1.9 }}>
          <li>255 = 11111111</li>
          <li>255 = 11111111</li>
          <li>255 = 11111111</li>
          <li>192 = 11000000 (128+64)</li>
        </ul>
        <p style={{ margin: '0 0 10px' }}>Full binary: <code style={{ fontFamily: 'var(--font-mono)', color: N }}>11111111.11111111.11111111.11000000</code></p>
        <p style={{ margin: 0 }}>Count the 1-bits: 24 from the first three octets + 2 from the last = <strong style={{ color: N }}>26 network bits = /26</strong>. A /26 subnet has 2^6 − 2 = <strong>62 usable host addresses</strong>.</p>
      </IQ>

      <IQ q="A Cisco ACL uses wildcard mask 0.0.3.255 to match a range of IPs. What range does 172.16.0.0 with that wildcard cover?">
        <p style={{ margin: '0 0 10px' }}>The wildcard mask 0.0.3.255 means &ldquo;the last 10 bits are don&rsquo;t care.&rdquo; The subnet mask equivalent is its bitwise complement: 255.255.252.0 = /22.</p>
        <p style={{ margin: '0 0 10px' }}>172.16.0.0/22 covers 172.16.0.0 through 172.16.3.255 — that is 2^10 = 1,024 addresses (1,022 usable hosts).</p>
        <p style={{ margin: 0 }}>The bits that must match: the first 22 bits of 172.16.0.0 (10101100.00010000.000000xx.xxxxxxxx). Any IP in 172.16.0.0–172.16.3.255 has those same first 22 bits set, so the ACL matches the entire /22 block.</p>
      </IQ>

      <IQ q="In a Wireshark capture you see EtherType 0x86DD. What protocol is this, and why does the EtherType field matter?">
        <p style={{ margin: '0 0 10px' }}>0x86DD is <strong style={{ color: N }}>IPv6</strong>. The EtherType field (bytes 12–13 of the Ethernet frame) tells the receiver how to parse the payload. Common values: 0x0800 = IPv4, 0x0806 = ARP, 0x8100 = 802.1Q VLAN, 0x8847 = MPLS unicast, 0x86DD = IPv6.</p>
        <p style={{ margin: 0 }}>If EtherType is 0x8100, there is a 4-byte 802.1Q tag inserted before the actual EtherType — the real payload type is in the 2 bytes after the VLAN tag. Tools like Wireshark handle this automatically, but when writing a BPF filter or parsing raw frames in code, you must account for the tag offset.</p>
      </IQ>

      <IQ q="How many addresses are in the block 10.0.0.0/20, and what is the broadcast address?">
        <p style={{ margin: '0 0 10px' }}>/20 means 20 network bits, 12 host bits. Addresses = 2^12 = <strong style={{ color: N }}>4,096</strong>. Usable hosts = 4,094.</p>
        <p style={{ margin: '0 0 10px' }}>Broadcast: to find it, write the network address in binary, set all host bits to 1:</p>
        <p style={{ margin: '0 0 10px', fontFamily: 'var(--font-mono)', fontSize: 13 }}>10.0.0.0 = 00001010.00000000.00000000.00000000</p>
        <p style={{ margin: '0 0 10px', fontFamily: 'var(--font-mono)', fontSize: 13 }}>Mask /20: first 20 bits fixed, last 12 set to 1:</p>
        <p style={{ margin: '0 0 10px', fontFamily: 'var(--font-mono)', fontSize: 13 }}>00001010.00000000.00001111.11111111</p>
        <p style={{ margin: 0 }}>Broadcast = <strong style={{ color: N }}>10.0.15.255</strong>. The block covers 10.0.0.0–10.0.15.255.</p>
      </IQ>

      <IQ q="What is the significance of the 7th bit (bit index 6) in a MAC address's first byte?">
        <p style={{ margin: '0 0 10px' }}>In MAC addresses, two special bits live in the first byte:</p>
        <ul style={{ margin: '0 0 12px', paddingLeft: 24, lineHeight: 1.9 }}>
          <li><strong>Bit 0 (LSB)</strong> — Multicast/Unicast bit. If 1, the address is a multicast or broadcast address (e.g., ff:ff:ff:ff:ff:ff for broadcast). If 0, it&rsquo;s unicast.</li>
          <li><strong>Bit 1 (second LSB)</strong> — Locally Administered bit. If 1, the address was assigned by an admin or generated locally (VMs, Docker containers, VMware VMs all set this). If 0, it&rsquo;s a globally unique OUI-assigned address (burned into hardware by the manufacturer).</li>
        </ul>
        <p style={{ margin: 0 }}>Example: a Docker container MAC of <code style={{ fontFamily: 'var(--font-mono)', color: N }}>02:42:ac:11:00:02</code> — the first byte is 0x02 = 00000010 in binary. Bit 1 is set: locally administered. Bit 0 is clear: unicast. This is why Docker bridges start with 02:42 — it signals software-assigned addresses.</p>
      </IQ>

      <HR />

      {/* ── PART 9 ── */}
      <Part n="09" title="Common Mistakes" />

      <Err title="Confusing network bits and host bits when calculating subnet size">
        A /26 has 26 network bits and 6 host bits, giving 2^6 = 64 addresses (62 usable). Beginners sometimes subtract the /26 prefix from 32 but then calculate hosts as 2^6 = 64 and forget to subtract 2 (network and broadcast addresses). Worse: some get confused and try 2^26 — yielding 67 million, which is obviously wrong for a LAN subnet.
      </Err>

      <Err title="Using signed integer libraries to parse binary protocol fields">
        As shown in the Google incident: protocol header fields (prefix lengths, TTL, port numbers) are unsigned unless explicitly documented as signed. Always use unsigned types (uint8_t, uint16_t, uint32_t in C/Go, or unsigned integers in Python struct.unpack with capital format codes). Treating TTL=0x80 (128) as a signed value gives −128 — a negative hop count that makes no sense and breaks comparisons.
      </Err>

      <Err title="Writing CIDR blocks with the host bits non-zero">
        <code style={{ fontFamily: 'var(--font-mono)', color: '#ef4444' }}>192.168.1.5/24</code> is technically a host address written with a mask, not a network block. The network block is <code style={{ fontFamily: 'var(--font-mono)', color: N }}>192.168.1.0/24</code>. Many router CLIs and firewall UIs accept the non-zero form but normalize it silently — however, Python&rsquo;s <code style={{ fontFamily: 'var(--font-mono)' }}>ipaddress.ip_network()</code> and AWS&rsquo;s CIDR validator will throw an error. Always zero out the host bits when writing network blocks.
      </Err>

      <Err title="Forgetting big-endian byte order in multi-byte hex fields">
        Network protocols use big-endian (most significant byte first) for multi-byte integers, per RFC 791. When you see bytes <code style={{ fontFamily: 'var(--font-mono)' }}>00 50</code> in a TCP port field in Wireshark, the port is 0x0050 = 80 (HTTP) — not 0x5000 = 20480. x86/ARM CPUs are little-endian, so when writing socket code in C, you must call <code style={{ fontFamily: 'var(--font-mono)' }}>htons()</code> / <code style={{ fontFamily: 'var(--font-mono)' }}>htonl()</code> to convert. Forgetting this converts port 80 to port 20480, and your connection silently goes to the wrong port.
      </Err>

      <HR />

      <KeyTakeaways items={[
        'Every IP address, subnet mask, MAC address, and protocol field is binary under the hood — decimal and hex are just display formats.',
        'Eight place values power all octet math: 128, 64, 32, 16, 8, 4, 2, 1. Memorize them. Subnetting is binary AND.',
        'Hex groups 4 binary bits into one character (nibble). One byte = two hex digits. MAC addresses are 48-bit hex; IPv6 is 128-bit hex.',
        'Only nine decimal values are valid in a subnet mask octet: 0, 128, 192, 224, 240, 248, 252, 254, 255 — each is a run of leading 1-bits.',
        'Bitwise AND derives the network address. Bitwise OR derives the broadcast. Bitwise NOT converts a subnet mask to a wildcard mask.',
        'CIDR /prefix is a count of leading 1-bits. Host bits = 32 − prefix. Usable hosts = 2^(host bits) − 2.',
        'All multi-byte protocol fields are big-endian (network byte order). Port 80 = 0x0050 in the wire, not 0x5000.',
        "Protocol fields are unsigned unless documented as signed — treating TTL or prefix-length as signed causes bugs that hide in production until traffic hits the edge case.",
      ]} />

    </LearnLayout>
  )
}
