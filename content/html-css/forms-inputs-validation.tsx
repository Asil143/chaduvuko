import type { Metadata } from 'next'
import { LearnLayout } from '@/components/content/LearnLayout'
import Link from 'next/link'
import { Callout } from '@/components/content/Callout'
import { KeyTakeaways } from '@/components/content/KeyTakeaways'

export const metadata: Metadata = {
  title: 'HTML Forms — Inputs & Validation Basics — HTML & CSS | Chaduvuko',
  description:
    'form, every common input type, labels, placeholder, and the built-in validation attributes browsers already give you for free.',
}

const C = '#00e676'

const SectionTag = ({ text }: { text: string }) => (
  <div style={{
    fontSize: 10, fontWeight: 700, letterSpacing: '.14em',
    textTransform: 'uppercase', color: 'var(--muted)',
    fontFamily: 'var(--font-mono)', marginBottom: 10,
  }}>{text}</div>
)

const SectionTitle = ({ children }: { children: React.ReactNode }) => (
  <h2 style={{
    fontSize: 'clamp(20px, 2.5vw, 28px)', fontWeight: 900,
    letterSpacing: '-1px', color: 'var(--text)', marginBottom: 18,
    fontFamily: 'var(--font-display)', lineHeight: 1.2,
  }}>{children}</h2>
)

const SubTitle = ({ children }: { children: React.ReactNode }) => (
  <h3 style={{
    fontSize: 'clamp(16px, 1.8vw, 20px)', fontWeight: 700,
    letterSpacing: '-0.3px', color: 'var(--text)', marginBottom: 12,
    fontFamily: 'var(--font-display)',
  }}>{children}</h3>
)

const SubSubTitle = ({ children }: { children: React.ReactNode }) => (
  <h4 style={{
    fontSize: 15, fontWeight: 700, color: 'var(--text)', marginBottom: 10,
  }}>{children}</h4>
)

const Para = ({ children }: { children: React.ReactNode }) => (
  <p style={{
    fontSize: 15, color: 'var(--text)', lineHeight: 1.9, marginBottom: 20,
  }}>{children}</p>
)

const CodeBox = ({ children, label }: { children: string; label?: string }) => (
  <div style={{ marginBottom: 24 }}>
    {label && (
      <div style={{
        fontSize: 11, fontWeight: 700, color: 'var(--muted)',
        letterSpacing: '.1em', textTransform: 'uppercase',
        marginBottom: 6, fontFamily: 'var(--font-mono)',
      }}>{label}</div>
    )}
    <pre style={{
      background: 'var(--bg2)', border: '1px solid var(--border)',
      borderRadius: 10, padding: '18px 22px', overflowX: 'auto',
      fontSize: 13, lineHeight: 1.9, color: 'var(--text)',
      fontFamily: 'var(--font-mono)', margin: 0, whiteSpace: 'pre-wrap',
    }}>
      <code>{children}</code>
    </pre>
  </div>
)

const Divider = () => (
  <div style={{ borderTop: '1px solid var(--border)', margin: '52px 0' }} />
)

