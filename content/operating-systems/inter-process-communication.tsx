import { LearnLayout } from '@/components/content/LearnLayout'
import { Bullets, Callout, Code, H3, KeyTakeaways, Mistakes, NextLesson, P, Part, Practice, Steps, Table } from '@/components/content/LessonKit'

export default function InterProcessCommunication() {
  return (
    <LearnLayout
      title="Inter-Process Communication — Pipes, Signals and Shared Memory"
      description="How processes talk: pipes, signals, message queues, shared memory and sockets, with working examples and their trade-offs."
      section="Operating Systems — Lesson 03"
      readTime="35 min"
    >
      <Part n={1} label="Why processes communicate" title="Separate Processes Still Need to Cooperate">
        <P>
          A process has its own virtual address space. That isolation is useful: one program cannot casually overwrite another
          program&apos;s variables. But real systems are made of cooperating processes. A shell connects commands, a browser
          separates tabs and services, and a delivery platform moves an order from its API process to a worker. They need a
          deliberate communication channel called <strong>inter-process communication (IPC)</strong>.
        </P>
        <P>
          Pick a mechanism by asking what data must move, whether the sender and receiver run on one machine, how much data
          there is, and what should happen when either side is slow or exits. A signal is a small notification, not a way to
          transfer a document. Shared memory can move large amounts quickly, but requires synchronisation. A socket can connect
          processes on the same host or across a network, but has a protocol and failure handling to design.
        </P>
        <Table
          head={['Mechanism', 'Data shape', 'Typical use', 'Main responsibility']}
          rows={[
            ['Anonymous pipe', 'Ordered byte stream', 'Parent and child; shell pipeline', 'Agree on framing and close unused ends'],
            ['Named pipe (FIFO)', 'Ordered byte stream', 'Unrelated local processes', 'Coordinate creation, readers, and writers'],
            ['Signal', 'Small event plus optional value', 'Notify stop, reload, or child exit', 'Handle interruption and safe cleanup'],
            ['Message queue', 'Discrete messages', 'Local worker coordination', 'Choose limits, ordering, and delivery policy'],
            ['Shared memory', 'Common memory region', 'High-volume local data', 'Protect concurrent access and lifecycle'],
            ['Socket', 'Stream or datagrams', 'Local services or network clients', 'Define protocol, timeouts, and authentication'],
          ]}
        />
        <Callout type="info">
          A pipe and a TCP connection both look like byte streams to application code. Neither preserves your message boundaries:
          if one side writes two records, the receiver still needs a delimiter or a length prefix to tell where each record ends.
        </Callout>
      </Part>

      <Part n={2} label="Anonymous pipes" title="Connect a Producer to a Consumer">
        <P>
          An anonymous pipe is a kernel-managed, one-way byte stream. A process creates it before starting a child, then the
          child inherits the open file descriptors. The parent can connect one command&apos;s output to another command&apos;s
          input, which is exactly what a shell does for <code>producer | consumer</code>. A pipe has finite buffering: if the
          consumer is slower, the producer eventually blocks instead of consuming unlimited memory.
        </P>
        <Code lang="bash" file="pipeline.sh" code={`
# Count successful payment records without saving the whole file in memory.
grep ',SUCCESS,' payments.csv | wc -l

# The pipe carries grep's output to wc; each program has one focused job.
`} />
        <P>
          This small C program shows the system-call shape. The parent writes a short message and the child reads until end of
          file. Compile on a POSIX system with <code>cc pipe_demo.c -o pipe_demo</code>, then run <code>./pipe_demo</code>.
          Closing the unused ends matters: the reader sees end-of-file only when every write end has been closed.
        </P>
        <Code lang="c" file="pipe_demo.c" code={`
#include <stdio.h>
#include <stdlib.h>
#include <sys/types.h>
#include <sys/wait.h>
#include <unistd.h>

int main(void) {
    int channel[2];
    if (pipe(channel) == -1) {
        perror("pipe");
        return 1;
    }

    pid_t child = fork();
    if (child == -1) {
        perror("fork");
        close(channel[0]);
        close(channel[1]);
        return 1;
    }

    if (child == 0) {
        close(channel[1]);
        char buffer[128];
        ssize_t count;
        while ((count = read(channel[0], buffer, sizeof buffer)) > 0) {
            if (write(STDOUT_FILENO, buffer, (size_t)count) == -1) {
                perror("write to stdout");
                close(channel[0]);
                return 1;
            }
        }
        close(channel[0]);
        return count == -1 ? 1 : 0;
    }

    close(channel[0]);
    const char message[] = "Order accepted by the parent process.\\n";
    if (write(channel[1], message, sizeof message - 1) == -1) {
        perror("write to pipe");
        close(channel[1]);
        waitpid(child, NULL, 0);
        return 1;
    }
    close(channel[1]);
    if (waitpid(child, NULL, 0) == -1) {
        perror("waitpid");
        return 1;
    }
    return 0;
}
`} />
        <Callout type="tip">
          Always check read and write return values. Reads may return fewer bytes than requested, and writes can fail; robust
          stream code loops until it has sent or received a complete application-level record.
        </Callout>
      </Part>

      <Part n={3} label="Named pipes" title="Use a FIFO When Processes Do Not Share a Parent">
        <P>
          A FIFO is a named pipe represented in the filesystem. Two unrelated local processes can open the same path and
          exchange bytes without a network service. The name is a rendezvous point, not a file that stores a durable history.
          A writer may wait until a reader opens the FIFO, so production code needs a clear startup and shutdown arrangement.
        </P>
        <Code lang="bash" file="fifo_demo.sh" code={`
# Terminal 1: create a FIFO once, then wait for a producer.
mkfifo order-events.fifo
cat order-events.fifo

# Terminal 2: write one line. The reader receives it, then exits.
printf '%s\\n' 'order=734 status=packed' > order-events.fifo

# Remove the rendezvous point when finished.
rm order-events.fifo
`} />
        <P>
          FIFO permissions are ordinary filesystem permissions, but they do not define a rich message format. If the receiver
          must survive restarts, track acknowledgements, or process messages from many producers, use a queue or a service
          backed by durable storage rather than treating a FIFO as a database.
        </P>
      </Part>

      <Part n={4} label="Signals and queues" title="Notifications Are Not Payloads">
        <P>
          A signal tells a process that an event occurred: a terminal requested interruption, a child exited, or an operator
          asked a service to reload configuration. Standard signals are notifications, not a reliable event log; repeated
          occurrences may be coalesced. Keep a handler short and defer complex work to the main loop. Do not assume a handler
          can safely call every library function.
        </P>
        <Code lang="c" file="signal_note.c" code={`
#include <signal.h>
#include <stdio.h>
#include <unistd.h>

static volatile sig_atomic_t reload_requested = 0;

static void on_hangup(int signal_number) {
    (void)signal_number;
    reload_requested = 1;
}

int main(void) {
    struct sigaction action = {0};
    action.sa_handler = on_hangup;
    sigemptyset(&action.sa_mask);
    if (sigaction(SIGHUP, &action, NULL) == -1) {
        perror("sigaction");
        return 1;
    }

    while (1) {
        if (reload_requested) {
            reload_requested = 0;
            puts("Reload configuration in the normal control flow.");
        }
        sleep(1);
    }
}
`} />
        <P>
          Message queues preserve discrete messages and can carry structured payloads. They are a better conceptual fit for
          &quot;order 734 is ready&quot; than a signal. Decide whether messages may be lost, duplicated, reordered, or delayed, and
          make consumers idempotent when retries are possible. Queue capacity is finite too; a producer needs backpressure or
          a failure policy when the queue is full.
        </P>
        <Callout type="warning">
          A signal handler should not print logs, allocate memory, or take an ordinary mutex. Set a safe flag or use a platform
          event mechanism, then do the actual work outside the handler.
        </Callout>
      </Part>

      <Part n={5} label="Shared memory" title="Fast Data Sharing Needs Explicit Coordination">
        <P>
          Shared memory maps the same physical pages into multiple processes. After setup, exchanging a large local data set
          can avoid repeatedly copying it through a kernel-mediated message channel. But shared bytes do not make a safe
          protocol: two writers can race, one process can read a half-updated record, and a crashed writer can leave a lock
          held. Pair the memory region with a process-shared mutex, semaphore, or a carefully designed atomic protocol.
        </P>
        <Steps items={[
          'Create or obtain a shared region and agree on its size and layout.',
          'Define who owns each field and how readers know a record is complete.',
          'Use process-shared synchronisation; a normal process-private mutex is not enough.',
          'Define startup, versioning, crash recovery, and who removes the region.',
          'Measure before choosing shared memory: its coordination cost can exceed the copy you hoped to avoid.',
        ]} />
        <P>
          For a modest telemetry payload, start with a socket or queue. Choose shared memory when profiling shows that copying
          is a real bottleneck and you can explain the synchronisation invariants on a whiteboard and in tests.
        </P>
      </Part>

      <Part n={6} label="Sockets" title="Use a Local Socket or a Network Protocol">
        <P>
          A Unix domain socket connects processes on one host and can use filesystem permissions as one part of access
          control. TCP sockets can cross machine boundaries and support the same client-server structure. In both cases, the
          application must define framing, error handling, and authentication as appropriate. A successful connection only
          means the transport connected; it does not mean a business operation succeeded.
        </P>
        <Code lang="python" file="local_socket_pair.py" code={`
import socket

# socketpair gives two connected local stream endpoints for a small demo.
left, right = socket.socketpair()
try:
    left.sendall(b"order=734\\n")
    received = right.recv(128)
    print(received.decode("utf-8").strip())
finally:
    left.close()
    right.close()
`} />
        <P>
          A stream socket may deliver part of a message in one read or several messages together in one read. This demo sends
          a small line and reads once; a real protocol should use newline-delimited records with limits, or a length prefix
          and a loop that reads the full record. Set timeouts and bound input before parsing it.
        </P>
      </Part>

      <Part n={7} label="Production choices" title="Make the Contract Clear at Both Ends">
        <Table
          head={['Question', 'Why it matters', 'A practical design choice']}
          rows={[
            ['Who owns the channel?', 'Orphaned ends can prevent EOF or keep resources alive.', 'Document which process creates, closes, and removes it.'],
            ['What is one message?', 'Byte streams do not preserve application records.', 'Specify delimiter or length prefix and maximum size.'],
            ['What if the receiver is slow?', 'Kernel buffers and queues have limits.', 'Apply backpressure, bounded queues, or a clear reject policy.'],
            ['Can delivery repeat?', 'Retries after uncertain outcomes may duplicate work.', 'Give operations an idempotency key and track completion.'],
            ['Can data leave the host?', 'Network IPC crosses a trust boundary.', 'Authenticate peers, validate input, and protect sensitive data.'],
          ]}
        />
        <P>
          For a UPI reconciliation service, the API process can publish a compact event while a worker validates and stores it.
          Include a stable transaction reference, schema version, and timestamp. The worker should tolerate retrying the same
          event, report failures, and avoid logging full payment credentials. These are application-level responsibilities;
          picking a pipe or socket does not solve them automatically.
        </P>
      </Part>

      <Part n={8} label="Pitfalls" title="Common IPC Mistakes">
        <Mistakes items={[
          { mistake: 'Assuming one read returns one whole message', cause: 'Pipes and stream sockets transfer bytes, not records.', fix: 'Add framing and loop until a complete bounded message arrives.' },
          { mistake: 'Leaving an unused pipe end open', cause: 'The reader never observes EOF while a writer descriptor remains open.', fix: 'Close every descriptor not used by that process, including inherited copies.' },
          { mistake: 'Using a signal to carry an event history', cause: 'Signals can be coalesced and carry little payload.', fix: 'Use a queue or durable event store when every event must be processed.' },
          { mistake: 'Choosing shared memory only because it is fast', cause: 'Unsynchronised shared state introduces races and recovery problems.', fix: 'Benchmark first, then specify locking, ownership, and crash recovery.' },
        ]} />
      </Part>

      <Part n={9} label="Practice" title="Choose and Test an IPC Channel">
        <Practice
          title="Design IPC for a campus order-processing service"
          tasks={[
            'Run the pipe example and explain why closing the parent write end lets the child finish.',
            'Use a shell pipeline to count failed delivery records without loading the complete file into memory.',
            'Compare a FIFO, shared memory, and a Unix domain socket for two local services sending small status updates.',
            'Define a newline-delimited message format with a maximum record size and an idempotency key.',
            'Simulate a slow consumer: decide whether the producer blocks, buffers a bounded number of records, or rejects work.',
          ]}
          hint="State the delivery guarantee and what happens on process restart before choosing a mechanism."
        />
      </Part>

      <KeyTakeaways items={[
        'IPC deliberately shares data or events between otherwise isolated processes.',
        'Pipes, FIFOs, and stream sockets carry bytes; your protocol must define message boundaries.',
        'Signals are useful for notifications but are not a durable event queue.',
        'Shared memory can reduce copying, but requires explicit synchronisation and lifecycle management.',
        'Every IPC design needs a policy for slow consumers, process failure, retries, and resource cleanup.',
        'Use local sockets or a network protocol when client-server communication needs a clear boundary.',
      ]} />

      <Bullets items={[
        <span key="ref">For system-call details, consult the POSIX and Linux manual pages for <code>pipe</code>, <code>sigaction</code>, <code>shm_open</code>, and <code>socket</code>.</span>,
      ]} />

      <H3>Next</H3>
      <NextLesson
        href="/learn/operating-systems/cpu-scheduling"
        label="Lesson 04 · CPU Scheduling"
        text="Now that you know how processes exchange work, learn how the OS decides which runnable process gets the CPU next."
      />
    </LearnLayout>
  )
}
