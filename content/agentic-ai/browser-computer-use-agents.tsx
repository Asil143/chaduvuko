import { LearnLayout } from '@/components/content/LearnLayout'
import { Bullets, Callout, Code, H3, KeyTakeaways, Mistakes, NextLesson, P, Part, Practice, Steps, Table } from '@/components/content/LessonKit'

export default function BrowserComputerUseAgents() {
  return (
    <LearnLayout
      title="Browser and Computer-Use Agents"
      description="How agents drive browsers and desktops, when to use Playwright tools instead, and how to keep these agents reliable and safe."
      section="Agentic AI & Automation — Lesson 09"
      readTime="35 min"
    >
      <Part n={1} label="The interface" title="A Website Is Not Just a Screenshot">
        <P>
          A browser agent interacts with a web page using structured information such as accessibility roles, labels, URLs and page text.
          A computer-use agent typically observes screenshots and sends mouse or keyboard actions through a controlled desktop interface.
          Both approaches can help with tasks that are awkward to integrate directly, but neither turns the interface into a trusted API.
        </P>
        <P>
          For a delivery-support app, asking an agent to find an order status might sound convenient. If your team owns the backend, a
          scoped API call or database-backed service is usually faster and more dependable. Browser automation makes more sense for a
          permitted workflow where no suitable API exists, such as a test of your own staging interface or a carefully supervised legacy
          back-office process.
        </P>
        <Table
          head={['Approach', 'Best fit', 'Main limitation']}
          rows={[
            ['Direct API or service', 'You control the system and can expose a narrow, supported operation', 'Requires an integration and a stable service contract'],
            ['Playwright browser automation', 'Web UI testing or a known, repeatable browser task', 'Selectors, page states and login flows can change'],
            ['Browser agent using DOM/accessibility data', 'A task requires flexible navigation across web pages', 'Page text is untrusted; the model may choose a wrong or unsafe action'],
            ['Computer-use agent', 'A visual desktop workflow with no practical programmatic interface', 'Coordinates and screenshots are brittle; actions are harder to constrain'],
          ]}
          caption="Choose the narrowest interface that completes the user goal."
        />
        <Callout type="tip">
          If you already know the steps and selectors, use ordinary Playwright code. A model should handle genuine ambiguity, not replace
          a reliable function call merely to make the architecture sound more autonomous.
        </Callout>
      </Part>

      <Part n={2} label="Prerequisites" title="Make the Automation Environment Deliberate">
        <P>
          Use a dedicated test account and a staging environment for practice. A browser session may hold login cookies, personal data and
          permissions that are more powerful than the agent needs. Do not copy your everyday browser profile or expose credentials to a
          model. Keep secrets in a local environment or secret manager and provide only the page access needed for the task.
        </P>
        <Code lang="bash" code={`
python -m venv .venv
source .venv/bin/activate
pip install playwright
playwright install chromium
`} />
        <P>
          These commands install the Playwright Python package and a browser. Browser binaries are separate from the Python package. Check
          Playwright&apos;s official installation guide for platform-specific setup. Use synthetic data, and keep a human in the loop before
          submissions, payments, account changes or any action that cannot be easily undone.
        </P>
        <Callout type="warning">
          A browser profile can grant access to email, finance, customer records and internal tools. Do not give an experimental agent a
          personal profile or broad network access. Create a separate, least-privilege environment first.
        </Callout>
      </Part>

      <Part n={3} label="Reliable browser tasks" title="Prefer Locators to Coordinates">
        <P>
          Playwright locators address controls by role, accessible name, label or a carefully chosen test ID. This is generally more
          resilient than clicking pixel coordinates. Make the expected page state explicit, wait for a meaningful signal, and fail closed
          if the page does not match the state you expected.
        </P>
        <Code file="read_order_status.py" code={`
import asyncio
import os
from urllib.parse import urlparse
from playwright.async_api import async_playwright

async def main() -> None:
    base_url = os.environ["STAGING_BASE_URL"]
    parsed = urlparse(base_url)
    if parsed.scheme != "https" or not parsed.hostname:
        raise ValueError("STAGING_BASE_URL must be an HTTPS URL")

    async with async_playwright() as playwright:
        browser = await playwright.chromium.launch(headless=True)
        page = await browser.new_page()
        await page.goto(base_url, wait_until="domcontentloaded")
        if urlparse(page.url).hostname != parsed.hostname:
            raise RuntimeError("Unexpected redirect; stopping")

        await page.get_by_role("link", name="Orders").click()
        await page.get_by_role("heading", name="Orders").wait_for()
        order_row = page.get_by_role("row", name="ORD-204")
        await order_row.wait_for()
        print(await order_row.inner_text())
        await browser.close()

if __name__ == "__main__":
    asyncio.run(main())
`} />
        <P>
          This is deterministic automation, not a model-driven agent. It is often the right baseline: a human-readable sequence, explicit
          waits, and a clear failure if the expected order row is absent. In your own app, add stable test IDs if accessible labels are not
          sufficient. Avoid broad selectors such as &quot;the third button&quot; because a harmless layout change can change their meaning.
        </P>
        <Steps items={[
          'Navigate only to a configured, approved application URL.',
          'Wait for a meaningful page landmark, not an arbitrary sleep.',
          'Use a named role or label to identify the intended control.',
          'Check the resulting page state before returning data or continuing.',
          'Close the browser context even if the task raises an error.',
        ]} />
      </Part>

      <Part n={4} label="Agent decisions" title="Let the Model Choose Only Among Approved Actions">
        <P>
          When navigation truly is open-ended, provide a small action vocabulary such as inspect page, open an approved link or fill a
          non-sensitive search field. The model proposes an action; your controller validates it, executes it and returns a bounded
          observation. Do not let a natural-language request become arbitrary JavaScript, shell access, file access or an unrestricted URL.
        </P>
        <Code file="action_policy.py" code={`
from dataclasses import dataclass
from urllib.parse import urlparse

ALLOWED_HOSTS = {"staging.example.edu"}

@dataclass(frozen=True)
class BrowserAction:
    kind: str
    target: str
    value: str = ""

def validate(action: BrowserAction) -> None:
    if action.kind not in {"open", "click", "search"}:
        raise ValueError("Action type is not allowed")
    if action.kind == "open":
        parsed = urlparse(action.target)
        if parsed.scheme != "https" or parsed.hostname not in ALLOWED_HOSTS:
            raise ValueError("Navigation is outside the approved host list")
    if action.kind == "search" and len(action.value) > 120:
        raise ValueError("Search text is too long")

if __name__ == "__main__":
    validate(BrowserAction("open", "https://staging.example.edu/orders"))
    print("Approved")
`} />
        <P>
          This policy example runs with the Python standard library. In a real controller, validate the final destination after redirects as
          well as before navigation, check every frame and popup, and enforce network restrictions outside the model process. A hostname
          check in application code is not a substitute for an egress policy or a browser sandbox.
        </P>
        <Callout type="info">
          Treat page contents, screenshots, filenames and link labels as untrusted input. A page may contain instructions aimed at the
          agent. Those instructions are data to evaluate, not authority to expand the tool permissions you granted.
        </Callout>
      </Part>

      <Part n={5} label="Computer use" title="Screenshots Need Extra Guardrails">
        <P>
          A computer-use agent may return a screenshot and ask for an action such as clicking a location or typing into a field. Screen
          coordinates are fragile: window size, scrolling, zoom and dynamic content can all move a control. Before every action, capture or
          otherwise verify the current state. Use fixed viewport settings and keep a visible audit trail for the task.
        </P>
        <Table
          head={['Risk', 'Why it happens', 'Safer control']}
          rows={[
            ['Wrong target', 'A layout shift changes what appears under a coordinate', 'Prefer semantic locators; otherwise re-observe and require a state check'],
            ['Sensitive text exposure', 'Screenshots may include names, account balances or notifications', 'Use synthetic accounts, crop/redact and limit trace retention'],
            ['Unintended submission', 'A click may submit a form or confirm an irreversible action', 'Pause for human approval and use a server-side confirmation gate'],
            ['Prompt injection in content', 'Visible text can tell the model to ignore its task or reveal data', 'Treat observations as untrusted and keep policy checks outside the model'],
            ['Unbounded navigation', 'A page or model can open an unexpected destination', 'Apply allowlists, egress controls and redirect checks'],
          ]}
        />
        <P>
          Provider computer-use APIs have different action schemas and safety requirements. Do not copy a remembered API payload into a
          production system. Read the selected provider&apos;s current documentation, check what image data is retained, and keep the provider
          integration behind an adapter. The important contract is that proposed actions are validated before execution and risky actions
          are confirmed by a person.
        </P>
      </Part>

      <Part n={6} label="Human approval" title="Separate Preparation from Irreversible Action">
        <P>
          A useful automation can gather facts, fill a draft or prepare a transaction without submitting it. Keep the final approval action
          in trusted application code, tied to the authenticated user and the exact operation being reviewed. Approval should expire, be
          single-use and show the relevant details; a vague approval to &quot;continue&quot; is not meaningful consent.
        </P>
        <Code file="approval_gate.py" code={`
from dataclasses import dataclass

@dataclass(frozen=True)
class PreparedChange:
    request_id: str
    summary: str
    status: str

def apply_after_approval(change: PreparedChange, approved_request_id: str) -> str:
    if change.status != "pending_review":
        raise ValueError("Change is not awaiting review")
    if approved_request_id != change.request_id:
        raise PermissionError("Approval does not match this change")
    # Production code must also verify the reviewer, expiry and one-time use.
    return "ready_for_authorised_service"

if __name__ == "__main__":
    draft = PreparedChange("review-17", "Update a demo delivery note", "pending_review")
    print(apply_after_approval(draft, "review-17"))
`} />
        <P>
          This code illustrates a gate, not a complete authorization system. The backend must authenticate the reviewer, check their role,
          enforce an expiry and prevent duplicate execution. The agent should not be able to forge or replay the approval token. In an
          e-commerce workflow, payment, refund and account changes belong to trusted services—not a sequence of unreviewed browser clicks.
        </P>
      </Part>

      <Part n={7} label="Evaluation" title="Test the Journey, Not Just the Screenshot">
        <P>
          Browser tasks fail in ordinary ways: the page is slow, a session expires, an order is absent, a banner covers a button, or an
          accessibility label changes. Test those paths with deterministic fixtures. Measure whether the requested outcome was achieved,
          whether the agent stayed within its allowed actions and whether a human approval was respected.
        </P>
        <Code file="test_policy.py" code={`
import unittest
from action_policy import BrowserAction, validate

class ActionPolicyTests(unittest.TestCase):
    def test_allows_configured_staging_host(self):
        validate(BrowserAction("open", "https://staging.example.edu/orders"))

    def test_rejects_other_host(self):
        with self.assertRaises(ValueError):
            validate(BrowserAction("open", "https://accounts.example.net/"))

    def test_rejects_unknown_action(self):
        with self.assertRaises(ValueError):
            validate(BrowserAction("execute_script", ""))

if __name__ == "__main__":
    unittest.main()
`} />
        <P>
          Add tests for redirects, popups, a disabled control, timeout, hidden page text and a prompt-injection string. Verify that every
          failure ends the run safely and does not leave a partially submitted form. Record action names and outcomes, but do not log
          passwords, session cookies or full screenshots by default.
        </P>
        <Bullets items={[
          'Outcome: did the automation retrieve or prepare the right thing?',
          'Reliability: how often does it finish under expected page variation?',
          'Safety: did it stay on permitted hosts and avoid prohibited actions?',
          'Recovery: did a timeout or changed page produce a bounded, understandable failure?',
          'Privacy: did traces capture only data needed to debug the task?',
        ]} />
      </Part>

      <Part n={8} label="Pitfalls" title="Common Browser-Agent Mistakes">
        <Mistakes items={[
          { mistake: 'Using computer vision for a task with a stable API', cause: 'A visual interaction adds latency and breaks when layout changes.', fix: 'Prefer a supported service API; use Playwright for UI workflows and tests.' },
          { mistake: 'Treating page instructions as trusted policy', cause: 'Web content can be stale, malicious or unrelated to the user request.', fix: 'Treat observations as untrusted data and enforce permissions in code.' },
          { mistake: 'Clicking a coordinate without checking the screen state', cause: 'Scrolling, responsive layouts and popups can move the intended target.', fix: 'Re-observe before actions, assert state after actions and stop on ambiguity.' },
          { mistake: 'Giving an agent an everyday signed-in browser', cause: 'The browser session can expose far more data and actions than the task needs.', fix: 'Use an isolated, least-privilege test account, host allowlist and retention policy.' },
        ]} />
      </Part>

      <Part n={9} label="Practice" title="Automate a Safe Staging Lookup">
        <Practice
          title="Build and test a read-only order-status journey"
          tasks={[
            'Create a staging page with synthetic orders and a dedicated test account.',
            'Write a deterministic Playwright script that opens only the configured staging host and reads an order row.',
            'Add a page-state assertion and a timeout path that stops rather than guessing.',
            'Add policy tests for an unapproved host, unexpected redirect and unsupported action.',
            'Simulate an instruction embedded in page text and verify it cannot expand the action allowlist.',
            'Document which data is captured in traces and who can access those traces.'
          ]}
          hint="Keep this exercise read-only. Do not automate real payments, refunds or account changes."
        />
      </Part>

      <KeyTakeaways items={[
        'A supported API is usually more reliable than an agent operating a browser or desktop.',
        'Playwright locators and explicit state checks are safer and more stable than raw coordinates.',
        'Allowlist navigation and validate redirects; do not let model text become arbitrary browser code.',
        'Page text and screenshots are untrusted observations, not higher-priority instructions.',
        'Use isolated accounts, synthetic data and privacy-conscious trace retention.',
        'Prepare risky changes separately and require authenticated, operation-specific human approval.',
      ]} />

      <H3>Next</H3>
      <NextLesson
        href="/learn/agentic-ai/agent-evaluation-observability"
        label="Lesson 10 · Testing, Evaluating and Tracing Agents"
        text="You have seen why browser and computer-use actions need firm boundaries. Next, build scenario tests and traces that show whether an agent succeeds reliably and safely."
      />
    </LearnLayout>
  )
}
