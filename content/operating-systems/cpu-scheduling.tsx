import { LearnLayout } from '@/components/content/LearnLayout'
import { Callout, Code, H3, KeyTakeaways, Mistakes, NextLesson, P, Part, Practice, Steps, Table } from '@/components/content/LessonKit'

export default function OperatingSystemsLesson3() {
  return (
    <LearnLayout title="CPU Scheduling" description="FCFS, SJF, round robin, priority, and multilevel feedback queues, with worked Gantt charts and the metrics interviewers ask about." section="Operating Systems — Lesson 04" readTime="35 min">
      <Part n={1} label="The decision" title="Which Runnable Task Runs Next?">
        <P>The CPU scheduler chooses a runnable task when a CPU becomes available. It does not choose blocked tasks: they must first become ready. Scheduling policy trades response time, throughput, fairness, and overhead. Preemptive policies can interrupt a running task; non-preemptive policies let it keep the CPU until it blocks or finishes.</P>
        <P>For hand calculations, use <strong>arrival time (AT)</strong>, <strong>burst time (BT)</strong>, <strong>completion time (CT)</strong>, <strong>turnaround time (TAT = CT − AT)</strong>, and <strong>waiting time (WT = TAT − BT)</strong> when a job's only non-CPU work is waiting in the ready queue. Response time is first CPU start minus arrival time. State assumptions—especially tie breaks and switch overhead—before drawing a chart.</P>
        <Callout type="tip">A Gantt chart shows CPU ownership over time. Waiting time is not necessarily one continuous interval; add all time spent ready but not running.</Callout>
      </Part>
      <Part n={2} label="FCFS and SJF" title="Simple Policies Have Predictable Trade-offs">
        <P><strong>First-Come, First-Served (FCFS)</strong> runs jobs in arrival order, generally without preemption. It is easy to implement but can suffer the convoy effect: a long CPU burst delays many short jobs. <strong>Shortest Job First (SJF)</strong> chooses the shortest next CPU burst; its preemptive form is shortest-remaining-time-first. If all jobs are available together and burst lengths are known, SJF minimizes average waiting for that workload. With staggered arrivals, it only chooses among jobs currently available; exact future bursts are not generally known, and long jobs can starve.</P>
        <Table head={['Job','Arrival','CPU burst']} rows={[[ 'A','0','5' ],[ 'B','1','3' ],[ 'C','2','1' ]]} caption="For the first chart, compare FCFS with non-preemptive SJF; ties use arrival order." />
        <P><strong>FCFS chart:</strong> <code>0 | A | 5 | B | 8 | C | 9</code>. Waiting times are A=0, B=4, C=6; average WT = 10/3. <strong>Non-preemptive SJF:</strong> at time 0 only A has arrived, so A runs first; afterward C is shortest, then B: <code>0 | A | 5 | C | 6 | B | 9</code>. WT values are A=0, C=3, B=5; average WT = 8/3. SJF cannot retroactively choose a job that had not arrived.</P>
        <Callout type="example">The same workload has different average waiting under different policies. Report the workload and assumptions with every comparison, not just the policy name.</Callout>
      </Part>
      <Part n={3} label="Round robin" title="A Time Quantum Improves Interactive Response">
        <P><strong>Round Robin (RR)</strong> gives each ready task a time quantum, then moves an unfinished task to the back of the ready queue. It is preemptive and often improves first response for interactive work. A very large quantum approaches FCFS; a very small quantum creates frequent switching overhead. A real system must balance responsiveness with useful CPU time.</P>
        <P>Use A=5, B=3, C=1, all arriving at time 0, quantum=2, with queue order A-B-C. The worked chart is <code>0 | A | 2 | B | 4 | C | 5 | A | 7 | B | 8 | A | 9</code>. Completion times are A=9, B=8, C=5. Since all arrive at 0, turnaround equals completion; waiting = turnaround − burst gives A=4, B=5, C=4 and average WT = 13/3. No context-switch cost is included.</P>
        <Code file="round_robin.py" lang="python" code={`from collections import deque

bursts = {"A": 5, "B": 3, "C": 1}
quantum = 2
ready = deque(bursts)
time = 0
chart = []
remaining = bursts.copy()
while ready:
    job = ready.popleft()
    run = min(quantum, remaining[job])
    chart.append((time, job, time + run))
    time += run
    remaining[job] -= run
    if remaining[job]:
        ready.append(job)
print(chart)`} />
      </Part>
      <Part n={4} label="Priority and MLFQ" title="Priority Policies Need Starvation Protection">
        <P><strong>Priority scheduling</strong> chooses the highest-priority ready job and may be preemptive or non-preemptive. A steady stream of high-priority work can starve low-priority tasks. <strong>Aging</strong> gradually raises the priority of tasks that have waited a long time. Always say whether a smaller number means higher priority and how ties are broken.</P>
        <P><strong>Multilevel Feedback Queue (MLFQ)</strong> uses multiple queues with different priorities and time quanta. New tasks may start near the top; CPU-heavy tasks can move down, while interactive or I/O-bound tasks that yield promptly can remain responsive. Periodic priority boosts help prevent starvation. MLFQ is an adaptable policy family, not a single universal parameter set.</P>
        <P>These compact charts provide worked examples for all five policies. For RR, assume A=5, B=3, C=1 all arrive at 0 and quantum=2. For priority, assume all arrive at 0, A=4 at priority 2, B=3 at priority 1, C=2 at priority 3, lower number wins, and scheduling is non-preemptive. For MLFQ, use the same A/B/C bursts, all entering Q0; Q0 quantum=2, Q1 quantum=4, and unfinished tasks demote once. All charts omit switching overhead.</P>
        <Table head={['Policy and assumptions','Worked Gantt chart','Check']} rows={[
          ['FCFS: A=5@0, B=3@1, C=1@2','0 | A | 5 | B | 8 | C | 9','WT A=0, B=4, C=6'],
          ['SJF: same arrivals; non-preemptive','0 | A | 5 | C | 6 | B | 9','WT A=0, C=3, B=5'],
          ['RR: A=5, B=3, C=1 all @0; q=2','0 | A | 2 | B | 4 | C | 5 | A | 7 | B | 8 | A | 9','WT A=4, B=5, C=4'],
          ['Priority: A=4/p2, B=3/p1, C=2/p3 all @0','0 | B | 3 | A | 7 | C | 9','Higher priority = lower number'],
          ['MLFQ: A=5, B=3, C=1 all @0; Q0=2, Q1=4','0 | A | 2 | B | 4 | C | 5 | A | 8 | B | 9','Unfinished jobs demote to Q1'],
        ]} caption="Arrival/burst notation is job=burst@arrival; priority is shown as pN. Charts list task and end time." />
        <Table head={['Policy','Selection idea','Main risk / response']} rows={[[ 'Priority','Highest priority first','Starvation; aging can help' ],[ 'MLFQ','Feedback from observed behavior','Tuning complexity; periodic boosts' ],[ 'RR','Rotate after a time quantum','Switch overhead if quantum is too small' ],[ 'SJF','Shortest predicted burst','Needs estimates; long jobs may wait' ]]} />
      </Part>
      <Part n={5} label="Fairness and Linux" title="Real Schedulers Track More Than a Queue">
        <P>Fairness asks whether tasks receive an appropriate share over time; it does not mean every task gets identical throughput or latency. Interactive workloads value prompt response, batch systems value throughput, and real-time systems have deadlines that general-purpose policies may not guarantee.</P>
        <P>Linux's normal scheduling has historically been associated with the <strong>Completely Fair Scheduler (CFS)</strong>, which models fair CPU sharing using virtual runtime. Linux scheduler internals continue to evolve; treat CFS as a conceptual reference, not a promise that every kernel version uses an unchanged implementation. Scheduling classes and priorities matter.</P>
        <P>For interview problems, clarify whether all jobs are present at time zero, whether priorities are preemptive, and whether a task that blocks re-enters at the front or back of a queue. With MLFQ, also state when a job is demoted: on quantum exhaustion, by accumulated CPU use, or another rule. These details can change the Gantt chart even though the policy has the same name.</P>
        <P>Latency is usually a distribution, not just an average. A system can have good mean response but poor tail latency for a low-priority or unlucky job. Production monitoring should therefore pair throughput with percentiles, starvation signals, and workload context.</P>
        <Code lang="bash" code={`# Observe runnable tasks and per-process CPU behavior
ps -eo pid,ni,stat,pcpu,comm --sort=-pcpu | head -n 12
top

# vmstat reports run queue and CPU statistics at intervals
vmstat 1 5`} />
        <P>Use a representative interval: a single sample is a snapshot, not a trend. Nice values influence scheduling priority for eligible tasks, but do not directly set an exact CPU percentage.</P>
      </Part>
      <Part n={6} label="Metrics" title="Measure the Goal, Not Just the Chart">
        <P>Calculate per-job metrics before averaging: mean can hide a badly delayed outlier, while median and tail response expose different user experiences. Include idle time if no task is ready. If switching cost is included, represent it explicitly as overhead; otherwise state that the chart assumes zero cost.</P>
        <Code file="metrics.py" lang="python" code={`jobs = {"A": (0, 5, 9), "B": (0, 3, 8), "C": (0, 1, 5)}
# values are arrival, burst, completion from the RR chart
for name, (arrival, burst, completion) in jobs.items():
    turnaround = completion - arrival
    waiting = turnaround - burst
    print(name, "TAT=", turnaround, "WT=", waiting)

print("average WT=", sum(c - a - b for a, b, c in jobs.values()) / len(jobs))`} />
        <Steps items={['Write the arrivals and bursts beside the chart.','Choose a policy, preemption rule, tie break, and quantum if applicable.','Advance time to the next completion, preemption, or arrival that changes the decision.','Calculate CT, TAT, WT, and response time for each job; check sums against the chart.']} />
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
      <KeyTakeaways items={["Scheduling selects among runnable tasks, and every comparison depends on explicit workload assumptions.", "FCFS is simple but can have a convoy effect; SJF can lower average waiting when burst lengths are known.", "Round robin trades interactive response against preemption and context-switch overhead.", "Priority and MLFQ need mechanisms such as aging or boosts to reduce starvation.", "Linux normal scheduling uses fair-sharing ideas associated with CFS, while implementation details evolve.", "Compute waiting, turnaround, and response per job before comparing averages."]} />

      <H3>Next</H3>
      <NextLesson
        href="/learn/operating-systems/concurrency-synchronization-deadlocks"
        label="Lesson 05 · Concurrency, Synchronisation and Deadlocks"
        text="Scheduling chooses who runs; next learn how concurrent tasks safely coordinate shared state." />
    </LearnLayout>
  )
}
