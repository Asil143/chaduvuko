import { LearnLayout } from '@/components/content/LearnLayout'
import { Callout, Code, H3, KeyTakeaways, Mistakes, NextLesson, P, Part, Practice, Steps, Table } from '@/components/content/LessonKit'

export default function OperatingSystemsLesson2() {
  return (
    <LearnLayout title="Processes and Threads" description="Process memory layout, process states, fork and exec, threads versus processes, context switches, and IPC." section="Operating Systems — Lesson 02" readTime="40 min">
      <Part n={1} label="Program versus process" title="A Process Is a Running Instance">
        <P>A <strong>program</strong> is passive code and data stored somewhere; a <strong>process</strong> is an executing instance with an address space and OS-managed resources. Two processes can run the same executable while keeping separate virtual memory, open-file state, credentials, and execution context. Shared resources such as files or shared-memory regions are explicit relationships, not evidence that the processes are one.</P>
        <P>A simplified process address space contains executable code, global data, a heap for dynamic allocations, and one or more stacks. The OS maps virtual addresses to physical memory as needed. Layout details vary with the architecture, loader, and runtime, and modern systems may randomize addresses.</P>
        <Table head={['Region','Typical contents','Lifetime intuition']} rows={[[ 'Text / code','Instructions and read-only constants','Loaded for the process image' ],[ 'Data','Initialized and zero-initialized globals','Process lifetime' ],[ 'Heap','Dynamic allocations','Managed by allocator / application' ],[ 'Stack','Call frames and local variables per thread','Grows and shrinks with calls' ]]} />
      </Part>
      <Part n={2} label="State and metadata" title="The Kernel Tracks More Than a PID">
        <P>A process commonly moves among <strong>new</strong>, <strong>ready/runnable</strong>, <strong>running</strong>, <strong>blocked/waiting</strong>, and <strong>terminated</strong> states. A timer interrupt can move a running task back to runnable; requesting disk input can block it; completion can make it runnable again. A process blocked on I/O is not using a CPU, even if it still exists.</P>
        <P>The textbook <strong>process control block (PCB)</strong> is a useful abstraction for kernel-maintained metadata: process identifier, state, saved execution context, scheduling information, memory mappings, open resources, and accounting/security data. Real kernels divide these fields among structures rather than using one universal PCB object. A thread has its own execution context and stack while sharing selected process resources.</P>
        <Code lang="bash" code={`# Inspect process IDs, states, and parent-child relationships
ps -eo pid,ppid,stat,comm --sort=pid | head -n 15

# Interactive views; press q to leave
top`} />
        <Callout type="info">A PID is an identifier, not the process itself. It can be reused after a process exits, so robust monitoring tools also consider lifetime and other identity information.</Callout>
      </Part>
      <Part n={3} label="Create and replace" title="fork Creates; exec Replaces the Program Image">
        <P>On POSIX systems, <code>fork()</code> creates a child process that begins as a near-copy of the parent process state. Implementations commonly use copy-on-write mappings: parent and child initially share physical pages until a write requires separation. The child can then call an <code>exec</code> family function to replace its current program image with another executable. <code>fork</code> and <code>exec</code> are distinct operations.</P>
        <Code file="fork_exec.c" lang="c" code={`#include <sys/types.h>
#include <sys/wait.h>
#include <unistd.h>
#include <stdio.h>
#include <stdlib.h>

int main(void) {
    pid_t pid = fork();
    if (pid < 0) { perror("fork"); return 1; }
    if (pid == 0) {
        execlp("echo", "echo", "child program", (char *)NULL);
        perror("execlp");
        _exit(127);
    }
    int status;
    if (waitpid(pid, &status, 0) < 0) { perror("waitpid"); return 1; }
    printf("child finished; exited=%d
", WIFEXITED(status));
    return 0;
}`} />
        <P>After a successful <code>exec</code>, the child no longer runs the old code. The parent waits and collects the child's status, avoiding an unreaped terminated child. Error paths matter: <code>exec</code> returns only when it fails.</P>
        <Callout type="warning">After <code>fork</code> in a multithreaded process, only the calling thread exists in the child. Until <code>exec</code>, use care with operations that may rely on locks held by vanished threads.</Callout>
      </Part>
      <Part n={4} label="Threads" title="Threads Share a Process, Not Every Bit of State">
        <P>Threads in a process usually share its address space and process resources such as open files, which makes communication cheap. Each thread has its own program counter, registers, scheduling state, and stack. Shared memory makes coordination fast but also creates data races if threads update shared state without synchronization.</P>
        <Table head={['Property','Separate processes','Threads in one process']} rows={[[ 'Address space','Normally isolated','Shared' ],[ 'Stack and registers','Private execution context','Private per thread' ],[ 'Communication','IPC mechanisms or explicit shared mapping','Shared variables plus synchronization' ],[ 'Failure isolation','Stronger boundary, not absolute','A bad pointer can damage the process' ]]} caption="These are common OS abstractions; implementation details vary." />
        <P>Concurrency means multiple tasks make progress during overlapping periods; parallelism means they execute simultaneously on multiple CPUs. A single CPU can interleave threads without running them at the same instant.</P>
      </Part>
      <Part n={5} label="Switching and IPC" title="Context Switching Has a Cost">
        <P>A context switch saves enough state for one task to resume later and restores another task's state. The kernel may switch on a timer, block, wakeup, or scheduling decision. Switching is useful overhead, not useful application work; caches and translation lookaside buffers can also be affected. A process switch may require different address-space mappings, while switching between threads of one process may preserve them.</P>
        <P>Processes communicate using pipes, sockets, signals, message queues, or shared memory. A pipe is a byte stream, not a message protocol; the application must define framing when needed. Shared memory avoids copying some data but needs synchronization and lifecycle management.</P>
        <Code file="pipe.c" lang="c" code={`#include <unistd.h>
#include <stdio.h>
#include <string.h>
#include <sys/wait.h>

int main(void) {
    int fd[2];
    if (pipe(fd) < 0) { perror("pipe"); return 1; }
    pid_t pid = fork();
    if (pid < 0) { perror("fork"); return 1; }
    if (pid == 0) {
        close(fd[1]);
        char message[32];
        ssize_t n = read(fd[0], message, sizeof message);
        if (n > 0) write(STDOUT_FILENO, message, (size_t)n);
        close(fd[0]);
        _exit(0);
    }
    close(fd[0]);
    const char message[] = "hello child\n";
    write(fd[1], message, strlen(message));
    close(fd[1]);
    waitpid(pid, NULL, 0);
    return 0;
}`} />
        <P>Closing unused pipe ends is essential: the reader sees end-of-file only when all write descriptors are closed. For production, handle partial reads and writes, interruptions, and every error path.</P>
        <P>Choose IPC based on the communication pattern. A pipe or socket is convenient for streams and preserves process address-space separation. A message queue keeps message boundaries. Shared memory can reduce copying for large data, but the application must design synchronization, ownership, and crash cleanup. Signals are better for small notifications than bulk payloads.</P>
        <Callout type="tip">Do not use a process merely because it sounds safer or a thread merely because it sounds faster. Include isolation needs, data sharing, failure containment, and measured overhead in the decision.</Callout>
        <Code lang="bash" code={`# Observe a process tree and voluntary / involuntary context switches
ps -eLf | head -n 20
/usr/bin/time -v sh -c 'printf "demo\n"' 2>&1 | grep -i context`} />
        <P>Timing output and field names vary by platform; tiny commands are dominated by noise. Measure a representative workload and avoid concluding that a context switch alone caused a performance problem.</P>
      </Part>
      <Part n={6} label="Python and Linux" title="A Small Process Observer">
        <P>Python's standard library exposes process creation and waiting on POSIX systems. The following parent starts a child command safely as an argument list. A production application should still set timeouts, validate inputs, and avoid constructing shell command strings from untrusted data.</P>
        <Code file="run_child.py" lang="python" code={`import subprocess

result = subprocess.run(
    ["python3", "-c", "print('child says hello')"],
    check=True,
    capture_output=True,
    text=True,
    timeout=10,
)
print("child output:", result.stdout.strip())
print("return code:", result.returncode)`} />
        <P>For a hands-on trace, run <code>strace -f</code> around a short program to follow child processes when supported. Compare what the parent requests with what appears in the process list. Do not treat a momentary listing as a complete history—short-lived tasks can exit between samples.</P>
        <Steps items={['Sketch a parent and child, marking which process image changes after exec.','Mark the state of a process waiting for a child and the event that wakes it.','Identify one shared resource between threads and write down the protection it needs.','Compare process isolation, IPC, and context-switch costs for a CPU-heavy and an I/O-heavy workload.']} />
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
      <KeyTakeaways items={["A process is an executing instance with an address space and OS-managed resources; a program is passive code.", "The PCB abstraction captures state and metadata needed to manage and resume execution.", "fork creates a child and exec replaces its program image; waiting collects child status.", "Threads share selected process resources but retain separate stacks and execution contexts.", "Context switches enable multiplexing but add overhead; IPC choice changes isolation and coordination costs."]} />

      <H3>Next</H3>
      <NextLesson href="/learn/operating-systems/cpu-scheduling" label="Lesson 03 · CPU Scheduling" text="With processes and runnable threads in view, next compare the policies that choose who gets CPU time." />
    </LearnLayout>
  )
}
