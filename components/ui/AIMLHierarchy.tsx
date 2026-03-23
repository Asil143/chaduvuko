'use client'

import { useState } from 'react'

type Concept = {
  short: string
  label: string
  tag: string
  def: string
  analogy: string
  examples: string[]
  notText: string
  color: string
}

const concepts: Concept[] = [
  {
    short: 'AI',
    label: 'Artificial Intelligence',
    tag: 'The universe — everything lives inside this',
    def: 'Making machines do things that normally require human intelligence — understanding language, recognising faces, making decisions, solving problems. AI is the goal. Everything else is how we get there.',
    analogy: 'AI is like the word "sports." It includes cricket, football, chess, swimming. Saying "I work in AI" is like saying "I play sports" — technically true, but tells you nothing specific. ML, DL, and GenAI are specific disciplines inside the AI universe.',
    examples: [
      'Google Maps rerouting you around traffic in real time — uses ML, which lives inside AI',
      'Face ID unlocking your phone — uses Deep Learning, which is inside ML, which is inside AI',
      'Fraud detection at Razorpay blocking suspicious payments — uses classical ML',
    ],
    notText: 'AI is NOT just robots or science fiction. 99% of AI today is invisible software — recommendation engines, spam filters, search rankings. You use it dozens of times a day without knowing.',
    color: '#7F77DD',
  },
  {
    short: 'ML',
    label: 'Machine Learning',
    tag: 'Inside AI — the dominant approach since 2012',
    def: 'Instead of writing rules manually, you show the machine thousands of labelled examples and it figures out the rules itself. The machine learns from data — hence the name.',
    analogy: "Old way: write \"if spam words detected → move to spam.\" ML way: show the model 10 million spam emails and 10 million real ones — it discovers what spam looks like on its own. You never wrote a single rule about Nigerian princes.",
    examples: [
      "Spotify predicting the next song you'll like — trained on millions of listening sessions",
      'Swiggy estimating delivery time before you order — learned from thousands of past orders with traffic + weather + kitchen load data',
      "Gmail's spam filter — learned what spam looks like from billions of emails, not from a rulebook anyone wrote",
    ],
    notText: 'Not all AI is ML. A chess engine following hand-coded evaluation rules is AI but not ML. ML specifically means the system changed its internal behaviour by learning from data — not by following rules a human wrote.',
    color: '#378ADD',
  },
  {
    short: 'DL',
    label: 'Deep Learning',
    tag: 'Inside ML — the approach that changed everything',
    def: 'A specific type of ML using many layers of artificial neurons stacked on each other. "Deep" literally refers to many layers. Each layer learns increasingly complex patterns — from raw pixels to shapes to objects to full meaning.',
    analogy: 'Classical ML: you manually describe "pointy ears + whiskers + fur = cat." Deep Learning: show it 5 million cat photos and it builds its own internal description across 50 layers. Layer 1 sees edges, layer 10 sees fur texture, layer 30 sees "cat face." No description from you required.',
    examples: [
      "YouTube's automatic subtitles — raw audio waveform goes in, correct text comes out, no speech rules written",
      'MRI scan analysis detecting tumours with accuracy matching top radiologists — learned from 100,000+ labelled scans',
      'Tesla Autopilot recognising pedestrians, traffic lights, and lane markings at 120 km/h in real time',
    ],
    notText: 'Not all ML is Deep Learning. XGBoost, Random Forests, Linear Regression — all widely used, very powerful, and NOT deep learning. DL specifically requires stacked neural network layers trained end-to-end. It also needs far more data and GPU compute than classical ML.',
    color: '#D85A30',
  },
  {
    short: 'GenAI',
    label: 'Generative AI',
    tag: 'Inside Deep Learning — the newest, most visible frontier',
    def: "Deep learning models that don't just classify or predict — they create. New text, new images, new code, new audio that has never existed before. The shift from recognising patterns to generating them is what makes GenAI a genuinely different category.",
    analogy: 'All previous AI: "Is this email spam? Yes or No." — judging what exists. GenAI: "Write me a professional email declining this meeting politely." — creating something new. It\'s the difference between a film critic and a screenwriter.',
    examples: [
      'Claude and ChatGPT — write code, explain concepts, draft emails, answer questions in any language',
      'Midjourney and DALL-E — type a description, receive a photorealistic image that was never photographed',
      'GitHub Copilot — suggests your next 10 lines of code before you type them, trained on billions of lines of public code',
    ],
    notText: 'GenAI is not "thinking" or "understanding" the way humans do. It is extremely sophisticated pattern completion at massive scale. It generates the most statistically likely next token given everything before it. At billions of parameters, this looks indistinguishable from intelligence — but the mechanism is prediction, not reasoning.',
    color: '#1D9E75',
  },
]

const RING_SIZES = [280, 200, 130, 74]
const RING_OFFSETS = [0, 40, 75, 103]

