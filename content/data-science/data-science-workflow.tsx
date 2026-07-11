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

export default function DataScienceWorkflow() {
  return (
    <LearnLayout
      title="The Data Science Workflow"
      description="From a vague business question to a shipped decision — the six stages every real project moves through, walked end to end on the StreamPulse dataset"
      section="Data Science — Module 02"
      readTime="12–16 min"
      updatedAt="July 2026"
    >

      {/* ── PART 01 ── */}
      <Part n="01" title={'"Analyze the Data" Is Not a Plan'} />

      <P>Module 01 introduced the six-stage data science lifecycle in one paragraph each. This module goes through every stage in full depth, because the single biggest reason data science projects stall or produce numbers nobody trusts is skipping one of these stages — almost always without realizing it.</P>

      <P>Here is the full sequence again, as a reference you will come back to:</P>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, margin: '20px 0 28px' }}>
        {['Frame', 'Collect', 'Clean & Explore', 'Analyze / Model', 'Validate', 'Communicate & Ship'].map((s, i, arr) => (
          <div key={s} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{ background: `${C}15`, border: `1px solid ${C}40`, color: C, fontFamily: 'var(--font-mono)', fontSize: 12, fontWeight: 700, borderRadius: 20, padding: '6px 14px' }}>
              {i + 1}. {s}
            </span>
            {i < arr.length - 1 && <span style={{ color: 'var(--muted)' }}>→</span>}
          </div>
        ))}
      </div>

      <P>Notice this is not a strict one-way pipeline. Real projects loop backward constantly — cleaning often reveals that the original question needs reframing, and validation often sends you back to collect more data. Treat the six stages as a checklist you keep returning to, not a straight line you walk once.</P>

      <HR />

      {/* ── PART 02 ── */}
      <Part n="02" title="Stage 1 — Framing the Question" />

      <P>"Look into user engagement" is not answerable. Nobody — not the world's best data scientist — can write a single query or build a single model against that sentence. Framing is the process of turning a vague request into a precise, testable question, and it is the stage most often skipped under time pressure.</P>

      <H>What a precise question actually looks like</H>

      <div style={{ overflowX: 'auto', margin: '20px 0 28px' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
          <thead>
            <tr>
              {['Vague request', 'Precise, answerable question'].map(h => (
                <th key={h} style={{ padding: '10px 14px', background: 'var(--surface)', color: 'var(--muted)', fontWeight: 700, textAlign: 'left', borderBottom: '1px solid var(--border)', fontSize: 11, textTransform: 'uppercase', letterSpacing: '.08em' }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {[
              ['"Look into user engagement"', 'What percentage of Premium subscribers watched at least one title in the last 30 days, compared to Basic?'],
              ['"Figure out why people leave"', 'Which combination of plan and referral_source has the highest cancellation rate in the subscriptions table?'],
              ['"See if the new feature works"', 'Did average minutes_watched per user increase in the 30 days after the recommendation change shipped, compared to the 30 days before?'],
              ['"Understand our content"', 'Which genre has the highest average imdb_rating, and does that correlate with how much of each title users actually finish?'],
            ].map(([vague, precise], i) => (
              <tr key={i} style={{ background: i % 2 === 0 ? 'transparent' : 'var(--surface)' }}>
                <td style={{ padding: '10px 14px', color: 'var(--muted)', fontStyle: 'italic', borderBottom: '1px solid var(--border)', lineHeight: 1.6, verticalAlign: 'top' }}>{vague}</td>
                <td style={{ padding: '10px 14px', color: 'var(--text)', borderBottom: '1px solid var(--border)', lineHeight: 1.6, verticalAlign: 'top' }}>{precise}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <P>Every precise question on the right shares three properties: it names the <Hl>exact columns</Hl> involved, it is <Hl>time-bound</Hl> (a specific window, not "ever"), and it has a <Hl>clear answer shape</Hl> — a percentage, a comparison, a yes/no. If you cannot say what the answer will look like before you start, the question is not framed yet.</P>

      <Callout type="tip">
        A useful habit: before opening any code editor, write the exact sentence "If I am right, I expect to see ___." If you cannot fill in that blank, you do not have a question yet — you have a topic.
      </Callout>

      <HR />

      {/* ── PART 03 ── */}
      <Part n="03" title="Stage 2 — Collecting the Data" />

      <P>Once the question is precise, you know exactly which data answers it — and that tells you where to go get it. In this course, collection is done for you: the five StreamPulse tables load automatically into every playground. In a real job, this stage is rarely that simple.</P>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: 12, margin: '20px 0 28px' }}>
        {[
          { source: 'A data warehouse', desc: 'The most common source. You write SQL against tables a data engineering team maintains — this is exactly why the SQL track pairs so well with this one.' },
          { source: 'An internal API', desc: 'Some data only exists behind a service endpoint, not yet in the warehouse. You fetch it programmatically and cache a snapshot for analysis.' },
          { source: 'Raw log files or event streams', desc: 'Click and watch events often land first as raw JSON logs before any pipeline structures them — you may need to parse them yourself.' },
          { source: 'A CSV someone emailed you', desc: 'Less glamorous, extremely common. Always the least trustworthy source — verify column meanings before assuming anything.' },
        ].map(item => (
          <div key={item.source} style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 10, padding: '16px' }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: C, marginBottom: 6 }}>{item.source}</div>
            <p style={{ fontSize: 12, color: 'var(--muted)', margin: 0, lineHeight: 1.65 }}>{item.desc}</p>
          </div>
        ))}
      </div>

      <P>Regardless of the source, one habit matters more than any tool: know exactly where every column came from and what it actually measures before trusting it. The watch_history.minutes_watched column, for example, is only meaningful once you know whether it is logged client-side (can be inflated by buffering) or server-side (more reliable but delayed).</P>

      <HR />

      {/* ── PART 04 ── */}
      <Part n="04" title="Stage 3 — Cleaning and Exploring" />

      <P>This is the stage covered in full depth in Section 5 (Data Cleaning) and Section 7 (Exploratory Data Analysis) — for now, see it in action. Before trusting any table, run a quick trust check: how many rows, how many missing values, any obvious duplicates.</P>

      <PyPlayground
        initialCode={`# A quick trust check before analyzing anything\nprint('Rows:', len(subscriptions))\nprint('Missing values per column:')\nsubscriptions.isna().sum()`}
        height={110}
        showSchema={true}
      />

      <P>Notice <Hl>end_date</Hl> and <Hl>cancel_reason</Hl> show missing values — but that is expected here, not a data quality problem: an active subscriber has no end date and no cancellation reason yet. Knowing which missing values are meaningful (active users) versus which are genuine data quality issues (a truly broken record) is a judgment call you make at this stage, before any analysis downstream.</P>

      <HR />

      {/* ── PART 05 ── */}
      <Part n="05" title="Stage 4 — Analyze or Model" />

      <P>This is the stage people jump to too early. The right method depends entirely on what the framed question actually needs — not on what is more impressive to build.</P>

      <div style={{ overflowX: 'auto', margin: '20px 0 28px' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
          <thead>
            <tr>
              {['If the question is…', 'The right method is…'].map(h => (
                <th key={h} style={{ padding: '10px 14px', background: 'var(--surface)', color: 'var(--muted)', fontWeight: 700, textAlign: 'left', borderBottom: '1px solid var(--border)', fontSize: 11, textTransform: 'uppercase', letterSpacing: '.08em' }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {[
              ['"What happened, grouped by X?"', 'A groupby and a chart. No model needed — Sections 6–8 cover this fully.'],
              ['"Is this difference real or just noise?"', 'A statistical test (Section 9) — t-test, chi-square, or a proper A/B test.'],
              ['"What will THIS specific user do next?"', 'A predictive model — regression or classification (Section 10).'],
              ['"Which factors are associated with an outcome?"', 'Correlation analysis first, a model only if you need to predict, not just explain.'],
            ].map(([q, a], i) => (
              <tr key={i} style={{ background: i % 2 === 0 ? 'transparent' : 'var(--surface)' }}>
                <td style={{ padding: '10px 14px', color: 'var(--text)', borderBottom: '1px solid var(--border)', lineHeight: 1.6, verticalAlign: 'top' }}>{q}</td>
                <td style={{ padding: '10px 14px', color: 'var(--muted)', borderBottom: '1px solid var(--border)', lineHeight: 1.6, verticalAlign: 'top' }}>{a}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <PyPlayground
        initialCode={`# "What happened, grouped by X?" — a groupby answers this directly, no model required\n# (suffixes=('', '_user') keeps subscriptions' own 'plan' column unrenamed,\n# since both tables happen to carry a 'plan' column)\nmerged = subscriptions.merge(users, on='user_id', suffixes=('', '_user'))\nmerged.groupby('plan')['status'].value_counts(normalize=True).round(3)`}
        height={130}
        showSchema={false}
      />

      <P>That one merge-and-groupby just answered "does cancellation rate differ by plan?" — no machine learning involved, and correctly so, because the question only asked what happened, not what a specific future user will do.</P>

      <HR />

      {/* ── PART 06 ── */}
      <Part n="06" title="Stage 5 — Validate" />

      <P>A pattern in a groupby result is not automatically real. Validation asks: would this hold up on a different sample, or is it noise dressed up as a finding? Two checks matter most before you trust any result.</P>

      <H>Check the sample size behind every percentage</H>

      <PyPlayground
        initialCode={`# Before trusting a percentage, always check the group sizes behind it\nmerged.groupby('plan')['status'].value_counts()`}
        height={130}
        showSchema={false}
      />

      <P>A cancellation rate calculated from 3 subscribers is not evidence of anything, even if the percentage looks dramatic. This is the exact reason Section 9 (Statistics) exists — hypothesis testing formalizes exactly how much sample size you need before a difference is trustworthy, instead of eyeballing it.</P>

      <H>Ask whether the result would survive a stricter test</H>
      <P>If a groupby shows Premium subscribers cancel more than Basic, the immediate next question is: is that a real behavioral difference, or does it just reflect that Premium happened to sign up more recently (less time to prove they stay)? Module 42 (Hypothesis Testing) and Module 44 (A/B Testing) give you the formal tools; for now, the habit to build is asking this question at all, every time.</P>

      <Callout type="warning">
        The most expensive data science mistake is not a bug in the code — it is presenting a pattern from a small or biased sample as if it were a validated fact. Always ask "how many rows is this actually based on?" before repeating a number to a stakeholder.
      </Callout>

      <HR />

      {/* ── PART 07 ── */}
      <Part n="07" title="Stage 6 — Communicate and Ship" />

      <P>The deliverable is never the notebook. It is a decision someone else can act on — and the right format depends entirely on the audience.</P>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: 12, margin: '20px 0 28px' }}>
        {[
          { who: 'An executive', give: 'One sentence and one number: "Premium cancellation is 18% higher than Basic, based on 25 subscribers — worth a deeper look before we conclude anything."' },
          { who: 'A product manager', give: 'The chart, the caveat about sample size, and one concrete recommendation: run an A/B test before changing Premium pricing.' },
          { who: 'Another data scientist', give: 'The full notebook, the exact filters applied, and the statistical test used to validate the finding.' },
          { who: 'An ML engineer', give: 'A trained, serialized model plus the exact features and preprocessing steps, ready to wire into a production service.' },
        ].map(item => (
          <div key={item.who} style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 10, padding: '16px' }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: C, marginBottom: 6 }}>{item.who}</div>
            <p style={{ fontSize: 12, color: 'var(--muted)', margin: 0, lineHeight: 1.65 }}>{item.give}</p>
          </div>
        ))}
      </div>

      <P>Notice none of these four deliverables is "the notebook, unedited." Translating your own analysis into the right format for the person who has to act on it is a distinct skill from the analysis itself — and it is the stage most technical people underinvest in.</P>

      <HR />

      {/* ── PART 08 ── */}
      <Part n="08" title="One Question, All Six Stages, Live" />

      <P>Let us run the whole workflow end to end on one real question: <Hl>"Which referral source brings in subscribers who stay longest?"</Hl> Watch how each stage shows up as actual code.</P>

      <PyPlayground
        initialCode={`# Stage 3 (clean) + Stage 4 (analyze): merge users to subscriptions,\n# then compare cancellation rate by referral_source\nmerged = users.merge(subscriptions, on='user_id')\nmerged.groupby('referral_source')['status'].value_counts(normalize=True).round(2)`}
        height={150}
        showSchema={true}
      />

      <PyPlayground
        initialCode={`# Stage 5 (validate): check the sample size behind each referral_source\n# before trusting any percentage above\nusers['referral_source'].value_counts()`}
        height={110}
        showSchema={false}
      />

      <P>With StreamPulse's small teaching dataset, most referral sources have only 4–6 users each — nowhere near enough to draw a confident conclusion. That is itself the correct, honest output of Stage 5: not a made-up recommendation, but a clear statement that a real answer requires more data before shipping any decision. That instinct — knowing when NOT to conclude something — is what stage 5 is actually for.</P>

      <HR />

      {/* ── PART 09 ── */}
      <Part n="09" title="What This Looks Like at Work — A Full Day" />

      <TimeBlock time="9:30 AM" label="A vague Slack message arrives">
        Your product manager writes: "Can you look into why engagement dropped last month?" You do not open a notebook yet. You reply asking for the exact metric they mean — daily active users, minutes watched, or something else — and the exact date range for "last month."
      </TimeBlock>

      <TimeBlock time="10:00 AM" label="The question gets framed">
        Thirty minutes later you have a precise version: "Did average minutes_watched per active user in June differ from May, and if so, for which subscriber segment?" Now you know exactly which columns and which filter to write.
      </TimeBlock>

      <TimeBlock time="10:15 — 11:30 AM" label="Collect, clean, explore">
        You pull watch_history and users, check for missing dates, confirm the June and May date ranges are complete in the data (no partial month due to a pipeline delay), and look at the overall distribution before slicing by segment.
      </TimeBlock>

      <TimeBlock time="11:30 AM — 1:00 PM" label="Analyze, then validate">
        A groupby shows a real-looking 12% drop, concentrated in the Basic plan. Before reporting it, you check the sample size (large enough) and run a quick statistical test to confirm the drop is unlikely to be random noise.
      </TimeBlock>

      <TimeBlock time="2:00 PM" label="Communicate and ship">
        You send the PM one sentence, one chart, and one caveat: "Basic-plan engagement dropped 12% in June, statistically significant at your usual threshold — likely tied to the price increase that took effect June 1st, worth confirming with an A/B-style before/after comparison next month."
      </TimeBlock>

      <ProTip>
        Every stage above took roughly the same amount of time. New data scientists often spend 90% of their time on Stage 4 (the model or analysis) and rush stages 1, 5, and 6 — which is exactly backwards from where most real projects actually fail.
      </ProTip>

      <HR />

      {/* ── PART 10 — Interview Prep ── */}
      <Part n="10" title="Interview Prep — 5 Questions With Complete Answers" />

      <IQ q="A stakeholder asks you to 'look into user engagement.' Walk me through what you do first.">
        <p style={{ margin: '0 0 14px' }}>Before writing any code, I would clarify the request into a precise, answerable question. "Engagement" is ambiguous — it could mean daily active users, session length, content completion rate, or repeat visits. I would ask what specific metric they care about, over what time window, and compared against what baseline (last month, a specific cohort, a competitor benchmark).</p>
        <p style={{ margin: '0 0 14px' }}>Once I have a precise version — for example, "did the percentage of Premium subscribers who watched at least one title in the last 7 days change after the pricing update?" — I know exactly which tables and columns I need, what the expected output looks like, and what would count as an interesting versus uninteresting result.</p>
        <p style={{ margin: 0 }}>Skipping this step is the most common cause of wasted analysis work — building a thorough report that answers a question nobody actually asked, because the original request was never made precise.</p>
      </IQ>

      <IQ q="What is the difference between exploratory analysis and validating a finding?">
        <p style={{ margin: '0 0 14px' }}>Exploratory analysis is the discovery phase — looking at distributions, running groupbys, and generating hypotheses about patterns that might be present in the data. It is intentionally open-ended and is expected to surface both real signals and coincidental noise.</p>
        <p style={{ margin: '0 0 14px' }}>Validation is the confirmatory phase — taking a specific pattern found during exploration and testing, using statistics, whether it is likely to be real rather than due to chance or a small sample. This typically means checking sample sizes, running a hypothesis test, and considering whether the pattern would replicate on a held-out or future dataset.</p>
        <p style={{ margin: 0 }}>The common mistake is treating an exploratory finding as validated fact without doing the second step — reporting the first interesting-looking groupby result as if it were a proven conclusion, when it has not yet been tested for statistical significance or checked against sample size.</p>
      </IQ>

      <IQ q="Why does defining a success metric before starting analysis matter?">
        <p style={{ margin: '0 0 14px' }}>Without a predefined success metric, it is easy to unconsciously search through many possible cuts of the data until one shows an interesting-looking pattern, then present that cut as the finding — a statistical error sometimes called p-hacking or data dredging. If you define the exact metric and comparison you are testing before looking at results, you avoid this bias.</p>
        <p style={{ margin: '0 0 14px' }}>It also makes the eventual result immediately actionable. If the agreed success metric for a feature launch was "7-day retention increases by at least 2 percentage points," the result is a clear yes or no. Without that predefined bar, any result can be spun as a success after the fact, which erodes trust in the analysis over time.</p>
        <p style={{ margin: 0 }}>In practice, this means agreeing on the metric and the threshold for success with stakeholders during the framing stage — Stage 1 of the workflow — not after the results are already in hand.</p>
      </IQ>

      <IQ q="Give an example of when a simple groupby is the right answer, and when you would build a model instead.">
        <p style={{ margin: '0 0 14px' }}>A groupby and chart is the right tool when the question is descriptive — "what happened, broken down by category?" For example, "what is the average watch time per device type?" is fully answered by grouping watch_history by device and taking the mean. No model adds value here because nothing is being predicted about an individual, unseen case.</p>
        <p style={{ margin: '0 0 14px' }}>A model is the right tool when the question is genuinely predictive about individual future cases — "will this specific subscriber cancel next month?" cannot be answered by a groupby, because it requires estimating a probability for one new individual based on patterns learned across many past individuals. That requires a trained classification model, covered starting in Module 47.</p>
        <p style={{ margin: 0 }}>A common junior mistake is reaching for a model when a groupby would answer the question just as well and be far easier to explain and maintain — model complexity should be justified by the question's actual need for individual-level prediction, not used as a default.</p>
      </IQ>

      <IQ q="How do you communicate statistical uncertainty to a non-technical stakeholder without either overstating or burying the result?">
        <p style={{ margin: '0 0 14px' }}>I lead with the finding in plain language, immediately followed by the confidence level in equally plain language — for example, "Premium subscribers are cancelling about 18% more than Basic subscribers this quarter. This is based on a reasonably large sample and is unlikely to be random noise, but it's correlational — we have not yet tested what happens if we change anything about Premium."</p>
        <p style={{ margin: '0 0 14px' }}>I avoid two failure modes. The first is hiding uncertainty entirely to sound more confident, which leads to decisions made on shakier ground than the stakeholder realizes. The second is burying the actual finding under so much statistical caveat that the stakeholder cannot extract an actionable takeaway at all.</p>
        <p style={{ margin: 0 }}>The right balance is usually: the finding, one sentence of confidence context in plain terms (not p-values or confidence interval math), and — when relevant — a concrete next step like running a controlled experiment before committing a large decision to the finding.</p>
      </IQ>

      <HR />

      {/* ── PART 11 — Error Library ── */}
      <Part n="11" title="Errors You Will Hit — And Exactly Why They Happen" />

      <Err
        msg="SettingWithCopyWarning: A value is trying to be set on a copy of a slice from a DataFrame"
        cause="You filtered a DataFrame into a new variable, then tried to modify a column on that filtered result. Pandas cannot always tell whether your filtered variable is an independent copy or a view into the original data, so it warns you that the modification may silently not do what you expect."
        fix="Add .copy() immediately after filtering, before modifying: premium = users[users['plan'] == 'Premium'].copy() — then premium['flag'] = True works safely and unambiguously. This is one of the most common warnings in real pandas work and is almost always fixed the same way."
      />

      <Err
        msg="ValueError: You are trying to merge on object and int64 columns for key 'user_id'"
        cause="The column you are merging on has a different data type in each DataFrame — for example, user_id is stored as text in one table and as a number in the other, often because one table was loaded from a CSV that quoted the IDs."
        fix="Check the dtype on both sides before merging: users['user_id'].dtype and subscriptions['user_id'].dtype. If they differ, cast one to match the other before merging: subscriptions['user_id'] = subscriptions['user_id'].astype(int) — do this once, right after loading the data, not repeatedly before every merge."
      />

      <Err
        msg="KeyError: 'user id'"
        cause="A merge or groupby was written with the column name spelled using a space instead of an underscore — 'user id' instead of 'user_id'. Pandas treats this as looking for a column that does not exist, rather than as a typo it can guess-correct."
        fix="Run df.columns.tolist() to see the exact column names, copy them exactly, and remember that StreamPulse (like almost all real data) uses snake_case with underscores, never spaces, for every column name."
      />

      <Err
        msg="ValueError: cannot convert float NaN to integer"
        cause="You tried to convert a column to an integer type using .astype(int), but the column contains missing values (NaN). NaN is fundamentally a floating-point concept — there is no integer representation of 'missing' in NumPy's integer types, so the conversion fails outright."
        fix="Handle the missing values first — either fillna() with a sensible default or dropna() to remove those rows — before converting to int. Alternatively, use the nullable integer type: df['col'].astype('Int64') (capital I) which supports NaN values directly."
      />

      <Err
        msg="TypeError: unhashable type: 'list'"
        cause="You tried to use a list as a groupby key or as a dictionary key, for example groupby(['plan', ['country']]) with an extra nested list, or accidentally passed a list where pandas expected a column name string or a flat list of column names."
        fix="Double-check the structure of what you are passing to groupby() — it should be a single column name as a string, e.g. groupby('plan'), or a flat list of column name strings for multiple keys, e.g. groupby(['plan', 'country']) — never a list containing another list."
      />

      <HR />

      {/* ── Try It ── */}
      <TryItChallenge
        question="Frame and answer this question end to end: 'Do subscribers who joined through Social Media referrals watch more content on average than subscribers who joined through Organic Search?' Merge users with watch_history, then compare average minutes_watched between the two referral_source groups."
        hint="Merge users and watch_history on user_id, filter to just the two referral sources you care about (or don't filter and group by all of them), then groupby('referral_source') and take the mean of minutes_watched."
        answer={`merged = users.merge(watch_history, on='user_id')
merged.groupby('referral_source')['minutes_watched'].mean().round(1).sort_values(ascending=False)`}
        explanation="This mirrors the full Stage 3–4 pattern from this module: merge two related tables into one analysis-ready DataFrame, then groupby the dimension you care about and aggregate the metric in question. Before reporting a difference between Social Media and Organic Search specifically, Stage 5 (validate) would require checking how many rows back each group — with StreamPulse's small teaching dataset, that check usually reveals the sample is too small to draw a confident conclusion, which is itself the correct, honest finding."
      />

      <HR />

      {/* ── Key Takeaways ── */}
      <KeyTakeaways
        items={[
          'The six-stage workflow — frame, collect, clean & explore, analyze/model, validate, communicate & ship — is not a strict pipeline. Real projects loop backward constantly, especially from cleaning back to framing and from validation back to collection.',
          'A vague request like "look into engagement" is not answerable. A framed question names exact columns, is time-bound, and has a clear answer shape — a percentage, a comparison, a yes/no.',
          'Collection in the real world rarely means "the data is already loaded" — it means knowing exactly which warehouse table, API, or log source has the answer, and what each column actually measures.',
          'Missing values are not automatically a data quality problem — an active subscriber having no end_date is expected and meaningful, not an error to "fix."',
          'Choosing between a groupby/chart and a trained model should be driven by the question: "what happened, grouped by X" needs a groupby; "what will this specific individual do next" needs a model.',
          'Validation means checking sample size and considering whether a pattern would survive a statistical test — the most expensive data science mistake is presenting an unvalidated pattern from a small sample as fact.',
          'The deliverable is never the notebook. The right output format — one sentence for an executive, a chart plus caveat for a PM, full code for another data scientist — depends entirely on who has to act on it.',
          'Defining a success metric and threshold before looking at results prevents unconsciously searching for whichever data cut looks most interesting after the fact.',
          'New data scientists tend to over-invest time in Stage 4 (analysis/modeling) and under-invest in Stages 1, 5, and 6 — exactly backwards from where most real projects actually fail.',
          'Knowing when NOT to conclude something — because the sample is too small or the pattern does not survive validation — is as much a professional skill as building the analysis in the first place.',
        ]}
      />

      {/* ── Next CTA ── */}
      <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 10, padding: '24px', marginTop: 40 }}>
        <p style={{ fontSize: 10, color: 'var(--muted)', letterSpacing: '.12em', textTransform: 'uppercase', fontFamily: 'var(--font-mono)', fontWeight: 700, margin: '0 0 10px' }}>
          What comes next
        </p>
        <p style={{ fontSize: 15, color: 'var(--text)', lineHeight: 1.85, margin: '0 0 20px' }}>
          <strong>Module 03</strong> draws a sharp, practical line between Data Scientist, Data Analyst, ML Engineer, and Data Engineer — what each role actually owns day to day, where the boundaries blur in practice, and how to talk about your own work in interviews without the titles getting confused.
        </p>
        <Link href="/learn/data-science/ds-vs-other-roles" style={{ background: C, color: '#fff', padding: '11px 24px', borderRadius: 7, fontWeight: 700, fontSize: 13, textDecoration: 'none', display: 'inline-block' }}>
          Module 03 → Data Scientist vs Other Roles
        </Link>
      </div>

    </LearnLayout>
  );
}
