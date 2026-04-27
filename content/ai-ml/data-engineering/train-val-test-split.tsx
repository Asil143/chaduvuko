import type { Metadata } from 'next'
import { LearnLayout } from '@/components/content/LearnLayout'
import { Callout } from '@/components/content/Callout'
import { KeyTakeaways } from '@/components/content/KeyTakeaways'
import MLPageHeader from '@/components/content/MLPageHeader'

export const metadata: Metadata = {
  title: 'Train / Validation / Test Split — Chaduvuko',
  description:
    'Why three splits not two. Holdout sets, stratified splits, data leakage across splits, and the time-series exception where random splits break everything.',
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

function ConceptBox({ title, children, color = '#1D9E75' }: {
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

export default function TrainValTestSplitPage() {
  return (
    <LearnLayout
      title="Train / Validation / Test Split"
      description="Why three splits not two. Holdout sets, stratified splits, data leakage across splits, and the time-series exception where random splits break everything."
      section="Data Engineering for ML"
      readTime="30–35 min"
      updatedAt="March 2026"
    >
      <MLPageHeader section="data-engineering" topic="train-val-test-split" />

      {/* ══ SECTION 1 — PLAIN ENGLISH ══════════════════════════════════════════ */}
      <div style={S.sec}>
        <span style={S.tag}>Before any code — what problem does splitting solve?</span>
        <h2 style={S.h2}>
          Your model scored 99% accuracy. Then you deployed it and
          it was wrong on half the real orders. What went wrong?
        </h2>

        <p style={S.p}>
          You trained a delivery time model on 10,000 DoorDash orders and measured
          its accuracy on the same 10,000 orders it trained on. It scored incredibly well.
          You deployed it. It was terrible on real incoming orders.
          The problem: the model had already seen every order it was evaluated on.
          It did not learn to predict — it learned to memorise.
        </p>

        <p style={S.p}>
          This is why you always split your data before training.
          You hold back a portion of your data that the model never sees during training.
          You evaluate on this held-out portion only. If the model performs well
          on data it has never seen, you have evidence it has actually learned
          something generalisable — not just memorised the training set.
        </p>

        <p style={S.p}>
          But a two-way split — train and test — has a subtle flaw.
          When you tune hyperparameters (how deep should the tree be? what is
          the best regularisation strength?) using the test set score to decide,
          you are indirectly letting the test set influence your training decisions.
          Over many experiments, you overfit to the test set without realising it.
          This is why you need three splits — not two.
        </p>

        <AnalogyBox>
          <p style={{ ...S.p, marginBottom: 8 }}>
            Think of preparing for a competitive exam like GATE or CAT.
            Your textbook problems are the <strong style={{ color: '#1D9E75' }}>training set</strong> —
            you practice on these, make mistakes, learn from them.
            Practice mock tests are the <strong style={{ color: '#378ADD' }}>validation set</strong> —
            you use your score to decide which topics to study more.
            The actual exam on exam day is the <strong style={{ color: '#D85A30' }}>test set</strong> —
            you sit it exactly once, at the very end, to get your true performance.
          </p>
          <p style={{ ...S.ps, marginBottom: 0, color: '#00e676' }}>
            If you kept using the exam paper to decide what to study,
            your exam score would look great — but you would have cheated yourself
            out of knowing your real ability. Same with the test set in ML.
          </p>
        </AnalogyBox>

        <Callout type="tip">
          The single most important rule in this module:
          the test set is touched exactly once — at the very end,
          after all training and tuning is complete.
          Every time you look at the test set score to make a decision,
          you are leaking information and making your evaluation dishonest.
        </Callout>
      </div>

      <Div />

      {/* ══ SECTION 2 — THE THREE SPLITS ═══════════════════════════════════════ */}
      <div style={S.sec}>
        <span style={S.tag}>The three splits explained</span>
        <h2 style={S.h2}>Training, validation, and test — what each one is for</h2>

        <p style={S.p}>
          Each split has a specific job. Confusing the jobs leads to either
          overly optimistic performance estimates or models that do not generalise.
        </p>

        <VisualBox label="Three-way split — purpose of each portion">
          <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
            {/* Visual bar */}
            <div style={{ display: 'flex', height: 44, borderRadius: 8, overflow: 'hidden', marginBottom: 16 }}>
              <div style={{ flex: 70, background: '#1D9E7525', borderRight: '2px solid #1D9E75', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <span style={{ fontSize: 12, fontWeight: 700, color: '#1D9E75', fontFamily: 'var(--font-mono)' }}>TRAIN — 70%</span>
              </div>
              <div style={{ flex: 15, background: '#378ADD25', borderRight: '2px solid #378ADD', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <span style={{ fontSize: 11, fontWeight: 700, color: '#378ADD', fontFamily: 'var(--font-mono)' }}>VAL 15%</span>
              </div>
              <div style={{ flex: 15, background: '#D85A3025', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <span style={{ fontSize: 11, fontWeight: 700, color: '#D85A30', fontFamily: 'var(--font-mono)' }}>TEST 15%</span>
              </div>
            </div>

            {[
              {
                name: 'Training set',
                pct: '60–80%',
                color: '#1D9E75',
                purpose: 'The model sees this data during fit(). Weights are adjusted, trees are grown, patterns are learned — all from this portion only.',
                rule: 'Model can see this as many times as needed.',
                touch: 'Touched every epoch/iteration during training.',
              },
              {
                name: 'Validation set',
                pct: '10–20%',
                color: '#378ADD',
                purpose: 'Used to tune hyperparameters and compare models. You try max_depth=3 and max_depth=5 — you pick the one with better validation score. Also used for early stopping in neural networks.',
                rule: 'Model never trains on this. But YOU use its score to make decisions.',
                touch: 'Touched during hyperparameter tuning. Can be looked at many times.',
              },
              {
                name: 'Test set',
                pct: '10–20%',
                color: '#D85A30',
                purpose: 'The final honest evaluation. Touched exactly once — after all training and tuning is completely finished. Gives you an unbiased estimate of how the model will perform in production.',
                rule: 'Never used to make any training or tuning decision. Ever.',
                touch: 'Touched exactly ONCE — at the very end.',
              },
            ].map((item) => (
              <div key={item.name} style={{
                display: 'grid', gridTemplateColumns: '140px 1fr',
                gap: 16, padding: '14px 0',
                borderBottom: '1px solid var(--border)',
                alignItems: 'start',
              }}>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 700, color: item.color, fontFamily: 'var(--font-mono)', marginBottom: 3 }}>
                    {item.name}
                  </div>
                  <div style={{ fontSize: 11, color: 'var(--muted)', fontFamily: 'var(--font-mono)' }}>
                    typically {item.pct}
                  </div>
                </div>
                <div>
                  <p style={{ ...S.ps, marginBottom: 6 }}>{item.purpose}</p>
                  <div style={{ fontSize: 11, color: item.color, fontFamily: 'var(--font-mono)', marginBottom: 3 }}>
                    Rule: {item.rule}
                  </div>
                  <div style={{ fontSize: 11, color: 'var(--muted)', fontFamily: 'var(--font-mono)' }}>
                    {item.touch}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </VisualBox>

        <CodeBlock code={`import numpy as np
import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.metrics import mean_absolute_error

np.random.seed(42)
n = 5000

# DoorDash delivery dataset
distance   = np.abs(np.random.normal(4.0, 2.0, n)).clip(0.5, 15)
traffic    = np.random.randint(1, 11, n).astype(float)
prep       = np.abs(np.random.normal(15, 5, n)).clip(5, 35)
value      = np.abs(np.random.normal(350, 150, n)).clip(50, 1200)
delivery   = (8.6 + 7.3*distance + 0.8*prep + 1.5*traffic
              + np.random.normal(0, 4, n)).clip(10, 120)

X = np.column_stack([distance, traffic, prep, value])
y = delivery

# ── Two-step split: first carve out test, then split remainder ────────
# Step 1: hold out 15% as test set — never touch until the very end
X_trainval, X_test, y_trainval, y_test = train_test_split(
    X, y,
    test_size=0.15,
    random_state=42,
    shuffle=True,        # shuffle before splitting (default True)
)

# Step 2: split remaining 85% into train (82%) and validation (18%)
# 0.18 of 0.85 ≈ 15% of total
X_train, X_val, y_train, y_val = train_test_split(
    X_trainval, y_trainval,
    test_size=0.18,
    random_state=42,
)

total = len(X)
print(f"Total dataset:     {total:,} samples (100%)")
print(f"Training set:      {len(X_train):,} samples ({len(X_train)/total*100:.0f}%)")
print(f"Validation set:    {len(X_val):,}  samples ({len(X_val)/total*100:.0f}%)")
print(f"Test set:          {len(X_test):,}  samples ({len(X_test)/total*100:.0f}%)")
print(f"Sum check:         {len(X_train)+len(X_val)+len(X_test):,} ✓")

# ── How to use the three splits correctly ─────────────────────────────
from sklearn.preprocessing import StandardScaler
from sklearn.linear_model import Ridge

scaler = StandardScaler()
X_train_sc = scaler.fit_transform(X_train)    # fit ONLY on train
X_val_sc   = scaler.transform(X_val)          # transform with train stats
X_test_sc  = scaler.transform(X_test)         # transform with train stats

# Step 1: Try different hyperparameters — use VALIDATION score to choose
print("\nHyperparameter tuning using validation set:")
best_alpha, best_val_mae = None, float('inf')
for alpha in [0.001, 0.01, 0.1, 1.0, 10.0, 100.0]:
    model = Ridge(alpha=alpha)
    model.fit(X_train_sc, y_train)
    val_mae = mean_absolute_error(y_val, model.predict(X_val_sc))
    print(f"  alpha={alpha:<8}: val MAE = {val_mae:.4f}")
    if val_mae < best_val_mae:
        best_val_mae, best_alpha = val_mae, alpha

print(f"\nBest alpha: {best_alpha}  (val MAE = {best_val_mae:.4f})")

# Step 2: Retrain on train+validation with best hyperparameter
X_trainval_sc = scaler.fit_transform(X_trainval)   # refit on all non-test data
X_test_sc2    = scaler.transform(X_test)

final_model = Ridge(alpha=best_alpha)
final_model.fit(X_trainval_sc, y_trainval)

# Step 3: Evaluate on test set — ONCE, ONLY NOW, NEVER AGAIN
test_mae = mean_absolute_error(y_test, final_model.predict(X_test_sc2))
print(f"\nFinal test MAE (honest evaluation): {test_mae:.4f} min")
print("This is the number you report. It was computed exactly once.")`} />
      </div>

      <Div />

      {/* ══ SECTION 3 — STRATIFIED SPLITS ══════════════════════════════════════ */}
      <div style={S.sec}>
        <span style={S.tag}>When random is not good enough</span>
        <h2 style={S.h2}>Stratified splits — preserve class balance across all three sets</h2>

        <p style={S.p}>
          A random split might put 90% of the rare class into training
          and leave only 10% in test — making evaluation noisy and unreliable.
          Stratified splitting ensures each split has the same class proportion
          as the original dataset. This is especially important for imbalanced
          classification problems — fraud detection, churn prediction,
          medical diagnosis — where the minority class is what you actually care about.
        </p>

        <VisualBox label="Random split vs stratified split — class balance comparison">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
            {[
              {
                label: 'Random split (risky)',
                color: '#D85A30',
                train: { on_time: 850, late: 150 },
                val:   { on_time: 130, late: 20  },
                test:  { on_time: 120, late: 30  },
              },
              {
                label: 'Stratified split (safe)',
                color: '#1D9E75',
                train: { on_time: 840, late: 160 },
                val:   { on_time: 126, late: 24  },
                test:  { on_time: 126, late: 24  },
              },
            ].map((item) => (
              <div key={item.label} style={{
                background: 'var(--surface)', borderRadius: 8,
                padding: '14px 16px', border: `1px solid ${item.color}25`,
              }}>
                <div style={{ fontSize: 12, fontWeight: 700, color: item.color, fontFamily: 'var(--font-mono)', marginBottom: 10 }}>
                  {item.label}
                </div>
                {[
                  { name: 'Train', data: item.train },
                  { name: 'Val',   data: item.val   },
                  { name: 'Test',  data: item.test  },
                ].map((split) => {
                  const total    = split.data.on_time + split.data.late
                  const late_pct = (split.data.late / total * 100).toFixed(0)
                  return (
                    <div key={split.name} style={{ marginBottom: 8 }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 3 }}>
                        <span style={{ fontSize: 11, fontFamily: 'var(--font-mono)', color: 'var(--muted)' }}>{split.name}</span>
                        <span style={{
                          fontSize: 11, fontFamily: 'var(--font-mono)',
                          color: Math.abs(parseInt(late_pct) - 15) > 5 ? '#ff4757' : '#1D9E75',
                        }}>
                          {late_pct}% late
                        </span>
                      </div>
                      <div style={{ display: 'flex', height: 10, borderRadius: 3, overflow: 'hidden' }}>
                        <div style={{ flex: split.data.on_time, background: '#1D9E7530' }} />
                        <div style={{ flex: split.data.late, background: '#D85A3060' }} />
                      </div>
                    </div>
                  )
                })}
                <div style={{ fontSize: 10, color: 'var(--muted)', marginTop: 8, fontFamily: 'var(--font-mono)' }}>
                  Original: 15% late orders
                </div>
              </div>
            ))}
          </div>
        </VisualBox>

        <CodeBlock code={`import numpy as np
from sklearn.model_selection import train_test_split, StratifiedKFold
from sklearn.preprocessing import StandardScaler

np.random.seed(42)
n = 3000

distance  = np.abs(np.random.normal(4.0, 2.0, n)).clip(0.5, 15)
traffic   = np.random.randint(1, 11, n).astype(float)
prep      = np.abs(np.random.normal(15, 5, n)).clip(5, 35)
delivery  = (8.6 + 7.3*distance + 0.8*prep + 1.5*traffic
             + np.random.normal(0, 4, n)).clip(10, 120)

X = np.column_stack([distance, traffic, prep])
y_binary = (delivery > 45).astype(int)   # classification: late or not

print(f"Class distribution in full dataset:")
print(f"  On-time (0): {(y_binary==0).sum()} ({(y_binary==0).mean()*100:.1f}%)")
print(f"  Late    (1): {(y_binary==1).sum()} ({(y_binary==1).mean()*100:.1f}%)")

# ── Random split — may produce imbalanced sets ─────────────────────────
X_tr, X_te, y_tr, y_te = train_test_split(
    X, y_binary, test_size=0.2, random_state=42
)
print(f"\nRandom split — late % in test: {y_te.mean()*100:.1f}%")

# ── Stratified split — preserves class balance ─────────────────────────
X_tr_s, X_te_s, y_tr_s, y_te_s = train_test_split(
    X, y_binary,
    test_size=0.2,
    random_state=42,
    stratify=y_binary,    # ← this is the only addition
)
print(f"Stratified split — late % in test: {y_te_s.mean()*100:.1f}%  ← matches original")

# ── Three-way stratified split ────────────────────────────────────────
X_trainval, X_test, y_trainval, y_test = train_test_split(
    X, y_binary, test_size=0.15, random_state=42, stratify=y_binary
)
X_train, X_val, y_train, y_val = train_test_split(
    X_trainval, y_trainval, test_size=0.18, random_state=42, stratify=y_trainval
)

print(f"\nThree-way stratified split:")
for name, y_split in [('Train', y_train), ('Val', y_val), ('Test', y_test)]:
    print(f"  {name:<6}: {len(y_split):4d} samples  {y_split.mean()*100:.1f}% late")

# ── Stratified KFold — for cross-validation on imbalanced data ─────────
skf = StratifiedKFold(n_splits=5, shuffle=True, random_state=42)

print("\nStratifiedKFold — late % per fold:")
for fold, (tr_idx, va_idx) in enumerate(skf.split(X, y_binary), 1):
    fold_late_pct = y_binary[va_idx].mean() * 100
    print(f"  Fold {fold}: {fold_late_pct:.1f}% late  ← consistent across folds")`} />
      </div>

      <Div />

      {/* ══ SECTION 4 — DATA LEAKAGE ACROSS SPLITS ════════════════════════════ */}
      <div style={S.sec}>
        <span style={S.tag}>The most dangerous mistake</span>
        <h2 style={S.h2}>Data leakage across splits — five ways your evaluation lies to you</h2>

        <p style={S.p}>
          Data leakage across splits is when information from the test or validation
          set influences the training process — even indirectly.
          The result is an evaluation metric that looks excellent in development
          but collapses in production. It is the most common and most costly
          mistake in applied ML.
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 24 }}>
          {[
            {
              type: 'Preprocessing before splitting',
              severity: 'Critical',
              color: '#ff4757',
              bad: 'scaler.fit(X_all) → then split → scaler.transform(X_train), scaler.transform(X_test)',
              why: 'Test set mean and std contaminate the scaler used for training.',
              fix: 'Always split first, then fit preprocessors on X_train only. Use Pipeline.',
            },
            {
              type: 'Target encoding before splitting',
              severity: 'Critical',
              color: '#ff4757',
              bad: 'df["restaurant_enc"] = df.groupby("restaurant")["delivery"].transform("mean") → then split',
              why: 'Target means include test set labels. Each test row\'s target leaks into its own feature.',
              fix: 'Compute target encoding inside cross-validation folds or use sklearn TargetEncoder.',
            },
            {
              type: 'Feature selection before splitting',
              severity: 'High',
              color: '#D85A30',
              bad: 'Select top-20 features using correlation with y on full dataset → then split',
              why: 'Feature selection uses test set labels to choose features. Overfits to test.',
              fix: 'Perform feature selection inside the training fold only. Wrap in Pipeline.',
            },
            {
              type: 'Duplicate rows across splits',
              severity: 'High',
              color: '#D85A30',
              bad: 'Same customer order appears in both train and test after a sloppy join or dedup error.',
              why: 'Model memorises training samples and scores them perfectly in test.',
              fix: 'Deduplicate BEFORE splitting. Check: assert len(set(train_ids) & set(test_ids)) == 0',
            },
            {
              type: 'Temporal leakage',
              severity: 'High',
              color: '#BA7517',
              bad: 'Random split on time-series data — future samples land in train, past samples in test.',
              why: 'Model learns from the future to predict the past. Impossible in production.',
              fix: 'Always use time-based split for time-series: train on past, validate on future.',
            },
          ].map((item) => (
            <div key={item.type} style={{
              background: 'var(--surface)', border: `1px solid ${item.color}25`,
              borderRadius: 8, padding: '13px 16px',
              borderLeft: `4px solid ${item.color}`,
            }}>
              <div style={{ display: 'flex', gap: 10, alignItems: 'center', marginBottom: 8 }}>
                <span style={{ fontSize: 13, fontWeight: 700, color: item.color, fontFamily: 'var(--font-display)' }}>
                  {item.type}
                </span>
                <span style={{
                  fontSize: 10, fontWeight: 700, color: item.color,
                  fontFamily: 'var(--font-mono)', letterSpacing: '0.06em',
                  padding: '2px 6px', borderRadius: 3,
                  background: `${item.color}15`,
                }}>
                  {item.severity}
                </span>
              </div>
              <div style={{ fontSize: 11, fontFamily: 'var(--font-mono)', color: '#ff475790', marginBottom: 6, wordBreak: 'break-word' as const }}>
                ✗ {item.bad}
              </div>
              <p style={{ ...S.ps, marginBottom: 5 }}><strong style={{ color: 'var(--text)' }}>Why:</strong> {item.why}</p>
              <p style={{ ...S.ps, marginBottom: 0, color: '#1D9E75' }}><strong>Fix:</strong> {item.fix}</p>
            </div>
          ))}
        </div>

        <CodeBlock code={`import numpy as np
import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler
from sklearn.linear_model import Ridge
from sklearn.metrics import mean_absolute_error

np.random.seed(42)
n = 2000
X = np.random.randn(n, 5)
y = X[:, 0] * 3 + X[:, 1] * 2 + np.random.randn(n) * 2

# ── Demonstrate leakage from preprocessing before split ───────────────

# WRONG: fit scaler on ALL data, then split
scaler_leaky = StandardScaler()
X_scaled_leaky = scaler_leaky.fit_transform(X)    # uses test set stats!
X_tr_l, X_te_l, y_tr, y_te = train_test_split(X_scaled_leaky, y, test_size=0.2, random_state=42)
model_leaky = Ridge().fit(X_tr_l, y_tr)
mae_leaky   = mean_absolute_error(y_te, model_leaky.predict(X_te_l))

# CORRECT: split first, then fit scaler on train only
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)
scaler_correct = StandardScaler()
X_tr_c = scaler_correct.fit_transform(X_train)    # fit on train only
X_te_c = scaler_correct.transform(X_test)         # apply stored stats to test
model_correct = Ridge().fit(X_tr_c, y_train)
mae_correct   = mean_absolute_error(y_test, model_correct.predict(X_te_c))

print("Effect of preprocessing leakage:")
print(f"  Leaky (scaler fit on full data):  MAE = {mae_leaky:.4f}  ← optimistic lie")
print(f"  Correct (scaler fit on train):    MAE = {mae_correct:.4f}  ← honest estimate")
print(f"  Difference: {mae_leaky - mae_correct:.4f} min  ← how much the leakage flatters the model")

# ── Check for duplicate rows across splits ────────────────────────────
# In a real dataset you would use a business key like order_id
train_indices = set(range(len(X_train)))   # simulate with indices
test_indices  = set(range(len(X_train), len(X_train) + len(X_test)))
overlap       = train_indices & test_indices
print(f"\nDuplicate check: {len(overlap)} overlapping samples (should be 0)")
assert len(overlap) == 0, "Train and test sets overlap — data leakage!"
print("✓ No overlap confirmed")

# ── Verify stratification ─────────────────────────────────────────────
y_binary = (y > y.mean()).astype(int)
_, _, y_tr_b, y_te_b = train_test_split(
    X, y_binary, test_size=0.2, random_state=42, stratify=y_binary
)
print(f"\nStratification check:")
print(f"  Original positive rate: {y_binary.mean():.3f}")
print(f"  Train positive rate:    {y_tr_b.mean():.3f}")
print(f"  Test positive rate:     {y_te_b.mean():.3f}")`} />
      </div>

      <Div />

      {/* ══ SECTION 5 — TIME SERIES SPLITS ═════════════════════════════════════ */}
      <div style={S.sec}>
        <span style={S.tag}>The critical exception</span>
        <h2 style={S.h2}>Time-series splits — when random splitting destroys your model</h2>

        <p style={S.p}>
          For time-series data — stock prices, daily orders, sensor readings,
          anything measured over time — random splitting is not just suboptimal,
          it is fundamentally wrong. A random split puts future data in the
          training set and past data in the test set. The model learns from
          information that would not exist at prediction time. You are training
          on the future to predict the past — the opposite of what you need.
        </p>

        <ConceptBox title="The time-series rule — always train on past, evaluate on future" color="#D85A30">
          <p style={{ ...S.ps, marginBottom: 10 }}>
            For any dataset ordered by time, your split must respect chronological order.
            Training data must come entirely before validation data.
            Validation data must come entirely before test data.
            There must be no temporal overlap between any two splits.
          </p>
          <p style={{ ...S.ps, marginBottom: 0 }}>
            This simulates what actually happens in production: your model was trained
            on historical data and is now predicting future events it has never seen.
          </p>
        </ConceptBox>

        <VisualBox label="Time-based split vs random split — for time-series data">
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {/* Timeline */}
            <div>
              <div style={{ fontSize: 10, color: 'var(--muted)', fontFamily: 'var(--font-mono)', marginBottom: 6 }}>
                CORRECT: time-based split (train past → test future)
              </div>
              <div style={{ display: 'flex', height: 32, borderRadius: 6, overflow: 'hidden' }}>
                <div style={{ flex: 70, background: '#1D9E7530', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRight: '2px solid #1D9E75' }}>
                  <span style={{ fontSize: 11, fontFamily: 'var(--font-mono)', color: '#1D9E75' }}>Jan–Oct 2024 → TRAIN</span>
                </div>
                <div style={{ flex: 15, background: '#378ADD30', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRight: '2px solid #378ADD' }}>
                  <span style={{ fontSize: 10, fontFamily: 'var(--font-mono)', color: '#378ADD' }}>Nov → VAL</span>
                </div>
                <div style={{ flex: 15, background: '#D85A3030', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <span style={{ fontSize: 10, fontFamily: 'var(--font-mono)', color: '#D85A30' }}>Dec → TEST</span>
                </div>
              </div>
            </div>

            <div>
              <div style={{ fontSize: 10, color: '#ff4757', fontFamily: 'var(--font-mono)', marginBottom: 6 }}>
                WRONG: random split — future leaks into training
              </div>
              <div style={{ display: 'flex', height: 32, borderRadius: 6, overflow: 'hidden', gap: 2 }}>
                {Array.from({ length: 20 }).map((_, i) => (
                  <div key={i} style={{
                    flex: 1, height: '100%',
                    background: [0,2,5,8,10,13,16,18].includes(i) ? '#D85A3040' : '#1D9E7530',
                  }} />
                ))}
              </div>
              <div style={{ fontSize: 10, color: 'var(--muted)', marginTop: 4 }}>
                Orange = test samples randomly scattered throughout the timeline
              </div>
            </div>
          </div>
        </VisualBox>

        <CodeBlock code={`import numpy as np
import pandas as pd
from sklearn.model_selection import TimeSeriesSplit, train_test_split
from sklearn.linear_model import Ridge
from sklearn.preprocessing import StandardScaler
from sklearn.metrics import mean_absolute_error

np.random.seed(42)

# ── Instacart daily order volume — time-series ────────────────────────────
dates    = pd.date_range('2024-01-01', periods=365, freq='D')
trend    = np.linspace(1000, 1500, 365)           # growing business
seasonal = 200 * np.sin(2 * np.pi * np.arange(365) / 7)  # weekly cycle
noise    = np.random.normal(0, 50, 365)
orders   = (trend + seasonal + noise).clip(500)

# Features: day of week, month, trend proxy, lag features
df = pd.DataFrame({
    'date':        dates,
    'orders':      orders,
    'day_of_week': dates.dayofweek,
    'month':       dates.month,
    'day_of_year': dates.dayofyear,
})
# Lag feature: yesterday's orders (must shift to avoid leakage)
df['orders_lag1'] = df['orders'].shift(1)
df['orders_lag7'] = df['orders'].shift(7)
df = df.dropna().reset_index(drop=True)

X = df[['day_of_week', 'month', 'day_of_year', 'orders_lag1', 'orders_lag7']].values
y = df['orders'].values
dates_clean = df['date'].values

# ── WRONG: random split on time-series ────────────────────────────────
X_tr_r, X_te_r, y_tr_r, y_te_r = train_test_split(X, y, test_size=0.2, random_state=42)
sc_r = StandardScaler()
model_random = Ridge().fit(sc_r.fit_transform(X_tr_r), y_tr_r)
mae_random   = mean_absolute_error(y_te_r, model_random.predict(sc_r.transform(X_te_r)))

# ── CORRECT: chronological split ──────────────────────────────────────
split_idx    = int(len(X) * 0.8)
X_train_ts   = X[:split_idx]
X_test_ts    = X[split_idx:]
y_train_ts   = y[:split_idx]
y_test_ts    = y[split_idx:]

sc_ts = StandardScaler()
model_ts   = Ridge().fit(sc_ts.fit_transform(X_train_ts), y_train_ts)
mae_ts     = mean_absolute_error(y_test_ts, model_ts.predict(sc_ts.transform(X_test_ts)))

print("Time-series split comparison:")
print(f"  Random split MAE:       {mae_random:.1f} orders  ← optimistically wrong")
print(f"  Chronological MAE:      {mae_ts:.1f} orders  ← honest estimate")
print(f"  Training period:        {dates_clean[0]} → {dates_clean[split_idx-1]}")
print(f"  Test period:            {dates_clean[split_idx]} → {dates_clean[-1]}")

# ── TimeSeriesSplit — walk-forward cross-validation ───────────────────
# Each fold: train on past, validate on immediate future
# Simulates exactly what happens in production
tscv = TimeSeriesSplit(n_splits=5, gap=0)

print(f"\nTimeSeriesSplit walk-forward cross-validation:")
print(f"{'Fold':<6} {'Train size':<13} {'Val size':<11} {'Val MAE'}")
print("─" * 42)

for fold, (tr_idx, va_idx) in enumerate(tscv.split(X), 1):
    X_tr, X_va = X[tr_idx], X[va_idx]
    y_tr, y_va = y[tr_idx], y[va_idx]

    sc   = StandardScaler()
    m    = Ridge().fit(sc.fit_transform(X_tr), y_tr)
    mae  = mean_absolute_error(y_va, m.predict(sc.transform(X_va)))
    print(f"  {fold}     {len(X_tr):<13} {len(X_va):<11} {mae:.1f}")

# The MAE increases in later folds — the model struggles to predict
# further into the future. This is realistic. Random CV would hide this.`} />
      </div>

      <Div />

      {/* ══ SECTION 6 — CROSS-VALIDATION VS HOLDOUT ════════════════════════════ */}
      <div style={S.sec}>
        <span style={S.tag}>When to use which</span>
        <h2 style={S.h2}>Holdout split vs cross-validation — when each is appropriate</h2>

        <p style={S.p}>
          A single holdout split is fast but noisy — performance depends on
          which samples ended up in test. Cross-validation runs multiple splits
          and averages the result, giving a more reliable estimate.
          But it is k times slower and requires that all preprocessing
          fits inside each fold (a Pipeline).
        </p>

        <div style={{ border: '1px solid var(--border)', borderRadius: 10, overflow: 'hidden', marginBottom: 24 }}>
          <div style={{
            display: 'grid', gridTemplateColumns: '1fr 1fr 1fr',
            background: 'var(--surface)', borderBottom: '1px solid var(--border)',
            padding: '9px 14px',
          }}>
            {['Consideration', 'Holdout Split', 'Cross-Validation'].map(h => (
              <span key={h} style={{ fontSize: 11, fontWeight: 700, color: 'var(--muted)', fontFamily: 'var(--font-mono)' }}>{h}</span>
            ))}
          </div>
          {[
            ['Speed',             'Fast — one train/test',    'k× slower — k train/test cycles'],
            ['Reliability',       'Noisy — depends on luck',  'Stable — averaged over k folds'],
            ['Data efficiency',   'Wastes held-out data',     'Uses all data for training eventually'],
            ['Dataset size',      'OK for large (>50k rows)', 'Essential for small (<5k rows)'],
            ['Leakage safety',    'Manual — easy to forget',  'Automatic with Pipeline'],
            ['Time-series',       'Chronological holdout',    'TimeSeriesSplit only'],
            ['When to use',       'Large data, fast iteration', 'Small data, final model evaluation'],
          ].map(([consideration, holdout, cv], i) => (
            <div key={i} style={{
              display: 'grid', gridTemplateColumns: '1fr 1fr 1fr',
              padding: '9px 14px',
              borderBottom: i < 6 ? '1px solid var(--border)' : 'none',
              background: i % 2 === 0 ? 'transparent' : 'var(--surface)',
              alignItems: 'start',
            }}>
              <span style={{ fontSize: 12, color: 'var(--muted)' }}>{consideration}</span>
              <span style={{ fontSize: 12, color: '#378ADD' }}>{holdout}</span>
              <span style={{ fontSize: 12, color: '#1D9E75' }}>{cv}</span>
            </div>
          ))}
        </div>

        <CodeBlock code={`import numpy as np
from sklearn.model_selection import (
    train_test_split, KFold, StratifiedKFold,
    cross_val_score, cross_validate,
)
from sklearn.pipeline import Pipeline
from sklearn.preprocessing import StandardScaler
from sklearn.linear_model import Ridge
from sklearn.metrics import mean_absolute_error

np.random.seed(42)
n = 1000
X = np.random.randn(n, 4)
y = X[:, 0] * 3 + X[:, 1] * 2 + np.random.randn(n) * 2

pipeline = Pipeline([
    ('scaler', StandardScaler()),
    ('model',  Ridge(alpha=1.0)),
])

# ── Holdout split ─────────────────────────────────────────────────────
X_tr, X_te, y_tr, y_te = train_test_split(X, y, test_size=0.2, random_state=42)
pipeline.fit(X_tr, y_tr)
holdout_mae = mean_absolute_error(y_te, pipeline.predict(X_te))
print(f"Holdout MAE: {holdout_mae:.4f}")

# ── K-Fold cross-validation ────────────────────────────────────────────
cv_scores = cross_val_score(
    pipeline, X, y,
    cv=5,
    scoring='neg_mean_absolute_error',
    n_jobs=-1,
)
print(f"5-Fold CV MAE: {-cv_scores.mean():.4f} ± {cv_scores.std():.4f}")
print(f"Per-fold:      {(-cv_scores).round(3)}")

# ── cross_validate — more metrics at once ─────────────────────────────
cv_results = cross_validate(
    pipeline, X, y,
    cv=5,
    scoring=['neg_mean_absolute_error', 'r2'],
    return_train_score=True,
    n_jobs=-1,
)
print(f"\ncross_validate results:")
print(f"  Train MAE: {-cv_results['train_neg_mean_absolute_error'].mean():.4f}")
print(f"  Val MAE:   {-cv_results['test_neg_mean_absolute_error'].mean():.4f}")
print(f"  Val R²:    {cv_results['test_r2'].mean():.4f}")

# Large gap between train and val MAE = overfitting
gap = (-cv_results['train_neg_mean_absolute_error'].mean() -
       (-cv_results['test_neg_mean_absolute_error'].mean()))
if abs(gap) > 1.0:
    print(f"  ⚠ Train/val gap = {gap:.3f} — possible overfitting")`} />
      </div>

      <Div />

      {/* ══ SECTION 7 — PRACTICAL SPLIT SIZES ══════════════════════════════════ */}
      <div style={S.sec}>
        <span style={S.tag}>Practical guidance</span>
        <h2 style={S.h2}>How much data to put in each split — rules of thumb</h2>

        <p style={S.p}>
          There is no universally correct split ratio. The right ratio depends
          on how much data you have and what you need from each split.
          Here are the rules practitioners actually use:
        </p>

        <ConceptBox title="Split size guidelines by dataset size">
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {[
              {
                size: '< 1,000 rows',
                rec: 'Use cross-validation only. A holdout test set would be too small to trust.',
                split: 'No holdout — K-Fold CV (k=5 or 10)',
                color: '#D85A30',
              },
              {
                size: '1,000 – 10,000 rows',
                rec: 'Small holdout test + CV for tuning. 80/20 split is standard.',
                split: '80% train+val (CV) / 20% test',
                color: '#BA7517',
              },
              {
                size: '10,000 – 100,000 rows',
                rec: 'Three-way split is reliable. 70/15/15 is a common starting point.',
                split: '70% train / 15% val / 15% test',
                color: '#1D9E75',
              },
              {
                size: '> 100,000 rows',
                rec: 'You have enough data — a small validation and test set is statistically reliable. Less data needed in each split.',
                split: '80% train / 10% val / 10% test or even 90/5/5',
                color: '#378ADD',
              },
            ].map((item) => (
              <div key={item.size} style={{
                display: 'grid', gridTemplateColumns: '130px 1fr 200px',
                gap: 14, alignItems: 'start',
                background: 'var(--bg2)', borderRadius: 6, padding: '10px 12px',
                border: `1px solid ${item.color}20`,
              }}>
                <span style={{ fontSize: 12, fontWeight: 700, color: item.color, fontFamily: 'var(--font-mono)' }}>
                  {item.size}
                </span>
                <span style={{ fontSize: 12, color: 'var(--muted)', lineHeight: 1.6 }}>
                  {item.rec}
                </span>
                <span style={{ fontSize: 11, color: item.color, fontFamily: 'var(--font-mono)', lineHeight: 1.5 }}>
                  {item.split}
                </span>
              </div>
            ))}
          </div>
        </ConceptBox>

        <CodeBlock code={`import numpy as np
from sklearn.model_selection import train_test_split

def smart_split(X, y, dataset_size_hint: str = 'auto',
                random_state: int = 42, stratify=None):
    """
    Automatically choose split strategy based on dataset size.
    Returns X_train, X_val, X_test (or X_train, X_test for small datasets).
    """
    n = len(X)
    strat = stratify

    if n < 1000 or dataset_size_hint == 'small':
        print(f"  Dataset too small ({n} rows) — use cross-validation, no holdout")
        # Return 80/20 for basic use, but recommend CV
        return train_test_split(X, y, test_size=0.2,
                                random_state=random_state, stratify=strat)

    elif n < 10_000 or dataset_size_hint == 'medium':
        # 70/15/15
        test_size = 0.15
        val_size  = 0.15 / 0.85   # fraction of remaining after test split
        X_tv, X_test, y_tv, y_test = train_test_split(
            X, y, test_size=test_size, random_state=random_state,
            stratify=strat,
        )
        strat2 = y_tv if strat is not None else None
        X_train, X_val, y_train, y_val = train_test_split(
            X_tv, y_tv, test_size=val_size, random_state=random_state,
            stratify=strat2,
        )
        print(f"  Medium dataset ({n} rows): 70/15/15 split")

    else:
        # Large: 80/10/10
        test_size = 0.10
        val_size  = 0.10 / 0.90
        X_tv, X_test, y_tv, y_test = train_test_split(
            X, y, test_size=test_size, random_state=random_state,
            stratify=strat,
        )
        strat2 = y_tv if strat is not None else None
        X_train, X_val, y_train, y_val = train_test_split(
            X_tv, y_tv, test_size=val_size, random_state=random_state,
            stratify=strat2,
        )
        print(f"  Large dataset ({n} rows): 80/10/10 split")

    print(f"  Train: {len(X_train)}  Val: {len(X_val)}  Test: {len(X_test)}")
    return X_train, X_val, X_test, y_train, y_val, y_test

# Test it
for n in [500, 5_000, 50_000]:
    X_demo = np.random.randn(n, 4)
    y_demo = np.random.randn(n)
    print(f"\nDataset size: {n}")
    smart_split(X_demo, y_demo)`} />
      </div>

      <Div />

      {/* ══ SECTION 8 — ERRORS ═════════════════════════════════════════════════ */}
      <div style={S.sec}>
        <span style={S.tag}>Errors you will hit</span>
        <h2 style={S.h2}>Every common split error — explained and fixed</h2>

        <ErrorBlock
          error="Model scores 98% in development, collapses to 60% in production"
          cause="Classic leakage signature. Either the test set was used to make tuning decisions (peeked at test score to choose hyperparameters), preprocessing was fit on the full dataset before splitting, or there is temporal leakage — future data leaked into training. The model learned the test set rather than the underlying pattern."
          fix="Audit every preprocessing step: was it fit before or after splitting? Never use test scores for any decision — only validation scores. For time-series, confirm you are using chronological splits. Add an assertion: assert train_end_date < val_start_date < test_start_date. Rebuild the pipeline from scratch using sklearn Pipeline to make leakage structurally impossible."
        />

        <ErrorBlock
          error="ValueError: The least populated class in y has only 1 member — cannot stratify"
          cause="You used stratify=y but one class has so few samples that at least one split would have zero members of that class. With very imbalanced datasets (e.g. 1 fraud case in 1000 orders), stratification becomes impossible with some split ratios."
          fix="Either reduce the test_size so each split gets at least 2 samples of the minority class, or remove the stratify argument and handle imbalance separately (class_weight='balanced' in the model, or SMOTE oversampling). Print y.value_counts() first to see the class distribution before deciding on split strategy."
        />

        <ErrorBlock
          error="Test set performance is suspiciously optimistic — better than validation"
          cause="You tuned hyperparameters by looking at test set scores across multiple experiments. Each time you checked test performance and made a change, you were implicitly overfitting to the test set. This is one of the most common mistakes in practice — it feels harmless but accumulates across many experiments."
          fix="Treat the test set as sealed until the very final evaluation. During development, only look at validation scores or cross-validation scores. A useful practical rule: write down 'test set to be evaluated on [date]' and stick to it. If you have already peeked too many times, collect new data for a fresh test set."
        />

        <ErrorBlock
          error="Cross-validation score is much worse than holdout test score"
          cause="Your preprocessing (scaler, encoder) was fit outside the cross-validation loop — on the full training set. So when CV evaluates each fold, the scaler has already seen the validation fold's data. The holdout test (evaluated correctly after fitting on train only) shows the honest performance."
          fix="Always wrap preprocessing and model in a Pipeline before passing to cross_val_score. Pipeline ensures the scaler is refit from scratch inside each CV fold on the training portion only. Never fit a scaler before calling cross_val_score — always let the Pipeline handle it."
        />
      </div>

      <Div />

      {/* ══ SECTION 9 — WHAT'S NEXT ════════════════════════════════════════════ */}
      <div style={{ paddingBottom: 48, paddingTop: 8 }}>
        <span style={S.tag}>What comes next</span>
        <h2 style={S.h2}>
          Data is collected, cleaned, scaled, encoded, and split. You are ready to build models.
        </h2>

        <p style={S.p}>
          This completes Section 4 — Data Engineering for ML.
          You can now take any raw dataset, clean it, engineer features,
          encode categoricals, scale numerics, and split it correctly
          without leaking information. These five modules are the foundation
          every ML model you will ever build sits on.
        </p>

        <p style={S.p}>
          Section 5 — Classical Machine Learning — begins next.
          Module 21 answers the question you have been building toward:
          what actually is machine learning, and how does training work mechanically?
          Every algorithm in the section — linear regression, logistic regression,
          decision trees, random forests — builds on the data engineering foundation
          you have just completed.
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
              textTransform: 'uppercase' as const, color: '#378ADD',
              fontFamily: 'var(--font-mono)', marginBottom: 5,
            }}>
              Next — Module 21 · Classical ML
            </div>
            <div style={{
              fontSize: 15, fontWeight: 700, color: 'var(--text)',
              fontFamily: 'var(--font-display)', letterSpacing: '-0.3px',
            }}>
              What is Machine Learning?
            </div>
            <p style={{ ...S.ps, marginBottom: 0, marginTop: 4 }}>
              Not the Wikipedia definition. The actual idea — what training means
              mechanically, the 3 types of ML, the 7-step workflow, and 12 key
              terms defined once and for all.
            </p>
          </div>
          <a href="/learn/ai-ml/classical-ml/what-is-ml" style={{
            fontSize: 12, color: '#378ADD',
            border: '1px solid #378ADD50',
            padding: '7px 14px', borderRadius: 6,
            fontFamily: 'var(--font-mono)',
            textDecoration: 'none',
            background: '#378ADD10',
          }}>
            read →
          </a>
        </div>
      </div>

      <KeyTakeaways
        items={[
          'You need three splits — not two — because using the test set to make tuning decisions turns it into a second validation set. Over many experiments you silently overfit to it. The test set must be touched exactly once, at the very end, to get an honest performance estimate.',
          'Training set: the model fits on this. Validation set: you use the score to make tuning decisions — the model never trains on it. Test set: the final honest evaluation — touched once, never used for decisions.',
          'Always split before any preprocessing. Fitting a scaler, encoder, or imputer on the full dataset (before splitting) leaks test set statistics into training. Use sklearn Pipeline to make this structurally impossible.',
          'Use stratify=y for classification problems. Without stratification, a random split can put most of the minority class into one split — making evaluation unreliable and hyperparameter tuning misleading.',
          'For time-series data, random splits are fundamentally wrong. They put future data in the training set and past data in test — leaking information that would not exist at prediction time. Always use chronological splits: train on past, evaluate on future. Use TimeSeriesSplit for cross-validation.',
          'Split size depends on dataset size. Under 1,000 rows: use cross-validation, no holdout. 1k–10k: 80/20 with CV for tuning. 10k–100k: 70/15/15 three-way split. Over 100k: 80/10/10 is reliable.',
        ]}
      />
    </LearnLayout>
  )
}