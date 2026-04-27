import type { Metadata } from 'next'
import { LearnLayout } from '@/components/content/LearnLayout'
import { Callout } from '@/components/content/Callout'
import { KeyTakeaways } from '@/components/content/KeyTakeaways'
import MLPageHeader from '@/components/content/MLPageHeader'

export const metadata: Metadata = {
  title: 'Information Theory — Entropy, Cross-Entropy and KL Divergence — Chaduvuko',
  description:
    'The information-theoretic foundations of ML. Why surprise is measurable, what entropy really means, and how every neural network loss function is rooted in information theory.',
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
  p: { fontSize: 15, color: 'var(--muted)', lineHeight: 1.85, marginBottom: 16 },
  ps: { fontSize: 13, color: 'var(--muted)', lineHeight: 1.8, marginBottom: 10 },
  sec: { paddingBottom: 56, paddingTop: 8, borderBottom: '1px solid var(--border)' },
  code: {
    fontFamily: 'var(--font-mono)', fontSize: 12,
    background: 'var(--bg2)', border: '1px solid var(--border)',
    borderRadius: 4, padding: '1px 6px', color: 'var(--accent)',
  },
}

function Div() { return <div style={{ height: 56 }} /> }

function HBox({ children, color = 'var(--accent)' }: { children: React.ReactNode; color?: string }) {
  return (
    <div style={{
      background: 'var(--surface)', border: '1px solid var(--border)',
      borderLeft: `3px solid ${color}`, borderRadius: 8,
      padding: '13px 17px', marginBottom: 20,
    }}>
      {children}
    </div>
  )
}

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

function MathBox({ children, label }: { children: React.ReactNode; label: string }) {
  return (
    <div style={{
      border: '1px solid var(--border)', borderRadius: 10,
      overflow: 'hidden', marginBottom: 24,
    }}>
      <div style={{
        padding: '8px 14px', background: 'var(--surface)',
        borderBottom: '1px solid var(--border)',
        display: 'flex', alignItems: 'center', gap: 8,
      }}>
        <div style={{ width: 5, height: 5, borderRadius: '50%', background: '#7F77DD' }} />
        <span style={{
          fontSize: 11, fontWeight: 700, color: '#7F77DD',
          fontFamily: 'var(--font-mono)', letterSpacing: '0.07em',
          textTransform: 'uppercase' as const,
        }}>
          {label}
        </span>
        <span style={{ fontSize: 10, color: 'var(--muted)', marginLeft: 'auto' }}>
          optional — read when ready
        </span>
      </div>
      <div style={{ padding: '16px 20px', background: 'var(--bg2)' }}>
        {children}
      </div>
    </div>
  )
}

