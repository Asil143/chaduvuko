import type { Metadata } from 'next'
import { LearnLayout } from '@/components/content/LearnLayout'
import Link from 'next/link'
import { Callout } from '@/components/content/Callout'
import { KeyTakeaways } from '@/components/content/KeyTakeaways'

export const metadata: Metadata = {
  title: 'Lists — ul, ol, dl — HTML & CSS | Chaduvuko',
  description:
    'Ordered, unordered, and description lists — nesting them correctly, and the semantic reasons to choose one over the other.',
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

export default function Lists() {
  return (
    <LearnLayout
      title="Lists — ul, ol, dl"
      description="Ordered, unordered, and description lists — nesting them correctly, and the semantic reasons to choose one over the other."
      section="HTML & CSS — Module 06"
      readTime="25 min"
      updatedAt="August 2026"
    >

      {/* ── Part 01 ── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 01 — ul, the Unordered List" />
        <SectionTitle>ul — A List Where Order Carries No Meaning</SectionTitle>

        <Para>
          <code>{`<ul>`}</code> (unordered list) groups a set of related items where the sequence they
          appear in does not change what they mean. Every item lives inside a <code>{`<li>`}</code>{' '}
          (list item), and <code>{`<li>`}</code> is only ever valid as a direct child of{' '}
          <code>{`<ul>`}</code> or <code>{`<ol>`}</code> — it has no meaning sitting on its own.
        </Para>

        <CodeBox label="A basic unordered list">{`<ul>
  <li>Milk</li>
  <li>Eggs</li>
  <li>Bread</li>
  <li>Coffee</li>
</ul>`}</CodeBox>

        <Para>
          "Unordered" describes the semantics, not the visual rendering — by default, browsers draw a
          bullet point (•) in front of each <code>{`<li>`}</code>, which is exactly why beginners reach
          for <code>{`<ul>`}</code> whenever they want bullet points on the page. That instinct happens
          to be right most of the time, but the actual reasoning should run the other direction: choose{' '}
          <code>{`<ul>`}</code> because the items form an unordered collection, and the bullet styling
          follows naturally from that choice — not because you want bullets and are working backward
          from the visual result.
        </Para>

        <Callout type="info">
          A grocery list, a set of navigation links, a list of features on a pricing page, tags attached
          to a blog post — none of these change meaning if you shuffle the items. That is the test for{' '}
          <code>{`<ul>`}</code>.
        </Callout>
      </section>

      <Divider />

      {/* ── Part 02 ── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 02 — ol, the Ordered List" />
        <SectionTitle>ol — A List Where Sequence Is Part of the Meaning</SectionTitle>

        <Para>
          <code>{`<ol>`}</code> (ordered list) is structurally identical to <code>{`<ul>`}</code> — the
          same <code>{`<li>`}</code> children — but it carries a semantic promise that <code>{`<ul>`}</code>{' '}
          does not: the order of the items is meaningful. Browsers render <code>{`<ol>`}</code> items with
          numbers by default, precisely because a reader needs to know an item is "step 3," not just "one
          of several steps."
        </Para>

        <CodeBox label="A basic ordered list — a recipe's steps">{`<ol>
  <li>Preheat the oven to 425°F</li>
  <li>Toss the vegetables in olive oil and salt</li>
  <li>Spread on a baking sheet in a single layer</li>
  <li>Roast for 25 minutes, stirring halfway through</li>
</ol>`}</CodeBox>

        <Para>
          Swap the order of a recipe&apos;s steps, a set of installation instructions, or a countdown, and
          the content is now wrong — not just visually rearranged, actually incorrect. That is the exact
          signal that <code>{`<ol>`}</code>, not <code>{`<ul>`}</code>, is the right element.
        </Para>

        <SubTitle>start, reversed, and type — controlling how ol counts</SubTitle>

        <Para>
          <code>{`<ol>`}</code> supports a few attributes that change how its automatic numbering
          behaves, useful anywhere the list does not simply start at 1 and count upward.
        </Para>

        <CodeBox label="start — begin counting from a specific number">{`<ol start="5">
  <li>Fifth step</li>
  <li>Sixth step</li>
  <li>Seventh step</li>
</ol>
<!-- Useful for a list that continues a sequence broken up by other content -->`}</CodeBox>

        <CodeBox label="reversed — count downward instead of up">{`<ol reversed>
  <li>Third place</li>
  <li>Second place</li>
  <li>First place</li>
</ol>
<!-- Renders as: 3, 2, 1 -->`}</CodeBox>

        <CodeBox label="type — switch the numbering style (letters, roman numerals)">{`<ol type="A">
  <li>First option</li>
  <li>Second option</li>
</ol>
<!-- Renders as: A. First option   B. Second option -->

<ol type="i">
  <li>First</li>
  <li>Second</li>
</ol>
<!-- Renders as: i. First   ii. Second -->`}</CodeBox>

        <Callout type="tip">
          <code>type</code> here changes the actual numbering style rendered by the browser&apos;s
          default styles — this is distinct from the CSS <code>list-style-type</code> property covered
          briefly in Part 07, which can achieve similar visual results but through styling rather than a
          content attribute. Prefer the <code>type</code> attribute only when the letter/numeral choice
          is part of the content&apos;s actual meaning (a legal document&apos;s numbered sub-clauses, for
          example); reach for CSS when it is purely a visual preference.
        </Callout>
      </section>

      <Divider />

      {/* ── Part 03 ── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 03 — Choosing ul vs ol" />
        <SectionTitle>The Real Test: Does Reordering the Items Change What They Mean?</SectionTitle>

        <Para>
          The single question that decides between <code>{`<ul>`}</code> and <code>{`<ol>`}</code> is not
          "do I want bullets or numbers" — it is "if I shuffled these items into a random order, would
          the content still be correct?" If yes, use <code>{`<ul>`}</code>. If shuffling it would make it
          wrong, incomplete, or confusing, use <code>{`<ol>`}</code>.
        </Para>

        <CodeBox label="Same visual bullets, different underlying meaning">{`<!-- The order genuinely doesn't matter — any arrangement is equally correct -->
<ul>
  <li>Wireless keyboard</li>
  <li>USB-C hub</li>
  <li>Laptop stand</li>
</ul>

<!-- The order IS the content — step 2 only makes sense after step 1 -->
<ol>
  <li>Unplug the device from power</li>
  <li>Hold the reset button for 10 seconds</li>
  <li>Plug the device back in</li>
</ol>`}</CodeBox>

        <Para>
          This distinction is not pedantic — screen readers announce list length and, for{' '}
          <code>{`<ol>`}</code>, each item&apos;s position ("item 2 of 4") as part of navigating the list,
          giving a listener genuinely useful positional information for a sequence but potentially
          misleading information for a collection with no real order. Search engines and other tools that
          parse page structure make the same distinction. Choosing the semantically correct element is
          not just "more correct" in an abstract sense — it changes what real software tells real users
          about your content.
        </Para>

        <Callout type="warning">
          <strong>Do not choose based on how you want it to look.</strong> If you want numbered-looking
          bullets on content where order genuinely does not matter, that is a job for CSS{' '}
          <code>{`counter-*`}</code> properties or <code>list-style-type</code> on a <code>{`<ul>`}</code>{' '}
          — not a reason to reach for <code>{`<ol>`}</code> and misrepresent the content&apos;s actual
          structure.
        </Callout>
      </section>

      <Divider />

      {/* ── Part 04 ── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 04 — Nesting Lists Correctly" />
        <SectionTitle>Nested Lists — And the li-Wrapping Rule Almost Everyone Gets Wrong at First</SectionTitle>

        <Para>
          A list can nest inside another list — a sub-list under a main topic, a multi-level outline, a
          site&apos;s navigation with dropdown sub-menus. The rule that trips up nearly every beginner:
          the nested <code>{`<ul>`}</code> or <code>{`<ol>`}</code> must live <strong>inside</strong> an{' '}
          <code>{`<li>`}</code> of the parent list, not as a sibling sitting after it.
        </Para>

        <CodeBox label="Correct nesting — the sub-list lives inside its parent li">{`<ul>
  <li>
    Frontend
    <ul>
      <li>HTML</li>
      <li>CSS</li>
      <li>JavaScript</li>
    </ul>
  </li>
  <li>Backend</li>
</ul>`}</CodeBox>

        <CodeBox label="Incorrect — the sub-list is a sibling of li, not contained by it">{`<ul>
  <li>Frontend</li>
  <ul>
    <li>HTML</li>
    <li>CSS</li>
  </ul>
  <li>Backend</li>
</ul>

<!-- This is invalid HTML: ul is not a permitted child of ul directly.
     Browsers will attempt to recover, but the resulting structure is
     unpredictable and does not reflect the intended hierarchy. -->`}</CodeBox>

        <Para>
          The mental model worth keeping: a sub-list is a more detailed breakdown of one specific item,
          so it belongs nested where that item lives, not floating between items at the parent
          level. This same containment rule applies identically to <code>{`<ol>`}</code>, and mixed
          nesting — an <code>{`<ol>`}</code> nested inside a <code>{`<ul>`}</code>&apos;s{' '}
          <code>{`<li>`}</code>, or the reverse — is completely valid whenever the semantics genuinely
          call for it.
        </Para>

        <SubTitle>Putting more than text inside an li</SubTitle>

        <Para>
          An <code>{`<li>`}</code> is not limited to plain text — it can contain paragraphs, images,
          links, or any other flow content, exactly like a <code>{`<div>`}</code> can. The common mistake
          is placing block-level content like a heading or a full form directly beside a nested list
          without a wrapper, making it genuinely ambiguous whether that content belongs to the item above
          it, below it, or stands on its own.
        </Para>

        <CodeBox label="An li containing more than a single line of text">{`<ul>
  <li>
    <strong>Senior Frontend Engineer</strong>
    <p>Remote · Full-time · Posted 3 days ago</p>
  </li>
  <li>
    <strong>Product Designer</strong>
    <p>Austin, TX · Full-time · Posted 1 week ago</p>
  </li>
</ul>`}</CodeBox>
      </section>

      <Divider />

      {/* ── Part 05 ── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 05 — dl, dt, dd" />
        <SectionTitle>dl — The Description List, for Term/Description Pairs</SectionTitle>

        <Para>
          <code>{`<dl>`}</code> (description list — historically called a "definition list," and the
          name you will still hear used interchangeably) is a third, distinct list type for content that
          is neither a simple unordered collection nor a sequence: pairs of a <strong>term</strong> and
          its <strong>description</strong>. Each term is a <code>{`<dt>`}</code>, each description a{' '}
          <code>{`<dd>`}</code>, and both live as direct children of <code>{`<dl>`}</code>.
        </Para>

        <CodeBox label="A basic description list — a glossary entry">{`<dl>
  <dt>Hoisting</dt>
  <dd>JavaScript's behavior of moving variable and function declarations to the top of their scope before code executes.</dd>

  <dt>Closure</dt>
  <dd>A function that retains access to variables from its enclosing scope, even after that outer function has returned.</dd>
</dl>`}</CodeBox>

        <Para>
          This is the correct element for a genuine glossary, a dictionary-style word list, or any
          content that is fundamentally a set of labeled definitions — not just any content that happens
          to look like a two-column layout. Reaching for <code>{`<dl>`}</code> purely because it visually
          resembles a design mockup, without the content actually being term/description pairs, misuses
          the element the same way choosing <code>{`<ol>`}</code> purely for its numbers misuses that one.
        </Para>

        <SubTitle>Metadata and key-value pairs — a second legitimate use</SubTitle>

        <Para>
          Beyond glossaries, <code>{`<dl>`}</code> is also the correct element for structured metadata —
          a set of labeled facts about something, where each label pairs with one value.
        </Para>

        <CodeBox label="dl used for structured metadata">{`<dl>
  <dt>Author</dt>
  <dd>Maria Chen</dd>

  <dt>Published</dt>
  <dd>March 3, 2026</dd>

  <dt>Reading time</dt>
  <dd>8 minutes</dd>
</dl>`}</CodeBox>
      </section>

      <Divider />

      {/* ── Part 06 ── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 06 — Multiple Terms and Descriptions" />
        <SectionTitle>One Term, Several Descriptions — and Several Terms, One Description</SectionTitle>

        <Para>
          The relationship inside a <code>{`<dl>`}</code> is not strictly one <code>{`<dt>`}</code> to
          one <code>{`<dd>`}</code>. A single term can have multiple descriptions listed one after
          another, and a description can follow multiple consecutive terms that share it — both are
          valid, and both come up in real content.
        </Para>

        <CodeBox label="One term, multiple descriptions">{`<dl>
  <dt>API</dt>
  <dd>Application Programming Interface.</dd>
  <dd>A set of rules that lets one piece of software communicate with another.</dd>
</dl>`}</CodeBox>

        <CodeBox label="Multiple terms sharing one description — synonyms">{`<dl>
  <dt>HTTP</dt>
  <dt>Hypertext Transfer Protocol</dt>
  <dd>The protocol web browsers and servers use to communicate — the same concept, referred to two ways.</dd>
</dl>`}</CodeBox>

        <Para>
          As with the other two list types, <code>{`<dl>`}</code> can be nested — a <code>{`<dd>`}</code>{' '}
          can contain its own <code>{`<dl>`}</code> for a sub-breakdown of a definition, following the
          exact same containment principle from Part 04: the nested list lives inside the element it
          elaborates on, not beside it.
        </Para>
      </section>

      <Divider />

      {/* ── Part 07 ── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 07 — A Brief Word on CSS list-style" />
        <SectionTitle>Styling Lists With CSS — A Preview, Not the Full Picture</SectionTitle>

        <Para>
          The default bullets and numbers you have seen throughout this module are browser default
          styles, not something baked permanently into the elements — CSS can change or remove them
          entirely. Full CSS styling depth is out of scope for this HTML-focused module, but the single
          property worth knowing now is <code>list-style-type</code>, since you will reach for it almost
          immediately in real projects.
        </Para>

        <CodeBox label="A brief preview — removing default bullets, a common navigation pattern">{`nav ul {
  list-style-type: none;
  padding-left: 0;
}`}</CodeBox>

        <Para>
          This exact rule is why navigation menus built from a semantically correct <code>{`<ul>`}</code>{' '}
          of links do not visually show bullet points on a real website — the markup stays semantically
          honest (still genuinely an unordered list of links) while CSS controls how it looks. Removing
          the bullets does not change what screen readers or search engines understand about the
          structure; the list is still announced as a list of a certain length, exactly as before.
        </Para>

        <Callout type="info">
          Never reach for a non-list element (a plain <code>{`<div>`}</code> full of{' '}
          <code>{`<span>`}</code> or <code>{`<p>`}</code> elements) purely to avoid dealing with default
          bullet styling — that trades away real semantic meaning for a styling problem CSS already
          solves cleanly. The full CSS styling toolkit for lists, spacing, and custom markers is covered
          properly once you reach the CSS phases of this track.
        </Callout>
      </section>

      <Divider />

      {/* ── Part 08 — Real World ── */}
      <section style={{ marginBottom: 64 }} data-toc-kind="story">
        <SectionTag text="// Part 08 — Real World" />
        <div style={{
          fontSize: 10, fontWeight: 700, letterSpacing: '.12em',
          textTransform: 'uppercase', color: 'var(--muted)', marginBottom: 12,
          fontFamily: 'var(--font-mono)',
        }}>
          💼 What This Looks Like at Work
        </div>
        <SectionTitle>An Accessibility Bug Report at a Seattle SaaS Company</SectionTitle>

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
            Scenario — B2B SaaS company, Seattle · Support ticket escalation
          </div>

          <Para>
            A customer using a screen reader files a support ticket about a project-management tool&apos;s
            "Setup Checklist" widget: it announces as "5 items" but reads out of order every time the page
            reloads, making the step-by-step onboarding instructions genuinely impossible to follow. The
            ticket gets escalated to engineering the same day.
          </Para>

          <CodeBox label="The original markup">{`<div class="checklist">
  <div class="checklist-item">Connect your GitHub repository</div>
  <div class="checklist-item">Invite your team</div>
  <div class="checklist-item">Create your first project</div>
  <div class="checklist-item">Configure notifications</div>
  <div class="checklist-item">Complete your profile</div>
</div>`}</CodeBox>

          <SubSubTitle>What the engineer finds</SubSubTitle>

          <Para>
            There is no list markup at all — just five sibling <code>{`<div>`}</code> elements styled to
            look like a numbered checklist with CSS <code>::before</code> counters. Because nothing here
            is an actual <code>{`<ol>`}</code>, a screen reader has no idea these five blocks form a
            sequence, announces them as five unrelated pieces of generic content, and — since the
            checklist items are re-fetched from an API and rendered in whatever order the response
            happens to arrive — the visual numbering (drawn purely by CSS position, not tied to real
            content order) occasionally does not match the actual step sequence a sighted user sees
            either, an entirely separate bug the ticket had accidentally also surfaced.
          </Para>

          <CodeBox label="The fix — a genuine ol, sorted server-side before rendering">{`<ol class="checklist">
  <li class="checklist-item">Connect your GitHub repository</li>
  <li class="checklist-item">Invite your team</li>
  <li class="checklist-item">Create your first project</li>
  <li class="checklist-item">Configure notifications</li>
  <li class="checklist-item">Complete your profile</li>
</ol>`}</CodeBox>

          <Para>
            The fix is two changes, both directly from this module: swapping the <code>{`<div>`}</code>{' '}
            wrapper and item elements for a genuine <code>{`<ol>`}</code>/<code>{`<li>`}</code> structure
            (Part 02), and sorting the items by an explicit <code>step_order</code> field from the API
            before rendering, rather than trusting whatever order the response happened to arrive in —
            since <code>{`<ol>`}</code>&apos;s entire semantic promise (Part 03) is that the markup order
            itself is the meaningful order. The existing CSS number-styling is deleted entirely, replaced
            by the browser&apos;s native <code>{`<ol>`}</code> numbering, which now stays correctly synced
            to the actual content order by construction, not by two separate systems that happened to
            usually agree.
          </Para>
        </div>
      </section>

      <Divider />

      {/* ── Part 09 — Misconceptions ── */}
      <section style={{ marginBottom: 64 }} data-toc-kind="myth">
        <SectionTag text="// Part 09 — Misconceptions" />
        <SectionTitle>Four Misconceptions About HTML Lists</SectionTitle>

        {[
          {
            wrong: '"Use ol when you want numbers, ul when you want bullets"',
            right: 'The choice should be driven by whether the order of the items is meaningful, not by which default marker you want. Numbers or bullets are both easily changed with the CSS list-style-type property regardless of which list element you use — the element choice is about semantics, not appearance.',
          },
          {
            wrong: '"dl is an old, deprecated element from early HTML that shouldn\'t be used anymore"',
            right: 'dl (renamed "description list" from its older "definition list" framing) is fully current in the HTML specification and is the correct, semantic choice for glossaries, FAQs, and any labeled term/description or key/value content — it is simply less commonly needed than ul or ol, not deprecated.',
          },
          {
            wrong: '"li elements can only contain plain text"',
            right: 'An li can contain any flow content — paragraphs, images, links, even another nested list — exactly like a div can. The rule that actually matters is where the li itself is allowed to live: only as a direct child of ul or ol.',
          },
          {
            wrong: '"Nested lists are written as siblings, right after the li they relate to"',
            right: 'A nested ul or ol must be placed INSIDE the li of the parent item it elaborates on, not as a sibling that follows it. Placing it as a sibling produces invalid HTML that browsers will attempt to recover from unpredictably.',
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

      {/* ── Part 10 — Interview Prep ── */}
      <section style={{ marginBottom: 64 }} data-toc-kind="prep">
        <SectionTag text="// Part 10 — Interview Prep" />
        <SectionTitle>5 Interview Questions — With Complete Answers</SectionTitle>

        {[
          {
            q: 'What is the actual difference between ul and ol beyond the default bullet vs. number styling?',
            a: 'The difference is semantic, not visual: ol communicates that the order of its items is meaningful content — a sequence of steps, a ranking — while ul communicates that the items form a collection whose order carries no meaning. Screen readers and other assistive technology use this distinction, announcing positional information ("item 2 of 5") more meaningfully for an ol. Visual styling — bullets, numbers, letters, or neither — is fully controllable with CSS regardless of which element is chosen, so styling preference should never drive the choice between them.',
          },
          {
            q: 'When would you use a description list (dl) instead of ul or ol?',
            a: 'When the content is fundamentally a set of term/description or label/value pairs — a glossary, an FAQ, or structured metadata like a set of labeled facts about an article (author, published date, reading time). dt holds each term, dd holds its corresponding description, and both are valid HTML5 (not deprecated), just less frequently needed than ul or ol in typical page content.',
          },
          {
            q: 'What is the correct way to nest one list inside another?',
            a: 'The nested ul or ol must be placed inside the li element of the parent item it is elaborating on — not as a sibling of that li. This reflects the actual relationship: the sub-list is a more detailed breakdown of one specific parent item, so it structurally belongs inside that item, not floating between items at the top level.',
          },
          {
            q: 'Can an li contain more than plain text — for example, a paragraph or an image?',
            a: 'Yes — li accepts any flow content, the same category of content a div can contain, including paragraphs, images, links, and nested lists. The restriction that actually applies is on the li element itself: it is only valid as a direct child of ul or ol, nowhere else.',
          },
          {
            q: 'Why might a designer\'s numbered-looking list still be marked up as a ul rather than an ol?',
            a: 'Because visual appearance and semantic meaning are independent: a design can show numbers purely as a stylistic choice (via CSS counters or list-style-type) on content whose order genuinely carries no meaning — a numbered list of unordered feature highlights, for instance. The markup should reflect whether the underlying content order matters, not whether the design shows numerals.',
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
        <SectionTitle>List Mistakes Beginners Make Constantly</SectionTitle>

        {[
          {
            q: 'Building fake lists out of styled div elements instead of real list markup',
            a: 'Divs styled to look like a bulleted or numbered list carry none of the semantic meaning real list elements provide — screen readers announce them as unrelated generic content instead of a list of a known length, and the visual numbering (if done purely with CSS) can drift out of sync with the actual content order, exactly as shown in the Real World example.',
          },
          {
            q: 'Placing a nested list as a sibling of li instead of inside it',
            a: 'A ul or ol appearing directly between li elements, rather than nested inside one of them, produces invalid HTML — ul and ol only permit li (and a few script-related elements) as direct children. Browsers recover unpredictably from this, and the resulting structure often does not match what was intended.',
          },
          {
            q: 'Choosing ol vs ul based on wanting numbers, not based on whether order matters',
            a: 'Numbering is a styling choice, fully controllable through CSS on either list type. The element itself should be chosen based on whether the sequence of items is genuinely part of the content\'s meaning — reversing the items and asking "is this still correct?" is the reliable test.',
          },
          {
            q: 'Using dl for any two-column layout, regardless of whether the content is actually term/description pairs',
            a: 'dl carries a specific semantic promise — a term paired with its description. Content that merely looks like two columns in a design mockup, without an actual term/description relationship, should use a more general layout element instead, not dl purely for its visual shape.',
          },
          {
            q: 'Forgetting that li, dt, and dd have required parents',
            a: 'li is only valid inside ul or ol; dt and dd are only valid inside dl. Placing any of these elements directly in a generic container, without their required parent, produces invalid markup that assistive technology and browsers may not interpret as a list at all.',
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
        <SectionTitle>Errors and Rendering Bugs You Will Hit With Lists — And Exactly Why</SectionTitle>

        {[
          {
            error: `HTML validator: "Element ul not allowed as child of element ul in this context"`,
            cause: 'A nested ul or ol was placed directly inside a parent ul/ol as a sibling of its li elements, instead of being nested inside one specific li — the mistake covered in Part 04.',
            fix: 'Move the nested list so it sits inside the opening and closing tags of the li it elaborates on, not between separate li elements.',
          },
          {
            error: `HTML validator: "Element dd not allowed as child of element div in this context"`,
            cause: 'dt and dd were used outside of a dl parent — commonly, someone reaches for the shorter dt/dd tags for a generic label/value pair without realizing they require a dl wrapper to be valid.',
            fix: 'Wrap the dt/dd pairs in a dl element, or, if the content genuinely is not a term/description relationship, use different elements — a styled div with a heading and paragraph, for instance.',
          },
          {
            error: `Screen reader announces list content as unrelated, ungrouped text with no item count`,
            cause: 'The list is built from styled div or span elements instead of real ul/ol/li markup, so assistive technology has no structural signal that the content forms a list at all — the exact issue in the Real World example.',
            fix: 'Replace the styled divs with genuine ul/ol and li elements. Visual appearance can be fully preserved with CSS; only the underlying markup needs to change.',
          },
          {
            error: `List numbering visually resets or restarts unexpectedly mid-page`,
            cause: 'Multiple separate ol elements are being used where a single continuous list was intended — each ol restarts its own numbering at 1 by default unless a start attribute is explicitly set.',
            fix: 'Either combine the items into a single ol, or, if they must remain separate elements for structural reasons, use the start attribute on later ol elements to continue the numbering where the previous one left off.',
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
        'ul is for collections where item order carries no meaning; ol is for sequences where order is genuinely part of the content — test it by asking whether shuffling the items would make the content wrong.',
        'ol supports start, reversed, and type attributes for controlling how its automatic numbering behaves — distinct from CSS-driven visual numbering styles.',
        'li is only valid as a direct child of ul or ol, but can itself contain any flow content — paragraphs, images, links, even a nested list.',
        'A nested list must live inside the li of the parent item it elaborates on, never as a sibling positioned between li elements — that produces invalid HTML.',
        'dl (description list) pairs dt (term) with dd (description) — correct for glossaries, FAQs, and structured label/value metadata, not a deprecated element.',
        'A single dt can be followed by multiple dd elements, and multiple consecutive dt elements can share one dd, for synonyms or grouped terms.',
        'Visual bullet/number styling is fully controlled by CSS (list-style-type and related properties) regardless of which list element is used — never choose ul vs. ol based on appearance alone.',
      ]} />

      {/* ── Next Module CTA ── */}
      <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 10, padding: '24px', marginTop: 40 }}>
        <p style={{ fontSize: 10, color: 'var(--muted)', letterSpacing: '.12em', textTransform: 'uppercase', fontFamily: 'var(--font-mono)', fontWeight: 700, margin: '0 0 10px' }}>
          What comes next
        </p>
        <p style={{ fontSize: 15, color: 'var(--text)', lineHeight: 1.85, margin: '0 0 20px' }}>
          Module 07 covers HTML tables — table, thead/tbody/tfoot, th, td, colspan/rowspan — and exactly
          why tables should never be used for page layout, a mistake with a genuinely important history
          behind it.
        </p>
        <Link href="/learn/html-css/tables" style={{ background: C, color: '#000', padding: '11px 24px', borderRadius: 7, fontWeight: 700, fontSize: 13, textDecoration: 'none', display: 'inline-block' }}>
          Module 07 → Tables — Structure and Correct Usage
        </Link>
      </div>
    </LearnLayout>
  )
}
