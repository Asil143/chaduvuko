import { LearnLayout } from '@/components/content/LearnLayout'
import { Callout, Code, H3, KeyTakeaways, Mistakes, NextLesson, P, Part, Practice, Steps, Table } from '@/components/content/LessonKit'

export default function OperatingSystemsLesson1() {
  return (
    <LearnLayout title="What an Operating System Does — Kernel and System Calls" description="User mode and kernel mode, system calls, interrupts, and what happens between typing a command and a program running." section="Operating Systems — Lesson 01" readTime="30 min">
      <Part n={1} label="Why an OS exists" title="A Shared Machine Needs a Trusted Coordinator">
        <P>An operating system (OS) coordinates hardware and provides stable services to programs. An app should not need to know how a particular SSD controller, timer, or network card works. It requests an operation through a defined interface; the OS mediates access, enforces isolation, and shares resources among programs.</P>
        <P>Keep three ideas separate: <strong>mechanism</strong> is how the machine performs an operation; <strong>policy</strong> decides who gets a resource and when; the <strong>interface</strong> is how a program requests a service. The kernel is the central privileged part of the OS, while shells, libraries, services, and utilities may run outside it.</P>
        <Table head={['Layer','Example','Responsibility']} rows={[[ 'Hardware','CPU, RAM, disk, device controller','Physical execution and I/O' ],[ 'Kernel','scheduler, virtual memory, drivers','Protected resource management' ],[ 'Library / runtime','C library, Python runtime','Convenient higher-level APIs' ],[ 'Application','editor, web server, terminal command','Product behavior using OS services' ]]} caption="The layers cooperate but do not have the same privilege." />
        <Callout type="info"><strong>Kernel is not synonymous with the whole OS.</strong> User-space utilities and services are part of a usable operating-system environment too.</Callout>
      </Part>
      <Part n={2} label="Privilege" title="User Mode and Kernel Mode">
        <P>CPUs provide privilege levels. Ordinary applications run in restricted <strong>user mode</strong>: they cannot execute privileged instructions or freely read another process's memory. The kernel runs in <strong>kernel mode</strong> with access needed to manage hardware and memory. This boundary limits damage from an application bug.</P>
        <P>A program crosses this boundary through a controlled entry point. The CPU records state to resume user code after the service or exception is handled. The kernel checks arguments and permissions; being in kernel mode is not itself a guarantee that an operation is safe.</P>
        <Callout type="warning">A kernel bug can affect the entire machine. Keeping most application logic in user space reduces the trusted code base, but does not prevent every security failure.</Callout>
      </Part>
      <Part n={3} label="System calls" title="A Request Crosses the Boundary">
        <P>A <strong>system call</strong> requests a kernel service such as creating a process, reading a file, or mapping memory. A language library function is not automatically a system call: it may work in user space or eventually invoke one. A buffered library read can satisfy small reads from its own buffer before asking the kernel for more data.</P>
        <Steps items={['Application calls a library or runtime function.','A wrapper places the operation and arguments in the platform-defined form and enters the kernel.','Kernel validates pointers, permissions, and resource state; it performs or schedules the operation.','Kernel returns a result or error, and execution resumes in user mode.']} />
        <Code file="read_bytes.c" lang="c" code={`#include <unistd.h>
#include <stdio.h>

int main(void) {
    char buffer[128];
    ssize_t count = read(STDIN_FILENO, buffer, sizeof buffer);
    if (count < 0) {
        perror("read");
        return 1;
    }
    if (write(STDOUT_FILENO, buffer, (size_t)count) < 0) {
        perror("write");
        return 1;
    }
    return 0;
}`} />
        <P><code>read</code> and <code>write</code> are POSIX interfaces whose C library wrappers request kernel I/O. A successful call can return fewer bytes than requested; robust programs handle partial writes in a loop. A zero-byte read can indicate end-of-file.</P>
      </Part>
      <Part n={4} label="Boot" title="From Reset to a Running Program">
        <P>At reset, firmware performs platform initialization and selects a boot path. A bootloader locates and loads a kernel (often with an initial RAM filesystem), then transfers control. The kernel initializes memory management, interrupt handling, drivers, and core subsystems; it mounts or locates a root filesystem and starts an initial user-space process or equivalent service manager.</P>
        <P>The exact chain depends on firmware, configuration, and distribution. The durable idea is a hand-off: each stage prepares enough of the next stage to start it. A login prompt is user-space software running on top of a kernel that has initialized enough devices and services.</P>
        <P>The first user-space process commonly starts or supervises other services. Services initialize networking, logging, and login interfaces; a shell then interprets a command and requests process creation. The shell itself does not directly assign CPU time or read disk sectors—it relies on kernel services for those operations. This is a useful end-to-end view from machine boot to the command prompt.</P>
        <P>Access control is part of the same mediation role. A process has an identity and credentials; the OS checks those against file and device permissions when a request crosses into protected services. Applications can add their own authorization rules, but hiding a button in a UI does not replace the kernel's access checks.</P>
        <Code lang="bash" code={`# Inspect a running Linux system (this does not replay the boot)
uname -a
cat /proc/cmdline
dmesg | head -n 20
systemctl is-system-running`} />
        <P>Permissions and available commands vary by distribution. These observations cannot prove that every boot stage succeeded exactly as expected; they show selected properties of the current running system.</P>
      </Part>
      <Part n={5} label="Events" title="System Calls, Interrupts, and Exceptions">
        <P>A system call is a deliberate request from the running program. An <strong>interrupt</strong> is an event asking the CPU to transfer control to a handler, often for device completion or a timer. An <strong>exception</strong> is raised by the current instruction, for example on an invalid operation or a page fault. Depending on the event, the OS may resume the program, report an error, wake a waiter, or schedule other work.</P>
        <Table head={['Event','Typical source','Purpose']} rows={[[ 'System call','Application requests file I/O','Controlled service entry' ],[ 'Hardware interrupt','Timer or device signals CPU','Asynchronous event handling' ],[ 'Exception / fault','Current instruction needs handling','Report, recover, or terminate safely' ]]} />
        <Callout type="example">A disk read may wait for data. The kernel can run other work; when the device signals completion, the waiting operation may become runnable. The caller sees a read operation, while the OS coordinates several transitions.</Callout>
        <P>System-call interfaces also provide a boundary for errors. A successful call returns a result defined by its contract; failure is reported using that interface's convention (for example, POSIX calls often return a sentinel and set <code>errno</code>). A wrapper may translate a low-level error into a language exception. When debugging, inspect the layer that produced the error instead of assuming every failure is a kernel panic.</P>
        <Table head={['Application request','Possible library work','Kernel service involved']} rows={[[ 'Print formatted text','Format and buffer characters','Write output when flushed' ],[ 'Read a line','Buffer input and split at newline','Read from descriptor or device' ],[ 'Open a path','Normalize or validate arguments','Resolve path and check permissions' ]]} caption="One application operation can involve zero or more kernel entries." />
      </Part>
      <Part n={6} label="Hands-on" title="Observe the User–Kernel Boundary">
        <P>Tracing tools can show system-call activity for a process. This helps diagnose unexpected file access or waiting, but tracing changes timing and may require permissions. A library API does not map one-to-one to a syscall.</P>
        <Code lang="bash" code={`# Summarize calls made by a harmless command
strace -c ls .

# Filter a few calls (output can still be lengthy)
strace -e trace=openat,read,write ls .`} />
        <Code file="boundary.py" lang="python" code={`from pathlib import Path

# pathlib is a convenient user-space interface; the runtime eventually
# requests file operations from the operating system.
path = Path("notes.txt")
try:
    text = path.read_text(encoding="utf-8")
except FileNotFoundError:
    print("No notes file yet")
else:
    print(f"Read {len(text)} characters")`} />
        <Steps items={['Run a command normally and under a tracer.','Identify an observed file-open or write operation.','Explain which layer provided a friendly API and which layer enforced permissions.','Repeat with an absent file and distinguish the application error from the kernel service.']} />
      </Part>
      <Part n={7} label="Pitfalls" title="Answer with Precision">
        <Mistakes items={[
          { mistake: 'Giving a memorized slogan without assumptions', cause: 'A scheduling or replacement answer changes with the workload and model.', fix: 'State arrivals, frame count, preemption, and tie-breaking before calculating.' },
          { mistake: 'Confusing two neighboring concepts', cause: 'Similar terms describe different layers or guarantees.', fix: 'Define each concept and provide one contrast before adding detail.' },
          { mistake: 'Treating an observation as a universal guarantee', cause: 'A command samples one system at one moment.', fix: 'Describe the observation limits and what additional evidence is needed.' },
          { mistake: 'Ignoring trade-offs and failure modes', cause: 'An idealized definition omits the engineering constraints.', fix: 'Name one cost, edge case, or recovery path for every mechanism.' },
        ]} />
      </Part>
      <Part n={8} label="Practice" title="Apply It to a Small System">
        <Practice title="Trace, calculate, and explain" tasks={[
          'Draw the state, resource, or address transitions for a realistic workload, including a wait or failure path.',
          'Run a relevant Linux observation command from this lesson and explain what it can and cannot prove.',
          'Implement the small C or Python exercise, change one input, and predict the result before executing it.',
          'Explain one design choice with a precise invariant, a concrete example, and a trade-off.',
        ]} hint="Write assumptions first, then use a trace or calculation to support your explanation." />
      </Part>
      <KeyTakeaways items={["The OS coordinates hardware and offers protected services through stable interfaces.", "User mode restricts direct hardware operations; system calls request kernel services through controlled entry points.", "Libraries can wrap, buffer, or combine system calls, so API calls and kernel crossings are not one-to-one.", "Boot is a chain of initialization and hand-offs from firmware toward a kernel and user space.", "Interrupts and exceptions let the OS react to asynchronous events and instruction-level faults."]} />

      <H3>Next</H3>
      <NextLesson href="/learn/operating-systems/processes-and-threads" label="Lesson 02 · Processes and Threads" text="Now trace how the OS represents a running program, switches execution, and creates processes and threads." />
    </LearnLayout>
  )
}
