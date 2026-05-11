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

// ── Subnet Practice Quiz ──────────────────────────────────────────────────────
function parseIP(ip: string): number[] | null {
  const parts = ip.trim().split('.')
  if (parts.length !== 4) return null
  const nums = parts.map(p => parseInt(p, 10))
  if (nums.some(n => isNaN(n) || n < 0 || n > 255)) return null
  return nums
}

function octetsToInt(o: number[]): number {
  return ((o[0] << 24) | (o[1] << 16) | (o[2] << 8) | o[3]) >>> 0
}
function intToIP(n: number): string {
  return [n >>> 24, (n >>> 16) & 0xff, (n >>> 8) & 0xff, n & 0xff].join('.')
}
function maskFromPrefix(p: number): number {
  return p === 0 ? 0 : (0xffffffff << (32 - p)) >>> 0
}

const QUIZ_QUESTIONS = [
  { ip: '172.16.45.200', prefix: 20, ask: 'network' },
  { ip: '10.200.150.75', prefix: 18, ask: 'broadcast' },
  { ip: '192.168.100.130', prefix: 25, ask: 'network' },
  { ip: '172.31.255.10', prefix: 22, ask: 'hosts' },
  { ip: '10.10.10.250', prefix: 29, ask: 'broadcast' },
  { ip: '192.168.50.200', prefix: 27, ask: 'network' },
  { ip: '172.20.100.5', prefix: 16, ask: 'hosts' },
  { ip: '10.0.0.50', prefix: 30, ask: 'broadcast' },
]

function getAnswer(ip: string, prefix: number, ask: string): string {
  const octets = parseIP(ip)!
  const ipInt = octetsToInt(octets)
  const maskInt = maskFromPrefix(prefix)
  const networkInt = (ipInt & maskInt) >>> 0
  const broadcastInt = (networkInt | (~maskInt >>> 0)) >>> 0
  if (ask === 'network') return intToIP(networkInt)
  if (ask === 'broadcast') return intToIP(broadcastInt)
  return String(Math.pow(2, 32 - prefix) - 2)
}

