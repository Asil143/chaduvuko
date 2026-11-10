import type { ReactNode } from 'react'
import { LearnLayout } from '@/components/content/LearnLayout'
import { KeyTakeaways } from '@/components/content/KeyTakeaways'

const Chapter = ({ n, title }: { n: number; title: string }) => (
  <div style={{ marginBottom: 28 }}>
    <p style={{ fontSize: 11, color: '#10b981', fontFamily: 'var(--font-mono)', fontWeight: 700, letterSpacing: '.12em', textTransform: 'uppercase', margin: '0 0 6px' }}>Chapter {String(n).padStart(2, '0')}</p>
    <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(22px,3.5vw,34px)', fontWeight: 900, letterSpacing: '-1px', color: 'var(--text)', margin: 0 }}>{title}</h2>
  </div>
)
const Divider = () => <hr style={{ border: 0, borderTop: '1px solid var(--border)', margin: '44px 0' }} />
const Para = ({ children }: { children: ReactNode }) => <p style={{ fontSize: 15, color: 'var(--text)', lineHeight: 1.9, margin: '0 0 18px' }}>{children}</p>
const H2 = ({ children }: { children: ReactNode }) => <h3 style={{ fontSize: 19, fontWeight: 800, color: 'var(--text)', margin: '28px 0 12px' }}>{children}</h3>
const Accent = ({ children }: { children: ReactNode }) => <strong style={{ color: '#10b981' }}>{children}</strong>
const CodeBlock = ({ children }: { children: ReactNode }) => <pre style={{ background: '#0d1117', border: '1px solid var(--border)', borderRadius: 12, padding: '18px 20px', overflowX: 'auto', fontSize: 13, lineHeight: 1.75, color: '#e2e8f0', fontFamily: 'var(--font-mono)', margin: '18px 0' }}><code>{children}</code></pre>
const StoryBox = ({ children }: { children: ReactNode }) => <div style={{ borderLeft: '4px solid #3b82f6', background: 'rgba(59,130,246,.07)', borderRadius: '0 10px 10px 0', padding: '18px 22px', margin: '22px 0', color: 'var(--text)', lineHeight: 1.85 }}>{children}</div>
const Warn = ({ children }: { children: ReactNode }) => <div style={{ background: 'rgba(251,191,36,.08)', border: '1px solid rgba(251,191,36,.3)', borderRadius: 12, padding: '16px 20px', margin: '22px 0', lineHeight: 1.85, color: 'var(--text)' }}><strong style={{ color: '#fbbf24' }}>Change-safety caution: </strong>{children}</div>
const Err = ({ children }: { children: ReactNode }) => <div style={{ background: 'rgba(239,68,68,.07)', border: '1px solid rgba(239,68,68,.25)', borderRadius: 12, padding: '16px 20px', margin: '22px 0', lineHeight: 1.85, color: 'var(--text)' }}><strong style={{ color: '#f87171' }}>Common mistake: </strong>{children}</div>

