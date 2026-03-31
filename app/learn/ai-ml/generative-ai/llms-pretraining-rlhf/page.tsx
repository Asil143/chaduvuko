import type { Metadata } from 'next'
import { LearnLayout } from '@/components/content/LearnLayout'
import { Callout } from '@/components/content/Callout'
import { KeyTakeaways } from '@/components/content/KeyTakeaways'
import MLPageHeader from '@/components/content/MLPageHeader'

export const metadata: Metadata = {
  title: 'LLMs — Pretraining, RLHF, and Scaling Laws — Chaduvuko',
  description:
    'How GPT, Claude, and Gemini are built. Next-token prediction at scale, RLHF alignment, DPO, instruction tuning, and the laws that predict capability from compute.',
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

export default function LLMsPretrainingRLHFPage() {
  return (
    <LearnLayout
      title="LLMs — Pretraining, RLHF, and Scaling Laws"
      description="How GPT, Claude, and Gemini are built. Next-token prediction at scale, RLHF alignment, DPO, instruction tuning, and the laws that predict capability from compute."
      section="Generative AI"
      readTime="50–55 min"
      updatedAt="March 2026"
    >
      <MLPageHeader section="generative-ai" topic="llms-pretraining-rlhf" />

      {/* ══ SECTION 1 — PLAIN ENGLISH ══════════════════════════════════════════ */}
      <div style={S.sec}>
        <span style={S.tag}>Before any math — what an LLM actually is</span>
        <h2 style={S.h2}>
          An LLM is a Transformer trained on hundreds of billions of tokens
          to predict the next word. That one objective — predict what comes next —
          turns out to be sufficient to learn reasoning, coding, translation,
          and every other language task ever attempted.
        </h2>

        <p style={S.p}>
          Module 48 covered the Transformer architecture — attention, positional
          encoding, encoder-decoder. LLMs use only the decoder half
          (or a modified encoder-only variant for BERT).
          GPT, LLaMA, Mistral, and Gemini are all decoder-only Transformers.
          The key difference from what you built in Module 48:
          scale. GPT-3 has 175 billion parameters trained on 300 billion tokens
          using thousands of A100 GPUs over months. LLaMA-3-70B has 70 billion
          parameters trained on 15 trillion tokens.
          Scale changes everything — capabilities emerge that were completely
          absent at smaller scales and were never explicitly trained.
        </p>

        <p style={S.p}>
          But pretraining alone produces a model that completes text in the style
          of its training data — helpful for some tasks, dangerous for others.
          A pretrained GPT asked "how do I make a bomb?" will helpfully
          complete the sentence if such text appeared in its training data.
          Alignment — the process of making LLMs helpful, harmless, and honest —
          requires three additional stages: supervised fine-tuning (SFT),
          reinforcement learning from human feedback (RLHF), and increasingly
          direct preference optimisation (DPO).
        </p>

        <AnalogyBox>
          <p style={{ ...S.p, marginBottom: 8 }}>
            Pretraining is like a person reading every book, article, and website
            ever written. They become extraordinarily knowledgeable about language
            and the world. But they have no manners, no values, and no sense
            of what is helpful vs harmful — they just know what typically follows
            what in text. Alignment is giving them social training, teaching
            them to be genuinely helpful, and giving them the judgment to
            refuse harmful requests.
          </p>
          <p style={{ ...S.ps, marginBottom: 0, color: '#00e676' }}>
            The insight from OpenAI's InstructGPT paper (2022): a 1.3B parameter
            model fine-tuned with RLHF was preferred by human raters over
            a raw 175B GPT-3. Alignment is more important than raw scale
            for user-facing applications.
          </p>
        </AnalogyBox>
      </div>

      <Div />

      {/* ══ SECTION 2 — PRETRAINING ═════════════════════════════════════════════ */}
      <div style={S.sec}>
        <span style={S.tag}>Stage 1 — pretraining</span>
        <h2 style={S.h2}>Next-token prediction at scale — the only pretraining objective</h2>

        <p style={S.p}>
          The pretraining objective is next-token prediction (causal language modelling).
          Given a sequence of tokens [t₁, t₂, …, t_n], the model predicts t_{'i+1'}
          given [t₁, …, t_i] for every position simultaneously.
          The loss is cross-entropy averaged over all token predictions.
          This objective is self-supervised — no human labels required.
          Any text on the internet is valid training data.
        </p>

        <ConceptBox title="Autoregressive pretraining — teacher forcing">
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: 12, lineHeight: 2.2 }}>
            <div style={{ color: '#888', marginBottom: 6, fontSize: 11 }}>Input sequence:</div>
            <div style={{ color: '#378ADD', paddingLeft: 12, marginBottom: 8 }}>
              ["Razorpay", "processes", "payments", "for", "Indian"]
            </div>
            <div style={{ color: '#888', marginBottom: 6, fontSize: 11 }}>Targets (shift by 1):</div>
            <div style={{ color: '#1D9E75', paddingLeft: 12, marginBottom: 8 }}>
              ["processes", "payments", "for", "Indian", "merchants"]
            </div>
            <div style={{ color: '#888', marginBottom: 6, fontSize: 11 }}>Loss at each position:</div>
            <div style={{ color: '#7b61ff', paddingLeft: 12, marginBottom: 4 }}>
              −log P("processes" | "Razorpay")
            </div>
            <div style={{ color: '#7b61ff', paddingLeft: 12, marginBottom: 4 }}>
              −log P("payments" | "Razorpay processes")
            </div>
            <div style={{ color: '#7b61ff', paddingLeft: 12, marginBottom: 8 }}>
              −log P("merchants" | "Razorpay processes payments for Indian")
            </div>
            <div style={{ fontSize: 11, color: 'var(--muted)' }}>
              Total loss = mean of all position losses.
              Causal mask ensures position i only attends to positions ≤ i.
            </div>
          </div>
        </ConceptBox>

        <CodeBlock code={`import torch
import torch.nn as nn
import torch.nn.functional as F
import numpy as np

# ── Minimal GPT-style decoder-only Transformer ────────────────────────
class CausalSelfAttention(nn.Module):
    """Multi-head self-attention with causal (left-to-right) masking."""
    def __init__(self, d_model: int, n_heads: int, max_seq: int = 512):
        super().__init__()
        assert d_model % n_heads == 0
        self.n_heads = n_heads
        self.d_head  = d_model // n_heads
        self.qkv     = nn.Linear(d_model, 3 * d_model)
        self.proj    = nn.Linear(d_model, d_model)

        # Causal mask — lower triangular, registered as buffer (not parameter)
        mask = torch.tril(torch.ones(max_seq, max_seq))
        self.register_buffer('mask', mask.view(1, 1, max_seq, max_seq))

    def forward(self, x):
        B, T, C = x.shape
        qkv = self.qkv(x).chunk(3, dim=-1)
        q, k, v = [t.view(B, T, self.n_heads, self.d_head).transpose(1, 2)
                    for t in qkv]                     # (B, H, T, d_head)

        scale   = self.d_head ** -0.5
        scores  = (q @ k.transpose(-2, -1)) * scale  # (B, H, T, T)
        # Apply causal mask — positions cannot attend to future positions
        scores  = scores.masked_fill(self.mask[:, :, :T, :T] == 0, float('-inf'))
        attn    = F.softmax(scores, dim=-1)
        out     = (attn @ v).transpose(1, 2).reshape(B, T, C)
        return self.proj(out)

class TransformerBlock(nn.Module):
    def __init__(self, d_model: int, n_heads: int, ffn_mult: int = 4):
        super().__init__()
        self.attn    = CausalSelfAttention(d_model, n_heads)
        self.ffn     = nn.Sequential(
            nn.Linear(d_model, d_model * ffn_mult),
            nn.GELU(),
            nn.Linear(d_model * ffn_mult, d_model),
        )
        self.ln1 = nn.LayerNorm(d_model)
        self.ln2 = nn.LayerNorm(d_model)

    def forward(self, x):
        x = x + self.attn(self.ln1(x))   # pre-norm (GPT-2 style)
        x = x + self.ffn(self.ln2(x))
        return x

class MiniGPT(nn.Module):
    def __init__(self, vocab_size: int, d_model: int, n_layers: int,
                  n_heads: int, max_seq: int = 512):
        super().__init__()
        self.token_emb = nn.Embedding(vocab_size, d_model)
        self.pos_emb   = nn.Embedding(max_seq, d_model)
        self.blocks    = nn.ModuleList([
            TransformerBlock(d_model, n_heads) for _ in range(n_layers)
        ])
        self.ln_final  = nn.LayerNorm(d_model)
        self.lm_head   = nn.Linear(d_model, vocab_size, bias=False)

        # Weight tying: input and output embeddings share weights (saves params)
        self.lm_head.weight = self.token_emb.weight

        # Initialise weights
        self.apply(self._init_weights)

    def _init_weights(self, module):
        if isinstance(module, nn.Linear):
            nn.init.normal_(module.weight, std=0.02)
            if module.bias is not None:
                nn.init.zeros_(module.bias)
        elif isinstance(module, nn.Embedding):
            nn.init.normal_(module.weight, std=0.02)

    def forward(self, tokens: torch.Tensor, targets: torch.Tensor = None):
        B, T = tokens.shape
        pos  = torch.arange(T, device=tokens.device)

        x    = self.token_emb(tokens) + self.pos_emb(pos)
        for block in self.blocks:
            x = block(x)
        x    = self.ln_final(x)
        logits = self.lm_head(x)   # (B, T, vocab_size)

        loss = None
        if targets is not None:
            # Shift: predict token i+1 from token i
            loss = F.cross_entropy(
                logits[:, :-1].reshape(-1, logits.size(-1)),
                targets[:, 1:].reshape(-1),
                ignore_index=-1,
            )
        return logits, loss

    @torch.no_grad()
    def generate(self, prompt: torch.Tensor, max_new: int = 50,
                  temperature: float = 0.8, top_k: int = 40) -> torch.Tensor:
        """Autoregressive generation — sample one token at a time."""
        for _ in range(max_new):
            # Crop to max context window
            ctx    = prompt[:, -512:]
            logits, _ = self(ctx)
            logits = logits[:, -1, :] / temperature   # last token only

            # Top-k sampling
            if top_k:
                v, _ = torch.topk(logits, top_k)
                logits[logits < v[:, -1:]] = -float('inf')

            probs  = F.softmax(logits, dim=-1)
            next_t = torch.multinomial(probs, num_samples=1)
            prompt = torch.cat([prompt, next_t], dim=1)
        return prompt

# ── Shape and parameter check ─────────────────────────────────────────
VOCAB  = 50257   # GPT-2 vocabulary size
model  = MiniGPT(vocab_size=VOCAB, d_model=256, n_layers=4,
                  n_heads=8, max_seq=512)

tokens  = torch.randint(0, VOCAB, (2, 128))
targets = tokens.clone()
logits, loss = model(tokens, targets)

params = sum(p.numel() for p in model.parameters())
print(f"MiniGPT (4 layers, d=256):")
print(f"  Parameters: {params:,}")
print(f"  Logits:     {tuple(logits.shape)}")
print(f"  Loss:       {loss.item():.4f}  (random init ≈ log({VOCAB}) = {np.log(VOCAB):.2f})")
print(f"\nReal LLM parameter counts:")
for name, p in [('GPT-2',125e6),('GPT-3',175e9),('LLaMA-3-8B',8e9),
                 ('LLaMA-3-70B',70e9),('GPT-4 (est)',~1e12)]:
    print(f"  {name:<20}: {p/1e9:.1f}B parameters")`} />
      </div>

      <Div />

      {/* ══ SECTION 3 — SCALING LAWS ════════════════════════════════════════════ */}
      <div style={S.sec}>
        <span style={S.tag}>Chinchilla scaling laws</span>
        <h2 style={S.h2}>How much compute, how many parameters, how much data — the laws that answer all three</h2>

        <p style={S.p}>
          Kaplan et al. (2020) discovered that LLM loss follows power laws
          with respect to model size N, dataset size D, and compute budget C.
          These scaling laws make LLM development predictable —
          you can forecast the loss of a model before training it.
          Hoffmann et al. (2022) refined these laws with Chinchilla:
          for a fixed compute budget, the optimal strategy is to train
          a smaller model on more tokens, not a larger model on fewer tokens.
          The rule: N_opt ≈ D_opt / 20 — use 20 tokens per parameter.
        </p>

        <VisualBox label="Chinchilla scaling laws — optimal model size vs compute budget">
          <div style={{ overflowX: 'auto' as const }}>
            <table style={{ borderCollapse: 'collapse' as const, width: '100%', fontSize: 12 }}>
              <thead>
                <tr style={{ borderBottom: '1px solid var(--border)' }}>
                  {['Compute budget', 'Optimal params', 'Optimal tokens', 'Example model', 'Tokens/param'].map(h => (
                    <th key={h} style={{
                      padding: '8px 12px', textAlign: 'left' as const,
                      fontSize: 10, fontWeight: 700, color: 'var(--muted)',
                      fontFamily: 'var(--font-mono)',
                    }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {[
                  ['1e20 FLOPs', '400M', '8B', 'GPT-2-like', 20, '#888'],
                  ['1e21 FLOPs', '1.4B', '28B', 'GPT-3-small', 20, '#378ADD'],
                  ['1e22 FLOPs', '6.7B', '134B', 'Chinchilla', 20, '#1D9E75'],
                  ['1e23 FLOPs', '70B', '1.4T', 'LLaMA-2-70B', 20, '#7b61ff'],
                  ['1e24 FLOPs', '400B', '8T', 'GPT-4 scale', 20, '#D85A30'],
                ].map((row, i) => (
                  <tr key={i} style={{ borderBottom: '1px solid var(--border)' }}>
                    {row.slice(0, 5).map((cell, j) => (
                      <td key={j} style={{
                        padding: '7px 12px',
                        color: j === 0 ? row[5] as string : j === 3 ? row[5] as string : 'var(--muted)',
                        fontFamily: j < 4 ? 'var(--font-mono)' : 'inherit',
                        fontSize: 12,
                      }}>
                        {cell}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p style={{ ...S.ps, marginBottom: 0, marginTop: 10, fontSize: 11 }}>
            Chinchilla rule: optimal tokens ≈ 20 × parameters.
            GPT-3 (175B params, 300B tokens) was undertrained by this rule —
            it should have used 3.5 trillion tokens.
            LLaMA-3-8B (8B params, 15T tokens) massively over-trains by token count
            for inference efficiency — smaller model, more tokens.
          </p>
        </VisualBox>

        <CodeBlock code={`import numpy as np

# ── Chinchilla scaling law prediction ────────────────────────────────
def chinchilla_optimal(compute_flops: float) -> dict:
    """
    Predict optimal model size and token count for a compute budget.
    From Hoffmann et al. 2022 (Chinchilla paper).
    C ≈ 6 × N × D  (one forward + backward ≈ 6× forward FLOPs)
    Optimal: N_opt = (C / 6 / 20)^0.5, D_opt = 20 × N_opt
    """
    # Derived from Chinchilla power law coefficients
    N_opt = (compute_flops / 6 / 20) ** 0.5
    D_opt = 20 * N_opt
    return {'params': N_opt, 'tokens': D_opt, 'compute': compute_flops}

print("Chinchilla optimal allocations:")
print(f"{'Compute (FLOPs)':>18} {'Optimal params':>16} {'Optimal tokens':>16}")
print("─" * 52)
for log_c in [20, 21, 22, 23, 24]:
    c = 10 ** log_c
    r = chinchilla_optimal(c)
    def fmt(n):
        if n >= 1e12: return f"{n/1e12:.1f}T"
        if n >= 1e9:  return f"{n/1e9:.1f}B"
        if n >= 1e6:  return f"{n/1e6:.0f}M"
        return f"{n:.0f}"
    print(f"  1e{log_c}              {fmt(r['params']):>16} {fmt(r['tokens']):>16}")

# ── Loss prediction from scaling laws ────────────────────────────────
def predict_loss(N: float, D: float) -> float:
    """
    Chinchilla loss prediction:
    L(N, D) = E + A/N^α + B/D^β
    E=1.69 (irreducible loss), A=406.4, B=410.7, α=0.34, β=0.28
    """
    E, A, B, alpha, beta = 1.69, 406.4, 410.7, 0.34, 0.28
    return E + A / N**alpha + B / D**beta

print(f"\nLoss predictions for different training regimes:")
configs = [
    ('GPT-2 (125M, 10B tokens)',       125e6, 10e9),
    ('GPT-3 (175B, 300B tokens)',       175e9, 300e9),
    ('Chinchilla (70B, 1.4T tokens)',   70e9,  1.4e12),
    ('LLaMA-3-8B (8B, 15T tokens)',     8e9,   15e12),
    ('LLaMA-3-70B (70B, 15T tokens)',   70e9,  15e12),
]
print(f"  {'Config':<40} {'Loss':>8}  {'Perplexity':>12}")
print("  " + "─" * 62)
for name, N, D in configs:
    loss = predict_loss(N, D)
    ppl  = np.exp(loss)
    print(f"  {name:<40} {loss:>8.3f}  {ppl:>12.1f}")`} />
      </div>

      <Div />

      {/* ══ SECTION 4 — SFT AND RLHF ════════════════════════════════════════════ */}
      <div style={S.sec}>
        <span style={S.tag}>Stage 2 and 3 — alignment</span>
        <h2 style={S.h2}>SFT then RLHF — turning a text predictor into a helpful assistant</h2>

        <p style={S.p}>
          After pretraining, the model completes text but does not follow
          instructions. Supervised Fine-Tuning (SFT) is the first alignment
          step: fine-tune the pretrained model on a dataset of high-quality
          (prompt, response) pairs written or curated by humans.
          Typically 10,000–100,000 examples. This teaches the model
          to respond to instructions rather than just complete text.
          But SFT only teaches the model to imitate — it cannot teach
          the nuanced human preferences about what makes a response
          helpful, honest, and harmless.
        </p>

        <p style={S.p}>
          RLHF (Reinforcement Learning from Human Feedback) goes further.
          Humans compare pairs of model responses and indicate which is better.
          A reward model is trained to predict human preference scores.
          The LLM is then fine-tuned with PPO (Proximal Policy Optimisation)
          to maximise the reward model's score. This is how ChatGPT,
          Claude, and Gemini are aligned — RLHF is what makes them
          feel like helpful assistants rather than text completion engines.
        </p>

        <VisualBox label="Three-stage alignment pipeline — pretraining → SFT → RLHF">
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {[
              {
                stage: 'Stage 1 — Pretraining',
                color: '#378ADD',
                data: 'Trillions of tokens from web/books/code',
                objective: 'Next-token prediction (cross-entropy)',
                result: 'Knows everything, follows no instructions, may be harmful',
                compute: '99% of total training compute',
              },
              {
                stage: 'Stage 2 — Supervised Fine-Tuning (SFT)',
                color: '#1D9E75',
                data: '10k–100k (prompt, ideal response) pairs — human written',
                objective: 'Fine-tune on ideal responses — cross-entropy on responses only',
                result: 'Follows instructions, helpful, still imperfect at nuanced preferences',
                compute: '<1% of total compute, ~1–3 epochs',
              },
              {
                stage: 'Stage 3 — RLHF (Reward Model + PPO)',
                color: '#7b61ff',
                data: '50k–500k human comparisons (response A vs B, which is better)',
                objective: 'Train reward model, then PPO to maximise reward − KL(π||π_SFT)',
                result: 'Helpful, harmless, honest — ChatGPT/Claude quality',
                compute: '~1% of total compute, most engineering complexity',
              },
            ].map((item) => (
              <div key={item.stage} style={{
                background: 'var(--surface)', border: `1px solid ${item.color}25`,
                borderRadius: 8, padding: '12px 14px',
                borderLeft: `4px solid ${item.color}`,
              }}>
                <div style={{ fontSize: 12, fontWeight: 700, color: item.color, marginBottom: 8 }}>
                  {item.stage}
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
                  {[['Data', item.data], ['Objective', item.objective],
                    ['Result', item.result], ['Compute', item.compute]].map(([k, v]) => (
                    <div key={k}>
                      <span style={{ fontSize: 10, fontWeight: 700, color: item.color, fontFamily: 'var(--font-mono)' }}>{k}: </span>
                      <span style={{ fontSize: 11, color: 'var(--muted)' }}>{v}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </VisualBox>

        <CodeBlock code={`import torch
import torch.nn as nn
import torch.nn.functional as F
import torch.optim as optim

# ── Stage 2: SFT — supervised fine-tuning ────────────────────────────
# The key: compute loss only on the response tokens, not the prompt tokens.
# The model already knows how to process prompts from pretraining.
# We only want to train it to produce the target response.

def sft_loss(model, prompt_tokens, response_tokens, pad_id=-1):
    """
    SFT loss: cross-entropy on response tokens only.
    prompt_tokens:   (B, T_prompt)  — the instruction/context
    response_tokens: (B, T_response) — the target response
    """
    # Concatenate prompt + response
    full_seq = torch.cat([prompt_tokens, response_tokens], dim=1)

    logits, _ = model(full_seq)   # (B, T_full, vocab)

    # Only compute loss on response positions
    T_p = prompt_tokens.size(1)
    T_r = response_tokens.size(1)

    # logits at position T_p-1 predicts first response token
    response_logits  = logits[:, T_p-1 : T_p+T_r-1, :]   # (B, T_r, vocab)
    response_targets = response_tokens                      # (B, T_r)

    # Flatten and compute cross-entropy
    loss = F.cross_entropy(
        response_logits.reshape(-1, response_logits.size(-1)),
        response_targets.reshape(-1),
        ignore_index=pad_id,
    )
    return loss

# ── Stage 3a: Reward Model ────────────────────────────────────────────
class RewardModel(nn.Module):
    """
    Takes a (prompt, response) pair and outputs a scalar reward score.
    Trained on human preference comparisons: which response is better?
    Architecture: LLM backbone + linear head predicting scalar reward.
    """
    def __init__(self, d_model: int = 256, vocab_size: int = 50257):
        super().__init__()
        # In practice: initialise from SFT model weights
        self.transformer = nn.TransformerEncoder(
            nn.TransformerEncoderLayer(d_model, 4, batch_first=True),
            num_layers=2,
        )
        self.token_emb = nn.Embedding(vocab_size, d_model)
        self.reward_head = nn.Linear(d_model, 1)   # scalar reward

    def forward(self, tokens):
        x = self.token_emb(tokens)
        x = self.transformer(x)
        # Use last token's representation as the reward signal
        reward = self.reward_head(x[:, -1, :])
        return reward.squeeze(-1)   # (B,)

def reward_model_loss(reward_model, prompt_tokens,
                       chosen_tokens, rejected_tokens):
    """
    Bradley-Terry preference loss:
    Maximise P(chosen > rejected) = sigmoid(r_chosen - r_rejected)
    """
    chosen_full   = torch.cat([prompt_tokens, chosen_tokens], dim=1)
    rejected_full = torch.cat([prompt_tokens, rejected_tokens], dim=1)

    r_chosen   = reward_model(chosen_full)    # scalar
    r_rejected = reward_model(rejected_full)  # scalar

    # Loss = -log sigmoid(r_chosen - r_rejected)
    # Equivalent to: log(1 + exp(r_rejected - r_chosen))
    loss = -F.logsigmoid(r_chosen - r_rejected).mean()
    return loss, r_chosen.mean().item(), r_rejected.mean().item()

# ── Demonstrate reward model training ─────────────────────────────────
rm = RewardModel(d_model=64, vocab_size=1000)
opt = optim.Adam(rm.parameters(), lr=1e-4)

print("Reward model training (preference learning):")
print(f"{'Step':>6} {'Loss':>8} {'r_chosen':>10} {'r_rejected':>12} {'margin':>8}")
print("─" * 48)

for step in range(1, 6):
    # Simulate prompt + chosen/rejected response tokens
    B = 8
    prompt   = torch.randint(0, 1000, (B, 20))
    chosen   = torch.randint(0, 1000, (B, 30))   # "better" response
    rejected = torch.randint(0, 1000, (B, 30))   # "worse" response

    opt.zero_grad()
    loss, rc, rr = reward_model_loss(rm, prompt, chosen, rejected)
    loss.backward()
    opt.step()
    print(f"  {step:>4}  {loss.item():>8.4f}  {rc:>10.4f}  {rr:>12.4f}  {rc-rr:>8.4f}")`} />
      </div>

      <Div />

      {/* ══ SECTION 5 — DPO ═════════════════════════════════════════════════════ */}
      <div style={S.sec}>
        <span style={S.tag}>The simpler alternative</span>
        <h2 style={S.h2}>DPO — Direct Preference Optimisation — RLHF without the RL</h2>

        <p style={S.p}>
          RLHF requires training three models simultaneously — the LLM policy,
          the reward model, and the reference policy — and running PPO,
          a notoriously finicky RL algorithm. Engineering complexity is enormous.
          DPO (Rafailov et al., 2023) derives a closed-form loss that achieves
          the same objective as RLHF without training a reward model or running RL.
          The insight: the optimal RLHF policy has a closed form that can be
          directly optimised with a simple binary cross-entropy loss on
          preference pairs. Most open-source models (LLaMA, Mistral, Phi)
          are now aligned with DPO rather than RLHF because it is far simpler.
        </p>

        <ConceptBox title="DPO loss — the key formula">
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: 12, lineHeight: 2.4 }}>
            <div style={{ color: '#888', marginBottom: 6, fontSize: 11 }}>DPO optimisation objective:</div>
            <div style={{ color: '#7b61ff', paddingLeft: 12, marginBottom: 8 }}>
              L_DPO = −E[log σ(β × (log π(y_w|x)/π_ref(y_w|x) − log π(y_l|x)/π_ref(y_l|x)))]
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 5, fontSize: 11, color: 'var(--muted)', paddingLeft: 12, marginTop: 8 }}>
              <div><span style={{ color: '#1D9E75' }}>y_w</span>  = chosen (winning) response</div>
              <div><span style={{ color: '#ff4757' }}>y_l</span>  = rejected (losing) response</div>
              <div><span style={{ color: '#378ADD' }}>π</span>    = current policy (the model being trained)</div>
              <div><span style={{ color: '#D85A30' }}>π_ref</span>= reference policy (frozen SFT model)</div>
              <div><span style={{ color: '#BA7517' }}>β</span>    = KL penalty coefficient (typically 0.1–0.5)</div>
            </div>
            <div style={{ marginTop: 10, fontSize: 11, color: '#1D9E75' }}>
              Intuition: increase probability of chosen response relative to reference,
              decrease probability of rejected response relative to reference.
            </div>
          </div>
        </ConceptBox>

        <CodeBlock code={`import torch
import torch.nn as nn
import torch.nn.functional as F

def compute_log_probs(model, tokens, labels):
    """
    Compute sum of log probabilities for a sequence of tokens.
    Used to compute log π(y|x) in DPO.
    tokens: (B, T_prompt + T_response)
    labels: (B, T_prompt + T_response) — -100 for prompt tokens (ignored)
    """
    logits, _ = model(tokens)                    # (B, T, vocab)
    # Shift: logit at position i predicts token i+1
    shift_logits = logits[:, :-1, :]             # (B, T-1, vocab)
    shift_labels = labels[:, 1:]                 # (B, T-1)

    # Cross-entropy per token (not reduced)
    log_probs = -F.cross_entropy(
        shift_logits.reshape(-1, shift_logits.size(-1)),
        shift_labels.reshape(-1),
        ignore_index=-100,
        reduction='none',
    ).view(logits.size(0), -1)   # (B, T-1)

    # Sum over response tokens only (prompt tokens have ignore_index=-100)
    return log_probs.sum(dim=-1)  # (B,) — total log prob of response

def dpo_loss(policy_model, reference_model,
              prompt_tokens, chosen_tokens, rejected_tokens,
              beta: float = 0.1):
    """
    DPO loss: direct preference optimisation without RL.
    policy_model:    the model being trained (π)
    reference_model: frozen SFT model (π_ref)
    beta:            KL regularisation strength
    """
    B = prompt_tokens.size(0)

    def build_input(response):
        tokens = torch.cat([prompt_tokens, response], dim=1)
        # Labels: -100 for prompt positions (ignored in loss)
        labels = tokens.clone()
        labels[:, :prompt_tokens.size(1)] = -100
        return tokens, labels

    chosen_input,   chosen_labels   = build_input(chosen_tokens)
    rejected_input, rejected_labels = build_input(rejected_tokens)

    # Compute log probs under policy (trainable)
    policy_chosen_logp   = compute_log_probs(policy_model,
                                               chosen_input,   chosen_labels)
    policy_rejected_logp = compute_log_probs(policy_model,
                                               rejected_input, rejected_labels)

    # Compute log probs under reference (frozen)
    with torch.no_grad():
        ref_chosen_logp   = compute_log_probs(reference_model,
                                               chosen_input,   chosen_labels)
        ref_rejected_logp = compute_log_probs(reference_model,
                                               rejected_input, rejected_labels)

    # DPO implicit reward ratio
    chosen_rewards   = beta * (policy_chosen_logp   - ref_chosen_logp)
    rejected_rewards = beta * (policy_rejected_logp - ref_rejected_logp)

    # DPO loss: -log sigmoid(r_w - r_l)
    loss = -F.logsigmoid(chosen_rewards - rejected_rewards).mean()

    # Metrics for monitoring
    accuracy = (chosen_rewards > rejected_rewards).float().mean()
    margin   = (chosen_rewards - rejected_rewards).mean()

    return loss, accuracy.item(), margin.item()

# ── DPO vs RLHF comparison ────────────────────────────────────────────
print("DPO vs RLHF:")
comparison = [
    ('Models needed',       'LLM + Reward Model + Reference', 'LLM + Reference (frozen)'),
    ('Training algorithm',  'PPO (complex, unstable)',         'Simple BCE loss'),
    ('Data format',         'Scalar rewards per response',     'Preference pairs (A>B)'),
    ('Compute overhead',    '3-4× SFT compute',                '~1.5× SFT compute'),
    ('Engineering effort',  'Very high (PPO tuning)',          'Low (standard training)'),
    ('Alignment quality',   'Slightly better (in theory)',     'Comparable in practice'),
    ('Who uses it',         'OpenAI (GPT-4), Anthropic early', 'Meta (LLaMA), Mistral, Phi'),
]
print(f"  {'Aspect':<25} {'RLHF':>35} {'DPO':>35}")
print("  " + "─" * 95)
for aspect, rlhf, dpo in comparison:
    print(f"  {aspect:<25} {rlhf:>35} {dpo:>35}")`} />
      </div>

      <Div />

      {/* ══ SECTION 6 — INFERENCE ═══════════════════════════════════════════════ */}
      <div style={S.sec}>
        <span style={S.tag}>Running LLMs in production</span>
        <h2 style={S.h2}>Temperature, sampling strategies, and quantisation for deployment</h2>

        <CodeBlock code={`import torch
import torch.nn.functional as F
import numpy as np

# ── Sampling strategies — controlling generation quality vs diversity ──

def greedy_decode(logits):
    """Always pick the highest probability token. Deterministic, repetitive."""
    return logits.argmax(dim=-1)

def temperature_sample(logits, temperature=1.0):
    """
    Divide logits by temperature before softmax.
    temperature < 1: sharper distribution, more conservative/repetitive
    temperature = 1: sample from true model distribution
    temperature > 1: flatter distribution, more random/creative
    """
    scaled = logits / temperature
    probs  = F.softmax(scaled, dim=-1)
    return torch.multinomial(probs, num_samples=1).squeeze(-1)

def top_k_sample(logits, k=50, temperature=1.0):
    """
    Only consider top-k most likely tokens.
    Prevents sampling from the long tail of unlikely tokens.
    k=50 is standard. k=1 is greedy. k=vocab_size is full sampling.
    """
    logits = logits / temperature
    top_k_vals, top_k_idx = torch.topk(logits, k, dim=-1)
    # Mask everything outside top-k
    filtered = torch.full_like(logits, float('-inf'))
    filtered.scatter_(-1, top_k_idx, top_k_vals)
    probs = F.softmax(filtered, dim=-1)
    return torch.multinomial(probs, num_samples=1).squeeze(-1)

def top_p_sample(logits, p=0.9, temperature=1.0):
    """
    Nucleus sampling: keep the smallest set of tokens whose
    cumulative probability exceeds p.
    Adaptive — focuses on fewer tokens for confident predictions.
    p=0.9 is standard. p=1.0 is full sampling.
    """
    logits = logits / temperature
    probs  = F.softmax(logits, dim=-1)
    sorted_probs, sorted_idx = torch.sort(probs, descending=True)
    cumprobs = torch.cumsum(sorted_probs, dim=-1)

    # Remove tokens once cumulative prob exceeds p
    mask = cumprobs - sorted_probs > p
    sorted_probs[mask] = 0.0
    sorted_probs /= sorted_probs.sum(dim=-1, keepdim=True)  # renormalise

    sampled_idx = torch.multinomial(sorted_probs, num_samples=1)
    return sorted_idx.gather(-1, sampled_idx).squeeze(-1)

# ── Demonstrate sampling strategy effects ────────────────────────────
torch.manual_seed(42)
VOCAB_SIZE = 100

# Simulate logits with a peaked distribution
logits = torch.randn(VOCAB_SIZE)
logits[5]  = 5.0   # dominant token
logits[12] = 3.0   # second choice
logits[23] = 2.5   # third choice

print("Sampling strategy comparison (10 samples each):")
strategies = {
    'Greedy':              lambda l: greedy_decode(l.unsqueeze(0)).item(),
    'Temperature=0.5':     lambda l: temperature_sample(l.unsqueeze(0), 0.5).item(),
    'Temperature=1.0':     lambda l: temperature_sample(l.unsqueeze(0), 1.0).item(),
    'Temperature=1.5':     lambda l: temperature_sample(l.unsqueeze(0), 1.5).item(),
    'Top-k (k=10)':        lambda l: top_k_sample(l.unsqueeze(0), k=10).item(),
    'Top-p (p=0.9)':       lambda l: top_p_sample(l.unsqueeze(0), p=0.9).item(),
}
for name, fn in strategies.items():
    samples = [fn(logits.clone()) for _ in range(10)]
    unique  = len(set(samples))
    print(f"  {name:<22}: samples={samples[:6]}  unique={unique}")

# ── Quantisation — running large models on limited hardware ───────────
print("\nQuantisation options for LLM deployment:")
quant_methods = [
    ('fp32 (no quantisation)', '4 bytes/param', '280GB for 70B model',  'Full accuracy',         'Research only'),
    ('fp16 / bf16',            '2 bytes/param', '140GB for 70B model',  '~same accuracy',        'Standard GPU training'),
    ('int8 (bitsandbytes)',    '1 byte/param',  '70GB for 70B model',   '<0.5% degradation',     '2× memory reduction'),
    ('int4 (GPTQ/AWQ)',        '0.5 bytes/param','35GB for 70B model',  '1-2% degradation',      'Consumer GPU inference'),
    ('int4 (llama.cpp)',       '0.5 bytes/param','35GB for 70B model',  '1-2% degradation',      'CPU inference possible'),
    ('2-bit (AQLM)',           '0.25 bytes/param','17.5GB for 70B',     '3-5% degradation',      'Extreme compression'),
]
print(f"  {'Method':<28} {'Size':>14} {'70B VRAM':>16} {'Quality':>18} {'Use case'}")
print("  " + "─" * 100)
for m, sz, vram, qual, use in quant_methods:
    print(f"  {m:<28} {sz:>14} {vram:>16} {qual:>18}  {use}")`} />
      </div>

      <Div />

      {/* ══ SECTION 7 — ERRORS ═════════════════════════════════════════════════ */}
      <div style={S.sec}>
        <span style={S.tag}>Errors you will hit</span>
        <h2 style={S.h2}>Every common LLM mistake — explained and fixed</h2>

        <ErrorBlock
          error="SFT model repeats itself endlessly or outputs degenerate text"
          cause="The model has learned the repetition patterns from SFT data or has overfit. Repetition is the most common failure mode of language model generation. It occurs when the model assigns high probability to repeating the last few tokens — a local minimum that is easy to reach. Also caused by too low temperature or greedy decoding during training evaluation."
          fix="Add a repetition penalty during inference: scale down the logit of any token that has appeared recently by a factor of 1.1–1.3. In HuggingFace: model.generate(repetition_penalty=1.15). Use temperature=0.7–0.9 instead of 0 (greedy) for open-ended generation. For SFT, check that training responses are diverse — if all responses in the SFT dataset follow the same structure, the model will imitate that structure exclusively."
        />

        <ErrorBlock
          error="DPO training: loss decreases but model quality degrades — reward hacking"
          cause="The model learns to maximise the DPO objective without actually becoming more helpful — it finds shortcuts. Common: the model learns to make chosen responses very long (verbosity bias) because human raters tend to prefer longer responses. Or it learns to always agree with the user (sycophancy). The DPO objective maximises preference over the reference model but does not constrain the model to stay similar to the reference."
          fix="Use a higher beta value (0.3–0.5 instead of 0.1) — this increases the KL penalty that keeps the model close to the reference SFT model. Monitor auxiliary metrics beyond DPO loss: benchmark on held-out tasks (MMLU, HumanEval) to catch capability degradation. Mix DPO data with SFT data during training (10-20% SFT) to maintain instruction-following quality. Add length normalisation to the log probabilities to prevent verbosity bias."
        />

        <ErrorBlock
          error="OOM during LLM inference — CUDA out of memory on consumer GPU"
          cause="70B models in fp16 require 140GB VRAM — far beyond any consumer GPU. Even 7B models in fp16 require 14GB — exceeding most RTX 4090s (24GB) when KV-cache is included for long contexts. The KV-cache grows linearly with sequence length: a 7B model with 4K context in fp16 uses 2GB of VRAM just for the cache."
          fix="Use 4-bit quantisation: load model with load_in_4bit=True in bitsandbytes, or use GPTQ/AWQ quantised models from HuggingFace. For CPU inference: use llama.cpp with GGUF format — can run 7B in 4-bit on 8GB RAM, 70B with CPU-GPU split on 24GB VRAM + 32GB RAM. Reduce max context length: set max_new_tokens=512 and use sliding window attention. For production: use vLLM for batched GPU inference with PagedAttention which reduces KV-cache memory by 2-4×."
        />

        <ErrorBlock
          error="Pretrained LLM gives dangerous or harmful outputs — alignment failure"
          cause="A base pretrained model (no SFT, no RLHF/DPO) has no alignment — it will complete any prompt in the style of its training data, including harmful content. Even aligned models can be jailbroken with adversarial prompts that override the alignment training. Alignment is surface-level in current models — it can be overridden by sufficiently clever prompting or partial fine-tuning."
          fix="Never deploy a base pretrained model directly — always use an instruction-tuned and RLHF/DPO-aligned variant. For production: add your own guardrails — a lightweight classifier that screens inputs and outputs for harmful content before serving to users. Use system prompts to reinforce desired behaviour. For sensitive applications (healthcare, finance): use Constitutional AI or custom preference data to add domain-specific alignment on top of general alignment."
        />
      </div>

      <Div />

      {/* ══ SECTION 8 — WHAT'S NEXT ════════════════════════════════════════════ */}
      <div style={{ paddingBottom: 48, paddingTop: 8 }}>
        <span style={S.tag}>What comes next</span>
        <h2 style={S.h2}>
          You understand how LLMs are built and aligned. Next: fine-tune
          one yourself for a specific task.
        </h2>

        <p style={S.p}>
          Module 64 covered the architecture and training pipeline of LLMs
          at a conceptual and code level. Module 65 makes it practical:
          full LoRA fine-tuning walkthrough on a real dataset using HuggingFace
          Transformers and PEFT, including when to fine-tune vs use RAG vs
          prompt engineer, and how to evaluate the result.
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
              Next — Module 65 · Generative AI
            </div>
            <div style={{
              fontSize: 15, fontWeight: 700, color: 'var(--text)',
              fontFamily: 'var(--font-display)', letterSpacing: '-0.3px',
            }}>
              LLM Fine-Tuning in Practice
            </div>
            <p style={{ ...S.ps, marginBottom: 0, marginTop: 4 }}>
              When to fine-tune vs RAG vs prompt. Full LoRA fine-tuning walkthrough
              on a real dataset using HuggingFace Transformers and PEFT.
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
          'LLMs are decoder-only Transformers trained with next-token prediction (causal language modelling). The loss is cross-entropy over every token position. The causal mask ensures position i only attends to positions ≤ i. Weight tying shares the input embedding and output projection matrices — saving parameters.',
          'Chinchilla scaling law: for a fixed compute budget C, the optimal model has N_opt ≈ √(C/120) parameters trained on D_opt ≈ 20×N_opt tokens. GPT-3 was undertrained by this law. LLaMA-3-8B is intentionally over-trained (15T tokens on 8B params) to produce a small model with high inference efficiency.',
          'Three-stage alignment pipeline: pretraining (next-token prediction on trillions of tokens, 99% of compute), SFT (fine-tune on 10k–100k prompt-response pairs, compute loss on response tokens only), RLHF or DPO (align to human preferences using comparison data).',
          'RLHF requires training a reward model on human preference pairs then using PPO to maximise expected reward minus KL penalty from the SFT reference. DPO achieves the same objective with a closed-form loss directly on preference pairs — no reward model, no RL. DPO is now the standard for open-source alignment.',
          'Sampling strategies: greedy (deterministic, repetitive), temperature (scale logits — lower = conservative, higher = creative), top-k (only consider k most likely tokens), top-p/nucleus (keep smallest set summing to probability p). Production default: top-p=0.9 + temperature=0.7.',
          'Quantisation makes large models deployable: fp16 halves memory vs fp32 with identical quality. int8 (bitsandbytes) halves again with <0.5% degradation. int4 (GPTQ/AWQ) halves again with 1-2% degradation — a 70B model fits in 35GB VRAM. For CPU inference: llama.cpp with GGUF format runs 7B models on laptops.',
        ]}
      />
    </LearnLayout>
  )
}
