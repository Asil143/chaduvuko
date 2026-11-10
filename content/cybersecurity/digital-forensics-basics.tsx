import Link from 'next/link'
import { LearnLayout } from '@/components/content/LearnLayout'
import { KeyTakeaways } from '@/components/content/KeyTakeaways'
import { Callout } from '@/components/content/Callout'

const C = '#4285f4'
const Part = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <section style={{ marginBottom: 44 }}>
    <h2 style={{ color: C, fontSize: 22, fontWeight: 700, marginBottom: 14 }}>{title}</h2>
    {children}
  </section>
)
const H = ({ children }: { children: React.ReactNode }) => (
  <h3 style={{ color: 'var(--heading)', fontSize: 17, fontWeight: 650, margin: '24px 0 8px' }}>{children}</h3>
)
const P = ({ children }: { children: React.ReactNode }) => (
  <p style={{ color: 'var(--text)', fontSize: 15, lineHeight: 1.9, marginBottom: 14 }}>{children}</p>
)
const Block = ({ children }: { children: React.ReactNode }) => (
  <pre style={{ background: 'var(--code-bg)', border: '1px solid var(--border)', borderRadius: 8, padding: '16px 20px', fontSize: 13, lineHeight: 1.8, whiteSpace: 'pre-wrap', overflowX: 'auto', marginBottom: 18 }}>{children}</pre>
)
const Hl = ({ children }: { children: React.ReactNode }) => <strong style={{ color: C }}>{children}</strong>

