import type { Metadata } from 'next'
import { LearnLayout } from '@/components/content/LearnLayout'
import Link from 'next/link'
import { Callout } from '@/components/content/Callout'
import { KeyTakeaways } from '@/components/content/KeyTakeaways'

export const metadata: Metadata = {
  title: 'Linux and Shell Scripting for Data Engineers — Data Engineering | Chaduvuko',
  description:
    'The Linux commands and shell scripting patterns every data engineer uses daily — file operations, process management, cron, grep/awk/sed for log analysis, and writing production-grade bash scripts.',
}

const SectionTag = ({ text }: { text: string }) => (
  <div style={{
    fontSize: 10, fontWeight: 700, letterSpacing: '.14em',
    textTransform: 'uppercase', color: 'var(--muted)',
    fontFamily: 'var(--font-mono)', marginBottom: 10,
  }}>{text}</div>
)

const SectionTitle = ({ children }: { children: React.ReactNode }) => (
  <h2 style={{
    fontSize: 'clamp(20px, 2.5vw, 28px)', fontWeight: 900,
    letterSpacing: '-1px', color: 'var(--text)', marginBottom: 18,
    fontFamily: 'var(--font-display)', lineHeight: 1.2,
  }}>{children}</h2>
)

const SubTitle = ({ children }: { children: React.ReactNode }) => (
  <h3 style={{
    fontSize: 'clamp(16px, 1.8vw, 20px)', fontWeight: 700,
    letterSpacing: '-0.3px', color: 'var(--text)', marginBottom: 12,
    fontFamily: 'var(--font-display)',
  }}>{children}</h3>
)

const SubSubTitle = ({ children }: { children: React.ReactNode }) => (
  <h4 style={{ fontSize: 15, fontWeight: 700, color: 'var(--text)', marginBottom: 10 }}>{children}</h4>
)

const Para = ({ children }: { children: React.ReactNode }) => (
  <p style={{ fontSize: 15, color: 'var(--text)', lineHeight: 1.9, marginBottom: 20 }}>{children}</p>
)

const CodeBox = ({ children, label }: { children: string; label?: string }) => (
  <div style={{ marginBottom: 16 }}>
    {label && (
      <div style={{
        fontSize: 11, fontWeight: 700, color: 'var(--muted)',
        letterSpacing: '.1em', textTransform: 'uppercase',
        marginBottom: 6, fontFamily: 'var(--font-mono)',
      }}>{label}</div>
    )}
    <pre style={{
      background: 'var(--bg2)', border: '1px solid var(--border)',
      borderRadius: 10, padding: '18px 22px', overflowX: 'auto',
      fontSize: 13, lineHeight: 1.9, color: 'var(--text)',
      fontFamily: 'var(--font-mono)', margin: 0, whiteSpace: 'pre-wrap',
    }}>
      <code>{children}</code>
    </pre>
  </div>
)

// A visually distinct block for showing what a command actually PRINTS —
// separated from the command itself so a reader can tell "thing I type" from
// "thing the terminal shows me back" at a glance, not just by a comment.
const Output = ({ children }: { children: string }) => (
  <div style={{ marginBottom: 24 }}>
    <div style={{
      fontSize: 10, fontWeight: 700, color: 'var(--muted)',
      letterSpacing: '.1em', textTransform: 'uppercase',
      marginBottom: 6, fontFamily: 'var(--font-mono)',
      display: 'flex', alignItems: 'center', gap: 6,
    }}>
      <span style={{ opacity: 0.6 }}>▸</span> output
    </div>
    <pre style={{
      background: 'transparent', border: '1px dashed var(--border)',
      borderRadius: 10, padding: '14px 22px', overflowX: 'auto',
      fontSize: 13, lineHeight: 1.8, color: 'var(--muted)',
      fontFamily: 'var(--font-mono)', margin: 0, whiteSpace: 'pre-wrap',
    }}>
      <code>{children}</code>
    </pre>
  </div>
)

const Divider = () => (
  <div style={{ borderTop: '1px solid var(--border)', margin: '52px 0' }} />
)

const HighlightBox = ({ children }: { children: React.ReactNode }) => (
  <div style={{
    background: 'var(--surface)', border: '1px solid var(--border)',
    borderRadius: 12, padding: '24px 28px', marginBottom: 24,
  }}>
    {children}
  </div>
)

// A prompt to actually try something in a real terminal, not just read past it.
const TryThis = ({ children }: { children: React.ReactNode }) => (
  <div style={{
    background: 'rgba(123,97,255,0.06)', border: '1px solid rgba(123,97,255,0.25)',
    borderRadius: 10, padding: '16px 20px', marginBottom: 24,
    display: 'flex', gap: 12, alignItems: 'flex-start',
  }}>
    <span style={{ fontSize: 16, flexShrink: 0, lineHeight: 1.5 }}>⌨️</span>
    <div>
      <div style={{
        fontSize: 10, fontWeight: 700, color: 'var(--accent2)',
        letterSpacing: '.1em', textTransform: 'uppercase', marginBottom: 6,
        fontFamily: 'var(--font-mono)',
      }}>Try this yourself</div>
      <div style={{ fontSize: 14, color: 'var(--text)', lineHeight: 1.75 }}>{children}</div>
    </div>
  </div>
)

