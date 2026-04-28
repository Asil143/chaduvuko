import type { Metadata } from 'next'
import { LearnLayout } from '@/components/content/LearnLayout'
import { Callout } from '@/components/content/Callout'
import { KeyTakeaways } from '@/components/content/KeyTakeaways'
import MLPageHeader from '@/components/content/MLPageHeader'

export const metadata: Metadata = {
  title: 'Transfer Learning — Fine-Tuning Pretrained Vision Models — Chaduvuko',
  description:
    'Feature extraction vs fine-tuning, layer freezing, and choosing the right backbone. Get ImageNet-level features without ImageNet-level compute.',
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

export default function TransferLearningPage() {
  return (
    <LearnLayout
      title="Transfer Learning — Fine-Tuning Pretrained Vision Models"
      description="Feature extraction vs fine-tuning, layer freezing, and choosing the right backbone. Get ImageNet-level features without ImageNet-level compute."
      section="Computer Vision"
      readTime="30–40 min"
      updatedAt="March 2026"
    >
      <MLPageHeader section="computer-vision" topic="transfer-learning" />

      {/* ══ SECTION 1 — PLAIN ENGLISH ══════════════════════════════════════════ */}
      <div style={S.sec}>
        <span style={S.tag}>Before any code — why transfer learning dominates production</span>
        <h2 style={S.h2}>
          Training ResNet50 from scratch on ImageNet took 29 hours on
          8 V100 GPUs. Transfer learning uses those weights as a starting
          point and fine-tunes to your task in 20 minutes on one GPU.
          This is how every production vision system at Indian startups is built.
        </h2>

        <p style={S.p}>
          Module 46 introduced the concept — take a pretrained backbone,
          replace the classifier head, fine-tune. This module goes deep
          on everything that matters in practice: which layers to freeze,
          which learning rates to use per layer group, how to choose
          the right backbone for your constraints, and when feature
          extraction beats fine-tuning.
        </p>

        <p style={S.p}>
          The intuition: the first layers of any image model learn universal
          low-level features — edges, textures, gradients. These are the
          same whether the task is classifying fashion products or detecting
          defects in circuit boards. Later layers learn task-specific
          high-level features. Transfer learning reuses the universal layers
          and only retrains the task-specific ones.
        </p>

        <AnalogyBox>
          <p style={{ ...S.p, marginBottom: 8 }}>
            A civil engineer who has spent 10 years building roads in India
            knows structural principles, material properties, load calculations —
            universal engineering knowledge. To now build bridges, they do not
            retrain their entire education. They learn bridge-specific design
            on top of existing expertise. That is transfer learning.
          </p>
          <p style={{ ...S.ps, marginBottom: 0, color: '#00e676' }}>
            Early layers of a pretrained CNN have learned to detect edges,
            curves, and textures from 1.2 million ImageNet images.
            That knowledge transfers perfectly to detecting fabric defects,
            product damage, or medical anomalies. Only the final task-specific
            layers need to learn from your small dataset.
          </p>
        </AnalogyBox>

        <Callout type="tip">
          The standard recipe used by ML teams at Shopify, Amazon, and DoorDash:
          ResNet50 or EfficientNet-B3 pretrained on ImageNet →
          replace final FC layer → fine-tune with differential learning rates →
          evaluate with 5-fold CV. This produces production-quality models
          with 500–5,000 labelled images in under 2 hours of GPU time.
        </Callout>
      </div>

      <Div />

      {/* ══ SECTION 2 — FEATURE EXTRACTION VS FINE-TUNING ═══════════════════════ */}
      <div style={S.sec}>
        <span style={S.tag}>The two strategies</span>
        <h2 style={S.h2}>Feature extraction vs fine-tuning — when each one wins</h2>

        <VisualBox label="Feature extraction vs fine-tuning — what gets updated">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
            {[
              {
                name: 'Feature Extraction',
                color: '#378ADD',
                frozen: 'ALL backbone layers (early + late)',
                trained: 'Classification head only',
                lr: 'Standard lr (1e-3)',
                when: 'Very small dataset (<500 images). Domain very similar to ImageNet. Need fast iteration. No GPU.',
                risk: 'Backbone features may not be task-specific enough.',
                speed: 'Fast — few trainable params',
              },
              {
                name: 'Fine-Tuning',
                color: '#1D9E75',
                frozen: 'Early backbone layers (edges, textures)',
                trained: 'Later backbone layers + head',
                lr: 'Differential: tiny for backbone, normal for head',
                when: 'Moderate dataset (500–50k images). Domain differs from ImageNet (medical, satellite, product). Best accuracy required.',
                risk: 'Catastrophic forgetting if lr too high.',
                speed: 'Slower — more trainable params',
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
                  ['Frozen', item.frozen],
                  ['Trained', item.trained],
                  ['Learning rate', item.lr],
                  ['Best when', item.when],
                  ['Risk', item.risk],
                  ['Speed', item.speed],
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

        <CodeBlock code={`import torch
import torch.nn as nn
import torchvision.models as models

# ── Strategy 1: Feature extraction — freeze everything except head ─────
def build_feature_extractor(n_classes: int, backbone: str = 'resnet50'):
    model = getattr(models, backbone)(weights='IMAGENET1K_V2')

    # Freeze ALL backbone parameters
    for param in model.parameters():
        param.requires_grad = False

    # Replace the head — only this trains
    in_features = model.fc.in_features
    model.fc = nn.Sequential(
        nn.Dropout(0.3),
        nn.Linear(in_features, n_classes),
    )
    # model.fc is unfrozen by default

    trainable = sum(p.numel() for p in model.parameters() if p.requires_grad)
    total     = sum(p.numel() for p in model.parameters())
    print(f"Feature extractor: {trainable:,} / {total:,} trainable ({trainable/total*100:.2f}%)")
    return model

# ── Strategy 2: Fine-tuning — freeze early, unfreeze late ─────────────
def build_finetune_model(n_classes: int, backbone: str = 'resnet50',
                          unfreeze_layers: list = ['layer3', 'layer4', 'fc']):
    model = getattr(models, backbone)(weights='IMAGENET1K_V2')

    # Freeze everything first
    for param in model.parameters():
        param.requires_grad = False

    # Selectively unfreeze later layers
    for layer_name in unfreeze_layers:
        layer = getattr(model, layer_name, None)
        if layer:
            for param in layer.parameters():
                param.requires_grad = True

    # Replace head
    in_features = model.fc.in_features
    model.fc    = nn.Sequential(
        nn.Dropout(0.4),
        nn.Linear(in_features, 512),
        nn.ReLU(),
        nn.Dropout(0.3),
        nn.Linear(512, n_classes),
    )

    trainable = sum(p.numel() for p in model.parameters() if p.requires_grad)
    total     = sum(p.numel() for p in model.parameters())
    print(f"Fine-tune model:   {trainable:,} / {total:,} trainable ({trainable/total*100:.2f}%)")
    return model

# ── Compare both ──────────────────────────────────────────────────────
fe_model  = build_feature_extractor(n_classes=6)
ft_model  = build_finetune_model(n_classes=6, unfreeze_layers=['layer3','layer4','fc'])

# Verify: which layers are trainable in fine-tune model?
print("\nTrainable layers in fine-tune model:")
for name, param in ft_model.named_parameters():
    if param.requires_grad:
        print(f"  ✓ {name}")`} />
      </div>

      <Div />

      {/* ══ SECTION 3 — DIFFERENTIAL LEARNING RATES ═════════════════════════════ */}
      <div style={S.sec}>
        <span style={S.tag}>The most important fine-tuning technique</span>
        <h2 style={S.h2}>Differential learning rates — tiny lr for backbone, normal lr for head</h2>

        <p style={S.p}>
          The biggest mistake in fine-tuning: using the same learning rate
          for all layers. Early backbone layers contain universal features
          learned from 1.2 million images — they need tiny updates
          (lr ≈ 1e-5) to preserve that knowledge. The new classification
          head is randomly initialised and needs large updates (lr ≈ 1e-3)
          to learn quickly. Using 1e-3 on backbone layers causes catastrophic
          forgetting. Using 1e-5 on the head causes slow convergence.
          Differential learning rates solve both.
        </p>

        <ConceptBox title="Differential lr — layer groups with different learning rates">
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: 12, lineHeight: 2.2 }}>
            <div style={{ color: '#888', marginBottom: 4 }}>Layer group → learning rate:</div>
            <div style={{ color: '#D85A30', paddingLeft: 12 }}>Early layers (layer1, layer2)  →  lr × 0.01  =  1e-5</div>
            <div style={{ color: '#BA7517', paddingLeft: 12 }}>Mid layers  (layer3)            →  lr × 0.1   =  1e-4</div>
            <div style={{ color: '#1D9E75', paddingLeft: 12 }}>Late layers (layer4)            →  lr × 1.0   =  1e-3</div>
            <div style={{ color: '#7b61ff', paddingLeft: 12 }}>Head        (fc)                →  lr × 10    =  1e-2</div>
            <div style={{ fontSize: 11, color: 'var(--muted)', marginTop: 8 }}>
              Base lr = 1e-3. Multipliers decrease towards input (earlier = more frozen).
            </div>
          </div>
        </ConceptBox>

        <CodeBlock code={`import torch
import torch.nn as nn
import torch.optim as optim
import torchvision.models as models
import torchvision.transforms as T
import numpy as np
from PIL import Image
from torch.utils.data import Dataset, DataLoader
from sklearn.metrics import accuracy_score
import copy, warnings
warnings.filterwarnings('ignore')

torch.manual_seed(42)

# ── Build model ───────────────────────────────────────────────────────
model = models.resnet50(weights='IMAGENET1K_V2')
model.fc = nn.Sequential(
    nn.Dropout(0.4),
    nn.Linear(model.fc.in_features, 6),
)

# ── Differential learning rates — param groups ────────────────────────
BASE_LR = 1e-3

param_groups = [
    {'params': model.layer1.parameters(), 'lr': BASE_LR * 0.01},
    {'params': model.layer2.parameters(), 'lr': BASE_LR * 0.01},
    {'params': model.layer3.parameters(), 'lr': BASE_LR * 0.1},
    {'params': model.layer4.parameters(), 'lr': BASE_LR * 1.0},
    {'params': model.fc.parameters(),     'lr': BASE_LR * 10},
    # Freeze layer0 (conv1 + bn1) — very early edge detectors, never touch
    # {'params': model.layer0.parameters(), 'lr': 0},   # effectively frozen
]

# Freeze layer0 explicitly
for param in model.conv1.parameters(): param.requires_grad = False
for param in model.bn1.parameters():   param.requires_grad = False

optimizer = optim.AdamW(param_groups, weight_decay=0.01)

# Verify lr per group
print("Differential learning rates:")
group_names = ['layer1', 'layer2', 'layer3', 'layer4', 'fc']
for name, group in zip(group_names, optimizer.param_groups):
    n_params = sum(p.numel() for p in group['params'])
    print(f"  {name:<8}: lr={group['lr']:.0e}  params={n_params:,}")

# ── Gradual unfreezing — start frozen, unfreeze layer by layer ────────
# Alternative to differential lr — especially good for very small datasets

def gradual_unfreeze_schedule(model, epoch):
    """
    Epoch 1-5:   Only head trains
    Epoch 6-10:  Unfreeze layer4
    Epoch 11-15: Unfreeze layer3
    Epoch 16+:   Unfreeze layer2
    """
    # Start: freeze all backbone
    for param in model.parameters():
        param.requires_grad = False
    for param in model.fc.parameters():
        param.requires_grad = True

    if epoch >= 6:
        for param in model.layer4.parameters():
            param.requires_grad = True
    if epoch >= 11:
        for param in model.layer3.parameters():
            param.requires_grad = True
    if epoch >= 16:
        for param in model.layer2.parameters():
            param.requires_grad = True

    trainable = sum(p.numel() for p in model.parameters() if p.requires_grad)
    total     = sum(p.numel() for p in model.parameters())
    return trainable, total

print("\nGradual unfreezing schedule:")
test_model = models.resnet50(weights=None)
test_model.fc = nn.Linear(test_model.fc.in_features, 6)
for epoch in [1, 6, 11, 16, 20]:
    tr, tot = gradual_unfreeze_schedule(test_model, epoch)
    print(f"  Epoch {epoch:2d}: {tr:>8,} / {tot:,} trainable ({tr/tot*100:.1f}%)")`} />
      </div>

      <Div />

      {/* ══ SECTION 4 — BACKBONE SELECTION ══════════════════════════════════════ */}
      <div style={S.sec}>
        <span style={S.tag}>Choosing the right backbone</span>
        <h2 style={S.h2}>ResNet vs EfficientNet vs ViT — which backbone for which constraint</h2>

        <p style={S.p}>
          The backbone is the pretrained feature extractor. Choosing the right
          one depends on your accuracy requirement, inference latency budget,
          available GPU memory, and dataset size. There is no universal best —
          EfficientNet-B0 is better than ResNet50 for mobile deployment,
          ViT-B/16 is better for large datasets and highest accuracy,
          ResNet18 is better when training data is very scarce.
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 24 }}>
          {[
            {
              name: 'ResNet18',
              params: '11M', top1: '69.8%', color: '#888',
              latency: '~2ms', mem: '~1GB',
              when: 'Very small dataset (<500 images) or extreme latency constraint. Fewer params = less overfitting.',
              pytorch: "models.resnet18(weights='IMAGENET1K_V1')",
            },
            {
              name: 'ResNet50',
              params: '25M', top1: '76.1%', color: '#378ADD',
              latency: '~4ms', mem: '~2GB',
              when: 'Default choice. Well-studied, reliable, widely supported. Good balance for 1k–50k images.',
              pytorch: "models.resnet50(weights='IMAGENET1K_V2')",
            },
            {
              name: 'EfficientNet-B3',
              params: '12M', top1: '82.0%', color: '#1D9E75',
              latency: '~5ms', mem: '~2GB',
              when: 'Better accuracy than ResNet50 with similar params. Best choice when accuracy matters most.',
              pytorch: "models.efficientnet_b3(weights='IMAGENET1K_V1')",
            },
            {
              name: 'EfficientNet-B0',
              params: '5M', top1: '77.7%', color: '#D85A30',
              latency: '~1ms', mem: '~1GB',
              when: 'Mobile/edge deployment. TFLite export. Latency under 2ms required.',
              pytorch: "models.efficientnet_b0(weights='IMAGENET1K_V1')",
            },
            {
              name: 'ViT-B/16',
              params: '86M', top1: '81.1%', color: '#7b61ff',
              latency: '~8ms', mem: '~4GB',
              when: 'Large dataset (50k+ images). Highest accuracy required. Full fine-tuning affordable.',
              pytorch: "models.vit_b_16(weights='IMAGENET1K_V1')",
            },
          ].map((item) => (
            <div key={item.name} style={{
              background: 'var(--surface)', border: `1px solid ${item.color}25`,
              borderRadius: 8, padding: '10px 14px',
              display: 'grid', gridTemplateColumns: '100px 55px 55px 60px 70px 1fr',
              gap: 8, alignItems: 'center',
              borderLeft: `3px solid ${item.color}`,
            }}>
              <span style={{ fontSize: 12, fontWeight: 700, color: item.color, fontFamily: 'var(--font-mono)' }}>{item.name}</span>
              <span style={{ fontSize: 11, color: 'var(--muted)', fontFamily: 'var(--font-mono)' }}>{item.params}</span>
              <span style={{ fontSize: 11, color: item.color, fontFamily: 'var(--font-mono)' }}>{item.top1}</span>
              <span style={{ fontSize: 11, color: 'var(--muted)' }}>{item.latency}</span>
              <span style={{ fontSize: 11, color: 'var(--muted)' }}>{item.mem}</span>
              <span style={{ fontSize: 11, color: 'var(--muted)' }}>{item.when}</span>
            </div>
          ))}
        </div>

        <CodeBlock code={`import torch
import torch.nn as nn
import torchvision.models as models
import time

# ── Load and adapt any backbone in a unified way ──────────────────────
def build_classifier(backbone_name: str, n_classes: int,
                      dropout: float = 0.3) -> nn.Module:
    """
    Universal function to build a transfer learning classifier
    from any torchvision backbone.
    """
    weights_map = {
        'resnet18':      'IMAGENET1K_V1',
        'resnet50':      'IMAGENET1K_V2',
        'resnet101':     'IMAGENET1K_V2',
        'efficientnet_b0': 'IMAGENET1K_V1',
        'efficientnet_b3': 'IMAGENET1K_V1',
        'vit_b_16':      'IMAGENET1K_V1',
        'convnext_small': 'IMAGENET1K_V1',
    }
    weights = weights_map.get(backbone_name, 'IMAGENET1K_V1')
    model   = getattr(models, backbone_name)(weights=weights)

    # Get the in_features of the final classification layer
    # Different backbones use different attribute names
    if hasattr(model, 'fc'):           # ResNet family
        in_features = model.fc.in_features
        model.fc    = nn.Sequential(
            nn.Dropout(dropout),
            nn.Linear(in_features, n_classes),
        )
    elif hasattr(model, 'classifier'): # EfficientNet, ConvNeXt
        if isinstance(model.classifier, nn.Sequential):
            in_features = model.classifier[-1].in_features
        else:
            in_features = model.classifier.in_features
        model.classifier = nn.Sequential(
            nn.Dropout(dropout),
            nn.Linear(in_features, n_classes),
        )
    elif hasattr(model, 'heads'):      # ViT
        in_features   = model.heads.head.in_features
        model.heads.head = nn.Sequential(
            nn.Dropout(dropout),
            nn.Linear(in_features, n_classes),
        )

    return model

# ── Benchmark latency for each backbone ──────────────────────────────
N_CLASSES = 6
dummy     = torch.randn(1, 3, 224, 224)

print(f"{'Backbone':<20} {'Params':>8} {'Latency (ms)':>14}")
print("─" * 46)

for name in ['resnet18', 'resnet50', 'efficientnet_b0', 'efficientnet_b3']:
    model = build_classifier(name, N_CLASSES)
    model.eval()

    params = sum(p.numel() for p in model.parameters()) / 1e6

    # Warmup
    with torch.no_grad():
        for _ in range(5): _ = model(dummy)

    # Time
    start = time.time()
    with torch.no_grad():
        for _ in range(50): _ = model(dummy)
    ms = (time.time() - start) / 50 * 1000

    print(f"  {name:<18}  {params:>6.1f}M  {ms:>12.2f}ms")`} />
      </div>

      <Div />

      {/* ══ SECTION 5 — COMPLETE PIPELINE ═══════════════════════════════════════ */}
      <div style={S.sec}>
        <span style={S.tag}>The full recipe</span>
        <h2 style={S.h2}>Complete transfer learning pipeline — Shopify product classification</h2>

        <CodeBlock code={`import torch
import torch.nn as nn
import torch.optim as optim
import torchvision.models as models
import torchvision.transforms as T
import numpy as np
from PIL import Image
from torch.utils.data import Dataset, DataLoader
from sklearn.metrics import accuracy_score, classification_report
import copy, warnings
warnings.filterwarnings('ignore')

torch.manual_seed(42)
np.random.seed(42)

CATEGORIES = ['kurta', 'saree', 'jeans', 'sneakers', 'watch', 'handbag']
N_CLASSES   = len(CATEGORIES)
IMAGENET_MEAN = [0.485, 0.456, 0.406]
IMAGENET_STD  = [0.229, 0.224, 0.225]

# ── Dataset ───────────────────────────────────────────────────────────
class ShopifyDataset(Dataset):
    def __init__(self, n=500, split='train'):
        np.random.seed(42 if split == 'train' else 7)
        self.labels = np.random.randint(0, N_CLASSES, n)
        self.bias   = np.array([
            [.8,.3,.2],[.2,.7,.5],[.2,.3,.8],
            [.7,.7,.2],[.5,.5,.5],[.6,.2,.6],
        ])
        if split == 'train':
            self.transform = T.Compose([
                T.RandomResizedCrop(224, scale=(0.7, 1.0)),
                T.RandomHorizontalFlip(),
                T.ColorJitter(brightness=0.3, contrast=0.3, saturation=0.2),
                T.ToTensor(),
                T.Normalize(IMAGENET_MEAN, IMAGENET_STD),
            ])
        else:
            self.transform = T.Compose([
                T.Resize(256), T.CenterCrop(224),
                T.ToTensor(),
                T.Normalize(IMAGENET_MEAN, IMAGENET_STD),
            ])

    def __len__(self): return len(self.labels)

    def __getitem__(self, i):
        b   = self.bias[self.labels[i]]
        img = np.random.randn(64, 64, 3) * 0.15
        for c in range(3): img[:, :, c] += b[c]
        img = np.clip(img, 0, 1)
        img = Image.fromarray((img * 255).astype(np.uint8))
        return self.transform(img), self.labels[i]

train_ds = ShopifyDataset(400, 'train')
val_ds   = ShopifyDataset(100, 'val')
train_ld = DataLoader(train_ds, 32, shuffle=True,  drop_last=True)
val_ld   = DataLoader(val_ds,   32, shuffle=False)

# ── Model with differential lr ─────────────────────────────────────────
model   = models.resnet50(weights='IMAGENET1K_V2')
in_feat = model.fc.in_features
model.fc = nn.Sequential(nn.Dropout(0.4), nn.Linear(in_feat, N_CLASSES))

# Freeze layer1 and layer2
for param in model.layer1.parameters(): param.requires_grad = False
for param in model.layer2.parameters(): param.requires_grad = False

BASE_LR  = 1e-3
optimizer = optim.AdamW([
    {'params': model.layer3.parameters(), 'lr': BASE_LR * 0.1},
    {'params': model.layer4.parameters(), 'lr': BASE_LR * 1.0},
    {'params': model.fc.parameters(),     'lr': BASE_LR * 10},
], weight_decay=0.01)

criterion = nn.CrossEntropyLoss(label_smoothing=0.1)
scheduler = optim.lr_scheduler.CosineAnnealingLR(optimizer, T_max=20)

# ── Training loop with early stopping ────────────────────────────────
best_acc, best_wts, patience = 0.0, None, 0

print(f"Fine-tuning ResNet50 on Shopify product categories:")
print(f"{'Epoch':>6} {'Train loss':>12} {'Val acc':>10}")
print("─" * 32)

for epoch in range(1, 21):
    model.train()
    total_loss = 0
    for imgs, labels in train_ld:
        optimizer.zero_grad()
        loss = criterion(model(imgs), labels)
        loss.backward()
        nn.utils.clip_grad_norm_(model.parameters(), 1.0)
        optimizer.step()
        total_loss += loss.item()
    scheduler.step()

    model.eval()
    all_preds, all_labels = [], []
    with torch.no_grad():
        for imgs, labels in val_ld:
            preds = model(imgs).argmax(1)
            all_preds.extend(preds.numpy())
            all_labels.extend(labels.numpy())

    val_acc = accuracy_score(all_labels, all_preds)
    if epoch % 4 == 0:
        print(f"  {epoch:>4}  {total_loss/len(train_ld):>12.4f}  {val_acc:>10.4f}")

    if val_acc > best_acc:
        best_acc, best_wts = val_acc, copy.deepcopy(model.state_dict())
        patience = 0
    else:
        patience += 1
        if patience >= 6:
            print(f"  Early stop at epoch {epoch}")
            break

model.load_state_dict(best_wts)
print(f"\nBest val accuracy: {best_acc:.4f}")

# ── Export for production ─────────────────────────────────────────────
# Save
torch.save({'model_state': model.state_dict(),
             'categories': CATEGORIES,
             'backbone': 'resnet50'}, 'meesho_classifier.pt')

# ONNX export for deployment
dummy = torch.randn(1, 3, 224, 224)
torch.onnx.export(
    model, dummy, 'meesho_classifier.onnx',
    input_names=['image'], output_names=['logits'],
    dynamic_axes={'image': {0: 'batch'}, 'logits': {0: 'batch'}},
    opset_version=17,
)
print("Exported: meesho_classifier.pt + meesho_classifier.onnx")`} />
      </div>

      <Div />

      {/* ══ SECTION 6 — ERRORS ═════════════════════════════════════════════════ */}
      <div style={S.sec}>
        <span style={S.tag}>Errors you will hit</span>
        <h2 style={S.h2}>Every common transfer learning mistake — explained and fixed</h2>

        <ErrorBlock
          error="Fine-tuned model performs worse than feature extraction baseline"
          cause="Learning rate for backbone layers is too high — catastrophic forgetting overwrites ImageNet features in the first few epochs. The pretrained representations degrade faster than the head can adapt. With lr=1e-3 on layer1 and layer2, the low-level edge detectors are destroyed within 2 epochs."
          fix="Use differential learning rates: backbone lr = 1e-5, head lr = 1e-3. Freeze layer1 and layer2 entirely for the first 5 epochs. Only unfreeze them after the head has stabilised. Add linear warmup for backbone layers: start at 0 and linearly increase to target lr over 3 epochs. Check by printing the backbone's output activations at epoch 1 — if std is much larger than 1.0, the lr is too high."
        />

        <ErrorBlock
          error="model.fc replacement fails for EfficientNet — AttributeError: 'Sequential' has no attribute 'in_features'"
          cause="EfficientNet's classifier is a Sequential module, not a single Linear layer. Accessing model.classifier.in_features fails because Sequential does not have in_features. Different backbones use different attribute names and structures: ResNet uses model.fc (a Linear), EfficientNet uses model.classifier (a Sequential ending in Linear), ViT uses model.heads.head (a Linear)."
          fix="Check the final layer structure first: print(model.classifier) for EfficientNet. Access in_features on the last Linear in the Sequential: in_features = model.classifier[-1].in_features. Use the universal build_classifier() function from Section 4 which handles all backbone families. Or use timm (pip install timm) which provides a unified model.reset_classifier(n_classes) API across all backbones."
        />

        <ErrorBlock
          error="Validation accuracy plateaus at random baseline — model not learning despite low training loss"
          cause="Normalisation mismatch — ImageNet normalisation not applied or applied with wrong statistics. If the model was pretrained with ImageNet normalisation (mean=[0.485,0.456,0.406], std=[0.229,0.224,0.225]) but inference receives raw [0,1] pixels, the feature activations are completely different from what the pretrained weights expect. The backbone produces meaningless features and the head cannot learn."
          fix="Always apply T.Normalize(mean=[0.485,0.456,0.406], std=[0.229,0.224,0.225]) as the last step in both training and validation transforms. Verify by printing a batch mean and std after normalisation — channel means should be near 0 and stds near 1. Print the first batch activations from layer1 — if all near zero or exploding, normalisation is wrong."
        />

        <ErrorBlock
          error="ONNX export fails — RuntimeError: Exporting the operator adaptive_avg_pool2d to ONNX is not supported"
          cause="Some PyTorch operators do not have ONNX equivalents in older opset versions. AdaptiveAvgPool2d with a non-trivial output size (not 1×1) causes issues in opset versions below 9. Also caused by custom layers or non-standard operations in the head that the ONNX exporter does not recognise."
          fix="Use opset_version=17 (current stable): torch.onnx.export(..., opset_version=17). Replace AdaptiveAvgPool2d with a fixed AvgPool2d where possible. Verify export with: import onnx; onnx.checker.check_model('model.onnx'). For complex models use torch.export() (PyTorch 2.0+) or torchscript as an alternative: scripted = torch.jit.script(model); scripted.save('model.pt')."
        />
      </div>

      <Div />

      {/* ══ SECTION 7 — WHAT'S NEXT ════════════════════════════════════════════ */}
      <div style={{ paddingBottom: 48, paddingTop: 8 }}>
        <span style={S.tag}>What comes next</span>
        <h2 style={S.h2}>
          The Computer Vision section is complete.
          Section 10 — Generative AI — begins next.
        </h2>

        <p style={S.p}>
          You have completed the full Computer Vision section: image fundamentals,
          data augmentation, object detection, semantic segmentation, and transfer
          learning. You can build, train, evaluate, and deploy any standard
          vision system. Section 10 shifts from recognising images to generating them —
          GANs, VAEs, diffusion models, and the architecture behind Stable Diffusion.
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
              Next — Section 10 · Generative AI
            </div>
            <div style={{
              fontSize: 15, fontWeight: 700, color: 'var(--text)',
              fontFamily: 'var(--font-display)', letterSpacing: '-0.3px',
            }}>
              What is Generative AI?
            </div>
            <p style={{ ...S.ps, marginBottom: 0, marginTop: 4 }}>
              GANs, VAEs, diffusion, and LLMs — what makes each one generative,
              and when each one is the right architecture.
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
          'Transfer learning reuses weights from a model pretrained on a large dataset (ImageNet) as the starting point for a new task. Early layers capture universal features (edges, textures) that transfer across all vision tasks. Only later layers and the classification head need retraining on your specific data.',
          'Feature extraction freezes all backbone layers and only trains the new head — best for very small datasets (<500 images) or when domain is very similar to ImageNet. Fine-tuning unfreezes later backbone layers — best for moderate datasets (500–50k) and when highest accuracy is needed.',
          'Differential learning rates are essential for fine-tuning: early layers get lr × 0.01, mid layers lr × 0.1, late layers lr × 1.0, head lr × 10. Using the same lr for all layers causes catastrophic forgetting in early layers and slow convergence in the head simultaneously.',
          'Backbone selection depends on constraints: ResNet18 for very small datasets or extreme latency, ResNet50 for the default production choice, EfficientNet-B3 for best accuracy at similar parameter count, EfficientNet-B0 for mobile/edge deployment, ViT-B/16 for large datasets needing highest accuracy.',
          'Always apply ImageNet normalisation (mean=[0.485,0.456,0.406], std=[0.229,0.224,0.225]) for any ImageNet-pretrained backbone. Missing normalisation is the single most common reason a fine-tuned model fails to learn — activations are in the wrong range and the pretrained features are meaningless.',
          'Export trained models to ONNX (opset_version=17) for production deployment. ONNX runs on CPU, GPU, and edge devices without PyTorch dependency. Always validate with onnx.checker.check_model() after export. Use dynamic_axes to support variable batch sizes in deployment.',
        ]}
      />
    </LearnLayout>
  )
}
