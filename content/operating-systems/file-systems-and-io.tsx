import { LearnLayout } from '@/components/content/LearnLayout'
import { Callout, Code, H3, KeyTakeaways, Mistakes, NextLesson, P, Part, Practice, Steps, Table } from '@/components/content/LessonKit'

export default function OperatingSystemsLesson6() {
  return (
    <LearnLayout title="File Systems and I/O" description="Files, directories, and inodes, allocation methods, journaling, buffering and caching, and disk scheduling." section="Operating Systems — Lesson 07" readTime="35 min">
      <Part n={1} label="Files and names" title="A Directory Name Is Not the File Itself">
        <P>A file system organizes persistent data into named objects and directories. A pathname is resolved component by component: directory entries connect names to filesystem objects. On Unix-like filesystems, an <strong>inode</strong> stores metadata such as ownership, permissions, timestamps, size, and references to data blocks; the filename-to-inode association lives in a directory entry. Hard links are additional names for an inode, while symbolic links store a path-like target.</P>
        <P>Directory trees are a naming convention over filesystem objects. Mounting attaches a filesystem at a directory in a larger namespace. Exact metadata and allocation details differ across filesystem types and operating systems.</P>
        <Table head={['Concept','Stores / represents','Important distinction']} rows={[[ 'Directory entry','Name and object reference','Name lookup, not file contents' ],[ 'Inode (Unix-like)','Metadata and data-block references','Usually not the filename itself' ],[ 'Hard link','Another name for the same inode','Same filesystem; links share contents' ],[ 'Symbolic link','A path target','Can cross filesystems; target can disappear' ]]} />
        <P>File allocation strategies describe how a filesystem lays out file blocks. <strong>Contiguous allocation</strong> stores a file in adjacent blocks, enabling simple sequential and direct access but making growth and external fragmentation challenging. <strong>Linked allocation</strong> chains blocks and grows easily, but random access may require following links. <strong>Indexed allocation</strong> keeps block pointers in an index structure, supporting direct lookup with metadata overhead. Modern filesystems often use extents, trees, and copy-on-write techniques rather than these textbook schemes in isolation.</P>
        <Table head={['Method','Strength','Limitation']} rows={[[ 'Contiguous','Fast sequential access and simple offsets','Growth can require relocation or larger extents' ],[ 'Linked','Easy to append blocks','Poor random access and pointer overhead' ],[ 'Indexed','Direct block lookup through index','Index metadata consumes space' ],[ 'Extent-based','Efficient runs of adjacent blocks','Fragmentation and metadata still need management' ]]} caption="Textbook allocation models explain trade-offs; real filesystem layouts are more sophisticated." />
        <Callout type="info">A file descriptor is a process-local handle returned by opening a file-like resource; it is not the inode number or pathname.</Callout>
      </Part>
      <Part n={2} label="File operations" title="Open, Read, Write, and Close">
        <P>Opening a path asks the OS to resolve names and check access rules. The process receives a descriptor referring to an open-file description, which tracks state such as the current offset and status flags. Descriptors may be inherited across process creation or deliberately duplicated. Several descriptors can refer to related open state, so sharing and offsets should be understood explicitly.</P>
        <Code file="copy_file.c" lang="c" code={`#include <fcntl.h>
#include <unistd.h>
#include <stdio.h>

int main(int argc, char **argv) {
    if (argc != 3) { fprintf(stderr, "usage: copy SRC DST\n"); return 2; }
    int in = open(argv[1], O_RDONLY);
    if (in < 0) { perror("open source"); return 1; }
    int out = open(argv[2], O_WRONLY | O_CREAT | O_TRUNC, 0644);
    if (out < 0) { perror("open destination"); close(in); return 1; }
    char buf[4096];
    ssize_t n;
    while ((n = read(in, buf, sizeof buf)) > 0) {
        ssize_t sent = 0;
        while (sent < n) {
            ssize_t w = write(out, buf + sent, (size_t)(n - sent));
            if (w <= 0) { perror("write"); close(in); close(out); return 1; }
            sent += w;
        }
    }
    if (n < 0) perror("read");
    close(in); close(out);
    return n < 0 ? 1 : 0;
}`} />
        <P>This example handles partial writes and common errors, but a production copy tool must also consider metadata, symlinks, permissions, interruption, durability requirements, and safely choosing a destination.</P>
      </Part>
      <Part n={3} label="Consistency" title="Journaling Helps Recover After a Crash">
        <P>Updating a file can require several metadata and data writes. A crash between those writes may leave an inconsistent filesystem. A <strong>journal</strong> records intended changes or transaction information so recovery can replay or roll back operations after a crash. Many journaling filesystems primarily journal metadata; journaling does not necessarily mean every recent user-data byte is durable.</P>
        <P>Buffered writes may first land in memory and reach storage later. APIs such as <code>fsync</code> request durability for file data and relevant metadata, but exact guarantees depend on filesystem, device, mount options, and correct ordering (including parent-directory updates for some rename/create patterns). Durability is a contract to verify for the platform, not something inferred from a successful buffered <code>write</code>.</P>
        <Callout type="warning">Journaling improves structural recovery; it is not a backup, version history, or protection against accidental deletion and every hardware failure.</Callout>
      </Part>
      <Part n={4} label="I/O path" title="Buffering and Caching Reduce Expensive Trips">
        <P><strong>Buffering</strong> groups small operations to reduce call or device overhead; <strong>caching</strong> retains data to serve future accesses faster. The page cache keeps file data in memory on many systems. A cache hit can make a read appear fast even though the same data would need device I/O after eviction or a cold start. A user-space stdio buffer is another layer and is distinct from the kernel page cache.</P>
        <P>Sequential access benefits from read-ahead; write-back can defer writes. These improve average performance but create flush and durability considerations. Applications should choose flush and sync behavior based on their correctness needs rather than calling expensive sync operations blindly for every byte.</P>
        <Code lang="bash" code={`# Inspect filesystem space and mounted filesystems
df -h
findmnt

# Inspect a file's inode and metadata on Linux
stat notes.txt
ls -li notes.txt

# Trace a short file operation when strace is available
strace -e trace=openat,read,write,close cat notes.txt`} />
      </Part>
      <Part n={5} label="Devices" title="DMA Lets Devices Move Data Efficiently">
        <P>For I/O, a device driver programs a controller and coordinates completion with the kernel. <strong>Direct Memory Access (DMA)</strong> allows a capable device to transfer data between a device and memory with less CPU copying for each byte. The CPU still configures and manages the operation; DMA does not mean the device can access arbitrary memory without controls. Interrupts or polling can notify the CPU when work completes.</P>
        <P>A typical buffered read goes from storage through a controller/DMA path into kernel-managed memory, then is copied or mapped for the application depending on the API and path. Real implementations include caches, mapping constraints, and zero-copy alternatives. The main lesson: application read/write calls describe intent, while driver and device details are handled below them.</P>
        <Table head={['Term','Purpose','Trade-off to remember']} rows={[[ 'Buffering','Combine or stage I/O','Data may not yet be durable' ],[ 'Page cache','Reuse recently read/written file data','Memory pressure and eviction affect latency' ],[ 'DMA','Transfer blocks with less per-byte CPU work','Still requires safe setup and completion handling' ],[ 'Interrupt','Notify CPU about device event','High rates can add overhead' ]]} />
        <Callout type="example">A dashboard reading a recently accessed configuration file may hit the page cache. A cold read may wait on storage. Measuring only the warm run overstates cold-start performance.</Callout>
        <P>For rotating disks, request ordering can affect seek distance. FCFS follows arrival order; shortest-seek-time-first chooses a nearby request but may starve distant requests; SCAN sweeps in one direction then reverses, while C-SCAN returns to one end before sweeping again. These textbook policies are less directly relevant to flash devices, but they teach how device geometry and fairness influence I/O scheduling.</P>
        <Table head={['Policy','Request choice','Trade-off']} rows={[[ 'FCFS','Arrival order','Fair order, potentially long movement' ],[ 'SSTF','Nearest pending track','Good local movement; starvation risk' ],[ 'SCAN','Sweep then reverse','More regular service across the disk' ],[ 'C-SCAN','One-direction sweep then wrap','More uniform waiting under the model' ]]} caption="Classic rotating-disk scheduling models; real device queues and SSDs change the costs." />
      </Part>
      <Part n={6} label="Operational practice" title="Measure the I/O Your Workload Actually Performs">
        <P>Linux exposes tools for observation, not perfect explanations. <code>iostat</code> (from the sysstat package where installed), <code>vmstat</code>, and process-level tools can help identify utilization, queueing, or memory effects. Avoid assuming that a high I/O count means a slow disk: small random reads, writeback, cache misses, and application serialization can all contribute.</P>
        <Code lang="python" file="safe_write.py" code={`from pathlib import Path

path = Path("result.txt")
with path.open("w", encoding="utf-8") as output:
    output.write("completed\n")
    output.flush()  # flush Python's user-space buffer to the OS
    # For durability-sensitive work, an OS-level sync request is also needed.`} />
        <P>Python's <code>flush()</code> drains its own buffer to the OS; it does not alone promise persistence on physical media. When durability matters, use the platform's sync interface and confirm the filesystem/device guarantees required by the application.</P>
        <Steps items={['Identify the API layer: language buffer, kernel, filesystem, or device.','Decide whether you need throughput, low latency, atomicity, or durability.','Trace or measure representative warm and cold workloads.','Document what the measurement tool observes and which layers it cannot see.']} />
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
      <KeyTakeaways items={["On Unix-like systems, directory entries map names to inode-like objects; the inode is not generally the filename.", "File descriptors are process-local handles to open-file state, not pathnames or inode numbers.", "Journaling can restore filesystem consistency but does not guarantee every recent data write is durable.", "Buffering, page caching, and DMA improve I/O efficiency at different layers and have distinct effects.", "Measure warm and cold workloads, and match sync behavior to explicit durability requirements."]} />

      <H3>Next</H3>
      <NextLesson
        href="/learn/operating-systems/disk-scheduling-raid-storage"
        label="Lesson 08 · Disk Scheduling, RAID and Storage Devices"
        text="HDDs versus SSDs, disk scheduling algorithms, RAID levels and their trade-offs, and how storage performance affects applications." />
    </LearnLayout>
  )
}
