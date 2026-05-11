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

const wifiStandards = [
  { name: '802.11b', year: 1999, band: '2.4 GHz', maxSpeed: '11 Mbps', modulation: 'DSSS', channels: '3 non-overlapping', notes: 'Legacy; rarely used' },
  { name: '802.11g', year: 2003, band: '2.4 GHz', maxSpeed: '54 Mbps', modulation: 'OFDM', channels: '3 non-overlapping', notes: 'Backward compat with 11b' },
  { name: '802.11a', year: 1999, band: '5 GHz', maxSpeed: '54 Mbps', modulation: 'OFDM', channels: '23 non-overlapping', notes: '5 GHz avoids 2.4 congestion' },
  { name: '802.11n (Wi-Fi 4)', year: 2009, band: '2.4/5 GHz', maxSpeed: '600 Mbps', modulation: 'OFDM + MIMO', channels: '4×4 MIMO', notes: 'First MIMO standard' },
  { name: '802.11ac (Wi-Fi 5)', year: 2013, band: '5 GHz only', maxSpeed: '6.9 Gbps', modulation: 'MU-MIMO + beamforming', channels: '8×8 MU-MIMO', notes: 'Wave 2: MU-MIMO downlink' },
  { name: '802.11ax (Wi-Fi 6)', year: 2019, band: '2.4/5 GHz', maxSpeed: '9.6 Gbps', modulation: 'OFDMA + BSS Coloring', channels: 'Multi-user OFDMA', notes: 'Dense environments focus' },
  { name: '802.11ax (Wi-Fi 6E)', year: 2021, band: '6 GHz added', maxSpeed: '9.6 Gbps', modulation: 'OFDMA', channels: '59 new 80 MHz channels', notes: 'Uncrowded 6 GHz spectrum' },
  { name: '802.11be (Wi-Fi 7)', year: 2024, band: '2.4/5/6 GHz', maxSpeed: '46 Gbps', modulation: '4096-QAM + MLO', channels: '320 MHz channels', notes: 'Multi-link operation' },
]

