import type { Metadata } from 'next'
import { Fragment } from 'react'
import { LearnLayout } from '@/components/content/LearnLayout'
import { Callout } from '@/components/content/Callout'
import { KeyTakeaways } from '@/components/content/KeyTakeaways'
import MLPageHeader from '@/components/content/MLPageHeader'

export const metadata: Metadata = {
  title: 'ML Interview Prep — 50 Complete Answers — Chaduvuko',
  description:
    'The 50 most-asked ML engineering questions across Swiggy, Razorpay, Flipkart, CRED, and Indian tech — with complete, ready-to-deliver answers for every level.',
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
  p: { fontSize: 15, color: 'var(--muted)', lineHeight: 1.9, marginBottom: 16 },
  ps: { fontSize: 13, color: 'var(--muted)', lineHeight: 1.8, marginBottom: 10 },
  sec: { paddingBottom: 56, paddingTop: 8, borderBottom: '1px solid var(--border)' },
  code: {
    fontFamily: 'var(--font-mono)', fontSize: 12,
    background: 'var(--bg2)', border: '1px solid var(--border)',
    borderRadius: 4, padding: '1px 6px', color: 'var(--accent)',
  },
}

function Div() { return <div style={{ height: 48 }} /> }

function QBlock({
  num, question, plain, technical, example, code, color = '#7b61ff',
}: {
  num: number
  question: string
  plain: string
  technical: React.ReactNode
  example?: string
  code?: string
  color?: string
}) {
  return (
    <div style={{
      marginBottom: 40,
      borderBottom: '1px solid var(--border)',
      paddingBottom: 36,
    }}>
      {/* Question header */}
      <div style={{
        display: 'flex', gap: 14, alignItems: 'flex-start', marginBottom: 18,
      }}>
        <div style={{
          minWidth: 38, height: 38, borderRadius: 8,
          background: `${color}15`, border: `1px solid ${color}40`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontFamily: 'var(--font-mono)', fontSize: 13, fontWeight: 700,
          color, flexShrink: 0,
        }}>
          {num}
        </div>
        <h3 style={{
          fontFamily: 'var(--font-display)', fontSize: 'clamp(15px,2vw,18px)',
          fontWeight: 800, letterSpacing: '-0.4px', color: 'var(--text)',
          lineHeight: 1.3, margin: 0, paddingTop: 6,
        }}>
          {question}
        </h3>
      </div>

      {/* Plain English */}
      <div style={{
        background: 'rgba(0,230,118,0.04)',
        border: '1px solid rgba(0,230,118,0.18)',
        borderRadius: 7, padding: '12px 16px', marginBottom: 14,
      }}>
        <div style={{
          fontSize: 10, fontWeight: 700, color: '#00e676',
          fontFamily: 'var(--font-mono)', letterSpacing: '0.08em',
          textTransform: 'uppercase' as const, marginBottom: 7,
        }}>
          Plain English — say this to anyone
        </div>
        <p style={{ ...S.ps, marginBottom: 0, fontSize: 14, lineHeight: 1.85 }}>{plain}</p>
      </div>

      {/* Technical answer */}
      <div style={{
        background: 'var(--surface)',
        border: `1px solid ${color}20`,
        borderLeft: `3px solid ${color}`,
        borderRadius: 7, padding: '14px 16px', marginBottom: code || example ? 14 : 0,
      }}>
        <div style={{
          fontSize: 10, fontWeight: 700, color,
          fontFamily: 'var(--font-mono)', letterSpacing: '0.08em',
          textTransform: 'uppercase' as const, marginBottom: 9,
        }}>
          Technical depth — say this to the interviewer
        </div>
        {typeof technical === 'string'
          ? <p style={{ ...S.ps, marginBottom: 0, lineHeight: 1.85 }}>{technical}</p>
          : technical}
      </div>

      {/* Code block */}
      {code && (
        <div style={{
          background: 'var(--bg2)', border: '1px solid var(--border)',
          borderRadius: 8, overflow: 'hidden', marginBottom: example ? 14 : 0,
        }}>
          <div style={{
            padding: '7px 14px', background: 'var(--surface)',
            borderBottom: '1px solid var(--border)',
            fontSize: 10, fontWeight: 700, color: 'var(--muted)',
            fontFamily: 'var(--font-mono)', letterSpacing: '0.07em',
            textTransform: 'uppercase' as const,
          }}>
            code
          </div>
          <pre style={{
            padding: '16px 18px', margin: 0, overflowX: 'auto',
            fontFamily: 'var(--font-mono)', fontSize: 12,
            lineHeight: 1.75, color: 'var(--text)',
          }}>
            <code>{code}</code>
          </pre>
        </div>
      )}

      {/* Indian company example */}
      {example && (
        <div style={{
          background: 'rgba(55,138,221,0.05)',
          border: '1px solid rgba(55,138,221,0.2)',
          borderRadius: 7, padding: '11px 14px',
        }}>
          <div style={{
            fontSize: 10, fontWeight: 700, color: '#378ADD',
            fontFamily: 'var(--font-mono)', letterSpacing: '0.08em',
            textTransform: 'uppercase' as const, marginBottom: 6,
          }}>
            🇮🇳 Real example — India
          </div>
          <p style={{ ...S.ps, marginBottom: 0, fontSize: 12 }}>{example}</p>
        </div>
      )}
    </div>
  )
}

function SectionHeader({ letter, title, count, color }: {
  letter: string; title: string; count: string; color: string
}) {
  return (
    <div style={{
      display: 'flex', alignItems: 'center', gap: 14,
      padding: '14px 18px', marginBottom: 32, marginTop: 8,
      background: `${color}08`, border: `1px solid ${color}25`,
      borderRadius: 10,
    }}>
      <div style={{
        width: 44, height: 44, borderRadius: 10,
        background: `${color}20`, border: `1px solid ${color}40`,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontFamily: 'var(--font-mono)', fontSize: 18, fontWeight: 900,
        color, flexShrink: 0,
      }}>
        {letter}
      </div>
      <div>
        <div style={{ fontSize: 14, fontWeight: 800, color, fontFamily: 'var(--font-display)', letterSpacing: '-0.3px' }}>
          {title}
        </div>
        <div style={{ fontSize: 11, color: 'var(--muted)', fontFamily: 'var(--font-mono)' }}>
          {count}
        </div>
      </div>
    </div>
  )
}

