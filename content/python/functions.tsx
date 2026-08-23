import type { Metadata } from 'next'
import { LearnLayout } from '@/components/content/LearnLayout'
import Link from 'next/link'
import { Callout } from '@/components/content/Callout'
import { KeyTakeaways } from '@/components/content/KeyTakeaways'

export const metadata: Metadata = {
  title: 'Functions — Defining, Parameters, Return Values — Python | Chaduvuko',
  description:
    'def syntax, parameters vs arguments, default argument values and the mutable-default trap, *args/**kwargs, return values, docstrings, and the basics of variable scope.',
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

export default function Functions() {
  return (
    <LearnLayout
      title="Functions — Defining, Parameters, Return Values"
      description="def syntax, parameters vs arguments, default argument values and the mutable-default trap, *args/**kwargs, return values, docstrings, and the basics of scope."
      section="Python — Module 07"
      readTime="55 min"
      updatedAt="August 2026"
    >

      {/* ── Part 01 ── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 01 — Defining and Calling Functions" />
        <SectionTitle>def — Packaging Behaviour Into a Reusable Name</SectionTitle>

        <Para>
          A function is a named, reusable block of code. You have already been calling functions
          constantly — <code>print()</code>, <code>len()</code>, <code>range()</code> — without writing
          them yourself. This module is about writing your own. The motivation is one of the oldest
          ideas in programming, usually shortened to <strong>DRY</strong>: Don&apos;t Repeat Yourself. Any
          time you find yourself copying and pasting a block of logic with only small tweaks, that block
          is a strong candidate to become a function.
        </Para>

        <CodeBox label="Defining and calling a function">{`def greet(name):
    print(f"Hello, {name}!")

greet("Maria")
greet("Jordan")

# Hello, Maria!
# Hello, Jordan!`}</CodeBox>

        <Para>
          The <code>def</code> keyword starts a function definition, followed by the function&apos;s
          name, a parenthesised list of parameters, and a colon — the same colon-plus-indented-block
          structure you already know from <code>if</code>, <code>for</code>, and <code>while</code>.
          Defining a function does not run its body — the code inside only executes when the function is{' '}
          <strong>called</strong>, using its name followed by parentheses.
        </Para>

        <Callout type="tip">
          Function names follow the same <code>snake_case</code> convention as variable names —{' '}
          <code>calculate_total</code>, not <code>calculateTotal</code> or <code>CalculateTotal</code>{' '}
          (the latter is reserved by convention for class names, covered in the Object-Oriented Python
          phase). A good function name describes what it does, usually starting with a verb —{' '}
          <code>send_email</code>, <code>validate_input</code>, <code>get_user</code>.
        </Callout>

        <SubTitle>Parameters vs arguments — a distinction worth being precise about</SubTitle>

        <Para>
          These two words are often used interchangeably in casual conversation, but they mean
          specifically different things, and using them precisely will make you sound — and think — more
          like an experienced engineer. A <strong>parameter</strong> is the name listed in the function
          definition. An <strong>argument</strong> is the actual value passed in when the function is
          called.
        </Para>

        <CodeBox label="Parameter vs argument">{`def greet(name):        # "name" is a PARAMETER — part of the function's definition
    print(f"Hello, {name}!")

greet("Maria")           # "Maria" is an ARGUMENT — the actual value supplied at call time`}</CodeBox>

        <SubTitle>Positional and keyword arguments</SubTitle>

        <Para>
          Arguments can be passed positionally — matched to parameters purely by order — or by keyword,
          naming the parameter explicitly at the call site. Keyword arguments can be given in any order,
          and they make a call far more self-documenting when a function takes several parameters.
        </Para>

        <CodeBox label="Positional vs keyword arguments">{`def describe_pet(name, species, age):
    print(f"{name} is a {age}-year-old {species}")

describe_pet("Rex", "dog", 3)                             # positional — order matters
describe_pet(name="Rex", species="dog", age=3)             # keyword — order doesn't matter
describe_pet(age=3, name="Rex", species="dog")             # same result, reordered

describe_pet("Rex", age=3, species="dog")                  # mixing is fine —
# but positional arguments must always come before keyword arguments in the same call`}</CodeBox>
      </section>

      <Divider />

      {/* ── Part 02 ── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 02 — Default Parameter Values" />
        <SectionTitle>Default Values — And the Mutable-Default Trap That Catches Everyone Once</SectionTitle>

        <Para>
          A parameter can be given a default value, making it optional at the call site — if the caller
          does not supply an argument for it, the default is used instead.
        </Para>

        <CodeBox label="Default parameter values">{`def greet(name, greeting="Hello"):
    print(f"{greeting}, {name}!")

greet("Maria")                    # Hello, Maria!            — uses the default
greet("Jordan", "Hi")              # Hi, Jordan!               — overrides the default
greet("Priya", greeting="Welcome") # Welcome, Priya!           — same, by keyword`}</CodeBox>

        <Callout type="warning">
          <strong>Any parameter with a default value must come after every parameter without one.</strong>{' '}
          <code>def greet(greeting=&quot;Hello&quot;, name):</code> is a <code>SyntaxError</code> —
          Python cannot figure out which arguments correspond to which parameters if a required one
          follows an optional one.
        </Callout>

        <SubTitle>The mutable-default-argument trap</SubTitle>

        <Para>
          This is one of the most famous gotchas in the entire language, and it catches nearly every
          Python engineer at least once — usually in a way that produces deeply confusing behaviour that
          looks like it must be a bug in Python itself. It is not. It is a direct, logical consequence of
          something you already know from the Variables module: default values are evaluated{' '}
          <strong>once</strong>, when the function is defined — not once per call — and if that default
          is a mutable object like a list, every call that relies on the default shares the exact same
          object.
        </Para>

        <CodeBox label="The trap — a bug that looks impossible">{`def add_item(item, cart=[]):     # DANGER — a mutable default value
    cart.append(item)
    return cart

print(add_item("apple"))          # ['apple']
print(add_item("banana"))         # ['apple', 'banana']  — wait, what?
print(add_item("cherry"))         # ['apple', 'banana', 'cherry']  — it keeps growing!

# Every call that didn't pass its own "cart" is silently sharing
# the SAME list object, created exactly once, back when the function was defined.`}</CodeBox>

        <Para>
          Each of these calls looks, at the call site, like it should start from a fresh empty list —
          that is what the default <code>=[]</code> visually suggests. But it does not. The empty list
          is created a single time, when Python processes the <code>def</code> statement, and every
          subsequent call that omits the <code>cart</code> argument reuses that exact same list object,
          mutating it further on every call, exactly like the <code>backup = scores</code> example from
          the Variables module.
        </Para>

        <CodeBox label="The fix — use None as the default, create the real default inside the function">{`def add_item(item, cart=None):
    if cart is None:
        cart = []          # a BRAND NEW list, created fresh on every call
    cart.append(item)
    return cart

print(add_item("apple"))    # ['apple']
print(add_item("banana"))   # ['banana']  — correct, independent lists`}</CodeBox>

        <Callout type="warning">
          <strong>This is a genuinely common real-world bug, not a theoretical one.</strong> It most often
          shows up as a function that "remembers" data across calls that should have been independent —
          a growing list nobody added items to on purpose, or a dict that unexpectedly contains keys from
          a completely different request. The rule to memorise permanently: never use a mutable object
          (a list, dict, or set) as a default parameter value. Use <code>None</code> as the default and
          create the real mutable object inside the function body.
        </Callout>
      </section>

      <Divider />

      {/* ── Part 03 ── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 03 — *args and **kwargs" />
        <SectionTitle>Accepting a Variable Number of Arguments</SectionTitle>

        <Para>
          Sometimes you cannot know in advance how many arguments a function needs to accept.{' '}
          <code>*args</code> collects any number of extra positional arguments into a tuple, and{' '}
          <code>**kwargs</code> collects any number of extra keyword arguments into a dict. Neither name
          is a keyword itself — <code>args</code> and <code>kwargs</code> are just convention; the single{' '}
          <code>*</code> and double <code>**</code> are what actually matter.
        </Para>

        <CodeBox label="*args — variable positional arguments">{`def total(*args):
    print(args)         # a tuple of everything passed in
    return sum(args)

total(1, 2, 3)         # (1, 2, 3)  -> 6
total(10, 20)           # (10, 20)   -> 30
total()                  # ()          -> 0`}</CodeBox>

        <CodeBox label="**kwargs — variable keyword arguments">{`def build_profile(**kwargs):
    print(kwargs)        # a dict of every keyword argument passed in
    return kwargs

build_profile(name="Maria", age=28, city="Austin")
# {'name': 'Maria', 'age': 28, 'city': 'Austin'}`}</CodeBox>

        <Para>
          The two can appear together, and Python has a strict, sensible order for parameters:
          regular positional parameters first, then <code>*args</code>, then regular keyword parameters
          with defaults, then <code>**kwargs</code> last.
        </Para>

        <CodeBox label="Combining regular parameters, *args, and **kwargs">{`def log_event(event_name, *details, level="INFO", **metadata):
    print(f"[{level}] {event_name}")
    print("Details:", details)
    print("Metadata:", metadata)

log_event("user_login", "192.168.1.1", "mobile", level="WARNING", user_id=42, retries=2)
# [WARNING] user_login
# Details: ('192.168.1.1', 'mobile')
# Metadata: {'user_id': 42, 'retries': 2}`}</CodeBox>

        <Callout type="info">
          You will use <code>*args</code>/<code>**kwargs</code> more as a reader than a writer at first
          — they show up constantly in library and framework code that needs to accept flexible,
          forward-compatible arguments (wrapper functions, decorators — covered in full in Module 29 —
          and many popular libraries you will use later in this track). Recognising the syntax now means
          you will not be confused the first time you see it in someone else&apos;s code.
        </Callout>
      </section>

      <Divider />

      {/* ── Part 04 ── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 04 — Return Values" />
        <SectionTitle>return — Sending a Value Back to the Caller</SectionTitle>

        <Para>
          <code>return</code> immediately ends the function and sends a value back to wherever the
          function was called from. Unlike <code>print()</code>, which only displays a value in the
          terminal, <code>return</code> makes a value available for the calling code to store, pass to
          another function, or use in a further calculation.
        </Para>

        <CodeBox label="return vs print — a critical distinction">{`def add_print(a, b):
    print(a + b)      # only displays the result — does NOT hand it back

def add_return(a, b):
    return a + b       # hands the result back to the caller

result1 = add_print(2, 3)    # prints "5", but result1 is None — nothing was returned
result2 = add_return(2, 3)    # prints nothing, but result2 is 5

print(result1)   # None
print(result2)   # 5`}</CodeBox>

        <Callout type="warning">
          This is a genuinely common early mistake: writing a function that <code>print()</code>s its
          answer, then trying to use the function&apos;s "result" in further code, and getting{' '}
          <code>None</code> everywhere. If a value needs to be used again — stored, passed on, computed
          with further — it must be returned, not merely printed.
        </Callout>

        <SubTitle>Every function returns something — even if you never write return</SubTitle>

        <Para>
          A function with no <code>return</code> statement at all, or a bare <code>return</code> with no
          value after it, implicitly returns <code>None</code>. This is not an error or a special case —
          it is the same <code>None</code> you already know from the Variables module, and it is
          Python&apos;s consistent way of saying "this function produced no meaningful value."
        </Para>

        <CodeBox label="Implicit None return">{`def log_message(msg):
    print(f"LOG: {msg}")
    # no return statement at all

result = log_message("Server started")
print(result)   # None — the function's job was printing, not producing a value`}</CodeBox>

        <SubTitle>Returning multiple values with a tuple</SubTitle>

        <Para>
          Python functions can only formally return one value — but that one value can itself be a
          tuple containing several values, and Python makes packing and unpacking a tuple like this
          almost invisible at the call site. This is an extremely common, genuinely idiomatic pattern.
        </Para>

        <CodeBox label="Returning multiple values">{`def get_min_max(numbers):
    return min(numbers), max(numbers)   # this is actually returning ONE tuple: (min, max)

lowest, highest = get_min_max([4, 8, 15, 16, 23, 42])
print(lowest)    # 4
print(highest)   # 42

# You can also just capture the whole tuple directly:
result = get_min_max([4, 8, 15, 16, 23, 42])
print(result)     # (4, 42)`}</CodeBox>

        <Para>
          <code>return min(numbers), max(numbers)</code> works because a comma outside of brackets
          creates a tuple — the parentheses around a tuple are usually optional. This "returning multiple
          values" pattern is really just a function returning a tuple, and the caller unpacking it into
          separate names in one line — the same unpacking mechanic you will see formalised for tuples
          specifically in Module 09.
        </Para>

        <SubTitle>return exits immediately — code after it in the same block never runs</SubTitle>

        <CodeBox label="return stops the function immediately">{`def check_age(age):
    if age < 0:
        return "Invalid age"
    if age < 18:
        return "Minor"
    return "Adult"
    print("This line never runs")   # unreachable — return already exited the function

print(check_age(25))   # Adult`}</CodeBox>
      </section>

      <Divider />

      {/* ── Part 05 ── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 05 — Docstrings" />
        <SectionTitle>Docstrings — Documentation That Lives Inside the Function Itself</SectionTitle>

        <Para>
          A docstring is a string literal placed as the very first line inside a function&apos;s body,
          describing what the function does. Unlike a regular <code>#</code> comment, a docstring is
          stored as part of the function object itself and can be read back programmatically — by the
          built-in <code>help()</code> function, by IDEs showing a tooltip when you call the function, and
          by documentation-generation tools.
        </Para>

        <CodeBox label="A properly documented function">{`def calculate_discount(price, percent):
    """
    Calculate the price after applying a percentage discount.

    Args:
        price: The original price, as a float.
        percent: The discount percentage (0-100).

    Returns:
        The discounted price, as a float.
    """
    return price * (1 - percent / 100)

help(calculate_discount)   # prints the docstring above, formatted, to the terminal
print(calculate_discount.__doc__)   # accesses the raw docstring directly`}</CodeBox>

        <Para>
          Triple-quoted strings (<code>&quot;&quot;&quot;...&quot;&quot;&quot;</code>) are used for
          docstrings by convention, even for a single line, since they allow the docstring to span
          multiple lines cleanly if it grows later without needing to change the quote style. Not every
          function needs a full Args/Returns docstring — a short, obvious helper function is often fine
          with no docstring at all, or a single descriptive line. Public functions in a shared codebase,
          the kind other engineers will call without reading their implementation, are where docstrings
          earn their keep.
        </Para>

        <Callout type="tip">
          There are several competing docstring formats in real use — Google style (shown above),
          NumPy style, and reStructuredText style are the three most common. None is objectively
          "correct" — the important thing is picking one and using it consistently across a codebase, so
          documentation tools can parse it predictably. You will see this formalised further once you
          reach the Best Practices module.
        </Callout>
      </section>

      <Divider />

      {/* ── Part 06 ── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 06 — Scope" />
        <SectionTitle>Local vs Global Scope — Where a Variable Actually Lives</SectionTitle>

        <Para>
          A variable created inside a function only exists inside that function — this is called{' '}
          <strong>local scope</strong>. Once the function returns, its local variables are gone entirely;
          they cannot be accessed from outside, and each call to the function gets its own fresh set of
          them.
        </Para>

        <CodeBox label="Local variables don't leak out">{`def calculate_total():
    subtotal = 100     # local to calculate_total — exists only during this call
    tax = subtotal * 0.08
    return subtotal + tax

result = calculate_total()
print(result)      # 108.0
print(subtotal)     # NameError: name 'subtotal' is not defined
                      # "subtotal" never existed outside calculate_total in the first place`}</CodeBox>

        <Para>
          A variable created outside any function, at the top level of a script or module, has{' '}
          <strong>global scope</strong> — it is visible from inside functions too, but only for{' '}
          <em>reading</em>, not for assignment, unless you say otherwise explicitly.
        </Para>

        <CodeBox label="Functions can READ a global variable without any special syntax">{`discount_rate = 0.10    # global

def apply_discount(price):
    return price * (1 - discount_rate)   # reading the global — this just works

print(apply_discount(100))   # 90.0`}</CodeBox>

        <CodeBox label="But assigning to a global name from inside a function needs the global keyword">{`counter = 0

def increment():
    counter += 1     # UnboundLocalError!
    return counter

# Python sees "counter = ..." anywhere inside the function and treats "counter"
# as a NEW local variable for the ENTIRE function body — even on lines before
# the assignment. Since counter += 1 needs to read counter before writing it,
# and Python has already decided counter is local (and therefore not yet
# assigned at that point), this fails.`}</CodeBox>

        <CodeBox label="The global keyword — explicitly declaring intent to modify the global">{`counter = 0

def increment():
    global counter    # tells Python: "counter" here refers to the global, not a new local
    counter += 1
    return counter

print(increment())   # 1
print(increment())   # 2
print(counter)         # 2 — the global itself was actually modified`}</CodeBox>

        <Callout type="warning">
          <strong>Reaching for global is usually a sign to reconsider the design, not a tool to use
          freely.</strong> Functions that silently modify global state are hard to test in isolation and
          hard to reason about, since calling them has effects beyond their return value. It is worth
          knowing <code>global</code> exists and understanding exactly why the <code>UnboundLocalError</code>{' '}
          above happens — but in most real code, passing values in as parameters and getting results back
          via <code>return</code> is the better default. Full scope rules — including how nested functions
          resolve names through enclosing scopes — get their own dedicated treatment in the Closures and
          Scope module (Module 31) later in this track; this is deliberately just the foundation.
        </Callout>
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
        <SectionTitle>An Austin Ticketing Startup&apos;s Discount Codes Leak Between Customers</SectionTitle>

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
            Scenario — Event ticketing startup, Austin · Production bug report
          </div>

          <Para>
            A customer support ticket comes in at an Austin concert-ticketing startup: a customer says
            their checkout shows promo codes they never entered, applied to an order that should have
            had none. Within an hour, three more nearly identical tickets arrive. The order totals are
            wrong, and the discrepancy is growing — this looks, at first glance, like it might be a
            security issue.
          </Para>

          <SubSubTitle>What the engineer finds</SubSubTitle>

          <Para>
            The checkout function that assembles a customer&apos;s applied promo codes has exactly the
            shape shown in Part 02 above — a mutable default argument.
          </Para>

          <CodeBox label="The function responsible">{`def build_checkout(customer_id, promo_codes=[]):
    promo_codes.append("WELCOME10")   # auto-applies a standing welcome discount
    return {"customer_id": customer_id, "codes": promo_codes}`}</CodeBox>

          <Para>
            Every call that does not explicitly pass its own <code>promo_codes</code> list shares the
            exact same list object — created once, when the server process started and the function was
            defined, not once per request. Each checkout appends <code>&quot;WELCOME10&quot;</code> to
            that shared list and never clears it, so the list grows across every request the server
            handles, and every customer after the first one sees an ever-growing list of codes that were
            never theirs.
          </Para>

          <SubSubTitle>The fix, and why it mattered more than usual</SubSubTitle>

          <CodeBox label="The fix — None as the default, a fresh list per call">{`def build_checkout(customer_id, promo_codes=None):
    if promo_codes is None:
        promo_codes = []
    promo_codes.append("WELCOME10")
    return {"customer_id": customer_id, "codes": promo_codes}`}</CodeBox>

          <Para>
            This bug is genuinely dangerous in a way many bugs are not, precisely because of{' '}
            <em>where</em> it hid: a long-running server process calls the same function thousands of
            times without ever restarting, so the shared mutable default keeps accumulating state across
            completely unrelated customers&apos; requests for as long as the process stays up. A quick
            local test — calling the function once or twice and restarting the script each time — would
            never have surfaced it, which is exactly why this class of bug tends to reach production
            before anyone notices.
          </Para>
        </div>
      </section>

      <Divider />

      {/* ── Part 08 — Misconceptions ── */}
      <section style={{ marginBottom: 64 }} data-toc-kind="myth">
        <SectionTag text="// Part 08 — Misconceptions" />
        <SectionTitle>Four Misconceptions About Functions</SectionTitle>

        {[
          {
            wrong: '"def greet(name, greeting="Hello"): re-evaluates greeting="Hello" fresh on every call"',
            right: 'Default values are evaluated exactly ONCE, when the def statement runs, not on every call. For an immutable default like a string this is invisible and harmless. For a mutable default like a list or dict, it means every call sharing the default is sharing the exact same object — the mutable-default trap from Part 02.',
          },
          {
            wrong: '"print() and return basically do the same thing — showing the result"',
            right: 'print() only displays a value in the terminal; the function itself still returns None unless a separate return statement exists. return hands a real value back to the calling code, where it can be stored, passed on, or used in further computation. Confusing the two is one of the most common sources of a mysterious None appearing where a real value was expected.',
          },
          {
            wrong: '"A function can only return one value"',
            right: 'Formally true, but practically not a limitation — a function can return a single tuple containing as many values as needed, and Python\'s unpacking syntax (lowest, highest = get_min_max(...)) makes this feel exactly like returning multiple values.',
          },
          {
            wrong: '"You need the global keyword any time a function uses a variable defined outside it"',
            right: 'global is only needed when a function needs to ASSIGN to (rewrite) a global variable. Simply reading a global variable\'s current value from inside a function works with no special syntax at all — the global keyword exists specifically to resolve the ambiguity that arises only when assignment is involved.',
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

      {/* ── Part 09 — Interview Prep ── */}
      <section style={{ marginBottom: 64 }} data-toc-kind="prep">
        <SectionTag text="// Part 09 — Interview Prep" />
        <SectionTitle>5 Interview Questions — With Complete Answers</SectionTitle>

        {[
          {
            q: 'Explain the mutable default argument trap in Python, and how to avoid it.',
            a: 'Default parameter values are evaluated exactly once, at the time the function is defined, not once per call. If that default is a mutable object like a list or dict, every call that relies on the default shares the exact same object across calls, and mutations from one call (like an append) persist and are visible in later calls. The standard fix is to use None as the default and create the real mutable object inside the function body: if arg is None: arg = [].',
          },
          {
            q: 'What is the difference between print() and return inside a function?',
            a: 'print() writes text to the terminal for a human to read, but does not make any value available to the calling code — a function that only prints still returns None. return sends a value back to the caller, where it can be stored in a variable, passed to another function, or used in further computation. Confusing the two is a common source of unexpected None values.',
          },
          {
            q: 'What are *args and **kwargs, and when would you use them?',
            a: '*args collects any number of extra positional arguments into a tuple inside the function; **kwargs collects any number of extra keyword arguments into a dict. They are used when a function needs to accept a flexible, not-known-in-advance number of arguments — common in wrapper functions, decorators, and library code that needs to remain forward-compatible with arguments it does not need to inspect directly.',
          },
          {
            q: 'What happens if a function has no return statement, or a bare return with no value?',
            a: 'It implicitly returns None. This is not a special case or an error — it is Python\'s consistent way of representing "this function call produced no meaningful value," identical to the None you would get from a function that explicitly wrote "return None".',
          },
          {
            q: 'Why does counter += 1 inside a function raise an UnboundLocalError if counter is a global variable, without the global keyword?',
            a: 'Python decides whether a name is local or global for an ENTIRE function body at compile time, based on whether that name is ever assigned to anywhere inside the function. Since counter += 1 contains an assignment to counter, Python treats counter as local for the whole function — including on the read side of +=, which happens before any local value has been assigned, causing the error. The global keyword tells Python explicitly that assignments to that name inside the function should modify the global variable instead of creating a new local one.',
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
        <SectionTitle>Function Mistakes Beginners Make Constantly</SectionTitle>

        {[
          {
            q: 'Using a mutable default argument (=[] or ={})',
            a: 'As shown in Part 02, this creates one shared object reused across every call that omits the argument. Always use None as the default and create the mutable object inside the function body instead.',
          },
          {
            q: 'Forgetting that a function without return gives back None',
            a: 'A function that only prints its result still returns None. Trying to use that None in further computation (like adding it to a number) raises a TypeError. Add an explicit return if the value needs to be used again.',
          },
          {
            q: 'Putting a parameter without a default after one that has one',
            a: 'def f(a=1, b): is a SyntaxError. Parameters with default values must come after every parameter without a default — Python needs to be able to tell which arguments are optional purely from their position in the parameter list.',
          },
          {
            q: 'Trying to modify a global variable from inside a function without the global keyword',
            a: 'Assigning to a name inside a function makes Python treat it as local for the entire function body, causing an UnboundLocalError if that name is also read before the assignment. Use global explicitly if a function genuinely needs to modify a variable defined outside it — though passing values in and returning results out is usually the better design.',
          },
          {
            q: 'Confusing a function\'s docstring with a regular comment',
            a: 'A docstring must be the very first statement inside the function body, as a string literal — not a # comment. Only a properly placed docstring is accessible via help() or function.__doc__, and only it is picked up by documentation-generation tools.',
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
        <SectionTitle>Errors You Will Hit With Functions — And Exactly Why</SectionTitle>

        {[
          {
            error: `TypeError: greet() missing 1 required positional argument: 'name'`,
            cause: 'The function was called without supplying a value for a parameter that has no default — Python cannot proceed without it.',
            fix: 'Pass the missing argument, either positionally or by keyword, or give the parameter a default value in the function definition if it should genuinely be optional.',
          },
          {
            error: `TypeError: greet() takes 1 positional argument but 2 were given`,
            cause: 'Too many arguments were passed at the call site — more than the function\'s parameter list can accept, and the function has no *args to absorb the extra ones.',
            fix: 'Check the function\'s definition for exactly how many parameters it expects, and remove the extra argument(s) or add *args if the function is genuinely meant to accept a variable number.',
          },
          {
            error: `UnboundLocalError: local variable 'counter' referenced before assignment`,
            cause: 'A variable is assigned to somewhere inside a function (making Python treat it as local for the whole function body) but is read on an earlier line within that same function, before any local value has actually been assigned — commonly caused by counter += 1 on a name that was meant to refer to a global.',
            fix: 'Add "global counter" at the top of the function if you genuinely intend to modify the global variable, or rename the local variable if the collision was accidental.',
          },
          {
            error: `SyntaxError: non-default argument follows default argument`,
            cause: 'A required parameter (no default value) was placed after an optional one (with a default) in the function\'s parameter list.',
            fix: 'Reorder the parameters so every parameter with a default value comes after every parameter without one.',
          },
          {
            error: `NameError: name 'subtotal' is not defined (used outside the function it was created in)`,
            cause: 'A variable created inside a function only exists in that function\'s local scope — it does not exist at all once the function returns, and was never visible outside it in the first place.',
            fix: 'Return the value from the function and capture it in a variable in the calling code if it needs to be used elsewhere: result = calculate_total().',
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
        'A parameter is the name in the function definition; an argument is the actual value passed at the call site. Arguments can be positional (matched by order) or keyword (matched by name).',
        'Default parameter values are evaluated exactly once, when the function is defined — never use a mutable object (list, dict, set) as a default. Use None and create the real object inside the function body.',
        '*args collects extra positional arguments into a tuple; **kwargs collects extra keyword arguments into a dict.',
        'print() only displays a value; return hands it back to the caller for actual use. A function with no return statement implicitly returns None.',
        'A function can only formally return one value, but that value can be a tuple, which Python\'s unpacking syntax makes feel like returning multiple values.',
        'Docstrings are string literals placed as the first line inside a function, accessible via help() and function.__doc__ — unlike a regular comment.',
        'Variables created inside a function are local — they do not exist outside it. Functions can read global variables freely, but need the global keyword to assign to one.',
        'Full scope rules, including nested functions and closures, get a dedicated module (31) later in this track — this module is deliberately just the foundation.',
      ]} />

      {/* ── Next Module CTA ── */}
      <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 10, padding: '24px', marginTop: 40 }}>
        <p style={{ fontSize: 10, color: 'var(--muted)', letterSpacing: '.12em', textTransform: 'uppercase', fontFamily: 'var(--font-mono)', fontWeight: 700, margin: '0 0 10px' }}>
          What comes next
        </p>
        <p style={{ fontSize: 15, color: 'var(--text)', lineHeight: 1.85, margin: '0 0 20px' }}>
          Module 08 covers lists in depth — the workhorse data structure of Python — indexing, slicing,
          every common method, and the mutability behaviour this module&apos;s mutable-default trap was
          really foreshadowing.
        </p>
        <Link href="/learn/python/lists" style={{ background: C, color: '#000', padding: '11px 24px', borderRadius: 7, fontWeight: 700, fontSize: 13, textDecoration: 'none', display: 'inline-block' }}>
          Module 08 → Lists — Creation, Indexing, Methods
        </Link>
      </div>
    </LearnLayout>
  )
}
