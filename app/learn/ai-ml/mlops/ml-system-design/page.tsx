import type { Metadata } from 'next'
import { LearnLayout } from '@/components/content/LearnLayout'
import { Callout } from '@/components/content/Callout'
import { KeyTakeaways } from '@/components/content/KeyTakeaways'
import MLPageHeader from '@/components/content/MLPageHeader'

export const metadata: Metadata = {
  title: 'ML System Design — End to End — Chaduvuko',
  description:
    'Design any ML system from scratch. The framework, tradeoffs, capacity estimation, and how to present it in a senior ML engineering interview.',
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

export default function MLSystemDesignPage() {
  return (
    <LearnLayout
      title="ML System Design — End to End"
      description="Design any ML system from scratch. The framework, tradeoffs, capacity estimation, and how to present it in a senior ML engineering interview."
      section="MLOps and Production"
      readTime="60–75 min"
      updatedAt="March 2026"
    >
      <MLPageHeader section="mlops" topic="ml-system-design" />

      {/* ══ SECTION 1 — THE FRAMEWORK ══════════════════════════════════════════ */}
      <div style={S.sec}>
        <span style={S.tag}>The universal structure</span>
        <h2 style={S.h2}>
          Every ML system design problem has the same eight questions.
          Answer them in order and you will never miss a critical component.
        </h2>

        <p style={S.p}>
          ML system design interviews — and real ML architecture discussions —
          feel open-ended and overwhelming. You are handed a problem like
          "design Swiggy's delivery time prediction system" and expected to
          produce a coherent architecture in 45 minutes. Without a framework
          you will either forget something important or spend 30 minutes
          on model selection when the interviewer cares about serving infrastructure.
        </p>

        <p style={S.p}>
          The framework below is not a rigid script — it is a checklist of the
          questions every ML system must answer. Work through them in order.
          Each answer constrains the next. The latency requirement determines
          whether you can use online or batch serving. The scale requirement
          determines whether you need a feature store. The feedback loop
          determines how you detect drift. By the time you have answered all
          eight you have a complete architecture.
        </p>

        <ConceptBox title="Eight questions — answer in this order every time" color="#1D9E75">
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {[
              { n: '1', q: 'Problem framing', detail: 'What ML task exactly? What is the business metric? What does success look like?' },
              { n: '2', q: 'Data', detail: 'What data exists? How much? How is it labelled? What are the data quality issues?' },
              { n: '3', q: 'Features', detail: 'What features matter? How are they computed? Point-in-time correctness needed?' },
              { n: '4', q: 'Model', detail: 'Which model family? Why? What are the tradeoffs vs simpler baselines?' },
              { n: '5', q: 'Serving', detail: 'Online or batch? What latency? How many RPS? How do features reach the model at inference?' },
              { n: '6', q: 'Scale', detail: 'How many predictions per day? Peak load? Storage requirements? Cost per prediction?' },
              { n: '7', q: 'Monitoring', detail: 'What drifts? How is it detected? When is retraining triggered?' },
              { n: '8', q: 'Failure modes', detail: 'What breaks first? What is the fallback when the model is unavailable?' },
            ].map((item) => (
              <div key={item.n} style={{
                display: 'grid', gridTemplateColumns: '24px 160px 1fr',
                gap: 10, background: 'var(--bg2)',
                borderRadius: 4, padding: '7px 10px',
              }}>
                <span style={{ fontSize: 12, fontWeight: 700, color: '#1D9E75', fontFamily: 'var(--font-mono)' }}>{item.n}.</span>
                <span style={{ fontSize: 12, fontWeight: 700, color: 'var(--text)' }}>{item.q}</span>
                <span style={{ fontSize: 11, color: 'var(--muted)' }}>{item.detail}</span>
              </div>
            ))}
          </div>
        </ConceptBox>

        <AnalogyBox>
          <p style={{ ...S.p, marginBottom: 8 }}>
            An architect designing a building does not start by choosing
            the colour of the walls. They start with: who lives here,
            how many people, what activities happen inside, what is the
            budget, what are the structural constraints of the land.
            The colour comes last. ML system design is the same — the model
            choice (colour of the walls) comes after you understand the
            data availability, latency requirements, and scale constraints.
            Most candidates start with model selection and never get to
            the questions that actually determine system feasibility.
          </p>
          <p style={{ ...S.ps, marginBottom: 0, color: '#00e676' }}>
            In ML system design interviews, an interviewer would rather see
            you ask the right clarifying questions than immediately jump to
            "I would use a Transformer." The right questions demonstrate
            systems thinking. The immediate model answer demonstrates
            pattern matching.
          </p>
        </AnalogyBox>
      </div>

      <Div />

      {/* ══ SECTION 2 — CASE STUDY 1: DELIVERY TIME ════════════════════════════ */}
      <div style={S.sec}>
        <span style={S.tag}>Case study 1 — Swiggy</span>
        <h2 style={S.h2}>Design Swiggy's delivery time prediction system — full walkthrough</h2>

        <p style={S.p}>
          This is the most commonly asked ML design question in Indian interviews.
          Delivery time estimation appears at Swiggy, Zomato, Dunzo, Blinkit,
          and every quick-commerce startup. Walk through all eight questions.
        </p>

        <VisualBox label="Question 1 — Problem framing">
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 12, lineHeight: 2 }}>
              <div style={{ color: '#888', fontSize: 11, marginBottom: 4 }}>Clarifying questions to ask:</div>
              {[
                ['Is this shown to customers pre-order, in-flight, or both?', 'Pre-order (ordering decision) AND in-flight (tracking page) — two separate models'],
                ['What is the business metric?', 'Customer-visible accuracy: % of orders within ±5 min of prediction'],
                ['What counts as success?', 'Currently showing "30-40 min" static ranges — model should beat this'],
                ['Is underestimating or overestimating worse?', 'Underestimating (promising 20 min, delivering in 40) is worse — customer anger'],
              ].map(([q, a]) => (
                <div key={q} style={{ marginBottom: 6 }}>
                  <div style={{ color: '#7b61ff' }}>Q: {q}</div>
                  <div style={{ color: '#1D9E75', paddingLeft: 16 }}>→ {a}</div>
                </div>
              ))}
            </div>
            <div style={{ background: 'var(--surface)', borderRadius: 5, padding: '8px 12px', fontSize: 11 }}>
              <strong style={{ color: '#1D9E75' }}>ML task:</strong>
              <span style={{ color: 'var(--muted)' }}> Regression — predict delivery time in minutes. Target: MAE {'<'} 5 min, within-5-min rate {'>'} 70%.</span>
            </div>
          </div>
        </VisualBox>

        <VisualBox label="Question 2 — Data">
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            {[
              { source: 'Historical orders', detail: '200M+ completed orders with actual delivery time. Labels available immediately after delivery.', quality: 'Good — but outliers from cancelled/redelivered orders need filtering' },
              { source: 'Real-time GPS', detail: 'Driver location updated every 30s. Route data, current speed, traffic.', quality: 'High volume, requires streaming infrastructure' },
              { source: 'Restaurant data', detail: 'Prep time per restaurant, kitchen capacity, average acceptance time.', quality: 'Partially available — new restaurants have no history' },
              { source: 'External signals', detail: 'Weather API, traffic APIs, public holiday calendar, event data.', quality: 'Low latency required at serving time' },
            ].map((item) => (
              <div key={item.source} style={{
                display: 'grid', gridTemplateColumns: '160px 1fr 1fr', gap: 10,
                background: 'var(--surface)', borderRadius: 4, padding: '6px 10px',
              }}>
                <span style={{ fontSize: 11, fontWeight: 700, color: '#D85A30' }}>{item.source}</span>
                <span style={{ fontSize: 11, color: 'var(--muted)' }}>{item.detail}</span>
                <span style={{ fontSize: 11, color: '#BA7517', fontStyle: 'italic' }}>{item.quality}</span>
              </div>
            ))}
          </div>
        </VisualBox>

        <VisualBox label="Question 3 — Features (what, and where computed)">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 12 }}>
            {[
              {
                group: 'Order features',
                color: '#378ADD',
                features: ['distance_km (pickup→delivery)', 'order_value', 'n_items', 'has_special_instructions'],
              },
              {
                group: 'Restaurant features (pre-computed)',
                color: '#7b61ff',
                features: ['avg_prep_time_15min', 'current_queue_length', 'acceptance_rate_1h', 'peak_hour_multiplier'],
              },
              {
                group: 'Driver features (pre-computed)',
                color: '#1D9E75',
                features: ['driver_avg_speed_30min', 'driver_distance_to_restaurant', 'driver_active_orders', 'driver_historical_mae'],
              },
              {
                group: 'Context features',
                color: '#D85A30',
                features: ['is_peak_hour', 'day_of_week', 'weather_condition', 'nearby_events'],
              },
              {
                group: 'Real-time signals',
                color: '#BA7517',
                features: ['current_traffic_index', 'restaurant_wait_estimate', 'payment_processing_time'],
              },
              {
                group: 'Cold start handling',
                color: '#888',
                features: ['new_restaurant: use city average', 'new_driver: use city median', 'missing weather: use seasonal average'],
              },
            ].map((item) => (
              <div key={item.group} style={{
                background: 'var(--surface)', border: `1px solid ${item.color}25`,
                borderRadius: 6, padding: '9px 10px',
                borderLeft: `3px solid ${item.color}`,
              }}>
                <div style={{ fontSize: 10, fontWeight: 700, color: item.color, marginBottom: 6, fontFamily: 'var(--font-mono)' }}>
                  {item.group}
                </div>
                {item.features.map((f) => (
                  <div key={f} style={{ fontSize: 10, color: 'var(--muted)', marginBottom: 2 }}>→ {f}</div>
                ))}
              </div>
            ))}
          </div>
        </VisualBox>

        <VisualBox label="Questions 4-8 — Model, Serving, Scale, Monitoring, Failure modes">
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {[
              {
                q: '4. Model',
                color: '#7b61ff',
                answer: 'LightGBM for the main model — fast inference (< 1ms), handles missing values, good on tabular data. Separate models per city initially, unified with city as a feature at scale. Simple rule-based fallback: (distance × 6) + restaurant_avg_prep_time.',
                tradeoff: 'Deep learning (LSTM for sequence) would capture GPS trajectory better but 100× slower to train and deploy. LightGBM gets 90% of the quality at 1% of the complexity.',
              },
              {
                q: '5. Serving',
                color: '#D85A30',
                answer: 'Online serving required — prediction must be made at order-placement time. Latency budget: 100ms total, model gets 20ms. Feature store (Redis) for pre-computed restaurant/driver features: 1ms lookup. Fresh features (GPS, traffic) fetched in parallel: 10ms.',
                tradeoff: 'Batch pre-computation of predictions is not viable — too many (restaurant, driver, destination) combinations to pre-compute. Must be online.',
              },
              {
                q: '6. Scale',
                color: '#1D9E75',
                answer: '5M orders/day = 58 orders/second average. Peak (8 PM): 10× = 580 RPS. Each prediction: 20ms model + 30ms feature fetch = 50ms. 30 replicas × 20 RPS/replica handles peak. Feature store: 580 × 5 features = 2,900 Redis reads/second (trivial for Redis).',
                tradeoff: 'At 580 RPS with 50ms latency, 30 pods × 0.5 CPU each = 15 CPU cores. Feature store cache hit rate must be >99% to meet latency SLO.',
              },
              {
                q: '7. Monitoring',
                color: '#378ADD',
                answer: 'Primary metric: within-5-min rate, computed hourly with 1h delivery delay. Feature drift: distance_km, peak_hour distribution monitored daily with PSI. Labels available 30-90 min after prediction. Retrain weekly or when within-5-min rate drops 5pp.',
                tradeoff: 'Cannot use prediction accuracy as real-time signal — need to wait for delivery completion. Use prediction distribution as leading indicator.',
              },
              {
                q: '8. Failure modes',
                color: '#BA7517',
                answer: 'Feature store down → use request features only + restaurant/driver averages from config. Model serving down → rule-based fallback (distance × 6 + 15 min). Data pipeline stale → detect via feature staleness check at serving time, switch to fallback.',
                tradeoff: 'Rule-based fallback showing "25-35 min" is always better than showing nothing or an error. Degrade gracefully — never block order placement due to ML unavailability.',
              },
            ].map((item) => (
              <div key={item.q} style={{
                background: 'var(--surface)', border: `1px solid ${item.color}25`,
                borderRadius: 7, padding: '10px 12px',
                borderLeft: `3px solid ${item.color}`,
              }}>
                <div style={{ fontSize: 12, fontWeight: 700, color: item.color, marginBottom: 5 }}>{item.q}</div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
                  <p style={{ ...S.ps, marginBottom: 0, fontSize: 11 }}>{item.answer}</p>
                  <div style={{ fontSize: 11, color: item.color, fontStyle: 'italic' }}>Tradeoff: {item.tradeoff}</div>
                </div>
              </div>
            ))}
          </div>
        </VisualBox>
      </div>

      <Div />

      {/* ══ SECTION 3 — CASE STUDY 2: FRAUD DETECTION ══════════════════════════ */}
      <div style={S.sec}>
        <span style={S.tag}>Case study 2 — Razorpay</span>
        <h2 style={S.h2}>Design Razorpay's real-time fraud detection system</h2>

        <p style={S.p}>
          Fraud detection is fundamentally different from delivery time prediction.
          The class imbalance is extreme (0.1% fraud rate). The cost asymmetry
          is severe (false negative = fraud loss, false positive = legitimate
          transaction declined = customer anger + lost revenue). Latency is
          critical — the prediction must complete before the payment clears.
          And the adversary is adaptive — fraudsters study and evade every model.
        </p>

        <CodeBlock code={`# ── Fraud detection system design — capacity and tradeoff analysis ───

# Question 1: Problem framing
print("PROBLEM FRAMING")
print("=" * 55)
print("""
ML task:     Binary classification — fraud vs legitimate
             Output: fraud probability score (0-1), not binary
             Thresholds set by risk team based on business cost

Business metric:
  Primary:   Transaction fraud rate (TFR) — fraud_amount / total_amount
  Secondary: False positive rate (FPR) — declined_legitimate / all_legitimate

Why score not binary:
  Different thresholds for different transaction types:
  - Low value UPI (< Rs 500): high threshold (0.95) — FP very costly
  - High value bank transfer (> Rs 1L): low threshold (0.30) — FN very costly
  - International: medium threshold (0.60)
""")

# Question 6: Scale (do this early for fraud — it's the key constraint)
print("SCALE ANALYSIS")
print("=" * 55)

transactions_per_day = 10_000_000        # 10M transactions/day
peak_tps             = transactions_per_day / 86400 * 10   # 10× peak = ~1,157 TPS
fraud_rate           = 0.001             # 0.1% = 10,000 fraud transactions/day

print(f"Transaction volume:  {transactions_per_day:,}/day = {transactions_per_day/86400:.0f} avg TPS")
print(f"Peak TPS:            {peak_tps:.0f} TPS  (10× peak factor)")
print(f"Expected fraud:      {int(transactions_per_day * fraud_rate):,} transactions/day")
print(f"Latency budget:      < 50ms total  (before payment clears)")
print(f"Model budget:        < 10ms  (50ms - feature fetch - network)")

# Capacity for 1,157 TPS at 10ms each:
import math
model_time_ms    = 10
replicas_needed  = math.ceil(peak_tps * model_time_ms / 1000)
print(f"\nReplicas needed:     {replicas_needed} pods × (1000ms/10ms) = handles {1000//model_time_ms} RPS each")

# Question 3: Features — three tiers by computation cost
print("\nFEATURE TIERS")
print("=" * 55)
feature_tiers = {
    'Tier 1 — Request (0ms)': [
        'transaction_amount', 'merchant_category', 'payment_method',
        'device_fingerprint', 'ip_address', 'billing_zip',
        'hour_of_day', 'is_international',
    ],
    'Tier 2 — Feature Store (1-3ms Redis)': [
        'user_7d_transaction_count', 'user_7d_total_spend',
        'user_30d_distinct_merchants', 'user_30d_avg_amount',
        'merchant_fraud_rate_30d', 'ip_country_mismatch_flag',
        'velocity_1h_amount', 'device_new_flag',
    ],
    'Tier 3 — Computed (5ms, parallel)': [
        'transaction_vs_user_avg_ratio',   # txn / user 30d avg
        'amount_round_number_flag',         # Rs 10000.00 exact
        'time_since_last_transaction_s',
        'distance_from_last_merchant_km',
    ],
}
for tier, features in feature_tiers.items():
    print(f"\n  {tier}:")
    for f in features:
        print(f"    → {f}")

# Question 4: Model — why an ensemble
print("\nMODEL SELECTION")
print("=" * 55)
print("""
Primary:  LightGBM score (tabular features, fast, interpretable)
          Trained on 6-month rolling window
          Feature importance for regulatory compliance (RBI audit)

Secondary: Rule engine running in parallel (100% recall for known patterns)
           Hard rules: velocity limits, blacklisted IPs, blocked BINs
           Soft rules: unusual merchant for user, odd hours

Output: max(lgbm_score, rule_score) → final risk score

Why not deep learning:
  - Regulatory: RBI requires explainability for declined transactions
  - Latency: transformer inference > 50ms for tabular data
  - Data: 0.1% fraud rate with 10M daily → only 10k fraud labels/day
    LightGBM is far more data-efficient than deep learning for this

Class imbalance handling:
  - scale_pos_weight=999 in LightGBM (ratio of negatives to positives)
  - Focal loss as alternative: penalises easy negatives more
  - Evaluation: precision-recall AUC not ROC-AUC (imbalanced classes)
""")

# Question 7: Monitoring — adversarial drift is the hardest problem
print("MONITORING — ADVERSARIAL DRIFT")
print("=" * 55)
print("""
Normal drift: feature distributions shift gradually (monthly retraining)
Adversarial drift: fraudsters adapt to the model within DAYS

Detection:
  - Monitor fraud rate per merchant category hourly
  - Monitor false positive rate daily (declined legit transactions)
  - Monitor feature distribution of FRAUD transactions (not all)
    → New fraud pattern appears as a cluster in a previously clean region

Response:
  - New fraud pattern detected → add hard rule IMMEDIATELY (same day)
  - Retrain model weekly with new fraud samples
  - Deploy rule before model update — rules are instant, models take days

Feedback loop:
  - Chargebacks confirm fraud (7-30 day delay)
  - Merchant disputes confirm false positives (same day)
  - Manual review team labels 2% of flagged transactions same-day
    → Creates fast label feedback for concept drift detection
""")`} />
      </div>

      <Div />

      {/* ══ SECTION 4 — CASE STUDY 3: RECOMMENDATION ═══════════════════════════ */}
      <div style={S.sec}>
        <span style={S.tag}>Case study 3 — Meesho</span>
        <h2 style={S.h2}>Design Meesho's product recommendation system — two-stage retrieval</h2>

        <p style={S.p}>
          Recommendation systems are the third most common ML design question
          after delivery time and fraud. The key insight almost every candidate
          misses: you cannot run a complex ranking model over 50 million products.
          The two-stage architecture — fast retrieval of 100-500 candidates,
          then expensive ranking of just those candidates — is how every
          production recommendation system works at scale.
        </p>

        <VisualBox label="Two-stage recommendation architecture — retrieval then ranking">
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {[
              {
                stage: 'Stage 1A — Collaborative Filtering (ALS/Matrix Factorisation)',
                color: '#378ADD',
                input: 'User ID',
                output: '500 products the user might like based on behaviour similarity',
                latency: '< 5ms (pre-computed user embedding lookup)',
                method: 'Approximate nearest neighbour search on user embedding vs product embeddings. Faiss index.',
              },
              {
                stage: 'Stage 1B — Content-based (CLIP embeddings)',
                color: '#7b61ff',
                input: 'User recent views + search query',
                output: '500 visually/semantically similar products',
                latency: '< 10ms (ANN on pre-computed product embeddings)',
                method: 'CLIP product image embeddings indexed in Faiss. Query with viewed product embeddings.',
              },
              {
                stage: 'Stage 1C — Trending / Popularity',
                color: '#D85A30',
                input: 'User category preferences + location',
                output: '200 trending products in user\'s preferred categories',
                latency: '< 2ms (Redis sorted set lookup)',
                method: 'Hourly batch job computes trending score per category. Redis stores top-200 per category.',
              },
              {
                stage: 'Merge + Deduplicate',
                color: '#888',
                input: '1,200 candidate products (with duplicates)',
                output: '500 unique candidates',
                latency: '< 1ms',
                method: 'Union of all candidate sets, deduplicate by product_id, score by source count.',
              },
              {
                stage: 'Stage 2 — Neural Ranking Model',
                color: '#1D9E75',
                input: '500 candidates + user context + product features',
                output: 'Top 20 personalised products with predicted CTR',
                latency: '< 30ms',
                method: 'Two-tower model or gradient boosting on (user, product) pairs. Trained on click/purchase labels.',
              },
            ].map((item) => (
              <div key={item.stage} style={{
                background: 'var(--surface)', border: `1px solid ${item.color}25`,
                borderRadius: 6, padding: '9px 12px',
                borderLeft: `3px solid ${item.color}`,
              }}>
                <div style={{ fontSize: 11, fontWeight: 700, color: item.color, marginBottom: 5 }}>{item.stage}</div>
                <div style={{ display: 'grid', gridTemplateColumns: '80px 80px 1fr 80px', gap: 8, fontSize: 11 }}>
                  <div><span style={{ color: item.color }}>In: </span><span style={{ color: 'var(--muted)' }}>{item.input}</span></div>
                  <div><span style={{ color: item.color }}>Out: </span><span style={{ color: 'var(--muted)' }}>{item.output.substring(0, 25)}…</span></div>
                  <div style={{ color: 'var(--muted)' }}>{item.method}</div>
                  <div style={{ color: item.color, textAlign: 'right' as const }}>{item.latency}</div>
                </div>
              </div>
            ))}
          </div>
        </VisualBox>

        <CodeBlock code={`# ── Recommendation system capacity analysis ───────────────────────────
print("MEESHO RECOMMENDATION SCALE ANALYSIS")
print("=" * 55)

# User and product scale
dau           = 15_000_000   # 15M daily active users
products      = 50_000_000   # 50M products in catalogue
sessions_per_user = 3        # avg 3 sessions per day per DAU
recs_per_session = 4         # recommendation requests per session
total_rps = dau * sessions_per_user * recs_per_session / 86400

print(f"DAU:                    {dau/1e6:.0f}M")
print(f"Product catalogue:      {products/1e6:.0f}M")
print(f"Recommendation RPS:     {total_rps:.0f} avg  (~{total_rps*5:.0f} peak)")

# Why two-stage is necessary
print("\nWHY TWO-STAGE IS NECESSARY:")
ranking_model_ms  = 5    # ms per (user, product) pair
full_catalogue_ms = ranking_model_ms * products / 1000
print(f"  Ranking all {products/1e6:.0f}M products: {full_catalogue_ms/1000:.0f} seconds — impossible")
print(f"  Ranking 500 candidates:              {ranking_model_ms * 500:.0f}ms — feasible")

# Offline training cadence
print("\nTRAINING CADENCE:")
print("""
  Retrieval models (ALS, CLIP embeddings):  Weekly
    → Catalogue changes slowly, embeddings expensive to compute

  Ranking model:  Daily
    → Click patterns change quickly, model relatively cheap to retrain

  Popularity/trending features:  Hourly
    → Trending products change fast, must be fresh

  Cold start (new product):  Real-time
    → New product uploaded → compute CLIP embedding → add to index immediately
    → Use content-based retrieval until enough interactions for collaborative
""")

# Evaluation metrics — what actually matters
print("EVALUATION METRICS:")
metrics = [
    ('CTR (Click-Through Rate)',   'Online',  '% users who click a recommendation'),
    ('Conversion rate',            'Online',  '% recommendations that lead to purchase'),
    ('Diversity (ILD)',            'Offline', 'Intra-list diversity — are recommendations varied?'),
    ('Coverage',                   'Offline', '% of catalogue that appears in recommendations'),
    ('Novelty',                    'Offline', '% of recommendations user has never seen'),
    ('NDCG@10',                    'Offline', 'Normalised Discounted Cumulative Gain at position 10'),
]
for metric, where, desc in metrics:
    print(f"  {metric:<28}: {where:<8}  {desc}")`} />
      </div>

      <Div />

      {/* ══ SECTION 5 — COMMON TRADEOFFS ═════════════════════════════════════════ */}
      <div style={S.sec}>
        <span style={S.tag}>The decisions that define every system</span>
        <h2 style={S.h2}>Six recurring tradeoffs — know these and you can handle any ML design question</h2>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 24 }}>
          {[
            {
              tradeoff: 'Online vs Batch serving',
              color: '#7b61ff',
              online: 'Real-time prediction at request time. Required when: prediction depends on request context (fraud amount, delivery distance). Latency-sensitive. Higher cost.',
              batch: 'Pre-compute predictions for all entities daily. Possible when: context does not change per-request (user recommendations pre-computed by user_id). Lower cost, higher throughput.',
              rule: 'If prediction requires real-time features → online. If top-k for a fixed entity → batch. Hybrid: batch compute candidates, online re-rank.',
            },
            {
              tradeoff: 'Precision vs Recall tradeoff (classification threshold)',
              color: '#D85A30',
              online: 'High precision (low threshold): fewer false positives. For fraud: fewer declined legitimate transactions. Cost: miss more fraud.',
              batch: 'High recall (high threshold): catch more fraud. For fraud: higher false positive rate. Cost: more customer complaints.',
              rule: 'Set threshold based on business cost: cost_FN / cost_FP. If fraud loss >> complaint cost, lower threshold. Always expose the score, let the business set the threshold.',
            },
            {
              tradeoff: 'Model complexity vs latency',
              color: '#1D9E75',
              online: 'Simple model (LightGBM): 1ms inference, interpretable, less accurate. Deployed as single endpoint.',
              batch: 'Complex model (deep learning): 100ms+ inference, better accuracy. Requires GPU serving, model quantisation, or batching.',
              rule: 'Start simple. Add complexity only when simple model plateaus AND latency budget allows. 80% of production models are gradient boosting, not deep learning.',
            },
            {
              tradeoff: 'Freshness vs cost (feature computation frequency)',
              color: '#378ADD',
              online: 'Real-time features: maximum freshness, maximum cost. Requires streaming infrastructure (Kafka, Flink). For fast-changing signals (fraud velocity, driver location).',
              batch: 'Batch features: stale but cheap. Daily or hourly batch job. For slowly-changing signals (user purchase history, restaurant prep time baseline).',
              rule: 'Use freshness of the underlying signal to decide: if signal changes significantly in 1 hour, compute hourly. If stable across days, compute daily.',
            },
            {
              tradeoff: 'Single global model vs per-segment models',
              color: '#BA7517',
              online: 'Global model: simpler, one deployment, data pooling. Worse for underrepresented segments (tier-2 cities with little data).',
              batch: 'Per-segment models: better for each segment, higher maintenance. n models to retrain, monitor, and deploy.',
              rule: 'Start global. Add segment-specific models when: global model underperforms a segment by >10%, segment has >100k samples, and business impact justifies the maintenance overhead.',
            },
            {
              tradeoff: 'Human-in-the-loop vs full automation',
              color: '#ff4757',
              online: 'Full automation: fast, scalable, no human cost. Risk: wrong automated decision at scale (e.g. fraud model blocks all transactions during a bug).',
              batch: 'Human review for high-stakes decisions: slower, expensive, required for regulatory compliance. Fraud above Rs 1L, medical diagnosis, loan decisions.',
              rule: 'Automate when: low cost of errors, high volume, reversible actions. Human review when: high cost of errors, regulatory requirement, irreversible actions (account ban).',
            },
          ].map((item) => (
            <div key={item.tradeoff} style={{
              background: 'var(--surface)', border: `1px solid ${item.color}25`,
              borderRadius: 8, padding: '12px 14px',
              borderLeft: `4px solid ${item.color}`,
            }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: item.color, fontFamily: 'var(--font-display)', marginBottom: 8 }}>
                {item.tradeoff}
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 8 }}>
                <div>
                  <div style={{ fontSize: 10, fontWeight: 700, color: item.color, fontFamily: 'var(--font-mono)', marginBottom: 3 }}>OPTION A</div>
                  <p style={{ ...S.ps, marginBottom: 0, fontSize: 11 }}>{item.online}</p>
                </div>
                <div>
                  <div style={{ fontSize: 10, fontWeight: 700, color: item.color, fontFamily: 'var(--font-mono)', marginBottom: 3 }}>OPTION B</div>
                  <p style={{ ...S.ps, marginBottom: 0, fontSize: 11 }}>{item.batch}</p>
                </div>
              </div>
              <div style={{ fontSize: 11, color: item.color, fontStyle: 'italic', borderTop: `1px solid ${item.color}20`, paddingTop: 6 }}>
                Rule: {item.rule}
              </div>
            </div>
          ))}
        </div>
      </div>

      <Div />

      {/* ══ SECTION 6 — INTERVIEW PRESENTATION ══════════════════════════════════ */}
      <div style={S.sec}>
        <span style={S.tag}>How to present in 45 minutes</span>
        <h2 style={S.h2}>Time allocation and what interviewers are actually scoring</h2>

        <ConceptBox title="45-minute interview structure — time allocation" color="#1D9E75">
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            {[
              { time: '0-5 min', phase: 'Clarify the problem', action: 'Ask 3-4 clarifying questions. Confirm scale, latency, and business metric. Do not assume.', color: '#888' },
              { time: '5-10 min', phase: 'Problem framing', action: 'State the ML task, metric, and success criteria. Define the label and explain how it is obtained.', color: '#378ADD' },
              { time: '10-20 min', phase: 'Data and features', action: 'What data exists, quality issues, feature engineering. Explicitly address cold start and missing features.', color: '#7b61ff' },
              { time: '20-30 min', phase: 'Model and serving', action: 'Model choice with justification. Online vs batch. Feature store. Latency analysis. Draw the serving architecture.', color: '#D85A30' },
              { time: '30-38 min', phase: 'Scale and monitoring', action: 'Capacity estimates. Retraining trigger. Drift detection. Mention specific tools (Evidently, MLflow).', color: '#1D9E75' },
              { time: '38-45 min', phase: 'Tradeoffs and extensions', action: 'What you would do with more time. What the main risks are. What you would change at 10× scale.', color: '#BA7517' },
            ].map((item) => (
              <div key={item.time} style={{
                display: 'grid', gridTemplateColumns: '70px 140px 1fr',
                gap: 10, background: 'var(--bg2)',
                borderRadius: 4, padding: '6px 10px',
              }}>
                <span style={{ fontSize: 11, color: item.color, fontFamily: 'var(--font-mono)', fontWeight: 700 }}>{item.time}</span>
                <span style={{ fontSize: 11, color: item.color, fontWeight: 600 }}>{item.phase}</span>
                <span style={{ fontSize: 11, color: 'var(--muted)' }}>{item.action}</span>
              </div>
            ))}
          </div>
        </ConceptBox>

        <CodeBlock code={`# ── What interviewers score — the actual rubric ───────────────────────

SCORING_RUBRIC = {
    'Problem framing (10%)': [
        'Asks clarifying questions before designing',
        'Correctly identifies ML task type (regression/classification/ranking)',
        'Defines business metric separate from ML metric',
        'States success criteria quantitatively',
    ],
    'Data and features (25%)': [
        'Identifies relevant data sources including non-obvious ones',
        'Addresses data quality and bias',
        'Addresses cold start problem for new entities',
        'Explains feature computation (batch vs real-time)',
        'Mentions point-in-time correctness for training',
    ],
    'Model selection (20%)': [
        'Proposes a simple baseline before complex model',
        'Justifies model choice with explicit tradeoffs',
        'Addresses class imbalance if present',
        'Mentions explainability requirements if regulatory context',
    ],
    'System design (25%)': [
        'Correctly determines online vs batch serving',
        'Mentions feature store for pre-computed features',
        'Provides latency breakdown (feature fetch + model + network)',
        'Capacity estimates with numbers',
        'Fallback when model unavailable',
    ],
    'Monitoring (15%)': [
        'Identifies what drifts in this specific system',
        'Proposes concrete monitoring metrics',
        'States retraining trigger condition',
        'Addresses feedback loop and label delay',
    ],
    'Communication (5%)': [
        'Draws architecture diagram',
        'States assumptions explicitly',
        'Handles interviewer\'s probing questions without getting flustered',
    ],
}

for category, criteria in SCORING_RUBRIC.items():
    print(f"\n{category}:")
    for c in criteria:
        print(f"  ✓ {c}")

# ── Common mistakes that kill interview scores ────────────────────────
print("\n\nCOMMON MISTAKES:")
mistakes = [
    ('Jumping to model selection',    'First 5 minutes spent on LightGBM vs XGBoost. Interviewer wants system design.'),
    ('Forgetting cold start',         '"New restaurant has no history" — always asked as a follow-up. Address proactively.'),
    ('No fallback plan',              '"What if the model is down?" — must have a rule-based or static fallback.'),
    ('Missing label strategy',        '"How do you get training labels?" — must be answered for every system.'),
    ('Batch when online needed',      '"Pre-compute all (user, merchant) pairs" — combinatorial explosion.'),
    ('Ignoring data leakage',         '"Use future features in training" — always mention point-in-time correctness.'),
    ('No numbers',                    '"Large scale, many requests" — always give orders of magnitude.'),
]
print(f"  {'Mistake':<30} {'Why it hurts'}")
print("  " + "─" * 70)
for mistake, why in mistakes:
    print(f"  {mistake:<30} {why}")`} />
      </div>

      <Div />

      {/* ══ SECTION 7 — WHAT'S NEXT ════════════════════════════════════════════ */}
      <div style={{ paddingBottom: 48, paddingTop: 8 }}>
        <span style={S.tag}>Section 11 complete</span>
        <h2 style={S.h2}>
          The MLOps section is complete. Section 12 — Cloud ML Platforms —
          connects everything to Azure ML, SageMaker, and Vertex AI.
        </h2>

        <p style={S.p}>
          You have completed the full MLOps section across seven modules:
          ML pipelines and feature stores, experiment tracking, model deployment,
          monitoring, retraining pipelines, DVC, and ML system design.
          Section 12 shows how all of this maps onto the managed cloud platforms —
          Azure ML, AWS SageMaker, and GCP Vertex AI — that most Indian enterprise
          ML teams use. The concepts are identical; the platforms automate the
          infrastructure so you can focus on the ML.
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
              Next — Section 12 · Cloud ML Platforms
            </div>
            <div style={{
              fontSize: 15, fontWeight: 700, color: 'var(--text)',
              fontFamily: 'var(--font-display)', letterSpacing: '-0.3px',
            }}>
              Azure ML — Studio, Pipelines and AutoML
            </div>
            <p style={{ ...S.ps, marginBottom: 0, marginTop: 4 }}>
              Azure Machine Learning Studio, compute clusters, AML Pipelines,
              AutoML, model registry, and online endpoints.
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
          'Every ML system design problem has the same eight questions answered in order: problem framing → data → features → model → serving → scale → monitoring → failure modes. Answer them in this order — each answer constrains the next. Jumping to model selection first is the most common interview mistake.',
          'Problem framing before everything: what is the ML task type, what is the business metric (separate from ML metric), how are labels obtained, and what is the latency budget. These four answers determine the entire architecture. Never start designing until you have them.',
          'Two-stage architecture is the universal pattern for recommendation and search: fast retrieval of 500-1000 candidates (ANN search on pre-computed embeddings), then expensive ranking of only those candidates. Running a neural ranker over 50M products is impossible at real-time serving latency — two-stage is not an optimisation, it is a requirement.',
          'Capacity estimation is not optional. Give numbers: Swiggy 580 peak RPS → 30 replicas × 20 RPS each at 10ms model latency. Meesho 15M DAU × 3 sessions × 4 requests = 2,083 avg RPS. Fraud detection 1,157 peak TPS at < 10ms model budget → 12 replicas. Interviewers score "thinking in numbers" explicitly.',
          'Six recurring tradeoffs to master: online vs batch serving (depends on whether real-time features are required), precision vs recall (depends on cost of FN vs FP), model complexity vs latency (start simple, add complexity when plateau), freshness vs cost (compute frequency = signal change rate), global vs per-segment models (add segments when global underperforms >10%), full automation vs human-in-the-loop (automate reversible low-stakes, humans for irreversible high-stakes).',
          'Always address: cold start problem (new users/items with no history — content-based or popularity fallback), label strategy (how and when ground truth is obtained — delivery time is immediate, fraud is delayed 30 days), and fallback when model is unavailable (rule-based or static fallback — never block the core user action due to ML unavailability).',
        ]}
      />
    </LearnLayout>
  )
}