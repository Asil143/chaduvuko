import type { Metadata } from 'next'
import { LearnLayout } from '@/components/content/LearnLayout'
import { Callout } from '@/components/content/Callout'
import { KeyTakeaways } from '@/components/content/KeyTakeaways'
import MLPageHeader from '@/components/content/MLPageHeader'

export const metadata: Metadata = {
  title: 'Transformers and Self-Attention — Chaduvuko',
  description:
    'Queries, keys, values, and why attention is all you need. Build a self-attention layer from scratch, then see how GPT and BERT use it.',
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

export default function TransformersAndAttentionPage() {
  return (
    <LearnLayout
      title="Transformers and Self-Attention"
      description="Queries, keys, values, and why attention is all you need. Build a self-attention layer from scratch, then see how GPT and BERT use it."
      section="Deep Learning"
      readTime="45–50 min"
      updatedAt="March 2026"
    >
      <MLPageHeader section="deep-learning" topic="transformers-and-attention" />

      {/* ══ SECTION 1 — PLAIN ENGLISH ══════════════════════════════════════════ */}
      <div style={S.sec}>
        <span style={S.tag}>Before any formula — what problem does attention solve?</span>
        <h2 style={S.h2}>
          LSTMs process tokens one at a time — step 1, then step 2, then step 3.
          A 512-token sequence takes 512 sequential steps.
          Self-attention processes every token in relation to every other
          token simultaneously. That is the entire revolution.
        </h2>

        <p style={S.p}>
          Module 47 showed the LSTM's fundamental limitation: sequential processing.
          To understand token 512 in a document you must first process tokens
          1 through 511. You cannot parallelise across the sequence.
          Modern GPUs have thousands of cores that sit idle while the LSTM
          plods forward one step at a time. Training a large LSTM on a
          billion tokens takes weeks.
        </p>

        <p style={S.p}>
          Self-attention removes sequential dependency entirely.
          For each token it asks: which other tokens in this sequence
          are relevant to understanding me? It computes a relevance score
          between every pair of tokens simultaneously — all in one matrix
          multiplication. The entire sequence is processed in parallel.
          GPT-3 was trained on 300 billion tokens in a few weeks.
          An LSTM of equivalent capacity would have taken years.
        </p>

        <p style={S.p}>
          Beyond speed, attention solves the core weakness of LSTMs —
          long-range dependencies. "The bank on the river bank was steep."
          An LSTM processing this sentence might forget "river" by the time
          it reaches the second "bank." Self-attention directly connects
          "bank" to "river" regardless of distance. Every token directly
          attends to every other token in a single layer.
        </p>

        <AnalogyBox>
          <p style={{ ...S.p, marginBottom: 8 }}>
            Imagine a meeting with 10 people. An LSTM-style meeting:
            person 1 speaks, whispers to person 2, person 2 whispers to person 3 —
            by person 10, the original message is distorted.
            A self-attention meeting: every person simultaneously reads every
            other person's written statement and decides how much to pay
            attention to each one when forming their own response.
            No information degrades. No sequential bottleneck.
          </p>
          <p style={{ ...S.ps, marginBottom: 0, color: '#00e676' }}>
            The attention score between two tokens is their relevance — how much
            should token A look at token B when computing its contextual meaning?
            "Bank" should look at "river" with high attention weight.
            "Bank" should look at "steep" with lower weight.
            These weights are learned during training.
          </p>
        </AnalogyBox>

        <Callout type="tip">
          This module builds self-attention from scratch in NumPy, then
          scales to a full Transformer encoder block in PyTorch.
          Understanding the QKV attention mechanism completely is more
          valuable than memorising the full Transformer architecture —
          everything else (multi-head, positional encoding, feedforward)
          is built on top of this one operation.
        </Callout>
      </div>

      <Div />

      {/* ══ SECTION 2 — SELF-ATTENTION ══════════════════════════════════════════ */}
      <div style={S.sec}>
        <span style={S.tag}>The core operation</span>
        <h2 style={S.h2}>Scaled dot-product attention — queries, keys, and values</h2>

        <p style={S.p}>
          Self-attention projects each token into three vectors:
          a <strong style={{ color: '#D85A30' }}>Query (Q)</strong>,
          a <strong style={{ color: '#1D9E75' }}>Key (K)</strong>,
          and a <strong style={{ color: '#378ADD' }}>Value (V)</strong>.
          Think of it like a library system. The query is your search request.
          The keys are the index cards for every book.
          The values are the actual book contents.
          Attention computes how well your query matches each key,
          converts those match scores to weights (softmax),
          and returns a weighted sum of values.
        </p>

        <ConceptBox title="Scaled dot-product attention — the formula in full">
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: 13, lineHeight: 2.2 }}>
            <div style={{ color: '#7b61ff', marginBottom: 4 }}>
              Attention(Q, K, V) = softmax(Q Kᵀ / √dₖ) × V
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 5, fontSize: 12, color: 'var(--muted)' }}>
              <div>Q = X Wq    ← queries:  (seq_len, d_k)</div>
              <div>K = X Wk    ← keys:     (seq_len, d_k)</div>
              <div>V = X Wv    ← values:   (seq_len, d_v)</div>
              <div style={{ color: '#D85A30' }}>Q Kᵀ            ← attention scores:   (seq_len, seq_len)</div>
              <div style={{ color: '#1D9E75' }}>/ √dₖ           ← scale to prevent softmax saturation</div>
              <div style={{ color: '#378ADD' }}>softmax(...)    ← attention weights: each row sums to 1</div>
              <div style={{ color: '#7b61ff' }}>× V             ← weighted sum of values: (seq_len, d_v)</div>
            </div>
          </div>
        </ConceptBox>

        <VisualBox label="Attention weights — 'bank' attends to context words in a sentence">
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            <div style={{ fontSize: 11, color: 'var(--muted)', marginBottom: 4 }}>
              Sentence: "The river bank was steep" — attention weights from token "bank"
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
              {[
                { token: 'The',   weight: 0.04, color: '#444' },
                { token: 'river', weight: 0.61, color: '#1D9E75' },
                { token: 'bank',  weight: 0.20, color: '#7b61ff' },
                { token: 'was',   weight: 0.06, color: '#444' },
                { token: 'steep', weight: 0.09, color: '#378ADD' },
              ].map((item) => (
                <div key={item.token} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <span style={{ fontSize: 12, fontFamily: 'var(--font-mono)', color: item.color, minWidth: 52 }}>
                    {item.token}
                  </span>
                  <div style={{
                    height: 18, borderRadius: 3,
                    width: `${item.weight * 280}px`,
                    background: item.color,
                    opacity: 0.7,
                    flexShrink: 0,
                  }} />
                  <span style={{ fontSize: 11, color: item.color, fontFamily: 'var(--font-mono)' }}>
                    {item.weight.toFixed(2)}
                  </span>
                </div>
              ))}
            </div>
            <p style={{ ...S.ps, marginBottom: 0, marginTop: 4, fontSize: 11 }}>
              "bank" attends most strongly to "river" (0.61) — learning the disambiguation.
              Weights sum to 1.0. These are learned, not hand-crafted.
            </p>
          </div>
        </VisualBox>

        <CodeBlock code={`import numpy as np

# ── Self-attention from scratch — every operation visible ─────────────

def softmax(x, axis=-1):
    e = np.exp(x - x.max(axis=axis, keepdims=True))
    return e / e.sum(axis=axis, keepdims=True)

def scaled_dot_product_attention(Q, K, V, mask=None):
    """
    Q: (seq_len, d_k)
    K: (seq_len, d_k)
    V: (seq_len, d_v)
    Returns: output (seq_len, d_v), attention_weights (seq_len, seq_len)
    """
    d_k = Q.shape[-1]

    # Step 1: Compute raw attention scores — how much does each Q match each K?
    scores = Q @ K.T / np.sqrt(d_k)   # (seq_len, seq_len)

    # Step 2: Apply mask (optional — for causal/decoder attention)
    if mask is not None:
        scores = np.where(mask == 0, -1e9, scores)

    # Step 3: Softmax — convert scores to weights (each row sums to 1)
    weights = softmax(scores, axis=-1)  # (seq_len, seq_len)

    # Step 4: Weighted sum of values
    output = weights @ V                # (seq_len, d_v)

    return output, weights

# ── Concrete example: 5-token sentence ────────────────────────────────
np.random.seed(42)
seq_len, d_model, d_k = 5, 8, 4

# Token embeddings (in practice these come from an embedding table)
X = np.random.randn(seq_len, d_model)

# Projection matrices — learned during training
Wq = np.random.randn(d_model, d_k) * 0.1
Wk = np.random.randn(d_model, d_k) * 0.1
Wv = np.random.randn(d_model, d_k) * 0.1

# Project to Q, K, V
Q = X @ Wq   # (5, 4)
K = X @ Wk   # (5, 4)
V = X @ Wv   # (5, 4)

output, attn_weights = scaled_dot_product_attention(Q, K, V)

print(f"Input X shape:    {X.shape}")
print(f"Q, K, V shapes:   {Q.shape}")
print(f"Output shape:     {output.shape}")
print(f"Weights shape:    {attn_weights.shape}")
print(f"\nAttention weights (each row sums to 1.0):")
print(attn_weights.round(3))
print(f"\nRow sums: {attn_weights.sum(axis=1).round(6)}  ← all 1.0")

# ── Why √dₖ scaling matters ───────────────────────────────────────────
print("\nEffect of scaling on softmax:")
raw_scores   = np.array([1.0, 2.0, 3.0, 4.0])
unscaled     = softmax(raw_scores)
scaled_4     = softmax(raw_scores / np.sqrt(4))
scaled_64    = softmax(raw_scores / np.sqrt(64))

print(f"No scaling  (d_k=1):  {unscaled.round(4)}  max={unscaled.max():.4f}")
print(f"Scale √4:             {scaled_4.round(4)}  max={scaled_4.max():.4f}")
print(f"Scale √64:            {scaled_64.round(4)}  max={scaled_64.max():.4f}")
print("Large d_k → large dot products → softmax saturates → vanishing gradients")
print("Dividing by √dₖ keeps variance stable regardless of d_k")`} />
      </div>

      <Div />

      {/* ══ SECTION 3 — MULTI-HEAD ATTENTION ════════════════════════════════════ */}
      <div style={S.sec}>
        <span style={S.tag}>Multiple attention patterns simultaneously</span>
        <h2 style={S.h2}>Multi-head attention — h parallel attention heads, concatenated</h2>

        <p style={S.p}>
          A single attention head learns one type of relationship between tokens.
          But a sentence has many simultaneous relationships — syntactic dependencies,
          coreference, semantic similarity, positional proximity.
          Multi-head attention runs h attention heads in parallel,
          each with its own Q, K, V projection matrices.
          Each head can specialise in a different relationship type.
          The outputs are concatenated and projected back to d_model.
        </p>

        <ConceptBox title="Multi-head attention — h heads in parallel">
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: 12, lineHeight: 2.2 }}>
            <div style={{ color: '#7b61ff', marginBottom: 4 }}>
              For each head i in 1..h:
            </div>
            <div style={{ color: '#D85A30', paddingLeft: 16, marginBottom: 4 }}>
              headᵢ = Attention(Q Wqᵢ, K Wkᵢ, V Wvᵢ)
            </div>
            <div style={{ color: '#1D9E75', marginBottom: 4 }}>
              MultiHead(Q,K,V) = Concat(head₁,...,headₕ) Wo
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 4, fontSize: 12, color: 'var(--muted)', marginTop: 8 }}>
              <div>d_model = 512   (full embedding dimension)</div>
              <div>h = 8           (number of heads)</div>
              <div>d_k = d_model/h = 64   (dimension per head)</div>
              <div style={{ color: '#7b61ff' }}>Total parameters = same as one big head — just split differently</div>
            </div>
          </div>
        </ConceptBox>

        <CodeBlock code={`import numpy as np
import torch
import torch.nn as nn

# ── Multi-head attention from scratch ─────────────────────────────────
class MultiHeadAttentionScratch:
    def __init__(self, d_model, n_heads):
        assert d_model % n_heads == 0
        self.d_model = d_model
        self.n_heads = n_heads
        self.d_k     = d_model // n_heads

        np.random.seed(42)
        scale = np.sqrt(1.0 / d_model)
        # One projection matrix per head per role
        self.Wq = [np.random.randn(d_model, self.d_k) * scale for _ in range(n_heads)]
        self.Wk = [np.random.randn(d_model, self.d_k) * scale for _ in range(n_heads)]
        self.Wv = [np.random.randn(d_model, self.d_k) * scale for _ in range(n_heads)]
        self.Wo = np.random.randn(d_model, d_model) * scale   # output projection

    def softmax(self, x):
        e = np.exp(x - x.max(axis=-1, keepdims=True))
        return e / e.sum(axis=-1, keepdims=True)

    def attention(self, Q, K, V):
        scores  = Q @ K.T / np.sqrt(self.d_k)
        weights = self.softmax(scores)
        return weights @ V, weights

    def forward(self, X):
        heads = []
        all_weights = []
        for i in range(self.n_heads):
            Q = X @ self.Wq[i]
            K = X @ self.Wk[i]
            V = X @ self.Wv[i]
            head_out, weights = self.attention(Q, K, V)
            heads.append(head_out)
            all_weights.append(weights)

        # Concatenate all heads → (seq_len, d_model)
        concat = np.concatenate(heads, axis=-1)
        # Final linear projection
        output = concat @ self.Wo
        return output, all_weights

np.random.seed(42)
d_model, n_heads, seq_len = 32, 4, 6
X = np.random.randn(seq_len, d_model)

mha    = MultiHeadAttentionScratch(d_model, n_heads)
out, weights = mha.forward(X)

print(f"Multi-head attention (d_model={d_model}, heads={n_heads}):")
print(f"  Input shape:    {X.shape}")
print(f"  Output shape:   {out.shape}  ← same as input")
print(f"  d_k per head:   {d_model // n_heads}")
print(f"  Weight shapes:  {weights[0].shape} × {n_heads} heads")

print("\nAttention weight patterns per head (row 0 = token 0 attending to all):")
for i, w in enumerate(weights):
    print(f"  Head {i+1}: {w[0].round(3)}")
print("Each head learns a different attention pattern")

# ── PyTorch nn.MultiheadAttention ─────────────────────────────────────
mha_pt = nn.MultiheadAttention(
    embed_dim=32,
    num_heads=4,
    dropout=0.0,
    batch_first=True,
)
X_pt   = torch.FloatTensor(X).unsqueeze(0)   # (1, seq, d_model)
out_pt, attn_pt = mha_pt(X_pt, X_pt, X_pt)  # Q=K=V=X for self-attention
print(f"\nPyTorch MultiheadAttention output: {tuple(out_pt.shape)}")`} />
      </div>

      <Div />

      {/* ══ SECTION 4 — TRANSFORMER ENCODER BLOCK ═══════════════════════════════ */}
      <div style={S.sec}>
        <span style={S.tag}>The full building block</span>
        <h2 style={S.h2}>Transformer encoder block — attention + feedforward + residual + LayerNorm</h2>

        <p style={S.p}>
          A single Transformer encoder block combines four components.
          Multi-head self-attention computes contextual representations.
          A position-wise feedforward network applies the same two-layer MLP
          to each token independently — adding non-linearity and capacity.
          Residual connections add the input to the output of each sub-layer —
          preventing vanishing gradients and enabling very deep stacking.
          Layer Normalisation stabilises training — applied before each sub-layer
          in the modern "Pre-LN" variant used by GPT.
        </p>

        <VisualBox label="Transformer encoder block — data flow">
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 0 }}>
            {[
              { label: 'Input X', color: '#888', shape: '(batch, seq, d_model)' },
              { label: '↓', isArrow: true },
              { label: 'LayerNorm', color: '#BA7517', shape: 'Pre-LN style' },
              { label: '↓', isArrow: true },
              { label: 'Multi-Head Self-Attention', color: '#7b61ff', shape: 'QKV projection + attention' },
              { label: '↓ + residual', isArrow: true },
              { label: 'LayerNorm', color: '#BA7517', shape: '' },
              { label: '↓', isArrow: true },
              { label: 'Feed-Forward Network', color: '#1D9E75', shape: 'Linear(d_model→4d) → GELU → Linear(4d→d_model)' },
              { label: '↓ + residual', isArrow: true },
              { label: 'Output', color: '#888', shape: '(batch, seq, d_model)  ← same shape as input' },
            ].map((item, i) => (
              item.isArrow
                ? <div key={i} style={{ fontSize: 13, color: '#555', padding: '2px 0', fontFamily: 'var(--font-mono)' }}>{item.label}</div>
                : <div key={i} style={{
                    background: 'var(--surface)', border: `1px solid ${item.color}40`,
                    borderRadius: 6, padding: '7px 16px', minWidth: 320, textAlign: 'center' as const,
                    borderLeft: `3px solid ${item.color}`,
                  }}>
                    <span style={{ fontSize: 12, fontWeight: 700, color: item.color, fontFamily: 'var(--font-mono)' }}>
                      {item.label}
                    </span>
                    {item.shape && (
                      <span style={{ fontSize: 10, color: 'var(--muted)', marginLeft: 8, fontFamily: 'var(--font-mono)' }}>
                        {item.shape}
                      </span>
                    )}
                  </div>
            ))}
          </div>
        </VisualBox>

        <CodeBlock code={`import torch
import torch.nn as nn
import torch.nn.functional as F
import math

# ── Positional encoding — inject position info since attention is order-agnostic ──
class PositionalEncoding(nn.Module):
    """
    Self-attention has no notion of token order — "cat sat mat" and
    "mat sat cat" produce the same attention scores without positional encoding.
    Sinusoidal PE adds a unique position signal to each token embedding.
    """
    def __init__(self, d_model, max_seq_len=512, dropout=0.1):
        super().__init__()
        self.dropout = nn.Dropout(dropout)

        # Compute sinusoidal encoding once
        pe   = torch.zeros(max_seq_len, d_model)
        pos  = torch.arange(max_seq_len).unsqueeze(1).float()
        div  = torch.exp(
            torch.arange(0, d_model, 2).float() * (-math.log(10000.0) / d_model)
        )
        pe[:, 0::2] = torch.sin(pos * div)   # even dimensions
        pe[:, 1::2] = torch.cos(pos * div)   # odd dimensions
        self.register_buffer('pe', pe.unsqueeze(0))  # (1, max_len, d_model)

    def forward(self, x):
        # x: (batch, seq_len, d_model)
        x = x + self.pe[:, :x.size(1), :]
        return self.dropout(x)

# ── Single Transformer encoder block ──────────────────────────────────
class TransformerEncoderBlock(nn.Module):
    def __init__(self, d_model=128, n_heads=4, d_ff=512, dropout=0.1):
        super().__init__()
        # Self-attention sub-layer
        self.attention  = nn.MultiheadAttention(
            d_model, n_heads, dropout=dropout, batch_first=True,
        )
        # Feed-forward sub-layer
        self.ff         = nn.Sequential(
            nn.Linear(d_model, d_ff),
            nn.GELU(),              # GELU is standard in modern transformers
            nn.Dropout(dropout),
            nn.Linear(d_ff, d_model),
        )
        # Layer norms — Pre-LN style (norm before sub-layer, not after)
        self.norm1      = nn.LayerNorm(d_model)
        self.norm2      = nn.LayerNorm(d_model)
        self.dropout    = nn.Dropout(dropout)

    def forward(self, x, src_key_padding_mask=None):
        # ── Self-attention with residual ──────────────────────────────
        # Pre-LN: normalise first, then attend, then add residual
        normed   = self.norm1(x)
        attn_out, _ = self.attention(
            normed, normed, normed,
            key_padding_mask=src_key_padding_mask,
        )
        x = x + self.dropout(attn_out)   # residual connection

        # ── Feed-forward with residual ────────────────────────────────
        x = x + self.dropout(self.ff(self.norm2(x)))
        return x

# ── Stack multiple blocks — a full Transformer encoder ────────────────
class TransformerEncoder(nn.Module):
    def __init__(self, vocab_size, d_model=128, n_heads=4,
                 n_layers=4, d_ff=512, max_seq=512, dropout=0.1):
        super().__init__()
        self.embedding = nn.Embedding(vocab_size, d_model, padding_idx=0)
        self.pos_enc   = PositionalEncoding(d_model, max_seq, dropout)
        self.layers    = nn.ModuleList([
            TransformerEncoderBlock(d_model, n_heads, d_ff, dropout)
            for _ in range(n_layers)
        ])
        self.norm      = nn.LayerNorm(d_model)

    def forward(self, x, padding_mask=None):
        # x: (batch, seq_len) — token indices
        x = self.embedding(x)    # (batch, seq, d_model)
        x = self.pos_enc(x)
        for layer in self.layers:
            x = layer(x, src_key_padding_mask=padding_mask)
        return self.norm(x)      # (batch, seq, d_model)

# ── Shape check ───────────────────────────────────────────────────────
torch.manual_seed(42)
model    = TransformerEncoder(vocab_size=5000, d_model=128, n_heads=4, n_layers=2)
x_tokens = torch.randint(1, 5000, (8, 32))   # batch=8, seq_len=32
out      = model(x_tokens)

total = sum(p.numel() for p in model.parameters())
print(f"Transformer Encoder (d=128, heads=4, layers=2):")
print(f"  Input:  {tuple(x_tokens.shape)}")
print(f"  Output: {tuple(out.shape)}  ← contextual token representations")
print(f"  Params: {total:,}")`} />
      </div>

      <Div />

      {/* ══ SECTION 5 — BERT AND GPT STYLE MODELS ═══════════════════════════════ */}
      <div style={S.sec}>
        <span style={S.tag}>How production LLMs use this</span>
        <h2 style={S.h2}>BERT vs GPT — encoder vs decoder, bidirectional vs causal</h2>

        <p style={S.p}>
          The original Transformer had both an encoder and a decoder.
          Modern LLMs use just one half. BERT uses encoder-only —
          every token can attend to every other token (bidirectional).
          This makes it excellent for understanding tasks:
          classification, NER, question answering.
          GPT uses decoder-only — each token can only attend to
          previous tokens (causal masking). This makes it excellent
          for generation: complete this sentence, write this email.
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, marginBottom: 24 }}>
          {[
            {
              name: 'BERT (Encoder-only)',
              color: '#378ADD',
              attention: 'Bidirectional — every token sees all tokens',
              mask: 'No causal mask',
              task: 'Understanding: classification, NER, Q&A',
              pretraining: 'Masked Language Modelling — predict masked tokens',
              finetune: 'Add classification head, fine-tune on labelled data',
              examples: 'Sentiment analysis, spam detection, search ranking',
            },
            {
              name: 'GPT (Decoder-only)',
              color: '#7b61ff',
              attention: 'Causal — each token only sees past tokens',
              mask: 'Upper triangular causal mask',
              task: 'Generation: text completion, chat, code',
              pretraining: 'Next token prediction — predict token t+1 from 1..t',
              finetune: 'RLHF or instruction fine-tuning',
              examples: 'ChatGPT, Claude, Copilot, Gemini',
            },
          ].map((item) => (
            <div key={item.name} style={{
              background: 'var(--surface)', border: `1px solid ${item.color}25`,
              borderRadius: 8, padding: '13px 14px',
              borderLeft: `4px solid ${item.color}`,
            }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: item.color, fontFamily: 'var(--font-display)', marginBottom: 10 }}>
                {item.name}
              </div>
              {[
                ['Attention', item.attention],
                ['Mask', item.mask],
                ['Best for', item.task],
                ['Pre-training', item.pretraining],
                ['Fine-tuning', item.finetune],
                ['Examples', item.examples],
              ].map(([label, val]) => (
                <div key={label} style={{ marginBottom: 5 }}>
                  <span style={{ fontSize: 10, fontWeight: 700, color: item.color, fontFamily: 'var(--font-mono)' }}>
                    {label}:{' '}
                  </span>
                  <span style={{ fontSize: 11, color: 'var(--muted)' }}>{val}</span>
                </div>
              ))}
            </div>
          ))}
        </div>

        <CodeBlock code={`import torch
import torch.nn as nn
import torch.nn.functional as F
import math

# ── Causal mask — the key difference between BERT and GPT ─────────────
def make_causal_mask(seq_len):
    """
    Upper triangular mask: token i cannot attend to token j > i.
    PyTorch MultiheadAttention uses True = IGNORE (confusing but correct).
    """
    mask = torch.triu(torch.ones(seq_len, seq_len), diagonal=1).bool()
    return mask

seq = 6
mask = make_causal_mask(seq)
print("Causal mask (True = blocked):")
print(mask.int().numpy())
print("Token 0 can only attend to: token 0")
print("Token 3 can attend to: tokens 0, 1, 2, 3")
print("Token 5 can attend to: all tokens 0-5")

# ── GPT-style decoder block ────────────────────────────────────────────
class GPTBlock(nn.Module):
    def __init__(self, d_model=128, n_heads=4, d_ff=512, dropout=0.1):
        super().__init__()
        self.attention = nn.MultiheadAttention(
            d_model, n_heads, dropout=dropout, batch_first=True,
        )
        self.ff   = nn.Sequential(
            nn.Linear(d_model, d_ff), nn.GELU(),
            nn.Dropout(dropout), nn.Linear(d_ff, d_model),
        )
        self.norm1   = nn.LayerNorm(d_model)
        self.norm2   = nn.LayerNorm(d_model)
        self.dropout = nn.Dropout(dropout)

    def forward(self, x):
        seq_len   = x.size(1)
        # Causal mask — prevents attending to future tokens
        causal    = make_causal_mask(seq_len).to(x.device)
        normed    = self.norm1(x)
        attn_out, _ = self.attention(normed, normed, normed, attn_mask=causal)
        x = x + self.dropout(attn_out)
        x = x + self.dropout(self.ff(self.norm2(x)))
        return x

class MiniGPT(nn.Module):
    def __init__(self, vocab_size=1000, d_model=128, n_heads=4,
                 n_layers=4, d_ff=512, max_seq=256):
        super().__init__()
        self.token_emb = nn.Embedding(vocab_size, d_model)
        self.pos_emb   = nn.Embedding(max_seq, d_model)   # learnable PE (GPT style)
        self.blocks    = nn.ModuleList([
            GPTBlock(d_model, n_heads, d_ff) for _ in range(n_layers)
        ])
        self.norm      = nn.LayerNorm(d_model)
        self.lm_head   = nn.Linear(d_model, vocab_size, bias=False)
        # Weight tying: token embedding and lm_head share weights
        self.lm_head.weight = self.token_emb.weight

    def forward(self, idx):
        # idx: (batch, seq_len) token indices
        B, T     = idx.shape
        tok_emb  = self.token_emb(idx)
        pos_emb  = self.pos_emb(torch.arange(T, device=idx.device))
        x        = tok_emb + pos_emb
        for block in self.blocks:
            x = block(x)
        x        = self.norm(x)
        logits   = self.lm_head(x)   # (B, T, vocab_size)
        return logits

    @torch.no_grad()
    def generate(self, idx, max_new_tokens, temperature=1.0):
        """Autoregressive generation — one token at a time."""
        for _ in range(max_new_tokens):
            logits  = self(idx)[:, -1, :]   # last token's logits
            logits  = logits / temperature
            probs   = F.softmax(logits, dim=-1)
            next_id = torch.multinomial(probs, num_samples=1)
            idx     = torch.cat([idx, next_id], dim=1)
        return idx

torch.manual_seed(42)
gpt   = MiniGPT(vocab_size=1000, d_model=64, n_heads=4, n_layers=2)
x     = torch.randint(1, 1000, (2, 16))
logits = gpt(x)
total  = sum(p.numel() for p in gpt.parameters())

print(f"\nMiniGPT (d=64, heads=4, layers=2, vocab=1000):")
print(f"  Input:   {tuple(x.shape)}")
print(f"  Logits:  {tuple(logits.shape)}  ← (batch, seq, vocab)")
print(f"  Params:  {total:,}")

# Generate 5 tokens from a seed
seed     = torch.randint(1, 1000, (1, 4))
generated = gpt.generate(seed, max_new_tokens=5)
print(f"\nGeneration: {seed[0].tolist()} → {generated[0].tolist()}")`} />
      </div>

      <Div />

      {/* ══ SECTION 6 — FINE-TUNING BERT ════════════════════════════════════════ */}
      <div style={S.sec}>
        <span style={S.tag}>Production NLP — the real workflow</span>
        <h2 style={S.h2}>Fine-tuning a pretrained Transformer — Stripe payment dispute classification</h2>

        <p style={S.p}>
          In production, nobody trains a Transformer from scratch for NLP tasks.
          You take a pretrained model (BERT, RoBERTa, DistilBERT) that has
          already learned language from billions of tokens, add a small
          task-specific head, and fine-tune on your labelled data.
          Stripe classifies payment dispute reasons — fraudulent charge,
          service not received, wrong amount — from customer-submitted text.
          A fine-tuned DistilBERT achieves near-human accuracy with
          1,000 labelled examples in minutes of fine-tuning.
        </p>

        <CodeBlock code={`import torch
import torch.nn as nn
import torch.optim as optim
import numpy as np
from torch.utils.data import Dataset, DataLoader
import warnings
warnings.filterwarnings('ignore')

torch.manual_seed(42)
np.random.seed(42)

# ── Simulate Stripe dispute classification ───────────────────────────
# In production: use HuggingFace transformers
# pip install transformers
# from transformers import DistilBertTokenizer, DistilBertForSequenceClassification

# Here: demonstrate the fine-tuning pattern with a minimal Transformer
DISPUTE_CLASSES = [
    'fraudulent_charge',
    'service_not_received',
    'wrong_amount',
    'duplicate_charge',
]
N_CLASSES = len(DISPUTE_CLASSES)
VOCAB_SIZE = 500
MAX_LEN    = 32

class DisputeDataset(Dataset):
    def __init__(self, n=800):
        np.random.seed(42)
        self.labels   = np.random.randint(0, N_CLASSES, n)
        # Each class: different vocabulary distribution (simulates real text)
        self.sequences = []
        for label in self.labels:
            seq = np.random.randint(1, VOCAB_SIZE, MAX_LEN)
            # Add class-specific signal to first 5 tokens
            seq[:5] = label * 50 + np.random.randint(1, 50, 5)
            self.sequences.append(seq)

    def __len__(self): return len(self.labels)

    def __getitem__(self, i):
        return (
            torch.LongTensor(self.sequences[i]),
            self.labels[i],
        )

train_ds = DisputeDataset(640)
val_ds   = DisputeDataset(160)
train_ld = DataLoader(train_ds, batch_size=32, shuffle=True)
val_ld   = DataLoader(val_ds,   batch_size=32)

# ── BERT-style classifier — encoder + [CLS] token classification head ──
class BERTClassifier(nn.Module):
    """
    BERT uses a special [CLS] token prepended to every input.
    The final hidden state of [CLS] is used for classification.
    It aggregates information from the entire sequence via attention.
    """
    def __init__(self, vocab_size=VOCAB_SIZE, d_model=64, n_heads=4,
                 n_layers=2, n_classes=N_CLASSES, dropout=0.1):
        super().__init__()
        self.embedding = nn.Embedding(vocab_size + 1, d_model, padding_idx=0)
        self.pos_emb   = nn.Embedding(MAX_LEN + 1, d_model)
        self.layers    = nn.ModuleList([
            self._make_block(d_model, n_heads, dropout)
            for _ in range(n_layers)
        ])
        self.norm      = nn.LayerNorm(d_model)
        # Classification head — applied to [CLS] token representation
        self.classifier = nn.Sequential(
            nn.Linear(d_model, d_model),
            nn.GELU(),
            nn.Dropout(dropout),
            nn.Linear(d_model, n_classes),
        )
        self.cls_token = nn.Parameter(torch.randn(1, 1, d_model))

    def _make_block(self, d_model, n_heads, dropout):
        return nn.ModuleDict({
            'attn':  nn.MultiheadAttention(d_model, n_heads,
                         dropout=dropout, batch_first=True),
            'ff':    nn.Sequential(
                         nn.Linear(d_model, d_model*4), nn.GELU(),
                         nn.Dropout(dropout), nn.Linear(d_model*4, d_model)),
            'norm1': nn.LayerNorm(d_model),
            'norm2': nn.LayerNorm(d_model),
            'drop':  nn.Dropout(dropout),
        })

    def forward(self, x):
        B, T  = x.shape
        tok   = self.embedding(x)
        pos   = self.pos_emb(torch.arange(T, device=x.device))
        x_emb = tok + pos

        # Prepend [CLS] token
        cls   = self.cls_token.expand(B, -1, -1)
        x_emb = torch.cat([cls, x_emb], dim=1)   # (B, T+1, d)

        h = x_emb
        for block in self.layers:
            n   = block['norm1'](h)
            a, _ = block['attn'](n, n, n)
            h   = h + block['drop'](a)
            h   = h + block['drop'](block['ff'](block['norm2'](h)))
        h = self.norm(h)

        # Use [CLS] token (position 0) for classification
        cls_repr = h[:, 0, :]
        return self.classifier(cls_repr)

model     = BERTClassifier()
criterion = nn.CrossEntropyLoss()
optimizer = optim.AdamW(model.parameters(), lr=2e-4, weight_decay=0.01)
scheduler = optim.lr_scheduler.CosineAnnealingLR(optimizer, T_max=20)

print("Fine-tuning BERT-style classifier on Stripe disputes:")
print(f"{'Epoch':>6} {'Loss':>10} {'Val acc':>10}")
print("─" * 30)

for epoch in range(1, 21):
    model.train()
    total_loss = 0
    for Xb, yb in train_ld:
        optimizer.zero_grad()
        loss = criterion(model(Xb), yb)
        loss.backward()
        nn.utils.clip_grad_norm_(model.parameters(), 1.0)
        optimizer.step()
        total_loss += loss.item()
    scheduler.step()

    if epoch % 4 == 0:
        model.eval()
        correct = 0
        with torch.no_grad():
            for Xb, yb in val_ld:
                correct += (model(Xb).argmax(1) == yb).sum().item()
        acc = correct / len(val_ds)
        print(f"  {epoch:>4}  {total_loss/len(train_ld):>10.4f}  {acc:>10.4f}")`} />
      </div>

      <Div />

      {/* ══ SECTION 7 — ERRORS ═════════════════════════════════════════════════ */}
      <div style={S.sec}>
        <span style={S.tag}>Errors you will hit</span>
        <h2 style={S.h2}>Every common Transformer mistake — explained and fixed</h2>

        <ErrorBlock
          error="Attention weights are all equal (uniform) — model learns nothing from attention"
          cause="The Q and K projections are initialised identically or the dot products are all the same value. Happens when all token embeddings are initialised to the same value (e.g. all zeros or all the same random seed), making Q @ K.T a matrix of identical values. Softmax of identical values is uniform — 1/seq_len for every position. The attention mechanism provides no signal."
          fix="Ensure token embeddings are randomly initialised with different values per token. Check nn.Embedding is initialised with the default normal distribution, not zeros. Verify that Wq and Wk are initialised differently — use separate parameter tensors. Add a small amount of noise to break symmetry if needed. Also check that you are not accidentally tying Q and K weights."
        />

        <ErrorBlock
          error="RuntimeError: The shape of the attn_mask is wrong — expected (seq, seq) got (batch, seq, seq)"
          cause="PyTorch's nn.MultiheadAttention expects attn_mask of shape (seq_len, seq_len) for the causal mask, not (batch, seq_len, seq_len). The mask is broadcast across the batch. Passing a batch-dimension mask causes a shape mismatch. Also: the key_padding_mask (for padding tokens) is (batch, seq_len) — different from attn_mask and used differently."
          fix="For causal masking pass attn_mask of shape (seq_len, seq_len): causal = torch.triu(torch.ones(T, T), diagonal=1).bool(). For padding masking pass key_padding_mask of shape (batch, seq_len) with True where tokens are padding. Never pass a 3D tensor to attn_mask — it will be interpreted as a per-head mask which requires shape (batch×heads, seq, seq)."
        />

        <ErrorBlock
          error="Loss is stuck at log(vocab_size) — model predicts uniform distribution over vocabulary"
          cause="Weight tying between the embedding and the lm_head (output projection) is initialised in a way that causes the logits to be all-zero, producing uniform softmax. Also happens when learning rate is too high — the Transformer diverges immediately and collapses to predicting the uniform distribution. Or positional encodings are missing — without position information, every token looks identical and the model cannot learn sequential patterns."
          fix="Use a warmup learning rate schedule — start at 0 and linearly increase to target lr over the first 100–1000 steps. Verify positional encodings are being added: print (x + pos_enc(x)).std() — should be larger than x.std() alone. Check weight tying is correct: lm_head.weight = token_embedding.weight (share the same tensor). Reduce learning rate to 1e-4 or lower."
        />

        <ErrorBlock
          error="CUDA out of memory with long sequences — quadratic memory in seq_len"
          cause="Self-attention computes a (batch, heads, seq_len, seq_len) attention matrix. Memory scales as O(seq_len²). For seq_len=4096 with batch=8 and 8 heads in float32: 8 × 8 × 4096 × 4096 × 4 bytes = 4GB just for the attention matrix — before activations, weights, or gradients."
          fix="Reduce batch size or sequence length. Use gradient checkpointing: torch.utils.checkpoint.checkpoint(block, x) — recomputes activations during backward instead of storing them, trading compute for memory. Use Flash Attention (pip install flash-attn) — an exact attention algorithm that is O(seq_len) in memory by tiling. For inference only, use torch.backends.cuda.enable_flash_sdp(True) in PyTorch 2.0+."
        />
      </div>

      <Div />

      {/* ══ SECTION 8 — WHAT'S NEXT ════════════════════════════════════════════ */}
      <div style={{ paddingBottom: 48, paddingTop: 8 }}>
        <span style={S.tag}>What comes next</span>
        <h2 style={S.h2}>
          The Deep Learning section is complete. Section 8 — NLP — begins next.
        </h2>

        <p style={S.p}>
          You have now completed the full Deep Learning section:
          neural networks from scratch, backpropagation, activation and loss functions,
          optimisers, batch normalisation and dropout, CNNs, RNNs and LSTMs,
          and Transformers. You can build, train, and debug any standard
          deep learning architecture from first principles.
        </p>

        <p style={S.p}>
          Section 8 — NLP — goes deeper into language-specific techniques:
          tokenisation, embeddings, fine-tuning large pretrained models with
          HuggingFace, retrieval-augmented generation, and building
          production NLP pipelines. Everything builds on the Transformer
          architecture you just learned.
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
              Next — Section 8 · NLP
            </div>
            <div style={{
              fontSize: 15, fontWeight: 700, color: 'var(--text)',
              fontFamily: 'var(--font-display)', letterSpacing: '-0.3px',
            }}>
              Tokenisation and Word Embeddings
            </div>
            <p style={{ ...S.ps, marginBottom: 0, marginTop: 4 }}>
              BPE, WordPiece, SentencePiece — how text becomes numbers.
              Word2Vec, GloVe, and contextual embeddings from BERT.
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
          'Self-attention processes every token in relation to every other token simultaneously — no sequential bottleneck. For each token it computes Q (what am I looking for?), K (what do I contain?), and V (what do I provide?). Attention(Q,K,V) = softmax(QKᵀ/√dₖ)V. The result is a weighted sum of values where weights reflect token relevance.',
          'Scaling by √dₖ is essential. Without it, large d_k produces large dot products that push softmax into saturation — attention weights become one-hot and gradients vanish. Dividing by √dₖ keeps variance stable regardless of d_k.',
          'Multi-head attention runs h attention heads in parallel, each with separate Wq, Wk, Wv projections. Each head specialises in a different relationship type — syntactic, semantic, positional. Outputs are concatenated and projected back to d_model. Total parameters are the same as one large head.',
          'A Transformer encoder block: LayerNorm → Multi-head self-attention → residual → LayerNorm → Feed-forward (Linear→GELU→Linear) → residual. Residual connections allow gradients to flow through very deep stacks. Pre-LN (normalise before sub-layer) is more stable than the original Post-LN.',
          'BERT (encoder-only): bidirectional attention, pretrained with masked language modelling, fine-tuned for understanding tasks. GPT (decoder-only): causal attention mask prevents attending to future tokens, pretrained with next-token prediction, used for generation. The causal mask is the only architectural difference.',
          'In production never train a Transformer from scratch for NLP. Use HuggingFace pretrained models (DistilBERT, RoBERTa, LLaMA). Add a task-specific head, fine-tune with AdamW at lr=2e-5, warmup for 6% of steps. Self-attention memory scales as O(seq_len²) — use gradient checkpointing or Flash Attention for long sequences.',
        ]}
      />
    </LearnLayout>
  )
}