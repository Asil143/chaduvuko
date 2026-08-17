import type { Metadata } from 'next'
import { LearnLayout } from '@/components/content/LearnLayout'
import Link from 'next/link'
import { Callout } from '@/components/content/Callout'
import { KeyTakeaways } from '@/components/content/KeyTakeaways'

export const metadata: Metadata = {
  title: 'HTML5 APIs Overview | Chaduvuko',
  description:
    'data-* custom attributes and the dataset property, the contenteditable attribute, and the native HTML5 drag-and-drop API — a survey of the browser features beyond plain markup.',
}

const C = '#7b61ff'

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

export default function Html5ApisOverview() {
  return (
    <LearnLayout
      title="HTML5 APIs Overview"
      description="data-* attributes, contenteditable, and the drag-and-drop API — the browser features beyond plain markup."
      section="HTML & CSS — Module 11"
      readTime="30 min"
      updatedAt="August 2026"
    >

      {/* ── Part 01 ── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 01 — data-* Custom Attributes" />
        <SectionTitle>data-* Attributes — Attaching Your Own Data to an Element</SectionTitle>

        <Para>
          Everything covered so far in this track has used HTML&apos;s built-in attributes —{' '}
          <code>href</code>, <code>src</code>, <code>type</code>, and the rest, each with meaning the
          browser itself understands. HTML5 also standardized a way to attach{' '}
          <strong>your own</strong> attributes, with names you invent, specifically so JavaScript can
          read them later. Any attribute prefixed with <code>data-</code> is guaranteed valid HTML,
          ignored entirely by the browser&apos;s own rendering, and reserved exclusively for this
          purpose — attaching arbitrary data to an element that only your own code cares about.
        </Para>

        <CodeBox label="Attaching custom data to elements">{`<button data-product-id="4471" data-in-stock="true">
  Add to Cart
</button>

<li data-user-id="882" data-role="admin" class="user-row">
  Maria Chen
</li>

<div data-tooltip="Click to expand" data-expanded="false">
  Section Header
</div>`}</CodeBox>

        <Para>
          A <code>data-*</code> attribute name can be almost anything you choose, following one
          specific naming rule worth knowing up front: it must be all lowercase, and any word boundary
          is written with a hyphen — <code>data-product-id</code>, not <code>data-productId</code>. This
          rule exists because of exactly how the attribute gets translated into a JavaScript property
          name, covered in the next part.
        </Para>

        <Callout type="info">
          <strong>Why not just use a regular class or a made-up non-<code>data-</code> attribute
          instead?</strong> A plain made-up attribute like <code>product-id="4471"</code> (without the{' '}
          <code>data-</code> prefix) technically renders fine in every modern browser, but it is not
          valid HTML and will fail HTML validation, may collide with a genuine future HTML attribute of
          the same name, and is not guaranteed stable across browser versions. <code>data-*</code> is the
          only officially reserved, permanently safe namespace for exactly this purpose.
        </Callout>
      </section>

      <Divider />

      {/* ── Part 02 ── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 02 — Reading data-* via dataset" />
        <SectionTitle>The dataset Property — Reading Custom Attributes in JavaScript</SectionTitle>

        <Para>
          Every DOM element exposes its <code>data-*</code> attributes through a single JavaScript
          property called <code>dataset</code> — an object where each key is the attribute name with its{' '}
          <code>data-</code> prefix stripped and converted from hyphen-case to camelCase automatically by
          the browser.
        </Para>

        <CodeBox label="Reading data-* attributes with dataset">{`<button id="add-btn" data-product-id="4471" data-in-stock="true">
  Add to Cart
</button>

<script>
  const btn = document.getElementById('add-btn');

  console.log(btn.dataset.productId);  // "4471"
  console.log(btn.dataset.inStock);    // "true"

  // Note: data-product-id  → dataset.productId
  //       data-in-stock    → dataset.inStock
  // The hyphen is removed and the following letter is capitalized —
  // exactly the same convention JavaScript already uses for
  // multi-word property names.
</script>`}</CodeBox>

        <Callout type="warning">
          <strong>Every value read from dataset is always a string</strong> — even{' '}
          <code>data-in-stock="true"</code> comes back as the string <code>"true"</code>, not the
          boolean <code>true</code>, and <code>data-product-id="4471"</code> comes back as the string{' '}
          <code>"4471"</code>, not the number <code>4471</code>. Comparing a dataset value directly
          against a boolean or number without converting it first (<code>Number(...)</code>, or a strict
          string comparison) is a common source of bugs — <code>if (btn.dataset.inStock)</code> is{' '}
          <em>always truthy</em>, even when the value is literally the string <code>"false"</code>,
          because any non-empty string is truthy in JavaScript.
        </Callout>

        <CodeBox label="The truthy-string bug in practice, and the fix">{`<div data-visible="false"></div>

<script>
  const el = document.querySelector('div');

  if (el.dataset.visible) {
    console.log('This runs — even though the data says "false"!');
    // "false" is a non-empty string, so it is truthy.
  }

  // The fix — an explicit string comparison
  if (el.dataset.visible === 'true') {
    console.log('This correctly does NOT run.');
  }
</script>`}</CodeBox>

        <SubTitle>Writing to dataset — the same mechanism, in reverse</SubTitle>

        <Para>
          <code>dataset</code> is not read-only — assigning to it writes a new{' '}
          <code>data-*</code> attribute back onto the actual DOM element, visible if you inspect the
          element in DevTools, and the same camelCase-to-hyphen conversion happens automatically in
          reverse.
        </Para>

        <CodeBox label="Writing custom data back onto an element">{`el.dataset.expanded = 'true';
// Sets the actual HTML attribute to: data-expanded="true"

el.dataset.itemCount = '12';
// Sets: data-item-count="12"`}</CodeBox>

        <Para>
          This read/write pair — <code>data-*</code> attributes in the markup, <code>dataset</code> in
          JavaScript — is genuinely one of the most common patterns in real front-end code for tracking
          per-element state directly in the DOM itself, without a separate JavaScript data structure kept
          in sync with what is on screen, and it also plays a starring role in CSS selectors (Part 03)
          and in the drag-and-drop pattern covered later in this module (Part 08).
        </Para>
      </section>

      <Divider />

      {/* ── Part 03 ── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 03 — data-* With CSS" />
        <SectionTitle>Using data-* Attributes as CSS Hooks</SectionTitle>

        <Para>
          <code>data-*</code> attributes are not only readable from JavaScript — CSS attribute selectors
          can target them directly, which makes them a genuinely common way to drive visual state (an
          expanded panel, a selected tab, an active step in a wizard) without adding or removing CSS
          classes at all.
        </Para>

        <CodeBox label="Styling based on a data-* attribute's value">{`<div class="panel" data-state="collapsed">...</div>

<style>
  .panel[data-state="collapsed"] {
    max-height: 0;
    overflow: hidden;
  }
  .panel[data-state="expanded"] {
    max-height: 500px;
  }
</style>

<script>
  document.querySelector('.panel').dataset.state = 'expanded';
  // Toggling ONE attribute value drives the entire visual state change —
  // no separate CSS classes to add and remove in sync with each other.
</script>`}</CodeBox>

        <Para>
          This pattern scales cleanly to more than two states — a <code>data-step</code> attribute
          holding <code>"1"</code>, <code>"2"</code>, or <code>"3"</code> on a multi-step form wizard, for
          instance, can drive entirely different CSS per step through <code>{'[data-step="2"] .field-b { display: block; }'}</code>{' '}
          style selectors, keeping the "what state is this component in" logic in exactly one place
          rather than scattered across several toggled class names.
        </Para>
      </section>

      <Divider />

      {/* ── Part 04 ── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 04 — contenteditable" />
        <SectionTitle>contenteditable — Turning Any Element Into an Editable Field</SectionTitle>

        <Para>
          The <code>contenteditable</code> attribute, set on essentially any element, makes its content
          directly editable by the user in the browser itself — no <code>{'<input>'}</code> or{' '}
          <code>{'<textarea>'}</code> involved. The browser handles the cursor, text selection, typing,
          and even basic rich-text behavior (Enter creating new paragraphs, for example) entirely on its
          own.
        </Para>

        <CodeBox label="A directly editable element">{`<div contenteditable="true">
  This text can be clicked into and edited directly, right in the page.
</div>

<h2 contenteditable="true">Click this heading to rename it</h2>`}</CodeBox>

        <Para>
          This is genuinely how a large share of real "inline editing" interfaces work — a document
          title you click to rename in place, a rich-text comment box, or a simplified content editor
          embedded in an admin dashboard, all commonly built directly on <code>contenteditable</code>{' '}
          rather than a heavier third-party rich-text library, at least for simpler cases.
        </Para>

        <SubTitle>Reading the edited content back out</SubTitle>

        <Para>
          <code>contenteditable</code> only makes the content editable in the browser&apos;s UI — it does
          nothing on its own to save that content anywhere. Reading the current state back out for
          saving requires JavaScript, most commonly via <code>innerText</code> or{' '}
          <code>innerHTML</code>, listening for the <code>input</code> event as the user types.
        </Para>

        <CodeBox label="Capturing edits as they happen">{`<div contenteditable="true" id="title">Untitled Document</div>

<script>
  const title = document.getElementById('title');

  title.addEventListener('input', () => {
    console.log('Current content:', title.innerText);
    // In a real app, this is where you'd debounce and send an
    // autosave request to the server.
  });
</script>`}</CodeBox>

        <Callout type="warning">
          <strong>innerHTML on a contenteditable element can contain messy, browser-inconsistent
          markup.</strong> Different browsers insert slightly different tags for the same user action —
          pressing Enter, for instance, might produce a new{' '}
          <code>{'<div>'}</code> in one browser and a <code>{'<p>'}</code> or a <code>{'<br>'}</code> in
          another. Production rich-text editors (like ones built on top of ContentEditable, e.g. many
          WYSIWYG libraries) do substantial normalization work specifically to paper over this
          inconsistency — it is one of the real reasons teams reach for an established library rather
          than hand-rolling a full rich-text editor directly on raw <code>contenteditable</code>.
        </Callout>
      </section>

      <Divider />

      {/* ── Part 05 ── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 05 — contenteditable Gotchas" />
        <SectionTitle>contenteditable Gotchas — And When to Reach for Something Else</SectionTitle>

        <Para>
          <code>contenteditable</code> is genuinely useful for small, contained pieces of editable
          content, but it has real limitations worth knowing before reaching for it as a default choice
          over a plain form control.
        </Para>

        <CodeBox label="What contenteditable does NOT give you for free">{`<!-- No built-in form submission — contenteditable content is not
     automatically included when a <form> submits, unlike a real input -->
<form>
  <div contenteditable="true">This will NOT be sent on submit</div>
  <button type="submit">Submit</button>
</form>

<!-- No built-in validation — required, maxlength, and pattern
     simply do not apply to a contenteditable div at all -->
<div contenteditable="true" required></div>
<!-- "required" here has no effect whatsoever -->`}</CodeBox>

        <Para>
          Because <code>contenteditable</code> content is not a real form field, it is entirely excluded
          from a form&apos;s natural submission — none of the built-in validation attributes covered in
          the two Forms modules apply to it, since those are input-element-specific. Any real
          persistence has to be handled manually with JavaScript, typically by copying the current
          content into a hidden <code>{'<input>'}</code> right before submission, or sending it directly
          with a fetch request.
        </Para>

        <CodeBox label="Bridging contenteditable content into a real form submission">{`<form id="post-form">
  <div contenteditable="true" id="post-body"></div>
  <input type="hidden" name="body" id="hidden-body">
  <button type="submit">Publish</button>
</form>

<script>
  document.getElementById('post-form').addEventListener('submit', () => {
    // Copy the editable content into the hidden input just before
    // submission, so it actually gets included in the form data.
    document.getElementById('hidden-body').value =
      document.getElementById('post-body').innerHTML;
  });
</script>`}</CodeBox>

        <Callout type="tip">
          <strong>A useful rule of thumb:</strong> if the content you need to capture is genuinely
          simple plain text, a real <code>{'<input>'}</code> or <code>{'<textarea>'}</code> is almost
          always the better choice — you get built-in form submission, validation, and correct mobile
          keyboard behavior for free. Reach for <code>contenteditable</code> specifically when you need
          rich formatting (bold, links, headings) inline in the page itself, which a plain textarea
          cannot express at all.
        </Callout>
      </section>

      <Divider />

      {/* ── Part 06 ── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 06 — Drag-and-Drop Basics" />
        <SectionTitle>Native Drag-and-Drop — The draggable Attribute</SectionTitle>

        <Para>
          HTML5 standardized a native drag-and-drop API, built into the browser itself, requiring no
          external library for basic use cases. The starting point is a single attribute:{' '}
          <code>draggable="true"</code>, placed on any element you want a user to be able to pick up and
          drag with the mouse.
        </Para>

        <CodeBox label="Making an element draggable">{`<div class="card" draggable="true" id="card-1">
  Task: Write Q3 report
</div>`}</CodeBox>

        <Para>
          On its own, <code>draggable="true"</code> lets the browser visually pick the element up on
          mouse-down and follow the cursor — but it does nothing beyond that visual behavior by itself.
          Making drag-and-drop actually <em>do</em> something (reorder a list, move a card between
          columns, accept a file) requires listening for a specific sequence of events, covered next.
        </Para>

        <Callout type="info">
          Most elements are <code>draggable="false"</code> by default — with one notable exception:
          images and links are draggable by default in most browsers (you may have noticed you can drag
          an image out of a web page onto your desktop without any code at all). Explicit{' '}
          <code>draggable="true"</code> is what enables the behavior for everything else, and{' '}
          <code>draggable="false"</code> can be used to explicitly turn it off where the default
          draggability of an image or link is unwanted.
        </Callout>
      </section>

      <Divider />

      {/* ── Part 07 ── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 07 — dragstart, dragover, drop" />
        <SectionTitle>The Drag-and-Drop Event Sequence</SectionTitle>

        <Para>
          A complete drag-and-drop interaction fires a specific sequence of events across two different
          elements: the item being dragged, and the area it can be dropped onto. Three events matter
          most for a basic implementation.
        </Para>

        <CodeBox label="The three essential drag-and-drop events">{`dragstart   — fires ONCE, on the element being dragged, the instant the drag begins
dragover    — fires REPEATEDLY, on the drop target, continuously while something
              is being dragged over it (many times per second)
drop        — fires ONCE, on the drop target, the instant the item is released`}</CodeBox>

        <Para>
          <code>dragstart</code> is where you typically record{' '}
          <em>what</em> is being dragged, using the drag event&apos;s built-in{' '}
          <code>dataTransfer</code> object — a small data-passing mechanism purpose-built for exactly
          this handoff between the drag source and the eventual drop target.
        </Para>

        <CodeBox label="dragstart — recording what's being dragged">{`<div class="card" draggable="true" id="card-1">Task: Write Q3 report</div>

<script>
  const card = document.getElementById('card-1');

  card.addEventListener('dragstart', (event) => {
    event.dataTransfer.setData('text/plain', card.id);
    // Storing the dragged element's id lets the drop handler
    // later identify exactly which element to move.
  });
</script>`}</CodeBox>

        <Para>
          <code>dragover</code> fires continuously on any element the drag passes over, and — this is
          the single most commonly missed step — the browser&apos;s <strong>default behavior is to
          reject a drop entirely</strong> unless <code>event.preventDefault()</code> is called inside
          the <code>dragover</code> handler itself. Without it, the <code>drop</code> event never fires
          at all, no matter how correctly everything else is written.
        </Para>

        <CodeBox label="dragover — must call preventDefault or drop never fires">{`<div class="column" id="in-progress-column"></div>

<script>
  const column = document.getElementById('in-progress-column');

  column.addEventListener('dragover', (event) => {
    event.preventDefault();  // REQUIRED — without this, "drop" never fires
  });
</script>`}</CodeBox>

        <Para>
          Finally, <code>drop</code> fires on the target the instant the mouse button is released, and
          is where the actual move happens — reading back whatever was stored in{' '}
          <code>dataTransfer</code> during <code>dragstart</code> and using it to relocate the real DOM
          element.
        </Para>

        <CodeBox label="drop — completing the move">{`column.addEventListener('drop', (event) => {
  event.preventDefault();
  const draggedId = event.dataTransfer.getData('text/plain');
  const draggedElement = document.getElementById(draggedId);
  column.appendChild(draggedElement);   // moves the real element in the DOM
});`}</CodeBox>

        <Callout type="warning">
          <strong>Forgetting preventDefault() in the dragover handler is, by a wide margin, the single
          most common drag-and-drop bug.</strong> Every other part of the implementation can be entirely
          correct, and the drop simply will not work — the item snaps back to its origin with no error
          in the console at all, since a rejected drop is the browser&apos;s intentional, silent default
          behavior, not a failure state.
        </Callout>
      </section>

      <Divider />

      {/* ── Part 08 ── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 08 — A Complete Example" />
        <SectionTitle>Putting It Together — A Minimal Kanban-Style Drag-and-Drop Board</SectionTitle>

        <Para>
          Combining everything from Parts 01–07 — <code>data-*</code> attributes, <code>dataset</code>,
          and the three-event drag sequence — produces a small but genuinely complete card-moving
          interaction, the same fundamental mechanism behind real task-board tools.
        </Para>

        <CodeBox label="A minimal two-column drag-and-drop board">{`<div class="board">
  <div class="column" data-status="todo" id="todo-column">
    <h3>To Do</h3>
    <div class="card" draggable="true" data-card-id="1">Write Q3 report</div>
    <div class="card" draggable="true" data-card-id="2">Review PR #482</div>
  </div>

  <div class="column" data-status="done" id="done-column">
    <h3>Done</h3>
  </div>
</div>

<script>
  // dragstart on every card — record which card is being dragged
  document.querySelectorAll('.card').forEach((card) => {
    card.addEventListener('dragstart', (event) => {
      event.dataTransfer.setData('text/plain', card.dataset.cardId);
    });
  });

  // dragover + drop on every column
  document.querySelectorAll('.column').forEach((column) => {
    column.addEventListener('dragover', (event) => {
      event.preventDefault();  // required, or drop never fires
      column.classList.add('drag-over');  // visual feedback while dragging over
    });

    column.addEventListener('dragleave', () => {
      column.classList.remove('drag-over');
    });

    column.addEventListener('drop', (event) => {
      event.preventDefault();
      column.classList.remove('drag-over');

      const cardId = event.dataTransfer.getData('text/plain');
      const card = document.querySelector(\`[data-card-id="\${cardId}"]\`);
      column.appendChild(card);

      console.log(\`Card \${cardId} moved to status: \${column.dataset.status}\`);
    });
  });
</script>`}</CodeBox>

        <Para>
          Notice the <code>data-card-id</code> attribute doing double duty exactly as described earlier
          in this module — it identifies each card for the drag-and-drop logic in Part 07, and it is
          also the attribute a CSS selector or a query like{' '}
          <code>{'document.querySelector(\'[data-card-id="1"]\')'}</code> can target directly, without
          any additional class or id needed purely for this purpose.
        </Para>
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
        <SectionTitle>A Task-Board Feature at a Portland Project-Management Startup</SectionTitle>

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
            Scenario — Project-management SaaS, Portland · Feature bug report
          </div>

          <Para>
            A Portland-based project-management startup ships a Kanban board feature, letting users drag
            task cards between "To Do," "In Progress," and "Done" columns. During internal QA, a report
            comes in: dragging a card over the "Done" column highlights it correctly with a visual
            border, but releasing the mouse does nothing at all — the card snaps right back to its
            original column, with no error anywhere in the browser console.
          </Para>

          <CodeBox label="The buggy implementation">{`document.querySelectorAll('.column').forEach((column) => {
  column.addEventListener('dragover', () => {
    column.classList.add('drag-over');  // visual highlight works fine
  });

  column.addEventListener('drop', (event) => {
    const cardId = event.dataTransfer.getData('text/plain');
    const card = document.querySelector(\`[data-card-id="\${cardId}"]\`);
    column.appendChild(card);
  });
});`}</CodeBox>

          <SubSubTitle>What the engineer finds</SubSubTitle>

          <Para>
            Exactly the bug flagged in Part 07: the <code>dragover</code> handler never calls{' '}
            <code>event.preventDefault()</code>. Because the browser&apos;s default response to a{' '}
            <code>dragover</code> is to reject the drop outright, the visual highlight applied by the
            handler works perfectly fine — CSS classes have nothing to do with the drag-and-drop
            protocol itself — while the actual <code>drop</code> event silently never fires at all. The
            missing call is a single line, but its absence is completely invisible from the visual
            behavior alone, since the highlight gives every impression that the interaction is "almost
            working."
          </Para>

          <CodeBox label="The one-line fix">{`column.addEventListener('dragover', (event) => {
  event.preventDefault();   // ← the missing line
  column.classList.add('drag-over');
});`}</CodeBox>

          <Para>
            The team adds a short comment directly above every <code>dragover</code> listener in the
            codebase afterward — <code>{`// preventDefault() required here or drop() never fires`}</code>{' '}
            — specifically because this exact bug had already cost an afternoon of debugging once, and
            the fix is trivial to miss again on the next drag-and-drop feature built by someone
            unfamiliar with this particular quirk of the API.
          </Para>
        </div>
      </section>

      <Divider />

      {/* ── Part 10 — Misconceptions ── */}
      <section style={{ marginBottom: 64 }} data-toc-kind="myth">
        <SectionTag text="// Part 10 — Misconceptions" />
        <SectionTitle>Four Misconceptions About These APIs</SectionTitle>

        {[
          {
            wrong: "\"dataset values keep their original type — a data-count='5' reads back as the number 5\"",
            right: 'Every value read through dataset is always a string, with no exceptions — data-count="5" reads back as the string "5", and data-active="true" reads back as the string "true", not a boolean. Any numeric or boolean comparison needs an explicit conversion first.',
          },
          {
            wrong: '"contenteditable content is automatically included when its enclosing form submits"',
            right: 'It is not — contenteditable elements are not real form controls and are excluded from a form\'s natural submission entirely. Capturing the content requires JavaScript, typically copying it into a hidden input immediately before submission.',
          },
          {
            wrong: "\"draggable='true' alone is enough to make drag-and-drop actually work\"",
            right: 'It only enables the browser\'s default pick-up/follow-cursor visual behavior. Making a drop actually do something requires JavaScript listening for dragstart, dragover (with preventDefault() called inside it), and drop.',
          },
          {
            wrong: '"If the dragover highlight/visual feedback is working, the drop handler will fire too"',
            right: 'These are independent — dragover firing (and any CSS class toggling inside it) has nothing to do with whether drop will fire. Without an explicit preventDefault() call specifically inside the dragover handler, the browser rejects the drop and drop never fires, regardless of how correct the visual feedback looks.',
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
        <SectionTitle>5 Interview Questions — With Complete Answers</SectionTitle>

        {[
          {
            q: 'What naming convention translates a data-* attribute into a dataset property, and why does it matter?',
            a: 'A hyphenated attribute name has the data- prefix removed and is converted to camelCase — data-product-id becomes dataset.productId, data-in-stock becomes dataset.inStock. This matters because a data-* attribute must be written all-lowercase with hyphens at word boundaries in the HTML itself; writing data-productId directly in markup would not convert to dataset.productId the way you might expect.',
          },
          {
            q: 'Why is it important to know that every dataset value is always a string?',
            a: 'Because a truthy check like if (el.dataset.flag) is true for ANY non-empty string, including the string "false" — a very easy real bug. Numeric or boolean data-* values need explicit conversion (Number(...), or a strict === \'true\' comparison) before being used in numeric or boolean logic.',
          },
          {
            q: 'Does contenteditable content get included when its enclosing form is submitted?',
            a: 'No — contenteditable elements are not real form controls and contribute nothing to a form\'s natural submission, unlike an <input> or <textarea>. Capturing the content requires JavaScript, most commonly copying the current innerHTML or innerText into a hidden input just before the form submits.',
          },
          {
            q: 'Walk through the minimum set of drag-and-drop events needed for a basic drag-and-drop feature to work, and what each does.',
            a: 'dragstart fires once on the dragged element, used to record what is being dragged (typically via event.dataTransfer.setData). dragover fires repeatedly on any element the drag passes over, and MUST call event.preventDefault() inside its handler or the drop will be rejected by the browser\'s default behavior. drop fires once on the target when the mouse is released, where the actual move/update logic happens, typically reading back whatever was stored in dataTransfer during dragstart.',
          },
          {
            q: 'A drag-and-drop drop zone shows the correct hover highlight, but dropping an item does nothing. What is the most likely cause?',
            a: 'The dragover event handler is very likely missing an explicit event.preventDefault() call. The browser\'s default response to dragover is to disallow a drop entirely, so without that call, the drop event silently never fires — regardless of whether the visual hover feedback (which is independent, usually just a CSS class toggle) is working correctly.',
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
        <SectionTitle>HTML5 API Mistakes Beginners Make Constantly</SectionTitle>

        {[
          {
            q: 'Writing a data-* attribute in camelCase directly in the HTML',
            a: 'Broken: <div data-userId="4"></div> — this does not reliably map to dataset.userId the way a hyphenated one does. Fixed: <div data-user-id="4"></div>, which correctly reads back as element.dataset.userId.',
          },
          {
            q: 'Comparing a dataset boolean-like value without converting it first',
            a: 'Broken: if (card.dataset.completed) { ... } when data-completed="false" — this is always truthy since it is a non-empty string. Fixed: if (card.dataset.completed === \'true\') { ... }.',
          },
          {
            q: 'Forgetting preventDefault() inside the dragover handler',
            a: 'Broken: a dragover listener with only visual-feedback logic and no event.preventDefault() call — the drop event never fires, with no console error at all. Fixed: call event.preventDefault() as the first line inside every dragover handler.',
          },
          {
            q: 'Expecting contenteditable content to appear in a form\'s submitted data automatically',
            a: 'Broken: relying on a <div contenteditable="true"> inside a <form> to be included on submit, the way a real input is. Fixed: manually copy its content (via innerText or innerHTML) into a hidden input immediately before the form submits.',
          },
          {
            q: 'Using data-* attributes for content that is actually part of the visible page structure',
            a: 'Broken: stashing genuinely visible, meaningful text — like a product\'s displayed price — only in a data-* attribute with nothing shown in the actual markup, making it invisible to search engines, screen readers, and users with JavaScript disabled or failing. Fixed: keep genuinely visible content in real markup; reserve data-* strictly for values JavaScript and CSS selectors need but that are not meant to be independently meaningful content on their own.',
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
        <SectionTitle>Errors and Bugs You Will Hit With These APIs</SectionTitle>

        {[
          {
            error: `Drop silently does nothing — card snaps back to its origin column`,
            cause: 'The dragover event handler on the drop target does not call event.preventDefault(). The browser\'s default action for dragover is to disallow dropping entirely, so drop never fires — and there is no console error, since this is intentional default browser behavior, not a failure.',
            fix: 'Add event.preventDefault() as the first line inside the dragover event handler.',
          },
          {
            error: `TypeError: Cannot read properties of null (reading 'appendChild') — inside a drop handler`,
            cause: 'The card id retrieved from event.dataTransfer.getData(\'text/plain\') does not match any element\'s data-card-id, usually because setData and getData used mismatched keys/format strings, or the id was never set at all inside dragstart.',
            fix: 'Confirm the exact same string key ("text/plain" or a custom one) is used in both setData (dragstart) and getData (drop), and log the retrieved id to confirm it matches a real element before calling appendChild on the result.',
          },
          {
            error: `if (el.dataset.someFlag) always evaluates true, even when the attribute is "false"`,
            cause: 'Every dataset value is a string. A non-empty string, including the literal text "false", is truthy in JavaScript — the mistake is treating a data-* boolean-like attribute as an actual boolean without converting it.',
            fix: 'Use an explicit comparison: el.dataset.someFlag === \'true\', or convert with a helper before using it in conditional logic.',
          },
          {
            error: `A data-* attribute set with dataset in JavaScript does not appear to work in a CSS selector`,
            cause: 'A mismatch between the CSS attribute selector\'s expected hyphenated name and the camelCase name used when setting it via dataset in JavaScript — e.g. writing element.dataset.itemCount but the CSS selector expects [data-itemcount] instead of the correct [data-item-count].',
            fix: 'Remember the conversion is always hyphen-case in HTML/CSS and camelCase in dataset — double check the CSS selector uses the correctly hyphenated attribute name.',
          },
          {
            error: `contenteditable content is missing entirely from the data sent when a form is submitted`,
            cause: 'contenteditable elements are not real form controls and are never included in a form\'s natural GET/POST submission, regardless of where they are nested in the DOM.',
            fix: 'Manually copy the contenteditable element\'s current content into a hidden <input> right before submission, using a submit event listener.',
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
        'data-* attributes let you attach arbitrary custom data to any element, in a namespace guaranteed valid and reserved by HTML5 specifically for this purpose.',
        'The dataset property reads and writes data-* attributes from JavaScript, automatically converting between hyphen-case in HTML (data-item-id) and camelCase in JS (dataset.itemId).',
        'Every value read through dataset is always a string — even "true" and "5" — and must be explicitly converted before being used as a real boolean or number.',
        'data-* attributes work directly as CSS attribute selectors too, a common way to drive visual state changes by toggling one attribute value rather than several CSS classes.',
        'contenteditable makes any element directly editable in the browser, but its content is excluded from a form\'s natural submission — capturing it requires manual JavaScript, typically via a hidden input.',
        'draggable="true" alone only enables the visual pick-up behavior. A working drag-and-drop feature needs dragstart, dragover, and drop event listeners.',
        'The single most common drag-and-drop bug: forgetting event.preventDefault() inside the dragover handler, which causes the browser to silently reject every drop with no console error.',
        'dataTransfer.setData() (in dragstart) and dataTransfer.getData() (in drop) are the built-in mechanism for passing information about what is being dragged from the drag source to the eventual drop target.',
      ]} />

      {/* ── Next Module CTA ── */}
      <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 10, padding: '24px', marginTop: 40 }}>
        <p style={{ fontSize: 10, color: 'var(--muted)', letterSpacing: '.12em', textTransform: 'uppercase', fontFamily: 'var(--font-mono)', fontWeight: 700, margin: '0 0 10px' }}>
          What comes next
        </p>
        <p style={{ fontSize: 15, color: 'var(--text)', lineHeight: 1.85, margin: '0 0 20px' }}>
          Module 12 covers embedding external content safely — iframe, the legacy embed and object
          elements, the sandbox attribute, cross-origin restrictions, and the clickjacking risk every
          embedded page introduces.
        </p>
        <Link href="/learn/html-css/embedding-content" style={{ background: C, color: '#000', padding: '11px 24px', borderRadius: 7, fontWeight: 700, fontSize: 13, textDecoration: 'none', display: 'inline-block' }}>
          Module 12 → Embedding Content — iframe, embed, object
        </Link>
      </div>
    </LearnLayout>
  )
}
