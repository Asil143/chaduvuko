import type { Metadata } from 'next'
import { LearnLayout } from '@/components/content/LearnLayout'
import Link from 'next/link'
import { Callout } from '@/components/content/Callout'
import { KeyTakeaways } from '@/components/content/KeyTakeaways'

export const metadata: Metadata = {
  title: 'HTML Forms — Advanced | Chaduvuko',
  description:
    'select/option/optgroup, textarea, fieldset/legend, radio and checkbox groups, submit vs button, and exactly how a form submits by default — full page reload and all.',
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

export default function FormsAdvanced() {
  return (
    <LearnLayout
      title="HTML Forms — Advanced"
      description="select, textarea, fieldset/legend, radio and checkbox groups, and the form-submission details that trip up beginners."
      section="HTML & CSS — Module 09"
      readTime="40 min"
      updatedAt="August 2026"
    >

      {/* ── Part 01 ── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 01 — select, option, optgroup" />
        <SectionTitle>The select Element — Dropdowns Done Properly</SectionTitle>

        <Para>
          The previous module covered the common input types — text, email, checkbox, radio, and the
          rest. This module picks up where that one left off, with the form controls that need a little
          more structure: dropdowns, multi-line text, grouped fields, and the actual mechanics of what
          happens the instant a user clicks Submit. A <code>{'<select>'}</code> element renders a
          dropdown menu built from one or more <code>{'<option>'}</code> children. Every option needs a{' '}
          <code>value</code> attribute — that is what actually gets sent to the server, and it does not
          have to match the visible text between the tags.
        </Para>

        <CodeBox label="A basic select">{`<label for="country">Country</label>
<select id="country" name="country">
  <option value="">-- Choose a country --</option>
  <option value="us">United States</option>
  <option value="ca">Canada</option>
  <option value="mx">Mexico</option>
</select>`}</CodeBox>

        <Para>
          Notice the first option: <code>value=""</code> with placeholder-style text and no real
          country behind it. Without this, the browser silently pre-selects the first real option (
          <code>United States</code> here) the moment the page loads — meaning a user who never touches
          the dropdown submits a country they never chose. Adding an empty, disabled-looking placeholder
          option is the standard fix, and pairing it with the <code>required</code> attribute forces the
          user to make an actual choice before the form can submit.
        </Para>

        <CodeBox label="Forcing a real choice with required + a disabled placeholder">{`<select id="country" name="country" required>
  <option value="" disabled selected>-- Choose a country --</option>
  <option value="us">United States</option>
  <option value="ca">Canada</option>
</select>`}</CodeBox>

        <Para>
          <code>disabled</code> on that first option prevents the user from re-selecting it once they
          have picked something else, and <code>selected</code> makes it the one shown by default. Combined
          with <code>required</code>, the browser&apos;s built-in validation (covered in the previous
          module) refuses to submit the form while the placeholder is still selected.
        </Para>

        <Callout type="tip">
          The visible text of an <code>{'<option>'}</code> and its <code>value</code> attribute are
          completely independent. It is entirely normal — and often necessary — for the value to be a
          short machine-friendly code (<code>us</code>) while the text shown to the user is the full
          readable label (<code>United States</code>). Never rely on parsing the visible text on the
          server; always read the <code>value</code>.
        </Callout>

        <SubTitle>optgroup — grouping related options under a label</SubTitle>

        <Para>
          When a dropdown has many options that fall naturally into categories, <code>{'<optgroup>'}</code>{' '}
          wraps a set of <code>{'<option>'}</code> elements under a bold, non-selectable heading. This is
          purely visual organization — the <code>label</code> attribute on the group itself is never
          submitted, only the individual option values are.
        </Para>

        <CodeBox label="optgroup — categorizing a long list of options">{`<select id="timezone" name="timezone">
  <optgroup label="US &amp; Canada">
    <option value="America/New_York">Eastern Time</option>
    <option value="America/Chicago">Central Time</option>
    <option value="America/Denver">Mountain Time</option>
    <option value="America/Los_Angeles">Pacific Time</option>
  </optgroup>
  <optgroup label="Europe">
    <option value="Europe/London">London</option>
    <option value="Europe/Berlin">Berlin</option>
  </optgroup>
</select>`}</CodeBox>

        <SubTitle>The multiple attribute — selecting more than one option</SubTitle>

        <Para>
          Adding <code>multiple</code> to a <code>{'<select>'}</code> turns it from a dropdown into a
          scrollable list box where the user can select several options at once (typically by Ctrl/Cmd
          or Shift-clicking). Its submitted value is not a single value — it is every selected option,
          sent as repeated key/value pairs sharing the same field name.
        </Para>

        <CodeBox label="A multi-select list box">{`<label for="skills">Skills (select all that apply)</label>
<select id="skills" name="skills" multiple size="4">
  <option value="html">HTML</option>
  <option value="css">CSS</option>
  <option value="js">JavaScript</option>
  <option value="ts">TypeScript</option>
</select>
<!-- If a user selects HTML and CSS, the submitted data is effectively
     skills=html&skills=css — the server needs to read this as a list,
     not a single value. This is a common backend gotcha. -->`}</CodeBox>

        <Para>
          The <code>size</code> attribute here controls how many options are visible without scrolling —
          without it, a <code>multiple</code> select typically renders as a very short box showing only
          one or two rows, which most users never realize is scrollable at all. Setting an explicit{' '}
          <code>size</code> is close to mandatory whenever you use <code>multiple</code>.
        </Para>
      </section>

      <Divider />

      {/* ── Part 02 ── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 02 — textarea" />
        <SectionTitle>textarea — Multi-Line Text Input</SectionTitle>

        <Para>
          <code>{'<textarea>'}</code> is a multi-line free-text field — comments, bios, messages,
          anything longer than a single line makes sense as <code>{'<textarea>'}</code> rather than a
          text input. It has one detail that catches nearly everyone the first time: its default value
          is not set with a <code>value</code> attribute the way an input is. It is set as the element&apos;s
          text content, between the opening and closing tags.
        </Para>

        <CodeBox label="Setting a textarea's default value">{`<!-- WRONG — value is not a real attribute on textarea, it does nothing -->
<textarea name="bio" value="Tell us about yourself"></textarea>

<!-- RIGHT — the default text goes BETWEEN the tags -->
<textarea name="bio">Tell us about yourself</textarea>

<!-- For a genuine placeholder (grey hint text that disappears on typing,
     not real submitted content), use the placeholder attribute instead -->
<textarea name="bio" placeholder="Tell us about yourself"></textarea>`}</CodeBox>

        <Callout type="warning">
          <strong>These two are not interchangeable.</strong> Text placed between the tags is real,
          submitted content the moment the form is submitted, exactly like pre-filling a text input with{' '}
          <code>value</code>. A <code>placeholder</code> is only a visual hint — it is never submitted,
          and it disappears the instant the user starts typing. Confusing the two is a common source of
          forms that either submit unwanted default text the user never actually typed, or forms with no
          visible hint at all.
        </Callout>

        <SubTitle>Sizing a textarea — rows, cols, and resize</SubTitle>

        <Para>
          <code>rows</code> and <code>cols</code> set the textarea&apos;s initial size in character
          units — <code>rows</code> for visible lines, <code>cols</code> for character width. In real
          layouts, <code>cols</code> is almost always overridden by CSS <code>width</code>, since a
          character-based width does not respond to responsive layouts the way a percentage or{' '}
          <code>ch</code>-unit CSS value does.
        </Para>

        <CodeBox label="Sizing and controlling resize behavior">{`<textarea name="message" rows="6" cols="50"></textarea>

<style>
  textarea {
    width: 100%;
    max-width: 480px;
    resize: vertical; /* users can drag to make it taller, but not wider —
                          prevents them from breaking a fixed-width layout */
  }
</style>`}</CodeBox>

        <Para>
          Browsers give every <code>{'<textarea>'}</code> a draggable resize handle in the bottom-right
          corner by default (<code>resize: both</code>). Restricting it to <code>vertical</code> is a
          near-universal choice in real production forms — it lets users expand the box for a longer
          message without letting them drag it wide enough to break a card or column layout.
        </Para>

        <SubTitle>maxlength and a live character counter</SubTitle>

        <Para>
          Just like text inputs, <code>{'<textarea>'}</code> supports <code>maxlength</code> to cap how
          many characters the browser will allow the user to type. It does not, on its own, show the
          user how many characters remain — that display is a small piece of custom JavaScript layered
          on top, but the enforcement itself is entirely native and needs no script at all.
        </Para>

        <CodeBox label="maxlength enforces the limit; the counter is just UX polish">{`<textarea name="tweet" maxlength="280" id="tweet"></textarea>
<div id="counter">0 / 280</div>

<script>
  const textarea = document.getElementById('tweet');
  const counter = document.getElementById('counter');
  textarea.addEventListener('input', () => {
    counter.textContent = \`\${textarea.value.length} / 280\`;
  });
</script>`}</CodeBox>
      </section>

      <Divider />

      {/* ── Part 03 ── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 03 — fieldset and legend" />
        <SectionTitle>fieldset and legend — Grouping Related Fields</SectionTitle>

        <Para>
          <code>{'<fieldset>'}</code> wraps a group of related form controls in a visually and
          semantically distinct box, and <code>{'<legend>'}</code> gives that group a caption — the
          first child of the fieldset, rendered by browsers as a heading embedded right in the box&apos;s
          border. This is not just decoration. Screen readers announce the legend text before every
          control inside the fieldset, so a user tabbing through a long form hears which group of fields
          they have entered, not just the individual label of the field they are currently on.
        </Para>

        <CodeBox label="Grouping a shipping address">{`<fieldset>
  <legend>Shipping Address</legend>

  <label for="street">Street</label>
  <input type="text" id="street" name="street">

  <label for="city">City</label>
  <input type="text" id="city" name="city">

  <label for="zip">ZIP Code</label>
  <input type="text" id="zip" name="zip">
</fieldset>`}</CodeBox>

        <Para>
          A form with multiple logically distinct groups — shipping address vs billing address, personal
          info vs payment info — is a textbook use case, since without a fieldset boundary a screen
          reader user has no audible cue that they have crossed from one group into another; they simply
          hear one label after another with no structure at all.
        </Para>

        <CodeBox label="Two fieldsets distinguishing address groups">{`<form>
  <fieldset>
    <legend>Shipping Address</legend>
    <label for="ship-street">Street</label>
    <input type="text" id="ship-street" name="ship_street">
  </fieldset>

  <fieldset>
    <legend>Billing Address</legend>
    <label for="bill-street">Street</label>
    <input type="text" id="bill-street" name="bill_street">
  </fieldset>
</form>`}</CodeBox>

        <SubTitle>disabled on a fieldset — disabling every control inside it at once</SubTitle>

        <Para>
          A <code>disabled</code> attribute on the <code>{'<fieldset>'}</code> itself disables every
          form control nested inside it in one move, without needing to set <code>disabled</code>{' '}
          individually on each input. This is the standard pattern for "grey out this whole section
          until a checkbox above it is checked" style interactions.
        </Para>

        <CodeBox label="Disabling an entire group of fields at once">{`<label>
  <input type="checkbox" id="different-billing">
  Use a different billing address
</label>

<fieldset id="billing-fields" disabled>
  <legend>Billing Address</legend>
  <label for="bill-street">Street</label>
  <input type="text" id="bill-street" name="bill_street">
</fieldset>

<script>
  document.getElementById('different-billing').addEventListener('change', (e) => {
    document.getElementById('billing-fields').disabled = !e.target.checked;
  });
</script>`}</CodeBox>

        <Callout type="info">
          Every field disabled this way is also <strong>excluded from form submission entirely</strong> —
          not just visually greyed out, but genuinely absent from the submitted data, exactly like a
          plain <code>disabled</code> input. If you only want fields to look inactive but still submit
          their (possibly default) value, use <code>readonly</code> on the individual inputs instead of{' '}
          <code>disabled</code> on the fieldset.
        </Callout>
      </section>

      <Divider />

      {/* ── Part 04 ── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 04 — Radio Button Groups" />
        <SectionTitle>Radio Buttons — The Shared name Is What Makes Them a Group</SectionTitle>

        <Para>
          Radio buttons let a user pick exactly one option from a set. What actually makes a set of{' '}
          <code>{'<input type="radio">'}</code> elements behave as a single mutually-exclusive group is
          entirely the <code>name</code> attribute — every radio button that should belong to the same
          choice must share the exact same <code>name</code>. There is no wrapping element required for
          the grouping mechanism itself to work; the browser groups them purely by matching{' '}
          <code>name</code> strings.
        </Para>

        <CodeBox label="A radio group — three inputs, one shared name">{`<fieldset>
  <legend>Preferred contact method</legend>

  <label><input type="radio" name="contact" value="email" checked> Email</label>
  <label><input type="radio" name="contact" value="phone"> Phone</label>
  <label><input type="radio" name="contact" value="mail"> Mail</label>
</fieldset>

<!-- Selecting "Phone" automatically deselects "Email" — because
     they share name="contact", the browser enforces "only one checked". -->`}</CodeBox>

        <Callout type="warning">
          <strong>A typo in the shared name silently breaks the whole group.</strong> If one radio button
          in a set of four is accidentally given <code>name="contct"</code> instead of{' '}
          <code>name="contact"</code>, it becomes its own independent group of one — the user can now
          have it checked <em>at the same time</em> as one of the other three, which defeats the entire
          point of a radio group and is a genuinely easy bug to miss visually, since every radio button
          still looks and behaves normally in isolation.
        </Callout>

        <Para>
          Only the <code>value</code> of whichever radio in the group is currently checked gets
          submitted, under the shared <code>name</code> as the key — the unchecked ones in the group
          contribute nothing at all to the submitted data, exactly like an unchecked checkbox.
        </Para>

        <CodeBox label="What actually gets submitted">{`<!-- If "Phone" is selected when the form submits, the submitted data
     includes exactly one pair: contact=phone
     "email" and "mail" contribute nothing, since they are unchecked. -->`}</CodeBox>

        <SubTitle>checked as the default selection</SubTitle>

        <Para>
          Exactly one radio in a group should carry the <code>checked</code> attribute to establish a
          sensible default — leaving an entire required radio group with nothing pre-selected forces
          every user to make an active choice, which is sometimes exactly the intent (for genuinely
          neutral questions) but is often just an oversight that produces a form submitted with a field
          silently missing.
        </Para>
      </section>

      <Divider />

      {/* ── Part 05 ── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 05 — Checkbox Groups" />
        <SectionTitle>Checkbox Groups — Multiple Independent Selections</SectionTitle>

        <Para>
          Checkboxes look similar to radio buttons but solve a fundamentally different problem: letting a
          user select <strong>any number</strong> of options, from none to all of them, with each
          checkbox toggling independently. A "group" of checkboxes is a looser concept than a radio
          group — there is no browser-enforced exclusivity — but the standard pattern for letting
          several checkboxes contribute to one combined field on the server is to give them all the same{' '}
          <code>name</code>, written with trailing square brackets in many backend frameworks, and
          distinct <code>value</code>s.
        </Para>

        <CodeBox label="A checkbox group — any number can be checked">{`<fieldset>
  <legend>Which languages do you know?</legend>

  <label><input type="checkbox" name="languages" value="html" checked> HTML</label>
  <label><input type="checkbox" name="languages" value="css" checked> CSS</label>
  <label><input type="checkbox" name="languages" value="js"> JavaScript</label>
  <label><input type="checkbox" name="languages" value="py"> Python</label>
</fieldset>

<!-- With HTML and CSS checked, the submission includes two separate pairs:
     languages=html&languages=css
     Exactly like the multi-select from Part 01, the server must be
     prepared to receive a list under this one field name, not a scalar. -->`}</CodeBox>

        <Para>
          Unlike a radio group, giving every checkbox in a group the same <code>name</code> does{' '}
          <strong>not</strong> make them mutually exclusive — it only tells the server "these values all
          belong together, treat this field as a list." Each checkbox continues to toggle completely
          independently of the others.
        </Para>

        <SubTitle>A single standalone checkbox — boolean, not a group at all</SubTitle>

        <Para>
          A single checkbox with a unique <code>name</code> — "I agree to the Terms of Service," "Remember
          me" — behaves as a simple on/off flag. This is the case most beginners meet first, and it is
          worth being precise about what an unchecked checkbox actually submits: nothing at all. There is
          no <code>false</code> value sent to the server for an unchecked box — the field is simply
          absent from the submitted data entirely, which is a frequent source of confusion for anyone
          expecting a boolean <code>false</code> to arrive.
        </Para>

        <CodeBox label="An unchecked checkbox is absent, not false">{`<label>
  <input type="checkbox" name="newsletter" value="yes">
  Subscribe to our newsletter
</label>

<!-- Checked   → submitted data includes: newsletter=yes
     Unchecked → "newsletter" is not present in the submitted data at all.
     A backend that does request.get('newsletter', False) handles this correctly;
     one that expects request.get('newsletter') == 'false' will be wrong forever. -->`}</CodeBox>

        <Callout type="tip">
          A common, genuinely useful trick: pair a real checkbox with a hidden input of the same{' '}
          <code>name</code> placed <em>before</em> it in the HTML, set to a "false" value. Since a form
          submits the <em>last</em> value for a duplicate field name in most server frameworks, an
          unchecked box falls back to the hidden input&apos;s value instead of vanishing entirely — a
          pattern you will see in frameworks like Django and Rails' generated form HTML.
        </Callout>
      </section>

      <Divider />

      {/* ── Part 06 ── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 06 — submit vs button" />
        <SectionTitle>type=&quot;submit&quot; vs type=&quot;button&quot; — Two Very Different Buttons</SectionTitle>

        <Para>
          <code>{'<button>'}</code> and <code>{'<input type="button">'}</code> both render a clickable
          button, but the <code>type</code> attribute on a <code>{'<button>'}</code> element — often
          forgotten — controls something that matters a great deal inside a form: whether clicking it
          submits the form or not.
        </Para>

        <CodeBox label="The three button types">{`<button type="submit">Save</button>
<!-- The default if "type" is omitted entirely — submits the enclosing form -->

<button>Save</button>
<!-- Identical to type="submit" — a bare <button> with no type attribute
     defaults to submit, which surprises a lot of people -->

<button type="button">Cancel</button>
<!-- Does nothing on its own. It only does something if JavaScript
     attaches a click handler to it. -->

<button type="reset">Reset</button>
<!-- Clears every field in the form back to its initial values -->`}</CodeBox>

        <Callout type="warning">
          <strong>An unspecified type defaults to submit — a genuinely common bug source.</strong> A{' '}
          <code>{'<button>'}</code> placed inside a form for something unrelated to submitting — opening
          a modal, toggling a dropdown, incrementing a counter — will silently submit the entire form on
          click if you forget <code>type="button"</code>. This is one of the single most common real
          bugs in forms built with any modern JS framework, where a "+1" or "show more" button inside a
          form element unexpectedly reloads the page. Always be explicit about a button&apos;s{' '}
          <code>type</code> when it lives inside a <code>{'<form>'}</code>.
        </Callout>

        <Para>
          <code>{'<input type="button">'}</code> is the older, input-element equivalent of{' '}
          <code>{'<button type="button">'}</code> — functionally similar, but <code>{'<button>'}</code>{' '}
          is generally preferred in modern markup because it can contain rich content (an icon plus text,
          nested spans for styling) rather than being limited to a single <code>value</code> string as
          its label.
        </Para>
      </section>

      <Divider />

      {/* ── Part 07 ── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 07 — Default Submission Behavior" />
        <SectionTitle>What Actually Happens When a Form Submits — By Default</SectionTitle>

        <Para>
          It is worth being completely explicit about a form&apos;s default behavior, because every
          later JavaScript-driven form pattern is defined in terms of overriding it. With no{' '}
          <code>method</code> attribute specified, a <code>{'<form>'}</code> submits using{' '}
          <strong>GET</strong>. A GET submission takes every field&apos;s name and value, encodes them
          as a query string, appends that query string to the form&apos;s <code>action</code> URL, and
          navigates the browser there — exactly as if the user had typed that full URL into the address
          bar themselves.
        </Para>

        <CodeBox label="A default GET form and exactly what URL it navigates to">{`<form action="/search">
  <input type="text" name="q" value="html forms">
  <input type="submit" value="Search">
</form>

<!-- Clicking Search navigates the browser to:
     /search?q=html+forms
     Spaces become "+" (or %20), and the whole thing is a normal
     browser navigation — a full page load, exactly like clicking a link. -->`}</CodeBox>

        <Para>
          This full-page navigation is the critical detail: submitting a plain HTML form, with no
          JavaScript involved at all, reloads the entire page. Every script variable resets, every
          in-memory state is wiped, and the browser fetches a brand-new HTML document from the server.
          This is not a bug or a legacy quirk — it is the form&apos;s actual designed behavior, and it
          predates JavaScript entirely; forms worked this way when the only thing capable of processing
          them was a server.
        </Para>

        <SubTitle>method=&quot;post&quot; — sending data in the request body instead</SubTitle>

        <Para>
          Setting <code>method="post"</code> changes where the data travels: instead of being appended
          to the URL as a query string, it is sent in the HTTP request body, invisible in the address
          bar and not subject to a URL&apos;s length limits. POST is the standard choice for anything
          that changes data on the server — creating an account, submitting a payment, posting a
          comment — while GET remains appropriate for idempotent actions like a search that a user
          might reasonably want to bookmark or share as a link.
        </Para>

        <CodeBox label="POST — data travels in the request body, not the URL">{`<form action="/login" method="post">
  <input type="text" name="username">
  <input type="password" name="password">
  <input type="submit" value="Log In">
</form>

<!-- The browser still navigates to /login on submit — this is STILL
     a full page reload — but the username and password are never
     visible in the URL, browser history, or server access logs. -->`}</CodeBox>

        <Callout type="warning">
          <strong>Never submit a login form, or any form containing a password, with GET.</strong> A GET
          submission puts every field&apos;s value directly into the URL — which means it ends up in the
          browser&apos;s history, in server access logs, and potentially in a shared screen or a copied
          link. This is a genuinely common security mistake, not just a style preference.
        </Callout>
      </section>

      <Divider />

      {/* ── Part 08 ── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 08 — A Brief preventDefault() Preview" />
        <SectionTitle>Stopping the Default Reload — A Preview, Not the Full Story</SectionTitle>

        <Para>
          Full JavaScript form handling is out of scope for this HTML-focused track and gets proper
          coverage later, but it is worth previewing the one line that every JS-driven form eventually
          reaches for, since it directly answers "how do single-page apps avoid the full reload just
          described?" A form&apos;s <code>submit</code> event can be intercepted in JavaScript, and
          calling <code>event.preventDefault()</code> on it stops the browser from performing its
          default GET/POST navigation entirely.
        </Para>

        <CodeBox label="Intercepting a submit and preventing the default page reload">{`<form id="contact-form" action="/contact" method="post">
  <input type="text" name="message">
  <button type="submit">Send</button>
</form>

<script>
  document.getElementById('contact-form').addEventListener('submit', (event) => {
    event.preventDefault();  // stops the browser's built-in reload/navigation
    console.log('Form intercepted — no page reload happened.');
    // A real implementation would send the data with fetch() here instead.
  });
</script>`}</CodeBox>

        <Para>
          Without that one line, the browser proceeds with its default GET-or-POST navigation exactly as
          described in Part 07, regardless of anything else the JavaScript handler does — the default
          behavior and any custom JavaScript behavior run independently unless explicitly stopped. This
          is precisely why forms built with React, Vue, or any similar framework almost always begin
          their submit handler with this exact call, before doing anything else with the form&apos;s
          data.
        </Para>

        <Callout type="info">
          This module deliberately stops at the concept, not the full implementation — reading form
          values in JavaScript, sending them with <code>fetch()</code>, and handling the server&apos;s
          response are genuinely a separate, larger topic that belongs to JavaScript fundamentals rather
          than this HTML track. What matters here is understanding precisely what default behavior is
          being overridden, and why every interactive form you will build professionally needs to
          override it deliberately rather than by accident.
        </Callout>
      </section>

      <Divider />

      {/* ── Part 09 — Real World ── */}
      <section style={{ marginBottom: 64 }} data-toc-kind="story">
        <SectionTag text="// Part 09 — Real World" />
        <div style={{
          fontSize: 10, fontWeight: 700, letterSpacing: '.12em',
          textTransform: 'uppercase', color: 'var(--muted)', marginBottom: 12,
          fontFamily: 'var(--font-mono)',
        }}>
          💼 What This Looks Like at Work
        </div>
        <SectionTitle>A Checkout Bug at a Seattle Furniture Retailer</SectionTitle>

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
            Scenario — E-commerce, Seattle · Production bug report
          </div>

          <Para>
            A furniture retailer&apos;s checkout page has a "Gift wrap this order?" checkbox and a
            shipping-preference radio group. Customer support starts getting complaints: customers who
            leave gift wrap unchecked are sometimes still being charged the gift-wrap fee, and a handful
            of orders are shipping with the wrong delivery speed even though the customer swears they
            selected "Standard."
          </Para>

          <CodeBox label="The checkout form's markup, as shipped">{`<label>
  <input type="checkbox" name="gift_wrap" value="true">
  Gift wrap this order (+$4.99)
</label>

<fieldset>
  <legend>Shipping speed</legend>
  <label><input type="radio" name="shiping_speed" value="standard" checked> Standard (5-7 days)</label>
  <label><input type="radio" name="shipping_speed" value="express"> Express (2 days)</label>
  <label><input type="radio" name="shipping_speed" value="overnight"> Overnight</label>
</fieldset>`}</CodeBox>

          <SubSubTitle>What the engineer finds</SubSubTitle>

          <Para>
            Two separate bugs, each traceable directly to earlier parts of this module. First, the
            backend&apos;s order-processing code checks{' '}
            <code>{`if request.form.get('gift_wrap') == 'true'`}</code> — but per Part 05, an{' '}
            <em>unchecked</em> checkbox is never submitted at all, so that comparison is actually never
            the source of a false positive from an unchecked box. The real cause turns out to be a
            client-side JavaScript bug elsewhere that was re-checking the box after a price-estimate
            AJAX call — unrelated to the HTML itself, but only found by first ruling out the HTML/backend
            contract, exactly the reasoning this module trains. Second, and this one is a pure markup
            bug: the first radio input has <code>name="shiping_speed"</code> — missing the second
            "p" — while the other two correctly say <code>shipping_speed</code>. Exactly the typo
            warned about in Part 04: "Standard" is its own one-member group, so it can be checked{' '}
            <em>simultaneously</em> with "Express" or "Overnight," and whichever value the backend reads
            last determines the actual shipping speed used — explaining the seemingly random wrong
            deliveries.
          </Para>

          <CodeBox label="The fix — a consistent name across the whole group">{`<fieldset>
  <legend>Shipping speed</legend>
  <label><input type="radio" name="shipping_speed" value="standard" checked> Standard (5-7 days)</label>
  <label><input type="radio" name="shipping_speed" value="express"> Express (2 days)</label>
  <label><input type="radio" name="shipping_speed" value="overnight"> Overnight</label>
</fieldset>`}</CodeBox>

          <Para>
            The engineer adds a lint rule to the team&apos;s CI pipeline that flags any radio group whose{' '}
            <code>name</code> values are not all byte-for-byte identical — a cheap, mechanical check for
            exactly the class of typo that took a support team days to notice from behavior alone.
          </Para>
        </div>
      </section>

      <Divider />

      {/* ── Part 10 — Misconceptions ── */}
      <section style={{ marginBottom: 64 }} data-toc-kind="myth">
        <SectionTag text="// Part 10 — Misconceptions" />
        <SectionTitle>Four Misconceptions About Advanced Forms</SectionTitle>

        {[
          {
            wrong: '"An unchecked checkbox submits as false"',
            right: 'It submits nothing at all — the field is simply absent from the submitted data. A backend expecting a literal "false" string or boolean will never see one; it must treat a missing field as the unchecked case.',
          },
          {
            wrong: '"Giving several checkboxes the same name makes them mutually exclusive, like radio buttons"',
            right: 'A shared name on checkboxes only tells the server these values belong to one list-shaped field. Each checkbox still toggles completely independently — exclusivity is a radio-button-only behavior, driven by the same name mechanism but with entirely different semantics.',
          },
          {
            wrong: "\"A button inside a form needs type='submit' to submit the form\"",
            right: 'The opposite is true — type="submit" is already the default. A bare <button> with no type attribute at all submits the form, which is precisely why every non-submitting button inside a form (a toggle, a stepper, an icon button) needs an explicit type="button" to avoid accidentally submitting.',
          },
          {
            wrong: '"Forms always reload the page unless you use React or a similar framework"',
            right: 'The full-page reload is the plain HTML/HTTP default, older than JavaScript itself. Any form, in any framework or none at all, can prevent it with a single line — event.preventDefault() inside a submit handler — which is what every framework\'s form-handling code does under the hood.',
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
              ✕ &quot;{item.wrong}&quot;
            </div>
            <div style={{ fontSize: 14, color: 'var(--muted)', lineHeight: 1.7 }}>
              {item.right}
            </div>
          </div>
        ))}
      </section>

      <Divider />

      {/* ── Part 11 — Interview Prep ── */}
      <section style={{ marginBottom: 64 }} data-toc-kind="prep">
        <SectionTag text="// Part 11 — Interview Prep" />
        <SectionTitle>6 Interview Questions — With Complete Answers</SectionTitle>

        {[
          {
            q: 'What makes a group of radio buttons behave as mutually exclusive — is it the fieldset, or something else?',
            a: 'The shared name attribute is the entire mechanism. Every radio input sharing the exact same name string is treated by the browser as one group where only one member can be checked at a time. A fieldset is optional and purely for visual/semantic grouping — it plays no role in the mutual-exclusivity behavior itself. A typo that makes one name differ from the rest silently creates a second, independent one-member group.',
          },
          {
            q: 'What does an unchecked checkbox submit, and why does this trip people up?',
            a: 'It submits nothing — the field is entirely absent from the form data, not present with a false value. This trips people up because most programming languages treat a checkbox-like control as a boolean with two states, but HTML forms only ever report the checked state explicitly; a backend must interpret "field absent" as the unchecked case itself, commonly by using a default value when reading the field.',
          },
          {
            q: 'What is the actual difference between value set as an attribute and text placed between <textarea> tags?',
            a: 'A <textarea> has no value attribute at all — its default content must be placed as text between its opening and closing tags. This differs from every other form control, which use a value attribute. Confusing the two is common because most other inputs do use a value attribute, making textarea the one clear exception.',
          },
          {
            q: 'By default, does a form submit with GET or POST, and what actually happens to the data with each?',
            a: 'GET is the default when no method attribute is specified. With GET, every field is encoded as a query string appended to the action URL, and the browser navigates there — visible in the address bar, browser history, and server logs. POST instead sends the data in the HTTP request body, invisible in the URL. POST is required for anything sensitive (passwords, payment data) and generally preferred for anything that changes server state.',
          },
          {
            q: 'Why does a <button> with no type attribute submit the form, and how does this cause real bugs?',
            a: 'type="submit" is the implicit default for a <button> element inside a form. Any button meant for something else entirely — opening a modal, incrementing a counter, toggling a panel — will submit and reload the page unless it explicitly carries type="button". This is a very common real bug in forms with several buttons, where only one is meant to submit.',
          },
          {
            q: 'What does event.preventDefault() actually stop, in the context of a form submit handler?',
            a: 'It stops the browser\'s built-in default action for that event — for a submit event, that default action is exactly the GET/POST navigation and full page reload described earlier in this module. It does not stop any other JavaScript from running; a handler can call preventDefault() and then, separately, send the data with fetch() or another AJAX mechanism to achieve the same end result without a page reload.',
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
        <SectionTitle>Advanced Form Mistakes Beginners Make Constantly</SectionTitle>

        {[
          {
            q: 'Setting value on a textarea, expecting it to work like an input',
            a: 'value has no effect on a textarea. Broken: <textarea value="Hello"></textarea>. Fixed: <textarea>Hello</textarea> — the default text goes between the tags, not in an attribute.',
          },
          {
            q: 'Forgetting type="button" on a non-submitting button inside a form',
            a: 'Broken: <button onclick="doThing()">Do Thing</button> inside a <form> — this submits the form on click, in addition to running the handler. Fixed: <button type="button" onclick="doThing()">Do Thing</button> — now it only runs the handler.',
          },
          {
            q: 'A typo in a shared radio name, silently breaking the group',
            a: 'Broken: two radios with name="plan" and one with name="pian" (typo) — the third becomes its own group and can be checked alongside one of the others. Fixed: audit every radio in a group by eye, or better, use a linter/CI check that flags radio groups with inconsistent name values.',
          },
          {
            q: 'Assuming a select always has something selected',
            a: 'Broken: a select with no placeholder option submits whatever the first real option happens to be, even if the user never touched the dropdown, silently recording a choice nobody made. Fixed: add a disabled, selected placeholder option with value="" and mark the select required so the browser blocks submission until a real choice is made.',
          },
          {
            q: 'Reading a multiple select or a checkbox group as a single value on the backend',
            a: 'Broken backend code that does request.form.get(\'skills\') for a multi-select or checkbox group only ever gets one of the selected values (usually the last), silently dropping the rest. Fixed: use the framework\'s list-reading method (e.g. request.form.getlist(\'skills\') in Flask) whenever the field name can appear more than once in the submission.',
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
        <SectionTitle>Errors and Rendering Bugs You Will Hit With Forms</SectionTitle>

        {[
          {
            error: `Form submits and reloads the page even though a JavaScript handler is attached`,
            cause: 'The submit event handler does not call event.preventDefault(), so the browser proceeds with its default GET/POST navigation regardless of what the handler does. This is not an error in the console — it is a silent behavioral bug.',
            fix: 'Add event.preventDefault() as the first line inside the submit event handler, before any other logic runs.',
          },
          {
            error: `A field the user clearly filled in is missing from the submitted data`,
            cause: 'Almost always a disabled attribute left on the input (disabled fields are entirely excluded from submission, unlike readonly ones), or the input is outside the <form> tags entirely — a form only submits controls that are its actual descendants (or linked via the form="id" attribute).',
            fix: 'Confirm the field does not have disabled set, and confirm it is nested inside the <form> element or explicitly linked to it with the form attribute referencing the form\'s id.',
          },
          {
            error: `Only one value comes through on the backend for a field that should be a list`,
            cause: 'A multi-select or checkbox group submits multiple values under one shared field name, but the backend code is reading it with a single-value accessor, which typically returns only the first or last matching value.',
            fix: 'Use the framework\'s explicit list-reading method for that field — e.g. request.form.getlist() in Flask, request.args.getlist() for query strings, or the equivalent in your backend framework.',
          },
          {
            error: `Radio buttons in the "same" group can somehow all be unchecked, or two appear checked at once`,
            cause: 'A name mismatch — a typo in one radio\'s name attribute silently splits it into its own one-member group, which can be independently checked or unchecked alongside the "real" group.',
            fix: 'Inspect every radio input\'s name attribute for an exact character-for-character match. Consider adding an automated lint check for this in CI, since it is invisible in the rendered page.',
          },
          {
            error: `A required <select> lets the form submit even though nothing meaningful was chosen`,
            cause: 'The first <option> has no explicit empty value and is not marked disabled, so it counts as a valid, non-empty selection by default — the browser sees "something is selected" and considers the required constraint satisfied.',
            fix: 'Add a leading option with value="" (optionally disabled and selected) as the placeholder — required only blocks submission while the CURRENTLY selected option has an empty value.',
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
        'select/option values are independent of their visible text — always read value on the server, never the displayed label. optgroup organizes long option lists but never contributes to submitted data itself.',
        'A textarea\'s default value is set as text content between its tags, not as a value attribute — the one form control where this differs from every other input type.',
        'fieldset + legend groups related controls visually and, critically, for screen readers, which announce the legend before each control inside the group.',
        'A radio group\'s mutual exclusivity is created entirely by every input sharing the identical name attribute — there is no other mechanism, and a typo silently breaks it.',
        'An unchecked checkbox is absent from submitted data, not false. A checked checkbox group with a shared name submits multiple values under one field name, which the backend must read as a list.',
        'A <button> with no explicit type defaults to type="submit" — every non-submitting button inside a form needs type="button" or it will submit and reload the page.',
        'A form with no method attribute submits with GET by default — data becomes a URL query string and the browser fully navigates/reloads. POST sends data in the request body instead, required for anything sensitive.',
        'event.preventDefault() inside a submit handler stops the browser\'s default GET/POST navigation, which is the foundation every JavaScript-driven form (including every modern framework) builds on.',
      ]} />

      {/* ── Next Module CTA ── */}
      <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 10, padding: '24px', marginTop: 40 }}>
        <p style={{ fontSize: 10, color: 'var(--muted)', letterSpacing: '.12em', textTransform: 'uppercase', fontFamily: 'var(--font-mono)', fontWeight: 700, margin: '0 0 10px' }}>
          What comes next
        </p>
        <p style={{ fontSize: 15, color: 'var(--text)', lineHeight: 1.85, margin: '0 0 20px' }}>
          Module 10 steps back from forms specifically to the accessibility principles that every form,
          and every page, depends on — why semantic HTML matters beyond convenience, basic ARIA, and how
          to write alt text that actually helps a real screen reader user.
        </p>
        <Link href="/learn/html-css/semantic-html-accessibility-basics" style={{ background: C, color: '#000', padding: '11px 24px', borderRadius: 7, fontWeight: 700, fontSize: 13, textDecoration: 'none', display: 'inline-block' }}>
          Module 10 → Semantic HTML & Accessibility Basics
        </Link>
      </div>
    </LearnLayout>
  )
}
