import type { Metadata } from 'next'
import { LearnLayout } from '@/components/content/LearnLayout'
import { Callout } from '@/components/content/Callout'
import { KeyTakeaways } from '@/components/content/KeyTakeaways'
import MLPageHeader from '@/components/content/MLPageHeader'

export const metadata: Metadata = {
  title: 'Retraining Pipelines — Keeping Models Fresh — Chaduvuko',
  description:
    'Champion-challenger evaluation, safe model promotion, and rollback patterns that protect production when a new model underperforms after deployment.',
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

export default function RetrainingPipelinesPage() {
  return (
    <LearnLayout
      title="Retraining Pipelines — Keeping Models Fresh"
      description="Champion-challenger evaluation, safe model promotion, and rollback patterns that protect production when a new model underperforms after deployment."
      section="MLOps and Production"
      readTime="30–40 min"
      updatedAt="March 2026"
    >
      <MLPageHeader section="mlops" topic="retraining-pipelines" />

      {/* ══ SECTION 1 — PLAIN ENGLISH ══════════════════════════════════════════ */}
      <div style={S.sec}>
        <span style={S.tag}>Before any code — why retraining is not just training again</span>
        <h2 style={S.h2}>
          Training a new model is easy. Safely replacing the production model
          with the new one without breaking anything — that is the hard part
          most teams get wrong.
        </h2>

        <p style={S.p}>
          Module 72 explained when to retrain. This module explains how.
          The naive approach: train a new model, compare its offline metrics
          to the old model's offline metrics, deploy if better.
          This fails in practice for two reasons. Offline metrics measured
          on a held-out test set do not always predict online performance.
          A model with better MAE on the test set might perform worse
          on the real distribution of live traffic due to subtle differences
          in how the test set was constructed. The second problem: even if
          the new model is genuinely better, deploying it incorrectly —
          without a rollback plan, without gradual traffic shifting,
          without real-time comparison against the incumbent — exposes
          all production traffic to an unproven model simultaneously.
        </p>

        <p style={S.p}>
          The production-safe retraining pipeline has five stages:
          automated training, offline evaluation with quality gates,
          shadow deployment for real-traffic validation, champion-challenger
          A/B testing for live comparison, and gradual promotion with
          automated rollback if the challenger underperforms.
          Each stage is a checkpoint that a bad model cannot pass silently.
        </p>

        <AnalogyBox>
          <p style={{ ...S.p, marginBottom: 8 }}>
            A Formula 1 pit stop team replacing a tyre during a race.
            They do not stop the car entirely (that would lose the race).
            They do not just bolt the new tyre on without checking it first
            (that would crash the car). They have a rehearsed procedure:
            jack the car, change the tyre, check it is secure, lower the car,
            driver goes. If anything is wrong, they abort and diagnose.
            The whole process takes 2 seconds because every step is practiced
            and every failure mode is handled. Retraining pipelines are
            the same — a procedure so well-engineered that updating a model
            in production takes minutes with zero downtime.
          </p>
          <p style={{ ...S.ps, marginBottom: 0, color: '#00e676' }}>
            The champion model is the tyre that got the car this far.
            The challenger is the new tyre. You do not swap until you are
            certain the new tyre is at least as good. And you keep the old tyre
            nearby in case you need to switch back in a hurry.
          </p>
        </AnalogyBox>
      </div>

      <Div />

      {/* ══ SECTION 2 — PIPELINE ARCHITECTURE ═══════════════════════════════════ */}
      <div style={S.sec}>
        <span style={S.tag}>The five-stage pipeline</span>
        <h2 style={S.h2}>Automated train → offline eval → shadow → A/B → promote</h2>

        <VisualBox label="Safe retraining pipeline — five stages with gates">
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            {[
              {
                stage: '1. Automated Training',
                color: '#378ADD',
                gate: 'Training succeeds without error',
                action: 'Train on latest N days of data. Log to MLflow/W&B. Register as candidate.',
                failure: 'Pipeline error → alert team, keep current production model',
              },
              {
                stage: '2. Offline Quality Gate',
                color: '#7b61ff',
                gate: 'Challenger MAE ≤ 1.05 × champion MAE on held-out test set',
                action: 'Evaluate on a fixed held-out test set (never used for training). Compare to champion baseline.',
                failure: 'Fails gate → discard, keep current model, investigate data quality',
              },
              {
                stage: '3. Shadow Deployment',
                color: '#BA7517',
                gate: 'Challenger shadow MAE ≤ 1.10 × champion live MAE over 24 hrs',
                action: 'Route 100% of traffic to champion. ALSO send same requests to challenger (no user impact). Compare predictions.',
                failure: 'Challenger underperforms on live traffic → discard, investigate distribution shift',
              },
              {
                stage: '4. Champion-Challenger A/B',
                color: '#D85A30',
                gate: 'Challenger A/B MAE ≤ 0.98 × champion MAE with statistical significance',
                action: 'Send 10% of live traffic to challenger, 90% to champion. Compare real outcomes with labels.',
                failure: 'No improvement → keep champion, archive challenger',
              },
              {
                stage: '5. Gradual Promotion',
                color: '#1D9E75',
                gate: 'No p99 latency regression, no error rate increase',
                action: '10% → 25% → 50% → 100% traffic shift over 4 hours. Auto-rollback if metrics degrade.',
                failure: 'Metrics degrade → instant rollback to champion, alert team',
              },
            ].map((item, i) => (
              <div key={i}>
                <div style={{
                  background: 'var(--surface)', border: `1px solid ${item.color}25`,
                  borderRadius: 6, padding: '9px 12px',
                  borderLeft: `4px solid ${item.color}`,
                }}>
                  <div style={{ display: 'flex', gap: 10, alignItems: 'center', marginBottom: 6 }}>
                    <span style={{ fontSize: 12, fontWeight: 700, color: item.color }}>{item.stage}</span>
                    <span style={{ fontSize: 10, color: item.color, fontFamily: 'var(--font-mono)', background: `${item.color}15`, padding: '2px 7px', borderRadius: 3 }}>
                      Gate: {item.gate}
                    </span>
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
                    <div style={{ fontSize: 11, color: 'var(--muted)' }}>{item.action}</div>
                    <div style={{ fontSize: 11, color: '#ff4757' }}>⚠ Fail: {item.failure}</div>
                  </div>
                </div>
                {i < 4 && (
                  <div style={{ textAlign: 'center' as const, color: '#555', fontSize: 14, lineHeight: 1.2 }}>↓</div>
                )}
              </div>
            ))}
          </div>
        </VisualBox>
      </div>

      <Div />

      {/* ══ SECTION 3 — OFFLINE EVALUATION GATE ════════════════════════════════ */}
      <div style={S.sec}>
        <span style={S.tag}>Stage 2 in depth</span>
        <h2 style={S.h2}>Offline evaluation — the champion baseline and quality gate logic</h2>

        <CodeBlock code={`import numpy as np
import pandas as pd
from sklearn.ensemble import GradientBoostingRegressor
from sklearn.model_selection import train_test_split
from sklearn.metrics import mean_absolute_error, mean_squared_error, r2_score
import json, pickle, os
from dataclasses import dataclass
from datetime import datetime
from typing import Optional

np.random.seed(42)

# ── Champion baseline — stored at last promotion time ─────────────────
@dataclass
class ModelBaseline:
    """Stores the performance of the current production (champion) model."""
    model_version:   str
    promoted_at:     str
    test_mae:        float
    test_rmse:       float
    test_r2:         float
    feature_columns: list[str]
    training_cutoff: str
    n_training_rows: int

# ── Synthetic dataset ─────────────────────────────────────────────────
N = 6000
X = pd.DataFrame({
    'distance_km':    np.random.exponential(3.5, N),
    'is_peak_hour':   np.random.randint(0, 2, N).astype(float),
    'order_value':    np.random.exponential(400, N),
    'restaurant_avg': np.random.normal(35, 8, N),
    'driver_avg':     np.random.normal(32, 7, N),
})
y = (X['distance_km'] * 5.5 + X['is_peak_hour'] * 7 +
     X['restaurant_avg'] * 0.3 + np.random.normal(0, 5, N)).clip(10, 90)

# Fixed held-out test set — never used for training, never changes
# This is the standard against which every model is measured
X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.15, random_state=999,   # fixed seed — same split always
)
X_train, X_val, y_train, y_val = train_test_split(
    X_train, y_train, test_size=0.15, random_state=42,
)

# ── Train champion (simulate existing production model) ────────────────
champion = GradientBoostingRegressor(
    n_estimators=150, max_depth=4, learning_rate=0.08, random_state=42,
)
champion.fit(X_train, y_train)
champ_test_mae  = mean_absolute_error(y_test, champion.predict(X_test))
champ_test_rmse = mean_squared_error(y_test, champion.predict(X_test), squared=False)
champ_test_r2   = r2_score(y_test, champion.predict(X_test))

champion_baseline = ModelBaseline(
    model_version='v2.1.0',
    promoted_at=datetime.now().isoformat(),
    test_mae=champ_test_mae,
    test_rmse=champ_test_rmse,
    test_r2=champ_test_r2,
    feature_columns=list(X.columns),
    training_cutoff='2026-03-01',
    n_training_rows=len(X_train),
)

print(f"Champion baseline (v{champion_baseline.model_version}):")
print(f"  MAE:  {champion_baseline.test_mae:.4f}")
print(f"  RMSE: {champion_baseline.test_rmse:.4f}")
print(f"  R²:   {champion_baseline.test_r2:.4f}")

# ── Train challenger (new retraining run) ─────────────────────────────
# Simulated: challenger uses more recent data + slightly better params
X_train_new = pd.concat([X_train, X_val])   # more data available now
y_train_new = pd.concat([y_train, y_val])

challenger = GradientBoostingRegressor(
    n_estimators=200, max_depth=4, learning_rate=0.06, random_state=42,
)
challenger.fit(X_train_new, y_train_new)

# ── Offline quality gate ───────────────────────────────────────────────
def offline_quality_gate(
    challenger_model,
    champion_baseline: ModelBaseline,
    X_test: pd.DataFrame,
    y_test: pd.Series,
    mae_tolerance:  float = 0.05,   # challenger can be at most 5% worse than champion
    rmse_tolerance: float = 0.05,
    min_r2:         float = 0.80,
) -> dict:
    """
    Compare challenger to champion on the fixed held-out test set.
    Returns gate result with detailed breakdown.
    """
    ch_preds = challenger_model.predict(X_test)
    ch_mae   = mean_absolute_error(y_test, ch_preds)
    ch_rmse  = mean_squared_error(y_test, ch_preds, squared=False)
    ch_r2    = r2_score(y_test, ch_preds)

    # Gate conditions
    mae_ok   = ch_mae  <= champion_baseline.test_mae  * (1 + mae_tolerance)
    rmse_ok  = ch_rmse <= champion_baseline.test_rmse * (1 + rmse_tolerance)
    r2_ok    = ch_r2   >= min_r2
    # Additional: challenger should not be drastically better (sanity check — might indicate leakage)
    mae_not_suspicious = ch_mae >= champion_baseline.test_mae * 0.5

    passed = mae_ok and rmse_ok and r2_ok and mae_not_suspicious

    result = {
        'passed': passed,
        'challenger': {'mae': ch_mae, 'rmse': ch_rmse, 'r2': ch_r2},
        'champion':   {'mae': champion_baseline.test_mae,
                       'rmse': champion_baseline.test_rmse,
                       'r2': champion_baseline.test_r2},
        'gates': {
            'mae_within_tolerance':   {'passed': mae_ok,  'value': ch_mae,  'threshold': champion_baseline.test_mae * (1 + mae_tolerance)},
            'rmse_within_tolerance':  {'passed': rmse_ok, 'value': ch_rmse, 'threshold': champion_baseline.test_rmse * (1 + rmse_tolerance)},
            'r2_above_minimum':       {'passed': r2_ok,   'value': ch_r2,   'threshold': min_r2},
            'mae_not_suspicious':     {'passed': mae_not_suspicious, 'value': ch_mae, 'threshold': champion_baseline.test_mae * 0.5},
        },
        'improvement_pct': (champion_baseline.test_mae - ch_mae) / champion_baseline.test_mae * 100,
    }
    return result

gate_result = offline_quality_gate(
    challenger, champion_baseline, X_test, y_test,
)

print(f"\nOffline quality gate result: {'✓ PASSED' if gate_result['passed'] else '✗ FAILED'}")
print(f"  Challenger MAE: {gate_result['challenger']['mae']:.4f}")
print(f"  Champion MAE:   {gate_result['champion']['mae']:.4f}")
print(f"  Improvement:    {gate_result['improvement_pct']:+.2f}%")
print(f"\n  Gate breakdown:")
for gate, detail in gate_result['gates'].items():
    mark = '✓' if detail['passed'] else '✗'
    print(f"    {mark} {gate}: {detail['value']:.4f} (threshold: {detail['threshold']:.4f})")`} />
      </div>

      <Div />

      {/* ══ SECTION 4 — SHADOW DEPLOYMENT ════════════════════════════════════════ */}
      <div style={S.sec}>
        <span style={S.tag}>Stage 3 in depth</span>
        <h2 style={S.h2}>Shadow deployment — test on live traffic without user impact</h2>

        <p style={S.p}>
          Shadow deployment runs the challenger model on every real production
          request in parallel with the champion. Users receive the champion's
          prediction. The challenger's prediction is logged but never returned.
          After 24 hours you have the challenger's predictions on the actual
          live traffic distribution — not a held-out test set — and can compare
          both models' predictions when ground truth labels arrive.
          This catches distribution drift between the test set and live traffic
          that offline evaluation misses.
        </p>

        <CodeBlock code={`import asyncio
import time
import numpy as np
import pandas as pd
from dataclasses import dataclass, field
from collections import defaultdict
from sklearn.metrics import mean_absolute_error

# ── Shadow prediction logger ──────────────────────────────────────────
@dataclass
class ShadowLog:
    request_id:          str
    timestamp:           float
    features:            dict
    champion_prediction: float
    challenger_prediction: float
    actual:              float = None   # filled in when label arrives

class ShadowDeployment:
    """
    Routes every request to both champion and challenger.
    Returns champion prediction to caller.
    Logs both predictions for comparison.
    """
    def __init__(self, champion, challenger, feature_columns: list[str]):
        self.champion         = champion
        self.challenger       = challenger
        self.feature_columns  = feature_columns
        self.logs: list[ShadowLog] = []
        self.request_count    = 0

    def predict(self, features: dict, request_id: str = None) -> float:
        """
        Returns champion prediction. Logs challenger prediction silently.
        In production: challenger.predict() runs in a background thread.
        """
        import uuid
        request_id = request_id or str(uuid.uuid4())[:8]

        X = np.array([features.get(c, 0) for c in self.feature_columns]).reshape(1, -1)

        # Champion — this is what the user gets
        champ_pred = float(self.champion.predict(X)[0])

        # Challenger — silent, no user impact
        try:
            chal_pred = float(self.challenger.predict(X)[0])
        except Exception:
            chal_pred = None

        self.logs.append(ShadowLog(
            request_id=request_id,
            timestamp=time.time(),
            features=features,
            champion_prediction=champ_pred,
            challenger_prediction=chal_pred,
        ))
        self.request_count += 1
        return champ_pred   # ← only champion prediction returned to user

    def receive_label(self, request_id: str, actual: float):
        """Join actual label back to shadow log entry."""
        for log in self.logs:
            if log.request_id == request_id:
                log.actual = actual
                break

    def shadow_gate(self, mae_tolerance: float = 0.10) -> dict:
        """
        Compare challenger to champion on labelled shadow requests.
        Gate passes if challenger MAE <= champion MAE × (1 + tolerance).
        """
        labelled = [l for l in self.logs if l.actual is not None
                     and l.challenger_prediction is not None]

        if len(labelled) < 100:
            return {'passed': None, 'reason': f'Insufficient labelled data: {len(labelled)} < 100'}

        actuals    = np.array([l.actual for l in labelled])
        champ_preds = np.array([l.champion_prediction for l in labelled])
        chal_preds  = np.array([l.challenger_prediction for l in labelled])

        champ_mae = mean_absolute_error(actuals, champ_preds)
        chal_mae  = mean_absolute_error(actuals, chal_preds)
        threshold = champ_mae * (1 + mae_tolerance)
        passed    = chal_mae <= threshold

        # Prediction divergence — how different are the two models?
        divergence = np.abs(champ_preds - chal_preds).mean()

        return {
            'passed':        passed,
            'n_labelled':    len(labelled),
            'champion_mae':  round(champ_mae, 4),
            'challenger_mae': round(chal_mae, 4),
            'improvement_pct': round((champ_mae - chal_mae) / champ_mae * 100, 2),
            'prediction_divergence': round(divergence, 4),
            'threshold':     round(threshold, 4),
        }

# ── Simulate shadow deployment ─────────────────────────────────────────
shadow = ShadowDeployment(champion, challenger, list(X.columns))

# Simulate 500 live requests with slight distribution shift (monsoon)
np.random.seed(123)
n_requests = 500
for i in range(n_requests):
    features = {
        'distance_km':    float(np.random.exponential(5.2)),   # slightly shifted
        'is_peak_hour':   float(np.random.randint(0, 2)),
        'order_value':    float(np.random.exponential(420)),
        'restaurant_avg': float(np.random.normal(37, 9)),
        'driver_avg':     float(np.random.normal(33, 7)),
    }
    pred = shadow.predict(features, request_id=f'REQ{i:04d}')

    # Simulate labels arriving for 70% of requests
    if np.random.random() < 0.7:
        actual = (features['distance_km'] * 5.5 +
                   features['is_peak_hour'] * 7 +
                   features['restaurant_avg'] * 0.3 +
                   np.random.normal(0, 5))
        actual = float(np.clip(actual, 10, 90))
        shadow.receive_label(f'REQ{i:04d}', actual)

gate = shadow.shadow_gate(mae_tolerance=0.10)
print(f"Shadow deployment gate ({gate['n_labelled']} labelled requests):")
print(f"  Champion MAE:    {gate['champion_mae']}")
print(f"  Challenger MAE:  {gate['challenger_mae']}")
print(f"  Improvement:     {gate['improvement_pct']:+.2f}%")
print(f"  Divergence:      {gate['prediction_divergence']} min avg")
print(f"  Gate result:     {'✓ PASSED' if gate['passed'] else '✗ FAILED'}")`} />
      </div>

      <Div />

      {/* ══ SECTION 5 — CHAMPION-CHALLENGER A/B ══════════════════════════════════ */}
      <div style={S.sec}>
        <span style={S.tag}>Stage 4 in depth</span>
        <h2 style={S.h2}>Champion-challenger A/B — statistically rigorous live comparison</h2>

        <p style={S.p}>
          Shadow deployment shows how the challenger would have performed
          on past requests. A/B testing sends some users to the challenger
          in real time and measures the actual business impact.
          The challenger must beat the champion with statistical significance —
          not just look marginally better due to random chance.
          A Welch's t-test or Mann-Whitney U test determines whether the
          difference in prediction error is significant given the sample size.
        </p>

        <CodeBlock code={`import numpy as np
from scipy import stats
from dataclasses import dataclass, field
from collections import defaultdict
import hashlib

@dataclass
class ABExperiment:
    """
    Routes traffic between champion (control) and challenger (treatment).
    Uses consistent hashing on request_id so each user always goes
    to the same model — prevents a user seeing mixed predictions.
    """
    champion_model:   object
    challenger_model: object
    feature_columns:  list[str]
    challenger_pct:   float = 0.10   # 10% to challenger
    experiment_id:    str   = 'exp_001'

    champion_errors:   list = field(default_factory=list)
    challenger_errors: list = field(default_factory=list)
    champion_preds:    list = field(default_factory=list)
    challenger_preds:  list = field(default_factory=list)

    def _route(self, user_id: str) -> str:
        """
        Consistent hash routing — same user always goes to same model.
        Prevents seeing different estimates for the same order.
        """
        h     = int(hashlib.md5(f"{self.experiment_id}:{user_id}".encode()).hexdigest(), 16)
        bucket = (h % 100) / 100.0
        return 'challenger' if bucket < self.challenger_pct else 'champion'

    def predict(self, features: dict, user_id: str) -> dict:
        X     = np.array([features.get(c, 0) for c in self.feature_columns]).reshape(1, -1)
        group = self._route(user_id)

        if group == 'challenger':
            pred = float(self.challenger_model.predict(X)[0])
            self.challenger_preds.append(pred)
        else:
            pred = float(self.champion_model.predict(X)[0])
            self.champion_preds.append(pred)

        return {'prediction': pred, 'group': group, 'user_id': user_id}

    def record_outcome(self, user_id: str, actual: float):
        """Record actual outcome for a user — joins to their prediction."""
        group = self._route(user_id)
        # Find the most recent prediction for this user
        # In production: join via prediction_id stored in prediction log
        if group == 'challenger' and self.challenger_preds:
            # Simplified — in production join by prediction_id
            error = abs(self.challenger_preds[-1] - actual)
            self.challenger_errors.append(error)
        elif self.champion_preds:
            error = abs(self.champion_preds[-1] - actual)
            self.champion_errors.append(error)

    def analyse(self, min_samples: int = 200) -> dict:
        """
        Statistical analysis of A/B test results.
        Uses Welch's t-test (unequal variances, unequal sample sizes).
        """
        ce = np.array(self.champion_errors)
        he = np.array(self.challenger_errors)

        if len(ce) < min_samples or len(he) < min_samples:
            return {
                'status':  'insufficient_data',
                'champion_n':   len(ce),
                'challenger_n': len(he),
                'min_required': min_samples,
            }

        champ_mae = ce.mean()
        chal_mae  = he.mean()

        # Welch's t-test — does not assume equal variance
        t_stat, p_value = stats.ttest_ind(ce, he, equal_var=False)
        # One-sided: is challenger significantly BETTER (lower errors)?
        p_one_sided = p_value / 2 if t_stat > 0 else 1 - p_value / 2

        # Effect size (Cohen's d)
        pooled_std = np.sqrt((ce.std()**2 + he.std()**2) / 2)
        cohens_d   = (champ_mae - chal_mae) / (pooled_std + 1e-8)

        significant = p_one_sided < 0.05 and chal_mae < champ_mae

        return {
            'status':          'complete',
            'champion_mae':    round(champ_mae, 4),
            'challenger_mae':  round(chal_mae, 4),
            'improvement_pct': round((champ_mae - chal_mae) / champ_mae * 100, 2),
            'p_value':         round(p_one_sided, 4),
            'cohens_d':        round(cohens_d, 4),
            'significant':     significant,
            'champion_n':      len(ce),
            'challenger_n':    len(he),
            'promote':         significant and chal_mae < champ_mae * 0.99,
        }

# ── Simulate A/B experiment ───────────────────────────────────────────
ab = ABExperiment(
    champion_model=champion,
    challenger_model=challenger,
    feature_columns=list(X.columns),
    challenger_pct=0.10,
)

np.random.seed(456)
for i in range(3000):
    user_id  = f'USER{np.random.randint(0, 1000):04d}'
    features = {
        'distance_km':    float(np.random.exponential(3.5)),
        'is_peak_hour':   float(np.random.randint(0, 2)),
        'order_value':    float(np.random.exponential(400)),
        'restaurant_avg': float(np.random.normal(35, 8)),
        'driver_avg':     float(np.random.normal(32, 7)),
    }
    result = ab.predict(features, user_id)

    # 80% of requests get labels (delivery completed)
    if np.random.random() < 0.8:
        actual = float(np.clip(
            features['distance_km'] * 5.5 + features['is_peak_hour'] * 7
            + features['restaurant_avg'] * 0.3 + np.random.normal(0, 5), 10, 90,
        ))
        ab.record_outcome(user_id, actual)

analysis = ab.analyse(min_samples=100)
print("A/B test analysis:")
for k, v in analysis.items():
    if k == 'status': continue
    print(f"  {k:<22}: {v}")

decision = 'PROMOTE challenger' if analysis.get('promote') else 'KEEP champion'
print(f"\nDecision: {decision}")`} />
      </div>

      <Div />

      {/* ══ SECTION 6 — GRADUAL PROMOTION AND ROLLBACK ═══════════════════════════ */}
      <div style={S.sec}>
        <span style={S.tag}>Stage 5 in depth</span>
        <h2 style={S.h2}>Gradual promotion and automated rollback — the safety net</h2>

        <CodeBlock code={`import time
import numpy as np
from dataclasses import dataclass, field
from datetime import datetime
from typing import Callable

@dataclass
class TrafficSplit:
    champion_pct:  float   # 0.0 to 1.0
    challenger_pct: float  # 1 - champion_pct
    updated_at:    str = ''

    def __post_init__(self):
        assert abs(self.champion_pct + self.challenger_pct - 1.0) < 1e-6

class GradualPromotion:
    """
    Manages progressive traffic shifting from champion to challenger.
    Monitors real-time metrics and auto-rolls back on degradation.
    """
    PROMOTION_STEPS = [0.10, 0.25, 0.50, 1.00]   # challenger traffic fraction
    STEP_DURATION_S = 3600   # 1 hour per step in production (use seconds for demo)

    def __init__(self,
                  champion_model,
                  challenger_model,
                  feature_columns: list[str],
                  alert_fn: Callable = print):
        self.champion    = champion_model
        self.challenger  = challenger_model
        self.features    = feature_columns
        self.alert       = alert_fn
        self.split       = TrafficSplit(champion_pct=1.0, challenger_pct=0.0)
        self.step_idx    = -1
        self.errors      = {'champion': [], 'challenger': []}
        self.latencies   = {'champion': [], 'challenger': []}
        self.promoted    = False
        self.rolled_back = False
        self.history     = []

    def _serve(self, features: dict, use_challenger: bool) -> tuple[float, float]:
        X        = np.array([features.get(c, 0) for c in self.features]).reshape(1, -1)
        t_start  = time.time()
        model    = self.challenger if use_challenger else self.champion
        pred     = float(model.predict(X)[0])
        latency  = (time.time() - t_start) * 1000
        return pred, latency

    def predict(self, features: dict, user_id: str) -> dict:
        """Route request based on current traffic split."""
        import hashlib
        h            = int(hashlib.md5(user_id.encode()).hexdigest(), 16)
        use_challenger = (h % 100) / 100.0 < self.split.challenger_pct

        pred, latency = self._serve(features, use_challenger)
        group         = 'challenger' if use_challenger else 'champion'
        self.latencies[group].append(latency)
        return {'prediction': pred, 'group': group}

    def record_error(self, group: str, error: float):
        self.errors[group].append(error)

    def check_rollback_conditions(self) -> dict:
        """Check if challenger metrics have degraded enough to roll back."""
        ce  = self.errors.get('champion', [])
        he  = self.errors.get('challenger', [])
        cl  = self.latencies.get('champion', [])
        hl  = self.latencies.get('challenger', [])

        if len(he) < 50:
            return {'should_rollback': False, 'reason': 'insufficient_data'}

        champ_mae = np.mean(ce) if ce else 0
        chal_mae  = np.mean(he)

        # Rollback condition 1: MAE regression
        mae_regression = (chal_mae > champ_mae * 1.15) if ce else False

        # Rollback condition 2: p99 latency spike
        chal_p99  = np.percentile(hl, 99) if hl else 0
        champ_p99 = np.percentile(cl, 99) if cl else 0
        latency_regression = chal_p99 > champ_p99 * 1.5 and chal_p99 > 500

        should_rollback = mae_regression or latency_regression
        return {
            'should_rollback':    should_rollback,
            'mae_regression':     mae_regression,
            'latency_regression': latency_regression,
            'challenger_mae':     round(chal_mae, 3),
            'champion_mae':       round(champ_mae, 3) if ce else None,
            'challenger_p99_ms':  round(chal_p99, 1),
        }

    def advance_step(self) -> bool:
        """Move to the next traffic split step if conditions are met."""
        if self.promoted or self.rolled_back:
            return False

        rb = self.check_rollback_conditions()
        if rb['should_rollback']:
            self._rollback(rb)
            return False

        self.step_idx += 1
        if self.step_idx >= len(self.PROMOTION_STEPS):
            self._complete_promotion()
            return False

        new_chal = self.PROMOTION_STEPS[self.step_idx]
        self.split = TrafficSplit(
            champion_pct=1 - new_chal,
            challenger_pct=new_chal,
            updated_at=datetime.now().isoformat(),
        )
        self.history.append({'step': self.step_idx, 'split': new_chal,
                              'at': datetime.now().isoformat()})
        print(f"  → Step {self.step_idx+1}: {new_chal:.0%} challenger / "
              f"{1-new_chal:.0%} champion")
        return True

    def _rollback(self, reason: dict):
        self.split       = TrafficSplit(champion_pct=1.0, challenger_pct=0.0)
        self.rolled_back = True
        self.alert(f"[ROLLBACK] Auto-rollback triggered: {reason}")

    def _complete_promotion(self):
        self.split    = TrafficSplit(champion_pct=0.0, challenger_pct=1.0)
        self.promoted = True
        self.alert("[PROMOTION] Challenger fully promoted to production ✓")

# ── Simulate gradual promotion ─────────────────────────────────────────
promo = GradualPromotion(champion, challenger, list(X.columns))
np.random.seed(789)

print("Gradual promotion simulation:")
for step in range(5):
    advanced = promo.advance_step()
    if not advanced:
        break

    # Simulate 200 requests at this traffic level
    for _ in range(200):
        uid      = f'USER{np.random.randint(0, 500):03d}'
        features = {c: float(np.random.randn()) for c in X.columns}
        result   = promo.predict(features, uid)

        # Simulate actual delivery time arriving
        actual = 35.0 + np.random.normal(0, 8)
        error  = abs(result['prediction'] - actual)
        promo.record_error(result['group'], error)

    rb = promo.check_rollback_conditions()
    print(f"    Metrics: challenger_mae={rb['challenger_mae']} "
          f"p99={rb['challenger_p99_ms']}ms "
          f"rollback={rb['should_rollback']}")

print(f"\nFinal state: promoted={promo.promoted}  rolled_back={promo.rolled_back}")
print(f"Traffic: {promo.split.challenger_pct:.0%} challenger / "
      f"{promo.split.champion_pct:.0%} champion")`} />
      </div>

      <Div />

      {/* ══ SECTION 7 — ERRORS ═════════════════════════════════════════════════ */}
      <div style={S.sec}>
        <span style={S.tag}>Errors you will hit</span>
        <h2 style={S.h2}>Every common retraining pipeline mistake — explained and fixed</h2>

        <ErrorBlock
          error="New model passes offline gate but degrades in production — test set is stale"
          cause="The held-out test set was created from data collected months ago. Since then, the production data distribution has shifted (seasonality, new user segments, business changes). The test set no longer represents live traffic — a model that scores well on the old test set may perform poorly on current traffic patterns. This is the most common failure mode of offline-only evaluation."
          fix="Update the held-out test set monthly using recent production data. Use a time-based test split: test set = last 14 days of data, training set = 90 days before that — never shuffle across time. Add shadow deployment as stage 3 before any A/B test — it catches test-distribution mismatch by comparing on actual live traffic. Log the test set creation date and alert if it is older than 30 days."
        />

        <ErrorBlock
          error="Champion-challenger A/B shows no winner after two weeks — experiment never concludes"
          cause="The challenger traffic percentage is too low (1-2%) producing insufficient sample size for statistical significance. Or the improvement is genuinely tiny (0.5% MAE improvement) — requiring enormous sample sizes to detect. Or the experiment is running during a period of high variance (holiday season, special events) that inflates error variance and makes the signal-to-noise ratio unfavourable."
          fix="Use a power calculation before starting the A/B test: determine required sample size based on expected effect size, baseline variance, and desired statistical power (0.80). For a 5% improvement in MAE with typical delivery time variance, calculate the required samples. If the required sample size is impractical (months of traffic), question whether the improvement is worth deploying. Set a maximum experiment duration — if no significance after 4 weeks, keep the champion and archive the challenger."
        />

        <ErrorBlock
          error="Rollback leaves the system in an inconsistent state — some pods on new model, some on old"
          cause="The rollback script updated the Kubernetes Deployment image but it is a rolling update that takes 2-3 minutes. During those minutes some pods serve the old challenger model and some serve the restored champion. If traffic routing is at the load balancer level, requests may hit different model versions producing inconsistent predictions for the same user within seconds of each other."
          fix="Use Kubernetes blue-green deployment for model rollback, not rolling update. The champion Deployment is never deleted — only scaled down. On rollback, scale champion back to full replicas, then switch the Service selector back to champion pods. This is instant (< 1 second) and atomic — no traffic ever hits a mixed state. Keep the champion Deployment running at zero replicas during promotion so rollback is always instant."
        />

        <ErrorBlock
          error="Retraining uses future data — evaluation metrics look perfect but production accuracy is poor"
          cause="The retraining pipeline does not enforce a temporal split. When joining features to training events, it fetches the latest feature values from the feature store rather than the historical values as of the event timestamp. Training events from January use features computed from March data — data leakage. The model learns to exploit future information that is not available at inference time."
          fix="Always use point-in-time correct feature retrieval for training (covered in Module 69 — Feature Stores). For the test set: verify by checking that no feature in the training dataset has a timestamp later than the corresponding training event's timestamp. Add a canary test: train two models — one with correct temporal splits and one without. The leaky model will have suspiciously better offline metrics (MAE 30-50% lower). If offline metrics look too good, suspect leakage."
        />
      </div>

      <Div />

      {/* ══ SECTION 8 — WHAT'S NEXT ════════════════════════════════════════════ */}
      <div style={{ paddingBottom: 48, paddingTop: 8 }}>
        <span style={S.tag}>What comes next</span>
        <h2 style={S.h2}>
          Models retrain safely. Next: version your data like you version code.
        </h2>

        <p style={S.p}>
          Safe retraining requires knowing exactly which data produced each model.
          Module 74 covers DVC (Data Version Control) — tracking datasets as
          first-class artifacts alongside code, so every model has a reproducible
          lineage: this model was trained on this exact dataset, with this exact
          feature pipeline, at this exact code commit. Reproduce any past experiment
          in one command.
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
              Next — Module 74 · MLOps
            </div>
            <div style={{
              fontSize: 15, fontWeight: 700, color: 'var(--text)',
              fontFamily: 'var(--font-display)', letterSpacing: '-0.3px',
            }}>
              DVC — Data Version Control
            </div>
            <p style={{ ...S.ps, marginBottom: 0, marginTop: 4 }}>
              Version datasets like code. DVC pipelines, remote storage,
              experiment tracking, and the full DVC + Git workflow for ML projects.
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
          'Safe retraining is a five-stage pipeline with gates at each stage: automated training → offline quality gate → shadow deployment → champion-challenger A/B → gradual promotion with auto-rollback. A bad model cannot silently pass all five stages. Each stage catches a different failure mode that the previous stages miss.',
          'The offline quality gate compares challenger to champion on a fixed held-out test set using strict conditions: challenger MAE must be ≤ 105% of champion MAE, R² must be above minimum, and MAE must not be suspiciously low (which indicates data leakage). The test set must be updated monthly — stale test sets fail to catch distribution drift.',
          'Shadow deployment runs the challenger on 100% of live traffic in parallel with the champion. Users receive only the champion prediction. After 24 hours with ground truth labels, compare both models on actual live distribution. This catches test-distribution mismatch that offline evaluation misses — it is the most important gate before A/B testing.',
          'Champion-challenger A/B uses consistent hash routing on user_id so each user always goes to the same model — preventing mixed predictions for the same user. Require statistical significance (Welch t-test p < 0.05) and practical significance (improvement > 1%) before promoting. Set a maximum experiment duration — inconclusive experiments should favour the champion.',
          'Gradual promotion shifts traffic in steps: 10% → 25% → 50% → 100% over several hours. Monitor MAE and p99 latency at each step. Auto-rollback if challenger MAE exceeds champion MAE by 15% or p99 latency exceeds champion p99 by 50%. Use blue-green Deployment not rolling update for rollback — switching the Kubernetes Service selector is instant and atomic.',
          'Four critical gotchas: test set staleness (update monthly with recent data), temporal leakage in retraining (use point-in-time correct feature retrieval), A/B test never concluding (pre-calculate required sample size with power analysis), and rollback leaving mixed state (always use blue-green, never rolling update for production model swaps).',
        ]}
      />
    </LearnLayout>
  )
}