export default function NetworkAutomationAndSdn() {
  return (
    <LearnLayout
      title="Network Automation and Software-Defined Networking"
      description="Move from manual device changes to versioned, validated automation and controller-based networking."
      section="Networking Fundamentals — Lesson 48"
      readTime="20–28 min"
    >
      <Para><strong>Prerequisites:</strong> Understand IP routing, VLANs, ACLs, device configuration, and basic programming or structured configuration files.</Para>
      <Para><strong>Learning objectives:</strong> Explain SDN control and data planes, model desired network state, validate and review diffs, and design staged, observable automation with recovery.</Para>
      <Chapter n={1} title="From Repeated Commands to Repeatable Outcomes" />
      <StoryBox>
        A team needs the same VLAN and access policy on twenty branch switches. A manual checklist may work once, but small differences accumulate: one device misses a port, another gets a broader rule, and a third is never updated. Automation turns an approved intent into a repeatable, testable change and records what was applied.
      </StoryBox>
      <Para>
        <Accent>Network automation</Accent> uses software to collect state, validate a desired configuration, and apply or verify changes. It may use device APIs, NETCONF, RESTCONF, gNMI, SSH-based tooling, or a cloud provider API. Automation is not merely scripting commands faster; reliable automation includes inventory, access control, input validation, testing, staged rollout, observability, and recovery.
      </Para>
      <Para>
        <Accent>Software-defined networking (SDN)</Accent> separates policy and control decisions from packet forwarding. A controller can express network-wide intent and program forwarding devices through supported interfaces. The data plane still forwards packets; the control plane still determines paths and policy. SDN does not mean every router is replaced by one magical central box, nor does it mean the controller must handle every packet in real time.
      </Para>
      <CodeBlock>{`Intent / source of truth
          │ validated desired state
          ▼
Automation pipeline or SDN controller
          │ supported management interface
          ▼
Switches, routers, virtual networks, cloud APIs
          │
          └── observed state and telemetry return to pipeline`}</CodeBlock>
      <Divider />

      <Chapter n={2} title="Understand the Control and Data Planes" />
      <Para>
        The <Accent>data plane</Accent> forwards frames and packets using installed forwarding state. The <Accent>control plane</Accent> learns or calculates routes and policies—for example, through routing protocols or a controller. The <Accent>management plane</Accent> is how operators and systems configure, monitor, and administer devices. These are conceptual roles, not necessarily separate physical boxes.
      </Para>
      <Para>
        In a controller-based network, an application or operator expresses intent, the controller computes or coordinates policy, and devices receive configuration through a southbound interface. Northbound interfaces expose services or abstractions to management applications. Protocols such as OpenFlow, NETCONF, RESTCONF, and gNMI solve different problems; no one protocol is a universal replacement for every vendor's configuration and telemetry model.
      </Para>
      <H2>Where central coordination helps</H2>
      <ul style={{ color: 'var(--text)', lineHeight: 1.9, paddingLeft: 22 }}>
        <li>Consistent access policy across many switches or cloud networks.</li>
        <li>Coordinated changes such as segmentation or traffic steering.</li>
        <li>Common inventory, configuration history, and compliance checks.</li>
        <li>Telemetry correlation across devices and sites.</li>
      </ul>
      <Para>
        Centralization introduces its own availability and security requirements. Define how devices behave if the controller is unreachable, which changes require controller connectivity, and how administrators recover access without bypassing audit. A controller compromise may have a wide blast radius, so scope its credentials and management network carefully.
      </Para>
      <Divider />

      <Chapter n={3} title="Declarative Intent and Idempotency" />
      <Para>
        An imperative script says “run these commands.” A declarative workflow says “the desired state is this,” then compares desired and observed state. The comparison yields a plan or diff. An <Accent>idempotent</Accent> operation can be safely repeated without creating extra or contradictory state; this matters when a network call times out after the device applied the change but before the automation received confirmation.
      </Para>
      <CodeBlock>{`# Example desired state kept in version control
device: branch-sw-01
vlans:
  - id: 20
    name: student-lab
  - id: 30
    name: staff
access_ports:
  - port: 1/0/8
    vlan: 20
  - port: 1/0/9
    vlan: 30
management:
  protocol: ssh
  source_network: 10.50.4.0/24`}</CodeBlock>
      <Para>
        The YAML is an example of intent, not a device-ready configuration. A production pipeline maps an approved schema to a specific platform, validates that every referenced VLAN and port exists, checks policy constraints, and shows the exact diff before any write. Store secrets in a managed secret store, not in this file or the Git repository.
      </Para>
      <CodeBlock>{`from ipaddress import ip_network

allowed_management = ip_network("10.50.0.0/16")
requested_source = ip_network("10.50.4.0/24")

if not requested_source.subnet_of(allowed_management):
    raise ValueError("Management source is outside the approved range")

ports = {"1/0/8", "1/0/9", "1/0/10"}
requested_ports = {"1/0/8", "1/0/9"}
if not requested_ports <= ports:
    raise ValueError("Intent refers to an unknown port")

print("Intent passed local validation")`}</CodeBlock>
      <Divider />

      <Chapter n={4} title="Build a Safe Automation Pipeline" />
      <Para>
        Treat a network change like a software release. Start from an inventory and a reviewed source of truth. Validate syntax and policy, generate a diff, run checks against a lab or simulator where available, then apply to a small canary group. Verify the resulting state and service health before rolling out more broadly. Store the change, operator identity, target devices, result, and rollback reference in an audit trail.
      </Para>
      <ol style={{ color: 'var(--text)', lineHeight: 1.9, paddingLeft: 22 }}>
        <li><strong>Plan:</strong> define the intended result, scope, owner, and maintenance window.</li>
        <li><strong>Validate:</strong> check schema, address ranges, policy, and device compatibility.</li>
        <li><strong>Review:</strong> show a human-readable diff and require approval for risky changes.</li>
        <li><strong>Stage:</strong> apply to a lab or canary, then verify both config and traffic.</li>
        <li><strong>Roll out:</strong> use bounded batches, rate limits, and a stop condition.</li>
        <li><strong>Recover:</strong> restore a known-good state or apply a compensating change.</li>
      </ol>
      <Para>
        A rollback is not always “send the old commands.” Some changes are not reversible without data loss or may have changed state elsewhere. Save snapshots and define compensating actions before rollout. If the automation loses connectivity midway, it should report exactly which targets were confirmed, failed, or left uncertain; do not silently mark the batch successful.
      </Para>
      <Warn>
        Never let an unreviewed loop push a change to every production device. A typo in a route, ACL, or management interface can isolate the automation host and the operators who need to undo it.
      </Warn>
      <Divider />

      <Chapter n={5} title="A Small Plan-and-Apply Model" />
      <Para>
        This standard-library example compares desired interface state with observed state and prints a plan. It deliberately does not connect to a device or apply commands. Keeping planning separate from execution makes review and testing possible; a real adapter would need platform-specific API handling, authentication, retries, and audit records.
      </Para>
      <CodeBlock>{`desired = {
    "port-1": {"enabled": True, "vlan": 20},
    "port-2": {"enabled": True, "vlan": 30},
}
observed = {
    "port-1": {"enabled": True, "vlan": 10},
    "port-2": {"enabled": False, "vlan": 30},
}

for port, wanted in desired.items():
    current = observed.get(port)
    if current is None:
        print(f"CREATE {port}: {wanted}")
    elif current != wanted:
        print(f"UPDATE {port}: {current} -> {wanted}")
    else:
        print(f"NO CHANGE {port}")`}</CodeBlock>
      <Para>
        The example's equality check is intentionally simple. Real configuration models need normalization: a list may be semantically unordered, default values may be omitted by a device, and a controller may report generated fields. Compare normalized intent with observed state and test that a second plan after a successful apply is empty. That is a practical idempotency test.
      </Para>
      <Divider />

      <Chapter n={6} title="APIs, Data Models, and Secrets" />
      <Para>
        Prefer a documented management API or structured protocol over screen-scraping a command-line terminal when the platform supports it. Structured interfaces expose typed data and clearer errors. When SSH or a CLI is the only supported path, use a maintained library, validate command output, and account for platform and firmware differences rather than assuming every prompt behaves identically.
      </Para>
      <Para>
        Give automation a dedicated identity with the minimum permissions for its job. Store credentials in a secret manager, rotate them, restrict which pipeline can retrieve them, and use TLS certificate validation for API calls. Do not disable host-key checks to “fix” an SSH error; verify the host identity and update the trust record through the approved process.
      </Para>
      <CodeBlock>{`# A minimal change record to attach to a deployment
change_id: NET-204
requested_by: platform-team
approved_by: network-reviewer
target_group: staging-switches
intent_commit: 7a2c91f
plan_artifact: build/NET-204-plan.txt
rollback_reference: snapshots/NET-204-before
stop_conditions:
  - management reachability lost
  - packet-loss check exceeds approved threshold
  - critical service health check fails`}</CodeBlock>
      <Para>
        Keep sensitive information out of plans and logs: credentials, private keys, session tokens, and unnecessary packet payloads should not appear in build artifacts. Apply access controls and retention rules to configuration backups too; they can reveal topology, IP ranges, and security policy.
      </Para>
      <Divider />

      <Chapter n={7} title="Telemetry, Drift, and Failure Handling" />
      <Para>
        <Accent>Configuration drift</Accent> is a difference between the recorded desired state and what devices actually run. Drift may come from emergency manual changes, failed automation, device replacement, or defaults. Detect it through periodic reconciliation and report the difference; avoid automatically overwriting a legitimate emergency change before the owner can review it.
      </Para>
      <Para>
        Track deployment success by target, configuration state, controller or API errors, management reachability, and data-plane health. A command returning success is not enough: verify the device accepted the intended state and that representative traffic still works. Define a circuit breaker so rising errors pause the rollout instead of multiplying the impact.
      </Para>
      <CodeBlock>{`# Example rollout stop conditions
max_batch_size = 3
stop_if_management_unreachable = True
stop_if_config_diff_remains = True
stop_if_canary_health_fails = True

# After each batch:
# 1. collect device acknowledgement
# 2. compare observed state with intent
# 3. run service-level probes
# 4. continue only if every gate passes`}</CodeBlock>
      <Para>
        Make failure modes visible. Distinguish rejected input, authentication failure, unsupported device capability, partial application, lost confirmation, and post-change service failure. Each requires a different response; a generic “automation failed” message is not enough for safe operations.
      </Para>
      <Divider />

      <Chapter n={8} title="Common Mistakes and Practice" />
      <ul style={{ color: 'var(--text)', lineHeight: 1.9, paddingLeft: 22 }}>
        <li><strong>Automating before defining intent:</strong> fast execution of ambiguous policy only creates inconsistencies faster.</li>
        <li><strong>Assuming the controller is the network:</strong> forwarding devices and fallback behavior still matter.</li>
        <li><strong>Applying globally in one batch:</strong> canary and bounded rollout reduce blast radius.</li>
        <li><strong>Treating CLI success as service success:</strong> verify observed configuration and real traffic.</li>
        <li><strong>Logging credentials or full configs indiscriminately:</strong> manage sensitive artifacts as production data.</li>
      </ul>
      <H2>Practice</H2>
      <ol style={{ color: 'var(--text)', lineHeight: 1.9, paddingLeft: 22 }}>
        <li>Write a small desired-state file for two lab ports and state the schema validations it needs.</li>
        <li>Explain the control plane versus data plane using a controller and two switches.</li>
        <li>Design a canary rollout for an ACL change. Name at least three stop conditions.</li>
        <li>Describe how you would detect and respond to manual configuration drift.</li>
        <li>Make the plan-and-apply example idempotent by testing that an identical desired and observed state prints no update.</li>
      </ol>
      <Divider />
      <KeyTakeaways items={[
        'Network automation is a safe change workflow—intent, validation, review, staged apply, verification, and recovery—not just a command loop.',
        'SDN separates policy and control decisions from forwarding, but the data plane and device behavior remain essential.',
        'Declarative, idempotent operations make retries and drift detection safer.',
        'Use structured management interfaces when supported, least-privilege identities, secret management, and audited changes.',
        'Canaries, bounded batches, stop conditions, and service-level tests limit the blast radius of mistakes.',
        'A successful API response does not prove that the intended configuration or user traffic works; verify both.',
      ]} />
    </LearnLayout>
  )
}
