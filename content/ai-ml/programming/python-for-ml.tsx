import type { Metadata } from 'next'
import { LearnLayout } from '@/components/content/LearnLayout'
import { Callout } from '@/components/content/Callout'
import { KeyTakeaways } from '@/components/content/KeyTakeaways'
import MLPageHeader from '@/components/content/MLPageHeader'

export const metadata: Metadata = {
  title: 'Python for Machine Learning — Chaduvuko',
  description:
    'Not Python 101. Python the way ML engineers actually write it — vectorised, readable, and production-ready. List comprehensions, OOP, decorators, generators, error handling, and the sklearn interface.',
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

export default function PythonForMLPage() {
  return (
    <LearnLayout
      title="Python for Machine Learning"
      description="Not Python 101. Python the way ML engineers actually write it — vectorised, readable, and production-ready from day one."
      section="Programming Ecosystem"
      readTime="55–70 min"
      updatedAt="March 2026"
    >
      <MLPageHeader section='programming' topic='python-for-ml' />

      {/* ══ SECTION 1 — HOOK ═══════════════════════════════════════════════════ */}
      <div style={S.sec}>
        <span style={S.tag}>What this module actually teaches</span>
        <h2 style={S.h2}>
          Python for ML is not the same as Python for web development.
        </h2>

        <p style={S.p}>
          You might already know Python. You know how to write a for loop,
          define a function, use a dictionary. That's enough to follow tutorials.
          But when you join a data team and open a real ML codebase, you'll see
          things that look nothing like the tutorials: list comprehensions
          chained three levels deep, classes with{' '}
          <span style={S.code as React.CSSProperties}>__call__</span> and{' '}
          <span style={S.code as React.CSSProperties}>__repr__</span>, generator
          functions yielding batches, decorators wrapping training loops,
          context managers handling GPU memory, type hints on every function signature.
        </p>

        <p style={S.p}>
          This module bridges that gap. Every pattern here was pulled from
          real production ML codebases — sklearn, PyTorch, HuggingFace Transformers,
          and actual data team repositories. If you know basic Python already,
          skim the early sections and slow down at generators, OOP for ML,
          and the sklearn interface. If you're new to Python, read everything.
        </p>

        <HBox color="#888888">
          <p style={{ ...S.p, marginBottom: 8 }}>
            <span style={{ color: 'var(--text)', fontWeight: 700 }}>
              What this module covers:
            </span>
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 6 }}>
            {[
              'Data types and control flow — the ML-relevant subset',
              'Functions: defaults, *args, **kwargs, closures',
              'List, dict, and set comprehensions',
              'Object-oriented programming for ML',
              'Generators and iterators for data loading',
              'Decorators — timing, logging, caching',
              'Error handling in ML pipelines',
              'Type hints and docstrings in production code',
              'File I/O — CSV, JSON, Pickle, HDF5',
              'The sklearn fit/predict/transform interface',
              'Virtual environments and dependency management',
              'Profiling and debugging slow ML code',
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
          The most important shift in mindset for ML Python is this:
          stop thinking in loops, start thinking in operations on whole arrays.
          A for loop over 1 million rows takes seconds. The equivalent NumPy
          operation takes milliseconds. This module builds the habits that
          make the difference.
        </Callout>
      </div>

      <Div />

      {/* ══ SECTION 2 — DATA TYPES ═════════════════════════════════════════════ */}
      <div style={S.sec}>
        <span style={S.tag}>The fundamentals</span>
        <h2 style={S.h2}>Data types and control flow — the ML-relevant subset</h2>

        <p style={S.p}>
          Python has many data types. ML uses five of them constantly:
          integers, floats, strings, lists, and dictionaries.
          Booleans are a subtype of integers — True is 1, False is 0,
          which means you can do arithmetic on boolean masks.
          Understanding this makes NumPy indexing intuitive.
        </p>

        <CodeBlock code={`# ── The five data types you use every day in ML ─────────────────────

# 1. int — sample counts, indices, class labels, random seeds
n_samples   = 10_000       # underscore = visual separator (Python 3.6+)
class_label = 1
seed        = 42

# 2. float — weights, losses, learning rates, probabilities
weight      = 0.0031416
loss        = 2.304_718     # same underscore trick works for floats
lr          = 1e-3          # scientific notation: 0.001

# 3. str — feature names, file paths, model names, column names
feature     = 'distance_km'
model_path  = '/models/swiggy_v2.pkl'

# 4. list — sequences of anything, batch of samples, feature lists
features    = ['distance_km', 'traffic_score', 'prep_time', 'time_of_day']
losses      = [2.3, 1.9, 1.4, 1.1, 0.9, 0.7]   # loss per epoch

# 5. dict — config, hyperparameters, metrics, named results
hyperparams = {
    'learning_rate': 0.001,
    'batch_size':    32,
    'n_epochs':      100,
    'hidden_size':   64,
}
metrics = {'mae': 3.2, 'rmse': 4.1, 'r2': 0.78}

# ── Boolean indexing — booleans ARE integers in Python ───────────────
is_fraud = [False, True, False, False, True]
n_fraud  = sum(is_fraud)     # True=1, False=0 → sum works!
print(f"Fraudulent: {n_fraud} / {len(is_fraud)}")  # 2 / 5

# Fraud rate as a percentage
fraud_rate = sum(is_fraud) / len(is_fraud) * 100
print(f"Fraud rate: {fraud_rate:.1f}%")   # 40.0%

# ── None — the absence of a value ────────────────────────────────────
best_model = None   # not trained yet
if best_model is None:
    print("Model not trained — call .fit() first")
# Always use "is None" not "== None"
# "== None" can trigger __eq__ which behaves unexpectedly with NumPy arrays`} />

        <h3 style={S.h3}>Control flow — what ML code actually looks like</h3>

        <CodeBlock code={`# ── if/elif/else — model selection and validation ────────────────────
def pick_model(n_samples: int, n_features: int) -> str:
    """Rule of thumb for algorithm selection by dataset size."""
    if n_samples < 1_000:
        return 'logistic_regression'     # small data: simple model
    elif n_samples < 100_000:
        if n_features > 100:
            return 'lightgbm'            # high-dim medium data
        return 'random_forest'
    else:
        return 'xgboost'                 # large data: ensemble

print(pick_model(500, 10))       # logistic_regression
print(pick_model(50_000, 200))   # lightgbm
print(pick_model(1_000_000, 15)) # xgboost

# ── for loops — when you actually need them ───────────────────────────
# Training loop (iterate over epochs — loop is unavoidable here)
n_epochs = 5
for epoch in range(1, n_epochs + 1):
    # ... training code here ...
    loss = 10.0 / epoch   # simulated decreasing loss
    if epoch % 2 == 0:
        print(f"Epoch {epoch:2d}: loss = {loss:.4f}")

# enumerate — gives you index AND value
feature_names = ['distance', 'traffic', 'prep_time', 'time_of_day']
for i, name in enumerate(feature_names):
    print(f"  Feature {i}: {name}")

# zip — iterate two lists in parallel
importances = [0.52, 0.28, 0.13, 0.07]
for name, importance in zip(feature_names, importances):
    bar = '█' * int(importance * 30)
    print(f"  {name:<15}: {bar} {importance:.2f}")

# ── while — training until convergence ───────────────────────────────
loss = 10.0
step = 0
patience = 0
best_loss = float('inf')

while loss > 0.1 and step < 1000:
    loss *= 0.85   # simulated convergence
    step += 1
    if loss < best_loss:
        best_loss = loss
        patience = 0
    else:
        patience += 1
    if patience >= 5:
        print(f"Early stopping at step {step}")
        break

print(f"Final loss: {loss:.6f} after {step} steps")`} />
      </div>

      <Div />

      {/* ══ SECTION 3 — FUNCTIONS ══════════════════════════════════════════════ */}
      <div style={S.sec}>
        <span style={S.tag}>Functions</span>
        <h2 style={S.h2}>Functions — every pattern ML code actually uses</h2>

        <p style={S.p}>
          ML code uses functions heavily — not just simple ones, but functions
          with default arguments, keyword arguments, variable-length arguments,
          and closures. Knowing these patterns is the difference between
          reading a HuggingFace model config and being confused by one.
        </p>

        <h3 style={S.h3}>Default arguments and keyword arguments</h3>

        <CodeBlock code={`# ── Default arguments — the ML convention ────────────────────────────
def train_model(
    X,                          # required — no default
    y,                          # required
    learning_rate: float = 0.01,  # optional with default
    n_epochs: int = 100,
    batch_size: int = 32,
    random_state: int = 42,     # always provide a seed default!
    verbose: bool = True,
) -> dict:
    """
    Train a model on X, y.

    Args:
        X: Feature matrix of shape (n_samples, n_features)
        y: Target vector of shape (n_samples,)
        learning_rate: Step size for gradient descent
        n_epochs: Number of full passes through the data
        batch_size: Examples per gradient update
        random_state: Seed for reproducibility
        verbose: Print training progress

    Returns:
        Dictionary with 'loss_history' and 'best_loss'
    """
    import numpy as np
    np.random.seed(random_state)
    loss_history = []
    loss = 10.0

    for epoch in range(n_epochs):
        loss = loss * 0.95 + np.random.randn() * 0.05
        loss_history.append(max(loss, 0.1))
        if verbose and epoch % 20 == 0:
            print(f"Epoch {epoch:3d}: loss = {loss_history[-1]:.4f}")

    return {'loss_history': loss_history, 'best_loss': min(loss_history)}

import numpy as np
X = np.random.randn(100, 4)
y = np.random.randn(100)

# Call with defaults
result = train_model(X, y, verbose=False)
print(f"Best loss: {result['best_loss']:.4f}")

# Override specific defaults — keyword syntax is clearer than positional
result2 = train_model(X, y, learning_rate=0.001, n_epochs=50, verbose=False)

# IMPORTANT: never use mutable defaults (lists, dicts) — Python trap!
# WRONG:
def bad_function(history=[]):    # same list object reused across calls!
    history.append(1)
    return history

print(bad_function())   # [1]
print(bad_function())   # [1, 1]  ← BUG! persists across calls

# CORRECT:
def good_function(history=None):
    if history is None:
        history = []
    history.append(1)
    return history`} />

        <h3 style={S.h3}>*args and **kwargs — flexible interfaces</h3>

        <CodeBlock code={`# *args: accept any number of positional arguments
def mean_of_metrics(*values: float) -> float:
    """Average any number of metric values."""
    return sum(values) / len(values)

print(mean_of_metrics(0.85, 0.78, 0.91))           # 0.847
print(mean_of_metrics(0.85, 0.78, 0.91, 0.88, 0.94))  # 0.872

# **kwargs: accept any number of keyword arguments
def log_metrics(**metrics: float) -> None:
    """Log any set of named metrics."""
    for name, value in metrics.items():
        print(f"  {name:<20}: {value:.4f}")

log_metrics(accuracy=0.94, precision=0.87, recall=0.91, f1=0.89)
# accuracy             : 0.9400
# precision            : 0.8700
# ...

# Real use: passing config to a model without knowing all params upfront
def create_model(model_type: str, **model_params):
    """Factory function — passes unknown params to model constructor."""
    if model_type == 'xgboost':
        from sklearn.ensemble import GradientBoostingClassifier
        return GradientBoostingClassifier(**model_params)
    elif model_type == 'rf':
        from sklearn.ensemble import RandomForestClassifier
        return RandomForestClassifier(**model_params)
    else:
        raise ValueError(f"Unknown model type: {model_type}")

# Caller decides the params — factory doesn't need to know them
rf  = create_model('rf', n_estimators=200, max_depth=8, random_state=42)
gb  = create_model('xgboost', n_estimators=100, learning_rate=0.05)

# ── Unpacking with * and ** ───────────────────────────────────────────
# Pass a list as positional args
metrics_list = [0.85, 0.78, 0.91]
avg = mean_of_metrics(*metrics_list)   # unpacks list → positional args

# Pass a dict as keyword args
config = {'n_estimators': 100, 'max_depth': 6, 'random_state': 42}
from sklearn.ensemble import RandomForestClassifier
model = RandomForestClassifier(**config)   # unpacks dict → keyword args`} />

        <h3 style={S.h3}>Lambda functions and closures — functional patterns</h3>

        <CodeBlock code={`# ── Lambda — short anonymous functions ───────────────────────────────
# Sorting features by importance
feature_importances = {
    'distance':   0.52,
    'traffic':    0.28,
    'prep_time':  0.13,
    'time_of_day': 0.07,
}

# Sort dict by value (importance)
sorted_features = sorted(
    feature_importances.items(),
    key=lambda item: item[1],
    reverse=True
)
for name, imp in sorted_features:
    print(f"  {name:<15}: {imp:.2f}")

# ── Closures — functions that remember state ──────────────────────────
def make_scaler(mean: float, std: float):
    """Returns a function that standardises values using captured mean/std."""
    # mean and std are "closed over" — captured from the outer scope
    def scale(x):
        return (x - mean) / std
    return scale   # return the inner function, not the result

# Fit the scaler on training data
import numpy as np
train_times = np.array([28., 32., 35., 41., 38., 29., 45., 33.])
mu, sigma = train_times.mean(), train_times.std()

# Create a scaler function that remembers the training stats
scaler = make_scaler(mu, sigma)

# Apply to any new value — it "remembers" mu and sigma
print(scaler(35.0))    # ≈ 0.0  (near the mean)
print(scaler(50.0))    # high positive (far above mean)

# This is essentially what sklearn's StandardScaler.transform() does —
# it stores mean_ and scale_ during fit(), then applies them in transform()
from sklearn.preprocessing import StandardScaler
sk_scaler = StandardScaler()
sk_scaler.fit(train_times.reshape(-1, 1))
print(sk_scaler.transform([[35.0]]))   # same result as our closure ✓`} />
      </div>

      <Div />

      {/* ══ SECTION 4 — COMPREHENSIONS ═════════════════════════════════════════ */}
      <div style={S.sec}>
        <span style={S.tag}>Comprehensions</span>
        <h2 style={S.h2}>List, dict and set comprehensions — write less, do more</h2>

        <p style={S.p}>
          Comprehensions are one of Python's most powerful features and one
          of the things that makes ML code look dense to beginners.
          Once you internalise them, you'll never go back to multi-line loops.
          They're faster than explicit loops and far more readable once you
          know the pattern.
        </p>

        <VisualBox label="Comprehension anatomy">
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: 13, lineHeight: 2.2, color: 'var(--text)' }}>
            <div>
              [<span style={{ color: '#00e676' }}>expression</span>{'  '}
              <span style={{ color: '#378ADD' }}>for item in iterable</span>{'  '}
              <span style={{ color: '#BA7517' }}>if condition</span>]
            </div>
            <div style={{ fontSize: 11, display: 'flex', gap: 32, marginTop: 4 }}>
              <span style={{ color: '#00e676' }}>↑ what to produce</span>
              <span style={{ color: '#378ADD' }}>↑ where to get items</span>
              <span style={{ color: '#BA7517' }}>↑ optional filter</span>
            </div>
          </div>
        </VisualBox>

        <CodeBlock code={`import numpy as np

# ── List comprehensions ───────────────────────────────────────────────

# Without comprehension
squared_losses = []
for loss in [2.3, 1.9, 1.4, 1.1, 0.9]:
    squared_losses.append(loss ** 2)

# With comprehension — same result, one line
squared_losses = [loss ** 2 for loss in [2.3, 1.9, 1.4, 1.1, 0.9]]

# With filter — only keep epochs where loss improved significantly
losses    = [2.3, 1.9, 2.1, 1.4, 1.1, 1.2, 0.9, 0.7]
improving = [l for l in losses if l < 1.5]   # only losses below 1.5
print(improving)   # [1.4, 1.1, 0.9, 0.7]

# With transformation and filter
feature_names = ['distance_km', '_internal_id', 'traffic', '_debug_flag', 'prep_time']
public_features = [f for f in feature_names if not f.startswith('_')]
print(public_features)   # ['distance_km', 'traffic', 'prep_time']

# Nested comprehension — flatten a list of batches
batches = [[1, 2, 3], [4, 5, 6], [7, 8, 9]]
flat    = [item for batch in batches for item in batch]
print(flat)   # [1, 2, 3, 4, 5, 6, 7, 8, 9]

# ── Dict comprehensions ───────────────────────────────────────────────

# Feature importance dict from two lists
names  = ['distance', 'traffic', 'prep_time', 'time_of_day']
scores = [0.52, 0.28, 0.13, 0.07]
importance_dict = {name: score for name, score in zip(names, scores)}
print(importance_dict)

# Filter to keep only important features (importance > 0.10)
important = {name: score for name, score in importance_dict.items() if score > 0.10}
print(important)   # {'distance': 0.52, 'traffic': 0.28, 'prep_time': 0.13}

# Invert a dict: feature_name → index becomes index → feature_name
idx_to_name = {v: k for k, v in {'distance':0, 'traffic':1}.items()}
print(idx_to_name)   # {0: 'distance', 1: 'traffic'}

# ── Set comprehensions — get unique values fast ───────────────────────
labels = [0, 1, 2, 1, 0, 2, 2, 1, 3]
unique_classes = {label for label in labels}
print(unique_classes)   # {0, 1, 2, 3}

# Better: use set() directly for simple cases
unique_classes = set(labels)   # same result, cleaner

# ── Generator expressions — lazy, memory-efficient ────────────────────
# List comprehension: builds entire list in memory immediately
all_losses_list = [x**2 for x in range(1_000_000)]   # 8 MB in memory

# Generator expression: computes one value at a time — no memory spike
all_losses_gen  = (x**2 for x in range(1_000_000))   # barely any memory

# Sum without building the list
total = sum(x**2 for x in range(1_000_000))   # fast, memory efficient
print(f"Sum of squares: {total:,}")`} />
      </div>

      <Div />

      {/* ══ SECTION 5 — OOP FOR ML ═════════════════════════════════════════════ */}
      <div style={S.sec}>
        <span style={S.tag}>Object-oriented programming</span>
        <h2 style={S.h2}>OOP for ML — classes you will write and classes you will use</h2>

        <p style={S.p}>
          Every sklearn estimator, every PyTorch module, every HuggingFace
          model is a class. Understanding OOP is not optional for serious ML work.
          You need to know how to use existing classes (instantiate, call methods,
          access attributes) and how to write your own custom transformers
          and datasets. This section covers both.
        </p>

        <h3 style={S.h3}>Class basics — the sklearn estimator as the template</h3>

        <CodeBlock code={`# The sklearn estimator pattern is the standard interface for all ML classes.
# Every algorithm follows: __init__ → fit → predict/transform
# Learning it once means you understand every sklearn algorithm automatically.

class DoorDashDeliveryPredictor:
    """
    Predicts DoorDash delivery time from order features.
    Follows the sklearn estimator interface.
    """

    def __init__(
        self,
        learning_rate: float = 0.01,
        n_epochs: int = 100,
        random_state: int = 42,
    ):
        # __init__ stores ONLY hyperparameters — no data, no learned params
        self.learning_rate = learning_rate
        self.n_epochs      = n_epochs
        self.random_state  = random_state
        # Learned params use trailing underscore by convention
        # They are set in fit(), not here
        self.weights_   = None
        self.bias_      = None
        self.is_fitted_ = False

    def fit(self, X, y):
        """Learn weights from training data. Returns self for chaining."""
        import numpy as np
        np.random.seed(self.random_state)
        n_features = X.shape[1]
        # Initialise weights randomly
        self.weights_ = np.random.randn(n_features) * 0.01
        self.bias_    = 0.0
        # Gradient descent
        for _ in range(self.n_epochs):
            y_pred = X @ self.weights_ + self.bias_
            error  = y_pred - y
            dw = (2 / len(y)) * X.T @ error
            db = (2 / len(y)) * error.sum()
            self.weights_ -= self.learning_rate * dw
            self.bias_    -= self.learning_rate * db
        self.is_fitted_ = True
        return self   # returning self allows chaining: model.fit(X,y).predict(X_test)

    def predict(self, X):
        """Make predictions on new data."""
        if not self.is_fitted_:
            raise RuntimeError("Call fit() before predict()")
        return X @ self.weights_ + self.bias_

    def score(self, X, y):
        """R² score — higher is better."""
        import numpy as np
        y_pred = self.predict(X)
        ss_res = np.sum((y - y_pred) ** 2)
        ss_tot = np.sum((y - y.mean()) ** 2)
        return 1 - ss_res / ss_tot

    def __repr__(self):
        """String representation — shown in notebooks and debuggers."""
        return (
            f"DoorDashDeliveryPredictor("
            f"lr={self.learning_rate}, epochs={self.n_epochs})"
        )

# Usage — identical pattern to sklearn
import numpy as np
np.random.seed(42)
X_train = np.random.randn(800, 4)
y_train = 35 + X_train @ np.array([7.3, 1.5, 0.9, 2.1]) + np.random.randn(800)*3

model = DoorDashDeliveryPredictor(learning_rate=0.01, n_epochs=200)
print(model)        # DoorDashDeliveryPredictor(lr=0.01, epochs=200)

model.fit(X_train, y_train)   # trains in-place, returns self
print(f"Weights: {model.weights_.round(2)}")   # learned: ~[7.3, 1.5, 0.9, 2.1]
print(f"Bias:    {model.bias_:.2f}")           # learned: ~35

X_test = np.random.randn(200, 4)
y_test = 35 + X_test @ np.array([7.3, 1.5, 0.9, 2.1]) + np.random.randn(200)*3
print(f"R² score: {model.score(X_test, y_test):.4f}")`} />

        <h3 style={S.h3}>Custom sklearn transformers — fit into any pipeline</h3>

        <CodeBlock code={`from sklearn.base import BaseEstimator, TransformerMixin
import numpy as np

class OutlierClipper(BaseEstimator, TransformerMixin):
    """
    Clips feature values to [mean - n_std * std, mean + n_std * std].
    Inheriting BaseEstimator gives get_params() and set_params() for free.
    Inheriting TransformerMixin gives fit_transform() for free.
    """

    def __init__(self, n_std: float = 3.0):
        self.n_std = n_std   # hyperparameter

    def fit(self, X, y=None):
        """Compute per-feature mean and std from training data."""
        self.mean_  = X.mean(axis=0)
        self.std_   = X.std(axis=0)
        self.lower_ = self.mean_ - self.n_std * self.std_
        self.upper_ = self.mean_ + self.n_std * self.std_
        return self

    def transform(self, X, y=None):
        """Clip values to learned bounds."""
        return np.clip(X, self.lower_, self.upper_)

    def fit_transform(self, X, y=None):
        return self.fit(X).transform(X)   # TransformerMixin provides this anyway

# Works seamlessly in sklearn pipelines
from sklearn.pipeline import Pipeline
from sklearn.preprocessing import StandardScaler
from sklearn.linear_model import LinearRegression

pipe = Pipeline([
    ('clip',   OutlierClipper(n_std=3.0)),
    ('scale',  StandardScaler()),
    ('model',  LinearRegression()),
])

pipe.fit(X_train, y_train)
predictions = pipe.predict(X_test)
print(f"Pipeline R²: {pipe.score(X_test, y_test):.4f}")

# Inspect any step
print(pipe['clip'].lower_)   # learned clip bounds
print(pipe['scale'].mean_)   # learned StandardScaler means`} />

        <h3 style={S.h3}>Inheritance and special methods</h3>

        <CodeBlock code={`# Special (dunder) methods that ML code uses constantly

class MetricTracker:
    """Tracks training metrics with history, averaging, and comparison."""

    def __init__(self, name: str):
        self.name    = name
        self.history = []    # list of (step, value) pairs

    def update(self, value: float, step: int = None):
        step = step if step is not None else len(self.history)
        self.history.append((step, value))

    def __len__(self):
        """len(tracker) → number of recorded values"""
        return len(self.history)

    def __getitem__(self, idx):
        """tracker[i] → value at step i"""
        return self.history[idx][1]

    def __repr__(self):
        if not self.history:
            return f"MetricTracker('{self.name}', empty)"
        latest = self.history[-1][1]
        best   = min(v for _, v in self.history)
        return f"MetricTracker('{self.name}', latest={latest:.4f}, best={best:.4f})"

    def __lt__(self, other):
        """tracker1 < tracker2 → True if tracker1 has lower latest value"""
        return self.history[-1][1] < other.history[-1][1]

    @property
    def best(self) -> float:
        """Best (lowest) value recorded."""
        return min(v for _, v in self.history)

    @property
    def latest(self) -> float:
        """Most recently recorded value."""
        return self.history[-1][1]

    def improved(self) -> bool:
        """Returns True if latest value is better than previous."""
        if len(self.history) < 2:
            return True
        return self.history[-1][1] < self.history[-2][1]

# Usage
train_loss = MetricTracker('train_loss')
val_loss   = MetricTracker('val_loss')

for epoch in range(10):
    t = 5.0 * 0.8**epoch + np.random.randn() * 0.1
    v = 5.5 * 0.8**epoch + np.random.randn() * 0.2
    train_loss.update(t, epoch)
    val_loss.update(v, epoch)

print(train_loss)             # MetricTracker('train_loss', ...)
print(f"Length: {len(train_loss)}")
print(f"Best:   {train_loss.best:.4f}")
print(f"Latest: {train_loss.latest:.4f}")
print(f"Train < Val: {train_loss < val_loss}")`} />
      </div>

      <Div />

      {/* ══ SECTION 6 — GENERATORS ═════════════════════════════════════════════ */}
      <div style={S.sec}>
        <span style={S.tag}>Generators and iterators</span>
        <h2 style={S.h2}>Generators — how ML data loading actually works</h2>

        <p style={S.p}>
          A generator is a function that yields values one at a time
          instead of returning them all at once. This is how every
          production ML data loader works — loading one batch at a time
          instead of the entire dataset into memory.
          A 100GB image dataset doesn't fit in RAM. Batched generators do.
        </p>

        <p style={S.p}>
          PyTorch's <span style={S.code as React.CSSProperties}>DataLoader</span>,
          TensorFlow's <span style={S.code as React.CSSProperties}>tf.data.Dataset</span>,
          and HuggingFace's dataset iterators are all generators under the hood.
          Understanding generators makes all of these click immediately.
        </p>

        <CodeBlock code={`import numpy as np

# ── Basic generator — yield instead of return ─────────────────────────

def count_up(n: int):
    """Regular function: returns all at once."""
    return list(range(n))   # builds the full list

def count_up_lazy(n: int):
    """Generator: yields one at a time."""
    for i in range(n):
        yield i   # pause here, give caller the value, resume next call

# Both produce the same values — very different memory usage
for val in count_up_lazy(5):
    print(val, end=' ')   # 0 1 2 3 4
print()

# ── Batch generator — the core of ML data loading ─────────────────────

def batch_generator(X, y, batch_size: int = 32, shuffle: bool = True):
    """
    Yields (X_batch, y_batch) tuples indefinitely.
    This is the conceptual core of PyTorch DataLoader.
    """
    n = len(X)
    while True:   # infinite loop — caller decides when to stop
        indices = np.random.permutation(n) if shuffle else np.arange(n)
        for start in range(0, n, batch_size):
            batch_idx = indices[start : start + batch_size]
            yield X[batch_idx], y[batch_idx]

# Training loop using the generator
X = np.random.randn(1000, 4)
y = np.random.randn(1000)

gen = batch_generator(X, y, batch_size=32)

n_steps = 20
for step in range(n_steps):
    X_batch, y_batch = next(gen)   # get next batch
    # ... gradient update here ...
    if step % 5 == 0:
        print(f"Step {step:2d}: batch shape {X_batch.shape}")

# ── Finite generator — iterate through dataset exactly once ──────────

def epoch_generator(X, y, batch_size: int = 32, shuffle: bool = True):
    """Yields all batches for one epoch, then stops."""
    n = len(X)
    indices = np.random.permutation(n) if shuffle else np.arange(n)
    for start in range(0, n, batch_size):
        batch_idx = indices[start : start + batch_size]
        yield X[batch_idx], y[batch_idx]

# Count batches in one epoch
n_batches = sum(1 for _ in epoch_generator(X, y, batch_size=32))
print(f"Batches per epoch: {n_batches}")   # ceil(1000/32) = 32

# ── Generator with preprocessing ──────────────────────────────────────

def augmented_batch_generator(X, y, batch_size=32, noise_std=0.01):
    """
    Data augmentation inline — add small noise to each batch.
    The augmentation happens lazily, only when the batch is requested.
    """
    n = len(X)
    while True:
        indices = np.random.permutation(n)
        for start in range(0, n, batch_size):
            X_batch = X[indices[start:start+batch_size]].copy()
            y_batch = y[indices[start:start+batch_size]].copy()
            # Add small Gaussian noise to features
            X_batch += np.random.randn(*X_batch.shape) * noise_std
            yield X_batch, y_batch`} />

        <h3 style={S.h3}>The iterator protocol — how Python's for loop works</h3>

        <CodeBlock code={`# Understanding the iterator protocol explains all "iterable" objects in Python

class OrderDataset:
    """
    A custom dataset class that works with Python's for loop.
    Mirrors the structure of PyTorch's torch.utils.data.Dataset.
    """

    def __init__(self, X, y):
        self.X = X
        self.y = y

    def __len__(self):
        """len(dataset) → number of samples"""
        return len(self.X)

    def __getitem__(self, idx):
        """dataset[i] → (features, label) for sample i"""
        return self.X[idx], self.y[idx]

    def __iter__(self):
        """Makes the dataset iterable with for loops."""
        for i in range(len(self)):
            yield self[i]

X = np.random.randn(100, 4)
y = np.random.randn(100)
dataset = OrderDataset(X, y)

print(f"Dataset size: {len(dataset)}")          # 100
features, label = dataset[0]                     # single sample
print(f"Sample features shape: {features.shape}")  # (4,)

# Iterate directly — __iter__ makes this work
for i, (features, label) in enumerate(dataset):
    if i >= 3: break
    print(f"  Sample {i}: features={features[:2].round(2)}, label={label:.2f}")

# In PyTorch you would subclass torch.utils.data.Dataset:
# class DoorDashDataset(torch.utils.data.Dataset):
#     def __init__(self, X, y): self.X, self.y = X, y
#     def __len__(self): return len(self.X)
#     def __getitem__(self, idx): return self.X[idx], self.y[idx]
#
# Then DataLoader handles batching, shuffling, multi-process loading:
# loader = DataLoader(DoorDashDataset(X_train, y_train), batch_size=32, shuffle=True)
# for X_batch, y_batch in loader: ...`} />
      </div>

      <Div />

      {/* ══ SECTION 7 — DECORATORS ═════════════════════════════════════════════ */}
      <div style={S.sec}>
        <span style={S.tag}>Decorators</span>
        <h2 style={S.h2}>Decorators — wrapping functions with logging, timing and caching</h2>

        <p style={S.p}>
          A decorator is a function that takes a function and returns a modified
          version of it. They appear everywhere in ML code:
          <span style={S.code as React.CSSProperties}> @torch.no_grad()</span> on evaluation loops,
          <span style={S.code as React.CSSProperties}> @staticmethod</span> on utility methods,
          <span style={S.code as React.CSSProperties}> @property</span> on computed attributes,
          <span style={S.code as React.CSSProperties}> @lru_cache</span> on expensive computations.
          Understanding them makes these usages obvious instead of magical.
        </p>

        <CodeBlock code={`import time
import functools
from typing import Callable

# ── Building a decorator from scratch ─────────────────────────────────

def timer(func: Callable) -> Callable:
    """Decorator: prints how long a function took."""
    @functools.wraps(func)   # preserves func.__name__ and __doc__
    def wrapper(*args, **kwargs):
        start  = time.perf_counter()
        result = func(*args, **kwargs)
        elapsed = time.perf_counter() - start
        print(f"  {func.__name__} took {elapsed*1000:.2f}ms")
        return result
    return wrapper

@timer
def train_epoch(X, y, weights, lr=0.01):
    """One pass through the training data."""
    import numpy as np
    y_pred = X @ weights
    error  = y_pred - y
    grad   = (2 / len(y)) * X.T @ error
    return weights - lr * grad

import numpy as np
X = np.random.randn(10_000, 64)
y = np.random.randn(10_000)
w = np.random.randn(64)

new_w = train_epoch(X, y, w)   # → "train_epoch took 2.34ms"

# ── Decorator with arguments ───────────────────────────────────────────

def retry(max_attempts: int = 3, delay: float = 1.0):
    """Decorator factory: retry a function on failure."""
    def decorator(func):
        @functools.wraps(func)
        def wrapper(*args, **kwargs):
            for attempt in range(1, max_attempts + 1):
                try:
                    return func(*args, **kwargs)
                except Exception as e:
                    if attempt == max_attempts:
                        raise
                    print(f"  Attempt {attempt} failed: {e}. Retrying...")
                    time.sleep(delay)
        return wrapper
    return decorator

@retry(max_attempts=3, delay=0.1)
def fetch_training_data(url: str) -> dict:
    """Fetch data from an API with automatic retry on failure."""
    import random
    if random.random() < 0.5:   # simulate 50% failure rate
        raise ConnectionError(f"Failed to connect to {url}")
    return {"status": "ok", "n_samples": 10_000}

# ── Caching — avoid recomputing expensive operations ──────────────────

from functools import lru_cache

@lru_cache(maxsize=128)
def compute_feature_stats(dataset_hash: int, feature_idx: int) -> tuple:
    """
    Expensive computation cached by inputs.
    lru_cache requires hashable arguments (no arrays — use hash instead).
    """
    # Simulate expensive computation
    import time
    time.sleep(0.001)
    return (0.0, 1.0)   # (mean, std) — placeholder

# First call: computes (slow)
result1 = compute_feature_stats(hash("dataset_v1"), 0)
# Second call: returns cached result (instant)
result2 = compute_feature_stats(hash("dataset_v1"), 0)
print(f"Cache info: {compute_feature_stats.cache_info()}")
# CacheInfo(hits=1, misses=1, maxsize=128, currsize=1)

# ── @property — computed attributes ───────────────────────────────────

class ModelEvaluator:
    def __init__(self, y_true, y_pred):
        self._y_true = y_true
        self._y_pred = y_pred

    @property
    def mae(self) -> float:
        return float(np.abs(self._y_true - self._y_pred).mean())

    @property
    def rmse(self) -> float:
        return float(np.sqrt(((self._y_true - self._y_pred)**2).mean()))

    @property
    def r2(self) -> float:
        ss_res = ((self._y_true - self._y_pred)**2).sum()
        ss_tot = ((self._y_true - self._y_true.mean())**2).sum()
        return float(1 - ss_res / ss_tot)

y_true = np.random.randn(100) * 10 + 35
y_pred = y_true + np.random.randn(100) * 3
ev = ModelEvaluator(y_true, y_pred)
print(f"MAE={ev.mae:.2f}  RMSE={ev.rmse:.2f}  R²={ev.r2:.4f}")`} />
      </div>

      <Div />

      {/* ══ SECTION 8 — ERROR HANDLING ═════════════════════════════════════════ */}
      <div style={S.sec}>
        <span style={S.tag}>Error handling</span>
        <h2 style={S.h2}>Error handling in ML pipelines — failures happen, handle them gracefully</h2>

        <p style={S.p}>
          Production ML pipelines fail. An API returns a 503. A CSV file has
          unexpected nulls. A batch contains all the same class.
          A GPU runs out of memory mid-epoch. Code that doesn't handle failures
          fails silently or crashes with an unhelpful message.
          Code that handles them correctly logs the error, saves state, and
          either recovers or fails loudly with a useful message.
        </p>

        <CodeBlock code={`import logging
import numpy as np

# ── Set up logging — better than print for production ─────────────────
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s  %(levelname)s  %(message)s',
    datefmt='%H:%M:%S',
)
logger = logging.getLogger(__name__)

# ── try/except/finally — the basic pattern ────────────────────────────

def load_dataset(filepath: str) -> np.ndarray:
    """Load a CSV file safely."""
    try:
        import pandas as pd
        df = pd.read_csv(filepath)
        logger.info(f"Loaded {len(df)} rows from {filepath}")
        return df.values
    except FileNotFoundError:
        logger.error(f"File not found: {filepath}")
        raise   # re-raise — caller decides what to do
    except pd.errors.EmptyDataError:
        logger.warning(f"File is empty: {filepath}")
        return np.empty((0, 0))
    except Exception as e:
        logger.error(f"Unexpected error loading {filepath}: {type(e).__name__}: {e}")
        raise

# ── Custom exceptions for ML-specific failures ────────────────────────

class NotFittedError(RuntimeError):
    """Raised when predict() is called before fit()."""
    pass

class DataValidationError(ValueError):
    """Raised when input data fails validation checks."""
    pass

def validate_features(X: np.ndarray, feature_names: list) -> None:
    """Validate feature matrix before training or inference."""
    if X.ndim != 2:
        raise DataValidationError(
            f"Expected 2D array, got shape {X.shape}. "
            f"Reshape with X.reshape(-1, {X.shape[-1]})"
        )
    if X.shape[1] != len(feature_names):
        raise DataValidationError(
            f"Expected {len(feature_names)} features, got {X.shape[1]}. "
            f"Features expected: {feature_names}"
        )
    n_nans = np.isnan(X).sum()
    if n_nans > 0:
        raise DataValidationError(
            f"Input contains {n_nans} NaN values. "
            f"Run imputation before calling this function."
        )
    logger.info(f"Validation passed: {X.shape} array, 0 NaNs")

# ── Context managers — resource cleanup guaranteed ────────────────────

import contextlib

@contextlib.contextmanager
def timer_context(name: str):
    """Context manager: time a block of code."""
    import time
    start = time.perf_counter()
    try:
        yield   # code inside "with" block runs here
    finally:
        elapsed = time.perf_counter() - start
        logger.info(f"{name}: {elapsed*1000:.1f}ms")

# Usage
X = np.random.randn(10_000, 64)
y = np.random.randn(10_000)

with timer_context("feature computation"):
    X_mean = X.mean(axis=0)
    X_std  = X.std(axis=0)
    X_norm = (X - X_mean) / X_std

# ── Handling NaN and Inf in computations ──────────────────────────────

def safe_log(x: np.ndarray, eps: float = 1e-10) -> np.ndarray:
    """Log that never produces -inf or nan."""
    return np.log(np.clip(x, eps, None))

def safe_divide(numerator: np.ndarray, denominator: np.ndarray, fill: float = 0.0) -> np.ndarray:
    """Division that fills 0/0 with a default instead of nan."""
    with np.errstate(divide='ignore', invalid='ignore'):
        result = np.where(denominator != 0, numerator / denominator, fill)
    return result

# Test
probs = np.array([0.0, 0.1, 0.5, 0.9, 1.0])
print("safe_log:", safe_log(probs).round(3))    # no -inf!

a = np.array([1.0, 0.0, 3.0])
b = np.array([2.0, 0.0, 1.0])
print("safe_divide:", safe_divide(a, b))   # [0.5, 0.0, 3.0] — 0/0 → 0.0`} />
      </div>

      <Div />

      {/* ══ SECTION 9 — FILE IO ════════════════════════════════════════════════ */}
      <div style={S.sec}>
        <span style={S.tag}>File I/O</span>
        <h2 style={S.h2}>Reading and writing ML artifacts — models, data, configs</h2>

        <p style={S.p}>
          ML projects constantly read and write files: training data, trained models,
          preprocessing stats, experiment configs, evaluation results.
          Knowing the right format for each type of artifact — and the gotchas
          of each — saves hours of debugging.
        </p>

        <CodeBlock code={`import numpy as np
import json
import pickle
import os

# ── JSON — configs and metadata ───────────────────────────────────────

config = {
    'model_type':    'random_forest',
    'n_estimators':  200,
    'max_depth':     8,
    'feature_names': ['distance_km', 'traffic', 'prep_time', 'time_of_day'],
    'trained_at':    '2026-03-24',
    'metrics':       {'mae': 3.2, 'r2': 0.78},
}

# Write
with open('/tmp/model_config.json', 'w') as f:
    json.dump(config, f, indent=2)

# Read
with open('/tmp/model_config.json', 'r') as f:
    loaded_config = json.load(f)

print(f"Loaded config: {loaded_config['model_type']}")

# ── Pickle — Python objects (models, transformers) ─────────────────────
# WARNING: pickle files are not safe to load from untrusted sources

from sklearn.ensemble import RandomForestClassifier
from sklearn.preprocessing import StandardScaler

scaler = StandardScaler()
X_demo = np.random.randn(100, 4)
scaler.fit(X_demo)

# Save
with open('/tmp/scaler.pkl', 'wb') as f:   # 'wb' = write binary
    pickle.dump(scaler, f)

# Load
with open('/tmp/scaler.pkl', 'rb') as f:   # 'rb' = read binary
    loaded_scaler = pickle.load(f)

print(f"Loaded scaler mean: {loaded_scaler.mean_.round(3)}")

# Better: joblib — faster for large NumPy arrays
import joblib
joblib.dump(scaler, '/tmp/scaler_joblib.pkl')
loaded = joblib.load('/tmp/scaler_joblib.pkl')

# ── NumPy binary — fast array storage ─────────────────────────────────

X = np.random.randn(10_000, 64)
y = np.random.randn(10_000)

# Save one array
np.save('/tmp/X_train.npy', X)
X_loaded = np.load('/tmp/X_train.npy')

# Save multiple arrays in one file
np.savez('/tmp/dataset.npz', X=X, y=y)
data = np.load('/tmp/dataset.npz')
print(f"Loaded: X={data['X'].shape}, y={data['y'].shape}")

# Compressed (smaller file, slower load)
np.savez_compressed('/tmp/dataset_compressed.npz', X=X, y=y)

# ── CSV — human-readable, slow for large data ──────────────────────────
import pandas as pd

df = pd.DataFrame(
    np.column_stack([X[:100, :4], y[:100]]),
    columns=['distance_km', 'traffic', 'prep_time', 'time_of_day', 'delivery_time']
)
df.to_csv('/tmp/sample_orders.csv', index=False)
df_loaded = pd.read_csv('/tmp/sample_orders.csv')
print(f"CSV loaded: {df_loaded.shape}")

# ── Path handling — use pathlib, not string concatenation ─────────────
from pathlib import Path

models_dir = Path('/tmp') / 'models'
models_dir.mkdir(parents=True, exist_ok=True)   # create if doesn't exist

model_path = models_dir / 'swiggy_rf_v2.pkl'
joblib.dump(scaler, model_path)

# Check existence before loading
if model_path.exists():
    model = joblib.load(model_path)
    print(f"Loaded from {model_path}")

# List all .pkl files in directory
pkl_files = list(models_dir.glob('*.pkl'))
print(f"Found {len(pkl_files)} model files: {[f.name for f in pkl_files]}")`} />
      </div>

      <Div />

      {/* ══ SECTION 10 — TYPE HINTS ════════════════════════════════════════════ */}
      <div style={S.sec}>
        <span style={S.tag}>Production code patterns</span>
        <h2 style={S.h2}>Type hints, docstrings and virtual environments</h2>

        <p style={S.p}>
          Type hints are not required in Python but they are expected in
          professional ML codebases. They document what a function expects,
          enable IDE autocompletion and static analysis, and catch type errors
          before runtime. HuggingFace, sklearn, and PyTorch all use type hints
          extensively. Writing them yourself is a signal that your code is
          production-ready.
        </p>

        <CodeBlock code={`from typing import Optional, Union, List, Tuple, Dict, Any
import numpy as np

# ── Type hints — basic patterns ───────────────────────────────────────

def train(
    X: np.ndarray,                    # 2D array (n_samples, n_features)
    y: np.ndarray,                    # 1D array (n_samples,)
    lr: float = 0.01,
    n_epochs: int = 100,
    validation_data: Optional[Tuple[np.ndarray, np.ndarray]] = None,
    callbacks: Optional[List[Any]] = None,
) -> Dict[str, List[float]]:
    """
    Train a model and return training history.

    Args:
        X:               Feature matrix. Shape (n_samples, n_features).
        y:               Target values. Shape (n_samples,).
        lr:              Learning rate for gradient descent.
        n_epochs:        Number of full passes through the training data.
        validation_data: Optional (X_val, y_val) tuple for validation loss.
        callbacks:       List of callback objects called after each epoch.

    Returns:
        Dictionary with keys 'train_loss' and optionally 'val_loss',
        each containing a list of one value per epoch.

    Raises:
        ValueError: If X and y have mismatched first dimensions.

    Example:
        >>> X = np.random.randn(100, 4)
        >>> y = np.random.randn(100)
        >>> history = train(X, y, lr=0.01, n_epochs=50)
        >>> print(history['train_loss'][-1])
    """
    if X.shape[0] != y.shape[0]:
        raise ValueError(
            f"X and y must have same number of samples. "
            f"Got X.shape={X.shape}, y.shape={y.shape}"
        )
    history: Dict[str, List[float]] = {'train_loss': []}
    if validation_data is not None:
        history['val_loss'] = []
    # ... training code ...
    return history

# ── Union types — function accepts multiple types ─────────────────────
def load_labels(source: Union[str, List[int], np.ndarray]) -> np.ndarray:
    """Load labels from a file path, list, or array."""
    if isinstance(source, str):
        return np.load(source)
    elif isinstance(source, list):
        return np.array(source)
    else:
        return source   # already an array`} />

        <h3 style={S.h3}>Virtual environments — reproducible ML projects</h3>

        <CodeBlock code={`# Virtual environments isolate project dependencies.
# Every ML project should have its own environment.

# ── Using venv (built-in) ─────────────────────────────────────────────
# Create environment:
#   python -m venv .venv

# Activate:
#   .venv/bin/activate        (Mac/Linux)
#   .venv\\Scripts\\activate    (Windows)

# Install packages:
#   pip install numpy pandas scikit-learn matplotlib

# Save dependencies:
#   pip freeze > requirements.txt

# Restore on another machine:
#   pip install -r requirements.txt

# ── Using conda ────────────────────────────────────────────────────────
# Create:      conda create -n swiggy-ml python=3.11
# Activate:    conda activate swiggy-ml
# Install:     conda install numpy pandas scikit-learn
# Export:      conda env export > environment.yml
# Restore:     conda env create -f environment.yml

# ── Checking your environment ─────────────────────────────────────────
import sys
import numpy
import sklearn

print(f"Python:    {sys.version.split()[0]}")
print(f"NumPy:     {numpy.__version__}")
print(f"sklearn:   {sklearn.__version__}")

# ── requirements.txt best practices ───────────────────────────────────
# Pin exact versions for reproducibility in production:
# numpy==1.26.4
# pandas==2.2.1
# scikit-learn==1.4.1
# matplotlib==3.8.3
#
# Use >= for libraries where minor updates are safe:
# jupyter>=1.0.0
# tqdm>=4.66.0`} />
      </div>

      <Div />

      {/* ══ SECTION 11 — PROFILING ═════════════════════════════════════════════ */}
      <div style={S.sec}>
        <span style={S.tag}>Performance</span>
        <h2 style={S.h2}>Profiling slow code — find the bottleneck before optimising</h2>

        <p style={S.p}>
          The first rule of optimisation: don't guess where the bottleneck is,
          measure it. Python has two simple tools for this — timeit for
          measuring small snippets, and cProfile for finding which functions
          in a full pipeline are slow. Most ML slowdowns are in one of three places:
          data loading, data preprocessing, or a Python loop that should
          be a NumPy operation.
        </p>

        <CodeBlock code={`import numpy as np
import timeit

n = 100_000
x = np.random.randn(n)

# ── timeit — compare two approaches ──────────────────────────────────

# Approach 1: Python loop
def normalise_loop(arr):
    mean = sum(arr) / len(arr)
    std  = (sum((v - mean)**2 for v in arr) / len(arr)) ** 0.5
    return [(v - mean) / std for v in arr]

# Approach 2: NumPy vectorised
def normalise_numpy(arr):
    return (arr - arr.mean()) / arr.std()

# Measure with timeit (number=5 means run 5 times and average)
loop_time  = timeit.timeit(lambda: normalise_loop(x[:1000]),  number=5)
numpy_time = timeit.timeit(lambda: normalise_numpy(x[:1000]), number=5)

print(f"Python loop: {loop_time*1000:.1f}ms")
print(f"NumPy:       {numpy_time*1000:.2f}ms")
print(f"Speedup:     {loop_time/numpy_time:.0f}×")
# Typical output: loop ~500ms, NumPy ~0.1ms → ~5000× faster

# ── cProfile — find the slow function in a pipeline ──────────────────
import cProfile
import pstats
import io

def slow_pipeline(X, y):
    """A pipeline with a deliberate bottleneck."""
    # Step 1: normalise (fast)
    X_norm = (X - X.mean(axis=0)) / X.std(axis=0)

    # Step 2: pairwise distances (slow for large n — O(n²))
    # In real ML: this could be slow feature engineering, a slow model, etc.
    n = min(len(X), 500)
    distances = np.zeros((n, n))
    for i in range(n):
        for j in range(i, n):
            d = np.linalg.norm(X_norm[i] - X_norm[j])
            distances[i, j] = distances[j, i] = d

    # Step 3: fit model (fast with sklearn)
    from sklearn.linear_model import LinearRegression
    model = LinearRegression()
    model.fit(X_norm, y)
    return model, distances

X = np.random.randn(500, 4)
y = np.random.randn(500)

# Profile
pr = cProfile.Profile()
pr.enable()
model, _ = slow_pipeline(X, y)
pr.disable()

stream = io.StringIO()
ps = pstats.Stats(pr, stream=stream).sort_stats('cumulative')
ps.print_stats(8)   # top 8 slowest functions
print(stream.getvalue())
# Output reveals the nested loop is the bottleneck

# The fix: vectorised pairwise distances
from sklearn.metrics.pairwise import euclidean_distances
X_norm = (X - X.mean(axis=0)) / X.std(axis=0)
fast_distances = euclidean_distances(X_norm)  # vectorised → 100× faster`} />
      </div>

      <Div />

      {/* ══ SECTION 12 — ERRORS ════════════════════════════════════════════════ */}
      <div style={S.sec}>
        <span style={S.tag}>Errors you will hit</span>
        <h2 style={S.h2}>Every Python error common in ML code — explained and fixed</h2>

        <ErrorBlock
          error="TypeError: can only concatenate list (not 'numpy.ndarray') to list"
          cause="You're trying to append a NumPy array to a Python list with +. The + operator on lists does list concatenation, not numerical addition. This usually happens when mixing Python lists and NumPy arrays in a pipeline."
          fix="Use list.append() for adding one item, list.extend() for adding many items, or convert everything to NumPy arrays first with np.array(my_list). Alternatively use np.concatenate([arr1, arr2]) for combining arrays."
        />

        <ErrorBlock
          error="ValueError: setting an array element with a sequence. The requested array has an inhomogeneous shape after N dimensions."
          cause="You're trying to create a NumPy array from a list of lists where the inner lists have different lengths. For example: np.array([[1,2,3], [4,5]]) — the inner lists are length 3 and 2."
          fix="Ensure all inner lists have the same length before converting. If they genuinely differ (e.g. variable-length sequences), use a list of arrays or pad to the same length with np.pad()."
        />

        <ErrorBlock
          error="PicklingError: Can't pickle <function <lambda> at 0x...>"
          cause="You're trying to pickle (save) an object that contains a lambda function. Lambda functions cannot be pickled because they don't have a module-level name that pickle can reference."
          fix="Replace lambda functions in any class you want to pickle with regular named functions defined at module level. This is a common issue when using multiprocessing or joblib.Parallel with custom objects."
        />

        <ErrorBlock
          error="RecursionError: maximum recursion depth exceeded"
          cause="A function is calling itself (directly or indirectly) too many times — the default Python limit is 1000 recursive calls. This can happen with overly deep decision trees implemented recursively, or circular references."
          fix="For ML: convert recursive algorithms to iterative ones using explicit stacks. For deep recursion: increase the limit with sys.setrecursionlimit(10000) as a temporary fix, but the real fix is always an iterative implementation."
        />

        <ErrorBlock
          error="ModuleNotFoundError: No module named 'sklearn'"
          cause="The package is not installed in your current Python environment. This often happens because you installed the package in one environment but are running code in another, or you installed it globally but are in a virtual environment."
          fix="Activate the correct virtual environment first, then run pip install scikit-learn. To verify which Python you're using: python -c 'import sys; print(sys.executable)'. Always install packages inside your project's virtual environment."
        />

        <ErrorBlock
          error="AttributeError: 'NoneType' object has no attribute 'fit'"
          cause="A variable expected to hold a model is None. Usually caused by a function that should return a model but is missing a return statement, or a conditional branch that doesn't initialise the model in all paths."
          fix="Trace back where the variable is assigned. Add assert model is not None before calling .fit(). Use explicit return statements in all branches of model-creation functions. Type hints catch this earlier: def create_model() -> RandomForestClassifier."
        />
      </div>

      <Div />

      {/* ══ SECTION 13 — WHAT'S NEXT ═══════════════════════════════════════════ */}
      <div style={{ paddingBottom: 48, paddingTop: 8 }}>
        <span style={S.tag}>What comes next</span>
        <h2 style={S.h2}>You now write Python the way ML engineers write it.</h2>

        <p style={S.p}>
          The patterns in this module — comprehensions, generators, OOP,
          decorators, proper error handling — are what separate ML code
          that only works in a notebook from ML code that works in production.
          Every module from here uses these patterns naturally.
        </p>

        <p style={S.p}>
          Module 09 moves to NumPy — the numerical foundation of all ML in Python.
          With the Python patterns you've just learned, every NumPy operation
          will make immediate sense: arrays are just vectors and matrices
          (Module 03), broadcasting is just the rule from Module 03 applied
          in code, and vectorisation is just avoiding Python loops
          in favour of matrix operations (Module 04).
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
              Next — Module 09 · Programming Ecosystem
            </div>
            <div style={{
              fontSize: 15, fontWeight: 700, color: 'var(--text)',
              fontFamily: 'var(--font-display)', letterSpacing: '-0.3px',
            }}>
              NumPy Arrays and Broadcasting
            </div>
            <p style={{ ...S.ps, marginBottom: 0, marginTop: 4 }}>
              The backbone of all numerical ML — arrays, indexing, slicing,
              broadcasting, and vectorised operations that replace every for loop.
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
          'ML Python is not beginner Python. The patterns that matter: comprehensions instead of loops, generators for data loading, OOP for custom estimators, decorators for logging and caching, type hints for readability.',
          'Default mutable arguments (def f(x=[]) is a classic Python bug — the same list object is reused across calls. Always use None as default and create the mutable object inside the function.',
          'The sklearn estimator interface is the universal pattern: __init__ stores hyperparameters, fit() learns from data and returns self, predict()/transform() applies to new data. Learned parameters get a trailing underscore (model.weights_).',
          'Generators yield one value at a time instead of building the full list. This is how every ML data loader works — one batch at a time, never the full dataset in memory. def my_gen(): yield value is all you need.',
          'Decorators are functions that wrap other functions. @timer, @retry, @lru_cache, @torch.no_grad() — all follow the same pattern: a function that takes a function and returns a modified function.',
          'For performance: measure before optimising. timeit for small snippets, cProfile for full pipelines. 90% of ML slowdowns come from Python loops over array elements — replace with vectorised NumPy operations for 1000× speedups.',
          'Virtual environments are non-negotiable for ML projects. One environment per project, requirements.txt with pinned versions, always activate before installing or running code.',
        ]}
      />
    </LearnLayout>
  )
}