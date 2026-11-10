import { LearnLayout } from '@/components/content/LearnLayout'
import { Callout, Code, H3, KeyTakeaways, Mistakes, NextLesson, P, Part, Practice, Steps, Table } from '@/components/content/LessonKit'

export default function OperatingSystemsLesson5() {
  return (
    <LearnLayout title="Memory Management and Virtual Memory" description="Address spaces, paging, page tables and the TLB, page faults, replacement algorithms, and thrashing." section="Operating Systems — Lesson 05" readTime="45 min">
      <Part n={1} label="Address spaces" title="Each Process Sees a Virtual View of Memory">
        <P>A process uses <strong>virtual addresses</strong>, not raw physical RAM locations. The memory-management unit (MMU) and OS-managed page tables translate virtual addresses to physical frames and enforce access permissions. This abstraction allows processes to have isolated address spaces, simplifies allocation, and lets the OS move or share physical pages under controlled rules.</P>
        <P>With paging, virtual memory is divided into fixed-size <strong>pages</strong>, and physical memory into <strong>frames</strong>. A virtual address can be split into a virtual page number and an offset. Translation maps the page number to a frame while preserving the offset. Page size and address width are platform properties; avoid hard-coding them when writing portable software.</P>
        <Table head={['Term','Meaning','Role']} rows={[[ 'Virtual page','Fixed-size region in a process address space','Address-translation unit' ],[ 'Physical frame','Fixed-size region of physical memory','Where a resident page is stored' ],[ 'Page table','Mapping and permission metadata','Connects virtual pages to frames' ],[ 'Offset','Position within a page','Copied unchanged during translation' ]]} />
        <Callout type="info">A virtual address is not a promise that the page is currently resident in RAM. The mapping may be absent, protected, or backed by storage.</Callout>
      </Part>
      <Part n={2} label="Translation" title="The TLB Caches Recent Page Translations">
        <P>Walking page tables for every memory reference would be costly, so processors cache recent translations in a <strong>translation lookaside buffer (TLB)</strong>. A TLB hit provides a cached translation; a miss triggers a page-table walk (hardware-assisted on many systems) and may then fill the TLB. Address-space switches can affect translation caches; modern CPUs use techniques such as address-space identifiers, but exact behavior varies.</P>
        <P>A valid page-table entry can still point to a page that is not resident. An access then causes a <strong>page fault</strong>, a hardware exception that transfers control to the OS. The kernel checks whether the access is legal. It may load a page, create a zero-filled page, perform copy-on-write, or reject the access and deliver an error to the process.</P>
        <Callout type="warning">A page fault is not automatically a program bug. First access to a lazily allocated page or a demand-paged file can fault and then continue normally.</Callout>
      </Part>
      <Part n={3} label="Fault handling" title="A Fault Can Be Minor or Require Storage I/O">
        <P>On a legal nonresident access, the OS locates the backing data, finds a free frame or chooses a victim, writes a dirty victim back if needed, reads or constructs the requested page, updates mappings, and resumes the faulting instruction. If storage is needed, the task may block while the device works. An illegal address or permission violation can instead terminate the process or signal an error.</P>
        <Code lang="bash" code={`# Observe memory and paging counters over time
free -h
vmstat 1 5

# Per-process memory maps (Linux; permissions may restrict details)
cat /proc/self/maps | head -n 12`} />
        <P><code>free</code> and <code>vmstat</code> are snapshots or interval reports, not a direct count of one application's page faults. Linux often uses otherwise idle RAM for cache; low “free” memory alone does not prove memory pressure. Check trends, reclaim, swap, and workload symptoms together.</P>
      </Part>
      <Part n={4} label="Replacement" title="FIFO, LRU, and Optimal on the Same Reference String">
        <P>When no frame is free, a replacement policy chooses a victim. We will use three frames and the reference string <code>1, 2, 3, 1, 4, 2, 5, 1, 2, 3, 4, 5</code>. For FIFO, the oldest loaded page is evicted; hits do not change its age. For LRU, evict the page least recently used. Optimal evicts the page whose next use is farthest in the future; it is an offline benchmark because the future is not known to a live OS.</P>
        <Table head={['Reference','FIFO frames (F= fault, H=hit)','LRU frames (F= fault, H=hit)','Optimal frames (F= fault, H=hit)']} rows={[[ '1','1 — — F','1 — — F','1 — — F' ],[ '2','1 2 — F','1 2 — F','1 2 — F' ],[ '3','1 2 3 F','1 2 3 F','1 2 3 F' ],[ '1','1 2 3 H','1 2 3 H','1 2 3 H' ],[ '4','4 2 3 F','1 4 3 F','1 2 4 F' ],[ '2','4 2 3 H','1 4 2 F','1 2 4 H' ],[ '5','4 5 3 F','5 4 2 F','1 2 5 F' ],[ '1','4 5 1 F','5 1 2 F','1 2 5 H' ],[ '2','2 5 1 F','5 1 2 H','1 2 5 H' ],[ '3','2 3 1 F','3 1 2 F','3 2 5 F' ],[ '4','2 3 4 F','3 4 2 F','4 2 5 F' ],[ '5','5 3 4 F','3 4 5 F','4 2 5 H' ]]} caption="Three frames, initial state empty. Total faults: FIFO 10, LRU 10, Optimal 7; ties in Optimal may choose any equally valid victim." />
        <P>For example, after the first four references, the frames contain 1, 2, 3 and the next reference 4 faults. FIFO evicts 1, the earliest arrival. LRU evicts 2, whose last use was earlier than 3 (1 was just used). Optimal evicts 3 because its next use is later than the next uses of 1 and 2. At reference 7, both FIFO and LRU fault again; Optimal has 7 total faults across the full string.</P>
        <Callout type="example">FIFO can exhibit Belady's anomaly: increasing the number of frames can increase its faults for some reference strings. Stack algorithms such as LRU and Optimal do not have that property under the standard model.</Callout>
      </Part>
      <Part n={5} label="Working set" title="Thrashing Is a Working-Set Problem">
        <P><strong>Thrashing</strong> occurs when a system spends a disproportionate amount of time servicing page faults and moving pages rather than doing useful application work. It often happens when the active working sets of processes do not fit in available frames. Adding more runnable processes can then reduce overall throughput instead of increasing it.</P>
        <P>A <strong>working set</strong> is the pages a process has actively referenced over a recent window. If the total working sets of active processes exceed the frames available, pages evicted from one process may be needed again almost immediately. Fault frequency rises, useful CPU utilization falls, and a naive controller might mistakenly admit even more processes. Reducing concurrency or reclaiming a process's working set can restore progress.</P>
        <P>Locality explains why paging can work well despite an address space being larger than RAM: code tends to reuse nearby instructions and data for a period. A loop over contiguous array elements often has better locality than random pointer chasing across a huge structure. This is a software-level performance property interacting with the OS memory policy.</P>
        <P>OS strategies include reducing the degree of multiprogramming, allocating frames based on working-set or page-fault-frequency ideas, and improving locality. Applications help by processing data in a cache-friendly order and avoiding enormous random working sets. Swapping is not a free substitute for RAM: storage latency can make repeated faults expensive.</P>
        <Code file="address_parts.c" lang="c" code={`#include <stdint.h>
#include <stdio.h>
#include <unistd.h>

int main(void) {
    long page_size = sysconf(_SC_PAGESIZE);
    int value = 42;
    uintptr_t address = (uintptr_t)&value;
    if (page_size <= 0) return 1;
    printf("virtual address=%p page=%llu offset=%llu\n", (void *)&value,
           (unsigned long long)(address / (uintptr_t)page_size),
           (unsigned long long)(address % (uintptr_t)page_size));
    return 0;
}`} />
        <P>This prints the process's virtual address split into page number and offset for the running system's page size. It does not reveal the physical frame and the address can vary between runs.</P>
        <Code file="references.py" lang="python" code={`def fifo_faults(references, frame_count):
    frames = []
    next_victim = 0
    faults = 0
    for page in references:
        if page in frames:
            continue
        faults += 1
        if len(frames) < frame_count:
            frames.append(page)
        else:
            frames[next_victim] = page
            next_victim = (next_victim + 1) % frame_count
    return faults

refs = [1, 2, 3, 1, 4, 2, 5, 1, 2, 3, 4, 5]
print(fifo_faults(refs, 3))`} />
      </Part>
      <Part n={6} label="Reasoning" title="Check the Model Before Counting Faults">
        <P>Replacement exercises assume a fixed number of frames, an initially empty memory, and one page reference at a time. State whether writes make pages dirty if write-back cost matters; the basic fault-counting model ignores that cost. On real systems, file cache, shared pages, huge pages, prefetching, and working-set changes make raw comparisons more involved.</P>
        <Steps items={['Mark hit or fault for each reference.','On a fault, load into an empty frame before evicting.','For FIFO, advance queue order only on load; for LRU, update recency on every hit and fault.','For Optimal, inspect only future references and choose the farthest next use.','Recount totals and verify that each displayed frame contains the referenced page after the step.']} />
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
      <KeyTakeaways items={["Virtual addresses are translated through page tables; pages map to physical frames while preserving offsets.", "The TLB caches translations; a miss may need a page-table walk, while a nonresident access can fault.", "Page faults may be recoverable demand loads or illegal accesses; inspect the cause, not just the event name.", "For the given three-frame reference string, FIFO and LRU each fault 10 times and Optimal 7 times.", "Optimal is a future-aware benchmark; FIFO, LRU, and real policies have different costs and behaviors.", "Thrashing reflects working sets that overwhelm available memory and can make extra multiprogramming harmful."]} />

      <H3>Next</H3>
      <NextLesson href="/learn/operating-systems/file-systems-and-io" label="Lesson 06 · File Systems and I/O" text="After exploring memory that backs running processes, next see how persistent files and devices are organized." />
    </LearnLayout>
  )
}
