import type { Metadata } from 'next'
import { LearnLayout } from '@/components/content/LearnLayout'
import { Callout } from '@/components/content/Callout'
import { KeyTakeaways } from '@/components/content/KeyTakeaways'
import MLPageHeader from '@/components/content/MLPageHeader'

export const metadata: Metadata = {
  title: 'Gradient Boosting — How XGBoost and LightGBM Work — Chaduvuko',
  description:
    'Sequential weak learners, residuals, learning rate, and why gradient boosting wins almost every tabular ML competition. Built from plain English first.',
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

function ConceptBox({ title, children, color = '#D85A30' }: {
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

export default function GradientBoostingPage() {
  return (
    <LearnLayout
      title="Gradient Boosting — How XGBoost and LightGBM Work"
      description="Sequential weak learners, residuals, learning rate, and why gradient boosting wins almost every tabular ML competition — built from plain English first."
      section="Classical ML"
      readTime="30–40 min"
      updatedAt="March 2026"
    >
      <MLPageHeader section="classical-ml" topic="gradient-boosting" />

      {/* ══ SECTION 1 — PLAIN ENGLISH ══════════════════════════════════════════ */}
      <div style={S.sec}>
        <span style={S.tag}>Before any formula — what problem does this solve?</span>
        <h2 style={S.h2}>
          Random Forest trains 500 trees independently and averages them.
          Gradient Boosting trains 500 trees sequentially — each one
          fixing the mistakes of all the previous trees.
        </h2>

        <p style={S.p}>
          You trained a Random Forest on DoorDash delivery time data and got
          a mean absolute error of 4.2 minutes. Some orders are predicted
          well. Others are consistently wrong — long-distance orders during
          peak hours that the model always underestimates.
          The errors are not random noise. They have a pattern.
        </p>

        <p style={S.p}>
          Random Forest ignores this. It trains every tree independently
          on a random sample of data. It has no mechanism to say
          "pay more attention to the orders we keep getting wrong."
        </p>

        <p style={S.p}>
          Gradient Boosting does exactly this. After training the first tree,
          it looks at every prediction error. It trains the second tree
          specifically to predict those errors — not the original target,
          but the <strong style={{ color: '#D85A30' }}>residuals</strong> (the mistakes).
          The third tree predicts the residuals of the first two combined.
          Each new tree corrects what all previous trees got wrong.
          After 500 trees, the accumulated corrections produce a model
          that consistently outperforms any single tree or Random Forest
          on almost every tabular dataset.
        </p>

        <AnalogyBox>
          <p style={{ ...S.p, marginBottom: 8 }}>
            You are learning to throw darts. First throw: you miss the bullseye
            by 8cm to the right. A coach watches and says "next throw, aim 8cm
            to the left of wherever you aimed before." Second throw: miss by 3cm
            upward. Coach: "aim 3cm down from last time." Each throw corrects
            the accumulated error of all previous throws.
          </p>
          <p style={{ ...S.ps, marginBottom: 0, color: '#00e676' }}>
            Gradient Boosting trains each new tree to hit where the previous
            ensemble missed. The final prediction is the sum of all trees —
            each one having corrected the previous collection's errors.
          </p>
        </AnalogyBox>

        <Callout type="tip">
          Gradient Boosting is the algorithm family behind XGBoost and LightGBM —
          the two most widely used ML algorithms in production tabular ML today.
          Understanding gradient boosting conceptually means XGBoost and LightGBM
          become obvious extensions, not mysterious black boxes.
        </Callout>
      </div>

      <Div />

      {/* ══ SECTION 2 — RESIDUALS AND THE CORE LOOP ════════════════════════════ */}
      <div style={S.sec}>
        <span style={S.tag}>The core mechanism</span>
        <h2 style={S.h2}>Residuals — what each tree actually learns to predict</h2>

        <p style={S.p}>
          A residual is simply the difference between the actual value
          and what the current ensemble predicts.
          If the true delivery time is 42 minutes and the current ensemble
          predicts 35 minutes, the residual is 42 − 35 = +7 minutes.
          The next tree tries to predict +7.
          After adding it, the ensemble now predicts 35 + 7 = 42. Exact.
        </p>

        <p style={S.p}>
          Of course real data has noise — you cannot eliminate all error.
          The next tree predicts the residuals imperfectly.
          But each iteration reduces them further. After many iterations
          the residuals shrink to near-zero for most training points.
        </p>

        <VisualBox label="Gradient boosting loop — three trees on the same delivery data">
          <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
            {[
              {
                step: 'Start',
                pred: 'Initial prediction = mean(y) = 36.0 min',
                residuals: 'Residuals = y − 36.0  (most are large)',
                color: '#888',
                mse: 'MSE = 48.2',
              },
              {
                step: 'Tree 1',
                pred: 'Tree 1 learns to predict residuals from start',
                residuals: 'Ensemble = 36.0 + 0.1 × Tree1. New residuals = y − Ensemble',
                color: '#D85A30',
                mse: 'MSE = 31.4',
              },
              {
                step: 'Tree 2',
                pred: 'Tree 2 learns to predict NEW residuals from Tree 1',
                residuals: 'Ensemble = 36.0 + 0.1×(Tree1 + Tree2). Residuals shrink further',
                color: '#BA7517',
                mse: 'MSE = 21.7',
              },
              {
                step: 'Tree 3',
                pred: 'Tree 3 corrects what Trees 1+2 missed',
                residuals: 'Ensemble = 36.0 + 0.1×(Tree1+Tree2+Tree3). Residuals smaller again',
                color: '#1D9E75',
                mse: 'MSE = 15.3',
              },
              {
                step: '... Tree 500',
                pred: 'After 500 corrections, residuals are near-zero on training data',
                residuals: 'Final prediction = 36.0 + 0.1 × Σ(all 500 trees)',
                color: '#378ADD',
                mse: 'MSE = 3.8',
              },
            ].map((item, i) => (
              <div key={item.step} style={{
                display: 'grid', gridTemplateColumns: '80px 1fr 80px',
                gap: 14, padding: '12px 0',
                borderBottom: i < 4 ? '1px solid var(--border)' : 'none',
                alignItems: 'start',
              }}>
                <div style={{
                  fontSize: 12, fontWeight: 700,
                  color: item.color, fontFamily: 'var(--font-mono)',
                }}>
                  {item.step}
                </div>
                <div>
                  <p style={{ ...S.ps, marginBottom: 4, color: 'var(--text)', fontWeight: 600 }}>
                    {item.pred}
                  </p>
                  <p style={{ ...S.ps, marginBottom: 0 }}>{item.residuals}</p>
                </div>
                <div style={{
                  fontSize: 11, fontFamily: 'var(--font-mono)',
                  color: item.color, textAlign: 'right' as const,
                }}>
                  {item.mse}
                </div>
              </div>
            ))}
          </div>
          <p style={{ ...S.ps, marginBottom: 0, marginTop: 12 }}>
            0.1 is the learning rate — each tree's contribution is scaled down
            to prevent overfitting. The 0.1 means: take small steps in the
            right direction rather than one large step.
          </p>
        </VisualBox>

        <CodeBlock code={`import numpy as np
from sklearn.tree import DecisionTreeRegressor
from sklearn.metrics import mean_absolute_error

np.random.seed(42)
n = 1000

distance  = np.abs(np.random.normal(4.0, 2.0, n)).clip(0.5, 15)
traffic   = np.random.randint(1, 11, n).astype(float)
prep      = np.abs(np.random.normal(15, 5, n)).clip(5, 35)
delivery  = (8.6 + 7.3*distance + 0.8*prep + 1.5*traffic
             + np.random.normal(0, 4, n)).clip(10, 120)

X = np.column_stack([distance, traffic, prep])
y = delivery

# ── Gradient Boosting from scratch ────────────────────────────────────
class GradientBoostingScratch:
    """
    Gradient Boosting Regressor built from scratch.
    Every step is explicit — no hidden magic.
    """
    def __init__(self, n_estimators=50, learning_rate=0.1, max_depth=3):
        self.n_estimators   = n_estimators
        self.learning_rate  = learning_rate
        self.max_depth      = max_depth
        self.trees          = []
        self.initial_pred   = None

    def fit(self, X, y):
        # Step 1: Initial prediction = mean of target
        self.initial_pred = y.mean()
        current_pred = np.full(len(y), self.initial_pred)

        print(f"Initial prediction (mean): {self.initial_pred:.2f}")
        print(f"Initial MAE: {mean_absolute_error(y, current_pred):.4f}\n")

        for i in range(self.n_estimators):
            # Step 2: Compute residuals — what the ensemble got wrong
            residuals = y - current_pred   # the "negative gradient"

            # Step 3: Train a shallow tree on the RESIDUALS (not y!)
            tree = DecisionTreeRegressor(max_depth=self.max_depth)
            tree.fit(X, residuals)
            self.trees.append(tree)

            # Step 4: Update predictions — small step in residual direction
            update = self.learning_rate * tree.predict(X)
            current_pred = current_pred + update

            if (i + 1) % 10 == 0:
                mae = mean_absolute_error(y, current_pred)
                print(f"  After tree {i+1:3d}: MAE = {mae:.4f}  "
                      f"mean residual = {np.abs(residuals).mean():.4f}")

        return self

    def predict(self, X):
        # Start with initial prediction
        pred = np.full(len(X), self.initial_pred)
        # Add each tree's contribution (scaled by learning rate)
        for tree in self.trees:
            pred += self.learning_rate * tree.predict(X)
        return pred


# Train from scratch
from sklearn.model_selection import train_test_split
X_tr, X_te, y_tr, y_te = train_test_split(X, y, test_size=0.2, random_state=42)

print("=== Gradient Boosting From Scratch ===")
gb_scratch = GradientBoostingScratch(
    n_estimators=50, learning_rate=0.1, max_depth=3
)
gb_scratch.fit(X_tr, y_tr)
scratch_mae = mean_absolute_error(y_te, gb_scratch.predict(X_te))
print(f"\nFinal test MAE: {scratch_mae:.4f} min")

# Verify with sklearn
from sklearn.ensemble import GradientBoostingRegressor
gb_sk = GradientBoostingRegressor(
    n_estimators=50, learning_rate=0.1, max_depth=3, random_state=42
)
gb_sk.fit(X_tr, y_tr)
sk_mae = mean_absolute_error(y_te, gb_sk.predict(X_te))
print(f"sklearn GBR test MAE: {sk_mae:.4f} min  (should be similar)")`} />
      </div>

      <Div />

      {/* ══ SECTION 3 — LEARNING RATE AND N ESTIMATORS ═════════════════════════ */}
      <div style={S.sec}>
        <span style={S.tag}>The two most important hyperparameters</span>
        <h2 style={S.h2}>Learning rate and n_estimators — always tune them together</h2>

        <p style={S.p}>
          The learning rate controls how much each tree contributes to the
          final prediction. A small learning rate (0.01) means each tree
          makes tiny corrections — you need many more trees to converge,
          but the final model generalises better because it took small
          careful steps. A large learning rate (0.5) means each tree makes
          large corrections — you converge faster but risk overshooting
          and overfitting.
        </p>

        <p style={S.p}>
          This creates an important relationship:
          <strong style={{ color: '#D85A30' }}> lower learning rate requires more trees,
          but generally produces a better model.</strong> The two hyperparameters
          must be tuned together. Halving the learning rate and doubling
          n_estimators often improves performance.
        </p>

        <ConceptBox title="Learning rate intuition — step size in gradient descent">
          <div style={{ display: 'flex', gap: 20, flexWrap: 'wrap' }}>
            <svg width="280" height="160" viewBox="0 0 280 160">
              {/* Loss curve */}
              <path d="M 20 140 Q 80 130 120 100 Q 160 70 180 50 Q 200 35 250 30"
                fill="none" stroke="#555" strokeWidth="1.5" />
              {/* Large learning rate — overshoots */}
              <circle cx="20" cy="140" r="4" fill="#D85A30" />
              <circle cx="80" cy="60" r="4" fill="#D85A30" />
              <circle cx="140" cy="120" r="4" fill="#D85A30" />
              <circle cx="200" cy="45" r="4" fill="#D85A30" />
              <path d="M 20 140 L 80 60 L 140 120 L 200 45"
                fill="none" stroke="#D85A30" strokeWidth="1.5" strokeDasharray="4,2" />
              <text x="205" y="42" fontSize="9" fill="#D85A30" fontFamily="monospace">lr=0.5 — oscillates</text>
              {/* Small learning rate — smooth */}
              <circle cx="20" cy="140" r="4" fill="#1D9E75" />
              <circle cx="50" cy="125" r="4" fill="#1D9E75" />
              <circle cx="80" cy="110" r="4" fill="#1D9E75" />
              <circle cx="120" cy="90" r="4" fill="#1D9E75" />
              <circle cx="170" cy="60" r="4" fill="#1D9E75" />
              <circle cx="230" cy="35" r="4" fill="#1D9E75" />
              <path d="M 20 140 L 50 125 L 80 110 L 120 90 L 170 60 L 230 35"
                fill="none" stroke="#1D9E75" strokeWidth="1.5" />
              <text x="195" y="30" fontSize="9" fill="#1D9E75" fontFamily="monospace">lr=0.05 — smooth</text>
              <text x="20" y="155" fontSize="9" fill="#888" fontFamily="monospace">iterations →</text>
              <text x="5" y="100" fontSize="9" fill="#888" fontFamily="monospace" transform="rotate(-90, 12, 100)">loss</text>
            </svg>
            <div style={{ flex: 1, minWidth: 160 }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {[
                  { lr: 'lr=0.3+', trees: 'few (50–100)', risk: 'overfitting, unstable', color: '#D85A30' },
                  { lr: 'lr=0.1',  trees: '100–300',      risk: 'good default starting point', color: '#BA7517' },
                  { lr: 'lr=0.05', trees: '300–1000',     risk: 'better generalisation', color: '#1D9E75' },
                  { lr: 'lr=0.01', trees: '1000–5000',    risk: 'best results, slow training', color: '#378ADD' },
                ].map((row) => (
                  <div key={row.lr} style={{
                    background: 'var(--surface)', borderRadius: 5, padding: '7px 10px',
                    border: `1px solid ${row.color}25`,
                  }}>
                    <div style={{ fontSize: 12, fontFamily: 'var(--font-mono)', color: row.color, marginBottom: 2 }}>
                      {row.lr}
                    </div>
                    <div style={{ fontSize: 11, color: 'var(--muted)' }}>
                      Trees: {row.trees}
                    </div>
                    <div style={{ fontSize: 11, color: row.color }}>
                      {row.risk}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </ConceptBox>

        <CodeBlock code={`import numpy as np
from sklearn.ensemble import GradientBoostingRegressor
from sklearn.model_selection import train_test_split, cross_val_score
from sklearn.metrics import mean_absolute_error
import warnings
warnings.filterwarnings('ignore')

np.random.seed(42)
n = 3000
distance  = np.abs(np.random.normal(4.0, 2.0, n)).clip(0.5, 15)
traffic   = np.random.randint(1, 11, n).astype(float)
prep      = np.abs(np.random.normal(15, 5, n)).clip(5, 35)
value     = np.abs(np.random.normal(350, 150, n)).clip(50, 1200)
delivery  = (8.6 + 7.3*distance + 0.8*prep + 1.5*traffic
             + np.random.normal(0, 4, n)).clip(10, 120)

X = np.column_stack([distance, traffic, prep, value])
y = delivery

X_tr, X_te, y_tr, y_te = train_test_split(X, y, test_size=0.2, random_state=42)

# ── Learning rate × n_estimators trade-off ───────────────────────────
print(f"{'learning_rate':<16} {'n_estimators':<15} {'Train MAE':<12} {'Test MAE':<12} {'CV MAE'}")
print("─" * 70)

configs = [
    (0.3,   50),
    (0.1,  100),
    (0.1,  300),
    (0.05, 300),
    (0.05, 500),
    (0.01, 1000),
    (0.01, 2000),
]
for lr, n_est in configs:
    gb = GradientBoostingRegressor(
        learning_rate=lr, n_estimators=n_est,
        max_depth=4, subsample=0.8,
        random_state=42,
    )
    gb.fit(X_tr, y_tr)
    tr_mae = mean_absolute_error(y_tr, gb.predict(X_tr))
    te_mae = mean_absolute_error(y_te, gb.predict(X_te))
    cv     = -cross_val_score(gb, X_tr, y_tr, cv=3,
                               scoring='neg_mean_absolute_error').mean()
    flag   = ' ← overfit' if tr_mae < te_mae * 0.75 else ''
    print(f"  {lr:<14}  {n_est:<13}  {tr_mae:<12.4f} {te_mae:<12.4f} {cv:.4f}{flag}")

print("\nKey observation:")
print("  Lower lr + more trees generally gives better test MAE")
print("  Very low lr (0.01) with enough trees usually wins but trains slowly")`} />
      </div>

      <Div />

      {/* ══ SECTION 4 — REGULARISATION ══════════════════════════════════════════ */}
      <div style={S.sec}>
        <span style={S.tag}>Preventing overfitting</span>
        <h2 style={S.h2}>Four ways to regularise gradient boosting</h2>

        <p style={S.p}>
          Gradient boosting can overfit severely if unconstrained.
          With 1000 deep trees, it will eventually memorise the training data.
          Four parameters control overfitting — each from a different angle.
          Understanding all four lets you tune systematically rather than randomly.
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 24 }}>
          {[
            {
              param: 'max_depth',
              desc: 'Maximum depth of each tree. Shallower trees = simpler weak learners = less overfitting. Gradient boosting works best with shallow trees (3–6) — unlike Random Forest which uses full-depth trees.',
              default: '3',
              color: '#D85A30',
              tip: 'Start with max_depth=3. Rarely need to go above 6.',
            },
            {
              param: 'subsample',
              desc: 'Fraction of training data used for each tree. Like Random Forest\'s bootstrap, but without replacement. Introduces randomness — each tree sees a different subset. Reduces variance and often improves generalisation.',
              default: '1.0',
              color: '#378ADD',
              tip: '0.7–0.9 often works better than 1.0. Subsample < 1 makes it Stochastic GB.',
            },
            {
              param: 'min_samples_leaf',
              desc: 'Minimum samples required at a leaf. Forces the tree to only make splits that affect at least this many samples. Prevents the tree from fitting single-sample noise.',
              default: '1',
              color: '#1D9E75',
              tip: 'Try 5–20 for large datasets. Higher = more regularisation.',
            },
            {
              param: 'max_features',
              desc: 'Number of features considered at each split. Like Random Forest\'s random feature selection. Introduces randomness and can improve generalisation, especially with many correlated features.',
              default: 'None (all)',
              color: '#BA7517',
              tip: '"sqrt" or 0.5 often helps when you have many features.',
            },
          ].map((item) => (
            <div key={item.param} style={{
              background: 'var(--surface)', border: `1px solid ${item.color}25`,
              borderRadius: 8, padding: '13px 16px',
              borderLeft: `4px solid ${item.color}`,
            }}>
              <div style={{ display: 'flex', gap: 10, alignItems: 'center', marginBottom: 6 }}>
                <span style={{ fontSize: 13, fontWeight: 700, color: item.color, fontFamily: 'var(--font-mono)' }}>
                  {item.param}
                </span>
                <span style={{ fontSize: 11, color: 'var(--muted)', fontFamily: 'var(--font-mono)' }}>
                  default: {item.default}
                </span>
              </div>
              <p style={{ ...S.ps, marginBottom: 5 }}>{item.desc}</p>
              <div style={{ fontSize: 11, color: item.color, fontFamily: 'var(--font-mono)' }}>
                Tip: {item.tip}
              </div>
            </div>
          ))}
        </div>

        <CodeBlock code={`import numpy as np
from sklearn.ensemble import GradientBoostingRegressor
from sklearn.model_selection import cross_val_score, RandomizedSearchCV
from sklearn.pipeline import Pipeline
from sklearn.metrics import mean_absolute_error
import warnings
warnings.filterwarnings('ignore')

# ── Effect of regularisation parameters ───────────────────────────────
base_params = dict(
    n_estimators=200, learning_rate=0.1,
    random_state=42,
)

print("Regularisation parameter effects (CV MAE):")
print(f"{'Config':<45} {'CV MAE'}")
print("─" * 55)

configs = [
    ('No regularisation (default)',
     dict(max_depth=3, subsample=1.0, min_samples_leaf=1, max_features=None)),
    ('Shallow trees (max_depth=2)',
     dict(max_depth=2, subsample=1.0, min_samples_leaf=1, max_features=None)),
    ('Deep trees (max_depth=6)',
     dict(max_depth=6, subsample=1.0, min_samples_leaf=1, max_features=None)),
    ('Stochastic GB (subsample=0.8)',
     dict(max_depth=3, subsample=0.8, min_samples_leaf=1, max_features=None)),
    ('Min leaf samples=10',
     dict(max_depth=3, subsample=1.0, min_samples_leaf=10, max_features=None)),
    ('Random features (max_features=sqrt)',
     dict(max_depth=3, subsample=1.0, min_samples_leaf=1, max_features='sqrt')),
    ('All regularisation combined',
     dict(max_depth=3, subsample=0.8, min_samples_leaf=5, max_features='sqrt')),
]

for name, reg_params in configs:
    model = GradientBoostingRegressor(**base_params, **reg_params)
    cv    = -cross_val_score(model, X_tr, y_tr, cv=5,
                              scoring='neg_mean_absolute_error').mean()
    print(f"  {name:<43} {cv:.4f}")

# ── RandomizedSearchCV — full hyperparameter search ───────────────────
param_dist = {
    'n_estimators':     [100, 200, 300, 500],
    'learning_rate':    [0.01, 0.05, 0.1, 0.2],
    'max_depth':        [2, 3, 4, 5],
    'subsample':        [0.6, 0.7, 0.8, 0.9, 1.0],
    'min_samples_leaf': [1, 5, 10, 20],
    'max_features':     ['sqrt', 'log2', None],
}

search = RandomizedSearchCV(
    GradientBoostingRegressor(random_state=42),
    param_dist,
    n_iter=30, cv=5,
    scoring='neg_mean_absolute_error',
    random_state=42, n_jobs=-1,
)
search.fit(X_tr, y_tr)
print(f"\nBest params: {search.best_params_}")
print(f"Best CV MAE: {-search.best_score_:.4f} min")
best_test = mean_absolute_error(y_te, search.predict(X_te))
print(f"Test MAE:    {best_test:.4f} min")`} />
      </div>

      <Div />

      {/* ══ SECTION 5 — GRADIENT IN GRADIENT BOOSTING ══════════════════════════ */}
      <div style={S.sec}>
        <span style={S.tag}>Why it is called GRADIENT boosting</span>
        <h2 style={S.h2}>The gradient connection — residuals are negative gradients of MSE</h2>

        <p style={S.p}>
          The word "gradient" in gradient boosting is not just marketing.
          It connects directly to gradient descent from Module 07.
          When the loss function is mean squared error, the residuals
          <em> y − ŷ </em>are exactly the negative gradient of the loss
          with respect to the predictions. So fitting a tree on residuals
          is the same as taking a gradient descent step in the space of functions.
        </p>

        <p style={S.p}>
          The power of the gradient framework is that it works for
          <strong style={{ color: '#D85A30' }}> any differentiable loss function</strong>.
          For regression you use MSE residuals. For classification you use
          the gradient of the log-loss. For ranking problems you use custom
          ranking loss gradients. XGBoost extends this further by using
          both first and second derivatives (the Hessian) for more accurate
          tree fitting.
        </p>

        <ConceptBox title="Loss function → gradient → what each tree learns to predict">
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {[
              {
                loss: 'MSE  (regression)',
                gradient: 'y − ŷ  (residuals)',
                color: '#D85A30',
                use: 'Predicting delivery time, order value, any continuous output',
              },
              {
                loss: 'Log-loss  (classification)',
                gradient: 'y − sigmoid(ŷ)  (probability residuals)',
                color: '#378ADD',
                use: 'Predicting fraud, churn, late delivery (binary)',
              },
              {
                loss: 'MAE  (robust regression)',
                gradient: 'sign(y − ŷ)  (direction only, no magnitude)',
                color: '#1D9E75',
                use: 'When outliers should not dominate the fit',
              },
              {
                loss: 'Custom loss (XGBoost)',
                gradient: 'User-defined first + second derivative',
                color: '#BA7517',
                use: 'Ranking, survival analysis, any problem-specific objective',
              },
            ].map((row) => (
              <div key={row.loss} style={{
                display: 'grid', gridTemplateColumns: '190px 250px 1fr',
                gap: 12, background: 'var(--bg2)', borderRadius: 6,
                padding: '9px 12px', alignItems: 'start',
              }}>
                <span style={{ fontSize: 12, fontFamily: 'var(--font-mono)', color: row.color }}>
                  {row.loss}
                </span>
                <span style={{ fontSize: 12, fontFamily: 'var(--font-mono)', color: 'var(--text)' }}>
                  {row.gradient}
                </span>
                <span style={{ fontSize: 11, color: 'var(--muted)', lineHeight: 1.5 }}>
                  {row.use}
                </span>
              </div>
            ))}
          </div>
        </ConceptBox>

        <CodeBlock code={`import numpy as np
from sklearn.ensemble import GradientBoostingClassifier, GradientBoostingRegressor
from sklearn.model_selection import train_test_split, cross_val_score
from sklearn.metrics import roc_auc_score, log_loss, mean_absolute_error

np.random.seed(42)
n = 3000
distance  = np.abs(np.random.normal(4.0, 2.0, n)).clip(0.5, 15)
traffic   = np.random.randint(1, 11, n).astype(float)
prep      = np.abs(np.random.normal(15, 5, n)).clip(5, 35)
value     = np.abs(np.random.normal(350, 150, n)).clip(50, 1200)
delivery  = (8.6 + 7.3*distance + 0.8*prep + 1.5*traffic
             + np.random.normal(0, 4, n)).clip(10, 120)

X = np.column_stack([distance, traffic, prep, value])
y_reg = delivery
y_cls = (delivery > 45).astype(int)

X_tr, X_te, y_tr_r, y_te_r = train_test_split(X, y_reg, test_size=0.2, random_state=42)
_, _,  y_tr_c, y_te_c       = train_test_split(X, y_cls, test_size=0.2,
                                                 stratify=y_cls, random_state=42)

# ── Different loss functions for regression ────────────────────────────
print("Regression loss functions:")
for loss in ['squared_error', 'absolute_error', 'huber']:
    gb = GradientBoostingRegressor(
        loss=loss, n_estimators=200, learning_rate=0.1,
        max_depth=3, random_state=42,
    )
    gb.fit(X_tr, y_tr_r)
    mae = mean_absolute_error(y_te_r, gb.predict(X_te))
    print(f"  loss='{loss}': MAE={mae:.4f}")

# huber loss: squared_error for small residuals, absolute_error for large
# More robust to outliers than squared_error, faster to converge than absolute_error

# ── Classification — uses log-loss internally ─────────────────────────
gb_cls = GradientBoostingClassifier(
    n_estimators=200, learning_rate=0.1,
    max_depth=3, subsample=0.8,
    random_state=42,
)
gb_cls.fit(X_tr, y_tr_c)

y_proba = gb_cls.predict_proba(X_te)[:, 1]
print(f"\nClassification (log-loss internally):")
print(f"  ROC-AUC:  {roc_auc_score(y_te_c, y_proba):.4f}")
print(f"  Log-loss: {log_loss(y_te_c, y_proba):.4f}")

# ── Staged predictions — watch the model improve over iterations ───────
print("\nGradient Boosting convergence (staged predictions):")
print(f"{'n_trees':<10} {'Train MAE':<12} {'Test MAE'}")
print("─" * 35)
gb_staged = GradientBoostingRegressor(
    n_estimators=500, learning_rate=0.1, max_depth=3, random_state=42
)
gb_staged.fit(X_tr, y_tr_r)

# staged_predict gives predictions at each stage of boosting
staged = list(gb_staged.staged_predict(X_te))
staged_tr = list(gb_staged.staged_predict(X_tr))

for n_trees in [1, 5, 10, 25, 50, 100, 200, 500]:
    tr_mae = mean_absolute_error(y_tr_r, staged_tr[n_trees - 1])
    te_mae = mean_absolute_error(y_te_r, staged[n_trees - 1])
    print(f"  {n_trees:<8}  {tr_mae:<12.4f} {te_mae:.4f}")`} />
      </div>

      <Div />

      {/* ══ SECTION 6 — SKLEARN VS XGBOOST VS LIGHTGBM ═════════════════════════ */}
      <div style={S.sec}>
        <span style={S.tag}>The three implementations</span>
        <h2 style={S.h2}>sklearn GB vs XGBoost vs LightGBM — what changed and why it matters</h2>

        <p style={S.p}>
          sklearn's GradientBoostingRegressor implements the original Friedman (2001)
          algorithm faithfully. XGBoost (2016) and LightGBM (2017) are engineering
          breakthroughs that made gradient boosting 10–100× faster while often
          improving accuracy. Understanding what they changed explains why they
          dominate every tabular ML benchmark today.
        </p>

        <VisualBox label="Three implementations — what each one changed">
          <div style={{ border: '1px solid var(--border)', borderRadius: 8, overflow: 'hidden' }}>
            <div style={{
              display: 'grid', gridTemplateColumns: '160px 1fr 1fr 1fr',
              background: 'var(--surface)', borderBottom: '1px solid var(--border)',
              padding: '8px 12px', gap: 12,
            }}>
              {['Feature', 'sklearn GBM', 'XGBoost', 'LightGBM'].map((h, i) => (
                <span key={h} style={{
                  fontSize: 11, fontWeight: 700, color: i === 0 ? 'var(--muted)' :
                    i === 1 ? '#888' : i === 2 ? '#D85A30' : '#BA7517',
                  fontFamily: 'var(--font-mono)',
                }}>
                  {h}
                </span>
              ))}
            </div>
            {[
              ['Tree growth',      'Level-wise',        'Level-wise (depth-first)', 'Leaf-wise (best-first)'],
              ['Split finding',    'Exact (all splits)', 'Approximate histograms',  'Histogram-based (GOSS)'],
              ['2nd derivatives',  '✗ No',              '✓ Yes (Newton step)',      '✓ Yes'],
              ['Missing values',   'Impute first',       '✓ Native handling',       '✓ Native handling'],
              ['Categorical feat', 'Encode first',       'Encode first',            '✓ Native categorical'],
              ['GPU support',      '✗ No',              '✓ Yes',                   '✓ Yes'],
              ['Training speed',   'Baseline (1×)',      'Fast (5–10×)',             'Fastest (10–20×)'],
              ['Memory',           'High',              'Medium',                   'Low (histogram bins)'],
              ['Large datasets',   'Slow',              'Good',                     'Excellent'],
            ].map((row, i) => (
              <div key={i} style={{
                display: 'grid', gridTemplateColumns: '160px 1fr 1fr 1fr',
                padding: '8px 12px', gap: 12,
                background: i % 2 === 0 ? 'transparent' : 'var(--surface)',
                borderBottom: i < 8 ? '1px solid var(--border)' : 'none',
                alignItems: 'start',
              }}>
                <span style={{ fontSize: 12, color: 'var(--muted)' }}>{row[0]}</span>
                <span style={{ fontSize: 11, color: '#888', fontFamily: 'var(--font-mono)' }}>{row[1]}</span>
                <span style={{ fontSize: 11, color: '#D85A30', fontFamily: 'var(--font-mono)' }}>{row[2]}</span>
                <span style={{ fontSize: 11, color: '#BA7517', fontFamily: 'var(--font-mono)' }}>{row[3]}</span>
              </div>
            ))}
          </div>
        </VisualBox>

        <CodeBlock code={`import numpy as np
import time
from sklearn.ensemble import GradientBoostingRegressor, HistGradientBoostingRegressor
from sklearn.model_selection import train_test_split, cross_val_score
from sklearn.metrics import mean_absolute_error
import warnings
warnings.filterwarnings('ignore')

np.random.seed(42)
n = 10_000
distance  = np.abs(np.random.normal(4.0, 2.0, n)).clip(0.5, 15)
traffic   = np.random.randint(1, 11, n).astype(float)
prep      = np.abs(np.random.normal(15, 5, n)).clip(5, 35)
value     = np.abs(np.random.normal(350, 150, n)).clip(50, 1200)
delivery  = (8.6 + 7.3*distance + 0.8*prep + 1.5*traffic
             + np.random.normal(0, 4, n)).clip(10, 120)

X = np.column_stack([distance, traffic, prep, value])
y = delivery
X_tr, X_te, y_tr, y_te = train_test_split(X, y, test_size=0.2, random_state=42)

# ── sklearn HistGradientBoostingRegressor — faster than GBR ──────────
# sklearn's own histogram-based GB (similar speedup to LightGBM)
# Available since sklearn 0.21, stable since 1.0
models = {
    'sklearn GBR':      GradientBoostingRegressor(
                            n_estimators=200, learning_rate=0.1,
                            max_depth=3, random_state=42),
    'sklearn HistGBR':  HistGradientBoostingRegressor(
                            max_iter=200, learning_rate=0.1,
                            max_depth=3, random_state=42),
}

# Try XGBoost and LightGBM if installed
try:
    import xgboost as xgb
    models['XGBoost'] = xgb.XGBRegressor(
        n_estimators=200, learning_rate=0.1, max_depth=3,
        subsample=0.8, colsample_bytree=0.8,
        random_state=42, verbosity=0,
    )
except ImportError:
    print("XGBoost not installed: pip install xgboost")

try:
    import lightgbm as lgb
    models['LightGBM'] = lgb.LGBMRegressor(
        n_estimators=200, learning_rate=0.1, max_depth=3,
        subsample=0.8, colsample_bytree=0.8,
        random_state=42, verbose=-1,
    )
except ImportError:
    print("LightGBM not installed: pip install lightgbm")

print(f"{'Model':<22} {'Train time':>12} {'Test MAE':>10}")
print("─" * 48)
for name, model in models.items():
    t0 = time.time()
    model.fit(X_tr, y_tr)
    train_time = time.time() - t0
    mae = mean_absolute_error(y_te, model.predict(X_te))
    print(f"  {name:<20}  {train_time:>10.3f}s  {mae:>10.4f}")

# ── HistGradientBoostingRegressor handles NaN natively ────────────────
import pandas as pd
X_with_nan = X_tr.copy().astype(float)
X_with_nan[np.random.choice(len(X_with_nan), 200, replace=False), 0] = np.nan

# HistGBR handles NaN — no imputation needed
hgbr = HistGradientBoostingRegressor(max_iter=100, random_state=42)
hgbr.fit(X_with_nan, y_tr)   # NaN handled internally
print(f"\nHistGBR with NaN input — no error, MAE: "
      f"{mean_absolute_error(y_te, hgbr.predict(X_te)):.4f}")`} />
      </div>

      <Div />

      {/* ══ SECTION 7 — WHAT THIS LOOKS LIKE AT WORK ══════════════════════════ */}
      <div style={S.sec}>
        <span style={S.tag}>What this looks like at work</span>
        <h2 style={S.h2}>Day-one task — production delivery time predictor</h2>

        <CodeBlock code={`import numpy as np
import pandas as pd
from sklearn.ensemble import HistGradientBoostingRegressor
from sklearn.pipeline import Pipeline
from sklearn.compose import ColumnTransformer
from sklearn.preprocessing import OrdinalEncoder
from sklearn.model_selection import cross_validate, StratifiedKFold, KFold
from sklearn.metrics import mean_absolute_error
import joblib, warnings
warnings.filterwarnings('ignore')

np.random.seed(42)
n = 8_000

restaurants = ['Pizza Hut','KFC','Dominos','Biryani Blues',"McDonald's",'Subway']
cities      = ['Seattle','New York','Delhi','Austin','Boston','Chicago']
time_slots  = ['breakfast','lunch','evening','dinner']

df = pd.DataFrame({
    'distance_km':     np.abs(np.random.normal(4.0, 2.0, n)).clip(0.5, 15),
    'traffic_score':   np.random.randint(1, 11, n).astype(float),
    'restaurant_prep': np.abs(np.random.normal(15, 5, n)).clip(5, 35),
    'order_value':     np.abs(np.random.normal(350, 150, n)).clip(50, 1200),
    'restaurant':      np.random.choice(restaurants, n),
    'city':            np.random.choice(cities, n),
    'time_slot':       np.random.choice(time_slots, n),
    'is_weekend':      np.random.randint(0, 2, n).astype(float),
})
# Introduce missing values — real data always has them
df.loc[np.random.choice(n, 200, replace=False), 'restaurant_prep'] = np.nan
df.loc[np.random.choice(n, 100, replace=False), 'traffic_score']   = np.nan

y = (8.6 + 7.3*df['distance_km'] + 0.8*df['restaurant_prep'].fillna(15)
     + 1.5*df['traffic_score'].fillna(5) + np.random.normal(0, 4, n)).clip(10, 120)

from sklearn.model_selection import train_test_split
X_tr, X_te, y_tr, y_te = train_test_split(df, y, test_size=0.2, random_state=42)

NUM_COLS = ['distance_km', 'traffic_score', 'restaurant_prep',
            'order_value', 'is_weekend']
CAT_COLS = ['restaurant', 'city', 'time_slot']

# ── HistGBR handles NaN natively — only encode categoricals ──────────
preprocessor = ColumnTransformer([
    ('num', 'passthrough', NUM_COLS),   # pass through — HistGBR handles NaN
    ('cat', OrdinalEncoder(
        handle_unknown='use_encoded_value', unknown_value=-1
    ), CAT_COLS),
], remainder='drop')

pipeline = Pipeline([
    ('prep',  preprocessor),
    ('model', HistGradientBoostingRegressor(
        max_iter=300,
        learning_rate=0.05,
        max_depth=4,
        min_samples_leaf=10,
        l2_regularization=0.1,    # L2 regularisation (like Ridge penalty on leaf values)
        max_bins=255,              # histogram bins — higher = more accurate but slower
        early_stopping=True,       # stop if validation score stops improving
        validation_fraction=0.1,   # fraction of training data for early stopping
        n_iter_no_change=20,       # patience — stop after 20 rounds no improvement
        random_state=42,
    )),
])

# ── Cross-validation ──────────────────────────────────────────────────
cv_results = cross_validate(
    pipeline, df, y,
    cv=KFold(n_splits=5, shuffle=True, random_state=42),
    scoring='neg_mean_absolute_error',
    return_train_score=True,
)
print(f"Train MAE: {-cv_results['train_score'].mean():.4f} ± {cv_results['train_score'].std():.4f}")
print(f"Val MAE:   {-cv_results['test_score'].mean():.4f} ± {cv_results['test_score'].std():.4f}")

# ── Train final model and evaluate ────────────────────────────────────
pipeline.fit(X_tr, y_tr)
test_mae = mean_absolute_error(y_te, pipeline.predict(X_te))
print(f"Test MAE:  {test_mae:.4f} min")

# ── Feature importance ────────────────────────────────────────────────
model = pipeline.named_steps['model']
all_cols = NUM_COLS + CAT_COLS
importance = pd.Series(
    model.feature_importances_,
    index=all_cols,
).sort_values(ascending=False)

print("\nFeature importance:")
for feat, imp in importance.items():
    bar = '█' * int(imp * 60)
    print(f"  {feat:<20}: {bar} {imp:.4f}")

# ── Save for production ───────────────────────────────────────────────
joblib.dump(pipeline, '/tmp/swiggy_delivery_gbm.pkl')
print("\nModel saved: /tmp/swiggy_delivery_gbm.pkl")

# ── Score new orders ─────────────────────────────────────────────────
new_orders = pd.DataFrame([
    {'distance_km':5.2,'traffic_score':8,'restaurant_prep':22,
     'order_value':450,'restaurant':'KFC','city':'Seattle',
     'time_slot':'dinner','is_weekend':1},
    {'distance_km':1.5,'traffic_score':2,'restaurant_prep':10,
     'order_value':180,'restaurant':'Dominos','city':'New York',
     'time_slot':'lunch','is_weekend':0},
])
preds = pipeline.predict(new_orders)
for i, (_, row) in enumerate(new_orders.iterrows()):
    print(f"\nOrder {i+1}: {row['city']} | {row['restaurant']} | "
          f"{row['distance_km']}km | {row['time_slot']}")
    print(f"  Predicted delivery time: {preds[i]:.1f} min")`} />
      </div>

      <Div />

      {/* ══ SECTION 8 — ERRORS ═════════════════════════════════════════════════ */}
      <div style={S.sec}>
        <span style={S.tag}>Errors you will hit</span>
        <h2 style={S.h2}>Every common gradient boosting error — explained and fixed</h2>

        <ErrorBlock
          error="Model has perfect training MAE but validation/test MAE is 3× worse — severe overfitting"
          cause="Three most common causes: learning_rate too high (0.3+) combined with deep trees (max_depth=6+); n_estimators far too large without early stopping; no regularisation (subsample=1.0, min_samples_leaf=1, no max_features). Gradient boosting will memorise training data completely if unconstrained."
          fix="Reduce learning_rate to 0.05–0.1 and compensate with more trees. Set max_depth=3 or 4. Add subsample=0.8 and min_samples_leaf=10. For HistGradientBoostingRegressor: enable early_stopping=True which automatically stops when validation loss stops improving. Always tune with cross-validation, never by looking at training score."
        />

        <ErrorBlock
          error="GradientBoostingRegressor training takes 30+ minutes on 100,000 rows"
          cause="sklearn's GradientBoostingRegressor uses exact split finding — it evaluates every possible split on every feature for every tree. With n=100,000, n_estimators=500, and max_depth=4, this means billions of split evaluations. Training complexity is O(n × n_features × depth × n_estimators)."
          fix="Switch to HistGradientBoostingRegressor which uses histogram-based splitting (same as LightGBM) — typically 10–50× faster. Or use XGBoost/LightGBM directly. For datasets above 50,000 rows, the original sklearn GBR is rarely the right choice. HistGBR is a drop-in replacement with the same API."
        />

        <ErrorBlock
          error="n_estimators keeps increasing CV score — unclear when to stop"
          cause="Gradient boosting is not like Random Forest where more trees always helps without overfitting. With a high learning rate, adding trees beyond a certain point starts overfitting. Without proper stopping criteria, you are guessing. Adding more trees with a high learning rate eventually hurts generalisation."
          fix="Use early stopping: HistGradientBoostingRegressor(early_stopping=True, n_iter_no_change=20). Or use staged_predict() to plot training and validation MAE at each stage — the optimal n_estimators is where the validation curve bottoms out. Alternatively, use RandomizedSearchCV to jointly tune learning_rate and n_estimators."
        />

        <ErrorBlock
          error="GradientBoostingClassifier predict_proba outputs are very close to 0 or 1 — overconfident"
          cause="With a large learning rate and many trees, the model becomes overfit and pushes probabilities to the extremes. The log-loss objective drives probabilities toward 0 and 1 on training data — if the model overfits, these extreme probabilities appear on test data too."
          fix="Reduce learning_rate and add regularisation as described above. Additionally apply CalibratedClassifierCV post-hoc if well-calibrated probabilities are needed. Reduce max_depth to 3 — shallow trees in gradient boosting produce better-calibrated probabilities because each tree makes smaller, less confident corrections."
        />
      </div>

      <Div />

      {/* ══ SECTION 9 — WHAT'S NEXT ════════════════════════════════════════════ */}
      <div style={{ paddingBottom: 48, paddingTop: 8 }}>
        <span style={S.tag}>What comes next</span>
        <h2 style={S.h2}>
          You understand gradient boosting. Now the production implementation.
        </h2>

        <p style={S.p}>
          Gradient boosting is the concept. XGBoost is the implementation that
          won every Kaggle competition from 2016–2019 and is still deployed
          at most Indian fintech companies today.
          Module 30 covers XGBoost in practice — regularisation parameters,
          early stopping with a validation set, SHAP values for explaining
          individual predictions, and a complete end-to-end workflow.
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
              textTransform: 'uppercase' as const, color: '#D85A30',
              fontFamily: 'var(--font-mono)', marginBottom: 5,
            }}>
              Next — Module 30 · Classical ML
            </div>
            <div style={{
              fontSize: 15, fontWeight: 700, color: 'var(--text)',
              fontFamily: 'var(--font-display)', letterSpacing: '-0.3px',
            }}>
              XGBoost in Practice — End to End
            </div>
            <p style={{ ...S.ps, marginBottom: 0, marginTop: 4 }}>
              Train, tune, and interpret XGBoost on a real dataset.
              Regularisation parameters, early stopping, SHAP values,
              and production deployment.
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
          'Gradient Boosting trains trees sequentially. Each new tree learns to predict the residuals — the errors — of all previous trees combined. Final prediction = initial mean + learning_rate × sum of all trees.',
          'Residuals are the negative gradient of the MSE loss. This is why it is called gradient boosting — fitting trees on residuals is equivalent to gradient descent in function space. The framework generalises to any differentiable loss function.',
          'Learning rate and n_estimators must be tuned together. Lower learning rate requires more trees but generally produces better generalisation. Halving the learning rate and doubling n_estimators is a reliable improvement strategy.',
          'Four regularisation handles: max_depth (keep at 3–5), subsample (0.7–0.9 adds beneficial randomness), min_samples_leaf (prevents leaf overfitting), max_features (random feature selection). Use all four together for the most regularised model.',
          'For datasets above 50,000 rows, use HistGradientBoostingRegressor (sklearn), XGBoost, or LightGBM instead of the original GradientBoostingRegressor. Histogram-based splitting gives 10–50× speedup with equal or better accuracy.',
          'Enable early stopping for automatic n_estimators selection. It monitors a held-out validation set and stops training when performance stops improving — preventing overfitting and saving you from manually tuning n_estimators.',
        ]}
      />
    </LearnLayout>
  )
}