export default function Module43() {
  return (
    <LearnLayout
      title="Digital Forensics Basics"
      description="Preserve and examine digital evidence methodically: volatility, chain of custody, imaging and hashes, memory analysis, timelines, and operating-system artefacts."
      section="Cybersecurity — Lesson 37"
      readTime="45 min"
    >
      <Part title="Forensics Starts with Preservation">
        <P>Digital forensics is the disciplined acquisition, preservation, examination, and reporting of digital evidence. The goal is a repeatable process that lets another qualified analyst understand what was collected, how it was handled, and what the findings do—and do not—show. Follow your organisation's incident plan, legal hold, privacy rules, and approved tools. If a matter may become legal or regulatory, involve the appropriate forensic, legal, and compliance leads early.</P>
        <P>Do not casually browse or alter a suspected device. Record the device state, screen, connections, date/time and time zone, person present, and actions taken. Live response can change evidence, but powering off can destroy volatile evidence; make that decision under an approved procedure with incident leadership.</P>
      </Part>

      <Part title="Order of Volatility">
        <P>Collect evidence that disappears fastest before evidence that persists, where doing so is safe and authorised. A practical order is:</P>
        <Block>{`More volatile
  CPU registers and cache (specialised live acquisition)
  RAM and active processes / network connections
  Temporary and short-lived system state
  Local disks and removable media
  Remote logs, network services, and retained backups
Less volatile`}</Block>
        <P>This is a guide, not a rigid command sequence. A running threat actively exfiltrating data may require immediate isolation; preserving life, service safety, and limiting harm take priority. Coordinate response actions and record what changed, when, by whom, and why.</P>
      </Part>

      <Part title="Chain of Custody and Disk Acquisition">
        <P>A <Hl>chain-of-custody record</Hl> accounts for evidence from collection through transfer, storage, analysis, and return or disposal. Give each item a unique identifier; record collector, date/time and time zone, device and source, method/tool and version, condition, seal or storage location, each access/transfer, and the purpose. Use access controls and tamper-evident storage appropriate to the case.</P>
        <H>Image first; analyse a verified copy</H>
        <P>For a powered-off storage device, use an approved forensic imager and a hardware or validated software write blocker where appropriate. Capture the full source according to the case scope, document errors and unreadable sectors, and verify acquisition with cryptographic hashes (commonly SHA-256). Preserve the original, record its state, and conduct analysis on a working copy. A matching hash supports integrity since hashing; it does not prove that the source was authentic before acquisition or that the acquisition procedure was legally sufficient.</P>
        <Block>{`Example integrity check for an acquired image:
  sha256sum evidence-image.raw

PowerShell alternative:
  Get-FileHash .\\evidence-image.raw -Algorithm SHA256

Record the hash, tool/version, date/time, operator, and image identifier
in the case record. Never use an example command as a substitute for an
approved acquisition procedure or write blocker.`}</Block>
      </Part>

      <Part title="Memory Forensics and Timeline Analysis">
        <H>Memory analysis with Volatility</H>
        <P>Volatility is an open-source framework for examining memory images. Depending on the operating system and image, analysts use plugins to enumerate processes, loaded modules, network artefacts, handles, and other state. Begin by validating image compatibility and tool version, then select plugins based on a question. Findings need corroboration: a process listing alone does not establish malicious intent, and incomplete acquisition can leave gaps.</P>
        <P>Memory is especially valuable for transient evidence such as running processes and in-memory code that may not be present on disk. Acquire it only through a trusted, approved live-response method; acquisition itself affects system state. Restrict access because memory images can contain secrets and personal information.</P>
        <H>Build a defensible timeline</H>
        <P>Normalize timestamps to a documented time zone and account for clock skew, daylight-saving changes, and differences between event creation, modification, and collection times. Correlate independent sources—filesystem metadata, operating-system logs, endpoint telemetry, authentication records, and network events. State uncertainty and avoid asserting a single exact sequence when clocks or logs disagree.</P>
      </Part>

      <Part title="Useful Windows and Linux Artefacts">
        <P>Artefacts are clues that answer specific questions; retention settings, OS versions, user behaviour, and attacker actions affect whether they exist.</P>
        <Block>{`Windows examples
  Security Event Log: logons, account changes, and privilege events
  PowerShell Operational log: script activity when logging is enabled
  Prefetch: execution-related traces (configuration and OS dependent)
  Amcache / Shimcache: application compatibility and execution clues
  SRUM: resource and application usage history
  NTFS metadata, Recycle Bin, browser history, scheduled tasks, services

Linux examples
  journald and /var/log/auth.log or /var/log/secure (distribution dependent)
  auditd records when configured; shell history (incomplete and editable)
  systemd unit files, cron entries, package-manager logs
  SSH configuration and authorised_keys; filesystem metadata
  running process, socket, and login state when acquired live`}</Block>
        <P>Validate the meaning and time semantics of each artefact for the specific OS version. Logs may be disabled, rotated, incomplete, or altered; user shell history is not a complete audit trail. Corroborate important findings across independent sources and cite the source artefact, query, and relevant timestamps in the report.</P>
      </Part>

      <Part title="Reporting Findings Clearly">
        <P>Separate facts, interpretations, and limitations. A concise report identifies the question and scope; evidence identifiers and hashes; tools and versions; collection and analysis steps; timeline; findings with source references; alternative explanations; known gaps; and recommended next actions. Preserve working notes so another analyst can reproduce the result.</P>
        <P>Use digital-forensics workflows only for evidence you are authorised to collect and examine. Do not access, copy, or retain someone else's data outside the approved scope.</P>
      </Part>

      <KeyTakeaways items={[
        'Prioritise volatile evidence while balancing safety, service impact, and containment needs.',
        'Maintain a complete chain of custody and record every evidence access and transfer.',
        'Use an approved imager, write protection where appropriate, and cryptographic hashes to support acquisition integrity.',
        'Analyse a verified working copy; a hash match is useful but does not prove authenticity or legal sufficiency by itself.',
        'Volatility can help examine memory images; interpret plugin output in context and corroborate it.',
        'Timeline work requires time-zone, clock-skew, and artefact-semantics awareness.',
        'Windows and Linux artefacts depend on configuration and retention; absence of a log is not proof an event did not occur.',
        'Document limitations and distinguish observed facts from conclusions; work only within authorised scope.',
      ]} />

      <Callout type="info">
        <strong>Up Next — Lesson 38: AI and LLM Security Basics</strong><br />
        Continue with a short introduction to prompt injection, data exposure, and model abuse. The lesson also links to the full AI Security course.{' '}
        <Link href="/learn/cybersecurity/ai-llm-security-basics" style={{ color: C, fontWeight: 700 }}>Continue to Lesson 38 →</Link>
      </Callout>
    </LearnLayout>
  )
}
