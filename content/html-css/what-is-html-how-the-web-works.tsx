import type { Metadata } from 'next'
import { LearnLayout } from '@/components/content/LearnLayout'
import Link from 'next/link'
import { Callout } from '@/components/content/Callout'
import { KeyTakeaways } from '@/components/content/KeyTakeaways'

export const metadata: Metadata = {
  title: 'What is HTML? How the Web Actually Works | Chaduvuko',
  description:
    'Browsers, servers, the DOM, and the HTTP request/response cycle — the foundation every web page sits on, explained from first principles.',
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

export default function WhatIsHtml() {
  return (
    <LearnLayout
      title="What is HTML? How the Web Actually Works"
      description="Browsers, servers, the DOM, and the HTTP request/response cycle — the foundation every web page sits on."
      section="HTML & CSS — Module 01"
      readTime="40 min"
      updatedAt="August 2026"
    >

      {/* ── Part 01 ── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 01 — Clients and Servers" />
        <SectionTitle>Two Machines, One Conversation: The Client and the Server</SectionTitle>

        <Para>
          Every website you have ever visited is, underneath everything else, a conversation between
          two computers. One of them is <strong>your</strong> computer — specifically, the browser
          running on it (Chrome, Safari, Firefox, Edge) — and it is called the <strong>client</strong>.
          The other is a computer somewhere else, usually in a data center, that stores the files a
          website is made of and answers requests for them. That machine is called the{' '}
          <strong>server</strong>. HTML is the language the server sends back, and the browser is the
          program that turns it into the page you actually see.
        </Para>

        <Para>
          This client/server split is the single most important mental model for understanding the web,
          and it is worth being precise about who does what, because almost every bug and every
          performance question in front-end work eventually traces back to "which side of this line did
          that happen on."
        </Para>

        <CodeBox label="The division of responsibility">{`THE CLIENT (your browser)               THE SERVER (a computer somewhere else)
─────────────────────────               ──────────────────────────────────────
- Sends requests for pages/files         - Stores the website's files (HTML,
- Parses HTML into the DOM                 CSS, JS, images) or generates them
- Parses CSS and applies styles            on the fly
- Runs JavaScript                        - Listens for incoming requests
- Paints pixels to your screen           - Decides what to send back, and sends it
- Handles clicks, scrolls, typing        - Has no idea what your screen looks like`}</CodeBox>

        <Para>
          A server does not know or care what browser you are using, how big your screen is, or what
          the page looks like once it arrives. Its job ends the moment it sends the response. Everything
          about how that response gets turned into a visible, interactive page — the entire subject of
          this HTML/CSS track — happens on the client. This is why the same HTML file can look
          completely different in Chrome on a laptop and Safari on a phone: the server sent identical
          bytes to both, and each browser did its own independent job of interpreting them.
        </Para>

        <Callout type="info">
          "The web" is really just an enormous number of client/server conversations happening
          constantly, all using the same shared set of rules for how to ask for things and how to answer.
          Those shared rules are what the rest of this module unpacks — DNS to find the right server,
          HTTP to have the actual conversation, and HTML as the format the answer arrives in.
        </Callout>
      </section>

      <Divider />

      {/* ── Part 02 ── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 02 — DNS" />
        <SectionTitle>DNS — Turning a Name You Type Into an Address a Computer Can Use</SectionTitle>

        <Para>
          When you type <code>chaduvuko.com</code> into a browser, your computer does not actually know
          where that is. Computers on the internet find each other using numeric addresses called{' '}
          <strong>IP addresses</strong> (something like <code>142.250.80.14</code>), not human-readable
          names. The system that translates a domain name into an IP address is called{' '}
          <strong>DNS</strong> — the Domain Name System — and it runs before a single byte of your actual
          request goes anywhere near the website itself.
        </Para>

        <CodeBox label="What happens the instant you press Enter on a URL">{`1. You type "chaduvuko.com" and press Enter
2. Your browser checks its own cache — has it looked this up recently?
3. If not, it asks your OS, which asks a DNS resolver (often run by your ISP)
4. That resolver asks a chain of DNS servers: "who handles .com? who handles
   chaduvuko.com specifically?" — narrowing down step by step
5. Eventually a DNS server responds with an IP address, e.g. 76.76.21.21
6. Your browser now knows WHERE to send the actual page request`}</CodeBox>

        <Para>
          This lookup typically takes somewhere between a few and a few hundred milliseconds, and it is
          entirely invisible in normal browsing — you never see it happen, but every single request for
          a new domain triggers it at least once. Browsers and operating systems cache DNS results for a
          while specifically to avoid repeating this lookup on every single request.
        </Para>

        <Callout type="tip">
          You can see this step directly with the <code>dig</code> or <code>nslookup</code> command in a
          terminal — running <code>dig chaduvuko.com</code> shows you exactly the IP address your browser
          would have resolved before it ever sent a request. It is a genuinely useful first troubleshooting
          step when a site seems completely unreachable, since it tells you whether the problem is "DNS
          cannot find this domain at all" versus "DNS worked fine, but the server itself is not
          responding" — two very different problems with very different fixes.
        </Callout>
      </section>

      <Divider />

      {/* ── Part 03 ── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 03 — The HTTP Request/Response Cycle" />
        <SectionTitle>HTTP — The Actual Conversation Between Browser and Server</SectionTitle>

        <Para>
          Once the browser has an IP address, it opens a connection to that server and sends a{' '}
          <strong>request</strong>, written in a format called <strong>HTTP</strong> (HyperText Transfer
          Protocol — the "HT" in HTML's own name is not a coincidence, they were designed together). The
          server reads the request, decides what to do about it, and sends back a{' '}
          <strong>response</strong>. This request/response pair is the fundamental unit of everything
          that happens on the web — loading a page, submitting a form, an app fetching data — it is
          always, underneath, one of these cycles.
        </Para>

        <CodeBox label="A simplified HTTP request, roughly what your browser actually sends">{`GET /index.html HTTP/1.1
Host: chaduvuko.com
User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15)
Accept: text/html,application/xhtml+xml`}</CodeBox>

        <CodeBox label="A simplified HTTP response, roughly what comes back">{`HTTP/1.1 200 OK
Content-Type: text/html; charset=utf-8
Content-Length: 4531

<!DOCTYPE html>
<html lang="en">
  <head><title>Chaduvuko</title></head>
  <body><h1>Welcome</h1></body>
</html>`}</CodeBox>

        <Para>
          Notice the <code>200 OK</code> at the top of the response — that is an HTTP{' '}
          <strong>status code</strong>, a three-digit number telling the browser how the request went.{' '}
          <code>200</code> means success. You have almost certainly seen <code>404</code> (Not Found) when
          a page does not exist, and possibly <code>500</code> (Internal Server Error) when something
          broke on the server&apos;s end. These codes are grouped by their first digit, and recognising
          the groups is genuinely useful day to day.
        </Para>

        <CodeBox label="HTTP status code families">{`1xx — Informational   (rare in day-to-day work; "request received, continuing")
2xx — Success          200 OK, 201 Created, 204 No Content
3xx — Redirection       301 Moved Permanently, 302 Found, 304 Not Modified
4xx — Client error      400 Bad Request, 401 Unauthorized, 403 Forbidden, 404 Not Found
5xx — Server error      500 Internal Server Error, 502 Bad Gateway, 503 Service Unavailable`}</CodeBox>

        <Para>
          A single page load is rarely just one request/response cycle. The very first response usually
          contains the HTML — and that HTML then references other files (a stylesheet, a script, images,
          fonts) that the browser discovers by reading the HTML and requests <em>separately</em>, each
          with its own request/response cycle. A page with ten images and two stylesheets triggers at
          least thirteen separate HTTP round trips before it is fully loaded, all kicked off by parsing
          that first HTML response.
        </Para>

        <Callout type="warning">
          This is exactly why the order and placement of tags inside <code>&lt;head&gt;</code> and{' '}
          <code>&lt;body&gt;</code>, covered in the next module, genuinely affects real load performance —
          every referenced file is a separate network round trip, and the browser can only discover a
          file it hasn&apos;t parsed yet. A stylesheet linked at the very bottom of a long page delays
          every one of its own requests until the browser has read through everything above it first.
        </Callout>
      </section>

      <Divider />

      {/* ── Part 04 ── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 04 — Rendering" />
        <SectionTitle>What "Rendering a Page" Actually Means, Step by Step</SectionTitle>

        <Para>
          "Rendering" is the umbrella term for everything the browser does between receiving raw HTML
          bytes and showing you actual pixels on screen. It is not one step — it is a pipeline of several
          distinct stages, and understanding them individually is what makes performance concepts later in
          this track (and the CSS track after it) make real sense instead of feeling like folklore.
        </Para>

        <CodeBox label="The rendering pipeline, in order">{`1. PARSE HTML  → builds the DOM (Document Object Model) — a tree of nodes
2. PARSE CSS   → builds the CSSOM (CSS Object Model) — a tree of computed styles
3. RENDER TREE → the DOM and CSSOM are combined: only the nodes that will
                 actually be visible (nothing hidden by "display: none") are kept
4. LAYOUT      → the browser computes the exact size and position of every
                 node in the render tree — "this box is 400px wide, starting
                 at (0, 120)"
5. PAINT       → pixels are actually drawn to the screen, in layers
6. COMPOSITE   → the layers are combined into the final image you see`}</CodeBox>

        <Para>
          The critical detail for right now: step 1 and step 2 happen in <strong>parallel</strong> as the
          browser streams the response, but step 3 (the render tree) cannot start until both the DOM and
          the CSSOM exist — meaning CSS is a genuine blocker to rendering anything at all. A page with
          HTML but no CSS parsed yet does not render partially styled content; the browser holds off on
          painting until it has both trees to combine. This single fact is the entire reason "render
          blocking" is a real, measurable performance concern and not just a phrase in a performance audit
          tool.
        </Para>

        <Callout type="info">
          You will go far deeper into the CSSOM, layout costs, and paint/composite performance in the CSS
          Foundations and Advanced CSS phases later in this track. For now, the one idea to hold onto is
          simple: <strong>HTML becomes the DOM, CSS becomes the CSSOM, and the browser cannot show you
          anything until it has combined both.</strong>
        </Callout>
      </section>

      <Divider />

      {/* ── Part 05 ── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 05 — The DOM" />
        <SectionTitle>The DOM — A Live Tree, Not a Frozen Copy of Your HTML</SectionTitle>

        <Para>
          The DOM (Document Object Model) is what the browser builds by reading your HTML file from top
          to bottom. Every tag becomes a <strong>node</strong> in a tree structure, with parent/child
          relationships that mirror how the tags were nested in the source. This is worth stating
          precisely, because it is the single most misunderstood idea for people new to web development:
          the DOM is not a copy of the HTML file — it is a live, in-memory object structure that{' '}
          <em>starts out</em> matching the HTML, but can be changed afterward by JavaScript, completely
          independently of whatever the original HTML file said.
        </Para>

        <CodeBox label="HTML source">{`<body>
  <h1>Hello</h1>
  <ul>
    <li>One</li>
    <li>Two</li>
  </ul>
</body>`}</CodeBox>

        <CodeBox label="The DOM tree the browser builds from it">{`body
 ├── h1  →  "Hello"
 └── ul
      ├── li  →  "One"
      └── li  →  "Two"

Each tag is a NODE. Nesting in the HTML becomes parent/child relationships
in the tree. Text inside a tag becomes its own text node, a child of the tag.`}</CodeBox>

        <Para>
          Once this tree exists in memory, JavaScript can add nodes, remove nodes, or change their
          attributes and text — and every one of those changes updates the live DOM immediately, without
          ever touching the original HTML file that was downloaded. If a script adds a new{' '}
          <code>&lt;li&gt;</code> after the page loads, that new node exists in the DOM and is visible on
          screen, but it was never part of the HTML the server actually sent. This distinction — the HTML
          file as a one-time starting point versus the DOM as an ongoing, mutable structure — is the
          entire foundation that JavaScript-driven interactivity is built on, and it is exactly what Part
          06 shows you how to observe directly.
        </Para>

        <Callout type="tip">
          Every HTML element you will learn throughout this track — <code>&lt;div&gt;</code>,{' '}
          <code>&lt;p&gt;</code>, <code>&lt;section&gt;</code>, <code>&lt;img&gt;</code> — exists for one
          reason: it becomes a specific kind of DOM node with specific default behavior. Learning HTML is,
          in a very real sense, learning which DOM node each tag produces and what that node does by
          default.
        </Callout>
      </section>

      <Divider />

      {/* ── Part 06 ── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 06 — Source vs Live DOM" />
        <SectionTitle>view-source vs DevTools Elements — Two Different Things That Look Similar</SectionTitle>

        <Para>
          Every browser gives you two different ways to look "under the hood" of a page, and it is
          genuinely important to understand that they are not showing you the same thing.
        </Para>

        <CodeBox label="Two different views of the same page">{`view-source:https://example.com          →  the RAW HTML the server sent,
                                              byte for byte. Never changes,
                                              no matter what JavaScript does
                                              afterward. Read-only.

DevTools → Elements panel                  →  the LIVE DOM, right now, in its
                                              current state — including every
                                              change JavaScript has made since
                                              the page loaded. Editable, and
                                              constantly re-rendered as you
                                              watch it.`}</CodeBox>

        <Para>
          This is not a small technicality. Modern sites frequently modify the DOM heavily after the
          initial HTML arrives — fetching data and inserting it, removing loading placeholders, reacting
          to your clicks. If you view-source on a page built this way, you will often see a nearly empty{' '}
          <code>&lt;body&gt;</code>, because most of what you see on screen was added by JavaScript{' '}
          <em>after</em> the original HTML loaded. Open DevTools and inspect the Elements panel on the
          same page, and you will see the full, current structure — everything that is actually on screen
          right now.
        </Para>

        <Callout type="warning">
          <strong>A mistake beginners make constantly:</strong> "editing" HTML in the DevTools Elements
          panel and being confused when the change disappears on refresh. Elements-panel edits only change
          the live, in-memory DOM for your current session — they never touch the actual HTML file on the
          server, and a page refresh rebuilds the DOM from scratch from that original, unchanged file.
          DevTools editing is genuinely useful for testing an idea or debugging a layout, but it is not a
          way to make a real, permanent change to a site.
        </Callout>
      </section>

      <Divider />

      {/* ── Part 07 ── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 07 — HTML's Place in the Bigger Picture" />
        <SectionTitle>HTML vs CSS vs JavaScript — Three Languages, Three Jobs</SectionTitle>

        <Para>
          Before going further into HTML specifically, it is worth being precise about what HTML is{' '}
          <em>for</em>, since that scope defines the boundary of this entire track&apos;s first phase and
          shapes every decision about which tag to reach for later on.
        </Para>

        <CodeBox label="The three-layer model of a web page">{`HTML   →  STRUCTURE and MEANING.  What is this content? A heading? A list?
          A form? A navigation menu? HTML answers "what is this," not "what
          does it look like" or "what does it do."

CSS    →  PRESENTATION.  How should this content look? Colors, spacing,
          layout, fonts, animation. CSS answers "how does this appear,"
          and is the entire subject of Phases 3-5 of this track.

JAVASCRIPT →  BEHAVIOR.  What happens when the user interacts with this?
          Click handlers, form validation logic, fetching new data. Not
          covered in this track, but everything you learn about the DOM
          here is exactly what JavaScript manipulates.`}</CodeBox>

        <Para>
          This separation is a deliberate design decision, not an accident of history, and it is one of
          the most consequential ideas in front-end engineering: a well-built page should still make{' '}
          <em>sense</em> — its structure and meaning should still be intact — even with every line of CSS
          and JavaScript removed. A page that only "looks right" because of clever CSS tricks, with
          meaningless <code>&lt;div&gt;</code> tags standing in for headings, buttons, and lists, has
          broken this separation. You will see exactly why that matters concretely in the Semantic HTML
          module later in this phase, and it comes up constantly in real code review.
        </Para>

        <Callout type="info">
          A genuinely useful test while learning HTML: if you deleted every <code>&lt;style&gt;</code> tag
          and every <code>&lt;script&gt;</code> tag from a page, would the remaining plain HTML still make
          logical sense read top to bottom — headings before their content, a list actually marked up as
          a list, a form that is recognizable as a form? If yes, the HTML is doing its job. If the page
          becomes an unreadable pile of generic boxes, the structure layer has been neglected in favor of
          only the presentation layer.
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
        <SectionTitle>Debugging a "Missing Content" Ticket at a Seattle Retail Startup</SectionTitle>

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
            Scenario — E-commerce startup, Seattle · SEO ticket
          </div>

          <Para>
            A junior engineer at a Seattle-based outdoor-gear retailer gets a ticket from the marketing
            team: "Google isn&apos;t indexing our new product descriptions — they show up fine when I look
            at the page, but search results show the old, empty preview." The engineer opens the product
            page in a browser, sees the descriptions rendered perfectly, and is confused — the content is{' '}
            <em>right there</em>.
          </Para>

          <SubSubTitle>What's actually happening</SubSubTitle>

          <Para>
            The product page fetches its description text from an internal API and inserts it into the
            DOM with JavaScript, after the initial page load — exactly the pattern from Part 06. What the
            engineer is looking at in the browser is the live DOM, fully populated. But Google&apos;s basic
            crawler (and the marketing team&apos;s "preview" tool) only reads the raw HTML response — the
            same thing <code>view-source</code> shows — and in that raw response, the description area is
            an empty <code>&lt;div&gt;</code> waiting for JavaScript to fill it in later.
          </Para>

          <CodeBox label="What the crawler actually receives (view-source)">{`<div id="product-description"></div>
<script src="/js/load-description.js"></script>
<!-- The real text only appears after this script runs in a real browser -->`}</CodeBox>

          <CodeBox label="What a human sees in DevTools → Elements, after JS runs">{`<div id="product-description">
  <p>Waterproof, breathable 3-layer shell built for Pacific
  Northwest weather. Adjustable hood, pit zips, 20,000mm rating.</p>
</div>`}</CodeBox>

          <Para>
            The fix the team ships is to render the description directly into the initial HTML response on
            the server, instead of fetching it client-side after the page loads — so the very first HTTP
            response (Part 03) already contains the real text, and a crawler that never runs JavaScript
            sees exactly what a human sees. The bug was never visible to the engineer manually testing in
            a browser, because a browser always runs the JavaScript. It only became visible once someone
            checked what the raw HTTP response actually contained — precisely the view-source vs live-DOM
            distinction from Part 06.
          </Para>

          <Para>
            This exact class of bug — "the content is definitely there when a human looks, but a tool that
            only reads raw HTML sees nothing" — comes up constantly in real front-end work, and it is not
            limited to search engines: link-preview generators for Slack and iMessage, social-media
            "unfurl" cards, and accessibility tools that skip JavaScript all hit the same wall.
          </Para>
        </div>
      </section>

      <Divider />

      {/* ── Part 09 — Misconceptions ── */}
      <section style={{ marginBottom: 64 }} data-toc-kind="myth">
        <SectionTag text="// Part 09 — Misconceptions" />
        <SectionTitle>Four Misconceptions About How the Web Works</SectionTitle>

        {[
          {
            wrong: '"The DOM and the HTML source are basically the same thing"',
            right: 'The DOM starts out matching the HTML that was parsed, but it is a live, in-memory tree that JavaScript can freely change afterward. view-source always shows the original HTML file; DevTools Elements always shows the current, possibly very different, live DOM.',
          },
          {
            wrong: '"A page loads in one single request"',
            right: 'The very first response usually contains only the HTML. That HTML then references other files — stylesheets, scripts, images, fonts — each of which triggers its own separate HTTP request once the browser discovers it while parsing.',
          },
          {
            wrong: '"CSS is optional for the page to display something"',
            right: 'The browser cannot build a render tree, and therefore cannot paint anything, until it has both the DOM and the CSSOM. CSS genuinely blocks rendering — it is not an enhancement layered on top of an already-visible page.',
          },
          {
            wrong: '"Editing HTML in DevTools changes the real website"',
            right: 'Elements-panel edits only exist in your browser\'s current in-memory DOM. They vanish on refresh and were never sent to, or stored on, the server. It is a debugging and prototyping tool, not a way to publish real changes.',
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
            q: 'Walk through what happens, step by step, from typing a URL to seeing a rendered page.',
            a: 'The browser resolves the domain to an IP address via DNS, opens a connection to the server at that address, and sends an HTTP request. The server responds with a status code and, usually, an HTML body. The browser parses that HTML into the DOM while, in parallel, requesting and parsing any linked CSS into the CSSOM. Once both exist, they combine into a render tree, the browser computes layout (size and position of every visible node), then paints and composites the final pixels to the screen — and along the way, any additional resources the HTML referenced (images, fonts, scripts) are requested as separate HTTP round trips.',
          },
          {
            q: 'What is the difference between the DOM and the HTML source code?',
            a: 'The HTML source is the raw file the server sent — static, and unaffected by anything that happens afterward. The DOM is the live, in-memory tree structure the browser builds by parsing that HTML, and it can be, and very often is, changed by JavaScript after the page loads. view-source always shows the original HTML; DevTools\' Elements panel always shows the current DOM, which may have diverged significantly from the source.',
          },
          {
            q: 'Why can CSS block rendering, and what does that mean in practice?',
            a: 'The browser cannot build a render tree — the combination of DOM and CSSOM that determines what is actually visible and how — until both trees exist. Since CSS parsing has to complete before that combination can happen, a stylesheet the browser hasn\'t finished downloading and parsing yet delays the first paint of the whole page, not just the styled parts. This is why stylesheet placement and loading strategy is a real, measurable performance lever, not a stylistic choice.',
          },
          {
            q: 'A page shows content correctly in a browser but a tool that only fetches the HTML (like a bot, crawler, or link-preview generator) shows nothing. What is the likely cause?',
            a: 'The content is very likely being inserted into the DOM by JavaScript after the initial page load, rather than being present in the raw HTML response itself. A browser always runs that JavaScript, so a human sees the full content. A tool that only reads the raw HTTP response — the same thing view-source shows — sees the page before that JavaScript ever ran, often an empty placeholder element. The fix is usually rendering the content server-side, so it\'s already present in the initial HTML response.',
          },
          {
            q: 'What is an HTTP status code, and what do the main categories mean?',
            a: 'A three-digit number in the HTTP response indicating how the request went. 2xx means success (200 OK is the most common). 3xx means redirection (the resource has moved). 4xx means the client\'s request had a problem (404 Not Found, 403 Forbidden). 5xx means the server itself failed while handling an otherwise-valid request (500 Internal Server Error, 503 Service Unavailable). Recognizing the first digit alone tells you which side of the client/server line a problem most likely originated on.',
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
        <SectionTitle>Mistakes Beginners Make Around How Pages Actually Load</SectionTitle>

        {[
          {
            q: 'Assuming a page that "looks right" in a browser is guaranteed to look right everywhere',
            a: 'A browser always runs JavaScript and always fetches every linked resource. Crawlers, link-preview bots, some accessibility tools, and slow/unreliable connections may see a very different, less-complete version of the page — check the raw HTML response (view-source or a plain curl of the URL), not just what renders locally.',
          },
          {
            q: 'Testing "does the site work" only by checking the visual result, never the network requests',
            a: 'A page can visually appear correct while quietly failing several requests in the background (a broken image, a font that 404s, a script that silently errors), because the browser renders what it can and just leaves gaps for what it can\'t. The Network tab in DevTools, not the rendered page alone, is what actually confirms every resource loaded successfully.',
          },
          {
            q: 'Believing DNS and HTTP are "backend stuff" that front-end work never touches',
            a: 'Every single asset a page loads — HTML, CSS, JS, images, fonts — goes through this exact DNS-then-HTTP cycle. Understanding it is what makes concepts like render-blocking CSS, lazy-loaded images, and caching headers make sense later in this track, rather than feeling like arbitrary rules to memorize.',
          },
          {
            q: 'Editing the live DOM in DevTools and assuming the change is now "saved"',
            a: 'DevTools edits are session-only and vanish on refresh. To make a real change, the underlying HTML file (or the code that generates it) has to be edited and the site redeployed — DevTools is for inspecting and experimenting, not publishing.',
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
        <SectionTitle>Errors and Symptoms You Will Hit — And Exactly Why</SectionTitle>

        {[
          {
            error: `DNS_PROBE_FINISHED_NXDOMAIN (Chrome) / "Server not found" (Firefox)`,
            cause: 'DNS could not resolve the domain name to any IP address at all — either the domain does not exist, was typed incorrectly, or its DNS records are not configured/propagated yet.',
            fix: 'Double-check the spelling of the domain. If it is a domain you control, verify its DNS records with "dig yourdomain.com" and confirm they point to the correct server. Newly registered domains can take time to propagate.',
          },
          {
            error: `ERR_CONNECTION_REFUSED`,
            cause: 'DNS resolved successfully (the browser found an IP address), but no server responded at that address on the expected port — often because the server process is down, or a firewall is blocking the connection.',
            fix: 'Confirm the server/service is actually running. If this is a local development server, make sure you started it and are using the correct port.',
          },
          {
            error: `404 Not Found`,
            cause: 'The server was reachable and responded, but it has no resource matching the requested path — a common cause is a typo in a file path, a link pointing to a page that was renamed or removed, or a resource that was never deployed.',
            fix: 'Check the exact URL/path being requested against what actually exists on the server. Case sensitivity matters on many servers even if it doesn\'t on your local machine.',
          },
          {
            error: `Mixed Content: The page was loaded over HTTPS, but requested an insecure resource over HTTP. This request has been blocked.`,
            cause: 'A page served securely (https://) links to a resource (an image, script, or stylesheet) using a plain http:// URL. Browsers block this by default because it would let an attacker tamper with that one insecure resource even on an otherwise-secure page.',
            fix: 'Change the resource URL to https://, or better, to a protocol-relative or root-relative path (covered in the Links and Navigation module) so it automatically matches whatever protocol the page itself was loaded with.',
          },
          {
            error: `A page appears completely blank/empty when fetched by a bot, curl, or a "view page source" check, despite rendering fine in a real browser`,
            cause: 'The visible content is being inserted into the DOM by JavaScript after the initial HTML response, exactly as covered in the Real World example — tools that only read the raw HTTP response never see it.',
            fix: 'Render the essential content server-side so it is present in the initial HTML response, rather than relying entirely on client-side JavaScript to insert it after the fact.',
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
        'The web is a conversation between a client (your browser) and a server. The server sends files and has no idea how they will end up looking; the client (browser) is entirely responsible for turning them into a visible page.',
        'DNS translates a domain name (chaduvuko.com) into an IP address the browser can actually connect to — this lookup happens before any HTTP request is sent.',
        'HTTP is the request/response protocol underlying every page load. A single page load is almost always multiple HTTP round trips — one for the HTML, then one more for every stylesheet, script, image, and font it references.',
        'Rendering is a pipeline: parse HTML into the DOM, parse CSS into the CSSOM, combine them into a render tree, compute layout, then paint and composite. The browser cannot paint anything until it has both the DOM and the CSSOM.',
        'The DOM is a live, in-memory tree built from the HTML — but it can be changed by JavaScript after the page loads, and often is. It is not a frozen copy of the HTML file.',
        'view-source always shows the original, static HTML the server sent. DevTools\' Elements panel always shows the current, live DOM — the two can look very different on a JavaScript-heavy page.',
        'HTML is responsible for structure and meaning, CSS for presentation, JavaScript for behavior — a well-built page should still make logical sense with all CSS and JS removed.',
      ]} />

      {/* ── Next Module CTA ── */}
      <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 10, padding: '24px', marginTop: 40 }}>
        <p style={{ fontSize: 10, color: 'var(--muted)', letterSpacing: '.12em', textTransform: 'uppercase', fontFamily: 'var(--font-mono)', fontWeight: 700, margin: '0 0 10px' }}>
          What comes next
        </p>
        <p style={{ fontSize: 15, color: 'var(--text)', lineHeight: 1.85, margin: '0 0 20px' }}>
          Module 02 zooms into the HTML document itself — the exact skeleton every page starts from, why{' '}
          <code>&lt;!DOCTYPE html&gt;</code> silently changes how the entire page is interpreted, and the
          mistakes that break rendering without ever throwing a visible error.
        </p>
        <Link href="/learn/html-css/document-structure" style={{ background: C, color: '#000', padding: '11px 24px', borderRadius: 7, fontWeight: 700, fontSize: 13, textDecoration: 'none', display: 'inline-block' }}>
          Module 02 → Document Structure — DOCTYPE, html, head, body
        </Link>
      </div>
    </LearnLayout>
  )
}
