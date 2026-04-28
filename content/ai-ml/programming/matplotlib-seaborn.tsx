import type { Metadata } from 'next'
import { LearnLayout } from '@/components/content/LearnLayout'
import { Callout } from '@/components/content/Callout'
import { KeyTakeaways } from '@/components/content/KeyTakeaways'
import MLPageHeader from '@/components/content/MLPageHeader'

export const metadata: Metadata = {
  title: 'Data Visualisation — Matplotlib and Seaborn — Chaduvuko',
  description:
    'Every plot an ML engineer actually uses. Distributions, correlations, model evaluation, feature importance, and learning curves — with clean, production-ready code throughout.',
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

export default function MatplotlibSeabornPage() {
  return (
    <LearnLayout
      title="Data Visualisation — Matplotlib and Seaborn"
      description="Every plot an ML engineer actually uses. Distributions, correlations, model evaluation, feature importance, and learning curves — with clean production-ready code."
      section="Programming Ecosystem"
      readTime="35–45 min"
      updatedAt="March 2026"
    >
      <MLPageHeader section='programming' topic='matplotlib-seaborn' />

      {/* ══ SECTION 1 — HOOK ═══════════════════════════════════════════════════ */}
      <div style={S.sec}>
        <span style={S.tag}>Why visualisation is not optional in ML</span>
        <h2 style={S.h2}>
          A model trained on unexamined data is a model trained on assumptions.
        </h2>

        <p style={S.p}>
          The Anscombe's Quartet problem: four datasets with identical means,
          variances, correlations, and regression lines — but completely different
          shapes. One is linear. One is curved. One has an outlier. One is a
          vertical cluster. A model trained on any of them without visualising
          first would produce identical numbers but completely different behaviour.
          The statistics alone cannot tell you which case you're in. The plot can.
        </p>

        <p style={S.p}>
          Visualisation in ML is not presentation work — it's diagnostic work.
          You plot distributions to find skew and outliers before preprocessing.
          You plot correlations to detect multicollinearity before feature selection.
          You plot residuals to find patterns the model didn't learn.
          You plot learning curves to diagnose overfitting vs underfitting.
          These plots directly change the decisions you make about data and models.
        </p>

        <p style={S.p}>
          This module teaches exactly the plots you will use every week as an
          ML engineer — not every matplotlib function, but the ones that actually
          appear in real project workflows, with the configuration options
          that make them readable and shareable.
        </p>

        <HBox color="#888888">
          <p style={{ ...S.p, marginBottom: 8 }}>
            <span style={{ color: 'var(--text)', fontWeight: 700 }}>
              What this module covers:
            </span>
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 6 }}>
            {[
              'Matplotlib architecture — figure, axes, the two APIs',
              'Seaborn — statistical plots in fewer lines',
              'Distribution plots — histogram, KDE, boxplot, violin',
              'Relationship plots — scatter, line, heatmap',
              'Categorical plots — bar, count, strip',
              'Subplots — putting multiple plots on one figure',
              'Feature importance visualisation',
              'Confusion matrix and classification reports',
              'Residual plots for regression diagnostics',
              'Learning curves — diagnose over/underfitting',
              'Saving figures for reports and presentations',
              'Style configuration for consistent, clean plots',
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
          Run all the code in this module in a Jupyter notebook — the plots render
          inline. Use <span style={S.code as React.CSSProperties}>%matplotlib inline</span> at
          the top of the notebook. For scripts, call{' '}
          <span style={S.code as React.CSSProperties}>plt.show()</span> at the end
          of each plot block to display it.
        </Callout>
      </div>

      <Div />

      {/* ══ SECTION 2 — MATPLOTLIB ARCHITECTURE ═══════════════════════════════ */}
      <div style={S.sec}>
        <span style={S.tag}>How matplotlib works</span>
        <h2 style={S.h2}>The Figure and Axes — matplotlib's two-layer architecture</h2>

        <p style={S.p}>
          Matplotlib has two distinct APIs that look similar but behave very differently.
          The <strong>pyplot API</strong> (plt.plot, plt.xlabel) is stateful —
          it tracks a "current figure" globally and is convenient for quick exploration.
          The <strong>object-oriented API</strong> (fig, ax = plt.subplots()) is
          explicit — you hold references to the figure and axes directly.
          For anything beyond a single plot, always use the OO API.
          Every professional ML codebase uses it.
        </p>

        <VisualBox label="Figure vs Axes — the anatomy of every matplotlib plot">
          <div style={{ display: 'flex', gap: 20, flexWrap: 'wrap', alignItems: 'flex-start' }}>
            <div style={{ flex: 1, minWidth: 200 }}>
              <div style={{
                border: '2px solid rgba(55,138,221,0.5)',
                borderRadius: 8, padding: 14,
                background: 'rgba(55,138,221,0.05)',
              }}>
                <div style={{
                  fontSize: 11, fontWeight: 700, color: '#378ADD',
                  fontFamily: 'var(--font-mono)', marginBottom: 10,
                }}>
                  Figure — the whole canvas
                </div>
                <div style={{
                  border: '2px solid rgba(29,158,117,0.5)',
                  borderRadius: 6, padding: 12,
                  background: 'rgba(29,158,117,0.05)',
                }}>
                  <div style={{
                    fontSize: 11, fontWeight: 700, color: '#1D9E75',
                    fontFamily: 'var(--font-mono)', marginBottom: 6,
                  }}>
                    Axes — one subplot
                  </div>
                  <div style={{ fontSize: 10, color: 'var(--muted)', lineHeight: 1.8, fontFamily: 'var(--font-mono)' }}>
                    x-axis (xlabel, xlim, xticks)<br />
                    y-axis (ylabel, ylim, yticks)<br />
                    title<br />
                    legend<br />
                    plot / scatter / bar / ...
                  </div>
                </div>
                <div style={{ fontSize: 10, color: 'var(--muted)', marginTop: 8, lineHeight: 1.6 }}>
                  figsize, dpi, suptitle<br />
                  can contain multiple Axes
                </div>
              </div>
            </div>
            <div style={{ flex: 1, minWidth: 220 }}>
              <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--muted)', fontFamily: 'var(--font-mono)', marginBottom: 8 }}>
                Two APIs — same result
              </div>
              <div style={{
                background: 'var(--surface)', border: '1px solid var(--border)',
                borderRadius: 7, padding: '10px 14px', marginBottom: 8,
              }}>
                <div style={{ fontSize: 11, fontWeight: 700, color: '#D85A30', fontFamily: 'var(--font-mono)', marginBottom: 5 }}>
                  pyplot API (implicit, avoid for complex plots)
                </div>
                <div style={{ fontSize: 11, color: 'var(--muted)', fontFamily: 'var(--font-mono)', lineHeight: 1.8 }}>
                  plt.plot(x, y)<br />
                  plt.xlabel("x")<br />
                  plt.title("My plot")<br />
                  plt.show()
                </div>
              </div>
              <div style={{
                background: 'var(--surface)', border: '1px solid rgba(0,230,118,0.3)',
                borderRadius: 7, padding: '10px 14px',
              }}>
                <div style={{ fontSize: 11, fontWeight: 700, color: '#00e676', fontFamily: 'var(--font-mono)', marginBottom: 5 }}>
                  OO API (explicit, always use this)
                </div>
                <div style={{ fontSize: 11, color: 'var(--muted)', fontFamily: 'var(--font-mono)', lineHeight: 1.8 }}>
                  fig, ax = plt.subplots()<br />
                  ax.plot(x, y)<br />
                  ax.set_xlabel("x")<br />
                  ax.set_title("My plot")<br />
                  plt.show()
                </div>
              </div>
            </div>
          </div>
        </VisualBox>

        <CodeBlock code={`import matplotlib.pyplot as plt
import matplotlib as mpl
import numpy as np
import pandas as pd

# ── Global style configuration — set once at top of every notebook ────
plt.style.use('dark_background')   # dark theme

mpl.rcParams.update({
    'figure.facecolor':  '#0f0f0f',
    'axes.facecolor':    '#161616',
    'axes.edgecolor':    '#333333',
    'axes.labelcolor':   '#efefef',
    'text.color':        '#efefef',
    'xtick.color':       '#888888',
    'ytick.color':       '#888888',
    'grid.color':        '#222222',
    'grid.linewidth':    0.6,
    'axes.grid':         True,
    'axes.spines.top':   False,
    'axes.spines.right': False,
    'font.family':       'sans-serif',
    'figure.dpi':        120,
})

ACCENT  = '#00e676'
BLUE    = '#378ADD'
GREEN   = '#1D9E75'
ORANGE  = '#D85A30'
PURPLE  = '#7F77DD'
MUTED   = '#888888'

# ── The OO API — the right way to make every plot ─────────────────────
np.random.seed(42)
x = np.linspace(0, 10, 200)
y = np.sin(x) + np.random.randn(200) * 0.2

fig, ax = plt.subplots(figsize=(9, 4))

ax.plot(x, y, color=BLUE, linewidth=1.5, alpha=0.8, label='Observed')
ax.plot(x, np.sin(x), color=ACCENT, linewidth=2, linestyle='--', label='True signal')
ax.fill_between(x, np.sin(x) - 0.3, np.sin(x) + 0.3,
                color=ACCENT, alpha=0.08, label='Uncertainty band')

ax.set_xlabel('Time (seconds)', fontsize=12)
ax.set_ylabel('Signal amplitude', fontsize=12)
ax.set_title('Noisy signal vs true signal', fontsize=14, fontweight='bold', pad=14)
ax.legend(framealpha=0.2, edgecolor='#333')
ax.set_xlim(0, 10)

plt.tight_layout()
plt.savefig('/tmp/basic_plot.png', dpi=150, bbox_inches='tight')
plt.show()

# ── Key plot customisation options ────────────────────────────────────
# Colors:     color='#378ADD', color='steelblue', color=(0.2, 0.5, 0.8)
# Linestyles: linestyle='-'  '--'  ':'  '-.'
# Markers:    marker='o'  's'  '^'  'x'  '.'
# Alpha:      alpha=0.5 (transparency)
# Linewidth:  linewidth=2.0
# Size:       markersize=6   (for scatter: s=50)
# Zorder:     zorder=3       (draw order — higher = on top)`} />

        <h3 style={S.h3}>Seaborn — statistical plots with less code</h3>

        <p style={S.p}>
          Seaborn is built on top of matplotlib and adds two things:
          beautiful defaults for statistical plots and a tighter integration
          with Pandas DataFrames. Most distribution and relationship plots
          are 2–3 lines in seaborn versus 15–20 lines in raw matplotlib.
          In practice: use seaborn for exploration, matplotlib for fine-tuned
          presentation.
        </p>

        <CodeBlock code={`import seaborn as sns
import matplotlib.pyplot as plt

# Set seaborn theme — integrates with matplotlib rcParams
sns.set_theme(
    style='darkgrid',
    palette='deep',
    rc={
        'figure.facecolor': '#0f0f0f',
        'axes.facecolor':   '#161616',
        'grid.color':       '#222222',
    }
)

# The key difference: seaborn accepts DataFrames directly
# You pass column names as strings — no need to extract arrays

# matplotlib:
# ax.scatter(df['distance_km'].values, df['delivery_time'].values)

# seaborn:
# sns.scatterplot(data=df, x='distance_km', y='delivery_time')`} />
      </div>

      <Div />

      {/* ══ SECTION 3 — GENERATE DATASET ═══════════════════════════════════════ */}
      <div style={S.sec}>
        <span style={S.tag}>Setup</span>
        <h2 style={S.h2}>The DoorDash dataset used throughout this module</h2>

        <p style={S.p}>
          All plots in this module use the same simulated DoorDash orders dataset
          from Module 10. Run this setup block once before the rest of the module.
        </p>

        <CodeBlock code={`import numpy as np
import pandas as pd
import matplotlib.pyplot as plt
import matplotlib as mpl
import seaborn as sns

np.random.seed(42)
n = 5_000

restaurants = ['Pizza Hut','Biryani Blues','McDonald\\'s','Haldiram\\'s',
               'Dominos','KFC','Subway','Burger King']
cities      = ['Seattle','New York','Delhi','Austin','Boston','Chicago']
time_slots  = ['breakfast','lunch','evening','dinner']

distance   = np.abs(np.random.normal(4.0, 2.0, n)).clip(0.5, 15)
traffic    = np.random.randint(1, 11, n)
prep_time  = np.abs(np.random.normal(15, 5, n)).clip(5, 35)
order_val  = np.abs(np.random.normal(350, 150, n)).clip(50, 1200)

delivery = (
    8.6 + 7.3*distance + 0.8*prep_time + 1.5*traffic
    + np.random.normal(0, 4, n)
).clip(10, 120)

df = pd.DataFrame({
    'restaurant':     np.random.choice(restaurants, n),
    'city':           np.random.choice(cities, n),
    'time_slot':      np.random.choice(time_slots, n),
    'distance_km':    distance.round(2),
    'traffic_score':  traffic,
    'prep_time':      prep_time.round(1),
    'order_value':    order_val.round(0),
    'delivery_time':  delivery.round(1),
    'star_rating':    np.round(np.clip(np.random.normal(4.1, 0.6, n), 1, 5), 1),
    'is_late':        delivery > 45,
})

# Add some engineered features
df['speed_kmph']    = (df['distance_km'] / (df['delivery_time'] / 60)).round(2)
df['value_bucket']  = pd.cut(df['order_value'], bins=[0,200,400,700,2000],
                              labels=['low','medium','high','premium'])

print(f"Dataset: {df.shape[0]:,} orders × {df.shape[1]} columns")
print(df.head(3).to_string())

# ── Style setup ────────────────────────────────────────────────────────
plt.style.use('dark_background')
mpl.rcParams.update({
    'figure.facecolor': '#0f0f0f', 'axes.facecolor': '#161616',
    'axes.edgecolor':   '#2a2a2a', 'axes.labelcolor': '#efefef',
    'text.color':       '#efefef', 'xtick.color': '#888',
    'ytick.color':      '#888',    'grid.color': '#1e1e1e',
    'grid.linewidth':   0.6,       'axes.grid': True,
    'axes.spines.top':  False,     'axes.spines.right': False,
    'font.size':        11,
})

ACCENT = '#00e676'; BLUE = '#378ADD'; GREEN = '#1D9E75'
ORANGE = '#D85A30'; PURPLE = '#7F77DD'; MUTED = '#888888'`} />
      </div>

      <Div />

      {/* ══ SECTION 4 — DISTRIBUTION PLOTS ════════════════════════════════════ */}
      <div style={S.sec}>
        <span style={S.tag}>Understanding your data</span>
        <h2 style={S.h2}>Distribution plots — see the shape of every feature before modelling</h2>

        <p style={S.p}>
          Before you preprocess a single feature, you need to know its distribution.
          Is it normally distributed? Right-skewed? Bimodal? Does it have outliers?
          These questions determine whether you should log-transform it, clip it,
          use it as-is, or engineer something new from it.
          Distribution plots answer all of them in seconds.
        </p>

        <h3 style={S.h3}>Histogram — the shape of a continuous variable</h3>

        <CodeBlock code={`# ── Histogram — see the distribution of any continuous feature ────────
fig, axes = plt.subplots(1, 3, figsize=(15, 4))
fig.suptitle('Delivery time distribution — raw and transformed', fontsize=14, fontweight='bold', y=1.02)

# Raw distribution
axes[0].hist(df['delivery_time'], bins=50, color=BLUE, alpha=0.8, edgecolor='none')
axes[0].axvline(df['delivery_time'].mean(),   color=ACCENT, linewidth=2, linestyle='--', label=f'Mean {df["delivery_time"].mean():.1f}')
axes[0].axvline(df['delivery_time'].median(), color=ORANGE, linewidth=2, linestyle=':',  label=f'Median {df["delivery_time"].median():.1f}')
axes[0].set_title('Raw delivery time')
axes[0].set_xlabel('Minutes')
axes[0].legend(framealpha=0.2)

# Log-transformed
log_delivery = np.log(df['delivery_time'])
axes[1].hist(log_delivery, bins=50, color=GREEN, alpha=0.8, edgecolor='none')
axes[1].set_title('Log(delivery time) — more normal')
axes[1].set_xlabel('log(minutes)')

# Compare multiple features on same scale (normalised)
for col, color in [('distance_km', BLUE), ('traffic_score', ORANGE), ('prep_time', PURPLE)]:
    vals = (df[col] - df[col].mean()) / df[col].std()
    axes[2].hist(vals, bins=50, alpha=0.4, color=color, label=col, edgecolor='none')
axes[2].set_title('Normalised features overlaid')
axes[2].set_xlabel('Standard deviations from mean')
axes[2].legend(framealpha=0.2)

plt.tight_layout()
plt.savefig('/tmp/histograms.png', dpi=150, bbox_inches='tight')
plt.show()

# ── Key things to look for ────────────────────────────────────────────
stats = df['delivery_time'].describe()
skewness = df['delivery_time'].skew()
kurtosis = df['delivery_time'].kurt()
print(f"Skewness: {skewness:.3f}  (>1 = right-skewed, <-1 = left-skewed)")
print(f"Kurtosis: {kurtosis:.3f}  (>3 = heavy tails)")
print(stats.round(2))`} />

        <h3 style={S.h3}>KDE plot — smooth density estimate</h3>

        <CodeBlock code={`# ── KDE — continuous smooth density, better than histogram for comparison ──
fig, axes = plt.subplots(1, 2, figsize=(14, 4))

# KDE per city — compare distributions across groups
for city, color in zip(df['city'].unique(),
                        [BLUE, GREEN, ORANGE, PURPLE, '#BA7517', ACCENT]):
    city_data = df.loc[df['city'] == city, 'delivery_time']
    city_data.plot.kde(ax=axes[0], color=color, linewidth=2, label=city, alpha=0.85)

axes[0].set_title('Delivery time distribution by city')
axes[0].set_xlabel('Delivery time (minutes)')
axes[0].set_xlim(0, 100)
axes[0].legend(framealpha=0.2, fontsize=9)

# seaborn histplot with KDE overlay
sns.histplot(
    data=df, x='delivery_time', hue='is_late',
    kde=True, bins=40,
    palette={True: ORANGE, False: BLUE},
    alpha=0.5,
    ax=axes[1],
)
axes[1].set_title('On-time vs late deliveries')
axes[1].set_xlabel('Delivery time (minutes)')

plt.tight_layout()
plt.savefig('/tmp/kde_plots.png', dpi=150, bbox_inches='tight')
plt.show()`} />

        <h3 style={S.h3}>Boxplot and violin plot — distribution summary with quartiles</h3>

        <p style={S.p}>
          A boxplot shows the median, quartiles, and outliers of a distribution.
          A violin plot adds the full KDE on each side — more information than a boxplot,
          especially for bimodal distributions. Use boxplots for quick comparison
          across many groups. Use violin plots when the shape matters.
        </p>

        <CodeBlock code={`fig, axes = plt.subplots(1, 2, figsize=(15, 5))

# ── Boxplot — delivery time per restaurant ─────────────────────────────
restaurant_order = (
    df.groupby('restaurant')['delivery_time']
    .median().sort_values().index.tolist()
)

df_box = df[['restaurant','delivery_time']].copy()

sns.boxplot(
    data=df_box,
    x='delivery_time', y='restaurant',
    order=restaurant_order,
    color=BLUE, width=0.5,
    flierprops=dict(marker='o', markerfacecolor=ORANGE, markersize=3, alpha=0.4),
    ax=axes[0],
)
axes[0].set_title('Delivery time by restaurant\n(sorted by median)', fontweight='bold')
axes[0].set_xlabel('Delivery time (minutes)')
axes[0].set_ylabel('')
axes[0].axvline(df['delivery_time'].median(), color=ACCENT,
                linewidth=1.5, linestyle='--', alpha=0.6, label='Overall median')
axes[0].legend(framealpha=0.2)

# ── Violin plot — delivery time by time of day ─────────────────────────
slot_order = ['breakfast','lunch','evening','dinner']
sns.violinplot(
    data=df,
    x='time_slot', y='delivery_time',
    order=slot_order,
    palette=[BLUE, GREEN, ORANGE, PURPLE],
    inner='quartile',    # show quartile lines inside violin
    alpha=0.75,
    ax=axes[1],
)
axes[1].set_title('Delivery time by time of day\n(violin = full distribution shape)', fontweight='bold')
axes[1].set_xlabel('Time slot')
axes[1].set_ylabel('Delivery time (minutes)')

plt.tight_layout()
plt.savefig('/tmp/boxplots.png', dpi=150, bbox_inches='tight')
plt.show()

# Key interpretation:
# Box: 25th–75th percentile (IQR)
# Line: median
# Whiskers: 1.5 × IQR beyond the box
# Dots beyond whiskers: outliers — investigate these!`} />
      </div>

      <Div />

      {/* ══ SECTION 5 — RELATIONSHIP PLOTS ════════════════════════════════════ */}
      <div style={S.sec}>
        <span style={S.tag}>Relationships between features</span>
        <h2 style={S.h2}>Scatter plots, line plots and correlation heatmaps</h2>

        <p style={S.p}>
          Relationship plots answer: does feature X help predict Y?
          Do features A and B contain redundant information?
          Is there a linear or non-linear relationship?
          These questions decide which features to include,
          which to engineer, and which to drop.
        </p>

        <h3 style={S.h3}>Scatter plot — the most important EDA plot</h3>

        <CodeBlock code={`fig, axes = plt.subplots(1, 3, figsize=(17, 5))

# ── Basic scatter: distance vs delivery time ───────────────────────────
sample = df.sample(1000, random_state=42)   # don't plot all 5000 — overplotting

axes[0].scatter(
    sample['distance_km'], sample['delivery_time'],
    alpha=0.35, s=20, color=BLUE, edgecolors='none',
)
# Add regression line
m, b = np.polyfit(df['distance_km'], df['delivery_time'], 1)
x_line = np.linspace(0, 14, 100)
axes[0].plot(x_line, m*x_line + b, color=ACCENT, linewidth=2, label=f'y = {m:.1f}x + {b:.1f}')
axes[0].set_title('Distance vs delivery time')
axes[0].set_xlabel('Distance (km)')
axes[0].set_ylabel('Delivery time (minutes)')
axes[0].legend(framealpha=0.2)

# ── Colour by category ────────────────────────────────────────────────
colors = {False: BLUE, True: ORANGE}
for is_late, group in sample.groupby('is_late'):
    axes[1].scatter(
        group['distance_km'], group['delivery_time'],
        alpha=0.4, s=18, color=colors[is_late],
        label='Late' if is_late else 'On-time',
        edgecolors='none',
    )
axes[1].axhline(45, color='#ff4757', linewidth=1.5, linestyle='--', alpha=0.7, label='45 min threshold')
axes[1].set_title('Late vs on-time orders')
axes[1].set_xlabel('Distance (km)')
axes[1].set_ylabel('Delivery time (minutes)')
axes[1].legend(framealpha=0.2)

# ── seaborn regplot — scatter + confidence band ────────────────────────
sns.regplot(
    data=sample, x='prep_time', y='delivery_time',
    scatter_kws=dict(alpha=0.3, s=15, color=PURPLE, edgecolors='none'),
    line_kws=dict(color=ACCENT, linewidth=2),
    ci=95,   # 95% confidence interval shaded
    ax=axes[2],
)
axes[2].set_title('Prep time vs delivery\n(with 95% CI band)')
axes[2].set_xlabel('Restaurant prep time (minutes)')
axes[2].set_ylabel('Delivery time (minutes)')

plt.tight_layout()
plt.savefig('/tmp/scatter_plots.png', dpi=150, bbox_inches='tight')
plt.show()

# Print correlations
print("Pearson correlations with delivery_time:")
numeric_cols = ['distance_km','traffic_score','prep_time','order_value','star_rating']
corr = df[numeric_cols + ['delivery_time']].corr()['delivery_time'].sort_values(ascending=False)
print(corr.round(3))`} />

        <h3 style={S.h3}>Correlation heatmap — detect multicollinearity</h3>

        <CodeBlock code={`# ── Correlation heatmap — essential before feature selection ─────────
fig, axes = plt.subplots(1, 2, figsize=(16, 6))

numeric_cols = ['distance_km','traffic_score','prep_time',
                'order_value','delivery_time','star_rating','speed_kmph']

corr_matrix = df[numeric_cols].corr()

# ── Heatmap with seaborn ──────────────────────────────────────────────
mask = np.triu(np.ones_like(corr_matrix, dtype=bool), k=1)   # hide upper triangle

sns.heatmap(
    corr_matrix,
    mask=mask,              # show lower triangle only
    annot=True,             # show numbers in each cell
    fmt='.2f',              # 2 decimal places
    cmap='RdBu_r',          # red=positive, blue=negative
    center=0,               # white at 0 correlation
    vmin=-1, vmax=1,
    square=True,
    linewidths=0.5,
    linecolor='#0f0f0f',
    cbar_kws={'shrink': 0.7},
    ax=axes[0],
)
axes[0].set_title('Feature correlation matrix\n(lower triangle only)', fontweight='bold')

# ── Absolute correlation with target — feature importance proxy ───────
target_corr = (
    corr_matrix['delivery_time']
    .drop('delivery_time')
    .abs()
    .sort_values(ascending=True)
)

colors = [ACCENT if v > 0.5 else BLUE if v > 0.3 else MUTED for v in target_corr.values]
bars = axes[1].barh(
    range(len(target_corr)), target_corr.values,
    color=colors, alpha=0.8, height=0.6,
)
axes[1].set_yticks(range(len(target_corr)))
axes[1].set_yticklabels(target_corr.index)
axes[1].set_title('|Correlation| with delivery_time\n(feature importance proxy)', fontweight='bold')
axes[1].set_xlabel('Absolute Pearson correlation')
axes[1].axvline(0.3, color='#ff4757', linewidth=1, linestyle=':', alpha=0.7, label='0.3 threshold')
axes[1].legend(framealpha=0.2)

# Add value labels
for bar, val in zip(bars, target_corr.values):
    axes[1].text(val + 0.01, bar.get_y() + bar.get_height()/2,
                 f'{val:.2f}', va='center', fontsize=9, color='var(--text)')

plt.tight_layout()
plt.savefig('/tmp/correlation_heatmap.png', dpi=150, bbox_inches='tight')
plt.show()

# Key insight: features with |corr| > 0.3 with target are worth including.
# Features with |corr| > 0.8 with EACH OTHER are redundant — drop one.`} />

        <h3 style={S.h3}>Pair plot — all relationships at once</h3>

        <CodeBlock code={`# ── Pair plot — all pairwise relationships in one figure ─────────────
# Warning: slow for > 6 features or > 5000 rows — always sample first
sample_small = df.sample(800, random_state=42)

pair_features = ['distance_km','prep_time','traffic_score','delivery_time']

g = sns.pairplot(
    sample_small[pair_features + ['is_late']],
    hue='is_late',
    palette={False: BLUE, True: ORANGE},
    diag_kind='kde',        # diagonal: density plots
    plot_kws=dict(alpha=0.35, s=12, edgecolors='none'),
    diag_kws=dict(alpha=0.6, fill=True),
    corner=True,            # only lower triangle — faster
)
g.figure.suptitle('Pairplot: key features coloured by late/on-time', y=1.01, fontsize=13, fontweight='bold')

plt.savefig('/tmp/pairplot.png', dpi=120, bbox_inches='tight')
plt.show()

# How to read a pairplot:
# Diagonal: distribution of each feature alone
# Off-diagonal: scatter of two features — colour reveals class separation
# If classes are well separated in a scatter → that pair is discriminative`} />
      </div>

      <Div />

      {/* ══ SECTION 6 — CATEGORICAL PLOTS ═════════════════════════════════════ */}
      <div style={S.sec}>
        <span style={S.tag}>Categorical features</span>
        <h2 style={S.h2}>Bar plots and count plots — understand categorical columns</h2>

        <p style={S.p}>
          Categorical features need different plots. Bar plots show aggregated
          statistics per category — average delivery time per restaurant,
          late rate per city. Count plots show how many samples fall in each
          category — class imbalance is one of the most important things
          to visualise before training a classifier.
        </p>

        <CodeBlock code={`fig, axes = plt.subplots(2, 2, figsize=(16, 12))
fig.suptitle('Categorical feature analysis', fontsize=15, fontweight='bold', y=1.01)

# ── 1. Bar plot: average delivery time per city ────────────────────────
city_stats = df.groupby('city').agg(
    mean_delivery = ('delivery_time', 'mean'),
    late_rate     = ('is_late', 'mean'),
    n_orders      = ('delivery_time', 'count'),
).sort_values('mean_delivery', ascending=False)

bars = axes[0,0].bar(
    city_stats.index, city_stats['mean_delivery'],
    color=BLUE, alpha=0.8, width=0.6,
)
axes[0,0].axhline(df['delivery_time'].mean(), color=ACCENT,
                   linewidth=1.5, linestyle='--', label='Overall mean')
axes[0,0].set_title('Average delivery time by city')
axes[0,0].set_ylabel('Minutes')
axes[0,0].legend(framealpha=0.2)
axes[0,0].tick_params(axis='x', rotation=30)

# Add value labels on bars
for bar in bars:
    h = bar.get_height()
    axes[0,0].text(bar.get_x() + bar.get_width()/2, h + 0.3,
                   f'{h:.1f}', ha='center', fontsize=9)

# ── 2. Horizontal bar: late rate per restaurant ────────────────────────
restaurant_late = (
    df.groupby('restaurant')['is_late']
    .mean()
    .sort_values(ascending=True)
)
colors = [ORANGE if v > 0.25 else BLUE for v in restaurant_late.values]
axes[0,1].barh(restaurant_late.index, restaurant_late.values * 100,
               color=colors, alpha=0.8, height=0.6)
axes[0,1].axvline(df['is_late'].mean() * 100, color=ACCENT,
                   linewidth=1.5, linestyle='--', label=f'Mean: {df["is_late"].mean()*100:.1f}%')
axes[0,1].set_title('Late delivery rate by restaurant')
axes[0,1].set_xlabel('Late rate (%)')
axes[0,1].legend(framealpha=0.2)

# ── 3. Count plot — class balance ─────────────────────────────────────
late_counts = df['is_late'].value_counts()
colors_bar  = [ORANGE if k else BLUE for k in late_counts.index]
bars2 = axes[1,0].bar(
    ['On-time', 'Late'], late_counts.values,
    color=colors_bar, alpha=0.8, width=0.5,
)
for bar, val in zip(bars2, late_counts.values):
    pct = val / len(df) * 100
    axes[1,0].text(bar.get_x() + bar.get_width()/2, val + 20,
                   f'{val:,}\n({pct:.1f}%)', ha='center', fontsize=10)
axes[1,0].set_title('Class distribution — late vs on-time\n(check for imbalance before classification)')
axes[1,0].set_ylabel('Number of orders')

# ── 4. Grouped bar: late rate by time slot per city ───────────────────
pivot = df.groupby(['time_slot','city'])['is_late'].mean().unstack()
slot_order = ['breakfast','lunch','evening','dinner']
pivot = pivot.loc[slot_order]

x = np.arange(len(slot_order))
width = 0.13
colors_cities = [BLUE, GREEN, ORANGE, PURPLE, '#BA7517', ACCENT]

for i, (city, color) in enumerate(zip(pivot.columns, colors_cities)):
    axes[1,1].bar(x + i*width, pivot[city]*100, width,
                  label=city, color=color, alpha=0.8)

axes[1,1].set_xticks(x + width*2.5)
axes[1,1].set_xticklabels(slot_order)
axes[1,1].set_title('Late rate by time slot and city (%)')
axes[1,1].set_ylabel('Late rate (%)')
axes[1,1].legend(framealpha=0.2, fontsize=8, ncol=2)

plt.tight_layout()
plt.savefig('/tmp/categorical_plots.png', dpi=150, bbox_inches='tight')
plt.show()`} />
      </div>

      <Div />

      {/* ══ SECTION 7 — SUBPLOTS ═══════════════════════════════════════════════ */}
      <div style={S.sec}>
        <span style={S.tag}>Multi-panel figures</span>
        <h2 style={S.h2}>Subplots — compose multiple plots into one figure</h2>

        <p style={S.p}>
          Production reports and ML papers always show multiple plots in one figure.
          <span style={S.code as React.CSSProperties}> plt.subplots(rows, cols)</span> is the
          main tool. For more complex layouts with unequal plot sizes,
          <span style={S.code as React.CSSProperties}> plt.subplot_mosaic()</span> gives you
          complete control with a text-based layout specification.
        </p>

        <CodeBlock code={`# ── Regular grid subplots ─────────────────────────────────────────────
fig, axes = plt.subplots(2, 3, figsize=(18, 10))
fig.suptitle('DoorDash EDA Dashboard', fontsize=16, fontweight='bold')

# Flatten for easy indexing
axs = axes.flatten()   # shape (2,3) → (6,) for easy looping

# Plot 1: Delivery time histogram
axs[0].hist(df['delivery_time'], bins=50, color=BLUE, alpha=0.8, edgecolor='none')
axs[0].axvline(df['delivery_time'].mean(), color=ACCENT, linewidth=2, linestyle='--')
axs[0].set_title('Delivery time distribution')
axs[0].set_xlabel('Minutes')

# Plot 2: Distance vs delivery scatter
sample = df.sample(800, random_state=1)
axs[1].scatter(sample['distance_km'], sample['delivery_time'],
               c=sample['traffic_score'], cmap='YlOrRd', alpha=0.5, s=15)
axs[1].set_title('Distance vs time\n(colour = traffic)')
axs[1].set_xlabel('Distance (km)')
axs[1].set_ylabel('Delivery (min)')

# Plot 3: Late rate by city
late_city = df.groupby('city')['is_late'].mean().sort_values(ascending=False)
axs[2].bar(late_city.index, late_city.values*100, color=ORANGE, alpha=0.8)
axs[2].set_title('Late rate by city (%)')
axs[2].tick_params(axis='x', rotation=35)

# Plot 4: Star rating distribution
axs[3].hist(df['star_rating'], bins=20, color=PURPLE, alpha=0.8, edgecolor='none')
axs[3].set_title('Star rating distribution')
axs[3].set_xlabel('Stars')

# Plot 5: Order value KDE
df['order_value'].plot.kde(ax=axs[4], color=GREEN, linewidth=2)
axs[4].fill_between(
    axs[4].lines[0].get_xdata(),
    axs[4].lines[0].get_ydata(),
    alpha=0.15, color=GREEN,
)
axs[4].set_title('Order value density')
axs[4].set_xlabel('Order value (₹)')
axs[4].set_xlim(0, 1000)

# Plot 6: Correlation with target
numeric = ['distance_km','traffic_score','prep_time','order_value','star_rating']
corr_vals = df[numeric].corrwith(df['delivery_time']).sort_values()
colors_corr = [ORANGE if v < 0 else BLUE for v in corr_vals.values]
axs[5].barh(corr_vals.index, corr_vals.values, color=colors_corr, alpha=0.8)
axs[5].axvline(0, color='#555', linewidth=0.8)
axs[5].set_title('Correlation with delivery time')
axs[5].set_xlabel('Pearson r')

plt.tight_layout()
plt.savefig('/tmp/dashboard.png', dpi=150, bbox_inches='tight')
plt.show()

# ── subplot_mosaic — custom layouts ───────────────────────────────────
fig, axd = plt.subplot_mosaic(
    """
    AABC
    AABD
    """,
    figsize=(16, 8),
)
# 'A' spans two rows on the left
# 'B' spans two rows in the middle
# 'C' and 'D' are small on the right

axd['A'].scatter(sample['distance_km'], sample['delivery_time'],
                  alpha=0.3, s=12, color=BLUE, edgecolors='none')
axd['A'].set_title('Main scatter plot (large panel)')

axd['B'].hist(df['delivery_time'], bins=40, color=GREEN, alpha=0.8, edgecolor='none')
axd['B'].set_title('Distribution')

axd['C'].bar(['Late','On-time'], df['is_late'].value_counts().values,
              color=[ORANGE, BLUE], alpha=0.8)
axd['C'].set_title('Class balance')

axd['D'].barh(late_city.index[:4], late_city.values[:4]*100, color=ORANGE, alpha=0.8)
axd['D'].set_title('Top 4 cities\nby late rate')

plt.suptitle('Custom mosaic layout', fontsize=14, fontweight='bold')
plt.tight_layout()
plt.show()`} />
      </div>

      <Div />

      {/* ══ SECTION 8 — ML-SPECIFIC PLOTS ═════════════════════════════════════ */}
      <div style={S.sec}>
        <span style={S.tag}>ML evaluation plots</span>
        <h2 style={S.h2}>The plots every ML project needs — model evaluation and diagnostics</h2>

        <p style={S.p}>
          The plots so far were for exploring raw data. These are for evaluating
          a trained model. Every ML project produces at least three of these:
          feature importance to understand what the model learned,
          residuals to find what it didn't learn, and learning curves
          to diagnose the training dynamics.
        </p>

        <h3 style={S.h3}>Feature importance plot</h3>

        <CodeBlock code={`from sklearn.ensemble import RandomForestRegressor
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import LabelEncoder
import matplotlib.pyplot as plt
import numpy as np

# Prepare features
df_model = df.copy()
for col in ['restaurant','city','time_slot','value_bucket']:
    df_model[col] = LabelEncoder().fit_transform(df_model[col].astype(str))

FEATURES = ['distance_km','traffic_score','prep_time','order_value',
            'star_rating','restaurant','city','time_slot']
X = df_model[FEATURES].values
y = df_model['delivery_time'].values

X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)
rf = RandomForestRegressor(n_estimators=100, random_state=42, n_jobs=-1)
rf.fit(X_train, y_train)

# ── Feature importance bar plot ────────────────────────────────────────
importances = rf.feature_importances_
sorted_idx  = np.argsort(importances)
names_sorted= [FEATURES[i] for i in sorted_idx]
vals_sorted = importances[sorted_idx]

fig, axes = plt.subplots(1, 2, figsize=(15, 5))

# Horizontal bar chart
colors = [ACCENT if v > 0.15 else BLUE if v > 0.08 else MUTED for v in vals_sorted]
bars = axes[0].barh(range(len(names_sorted)), vals_sorted, color=colors, alpha=0.85, height=0.65)
axes[0].set_yticks(range(len(names_sorted)))
axes[0].set_yticklabels(names_sorted)
axes[0].set_title(f'Random Forest feature importances\n(Test R² = {rf.score(X_test,y_test):.3f})',
                   fontweight='bold')
axes[0].set_xlabel('Mean decrease in impurity')
axes[0].axvline(0.05, color='#ff4757', linewidth=1, linestyle=':', alpha=0.7, label='5% threshold')
axes[0].legend(framealpha=0.2)

# Cumulative importance
axes[1].plot(range(len(names_sorted)), np.cumsum(vals_sorted[::-1]),
              color=ACCENT, linewidth=2, marker='o', markersize=5)
axes[1].axhline(0.90, color='#ff4757', linewidth=1.5, linestyle='--',
                 label='90% threshold')
axes[1].axhline(0.95, color=ORANGE, linewidth=1.5, linestyle='--',
                 label='95% threshold')
axes[1].set_xticks(range(len(names_sorted)))
axes[1].set_xticklabels(names_sorted[::-1], rotation=40, ha='right')
axes[1].set_title('Cumulative feature importance')
axes[1].set_ylabel('Cumulative importance')
axes[1].set_xlabel('Features (sorted by importance)')
axes[1].legend(framealpha=0.2)
axes[1].set_ylim(0, 1.05)

plt.tight_layout()
plt.savefig('/tmp/feature_importance.png', dpi=150, bbox_inches='tight')
plt.show()`} />

        <h3 style={S.h3}>Residual plots — regression diagnostics</h3>

        <CodeBlock code={`# ── Residual analysis — find what the model didn't learn ─────────────
y_pred = rf.predict(X_test)
residuals = y_test - y_pred

fig, axes = plt.subplots(1, 3, figsize=(17, 5))
fig.suptitle('Regression diagnostics — Random Forest', fontsize=14, fontweight='bold')

# 1. Predicted vs actual
axes[0].scatter(y_test, y_pred, alpha=0.3, s=12, color=BLUE, edgecolors='none')
lims = [min(y_test.min(), y_pred.min()), max(y_test.max(), y_pred.max())]
axes[0].plot(lims, lims, color=ACCENT, linewidth=2, label='Perfect prediction')
axes[0].set_xlabel('Actual delivery time (min)')
axes[0].set_ylabel('Predicted delivery time (min)')
axes[0].set_title('Predicted vs Actual')
axes[0].legend(framealpha=0.2)

# Annotate R²
from sklearn.metrics import r2_score, mean_absolute_error
r2  = r2_score(y_test, y_pred)
mae = mean_absolute_error(y_test, y_pred)
axes[0].text(0.05, 0.90, f'R² = {r2:.3f}\nMAE = {mae:.1f} min',
              transform=axes[0].transAxes, fontsize=10,
              color='var(--text)', bbox=dict(facecolor='#1a1a1a', alpha=0.7, edgecolor='#333'))

# 2. Residuals vs predicted — should show no pattern
axes[1].scatter(y_pred, residuals, alpha=0.3, s=12, color=ORANGE, edgecolors='none')
axes[1].axhline(0, color=ACCENT, linewidth=2)
axes[1].axhline(residuals.std()*2,  color='#ff4757', linewidth=1, linestyle='--', alpha=0.7)
axes[1].axhline(-residuals.std()*2, color='#ff4757', linewidth=1, linestyle='--', alpha=0.7,
                  label='±2σ bounds')
axes[1].set_xlabel('Predicted delivery time (min)')
axes[1].set_ylabel('Residual (actual − predicted)')
axes[1].set_title('Residuals vs Predicted\n(should be random scatter around 0)')
axes[1].legend(framealpha=0.2)

# 3. Residual distribution
axes[2].hist(residuals, bins=50, color=PURPLE, alpha=0.8, edgecolor='none', density=True)
from scipy.stats import norm
xr = np.linspace(residuals.min(), residuals.max(), 200)
axes[2].plot(xr, norm.pdf(xr, residuals.mean(), residuals.std()),
              color=ACCENT, linewidth=2, label='Normal fit')
axes[2].axvline(0, color='#ff4757', linewidth=1.5, linestyle='--')
axes[2].set_title(f'Residual distribution\n(mean={residuals.mean():.2f}, std={residuals.std():.2f})')
axes[2].set_xlabel('Residual (minutes)')
axes[2].legend(framealpha=0.2)

# Interpretation:
# Good: residuals symmetric around 0, roughly normal, no pattern in residuals vs predicted
# Bad: funnel shape → heteroscedasticity (variance increases with prediction)
# Bad: curve in residuals vs predicted → model missed non-linearity

plt.tight_layout()
plt.savefig('/tmp/residuals.png', dpi=150, bbox_inches='tight')
plt.show()`} />

        <h3 style={S.h3}>Confusion matrix — classification evaluation</h3>

        <CodeBlock code={`from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import confusion_matrix, classification_report
import seaborn as sns

# Train a classifier: predict is_late
rf_clf = RandomForestClassifier(n_estimators=100, random_state=42, n_jobs=-1)
y_clf  = df_model['is_late'].astype(int).values
X_tr2, X_te2, y_tr2, y_te2 = train_test_split(X, y_clf, test_size=0.2, random_state=42)
rf_clf.fit(X_tr2, y_tr2)
y_pred_clf = rf_clf.predict(X_te2)
y_proba    = rf_clf.predict_proba(X_te2)[:, 1]

# ── Confusion matrix ──────────────────────────────────────────────────
fig, axes = plt.subplots(1, 3, figsize=(17, 5))

cm = confusion_matrix(y_te2, y_pred_clf)
cm_norm = confusion_matrix(y_te2, y_pred_clf, normalize='true')

# Raw counts
sns.heatmap(
    cm, annot=True, fmt='d', cmap='Blues',
    xticklabels=['On-time','Late'],
    yticklabels=['On-time','Late'],
    linewidths=2, linecolor='#0f0f0f',
    ax=axes[0], cbar=False,
    annot_kws={'size': 16, 'weight': 'bold'},
)
axes[0].set_title('Confusion matrix\n(raw counts)', fontweight='bold')
axes[0].set_xlabel('Predicted label')
axes[0].set_ylabel('True label')

# Normalised (recall per class)
sns.heatmap(
    cm_norm, annot=True, fmt='.2%', cmap='Blues',
    xticklabels=['On-time','Late'],
    yticklabels=['On-time','Late'],
    linewidths=2, linecolor='#0f0f0f',
    vmin=0, vmax=1,
    ax=axes[1], cbar=False,
    annot_kws={'size': 14},
)
axes[1].set_title('Confusion matrix\n(normalised — recall per row)', fontweight='bold')
axes[1].set_xlabel('Predicted label')
axes[1].set_ylabel('True label')

# ── Precision-Recall curve ────────────────────────────────────────────
from sklearn.metrics import precision_recall_curve, average_precision_score, roc_curve, auc
precision, recall, _ = precision_recall_curve(y_te2, y_proba)
ap = average_precision_score(y_te2, y_proba)
fpr, tpr, _ = roc_curve(y_te2, y_proba)
roc_auc = auc(fpr, tpr)

axes[2].plot(recall, precision, color=BLUE, linewidth=2, label=f'PR curve (AP={ap:.3f})')
axes[2].plot(fpr, tpr, color=ORANGE, linewidth=2, linestyle='--', label=f'ROC curve (AUC={roc_auc:.3f})')
axes[2].plot([0,1],[df_model['is_late'].mean()]*2, color=MUTED, linewidth=1,
              linestyle=':', label='Baseline (random)')
axes[2].set_title('Precision-Recall & ROC curves')
axes[2].set_xlabel('Recall / False Positive Rate')
axes[2].set_ylabel('Precision / True Positive Rate')
axes[2].legend(framealpha=0.2, fontsize=9)
axes[2].set_xlim(0, 1)
axes[2].set_ylim(0, 1.02)

plt.suptitle('Classification evaluation — late delivery predictor', fontsize=14, fontweight='bold')
plt.tight_layout()
plt.savefig('/tmp/classification_eval.png', dpi=150, bbox_inches='tight')
plt.show()

# Print full classification report
print("\\nClassification report:")
print(classification_report(y_te2, y_pred_clf, target_names=['on-time','late']))`} />

        <h3 style={S.h3}>Learning curves — diagnose overfitting vs underfitting</h3>

        <CodeBlock code={`from sklearn.model_selection import learning_curve
from sklearn.linear_model import Ridge

# ── Learning curves — the most important training diagnostic ──────────
fig, axes = plt.subplots(1, 2, figsize=(15, 5))

models_to_compare = [
    ('Ridge (linear)', Ridge(alpha=1.0)),
    ('Random Forest', RandomForestRegressor(n_estimators=50, max_depth=5, random_state=42)),
]

colors_pair = [(BLUE, GREEN), (ORANGE, PURPLE)]

for ax, (name, model), (train_c, val_c) in zip(axes, models_to_compare, colors_pair):
    train_sizes, train_scores, val_scores = learning_curve(
        model, X, y,
        train_sizes=np.linspace(0.1, 1.0, 12),
        cv=5,
        scoring='neg_mean_absolute_error',
        n_jobs=-1,
        random_state=42,
    )

    # Convert to positive MAE
    train_mean = -train_scores.mean(axis=1)
    train_std  = train_scores.std(axis=1)
    val_mean   = -val_scores.mean(axis=1)
    val_std    = val_scores.std(axis=1)

    ax.plot(train_sizes, train_mean, color=train_c, linewidth=2,
             marker='o', markersize=5, label='Training error')
    ax.fill_between(train_sizes,
                     train_mean - train_std, train_mean + train_std,
                     alpha=0.15, color=train_c)

    ax.plot(train_sizes, val_mean, color=val_c, linewidth=2,
             marker='s', markersize=5, label='Validation error')
    ax.fill_between(train_sizes,
                     val_mean - val_std, val_mean + val_std,
                     alpha=0.15, color=val_c)

    ax.set_title(f'Learning curve — {name}', fontweight='bold')
    ax.set_xlabel('Training set size')
    ax.set_ylabel('MAE (minutes)')
    ax.legend(framealpha=0.2)
    ax.grid(True, alpha=0.3)

    # Annotate final gap
    final_train = train_mean[-1]
    final_val   = val_mean[-1]
    gap = final_val - final_train
    ax.annotate(
        f'Gap: {gap:.1f} min',
        xy=(train_sizes[-1], (final_train + final_val) / 2),
        xytext=(train_sizes[-3], (final_train + final_val) / 2 + 1),
        color='#ff4757', fontsize=9,
        arrowprops=dict(arrowstyle='->', color='#ff4757', lw=1.2),
    )

plt.suptitle('Learning curves — diagnosing bias vs variance', fontsize=14, fontweight='bold')
plt.tight_layout()
plt.savefig('/tmp/learning_curves.png', dpi=150, bbox_inches='tight')
plt.show()

# How to read learning curves:
# Large gap (train << val): HIGH VARIANCE (overfitting) → more data or regularise
# Small gap but high error: HIGH BIAS (underfitting) → more complex model
# Converging curves:        training and val converge as data grows → good
# Parallel flat curves:     model plateaued — more data won't help`} />
      </div>

      <Div />

      {/* ══ SECTION 9 — SAVING FIGURES ═════════════════════════════════════════ */}
      <div style={S.sec}>
        <span style={S.tag}>Production output</span>
        <h2 style={S.h2}>Saving figures — for reports, presentations and documentation</h2>

        <CodeBlock code={`import matplotlib.pyplot as plt
import numpy as np

# ── savefig — the options that matter ─────────────────────────────────
fig, ax = plt.subplots(figsize=(9, 4))
ax.plot(range(10), np.random.randn(10).cumsum(), color='#00e676', linewidth=2)
ax.set_title('Example plot')

# PNG — for presentations, reports, Slack, email
fig.savefig(
    '/tmp/plot.png',
    dpi=150,               # 150 for screen, 300 for print
    bbox_inches='tight',   # crop whitespace — ALWAYS use this
    facecolor=fig.get_facecolor(),   # preserve dark background
    edgecolor='none',
)

# SVG — for web embedding, scales to any size
fig.savefig('/tmp/plot.svg', bbox_inches='tight', format='svg')

# PDF — for LaTeX documents and academic papers
fig.savefig('/tmp/plot.pdf', bbox_inches='tight', format='pdf')

plt.close(fig)   # free memory — important in loops

# ── Saving multiple figures in a loop ─────────────────────────────────
from pathlib import Path
output_dir = Path('/tmp/plots')
output_dir.mkdir(exist_ok=True)

features_to_plot = ['distance_km', 'traffic_score', 'prep_time', 'order_value']

for feature in features_to_plot:
    fig, axes = plt.subplots(1, 2, figsize=(12, 4))

    axes[0].hist(df[feature], bins=40, color='#378ADD', alpha=0.8, edgecolor='none')
    axes[0].set_title(f'{feature} — distribution')

    axes[1].scatter(df[feature].sample(500), df['delivery_time'].sample(500),
                     alpha=0.3, s=12, color='#00e676', edgecolors='none')
    axes[1].set_xlabel(feature)
    axes[1].set_ylabel('delivery_time')
    axes[1].set_title(f'{feature} vs delivery time')

    fig.suptitle(f'EDA: {feature}', fontsize=13, fontweight='bold')
    plt.tight_layout()

    path = output_dir / f'eda_{feature}.png'
    fig.savefig(path, dpi=130, bbox_inches='tight',
                facecolor=fig.get_facecolor())
    plt.close(fig)
    print(f"Saved {path}")

# ── Multi-page PDF report ──────────────────────────────────────────────
from matplotlib.backends.backend_pdf import PdfPages

with PdfPages('/tmp/eda_report.pdf') as pdf:
    # Page 1: distributions
    fig, axes = plt.subplots(2, 2, figsize=(12, 8))
    for ax, col in zip(axes.flatten(), features_to_plot):
        ax.hist(df[col], bins=40, color=BLUE, alpha=0.8, edgecolor='none')
        ax.set_title(col)
    fig.suptitle('Feature distributions', fontsize=14, fontweight='bold')
    plt.tight_layout()
    pdf.savefig(fig, facecolor=fig.get_facecolor())
    plt.close()

    # Page 2: correlations
    fig, ax = plt.subplots(figsize=(9, 7))
    corr = df[features_to_plot + ['delivery_time']].corr()
    sns.heatmap(corr, annot=True, fmt='.2f', cmap='RdBu_r', center=0,
                square=True, ax=ax)
    ax.set_title('Correlation matrix', fontsize=14, fontweight='bold')
    plt.tight_layout()
    pdf.savefig(fig, facecolor=fig.get_facecolor())
    plt.close()

print("\\nSaved multi-page PDF report to /tmp/eda_report.pdf")`} />
      </div>

      <Div />

      {/* ══ SECTION 10 — ERRORS ════════════════════════════════════════════════ */}
      <div style={S.sec}>
        <span style={S.tag}>Errors you will hit</span>
        <h2 style={S.h2}>Every common visualisation error — explained and fixed</h2>

        <ErrorBlock
          error="UserWarning: Matplotlib is currently using agg which is a non-GUI backend"
          cause="You're running matplotlib in a non-interactive environment (a script, a server, a container, or a remote SSH session) that has no display. The 'agg' backend renders to files only — plt.show() has no window to open."
          fix="If you just want to save figures: use fig.savefig('path.png') and remove plt.show(). If you need interactive plots in a notebook: add %matplotlib inline at the top. For scripts on a server always save to file: import matplotlib; matplotlib.use('Agg') before importing pyplot."
        />

        <ErrorBlock
          error="OverflowError: In draw_path: Exceeded cell block limit"
          cause="You're trying to plot too many points at once. matplotlib renders each point individually — plotting 1 million scatter points causes this error and produces an unreadable overplotted figure anyway."
          fix="Always sample before plotting: df.sample(min(2000, len(df))). For large datasets use hexbin (ax.hexbin) or 2D histogram (plt.hist2d) which aggregate points into bins instead of plotting each one."
        />

        <ErrorBlock
          error="Figure is blank or only shows axes — no data plotted"
          cause="Usually caused by one of three things: the DataFrame was empty after filtering, the x and y arrays had mismatched lengths, or you called plt.show() before the plot commands (with matplotlib's stateful API)."
          fix="Add print(len(df)) and print(x.shape, y.shape) before plotting to verify data exists and shapes match. Always call plt.show() or fig.savefig() AFTER all ax.plot() / ax.scatter() calls, not before."
        />

        <ErrorBlock
          error="ValueError: x and y must be the same size"
          cause="You passed arrays of different lengths to a plot function. This commonly happens when you filter one array but forget to apply the same filter to the other."
          fix="Always filter the full DataFrame first, then extract x and y from the filtered result: filtered = df[mask]; ax.scatter(filtered['x_col'], filtered['y_col']). Never filter x and y separately — they will go out of sync."
        />

        <ErrorBlock
          error="Seaborn: PaletteError — not enough colors in palette"
          cause="You specified a discrete palette (like 'Set2' or a list of hex colors) with fewer colors than the number of unique hue values. For example, using palette='Set2' (8 colors) when hue has 12 categories."
          fix="Use a continuous palette for many categories: palette='tab20' (20 colors), or generate enough colors programmatically: palette=sns.color_palette('husl', n_colors=len(df['col'].unique())). Or limit the hue to the top N categories before plotting."
        />
      </div>

      <Div />

      {/* ══ SECTION 11 — WHAT'S NEXT ═══════════════════════════════════════════ */}
      <div style={{ paddingBottom: 48, paddingTop: 8 }}>
        <span style={S.tag}>What comes next</span>
        <h2 style={S.h2}>
          The programming ecosystem is complete. You can load, clean, explore, visualise, and model data.
        </h2>

        <p style={S.p}>
          Python, NumPy, Pandas, and Matplotlib/Seaborn — the four tools in every
          ML engineer's daily workflow. Everything in the Classical ML section
          assumes you can use all four fluently. You can.
        </p>

        <p style={S.p}>
          Module 12 begins the Data Engineering section.
          Before a model can learn, data has to be collected from somewhere —
          REST APIs, SQL databases, data warehouses, web scraping.
          In most companies the data you need for ML is not a pre-packaged dataset
          but a query away, an API call away, or a scraping job away.
          Module 12 shows you how to build those pipelines reliably.
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
              Next — Module 12 · Data Engineering
            </div>
            <div style={{
              fontSize: 15, fontWeight: 700, color: 'var(--text)',
              fontFamily: 'var(--font-display)', letterSpacing: '-0.3px',
            }}>
              Data Collection — APIs, SQL, Files and Scraping
            </div>
            <p style={{ ...S.ps, marginBottom: 0, marginTop: 4 }}>
              Where ML data actually comes from and how to pull it reliably.
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
          'Always use the object-oriented API (fig, ax = plt.subplots()) rather than the pyplot stateful API. It is explicit, composable, and required for multi-panel figures. Set rcParams globally once at the top of every notebook for consistent styling.',
          'The five plots every EDA starts with: histogram (shape of each feature), KDE (compare distributions across groups), boxplot (outliers and quartiles), scatter (feature vs target relationship), and correlation heatmap (multicollinearity detection).',
          'Always sample before plotting scatter plots — ax.scatter on 100,000 points produces an unreadable blob. Use df.sample(min(2000, len(df))). For very large datasets use hexbin or hist2d which aggregate before rendering.',
          'The three model evaluation plots every regression project needs: predicted vs actual (overall accuracy), residuals vs predicted (find systematic errors), and residual distribution (check normality assumption).',
          'For classification: always plot the confusion matrix normalised by row (shows recall per class) in addition to raw counts. Combine with a precision-recall curve — accuracy alone is misleading for imbalanced datasets.',
          'Learning curves are the most important training diagnostic. Large gap between train and validation error = overfitting (add regularisation or data). Both errors high and flat = underfitting (more complex model). Converging curves = healthy training.',
          'Always use bbox_inches="tight" when saving figures — it crops whitespace. Use dpi=150 for screen output, dpi=300 for print. Call plt.close(fig) in loops to release memory. Always preserve facecolor when saving dark-themed plots.',
        ]}
      />
    </LearnLayout>
  )
}