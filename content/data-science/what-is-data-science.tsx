import { LearnLayout } from '@/components/content/LearnLayout';
import { Callout } from '@/components/content/Callout';
import { KeyTakeaways } from '@/components/content/KeyTakeaways';
import PyPlayground from '@/components/datascience/PyPlayground';
import TryItChallenge from '@/components/datascience/TryItChallenge';
import Link from 'next/link';

const C = '#8b5cf6';

const Part = ({ n, title }: { n: string; title: string }) => (
  <div style={{ marginBottom: 28 }}>
    <p style={{ fontSize: 11, color: C, fontFamily: 'var(--font-mono)', fontWeight: 700, margin: '0 0 8px', letterSpacing: '.1em' }}>// Part {n}</p>
    <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(20px,3vw,30px)', fontWeight: 900, letterSpacing: '-1.5px', color: 'var(--text)', margin: 0 }}>{title}</h2>
  </div>
);

const P = ({ children }: { children: React.ReactNode }) => (
  <p style={{ fontSize: 15, color: 'var(--text)', lineHeight: 1.9, margin: '0 0 18px' }}>{children}</p>
);

const H = ({ children }: { children: React.ReactNode }) => (
  <h3 style={{ fontSize: 17, fontWeight: 700, color: 'var(--text)', margin: '32px 0 12px' }}>{children}</h3>
);

const Hl = ({ children }: { children: React.ReactNode }) => (
  <strong style={{ color: C }}>{children}</strong>
);

const HR = () => <div style={{ borderTop: '1px solid var(--border)', margin: '48px 0' }} />;

const IQ = ({ q, children }: { q: string; children: React.ReactNode }) => (
  <div style={{ marginBottom: 40 }}>
    <div style={{ background: `${C}10`, border: `1px solid ${C}25`, borderRadius: '8px 8px 0 0', padding: '14px 18px', fontSize: 14, fontWeight: 700, color: 'var(--text)' }}>Q: {q}</div>
    <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderTop: 'none', borderRadius: '0 0 8px 8px', padding: '18px', fontSize: 14, color: 'var(--text)', lineHeight: 1.9 }}>{children}</div>
  </div>
);

const Err = ({ msg, cause, fix }: { msg: string; cause: string; fix: string }) => (
  <div style={{ marginBottom: 24, border: '1px solid var(--border)', borderRadius: 10, overflow: 'hidden' }}>
    <div style={{ background: 'rgba(255,71,87,0.09)', borderBottom: '1px solid var(--border)', padding: '10px 16px', fontFamily: 'var(--font-mono)', fontSize: 12, color: '#ff4757', wordBreak: 'break-all', lineHeight: 1.6 }}>{msg}</div>
    <div style={{ padding: '14px 16px' }}>
      <p style={{ fontSize: 13, color: 'var(--muted)', lineHeight: 1.7, margin: '0 0 8px' }}><strong style={{ color: 'var(--text)' }}>Cause: </strong>{cause}</p>
      <p style={{ fontSize: 13, color: 'var(--muted)', lineHeight: 1.7, margin: 0 }}><strong style={{ color: '#00e676' }}>Fix: </strong>{fix}</p>
    </div>
  </div>
);

const ProTip = ({ children }: { children: React.ReactNode }) => (
  <div style={{ background: `${C}08`, border: `1px solid ${C}20`, borderRadius: 10, padding: '16px 20px', margin: '24px 0' }}>
    <p style={{ fontSize: 11, fontWeight: 700, color: C, fontFamily: 'var(--font-mono)', textTransform: 'uppercase', letterSpacing: '.1em', margin: '0 0 8px' }}>🎯 Pro Tip</p>
    <p style={{ fontSize: 14, color: 'var(--text)', lineHeight: 1.85, margin: 0 }}>{children}</p>
  </div>
);

const TimeBlock = ({ time, label, children }: { time: string; label: string; children: React.ReactNode }) => (
  <div style={{ display: 'flex', gap: 20, marginBottom: 28 }}>
    <div style={{ flexShrink: 0, textAlign: 'right', width: 90 }}>
      <div style={{ fontSize: 12, fontWeight: 700, color: C, fontFamily: 'var(--font-mono)' }}>{time}</div>
    </div>
    <div style={{ flex: 1, borderLeft: `2px solid ${C}30`, paddingLeft: 20, paddingBottom: 8 }}>
      <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--text)', marginBottom: 6 }}>{label}</div>
      <div style={{ fontSize: 14, color: 'var(--muted)', lineHeight: 1.8 }}>{children}</div>
    </div>
  </div>
);

