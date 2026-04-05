import type { Metadata } from 'next'
import { LearnLayout } from '@/components/content/LearnLayout'
import { Callout } from '@/components/content/Callout'
import { KeyTakeaways } from '@/components/content/KeyTakeaways'
import MLPageHeader from '@/components/content/MLPageHeader'

export const metadata: Metadata = {
  title: 'Object Detection — YOLO and Feature Pyramids — Chaduvuko',
  description:
    'Anchor boxes, IoU, non-maximum suppression, and why YOLO became the production standard for real-time detection. Built from concepts to code.',
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

export default function ObjectDetectionPage() {
  return (
    <LearnLayout
      title="Object Detection — YOLO and Feature Pyramids"
      description="Anchor boxes, IoU, non-maximum suppression, and why YOLO became the production standard for real-time detection. Built from concepts to code."
      section="Computer Vision"
      readTime="40–45 min"
      updatedAt="March 2026"
    >
      <MLPageHeader section="computer-vision" topic="object-detection" />

      {/* ══ SECTION 1 — PLAIN ENGLISH ══════════════════════════════════════════ */}
      <div style={S.sec}>
        <span style={S.tag}>Before any code — what object detection adds over classification</span>
        <h2 style={S.h2}>
          Classification asks: what is in this image?
          Object detection asks: what is in this image, where exactly is it,
          and how many of them are there?
          That extra "where" changes everything about the architecture.
        </h2>

        <p style={S.p}>
          Meesho's quality control system needs to detect defective stitching
          in product photos — not just classify "defective" vs "good" but
          locate exactly where the defect is. Swiggy's delivery verification
          system detects and reads the order number on the packaging.
          A traffic camera system counts vehicles and detects lane violations.
          All require object detection — bounding boxes around every object
          of interest in the image.
        </p>

        <p style={S.p}>
          The output of a detection model is a list of bounding boxes.
          Each box has four coordinates (x_center, y_center, width, height),
          a confidence score (how sure is the model an object is here),
          and a class label (what kind of object). One image can produce
          dozens of boxes — one per detected object instance.
        </p>

        <AnalogyBox>
          <p style={{ ...S.p, marginBottom: 8 }}>
            Classification is multiple choice: "Is this a cat, dog, or bird?"
            Object detection is open-ended search: "Find every animal in this
            photo, draw a box around each one, and tell me what kind it is."
            The search problem is fundamentally harder — the model must check
            every possible location and scale simultaneously.
          </p>
          <p style={{ ...S.ps, marginBottom: 0, color: '#00e676' }}>
            YOLO's insight: instead of searching sequentially, divide the image
            into a grid and have every grid cell predict boxes simultaneously.
            One forward pass, all detections at once. Fast enough for real-time
            video at 30+ frames per second.
          </p>
        </AnalogyBox>

        <Callout type="tip">
          This module covers the concepts and key algorithms from scratch
          (IoU, NMS, anchor boxes) then shows production usage with
          Ultralytics YOLOv8 — the standard library used in Indian
          ML teams for real-time detection.
          Install: <span style={S.code as React.CSSProperties}>pip install ultralytics</span>.
        </Callout>
      </div>

      <Div />

      {/* ══ SECTION 2 — BOUNDING BOXES AND IOU ══════════════════════════════════ */}
      <div style={S.sec}>
        <span style={S.tag}>The core metric</span>
        <h2 style={S.h2}>Bounding boxes and IoU — how detection accuracy is measured</h2>

        <p style={S.p}>
          A bounding box is defined by four numbers. Two formats are common:
          corner format (x_min, y_min, x_max, y_max) and centre format
          (x_center, y_center, width, height). YOLO uses centre format.
          COCO annotations use corner format. Always know which format
          your data and model expect.
        </p>

        <p style={S.p}>
          Intersection over Union (IoU) measures how well a predicted box
          matches the ground truth box. It is the area of overlap divided
          by the area of the union. IoU = 1.0 is a perfect match.
          IoU = 0.0 means no overlap. The standard threshold is IoU ≥ 0.5
          for a detection to count as correct (True Positive).
        </p>

        <VisualBox label="IoU — intersection over union visualised">
          <div style={{ display: 'flex', gap: 24, alignItems: 'flex-start', flexWrap: 'wrap' as const }}>
            <svg width="200" height="180" viewBox="0 0 200 180">
              {/* Ground truth box */}
              <rect x="30" y="40" width="100" height="100"
                fill="rgba(29,158,117,0.15)" stroke="#1D9E75"
                strokeWidth="2" strokeDasharray="5,3" />
              <text x="80" y="35" textAnchor="middle" fontSize="10"
                fill="#1D9E75" fontFamily="monospace">Ground truth</text>
              {/* Predicted box */}
              <rect x="70" y="70" width="100" height="90"
                fill="rgba(55,138,221,0.15)" stroke="#378ADD"
                strokeWidth="2" />
              <text x="120" y="175" textAnchor="middle" fontSize="10"
                fill="#378ADD" fontFamily="monospace">Predicted</text>
              {/* Intersection */}
              <rect x="70" y="70" width="60" height="70"
                fill="rgba(123,97,255,0.3)" stroke="#7b61ff"
                strokeWidth="1.5" />
              <text x="100" y="108" textAnchor="middle" fontSize="9"
                fill="#7b61ff" fontFamily="monospace">∩</text>
            </svg>
            <div style={{ flex: 1, minWidth: 200 }}>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: 12, lineHeight: 2.2 }}>
                <div style={{ color: '#1D9E75' }}>GT area:     100 × 100 = 10,000</div>
                <div style={{ color: '#378ADD' }}>Pred area:   100 × 90  = 9,000</div>
                <div style={{ color: '#7b61ff' }}>Intersection: 60 × 70  = 4,200</div>
                <div style={{ color: 'var(--muted)' }}>Union: 10,000 + 9,000 − 4,200 = 14,800</div>
                <div style={{ color: '#D85A30', marginTop: 8, fontSize: 13, fontWeight: 700 }}>
                  IoU = 4,200 / 14,800 = 0.284
                </div>
                <div style={{ color: 'var(--muted)', fontSize: 11, marginTop: 4 }}>
                  Below 0.5 threshold → False Positive
                </div>
              </div>
            </div>
          </div>
        </VisualBox>

        <CodeBlock code={`import numpy as np
import torch

# ── IoU from scratch — two formats ───────────────────────────────────
def iou_corner_format(box1, box2):
    """
    box: [x_min, y_min, x_max, y_max]
    Returns IoU scalar.
    """
    # Intersection
    x1 = max(box1[0], box2[0])
    y1 = max(box1[1], box2[1])
    x2 = min(box1[2], box2[2])
    y2 = min(box1[3], box2[3])

    inter_w = max(0, x2 - x1)
    inter_h = max(0, y2 - y1)
    intersection = inter_w * inter_h

    # Union
    area1 = (box1[2] - box1[0]) * (box1[3] - box1[1])
    area2 = (box2[2] - box2[0]) * (box2[3] - box2[1])
    union = area1 + area2 - intersection

    return intersection / (union + 1e-8)

def iou_batch(boxes1: torch.Tensor, boxes2: torch.Tensor) -> torch.Tensor:
    """
    Vectorised IoU for (N, 4) and (M, 4) tensors.
    Returns (N, M) IoU matrix — every pair.
    Used in NMS and matching.
    """
    area1 = (boxes1[:, 2] - boxes1[:, 0]) * (boxes1[:, 3] - boxes1[:, 1])
    area2 = (boxes2[:, 2] - boxes2[:, 0]) * (boxes2[:, 3] - boxes2[:, 1])

    # Broadcast to compute all pairs
    lt = torch.max(boxes1[:, None, :2], boxes2[None, :, :2])  # (N, M, 2)
    rb = torch.min(boxes1[:, None, 2:], boxes2[None, :, 2:])  # (N, M, 2)

    wh   = (rb - lt).clamp(min=0)           # (N, M, 2)
    inter = wh[:, :, 0] * wh[:, :, 1]      # (N, M)
    union = area1[:, None] + area2[None, :] - inter

    return inter / (union + 1e-8)

# ── Test IoU ──────────────────────────────────────────────────────────
cases = [
    ([0, 0, 100, 100], [0, 0, 100, 100],  1.0,   "Perfect overlap"),
    ([0, 0, 100, 100], [50, 50, 150, 150], None,  "50% overlap"),
    ([0, 0, 100, 100], [200, 200, 300, 300], 0.0, "No overlap"),
    ([0, 0, 100, 100], [70, 30, 170, 120],  None, "Partial overlap"),
]

print("IoU calculations:")
for box1, box2, expected, desc in cases:
    iou = iou_corner_format(box1, box2)
    exp_str = f"(expected {expected})" if expected is not None else ""
    print(f"  {desc:<20}: IoU = {iou:.4f}  {exp_str}")

# ── Vectorised batch IoU ──────────────────────────────────────────────
pred_boxes = torch.tensor([[10, 20, 80, 90],
                             [50, 50, 150, 150],
                             [200, 200, 300, 280]], dtype=torch.float)
gt_boxes   = torch.tensor([[15, 25, 75, 85],
                             [60, 60, 140, 140]], dtype=torch.float)

iou_matrix = iou_batch(pred_boxes, gt_boxes)
print(f"\nBatch IoU matrix (3 preds × 2 GT boxes):")
print(f"Shape: {iou_matrix.shape}")
print(iou_matrix.round(decimals=3))`} />
      </div>

      <Div />

      {/* ══ SECTION 3 — NON-MAXIMUM SUPPRESSION ════════════════════════════════ */}
      <div style={S.sec}>
        <span style={S.tag}>Removing duplicate detections</span>
        <h2 style={S.h2}>Non-Maximum Suppression — keep the best box, discard the rest</h2>

        <p style={S.p}>
          A detection model produces hundreds of candidate boxes.
          Multiple boxes often overlap on the same object —
          the model detected the same car 15 times at slightly different positions.
          Non-Maximum Suppression (NMS) removes duplicates:
          keep the box with the highest confidence score,
          remove all other boxes that overlap it significantly (IoU {'>'} threshold).
          Repeat for the remaining boxes.
        </p>

        <ConceptBox title="NMS algorithm — four steps">
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: 12, lineHeight: 2.2 }}>
            <div style={{ color: '#7b61ff' }}>1. Sort all boxes by confidence score (highest first)</div>
            <div style={{ color: '#1D9E75' }}>2. Take the highest-scoring box → add to final detections</div>
            <div style={{ color: '#D85A30' }}>3. Remove all remaining boxes with IoU {'>'} threshold (e.g. 0.45) with this box</div>
            <div style={{ color: '#378ADD' }}>4. Repeat from step 2 with remaining boxes until none left</div>
            <div style={{ fontSize: 11, color: 'var(--muted)', marginTop: 8 }}>
              Low IoU threshold (0.3): aggressive suppression — fewer boxes, may miss distinct objects close together<br />
              High IoU threshold (0.7): permissive — more boxes, may include duplicates
            </div>
          </div>
        </ConceptBox>

        <CodeBlock code={`import numpy as np
import torch

def nms(boxes: np.ndarray, scores: np.ndarray,
        iou_threshold: float = 0.45) -> list[int]:
    """
    Non-Maximum Suppression from scratch.
    boxes:  (N, 4) array of [x_min, y_min, x_max, y_max]
    scores: (N,) confidence scores
    Returns: list of kept box indices
    """
    x1, y1, x2, y2 = boxes[:,0], boxes[:,1], boxes[:,2], boxes[:,3]
    areas = (x2 - x1) * (y2 - y1)

    # Sort by score descending
    order = scores.argsort()[::-1]
    keep  = []

    while order.size > 0:
        i = order[0]
        keep.append(i)

        # Compute IoU of box i with all remaining boxes
        xx1 = np.maximum(x1[i], x1[order[1:]])
        yy1 = np.maximum(y1[i], y1[order[1:]])
        xx2 = np.minimum(x2[i], x2[order[1:]])
        yy2 = np.minimum(y2[i], y2[order[1:]])

        w    = np.maximum(0, xx2 - xx1)
        h    = np.maximum(0, yy2 - yy1)
        inter = w * h
        union = areas[i] + areas[order[1:]] - inter
        iou   = inter / (union + 1e-8)

        # Keep boxes with IoU below threshold
        remaining = np.where(iou <= iou_threshold)[0]
        order     = order[remaining + 1]

    return keep

# ── Simulate detection output before NMS ─────────────────────────────
# Three clusters — same car detected multiple times
np.random.seed(42)
boxes = np.array([
    [100, 100, 200, 180],  # car 1 — main box
    [102, 98,  198, 182],  # car 1 — duplicate (high overlap)
    [105, 103, 205, 185],  # car 1 — another duplicate
    [300, 200, 420, 310],  # car 2 — main box
    [298, 202, 418, 308],  # car 2 — duplicate
    [10,  10,  50,  50],   # pedestrian — isolated
], dtype=float)

scores = np.array([0.95, 0.87, 0.72, 0.91, 0.83, 0.78])

print(f"Before NMS: {len(boxes)} boxes")
for i, (box, score) in enumerate(zip(boxes, scores)):
    print(f"  Box {i}: score={score:.2f}  {box.astype(int).tolist()}")

kept = nms(boxes, scores, iou_threshold=0.45)
print(f"\nAfter NMS (threshold=0.45): {len(kept)} boxes")
for i in kept:
    print(f"  Box {i}: score={scores[i]:.2f}  {boxes[i].astype(int).tolist()}")

# ── PyTorch built-in NMS ──────────────────────────────────────────────
from torchvision.ops import nms as torch_nms

boxes_t  = torch.FloatTensor(boxes)
scores_t = torch.FloatTensor(scores)
kept_t   = torch_nms(boxes_t, scores_t, iou_threshold=0.45)
print(f"\ntorchvision.ops.nms result: {kept_t.tolist()}  ← same as manual")`} />
      </div>

      <Div />

      {/* ══ SECTION 4 — YOLO ARCHITECTURE ══════════════════════════════════════ */}
      <div style={S.sec}>
        <span style={S.tag}>The architecture</span>
        <h2 style={S.h2}>YOLO — You Only Look Once — grid-based detection in a single pass</h2>

        <p style={S.p}>
          YOLO divides the input image into an S×S grid.
          Each grid cell predicts B bounding boxes and their confidence scores,
          plus C class probabilities. All predictions are made simultaneously
          in one forward pass — hence "You Only Look Once."
          This makes YOLO dramatically faster than two-stage detectors
          (like Faster R-CNN) which first propose regions then classify them.
        </p>

        <VisualBox label="YOLO grid — each cell predicts boxes for objects whose centre falls in it">
          <div style={{ display: 'flex', gap: 20, alignItems: 'flex-start', flexWrap: 'wrap' as const }}>
            {/* Grid */}
            <div>
              <div style={{ fontSize: 10, color: 'var(--muted)', fontFamily: 'var(--font-mono)', marginBottom: 6 }}>
                7×7 grid on image
              </div>
              <svg width="160" height="160" viewBox="0 0 160 160">
                {/* Grid lines */}
                {[0,1,2,3,4,5,6,7].map(i => (
                  <g key={i}>
                    <line x1={i*22.8} y1="0" x2={i*22.8} y2="160"
                      stroke="#333" strokeWidth="0.5" />
                    <line x1="0" y1={i*22.8} x2="160" y2={i*22.8}
                      stroke="#333" strokeWidth="0.5" />
                  </g>
                ))}
                {/* Object 1 — car */}
                <rect x="30" y="40" width="70" height="45"
                  fill="none" stroke="#1D9E75" strokeWidth="2" />
                <circle cx="65" cy="62" r="3" fill="#1D9E75" />
                <text x="65" y="92" textAnchor="middle"
                  fontSize="8" fill="#1D9E75" fontFamily="monospace">car</text>
                {/* Responsible cell highlighted */}
                <rect x="45.6" y="45.6" width="22.8" height="22.8"
                  fill="rgba(29,158,117,0.2)" stroke="#1D9E75" strokeWidth="1.5" />
                {/* Object 2 — person */}
                <rect x="100" y="90" width="35" height="55"
                  fill="none" stroke="#D85A30" strokeWidth="2" />
                <circle cx="117" cy="117" r="3" fill="#D85A30" />
                <text x="117" y="155" textAnchor="middle"
                  fontSize="8" fill="#D85A30" fontFamily="monospace">person</text>
                <rect x="114" y="114" width="22.8" height="22.8"
                  fill="rgba(216,90,48,0.2)" stroke="#D85A30" strokeWidth="1.5" />
              </svg>
            </div>
            {/* Output tensor */}
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 10, color: 'var(--muted)', fontFamily: 'var(--font-mono)', marginBottom: 6 }}>
                Output tensor per grid cell
              </div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: 12, lineHeight: 2.0 }}>
                <div style={{ color: '#7b61ff' }}>x, y        ← box centre (relative to cell)</div>
                <div style={{ color: '#7b61ff' }}>w, h        ← box size (relative to image)</div>
                <div style={{ color: '#D85A30' }}>confidence  ← P(object) × IoU</div>
                <div style={{ color: '#1D9E75' }}>class probs ← P(car|object), P(person|object), ...</div>
                <div style={{ color: 'var(--muted)', fontSize: 11, marginTop: 8 }}>
                  Per cell: B × 5 + C values<br />
                  YOLOv1: S=7, B=2, C=20 → 7×7×30 output
                </div>
              </div>
            </div>
          </div>
        </VisualBox>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 24 }}>
          <h3 style={S.h3}>YOLO version history — what each version improved</h3>
          {[
            {
              version: 'YOLOv1 (2016)',
              color: '#888',
              key: 'Original grid-based detection. Single scale. Struggles with small objects.',
              speed: '45 fps',
            },
            {
              version: 'YOLOv3 (2018)',
              color: '#378ADD',
              key: 'Multi-scale detection at 3 different grid sizes. Darknet53 backbone. Much better small object detection.',
              speed: '30 fps',
            },
            {
              version: 'YOLOv5 (2020)',
              color: '#1D9E75',
              key: 'PyTorch implementation. Auto-anchor clustering. Easy fine-tuning. Most deployed version globally.',
              speed: '140 fps (small)',
            },
            {
              version: 'YOLOv8 (2023)',
              color: '#7b61ff',
              key: 'Anchor-free detection. Better accuracy than YOLOv5. Unified API for detection/segmentation/pose. Current standard.',
              speed: '160 fps (nano)',
            },
          ].map((item) => (
            <div key={item.version} style={{
              background: 'var(--surface)', border: `1px solid ${item.color}25`,
              borderRadius: 7, padding: '9px 12px',
              display: 'grid', gridTemplateColumns: '160px 1fr 80px',
              gap: 10, alignItems: 'start',
              borderLeft: `3px solid ${item.color}`,
            }}>
              <span style={{ fontSize: 12, fontWeight: 700, color: item.color, fontFamily: 'var(--font-mono)' }}>{item.version}</span>
              <span style={{ fontSize: 11, color: 'var(--muted)' }}>{item.key}</span>
              <span style={{ fontSize: 11, color: item.color, fontFamily: 'var(--font-mono)', textAlign: 'right' as const }}>{item.speed}</span>
            </div>
          ))}
        </div>
      </div>

      <Div />

      {/* ══ SECTION 5 — YOLOV8 IN PRACTICE ═════════════════════════════════════ */}
      <div style={S.sec}>
        <span style={S.tag}>Production implementation</span>
        <h2 style={S.h2}>YOLOv8 with Ultralytics — inference, fine-tuning, and deployment</h2>

        <CodeBlock code={`# pip install ultralytics

from ultralytics import YOLO
import numpy as np
from PIL import Image
import torch

# ── Load pretrained YOLOv8 model ──────────────────────────────────────
# Model sizes: nano(n), small(s), medium(m), large(l), extra(x)
# Larger = more accurate, slower
model = YOLO('yolov8n.pt')   # nano — fastest, least accurate
# model = YOLO('yolov8s.pt') # small — good balance
# model = YOLO('yolov8m.pt') # medium — production default

print(f"Model: {model.model.__class__.__name__}")
print(f"Parameters: {sum(p.numel() for p in model.model.parameters()):,}")
print(f"Classes: {len(model.names)} (COCO 80-class)")
print(f"Sample classes: {list(model.names.values())[:10]}")

# ── Inference on an image ─────────────────────────────────────────────
# Create a test image (in production: pass real image path)
img_array = np.random.randint(50, 200, (640, 640, 3), dtype=np.uint8)
img_pil   = Image.fromarray(img_array)

results = model.predict(
    source=img_pil,
    conf=0.25,        # confidence threshold — discard boxes below this
    iou=0.45,         # NMS IoU threshold
    verbose=False,
)

result = results[0]
print(f"\nDetection results:")
print(f"  Input size:   {result.orig_shape}")
print(f"  Boxes found:  {len(result.boxes)}")

if len(result.boxes) > 0:
    boxes  = result.boxes.xyxy.numpy()    # (N, 4) corner format
    scores = result.boxes.conf.numpy()    # (N,) confidence
    classes = result.boxes.cls.numpy()   # (N,) class indices

    for i, (box, score, cls) in enumerate(zip(boxes, scores, classes)):
        cls_name = model.names[int(cls)]
        print(f"  [{i+1}] {cls_name:<15} conf={score:.3f}  "
              f"box=[{box[0]:.0f},{box[1]:.0f},{box[2]:.0f},{box[3]:.0f}]")

# ── Fine-tuning on custom data ────────────────────────────────────────
print("""
# Fine-tuning YOLOv8 on your own dataset:

# 1. Prepare data in YOLO format:
#    dataset/
#      images/train/  image1.jpg  image2.jpg  ...
#      images/val/    image1.jpg  ...
#      labels/train/  image1.txt  image2.txt  ...
#      labels/val/    image1.txt  ...
#
# Each label file (one per image):
#    class_id  x_center  y_center  width  height
#    (all values normalised 0-1 relative to image size)
#    0  0.45  0.62  0.30  0.25
#    1  0.72  0.31  0.15  0.40

# 2. Dataset YAML file (dataset.yaml):
#    path: /path/to/dataset
#    train: images/train
#    val:   images/val
#    names:
#      0: defect
#      1: ok_product

# 3. Fine-tune:
model = YOLO('yolov8s.pt')
results = model.train(
    data='dataset.yaml',
    epochs=50,
    imgsz=640,
    batch=16,
    lr0=0.01,        # initial learning rate
    lrf=0.01,        # final lr = lr0 × lrf
    patience=10,     # early stopping patience
    save=True,
    project='meesho-defect-detection',
)

# 4. Evaluate on validation set:
metrics = model.val()
print(f"mAP50: {metrics.box.map50:.4f}")
print(f"mAP50-95: {metrics.box.map:.4f}")

# 5. Export for deployment:
model.export(format='onnx')    # ONNX for CPU deployment
model.export(format='tflite')  # TFLite for mobile
model.export(format='engine')  # TensorRT for NVIDIA GPU
""")

# ── Batch inference for video/stream ─────────────────────────────────
def process_batch(image_paths: list, model, conf: float = 0.25):
    """Process multiple images in one batch — faster than one at a time."""
    results = model.predict(image_paths, conf=conf, verbose=False)
    detections = []
    for result in results:
        frame_dets = []
        if len(result.boxes) > 0:
            for box, score, cls in zip(
                result.boxes.xyxy.numpy(),
                result.boxes.conf.numpy(),
                result.boxes.cls.numpy(),
            ):
                frame_dets.append({
                    'class':  model.names[int(cls)],
                    'score':  float(score),
                    'box':    box.tolist(),
                })
        detections.append(frame_dets)
    return detections

print("YOLOv8 batch inference: pass list of image paths for throughput")`} />
      </div>

      <Div />

      {/* ══ SECTION 6 — EVALUATION METRICS ═════════════════════════════════════ */}
      <div style={S.sec}>
        <span style={S.tag}>Measuring detection quality</span>
        <h2 style={S.h2}>mAP — mean Average Precision — the standard detection metric</h2>

        <p style={S.p}>
          Accuracy does not apply to detection. The standard metric is
          mAP (mean Average Precision). For each class, you compute
          Average Precision (AP) — the area under the precision-recall curve
          across all confidence thresholds. mAP is the mean AP across all classes.
          mAP@0.5 uses IoU ≥ 0.5 as the threshold for a True Positive.
          mAP@0.5:0.95 averages mAP across IoU thresholds from 0.5 to 0.95
          — the COCO standard, much harder.
        </p>

        <CodeBlock code={`import numpy as np

def compute_ap(recalls: np.ndarray, precisions: np.ndarray) -> float:
    """
    Compute Average Precision (AP) using the 11-point interpolation.
    Used in Pascal VOC evaluation.
    """
    ap = 0.0
    for threshold in np.arange(0, 1.1, 0.1):
        # Precision at recall >= threshold
        prec_at_thresh = precisions[recalls >= threshold]
        ap += prec_at_thresh.max() if prec_at_thresh.size > 0 else 0.0
    return ap / 11.0

def evaluate_detections(pred_boxes, pred_scores, pred_classes,
                         gt_boxes, gt_classes,
                         iou_threshold=0.5, num_classes=3):
    """
    Compute mAP for a set of predictions vs ground truth.
    All boxes in corner format [x1, y1, x2, y2].
    """
    aps = []

    for cls in range(num_classes):
        # Filter to current class
        pred_mask = pred_classes == cls
        gt_mask   = gt_classes   == cls

        p_boxes  = pred_boxes[pred_mask]
        p_scores = pred_scores[pred_mask]
        g_boxes  = gt_boxes[gt_mask]

        if len(g_boxes) == 0:
            continue
        if len(p_boxes) == 0:
            aps.append(0.0)
            continue

        # Sort predictions by score descending
        order  = p_scores.argsort()[::-1]
        p_boxes  = p_boxes[order]
        p_scores = p_scores[order]

        tp = np.zeros(len(p_boxes))
        fp = np.zeros(len(p_boxes))
        matched_gt = set()

        for i, pb in enumerate(p_boxes):
            if len(g_boxes) == 0:
                fp[i] = 1; continue

            # Compute IoU with all GT boxes
            ious = np.array([iou_corner(pb, gb) for gb in g_boxes])
            best_iou_idx = ious.argmax()
            best_iou     = ious[best_iou_idx]

            if best_iou >= iou_threshold and best_iou_idx not in matched_gt:
                tp[i] = 1
                matched_gt.add(best_iou_idx)
            else:
                fp[i] = 1

        cum_tp  = np.cumsum(tp)
        cum_fp  = np.cumsum(fp)
        recalls    = cum_tp / len(g_boxes)
        precisions = cum_tp / (cum_tp + cum_fp + 1e-8)

        aps.append(compute_ap(recalls, precisions))

    return np.mean(aps) if aps else 0.0

def iou_corner(b1, b2):
    x1 = max(b1[0], b2[0]); y1 = max(b1[1], b2[1])
    x2 = min(b1[2], b2[2]); y2 = min(b1[3], b2[3])
    inter = max(0, x2-x1) * max(0, y2-y1)
    a1 = (b1[2]-b1[0])*(b1[3]-b1[1])
    a2 = (b2[2]-b2[0])*(b2[3]-b2[1])
    return inter / (a1 + a2 - inter + 1e-8)

# ── Simulate evaluation ───────────────────────────────────────────────
np.random.seed(42)
n_pred, n_gt = 20, 10

pred_boxes   = np.random.randint(0, 400, (n_pred, 4)).astype(float)
pred_boxes[:, 2:] += pred_boxes[:, :2] + 50   # ensure x2>x1
pred_scores  = np.random.uniform(0.3, 0.99, n_pred)
pred_classes = np.random.randint(0, 3, n_pred)

gt_boxes   = np.random.randint(0, 400, (n_gt, 4)).astype(float)
gt_boxes[:, 2:] += gt_boxes[:, :2] + 50
gt_classes = np.random.randint(0, 3, n_gt)

map50 = evaluate_detections(
    pred_boxes, pred_scores, pred_classes,
    gt_boxes, gt_classes, iou_threshold=0.5,
)
print(f"mAP@0.5: {map50:.4f}")

# mAP@0.5:0.95 (COCO standard)
thresholds = np.arange(0.5, 1.0, 0.05)
map_coco = np.mean([
    evaluate_detections(pred_boxes, pred_scores, pred_classes,
                         gt_boxes, gt_classes, iou_threshold=t)
    for t in thresholds
])
print(f"mAP@0.5:0.95: {map_coco:.4f}  ← COCO standard (harder)")`} />
      </div>

      <Div />

      {/* ══ SECTION 7 — ERRORS ═════════════════════════════════════════════════ */}
      <div style={S.sec}>
        <span style={S.tag}>Errors you will hit</span>
        <h2 style={S.h2}>Every common object detection mistake — explained and fixed</h2>

        <ErrorBlock
          error="Model detects many duplicate overlapping boxes on the same object"
          cause="NMS threshold is too high (e.g. 0.9) — letting overlapping boxes survive. Or NMS is not being applied at all. With a high IoU threshold, boxes that are 80% overlapping with the best box are kept because they are below the threshold. The result is 5–10 boxes all pointing at the same car."
          fix="Lower the NMS IoU threshold to 0.45–0.5 for most tasks. For objects that can be legitimately close (crowd scenes, stacked products), use 0.6. In Ultralytics YOLO: model.predict(source, iou=0.45). Verify NMS is actually running — check if the number of boxes drops significantly after adding NMS. If boxes still duplicate, the confidence threshold (conf=0.25) may be too low — raise it to 0.5."
        />

        <ErrorBlock
          error="Model misses small objects — detects large objects fine but small ones get score 0.0"
          cause="Using a single-scale model or only the coarsest feature map for detection. Small objects produce small feature map activations that get lost after multiple pooling layers. YOLOv1 and early architectures predict at a single scale — 7×7 grid means each cell covers 91×91 pixels of a 640×640 image, too coarse for small objects."
          fix="Use a multi-scale model — YOLOv3/v5/v8 all detect at three scales (small, medium, large objects). Use a larger input image size: model.predict(imgsz=1280) instead of 640 — small objects become relatively larger. For very small objects, crop the image into overlapping tiles, run detection on each tile, then merge results and apply NMS globally."
        />

        <ErrorBlock
          error="YOLO label format error — training fails with 'labels not found' or wrong box predictions"
          cause="YOLO expects normalised coordinates in [0, 1] relative to image dimensions. If you provide pixel coordinates (e.g. x_center=320 for a 640-wide image instead of 0.5), all boxes will be far outside the image after denormalisation. Also: YOLO labels must be in a 'labels' folder that mirrors the 'images' folder structure exactly, with the same filename but .txt extension."
          fix="Normalise all coordinates: x_center /= image_width, y_center /= image_height, width /= image_width, height /= image_height. All values must be in [0, 1]. Verify with: assert 0 <= x <= 1 and 0 <= y <= 1 for every annotation. Check folder structure: images/train/img001.jpg must have labels/train/img001.txt. Run model.val() on a small subset and visualise boxes before full training."
        />

        <ErrorBlock
          error="mAP is high during training but real-world performance is poor — model misses objects in production"
          cause="Train/validation data does not match production distribution. Common causes: training images are studio photos with clean backgrounds but production images are from mobile cameras with motion blur and clutter. Or the confidence threshold used during evaluation (0.001 for mAP computation) is much lower than what you use in production (0.5), so mAP looks good but production misses many detections."
          fix="Collect production-representative validation images — photograph with the actual camera that will be used in deployment, under real lighting conditions. Set the confidence threshold consistently: if you use conf=0.3 in production, evaluate mAP at conf=0.3 too. Add data augmentation that mimics production conditions (motion blur, low light, compression artifacts). Always test on at least 100 real production images before deploying."
        />
      </div>

      <Div />

      {/* ══ SECTION 8 — WHAT'S NEXT ════════════════════════════════════════════ */}
      <div style={{ paddingBottom: 48, paddingTop: 8 }}>
        <span style={S.tag}>What comes next</span>
        <h2 style={S.h2}>
          You can detect objects. Next: label every pixel in the image.
        </h2>

        <p style={S.p}>
          Object detection draws bounding boxes — rectangular approximations
          of object locations. Semantic segmentation goes further:
          it assigns a class label to every single pixel in the image.
          Instead of "there is a person at coordinates (100, 200)–(180, 400)"
          it produces "every pixel that belongs to a person, exactly."
          Module 58 covers U-Net — the architecture that powers
          medical image segmentation — and how skip connections
          preserve fine spatial detail lost during downsampling.
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
              Next — Module 58 · Computer Vision
            </div>
            <div style={{
              fontSize: 15, fontWeight: 700, color: 'var(--text)',
              fontFamily: 'var(--font-display)', letterSpacing: '-0.3px',
            }}>
              Semantic Segmentation — Pixel-Level Classification
            </div>
            <p style={{ ...S.ps, marginBottom: 0, marginTop: 4 }}>
              U-Net architecture, skip connections, and how segmentation
              powers medical imaging and autonomous vehicles.
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
          'Object detection predicts bounding boxes (location + size), confidence scores, and class labels for every object in an image — not just one label for the whole image. Output format: [x_center, y_center, width, height, confidence, class_probs] per predicted box.',
          'IoU (Intersection over Union) measures overlap between predicted and ground truth boxes. IoU = intersection_area / union_area. IoU ≥ 0.5 is the standard threshold for a True Positive. IoU is used for both NMS (removing duplicates) and mAP evaluation (judging correctness).',
          'Non-Maximum Suppression (NMS) removes duplicate detections. Sort by confidence → keep highest box → remove all overlapping boxes with IoU above threshold → repeat. Use iou_threshold=0.45 as default. Too high: duplicates survive. Too low: legitimate nearby objects suppressed.',
          'YOLO divides the image into an S×S grid. Each cell predicts B bounding boxes simultaneously in one forward pass. Multi-scale detection (YOLOv3+) uses three grid sizes to detect small, medium, and large objects. YOLOv8 (anchor-free) is the current production standard — use Ultralytics library.',
          'mAP (mean Average Precision) is the standard detection metric. mAP@0.5 uses IoU≥0.5 as TP threshold. mAP@0.5:0.95 averages across IoU thresholds 0.5 to 0.95 — the harder COCO standard. Typical production targets: mAP@0.5 > 0.7 for good detection, > 0.85 for excellent.',
          'Fine-tuning YOLOv8: prepare YOLO-format labels (normalised coordinates 0–1), create dataset.yaml, call model.train(data=yaml, epochs=50). All box coordinates must be normalised by image dimensions. Labels folder must mirror images folder structure with identical filenames but .txt extension.',
        ]}
      />
    </LearnLayout>
  )
}