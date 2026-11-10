import { LearnLayout } from '@/components/content/LearnLayout'
import { Callout, Code, H3, KeyTakeaways, Mistakes, NextLesson, P, Part, Practice, Steps, Table } from '@/components/content/LessonKit'

export default function OperatingSystemsLesson7() {
  return (
    <LearnLayout title="Operating Systems Interview Questions" description="The OS questions software engineering interviews ask most, with model answers and the follow-ups to expect." section="Operating Systems — Lesson 11" readTime="40 min">
      <Part n={1} label="How to answer" title="Define, Contrast, Then Give an Example">
        <P>Strong OS interview answers make assumptions explicit and distinguish similar concepts. Start with a short definition, contrast the nearest alternative, and illustrate with a state transition or workload. For numerical questions, show the formula and intermediate values rather than stating only a final number. The questions below are representative fundamentals for GATE and placement preparation, not a prediction of any specific interview.</P>
        <Callout type="tip">When asked a broad question, check whether the interviewer means theory, a particular OS interface, or practical Linux behavior. State which model you are using.</Callout>
      </Part>
      <Part n={2} label="Processes" title="Questions 1–5: Execution and Sharing">
        <P><strong>1. What is the difference between a program and a process?</strong> A program is passive code/data; a process is an executing instance with an address space, state, and OS-managed resources. Multiple processes can run the same executable independently.</P>
        <P><strong>2. What is a PCB?</strong> The process-control-block abstraction is kernel metadata needed to manage and resume a process: state, saved context, scheduling data, address-space information, and resource references. Implementations may spread it across structures.</P>
        <P><strong>3. What is the difference between a process and a thread?</strong> Processes typically have separate address spaces and stronger isolation. Threads share selected process resources and memory but have individual stacks, registers, and scheduling state. Shared state makes thread communication efficient but requires synchronization.</P>
        <P><strong>4. What do fork and exec do?</strong> On POSIX, fork creates a child with a copy-like view of the parent; copy-on-write can defer physical copying. Exec replaces the calling process's program image. A shell commonly forks and then execs a command.</P>
        <P><strong>5. What is a context switch?</strong> The OS saves enough execution state for one task to resume and restores another's. It enables multiplexing but consumes time and can disturb caches; it is not application progress itself.</P>
      </Part>
      <Part n={3} label="Scheduling" title="Questions 6–9: Policies and Metrics">
        <P><strong>6. Preemptive versus non-preemptive scheduling?</strong> A preemptive policy can take the CPU from a running task, often on a timer or higher-priority arrival. A non-preemptive task keeps it until it blocks or finishes. Preemption improves responsiveness but adds coordination and switching overhead.</P>
        <P><strong>7. Why can FCFS perform poorly for interactive work?</strong> A short job behind a long CPU burst waits—the convoy effect. FCFS is simple and fair by arrival order, but that is not the same as low response time.</P>
        <P><strong>8. What is the difference between SJF and SRTF?</strong> SJF selects the shortest next CPU burst without preemption; shortest-remaining-time-first can preempt when a job with less remaining time arrives. Exact burst knowledge is usually unavailable, so practical policies estimate behavior.</P>
        <P><strong>9. How do you calculate turnaround and waiting time?</strong> <code>TAT = completion − arrival</code>. If CPU burst is the only service and other wait is not counted, <code>WT = TAT − burst</code>. Response time is first CPU start minus arrival. Include the workload and assumptions in the answer.</P>
        <Table head={['Job','Arrival','Burst']} rows={[[ 'P1','0','4' ],[ 'P2','1','2' ],[ 'P3','2','1' ]]} caption="A small FCFS/SJF exercise; assume one CPU, zero switching cost, and ties by arrival." />
        <P>Under FCFS, chart <code>0 | P1 | 4 | P2 | 6 | P3 | 7</code>, so WT is 0, 3, 4 and average 7/3. Non-preemptive SJF has only P1 available at time 0; then P3, then P2: <code>0 | P1 | 4 | P3 | 5 | P2 | 7</code>, WT 0, 2, 4 and average 2. These values assume no preemption after P1 starts.</P>
      </Part>
      <Part n={4} label="Concurrency" title="Questions 10–13: Locks and Deadlocks">
        <P><strong>10. What is a race condition?</strong> A result depends on uncontrolled timing/interleaving of concurrent operations. Protect shared invariants with synchronization; sleeping or repeating the test does not make the code safe.</P>
        <P><strong>11. Mutex versus semaphore?</strong> A mutex represents exclusive ownership of a critical section. A semaphore represents a count of available permits or events; a counting semaphore is useful for a resource pool. The distinction matters for ownership and signaling semantics.</P>
        <Code file="mutex_answer.c" lang="c" code={`#include <pthread.h>
#include <stdio.h>

static pthread_mutex_t lock = PTHREAD_MUTEX_INITIALIZER;
static int completed = 0;

static void *work(void *unused) {
    (void)unused;
    pthread_mutex_lock(&lock);
    ++completed; /* protected invariant: count updates are serialized */
    pthread_mutex_unlock(&lock);
    return NULL;
}

int main(void) {
    pthread_t a, b;
    if (pthread_create(&a, NULL, work, NULL) != 0) return 1;
    if (pthread_create(&b, NULL, work, NULL) != 0) return 1;
    pthread_join(a, NULL);
    pthread_join(b, NULL);
    printf("completed=%d\n", completed);
    pthread_mutex_destroy(&lock);
    return 0;
}`} />
        <P>This is an interview-sized illustration; robust application code should join already-created threads and release resources on every error path.</P>
        <P><strong>12. Name the Coffman deadlock conditions.</strong> Mutual exclusion, hold-and-wait, no preemption, and circular wait. All four must hold in the classic model. Prevention breaks at least one; a global lock order, for example, prevents circular wait if obeyed consistently.</P>
        <P><strong>13. Deadlock, starvation, and livelock?</strong> Deadlock is a circular wait with no progress; starvation is indefinite postponement while other work may proceed; livelock is activity without useful progress. Solutions differ: a timeout can reveal a wait but does not itself make recovery safe.</P>
        <Callout type="example">If A holds L1 and waits for L2 while B holds L2 and waits for L1, draw A → B → A. Then identify the lock-order rule that removes the cycle.</Callout>
      </Part>
      <Part n={5} label="Memory" title="Questions 14–16: Paging and Faults">
        <P><strong>14. What does the MMU do?</strong> It translates virtual addresses and checks permissions using OS-managed mappings, often accelerated by a TLB. It is hardware that participates in memory protection and translation.</P>
        <P><strong>15. What is a page fault?</strong> An exception on an access needing OS handling, such as a legal page not currently resident, copy-on-write, or an invalid/protected access. The OS may resolve it and resume, or report a failure. Not every page fault means a crash.</P>
        <P><strong>16. Compare FIFO, LRU, and Optimal replacement.</strong> FIFO evicts the earliest-loaded page; LRU evicts the least recently used; Optimal evicts the page used farthest in the future and is therefore an offline benchmark. On reference string <code>1,2,3,1,4,2,5,1,2,3,4,5</code> with three empty frames, counts are FIFO=10, LRU=10, Optimal=7. A page-fault count depends on frame count and initial assumptions.</P>
        <Code file="faults.py" lang="python" code={`def lru_faults(references, capacity):
    frames = []
    faults = 0
    for page in references:
        if page in frames:
            frames.remove(page)  # move recently used page to the newest end
            frames.append(page)
        else:
            faults += 1
            if len(frames) == capacity:
                frames.pop(0)
            frames.append(page)
    return faults

refs = [1, 2, 3, 1, 4, 2, 5, 1, 2, 3, 4, 5]
print(lru_faults(refs, 3))`} />
      </Part>
      <Part n={6} label="Storage and practice" title="Questions 17–18: Files, Durability, and Follow-Ups">
        <P><strong>17. What is an inode?</strong> In Unix-like filesystems, it is metadata and data-block reference information for a filesystem object. Directory entries associate names with objects; a filename is not usually stored as the inode's defining identity.</P>
        <P><strong>18. What is journaling, and does it guarantee durability?</strong> Journaling records filesystem changes to help recover a consistent structure after a crash. It does not necessarily journal all file data or guarantee that every successful buffered write is on persistent media. Durability requires the right sync/ordering contract for the filesystem and device.</P>
        <P><strong>Likely follow-ups:</strong> What assumptions did you make about arrivals or frame count? How do you avoid starvation? What happens on a spurious wakeup? How would you measure page faults? Which layer buffers the write? Give a counterexample to a claim that sounds universal.</P>
        <Code lang="bash" code={`# Quick practical review on Linux
ps -eo pid,ppid,stat,comm | head
free -h
vmstat 1 3
stat .`} />
        <P>These commands complement theory but do not expose every internal policy. In an interview, explain which measurement you would collect next and why.</P>
        <Steps items={['Define the OS abstraction precisely.','State assumptions and draw a small example or calculation.','Compare with the closest related concept.','Mention one trade-off, failure mode, or platform caveat.']} />
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
      <KeyTakeaways items={["Interview answers are strongest when they define, contrast, state assumptions, and give a concrete example.", "Processes isolate address spaces; threads share selected resources and need synchronization around shared state.", "Scheduling metrics must be calculated from an explicit arrival/burst trace and policy assumptions.", "Mutexes, semaphores, and deadlock conditions describe different coordination concerns.", "Page faults can be recoverable; replacement counts depend on the reference string and frame assumptions.", "Filesystem journaling supports recovery but does not automatically guarantee application-data durability."]} />

      <H3>Next</H3>
      <NextLesson href="/learn/dsa" label="Next course · Data Structures &amp; Algorithms" text="You have completed Operating Systems. Continue with data structures and algorithms to strengthen your problem-solving foundations." />
    </LearnLayout>
  )
}
