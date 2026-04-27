import type { Metadata } from 'next'
import { LearnLayout } from '@/components/content/LearnLayout'
import { Callout } from '@/components/content/Callout'
import { KeyTakeaways } from '@/components/content/KeyTakeaways'
import MLPageHeader from '@/components/content/MLPageHeader'

export const metadata: Metadata = {
  title: 'CNNs — Shopify Product Image Classification — Chaduvuko',
  description:
    'Filters, feature maps, pooling, and how CNNs learn to recognise objects at any position in an image. Built from scratch then scaled with transfer learning.',
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

export default function CNNsImageClassificationPage() {
  return (
    <LearnLayout
      title="CNNs — Shopify Product Image Classification"
      description="Filters, feature maps, pooling, and how CNNs learn to recognise objects at any position in an image. Built from scratch then scaled with transfer learning."
      section="Deep Learning"
      readTime="40–45 min"
      updatedAt="March 2026"
    >
      <MLPageHeader section="deep-learning" topic="cnns-image-classification" />

      {/* ══ SECTION 1 — PLAIN ENGLISH ══════════════════════════════════════════ */}
      <div style={S.sec}>
        <span style={S.tag}>Before any formula — why MLPs fail on images</span>
        <h2 style={S.h2}>
          A 224×224 image has 150,528 pixels. An MLP treating each pixel
          as a separate input needs millions of parameters just for the first layer —
          and still cannot recognise a shirt if it appears in a different
          corner of the image.
        </h2>

        <p style={S.p}>
          Shopify lists millions of fashion products. Each listing needs a
          category tag — kurta, saree, jeans, sneakers.
          An MLP flattens the image to a vector of 150,528 numbers and
          connects every pixel to every neuron. A first hidden layer of 512
          neurons needs 77 million weights. It trains on images of shirts
          centred in frame, then fails on shirts shifted slightly to the left —
          because it memorised pixel positions, not the concept of "shirt."
        </p>

        <p style={S.p}>
          CNNs solve both problems with one idea: instead of connecting every
          pixel to every neuron, slide a small filter (typically 3×3 pixels)
          across the entire image. The same filter weights are reused at every
          position — this is weight sharing. A filter that detects a vertical
          edge detects it whether the edge is in the top-left or bottom-right
          corner. This gives CNNs two critical properties: far fewer parameters,
          and translation invariance.
        </p>

        <AnalogyBox>
          <p style={{ ...S.p, marginBottom: 8 }}>
            Imagine inspecting a large fabric roll for defects.
            You would not look at the entire roll simultaneously —
            you would use a small magnifying glass and slide it across,
            looking for the same pattern (a tear, a stain) at every position.
            You use the same visual skill (the same filter weights) everywhere.
          </p>
          <p style={{ ...S.ps, marginBottom: 0, color: '#00e676' }}>
            A CNN's convolutional layer is that magnifying glass — a small filter
            sliding across the image, applying the same weights at every position.
            Early layers detect edges and textures. Middle layers detect shapes.
            Deep layers detect objects. The hierarchy of features is learned
            automatically from labelled images.
          </p>
        </AnalogyBox>

        <Callout type="tip">
          This module builds a CNN from scratch in PyTorch, trains it on a
          simulated Shopify-style product classification task, then shows
          transfer learning — using a pretrained ResNet50 and fine-tuning
          only the final layer. Transfer learning is how all production
          image classifiers are built today.
        </Callout>
      </div>

      <Div />

      {/* ══ SECTION 2 — THE CONVOLUTION OPERATION ═══════════════════════════════ */}
      <div style={S.sec}>
        <span style={S.tag}>The core operation</span>
        <h2 style={S.h2}>Convolution — sliding a filter across an image</h2>

        <p style={S.p}>
          A convolution takes a filter (a small matrix of learnable weights,
          e.g. 3×3) and slides it across the input image. At each position
          the filter is placed, the element-wise product between the filter
          and the overlapping image patch is computed and summed.
          The result — one number per position — forms the feature map.
          Multiple filters produce multiple feature maps, one per filter.
        </p>

        <VisualBox label="3×3 filter sliding across a 5×5 input — one step of convolution">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr auto 1fr auto 1fr', gap: 16, alignItems: 'center' }}>
            {/* Input */}
            <div>
              <div style={{ fontSize: 10, fontWeight: 700, color: 'var(--muted)', fontFamily: 'var(--font-mono)', marginBottom: 8 }}>INPUT (5×5)</div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 32px)', gap: 2 }}>
                {[1,2,3,0,1, 0,1,2,3,1, 1,0,1,2,0, 2,1,0,1,3, 0,1,2,0,1].map((v, i) => (
                  <div key={i} style={{
                    width: 32, height: 32, display: 'flex', alignItems: 'center',
                    justifyContent: 'center', borderRadius: 3, fontSize: 12,
                    fontFamily: 'var(--font-mono)', fontWeight: 600,
                    background: i < 9 && i % 5 < 3 ? 'rgba(123,97,255,0.25)' : 'var(--surface)',
                    border: i < 9 && i % 5 < 3 ? '1.5px solid #7b61ff' : '1px solid var(--border)',
                    color: i < 9 && i % 5 < 3 ? '#7b61ff' : 'var(--muted)',
                  }}>{v}</div>
                ))}
              </div>
            </div>
            <div style={{ fontSize: 20, color: '#555' }}>×</div>
            {/* Filter */}
            <div>
              <div style={{ fontSize: 10, fontWeight: 700, color: 'var(--muted)', fontFamily: 'var(--font-mono)', marginBottom: 8 }}>FILTER (3×3)</div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 32px)', gap: 2 }}>
                {[1,0,-1, 1,0,-1, 1,0,-1].map((v, i) => (
                  <div key={i} style={{
                    width: 32, height: 32, display: 'flex', alignItems: 'center',
                    justifyContent: 'center', borderRadius: 3, fontSize: 12,
                    fontFamily: 'var(--font-mono)', fontWeight: 700,
                    background: 'rgba(29,158,117,0.15)',
                    border: '1.5px solid #1D9E75', color: '#1D9E75',
                  }}>{v}</div>
                ))}
              </div>
            </div>
            <div style={{ fontSize: 20, color: '#555' }}>=</div>
            {/* Output */}
            <div>
              <div style={{ fontSize: 10, fontWeight: 700, color: 'var(--muted)', fontFamily: 'var(--font-mono)', marginBottom: 8 }}>OUTPUT (3×3)</div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 32px)', gap: 2 }}>
                {[-2,0,4, -1,2,3, 0,-1,2].map((v, i) => (
                  <div key={i} style={{
                    width: 32, height: 32, display: 'flex', alignItems: 'center',
                    justifyContent: 'center', borderRadius: 3, fontSize: 12,
                    fontFamily: 'var(--font-mono)', fontWeight: 600,
                    background: i === 0 ? 'rgba(216,90,48,0.2)' : 'var(--surface)',
                    border: i === 0 ? '1.5px solid #D85A30' : '1px solid var(--border)',
                    color: i === 0 ? '#D85A30' : 'var(--muted)',
                  }}>{v}</div>
                ))}
              </div>
            </div>
          </div>
          <p style={{ ...S.ps, marginBottom: 0, marginTop: 14 }}>
            Top-left output value: (1×1)+(2×0)+(3×−1)+(0×1)+(1×0)+(2×−1)+(1×1)+(0×0)+(1×−1) = −2.
            This filter detects vertical edges — positive response where left side is brighter than right.
          </p>
        </VisualBox>

        <ConceptBox title="Key CNN vocabulary — four terms you must know">
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {[
              { term: 'Filter (kernel)', def: 'Small weight matrix (3×3, 5×5) that slides across input. One filter = one learned feature detector. 32 filters → 32 feature maps.', color: '#1D9E75' },
              { term: 'Feature map',    def: 'Output of one filter sliding across the input. Shape: (H_out × W_out). One per filter. Represents "where this feature appears in the image."', color: '#7b61ff' },
              { term: 'Stride',         def: 'How many pixels the filter jumps each step. Stride=1: dense output. Stride=2: halves spatial dimensions (H and W). Controls output size.', color: '#378ADD' },
              { term: 'Padding',        def: 'Zeros added around the input border. padding=1 with 3×3 filter keeps output same spatial size as input (same padding). padding=0 shrinks it.', color: '#D85A30' },
            ].map((item) => (
              <div key={item.term} style={{
                display: 'flex', gap: 12, background: 'var(--bg2)',
                borderRadius: 5, padding: '8px 12px',
              }}>
                <span style={{ fontSize: 12, fontWeight: 700, color: item.color, fontFamily: 'var(--font-mono)', minWidth: 120 }}>
                  {item.term}
                </span>
                <span style={{ fontSize: 12, color: 'var(--muted)', lineHeight: 1.6 }}>{item.def}</span>
              </div>
            ))}
          </div>
        </ConceptBox>

        <CodeBlock code={`import numpy as np
import torch
import torch.nn as nn

# ── Manual 2D convolution — see every step ────────────────────────────
def conv2d_manual(input_2d, kernel, stride=1, padding=0):
    """
    input_2d: (H, W)
    kernel:   (kH, kW)
    Returns:  feature map (H_out, W_out)
    """
    H, W   = input_2d.shape
    kH, kW = kernel.shape

    if padding > 0:
        input_2d = np.pad(input_2d, padding, mode='constant')
        H, W     = input_2d.shape

    H_out = (H - kH) // stride + 1
    W_out = (W - kW) // stride + 1
    output = np.zeros((H_out, W_out))

    for i in range(H_out):
        for j in range(W_out):
            patch         = input_2d[i*stride:i*stride+kH, j*stride:j*stride+kW]
            output[i, j]  = (patch * kernel).sum()
    return output

# ── Test: vertical edge detector ──────────────────────────────────────
image = np.array([
    [0, 0, 0, 255, 255],
    [0, 0, 0, 255, 255],
    [0, 0, 0, 255, 255],
    [0, 0, 0, 255, 255],
    [0, 0, 0, 255, 255],
], dtype=float)

vertical_edge = np.array([[-1, 0, 1], [-1, 0, 1], [-1, 0, 1]], dtype=float)
horizontal_edge = np.array([[-1,-1,-1], [0,0,0], [1,1,1]], dtype=float)

print("Vertical edge filter response:")
print(conv2d_manual(image, vertical_edge))
print("\nHorizontal edge filter response:")
print(conv2d_manual(image, horizontal_edge))

# ── Output size formula ────────────────────────────────────────────────
def output_size(H, kernel, stride, padding):
    return (H + 2*padding - kernel) // stride + 1

print("\nOutput size examples (input=224):")
for k, s, p in [(3,1,0),(3,1,1),(3,2,1),(5,1,2),(7,2,3)]:
    out = output_size(224, k, s, p)
    print(f"  kernel={k} stride={s} pad={p}: output={out}×{out}")`} />
      </div>

      <Div />

      {/* ══ SECTION 3 — CNN ARCHITECTURE ════════════════════════════════════════ */}
      <div style={S.sec}>
        <span style={S.tag}>Building blocks</span>
        <h2 style={S.h2}>Pooling, flattening, and the full CNN pipeline</h2>

        <p style={S.p}>
          A complete CNN stacks three types of layers.
          <strong style={{ color: '#7b61ff' }}> Convolutional layers</strong> detect features —
          edges, textures, shapes — and produce feature maps.
          <strong style={{ color: '#1D9E75' }}> Pooling layers</strong> reduce spatial dimensions —
          typically MaxPool2d(2,2) halves H and W, keeping the most prominent
          feature in each 2×2 region. This builds translation invariance and
          reduces computation.
          <strong style={{ color: '#378ADD' }}> Fully connected layers</strong> at the end
          combine all detected features to make the final classification decision.
        </p>

        <VisualBox label="CNN pipeline — data shape at each stage for Shopify product images">
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            {[
              { stage: 'Input',          shape: '(batch, 3, 128, 128)', desc: 'RGB image — 3 channels, 128×128 pixels', color: '#888' },
              { stage: 'Conv1 (32 filters, 3×3, pad=1) + ReLU', shape: '(batch, 32, 128, 128)', desc: '32 edge/texture detectors, same spatial size', color: '#7b61ff' },
              { stage: 'MaxPool (2×2)',   shape: '(batch, 32, 64, 64)',  desc: 'Halve spatial dims, keep strongest activations', color: '#1D9E75' },
              { stage: 'Conv2 (64 filters, 3×3, pad=1) + ReLU', shape: '(batch, 64, 64, 64)', desc: '64 shape/pattern detectors', color: '#7b61ff' },
              { stage: 'MaxPool (2×2)',   shape: '(batch, 64, 32, 32)',  desc: 'Halve again', color: '#1D9E75' },
              { stage: 'Conv3 (128 filters, 3×3, pad=1) + ReLU', shape: '(batch, 128, 32, 32)', desc: '128 complex feature detectors', color: '#7b61ff' },
              { stage: 'MaxPool (2×2)',   shape: '(batch, 128, 16, 16)', desc: 'Halve again', color: '#1D9E75' },
              { stage: 'AdaptiveAvgPool',shape: '(batch, 128, 4, 4)',   desc: 'Fixed output regardless of input size', color: '#BA7517' },
              { stage: 'Flatten',        shape: '(batch, 2048)',        desc: '128 × 4 × 4 = 2048 features', color: '#378ADD' },
              { stage: 'FC (512) + ReLU + Dropout', shape: '(batch, 512)', desc: 'Dense classification head', color: '#378ADD' },
              { stage: 'FC (n_classes)', shape: '(batch, 6)',           desc: '6 logits — one per product category', color: '#D85A30' },
            ].map((item, i) => (
              <div key={i} style={{
                display: 'grid', gridTemplateColumns: '260px 160px 1fr',
                gap: 10, padding: '6px 10px',
                background: i % 2 === 0 ? 'var(--surface)' : 'transparent',
                borderRadius: 4, alignItems: 'center',
              }}>
                <span style={{ fontSize: 11, color: item.color, fontFamily: 'var(--font-mono)' }}>{item.stage}</span>
                <span style={{ fontSize: 11, color: item.color, fontFamily: 'var(--font-mono)', fontWeight: 700 }}>{item.shape}</span>
                <span style={{ fontSize: 11, color: 'var(--muted)' }}>{item.desc}</span>
              </div>
            ))}
          </div>
        </VisualBox>

        <CodeBlock code={`import torch
import torch.nn as nn

# ── CNN from scratch for Shopify product classification ─────────────────
# 6 categories: kurta, saree, jeans, sneakers, watch, handbag

class ShopifyCNN(nn.Module):
    def __init__(self, n_classes=6):
        super().__init__()

        # Feature extractor — conv layers learn visual features
        self.features = nn.Sequential(
            # Block 1: 3 → 32 channels
            nn.Conv2d(3, 32, kernel_size=3, padding=1),   # (B,3,128,128) → (B,32,128,128)
            nn.BatchNorm2d(32),
            nn.ReLU(inplace=True),
            nn.MaxPool2d(2, 2),                            # → (B,32,64,64)

            # Block 2: 32 → 64 channels
            nn.Conv2d(32, 64, kernel_size=3, padding=1),  # → (B,64,64,64)
            nn.BatchNorm2d(64),
            nn.ReLU(inplace=True),
            nn.MaxPool2d(2, 2),                            # → (B,64,32,32)

            # Block 3: 64 → 128 channels
            nn.Conv2d(64, 128, kernel_size=3, padding=1), # → (B,128,32,32)
            nn.BatchNorm2d(128),
            nn.ReLU(inplace=True),
            nn.MaxPool2d(2, 2),                            # → (B,128,16,16)

            # Block 4: 128 → 256 channels
            nn.Conv2d(128, 256, kernel_size=3, padding=1),# → (B,256,16,16)
            nn.BatchNorm2d(256),
            nn.ReLU(inplace=True),
            nn.AdaptiveAvgPool2d((4, 4)),                  # → (B,256,4,4) fixed
        )

        # Classifier head — fully connected layers make final decision
        self.classifier = nn.Sequential(
            nn.Flatten(),                                  # → (B, 4096)
            nn.Linear(256 * 4 * 4, 512),
            nn.ReLU(inplace=True),
            nn.Dropout(0.4),
            nn.Linear(512, n_classes),                    # → (B, 6) raw logits
        )

    def forward(self, x):
        x = self.features(x)
        x = self.classifier(x)
        return x

model = ShopifyCNN(n_classes=6)

# ── Parameter count ───────────────────────────────────────────────────
total  = sum(p.numel() for p in model.parameters())
trainable = sum(p.numel() for p in model.parameters() if p.requires_grad)
print(f"Total parameters:     {total:,}")
print(f"Trainable parameters: {trainable:,}")

# ── Shape check — forward pass with dummy batch ───────────────────────
dummy = torch.randn(4, 3, 128, 128)   # batch of 4 RGB images at 128×128
out   = model(dummy)
print(f"\nInput shape:  {dummy.shape}")
print(f"Output shape: {out.shape}  ← (4 samples, 6 class logits)")

# ── Inspect intermediate feature map shapes ───────────────────────────
print("\nFeature map shapes through each block:")
x = dummy
for i, layer in enumerate(model.features):
    x = layer(x)
    if isinstance(layer, (nn.MaxPool2d, nn.AdaptiveAvgPool2d)):
        print(f"  After {layer.__class__.__name__}: {x.shape}")`} />
      </div>

      <Div />

      {/* ══ SECTION 4 — TRAINING THE CNN ════════════════════════════════════════ */}
      <div style={S.sec}>
        <span style={S.tag}>Training from scratch</span>
        <h2 style={S.h2}>Full training loop — data augmentation, class weighting, early stopping</h2>

        <p style={S.p}>
          Training a CNN from scratch on images requires one additional technique
          not needed for tabular data: <strong style={{ color: '#1D9E75' }}>data augmentation</strong>.
          Images of the same product can be flipped, rotated, cropped, or colour-jittered
          without changing their category. Applying random transformations during training
          artificially multiplies the dataset size and teaches the network
          that these variations should produce the same prediction.
          Without augmentation, CNNs overfit rapidly on small datasets.
        </p>

        <CodeBlock code={`import torch
import torch.nn as nn
import torch.optim as optim
import torchvision.transforms as T
import numpy as np
from torch.utils.data import Dataset, DataLoader
import copy, warnings
warnings.filterwarnings('ignore')

torch.manual_seed(42)
np.random.seed(42)

# ── Simulate Shopify product image dataset ─────────────────────────────
# In production: torchvision.datasets.ImageFolder pointing to your image directory
# Here: synthetic RGB images with class-specific colour patterns

CATEGORIES = ['kurta', 'saree', 'jeans', 'sneakers', 'watch', 'handbag']
N_CLASSES  = len(CATEGORIES)

class SyntheticShopifyDataset(Dataset):
    def __init__(self, n_samples=2000, img_size=64, transform=None):
        self.n  = n_samples
        self.sz = img_size
        self.transform = transform
        np.random.seed(42)
        self.labels = np.random.randint(0, N_CLASSES, n_samples)
        # Each class has a distinct colour bias — simulates real category difference
        self.color_bias = np.array([
            [0.8, 0.3, 0.2],   # kurta    — warm red
            [0.2, 0.7, 0.5],   # saree    — green/teal
            [0.2, 0.3, 0.8],   # jeans    — blue
            [0.7, 0.7, 0.2],   # sneakers — yellow/white
            [0.5, 0.5, 0.5],   # watch    — grey/silver
            [0.6, 0.2, 0.6],   # handbag  — purple
        ])

    def __len__(self): return self.n

    def __getitem__(self, idx):
        label = self.labels[idx]
        bias  = self.color_bias[label]
        # Generate image with class-specific colour + noise
        img = np.random.randn(3, self.sz, self.sz) * 0.15
        for c in range(3):
            img[c] += bias[c]
        img = np.clip(img, 0, 1).astype(np.float32)
        img = torch.FloatTensor(img)
        if self.transform:
            img = self.transform(img)
        return img, label

# ── Data augmentation for training ────────────────────────────────────
train_transform = T.Compose([
    T.RandomHorizontalFlip(p=0.5),
    T.RandomVerticalFlip(p=0.1),
    T.RandomRotation(degrees=15),
    T.ColorJitter(brightness=0.3, contrast=0.3, saturation=0.2),
    T.RandomErasing(p=0.2),       # randomly mask patches — prevents overfit
])
val_transform = None   # no augmentation at validation time

train_ds = SyntheticShopifyDataset(1600, transform=train_transform)
val_ds   = SyntheticShopifyDataset(400,  transform=val_transform)

train_loader = DataLoader(train_ds, batch_size=64, shuffle=True,  num_workers=0)
val_loader   = DataLoader(val_ds,   batch_size=64, shuffle=False, num_workers=0)

# ── Model, loss, optimiser ─────────────────────────────────────────────
class ShopifyCNN(nn.Module):
    def __init__(self, n=6):
        super().__init__()
        self.features = nn.Sequential(
            nn.Conv2d(3,32,3,padding=1), nn.BatchNorm2d(32), nn.ReLU(True), nn.MaxPool2d(2),
            nn.Conv2d(32,64,3,padding=1), nn.BatchNorm2d(64), nn.ReLU(True), nn.MaxPool2d(2),
            nn.Conv2d(64,128,3,padding=1), nn.BatchNorm2d(128), nn.ReLU(True),
            nn.AdaptiveAvgPool2d((4,4)),
        )
        self.classifier = nn.Sequential(
            nn.Flatten(), nn.Linear(128*16,256),
            nn.ReLU(True), nn.Dropout(0.4), nn.Linear(256,n),
        )
    def forward(self, x): return self.classifier(self.features(x))

model     = ShopifyCNN()
criterion = nn.CrossEntropyLoss()
optimizer = optim.AdamW(model.parameters(), lr=1e-3, weight_decay=0.01)
scheduler = optim.lr_scheduler.CosineAnnealingLR(optimizer, T_max=30)

# ── Training loop with early stopping ─────────────────────────────────
best_acc, best_wts, patience_count = 0.0, None, 0
PATIENCE = 8

print(f"Training ShopifyCNN from scratch:")
print(f"{'Epoch':>6} {'Train loss':>12} {'Val acc':>10} {'LR':>12}")
print("─" * 44)

for epoch in range(1, 31):
    model.train()
    total_loss = 0
    for Xb, yb in train_loader:
        optimizer.zero_grad()
        loss = criterion(model(Xb), yb)
        loss.backward()
        optimizer.step()
        total_loss += loss.item()
    scheduler.step()

    model.eval()
    correct = 0
    with torch.no_grad():
        for Xb, yb in val_loader:
            correct += (model(Xb).argmax(1) == yb).sum().item()
    val_acc = correct / len(val_ds)
    lr_now  = optimizer.param_groups[0]['lr']

    if epoch % 5 == 0:
        print(f"  {epoch:>4}  {total_loss/len(train_loader):>12.4f}  {val_acc:>10.4f}  {lr_now:>12.6f}")

    if val_acc > best_acc:
        best_acc, best_wts = val_acc, copy.deepcopy(model.state_dict())
        patience_count = 0
    else:
        patience_count += 1
        if patience_count >= PATIENCE:
            print(f"  Early stop at epoch {epoch}")
            break

model.load_state_dict(best_wts)
print(f"\nBest val accuracy: {best_acc:.4f}")`} />
      </div>

      <Div />

      {/* ══ SECTION 5 — TRANSFER LEARNING ═══════════════════════════════════════ */}
      <div style={S.sec}>
        <span style={S.tag}>How production image classifiers are actually built</span>
        <h2 style={S.h2}>Transfer learning — take ResNet50 pretrained on ImageNet, fine-tune the head</h2>

        <p style={S.p}>
          Training a CNN from scratch requires hundreds of thousands of labelled images
          and days of GPU compute. Shopify does not do this.
          Nobody does this for product classification.
          Instead, they use a model pretrained on ImageNet — a dataset of 1.2 million
          images across 1,000 categories. That model has already learned
          to detect edges, textures, shapes, and objects.
          Replace only the final classification layer with one that outputs
          your 6 categories, then fine-tune. This is transfer learning —
          and it produces better results with 1,000 images than training
          from scratch with 100,000.
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 24 }}>
          {[
            {
              strategy: 'Feature extraction',
              color: '#378ADD',
              desc: 'Freeze all pretrained layers. Train only the new classification head. Fast — only a small number of parameters update. Best when your dataset is small (<1,000 images) and similar to ImageNet.',
              when: 'Small dataset, limited GPU, quick prototype.',
            },
            {
              strategy: 'Fine-tuning (partial)',
              color: '#1D9E75',
              desc: 'Freeze early layers (edge/texture detectors — universal). Unfreeze later layers (task-specific features). Train head + later layers with a small lr. Best balance of speed and accuracy.',
              when: 'Medium dataset (1k–100k images). Standard production approach.',
            },
            {
              strategy: 'Full fine-tuning',
              color: '#7b61ff',
              desc: 'Unfreeze all layers. Train entire network with a very small lr (1e-5). Early layers need tiny updates — they are already good. Risk of catastrophic forgetting if lr is too high.',
              when: 'Large dataset (100k+ images) or domain very different from ImageNet.',
            },
          ].map((item) => (
            <div key={item.strategy} style={{
              background: 'var(--surface)', border: `1px solid ${item.color}25`,
              borderRadius: 8, padding: '12px 16px',
              borderLeft: `4px solid ${item.color}`,
            }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: item.color, fontFamily: 'var(--font-display)', marginBottom: 5 }}>
                {item.strategy}
              </div>
              <p style={{ ...S.ps, marginBottom: 4 }}>{item.desc}</p>
              <div style={{ fontSize: 11, color: item.color }}>Use when: {item.when}</div>
            </div>
          ))}
        </div>

        <CodeBlock code={`import torch
import torch.nn as nn
import torch.optim as optim
import torchvision.models as models
import numpy as np
from torch.utils.data import Dataset, DataLoader
import warnings
warnings.filterwarnings('ignore')

torch.manual_seed(42)

CATEGORIES = ['kurta', 'saree', 'jeans', 'sneakers', 'watch', 'handbag']
N_CLASSES  = 6

class SyntheticShopifyDataset(torch.utils.data.Dataset):
    def __init__(self, n=500):
        np.random.seed(42)
        self.labels = np.random.randint(0, N_CLASSES, n)
        self.bias   = np.array([[.8,.3,.2],[.2,.7,.5],[.2,.3,.8],
                                 [.7,.7,.2],[.5,.5,.5],[.6,.2,.6]])
    def __len__(self): return len(self.labels)
    def __getitem__(self, i):
        b   = self.bias[self.labels[i]]
        img = np.random.randn(3,64,64)*.15
        for c in range(3): img[c] += b[c]
        return torch.FloatTensor(np.clip(img,0,1).astype(np.float32)), self.labels[i]

train_ds = SyntheticShopifyDataset(400)
val_ds   = SyntheticShopifyDataset(100)
train_ld = DataLoader(train_ds, 32, shuffle=True)
val_ld   = DataLoader(val_ds,   32)

# ── Strategy 1: Feature extraction — freeze backbone ──────────────────
backbone = models.resnet18(weights=None)   # use pretrained=True in production
# Freeze all layers
for param in backbone.parameters():
    param.requires_grad = False
# Replace the final FC layer — only this trains
backbone.fc = nn.Linear(backbone.fc.in_features, N_CLASSES)
# Only fc parameters have requires_grad=True
trainable = sum(p.numel() for p in backbone.parameters() if p.requires_grad)
total     = sum(p.numel() for p in backbone.parameters())
print(f"Feature extraction: {trainable:,} / {total:,} parameters trainable")

# ── Strategy 2: Partial fine-tuning — unfreeze layer4 + fc ───────────
backbone2 = models.resnet18(weights=None)
for param in backbone2.parameters():
    param.requires_grad = False
# Unfreeze only the last residual block and fc
for param in backbone2.layer4.parameters():
    param.requires_grad = True
backbone2.fc = nn.Linear(backbone2.fc.in_features, N_CLASSES)
for param in backbone2.fc.parameters():
    param.requires_grad = True
trainable2 = sum(p.numel() for p in backbone2.parameters() if p.requires_grad)
print(f"Partial fine-tuning: {trainable2:,} / {total:,} parameters trainable")

# ── Train feature extraction version ──────────────────────────────────
# Resize input to 224×224 for ResNet (designed for ImageNet size)
# Here: use adaptive pool to handle our 64×64 images
model = backbone
criterion = nn.CrossEntropyLoss()
# Only pass trainable parameters to optimiser — good practice
optimizer = optim.AdamW(
    filter(lambda p: p.requires_grad, model.parameters()),
    lr=1e-3, weight_decay=0.01,
)

print("\nFine-tuning classification head only:")
for epoch in range(1, 11):
    model.train()
    for Xb, yb in train_ld:
        optimizer.zero_grad()
        criterion(model(Xb), yb).backward()
        optimizer.step()

    model.eval()
    correct = 0
    with torch.no_grad():
        for Xb, yb in val_ld:
            correct += (model(Xb).argmax(1) == yb).sum().item()
    if epoch % 2 == 0:
        print(f"  Epoch {epoch:2d}: val acc = {correct/len(val_ds):.4f}")

# ── Differential learning rates — best practice for fine-tuning ───────
# Backbone layers: very small lr (they are already good)
# Classification head: normal lr (it is randomly initialised)
backbone3 = models.resnet18(weights=None)
backbone3.fc = nn.Linear(backbone3.fc.in_features, N_CLASSES)

optimizer_diff = optim.AdamW([
    {'params': backbone3.layer1.parameters(), 'lr': 1e-5},
    {'params': backbone3.layer2.parameters(), 'lr': 1e-5},
    {'params': backbone3.layer3.parameters(), 'lr': 1e-4},
    {'params': backbone3.layer4.parameters(), 'lr': 1e-4},
    {'params': backbone3.fc.parameters(),     'lr': 1e-3},   # head: normal lr
], weight_decay=0.01)

print("\nDifferential lr param groups:")
for group in optimizer_diff.param_groups:
    n = sum(p.numel() for p in group['params'])
    print(f"  lr={group['lr']:.0e}  params={n:,}")`} />
      </div>

      <Div />

      {/* ══ SECTION 6 — ERRORS ═════════════════════════════════════════════════ */}
      <div style={S.sec}>
        <span style={S.tag}>Errors you will hit</span>
        <h2 style={S.h2}>Every common CNN mistake — explained and fixed</h2>

        <ErrorBlock
          error="RuntimeError: Expected 4D tensor but got 3D tensor for input"
          cause="PyTorch Conv2d expects input of shape (batch, channels, H, W) — 4 dimensions. You passed a single image of shape (channels, H, W) — 3 dimensions, missing the batch dimension. This happens when you load one image and pass it directly without adding a batch dimension, or when DataLoader is bypassed."
          fix="Add a batch dimension with unsqueeze: image = image.unsqueeze(0) — converts (3, H, W) to (1, 3, H, W). When using DataLoader this is handled automatically. Also check your Dataset __getitem__ returns (C, H, W) not (H, W, C) — PyTorch uses channels-first format while PIL and numpy use channels-last. Use transforms.ToTensor() to convert PIL images — it handles both the channel order and the 0–255 to 0–1 scaling."
        />

        <ErrorBlock
          error="CNN trains to ~16% accuracy (random) and never improves — all classes predicted equally"
          cause="The input images are not normalised. Raw pixel values 0–255 are fed directly to the network. The first Conv2d weights are initialised near zero — multiplied by 200-range pixel values, the pre-activations in the first layer are enormous, causing saturated activations, near-zero gradients, and no learning. Also check that your DataLoader is shuffling — if all class 0 images come in the first epoch and all class 1 images in the second, BatchNorm running statistics will be corrupted."
          fix="Always normalise images: divide by 255 to get 0–1 range, then apply per-channel mean/std normalisation. For ImageNet-pretrained models use: transforms.Normalize(mean=[0.485,0.456,0.406], std=[0.229,0.224,0.225]). For custom datasets compute mean and std from your training set. Set shuffle=True in DataLoader."
        />

        <ErrorBlock
          error="Transfer learning model performs worse than training from scratch"
          cause="The pretrained model's input normalisation was not applied. ResNet, EfficientNet, and all ImageNet-pretrained models expect inputs normalised with ImageNet mean and std. Without this normalisation the pretrained features are computed from out-of-distribution inputs and produce garbage. Also: learning rate too high during fine-tuning — catastrophic forgetting overwrites pretrained features."
          fix="Always apply ImageNet normalisation when using pretrained models: transforms.Normalize([0.485,0.456,0.406],[0.229,0.224,0.225]). Use a much smaller learning rate for pretrained layers (1e-5) than for the new head (1e-3). Freeze the backbone entirely for the first few epochs, then gradually unfreeze from the later layers backward."
        />

        <ErrorBlock
          error="CUDA out of memory during training — RuntimeError: CUDA out of memory"
          cause="Batch size is too large for the available GPU memory. A single 224×224 RGB image in float32 takes 224×224×3×4 = 600KB. A batch of 64 images = 38MB, plus the network activations (which are stored for backprop) can multiply this by 5–10×. A ResNet50 with batch size 64 needs ~8GB VRAM."
          fix="Reduce batch_size — halving it roughly halves memory usage. Use gradient accumulation to simulate large batches: accumulate gradients over N steps before calling optimizer.step(). Use torch.cuda.empty_cache() between epochs. For inference use with torch.no_grad() — this does not store activations and uses much less memory. Switch to mixed precision training: torch.cuda.amp.autocast() halves memory with float16."
        />
      </div>

      <Div />

      {/* ══ SECTION 7 — WHAT'S NEXT ════════════════════════════════════════════ */}
      <div style={{ paddingBottom: 48, paddingTop: 8 }}>
        <span style={S.tag}>What comes next</span>
        <h2 style={S.h2}>
          You can classify images. Next: model sequences — text, time series, audio.
        </h2>

        <p style={S.p}>
          CNNs exploit spatial structure in images. But many real-world problems
          involve sequences — a sentence is a sequence of words, a stock price
          is a sequence of daily values, a user session is a sequence of actions.
          Sequences have temporal structure: what came earlier affects what
          comes later. CNNs treat every position independently and cannot
          model this dependency. Module 47 covers RNNs and LSTMs —
          architectures designed specifically to process sequences
          by maintaining a hidden state that carries information
          forward across time steps.
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
              Next — Module 47 · Deep Learning
            </div>
            <div style={{
              fontSize: 15, fontWeight: 700, color: 'var(--text)',
              fontFamily: 'var(--font-display)', letterSpacing: '-0.3px',
            }}>
              RNNs and LSTMs — Sequence Modelling
            </div>
            <p style={{ ...S.ps, marginBottom: 0, marginTop: 4 }}>
              Hidden states, vanishing gradients across time, and how LSTMs
              use gates to selectively remember and forget.
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
          'CNNs solve two fundamental problems with MLPs on images: too many parameters (a 224×224 image needs 150k inputs × hidden units) and no spatial invariance (an MLP memorises pixel positions, not visual patterns). Convolutional filters slide across the image reusing the same weights everywhere — weight sharing dramatically reduces parameters and gives translation invariance.',
          'A convolutional layer applies multiple small filters (typically 3×3) across the input, producing one feature map per filter. Output size = (H + 2×padding − kernel) / stride + 1. padding=1 with a 3×3 filter keeps spatial dimensions unchanged. MaxPool2d(2,2) halves H and W, keeping the strongest activation in each 2×2 region.',
          'A complete CNN stacks: Conv+BN+ReLU blocks (feature extraction) → MaxPool (spatial reduction) → AdaptiveAvgPool (fixed output size) → Flatten → FC layers (classification). BatchNorm2d is placed after Conv2d and before ReLU for stable training.',
          'Data augmentation is essential for CNN training — random flips, rotations, colour jitter, and random erasing artificially expand the dataset and teach the network that these variations do not change the category. Apply augmentation only during training, never at validation or test time.',
          'Transfer learning is how all production image classifiers are built. Take a model pretrained on ImageNet, replace the final FC layer with one matching your number of classes, and fine-tune. Use differential learning rates: very small (1e-5) for pretrained backbone layers, normal (1e-3) for the new head. Always apply ImageNet normalisation when using pretrained models.',
          'The four CNN gotchas: input must be (batch, channels, H, W) — use unsqueeze(0) for single images. Always normalise pixel values to 0–1 before training. When using pretrained models always apply ImageNet mean/std normalisation. Reduce batch size or use gradient accumulation when hitting CUDA OOM errors.',
        ]}
      />
    </LearnLayout>
  )
}