export default function WhatIsDataScience() {
  return (
    <LearnLayout
      title="What is Data Science?"
      description="The definition that actually explains it, the DS lifecycle, and why Netflix, Spotify, Swiggy, and every subscription business on earth runs on this discipline"
      section="Data Science — Module 01"
      readTime="10–14 min"
      updatedAt="July 2026"
    >

      {/* ── PART 01 ── */}
      <Part n="01" title="The Definition — And Why Every Other Explanation Fails" />

      <P>Search "what is data science" and you will find answers like <em>"an interdisciplinary field that uses statistics, programming, and domain knowledge to extract insights from data."</em> That sentence is technically true and completely useless — it tells you nothing about what a data scientist actually does on a Tuesday morning.</P>

      <P>Here is the definition that actually explains it:</P>

      <div style={{ background: `${C}08`, border: `1px solid ${C}25`, borderLeft: `4px solid ${C}`, borderRadius: '0 10px 10px 0', padding: '20px 24px', margin: '4px 0 24px' }}>
        <P>Data science is the practice of turning raw, messy records about the real world into decisions — by cleaning the data, understanding it statistically, and sometimes building a model that predicts what happens next.</P>
      </div>

      <P>Every word of that definition is doing work. Let us go through it.</P>

      <P><Hl>"Raw, messy records"</Hl> — real data is never clean. A streaming service's watch history has missing values, duplicate rows, typos in genre names, and timestamps in three different formats depending on which team's system logged them. Before any insight is possible, someone has to clean this. That someone is the data scientist, and it is usually 60–70% of the actual job.</P>

      <P><Hl>"Understanding it statistically"</Hl> — once the data is clean, you need to know whether a pattern is real or noise. If Premium subscribers watch 12% more content than Basic subscribers this month, is that a meaningful difference or something that would happen by chance 1 in 3 times anyway? Statistics is the discipline that answers this, and it is the difference between a confident business recommendation and an expensive mistake.</P>

      <P><Hl>"Sometimes building a model that predicts what happens next"</Hl> — not every data science project ends in a machine learning model. Many end in a dashboard, a report, or a single well-supported recommendation. But when prediction is the goal — will this subscriber cancel next month, will this customer click this recommendation — that is where regression, classification, and the rest of predictive modeling come in, covered later in this course.</P>

      <P>Put together: data science is not one skill. It is cleaning (Modules 19–23), wrangling (Modules 24–29), statistics (Modules 39–44), visualization (Modules 35–38), and modeling (Modules 45–49) — all aimed at a single outcome: a decision someone can actually act on.</P>

      <HR />

      {/* ── PART 02 ── */}
      <Part n="02" title="The Data Science Lifecycle — What Actually Happens Inside a Project" />

      <P>Every real data science project — whether it takes an afternoon or six months — moves through the same six stages. Skipping any of them is how projects produce numbers nobody trusts.</P>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 12, margin: '20px 0 32px' }}>
        {[
          { n: '01', name: 'Frame the question', desc: '"Reduce churn" is not a question. "Which subscriber segment cancels within 60 days, and why?" is. Most failed DS projects fail here, before a single line of code is written.' },
          { n: '02', name: 'Collect the data', desc: 'Pull from a warehouse, an API, a CSV export, or a live event stream. Know where every column actually came from before you trust it.' },
          { n: '03', name: 'Clean and explore', desc: 'Handle missing values, fix types, remove duplicates, then look at distributions and correlations before assuming anything about the data.' },
          { n: '04', name: 'Model or analyze', desc: 'Sometimes this is a GROUP BY and a chart. Sometimes it is a trained classification model. The method should match the question, not the other way around.' },
          { n: '05', name: 'Validate', desc: 'Would this hold up on next month\'s data? Is the sample size big enough? Statistics and a proper train/test split live here.' },
          { n: '06', name: 'Communicate and ship', desc: 'A model nobody understands or trusts changes nothing. The final output is a decision, a dashboard, or a deployed prediction — not a notebook.' },
        ].map(step => (
          <div key={step.n} style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 10, padding: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
              <span style={{ width: 24, height: 24, borderRadius: '50%', background: `${C}20`, border: `1px solid ${C}50`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 10, fontWeight: 700, color: C, fontFamily: 'var(--font-mono)', flexShrink: 0 }}>{step.n}</span>
              <span style={{ fontSize: 13, fontWeight: 700, color: 'var(--text)' }}>{step.name}</span>
            </div>
            <p style={{ fontSize: 12, color: 'var(--muted)', margin: 0, lineHeight: 1.65 }}>{step.desc}</p>
          </div>
        ))}
      </div>

      <Callout type="info">
        This course is structured around this exact lifecycle. Sections 2–4 (Python, NumPy, pandas) give you the tools. Section 5 is cleaning. Sections 6–8 are wrangling, EDA, and visualization. Section 9 is statistics and validation. Section 10 is modeling. Section 11 puts it all together in real case studies and interview prep — the "communicate and ship" stage.
      </Callout>

      <HR />

      {/* ── PART 03 ── */}
      <Part n="03" title="Data Scientist vs Data Analyst vs ML Engineer vs Data Engineer" />

      <P>These four titles get confused constantly because the boundaries genuinely blur at most companies. Here is the honest breakdown — you will go deeper in Module 03.</P>

      <div style={{ overflowX: 'auto', margin: '20px 0 28px' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
          <thead>
            <tr>
              {['Role', 'Owns', 'Typical output'].map(h => (
                <th key={h} style={{ padding: '10px 14px', background: 'var(--surface)', color: 'var(--muted)', fontWeight: 700, textAlign: 'left', borderBottom: '1px solid var(--border)', fontSize: 11, textTransform: 'uppercase', letterSpacing: '.08em' }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {[
              ['Data Engineer', 'Building the pipelines that move and store data reliably', 'A warehouse table that refreshes every night without breaking'],
              ['Data Analyst', 'Answering business questions with existing, already-clean data', 'A dashboard or a SQL query answering "what happened?"'],
              ['Data Scientist', 'Cleaning messy data, statistical analysis, and sometimes modeling', 'A model, an experiment result, or a data-backed recommendation'],
              ['ML Engineer', 'Taking a working model and making it run reliably in production', 'An API endpoint serving predictions at scale, 24/7'],
            ].map(([role, owns, output], i) => (
              <tr key={role} style={{ background: i % 2 === 0 ? 'transparent' : 'var(--surface)' }}>
                <td style={{ padding: '10px 14px', fontFamily: 'var(--font-mono)', fontSize: 12, color: C, borderBottom: '1px solid var(--border)', whiteSpace: 'nowrap', fontWeight: 700 }}>{role}</td>
                <td style={{ padding: '10px 14px', fontSize: 13, color: 'var(--text)', borderBottom: '1px solid var(--border)', lineHeight: 1.6 }}>{owns}</td>
                <td style={{ padding: '10px 14px', fontSize: 13, color: 'var(--muted)', borderBottom: '1px solid var(--border)', lineHeight: 1.6 }}>{output}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <P>In practice, especially at smaller companies, one person often wears two or three of these hats. This course focuses on the data scientist column — cleaning, statistics, and the modeling fundamentals — while giving you enough pandas and SQL crossover to speak fluently with the other three roles.</P>

      <HR />

      {/* ── PART 04 ── */}
      <Part n="04" title="Excel vs Python — The Honest, Complete Comparison" />

      <P>Excel and Google Sheets are genuinely good tools for small, static datasets and quick calculations. The problems start exactly where data science begins: messy data, statistical rigor, and repeatability.</P>

      <div style={{ overflowX: 'auto', marginBottom: 32 }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
          <thead>
            <tr>
              {['The problem', 'Excel / Sheets', 'Python + pandas'].map((h, i) => (
                <th key={h} style={{ padding: '12px 16px', background: i === 0 ? 'var(--surface)' : i === 1 ? 'rgba(255,71,87,0.12)' : `${C}15`, color: i === 0 ? 'var(--muted)' : i === 1 ? '#ff4757' : C, fontWeight: 700, textAlign: 'left', borderBottom: '1px solid var(--border)', fontSize: 11, textTransform: 'uppercase', letterSpacing: '.08em' }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {[
              ['Scale', 'Struggles well before 1 million rows. StreamPulse-sized companies generate that in watch events per day.', 'pandas comfortably handles tens of millions of rows on a laptop; billions with Spark.'],
              ['Reproducibility', 'A chain of manual clicks and formulas nobody can fully retrace six months later.', 'A script. Run it again on new data and get the exact same result, every time.'],
              ['Cleaning messy data', 'Find & Replace and manual scanning. Does not scale past a few hundred rows.', 'One line handles a rule across the entire dataset: df["col"].fillna(0), df.dropna(), df.drop_duplicates().'],
              ['Statistics', 'Basic functions (AVERAGE, STDEV). No real hypothesis testing, no proper distributions.', 'scipy.stats gives you every distribution, test, and confidence interval used in real analysis.'],
              ['Automation', 'A person must open the file and repeat the same steps every week.', 'A script can be scheduled to run automatically — no human required after it is written.'],
              ['Version control', 'File_final_v3_ACTUAL.xlsx. No real history of what changed and why.', 'Git tracks every change to the analysis code, line by line, with a reason attached.'],
              ['Sharing the method', 'The formulas are hidden inside cells — hard to audit, easy to break silently.', 'Code is text. Anyone can read exactly what happened to the data, step by step.'],
            ].map(([problem, xl, py], i) => (
              <tr key={i} style={{ background: i % 2 === 0 ? 'transparent' : 'var(--surface)' }}>
                <td style={{ padding: '12px 16px', color: 'var(--text)', fontWeight: 600, borderBottom: '1px solid var(--border)', verticalAlign: 'top', whiteSpace: 'nowrap' }}>{problem}</td>
                <td style={{ padding: '12px 16px', color: 'var(--muted)', borderBottom: '1px solid var(--border)', lineHeight: 1.7, verticalAlign: 'top' }}>{xl}</td>
                <td style={{ padding: '12px 16px', color: 'var(--text)', borderBottom: '1px solid var(--border)', lineHeight: 1.7, verticalAlign: 'top' }}>{py}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Callout type="tip">
        Excel is not the enemy. Analysts export a small, already-summarized result from pandas into Excel constantly for stakeholders who live in spreadsheets. The mistake is doing the cleaning and analysis itself by hand, in a spreadsheet, on a dataset too large or too messy for it to handle safely.
      </Callout>

      <HR />

      {/* ── PART 05 ── */}
      <Part n="05" title="What Data Science Actually Looks Like at Real Companies" />

      <P>"Data science" sounds abstract until you see the specific decisions it drives. Every one of these is a real category of production data science work, running right now.</P>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: 12, margin: '20px 0 32px' }}>
        {[
          { co: 'Netflix', color: '#e50914', what: 'Recommendation ranking', why: 'The "Because you watched…" row is a model predicting what you are most likely to finish, trained on billions of watch events like the ones in the watch_history table below.' },
          { co: 'Spotify', color: '#1db954', what: 'Discover Weekly', why: 'A recommendation model comparing your listening patterns against millions of other users with statistically similar taste profiles.' },
          { co: 'Swiggy / Zomato', color: '#fc8019', what: 'Delivery time prediction', why: 'A regression model predicts exact delivery windows from historical order, traffic, and restaurant prep-time data — shown to you before you order.' },
          { co: 'Ola / Uber', color: '#0ea5e9', what: 'Dynamic pricing', why: 'Surge pricing is a live model balancing rider demand against available driver supply in a specific zone, updated every few minutes.' },
          { co: 'Flipkart / Amazon', color: '#f59e0b', what: 'Demand forecasting', why: 'Statistical forecasting models decide how much inventory to stock at each warehouse before a sale event, based on historical demand curves.' },
          { co: 'Any subscription app', color: C, what: 'Churn prediction', why: 'A classification model flags subscribers likely to cancel next month — the exact analysis you will build yourself in Module 47 using StreamPulse.' },
        ].map(item => (
          <div key={item.co} style={{ background: 'var(--surface)', border: `1px solid ${item.color}25`, borderRadius: 10, padding: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
              <span style={{ width: 10, height: 10, borderRadius: 3, background: item.color, display: 'inline-block', flexShrink: 0 }} />
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: 13, fontWeight: 700, color: 'var(--text)' }}>{item.co}</span>
            </div>
            <p style={{ fontSize: 11, color: item.color, fontFamily: 'var(--font-mono)', margin: '0 0 6px', lineHeight: 1.5 }}>{item.what}</p>
            <p style={{ fontSize: 12, color: 'var(--muted)', margin: 0, lineHeight: 1.65 }}>{item.why}</p>
          </div>
        ))}
      </div>

      <Callout type="tip">
        Notice the pattern: every example above is built on the same five ingredients — clean historical data, descriptive statistics, a model, validation, and a decision. That is the entire syllabus of this course, applied to one consistent dataset instead of jumping between unrelated toy examples.
      </Callout>

      <HR />

      {/* ── PART 06 ── */}
      <Part n="06" title="The StreamPulse Dataset — Your Data for All 53 Modules" />

      <P>Every single module in this course — from Module 01 to Module 53 — uses the same dataset: <Hl>StreamPulse</Hl>. A fictional video streaming service with subscribers across 8 countries, a 20-title catalog spanning Movies and Series, and realistic engagement, billing, and churn behavior.</P>
      <P>You will know these five tables so well by Module 53 that you could describe every column from memory. That depth of familiarity is intentional — every line of pandas you write will feel meaningful, not academic.</P>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: 12, margin: '24px 0 32px' }}>
        {[
          { name: 'users',         color: C,        rows: 25,  cols: 10, desc: '25 subscribers across 8 countries. Basic, Standard, Premium plans. Signup dates from 2021–2025.' },
          { name: 'titles',        color: '#06b6d4', rows: 20,  cols: 9,  desc: '20 titles — Movies and Series across Drama, Sci-Fi, Comedy, Documentary and more. IMDb-style ratings and runtimes.' },
          { name: 'subscriptions', color: '#f97316', rows: 25,  cols: 8,  desc: '25 billing records. Active and cancelled subscriptions, monthly price by plan, and a cancel_reason for churned users.' },
          { name: 'watch_history', color: '#10b981', rows: 100, cols: 7,  desc: '100 watch events — which user watched which title, on what device, for how many minutes, and whether they finished it.' },
          { name: 'ratings',       color: '#ec4899', rows: 40,  cols: 6,  desc: '40 star ratings (1–5) with optional review text — some reviews are missing, on purpose, for you to clean later.' },
        ].map(t => (
          <div key={t.name} style={{ background: 'var(--surface)', border: `1px solid ${t.color}25`, borderRadius: 10, padding: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
              <span style={{ width: 10, height: 10, borderRadius: 3, background: t.color, display: 'inline-block', flexShrink: 0 }} />
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: 13, fontWeight: 700, color: 'var(--text)' }}>{t.name}</span>
              <span style={{ fontSize: 10, color: 'var(--muted)', marginLeft: 'auto' }}>{t.rows}r · {t.cols}c</span>
            </div>
            <p style={{ fontSize: 12, color: 'var(--muted)', margin: 0, lineHeight: 1.65 }}>{t.desc}</p>
          </div>
        ))}
      </div>

      <P>The tables connect exactly like a real product's data: a user has subscriptions, a user watches titles (recorded in watch_history), and a user rates titles they have watched. One subscriber, three coordinated tables. You will join, group, and aggregate across all of them starting in Section 6.</P>

      <HR />

      {/* ── PART 07 ── */}
      <Part n="07" title="The Live Python Playground — Run Real Code Right Now" />

      <P>Every module in this course has a live Python playground. The five StreamPulse tables are loaded as pandas DataFrames the moment the page opens — no install, no account, no cloud. It runs entirely in your browser using Pyodide, a full Python distribution compiled to WebAssembly.</P>
      <P>Do not worry about understanding the syntax below yet. That starts properly in Section 2. For now, click <Hl>Run</Hl> and watch real StreamPulse data appear.</P>

      <PyPlayground
        initialCode={`# users is already loaded as a pandas DataFrame — try it\nusers.head()`}
        height={90}
        showSchema={true}
      />

      <P>Try changing <Hl>head()</Hl> to <Hl>head(10)</Hl> and click Run again. That is your first pandas experiment — you just inspected a live DataFrame.</P>

      <PyPlayground
        initialCode={`# Average watch time by device — one line of pandas\n# (You will understand every part of this by Module 25)\nwatch_history.groupby('device')['minutes_watched'].mean().round(1)`}
        height={140}
        showSchema={false}
      />

      <P>That query grouped 100 watch events by device and averaged the minutes watched for each — a question that would take several VLOOKUPs and a pivot table in a spreadsheet. You will write aggregations like this yourself by Section 6.</P>

      <PyPlayground
        initialCode={`# The playground also renders real charts — matplotlib runs live in your browser\nimport matplotlib.pyplot as plt\n\nusers['plan'].value_counts().plot(kind='bar', color='#8b5cf6')\nplt.title('StreamPulse subscribers by plan')\nplt.ylabel('Subscribers')`}
        height={150}
        showSchema={false}
      />

      <P>That is a real matplotlib figure, rendered by Python running in your browser tab, not a static image. Section 8 teaches you to build charts like this from scratch.</P>

      <HR />

      {/* ── PART 08 ── */}
      <Part n="08" title="What This Looks Like at Work — A Full Day" />

      <P>You join a mid-size streaming startup as a Data Scientist, three months after completing this course. Here is what a real working day looks like.</P>

      <TimeBlock time="9:00 AM" label="Standup — a question comes in">
        The retention team lead asks: "We think Premium subscribers who signed up through Paid Ads churn faster than everyone else. Can you check?" Before this course, this would mean waiting on a data analyst. Now, you say: "Give me until lunch."
      </TimeBlock>

      <TimeBlock time="9:15 — 10:30 AM" label="Pull, clean, and explore">
        You pull the subscriptions and users tables, join them on user_id, and immediately notice 4 rows with a missing cancel_reason even though status is "cancelled" — a data quality issue you flag to the data engineering team while working around it for now (Module 19 covers exactly this).
      </TimeBlock>

      <TimeBlock time="10:30 — 11:30 AM" label="Test the actual hypothesis">
        You group by referral_source and plan, calculate the cancellation rate for each combination, and run a quick statistical test (Module 42) to check whether the difference for Paid Ad + Premium is larger than you would expect from random noise alone. It is — but only barely significant, given the small sample size.
      </TimeBlock>

      <TimeBlock time="11:45 AM" label="Communicate the honest result">
        You do not report "Paid Ads causes churn" — correlation is not causation, and you say so. You report the actual pattern, the sample size caveat, and one concrete recommendation: run a controlled A/B test (Module 44) on the Paid Ad onboarding flow before spending budget assuming the effect is real.
      </TimeBlock>

      <TimeBlock time="2:00 PM" label="Back to the longer-term project">
        You return to the churn prediction model (Module 47) you have been building over the past two weeks — this morning's finding becomes one candidate feature to test in it.
      </TimeBlock>

      <ProTip>
        The single biggest differentiator between a junior and senior data scientist is not knowing more algorithms — it is knowing when NOT to trust a pattern, and saying so honestly instead of overselling a result. Statistics (Section 9) is what gives you that judgment.
      </ProTip>

      <HR />

      {/* ── PART 09 — Interview Prep ── */}
      <Part n="09" title="Interview Prep — 5 Questions With Complete Answers" />

      <IQ q="What is data science, and how is it different from data analytics?">
        <p style={{ margin: '0 0 14px' }}>Data science is the practice of turning raw, often messy data into decisions through a combination of programming, statistics, and — when the question calls for it — predictive modeling. Data analytics typically focuses on answering "what happened?" using already-clean, structured data, usually through SQL queries, dashboards, and descriptive statistics.</p>
        <p style={{ margin: '0 0 14px' }}>The practical distinction is in scope. A data analyst usually works with data that is already collected, cleaned, and modeled in a warehouse — their job is answering business questions against it quickly. A data scientist frequently works further upstream: cleaning genuinely messy raw data, applying statistical rigor to validate whether a pattern is real, and building predictive models when the business question is "what will happen next" rather than "what happened."</p>
        <p style={{ margin: 0 }}>In practice these roles blend heavily, especially at smaller companies. The clearest signal of a data science task versus an analytics task: if the deliverable is a trained model or a statistically validated experiment result, it is data science. If it is a report or dashboard on existing clean data, it is analytics.</p>
      </IQ>

      <IQ q="Walk me through the data science lifecycle for a real project.">
        <p style={{ margin: '0 0 14px' }}>Six stages. First, frame the question precisely — "reduce churn" is not answerable, but "which subscriber segment cancels within 60 days, and why" is. Second, collect the data from wherever it actually lives — a warehouse, an API, a stream of events. Third, clean and explore it: handle missing values, fix data types, remove duplicates, then look at distributions and correlations before assuming anything.</p>
        <p style={{ margin: '0 0 14px' }}>Fourth, analyze or model — sometimes this is a groupby and a chart, sometimes a trained classification model; the method should match the question's complexity, not the analyst's preference. Fifth, validate: would this hold up on next month's data, is the sample size large enough, does a statistical test support the conclusion. Sixth, communicate and ship — a model or insight nobody understands or acts on has changed nothing.</p>
        <p style={{ margin: 0 }}>The most common project failure is skipping stage one — jumping straight to modeling before the actual business question is nailed down — or skipping stage five, presenting a pattern as fact without checking whether it is statistically meaningful.</p>
      </IQ>

      <IQ q="Why do data scientists spend so much time on data cleaning instead of modeling?">
        <p style={{ margin: '0 0 14px' }}>Because a model — or any statistical conclusion — is only as trustworthy as the data it is built on. Real-world data arrives with missing values (a delivery_date that never got filled in because an order is still in transit), duplicate records (the same event logged twice by a retrying system), inconsistent formats (dates as strings in three different layouts), and outliers that may be real edge cases or simple data entry errors.</p>
        <p style={{ margin: '0 0 14px' }}>If these issues are not addressed first, every downstream step inherits the error. A churn model trained on data where 15% of cancellation dates are wrong will confidently learn the wrong pattern — and the model's high accuracy on that broken data gives false confidence rather than a warning sign.</p>
        <p style={{ margin: 0 }}>Industry estimates commonly put data cleaning and preparation at 60–80% of a data scientist's actual time. This is not an inefficiency to be optimized away — it is the actual foundation the rest of the discipline depends on, which is why this course dedicates an entire section (Section 5) and the wrangling section that follows it (Section 6) to exactly this.</p>
      </IQ>

      <IQ q="Give an example of a data science project that does not involve machine learning.">
        <p style={{ margin: '0 0 14px' }}>A cohort retention analysis. Suppose StreamPulse wants to know how subscriber retention differs between users who signed up in January versus March. This requires no machine learning model at all: it requires grouping subscribers by signup month (a cohort), calculating what percentage of each cohort is still active at 30, 60, and 90 days, and visualizing the resulting retention curves.</p>
        <p style={{ margin: '0 0 14px' }}>The output — a clear chart showing that the March cohort retains 15% better than January, likely correlated with a pricing change that took effect in February — is a fully legitimate, high-value data science deliverable built entirely from pandas, groupby aggregation, and a well-chosen chart. This exact analysis is covered as a full case study in Module 51.</p>
        <p style={{ margin: 0 }}>Machine learning is one tool in the data science toolbox, appropriate when the goal is genuinely predictive — "will this specific user churn" rather than "how did this group behave historically." Reaching for a model when a groupby and a chart would answer the question just as well is a common junior mistake, not a sign of rigor.</p>
      </IQ>

      <IQ q="What tools does a real data science workflow use, end to end?">
        <p style={{ margin: '0 0 14px' }}>Python is the dominant language, with pandas for data manipulation, NumPy for numerical computation, matplotlib and seaborn for visualization, scipy for statistical tests, and scikit-learn for classical machine learning models — all covered progressively through this course. SQL remains essential for pulling data out of a warehouse before any of the Python tooling gets involved.</p>
        <p style={{ margin: '0 0 14px' }}>Beyond the core libraries, a typical workflow also touches Jupyter notebooks or an IDE for exploration, Git for version-controlling analysis code, and increasingly cloud notebook environments (Google Colab, Databricks, SageMaker) when the data or compute needs exceed a laptop. This course's live in-browser Python playground gives you the pandas, NumPy, matplotlib, and general Python experience directly — the same code you write here runs unchanged in a real Jupyter notebook or production script.</p>
        <p style={{ margin: 0 }}>For deep learning specifically — image, text, and generative model work — PyTorch and TensorFlow dominate, but that is a distinct specialization covered in this platform's separate AI/ML track, not the classical, statistics-grounded data science covered here.</p>
      </IQ>

      <HR />

      {/* ── PART 10 — Error Library ── */}
      <Part n="10" title="Errors You Will Hit — And Exactly Why They Happen" />

      <Err
        msg="NameError: name 'user' is not defined"
        cause="A typo in a variable name — 'user' was typed instead of 'users' (the DataFrame preloaded in this playground). Python is case- and spelling-exact: a variable must match exactly how it was created, with no fuzzy matching. This is the single most common error beginners hit in their first week of Python."
        fix="Check the exact name of the variable you are trying to use — in this playground, the five preloaded DataFrames are users, titles, subscriptions, watch_history, and ratings (all lowercase, exact spelling). Click 'Tables' in any playground to see the full list with their column names."
      />

      <Err
        msg="KeyError: 'First_Name'"
        cause="You tried to access a column that does not exist under that exact name — here 'First_Name' was typed instead of 'first_name'. Unlike SQL, pandas column names are case-sensitive and must match exactly, including underscores versus spaces."
        fix="Run users.columns to see the exact column names available, or users.head() to see them as a table header. Copy the exact spelling and case from there — do not guess or assume a column is named the way you would expect."
      />

      <Err
        msg={'TypeError: can only concatenate str (not "int") to str'}
        cause="You tried to combine a text value and a number directly, for example 'Age: ' + 25. Python will not silently convert the number to text the way a spreadsheet formula might — it requires you to be explicit about the conversion."
        fix="Wrap the number in str() to convert it first: 'Age: ' + str(25) — or better, use an f-string which handles the conversion automatically: f'Age: {25}'. F-strings (prefixing a string with f) are the standard, more readable way to combine text and values in modern Python."
      />

      <Err
        msg="AttributeError: 'DataFrame' object has no attribute 'shpae'"
        cause="A typo in a method or attribute name — 'shpae' instead of 'shape'. Python raises an AttributeError (not a syntax error) because 'shpae' is a perfectly valid variable name as far as the parser is concerned — it simply does not exist as something you can call on a DataFrame."
        fix="Check the spelling carefully — the error message shows you exactly what was typed, so compare it letter by letter against what you meant. Common correct DataFrame attributes: .shape (no parentheses, it's a property), .columns, .dtypes, .head(), .describe(). A code editor with autocomplete catches most of these before you even run the code."
      />

      <Err
        msg="IndentationError: unexpected indent"
        cause="Python uses indentation (whitespace at the start of a line) to define code blocks — there is no equivalent of curly braces {} like in JavaScript or Java. This error means a line has more or less leading whitespace than Python expects at that point, often from mixing tabs and spaces, or accidentally indenting a line that should be at the top level."
        fix="Make sure every line inside the same block (like inside an if statement or a for loop) uses exactly the same indentation — the convention is 4 spaces per level, never tabs. Most code editors can be configured to insert spaces when you press Tab, which prevents this error entirely."
      />

      <HR />

      {/* ── Try It ── */}
      <TryItChallenge
        question="Using the preloaded StreamPulse DataFrames, write one line of pandas that returns the average imdb_rating for each genre in the titles table, so you can see which genre StreamPulse's catalog rates highest."
        hint="You need a groupby on the 'genre' column, then select the 'imdb_rating' column, then call an aggregation like .mean()."
        answer={`titles.groupby('genre')['imdb_rating'].mean().round(2)`}
        explanation="This is the split-apply-combine pattern you will formally learn in Module 24: groupby('genre') splits the titles table into one group per genre, ['imdb_rating'].mean() calculates the average rating within each group, and pandas combines the results back into a single Series indexed by genre. The same one-line pattern scales to millions of rows exactly the way it works here on 20."
      />

      <HR />

      {/* ── Key Takeaways ── */}
      <KeyTakeaways
        items={[
          'Data science is turning raw, messy data into decisions: cleaning it, understanding it statistically, and sometimes building a model that predicts what happens next.',
          'Every real project follows the same lifecycle: frame the question, collect data, clean and explore, model or analyze, validate, communicate and ship. Skipping any stage produces numbers nobody should trust.',
          'Data Scientist, Data Analyst, ML Engineer, and Data Engineer are four distinct roles that blend heavily in practice — this course focuses on the cleaning, statistics, and modeling fundamentals at the core of the data scientist role.',
          'Excel breaks down at the scale, reproducibility, and statistical rigor that real data science requires. Python and pandas solve all three without giving up the ability to export a clean summary back to a spreadsheet when needed.',
          'Real companies run on this discipline daily: Netflix and Spotify recommendations, Swiggy and Ola dynamic predictions, Flipkart demand forecasting, and churn prediction at every subscription business — all built from the same ingredients taught in this course.',
          'StreamPulse — 5 tables, 210 total rows, realistic subscriber and engagement data — is the dataset for all 53 modules. Learn it once and use it for every exercise in the course.',
          'A live Python playground powered by Pyodide runs on every module page. Zero install, zero account, zero server — pandas, NumPy, and matplotlib are ready the moment the page opens, with real charts rendered live in your browser.',
          'Not every project needs machine learning — a well-built cohort retention chart is just as legitimate a data science deliverable as a trained model, when it answers the actual question asked.',
          'Data cleaning routinely takes 60–80% of real project time. This is not wasted effort — every downstream statistic and model depends entirely on it, which is why an entire section of this course is dedicated to it.',
          'Data science is the highest-leverage skill you can pair with any existing technical background — product, engineering, analytics — because every subscription, marketplace, and consumer app now runs core decisions through it.',
        ]}
      />

      {/* ── Next CTA ── */}
      <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 10, padding: '24px', marginTop: 40 }}>
        <p style={{ fontSize: 10, color: 'var(--muted)', letterSpacing: '.12em', textTransform: 'uppercase', fontFamily: 'var(--font-mono)', fontWeight: 700, margin: '0 0 10px' }}>
          What comes next
        </p>
        <p style={{ fontSize: 15, color: 'var(--text)', lineHeight: 1.85, margin: '0 0 20px' }}>
          <strong>Module 02</strong> walks through the data science workflow in full depth — how a vague business question becomes a precise, answerable one, and exactly what happens at each of the six lifecycle stages on a real project. More modules are being added to this track regularly.
        </p>
        <Link href="/learn/data-science" style={{ background: C, color: '#fff', padding: '11px 24px', borderRadius: 7, fontWeight: 700, fontSize: 13, textDecoration: 'none', display: 'inline-block' }}>
          See the full Data Science curriculum →
        </Link>
      </div>

    </LearnLayout>
  );
}
