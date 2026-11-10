import { LearnLayout } from '@/components/content/LearnLayout'
import { Bullets, Callout, Code, H3, KeyTakeaways, Mistakes, NextLesson, P, Part, Practice, Steps, Table } from '@/components/content/LessonKit'

export default function DiskSchedulingRaidStorage() {
  return (
    <LearnLayout
      title="Disk Scheduling, RAID and Storage Devices"
      description="HDDs versus SSDs, disk scheduling algorithms, RAID levels and their trade-offs, and how storage performance affects applications."
      section="Operating Systems — Lesson 08"
      readTime="35 min"
    >
      <Part n={1} label="Storage path" title="An I/O Request Has More Than One Cost">
        <P>
          An application asks the operating system to read or write data. The request travels through filesystem and block
          layers to a device, then the completion travels back. Its total latency can include queueing, device service,
          filesystem work, controller behaviour, and cache effects. A fast disk cannot compensate for a database issuing many
          tiny synchronous writes, and a benchmark in cache may not represent durable storage.
        </P>
        <P>
          Hard disk drives (HDDs) store data on rotating media and move a head to the requested track. Their mechanical
          positioning makes request order important. Solid-state drives (SSDs) use flash storage with no moving head, so seek
          distance does not have the same direct meaning. SSD controllers still manage queues, parallel flash channels,
          garbage collection, and wear; random access is not literally free.
        </P>
        <Table
          head={['Characteristic', 'HDD', 'SSD']}
          rows={[
            ['Mechanical movement', 'Head seek and rotational delay matter', 'No moving head'],
            ['Request ordering', 'Nearby requests can reduce head movement', 'Queue depth and controller scheduling matter; geometry is abstracted'],
            ['Small random reads', 'Often costlier than sequential access', 'Usually much more practical, but latency still varies'],
            ['Writes', 'Physical writes and cache policy matter', 'Flash erasure, write amplification, and endurance matter'],
            ['Failure planning', 'Mechanical and electronic failure possible', 'Controller, flash, firmware, or power failure possible'],
          ]}
        />
        <Callout type="info">
          The OS sees logical block addresses, not a transparent map of where bytes physically sit. SSD firmware and storage
          controllers can reorder or combine requests, so a textbook algorithm predicts a simplified device, not every modern
          drive&apos;s exact behaviour.
        </Callout>
      </Part>

      <Part n={2} label="HDD scheduling" title="Reduce Head Travel Without Starving Requests">
        <P>
          In a simplified HDD model, the head begins at one cylinder and serves pending requests. FCFS handles arrival order
          and is fair in that simple sense, but may move back and forth. SSTF selects the nearest pending cylinder and often
          reduces movement, but a request far away may wait a long time. SCAN sweeps in one direction, serving requests on the
          way, then reverses; C-SCAN serves in one direction and returns to the beginning without servicing on the return.
        </P>
        <Code lang="python" file="disk_head_movement.py" code={`
requests = [82, 170, 43, 140, 24, 16, 190]
start = 50


def total_movement(order, head):
    movement = 0
    for cylinder in order:
        movement += abs(cylinder - head)
        head = cylinder
    return movement


fcfs_order = requests
sstf_order = []
pending = requests.copy()
head = start
while pending:
    closest = min(pending, key=lambda cylinder: abs(cylinder - head))
    sstf_order.append(closest)
    pending.remove(closest)
    head = closest

print("FCFS order:", fcfs_order)
print("FCFS movement:", total_movement(fcfs_order, start))
print("SSTF order:", sstf_order)
print("SSTF movement:", total_movement(sstf_order, start))
`} />
        <P>
          Run the code to compare total cylinder movement for this one request set. That is a teaching metric, not a complete
          performance measurement: it excludes rotation, transfer size, queue wait, caching, and the possibility that another
          request arrives while the head is moving. Compare waiting time as well as total movement when evaluating fairness.
        </P>
        <Callout type="example">
          On a busy shared HDD, SSTF can keep choosing requests near the current head while a distant request waits. An elevator
          sweep gives requests a turn as the head crosses their position, trading some shortest-path efficiency for more
          predictable service.
        </Callout>
      </Part>

      <Part n={3} label="Compare policies" title="SCAN and C-SCAN as Elevator Policies">
        <P>
          Suppose a head is moving toward higher-numbered cylinders. SCAN serves requests ahead, reaches a chosen end of its
          sweep, then reverses. C-SCAN serves only while moving upward; after reaching the end it returns to the low end and
          begins another upward sweep. The return movement is counted as travel but does not serve requests. This tends to
          provide more uniform waiting across the address range in the simplified model.
        </P>
        <Steps items={[
          'Sort pending requests by cylinder number.',
          'Split them into requests at or above the current head and requests below it.',
          'For SCAN, service the upward group, then the downward group in reverse order.',
          'For C-SCAN, service the upward group, wrap to the low end, then service the lower group upward.',
          'Compare total travel and per-request wait; do not conclude from distance alone.',
        ]} />
        <P>
          Real systems may have several queues and device-specific scheduling. The scheduler may merge adjacent block requests,
          reorder for latency, or use priorities. Workload type matters: a sequential media scan, a database with many small
          random reads, and a laptop boot all create different request patterns.
        </P>
      </Part>

      <Part n={4} label="SSD considerations" title="No Seek Arm Does Not Mean No Scheduling">
        <P>
          SSDs do not expose cylinders to applications. Their firmware maps logical blocks to flash pages, writes new data to
          available locations, and later reclaims blocks. Updating a small logical region can involve a larger internal unit
          of work, known as write amplification. Garbage collection can compete with foreground requests, which is one reason
          latency can vary even when there is no mechanical seek.
        </P>
        <P>
          Host-side scheduling still matters for fairness, queueing, and I/O priorities. A device can process work in parallel,
          but excessive outstanding requests can increase tail latency and make one workload dominate another. A sequential
          access pattern may still help filesystems and applications, but the HDD rule &quot;minimise cylinder distance&quot; is
          not a useful direct model for SSDs.
        </P>
        <Table
          head={['Term', 'Meaning', 'Operational question']}
          rows={[
            ['IOPS', 'Completed I/O operations per second', 'What block size and read/write mix produced the figure?'],
            ['Throughput', 'Bytes transferred per unit time', 'Is the workload sequential or random?'],
            ['Latency', 'Time for an I/O request to complete', 'What are median and tail values under load?'],
            ['Queue depth', 'Outstanding requests waiting or in flight', 'Does more concurrency improve throughput or only increase wait?'],
            ['Durability', 'Whether acknowledged data survives failures', 'What cache, flush, and replication guarantees apply?'],
          ]}
        />
      </Part>

      <Part n={5} label="RAID basics" title="Redundancy, Performance and Capacity Trade Off">
        <P>
          RAID combines disks into a logical storage set. Striping distributes blocks across devices and can improve parallel
          throughput, but striping alone does not provide redundancy. Mirroring keeps copies on separate devices and can
          continue after a device failure, at the cost of capacity. Parity stores calculated redundancy that can reconstruct
          missing data within the scheme&apos;s fault tolerance. RAID is not a substitute for backups: it does not protect
          against deletion, ransomware, site loss, or every controller and operator error.
        </P>
        <Table
          head={['Layout', 'Idea', 'Capacity / failure trade-off']}
          rows={[
            ['RAID 0', 'Stripe blocks across devices', 'Uses combined capacity; a device failure can lose the array.'],
            ['RAID 1', 'Keep mirrored copies', 'Usable capacity is reduced; can tolerate a copy/device failure depending on layout.'],
            ['RAID 5', 'Striping with distributed parity', 'Parity overhead; can reconstruct one device failure, but rebuilds are a risk window.'],
            ['RAID 6', 'Striping with dual parity', 'More parity overhead; can reconstruct two device failures in the layout.'],
            ['RAID 10', 'Mirror pairs, then stripe', 'Combines parallelism and mirrors; capacity and tolerance depend on which devices fail.'],
          ]}
        />
        <Callout type="warning">
          A RAID label does not guarantee a particular controller, filesystem, write-cache policy, or safe failure mode. Verify
          the exact implementation and test recovery. Keep independent, tested backups with a separate failure domain.
        </Callout>
      </Part>

      <Part n={6} label="Parity intuition" title="How a Parity Stripe Reconstructs One Missing Block">
        <P>
          XOR parity illustrates the principle behind single-parity layouts. For three data bytes, parity is their bitwise XOR.
          If one byte is missing and the other data plus parity remain, XOR can recover it because a value XORed with itself
          cancels to zero. This toy program demonstrates the arithmetic only; real RAID must also manage block placement,
          failures, writes, metadata, and recovery safely.
        </P>
        <Code lang="python" file="xor_parity_demo.py" code={`
data = [0b1010, 0b1100, 0b0110]
parity = data[0] ^ data[1] ^ data[2]
print("data:", data)
print("parity:", parity)

missing_index = 1
survivors = [value for index, value in enumerate(data) if index != missing_index]
recovered = parity
for value in survivors:
    recovered ^= value
print("recovered block:", recovered)
print("matches original:", recovered == data[missing_index])
`} />
        <P>
          A real rebuild reads surviving blocks and computes missing data across the array. During rebuild, the remaining
          devices are under load and another failure may exceed the layout&apos;s tolerance. Monitor health, keep replacement
          procedures current, and regularly test restores from backups rather than treating a healthy RAID status as a backup.
        </P>
      </Part>

      <Part n={7} label="Observe I/O" title="Measure the Application Path, Not Just the Device">
        <P>
          Start from a user-visible symptom: a report takes too long, a checkout times out, or a batch misses its window.
          Record application latency and correlate it with queueing and storage metrics. On Linux, tools such as <code>iostat</code>
          can show device activity when installed; <code>lsblk</code> lists block devices. Tool output and available fields
          vary by platform, so check the local manual and avoid copying a command that silently changes a device.
        </P>
        <Code lang="bash" file="observe-storage.sh" code={`
# Read-only inventory and activity examples on Linux.
lsblk

# If sysstat is installed, inspect device metrics over a short interval.
iostat -xz 1 3

# Inspect filesystem capacity separately from device latency.
df -h
`} />
        <P>
          An online store can have a fast device but slow checkout because the application performs a synchronous write for
          every small update. A measurement should include realistic concurrency, request sizes, reads and writes, cache state,
          and the durability settings used in production. Do not run destructive benchmarks on a device with important data.
        </P>
      </Part>

      <Part n={8} label="Pitfalls" title="Common Storage Mistakes">
        <Mistakes items={[
          { mistake: 'Calling RAID a backup', cause: 'RAID helps with selected device failures but mirrors deletion and can share system-wide failures.', fix: 'Keep versioned, separate backups and test restoring them.' },
          { mistake: 'Using SSTF movement as a full performance result', cause: 'The model omits rotational delay, queueing, caching, and fairness.', fix: 'Treat it as a comparison exercise; measure real latency and wait time.' },
          { mistake: 'Assuming SSD latency is constant', cause: 'Queue depth, garbage collection, firmware, and workload can change response time.', fix: 'Measure tail latency under the actual read/write mix.' },
          { mistake: 'Comparing IOPS without workload details', cause: 'Block size, concurrency, caching, and durability alter the result.', fix: 'Record the workload and configuration alongside every benchmark.' },
        ]} />
      </Part>

      <Part n={9} label="Practice" title="Design Storage for a Small Order Service">
        <Practice
          title="Explain the device, scheduler, and recovery plan"
          tasks={[
            'Run the Python example with a different request list and compare FCFS with SSTF movement.',
            'Draw a SCAN service order for requests on both sides of the starting head position.',
            'For a photo archive, explain when sequential throughput matters more than small random-read latency.',
            'Compare RAID 1, RAID 5, and RAID 10 for capacity, failure tolerance, and rebuild risk without calling any of them a backup.',
            'Write a measurement plan that includes request size, read/write mix, concurrency, latency percentiles, and durability settings.',
          ]}
          hint="Begin with the workload and failure objective; choose a layout only after you know what data must survive."
        />
      </Part>

      <KeyTakeaways items={[
        'HDD request scheduling can reduce head movement; SSTF may starve distant requests while SCAN-style policies trade efficiency for fairness.',
        'SSDs remove mechanical seek but still have queueing, flash management, and variable latency.',
        'IOPS, throughput, latency, queue depth, and durability describe different properties.',
        'RAID striping, mirroring, and parity make different capacity and failure-tolerance trade-offs.',
        'RAID is not a backup; independent backups need regular restore tests.',
        'Measure storage with the application workload and durability settings you actually use.',
      ]} />

      <Bullets items={[
        <span key="ref">For device and filesystem behaviour, use the operating system and storage-vendor documentation for the hardware you operate; implementations differ.</span>,
      ]} />

      <H3>Next</H3>
      <NextLesson
        href="/learn/operating-systems/virtualisation-containers"
        label="Lesson 09 · Virtualisation and Containers — Hypervisors, Namespaces and cgroups"
        text="Storage is one resource the OS manages. Next, explore how hypervisors and containers isolate CPU, memory, processes, and filesystems."
      />
    </LearnLayout>
  )
}
