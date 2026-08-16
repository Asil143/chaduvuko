import type { Metadata } from 'next'
import { LearnLayout } from '@/components/content/LearnLayout'
import Link from 'next/link'
import { Callout } from '@/components/content/Callout'
import { KeyTakeaways } from '@/components/content/KeyTakeaways'

export const metadata: Metadata = {
  title: 'Unit Testing with pytest — Python | Chaduvuko',
  description:
    'Writing tests that actually catch bugs — fixtures, assertions, mocking, and testing as a habit, not an afterthought.',
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

export default function UnitTestingPytest() {
  return (
    <LearnLayout
      title="Unit Testing with pytest"
      description="Writing tests that actually catch bugs — fixtures, assertions, mocking, and testing as a habit, not an afterthought."
      section="Python — Module 38"
      readTime="45 min"
      updatedAt="August 2026"
    >

      {/* ── Part 01 ── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 01 — Why Testing Matters" />
        <SectionTitle>The Regression a Test Suite Would Have Caught</SectionTitle>

        <Para>
          A discount calculator worked correctly for months. A small, unrelated refactor changes how a
          nested helper function rounds values, and a subtle off-by-one-cent bug slips into every
          discount calculation involving an odd number of cents. It ships, unnoticed, until a customer
          support ticket flags it weeks later. A single test asserting{' '}
          <code>calculate_discount(1001, 10) == 901</code> would have failed the moment the refactor
          landed — in CI, before merge, instead of in production, weeks later.
        </Para>

        <Para>
          This is the entire case for automated testing in one sentence: a test suite is a fast,
          repeatable way to verify that code still behaves the way you believe it does, every single
          time anything changes — not just when it was first written.
        </Para>
      </section>

      <Divider />

      {/* ── Part 02 ── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 02 — pytest Basics" />
        <SectionTitle>Plain assert Statements, No Special Syntax Required</SectionTitle>

        <Para>
          Unlike some testing frameworks that require special assertion methods (
          <code>self.assertEqual(a, b)</code>), <code>pytest</code> lets you write plain{' '}
          <code>assert</code> statements — the same keyword covered back in the Control Flow module —
          and produces detailed, readable failure output automatically.
        </Para>

        <CodeBox label="calculator.py — the code under test">{`def add(a, b):
    return a + b

def divide(a, b):
    if b == 0:
        raise ValueError("cannot divide by zero")
    return a / b`}</CodeBox>

        <CodeBox label="test_calculator.py — pytest discovers this automatically">{`from calculator import add, divide

def test_add():
    assert add(2, 3) == 5

def test_add_negative_numbers():
    assert add(-1, -1) == -2

def test_divide():
    assert divide(10, 2) == 5.0`}</CodeBox>

        <CodeBox label="Running it">{`$ pytest
====== test session starts ======
collected 3 items

test_calculator.py ...                                    [100%]

====== 3 passed in 0.02s ======`}</CodeBox>

        <Callout type="tip">
          <strong>pytest discovers tests automatically based on naming convention</strong> — any file
          named <code>test_*.py</code> or <code>*_test.py</code>, containing functions named{' '}
          <code>test_*</code>, is found and run without any manual registration. This convention-based
          discovery is a large part of why pytest requires so little boilerplate compared to older
          testing frameworks.
        </Callout>

        <SubTitle>pytest's real advantage — informative failure output</SubTitle>

        <CodeBox label="A failing assertion, and exactly what pytest shows you">{`def test_add():
    assert add(2, 3) == 6

# ====== FAILURES ======
# ____ test_add ____
#
#     def test_add():
# >       assert add(2, 3) == 6
# E       assert 5 == 6
# E        +  where 5 = add(2, 3)`}</CodeBox>
      </section>

      <Divider />

      {/* ── Part 03 ── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 03 — Testing Exceptions" />
        <SectionTitle>pytest.raises — Asserting That Something Fails Correctly</SectionTitle>

        <CodeBox label="Confirming an exception is raised, with the right message">{`import pytest
from calculator import divide

def test_divide_by_zero_raises():
    with pytest.raises(ValueError):
        divide(10, 0)

def test_divide_by_zero_message():
    with pytest.raises(ValueError, match="cannot divide by zero"):
        divide(10, 0)`}</CodeBox>

        <Para>
          <code>pytest.raises</code> is itself a context manager (from the Context Managers module) — the
          test <strong>passes</strong> only if the expected exception is actually raised inside the{' '}
          <code>with</code> block; if no exception is raised at all, the test fails, since that means the
          code did not behave as expected.
        </Para>
      </section>

      <Divider />

      {/* ── Part 04 ── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 04 — Fixtures" />
        <SectionTitle>Reusable Setup, Shared Across Tests</SectionTitle>

        <Para>
          A <strong>fixture</strong> is a function decorated with <code>@pytest.fixture</code> that
          provides setup (and optional teardown) reusable across multiple tests — pytest automatically
          detects when a test function's parameter name matches a fixture's name, and calls the fixture
          to supply that argument.
        </Para>

        <CodeBox label="A basic fixture">{`import pytest

@pytest.fixture
def sample_cart():
    return {"items": ["book", "pen"], "total": 25.50}

def test_cart_has_two_items(sample_cart):
    assert len(sample_cart["items"]) == 2

def test_cart_total(sample_cart):
    assert sample_cart["total"] == 25.50`}</CodeBox>

        <Para>
          Each test that requests <code>sample_cart</code> gets its own fresh call to the fixture
          function by default — the two tests above do not share or mutate the same dict, avoiding a
          common source of test flakiness where one test's leftover mutated state accidentally affects
          another.
        </Para>

        <SubTitle>Fixtures with teardown, using yield</SubTitle>

        <CodeBox label="Setup before yield, teardown after — same pattern as a generator-based context manager">{`@pytest.fixture
def database_connection():
    conn = connect_to_test_database()
    yield conn                        # the test runs here, receiving "conn"
    conn.close()                      # runs after the test finishes, pass or fail

def test_insert_record(database_connection):
    database_connection.execute("INSERT INTO users VALUES (1, 'Asha')")
    assert database_connection.query("SELECT COUNT(*) FROM users") == 1`}</CodeBox>

        <SubTitle>Fixture scope — controlling how often setup runs</SubTitle>

        <CodeBox label="scope controls fixture lifetime across tests">{`@pytest.fixture(scope="function")   # default — a fresh instance for EVERY test
def sample_cart():
    ...

@pytest.fixture(scope="module")     # created ONCE, shared across every test in this file
def expensive_database_connection():
    ...`}</CodeBox>

        <Callout type="warning">
          <strong>A wider scope (like <code>module</code> or <code>session</code>) is a real performance
          win for expensive setup, but introduces the same shared-mutable-state risk between tests that
          the default per-test scope avoids.</strong> Use a wider scope specifically for read-only or
          genuinely expensive-to-create resources, and reset any mutable state a wide-scoped fixture
          exposes between tests if tests actually modify it.
        </Callout>
      </section>

      <Divider />

      {/* ── Part 05 ── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 05 — Parametrize" />
        <SectionTitle>One Test Function, Many Inputs</SectionTitle>

        <Para>
          <code>@pytest.mark.parametrize</code> runs the same test function once per set of inputs
          provided, avoiding repetitive near-identical test functions that only differ in their input
          values.
        </Para>

        <CodeBox label="Without parametrize — repetitive">{`def test_add_positive():
    assert add(2, 3) == 5

def test_add_negative():
    assert add(-2, -3) == -5

def test_add_zero():
    assert add(0, 5) == 5`}</CodeBox>

        <CodeBox label="With parametrize — one test, three cases">{`import pytest

@pytest.mark.parametrize("a, b, expected", [
    (2, 3, 5),
    (-2, -3, -5),
    (0, 5, 5),
])
def test_add(a, b, expected):
    assert add(a, b) == expected

# pytest reports each case individually:
# test_add[2-3-5] PASSED
# test_add[-2--3--5] PASSED
# test_add[0-5-5] PASSED`}</CodeBox>
      </section>

      <Divider />

      {/* ── Part 06 ── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 06 — Mocking" />
        <SectionTitle>Testing Code That Depends on Something Slow, External, or Unreliable</SectionTitle>

        <Para>
          A function that calls a real API or writes to a real database is hard to test reliably — the
          test would be slow, could fail due to network issues unrelated to the code being tested, and
          might have real side effects. <code>unittest.mock</code> (part of the standard library) lets
          you replace a dependency with a fake stand-in for the duration of a test.
        </Para>

        <CodeBox label="Mocking an external API call with unittest.mock">{`from unittest.mock import patch

def get_weather(city):
    response = requests.get(f"https://api.example.com/weather/{city}")
    return response.json()["temperature"]

@patch("requests.get")
def test_get_weather(mock_get):
    mock_get.return_value.json.return_value = {"temperature": 72}

    result = get_weather("Boston")

    assert result == 72
    mock_get.assert_called_once_with("https://api.example.com/weather/Boston")`}</CodeBox>

        <Para>
          <code>@patch</code> temporarily replaces <code>requests.get</code> with a fake object for the
          duration of the test — no real network call ever happens, the test runs in milliseconds, and{' '}
          <code>mock_get.assert_called_once_with(...)</code> lets you additionally verify the function
          called the dependency correctly, not just that it handled a fake response correctly.
        </Para>

        <SubTitle>monkeypatch — pytest's built-in alternative for simpler cases</SubTitle>

        <CodeBox label="monkeypatch — a pytest fixture for patching without importing unittest.mock">{`def test_get_weather(monkeypatch):
    class FakeResponse:
        def json(self):
            return {"temperature": 72}

    monkeypatch.setattr("requests.get", lambda url: FakeResponse())

    assert get_weather("Boston") == 72
# monkeypatch automatically undoes the patch after the test — no manual cleanup needed`}</CodeBox>
      </section>

      <Divider />

      {/* ── Part 07 ── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 07 — Organizing Tests" />
        <SectionTitle>conftest.py and Test Layout</SectionTitle>

        <CodeBox label="A typical project layout">{`myproject/
    calculator.py
    tests/
        conftest.py        # fixtures shared across MULTIPLE test files
        test_calculator.py
        test_api.py`}</CodeBox>

        <Para>
          <code>conftest.py</code> is a special filename pytest recognises automatically — any fixture
          defined there is available to every test file in the same directory (and subdirectories)
          without needing to be explicitly imported, which is exactly where broadly-shared setup (like a
          test database connection fixture used across many test files) belongs.
        </Para>

        <SubTitle>Coverage is a signal, not a target to game</SubTitle>

        <CodeBox label="Measuring test coverage">{`pip install pytest-cov
pytest --cov=myproject`}</CodeBox>

        <Callout type="warning">
          <strong>100% coverage does not mean the code is well-tested.</strong> Coverage only measures
          which lines <em>ran</em> during the test suite — a test can execute every line of a function
          and still assert nothing meaningful about its correctness. Use coverage to find code with{' '}
          <em>zero</em> tests touching it at all (a genuine gap worth investigating), not as a target
          number to chase for its own sake.
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
        <SectionTitle>A Refactor That Shipped Confidently Because of Tests, at a Raleigh HealthTech Company</SectionTitle>

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
            Scenario — HealthTech company, Raleigh · Large refactor
          </div>

          <Para>
            A team needs to rewrite the internals of a function that calculates a patient's medication
            dosage schedule — genuinely high-stakes code, where a bug has real consequences, not just an
            inconvenience. The function has 40 existing tests covering edge cases accumulated over two
            years: zero-weight patients, medications with no active ingredient overlap, dosages that
            round to exactly a boundary value.
          </Para>

          <CodeBox label="A representative slice of the existing test suite">{`@pytest.mark.parametrize("weight_kg, drug, expected_mg", [
    (70, "drug_a", 350),
    (0.1, "drug_a", 0.5),      # a genuinely tiny edge case, added after a real past bug
    (150, "drug_b", 600),      # the drug_b maximum-dose cap, added after ANOTHER real past bug
])
def test_dosage_calculation(weight_kg, drug, expected_mg):
    assert calculate_dosage(weight_kg, drug) == expected_mg`}</CodeBox>

          <SubSubTitle>Why the tests, not just careful code review, were what made the refactor safe</SubSubTitle>

          <Para>
            The engineer doing the rewrite ran the existing 40 tests continuously while restructuring the
            internals — every time a change broke one of the historical edge cases (several times during
            the rewrite), it failed immediately and locally, long before a pull request or a reviewer was
            even involved. Two of those historical edge-case tests existed specifically because of past
            real incidents; without them encoded as executable tests, there would have been no way to
            know the refactor had silently reintroduced either bug until it happened again in production.
          </Para>
        </div>
      </section>

      <Divider />

      {/* ── Part 09 — Misconceptions ── */}
      <section style={{ marginBottom: 64 }} data-toc-kind="myth">
        <SectionTag text="// Part 09 — Misconceptions" />
        <SectionTitle>Four Misconceptions About Testing</SectionTitle>

        {[
          {
            wrong: '"100% test coverage means the code is well-tested"',
            right: 'Coverage only measures which lines EXECUTED during the test run — a test can run every line of a function while asserting nothing meaningful. Use coverage to find completely untested code, not as a quality target on its own.',
          },
          {
            wrong: '"Mocking is only needed for genuinely exotic, rarely-tested code"',
            right: 'It is a routine, everyday tool for any code depending on something slow, external, or non-deterministic — API calls, databases, the current time, random values — exactly the kind of dependency that makes a test slow or unreliable if left real.',
          },
          {
            wrong: '"Writing tests after the code is done provides the same value as writing them earlier"',
            right: "Tests written alongside (or before) the implementation catch mistakes immediately, while the logic is still fresh, and naturally shape a more testable design. Tests bolted on much later tend to be shallower and are more likely to accidentally test the implementation's current (possibly buggy) behaviour rather than its intended behaviour.",
          },
          {
            wrong: '"A fixture with a module scope is always better than the default because it is faster"',
            right: 'A wider scope is only a genuine win for expensive, effectively read-only setup — sharing a fixture across tests that MUTATE it reintroduces the exact shared-state flakiness that per-test fixtures are designed to avoid.',
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
            q: 'How does pytest discover which functions are tests, without any manual registration?',
            a: 'By convention — any file named test_*.py or *_test.py is scanned, and any function inside it named test_* is treated as a test and run automatically. No decorators or a central test registry are required.',
          },
          {
            q: 'What is a pytest fixture, and why use one instead of just duplicating setup code in every test?',
            a: 'A fixture is a function decorated with @pytest.fixture that provides reusable setup (and optional teardown, via yield) — pytest supplies it automatically to any test function whose parameter name matches the fixture\'s name. It centralizes setup logic in one place, and by default gives each test a fresh instance, avoiding one test\'s leftover state accidentally leaking into another.',
          },
          {
            q: 'Why would you mock a dependency instead of letting a test call the real thing?',
            a: 'The real dependency (an API, a database, the current time) can make tests slow, flaky due to network/environment issues unrelated to the code under test, or cause real side effects. Mocking replaces it with a controlled fake for the duration of the test, making the test fast, deterministic, and isolated to just the logic actually being verified.',
          },
          {
            q: 'What does @pytest.mark.parametrize do, and why prefer it over several near-identical test functions?',
            a: 'It runs the same test function once per provided set of inputs, reporting each case individually in the output. It avoids repetitive test functions that differ only in their input values, and makes adding a new case (e.g. a newly discovered edge case) a one-line addition rather than a whole new function.',
          },
          {
            q: 'Why is 100% code coverage not the same thing as "well tested"?',
            a: 'Coverage measures which lines executed during the test run, not whether meaningful assertions were made about the code\'s correctness — a test can exercise every line of a function while asserting nothing useful about its behaviour. Coverage is most valuable for finding completely untested code, not as a target to chase for its own sake.',
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
        <SectionTitle>Testing Mistakes Beginners Make Constantly</SectionTitle>

        {[
          {
            q: 'Naming a test file or function without the test_ prefix pytest expects',
            a: 'A file named calculator_checks.py or a function named check_add() is silently never discovered or run — pytest\'s default discovery relies entirely on the test_*/​*_test naming convention.',
          },
          {
            q: 'Writing a test that only checks the "happy path", never edge cases or error conditions',
            a: 'A function is genuinely tested by its edge cases (empty input, zero, negative numbers, the exact boundary of a condition) at least as much as by its typical case — most real production bugs live in the edge cases a happy-path-only test suite never exercises.',
          },
          {
            q: 'Letting tests depend on shared mutable state or execution order',
            a: 'A test that only passes because an earlier test happened to run first and left behind some state is fragile and will fail unpredictably once tests are run in a different order or in parallel. Each test should set up everything it needs itself, typically via a function-scoped fixture.',
          },
          {
            q: 'Mocking so much of a function that the test no longer verifies anything real',
            a: 'Over-mocking can leave a test that passes even when the actual logic is broken, because everything meaningful was replaced with a fake. Mock genuinely external/slow dependencies; leave the actual logic under test real.',
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
        <SectionTitle>Errors You Will Hit With pytest — And Exactly Why</SectionTitle>

        {[
          {
            error: `fixture 'sample_cart' not found`,
            cause: 'A test function requests a parameter name that does not match any defined fixture — either a typo, or the fixture is defined in a file pytest cannot see (not in conftest.py or the same test file).',
            fix: 'Check the fixture name for typos, and confirm it is defined either in the same test file or in a conftest.py that covers this test file\'s directory.',
          },
          {
            error: `DID NOT RAISE <class 'ValueError'>`,
            cause: 'A pytest.raises(ValueError) block completed without the wrapped code actually raising a ValueError — the code under test did not fail the way the test expected.',
            fix: 'Confirm the code under test genuinely should raise in this case; if it should, the bug is in the implementation, not the test.',
          },
          {
            error: `TypeError: test_add() missing 1 required positional argument: 'sample_cart'`,
            cause: 'A test function\'s parameter is meant to be a fixture, but no fixture with that exact name exists — pytest could not find anything to automatically supply that argument.',
            fix: 'Define a fixture with a matching name, or remove the parameter if it was not actually meant to request a fixture.',
          },
          {
            error: `AssertionError: assert {'temperature': 72} == 72`,
            cause: 'A mocked dependency was configured to return the wrong shape of data — e.g. returning a dict where the code under test expects to already have accessed a specific key.',
            fix: 'Check exactly what the mock is configured to return against what the real dependency actually returns, and align them.',
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
        'pytest discovers tests by naming convention (test_*.py, test_* functions) — no manual registration required, and plain assert statements work with detailed automatic failure output.',
        'pytest.raises(ExceptionType) verifies that code correctly raises an expected exception, as a context manager.',
        'Fixtures (@pytest.fixture) provide reusable setup/teardown — yield splits a fixture into setup (before) and teardown (after); scope controls how often it is recreated.',
        '@pytest.mark.parametrize runs one test function against many input/expected-output pairs, avoiding repetitive near-duplicate tests.',
        'Mock slow, external, or non-deterministic dependencies (APIs, databases, time) with unittest.mock or pytest\'s monkeypatch fixture — keep the actual logic under test real.',
        'conftest.py holds fixtures shared across multiple test files automatically. Coverage measures which lines ran, not whether tests assert anything meaningful — use it to find gaps, not as a target.',
      ]} />

      {/* ── Next Module CTA ── */}
      <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 10, padding: '24px', marginTop: 40 }}>
        <p style={{ fontSize: 10, color: 'var(--muted)', letterSpacing: '.12em', textTransform: 'uppercase', fontFamily: 'var(--font-mono)', fontWeight: 700, margin: '0 0 10px' }}>
          What comes next
        </p>
        <p style={{ fontSize: 15, color: 'var(--text)', lineHeight: 1.85, margin: '0 0 20px' }}>
          Module 39 begins the final phase, Production &amp; Career Readiness, with systematic debugging
          techniques — going beyond print statements to pdb and reading tracebacks like a senior engineer.
        </p>
        <Link href="/learn/python/debugging-techniques" style={{ background: C, color: '#000', padding: '11px 24px', borderRadius: 7, fontWeight: 700, fontSize: 13, textDecoration: 'none', display: 'inline-block' }}>
          Module 39 → Debugging Techniques and Tools
        </Link>
      </div>
    </LearnLayout>
  )
}
