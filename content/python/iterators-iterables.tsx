import type { Metadata } from 'next'
import { LearnLayout } from '@/components/content/LearnLayout'
import Link from 'next/link'
import { Callout } from '@/components/content/Callout'
import { KeyTakeaways } from '@/components/content/KeyTakeaways'

export const metadata: Metadata = {
  title: 'Iterators and Iterables — Building Your Own — Python | Chaduvuko',
  description:
    'What Python actually does when you write a for loop, the iterable vs iterator protocols, and how to build your own iterator class from scratch.',
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

export default function IteratorsIterables() {
  return (
    <LearnLayout
      title="Iterators and Iterables — Building Your Own"
      description="What Python actually does when you write a for loop, the iterable vs iterator protocols, and how to build your own iterator class."
      section="Python — Module 27"
      readTime="50 min"
      updatedAt="August 2026"
    >

      {/* ── Part 01 ── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 01 — The Iterable Protocol" />
        <SectionTitle>What Makes an Object Iterable — __iter__</SectionTitle>

        <Para>
          Since Module 06, you have written dozens of <code>for</code> loops over lists, strings,
          dicts, and ranges without asking what actually makes those objects loop-able in the first
          place. The answer is a specific, well-defined contract: an object is <strong>iterable</strong>{' '}
          if it implements a method called <code>__iter__</code>, which returns an{' '}
          <strong>iterator</strong> — a separate, related object covered in Part 02. This is exactly the
          same "special method" mechanism you met in the Object-Oriented Python phase with{' '}
          <code>__init__</code>, <code>__str__</code>, and <code>__eq__</code> — Python calls it
          implicitly, on your behalf, whenever the situation calls for it.
        </Para>

        <CodeBox label="Every built-in you already loop over implements __iter__">{`numbers = [1, 2, 3]
print(hasattr(numbers, "__iter__"))   # True

text = "hello"
print(hasattr(text, "__iter__"))      # True

count = 42
print(hasattr(count, "__iter__"))     # False — you cannot "for x in 42:", and this is why`}</CodeBox>

        <Para>
          You can call <code>__iter__</code> directly, though you almost never would in real code — the{' '}
          <code>for</code> loop and the built-in <code>iter()</code> function both call it for you
          automatically. What matters right now is simply that "iterable" is not a vague, informal
          description — it is a precise, checkable contract: does this object have a working{' '}
          <code>__iter__</code> method, yes or no.
        </Para>
      </section>

      <Divider />

      {/* ── Part 02 ── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 02 — The Iterator Protocol" />
        <SectionTitle>What Makes an Object an Iterator — __iter__ Plus __next__</SectionTitle>

        <Para>
          An <strong>iterator</strong> is a related but distinct concept: an object that implements
          both <code>__iter__</code> (which, on an iterator, simply returns itself) and{' '}
          <code>__next__</code>, a method that produces the next value in a sequence each time it is
          called, and raises the built-in <code>StopIteration</code> exception once there is nothing
          left to produce.
        </Para>

        <CodeBox label="The full iterator contract, in two methods">{`class Countdown:
    def __init__(self, start):
        self.current = start

    def __iter__(self):
        return self   # an iterator's __iter__ just returns itself

    def __next__(self):
        if self.current <= 0:
            raise StopIteration
        value = self.current
        self.current -= 1
        return value

cd = Countdown(3)
print(next(cd))   # 3
print(next(cd))   # 2
print(next(cd))   # 1
print(next(cd))   # StopIteration raised — nothing left to produce`}</CodeBox>

        <Para>
          Every iterator is automatically an iterable too (because <code>__iter__</code> is part of
          both contracts), but not every iterable is an iterator — a plain <code>list</code>{' '}
          has <code>__iter__</code> but does <strong>not</strong> have <code>__next__</code>. This
          distinction, which looks academic at first glance, is the exact subject of Part 05 and is
          responsible for a genuinely common category of real production bugs.
        </Para>

        <Callout type="info">
          <strong>Two methods, one job each:</strong> <code>__iter__</code> answers "how do I start
          iterating over you?" — it hands back an iterator to begin with. <code>__next__</code> answers
          "what is the next value, and are you done yet?" An iterable is something you can{' '}
          <em>start</em> iterating over; an iterator is the thing that actually <em>does</em> the
          iterating, one value at a time, and remembers where it left off between calls.
        </Callout>
      </section>

      <Divider />

      {/* ── Part 03 ── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 03 — What a for Loop Actually Does" />
        <SectionTitle>Demystifying the for Loop — iter(), Then next(), Until StopIteration</SectionTitle>

        <Para>
          Here is the exact mechanism Python runs, every single time you write a <code>for</code> loop.
          It is not magic and it is not built into the language at some inaccessible level — it is
          precisely the two protocols from Parts 01 and 02, applied automatically.
        </Para>

        <CodeBox label="A for loop, and exactly what it desugars to">{`for item in [10, 20, 30]:
    print(item)

# Is functionally identical to writing this by hand:
iterator = iter([10, 20, 30])   # calls __iter__ once, up front
while True:
    try:
        item = next(iterator)    # calls __next__ once per iteration
    except StopIteration:
        break                     # the loop ends cleanly — no error escapes
    print(item)`}</CodeBox>

        <Para>
          This is the single most important idea in this module: <code>for item in something:</code>{' '}
          is entirely built out of two simpler operations you can perform yourself — call{' '}
          <code>iter()</code> on the iterable once to get an iterator, then call <code>next()</code>{' '}
          on that iterator repeatedly until it raises <code>StopIteration</code>, which the{' '}
          <code>for</code> loop catches silently and treats as "loop finished normally," never letting
          the exception escape to your code.
        </Para>

        <Callout type="tip">
          This exact same mechanism is why <code>list</code>, <code>str</code>, <code>dict</code>,{' '}
          <code>range</code>, file objects, and countless third-party objects can <strong>all</strong>{' '}
          be looped over with the same, single <code>for</code> syntax, despite being completely
          different types under the hood internally. The <code>for</code> loop does not know or care
          what kind of object it is looping over — it only cares that the object honours the iterable
          protocol.
        </Callout>
      </section>

      <Divider />

      {/* ── Part 04 ── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 04 — Building a Custom Iterator" />
        <SectionTitle>Worked Example — A DateRange Iterator for Business Days</SectionTitle>

        <Para>
          A fictional logistics company, Northstar Freight, needs to iterate over business days (Monday
          through Friday) between a start and end date, for scheduling driver shifts. Rather than
          building a list of every business day up front, a custom iterator class expresses this
          cleanly and lazily — one day at a time, using nothing more than the two-method contract from
          Part 02.
        </Para>

        <CodeBox label="A real, complete custom iterator class">{`from datetime import date, timedelta

class DateRange:
    """Iterates over business days (Mon–Fri) between start and end, inclusive."""

    def __init__(self, start: date, end: date):
        self.start = start
        self.end = end

    def __iter__(self):
        return DateRangeIterator(self.start, self.end)


class DateRangeIterator:
    def __init__(self, start: date, end: date):
        self.current = start
        self.end = end

    def __iter__(self):
        return self

    def __next__(self):
        while self.current <= self.end:
            day = self.current
            self.current += timedelta(days=1)
            if day.weekday() < 5:   # 0=Monday ... 4=Friday
                return day
        raise StopIteration


schedule = DateRange(date(2026, 8, 17), date(2026, 8, 21))
for business_day in schedule:
    print(business_day)
# 2026-08-17  (Monday)
# 2026-08-18  (Tuesday)
# 2026-08-19  (Wednesday)
# 2026-08-20  (Thursday)
# 2026-08-21  (Friday)`}</CodeBox>

        <Para>
          Notice the split into two classes: <code>DateRange</code> is the <strong>iterable</strong> —
          it knows the start and end dates, and its job is only to hand back a fresh iterator each time
          someone starts looping over it. <code>DateRangeIterator</code> is the <strong>iterator</strong> —
          it holds the actual in-progress state (<code>self.current</code>) and knows how to produce the
          next business day, or signal there are none left. This split is not incidental — it is exactly
          what makes the object safely reusable, which is the entire subject of Part 05.
        </Para>

        <SubTitle>A shortcut worth knowing: many custom classes can skip the second class</SubTitle>

        <Para>
          If an object never needs to support two independent, simultaneous loops over it at once, it
          is common and acceptable to collapse the iterable and iterator into a single class — implement{' '}
          <code>__next__</code> directly on the same class and have <code>__iter__</code> simply{' '}
          <code>return self</code>, exactly as the earlier <code>Countdown</code> example in Part 02
          did. The two-class split in the example above is the more robust, general-purpose pattern —
          and it is what the Generators module (Module 28) will show you how to get almost for free,
          without writing either class by hand.
        </Para>
      </section>

      <Divider />

      {/* ── Part 05 ── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 05 — Iterable vs Iterator, and Exhaustion" />
        <SectionTitle>An Iterable Can Be Looped Many Times — an Iterator Can Only Be Looped Once</SectionTitle>

        <Para>
          This is the single most practically important distinction in the entire module, and it is a
          genuinely common source of real bugs. A <strong>list</strong> is an iterable: every time you
          write a <code>for</code> loop over it, Python calls <code>iter()</code> and gets a brand{' '}
          <strong>new</strong> iterator, starting fresh from the beginning. But if you get hold of an{' '}
          <strong>iterator</strong> directly — by calling <code>iter()</code> yourself, or by using
          something that is only an iterator to begin with, like <code>map()</code> or{' '}
          <code>filter()</code> from Module 26 — it remembers its position, and once exhausted, it stays
          exhausted forever.
        </Para>

        <CodeBox label="A list can be looped repeatedly. Its iterator, once you extract it, cannot.">{`numbers = [1, 2, 3]

# The list itself — loop over it as many times as you like:
print(sum(numbers))   # 6
print(sum(numbers))   # 6 — still works, because each "for"/sum() call gets a FRESH iterator

# The iterator you get FROM it — exhausted after one full pass:
it = iter(numbers)
print(sum(it))   # 6  — consumes the whole iterator
print(sum(it))   # 0  — nothing left; it was already exhausted, no error, just empty`}</CodeBox>

        <Para>
          Notice the second call did not raise an error — it silently returned <code>0</code>, because{' '}
          <code>sum()</code> internally does exactly what Part 03 described: call <code>next()</code>{' '}
          until <code>StopIteration</code>, and an already-exhausted iterator raises{' '}
          <code>StopIteration</code> on the very first call. This is precisely what makes the bug
          dangerous in real code — nothing crashes, a value is simply silently wrong, or silently empty.
        </Para>

        <Callout type="warning">
          <strong>This is exactly why map(), filter(), and file objects can only be looped once.</strong>{' '}
          They are iterators themselves, not iterables that hand back fresh iterators each time. If you
          need to loop over their results more than once, convert to a concrete collection first — e.g.{' '}
          <code>results = list(filter(...))</code> — and loop over the resulting list as many times as
          you need.
        </Callout>
      </section>

      <Divider />

      {/* ── Part 06 ── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 06 — iter() and next() Directly" />
        <SectionTitle>Using the Built-ins Yourself, Outside of a for Loop</SectionTitle>

        <Para>
          You now have the tools to work with iteration manually, which is genuinely useful anytime you
          need to pull items one at a time rather than processing a whole collection in one pass — for
          example, reading the first few lines of a file differently from the rest, or interleaving
          values from two sources.
        </Para>

        <CodeBox label="iter() and next() used directly">{`values = [10, 20, 30]
it = iter(values)

print(next(it))   # 10
print(next(it))   # 20
print(next(it))   # 30
print(next(it))   # StopIteration raised`}</CodeBox>

        <Para>
          <code>next()</code> also accepts an optional second argument — a default value to return
          instead of raising <code>StopIteration</code>, which is a genuinely useful way to safely peek
          at the next value without needing a full <code>try</code>/<code>except</code> block.
        </Para>

        <CodeBox label="next() with a default — avoiding StopIteration entirely">{`it = iter([1, 2])
print(next(it, "no more values"))   # 1
print(next(it, "no more values"))   # 2
print(next(it, "no more values"))   # "no more values" — no exception raised`}</CodeBox>

        <SubTitle>A real pattern: manually advancing past a header row</SubTitle>

        <CodeBox label="Skipping a CSV header manually with next(), before looping the rest normally">{`with open("shipments.csv") as f:
    lines = iter(f)
    header = next(lines)          # pull the header line off manually
    for line in lines:            # the SAME iterator, now starting from line 2
        process(line)`}</CodeBox>
      </section>

      <Divider />

      {/* ── Part 07 ── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 07 — Checking Iterability" />
        <SectionTitle>How to Actually Check Whether Something Is Iterable</SectionTitle>

        <Para>
          There are two real approaches, and which one is correct depends on what you are about to do
          with the object next.
        </Para>

        <CodeBox label="Approach 1 — checking with the collections.abc module">{`from collections.abc import Iterable

print(isinstance([1, 2, 3], Iterable))   # True
print(isinstance("hello", Iterable))      # True
print(isinstance(42, Iterable))            # False`}</CodeBox>

        <Para>
          This is the clean, explicit way to check <em>before</em> committing to iterate — genuinely
          useful when writing a function that needs to branch its behaviour depending on whether it
          received a single item or a collection of items.
        </Para>

        <CodeBox label="Approach 2 — EAFP: try it and handle the failure (the more Pythonic default)">{`def process(value):
    try:
        for item in value:
            print("Processing item:", item)
    except TypeError:
        print("Processing single value:", value)

process([1, 2, 3])   # loops over three items
process(42)            # "Processing single value: 42" — caught the TypeError from trying to iterate`}</CodeBox>

        <Para>
          This "Easier to Ask Forgiveness than Permission" (EAFP) style — attempt the operation and
          handle the failure, rather than checking upfront whether it will work — is generally
          considered more idiomatic Python than checking first (sometimes called "Look Before You
          Leap," or LBYL), and you will see this philosophy again, in much more depth, in the Exception
          Handling module later in this track. For now, the practical guidance is simple: reach for{' '}
          <code>isinstance(x, Iterable)</code> when you genuinely need to branch behaviour ahead of
          time, and let a natural <code>try</code>/<code>except TypeError</code> handle it when you are
          just going to attempt the loop anyway.
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
        <SectionTitle>The Empty Report at a Minneapolis Freight Analytics Company</SectionTitle>

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
            Scenario — Freight analytics company, Minneapolis · Production bug report
          </div>

          <Para>
            An engineer at a Minneapolis freight analytics company writes a function to summarise a
            batch of delayed shipments — it needs to compute a total delay count, and separately, build
            a formatted list of shipment IDs for a notification email. The shipments are pulled from a
            database query wrapped in a generator-like cursor object (a real iterator, not a list —
            exactly the distinction from Part 05).
          </Para>

          <CodeBox label="The original, buggy version">{`def summarize_delays(delayed_shipments):
    # delayed_shipments is an ITERATOR from a database cursor, not a list
    count = sum(1 for _ in delayed_shipments)          # first pass — consumes the iterator
    ids = [s.id for s in delayed_shipments]              # second pass — expects MORE items
    return count, ids`}</CodeBox>

          <SubSubTitle>What actually happens in production</SubSubTitle>

          <Para>
            <code>count</code> comes back correct — say, 14 delayed shipments. But <code>ids</code>{' '}
            comes back as an empty list, every single time, with no error raised anywhere. The
            notification email goes out reporting "14 shipments delayed" with an empty list of which
            ones. This exact behaviour is precisely what Part 05 described: the first pass over{' '}
            <code>delayed_shipments</code> fully exhausted the iterator, and the second{' '}
            <code>for</code> loop, given the same already-exhausted iterator, produces nothing at all —
            silently, with zero indication anything went wrong.
          </Para>

          <SubSubTitle>The fix</SubSubTitle>

          <Para>
            The team fixes it by converting the iterator to a concrete list <strong>once</strong>, up
            front, and doing every subsequent pass over that list instead of the original iterator —
            exactly the guidance from the Callout in Part 05.
          </Para>

          <CodeBox label="The fix — materialize once, then reuse freely">{`def summarize_delays(delayed_shipments):
    shipments = list(delayed_shipments)   # materialize ONCE — now it's a reusable list
    count = len(shipments)
    ids = [s.id for s in shipments]
    return count, ids`}</CodeBox>

          <Para>
            This is a bug class that a compiler or a type checker cannot catch for you, because both
            versions of the code are entirely type-correct — an iterator really does support{' '}
            <code>for</code> and really can be passed to <code>sum()</code>. The only way to catch it is
            understanding, at the level covered in this module, exactly which objects are reusable
            iterables and which are single-pass iterators.
          </Para>
        </div>
      </section>

      <Divider />

      {/* ── Part 09 — Misconceptions ── */}
      <section style={{ marginBottom: 64 }} data-toc-kind="myth">
        <SectionTag text="// Part 09 — Misconceptions" />
        <SectionTitle>Four Misconceptions About Iterators and Iterables</SectionTitle>

        {[
          {
            wrong: '"Iterable and iterator mean basically the same thing"',
            right: 'They describe two related but distinct contracts. An iterable knows how to PRODUCE an iterator (via __iter__) and can be looped over repeatedly, getting a fresh iterator each time. An iterator IS the thing doing the stepping (via __next__), holds in-progress state, and — as shown in Part 05 — is exhausted after a single full pass.',
          },
          {
            wrong: '"A for loop is a special language feature that only works on lists, strings, and a few built-in types"',
            right: 'A for loop works on ANY object that implements __iter__, including classes you write yourself, as shown in Part 04\'s DateRange example. It is not a special case for built-ins — it is a general, extensible protocol any object can opt into.',
          },
          {
            wrong: '"Once you\'ve looped over something once, you can always loop over it again the same way"',
            right: 'This depends entirely on whether the object is a reusable iterable (like a list) or a single-pass iterator (like a database cursor, a map() object, or an open file). The Minneapolis example above shows exactly how this assumption produces a silent, no-error bug in real production code.',
          },
          {
            wrong: '"StopIteration is an error that means something went wrong"',
            right: 'It is the NORMAL, expected signal that an iterator has no more values — the for loop catches it silently every single time a loop finishes, and you would never see it directly unless you were calling __next__() or next() manually, outside of a for loop, without a default value.',
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
            q: 'What is the difference between an iterable and an iterator in Python?',
            a: 'An iterable is any object that implements __iter__, which returns an iterator — lists, strings, and dicts are all iterables. An iterator is an object that implements both __iter__ (returning itself) and __next__ (producing the next value, or raising StopIteration when exhausted). Every iterator is also an iterable, but not every iterable is an iterator — a list has __iter__ but not __next__.',
          },
          {
            q: 'What does Python actually do internally when it executes a for loop?',
            a: 'It calls iter() on the object once, up front, to get an iterator. Then it repeatedly calls next() on that iterator, using each returned value as the loop variable, until next() raises StopIteration — at which point the loop catches that exception silently and ends. This is exactly what a for loop desugars to if written manually with a while True / try / except StopIteration / break block.',
          },
          {
            q: 'What does StopIteration signal, and is it an error condition?',
            a: 'It is the standard, expected signal that an iterator has no more values to produce — it is not a bug or a failure. Every for loop catches it automatically and silently on every single loop it runs. You would only see it directly if you called __next__() or the built-in next() manually, outside a for loop, without supplying a default value.',
          },
          {
            q: 'Why can an iterator like the object returned by map() or a database cursor only be looped over once?',
            a: 'Because an iterator holds its own in-progress position internally, and calling next() permanently advances that position — there is no way to "rewind" it. A list, by contrast, is an iterable that hands back a brand-new, fresh iterator every time you start a new loop over it, which is why looping over a list repeatedly works fine while looping over an already-consumed iterator produces nothing.',
          },
          {
            q: 'How would you build a custom class that supports being used in a for loop?',
            a: 'Implement __iter__ on the class, returning an iterator — either self, if the class also implements __next__ directly (the simplest case, works for single-pass use), or a separate helper iterator object if the class needs to support multiple independent, simultaneous loops over it, exactly as demonstrated with DateRange and DateRangeIterator in Part 04.',
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
        <SectionTitle>Iteration Mistakes That Cause Genuinely Confusing Bugs</SectionTitle>

        {[
          {
            q: 'Looping over the same iterator object twice, expecting two independent passes',
            a: 'As shown in the Minneapolis example above, this silently produces nothing on the second pass with no error. If you need multiple passes, convert the iterator to a list ONCE with list(iterator), then loop over the resulting list as many times as needed.',
          },
          {
            q: 'Forgetting that __next__ (with double underscores) is the method name, not next()',
            a: 'When defining a custom iterator class, the special method you implement is __next__ — next() is the separate built-in FUNCTION that calls __next__ on your behalf. Implementing a method literally named "next" (no underscores) does nothing; Python\'s iterator protocol will not find it.',
          },
          {
            q: 'Assuming a class with only __iter__ (no __next__) is a complete iterator',
            a: 'A class needs __next__ too if it intends to act as its own iterator (returning self from __iter__). Without __next__, calling next() on an instance of that class raises "TypeError: object is not an iterator" — it is a valid iterable, but not, by itself, an iterator.',
          },
          {
            q: 'Catching StopIteration broadly, inside a generator or a loop, and accidentally silencing a genuine bug',
            a: 'Because StopIteration is a normal control-flow signal, wrapping too much code in a broad try/except StopIteration block can accidentally swallow a StopIteration that was actually raised somewhere else, unintentionally — masking a real bug as if iteration had simply ended.',
          },
          {
            q: 'Checking iterability with hasattr(x, "__next__") when you actually meant __iter__',
            a: 'A list is iterable but is NOT its own iterator — it has __iter__ but not __next__. Checking for __next__ specifically will incorrectly report that a perfectly loop-able list is "not iterable." Use collections.abc.Iterable (checks for __iter__) unless you specifically need to confirm something is already an iterator.',
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
        <SectionTitle>Errors You Will Hit With Iterators — And Exactly Why</SectionTitle>

        {[
          {
            error: `TypeError: 'int' object is not iterable`,
            cause: 'A for loop, or a function like list()/sum()/sorted(), was given an object with no __iter__ method — most commonly a plain number, passed where a collection was expected.',
            fix: 'Confirm the value is actually the collection you meant to pass, not a single item. If a function should accept either one item or a collection, wrap a lone value in a list, or branch explicitly with an isinstance() check (Part 07).',
          },
          {
            error: `TypeError: 'Countdown' object is not an iterator`,
            cause: 'A class implements __iter__ but returns something (or itself) that is missing __next__ — the object satisfies the iterable protocol but not the iterator protocol.',
            fix: 'Implement __next__ on whichever class __iter__ returns, following the pattern in Part 02 and Part 04 — remember to raise StopIteration once there are no more values to produce.',
          },
          {
            error: `StopIteration (raised outside of a for loop)`,
            cause: 'next() was called directly on an iterator that has already produced its last value, without supplying a default second argument to next().',
            fix: 'Either catch it explicitly with try/except StopIteration, or pass a default: next(iterator, default_value), exactly as shown in Part 06.',
          },
          {
            error: `RuntimeError: generator raised StopIteration`,
            cause: 'A StopIteration accidentally escaped from inside a generator function\'s body (covered in the next module) instead of being used as a normal loop-ending signal — Python 3.7+ converts this specific case into a RuntimeError to prevent it from silently and incorrectly ending an enclosing loop.',
            fix: 'Never raise StopIteration manually inside a generator function. Use a plain "return" statement to end a generator early instead — covered in full in Module 28.',
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
        'An iterable implements __iter__ and can be looped over repeatedly, producing a fresh iterator each time. An iterator implements __iter__ (returning itself) and __next__, and holds in-progress state.',
        'A for loop is entirely built from two simpler operations: call iter() once to get an iterator, then call next() repeatedly until StopIteration is raised — which the loop catches silently.',
        'StopIteration is the normal, expected end-of-iteration signal, not an error condition — you would only see it directly outside of a for loop, calling next() manually with no default.',
        'A custom class supports for loops by implementing __iter__ — either returning self (if it also implements __next__ directly) or a separate iterator object, as shown with DateRange.',
        'An iterator is exhausted after a single full pass and cannot be "rewound" — looping over the same iterator twice silently produces nothing on the second pass, with no error raised.',
        'map(), filter(), and open file objects are all iterators, not reusable iterables — convert to a list with list(...) if you need to loop over their results more than once.',
        'next(iterator, default) lets you safely pull the next value without raising StopIteration, useful for manually skipping a header row or peeking ahead.',
        'Check iterability with isinstance(x, collections.abc.Iterable) when you need to branch behaviour upfront, or just attempt the loop and catch TypeError for the more idiomatic EAFP style.',
      ]} />

      {/* ── Next Module CTA ── */}
      <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 10, padding: '24px', marginTop: 40 }}>
        <p style={{ fontSize: 10, color: 'var(--muted)', letterSpacing: '.12em', textTransform: 'uppercase', fontFamily: 'var(--font-mono)', fontWeight: 700, margin: '0 0 10px' }}>
          What comes next
        </p>
        <p style={{ fontSize: 15, color: 'var(--text)', lineHeight: 1.85, margin: '0 0 20px' }}>
          Module 28 shows you how to get everything you just built by hand in DateRangeIterator almost
          for free — generators and the yield keyword, Python&apos;s shortcut for writing iterators
          without writing a single __next__ method.
        </p>
        <Link href="/learn/python/generators-yield" style={{ background: C, color: '#000', padding: '11px 24px', borderRadius: 7, fontWeight: 700, fontSize: 13, textDecoration: 'none', display: 'inline-block' }}>
          Module 28 → Generators and yield
        </Link>
      </div>
    </LearnLayout>
  )
}