function WiFiStandardsTable() {
  const [selected, setSelected] = useState<string | null>(null)

  return (
    <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 12, padding: 24, margin: '32px 0', overflowX: 'auto' }}>
      <p style={{ fontSize: 13, fontWeight: 700, color: N, fontFamily: 'var(--font-mono)', margin: '0 0 16px', textTransform: 'uppercase', letterSpacing: '.1em' }}>802.11 Standards Timeline</p>
      <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
        <thead>
          <tr>
            {['Standard', 'Year', 'Band', 'Max Speed', 'Key Technology', 'Notes'].map(h => (
              <th key={h} style={{ textAlign: 'left', padding: '8px 12px', color: 'var(--muted)', fontSize: 11, fontWeight: 700, fontFamily: 'var(--font-mono)', textTransform: 'uppercase', letterSpacing: '.05em', borderBottom: '1px solid var(--border)' }}>{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {wifiStandards.map(s => (
            <tr
              key={s.name}
              onClick={() => setSelected(selected === s.name ? null : s.name)}
              style={{ background: selected === s.name ? `${N}08` : 'transparent', cursor: 'pointer', borderBottom: '1px solid var(--border)' }}
            >
              <td style={{ padding: '10px 12px', fontWeight: 700, color: selected === s.name ? N : 'var(--text)', fontFamily: 'var(--font-mono)', fontSize: 12 }}>{s.name}</td>
              <td style={{ padding: '10px 12px', color: 'var(--muted)' }}>{s.year}</td>
              <td style={{ padding: '10px 12px', color: 'var(--text)' }}>{s.band}</td>
              <td style={{ padding: '10px 12px', color: N, fontWeight: 700 }}>{s.maxSpeed}</td>
              <td style={{ padding: '10px 12px', color: 'var(--muted)' }}>{s.modulation}</td>
              <td style={{ padding: '10px 12px', color: 'var(--muted)', fontSize: 12 }}>{s.notes}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

function ChannelPlanner() {
  const [band, setBand] = useState<'2.4' | '5'>('2.4')
  const [selected, setSelected] = useState<number[]>([1, 6, 11])

  const channels24 = Array.from({ length: 11 }, (_, i) => i + 1)
  const nonoverlap24 = [1, 6, 11]

  const channels5 = [36, 40, 44, 48, 52, 56, 60, 64, 100, 104, 108, 112, 116, 120, 124, 128, 132, 136, 140, 149, 153, 157, 161, 165]

  function overlaps(ch: number, sel: number[]): boolean {
    return sel.some(s => Math.abs(s - ch) < 5)
  }

  return (
    <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 12, padding: 24, margin: '32px 0' }}>
      <p style={{ fontSize: 13, fontWeight: 700, color: N, fontFamily: 'var(--font-mono)', margin: '0 0 16px', textTransform: 'uppercase', letterSpacing: '.1em' }}>Channel Interference Planner</p>
      <div style={{ display: 'flex', gap: 8, marginBottom: 20 }}>
        {(['2.4', '5'] as const).map(b => (
          <button key={b} onClick={() => { setBand(b); setSelected(b === '2.4' ? [1, 6, 11] : [36, 100, 149]) }} style={{ background: band === b ? N : 'var(--bg)', color: band === b ? '#000' : 'var(--text)', border: `1px solid ${band === b ? N : 'var(--border)'}`, borderRadius: 6, padding: '6px 14px', fontSize: 13, fontWeight: 700, cursor: 'pointer' }}>{b} GHz</button>
        ))}
      </div>

      {band === '2.4' ? (
        <div>
          <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 12 }}>
            {channels24.map(ch => {
              const isSelected = selected.includes(ch)
              const isNonOverlap = nonoverlap24.includes(ch)
              const hasConflict = isSelected && selected.filter(s => Math.abs(s - ch) < 5 && s !== ch).length > 0
              return (
                <div
                  key={ch}
                  onClick={() => setSelected(prev => prev.includes(ch) ? prev.filter(c => c !== ch) : [...prev, ch])}
                  style={{ width: 44, height: 44, display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: 8, cursor: 'pointer', border: `2px solid ${isSelected ? (hasConflict ? '#ef4444' : N) : 'var(--border)'}`, background: isSelected ? (hasConflict ? '#ef444415' : `${N}15`) : isNonOverlap ? `${N}05` : 'var(--bg)', fontSize: 13, fontWeight: 700, color: isSelected ? (hasConflict ? '#ef4444' : N) : 'var(--text)', transition: 'all .15s' }}
                >
                  {ch}
                </div>
              )
            })}
          </div>
          <div style={{ fontSize: 12, color: 'var(--muted)' }}>
            In the 2.4 GHz band, each channel is 20 MHz wide but spaced only 5 MHz apart — channels overlap. Only channels 1, 6, and 11 are non-overlapping. Selected APs on overlapping channels will co-channel interfere.
          </div>
          {selected.length > 0 && selected.some((ch, _, arr) => arr.filter(s => Math.abs(s - ch) < 5 && s !== ch).length > 0) && (
            <div style={{ marginTop: 12, background: '#ef444408', border: '1px solid #ef444430', borderRadius: 8, padding: '10px 14px', fontSize: 13, color: '#ef4444' }}>
              ⚠ Overlapping channels selected — adjacent APs will interfere. Use channels 1, 6, and 11 only in 2.4 GHz.
            </div>
          )}
        </div>
      ) : (
        <div>
          <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 12 }}>
            {channels5.map(ch => {
              const isSelected = selected.includes(ch)
              return (
                <div
                  key={ch}
                  onClick={() => setSelected(prev => prev.includes(ch) ? prev.filter(c => c !== ch) : [...prev, ch])}
                  style={{ minWidth: 48, height: 44, display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: 8, cursor: 'pointer', border: `2px solid ${isSelected ? N : 'var(--border)'}`, background: isSelected ? `${N}15` : 'var(--bg)', fontSize: 12, fontWeight: 700, color: isSelected ? N : 'var(--text)', transition: 'all .15s', padding: '0 6px' }}
                >
                  {ch}
                </div>
              )
            })}
          </div>
          <div style={{ fontSize: 12, color: 'var(--muted)' }}>
            The 5 GHz band has 23+ non-overlapping 20 MHz channels (when bonded to 80 MHz: 5 non-overlapping). Adjacent 5 GHz channels don't overlap — far more deployment flexibility than 2.4 GHz.
          </div>
        </div>
      )}
    </div>
  )
}

export default function WirelessNetworkingModule() {
  return (
    <LearnLayout
      title="Wi-Fi — 802.11 Standards and RF Fundamentals"
      description="From 11 Mbps to 46 Gbps in 25 years. Understand how 802.11 standards evolved, how channels work, and why your conference room Wi-Fi dies during all-hands meetings."
      section="Networking Fundamentals"
      readTime="24 min"
      updatedAt="May 2026"
    >
      <Part n="01" title="How Radio Waves Carry Data" />
      <P>
        Wired Ethernet encodes data as electrical voltages on a copper cable or light pulses on a fiber — a controlled, deterministic medium. Wireless networking uses <Hl>radio frequency (RF) electromagnetic waves</Hl> propagating through open air — an uncontrolled, shared medium where your signal competes with microwaves, Bluetooth headsets, baby monitors, neighboring networks, and physical obstacles. Understanding this fundamental difference explains most Wi-Fi problems.
      </P>
      <P>
        802.11 (Wi-Fi) uses <Hl>OFDM (Orthogonal Frequency Division Multiplexing)</Hl> — a technique that splits a channel into dozens of narrower subcarriers, transmitting data on all subcarriers simultaneously. This makes the signal robust against multipath interference (where reflections off walls arrive slightly delayed) and allows fine-grained power allocation across subcarriers. Wi-Fi 4 introduced MIMO (multiple antennas transmitting/receiving simultaneously); Wi-Fi 6 introduced OFDMA (multiple users sharing the same OFDM channel simultaneously).
      </P>

      <WiFiStandardsTable />

      <HR />
      <Part n="02" title="2.4 GHz vs. 5 GHz vs. 6 GHz" />

      <H>2.4 GHz: Range but Congestion</H>
      <P>
        The 2.4 GHz band propagates farther and penetrates walls better than higher frequencies — lower-frequency radio waves carry more energy per photon at equivalent power, losing less to absorption. But 2.4 GHz has only <Hl>three non-overlapping channels</Hl> (1, 6, 11) in most countries. Every Wi-Fi network in your building, every Bluetooth device, and every microwave oven competes in this tiny 83 MHz slice of spectrum. In dense urban environments, 2.4 GHz is effectively unusable at high throughput.
      </P>
      <P>
        Each 2.4 GHz channel is 20 MHz wide but spaced only 5 MHz apart — so channel 1 (2.412 GHz) overlaps with channels 2–5, channel 6 overlaps with 2–5 and 7–10. Using non-standard channel combinations like 1, 4, 7, 11 still overlaps because the channels aren't physically spaced far enough apart. Use only 1, 6, 11.
      </P>

      <H>5 GHz: Speed but Range</H>
      <P>
        The 5 GHz band offers far more spectrum — 23+ non-overlapping 20 MHz channels in the United States. Higher frequency means shorter range (more absorption) and worse wall penetration, but in dense environments this is actually an advantage: signals from adjacent rooms interfere less. Modern enterprise wireless designs use 5 GHz as the primary band and 2.4 GHz as a fallback for legacy devices and long-range coverage gaps.
      </P>
      <P>
        Some 5 GHz channels (52–144, the DFS channels) require <Hl>Dynamic Frequency Selection (DFS)</Hl> — the AP must monitor for radar signals (weather radar, military radar) and vacate the channel within 10 seconds if detected. DFS can cause 30–60 second outages while the AP switches channels. Enterprise APs handle this automatically; consumer APs may drop connections.
      </P>

      <H>6 GHz: Wi-Fi 6E and Wi-Fi 7</H>
      <P>
        Wi-Fi 6E added 1,200 MHz of new spectrum in the 6 GHz band — enabling 59 non-overlapping 80 MHz channels or 29 non-overlapping 160 MHz channels. No legacy Wi-Fi devices operate here (only Wi-Fi 6E and Wi-Fi 7 support it), so there is zero co-channel interference from older devices. Wi-Fi 7 (802.11be) supports <Hl>320 MHz channels</Hl> in 6 GHz and <Hl>Multi-Link Operation (MLO)</Hl> — aggregating multiple bands simultaneously for a single connection, achieving theoretical throughput of 46 Gbps.
      </P>

      <ChannelPlanner />

      <HR />
      <Part n="03" title="MIMO, MU-MIMO, and OFDMA" />

      <H>MIMO and Spatial Streams</H>
      <P>
        <Hl>MIMO (Multiple Input, Multiple Output)</Hl> uses multiple antennas on both the transmitter and receiver to send multiple independent data streams simultaneously — exploiting multipath propagation (reflections) rather than fighting it. An 802.11n 4×4:4 configuration means 4 transmit antennas, 4 receive antennas, and 4 spatial streams. Each spatial stream adds to total throughput: a 600 Mbps Wi-Fi 4 connection uses 4 streams × 150 Mbps per stream.
      </P>
      <P>
        <Hl>Beamforming</Hl> (added in 802.11ac) allows the AP to focus its transmission energy toward a specific client by introducing phase differences between antennas, rather than broadcasting equally in all directions. This improves signal strength and range for targeted clients while reducing interference to other devices.
      </P>

      <H>MU-MIMO: Multi-User MIMO</H>
      <P>
        Classic SU-MIMO (Single-User MIMO) uses all spatial streams for one client at a time. <Hl>MU-MIMO (Multi-User MIMO)</Hl>, introduced in Wi-Fi 5 Wave 2 (downlink only) and expanded in Wi-Fi 6 (both uplink and downlink), allows the AP to transmit to multiple clients simultaneously using spatial multiplexing. An 8×8 MU-MIMO AP can serve 4 clients with 2 streams each simultaneously rather than time-slicing between them. This is particularly impactful in dense environments (classrooms, conference rooms) where many clients compete for airtime.
      </P>

      <H>OFDMA: Wi-Fi 6's Multi-User Upgrade</H>
      <P>
        <Hl>OFDMA (Orthogonal Frequency Division Multiple Access)</Hl> divides each OFDM channel into <Hl>Resource Units (RUs)</Hl> — smaller frequency allocations that can be assigned to different clients simultaneously. Where Wi-Fi 5 gave one client the entire channel, Wi-Fi 6 can give Client A one quarter of the channel (RU for small packets), Client B another quarter, and Clients C and D each an eighth. This dramatically improves efficiency for IoT devices, mobile phones, and any scenario with many small-packet flows competing for a single AP.
      </P>

      <Err title="Confusing theoretical vs. real-world throughput">
        Wi-Fi 6 advertises 9.6 Gbps — this requires an 8×8 MU-MIMO configuration with 8-stream clients transmitting simultaneously on 160 MHz channels with ideal RF conditions. Real-world performance for a single laptop on a typical enterprise 2x2 AP in an office is 500–800 Mbps. Always evaluate Wi-Fi by real-world aggregate throughput under load, not maximum theoretical speed.
      </Err>

      <HR />
      <Part n="04" title="BSS, ESS, and Roaming" />

      <H>BSS and SSID</H>
      <P>
        A <Hl>Basic Service Set (BSS)</Hl> is a single AP and all the clients associated with it. The AP broadcasts its <Hl>SSID (Service Set Identifier)</Hl> — the human-readable network name — in Beacon frames every 102.4 ms. The AP's MAC address forms the <Hl>BSSID</Hl> — the machine-readable unique identifier used by clients to associate with a specific AP.
      </P>
      <P>
        An <Hl>Extended Service Set (ESS)</Hl> is multiple APs sharing the same SSID, connected to the same wired network. From a client's perspective, the ESS looks like one large wireless network. Multiple APs in an ESS allow clients to roam between them while maintaining their IP address and staying connected.
      </P>

      <H>Fast Roaming: 802.11r, 802.11k, and 802.11v</H>
      <P>
        Classic 802.11 roaming required a full re-authentication handshake when moving between APs — adding 200–500 ms of latency, noticeable for VoIP and video calls. Modern roaming standards fix this:
      </P>
      <P>
        <Hl>802.11r (Fast BSS Transition)</Hl> pre-establishes security keys with neighboring APs before a client actually roams, reducing handover time from ~500 ms to &lt;50 ms. <Hl>802.11k (Radio Resource Management)</Hl> allows APs to tell clients which neighboring APs are available (neighbor reports), helping clients make faster roaming decisions. <Hl>802.11v (BSS Transition Management)</Hl> enables APs to request clients to roam to a less congested AP — crucial for load balancing in dense deployments.
      </P>

      <ProTip>
        Enterprise wireless controllers (Cisco WLC, Aruba Central, Meraki Dashboard) implement all three roaming standards and add additional intelligence: client load balancing, band steering (pushing 5 GHz-capable clients off 2.4 GHz), and RF power management. The controller maintains a central view of all AP associations and enforces roaming policies that individual APs can't implement alone.
      </ProTip>

      <HR />
      <Part n="05" title="A Day in the Life: Conference Room Wi-Fi Disaster" />

      <TimeBlock time="9:55 AM" label="Company all-hands starts — 200 people open laptops simultaneously">
        The CTO begins presenting. Within 90 seconds, half the room can't load the intranet wiki. Slack is timing out. The VP of Engineering messages you: "Wi-Fi is down."
      </TimeBlock>
      <TimeBlock time="10:02 AM" label="Triage — it's not down, it's saturated">
        Check the wireless controller dashboard. The 4 APs covering the all-hands space are each serving 45–55 clients. Total association count: 187. All APs are on 5 GHz channels 36, 36, 40, 40 — two pairs sharing the same channel. Co-channel interference is causing CSMA/CA backoff storms; airtime utilization at 96%.
      </TimeBlock>
      <TimeBlock time="10:08 AM" label="Emergency channel reassignment">
        Push channel changes from the wireless controller: APs now on 36, 40, 44, 48 — four non-overlapping channels. Enable 802.11v BSS Transition Management to request overloaded APs bounce clients to less congested neighbors. Throughput recovers within 60 seconds.
      </TimeBlock>
      <TimeBlock time="11:30 AM" label="Root cause and long-term fix">
        The APs were configured for auto-channel with a 1-hour re-optimization interval. When 200 clients arrived simultaneously, the channel plan didn't adapt fast enough. Long-term fix: lock channels to a pre-planned non-overlapping set, add 2 more APs to the all-hands room, enable client density features (min RSSI threshold, maximum association limits per AP), and add 5 GHz-only SSIDs for the conference space.
      </TimeBlock>

      <HR />
      <Part n="06" title="Interview Questions" />

      <IQ q="Why does the 2.4 GHz band have only 3 non-overlapping channels?">
        The 2.4 GHz band spans 2.400–2.483 GHz — 83 MHz total. Each 802.11 channel is 20 MHz wide but spaced only 5 MHz apart (channels are defined at 2.412, 2.417, 2.422, etc.). For two channels to be completely non-overlapping, they must be spaced at least 25 MHz apart (20 MHz channel width + 5 MHz guard band). In 83 MHz of spectrum with 5 MHz spacing, only channels 1 (2.412), 6 (2.437), and 11 (2.462) are spaced 25 MHz apart — all others overlap to some degree.
      </IQ>

      <IQ q="What is the difference between MU-MIMO and OFDMA, and when does each help?">
        MU-MIMO allows an AP to transmit to multiple clients simultaneously using separate spatial streams — each client gets the full channel width but on a different spatial beam. It helps when clients are physically separated (the AP can aim beams in different directions). OFDMA divides the channel's frequency range into Resource Units and assigns different subsets to different clients simultaneously — it helps when clients have small packets (IoT, video streaming) and one client doesn't need the full channel. MU-MIMO is beam/space division; OFDMA is frequency division. Wi-Fi 6 uses both together for maximum efficiency.
      </IQ>

      <IQ q="Explain 802.11r and why fast roaming matters for enterprise deployments.">
        Standard 802.11 roaming requires a client to complete a full 4-way WPA2 handshake with the new AP, adding 200–500 ms of latency during a handover. 802.11r (Fast BSS Transition) pre-stages security keys with neighboring APs — the PMK-R1 key is pre-distributed to all APs in the mobility domain, so when a client roams, it only needs a 2-frame FT exchange instead of a full 4-way handshake. This reduces roaming latency to under 50 ms — imperceptible for voice and video. Without fast roaming, VoIP calls drop and video stutters every time a user walks between coverage areas.
      </IQ>

      <HR />
      <Part n="07" title="Key Terminology" />
      <Term t="OFDM">Orthogonal Frequency Division Multiplexing — splits a channel into many narrow subcarriers, transmitted simultaneously. Used from 802.11a/g onward.</Term>
      <Term t="OFDMA">Multi-user variant: assigns different subcarrier groups (RUs) to different clients simultaneously. Key Wi-Fi 6 feature.</Term>
      <Term t="MIMO">Multiple Input, Multiple Output — multiple antennas enabling multiple spatial streams to one client. Introduced in 802.11n (Wi-Fi 4).</Term>
      <Term t="MU-MIMO">Multi-User MIMO — serves multiple clients simultaneously on separate spatial beams. Downlink in Wi-Fi 5; both directions in Wi-Fi 6.</Term>
      <Term t="SSID">Service Set Identifier — the human-readable Wi-Fi network name broadcast in Beacon frames.</Term>
      <Term t="BSS/BSSID">Basic Service Set / BSSID is the AP's MAC address used to uniquely identify it among SSIDs with the same name.</Term>
      <Term t="ESS">Extended Service Set — multiple APs sharing an SSID, connected to the same wired infrastructure, enabling roaming.</Term>
      <Term t="DFS">Dynamic Frequency Selection — mandatory scanning for radar signals on certain 5 GHz channels; AP must vacate within 10 s.</Term>

      <KeyTakeaways items={[
        'Wi-Fi uses radio waves in shared spectrum — every nearby network, microwave, and Bluetooth device can interfere.',
        '2.4 GHz has only 3 non-overlapping channels (1, 6, 11); 5 GHz has 23+ non-overlapping channels; 6 GHz adds 59 more for Wi-Fi 6E.',
        'OFDM splits a channel into subcarriers; OFDMA (Wi-Fi 6) assigns subcarrier groups to different users simultaneously.',
        'MIMO uses multiple antennas for multiple spatial streams per client; MU-MIMO serves multiple clients simultaneously.',
        'An ESS is multiple APs sharing an SSID — clients roam between APs while maintaining IP connectivity.',
        '802.11r/k/v fast roaming standards reduce handover latency from 500 ms to under 50 ms, critical for VoIP and video.',
      ]} />
    </LearnLayout>
  )
}
