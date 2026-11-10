import { LearnLayout } from '@/components/content/LearnLayout'
import { Bullets, Callout, Code, H3, KeyTakeaways, Mistakes, NextLesson, P, Part, Practice, Steps, Table } from '@/components/content/LessonKit'

export default function VirtualisationContainers() {
  return (
    <LearnLayout
      title="Virtualisation and Containers — Hypervisors, Namespaces and cgroups"
      description="Type 1 and type 2 hypervisors, how containers use namespaces and cgroups, and what that means for Docker and Kubernetes."
      section="Operating Systems — Lesson 09"
      readTime="40 min"
    >
      <Part n={1} label="Why isolate workloads" title="One Machine Can Host Many Environments">
        <P>
          A server may run a payment API, a reporting worker, and a database at once. They need separate dependencies,
          identities, and resource boundaries even though they share physical CPU, memory, storage, and network hardware.
          Virtualisation creates an abstraction between software and hardware; the abstraction can be a whole virtual machine
          (VM) or a process-level container.
        </P>
        <P>
          Isolation has degrees, not a magical on/off switch. A VM has a guest operating system and a virtual hardware boundary
          managed by a hypervisor. A container normally shares the host kernel while presenting an isolated view of selected
          operating-system resources. Both still depend on the host, configuration, and privileges they are given.
        </P>
        <Table
          head={['Property', 'Virtual machine', 'Container']}
          rows={[
            ['Kernel', 'Guest kernel per VM', 'Usually shares the host kernel'],
            ['Isolation boundary', 'Virtual hardware and hypervisor', 'Process isolation features of the host OS'],
            ['Startup and footprint', 'Includes guest OS lifecycle and resources', 'Typically lighter; starts as host processes'],
            ['Operating systems', 'Can run a compatible guest OS independently of host user space', 'Requires host-kernel compatibility'],
            ['Best fit', 'Strong environment separation and mixed guest OS needs', 'Portable application packaging and dense services'],
          ]}
        />
        <Callout type="info">
          A container is not a tiny VM. It is a process with a constrained and namespaced view of the host OS, packaged with
          files and configuration. That distinction explains both its speed and its shared-kernel risk.
        </Callout>
      </Part>

      <Part n={2} label="Hypervisors" title="The Hypervisor Shares Physical Hardware">
        <P>
          A hypervisor allocates virtual CPUs, memory, devices, and storage to guest operating systems. A type 1 hypervisor
          runs directly on hardware or in a hardware-oriented privileged layer. A type 2 hypervisor runs as an application on a
          host operating system. Product terminology can vary, but the useful distinction is where the virtualization control
          layer sits and what software is between it and the hardware.
        </P>
        <P>
          The guest OS schedules its own processes, while the hypervisor schedules virtual CPUs onto physical CPUs. A guest
          may believe it owns a device that is actually virtual; the hypervisor or host maps that device to physical resources.
          Overcommitting CPU or memory can improve utilisation but may cause contention. A VM with a large configured memory
          limit still needs physical capacity somewhere on the host.
        </P>
        <Steps items={[
          'The VM manager creates virtual hardware and attaches an OS image.',
          'The guest boots its own kernel and starts its services.',
          'Guest CPU and I/O requests are scheduled through the virtualization layer.',
          'The host monitors contention, capacity, and VM health across guests.',
        ]} />
        <Callout type="tip">
          When debugging a VM, separate guest symptoms from host symptoms. A guest can show spare memory inside itself while
          the physical host is under pressure, or the reverse if guest limits are too tight.
        </Callout>
      </Part>

      <Part n={3} label="Container model" title="An Image Is a Template; a Container Is a Running Process">
        <P>
          A container image is a set of filesystem layers plus metadata such as its entry point. A running container adds a
          process, configuration, network attachment, and writable runtime state. Image layers can be reused across instances,
          which makes deployment efficient, but mutable container state should not be mistaken for durable application data.
        </P>
        <Code lang="bash" file="container-lifecycle.sh" code={`
# Build an image from the Dockerfile in the current project directory.
docker build -t study-api:local .

# Start one short-lived container and remove it when the process exits.
docker run --rm study-api:local

# List running containers; this does not change their state.
docker ps
`} />
        <P>
          Containers are useful for repeatable packaging, local development, and service deployment. They do not automatically
          provide a deployment strategy, secrets system, network policy, backups, or safe patching. Those concerns belong in
          the surrounding platform and operational design.
        </P>
      </Part>

      <Part n={4} label="Namespaces" title="Namespaces Change What a Process Can See">
        <P>
          Linux namespaces give a process a view of selected global resources. Depending on which namespaces are configured,
          processes can see an isolated process ID space, network stack, mount view, hostname, or user ID mapping. Namespaces
          affect visibility and identity; they do not by themselves guarantee a CPU or memory limit. A process may have a
          separate PID view while still competing for host CPU.
        </P>
        <Code lang="python" file="inspect_namespaces.py" code={`
from pathlib import Path

namespace_dir = Path("/proc/self/ns")
if not namespace_dir.exists():
    raise SystemExit("This example requires a Linux procfs mount")

for entry in sorted(namespace_dir.iterdir()):
    try:
        print(f"{entry.name}: {entry.resolve()}")
    except OSError as error:
        print(f"{entry.name}: unavailable ({error})")
`} />
        <P>
          On Linux, this read-only example shows namespace links for the current process. The identifiers are useful for
          comparison, not for granting access. Container runtimes combine namespaces with filesystem setup, capabilities,
          security policies, and resource controls. Do not infer the complete security boundary from a process listing alone.
        </P>
      </Part>

      <Part n={5} label="cgroups" title="cgroups Account for and Limit Resource Use">
        <P>
          Control groups (cgroups) organise processes so the kernel can account for and control resource use. A runtime can
          apply CPU shares or quotas, memory limits, process-count limits, and I/O controls when supported by the host. A
          namespace answers &quot;what can this process see?&quot;; a cgroup answers questions such as &quot;how much of this
          resource may this group consume?&quot; The exact interfaces differ between cgroup versions and distributions.
        </P>
        <Table
          head={['Control', 'What it helps with', 'What to monitor']}
          rows={[
            ['CPU', 'Avoid one service monopolising compute', 'Throttling and latency under load'],
            ['Memory', "Bound a process group's memory use", 'Working set, pressure, and out-of-memory events'],
            ['Process count', 'Limit excessive child process creation', 'Current count and rejected process starts'],
            ['Block I/O', 'Manage storage access where supported', 'Queue delay and application response time'],
            ['CPU / memory accounting', 'Attribute resource use to a workload', 'Usage trends and host contention'],
          ]}
        />
        <P>
          Limits must fit the workload. A strict memory ceiling can protect other services, but an undersized limit can cause
          restarts or application failures. A CPU limit can improve fairness while extending response time during a burst.
          Measure actual demand and alert on throttling, pressure, and restarts instead of assuming a configured limit is safe.
        </P>
      </Part>

      <Part n={6} label="Container configuration" title="Set Boundaries Deliberately">
        <P>
          This example starts a short-lived container with resource bounds and a reduced privilege surface. It assumes the
          image exists locally and its default command is appropriate. Review the image and workload before using flags in a
          real environment; a read-only root filesystem, for example, requires the application to write only to explicitly
          mounted locations.
        </P>
        <Code lang="bash" file="bounded-container.sh" code={`
docker run --rm \\
  --memory=256m \\
  --cpus=1 \\
  --pids-limit=100 \\
  --read-only \\
  --cap-drop=ALL \\
  --security-opt=no-new-privileges \\
  study-api:local
`} />
        <P>
          Start from the narrowest capabilities and mounts the application needs, then add only justified access. Mounting the
          host filesystem broadly or running privileged erodes isolation. Use explicit volumes for required persistent state,
          and keep credentials in a secrets mechanism rather than baking them into an image layer.
        </P>
        <Callout type="warning">
          Containers share the host kernel in the usual model. Do not run untrusted code in a container as though that made it
          equivalent to a separate physical security boundary; consider a stronger isolation model for high-risk workloads.
        </Callout>
      </Part>

      <Part n={7} label="Production operations" title="Images, State and Observability Are Part of the Boundary">
        <P>
          Build images from maintained base images, pin and review dependencies through your normal release process, and scan
          for known issues. Run as a non-root identity when possible. Keep the image minimal, avoid shipping debugging tools
          that are not needed at runtime, and ensure the process handles termination signals so deployments can stop it
          cleanly.
        </P>
        <P>
          Treat container filesystems as replaceable. Store important uploads, database files, and user-generated content in
          managed persistent storage with explicit backup and recovery plans. Emit logs to the platform&apos;s log pipeline and
          include health signals for the application, not only the container process. A process that is alive but cannot
          reach its database is not necessarily healthy.
        </P>
        <Steps items={[
          'Define CPU, memory, process, network, and filesystem needs for each workload.',
          'Build a reproducible image and keep runtime configuration outside the image.',
          'Run with a dedicated identity and only required capabilities, mounts, and network access.',
          'Monitor resource pressure, restarts, errors, and end-to-end service health.',
          'Test image updates, graceful shutdown, persistent-data recovery, and rollback.',
        ]} />
      </Part>

      <Part n={8} label="Pitfalls" title="Common Virtualisation and Container Mistakes">
        <Mistakes items={[
          { mistake: 'Calling a container a lightweight VM', cause: 'The usual container model shares the host kernel.', fix: 'Explain the shared-kernel boundary and select isolation to match workload risk.' },
          { mistake: 'Assuming namespaces impose resource limits', cause: 'Namespaces change resource views; cgroups handle accounting and controls.', fix: 'Configure and monitor both isolation and resource policy.' },
          { mistake: 'Treating the container writable layer as durable storage', cause: 'Containers may be replaced during restart or deployment.', fix: 'Put durable state in explicitly managed storage and test recovery.' },
          { mistake: 'Running every service as root with broad host mounts', cause: 'Convenience expands the impact of a compromised process.', fix: 'Use a non-root identity, least privilege, narrow mounts, and explicit capabilities.' },
        ]} />
      </Part>

      <Part n={9} label="Practice" title="Package a Small Service with Resource Limits">
        <Practice
          title="Reason about isolation before deployment"
          tasks={[
            'Explain whether a VM or container is a better fit for two services that need different operating-system kernels.',
            'Run the namespace inspection script on Linux and describe what the output can and cannot prove.',
            'Choose CPU, memory, and process limits for a test worker, then identify the metrics needed to validate those limits.',
            'List the host mounts, network access, and Linux capabilities a hypothetical API actually requires; remove the rest.',
            'Design a restart test proving that application data survives container replacement and that shutdown is graceful.',
          ]}
          hint="Start with the threat model and data lifecycle. Isolation settings are useful only when their operational effects are understood."
        />
      </Part>

      <KeyTakeaways items={[
        'A VM virtualises hardware and runs a guest kernel; a typical container shares the host kernel.',
        'Hypervisors allocate virtual hardware, and host contention still affects guest performance.',
        'Namespaces change a process view; cgroups account for and constrain resource consumption.',
        'Container images are templates, while running containers are replaceable processes with runtime configuration.',
        'Least privilege, narrow mounts, bounded resources, and maintained images reduce risk.',
        'Persistent data, logs, health checks, and recovery plans belong in the production design.',
      ]} />

      <Bullets items={[
        <span key="ref">For implementation details, consult the Linux kernel documentation on namespaces and cgroups, and the documentation for your selected container runtime and hypervisor.</span>,
      ]} />

      <H3>Next</H3>
      <NextLesson
        href="/learn/operating-systems/os-protection-security"
        label="Lesson 10 · Protection and Security in the OS"
        text="Isolation is one part of defence. Next, connect users, permissions, memory protection, and sandboxing into an OS security model."
      />
    </LearnLayout>
  )
}
