import type { Metadata } from 'next'
import { LearnLayout } from '@/components/content/LearnLayout'
import Link from 'next/link'
import { Callout } from '@/components/content/Callout'
import { KeyTakeaways } from '@/components/content/KeyTakeaways'

export const metadata: Metadata = {
  title: 'Class Methods, Static Methods and Properties — Python | Chaduvuko',
  description:
    '@classmethod, @staticmethod, and @property — what each is actually for, with real examples of when to reach for each.',
}

const C = '#f97316'

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

export default function ClassStaticMethodsProperties() {
  return (
    <LearnLayout
      title="Class Methods, Static Methods and Properties"
      description="@classmethod, @staticmethod, and @property — what each is actually for, with real examples of when to reach for each."
      section="Python — Module 23"
      readTime="35 min"
      updatedAt="August 2026"
    >

      {/* ── Part 01 ── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 01 — Three Kinds of Method, One Class" />
        <SectionTitle>Instance Methods vs Class Methods vs Static Methods</SectionTitle>

        <Para>
          Every method you have written so far has been an <strong>instance method</strong> — it takes{' '}
          <code>self</code> as its first parameter and operates on one specific object. Python offers two
          other kinds of method, each with a different relationship to the class, and each declared with
          a decorator.
        </Para>

        <CodeBox label="All three side by side">{`class Pizza:
    def __init__(self, toppings):
        self.toppings = toppings

    def describe(self):                     # instance method — needs a specific pizza
        return f"Pizza with {', '.join(self.toppings)}"

    @classmethod
    def margherita(cls):                    # class method — receives the CLASS, not an instance
        return cls(["tomato", "mozzarella", "basil"])

    @staticmethod
    def is_valid_topping(topping):          # static method — receives NEITHER
        return topping.lower() not in {"pineapple"}

p = Pizza.margherita()          # an alternate way to construct a Pizza, no instance needed yet
print(p.describe())             # "Pizza with tomato, mozzarella, basil"
print(Pizza.is_valid_topping("pineapple"))   # False`}</CodeBox>

        <Para>
          The distinction is entirely about what the method automatically receives as its first
          argument: an instance method receives the specific object (<code>self</code>); a class method
          receives the class itself (<code>cls</code>) — useful when the logic needs to know about the
          class but not about any particular instance; a static method receives neither — it is really
          just a regular function that happens to live inside the class's namespace for organisational
          purposes.
        </Para>
      </section>

      <Divider />

      {/* ── Part 02 ── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 02 — @classmethod as Alternate Constructors" />
        <SectionTitle>The Single Most Common Real Use of @classmethod</SectionTitle>

        <Para>
          Python only allows one <code>__init__</code> per class, but real-world objects often need to be
          built from several different kinds of input — a raw dict from an API, a CSV row, a set of
          sensible defaults. <code>@classmethod</code> alternate constructors are the standard way to
          offer several named ways to build an object, all funnelling into the same{' '}
          <code>__init__</code>.
        </Para>

        <CodeBox label="Alternate constructors — a genuinely common real pattern">{`class User:
    def __init__(self, username, email, is_admin=False):
        self.username = username
        self.email = email
        self.is_admin = is_admin

    @classmethod
    def from_api_response(cls, data):
        return cls(
            username=data["user_name"],
            email=data["contact_email"],
            is_admin=data.get("role") == "admin",
        )

    @classmethod
    def guest(cls):
        return cls(username="guest", email="")

api_data = {"user_name": "asha", "contact_email": "asha@example.com", "role": "admin"}
u1 = User.from_api_response(api_data)
u2 = User.guest()`}</CodeBox>

        <Para>
          The reason this is a <code>classmethod</code> and not just a plain standalone function:{' '}
          <code>cls</code> refers to whichever class it was actually called on, so if{' '}
          <code>AdminUser</code> subclasses <code>User</code>, calling{' '}
          <code>AdminUser.from_api_response(data)</code> correctly builds an <code>AdminUser</code>{' '}
          instance, not a plain <code>User</code> — a standalone function hardcoding{' '}
          <code>User(...)</code> could never do that.
        </Para>
      </section>

      <Divider />

      {/* ── Part 03 ── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 03 — @staticmethod as Namespacing" />
        <SectionTitle>When You Just Want a Function to Live Near Its Class</SectionTitle>

        <Para>
          A static method is, functionally, just a plain function — it does not receive{' '}
          <code>self</code> or <code>cls</code>, and it cannot access or modify instance or class state
          directly. Its only real purpose is <strong>organisation</strong>: grouping a piece of logic
          that is conceptually related to the class, even though it does not need any of the class's
          data.
        </Para>

        <CodeBox label="A validator that doesn't need any instance or class data">{`class Pizza:
    @staticmethod
    def is_valid_topping(topping):
        banned = {"pineapple", "anchovy"}
        return topping.lower() not in banned

# Callable from the class, without needing to build a Pizza first:
print(Pizza.is_valid_topping("mushroom"))   # True

# Also callable from an instance — works, but doesn't use the instance at all
p = Pizza()
print(p.is_valid_topping("pineapple"))      # False`}</CodeBox>

        <Callout type="tip">
          <strong>A useful gut check: if a method never touches <code>self</code> or <code>cls</code>,
          it should almost always be a <code>@staticmethod</code></strong> — writing it as a regular
          instance method that simply never uses <code>self</code> is a common, low-severity code smell
          that reviewers frequently flag, since it misleadingly implies the method depends on instance
          data when it does not.
        </Callout>
      </section>

      <Divider />

      {/* ── Part 04 ── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 04 — @property" />
        <SectionTitle>Computed Attributes That Look Like Plain Data</SectionTitle>

        <Para>
          <code>@property</code> lets a method be accessed with plain attribute syntax — no parentheses —
          which is useful for exposing a computed value that reads naturally as data, while still
          running real code underneath.
        </Para>

        <CodeBox label="Without @property — a getter method, called like a method">{`class Rectangle:
    def __init__(self, width, height):
        self.width = width
        self.height = height

    def get_area(self):
        return self.width * self.height

r = Rectangle(4, 5)
print(r.get_area())     # 20 — has to be called as a method`}</CodeBox>

        <CodeBox label="With @property — reads like a plain attribute">{`class Rectangle:
    def __init__(self, width, height):
        self.width = width
        self.height = height

    @property
    def area(self):
        return self.width * self.height

r = Rectangle(4, 5)
print(r.area)            # 20 — no parentheses! Reads exactly like a data attribute
r.area = 30               # AttributeError — this property has no setter yet (see below)`}</CodeBox>

        <SubTitle>Setters and deleters — controlling assignment, not just reads</SubTitle>

        <CodeBox label="Adding a setter with validation">{`class Rectangle:
    def __init__(self, width, height):
        self._width = width
        self.height = height

    @property
    def width(self):
        return self._width

    @width.setter
    def width(self, value):
        if value <= 0:
            raise ValueError("width must be positive")
        self._width = value

r = Rectangle(4, 5)
r.width = 10        # runs the setter — validated
r.width = -3        # ValueError: width must be positive`}</CodeBox>

        <Para>
          This is exactly why <code>@property</code> matters beyond convenience: it lets a class{' '}
          <strong>start</strong> as plain public attributes, and later add validation or computed logic
          without breaking any code that already does <code>rectangle.width = 10</code> — the calling
          code's syntax never has to change, only the class's internals do. This is a genuinely important
          design property (sometimes called "uniform access") that a language without properties, forcing
          every external caller to use <code>get_width()</code>/<code>set_width()</code> from day one,
          does not offer.
        </Para>
      </section>

      <Divider />

      {/* ── Part 05 — Real World ── */}
      <section style={{ marginBottom: 64 }} data-toc-kind="story">
        <SectionTag text="// Part 05 — Real World" />
        <div style={{
          fontSize: 10, fontWeight: 700, letterSpacing: '.12em',
          textTransform: 'uppercase', color: 'var(--muted)', marginBottom: 12,
          fontFamily: 'var(--font-mono)',
        }}>
          💼 What This Looks Like at Work
        </div>
        <SectionTitle>Refactoring a Public API Without Breaking Callers, at an Austin SaaS Company</SectionTitle>

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
            Scenario — SaaS company, Austin · Backwards-compatible internal refactor
          </div>

          <Para>
            A <code>Subscription</code> class originally stores <code>monthly_price</code> as a plain
            public attribute, used directly across dozens of call sites throughout the codebase. A new
            business rule arrives: the price must never be set below the plan's configured minimum, and
            every assignment needs to log a price-change event for billing audit purposes.
          </Para>

          <CodeBox label="Before — a plain attribute, used everywhere as sub.monthly_price = 29.99">{`class Subscription:
    def __init__(self, plan_minimum, monthly_price):
        self.plan_minimum = plan_minimum
        self.monthly_price = monthly_price`}</CodeBox>

          <CodeBox label="After — a property, with validation and logging, same external syntax">{`class Subscription:
    def __init__(self, plan_minimum, monthly_price):
        self.plan_minimum = plan_minimum
        self._monthly_price = monthly_price

    @property
    def monthly_price(self):
        return self._monthly_price

    @monthly_price.setter
    def monthly_price(self, value):
        if value < self.plan_minimum:
            raise ValueError(f"Price cannot go below the plan minimum of \${self.plan_minimum}")
        log_price_change(self._monthly_price, value)
        self._monthly_price = value`}</CodeBox>

          <SubSubTitle>Why this mattered</SubSubTitle>

          <Para>
            Every one of the dozens of existing call sites reading or writing{' '}
            <code>sub.monthly_price = ...</code> continued working with zero changes — the property is
            indistinguishable from a plain attribute to calling code. Had the class instead switched to{' '}
            <code>get_monthly_price()</code>/<code>set_monthly_price()</code> methods (the pattern from
            languages without properties), every single call site across the codebase would have needed
            updating in the same PR — a far larger, riskier change for what is fundamentally an internal
            implementation detail.
          </Para>
        </div>
      </section>

      <Divider />

      {/* ── Part 06 — Misconceptions ── */}
      <section style={{ marginBottom: 64 }} data-toc-kind="myth">
        <SectionTag text="// Part 06 — Misconceptions" />
        <SectionTitle>Four Misconceptions About Class/Static Methods and Properties</SectionTitle>

        {[
          {
            wrong: '"@staticmethod and @classmethod are basically interchangeable"',
            right: 'A classmethod receives the class itself (cls) as its first argument and can construct/reference the class dynamically (important for subclassing); a staticmethod receives neither and cannot reference the class at all without hardcoding its name. Reach for classmethod for alternate constructors, staticmethod for a genuinely standalone helper.',
          },
          {
            wrong: '"You should add @property to every attribute from the start, just in case"',
            right: 'Most attributes should simply be plain public attributes — that is the idiomatic Python default. Reach for @property specifically when you need validation, a computed value, or logging on read/write, not preemptively for attributes that are genuinely just data.',
          },
          {
            wrong: '"A static method inside a class can still access instance attributes if it needs to"',
            right: 'It genuinely cannot — it has no access to self or cls at all. If a method needs any instance or class data, it must be an instance method or classmethod respectively, not a staticmethod.',
          },
          {
            wrong: '"@classmethod is mainly useful for factory/alternate constructors, nothing else"',
            right: 'That is its most common use, but classmethods are also used for methods that need to operate on class-level state shared across all instances (like a running count of created instances), and in some inheritance-aware patterns where a method must know which subclass it was actually called on.',
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

      {/* ── Part 07 — Interview Prep ── */}
      <section style={{ marginBottom: 64 }} data-toc-kind="prep">
        <SectionTag text="// Part 07 — Interview Prep" />
        <SectionTitle>5 Interview Questions — With Complete Answers</SectionTitle>

        {[
          {
            q: 'What is the difference between @classmethod and @staticmethod?',
            a: 'A classmethod automatically receives the class itself as its first argument (conventionally named cls), letting it construct instances of the class or reference class-level state — and importantly, cls refers to whichever class it was actually called on, correctly supporting subclasses. A staticmethod receives neither self nor cls; it is effectively a plain function namespaced under the class purely for organisation.',
          },
          {
            q: 'Give a real, common use case for a @classmethod.',
            a: 'Alternate constructors — a class often needs to be built from several different kinds of input (a raw API dict, a CSV row, sensible defaults) while __init__ can only have one signature. A classmethod like from_api_response(cls, data) builds and returns an instance via cls(...), giving several named ways to construct the same class.',
          },
          {
            q: 'What does @property actually change about how a method is called?',
            a: 'It lets a method be accessed using plain attribute syntax (no parentheses) — obj.area instead of obj.area(). This allows a class to expose validated or computed values that read exactly like data attributes to calling code.',
          },
          {
            q: 'Why would you convert a plain public attribute into a @property later, instead of just leaving it public?',
            a: "It lets you add validation, computed logic, or side effects (like logging) on read/write WITHOUT changing the external syntax anyone else's code uses to access it — existing call sites doing obj.attr or obj.attr = value keep working unchanged, unlike switching to get_/set_ methods, which would require updating every call site.",
          },
          {
            q: 'What happens if you assign to a @property that only has a getter defined, no setter?',
            a: 'Python raises an AttributeError, because a property without an explicit @x.setter is effectively read-only from outside the class — attempting obj.prop = value has no defined behaviour to run.',
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
        <SectionTitle>Method Decorator Mistakes Beginners Make Constantly</SectionTitle>

        {[
          {
            q: 'Forgetting self on a regular instance method',
            a: 'def describe(): rather than def describe(self): raises a TypeError the moment it is called on an instance, since Python always passes the instance as the first argument automatically for instance methods.',
          },
          {
            q: 'Using @staticmethod when @classmethod was actually needed',
            a: 'A staticmethod-based "alternate constructor" that hardcodes the class name (return Pizza(...)) breaks for any subclass — calling SpecialPizza.margherita() would still return a plain Pizza, not a SpecialPizza. Use @classmethod with cls(...) whenever subclassing should be respected.',
          },
          {
            q: 'Naming the backing attribute the same as the property',
            a: 'def width(self): return self.width inside a @property causes infinite recursion (RecursionError) — the getter calls itself. The backing attribute must have a different name, conventionally with a leading underscore (self._width).',
          },
          {
            q: 'Adding a @property setter that does validation but forgetting the getter still needs to exist',
            a: 'A @x.setter decorator requires a property named x to already be defined via @property above it — defining only the setter without the getter raises a NameError, since there is no property named x yet to attach the setter to.',
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
        <SectionTitle>Errors You Will Hit With Method Decorators — And Exactly Why</SectionTitle>

        {[
          {
            error: `TypeError: describe() takes 0 positional arguments but 1 was given`,
            cause: 'An instance method was defined without self as its first parameter, but Python still automatically passes the instance when it is called normally.',
            fix: 'Add self as the first parameter, or add @staticmethod above it if it genuinely should not receive the instance.',
          },
          {
            error: `AttributeError: can't set attribute 'area'`,
            cause: 'Attempting to assign to a @property that has no @x.setter defined — it is effectively read-only.',
            fix: 'Add a setter with @propertyname.setter if assignment should be allowed, or stop trying to assign to a value that is meant to be purely computed.',
          },
          {
            error: `RecursionError: maximum recursion depth exceeded`,
            cause: 'A @property getter (or setter) refers to self.<same_name> internally, calling itself infinitely instead of the intended backing attribute.',
            fix: 'Store the real value under a differently-named backing attribute, typically with a leading underscore (self._width), and have the property read/write that instead of its own name.',
          },
          {
            error: `NameError: name 'width' is not defined`,
            cause: '@width.setter was used without a preceding @property-decorated method named width already defined in the class.',
            fix: 'Define the getter first with @property before adding a matching @width.setter beneath it.',
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
        'Instance methods receive self (the specific object); classmethods receive cls (the class itself); staticmethods receive neither.',
        '@classmethod is most commonly used for alternate constructors (User.from_api_response(data)) — and correctly respects subclasses, unlike a hardcoded standalone function.',
        '@staticmethod is for a helper that is conceptually related to the class but never touches instance or class state — if a method never uses self or cls, it is a strong candidate for @staticmethod.',
        '@property lets a method be accessed with plain attribute syntax, enabling validation or computed values without breaking existing calling code that reads/writes it like a normal attribute.',
        'The backing attribute behind a property must have a different name than the property itself (typically a leading underscore) to avoid infinite recursion.',
        'A property with no @x.setter is effectively read-only from outside the class, raising AttributeError on assignment.',
      ]} />

      {/* ── Next Module CTA ── */}
      <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 10, padding: '24px', marginTop: 40 }}>
        <p style={{ fontSize: 10, color: 'var(--muted)', letterSpacing: '.12em', textTransform: 'uppercase', fontFamily: 'var(--font-mono)', fontWeight: 700, margin: '0 0 10px' }}>
          What comes next
        </p>
        <p style={{ fontSize: 15, color: 'var(--text)', lineHeight: 1.85, margin: '0 0 20px' }}>
          Module 24 closes out the Object-Oriented Python phase with abstract base classes — enforcing a
          contract across subclasses with Python's abc module.
        </p>
        <Link href="/learn/python/abstract-base-classes" style={{ background: C, color: '#000', padding: '11px 24px', borderRadius: 7, fontWeight: 700, fontSize: 13, textDecoration: 'none', display: 'inline-block' }}>
          Module 24 → Abstract Base Classes and Interfaces
        </Link>
      </div>
    </LearnLayout>
  )
}
