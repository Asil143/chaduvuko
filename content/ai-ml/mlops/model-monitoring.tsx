import type { Metadata } from 'next'
import { LearnLayout } from '@/components/content/LearnLayout'
import { Callout } from '@/components/content/Callout'
import { KeyTakeaways } from '@/components/content/KeyTakeaways'
import MLPageHeader from '@/components/content/MLPageHeader'

export const metadata: Metadata = {
  title: 'Model Monitoring — Drift Detection and Retraining — Chaduvuko',
  description:
    'How to know your model is degrading before users complain. Data drift, concept drift, Evidently AI, and automated retraining triggers.',
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

export default function ModelMonitoringPage() {
  return (
    <LearnLayout
      title="Model Monitoring — Drift Detection and Retraining"
      description="How to know your model is degrading before users complain. Data drift, concept drift, Evidently AI, and automated retraining triggers."
      section="MLOps and Production"
      readTime="36–46 min"
      updatedAt="March 2026"
    >
      <MLPageHeader section="mlops" topic="model-monitoring" />

      {/* ══ SECTION 1 — PLAIN ENGLISH ══════════════════════════════════════════ */}
      <div style={S.sec}>
        <span style={S.tag}>Before any code — why models degrade</span>
        <h2 style={S.h2}>
          A model trained in January works well in January.
          By June, the world has changed — new fraud patterns, different traffic,
          monsoon season — and the model is quietly producing wrong predictions
          that no one has noticed yet.
        </h2>

        <p style={S.p}>
          Every deployed model degrades over time. The question is not whether
          it will degrade but whether you will notice before your users do.
          Without monitoring, degradation is discovered via user complaints,
          dropped revenue, or a business review showing a metric that looked
          fine six months ago is now at half its original performance.
          With monitoring, you catch it in days, not months.
        </p>

        <p style={S.p}>
          Two types of drift cause degradation. Data drift: the input feature
          distribution has shifted. DoorDash trained on pre-monsoon delivery patterns.
          During monsoon, distance_km distributions shift (longer routes around
          flooded roads), is_peak_hour patterns shift (orders cluster differently),
          and the model receives inputs far from what it was trained on.
          Concept drift: the relationship between features and the target has changed.
          A fraud model trained before a new fraud scheme emerged correctly
          identifies old patterns but the new scheme looks like legitimate traffic
          to it. The input distribution may look the same but the correct
          output for those inputs has changed.
        </p>

        <AnalogyBox>
          <p style={{ ...S.p, marginBottom: 8 }}>
            A doctor trained in the 1990s using the medical knowledge of that era.
            Data drift: the patient population has changed — more diabetes,
            more sedentary lifestyle, new drug interactions. Concept drift:
            the same symptoms now indicate different conditions due to new pathogens.
            A good doctor keeps learning. A monitoring system is the mechanism
            that tells the doctor which patients they are getting wrong,
            so they know what to study next.
          </p>
          <p style={{ ...S.ps, marginBottom: 0, color: '#00e676' }}>
            Monitoring without ground truth labels is like checking a patient's
            vital signs without doing bloodwork. You can detect that something
            is wrong (features look unusual) but not what is wrong (model is wrong)
            without comparing predictions to actual outcomes.
            Both layers — leading indicators and lagging indicators — are needed.
          </p>
        </AnalogyBox>

        <Callout type="tip">
          Install: <span style={S.code as React.CSSProperties}>pip install evidently scipy numpy pandas scikit-learn</span>.
          Evidently is the most widely used open-source ML monitoring library
          in India — generates drift reports from reference and current data.
          All statistical tests in this module are also implemented from scratch
          so you understand what the library is doing.
        </Callout>
      </div>

      <Div />

      {/* ══ SECTION 2 — DRIFT TYPES ══════════════════════════════════════════════ */}
      <div style={S.sec}>
        <span style={S.tag}>What to monitor</span>
        <h2 style={S.h2}>Data drift, concept drift, and prediction drift — three failure modes</h2>

        <VisualBox label="Three drift types — what changes, how to detect, what to do">
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {[
              {
                type: 'Data Drift (Feature Drift)',
                color: '#D85A30',
                what: 'Input feature distributions shift. P(X) changes.',
                example: 'DoorDash: distance_km mean shifts from 3.2km to 5.8km during monsoon as drivers take longer routes.',
                detect: 'Statistical tests: KS test, PSI, chi-squared. Compare current feature distributions to training distributions.',
                action: 'Investigate cause. If the new distribution is permanent (business change), retrain. If temporary (holiday), wait.',
                ground_truth: 'Not required — can detect immediately from input features alone.',
              },
              {
                type: 'Concept Drift (Label Drift)',
                color: '#7b61ff',
                what: 'The relationship between features and target changes. P(Y|X) changes.',
                example: 'Stripe fraud model: new fraud scheme uses legitimate-looking merchant IDs — same features, different fraud probability.',
                detect: 'Requires ground truth labels with delay. Monitor accuracy, AUC, PSI on predictions vs actuals.',
                action: 'Retrain immediately with data from the new concept period. Add new fraud pattern to training set.',
                ground_truth: 'Required — typically available 1-14 days after prediction (delayed labels).',
              },
              {
                type: 'Prediction Drift',
                color: '#1D9E75',
                what: 'Model output distribution shifts. P(Ŷ) changes.',
                example: 'Delivery model suddenly predicts 60+ minutes for all orders — predictions cluster at edge of distribution.',
                detect: 'Monitor prediction mean, std, histogram. Compare to baseline prediction distribution from training evaluation.',
                action: 'Immediate investigation. Often caused by data drift or a pipeline bug upstream.',
                ground_truth: 'Not required — predictions are always available.',
              },
            ].map((item) => (
              <div key={item.type} style={{
                background: 'var(--surface)', border: `1px solid ${item.color}25`,
                borderRadius: 8, padding: '12px 14px',
                borderLeft: `4px solid ${item.color}`,
              }}>
                <div style={{ fontSize: 12, fontWeight: 700, color: item.color, fontFamily: 'var(--font-display)', marginBottom: 8 }}>
                  {item.type}
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
                  <div>
                    <p style={{ ...S.ps, marginBottom: 4, fontSize: 11 }}>{item.what}</p>
                    <div style={{ fontSize: 11, color: item.color, fontStyle: 'italic', marginBottom: 4 }}>
                      e.g. {item.example}
                    </div>
                    <div style={{ fontSize: 11, color: 'var(--muted)' }}>
                      <strong style={{ color: item.color }}>Ground truth needed:</strong> {item.ground_truth}
                    </div>
                  </div>
                  <div>
                    <div style={{ fontSize: 11, color: '#1D9E75', marginBottom: 4 }}>
                      <strong>Detect:</strong> {item.detect}
                    </div>
                    <div style={{ fontSize: 11, color: item.color }}>
                      <strong>Action:</strong> {item.action}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </VisualBox>
      </div>

      <Div />

      {/* ══ SECTION 3 — STATISTICAL TESTS ════════════════════════════════════════ */}
      <div style={S.sec}>
        <span style={S.tag}>The math behind drift detection</span>
        <h2 style={S.h2}>KS test, PSI, and chi-squared — detecting distribution shift statistically</h2>

        <p style={S.p}>
          Drift detection requires comparing two distributions: the reference
          distribution (features seen during training) and the current distribution
          (features seen this week). Three statistical tests are standard.
          The Kolmogorov-Smirnov test measures the maximum difference between
          two empirical CDFs — works for continuous features, no binning required.
          Population Stability Index (PSI) measures how much a distribution
          has shifted — widely used in credit risk and fraud at Indian banks.
          Chi-squared test compares observed vs expected frequencies — works
          for categorical features.
        </p>

        <ConceptBox title="PSI — Population Stability Index — the credit risk standard">
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: 12, lineHeight: 2.2 }}>
            <div style={{ color: '#7b61ff', marginBottom: 4 }}>
              PSI = Σ (actual% − expected%) × ln(actual% / expected%)
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 4, fontSize: 12, color: 'var(--muted)', marginTop: 8 }}>
              <div>actual%   = proportion of current data in each bin</div>
              <div>expected% = proportion of reference (training) data in each bin</div>
              <div style={{ color: '#1D9E75', marginTop: 4 }}>PSI {'<'} 0.10  →  no drift (safe)</div>
              <div style={{ color: '#BA7517' }}>PSI 0.10-0.20  →  minor drift (investigate)</div>
              <div style={{ color: '#ff4757' }}>PSI {'>'} 0.20  →  significant drift (retrain)</div>
            </div>
          </div>
        </ConceptBox>

        <CodeBlock code={`import numpy as np
import pandas as pd
from scipy import stats

np.random.seed(42)

# ── Simulate training reference data (January) ────────────────────────
N_REF = 10000
ref_distance  = np.random.exponential(3.2, N_REF)                 # avg 3.2 km
ref_order_val = np.random.exponential(400, N_REF)                  # avg Rs 400
ref_peak_hour = np.random.binomial(1, 0.35, N_REF)                # 35% peak
ref_category  = np.random.choice(['bike', 'cycle', 'walk'], N_REF,
                                   p=[0.6, 0.3, 0.1])

# ── Simulate current production data (June — monsoon) ─────────────────
N_CUR = 2000
cur_distance  = np.random.exponential(5.8, N_CUR)   # DRIFTED: avg 5.8 km
cur_order_val = np.random.exponential(410, N_CUR)   # stable
cur_peak_hour = np.random.binomial(1, 0.33, N_CUR)  # stable
cur_category  = np.random.choice(['bike', 'cycle', 'walk'], N_CUR,
                                   p=[0.45, 0.40, 0.15])  # DRIFTED: fewer bikes

# ── KS Test — for continuous features ────────────────────────────────
def ks_drift_test(reference: np.ndarray, current: np.ndarray,
                   alpha: float = 0.05) -> dict:
    """
    Kolmogorov-Smirnov test for distribution shift.
    Returns statistic, p-value, and whether drift was detected.
    """
    stat, p_value = stats.ks_2samp(reference, current)
    drifted = p_value < alpha
    return {
        'test':      'KS',
        'statistic': round(stat, 4),
        'p_value':   round(p_value, 6),
        'drifted':   drifted,
        'severity':  'high' if stat > 0.2 else 'medium' if stat > 0.1 else 'low',
    }

# ── PSI — Population Stability Index ─────────────────────────────────
def psi(reference: np.ndarray, current: np.ndarray,
         n_bins: int = 10) -> dict:
    """
    PSI for continuous features.
    Bins reference data, computes proportions, measures shift.
    """
    # Bin using reference data quantiles
    breakpoints = np.percentile(reference, np.linspace(0, 100, n_bins + 1))
    breakpoints[0]  -= 1e-8   # ensure all values included
    breakpoints[-1] += 1e-8

    ref_counts = np.histogram(reference, bins=breakpoints)[0]
    cur_counts = np.histogram(current,   bins=breakpoints)[0]

    ref_pct = ref_counts / len(reference)
    cur_pct = cur_counts / len(current)

    # Avoid log(0)
    ref_pct = np.where(ref_pct == 0, 1e-8, ref_pct)
    cur_pct = np.where(cur_pct == 0, 1e-8, cur_pct)

    psi_val = np.sum((cur_pct - ref_pct) * np.log(cur_pct / ref_pct))
    severity = 'high' if psi_val > 0.2 else 'medium' if psi_val > 0.1 else 'low'

    return {
        'test':      'PSI',
        'psi':       round(psi_val, 4),
        'drifted':   psi_val > 0.1,
        'severity':  severity,
        'threshold': '0.10 minor / 0.20 significant',
    }

# ── Chi-squared test — for categorical features ───────────────────────
def chi2_drift_test(reference: np.ndarray, current: np.ndarray) -> dict:
    """Chi-squared test for categorical feature drift."""
    categories  = np.unique(np.concatenate([reference, current]))
    ref_counts  = np.array([np.sum(reference == c) for c in categories])
    cur_counts  = np.array([np.sum(current == c)   for c in categories])

    # Scale reference to same size as current
    expected = ref_counts * len(current) / len(reference)
    stat, p_value = stats.chisquare(cur_counts, f_exp=expected)

    return {
        'test':      'Chi-squared',
        'statistic': round(stat, 4),
        'p_value':   round(p_value, 6),
        'drifted':   p_value < 0.05,
        'severity':  'high' if stat > 50 else 'medium' if stat > 10 else 'low',
    }

# ── Run all tests ─────────────────────────────────────────────────────
features = {
    'distance_km':  (ref_distance,  cur_distance,  'continuous'),
    'order_value':  (ref_order_val, cur_order_val, 'continuous'),
    'is_peak_hour': (ref_peak_hour, cur_peak_hour, 'continuous'),
    'vehicle_type': (ref_category,  cur_category,  'categorical'),
}

print(f"{'Feature':<18} {'Test':<12} {'Stat':>8} {'p-value':>10} {'Drifted':>8} {'Severity'}")
print("─" * 65)
for feat, (ref, cur, ftype) in features.items():
    if ftype == 'categorical':
        result = chi2_drift_test(ref, cur)
        stat   = f"{result['statistic']:.4f}"
        pval   = f"{result['p_value']:.6f}"
    else:
        ks   = ks_drift_test(ref, cur)
        psi_ = psi(ref, cur)
        result = ks   # primary test
        stat   = f"{ks['statistic']:.4f} / PSI={psi_['psi']:.3f}"
        pval   = f"{ks['p_value']:.6f}"

    mark = '⚠ YES' if result['drifted'] else '  no'
    print(f"  {feat:<18} {result['test']:<12} {stat:>8} {pval:>10} "
          f"{mark:>8}  {result['severity']}")`} />
      </div>

      <Div />

      {/* ══ SECTION 4 — EVIDENTLY AI ═════════════════════════════════════════════ */}
      <div style={S.sec}>
        <span style={S.tag}>Production monitoring tool</span>
        <h2 style={S.h2}>Evidently AI — automated drift reports and monitoring dashboards</h2>

        <p style={S.p}>
          Evidently generates HTML drift reports comparing a reference dataset
          (training data) to a current dataset (recent production data).
          It runs all relevant statistical tests automatically per feature type,
          generates visual distributions, and produces a JSON summary
          that can be parsed to trigger retraining alerts.
          It is the standard open-source monitoring tool used at Indian startups.
        </p>

        <CodeBlock code={`# pip install evidently

import pandas as pd
import numpy as np
from evidently.report import Report
from evidently.metric_preset import DataDriftPreset, DataQualityPreset
from evidently.metrics import (
    DataDriftTable,
    ColumnDriftMetric,
    ColumnSummaryMetric,
)

np.random.seed(42)

# ── Build reference and current datasets ──────────────────────────────
N_REF = 5000
N_CUR = 1000

reference_data = pd.DataFrame({
    'distance_km':    np.random.exponential(3.2, N_REF),
    'order_value':    np.random.exponential(400, N_REF),
    'is_peak_hour':   np.random.binomial(1, 0.35, N_REF).astype(float),
    'restaurant_avg': np.random.normal(35, 8, N_REF),
    'driver_avg':     np.random.normal(32, 7, N_REF),
    'prediction':     np.random.normal(35, 10, N_REF).clip(10, 90),
})

# Monsoon period — distance has drifted, others stable
current_data = pd.DataFrame({
    'distance_km':    np.random.exponential(5.8, N_CUR),  # drifted
    'order_value':    np.random.exponential(415, N_CUR),  # stable
    'is_peak_hour':   np.random.binomial(1, 0.33, N_CUR).astype(float),
    'restaurant_avg': np.random.normal(38, 9, N_CUR),     # slight shift
    'driver_avg':     np.random.normal(32, 7, N_CUR),
    'prediction':     np.random.normal(42, 12, N_CUR).clip(10, 90),  # drifted
})

# ── Generate drift report ─────────────────────────────────────────────
report = Report(metrics=[
    DataDriftPreset(drift_share_threshold=0.3),   # alert if >30% features drifted
    DataQualityPreset(),
    ColumnDriftMetric(column_name='distance_km'),
    ColumnDriftMetric(column_name='prediction'),
    ColumnSummaryMetric(column_name='prediction'),
])

report.run(reference_data=reference_data, current_data=current_data)

# Save HTML report (human-readable dashboard)
report.save_html('/tmp/drift_report.html')

# Get JSON results for programmatic parsing
result_dict = report.as_dict()

# ── Parse drift results ────────────────────────────────────────────────
def parse_evidently_results(result: dict) -> dict:
    """Extract key metrics from Evidently report for alerting."""
    metrics = result.get('metrics', [])
    summary = {'drifted_features': [], 'stable_features': [], 'share_drifted': 0}

    for m in metrics:
        if m.get('metric') == 'DatasetDriftMetric':
            summary['share_drifted'] = m['result'].get('share_of_drifted_columns', 0)
            summary['dataset_drifted'] = m['result'].get('dataset_drift', False)

        if m.get('metric') == 'ColumnDriftMetric':
            col    = m['result'].get('column_name', '')
            drifted = m['result'].get('drift_detected', False)
            if drifted:
                summary['drifted_features'].append(col)
            else:
                summary['stable_features'].append(col)

    return summary

summary = parse_evidently_results(result_dict)
print("Evidently drift report summary:")
print(f"  Dataset drifted:    {summary.get('dataset_drifted', 'unknown')}")
print(f"  Share drifted:      {summary.get('share_drifted', 0):.1%}")
print(f"  Drifted features:   {summary['drifted_features']}")
print(f"  Stable features:    {summary['stable_features']}")
print(f"\nFull HTML report saved to /tmp/drift_report.html")

# ── Scheduled monitoring job ──────────────────────────────────────────
def daily_monitoring_job(
    model_name: str,
    reference_df: pd.DataFrame,
    current_df: pd.DataFrame,
    alert_threshold: float = 0.3,
    send_alert=None,
) -> dict:
    """
    Run daily drift monitoring.
    Call from Airflow DAG at 6 AM every day.
    """
    report = Report(metrics=[DataDriftPreset()])
    report.run(reference_data=reference_df, current_data=current_df)
    summary = parse_evidently_results(report.as_dict())

    share_drifted = summary.get('share_drifted', 0)
    needs_alert   = share_drifted > alert_threshold

    if needs_alert and send_alert:
        send_alert(
            subject=f'[DRIFT ALERT] {model_name}: {share_drifted:.0%} features drifted',
            body=(
                f"Model: {model_name}\n"
                f"Drifted features: {summary['drifted_features']}\n"
                f"Action required: investigate data pipeline and consider retraining"
            ),
        )
    return {
        'model':          model_name,
        'share_drifted':  share_drifted,
        'alert_sent':     needs_alert,
        'drifted':        summary['drifted_features'],
    }

result = daily_monitoring_job(
    'swiggy-delivery-time',
    reference_data, current_data,
)
print(f"\nDaily monitoring result: {result}")`} />
      </div>

      <Div />

      {/* ══ SECTION 5 — PERFORMANCE MONITORING ══════════════════════════════════ */}
      <div style={S.sec}>
        <span style={S.tag}>When you have ground truth labels</span>
        <h2 style={S.h2}>Performance monitoring — track actual model accuracy over time</h2>

        <p style={S.p}>
          Drift monitoring detects input distribution shifts without labels —
          it is a leading indicator. Performance monitoring requires ground
          truth labels and is the lagging indicator.
          For delivery time prediction: the actual delivery time is available
          30-60 minutes after prediction. For fraud detection: chargebacks
          confirm fraud 7-30 days after the transaction.
          The monitoring system joins predictions with delayed labels
          and tracks accuracy metrics over rolling windows.
        </p>

        <CodeBlock code={`import numpy as np
import pandas as pd
from datetime import datetime, timedelta
from dataclasses import dataclass, field
from collections import deque

# ── Prediction store — log every prediction for later joining ─────────
@dataclass
class PredictionLog:
    prediction_id:  str
    timestamp:      datetime
    features:       dict
    prediction:     float
    actual:         float = None       # filled in later when label arrives
    label_received: bool  = False

class PredictionStore:
    """
    In production: backed by a database (Postgres/BigQuery).
    Stores predictions and joins with delayed ground truth labels.
    """
    def __init__(self):
        self.predictions: dict[str, PredictionLog] = {}

    def log_prediction(self, prediction_id: str,
                        features: dict, prediction: float) -> None:
        self.predictions[prediction_id] = PredictionLog(
            prediction_id=prediction_id,
            timestamp=datetime.now(),
            features=features,
            prediction=prediction,
        )

    def receive_label(self, prediction_id: str, actual: float) -> None:
        """Called when ground truth arrives (e.g. actual delivery time)."""
        if prediction_id in self.predictions:
            self.predictions[prediction_id].actual         = actual
            self.predictions[prediction_id].label_received = True

    def get_labelled_window(self, hours: int = 24) -> pd.DataFrame:
        """Get all predictions with labels from the last N hours."""
        cutoff = datetime.now() - timedelta(hours=hours)
        rows   = [
            {
                'prediction_id': p.prediction_id,
                'timestamp':     p.timestamp,
                'prediction':    p.prediction,
                'actual':        p.actual,
                **p.features,
            }
            for p in self.predictions.values()
            if p.label_received and p.timestamp > cutoff
        ]
        return pd.DataFrame(rows) if rows else pd.DataFrame()

# ── Performance metrics over rolling windows ─────────────────────────
def compute_performance_metrics(df: pd.DataFrame,
                                  prediction_col: str = 'prediction',
                                  actual_col:     str = 'actual') -> dict:
    if df.empty or actual_col not in df.columns:
        return {}

    errors   = df[prediction_col] - df[actual_col]
    abs_err  = errors.abs()

    return {
        'n_predictions': len(df),
        'mae':           round(abs_err.mean(), 3),
        'rmse':          round(np.sqrt((errors**2).mean()), 3),
        'mape':          round((abs_err / df[actual_col].clip(1)).mean() * 100, 2),
        'within_5min':   round((abs_err <= 5).mean() * 100, 1),   # % within 5 min
        'within_10min':  round((abs_err <= 10).mean() * 100, 1),
        'mean_prediction': round(df[prediction_col].mean(), 2),
        'mean_actual':     round(df[actual_col].mean(), 2),
        'bias':            round(errors.mean(), 3),  # positive = over-estimating
    }

# ── Simulate a week of predictions and labels ─────────────────────────
store = PredictionStore()
np.random.seed(42)

# Week 1 (Jan): good model performance
for i in range(500):
    pid     = f'PRED_{i:04d}'
    actual  = float(np.random.normal(35, 10))
    pred    = actual + np.random.normal(0, 5)   # small error
    store.log_prediction(pid, {'distance_km': 3.5}, pred)
    store.receive_label(pid, actual)

# Week 2 (June monsoon): model starts drifting
for i in range(500, 1000):
    pid    = f'PRED_{i:04d}'
    actual = float(np.random.normal(48, 12))    # longer actual times (monsoon)
    pred   = float(np.random.normal(35, 10))    # model still predicts Jan times
    store.log_prediction(pid, {'distance_km': 5.8}, pred)
    store.receive_label(pid, actual)

# Compute metrics for each week
jan_df   = pd.DataFrame([
    {'prediction': store.predictions[f'PRED_{i:04d}'].prediction,
     'actual':     store.predictions[f'PRED_{i:04d}'].actual}
    for i in range(500)
])
june_df  = pd.DataFrame([
    {'prediction': store.predictions[f'PRED_{i:04d}'].prediction,
     'actual':     store.predictions[f'PRED_{i:04d}'].actual}
    for i in range(500, 1000)
])

jan_metrics  = compute_performance_metrics(jan_df)
june_metrics = compute_performance_metrics(june_df)

print("Performance degradation over time:")
print(f"  {'Metric':<20} {'January':>10} {'June':>10} {'Change':>10}")
print("  " + "─" * 52)
for metric in ['mae', 'rmse', 'mape', 'within_5min', 'bias']:
    jan_v  = jan_metrics.get(metric, 0)
    june_v = june_metrics.get(metric, 0)
    delta  = june_v - jan_v
    flag   = ' ⚠' if abs(delta) > jan_v * 0.3 else ''
    print(f"  {metric:<20} {jan_v:>10.2f} {june_v:>10.2f} "
          f"{delta:>+10.2f}{flag}")`} />
      </div>

      <Div />

      {/* ══ SECTION 6 — AUTOMATED RETRAINING TRIGGERS ═══════════════════════════ */}
      <div style={S.sec}>
        <span style={S.tag}>Closing the loop</span>
        <h2 style={S.h2}>Automated retraining — trigger, retrain, evaluate, promote</h2>

        <p style={S.p}>
          Manual retraining — a data scientist noticing a metric, running a notebook,
          and deploying — does not scale to dozens of models.
          Automated retraining monitors metrics and triggers the training pipeline
          (Module 69) when thresholds are breached.
          The trigger calls the Airflow DAG or Prefect flow with a flag
          indicating emergency retraining. The pipeline runs, evaluates the new model,
          and either promotes it automatically (if above a quality threshold)
          or sends a human alert for review.
        </p>

        <CodeBlock code={`import numpy as np
from dataclasses import dataclass
from typing import Callable
from datetime import datetime

# ── Retraining trigger conditions ─────────────────────────────────────
@dataclass
class RetriggerCondition:
    name:        str
    check_fn:    Callable[..., bool]
    priority:    str   # 'critical', 'high', 'medium'
    description: str

def check_performance_drop(current_mae: float,
                             baseline_mae: float,
                             threshold_pct: float = 20.0) -> bool:
    """Trigger if MAE increased by more than threshold_pct%."""
    if baseline_mae == 0:
        return False
    pct_change = (current_mae - baseline_mae) / baseline_mae * 100
    return pct_change > threshold_pct

def check_drift_threshold(share_drifted: float,
                            threshold: float = 0.30) -> bool:
    """Trigger if more than threshold fraction of features have drifted."""
    return share_drifted > threshold

def check_prediction_distribution(current_mean: float,
                                    baseline_mean: float,
                                    current_std: float,
                                    baseline_std: float) -> bool:
    """Trigger if prediction distribution has shifted significantly."""
    mean_shift = abs(current_mean - baseline_mean) / (baseline_std + 1e-8)
    std_ratio  = max(current_std, baseline_std) / (min(current_std, baseline_std) + 1e-8)
    return mean_shift > 2.0 or std_ratio > 2.0

def check_sample_size(n_new_samples: int, min_samples: int = 5000) -> bool:
    """Trigger on schedule when enough new data has accumulated."""
    return n_new_samples >= min_samples

# ── Retraining orchestrator ────────────────────────────────────────────
class RetrainingOrchestrator:
    """
    Checks all trigger conditions and fires the training pipeline
    when any critical or combination of high-priority triggers fire.
    """

    def __init__(self, training_pipeline_fn: Callable,
                  alert_fn: Callable = None):
        self.training_pipeline = training_pipeline_fn
        self.alert             = alert_fn or print
        self.last_retrain      = None
        self.min_retrain_interval_hours = 24   # at most once per day

    def evaluate_triggers(self, monitoring_data: dict) -> list[dict]:
        """
        Evaluate all trigger conditions.
        Returns list of fired triggers with priority.
        """
        fired = []

        # Performance degradation (requires labels)
        if 'current_mae' in monitoring_data and 'baseline_mae' in monitoring_data:
            if check_performance_drop(
                monitoring_data['current_mae'],
                monitoring_data['baseline_mae'],
                threshold_pct=25.0,
            ):
                fired.append({
                    'trigger':  'performance_drop',
                    'priority': 'critical',
                    'details':  f"MAE {monitoring_data['baseline_mae']:.2f} → {monitoring_data['current_mae']:.2f}",
                })

        # Feature drift
        if 'share_drifted' in monitoring_data:
            if check_drift_threshold(monitoring_data['share_drifted'], 0.4):
                fired.append({
                    'trigger':  'feature_drift',
                    'priority': 'high',
                    'details':  f"{monitoring_data['share_drifted']:.0%} of features drifted",
                })

        # Prediction distribution shift
        if all(k in monitoring_data for k in
               ['pred_mean', 'baseline_pred_mean', 'pred_std', 'baseline_pred_std']):
            if check_prediction_distribution(
                monitoring_data['pred_mean'],
                monitoring_data['baseline_pred_mean'],
                monitoring_data['pred_std'],
                monitoring_data['baseline_pred_std'],
            ):
                fired.append({
                    'trigger':  'prediction_shift',
                    'priority': 'high',
                    'details':  f"Prediction mean {monitoring_data['baseline_pred_mean']:.1f} → {monitoring_data['pred_mean']:.1f}",
                })

        # Scheduled data accumulation trigger
        if monitoring_data.get('n_new_samples', 0) >= 10000:
            fired.append({
                'trigger':  'scheduled_data_volume',
                'priority': 'medium',
                'details':  f"{monitoring_data['n_new_samples']:,} new samples available",
            })

        return fired

    def should_retrain(self, fired_triggers: list[dict]) -> bool:
        """Decide whether to retrain based on fired triggers."""
        if not fired_triggers:
            return False

        # Retrain on any critical trigger
        has_critical = any(t['priority'] == 'critical' for t in fired_triggers)
        if has_critical:
            return True

        # Retrain if 2+ high-priority triggers
        high_count = sum(1 for t in fired_triggers if t['priority'] == 'high')
        if high_count >= 2:
            return True

        return False

    def run(self, monitoring_data: dict) -> dict:
        fired   = self.evaluate_triggers(monitoring_data)
        retrain = self.should_retrain(fired)

        if retrain:
            # Check cooldown
            if self.last_retrain:
                hours_since = (datetime.now() - self.last_retrain).seconds / 3600
                if hours_since < self.min_retrain_interval_hours:
                    return {'action': 'cooldown', 'triggers': fired,
                             'hours_until_eligible': self.min_retrain_interval_hours - hours_since}

            self.alert(f"[RETRAIN] Triggering retraining: {[t['trigger'] for t in fired]}")
            result = self.training_pipeline(triggered_by=fired)
            self.last_retrain = datetime.now()
            return {'action': 'retrained', 'triggers': fired, 'result': result}

        if fired:
            self.alert(f"[MONITOR] Triggers fired but not retraining yet: {fired}")
            return {'action': 'monitored', 'triggers': fired}

        return {'action': 'no_action', 'triggers': []}

# ── Simulate monitoring cycle ─────────────────────────────────────────
def mock_training_pipeline(triggered_by=None):
    print(f"    → Training pipeline started. Triggers: {[t['trigger'] for t in triggered_by or []]}")
    return {'status': 'success', 'new_model_mae': 6.2}

orchestrator = RetrainingOrchestrator(mock_training_pipeline)

test_scenarios = [
    {
        'name': 'January (stable)',
        'data': {'current_mae': 5.8, 'baseline_mae': 5.5, 'share_drifted': 0.1,
                  'pred_mean': 35.2, 'baseline_pred_mean': 35.0,
                  'pred_std': 10.1, 'baseline_pred_std': 10.0, 'n_new_samples': 2000},
    },
    {
        'name': 'June monsoon (performance drop + drift)',
        'data': {'current_mae': 9.8, 'baseline_mae': 5.5, 'share_drifted': 0.5,
                  'pred_mean': 42.0, 'baseline_pred_mean': 35.0,
                  'pred_std': 12.0, 'baseline_pred_std': 10.0, 'n_new_samples': 3000},
    },
    {
        'name': 'Scheduled (enough new data)',
        'data': {'current_mae': 5.9, 'baseline_mae': 5.5, 'share_drifted': 0.15,
                  'pred_mean': 35.5, 'baseline_pred_mean': 35.0,
                  'pred_std': 10.2, 'baseline_pred_std': 10.0, 'n_new_samples': 12000},
    },
]

print("Retraining orchestrator simulation:")
for scenario in test_scenarios:
    result = orchestrator.run(scenario['data'])
    print(f"\n  Scenario: {scenario['name']}")
    print(f"  Action:   {result['action']}")
    print(f"  Triggers: {[t['trigger'] for t in result.get('triggers', [])]}")`} />
      </div>

      <Div />

      {/* ══ SECTION 7 — ERRORS ═════════════════════════════════════════════════ */}
      <div style={S.sec}>
        <span style={S.tag}>Errors you will hit</span>
        <h2 style={S.h2}>Every common monitoring mistake — explained and fixed</h2>

        <ErrorBlock
          error="Drift alerts fire constantly — alert fatigue causes the team to ignore them"
          cause="Statistical drift tests are sensitive to sample size. With a large current dataset (50,000 predictions), even tiny distribution differences that are practically irrelevant produce statistically significant p-values. A KS test with n=50,000 will detect that the mean shifted by 0.01 as statistically significant drift — but a shift of 0.01 in distance_km is completely irrelevant to model performance. The team gets 20 alerts per week and stops reading them."
          fix="Use effect size thresholds not just p-values. For KS test: require statistic > 0.1 (10% of the distribution has shifted) not just p < 0.05. For PSI: the threshold is already effect-size-based (PSI > 0.2). Implement alert deduplication: if the same feature was drifted yesterday, do not re-alert today unless drift has worsened. Route alerts by severity: critical (performance drop > 30%) → page on-call, high (>40% features drifted) → Slack channel, medium → weekly digest email."
        />

        <ErrorBlock
          error="Monitoring shows no drift but model performance has clearly degraded"
          cause="Concept drift with no data drift. The input features look the same as training time but the correct prediction for those inputs has changed — new fraud patterns, seasonality, a business rule change. Since only input features are monitored and labels are not yet available, monitoring reports everything as healthy while the model silently fails. This is the hardest drift to detect without labels."
          fix="Add proxy metrics that do not require labels: prediction confidence distribution (if a classification model, monitor the distribution of predicted probabilities — sudden increase in low-confidence predictions indicates the model is uncertain), business metrics (monitor conversion rate, complaint rate, escalation rate — downstream effects of wrong predictions often appear before labels arrive). Set up a label sampling programme: manually label 1% of predictions within 24 hours to get early signal on concept drift before delayed labels arrive at scale."
        />

        <ErrorBlock
          error="Retraining trigger fires daily — model never stabilises in production"
          cause="The drift threshold is too sensitive relative to normal production variance. Every day brings small random fluctuations in feature distributions that cross the threshold. Each retraining produces a slightly different model (due to different training data), which changes the baseline, which causes the next day's monitoring to fire again. The pipeline runs daily without ever reaching a stable state."
          fix="Add a minimum retraining interval (24-48 hours). Use a rolling window for drift detection: compare the last 7 days of production data to training data, not a single day — smooths out daily noise. Require drift to persist for 3 consecutive days before triggering retraining. After retraining, update the reference dataset to the new training data so the new model's performance is the new baseline — not the old model's baseline."
        />

        <ErrorBlock
          error="Ground truth labels never arrive — cannot do performance monitoring"
          cause="For some tasks, the true outcome is never observed or arrives very late. E.g.: loan default monitoring (12-month delay), rare event prediction (very few positives to measure accuracy), or ranking models where the counterfactual (what would have happened with a different ranking) is unknowable. In these cases, only input/prediction monitoring is possible and concept drift is invisible."
          fix="Use proxy labels when true labels are unavailable: for loan models, use 30-day delinquency as a proxy for 12-month default. For ranking, use click-through rate as a proxy for user satisfaction. For fraud, use chargeback rate (available in 7-30 days) as a proxy for real-time fraud rate. Implement shadow deployment: run old and new model simultaneously, compare their prediction distributions — significant divergence indicates concept drift even without labels."
        />
      </div>

      <Div />

      {/* ══ SECTION 8 — WHAT'S NEXT ════════════════════════════════════════════ */}
      <div style={{ paddingBottom: 48, paddingTop: 8 }}>
        <span style={S.tag}>What comes next</span>
        <h2 style={S.h2}>
          Your model is monitored. Next: version your data
          like you version your code.
        </h2>

        <p style={S.p}>
          Monitoring tells you when to retrain. But when you retrain,
          you need to know exactly what data produced each model —
          so you can reproduce results, audit decisions, and debug regressions.
          Module 73 covers retraining pipelines with champion-challenger evaluation,
          safe model promotion, and the rollback patterns that protect production
          when a new model unexpectedly underperforms after deployment.
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
              Next — Module 73 · MLOps
            </div>
            <div style={{
              fontSize: 15, fontWeight: 700, color: 'var(--text)',
              fontFamily: 'var(--font-display)', letterSpacing: '-0.3px',
            }}>
              Retraining Pipelines — Keeping Models Fresh
            </div>
            <p style={{ ...S.ps, marginBottom: 0, marginTop: 4 }}>
              Champion-challenger evaluation, safe model promotion,
              and rollback patterns that protect production.
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
          'Two types of drift cause model degradation. Data drift: input feature distributions shift (P(X) changes) — detectable immediately without labels using statistical tests. Concept drift: the relationship between features and target changes (P(Y|X) changes) — requires ground truth labels and is invisible until labels arrive. Both need separate monitoring strategies.',
          'Three statistical tests cover all feature types: KS test for continuous features (compares empirical CDFs, p-value + statistic threshold), PSI for continuous features (industry standard in Indian finance: PSI < 0.10 safe, 0.10-0.20 investigate, > 0.20 retrain), chi-squared for categorical features (compares observed vs expected frequencies).',
          'Evidently AI automates drift reporting: run Report(metrics=[DataDriftPreset()]) with reference and current DataFrames. It selects the right test per feature type, generates HTML dashboards, and produces JSON results for programmatic alerting. Schedule as an Airflow task daily, parse JSON results to trigger retraining.',
          'Performance monitoring requires delayed ground truth labels. Log every prediction with a prediction_id. When labels arrive (actual delivery time, fraud confirmation), join them back to predictions. Compute rolling metrics (MAE, within-N-minutes rate, bias) over daily/weekly windows. A 25%+ MAE increase is a critical retraining trigger.',
          'Automated retraining trigger hierarchy: critical (performance drop > 25% → retrain immediately), high (> 40% features drifted or prediction distribution shifted 2σ+ → retrain if 2+ high triggers), medium (> 10,000 new samples accumulated → scheduled retrain). Add 24-hour cooldown to prevent retrain loops.',
          'Alert fatigue is the primary failure mode of monitoring systems. Use effect size thresholds not just p-values — require KS statistic > 0.10, not just p < 0.05. Require drift to persist 3 consecutive days before triggering. Route by severity: critical = page on-call, high = Slack, medium = weekly digest. A monitoring system that fires 20 false alarms per week is worse than no monitoring.',
        ]}
      />
    </LearnLayout>
  )
}