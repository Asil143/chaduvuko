import type { Metadata } from 'next'
import Link from 'next/link'
import { LearnLayout } from '@/components/content/LearnLayout'
import { Callout } from '@/components/content/Callout'
import { KeyTakeaways } from '@/components/content/KeyTakeaways'

export const metadata: Metadata = {
  title: 'Time Series Forecasting — Chaduvuko',
  description: 'Forecast Indian retail sales or electricity demand by understanding trend, seasonality, stationarity, lag features, time-aware validation, classical models, and backtesting.',
}

const S = {
  tag: { fontSize: 11, fontWeight: 700 as const, letterSpacing: '0.1em', textTransform: 'uppercase' as const, color: 'var(--accent)', fontFamily: 'var(--font-mono)', display: 'block' as const, marginBottom: 10 },
  h2: { fontFamily: 'var(--font-display)', fontSize: 'clamp(20px,3vw,30px)', fontWeight: 900 as const, letterSpacing: '-1.2px', color: 'var(--text)', marginBottom: 14, lineHeight: 1.15 },
  h3: { fontFamily: 'var(--font-display)', fontSize: 17, fontWeight: 700 as const, letterSpacing: '-0.4px', color: 'var(--text)', marginBottom: 10, marginTop: 28 },
  p: { fontSize: 15, color: 'var(--muted)', lineHeight: 1.9, marginBottom: 16 },
  ps: { fontSize: 13, color: 'var(--muted)', lineHeight: 1.8, marginBottom: 10 },
  sec: { paddingBottom: 56, paddingTop: 8, borderBottom: '1px solid var(--border)' },
}
function Div() { return <div style={{ height: 56 }} /> }
function CodeBlock({ code, label = 'python' }: { code: string; label?: string }) {
  return <div style={{ background: 'var(--bg2)', border: '1px solid var(--border)', borderRadius: 10, overflow: 'hidden', marginBottom: 24 }}><div style={{ padding: '8px 16px', borderBottom: '1px solid var(--border)', background: 'var(--surface)', fontSize: 10, fontWeight: 700, color: 'var(--muted)', fontFamily: 'var(--font-mono)', letterSpacing: '0.08em', textTransform: 'uppercase' }}>{label}</div><pre style={{ padding: '18px 20px', margin: 0, overflowX: 'auto', fontFamily: 'var(--font-mono)', fontSize: 13, lineHeight: 1.75, color: 'var(--text)' }}><code>{code}</code></pre></div>
}

