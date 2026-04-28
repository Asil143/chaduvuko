import type { Metadata } from 'next'
import { LearnLayout } from '@/components/content/LearnLayout'
import { Callout } from '@/components/content/Callout'
import { KeyTakeaways } from '@/components/content/KeyTakeaways'
import MLPageHeader from '@/components/content/MLPageHeader'

export const metadata: Metadata = {
  title: 'Pandas DataFrames — Chaduvuko',
  description:
    'Load, clean, transform and explore real datasets. GroupBy, merge, missing values, pivot tables, and every operation ML projects actually need — with DoorDash and Stripe examples throughout.',
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

export default function PandasDataFramesPage() {
  return (
    <LearnLayout
      title="Pandas DataFrames"
      description="Load, clean, transform and explore real datasets. Every Pandas operation ML projects actually use — with DoorDash and Stripe examples throughout."
      section="Programming Ecosystem"
      readTime="45–58 min"
      updatedAt="March 2026"
    >
      <MLPageHeader section='programming' topic='pandas-dataframes' />

      {/* ══ SECTION 1 — HOOK ═══════════════════════════════════════════════════ */}
      <div style={S.sec}>
        <span style={S.tag}>Why Pandas exists</span>
        <h2 style={S.h2}>
          Real data never arrives as a clean NumPy array. It arrives as a mess.
        </h2>

        <p style={S.p}>
          NumPy is perfect for numerical computation — arrays of floats, matrix
          multiplications, vectorised operations. But real ML datasets are not
          pure numbers. They're a mix of dates, categories, free text, IDs,
          and numbers all in the same table. Some columns are missing values.
          Some have wrong types. Some need to be joined to other tables.
          Some need to be grouped, aggregated, and reshaped before a model
          can touch them.
        </p>

        <p style={S.p}>
          This is Pandas' job. It provides the DataFrame — a table with named
          columns, mixed types, and an enormous API for loading, cleaning,
          exploring, transforming, and exporting tabular data.
          Every single ML project starts in Pandas before the data ever
          reaches sklearn or PyTorch.
        </p>

        <p style={S.p}>
          The running dataset in this module is a simulated DoorDash order table —
          10,000 rows with order IDs, restaurant names, distances, delivery times,
          ratings, and some intentional data quality issues. By the end of this module
          you'll have cleaned it, explored it, engineered features from it,
          and prepared it for a model.
        </p>

        <HBox color="#888888">
          <p style={{ ...S.p, marginBottom: 8 }}>
            <span style={{ color: 'var(--text)', fontWeight: 700 }}>
              What this module covers:
            </span>
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 6 }}>
            {[
              'Series and DataFrame — the two core objects',
              'Creating DataFrames from dicts, arrays, and CSVs',
              'Exploring: head, info, describe, dtypes',
              'Selecting columns and rows — loc vs iloc',
              'Filtering rows with boolean conditions',
              'Handling missing values — detect, fill, drop',
              'Applying functions with apply and map',
              'GroupBy — aggregate by any column',
              'Merging and joining DataFrames',
              'Pivot tables and reshaping',
              'String operations on text columns',
              'DateTime features for time-series ML',
              'Exporting to NumPy for model training',
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
          The single most important habit in Pandas: run{' '}
          <span style={S.code as React.CSSProperties}>df.info()</span> and{' '}
          <span style={S.code as React.CSSProperties}>df.head()</span> on every
          dataset before touching it. You cannot clean what you haven't looked at.
          Most ML bugs originate from data assumptions that were never verified.
        </Callout>
      </div>

      <Div />

      {/* ══ SECTION 2 — CORE OBJECTS ═══════════════════════════════════════════ */}
      <div style={S.sec}>
        <span style={S.tag}>The two core objects</span>
        <h2 style={S.h2}>Series and DataFrame — the building blocks</h2>

        <p style={S.p}>
          Pandas has two primary objects. A <strong>Series</strong> is a
          one-dimensional labelled array — like a single column of a spreadsheet.
          A <strong>DataFrame</strong> is a two-dimensional labelled table —
          like a full spreadsheet. Every DataFrame is a collection of Series
          sharing the same index.
        </p>

        <VisualBox label="Series vs DataFrame — anatomy">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
            <div>
              <div style={{
                fontSize: 12, fontWeight: 700, color: '#378ADD',
                fontFamily: 'var(--font-mono)', marginBottom: 10,
              }}>
                Series — one column
              </div>
              <div style={{ border: '1px solid var(--border)', borderRadius: 7, overflow: 'hidden' }}>
                <div style={{
                  display: 'grid', gridTemplateColumns: '48px 1fr',
                  background: 'var(--surface)', padding: '6px 10px',
                  borderBottom: '1px solid var(--border)',
                }}>
                  <span style={{ fontSize: 10, color: 'var(--muted)', fontFamily: 'var(--font-mono)' }}>index</span>
                  <span style={{ fontSize: 10, fontWeight: 700, color: '#378ADD', fontFamily: 'var(--font-mono)' }}>delivery_time</span>
                </div>
                {[['0','28.4'],['1','35.1'],['2','41.7'],['3','22.9'],['4','38.5']].map(([idx, val], i) => (
                  <div key={i} style={{
                    display: 'grid', gridTemplateColumns: '48px 1fr',
                    padding: '5px 10px',
                    background: i % 2 === 0 ? 'transparent' : 'var(--surface)',
                    borderBottom: i < 4 ? '1px solid var(--border)' : 'none',
                  }}>
                    <span style={{ fontSize: 12, color: 'var(--muted)', fontFamily: 'var(--font-mono)' }}>{idx}</span>
                    <span style={{ fontSize: 12, color: 'var(--text)', fontFamily: 'var(--font-mono)' }}>{val}</span>
                  </div>
                ))}
              </div>
              <div style={{ fontSize: 10, color: 'var(--muted)', marginTop: 6, fontFamily: 'var(--font-mono)' }}>
                dtype: float64  len: 5
              </div>
            </div>
            <div>
              <div style={{
                fontSize: 12, fontWeight: 700, color: '#1D9E75',
                fontFamily: 'var(--font-mono)', marginBottom: 10,
              }}>
                DataFrame — multiple columns
              </div>
              <div style={{ border: '1px solid var(--border)', borderRadius: 7, overflow: 'hidden', overflowX: 'auto' as const }}>
                <div style={{
                  display: 'grid', gridTemplateColumns: '36px 1fr 1fr 1fr',
                  background: 'var(--surface)', padding: '6px 10px',
                  borderBottom: '1px solid var(--border)',
                }}>
                  {['', 'dist_km', 'time_min', 'rating'].map((h, i) => (
                    <span key={i} style={{ fontSize: 10, fontWeight: i > 0 ? 700 : 400, color: i > 0 ? '#1D9E75' : 'var(--muted)', fontFamily: 'var(--font-mono)' }}>{h}</span>
                  ))}
                </div>
                {[
                  ['0','3.2','28.4','4.5'],
                  ['1','5.8','35.1','3.8'],
                  ['2','7.1','41.7','4.2'],
                  ['3','1.9','22.9','5.0'],
                  ['4','4.4','38.5','4.1'],
                ].map((row, i) => (
                  <div key={i} style={{
                    display: 'grid', gridTemplateColumns: '36px 1fr 1fr 1fr',
                    padding: '5px 10px',
                    background: i % 2 === 0 ? 'transparent' : 'var(--surface)',
                    borderBottom: i < 4 ? '1px solid var(--border)' : 'none',
                  }}>
                    {row.map((cell, j) => (
                      <span key={j} style={{
                        fontSize: 12, fontFamily: 'var(--font-mono)',
                        color: j === 0 ? 'var(--muted)' : 'var(--text)',
                      }}>
                        {cell}
                      </span>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </VisualBox>

        <CodeBlock code={`import pandas as pd
import numpy as np

# ── Series — one column ────────────────────────────────────────────────
delivery_times = pd.Series(
    [28.4, 35.1, 41.7, 22.9, 38.5],
    name='delivery_time_min',
)
print(delivery_times)
print(f"dtype: {delivery_times.dtype}")
print(f"mean:  {delivery_times.mean():.2f}")
print(f"index: {delivery_times.index.tolist()}")

# Series with custom index
ratings = pd.Series(
    [4.5, 3.8, 4.2, 5.0, 4.1],
    index=['order_001','order_002','order_003','order_004','order_005'],
    name='star_rating',
)
print(f"\\nrating for order_003: {ratings['order_003']}")

# ── DataFrame from a dict — most common construction ─────────────────
data = {
    'order_id':        ['SW001', 'SW002', 'SW003', 'SW004', 'SW005'],
    'restaurant':      ['Pizza Hut', 'Biryani Blues', 'McDonald\\'s', 'Haldiram\\'s', 'Dominos'],
    'distance_km':     [3.2, 5.8, 7.1, 1.9, 4.4],
    'delivery_time':   [28.4, 35.1, 41.7, 22.9, 38.5],
    'star_rating':     [4.5, 3.8, 4.2, 5.0, 4.1],
    'is_late':         [False, False, True, False, False],
}
df = pd.DataFrame(data)
print(df)
print(f"\\nShape: {df.shape}")   # (5, 6)

# ── DataFrame from a NumPy array ──────────────────────────────────────
X = np.random.randn(5, 3)
df_np = pd.DataFrame(
    X,
    columns=['feature_1', 'feature_2', 'feature_3'],
)
print(df_np.round(3))

# ── Every DataFrame is a dict of Series ──────────────────────────────
print(f"\\nType of df['distance_km']: {type(df['distance_km'])}")  # Series
print(f"Type of df[['distance_km']]: {type(df[['distance_km']])}")  # DataFrame (double brackets)
# Single brackets → Series, double brackets → DataFrame`} />
      </div>

      <Div />

      {/* ══ SECTION 3 — CREATING FROM FILES ═══════════════════════════════════ */}
      <div style={S.sec}>
        <span style={S.tag}>Loading data</span>
        <h2 style={S.h2}>Reading from CSV, JSON, SQL, Excel and Parquet</h2>

        <p style={S.p}>
          Most ML datasets come from files or databases. Pandas can read
          almost any format. The options you pass to these read functions
          directly determine data quality — getting them right saves hours
          of cleaning later.
        </p>

        <CodeBlock code={`import pandas as pd
import numpy as np
import io

# ── Generate realistic DoorDash dataset for this entire module ──────────
np.random.seed(42)
n = 10_000

restaurants = ['Pizza Hut','Biryani Blues','McDonald\\'s','Haldiram\\'s',
               'Dominos','KFC','Subway','Burger King','Barbeque Nation','Uber Eats Café']
cities      = ['Seattle','New York','Delhi','Austin','Boston','Chicago']
time_slots  = ['breakfast','lunch','evening','dinner']

df_raw = pd.DataFrame({
    'order_id':         [f'SW{i:06d}' for i in range(n)],
    'restaurant':       np.random.choice(restaurants, n),
    'city':             np.random.choice(cities, n),
    'distance_km':      np.abs(np.random.normal(4.0, 2.0, n)).round(2),
    'time_slot':        np.random.choice(time_slots, n),
    'restaurant_prep':  np.abs(np.random.normal(15, 5, n)).round(1),
    'traffic_score':    np.random.randint(1, 11, n),
    'order_value':      np.abs(np.random.normal(350, 150, n)).round(0),
    'delivery_time':    None,   # will be computed below
    'star_rating':      np.round(np.clip(np.random.normal(4.1, 0.6, n), 1, 5), 1),
    'is_late':          None,
})

# Realistic delivery time
df_raw['delivery_time'] = (
    8.6
    + 7.3  * df_raw['distance_km']
    + 0.8  * df_raw['restaurant_prep']
    + 1.5  * df_raw['traffic_score']
    + np.random.normal(0, 4, n)
).round(1)

df_raw['is_late'] = df_raw['delivery_time'] > 45

# Introduce realistic data quality issues
missing_idx = np.random.choice(n, size=500, replace=False)
df_raw.loc[missing_idx, 'star_rating'] = np.nan

prep_missing = np.random.choice(n, size=200, replace=False)
df_raw.loc[prep_missing, 'restaurant_prep'] = np.nan

wrong_dist = np.random.choice(n, size=30, replace=False)
df_raw.loc[wrong_dist, 'distance_km'] = -1.0   # data entry errors

# Save to CSV
df_raw.to_csv('/tmp/swiggy_orders.csv', index=False)
print(f"Dataset created: {df_raw.shape}")

# ── Reading from CSV ──────────────────────────────────────────────────
df = pd.read_csv(
    '/tmp/swiggy_orders.csv',
    dtype={
        'order_id':      str,
        'traffic_score': np.int32,
        'is_late':       bool,
    },
    # parse_dates=['order_date'],   # if there was a date column
    # na_values=['N/A', 'missing', ''],  # treat these as NaN
    # usecols=['order_id','distance_km','delivery_time'],  # read only some columns
)
print(f"\\nLoaded: {df.shape[0]:,} rows × {df.shape[1]} columns")

# ── Reading from other formats ────────────────────────────────────────

# JSON
df_raw.head(100).to_json('/tmp/orders.json', orient='records', indent=2)
df_json = pd.read_json('/tmp/orders.json')
print(f"JSON loaded: {df_json.shape}")

# Parquet — fast columnar format, preferred for large datasets
df_raw.to_parquet('/tmp/orders.parquet', index=False)
df_parq = pd.read_parquet('/tmp/orders.parquet')
print(f"Parquet loaded: {df_parq.shape}")

# SQL (with SQLite)
import sqlite3
conn = sqlite3.connect('/tmp/swiggy.db')
df_raw.head(1000).to_sql('orders', conn, if_exists='replace', index=False)
df_sql = pd.read_sql("SELECT * FROM orders WHERE delivery_time < 30", conn)
print(f"SQL query returned: {len(df_sql)} fast deliveries")`} />
      </div>

      <Div />

      {/* ══ SECTION 4 — EXPLORE ════════════════════════════════════════════════ */}
      <div style={S.sec}>
        <span style={S.tag}>Exploring data</span>
        <h2 style={S.h2}>The first five commands on every new dataset</h2>

        <p style={S.p}>
          Before touching a dataset you should always run the same five exploration
          commands. They take 30 seconds and reveal 90% of the data quality problems
          you'll spend hours debugging later if you skip them.
        </p>

        <CodeBlock code={`import pandas as pd
import numpy as np

df = pd.read_csv('/tmp/swiggy_orders.csv')

# ── 1. head() — see what the data looks like ───────────────────────────
print("=== head() ===")
print(df.head(5).to_string())   # first 5 rows
# df.tail(5)   → last 5 rows
# df.sample(5) → 5 random rows (great for spotting patterns)

# ── 2. info() — column types, non-null counts, memory ─────────────────
print("\\n=== info() ===")
df.info()
# Output:
# <class 'pandas.core.frame.DataFrame'>
# RangeIndex: 10000 entries, 0 to 9999
# Data columns (total 11 columns):
#  #   Column           Non-Null Count  Dtype
# ---  ------           --------------  -----
#  0   order_id         10000 non-null  object     ← string columns are 'object'
#  1   restaurant       10000 non-null  object
#  ...
#  9   star_rating      9500 non-null   float64    ← 500 missing values!
# dtypes: bool(1), float64(4), int32(1), int64(1), object(4)

# ── 3. describe() — statistical summary of numerical columns ───────────
print("\\n=== describe() ===")
print(df.describe().round(2).to_string())
# Shows: count, mean, std, min, 25%, 50%, 75%, max for each numeric column
# Look for: unexpected min/max, mean vs median divergence, wrong counts

# Include categorical columns too
print("\\n=== describe (all) ===")
print(df.describe(include='all').loc[['count','unique','top','freq']].to_string())

# ── 4. Check missing values ────────────────────────────────────────────
print("\\n=== Missing values ===")
missing = df.isnull().sum()
missing_pct = (df.isnull().mean() * 100).round(2)
missing_report = pd.DataFrame({
    'missing_count': missing,
    'missing_pct':   missing_pct,
}).query('missing_count > 0').sort_values('missing_pct', ascending=False)
print(missing_report)

# ── 5. Value counts — understand categorical columns ──────────────────
print("\\n=== Value counts ===")
print(df['city'].value_counts())
print("\\nTime slot distribution:")
print(df['time_slot'].value_counts(normalize=True).round(3))  # proportions

# ── dtypes — catch type issues early ──────────────────────────────────
print("\\n=== dtypes ===")
print(df.dtypes)

# Find columns that should be numeric but are stored as objects
obj_cols = df.select_dtypes(include='object').columns.tolist()
num_cols  = df.select_dtypes(include=[np.number]).columns.tolist()
print(f"\\nObject columns: {obj_cols}")
print(f"Numeric columns: {num_cols}")`} />
      </div>

      <Div />

      {/* ══ SECTION 5 — SELECTING ══════════════════════════════════════════════ */}
      <div style={S.sec}>
        <span style={S.tag}>Accessing data</span>
        <h2 style={S.h2}>Selecting rows and columns — loc vs iloc vs direct access</h2>

        <p style={S.p}>
          Pandas has three ways to select data. Direct column access with{' '}
          <span style={S.code as React.CSSProperties}>df['col']</span> for columns.
          <span style={S.code as React.CSSProperties}> .loc</span> for label-based
          selection (use column names and index labels).
          <span style={S.code as React.CSSProperties}> .iloc</span> for integer
          position-based selection (use numbers like NumPy).
          Mixing these up is the most common Pandas mistake beginners make.
        </p>

        <VisualBox label="loc vs iloc — when to use which">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
            <div style={{
              background: 'var(--surface)', border: '1px solid rgba(55,138,221,0.3)',
              borderRadius: 8, padding: '12px 14px',
            }}>
              <div style={{ fontSize: 12, fontWeight: 700, color: '#378ADD', fontFamily: 'var(--font-mono)', marginBottom: 8 }}>
                .loc — by LABEL
              </div>
              <div style={{ fontSize: 11, color: 'var(--muted)', fontFamily: 'var(--font-mono)', lineHeight: 1.9 }}>
                df.loc[0, 'distance_km']<br />
                df.loc[0:5, 'distance_km']<br />
                df.loc[:, 'city':'rating']<br />
                df.loc[df['city']=='Seattle']<br />
                <span style={{ color: '#378ADD' }}>End label IS included</span>
              </div>
            </div>
            <div style={{
              background: 'var(--surface)', border: '1px solid rgba(29,158,117,0.3)',
              borderRadius: 8, padding: '12px 14px',
            }}>
              <div style={{ fontSize: 12, fontWeight: 700, color: '#1D9E75', fontFamily: 'var(--font-mono)', marginBottom: 8 }}>
                .iloc — by POSITION
              </div>
              <div style={{ fontSize: 11, color: 'var(--muted)', fontFamily: 'var(--font-mono)', lineHeight: 1.9 }}>
                df.iloc[0, 3]<br />
                df.iloc[0:5, 3]<br />
                df.iloc[:, 2:5]<br />
                df.iloc[[0, 5, 99]]<br />
                <span style={{ color: '#1D9E75' }}>End index NOT included</span>
              </div>
            </div>
          </div>
        </VisualBox>

        <CodeBlock code={`import pandas as pd
import numpy as np

df = pd.read_csv('/tmp/swiggy_orders.csv')

# ── Column selection ─────────────────────────────────────────────────
dist      = df['distance_km']                          # Series
dist_df   = df[['distance_km']]                        # DataFrame (double brackets)
two_cols  = df[['distance_km', 'delivery_time']]       # multiple columns

# ── .loc — label based ────────────────────────────────────────────────
# Single row by index label
row_0 = df.loc[0]                                 # Series: all columns of row 0
val   = df.loc[0, 'distance_km']                  # scalar

# Range of rows and specific columns
subset = df.loc[0:4, ['distance_km', 'delivery_time', 'star_rating']]
print(subset)

# Boolean condition inside .loc
bangalore = df.loc[df['city'] == 'Seattle']
print(f"\\nSeattle orders: {len(bangalore):,}")

# Compound condition
evening_far = df.loc[
    (df['time_slot'] == 'evening') & (df['distance_km'] > 6)
]
print(f"Evening + far: {len(evening_far):,}")

# ── .iloc — position based ────────────────────────────────────────────
first_row   = df.iloc[0]           # first row
last_row    = df.iloc[-1]          # last row
first_5     = df.iloc[:5]          # first 5 rows
slice_2d    = df.iloc[0:5, 2:5]   # rows 0-4, columns 2-4

# Useful for train/test splits
n = len(df)
train_df = df.iloc[:int(0.8*n)]
test_df  = df.iloc[int(0.8*n):]
print(f"\\nTrain: {len(train_df):,}  Test: {len(test_df):,}")

# ── at / iat — fastest single value access ────────────────────────────
val_label = df.at[42, 'delivery_time']    # at: label
val_pos   = df.iat[42, 4]                 # iat: position (column 4)
print(f"\\ndelivery_time at row 42: {val_label}")

# ── .query() — SQL-like string syntax ─────────────────────────────────
# Readable alternative to complex boolean conditions
fast_close = df.query("delivery_time < 25 and distance_km < 3")
print(f"Fast and close: {len(fast_close):,}")

# Use @ to reference Python variables in query
max_dist = 5.0
moderate = df.query("distance_km <= @max_dist and star_rating >= 4.0")
print(f"Moderate distance, good rating: {len(moderate):,}")`} />
      </div>

      <Div />

      {/* ══ SECTION 6 — MISSING VALUES ═════════════════════════════════════════ */}
      <div style={S.sec}>
        <span style={S.tag}>Data quality</span>
        <h2 style={S.h2}>Handling missing values — detect, understand, decide, fix</h2>

        <p style={S.p}>
          Missing data is in every real dataset. The question is never
          "is there missing data?" but "why is it missing and what should I do about it?"
          There are three reasons data goes missing, and each calls for a
          different treatment.
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 24 }}>
          {[
            {
              type: 'MCAR — Missing Completely At Random',
              color: '#1D9E75',
              desc: 'The missingness has nothing to do with the data. A sensor randomly dropped readings. A survey respondent accidentally skipped a question. Safe to drop or impute with column mean/median.',
              example: 'star_rating is missing because the app crashed for 5% of users — no pattern.',
            },
            {
              type: 'MAR — Missing At Random',
              color: '#BA7517',
              desc: 'Missingness depends on other observed variables but not on the missing value itself. More careful imputation needed — use information from correlated columns.',
              example: 'restaurant_prep is missing more often for fast food restaurants — related to restaurant type, not prep time itself.',
            },
            {
              type: 'MNAR — Missing Not At Random',
              color: '#D85A30',
              desc: 'Missingness depends on the missing value itself. Dangerous — simple imputation introduces bias. Requires domain knowledge and careful handling.',
              example: 'High-value orders have missing payment details because users abandoned checkout — the missingness IS correlated with order value.',
            },
          ].map((item) => (
            <div key={item.type} style={{
              background: 'var(--surface)', border: '1px solid var(--border)',
              borderRadius: 8, padding: '13px 16px',
              borderLeft: `3px solid ${item.color}`,
            }}>
              <div style={{
                fontSize: 13, fontWeight: 700, color: item.color,
                fontFamily: 'var(--font-mono)', marginBottom: 5,
              }}>
                {item.type}
              </div>
              <p style={{ ...S.ps, marginBottom: 6 }}>{item.desc}</p>
              <div style={{
                fontSize: 11, color: 'var(--muted)', fontFamily: 'var(--font-mono)',
                padding: '5px 9px', background: 'var(--bg2)', borderRadius: 4,
                fontStyle: 'italic',
              }}>
                DoorDash example: {item.example}
              </div>
            </div>
          ))}
        </div>

        <CodeBlock code={`import pandas as pd
import numpy as np

df = pd.read_csv('/tmp/swiggy_orders.csv')

# ── Detecting missing values ───────────────────────────────────────────
print("Missing values per column:")
print(df.isnull().sum())

# Percentage missing
print("\\n% missing:")
print((df.isnull().mean() * 100).round(2))

# Where are the missing rows for star_rating?
missing_mask = df['star_rating'].isnull()
print(f"\\nMissing star_rating: {missing_mask.sum():,} rows")

# Check if missingness is random or patterned
print("\\nDoes missing rating correlate with delivery being late?")
print(df.groupby(missing_mask)['is_late'].mean())
# If proportions are similar → likely MCAR
# If late orders have higher missingness → MAR/MNAR

# ── Option 1: Drop rows with missing values ────────────────────────────
df_dropped = df.dropna()                             # drop any row with any NaN
df_drop_rating = df.dropna(subset=['star_rating'])   # only drop if rating is NaN
df_thresh = df.dropna(thresh=8)  # keep rows with at least 8 non-null values

print(f"\\nOriginal: {len(df):,}")
print(f"After dropna():                    {len(df_dropped):,}")
print(f"After dropna(subset=['rating']):   {len(df_drop_rating):,}")

# ── Option 2: Fill with a constant value ──────────────────────────────
df_filled = df.copy()
df_filled['star_rating'].fillna(0, inplace=True)       # fill with 0 (bad for ratings)
df_filled['star_rating'].fillna('unknown', inplace=True)  # only works for strings

# ── Option 3: Fill with statistics ────────────────────────────────────
mean_rating   = df['star_rating'].mean()
median_rating = df['star_rating'].median()

df_mean   = df.copy()
df_median = df.copy()
df_mean['star_rating'].fillna(mean_rating, inplace=True)
df_median['star_rating'].fillna(median_rating, inplace=True)

print(f"\\nMean rating:   {mean_rating:.3f}")
print(f"Median rating: {median_rating:.3f}")

# ── Option 4: Fill with group statistics (better) ─────────────────────
# Instead of global mean, use mean per restaurant — much more accurate
df_grouped = df.copy()
group_means = df.groupby('restaurant')['star_rating'].transform('mean')
df_grouped['star_rating'] = df_grouped['star_rating'].fillna(group_means)

# For restaurant_prep: fill with median per restaurant
group_prep_median = df.groupby('restaurant')['restaurant_prep'].transform('median')
df_grouped['restaurant_prep'] = df_grouped['restaurant_prep'].fillna(group_prep_median)

print(f"\\nAfter group-based fill — remaining NaN: {df_grouped.isnull().sum().sum()}")

# ── Option 5: Forward fill / backward fill — for time series ──────────
# If data is sorted by time, previous value is often the best estimate
df_sorted = df.sort_values('order_id').copy()
df_sorted['star_rating'] = df_sorted['star_rating'].ffill()  # forward fill
df_sorted['star_rating'] = df_sorted['star_rating'].bfill()  # backward fill

# ── Option 6: sklearn imputers — for production pipelines ─────────────
from sklearn.impute import SimpleImputer, KNNImputer

# SimpleImputer: mean, median, most_frequent, or constant
imp_median = SimpleImputer(strategy='median')
X_imp = imp_median.fit_transform(df[['distance_km','restaurant_prep','star_rating']])
print(f"\\nAfter SimpleImputer: NaN count = {np.isnan(X_imp).sum()}")`} />
      </div>

      <Div />

      {/* ══ SECTION 7 — APPLY AND MAP ══════════════════════════════════════════ */}
      <div style={S.sec}>
        <span style={S.tag}>Transforming data</span>
        <h2 style={S.h2}>apply, map and vectorised operations — transform any column</h2>

        <p style={S.p}>
          Transforming columns is the core of feature engineering. Pandas gives you
          three mechanisms: vectorised operations (fastest — use whenever possible),
          <span style={S.code as React.CSSProperties}> .map()</span> for element-wise
          transformation of a Series, and
          <span style={S.code as React.CSSProperties}> .apply()</span> for row-wise
          or column-wise operations on a DataFrame.
          Use them in that order of preference — vectorised operations are
          100× faster than apply loops.
        </p>

        <CodeBlock code={`import pandas as pd
import numpy as np

df = pd.read_csv('/tmp/swiggy_orders.csv')
df = df.dropna(subset=['star_rating','restaurant_prep'])

# ── Vectorised operations — ALWAYS try this first ────────────────────
# These apply to the whole column at once using C under the hood

# Create new features from existing ones
df['speed_kmph']    = df['distance_km'] / (df['delivery_time'] / 60)
df['total_time']    = df['delivery_time'] + df['restaurant_prep']
df['value_per_km']  = df['order_value'] / df['distance_km'].clip(lower=0.1)
df['log_distance']  = np.log1p(df['distance_km'])   # log(1+x) handles x=0
df['high_value']    = df['order_value'] > df['order_value'].quantile(0.75)

# Binning a continuous variable into categories
df['distance_bucket'] = pd.cut(
    df['distance_km'],
    bins=[0, 2, 4, 6, 100],
    labels=['very_short', 'short', 'medium', 'long'],
)

# Rank within groups
df['delivery_rank'] = df.groupby('city')['delivery_time'].rank(pct=True)

print(df[['distance_km','speed_kmph','distance_bucket','delivery_rank']].head(5).round(2))

# ── .map() — element-wise transformation on a Series ─────────────────
# Map categorical values to numbers
time_slot_map = {'breakfast': 0, 'lunch': 1, 'evening': 2, 'dinner': 3}
df['time_slot_num'] = df['time_slot'].map(time_slot_map)

# Map via a function
df['is_weekend'] = df['time_slot'].map(
    lambda s: 1 if s in ['evening', 'dinner'] else 0
)

# Map using another Series (like a dict from another table)
city_tier = pd.Series({'Seattle': 'T1', 'New York': 'T1', 'Delhi': 'T1',
                        'Austin': 'T1', 'Boston': 'T2', 'Chicago': 'T2'})
df['city_tier'] = df['city'].map(city_tier)
print(f"\\nCity tier distribution:\\n{df['city_tier'].value_counts()}")

# ── .apply() — row-wise or column-wise operations ─────────────────────
# Use ONLY when vectorised operations won't work

# apply on a Series (equivalent to map but more flexible)
def categorise_delivery(time):
    if time < 25:   return 'express'
    elif time < 40: return 'normal'
    else:           return 'delayed'

df['delivery_cat'] = df['delivery_time'].apply(categorise_delivery)
# ← Better vectorised alternative:
df['delivery_cat'] = pd.cut(
    df['delivery_time'],
    bins=[-np.inf, 25, 40, np.inf],
    labels=['express', 'normal', 'delayed'],
)

# apply on a DataFrame row (axis=1) — use when you need multiple columns
def compute_efficiency_score(row):
    """Custom score combining multiple features — can't vectorise easily."""
    base = row['star_rating'] * 10
    penalty = max(0, row['delivery_time'] - 35) * 0.5
    bonus   = max(0, 6 - row['distance_km']) * 1.0
    return base - penalty + bonus

df['efficiency_score'] = df.apply(compute_efficiency_score, axis=1)
print(f"\\nMean efficiency score: {df['efficiency_score'].mean():.2f}")

# WARNING: apply with axis=1 is slow — it's a Python loop over rows
# For 10,000 rows it's fine. For 10 million rows, rewrite as vectorised:
df['efficiency_score_fast'] = (
    df['star_rating'] * 10
    - (df['delivery_time'] - 35).clip(lower=0) * 0.5
    + (6 - df['distance_km']).clip(lower=0) * 1.0
)
# Identical result, 100× faster`} />
      </div>

      <Div />

      {/* ══ SECTION 8 — GROUPBY ════════════════════════════════════════════════ */}
      <div style={S.sec}>
        <span style={S.tag}>Aggregation</span>
        <h2 style={S.h2}>GroupBy — the most powerful Pandas operation</h2>

        <p style={S.p}>
          GroupBy splits the DataFrame into groups based on one or more columns,
          applies a function to each group, and combines the results.
          This is the core of almost all exploratory data analysis and feature engineering.
          It answers questions like "what is the average delivery time per restaurant?"
          or "which city has the highest fraud rate?" — the questions you answer
          before deciding what features to build.
        </p>

        <CodeBlock code={`import pandas as pd
import numpy as np

df = pd.read_csv('/tmp/swiggy_orders.csv')
df = df.dropna(subset=['star_rating','restaurant_prep'])

# ── Basic groupby — split, apply, combine ─────────────────────────────

# Average delivery time per city
city_avg = df.groupby('city')['delivery_time'].mean().sort_values()
print("Average delivery time by city:")
for city, avg in city_avg.items():
    bar = '█' * int(avg / 2)
    print(f"  {city:<12}: {bar} {avg:.1f} min")

# ── Multiple aggregations on one column ───────────────────────────────
city_stats = df.groupby('city')['delivery_time'].agg(
    ['mean', 'std', 'min', 'max', 'count']
).round(2)
print(f"\\n{city_stats}")

# ── Named aggregations — cleaner syntax ───────────────────────────────
restaurant_stats = df.groupby('restaurant').agg(
    order_count      = ('order_id',       'count'),
    avg_delivery     = ('delivery_time',  'mean'),
    avg_rating       = ('star_rating',    'mean'),
    avg_prep         = ('restaurant_prep','mean'),
    late_rate        = ('is_late',        'mean'),   # mean of bool = rate
    total_revenue    = ('order_value',    'sum'),
).round(2).sort_values('avg_delivery')

print(f"\\nRestaurant performance:")
print(restaurant_stats.to_string())

# ── Multi-column groupby ───────────────────────────────────────────────
slot_city = df.groupby(['time_slot','city']).agg(
    orders       = ('order_id',      'count'),
    avg_delivery = ('delivery_time', 'mean'),
    late_rate    = ('is_late',       'mean'),
).round(2)
print(f"\\nTime slot × city breakdown (first 8):")
print(slot_city.head(8).to_string())

# ── transform — add group stats back to original DataFrame ────────────
# This is crucial for feature engineering — add group-level statistics
# as per-row features without changing the shape of the DataFrame

df['city_avg_delivery']    = df.groupby('city')['delivery_time'].transform('mean')
df['restaurant_avg_rating']= df.groupby('restaurant')['star_rating'].transform('mean')
df['restaurant_late_rate'] = df.groupby('restaurant')['is_late'].transform('mean')

# Relative performance — how does this order compare to city average?
df['delivery_vs_city_avg'] = df['delivery_time'] - df['city_avg_delivery']

print(f"\\nFeatures added with transform:")
print(df[['delivery_time','city_avg_delivery','delivery_vs_city_avg']].head(5).round(2))

# ── filter — keep only groups meeting a condition ──────────────────────
# Keep only restaurants with at least 500 orders
active_restaurants = df.groupby('restaurant').filter(
    lambda g: len(g) >= 500
)
print(f"\\nOrders from restaurants with 500+ orders: {len(active_restaurants):,}")`} />
      </div>

      <Div />

      {/* ══ SECTION 9 — MERGE AND JOIN ═════════════════════════════════════════ */}
      <div style={S.sec}>
        <span style={S.tag}>Combining tables</span>
        <h2 style={S.h2}>Merge and join — combine data from multiple sources</h2>

        <p style={S.p}>
          Real ML projects always involve multiple tables. Orders table.
          Customers table. Restaurants table. Weather data. All need to be
          joined together before you can train a model.
          Pandas merge is SQL JOIN — if you know SQL joins, this is identical.
          If you don't, the examples below will make it clear immediately.
        </p>

        <VisualBox label="Four join types — which rows survive">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 10 }}>
            {[
              { type: 'inner', color: '#378ADD', desc: 'Only rows that match in BOTH tables. Most restrictive.', sql: 'INNER JOIN' },
              { type: 'left',  color: '#1D9E75', desc: 'All rows from left table. NaN where right has no match.', sql: 'LEFT JOIN' },
              { type: 'right', color: '#BA7517', desc: 'All rows from right table. NaN where left has no match.', sql: 'RIGHT JOIN' },
              { type: 'outer', color: '#7F77DD', desc: 'All rows from both tables. NaN wherever no match.', sql: 'FULL OUTER JOIN' },
            ].map((j) => (
              <div key={j.type} style={{
                background: 'var(--surface)', border: `1px solid ${j.color}30`,
                borderRadius: 7, padding: '10px 12px',
              }}>
                <div style={{ fontSize: 13, fontWeight: 700, color: j.color, fontFamily: 'var(--font-mono)', marginBottom: 5 }}>
                  how='{j.type}'
                </div>
                <p style={{ ...S.ps, marginBottom: 5 }}>{j.desc}</p>
                <div style={{ fontSize: 10, color: 'var(--muted)', fontFamily: 'var(--font-mono)' }}>SQL: {j.sql}</div>
              </div>
            ))}
          </div>
        </VisualBox>

        <CodeBlock code={`import pandas as pd
import numpy as np

df = pd.read_csv('/tmp/swiggy_orders.csv')

# ── Create supplementary tables to join ───────────────────────────────

# Restaurant metadata table
restaurant_meta = pd.DataFrame({
    'restaurant':    ['Pizza Hut','Biryani Blues','McDonald\\'s','Haldiram\\'s',
                      'Dominos','KFC','Subway','Burger King','Barbeque Nation','Uber Eats Café'],
    'cuisine_type':  ['Italian','Indian','American','Indian','Italian',
                      'American','American','American','Indian','Fusion'],
    'price_band':    ['medium','medium','low','low','low','low','low','low','high','medium'],
    'avg_prep_min':  [18, 22, 10, 15, 12, 10, 8, 10, 35, 20],
    'is_chain':      [True, False, True, True, True, True, True, True, False, False],
})

# City metadata table
city_meta = pd.DataFrame({
    'city':          ['Seattle','New York','Delhi','Austin','Boston','Chicago'],
    'city_tier':     [1, 1, 1, 1, 2, 2],
    'avg_income_lpa': [14.2, 16.8, 12.4, 13.1, 11.8, 10.9],
    'traffic_index': [8.2, 8.8, 7.9, 7.1, 6.4, 6.8],
})

# ── Inner join: orders + restaurant metadata ───────────────────────────
df_rich = df.merge(
    restaurant_meta,
    on='restaurant',       # join key
    how='inner',           # keep only matching rows
)
print(f"Orders after inner join with restaurant_meta: {len(df_rich):,}")
print(df_rich[['restaurant','cuisine_type','price_band','delivery_time']].head(3).to_string())

# ── Left join: add city metadata, keep all orders ──────────────────────
df_rich = df_rich.merge(
    city_meta,
    on='city',
    how='left',   # keep ALL orders even if city not in city_meta
)
print(f"\\nAfter adding city_meta: {len(df_rich):,}")
print(f"Null city_tier rows: {df_rich['city_tier'].isnull().sum()}")

# ── Join on different column names ────────────────────────────────────
# Suppose city_meta had column 'city_name' instead of 'city':
city_meta_renamed = city_meta.rename(columns={'city': 'city_name'})
df_test = df.merge(
    city_meta_renamed,
    left_on='city',        # column in left DataFrame
    right_on='city_name',  # column in right DataFrame
    how='left',
).drop(columns=['city_name'])   # remove duplicate column

# ── concat — stack DataFrames vertically ──────────────────────────────
# Stack multiple DataFrames with identical columns (e.g., multiple CSV files)
df_q1 = df.iloc[:2500].copy()
df_q2 = df.iloc[2500:5000].copy()
df_q3 = df.iloc[5000:7500].copy()
df_q4 = df.iloc[7500:].copy()

df_year = pd.concat([df_q1, df_q2, df_q3, df_q4], ignore_index=True)
print(f"\\nConcatenated: {len(df_year):,} rows")

# Horizontal concat (like adding columns) — rare, use merge instead
feature_block1 = df[['distance_km', 'traffic_score']].reset_index(drop=True)
feature_block2 = df[['restaurant_prep', 'order_value']].reset_index(drop=True)
combined_features = pd.concat([feature_block1, feature_block2], axis=1)
print(f"Combined features: {combined_features.shape}")`} />
      </div>

      <Div />

      {/* ══ SECTION 10 — STRING OPERATIONS ════════════════════════════════════ */}
      <div style={S.sec}>
        <span style={S.tag}>Text data</span>
        <h2 style={S.h2}>String operations — the .str accessor</h2>

        <p style={S.p}>
          Real datasets are full of string columns — restaurant names, addresses,
          product descriptions, customer comments. Before feeding them to a model
          you need to clean and extract information from them.
          The <span style={S.code as React.CSSProperties}>.str</span> accessor
          applies string methods to every element of a Series in one vectorised call.
        </p>

        <CodeBlock code={`import pandas as pd
import numpy as np

df = pd.read_csv('/tmp/swiggy_orders.csv')

# ── .str accessor — vectorised string operations ──────────────────────

# Basic cleaning
df['restaurant_clean'] = (
    df['restaurant']
    .str.strip()           # remove leading/trailing whitespace
    .str.lower()           # lowercase
    .str.replace("'", '')  # remove apostrophes
    .str.replace(' ', '_') # spaces → underscores
)

print("Cleaned restaurant names:")
print(df['restaurant_clean'].value_counts().head(5))

# String contains — filter by pattern
has_mc = df['restaurant'].str.contains("McDonald", case=False, na=False)
print(f"\\nMcDonald's orders: {has_mc.sum():,}")

# Starts/ends with
fast_food = df['restaurant'].str.startswith(('KFC','McDonald','Burger'))
print(f"Fast food orders: {fast_food.sum():,}")

# Extract with regex
# Suppose order_id is 'SW000042' — extract the numeric part
df['order_num'] = df['order_id'].str.extract(r'SW(\d+)').astype(int)
print(f"\\nFirst order numbers: {df['order_num'].head(5).tolist()}")

# Split a string column into multiple columns
df['time_category'] = df['time_slot'].str.upper()

# String length
df['restaurant_name_len'] = df['restaurant'].str.len()
print(f"\\nLongest restaurant name: {df.loc[df['restaurant_name_len'].idxmax(), 'restaurant']}")

# Replace with regex
df['restaurant_norm'] = df['restaurant'].str.replace(
    r"[^a-zA-Z0-9 ]",   # remove special chars
    '',
    regex=True
)

# Count occurrences of a pattern
df['n_spaces'] = df['restaurant'].str.count(' ')  # word count - 1
print(f"\\nRestaurant name word counts:")
print((df['n_spaces'] + 1).value_counts().sort_index())`} />
      </div>

      <Div />

      {/* ══ SECTION 11 — DATETIME ══════════════════════════════════════════════ */}
      <div style={S.sec}>
        <span style={S.tag}>Time features</span>
        <h2 style={S.h2}>DateTime features — extract time-based signals for ML</h2>

        <p style={S.p}>
          Time columns are one of the richest sources of features in ML.
          Hour of day, day of week, month, whether it's a holiday, days since
          last event — these consistently improve models for delivery time,
          demand forecasting, fraud detection, and anything with temporal patterns.
          Pandas makes extracting them trivial.
        </p>

        <CodeBlock code={`import pandas as pd
import numpy as np

np.random.seed(42)
n = 10_000

# Create a DataFrame with realistic timestamps
start = pd.Timestamp('2024-01-01')
end   = pd.Timestamp('2024-12-31')
timestamps = pd.to_datetime(
    np.random.randint(start.value, end.value, n)
)

df_time = pd.DataFrame({
    'order_id':      [f'SW{i:06d}' for i in range(n)],
    'order_time':    timestamps,
    'delivery_time': np.abs(np.random.normal(35, 8, n)),
})

# ── .dt accessor — vectorised datetime operations ─────────────────────
df_time['hour']         = df_time['order_time'].dt.hour
df_time['day_of_week']  = df_time['order_time'].dt.dayofweek   # 0=Mon, 6=Sun
df_time['day_of_week_name'] = df_time['order_time'].dt.day_name()
df_time['month']        = df_time['order_time'].dt.month
df_time['day_of_month'] = df_time['order_time'].dt.day
df_time['quarter']      = df_time['order_time'].dt.quarter
df_time['is_weekend']   = df_time['day_of_week'].isin([5, 6]).astype(int)
df_time['week_of_year'] = df_time['order_time'].dt.isocalendar().week.astype(int)

# Time-of-day buckets
def time_bucket(hour):
    if 6 <= hour < 11:  return 'breakfast'
    if 11 <= hour < 15: return 'lunch'
    if 15 <= hour < 19: return 'evening'
    if 19 <= hour < 23: return 'dinner'
    return 'late_night'

df_time['time_bucket'] = df_time['hour'].apply(time_bucket)

print("Sample datetime features:")
print(df_time[['order_time','hour','day_of_week_name','is_weekend','time_bucket']].head(8).to_string())

# ── Temporal aggregations ──────────────────────────────────────────────
hourly_volume = df_time.groupby('hour')['order_id'].count()
print(f"\\nPeak order hours:")
print(hourly_volume.sort_values(ascending=False).head(5))

# Average delivery time by hour — reveals traffic patterns
hourly_delivery = df_time.groupby('hour')['delivery_time'].mean().round(1)
peak_hours = hourly_delivery.sort_values(ascending=False).head(3)
print(f"\\nSlowest hours: {peak_hours.to_dict()}")

# ── Time differences — lag features ───────────────────────────────────
df_time_sorted = df_time.sort_values('order_time').reset_index(drop=True)

# Time since previous order (gap between consecutive orders)
df_time_sorted['time_since_prev'] = (
    df_time_sorted['order_time']
    .diff()
    .dt.total_seconds()
    .fillna(0)
)

# Days since epoch — useful as a raw numerical feature
df_time_sorted['days_since_epoch'] = (
    df_time_sorted['order_time'] - pd.Timestamp('2020-01-01')
).dt.days

print(f"\\nTime features shape: {df_time_sorted.shape}")

# ── Cyclic encoding — hour 23 is close to hour 0 ────────────────────
# Sine/cosine encoding preserves cyclical nature of time features
df_time['hour_sin'] = np.sin(2 * np.pi * df_time['hour'] / 24)
df_time['hour_cos'] = np.cos(2 * np.pi * df_time['hour'] / 24)
df_time['dow_sin']  = np.sin(2 * np.pi * df_time['day_of_week'] / 7)
df_time['dow_cos']  = np.cos(2 * np.pi * df_time['day_of_week'] / 7)

# Now hour 23 and hour 0 are numerically close (both near sin=0, cos=1)
print(f"\\nHour 0:  sin={df_time.loc[df_time['hour']==0,'hour_sin'].mean():.3f}")
print(f"Hour 23: sin={df_time.loc[df_time['hour']==23,'hour_sin'].mean():.3f}")
# Both near 0 — correctly recognised as adjacent in cyclical space`} />
      </div>

      <Div />

      {/* ══ SECTION 12 — TO NUMPY ══════════════════════════════════════════════ */}
      <div style={S.sec}>
        <span style={S.tag}>Connecting to sklearn</span>
        <h2 style={S.h2}>From DataFrame to NumPy — prepare data for model training</h2>

        <p style={S.p}>
          After all the loading, cleaning, and feature engineering,
          the final step is converting the DataFrame to NumPy arrays
          that sklearn, PyTorch, or XGBoost can consume.
          This bridge is where most beginners make the mistakes that
          silently corrupt model training — leaking the test set into
          the training pipeline, not handling categoricals correctly,
          or fitting scalers on the wrong data.
        </p>

        <CodeBlock code={`import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler, LabelEncoder
from sklearn.pipeline import Pipeline
from sklearn.linear_model import LinearRegression

df = pd.read_csv('/tmp/swiggy_orders.csv')
df = df.dropna(subset=['star_rating','restaurant_prep'])
df = df[df['distance_km'] > 0]   # remove negative distance errors

# ── Feature engineering ────────────────────────────────────────────────
time_slot_map = {'breakfast': 0, 'lunch': 1, 'evening': 2, 'dinner': 3}
df['time_slot_num']  = df['time_slot'].map(time_slot_map)
df['log_distance']   = np.log1p(df['distance_km'])
df['distance_x_traffic'] = df['distance_km'] * df['traffic_score']

# One-hot encode city
city_dummies = pd.get_dummies(df['city'], prefix='city', drop_first=True)
df = pd.concat([df, city_dummies], axis=1)

# ── Select features and target ─────────────────────────────────────────
FEATURES = [
    'distance_km', 'log_distance', 'restaurant_prep',
    'traffic_score', 'distance_x_traffic', 'time_slot_num',
    'star_rating', 'order_value',
] + [c for c in df.columns if c.startswith('city_')]

TARGET = 'delivery_time'

X = df[FEATURES].values    # .values converts to NumPy array
y = df[TARGET].values

print(f"X shape: {X.shape}")   # (n_samples, n_features)
print(f"y shape: {y.shape}")   # (n_samples,)
print(f"Any NaN in X: {np.isnan(X).any()}")   # must be False before training

# ── Train/test split ───────────────────────────────────────────────────
X_train, X_test, y_train, y_test = train_test_split(
    X, y,
    test_size=0.2,
    random_state=42,
)
print(f"Train: {X_train.shape}  Test: {X_test.shape}")

# ── Scale and train — the correct way ─────────────────────────────────
# NEVER fit the scaler on the full dataset — that leaks test info into training
# ALWAYS fit only on X_train, then transform both train and test

scaler = StandardScaler()
X_train_scaled = scaler.fit_transform(X_train)   # fit + transform training
X_test_scaled  = scaler.transform(X_test)         # only transform test (no fit!)

model = LinearRegression()
model.fit(X_train_scaled, y_train)
train_score = model.score(X_train_scaled, y_train)
test_score  = model.score(X_test_scaled, y_test)

print(f"\\nTrain R²: {train_score:.4f}")
print(f"Test R²:  {test_score:.4f}")

# ── Using a Pipeline — the production-ready way ───────────────────────
# Pipeline prevents data leakage automatically
pipe = Pipeline([
    ('scaler', StandardScaler()),
    ('model',  LinearRegression()),
])

pipe.fit(X_train, y_train)
print(f"\\nPipeline Test R²: {pipe.score(X_test, y_test):.4f}")

# ── Saving the prepared dataset ────────────────────────────────────────
feature_df = pd.DataFrame(X_train, columns=FEATURES)
feature_df['target'] = y_train
feature_df.to_parquet('/tmp/swiggy_ml_ready.parquet', index=False)
print(f"\\nSaved ML-ready dataset: {feature_df.shape}")`} />
      </div>

      <Div />

      {/* ══ SECTION 13 — ERRORS ════════════════════════════════════════════════ */}
      <div style={S.sec}>
        <span style={S.tag}>Errors you will hit</span>
        <h2 style={S.h2}>Every common Pandas error — explained and fixed</h2>

        <ErrorBlock
          error="SettingWithCopyWarning: A value is trying to be set on a copy of a slice"
          cause="You selected a subset of a DataFrame (which might be a view or a copy — Pandas can't always tell), then tried to modify it. This is the most common Pandas warning and it means your assignment may or may not have worked on the original DataFrame."
          fix="Use .copy() explicitly: df_sub = df[df['city']=='Seattle'].copy() then modify df_sub. Or use .loc to modify the original: df.loc[df['city']=='Seattle', 'column'] = value. The chained assignment df[mask]['col'] = val is always wrong — never do it."
        />

        <ErrorBlock
          error="KeyError: 'column_name'"
          cause="The column doesn't exist in the DataFrame. Caused by: typo in the column name, the column was dropped earlier in the pipeline, the DataFrame was loaded from a different file version, or trailing/leading whitespace in the column name."
          fix="Check df.columns.tolist() to see all column names. Check for whitespace: df.columns = df.columns.str.strip(). If loading from CSV, use df.rename(columns=str.strip) right after loading. Use df.get('column_name') to safely get a column that might not exist (returns None instead of raising)."
        />

        <ErrorBlock
          error="ValueError: cannot convert float NaN to integer"
          cause="You're trying to cast a column with NaN values to an integer dtype. Integers cannot represent NaN in standard NumPy — only floats can hold NaN. This usually happens when calling .astype(int) on a column that still has missing values."
          fix="Handle missing values before casting: df['col'].fillna(0).astype(int). Or use pandas nullable integer type: df['col'].astype('Int64') (capital I) which supports NaN. Or use .dropna() first if the NaN rows should be removed."
        />

        <ErrorBlock
          error="MergeError: No common columns to perform merge on"
          cause="You called df1.merge(df2) without specifying the join key and the two DataFrames share no column names. Or you specified on='column' but that column doesn't exist in both DataFrames."
          fix="Always specify the join key explicitly: df1.merge(df2, on='order_id'). If column names differ: df1.merge(df2, left_on='order_id', right_on='id'). Check both DataFrames' columns with print(df1.columns, df2.columns) before merging."
        />

        <ErrorBlock
          error="MemoryError when loading large CSV"
          cause="The CSV file is too large to fit in RAM. Pandas reads the entire file into memory by default. A 10GB CSV requires ~30GB of RAM after parsing."
          fix="Use chunksize to process in batches: for chunk in pd.read_csv('large.csv', chunksize=100_000): process(chunk). Or use dtype={'col': 'float32'} instead of float64 to halve memory. Or filter on load with usecols=['col1','col2'] to read only needed columns. For very large data, use Parquet with PyArrow or Polars instead of Pandas."
        />
      </div>

      <Div />

      {/* ══ SECTION 14 — WHAT'S NEXT ═══════════════════════════════════════════ */}
      <div style={{ paddingBottom: 48, paddingTop: 8 }}>
        <span style={S.tag}>What comes next</span>
        <h2 style={S.h2}>
          You can now take any real dataset from raw file to model-ready array.
        </h2>

        <p style={S.p}>
          The programming ecosystem section is complete. Python, NumPy, and Pandas —
          the three tools every ML engineer uses every day, and that every ML library
          is built on top of. Every algorithm in the Classical ML section
          assumes you can load data, explore it, clean it, engineer features,
          and convert it to a NumPy array. You can do all of that now.
        </p>

        <p style={S.p}>
          Module 11 begins the Data Engineering section with data collection —
          pulling data from REST APIs, SQL databases, file systems, and web scraping.
          In production ML, the data you get from your company's systems is never
          as clean as the datasets in tutorials. The next section closes that gap.
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
              Next — Module 11 · Data Engineering
            </div>
            <div style={{
              fontSize: 15, fontWeight: 700, color: 'var(--text)',
              fontFamily: 'var(--font-display)', letterSpacing: '-0.3px',
            }}>
              Data Collection — APIs, SQL, Files and Scraping
            </div>
            <p style={{ ...S.ps, marginBottom: 0, marginTop: 4 }}>
              Where ML data actually comes from and how to pull it reliably —
              REST APIs, SQL queries, Parquet files, and web scraping.
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
          'A Series is a 1D labelled array (one column). A DataFrame is a 2D labelled table (multiple columns sharing one index). Every DataFrame is a dict of Series.',
          'Always run df.info(), df.head(), df.describe(), df.isnull().sum(), and df.value_counts() on every new dataset before touching it. These five commands reveal 90% of data quality issues.',
          ".loc selects by label (column names, index labels) — end label IS included. .iloc selects by integer position (like NumPy) — end position NOT included. Never chain them: df.loc[mask]['col'] = val is always wrong — use df.loc[mask, col] = val.",
          'Missing data has three types: MCAR (safe to impute with statistics), MAR (use correlated columns), MNAR (dangerous — requires domain knowledge). Always check whether missingness is random before choosing an imputation strategy.',
          'GroupBy is split-apply-combine. Use .agg() for multiple aggregations, named aggregations for clean output, .transform() to add group statistics back to every row (essential for feature engineering without changing DataFrame shape).',
          'Always fit scalers and encoders on training data only, then transform both train and test. Fitting on the full dataset leaks test information into training — a silent bug that inflates evaluation metrics. Use sklearn Pipeline to prevent leakage automatically.',
          'For time columns use the .dt accessor to extract hour, day_of_week, month, is_weekend etc. Use sine/cosine encoding for cyclical features (hour, day of week) so that hour 23 and hour 0 are recognised as numerically adjacent.',
        ]}
      />
    </LearnLayout>
  )
}