export default function FormsInputsValidation() {
  return (
    <LearnLayout
      title="HTML Forms — Inputs & Validation Basics"
      description="form, every common input type, labels, placeholder, and the built-in validation attributes browsers already give you for free."
      section="HTML & CSS — Module 08"
      readTime="45 min"
      updatedAt="August 2026"
    >

      {/* ── Part 01 ── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 01 — The form Element" />
        <SectionTitle>Everything a Form Needs to Actually Submit</SectionTitle>

        <Para>
          A <code>&lt;form&gt;</code> element wraps every input that should be submitted together, and
          its two most important attributes decide where and how that submission happens:{' '}
          <code>action</code> (the URL the data is sent to) and <code>method</code> (usually{' '}
          <code>GET</code> or <code>POST</code>).
        </Para>

        <CodeBox label="The minimum a working form needs">{`<form action="/submit-signup" method="POST">
  <input type="text" name="email">
  <button type="submit">Sign up</button>
</form>`}</CodeBox>

        <Para>
          Without a <code>name</code> attribute on an input, its value is simply never included in the
          submitted data at all — this is one of the single most common reasons a "working" form
          silently submits incomplete data, covered in depth in the Common Mistakes section below.
        </Para>
      </section>

      <Divider />

      {/* ── Part 02 ── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 02 — Input Types, and Why They Are Not Interchangeable" />
        <SectionTitle>Every Common Input Type, With Real Behavioural Differences</SectionTitle>

        <Para>
          The <code>type</code> attribute on <code>&lt;input&gt;</code> is not cosmetic — each type
          changes the keyboard shown on mobile, the built-in validation applied, and sometimes the
          entire UI the browser renders.
        </Para>

        <CodeBox label="The types you will actually use">{`<input type="text">      <!-- plain single-line text -->
<input type="email">     <!-- validates a basic email SHAPE, shows an email keyboard on mobile -->
<input type="password">  <!-- masks characters as they're typed -->
<input type="number">    <!-- spinner arrows, numeric keyboard, rejects non-numeric text entry -->
<input type="tel">       <!-- numeric-leaning keyboard on mobile, NO format validation at all -->
<input type="url">       <!-- validates a basic URL shape -->
<input type="date">      <!-- a native date picker widget -->
<input type="checkbox">  <!-- boolean toggle -->
<input type="radio">     <!-- one choice from a group (Part 07 of the next module covers grouping) -->
<input type="hidden">    <!-- submitted with the form, never shown or editable by the user -->`}</CodeBox>

        <Callout type="warning">
          <strong>type="number" is genuinely tricky and often the wrong choice.</strong> It rejects
          leading zeros (so a ZIP code like <code>02139</code> becomes <code>2139</code>), and its
          spinner arrows are frequently unwanted UI. For anything that looks like a number but is
          really an identifier — ZIP codes, phone numbers, credit card numbers — <code>type="text"</code>{' '}
          with a <code>pattern</code> attribute (Part 05) is usually the better, more correct choice.
        </Callout>
      </section>

      <Divider />

      {/* ── Part 03 ── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 03 — The label Element" />
        <SectionTitle>Not Decorative — a Real Programmatic Connection</SectionTitle>

        <Para>
          A <code>&lt;label&gt;</code> is not just text sitting near an input — its <code>for</code>{' '}
          attribute, matched against the input's <code>id</code>, creates a genuine programmatic
          association that screen readers depend on and that expands the input's clickable area for
          every user.
        </Para>

        <CodeBox label="A correctly associated label">{`<label for="email-address">Email address</label>
<input type="email" id="email-address" name="email">

<!-- Clicking the WORD "Email address" now focuses the input — try it in a real browser -->`}</CodeBox>

        <CodeBox label="The implicit alternative — wrapping the input">{`<label>
  Email address
  <input type="email" name="email">
</label>
<!-- No "for"/"id" pairing needed — the wrapping relationship IS the association -->`}</CodeBox>

        <Para>
          Both forms are valid and equally accessible. The explicit <code>for</code>/<code>id</code>{' '}
          form is generally preferred in real codebases because it doesn't constrain the input's
          position in the DOM relative to its label, making more layout options possible.
        </Para>

        <SubTitle>placeholder is not a label — a genuinely common, genuinely serious mistake</SubTitle>

        <CodeBox label="Wrong — no real label at all">{`<input type="email" name="email" placeholder="Email address">
<!-- Looks fine visually. Has NO accessible name. A screen reader announces "edit text, blank". -->`}</CodeBox>

        <Callout type="warning">
          <strong>placeholder text disappears the instant the user starts typing</strong> — a sighted
          user who gets interrupted mid-form and comes back later has already lost the field's label. A
          screen reader user never had it in the first place; placeholder text is not reliably announced
          as a label by assistive technology. Always pair every input with a real{' '}
          <code>&lt;label&gt;</code>; use <code>placeholder</code> only for a genuine example of the
          expected format, never as a replacement for the label itself.
        </Callout>
      </section>

      <Divider />

      {/* ── Part 04 ── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 04 — required and Basic Constraints" />
        <SectionTitle>The Browser Blocks Submission Before Your Code Ever Runs</SectionTitle>

        <CodeBox label="required, min, max, minlength, maxlength">{`<input type="email" name="email" required>
<input type="number" name="age" min="13" max="120">
<input type="password" name="password" minlength="8" maxlength="64" required>`}</CodeBox>

        <Para>
          These constraint attributes are checked entirely by the browser, before any form submission
          is even attempted — if <code>required</code> is present and the field is empty, the browser
          blocks submission and shows its own native validation message, with zero JavaScript written.
        </Para>

        <Callout type="tip">
          <strong>Built-in validation is a real first line of defense, but never the only one.</strong>{' '}
          It can be bypassed entirely — disabled JavaScript doesn't affect it, but a request crafted
          directly against your server's endpoint (via curl, a script, or a malicious actor) skips the
          browser and its validation completely. Server-side validation of every submitted value is
          still mandatory; client-side/browser validation is a UX improvement, not a security boundary.
        </Callout>
      </section>

      <Divider />

      {/* ── Part 05 ── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 05 — pattern" />
        <SectionTitle>Custom Validation Rules With Regular Expressions</SectionTitle>

        <CodeBox label="pattern — a regular expression the value must match">{`<input type="text" name="zip" pattern="[0-9]{5}" title="A 5-digit ZIP code" required>

<input type="text" name="phone"
       pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
       title="Format: 123-456-7890"
       placeholder="123-456-7890">`}</CodeBox>

        <Para>
          The <code>title</code> attribute here is not a tooltip decoration — many browsers surface it
          directly inside the native validation error message ("Please match the requested format:" +
          the title text), so it should describe the expected format in plain language, not restate the
          regex.
        </Para>
      </section>

      <Divider />

      {/* ── Part 06 ── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 06 — :valid and :invalid" />
        <SectionTitle>Styling Based on Validation State, With No JavaScript</SectionTitle>

        <CodeBox label="A brief preview — full CSS pseudo-class coverage comes in the CSS Selectors module">{`input:invalid {
  border-color: #ff4757;
}

input:valid {
  border-color: #00e676;
}

/* An empty required field is :invalid the instant the page loads — this
   often means every required field shows red before the user has typed
   anything at all, which usually reads as broken rather than helpful */
input:placeholder-shown:invalid {
  border-color: initial;  /* suppress the red state until the user actually interacts */
}`}</CodeBox>

        <Para>
          These pseudo-classes update live as the user types, reflecting exactly what the browser's own
          constraint validation (required/pattern/min/max) currently thinks of the field — no JavaScript
          event listener required to keep the styling in sync.
        </Para>
      </section>

      <Divider />

      {/* ── Part 07 — Real World ── */}
      <section style={{ marginBottom: 64 }} data-toc-kind="story">
        <SectionTag text="// Part 07 — Real World" />
        <div style={{
          fontSize: 10, fontWeight: 700, letterSpacing: '.12em',
          textTransform: 'uppercase', color: 'var(--muted)', marginBottom: 12,
          fontFamily: 'var(--font-mono)',
        }}>
          💼 What This Looks Like at Work
        </div>
        <SectionTitle>A Signup Form Silently Dropping Fields, at a Denver SaaS Startup</SectionTitle>

        <div style={{
          background: 'var(--surface)', border: '1px solid var(--border)',
          borderRadius: 12, padding: '24px 28px', marginBottom: 24,
        }}>
          <div style={{
            fontSize: 11, fontWeight: 700, color: 'var(--accent)',
            background: 'rgba(0,230,118,0.1)', border: '1px solid rgba(0,230,118,0.2)',
            borderRadius: 6, padding: '4px 10px', fontFamily: 'var(--font-mono)',
            display: 'inline-block', marginBottom: 20, letterSpacing: '.1em',
            textTransform: 'uppercase',
          }}>
            Scenario — SaaS startup, Denver · Signup form bug
          </div>

          <Para>
            A newly redesigned signup form visually looks identical to the old one — same fields, same
            layout. Support starts getting tickets from users saying their company name never shows up
            anywhere after signing up, even though they clearly typed it in.
          </Para>

          <CodeBox label="The redesigned markup — visually identical, structurally broken">{`<label>Company name</label>
<input type="text" id="company" placeholder="Acme Inc.">
<!-- no "name" attribute on the input at all -->`}</CodeBox>

          <SubSubTitle>What actually happened</SubSubTitle>

          <Para>
            The designer who rebuilt the form's markup copied the visual structure carefully but dropped
            the <code>name</code> attribute on several inputs during the rewrite — without it, the
            browser simply never includes that field in the submitted form data at all, no error, no
            warning, nothing visibly different in the UI. The field renders, accepts input, looks
            completely normal, and is silently absent from every single submission. The team's own
            retrospective: "the browser did exactly what we told it — we just told it to submit a form
            with an unnamed field, which means submit nothing for that field at all."
          </Para>
        </div>
      </section>

      <Divider />

      {/* ── Part 08 — Misconceptions ── */}
      <section style={{ marginBottom: 64 }} data-toc-kind="myth">
        <SectionTag text="// Part 08 — Misconceptions" />
        <SectionTitle>Four Misconceptions About HTML Forms</SectionTitle>

        {[
          {
            wrong: "\"placeholder text is a perfectly good substitute for a label\"",
            right: 'It disappears the moment the user starts typing, and is not reliably announced as a label by screen readers. Every input needs a real <label> — placeholder is only for a format example.',
          },
          {
            wrong: '"Built-in browser validation (required/pattern) means you never need to validate on the server"',
            right: 'Client-side validation is entirely bypassable — a request sent directly to your endpoint (not through the browser form UI at all) skips it completely. Server-side validation of every value remains mandatory regardless of what the browser already checked.',
          },
          {
            wrong: "\"type='number' is always the right choice for anything numeric-looking\"",
            right: 'It strips leading zeros (breaking ZIP codes and similar identifiers), adds spinner arrows that are often unwanted, and rejects formatting characters. For number-shaped identifiers rather than true quantities, type="text" with a pattern attribute is usually more correct.',
          },
          {
            wrong: '"An input without a name attribute still gets submitted, just under a generic key"',
            right: 'It is not submitted at all — omitted entirely from the form data, with no error or warning. This is one of the most common real causes of a form that silently drops a field, exactly as shown in the Real World example above.',
          },
        ].map((item, i) => (
          <div key={i} style={{
            background: 'var(--surface)', border: '1px solid var(--border)',
            borderRadius: 10, padding: '20px 24px', marginBottom: 16,
          }}>
            <div style={{
              fontSize: 13, fontWeight: 700, color: 'var(--red)',
              marginBottom: 8, fontFamily: 'var(--font-mono)',
            }}>
              ✕ {item.wrong}
            </div>
            <div style={{ fontSize: 14, color: 'var(--muted)', lineHeight: 1.7 }}>
              {item.right}
            </div>
          </div>
        ))}
      </section>

      <Divider />

      {/* ── Part 09 — Interview Prep ── */}
      <section style={{ marginBottom: 64 }} data-toc-kind="prep">
        <SectionTag text="// Part 09 — Interview Prep" />
        <SectionTitle>5 Interview Questions — With Complete Answers</SectionTitle>

        {[
          {
            q: 'Why does an <input> without a name attribute cause data to silently go missing on submit?',
            a: 'The name attribute is what the browser uses as the key when serializing form data for submission — without it, the browser has no key to submit the value under, so the field is omitted from the submitted data entirely, with no error shown anywhere.',
          },
          {
            q: 'What is the difference between the two ways of associating a label with an input?',
            a: 'The explicit form (label for="x" + input id="x") creates the association via matching attribute values and does not require the input to be nested inside the label in the DOM. The implicit form (wrapping the input directly inside the label) uses the DOM nesting itself as the association, with no for/id needed. Both are equally accessible.',
          },
          {
            q: 'Why is client-side (browser) form validation not sufficient on its own?',
            a: 'It can be bypassed entirely by any request that does not go through the browser\'s own form submission UI — a script or tool hitting the endpoint directly skips all of it. Client-side validation is a UX convenience; server-side validation of every submitted value is the actual security/data-integrity boundary.',
          },
          {
            q: 'What does the pattern attribute do, and what role does the title attribute play alongside it?',
            a: 'pattern supplies a regular expression the input\'s value must match to be considered valid by the browser\'s built-in constraint validation. title, in this context, is not a generic tooltip — many browsers insert its text directly into the native validation error message, so it should plainly describe the expected format.',
          },
          {
            q: 'Why might type="number" be the wrong choice for a field like a ZIP code or phone number?',
            a: 'type="number" treats the value as a true numeric quantity — it strips leading zeros (breaking a ZIP code like 02139), typically adds spinner UI that makes no sense for an identifier, and rejects any formatting characters. type="text" combined with a pattern attribute is usually the more correct choice for number-LOOKING identifiers that are not actually meant for arithmetic.',
          },
        ].map((item, i) => (
          <div key={i} style={{
            background: 'var(--surface)', border: '1px solid var(--border)',
            borderRadius: 12, padding: '24px 28px', marginBottom: 20,
          }}>
            <div style={{
              fontSize: 14, fontWeight: 800, color: 'var(--text)',
              marginBottom: 14, lineHeight: 1.4,
            }}>
              {item.q}
            </div>
            <div style={{ fontSize: 14, color: 'var(--muted)', lineHeight: 1.85 }}>
              {item.a}
            </div>
          </div>
        ))}
      </section>

      <Divider />

      {/* ── Common Mistakes ── */}
      <section style={{ marginBottom: 64 }} data-toc-kind="plain">
        <SectionTag text="// Common Mistakes" />
        <SectionTitle>Form Mistakes Beginners Make Constantly</SectionTitle>

        {[
          {
            q: 'Forgetting the name attribute on an input',
            a: 'The single most common cause of a form that silently submits incomplete data — the field renders and accepts input normally but is never included in what gets submitted.',
          },
          {
            q: 'Using placeholder instead of a real label',
            a: 'Placeholder text vanishes once the user starts typing and is not reliably treated as an accessible name by screen readers — always pair every input with a genuine <label>.',
          },
          {
            q: 'Reaching for type="number" on identifiers rather than true quantities',
            a: 'Leading zeros get silently stripped, and unwanted spinner arrows appear — use type="text" with a pattern attribute for ZIP codes, phone numbers, and similar number-shaped identifiers instead.',
          },
          {
            q: 'Assuming built-in browser validation is a complete security measure',
            a: 'It only runs in the context of an actual browser-rendered form — any direct request to the server-side endpoint bypasses it completely, so server-side validation of every value remains mandatory.',
          },
        ].map((item, i) => (
          <div key={i} style={{
            background: 'var(--surface)', border: '1px solid var(--border)',
            borderRadius: 12, padding: '24px 28px', marginBottom: 20,
          }}>
            <div style={{
              fontSize: 14, fontWeight: 800, color: 'var(--text)',
              marginBottom: 14, lineHeight: 1.4,
            }}>
              {item.q}
            </div>
            <div style={{ fontSize: 14, color: 'var(--muted)', lineHeight: 1.85 }}>
              {item.a}
            </div>
          </div>
        ))}
      </section>

      <Divider />

      {/* ── Error Library ── */}
      <section style={{ marginBottom: 64 }} data-toc-kind="plain">
        <SectionTag text="// Error Library" />
        <SectionTitle>Issues You Will Hit With Forms — And Exactly Why</SectionTitle>

        {[
          {
            error: `Please fill out this field. (native browser validation message)`,
            cause: 'A field marked required was left empty at the moment the user tried to submit the form — the browser blocked submission before it ever reached the server.',
            fix: 'This is expected, correct behaviour for a required field — no fix needed unless the field should genuinely not be required.',
          },
          {
            error: `Please match the requested format. (native browser validation message)`,
            cause: 'A field with a pattern attribute contains a value that does not match the supplied regular expression.',
            fix: 'Set a clear title attribute describing the expected format in plain language — many browsers show it directly in this error message.',
          },
          {
            error: `A form submission always reloads the whole page, even though the site otherwise feels app-like`,
            cause: 'The default, unmodified behaviour of an HTML form is a full page navigation to the URL in its action attribute — this is normal HTML, not a bug.',
            fix: 'Preventing this requires JavaScript (event.preventDefault() on the submit event) — out of scope for this HTML-focused module, but good to recognise as the expected default rather than a malfunction.',
          },
        ].map((item, i) => (
          <div key={i} style={{
            background: 'var(--bg2)', border: '1px solid var(--border)',
            borderRadius: 10, padding: '20px 24px', marginBottom: 16,
          }}>
            <div style={{
              fontFamily: 'var(--font-mono)', fontSize: 12,
              color: 'var(--red)', marginBottom: 12,
              background: 'rgba(255,71,87,0.08)', border: '1px solid rgba(255,71,87,0.2)',
              borderRadius: 6, padding: '8px 12px',
              lineHeight: 1.5,
            }}>
              {item.error}
            </div>
            <div style={{ marginBottom: 8 }}>
              <span style={{
                fontSize: 10, fontWeight: 700, color: 'var(--muted)',
                fontFamily: 'var(--font-mono)', letterSpacing: '.1em',
                textTransform: 'uppercase',
              }}>Cause: </span>
              <span style={{ fontSize: 13, color: 'var(--muted)', lineHeight: 1.7 }}>{item.cause}</span>
            </div>
            <div>
              <span style={{
                fontSize: 10, fontWeight: 700, color: 'var(--accent)',
                fontFamily: 'var(--font-mono)', letterSpacing: '.1em',
                textTransform: 'uppercase',
              }}>Fix: </span>
              <span style={{ fontSize: 13, color: 'var(--muted)', lineHeight: 1.7 }}>{item.fix}</span>
            </div>
          </div>
        ))}
      </section>

      {/* ── Key Takeaways ── */}
      <KeyTakeaways items={[
        'The name attribute is what makes an input\'s value get included in a form submission — omit it and the field is silently dropped, with no error shown anywhere.',
        'Input types are not cosmetic — they change the mobile keyboard, the native UI, and the built-in validation applied. type="number" is often the wrong choice for number-shaped identifiers like ZIP codes.',
        'A <label> creates a real programmatic association (via for/id or implicit wrapping) that expands the clickable area and is essential for screen readers — placeholder text is never a substitute.',
        'required/pattern/min/max are checked entirely by the browser before submission, with zero JavaScript — but they are bypassable via a direct request, so server-side validation remains mandatory.',
        'The title attribute on a pattern-constrained input often appears directly inside the browser\'s native validation error message, so write it as a plain-language format description.',
        ':valid/:invalid pseudo-classes let you style based on the browser\'s live constraint-validation state with no JavaScript event listeners required.',
      ]} />

      {/* ── Next Module CTA ── */}
      <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 10, padding: '24px', marginTop: 40 }}>
        <p style={{ fontSize: 10, color: 'var(--muted)', letterSpacing: '.12em', textTransform: 'uppercase', fontFamily: 'var(--font-mono)', fontWeight: 700, margin: '0 0 10px' }}>
          What comes next
        </p>
        <p style={{ fontSize: 15, color: 'var(--text)', lineHeight: 1.85, margin: '0 0 20px' }}>
          Module 09 goes further into forms — select, textarea, fieldset, radio and checkbox groups, and
          the details of how a form actually submits.
        </p>
        <Link href="/learn/html-css/forms-advanced" style={{ background: C, color: '#000', padding: '11px 24px', borderRadius: 7, fontWeight: 700, fontSize: 13, textDecoration: 'none', display: 'inline-block' }}>
          Module 09 → HTML Forms — Advanced
        </Link>
      </div>
    </LearnLayout>
  )
}