function SubnetQuiz() {
  const [qIdx, setQIdx] = useState(0)
  const [answer, setAnswer] = useState('')
  const [feedback, setFeedback] = useState<'correct' | 'wrong' | null>(null)
  const [score, setScore] = useState(0)
  const [done, setDone] = useState(false)

  const q = QUIZ_QUESTIONS[qIdx]
  const correct = getAnswer(q.ip, q.prefix, q.ask)

  const handleCheck = () => {
    const isCorrect = answer.trim() === correct
    setFeedback(isCorrect ? 'correct' : 'wrong')
    if (isCorrect) setScore(s => s + 1)
  }

  const handleNext = () => {
    if (qIdx + 1 >= QUIZ_QUESTIONS.length) {
      setDone(true)
    } else {
      setQIdx(i => i + 1)
      setAnswer('')
      setFeedback(null)
    }
  }

  const handleReset = () => {
    setQIdx(0)
    setAnswer('')
    setFeedback(null)
    setScore(0)
    setDone(false)
  }

  const askLabel = q.ask === 'network' ? 'network address' : q.ask === 'broadcast' ? 'broadcast address' : 'number of usable hosts'

  return (
    <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 14, overflow: 'hidden', margin: '28px 0' }}>
      <div style={{ padding: '18px 22px', borderBottom: '1px solid var(--border)', background: `${N}06` }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <p style={{ fontSize: 11, color: N, fontFamily: 'var(--font-mono)', fontWeight: 700, letterSpacing: '.1em', margin: '0 0 4px' }}>// INTERACTIVE — SUBNET PRACTICE QUIZ</p>
            <p style={{ fontSize: 13, color: 'var(--muted)', margin: 0 }}>Train mental subnetting speed. No calculator.</p>
          </div>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: 14, fontWeight: 700, color: N }}>{score}/{QUIZ_QUESTIONS.length}</div>
        </div>
      </div>

      <div style={{ padding: '24px 22px' }}>
        {done ? (
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: 36, fontWeight: 900, color: score >= 6 ? N : '#f59e0b', fontFamily: 'var(--font-mono)', marginBottom: 12 }}>{score}/{QUIZ_QUESTIONS.length}</div>
            <div style={{ fontSize: 15, color: 'var(--text)', marginBottom: 8 }}>
              {score === 8 ? 'Perfect score — you can subnet in your head.' : score >= 6 ? 'Strong — a few more rounds and you\'ll be instant.' : 'Keep practicing — subnetting is a muscle, it takes repetition.'}
            </div>
            <button onClick={handleReset} style={{ marginTop: 16, padding: '10px 24px', background: N, color: '#fff', border: 'none', borderRadius: 8, fontSize: 14, fontWeight: 700, cursor: 'pointer' }}>Try Again</button>
          </div>
        ) : (
          <>
            <div style={{ marginBottom: 20 }}>
              <div style={{ fontSize: 11, color: 'var(--muted)', fontFamily: 'var(--font-mono)', marginBottom: 8 }}>Question {qIdx + 1} of {QUIZ_QUESTIONS.length}</div>
              <div style={{ fontSize: 16, fontWeight: 700, color: 'var(--text)', marginBottom: 6 }}>
                Given the address <span style={{ fontFamily: 'var(--font-mono)', color: N }}>{q.ip}/{q.prefix}</span>, what is the <strong>{askLabel}</strong>?
              </div>
              <div style={{ fontSize: 12, color: 'var(--muted)' }}>
                Subnet mask: {intToIP(maskFromPrefix(q.prefix))} — Block size: {Math.pow(2, 32 - q.prefix)}
              </div>
            </div>

            <div style={{ display: 'flex', gap: 10 }}>
              <input
                value={answer}
                onChange={e => setAnswer(e.target.value)}
                onKeyDown={e => { if (e.key === 'Enter' && !feedback) handleCheck() }}
                disabled={feedback !== null}
                style={{ flex: 1, padding: '10px 14px', borderRadius: 8, border: `1px solid ${feedback === 'correct' ? N : feedback === 'wrong' ? '#ef4444' : 'var(--border)'}`, background: 'var(--background)', color: 'var(--text)', fontSize: 14, fontFamily: 'var(--font-mono)' }}
                placeholder={q.ask === 'hosts' ? 'e.g. 254' : 'e.g. 192.168.1.0'}
              />
              {!feedback ? (
                <button onClick={handleCheck} style={{ padding: '10px 20px', background: N, color: '#fff', border: 'none', borderRadius: 8, fontSize: 14, fontWeight: 700, cursor: 'pointer' }}>Check</button>
              ) : (
                <button onClick={handleNext} style={{ padding: '10px 20px', background: 'var(--background)', border: `1px solid ${N}`, color: N, borderRadius: 8, fontSize: 14, fontWeight: 700, cursor: 'pointer' }}>Next →</button>
              )}
            </div>

            {feedback && (
              <div style={{ marginTop: 14, padding: '12px 16px', borderRadius: 8, background: feedback === 'correct' ? `${N}10` : '#ef444410', border: `1px solid ${feedback === 'correct' ? N : '#ef4444'}30`, fontSize: 13 }}>
                {feedback === 'correct' ? (
                  <span style={{ color: N, fontWeight: 700 }}>✓ Correct! {correct}</span>
                ) : (
                  <span>
                    <span style={{ color: '#ef4444', fontWeight: 700 }}>✗ Incorrect.</span>
                    {' '}The correct answer is <span style={{ fontFamily: 'var(--font-mono)', fontWeight: 700, color: N }}>{correct}</span>.
                    {q.ask === 'network' && <span style={{ color: 'var(--muted)' }}> (IP AND mask: {q.ip} AND {intToIP(maskFromPrefix(q.prefix))})</span>}
                    {q.ask === 'broadcast' && <span style={{ color: 'var(--muted)' }}> (network OR inverted mask)</span>}
                    {q.ask === 'hosts' && <span style={{ color: 'var(--muted)' }}> (2^{32 - q.prefix} − 2)</span>}
                  </span>
                )}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}

// ── Supernet Calculator ───────────────────────────────────────────────────────
function SupernetCalc() {
  const [networks, setNetworks] = useState('192.168.0.0/24\n192.168.1.0/24\n192.168.2.0/24\n192.168.3.0/24')

  const lines = networks.split('\n').map(l => l.trim()).filter(Boolean)
  const parsed = lines.map(line => {
    const [ipStr, prefStr] = line.split('/')
    const octets = parseIP(ipStr)
    const prefix = parseInt(prefStr, 10)
    if (!octets || isNaN(prefix) || prefix < 0 || prefix > 32) return null
    const ip = octetsToInt(octets)
    const mask = maskFromPrefix(prefix)
    const net = (ip & mask) >>> 0
    return { original: line, ip, net, prefix }
  })
  const valid = parsed.filter(Boolean) as { original: string; ip: number; net: number; prefix: number }[]

  let supernet = null
  if (valid.length >= 2) {
    const nets = valid.map(v => v.net)
    const minNet = Math.min(...nets)
    const maxNet = Math.max(...nets)
    const maxPrefix = Math.min(...valid.map(v => v.prefix))

    let summaryPrefix = maxPrefix
    while (summaryPrefix > 0) {
      const mask = maskFromPrefix(summaryPrefix)
      const summaryNet = (minNet & mask) >>> 0
      const allIn = nets.every(n => (n & mask) >>> 0 === summaryNet)
      if (allIn) break
      summaryPrefix--
    }
    const mask = maskFromPrefix(summaryPrefix)
    const summaryNet = (minNet & mask) >>> 0
    supernet = { net: intToIP(summaryNet), prefix: summaryPrefix, covers: Math.pow(2, 32 - summaryPrefix) }
  }

  return (
    <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 14, overflow: 'hidden', margin: '28px 0' }}>
      <div style={{ padding: '18px 22px', borderBottom: '1px solid var(--border)', background: `${N}06` }}>
        <p style={{ fontSize: 11, color: N, fontFamily: 'var(--font-mono)', fontWeight: 700, letterSpacing: '.1em', margin: '0 0 4px' }}>// INTERACTIVE — ROUTE SUMMARIZATION CALCULATOR</p>
        <p style={{ fontSize: 13, color: 'var(--muted)', margin: 0 }}>Enter a list of networks (one per line) to find the minimum supernet that covers all of them.</p>
      </div>

      <div style={{ padding: '20px 22px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
        <div>
          <label style={{ fontSize: 11, fontWeight: 700, color: 'var(--muted)', fontFamily: 'var(--font-mono)', textTransform: 'uppercase', letterSpacing: '.08em', display: 'block', marginBottom: 8 }}>Networks to summarize</label>
          <textarea
            value={networks}
            onChange={e => setNetworks(e.target.value)}
            rows={7}
            style={{ width: '100%', padding: '10px 12px', borderRadius: 8, border: '1px solid var(--border)', background: 'var(--background)', color: 'var(--text)', fontSize: 13, fontFamily: 'var(--font-mono)', resize: 'vertical', boxSizing: 'border-box' }}
          />
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--muted)', fontFamily: 'var(--font-mono)', textTransform: 'uppercase', letterSpacing: '.08em' }}>Analysis</div>
          {valid.length === 0 ? (
            <div style={{ fontSize: 13, color: 'var(--muted)', padding: '16px', border: '1px solid var(--border)', borderRadius: 8 }}>Enter networks above</div>
          ) : (
            <>
              {valid.map((v, i) => (
                <div key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 12px', background: 'var(--background)', border: '1px solid var(--border)', borderRadius: 6, fontSize: 12 }}>
                  <span style={{ fontFamily: 'var(--font-mono)', color: 'var(--muted)' }}>{v.original}</span>
                  <span style={{ fontFamily: 'var(--font-mono)', color: 'var(--text)' }}>{intToIP(v.net)}</span>
                </div>
              ))}
              {supernet && (
                <div style={{ padding: '14px 16px', background: `${N}12`, border: `2px solid ${N}40`, borderRadius: 10, marginTop: 8 }}>
                  <div style={{ fontSize: 11, color: N, fontFamily: 'var(--font-mono)', fontWeight: 700, marginBottom: 6 }}>Summary Route</div>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: 18, fontWeight: 900, color: N }}>{supernet.net}/{supernet.prefix}</div>
                  <div style={{ fontSize: 11, color: 'var(--muted)', marginTop: 4 }}>Covers {supernet.covers.toLocaleString()} addresses</div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default function Subnetting() {
  return (
    <LearnLayout
      title="Subnetting"
      description="Master the mental math of subnetting — network addresses, broadcast addresses, host counts, VLSM design, and route summarization for real network engineering."
      section="Networking Fundamentals"
      readTime="30 min"
      updatedAt="May 2026"
    >

      {/* ── PART 1 ── */}
      <Part n="01" title="Why Subnetting Is a Core Engineering Skill" />

      <P>
        Subnetting is not just exam material — it is a skill you will use every day as a network engineer, SRE, or infrastructure engineer. When you provision a new application tier in AWS, you choose the VPC subnet CIDR. When you configure OSPF route summarization to reduce routing table size, you calculate the summary prefix. When you debug a routing loop, you need to determine whether an IP is in a specific subnet. When you design a campus network for 800 devices across 6 VLANs, you allocate address space efficiently. All of these require fluent, fast subnetting.
      </P>
      <P>
        The good news: there are only a few formulas, and the entire skill becomes automatic with practice. This module covers the mental shortcuts used by experienced engineers — not the academic algorithm that takes 5 minutes per answer, but the sub-30-second methods used under pressure during an incident.
      </P>

      <HR />

      {/* ── PART 2 ── */}
      <Part n="02" title="The Mental Model: Powers of 2 and Block Sizes" />

      <P>
        Everything in subnetting reduces to powers of 2. A /24 has 2⁸ = 256 addresses. A /25 has 2⁷ = 128. A /26 has 2⁶ = 64. Each bit you borrow from the host portion doubles the number of subnets and halves the number of addresses per subnet. Memorize this table and subnetting becomes mechanical:
      </P>

      <div style={{ overflowX: 'auto', margin: '12px 0 28px' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13, minWidth: 600 }}>
          <thead>
            <tr style={{ background: `${N}12` }}>
              {['Prefix', 'Host bits', 'Block size', 'Addresses', 'Usable hosts', 'Last octet range', 'Typical use'].map(h => (
                <th key={h} style={{ padding: '10px 14px', textAlign: 'left', fontFamily: 'var(--font-mono)', fontSize: 11, color: N, fontWeight: 700, letterSpacing: '.06em', textTransform: 'uppercase', border: '1px solid var(--border)' }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {[
              ['/24', '8', '256', '256', '254', '0–255', 'Standard LAN'],
              ['/25', '7', '128', '128', '126', '0, 128', 'Half floor/VLAN'],
              ['/26', '6', '64', '64', '62', '0,64,128,192', 'Department'],
              ['/27', '5', '32', '32', '30', '0,32,64…224', 'Small VLAN'],
              ['/28', '4', '16', '16', '14', '0,16,32…240', 'Management'],
              ['/29', '3', '8', '8', '6', '0,8,16…248', 'Very small'],
              ['/30', '2', '4', '4', '2', '0,4,8…252', 'P2P link'],
              ['/31', '1', '2', '2', '2*', '0,2,4…254', 'P2P RFC 3021'],
              ['/32', '0', '1', '1', '1', 'Specific host', 'Host route'],
            ].map((row, i) => (
              <tr key={i} style={{ background: i % 2 === 0 ? 'var(--surface)' : 'var(--background)' }}>
                {row.map((cell, j) => (
                  <td key={j} style={{ padding: '9px 14px', border: '1px solid var(--border)', fontFamily: j <= 1 ? 'var(--font-mono)' : undefined, fontWeight: j === 0 ? 700 : 400, color: j === 0 ? N : 'var(--text)' }}>{cell}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p style={{ fontSize: 12, color: 'var(--muted)', marginTop: -16, marginBottom: 24, fontStyle: 'italic' }}>* /31 has no network/broadcast — both addresses are usable (RFC 3021)</p>

      <H>The Block Size Method (Fastest Mental Subnetting)</H>
      <P>
        The block size is the interval between subnet boundaries. For a /26, the mask octet is 192 (64 + 128). Block size = 256 − 192 = <Hl>64</Hl>. So /26 subnets in the last octet are: 0, 64, 128, 192. To find which subnet any IP belongs to: divide the host octet by the block size and multiply back. For 192.168.1.100 in a /26: 100 ÷ 64 = 1 (integer division) → 1 × 64 = 64. The network address is 192.168.1.<Hl>64</Hl>. Broadcast = 64 + 64 − 1 = 192.168.1.<Hl>127</Hl>.
      </P>

      <div style={{ background: 'var(--surface)', border: `1px solid ${N}25`, borderRadius: 12, padding: '20px 22px', margin: '16px 0 28px', fontFamily: 'var(--font-mono)', fontSize: 13 }}>
        <div style={{ color: N, fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '.1em', marginBottom: 14 }}>Worked Example: 172.16.45.200/20</div>

        <div style={{ display: 'grid', gap: 10 }}>
          {[
            { step: '1. Prefix /20 → 20 bits used. Active octet is third (bits 17–24). 20 − 16 = 4 bits used in third octet.', color: '#3b82f6' },
            { step: '2. Mask for 4 bits in octet = 256 − 2^(8−4) = 256 − 16 = 240. Full mask: 255.255.240.0', color: '#8b5cf6' },
            { step: '3. Block size = 256 − 240 = 16 in the third octet.', color: N },
            { step: '4. Third octet = 45. 45 ÷ 16 = 2 (integer). 2 × 16 = 32. Network = 172.16.32.0/20', color: N },
            { step: '5. Broadcast = 172.16.(32+16−1).255 = 172.16.47.255', color: '#f59e0b' },
            { step: '6. Hosts: 172.16.32.1 – 172.16.47.254 (4094 usable)', color: '#f59e0b' },
          ].map((item, i) => (
            <div key={i} style={{ display: 'flex', gap: 12 }}>
              <span style={{ color: item.color, fontWeight: 700, minWidth: 20 }}>{i + 1}.</span>
              <span style={{ color: 'var(--text)', lineHeight: 1.7 }}>{item.step}</span>
            </div>
          ))}
        </div>
      </div>

      <HR />

      {/* ── PART 3 ── */}
      <Part n="03" title="Interactive: Subnet Practice Quiz" />

      <P>
        The fastest way to build subnetting fluency is repetitive timed practice. The goal is to calculate network, broadcast, and host count in under 15 seconds per question. This requires knowing block sizes by heart: /25=128, /26=64, /27=32, /28=16, /29=8, /30=4.
      </P>

      <SubnetQuiz />

      <HR />

      {/* ── PART 4 ── */}
      <Part n="04" title="Route Summarization (Supernetting)" />

      <P>
        <Hl>Route summarization</Hl> (also called supernetting or route aggregation) is the process of combining multiple specific routes into a single summary route with a shorter prefix. A router advertising 192.168.0.0/24, 192.168.1.0/24, 192.168.2.0/24, and 192.168.3.0/24 as four separate routes can instead advertise one summary route: 192.168.0.0/<Hl>22</Hl>. This covers all four /24s (256 × 4 = 1024 addresses = 2¹⁰, so /22) with a single routing table entry.
      </P>

      <H>Why Route Summarization Matters</H>
      <P>
        Every route in a router&apos;s routing table consumes TCAM memory and requires processing time during route lookups. The internet&apos;s BGP routing table has ~900,000 entries and consumes significant memory in all edge routers. Without summarization, every /24 network that is broken into smaller blocks would contribute multiple separate entries instead of one. Within an enterprise, a well-summarized network has a distribution layer advertising a single /16 summary for an entire building instead of 256 separate /24s — simpler, more stable, and faster to converge after a topology change. Route summarization is a design constraint: it works best when IP addressing is hierarchical and contiguous.
      </P>

      <H>Finding the Summary Route</H>
      <P>
        The algorithm: (1) convert the network addresses to binary; (2) find the longest common prefix (the leftmost bits that are identical across all networks); (3) the summary prefix length equals the number of matching bits. For 192.168.0.0 through 192.168.3.0:
      </P>

      <div style={{ background: 'var(--surface)', border: `1px solid ${N}25`, borderRadius: 12, padding: '20px 22px', margin: '16px 0 28px', fontFamily: 'var(--font-mono)', fontSize: 13, overflowX: 'auto' }}>
        <div style={{ color: 'var(--muted)', marginBottom: 10, fontSize: 11, textTransform: 'uppercase', letterSpacing: '.08em' }}>Binary prefix comparison</div>
        {[
          ['192.168.0.0', '11000000.10101000.00000000.00000000'],
          ['192.168.1.0', '11000000.10101000.00000001.00000000'],
          ['192.168.2.0', '11000000.10101000.00000010.00000000'],
          ['192.168.3.0', '11000000.10101000.00000011.00000000'],
        ].map(([ip, bin]) => (
          <div key={ip} style={{ marginBottom: 6, color: 'var(--text)' }}>
            <span style={{ color: 'var(--muted)', minWidth: 120, display: 'inline-block', fontSize: 11 }}>{ip}</span>
            <span style={{ color: '#3b82f6' }}>11000000.10101000.000000</span>
            <span style={{ color: '#ef4444' }}>{bin.slice(-10)}</span>
          </div>
        ))}
        <div style={{ borderTop: '1px solid var(--border)', marginTop: 12, paddingTop: 12, color: N }}>
          Common prefix: 22 bits → Summary route: <strong>192.168.0.0/22</strong>
        </div>
      </div>

      <H>Discontiguous Summarization Problem</H>
      <P>
        Summarization only works correctly when the networks being summarized are <Hl>contiguous</Hl> — consecutive and aligned on a power-of-2 boundary. Trying to summarize 192.168.1.0/24 and 192.168.3.0/24 (skipping .2.0/24) would require a summary that also &quot;covers&quot; 192.168.0.0/24 and 192.168.2.0/24 in the routing table — the summary would incorrectly attract traffic for those missing subnets and black-hole it. This is why IP addressing design and route summarization must be planned together, not added after the fact.
      </P>

      <HR />

      {/* ── PART 5 ── */}
      <Part n="05" title="Interactive: Route Summarization Calculator" />

      <SupernetCalc />

      <HR />

      {/* ── PART 6 ── */}
      <Part n="06" title="VLSM Design: Allocating Address Space Efficiently" />

      <P>
        <Hl>VLSM (Variable Length Subnet Masking)</Hl> is the technique of assigning different-sized subnets within the same address space based on actual host count requirements. The process is: (1) sort requirements from largest to smallest; (2) allocate from the start of the address block, fitting each subnet on the next aligned boundary; (3) verify no overlap.
      </P>

      <H>VLSM Design Example</H>
      <P>
        Task: Design subnets for a new office from 10.50.0.0/22. Departments: Engineering (120 hosts), Sales (60 hosts), HR (25 hosts), Finance (12 hosts), Servers (50 hosts), Management VLAN (8 hosts), two P2P WAN links (2 hosts each).
      </P>

      <div style={{ overflowX: 'auto', margin: '12px 0 28px' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13, minWidth: 700 }}>
          <thead>
            <tr style={{ background: `${N}12` }}>
              {['Dept', 'Hosts', 'Prefix', 'Subnet', 'Usable Range', 'Available', 'Waste'].map(h => (
                <th key={h} style={{ padding: '10px 14px', textAlign: 'left', fontFamily: 'var(--font-mono)', fontSize: 11, color: N, fontWeight: 700, letterSpacing: '.06em', textTransform: 'uppercase', border: '1px solid var(--border)' }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {[
              ['Engineering', '120', '/25', '10.50.0.0/25', '10.50.0.1–126', '126', '6'],
              ['Sales', '60', '/26', '10.50.0.128/26', '10.50.0.129–190', '62', '2'],
              ['Servers', '50', '/26', '10.50.0.192/26', '10.50.0.193–254', '62', '12'],
              ['HR', '25', '/27', '10.50.1.0/27', '10.50.1.1–30', '30', '5'],
              ['Finance', '12', '/28', '10.50.1.32/28', '10.50.1.33–46', '14', '2'],
              ['Mgmt VLAN', '8', '/28', '10.50.1.48/28', '10.50.1.49–62', '14', '6'],
              ['WAN Link 1', '2', '/30', '10.50.1.64/30', '10.50.1.65–66', '2', '0'],
              ['WAN Link 2', '2', '/30', '10.50.1.68/30', '10.50.1.69–70', '2', '0'],
            ].map((row, i) => (
              <tr key={i} style={{ background: i % 2 === 0 ? 'var(--surface)' : 'var(--background)' }}>
                {row.map((cell, j) => (
                  <td key={j} style={{ padding: '9px 14px', border: '1px solid var(--border)', fontFamily: j >= 2 ? 'var(--font-mono)' : undefined, fontWeight: j === 0 ? 700 : 400, color: j === 3 ? N : 'var(--text)' }}>{cell}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <P>
        Total: 8 subnets, 312 hosts allocated, 312 usable slots used, 33 wasted by size rounding. Remaining space in 10.50.0.0/22 (1024 addresses total): 10.50.1.72/29 through 10.50.3.255 — available for future expansion. The key insight: by sorting largest-to-smallest and allocating from the bottom of the address block, subnets align naturally on their boundaries without gaps.
      </P>

      <ProTip>
        In AWS VPC subnetting: each subnet has 5 reserved addresses (network, router/gateway, DNS, future AWS use, broadcast) rather than 2. A /28 in a VPC provides only 11 usable hosts instead of 14. Plan VPC subnets slightly larger than on-premises to account for this. AWS recommends /24 or larger for application subnets to avoid running out of addresses unexpectedly.
      </ProTip>

      <HR />

      {/* ── PART 7 ── */}
      <Part n="07" title="Day in the Life — AWS Network Engineer: VPC Subnet Exhaustion During Scale Event" />

      <P>
        <strong>Company:</strong> Amazon Web Services (customer success case) · <strong>Role:</strong> Solutions Architect / Network Engineer · <strong>Customer industry:</strong> E-commerce · <strong>Date:</strong> Monday, January 20, 2025 (post-holiday traffic spike)
      </P>

      <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 12, padding: '20px 24px', margin: '20px 0 28px' }}>
        <p style={{ fontSize: 12, color: 'var(--muted)', fontFamily: 'var(--font-mono)', margin: '0 0 12px' }}>INCIDENT: Auto-scaling group unable to launch new EC2 instances — subnet IP exhaustion</p>

        <TimeBlock time="09:15 AM" label="Auto-scaling triggered — instances fail to launch">
          A post-holiday traffic spike hits an e-commerce customer&apos;s web tier. Their Auto Scaling Group (ASG) triggers a scale-out event, attempting to launch 40 additional EC2 instances in their application subnet. 12 instances launch successfully. Then all remaining launch attempts fail with the error: <code style={{ fontFamily: 'var(--font-mono)', fontSize: 12, background: '#0a0a0a', padding: '2px 6px', borderRadius: 3 }}>InsufficientFreeAddressesInSubnet</code>. Customer calls AWS support at Priority 1 severity — site traffic is being dropped.
        </TimeBlock>

        <TimeBlock time="09:23 AM" label="Diagnosis — the /24 subnet was almost full">
          The AWS solutions architect on the call pulls the subnet details. The application subnet is 10.0.1.0/24, which has 256 − 5 = 251 usable IP addresses (AWS reserves 5). Of these, 238 were already allocated: 210 running EC2 instances, 18 Elastic Load Balancer nodes, 8 RDS replica network interfaces, and 2 NAT gateways. The auto-scaling attempt for 40 instances would need 40 IPs — only 13 remained. The subnet was designed in 2019 for a maximum of 100 instances and was never updated as the fleet grew.
        </TimeBlock>

        <TimeBlock time="09:35 AM" label="Immediate mitigation — add a secondary CIDR">
          AWS VPCs support secondary CIDR blocks since 2017. The architect adds a secondary VPC CIDR (10.1.0.0/16) and creates a new subnet 10.1.1.0/24 in the same Availability Zone. The Auto Scaling Group is updated to include the new subnet in its launch configuration. New instances begin launching in the new subnet within 3 minutes. The 28 pending scale-out instances all succeed. Traffic stabilizes.
        </TimeBlock>

        <TimeBlock time="10:15 AM" label="Permanent fix design — /20 subnets with growth headroom">
          The architect reviews the entire VPC design. The original architecture used /24 subnets for all tiers (web, app, db) — each limited to 251 hosts. The new design: (1) Web tier: 10.0.0.0/20 (4096 addresses, 4091 usable) — enough for thousands of instances; (2) App tier: 10.0.16.0/20 (same); (3) DB tier: 10.0.32.0/22 (1024 addresses — DB instances are fewer but larger); (4) Management: 10.0.36.0/24; (5) Future expansion: 10.0.37.0–10.0.63.255 reserved. Migration of the existing fleet to the new subnet layout is scheduled over a two-week maintenance window using blue/green deployment.
        </TimeBlock>

        <TimeBlock time="Next sprint — postmortem action items" label="Process improvements">
          The postmortem identifies that subnet sizing was a one-time decision made in 2019 with no periodic review. Action items: (1) CloudWatch alarms on subnet IP utilization — alert at 75% used, page at 90%; (2) VPC subnet sizing standard updated to require /20 minimum for any auto-scaling fleet; (3) AWS Config rule added to detect /24 or smaller subnets in production VPCs with &gt;100 currently-used IPs; (4) Architecture review checklist updated to ask &quot;What is the maximum fleet size this subnet needs to support in 5 years?&quot; A /24 costs nothing more than a /20 in AWS — there is no reason to underprovision address space in a VPC.
        </TimeBlock>
      </div>

      <Err title="Using small subnets in cloud environments">
        In traditional on-premises networking, /24 and /25 subnets are the norm because address space was managed carefully. In cloud environments (AWS VPC, GCP VPC, Azure VNet), address space costs nothing — a /20 is as free as a /24. Using /24 subnets for application tiers in auto-scaling environments leads exactly to the incident above. The correct default for any auto-scaling workload in a VPC: /20 at minimum, /18 or /16 for large workloads. AWS itself recommends /20 as a minimum for production application subnets in their best practices documentation.
      </Err>

      <HR />

      {/* ── PART 8 ── */}
      <Part n="08" title="Interview Prep — 7 Questions With Complete Answers" />

      <IQ q="A company has 10.0.0.0/8 and needs to create subnets for 500 sites, each needing 200 hosts. What prefix should each site use?">
        <p style={{ margin: '0 0 14px' }}>200 hosts requires at least 202 addresses (200 hosts + 1 network + 1 broadcast). The next power of 2 above 202 is 256 = 2⁸. So each site needs a /24 (256 addresses, 254 usable). This comfortably fits 200 hosts.</p>
        <p style={{ margin: '0 0 14px' }}>500 sites × 1 /24 each = 500 /24 subnets. A 10.0.0.0/8 has 2²⁴ = 16,777,216 addresses, enough for 65,536 /24 subnets. Allocating 500 /24s is trivial. Structure: 10.site_msb.site_lsb.0/24, e.g., site 1 = 10.0.1.0/24, site 2 = 10.0.2.0/24, through site 500 = 10.1.244.0/24 (500 = 0×256 + 500 → 10.1.244.0).</p>
        <p style={{ margin: 0 }}>Route summarization: sites 1–255 can be summarized as 10.0.0.0/16, sites 256–511 as 10.1.0.0/16, etc. This reduces regional routing tables from 500 entries to 2 summary routes. For a hub site that needs to reach all 500 branches, a single 10.0.0.0/8 summary covers everything.</p>
      </IQ>

      <IQ q="Is 10.0.0.200 in the subnet 10.0.0.192/27? Show your work.">
        <p style={{ margin: '0 0 14px' }}>A /27 has a block size of 32 (256 − 224 = 32). Subnets in the last octet: 0, 32, 64, 96, 128, 160, 192, 224. The subnet 10.0.0.192/27 spans from 10.0.0.192 (network) to 10.0.0.223 (broadcast: 192 + 32 − 1).</p>
        <p style={{ margin: '0 0 14px' }}>10.0.0.200 has last octet 200. Is 192 ≤ 200 ≤ 223? Yes. So 10.0.0.200 IS in the subnet 10.0.0.192/27.</p>
        <p style={{ margin: 0 }}>Binary verification: 200 = 11001000, mask /27 = 11111111.11111111.11111111.11100000. AND: 11001000 AND 11100000 = 11000000 = 192. Network = 10.0.0.192. Confirmed: 10.0.0.200 is in 10.0.0.192/27, with host address 10.0.0.200 (200−192=8, so host 8 in the subnet).</p>
      </IQ>

      <IQ q="What is the difference between summarization and aggregation? Is there a difference?">
        <p style={{ margin: '0 0 14px' }}>In practice, these terms are used interchangeably and both mean the same thing: combining multiple more-specific routes into a single less-specific route with a shorter prefix. The terms appear in different contexts: &quot;route summarization&quot; is more common in OSPF/EIGRP inter-area configuration, while &quot;route aggregation&quot; is more common in BGP discussions. The underlying operation and math are identical.</p>
        <p style={{ margin: 0 }}>Technical nuance: summarization implies a controlled operation where an engineer explicitly configures a summary route (e.g., OSPF area border router configured with &quot;area 0 range 10.0.0.0/16&quot; to summarize all /24s in area 0). Aggregation in BGP context often refers to the &quot;aggregate-address&quot; command, which can optionally suppress the more-specific routes (with the &quot;summary-only&quot; keyword) or advertise both the aggregate and the specifics. In BGP, it is common to advertise both — the specific routes allow for traffic engineering, the aggregate prevents black-holing if a specific route disappears.</p>
      </IQ>

      <IQ q="How do you determine the minimum summary route for 172.16.4.0/24 and 172.16.5.0/24?">
        <p style={{ margin: '0 0 14px' }}>Find the network addresses in binary:</p>
        <ul style={{ margin: '0 0 14px', paddingLeft: 24, lineHeight: 2, fontFamily: 'var(--font-mono)', fontSize: 13 }}>
          <li>172.16.4.0: 10101100.00010000.00000<strong>100</strong>.00000000</li>
          <li>172.16.5.0: 10101100.00010000.00000<strong>101</strong>.00000000</li>
        </ul>
        <p style={{ margin: '0 0 14px' }}>The first 22 bits are identical (172.16.0x0000010). The 23rd bit differs (0 vs 1). The common prefix is 22 bits → summary route: 172.16.4.0/23.</p>
        <p style={{ margin: 0 }}>Verify: 172.16.4.0/23 spans 172.16.4.0 through 172.16.5.255 (block size 512). Both 172.16.4.0/24 and 172.16.5.0/24 are within this range. Correct summary. Quick shortcut: the two third-octet values differ by 1 and the lower is even (4 is even) — consecutive even+odd pairs always summarize to a /23.</p>
      </IQ>

      <IQ q="You need to design subnets for a network with the following requirements: 1 subnet for 100 hosts, 2 subnets for 50 hosts each, 4 subnets for 10 hosts each. You have 192.168.20.0/24. Design the allocation.">
        <p style={{ margin: '0 0 14px' }}>Sort by size (largest first) and allocate sequentially:</p>
        <ul style={{ margin: '0 0 14px', paddingLeft: 24, lineHeight: 2, fontSize: 13 }}>
          <li>100 hosts → /25 (126 hosts). 192.168.20.0/25 (range .1–.126, broadcast .127)</li>
          <li>50 hosts (first) → /26 (62 hosts). 192.168.20.128/26 (.129–.190, broadcast .191)</li>
          <li>50 hosts (second) → /26. 192.168.20.192/26 (.193–.254, broadcast .255)</li>
        </ul>
        <p style={{ margin: '0 0 14px' }}>Wait — 192.168.20.128 + 64 = 192.168.20.192, and 192.168.20.192 + 64 = 192.168.20.256 which would overflow the /24. Let me re-check: 192.168.20.0/24 ends at .255. The second /26 at .192 ends at .255. That works. But now there&apos;s no space for the four /28 subnets needed for 10 hosts each.</p>
        <p style={{ margin: 0 }}>Fix: use .128 to .255 more carefully. Two /26s (.128/26 and .192/26) consume all 128 addresses of the upper half. The four /28s need 4 × 16 = 64 addresses. Solution: use only one /26 at .128 for 50 hosts, then at .192 use a /27 for the second 50-host group (30 usable, still insufficient — 50 &gt; 30). Correct answer: you cannot fit all these requirements in a /24 without compromises. A /23 would give you 512 addresses and fit all subnets comfortably. If forced to use /24: place the two 50-host subnets as /26 (.128/26 and .192/26), and the four 10-host subnets in the space between: .64/28, .80/28, .96/28, .112/28 — then move the 100-host /25 to another block. This is why VLSM planning starts with the constraint check: will everything fit?</p>
      </IQ>

      <IQ q="What does it mean when you see a /0 route in a routing table?">
        <p style={{ margin: '0 0 14px' }}>A /0 route (0.0.0.0/0) is the <strong>default route</strong> — it matches every possible destination address because its prefix length is 0 (no bits required to match). It is the route of last resort: when a router receives a packet and finds no more-specific route in its routing table, it forwards the packet according to the /0 entry. Conceptually, it says &quot;I don&apos;t know how to reach this specific destination, but forward it toward the internet/default gateway and let something else figure it out.&quot;</p>
        <p style={{ margin: '0 0 14px' }}>Longest prefix match means /0 is always the least preferred route. A /24 is more specific than /0, which is more specific than /0 (it always loses to any other match). So even though /0 matches every address, any more-specific route wins. This is why a router can have a /0 default route pointing toward the internet and still have specific /16 and /24 routes for internal networks — internal traffic uses the specific routes, internet traffic falls through to /0.</p>
        <p style={{ margin: 0 }}>In BGP, advertising 0.0.0.0/0 from a router means &quot;I will accept traffic for any destination.&quot; ISPs advertise a default route to customers who don&apos;t need to carry the full BGP table. Enterprises advertise default routes to branch offices. Security consideration: a rogue /0 advertisement in BGP is a global black hole attack — it can divert all internet traffic to the attacker. BGP RPKI and route filtering prevent this.</p>
      </IQ>

      <IQ q="Explain supernet routes and the 'black hole' risk.">
        <p style={{ margin: '0 0 14px' }}>A supernet route (summary route) covers a range of addresses broader than the networks actually deployed. For example, advertising 10.0.0.0/8 as a summary when only 10.1.0.0/16 through 10.50.0.0/16 are actually configured means the summarizing router attracts traffic for all of 10.0.0.0/8, including 10.51.0.0/16 through 10.255.0.0/16 which do not exist.</p>
        <p style={{ margin: '0 0 14px' }}>If the router has no more-specific route for those non-existent subnets, it cannot forward the traffic and silently drops it — creating a <strong>black hole</strong>. Packets disappear without any ICMP unreachable being generated (because from the router&apos;s perspective, it &quot;knows&quot; where 10.51.0.0/16 is — it&apos;s covered by the /8 summary, even if there is no reachable next-hop for it specifically).</p>
        <p style={{ margin: 0 }}>Defense: create a <strong>null route</strong> (also called a discard route) — a static route to 10.0.0.0/8 pointing to Null0 (a discard interface that drops traffic immediately and generates ICMP unreachables). This ensures that traffic for non-existent subnets gets an ICMP host unreachable rather than silently looping. Cisco and Juniper routers create null routes automatically when you configure route summarization — this is called a &quot;discard route&quot; or &quot;aggregate route to Null0.&quot; Always verify that your summarization setup includes a null route to prevent the black hole behavior.</p>
      </IQ>

      <HR />

      {/* ── PART 9 ── */}
      <Part n="09" title="Common Misconceptions" />

      <Err title="Subnets don't need to be contiguous within an address block">
        VLSM subnets must not overlap, but they do not need to be allocated in a specific order — you can have 10.0.0.0/25 and 10.0.2.0/24 coexisting in a 10.0.0.0/22 block with 10.0.1.0/24 unallocated. What matters is that no two subnets overlap in address space. Tools like IP address management (IPAM) software (Infoblox, phpIPAM, NetBox) track allocations and prevent overlaps. Without IPAM, manual tracking in a spreadsheet works for small networks but becomes error-prone above ~50 subnets.
      </Err>

      <Err title="The block size for /20 is in the last octet">
        For prefixes /1 through /8, the active octet is the first. For /9 through /16, it is the second. For /17 through /24, the active octet is the third. For /25 through /32, the active octet is the fourth. A /20 has the variable bits in the third octet: bits 17–24. Block size = 2^(8 − (20−16)) = 2^4 = 16. So /20 subnet boundaries are at third-octet multiples of 16: 0, 16, 32, 48, 64, 80, 96, 112, 128, 144, 160, 176, 192, 208, 224, 240. Most subnetting errors occur with &quot;cross-octet&quot; prefixes (/9–/23) where people incorrectly apply the block size to the wrong octet.
      </Err>

      <Err title="Summarizing routes always reduces routing table size">
        Summarization reduces the number of routing entries but can create black holes for unallocated space within the summary (as described above). Additionally, if the more-specific routes are still advertised alongside the summary (common in BGP where both aggregate and specific routes are advertised for traffic engineering), the routing table grows rather than shrinks. Summary routes only reduce routing table size when the more-specific routes are suppressed (not advertised separately). In OSPF inter-area summarization, the ABR suppresses the specific routes from other areas, genuinely reducing the routing table in non-local areas.
      </Err>

      <HR />

      <KeyTakeaways items={[
        'Block size = 256 − mask_octet in the active octet. /26 block = 64, /27 = 32, /28 = 16, /29 = 8, /30 = 4. Subnet boundaries are multiples of the block size.',
        'To find the subnet of any IP: divide the active octet by block size (integer division) and multiply back. For 100 in a /26 (block 64): 100÷64=1, 1×64=64. Network = .64, broadcast = .127.',
        'Usable hosts = 2^(host bits) − 2. /25→126, /26→62, /27→30, /28→14, /29→6, /30→2. Exception: /31 has 2 usable (no network/broadcast).',
        'Route summarization combines contiguous prefixes into a single shorter-prefix route. Find common binary prefix — length of that prefix is the summary prefix length.',
        'Discontiguous summarization creates black holes — traffic destined for addresses covered by the summary but not actually deployed gets silently dropped. Use null routes to generate ICMP unreachables for non-existent subnets.',
        'VLSM allocates different prefix lengths per subnet. Sort requirements largest to smallest, allocate from the start of the block, align on power-of-2 boundaries.',
        'AWS VPC subnets reserve 5 addresses per subnet (network, router, DNS, future, broadcast). A /28 in AWS = 11 usable hosts. Plan /20 minimum for auto-scaling application subnets.',
        'A /0 (default route) is the catch-all route of last resort. Longest prefix match means any more-specific route wins over /0. A rogue /0 in BGP can black-hole global traffic.',
        'For prefixes crossing octets (/9–/23), identify the active octet first. /20 block size is 16 in the third octet, not the fourth. Most subnetting errors come from applying block size to the wrong octet.',
      ]} />

    </LearnLayout>
  )
}
