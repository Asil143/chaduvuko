import type { Metadata } from 'next'
import { LearnLayout } from '@/components/content/LearnLayout'

export const metadata: Metadata = {
  title: 'Context Windows and Model Limits — Chaduvuko',
  description: 'Learn what fits in an LLM context window, budget input and output tokens, and diagnose overflow and missed-context failures.',
}

const paragraph: React.CSSProperties = {
  color: 'var(--muted)',
  fontSize: 15,
  lineHeight: 1.85,
  margin: '0 0 16px',
}

const section: React.CSSProperties = {
  borderBottom: '1px solid var(--border)',
  marginBottom: 36,
  paddingBottom: 30,
}

const tableCell: React.CSSProperties = {
  borderBottom: '1px solid var(--border)',
  padding: '10px 12px',
  textAlign: 'left',
  verticalAlign: 'top',
}

function Note({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <aside style={{ padding: 16, margin: '20px 0', borderRadius: 10, background: 'var(--surface)', border: '1px solid var(--border)' }}>
      <strong style={{ display: 'block', color: 'var(--green)', marginBottom: 6 }}>{title}</strong>
      <div style={{ color: 'var(--muted)', fontSize: 14, lineHeight: 1.75 }}>{children}</div>
    </aside>
  )
}

const budget = [
  { item: 'System and developer instructions', tokens: 600 },
  { item: 'Current user message', tokens: 250 },
  { item: 'Recent conversation history', tokens: 1450 },
  { item: 'Retrieved reference passages', tokens: 3500 },
  { item: 'Tool definitions and results', tokens: 650 },
  { item: 'Reserved response budget', tokens: 900 },
]

