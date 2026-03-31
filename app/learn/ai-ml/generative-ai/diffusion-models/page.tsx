import type { Metadata } from 'next'
import { LearnLayout } from '@/components/content/LearnLayout'
import { Callout } from '@/components/content/Callout'
import { KeyTakeaways } from '@/components/content/KeyTakeaways'
import MLPageHeader from '@/components/content/MLPageHeader'

export const metadata: Metadata = {
  title: 'Diffusion Models and Stable Diffusion — Chaduvuko',
  description:
    'Forward noise, reverse denoising, DDPM, latent diffusion — how Stable Diffusion generates photorealistic images from text prompts.',
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

export default function DiffusionModelsPage() {
  return (
    <LearnLayout
      title="Diffusion Models and Stable Diffusion"
      description="Forward noise, reverse denoising, DDPM, latent diffusion — how Stable Diffusion generates photorealistic images from text prompts."
      section="Generative AI"
      readTime="45–50 min"
      updatedAt="March 2026"
    >
      <MLPageHeader section="generative-ai" topic="diffusion-models" />

      {/* ══ SECTION 1 — PLAIN ENGLISH ══════════════════════════════════════════ */}
      <div style={S.sec}>
        <span style={S.tag}>Before any math — the core idea</span>
        <h2 style={S.h2}>
          Diffusion models learn one thing: given a slightly noisy image,
          predict the noise that was added. Run this backwards 1000 times
          starting from pure noise and you get a photorealistic image.
        </h2>

        <p style={S.p}>
          GANs generate images in one forward pass — fast but unstable.
          VAEs generate via a compressed latent code — stable but blurry.
          Diffusion models take a third path: learn to reverse a gradual
          noising process. The training objective is deceptively simple —
          take a real image, add a known amount of Gaussian noise,
          ask the model to predict what noise was added.
          Repeat this for every noise level from slightly noisy to pure noise.
          At generation time, start from pure Gaussian noise and
          iteratively denoise, guided by what the model learned.
        </p>

        <p style={S.p}>
          The results are extraordinary — diffusion models produce images
          that are sharper, more diverse, and more faithful to text prompts
          than any previous approach. Stable Diffusion, DALL-E 3, Midjourney,
          and Google Imagen are all diffusion models.
          At Indian startups: Meesho uses Stable Diffusion fine-tuned on
          Indian fashion to generate product variations. Adobe's Firefly
          (used by Indian creative agencies) is diffusion-based.
          Every modern text-to-image system is built on this foundation.
        </p>

        <AnalogyBox>
          <p style={{ ...S.p, marginBottom: 8 }}>
            Teaching someone to restore old damaged photographs.
            You take a pristine photo and progressively scratch it —
            first a tiny scratch, then more, then more, until it is
            completely unrecognisable static. You train a restorer to undo
            each level of damage. After enough practice they can take
            completely random static and restore it step by step
            into a meaningful photograph. The key insight: each restoration
            step is easy — remove a small amount of noise.
            But chaining 1000 easy steps produces something remarkable.
          </p>
          <p style={{ ...S.ps, marginBottom: 0, color: '#00e676' }}>
            The model never needs to generate from nothing.
            It only ever needs to answer: "given this noisy image at this
            noise level, what noise should I remove?" That is a much simpler
            task than "generate a photorealistic image from scratch."
          </p>
        </AnalogyBox>

        <Callout type="tip">
          This module covers DDPM (the foundational algorithm) from scratch,
          then shows practical usage with the Diffusers library.
          Install: <span style={S.code as React.CSSProperties}>pip install diffusers transformers accelerate</span>.
          Running Stable Diffusion requires a GPU with ≥4GB VRAM for fp16
          or can run on CPU slowly.
        </Callout>
      </div>

      <Div />

      {/* ══ SECTION 2 — FORWARD PROCESS ════════════════════════════════════════ */}
      <div style={S.sec}>
        <span style={S.tag}>The forward process</span>
        <h2 style={S.h2}>Adding noise — the Markov chain from image to pure noise</h2>

        <p style={S.p}>
          The forward process is fixed — not learned. It gradually adds
          Gaussian noise to an image over T timesteps (typically T=1000).
          At each timestep t, a small amount of noise is added according to
          a noise schedule β₁, β₂, …, β_T. By timestep T the image is
          indistinguishable from pure Gaussian noise.
          The key mathematical property: you can jump directly to any
          timestep t without simulating all steps sequentially.
          This is what makes training efficient.
        </p>

        <ConceptBox title="Forward process — closed form for any timestep t">
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: 12, lineHeight: 2.4 }}>
            <div style={{ color: '#888', marginBottom: 6, fontSize: 11 }}>Noise schedule:</div>
            <div style={{ color: '#378ADD', paddingLeft: 12, marginBottom: 8 }}>
              β_t ∈ (0, 1)  linearly spaced from β₁=0.0001 to β_T=0.02
            </div>
            <div style={{ color: '#888', marginBottom: 6, fontSize: 11 }}>One step forward:</div>
            <div style={{ color: '#7b61ff', paddingLeft: 12, marginBottom: 8 }}>
              q(x_t | x_{'{t-1}'}) = N(x_t ; √(1−β_t) × x_{'{t-1}'}, β_t × I)
            </div>
            <div style={{ color: '#888', marginBottom: 6, fontSize: 11 }}>Jump to any t directly (closed form):</div>
            <div style={{ color: '#1D9E75', paddingLeft: 12, marginBottom: 4 }}>
              ᾱ_t = ∏(1−β_s) for s=1..t  ← cumulative product
            </div>
            <div style={{ color: '#1D9E75', paddingLeft: 12, marginBottom: 8 }}>
              x_t = √ᾱ_t × x_0 + √(1−ᾱ_t) × ε  where  ε ~ N(0, I)
            </div>
            <div style={{ fontSize: 11, color: 'var(--muted)' }}>
              x_0 = original image  |  ε = pure noise  |  t sampled uniformly during training
            </div>
          </div>
        </ConceptBox>

        <CodeBlock code={`import torch
import numpy as np
import matplotlib
matplotlib.use('Agg')

# ── DDPM noise schedule and forward process ───────────────────────────
class DDPMScheduler:
    """
    Linear noise schedule from Ho et al. 2020.
    Precomputes all coefficients needed for training and sampling.
    """
    def __init__(self, T: int = 1000, beta_start: float = 1e-4,
                  beta_end: float = 0.02):
        self.T = T

        # Linear noise schedule
        self.betas    = torch.linspace(beta_start, beta_end, T)
        self.alphas   = 1.0 - self.betas
        self.alpha_bar = torch.cumprod(self.alphas, dim=0)   # ᾱ_t

        # Precompute useful terms
        self.sqrt_alpha_bar       = torch.sqrt(self.alpha_bar)
        self.sqrt_one_minus_alpha_bar = torch.sqrt(1 - self.alpha_bar)

        # For reverse process
        self.sqrt_recip_alpha     = torch.sqrt(1.0 / self.alphas)
        self.alpha_bar_prev       = torch.cat([torch.tensor([1.0]),
                                                self.alpha_bar[:-1]])
        self.posterior_variance   = (self.betas *
                                      (1 - self.alpha_bar_prev) /
                                      (1 - self.alpha_bar))

    def add_noise(self, x0: torch.Tensor, t: torch.Tensor,
                   noise: torch.Tensor = None):
        """
        Forward process: add noise to x0 at timestep t.
        q(x_t | x_0) = √ᾱ_t × x_0 + √(1−ᾱ_t) × ε
        Returns noisy image and the noise added (training target).
        """
        if noise is None:
            noise = torch.randn_like(x0)

        # Gather coefficients for batch of timesteps
        sqrt_ab    = self.sqrt_alpha_bar[t].view(-1, 1, 1, 1)
        sqrt_1m_ab = self.sqrt_one_minus_alpha_bar[t].view(-1, 1, 1, 1)

        x_t = sqrt_ab * x0 + sqrt_1m_ab * noise
        return x_t, noise

# ── Demonstrate forward process ───────────────────────────────────────
scheduler = DDPMScheduler(T=1000)

# Synthetic "image" — batch of 4, shape (B, C, H, W)
x0 = torch.rand(4, 3, 64, 64) * 2 - 1   # values in [-1, 1]

print("Forward process — noise levels at different timesteps:")
print(f"{'t':>6} {'ᾱ_t':>10} {'SNR (dB)':>10} {'image_std':>12} {'noise_std':>12}")
print("─" * 54)

for t_val in [0, 100, 250, 500, 750, 900, 999]:
    t_tensor = torch.full((4,), t_val, dtype=torch.long)
    x_t, eps = scheduler.add_noise(x0, t_tensor)

    ab    = scheduler.alpha_bar[t_val].item()
    snr   = 10 * np.log10(ab / (1 - ab + 1e-8))
    print(f"  {t_val:>4}  {ab:>10.4f}  {snr:>10.2f}  "
          f"{x_t.std().item():>12.4f}  {eps.std().item():>12.4f}")

print(f"\nAt t=0:   ᾱ≈1 → almost original image")
print(f"At t=500: ᾱ≈0.06 → heavily noised")
print(f"At t=999: ᾱ≈0 → pure Gaussian noise")

# ── Noise schedule comparison ─────────────────────────────────────────
print("\nNoise schedule types:")
schedules = {
    'Linear (DDPM)':   torch.linspace(1e-4, 0.02, 1000),
    'Cosine (DDIM)':   torch.tensor([
        1 - (np.cos((t/1000 + 0.008)/(1 + 0.008) * np.pi/2)**2) /
        (np.cos((0.008/1.008) * np.pi/2)**2)
        for t in range(1000)
    ]).float().clamp(0, 0.999),
}
for name, betas in schedules.items():
    ab_final = torch.cumprod(1 - betas, dim=0)[-1].item()
    print(f"  {name:<20}: β_T={betas[-1]:.4f}  ᾱ_T={ab_final:.6f}")`} />
      </div>

      <Div />

      {/* ══ SECTION 3 — THE DENOISING NETWORK ══════════════════════════════════ */}
      <div style={S.sec}>
        <span style={S.tag}>What the model learns</span>
        <h2 style={S.h2}>The U-Net denoiser — predict the noise, not the image</h2>

        <p style={S.p}>
          The learnable part of a diffusion model is a neural network
          that takes a noisy image x_t and a timestep t as input,
          and predicts the noise ε that was added.
          The architecture is a U-Net with time conditioning —
          the timestep t is embedded into a sinusoidal positional encoding
          and injected into every residual block via addition or
          cross-attention. The network must learn to denoise differently
          for each noise level — removing a tiny amount of noise at t=10
          is very different from recovering structure at t=900.
        </p>

        <VisualBox label="U-Net denoiser — timestep conditioning at every level">
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {[
              { block: 'Time embedding', detail: 't → sinusoidal encoding → MLP → time_emb (dim=256)', color: '#D85A30' },
              { block: 'Input Conv', detail: 'x_t (B,3,H,W) → (B,64,H,W)', color: '#888' },
              { block: 'ResBlock + time_emb', detail: '(B,64,H,W) → (B,64,H,W)  |  time_emb injected by addition', color: '#378ADD' },
              { block: 'Downsample × 3', detail: 'H→H/2→H/4→H/8  |  channels: 64→128→256→512', color: '#378ADD' },
              { block: 'Bottleneck + Self-Attention', detail: '(B,512,H/8,W/8)  |  global context', color: '#7b61ff' },
              { block: 'Upsample × 3 + Skip Connections', detail: 'H/8→H/4→H/2→H  |  concat encoder features', color: '#1D9E75' },
              { block: 'Output Conv', detail: '(B,64,H,W) → (B,3,H,W)  |  predicted noise ε̂', color: '#888' },
            ].map((item, i) => (
              <div key={i} style={{
                display: 'grid', gridTemplateColumns: '220px 1fr',
                gap: 10, background: 'var(--surface)',
                borderRadius: 5, padding: '7px 10px',
                border: `1px solid ${item.color}20`,
                borderLeft: `3px solid ${item.color}`,
              }}>
                <span style={{ fontSize: 11, fontWeight: 700, color: item.color }}>{item.block}</span>
                <span style={{ fontSize: 11, color: 'var(--muted)' }}>{item.detail}</span>
              </div>
            ))}
          </div>
        </VisualBox>

        <CodeBlock code={`import torch
import torch.nn as nn
import math

# ── Sinusoidal timestep embedding ─────────────────────────────────────
class SinusoidalTimeEmbedding(nn.Module):
    """
    Converts integer timestep t into a continuous embedding.
    Same approach as positional encoding in Transformers.
    Allows the model to distinguish noise levels.
    """
    def __init__(self, dim: int):
        super().__init__()
        self.dim = dim

    def forward(self, t: torch.Tensor) -> torch.Tensor:
        device   = t.device
        half_dim = self.dim // 2
        emb      = math.log(10000) / (half_dim - 1)
        emb      = torch.exp(torch.arange(half_dim, device=device) * -emb)
        emb      = t.float()[:, None] * emb[None, :]    # (B, half_dim)
        emb      = torch.cat([emb.sin(), emb.cos()], dim=1)  # (B, dim)
        return emb

# ── Residual block with time conditioning ────────────────────────────
class ResBlockTime(nn.Module):
    """
    ResNet block that takes both image features and time embedding.
    Time embedding is added to the feature map after first conv.
    """
    def __init__(self, in_ch: int, out_ch: int, time_dim: int):
        super().__init__()
        self.conv1    = nn.Sequential(
            nn.GroupNorm(8, in_ch), nn.SiLU(),
            nn.Conv2d(in_ch, out_ch, 3, padding=1),
        )
        self.time_proj = nn.Sequential(
            nn.SiLU(), nn.Linear(time_dim, out_ch),
        )
        self.conv2    = nn.Sequential(
            nn.GroupNorm(8, out_ch), nn.SiLU(),
            nn.Conv2d(out_ch, out_ch, 3, padding=1),
        )
        self.shortcut = nn.Conv2d(in_ch, out_ch, 1) if in_ch != out_ch else nn.Identity()

    def forward(self, x, time_emb):
        h    = self.conv1(x)
        # Inject time information — broadcast over spatial dimensions
        h    = h + self.time_proj(time_emb)[:, :, None, None]
        h    = self.conv2(h)
        return h + self.shortcut(x)

# ── Minimal denoising U-Net ───────────────────────────────────────────
class UNetDenoiser(nn.Module):
    def __init__(self, in_channels=3, base_ch=64, time_dim=256):
        super().__init__()
        # Time embedding
        self.time_emb = nn.Sequential(
            SinusoidalTimeEmbedding(base_ch),
            nn.Linear(base_ch, time_dim),
            nn.SiLU(),
            nn.Linear(time_dim, time_dim),
        )
        # Encoder
        self.conv_in  = nn.Conv2d(in_channels, base_ch, 3, padding=1)
        self.enc1     = ResBlockTime(base_ch,    base_ch*2, time_dim)
        self.down1    = nn.Conv2d(base_ch*2, base_ch*2, 4, 2, 1)
        self.enc2     = ResBlockTime(base_ch*2,  base_ch*4, time_dim)
        self.down2    = nn.Conv2d(base_ch*4, base_ch*4, 4, 2, 1)
        # Bottleneck
        self.mid      = ResBlockTime(base_ch*4,  base_ch*4, time_dim)
        # Decoder
        self.up1      = nn.ConvTranspose2d(base_ch*4, base_ch*2, 4, 2, 1)
        self.dec1     = ResBlockTime(base_ch*4, base_ch*2, time_dim)  # +skip
        self.up2      = nn.ConvTranspose2d(base_ch*2, base_ch, 4, 2, 1)
        self.dec2     = ResBlockTime(base_ch*2,  base_ch,   time_dim)  # +skip
        # Output
        self.conv_out = nn.Sequential(
            nn.GroupNorm(8, base_ch), nn.SiLU(),
            nn.Conv2d(base_ch, in_channels, 3, padding=1),
        )

    def forward(self, x_t: torch.Tensor, t: torch.Tensor) -> torch.Tensor:
        """
        x_t: (B, C, H, W) — noisy image at timestep t
        t:   (B,)          — integer timestep
        Returns: predicted noise ε̂  (same shape as x_t)
        """
        te   = self.time_emb(t)             # (B, time_dim)
        x    = self.conv_in(x_t)            # (B, 64, H, W)
        s1   = self.enc1(x, te)             # (B, 128, H, W)
        x    = self.enc2(self.down1(s1), te) # (B, 256, H/2, W/2)
        s2   = x
        x    = self.mid(self.down2(x), te)  # (B, 256, H/4, W/4)
        x    = self.up1(x)                  # (B, 128, H/2, W/2)
        x    = self.dec1(torch.cat([x, s2], 1), te)
        x    = self.up2(x)                  # (B, 64, H, W)
        x    = self.dec2(torch.cat([x, s1], 1), te)
        return self.conv_out(x)             # (B, 3, H, W) — predicted noise

# ── Shape and parameter check ─────────────────────────────────────────
model = UNetDenoiser(in_channels=3, base_ch=64, time_dim=256)
x_t   = torch.randn(2, 3, 64, 64)
t     = torch.randint(0, 1000, (2,))
eps_pred = model(x_t, t)

params = sum(p.numel() for p in model.parameters())
print(f"Denoising U-Net:")
print(f"  Input x_t:      {tuple(x_t.shape)}")
print(f"  Timestep t:     {t.tolist()}")
print(f"  Predicted noise:{tuple(eps_pred.shape)}")
print(f"  Parameters:     {params:,}")`} />
      </div>

      <Div />

      {/* ══ SECTION 4 — TRAINING AND SAMPLING ═══════════════════════════════════ */}
      <div style={S.sec}>
        <span style={S.tag}>Training and generation</span>
        <h2 style={S.h2}>DDPM training loop and reverse process sampling</h2>

        <p style={S.p}>
          Training is remarkably simple: sample a random image from the dataset,
          sample a random timestep t, add the corresponding amount of noise,
          ask the model to predict the noise, compute MSE loss.
          That is the entire training algorithm. No adversarial game,
          no posterior collapse, no mode collapse. This simplicity
          is why diffusion models train so reliably compared to GANs.
        </p>

        <p style={S.p}>
          Sampling (generation) runs the reverse process: start from pure
          Gaussian noise x_T, iteratively denoise using the trained model,
          and arrive at a clean image x_0 after T steps.
          Each denoising step predicts the noise at the current timestep
          and subtracts it, producing a slightly cleaner image.
          The full T=1000 steps is slow — DDIM (denoising diffusion
          implicit models) achieves similar quality in 20–50 steps.
        </p>

        <CodeBlock code={`import torch
import torch.nn as nn
import torch.optim as optim
import numpy as np
from torch.utils.data import Dataset, DataLoader

torch.manual_seed(42)

# ── Re-create scheduler and model from previous sections ──────────────
class DDPMScheduler:
    def __init__(self, T=1000, beta_start=1e-4, beta_end=0.02):
        self.T            = T
        self.betas        = torch.linspace(beta_start, beta_end, T)
        self.alphas       = 1.0 - self.betas
        self.alpha_bar    = torch.cumprod(self.alphas, dim=0)
        self.sqrt_ab      = torch.sqrt(self.alpha_bar)
        self.sqrt_1m_ab   = torch.sqrt(1 - self.alpha_bar)
        self.sqrt_recip_a = torch.sqrt(1.0 / self.alphas)
        self.alpha_bar_prev = torch.cat([torch.tensor([1.0]), self.alpha_bar[:-1]])
        self.post_var     = self.betas * (1 - self.alpha_bar_prev) / (1 - self.alpha_bar)

    def add_noise(self, x0, t, noise=None):
        if noise is None: noise = torch.randn_like(x0)
        sqrt_ab  = self.sqrt_ab[t].view(-1,1,1,1)
        sqrt_1m  = self.sqrt_1m_ab[t].view(-1,1,1,1)
        return sqrt_ab * x0 + sqrt_1m * noise, noise

    @torch.no_grad()
    def reverse_step(self, model, x_t, t_val):
        """One step of reverse diffusion: x_t → x_{t-1}."""
        t_tensor = torch.full((x_t.size(0),), t_val, dtype=torch.long)
        eps_pred = model(x_t, t_tensor)

        # DDPM reverse formula
        coef1    = self.sqrt_recip_a[t_val]
        coef2    = self.betas[t_val] / self.sqrt_1m_ab[t_val]
        mu       = coef1 * (x_t - coef2 * eps_pred)

        if t_val > 0:
            noise    = torch.randn_like(x_t)
            sigma    = torch.sqrt(self.post_var[t_val])
            return mu + sigma * noise
        return mu   # t=0: no noise added

    @torch.no_grad()
    def sample(self, model, shape, device='cpu', verbose=True):
        """Full reverse diffusion from x_T ~ N(0,I) to x_0."""
        x = torch.randn(shape, device=device)
        for t in reversed(range(self.T)):
            x = self.reverse_step(model, x, t)
            if verbose and t % 200 == 0:
                print(f"  t={t:>4}: x mean={x.mean():.4f}  std={x.std():.4f}")
        return x

# ── DDPM training loop ────────────────────────────────────────────────
class TinyDataset(Dataset):
    def __init__(self, n=256):
        self.data = torch.rand(n, 3, 32, 32) * 2 - 1   # [-1, 1]
    def __len__(self): return len(self.data)
    def __getitem__(self, i): return self.data[i]

scheduler = DDPMScheduler(T=100)   # T=100 for speed; production uses T=1000
model     = UNetDenoiser(in_channels=3, base_ch=32, time_dim=128)
optimizer = optim.AdamW(model.parameters(), lr=2e-4)
loader    = DataLoader(TinyDataset(256), batch_size=16, shuffle=True)

print("DDPM Training:")
print(f"{'Epoch':>6} {'Loss':>10}")
print("─" * 20)

for epoch in range(1, 11):
    total_loss = 0
    for x0 in loader:
        # Sample random timesteps — uniform over [0, T)
        t     = torch.randint(0, scheduler.T, (x0.size(0),))
        noise = torch.randn_like(x0)
        x_t, eps = scheduler.add_noise(x0, t, noise)

        # Predict noise at timestep t
        eps_pred = model(x_t, t)

        # Simple MSE loss on predicted vs actual noise
        loss = nn.functional.mse_loss(eps_pred, eps)
        optimizer.zero_grad()
        loss.backward()
        nn.utils.clip_grad_norm_(model.parameters(), 1.0)
        optimizer.step()
        total_loss += loss.item()

    if epoch % 2 == 0:
        print(f"  {epoch:>4}  {total_loss/len(loader):>10.6f}")

# ── Generate samples ──────────────────────────────────────────────────
print("\nGenerating samples (reverse diffusion):")
model.eval()
samples = scheduler.sample(model, shape=(2, 3, 32, 32), verbose=True)
print(f"\nGenerated shape: {tuple(samples.shape)}")
print(f"  Value range: [{samples.min():.3f}, {samples.max():.3f}]")`} />
      </div>

      <Div />

      {/* ══ SECTION 5 — STABLE DIFFUSION ════════════════════════════════════════ */}
      <div style={S.sec}>
        <span style={S.tag}>Latent diffusion — the Stable Diffusion trick</span>
        <h2 style={S.h2}>Why Stable Diffusion runs on consumer GPUs — diffusion in latent space</h2>

        <p style={S.p}>
          Running DDPM directly on 512×512 images requires 1000 U-Net
          forward passes on high-resolution feature maps — enormously expensive.
          Stable Diffusion's key insight: run diffusion in the latent space
          of a pretrained VAE, not in pixel space.
          A VAE encodes a 512×512×3 image into a 64×64×4 latent tensor —
          a 48× reduction in resolution. Diffusion in this compressed space
          is 48× faster per step with no loss in final quality,
          because the VAE decoder restores full resolution at the end.
          This is Latent Diffusion Models (LDM).
        </p>

        <VisualBox label="Stable Diffusion pipeline — four components working together">
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {[
              {
                name: 'Text Encoder (CLIP)',
                color: '#D85A30',
                input: '"A red silk saree, studio photography"',
                output: 'text_embeddings (77, 768) — semantic prompt representation',
                trained: 'Frozen — pretrained on 400M image-text pairs',
              },
              {
                name: 'VAE Encoder',
                color: '#378ADD',
                input: 'Initial image (for img2img) or skip for txt2img',
                output: 'z_0 (1, 4, 64, 64) — compressed latent',
                trained: 'Frozen — pretrained on large image dataset',
              },
              {
                name: 'U-Net Denoiser (with cross-attention)',
                color: '#7b61ff',
                input: 'Noisy latent z_t (1,4,64,64) + timestep t + text_embeddings',
                output: 'Predicted noise ε̂ (1,4,64,64)',
                trained: 'This is the trainable diffusion model — 860M params in SD 1.5',
              },
              {
                name: 'VAE Decoder',
                color: '#1D9E75',
                input: 'Denoised latent z_0 (1,4,64,64)',
                output: 'Final image (1, 3, 512, 512)',
                trained: 'Frozen — same VAE as encoder',
              },
            ].map((item) => (
              <div key={item.name} style={{
                background: 'var(--surface)', border: `1px solid ${item.color}25`,
                borderRadius: 7, padding: '10px 12px',
                borderLeft: `4px solid ${item.color}`,
              }}>
                <div style={{ fontSize: 12, fontWeight: 700, color: item.color, marginBottom: 6 }}>
                  {item.name}
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 8, fontSize: 11 }}>
                  <div><span style={{ color: item.color, fontWeight: 700 }}>In: </span><span style={{ color: 'var(--muted)' }}>{item.input}</span></div>
                  <div><span style={{ color: item.color, fontWeight: 700 }}>Out: </span><span style={{ color: 'var(--muted)' }}>{item.output}</span></div>
                  <div><span style={{ color: item.color, fontWeight: 700 }}>Status: </span><span style={{ color: 'var(--muted)' }}>{item.trained}</span></div>
                </div>
              </div>
            ))}
          </div>
        </VisualBox>

        <CodeBlock code={`# pip install diffusers transformers accelerate
# Requires ~4GB VRAM for fp16, or runs on CPU (slowly)

from diffusers import (
    StableDiffusionPipeline,
    StableDiffusionImg2ImgPipeline,
    DDIMScheduler,
    DPMSolverMultistepScheduler,
)
import torch
from PIL import Image
import numpy as np

# ── Text-to-image generation ──────────────────────────────────────────
def load_sd_pipeline(model_id: str = 'runwayml/stable-diffusion-v1-5',
                      device: str = 'cuda'):
    pipe = StableDiffusionPipeline.from_pretrained(
        model_id,
        torch_dtype=torch.float16 if device == 'cuda' else torch.float32,
        safety_checker=None,   # disable for production (add your own)
    ).to(device)

    # Swap to faster scheduler — DDIM: 20 steps vs DDPM: 1000 steps
    pipe.scheduler = DDIMScheduler.from_config(pipe.scheduler.config)

    # Memory optimisation
    pipe.enable_attention_slicing()    # reduces peak VRAM
    # pipe.enable_xformers_memory_efficient_attention()  # if xformers installed

    return pipe

print("""
# ── Example: generate Meesho fashion product ─────────────────────────
pipe = load_sd_pipeline()

image = pipe(
    prompt=(
        "A beautiful red silk kurta with golden embroidery, "
        "product photography, white background, studio lighting, "
        "high quality, detailed fabric texture"
    ),
    negative_prompt=(
        "blurry, low quality, distorted, ugly, bad anatomy, "
        "watermark, text, logo"
    ),
    num_inference_steps=30,    # DDIM steps — 20-50 is the sweet spot
    guidance_scale=7.5,        # classifier-free guidance scale
    height=512, width=512,
    generator=torch.Generator().manual_seed(42),  # reproducible
).images[0]
image.save('kurta_generated.png')
""")

# ── Classifier-free guidance — the key to text conditioning ──────────
print("Classifier-Free Guidance (CFG):")
print("""
# CFG runs the U-Net TWICE per step:
# 1. Conditioned on text prompt   → eps_text
# 2. Conditioned on empty prompt  → eps_uncond
#
# Final prediction = eps_uncond + guidance_scale × (eps_text - eps_uncond)
#
# guidance_scale=1.0: ignore text, pure diffusion
# guidance_scale=7.5: strong text adherence (standard)
# guidance_scale=15+: very literal, less creative, may distort
""")

# ── Faster sampling with DPM-Solver ──────────────────────────────────
print("Scheduler comparison — quality vs speed:")
schedulers = [
    ('DDPM', 1000, 'Original — slow, high quality'),
    ('DDIM', 50,   'Deterministic, 20× faster, similar quality'),
    ('DPM-Solver++', 20, 'Best speed/quality tradeoff — production default'),
    ('LCM', 4,     'Latent Consistency Model — 4 steps, real-time'),
]
for name, steps, note in schedulers:
    time_est = steps * 0.05   # ~50ms per step on T4 GPU
    print(f"  {name:<20}: {steps:>5} steps  ~{time_est:.1f}s/image  {note}")

# ── ControlNet — guide generation with structural input ───────────────
print("""
# ControlNet adds structural guidance to Stable Diffusion:
# - Canny edges: generate image matching an edge map
# - Depth map:   preserve 3D structure from reference
# - Pose:        generate person in specific pose
# - Segmentation: fill segments with generated content

from diffusers import StableDiffusionControlNetPipeline, ControlNetModel

controlnet = ControlNetModel.from_pretrained(
    'lllyasviel/sd-controlnet-canny', torch_dtype=torch.float16
)
pipe = StableDiffusionControlNetPipeline.from_pretrained(
    'runwayml/stable-diffusion-v1-5',
    controlnet=controlnet,
    torch_dtype=torch.float16,
)
# Used by Meesho to generate product images that match a garment silhouette
""")`} />
      </div>

      <Div />

      {/* ══ SECTION 6 — FINE-TUNING SD ══════════════════════════════════════════ */}
      <div style={S.sec}>
        <span style={S.tag}>Customising Stable Diffusion</span>
        <h2 style={S.h2}>DreamBooth and LoRA — fine-tuning on your own images</h2>

        <p style={S.p}>
          Pretrained Stable Diffusion generates generic content.
          For Indian fashion product images, architectural styles, or
          brand-specific visual language, you need to fine-tune.
          Two efficient methods: DreamBooth fine-tunes the entire U-Net
          on 3–30 images of a specific concept and teaches the model a
          new token that refers to it. LoRA (Module 51) fine-tunes only
          0.5% of the U-Net parameters — achieves similar results
          with 10× less memory and training time.
        </p>

        <CodeBlock code={`# ── DreamBooth fine-tuning overview ──────────────────────────────────
print("""
DreamBooth: teach Stable Diffusion a new concept in 3-30 images.

# 1. Pick a rare token as the concept identifier
CONCEPT_TOKEN = 'sks'    # rare token unlikely in training data
INSTANCE_PROMPT = f'a photo of {CONCEPT_TOKEN} kurta'
CLASS_PROMPT    = 'a photo of a kurta'

# 2. Prepare dataset
#    instance/: 5-10 photos of your specific product
#    class/:    100 generated photos of the general class
#              (prevents overfitting / prior preservation)

# 3. Train with prior preservation loss
#    loss = instance_loss + lambda_prior × class_loss
#    instance_loss: model learns to reconstruct your specific product
#    class_loss:    model retains knowledge of the general class

# 4. After training:
#    'a photo of sks kurta' → generates YOUR specific kurta
#    'a photo of sks kurta on a runway' → your kurta in new context

# Training command (HuggingFace diffusers):
# accelerate launch train_dreambooth.py
#   --pretrained_model_name_or_path='runwayml/stable-diffusion-v1-5'
#   --instance_data_dir='./instance'
#   --class_data_dir='./class'
#   --instance_prompt='a photo of sks kurta'
#   --class_prompt='a photo of a kurta'
#   --resolution=512 --train_batch_size=1
#   --gradient_accumulation_steps=1
#   --learning_rate=5e-6 --max_train_steps=800
#   --output_dir='./dreambooth-kurta'
""")

# ── LoRA fine-tuning for Stable Diffusion ─────────────────────────────
print("""
LoRA for SD: same concept as Module 51 but applied to the U-Net.
Trains only the low-rank delta matrices in attention layers.
Result: 50-100MB .safetensors file vs 4GB full fine-tuned model.

from diffusers import StableDiffusionPipeline
from peft import LoraConfig, get_peft_model

# Apply LoRA to the U-Net's attention layers
unet      = pipe.unet
lora_cfg  = LoraConfig(
    r=4,
    lora_alpha=4,
    target_modules=['to_q', 'to_v', 'to_k', 'to_out.0'],
    lora_dropout=0.0,
)
unet = get_peft_model(unet, lora_cfg)
unet.print_trainable_parameters()
# trainable params: 797,696 || all params: 859,520,964 || trainable: 0.09%

# Load community LoRA weights (civitai.com, HuggingFace Hub)
pipe.load_lora_weights('path/to/indian-fashion.safetensors')
# Now generates Indian fashion aesthetic without retraining

# Production pattern: load multiple LoRAs with different weights
# pipe.load_lora_weights(lora1, adapter_name='style1')
# pipe.load_lora_weights(lora2, adapter_name='product')
# pipe.set_adapters(['style1', 'product'], adapter_weights=[0.7, 1.0])
""")

# ── Textual Inversion — lightest fine-tuning ─────────────────────────
print("""
Textual Inversion: learn a new text token embedding (not U-Net weights).
Only 5-10 images needed. Resulting file is 100KB.
Weakest but fastest — good for simple style transfer.

# After training: '<indian-wedding-style>' becomes a usable token
# pipe('a photo in <indian-wedding-style> aesthetic')
""")`} />
      </div>

      <Div />

      {/* ══ SECTION 7 — ERRORS ═════════════════════════════════════════════════ */}
      <div style={S.sec}>
        <span style={S.tag}>Errors you will hit</span>
        <h2 style={S.h2}>Every common diffusion model mistake — explained and fixed</h2>

        <ErrorBlock
          error="Generated images are blurry or washed out — guidance_scale too low"
          cause="Low classifier-free guidance scale means the model gives too little weight to the text prompt and too much weight to the unconditional branch. At guidance_scale=1.0 the model completely ignores the prompt and generates generic images. At guidance_scale=3.0 the text influence is weak. The result is blurry, prompt-agnostic outputs that look like random noise-reduction outputs."
          fix="Use guidance_scale=7.0–7.5 for general prompts — this is the standard well-tested value. For highly detailed prompts or complex compositions, try 8.0–12.0. Values above 15 tend to oversaturate colours and distort proportions. The sweet spot for photorealistic Indian fashion is 7.0–9.0. Also check that your negative prompt includes 'blurry, low quality' — this explicitly pushes the model away from low-quality outputs."
        />

        <ErrorBlock
          error="DDPM training: loss converges but generated samples look like random noise"
          cause="The model learned to predict the correct noise magnitude on average but not the correct spatial pattern — common when the noise schedule is wrong or the model is too small for the image resolution. Also caused by not conditioning on timestep t — if time embedding is not properly injected, the model cannot distinguish noise levels and learns a single average denoising operation that works for no specific level."
          fix="Verify time embedding is injected at every residual block. Print a histogram of t values during training — should be uniform across [0, T). Use T=1000 with β_start=1e-4 and β_end=0.02 (standard DDPM values). For 64×64 images, use at least base_ch=128. Check that model(x_t, t) and the noise schedule add_noise function use the same alpha_bar tensor — a mismatch here causes the model to learn to denoise at the wrong noise levels."
        />

        <ErrorBlock
          error="CUDA out of memory when running Stable Diffusion inference"
          cause="Stable Diffusion 1.5 U-Net has 860M parameters — fp32 requires 3.4GB just for weights, plus activations during the forward pass. Running 30 inference steps with batch_size=1 at 512×512 in fp32 peaks at ~8GB VRAM. On a 4GB GPU this fails immediately."
          fix="Use fp16: pipe = StableDiffusionPipeline.from_pretrained(model_id, torch_dtype=torch.float16). This halves memory to ~1.7GB for weights. Enable attention slicing: pipe.enable_attention_slicing() — processes attention in chunks, reduces peak by ~30%. For very low VRAM: pipe.enable_sequential_cpu_offload() — moves model layers to CPU when not in use (slow but works on 4GB). Use SD 2.1 Turbo or LCM-LoRA for 4-step generation if latency is critical."
        />

        <ErrorBlock
          error="DreamBooth fine-tuning produces results but the model forgets how to generate general images"
          cause="Language drift and catastrophic forgetting — the model overfits to the instance images and overwrites its general knowledge. Without prior preservation, the model learns 'kurta = this specific red kurta' and loses the ability to generate any other kurta. Training too long (more than 1000 steps for 5-10 images) or using too high a learning rate amplifies this."
          fix="Always use prior preservation loss: generate 100–200 images of the general class using the unmodified model before training, and include them as class images. Use lambda_prior=1.0. Cap training steps at 400–800 for 5-10 instance images. Use learning rate 5e-6 (lower than standard fine-tuning). Alternatively use LoRA for DreamBooth — it is less prone to catastrophic forgetting because backbone weights are frozen."
        />
      </div>

      <Div />

      {/* ══ SECTION 8 — WHAT'S NEXT ════════════════════════════════════════════ */}
      <div style={{ paddingBottom: 48, paddingTop: 8 }}>
        <span style={S.tag}>What comes next</span>
        <h2 style={S.h2}>
          You understand how images are generated. Next: how the largest
          language models are built and aligned.
        </h2>

        <p style={S.p}>
          Diffusion models generate images by learning to reverse a noising
          process. LLMs generate text by learning to predict the next token —
          but at a scale and with emergent capabilities that make them
          qualitatively different from anything before. Module 64 covers
          how GPT, Claude, and Gemini are built: next-token pretraining at scale,
          RLHF alignment, DPO, instruction tuning, and the scaling laws
          that predict capability from compute.
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
              Next — Module 64 · Generative AI
            </div>
            <div style={{
              fontSize: 15, fontWeight: 700, color: 'var(--text)',
              fontFamily: 'var(--font-display)', letterSpacing: '-0.3px',
            }}>
              LLMs — Pretraining, RLHF, and Scaling Laws
            </div>
            <p style={{ ...S.ps, marginBottom: 0, marginTop: 4 }}>
              How GPT, Claude, and Gemini are built. Next-token prediction
              at scale, RLHF alignment, DPO, and the laws that predict capability.
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
          'Diffusion models learn to reverse a fixed noising process. The forward process gradually adds Gaussian noise to an image over T=1000 steps until it becomes pure noise. The reverse process trains a U-Net to predict the noise at each step. Generation = start from pure noise, run the reverse process T times.',
          'The closed-form forward process lets you jump to any timestep t directly: x_t = √ᾱ_t × x_0 + √(1−ᾱ_t) × ε where ᾱ_t is the cumulative product of (1−β_s). Training samples random t values and asks the model to predict ε from x_t — the entire training algorithm is this MSE loss.',
          'The denoising U-Net takes a noisy image x_t and a timestep t as input. Timestep t is converted to a sinusoidal embedding and injected into every residual block. The architecture is identical to segmentation U-Net but with time conditioning — skip connections preserve spatial detail for precise denoising.',
          'Stable Diffusion runs diffusion in the 64×64×4 latent space of a pretrained VAE, not in 512×512 pixel space. This 48× compression makes each denoising step 48× cheaper with no quality loss. The VAE decoder restores full resolution at the end. This is Latent Diffusion Models (LDM).',
          'Classifier-free guidance (CFG) runs the U-Net twice per step: once with the text prompt and once without. The final prediction is: eps_uncond + scale × (eps_text − eps_uncond). guidance_scale=7.5 is the standard. Higher scale = more prompt adherence but potential distortion. Lower scale = more diversity but ignores prompt.',
          'Fine-tuning options by cost: Textual Inversion (learn one new token, 100KB, 5 images, weakest) → LoRA (train 0.09% of U-Net, 50MB, 10-50 images, strong) → DreamBooth (fine-tune full U-Net, 4GB, 5-30 images, strongest). Always use prior preservation loss in DreamBooth to prevent catastrophic forgetting of general knowledge.',
        ]}
      />
    </LearnLayout>
  )
}
