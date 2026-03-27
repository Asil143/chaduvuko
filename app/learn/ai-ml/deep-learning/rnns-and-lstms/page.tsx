import type { Metadata } from 'next'
import { LearnLayout } from '@/components/content/LearnLayout'
import { Callout } from '@/components/content/Callout'
import { KeyTakeaways } from '@/components/content/KeyTakeaways'
import MLPageHeader from '@/components/content/MLPageHeader'

export const metadata: Metadata = {
  title: 'RNNs and LSTMs — Sequence Modelling — Chaduvuko',
  description:
    'Hidden states, vanishing gradients across time, and how LSTMs use gates to selectively remember and forget. Built from scratch before PyTorch.',
}

const S = {
  tag: {
    fontSize: 11, fontWeight: 700 as const, letterSpacing: '0.1em',
    textTransform: 'uppercase' as const, color: 'var(--accent)',
    fontFamily: 'var(--font-mono)', display: 'block' as const, marginBottom: 10,
  },
  h2: {
    fontFamily: 'var(--font-display)', fontSize: 'clamp(20px,3vw,30px)',
    fontWeight: 900 as const, letterSpacing: '-1.2px',
    color: 'var(--text)', marginBottom: 14, lineHeight: 1.15,
  },
  h3: {
    fontFamily: 'var(--font-display)', fontSize: 17,
    fontWeight: 700 as const, letterSpacing: '-0.4px',
    color: 'var(--text)', marginBottom: 10, marginTop: 28,
  },
  p: { fontSize: 15, color: 'var(--muted)', lineHeight: 1.9, marginBottom: 16 },
  ps: { fontSize: 13, color: 'var(--muted)', lineHeight: 1.8, marginBottom: 10 },
  sec: { paddingBottom: 56, paddingTop: 8, borderBottom: '1px solid var(--border)' },
  code: {
    fontFamily: 'var(--font-mono)', fontSize: 12,
    background: 'var(--bg2)', border: '1px solid var(--border)',
    borderRadius: 4, padding: '1px 6px', color: 'var(--accent)',
  },
}

function Div() { return <div style={{ height: 56 }} /> }

function CodeBlock({ code, label }: { code: string; label?: string }) {
  return (
    <div style={{
      background: 'var(--bg2)', border: '1px solid var(--border)',
      borderRadius: 10, overflow: 'hidden', marginBottom: 24,
    }}>
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '8px 16px', borderBottom: '1px solid var(--border)',
        background: 'var(--surface)',
      }}>
        <span style={{
          fontSize: 10, fontWeight: 700, color: 'var(--muted)',
          fontFamily: 'var(--font-mono)', letterSpacing: '0.08em',
          textTransform: 'uppercase' as const,
        }}>
          {label ?? 'python'}
        </span>
        <div style={{ display: 'flex', gap: 6 }}>
          {['#ff5f57', '#febc2e', '#28c840'].map((c, i) => (
            <div key={i} style={{ width: 10, height: 10, borderRadius: '50%', background: c }} />
          ))}
        </div>
      </div>
      <pre style={{
        padding: '18px 20px', margin: 0, overflowX: 'auto',
        fontFamily: 'var(--font-mono)', fontSize: 13,
        lineHeight: 1.75, color: 'var(--text)',
      }}>
        <code>{code}</code>
      </pre>
    </div>
  )
}

function VisualBox({ children, label }: { children: React.ReactNode; label: string }) {
  return (
    <div style={{
      border: '1px solid var(--border)', borderRadius: 10,
      overflow: 'hidden', marginBottom: 24,
    }}>
      <div style={{
        padding: '8px 14px', background: 'var(--surface)',
        borderBottom: '1px solid var(--border)',
        fontSize: 11, fontWeight: 700, color: 'var(--muted)',
        fontFamily: 'var(--font-mono)', letterSpacing: '0.07em',
        textTransform: 'uppercase' as const,
      }}>
        {label}
      </div>
      <div style={{ padding: '20px', background: 'var(--bg2)' }}>
        {children}
      </div>
    </div>
  )
}

function AnalogyBox({ children }: { children: React.ReactNode }) {
  return (
    <div style={{
      background: 'rgba(0,230,118,0.04)',
      border: '1px solid rgba(0,230,118,0.2)',
      borderRadius: 8, padding: '16px 20px', marginBottom: 20,
    }}>
      <div style={{
        fontSize: 11, fontWeight: 700, letterSpacing: '0.08em',
        textTransform: 'uppercase' as const, color: '#00e676',
        fontFamily: 'var(--font-mono)', marginBottom: 10,
      }}>
        🧠 Analogy — read this first
      </div>
      {children}
    </div>
  )
}

function ConceptBox({ title, children, color = '#7b61ff' }: {
  title: string; children: React.ReactNode; color?: string
}) {
  return (
    <div style={{
      background: 'var(--surface)',
      border: `1px solid ${color}30`,
      borderLeft: `4px solid ${color}`,
      borderRadius: 8, padding: '16px 20px', marginBottom: 20,
    }}>
      <div style={{
        fontSize: 11, fontWeight: 700, letterSpacing: '0.08em',
        textTransform: 'uppercase' as const, color,
        fontFamily: 'var(--font-mono)', marginBottom: 10,
      }}>
        {title}
      </div>
      {children}
    </div>
  )
}

