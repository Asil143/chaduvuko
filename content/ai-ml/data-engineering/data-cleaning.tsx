import type { Metadata } from 'next'
import { LearnLayout } from '@/components/content/LearnLayout'
import { Callout } from '@/components/content/Callout'
import { KeyTakeaways } from '@/components/content/KeyTakeaways'
import MLPageHeader from '@/components/content/MLPageHeader'

export const metadata: Metadata = {
  title: 'Data Cleaning and Validation — Chaduvuko',
  description:
    'Turn raw, messy data into reliable ML training sets. Schema validation, duplicate detection, type coercion, outlier handling, and automated validation rules that catch problems before they reach your model.',
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

export default function DataCleaningPage() {
  return (
    <LearnLayout
      title="Data Cleaning and Validation"
      description="Turn raw, messy data into reliable ML training sets. Schema validation, duplicate detection, type coercion, outlier handling, and automated rules that catch problems before they reach your model."
      section="Data Engineering"
      readTime="45–58 min"
      updatedAt="March 2026"
    >
      <MLPageHeader section='data-engineering' topic='data-cleaning' />

      {/* ══ SECTION 1 — HOOK ═══════════════════════════════════════════════════ */}
      <div style={S.sec}>
        <span style={S.tag}>The inconvenient truth about real data</span>
        <h2 style={S.h2}>
          Garbage in, garbage out — and the garbage is invisible until your model ships.
        </h2>

        <p style={S.p}>
          A 2020 survey by Anaconda found data scientists spend 45% of their time
          cleaning data. That number hasn't changed much since. But the more
          dangerous problem isn't the time it takes — it's the errors that slip
          through uncleaned and silently corrupt a model that looks fine in evaluation
          but behaves wrong in production.
        </p>

        <p style={S.p}>
          Consider what happens at DoorDash. The orders table has negative distances
          from data entry errors. Delivery times of 0 minutes from cancelled orders
          never removed. Duplicate records from a retry bug in the mobile app.
          City names spelled three different ways — "Seattle", "San Francisco", "bangalore".
          Star ratings of 6 from a frontend validation bug that was fixed three months ago.
          None of these cause your training script to crash. They all silently degrade
          your model.
        </p>

        <p style={S.p}>
          This module gives you a systematic process — not a one-time cleaning script,
          but a validation framework that runs automatically every time new data arrives
          and catches problems before they reach training.
        </p>

        <HBox color="#1D9E75">
          <p style={{ ...S.p, marginBottom: 8 }}>
            <span style={{ color: 'var(--text)', fontWeight: 700 }}>
              What this module covers:
            </span>
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 6 }}>
            {[
              'Data quality audit — measure quality before fixing it',
              'Schema validation — enforce column types and ranges',
              'Duplicate detection — exact and fuzzy deduplication',
              'Type coercion — fix columns stored as wrong types',
              'String cleaning — normalise free-text and categorical values',
              'Outlier detection — IQR, Z-score, isolation forest',
              'Outlier treatment — clip, transform, or flag',
              'Consistency checks — cross-column validation rules',
              'Schema drift detection — catch upstream changes automatically',
              'Great Expectations — production validation framework',
              'Building a reusable cleaning pipeline',
              'Logging and reporting data quality metrics',
            ].map((item, i) => (
              <div key={i} style={{ display: 'flex', gap: 8, alignItems: 'flex-start' }}>
                <div style={{
                  width: 4, height: 4, borderRadius: '50%',
                  background: '#1D9E75', flexShrink: 0, marginTop: 7,
                }} />
                <span style={{ fontSize: 12, color: 'var(--muted)', lineHeight: 1.55 }}>{item}</span>
              </div>
            ))}
          </div>
        </HBox>

        <Callout type="tip">
          Clean data once, validate forever. The goal of this module is not
          to write a script that fixes this week's dataset — it's to build
          a validation layer that runs on every dataset automatically
          and fails loudly when something is wrong.
        </Callout>
      </div>

      <Div />

      {/* ══ SECTION 2 — GENERATE MESSY DATA ════════════════════════════════════ */}
      <div style={S.sec}>
        <span style={S.tag}>Setup</span>
        <h2 style={S.h2}>The messy DoorDash dataset used throughout this module</h2>

        <p style={S.p}>
          Run this block once to create a realistic messy dataset with deliberate
          data quality problems. All sections in this module clean and validate it.
        </p>

        <CodeBlock code={`import pandas as pd
import numpy as np
from pathlib import Path

np.random.seed(42)
n = 12_000

# ── Base clean data ───────────────────────────────────────────────────
restaurants = ['Pizza Hut','Biryani Blues',"McDonald's",'Haldiram\\'s',
               'Dominos','KFC','Subway','Burger King']
cities_clean = ['Seattle','New York','Delhi','Austin','Boston','Chicago']
slots = ['breakfast','lunch','evening','dinner']

distance = np.abs(np.random.normal(4.0, 2.0, n)).round(2)
traffic  = np.random.randint(1, 11, n)
prep     = np.abs(np.random.normal(15, 5, n)).round(1)
value    = np.abs(np.random.normal(350, 150, n)).round(0)
delivery = (8.6 + 7.3*distance + 0.8*prep + 1.5*traffic
            + np.random.normal(0, 4, n)).round(1)
rating   = np.round(np.clip(np.random.normal(4.1, 0.6, n), 1, 5), 1)

df = pd.DataFrame({
    'order_id':       [f'SW{i:06d}' for i in range(n)],
    'restaurant':     np.random.choice(restaurants, n),
    'city':           np.random.choice(cities_clean, n),
    'time_slot':      np.random.choice(slots, n),
    'distance_km':    distance,
    'traffic_score':  traffic,
    'restaurant_prep':prep,
    'order_value':    value,
    'delivery_time':  delivery,
    'star_rating':    rating,
    'created_at':     pd.date_range('2024-01-01', periods=n, freq='1h').strftime('%Y-%m-%d %H:%M:%S'),
})
df['is_late'] = df['delivery_time'] > 45

# ── Introduce realistic data quality problems ──────────────────────────

# 1. Negative distances (data entry error)
neg_idx = np.random.choice(n, 40, replace=False)
df.loc[neg_idx, 'distance_km'] = -1.0

# 2. Impossible delivery times (0 min from cancelled orders)
zero_idx = np.random.choice(n, 60, replace=False)
df.loc[zero_idx, 'delivery_time'] = 0.0

# 3. Star ratings out of range (frontend bug)
bad_rating = np.random.choice(n, 25, replace=False)
df.loc[bad_rating, 'star_rating'] = np.random.choice([0.0, 6.0, 7.5], 25)

# 4. City name inconsistencies
city_typos = {
    'Seattle':  ['bangalore','San Francisco','BANGALORE','Banglore','bangalore '],
    'New York':     ['mumbai','Bombay','MUMBAI','mumbai '],
    'Delhi':      ['delhi','New York','DELHI','delhi '],
}
for correct, variants in city_typos.items():
    mask = df['city'] == correct
    variant_idx = df.index[mask][:len(mask[mask])//5]
    df.loc[variant_idx, 'city'] = np.random.choice(variants, len(variant_idx))

# 5. Missing values
df.loc[np.random.choice(n, 600, replace=False), 'star_rating']      = np.nan
df.loc[np.random.choice(n, 250, replace=False), 'restaurant_prep']   = np.nan
df.loc[np.random.choice(n, 80,  replace=False), 'distance_km']       = np.nan

# 6. Exact duplicates (retry bug)
dup_idx  = np.random.choice(n, 150, replace=False)
df_dupes = df.iloc[dup_idx].copy()
df = pd.concat([df, df_dupes], ignore_index=True)

# 7. Near-duplicates (same order, slightly different timestamp)
near_dup_idx = np.random.choice(n, 80, replace=False)
df_near = df.iloc[near_dup_idx].copy()
df_near['order_id'] = [f'SW{i:06d}X' for i in range(len(df_near))]
df_near['distance_km'] = df_near['distance_km'] + np.random.normal(0, 0.01, len(df_near))
df = pd.concat([df, df_near], ignore_index=True)

# 8. Wrong dtype — order_value stored as string
df['order_value'] = df['order_value'].astype(str)
# Introduce some non-numeric values
bad_val = np.random.choice(df.index, 30, replace=False)
df.loc[bad_val, 'order_value'] = np.random.choice(['N/A','missing','--',''], 30)

# 9. Extreme outliers (genuine heavy orders or system glitches)
outlier_idx = np.random.choice(df.index, 15, replace=False)
df.loc[outlier_idx, 'delivery_time'] = np.random.uniform(200, 500, 15)

df = df.sample(frac=1, random_state=42).reset_index(drop=True)
df.to_csv('/tmp/swiggy_messy.csv', index=False)
print(f"Messy dataset: {df.shape[0]:,} rows × {df.shape[1]} columns")
print(f"Known problems injected: negative distances, zero delivery times, ")
print(f"  bad ratings, city typos, nulls, duplicates, wrong dtypes, outliers")`} />
      </div>

      <Div />

      {/* ══ SECTION 3 — DATA QUALITY AUDIT ════════════════════════════════════ */}
      <div style={S.sec}>
        <span style={S.tag}>Step 1 — measure before fixing</span>
        <h2 style={S.h2}>Data quality audit — know exactly what you are dealing with</h2>

        <p style={S.p}>
          The first rule of data cleaning: audit before you touch anything.
          Running a comprehensive quality report on a new dataset takes five minutes
          and reveals every problem you'll spend hours debugging if you skip it.
          It also gives you a baseline so you can prove the data got better
          after cleaning.
        </p>

        <CodeBlock code={`import pandas as pd
import numpy as np

df = pd.read_csv('/tmp/swiggy_messy.csv')

def data_quality_report(df: pd.DataFrame, name: str = 'dataset') -> pd.DataFrame:
    """
    Generate a comprehensive data quality report for any DataFrame.
    Returns a summary DataFrame and prints a formatted report.
    """
    n = len(df)
    report_rows = []

    for col in df.columns:
        series = df[col]
        n_null     = series.isnull().sum()
        n_unique   = series.nunique(dropna=True)
        dtype      = str(series.dtype)

        row = {
            'column':    col,
            'dtype':     dtype,
            'n_null':    n_null,
            'pct_null':  round(n_null / n * 100, 2),
            'n_unique':  n_unique,
            'pct_unique': round(n_unique / n * 100, 2),
        }

        # Numeric stats
        if pd.api.types.is_numeric_dtype(series):
            row.update({
                'min':    series.min(),
                'max':    series.max(),
                'mean':   round(series.mean(), 3),
                'std':    round(series.std(), 3),
                'n_zero': (series == 0).sum(),
                'n_neg':  (series < 0).sum(),
            })
        # String stats
        elif dtype == 'object':
            top_val   = series.value_counts().index[0] if n_unique > 0 else None
            top_count = series.value_counts().iloc[0] if n_unique > 0 else 0
            row.update({
                'top_value':    top_val,
                'top_pct':      round(top_count / n * 100, 2),
                'has_whitespace': series.dropna().str.contains(r'^\s|\s$', regex=True).any(),
            })

        report_rows.append(row)

    report = pd.DataFrame(report_rows).set_index('column')
    return report

report = data_quality_report(df, 'DoorDash messy dataset')
print("═" * 70)
print(f"  DATA QUALITY REPORT — {len(df):,} rows × {len(df.columns)} columns")
print("═" * 70)

# Show key quality metrics
numeric_cols = df.select_dtypes(include=np.number).columns.tolist()
object_cols  = df.select_dtypes(include='object').columns.tolist()

print(f"\nMissing values:")
missing = df.isnull().sum()
for col in missing[missing > 0].sort_values(ascending=False).index:
    pct = missing[col] / len(df) * 100
    bar = '█' * int(pct / 2)
    print(f"  {col:<20}: {bar} {missing[col]:,} ({pct:.1f}%)")

print(f"\nRange violations (numeric):")
checks = {
    'distance_km':     ('< 0',   (df['distance_km'] < 0).sum()),
    'delivery_time':   ('== 0',  (df['delivery_time'] == 0).sum()),
    'star_rating':     ('> 5',   (df['star_rating'] > 5).sum()),
    'star_rating_neg': ('< 1',   (df['star_rating'] < 1).sum()),
}
for name, (op, count) in checks.items():
    if count > 0:
        print(f"  {name} {op}: {count:,} rows")

print(f"\nDuplicates:")
n_exact = df.duplicated(subset=['order_id']).sum()
n_full  = df.duplicated().sum()
print(f"  Exact order_id duplicates: {n_exact:,}")
print(f"  Fully identical rows:       {n_full:,}")

print(f"\nString inconsistencies (city column):")
print(f"  Unique city values: {df['city'].nunique()}")
print(f"  Values: {sorted(df['city'].dropna().unique())}")`} />
      </div>

      <Div />

      {/* ══ SECTION 4 — SCHEMA VALIDATION ═════════════════════════════════════ */}
      <div style={S.sec}>
        <span style={S.tag}>Step 2 — enforce the contract</span>
        <h2 style={S.h2}>Schema validation — define what valid data looks like</h2>

        <p style={S.p}>
          A schema is a contract: a precise description of what each column
          should contain. Validating against a schema answers:
          are the right columns present? Are they the right types?
          Are values in the expected ranges? Are required columns non-null?
          Schema validation is the first gate every new dataset should pass
          before any further processing.
        </p>

        <VisualBox label="Schema contract — every column defined explicitly">
          <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
            <div style={{
              display: 'grid', gridTemplateColumns: '1fr 80px 80px 1fr',
              padding: '7px 12px',
              background: 'var(--surface)', borderBottom: '1px solid var(--border)',
            }}>
              {['Column', 'Type', 'Nullable', 'Constraints'].map(h => (
                <span key={h} style={{
                  fontSize: 10, fontWeight: 700, color: 'var(--muted)',
                  fontFamily: 'var(--font-mono)', textTransform: 'uppercase' as const,
                }}>
                  {h}
                </span>
              ))}
            </div>
            {[
              ['order_id',       'str',   'No',  'Unique, matches SW\\d{6}'],
              ['restaurant',     'str',   'No',  'In allowed restaurant list'],
              ['city',           'str',   'No',  'In [Seattle, New York, Delhi, ...]'],
              ['distance_km',    'float', 'No',  '> 0 and ≤ 50'],
              ['delivery_time',  'float', 'No',  '> 0 and ≤ 180'],
              ['star_rating',    'float', 'Yes', '1.0 ≤ x ≤ 5.0'],
              ['order_value',    'float', 'No',  '> 0 and ≤ 10000'],
              ['is_late',        'bool',  'No',  'True or False only'],
            ].map(([col, dtype, nullable, constraint], i) => (
              <div key={col} style={{
                display: 'grid', gridTemplateColumns: '1fr 80px 80px 1fr',
                padding: '7px 12px',
                background: i % 2 === 0 ? 'transparent' : 'var(--surface)',
                borderBottom: '1px solid var(--border)',
              }}>
                <span style={{ fontSize: 12, fontFamily: 'var(--font-mono)', color: '#00e676' }}>{col}</span>
                <span style={{ fontSize: 12, fontFamily: 'var(--font-mono)', color: '#378ADD' }}>{dtype}</span>
                <span style={{
                  fontSize: 12, fontFamily: 'var(--font-mono)',
                  color: nullable === 'No' ? '#ff4757' : '#1D9E75',
                }}>
                  {nullable}
                </span>
                <span style={{ fontSize: 11, color: 'var(--muted)' }}>{constraint}</span>
              </div>
            ))}
          </div>
        </VisualBox>

        <CodeBlock code={`import pandas as pd
import numpy as np
from dataclasses import dataclass, field
from typing import Optional, List, Any
import re

@dataclass
class ColumnSchema:
    """Defines the expected properties of one DataFrame column."""
    name:        str
    dtype:       str          # 'numeric', 'string', 'boolean', 'datetime'
    nullable:    bool = True
    min_val:     Optional[float] = None
    max_val:     Optional[float] = None
    allowed:     Optional[List[Any]] = None   # allowed values for categoricals
    pattern:     Optional[str] = None         # regex pattern for strings
    unique:      bool = False

@dataclass
class ValidationResult:
    column:  str
    check:   str
    passed:  bool
    n_violations: int = 0
    sample:  List[Any] = field(default_factory=list)

    def __str__(self):
        status = "✓" if self.passed else "✗"
        msg    = f"[{status}] {self.column} — {self.check}"
        if not self.passed:
            msg += f" ({self.n_violations:,} violations)"
            if self.sample:
                msg += f" — sample: {self.sample[:3]}"
        return msg

class SchemaValidator:
    """Validates a DataFrame against a schema definition."""

    def __init__(self, schema: List[ColumnSchema]):
        self.schema  = {s.name: s for s in schema}
        self.results: List[ValidationResult] = []

    def validate(self, df: pd.DataFrame) -> bool:
        self.results = []

        # 1. Check required columns present
        for col_name, col_schema in self.schema.items():
            if col_name not in df.columns:
                self.results.append(ValidationResult(
                    col_name, 'column_exists', False,
                    n_violations=1, sample=['column missing entirely'],
                ))
                continue

            series = df[col_name]
            self._validate_column(series, col_schema)

        return all(r.passed for r in self.results)

    def _validate_column(self, series: pd.Series, schema: ColumnSchema):
        col = schema.name

        # 2. Null check
        n_null = series.isnull().sum()
        if not schema.nullable:
            self.results.append(ValidationResult(
                col, 'not_null', n_null == 0,
                n_violations=int(n_null),
                sample=series.index[series.isnull()].tolist()[:3],
            ))

        # 3. Range checks for numeric
        if schema.min_val is not None:
            numeric = pd.to_numeric(series, errors='coerce')
            violations = numeric.dropna() < schema.min_val
            n_viol = violations.sum()
            self.results.append(ValidationResult(
                col, f'min_val >= {schema.min_val}', n_viol == 0,
                n_violations=int(n_viol),
                sample=numeric[violations].head(3).tolist(),
            ))

        if schema.max_val is not None:
            numeric = pd.to_numeric(series, errors='coerce')
            violations = numeric.dropna() > schema.max_val
            n_viol = violations.sum()
            self.results.append(ValidationResult(
                col, f'max_val <= {schema.max_val}', n_viol == 0,
                n_violations=int(n_viol),
                sample=numeric[violations].head(3).tolist(),
            ))

        # 4. Allowed values
        if schema.allowed is not None:
            # Normalise for comparison
            series_norm = series.dropna().str.strip().str.lower() \
                          if series.dtype == object else series.dropna()
            allowed_norm = [str(a).lower() for a in schema.allowed]
            violations = ~series_norm.isin(allowed_norm)
            n_viol = violations.sum()
            self.results.append(ValidationResult(
                col, f'in_allowed_values ({len(schema.allowed)} values)', n_viol == 0,
                n_violations=int(n_viol),
                sample=series_norm[violations].unique()[:3].tolist(),
            ))

        # 5. Regex pattern
        if schema.pattern is not None:
            valid = series.dropna().astype(str).str.match(schema.pattern)
            n_viol = (~valid).sum()
            self.results.append(ValidationResult(
                col, f'matches pattern {schema.pattern}', n_viol == 0,
                n_violations=int(n_viol),
                sample=series[~valid].head(3).tolist(),
            ))

        # 6. Uniqueness
        if schema.unique:
            n_dup = series.duplicated(keep=False).sum()
            self.results.append(ValidationResult(
                col, 'unique_values', n_dup == 0,
                n_violations=int(n_dup),
                sample=series[series.duplicated(keep=False)].head(3).tolist(),
            ))

    def report(self) -> None:
        print("═" * 65)
        print("  SCHEMA VALIDATION REPORT")
        print("═" * 65)
        passed = [r for r in self.results if r.passed]
        failed = [r for r in self.results if not r.passed]
        print(f"  Checks: {len(self.results)} total  "
              f"{len(passed)} passed  {len(failed)} failed\n")
        for r in self.results:
            print(f"  {r}")

# ── Define the schema ─────────────────────────────────────────────────
ALLOWED_CITIES = ['bangalore','bengaluru','mumbai','bombay','delhi',
                  'new delhi','hyderabad','pune','chennai']
ALLOWED_RESTAURANTS = ['pizza hut','biryani blues',"mcdonald's",'haldiram\\'s',
                       'dominos','kfc','subway','burger king']
ALLOWED_SLOTS = ['breakfast','lunch','evening','dinner']

schema = [
    ColumnSchema('order_id',        'string',  nullable=False, pattern=r'^SW\w+$', unique=True),
    ColumnSchema('restaurant',      'string',  nullable=False, allowed=ALLOWED_RESTAURANTS),
    ColumnSchema('city',            'string',  nullable=False, allowed=ALLOWED_CITIES),
    ColumnSchema('time_slot',       'string',  nullable=False, allowed=ALLOWED_SLOTS),
    ColumnSchema('distance_km',     'numeric', nullable=False, min_val=0.1, max_val=50.0),
    ColumnSchema('delivery_time',   'numeric', nullable=False, min_val=1.0, max_val=180.0),
    ColumnSchema('star_rating',     'numeric', nullable=True,  min_val=1.0, max_val=5.0),
    ColumnSchema('order_value',     'numeric', nullable=False, min_val=1.0, max_val=10_000.0),
    ColumnSchema('restaurant_prep', 'numeric', nullable=True,  min_val=1.0, max_val=120.0),
]

validator = SchemaValidator(schema)
df = pd.read_csv('/tmp/swiggy_messy.csv')
is_valid = validator.validate(df)
validator.report()
print(f"\nOverall: {'PASSED' if is_valid else 'FAILED'}")`} />
      </div>

      <Div />

      {/* ══ SECTION 5 — DUPLICATE DETECTION ═══════════════════════════════════ */}
      <div style={S.sec}>
        <span style={S.tag}>Step 3 — remove duplicates</span>
        <h2 style={S.h2}>Duplicate detection — exact and near-duplicate removal</h2>

        <p style={S.p}>
          Duplicates are more than a storage problem. In ML, duplicate training
          examples cause the model to overweight those records — whatever pattern
          they represent gets amplified. A duplicate rate of 5% can meaningfully
          skew a model trained on imbalanced data.
          There are two kinds of duplicates: exact copies and near-duplicates
          (same record, slightly different values from a retry or data merging issue).
        </p>

        <CodeBlock code={`import pandas as pd
import numpy as np

df = pd.read_csv('/tmp/swiggy_messy.csv')

# ── Exact duplicate detection ─────────────────────────────────────────

# Fully identical rows (every column matches)
full_dupes = df.duplicated()
print(f"Fully identical rows: {full_dupes.sum():,}")

# Duplicates by business key (order_id should be unique)
key_dupes = df.duplicated(subset=['order_id'], keep='first')
print(f"Duplicate order_ids:  {key_dupes.sum():,}")

# Which order_ids appear more than once?
dup_ids = df['order_id'].value_counts()
dup_ids = dup_ids[dup_ids > 1]
print(f"Order IDs with duplicates: {len(dup_ids):,}")
print(f"Sample duplicate IDs: {dup_ids.head(3).to_dict()}")

# ── Remove exact duplicates ────────────────────────────────────────────
# Strategy 1: keep first occurrence
df_deduped = df.drop_duplicates(subset=['order_id'], keep='first')
print(f"\nAfter deduplication: {len(df):,} → {len(df_deduped):,} rows")

# Strategy 2: keep most recent (if you have a timestamp)
df['created_at'] = pd.to_datetime(df['created_at'], errors='coerce')
df_deduped_latest = (
    df.sort_values('created_at', ascending=False)
    .drop_duplicates(subset=['order_id'], keep='first')
    .sort_index()
)

# ── Near-duplicate detection ──────────────────────────────────────────
# Near-duplicates have the same restaurant + city + order_value
# but slightly different distance_km (from floating point differences in retry)

# Method 1: Group by stable fields and check for suspiciously similar records
def find_near_duplicates(
    df: pd.DataFrame,
    key_cols: list,
    numeric_col: str,
    tolerance: float = 0.1,
) -> pd.DataFrame:
    """
    Find rows that are identical on key_cols but have numeric_col
    values within tolerance of each other.
    """
    near_dupes = []
    groups = df.groupby(key_cols)

    for group_key, group in groups:
        if len(group) < 2:
            continue
        # Check if any pair of rows has similar numeric values
        vals  = group[numeric_col].values
        idxs  = group.index.tolist()
        for i in range(len(vals)):
            for j in range(i+1, len(vals)):
                if abs(vals[i] - vals[j]) <= tolerance:
                    near_dupes.append({
                        'idx_a':    idxs[i],
                        'idx_b':    idxs[j],
                        'key':      group_key,
                        'diff':     abs(vals[i] - vals[j]),
                    })

    return pd.DataFrame(near_dupes)

# Find near-dupes: same restaurant, city, order_value, similar distance
near = find_near_duplicates(
    df_deduped.dropna(subset=['distance_km','order_value']),
    key_cols=['restaurant','city','order_value'],
    numeric_col='distance_km',
    tolerance=0.05,
)
print(f"\nNear-duplicates found: {len(near):,}")
if len(near) > 0:
    print(near.head(3).to_string())

# Method 2: Fuzzy deduplication using record hash
# Hash stable fields — records with same hash are likely duplicates
df_deduped['record_hash'] = (
    df_deduped['restaurant'].astype(str)
    + '|' + df_deduped['city'].astype(str)
    + '|' + df_deduped['order_value'].astype(str)
    + '|' + df_deduped['delivery_time'].round(0).astype(str)
).apply(lambda x: hash(x))

hash_dupes = df_deduped.duplicated(subset=['record_hash'], keep='first')
print(f"\nHash-based near-duplicates: {hash_dupes.sum():,}")
df_clean = df_deduped[~hash_dupes].drop(columns=['record_hash'])
print(f"Rows after near-dedup:      {len(df_clean):,}")`} />
      </div>

      <Div />

      {/* ══ SECTION 6 — TYPE COERCION ══════════════════════════════════════════ */}
      <div style={S.sec}>
        <span style={S.tag}>Step 4 — fix wrong types</span>
        <h2 style={S.h2}>Type coercion — columns stored as the wrong dtype</h2>

        <p style={S.p}>
          Type errors are the most common data quality problem after nulls.
          A price column stored as a string because someone entered "N/A" once.
          A boolean column stored as integers 0 and 1 — but also containing 2.
          A date column stored as a free-text string with three different formats.
          These cause silent failures when you call{' '}
          <span style={S.code as React.CSSProperties}>.values</span> or{' '}
          <span style={S.code as React.CSSProperties}>fit()</span>.
        </p>

        <CodeBlock code={`import pandas as pd
import numpy as np

df = pd.read_csv('/tmp/swiggy_messy.csv')

# ── Detect type problems before fixing ────────────────────────────────
print("Column dtypes (as loaded from CSV):")
print(df.dtypes)
print()

# order_value should be float but is object
print("Sample order_value values:")
print(df['order_value'].value_counts().tail(10))
# Shows: '350.0', '420.0', 'N/A', 'missing', '--', ''

# ── Safe numeric coercion ─────────────────────────────────────────────
# errors='coerce' converts unparseable values to NaN instead of raising
df['order_value_clean'] = pd.to_numeric(df['order_value'], errors='coerce')

n_coerced = df['order_value_clean'].isnull().sum() - df['order_value'].isnull().sum()
print(f"\nValues coerced to NaN (unparseable): {n_coerced:,}")
print(f"Sample non-numeric values that became NaN:")
mask = df['order_value_clean'].isnull() & df['order_value'].notna()
print(df.loc[mask, 'order_value'].unique())

# ── Datetime coercion ──────────────────────────────────────────────────
# Mixed formats are common: '2024-01-15', '15/01/2024', '2024-01-15 09:32:00'
df['created_at'] = pd.to_datetime(
    df['created_at'],
    format='mixed',      # try multiple formats
    errors='coerce',     # bad dates → NaT
    utc=False,
)
n_bad_dates = df['created_at'].isnull().sum()
print(f"\nUnparseable dates → NaT: {n_bad_dates:,}")
print(f"Date range: {df['created_at'].min()} → {df['created_at'].max()}")

# ── Boolean coercion ───────────────────────────────────────────────────
# is_late might be True/False, 1/0, 'True'/'False', 'yes'/'no', 'Y'/'N'
bool_map = {
    True: True, False: False,
    1: True, 0: False,
    '1': True, '0': False,
    'true': True, 'false': False,
    'yes': True, 'no': False,
    'y': True, 'n': False,
}
df['is_late_clean'] = (
    df['is_late']
    .astype(str)
    .str.lower()
    .str.strip()
    .map(bool_map)
)
n_unmapped = df['is_late_clean'].isnull().sum()
print(f"\nUnmapped is_late values: {n_unmapped:,}")

# ── Categorical dtype — save memory for repeated strings ───────────────
# Converting high-cardinality repeated strings to category saves 5-10× memory
before_mb = df.memory_usage(deep=True).sum() / 1e6
for col in ['restaurant','city','time_slot']:
    df[col] = df[col].astype('category')
after_mb = df.memory_usage(deep=True).sum() / 1e6
print(f"\nMemory: {before_mb:.1f} MB → {after_mb:.1f} MB after category conversion")

# ── Build a complete type correction function ──────────────────────────
def coerce_types(df: pd.DataFrame) -> pd.DataFrame:
    """Apply all type corrections to a raw DoorDash orders DataFrame."""
    df = df.copy()

    # Numeric columns
    numeric_cols = ['distance_km','restaurant_prep','order_value',
                    'delivery_time','star_rating','traffic_score']
    for col in numeric_cols:
        if col in df.columns:
            df[col] = pd.to_numeric(df[col], errors='coerce')

    # Datetime
    if 'created_at' in df.columns:
        df['created_at'] = pd.to_datetime(df['created_at'],
                                           format='mixed', errors='coerce')

    # Boolean
    if 'is_late' in df.columns:
        df['is_late'] = df['is_late'].map(bool_map)

    # Categorical
    for col in ['restaurant','city','time_slot']:
        if col in df.columns:
            df[col] = df[col].astype('category')

    return df

df_typed = coerce_types(df)
print("\nDtypes after coercion:")
print(df_typed.dtypes)`} />
      </div>

      <Div />

      {/* ══ SECTION 7 — STRING CLEANING ════════════════════════════════════════ */}
      <div style={S.sec}>
        <span style={S.tag}>Step 5 — normalise strings</span>
        <h2 style={S.h2}>String cleaning — normalise free text and categoricals</h2>

        <p style={S.p}>
          String columns are the messiest part of any real dataset.
          "Seattle", "bangalore", "San Francisco", "BANGALORE", "bangalore " —
          these are five representations of the same city, and they will be
          treated as five separate categories by any ML model.
          String cleaning must be systematic, not case-by-case.
        </p>

        <CodeBlock code={`import pandas as pd
import numpy as np
import re

df = pd.read_csv('/tmp/swiggy_messy.csv')

# ── Basic string normalisation pipeline ───────────────────────────────
def normalise_string(s: str) -> str:
    """Comprehensive string normalisation for categorical columns."""
    if pd.isna(s):
        return s
    s = str(s)
    s = s.strip()                # remove leading/trailing whitespace
    s = re.sub(r'\s+', ' ', s)  # collapse multiple spaces to one
    s = s.lower()                # lowercase
    return s

# Apply to city column
df['city_norm'] = df['city'].apply(normalise_string)
print("City values before normalisation:")
print(sorted(df['city'].dropna().unique()))
print("\nCity values after normalisation:")
print(sorted(df['city_norm'].dropna().unique()))

# ── Canonical value mapping — map variants to standard form ────────────
CITY_CANONICAL = {
    'bangalore':  'Seattle',
    'bengaluru':  'Seattle',
    'banglore':   'Seattle',
    'mumbai':     'New York',
    'bombay':     'New York',
    'delhi':      'Delhi',
    'new delhi':  'Delhi',
    'hyderabad':  'Austin',
    'pune':       'Boston',
    'chennai':    'Chicago',
}

df['city_clean'] = df['city_norm'].map(CITY_CANONICAL)
n_unmapped = df['city_clean'].isnull().sum()
print(f"\nUnmapped cities after canonical mapping: {n_unmapped:,}")
if n_unmapped > 0:
    print(df.loc[df['city_clean'].isnull(), 'city'].unique())

# ── Fuzzy matching — handle typos without a full mapping ───────────────
# pip install rapidfuzz
from rapidfuzz import process, fuzz

CANONICAL_CITIES = ['Seattle','New York','Delhi','Austin','Boston','Chicago']

def fuzzy_match_city(city: str, threshold: int = 80) -> str:
    """Match a city string to the canonical list using fuzzy matching."""
    if pd.isna(city):
        return city
    result = process.extractOne(
        city, CANONICAL_CITIES,
        scorer=fuzz.token_sort_ratio,
    )
    if result and result[1] >= threshold:
        return result[0]
    return city   # return original if no good match

# Only apply fuzzy matching to rows that didn't match exactly
still_unmapped = df['city_clean'].isnull()
df.loc[still_unmapped, 'city_clean'] = (
    df.loc[still_unmapped, 'city_norm'].apply(fuzzy_match_city)
)

print(f"\nFinal unique cities: {sorted(df['city_clean'].dropna().unique())}")
print(f"Still unresolved:    {df['city_clean'].isnull().sum():,}")

# ── Restaurant name cleaning ───────────────────────────────────────────
RESTAURANT_CANONICAL = {
    "mcdonald's":   "McDonald's",
    'mcdonalds':    "McDonald's",
    'mc donalds':   "McDonald's",
    'pizza hut':    'Pizza Hut',
    'pizzahut':     'Pizza Hut',
    'biryani blues':'Biryani Blues',
    "haldiram's":   "Haldiram's",
    'haldirams':    "Haldiram's",
    'kfc':          'KFC',
    'dominos':      'Dominos',
    "domino's":     'Dominos',
    'subway':       'Subway',
    'burger king':  'Burger King',
}

df['restaurant_clean'] = (
    df['restaurant']
    .apply(normalise_string)
    .map(RESTAURANT_CANONICAL)
    .fillna(df['restaurant'])   # keep original if no mapping found
)

# ── Whitespace stripping with vectorised .str ──────────────────────────
# Faster than apply() for large datasets
df['time_slot_clean'] = (
    df['time_slot']
    .str.strip()
    .str.lower()
    .map({'breakfast':'breakfast','lunch':'lunch','evening':'evening','dinner':'dinner'})
)

print(f"\nString cleaning complete:")
print(f"  city:       {df['city_clean'].nunique()} unique values")
print(f"  restaurant: {df['restaurant_clean'].nunique()} unique values")
print(f"  time_slot:  {df['time_slot_clean'].nunique()} unique values")`} />
      </div>

      <Div />

      {/* ══ SECTION 8 — OUTLIER DETECTION ═════════════════════════════════════ */}
      <div style={S.sec}>
        <span style={S.tag}>Step 6 — handle outliers</span>
        <h2 style={S.h2}>Outlier detection and treatment</h2>

        <p style={S.p}>
          Not all outliers are errors. Some are genuine extreme values —
          a restaurant that genuinely takes 90 minutes to prepare food,
          or an order delivered in 8 minutes because it was around the corner.
          The first question is always: is this an error or a real edge case?
          Only then do you decide what to do with it.
        </p>

        <VisualBox label="Three outlier treatment strategies — when to use each">
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {[
              {
                strategy: 'Remove',
                color: '#ff4757',
                when: 'Value is clearly an error — delivery_time=0, distance_km=-5. These cannot be real.',
                risk: 'Removing too many rows reduces training data. Only remove provably impossible values.',
              },
              {
                strategy: 'Clip (Winsorize)',
                color: '#BA7517',
                when: 'Value might be real but extreme. Cap at 99th percentile instead of removing. Delivery time of 300 min becomes 90 min (99th pctile).',
                risk: 'Loses information about how extreme the outlier was. Use a flag column to preserve the information.',
              },
              {
                strategy: 'Flag + keep',
                color: '#1D9E75',
                when: 'Value is suspicious but possibly real. Keep the original value, add a boolean is_outlier column. Let the model decide.',
                risk: 'Model now has to learn to handle outliers — may need more data to do so effectively.',
              },
            ].map((item) => (
              <div key={item.strategy} style={{
                background: 'var(--surface)', border: `1px solid ${item.color}30`,
                borderRadius: 8, padding: '12px 15px',
                borderLeft: `3px solid ${item.color}`,
              }}>
                <div style={{ fontSize: 13, fontWeight: 700, color: item.color, fontFamily: 'var(--font-mono)', marginBottom: 5 }}>
                  {item.strategy}
                </div>
                <p style={{ ...S.ps, marginBottom: 5 }}><strong style={{ color: 'var(--text)' }}>Use when:</strong> {item.when}</p>
                <p style={{ ...S.ps, marginBottom: 0, color: '#BA7517' }}><strong>Risk:</strong> {item.risk}</p>
              </div>
            ))}
          </div>
        </VisualBox>

        <h3 style={S.h3}>IQR method — the standard robust outlier detector</h3>

        <CodeBlock code={`import pandas as pd
import numpy as np

df = pd.read_csv('/tmp/swiggy_messy.csv')
for col in ['distance_km','restaurant_prep','order_value','delivery_time','star_rating']:
    df[col] = pd.to_numeric(df[col], errors='coerce')

def iqr_bounds(series: pd.Series, factor: float = 1.5) -> tuple:
    """
    Compute IQR outlier bounds.
    factor=1.5 → standard outlier definition
    factor=3.0 → extreme outlier definition
    """
    q1 = series.quantile(0.25)
    q3 = series.quantile(0.75)
    iqr = q3 - q1
    lower = q1 - factor * iqr
    upper = q3 + factor * iqr
    return lower, upper

# ── IQR outlier detection for each numeric column ─────────────────────
numeric_cols = ['distance_km','restaurant_prep','order_value','delivery_time']

print("IQR outlier detection (factor=1.5):")
for col in numeric_cols:
    s = df[col].dropna()
    lo, hi = iqr_bounds(s)
    n_low  = (s < lo).sum()
    n_high = (s > hi).sum()
    n_total = n_low + n_high
    print(f"  {col:<20}: bounds=[{lo:.1f}, {hi:.1f}]  "
          f"outliers={n_total:,} ({n_total/len(s)*100:.1f}%)")

# ── Z-score method — assumes roughly normal distribution ───────────────
def zscore_outliers(series: pd.Series, threshold: float = 3.0) -> pd.Series:
    """Returns boolean mask: True where |z-score| > threshold."""
    z = (series - series.mean()) / series.std()
    return z.abs() > threshold

for col in numeric_cols:
    n = zscore_outliers(df[col].dropna()).sum()
    print(f"  {col:<20}: Z-score outliers (|z|>3): {n:,}")

# ── Isolation Forest — catches multi-dimensional outliers ──────────────
from sklearn.ensemble import IsolationForest

feature_cols = ['distance_km','restaurant_prep','delivery_time','order_value']
df_num = df[feature_cols].dropna()

iso = IsolationForest(
    contamination=0.03,   # expect ~3% outliers
    random_state=42,
    n_jobs=-1,
)
outlier_labels = iso.fit_predict(df_num)   # -1 = outlier, 1 = inlier

n_iso_outliers = (outlier_labels == -1).sum()
print(f"\nIsolation Forest: {n_iso_outliers:,} multivariate outliers detected ({n_iso_outliers/len(df_num)*100:.1f}%)")

# Add outlier flag back to DataFrame
df_num_idx = df_num.index
df.loc[df_num_idx, 'is_multivar_outlier'] = (outlier_labels == -1)

# ── Treatment: clip + flag ─────────────────────────────────────────────
def clean_outliers(df: pd.DataFrame) -> pd.DataFrame:
    df = df.copy()

    # 1. Remove impossible values (provably wrong)
    df.loc[df['distance_km'] <= 0, 'distance_km']      = np.nan
    df.loc[df['delivery_time'] <= 0, 'delivery_time']  = np.nan
    df.loc[df['order_value'] <= 0, 'order_value']      = np.nan

    # 2. Clip extreme but possibly real values to 99th percentile
    # But first: flag them so the model knows
    p99_delivery = df['delivery_time'].quantile(0.99)
    p99_distance = df['distance_km'].quantile(0.99)
    p01_rating   = df['star_rating'].quantile(0.01)

    df['delivery_time_capped'] = (df['delivery_time'] > p99_delivery).astype(int)
    df['delivery_time'] = df['delivery_time'].clip(upper=p99_delivery)

    df['distance_capped'] = (df['distance_km'] > p99_distance).astype(int)
    df['distance_km'] = df['distance_km'].clip(upper=p99_distance)

    # 3. Hard limits for star ratings
    df['star_rating'] = df['star_rating'].clip(lower=1.0, upper=5.0)

    return df

df_clean = clean_outliers(df)

# Verify
print(f"\nAfter cleaning:")
print(f"  delivery_time range: [{df_clean['delivery_time'].min():.1f}, {df_clean['delivery_time'].max():.1f}]")
print(f"  distance_km range:   [{df_clean['distance_km'].min():.2f}, {df_clean['distance_km'].max():.2f}]")
print(f"  star_rating range:   [{df_clean['star_rating'].min():.1f}, {df_clean['star_rating'].max():.1f}]")
print(f"  Capped deliveries: {df_clean['delivery_time_capped'].sum():,}")`} />
      </div>

      <Div />

      {/* ══ SECTION 9 — CONSISTENCY CHECKS ════════════════════════════════════ */}
      <div style={S.sec}>
        <span style={S.tag}>Step 7 — cross-column validation</span>
        <h2 style={S.h2}>Consistency checks — rules that span multiple columns</h2>

        <p style={S.p}>
          Individual column validation catches per-column problems. But some
          data quality issues only appear when you look at two columns together.
          A delivery time of 10 minutes for a distance of 15km is physically
          impossible. A 5-star rating with a note "worst experience ever" is
          inconsistent. These cross-column rules are called consistency checks
          and they catch a class of errors that column-level validation misses entirely.
        </p>

        <CodeBlock code={`import pandas as pd
import numpy as np

df = pd.read_csv('/tmp/swiggy_messy.csv')
for col in ['distance_km','restaurant_prep','order_value','delivery_time','star_rating']:
    df[col] = pd.to_numeric(df[col], errors='coerce')

# ── Physical consistency — is this even possible? ─────────────────────

# Minimum possible delivery time given distance
# Assume max vehicle speed 60 km/h = 1 km/min, plus minimum 5 min prep
df['min_possible_delivery'] = df['distance_km'] / 1.0 + 5   # 1 km/min + 5 min floor
physically_impossible = (
    df['delivery_time'] < df['min_possible_delivery']
) & df['delivery_time'].notna() & df['distance_km'].notna()
print(f"Physically impossible delivery times: {physically_impossible.sum():,}")
print("  (delivery_time < distance_km in minutes + 5 min minimum)")

# ── Business logic consistency ─────────────────────────────────────────

# is_late should be True iff delivery_time > 45
df['is_late_parsed'] = df['is_late'].map({'True': True, 'False': False, True: True, False: False})
computed_late = df['delivery_time'] > 45
label_mismatch = (
    df['is_late_parsed'] != computed_late
) & df['delivery_time'].notna() & df['is_late_parsed'].notna()
print(f"\nLabel inconsistency (is_late != delivery_time > 45): {label_mismatch.sum():,}")
# Correct the label from the source of truth (delivery_time)
df['is_late_corrected'] = df['delivery_time'] > 45

# ── Ratio consistency ──────────────────────────────────────────────────
# delivery_time should be >= restaurant_prep (can't deliver before food is ready)
df['prep_delivery_violation'] = (
    (df['delivery_time'] < df['restaurant_prep'])
    & df['delivery_time'].notna()
    & df['restaurant_prep'].notna()
)
print(f"Delivery < prep time: {df['prep_delivery_violation'].sum():,}")

# ── Value density — suspiciously identical values ─────────────────────
# If many rows have exact same delivery_time, it might be a default/fill value
val_counts = df['delivery_time'].round(0).value_counts()
top_val    = val_counts.index[0]
top_count  = val_counts.iloc[0]
print(f"\nMost common delivery_time: {top_val} min ({top_count:,} rows, "
      f"{top_count/len(df)*100:.1f}%)")
if top_count / len(df) > 0.10:
    print("  WARNING: > 10% of rows have identical value — possible fill value contamination")

# ── Build a consistency report ─────────────────────────────────────────
def run_consistency_checks(df: pd.DataFrame) -> pd.DataFrame:
    """Run all cross-column consistency checks and return a summary."""
    checks = []

    # Physical possibility
    min_delivery = df['distance_km'].dropna() / 1.0 + 5
    phys = (df['delivery_time'].dropna() < min_delivery).sum()
    checks.append({'check': 'delivery_time >= min_possible', 'violations': phys, 'severity': 'high'})

    # Label consistency
    df_temp = df.copy()
    df_temp['is_late_bool'] = df_temp['is_late'].map({'True': True, 'False': False, True: True, False: False})
    mismatch = (
        (df_temp['is_late_bool'] != (df_temp['delivery_time'] > 45))
        & df_temp['delivery_time'].notna()
        & df_temp['is_late_bool'].notna()
    ).sum()
    checks.append({'check': 'is_late matches delivery_time > 45', 'violations': mismatch, 'severity': 'critical'})

    # Prep vs delivery
    prep_viol = (
        (df['delivery_time'] < df['restaurant_prep'])
        & df['delivery_time'].notna() & df['restaurant_prep'].notna()
    ).sum()
    checks.append({'check': 'delivery_time >= restaurant_prep', 'violations': prep_viol, 'severity': 'medium'})

    # Negative order value
    neg_val = (pd.to_numeric(df['order_value'], errors='coerce') <= 0).sum()
    checks.append({'check': 'order_value > 0', 'violations': neg_val, 'severity': 'high'})

    return pd.DataFrame(checks).set_index('check')

report = run_consistency_checks(df)
print("\n═" * 30)
print("  CONSISTENCY CHECK REPORT")
print("═" * 30)
print(report.to_string())`} />
      </div>

      <Div />

      {/* ══ SECTION 10 — SCHEMA DRIFT ══════════════════════════════════════════ */}
      <div style={S.sec}>
        <span style={S.tag}>Step 8 — detect upstream changes</span>
        <h2 style={S.h2}>Schema drift — catch when upstream data changes silently</h2>

        <p style={S.p}>
          Schema drift is when the data coming from an upstream source changes
          in a way nobody told you about. A new column appears. An existing column
          is renamed. A categorical column gains a new value. A numeric column
          suddenly contains nulls. Any of these will silently break a downstream
          ML pipeline — the training runs, metrics look plausible, but the model
          has learned from corrupted data.
        </p>

        <CodeBlock code={`import pandas as pd
import numpy as np
import json
import hashlib
from pathlib import Path
from datetime import datetime

# ── Schema fingerprinting — capture expected schema ────────────────────

def capture_schema(df: pd.DataFrame) -> dict:
    """
    Capture a schema snapshot from a known-good DataFrame.
    This becomes the reference point for drift detection.
    """
    schema = {
        'captured_at':  datetime.now().isoformat(),
        'n_rows':       len(df),
        'columns':      {},
    }
    for col in df.columns:
        s = df[col]
        numeric = pd.to_numeric(s, errors='coerce') if s.dtype == object else s

        col_info: dict = {
            'dtype':       str(s.dtype),
            'nullable':    bool(s.isnull().any()),
            'pct_null':    round(s.isnull().mean() * 100, 2),
            'n_unique':    int(s.nunique(dropna=True)),
        }
        if pd.api.types.is_numeric_dtype(s) or pd.api.types.is_numeric_dtype(numeric):
            n = numeric.dropna()
            if len(n) > 0:
                col_info.update({
                    'min':      float(n.min()),
                    'max':      float(n.max()),
                    'mean':     float(n.mean()),
                    'p25':      float(n.quantile(0.25)),
                    'p75':      float(n.quantile(0.75)),
                })
        elif s.dtype == object and s.nunique() < 50:
            col_info['allowed_values'] = sorted(s.dropna().unique().tolist())

        schema['columns'][col] = col_info

    return schema

def detect_drift(
    reference: dict,
    current_df: pd.DataFrame,
    numeric_drift_threshold: float = 0.20,  # 20% change in mean = drift
    null_drift_threshold:    float = 5.0,   # 5 pct point change in null rate
) -> list:
    """
    Compare a current DataFrame against a reference schema.
    Returns a list of drift events.
    """
    alerts = []
    ref_cols = set(reference['columns'].keys())
    cur_cols = set(current_df.columns)

    # 1. Missing columns
    for col in ref_cols - cur_cols:
        alerts.append({'severity': 'critical', 'type': 'column_removed',
                        'column': col, 'detail': 'Column present in reference, missing now'})

    # 2. New columns
    for col in cur_cols - ref_cols:
        alerts.append({'severity': 'warning', 'type': 'column_added',
                        'column': col, 'detail': 'New column not in reference schema'})

    # 3. Per-column drift
    for col in ref_cols & cur_cols:
        ref = reference['columns'][col]
        cur = current_df[col]

        # Null rate drift
        cur_null_pct = cur.isnull().mean() * 100
        null_delta   = abs(cur_null_pct - ref['pct_null'])
        if null_delta > null_drift_threshold:
            alerts.append({
                'severity': 'high', 'type': 'null_rate_drift', 'column': col,
                'detail': f"Null rate: {ref['pct_null']:.1f}% → {cur_null_pct:.1f}% (Δ={null_delta:.1f}pp)",
            })

        # Numeric distribution drift
        if 'mean' in ref:
            numeric = pd.to_numeric(cur, errors='coerce')
            if len(numeric.dropna()) > 0 and ref['mean'] != 0:
                cur_mean = numeric.mean()
                drift_pct = abs(cur_mean - ref['mean']) / abs(ref['mean'])
                if drift_pct > numeric_drift_threshold:
                    alerts.append({
                        'severity': 'high', 'type': 'distribution_drift', 'column': col,
                        'detail': f"Mean: {ref['mean']:.2f} → {cur_mean:.2f} ({drift_pct*100:.0f}% change)",
                    })

        # New categorical values
        if 'allowed_values' in ref:
            cur_vals = set(cur.dropna().unique())
            ref_vals = set(ref['allowed_values'])
            new_vals = cur_vals - ref_vals
            if new_vals:
                alerts.append({
                    'severity': 'warning', 'type': 'new_category_values', 'column': col,
                    'detail': f"New values: {sorted(new_vals)[:5]}",
                })
            missing_vals = ref_vals - cur_vals
            if missing_vals:
                alerts.append({
                    'severity': 'info', 'type': 'missing_category_values', 'column': col,
                    'detail': f"Values disappeared: {sorted(missing_vals)[:5]}",
                })

    return sorted(alerts, key=lambda x: {'critical':0,'high':1,'warning':2,'info':3}[x['severity']])

# ── Run drift detection ────────────────────────────────────────────────
df_reference = pd.read_csv('/tmp/swiggy_messy.csv').head(5000)
reference_schema = capture_schema(df_reference)

# Save schema to disk — use as reference for future runs
schema_path = Path('/tmp/schema_reference.json')
schema_path.write_text(json.dumps(reference_schema, indent=2, default=str))
print(f"Reference schema saved: {len(reference_schema['columns'])} columns")

# Simulate a new batch with some drift
df_new_batch = pd.read_csv('/tmp/swiggy_messy.csv').tail(3000).copy()
df_new_batch['delivery_time'] = df_new_batch['delivery_time'] * 1.35  # 35% increase
df_new_batch['star_rating']   = np.nan                                 # suddenly all null
df_new_batch['new_feature']   = 'some_value'                           # new column appeared
df_new_batch = df_new_batch.drop(columns=['restaurant_prep'])          # column removed

alerts = detect_drift(reference_schema, df_new_batch)

print(f"\nDrift detection: {len(alerts)} alerts")
for alert in alerts:
    icon = {'critical':'🔴','high':'🟠','warning':'🟡','info':'🔵'}[alert['severity']]
    print(f"  {icon} [{alert['severity'].upper()}] {alert['type']} — {alert['column']}")
    print(f"       {alert['detail']}")`} />
      </div>

      <Div />

      {/* ══ SECTION 11 — GREAT EXPECTATIONS ════════════════════════════════════ */}
      <div style={S.sec}>
        <span style={S.tag}>Production validation framework</span>
        <h2 style={S.h2}>Great Expectations — automated validation at scale</h2>

        <p style={S.p}>
          Great Expectations (GX) is the standard open-source library for
          data validation in production ML pipelines. Instead of writing
          custom validation code, you define "expectations" — declarative
          statements about what your data should look like. GX runs them
          against your data and produces a detailed HTML report.
          It integrates with Airflow, dbt, Spark, and every major data platform.
        </p>

        <CodeBlock code={`# pip install great-expectations

import great_expectations as gx
import pandas as pd
import numpy as np

df = pd.read_csv('/tmp/swiggy_messy.csv')
for col in ['distance_km','restaurant_prep','order_value','delivery_time','star_rating']:
    df[col] = pd.to_numeric(df[col], errors='coerce')

# ── Create a GX context and data source ───────────────────────────────
context = gx.get_context(mode='ephemeral')   # in-memory context (no filesystem setup)

data_source = context.data_sources.add_pandas(name='swiggy')
data_asset  = data_source.add_dataframe_asset(name='orders')
batch_def   = data_asset.add_batch_definition_whole_dataframe('full_batch')
batch       = batch_def.get_batch(batch_parameters={'dataframe': df})

# ── Define an Expectation Suite ───────────────────────────────────────
suite = context.suites.add(
    gx.ExpectationSuite(name='swiggy_orders_suite')
)

# Column existence
suite.add_expectation(gx.expectations.ExpectColumnToExist(column='order_id'))
suite.add_expectation(gx.expectations.ExpectColumnToExist(column='delivery_time'))
suite.add_expectation(gx.expectations.ExpectColumnToExist(column='star_rating'))

# Null checks
suite.add_expectation(gx.expectations.ExpectColumnValuesToNotBeNull(
    column='order_id',
))
suite.add_expectation(gx.expectations.ExpectColumnValuesToNotBeNull(
    column='delivery_time',
))

# Uniqueness
suite.add_expectation(gx.expectations.ExpectColumnValuesToBeUnique(
    column='order_id',
))

# Value ranges
suite.add_expectation(gx.expectations.ExpectColumnValuesToBeBetween(
    column='delivery_time', min_value=1, max_value=180,
    mostly=0.99,   # allow 1% exceptions
))
suite.add_expectation(gx.expectations.ExpectColumnValuesToBeBetween(
    column='distance_km', min_value=0.1, max_value=50,
    mostly=0.98,
))
suite.add_expectation(gx.expectations.ExpectColumnValuesToBeBetween(
    column='star_rating', min_value=1.0, max_value=5.0,
    mostly=0.99,
))

# Allowed values
suite.add_expectation(gx.expectations.ExpectColumnValuesToBeInSet(
    column='time_slot',
    value_set=['breakfast','lunch','evening','dinner'],
    mostly=0.99,
))

# Distribution checks
suite.add_expectation(gx.expectations.ExpectColumnMeanToBeBetween(
    column='delivery_time', min_value=20, max_value=60,
))
suite.add_expectation(gx.expectations.ExpectColumnProportionOfUniqueValuesToBeBetween(
    column='city', min_value=0.0001, max_value=0.01,
))

# Row count sanity
suite.add_expectation(gx.expectations.ExpectTableRowCountToBeBetween(
    min_value=1_000, max_value=50_000_000,
))

# ── Run validation ─────────────────────────────────────────────────────
validation_def = context.validation_definitions.add(
    gx.ValidationDefinition(
        name='swiggy_validation',
        data=batch_def,
        suite=suite,
    )
)

result = validation_def.run(batch_parameters={'dataframe': df})

# ── Parse results ─────────────────────────────────────────────────────
print(f"\\nValidation result: {'PASSED' if result.success else 'FAILED'}")
print(f"Expectations: {result.statistics['successful_expectations']} passed / "
      f"{result.statistics['evaluated_expectations']} total")

for er in result.results:
    status = "✓" if er.success else "✗"
    name   = er.expectation_config.type
    print(f"  [{status}] {name}")
    if not er.success and hasattr(er.result, 'unexpected_count'):
        print(f"        unexpected: {er.result.unexpected_count:,} rows")`} />
      </div>

      <Div />

      {/* ══ SECTION 12 — FULL PIPELINE ═════════════════════════════════════════ */}
      <div style={S.sec}>
        <span style={S.tag}>Putting it all together</span>
        <h2 style={S.h2}>The complete cleaning pipeline — one class, all steps</h2>

        <CodeBlock code={`import pandas as pd
import numpy as np
import logging
import json
from pathlib import Path
from datetime import datetime

logger = logging.getLogger('data_cleaner')

CITY_CANONICAL = {
    'bangalore': 'Seattle','bengaluru': 'Seattle','banglore': 'Seattle',
    'mumbai': 'New York','bombay': 'New York',
    'delhi': 'Delhi','new delhi': 'Delhi',
    'hyderabad': 'Austin','pune': 'Boston','chennai': 'Chicago',
}

RESTAURANT_CANONICAL = {
    "mcdonald's": "McDonald's", 'mcdonalds': "McDonald's",
    'pizza hut': 'Pizza Hut', 'biryani blues': 'Biryani Blues',
    "haldiram's": "Haldiram's", 'haldirams': "Haldiram's",
    'kfc': 'KFC', 'dominos': 'Dominos', "domino's": 'Dominos',
    'subway': 'Subway', 'burger king': 'Burger King',
}

class DoorDashDataCleaner:
    """
    End-to-end data cleaning pipeline for DoorDash orders data.
    Each step is a separate method — easy to test and override individually.
    """

    def __init__(self, log_path: Path = None):
        self.log_path   = log_path
        self.audit_log: list = []
        self._start_n:  int  = 0

    def _log(self, step: str, rows_before: int, rows_after: int, detail: str = ''):
        entry = {
            'step':         step,
            'rows_before':  rows_before,
            'rows_after':   rows_after,
            'rows_removed': rows_before - rows_after,
            'detail':       detail,
            'timestamp':    datetime.now().isoformat(),
        }
        self.audit_log.append(entry)
        logger.info(
            f"{step}: {rows_before:,} → {rows_after:,} rows "
            f"({entry['rows_removed']:,} removed) {detail}"
        )

    # ── Step 1: Coerce types ──────────────────────────────────────────
    def coerce_types(self, df: pd.DataFrame) -> pd.DataFrame:
        n = len(df)
        numeric = ['distance_km','restaurant_prep','order_value',
                   'delivery_time','star_rating','traffic_score']
        for col in numeric:
            if col in df.columns:
                df[col] = pd.to_numeric(df[col], errors='coerce')

        if 'created_at' in df.columns:
            df['created_at'] = pd.to_datetime(df['created_at'],
                                               format='mixed', errors='coerce')
        self._log('coerce_types', n, len(df), 'dtype conversion complete')
        return df

    # ── Step 2: Deduplicate ───────────────────────────────────────────
    def deduplicate(self, df: pd.DataFrame) -> pd.DataFrame:
        n = len(df)
        df = df.drop_duplicates(subset=['order_id'], keep='first')
        df = df.drop_duplicates()
        self._log('deduplicate', n, len(df))
        return df

    # ── Step 3: Clean strings ─────────────────────────────────────────
    def clean_strings(self, df: pd.DataFrame) -> pd.DataFrame:
        n = len(df)
        if 'city' in df.columns:
            df['city'] = (df['city'].astype(str).str.strip().str.lower()
                          .map(CITY_CANONICAL).fillna(df['city']))
        if 'restaurant' in df.columns:
            df['restaurant'] = (df['restaurant'].astype(str).str.strip().str.lower()
                                .map(RESTAURANT_CANONICAL).fillna(df['restaurant']))
        if 'time_slot' in df.columns:
            df['time_slot'] = df['time_slot'].astype(str).str.strip().str.lower()
        self._log('clean_strings', n, len(df), 'city + restaurant normalised')
        return df

    # ── Step 4: Remove impossibles ────────────────────────────────────
    def remove_impossible(self, df: pd.DataFrame) -> pd.DataFrame:
        n = len(df)
        df.loc[df['distance_km'] <= 0, 'distance_km']      = np.nan
        df.loc[df['delivery_time'] <= 0, 'delivery_time']  = np.nan
        df.loc[df['order_value'] <= 0, 'order_value']      = np.nan
        df.loc[df['star_rating'] < 1,  'star_rating']      = np.nan
        df.loc[df['star_rating'] > 5,  'star_rating']      = np.nan
        self._log('remove_impossible', n, len(df), 'invalid range values → NaN')
        return df

    # ── Step 5: Handle outliers ───────────────────────────────────────
    def handle_outliers(self, df: pd.DataFrame) -> pd.DataFrame:
        n = len(df)
        for col, q in [('delivery_time', 0.99), ('distance_km', 0.99),
                        ('order_value', 0.995), ('restaurant_prep', 0.99)]:
            if col in df.columns:
                cap = df[col].quantile(q)
                df[f'{col}_capped'] = (df[col] > cap).astype(int)
                df[col] = df[col].clip(upper=cap)
        self._log('handle_outliers', n, len(df), 'outliers clipped + flagged')
        return df

    # ── Step 6: Fix derived labels ────────────────────────────────────
    def fix_derived_labels(self, df: pd.DataFrame) -> pd.DataFrame:
        n = len(df)
        if 'delivery_time' in df.columns:
            df['is_late'] = df['delivery_time'] > 45
        self._log('fix_derived_labels', n, len(df), 'is_late recomputed from delivery_time')
        return df

    # ── Step 7: Drop rows that are still unusable ─────────────────────
    def drop_unusable(self, df: pd.DataFrame,
                      required: list = None) -> pd.DataFrame:
        n = len(df)
        required = required or ['distance_km','delivery_time','order_value']
        df = df.dropna(subset=required)
        self._log('drop_unusable', n, len(df), f'dropped rows with null in {required}')
        return df

    # ── Run all steps ─────────────────────────────────────────────────
    def run(self, df: pd.DataFrame) -> pd.DataFrame:
        self._start_n  = len(df)
        self.audit_log = []
        logger.info(f"Cleaning started: {self._start_n:,} rows")

        df = self.coerce_types(df)
        df = self.deduplicate(df)
        df = self.clean_strings(df)
        df = self.remove_impossible(df)
        df = self.handle_outliers(df)
        df = self.fix_derived_labels(df)
        df = self.drop_unusable(df)
        df = df.reset_index(drop=True)

        total_removed = self._start_n - len(df)
        logger.info(
            f"Cleaning complete: {len(df):,} rows retained "
            f"({total_removed:,} removed, {total_removed/self._start_n*100:.1f}%)"
        )

        if self.log_path:
            self.log_path.write_text(
                json.dumps(self.audit_log, indent=2, default=str)
            )
        return df

# ── Run the pipeline ──────────────────────────────────────────────────
logging.basicConfig(level=logging.INFO,
                    format='%(asctime)s  %(levelname)s  %(message)s')

df_raw   = pd.read_csv('/tmp/swiggy_messy.csv')
cleaner  = DoorDashDataCleaner(log_path=Path('/tmp/cleaning_audit.json'))
df_clean = cleaner.run(df_raw)

print(f"\nFinal dataset: {len(df_clean):,} rows × {len(df_clean.columns)} columns")
print(f"NaN in core columns: {df_clean[['distance_km','delivery_time','order_value']].isnull().sum().to_dict()}")
df_clean.to_parquet('/tmp/swiggy_clean.parquet', index=False, compression='snappy')
print("Saved to /tmp/swiggy_clean.parquet")`} />
      </div>

      <Div />

      {/* ══ SECTION 13 — ERRORS ════════════════════════════════════════════════ */}
      <div style={S.sec}>
        <span style={S.tag}>Errors you will hit</span>
        <h2 style={S.h2}>Every common data cleaning error — explained and fixed</h2>

        <ErrorBlock
          error="ValueError: Cannot convert non-finite values (NA or inf) to integer"
          cause="You are calling .astype(int) on a column that contains NaN or infinity. Standard Python integers cannot represent NaN — only floats can. This happens after pd.to_numeric() or after arithmetic that produced inf (e.g. division by zero)."
          fix="Replace infinities before casting: df[col] = df[col].replace([np.inf, -np.inf], np.nan). Then handle NaN before casting: df[col].fillna(0).astype(int) or use pandas nullable integer: df[col].astype('Int64') (capital I) which supports NaN natively."
        />

        <ErrorBlock
          error="TypeError: boolean value of NA is ambiguous"
          cause="You are using a pandas NA value in a boolean context — for example, in an if statement or as part of a boolean mask. This happens when a column has pd.NA (pandas NA) rather than np.nan, typically after using nullable dtypes like 'Int64' or 'boolean'."
          fix="Use explicit null checks instead of truthy evaluation: df.loc[df['col'].notna() and df['col'] > 0] should be df.loc[df['col'].notna() & (df['col'] > 0)]. Always use .notna() / .isna() for null checks rather than comparing with None or testing truthiness."
        />

        <ErrorBlock
          error="Memory error or extremely slow deduplication on large DataFrame"
          cause="df.drop_duplicates() on a DataFrame with many columns hashes every row — expensive for wide tables. On 10+ million rows with 50+ columns this can exhaust memory or take minutes."
          fix="Deduplicate on the business key only: df.drop_duplicates(subset=['order_id'], keep='first'). This hashes only one column instead of all columns. If you need full-row deduplication on a very large dataset, compute a row hash first: df['_hash'] = pd.util.hash_pandas_object(df, index=False) then deduplicate on _hash."
        />

        <ErrorBlock
          error="UnicodeDecodeError: 'utf-8' codec can't decode byte 0x... when reading CSV"
          cause="The CSV file was saved with a non-UTF-8 encoding — common with files exported from Windows Excel (often CP1252 or Latin-1) or files from legacy Indian government databases (sometimes UTF-16 or ISO-8859-1)."
          fix="Try pd.read_csv(file, encoding='latin-1') or pd.read_csv(file, encoding='cp1252'). To detect encoding automatically: pip install chardet, then import chardet; chardet.detect(open(file,'rb').read(10000)) tells you the encoding. Always save cleaned files as UTF-8: df.to_csv(path, encoding='utf-8-sig', index=False)."
        />

        <ErrorBlock
          error="SettingWithCopyWarning during cleaning pipeline (chained assignment)"
          cause="Cleaning pipelines often select a subset of a DataFrame and then assign to it in separate steps — creating the chained assignment bug. df[mask]['col'] = value modifies a temporary copy, not the original DataFrame. The warning means your assignment may have silently done nothing."
          fix="Always use .loc for in-place assignments in cleaning pipelines: df.loc[mask, 'col'] = value. Or use df.copy() explicitly at the start of each cleaning method to ensure you are working on an independent copy. Adding pd.options.mode.copy_on_write = True (Pandas 2.0+) makes this fail loudly instead of silently."
        />
      </div>

      <Div />

      {/* ══ SECTION 14 — WHAT'S NEXT ════════════════════════════════════════════ */}
      <div style={{ paddingBottom: 48, paddingTop: 8 }}>
        <span style={S.tag}>What comes next</span>
        <h2 style={S.h2}>
          You now have clean, validated data. It's time to build features from it.
        </h2>

        <p style={S.p}>
          Cleaning removes what is wrong. Validation catches new problems automatically.
          Together they ensure that the data reaching your model is trustworthy.
          The next module — Feature Engineering — takes clean data and transforms it
          into the representations that make ML models learn fastest and generalise best.
          Distance becomes log-distance. Timestamps become hour-of-day, day-of-week,
          and cyclical encodings. Categorical columns become embeddings or one-hot vectors.
          This transformation step consistently produces larger improvements
          than changing the model architecture.
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
              textTransform: 'uppercase' as const, color: '#1D9E75',
              fontFamily: 'var(--font-mono)', marginBottom: 5,
            }}>
              Next — Module 17 · Data Engineering
            </div>
            <div style={{
              fontSize: 15, fontWeight: 700, color: 'var(--text)',
              fontFamily: 'var(--font-display)', letterSpacing: '-0.3px',
            }}>
              Feature Engineering
            </div>
            <p style={{ ...S.ps, marginBottom: 0, marginTop: 4 }}>
              Transform raw columns into powerful model inputs — log transforms,
              interaction features, target encoding, embeddings, and the feature
              engineering techniques that consistently outperform model tuning.
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
          'Always audit before fixing. Run a comprehensive quality report first — count nulls, check ranges, list unique values, detect duplicates. You cannot clean systematically what you have not measured.',
          'Schema validation is a contract. Define every column\'s type, nullability, allowed values, and range as explicit code. Run validation on every new data batch — not just once during development.',
          'Deduplicate on the business key (order_id), not all columns. Full-row deduplication is slow and misses near-duplicates. Hash stable fields to catch near-duplicates from retry bugs and data merge issues.',
          'Type errors are silent killers. Use pd.to_numeric(errors="coerce") for numeric columns and pd.to_datetime(format="mixed", errors="coerce") for dates. Check how many values became NaN after coercion — a large number signals a serious upstream problem.',
          'Three outlier strategies: remove provably impossible values (delivery_time=0), clip extreme-but-real values to 99th percentile AND add a flag column, or keep outliers and let the model handle them. Never clip without flagging — you lose information silently.',
          'Consistency checks span multiple columns. delivery_time < distance_km/1.0 + 5 is physically impossible. is_late != (delivery_time > 45) is a label error. These cross-column rules catch a class of errors that column-level validation misses entirely.',
          'Schema drift detection is not optional for production pipelines. Capture a reference schema fingerprint (dtypes, null rates, value ranges, allowed categories) and compare every new batch against it. A 35% shift in mean delivery time or a new city value should trigger an alert before the data reaches your model.',
        ]}
      />
    </LearnLayout>
  )
}