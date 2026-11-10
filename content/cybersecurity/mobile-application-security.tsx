import Link from 'next/link'
import { LearnLayout } from '@/components/content/LearnLayout'
import { KeyTakeaways } from '@/components/content/KeyTakeaways'
import { Callout } from '@/components/content/Callout'

const C = '#4285f4'
const Part = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <section style={{ marginBottom: 44 }}>
    <h2 style={{ color: C, fontSize: 22, fontWeight: 700, marginBottom: 14 }}>{title}</h2>
    {children}
  </section>
)
const H = ({ children }: { children: React.ReactNode }) => (
  <h3 style={{ color: 'var(--heading)', fontSize: 17, fontWeight: 650, margin: '24px 0 8px' }}>{children}</h3>
)
const P = ({ children }: { children: React.ReactNode }) => (
  <p style={{ color: 'var(--text)', fontSize: 15, lineHeight: 1.9, marginBottom: 14 }}>{children}</p>
)
const Block = ({ children }: { children: React.ReactNode }) => (
  <pre style={{ background: 'var(--code-bg)', border: '1px solid var(--border)', borderRadius: 8, padding: '16px 20px', fontSize: 13, lineHeight: 1.8, whiteSpace: 'pre-wrap', overflowX: 'auto', marginBottom: 18 }}>{children}</pre>
)
const Hl = ({ children }: { children: React.ReactNode }) => <strong style={{ color: C }}>{children}</strong>
const Table = ({ head, rows }: { head: string[]; rows: string[][] }) => (
  <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: 20, fontSize: 14 }}>
    <thead><tr>{head.map((cell) => <th key={cell} style={{ textAlign: 'left', padding: '10px 12px', borderBottom: '2px solid var(--border)', background: 'var(--code-bg)' }}>{cell}</th>)}</tr></thead>
    <tbody>{rows.map((row, rowIndex) => <tr key={rowIndex}>{row.map((cell, cellIndex) => <td key={cellIndex} style={{ padding: '10px 12px', borderBottom: '1px solid var(--border)', verticalAlign: 'top' }}>{cell}</td>)}</tr>)}</tbody>
  </table>
)