function ErrorBlock({ error, cause, fix }: { error: string; cause: string; fix: string }) {
  return (
    <div style={{
      background: 'var(--surface)', border: '1px solid var(--border)',
      borderRadius: 8, overflow: 'hidden', marginBottom: 12,
    }}>
      <div style={{
        padding: '9px 14px', background: 'rgba(226,75,74,0.08)',
        borderBottom: '1px solid var(--border)',
        fontFamily: 'var(--font-mono)', fontSize: 12,
        color: '#ff4757', fontWeight: 600,
      }}>
        {error}
      </div>
      <div style={{ padding: '12px 14px' }}>
        <div style={{
          fontSize: 11, fontWeight: 700, letterSpacing: '0.07em',
          textTransform: 'uppercase' as const, color: 'var(--muted)',
          fontFamily: 'var(--font-mono)', marginBottom: 4,
        }}>Why it happens</div>
        <p style={{ ...S.ps, marginBottom: 10 }}>{cause}</p>
        <div style={{
          fontSize: 11, fontWeight: 700, letterSpacing: '0.07em',
          textTransform: 'uppercase' as const, color: '#00e676',
          fontFamily: 'var(--font-mono)', marginBottom: 4,
        }}>Fix</div>
        <p style={{ ...S.ps, marginBottom: 0 }}>{fix}</p>
      </div>
    </div>
  )
}