// A simple, scannable comparison table — used instead of another code block
// whenever the content is genuinely tabular (flags, tools, signals).
const Table = ({ head, rows }: { head: string[]; rows: string[][] }) => (
  <div style={{ overflowX: 'auto', marginBottom: 24 }}>
    <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13.5 }}>
      <thead>
        <tr>
          {head.map((h, i) => (
            <th key={i} style={{
              textAlign: 'left', padding: '10px 14px', fontSize: 11, fontWeight: 700,
              color: 'var(--muted)', letterSpacing: '.06em', textTransform: 'uppercase',
              borderBottom: '1px solid var(--border)', fontFamily: 'var(--font-mono)',
            }}>{h}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.map((row, ri) => (
          <tr key={ri} style={{ borderBottom: ri < rows.length - 1 ? '1px solid var(--border)' : 'none' }}>
            {row.map((cell, ci) => (
              <td key={ci} style={{
                padding: '10px 14px', color: ci === 0 ? 'var(--text)' : 'var(--muted)',
                fontFamily: ci === 0 ? 'var(--font-mono)' : 'inherit',
                fontWeight: ci === 0 ? 600 : 400, lineHeight: 1.6, verticalAlign: 'top',
              }}>{cell}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  </div>
)

// A visual breakdown of a permission string like -rwxr-x--- , segment by
// segment, instead of a wall of comment lines pointing at ASCII art.
const PermissionDiagram = () => {
  const segments = [
    { chars: '-', label: 'Type', detail: '- file · d directory · l symlink', color: 'var(--muted)' },
    { chars: 'rwx', label: 'Owner', detail: 'read + write + execute', color: 'var(--accent)' },
    { chars: 'r-x', label: 'Group', detail: 'read + execute only', color: 'var(--accent2)' },
    { chars: '---', label: 'Others', detail: 'no access at all', color: 'var(--red)' },
  ]
  return (
    <div style={{
      background: 'var(--surface)', border: '1px solid var(--border)',
      borderRadius: 12, padding: '22px 24px', marginBottom: 24,
    }}>
      <div style={{
        display: 'flex', fontFamily: 'var(--font-mono)', fontSize: 22, fontWeight: 700,
        marginBottom: 18, letterSpacing: '2px',
      }}>
        {segments.map((s, i) => (
          <span key={i} style={{ color: s.color }}>{s.chars}</span>
        ))}
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: 12 }}>
        {segments.map((s, i) => (
          <div key={i} style={{ borderLeft: `2px solid ${s.color}`, paddingLeft: 10 }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: s.color, fontFamily: 'var(--font-mono)', marginBottom: 2 }}>{s.label}</div>
            <div style={{ fontSize: 12, color: 'var(--muted)', lineHeight: 1.5 }}>{s.detail}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default function LinuxShellModule() {
  return (
    <LearnLayout
      title="Linux and Shell Scripting for Data Engineers"
      description="The commands and scripts every DE uses daily — files, processes, cron, log analysis, and bash — taught through one running investigation, not a command dump."
      section="Data Engineering — Module 16"
      readTime="70 min"
      updatedAt="August 2026"
    >

      {/* ── Part 01 — Why Linux ───────────────────────────────────────── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 01 — Why Linux Matters for Data Engineers" />
        <SectionTitle>Every Data Pipeline Runs on Linux</SectionTitle>

        <Para>
          Almost every server that runs a data pipeline — cloud VMs, Docker containers,
          Kubernetes pods, Airflow workers, Spark executors — runs Linux. When a
          pipeline fails at 3 AM, you SSH into a Linux box and diagnose it. When
          a disk fills up and kills a pipeline, you find the culprit with Linux commands.
          When you need to quickly inspect a 10 GB log file without loading it into
          Python, you use Linux tools that do it in seconds.
        </Para>

        <Para>
          Linux proficiency for a data engineer is not about memorising every command.
          It is about being comfortable in a terminal, knowing which tools solve which
          problems, and being able to write shell scripts that automate the repetitive
          operational tasks that surround every data pipeline. This module is built
          around a single thread you will follow the whole way through: a real orders
          pipeline for a company called FreshCart, and every tool introduced along
          the way is one you will actually use on it — not a detached command reference
          you have to mentally translate into a real situation later.
        </Para>

        <HighlightBox>
          <div style={{
            fontSize: 14, fontWeight: 800, color: 'var(--text)',
            fontFamily: 'var(--font-display)', marginBottom: 14,
          }}>
            What this module builds toward
          </div>
          <Para>
            By the end, you will have written a complete, production-grade bash
            wrapper script for the FreshCart orders pipeline — piece by piece, understanding
            every line — and diagnosed a real 6:47 AM pipeline failure end to end using
            nothing but the commands from this module.
          </Para>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 12 }}>
            {[
              { num: '01', name: 'Navigation and files', desc: 'Moving around, finding files, and reading disk usage.' },
              { num: '02', name: 'Permissions', desc: 'The rwx model, and diagnosing "Permission denied" in seconds.' },
              { num: '03', name: 'Text processing', desc: 'grep, awk, sed, cut, sort, uniq — the DE log-analysis toolkit.' },
              { num: '04', name: 'Process management', desc: 'ps, top, kill, nohup, background jobs, signals.' },
              { num: '05', name: 'File transfer', desc: 'scp, rsync, curl, aws s3 — moving data between machines.' },
              { num: '06', name: 'Cron scheduling', desc: 'Writing and debugging crontabs, the fastest scheduler you have.' },
              { num: '07', name: 'Bash scripting', desc: 'Variables, conditionals, loops, functions — built up incrementally.' },
              { num: '08', name: 'Environment and config', desc: 'Why cron breaks scripts that work fine when you run them by hand.' },
            ].map((item) => (
              <div key={item.num} style={{
                background: 'var(--bg2)', border: '1px solid var(--border)',
                borderRadius: 8, padding: '12px 14px',
              }}>
                <div style={{
                  fontSize: 10, fontWeight: 700, color: 'var(--accent)',
                  fontFamily: 'var(--font-mono)', letterSpacing: '.1em',
                  textTransform: 'uppercase', marginBottom: 4,
                }}>{item.num} — {item.name}</div>
                <div style={{ fontSize: 12, color: 'var(--muted)', lineHeight: 1.6 }}>{item.desc}</div>
              </div>
            ))}
          </div>
        </HighlightBox>
      </section>

      <Divider />

      {/* ── Part 02 — Navigation and Finding Files ───────────────────── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 02 — Navigation and Finding Files" />
        <SectionTitle>Moving Around and Finding What You Need</SectionTitle>

        <Para>
          You have just been given SSH access to <code>pipeline-01</code>, the server that
          runs FreshCart's nightly orders pipeline. The first thing any data engineer
          does on an unfamiliar server is get their bearings — where am I, what is here,
          and how big is it.
        </Para>

        <SubSubTitle>Where am I, and what's here</SubSubTitle>

        <CodeBox label="Command">{`pwd`}</CodeBox>
        <Output>{`/home/pipeline_user`}</Output>

        <Para>
          <code>pwd</code> ("print working directory") always tells you exactly where
          you are — the single most useful command to run the moment you feel lost.
          Next, move to where the pipeline actually lives and see what's there.
        </Para>

        <CodeBox label="Command">{`cd /data/pipelines
ls -lah`}</CodeBox>
        <Output>{`total 24K
drwxr-xr-x 5 pipeline_user data_team 4.0K Mar 17 06:00 .
drwxr-xr-x 3 root          root      4.0K Jan  4  2026 ..
-rwxr-xr-x 1 pipeline_user data_team  892 Mar 17 06:00 run_orders.sh
drwxr-x--- 2 pipeline_user data_team 4.0K Mar 17 06:14 logs
drwxr-x--- 2 pipeline_user data_team 4.0K Mar 16 23:00 pipeline`}</Output>

        <Para>
          <code>-l</code> gives the long listing (permissions, owner, size, date —
          all things you will need constantly), <code>-a</code> shows hidden files
          (anything starting with a dot), and <code>-h</code> makes sizes human-readable
          (4.0K instead of 4096). This three-flag combo is worth memorising as one
          habit: <code>ls -lah</code> is the default way any experienced engineer looks
          at a directory.
        </Para>

        <Table
          head={['Command', 'Moves to']}
          rows={[
            ['cd /data/pipelines', 'an absolute path — always the same place, regardless of where you started'],
            ['cd ../logs', 'a relative path — one level up, then into logs'],
            ['cd ~', 'your home directory'],
            ['cd -', 'wherever you just were — the previous directory'],
          ]}
        />

        <SubSubTitle>Finding files without knowing exactly where they are</SubSubTitle>

        <Para>
          You need last night's log file, but you don't remember the exact path.
          <code>find</code> searches a directory tree by name, age, or size — and it is
          almost always faster than clicking through folders.
        </Para>

        <CodeBox label="Command">{`find /data -name "orders_*.log" -mtime -1`}</CodeBox>
        <Output>{`/data/pipelines/logs/orders_20260317.log`}</Output>

        <Para>
          <code>-name</code> matches a filename pattern; <code>-mtime -1</code> means
          "modified in the last 1 day" — the minus sign means <em>less than</em>. A few
          more variations you will reach for constantly:
        </Para>

        <CodeBox label="Command">{`find /data -size +1G                         # files larger than 1 GB
find /data -empty                            # empty files — often a sign something failed
find /tmp -name "*.tmp" -mtime +7 -delete    # delete .tmp files older than 7 days`}</CodeBox>

        <Callout type="warning">
          Notice <code>+7</code> above means <em>more than</em> 7 days, the opposite of
          the <code>-1</code> you just saw. <code>find</code>'s plus/minus convention
          trips up almost everyone once — plus is "more than", minus is "less than",
          no sign at all is "exactly". Get this backwards on a <code>-delete</code>{' '}
          command and you can delete far more (or far less) than you meant to. Always
          run the search without <code>-delete</code> first and read the file list
          before adding it.
        </Callout>

        <SubSubTitle>Viewing file content without opening an editor</SubSubTitle>

        <CodeBox label="Command">{`tail -n 20 /data/pipelines/logs/orders_20260317.log`}</CodeBox>
        <Output>{`2026-03-17 06:00:04 INFO  Starting orders_pipeline
2026-03-17 06:00:05 INFO  Connected to database
2026-03-17 06:02:41 INFO  Batch 1 complete: 10000 rows
2026-03-17 06:04:58 INFO  Batch 2 complete: 10000 rows
2026-03-17 06:07:12 WARNING DEBUG_MODE=true detected — writing full row dump`}</Output>

        <Para>
          That last line is worth remembering — it becomes important later in this
          module. <code>tail</code> shows the end of a file (the default is 10 lines;{' '}
          <code>-n 20</code> asks for 20). Its most useful mode for a live pipeline is{' '}
          <code>-f</code>, which <em>follows</em> the file and streams new lines as they
          are written — the command you leave running in a terminal while a pipeline
          executes:
        </Para>

        <CodeBox label="Command — leave this running while a pipeline is executing">{`tail -f /data/pipelines/logs/orders_20260317.log | grep --line-buffered ERROR`}</CodeBox>

        <Para>
          This follows the log in real time but only prints lines containing{' '}
          <code>ERROR</code> — everything else scrolls by silently. <code>head</code>{' '}
          is the mirror image of <code>tail</code>, showing the first N lines instead
          of the last — useful for checking a CSV's header without printing the
          whole file with <code>cat</code>, which for a 10 GB file would flood your
          terminal and do nothing useful.
        </Para>

        <SubSubTitle>How much disk space is actually left</SubSubTitle>

        <CodeBox label="Command">{`df -h /data`}</CodeBox>
        <Output>{`Filesystem  Size  Used  Avail  Use%  Mounted on
/dev/sdb1   500G  460G    40G   93%  /data`}</Output>

        <Para>
          <code>df</code> ("disk free") reports space at the filesystem level — this
          is the first command to run any time a pipeline behaves strangely, because a
          nearly-full disk causes symptoms that look like almost anything else: writes
          hang, processes stall, jobs that used to take 5 minutes suddenly run for hours.
          Once you know a disk is nearly full, <code>du</code> ("disk usage") tells you{' '}
          <em>what</em> is taking the space:
        </Para>

        <CodeBox label="Command">{`du -sh /data/* | sort -rh | head -5`}</CodeBox>
        <Output>{`312G  /data/raw
 92G  /data/processed
 34G  /data/logs
  8G  /data/tmp
  2G  /data/pipelines`}</Output>

        <Para>
          <code>-s</code> summarises each argument to one total instead of listing
          every file inside it, and piping through <code>sort -rh</code> (reverse,
          human-readable-numeric) puts the biggest consumer first. You can repeat this
          one level deeper on whichever directory turns out to be the culprit — that
          exact drill-down is exactly how the 7 AM incident later in this module gets
          solved.
        </Para>

        <TryThis>
          Pick any directory on a machine you have access to and run{' '}
          <code>du -sh * | sort -rh | head -10</code> inside it. You will almost always
          find the space is concentrated in one or two places you didn't expect —
          that instinct, "check du before guessing," is worth more than memorising
          every flag.
        </TryThis>
      </section>

      <Divider />

      {/* ── Part 03 — File Permissions ────────────────────────────────── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 03 — File Permissions" />
        <SectionTitle>The rwx Model — Reading and Fixing "Permission Denied"</SectionTitle>

        <Para>
          A data engineer who does not understand permissions will spend hours
          debugging "Permission denied" errors that take seconds to fix once the
          model is understood. Every file and directory on Linux carries exactly
          this information:
        </Para>

        <CodeBox label="Command">{`ls -lah /data/pipelines/run_orders.sh`}</CodeBox>
        <Output>{`-rwxr-x--- 1 pipeline_user data_team 892 Mar 17 06:00 run_orders.sh`}</Output>

        <Para>Break the permission string apart and it reads as four independent pieces:</Para>

        <PermissionDiagram />

        <Para>
          Each of the three access groups (owner, group, others) carries the same
          three possible permissions: <code>r</code> (read — can view contents, or
          list a directory), <code>w</code> (write — can modify a file, or create
          files inside a directory), and <code>x</code> (execute — can run a file
          as a program, or enter a directory with <code>cd</code>). This file is{' '}
          <code>rwx</code> for the owner, <code>r-x</code> for the group, and{' '}
          nothing at all for everyone else.
        </Para>

        <SubSubTitle>Changing permissions with chmod</SubSubTitle>

        <Para>
          Each permission has a numeric value — <code>r</code>=4, <code>w</code>=2,{' '}
          <code>x</code>=1 — and you add them together per group. <code>rwx</code> is
          4+2+1=7, <code>r-x</code> is 4+1=5, and <code>chmod</code> takes one digit
          per group in owner-group-others order:
        </Para>

        <Table
          head={['chmod', 'Meaning', 'Typical use']}
          rows={[
            ['755', 'rwxr-xr-x', 'scripts everyone should be able to run'],
            ['644', 'rw-r--r--', 'config files — readable by all, writable only by owner'],
            ['600', 'rw-------', 'secrets: API keys, passwords, credentials files'],
            ['700', 'rwx------', 'private directories — owner only'],
          ]}
        />

        <CodeBox label="Command">{`chmod +x run_orders.sh        # add execute permission, keep everything else
chmod 600 db_credentials.env  # secrets: owner read/write, nobody else anything`}</CodeBox>

        <Callout type="tip">
          <code>chmod +x</code> is worth knowing as its own idiom, separate from the
          numeric form — it adds execute permission without touching read/write bits
          you already have set, which is exactly what you want the moment you write
          a new shell script and immediately try to run it.
        </Callout>

        <SubSubTitle>Diagnosing a permission error, systematically</SubSubTitle>

        <Para>
          When you see <code>Permission denied</code>, resist the urge to guess —
          three commands tell you exactly what's wrong:
        </Para>

        <CodeBox label="Command">{`ls -lah /data/output/orders.parquet   # what permissions does the FILE have?
id                                    # what user and groups am I actually in?
stat /data/output/orders.parquet      # full detail: owner, group, exact mode`}</CodeBox>
        <Output>{`-rw-r----- 1 other_service data_team 4.2G Mar 17 06:12 orders.parquet
uid=1001(pipeline_user) gid=1002(data_team) groups=1002(data_team)`}</Output>

        <Para>
          Reading this output: the file is owned by <code>other_service</code>, not{' '}
          <code>pipeline_user</code> — but <code>pipeline_user</code>{' '}
          <em>is</em> a member of the <code>data_team</code> group, and the group
          permission is <code>r--</code> (read only, no write). That fully explains
          a "permission denied" on any attempt to <em>write</em> to this file — the
          fix is either to change the group permission (<code>chmod g+w</code>) or
          the ownership entirely:
        </Para>

        <CodeBox label="Command">{`chown pipeline_user:data_team orders.parquet     # change owner and group
chmod -R 750 /data/secrets/                      # recursively set 750 on a whole tree`}</CodeBox>
      </section>

      <Divider />

      {/* ── Part 04 — grep ────────────────────────────────────────────── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 04 — grep" />
        <SectionTitle>grep — Searching Logs Without Opening Them</SectionTitle>

        <Para>
          Linux text processing tools are the fastest way to investigate pipeline
          logs and answer quick questions without writing a line of Python. A data
          engineer who knows grep, awk, sed, and cut can diagnose most pipeline
          failures in minutes, straight from the terminal.
        </Para>

        <SubSubTitle>The basics</SubSubTitle>

        <CodeBox label="Command">{`grep "ERROR" orders_20260317.log`}</CodeBox>
        <Output>{`2026-03-17 06:41:02 ERROR Connection to database timed out after 30s
2026-03-17 06:41:33 ERROR Retry 1/3 failed`}</Output>

        <Para>
          The plainest possible use — every line containing the literal text{' '}
          <code>ERROR</code>. Three flags cover most of what you need day to day:
        </Para>

        <Table
          head={['Flag', 'Effect']}
          rows={[
            ['-i', 'case-insensitive — matches ERROR, error, Error'],
            ['-n', 'show the line number of each match'],
            ['-c', 'print only a count of matching lines, not the lines themselves'],
            ['-v', 'invert the match — show lines that do NOT contain the pattern'],
          ]}
        />

        <SubSubTitle>Context lines — seeing what happened around an error</SubSubTitle>

        <Para>
          A single matching line rarely tells the whole story. You almost always
          want to see what happened immediately before or after it too:
        </Para>

        <CodeBox label="Command">{`grep -B 2 -A 5 "ERROR" orders_20260317.log`}</CodeBox>
        <Output>{`2026-03-17 06:40:58 INFO  Attempting database connection...
2026-03-17 06:40:58 INFO  Connection pool: 5/5 in use
2026-03-17 06:41:02 ERROR Connection to database timed out after 30s
2026-03-17 06:41:02 INFO  Retry scheduled in 5s
2026-03-17 06:41:07 INFO  Retrying database connection...
2026-03-17 06:41:33 ERROR Retry 1/3 failed
2026-03-17 06:41:33 INFO  Retry scheduled in 10s`}</Output>

        <Para>
          <code>-B 2</code> shows 2 lines <em>before</em> each match, <code>-A 5</code>{' '}
          shows 5 <em>after</em> — instantly turning one alarming line into the full
          story: the connection pool was maxed out right before the timeout. <code>-C 5</code>{' '}
          is the shorthand for equal context on both sides.
        </Para>

        <SubSubTitle>Regex patterns for real log formats</SubSubTitle>

        <CodeBox label="Command">{`grep -E "ERROR|CRITICAL" orders_20260317.log      # either word, extended regex
grep -E "order_id=[0-9]+" orders_20260317.log     # order_id followed by digits
grep -E "^2026-03-17 06:4" orders_20260317.log    # lines starting with this timestamp`}</CodeBox>

        <Para>
          <code>-E</code> turns on extended regular expressions, which is what lets{' '}
          <code>|</code> mean "or" and <code>[0-9]+</code> mean "one or more digits."
          Without <code>-E</code>, grep's basic mode requires escaping these
          characters, which is easy to get wrong under pressure — reach for{' '}
          <code>-E</code> by default.
        </Para>

        <SubSubTitle>Searching many files, and scripting a check</SubSubTitle>

        <CodeBox label="Command">{`grep -r "CRITICAL" /var/log/pipelines/           # search every file, recursively
grep -l "ERROR" /var/log/pipelines/*.log          # list which FILES contain it (not lines)`}</CodeBox>
        <Output>{`/var/log/pipelines/orders_20260317.log
/var/log/pipelines/inventory_20260317.log`}</Output>

        <Para>
          <code>grep -q</code> (quiet — no output at all, just a pass/fail exit
          code) is what makes grep useful inside a script's own logic, not just for
          reading logs yourself:
        </Para>

        <CodeBox label="Command">{`if grep -q "CRITICAL" orders_20260317.log; then
    echo "Critical error found — alerting team"
fi`}</CodeBox>

        <TryThis>
          Take any log file you have (even a small one) and run{' '}
          <code>grep -c "ERROR" file.log</code> then compare it to{' '}
          <code>grep -c "WARNING" file.log</code>. That single-command comparison is
          often the first thing worth checking when a pipeline "seemed fine" but
          something downstream looks wrong.
        </TryThis>
      </section>

      <Divider />

      {/* ── Part 05 — awk and sed ─────────────────────────────────────── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 05 — awk and sed" />
        <SectionTitle>awk for Columns, sed for Find-and-Replace</SectionTitle>

        <Para>
          Where <code>grep</code> finds lines, <code>awk</code> works with{' '}
          <em>columns</em> inside those lines — exactly what you need for a CSV or
          any consistently-delimited text.
        </Para>

        <SubSubTitle>awk — column extraction and calculation</SubSubTitle>

        <CodeBox label="Command — orders.csv has columns: id, store, amount, status">{`awk -F',' '{print $3}' orders.csv | head -5`}</CodeBox>
        <Output>{`amount
24.99
89.50
12.00
156.75`}</Output>

        <Para>
          <code>-F','</code> sets the field delimiter to a comma, and <code>$3</code>{' '}
          refers to the third column (<code>$1</code>, <code>$2</code>… and{' '}
          <code>$0</code> for the whole line). awk becomes genuinely powerful once
          you add a condition or a running calculation:
        </Para>

        <CodeBox label="Command — total revenue across the whole file, skipping the header">{`awk -F',' 'NR>1 {sum += $3} END {print "Total:", sum}' orders.csv`}</CodeBox>
        <Output>{`Total: 48291.35`}</Output>

        <Para>
          <code>NR</code> is the current line number, so <code>NR{'>'}1</code> skips
          the header row; <code>sum += $3</code> runs on every remaining line;{' '}
          <code>END</code> marks a block that runs once, after every line has been
          processed. This one-liner is doing the same thing a full Python script with
          a CSV reader and an accumulator variable would do — in a single terminal
          command.
        </Para>

        <CodeBox label="Command — count how many orders have each status">{`awk -F',' 'NR>1 {counts[$4]++} END {for (s in counts) print s, counts[s]}' orders.csv`}</CodeBox>
        <Output>{`delivered 412
cancelled 18
pending 31`}</Output>

        <SubSubTitle>sed — find, replace, and delete in a text stream</SubSubTitle>

        <Para>
          <code>sed</code> ("stream editor") is built around one core operation:
          substitution.
        </Para>

        <CodeBox label="Command">{`sed 's/old-db-host/new-db-host/g' config.yaml`}</CodeBox>

        <Para>
          <code>s/find/replace/g</code> — substitute, and <code>g</code> means every
          occurrence per line, not just the first. Printed to the screen like this,
          sed changes nothing — it only shows you what the result <em>would</em> look
          like. Add <code>-i</code> to actually modify the file in place:
        </Para>

        <CodeBox label="Command">{`sed -i.bak 's/old-db-host/new-db-host/g' config.yaml`}</CodeBox>

        <Callout type="warning">
          <code>-i</code> alone overwrites the file with no backup and no confirmation.
          The habit worth building is <code>-i.bak</code> instead — it makes the
          same edit but keeps a <code>config.yaml.bak</code> copy of the original,
          so a substitution that goes wrong is one <code>mv</code> away from undone,
          not gone.
        </Callout>

        <Para>Two more sed patterns come up constantly around data files:</Para>

        <CodeBox label="Command">{`sed '1d' orders.csv | wc -l              # strip the header, then count remaining rows
sed -n '10,20p' pipeline.log              # print ONLY lines 10 through 20`}</CodeBox>

        <SubSubTitle>cut — when you just need columns, nothing more</SubSubTitle>

        <Para>
          For simple column extraction with no calculation involved, <code>cut</code>{' '}
          reads more clearly than awk:
        </Para>

        <CodeBox label="Command">{`cut -d',' -f1,3 orders.csv | head -3`}</CodeBox>
        <Output>{`id,amount
1001,24.99
1002,89.50`}</Output>
      </section>

      <Divider />

      {/* ── Part 06 — sort, uniq, pipes ───────────────────────────────── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 06 — Combining Tools" />
        <SectionTitle>sort, uniq, and Pipes — The Real Power of the Shell</SectionTitle>

        <Para>
          Every tool covered so far does exactly one thing. The reason the Linux
          shell is genuinely powerful for a data engineer is not any single command —
          it's that <code>|</code> (pipe) sends the output of one command straight
          into the input of the next, letting you chain small, simple tools into
          something that would otherwise take a real script to write.
        </Para>

        <SubSubTitle>sort and uniq, individually</SubSubTitle>

        <CodeBox label="Command">{`sort -t',' -k3 -rn orders.csv | head -3`}</CodeBox>
        <Output>{`4821,ST003,899.00,delivered
1052,ST001,650.25,delivered
3390,ST002,512.10,cancelled`}</Output>

        <Para>
          <code>-t','</code> sets the field separator, <code>-k3</code> sorts by the
          3rd field, <code>-rn</code> reverse-numeric — so this shows the highest-value
          orders first. <code>uniq</code> has one sharp edge worth knowing before you
          use it: it only removes <em>adjacent</em> duplicate lines, which is exactly
          why it is almost always used right after <code>sort</code>.
        </Para>

        <SubSubTitle>The pattern: cut | sort | uniq -c | sort -rn</SubSubTitle>

        <Para>
          This exact four-stage pipe is one of the highest-value one-liners in the
          entire module — it turns any column into a ranked frequency count:
        </Para>

        <CodeBox label="Command — which order status appears most often?">{`cut -d',' -f4 orders.csv | sort | uniq -c | sort -rn`}</CodeBox>
        <Output>{`  412 delivered
   31 pending
   18 cancelled`}</Output>

        <Para>
          Read left to right: <code>cut</code> pulls out just the status column,{' '}
          <code>sort</code> groups identical values next to each other (required
          before <code>uniq</code> can work), <code>uniq -c</code> collapses each
          run of duplicates into one line prefixed with its count, and the final{' '}
          <code>sort -rn</code> puts the highest count first. Four tools, each doing
          one job, composed into an answer that would otherwise mean opening the
          file in pandas.
        </Para>

        <CodeBox label="Command — the same pattern, a different question">{`awk '{print $1}' access.log | sort | uniq -c | sort -rn | head -10   # top 10 IPs hitting a server`}</CodeBox>

        <TryThis>
          Take any CSV or log file you have and run{' '}
          <code>{`cut -d',' -f<N> file.csv | sort | uniq -c | sort -rn`}</code> on
          whichever column looks categorical (a status, a country code, a type). This
          single pattern answers "what's the distribution of this column" faster than
          almost any other approach.
        </TryThis>
      </section>

      <Divider />

      {/* ── Part 07 — Process Management ─────────────────────────────── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 07 — Process Management" />
        <SectionTitle>Processes, Signals, and Running Things in the Background</SectionTitle>

        <Para>
          Data pipelines are processes. Understanding how Linux manages them lets
          you run a pipeline in the background, watch its resource usage, and kill
          a stuck job cleanly instead of guessing.
        </Para>

        <SubSubTitle>Finding and inspecting a running process</SubSubTitle>

        <CodeBox label="Command">{`ps aux | grep orders_pipeline`}</CodeBox>
        <Output>{`pipeline 18734 98.2  4.1  python3 orders_pipeline.py --date 2026-03-17`}</Output>

        <Para>
          <code>ps aux</code> lists every process; piping through <code>grep</code>{' '}
          narrows it to the one you care about. That <code>98.2</code> is the CPU
          percentage — worth watching, because a healthy pipeline batch job is
          usually well under 100%, and a number pinned there for a long stretch is
          a signal something is spinning instead of progressing. To see exactly how
          long it has actually been running:
        </Para>

        <CodeBox label="Command">{`ps -p 18734 -o pid,etime,pcpu,pmem,cmd`}</CodeBox>
        <Output>{`PID    ELAPSED  %CPU  %MEM  CMD
18734  02:14:32  98.2   4.1  python3 orders_pipeline.py`}</Output>

        <Para>
          Two hours and fourteen minutes for a job that should finish in thirty is
          a real signal, not a coincidence — this is the exact reading that kicks
          off the diagnosis in the Real World section later in this module.
        </Para>

        <SubSubTitle>Killing a process — and why the signal you send matters</SubSubTitle>

        <Table
          head={['Signal', 'Command', 'What happens']}
          rows={[
            ['SIGTERM (15)', 'kill 18734', 'graceful — the process can catch this, finish its current batch, and clean up'],
            ['SIGKILL (9)', 'kill -9 18734', 'immediate — cannot be caught or ignored; no cleanup; files being written may be corrupted'],
            ['SIGINT (2)', 'Ctrl+C', 'same as SIGTERM in practice — Python raises KeyboardInterrupt'],
          ]}
        />

        <Callout type="warning">
          Always send <code>SIGTERM</code> first and only escalate to{' '}
          <code>SIGKILL</code> if the process is still alive a few seconds later. A
          well-written pipeline catches SIGTERM and flushes its write buffer before
          exiting; SIGKILL gives it no chance to do that, and a parquet file being
          written when SIGKILL arrives is left truncated and unreadable.
        </Callout>

        <CodeBox label="Command — the correct kill sequence in practice">{`kill 18734              # SIGTERM — ask nicely
sleep 5
kill -0 18734 2>/dev/null && kill -9 18734    # still alive? force it`}</CodeBox>

        <Para>
          <code>kill -0</code> is a neat trick worth knowing on its own — it sends no
          signal at all and only checks whether the process still exists, which is
          exactly what you need before deciding whether escalation to SIGKILL is
          actually necessary.
        </Para>

        <SubSubTitle>Running something that survives you logging out</SubSubTitle>

        <CodeBox label="Command">{`nohup python3 pipeline.py > output.log 2>&1 &
echo $!`}</CodeBox>
        <Output>{`[1] 21044
21044`}</Output>

        <Para>
          Four things are happening on that first line: <code>nohup</code> means the
          process keeps running even after you close the SSH session; <code>&gt;
          output.log</code> redirects normal output to a file; <code>2&gt;&1</code>{' '}
          sends error output to that same place instead of the screen; and the
          trailing <code>&amp;</code> runs it in the background so your terminal is
          immediately free again. <code>echo $!</code> prints the process ID of that
          last background command — worth capturing immediately if you'll need to
          check on or kill it later.
        </Para>
      </section>

      <Divider />

      {/* ── Part 08 — File Transfer ────────────────────────────────────── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 08 — Moving Data Between Machines" />
        <SectionTitle>scp, rsync, curl, and S3 — Choosing the Right Tool</SectionTitle>

        <Para>
          Data engineering involves constant movement of files — from a source
          server to a data lake, between cloud regions, from an external partner's
          SFTP drop to a processing node. Four tools cover almost every case, and
          the right one depends entirely on what you're actually doing.
        </Para>

        <Table
          head={['Tool', 'Use it when']}
          rows={[
            ['scp', 'a quick one-off copy of a single file or small folder over SSH'],
            ['rsync', 'syncing a large directory repeatedly — it only transfers what changed'],
            ['curl / wget', 'pulling from an HTTP(S) URL or calling an API'],
            ['aws s3 cp/sync', 'moving data to or from an S3 bucket specifically'],
          ]}
        />

        <SubSubTitle>scp — simple and immediate</SubSubTitle>

        <CodeBox label="Command">{`scp orders.csv user@pipeline-01:/data/landing/
scp -i ~/.ssh/pipeline_key.pem orders.csv ec2-user@54.1.2.3:/data/`}</CodeBox>

        <SubSubTitle>rsync — the right choice for anything repeated or large</SubSubTitle>

        <Para>
          rsync only transfers files that have actually changed, which is the
          difference between a nightly sync taking 40 minutes versus 40 seconds
          once most of the data is already in place.
        </Para>

        <CodeBox label="Command">{`rsync -avz --dry-run /data/local/ user@server:/data/remote/    # preview first — nothing moves
rsync -avz /data/local/ user@server:/data/remote/               # then actually run it`}</CodeBox>

        <Para>
          <code>-a</code> is archive mode (recursive, preserves permissions and
          timestamps), <code>-v</code> is verbose, <code>-z</code> compresses during
          transfer. Always run with <code>--dry-run</code> once first on anything
          you haven't run before — it shows exactly what would be transferred,
          without transferring anything, which is a cheap safety check before a sync
          that touches thousands of files.
        </Para>

        <SubSubTitle>curl — for APIs and HTTP downloads</SubSubTitle>

        <CodeBox label="Command">{`curl -H "Authorization: Bearer $API_TOKEN" https://api.example.com/data > data.json`}</CodeBox>

        <SubSubTitle>Moving data to and from S3</SubSubTitle>

        <CodeBox label="Command">{`aws s3 cp orders.csv s3://freshcart-data/raw/orders.csv
aws s3 sync /data/local/ s3://freshcart-data/processed/`}</CodeBox>

        <Para>
          <code>cp</code> moves one object; <code>sync</code> behaves like rsync for
          an entire prefix — only uploading what's new or changed.
        </Para>
      </section>

      <Divider />

      {/* ── Part 09 — Cron ─────────────────────────────────────────────── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 09 — Cron Scheduling" />
        <SectionTitle>Cron — Automating a Pipeline on a Schedule</SectionTitle>

        <Para>
          For a pipeline that doesn't yet warrant a full orchestration tool like
          Airflow, cron is the fastest, most reliable way to schedule it. And even
          once you <em>are</em> using Airflow, its schedule strings use this exact
          same syntax — so cron is never wasted knowledge.
        </Para>

        <SubSubTitle>Reading cron syntax</SubSubTitle>

        <HighlightBox>
          <div style={{ display: 'flex', fontFamily: 'var(--font-mono)', fontSize: 19, fontWeight: 700, marginBottom: 16, gap: 4, flexWrap: 'wrap' }}>
            <span style={{ color: 'var(--accent)' }}>0</span>
            <span style={{ color: 'var(--accent2)' }}>6</span>
            <span style={{ color: 'var(--gold)' }}>*</span>
            <span style={{ color: '#ff6b6b' }}>*</span>
            <span style={{ color: 'var(--muted)' }}>*</span>
            <span style={{ color: 'var(--text)', marginLeft: 8 }}>/data/pipelines/run_orders.sh</span>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(110px, 1fr))', gap: 10 }}>
            {[
              { c: '0', l: 'minute', r: '0–59', color: 'var(--accent)' },
              { c: '6', l: 'hour', r: '0–23', color: 'var(--accent2)' },
              { c: '*', l: 'day of month', r: '1–31', color: 'var(--gold)' },
              { c: '*', l: 'month', r: '1–12', color: '#ff6b6b' },
              { c: '*', l: 'day of week', r: '0–7 (Sun=0 or 7)', color: 'var(--muted)' },
            ].map((f, i) => (
              <div key={i} style={{ borderLeft: `2px solid ${f.color}`, paddingLeft: 10 }}>
                <div style={{ fontSize: 11, fontWeight: 700, color: f.color, fontFamily: 'var(--font-mono)' }}>{f.l}</div>
                <div style={{ fontSize: 11, color: 'var(--muted)' }}>{f.r}</div>
              </div>
            ))}
          </div>
        </HighlightBox>

        <Para>
          A <code>*</code> means "any value" for that field. So this reads: minute
          0, hour 6, any day of month, any month, any day of week — every day at
          6:00 AM, exactly.
        </Para>

        <Table
          head={['Schedule', 'Meaning']}
          rows={[
            ['0 6 * * *', 'every day at 6:00 AM'],
            ['0 8 * * 1-5', 'every weekday at 8:00 AM'],
            ['*/15 * * * *', 'every 15 minutes'],
            ['0 */6 * * *', 'every 6 hours'],
            ['0 3 1 * *', '3:00 AM on the 1st of every month'],
          ]}
        />

        <SubSubTitle>Editing and reading the crontab</SubSubTitle>

        <CodeBox label="Command">{`crontab -e      # edit your crontab (opens in $EDITOR)
crontab -l      # list what's currently scheduled`}</CodeBox>

        <SubSubTitle>Three habits every production crontab entry needs</SubSubTitle>

        <CodeBox label="Command — the difference between a fragile entry and a production one">{`# Fragile — will likely fail silently under cron:
0 6 * * * run_orders.sh

# Production-ready:
0 6 * * * /data/pipelines/run_orders.sh >> /var/log/pipelines/orders.log 2>&1`}</CodeBox>

        <Para>
          Three specific things changed: an absolute path to the script (cron does
          not use your normal shell's PATH — more on exactly why in Part 12), and
          output redirected to a real log file so a failure leaves a trace instead
          of vanishing. This exact gap — a script that runs fine by hand but fails
          silently under cron — is common enough that it gets its own dedicated
          explanation later in this module.
        </Para>

        <SubSubTitle>Debugging a cron job that "isn't running"</SubSubTitle>

        <CodeBox label="Command">{`sudo systemctl status cron              # is the cron daemon even running?
grep CRON /var/log/syslog | tail -20     # what has cron actually attempted?`}</CodeBox>

        <TryThis>
          Write a one-line cron entry that appends the current date to a file every
          minute — <code>* * * * * date {'>>'} /tmp/cron_test.log</code> — and check
          back in a few minutes. Seeing it actually work end to end, once, is worth
          more than reading the syntax table twice.
        </TryThis>
      </section>

      <Divider />

      {/* ── Part 10 — Bash Fundamentals ───────────────────────────────── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 10 — Bash Scripting Fundamentals" />
        <SectionTitle>Variables, Conditionals, and Loops</SectionTitle>

        <Para>
          Bash scripts wrap a pipeline with the operational logic Python alone
          doesn't handle well: checking preconditions, logging, alerting on failure,
          preventing duplicate runs. Every production pipeline is wrapped in at
          least a basic bash script — the rest of this module builds one, piece
          by piece.
        </Para>

        <SubSubTitle>Variables</SubSubTitle>

        <CodeBox label="Command">{`name="FreshCart"
today=$(date +%Y-%m-%d)      # command substitution — capture a command's output
echo "Company: $name, today: $today"`}</CodeBox>
        <Output>{`Company: FreshCart, today: 2026-03-17`}</Output>

        <Para>
          <code>$(...)</code> runs a command and substitutes its output — the
          single most-used piece of bash syntax in real pipeline scripts, since
          almost every script needs "today's date" or "the result of some check"
          captured into a variable.
        </Para>

        <SubSubTitle>Conditionals</SubSubTitle>

        <CodeBox label="Command">{`if [[ -f "/data/orders.csv" ]]; then
    echo "File exists"
else
    echo "File is missing"
fi`}</CodeBox>

        <Table
          head={['Test', 'Checks']}
          rows={[
            ['[[ -f path ]]', 'a regular file exists'],
            ['[[ -d path ]]', 'a directory exists'],
            ['[[ "$a" == "$b" ]]', 'string equality'],
            ['[[ $a -gt $b ]]', 'numeric comparison (also -lt -ge -le -eq -ne)'],
          ]}
        />

        <Para>
          One conditional worth knowing specifically: testing whether a command
          itself succeeded, which is how a script checks its own dependencies before
          doing real work.
        </Para>

        <CodeBox label="Command">{`if psql "$DATABASE_URL" -c "SELECT 1" > /dev/null 2>&1; then
    echo "Database is reachable"
else
    echo "Cannot reach database — aborting"
    exit 1
fi`}</CodeBox>

        <SubSubTitle>Loops</SubSubTitle>

        <CodeBox label="Command — process a fixed list of stores">{`stores=("ST001" "ST002" "ST003")
for store in "\${stores[@]}"; do
    echo "Processing store: $store"
done`}</CodeBox>

        <CodeBox label="Command — retry with backoff, a genuinely common pipeline pattern">{`retry=0
max_retries=3
while [[ $retry -lt $max_retries ]]; do
    if python3 pipeline.py; then
        echo "Success on attempt $((retry+1))"
        break
    fi
    retry=$((retry+1))
    echo "Attempt $retry failed — retrying in $((2**retry))s"
    sleep $((2**retry))
done`}</CodeBox>

        <Para>
          <code>$((2**retry))</code> is exponential backoff written directly in
          bash arithmetic — 2, 4, 8 seconds — the same pattern you'd reach for in
          Python, expressed in the shell.
        </Para>

        <SubSubTitle>Functions</SubSubTitle>

        <CodeBox label="Command">{`check_disk_space() {
    local path="\${1:-/data}"
    local min_gb="\${2:-10}"
    local free_gb
    free_gb=$(df -BG "$path" | awk 'NR==2 {print $4}' | tr -d 'G')

    if [[ $free_gb -lt $min_gb ]]; then
        echo "ERROR: only \${free_gb}GB free at $path (need \${min_gb}GB)"
        return 1
    fi
    return 0
}

check_disk_space /data 10 || exit 1`}</CodeBox>

        <Para>
          <code>local</code> keeps a variable scoped to the function instead of
          leaking into the rest of the script — worth using by habit inside every
          function you write. Notice this function also reuses the exact{' '}
          <code>df</code> + <code>awk</code> combination from Part 02 — a small sign
          of how a handful of core tools recombine into everything else in this
          module.
        </Para>
      </section>

      <Divider />

      {/* ── Part 11 — Strings and Dates ───────────────────────────────── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 11 — String Manipulation and Dates" />
        <SectionTitle>Parsing Filenames and Computing Dates in Pure Bash</SectionTitle>

        <Para>
          Pipeline scripts constantly need to pull a piece out of a filename, or
          compute "yesterday" for a backfill — bash can do both without calling out
          to Python.
        </Para>

        <CodeBox label="Command">{`filename="/data/orders_2026_03_17.csv"

echo "\${filename##*/}"     # orders_2026_03_17.csv  — strip everything up to the last /
echo "\${filename%.*}"      # /data/orders_2026_03_17 — strip the extension
echo "\${filename##*.}"     # csv — just the extension`}</CodeBox>

        <Para>
          <code>##*/</code> and <code>%.*</code> look cryptic at first but follow one
          rule: <code>#</code> strips from the front, <code>%</code> strips from the
          back, and doubling the symbol (<code>##</code>, <code>%%</code>) makes it
          greedy (match as much as possible) instead of matching the shortest
          possible piece.
        </Para>

        <CodeBox label="Command">{`today=$(date +%Y-%m-%d)
yesterday=$(date -d 'yesterday' +%Y-%m-%d)     # Linux
# yesterday=$(date -v-1d +%Y-%m-%d)            # macOS — different flag, same result
log_suffix=$(date +%Y%m%d_%H%M%S)`}</CodeBox>
        <Output>{`today: 2026-03-17
yesterday: 2026-03-16
log_suffix: 20260317_081432`}</Output>

        <Callout type="tip">
          Data pipelines default to processing <em>yesterday's</em> data far more
          often than "today's" — a batch job that runs at 6 AM is finishing off the
          previous full day, not the day that just started. <code>date -d
          'yesterday'</code> (or <code>-v-1d</code> on macOS) is worth knowing cold
          for exactly this reason.
        </Callout>
      </section>

      <Divider />

      {/* ── Part 12 — Environment and Config ──────────────────────────── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 12 — Environment and Configuration" />
        <SectionTitle>Why a Script That Works By Hand Can Fail Under Cron</SectionTitle>

        <Para>
          This is the single most common "it works on my machine" problem a data
          engineer hits, and it has one root cause: cron runs your script in a
          <em>minimal</em> environment, not the rich one your interactive shell sets
          up for you.
        </Para>

        <CodeBox label="Command — run this both by hand and inside a cron job, compare">{`echo $PATH`}</CodeBox>
        <Output>{`# In your interactive shell:
/usr/local/bin:/usr/local/sbin:/usr/bin:/bin:/home/pipeline_user/.local/bin

# Under cron:
/usr/bin:/bin`}</Output>

        <Para>
          That difference is the whole problem. If your script calls{' '}
          <code>python3</code> and it happens to live in <code>/usr/local/bin</code>{' '}
          (very common), your interactive shell finds it instantly — but cron's
          minimal PATH does not include that directory at all, so the exact same
          script fails under cron with "command not found," even though it just
          ran perfectly when you tested it by hand two minutes earlier.
        </Para>

        <Table
          head={['Cause', 'Fix']}
          rows={[
            ['Minimal PATH', 'use absolute paths everywhere: /usr/local/bin/python3, not python3'],
            ['.bashrc never loaded', 'source a dedicated env file explicitly inside the script'],
            ['Working directory is $HOME, not the script’s folder', 'cd "$(dirname "$0")" at the top of the script, or use absolute paths'],
            ['Output has nowhere to go', 'always redirect: script.sh >> /var/log/job.log 2>&1'],
          ]}
        />

        <CodeBox label="Command — loading environment variables safely inside a script">{`set -a              # auto-export every variable that gets set below
source /etc/pipeline_environment
set +a              # stop auto-exporting`}</CodeBox>

        <Para>
          This pattern — <code>set -a</code>, source the file, <code>set +a</code> —
          is the cleanest way to load a whole file of configuration into a script's
          environment without hand-writing an <code>export</code> line for every
          single variable in it.
        </Para>
      </section>

      <Divider />

      {/* ── Part 13 — Building the Production Script ──────────────────── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 13 — Building the Production Script" />
        <SectionTitle>Assembling Everything Into One Real Pipeline Wrapper</SectionTitle>

        <Para>
          Every tool in this module so far has been a piece. Now they come together —
          the same FreshCart orders pipeline, wrapped in a real production-grade
          bash script, built up one addition at a time so each piece is understood
          before the next one lands on top of it.
        </Para>

        <SubSubTitle>Step 1 — the non-negotiable first line</SubSubTitle>

        <CodeBox label="orders_pipeline.sh — start here, always">{`#!/usr/bin/env bash
set -euo pipefail`}</CodeBox>

        <Para>
          This is the correct second line of every production bash script, without
          exception. <code>-e</code> exits immediately the moment any command fails,
          instead of bash's default of quietly continuing to the next line.{' '}
          <code>-u</code> turns a typo like <code>$DATABSE_URL</code> into an
          immediate, clear error instead of silently substituting an empty string.{' '}
          <code>-o pipefail</code> makes a pipe fail if <em>any</em> stage of it
          fails — without it, <code>bad_command | good_command</code> reports
          success as long as the last command in the chain succeeds, even if the
          first one silently produced nothing.
        </Para>

        <SubSubTitle>Step 2 — configuration and logging</SubSubTitle>

        <CodeBox label="orders_pipeline.sh — add configuration and a logging function">{`readonly LOG_DIR="/var/log/pipelines"
readonly LOG_FILE="\${LOG_DIR}/orders_$(date +%Y%m%d).log"
readonly PIPELINE_SCRIPT="/data/pipelines/pipeline/orders_ingestion.py"

log() {
    local level="$1"; shift
    echo "$(date '+%Y-%m-%d %H:%M:%S') [\${level}] $*" | tee -a "$LOG_FILE"
}
info()  { log "INFO"  "$@"; }
error() { log "ERROR" "$@"; }`}</CodeBox>

        <Para>
          <code>tee -a</code> is doing double duty here — it prints the message to
          the screen <em>and</em> appends it to the log file at the same time, so
          you get live feedback when running the script by hand and a permanent
          record when cron runs it unattended. The <code>info</code>/<code>error</code>{' '}
          wrapper functions exist purely so the rest of the script reads as{' '}
          <code>info "message"</code> instead of repeating the full <code>log</code>{' '}
          call everywhere.
        </Para>

        <SubSubTitle>Step 3 — a lock file, so cron can never run two copies at once</SubSubTitle>

        <CodeBox label="orders_pipeline.sh — prevent overlapping runs">{`readonly LOCK_FILE="/tmp/orders_pipeline.lock"

if [[ -f "$LOCK_FILE" ]]; then
    pid=$(cat "$LOCK_FILE")
    if kill -0 "$pid" 2>/dev/null; then
        error "Another instance is already running (PID $pid). Exiting."
        exit 1
    fi
    echo "Stale lock file found — removing"
fi
echo $$ > "$LOCK_FILE"`}</CodeBox>

        <Para>
          A pipeline that normally takes 30 minutes but occasionally runs long
          (from the earlier scenario: 2 hours) is a real risk if cron fires the
          next scheduled run before the first one finishes — now there are two
          copies writing to the same output. This lock file, checked with the same{' '}
          <code>kill -0</code> trick from Part 07, makes that structurally
          impossible: a second invocation sees the lock, confirms the original
          process is genuinely still alive, and exits immediately instead of racing it.
        </Para>

        <SubSubTitle>Step 4 — cleanup that always runs, success or failure</SubSubTitle>

        <CodeBox label="orders_pipeline.sh — a trap that fires no matter how the script exits">{`cleanup() {
    local exit_code=$?
    rm -f "$LOCK_FILE"
    if [[ $exit_code -ne 0 ]]; then
        error "Script exited with code $exit_code"
    fi
}
trap cleanup EXIT`}</CodeBox>

        <Para>
          <code>trap cleanup EXIT</code> registers <code>cleanup</code> to run
          automatically no matter <em>how</em> the script ends — a normal finish, an{' '}
          <code>exit 1</code> from an earlier check, or a crash from{' '}
          <code>set -e</code> catching a failed command. This is what guarantees
          the lock file from Step 3 is always removed — without it, one failed run
          would permanently lock out every future run.
        </Para>

        <SubSubTitle>Step 5 — preconditions, then the actual pipeline</SubSubTitle>

        <CodeBox label="orders_pipeline.sh — check before running, then run">{`main() {
    info "==== Starting orders pipeline ===="

    : "\${DATABASE_URL:?DATABASE_URL is required}"
    [[ -f "$PIPELINE_SCRIPT" ]] || { error "Script not found: $PIPELINE_SCRIPT"; exit 1; }
    check_disk_space /data 10 || { error "Insufficient disk space"; exit 1; }

    local run_date="\${1:-$(date -d 'yesterday' +%Y-%m-%d)}"
    info "Processing date: $run_date"

    python3 "$PIPELINE_SCRIPT" --date "$run_date" 2>&1 | tee -a "$LOG_FILE"

    info "==== Finished orders pipeline ===="
}

main "$@"`}</CodeBox>

        <Para>
          <code>{': "${DATABASE_URL:?DATABASE_URL is required}"'}</code> is a bash
          idiom worth learning once: <code>:</code> is a no-op that does nothing
          with its argument, and <code>{'${VAR:?message}'}</code> makes bash exit
          with that exact message if the variable is unset — a one-line, readable
          precondition check. Notice this step also calls{' '}
          <code>check_disk_space</code>, the exact function written in Part 10 — the
          whole script is built from pieces this module already taught, not new
          syntax appearing out of nowhere.
        </Para>

        <Callout type="tip">
          This five-step build is the actual shape of almost every production
          pipeline wrapper you will encounter in a real job: strict mode, logging,
          a lock file, a cleanup trap, then preconditions before the real work. Once
          you've built one by hand like this, recognising (and extending) one you
          find in an existing codebase becomes far easier.
        </Callout>
      </section>

      <Divider />

      {/* ── Part 14 — Real World ─────────────────────────────────────── */}
      <section style={{ marginBottom: 64 }} data-toc-kind="story">
        <SectionTag text="// Part 14 — Real World" />
        <div style={{
          fontSize: 10, fontWeight: 700, letterSpacing: '.12em',
          textTransform: 'uppercase', color: 'var(--muted)', marginBottom: 12,
          fontFamily: 'var(--font-mono)',
        }}>
          💼 What This Looks Like at Work
        </div>
        <SectionTitle>Diagnosing a Failed Pipeline at 7 AM Using Only Linux Commands</SectionTitle>

        <div style={{
          background: 'var(--surface)', border: '1px solid var(--border)',
          borderRadius: 12, padding: '24px 28px', marginBottom: 24,
        }}>
          <div style={{
            fontSize: 11, fontWeight: 700, color: 'var(--accent)',
            background: 'rgba(0,230,118,0.1)', border: '1px solid rgba(0,230,118,0.2)',
            borderRadius: 6, padding: '4px 10px', fontFamily: 'var(--font-mono)',
            display: 'inline-block', marginBottom: 20, letterSpacing: '.1em',
            textTransform: 'uppercase',
          }}>
            Scenario — On-call DE at FreshCart · Pipeline alert fired at 06:47 AM
          </div>

          <Para>
            You receive a PagerDuty alert at 6:47 AM: "orders_pipeline has not
            completed by 06:45 AM SLA." You SSH into <code>pipeline-01</code> — the
            exact server from Part 02. Every command below is one this module
            already taught you.
          </Para>

          <SubSubTitle>Step 1 — is it even still running?</SubSubTitle>
          <CodeBox label="Command">{`ps aux | grep orders_pipeline`}</CodeBox>
          <Output>{`pipeline 18734 98.2  4.1  python3 orders_pipeline.py --date 2026-03-17`}</Output>
          <Para>It's running, at 98% CPU — worth a closer look, not yet a conclusion.</Para>

          <SubSubTitle>Step 2 — how long has it actually been running?</SubSubTitle>
          <CodeBox label="Command">{`ps -p 18734 -o pid,etime,pcpu,pmem,cmd`}</CodeBox>
          <Output>{`PID    ELAPSED  %CPU  %MEM  CMD
18734  02:14:32  98.2   4.1  python3 orders_pipeline.py`}</Output>
          <Para>Two hours fourteen minutes, for a job that normally finishes in thirty. This is now a real problem.</Para>

          <SubSubTitle>Step 3 — check the disk, the single most common silent killer</SubSubTitle>
          <CodeBox label="Command">{`df -h /data`}</CodeBox>
          <Output>{`Filesystem  Size  Used  Avail  Use%  Mounted on
/dev/sdb1   500G  499G   512M   99%  /data`}</Output>
          <Para><strong>Disk is full.</strong> 512 MB free. This alone explains a hung process — writes block indefinitely once a filesystem has no space left.</Para>

          <SubSubTitle>Step 4 — find what's actually consuming the space</SubSubTitle>
          <CodeBox label="Command">{`du -sh /data/raw/2026/03/* | sort -rh`}</CodeBox>
          <Output>{`288G  /data/raw/2026/03/17
 24G  /data/raw/2026/03/16`}</Output>
          <Para>Today's partition is 288 GB — roughly twelve times a normal day. Something is writing far more than it should.</Para>

          <SubSubTitle>Step 5 — find the exact file</SubSubTitle>
          <CodeBox label="Command">{`ls -lth /data/raw/2026/03/17/ | head -5`}</CodeBox>
          <Output>{`-rw-r--r-- 1 pipeline pipeline 288G Mar 17 06:28 orders_debug_dump.csv`}</Output>
          <Para>A 288 GB debug dump file. Confirm it in the log:</Para>
          <CodeBox label="Command">{`grep -i debug orders_20260317.log`}</CodeBox>
          <Output>{`2026-03-17 04:32:14 WARNING DEBUG_MODE=true detected — writing full row dump`}</Output>
          <Para>
            That's the exact same warning line spotted in the log excerpt back in
            Part 02 — it wasn't a red herring, it was the root cause, sitting there
            for two hours before anyone looked closely.
          </Para>

          <SubSubTitle>Steps 6–8 — kill it cleanly, free the disk, fix the config, restart</SubSubTitle>
          <CodeBox label="Command">{`kill 18734                              # SIGTERM first
sleep 5
kill -0 18734 2>/dev/null && kill -9 18734

rm /data/raw/2026/03/17/orders_debug_dump.csv
sed -i 's/DEBUG_MODE=true/DEBUG_MODE=false/' /etc/pipelines/orders.env

nohup python3 /data/pipelines/pipeline/orders_ingestion.py --date 2026-03-17 \\
    >> orders_20260317.log 2>&1 &
echo "Restarted with PID $!"`}</CodeBox>

          <SubSubTitle>Step 9 — watch it actually recover</SubSubTitle>
          <CodeBox label="Command">{`tail -f orders_20260317.log | grep -E "INFO|ERROR"`}</CodeBox>
          <Output>{`07:03:41 INFO Batch 1 complete: 10000 rows
07:04:28 INFO Batch 2 complete: 10000 rows`}</Output>

          <Para>
            Total time from alert to resolution: 22 minutes, and every command used
            was already covered in this module. A data engineer who knows these
            tools reaches root cause in minutes. One who does not might spend hours
            opening tickets and waiting for escalations instead.
          </Para>
        </div>
      </section>

      <Divider />

      {/* ── Part 15 — Misconceptions ─────────────────────────────────── */}
      <section style={{ marginBottom: 64 }} data-toc-kind="myth">
        <SectionTag text="// Part 15 — Misconceptions" />
        <SectionTitle>Five Misconceptions About Linux and Shell Scripting</SectionTitle>

        {[
          {
            wrong: '"A cron job that runs perfectly when I test the script by hand will run the same way under cron"',
            right: 'Cron runs scripts in a minimal environment with a stripped-down PATH and no .bashrc loaded — a script relying on either will fail under cron even though it worked flawlessly moments earlier by hand. Always test with absolute paths and explicit environment loading, covered fully in Part 12.',
          },
          {
            wrong: '"rm -rf is fine as long as I\'m careful about the path"',
            right: 'There is no undo. A single extra space (rm -rf /data /tmp instead of rm -rf /data/tmp) deletes two unrelated trees instead of one nested path — and the command completes before you notice. Before running any -rf, run the equivalent ls on the same path first and read what it lists.',
          },
          {
            wrong: '"kill -9 is the normal way to stop a process"',
            right: 'kill (SIGTERM) should always be tried first — it gives a well-written process the chance to finish its current unit of work and close files cleanly. kill -9 (SIGKILL) skips all of that; a parquet file being written when SIGKILL lands is left truncated and unreadable. Reserve -9 for a process that ignored SIGTERM.',
          },
          {
            wrong: '"set -e makes a bash script fail on any error, no exceptions"',
            right: 'set -e has real, documented gaps — it does NOT trigger inside an if condition, before || or &&, or inside most subshell contexts. A command that fails inside if some_command; then ... will NOT stop the script even with set -e active. Critical commands still need explicit error checking regardless.',
          },
          {
            wrong: '"grep, awk, and sed are old tools that a modern data engineer doesn\'t really need"',
            right: 'They remain the fastest way to answer a quick question about a log file or a text-based data file — often faster than opening Python, importing pandas, and writing five lines to do what one piped command line already does. They are not a replacement for real data processing at scale, but for investigation and quick checks they are still the first tool reached for.',
          },
        ].map((item, i) => (
          <div key={i} style={{
            background: 'var(--surface)', border: '1px solid var(--border)',
            borderRadius: 10, padding: '20px 24px', marginBottom: 16,
          }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--red)', marginBottom: 8, fontFamily: 'var(--font-mono)' }}>
              ✕ &quot;{item.wrong}&quot;
            </div>
            <div style={{ fontSize: 14, color: 'var(--muted)', lineHeight: 1.7 }}>{item.right}</div>
          </div>
        ))}
      </section>

      <Divider />

      {/* ── Part 16 — Interview Prep ─────────────────────────────────── */}
      <section style={{ marginBottom: 64 }} data-toc-kind="prep">
        <SectionTag text="// Part 16 — Interview Prep" />
        <SectionTitle>5 Interview Questions — With Complete Answers</SectionTitle>

        {[
          {
            q: 'Q1. A pipeline process on a Linux server appears to be running but is making no progress. How do you investigate?',
            a: `I would work through a systematic sequence of checks, starting with the simplest possibilities.

First, verify the process is actually running and check its resource usage: ps aux | grep pipeline_name or watch it in top. Look at CPU percentage (near 0% might mean it is waiting for I/O or a lock; near 100% might mean it is in a compute loop), memory usage (high and growing might mean a memory leak or unexpectedly large data), and the process state in the STAT column (D means waiting for disk I/O, S means sleeping, R means actively running).

Second, check disk space: df -h. A full disk is the single most common cause of pipelines that appear running but are actually stuck — write operations block indefinitely when the filesystem is full. Find the space consumer with du -sh /data/* | sort -rh.

Third, check the process's file handles to see what it is waiting on: lsof -p PID. If it has a file open with no recent modification time, it may be waiting for a read that never completes.

Fourth, look at the pipeline's own log file: tail -f /var/log/pipelines/pipeline.log. A well-instrumented pipeline logs its progress — if the last entry was 90 minutes ago for a batch that normally logs every 5 minutes, that tells you exactly where it stalled.

Fifth, if the pipeline connects to a database, check for lock waits on the database side using pg_stat_activity — the process may be blocked waiting for a database lock held by another transaction.`,
          },
          {
            q: 'Q2. What does set -euo pipefail do in a bash script and why should every production script use it?',
            a: `These three settings change bash's default error handling from "permissive and silent" to "strict and loud" — the correct behaviour for production pipeline scripts.

-e (errexit) causes the script to exit immediately when any command returns a non-zero exit code. Without this, bash continues executing the next line even after a failure — a database migration step that fails would, without -e, still run every step after it while appearing to succeed.

-u (nounset) causes the script to exit with an error when it tries to use an undefined variable, instead of silently substituting an empty string. A typo like $DATABSE_URL instead of $DATABASE_URL would otherwise pass an empty string into a connection string, producing a confusing error far from the actual typo.

-o pipefail changes how pipes report failure. By default, command1 | command2 succeeds if the last command succeeds, even if command1 failed silently and produced no output. With pipefail, the whole pipe fails if any stage of it fails.

Together, set -euo pipefail — the second line of every production bash script, right after the shebang — ensures a script stops at the first sign of trouble with a clear error instead of continuing through failures silently.`,
          },
          {
            q: 'Q3. How do you find the top 10 largest files on a server, and delete files older than 7 days from a temp directory?',
            a: `For the top 10 largest files: find /data -type f | xargs du -sh | sort -rh | head -10. -type f restricts to regular files, sort -rh sorts by human-readable size in reverse, head -10 limits the result. For a faster directory-level summary instead of individual files: du -sh /data/* | sort -rh | head -10.

To delete files older than 7 days from /data/tmp: find /data/tmp -type f -mtime +7 -delete. mtime +7 means "modified more than 7 days ago" — the plus sign matters, since a minus sign there would mean the opposite. I would always run the same find without -delete first to see exactly what would be removed before committing to it, and for a production cleanup job I'd use -exec rm -v {} \\; instead of -delete so each deletion is logged for an audit trail.`,
          },
          {
            q: 'Q4. A cron job that works fine when run manually fails when run by cron. What are the most common causes?',
            a: `This is one of the most common Linux debugging problems and almost always has one of four causes.

The most common is PATH. An interactive shell has a rich PATH from .bashrc — /usr/local/bin, ~/bin, and more. Cron runs with a minimal default PATH, often just /usr/bin:/bin. A script calling python3 installed in /usr/local/bin fails under cron with "command not found" even though it works perfectly by hand. Fix: use absolute paths in cron entries and inside the script.

The second is missing environment variables — anything set in .bashrc (API keys, DATABASE_URL) is not available to cron's minimal environment. Fix: source a dedicated environment file explicitly at the start of the script.

The third is working directory — cron starts scripts in $HOME, not the script's own folder, so relative paths resolve incorrectly. Fix: cd "$(dirname "$0")" at the top of the script, or use absolute paths throughout.

The fourth is output with nowhere to go — cron tries to email stdout/stderr, but most servers have no mail configured, so it's silently dropped. Fix: redirect explicitly, command >> /var/log/job.log 2>&1.`,
          },
          {
            q: 'Q5. How would you use Linux commands to quickly check the quality of a newly arrived CSV before running a pipeline against it?',
            a: `A quick check using only Linux tools covers structure, size, encoding, and value distributions — about two minutes of work that catches most ingestion-breaking issues.

First, confirm the file exists and isn't empty: ls -lah shows size and modification time immediately.

Second, check every row has the same column count: awk -F',' '{print NF}' orders.csv | sort | uniq -c should return exactly one distinct count. Multiple values mean malformed rows.

Third, look at the header and a few rows: head -5 orders.csv confirms the header matches expectations and the data looks reasonable.

Fourth, check encoding: file orders.csv reports ASCII, UTF-8, or ISO-8859 — the last one usually needs conversion before downstream processing.

Fifth, spot-check a numeric column for bad values: awk -F',' 'NR>1 {print $3}' orders.csv | grep -vE '^[0-9.]+$' | head -20 finds anything non-numeric in what should be a numeric column. For a categorical column, cut -d',' -f4 orders.csv | sort | uniq -c immediately surfaces any unexpected value sitting alongside the expected ones.`,
          },
        ].map((item, i) => (
          <div key={i} style={{
            background: 'var(--surface)', border: '1px solid var(--border)',
            borderRadius: 12, padding: '24px 28px', marginBottom: 20,
          }}>
            <div style={{ fontSize: 14, fontWeight: 800, color: 'var(--text)', marginBottom: 14, lineHeight: 1.4 }}>{item.q}</div>
            <div style={{ fontSize: 14, color: 'var(--muted)', lineHeight: 1.85, whiteSpace: 'pre-line' }}>{item.a}</div>
          </div>
        ))}
      </section>

      <Divider />

      {/* ── Common Mistakes ────────────────────────────────────────────── */}
      <section style={{ marginBottom: 64 }} data-toc-kind="plain">
        <SectionTag text="// Common Mistakes" />
        <SectionTitle>Mistakes Beginners Make Constantly</SectionTitle>

        {[
          {
            q: 'Running rm -rf without checking the path with ls first',
            a: 'There is no undo, no trash can, no confirmation prompt by default. Before any -rf, run the same path through ls or find to see exactly what it matches — a single stray space between two paths turns one deletion into two.',
          },
          {
            q: 'Testing a script by hand, seeing it work, and assuming it will work identically under cron',
            a: "It won't, if it relies on anything from .bashrc — a rich PATH, exported environment variables, shell aliases. Cron's environment is deliberately minimal. Test cron entries by running them with the same minimal environment: env -i /bin/bash -c 'your command here'.",
          },
          {
            q: 'Reaching for kill -9 as the default, instead of plain kill first',
            a: 'SIGKILL gives a process no chance to close files or database connections cleanly. Always send SIGTERM (plain kill) first, wait a few seconds, and only escalate to -9 if the process is still alive.',
          },
          {
            q: 'Forgetting that uniq only removes adjacent duplicates',
            a: "uniq file.txt on an unsorted file will not deduplicate it correctly — most duplicate lines will not be adjacent. Always sort first: sort file.txt | uniq, which is exactly why the two are used together as one idiom almost every time.",
          },
          {
            q: "Writing a cron entry with a relative path or no output redirection",
            a: 'Both of these produce a job that fails silently — no error visible anywhere, because cron either can\'t find the relative path or has nowhere to send the output it produced. Always use absolute paths and redirect: script.sh >> /var/log/job.log 2>&1.',
          },
        ].map((item, i) => (
          <div key={i} style={{
            background: 'var(--surface)', border: '1px solid var(--border)',
            borderRadius: 12, padding: '24px 28px', marginBottom: 20,
          }}>
            <div style={{ fontSize: 14, fontWeight: 800, color: 'var(--text)', marginBottom: 14, lineHeight: 1.4 }}>{item.q}</div>
            <div style={{ fontSize: 14, color: 'var(--muted)', lineHeight: 1.85 }}>{item.a}</div>
          </div>
        ))}
      </section>

      <Divider />

      {/* ── Error Library ────────────────────────────────────────────── */}
      <section style={{ marginBottom: 64 }} data-toc-kind="plain">
        <SectionTag text="// Error Library" />
        <SectionTitle>Errors You Will Hit — And Exactly Why They Happen</SectionTitle>

        {[
          {
            error: `bash: /data/pipelines/run.sh: Permission denied`,
            cause: 'The script file does not have the execute permission bit set. A shell script is a text file — Linux requires explicit execute permission to run it as a program. Files created by downloading with curl/wget, or checked out fresh from git, often lack it.',
            fix: 'chmod +x /data/pipelines/run.sh. Verify with ls -lah — you should see an x in the permission string (-rwxr-xr-x).',
          },
          {
            error: `Cron job "ran" but nothing happened — no output, no error anywhere`,
            cause: 'Cron executed the job, the job failed, but its output was never captured. Cron tries to email stdout/stderr, but most servers have no mail configured, so the output is silently dropped.',
            fix: 'Add explicit redirection to the crontab entry: >> /var/log/myjob.log 2>&1. Add set -euo pipefail to the script so failures are loud, and review the log after the next scheduled run.',
          },
          {
            error: `xargs: argument line too long`,
            cause: "The command line xargs is constructing exceeds the OS's ARG_MAX limit — this happens when piping thousands of filenames into a single xargs invocation.",
            fix: 'Batch it: find /data -name "*.csv" | xargs -n 100 wc -l processes 100 files per invocation. Or use find ... -exec wc -l {} + directly, which batches automatically.',
          },
          {
            error: `Script keeps running after a failed command, even with set -e active`,
            cause: 'set -e has real, documented exceptions: it does not trigger for a command inside an if condition, a command followed by || or &&, or most commands inside a subshell.',
            fix: 'For anything inside an if, check the exit code explicitly: result=$(some_command) || { echo "failed"; exit 1; }. Do not rely on set -e alone for the most critical steps in a script.',
          },
          {
            error: `find: WARNING: Hard link count is wrong for /data/nfs`,
            cause: 'Certain NFS filesystem implementations do not maintain accurate hard link counts, which find normally uses to optimise traversal — a known limitation, not a sign of corruption.',
            fix: 'Add -noleaf: find -noleaf /data/nfs -name "*.parquet". Slower, but eliminates the warning and works correctly on NFS.',
          },
        ].map((item, i) => (
          <div key={i} style={{
            background: 'var(--bg2)', border: '1px solid var(--border)',
            borderRadius: 10, padding: '20px 24px', marginBottom: 16,
          }}>
            <div style={{
              fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--red)',
              marginBottom: 12, background: 'rgba(255,71,87,0.08)',
              border: '1px solid rgba(255,71,87,0.2)',
              borderRadius: 6, padding: '8px 12px', lineHeight: 1.5,
            }}>{item.error}</div>
            <div style={{ marginBottom: 8 }}>
              <span style={{ fontSize: 10, fontWeight: 700, color: 'var(--muted)', fontFamily: 'var(--font-mono)', letterSpacing: '.1em', textTransform: 'uppercase' }}>Cause: </span>
              <span style={{ fontSize: 13, color: 'var(--muted)', lineHeight: 1.7 }}>{item.cause}</span>
            </div>
            <div>
              <span style={{ fontSize: 10, fontWeight: 700, color: 'var(--accent)', fontFamily: 'var(--font-mono)', letterSpacing: '.1em', textTransform: 'uppercase' }}>Fix: </span>
              <span style={{ fontSize: 13, color: 'var(--muted)', lineHeight: 1.7 }}>{item.fix}</span>
            </div>
          </div>
        ))}
      </section>

      {/* ── Key Takeaways ────────────────────────────────────────────── */}
      <KeyTakeaways items={[
        'du -sh /path/* | sort -rh and df -h are the first two commands to run whenever a pipeline behaves strangely — a nearly-full disk causes symptoms that look like almost anything else.',
        'Permissions are three groups of rwx (owner, group, others). 755 for scripts, 644 for configs, 600 for secrets. Diagnose "Permission denied" with ls -lah plus id, not guessing.',
        'cut | sort | uniq -c | sort -rn is the single highest-value pipe in this module — it turns any column into a ranked frequency count without writing any Python.',
        'Always send SIGTERM (plain kill) before SIGKILL (kill -9). SIGKILL gives a process no chance to close files or connections cleanly — a parquet file mid-write is left corrupted.',
        'Every production bash script starts with set -euo pipefail as its second line — but know its real gaps: it does not fire inside if conditions, before ||/&&, or in most subshells.',
        'Cron runs in a minimal environment: no .bashrc, a stripped PATH, $HOME as the working directory. Use absolute paths, source environment files explicitly, and always redirect output.',
        'A production pipeline wrapper script is five layers stacked in order: strict mode, logging, a lock file to prevent overlapping runs, a cleanup trap that always fires, then preconditions before the real work.',
        'The diagnostic sequence for a stuck pipeline: ps aux (is it running), df -h (is disk full), du -sh (what’s consuming it), lsof -p PID (what is it waiting on), tail -f the log (where did it actually stop). These five checks solve most production pipeline incidents.',
      ]} />

      {/* ── Next Module CTA ──────────────────────────────────────────────── */}
      <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 10, padding: '24px', marginTop: 40 }}>
        <p style={{ fontSize: 10, color: 'var(--muted)', letterSpacing: '.12em', textTransform: 'uppercase', fontFamily: 'var(--font-mono)', fontWeight: 700, margin: '0 0 10px' }}>
          What comes next
        </p>
        <p style={{ fontSize: 15, color: 'var(--text)', lineHeight: 1.85, margin: '0 0 20px' }}>
          Module 17 covers Git for data teams — branching strategies, managing large data files, pre-commit hooks, and the workflows that keep teams moving without stepping on each other.
        </p>
        <Link href="/learn/data-engineering/git-for-data" style={{ background: '#00e676', color: '#000', padding: '11px 24px', borderRadius: 7, fontWeight: 700, fontSize: 13, textDecoration: 'none', display: 'inline-block' }}>
          Module 17 → Git and Version Control for Data Projects
        </Link>
      </div>
    </LearnLayout>
  )
}