export default function MobileApplicationSecurity() {
  return (
    <LearnLayout
      title="Mobile Application Security"
      description="Assess Android and iOS applications with threat modelling, OWASP MASVS, the OWASP Mobile Top 10, and safe testing practices."
      section="Cybersecurity — Lesson 39"
      readTime="40 min"
    >
      <Part title="Mobile Security Is More Than a Secure API">
        <P>
          A mobile app runs on a device the user controls, communicates over networks you do not control, and often handles identity, location, payments, messages, or health-related data. Security therefore spans the app binary, operating system, device storage, backend APIs, build pipeline, and the user's account. A strong mobile review follows the data and trust boundaries instead of assuming that hiding a screen or obfuscating code protects a server-side resource.
        </P>
        <P>
          <Hl>Prerequisites:</Hl> basic HTTP, authentication, and client/server concepts, plus awareness of Android and iOS app packaging. <Hl>Objective:</Hl> use OWASP MASVS as a verification framework, use the Mobile Top 10 as a risk-awareness aid, and turn a suspected weakness into a reproducible, authorised test. Test only apps, accounts, devices, and APIs you own or have explicit permission to assess.
        </P>
        <Callout type="info">
          OWASP projects evolve. Before an assessment, check the current official MASVS, MASTG, MASWE, and Mobile Top 10 materials. This lesson explains how to use them; it does not freeze their release or category wording.
        </Callout>
      </Part>

      <Part title="Map Requirements with OWASP MASVS">
        <P>
          The Mobile Application Security Verification Standard (MASVS) provides security requirements for mobile apps. Its categories help teams plan and communicate coverage across areas such as local storage, cryptography, authentication and authorization, network communication, platform interaction, code quality, resilience, and privacy. The Mobile Application Security Testing Guide (MASTG) provides testing guidance; the weakness enumeration (MASWE) helps describe common weaknesses. Use the current project documentation to confirm identifiers and relationships.
        </P>
        <Block>{`Example review map (conceptual; confirm current OWASP guidance)

Requirement area       Review question
Storage                Are tokens and personal data protected at rest?
Cryptography           Are platform cryptographic APIs used correctly?
Authentication         Does the server verify identity and session state?
Network                Is traffic protected and certificate handling sound?
Platform               Are intents, deep links, permissions, and IPC safe?
Code                   Are inputs, dependencies, and build settings reviewed?
Resilience             Can tampering be detected where the threat model needs it?
Privacy                Is collection, use, sharing, and retention minimised?`}</Block>
        <P>
          Select requirements based on the app's data sensitivity, architecture, and intended assurance level. A payment app, a public transit timetable, and an internal staff tool do not have identical risk. Document exclusions and rationale rather than claiming that a checklist proves an app is secure.
        </P>
      </Part>

      <Part title="Use the Mobile Top 10 as a Risk Prompt">
        <P>
          The OWASP Mobile Top 10 communicates recurring mobile risk themes. Typical concerns include insecure credential handling, weak authentication or authorization, unsafe input and output handling, insecure communication, privacy failures, misconfiguration, insecure storage, and cryptographic misuse. Some releases also call out supply-chain and binary-resilience concerns. The exact names and ordering are version-dependent, so map your findings to the current official list instead of copying a remembered version into a report.
        </P>
        <P>
          A Top 10 is a starting point for discussion, not a complete test plan or a ranking of every app's risks. Translate a category into a concrete question about the target's design. For example, an insecure-storage concern becomes: which data is written to app-private files, preferences, databases, backups, logs, screenshots, and shared storage, and which of those locations are in scope for the threat model?
        </P>
        <Table head={['Area', 'Example review question', 'Useful evidence']} rows={[
          ['Storage and privacy', 'Is sensitive state necessary, protected, and excluded from unintended backups?', 'Data-flow notes, storage inspection, backup configuration'],
          ['Authentication and API', 'Does the server verify identity and resource ownership?', 'Authorised test requests and server-side access-control tests'],
          ['Platform interaction', 'Can an exported component or deep link expose data or trigger a protected action?', 'Manifest review and scoped component tests'],
          ['Network', 'Are TLS validation and session handling correct?', 'App configuration and a controlled test trace with synthetic data'],
        ]} />
        <Block>{`A concise evidence record

Finding: session token appears in an exported diagnostic log
Asset and version: test build identifier, device, OS, app build
Preconditions: authenticated test account; diagnostic logging enabled
Reproduction: exact authorised steps with timestamps
Impact: who could read the log, and under what device conditions?
Evidence: redacted screenshot or local test output; no live secrets
Recommendation: remove token logging; rotate exposed test credentials
Limitations: confirm whether release builds use the same logging path`}</Block>
        <P>
          Report observed behaviour separately from inferred impact. Do not copy real access tokens, personal records, or payment details into a report when redacted evidence is sufficient.
        </P>
      </Part>

      <Part title="Review Storage, Secrets, and Backups">
        <P>
          Mobile operating systems provide app sandboxes and secure key-storage services, but correct use remains the app's responsibility. Keep long-lived secrets out of source code and shipped resources: a key embedded in an APK or IPA can be extracted. Use platform-backed key management for cryptographic key material where appropriate, keep server credentials on the server, and prefer short-lived, revocable tokens with narrow scope.
        </P>
        <P>
          Inspect app preferences, local databases, cache directories, temporary files, crash reports, analytics events, clipboard use, screenshots, and backup behaviour. Classify data first, then decide whether it should be stored at all. Encryption at rest helps only when key lifecycle and access controls are also sound; it does not make an over-collected dataset safe.
        </P>
        <Block>{`Android manifest sketch (review against the app's backup requirements)

<application
    android:usesCleartextTraffic="false"
    android:allowBackup="false">
    <!-- Define exported components explicitly and minimally. -->
</application>

This is not a universal configuration. If backup is required, define and
verify backup/data-extraction rules so sensitive state is excluded as intended.
Never treat client-side settings as a replacement for server authorization.`}</Block>
        <Callout type="warning">
          Do not place production secrets or customer data in a test build, emulator snapshot, or demonstration capture. Use synthetic accounts and rotate any credential that is accidentally exposed.
        </Callout>
      </Part>

      <Part title="Protect Network and Backend Boundaries">
        <P>
          Use platform networking APIs with modern TLS defaults and keep certificate validation enabled. Avoid custom trust managers or permissive hostname checks. Certificate pinning can help in a carefully managed threat model, but it adds operational risk when certificates rotate; it is not a substitute for TLS, server-side authorization, or secure key management.
        </P>
        <P>
          Treat the app as an untrusted client. Enforce ownership, roles, and transaction rules on the backend for every API request. Validate deep-link parameters and intent data before using them; verify account and resource identifiers server-side. Rate-limit sensitive actions, bind step-up authentication to the operation, and ensure the server rejects replayed or out-of-order state changes when the workflow requires it.
        </P>
        <Block>{`Safe API review questions

• Does the server derive the user identity from a verified session?
• Can changing an object ID reveal another user's record?
• Are role and transaction checks repeated on every request?
• Can a deep link trigger a sensitive action without confirmation?
• Do errors or analytics expose tokens, identifiers, or response bodies?
• Does logout invalidate the relevant server-side session or refresh token?`}</Block>
        <P>
          Test with a dedicated account and synthetic records. Do not probe a production backend outside the written scope, and do not enumerate other users' identifiers to see whether access controls fail.
        </P>
      </Part>

      <Part title="Permissions, Components, and Platform Features">
        <P>
          Request only operating-system permissions needed for a user-visible feature, and request them at the moment they make sense. Explain the purpose, handle denial gracefully, and avoid collecting the data in the background without a justified need. Review exported Android activities, services, receivers, and content providers; review iOS URL schemes, universal links, app extensions, pasteboard use, and inter-app communication against the app's design.
        </P>
        <P>
          An exported component or deep link is an entry point, not automatically a vulnerability. Check whether it accepts untrusted parameters, exposes private state, or performs an action without the expected authentication and authorization. Keep user-controlled data out of unsafe WebViews and use the platform's safe navigation and content-handling practices.
        </P>
        <Block>{`Illustrative Android component review

1. List every component and whether it is reachable by other apps.
2. For each reachable component, identify accepted actions and data.
3. Confirm caller identity is not assumed from a UI-only check.
4. Validate URI scheme, host, path, and every parameter.
5. Require server-side authorization before changing protected state.
6. Add tests for malformed links, missing session, and wrong account.`}</Block>
        <P>
          Avoid testing personal devices or unrelated installed applications. Use a configured emulator or a dedicated test device and keep test accounts separate from personal accounts.
        </P>
      </Part>

      <Part title="Build a Repeatable, Safe Test Workflow">
        <P>
          Start with scope and a written test plan. Record app version, device model, OS version, account role, and build type. Review architecture and data flows; inspect manifests and permissions; perform static review; test behaviour dynamically in a controlled environment; then verify the backend's authorization and data handling. Use OWASP MASTG tests where applicable and preserve only the evidence needed to reproduce a finding.
        </P>
        <Block>{`Example lightweight inventory from a reviewed JSON export

import json
from pathlib import Path

manifest = json.loads(Path("review-manifest.json").read_text())
permissions = set(manifest.get("permissions", []))
features = set(manifest.get("features", []))

sensitive = {"camera", "microphone", "location", "contacts"}
for permission in sorted(permissions & sensitive):
    print(f"Review justification and runtime flow: {permission}")

unexplained = permissions - sensitive - {"internet", "network_state"}
for permission in sorted(unexplained):
    print(f"Confirm whether still needed: {permission}")`}</Block>
        <P>
          The sample operates on a local review export, not on a device or application. A permission inventory is a prompt for human review, not a pass/fail scanner: names differ across platforms and dependencies may contribute permissions. Confirm the final merged manifest and app behaviour.
        </P>
      </Part>

      <Part title="Common Mistakes">
        <Block>{`Mistake: “The APK is obfuscated, so its API is protected.”
Why: Obfuscation raises analysis effort but does not enforce server permissions.
Fix: Authorise each sensitive operation at the backend.

Mistake: “The app uses HTTPS, so its traffic is secure.”
Why: TLS does not prevent token logging, insecure storage, or IDOR.
Fix: Review transport, session lifecycle, and server-side object access.

Mistake: “The app has a secure-storage API, so every value belongs there.”
Why: Collection and retention still create privacy and exposure risks.
Fix: Minimise data first; protect only data the feature truly needs.

Mistake: “A Top 10 checklist is proof of compliance.”
Why: Lists do not establish coverage for this app's threat model.
Fix: Map current MASVS requirements to test evidence and explain scope.`}</Block>
      </Part>

      <Part title="Practice: Assess an Authorised App">
        <P>
          1. Choose a sample app you own or an intentionally vulnerable training app and document written scope before testing. 2. Draw its authentication, API, local-storage, and third-party SDK data flows. 3. Map three risks to the current official MASVS and MASTG guidance, recording the exact references you verified. 4. Review the merged permissions list and justify each sensitive permission from a user-facing feature. 5. Design a synthetic test that checks server-side object ownership without accessing another person's data. 6. Write a finding with redacted evidence, impact, limitations, and a practical remediation.
        </P>
      </Part>

      <KeyTakeaways items={[
        'Mobile risk spans the app, platform, device, backend, dependencies, and privacy lifecycle.',
        'Use the current OWASP MASVS to define verification requirements and MASTG to guide testing.',
        'Treat the Mobile Top 10 as a risk-awareness aid; confirm current names and map risks to evidence.',
        'Keep secrets out of shipped code, minimise local data, and review logs and backups.',
        'Enforce identity, ownership, and transaction authorization on the backend for every sensitive action.',
        'Test only authorised apps and APIs with synthetic accounts, scoped evidence, and a repeatable workflow.',
      ]} />

      <Callout type="info">
        <strong>Next in Cybersecurity — Lesson 40: Malware Analysis Fundamentals</strong><br />
        Learn to triage suspicious files safely with static evidence, controlled telemetry, and an isolated lab plan.{' '}
        <Link href="/learn/cybersecurity/malware-analysis-fundamentals" style={{ color: C, fontWeight: 700 }}>Continue to Lesson 40 →</Link>
      </Callout>
    </LearnLayout>
  )
}