export default function RNNsAndLSTMsPage() {
  return (
    <LearnLayout
      title="RNNs and LSTMs — Sequence Modelling"
      description="Hidden states, vanishing gradients across time, and how LSTMs use gates to selectively remember and forget. Built from scratch before PyTorch."
      section="Deep Learning"
      readTime="40–45 min"
      updatedAt="March 2026"
    >
      <MLPageHeader section="deep-learning" topic="rnns-and-lstms" />

      {/* ══ SECTION 1 — PLAIN ENGLISH ══════════════════════════════════════════ */}
      <div style={S.sec}>
        <span style={S.tag}>Before any formula — what problem do RNNs solve?</span>
        <h2 style={S.h2}>
          A CNN sees one image independently. An MLP sees one row independently.
          But a sentence, a stock price, a user session — each step
          depends on what came before. RNNs process sequences by
          carrying memory forward.
        </h2>

        <p style={S.p}>
          Flipkart wants to predict whether a user will make a purchase
          in the next 10 minutes based on their browsing session:
          home page → search "running shoes" → product page → add to cart → remove from cart.
          An MLP treats each action independently — it sees five inputs
          with no concept of order or context. The sequence matters enormously.
          "Add to cart then remove" signals hesitation. "Search then product page"
          signals intent. The temporal pattern is the signal.
        </p>

        <p style={S.p}>
          RNNs (Recurrent Neural Networks) process sequences one step at a time,
          maintaining a <strong style={{ color: '#7b61ff' }}>hidden state</strong> —
          a vector that summarises everything seen so far.
          At each step the hidden state is updated using the current input
          and the previous hidden state. After processing the full sequence,
          the final hidden state is a compressed representation of the entire
          sequence — used for classification, regression, or generation.
        </p>

        <AnalogyBox>
          <p style={{ ...S.p, marginBottom: 8 }}>
            Reading this sentence word by word — your understanding of each
            new word depends on everything you have read before.
            "The bank was steep" versus "The bank was closed" —
            the word "bank" means something different based on prior context.
            You carry a mental model forward as you read.
            That mental model is the hidden state.
          </p>
          <p style={{ ...S.ps, marginBottom: 0, color: '#00e676' }}>
            An RNN does exactly this — it maintains a hidden state vector
            that gets updated at every word (or time step). The hidden state
            at the end of the sequence encodes the full context.
            The problem: RNNs forget things from 20+ steps ago.
            LSTMs fix this with explicit memory management using gates.
          </p>
        </AnalogyBox>

        <Callout type="tip">
          RNNs and LSTMs are less common in new NLP projects — Transformers
          (Module 48) have largely replaced them for language tasks.
          But LSTMs remain the standard for time-series forecasting,
          anomaly detection in sensor data, and any sequence where
          the input length is very long or variable.
          Understanding LSTMs is essential for reading older literature
          and for time-series work.
        </Callout>
      </div>

      <Div />

      {/* ══ SECTION 2 — THE RNN ══════════════════════════════════════════════════ */}
      <div style={S.sec}>
        <span style={S.tag}>The basic recurrent unit</span>
        <h2 style={S.h2}>The RNN cell — one equation, applied at every time step</h2>

        <p style={S.p}>
          An RNN cell has one equation. At each time step t it takes
          the current input xₜ and the previous hidden state hₜ₋₁,
          combines them linearly, and applies tanh to produce the new hidden state hₜ.
          The same weights Wₓ, Wₕ, and bias b are reused at every time step —
          weight sharing across time, just as CNNs share weights across space.
        </p>

        <ConceptBox title="RNN cell — the single update equation">
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: 13, lineHeight: 2.2 }}>
            <div style={{ color: '#7b61ff', marginBottom: 4 }}>
              hₜ = tanh(Wₓ × xₜ + Wₕ × hₜ₋₁ + b)
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 5, fontSize: 12, color: 'var(--muted)' }}>
              <div>xₜ:    input at time step t        (input_size,)</div>
              <div>hₜ₋₁:  hidden state from last step  (hidden_size,)</div>
              <div>Wₓ:    input weight matrix           (hidden_size × input_size)</div>
              <div>Wₕ:    hidden weight matrix          (hidden_size × hidden_size)</div>
              <div>hₜ:    new hidden state              (hidden_size,)</div>
              <div style={{ color: '#ff4757', marginTop: 4 }}>
                Problem: tanh saturates. Gradient of tanh ≤ 1.
                Over 50 time steps: 0.9⁵⁰ ≈ 0.005 — vanishing gradient across time.
              </div>
            </div>
          </div>
        </ConceptBox>

        <VisualBox label="RNN unrolled across 4 time steps — same weights, different inputs">
          <div style={{ overflowX: 'auto' as const }}>
            <div style={{ display: 'flex', alignItems: 'flex-end', gap: 8, minWidth: 560 }}>
              {/* h0 */}
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
                <div style={{
                  width: 52, height: 32, background: 'var(--surface)',
                  border: '1px dashed var(--border)', borderRadius: 5,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 10, color: 'var(--muted)', fontFamily: 'var(--font-mono)',
                }}>h₀=0</div>
              </div>

              {['search', 'shoes', 'add', 'cart'].map((word, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  {/* Arrow */}
                  <div style={{ fontSize: 16, color: '#7b61ff' }}>→</div>
                  {/* Cell */}
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
                    {/* Output */}
                    <div style={{
                      fontSize: 9, color: '#1D9E75', fontFamily: 'var(--font-mono)',
                      marginBottom: 2,
                    }}>↑ h{i+1}</div>
                    {/* RNN box */}
                    <div style={{
                      width: 72, height: 48, background: 'rgba(123,97,255,0.15)',
                      border: '1.5px solid #7b61ff', borderRadius: 6,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: 10, color: '#7b61ff', fontFamily: 'var(--font-mono)',
                      fontWeight: 700,
                    }}>RNN</div>
                    {/* Input */}
                    <div style={{
                      fontSize: 9, color: '#378ADD', fontFamily: 'var(--font-mono)',
                      marginTop: 2,
                    }}>↑ x{i+1}="{word}"</div>
                  </div>
                </div>
              ))}

              {/* Final arrow and output */}
              <div style={{ fontSize: 16, color: '#7b61ff' }}>→</div>
              <div style={{
                width: 80, height: 48, background: 'rgba(29,158,117,0.15)',
                border: '1.5px solid #1D9E75', borderRadius: 6,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 9, color: '#1D9E75', fontFamily: 'var(--font-mono)',
                textAlign: 'center' as const, padding: '4px',
              }}>
                h₄ → classify
              </div>
            </div>
            <p style={{ ...S.ps, marginBottom: 0, marginTop: 12, fontSize: 11 }}>
              Same Wₓ and Wₕ at every step. h₄ carries information from all 4 words.
              The problem: h₄ remembers "cart" well but may have forgotten "search" entirely.
            </p>
          </div>
        </VisualBox>

        <CodeBlock code={`import numpy as np
import torch
import torch.nn as nn

# ── RNN cell from scratch ─────────────────────────────────────────────
class RNNCellScratch:
    def __init__(self, input_size, hidden_size):
        scale = np.sqrt(1.0 / hidden_size)
        self.Wx = np.random.randn(hidden_size, input_size)  * scale
        self.Wh = np.random.randn(hidden_size, hidden_size) * scale
        self.b  = np.zeros(hidden_size)

    def forward(self, x, h_prev):
        # hₜ = tanh(Wx @ xₜ + Wh @ hₜ₋₁ + b)
        return np.tanh(self.Wx @ x + self.Wh @ h_prev + self.b)

# ── Process a Flipkart session sequence ───────────────────────────────
np.random.seed(42)
input_size  = 8    # embedding dimension per action
hidden_size = 16

cell = RNNCellScratch(input_size, hidden_size)

# Simulate: search → product_page → add_to_cart → remove → add_to_cart
session = [np.random.randn(input_size) for _ in range(5)]

h = np.zeros(hidden_size)   # initial hidden state h₀
print("RNN hidden state norm at each step:")
for t, x in enumerate(session):
    h = cell.forward(x, h)
    print(f"  t={t+1}: ||h|| = {np.linalg.norm(h):.4f}  "
          f"range=[{h.min():.3f}, {h.max():.3f}]")

print(f"\nFinal hidden state (summarises full session): {h[:4].round(4)} ...")

# ── Vanishing gradient demonstration ─────────────────────────────────
print("\nVanishing gradient across time steps (tanh chain):")
grad = 1.0
for t in range(20):
    # tanh derivative ≤ 1, typically ~0.5 in saturated regions
    tanh_deriv = 0.7   # typical value
    grad *= tanh_deriv
    if t % 4 == 3:
        print(f"  After {t+1:2d} steps: gradient = {grad:.6f}")`} />
      </div>

      <Div />

      {/* ══ SECTION 3 — THE LSTM ═════════════════════════════════════════════════ */}
      <div style={S.sec}>
        <span style={S.tag}>Solving the vanishing gradient</span>
        <h2 style={S.h2}>LSTM — three gates that control what to remember, forget, and output</h2>

        <p style={S.p}>
          The LSTM (Long Short-Term Memory) was designed specifically to fix
          the vanishing gradient problem. It maintains two states:
          the <strong style={{ color: '#7b61ff' }}>hidden state hₜ</strong> (same as RNN)
          and a new <strong style={{ color: '#1D9E75' }}>cell state Cₜ</strong> —
          a separate memory lane that runs through the sequence with only
          additive interactions. Because the cell state is modified additively
          (not multiplicatively), gradients flow backward through it
          without shrinking exponentially.
        </p>

        <p style={S.p}>
          Three gates control the cell state. The
          <strong style={{ color: '#D85A30' }}> forget gate</strong> decides what
          to erase from the previous cell state. The
          <strong style={{ color: '#378ADD' }}> input gate</strong> decides what
          new information to write to the cell state. The
          <strong style={{ color: '#BA7517' }}> output gate</strong> decides what
          part of the cell state to expose as the hidden state.
          All gates output values between 0 and 1 (sigmoid) —
          0 means "block completely," 1 means "pass through completely."
        </p>

        <VisualBox label="LSTM gates — what each one does in plain English">
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {[
              {
                gate: 'Forget gate (f)',
                formula: 'f = sigmoid(Wf × [h_prev, x] + bf)',
                color: '#D85A30',
                plain: 'How much of the previous memory to keep. f=1 → keep everything. f=0 → erase everything.',
                example: 'Reading a new paragraph — the network forgets the previous topic.',
              },
              {
                gate: 'Input gate (i) + candidate (g)',
                formula: 'i = sigmoid(Wi × [h_prev, x] + bi)\ng = tanh(Wg × [h_prev, x] + bg)',
                color: '#378ADD',
                plain: 'i decides which new information to write. g is the candidate new content. Cell update: C = f×C_prev + i×g',
                example: 'Seeing "add to cart" — write purchase intent to memory.',
              },
              {
                gate: 'Output gate (o)',
                formula: 'o = sigmoid(Wo × [h_prev, x] + bo)\nh = o × tanh(C)',
                color: '#BA7517',
                plain: 'Which part of the current cell memory to expose as hidden state. h is what gets passed to the next layer.',
                example: 'Only the relevant memory is exposed for the current prediction.',
              },
              {
                gate: 'Cell state update',
                formula: 'C = f × C_prev + i × g',
                color: '#1D9E75',
                plain: 'The key to gradient flow — additive update means gradients flow back without shrinking. This is why LSTMs remember long-range dependencies.',
                example: 'The highway of memory through time — only gated additions, no squashing.',
              },
            ].map((item) => (
              <div key={item.gate} style={{
                background: 'var(--surface)', border: `1px solid ${item.color}25`,
                borderRadius: 8, padding: '11px 14px',
                borderLeft: `3px solid ${item.color}`,
              }}>
                <div style={{ display: 'flex', gap: 10, marginBottom: 5, alignItems: 'flex-start' }}>
                  <span style={{ fontSize: 12, fontWeight: 700, color: item.color, fontFamily: 'var(--font-mono)', minWidth: 180 }}>
                    {item.gate}
                  </span>
                  <span style={{ fontSize: 11, fontFamily: 'var(--font-mono)', color: item.color, whiteSpace: 'pre' as const }}>
                    {item.formula}
                  </span>
                </div>
                <p style={{ ...S.ps, marginBottom: 3 }}>{item.plain}</p>
                <div style={{ fontSize: 11, color: 'var(--muted)', fontStyle: 'italic' }}>
                  Example: {item.example}
                </div>
              </div>
            ))}
          </div>
        </VisualBox>

        <CodeBlock code={`import numpy as np

# ── LSTM cell from scratch — all four gates explicit ──────────────────
class LSTMCellScratch:
    def __init__(self, input_size, hidden_size):
        self.hs = hidden_size
        scale   = np.sqrt(1.0 / hidden_size)
        # Concatenate [h_prev, x] as input — so weight matrix is (hs, hs+is)
        concat_size = hidden_size + input_size
        self.Wf = np.random.randn(hidden_size, concat_size) * scale
        self.Wi = np.random.randn(hidden_size, concat_size) * scale
        self.Wg = np.random.randn(hidden_size, concat_size) * scale
        self.Wo = np.random.randn(hidden_size, concat_size) * scale
        self.bf = np.zeros(hidden_size)
        self.bi = np.zeros(hidden_size)
        self.bg = np.zeros(hidden_size)
        self.bo = np.zeros(hidden_size)

    def sigmoid(self, z): return 1 / (1 + np.exp(-np.clip(z, -500, 500)))

    def forward(self, x, h_prev, C_prev):
        # Concatenate previous hidden state and current input
        combined = np.concatenate([h_prev, x])

        # ── Three gates ────────────────────────────────────────────────
        f = self.sigmoid(self.Wf @ combined + self.bf)  # forget gate
        i = self.sigmoid(self.Wi @ combined + self.bi)  # input gate
        g = np.tanh(   self.Wg @ combined + self.bg)   # candidate values
        o = self.sigmoid(self.Wo @ combined + self.bo)  # output gate

        # ── Cell state update (additive — key to gradient flow) ────────
        C = f * C_prev + i * g

        # ── New hidden state ───────────────────────────────────────────
        h = o * np.tanh(C)

        return h, C, {'f': f, 'i': i, 'g': g, 'o': o}

# ── Process Flipkart session with LSTM ────────────────────────────────
np.random.seed(42)
input_size  = 8
hidden_size = 16

lstm = LSTMCellScratch(input_size, hidden_size)

session_actions = ['home', 'search', 'product', 'add_cart', 'remove', 'add_cart']
session = [np.random.randn(input_size) for _ in session_actions]

h = np.zeros(hidden_size)
C = np.zeros(hidden_size)   # ← cell state: LSTMs have TWO states

print("LSTM states at each step:")
print(f"{'Step':<12} {'Action':<12} {'||h||':>8} {'||C||':>8} {'forget':>8} {'input':>8}")
print("─" * 58)

for t, (x, action) in enumerate(zip(session, session_actions)):
    h, C, gates = lstm.forward(x, h, C)
    print(f"  t={t+1:<9} {action:<12} {np.linalg.norm(h):>8.4f} "
          f"{np.linalg.norm(C):>8.4f} {gates['f'].mean():>8.4f} {gates['i'].mean():>8.4f}")

# ── Compare RNN vs LSTM gradient flow ─────────────────────────────────
print("\nGradient flow comparison (100 time steps):")
rnn_grad  = 1.0
lstm_grad = 1.0
for t in range(100):
    rnn_grad  *= 0.7       # tanh derivative, typical value
    lstm_grad *= 0.95      # additive cell state — much slower decay
    if t % 19 == 19:
        print(f"  Step {t+1:3d}: RNN={rnn_grad:.8f}  LSTM={lstm_grad:.6f}")`} />
      </div>

      <Div />

      {/* ══ SECTION 4 — PYTORCH LSTM ════════════════════════════════════════════ */}
      <div style={S.sec}>
        <span style={S.tag}>Production implementation</span>
        <h2 style={S.h2}>PyTorch nn.LSTM — shapes, directions, and layers</h2>

        <p style={S.p}>
          PyTorch's nn.LSTM processes an entire sequence in one call.
          The most important thing to understand is the input and output shapes —
          they are not intuitive and cause the majority of LSTM bugs.
          Input is <span style={S.code as React.CSSProperties}>(seq_len, batch, input_size)</span> by default
          — note seq_len comes first, not batch.
          Output is the hidden state at every time step plus the final
          hidden and cell states separately.
        </p>

        <ConceptBox title="nn.LSTM — inputs, outputs, and the batch_first gotcha">
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: 12, lineHeight: 2.2 }}>
            <div style={{ color: '#7b61ff', marginBottom: 4 }}>
              nn.LSTM(input_size, hidden_size, num_layers, batch_first, dropout, bidirectional)
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 4, fontSize: 12, color: 'var(--muted)' }}>
              <div style={{ color: '#D85A30' }}>Input:   (seq_len, batch, input_size)   ← default (batch_first=False)</div>
              <div style={{ color: '#1D9E75' }}>Input:   (batch, seq_len, input_size)   ← if batch_first=True</div>
              <div>output:  (seq_len, batch, hidden_size × directions)  ← hidden at every step</div>
              <div>h_n:     (num_layers × directions, batch, hidden_size) ← final hidden state</div>
              <div>c_n:     (num_layers × directions, batch, hidden_size) ← final cell state</div>
              <div style={{ color: '#ff4757', marginTop: 4 }}>
                Most bugs: forgetting batch_first=True when DataLoader gives (batch, seq, features).
              </div>
            </div>
          </div>
        </ConceptBox>

        <CodeBlock code={`import torch
import torch.nn as nn
import torch.optim as optim
import numpy as np
from sklearn.model_selection import train_test_split
import warnings
warnings.filterwarnings('ignore')

torch.manual_seed(42)
np.random.seed(42)

# ── Shape exploration first — the most important LSTM topic ───────────
lstm = nn.LSTM(
    input_size=8,
    hidden_size=32,
    num_layers=2,
    batch_first=True,    # (batch, seq, features) — matches DataLoader output
    dropout=0.2,
    bidirectional=False,
)

batch, seq_len, input_size = 16, 10, 8
x = torch.randn(batch, seq_len, input_size)   # (batch, seq, input)

output, (h_n, c_n) = lstm(x)

print("nn.LSTM shape guide (batch=16, seq=10, input=8, hidden=32, layers=2):")
print(f"  x shape:      {tuple(x.shape)}")
print(f"  output shape: {tuple(output.shape)}  ← hidden state at EVERY step")
print(f"  h_n shape:    {tuple(h_n.shape)}     ← final hidden (layers, batch, hidden)")
print(f"  c_n shape:    {tuple(c_n.shape)}     ← final cell   (layers, batch, hidden)")
print()
print(f"  output[:, -1, :] shape: {tuple(output[:, -1, :].shape)}  ← last step only")
print(f"  h_n[-1] shape:          {tuple(h_n[-1].shape)}            ← last layer final h")
print("  Both give the same values for single-direction LSTM")

# ── Bidirectional LSTM ─────────────────────────────────────────────────
bilstm = nn.LSTM(input_size=8, hidden_size=32, batch_first=True, bidirectional=True)
out_bi, (h_bi, c_bi) = bilstm(x)
print(f"\nBidirectional LSTM:")
print(f"  output shape: {tuple(out_bi.shape)}  ← hidden_size × 2 = 64")
print(f"  h_n shape:    {tuple(h_bi.shape)}    ← 2 directions × 1 layer")`} />
      </div>

      <Div />

      {/* ══ SECTION 5 — SEQUENCE CLASSIFICATION ════════════════════════════════ */}
      <div style={S.sec}>
        <span style={S.tag}>Real task — purchase intent prediction</span>
        <h2 style={S.h2}>LSTM for Flipkart session classification — will this user buy?</h2>

        <CodeBlock code={`import torch
import torch.nn as nn
import torch.optim as optim
import numpy as np
from torch.utils.data import Dataset, DataLoader
from sklearn.metrics import roc_auc_score
import copy, warnings
warnings.filterwarnings('ignore')

torch.manual_seed(42)
np.random.seed(42)

# ── Simulate Flipkart browsing sessions ───────────────────────────────
# Each session: variable-length sequence of actions
# Each action: 16-dim feature vector (action type, time on page, etc.)
# Label: 1 = purchased within 30 min, 0 = did not

N_SESSIONS  = 2000
INPUT_SIZE  = 16
MAX_SEQ_LEN = 20

class FlipkartSessionDataset(Dataset):
    def __init__(self, n=N_SESSIONS):
        np.random.seed(42)
        self.sessions = []
        self.labels   = []
        for _ in range(n):
            # Buyers have slightly different patterns
            will_buy = np.random.random() < 0.3   # 30% purchase rate
            seq_len  = np.random.randint(3, MAX_SEQ_LEN + 1)
            # Buyers: more time on product pages, more add-to-cart events
            signal   = 0.4 if will_buy else 0.0
            session  = np.random.randn(seq_len, INPUT_SIZE).astype(np.float32)
            session[:, 0] += signal    # feature 0: add-to-cart frequency
            session[:, 1] += signal    # feature 1: time on product page
            self.sessions.append(torch.FloatTensor(session))
            self.labels.append(int(will_buy))

    def __len__(self): return len(self.sessions)
    def __getitem__(self, i): return self.sessions[i], self.labels[i]

def collate_fn(batch):
    """Pad variable-length sequences to the same length within a batch."""
    sequences, labels = zip(*batch)
    lengths = torch.tensor([len(s) for s in sequences])
    # Pad to max length in this batch
    padded = nn.utils.rnn.pad_sequence(sequences, batch_first=True)
    return padded, torch.tensor(labels, dtype=torch.long), lengths

dataset    = FlipkartSessionDataset()
train_ds, val_ds = torch.utils.data.random_split(dataset, [1600, 400])
train_ld   = DataLoader(train_ds, batch_size=64, shuffle=True,  collate_fn=collate_fn)
val_ld     = DataLoader(val_ds,   batch_size=64, shuffle=False, collate_fn=collate_fn)

# ── LSTM classifier ───────────────────────────────────────────────────
class SessionLSTM(nn.Module):
    def __init__(self, input_size=INPUT_SIZE, hidden_size=64,
                 num_layers=2, dropout=0.3):
        super().__init__()
        self.lstm = nn.LSTM(
            input_size, hidden_size,
            num_layers=num_layers,
            batch_first=True,
            dropout=dropout if num_layers > 1 else 0,
        )
        self.classifier = nn.Sequential(
            nn.Linear(hidden_size, 32),
            nn.ReLU(),
            nn.Dropout(0.3),
            nn.Linear(32, 1),   # binary: buy or not
        )

    def forward(self, x, lengths):
        # Pack padded sequence — LSTM ignores padding positions
        packed = nn.utils.rnn.pack_padded_sequence(
            x, lengths.cpu(), batch_first=True, enforce_sorted=False,
        )
        _, (h_n, _) = self.lstm(packed)
        # h_n: (num_layers, batch, hidden) — take last layer
        last_h = h_n[-1]          # (batch, hidden_size)
        return self.classifier(last_h).squeeze(1)

model     = SessionLSTM()
criterion = nn.BCEWithLogitsLoss()
optimizer = optim.AdamW(model.parameters(), lr=1e-3, weight_decay=0.01)
scheduler = optim.lr_scheduler.ReduceLROnPlateau(optimizer, patience=5, factor=0.5)

# ── Training loop ─────────────────────────────────────────────────────
best_auc, best_wts, patience_count = 0.0, None, 0

print("Training SessionLSTM on Flipkart purchase intent:")
print(f"{'Epoch':>6} {'Train loss':>12} {'Val AUC':>10}")
print("─" * 32)

for epoch in range(1, 31):
    model.train()
    total_loss = 0
    for Xb, yb, lengths in train_ld:
        optimizer.zero_grad()
        logits = model(Xb, lengths)
        loss   = criterion(logits, yb.float())
        loss.backward()
        nn.utils.clip_grad_norm_(model.parameters(), 1.0)  # gradient clipping
        optimizer.step()
        total_loss += loss.item()

    model.eval()
    all_probs, all_labels = [], []
    with torch.no_grad():
        for Xb, yb, lengths in val_ld:
            probs = torch.sigmoid(model(Xb, lengths))
            all_probs.extend(probs.numpy())
            all_labels.extend(yb.numpy())
    val_auc = roc_auc_score(all_labels, all_probs)
    scheduler.step(1 - val_auc)

    if epoch % 5 == 0:
        print(f"  {epoch:>4}  {total_loss/len(train_ld):>12.4f}  {val_auc:>10.4f}")

    if val_auc > best_auc:
        best_auc, best_wts = val_auc, copy.deepcopy(model.state_dict())
        patience_count = 0
    else:
        patience_count += 1
        if patience_count >= 10:
            print(f"  Early stop at epoch {epoch}")
            break

print(f"\nBest val AUC: {best_auc:.4f}")`} />
      </div>

      <Div />

      {/* ══ SECTION 6 — TIME SERIES FORECASTING ════════════════════════════════ */}
      <div style={S.sec}>
        <span style={S.tag}>The other main use case</span>
        <h2 style={S.h2}>LSTM for time series — Zepto demand forecasting</h2>

        <p style={S.p}>
          Beyond classification, LSTMs are widely used for
          <strong style={{ color: '#1D9E75' }}> sequence-to-value regression</strong>:
          given the last N time steps, predict the next value.
          Zepto predicts hourly demand for each SKU at each dark store —
          the last 24 hours of sales predict the next hour.
          This is a many-to-one sequence regression problem.
        </p>

        <CodeBlock code={`import torch
import torch.nn as nn
import torch.optim as optim
import numpy as np
from sklearn.metrics import mean_absolute_error
import warnings
warnings.filterwarnings('ignore')

torch.manual_seed(42)
np.random.seed(42)

# ── Simulate Zepto hourly demand data ─────────────────────────────────
# 1 SKU at 1 dark store, hourly demand for 60 days = 1440 hours
hours = np.arange(1440)
# Demand = base + daily pattern + weekly pattern + noise
demand = (
    50
    + 20 * np.sin(2 * np.pi * hours / 24)           # daily cycle
    + 10 * np.sin(2 * np.pi * hours / (24 * 7))     # weekly cycle
    + np.abs(np.random.normal(0, 8, 1440))           # noise
).clip(0, None)

# ── Create sliding window sequences ───────────────────────────────────
SEQ_LEN = 24   # use last 24 hours to predict next hour

X, y = [], []
for i in range(len(demand) - SEQ_LEN):
    X.append(demand[i:i+SEQ_LEN])
    y.append(demand[i+SEQ_LEN])

X = np.array(X, dtype=np.float32)
y = np.array(y, dtype=np.float32)

# Normalise
X_mean, X_std = X.mean(), X.std()
X = (X - X_mean) / X_std
y = (y - X_mean) / X_std

# Train/test split (time-ordered — no shuffle)
split  = int(len(X) * 0.8)
X_tr, X_te = X[:split], X[split:]
y_tr, y_te = y[:split], y[split:]

X_tr_t = torch.FloatTensor(X_tr).unsqueeze(-1)   # (N, seq, 1)
X_te_t = torch.FloatTensor(X_te).unsqueeze(-1)
y_tr_t = torch.FloatTensor(y_tr).unsqueeze(-1)
y_te_t = torch.FloatTensor(y_te).unsqueeze(-1)

loader = torch.utils.data.DataLoader(
    torch.utils.data.TensorDataset(X_tr_t, y_tr_t),
    batch_size=64, shuffle=True,
)

# ── LSTM forecaster ────────────────────────────────────────────────────
class DemandLSTM(nn.Module):
    def __init__(self):
        super().__init__()
        self.lstm = nn.LSTM(
            input_size=1,
            hidden_size=64,
            num_layers=2,
            batch_first=True,
            dropout=0.2,
        )
        self.head = nn.Linear(64, 1)

    def forward(self, x):
        out, _ = self.lstm(x)
        # Use only the last time step's hidden state for prediction
        return self.head(out[:, -1, :])

model     = DemandLSTM()
criterion = nn.MSELoss()
optimizer = optim.AdamW(model.parameters(), lr=1e-3, weight_decay=0.01)

print("Training Zepto demand forecaster (LSTM):")
for epoch in range(1, 51):
    model.train()
    for Xb, yb in loader:
        optimizer.zero_grad()
        criterion(model(Xb), yb).backward()
        optimizer.step()

    if epoch % 10 == 0:
        model.eval()
        with torch.no_grad():
            pred_norm = model(X_te_t).numpy()
        pred = pred_norm * X_std + X_mean
        true = y_te_t.numpy() * X_std + X_mean
        mae  = mean_absolute_error(true, pred)
        print(f"  Epoch {epoch:2d}: MAE = {mae:.2f} units/hour")

# ── Baseline comparison ────────────────────────────────────────────────
# Naive baseline: predict last observed value
naive_pred = X_te[:, -1] * X_std + X_mean
naive_mae  = mean_absolute_error(y_te * X_std + X_mean, naive_pred)
print(f"\nNaive baseline MAE: {naive_mae:.2f} units/hour")`} />
      </div>

      <Div />

      {/* ══ SECTION 7 — ERRORS ═════════════════════════════════════════════════ */}
      <div style={S.sec}>
        <span style={S.tag}>Errors you will hit</span>
        <h2 style={S.h2}>Every common RNN/LSTM mistake — explained and fixed</h2>

        <ErrorBlock
          error="RuntimeError: input must have 3 dimensions, got 2"
          cause="nn.LSTM expects 3D input: (batch, seq_len, input_size) when batch_first=True, or (seq_len, batch, input_size) otherwise. You passed a 2D tensor — either a single sequence (seq_len, input_size) missing the batch dimension, or a flattened sequence (batch, features) missing the seq dimension."
          fix="Add the missing dimension with unsqueeze. For a single sequence: x = x.unsqueeze(0) to add batch dim → (1, seq_len, input_size). For batch of single-step inputs: x = x.unsqueeze(1) → (batch, 1, input_size). Always print x.shape before the LSTM call when debugging shape errors."
        />

        <ErrorBlock
          error="LSTM training loss is nan after a few steps — exploding gradients"
          cause="Gradients exploding through the recurrent connections. Unlike feedforward networks where gradients only flow through depth, RNNs also flow gradients through time. A sequence of length 100 unrolls the network 100 steps deep — even small gradient amplification compounds. Large learning rates and deep/long sequences amplify this."
          fix="Add gradient clipping immediately: nn.utils.clip_grad_norm_(model.parameters(), max_norm=1.0) before optimizer.step(). This is standard practice for all RNN/LSTM training — always include it. Reduce learning rate to 1e-4. Check that input features are normalised (zero mean, unit variance). Use gradient clipping regardless of whether you observe NaN — it prevents the problem rather than fixing it after."
        />

        <ErrorBlock
          error="LSTM overfits immediately — train loss 0.01, val loss 2.0 after 5 epochs"
          cause="The sequence model has too much capacity for the dataset size. LSTMs have 4× the parameters of an equivalent RNN because of the four gates. A 2-layer LSTM with hidden_size=256 on a dataset of 500 sequences will memorise the training data in a few epochs. Also: not using pack_padded_sequence — the model sees padding zeros as real inputs and memorises padding patterns."
          fix="Reduce hidden_size (try 32–64 for small datasets). Increase dropout between LSTM layers (0.3–0.5). Always use pack_padded_sequence for variable-length sequences to avoid learning from padding. Add weight_decay=0.01 in AdamW. For very small datasets, a simpler model (1-layer LSTM or even a 1D CNN) often generalises better than a deep LSTM."
        />

        <ErrorBlock
          error="h_n[-1] and output[:, -1, :] give different values for bidirectional LSTM"
          cause="For a bidirectional LSTM, h_n has shape (num_layers * 2, batch, hidden_size). The forward and backward directions are stored separately. h_n[-1] is only the backward direction's final hidden state. output[:, -1, :] contains the concatenated forward+backward hidden at the last time step — but the backward direction's 'last step' is actually the first position in the sequence."
          fix="For bidirectional LSTMs, concatenate the final hidden states from both directions: h_forward = h_n[-2]; h_backward = h_n[-1]; combined = torch.cat([h_forward, h_backward], dim=1). This gives the correct (batch, hidden_size*2) representation. Alternatively use output[:, 0, hidden_size:] for backward and output[:, -1, :hidden_size] for forward and concatenate."
        />
      </div>

      <Div />

      {/* ══ SECTION 8 — WHAT'S NEXT ════════════════════════════════════════════ */}
      <div style={{ paddingBottom: 48, paddingTop: 8 }}>
        <span style={S.tag}>What comes next</span>
        <h2 style={S.h2}>
          You can model sequences. Next: the architecture that replaced
          RNNs for almost everything.
        </h2>

        <p style={S.p}>
          LSTMs process sequences step by step — they cannot parallelise
          across time steps during training. A sequence of 512 tokens requires
          512 sequential LSTM steps. Transformers replaced this with
          self-attention — every token attends to every other token simultaneously.
          Training is fully parallelisable, long-range dependencies are
          captured in a single layer, and the results are dramatically better.
          Every modern LLM — GPT, Gemini, Claude — is a Transformer.
          Module 48 builds self-attention from scratch.
        </p>

        <div style={{
          background: 'var(--surface)', border: '1px solid var(--border)',
          borderRadius: 10, padding: '16px 20px',
          display: 'flex', alignItems: 'center',
          justifyContent: 'space-between', flexWrap: 'wrap', gap: 14,
        }}>
          <div>
            <div style={{
              fontSize: 11, fontWeight: 700, letterSpacing: '0.08em',
              textTransform: 'uppercase' as const, color: '#7b61ff',
              fontFamily: 'var(--font-mono)', marginBottom: 5,
            }}>
              Next — Module 48 · Deep Learning
            </div>
            <div style={{
              fontSize: 15, fontWeight: 700, color: 'var(--text)',
              fontFamily: 'var(--font-display)', letterSpacing: '-0.3px',
            }}>
              Transformers and Self-Attention
            </div>
            <p style={{ ...S.ps, marginBottom: 0, marginTop: 4 }}>
              Queries, keys, values, and why attention is all you need.
              Build a self-attention layer from scratch, then see how
              GPT and BERT use it.
            </p>
          </div>
          <div style={{
            fontSize: 12, color: 'var(--muted)',
            border: '1px solid var(--border)',
            padding: '7px 14px', borderRadius: 6,
            fontFamily: 'var(--font-mono)',
          }}>
            coming soon
          </div>
        </div>
      </div>

      <KeyTakeaways
        items={[
          'RNNs process sequences by maintaining a hidden state — a vector summarising everything seen so far. At each step: hₜ = tanh(Wₓxₜ + Wₕhₜ₋₁ + b). The same weights are reused at every step (weight sharing across time). The final hidden state represents the entire sequence.',
          'The vanishing gradient problem: tanh derivatives are at most 1. Over 50 time steps, gradients shrink by 0.7⁵⁰ ≈ 0.0000001. Early time steps receive essentially zero gradient — the network cannot learn long-range dependencies.',
          'LSTMs add a cell state Cₜ alongside the hidden state hₜ. The cell state is updated additively: C = f × C_prev + i × g. Additive updates allow gradients to flow backward without shrinking — this is why LSTMs can learn dependencies 100+ steps apart.',
          'Three gates control the cell state: forget gate f (what to erase from memory), input gate i + candidate g (what new information to write), output gate o (what part of memory to expose as hidden state). All gates use sigmoid — values between 0 and 1 act as soft on/off switches.',
          'PyTorch LSTM shapes: input is (batch, seq_len, input_size) with batch_first=True. output is (batch, seq_len, hidden_size) — hidden at every step. h_n is (num_layers, batch, hidden_size) — final hidden. Always use pack_padded_sequence for variable-length sequences. Always clip gradients: nn.utils.clip_grad_norm_(model.parameters(), 1.0).',
          'Use LSTMs for: time series forecasting (demand, sensor readings), sequence classification (session prediction, sentiment), anomaly detection in sequential data. For new NLP projects use Transformers (Module 48) — LSTMs are the standard choice only for time series and very long sequences where attention would be prohibitively expensive.',
        ]}
      />
    </LearnLayout>
  )
}