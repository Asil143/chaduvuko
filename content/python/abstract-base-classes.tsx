import type { Metadata } from 'next'
import { LearnLayout } from '@/components/content/LearnLayout'
import Link from 'next/link'
import { Callout } from '@/components/content/Callout'
import { KeyTakeaways } from '@/components/content/KeyTakeaways'

export const metadata: Metadata = {
  title: 'Abstract Base Classes and Interfaces — Python | Chaduvuko',
  description:
    'Enforcing a contract across subclasses with the abc module — how larger Python codebases stay consistent.',
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

export default function AbstractBaseClasses() {
  return (
    <LearnLayout
      title="Abstract Base Classes and Interfaces"
      description="Enforcing a contract across subclasses with the abc module — how larger Python codebases stay consistent."
      section="Python — Module 24"
      readTime="30 min"
      updatedAt="August 2026"
    >

      {/* ── Part 01 ── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 01 — The Problem ABCs Solve" />
        <SectionTitle>What Happens Without Any Enforced Contract</SectionTitle>

        <Para>
          Imagine a base class <code>PaymentProcessor</code> that every payment provider (Stripe,
          PayPal, a bank transfer integration) is meant to subclass, each implementing its own{' '}
          <code>charge()</code> method. Nothing in plain Python stops someone from writing a subclass
          that simply forgets to implement <code>charge()</code> — the mistake is only discovered at
          runtime, the moment the missing method is actually called, potentially in production.
        </Para>

        <CodeBox label="A silent, easy-to-make mistake with a plain base class">{`class PaymentProcessor:
    def charge(self, amount):
        raise NotImplementedError

class StripeProcessor(PaymentProcessor):
    def charge(self, amount):
        return f"Charged \${amount} via Stripe"

class PayPalProcessor(PaymentProcessor):
    pass   # oops — forgot to override charge()! Nothing stops this from being defined.

p = PayPalProcessor()
p.charge(50)     # NotImplementedError — but only discovered when this line actually runs`}</CodeBox>

        <Para>
          The <code>raise NotImplementedError</code> pattern communicates intent to a human reader, but
          it provides <strong>zero</strong> enforcement — <code>PayPalProcessor</code> was allowed to be
          defined, instantiated, and passed around the codebase perfectly normally, with the bug lying
          dormant until the exact line that calls <code>charge()</code> executes. Abstract base classes
          fix exactly this: they move the failure from "runtime, whenever this method happens to be
          called" to "the moment the incomplete subclass is instantiated at all."
        </Para>
      </section>

      <Divider />

      {/* ── Part 02 ── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 02 — The abc Module" />
        <SectionTitle>ABC and @abstractmethod</SectionTitle>

        <Para>
          Python's standard library <code>abc</code> module provides <code>ABC</code> (a base class to
          inherit from) and the <code>@abstractmethod</code> decorator, which together turn the informal{' '}
          <code>NotImplementedError</code> pattern into something the interpreter actively enforces.
        </Para>

        <CodeBox label="The same example, properly enforced">{`from abc import ABC, abstractmethod

class PaymentProcessor(ABC):
    @abstractmethod
    def charge(self, amount):
        ...

class StripeProcessor(PaymentProcessor):
    def charge(self, amount):
        return f"Charged \${amount} via Stripe"

class PayPalProcessor(PaymentProcessor):
    pass   # forgot to override charge()

s = StripeProcessor()     # fine — every abstract method is implemented
p = PayPalProcessor()     # TypeError, IMMEDIATELY, at instantiation:
# TypeError: Can't instantiate abstract class PayPalProcessor with abstract method charge`}</CodeBox>

        <Para>
          The critical difference: <code>PayPalProcessor</code> can no longer even be{' '}
          <strong>constructed</strong> until every abstract method inherited from{' '}
          <code>PaymentProcessor</code> has a real implementation. The bug is caught the instant the
          incomplete class is used, not buried until the specific missing method happens to be called —
          which, for a rarely-exercised code path, could otherwise take months to surface.
        </Para>

        <SubTitle>An ABC itself can never be instantiated directly, even with every method defined</SubTitle>

        <CodeBox label="Attempting to instantiate the abstract base class itself">{`pp = PaymentProcessor()
# TypeError: Can't instantiate abstract class PaymentProcessor with abstract method charge
# This fails even though PaymentProcessor "defines" charge — because it's abstract`}</CodeBox>
      </section>

      <Divider />

      {/* ── Part 03 ── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 03 — Abstract Properties and Multiple Requirements" />
        <SectionTitle>An ABC Can Require More Than Just Methods</SectionTitle>

        <Para>
          An abstract base class can require multiple abstract methods, and even abstract properties —
          any subclass must satisfy every one of them before it becomes instantiable.
        </Para>

        <CodeBox label="A richer contract with multiple requirements">{`from abc import ABC, abstractmethod

class Shape(ABC):
    @property
    @abstractmethod
    def area(self):
        ...

    @abstractmethod
    def perimeter(self):
        ...

class Rectangle(Shape):
    def __init__(self, width, height):
        self.width, self.height = width, height

    @property
    def area(self):
        return self.width * self.height

    def perimeter(self):
        return 2 * (self.width + self.height)

# Circle(Shape) that only implements area(), forgetting perimeter(),
# would still raise TypeError at instantiation — EVERY abstract member must be covered.`}</CodeBox>

        <Callout type="tip">
          This is genuinely valuable in larger codebases with several engineers implementing different
          subclasses of the same base over time — a plugin system, several data-source adapters, several
          payment providers. The ABC acts as living, enforced documentation of exactly what a valid
          implementation must provide, catching an incomplete implementation immediately rather than
          leaving it to be discovered by whoever happens to exercise the missing piece later.
        </Callout>
      </section>

      <Divider />

      {/* ── Part 04 ── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 04 — Duck Typing vs Formal Interfaces" />
        <SectionTitle>Two Different Philosophies, Both Native to Python</SectionTitle>

        <Para>
          Python is famous for <strong>duck typing</strong> — "if it walks like a duck and quacks like a
          duck, it's a duck": code that calls <code>obj.quack()</code> does not care what class{' '}
          <code>obj</code> actually is, only that it has a <code>quack</code> method. ABCs might look like
          they contradict this philosophy by introducing formal, enforced contracts — but they coexist
          deliberately, for different situations.
        </Para>

        <CodeBox label="Pure duck typing — no formal contract at all">{`def make_it_quack(duck):
    return duck.quack()   # works on ANY object with a quack() method, no inheritance required

class RealDuck:
    def quack(self): return "Quack!"

class ToyDuck:
    def quack(self): return "Squeak-quack (it's a toy)"

make_it_quack(RealDuck())   # works
make_it_quack(ToyDuck())    # also works — no shared base class needed at all`}</CodeBox>

        <Para>
          Duck typing is the right default for most everyday Python — it is flexible and requires no
          upfront ceremony. ABCs earn their place specifically when you want the interpreter to{' '}
          <strong>actively enforce</strong> that a family of related classes all implement a required
          set of methods, and to fail loudly and immediately (at instantiation) if one does not — most
          valuable in plugin-style architectures, or any codebase where several people implement
          subclasses of a shared base independently over time.
        </Para>

        <SubTitle>A brief look ahead — typing.Protocol</SubTitle>
        <Para>
          Python's <code>typing</code> module offers a third option, <code>Protocol</code>, which
          combines aspects of both: it lets you describe a required "shape" (structural typing) without
          requiring explicit inheritance from anything — an object satisfies a{' '}
          <code>Protocol</code> just by having the right methods, similar to duck typing, but the shape
          can still be checked by a type checker like mypy ahead of time. This is covered properly in the
          later Type Hints and Static Typing module.
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
        <SectionTitle>A Plugin System at a Chicago Data Platform Company</SectionTitle>

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
            Scenario — Data platform company, Chicago · Extensible data-source system
          </div>

          <Para>
            A platform needs to support pulling data from many different sources — S3, a REST API, a
            local CSV drop folder — with new source types added by different engineers over time as the
            company grows. The team defines an ABC to guarantee every source, whoever writes it, exposes
            a consistent interface the rest of the pipeline can rely on.
          </Para>

          <CodeBox label="The contract every data source must satisfy">{`from abc import ABC, abstractmethod

class DataSource(ABC):
    @abstractmethod
    def connect(self):
        ...

    @abstractmethod
    def fetch_records(self):
        ...

    @abstractmethod
    def close(self):
        ...

class S3Source(DataSource):
    def connect(self):
        self.client = build_s3_client()

    def fetch_records(self):
        return self.client.list_objects()

    def close(self):
        self.client = None

# A new engineer adds RestApiSource(DataSource) but forgets close() —
# TypeError at instantiation, caught in code review / CI, not in production`}</CodeBox>

          <SubSubTitle>Why this mattered as the team grew</SubSubTitle>

          <Para>
            The pipeline code that consumes any <code>DataSource</code> — running{' '}
            <code>source.connect()</code>, then <code>source.fetch_records()</code>, then always{' '}
            <code>source.close()</code> — can rely completely on every source implementing all three
            methods, without ever needing to check with <code>hasattr()</code> or wrap calls in{' '}
            <code>try</code>/<code>except AttributeError</code>. As more engineers added new source
            types over the following year, several genuinely did forget one method during initial
            development — and every single time, the mistake was caught immediately by a failing test
            that tried to instantiate the class, well before the code reached production.
          </Para>
        </div>
      </section>

      <Divider />

      {/* ── Part 06 — Misconceptions ── */}
      <section style={{ marginBottom: 64 }} data-toc-kind="myth">
        <SectionTag text="// Part 06 — Misconceptions" />
        <SectionTitle>Four Misconceptions About Abstract Base Classes</SectionTitle>

        {[
          {
            wrong: '"raise NotImplementedError in a base method is basically the same as using abc"',
            right: 'It communicates intent to a human reader but enforces nothing — a subclass that forgets to override the method can still be instantiated and passed around fine, only failing later when that specific method is actually called. An ABC with @abstractmethod fails immediately at instantiation instead, catching the mistake far earlier.',
          },
          {
            wrong: '"Using ABCs means you\'ve abandoned duck typing / Python\'s dynamic nature"',
            right: 'They coexist deliberately for different situations — duck typing remains the right default for most everyday code; ABCs earn their place specifically when you want an ENFORCED, fail-fast contract across a family of related subclasses, commonly in plugin-style architectures.',
          },
          {
            wrong: '"An abstract base class can be instantiated as long as you don\'t call the abstract method"',
            right: 'Python raises TypeError at INSTANTIATION time (the moment you write ClassName()), not when the abstract method is called — you cannot construct an instance of a class with any unimplemented abstract method at all, regardless of whether you intended to call it.',
          },
          {
            wrong: '"@abstractmethod bodies must always be exactly \'pass\' or \'...\'"',
            right: 'An abstract method CAN have a real implementation, which subclasses can optionally call via super() as a shared default/partial behaviour — @abstractmethod only enforces that subclasses provide their OWN override; it does not forbid the base method from doing something.',
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
            q: 'What problem does an abstract base class solve that raise NotImplementedError alone does not?',
            a: 'raise NotImplementedError only fails when the specific unimplemented method is actually CALLED at runtime — a subclass that forgot to override it can still be freely instantiated and passed around the codebase until that exact call happens. ABC + @abstractmethod moves the failure to instantiation time itself: an incomplete subclass raises TypeError the moment ClassName() is written, catching the mistake far earlier, often in tests or CI rather than production.',
          },
          {
            q: 'Can you instantiate a class that inherits from ABC and defines every abstract method?',
            a: 'Yes — once every abstract method (and abstract property) is overridden with a concrete implementation, the subclass becomes fully instantiable like any normal class. The ABC itself, and any subclass still missing even one required member, cannot be instantiated.',
          },
          {
            q: 'How do duck typing and abstract base classes coexist in Python\'s design philosophy?',
            a: 'They serve different needs. Duck typing (relying on an object simply having the right method, with no shared base class required) is the flexible, low-ceremony default for most code. ABCs are reached for when you specifically want an enforced, fail-fast contract across a family of related subclasses — commonly plugin systems or multi-team codebases where consistency needs to be guaranteed, not just hoped for.',
          },
          {
            q: 'What happens if you try to instantiate the abstract base class itself, even if it provides implementations for all its abstract methods?',
            a: 'It still raises TypeError — a class is considered abstract, and therefore uninstantiable, as long as it has ANY method decorated with @abstractmethod, regardless of whether that method has a body. Abstractness is a property of the class itself, not of whether the methods happen to be implemented.',
          },
          {
            q: 'How would you require a subclass to implement a computed value, not just a method?',
            a: 'Stack @property above @abstractmethod on the same method (in that order) to define an abstract property — subclasses must then implement it as an actual @property returning a value, and the class remains uninstantiable until they do, exactly like an abstract method.',
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
        <SectionTitle>ABC Mistakes Beginners Make Constantly</SectionTitle>

        {[
          {
            q: 'Forgetting to inherit from ABC',
            a: '@abstractmethod has no enforcement effect at all unless the class itself also inherits from abc.ABC (or uses ABCMeta as its metaclass) — a plain class with @abstractmethod-decorated methods can be instantiated normally, silently ignoring the decorator.',
          },
          {
            q: 'Expecting an ABC to stop a subclass from adding EXTRA methods beyond the contract',
            a: 'ABCs only enforce a MINIMUM required set of methods — subclasses are always free to add additional methods and attributes beyond what the abstract base requires. There is no mechanism to forbid extra members.',
          },
          {
            q: 'Stacking @abstractmethod and @property in the wrong order',
            a: '@property must be the OUTER (topmost) decorator, with @abstractmethod directly above the method definition — writing them in the reverse order does not correctly register the method as both abstract and a property.',
          },
          {
            q: 'Assuming ABCs provide any runtime type-checking beyond "was every abstract method implemented"',
            a: 'ABCs do not check method SIGNATURES (parameter names, types, or counts) — a subclass can implement charge(self, amount) as charge(self, amount, currency="USD") and satisfy the ABC just fine. For genuine signature-level checking, reach for type hints and a static checker like mypy.',
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
        <SectionTitle>Errors You Will Hit With Abstract Base Classes — And Exactly Why</SectionTitle>

        {[
          {
            error: `TypeError: Can't instantiate abstract class PayPalProcessor with abstract method charge`,
            cause: 'A subclass of an ABC did not override one or more of the base class\'s @abstractmethod-decorated members.',
            fix: 'Implement every abstract method (and abstract property) listed in the error — Python names exactly which ones are still missing.',
          },
          {
            error: `TypeError: Can't instantiate abstract class PaymentProcessor with abstract method charge`,
            cause: 'Attempting to instantiate the ABC itself, not a subclass — a class remains abstract, and therefore uninstantiable, as long as it has any unimplemented @abstractmethod, regardless of whether you meant to use it directly.',
            fix: 'Instantiate a concrete subclass instead, never the ABC itself.',
          },
          {
            error: `TypeError: metaclass conflict: the metaclass of a derived class must be a (non-strict) subclass of the metaclasses of all its bases`,
            cause: 'A class attempts to inherit from both ABC and another class that uses a different, incompatible custom metaclass.',
            fix: 'This is rare in everyday code; it typically requires either dropping ABC in favour of typing.Protocol, or defining a combined metaclass that satisfies both parents — usually a sign the design should be reconsidered.',
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
        'raise NotImplementedError alone only fails when the method is actually called; abc.ABC + @abstractmethod fails immediately at instantiation, catching incomplete subclasses far earlier.',
        'A class inheriting from ABC cannot be instantiated until every @abstractmethod (and abstract @property) it declares has a concrete override in the subclass.',
        'The ABC itself can never be instantiated directly, even if all its abstract methods happen to have implementations — abstractness is a property of the class, not of whether the bodies are filled in.',
        'ABCs and duck typing coexist deliberately — duck typing for flexible everyday code, ABCs for enforced contracts across plugin-style or multi-team class families.',
        'ABCs check WHICH methods exist, not their signatures — for real signature-level checking, pair them with type hints and mypy (covered in a later module).',
        'typing.Protocol offers a structural-typing alternative that does not require explicit inheritance — worth knowing about even before its full coverage later in this track.',
      ]} />

      {/* ── Next Module CTA ── */}
      <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 10, padding: '24px', marginTop: 40 }}>
        <p style={{ fontSize: 10, color: 'var(--muted)', letterSpacing: '.12em', textTransform: 'uppercase', fontFamily: 'var(--font-mono)', fontWeight: 700, margin: '0 0 10px' }}>
          What comes next
        </p>
        <p style={{ fontSize: 15, color: 'var(--text)', lineHeight: 1.85, margin: '0 0 20px' }}>
          Module 25 begins the Intermediate & Functional Python phase with a deep dive into *args and
          **kwargs — every way Python lets you pass arguments to a function.
        </p>
        <Link href="/learn/python/args-kwargs" style={{ background: C, color: '#000', padding: '11px 24px', borderRadius: 7, fontWeight: 700, fontSize: 13, textDecoration: 'none', display: 'inline-block' }}>
          Module 25 → *args, **kwargs and Function Arguments Deep Dive
        </Link>
      </div>
    </LearnLayout>
  )
}
