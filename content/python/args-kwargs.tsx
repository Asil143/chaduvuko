import type { Metadata } from 'next'
import { LearnLayout } from '@/components/content/LearnLayout'
import Link from 'next/link'
import { Callout } from '@/components/content/Callout'
import { KeyTakeaways } from '@/components/content/KeyTakeaways'

export const metadata: Metadata = {
  title: '*args, **kwargs and Function Arguments Deep Dive — Python | Chaduvuko',
  description:
    'Every way Python lets you pass arguments to a function — positional, keyword, variadic, keyword-only, positional-only — and how to design flexible, unambiguous function signatures.',
}

const C = '#facc15'

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

export default function ArgsKwargs() {
  return (
    <LearnLayout
      title="*args, **kwargs and Function Arguments Deep Dive"
      description="Every way Python lets you pass arguments to a function, and how to design flexible, unambiguous function signatures."
      section="Python — Module 25"
      readTime="45 min"
      updatedAt="August 2026"
    >

      <Para>
        This module opens <strong>Phase 4 — Intermediate &amp; Functional Python</strong>. Phases 1
        through 3 built your foundation: syntax, data structures, and Object-Oriented Python, including
        writing classes, encapsulation, and the <code>@property</code> decorator. Phase 4 builds directly
        on top of that — it is where Python stops looking like "a scripting language with functions" and
        starts looking like the language that powers Django, Flask, FastAPI, pandas, and virtually every
        serious Python codebase you will work in professionally. It starts here, with something you have
        already been using without fully seeing: the machinery behind how arguments actually get passed
        to a function.
      </Para>

      {/* ── Part 01 ── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 01 — A Quick Recap" />
        <SectionTitle>Positional and Keyword Arguments, Revisited</SectionTitle>

        <Para>
          Back in Module 07 (Functions), you learned that a function call can pass arguments two ways:{' '}
          <strong>positionally</strong>, matched to parameters left to right by their position, or{' '}
          <strong>by keyword</strong>, matched explicitly by parameter name regardless of order. This
          module assumes that is solid ground and builds the rest of Python&apos;s argument-passing model
          on top of it.
        </Para>

        <CodeBox label="Positional vs keyword — the recap">{`def describe_pet(name, species, age):
    print(f"{name} is a {age}-year-old {species}")

describe_pet("Biscuit", "dog", 3)                       # positional — matched by order
describe_pet(name="Biscuit", species="dog", age=3)       # keyword — matched by name
describe_pet(age=3, name="Biscuit", species="dog")       # keyword — order no longer matters
describe_pet("Biscuit", age=3, species="dog")            # mixed — positional first, then keyword`}</CodeBox>

        <Para>
          One rule carries forward from Module 07 and matters a great deal for everything in this
          module: once you use a keyword argument in a call, every argument after it must also be
          passed by keyword. You cannot follow a keyword argument with another positional one — Python
          would have no reliable way to know which remaining parameter it belongs to.
        </Para>

        <Para>
          What this module actually covers is the layer above that: what happens when you do not know,
          at the time you write the function, exactly how many arguments will be passed, or exactly
          what their names will be. That is the entire reason <code>*args</code> and{' '}
          <code>**kwargs</code> exist.
        </Para>
      </section>

      <Divider />

      {/* ── Part 02 ── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 02 — *args" />
        <SectionTitle>*args — Any Number of Positional Arguments, Collected Into a Tuple</SectionTitle>

        <Para>
          Prefixing a parameter name with a single asterisk tells Python: "collect every remaining
          positional argument the caller passes, no matter how many, and bundle them into a single{' '}
          <code>tuple</code>." The name <code>args</code> is purely convention — the asterisk is what
          does the work, not the word "args" — but essentially every Python codebase you will ever read
          uses <code>args</code>, and deviating from it without a good reason will just confuse your
          reviewers.
        </Para>

        <CodeBox label="*args in action">{`def total(*args):
    print(type(args))   # <class 'tuple'>
    return sum(args)

total(1, 2, 3)          # 6      — args is (1, 2, 3)
total(10, 20)            # 30     — args is (10, 20)
total()                   # 0      — args is an empty tuple, which is perfectly legal`}</CodeBox>

        <Para>
          Because <code>args</code> is a genuine tuple, everything you already know about tuples from
          Module 09 applies directly — you can index into it, slice it, iterate over it with a{' '}
          <code>for</code> loop, or unpack it. It is not some special new type invented for this
          feature; it is the same immutable sequence type you already understand.
        </Para>

        <CodeBox label="args really is just a tuple">{`def show_first_and_rest(*args):
    if not args:
        print("No arguments given")
        return
    first, *rest = args
    print(f"First: {first}, rest: {rest}")

show_first_and_rest(1, 2, 3, 4)
# First: 1, rest: [2, 3, 4]`}</CodeBox>

        <Callout type="tip">
          <strong>*args can be combined with named parameters.</strong> Named parameters come first, and{' '}
          <code>*args</code> mops up everything positional left over: <code>def
          log(level, *messages):</code> lets you call <code>log("INFO", "starting", "connecting")</code>{' '}
          with <code>level</code> bound to <code>"INFO"</code> and <code>messages</code> bound to{' '}
          <code>("starting", "connecting")</code>.
        </Callout>
      </section>

      <Divider />

      {/* ── Part 03 ── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 03 — **kwargs" />
        <SectionTitle>**kwargs — Any Number of Keyword Arguments, Collected Into a Dict</SectionTitle>

        <Para>
          A parameter prefixed with two asterisks collects every remaining <strong>keyword</strong>{' '}
          argument the caller passes into a single <code>dict</code>, with the argument names becoming
          keys and the passed values becoming values. Same convention story as <code>args</code> — the
          name <code>kwargs</code> is not enforced by the language, but every Python engineer will
          recognise it instantly and expect it.
        </Para>

        <CodeBox label="**kwargs in action">{`def build_profile(**kwargs):
    print(type(kwargs))   # <class 'dict'>
    return kwargs

build_profile(name="Maria", city="Denver", role="Engineer")
# {'name': 'Maria', 'city': 'Denver', 'role': 'Engineer'}

build_profile()
# {} — an empty dict, perfectly legal, same as an empty *args tuple`}</CodeBox>

        <Para>
          Because <code>kwargs</code> is a genuine dict, every dict method from Module 11 works on it
          directly — <code>.items()</code>, <code>.get()</code>, <code>.keys()</code>, membership
          checks with <code>in</code>, all of it. This is precisely why <code>**kwargs</code> is the
          standard way to accept an open-ended set of optional, named configuration values without
          writing a parameter for every single one up front.
        </Para>

        <CodeBox label="Iterating over kwargs, and safely checking for optional keys">{`def create_user(username, **kwargs):
    print(f"Creating user: {username}")
    for key, value in kwargs.items():
        print(f"  {key} = {value}")

    # .get() with a default — exactly like a normal dict, because it IS one
    role = kwargs.get("role", "member")
    print(f"  Assigned role: {role}")

create_user("mkim", city="Denver", department="Platform")
# Creating user: mkim
#   city = Denver
#   department = Platform
#   Assigned role: member`}</CodeBox>

        <Callout type="warning">
          <strong>A misspelled keyword argument to a function that does NOT use **kwargs raises an
          error immediately</strong> — <code>TypeError: create_user() got an unexpected keyword
          argument 'departmnet'</code>. But once a function accepts <code>**kwargs</code>, that
          protection disappears: the typo is silently absorbed into the dict as its own key, and the
          function has no way to know you meant something else. This trade-off — flexibility in
          exchange for losing that built-in typo protection — is explored in the Real World section
          below, where it caused a genuine production bug.
        </Callout>
      </section>

      <Divider />

      {/* ── Part 04 ── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 04 — Keyword-Only Arguments" />
        <SectionTitle>The Bare * Marker — Forcing Arguments to Be Passed by Name</SectionTitle>

        <Para>
          Sometimes you want to require that certain arguments always be passed by keyword — never
          positionally — because the call would otherwise be ambiguous or unreadable at a glance. Python
          lets you enforce this directly in the function signature with a bare <code>*</code> marker:
          every parameter listed after it can only be supplied as a keyword argument.
        </Para>

        <CodeBox label="Keyword-only arguments">{`def create_report(title, *, include_charts=False, format="pdf"):
    print(f"Report: {title}, charts={include_charts}, format={format}")

create_report("Q3 Sales", include_charts=True, format="csv")   # fine
create_report("Q3 Sales", True, "csv")
# TypeError: create_report() takes 1 positional argument but 3 were given`}</CodeBox>

        <Para>
          Notice that <code>*</code> alone — with no name attached — is not itself a parameter that
          collects anything; it is purely a marker in the signature. Everything before it can be
          positional or keyword, as usual; everything after it must be keyword only. This is genuinely
          common in real APIs where a boolean or a mode argument, if passed positionally, would be
          meaningless to a reader without checking the function&apos;s definition —{' '}
          <code>create_report("Q3 Sales", True, "csv")</code> tells you nothing about what{' '}
          <code>True</code> means at the call site, while <code>include_charts=True</code> does.
        </Para>

        <Callout type="tip">
          You have already seen keyword-only arguments used deliberately by the standard library:{' '}
          <code>sorted(iterable, *, key=None, reverse=False)</code> forces you to write{' '}
          <code>reverse=True</code>, not <code>sorted(items, True)</code> — precisely because a bare{' '}
          <code>True</code> at that position would be meaningless without memorising the exact parameter
          order.
        </Callout>
      </section>

      <Divider />

      {/* ── Part 05 ── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 05 — Positional-Only Parameters" />
        <SectionTitle>The / Marker — Forbidding Arguments to Be Passed by Name</SectionTitle>

        <Para>
          Python 3.8 introduced the mirror image of the <code>*</code> marker: a forward slash{' '}
          <code>/</code> in the signature, after which every parameter listed <strong>before</strong> it
          can only be supplied positionally — passing it by keyword raises a{' '}
          <code>TypeError</code>. This is a much less common feature than keyword-only arguments, but it
          shows up in the standard library and is worth recognising.
        </Para>

        <CodeBox label="Positional-only parameters">{`def power(base, exponent, /):
    return base ** exponent

power(2, 10)              # 1024 — fine
power(base=2, exponent=10)
# TypeError: power() got some positional-only arguments passed as keyword arguments: 'base, exponent'`}</CodeBox>

        <Para>
          Why would anyone want to <em>forbid</em> a keyword form? Two real reasons. First, parameter
          names that are just implementation detail — a generic <code>x</code> or <code>value</code> —
          are not meant to be part of the function&apos;s public contract, and forbidding the keyword
          form means the internal name can be freely renamed later without breaking any caller&apos;s
          code (this is exactly why many built-in functions like <code>len()</code> and{' '}
          <code>abs()</code> are positional-only). Second, it lets a function accept{' '}
          <code>**kwargs</code> alongside a positional parameter that happens to share a name with a key
          someone might legitimately want to pass through.
        </Para>

        <CodeBox label="Combining / with **kwargs to avoid a name collision">{`def build_request(url, /, **kwargs):
    # "url" is positional-only, so it can never collide with a caller
    # passing url="..." as one of the **kwargs entries meant for something else
    return {"url": url, "params": kwargs}

build_request("https://api.example.com", url="ignored-if-not-for-this-conflict")
# TypeError: build_request() got multiple values for argument 'url' — WITHOUT the "/",
# this exact call would be genuinely ambiguous. WITH it, "url" the parameter and
# "url" as a possible kwargs key can never collide, because the parameter can
# never be filled by keyword in the first place.`}</CodeBox>

        <Para>
          You will not reach for <code>/</code> often in everyday application code, but recognising it
          matters — Python&apos;s official documentation uses it constantly to describe the built-in
          functions, and you will see it in the signature help your editor shows you for functions like{' '}
          <code>dict.get(key, default=None, /)</code>.
        </Para>
      </section>

      <Divider />

      {/* ── Part 06 ── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 06 — Unpacking at the Call Site" />
        <SectionTitle>*variable and **variable — Unpacking Arguments When You Call</SectionTitle>

        <Para>
          Everything so far has been about the function <strong>definition</strong> side of the
          asterisk. The same <code>*</code> and <code>**</code> symbols have a second, completely
          different job on the <strong>call</strong> side: unpacking an existing list or dict into
          separate arguments, instead of packing loose arguments into one.
        </Para>

        <CodeBox label="Unpacking a list/tuple into positional arguments">{`def describe_pet(name, species, age):
    print(f"{name} is a {age}-year-old {species}")

pet_info = ["Biscuit", "dog", 3]
describe_pet(*pet_info)
# Identical to describe_pet("Biscuit", "dog", 3) — the * unpacks the list
# into three separate positional arguments at the call site.`}</CodeBox>

        <CodeBox label="Unpacking a dict into keyword arguments">{`pet_info = {"name": "Biscuit", "species": "dog", "age": 3}
describe_pet(**pet_info)
# Identical to describe_pet(name="Biscuit", species="dog", age=3) — the **
# unpacks the dict into keyword arguments, matched by the dict's keys.`}</CodeBox>

        <Para>
          This is genuinely one of the most common patterns you will see in real Python code —
          especially anywhere data is loaded from a JSON API response or a config file as a dict and
          then needs to be fed into a function or a class constructor whose parameters match the dict&apos;s
          keys.
        </Para>

        <CodeBox label="Where this shows up constantly in real code">{`class User:
    def __init__(self, name, email, role="member"):
        self.name = name
        self.email = email
        self.role = role

# A row straight from a database query or a JSON API response:
row = {"name": "Priya Nair", "email": "priya@example.com", "role": "admin"}
user = User(**row)   # far cleaner than User(row["name"], row["email"], row["role"])`}</CodeBox>

        <Callout type="info">
          <strong>Same symbols, opposite jobs, and it is not a coincidence.</strong> In a function{' '}
          <em>definition</em>, <code>*</code>/<code>**</code> mean "gather the caller&apos;s loose
          arguments into one collection." At a <em>call site</em>, they mean "spread this one collection
          back out into loose arguments." They are exact inverses of each other, which is exactly why
          Python reused the same symbol for both — once you see it that way, it stops looking like two
          unrelated features you have to memorise separately.
        </Callout>
      </section>

      <Divider />

      {/* ── Part 07 ── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 07 — Combining Every Form" />
        <SectionTitle>The Required Order, and a Real Worked Example</SectionTitle>

        <Para>
          A single function signature can legally combine every form covered in this module —
          positional-only parameters, regular parameters, <code>*args</code>, keyword-only parameters,
          and <code>**kwargs</code> — but Python enforces a strict order, and getting it wrong is a{' '}
          <code>SyntaxError</code> caught before your program ever runs.
        </Para>

        <CodeBox label="The complete, legal order">{`def full_signature(pos_only, /, normal, *args, kw_only, **kwargs):
    print("pos_only:", pos_only)
    print("normal:", normal)
    print("args:", args)
    print("kw_only:", kw_only)
    print("kwargs:", kwargs)

full_signature(1, 2, 3, 4, kw_only=5, extra=6)
# pos_only: 1
# normal: 2
# args: (3, 4)
# kw_only: 5
# kwargs: {'extra': 6}`}</CodeBox>

        <Para>
          The order is always: positional-only parameters, then <code>/</code>, then normal
          parameters, then <code>*args</code> (or a bare <code>*</code> if you want keyword-only
          arguments without collecting extra positional ones), then keyword-only parameters, then{' '}
          <code>**kwargs</code>. In practice, most real functions use only two or three of these forms
          at once — seeing all five together is rare outside of library code, but understanding the
          order explains why your editor&apos;s autocomplete lays out a function&apos;s signature the
          way it does.
        </Para>

        <SubTitle>Worked example — a flexible logging wrapper</SubTitle>

        <Para>
          The single most common real-world use of <code>*args</code> and <code>**kwargs</code>{' '}
          together is a <strong>wrapper function</strong> — one that adds some behaviour (logging,
          timing, retrying, authentication) around a call to another function, without needing to know
          anything about that function&apos;s specific arguments. This exact pattern is also the
          foundation the Decorators module (Module 29) will build on directly.
        </Para>

        <CodeBox label="A wrapper that forwards ANY arguments to ANY function it wraps">{`import time

def call_with_logging(func, *args, **kwargs):
    """Call func with whatever arguments were given, logging timing and errors."""
    print(f"Calling {func.__name__} with args={args}, kwargs={kwargs}")
    start = time.perf_counter()
    try:
        result = func(*args, **kwargs)
        elapsed = time.perf_counter() - start
        print(f"{func.__name__} succeeded in {elapsed:.4f}s")
        return result
    except Exception as e:
        elapsed = time.perf_counter() - start
        print(f"{func.__name__} failed after {elapsed:.4f}s: {e}")
        raise

def fetch_user(user_id, include_orders=False):
    if include_orders:
        return {"id": user_id, "orders": [101, 102]}
    return {"id": user_id}

call_with_logging(fetch_user, 42, include_orders=True)
# Calling fetch_user with args=(42,), kwargs={'include_orders': True}
# fetch_user succeeded in 0.0000s`}</CodeBox>

        <Para>
          Notice what makes this genuinely powerful: <code>call_with_logging</code> never needed to know
          that <code>fetch_user</code> takes a <code>user_id</code> and an <code>include_orders</code>{' '}
          flag. It collects whatever the caller passes with <code>*args, **kwargs</code>, then unpacks
          them right back out with <code>func(*args, **kwargs)</code> when calling the wrapped function.
          This "collect, then re-spread" pattern is precisely how every general-purpose wrapper,
          middleware, and decorator in Python is built.
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
        <SectionTitle>The Silent Typo at a Denver Ride-Share Analytics Startup</SectionTitle>

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
            Scenario — Ride-share analytics startup, Denver · Production incident
          </div>

          <Para>
            A Denver-based startup building trip-analytics dashboards has an internal{' '}
            <code>track_event()</code> function that every part of the codebase calls to send an event
            to their analytics warehouse. To stay flexible as new event types were added over time, an
            engineer designed it with <code>**kwargs</code>, exactly as described in Part 03.
          </Para>

          <CodeBox label="The function everyone calls">{`def track_event(event_name, **kwargs):
    payload = {"event": event_name, "timestamp": time.time(), **kwargs}
    send_to_warehouse(payload)`}</CodeBox>

          <SubSubTitle>The bug</SubSubTitle>

          <Para>
            A new engineer, tracking a completed ride, writes <code>track_event("ride_completed",
            fair_amount=18.50, driver_id="D-4471")</code> — a one-character typo,{' '}
            <code>fair_amount</code> instead of <code>fare_amount</code>. Because{' '}
            <code>track_event</code> accepts <code>**kwargs</code>, Python raises no error at all. The
            typo&apos;d key is simply absorbed into the payload dict and shipped to the warehouse as-is.
            The dashboard that reports total fare revenue silently under-reports for three weeks,
            because it queries a column called <code>fare_amount</code> that this particular event never
            populated — and nothing in the system ever complained.
          </Para>

          <SubSubTitle>Why this is a genuine trade-off, not a design mistake</SubSubTitle>

          <Para>
            The team did not remove <code>**kwargs</code> — a function called from dozens of places with
            dozens of different event shapes genuinely needs that flexibility, and defining a rigid
            parameter list for every possible event field was never realistic. Instead, they added
            runtime validation: <code>track_event</code> now checks incoming keys against a registry of
            known field names per event type and raises a clear <code>ValueError</code> on anything
            unrecognised, restoring the "fail loudly on a typo" protection that a fixed signature would
            have given for free — while keeping the flexibility <code>**kwargs</code> provides.
          </Para>

          <Para>
            This is the exact trade-off flagged in the Callout under Part 03: <code>**kwargs</code>{' '}
            genuinely earns its place for open-ended, evolving data, but it quietly gives up the
            "unexpected keyword argument" safety net that a normal function signature provides for free.
            Knowing that trade-off exists — and deciding when it is and is not acceptable — is the actual
            skill this module is teaching, not just the syntax.
          </Para>
        </div>
      </section>

      <Divider />

      {/* ── Part 09 — Misconceptions ── */}
      <section style={{ marginBottom: 64 }} data-toc-kind="myth">
        <SectionTag text="// Part 09 — Misconceptions" />
        <SectionTitle>Four Misconceptions About *args and **kwargs</SectionTitle>

        {[
          {
            wrong: '"args and kwargs are special keywords built into Python"',
            right: 'The names "args" and "kwargs" are just convention — nothing more. The asterisk(s) are what actually matter to Python. def f(*numbers, **options): works identically to *args/**kwargs, but nobody uses that naming, because breaking the convention makes your code harder for other engineers to scan at a glance.',
          },
          {
            wrong: '"Every function should accept *args, **kwargs so it\'s maximally flexible"',
            right: 'Flexibility has a real cost, shown directly in the Real World example above: a fixed signature catches typos and unexpected arguments immediately with a TypeError, while **kwargs silently swallows them. Use *args/**kwargs when a function genuinely needs to accept an open-ended, evolving set of arguments (like a generic wrapper) — not as a default habit for every function you write.',
          },
          {
            wrong: '"*args and **kwargs mean the same thing on both sides — definition and call"',
            right: 'They mean opposite things depending on which side they appear on. In a function definition, they GATHER loose arguments into a tuple/dict. At a call site, they UNPACK an existing list/dict back into loose arguments. Same symbols, inverse operations — covered directly in Part 06.',
          },
          {
            wrong: '"The / and * markers in a signature are rare edge cases you\'ll never actually see"',
            right: 'The * marker (keyword-only arguments) is genuinely common in real, professional APIs — sorted(), the standard library, and most well-designed internal codebases use it to force clarity at the call site for boolean or mode flags. The / marker is rarer, but it appears throughout Python\'s own official documentation and built-in function signatures, so recognising it is still worth the five minutes it takes to learn.',
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
            q: 'What are *args and **kwargs, and what data types do they actually produce inside the function?',
            a: '*args collects any number of extra positional arguments into a tuple. **kwargs collects any number of extra keyword arguments into a dict. The names are pure convention — it is the asterisk(s) that matter to Python, not the words "args"/"kwargs" — but the convention is followed so consistently that deviating from it without reason will confuse reviewers.',
          },
          {
            q: 'What is the difference between how * behaves in a function definition versus at a function call?',
            a: 'In a definition, * gathers the caller\'s extra positional arguments into a tuple (*args). At a call site, * does the opposite: it unpacks an existing list or tuple back out into separate positional arguments, e.g. func(*my_list). The same duality applies to ** with dicts and keyword arguments. They are inverse operations of each other, sharing the same symbol.',
          },
          {
            q: 'What does a bare * (with no name) in a function signature do?',
            a: 'It marks every parameter listed after it as keyword-only — those arguments can no longer be passed positionally, only by name. This is used to force clarity at call sites, especially for boolean or mode-like arguments where a bare positional value (like True) would be meaningless without checking the function\'s definition. sorted(iterable, *, key=None, reverse=False) is a standard-library example.',
          },
          {
            q: 'What is the required order of parameter kinds in a Python function signature that uses all of them?',
            a: 'Positional-only parameters, then a "/" marker, then normal parameters, then *args, then keyword-only parameters, then **kwargs. Getting this order wrong is a SyntaxError caught before the program runs. Most real functions only combine two or three of these forms — seeing all of them together in one signature is rare outside library code.',
          },
          {
            q: 'Why might a function using **kwargs be more prone to bugs than one with a fixed, explicit signature?',
            a: 'A fixed signature raises an immediate TypeError if the caller misspells a keyword argument or passes one the function does not recognise. A function accepting **kwargs absorbs any keyword argument silently, including typos, with no error at all — the mistake can then propagate downstream (e.g. into a database or analytics payload) completely unnoticed. This is a genuine trade-off: **kwargs buys flexibility for open-ended or evolving arguments, at the cost of losing that built-in typo protection.',
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
        <SectionTitle>Argument-Handling Mistakes That Cost Real Debugging Time</SectionTitle>

        {[
          {
            q: 'Putting *args after a default-valued parameter and expecting the default to still work positionally',
            a: 'def f(a, b=5, *args): calling f(1, 2, 3, 4) sets b=2, not the default — *args only collects what is left AFTER every named parameter has been filled. If you wanted b to keep its default while still passing extra values, those extra values need to be passed by keyword or the signature needs rethinking.',
          },
          {
            q: 'Forgetting that unpacking a dict with ** requires its keys to be valid Python identifiers that match parameter names exactly',
            a: 'build_profile(**{"user-name": "x"}) fails, because "user-name" (with a hyphen) cannot be a keyword argument name at all — it is not a valid identifier. And build_profile(**{"username": "x"}) fails against a function expecting "user_name" — the keys must match parameter names exactly, including case and spelling.',
          },
          {
            q: 'Assuming *args and **kwargs are required parameters',
            a: 'They default to an empty tuple and empty dict respectively when the caller passes nothing extra — there is no need to give them a default value in the signature, and doing so (def f(*args=None)) is actually a SyntaxError.',
          },
          {
            q: 'Mutating **kwargs and expecting it to affect the caller\'s original dict',
            a: '**kwargs always creates a brand NEW dict inside the function — even if the caller unpacked their own dict with ** to call it. Changes made to kwargs inside the function never propagate back to the caller\'s original dict, unlike passing a dict directly as a single mutable argument would.',
          },
          {
            q: 'Trying to pass a positional-only parameter (marked with /) by keyword out of habit',
            a: 'Calling len(obj=my_list) fails, because len()\'s parameter is positional-only in CPython\'s implementation. This trips people up specifically because most everyday functions DO accept their parameters by keyword — positional-only is the exception, not the rule, so it is worth checking a function\'s actual signature (with help() or your editor) rather than assuming.',
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
        <SectionTitle>Errors You Will Hit With Function Arguments — And Exactly Why</SectionTitle>

        {[
          {
            error: `TypeError: describe_pet() got multiple values for argument 'name'`,
            cause: 'A positional argument and a keyword argument both tried to fill the same parameter — e.g. describe_pet("Biscuit", name="Rex") passes "Biscuit" positionally to the first parameter (name) AND passes name="Rex" by keyword, a direct conflict.',
            fix: 'Pick one form per argument. If a function is called with both positional and keyword arguments, make sure no keyword argument names a parameter already filled by position.',
          },
          {
            error: `SyntaxError: positional argument follows keyword argument`,
            cause: 'A call places a plain positional argument after a keyword argument, e.g. func(a=1, 2) — once you start using keywords in a call, everything after must also be a keyword argument.',
            fix: 'Reorder the call so all positional arguments come first, followed by all keyword arguments — matching how the function itself will interpret them.',
          },
          {
            error: `TypeError: full_signature() missing 1 required keyword-only argument: 'kw_only'`,
            cause: 'A parameter placed after a bare * (or after *args) in the function definition has no default value and was not supplied by keyword in the call.',
            fix: 'Either pass it explicitly by keyword at the call site, or give it a default value in the function definition if it should be optional.',
          },
          {
            error: `TypeError: power() got some positional-only arguments passed as keyword arguments: 'base, exponent'`,
            cause: 'A parameter defined before a "/" marker in the signature was called using its keyword form, which positional-only parameters explicitly forbid.',
            fix: 'Pass the argument positionally instead — check the function\'s signature (help(func) or your editor\'s hover tooltip) to see exactly which parameters are positional-only.',
          },
          {
            error: `TypeError: track_event() argument after ** must be a mapping, not list`,
            cause: 'Attempting to unpack a list (or any non-dict-like object) into a function call using ** — ** unpacking specifically requires something that supports key-value access, like a dict.',
            fix: 'Use * (single asterisk) to unpack a list/tuple into positional arguments, and reserve ** exclusively for unpacking dicts into keyword arguments.',
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
        '*args collects extra positional arguments into a tuple; **kwargs collects extra keyword arguments into a dict. The names are convention — the asterisks are what Python actually reads.',
        'A bare * in a signature marks everything after it as keyword-only, forcing callers to name those arguments explicitly — used throughout the standard library (e.g. sorted()) to avoid ambiguous positional booleans.',
        'A / marker (Python 3.8+) marks everything before it as positional-only, forbidding the keyword form — common in built-ins like len(), rare in everyday application code.',
        'The same * and ** symbols mean opposite things depending on context: gathering loose arguments into a collection in a definition, and unpacking a collection back into loose arguments at a call site.',
        'The legal parameter order in a signature is: positional-only, /, normal, *args, keyword-only, **kwargs — violating it is a SyntaxError.',
        '**dict unpacking at a call site is the standard way to feed a dict (e.g. from a JSON API response) into a function or constructor whose parameters match its keys.',
        '**kwargs trades away the automatic "unexpected keyword argument" TypeError a fixed signature gives you — a typo\'d key is silently absorbed rather than flagged, exactly as shown in the Denver production incident above.',
        'The "collect with *args/**kwargs, then re-spread with func(*args, **kwargs)" pattern is the foundation every general-purpose wrapper and decorator in Python is built on.',
      ]} />

      {/* ── Next Module CTA ── */}
      <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 10, padding: '24px', marginTop: 40 }}>
        <p style={{ fontSize: 10, color: 'var(--muted)', letterSpacing: '.12em', textTransform: 'uppercase', fontFamily: 'var(--font-mono)', fontWeight: 700, margin: '0 0 10px' }}>
          What comes next
        </p>
        <p style={{ fontSize: 15, color: 'var(--text)', lineHeight: 1.85, margin: '0 0 20px' }}>
          Module 26 covers lambda functions and Python&apos;s functional toolkit — map, filter, and
          functools.reduce — plus an honest, non-dogmatic take on when a one-line lambda is the right
          call and when a named function genuinely reads better.
        </p>
        <Link href="/learn/python/lambda-map-filter-reduce" style={{ background: C, color: '#000', padding: '11px 24px', borderRadius: 7, fontWeight: 700, fontSize: 13, textDecoration: 'none', display: 'inline-block' }}>
          Module 26 → Lambda Functions and Functional Tools
        </Link>
      </div>
    </LearnLayout>
  )
}