export default function MLInterviewPrepPage() {
  return (
    <LearnLayout
      title="ML Interview Prep — 50 Complete Answers"
      description="The 50 most-asked ML engineering questions across Swiggy, Razorpay, Flipkart, CRED, and Indian tech — with complete, ready-to-deliver answers for every level."
      section="Cloud ML Platforms"
      readTime="120–180 min"
      updatedAt="March 2026"
    >
      <MLPageHeader section="cloud-ml" topic="ml-interview-prep" />

      {/* ══ INTRO ══════════════════════════════════════════════════════════════ */}
      <div style={S.sec}>
        <span style={S.tag}>How to use this module</span>
        <h2 style={S.h2}>
          50 questions. Two answers for each — one for non-technical interviewers,
          one for technical ones. Practise both. The real interview always
          has both in the room.
        </h2>
        <p style={S.p}>
          Every answer in this module follows the same structure. The green
          "Plain English" box is what you say when a product manager, engineering
          manager, or non-ML interviewer asks the question — no jargon,
          pure intuition. The blue "Technical depth" box is what you say
          when a senior ML engineer or data scientist asks — precise, rigorous,
          with the right terminology. In a real panel interview both types
          of interviewers are present. You need both answers.
        </p>
        <p style={S.p}>
          The questions are drawn from interview reports at Swiggy, Razorpay,
          Flipkart, Meesho, CRED, PhonePe, Zepto, Urban Company, and FAANG
          India offices collected between 2024 and 2026. They are ordered
          from foundational to advanced — read sequentially or jump to any
          section using the category headers.
        </p>

        <Callout type="tip">
          Preparation strategy: read all 50 questions first without looking at
          answers — write down your own answer in one sentence. Then compare
          to the answers here. The gap between what you wrote and what is here
          is exactly what you need to study. Repeat the weak ones until
          you can answer without reading.
        </Callout>
      </div>

      <Div />

      {/* ══════════════════════════════════════════════════════════════════════ */}
      {/* SECTION A — FOUNDATIONS */}
      {/* ══════════════════════════════════════════════════════════════════════ */}
      <SectionHeader
        letter="A"
        title="Foundations — Q1 to Q8"
        count="What ML is, overfitting, bias-variance, cross-validation, missing data, features, class imbalance"
        color="#1D9E75"
      />

      <QBlock
        num={1}
        color="#1D9E75"
        question="What is machine learning? How is it different from traditional programming?"
        plain="Traditional programming is writing rules by hand: if amount > 10000 and new device, flag as suspicious. Machine learning is showing the computer thousands of examples of fraud and legitimate transactions, and letting it figure out the rules itself. The computer writes its own rules from examples — and it often discovers patterns a human would never think to write."
        technical={<>
          <p style={{ ...S.ps, marginBottom: 8 }}>Traditional programming maps inputs to outputs via human-defined rules: f(x) = hardcoded logic. Machine learning learns f(x) from data by optimising a loss function over labelled examples. Three core types: supervised learning (labelled input-output pairs), unsupervised learning (find structure in unlabelled data), and reinforcement learning (learn from rewards and penalties through interaction).</p>
          <p style={{ ...S.ps, marginBottom: 0 }}>The key shift: ML is appropriate when the rules are too complex to specify manually (image recognition, language understanding), when rules change over time (fraud patterns evolve), or when personalisation at scale is required (recommendations that differ for every user).</p>
        </>}
        example="Razorpay cannot write rules for every fraud pattern — there are thousands of variants and new ones emerge weekly. They train a GradientBoosting model on 10M labelled transactions and it discovers fraud signals (amount round numbers, new device + international location + high value) that no analyst explicitly programmed."
      />

      <QBlock
        num={2}
        color="#1D9E75"
        question="What is the difference between supervised, unsupervised, and reinforcement learning?"
        plain="Supervised learning is learning with a teacher who tells you the right answer. Unsupervised learning is finding patterns without a teacher — like sorting a pile of clothes without being told what categories to create. Reinforcement learning is learning by trial and error — like a child learning to walk by trying, falling, and adjusting."
        technical={<>
          <p style={{ ...S.ps, marginBottom: 8 }}>Supervised learning: given labelled pairs (X, y), learn a function f(X) → y that minimises prediction error. Subtypes: regression (continuous y) and classification (discrete y). Examples: delivery time prediction, fraud classification.</p>
          <p style={{ ...S.ps, marginBottom: 8 }}>Unsupervised learning: given X without labels, find structure — clusters (k-means, DBSCAN), density estimates (GMMs), low-dimensional representations (PCA, autoencoders), association rules. Examples: customer segmentation, anomaly detection without labels.</p>
          <p style={{ ...S.ps, marginBottom: 0 }}>Reinforcement learning: an agent interacts with an environment, takes actions, receives scalar rewards, and learns a policy π(state) → action that maximises cumulative reward. Examples: ad bidding optimisation, recommendation ranking, game playing. Requires a simulator or real-time feedback loop — not used for one-shot predictions.</p>
        </>}
        example="Swiggy uses supervised learning for delivery time prediction (label = actual delivery time). They use unsupervised learning for restaurant clustering (group similar restaurants for operational insights without predefined categories). They use RL for dynamic pricing — the agent learns which surge price maximises both revenue and order completion rate through millions of interactions."
      />

      <QBlock
        num={3}
        color="#1D9E75"
        question="What is overfitting? How do you detect it and fix it?"
        plain="Overfitting is when your model memorises the training data instead of learning the underlying pattern. Imagine studying for an exam by memorising every practice question word-for-word — you get 100% on practice but fail the actual exam because the real questions are phrased differently. An overfit model aces training data but fails on new data it has never seen."
        technical={<>
          <p style={{ ...S.ps, marginBottom: 8 }}>Overfitting occurs when model capacity exceeds what the data complexity justifies — the model fits noise rather than signal. Detected by comparing training loss to validation loss: if training loss is low but validation loss is significantly higher, the model is overfitting.</p>
          <p style={{ ...S.ps, marginBottom: 8 }}>Fixes by category:</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 4, paddingLeft: 12 }}>
            {[
              ['More data', 'The most reliable fix — more examples give the model less chance to memorise'],
              ['Regularisation', 'L1/L2 penalties shrink weights. Dropout randomly deactivates neurons during training'],
              ['Reduce model complexity', 'Fewer layers, lower max_depth in trees, fewer features'],
              ['Early stopping', 'Stop training when validation loss starts increasing'],
              ['Cross-validation', 'Use k-fold to get an unbiased estimate of generalisation error'],
              ['Data augmentation', 'Artificially expand the training set (image flips, text paraphrasing)'],
            ].map(([name, desc]) => (
              <div key={name} style={{ fontSize: 12, color: 'var(--muted)' }}>
                <strong style={{ color: '#1D9E75' }}>{name}:</strong> {desc}
              </div>
            ))}
          </div>
        </>}
        code={`import numpy as np
from sklearn.ensemble import GradientBoostingRegressor
from sklearn.model_selection import train_test_split
from sklearn.metrics import mean_absolute_error

# Detect overfitting: large gap between train and val MAE
X_train, X_val = train_test_split(X, test_size=0.2, random_state=42)

# Overfit model: too many estimators, too deep
overfit = GradientBoostingRegressor(n_estimators=1000, max_depth=10)
overfit.fit(X_train, y_train)
print(f"Overfit  — train MAE: {mae(y_train, overfit.predict(X_train)):.2f}")  # e.g. 0.5
print(f"Overfit  — val MAE:   {mae(y_val,   overfit.predict(X_val)):.2f}")    # e.g. 9.2 ← gap

# Regularised model: shrink depth, add subsample
good = GradientBoostingRegressor(n_estimators=200, max_depth=4,
                                   subsample=0.8, min_samples_leaf=10)
good.fit(X_train, y_train)
print(f"Regularised — train MAE: {mae(y_train, good.predict(X_train)):.2f}")  # e.g. 5.1
print(f"Regularised — val MAE:   {mae(y_val,   good.predict(X_val)):.2f}")    # e.g. 5.8 ← small gap`}
        example="A Flipkart return prediction model showed 98% accuracy on training data and 61% on the test set — a clear overfit. The model had memorised the order IDs (which happened to correlate with return rate in training data but are meaningless features). Fix: removed order_id as a feature and added min_samples_leaf=50 to prevent the tree from fitting individual orders."
      />

      <QBlock
        num={4}
        color="#1D9E75"
        question="What is the bias-variance tradeoff?"
        plain="Bias is being consistently wrong in the same direction — like a scale that always reads 2kg too heavy regardless of what you put on it. Variance is being inconsistently wrong — like a scale that sometimes reads 5kg too heavy and sometimes 3kg too light. A good model has low bias (correct on average) and low variance (consistent). You cannot minimise both simultaneously — making a model more flexible reduces bias but increases variance."
        technical={<>
          <p style={{ ...S.ps, marginBottom: 8 }}>Total expected error = Bias² + Variance + Irreducible Noise. Bias is the error from incorrect assumptions about the data-generating process — a linear model has high bias on non-linear data regardless of how much data you have. Variance is the error from sensitivity to fluctuations in the training set — a high-variance model changes dramatically when trained on different samples.</p>
          <p style={{ ...S.ps, marginBottom: 8 }}>Tradeoff: increasing model complexity (more layers, deeper trees, lower regularisation) decreases bias but increases variance. Decreasing complexity has the opposite effect. The optimal point is where total error is minimised — this is what cross-validation finds.</p>
          <p style={{ ...S.ps, marginBottom: 0 }}>Practical heuristics: high training error + high validation error → high bias (underfitting) → more complexity or better features. Low training error + high validation error → high variance (overfitting) → regularise, reduce complexity, more data.</p>
        </>}
        example="HDFC's credit risk model initially used a simple logistic regression (low variance, high bias — missed non-linear income patterns). Replacing with GradientBoosting reduced bias (captured non-linearities) but required careful regularisation via min_child_weight and subsample to control variance, since credit data is noisy and the model was sensitive to which months were in the training window."
      />

      <QBlock
        num={5}
        color="#1D9E75"
        question="What is cross-validation and why do you use it instead of a single train-test split?"
        plain="Imagine you have 1,000 exam practice questions and you want to know how prepared you are. Using a single test set is like using the last 200 questions as your test — your score depends on which 200 you happened to pick. Cross-validation uses every question as both a practice question and a test question by rotating through the data multiple times, giving you a much more reliable estimate of your true readiness."
        technical={<>
          <p style={{ ...S.ps, marginBottom: 8 }}>K-fold cross-validation splits the data into k equal folds. In each of k iterations, one fold is the validation set and the remaining k-1 folds are the training set. The model is trained and evaluated k times. The final metric is the mean (±std) across all k validation scores. This gives an unbiased estimate of generalisation error that is robust to the specific split chosen.</p>
          <p style={{ ...S.ps, marginBottom: 0 }}>When to use each: single holdout is sufficient for very large datasets (&gt;1M rows) where variance from split choice is negligible. K-fold (k=5 or 10) is preferred for small-medium datasets where a single split might accidentally put all hard examples in training or validation. Stratified k-fold maintains class proportions across folds — essential for imbalanced classification. Time-series data: must use TimeSeriesSplit to avoid data leakage — future data must never appear in training folds.</p>
        </>}
        code={`from sklearn.model_selection import (
    cross_val_score, StratifiedKFold, TimeSeriesSplit
)
from sklearn.ensemble import GradientBoostingClassifier
import numpy as np

# Standard k-fold
cv_scores = cross_val_score(model, X, y, cv=5, scoring='roc_auc')
print(f"CV AUC: {cv_scores.mean():.4f} ± {cv_scores.std():.4f}")

# Stratified k-fold — preserves class ratio in each fold
skf = StratifiedKFold(n_splits=5, shuffle=True, random_state=42)
scores = cross_val_score(model, X, y, cv=skf, scoring='f1')

# Time-series split — no future leakage
tscv = TimeSeriesSplit(n_splits=5)
# Each split: train on past, validate on future — never the reverse`}
        example="Meesho's product category classifier trained on 500k products used 5-fold stratified CV because some rare categories had fewer than 1,000 examples — a random split might have put all of a rare category in training and none in validation. With stratified CV, every fold contains examples from every category and the evaluation is reliable."
      />

      <QBlock
        num={6}
        color="#1D9E75"
        question="How do you handle missing data? Walk through your decision process."
        plain="Missing data is like a form where some people left certain fields blank. There are three strategies: ignore those people (delete rows), fill in a reasonable guess (imputation), or let the model handle blanks natively. Which you choose depends on why the data is missing and how much is missing."
        technical={<>
          <p style={{ ...S.ps, marginBottom: 8 }}>First, understand why data is missing: MCAR (Missing Completely At Random — missingness unrelated to the data, e.g. sensor failure), MAR (Missing At Random — missingness depends on other observed variables), MNAR (Missing Not At Random — missingness depends on the missing value itself, e.g. high-income people more likely to skip income field). MNAR is the most dangerous — simple imputation introduces bias.</p>
          <p style={{ ...S.ps, marginBottom: 8 }}>Decision process by missingness rate:</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 4, paddingLeft: 12 }}>
            {[
              ['< 5% missing', 'Mean/median/mode imputation is safe. Add a binary flag: driver_avg_is_imputed=1'],
              ['5–30% missing', 'Model-based imputation (KNN imputer or iterative imputer). Or use missingness as a feature'],
              ['> 30% missing', 'The feature is likely unreliable — drop it or treat missingness itself as the signal'],
              ['MNAR pattern', 'Create explicit missing indicator. Missingness often predicts the target (e.g. missing salary → low earner)'],
            ].map(([rate, action]) => (
              <div key={rate} style={{ fontSize: 12, color: 'var(--muted)', marginBottom: 3 }}>
                <strong style={{ color: '#1D9E75' }}>{rate}:</strong> {action}
              </div>
            ))}
          </div>
          <p style={{ ...S.ps, marginBottom: 0, marginTop: 8 }}>Always impute at inference time using the same statistics computed from training data — never recompute from the current batch. LightGBM and XGBoost handle missing values natively by learning the best direction to send missing values at each split — often outperforming manual imputation.</p>
        </>}
        code={`import pandas as pd
import numpy as np
from sklearn.impute import SimpleImputer, KNNImputer

# 1. Analyse missingness pattern
print(df.isnull().mean().sort_values(ascending=False))

# 2. Simple imputation for MCAR features
simple = SimpleImputer(strategy='median')   # or 'mean', 'most_frequent'
X_imputed = simple.fit_transform(X_train)
# Save imputer — use same fitted imputer at inference time
import pickle
with open('imputer.pkl', 'wb') as f:
    pickle.dump(simple, f)

# 3. Add missingness indicator (captures MNAR signal)
df['restaurant_avg_missing'] = df['restaurant_avg'].isnull().astype(int)
df['restaurant_avg'].fillna(df['restaurant_avg'].median(), inplace=True)

# 4. LightGBM handles missing values natively — no imputation needed
import lightgbm as lgb
model = lgb.LGBMRegressor()
# Missing values (NaN) are automatically routed to the best child at each split`}
        example="Swiggy's driver feature 'avg_speed_last_30min' is missing for new drivers with fewer than 5 completed orders. Rather than imputing with the city average (MNAR — new drivers are genuinely different), Swiggy adds a binary flag new_driver=1 and uses the city median as imputation. The model learns that new_driver=1 predicts higher variance in delivery time, which is the actual signal."
      />

      <QBlock
        num={7}
        color="#1D9E75"
        question="What is feature engineering? Give a concrete real-world example."
        plain="Raw data is like raw ingredients — you cannot serve them directly. Feature engineering is the cooking: transforming raw measurements into a form the model can learn from effectively. It requires domain knowledge — understanding what actually drives the outcome — combined with data intuition."
        technical={<>
          <p style={{ ...S.ps, marginBottom: 8 }}>Feature engineering transforms raw attributes into representations that expose the underlying signal to the model. Six main techniques:</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 5, paddingLeft: 12 }}>
            {[
              ['Aggregations', 'Rolling statistics over a window: user_7d_spend, restaurant_30d_avg_rating'],
              ['Interaction features', 'Multiply or combine: amount_per_km = order_value / distance_km'],
              ['Temporal decomposition', 'Extract hour, day_of_week, is_holiday, days_since_last_order from timestamps'],
              ['Binning', 'Convert continuous to categorical buckets: distance_bin = [0-2, 2-5, 5+] km'],
              ['Encoding', 'Target encode high-cardinality categoricals: city_avg_delivery_time_encoded'],
              ['Ratio features', 'Normalise by expected: actual_time / historical_avg_time for that route'],
            ].map(([name, desc]) => (
              <div key={name} style={{ fontSize: 12, color: 'var(--muted)', marginBottom: 3 }}>
                <strong style={{ color: '#1D9E75' }}>{name}:</strong> {desc}
              </div>
            ))}
          </div>
          <p style={{ ...S.ps, marginBottom: 0, marginTop: 8 }}>The most impactful features are usually domain-driven, not algorithmic — they encode business knowledge about what actually causes the outcome. Tree-based models (GradientBoosting, LightGBM) need less explicit feature engineering than linear models because they can approximate interaction effects automatically. But good features still improve tree models significantly.</p>
        </>}
        code={`import pandas as pd
import numpy as np

def engineer_delivery_features(df: pd.DataFrame) -> pd.DataFrame:
    df = df.copy()

    # Temporal features
    df['order_hour']    = pd.to_datetime(df['created_at']).dt.hour
    df['is_peak_hour']  = df['order_hour'].isin([12,13,19,20,21]).astype(int)
    df['day_of_week']   = pd.to_datetime(df['created_at']).dt.dayofweek
    df['is_weekend']    = (df['day_of_week'] >= 5).astype(int)

    # Ratio / interaction features
    df['value_per_km']  = df['order_value'] / (df['distance_km'] + 0.1)
    df['time_ratio']    = df['actual_time'] / (df['distance_km'] * 5.5 + 15)

    # Rolling aggregates (computed in feature pipeline, not at serving time)
    df['restaurant_7d_avg_time'] = (df.groupby('restaurant_id')['actual_time']
                                     .transform(lambda x: x.shift(1).rolling(7*24).mean()))

    # Binning distance
    df['distance_bucket'] = pd.cut(
        df['distance_km'], bins=[0, 2, 5, 10, 50],
        labels=['very_close', 'close', 'medium', 'far'],
    )
    return df`}
        example="Zepto's delivery time model initially used raw distance_km as a feature. After analysis, the team discovered that the number of traffic signals on the route (extracted from the route polyline) was a better predictor than straight-line distance. Adding traffic_signals_count and route_type (highway vs. residential) reduced MAE from 8.2 minutes to 5.4 minutes — a 34% improvement from one feature engineering insight."
      />

      <QBlock
        num={8}
        color="#1D9E75"
        question="How do you handle class imbalance? (e.g. 0.1% fraud rate)"
        plain="In fraud detection, 99.9% of transactions are legitimate and 0.1% are fraud. If your model just says 'legitimate' for everything, it is 99.9% accurate but catches zero fraud — which is useless. Class imbalance means you need to explicitly teach the model that catching fraud is more important than avoiding false alarms, even when fraud examples are rare."
        technical={<>
          <p style={{ ...S.ps, marginBottom: 8 }}>Class imbalance causes the model to optimise for the majority class. Standard accuracy is meaningless — use AUC-PR (precision-recall AUC) not ROC-AUC for highly imbalanced problems. Four main approaches:</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 5, paddingLeft: 12, marginBottom: 8 }}>
            {[
              ['Class weights', 'scale_pos_weight=999 (ratio of negatives to positives) in LightGBM/XGBoost. Most effective for moderate imbalance. Zero data modification.'],
              ['SMOTE', 'Synthetic Minority Over-sampling: creates synthetic minority examples by interpolating between existing ones. Useful when weight adjustment is not enough. Apply to training data only.'],
              ['Undersampling', 'Randomly remove majority class examples. Loses information — use only when dataset is very large (>10M rows) and memory is a constraint.'],
              ['Threshold adjustment', 'Train on raw data but lower the classification threshold from 0.5 to 0.1 or 0.05. Increases recall at the cost of precision — set threshold based on business cost of FP vs FN.'],
            ].map(([name, desc]) => (
              <div key={name} style={{ fontSize: 12, color: 'var(--muted)', marginBottom: 4 }}>
                <strong style={{ color: '#1D9E75' }}>{name}:</strong> {desc}
              </div>
            ))}
          </div>
          <p style={{ ...S.ps, marginBottom: 0 }}>Always evaluate with AUC-PR, not accuracy. The key business question: what is the cost of missing a fraud case (false negative) vs. blocking a legitimate transaction (false positive)? This determines the optimal threshold, not the default 0.5.</p>
        </>}
        code={`import lightgbm as lgb
from sklearn.metrics import precision_recall_curve, average_precision_score
import numpy as np

# Approach 1: class weights (recommended first approach)
fraud_rate   = 0.001
scale_weight = (1 - fraud_rate) / fraud_rate   # = 999

model = lgb.LGBMClassifier(
    scale_pos_weight=scale_weight,   # weight minority class 999×
    n_estimators=500,
    learning_rate=0.05,
)
model.fit(X_train, y_train)

# Evaluate with AUC-PR (not accuracy, not ROC-AUC)
probs  = model.predict_proba(X_test)[:, 1]
ap     = average_precision_score(y_test, probs)
print(f"Average Precision (AUC-PR): {ap:.4f}")

# Set threshold based on business cost, not 0.5
# cost_FN = Rs 5000 (fraud loss), cost_FP = Rs 20 (inconvenience)
# threshold where cost_FN × FNR = cost_FP × FPR
precision, recall, thresholds = precision_recall_curve(y_test, probs)
business_threshold = thresholds[np.argmax(precision * 5000 / (recall * 20))]
print(f"Business-optimal threshold: {business_threshold:.4f}")`}
        example="Razorpay's fraud model with default threshold (0.5) caught 72% of fraud but a threshold tuned to minimize (FN_cost × FNR + FP_cost × FPR) at 0.18 caught 91% of fraud while only declining 0.4% more legitimate transactions. The 19% improvement in fraud capture was worth more than the 0.4% increase in false declines at their transaction volumes."
      />

      <Div />

      {/* ══════════════════════════════════════════════════════════════════════ */}
      {/* SECTION B — CLASSICAL ML */}
      {/* ══════════════════════════════════════════════════════════════════════ */}
      <SectionHeader
        letter="B"
        title="Classical ML — Q9 to Q17"
        count="Linear/logistic regression, regularisation, trees, random forest, gradient boosting, evaluation metrics, clustering, PCA"
        color="#D85A30"
      />

      <QBlock
        num={9}
        color="#D85A30"
        question="How does linear regression work? When would you use it?"
        plain="Linear regression draws a straight line through data points to predict a number. If you know someone's years of experience, it draws a line through a salary-vs-experience chart and reads off the predicted salary. It assumes the relationship between inputs and output is roughly straight — which is not always true, but when it is, it is fast, interpretable, and reliable."
        technical={<>
          <p style={{ ...S.ps, marginBottom: 8 }}>Linear regression models y as a linear combination of features: ŷ = β₀ + β₁x₁ + β₂x₂ + … + βₙxₙ. Parameters β are learned by minimising the sum of squared residuals (OLS): β = argmin Σ(yᵢ - ŷᵢ)². The closed-form solution is β = (XᵀX)⁻¹Xᵀy. With gradient descent (for large datasets): β ← β - α ∇L(β) where L = MSE.</p>
          <p style={{ ...S.ps, marginBottom: 0 }}>Use linear regression when: relationship is approximately linear, interpretability is critical (coefficients have direct meaning), inference speed must be &lt;1ms, baseline before trying complex models. Assumptions: linearity, homoscedasticity (constant error variance), independence of errors, no multicollinearity. Violations of these do not prevent fitting but invalidate statistical inference. For non-linear patterns: use Polynomial Regression (add x², x³ terms) or tree-based models.</p>
        </>}
        code={`from sklearn.linear_model import LinearRegression, Ridge
import numpy as np

# OLS linear regression
lr = LinearRegression()
lr.fit(X_train, y_train)

# Interpret coefficients
for feat, coef in zip(feature_names, lr.coef_):
    print(f"  {feat:<30}: {coef:+.4f}")
# "distance_km: +5.23" means each extra km adds 5.23 minutes

# Detect multicollinearity via Variance Inflation Factor
from statsmodels.stats.outliers_influence import variance_inflation_factor
import pandas as pd
vif = pd.DataFrame({
    'feature': feature_names,
    'VIF':     [variance_inflation_factor(X_train, i) for i in range(X_train.shape[1])]
})
print(vif[vif['VIF'] > 10])   # VIF > 10 indicates harmful multicollinearity`}
        example="HDFC Bank uses linear regression for quick credit limit estimation — the model's coefficients (income × 0.35, tenure × 0.12) are explainable to RBI auditors. For complex credit scoring where explainability is not required, they use GradientBoosting. The linear model is kept as a regulatory fallback."
      />

      <QBlock
        num={10}
        color="#D85A30"
        question="How does logistic regression work? How is it different from linear regression?"
        plain="Logistic regression answers yes/no questions instead of numerical predictions. Linear regression predicts a number on a scale from negative infinity to positive infinity. For yes/no outcomes that is useless — you need a number between 0 and 1 representing probability. Logistic regression wraps the linear prediction inside a sigmoid function that squashes any number into the 0-to-1 range."
        technical={<>
          <p style={{ ...S.ps, marginBottom: 8 }}>Logistic regression models the log-odds of the positive class as a linear function: log(P(y=1) / P(y=0)) = β₀ + β₁x₁ + ... Converting: P(y=1|x) = σ(Xβ) where σ(z) = 1/(1+e⁻ᶻ) is the sigmoid function. Trained by maximising log-likelihood (equivalent to minimising binary cross-entropy): L = -Σ[yᵢ log(ŷᵢ) + (1-yᵢ) log(1-ŷᵢ)].</p>
          <p style={{ ...S.ps, marginBottom: 0 }}>Key difference from linear regression: the output is a probability (0-1), not an unbounded number. The decision boundary is linear in feature space (not the outcome space). Despite its name it is a classification algorithm. Advantages: fast inference (dot product + sigmoid), naturally outputs calibrated probabilities, very interpretable (log-odds interpretation), robust to outliers compared to MSE-trained linear models. Limitation: cannot model non-linear decision boundaries without feature engineering.</p>
        </>}
        code={`from sklearn.linear_model import LogisticRegression
import numpy as np

model = LogisticRegression(C=1.0, max_iter=1000, class_weight='balanced')
model.fit(X_train, y_train)

# Predict probabilities (not just classes)
probs   = model.predict_proba(X_test)[:, 1]   # fraud probability
classes = (probs > 0.15).astype(int)           # custom threshold

# Interpret: odds ratio for each feature
import numpy as np
odds_ratios = np.exp(model.coef_[0])
for feat, odds in zip(feature_names, odds_ratios):
    if odds > 1.5 or odds < 0.7:
        print(f"  {feat}: {odds:.2f}× odds of fraud")
# "new_device: 3.4× odds" means new device multiplies fraud probability by 3.4×`}
        example="Zepto uses logistic regression for order cancellation prediction — it runs in &lt;1ms (critical for real-time pricing decisions), and the coefficients (late_restaurant_flag × 2.1) are directly explainable to business teams. They use GradientBoosting for more accurate predictions in non-time-critical contexts."
      />

      <QBlock
        num={11}
        color="#D85A30"
        question="What is regularisation? What is the difference between L1 and L2?"
        plain="Regularisation is a penalty for complexity — it tells the model 'you can fit the data, but if you need very large coefficients to do it, that is penalised.' It is like a speed limit in a car race: you can still go fast, but not arbitrarily fast. L1 and L2 are two different penalty functions that have subtly different effects on which features the model uses."
        technical={<>
          <p style={{ ...S.ps, marginBottom: 8 }}>Regularisation adds a penalty term to the loss function: L_regularised = L_original + λ × penalty(β). The hyperparameter λ controls the strength — higher λ means stronger regularisation.</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 5, paddingLeft: 12, marginBottom: 8 }}>
            {[
              ['L2 (Ridge)', 'Penalty = Σβᵢ². Penalises large coefficients quadratically. Shrinks all coefficients toward zero but rarely to exactly zero. Preferred when all features are somewhat useful. Has a closed-form solution.'],
              ['L1 (Lasso)', 'Penalty = Σ|βᵢ|. Penalises linearly. Produces sparse solutions — many coefficients become exactly zero. Acts as feature selection. Preferred when most features are irrelevant.'],
              ['Elastic Net', 'Combines L1 + L2: λ₁Σ|βᵢ| + λ₂Σβᵢ². Groups correlated features (L2) while achieving sparsity (L1). Best of both.'],
            ].map(([name, desc]) => (
              <div key={name} style={{ fontSize: 12, color: 'var(--muted)', marginBottom: 4 }}>
                <strong style={{ color: '#D85A30' }}>{name}:</strong> {desc}
              </div>
            ))}
          </div>
          <p style={{ ...S.ps, marginBottom: 0 }}>Geometric intuition: L2 penalty has circular contours — optimal point tends to land on the curved edge, giving small but non-zero coefficients. L1 penalty has diamond-shaped contours with sharp corners at axes — optimal solution often hits a corner where one or more β = 0 exactly, producing sparsity.</p>
        </>}
        code={`from sklearn.linear_model import Ridge, Lasso, ElasticNet
import numpy as np

# L2 regularisation (Ridge)
ridge = Ridge(alpha=10.0)   # alpha = λ — higher = stronger regularisation
ridge.fit(X_train, y_train)
print(f"Non-zero coefficients: {np.sum(ridge.coef_ != 0)}")  # all non-zero

# L1 regularisation (Lasso) — automatic feature selection
lasso = Lasso(alpha=0.01)
lasso.fit(X_train, y_train)
print(f"Non-zero coefficients: {np.sum(lasso.coef_ != 0)}")  # some are 0

# Select alpha via cross-validation
from sklearn.linear_model import RidgeCV
ridge_cv = RidgeCV(alphas=[0.1, 1.0, 10.0, 100.0], cv=5)
ridge_cv.fit(X_train, y_train)
print(f"Best alpha: {ridge_cv.alpha_}")`}
        example="PhonePe's merchant churn prediction model has 500+ features (transaction categories, time patterns, complaint history). Lasso regularisation automatically selected 47 of the 500+ features — the rest had coefficients shrunk to exactly zero. This made the model interpretable enough to explain to the merchant success team which signals most predict churn."
      />

      <QBlock
        num={12}
        color="#D85A30"
        question="How does a decision tree work?"
        plain="A decision tree is literally a flow chart. To predict if an order will be delivered on time, it asks: Is the distance over 5km? If yes, is it peak hour? If yes, likely late. Each question splits the data into groups, and the tree keeps asking questions until the groups are pure enough to make a confident prediction. It is the most interpretable model because you can literally draw and explain it."
        technical={<>
          <p style={{ ...S.ps, marginBottom: 8 }}>A decision tree recursively partitions the feature space by choosing splits that maximise purity at each node. For classification: impurity = Gini = 1 - Σpᵢ² or Entropy = -Σpᵢ log₂(pᵢ). For regression: variance reduction = parent_var - weighted_avg(child_vars). At each node, the algorithm finds the feature and threshold that maximises purity gain across all possible splits. This is greedy — it finds locally optimal splits, not globally optimal.</p>
          <p style={{ ...S.ps, marginBottom: 0 }}>Leaf nodes store the majority class (classification) or mean target value (regression). Stopping criteria: max_depth, min_samples_split, min_impurity_decrease. Without stopping criteria, trees grow until every leaf has one sample — perfect training accuracy, terrible generalisation. Key advantage: no preprocessing needed (handles mixed types, missing values in some implementations, non-linear boundaries). Key disadvantage: high variance — small data changes produce drastically different trees. This variance is why random forests and gradient boosting were invented.</p>
        </>}
        code={`from sklearn.tree import DecisionTreeClassifier, export_text
import numpy as np

# Train a decision tree
tree = DecisionTreeClassifier(
    max_depth=4,              # limit depth to control overfitting
    min_samples_leaf=100,     # each leaf must have at least 100 samples
    criterion='gini',
)
tree.fit(X_train, y_train)

# Print the tree as text — fully interpretable
print(export_text(tree, feature_names=feature_names))
# |--- distance_km <= 3.50
# |   |--- is_peak_hour <= 0.50
# |   |   |--- class: on_time  (p=0.89)
# |   |--- is_peak_hour > 0.50
# |   |   |--- restaurant_queue <= 5
# |   |   |   |--- class: on_time  (p=0.74)

# Feature importance (based on Gini gain)
fi = dict(zip(feature_names, tree.feature_importances_))
for feat, imp in sorted(fi.items(), key=lambda x: -x[1])[:5]:
    print(f"  {feat}: {imp:.4f}")`}
        example="Swiggy uses a shallow decision tree (depth=3) as the interpretable tier of their delivery SLA breach prediction system. The tree's rules are translated into plain-language explanations shown to restaurant partners: 'Orders over 8km during 7–9 PM have a 73% late delivery probability.' The tree's simplicity makes it trustworthy to non-technical stakeholders."
      />

      <QBlock
        num={13}
        color="#D85A30"
        question="What is Random Forest? How is it better than a single decision tree?"
        plain="One expert can be wrong. A crowd of independent experts rarely all agree on the same wrong answer. Random Forest trains hundreds of decision trees, each on a random subset of the data with a random subset of features, and takes a vote (for classification) or average (for regression). The randomness ensures the trees make different mistakes — when you average many different wrong answers, the errors cancel out."
        technical={<>
          <p style={{ ...S.ps, marginBottom: 8 }}>Random Forest is a bagging ensemble of decision trees with two key randomisations: bootstrap sampling (each tree trains on a random sample of n rows with replacement — ~63.2% unique rows) and feature subsampling (at each split, only √(p) features are considered for classification, p/3 for regression). These two randomisations ensure low correlation between trees.</p>
          <p style={{ ...S.ps, marginBottom: 8 }}>Why it outperforms single trees: single tree has low bias but high variance. Averaging m uncorrelated trees reduces variance by factor m with minimal bias increase. If tree variance = σ², correlation = ρ, ensemble variance = ρσ² + (1-ρ)σ²/m → approaches ρσ² as m grows. The randomisation reduces ρ toward zero — this is the key insight.</p>
          <p style={{ ...S.ps, marginBottom: 0 }}>Out-of-Bag (OOB) error: the ~36.8% of samples not used to train each tree are used as a free validation set. OOB error is an unbiased estimate of generalisation error without a separate holdout set. Feature importance from Random Forest: mean decrease in impurity across all trees and all splits on that feature.</p>
        </>}
        code={`from sklearn.ensemble import RandomForestClassifier
import numpy as np

rf = RandomForestClassifier(
    n_estimators=300,          # more trees = lower variance (diminishing returns after ~200)
    max_features='sqrt',       # √p features considered at each split
    max_depth=None,            # grow full trees — variance handled by ensemble
    min_samples_leaf=10,
    oob_score=True,            # free out-of-bag evaluation
    n_jobs=-1,                 # use all CPU cores
    random_state=42,
)
rf.fit(X_train, y_train)

print(f"OOB Score: {rf.oob_score_:.4f}")   # free validation — no holdout needed

# Feature importance
fi = pd.DataFrame({
    'feature':    feature_names,
    'importance': rf.feature_importances_,
}).sort_values('importance', ascending=False)
print(fi.head(10))`}
        example="Razorpay's chargeback prediction uses Random Forest for its speed and OOB evaluation — with 2M transactions daily, they cannot afford expensive cross-validation per model update. OOB error gives a reliable accuracy estimate without holding out data, preserving more training examples. The model runs in 3ms per prediction — fast enough for real-time payment authorisation."
      />

      <QBlock
        num={14}
        color="#D85A30"
        question="What is gradient boosting? How does LightGBM differ from XGBoost and from Random Forest?"
        plain="Random Forest builds many trees independently and averages them. Gradient boosting builds trees sequentially — each new tree focuses specifically on the mistakes the previous trees made. It is like a team where each person fixes the errors of the person before them. This sequential correction makes gradient boosting very accurate, at the cost of being harder to parallelise and more prone to overfitting if not tuned carefully."
        technical={<>
          <p style={{ ...S.ps, marginBottom: 8 }}>Gradient boosting builds an additive model F(x) = Σ h<sub>t</sub>(x) where each h<sub>t</sub> is a tree trained on the pseudo-residuals (negative gradient) of the loss with respect to the current ensemble's predictions. For MSE loss, pseudo-residuals = actual - predicted. Each tree learns to predict how wrong the current model is, then the ensemble is updated: F<sub>t+1</sub>(x) = F<sub>t</sub>(x) + η × h<sub>t</sub>(x) where η is the learning rate.</p>
          <p style={{ ...S.ps, marginBottom: 8 }}>XGBoost vs LightGBM vs CatBoost:</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 4, paddingLeft: 12, marginBottom: 8 }}>
            {[
              ['XGBoost (2016)', 'Level-wise tree growth. Exact split finding with pre-sorted features. Regularised objective (L1+L2). Slower on large datasets. More tuning options.'],
              ['LightGBM (2017)', 'Leaf-wise tree growth (not level-wise). Histogram-based split finding (groups features into bins — 20× faster). GOSS (gradient-based sampling: keep high-gradient samples). EFB (bundle sparse features). The default choice for tabular data in India.'],
              ['CatBoost (2018)', 'Ordered boosting (prevents target leakage in training). Native categorical feature support. Best for datasets with many high-cardinality categoricals. Default at Yandex and used at CRED for category-heavy features.'],
            ].map(([name, desc]) => (
              <div key={name} style={{ fontSize: 12, color: 'var(--muted)', marginBottom: 4 }}>
                <strong style={{ color: '#D85A30' }}>{name}:</strong> {desc}
              </div>
            ))}
          </div>
          <p style={{ ...S.ps, marginBottom: 0 }}>Random Forest vs Gradient Boosting: RF is more robust (hard to overfit severely), easier to tune, parallelisable. GBM is typically more accurate, slower, more sensitive to hyperparameters. Standard industry practice: start with LightGBM for maximum accuracy on tabular data.</p>
        </>}
        code={`import lightgbm as lgb

model = lgb.LGBMRegressor(
    n_estimators=500,
    max_depth=-1,            # -1 = unlimited (leaf-wise growth handles this)
    num_leaves=63,           # key param for LightGBM: max leaves per tree
    learning_rate=0.05,
    min_child_samples=50,    # equiv to min_samples_leaf — prevents overfitting
    subsample=0.8,           # row sampling per tree
    colsample_bytree=0.8,    # feature sampling per tree
    reg_alpha=0.1,           # L1 regularisation
    reg_lambda=1.0,          # L2 regularisation
    early_stopping_rounds=50,  # stop if val metric doesn't improve
)

model.fit(
    X_train, y_train,
    eval_set=[(X_val, y_val)],
    eval_metric='mae',
    callbacks=[lgb.log_evaluation(period=50)],
)
print(f"Best iteration: {model.best_iteration_}")`}
        example="Swiggy switched from XGBoost to LightGBM for delivery time prediction in 2023. Training time dropped from 45 minutes to 8 minutes with identical accuracy — because their 20M training rows and 80 features create a split search space where LightGBM's histogram-based approach is dramatically faster. They now retrain daily instead of weekly, keeping the model fresh."
      />

      <QBlock
        num={15}
        color="#D85A30"
        question="Explain precision, recall, F1-score, and AUC-ROC. When do you use each?"
        plain="Imagine a spam filter. Precision asks: of all the emails you flagged as spam, what fraction actually were spam? Recall asks: of all the actual spam emails, what fraction did you catch? F1 combines both into one number. AUC-ROC measures how well your model separates the two classes across all possible thresholds — like asking 'how good is this filter regardless of how strict I set it?'"
        technical={<>
          <p style={{ ...S.ps, marginBottom: 6 }}>From the confusion matrix (TP, TN, FP, FN):</p>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: 12, lineHeight: 2.2, paddingLeft: 12, marginBottom: 8, color: 'var(--muted)' }}>
            <div>Precision = TP / (TP + FP)  — of what you predicted positive, what fraction is correct?</div>
            <div>Recall    = TP / (TP + FN)  — of all actual positives, what fraction did you catch?</div>
            <div>F1        = 2 × (P × R) / (P + R)  — harmonic mean of precision and recall</div>
            <div>ROC-AUC   = area under the True Positive Rate vs False Positive Rate curve</div>
            <div>PR-AUC    = area under the Precision vs Recall curve</div>
          </div>
          <p style={{ ...S.ps, marginBottom: 0 }}>When to use which: ROC-AUC is the standard for balanced classes. For highly imbalanced classes (fraud 0.1%), PR-AUC is more informative — a model that scores 0.95 ROC-AUC on 0.1% fraud data may still be nearly useless (0.05 PR-AUC). Precision-focused: when FP is costly (blocking legitimate payments). Recall-focused: when FN is costly (missing actual fraud). F1: when you need one metric for both. F-beta: Fβ = (1+β²) × PR / (β²P + R) — β&gt;1 weights recall higher, β&lt;1 weights precision higher.</p>
        </>}
        code={`from sklearn.metrics import (
    precision_score, recall_score, f1_score,
    roc_auc_score, average_precision_score,
    classification_report,
)
import numpy as np

y_pred  = model.predict(X_test)
y_proba = model.predict_proba(X_test)[:, 1]

# Full report
print(classification_report(y_test, y_pred, target_names=['legit', 'fraud']))

# Key metrics
print(f"Precision:  {precision_score(y_test, y_pred):.4f}")
print(f"Recall:     {recall_score(y_test, y_pred):.4f}")
print(f"F1:         {f1_score(y_test, y_pred):.4f}")
print(f"ROC-AUC:    {roc_auc_score(y_test, y_proba):.4f}")
print(f"PR-AUC:     {average_precision_score(y_test, y_proba):.4f}")

# F-beta: weight recall 2× more than precision (fraud: missing fraud is worse)
f2 = f1_score(y_test, y_pred, beta=2)   # wait, use fbeta_score
from sklearn.metrics import fbeta_score
f2 = fbeta_score(y_test, y_pred, beta=2)
print(f"F2 (recall-weighted): {f2:.4f}")`}
        example="Razorpay's fraud team reports PR-AUC internally (not ROC-AUC) because with 0.1% fraud rate, a model that says 'legitimate' for everything gets ROC-AUC=0.5 but PR-AUC=0.001. PR-AUC is honest about how useful the model actually is. They also track capture_rate (recall at a fixed 0.3% false positive rate) — the business metric that matters to the risk team."
      />

      <QBlock
        num={16}
        color="#D85A30"
        question="What is k-means clustering? When should you use it and when should you not?"
        plain="K-means groups your data into k clusters based on similarity. Think of it as placing k magnets on a map — each data point sticks to the nearest magnet. The algorithm moves the magnets to the centre of their groups and repeats until the magnets stop moving. You must decide k (the number of groups) in advance."
        technical={<>
          <p style={{ ...S.ps, marginBottom: 8 }}>K-means minimises within-cluster sum of squared distances: argmin_C Σᵢ Σₓ∈Cᵢ ||x - μᵢ||². Algorithm: 1) Randomly initialise k centroids. 2) Assign each point to nearest centroid. 3) Move centroids to mean of their assigned points. 4) Repeat steps 2-3 until convergence. K-means++ initialisation (default in sklearn) picks centroids far from each other — dramatically reduces bad random initialisations.</p>
          <p style={{ ...S.ps, marginBottom: 8 }}>Use when: you have continuous features, clusters are roughly spherical and similar size, k is known or discoverable via elbow/silhouette method. Do not use when: clusters are non-spherical (use DBSCAN), clusters vary greatly in size/density, data has categorical features (use k-modes or k-prototypes), outliers are present (k-means is sensitive to outliers — one extreme point can drag a centroid far from the true cluster).</p>
          <p style={{ ...S.ps, marginBottom: 0 }}>Choosing k: Elbow method (plot inertia vs k, find the elbow where adding k gives diminishing returns). Silhouette score (measures how similar a point is to its own cluster vs others — higher is better). Business constraint (often k is determined by what is operationally meaningful — e.g. 4 customer tiers).</p>
        </>}
        code={`from sklearn.cluster import KMeans
from sklearn.metrics import silhouette_score
import numpy as np

# Choose k using silhouette score
silhouette_scores = {}
for k in range(2, 11):
    km = KMeans(n_clusters=k, init='k-means++', n_init=10, random_state=42)
    labels = km.fit_predict(X_scaled)
    silhouette_scores[k] = silhouette_score(X_scaled, labels)

best_k = max(silhouette_scores, key=silhouette_scores.get)
print(f"Best k: {best_k}  (silhouette: {silhouette_scores[best_k]:.4f})")

# Train final model
km = KMeans(n_clusters=best_k, init='k-means++', n_init=10, random_state=42)
clusters = km.fit_predict(X_scaled)

# Profile each cluster
df['cluster'] = clusters
print(df.groupby('cluster')[['order_frequency', 'avg_order_value', 'churn_rate']].mean())`}
        example="Meesho segments 150M users into 5 clusters based on purchase frequency, average order value, and category preferences. The clusters: (1) high-value fashion buyers, (2) occasional grocery buyers, (3) deal hunters, (4) new users, (5) dormant. Each cluster gets a different re-engagement strategy — email, push notification, or cashback offer — improving conversion by 23% vs. one-size-fits-all campaigns."
      />

      <QBlock
        num={17}
        color="#D85A30"
        question="What is PCA (Principal Component Analysis)? When and why do you use it?"
        plain="PCA is like taking a 3D sculpture and finding the best 2D photograph of it — the angle that preserves the most detail. When you have data with 100 features, many of them are correlated and redundant. PCA finds new combined features (called principal components) that capture the most variation with the fewest dimensions, while discarding redundant information."
        technical={<>
          <p style={{ ...S.ps, marginBottom: 8 }}>PCA finds orthogonal directions (principal components) in feature space that maximise variance. Steps: 1) Standardise data to zero mean, unit variance. 2) Compute covariance matrix C = (1/n)XᵀX. 3) Compute eigenvectors and eigenvalues of C. 4) Sort eigenvectors by eigenvalue (variance explained). 5) Project data onto the top-k eigenvectors: Z = XV_k.</p>
          <p style={{ ...S.ps, marginBottom: 0 }}>Choose k: retain enough components to explain 95% of variance. Explained variance ratio shows cumulative variance per component. When to use: visualisation (reduce to 2-3 dimensions), remove multicollinearity before regression, speed up training when features are highly correlated, compress embeddings. When NOT to use: when interpretability of features matters (PCA components are linear combinations, not original features), when features have very different semantics (mixing salary and age into one component is meaningless), when data is sparse (SVD is more appropriate). Modern alternative: UMAP for non-linear dimensionality reduction in visualisation tasks.</p>
        </>}
        code={`from sklearn.preprocessing import StandardScaler
from sklearn.decomposition import PCA
import numpy as np

# Always scale first — PCA is sensitive to scale
scaler = StandardScaler()
X_scaled = scaler.fit_transform(X)

# Fit PCA
pca = PCA(n_components=0.95)   # keep enough components for 95% variance
X_pca = pca.fit_transform(X_scaled)

print(f"Original features: {X.shape[1]}")
print(f"PCA components:    {pca.n_components_}")
print(f"Variance explained: {pca.explained_variance_ratio_.cumsum()[-1]:.1%}")

# Visualise in 2D
pca_2d = PCA(n_components=2)
X_2d   = pca_2d.fit_transform(X_scaled)
# Now plot X_2d[:, 0] vs X_2d[:, 1] with color = cluster label`}
        example="Flipkart's product similarity engine uses 2,048-dimensional image embeddings from ResNet. Storing and searching 50M product embeddings at full dimensionality is expensive. PCA reduces embeddings to 256 dimensions (retaining 94% of variance), cutting storage by 8× and nearest-neighbour search time by 4×, with negligible impact on product recommendation quality."
      />

      <Div />

      {/* ══════════════════════════════════════════════════════════════════════ */}
      {/* SECTION C — DEEP LEARNING */}
      {/* ══════════════════════════════════════════════════════════════════════ */}
      <SectionHeader
        letter="C"
        title="Deep Learning — Q18 to Q24"
        count="Neural networks, CNNs, RNNs, Transformers, transfer learning, batch normalisation, activation functions"
        color="#378ADD"
      />

      <QBlock
        num={18}
        color="#378ADD"
        question="What is a neural network and how does backpropagation work?"
        plain="A neural network is layers of interconnected switches that learn to recognise patterns. Each switch takes inputs, multiplies them by weights (the learned parameters), and passes the result forward. Backpropagation is how the network learns: it makes a prediction, compares it to the correct answer, measures the error, and works backwards through every switch adjusting each weight slightly to reduce the error. Repeat millions of times and the weights settle into a pattern that makes good predictions."
        technical={<>
          <p style={{ ...S.ps, marginBottom: 8 }}>A feed-forward neural network is a function f(x;θ) = h<sub>n</sub>(... h<sub>2</sub>(h<sub>1</sub>(x))) where each layer h<sub>i</sub> = σ(W<sub>i</sub>x + b<sub>i</sub>), σ is an activation function, and θ = &#123;W, b&#125; are learnable parameters. Training minimises a loss L(θ) = (1/n) Σ ℓ(f(x<sub>i</sub>;θ), y<sub>i</sub>) via gradient descent: θ ← θ - α∇<sub>θ</sub>L.</p>
          <p style={{ ...S.ps, marginBottom: 8 }}>Backpropagation computes ∇<sub>θ</sub>L efficiently using the chain rule. For a single output neuron: ∂L/∂W<sub>1</sub> = (∂L/∂ŷ)(∂ŷ/∂h<sub>2</sub>)(∂h<sub>2</sub>/∂h<sub>1</sub>)(∂h<sub>1</sub>/∂W<sub>1</sub>). The key insight: intermediate gradients can be reused across layers — computing them once in the forward pass and storing them (the computational graph) lets the backward pass compute all gradients in O(forward pass time). Without this, computing gradients for a million-parameter network would be computationally intractable.</p>
          <p style={{ ...S.ps, marginBottom: 0 }}>Common gradient problems: vanishing gradients (deep networks with sigmoid/tanh — gradients shrink to near-zero in early layers). Fixed by: ReLU activations, batch normalisation, residual connections. Exploding gradients: fixed by gradient clipping.</p>
        </>}
        code={`import torch
import torch.nn as nn

class DeliveryTimeNet(nn.Module):
    def __init__(self, input_dim: int, hidden_dims: list[int]):
        super().__init__()
        layers = []
        prev = input_dim
        for h in hidden_dims:
            layers += [nn.Linear(prev, h), nn.BatchNorm1d(h), nn.ReLU(), nn.Dropout(0.2)]
            prev = h
        layers.append(nn.Linear(prev, 1))
        self.net = nn.Sequential(*layers)

    def forward(self, x):
        return self.net(x).squeeze(-1)

model     = DeliveryTimeNet(input_dim=10, hidden_dims=[128, 64, 32])
optimiser = torch.optim.Adam(model.parameters(), lr=1e-3)
criterion = nn.MSELoss()

for batch_X, batch_y in train_loader:
    optimiser.zero_grad()
    pred = model(batch_X)
    loss = criterion(pred, batch_y)
    loss.backward()         # backpropagation: compute all gradients
    torch.nn.utils.clip_grad_norm_(model.parameters(), max_norm=1.0)  # clip
    optimiser.step()        # update weights`}
        example="Myntra uses a deep neural network with 6 layers for personalised fashion recommendations. Backpropagation trains the network to predict which outfits a user will click given their past browsing history. The network learns latent representations of fashion style — features no human explicitly designed — from 100M+ click events."
      />

      <QBlock
        num={19}
        color="#378ADD"
        question="What is a convolutional neural network (CNN)? Why is it better than a dense network for images?"
        plain="A CNN is a neural network specifically designed for images. Instead of connecting every pixel to every neuron (which would be billions of connections for a high-resolution image), a CNN uses small filters — like a 3×3 magnifying glass — that slide across the image looking for patterns: edges, textures, shapes. Early layers detect edges, middle layers detect shapes, later layers detect objects. This structure matches how the visual system in animals works."
        technical={<>
          <p style={{ ...S.ps, marginBottom: 8 }}>A CNN exploits three properties of images: translation invariance (a dog in the top-left looks the same as a dog in the bottom-right), spatial locality (nearby pixels are related), and hierarchical features (edges → textures → shapes → objects). It achieves this via convolutional layers: the output at each position (i,j) is the dot product of a learnable kernel K with the local patch of input. Instead of n²×n² weights (dense), each kernel has k×k weights shared across all positions — massive parameter reduction.</p>
          <p style={{ ...S.ps, marginBottom: 0 }}>Key layers: Conv2d (feature extraction via learned filters), MaxPool2d (spatial downsampling, translation invariance), BatchNorm2d (training stability), ReLU (non-linearity), Flatten + Linear (classification head). Modern architectures — ResNet (skip connections prevent vanishing gradients), EfficientNet (compound scaling), ViT (Vision Transformer — treats image as sequence of patches, attended over with self-attention) — have replaced hand-crafted feature engineering for images entirely.</p>
        </>}
        example="Meesho's product image quality checker uses a fine-tuned EfficientNet-B0 to detect blurry, dark, watermarked, or non-white-background product photos. Before CNNs, a team of 50 reviewers manually checked every uploaded photo. The CNN checks 100,000 photos per hour with 94% accuracy, escalating only the 6% borderline cases to human review."
      />

      <QBlock
        num={20}
        color="#378ADD"
        question="What is the Transformer architecture? Why did it replace RNNs for NLP?"
        plain="An RNN reads text word by word, left to right, like a person reading a sentence. By the time it reaches the end of a long sentence, it has often forgotten the beginning. A Transformer reads all words simultaneously and directly computes how much each word should 'pay attention' to every other word. This parallel processing is both faster to train and better at capturing long-range dependencies — 'the animal did not cross the street because it was tired' — where 'it' refers to 'animal', not 'street'."
        technical={<>
          <p style={{ ...S.ps, marginBottom: 8 }}>The Transformer's core component is multi-head self-attention: for a sequence of n tokens with d-dimensional embeddings, compute Q=XWQ, K=XWK, V=XWV, then Attention(Q,K,V) = softmax(QKᵀ/√d)V. Each token attends to all other tokens — attention weight aᵢⱼ = softmax(qᵢ·kⱼ/√d) measures how much token i should draw from token j. Multi-head: run h attention heads in parallel with different projections, concatenate outputs.</p>
          <p style={{ ...S.ps, marginBottom: 8 }}>Why better than RNNs: RNNs have O(n) sequential operations — cannot parallelise over sequence length. Transformer has O(1) sequential operations — all positions processed in parallel, dramatic training speedup on GPUs. RNNs have O(n) path length between distant tokens — gradients struggle over long sequences. Transformer has O(1) path length — every token directly attends to every other token.</p>
          <p style={{ ...S.ps, marginBottom: 0 }}>Positional encoding: since Transformer has no inherent notion of order, sinusoidal position encodings (or learned position embeddings) are added to token embeddings. The feedforward sublayer (applied independently per position): FFN(x) = max(0, xW₁+b₁)W₂+b₂ with d_ff=4d_model typically. Layer normalisation and residual connections prevent vanishing gradients in deep Transformers.</p>
        </>}
        example="Flipkart replaced their product search from TF-IDF + BM25 to a BERT-based bi-encoder in 2022. The RNN-based predecessor failed on queries like 'red traditional dress for wedding' because by processing word by word it lost track of which adjectives modified which noun. BERT's self-attention connects 'red' directly to 'dress' and 'wedding' directly to 'traditional' regardless of distance — search relevance improved by 31%."
      />

      <QBlock
        num={21}
        color="#378ADD"
        question="What is transfer learning and fine-tuning? Why is it so valuable?"
        plain="Training a deep learning model from scratch requires millions of examples and weeks of compute time. Transfer learning is taking a model that was already trained on a huge dataset (like all images on the internet) and adapting it to your specific task. It is like hiring someone who already has a broad education and teaching them your specific job, rather than starting their education from scratch. They learn your specific task much faster because they already understand the fundamentals."
        technical={<>
          <p style={{ ...S.ps, marginBottom: 8 }}>Transfer learning exploits the universality of learned representations. Deep networks trained on large datasets learn general features in early layers (edges, textures, grammar patterns) and task-specific features in later layers. These general features transfer well to new tasks, especially when the target domain is similar to the source domain.</p>
          <p style={{ ...S.ps, marginBottom: 8 }}>Two approaches:</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 4, paddingLeft: 12, marginBottom: 8 }}>
            {[
              ['Feature extraction (frozen backbone)', 'Freeze all pre-trained weights. Add a new classification head. Train only the head. Fastest, needs fewest examples (100-1000). Good when source and target domains are similar.'],
              ['Full fine-tuning', 'Start from pre-trained weights. Train all layers with a very low learning rate (1e-5 to 1e-4). Update all weights toward the new task. Needs more examples (10k+) but achieves higher accuracy. Risk: catastrophic forgetting.'],
            ].map(([name, desc]) => (
              <div key={name} style={{ fontSize: 12, color: 'var(--muted)', marginBottom: 4 }}>
                <strong style={{ color: '#378ADD' }}>{name}:</strong> {desc}
              </div>
            ))}
          </div>
          <p style={{ ...S.ps, marginBottom: 0 }}>LoRA (Low-Rank Adaptation) for LLMs: instead of updating all weights (too expensive), add low-rank adapter matrices ΔW = AB to each attention layer and train only A and B. Typical rank r=16 means 0.5% of parameters are trainable — same quality as full fine-tuning at 1% of the cost.</p>
        </>}
        code={`import torch
import torchvision.models as models
import torch.nn as nn

# Transfer learning: EfficientNet pre-trained on ImageNet
backbone = models.efficientnet_b0(weights='IMAGENET1K_V1')

# Option 1: Feature extraction — freeze backbone
for param in backbone.parameters():
    param.requires_grad = False

# Replace the classification head
backbone.classifier = nn.Sequential(
    nn.Dropout(0.3),
    nn.Linear(backbone.classifier[1].in_features, 6),  # 6 product categories
)
# Only the new head trains — fast, needs few examples

# Option 2: Fine-tuning — lower lr for pre-trained layers, higher for head
optimiser = torch.optim.Adam([
    {'params': backbone.features.parameters(), 'lr': 1e-5},   # frozen-ish
    {'params': backbone.classifier.parameters(), 'lr': 1e-3}, # train freely
])`}
        example="Juspay trained a document classification model for KYC documents (Aadhaar, PAN card, bank statement) using 2,000 labelled examples. From scratch this would need 100,000+ examples. Using a LayoutLM model pre-trained on millions of document images, they achieved 96% accuracy with just 2,000 examples — the pre-trained model already understood document structure, layout, and common text patterns."
      />

      <QBlock
        num={22}
        color="#378ADD"
        question="What is batch normalisation and why does it help training?"
        plain="During training, as one layer's weights change, the distribution of inputs to the next layer keeps shifting — the model is chasing a moving target. Batch normalisation standardises the output of each layer to have zero mean and unit variance, then allows the network to learn the best scale and shift. It is like recalibrating your measuring instruments before every experiment — it keeps everything on the same scale and makes training dramatically more stable."
        technical={<>
          <p style={{ ...S.ps, marginBottom: 8 }}>Batch normalisation normalises activations within a mini-batch: μ_B = (1/m)Σxᵢ, σ²_B = (1/m)Σ(xᵢ-μ_B)², x̂ᵢ = (xᵢ-μ_B)/√(σ²_B+ε), yᵢ = γx̂ᵢ + β where γ and β are learnable scale and shift parameters. Applied before the activation function (original paper) or after (more common in practice).</p>
          <p style={{ ...S.ps, marginBottom: 0 }}>Benefits: reduces internal covariate shift (the distribution change problem), allows higher learning rates (training is more stable), provides slight regularisation (noise from batch statistics), reduces dependence on careful weight initialisation. At inference: use running mean/variance accumulated during training (not batch statistics). Limitation: behaves differently at training vs inference (must set model.eval() in PyTorch). Layer normalisation (normalise across feature dimension, not batch) is preferred for Transformers because sequence lengths vary and batch size 1 is common.</p>
        </>}
        example="Flipkart's image embedding network for visual search was initially unstable — training diverged at learning rates above 1e-5. Adding batch normalisation after every convolutional layer allowed them to train at lr=1e-3 (100× higher), reducing training time from 5 days to 8 hours. The normalization prevented gradient explosions in the 20-layer ResNet they were using."
      />

      <QBlock
        num={23}
        color="#378ADD"
        question="What are the main activation functions? When do you use each?"
        plain="An activation function decides whether a neuron 'fires' — how it converts its input number into an output number. Without activation functions, a neural network is just a linear transformation no matter how many layers you add (because multiplying linear functions gives a linear function). Activation functions introduce non-linearity, which is what lets neural networks learn complex patterns."
        technical={<>
          <p style={{ ...S.ps, marginBottom: 6 }}>Key activation functions:</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 5, paddingLeft: 12, marginBottom: 8 }}>
            {[
              ['Sigmoid: σ(x) = 1/(1+e⁻ˣ)', 'Output range (0,1). Use only in output layer for binary classification. Avoid in hidden layers — saturates and causes vanishing gradients.'],
              ['Tanh: tanh(x)', 'Output range (-1,1). Zero-centred (better than sigmoid). Still saturates. Occasionally used in RNNs.'],
              ['ReLU: max(0,x)', 'The standard for hidden layers in feedforward and convolutional networks. No saturation for x>0. Extremely fast to compute. Dying ReLU problem: if a neuron always gets negative input, gradient is 0 forever.'],
              ['Leaky ReLU: max(0.01x, x)', 'Fixes dying ReLU by allowing small negative outputs. Use when ReLU causes dead neurons.'],
              ['GELU: x·Φ(x)', 'Gaussian Error Linear Unit. Smooth approximation of ReLU. Used in all modern Transformer architectures (BERT, GPT). Slightly slower but better performance on NLP tasks.'],
              ['Softmax: exp(xᵢ)/Σexp(xⱼ)', 'Output layer for multi-class classification. Converts logits to probabilities summing to 1.'],
            ].map(([name, desc]) => (
              <div key={name} style={{ fontSize: 12, color: 'var(--muted)', marginBottom: 4 }}>
                <strong style={{ color: '#378ADD' }}>{name}:</strong> {desc}
              </div>
            ))}
          </div>
          <p style={{ ...S.ps, marginBottom: 0 }}>Practical rule: ReLU for CNN hidden layers. GELU for Transformer hidden layers. Sigmoid for binary output, Softmax for multi-class output. Linear for regression output. Swish (x·sigmoid(x)) used in EfficientNet as a smooth, non-monotonic alternative to ReLU that empirically performs better on image classification.</p>
        </>}
        example="AI4Bharat's language models for Hindi/Tamil/Telugu use GELU activations (following BERT's architecture). When the team experimented with replacing GELU with ReLU in the feedforward layers, perplexity (measuring how well the model predicts next tokens) increased by 8% — a significant degradation. GELU's smooth gradient flow through the near-zero region is important for language model quality."
      />

      <QBlock
        num={24}
        color="#378ADD"
        question="What is dropout and why does it work as regularisation?"
        plain="Dropout is randomly turning off neurons during training — imagine a sports team where in each training session, some random players are told to sit out. The team cannot rely on any single player being there, so everyone must become good at the whole game. In a neural network, dropout prevents any neuron from becoming too important, forcing the network to learn redundant representations that generalise better."
        technical={<>
          <p style={{ ...S.ps, marginBottom: 8 }}>During training, dropout randomly sets activations to zero with probability p (typically 0.2-0.5). This is equivalent to training an ensemble of 2ⁿ different networks (where n = number of neurons) and averaging them at inference. At inference time, all neurons are active but activations are scaled by (1-p) to compensate for the extra neurons — or equivalently, scale by 1/(1-p) during training (inverted dropout, the standard implementation).</p>
          <p style={{ ...S.ps, marginBottom: 0 }}>Why it works: forces neurons to learn useful features independently rather than co-adapting (each neuron relying on specific other neurons being present). This reduces co-adaptation and overfitting. Dropout rates by position: input layer: 0.1–0.2. Hidden layers: 0.3–0.5. Do not use dropout: after batch normalisation layers (they already regularise), in the last layer before the final prediction, with very small datasets (where the model is already underfitting). For Transformers: Attention Dropout (drop attention weights) and residual dropout are standard.</p>
        </>}
        example="Myntra's fashion compatibility model (do these clothes go together?) had severe overfitting on training outfit combinations. Adding dropout (p=0.4) after every fully connected layer reduced the train-val accuracy gap from 18pp to 4pp. The intuition: without dropout, the model memorised specific item ID combinations. With dropout, it learned generalised style compatibility rules."
      />

      <Div />

      {/* ══════════════════════════════════════════════════════════════════════ */}
      {/* SECTION D — NLP AND LLMS */}
      {/* ══════════════════════════════════════════════════════════════════════ */}
      <SectionHeader
        letter="D"
        title="NLP and LLMs — Q25 to Q32"
        count="Embeddings, BERT vs GPT, RAG, prompt engineering, fine-tuning, attention, hallucinations, agents"
        color="#7b61ff"
      />

      <QBlock
        num={25}
        color="#7b61ff"
        question="What are word embeddings? How does Word2Vec work?"
        plain="Words are text — computers work with numbers. Embeddings convert words into lists of numbers (vectors) where similar words have similar numbers. The famous example: King - Man + Woman ≈ Queen. The vector arithmetic works because the numbers encode meaning. Word2Vec is one way to learn these number lists — by training a small neural network to predict which words appear near each other in text."
        technical={<>
          <p style={{ ...S.ps, marginBottom: 8 }}>Word2Vec trains a shallow neural network to predict context words from a target word (Skip-gram) or predict a target word from context words (CBOW). The hidden layer weights of the trained network become the word embeddings — vectors in ℝ^d (typically d=100-300) where semantically similar words are geometrically close (high cosine similarity).</p>
          <p style={{ ...S.ps, marginBottom: 8 }}>Skip-gram objective: P(context | target) = softmax(v_context · v_target). Training with negative sampling (for efficiency): for each positive context-target pair, sample k random negative words and update weights to increase P(positive) and decrease P(negatives).</p>
          <p style={{ ...S.ps, marginBottom: 0 }}>Modern embeddings: Word2Vec produces one vector per word (context-independent — "bank" has same embedding in "bank account" and "river bank"). BERT produces contextual embeddings — every occurrence of "bank" gets a different vector depending on surrounding context. Sentence embeddings (sentence-transformers) produce one vector per sentence — used for semantic search, deduplication, RAG retrieval. OpenAI/Cohere embeddings: 1536-3072 dimensional vectors from large transformer models — state-of-the-art for semantic similarity.</p>
        </>}
        example="Nykaa's product search previously used keyword matching — 'matte lipstick' found only products with those exact words. After adding sentence-transformer embeddings, the search understands that 'non-shiny lip colour' and 'matte lipstick' are semantically equivalent. Searches for 'pink shade for Indian skin tone' now retrieve relevant products even if they use different terminology."
      />

      <QBlock
        num={26}
        color="#7b61ff"
        question="What is the difference between BERT and GPT? When would you use each?"
        plain="Both are Transformer models trained on massive amounts of text, but they are designed for different jobs. BERT reads a sentence from both directions simultaneously — it is good at understanding text. GPT reads text from left to right only — it is good at continuing text. BERT is a reading comprehension specialist. GPT is a writing specialist."
        technical={<>
          <p style={{ ...S.ps, marginBottom: 8 }}>BERT (Bidirectional Encoder Representations from Transformers): encoder-only Transformer. Pre-trained with two objectives: Masked Language Modelling (predict randomly masked tokens using both left and right context — bidirectional) and Next Sentence Prediction. Produces contextual embeddings for input tokens. Used for: classification, NER, QA extraction, sentence similarity, embedding generation. Cannot generate text.</p>
          <p style={{ ...S.ps, marginBottom: 8 }}>GPT (Generative Pre-trained Transformer): decoder-only Transformer. Pre-trained with causal language modelling (predict next token given all previous tokens — left-to-right). The causal mask prevents attending to future tokens. Excellent for text generation, completion, summarisation, instruction following. Cannot do bidirectional understanding natively.</p>
          <p style={{ ...S.ps, marginBottom: 0 }}>Decision rule: Classification/understanding tasks → BERT-family (RoBERTa, DeBERTa, Electra for higher accuracy). Embedding generation for retrieval → sentence-transformers (bi-encoder: two separate BERT encoders, one per sentence). Text generation, chat, summarisation, code → GPT-family (LLaMA, Mistral, Gemini). Encoder-decoder (T5, BART) → best for seq-to-seq (translation, summarisation with constrained output).</p>
        </>}
        example="Flipkart's product review sentiment system uses RoBERTa (BERT-family) fine-tuned on 500k labelled reviews — it classifies each review as positive/negative/neutral with 93% accuracy. Their customer support chatbot uses LLaMA-3-8B (GPT-family) fine-tuned with DPO — it generates contextual responses to customer queries about orders, returns, and policies."
      />

      <QBlock
        num={27}
        color="#7b61ff"
        question="What is RAG (Retrieval-Augmented Generation)? When do you use it instead of fine-tuning?"
        plain="When you ask an LLM about yesterday's news or your company's internal policies, it does not know — its knowledge is frozen at its training date. RAG is like giving the LLM access to a search engine. Before generating an answer, the system searches a knowledge base for relevant documents and includes them in the prompt as context. The LLM answers using its reasoning ability plus the retrieved fresh information."
        technical={<>
          <p style={{ ...S.ps, marginBottom: 8 }}>RAG pipeline: 1) Index: embed all documents into a vector store (FAISS, Pinecone, Weaviate). 2) Retrieve: embed the user query, find top-k most similar document chunks via approximate nearest neighbour search. 3) Augment: prepend retrieved chunks to the prompt as context. 4) Generate: LLM answers using both its parametric knowledge and the retrieved context.</p>
          <p style={{ ...S.ps, marginBottom: 8 }}>RAG vs fine-tuning decision:</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 4, paddingLeft: 12, marginBottom: 8 }}>
            {[
              ['Use RAG when', 'Factual questions about specific documents, dynamic knowledge (FAQ updated daily), knowledge must be citable/attributable, data too sensitive to send to LLM fine-tuning service'],
              ['Use fine-tuning when', 'Specific output style or format, domain vocabulary the LLM does not know, consistent persona or tone, latency is critical (no retrieval step)'],
            ].map(([when, what]) => (
              <div key={when} style={{ fontSize: 12, color: 'var(--muted)', marginBottom: 4 }}>
                <strong style={{ color: '#7b61ff' }}>{when}:</strong> {what}
              </div>
            ))}
          </div>
          <p style={{ ...S.ps, marginBottom: 0 }}>Advanced RAG improvements: re-ranking retrieved chunks with a cross-encoder (Module 67), HyDE (generate a hypothetical answer, embed that instead of the query), parent-child chunking (index small chunks, return larger parent for context), query decomposition (split complex questions into sub-questions).</p>
        </>}
        example="Razorpay's merchant support bot answers 50,000 questions per day about integration docs, error codes, and settlement policies. Their documentation updates weekly. Fine-tuning would require weekly retraining at significant cost. RAG indexes all Razorpay docs in a vector store — when documentation changes, they re-index (1 hour) instead of retraining (1 week). Accuracy on policy questions improved from 71% (fine-tuned static model) to 89% (RAG with current docs)."
      />

      <QBlock
        num={28}
        color="#7b61ff"
        question="What is prompt engineering? Give concrete examples of effective techniques."
        plain="Prompt engineering is learning how to ask the right question. The same AI model will give you a much better answer if you ask it correctly. It is like the difference between asking a surgeon 'what should I do about this pain?' versus 'I am a 35-year-old with sharp intermittent pain in the lower right abdomen for 3 days, no fever, no nausea — what are the differential diagnoses and recommended first steps?' The second question gets a far better answer."
        technical={<>
          <p style={{ ...S.ps, marginBottom: 6 }}>Key techniques with examples:</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 5, paddingLeft: 12, marginBottom: 8 }}>
            {[
              ['Zero-shot', 'Simply ask: "Classify this review as positive/negative/neutral: ..."'],
              ['Few-shot', 'Provide 3-5 examples of input-output pairs before your question. Shows the model the format and style you expect.'],
              ['Chain-of-Thought', 'Add "Think step by step" or provide a worked example showing reasoning. Dramatically improves performance on math, logic, and multi-step reasoning.'],
              ['Role assignment', '"You are a senior data scientist at a fintech company. Analyze this payment data..."'],
              ['Output format specification', '"Respond with a JSON object with keys: category (string), confidence (float 0-1), reason (string). No other text."'],
              ['Negative examples', '"Do NOT use bullet points. Do NOT include a greeting. Do NOT exceed 3 sentences."'],
            ].map(([name, desc]) => (
              <div key={name} style={{ fontSize: 12, color: 'var(--muted)', marginBottom: 4 }}>
                <strong style={{ color: '#7b61ff' }}>{name}:</strong> {desc}
              </div>
            ))}
          </div>
          <p style={{ ...S.ps, marginBottom: 0 }}>The most underused technique: decomposition. Instead of asking the LLM to do 5 things in one prompt, break it into 5 prompts, using the output of each as input to the next. Complex tasks always perform better as chains of simpler tasks.</p>
        </>}
        code={`# Few-shot + output format + role
PROMPT = """
You are a customer complaint classifier for Razorpay.

Classify the complaint into exactly one category.
Respond ONLY with the category name — no other text.

Examples:
Complaint: "My payment failed but money was deducted"
Category: payment_failed_technical

Complaint: "I was charged twice for the same order"
Category: duplicate_charge

Complaint: "Refund not received after 10 days"
Category: refund_delayed

Complaint: "Merchant says payment not received but my bank shows debited"
Category:"""

# Chain-of-thought for complex reasoning
COT_PROMPT = """
A customer paid Rs 4999 at 11:45 PM on March 15.
The settlement report shows Rs 4850.

Think through this step by step:
1. What is the difference?
2. What percentage is this of the original?
3. Does this match standard Razorpay transaction fees (2% for domestic cards)?
4. What is your conclusion about whether this is correct or a billing error?
"""`}
        example="CRED's credit card bill analysis feature uses a chain-of-thought prompt that first extracts all transactions from the statement (step 1), then categorises each by merchant type (step 2), then summarises spending patterns (step 3). Running these as three sequential prompts reduced hallucination rate from 12% (single complex prompt) to 2% (chain of simpler prompts)."
      />

      <QBlock
        num={29}
        color="#7b61ff"
        question="What is fine-tuning an LLM? When do you do it instead of prompting?"
        plain="An LLM is like a very smart consultant who knows everything. Prompting is giving them a good brief before each meeting. Fine-tuning is putting them through a training programme at your company — after which they understand your terminology, follow your style guide, and need less briefing for every interaction. Fine-tuning is more expensive upfront but makes every subsequent interaction more reliable and cheaper."
        technical={<>
          <p style={{ ...S.ps, marginBottom: 8 }}>Fine-tuning continues the pre-trained model's training on a domain-specific or task-specific dataset. Three approaches by cost and capability:</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 4, paddingLeft: 12, marginBottom: 8 }}>
            {[
              ['Full fine-tuning', 'Update all weights. Best quality. Requires GPU cluster. Only justified for foundational model development.'],
              ['LoRA/QLoRA (PEFT)', 'Freeze all weights, add trainable low-rank adapter matrices (rank 16) to attention layers. 0.5% of parameters trainable. Fine-tune a 7B model on a single T4 GPU (16GB). Standard for task adaptation.'],
              ['Prompt tuning / prefix tuning', 'Add soft trainable tokens to the input. Lightest: only 0.01% parameters trained. Works for some tasks, less effective for complex behaviour changes.'],
            ].map(([name, desc]) => (
              <div key={name} style={{ fontSize: 12, color: 'var(--muted)', marginBottom: 4 }}>
                <strong style={{ color: '#7b61ff' }}>{name}:</strong> {desc}
              </div>
            ))}
          </div>
          <p style={{ ...S.ps, marginBottom: 0 }}>Decision: fine-tune when the base model is inconsistent on your task despite optimised prompts, when you have 500+ high-quality labelled examples, when inference cost at scale justifies training cost, when output must follow a strict format the model ignores via prompting. Do not fine-tune when: insufficient data (&lt;500 examples), task changes frequently (fine-tuned model becomes stale), problem is knowledge-based (use RAG instead).</p>
        </>}
        example="Flipkart's product dispute classifier needed to output one of 18 exact category strings that matched their CRM system. Despite detailed prompting, GPT-4 produced valid-sounding but non-matching category names 15% of the time. LoRA fine-tuning LLaMA-3-8B on 3,000 labelled disputes reduced invalid outputs to &lt;0.5% — the model internalised the exact category names. This also cut inference cost by 10× vs GPT-4 API."
      />

      <QBlock
        num={30}
        color="#7b61ff"
        question="What are hallucinations in LLMs and how do you reduce them?"
        plain="An LLM hallucination is when the AI confidently states something that is simply false — like a student who does not know an answer but writes a plausible-sounding paragraph anyway rather than admitting they do not know. LLMs generate the most statistically likely continuation of text — when they do not know something, they still generate confident text that sounds right but is not. Reducing hallucinations means making the model more honest about uncertainty and grounding it in verified facts."
        technical={<>
          <p style={{ ...S.ps, marginBottom: 8 }}>Hallucinations arise because LLMs are trained to generate fluent text, not to only generate correct text. They cannot reliably distinguish between what they know and what they are generating plausibly. Three categories: factual hallucinations (inventing facts), faithfulness hallucinations (making claims not supported by provided context), entity hallucinations (inventing names, numbers, dates).</p>
          <p style={{ ...S.ps, marginBottom: 6 }}>Reduction strategies in order of effectiveness:</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 4, paddingLeft: 12, marginBottom: 8 }}>
            {[
              ['RAG with citation requirement', 'Ground every claim in retrieved documents. Prompt: "Answer using ONLY the context below. Cite [source] for each claim. Say I do not know if the answer is not in the context."'],
              ['Temperature = 0', 'Deterministic generation (argmax decoding) eliminates creative/random token selection. Reduces hallucination for factual tasks.'],
              ['Self-consistency', 'Generate 5 answers independently. Take the majority or average. Consensus across independent generations is more reliable than a single generation.'],
              ['Constitutional AI / RLHF alignment', 'Fine-tuning on human feedback that penalises hallucinated outputs. Reduces hallucination in the model itself.'],
              ['Output validation', 'Post-process model output: check that every number, date, name cited can be verified in source documents. Flag and escalate uncertain responses.'],
            ].map(([name, desc]) => (
              <div key={name} style={{ fontSize: 12, color: 'var(--muted)', marginBottom: 4 }}>
                <strong style={{ color: '#7b61ff' }}>{name}:</strong> {desc}
              </div>
            ))}
          </div>
        </>}
        example="HDFC's wealth management AI assistant was initially producing hallucinated financial figures — it would confidently state that 'HDFC Balanced Advantage Fund returned 18.3% in FY2025' when the actual figure was 12.1%. Fix: switched to RAG with explicit document grounding. Prompt now says: 'Answer only from the mutual fund factsheets provided. If the figure is not in the factsheets, say the data is unavailable.' Hallucinated financial figures dropped from 8% to &lt;0.3% of responses."
      />

      <QBlock
        num={31}
        color="#7b61ff"
        question="What is an LLM agent? How is it different from a simple LLM call?"
        plain="A single LLM call is like asking someone one question. An agent is giving someone access to tools — a phone, a computer, a calculator — and asking them to complete a multi-step task. The LLM decides which tools to use, uses them, reads the results, and decides what to do next, repeating until the task is done. Agents are what happens when LLMs go from answering questions to taking actions."
        technical={<>
          <p style={{ ...S.ps, marginBottom: 8 }}>An LLM agent runs a loop: Observe (receive input or tool result) → Think (LLM decides what to do) → Act (call a tool or return final answer). The ReAct pattern (Reason + Act) interleaves reasoning traces with action calls: "Thought: I need to look up the transaction. Action: get_transaction(pay_ABC123). Observation: [result]. Thought: The transaction shows... Action: [next step]."</p>
          <p style={{ ...S.ps, marginBottom: 0 }}>Production agent requirements beyond toy implementations: structured tool calling (JSON schemas, not text parsing — prevents format failures), loop detection (hash tool call arguments, block if same call attempted twice), confirmation gates (irreversible actions like refunds must pause for human approval), memory (episodic memory of past sessions, semantic memory via RAG), graceful failure (create support ticket when unable to resolve instead of hallucinating a solution), hard max_calls limit (prevents runaway costs from infinite loops). The reliability comes from these engineering constraints, not from LLM capability alone.</p>
        </>}
        example="Razorpay's dispute resolution agent handles 40,000 merchant tickets per day automatically. It calls: get_transaction() → search_knowledge_base() → draft_response() → validate_response(). A ticket that previously required 4 minutes of human time is resolved in 8 seconds at 91% first-contact resolution rate. The 9% that the agent cannot resolve are escalated with a full context summary — reducing human resolution time from 12 minutes to 3 minutes for those cases."
      />

      <QBlock
        num={32}
        color="#7b61ff"
        question="What is the attention mechanism in detail? Why is it called 'attention'?"
        plain="Attention is a way for the model to decide which words in a sentence are most relevant for understanding each word. When translating 'the animal did not cross the street because it was tired,' the model needs to know what 'it' refers to. Attention lets every word 'look at' every other word and assign a relevance score — 'it' will pay high attention to 'animal' and low attention to 'street'. The name comes from this selective focus — just as human attention focuses on relevant information."
        technical={<>
          <p style={{ ...S.ps, marginBottom: 8 }}>Self-attention computes attention weights between all pairs of positions in a sequence. For each token, three vectors are computed: Query Q (what information am I looking for?), Key K (what information do I have?), Value V (what information do I provide?). Attention(Q,K,V) = softmax(QKᵀ/√d_k)V. The scaled dot product QKᵀ/√d_k gives an n×n matrix of raw attention logits — after softmax, each row sums to 1 and represents a weighted average over all positions.</p>
          <p style={{ ...S.ps, marginBottom: 0 }}>Computational complexity: O(n²·d) in time and O(n²) in memory — quadratic in sequence length n. This is the Transformer's bottleneck for long sequences. Solutions: Sparse attention (Longformer — attend to local window + global tokens), Flash Attention (hardware-efficient exact attention — same output, 4× less memory via recomputation trick), linear attention (approximations to reduce to O(n)), sliding window attention (Mistral). Multi-head attention: run h parallel attention functions with learned projections, concatenate outputs — each head can attend to different aspects of the sequence (one head might track syntax, another semantics).</p>
        </>}
        example="Sahamati (India's account aggregator network) uses a BERT model to extract financial entities from bank statements. The attention heads in the model learned to focus on amounts (digits and currency symbols), dates (DD/MM patterns), and merchant names simultaneously. Visualising attention maps showed that the head responsible for amount extraction attends strongly to 'Rs', '₹', and digit patterns — behaviour that emerged from training, not design."
      />

      <Div />

      {/* ══════════════════════════════════════════════════════════════════════ */}
      {/* SECTION E — MLOPS AND PRODUCTION */}
      {/* ══════════════════════════════════════════════════════════════════════ */}
      <SectionHeader
        letter="E"
        title="MLOps and Production — Q33 to Q42"
        count="Notebook vs production, feature stores, training-serving skew, drift, monitoring, pipelines, deployment, A/B testing"
        color="#BA7517"
      />

      <QBlock
        num={33}
        color="#BA7517"
        question="What is the difference between a model in a Jupyter notebook and a model in production?"
        plain="A model in a notebook works once, on your laptop, when you run it manually. A model in production works automatically, thousands of times per second, on a server, without anyone touching it. The gap is not the model itself — it is everything around it: the code that gets data to the model, the API that serves predictions, the monitoring that catches when it breaks, and the pipeline that retrains it automatically when it gets stale."
        technical={<>
          <p style={{ ...S.ps, marginBottom: 6 }}>The production gap is a checklist, not a single problem:</p>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4px 20px', paddingLeft: 12, marginBottom: 8 }}>
            {[
              ['Notebook', 'Production'],
              ['Manual data loading', 'Feature pipeline (batch or streaming)'],
              ['One-off training', 'Scheduled retraining on new data'],
              ['No versioning', 'Model registry with lineage'],
              ['Pandas DataFrame input', 'REST API receiving JSON requests'],
              ['Interactive debugging', 'Structured logging + alerting'],
              ['Local machine', 'Kubernetes cluster (autoscaling)'],
              ['Fixed dataset', 'Drift monitoring + retraining triggers'],
              ['You know it works', 'CI/CD tests it works before deploy'],
              ['Data in memory', 'Feature store (online + offline)'],
            ].map(([nb, prod], i) => i === 0
              ? null
              : (
                <Fragment key={nb}>
                  <div style={{ fontSize: 11, color: '#ff4757' }}>✗ {nb}</div>
                  <div style={{ fontSize: 11, color: '#1D9E75' }}>✓ {prod}</div>
                </Fragment>
              )
            )}
          </div>
          <p style={{ ...S.ps, marginBottom: 0 }}>The three most common production failures invisible in notebooks: training-serving skew (features computed differently at training vs serving), silent model degradation (model gets worse over months without alerting), dependency drift (a package version changes and the model behaviour changes subtly). All three require production infrastructure — they are undetectable in a notebook environment.</p>
        </>}
        example="A Meesho data scientist built a product recommendation model in a notebook with 94% offline accuracy. When deployed, online CTR was 23% lower than expected. Root cause: the notebook computed user_30d_purchase_count by scanning a local CSV. The production API computed it from a Redis cache that was refreshed only weekly. The stale features meant the model was using 30-day-old purchase histories for recommendations — training-serving skew caused by the notebook never needing to think about real-time feature serving."
      />

      <QBlock
        num={34}
        color="#BA7517"
        question="What is a feature store and why do you need one?"
        plain="Without a feature store, the same metric — 'how many orders did this restaurant complete in the last 7 days?' — gets calculated separately by the training team (in a Python script), the serving team (in an API), and the analytics team (in a SQL query). Three different versions of the same number, all slightly different because of small code differences. A feature store computes it once, stores it, and gives the same number to everyone who needs it."
        technical={<>
          <p style={{ ...S.ps, marginBottom: 8 }}>A feature store solves two distinct problems: training-serving consistency (same feature computation code produces the same values for training and for serving) and point-in-time correctness (training features are retrieved as-of the training event timestamp, preventing data leakage from future data).</p>
          <p style={{ ...S.ps, marginBottom: 0 }}>Architecture: offline store (S3/BigQuery — full history at batch frequency, used for training dataset generation) and online store (Redis/DynamoDB — latest feature values at millisecond latency, used by inference service). Materialisation job runs on a schedule (hourly or daily) to sync offline to online. Point-in-time correct training: get_historical_features(entity_df) returns feature values as-of entity_df['event_timestamp'] for each row — crucial for preventing leakage. Tools: Feast (open-source), Tecton (managed), Vertex AI Feature Store, SageMaker Feature Store, Hopsworks. The most common failure in production ML is skipping the feature store and recomputing features differently in each environment.</p>
        </>}
        example="Swiggy's delivery time model previously had three separate feature computations: the data scientist's pandas pipeline (training), the backend engineer's Kotlin code (serving), and the analytics engineer's SQL (reporting). Despite code reviews, subtle differences accumulated — the pandas pipeline used a 7-day rolling window exclusive of the current day, the Kotlin code included it. Swiggy's Feast-based feature store eliminated this by making 'restaurant_7d_order_count' a single definition computed once and served to all consumers."
      />

      <QBlock
        num={35}
        color="#BA7517"
        question="What is training-serving skew? How do you detect and prevent it?"
        plain="Training-serving skew is when your model was trained on one version of the data but receives a slightly different version when making real predictions. Imagine training a model on temperature data in Celsius, then accidentally serving it Fahrenheit temperatures in production — the input looks like a number but means something completely different. The model produces wrong predictions silently, with no error message."
        technical={<>
          <p style={{ ...S.ps, marginBottom: 8 }}>Training-serving skew occurs when feature values computed at training time differ from those computed at inference time for the same underlying event. Common causes: different code (training uses pandas, serving uses SQL — different null handling, different aggregation window boundaries), different data freshness (training uses 30-day window, serving uses stale cached values from 5 days ago), different preprocessing order (training normalises before clipping, serving clips before normalising), feature engineering that leaks future data in training but cannot at serving time.</p>
          <p style={{ ...S.ps, marginBottom: 0 }}>Detection: log the exact feature values received by the model at inference time. Periodically take a sample of logged feature vectors and recompute what training would have produced for those same events. Compare the distributions — any systematic difference is skew. Prevention: use a feature store with a single feature computation definition used by both training and serving. Write integration tests that verify the feature values a training batch produces match what the serving API would produce for the same input data.</p>
        </>}
        code={`# Detect training-serving skew by comparing logged features to expected
import numpy as np, pandas as pd
from scipy.stats import ks_2samp

# Reference: feature distributions from training data
train_features_df = pd.read_parquet('training_features.parquet')

# Current: feature values logged from serving over last 7 days
serving_features_df = pd.read_parquet('serving_feature_logs.parquet')

skew_report = {}
for col in feature_columns:
    stat, pval = ks_2samp(train_features_df[col].dropna(),
                           serving_features_df[col].dropna())
    mean_diff = abs(serving_features_df[col].mean() - train_features_df[col].mean())
    skew_report[col] = {
        'ks_statistic': stat,
        'p_value':       pval,
        'mean_train':    train_features_df[col].mean(),
        'mean_serving':  serving_features_df[col].mean(),
        'mean_diff_pct': mean_diff / (train_features_df[col].mean() + 1e-8) * 100,
        'skew_detected': stat > 0.1 or pval < 0.01,
    }
print(pd.DataFrame(skew_report).T.sort_values('ks_statistic', ascending=False))`}
        example="Flipkart's CTR prediction model mysteriously degraded after a backend team refactored the product view count cache. The training pipeline computed view_count_7d correctly but the refactored cache returned a rolling 30-day count. Detection: monitoring showed the mean of view_count_7d in serving was 4.3× higher than in training. Fix: unified the feature computation into Feast so any change to the computation would require a model retrain."
      />

      <QBlock
        num={36}
        color="#BA7517"
        question="What is model drift? What are the different types and how do you monitor for each?"
        plain="A model trained in January degrades by June because the world changes. During monsoon, delivery routes change. During festive season, fraud patterns shift. During a recession, customer spending patterns change. Drift is the general term for 'the world has changed enough that your model's predictions are getting worse.' There are two main types: the inputs are different from what the model was trained on, or the correct answers for those inputs have changed."
        technical={<>
          <p style={{ ...S.ps, marginBottom: 8 }}>Three types of drift:</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 5, paddingLeft: 12, marginBottom: 8 }}>
            {[
              ['Data drift (covariate shift)', 'P(X) changes — input feature distributions shift. E.g. average order distance increases during monsoon. Detectable immediately without labels using KS test, PSI.'],
              ['Concept drift', 'P(Y|X) changes — the relationship between features and target changes. E.g. new fraud pattern: same features, different fraud probability. Requires labels to detect. Labels often delayed (chargebacks arrive 7-30 days later).'],
              ['Label drift', 'P(Y) changes — the base rate of the outcome changes. E.g. fraud rate doubles during a festival. Makes thresholds that were calibrated to the old base rate suboptimal.'],
            ].map(([name, desc]) => (
              <div key={name} style={{ fontSize: 12, color: 'var(--muted)', marginBottom: 4 }}>
                <strong style={{ color: '#BA7517' }}>{name}:</strong> {desc}
              </div>
            ))}
          </div>
          <p style={{ ...S.ps, marginBottom: 0 }}>Monitoring stack: data drift — compare current week's feature distributions to training distributions daily using PSI (&gt;0.2 = significant) and KS test. Prediction drift — monitor distribution of model outputs (mean, variance, histogram). Performance drift (requires labels) — track rolling 7-day MAE, AUC, or precision-recall with 30-min to 30-day label delay. Proxy metrics when labels are delayed: business metrics (complaint rate, escalation rate, refund rate) as early warning signals.</p>
        </>}
        example="Razorpay's fraud detection model was deployed in January. By March, the team noticed the fraud capture rate had dropped from 91% to 78% (detected via monthly model audit). Root cause: a new fraud pattern had emerged — fraudsters were using legitimate merchant IDs obtained through SIM swaps. Same feature values (legitimate merchant IDs), but now associated with fraudulent behaviour. Concept drift. Fix: added SIM swap recency as a feature and retrained on March data containing the new pattern."
      />

      <QBlock
        num={37}
        color="#BA7517"
        question="What is an ML pipeline? What does it contain and why does it matter?"
        plain="An ML pipeline is an automated assembly line for your model. Instead of a data scientist manually running scripts every time you need a new model, the pipeline runs automatically: get fresh data → clean it → compute features → train the model → test it → deploy if it passes — all without human intervention. A pipeline means your model stays fresh, your process is repeatable, and a new team member can understand exactly how your model is produced."
        technical={<>
          <p style={{ ...S.ps, marginBottom: 8 }}>A production ML pipeline has four types of sub-pipelines that run on different schedules:</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 4, paddingLeft: 12, marginBottom: 8 }}>
            {[
              ['Feature pipeline', 'Hourly/daily. Extract raw events → compute features → write to feature store (offline and online). Must be idempotent (safe to rerun).'],
              ['Training pipeline', 'Daily/weekly. Feature store point-in-time query → train → evaluate vs champion → register if better. The DVC/Prefect/Airflow DAG.'],
              ['Serving pipeline', 'Real-time per request. Request → feature store lookup → model prediction → log → return. Sub-millisecond to tens-of-milliseconds.'],
              ['Monitoring pipeline', 'Daily. Compare current feature distributions to training distributions. Compute rolling performance metrics. Trigger retraining if thresholds breached.'],
            ].map(([name, desc]) => (
              <div key={name} style={{ fontSize: 12, color: 'var(--muted)', marginBottom: 4 }}>
                <strong style={{ color: '#BA7517' }}>{name}:</strong> {desc}
              </div>
            ))}
          </div>
          <p style={{ ...S.ps, marginBottom: 0 }}>The three-pipeline architecture (Module 69): feature pipeline → training pipeline → inference pipeline must all use the same feature definitions (via feature store) or training-serving skew is inevitable. The common failure: teams build pipelines where each stage has its own feature computation code — subtle differences accumulate and cause silent degradation.</p>
        </>}
        example="Swiggy's delivery time model runs three pipelines: the feature pipeline runs every 30 minutes on Kafka streams (updating restaurant queue length, driver location), the training pipeline runs every Sunday at 2 AM on the full week's data, and the monitoring pipeline runs every morning comparing the week's feature distributions to the training baseline. When the monsoon monitoring triggered a drift alert in June, the weekly retraining automatically captured the new distribution and model MAE recovered within one week."
      />

      <QBlock
        num={38}
        color="#BA7517"
        question="How do you deploy a machine learning model? Walk through the complete process."
        plain="Deploying a model is like opening a restaurant. You have the recipe (the model). Now you need: a kitchen (a server), a menu and ordering system (an API), staff that can work at scale (multiple server instances), a health inspector that checks everything is working (monitoring), and a way to update the menu without closing the restaurant (zero-downtime deployment). Each step is non-trivial and can fail independently."
        technical={<>
          <p style={{ ...S.ps, marginBottom: 6 }}>Complete deployment checklist:</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 4, paddingLeft: 12, marginBottom: 8 }}>
            {[
              ['1. Wrap in an API', 'FastAPI: POST /v1/predict receives JSON features, validates with Pydantic, returns prediction. Include /health (liveness) and /ready (readiness) endpoints.'],
              ['2. Containerise', 'Docker with multi-stage build. Python slim image. Do not bake model weights into image — load from S3/GCS at startup via MODEL_PATH env var. Target &lt;200MB image.'],
              ['3. Define infrastructure', 'Kubernetes Deployment (3 replicas min), Service (LoadBalancer), HPA (autoscale on CPU >70%). Or: managed endpoint on AML/SageMaker/Vertex.'],
              ['4. Quality gate', 'Compare new model to champion on holdout test set before routing any traffic. Only proceed if within tolerance.'],
              ['5. Canary release', '10% traffic to new model, 90% to incumbent. Monitor error rate and latency and MAE for 24 hours.'],
              ['6. Gradual promotion', '10% → 25% → 50% → 100% with automatic rollback if p99 latency >500ms or error rate >1%.'],
              ['7. Logging and monitoring', 'Log every prediction with prediction_id. Sample 5% for human review. Compute rolling performance metrics daily.'],
            ].map(([step, desc]) => (
              <div key={step} style={{ fontSize: 12, color: 'var(--muted)', marginBottom: 4 }}>
                <strong style={{ color: '#BA7517' }}>{step}:</strong> {desc}
              </div>
            ))}
          </div>
        </>}
        example="PhonePe's loan eligibility model deployment: model trained on 5M applications → wrapped in FastAPI with Pydantic validation for 23 input features → containerised (87MB Docker image) → deployed to Kubernetes (4 replicas, n1-standard-4 on GKE) → initial 5% canary to 10,000 users for 48 hours → approval rate within 2% of expected → full promotion. Total time from trained model to production: 4 hours for the team with a mature deployment pipeline."
      />

      <QBlock
        num={39}
        color="#BA7517"
        question="What is A/B testing for ML models? How is it different from a standard software A/B test?"
        plain="An A/B test sends half your users to model A (current) and half to model B (new) and measures which actually performs better in the real world. For ML models this is more complex than software A/B tests because: the metric (delivery time accuracy, fraud catch rate) requires waiting for outcomes to arrive, the same user getting different predictions in the same session can be confusing, and the statistical test for improvement is different depending on whether the metric is continuous or binary."
        technical={<>
          <p style={{ ...S.ps, marginBottom: 8 }}>ML-specific A/B test considerations:</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 4, paddingLeft: 12, marginBottom: 8 }}>
            {[
              ['Consistent routing', 'Use consistent hashing on user_id or session_id — same user always goes to same model. Never random per-request (user sees different predictions for same input in same session).'],
              ['Label delay', 'For delivery time: labels arrive 30-90 minutes after prediction. For fraud: 7-30 days. A/B test must account for the delay before declaring a winner.'],
              ['Sample size calculation', 'Use power analysis to determine required sample size given expected effect size and baseline variance. Do not peek at results before reaching required sample size (type I error inflation).'],
              ['Statistical test', 'Continuous metrics (MAE, revenue): Welch\'s t-test or Mann-Whitney U. Binary metrics (click, convert): chi-squared or Fisher\'s exact. Always one-sided (is challenger better than champion?).'],
              ['Practical significance', 'Require both statistical significance (p &lt; 0.05) AND practical significance (improvement > 1% or minimum business threshold). Statistical significance with 0.01% improvement is meaningless at scale.'],
            ].map(([name, desc]) => (
              <div key={name} style={{ fontSize: 12, color: 'var(--muted)', marginBottom: 4 }}>
                <strong style={{ color: '#BA7517' }}>{name}:</strong> {desc}
              </div>
            ))}
          </div>
        </>}
        code={`from scipy import stats
import numpy as np

# A/B test analysis: is challenger model better than champion?
champion_errors  = np.array([...])   # |prediction - actual| per request
challenger_errors = np.array([...])

# Welch's t-test (one-sided: is challenger LOWER error than champion?)
t_stat, p_two_sided = stats.ttest_ind(champion_errors, challenger_errors,
                                        equal_var=False)
p_one_sided = p_two_sided / 2 if t_stat > 0 else 1 - p_two_sided / 2

improvement = (champion_errors.mean() - challenger_errors.mean()) / champion_errors.mean() * 100

print(f"Champion MAE:     {champion_errors.mean():.4f}")
print(f"Challenger MAE:   {challenger_errors.mean():.4f}")
print(f"Improvement:      {improvement:+.2f}%")
print(f"p-value:          {p_one_sided:.4f}")
print(f"Promote:          {p_one_sided < 0.05 and improvement > 1.0}")`}
        example="Zomato ran a 14-day A/B test of a new ETA model on 10% of delivery routes (consistent hash on delivery_id). With 50,000 deliveries in each arm, the challenger showed 8.3% lower MAE (p=0.0003) — statistically and practically significant. The 14-day duration was required because the first 7 days showed high variance (weekend vs weekday traffic patterns) that stabilised in the second week."
      />

      <QBlock
        num={40}
        color="#BA7517"
        question="What is experiment tracking? What do you log and why does it matter?"
        plain="Without experiment tracking, ML experimentation is like cooking without writing down your recipes. You tried 30 different ingredient combinations over 3 months and found one that worked great — but you cannot remember exactly what you did. Experiment tracking is a lab notebook for ML: every time you train a model, it automatically records the ingredients (hyperparameters), the recipe (code version), and the result (metrics) so you can reproduce it or build on it."
        technical={<>
          <p style={{ ...S.ps, marginBottom: 8 }}>Four things to log in every experiment run:</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 4, paddingLeft: 12, marginBottom: 8 }}>
            {[
              ['Parameters', 'All hyperparameters: learning_rate=0.05, n_estimators=200, feature_set=\'v3\', data_version=\'2026-03-01\''],
              ['Metrics', 'All evaluation metrics at every epoch: train_mae, val_mae, val_r2, cv_mae, training_time_s'],
              ['Artifacts', 'The model file (model.pkl), feature importance plot, confusion matrix, requirements.txt'],
              ['Tags', 'Filterable labels: team=\'fraud-ml\', purpose=\'baseline\', status=\'production-candidate\', git_commit=\'abc123\''],
            ].map(([name, desc]) => (
              <div key={name} style={{ fontSize: 12, color: 'var(--muted)', marginBottom: 4 }}>
                <strong style={{ color: '#BA7517' }}>{name}:</strong> {desc}
              </div>
            ))}
          </div>
          <p style={{ ...S.ps, marginBottom: 0 }}>Tools: MLflow (self-hosted, MLflow Registry for model versioning, integrates with Azure ML), Weights & Biases (richer visualisations, built-in sweep agent, preferred for deep learning). Required team discipline: every run must have required tags (model_type, dataset_version, team, purpose) — enforce via a shared wrapper class that raises an error if required fields are missing. Without this discipline, the experiment tracker fills with unidentifiable 'run_1', 'test', 'final_v2' runs.</p>
        </>}
        example="CRED's credit scoring team ran 200 experiments over 6 months before deploying their current model. Without MLflow, they would have lost track of which feature set and hyperparameters produced the best result. With MLflow: they found that an experiment from 3 months ago (now archived) had the best PR-AUC — they reproduced it exactly from the logged parameters and data_version tag, updated it with newer data, and shipped it. The experiment that went to production was one the team had forgotten about."
      />

      <QBlock
        num={41}
        color="#BA7517"
        question="What is the champion-challenger model and how do you safely replace a production model?"
        plain="The champion is your current production model — the one serving real users right now. A challenger is a new model you want to replace it with. You never just swap the models — you first verify the challenger is at least as good on historical test data, then test it on a small fraction of real traffic, then gradually shift all traffic to it while ready to instantly switch back if anything goes wrong. The goal is zero risk to users during the transition."
        technical={<>
          <p style={{ ...S.ps, marginBottom: 8 }}>Five-stage safe promotion process:</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 4, paddingLeft: 12, marginBottom: 8 }}>
            {[
              ['1. Offline gate', 'Challenger MAE ≤ 1.05× champion MAE on a fixed, time-fresh holdout set. Block if worse.'],
              ['2. Shadow deployment', 'Route 100% of traffic to champion but also send requests to challenger (no user impact). After 24h, compare both on labelled requests. Block if challenger significantly worse than champion on live data.'],
              ['3. Canary test', '5-10% traffic to challenger. Monitor business metrics (conversion, complaints) for 24-48h. Block if any metric degrades.'],
              ['4. Gradual promotion', '10% → 25% → 50% → 100% with automatic rollback if p99 latency >500ms, error rate >1%, or MAE >10% above champion.'],
              ['5. Archive champion', 'After 48h at 100% challenger with no incidents, archive champion at zero replicas (kept for instant rollback for 2 weeks).'],
            ].map(([stage, desc]) => (
              <div key={stage} style={{ fontSize: 12, color: 'var(--muted)', marginBottom: 4 }}>
                <strong style={{ color: '#BA7517' }}>{stage}:</strong> {desc}
              </div>
            ))}
          </div>
          <p style={{ ...S.ps, marginBottom: 0 }}>Never delete the champion immediately — keep at zero replicas for 2 weeks. Rollback (scale champion back up, switch Service selector, scale challenger down) should be achievable in &lt;60 seconds. Always use blue-green deployment for rollback, never rolling update — rolling updates create a transient period where both models serve traffic simultaneously, which can confuse monitoring.</p>
        </>}
        example="Razorpay's fraud model is replaced monthly. The replacement process: new model trains Sunday night → Monday 6 AM shadow deployment runs for 24h → Tuesday a 5% canary runs for 48h with fraud analysts monitoring → Thursday gradual promotion to 100% over 4 hours with automated rollback if fraud capture rate drops >3%. The old model stays at zero replicas until the following Monday. In 18 months this process has never required emergency rollback."
      />

      <QBlock
        num={42}
        color="#BA7517"
        question="How do you handle a model that is degrading in production but you cannot immediately retrain?"
        plain="Sometimes you notice your model is getting worse — maybe a new product category launched, or a new fraud pattern emerged — but retraining takes a week and you need a fix now. The answer is a fallback strategy: identify the specific conditions where the model is failing, and either switch those specific cases to a simpler rule-based fallback, increase the threshold to decline more cases conservatively, or route them to human review. You manage the failure while working on the proper fix."
        technical={<>
          <p style={{ ...S.ps, marginBottom: 8 }}>Immediate mitigations in order of implementation speed:</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 4, paddingLeft: 12, marginBottom: 8 }}>
            {[
              ['Threshold adjustment (1 hour)', 'For classifiers: increase the threshold to be more conservative. Sacrifice some recall for more reliable predictions. For fraud: lower fraud score threshold to catch more (at cost of more false positives).'],
              ['Feature-based routing (1-4 hours)', 'Identify which feature values correlate with the failure mode. Route those specific inputs to a rule-based fallback or human review. E.g. new merchant_category values that the model has never seen → default rule.'],
              ['Add hard rules on top (same day)', 'ML score + rule engine. Add an emergency rule that overrides the ML model for the specific pattern causing failures.'],
              ['Rollback to previous model (1 hour)', 'If a recent model update caused the degradation, roll back to the previous champion via blue-green deployment.'],
              ['Proper fix: retrain (days-weeks)', 'Collect labelled data for the new pattern, retrain, go through the full champion-challenger process.'],
            ].map(([action, desc]) => (
              <div key={action} style={{ fontSize: 12, color: 'var(--muted)', marginBottom: 4 }}>
                <strong style={{ color: '#BA7517' }}>{action}:</strong> {desc}
              </div>
            ))}
          </div>
        </>}
        example="When Paytm launched UPI credit (a new payment type), Razorpay's fraud model had never seen this transaction type. Fraud rates for UPI credit were 3× higher than the model expected — it was scoring them as low-risk. Immediate fix (same day): added a hard rule 'if payment_type == upi_credit AND amount > 5000, multiply fraud score by 1.8'. This stopped the losses within hours. Proper fix (2 weeks later): 10,000 labelled UPI credit transactions were added to the training set and the model was retrained — the hard rule was removed."
      />

      <Div />

      {/* ══════════════════════════════════════════════════════════════════════ */}
      {/* SECTION F — ML SYSTEM DESIGN */}
      {/* ══════════════════════════════════════════════════════════════════════ */}
      <SectionHeader
        letter="F"
        title="ML System Design — Q43 to Q48"
        count="Recommendation systems, fraud detection, search ranking, two-stage retrieval, cold start, capacity estimation"
        color="#4285f4"
      />

      <QBlock
        num={43}
        color="#4285f4"
        question="How would you design a recommendation system from scratch? (e.g. Meesho product recommendations)"
        plain="A recommendation system answers: out of millions of products, which 20 should I show this specific user right now? The answer is different for every user and changes as their preferences evolve. The design challenge is doing this for 15 million daily users in under 100 milliseconds. You cannot run a complex personalisation algorithm over 50 million products for every request — you need to first narrow it down quickly, then rank carefully."
        technical={<>
          <p style={{ ...S.ps, marginBottom: 8 }}>Two-stage architecture is mandatory at scale:</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 4, paddingLeft: 12, marginBottom: 8 }}>
            {[
              ['Stage 1A — Collaborative filtering retrieval', 'Matrix factorisation (ALS) learns user and item embeddings. Approximate nearest neighbour search (Faiss) finds top-500 products similar to the user\'s embedding. ~5ms (pre-computed user embedding lookup + ANN search).'],
              ['Stage 1B — Content-based retrieval', 'CLIP image embeddings for products. Retrieve 500 visually similar products to recently viewed items. ~10ms (ANN on pre-computed product embeddings).'],
              ['Stage 1C — Trending / popularity', 'Redis sorted set of top-200 trending products per category, updated hourly. ~2ms.'],
              ['Merge + deduplicate', 'Union of ~1,200 candidates, deduplicate to 500 unique products.'],
              ['Stage 2 — Neural ranking', 'Two-tower model or LightGBM scores each (user, product) pair. Input: user features (purchase history, demographics) + product features (category, price, images). Returns top-20. ~30ms.'],
            ].map(([stage, desc]) => (
              <div key={stage} style={{ fontSize: 12, color: 'var(--muted)', marginBottom: 4 }}>
                <strong style={{ color: '#4285f4' }}>{stage}:</strong> {desc}
              </div>
            ))}
          </div>
          <p style={{ ...S.ps, marginBottom: 0 }}>Total latency: ~50ms. Cold start for new users: use popularity-based retrieval + category preferences from onboarding survey. Cold start for new products: use content-based retrieval from day 1 (CLIP embedding available immediately). Evaluation: offline — NDCG@10, MRR. Online — CTR, conversion rate, revenue per session. Retrain ranking model daily (click patterns change fast). Retrain embedding model weekly (catalogue changes slower).</p>
        </>}
        example="Meesho switched from matrix factorisation alone to the two-stage architecture with LightGBM reranking in 2023. Stage 1 takes 8ms (retrieval from Faiss ANN index). Stage 2 takes 22ms (scoring 500 candidates with LightGBM). Total 30ms. The LightGBM reranker improved CTR by 34% over the raw collaborative filtering order because it incorporated real-time signals (current user session context, inventory availability, margin targets) that the embedding model could not capture."
      />

      <QBlock
        num={44}
        color="#4285f4"
        question="How would you design a real-time fraud detection system? (e.g. Razorpay)"
        plain="Fraud detection must decide in under 50 milliseconds whether a payment is fraudulent — before the payment clears. This means the model gets one shot, with limited information, and must be wrong as rarely as possible in both directions: missing fraud is expensive, but blocking legitimate payments damages merchant relationships. The system also has an adversarial element — fraudsters study and adapt to the detection model."
        technical={<>
          <p style={{ ...S.ps, marginBottom: 6 }}>Key design decisions and their reasoning:</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 4, paddingLeft: 12, marginBottom: 8 }}>
            {[
              ['Latency budget: 50ms total', 'Payment gateway SLA. Model gets 10ms. Feature store lookup 3ms. Network + other 37ms. Forces: pre-compute slow features, use fast model (LightGBM not deep learning).'],
              ['Score not binary output', 'Output a fraud probability (0-1). Different thresholds for different transaction types and merchant categories. Rs 100 UPI needs different threshold than Rs 1L NEFT.'],
              ['Three-tier feature architecture', 'Tier 1: request features (0ms — amount, method, merchant). Tier 2: feature store lookup (3ms — user velocity, merchant fraud rate). Tier 3: computed on-the-fly (5ms — ratio features, round number flags).'],
              ['LightGBM + rule engine', 'LightGBM for learned patterns. Hard rules for known fraud signatures (specific card BINs, IP ranges, device fingerprints). Rules for new patterns detected before model is retrained.'],
              ['Adversarial retraining', 'Weekly retraining is not enough — add new fraud patterns as hard rules immediately, integrate into model next weekly retrain.'],
            ].map(([decision, desc]) => (
              <div key={decision} style={{ fontSize: 12, color: 'var(--muted)', marginBottom: 4 }}>
                <strong style={{ color: '#4285f4' }}>{decision}:</strong> {desc}
              </div>
            ))}
          </div>
          <p style={{ ...S.ps, marginBottom: 0 }}>Monitoring: transaction fraud rate (TFR) hourly. False positive rate daily (declined legitimate transactions). Feature distribution of fraud cases — new fraud cluster in previously clean region = concept drift. Labels arrive via chargebacks (7-30 days). Speed up with manual review team labelling 2% of flagged transactions same-day for fast feedback.</p>
        </>}
        example="Razorpay's system serves 1,157 peak TPS (transactions per second). Serving infrastructure: 12 pods × ml.m5.large × 100 requests/second each. Feature store: Redis cluster with 3ms p99 lookup latency, 99.99% availability. LightGBM model: 10ms p99 inference. End-to-end fraud decision: 38ms p99 at peak load, well within 50ms SLA. Fraud capture rate 91% at 0.3% false positive rate."
      />

      <QBlock
        num={45}
        color="#4285f4"
        question="What is the two-stage retrieval architecture and why is it necessary?"
        plain="If you have 50 million products and need to find the 20 most relevant for each user in 50 milliseconds, you cannot check all 50 million products. Two-stage retrieval solves this: stage 1 uses a fast, approximate method to narrow down to 500 candidates in 10 milliseconds; stage 2 uses a slow, precise method to pick the best 20 from those 500 in 30 milliseconds. The two stages together achieve both scale and quality."
        technical={<>
          <p style={{ ...S.ps, marginBottom: 8 }}>The core constraint: any ranker that requires processing a (query, item) pair takes O(n) time with respect to the catalogue size n. For n=50M, even a 1µs/item ranker takes 50 seconds per query — unusable. Two-stage solves this by applying a cheap filter to reduce n from 50M to ~500 before the expensive ranker runs.</p>
          <p style={{ ...S.ps, marginBottom: 8 }}>Stage 1 (retrieval) requirements: sub-linear time in catalogue size, handles large n (10M-1B), tolerates approximate results (not every relevant item needs to be retrieved, just enough of them). Methods: approximate nearest neighbour (Faiss IVF — O(1) lookup after index build), inverted index (BM25 for keyword matching), popularity sorted set (Redis — O(log n)).</p>
          <p style={{ ...S.ps, marginBottom: 0 }}>Stage 2 (ranking) requirements: high quality (the 20 final results must be highly relevant), can use expensive features (full user history, real-time context), can be slow (30-50ms for 500 candidates is fine). Methods: LightGBM with rich feature sets, two-tower neural model, listwise learning-to-rank (LambdaMART). The ranking model is trained offline on (user, item, click/purchase) triples using a learning-to-rank objective that optimises position-aware metrics like NDCG.</p>
        </>}
        example="Nykaa Beauty: 2M products, 5M daily users. Stage 1 retrieves 500 candidates per user via ANN on product embeddings (8ms). Stage 2 ranks them with a LightGBM model (features: user skin tone from profile, ingredient preferences, price sensitivity, seasonal trends) and returns top 24 (4 rows × 6 items per page). Running the LightGBM ranker directly over 2M products would take 20 seconds — impossible for a real-time API."
      />

      <QBlock
        num={46}
        color="#4285f4"
        question="How do you handle cold start in ML systems? (new users, new items, new merchants)"
        plain="Cold start is the 'new kid at school' problem. A new user has no history — the model cannot make personalised predictions. A new product has no click data — the model cannot rank it accurately. A new restaurant on Swiggy has no delivery time history — the model cannot estimate preparation time. You need fallback strategies that give reasonable predictions without historical data."
        technical={<>
          <p style={{ ...S.ps, marginBottom: 8 }}>Three cold start scenarios with solutions:</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 5, paddingLeft: 12, marginBottom: 8 }}>
            {[
              ['New user cold start', 'Phase 1 (0 interactions): show trending items in their location + category preferences from onboarding. Phase 2 (1-5 interactions): use content-based similarity to items they have clicked/purchased. Phase 3 (5+ interactions): switch to collaborative filtering as enough signal exists. The transition between phases should be smooth — blend collaborative and content scores with a weighting that shifts as interaction count grows.'],
              ['New item cold start', 'Compute content-based features immediately on upload: text embeddings from description, image embeddings from product photos, category from taxonomy. This enables content-based retrieval from day 1. Switch to collaborative filtering signals after the item accumulates 20+ interactions (clicks, purchases). For LLM-generated products: use the parent category popularity as initial proxy.'],
              ['New entity cold start (new restaurant, new merchant)', 'Use the statistical average for the entity type (new restaurant → city average prep time). Gather data aggressively: first 50 orders are weighted 2× for feature computation. Add uncertainty estimate: new restaurant prediction has ±10 min confidence interval vs ±5 min for established restaurant.'],
            ].map(([scenario, solution]) => (
              <div key={scenario} style={{ fontSize: 12, color: 'var(--muted)', marginBottom: 6 }}>
                <strong style={{ color: '#4285f4' }}>{scenario}:</strong> {solution}
              </div>
            ))}
          </div>
        </>}
        example="Swiggy's delivery time model for a new restaurant starting day 1: uses the city's median prep time (22 minutes) + distance × 5.5 minutes + peak_hour_flag × 7 minutes. After 10 completed orders, a Bayesian update blends the city prior with observed prep times for that restaurant. After 50 orders, the model uses the restaurant's own historical data entirely. The transition avoids showing absurd ETAs on day 1 while converging to accurate restaurant-specific predictions within a week."
      />

      <QBlock
        num={47}
        color="#4285f4"
        question="How do you estimate the compute and infrastructure required for an ML serving system?"
        plain="Before you build, you need to know how much it will cost and how many servers you need. This comes down to: how many predictions per second at peak, how long does one prediction take, and how many servers does that require? Then you multiply by cost per server and add a safety margin for spikes. Getting this wrong means either your system crashes under peak load or you pay for idle servers all month."
        technical={<>
          <p style={{ ...S.ps, marginBottom: 6 }}>Capacity estimation framework:</p>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: 12, lineHeight: 2.2, paddingLeft: 12, marginBottom: 8, color: 'var(--muted)' }}>
            <div>1. Peak RPS = DAU × sessions_per_user × requests_per_session / peak_hour_duration_s</div>
            <div>   e.g. Swiggy: 10M DAU × 3 sessions × 2 requests / 3600s = 16,666 RPS average</div>
            <div>   Peak factor: 5-10× → 83,000-166,000 peak RPS</div>
            <div style={{ height: 8 }} />
            <div>2. Single-request latency = feature_store_lookup + model_inference + network</div>
            <div>   e.g. 5ms + 10ms + 5ms = 20ms per prediction</div>
            <div style={{ height: 8 }} />
            <div>3. Throughput per pod = 1000ms / request_latency_ms</div>
            <div>   e.g. 1000 / 20 = 50 predictions/s per single-threaded pod</div>
            <div style={{ height: 8 }} />
            <div>4. Pods needed = peak_RPS / throughput_per_pod × 1.5 (safety margin)</div>
            <div>   e.g. Swiggy: 166,000 / 50 × 1.5 = ~5,000 pods</div>
            <div style={{ height: 8 }} />
            <div>5. Cost = pods × cost_per_pod_per_hour × peak_hours_per_month</div>
          </div>
          <p style={{ ...S.ps, marginBottom: 0 }}>Reality check: at 5,000 pods Swiggy would go bankrupt. Real solutions: async prediction (pre-compute ETAs for likely orders in advance), model optimisation (reduce inference from 10ms to 1ms with quantisation), caching (same (restaurant, driver, location) tuple seen multiple times — cache for 30 seconds), batching (GPU batching lets one GPU serve 50 requests simultaneously at 5ms each vs 50×10ms = 500ms without batching).</p>
        </>}
        example="Razorpay's fraud system: 10M transactions/day = 116 avg TPS, 1,160 peak TPS (10× factor during Diwali). Model inference: 10ms. Feature store: 3ms. Total: ~15ms. Throughput per pod: 1000/15 = 67 RPS. Pods needed: 1160/67 × 1.5 = 26 pods (ml.m5.large on SageMaker). Monthly cost at 80% utilisation: 26 pods × $0.192/hr × 730 hr × 0.8 = ~$2,900/month for the serving infrastructure."
      />

      <QBlock
        num={48}
        color="#4285f4"
        question="What are the most common failure modes in ML systems and how do you design against them?"
        plain="ML systems fail in ways that are invisible and silent — unlike software bugs that produce error messages, a degraded ML model just produces worse predictions while looking fine to the infrastructure. The most dangerous failures are the ones where the system appears healthy but is confidently wrong. Designing against this requires explicit checkpoints at every stage to verify not just that the system is running but that it is producing correct outputs."
        technical={<>
          <p style={{ ...S.ps, marginBottom: 6 }}>Eight failure modes and their countermeasures:</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 4, paddingLeft: 12, marginBottom: 8 }}>
            {[
              ['Silent model degradation', 'Drift monitoring with automated alerts. Weekly holdout evaluation. Business metric monitoring (not just technical metrics).'],
              ['Training-serving skew', 'Feature store with single computation definition. Integration tests that verify feature values match between training and serving.'],
              ['Data pipeline failure', 'Feature freshness monitoring — alert if features are stale (>2h for real-time features). Serve from cache with explicit staleness flag.'],
              ['Model loading failure', 'Readiness probe that checks model is loaded before routing traffic. Fallback: rule-based prediction if model unavailable.'],
              ['Feedback loop (self-reinforcing bias)', 'Model influences the data it is trained on (fraud model causes certain patterns to disappear, appearing to reduce fraud rate). Counterfactual logging: randomly allow some flagged transactions to proceed to gather ground truth on model errors.'],
              ['Distribution shift at extremes', 'Model performs well on average but badly on high-value transactions. Stratified evaluation: measure separately for high/medium/low value, new/existing users, different geographies.'],
              ['Adversarial inputs', 'For fraud: fraudsters craft inputs to score below threshold. Countermeasure: do not publish model scores to external APIs. Retrain weekly to stay ahead of adaptation.'],
              ['Cascade failure', 'ML system failure triggers fallback which causes high latency which triggers timeout which causes 503s to users. Design: fast synchronous fallback rule (always available, never times out) + async ML model. Never let ML system failure block the core user action.'],
            ].map(([mode, counter]) => (
              <div key={mode} style={{ fontSize: 12, color: 'var(--muted)', marginBottom: 4 }}>
                <strong style={{ color: '#4285f4' }}>{mode}:</strong> {counter}
              </div>
            ))}
          </div>
        </>}
        example="Swiggy's delivery time prediction service uses a three-tier fallback: (1) ML model — 38ms, used when healthy. (2) Cached prediction from 5 minutes ago — 1ms, used when ML is degraded. (3) Rule-based formula (distance × 6 + 15 + peak_bonus) — 0ms, used when cache is stale. The rule-based fallback has never caused a user to see an error. The fallback tiers are tested monthly by intentionally killing the ML service in staging and verifying the fallback chain triggers correctly."
      />

      <Div />

      {/* ══════════════════════════════════════════════════════════════════════ */}
      {/* SECTION G — STATISTICS */}
      {/* ══════════════════════════════════════════════════════════════════════ */}
      <SectionHeader
        letter="G"
        title="Statistics — Q49 to Q50"
        count="Correlation vs causation, p-values and A/B testing"
        color="#888"
      />

      <QBlock
        num={49}
        color="#888"
        question="What is the difference between correlation and causation? Why does it matter for ML?"
        plain="Ice cream sales and drowning deaths are highly correlated — they both spike in summer. But eating ice cream does not cause drowning. The real cause is hot weather, which causes both. In ML, a model might use ice cream sales to predict drowning risk and achieve great accuracy in historical data — but then make nonsensical predictions in winter, and any intervention based on the model (ban ice cream to reduce drowning) would be completely wrong."
        technical={<>
          <p style={{ ...S.ps, marginBottom: 8 }}>Correlation: a statistical relationship between two variables — when one changes, the other tends to change. Pearson's r measures linear correlation. Correlation can arise from: direct causation (A causes B), reverse causation (B causes A), common cause (C causes both A and B — confounding), coincidence (spurious correlation in finite samples).</p>
          <p style={{ ...S.ps, marginBottom: 8 }}>Why it matters for ML: ML models find correlations in training data. If training data contains confounders that are present during training but not at deployment, the model will be wrong. Classic example: a hospital mortality prediction model showed patients in ICU had lower predicted mortality than ER patients — because ICU patients received better care (a confounder). Deploying this model to allocate care would harm patients.</p>
          <p style={{ ...S.ps, marginBottom: 0 }}>Causation requires: temporality (cause precedes effect), correlation, no alternative explanation, plausible mechanism. Establishing causation: randomised controlled trials (A/B tests with random assignment), instrumental variables, difference-in-differences, propensity score matching. ML models predict well without causation but only support causal interventions when causation is established. In practice: use ML for prediction, use causal inference tools for decisions that involve changing the world.</p>
        </>}
        example="Nykaa's data team found that users who purchased face serum were 3× more likely to purchase sunscreen the next month (correlation). They added serum-to-sunscreen cross-sell recommendations. But when they tried the reverse (sunscreen → serum recommendations), conversion was near zero. The causal direction was serum first, then sunscreen — not symmetric. Understanding directionality (cause) not just association (correlation) was essential for the recommendation logic."
      />

      <QBlock
        num={50}
        color="#888"
        question="What is a p-value? What does it mean and what does it NOT mean?"
        plain="You flip a coin 10 times and get 8 heads. Is the coin biased? A p-value answers: 'if the coin were fair, how likely would we be to see 8 or more heads just by chance?' If that probability is very low (say 3%), the p-value is 0.03. A low p-value means 'this result is unlikely to have occurred by chance under the assumption that nothing is real.' It does NOT mean the effect is large, important, or that you have proved anything — it just means the result is unlikely to be noise."
        technical={<>
          <p style={{ ...S.ps, marginBottom: 8 }}>P-value = P(observed result OR more extreme | H₀ is true), where H₀ is the null hypothesis (typically: no difference, no effect). P-value is NOT the probability that H₀ is true. P-value is NOT the probability that the result is a false positive. These are common and consequential misinterpretations.</p>
          <p style={{ ...S.ps, marginBottom: 8 }}>The significance threshold α (typically 0.05) is a convention, not a law of nature. P &lt; 0.05 means: if H₀ were true, the probability of seeing this result is less than 5%. Setting α=0.05 means accepting a 5% false positive rate. Practical issues in ML A/B testing:</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 4, paddingLeft: 12, marginBottom: 8 }}>
            {[
              ['Multiple comparisons', 'Testing 20 metrics with α=0.05 → expected 1 false positive even if nothing is real. Correction: Bonferroni (divide α by number of tests) or FDR control.'],
              ['Peeking', 'Checking p-values repeatedly as data accumulates inflates the false positive rate. Either set a fixed sample size before starting or use sequential testing methods.'],
              ['Effect size vs significance', 'With large n, tiny meaningless differences become statistically significant. Always report effect size (Cohen\'s d for means, relative lift percentage) alongside p-value.'],
              ['Practical significance', 'A 0.1% MAE improvement may be statistically significant with 10M samples but economically irrelevant. Require both statistical significance AND practical significance threshold.'],
            ].map(([issue, desc]) => (
              <div key={issue} style={{ fontSize: 12, color: 'var(--muted)', marginBottom: 4 }}>
                <strong style={{ color: '#888' }}>{issue}:</strong> {desc}
              </div>
            ))}
          </div>
        </>}
        code={`from scipy import stats
import numpy as np

# Two-sample t-test for A/B test
control   = np.array([...])    # delivery times, group A (champion)
treatment = np.array([...])    # delivery times, group B (challenger)

t_stat, p_value = stats.ttest_ind(control, treatment, equal_var=False)

# Effect size (Cohen's d)
pooled_std = np.sqrt((control.std()**2 + treatment.std()**2) / 2)
cohens_d   = (control.mean() - treatment.mean()) / pooled_std

# Relative improvement
lift_pct = (control.mean() - treatment.mean()) / control.mean() * 100

print(f"p-value:     {p_value:.4f}")
print(f"Cohen's d:   {cohens_d:.4f}   (0.2=small, 0.5=medium, 0.8=large)")
print(f"Lift:        {lift_pct:+.2f}%")
print(f"Conclusion:  {'Reject H₀' if p_value < 0.05 else 'Fail to reject H₀'}")
print(f"Practical:   {'Meaningful improvement' if lift_pct > 1.0 else 'Too small to matter'}")`}
        example="Razorpay ran an A/B test of a new fraud model on 100,000 transactions per arm (a 2-week test). Result: p-value = 0.0002 (highly significant). Fraud capture rate improvement: 0.3 percentage points (from 91.0% to 91.3%). The team correctly noted that while statistically significant, 0.3pp at current transaction volume saves approximately ₹2 crore/month in fraud losses — large enough to justify the deployment complexity. Both the statistical test and the business impact calculation were required to make the decision."
      />

      <Div />

      {/* ══ FINAL SECTION ══════════════════════════════════════════════════════ */}
      <div style={{ paddingBottom: 48, paddingTop: 8 }}>
        <span style={S.tag}>The complete AI/ML track is done</span>
        <h2 style={S.h2}>
          80 modules. 10 sections. Every concept from linear regression to
          production agents, from NumPy to Vertex AI. You are ready.
        </h2>
        <p style={S.p}>
          This module completes the Chaduvuko AI/ML track. Every concept in these
          50 questions links back to a module where it was taught from scratch with
          code, analogies, and Indian company examples. If any answer here felt
          unfamiliar, the module number that covers it in depth is linked in the
          track curriculum. Go back, read it, build the code, then return here.
          Knowing an answer is not the same as being able to teach it — and
          the best interview preparation is being able to teach every concept
          on this list to someone who has never heard of it.
        </p>
      </div>

      <KeyTakeaways
        items={[
          'Two answers for every question: Plain English (for PMs, engineering managers, and non-ML interviewers — no jargon, pure intuition with an analogy) and Technical depth (for senior ML engineers — precise terminology, formulas, tradeoffs). Real panel interviews always have both types of interviewers present. Practice both answers for every question.',
          'The most underestimated interview topic is MLOps and production (Section E). Most candidates prepare only model theory and ML algorithms. Interviewers at Swiggy, Flipkart, and Razorpay report that candidates fail most often on: training-serving skew (what it is and how to prevent it), champion-challenger deployment (how to safely replace a production model), and monitoring (what drifts and how you detect it without labels).',
          'For ML system design questions (Section F), always follow the eight-question framework: problem framing → data → features → model → serving → scale → monitoring → failure modes. Never jump to model selection before answering the first four. Interviewers score "asked the right clarifying questions" and "gave numbers for scale" as explicit criteria.',
          'Three concepts that appear across every interview regardless of level: overfitting and how to fix it (Q3), precision vs recall tradeoff and when to optimise for each (Q15), and training-serving skew (Q35). If you can explain these three clearly with a real company example, you will pass the bar for most roles.',
          'Statistics questions (Section G) are asked more than candidates expect. The most common: p-value misinterpretation (p-value is NOT the probability H₀ is true — it is the probability of the observed result if H₀ were true), A/B test design errors (sample size calculation, peeking, multiple comparisons), and correlation vs causation in the context of why an ML model that works historically might fail after an intervention.',
          'The best preparation strategy: for each of these 50 questions, write your own answer in one sentence before reading the answer here. The gap between your sentence and the full answer is exactly what you need to study. Repeat weak questions until you can explain them without reading — ideally by teaching them to someone else, which forces clarity that silent memorisation never produces.',
        ]}
      />
    </LearnLayout>
  )
}