export default function TimeSeriesForecastingPage() {
  return <LearnLayout title="Time Series Forecasting" description="Understand temporal patterns and build honest forecasts for Indian retail sales or electricity demand using baselines, statistical models, lag features, and rolling backtests." section="Classical ML" readTime="25–32 min">
    <div style={S.sec}>
      <span style={S.tag}>Forecasting is prediction with a clock attached</span>
      <h2 style={S.h2}>A forecast must be made from information available at its forecast origin—not from a shuffled snapshot of the past and future.</h2>
      <p style={S.p}>An electricity utility needs to estimate tomorrow's hourly demand for grid planning. A retailer needs to forecast daily sales for replenishment. Both are supervised prediction problems, but time imposes an ordering: observations from the future cannot be used to train a model that claims to predict them. Promotions, holidays, weather, prices, and stock availability may be useful covariates, but only when their values would actually be known at prediction time.</p>
      <p style={S.p}>This lesson builds an end-to-end forecasting mindset. We will identify trend and seasonality, consider stationarity and differencing, construct lag features without leakage, compare ARIMA, Prophet, and gradient boosting, and evaluate forecasts using chronological backtesting and scale-aware metrics. The examples use an Indian retail or electricity-demand setting; they are templates, not claims about any particular dataset.</p>
      <Callout type="tip">Prerequisite: descriptive statistics, regression, train/test evaluation, and basic pandas familiarity. Start with a simple seasonal-naive forecast before adding a complex model; the baseline tells you what your model must beat.</Callout>
    </div>
    <Div />

    <div style={S.sec}>
      <span style={S.tag}>01 — Find the temporal structure</span>
      <h2 style={S.h2}>Trend, seasonality, calendar effects, and irregular variation are different signals.</h2>
      <p style={S.p}><strong>Trend</strong> is a longer-run increase or decrease, such as growth in customer demand. <strong>Seasonality</strong> repeats at a known calendar period: hourly electricity use can have daily and weekly patterns; retail sales may have weekly patterns and annual festivals. <strong>Calendar effects</strong> such as public holidays, payday timing, and one-off promotions can create structured deviations. Residual variation contains unpredictable shocks, measurement noise, and patterns not yet represented.</p>
      <p style={S.p}>Plot the series at several scales and annotate missing timestamps, stockouts, holidays, and changes in data collection. For a store-level daily series in India, a weekly pattern can reflect weekday-versus-weekend shopping; annual patterns may include regional festivals with different dates across states. A national holiday flag alone may not represent a local event or store-specific campaign.</p>
      <CodeBlock code={`# Example exploration with a pandas DataFrame indexed by date
series = sales.set_index("date")["units_sold"].sort_index()
print(series.index.min(), series.index.max())
print("missing dates:", series.asfreq("D").isna().sum())

# Inspect an appropriately resampled view rather than plotting millions of points.
weekly = series.resample("W").sum()
weekly.plot(title="Weekly units sold")`}/>
      <h3 style={S.h3}>Check the time index before modelling</h3>
      <p style={S.p}>Confirm sorting, duplicate timestamps, frequency, timezone, missing periods, and aggregation rules. A missing row is not always zero demand: the store may have been closed, the sensor may be offline, or the data may be absent. Preserve the difference between observed zero and unavailable measurement. For multiple stores or products, define each series key and make sure lag calculations never cross from one entity into another.</p>
    </div>
    <Div />

    <div style={S.sec}>
      <span style={S.tag}>02 — Stationarity and ARIMA</span>
      <h2 style={S.h2}>Stationarity is a useful modelling assumption, not a requirement that every real series be flat.</h2>
      <p style={S.p}>A weakly stationary process has stable mean and variance over time and autocovariance that depends on lag rather than absolute time. Trend and changing seasonal patterns violate this simple picture. ARIMA models combine autoregressive terms, differencing, and moving-average terms to represent temporal dependence after suitable transformations. Seasonal ARIMA adds seasonal structure for a chosen period. Differencing can remove some trend, but excessive differencing can discard signal and create artificial dependence.</p>
      <p style={S.p}>Inspect plots and residuals; do not select differencing solely from one test. Augmented Dickey–Fuller and KPSS tests assess different null hypotheses and should be interpreted with domain context. A statistical test is evidence, not an automatic model-selection oracle. Transformations such as a log transform can stabilize variance for positive values, but zeros and negative values require careful handling.</p>
      <CodeBlock code={`# A simple statsmodels ARIMA example for a univariate series.
# Train only on dates before the chosen forecast boundary.
from statsmodels.tsa.arima.model import ARIMA

train = series.loc[:"2025-06-30"]
model = ARIMA(train, order=(1, 1, 1))
fit = model.fit()
forecast = fit.forecast(steps=14)

# Validate against the next 14 observed dates; do not fit on those dates.
actual = series.loc["2025-07-01":"2025-07-14"]`}/>
      <p style={S.p}>The order shown is an illustrative specification, not a universally correct choice. Select orders and seasonal terms using training-period diagnostics and rolling validation. The <code>statsmodels</code> library provides ARIMA model interfaces; its fit results and forecasting methods should be checked against the installed documentation and the data's frequency/index behavior.</p>
      <h3 style={S.h3}>Residuals reveal what the model left behind</h3>
      <p style={S.p}>After fitting, inspect residual mean, distribution, autocorrelation, and plots over time. Structured residual patterns suggest omitted seasonality, interventions, changing variance, or a mismatch between the model and data. A model's in-sample fit is not a forecast score. Compare predictions at realistic horizons with a validation period and with a simple baseline.</p>
    </div>
    <Div />

    <div style={S.sec}>
      <span style={S.tag}>03 — Baselines and calendar features</span>
      <h2 style={S.h2}>A seasonal-naive forecast is a strong first check for repeating demand.</h2>
      <p style={S.p}>A naive forecast repeats the most recent observed value. A seasonal-naive forecast repeats the value from the corresponding prior season—for example, last week's same weekday for a daily series with weekly seasonality, or the same hour yesterday for an hourly load series with a daily cycle. These baselines are cheap, transparent, and often surprisingly hard to beat.</p>
      <CodeBlock code={`# Daily series with a seven-day seasonal period:
seasonal_period = 7
last_train = train.to_numpy()
naive_values = last_train[-seasonal_period:]
repeated = [naive_values[i % seasonal_period] for i in range(len(actual))]

# In practice, align by timestamp/calendar and handle missing history explicitly.`}/>
      <p style={S.p}>Add known-in-advance features such as day of week, month, public-holiday indicators, planned price, and scheduled promotion. A weather forecast can be a valid feature if the production system will have that forecast at prediction time; using the subsequently observed weather creates an unrealistically optimistic evaluation. For a holiday calendar, verify regional applicability and how dates are represented in the source.</p>
      <Callout type="warning">Every feature must pass an availability test: “Would this value be known at the moment this forecast is issued?” A future sales value, revised economic measure, or actual weather observation may leak information even if it appears in the historical table.</Callout>
    </div>
    <Div />

    <div style={S.sec}>
      <span style={S.tag}>04 — Lag features and gradient boosting</span>
      <h2 style={S.h2}>Tabular models can learn useful forecasting patterns when temporal features are created without crossing the forecast boundary.</h2>
      <p style={S.p}>For each store-product-date, features might include sales one day, one week, and four weeks earlier; rolling mean and standard deviation; day of week; promotion plan; and price. A gradient-boosting model such as a tree ensemble can learn nonlinear interactions—for example, a promotion may matter more on a weekend. It does not automatically understand time: the engineer constructs the lag and calendar representation.</p>
      <CodeBlock code={`# Sort within each independent series before shifting.
df = df.sort_values(["store_id", "product_id", "date"])
group_keys = ["store_id", "product_id"]
g = df.groupby(group_keys, sort=False)["units_sold"]

df["lag_1"] = g.shift(1)
df["lag_7"] = g.shift(7)
df["lag_28"] = g.shift(28)

# Rolling features must use only values before the current target date.
df["mean_previous_7"] = g.transform(
    lambda values: values.shift(1).rolling(7, min_periods=7).mean()
)
# Remove rows without sufficient historical context after defining the split.`}/>
      <p style={S.p}>The shift before rolling is essential. A rolling mean that includes today's target leaks the answer into a feature for today's prediction. Grouping by series prevents a product's final observations from becoming another product's lags. For multi-step forecasts, decide whether later horizons can use actual observations arriving after the first forecast; if not, generate those lag values recursively from predictions or train direct horizon-specific models.</p>
      <h3 style={S.h3}>Use Prophet when its additive structure is a good fit</h3>
      <p style={S.p}>Prophet is a forecasting library that represents trend, seasonality, and holiday effects in an additive framework with configurable components. It can be useful for interpretable business series with strong calendar structure and is convenient for modelling multiple seasonalities. It is not automatically superior to ARIMA, a tree model, or a baseline; changepoints, holidays, outliers, and forecast horizon still need validation. Use its documented input format and avoid fitting future observations during model selection.</p>
      <p style={S.p}>For Indian retail demand, consider whether annual festival dates shift year to year and whether regional observance matters. For electricity demand, calendar and weather effects can be strong, but operational constraints and intraday patterns may require more specialized features or models. Begin with a forecasting objective and information set, then choose a model class.</p>
    </div>
    <Div />

    <div style={S.sec}>
      <span style={S.tag}>05 — Split by time and backtest</span>
      <h2 style={S.h2}>A single random train/test split destroys the question a forecast is meant to answer.</h2>
      <p style={S.p}>Train on earlier periods and evaluate on later periods. A final holdout can simulate deployment once, but it does not show whether performance is stable across seasons. Rolling-origin backtesting creates several forecast origins: train on an initial history, predict the next horizon, move the origin forward, and repeat. Depending on the use case, training windows can expand or roll over a fixed duration. Keep each fold's target window strictly after its training observations.</p>
      <CodeBlock code={`# Conceptual expanding-window backtest
origins = ["2025-03-31", "2025-04-30", "2025-05-31"]
horizon_days = 14
fold_results = []

for origin in origins:
    train_fold = df[df["date"] <= origin]
    valid_fold = df[
        (df["date"] > origin) &
        (df["date"] <= pd.Timestamp(origin) + pd.Timedelta(days=horizon_days))
    ]
    # Fit preprocessing and model on train_fold only.
    # Construct validation features using only information available at origin.
    # Save predictions by series, timestamp, and horizon for metric analysis.`}/>
      <p style={S.p}>If the target has delayed reporting, define when each value becomes available. If model retraining occurs weekly, evaluate weekly forecast origins. Compare the same horizons and series across models. A model that is excellent one day ahead but poor two weeks ahead may not solve the inventory-planning problem. For panel data, prevent entity and date leakage in a way that reflects how the system will generalize.</p>
      <h3 style={S.h3}>Fit transformations inside each fold</h3>
      <p style={S.p}>Imputation, scaling, target encoding, feature selection, and any learned seasonal adjustment must be fit using only the training segment of each fold. Reusing statistics computed from the full dataset leaks future distribution information. Deterministic known calendar features can be generated for future dates, but their values must be truly known in advance.</p>
    </div>
    <Div />

    <div style={S.sec}>
      <span style={S.tag}>06 — Metrics: MAPE and sMAPE, with caveats</span>
      <h2 style={S.h2}>Report more than one metric when zero demand and asymmetric costs matter.</h2>
      <p style={S.p}>Mean absolute error (MAE) expresses average absolute error in the target's units. Root mean squared error (RMSE) penalizes large errors more heavily. MAPE averages absolute percentage error, but is undefined when actual values are zero and can become unstable near zero. This is a material issue for sparse retail products or low-load periods. Never silently divide by zero or drop those observations without reporting the rule.</p>
      <p style={S.p}>Symmetric MAPE (sMAPE) uses a denominator based on the magnitudes of actual and forecast values. Several formulas are called sMAPE and differ in scaling or zero handling, so state the exact definition in reports. One common form below returns a percentage from 0 to 200 when its denominator is nonzero; an alternative convention divides by two and reports 0 to 100. Define and use one convention consistently.</p>
      <CodeBlock code={`import numpy as np

actual_values = np.asarray(actual_values, dtype=float)
predicted_values = np.asarray(predicted_values, dtype=float)
mae = np.mean(np.abs(actual_values - predicted_values))
rmse = np.sqrt(np.mean((actual_values - predicted_values) ** 2))

nonzero = actual_values != 0
mape = np.mean(
    np.abs((actual_values[nonzero] - predicted_values[nonzero]) /
           actual_values[nonzero])
) * 100

# One common sMAPE convention; define explicit handling for both-zero pairs.
denominator = np.abs(actual_values) + np.abs(predicted_values)
terms = np.divide(
    2 * np.abs(actual_values - predicted_values), denominator,
    out=np.zeros_like(denominator, dtype=float), where=denominator != 0,
)
smape = terms.mean() * 100`}/>
      <p style={S.p}>A percentage metric can overweight small series. Report aggregate and segment-level performance: high-volume versus low-volume products, store regions, weekdays versus holidays, and forecast horizons. If over-forecasting and under-forecasting have different inventory costs, include a metric or decision analysis that reflects that asymmetry instead of optimizing a symmetric average alone.</p>
      <Callout type="tip">Always compare against a naive or seasonal-naive baseline on the same backtest folds. A sophisticated model that does not beat the baseline reliably may not justify its complexity or maintenance cost.</Callout>
    </div>
    <Div />

    <div style={S.sec}>
      <span style={S.tag}>07 — Operational forecasting checks</span>
      <h2 style={S.h2}>A forecast becomes a production system when its assumptions are monitored.</h2>
      <p style={S.p}>Store the forecast origin, horizon, series identifiers, prediction, model version, and feature snapshot. Monitor input freshness, missing data, changes in series coverage, forecast errors after actuals arrive, and drift in error by important segment. Keep a fallback baseline for outages or series with too little history. For electricity demand, extreme weather and grid events can move demand outside historical patterns; for retail, stockouts can make observed sales a censored view of customer demand.</p>
      <p style={S.p}>Prediction intervals communicate uncertainty and support decisions better than one point estimate. Their calibration should be evaluated on time-aware backtests. A narrow interval is not automatically useful if it misses actual outcomes; a wide interval can be honest but operationally uninformative. Match uncertainty communication to the decision and the cost of being wrong.</p>
      <Callout type="warning">Observed sales during a stockout are not the same as unconstrained demand. Treating every low observed sale as weak demand can teach a replenishment system to order even less. Identify availability and censoring where possible and make the limitation explicit.</Callout>
    </div>
    <Div />

    <div style={{ paddingBottom: 48, paddingTop: 8 }}>
      <span style={S.tag}>What comes next</span>
      <h2 style={S.h2}>Forecasting predicts what may happen; recommenders help decide what to show next.</h2>
      <p style={S.p}>The next lesson moves from temporal demand to ranking items for a user. We compare popularity, content-based and collaborative approaches, matrix factorization, implicit feedback, retrieval, cold-start strategies, and ranking metrics.</p>
      <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 10, padding: '16px 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 14 }}>
        <div><div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--accent)', fontFamily: 'var(--font-mono)', marginBottom: 5 }}>Next — Classical ML</div><div style={{ fontSize: 15, fontWeight: 700, color: 'var(--text)', fontFamily: 'var(--font-display)' }}>Recommender Systems</div><p style={{ ...S.ps, marginBottom: 0, marginTop: 4 }}>Rank relevant movies or products for each user.</p></div>
        <Link href="/learn/ai-ml/classical-ml/recommender-systems" style={{ fontSize: 12, color: 'var(--accent)', fontWeight: 700, border: '1px solid var(--accent)', padding: '7px 14px', borderRadius: 6, fontFamily: 'var(--font-mono)', textDecoration: 'none', whiteSpace: 'nowrap' }}>Start →</Link>
      </div>
    </div>
    <KeyTakeaways items={[
      'Separate trend, repeating seasonal patterns, known calendar effects, and irregular variation before selecting a model.',
      'Stationarity and differencing are modelling considerations; inspect the series and residuals rather than treating a test as an automatic answer.',
      'Start with naive and seasonal-naive baselines. ARIMA, Prophet, and gradient boosting with lag features are alternatives whose value must be shown on time-aware validation.',
      'Construct lag and rolling features within each series, shift before rolling, and use only values available at the forecast origin.',
      'Split chronologically and use rolling-origin backtesting to measure performance across forecast origins and horizons. Fit learned preprocessing inside each training fold.',
      'MAPE is undefined at zero and unstable near zero. State the sMAPE convention and inspect segment-level metrics and asymmetric business costs.',
      'Sales can be censored by stockouts; monitor freshness, drift, model versions, forecast errors, and fallback behavior in production.',
    ]} />
  </LearnLayout>
}
