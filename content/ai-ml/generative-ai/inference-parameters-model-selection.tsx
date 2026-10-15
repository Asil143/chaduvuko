import type { Metadata } from 'next'
import { LearnLayout } from '@/components/content/LearnLayout'

export const metadata: Metadata = {
  title: 'Inference Parameters and Model Selection — Chaduvuko',
  description: 'Choose a language model for a task and evaluate generation settings such as temperature, top-p, and output limits without treating them as quality guarantees.',
}

const paragraph: React.CSSProperties = {
  color: 'var(--muted)',
  fontSize: 15,
  lineHeight: 1.85,
  margin: '0 0 16px',
}

const rowStyle: React.CSSProperties = {
  borderBottom: '1px solid var(--border)',
  padding: '11px 12px',
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

export default function InferenceParametersModelSelectionPage() {
  return (
    <LearnLayout
      title="Inference Parameters and Model Selection"
      description="Select a language model and generation settings by measuring task quality, format reliability, latency, and cost."
      section="Generative AI"
      readTime="12–15 min"
    >
      <section aria-labelledby="objective" style={{ borderBottom: '1px solid var(--border)', marginBottom: 34, paddingBottom: 28 }}>
        <p style={{ color: 'var(--green)', fontSize: 11, fontWeight: 700, letterSpacing: '.1em', textTransform: 'uppercase', margin: '0 0 8px' }}>
          Learning objective
        </p>
        <h2 id="objective" style={{ color: 'var(--text)', fontSize: 24, lineHeight: 1.25, margin: '0 0 12px' }}>
          Select a model and generation settings using repeatable task tests—not intuition alone.
        </h2>
        <p style={paragraph}>
          Prerequisites: understand next-token generation, prompts, and context budgets. Review{' '}
          <a href="/learn/ai-ml/nlp/prompt-engineering" style={{ color: 'var(--green)' }}>Prompt Engineering</a> and{' '}
          <a href="/learn/ai-ml/generative-ai/context-windows-model-limits" style={{ color: 'var(--green)' }}>Context Windows and Model Limits</a> first.
        </p>
      </section>

      <section aria-labelledby="selection" style={{ borderBottom: '1px solid var(--border)', marginBottom: 34, paddingBottom: 28 }}>
        <h2 id="selection" style={{ color: 'var(--text)', fontSize: 22 }}>Choose for the task you need to solve</h2>
        <p style={paragraph}>
          Start with a representative evaluation set: real examples, expected outcomes, and known edge cases. Compare candidate models against the same prompts
          and inputs. A model that is strongest on a general benchmark may still be a poor fit for your task, output format, latency target, or deployment constraints.
        </p>
        <div style={{ overflowX: 'auto', border: '1px solid var(--border)', borderRadius: 10, margin: '18px 0' }}>
          <table style={{ borderCollapse: 'collapse', width: '100%', minWidth: 580, color: 'var(--text)', fontSize: 13 }}>
            <caption style={{ padding: 12, color: 'var(--muted)', textAlign: 'left' }}>Questions to include in a model comparison</caption>
            <thead>
              <tr style={{ background: 'var(--surface)' }}>
                <th scope="col" style={rowStyle}>Dimension</th>
                <th scope="col" style={rowStyle}>Test it</th>
              </tr>
            </thead>
            <tbody>
              {[
                ['Task quality', 'Does it answer correctly on your representative examples and fail safely on ambiguous ones?'],
                ['Input and output fit', 'Does the documented context and output capacity cover your request shape?'],
                ['Format reliability', 'Does the model return valid JSON or a tool call when your application requires it?'],
                ['Latency and throughput', 'Does it meet measured response-time and concurrency needs under realistic load?'],
                ['Cost', 'Measure actual input and output usage, including retries and long conversations.'],
                ['Data handling and availability', 'Check the provider’s current terms, retention controls, region availability, and operational requirements.'],
              ].map(([dimension, test]) => (
                <tr key={dimension}>
                  <th scope="row" style={{ ...rowStyle, fontWeight: 600 }}>{dimension}</th>
                  <td style={rowStyle}>{test}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <Note title="Do not choose by model name alone">
          Model names, versions, limits, and provider features change. Record the exact model identifier and test date with your results, then rerun evaluations
          before switching versions or providers.
        </Note>
      </section>

      <section aria-labelledby="parameters" style={{ borderBottom: '1px solid var(--border)', marginBottom: 34, paddingBottom: 28 }}>
        <h2 id="parameters" style={{ color: 'var(--text)', fontSize: 22 }}>What generation settings can—and cannot—do</h2>
        <p style={paragraph}>
          A model assigns scores to possible next tokens. Sampling settings influence how a response is selected from those possibilities; they do not repair
          missing knowledge, an unclear task, a weak retrieval result, or an unsuitable model.
        </p>
        <div style={{ overflowX: 'auto', border: '1px solid var(--border)', borderRadius: 10, margin: '18px 0' }}>
          <table style={{ borderCollapse: 'collapse', width: '100%', minWidth: 580, color: 'var(--text)', fontSize: 13 }}>
            <caption style={{ padding: 12, color: 'var(--muted)', textAlign: 'left' }}>Common controls; exact support and semantics vary by API</caption>
            <thead>
              <tr style={{ background: 'var(--surface)' }}>
                <th scope="col" style={rowStyle}>Control</th>
                <th scope="col" style={rowStyle}>Practical interpretation</th>
              </tr>
            </thead>
            <tbody>
              {[
                ['Temperature', 'Changes sampling randomness in APIs that support it. Lower values often reduce variation; they do not guarantee correctness or identical output.'],
                ['Top-p', 'Limits sampling to a probability mass chosen by the API. It is an alternative sampling control in some providers; avoid tuning it and temperature together without an evaluation plan.'],
                ['Maximum output tokens', 'Caps response generation. It is a ceiling, not a promise that the response will use that many tokens.'],
                ['Stop sequences', 'Can stop generation at configured text in APIs that support them. A poorly chosen sequence can cut off a valid answer.'],
                ['Structured output / tool controls', 'Constrain the response shape or expose tools when supported. Validate outputs and authorize tool actions in your application regardless.'],
              ].map(([control, interpretation]) => (
                <tr key={control}>
                  <th scope="row" style={{ ...rowStyle, fontWeight: 600 }}>{control}</th>
                  <td style={rowStyle}>{interpretation}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <Note title="Check the selected API’s documentation">
          Parameter names, accepted ranges, defaults, model compatibility, and interactions are provider- and model-specific. Treat the table as a conceptual guide,
          not a universal request schema.
        </Note>
      </section>

      <section aria-labelledby="evaluation" style={{ borderBottom: '1px solid var(--border)', marginBottom: 34, paddingBottom: 28 }}>
        <h2 id="evaluation" style={{ color: 'var(--text)', fontSize: 22 }}>Tune with a small controlled experiment</h2>
        <ol style={{ color: 'var(--muted)', fontSize: 14, lineHeight: 1.85, paddingLeft: 22 }}>
          <li>Write down the task, acceptable answer, and failures that matter.</li>
          <li>Fix the evaluation inputs, prompt version, and model version.</li>
          <li>Change one setting at a time and run the same examples.</li>
          <li>Measure task correctness, valid-format rate, refusal/edge-case behavior, latency, and token usage.</li>
          <li>Keep a setting only when the measured trade-off improves the intended outcome.</li>
        </ol>
        <p style={paragraph}>
          For extraction into a schema, compare valid and correct records—not just whether the output looks tidy. For brainstorming, assess useful variety and
          relevance rather than rewarding randomness. The desired setting depends on what the product considers a good answer.
        </p>
      </section>

      <section aria-labelledby="practice" style={{ borderBottom: '1px solid var(--border)', marginBottom: 34, paddingBottom: 28 }}>
        <h2 id="practice" style={{ color: 'var(--text)', fontSize: 22 }}>Practice: choose a setup for two tasks</h2>
        <p style={paragraph}>
          <strong style={{ color: 'var(--text)' }}>Task A:</strong> classify support messages into one of six fixed categories and return a machine-readable result.
          <br />
          <strong style={{ color: 'var(--text)' }}>Task B:</strong> suggest several different campaign ideas from a short brief.
        </p>
        <p style={paragraph}>
          For each task, choose candidate models that meet the documented input and output needs. Define a test set, hold the prompt stable, and compare settings
          based on the task’s success criteria. For Task A, include malformed or ambiguous cases and validate the returned structure. For Task B, ask reviewers to
          rate relevance and useful diversity. Do not assume one temperature value—or one model—will be best for both.
        </p>
        <p style={paragraph}>
          Before shipping, record model identifier, API version, parameters, test cases, results, latency, and cost. Re-test after changing any of them.
        </p>
      </section>

      <section aria-labelledby="takeaways">
        <h2 id="takeaways" style={{ color: 'var(--text)', fontSize: 22 }}>Key takeaways</h2>
        <ul style={{ color: 'var(--muted)', fontSize: 14, lineHeight: 1.85, paddingLeft: 22 }}>
          <li>Select a model against representative task tests and real product constraints.</li>
          <li>Generation controls influence sampling or response limits; they are not quality guarantees.</li>
          <li>Parameter support and semantics vary—verify the current model and API documentation.</li>
          <li>Change one setting at a time and evaluate correctness, reliability, latency, and cost.</li>
        </ul>
      </section>
    </LearnLayout>
  )
}