export default function ContextWindowsModelLimitsPage() {
  const total = budget.reduce((sum, line) => sum + line.tokens, 0)
  const limit = 7000
  const afterTrim = total - 600

  return (
    <LearnLayout
      title="Context Windows and Model Limits"
      description="Budget prompts, conversation history, retrieved evidence, and output within an LLM context window. Learn why a larger window is not a guarantee of better answers."
      section="Generative AI"
      readTime="12–15 min"
    >
      <section aria-labelledby="objective" style={section}>
        <p style={{ color: 'var(--green)', fontSize: 11, fontWeight: 700, letterSpacing: '.1em', textTransform: 'uppercase', margin: '0 0 8px' }}>
          Learning objective
        </p>
        <h2 id="objective" style={{ color: 'var(--text)', fontSize: 24, lineHeight: 1.25, margin: '0 0 12px' }}>
          Plan a request that fits without silently dropping the information the model needs.
        </h2>
        <p style={paragraph}>
          Prerequisites: know what a language model predicts, how text is tokenised, and what an instruction prompt contains.
          If those ideas are new, start with <a href="/learn/ai-ml/generative-ai/what-is-generative-ai" style={{ color: 'var(--green)' }}>What is Generative AI?</a>,{' '}
          <a href="/learn/ai-ml/nlp/tokenisation-and-embeddings" style={{ color: 'var(--green)' }}>Tokenisation and Word Embeddings</a>, and{' '}
          <a href="/learn/ai-ml/generative-ai/llms-pretraining-rlhf" style={{ color: 'var(--green)' }}>LLMs — Pretraining, RLHF, and Scaling Laws</a>.
        </p>
      </section>

      <section aria-labelledby="meaning" style={section}>
        <h2 id="meaning" style={{ color: 'var(--text)', fontSize: 22 }}>A context window is a request’s working set</h2>
        <p style={paragraph}>
          A model processes tokenised input as context while producing an output. In a multi-turn application, the request may include instructions,
          the current question, selected conversation history, retrieved passages, and tool definitions or results. The model does not automatically
          remember text that your application did not send; some APIs offer managed conversation state, so inspect what that API includes on each turn.
        </p>
        <p style={paragraph}>
          A context-window limit is measured in tokens, not words or characters. Token counts vary with the tokenizer and the text: code, punctuation,
          uncommon names, and different languages can consume different numbers of tokens. Use the model or provider’s documented counting method when
          you need an exact budget.
        </p>
        <Note title="Keep the limit and the quality question separate">
          Fitting text into the window only means it can be supplied. It does not guarantee the model will notice, correctly interpret, or reliably use
          every detail. Test whether critical evidence is retrieved and whether the answer cites or reflects it.
        </Note>
      </section>

      <section aria-labelledby="budgeting" style={section}>
        <h2 id="budgeting" style={{ color: 'var(--text)', fontSize: 22 }}>Budget all parts of the request</h2>
        <p style={paragraph}>
          Treat the following numbers as a planning example, not as a tokenizer estimate. Assume this model’s documented combined request and output limit is
          7,000 tokens. The application’s planned request totals {total.toLocaleString()} tokens, so it is {total - limit} over budget.
        </p>
        <div style={{ overflowX: 'auto', border: '1px solid var(--border)', borderRadius: 10, margin: '18px 0' }}>
          <table style={{ borderCollapse: 'collapse', width: '100%', minWidth: 460, color: 'var(--text)', fontSize: 13 }}>
            <caption style={{ padding: 12, color: 'var(--muted)', textAlign: 'left' }}>Hypothetical per-request token budget</caption>
            <thead>
              <tr style={{ background: 'var(--surface)' }}>
                <th scope="col" style={tableCell}>Request component</th>
                <th scope="col" style={{ ...tableCell, textAlign: 'right' }}>Planned tokens</th>
              </tr>
            </thead>
            <tbody>
              {budget.map(line => (
                <tr key={line.item}>
                  <th scope="row" style={{ ...tableCell, fontWeight: 500 }}>{line.item}</th>
                  <td style={{ ...tableCell, textAlign: 'right', fontVariantNumeric: 'tabular-nums' }}>{line.tokens.toLocaleString()}</td>
                </tr>
              ))}
              <tr>
                <th scope="row" style={{ ...tableCell, color: 'var(--green)' }}>Total including reserved output</th>
                <td style={{ ...tableCell, color: 'var(--green)', textAlign: 'right', fontWeight: 700 }}>{total.toLocaleString()}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p style={paragraph}>
          One possible adjustment is to retrieve fewer, more relevant passages: reducing that component by 600 gives {afterTrim.toLocaleString()} planned tokens,
          leaving 250 tokens below the hypothetical limit. In a real application, keep additional headroom because estimates, tool output, formatting, and provider
          accounting can differ.
        </p>
        <Note title="Provider limits are not interchangeable">
          Input limits, output limits, and whether they share one combined ceiling vary by model and API. Read the current model documentation and handle an
          over-limit response explicitly; do not rely on an old limit copied into code.
        </Note>
      </section>

      <section aria-labelledby="design" style={section}>
        <h2 id="design" style={{ color: 'var(--text)', fontSize: 22 }}>A reliable budgeting workflow</h2>
        <ol style={{ color: 'var(--muted)', fontSize: 14, lineHeight: 1.85, paddingLeft: 22 }}>
          <li><strong style={{ color: 'var(--text)' }}>Choose the model first.</strong> Limits and token accounting are model-specific.</li>
          <li><strong style={{ color: 'var(--text)' }}>Reserve output capacity.</strong> Do not spend the entire allowance on input if the answer needs room.</li>
          <li><strong style={{ color: 'var(--text)' }}>Count the actual request.</strong> Include instructions, history, retrieved content, tool schemas, and tool results.</li>
          <li><strong style={{ color: 'var(--text)' }}>Trim by value, not by position alone.</strong> Remove duplicate history and low-relevance evidence; keep the user’s current task and required constraints.</li>
          <li><strong style={{ color: 'var(--text)' }}>Make loss visible.</strong> If history or retrieval must be shortened, record what was omitted or summarised rather than silently dropping content.</li>
          <li><strong style={{ color: 'var(--text)' }}>Evaluate answer quality.</strong> Test with relevant evidence in different positions and check whether the response uses it correctly.</li>
        </ol>
      </section>

      <section aria-labelledby="failure" style={section}>
        <h2 id="failure" style={{ color: 'var(--text)', fontSize: 22 }}>Diagnose common failures</h2>
        <div style={{ display: 'grid', gap: 10 }}>
          {[
            ['The request is rejected before generation', 'Inspect the selected model, exact request payload, and provider error. Count all included fields and the requested output allowance.'],
            ['The answer ignores a fact that was supplied', 'Check that the fact actually reached the model after application-side trimming. Then reduce noise, improve retrieval, and test placement rather than assuming a larger window solves it.'],
            ['Follow-up turns lose earlier constraints', 'Check whether the application resends those constraints or uses an API-managed conversation. Do not assume that a browser UI’s visible transcript is automatically model context.'],
            ['Cost or latency rises unexpectedly', 'Measure tokens by request component. Long history, repeated tool schemas, and oversized retrieval can grow input work on every turn.'],
          ].map(([symptom, action]) => (
            <div key={symptom} style={{ padding: 14, border: '1px solid var(--border)', borderRadius: 9, background: 'var(--surface)' }}>
              <strong style={{ color: 'var(--text)', display: 'block', marginBottom: 4 }}>{symptom}</strong>
              <span style={{ color: 'var(--muted)', fontSize: 13, lineHeight: 1.7 }}>{action}</span>
            </div>
          ))}
        </div>
      </section>

      <section aria-labelledby="practice" style={section}>
        <h2 id="practice" style={{ color: 'var(--text)', fontSize: 22 }}>Practice: repair an over-budget request</h2>
        <p style={paragraph}>
          Your request has an 8,000-token combined limit and currently uses 8,450 tokens, including a 1,000-token response reserve. The user’s latest question
          and a required safety instruction must remain. You have 3,200 tokens of retrieved documents, of which only two passages directly answer the question.
        </p>
        <ol style={{ color: 'var(--muted)', fontSize: 14, lineHeight: 1.85, paddingLeft: 22 }}>
          <li>Keep the reserve and the required instruction.</li>
          <li>Remove duplicate conversation turns before summarising the current question.</li>
          <li>Prefer the two relevant passages over unrelated retrieved text.</li>
          <li>Recount the actual request, leave headroom, and test that the answer still uses the needed evidence.</li>
        </ol>
        <p style={paragraph}>
          Check your result: trimming at least 451 tokens gets the planned request below 8,000, but a production request should leave more than one token of headroom.
          The exact amount depends on the provider’s accounting and request structure.
        </p>
      </section>

      <section aria-labelledby="takeaways" style={{ marginBottom: 12 }}>
        <h2 id="takeaways" style={{ color: 'var(--text)', fontSize: 22 }}>Key takeaways</h2>
        <ul style={{ color: 'var(--muted)', fontSize: 14, lineHeight: 1.85, paddingLeft: 22 }}>
          <li>The context window is a token budget for the model request, not persistent memory.</li>
          <li>Budget instructions, user input, history, retrieved evidence, tools, and output together according to the chosen API’s rules.</li>
          <li>Fitting more text does not guarantee better recall; retrieval quality and evaluation still matter.</li>
          <li>When trimming, protect the current task and constraints, keep useful evidence, and make omissions observable.</li>
        </ul>
      </section>
    </LearnLayout>
  )
}
