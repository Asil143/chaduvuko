import type { Metadata } from 'next'
import { LearnLayout } from '@/components/content/LearnLayout'
import Link from 'next/link'
import { Callout } from '@/components/content/Callout'
import { KeyTakeaways } from '@/components/content/KeyTakeaways'

export const metadata: Metadata = {
  title: 'Working with APIs in Python | Chaduvuko',
  description:
    'The requests library, REST calls, authentication, and error handling for talking to real-world APIs.',
}

const C = '#4285f4'

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

export default function WorkingWithAPIsPython() {
  return (
    <LearnLayout
      title="Working with APIs in Python"
      description="The requests library, REST calls, authentication, and the error-handling patterns real production code needs when talking to the outside world."
      section="Python — Module 37"
      readTime="50 min"
      updatedAt="August 2026"
    >

      {/* ── Part 01 ── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 01 — requests and Your First GET" />
        <SectionTitle>Talking to a Web API — The requests Library</SectionTitle>

        <Para>
          Almost every real application eventually needs to talk to something outside itself — a
          payment processor, a weather service, an internal microservice owned by another team. That
          conversation almost always happens over HTTP, using the same request/response model a browser
          uses when it loads a page, except the response is data (usually JSON) instead of HTML meant
          for a human to read.
        </Para>

        <Para>
          Python&apos;s standard library has a built-in way to make HTTP requests (<code>urllib</code>),
          but it is verbose and easy to get wrong. <code>requests</code> — a third-party package,
          installed with <code>pip install requests</code> — became the de facto standard years ago
          precisely because it makes the common case simple, and it is what you will find in the
          overwhelming majority of real Python codebases that talk to APIs.
        </Para>

        <CodeBox label="A first GET request">{`import requests

response = requests.get("https://api.github.com/users/octocat")

print(response.status_code)   # 200
print(response.headers["content-type"])   # application/json; charset=utf-8
print(response.text[:80])     # the raw response body, as a string`}</CodeBox>

        <Para>
          <code>requests.get()</code> returns a <code>Response</code> object, not the data itself — it
          carries the status code, the headers, and the body, all together, so you can inspect exactly
          what came back before deciding how to use it. This is a deliberate design: unlike a plain
          function that either returns your data or throws, <code>requests</code> hands you the full
          picture and lets you decide what &quot;success&quot; means for your specific call, which
          matters a great deal once you reach Part 03.
        </Para>
      </section>

      <Divider />

      {/* ── Part 02 ── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 02 — Params, Headers, and POST" />
        <SectionTitle>Query Parameters, Custom Headers, and Sending Data</SectionTitle>

        <SubTitle>Query parameters</SubTitle>

        <Para>
          Rather than manually building a URL with a trailing <code>?key=value&amp;key2=value2</code>{' '}
          string — easy to get wrong, especially once a value needs URL-encoding — pass a plain
          dictionary as the <code>params</code> argument, and <code>requests</code> builds the query
          string correctly for you.
        </Para>

        <CodeBox label="Query parameters via params=">{`import requests

response = requests.get(
    "https://api.openweathermap.org/data/2.5/weather",
    params={"q": "Austin,TX,US", "units": "imperial", "appid": "YOUR_KEY"},
)

print(response.url)
# https://api.openweathermap.org/data/2.5/weather?q=Austin%2CTX%2CUS&units=imperial&appid=YOUR_KEY
# — note "Austin,TX,US" was automatically URL-encoded; you never had to think about it`}</CodeBox>

        <SubTitle>Headers</SubTitle>

        <Para>
          Headers describe metadata about the request — what format you accept back, how you are
          authenticating (Part 04), or a custom header a specific API requires. Pass them as a
          dictionary too, via the <code>headers</code> argument.
        </Para>

        <CodeBox label="Custom headers">{`response = requests.get(
    "https://api.example.com/orders",
    headers={"Accept": "application/json", "X-Client-Version": "3.2.1"},
)`}</CodeBox>

        <SubTitle>POST requests — sending a JSON body</SubTitle>

        <Para>
          Creating or updating something on the server almost always means a <code>POST</code> (or{' '}
          <code>PUT</code>/<code>PATCH</code>) request with a body. Passing a Python dictionary as the{' '}
          <code>json</code> argument (not <code>data</code>) does two things at once — it serializes the
          dictionary to a JSON string, and it sets the{' '}
          <code>{`Content-Type: application/json`}</code> header automatically, which most modern APIs
          require in order to parse the body correctly at all.
        </Para>

        <CodeBox label="POST with a JSON body — the pattern you will use constantly">{`import requests

payload = {"customer_id": 4471, "item": "wireless-mouse", "quantity": 2}

response = requests.post(
    "https://api.example.com/orders",
    json=payload,
    headers={"Authorization": "Bearer YOUR_TOKEN"},
)

print(response.status_code)   # 201, typically, for a successful creation
created_order = response.json()`}</CodeBox>

        <Callout type="tip">
          <strong>json= vs data=</strong> — <code>json=payload</code> serializes a dict to JSON and sets
          the content type header for you; <code>data=payload</code> sends a plain
          form-urlencoded body instead, which is what older or non-JSON APIs (and HTML forms) actually
          expect. Sending <code>data=</code> to an API that requires JSON is a genuinely common source
          of confusing 400 errors — always check which one the API you are calling documents.
        </Callout>
      </section>

      <Divider />

      {/* ── Part 03 ── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 03 — Status Codes" />
        <SectionTitle>Status Codes and raise_for_status() — Failing Loudly, Not Silently</SectionTitle>

        <Para>
          <code>requests</code> does <strong>not</strong> raise an exception just because a server
          responded with an error status like 404 or 500 — as far as the HTTP transport is concerned,
          a 500 Internal Server Error is still a complete, successful response; it just happens to carry
          bad news in its status code. If your code doesn&apos;t explicitly check for this, it will
          happily treat an error page as if it were real data.
        </Para>

        <CodeBox label="The silent failure — nothing here raises an exception">{`response = requests.get("https://api.example.com/orders/99999999")
print(response.status_code)   # 404 — the order doesn't exist

data = response.json()   # might raise its own error, or might return an
                          # {"error": "not found"} body that your code processes
                          # as if it were a real order, with no crash at all`}</CodeBox>

        <Para>
          <code>response.raise_for_status()</code> closes this gap: it inspects the status code and
          raises an <code>requests.exceptions.HTTPError</code> if it is 4xx or 5xx, doing nothing at all
          if it is 2xx. Calling it immediately after every request is one of the single highest-value
          habits in this entire module.
        </Para>

        <CodeBox label="raise_for_status() — turning a silent bad response into a loud, catchable error">{`response = requests.get("https://api.example.com/orders/99999999")
response.raise_for_status()   # raises HTTPError here — code below never runs
data = response.json()

# requests.exceptions.HTTPError: 404 Client Error: Not Found for url:
# https://api.example.com/orders/99999999`}</CodeBox>

        <CodeBox label="The status code ranges worth knowing">{`2xx   Success — 200 OK, 201 Created, 204 No Content (success, empty body)
3xx   Redirection — requests follows these automatically by default
4xx   Client error — YOUR request was wrong (401 Unauthorized, 404 Not Found,
      429 Too Many Requests — you are being rate-limited)
5xx   Server error — the API itself failed; often worth retrying (Part 06)`}</CodeBox>
      </section>

      <Divider />

      {/* ── Part 04 ── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 04 — Authentication" />
        <SectionTitle>API Keys and Bearer Tokens</SectionTitle>

        <Para>
          Most real APIs require proving who you are on every request. The two patterns you will meet
          constantly are an <strong>API key</strong> (a fixed secret string identifying your
          application) and a <strong>bearer token</strong> (typically a short-lived token obtained after
          a login/OAuth step). Both are almost always sent as a header, not as a URL parameter — putting
          a secret in a URL means it ends up in server logs, browser history, and any proxy in between.
        </Para>

        <CodeBox label="API key — commonly a custom header">{`response = requests.get(
    "https://api.example.com/data",
    headers={"X-API-Key": "sk_live_51H8..."},
)`}</CodeBox>

        <CodeBox label="Bearer token — the standard Authorization header format">{`response = requests.get(
    "https://api.example.com/account",
    headers={"Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."},
)`}</CodeBox>

        <Para>
          The exact header name and format (<code>X-API-Key</code>, <code>Authorization: Bearer ...</code>
          , <code>Authorization: Token ...</code>) varies by provider — always check the specific API&apos;s
          documentation rather than assuming.
        </Para>

        <Callout type="warning">
          <strong>Never hardcode a real API key or token directly in source code.</strong> It ends up in
          your git history permanently, even if you delete it in a later commit, and it is one of the
          single most common ways credentials leak in real incidents (automated scanners actively search
          public GitHub repos for exactly this pattern). Load secrets from environment variables (
          <code>os.environ[&quot;API_KEY&quot;]</code>) or a dedicated secrets manager, and add any local{' '}
          <code>.env</code> file to <code>.gitignore</code>.
        </Callout>
      </section>

      <Divider />

      {/* ── Part 05 ── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 05 — The Missing-Timeout Trap" />
        <SectionTitle>The Single Most Common Production Bug in requests Code</SectionTitle>

        <Para>
          Here is a fact that catches an enormous number of engineers, often only after it causes a real
          incident: <code>requests</code> has <strong>no default timeout</strong>. If the server on the
          other end never responds — a network issue, an overloaded upstream service, a firewall
          silently dropping the connection — a call like <code>requests.get(url)</code> with no timeout
          argument will simply hang, waiting indefinitely, for as long as the process is alive.
        </Para>

        <CodeBox label="The bug — this can hang forever, and there is nothing stopping it">{`import requests

# If this endpoint never responds, this line never returns.
# Not "eventually times out" — genuinely never, by default.
response = requests.get("https://api.example.com/slow-endpoint")`}</CodeBox>

        <Para>
          In a script run once from a terminal, a hang is merely annoying. In a production service, it
          is a genuinely serious failure mode: a worker thread or process blocked on a single hung
          request stops doing anything else, requests pile up behind it, and — depending on how the
          service is deployed — this can exhaust an entire worker pool and take the whole service down,
          triggered by one slow upstream dependency that never actually errored, just never answered.
        </Para>

        <CodeBox label="The fix — always pass a timeout, on every call, no exceptions">{`response = requests.get(
    "https://api.example.com/slow-endpoint",
    timeout=5,   # seconds — raises requests.exceptions.Timeout if exceeded
)

# A tuple lets you set connect and read timeouts separately —
# genuinely useful, since a slow TCP handshake and a slow response body
# are different failure modes worth distinguishing:
response = requests.get(
    "https://api.example.com/slow-endpoint",
    timeout=(3.05, 10),   # (connect timeout, read timeout)
)`}</CodeBox>

        <Callout type="warning">
          <strong>timeout is not optional, and there is no sane global default to fall back on.</strong>{' '}
          Treat a missing <code>timeout=</code> argument on any <code>requests</code> call as a bug,
          every time, in every code review. A reasonable habit: define a shared default (e.g.{' '}
          <code>DEFAULT_TIMEOUT = 5</code>) once per project and pass it everywhere, rather than
          re-deciding the number — or forgetting it — on every single call site.
        </Callout>
      </section>

      <Divider />

      {/* ── Part 06 ── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 06 — Parsing JSON and Handling Network Failures" />
        <SectionTitle>What Can Actually Go Wrong, and Catching It Correctly</SectionTitle>

        <SubTitle>response.json() can itself fail</SubTitle>

        <Para>
          <code>response.json()</code> parses the response body as JSON and raises a{' '}
          <code>requests.exceptions.JSONDecodeError</code> if the body isn&apos;t valid JSON at all —
          which happens more often than it sounds, since a misconfigured proxy, a maintenance page, or a
          plain-text error message from a load balancer can all return a 200 or an error status with an
          HTML or plain-text body instead of JSON.
        </Para>

        <CodeBox label="Defensive JSON parsing">{`try:
    response = requests.get(url, timeout=5)
    response.raise_for_status()
    data = response.json()
except requests.exceptions.JSONDecodeError:
    log_error(f"Non-JSON response from {url}: {response.text[:200]!r}")
    raise`}</CodeBox>

        <SubTitle>The requests exception hierarchy</SubTitle>

        <Para>
          Every exception <code>requests</code> can raise inherits from{' '}
          <code>requests.exceptions.RequestException</code>, which makes it possible to catch broad
          network problems in one place while still handling specific cases (like a timeout) differently
          when it matters.
        </Para>

        <CodeBox label="Catching the exceptions you will actually see in production">{`import requests

try:
    response = requests.get(url, timeout=5)
    response.raise_for_status()
except requests.exceptions.Timeout:
    log_error(f"Timed out calling {url}")
except requests.exceptions.ConnectionError:
    log_error(f"Could not connect to {url} — DNS failure, refused connection, or network is down")
except requests.exceptions.HTTPError as e:
    log_error(f"{url} returned an error status: {e}")
except requests.exceptions.RequestException as e:
    # catches anything else in the requests exception family —
    # a genuine safety net, without swallowing unrelated bugs the way a bare
    # "except:" would (see the Exception Handling module for why that matters)
    log_error(f"Unexpected requests error calling {url}: {e}")
    raise`}</CodeBox>

        <SubTitle>Retries with backoff</SubTitle>

        <Para>
          A single transient failure — a brief network blip, a 503 while an upstream service restarts —
          is often worth retrying automatically rather than failing the whole operation immediately.{' '}
          <code>urllib3</code> (which <code>requests</code> is built on) ships a <code>Retry</code>{' '}
          helper that can be attached to a session to retry automatically, with exponential backoff, on
          specific status codes.
        </Para>

        <CodeBox label="Automatic retries with exponential backoff">{`import requests
from requests.adapters import HTTPAdapter
from urllib3.util.retry import Retry

session = requests.Session()
retry_strategy = Retry(
    total=3,                                 # retry up to 3 times
    backoff_factor=0.5,                      # 0.5s, 1s, 2s between attempts
    status_forcelist=[429, 500, 502, 503, 504],
)
session.mount("https://", HTTPAdapter(max_retries=retry_strategy))

response = session.get("https://api.example.com/data", timeout=5)`}</CodeBox>

        <Callout type="info">
          Retries are appropriate for <em>transient</em> failures (timeouts, 5xx, rate limiting) — never
          retry a 4xx client error like 400 or 404 automatically; the request itself was wrong, and
          retrying it will just fail identically every time while adding latency.
        </Callout>
      </section>

      <Divider />

      {/* ── Part 07 ── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 07 — Session Reuse" />
        <SectionTitle>requests.Session() — Connection Pooling for Repeated Calls</SectionTitle>

        <Para>
          Every plain <code>requests.get(...)</code> or <code>requests.post(...)</code> call, on its
          own, opens a fresh TCP connection (and, for HTTPS, redoes the full TLS handshake) — real,
          measurable overhead that adds up quickly if your code makes many calls to the same host, such
          as paginating through an API&apos;s results or calling several endpoints on the same service
          in a row.
        </Para>

        <CodeBox label="Without a session — a new connection for every single call">{`import requests

for page in range(1, 11):
    response = requests.get(
        "https://api.example.com/orders",
        params={"page": page},
        timeout=5,
    )
    process(response.json())
# 10 separate TCP connections and TLS handshakes to the same host`}</CodeBox>

        <CodeBox label="With a session — connections are reused (keep-alive), genuinely faster">{`import requests

with requests.Session() as session:
    session.headers.update({"Authorization": "Bearer YOUR_TOKEN"})

    for page in range(1, 11):
        response = session.get(
            "https://api.example.com/orders",
            params={"page": page},
            timeout=5,
        )
        process(response.json())
# The underlying TCP connection is kept alive and reused across all 10 calls`}</CodeBox>

        <Para>
          A <code>Session</code> also lets you set default headers (like <code>Authorization</code>)
          once instead of repeating them on every call, which is both less error-prone and exactly what
          the retry configuration from Part 06 is typically attached to. For any code making more than a
          handful of calls to the same host, reaching for a <code>Session</code> over plain{' '}
          <code>requests.get()</code> calls is close to a default best practice.
        </Para>
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
        <SectionTitle>The Missing Timeout That Took Down an Austin Fintech&apos;s Checkout</SectionTitle>

        <div style={{
          background: 'var(--surface)', border: '1px solid var(--border)',
          borderRadius: 12, padding: '24px 28px', marginBottom: 24,
        }}>
          <div style={{
            fontSize: 11, fontWeight: 700, color: 'var(--accent)',
            background: 'rgba(66,133,244,0.1)', border: '1px solid rgba(66,133,244,0.2)',
            borderRadius: 6, padding: '4px 10px', fontFamily: 'var(--font-mono)',
            display: 'inline-block', marginBottom: 20, letterSpacing: '.1em',
            textTransform: 'uppercase',
          }}>
            Scenario — Payments startup, Austin · Production incident, 2:14am
          </div>

          <Para>
            A checkout service calls a third-party fraud-scoring API as one step in processing every
            order — a call written eight months earlier, working fine in every test and in production,
            right up until the night the fraud-scoring vendor had a partial outage: their servers
            accepted connections but simply stopped sending responses for a subset of requests.
          </Para>

          <SubSubTitle>What actually happened</SubSubTitle>

          <CodeBox label="The call responsible — written months earlier, never revisited">{`def check_fraud_score(order):
    response = requests.post(
        "https://fraud-api.vendor.com/score",
        json={"order_id": order.id, "amount": order.total},
        headers={"Authorization": f"Bearer {FRAUD_API_KEY}"},
    )
    response.raise_for_status()
    return response.json()["score"]`}</CodeBox>

          <Para>
            No <code>timeout=</code> argument, anywhere. When the vendor&apos;s servers stopped
            responding, every checkout worker thread that called <code>check_fraud_score()</code> simply
            hung — not erroring, not timing out, just waiting. Within about eleven minutes, every worker
            in the checkout service&apos;s thread pool was stuck on this exact call, and the entire
            checkout flow stopped processing orders for every customer, not just the ones whose fraud
            check happened to hit the affected vendor servers.
          </Para>

          <SubSubTitle>The fix, and what changed afterward</SubSubTitle>

          <CodeBox label="The immediate fix, deployed during the incident">{`def check_fraud_score(order):
    response = requests.post(
        "https://fraud-api.vendor.com/score",
        json={"order_id": order.id, "amount": order.total},
        headers={"Authorization": f"Bearer {FRAUD_API_KEY}"},
        timeout=(3, 5),
    )
    response.raise_for_status()
    return response.json()["score"]`}</CodeBox>

          <Para>
            The longer-term fix mattered more: the team added a lint rule — enforced in CI, exactly
            like the bare-<code>except:</code> rule mentioned in the Exception Handling module — that
            fails a build on any <code>requests.get/post/put/patch/delete</code> call missing an
            explicit <code>timeout=</code> argument. A single missing keyword argument, in one function,
            had been enough to take down checkout for every customer, for eleven minutes, because of one
            vendor&apos;s outage that should have only affected fraud scoring specifically.
          </Para>
        </div>
      </section>

      <Divider />

      {/* ── Part 09 — Misconceptions ── */}
      <section style={{ marginBottom: 64 }} data-toc-kind="myth">
        <SectionTag text="// Part 09 — Misconceptions" />
        <SectionTitle>Four Misconceptions About Working with APIs in Python</SectionTitle>

        {[
          {
            wrong: '"requests will time out on its own eventually if a server doesn\'t respond"',
            right: 'There is no default timeout at all — a call with no timeout= argument can hang indefinitely, exactly as shown in the Real World incident above. Always pass an explicit timeout on every request.',
          },
          {
            wrong: '"A 404 or 500 response will raise an exception automatically, just like a network failure would"',
            right: 'requests only raises an exception for genuine transport-level failures (a timeout, a connection refused) — an HTTP error status like 404 or 500 is still a complete, "successful" response as far as the transport is concerned. You must call raise_for_status() (or check response.status_code yourself) to turn an error status into an exception.',
          },
          {
            wrong: '"json= and data= are basically interchangeable ways to send a request body"',
            right: 'json=payload serializes a dict to a JSON string and sets Content-Type: application/json automatically; data=payload sends form-urlencoded data instead, which many modern JSON APIs will reject outright, often with a confusing 400 error that doesn\'t obviously point back to this distinction.',
          },
          {
            wrong: '"It doesn\'t matter whether you use a Session or plain requests.get() calls — the performance difference is negligible"',
            right: 'A Session reuses the underlying TCP connection (and TLS handshake) across multiple requests to the same host, which is a genuinely measurable speedup for anything making more than a handful of calls to the same API — pagination loops being the most common example.',
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
            q: 'Why is it important to always pass a timeout to a requests call, and what happens if you don\'t?',
            a: 'requests has no default timeout — without one, a call can hang indefinitely if the server never responds, which is different from and worse than a normal error, since nothing fails loudly. In a production service, a single hung call can block a worker thread or process, and if enough calls hang simultaneously it can exhaust an entire worker pool, taking down functionality unrelated to the slow dependency. Always pass timeout= (ideally as a tuple of connect and read timeouts) on every request.',
          },
          {
            q: 'Does requests raise an exception for a 404 or 500 response? Why or why not?',
            a: 'No — a 4xx or 5xx status is still a complete, successful HTTP response from the transport\'s perspective; requests only raises for genuine transport failures like connection errors or timeouts. Calling response.raise_for_status() explicitly checks the status code and raises an HTTPError for 4xx/5xx responses, which is necessary because otherwise code can silently treat an error page as if it were valid data.',
          },
          {
            q: 'What is the difference between the json= and data= arguments to requests.post()?',
            a: 'json=payload serializes a Python dict to a JSON string body and automatically sets the Content-Type: application/json header. data=payload sends the payload as form-urlencoded data instead (or raw bytes/string if given directly), which is the wrong format for most modern JSON APIs and often produces a confusing 400 error rather than an obvious one.',
          },
          {
            q: 'Where should authentication credentials like API keys go in a request, and where should they never go?',
            a: 'Credentials should be sent as a header — commonly Authorization: Bearer <token> or a custom header like X-API-Key — and loaded at runtime from environment variables or a secrets manager, never hardcoded in source code. They should never be placed in a URL query parameter, since URLs are commonly logged by servers, proxies, and browser history, exposing the credential far more broadly than a header would.',
          },
          {
            q: 'What does requests.Session() provide that repeated plain requests.get() calls do not?',
            a: 'A Session reuses the underlying TCP connection (avoiding a fresh handshake, and for HTTPS a fresh TLS negotiation, on every call) when making multiple requests to the same host, which is a real, measurable performance improvement. It also lets you set default headers, cookies, and retry/adapter configuration once, applied automatically to every request made through that session, rather than repeating them on every call.',
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
        <SectionTitle>API Integration Mistakes Engineers Make Constantly</SectionTitle>

        {[
          {
            q: 'Making a requests call with no timeout=',
            a: 'As shown in the Real World example, this can hang indefinitely and, in a threaded or process-pooled service, can exhaust the entire worker pool from a single unresponsive dependency. Always pass an explicit timeout.',
          },
          {
            q: 'Never calling raise_for_status() or checking response.status_code',
            a: 'A 4xx/5xx response does not raise an exception on its own — code that skips this check can silently process an error page or an empty/malformed body as if it were valid data.',
          },
          {
            q: 'Using data= when the API expects json=',
            a: 'data=payload sends form-urlencoded content, not JSON — many APIs will reject it with a 400 error that gives little indication the content type itself is the problem. Check the API\'s documentation for the expected body format.',
          },
          {
            q: 'Hardcoding an API key or token directly in source code',
            a: 'It ends up permanently in git history, even after being removed in a later commit, and is one of the most common real ways credentials leak. Load secrets from environment variables or a secrets manager instead.',
          },
          {
            q: 'Retrying every failed request the same way, including 4xx client errors',
            a: 'Retrying a 400 or 404 will simply fail identically every time — the request itself was wrong, not the network. Reserve automatic retries for transient failures: timeouts, connection errors, and 5xx / 429 responses.',
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
        <SectionTitle>Errors You Will Hit Working with APIs — And Exactly Why</SectionTitle>

        {[
          {
            error: `requests.exceptions.ConnectTimeout: HTTPSConnectionPool(host='api.example.com', port=443): Max retries exceeded`,
            cause: 'The connection itself could not be established within the timeout window — the host may be down, unreachable, or a firewall is silently dropping the connection.',
            fix: 'Confirm the URL and network path are correct (try curl -v against the same URL). If the endpoint is simply slow, increase the connect timeout deliberately, rather than removing the timeout entirely.',
          },
          {
            error: `requests.exceptions.ConnectionError: ('Connection aborted.', RemoteDisconnected('Remote end closed connection without response'))`,
            cause: 'The server accepted the connection but closed it before sending a response — often a server-side crash, a proxy timeout shorter than your client timeout, or a load balancer dropping idle connections.',
            fix: 'Add retry logic for this specific transient condition (Part 06), and check whether the server enforces a shorter keep-alive window than your client assumes when reusing a Session.',
          },
          {
            error: `requests.exceptions.HTTPError: 401 Client Error: Unauthorized for url: https://api.example.com/orders`,
            cause: 'The request was missing valid authentication — a missing, expired, or malformed Authorization header, or an API key that was revoked.',
            fix: 'Confirm the credential is being loaded correctly (a common cause is an empty environment variable) and check the exact header name/format the API expects — this varies between "Bearer", "Token", and custom header names.',
          },
          {
            error: `requests.exceptions.JSONDecodeError: Expecting value: line 1 column 1 (char 0)`,
            cause: 'response.json() was called on a body that isn\'t valid JSON — commonly an empty body (e.g. a 204 No Content response), or an HTML error page returned by a proxy or load balancer instead of the expected API response.',
            fix: 'Log response.text before parsing when this happens, to see what was actually returned. Check response.status_code and the body itself before assuming a 200-range response always contains valid JSON.',
          },
          {
            error: `KeyError: 'score'`,
            cause: 'Code assumed a specific key would always be present in a parsed JSON response (e.g. data["score"]) — an assumption that breaks the moment the API\'s response shape changes, or an unexpected error-shaped body was returned instead of the expected success shape.',
            fix: 'Use data.get("score") with a sensible default or explicit handling for a missing key, and validate the overall response shape before relying on it in code that runs against a real, evolving external API.',
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
        'requests is the de facto standard library for HTTP calls in Python — install with pip install requests, use params= for query strings and json= for a JSON body.',
        'Status codes are not exceptions by default. Call response.raise_for_status() (or check response.status_code) explicitly, or a 4xx/5xx response can be silently treated as valid data.',
        'API keys and bearer tokens belong in headers, loaded from environment variables or a secrets manager — never hardcoded in source code and never placed in a URL.',
        'requests has NO default timeout — a call without timeout= can hang indefinitely, and in a threaded/pooled service can exhaust the entire worker pool from one slow dependency. Always pass one.',
        'response.json() can itself raise a JSONDecodeError if the body isn\'t valid JSON — a real possibility from proxies, maintenance pages, or malformed error responses.',
        'Catch specific requests exceptions (Timeout, ConnectionError, HTTPError) before a broader RequestException, and only retry transient failures (timeouts, connection errors, 5xx/429) — never retry a 4xx client error automatically.',
        'requests.Session() reuses the underlying TCP connection across multiple calls to the same host — a real performance win for pagination loops and any code making several calls to one API.',
      ]} />

      {/* ── Next Module CTA ── */}
      <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 10, padding: '24px', marginTop: 40 }}>
        <p style={{ fontSize: 10, color: 'var(--muted)', letterSpacing: '.12em', textTransform: 'uppercase', fontFamily: 'var(--font-mono)', fontWeight: 700, margin: '0 0 10px' }}>
          What comes next
        </p>
        <p style={{ fontSize: 15, color: 'var(--text)', lineHeight: 1.85, margin: '0 0 20px' }}>
          Module 38 covers unit testing with pytest — fixtures, parametrization, mocking, and testing as
          a genuine habit rather than an afterthought bolted on at the end.
        </p>
        <Link href="/learn/python/unit-testing-pytest" style={{ background: C, color: '#000', padding: '11px 24px', borderRadius: 7, fontWeight: 700, fontSize: 13, textDecoration: 'none', display: 'inline-block' }}>
          Module 38 → Unit Testing with pytest
        </Link>
      </div>
    </LearnLayout>
  )
}
