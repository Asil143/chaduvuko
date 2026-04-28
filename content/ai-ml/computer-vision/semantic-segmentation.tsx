import type { Metadata } from 'next'
import { LearnLayout } from '@/components/content/LearnLayout'
import { Callout }from '@/components/content/Callout'
import { KeyTakeaways } from '@/components/content/KeyTakeaways'
import MLPageHeader from '@/components/content/MLPageHeader'

export const metadata: Metadata = {
  title: 'Semantic Segmentation — Pixel-Level Classification — Chaduvuko',
  description:
    'U-Net architecture, skip connections, and how segmentation powers medical imaging and autonomous vehicles. Label every pixel in one forward pass.',
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

export default function SemanticSegmentationPage() {
  return (
    <LearnLayout
      title="Semantic Segmentation — Pixel-Level Classification"
      description="U-Net architecture, skip connections, and how segmentation powers medical imaging and autonomous vehicles. Label every pixel in one forward pass."
      section="Computer Vision"
      readTime="30–40 min"
      updatedAt="March 2026"
    >
      <MLPageHeader section="computer-vision" topic="semantic-segmentation" />

      {/* ══ SECTION 1 — PLAIN ENGLISH ══════════════════════════════════════════ */}
      <div style={S.sec}>
        <span style={S.tag}>Before any code — what segmentation adds over detection</span>
        <h2 style={S.h2}>
          Object detection draws rectangles. Semantic segmentation
          colours every pixel with its class — no rectangles,
          no approximations, pixel-perfect boundaries.
        </h2>

        <p style={S.p}>
          A radiologist reading a chest X-ray does not draw a box around the
          tumour and call it done. They need to know the exact boundary —
          how many cubic centimetres, which tissue is affected, where does
          it end. A bounding box cannot answer these questions.
          Semantic segmentation can. It produces a mask: every pixel
          labelled as "tumour", "healthy tissue", "background."
        </p>

        <p style={S.p}>
          Practical examples in India: Lyft and Uber's dashcam systems
          segment road, vehicles, pedestrians, and lane markings pixel-by-pixel
          for driver safety scoring. Agri-tech startups segment satellite images
          into crop types for yield forecasting. Quality control systems
          at garment factories segment defect regions in fabric images
          to measure defect area precisely.
        </p>

        <p style={S.p}>
          The output of segmentation is a mask — a 2D array of the same
          height and width as the input image, where each value is a class index.
          For a 3-class problem (background=0, road=1, vehicle=2),
          the mask contains integers 0, 1, or 2 at every pixel position.
        </p>

        <AnalogyBox>
          <p style={{ ...S.p, marginBottom: 8 }}>
            Colouring a map. Detection is like placing stickers on a map —
            one sticker per city, approximately where each city is.
            Segmentation is like colouring the map by region —
            every pixel of India is coloured by state, every coastline
            is traced exactly, every river is coloured blue.
            Much more precise, much more useful for geography.
          </p>
          <p style={{ ...S.ps, marginBottom: 0, color: '#00e676' }}>
            The challenge: to colour pixels precisely, the model needs
            to understand both the broad context (what is in the image)
            and fine spatial detail (exactly where boundaries are).
            Pooling layers in CNNs lose spatial detail. U-Net's skip connections
            restore it — that is the key architectural insight.
          </p>
        </AnalogyBox>
      </div>

      <Div />

      {/* ══ SECTION 2 — SEGMENTATION TYPES ═════════════════════════════════════ */}
      <div style={S.sec}>
        <span style={S.tag}>Three types of segmentation</span>
        <h2 style={S.h2}>Semantic vs instance vs panoptic — what each one produces</h2>

        <VisualBox label="Three segmentation tasks on the same image">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 16 }}>
            {[
              {
                type: 'Semantic Segmentation',
                color: '#1D9E75',
                output: 'Class label per pixel — all cars same colour, all pedestrians same colour',
                question: 'What class is each pixel?',
                use: 'Road scene understanding, medical imaging, satellite analysis',
                limitation: 'Cannot distinguish individual instances — two cars get same label',
              },
              {
                type: 'Instance Segmentation',
                color: '#7b61ff',
                output: 'Unique mask per object instance — car 1 and car 2 get different colours',
                question: 'Which object does each pixel belong to?',
                use: 'Counting objects, tracking individuals, robotic grasping',
                limitation: 'Does not label background pixels — gaps between instances unlabelled',
              },
              {
                type: 'Panoptic Segmentation',
                color: '#D85A30',
                output: 'Every pixel labelled — stuff (background, sky, road) + things (each car, person)',
                question: 'What class and which instance is each pixel?',
                use: 'Autonomous driving, complete scene understanding',
                limitation: 'Most complex — requires both semantic and instance heads',
              },
            ].map((item) => (
              <div key={item.type} style={{
                background: 'var(--surface)', border: `1px solid ${item.color}25`,
                borderRadius: 8, padding: '12px 12px',
                borderLeft: `3px solid ${item.color}`,
              }}>
                <div style={{ fontSize: 12, fontWeight: 700, color: item.color, fontFamily: 'var(--font-display)', marginBottom: 8 }}>
                  {item.type}
                </div>
                {[
                  ['Output', item.output],
                  ['Asks', item.question],
                  ['Used for', item.use],
                  ['Limitation', item.limitation],
                ].map(([k, v]) => (
                  <div key={k} style={{ marginBottom: 5 }}>
                    <span style={{ fontSize: 10, fontWeight: 700, color: item.color, fontFamily: 'var(--font-mono)' }}>{k}: </span>
                    <span style={{ fontSize: 11, color: 'var(--muted)' }}>{v}</span>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </VisualBox>
      </div>

      <Div />

      {/* ══ SECTION 3 — U-NET ARCHITECTURE ══════════════════════════════════════ */}
      <div style={S.sec}>
        <span style={S.tag}>The architecture</span>
        <h2 style={S.h2}>U-Net — encoder, bottleneck, decoder, and skip connections</h2>

        <p style={S.p}>
          U-Net (Ronneberger et al., 2015) was designed for medical image
          segmentation with very few training images. Its key insight:
          the encoder (contracting path) captures what is in the image
          by progressively downsampling. The decoder (expanding path)
          restores spatial resolution. Skip connections copy feature maps
          directly from encoder to decoder at each scale — providing
          fine spatial detail that pooling destroyed.
          The result: precise pixel boundaries even from a small dataset.
        </p>

        <VisualBox label="U-Net architecture — encoder, bottleneck, decoder, skip connections">
          <div style={{ overflowX: 'auto' as const }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6, minWidth: 560 }}>
              {/* Encoder path */}
              {[
                { label: 'Input', shape: '(B, 3, 256, 256)', color: '#888', side: 'both' },
                { label: 'Encoder Block 1', shape: '(B, 64, 256, 256)', color: '#378ADD', side: 'left', skip: true },
                { label: 'MaxPool → Encoder Block 2', shape: '(B, 128, 128, 128)', color: '#378ADD', side: 'left', skip: true },
                { label: 'MaxPool → Encoder Block 3', shape: '(B, 256, 64, 64)', color: '#378ADD', side: 'left', skip: true },
                { label: 'MaxPool → Encoder Block 4', shape: '(B, 512, 32, 32)', color: '#378ADD', side: 'left', skip: true },
                { label: 'Bottleneck (MaxPool + Conv)', shape: '(B, 1024, 16, 16)', color: '#7b61ff', side: 'both' },
                { label: 'Upsample + Concat + Decoder Block 4', shape: '(B, 512, 32, 32)', color: '#1D9E75', side: 'right' },
                { label: 'Upsample + Concat + Decoder Block 3', shape: '(B, 256, 64, 64)', color: '#1D9E75', side: 'right' },
                { label: 'Upsample + Concat + Decoder Block 2', shape: '(B, 128, 128, 128)', color: '#1D9E75', side: 'right' },
                { label: 'Upsample + Concat + Decoder Block 1', shape: '(B, 64, 256, 256)', color: '#1D9E75', side: 'right' },
                { label: 'Output Conv 1×1', shape: '(B, n_classes, 256, 256)', color: '#D85A30', side: 'both' },
              ].map((item, i) => (
                <div key={i} style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                  <div style={{
                    flex: 1, background: 'var(--surface)',
                    border: `1px solid ${item.color}30`,
                    borderLeft: `3px solid ${item.color}`,
                    borderRadius: 5, padding: '6px 10px',
                    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                  }}>
                    <span style={{ fontSize: 11, color: item.color }}>{item.label}</span>
                    <span style={{ fontSize: 10, color: 'var(--muted)', fontFamily: 'var(--font-mono)' }}>{item.shape}</span>
                  </div>
                  {(item as any).skip && (
                    <div style={{
                      fontSize: 9, color: '#D85A30', fontFamily: 'var(--font-mono)',
                      background: 'rgba(216,90,48,0.1)', padding: '3px 6px',
                      borderRadius: 3, whiteSpace: 'nowrap' as const,
                    }}>
                      → skip
                    </div>
                  )}
                </div>
              ))}
            </div>
            <p style={{ ...S.ps, marginBottom: 0, marginTop: 12, fontSize: 11 }}>
              Skip connections copy encoder feature maps and concatenate them with
              upsampled decoder feature maps at the same resolution.
              This gives the decoder both high-level semantics (from bottleneck)
              and fine spatial detail (from skip connections).
            </p>
          </div>
        </VisualBox>

        <CodeBlock code={`import torch
import torch.nn as nn
import torch.nn.functional as F

# ── U-Net from scratch — every component explicit ─────────────────────

class DoubleConv(nn.Module):
    """Two consecutive Conv2d + BN + ReLU — the basic U-Net block."""
    def __init__(self, in_ch: int, out_ch: int):
        super().__init__()
        self.net = nn.Sequential(
            nn.Conv2d(in_ch, out_ch, kernel_size=3, padding=1, bias=False),
            nn.BatchNorm2d(out_ch),
            nn.ReLU(inplace=True),
            nn.Conv2d(out_ch, out_ch, kernel_size=3, padding=1, bias=False),
            nn.BatchNorm2d(out_ch),
            nn.ReLU(inplace=True),
        )
    def forward(self, x): return self.net(x)

class Down(nn.Module):
    """MaxPool then DoubleConv — one encoder step."""
    def __init__(self, in_ch, out_ch):
        super().__init__()
        self.pool = nn.MaxPool2d(2)
        self.conv = DoubleConv(in_ch, out_ch)
    def forward(self, x): return self.conv(self.pool(x))

class Up(nn.Module):
    """Upsample, concatenate skip connection, then DoubleConv."""
    def __init__(self, in_ch, out_ch, bilinear=True):
        super().__init__()
        if bilinear:
            self.up   = nn.Upsample(scale_factor=2, mode='bilinear', align_corners=True)
            self.conv = DoubleConv(in_ch, out_ch)
        else:
            self.up   = nn.ConvTranspose2d(in_ch // 2, in_ch // 2, 2, stride=2)
            self.conv = DoubleConv(in_ch, out_ch)

    def forward(self, x, skip):
        x = self.up(x)
        # Pad if sizes differ (input not perfectly divisible)
        dy = skip.size(2) - x.size(2)
        dx = skip.size(3) - x.size(3)
        x  = F.pad(x, [dx//2, dx-dx//2, dy//2, dy-dy//2])
        # Concatenate skip connection — this is the key U-Net operation
        x  = torch.cat([skip, x], dim=1)
        return self.conv(x)

class UNet(nn.Module):
    def __init__(self, in_channels: int = 3, n_classes: int = 2,
                  features: list = [64, 128, 256, 512]):
        super().__init__()
        # Encoder
        self.inc   = DoubleConv(in_channels, features[0])
        self.down1 = Down(features[0], features[1])
        self.down2 = Down(features[1], features[2])
        self.down3 = Down(features[2], features[3])
        # Bottleneck
        self.down4 = Down(features[3], features[3] * 2)
        # Decoder — in_ch = skip_ch + upsampled_ch
        self.up1   = Up(features[3] * 4, features[3])
        self.up2   = Up(features[3] * 2, features[2])
        self.up3   = Up(features[2] * 2, features[1])
        self.up4   = Up(features[1] * 2, features[0])
        # Output
        self.outc  = nn.Conv2d(features[0], n_classes, kernel_size=1)

    def forward(self, x):
        # Encoder — save skip connections
        x1 = self.inc(x)     # (B, 64,  H,   W)
        x2 = self.down1(x1)  # (B, 128, H/2, W/2)
        x3 = self.down2(x2)  # (B, 256, H/4, W/4)
        x4 = self.down3(x3)  # (B, 512, H/8, W/8)
        x5 = self.down4(x4)  # (B,1024, H/16,W/16)  ← bottleneck

        # Decoder — receive skip connections
        x  = self.up1(x5, x4)  # concat → (B, 512, H/8, W/8)
        x  = self.up2(x,  x3)  # concat → (B, 256, H/4, W/4)
        x  = self.up3(x,  x2)  # concat → (B, 128, H/2, W/2)
        x  = self.up4(x,  x1)  # concat → (B, 64,  H,   W)

        return self.outc(x)     # (B, n_classes, H, W)

# ── Shape check ───────────────────────────────────────────────────────
model = UNet(in_channels=3, n_classes=4)  # 4 classes: bg, road, vehicle, pedestrian
x     = torch.randn(2, 3, 256, 256)
out   = model(x)

total = sum(p.numel() for p in model.parameters())
print(f"U-Net architecture:")
print(f"  Input:   {tuple(x.shape)}")
print(f"  Output:  {tuple(out.shape)}  ← same H×W as input, n_classes channels")
print(f"  Params:  {total:,}")
print(f"\nOutput interpretation:")
print(f"  out[b, c, h, w] = logit for class c at pixel (h, w) in batch item b")
print(f"  argmax over dim=1 → predicted class per pixel")`} />
      </div>

      <Div />

      {/* ══ SECTION 4 — TRAINING A SEGMENTATION MODEL ══════════════════════════ */}
      <div style={S.sec}>
        <span style={S.tag}>Training loop</span>
        <h2 style={S.h2}>Loss functions, masks, and the complete training pipeline</h2>

        <p style={S.p}>
          Segmentation training is similar to classification but operates
          at the pixel level. The target is not a single integer per image —
          it is a 2D mask of shape (H, W) where each value is a class index.
          The loss is cross-entropy computed over all pixels simultaneously.
          Class imbalance is severe in segmentation — background pixels
          vastly outnumber foreground pixels in most tasks.
          Weighted loss or Dice loss addresses this.
        </p>

        <ConceptBox title="Dice loss — the segmentation-specific loss function">
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: 12, lineHeight: 2.2 }}>
            <div style={{ color: '#7b61ff', marginBottom: 4 }}>
              Dice = 2 × |A ∩ B| / (|A| + |B|)
            </div>
            <div style={{ color: '#1D9E75', marginBottom: 4 }}>
              Dice Loss = 1 − Dice
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 4, fontSize: 12, color: 'var(--muted)', marginTop: 8 }}>
              <div>A = predicted mask (probabilities)  B = ground truth mask (binary)</div>
              <div>Dice = 1.0 → perfect overlap  Dice = 0.0 → no overlap</div>
              <div style={{ color: '#D85A30' }}>Advantage: handles class imbalance naturally — background pixels do not dominate</div>
              <div style={{ color: '#D85A30' }}>Production: Combined Loss = CrossEntropy + DiceLoss (best of both)</div>
            </div>
          </div>
        </ConceptBox>

        <CodeBlock code={`import torch
import torch.nn as nn
import torch.optim as optim
import numpy as np
from torch.utils.data import Dataset, DataLoader

# ── Dice loss implementation ──────────────────────────────────────────
class DiceLoss(nn.Module):
    def __init__(self, smooth: float = 1.0):
        super().__init__()
        self.smooth = smooth

    def forward(self, logits: torch.Tensor, targets: torch.Tensor) -> torch.Tensor:
        """
        logits:  (B, C, H, W) — raw model output (before softmax)
        targets: (B, H, W)    — integer class indices
        """
        n_classes = logits.size(1)
        probs     = torch.softmax(logits, dim=1)

        # One-hot encode targets: (B, H, W) → (B, C, H, W)
        one_hot = torch.zeros_like(probs)
        one_hot.scatter_(1, targets.unsqueeze(1), 1)

        # Compute Dice per class, then average
        dice_per_class = []
        for c in range(n_classes):
            pred_c = probs[:, c].reshape(-1)
            true_c = one_hot[:, c].reshape(-1)
            intersection = (pred_c * true_c).sum()
            dice = (2 * intersection + self.smooth) / (
                pred_c.sum() + true_c.sum() + self.smooth
            )
            dice_per_class.append(dice)

        return 1 - torch.stack(dice_per_class).mean()

class CombinedLoss(nn.Module):
    """CrossEntropy + Dice — standard for segmentation."""
    def __init__(self, ce_weight=0.5, dice_weight=0.5,
                  class_weights=None):
        super().__init__()
        self.ce      = nn.CrossEntropyLoss(weight=class_weights)
        self.dice    = DiceLoss()
        self.ce_w    = ce_weight
        self.dice_w  = dice_weight

    def forward(self, logits, targets):
        return self.ce_w * self.ce(logits, targets) + \
               self.dice_w * self.dice(logits, targets)

# ── Synthetic segmentation dataset ───────────────────────────────────
class SyntheticSegDataset(Dataset):
    """Simulates a road scene segmentation dataset."""
    CLASSES = {0: 'background', 1: 'road', 2: 'vehicle', 3: 'pedestrian'}

    def __init__(self, n: int = 200, img_size: int = 128):
        self.n, self.sz = n, img_size

    def __len__(self): return self.n

    def __getitem__(self, idx):
        np.random.seed(idx)
        img  = np.random.randint(30, 220, (3, self.sz, self.sz)).astype(np.float32) / 255
        mask = np.zeros((self.sz, self.sz), dtype=np.int64)

        # Road: bottom half
        mask[self.sz//2:, :] = 1
        # Vehicles: random rectangles in road region
        for _ in range(np.random.randint(1, 4)):
            x, y = np.random.randint(0, self.sz-30), np.random.randint(self.sz//2, self.sz-20)
            mask[y:y+20, x:x+30] = 2
        # Pedestrians: small rectangles
        for _ in range(np.random.randint(0, 3)):
            x, y = np.random.randint(0, self.sz-10), np.random.randint(self.sz//3, self.sz-30)
            mask[y:y+30, x:x+10] = 3

        return torch.FloatTensor(img), torch.LongTensor(mask)

# ── Full training loop ────────────────────────────────────────────────
from torch.utils.data import random_split

dataset  = SyntheticSegDataset(n=200, img_size=128)
train_ds, val_ds = random_split(dataset, [160, 40])
train_ld = DataLoader(train_ds, batch_size=8, shuffle=True)
val_ld   = DataLoader(val_ds,   batch_size=8)

# Class weights — background is ~60% of pixels
class_weights = torch.tensor([0.5, 1.5, 3.0, 4.0])  # upweight rare classes
model     = UNet(in_channels=3, n_classes=4, features=[32, 64, 128, 256])
criterion = CombinedLoss(class_weights=class_weights)
optimizer = optim.AdamW(model.parameters(), lr=1e-3, weight_decay=0.01)
scheduler = optim.lr_scheduler.CosineAnnealingLR(optimizer, T_max=20)

def pixel_accuracy(logits, targets):
    preds = logits.argmax(dim=1)
    return (preds == targets).float().mean().item()

def mean_iou(logits, targets, n_classes=4):
    preds  = logits.argmax(dim=1)
    ious   = []
    for c in range(n_classes):
        pred_c = (preds == c)
        true_c = (targets == c)
        inter  = (pred_c & true_c).sum().float()
        union  = (pred_c | true_c).sum().float()
        if union > 0:
            ious.append((inter / union).item())
    return np.mean(ious) if ious else 0.0

print("Training U-Net on road scene segmentation:")
print(f"{'Epoch':>6} {'Train loss':>12} {'Val acc':>10} {'Val mIoU':>10}")
print("─" * 42)

for epoch in range(1, 21):
    model.train()
    total_loss = 0
    for imgs, masks in train_ld:
        optimizer.zero_grad()
        logits = model(imgs)
        loss   = criterion(logits, masks)
        loss.backward()
        nn.utils.clip_grad_norm_(model.parameters(), 1.0)
        optimizer.step()
        total_loss += loss.item()
    scheduler.step()

    if epoch % 4 == 0:
        model.eval()
        accs, ious = [], []
        with torch.no_grad():
            for imgs, masks in val_ld:
                logits = model(imgs)
                accs.append(pixel_accuracy(logits, masks))
                ious.append(mean_iou(logits, masks))
        print(f"  {epoch:>4}  {total_loss/len(train_ld):>12.4f}  "
              f"{np.mean(accs):>10.4f}  {np.mean(ious):>10.4f}")`} />
      </div>

      <Div />

      {/* ══ SECTION 5 — EVALUATION METRICS ═════════════════════════════════════ */}
      <div style={S.sec}>
        <span style={S.tag}>Measuring segmentation quality</span>
        <h2 style={S.h2}>Pixel accuracy, IoU, and mIoU — the segmentation metric family</h2>

        <p style={S.p}>
          Pixel accuracy — fraction of correctly classified pixels —
          is misleading when classes are imbalanced. A model that predicts
          "background" for every pixel gets 90% pixel accuracy on a dataset
          where 90% of pixels are background. The correct metrics are
          per-class IoU and mean IoU (mIoU).
        </p>

        <CodeBlock code={`import torch
import numpy as np

def segmentation_metrics(pred_mask: torch.Tensor,
                          true_mask: torch.Tensor,
                          n_classes: int,
                          ignore_index: int = 255) -> dict:
    """
    Compute comprehensive segmentation metrics.
    pred_mask: (H, W) — predicted class indices
    true_mask: (H, W) — ground truth class indices
    """
    # Ignore unlabelled pixels (index 255 used in many datasets)
    valid = true_mask != ignore_index
    pred  = pred_mask[valid]
    true  = true_mask[valid]

    # Pixel accuracy
    pixel_acc = (pred == true).float().mean().item()

    # Per-class IoU
    class_ious = {}
    for c in range(n_classes):
        pred_c = (pred == c)
        true_c = (true == c)
        inter  = (pred_c & true_c).sum().float()
        union  = (pred_c | true_c).sum().float()
        if union > 0:
            class_ious[c] = (inter / union).item()

    # Frequency-weighted IoU — weights by class pixel frequency
    freq_iou = 0.0
    total_pixels = valid.sum().float()
    for c, iou in class_ious.items():
        freq = (true == c).sum().float() / total_pixels
        freq_iou += freq * iou

    return {
        'pixel_accuracy': pixel_acc,
        'mean_iou':       np.mean(list(class_ious.values())),
        'freq_iou':       freq_iou.item(),
        'class_iou':      class_ious,
    }

# ── Demonstrate metric sensitivity to class imbalance ─────────────────
H, W = 256, 256
n_classes = 4

# Scenario: 80% background, 15% road, 4% vehicle, 1% pedestrian
true_mask = torch.zeros(H, W, dtype=torch.long)
true_mask[H//4:,    :]           = 1  # road (bottom 75%)
true_mask[H//2:H*3//4, W//4:W//2] = 2  # vehicles
true_mask[H//3:H//3+20, W//3:W//3+10] = 3  # pedestrians

# Model that predicts everything as background
all_background = torch.zeros_like(true_mask)

# Model that predicts perfectly
perfect = true_mask.clone()

for name, pred in [('All background', all_background), ('Perfect', perfect)]:
    m = segmentation_metrics(pred, true_mask, n_classes)
    print(f"{name}:")
    print(f"  Pixel accuracy: {m['pixel_accuracy']:.4f}  ← misleading for all-bg!")
    print(f"  Mean IoU:       {m['mean_iou']:.4f}  ← correctly shows all-bg is bad")
    for c, iou in m['class_iou'].items():
        classes = ['background', 'road', 'vehicle', 'pedestrian']
        print(f"    {classes[c]:<12}: IoU = {iou:.4f}")
    print()

print("Lesson: Always report mIoU, not just pixel accuracy.")`} />
      </div>

      <Div />

      {/* ══ SECTION 6 — PRETRAINED SEGMENTATION ════════════════════════════════ */}
      <div style={S.sec}>
        <span style={S.tag}>Production approach</span>
        <h2 style={S.h2}>DeepLab and SegFormer — pretrained segmentation models for fine-tuning</h2>

        <p style={S.p}>
          U-Net trained from scratch requires thousands of labelled images.
          For most production tasks, fine-tune a pretrained segmentation model
          instead. DeepLabV3+ (Google) and SegFormer (Nvidia) are the two
          most widely used pretrained models — both available via HuggingFace
          with ImageNet-pretrained backbones and COCO/Cityscapes-pretrained heads.
        </p>

        <CodeBlock code={`# pip install transformers torch torchvision

from transformers import (
    SegformerForSemanticSegmentation,
    SegformerImageProcessor,
)
import torch
import numpy as np
from PIL import Image

# ── Load pretrained SegFormer ─────────────────────────────────────────
# b0=lightest, b5=heaviest. b2 is a good production balance.
model_name = 'nvidia/segformer-b0-finetuned-ade-512-512'
processor  = SegformerImageProcessor.from_pretrained(model_name)
model      = SegformerForSemanticSegmentation.from_pretrained(model_name)
model.eval()

print(f"SegFormer-b0:")
print(f"  Parameters: {sum(p.numel() for p in model.parameters()):,}")
print(f"  Classes:    {model.config.num_labels} (ADE20K dataset)")

# ── Inference ─────────────────────────────────────────────────────────
img = Image.fromarray(
    np.random.randint(50, 200, (512, 512, 3), dtype=np.uint8)
)
inputs  = processor(images=img, return_tensors='pt')
with torch.no_grad():
    outputs = model(**inputs)

# SegFormer outputs at 1/4 resolution — upsample to original size
logits = outputs.logits          # (1, 150, 128, 128)
upsampled = torch.nn.functional.interpolate(
    logits, size=img.size[::-1],  # (H, W)
    mode='bilinear', align_corners=False,
)
pred_mask = upsampled.argmax(dim=1).squeeze().numpy()
print(f"\nPrediction mask shape: {pred_mask.shape}")
print(f"Unique classes predicted: {np.unique(pred_mask).tolist()[:10]}")

# ── Fine-tuning SegFormer on custom classes ───────────────────────────
print("""
# Fine-tuning SegFormer for custom segmentation:

from transformers import SegformerForSemanticSegmentation, TrainingArguments, Trainer

# 1. Load with custom number of classes
model = SegformerForSemanticSegmentation.from_pretrained(
    'nvidia/segformer-b2-finetuned-ade-512-512',
    num_labels=4,                    # your classes
    id2label={0:'bg', 1:'road', 2:'vehicle', 3:'pedestrian'},
    label2id={'bg':0, 'road':1, 'vehicle':2, 'pedestrian':3},
    ignore_mismatched_sizes=True,    # replaces the head for your classes
)

# 2. Dataset returns: pixel_values (3,H,W) + labels (H,W) integer mask
# 3. TrainingArguments — same as classification but with eval_do_concat=False
# 4. Custom compute_metrics using mIoU
# 5. trainer.train()

# Key difference from classification fine-tuning:
# - Labels are 2D masks not 1D class vectors
# - Loss is CrossEntropy over all pixels (model handles this internally)
# - Evaluation uses mIoU not accuracy
""")

# ── torchvision pretrained segmentation models ─────────────────────────
import torchvision.models.segmentation as seg_models

# DeepLabV3 with ResNet50 backbone — pretrained on COCO
deeplab = seg_models.deeplabv3_resnet50(pretrained=False, num_classes=4)
# pretrained=True in production — downloads COCO weights

x   = torch.randn(2, 3, 256, 256)
out = deeplab(x)
print(f"\nDeepLabV3 output:")
print(f"  'out' key shape:  {tuple(out['out'].shape)}  ← main prediction")
print(f"  'aux' key shape:  {tuple(out['aux'].shape)}  ← auxiliary loss head")`} />
      </div>

      <Div />

      {/* ══ SECTION 7 — ERRORS ═════════════════════════════════════════════════ */}
      <div style={S.sec}>
        <span style={S.tag}>Errors you will hit</span>
        <h2 style={S.h2}>Every common segmentation mistake — explained and fixed</h2>

        <ErrorBlock
          error="CrossEntropyLoss raises ValueError: Expected target size (B, H, W) but got (B, 1, H, W)"
          cause="The mask tensor has an extra channel dimension. When loading masks with PIL or OpenCV and converting to tensor, a greyscale mask of shape (H, W) becomes (1, H, W) after ToTensor(). CrossEntropyLoss expects (B, H, W) — the extra dimension causes a shape mismatch."
          fix="Squeeze the mask tensor before computing loss: mask = mask.squeeze(1). Or in your Dataset's __getitem__, convert the PIL mask to a numpy array and then to a LongTensor directly: mask = torch.tensor(np.array(mask_pil), dtype=torch.long) — this gives shape (H, W) without the extra channel. Never use ToTensor() on segmentation masks — it adds a channel dimension and also normalises values to [0, 1], destroying integer class indices."
        />

        <ErrorBlock
          error="Model predicts only the background class for every pixel — mIoU near zero"
          cause="Severe class imbalance — background pixels dominate and standard cross-entropy minimises by predicting background everywhere. Also caused by missing class weights or using Dice loss incorrectly. With 90% background pixels, a model that predicts all-background achieves 90% pixel accuracy and near-zero CrossEntropy loss — the model finds this easy minimum and never learns to segment foreground."
          fix="Add class weights inversely proportional to frequency: weights = 1 / class_pixel_frequencies, normalised. Pass to CrossEntropyLoss: criterion = nn.CrossEntropyLoss(weight=class_weights.to(device)). Use Dice loss or combined CE + Dice — Dice is not dominated by frequent classes. Verify masks are loaded correctly: print(torch.unique(mask)) in __getitem__ to confirm foreground class indices are present."
        />

        <ErrorBlock
          error="U-Net skip connections fail — RuntimeError: sizes don't match for concatenation"
          cause="Input image dimensions are not divisible by 2^(number of pooling layers). U-Net with 4 pooling layers requires the input to be divisible by 16. An input of (256, 341) — width 341 not divisible by 16 — produces feature maps at the bottleneck that cannot be exactly upsampled back to 341 width. The encoder skip connection has 341 width but the upsampled decoder has 340."
          fix="Resize inputs to dimensions divisible by 16 (or 2^n_pooling): use T.Resize to the nearest valid size. Or add padding in the Up module's forward pass: use F.pad to match encoder and decoder spatial dimensions before concatenation. The provided UNet implementation already handles this with F.pad — ensure you use the padded version."
        />

        <ErrorBlock
          error="SegFormer logits are at 1/4 resolution — predictions look blocky and low-resolution"
          cause="SegFormer's design outputs logits at 1/4 of the input resolution (e.g. 128×128 for 512×512 input). This is by design — the hierarchical Transformer encoder downsamples aggressively. If you take argmax directly on the 1/4 resolution logits and use as the final mask, you get a coarse blocky prediction."
          fix="Always upsample SegFormer logits back to the original image resolution before computing the final mask: upsampled = F.interpolate(logits, size=(H, W), mode='bilinear', align_corners=False). Use bilinear interpolation for logits (before argmax) — never for the integer mask (after argmax). For training, compute loss on the 1/4 resolution logits with a 1/4 resolution target mask — the HuggingFace Trainer handles this automatically."
        />
      </div>

      <Div />

      {/* ══ SECTION 8 — WHAT'S NEXT ════════════════════════════════════════════ */}
      <div style={{ paddingBottom: 48, paddingTop: 8 }}>
        <span style={S.tag}>What comes next</span>
        <h2 style={S.h2}>
          You can segment any image. Next: get ImageNet-level features
          without ImageNet-level compute.
        </h2>

        <p style={S.p}>
          You have built segmentation from scratch and used pretrained models.
          Both required labelled masks — expensive to collect.
          Module 59 covers transfer learning for vision:
          how to use a ResNet or EfficientNet backbone pretrained on ImageNet
          as a feature extractor for your own task, freezing early layers
          and fine-tuning later layers. The same technique powers every
          production computer vision system at Indian startups today —
          building on ImageNet representations instead of training from scratch.
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
              Next — Module 59 · Computer Vision
            </div>
            <div style={{
              fontSize: 15, fontWeight: 700, color: 'var(--text)',
              fontFamily: 'var(--font-display)', letterSpacing: '-0.3px',
            }}>
              Transfer Learning — Fine-Tuning Pretrained Vision Models
            </div>
            <p style={{ ...S.ps, marginBottom: 0, marginTop: 4 }}>
              Feature extraction vs fine-tuning, layer freezing,
              and choosing the right backbone for your task.
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
          'Semantic segmentation assigns a class label to every pixel — output is a 2D mask of shape (H, W) with integer class indices. Unlike detection (bounding boxes) it traces exact boundaries. Unlike classification (one label per image) it works at pixel granularity.',
          'U-Net has two paths: the encoder (downsampling with MaxPool) captures what is in the image, the decoder (upsampling) restores spatial resolution. Skip connections copy encoder feature maps directly to the decoder at each scale — providing fine spatial detail that pooling destroyed. This is why U-Net produces sharp precise boundaries.',
          'Input dimensions must be divisible by 2^(number of pooling layers). U-Net with 4 pooling layers requires input divisible by 16. Use F.pad in the decoder to handle any size mismatches between encoder skip connections and upsampled decoder features.',
          'Never use ToTensor() on segmentation masks — it adds a channel dimension and normalises to [0, 1], destroying integer class indices. Convert masks with: torch.tensor(np.array(mask_pil), dtype=torch.long) for shape (H, W) with correct integer values.',
          'Pixel accuracy is misleading for imbalanced datasets — always use mIoU (mean Intersection over Union). A model predicting all-background gets high pixel accuracy but near-zero mIoU. Use class-weighted CrossEntropyLoss or Dice loss to prevent the model from collapsing to predicting the majority class.',
          'For production: fine-tune SegFormer or DeepLabV3 pretrained on ADE20K or Cityscapes. Requires far fewer labelled images than training U-Net from scratch. SegFormer outputs at 1/4 resolution — always upsample with F.interpolate(logits, size=(H,W), mode="bilinear") before argmax for the final prediction.',
        ]}
      />
    </LearnLayout>
  )
}