export default function InformationTheoryPage() {
  return (
    <LearnLayout
      title="Information Theory — Entropy, Cross-Entropy and KL Divergence"
      description="The information-theoretic foundations of ML. Why surprise is measurable, what entropy really means, and how every neural network loss function connects to information theory."
      section="Math Foundations"
      readTime="45–55 min"
      updatedAt="March 2026"
    >
      <MLPageHeader section='math-foundations' topic='information-theory' />

      {/* ══ SECTION 1 — THE HOOK ═══════════════════════════════════════════════ */}
      <div style={S.sec}>
        <span style={S.tag}>The question that started it all</span>
        <h2 style={S.h2}>
          Claude Shannon asked: how do you measure information?
        </h2>

        <p style={S.p}>
          It's 1948. Claude Shannon is working at Bell Labs trying to figure out
          how to send messages over telephone wires as efficiently as possible.
          He asks a question nobody had asked precisely before:
          what is the minimum number of bits required to transmit a message?
          How much information does a message actually contain?
        </p>

        <p style={S.p}>
          His answer — published in "A Mathematical Theory of Communication" —
          created the entire field of information theory. And it turns out
          that the same mathematics that describes efficient telephone communication
          is also the mathematics behind why neural networks use cross-entropy loss,
          how language models are evaluated, and what makes a feature useful
          for classification.
        </p>

        <p style={S.p}>
          Module 06 introduced entropy, cross-entropy, and KL divergence briefly
          as they connect to probability and loss functions. This module goes
          much deeper — building from the very first principle (what is information?)
          all the way to mutual information, Jensen-Shannon divergence, and
          how information theory shapes model evaluation and feature selection.
        </p>

        <HBox color="#7F77DD">
          <p style={{ ...S.p, marginBottom: 8 }}>
            <span style={{ color: 'var(--text)', fontWeight: 700 }}>
              What this module adds beyond Module 06:
            </span>
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            {[
              'Self-information — what does it mean for one specific event to carry information?',
              'Entropy from first principles — derived, not just defined',
              'Joint entropy and conditional entropy — information across multiple variables',
              'Mutual information — the most important concept in feature selection',
              'Jensen-Shannon divergence — a symmetric, bounded version of KL divergence',
              'Perplexity — how language models are actually evaluated in practice',
              'Information bottleneck — why deep learning compresses information',
              'Practical applications: feature selection, data compression, model evaluation',
            ].map((item, i) => (
              <div key={i} style={{ display: 'flex', gap: 9, alignItems: 'flex-start' }}>
                <div style={{
                  width: 5, height: 5, borderRadius: '50%',
                  background: '#7F77DD', flexShrink: 0, marginTop: 7,
                }} />
                <span style={{ fontSize: 13, color: 'var(--muted)', lineHeight: 1.55 }}>{item}</span>
              </div>
            ))}
          </div>
        </HBox>

        <Callout type="tip">
          This module is more conceptual than the previous ones. The goal is
          not to memorise formulas but to develop an intuition for what
          information means quantitatively. That intuition will make every
          loss function and every evaluation metric click into place.
        </Callout>
      </div>

      <Div />

      {/* ══ SECTION 2 — SELF INFORMATION ══════════════════════════════════════ */}
      <div style={S.sec}>
        <span style={S.tag}>Building from first principles</span>
        <h2 style={S.h2}>Self-information — how surprising is one event?</h2>

        <p style={S.p}>
          Before defining entropy for a whole distribution, we need to define
          information for a single event. Shannon's insight was this:
          the information content of an event is related to how surprising it is.
          An event that happens all the time carries no information when it occurs.
          An event that almost never happens carries a lot of information when it does.
        </p>

        <p style={S.p}>
          Think about it concretely. You open DoorDash and see "Your order
          is being prepared." This happens every single time — completely
          expected, no new information. But if you open DoorDash and see
          "Your restaurant just won a Michelin star" — extremely rare,
          extremely surprising, and therefore carries a lot of information.
        </p>

        <HBox color="#378ADD">
          <p style={{ ...S.p, marginBottom: 8 }}>
            <span style={{ color: 'var(--text)', fontWeight: 700 }}>
              The self-information formula:
            </span>
          </p>
          <div style={{
            fontFamily: 'var(--font-mono)', fontSize: 15,
            color: '#378ADD', padding: '10px 14px',
            background: 'rgba(55,138,221,0.08)',
            borderRadius: 6, textAlign: 'center' as const,
            marginBottom: 12,
          }}>
            I(x) = −log₂ P(x)   bits
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
            {[
              'Certain event P(x)=1: I(x) = −log₂(1) = 0 bits → no information',
              'Coin flip P(x)=0.5: I(x) = −log₂(0.5) = 1 bit → one bit of information',
              'Rare event P(x)=0.01: I(x) = −log₂(0.01) ≈ 6.64 bits → very informative',
              'Impossible event P(x)→0: I(x) → ∞ → infinitely surprising',
            ].map((item, i) => (
              <div key={i} style={{ display: 'flex', gap: 9, alignItems: 'flex-start' }}>
                <div style={{
                  width: 5, height: 5, borderRadius: '50%',
                  background: '#378ADD', flexShrink: 0, marginTop: 7,
                }} />
                <span style={{ fontSize: 13, color: 'var(--muted)', lineHeight: 1.55 }}>{item}</span>
              </div>
            ))}
          </div>
        </HBox>

        <p style={S.p}>
          Why the negative logarithm? Three reasons that Shannon showed are
          the only consistent choice: information should be zero for certain
          events, should decrease as probability increases, and should add
          when two independent events occur simultaneously. The negative log
          is the unique function satisfying all three.
        </p>

        <p style={S.p}>
          The base of the logarithm determines the unit.
          Base 2 → bits (binary digits). Base e → nats. Base 10 → hartleys.
          ML uses both bits (log₂) and nats (ln) depending on context.
          Cross-entropy loss in PyTorch uses natural log → units are nats.
        </p>

        <CodeBlock code={`import numpy as np

def self_information_bits(p):
    """I(x) = -log2(p)  — result in bits"""
    return -np.log2(p)

def self_information_nats(p):
    """I(x) = -ln(p)  — result in nats (used in PyTorch)"""
    return -np.log(p)

# Real examples
events = [
    ('DoorDash order confirmed (always happens)',        1.00),
    ('Order arrives in under 20 min',                 0.30),
    ('Coin flip lands heads',                         0.50),
    ('Order delayed by more than 1 hour',             0.05),
    ('Restaurant partner wins Michelin star',         0.001),
]

print(f"{'Event':<50} {'P(x)':<8} {'Bits':<10} {'Nats'}")
print('─' * 85)
for event, p in events:
    bits = self_information_bits(p)
    nats = self_information_nats(p)
    print(f"{event:<50} {p:<8.3f} {bits:<10.3f} {nats:.3f}")

# Key property: information is ADDITIVE for independent events
# I(A and B) = I(A) + I(B)  when A and B are independent

p_heads1 = 0.5
p_heads2 = 0.5
p_both   = p_heads1 * p_heads2   # independent → multiply probabilities

i_heads1 = self_information_bits(p_heads1)
i_heads2 = self_information_bits(p_heads2)
i_both   = self_information_bits(p_both)

print(f"\nTwo coin flips (independent):")
print(f"  I(heads1) = {i_heads1:.1f} bits")
print(f"  I(heads2) = {i_heads2:.1f} bits")
print(f"  I(both)   = {i_both:.1f} bits")
print(f"  Sum:       {i_heads1 + i_heads2:.1f} bits  ← additive ✓")`} />

        <h3 style={S.h3}>Why log₂ and why "bits"?</h3>

        <p style={S.p}>
          A bit is the answer to a yes/no question. If I need to tell you
          which of 2 equally likely outcomes occurred, I need 1 bit.
          Which of 4 equally likely outcomes? 2 bits (two yes/no questions).
          Which of 8? 3 bits. Which of n? log₂(n) bits.
        </p>

        <p style={S.p}>
          When an event has probability 1/8 (one of 8 equally likely outcomes),
          I(x) = −log₂(1/8) = log₂(8) = 3 bits. Exactly as many bits as
          needed to encode which outcome it was. This is not a coincidence —
          it's the definition working exactly as intended.
        </p>

        <CodeBlock code={`# Demonstrating: self-information = bits needed to encode the outcome

# If there are n equally likely outcomes, each has probability 1/n
# Self-information = -log2(1/n) = log2(n) = bits needed to identify one outcome

for n_outcomes in [2, 4, 8, 16, 64, 256, 1024]:
    p = 1 / n_outcomes
    bits_needed = self_information_bits(p)
    # This equals log2(n_outcomes) exactly
    print(f"  {n_outcomes:4d} equally likely outcomes: {bits_needed:.1f} bits per outcome")

# Output:
#    2: 1.0 bits  ← one yes/no question
#    4: 2.0 bits  ← two yes/no questions
#    8: 3.0 bits
#   16: 4.0 bits
#   64: 6.0 bits
#  256: 8.0 bits  ← one byte!
# 1024: 10.0 bits

# Practical: a byte (8 bits) can encode 256 equally likely symbols.
# ASCII has 128 characters: each one needs log2(128) = 7 bits.
# This is why ASCII is a 7-bit encoding. Information theory designed it.`} />
      </div>

      <Div />

      {/* ══ SECTION 3 — ENTROPY DEEP DIVE ═════════════════════════════════════ */}
      <div style={S.sec}>
        <span style={S.tag}>Shannon entropy</span>
        <h2 style={S.h2}>Entropy — the average self-information of a distribution</h2>

        <p style={S.p}>
          We defined self-information for one specific event.
          Entropy extends this to an entire distribution.
          It asks: on average, how much information do I get when I observe
          an outcome drawn from this distribution?
          Or equivalently: on average, how many bits do I need to communicate
          which outcome occurred?
        </p>

        <p style={S.p}>
          The entropy H(X) is the expected value of self-information
          over the entire distribution — the probability-weighted average
          of how surprising each outcome is.
        </p>

        <MathBox label="Entropy — the derivation">
          <p style={{ ...S.ps, marginBottom: 10 }}>
            Expected value of self-information:
          </p>
          <div style={{
            fontFamily: 'var(--font-mono)', fontSize: 14, lineHeight: 2.2,
            color: 'var(--text)', padding: '10px 14px',
            background: 'var(--surface)', borderRadius: 6, marginBottom: 10,
          }}>
            <div><span style={{ color: '#7F77DD' }}>H(X)</span> = E[I(X)] = E[−log₂ P(X)]</div>
            <div><span style={{ color: '#7F77DD' }}>H(X)</span> = −Σ P(xᵢ) log₂ P(xᵢ)   (discrete)</div>
            <div><span style={{ color: '#7F77DD' }}>H(X)</span> = −∫ p(x) log₂ p(x) dx   (continuous)</div>
          </div>
          <p style={{ ...S.ps, marginBottom: 0 }}>
            Each term P(xᵢ) × I(xᵢ) = P(xᵢ) × (−log P(xᵢ)) is:
            how likely this outcome is × how surprising it would be.
            The sum gives the average surprise across all possible outcomes.
          </p>
        </MathBox>

        <h3 style={S.h3}>The two extreme cases — and why they matter in ML</h3>

        <VisualBox label="Entropy extremes — from deterministic to maximally uncertain">
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>

            {/* Deterministic */}
            <div style={{
              background: 'var(--surface)', border: '1px solid rgba(29,158,117,0.3)',
              borderRadius: 8, padding: '14px 16px',
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 10 }}>
                <span style={{ fontSize: 13, fontWeight: 700, color: '#1D9E75', fontFamily: 'var(--font-display)' }}>
                  Deterministic — H = 0 bits
                </span>
                <span style={{ fontSize: 11, color: 'var(--muted)', fontFamily: 'var(--font-mono)' }}>
                  minimum entropy
                </span>
              </div>
              <div style={{ display: 'flex', gap: 3, marginBottom: 8 }}>
                <div style={{ flex: 10, height: 28, background: '#1D9E75', borderRadius: 3, position: 'relative' as const }}>
                  <span style={{
                    position: 'absolute' as const, top: '50%', left: '50%',
                    transform: 'translate(-50%,-50%)',
                    fontSize: 11, fontFamily: 'var(--font-mono)', color: '#fff',
                  }}>p=1.0</span>
                </div>
                {[0, 0, 0].map((_, i) => (
                  <div key={i} style={{ flex: 0.1, height: 28, background: 'var(--border)', borderRadius: 3 }} />
                ))}
              </div>
              <p style={{ ...S.ps, marginBottom: 0 }}>
                One outcome has probability 1, all others 0.
                You already know what will happen — no information gained from observation.
                In ML: a perfectly confident model on its training data.
                This is why H=0 doesn't mean good model — it can mean overfitting.
              </p>
            </div>

            {/* Uniform */}
            <div style={{
              background: 'var(--surface)', border: '1px solid rgba(216,90,48,0.3)',
              borderRadius: 8, padding: '14px 16px',
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 10 }}>
                <span style={{ fontSize: 13, fontWeight: 700, color: '#D85A30', fontFamily: 'var(--font-display)' }}>
                  Uniform — H = log₂(n) bits
                </span>
                <span style={{ fontSize: 11, color: 'var(--muted)', fontFamily: 'var(--font-mono)' }}>
                  maximum entropy
                </span>
              </div>
              <div style={{ display: 'flex', gap: 3, marginBottom: 8 }}>
                {[1, 1, 1, 1].map((_, i) => (
                  <div key={i} style={{
                    flex: 1, height: 28, background: '#D85A30',
                    borderRadius: 3, opacity: 0.8, position: 'relative' as const,
                  }}>
                    <span style={{
                      position: 'absolute' as const, top: '50%', left: '50%',
                      transform: 'translate(-50%,-50%)',
                      fontSize: 10, fontFamily: 'var(--font-mono)', color: '#fff',
                    }}>0.25</span>
                  </div>
                ))}
              </div>
              <p style={{ ...S.ps, marginBottom: 0 }}>
                All outcomes equally likely. Maximum uncertainty — maximum information per observation.
                For n=4 outcomes: H = log₂(4) = 2 bits.
                In ML: an untrained model outputting uniform probabilities has maximum entropy.
                A well-trained model should have low entropy on confident predictions.
              </p>
            </div>
          </div>
        </VisualBox>

        <CodeBlock code={`import numpy as np

def entropy_bits(probs):
    """H(X) = -sum(p * log2(p))"""
    probs = np.array(probs, dtype=float)
    probs = probs[probs > 0]   # 0*log(0) is defined as 0 by convention
    return -np.sum(probs * np.log2(probs))

def entropy_nats(probs):
    """H(X) = -sum(p * ln(p))  — used in PyTorch"""
    probs = np.array(probs, dtype=float)
    probs = probs[probs > 0]
    return -np.sum(probs * np.log(probs))

# ── Four scenarios from a DoorDash star rating predictor ───────────────

# Scenario A: model is very confident (good!)
model_confident = [0.01, 0.02, 0.04, 0.13, 0.80]  # almost certain it's 5 stars

# Scenario B: model is moderately confident
model_moderate = [0.05, 0.10, 0.20, 0.40, 0.25]

# Scenario C: model is totally confused (bad — high entropy)
model_confused = [0.20, 0.20, 0.20, 0.20, 0.20]   # uniform

# Scenario D: model is confident but WRONG (also bad)
model_wrong = [0.80, 0.13, 0.04, 0.02, 0.01]   # says 1 star, but true label is 5

scenarios = [
    ('Confident (correct)', model_confident),
    ('Moderate',            model_moderate),
    ('Confused (uniform)',  model_confused),
    ('Confident (wrong)',   model_wrong),
]

max_entropy = np.log2(5)  # maximum entropy for 5 classes = log2(5) ≈ 2.32 bits

print(f"Max possible entropy (5 classes): {max_entropy:.4f} bits\n")
print(f"{'Scenario':<28} {'H (bits)':<12} {'% of max':<12} {'Interpretation'}")
print('─' * 75)

for name, probs in scenarios:
    h = entropy_bits(probs)
    pct = h / max_entropy * 100
    interp = "confident" if pct < 30 else "uncertain" if pct < 70 else "very uncertain"
    print(f"{name:<28} {h:<12.4f} {pct:<12.1f} {interp}")

# Entropy as an uncertainty metric:
# High entropy → model is uncertain → maybe need more training or more data
# Low entropy  → model is confident → check if it's correct too!
# Entropy alone doesn't tell you if the model is right, only if it's confident`} />

        <h3 style={S.h3}>Entropy of continuous distributions</h3>

        <p style={S.p}>
          For continuous distributions we use differential entropy —
          the continuous analogue. Unlike discrete entropy it can be negative
          (a very narrow, concentrated distribution can have negative entropy)
          and its value depends on the units. In ML, the relative differences
          in entropy matter more than absolute values.
        </p>

        <CodeBlock code={`from scipy import stats
import numpy as np

# Differential entropy for common distributions

# Gaussian: H = 0.5 * ln(2πeσ²)
def gaussian_entropy(sigma):
    return 0.5 * np.log(2 * np.pi * np.e * sigma**2)

print("Gaussian entropy as σ grows:")
for sigma in [0.1, 0.5, 1.0, 2.0, 5.0, 10.0]:
    h = gaussian_entropy(sigma)
    print(f"  σ={sigma:4.1f} → H = {h:.4f} nats")

# Narrower distribution = lower entropy = more certain = less information per sample
# This is why batch normalisation stabilises training — it controls the entropy
# of activations, preventing them from becoming too concentrated or too spread.

# Comparing entropy of two delivery time models:
model_precise   = stats.norm(loc=35, scale=3)    # σ=3 min — precise
model_imprecise = stats.norm(loc=35, scale=12)   # σ=12 min — imprecise

print(f"\nPrecise model (σ=3):    H = {gaussian_entropy(3):.4f} nats")
print(f"Imprecise model (σ=12): H = {gaussian_entropy(12):.4f} nats")
print(f"Difference: {gaussian_entropy(12) - gaussian_entropy(3):.4f} nats")
# Higher entropy = more uncertainty in predictions = worse model (here)`} />
      </div>

      <Div />

      {/* ══ SECTION 4 — JOINT AND CONDITIONAL ENTROPY ═════════════════════════ */}
      <div style={S.sec}>
        <span style={S.tag}>Two variables together</span>
        <h2 style={S.h2}>Joint entropy and conditional entropy</h2>

        <p style={S.p}>
          So far we've measured information in one variable at a time.
          But ML problems almost always involve multiple variables —
          features and labels, inputs and outputs, current state and next state.
          Joint entropy and conditional entropy extend Shannon's framework
          to pairs of variables.
        </p>

        <h3 style={S.h3}>Joint entropy — total uncertainty in two variables together</h3>

        <p style={S.p}>
          The joint entropy H(X, Y) measures the total uncertainty
          when you consider X and Y together. If X and Y are completely independent,
          H(X, Y) = H(X) + H(Y) — their combined uncertainty is just the sum.
          If they are correlated, H(X, Y) &lt; H(X) + H(Y) — knowing about one
          reduces uncertainty about the other, so together they contain
          less combined uncertainty than separately.
        </p>

        <CodeBlock code={`import numpy as np

# Joint probability table: P(X=x, Y=y)
# X = time of day (morning/evening)
# Y = delivery fast or slow
# joint_probs[i][j] = P(time_i, speed_j)

# Columns:  fast   slow
joint = np.array([
    [0.35, 0.15],   # morning: mostly fast
    [0.10, 0.40],   # evening: mostly slow (rush hour)
])
# Each cell: P(time=row, speed=col)
# Row sums = P(time):  [0.50, 0.50]
# Col sums = P(speed): [0.45, 0.55]

def joint_entropy(joint_probs):
    """H(X,Y) = -sum_xy P(x,y) log2 P(x,y)"""
    probs = joint_probs.flatten()
    probs = probs[probs > 0]
    return -np.sum(probs * np.log2(probs))

def marginal_entropy(probs_1d):
    """H(X) for a 1D marginal distribution"""
    probs = np.array(probs_1d)
    probs = probs[probs > 0]
    return -np.sum(probs * np.log2(probs))

p_time  = joint.sum(axis=1)   # [0.50, 0.50] — marginal over time
p_speed = joint.sum(axis=0)   # [0.45, 0.55] — marginal over speed

H_time       = marginal_entropy(p_time)
H_speed      = marginal_entropy(p_speed)
H_joint      = joint_entropy(joint)
H_sum        = H_time + H_speed

print(f"H(time)         = {H_time:.4f} bits")
print(f"H(speed)        = {H_speed:.4f} bits")
print(f"H(time) + H(speed) = {H_sum:.4f} bits  (if independent)")
print(f"H(time, speed)  = {H_joint:.4f} bits  (actual joint)")
print(f"Reduction:         {H_sum - H_joint:.4f} bits  (← shared information)")
# Joint < sum → they are correlated (time of day tells you something about speed)`} />

        <h3 style={S.h3}>Conditional entropy — uncertainty remaining after knowing something</h3>

        <p style={S.p}>
          Conditional entropy H(Y|X) answers: if I already know X,
          how much uncertainty remains about Y?
          It's the average entropy of Y given each possible value of X,
          weighted by how likely each value of X is.
          If X and Y are independent, H(Y|X) = H(Y) — knowing X tells you nothing.
          If X perfectly predicts Y, H(Y|X) = 0 — no uncertainty remains.
        </p>

        <CodeBlock code={`# Conditional entropy H(Y|X)
# H(Y|X) = sum_x P(x) * H(Y|X=x)

def conditional_entropy(joint_probs):
    """H(Y|X) from a joint probability table (rows=X, cols=Y)"""
    p_x = joint_probs.sum(axis=1, keepdims=True)   # marginal P(x)
    # Conditional distribution P(Y|X=x) for each row
    p_y_given_x = joint_probs / np.where(p_x > 0, p_x, 1)

    total = 0.0
    for i in range(joint_probs.shape[0]):
        row = p_y_given_x[i]
        row = row[row > 0]
        h_row = -np.sum(row * np.log2(row))   # H(Y | X=x_i)
        total += p_x[i, 0] * h_row             # weight by P(X=x_i)
    return total

H_speed_given_time = conditional_entropy(joint)
H_time_given_speed = conditional_entropy(joint.T)

print(f"H(speed | time)  = {H_speed_given_time:.4f} bits")
print(f"H(time  | speed) = {H_time_given_speed:.4f} bits")
print(f"H(speed)         = {H_speed:.4f} bits")
print(f"Reduction from knowing time: {H_speed - H_speed_given_time:.4f} bits")

# Chain rule of entropy:
# H(X, Y) = H(X) + H(Y|X)   always true
print(f"\nChain rule check:")
print(f"H(time) + H(speed|time) = {H_time + H_speed_given_time:.4f}")
print(f"H(time, speed)          = {H_joint:.4f}")
print(f"Equal: {np.isclose(H_time + H_speed_given_time, H_joint)}")   # True ✓`} />
      </div>

      <Div />

      {/* ══ SECTION 5 — MUTUAL INFORMATION ════════════════════════════════════ */}
      <div style={S.sec}>
        <span style={S.tag}>The most important concept for feature selection</span>
        <h2 style={S.h2}>Mutual information — how much does knowing X tell you about Y?</h2>

        <p style={S.p}>
          Mutual information I(X; Y) measures how much information X and Y
          share — how much knowing one reduces uncertainty about the other.
          It's symmetric: I(X; Y) = I(Y; X). And it's zero if and only if
          X and Y are completely independent.
        </p>

        <p style={S.p}>
          For ML, mutual information between a feature and the target label
          tells you how much that feature contributes to predicting the target.
          A feature with high mutual information with the label is a valuable feature.
          A feature with zero mutual information is useless for prediction —
          no matter how sophisticated your model.
        </p>

        <HBox color="#1D9E75">
          <div style={{
            fontFamily: 'var(--font-mono)', fontSize: 15,
            color: '#1D9E75', padding: '10px 14px',
            background: 'rgba(29,158,117,0.08)',
            borderRadius: 6, textAlign: 'center' as const,
            marginBottom: 12,
          }}>
            I(X; Y) = H(X) + H(Y) − H(X, Y)
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
            {[
              'I(X; Y) = 0 → X and Y are independent → feature X tells you nothing about Y',
              'I(X; Y) = H(Y) → X perfectly predicts Y → feature X is the perfect predictor',
              'I(X; Y) = I(Y; X) always → mutual information is symmetric',
              'I(X; Y) ≥ 0 always → knowing a variable never increases uncertainty about another',
            ].map((item, i) => (
              <div key={i} style={{ display: 'flex', gap: 9, alignItems: 'flex-start' }}>
                <div style={{
                  width: 5, height: 5, borderRadius: '50%',
                  background: '#1D9E75', flexShrink: 0, marginTop: 7,
                }} />
                <span style={{ fontSize: 13, color: 'var(--muted)', lineHeight: 1.55 }}>{item}</span>
              </div>
            ))}
          </div>
        </HBox>

        <VisualBox label="Mutual information — the Venn diagram of entropy">
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <svg width="400" height="200" viewBox="0 0 400 200">
              {/* Circle X */}
              <circle cx="160" cy="100" r="80" fill="rgba(55,138,221,0.15)" stroke="#378ADD" strokeWidth="1.5" />
              {/* Circle Y */}
              <circle cx="240" cy="100" r="80" fill="rgba(29,158,117,0.15)" stroke="#1D9E75" strokeWidth="1.5" />
              {/* Overlap highlight */}
              <clipPath id="clip-x"><circle cx="160" cy="100" r="80" /></clipPath>
              <circle cx="240" cy="100" r="80"
                fill="rgba(127,119,221,0.3)"
                stroke="none"
                clipPath="url(#clip-x)" />

              {/* Labels */}
              <text x="120" y="95" textAnchor="middle" fontFamily="monospace" fontSize="12" fill="#378ADD">H(X)</text>
              <text x="120" y="113" textAnchor="middle" fontFamily="monospace" fontSize="10" fill="#888">only</text>
              <text x="280" y="95" textAnchor="middle" fontFamily="monospace" fontSize="12" fill="#1D9E75">H(Y)</text>
              <text x="280" y="113" textAnchor="middle" fontFamily="monospace" fontSize="10" fill="#888">only</text>
              <text x="200" y="95" textAnchor="middle" fontFamily="monospace" fontSize="11" fill="#7F77DD" fontWeight="bold">I(X;Y)</text>
              <text x="200" y="113" textAnchor="middle" fontFamily="monospace" fontSize="10" fill="#7F77DD">shared</text>

              {/* H(X,Y) label */}
              <text x="200" y="185" textAnchor="middle" fontFamily="monospace" fontSize="11" fill="#888">H(X,Y) = entire region</text>
            </svg>
          </div>
          <div style={{ fontSize: 12, color: 'var(--muted)', textAlign: 'center' as const, marginTop: 4 }}>
            I(X;Y) is the overlap. I(X;Y) = H(X) + H(Y) − H(X,Y)
          </div>
        </VisualBox>

        <CodeBlock code={`import numpy as np
from sklearn.feature_selection import mutual_info_classif
from sklearn.datasets import make_classification

np.random.seed(42)

# ── Manual mutual information ─────────────────────────────────────────

def mutual_information(joint_probs):
    """I(X;Y) = H(X) + H(Y) - H(X,Y)"""
    p_x = joint_probs.sum(axis=1)
    p_y = joint_probs.sum(axis=0)

    H_X   = marginal_entropy(p_x)
    H_Y   = marginal_entropy(p_y)
    H_XY  = joint_entropy(joint_probs)

    return H_X + H_Y - H_XY

# Using the delivery time/speed example
mi = mutual_information(joint)
print(f"I(time; speed) = {mi:.4f} bits")
print(f"H(speed)       = {H_speed:.4f} bits")
print(f"MI / H(speed)  = {mi/H_speed:.4f}  ({mi/H_speed*100:.1f}% of label entropy explained)")

# ── Sklearn mutual information for feature selection ─────────────────

# Generate classification dataset: 5 features, 2 informative, 3 noise
X, y = make_classification(
    n_samples=1000, n_features=5,
    n_informative=2, n_redundant=0,
    n_repeated=0, n_classes=2,
    random_state=42
)

# mutual_info_classif estimates I(feature; label) for each feature
mi_scores = mutual_info_classif(X, y, random_state=42)

print("\nMutual information: feature → label")
for i, score in enumerate(mi_scores):
    bar = '█' * int(score * 50)
    label = "informative" if score > 0.05 else "noise"
    print(f"  Feature {i}: {bar} {score:.4f}  [{label}]")

# Features 0 and 1 should have the highest MI — they were informative.
# Features 2, 3, 4 are noise — their MI with y ≈ 0.

# ── MI as a correlation alternative ──────────────────────────────────
# Pearson correlation only captures LINEAR relationships.
# Mutual information captures ANY relationship — linear or not.

x_linear  = np.random.randn(500)
y_linear  = x_linear + np.random.randn(500) * 0.5   # linear relationship
y_nonlin  = x_linear ** 2 + np.random.randn(500) * 0.3  # non-linear (quadratic)

corr_linear = np.corrcoef(x_linear, y_linear)[0, 1]
corr_nonlin = np.corrcoef(x_linear, y_nonlin)[0, 1]

print(f"\nLinear relationship:     Pearson r = {corr_linear:.3f}  (high → detected)")
print(f"Non-linear (quadratic):  Pearson r = {corr_nonlin:.3f}  (near 0 → missed!)")
# Pearson missed the quadratic relationship. MI would not.`} />

        <h3 style={S.h3}>Normalised mutual information — comparing across different scales</h3>

        <CodeBlock code={`# Normalised Mutual Information (NMI)
# Scales MI to [0, 1] so you can compare features with different entropies

def normalised_mutual_information(joint_probs):
    """NMI = I(X;Y) / sqrt(H(X) * H(Y))"""
    mi = mutual_information(joint_probs)
    p_x = joint_probs.sum(axis=1)
    p_y = joint_probs.sum(axis=0)
    H_X = marginal_entropy(p_x)
    H_Y = marginal_entropy(p_y)
    if H_X == 0 or H_Y == 0:
        return 0.0
    return mi / np.sqrt(H_X * H_Y)

nmi = normalised_mutual_information(joint)
print(f"NMI(time, speed) = {nmi:.4f}")
# 0 = completely independent, 1 = perfectly correlated

# NMI is also used to evaluate clustering quality:
# Compare predicted cluster labels with true labels
# High NMI → predicted clusters align with true structure
from sklearn.metrics import normalized_mutual_info_score

true_labels = np.array([0, 0, 0, 1, 1, 1, 2, 2, 2])
pred_labels = np.array([0, 0, 1, 1, 1, 2, 2, 2, 0])  # some errors

nmi_clustering = normalized_mutual_info_score(true_labels, pred_labels)
print(f"NMI (clustering evaluation): {nmi_clustering:.4f}")
print("(1.0 = perfect, 0.0 = random)")`} />
      </div>

      <Div />

      {/* ══ SECTION 6 — KL DIVERGENCE DEEP DIVE ══════════════════════════════ */}
      <div style={S.sec}>
        <span style={S.tag}>Comparing distributions</span>
        <h2 style={S.h2}>KL divergence — a deep dive into asymmetry and meaning</h2>

        <p style={S.p}>
          Module 06 introduced KL divergence as a measure of how different
          two distributions are. This section goes deeper — particularly on
          the asymmetry property, which has practical consequences
          in how you use it in ML.
        </p>

        <p style={S.p}>
          D_KL(P ∥ Q) ≠ D_KL(Q ∥ P) in general.
          The two directions have different meanings and different failure modes.
          Getting this wrong causes subtle bugs in VAEs, knowledge distillation,
          and reinforcement learning.
        </p>

        <VisualBox label="KL divergence asymmetry — forward vs reverse">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
            <div style={{
              background: 'var(--surface)', border: '1px solid rgba(55,138,221,0.3)',
              borderRadius: 8, padding: '13px 15px',
            }}>
              <div style={{
                fontSize: 12, fontWeight: 700, color: '#378ADD',
                fontFamily: 'var(--font-mono)', marginBottom: 8,
              }}>
                Forward KL: D_KL(P ∥ Q)
              </div>
              <p style={{ ...S.ps, marginBottom: 8 }}>
                "Make Q cover everywhere P has mass."
                If P is non-zero somewhere but Q is zero there,
                the KL is infinite. Q is penalised heavily for
                missing regions where the true distribution has probability.
              </p>
              <div style={{ fontSize: 11, color: '#378ADD', fontFamily: 'var(--font-mono)' }}>
                Result: Q tends to spread out to cover P → "mean-seeking" behaviour
              </div>
            </div>
            <div style={{
              background: 'var(--surface)', border: '1px solid rgba(216,90,48,0.3)',
              borderRadius: 8, padding: '13px 15px',
            }}>
              <div style={{
                fontSize: 12, fontWeight: 700, color: '#D85A30',
                fontFamily: 'var(--font-mono)', marginBottom: 8,
              }}>
                Reverse KL: D_KL(Q ∥ P)
              </div>
              <p style={{ ...S.ps, marginBottom: 8 }}>
                "Make Q avoid everywhere P has no mass."
                If Q is non-zero somewhere but P is zero there,
                the KL is infinite. Q is penalised for placing probability
                where the true distribution has none.
              </p>
              <div style={{ fontSize: 11, color: '#D85A30', fontFamily: 'var(--font-mono)' }}>
                Result: Q focuses on one mode of P → "mode-seeking" behaviour
              </div>
            </div>
          </div>
        </VisualBox>

        <CodeBlock code={`import numpy as np

def kl_divergence(p, q, eps=1e-10):
    """D_KL(P || Q) = sum(P * log(P/Q))"""
    p = np.array(p, dtype=float)
    q = np.array(q, dtype=float)
    q = np.clip(q, eps, 1)   # avoid division by zero
    mask = p > 0
    return np.sum(p[mask] * np.log(p[mask] / q[mask]))

# True distribution P: bimodal (two peaks)
P = np.array([0.30, 0.05, 0.05, 0.30, 0.05, 0.05, 0.20, 0.00])

# Q_mean: tries to cover both peaks → spreads out
Q_mean = np.array([0.13, 0.12, 0.12, 0.13, 0.12, 0.12, 0.13, 0.13])

# Q_mode1: focuses on first peak only → ignores second
Q_mode1 = np.array([0.45, 0.20, 0.15, 0.10, 0.05, 0.03, 0.02, 0.00])

# Q_mode2: focuses on second peak only
Q_mode2 = np.array([0.05, 0.03, 0.05, 0.45, 0.20, 0.10, 0.10, 0.02])

print("Forward KL D_KL(P||Q) — 'zero-avoiding' — penalises missing P's modes:")
print(f"  Q_mean  (covers both): {kl_divergence(P, Q_mean):.4f}")
print(f"  Q_mode1 (first peak):  {kl_divergence(P, Q_mode1):.4f}")
print(f"  Q_mode2 (second peak): {kl_divergence(P, Q_mode2):.4f}")

print("\nReverse KL D_KL(Q||P) — 'zero-forcing' — penalises adding to P's empty spots:")
print(f"  Q_mean  (covers both): {kl_divergence(Q_mean, P):.4f}")
print(f"  Q_mode1 (first peak):  {kl_divergence(Q_mode1, P):.4f}")
print(f"  Q_mode2 (second peak): {kl_divergence(Q_mode2, P):.4f}")

# Key insight:
# Cross-entropy loss uses forward KL (implicitly)
# → neural networks try to cover all modes of the true distribution
#
# Some generative models (flows, early energy models) use reverse KL
# → they pick one mode and fit it perfectly (mode collapse in GANs!)
# This is the information-theoretic explanation for why GANs suffer from
# mode collapse: they minimise something related to reverse KL`} />

        <h3 style={S.h3}>When KL = infinity — and why this matters in practice</h3>

        <CodeBlock code={`# KL divergence can be infinite — a practical gotcha

P_has_zero = np.array([0.5, 0.5, 0.0])  # P gives zero probability to class 3
Q_nonzero  = np.array([0.4, 0.4, 0.2])  # Q gives 0.2 probability to class 3

# Forward KL D_KL(P||Q): P has 0 probability where Q has 0.2
# The 0 * log(0/0.2) term = 0 (0 * anything = 0) — finite!
print(f"D_KL(P || Q) = {kl_divergence(P_has_zero, Q_nonzero):.4f}")  # finite — OK

# Reverse KL D_KL(Q||P): Q has 0.2 where P has 0
# The 0.2 * log(0.2/0) = infinity!
print(f"D_KL(Q || P) = {kl_divergence(Q_nonzero, P_has_zero):.4f}")  # very large!

# This is why in variational inference and VAEs:
# - The KL term in the ELBO uses reverse KL D_KL(Q||P)
# - Q (the approximate posterior) is forced to put zero mass
#   wherever the prior P puts zero mass
# - This prevents Q from "inventing" probability mass where P has none
# - The result: the learned latent space stays well-structured

# Practical fix: always add epsilon before computing KL in code
def safe_kl(p, q, eps=1e-10):
    p = np.clip(p, eps, 1)
    q = np.clip(q, eps, 1)
    # Renormalise after clipping
    p = p / p.sum()
    q = q / q.sum()
    return np.sum(p * np.log(p / q))

print(f"Safe KL with clipping: {safe_kl(P_has_zero, Q_nonzero):.4f}")`} />
      </div>

      <Div />

      {/* ══ SECTION 7 — JENSEN-SHANNON DIVERGENCE ═════════════════════════════ */}
      <div style={S.sec}>
        <span style={S.tag}>A better alternative to KL</span>
        <h2 style={S.h2}>Jensen-Shannon divergence — symmetric, bounded, always finite</h2>

        <p style={S.p}>
          KL divergence has two problems: it's asymmetric and it can be infinite.
          The Jensen-Shannon divergence (JSD) fixes both.
          It's symmetric (JSD(P, Q) = JSD(Q, P)), always finite (even when
          P and Q have non-overlapping support), and bounded between 0 and 1
          (when using log₂) or 0 and ln(2) (when using natural log).
        </p>

        <p style={S.p}>
          JSD also has a beautiful interpretation: it's the average KL divergence
          from each distribution to their mixture M = (P + Q) / 2.
          You create a midpoint distribution and measure how far each
          original distribution is from that midpoint.
        </p>

        <HBox color="#D4537E">
          <div style={{
            fontFamily: 'var(--font-mono)', fontSize: 14, lineHeight: 2,
            color: '#D4537E', padding: '10px 14px',
            background: 'rgba(212,83,126,0.08)',
            borderRadius: 6, marginBottom: 10,
          }}>
            <div>M = (P + Q) / 2</div>
            <div>JSD(P, Q) = (D_KL(P ∥ M) + D_KL(Q ∥ M)) / 2</div>
          </div>
          <p style={{ ...S.ps, marginBottom: 0 }}>
            The square root √JSD is actually a proper metric — it satisfies
            the triangle inequality. This makes it useful for comparing
            text distributions in NLP and comparing model outputs to true labels.
          </p>
        </HBox>

        <CodeBlock code={`import numpy as np
from scipy.spatial.distance import jensenshannon

def jsd_manual(p, q):
    """Jensen-Shannon Divergence — symmetric and bounded"""
    p = np.array(p, dtype=float)
    q = np.array(q, dtype=float)
    M = (p + q) / 2
    return (kl_divergence(p, M) + kl_divergence(q, M)) / 2

# Properties demonstration
P = np.array([0.5, 0.3, 0.2])
Q = np.array([0.2, 0.3, 0.5])   # P reversed

print("JSD properties:")
print(f"  JSD(P, Q) = {jsd_manual(P, Q):.6f}")
print(f"  JSD(Q, P) = {jsd_manual(Q, P):.6f}")
print(f"  Symmetric: {np.isclose(jsd_manual(P, Q), jsd_manual(Q, P))}")

# Bounds
identical = np.array([0.5, 0.3, 0.2])
opposite  = np.array([1.0, 0.0, 0.0])

print(f"\n  JSD(P, P) = {jsd_manual(P, identical):.6f}  (identical → 0)")
print(f"  JSD(P, Q_extreme): {jsd_manual(P, opposite):.6f}  (very different)")
print(f"  Max possible JSD = {np.log(2):.6f}  (= ln(2) with natural log)")

# Comparison: KL can be infinite where JSD is bounded
P_sparse = np.array([0.9, 0.1, 0.0])
Q_sparse = np.array([0.0, 0.5, 0.5])   # non-overlapping support

print(f"\nNon-overlapping distributions:")
print(f"  KL(P||Q) = {kl_divergence(P_sparse, Q_sparse):.4f}")   # huge
print(f"  KL(Q||P) = {kl_divergence(Q_sparse, P_sparse):.4f}")   # huge
print(f"  JSD(P,Q) = {jsd_manual(P_sparse, Q_sparse):.6f}")       # bounded ✓

# ── JSD in ML: GAN training ───────────────────────────────────────────
# The original GAN paper (Goodfellow 2014) proved that the optimal GAN
# generator minimises the JSD between the generated distribution
# and the true data distribution.
# When JSD = 0, the generator has perfectly learned the true distribution.
# When JSD = ln(2), the distributions are completely different.

# This is why GAN training is unstable: gradient of JSD vanishes
# when distributions have no overlap (early training).
# Solution: Wasserstein GAN uses Earth Mover Distance instead of JSD.

# scipy implementation (uses log base 2 by default)
jsd_scipy = jensenshannon(P, Q) ** 2   # scipy returns sqrt(JSD)
print(f"\nscipy JSD (squared): {jsd_scipy:.6f}")`} />
      </div>

      <Div />

      {/* ══ SECTION 8 — CROSS ENTROPY DEEP DIVE ══════════════════════════════ */}
      <div style={S.sec}>
        <span style={S.tag}>The ML loss function</span>
        <h2 style={S.h2}>Cross-entropy — every detail the tutorials skip</h2>

        <p style={S.p}>
          Cross-entropy is the most commonly used loss function in all of
          deep learning. You've seen it before, but this section gives you
          the full picture — including the numerical stability issues
          that cause silent bugs in production, and why PyTorch's
          implementation differs from the mathematical definition.
        </p>

        <h3 style={S.h3}>The full derivation — from information theory to code</h3>

        <CodeBlock code={`import numpy as np

# Cross-entropy H(P, Q) = -sum(P * log(Q))
# Where P = true distribution, Q = predicted distribution

# ── Multi-class classification example ───────────────────────────────
# True label: class 1 (one-hot encoded)
# Predicted probabilities from softmax output

true_label  = np.array([0.0, 1.0, 0.0, 0.0])   # class 1
pred_good   = np.array([0.05, 0.85, 0.07, 0.03]) # confident and correct
pred_unsure = np.array([0.25, 0.30, 0.25, 0.20]) # uncertain
pred_wrong  = np.array([0.80, 0.07, 0.08, 0.05]) # confident and WRONG

def cross_entropy(p_true, q_pred, eps=1e-10):
    """H(P, Q) = -sum(P * log(Q))"""
    q_pred = np.clip(q_pred, eps, 1)
    return -np.sum(p_true * np.log(q_pred))

print("Cross-entropy losses:")
print(f"  Good prediction:   {cross_entropy(true_label, pred_good):.4f}")    # low
print(f"  Uncertain:         {cross_entropy(true_label, pred_unsure):.4f}")  # medium
print(f"  Wrong (confident): {cross_entropy(true_label, pred_wrong):.4f}")   # high

# For one-hot labels, cross-entropy simplifies beautifully:
# H(P, Q) = -log(Q[correct_class])
# We only care about the probability assigned to the true class!
correct_class = 1
print(f"\nSimplified (one-hot): -log(Q[{correct_class}])")
print(f"  Good:   -log({pred_good[correct_class]:.2f})  = {-np.log(pred_good[correct_class]):.4f}")
print(f"  Unsure: -log({pred_unsure[correct_class]:.2f}) = {-np.log(pred_unsure[correct_class]):.4f}")
print(f"  Wrong:  -log({pred_wrong[correct_class]:.2f})  = {-np.log(pred_wrong[correct_class]):.4f}")`} />

        <h3 style={S.h3}>The numerical stability problem — why PyTorch does it differently</h3>

        <p style={S.p}>
          Computing softmax then cross-entropy in two steps causes numerical
          instability. Softmax involves exponentials that overflow for large
          logits. Then taking the log undoes the exponential — so why
          exponentiate in the first place? PyTorch's
          <span style={S.code as React.CSSProperties}> nn.CrossEntropyLoss</span> combines
          softmax and log in a single numerically stable operation called
          "log-softmax." This is one of the most common sources of NaN
          errors in deep learning when people implement it manually.
        </p>

        <CodeBlock code={`import numpy as np

# The numerical stability problem
logits = np.array([2.0, 8.0, 1.0, 0.5])   # raw neural network outputs
true_class = 1

# ── Naive approach: softmax then cross-entropy ────────────────────────
def softmax_naive(x):
    exp_x = np.exp(x)          # OVERFLOW risk for large x!
    return exp_x / exp_x.sum()

def cross_entropy_naive(logits, true_class):
    probs = softmax_naive(logits)
    return -np.log(probs[true_class])

print(f"Naive CE loss: {cross_entropy_naive(logits, true_class):.6f}")

# Now with large logits (common in early training)
logits_large = np.array([200.0, 800.0, 100.0, 50.0])
try:
    loss = cross_entropy_naive(logits_large, true_class)
    print(f"Large logits (naive): {loss}")
except Exception as e:
    print(f"Large logits (naive): OVERFLOW → {e}")
# np.exp(800) = inf → inf/inf = NaN → log(NaN) = NaN

# ── Numerically stable: log-softmax ──────────────────────────────────
def log_softmax_stable(x):
    """log(softmax(x)) computed stably via the log-sum-exp trick"""
    c = x.max()          # subtract max for numerical stability
    return x - c - np.log(np.sum(np.exp(x - c)))

def cross_entropy_stable(logits, true_class):
    log_probs = log_softmax_stable(logits)
    return -log_probs[true_class]

print(f"Stable CE loss:  {cross_entropy_stable(logits, true_class):.6f}")
print(f"Large logits (stable): {cross_entropy_stable(logits_large, true_class):.6f}")
# No overflow! log-sum-exp trick makes it safe.

# ── Why they are equal mathematically ────────────────────────────────
# log(softmax(x_i)) = x_i - log(sum(exp(x_j)))
# = x_i - c - log(sum(exp(x_j - c)))    subtract/add c
# The c cancels. Numerically: exp(x_j - c) is safe because x_j - c ≤ 0.

# ── PyTorch equivalent (for reference) ────────────────────────────────
# import torch
# import torch.nn as nn
# loss_fn = nn.CrossEntropyLoss()   # takes logits directly, not probabilities!
# logits_t = torch.tensor([[2.0, 8.0, 1.0, 0.5]])
# label_t  = torch.tensor([1])     # class index
# loss = loss_fn(logits_t, label_t)
# print(loss)   # same result, implemented with log-sum-exp internally`} />

        <h3 style={S.h3}>Temperature scaling — controlling prediction confidence</h3>

        <p style={S.p}>
          Temperature is a parameter that controls how "sharp" or "soft"
          the predicted distribution is. It divides the logits before softmax.
          Temperature &lt; 1 makes predictions more confident (sharper).
          Temperature &gt; 1 makes predictions more uncertain (flatter).
          This appears in language model sampling, knowledge distillation,
          and model calibration.
        </p>

        <CodeBlock code={`def softmax_with_temperature(logits, temperature=1.0):
    """Softmax with temperature scaling."""
    scaled = logits / temperature
    # Stable softmax
    scaled -= scaled.max()
    exp_scaled = np.exp(scaled)
    return exp_scaled / exp_scaled.sum()

logits = np.array([3.0, 1.5, 0.5, -0.5])

print("Effect of temperature on predictions:")
print(f"{'T':<8} {'Probs':<50} {'Entropy'}")
print('─' * 70)

for T in [0.1, 0.5, 1.0, 2.0, 5.0, 10.0]:
    probs = softmax_with_temperature(logits, temperature=T)
    h = entropy_bits(probs)
    probs_str = '  '.join([f'{p:.3f}' for p in probs])
    print(f"{T:<8.1f} {probs_str:<50} {h:.3f}")

# T=0.1: very sharp → [0.999, 0.001, 0.000, 0.000] → H≈0 (overconfident)
# T=1.0: standard softmax
# T=10 : very flat  → [0.262, 0.248, 0.242, 0.248] → H≈2 (underconfident)

# Use cases:
# T < 1: make language model outputs more deterministic (less random)
# T > 1: make language model outputs more creative (more random)
# T → ∞: uniform distribution (completely random)
# T → 0: argmax (completely deterministic — picks the top class only)
#
# In knowledge distillation: teacher model uses high T to produce "soft labels"
# that reveal the model's uncertainty about borderline cases.
# The student model trains on these soft labels — learning more than hard 0/1.`} />
      </div>

      <Div />

      {/* ══ SECTION 9 — PERPLEXITY ═════════════════════════════════════════════ */}
      <div style={S.sec}>
        <span style={S.tag}>How language models are evaluated</span>
        <h2 style={S.h2}>Perplexity — the standard evaluation metric for language models</h2>

        <p style={S.p}>
          When you read "GPT-4 achieves a perplexity of 5.4 on this benchmark,"
          what does that mean? Perplexity is a direct application of entropy
          to language modelling — and once you know information theory,
          it's completely transparent.
        </p>

        <p style={S.p}>
          A language model assigns a probability to each possible next word
          given the context. Perplexity measures how surprised the model is,
          on average, by each word in a test dataset. Low perplexity means
          the model predicted the actual words well — it was rarely surprised.
          High perplexity means it was frequently surprised — bad model.
        </p>

        <HBox color="#BA7517">
          <div style={{
            fontFamily: 'var(--font-mono)', fontSize: 14, lineHeight: 2,
            color: '#BA7517', padding: '10px 14px',
            background: 'rgba(186,117,23,0.08)',
            borderRadius: 6, marginBottom: 10,
          }}>
            <div>Perplexity = 2^H(P,Q) = exp(cross-entropy)</div>
          </div>
          <p style={{ ...S.ps, marginBottom: 0 }}>
            Perplexity of K means the model is as confused as if it had to
            choose uniformly from K equally likely options at each step.
            Perplexity of 5 means the model is effectively choosing
            among 5 equally probable words at each position.
            Lower is always better.
          </p>
        </HBox>

        <CodeBlock code={`import numpy as np

def perplexity(text_probs):
    """
    Compute perplexity given the model's assigned probability for each word.
    text_probs: list of probabilities P(word_i | context) for each word in the text.
    """
    n = len(text_probs)
    # Cross-entropy = average negative log probability
    cross_ent = -np.mean(np.log(text_probs))
    return np.exp(cross_ent)

# Simulating model evaluation on a sample sentence:
# "The delivery arrived on time today"
# Each value: probability model assigned to the actual word

# A well-trained model (high probabilities → low perplexity)
good_model_probs  = [0.12, 0.45, 0.60, 0.35, 0.52, 0.48, 0.70]

# A poorly trained model (low probabilities → high perplexity)
poor_model_probs  = [0.02, 0.08, 0.12, 0.05, 0.09, 0.07, 0.15]

# A perfect model (always assigns probability 1 to correct word)
perfect_model     = [1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0]

# A random model (vocabulary of 10,000 words, each equally likely)
random_model      = [1/10000] * 7

print("Perplexity comparison:")
print(f"  Perfect model:  {perplexity(perfect_model):.2f}")    # 1.0
print(f"  Good model:     {perplexity(good_model_probs):.2f}") # low
print(f"  Poor model:     {perplexity(poor_model_probs):.2f}") # high
print(f"  Random model:   {perplexity(random_model):.2f}")     # ~10,000

# Real-world benchmarks (approximate 2024 values):
real_world = {
    'GPT-2 (117M)':  29.4,
    'GPT-2 (1.5B)':  17.5,
    'GPT-3 (175B)':  8.6,
    'GPT-4':         4.2,  # approximate
}

print("\nReal-world language model perplexities (Penn Treebank):")
for model, ppl in real_world.items():
    bar = '█' * min(int(ppl), 30)
    print(f"  {model:<20}: {bar} {ppl}")

# The connection to compression:
# A language model with perplexity K can compress text to ~log2(K) bits/word
# Perplexity 4.2 → ~2.07 bits/word → very efficient compression
# Random (perplexity 10000) → 13.3 bits/word → terrible compression
print(f"\nBits per word for each model:")
for model, ppl in real_world.items():
    bits_per_word = np.log2(ppl)
    print(f"  {model:<20}: {bits_per_word:.2f} bits/word")`} />
      </div>

      <Div />

      {/* ══ SECTION 10 — INFORMATION BOTTLENECK ══════════════════════════════ */}
      <div style={S.sec}>
        <span style={S.tag}>Why deep learning works</span>
        <h2 style={S.h2}>The information bottleneck — why deep networks compress and generalise</h2>

        <p style={S.p}>
          The information bottleneck principle offers a compelling
          information-theoretic explanation for why deep learning works.
          Proposed by Tishby and Schwartz-Ziv in 2017, it says:
          a neural network learns by compressing the input X into
          a compact representation T that retains only the information
          relevant to predicting the output Y.
        </p>

        <p style={S.p}>
          During training, two things happen simultaneously.
          The network first increases I(T; Y) — it captures more information
          about the labels from the representation. Then it decreases I(T; X)
          — it compresses away irrelevant information from the input.
          The compression phase is what enables generalisation:
          a representation that ignores irrelevant details of X
          will work on new, unseen examples.
        </p>

        <HBox color="#D85A30">
          <p style={{ ...S.p, marginBottom: 10 }}>
            <span style={{ color: 'var(--text)', fontWeight: 700 }}>
              The information bottleneck objective:
            </span>
          </p>
          <div style={{
            fontFamily: 'var(--font-mono)', fontSize: 14, lineHeight: 2,
            color: '#D85A30', padding: '10px 14px',
            background: 'rgba(216,90,48,0.08)',
            borderRadius: 6, marginBottom: 10,
          }}>
            <div>max I(T; Y) − β × I(T; X)</div>
          </div>
          <div style={{ fontSize: 12, color: 'var(--muted)', lineHeight: 1.7 }}>
            Maximise information about the label (I(T; Y)) while minimising
            information retained about the raw input (I(T; X)).
            β controls the tradeoff — higher β = more compression = more generalisation
            but potentially less accuracy. Lower β = retain more input info = higher accuracy
            but potential overfitting.
          </div>
        </HBox>

        <CodeBlock code={`import numpy as np

# Demonstrating compression vs accuracy tradeoff
# Simulated: how much information about input X vs label Y
# is retained in the representation T at each layer

np.random.seed(42)
n_layers = 8

# Simulated mutual information values during training
# In practice you'd measure these from activations

# Early training: both I(T;X) and I(T;Y) increase
# Late training: I(T;X) decreases (compression), I(T;Y) stays high

I_T_Y = np.array([0.05, 0.25, 0.55, 0.75, 0.85, 0.87, 0.88, 0.88])  # label info
I_T_X = np.array([5.00, 4.80, 4.50, 4.00, 3.20, 2.50, 2.10, 2.00])  # input info

print("Information plane: training a deep network")
print(f"{'Layer/Step':<15} {'I(T;Y) ↑':<15} {'I(T;X) ↓':<15} {'Phase'}")
print('─' * 55)
for i, (iy, ix) in enumerate(zip(I_T_Y, I_T_X)):
    phase = "fitting" if i < 4 else "compressing"
    direction = "→" if i < 4 else "←"
    print(f"Step {i+1:<10} {iy:<15.2f} {ix:<15.2f} {direction} {phase}")

# Interpretation:
# Steps 1-4: network learns to extract signal from input (I(T;Y) rises)
#            both types of information increase
# Steps 5-8: network compresses irrelevant input info (I(T;X) falls)
#            only label-relevant information is kept
#            THIS is when generalisation improves

# Practical implications:
print("\nPractical implications of information bottleneck:")
implications = [
    "Dropout forces compression — randomly removing neurons prevents memorisation",
    "Data augmentation reduces I(T;X) — model can't rely on specific pixel values",
    "Weight decay compresses representations — penalises large weights → simpler T",
    "Early stopping catches the compression phase before overfitting",
    "Deeper networks = more layers to compress = potentially better generalisation",
]
for imp in implications:
    print(f"  • {imp}")`} />
      </div>

      <Div />

      {/* ══ SECTION 11 — PRACTICAL APPLICATIONS ══════════════════════════════ */}
      <div style={S.sec}>
        <span style={S.tag}>Practical applications</span>
        <h2 style={S.h2}>Information theory in everyday ML work</h2>

        <p style={S.p}>
          Information theory isn't just theoretical — it shows up in practical
          ML engineering constantly. Here are the five most common situations
          where knowing this material directly changes how you solve a problem.
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 24 }}>
          {[
            {
              title: '1. Choosing the right loss function',
              color: '#378ADD',
              content: 'MSE for regression (Gaussian noise assumption). Binary cross-entropy for binary classification (Bernoulli). Categorical cross-entropy for multi-class (Categorical). Focal loss for severe class imbalance. The right choice isn\'t convention — it\'s choosing the correct distributional model for your target variable.',
            },
            {
              title: '2. Feature selection with mutual information',
              color: '#1D9E75',
              content: 'sklearn\'s mutual_info_classif and mutual_info_regression compute I(feature; label) for each feature. Features with MI near zero add no predictive value. This is model-agnostic — it works even if no linear correlation exists. Use it as a first-pass filter before expensive model training.',
            },
            {
              title: '3. Model evaluation beyond accuracy',
              color: '#D85A30',
              content: 'Cross-entropy loss is the correct evaluation metric when your model outputs probabilities — not accuracy. Accuracy ignores confidence. A model that says "60% fraud" on every fraud case and "40% fraud" on every legit case has 100% accuracy but terrible cross-entropy. Use cross-entropy when you care about calibration.',
            },
            {
              title: '4. Detecting data drift',
              color: '#7F77DD',
              content: 'KL divergence and JSD measure whether a new batch of data has the same distribution as training data. High KL between training and production distributions signals distribution shift — your model may have degraded. This is used in every modern ML monitoring system (Evidently, WhyLabs, Arize).',
            },
            {
              title: '5. Knowledge distillation',
              color: '#BA7517',
              content: 'Train a small student model to match the output distribution of a large teacher model — not just the hard labels. The student minimises KL(teacher_output || student_output). High-temperature softmax from the teacher reveals uncertainty about borderline cases, providing richer training signal than one-hot labels alone.',
            },
          ].map((item) => (
            <div key={item.title} style={{
              background: 'var(--surface)', border: '1px solid var(--border)',
              borderRadius: 10, padding: '14px 18px',
              borderLeft: `3px solid ${item.color}`,
            }}>
              <div style={{
                fontSize: 14, fontWeight: 700, color: 'var(--text)',
                fontFamily: 'var(--font-display)', marginBottom: 7,
              }}>
                {item.title}
              </div>
              <p style={{ ...S.ps, marginBottom: 0 }}>{item.content}</p>
            </div>
          ))}
        </div>

        <Callout type="info">
          The math foundations section (Modules 03–07) is now complete.
          Vectors and matrices gave you the data structures.
          Matrix multiplication gave you the core operation.
          Derivatives and gradients gave you the learning mechanism.
          Probability gave you the uncertainty framework.
          Information theory gave you the language for measuring knowledge.
          The next section — Programming Ecosystem — turns all of this
          into working Python code using NumPy, Pandas, and sklearn.
        </Callout>
      </div>

      <Div />

      {/* ══ SECTION 12 — WHAT'S NEXT ═══════════════════════════════════════════ */}
      <div style={{ paddingBottom: 48, paddingTop: 8 }}>
        <span style={S.tag}>What comes next</span>
        <h2 style={S.h2}>Math foundations complete. Time to write code.</h2>

        <p style={S.p}>
          You have now studied the full mathematical foundation of ML:
          linear algebra (vectors, matrices, SVD), calculus (derivatives, gradients,
          chain rule), probability (distributions, Bayes, MLE), and information theory
          (entropy, KL divergence, mutual information, perplexity).
          Every algorithm in this track builds on these foundations.
        </p>

        <p style={S.p}>
          Module 08 starts the Programming Ecosystem section.
          It covers Python specifically for ML — not syntax basics,
          but the patterns professional ML engineers actually use:
          NumPy vectorisation, Pandas for data manipulation, Matplotlib
          for exploration, and the sklearn interface that all classical
          ML algorithms share. Every concept from the math section
          gets implemented in working code.
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
              textTransform: 'uppercase' as const, color: '#888888',
              fontFamily: 'var(--font-mono)', marginBottom: 5,
            }}>
              Next — Module 08 · Programming Ecosystem
            </div>
            <div style={{
              fontSize: 15, fontWeight: 700, color: 'var(--text)',
              fontFamily: 'var(--font-display)', letterSpacing: '-0.3px',
            }}>
              Python for Machine Learning
            </div>
            <p style={{ ...S.ps, marginBottom: 0, marginTop: 4 }}>
              Not Python 101. Python the way ML engineers actually write it —
              vectorised, readable, and production-ready from day one.
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
          'Self-information I(x) = −log₂ P(x) bits. Certain events carry 0 bits. Rare events carry many bits. The negative log is the unique function that is zero for certain events, decreasing with probability, and additive for independent events.',
          'Entropy H(X) = expected self-information = −Σ P(x) log₂ P(x). It measures the average uncertainty across a distribution. Zero for deterministic distributions, maximum (log₂ n) for uniform over n outcomes.',
          'Joint entropy H(X,Y) ≤ H(X) + H(Y). Equality holds iff X and Y are independent. Conditional entropy H(Y|X) = H(X,Y) − H(X). Chain rule: H(X,Y) = H(X) + H(Y|X).',
          'Mutual information I(X;Y) = H(X) + H(Y) − H(X,Y). It measures shared information between X and Y. Zero iff independent. Equals H(Y) if X perfectly predicts Y. Use mutual_info_classif for model-agnostic feature selection.',
          'KL divergence D_KL(P∥Q) is asymmetric. Forward KL is zero-avoiding (Q spreads to cover P). Reverse KL is zero-forcing (Q focuses on one mode). JSD is symmetric, bounded between 0 and ln(2), and always finite — even when distributions do not overlap.',
          'Perplexity = exp(cross-entropy). It measures how surprised a language model is per word. Perplexity of K means the model effectively chooses among K equally likely words at each step. Modern LLMs achieve perplexity below 10 on standard benchmarks.',
          'The information bottleneck principle: deep networks learn by first fitting the label (maximising I(T;Y)) then compressing the input (minimising I(T;X)). The compression phase is what produces generalisation. Dropout, weight decay, and data augmentation all promote compression.',
        ]}
      />
    </LearnLayout>
  )
}