import type { Metadata } from 'next'
import { LearnLayout } from '@/components/content/LearnLayout'
import { Callout } from '@/components/content/Callout'
import { KeyTakeaways } from '@/components/content/KeyTakeaways'
import MLPageHeader from '@/components/content/MLPageHeader'

export const metadata: Metadata = {
  title: 'NumPy Arrays and Broadcasting — Chaduvuko',
  description:
    'The backbone of all numerical ML in Python. Arrays, indexing, slicing, vectorised operations, broadcasting, and the performance habits that separate production ML code from slow notebook code.',
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
        }}>
          Why it happens
        </div>
        <p style={{ ...S.ps, marginBottom: 10 }}>{cause}</p>
        <div style={{
          fontSize: 11, fontWeight: 700, letterSpacing: '0.07em',
          textTransform: 'uppercase' as const, color: '#00e676',
          fontFamily: 'var(--font-mono)', marginBottom: 4,
        }}>
          Fix
        </div>
        <p style={{ ...S.ps, marginBottom: 0 }}>{fix}</p>
      </div>
    </div>
  )
}

export default function NumpyArraysPage() {
  return (
    <LearnLayout
      title="NumPy Arrays and Broadcasting"
      description="The backbone of all numerical ML in Python. Master arrays, indexing, vectorised operations, and broadcasting — the skills that make ML code fast."
      section="Programming Ecosystem"
      readTime="50–60 min"
      updatedAt="March 2026"
    >
      <MLPageHeader section='programming' topic='numpy-arrays' />

      {/* ══ SECTION 1 — HOOK ═══════════════════════════════════════════════════ */}
      <div style={S.sec}>
        <span style={S.tag}>Why NumPy exists</span>
        <h2 style={S.h2}>
          Python lists are beautiful. Python lists are also 100× too slow for ML.
        </h2>

        <p style={S.p}>
          Python lists can hold anything — integers, strings, other lists, functions.
          That flexibility has a cost. Each element is a full Python object
          with its own type information, reference count, and memory allocation.
          To add 1,000,000 numbers together, Python visits each object individually,
          unpacks its value, does the addition, and packages the result back up —
          one million times. At 10 million elements, this takes several seconds.
        </p>

        <p style={S.p}>
          NumPy arrays are fundamentally different. Every element has the same type,
          stored in a contiguous block of memory, with no Python object overhead.
          The addition of 1,000,000 numbers is a single call into a C library
          that runs using SIMD (Single Instruction Multiple Data) CPU instructions —
          processing 8 or 16 numbers per clock cycle simultaneously.
          The same operation takes under 10 milliseconds.
        </p>

        <p style={S.p}>
          Every ML library — sklearn, PyTorch, TensorFlow, XGBoost, SciPy —
          is built on top of NumPy arrays or an equivalent.
          Learning NumPy deeply is not optional for ML. It is the foundation
          everything else sits on.
        </p>

        <HBox color="#888888">
          <p style={{ ...S.p, marginBottom: 8 }}>
            <span style={{ color: 'var(--text)', fontWeight: 700 }}>
              What this module covers:
            </span>
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 6 }}>
            {[
              'Creating arrays — all the ways ML code does it',
              'dtypes — why the type of each element matters',
              'Indexing and slicing — access any subset of data',
              'Boolean indexing — filter rows by condition',
              'Fancy indexing — select non-contiguous elements',
              'Reshaping — change shape without changing data',
              'Aggregation — sum, mean, std along any axis',
              'Vectorised operations — eliminate every for loop',
              'Broadcasting — the rule that makes ML code elegant',
              'Views vs copies — the source of silent bugs',
              'Linear algebra with NumPy — linalg module',
              'Random number generation — reproducible experiments',
            ].map((item, i) => (
              <div key={i} style={{ display: 'flex', gap: 8, alignItems: 'flex-start' }}>
                <div style={{
                  width: 4, height: 4, borderRadius: '50%',
                  background: '#888888', flexShrink: 0, marginTop: 7,
                }} />
                <span style={{ fontSize: 12, color: 'var(--muted)', lineHeight: 1.55 }}>{item}</span>
              </div>
            ))}
          </div>
        </HBox>

        <Callout type="tip">
          The single most important habit this module builds: when you find yourself
          writing a for loop over array elements, stop and ask "can I express this
          as a NumPy operation?" The answer is almost always yes, and the NumPy
          version is typically 100–10,000× faster.
        </Callout>
      </div>

      <Div />

      {/* ══ SECTION 2 — CREATING ARRAYS ════════════════════════════════════════ */}
      <div style={S.sec}>
        <span style={S.tag}>Creating arrays</span>
        <h2 style={S.h2}>Every way to create a NumPy array</h2>

        <p style={S.p}>
          ML code creates arrays in about a dozen different ways depending on context —
          from raw data, from other arrays, from mathematical sequences,
          or from random distributions. Knowing all of them means you always
          reach for the right one immediately.
        </p>

        <CodeBlock code={`import numpy as np

# ── From Python data ──────────────────────────────────────────────────

# From a list — most common way to create small arrays
features = np.array([3.2, 2.0, 15.0, 7.0])          # 1D: shape (4,)
matrix   = np.array([[1, 2, 3], [4, 5, 6]])          # 2D: shape (2, 3)
tensor   = np.array([[[1,2],[3,4]], [[5,6],[7,8]]])   # 3D: shape (2, 2, 2)

print(f"features: {features}  shape={features.shape}")
print(f"matrix:\n{matrix}  shape={matrix.shape}")

# ── Filled arrays — initialise weights, masks, placeholders ──────────

zeros   = np.zeros((3, 4))         # all zeros — shape (3,4)
ones    = np.ones((2, 3))          # all ones
empty   = np.empty((5, 5))         # uninitialized — fast but contains garbage
full    = np.full((3, 3), 7.0)     # all filled with 7.0
eye     = np.eye(4)                # 4×4 identity matrix

# zeros_like, ones_like — same shape as an existing array
X = np.random.randn(100, 4)
bias_matrix = np.zeros_like(X)     # (100,4) of zeros — same shape as X
mask        = np.ones_like(X, dtype=bool)  # boolean mask

# ── Ranges and sequences ──────────────────────────────────────────────

arange  = np.arange(0, 10, 2)          # [0 2 4 6 8] — like range()
linspace= np.linspace(0, 1, 11)        # 11 values from 0 to 1 inclusive
logspace= np.logspace(-4, 0, 5)        # [1e-4, 1e-3, 1e-2, 1e-1, 1e0] — log-spaced

print(f"arange:   {arange}")
print(f"linspace: {linspace.round(2)}")
print(f"logspace: {logspace}")  # useful for learning rate sweeps!

# ── Random arrays — used constantly in ML ────────────────────────────
np.random.seed(42)   # ALWAYS set a seed for reproducibility

rand_uniform = np.random.rand(3, 4)           # uniform [0, 1)
rand_normal  = np.random.randn(3, 4)          # standard normal N(0,1)
rand_int     = np.random.randint(0, 10, (3,4)) # integers [0, 10)
rand_choice  = np.random.choice([1,2,3,4,5], size=10, replace=True)
rand_perm    = np.random.permutation(100)      # shuffled [0..99]

# For reproducible experiments — use a Generator (NumPy 1.17+ recommended)
rng = np.random.default_rng(seed=42)
X   = rng.normal(loc=35, scale=8, size=(1000, 4))
y   = rng.normal(loc=35, size=1000)

# ── From existing arrays ──────────────────────────────────────────────
copy   = X.copy()          # deep copy — independent from X
like_X = np.empty_like(X)  # same shape and dtype, uninitialized

# Stack arrays along new axis
a = np.array([1, 2, 3])
b = np.array([4, 5, 6])
stacked = np.stack([a, b])          # shape (2, 3) — new first axis
h_stack = np.hstack([a, b])        # shape (6,)   — horizontal
v_stack = np.vstack([a, b])        # shape (2, 3) — vertical
print(f"stack:   {stacked}")
print(f"hstack:  {h_stack}")
print(f"vstack:\n{v_stack}")`} />

        <h3 style={S.h3}>dtypes — why the type of every element matters</h3>

        <p style={S.p}>
          A dtype defines what type of value each element holds and how many
          bytes it occupies. This is not a detail — it directly determines
          memory usage, computation speed, and numerical precision.
          A float64 array uses twice the memory of float32 and is slower
          on many GPU operations. Understanding dtypes prevents silent
          precision errors and unnecessary memory usage.
        </p>

        <CodeBlock code={`import numpy as np

# The most important dtypes in ML
print("Dtype    | Bytes | Range / precision")
print("─" * 55)
for dtype in [np.int8, np.int16, np.int32, np.int64,
              np.float16, np.float32, np.float64, np.bool_]:
    info = np.iinfo(dtype) if np.issubdtype(dtype, np.integer) else None
    nbytes = np.dtype(dtype).itemsize
    name   = np.dtype(dtype).name
    if info:
        print(f"{name:<12} | {nbytes}     | [{info.min}, {info.max}]")
    else:
        print(f"{name:<12} | {nbytes}     | ~{np.finfo(dtype).precision} significant digits")

# Creating arrays with specific dtypes
int_labels  = np.array([0, 1, 2, 1, 0], dtype=np.int32)
float_feats = np.array([3.2, 1.5, 7.8], dtype=np.float32)  # GPU-friendly
bool_mask   = np.array([True, False, True], dtype=np.bool_)

print(f"\nint_labels dtype:  {int_labels.dtype}")    # int32
print(f"float_feats dtype: {float_feats.dtype}")   # float32
print(f"bool_mask dtype:   {bool_mask.dtype}")     # bool

# dtype affects memory dramatically
n = 1_000_000
arr64 = np.ones(n, dtype=np.float64)
arr32 = np.ones(n, dtype=np.float32)
arr16 = np.ones(n, dtype=np.float16)

print(f"\nMemory for {n:,} elements:")
print(f"  float64: {arr64.nbytes / 1e6:.1f} MB")  # 8.0 MB
print(f"  float32: {arr32.nbytes / 1e6:.1f} MB")  # 4.0 MB
print(f"  float16: {arr16.nbytes / 1e6:.1f} MB")  # 2.0 MB

# Casting dtypes
X = np.random.randn(100, 4)           # float64 by default
X_f32 = X.astype(np.float32)         # convert to float32 for GPU
labels = np.array([1.0, 2.0, 3.0])   # stored as float
labels_int = labels.astype(np.int64) # convert for use as class indices

# Common gotcha: integer division
a = np.array([1, 2, 3], dtype=np.int32)
b = np.array([2, 2, 2], dtype=np.int32)
print(f"int / int:   {a / b}")    # [0.5, 1.0, 1.5] — OK, result is float64
print(f"int // int:  {a // b}")   # [0, 1, 1]       — integer floor division`} />
      </div>

      <Div />

      {/* ══ SECTION 3 — INDEXING ═══════════════════════════════════════════════ */}
      <div style={S.sec}>
        <span style={S.tag}>Accessing data</span>
        <h2 style={S.h2}>Indexing and slicing — access any subset of your data</h2>

        <p style={S.p}>
          Indexing in NumPy is far more powerful than Python list indexing.
          You can select individual elements, contiguous ranges, non-contiguous
          subsets, and entire rows or columns — all with a single expression.
          Mastering this eliminates the need for most loops over data.
        </p>

        <VisualBox label="Indexing cheatsheet — a (5×4) feature matrix">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
            <div>
              <div style={{
                fontSize: 11, fontWeight: 700, color: 'var(--muted)',
                fontFamily: 'var(--font-mono)', marginBottom: 8,
              }}>
                Expression
              </div>
              {[
                { expr: 'X[0]',       desc: 'First row (all features of order 0)' },
                { expr: 'X[-1]',      desc: 'Last row' },
                { expr: 'X[2, 1]',    desc: 'Row 2, column 1 — one element' },
                { expr: 'X[:, 0]',    desc: 'All rows, column 0 — first feature' },
                { expr: 'X[1:4]',     desc: 'Rows 1, 2, 3 — a slice' },
                { expr: 'X[::2]',     desc: 'Every other row' },
                { expr: 'X[:, 1:3]',  desc: 'All rows, columns 1 and 2' },
                { expr: 'X[:3, :2]',  desc: 'First 3 rows, first 2 columns' },
              ].map((item) => (
                <div key={item.expr} style={{
                  display: 'flex', gap: 12, alignItems: 'flex-start',
                  padding: '4px 0', borderBottom: '1px solid var(--border)',
                }}>
                  <span style={{
                    fontSize: 12, fontFamily: 'var(--font-mono)',
                    color: '#00e676', minWidth: 110, flexShrink: 0,
                  }}>
                    {item.expr}
                  </span>
                  <span style={{ fontSize: 11, color: 'var(--muted)', lineHeight: 1.5 }}>
                    {item.desc}
                  </span>
                </div>
              ))}
            </div>
            <div>
              <div style={{
                fontSize: 11, fontWeight: 700, color: 'var(--muted)',
                fontFamily: 'var(--font-mono)', marginBottom: 8,
              }}>
                Shape of result
              </div>
              {[
                '(4,)',
                '(4,)',
                '() — scalar',
                '(5,)',
                '(3, 4)',
                '(3, 4) if 5 rows',
                '(5, 2)',
                '(3, 2)',
              ].map((shape, i) => (
                <div key={i} style={{
                  padding: '4px 0', borderBottom: '1px solid var(--border)',
                  fontSize: 12, fontFamily: 'var(--font-mono)', color: '#378ADD',
                  height: 29, display: 'flex', alignItems: 'center',
                }}>
                  {shape}
                </div>
              ))}
            </div>
          </div>
        </VisualBox>

        <CodeBlock code={`import numpy as np
np.random.seed(42)

# 1000 DoorDash orders, 4 features each
# Columns: [distance_km, traffic_score, prep_time, time_of_day]
X = np.random.randn(1000, 4)
X[:, 0] = np.abs(X[:, 0]) * 3 + 2   # distance: positive, 2–8 km
X[:, 1] = np.abs(X[:, 1]) * 3 + 1   # traffic: positive, 1–10
X[:, 2] = np.abs(X[:, 2]) * 5 + 8   # prep_time: positive, 8–25 min
X[:, 3] = np.random.randint(1, 5, 1000).astype(float)  # time of day: 1-4
y = 8.6 + 7.3*X[:,0] + 1.5*X[:,1] + 0.9*X[:,2] + np.random.randn(1000)*3

# ── Basic indexing ────────────────────────────────────────────────────
print(f"First order:        {X[0]}")            # shape (4,)
print(f"Last order:         {X[-1]}")
print(f"5th order, 2nd feat: {X[4, 1]:.2f}")   # scalar

# ── Slicing ───────────────────────────────────────────────────────────
first_10  = X[:10]                   # first 10 rows — shape (10, 4)
all_dist  = X[:, 0]                  # all distances — shape (1000,)
last_100  = X[-100:]                 # last 100 rows
every_5th = X[::5]                   # every 5th row — shape (200, 4)
first_2_feats = X[:, :2]             # only distance + traffic — shape (1000,2)

print(f"\nfirst_10 shape:   {first_10.shape}")
print(f"all_dist shape:   {all_dist.shape}")
print(f"last_100 shape:   {last_100.shape}")
print(f"first_2 shape:    {first_2_feats.shape}")

# ── 3D indexing — useful for batches ──────────────────────────────────
# Batch of 32 orders, each with 4 features, in a batch of 8 time steps
# Shape: (batch_size=8, seq_len=32, features=4)
batch = np.random.randn(8, 32, 4)

print(f"\nbatch shape:          {batch.shape}")
print(f"First sequence:       {batch[0].shape}")      # (32, 4)
print(f"First seq, first step: {batch[0, 0].shape}")  # (4,)
print(f"All seqs, step 5:      {batch[:, 5, :].shape}") # (8, 4)
print(f"Feature 0 everywhere:  {batch[:, :, 0].shape}") # (8, 32)`} />

        <h3 style={S.h3}>Boolean indexing — filter rows by condition</h3>

        <p style={S.p}>
          Boolean indexing is one of the most used operations in data preprocessing.
          You create a boolean array (True/False for each row) and use it to
          select rows. This replaces almost all "filter the dataset where..."
          logic that beginners write with for loops.
        </p>

        <CodeBlock code={`import numpy as np
np.random.seed(42)
X = np.random.randn(1000, 4)
y = np.random.randn(1000)

# ── Boolean mask — one True/False per element ─────────────────────────

# Which orders have high traffic (traffic_score > 7)?
traffic = np.abs(X[:, 1]) * 3 + 1   # simulated traffic scores
high_traffic_mask = traffic > 7       # shape (1000,) of booleans

print(f"Total orders:       {len(traffic)}")
print(f"High traffic:       {high_traffic_mask.sum()}")   # count of True
print(f"High traffic %:     {high_traffic_mask.mean()*100:.1f}%")

# Select the high-traffic orders
X_high  = X[high_traffic_mask]        # shape (n_high, 4)
y_high  = y[high_traffic_mask]        # shape (n_high,)
print(f"High traffic array: {X_high.shape}")

# ── Compound conditions ───────────────────────────────────────────────
distance = np.abs(X[:, 0]) * 3 + 2
time_of_day = np.random.randint(1, 5, 1000)

# Evening rush: time=3 AND distance > 5km
rush_mask = (time_of_day == 3) & (distance > 5)

# Long OR slow
long_or_slow = (distance > 6) | (traffic > 8)

# NOT rainy (rainy = time_of_day==4 as proxy)
not_rainy = ~(time_of_day == 4)

# Combine: evening rush, not too far
ideal = (time_of_day == 3) & (distance < 4)
print(f"Evening rush, short distance: {ideal.sum()} orders")

# ── np.where — conditional element-wise selection ─────────────────────
# np.where(condition, value_if_true, value_if_false)
delivery_category = np.where(distance < 3, 'short', 'long')
print(f"\nShort deliveries: {(delivery_category == 'short').sum()}")

# Numerical version — replace outliers with median
q1, q99 = np.percentile(distance, [1, 99])
distance_clipped = np.where(distance > q99, q99,
                   np.where(distance < q1, q1, distance))

print(f"Before clip: max={distance.max():.2f}")
print(f"After clip:  max={distance_clipped.max():.2f}")

# ── Boolean indexing for assignment ──────────────────────────────────
X_copy = X.copy()
# Set all negative values to 0 (ReLU-like operation)
X_copy[X_copy < 0] = 0
print(f"\nNegatives before: {(X < 0).sum()}")
print(f"Negatives after:  {(X_copy < 0).sum()}")   # 0`} />

        <h3 style={S.h3}>Fancy indexing — select non-contiguous elements</h3>

        <CodeBlock code={`import numpy as np
np.random.seed(42)
X = np.random.randn(1000, 4)
y = np.random.randn(1000)

# ── Fancy indexing with integer arrays ───────────────────────────────
# Select specific rows by index
selected_rows = np.array([0, 5, 99, 204, 999])
X_selected = X[selected_rows]           # shape (5, 4)

# Select specific columns by index
feature_indices = np.array([0, 2])      # distance and prep_time only
X_two_feats = X[:, feature_indices]     # shape (1000, 2)

# Combine: specific rows AND specific columns
X_subset = X[selected_rows][:, feature_indices]  # shape (5, 2)

# ── Random sampling — train/val/test splits ────────────────────────────
n = len(X)
indices = np.random.permutation(n)       # shuffled indices

train_end = int(0.70 * n)
val_end   = int(0.85 * n)

train_idx = indices[:train_end]
val_idx   = indices[train_end:val_end]
test_idx  = indices[val_end:]

X_train, y_train = X[train_idx], y[train_idx]
X_val,   y_val   = X[val_idx],   y[val_idx]
X_test,  y_test  = X[test_idx],  y[test_idx]

print(f"Train: {X_train.shape}, Val: {X_val.shape}, Test: {X_test.shape}")

# ── np.argsort — sort by value, keep indices ──────────────────────────
importances = np.array([0.52, 0.07, 0.28, 0.13])   # feature importances
sorted_idx  = np.argsort(importances)[::-1]          # descending order
feature_names = ['distance', 'time_of_day', 'traffic', 'prep_time']

print("\nFeatures by importance:")
for rank, idx in enumerate(sorted_idx):
    print(f"  {rank+1}. {feature_names[idx]:<15}: {importances[idx]:.2f}")

# ── np.argmax, np.argmin — index of max/min value ─────────────────────
losses = np.array([2.3, 1.9, 1.4, 1.1, 1.3, 1.0, 1.2])
best_epoch = np.argmin(losses)
print(f"\nBest epoch: {best_epoch} (loss={losses[best_epoch]:.1f})")

# For multi-class predictions: argmax gives the predicted class
logits = np.array([[2.1, 0.3, -0.5],
                   [-0.2, 3.1, 0.8],
                   [0.5, 0.1, 2.9]])
predicted_classes = np.argmax(logits, axis=1)
print(f"Predicted classes: {predicted_classes}")  # [0, 1, 2]`} />
      </div>

      <Div />

      {/* ══ SECTION 4 — RESHAPING ══════════════════════════════════════════════ */}
      <div style={S.sec}>
        <span style={S.tag}>Changing shapes</span>
        <h2 style={S.h2}>Reshaping — change the view without changing the data</h2>

        <p style={S.p}>
          Reshaping is one of the most frequently used operations in deep learning.
          You reshape to add a batch dimension, to flatten an image into a vector,
          to convert between 2D and 3D representations.
          The crucial insight: reshape does not copy data — it just changes
          how you interpret the same underlying memory block.
        </p>

        <CodeBlock code={`import numpy as np

# ── reshape — the main tool ───────────────────────────────────────────
x = np.arange(24)             # [0, 1, 2, ..., 23]  shape (24,)

mat   = x.reshape(4, 6)       # (4, 6) — 4 rows × 6 cols
cube  = x.reshape(2, 3, 4)    # (2, 3, 4) — 3D
cube2 = x.reshape(2, -1, 4)   # -1 means "infer this dim" → (2, 3, 4)

print(f"Original: {x.shape}")
print(f"4×6:      {mat.shape}")
print(f"2×3×4:    {cube.shape}")
print(f"-1 infer: {cube2.shape}")

# ── Adding and removing dimensions ────────────────────────────────────
# Very common pattern: add a batch dimension or channel dimension

v = np.array([1.0, 2.0, 3.0, 4.0])   # shape (4,)

# Add dimension at position 0: (4,) → (1, 4)
v_row = v[np.newaxis, :]              # or v.reshape(1, -1)
v_row2= v[None, :]                    # None is identical to np.newaxis
print(f"v:     {v.shape} → row: {v_row.shape}")

# Add dimension at position 1: (4,) → (4, 1)
v_col = v[:, np.newaxis]              # or v.reshape(-1, 1)
print(f"v:     {v.shape} → col: {v_col.shape}")

# Remove dimensions of size 1
squeezed = v_row.squeeze()            # (1, 4) → (4,)
print(f"after squeeze: {squeezed.shape}")

# ── Real ML usage ─────────────────────────────────────────────────────
# sklearn expects 2D input (n_samples, n_features)
single_order = np.array([3.2, 7.0, 15.0, 2.0])   # shape (4,)
# Pass to sklearn model:
X_single = single_order.reshape(1, -1)   # shape (1, 4) ✓
print(f"For sklearn: {single_order.shape} → {X_single.shape}")

# Image: (H, W, C) → flat vector for a dense layer
image = np.random.randn(28, 28, 1)    # 28×28 grayscale image
flat  = image.reshape(-1)             # shape (784,) — 28*28*1
flat2 = image.flatten()               # same result but always copies
print(f"Image {image.shape} → flat {flat.shape}")

# Batch of images: (N, H, W, C) → (N, H*W*C)
batch  = np.random.randn(32, 28, 28, 1)
batch_flat = batch.reshape(32, -1)    # (32, 784)
print(f"Batch {batch.shape} → flat {batch_flat.shape}")

# ── transpose — swap axes ─────────────────────────────────────────────
X = np.random.randn(1000, 4)   # (n_samples, n_features)
X_T = X.T                      # (4, n_samples) — transpose
print(f"X: {X.shape} → X.T: {X_T.shape}")

# For 3D: specify the axis order
batch3d  = np.random.randn(32, 128, 64)  # (batch, seq, features)
swapped  = batch3d.transpose(0, 2, 1)   # (batch, features, seq) — PyTorch convention
print(f"(32,128,64) → transpose(0,2,1) → {swapped.shape}")`} />
      </div>

      <Div />

      {/* ══ SECTION 5 — AGGREGATION ════════════════════════════════════════════ */}
      <div style={S.sec}>
        <span style={S.tag}>Summarising data</span>
        <h2 style={S.h2}>Aggregation — compute statistics along any axis</h2>

        <p style={S.p}>
          Aggregation functions collapse one or more dimensions of an array
          into a summary statistic. The <span style={S.code as React.CSSProperties}>axis</span> parameter
          is the key concept: <span style={S.code as React.CSSProperties}>axis=0</span> means
          "collapse rows" (operate down columns), while
          <span style={S.code as React.CSSProperties}> axis=1</span> means
          "collapse columns" (operate across rows).
          Getting this backwards is one of the most common NumPy mistakes.
        </p>

        <VisualBox label="axis=0 vs axis=1 — the most confused parameter in NumPy">
          <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap', alignItems: 'flex-start' }}>
            <div>
              <div style={{
                fontFamily: 'var(--font-mono)', fontSize: 12,
                color: 'var(--muted)', marginBottom: 8,
              }}>
                X shape = (4, 3)
              </div>
              <div style={{
                display: 'grid', gridTemplateColumns: 'repeat(3, 44px)',
                gap: 3,
              }}>
                {[1,2,3, 4,5,6, 7,8,9, 10,11,12].map((v, i) => (
                  <div key={i} style={{
                    height: 32, display: 'flex', alignItems: 'center',
                    justifyContent: 'center',
                    background: i < 3 ? 'rgba(55,138,221,0.15)' :
                                i < 6 ? 'rgba(55,138,221,0.10)' :
                                i < 9 ? 'rgba(55,138,221,0.07)' :
                                        'rgba(55,138,221,0.04)',
                    border: '1px solid rgba(55,138,221,0.3)',
                    borderRadius: 4,
                    fontSize: 13, fontFamily: 'var(--font-mono)', color: 'var(--text)',
                  }}>
                    {v}
                  </div>
                ))}
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              <div style={{
                background: 'var(--surface)', border: '1px solid rgba(29,158,117,0.3)',
                borderRadius: 7, padding: '10px 14px',
              }}>
                <div style={{ fontSize: 12, fontWeight: 700, color: '#1D9E75', fontFamily: 'var(--font-mono)', marginBottom: 5 }}>
                  axis=0 — collapse rows
                </div>
                <div style={{ fontSize: 12, color: 'var(--muted)', fontFamily: 'var(--font-mono)', lineHeight: 1.7 }}>
                  X.sum(axis=0) → shape (3,)<br />
                  = [22, 26, 30]<br />
                  = sum of each COLUMN
                </div>
              </div>
              <div style={{
                background: 'var(--surface)', border: '1px solid rgba(216,90,48,0.3)',
                borderRadius: 7, padding: '10px 14px',
              }}>
                <div style={{ fontSize: 12, fontWeight: 700, color: '#D85A30', fontFamily: 'var(--font-mono)', marginBottom: 5 }}>
                  axis=1 — collapse columns
                </div>
                <div style={{ fontSize: 12, color: 'var(--muted)', fontFamily: 'var(--font-mono)', lineHeight: 1.7 }}>
                  X.sum(axis=1) → shape (4,)<br />
                  = [6, 15, 24, 33]<br />
                  = sum of each ROW
                </div>
              </div>
            </div>
          </div>
        </VisualBox>

        <CodeBlock code={`import numpy as np
np.random.seed(42)

# 1000 orders × 4 features
X = np.abs(np.random.randn(1000, 4))
# Columns: [distance, traffic, prep_time, time_of_day]

# ── Per-feature statistics (axis=0 — collapse rows) ───────────────────
feature_mean = X.mean(axis=0)    # shape (4,) — mean of each column
feature_std  = X.std(axis=0)     # shape (4,)
feature_min  = X.min(axis=0)     # shape (4,)
feature_max  = X.max(axis=0)     # shape (4,)

print("Per-feature statistics (shape 4,):")
feature_names = ['distance', 'traffic', 'prep_time', 'time_of_day']
for name, mean, std, mn, mx in zip(feature_names,
                                    feature_mean, feature_std,
                                    feature_min, feature_max):
    print(f"  {name:<15}: mean={mean:.2f} std={std:.2f} range=[{mn:.2f},{mx:.2f}]")

# ── Per-sample statistics (axis=1 — collapse columns) ─────────────────
sample_mean = X.mean(axis=1)   # shape (1000,) — mean feature value per order
sample_max  = X.max(axis=1)    # shape (1000,) — most extreme feature per order

print(f"\nPer-sample mean shape:  {sample_mean.shape}")
print(f"First 5 sample means:   {sample_mean[:5].round(2)}")

# ── Global statistics (no axis — scalar result) ───────────────────────
global_mean = X.mean()    # scalar — mean of ALL elements
global_std  = X.std()
total       = X.sum()

print(f"\nGlobal mean: {global_mean:.4f}")
print(f"Global std:  {global_std:.4f}")

# ── keepdims=True — preserve shape for broadcasting ───────────────────
# Without keepdims: shape goes from (1000, 4) to (4,)
# With keepdims:    shape goes from (1000, 4) to (1, 4) — broadcastable!
mean_2d = X.mean(axis=0, keepdims=True)   # shape (1, 4) not (4,)
std_2d  = X.std(axis=0, keepdims=True)    # shape (1, 4)

X_normalised = (X - mean_2d) / std_2d    # broadcasting works because of (1,4)
print(f"\nNormalised mean (should be ~0): {X_normalised.mean(axis=0).round(4)}")
print(f"Normalised std  (should be ~1): {X_normalised.std(axis=0).round(4)}")

# ── Other useful aggregation functions ────────────────────────────────
losses = np.array([2.3, 1.9, 1.4, 1.1, 1.3, 1.0, 1.2])

print(f"\ncumsum:    {np.cumsum(losses).round(2)}")  # running total
print(f"diff:      {np.diff(losses).round(2)}")      # change between steps
print(f"clip:      {np.clip(losses, 1.1, 1.8).round(2)}")  # clamp to range
print(f"percentile: p25={np.percentile(losses,25):.2f}  p75={np.percentile(losses,75):.2f}")
print(f"median:    {np.median(losses):.2f}")
print(f"unique:    {np.unique([1,2,2,3,3,3,4])}")   # unique values`} />
      </div>

      <Div />

      {/* ══ SECTION 6 — VECTORISATION ══════════════════════════════════════════ */}
      <div style={S.sec}>
        <span style={S.tag}>The most important skill</span>
        <h2 style={S.h2}>Vectorisation — replace every for loop with an array operation</h2>

        <p style={S.p}>
          Vectorisation means expressing computations as operations on whole arrays
          rather than loops over individual elements. NumPy operations are
          implemented in C and execute using SIMD instructions that process
          multiple elements per CPU clock cycle. A Python for loop processes
          one element per several clock cycles with Python object overhead.
          The difference is typically 100–10,000×.
        </p>

        <p style={S.p}>
          The mental shift required: instead of thinking "for each element,
          do X", think "apply X to the whole array at once."
          Almost every ML computation can be expressed this way.
        </p>

        <CodeBlock code={`import numpy as np
import timeit

np.random.seed(42)
n = 100_000
X = np.random.randn(n, 4)
y = np.random.randn(n)

# ── Example 1: standardisation ────────────────────────────────────────

# Loop version (NEVER DO THIS)
def standardise_loop(X):
    result = np.zeros_like(X)
    for j in range(X.shape[1]):          # loop over features
        col = X[:, j]
        mean = sum(col) / len(col)
        std  = (sum((v-mean)**2 for v in col) / len(col)) ** 0.5
        for i in range(len(col)):         # loop over samples — doubly bad
            result[i, j] = (col[i] - mean) / std
    return result

# Vectorised version (ALWAYS DO THIS)
def standardise_numpy(X):
    mean = X.mean(axis=0)    # shape (4,)
    std  = X.std(axis=0)     # shape (4,)
    return (X - mean) / std  # broadcasting handles the rest

# Time both (using small n for loop version — large would take forever)
X_small = X[:1000]
t_loop  = timeit.timeit(lambda: standardise_loop(X_small),  number=1)
t_numpy = timeit.timeit(lambda: standardise_numpy(X_small), number=100) / 100

print(f"Loop  (n=1000): {t_loop*1000:.1f}ms")
print(f"NumPy (n=1000): {t_numpy*1000:.2f}ms")
print(f"Speedup: {t_loop/t_numpy:.0f}×")

# Verify correctness
np.testing.assert_allclose(
    standardise_loop(X_small),
    standardise_numpy(X_small),
    rtol=1e-5
)
print("Results identical ✓")

# ── Example 2: pairwise squared distances ─────────────────────────────

# Loop version — O(n²) loops in Python
def pairwise_sq_dist_loop(A, B):
    n, m = len(A), len(B)
    D = np.zeros((n, m))
    for i in range(n):
        for j in range(m):
            D[i,j] = np.sum((A[i] - B[j])**2)
    return D

# Vectorised version — expand dims and broadcast
def pairwise_sq_dist_numpy(A, B):
    # A: (n, d), B: (m, d)
    # A[:, None, :] - B[None, :, :] broadcasts to (n, m, d)
    diff = A[:, None, :] - B[None, :, :]  # (n, m, d)
    return (diff ** 2).sum(axis=2)         # (n, m)

A = np.random.randn(50, 4)
B = np.random.randn(60, 4)

t_loop  = timeit.timeit(lambda: pairwise_sq_dist_loop(A, B),  number=1)
t_numpy = timeit.timeit(lambda: pairwise_sq_dist_numpy(A, B), number=100)/100

print(f"\nPairwise distances (50×60):")
print(f"Loop:  {t_loop*1000:.1f}ms")
print(f"NumPy: {t_numpy*1000:.3f}ms  speedup: {t_loop/t_numpy:.0f}×")

# ── Example 3: activation functions ──────────────────────────────────

z = np.random.randn(1000, 64)  # layer output before activation

# All vectorised — no loops needed
relu    = np.maximum(0, z)                              # ReLU
sigmoid = 1 / (1 + np.exp(-z))                         # Sigmoid
tanh    = np.tanh(z)                                    # Tanh
softmax_z = np.exp(z - z.max(axis=1, keepdims=True))   # stable softmax
softmax = softmax_z / softmax_z.sum(axis=1, keepdims=True)

print(f"\nActivations all computed vectorised, shape: {relu.shape}")
print(f"ReLU: min={relu.min():.2f} max={relu.max():.2f}")
print(f"Sigmoid: min={sigmoid.min():.4f} max={sigmoid.max():.4f}")
print(f"Softmax row sum: {softmax.sum(axis=1)[:3].round(4)}")  # should be all 1.0`} />
      </div>

      <Div />

      {/* ══ SECTION 7 — BROADCASTING ═══════════════════════════════════════════ */}
      <div style={S.sec}>
        <span style={S.tag}>The rule that makes everything elegant</span>
        <h2 style={S.h2}>Broadcasting — operate on arrays of different shapes</h2>

        <p style={S.p}>
          Broadcasting is NumPy's way of performing operations between arrays
          of different shapes without copying data. When you subtract a mean
          vector of shape (4,) from a matrix of shape (1000, 4), NumPy doesn't
          create 1000 copies of the mean vector — it conceptually "stretches"
          the smaller array to match the larger one, then operates.
          The result is correct and memory-efficient.
        </p>

        <p style={S.p}>
          Broadcasting follows a specific rule. Arrays are compared
          dimension by dimension from the right. Two dimensions are compatible if
          they are equal, or one of them is 1 (the size-1 dimension gets stretched).
          If dimensions don't satisfy either condition, NumPy raises a ValueError.
        </p>

        <VisualBox label="Broadcasting rules — checked from right to left">
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {[
              {
                a: '(1000, 4)',
                b: '(4,)',
                result: '(1000, 4)',
                valid: true,
                reason: '4=4 ✓ then 1000 vs missing → treated as 1 → stretches',
                color: '#1D9E75',
              },
              {
                a: '(1000, 4)',
                b: '(1, 4)',
                result: '(1000, 4)',
                valid: true,
                reason: '4=4 ✓ then 1000 vs 1 → 1 stretches to 1000',
                color: '#1D9E75',
              },
              {
                a: '(1000, 4)',
                b: '(1000, 1)',
                result: '(1000, 4)',
                valid: true,
                reason: '4 vs 1 → 1 stretches to 4 ✓ then 1000=1000 ✓',
                color: '#1D9E75',
              },
              {
                a: '(3, 4)',
                b: '(3,)',
                result: '(3, 4)',
                valid: true,
                reason: 'b treated as (1,3) — 4 vs 3 → mismatch! But actually (3,) right-aligns as 3≠4 → ERROR',
                color: '#ff4757',
              },
              {
                a: '(3, 4)',
                b: '(3, 1)',
                result: '(3, 4)',
                valid: true,
                reason: '4 vs 1 → stretches ✓ then 3=3 ✓',
                color: '#1D9E75',
              },
            ].map((row, i) => (
              <div key={i} style={{
                display: 'flex', gap: 10, alignItems: 'center', flexWrap: 'wrap',
              }}>
                <div style={{
                  padding: '4px 10px', borderRadius: 5,
                  background: 'rgba(55,138,221,0.1)',
                  border: '1px solid rgba(55,138,221,0.4)',
                  fontSize: 12, fontFamily: 'var(--font-mono)', color: '#378ADD',
                  minWidth: 80, textAlign: 'center' as const,
                }}>
                  {row.a}
                </div>
                <span style={{ color: 'var(--muted)', fontSize: 13 }}>op</span>
                <div style={{
                  padding: '4px 10px', borderRadius: 5,
                  background: 'rgba(29,158,117,0.1)',
                  border: '1px solid rgba(29,158,117,0.4)',
                  fontSize: 12, fontFamily: 'var(--font-mono)', color: '#1D9E75',
                  minWidth: 80, textAlign: 'center' as const,
                }}>
                  {row.b}
                </div>
                <span style={{ color: 'var(--muted)', fontSize: 13 }}>=</span>
                <div style={{
                  padding: '4px 10px', borderRadius: 5,
                  background: row.valid ? 'rgba(216,90,48,0.1)' : 'rgba(226,75,74,0.08)',
                  border: `1px solid ${row.valid ? 'rgba(216,90,48,0.4)' : 'rgba(226,75,74,0.4)'}`,
                  fontSize: 12, fontFamily: 'var(--font-mono)',
                  color: row.valid ? '#D85A30' : '#ff4757',
                  minWidth: 80, textAlign: 'center' as const,
                }}>
                  {row.valid ? row.result : 'ERROR'}
                </div>
                <span style={{ fontSize: 11, color: 'var(--muted)', flex: 1 }}>
                  {row.reason}
                </span>
              </div>
            ))}
          </div>
        </VisualBox>

        <CodeBlock code={`import numpy as np
np.random.seed(42)

X = np.random.randn(1000, 4)   # (1000, 4) training data

# ── Example 1: standardisation ─────────────────────────────────────────
mean = X.mean(axis=0)   # shape (4,)
std  = X.std(axis=0)    # shape (4,)

# (1000,4) - (4,) → NumPy right-aligns: (1000,4) - (1,4) → broadcasts → (1000,4)
X_norm = (X - mean) / std
print(f"X: {X.shape}  mean: {mean.shape}  X_norm: {X_norm.shape}")
print(f"After normalisation: mean≈{X_norm.mean(axis=0).round(4)}")

# ── Example 2: per-sample scaling ─────────────────────────────────────
# Scale each SAMPLE (row) by its own L2 norm → unit vectors
row_norms = np.linalg.norm(X, axis=1, keepdims=True)  # shape (1000,1)
X_unit = X / row_norms    # (1000,4) / (1000,1) → each row divided by its norm
print(f"Row norms after: {np.linalg.norm(X_unit, axis=1)[:5].round(4)}")  # all ≈ 1.0

# Without keepdims, this would fail:
row_norms_1d = np.linalg.norm(X, axis=1)   # shape (1000,) — no keepdims
# X / row_norms_1d  → (1000,4) / (1000,) → (4,) != (1000,) → ERROR
# Fix: reshape to column vector
X_unit2 = X / row_norms_1d.reshape(-1, 1)   # (1000,4) / (1000,1) — works
np.testing.assert_allclose(X_unit, X_unit2)

# ── Example 3: bias addition in neural networks ────────────────────────
batch_size = 32
W = np.random.randn(4, 64)     # weight matrix
b = np.random.randn(64)        # bias vector — shape (64,)
X_batch = X[:batch_size]       # shape (32, 4)

# Z = X @ W + b
Z = X_batch @ W + b            # (32,64) + (64,) → broadcasts to (32,64)
print(f"\nZ = X@W + b: {X_batch.shape} @ {W.shape} + {b.shape} = {Z.shape}")

# ── Example 4: distance to cluster centres ─────────────────────────────
# K-Means style: compute distance from each point to each centroid
n_clusters = 5
centroids  = np.random.randn(n_clusters, 4)   # shape (5, 4)
X_small    = X[:100]                           # shape (100, 4)

# Want: distance[i, k] = ||X[i] - centroids[k]||²
# X_small[:, None, :]  → (100, 1, 4)
# centroids[None, :, :] → (1, 5, 4)
# difference:           → (100, 5, 4)  — broadcast!
diff      = X_small[:, None, :] - centroids[None, :, :]  # (100, 5, 4)
distances = (diff ** 2).sum(axis=2)                        # (100, 5)
cluster_assignments = np.argmin(distances, axis=1)         # (100,)

print(f"\nDistances shape: {distances.shape}")
print(f"Cluster assignments: {cluster_assignments[:10]}")
print(f"Cluster counts: {np.bincount(cluster_assignments, minlength=n_clusters)}")`} />
      </div>

      <Div />

      {/* ══ SECTION 8 — VIEWS VS COPIES ════════════════════════════════════════ */}
      <div style={S.sec}>
        <span style={S.tag}>The source of silent bugs</span>
        <h2 style={S.h2}>Views vs copies — the most dangerous NumPy behaviour</h2>

        <p style={S.p}>
          When you slice a NumPy array, you don't get a copy of the data —
          you get a <em>view</em>. The view and the original share the same
          underlying memory. Modifying the view modifies the original.
          This is a feature (saves memory and time) but it's the most common
          source of subtle bugs in ML code, especially in data preprocessing pipelines
          where you think you're working on a copy.
        </p>

        <CodeBlock code={`import numpy as np

# ── Views: slice shares memory with original ──────────────────────────
X = np.array([[1, 2, 3],
              [4, 5, 6],
              [7, 8, 9]])

X_view = X[0:2]          # slice → view (NOT a copy)
X_view[0, 0] = 999       # modifying the view...

print("X after modifying X_view:")
print(X)
# [[999   2   3]   ← X was modified too!
#  [  4   5   6]
#  [  7   8   9]]

# Check if two arrays share memory
print(f"np.shares_memory(X, X_view): {np.shares_memory(X, X_view)}")  # True

# ── How to make a true copy ────────────────────────────────────────────
X = np.array([[1, 2, 3], [4, 5, 6], [7, 8, 9]])

X_copy = X[0:2].copy()    # .copy() creates independent array
X_copy[0, 0] = 999

print("\nX after modifying X_copy (X should be unchanged):")
print(X)
# [[1, 2, 3]   ← unchanged ✓
#  [4, 5, 6]
#  [7, 8, 9]]

print(f"np.shares_memory(X, X_copy): {np.shares_memory(X, X_copy)}")  # False

# ── When does NumPy copy vs view? ─────────────────────────────────────
X = np.arange(20).reshape(4, 5)

# Always a view (same memory):
view1 = X[:]          # full slice
view2 = X[1:3]        # contiguous slice
view3 = X.T           # transpose
view4 = X.reshape(-1) # reshape (usually)
view5 = X[:, ::2]     # strided slice

# Always a copy (new memory):
copy1 = X[[0, 2]]        # fancy indexing
copy2 = X[X > 5]         # boolean indexing
copy3 = X.flatten()       # flatten (unlike reshape)
copy4 = X.astype(float)   # type conversion

print("\nView or copy check:")
for name, arr in [('X[:]', view1), ('X[1:3]', view2), ('X.T', view3),
                   ('X[[0,2]]', copy1), ('X[X>5]', copy2)]:
    print(f"  {name:<12}: {'VIEW' if np.shares_memory(X, arr) else 'COPY'}")

# ── The preprocessing pipeline bug ────────────────────────────────────
# WRONG — mutates original training data accidentally
from sklearn.datasets import make_classification
X_train, _ = make_classification(n_samples=100, random_state=42)

X_processed = X_train[:80]         # view — shares memory
X_processed -= X_processed.mean()  # modifies X_train too! Silent bug.
print(f"\nX_train[0,0] after 'processing' X_processed: {X_train[0,0]:.4f}")
# This is not zero — the subtraction changed X_train itself

# CORRECT — always copy when you intend to modify
X_train, _ = make_classification(n_samples=100, random_state=42)
original_val = X_train[0, 0]

X_processed = X_train[:80].copy()  # explicit copy
X_processed -= X_processed.mean()  # only modifies the copy

print(f"X_train[0,0] unchanged: {X_train[0,0]:.4f} == {original_val:.4f}")`} />

        <Callout type="warning">
          The rule of thumb: if you plan to modify a subset of an array,
          always call <span style={S.code as React.CSSProperties}>.copy()</span> on it first.
          If you're only reading from it, a view is fine and more efficient.
          When in doubt: <span style={S.code as React.CSSProperties}>np.shares_memory(a, b)</span>{' '}
          tells you immediately whether two arrays share memory.
        </Callout>
      </div>

      <Div />

      {/* ══ SECTION 9 — LINALG ═════════════════════════════════════════════════ */}
      <div style={S.sec}>
        <span style={S.tag}>Linear algebra</span>
        <h2 style={S.h2}>np.linalg — the linear algebra toolkit</h2>

        <p style={S.p}>
          The <span style={S.code as React.CSSProperties}>np.linalg</span> module implements
          the linear algebra operations from Modules 03 and 04 in fast,
          numerically stable C code. You'll use this whenever you implement
          algorithms from scratch or need to analyse a model's weight matrices.
        </p>

        <CodeBlock code={`import numpy as np
np.random.seed(42)

# ── Matrix norms ──────────────────────────────────────────────────────
X = np.random.randn(1000, 4)
W = np.random.randn(4, 64)

# L2 norm of a vector (length / magnitude)
v = np.array([3.0, 4.0])
l2_norm = np.linalg.norm(v)         # sqrt(3²+4²) = 5.0
print(f"L2 norm of [3,4]: {l2_norm}")

# L2 norm of each row in a matrix
row_norms = np.linalg.norm(X, axis=1)   # shape (1000,) — norm per sample
print(f"Row norms: mean={row_norms.mean():.2f} std={row_norms.std():.2f}")

# Frobenius norm of a matrix — norm of all elements as a single vector
frob = np.linalg.norm(W)
print(f"Weight matrix Frobenius norm: {frob:.4f}")

# ── Solving linear systems ─────────────────────────────────────────────
# Solve Ax = b  — appears in OLS linear regression
A = np.array([[2, 1], [1, 3]], dtype=float)
b = np.array([5, 10], dtype=float)
x = np.linalg.solve(A, b)
print(f"\nSolve Ax=b: x = {x}")
print(f"Verify Ax: {A @ x}")   # should equal b

# OLS solution: w = (XᵀX)⁻¹ Xᵀy  (closed-form linear regression)
X_small = X[:100]
y = np.random.randn(100)
# Add bias column
X_b = np.column_stack([X_small, np.ones(100)])   # (100, 5)
w_ols = np.linalg.solve(X_b.T @ X_b, X_b.T @ y)
print(f"\nOLS weights: {w_ols.round(3)}")

# ── Eigenvalues and eigenvectors — basis of PCA ───────────────────────
# Covariance matrix of features
X_centred = X - X.mean(axis=0)
cov = X_centred.T @ X_centred / len(X)   # (4, 4) covariance matrix

eigenvalues, eigenvectors = np.linalg.eig(cov)

# Sort by descending eigenvalue
idx = np.argsort(eigenvalues)[::-1]
eigenvalues  = eigenvalues[idx].real
eigenvectors = eigenvectors[:, idx].real

print(f"\nEigenvalues (variance in each direction):")
for i, ev in enumerate(eigenvalues):
    print(f"  PC{i+1}: {ev:.4f}  ({ev/eigenvalues.sum()*100:.1f}% variance)")

# The eigenvectors ARE the principal components
# Project data onto first 2 PCs
X_pca = X_centred @ eigenvectors[:, :2]
print(f"PCA projection: {X.shape} → {X_pca.shape}")

# ── SVD ───────────────────────────────────────────────────────────────
# Compact SVD — only compute the non-zero singular values
U, sigma, Vt = np.linalg.svd(X_centred, full_matrices=False)
print(f"\nSVD: U={U.shape}, sigma={sigma.shape}, Vt={Vt.shape}")
print(f"Singular values: {sigma[:4].round(4)}")

# Reconstruct with top k components (low-rank approximation)
k = 2
X_reconstructed = U[:, :k] * sigma[:k] @ Vt[:k, :]
reconstruction_error = np.linalg.norm(X_centred - X_reconstructed)
print(f"Reconstruction error (k=2): {reconstruction_error:.4f}")

# ── Matrix rank and condition number ──────────────────────────────────
rank = np.linalg.matrix_rank(cov)
cond = np.linalg.cond(cov)
print(f"\nCovariance matrix rank: {rank}")
print(f"Condition number: {cond:.2f}  ({'well-conditioned' if cond < 100 else 'ill-conditioned'})")`} />
      </div>

      <Div />

      {/* ══ SECTION 10 — RANDOM ════════════════════════════════════════════════ */}
      <div style={S.sec}>
        <span style={S.tag}>Reproducible experiments</span>
        <h2 style={S.h2}>Random number generation — reproducibility in ML</h2>

        <p style={S.p}>
          Randomness appears everywhere in ML: weight initialisation, data shuffling,
          train/test splits, dropout, data augmentation, random search.
          Reproducibility requires setting seeds carefully.
          The modern NumPy approach uses a Generator object instead of the
          global random state — it's safer, more flexible, and the recommended
          practice in all new code.
        </p>

        <CodeBlock code={`import numpy as np

# ── Old API (global state) — still works, avoid in new code ──────────
np.random.seed(42)
a = np.random.randn(5)
np.random.seed(42)   # reset
b = np.random.randn(5)
print(f"Same seed → same array: {np.array_equal(a, b)}")   # True

# Problem with global state: if any library you import calls
# np.random functions, it changes the global state unpredictably.

# ── New API (Generator objects) — recommended ─────────────────────────
rng = np.random.default_rng(seed=42)

# All standard distributions
normal    = rng.normal(loc=35, scale=8, size=(100, 4))
uniform   = rng.uniform(low=0, high=1, size=1000)
integers  = rng.integers(low=0, high=10, size=500)
choice    = rng.choice([0,1,2,3], size=100, replace=True, p=[0.7, 0.2, 0.07, 0.03])
perm      = rng.permutation(1000)           # random permutation
bernoulli = rng.binomial(n=1, p=0.3, size=100)   # 0/1 samples

# Multiple independent streams — for parallel experiments
rng1 = np.random.default_rng(seed=0)
rng2 = np.random.default_rng(seed=1)
# These produce independent random streams regardless of order

# ── Weight initialisation — Xavier and He ────────────────────────────
rng = np.random.default_rng(42)

def xavier_init(n_in: int, n_out: int) -> np.ndarray:
    """Xavier/Glorot uniform: good for sigmoid/tanh activations."""
    limit = np.sqrt(6 / (n_in + n_out))
    return rng.uniform(-limit, limit, size=(n_in, n_out))

def he_init(n_in: int, n_out: int) -> np.ndarray:
    """He normal: good for ReLU activations."""
    std = np.sqrt(2 / n_in)
    return rng.normal(0, std, size=(n_in, n_out))

W1 = xavier_init(4, 64)
W2 = he_init(64, 32)
W3 = he_init(32, 1)

print(f"Xavier W1: mean={W1.mean():.4f} std={W1.std():.4f}")
print(f"He     W2: mean={W2.mean():.4f} std={W2.std():.4f}")

# Good init: std should be ~sqrt(2/n_in) for He, ~sqrt(1/n_in) for Xavier
print(f"Expected He std: {np.sqrt(2/64):.4f}  actual: {W2.std():.4f}")

# ── Reproducible train/val/test split ────────────────────────────────
def split_dataset(X, y, train=0.70, val=0.15, seed=42):
    n = len(X)
    rng = np.random.default_rng(seed)
    idx = rng.permutation(n)
    t = int(n * train)
    v = int(n * (train + val))
    return (X[idx[:t]], y[idx[:t]],
            X[idx[t:v]], y[idx[t:v]],
            X[idx[v:]], y[idx[v:]])

X = np.random.randn(1000, 4)
y = np.random.randn(1000)
X_tr, y_tr, X_v, y_v, X_te, y_te = split_dataset(X, y, seed=42)
print(f"\nSplit: train={len(X_tr)} val={len(X_v)} test={len(X_te)}")`} />
      </div>

      <Div />

      {/* ══ SECTION 11 — ERRORS ════════════════════════════════════════════════ */}
      <div style={S.sec}>
        <span style={S.tag}>Errors you will hit</span>
        <h2 style={S.h2}>Every common NumPy error — explained and fixed</h2>

        <ErrorBlock
          error="ValueError: operands could not be broadcast together with shapes (1000,4) (1000,)"
          cause="You're trying to operate between a 2D array (1000,4) and a 1D array (1000,). NumPy right-aligns shapes: (1000,4) vs (1000,) → (1000,4) vs mismatch. The (1000,) is treated as a row vector (1,1000), not a column vector (1000,1)."
          fix="Reshape the 1D array to a column vector: arr.reshape(-1, 1) gives shape (1000,1). Now (1000,4) op (1000,1) broadcasts correctly to (1000,4). Always use keepdims=True when computing per-sample statistics to avoid this."
        />

        <ErrorBlock
          error="ValueError: cannot reshape array of size 100 into shape (10,11)"
          cause="The reshape dimensions don't multiply to the total number of elements. 10×11=110 ≠ 100. NumPy requires the total element count to be preserved exactly."
          fix="Check that your target dimensions multiply to the original size. Use -1 for one dimension to let NumPy infer it: arr.reshape(10, -1) → NumPy computes 100/10=10 → shape (10,10). If elements truly don't divide evenly, you need to pad or trim first."
        />

        <ErrorBlock
          error="IndexError: index 1000 is out of bounds for axis 0 with size 1000"
          cause="You're using 1-based indexing when NumPy uses 0-based. The valid indices for an array of size 1000 are 0 through 999. Index 1000 doesn't exist."
          fix="Use X[999] for the last element, or X[-1] which always gives the last element regardless of array size. When iterating, use range(len(X)) or enumerate(X) rather than range(1, len(X)+1)."
        />

        <ErrorBlock
          error="RuntimeWarning: invalid value encountered in double_scalars (nan produced)"
          cause="A computation produced NaN (Not a Number) — usually 0/0, inf-inf, or log(0). This is silent in NumPy (it produces NaN without raising an exception) but will silently corrupt your loss function and gradients."
          fix="Use np.isnan(arr).any() to check for NaN after suspicious operations. For log: np.log(np.clip(x, 1e-10, None)). For division: np.divide(a, b, out=np.zeros_like(a), where=b!=0). Use np.errstate(divide='raise', invalid='raise') during development to turn warnings into exceptions."
        />

        <ErrorBlock
          error="TypeError: ufunc 'add' output (typecode 'f') could not be coerced to provided output parameter (typecode 'd')"
          cause="You're trying to store the result of an operation into an array with a different dtype. For example, adding float64 values and trying to store the result in a float32 output array."
          fix="Create the output array with the correct dtype before the operation, or use the dtype parameter: result = (X + Y).astype(np.float32). When mixing dtypes, be explicit about what precision you want in the final result."
        />

        <ErrorBlock
          error="MemoryError: Unable to allocate X GiB for an array"
          cause="You're trying to create an array larger than available RAM. This commonly happens with pairwise distance matrices — for n=100,000 points, a float64 distance matrix needs 100,000² × 8 bytes = 80 GB."
          fix="Process in batches: compute distances between one batch and all others, process, then move to the next batch. Use float32 instead of float64 (halves memory). Use scipy.spatial.distance for memory-efficient pairwise distances. For very large datasets, use approximate nearest neighbours (FAISS)."
        />
      </div>

      <Div />

      {/* ══ SECTION 12 — WHAT'S NEXT ═══════════════════════════════════════════ */}
      <div style={{ paddingBottom: 48, paddingTop: 8 }}>
        <span style={S.tag}>What comes next</span>
        <h2 style={S.h2}>You now think in arrays, not loops.</h2>

        <p style={S.p}>
          NumPy is the foundation. Every ML operation you'll write for the rest
          of this track is either a NumPy operation, a thin wrapper around NumPy,
          or a GPU-accelerated version of a NumPy operation.
          The indexing patterns, broadcasting rules, and vectorisation habits
          from this module apply everywhere — in Pandas, in sklearn, in PyTorch.
        </p>

        <p style={S.p}>
          Module 10 moves to Pandas — the library built on top of NumPy
          that adds column names, mixed data types, and the data manipulation
          operations you need for real ML datasets: groupby, merge, pivot,
          handling missing values, and reading from CSV, SQL, and Parquet files.
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
              Next — Module 10 · Programming Ecosystem
            </div>
            <div style={{
              fontSize: 15, fontWeight: 700, color: 'var(--text)',
              fontFamily: 'var(--font-display)', letterSpacing: '-0.3px',
            }}>
              Pandas DataFrames
            </div>
            <p style={{ ...S.ps, marginBottom: 0, marginTop: 4 }}>
              Load, clean, transform and explore real datasets.
              GroupBy, merge, missing values, and the operations
              every ML project starts with.
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
          'NumPy arrays store elements of one type in contiguous memory with no Python object overhead. Operations run in optimised C using SIMD instructions — typically 100–10,000× faster than Python loops over the same data.',
          'dtype determines element type and memory usage. float64 (default) uses 8 bytes. float32 uses 4 bytes and is GPU-preferred. Always check dtypes when unexpected results or memory errors occur.',
          'Indexing: X[i] for rows, X[:, j] for columns, X[i, j] for elements, X[start:stop:step] for slices. Boolean indexing (X[mask]) and fancy indexing (X[[0,5,99]]) select non-contiguous subsets.',
          'axis=0 means "collapse rows" (operate down columns, result has one value per column). axis=1 means "collapse columns" (result has one value per row). Getting this backwards is the most common aggregation mistake.',
          'Broadcasting rule: align shapes from the right. Dimensions are compatible if equal or one is 1 (gets stretched). Use keepdims=True and reshape(-1, 1) to control broadcasting direction explicitly.',
          'Slices return views (shared memory with original). Boolean and fancy indexing return copies. Modifying a view modifies the original. Always call .copy() before modifying a subset you intend to keep separate.',
          'The vectorisation rule: if you are writing a for loop over array elements, stop and find the NumPy operation that does the same thing. np.where, broadcasting, boolean indexing, and axis aggregation handle 99% of cases.',
        ]}
      />
    </LearnLayout>
  )
}