import { LearnLayout } from '@/components/content/LearnLayout'
import { Callout, Code, H3, KeyTakeaways, Mistakes, NextLesson, P, Part, Practice, Steps, Table } from '@/components/content/LessonKit'

export default function OperatingSystemsLesson4() {
  return (
    <LearnLayout title="Concurrency, Synchronisation and Deadlocks" description="Race conditions, critical sections, mutexes and semaphores, producer–consumer, and deadlock conditions, prevention, and detection." section="Operating Systems — Lesson 05" readTime="45 min">
      <Part n={1} label="Interleaving" title="Concurrency Makes Operation Order Observable">
        <P>Concurrent tasks can interleave instructions. The source expression <code>counter += 1</code> is conceptually a read, add, and write; two threads can both read 7, both calculate 8, and both store 8. One increment is lost. A <strong>race condition</strong> occurs when the result depends on timing or interleaving in a way the program has not safely controlled. A data race is a particular unsynchronized conflict over shared memory; language memory models can make its consequences more serious than just a lost update.</P>
        <P>A <strong>critical section</strong> accesses shared state. Correct synchronization aims for mutual exclusion where necessary, progress, and bounded waiting under stated assumptions. Protect the invariant, not merely one line that looks suspicious: all reads and writes that depend on the invariant need a consistent protocol.</P>
        <Callout type="warning">Adding a sleep is not synchronization. It changes timing and may hide a bug on one run while leaving the race intact.</Callout>
      </Part>
      <Part n={2} label="Mutexes" title="Use a Mutex to Protect an Invariant">
        <P>A mutex has ownership: one thread locks it, performs a short critical section, then unlocks it. Other threads wait until they can acquire it. Keep the protected work small, avoid I/O while holding a lock where practical, and use a consistent lock order when several mutexes are needed.</P>
        <Code file="counter.c" lang="c" code={`#include <pthread.h>
#include <stdio.h>
#include <stdlib.h>

enum { THREADS = 4, ITERATIONS = 100000 };
static long counter = 0;
static pthread_mutex_t lock = PTHREAD_MUTEX_INITIALIZER;

static void *increment(void *unused) {
    (void)unused;
    for (int i = 0; i < ITERATIONS; ++i) {
        pthread_mutex_lock(&lock);
        ++counter;
        pthread_mutex_unlock(&lock);
    }
    return NULL;
}

int main(void) {
    pthread_t threads[THREADS];
    for (int i = 0; i < THREADS; ++i)
        if (pthread_create(&threads[i], NULL, increment, NULL) != 0) return 1;
    for (int i = 0; i < THREADS; ++i)
        if (pthread_join(threads[i], NULL) != 0) return 1;
    printf("counter=%ld\n", counter);
    pthread_mutex_destroy(&lock);
    return 0;
}`} />
        <P>Compile on a POSIX platform with a C compiler and its pthread support, for example <code>cc counter.c -pthread -o counter</code>. Production code should also handle every lock and thread API error, including cleanup if thread creation fails partway through.</P>
      </Part>
      <Part n={3} label="Semaphores" title="A Semaphore Counts Available Permits">
        <P>A semaphore maintains a count. A wait operation consumes a permit or blocks; a post operation makes one available and may wake a waiter. A binary semaphore can coordinate access, but unlike a mutex it generally does not express ownership in the same way. Use a mutex for exclusive ownership of an invariant and a counting semaphore when the count itself models available resources or queued work.</P>
        <Table head={['Primitive','Models','Typical use']} rows={[[ 'Mutex','Exclusive ownership','Protect a shared data invariant' ],[ 'Counting semaphore','Number of available permits','Bounded resource pool or queued items' ],[ 'Condition variable','A predicate may have changed','Wait for state while releasing a mutex' ]]} />
        <Callout type="tip">With a condition variable, wait in a loop that checks the predicate while holding the mutex. A wakeup is a reason to check again, not proof the condition is true.</Callout>
      </Part>
      <Part n={4} label="Producer–consumer" title="Coordinate a Bounded Buffer">
        <P>For a buffer of capacity <code>N</code>, a producer must wait when it is full and a consumer when it is empty. A standard semaphore design starts with <code>empty=N</code>, <code>full=0</code>, and a mutex for the buffer indexes and contents. Producer order is wait(empty), lock, insert, unlock, post(full); consumer order is wait(full), lock, remove, unlock, post(empty). Reversing the permit logic can deadlock or corrupt the queue.</P>
        <Code lang="python" file="producer_consumer.py" code={`from queue import Queue
from threading import Thread

work = Queue(maxsize=3)

def produce():
    for item in range(5):
        work.put(item)       # blocks while the bounded queue is full
    work.put(None)           # sentinel ends the single consumer

def consume():
    while True:
        item = work.get()    # blocks while empty
        try:
            if item is None:
                return
            print("processed", item)
        finally:
            work.task_done()

producer = Thread(target=produce)
consumer = Thread(target=consume)
consumer.start()
producer.start()
producer.join()
consumer.join()`} />
        <P>Remove the accidental leading space before <code>def produce</code> when copying into a Python file. The standard <code>Queue</code> encapsulates synchronization; production pipelines also need shutdown, cancellation, error propagation, and a policy for overload.</P>
      </Part>
      <Part n={5} label="Deadlock" title="The Four Coffman Conditions">
        <P>A deadlock is a set of tasks permanently waiting for resources held by one another. The classic Coffman conditions are all necessary for a resource-allocation deadlock: <strong>mutual exclusion</strong> (a resource is non-shareable), <strong>hold and wait</strong> (a task holds one resource while waiting for another), <strong>no preemption</strong> (resources cannot be forcibly taken), and <strong>circular wait</strong> (a cycle of dependencies exists).</P>
        <P>Prevention breaks at least one necessary condition. Examples include imposing a global lock order to prevent cycles, requesting all needed resources before proceeding to avoid hold-and-wait, or making a resource shareable where the resource permits it. Each technique has costs: global ordering can constrain design, and preemption may be impossible for some resources.</P>
        <Callout type="example">Thread A owns lock L1 and waits for L2; thread B owns L2 and waits for L1. The wait-for graph contains A → B → A. A global order requiring L1 before L2 prevents this cycle if every path follows the rule.</Callout>
      </Part>
      <Part n={6} label="Avoidance and diagnosis" title="Banker's Algorithm and Practical Lock Design">
        <P><strong>Avoidance</strong> differs from prevention: a system examines a proposed allocation and grants it only if the resulting state is safe—there exists an order in which every process can finish with available resources plus resources released by earlier finishers. Banker's algorithm models maximum claims and is a classic teaching method. It requires known resource types and maximum demands, assumptions often unsuitable for general-purpose application locks.</P>
        <P>For one resource type, let <code>Available=3</code>; remaining <code>Need</code> be P0=4, P1=2, P2=3; and current <code>Allocation</code> be P0=2, P1=2, P2=3. P1 can finish with the available units and release its allocation of 2, so Work becomes 5. P2 can then finish and release 3, so Work becomes 8; P0 can finish afterward. Thus P1 → P2 → P0 is a safe sequence. A request larger than available is delayed; a request within available is still denied if tentatively granting it leaves no safe sequence. Real Banker examples track vectors for several resource types and compare each Need vector with the Work vector component by component.</P>
        <Table head={['Check','Question','Decision']} rows={[[ '1. Request bounds','Does request exceed declared remaining Need?','Reject an invalid claim' ],[ '2. Availability','Is request no greater than Available?','Otherwise the process waits' ],[ '3. Tentative allocation','Subtract from Available; add to Allocation; reduce Need','Do not commit yet' ],[ '4. Safety test','Can some unfinished process satisfy Need ≤ Work?','Pretend it finishes and returns its allocation' ],[ '5. Commit or roll back','Can all processes finish in some order?','Grant if safe; otherwise restore prior state' ]]} caption="Banker's safety check: the process order is a witness that resources can be returned without deadlock." />
        <P>Deadlock is not the same as starvation (a task keeps losing access) or livelock (tasks keep reacting but do not make useful progress). For application code, timeouts, lock-order discipline, narrow critical sections, and diagnostic stacks are practical defenses. A timeout detects a prolonged wait; it does not automatically make recovery safe.</P>
        <Code lang="bash" code={`# Find process/thread state and inspect a hang when permitted
ps -eLo pid,tid,stat,wchan:24,comm | head -n 25
top -H

# A debugger can show thread stacks for a process you own
# gdb -p <pid> then: thread apply all bt`} />
        <Steps items={['List each resource and its current owner.','Draw a wait-for edge from each waiting task to the task holding the resource.','Look for a cycle and verify the four Coffman assumptions.','Choose prevention, safe-state avoidance, timeout, or recovery based on the resource and failure model.']} />
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
      <KeyTakeaways items={["Concurrent execution permits interleavings; shared-state invariants need explicit synchronization.", "A mutex expresses ownership and mutual exclusion; semaphores model counted permits or queued work.", "Producer–consumer requires coordinated full/empty state and safe access to the buffer.", "Deadlock requires mutual exclusion, hold-and-wait, no preemption, and circular wait together.", "Prevention breaks a necessary condition; avoidance grants only allocations that preserve a safe state.", "Starvation and livelock are distinct progress failures, and a timeout is detection rather than automatic repair."]} />

      <H3>Next</H3>
      <NextLesson
        href="/learn/operating-systems/memory-management-virtual-memory"
        label="Lesson 06 · Memory Management and Virtual Memory"
        text="Once threads coordinate safely, see how the OS gives them isolated, efficient memory." />
    </LearnLayout>
  )
}