export default function AIMLHierarchy() {
  const [sel, setSel] = useState(0)
  const active = concepts[sel]

  return (
    <div style={{ display: 'flex', gap: 36, flexWrap: 'wrap', alignItems: 'flex-start' }}>

      {/* ── Left: ring diagram ── */}
      <div style={{ flexShrink: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12 }}>
        <div style={{ position: 'relative', width: 280, height: 280 }}>
          {concepts.map((c, i) => (
            <div
              key={c.short}
              onClick={() => setSel(i)}
              style={{
                position: 'absolute',
                width: RING_SIZES[i],
                height: RING_SIZES[i],
                top: RING_OFFSETS[i],
                left: RING_OFFSETS[i],
                borderRadius: '50%',
                border: `${i === sel ? '2.5px' : '1.5px'} solid ${c.color}`,
                background: i === sel ? `${c.color}22` : `${c.color}09`,
                cursor: 'pointer',
                transition: 'all 0.2s',
                display: 'flex',
                alignItems: i === 3 ? 'center' : 'flex-start',
                justifyContent: 'center',
                paddingTop: i === 3 ? 0 : 9,
                boxSizing: 'border-box',
              }}
            >
              <span style={{
                fontSize: i === 3 ? 10 : 11,
                fontWeight: 700,
                color: c.color,
                background: `${c.color}20`,
                padding: '2px 8px',
                borderRadius: 3,
                fontFamily: 'var(--font-mono)',
                letterSpacing: '0.04em',
                whiteSpace: 'nowrap',
                lineHeight: i === 3 ? 1.35 : 1,
                textAlign: 'center',
              }}>
                {i === 3 ? 'Gen AI' : c.short}
              </span>
            </div>
          ))}
        </div>
        {/* Axis */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, width: 280 }}>
          <span style={{ fontSize: 10, color: 'var(--muted)', whiteSpace: 'nowrap' }}>broader</span>
          <div style={{ flex: 1, height: 1, background: 'var(--border)' }} />
          <span style={{ fontSize: 10, color: 'var(--muted)', whiteSpace: 'nowrap' }}>more specific</span>
        </div>
      </div>

      {/* ── Right: tabs + detail panel ── */}
      <div style={{ flex: 1, minWidth: 260 }}>
        {/* Tabs */}
        <div style={{ display: 'flex', gap: 6, marginBottom: 14, flexWrap: 'wrap' }}>
          {concepts.map((c, i) => (
            <button
              key={c.short}
              onClick={() => setSel(i)}
              style={{
                fontSize: 11,
                padding: '4px 12px',
                borderRadius: 6,
                border: `1.5px solid ${i === sel ? c.color : 'var(--border)'}`,
                background: i === sel ? `${c.color}18` : 'transparent',
                color: i === sel ? c.color : 'var(--muted)',
                cursor: 'pointer',
                fontFamily: 'var(--font-sans)',
                transition: 'all 0.15s',
              }}
            >
              {c.short}
            </button>
          ))}
        </div>

        {/* Detail card */}
        <div style={{
          border: `1.5px solid ${active.color}40`,
          borderRadius: 12,
          padding: '16px 18px',
          background: 'var(--surface)',
          transition: 'border-color 0.2s',
        }}>
          {/* Tag */}
          <div style={{
            fontSize: 10, fontWeight: 700, letterSpacing: '0.08em',
            textTransform: 'uppercase', color: active.color,
            marginBottom: 6, fontFamily: 'var(--font-mono)',
          }}>
            {active.tag}
          </div>

          {/* Title */}
          <div style={{
            fontSize: 17, fontWeight: 900, color: 'var(--text)',
            marginBottom: 10, fontFamily: 'var(--font-display)',
            letterSpacing: '-0.5px',
          }}>
            {active.label}
          </div>

          {/* Definition */}
          <p style={{ fontSize: 13, color: 'var(--muted)', lineHeight: 1.7, marginBottom: 0 }}>
            {active.def}
          </p>

          {/* Analogy */}
          <div style={{
            fontSize: 10, fontWeight: 700, letterSpacing: '0.08em',
            textTransform: 'uppercase', color: 'var(--muted)',
            margin: '14px 0 6px', fontFamily: 'var(--font-mono)',
          }}>
            The analogy
          </div>
          <div style={{
            fontSize: 12.5, color: 'var(--muted)', lineHeight: 1.7,
            padding: '9px 12px',
            background: 'var(--bg2)',
            borderRadius: 6,
            borderLeft: `3px solid ${active.color}60`,
          }}>
            {active.analogy}
          </div>

          {/* Real examples */}
          <div style={{
            fontSize: 10, fontWeight: 700, letterSpacing: '0.08em',
            textTransform: 'uppercase', color: 'var(--muted)',
            margin: '14px 0 8px', fontFamily: 'var(--font-mono)',
          }}>
            Real examples
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            {active.examples.map((ex, i) => (
              <div key={i} style={{ display: 'flex', gap: 9, alignItems: 'flex-start' }}>
                <div style={{
                  width: 5, height: 5, borderRadius: '50%',
                  background: active.color, flexShrink: 0, marginTop: 6,
                }} />
                <span style={{ fontSize: 12, color: 'var(--muted)', lineHeight: 1.6 }}>{ex}</span>
              </div>
            ))}
          </div>

          {/* What it is NOT */}
          <div style={{
            fontSize: 10, fontWeight: 700, letterSpacing: '0.08em',
            textTransform: 'uppercase', color: 'var(--muted)',
            margin: '14px 0 6px', fontFamily: 'var(--font-mono)',
          }}>
            What it is NOT
          </div>
          <div style={{
            fontSize: 12, color: 'var(--muted)', lineHeight: 1.65,
            padding: '8px 11px',
            background: 'var(--bg2)',
            borderRadius: 6,
            border: '1px solid var(--border)',
          }}>
            {active.notText}
          </div>
        </div>
      </div>
    </div>
  )
}