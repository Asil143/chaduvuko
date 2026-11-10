import { LearnLayout } from '@/components/content/LearnLayout'
import { Bullets, Callout, Code, H3, KeyTakeaways, Mistakes, NextLesson, P, Part, Practice, Steps, Table } from '@/components/content/LessonKit'

export default function OsProtectionSecurity() {
  return (
    <LearnLayout
      title="Protection and Security in the OS"
      description="Users, permissions and access control, privilege separation, memory protection, ASLR and sandboxing."
      section="Operating Systems — Lesson 10"
      readTime="35 min"
    >
      <Part n={1} label="Protection model" title="Security Starts with Separating Authority">
        <P>
          An operating system mediates access to files, processes, devices, memory, and network resources. Protection is the
          mechanism that enforces those boundaries; security is the broader goal of keeping confidentiality, integrity, and
          availability under a stated threat model. The OS can enforce useful defaults, but an application can still misuse
          data it is authorised to access.
        </P>
        <P>
          A practical starting point is least privilege: give a process only the identity and access it needs for its task.
          Separate the user-facing service from a privileged operation, constrain the files and devices it can reach, and
          reduce how much authority an error or compromise would expose. Security is layered; permissions, isolation, memory
          protections, updates, monitoring, and recovery all address different failure modes.
        </P>
        <Table
          head={['Layer', 'Question it answers', 'Example']}
          rows={[
            ['Identity', 'Which user or service is acting?', 'A dedicated account for a background worker'],
            ['Authorization', 'Which operation is allowed?', 'Read-only access to a configuration file'],
            ['Privilege separation', 'Which component needs elevated authority?', 'A small helper performs one protected operation'],
            ['Memory protection', 'Which addresses may this process access?', 'Separate process address spaces and page permissions'],
            ['Isolation', 'Which resources are visible or reachable?', 'A sandbox or restricted container'],
            ['Recovery', 'How do we restore trustworthy operation?', 'Patch, rotate credentials, and recover tested backups'],
          ]}
        />
        <Callout type="info">
          Authentication answers &quot;who are you?&quot; Authorization answers &quot;what may you do?&quot; Passing one check does
          not imply access to every resource; enforce authorization at the resource boundary.
        </Callout>
      </Part>

      <Part n={2} label="Users and permissions" title="Unix Permissions Are a Useful First Boundary">
        <P>
          Unix-like systems associate files and processes with user and group identities. Traditional file mode bits describe
          read, write, and execute access for the owner, group, and others. Directories use execute permission to allow
          traversal, and write permission to create or remove entries. Permissions combine with ownership, ACLs, mount policy,
          and other controls; reading one mode string is not a complete access review.
        </P>
        <Code lang="bash" file="permission-basics.sh" code={`
# Inspect your current identity and a file's ownership/mode.
id
ls -l app-config.json

# Set a private read/write mode for the owner only.
chmod 600 app-config.json

# Choose a restrictive default for files created by this shell.
umask 077
`} />
        <P>
          A mode of <code>600</code> means the owner can read and write, while group and other users have no mode-bit access.
          It is a reasonable starting point for a local secret file, but secrets should preferably come from an appropriate
          secret-management system in a deployed service. A restrictive <code>umask</code> changes defaults for newly created
          files; it does not repair permissions on files that already exist.
        </P>
        <Callout type="tip">
          Review both the file and every parent directory. A private file inside a broadly writable directory may still be
          replaceable by another user, depending on directory ownership and sticky-bit policy.
        </Callout>
      </Part>

      <Part n={3} label="Privilege separation" title="Keep Privileged Code Small and Specific">
        <P>
          The kernel runs in a privileged mode to manage hardware and system resources. Ordinary application code should run
          with less authority and request specific services through system calls. At the application level, a service can also
          separate a small privileged helper from a larger parser or network-facing process. The helper should validate the
          request, perform one narrowly defined operation, and avoid accepting arbitrary commands or paths.
        </P>
        <Code lang="c" file="process_identity.c" code={`
#include <stdio.h>
#include <sys/types.h>
#include <unistd.h>

int main(void) {
    uid_t real_user = getuid();
    uid_t effective_user = geteuid();
    gid_t real_group = getgid();
    gid_t effective_group = getegid();

    printf("real uid=%lu effective uid=%lu\\n",
           (unsigned long)real_user, (unsigned long)effective_user);
    printf("real gid=%lu effective gid=%lu\\n",
           (unsigned long)real_group, (unsigned long)effective_group);
    return 0;
}
`} />
        <P>
          The real identity identifies who started a process; the effective identity is commonly used in permission checks.
          This example only reports identity. It does not attempt to elevate privileges. Prefer a dedicated service account and
          explicit permissions over a long-running process with broad administrative authority.
        </P>
        <P>
          Capabilities can divide some traditionally broad administrative authority into narrower privileges on supported
          systems. They are still powerful permissions: do not add one just to silence an error. Identify the exact operation,
          grant the minimum required authority, and document why the process needs it.
        </P>
      </Part>

      <Part n={4} label="Memory protection" title="Address Spaces Limit Accidental and Malicious Access">
        <P>
          Each process normally receives a virtual address space. The memory-management unit and page tables translate virtual
          addresses and enforce page permissions such as readable, writable, or executable. A process cannot ordinarily read
          another process&apos;s memory just by guessing an address; access requires a permitted mechanism such as debugging
          privileges or explicit shared memory. Kernel memory is protected from user-mode access.
        </P>
        <P>
          Memory protection reduces the effect of many programming errors, but it does not make unsafe code safe. A buffer
          overrun can still corrupt the current process, and a flaw in a privileged component may cross a boundary. Use
          memory-safe interfaces where practical, validate lengths, keep toolchains current, and test error paths. Mitigations
          complement sound coding; they are not substitutes for it.
        </P>
        <Table
          head={['Mechanism', 'Purpose', 'Limit']}
          rows={[
            ['Per-process address spaces', 'Separate one process from another', 'A permitted sharing/debug path may still expose memory'],
            ['Page permissions', 'Restrict reading, writing, or executing memory regions', 'Do not prevent every logic or data-flow bug'],
            ['ASLR', 'Randomise locations of selected memory regions', 'Does not repair a memory-safety flaw'],
            ['Non-executable memory', 'Make selected data pages non-executable', 'Does not prevent all code-reuse or logic attacks'],
            ['Privilege separation', 'Reduce authority available to a component', 'A compromised component can still misuse its granted access'],
          ]}
        />
      </Part>

      <Part n={5} label="ASLR" title="Randomisation Adds Uncertainty, Not a Complete Fix">
        <P>
          Address Space Layout Randomisation (ASLR) varies locations such as the stack, shared libraries, and other memory
          regions between executions, where supported and enabled. This makes some address-dependent attacks less predictable.
          Its effectiveness depends on the platform, executable properties, available entropy, and whether an information leak
          reveals addresses. ASLR is a defence-in-depth mitigation rather than a guarantee that a vulnerable program is safe.
        </P>
        <Code lang="bash" file="inspect-aslr.sh" code={`
# Read the Linux ASLR setting when procfs exposes it.
if [ -r /proc/sys/kernel/randomize_va_space ]; then
  cat /proc/sys/kernel/randomize_va_space
else
  echo "ASLR setting is not exposed at this path on this system."
fi
`} />
        <P>
          This is a read-only inspection. The setting and meaning are OS-specific; do not change a machine-wide security
          control just to run a demo. On managed systems, ask the administrator and consult the platform documentation before
          changing security configuration.
        </P>
      </Part>

      <Part n={6} label="Sandboxing" title="Constrain What a Program Can Reach">
        <P>
          A sandbox restricts a program&apos;s access to selected resources. Depending on the platform, it may limit filesystem
          paths, system calls, network access, devices, process visibility, or resource consumption. A browser tab, mobile app,
          or build worker can be sandboxed so that a mistake in one component has less reach. Sandboxes depend on their policy
          and implementation, so they require updates and careful configuration too.
        </P>
        <Steps items={[
          'List the files, network destinations, devices, and system operations the workload actually needs.',
          'Deny access by default where the platform supports it, then grant narrowly scoped exceptions.',
          'Run the workload as a non-administrative identity with bounded resources.',
          'Test normal operation and expected failures under the restricted policy.',
          'Review logs and policy changes as part of release and incident response.',
        ]} />
        <P>
          For a report-conversion worker, allow reading its input and writing to one output directory; do not mount the whole
          host filesystem or expose unrelated service credentials. If the worker needs outbound network access, define and
          monitor that need instead of assuming the default network is harmless.
        </P>
        <Callout type="warning">
          Sandboxing untrusted code requires an isolation boundary appropriate to the threat. A configuration that protects
          against accidents may not be sufficient for hostile multi-tenant workloads.
        </Callout>
      </Part>

      <Part n={7} label="Operational security" title="Permissions Need Maintenance and Recovery">
        <P>
          Access control changes over time: people leave teams, services gain features, and temporary permissions become
          permanent. Revisit service identities, group membership, secrets, and access logs. Apply security updates through a
          tested process and know how to roll back safely. Log security-relevant events without writing passwords, tokens, or
          sensitive user data into general application logs.
        </P>
        <Table
          head={['Control', 'Question to ask', 'Evidence']}
          rows={[
            ['Account lifecycle', 'Are inactive human and service accounts removed?', 'Owner, purpose, and review date'],
            ['File access', 'Can this service read or write only required paths?', 'Ownership, modes, ACLs, and mount policy'],
            ['Privilege', 'Does a process need its current authority?', 'Documented operation and least-privilege test'],
            ['Updates', 'How are fixes tested and deployed?', 'Patch records and rollback procedure'],
            ['Recovery', 'Can the team restore trusted service and data?', 'A restore exercise and incident runbook'],
          ]}
        />
        <P>
          For a financial application, use separate service identities for API, reporting, and deployment tasks. A reporting
          process that only reads aggregates should not receive permission to alter payment records. Make the intended access
          visible and test it automatically so a broad permission does not quietly return during deployment.
        </P>
      </Part>

      <Part n={8} label="Pitfalls" title="Common OS Protection Mistakes">
        <Mistakes items={[
          { mistake: 'Treating authentication as authorization', cause: 'Knowing which user is connected does not decide what that user may access.', fix: 'Check the requested action against explicit permissions at the resource boundary.' },
          { mistake: 'Running a whole service as administrator', cause: 'A flaw in any part inherits all of that process authority.', fix: 'Use a dedicated low-privilege identity and isolate narrowly privileged operations.' },
          { mistake: 'Treating ASLR as a fix for unsafe code', cause: 'Randomisation raises uncertainty but leaves the underlying defect.', fix: 'Fix memory-safety issues and keep mitigations enabled as defence in depth.' },
          { mistake: 'Assuming a sandbox is automatically secure', cause: 'A broad policy, outdated runtime, or shared-kernel risk may defeat its purpose.', fix: 'Define a threat model, minimise access, test the boundary, and keep it maintained.' },
        ]} />
      </Part>

      <Part n={9} label="Practice" title="Review Access for a Data Export Worker">
        <Practice
          title="Build a small, testable protection plan"
          tasks={[
            'Inspect a local file with ls -l and explain the owner, group, and mode bits; do not change files you do not own.',
            'Write an access matrix for an API, reporting worker, and deployment account, covering input, output, and secrets.',
            'Explain how per-process address spaces, page permissions, and ASLR address different risks.',
            'Choose sandbox restrictions for a CSV export worker and list one test for each restriction.',
            'Draft a safe incident checklist for revoking a service credential, applying a fix, and restoring from a tested backup.',
          ]}
          hint="Grant the export worker only the input data and destination it needs. Treat logs and temporary output as sensitive until reviewed."
        />
      </Part>

      <KeyTakeaways items={[
        'The OS enforces identity and access boundaries over files, processes, memory, and devices.',
        'Least privilege limits the damage a process can cause when it fails or is compromised.',
        'Unix permissions are one layer; ownership, directory access, ACLs, and mount policy also matter.',
        'Memory protection and ASLR are complementary mitigations, not a replacement for safe code.',
        'Sandboxing restricts resource access but depends on a precise policy and maintained implementation.',
        'Operational security includes account review, updates, careful logs, and tested recovery.',
      ]} />

      <Bullets items={[
        <span key="ref">For exact permission and mitigation behaviour, consult your operating system&apos;s manual pages and official security documentation; details vary by platform.</span>,
      ]} />

      <H3>Next</H3>
      <NextLesson
        href="/learn/operating-systems/os-interview-questions"
        label="Lesson 11 · Operating Systems Interview Questions"
        text="You have covered the OS foundations. Next, practise explaining processes, scheduling, memory, storage, isolation, and security under interview follow-ups."
      />
    </LearnLayout>
  )
}
