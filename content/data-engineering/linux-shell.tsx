import type { Metadata } from 'next'
import { LearnLayout } from '@/components/content/LearnLayout'
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

const Para = ({ children }: { children: React.ReactNode }) => (
  <p style={{ fontSize: 15, color: 'var(--text)', lineHeight: 1.9, marginBottom: 20 }}>{children}</p>
)

const CodeBox = ({ children, label }: { children: string; label?: string }) => (
  <div style={{ marginBottom: 24 }}>
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

export default function LinuxShellModule() {
  return (
    <LearnLayout
      title="Linux and Shell Scripting for Data Engineers"
      description="The commands and scripts every DE uses daily — files, processes, cron, log analysis, and bash."
      section="Data Engineering"
      readTime="65 min"
      updatedAt="March 2026"
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
          operational tasks that surround every data pipeline.
        </Para>

        <HighlightBox>
          <div style={{
            fontSize: 14, fontWeight: 800, color: 'var(--text)',
            fontFamily: 'var(--font-display)', marginBottom: 14,
          }}>
            Seven areas this module covers
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 12 }}>
            {[
              { num: '01', name: 'Navigation and files', desc: 'Moving around, finding files, permissions, and disk usage.' },
              { num: '02', name: 'Text processing', desc: 'grep, awk, sed, cut, sort, uniq — the DE toolkit for log analysis.' },
              { num: '03', name: 'Process management', desc: 'ps, top, kill, nohup, background jobs, and resource monitoring.' },
              { num: '04', name: 'File transfer', desc: 'scp, rsync, curl, wget — moving data between machines.' },
              { num: '05', name: 'Cron scheduling', desc: 'Writing crontabs, understanding cron syntax, debugging cron jobs.' },
              { num: '06', name: 'Bash scripting', desc: 'Variables, conditionals, loops, functions, and error handling.' },
              { num: '07', name: 'Environment and config', desc: 'Environment variables, PATH, .bashrc, and shell startup files.' },
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

      {/* ── Part 02 — Navigation and File Operations ─────────────────── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 02 — Navigation and File Operations" />
        <SectionTitle>Navigation, Files, and Permissions</SectionTitle>

        <Para>
          The Linux filesystem and file permission model are the foundation of
          everything else. A data engineer who does not understand permissions will
          spend hours debugging "Permission denied" errors that take seconds to fix
          once the model is understood.
        </Para>

        <SubTitle>Navigation and file operations</SubTitle>

        <CodeBox label="Essential navigation and file commands">{`# ── NAVIGATION ───────────────────────────────────────────────────────────────
pwd                        # print working directory — where am I?
ls -lah                    # list files: -l long, -a hidden, -h human-readable sizes
ls -lt                     # sort by modification time (newest first)
cd /data/pipelines         # change to absolute path
cd ../logs                 # change to relative path (one level up, then into logs)
cd ~                       # go to home directory
cd -                       # go back to previous directory

# ── FINDING FILES ─────────────────────────────────────────────────────────────
find /data -name "*.csv"                     # find all .csv files under /data
find /data -name "orders_*.parquet" -newer /tmp/checkpoint.txt  # newer than checkpoint
find /data -size +1G                         # find files larger than 1 GB
find /data -mtime -1                         # modified in last 24 hours
find /data -empty                            # find empty files
find /tmp -name "*.tmp" -mtime +7 -delete    # find and delete .tmp files older than 7 days

# ── FILE OPERATIONS ───────────────────────────────────────────────────────────
cp source.csv dest.csv                       # copy file
cp -r /data/raw/ /data/backup/               # copy directory recursively
mv orders_v1.csv orders_v2.csv               # rename/move file
rm old_file.csv                              # delete file (no undo!)
rm -rf /data/tmp/                            # delete directory recursively (CAREFUL)
mkdir -p /data/pipeline/2026/03/17           # create nested directories
ln -s /data/real_file.parquet /data/link.parquet  # create symbolic link

# ── VIEWING FILE CONTENT ──────────────────────────────────────────────────────
cat small_file.txt                           # print entire file (only for small files)
less large_file.log                          # page through large file (q to quit)
head -n 20 orders.csv                        # first 20 lines
tail -n 50 pipeline.log                      # last 50 lines
tail -f pipeline.log                         # FOLLOW log file in real-time (stream new lines)
tail -f pipeline.log | grep ERROR            # follow log, show only errors in real-time
wc -l orders.csv                             # count lines in file
wc -c orders.csv                             # count bytes in file

# ── DISK USAGE ────────────────────────────────────────────────────────────────
df -h                                        # disk free — show all mounted filesystems
df -h /data                                  # disk free for specific path
du -sh /data/raw/                            # disk usage of directory (summary)
du -sh /data/raw/*                           # disk usage of each item in directory
du -sh /data/* | sort -rh | head -20         # top 20 largest directories under /data
du -sh /data/raw/2026/03/* | sort -rh        # check which daily partition is largest`}</CodeBox>

        <SubTitle>File permissions — understanding and setting them</SubTitle>

        <CodeBox label="Linux permissions — the model every DE must understand">{`# ── READING PERMISSIONS ──────────────────────────────────────────────────────
ls -lah /data/pipeline/

# Output:
# -rwxr-x--- 1 pipeline_user data_team 4.2G Mar 17 08:14 orders.parquet
#  ^^^ ^^^ ^^^
#  |   |   |__ others: no permissions (---)
#  |   |______ group (data_team): read+execute (r-x)
#  |__________ owner (pipeline_user): read+write+execute (rwx)
#
# First character: - = file, d = directory, l = symbolic link

# Permission breakdown:
# r = read  (4)   — can read file contents / list directory
# w = write (2)   — can modify file / create files in directory
# x = execute (1) — can run as program / enter directory

# ── CHANGING PERMISSIONS ──────────────────────────────────────────────────────
chmod 755 run_pipeline.sh      # rwxr-xr-x  owner=rwx, group=r-x, others=r-x
chmod 644 config.yaml          # rw-r--r--  owner=rw, group=r, others=r
chmod +x run_pipeline.sh       # add execute permission for all
chmod -x dangerous_script.sh   # remove execute permission
chmod -R 750 /data/secrets/    # recursively set 750 on directory and contents

# Common permission patterns for data engineering:
# 755 — scripts that should be executable by all
# 644 — config files readable by all, writable only by owner
# 600 — secret files (API keys, passwords) — owner read/write only
# 700 — private directories — owner only

# ── OWNERSHIP ─────────────────────────────────────────────────────────────────
chown pipeline_user:data_team orders.parquet     # change owner and group
chown -R pipeline_user:data_team /data/output/   # recursive ownership change
sudo chown root:root /etc/cron.d/pipeline        # change to root ownership

# ── COMMON PERMISSION ERROR ───────────────────────────────────────────────────
# "Permission denied: /data/output/orders.parquet"
# Diagnose:
ls -lah /data/output/                 # check directory permissions
id                                    # check your user and groups
stat /data/output/orders.parquet      # detailed file information`}</CodeBox>
      </section>

      <Divider />

      {/* ── Part 03 — Text Processing ────────────────────────────────── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 03 — Text Processing" />
        <SectionTitle>grep, awk, sed, cut — The Data Engineer's Log Analysis Toolkit</SectionTitle>

        <Para>
          Linux text processing tools are the fastest way to investigate pipeline
          logs, inspect data files, and answer quick questions without writing Python.
          A data engineer who knows grep, awk, sed, and cut can diagnose most pipeline
          failures in minutes without loading a single file into a dataframe.
        </Para>

        <SubTitle>grep — search for patterns in files</SubTitle>

        <CodeBox label="grep — finding patterns in logs and data files">{`# ── BASIC grep ───────────────────────────────────────────────────────────────
grep "ERROR" pipeline.log                  # find lines containing ERROR
grep -i "error" pipeline.log               # case-insensitive search
grep -n "ERROR" pipeline.log               # show line numbers
grep -c "ERROR" pipeline.log               # count matching lines (not show them)
grep -v "DEBUG" pipeline.log               # show lines NOT containing DEBUG
grep -w "ERROR" pipeline.log               # whole word match (not ERRORS, ERRORED)

# ── CONTEXT LINES ────────────────────────────────────────────────────────────
grep -A 5 "ERROR" pipeline.log             # show 5 lines AFTER each match
grep -B 3 "ERROR" pipeline.log             # show 3 lines BEFORE each match
grep -C 5 "ERROR" pipeline.log             # show 5 lines BEFORE and AFTER

# ── REGEX PATTERNS ────────────────────────────────────────────────────────────
grep -E "ERROR|CRITICAL" pipeline.log      # multiple patterns (extended regex)
grep -E "order_id=[0-9]+" pipeline.log     # match order_id with digits
grep -E "^2026-03-17" pipeline.log         # lines starting with this date
grep -E "failed after [0-9]+ retries" pipeline.log

# ── SEARCHING ACROSS MULTIPLE FILES ──────────────────────────────────────────
grep -r "ORDER_FAILED" /var/log/pipelines/ # search recursively in directory
grep -l "ERROR" /var/log/pipelines/*.log   # list files that contain ERROR (not lines)
grep -h "ERROR" /var/log/pipelines/*.log   # suppress filename prefix

# ── REAL DE USE CASES ─────────────────────────────────────────────────────────
# Find all orders that failed in today's log
grep -E "order_id.*FAILED" /var/log/pipeline_$(date +%Y%m%d).log

# Count errors per hour
grep "ERROR" pipeline.log | grep -oE "^\d{4}-\d{2}-\d{2} \d{2}" | sort | uniq -c

# Find which pipeline run produced a specific order
grep -r "order_id.*9284751" /var/log/pipelines/

# Check if any critical error occurred
if grep -q "CRITICAL" pipeline.log; then
    echo "Critical error found — alerting team"
fi`}</CodeBox>

        <SubTitle>awk — column-based text processing</SubTitle>

        <CodeBox label="awk — extracting and calculating from structured text">{`# awk processes text column by column
# $1=first field, $2=second field, $NF=last field, NR=line number, NF=num fields

# ── BASIC COLUMN EXTRACTION ───────────────────────────────────────────────────
awk '{print $1}' access.log               # print first column
awk '{print $1, $4}' access.log           # print columns 1 and 4
awk -F',' '{print $3}' orders.csv         # CSV: use comma as delimiter, print 3rd column
awk -F'\t' '{print $2}' data.tsv          # TSV: tab-delimited

# ── FILTERING WITH CONDITIONS ─────────────────────────────────────────────────
awk '$3 > 1000' orders.csv                # rows where column 3 > 1000
awk -F',' '$4 == "delivered"' orders.csv  # rows where status column = delivered
awk 'NR > 1' orders.csv                   # skip header row (print from line 2)
awk 'NR==1 || $3 > 1000' orders.csv       # keep header (line 1) + rows where col3 > 1000

# ── CALCULATIONS ──────────────────────────────────────────────────────────────
# Sum of column 3 (order amounts):
awk -F',' 'NR>1 {sum += $3} END {print "Total:", sum}' orders.csv

# Count rows and calculate average:
awk -F',' 'NR>1 {sum += $3; count++} END {print "Avg:", sum/count, "Count:", count}' orders.csv

# Count occurrences of each status:
awk -F',' 'NR>1 {counts[$4]++} END {for (s in counts) print s, counts[s]}' orders.csv

# ── STRING OPERATIONS ─────────────────────────────────────────────────────────
awk '{print length($0)}' file.txt              # print length of each line
awk '{print toupper($1)}' file.txt             # uppercase first column
awk '{gsub(/old/, "new"); print}' file.txt     # replace all occurrences in line

# ── REAL DE USE CASE: parse structured log file ───────────────────────────────
# Log format: 2026-03-17 08:14:32 INFO orders_pipeline rows_processed=48234 duration_s=92.4
# Extract pipeline name, rows processed, and duration:
awk '{
    split($4, kv, "="); rows = kv[2]
    split($5, kv, "="); dur  = kv[2]
    print $1, $2, rows, dur
}' pipeline.log | head -20`}</CodeBox>

        <SubTitle>sed — stream editor for text transformation</SubTitle>

        <CodeBox label="sed — find, replace, and transform text streams">{`# ── BASIC SUBSTITUTION ───────────────────────────────────────────────────────
sed 's/old/new/' file.txt                  # replace FIRST occurrence per line
sed 's/old/new/g' file.txt                 # replace ALL occurrences per line
sed 's/old/new/gi' file.txt                # replace all, case-insensitive
sed -i 's/old/new/g' file.txt             # IN-PLACE replacement (modifies file!)
sed -i.bak 's/old/new/g' file.txt         # in-place with .bak backup

# ── DELETION ──────────────────────────────────────────────────────────────────
sed '/pattern/d' file.txt                  # delete lines matching pattern
sed '/^$/d' file.txt                       # delete empty lines
sed '/^#/d' file.txt                       # delete comment lines starting with #
sed '1d' file.txt                          # delete first line (strip CSV header)

# ── EXTRACTION ────────────────────────────────────────────────────────────────
sed -n '10,20p' file.txt                  # print only lines 10-20
sed -n '/START/,/END/p' file.txt          # print lines between START and END markers
sed -n '/2026-03-17/p' pipeline.log       # print lines from a specific date

# ── REAL DE USE CASES ─────────────────────────────────────────────────────────
# Fix a config file's old URL across an entire directory:
find /etc/pipelines/ -name "*.yaml" -exec sed -i 's/old-db-host/new-db-host/g' {} \;

# Strip CSV header before processing:
sed '1d' orders.csv | wc -l

# Remove Windows line endings (CRLF → LF) from vendor CSV:
sed -i 's/\r//' vendor_orders.csv

# Extract just the timestamp from log lines:
sed 's/\(^[0-9-]* [0-9:]*\).*/\\1/' pipeline.log


# ── cut: simpler column extraction than awk ───────────────────────────────────
cut -d',' -f1,3     orders.csv            # columns 1 and 3 from CSV
cut -d',' -f2-      orders.csv            # columns 2 to end
cut -c1-10          pipeline.log          # first 10 characters of each line`}</CodeBox>

        <SubTitle>sort, uniq, and pipes — combining tools</SubTitle>

        <CodeBox label="sort, uniq, and pipe composition — the real power of Linux tools">{`# ── SORT ──────────────────────────────────────────────────────────────────────
sort file.txt                              # alphabetical sort
sort -n file.txt                           # numeric sort
sort -rn file.txt                          # reverse numeric (largest first)
sort -t',' -k3 -rn orders.csv             # sort CSV by column 3, reverse numeric
sort -u file.txt                           # sort and remove duplicates (unique)

# ── UNIQ ──────────────────────────────────────────────────────────────────────
# uniq only removes ADJACENT duplicates — always sort first
sort file.txt | uniq                       # remove all duplicates
sort file.txt | uniq -c                    # count occurrences of each unique line
sort file.txt | uniq -d                    # show only lines that ARE duplicated
sort file.txt | uniq -u                    # show only lines that are NOT duplicated

# ── PIPE COMPOSITION: the real power ─────────────────────────────────────────
# Pipes connect commands: stdout of left → stdin of right

# Count unique order statuses in a CSV:
cut -d',' -f4 orders.csv | sort | uniq -c | sort -rn
# Output:
# 48234 delivered
#  8921 confirmed
#  3847 cancelled
#  1204 placed

# Top 10 IP addresses hitting a web server:
awk '{print $1}' access.log | sort | uniq -c | sort -rn | head -10

# Find lines that appear in file_a but not file_b:
comm -23 <(sort file_a.txt) <(sort file_b.txt)

# How many distinct order_ids in today's log:
grep "order_id" pipeline.log | grep -oE "order_id=[0-9]+" | sort -u | wc -l

# Largest files on the filesystem:
find /data -type f | xargs du -sh | sort -rh | head -20

# Check if a CSV has exactly the expected number of columns:
awk -F',' '{print NF}' orders.csv | sort | uniq -c
# Should show only one count — if multiple values, some rows have wrong column count`}</CodeBox>
      </section>

      <Divider />

      {/* ── Part 04 — Process Management ─────────────────────────────── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 04 — Process Management" />
        <SectionTitle>Process Management — Running, Monitoring, and Killing Pipelines</SectionTitle>

        <Para>
          Data pipelines are processes. Understanding how Linux manages processes
          lets you run pipelines in the background, monitor their resource usage,
          kill stuck jobs, and diagnose why a machine is running slowly.
        </Para>

        <CodeBox label="Process monitoring and management">{`# ── VIEWING RUNNING PROCESSES ────────────────────────────────────────────────
ps aux                                # all processes: user, PID, CPU%, MEM%, command
ps aux | grep python                  # find all Python processes
ps aux | grep pipeline                # find pipeline processes
ps -ef --forest                       # process tree — see parent-child relationships

# ── REAL-TIME MONITORING ──────────────────────────────────────────────────────
top                                   # interactive process monitor
                                      # sort: M=memory, P=CPU, T=runtime
                                      # kill: k then enter PID
htop                                  # better than top (if installed)
                                      # use arrow keys, F9 to kill

# Key metrics in top:
# PID:  process ID
# %CPU: CPU usage (can exceed 100% for multi-threaded)
# %MEM: memory as % of total RAM
# VSZ:  virtual memory size
# RSS:  resident set size (actual RAM used)
# STAT: S=sleeping, R=running, Z=zombie, D=waiting for disk I/O

# ── KILLING PROCESSES ─────────────────────────────────────────────────────────
kill 12345                            # send SIGTERM to PID 12345 (graceful stop)
kill -9 12345                         # send SIGKILL (force kill — no cleanup)
kill -15 12345                        # explicitly send SIGTERM (same as kill)
pkill -f "python pipeline.py"         # kill by name pattern
killall python3                       # kill all processes named python3

# Use SIGTERM first (allows cleanup), only use SIGKILL if SIGTERM fails
# SIGKILL (-9) does not allow the process to clean up open files or connections

# ── BACKGROUND AND FOREGROUND ─────────────────────────────────────────────────
python pipeline.py &                  # run in background (& at end)
                                      # prints PID: [1] 12345
jobs                                  # list background jobs in current shell
fg %1                                 # bring job 1 to foreground
bg %1                                 # send job 1 to background
Ctrl+Z                                # suspend current foreground process
Ctrl+C                                # interrupt (kill) foreground process

# ── NOHUP: run after logout ────────────────────────────────────────────────────
nohup python pipeline.py > output.log 2>&1 &
# nohup: don't terminate when shell closes
# > output.log: redirect stdout to file
# 2>&1: redirect stderr to same place as stdout
# &: run in background
echo $!                               # print PID of last background command

# ── SCREEN / TMUX: persistent terminal sessions ──────────────────────────────
# Start a named session:
screen -S pipeline_run
tmux new -s pipeline_run

# Detach (leave running):  Ctrl+A then D (screen)  /  Ctrl+B then D (tmux)
# List sessions:           screen -ls              /  tmux ls
# Reattach:                screen -r pipeline_run  /  tmux attach -t pipeline_run

# ── RESOURCE MONITORING ───────────────────────────────────────────────────────
free -h                               # memory usage (total, used, free, cached)
vmstat 2 10                           # system stats every 2 seconds, 10 times
iostat -x 2                           # disk I/O stats every 2 seconds
lsof -p 12345                         # files opened by process 12345
lsof /data/orders.parquet             # which process has this file open
netstat -tulpn                        # open network connections and ports
ss -tulpn                             # modern replacement for netstat`}</CodeBox>

        <SubTitle>Signals — what they mean for pipeline processes</SubTitle>

        <CodeBox label="Linux signals — understanding process termination">{`# Signals are messages sent to processes
# Key signals for data engineers:

# SIGTERM (15) — graceful shutdown request
#   The default signal from kill.
#   Well-written pipelines catch SIGTERM and:
#     - complete the current row/batch
#     - flush write buffers
#     - close database connections
#     - write checkpoint state
#     - exit cleanly
#   Python: signal.signal(signal.SIGTERM, handler)

# SIGKILL (9) — immediate termination
#   Cannot be caught or ignored by the process
#   No cleanup — open files may be corrupted
#   Database connections are abandoned (left in pg_stat_activity)
#   Parquet files in progress are truncated and corrupt
#   Use only as last resort

# SIGINT (2) — interrupt (Ctrl+C)
#   Same as SIGTERM in most practical contexts
#   Python raises KeyboardInterrupt when it receives SIGINT

# SIGHUP (1) — hangup
#   Traditionally sent when terminal disconnects
#   Many daemons use SIGHUP to reload configuration without restarting

# Example: pipeline that handles SIGTERM gracefully (Python):
# import signal, sys
# shutdown_requested = False
# def handle_sigterm(signum, frame):
#     global shutdown_requested
#     shutdown_requested = True
#     logger.info("SIGTERM received — will stop after current batch")
# signal.signal(signal.SIGTERM, handle_sigterm)
#
# for batch in read_batches():
#     if shutdown_requested:
#         logger.info("Shutdown requested — stopping cleanly")
#         break
#     process_batch(batch)`}</CodeBox>
      </section>

      <Divider />

      {/* ── Part 05 — File Transfer ───────────────────────────────────── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 05 — File Transfer" />
        <SectionTitle>Moving Data Between Machines — scp, rsync, curl, wget</SectionTitle>

        <Para>
          Data engineering involves constant movement of files between machines —
          from source servers to data lakes, from one cloud region to another,
          from external SFTP servers to local processing nodes. The right tool
          depends on the use case.
        </Para>

        <CodeBox label="File transfer tools — the right tool for each situation">{`# ── SCP: simple file copy over SSH ───────────────────────────────────────────
# Local to remote:
scp orders.csv user@server-01:/data/landing/

# Remote to local:
scp user@server-01:/data/output/results.csv ./local/

# Directory (recursive):
scp -r /data/2026/03/ user@server-01:/data/archive/2026/03/

# Specify SSH key:
scp -i ~/.ssh/pipeline_key.pem orders.csv ec2-user@54.1.2.3:/data/


# ── RSYNC: efficient sync with delta transfer ─────────────────────────────────
# rsync only transfers files that have changed — ideal for large directories
rsync -avz /data/local/ user@server:/data/remote/
# -a: archive mode (recursive + preserve permissions/timestamps)
# -v: verbose
# -z: compress during transfer

# Dry run (show what would be transferred without doing it):
rsync -avzn /data/local/ user@server:/data/remote/

# Delete files on destination that no longer exist on source:
rsync -avz --delete /data/local/ user@server:/data/remote/

# Exclude certain file patterns:
rsync -avz --exclude='*.tmp' --exclude='_temp/' /data/local/ user@server:/data/remote/

# Resume an interrupted transfer (use partial flag):
rsync -avz --partial /data/large_file.parquet user@server:/data/


# ── CURL: HTTP data transfer ──────────────────────────────────────────────────
# Download a file:
curl -O https://data.gov.in/storage/f/orders_sample.csv
curl -o output.csv https://api.example.com/export

# Download with authentication:
curl -H "Authorization: Bearer $API_TOKEN" https://api.example.com/data > data.json

# POST request (webhook, API call):
curl -X POST https://api.example.com/ingest \
     -H "Content-Type: application/json" \
     -d '{"batch_id": "2026-03-17", "status": "complete"}'

# Follow redirects and show progress:
curl -L --progress-bar -O https://example.com/large_file.gz

# Download only if remote file is newer than local:
curl -z local_file.csv -O https://example.com/data.csv


# ── WGET: downloading files ───────────────────────────────────────────────────
wget https://example.com/data.csv
wget -q https://example.com/data.csv         # quiet (no progress output)
wget -r -np https://example.com/data/        # recursive download (spider directory)
wget --continue large_file.zip               # resume interrupted download


# ── MOVING DATA TO/FROM S3 ────────────────────────────────────────────────────
# AWS CLI must be installed and configured
aws s3 cp orders.csv s3://my-bucket/raw/orders.csv
aws s3 cp s3://my-bucket/output/results.csv ./local/
aws s3 sync /data/local/ s3://my-bucket/data/     # sync directory
aws s3 sync s3://my-bucket/data/ /data/local/     # sync from S3 to local
aws s3 ls s3://my-bucket/data/ --recursive        # list all files
aws s3 rm s3://my-bucket/tmp/ --recursive         # remove all files in prefix`}</CodeBox>
      </section>

      <Divider />

      {/* ── Part 06 — Cron Scheduling ────────────────────────────────── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 06 — Cron" />
        <SectionTitle>Cron Scheduling — Automating Pipelines on a Schedule</SectionTitle>

        <Para>
          Cron is the standard Unix scheduling system. For simple pipelines that
          do not yet warrant a full orchestration tool like Airflow, cron is often
          the fastest and most reliable way to schedule recurring jobs. Even when
          using Airflow, knowing cron syntax is essential because Airflow uses it
          for schedule intervals.
        </Para>

        <CodeBox label="Cron syntax — complete reference">{`# ── CRON SYNTAX ──────────────────────────────────────────────────────────────
# Format:  minute  hour  day_of_month  month  day_of_week  command
#            0-59  0-23      1-31      1-12      0-7
#                                               (0 and 7 both = Sunday)

# ── COMMON PATTERNS ───────────────────────────────────────────────────────────
# Every minute:
* * * * * /path/to/script.sh

# Every hour at minute 0:
0 * * * * /path/to/script.sh

# Every day at 6:00 AM:
0 6 * * * /path/to/script.sh

# Every day at 6:30 AM IST (= 1:00 AM UTC):
0 1 * * * /path/to/script.sh

# Every weekday (Mon–Fri) at 8 AM:
0 8 * * 1-5 /path/to/script.sh

# Every Monday at 7 AM:
0 7 * * 1 /path/to/script.sh

# 1st of every month at 3 AM:
0 3 1 * * /path/to/script.sh

# Every 15 minutes:
*/15 * * * * /path/to/script.sh

# Every 6 hours:
0 */6 * * * /path/to/script.sh

# At 3:15 AM on the 1st and 15th of each month:
15 3 1,15 * * /path/to/script.sh

# Airflow schedule string examples (same cron syntax):
# schedule='0 6 * * *'        → daily at 6 AM UTC
# schedule='0 */4 * * *'      → every 4 hours
# schedule='@daily'            → shorthand for 0 0 * * *
# schedule='@hourly'           → shorthand for 0 * * * *


# ── EDITING THE CRONTAB ───────────────────────────────────────────────────────
crontab -e                            # edit current user's crontab (opens in $EDITOR)
crontab -l                            # list current user's crontab
crontab -r                            # REMOVE entire crontab (careful!)
sudo crontab -u pipeline_user -e      # edit another user's crontab

# ── PRODUCTION CRONTAB BEST PRACTICES ────────────────────────────────────────
# 1. Always use absolute paths — cron has a minimal PATH:
0 6 * * * /usr/bin/python3 /data/pipelines/orders_pipeline.py

# 2. Redirect all output to a log file:
0 6 * * * /data/pipelines/run.sh >> /var/log/pipelines/orders.log 2>&1

# 3. Set environment variables explicitly — cron does not load .bashrc:
0 6 * * * source /etc/pipeline_env && /data/pipelines/run.sh

# 4. Use a wrapper script with error handling:
0 6 * * * /data/pipelines/run_with_alerting.sh orders_pipeline

# 5. Add MAILTO to send failures by email:
MAILTO=data-team@company.com
0 6 * * * /data/pipelines/run.sh

# ── SYSTEM CRONTABS ──────────────────────────────────────────────────────────
# /etc/crontab              — system-wide crontab (has extra user field)
# /etc/cron.d/              — drop-in crontab files per application
# /etc/cron.daily/          — scripts run daily by anacron
# /etc/cron.hourly/         — scripts run hourly

# System crontab format (has username field):
# min  hr  dom  month  dow  USER  command
  0    6   *    *      *    pipeline_user  /data/pipelines/run.sh


# ── DEBUGGING CRON JOBS ───────────────────────────────────────────────────────
# 1. Check if cron daemon is running:
sudo systemctl status cron   # or: sudo service cron status

# 2. Check cron logs:
grep CRON /var/log/syslog | tail -50       # Ubuntu/Debian
journalctl -u cron --since "1 hour ago"   # systemd

# 3. Common cron failure causes:
#    - Wrong PATH: add PATH=/usr/local/bin:/usr/bin:/bin at top of crontab
#    - Missing environment variables: source env file at start of script
#    - Script not executable: chmod +x script.sh
#    - Wrong timezone: cron uses UTC; add TZ=Asia/Kolkata to crontab if needed
#    - Output not captured: add >> /log/file.log 2>&1 to capture all output`}</CodeBox>
      </section>

      <Divider />

      {/* ── Part 07 — Bash Scripting ──────────────────────────────────── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 07 — Bash Scripting" />
        <SectionTitle>Bash Scripting — Writing Production Shell Scripts</SectionTitle>

        <Para>
          Bash scripts wrap data pipeline invocations with the operational logic
          that pure Python pipelines do not handle well: checking preconditions
          before running, logging start/end times, sending alerts on failure,
          locking to prevent duplicate runs, and cleaning up temporary files.
          Every production data pipeline is wrapped in at least a basic bash script.
        </Para>

        <SubTitle>The bash script template every pipeline should use</SubTitle>

        <CodeBox label="Production bash script template — the correct starting point">{`#!/usr/bin/env bash
# ─────────────────────────────────────────────────────────────────────────────
# orders_pipeline.sh — Daily orders ingestion
# Runs: 06:00 AM IST daily via cron
# Owner: data-team@company.com
# ─────────────────────────────────────────────────────────────────────────────

set -euo pipefail
# -e: exit immediately on any command failure
# -u: treat unset variables as errors (not empty string)
# -o pipefail: pipeline fails if any command in it fails (not just the last)
# This trio is the FIRST thing in every production bash script

# ── Configuration ──────────────────────────────────────────────────────────────
readonly SCRIPT_NAME="$(basename "$0")"
readonly SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
readonly LOG_DIR="/var/log/pipelines"
readonly LOG_FILE="\${LOG_DIR}/\${SCRIPT_NAME%.*}_$(date +%Y%m%d).log"
readonly LOCK_FILE="/tmp/\${SCRIPT_NAME}.lock"
readonly PYTHON_BIN="/usr/bin/python3"
readonly PIPELINE_SCRIPT="\${SCRIPT_DIR}/pipeline/orders_ingestion.py"

# ── Logging ────────────────────────────────────────────────────────────────────
log() {
    local level="$1"; shift
    echo "$(date '+%Y-%m-%d %H:%M:%S') [\${level}] $*" | tee -a "$LOG_FILE"
}
info()     { log "INFO"     "$@"; }
warning()  { log "WARNING"  "$@"; }
error()    { log "ERROR"    "$@"; }

# ── Cleanup on exit ────────────────────────────────────────────────────────────
cleanup() {
    local exit_code=$?
    rm -f "$LOCK_FILE"    # always remove lock file
    if [[ $exit_code -ne 0 ]]; then
        error "Script exited with code $exit_code"
        send_alert "Pipeline FAILED: \${SCRIPT_NAME} (exit code \${exit_code})"
    fi
    info "Cleanup complete"
}
trap cleanup EXIT    # trap: run cleanup() no matter how script exits

# ── Alert function ─────────────────────────────────────────────────────────────
send_alert() {
    local message="$1"
    # Send to Slack, PagerDuty, email — adapt to your alerting system:
    curl -s -X POST "$SLACK_WEBHOOK_URL" \
         -H 'Content-type: application/json' \
         --data "{\"text\": \"🚨 \${message}\"}" || true
    # '|| true' prevents curl failure from failing the script
}

# ── Lock file: prevent concurrent runs ────────────────────────────────────────
if [[ -f "$LOCK_FILE" ]]; then
    pid=$(cat "$LOCK_FILE")
    if kill -0 "$pid" 2>/dev/null; then
        error "Another instance is already running (PID $pid). Exiting."
        exit 1
    else
        warning "Stale lock file found (PID $pid no longer running). Removing."
        rm -f "$LOCK_FILE"
    fi
fi
echo $$ > "$LOCK_FILE"    # write current PID to lock file

# ── Precondition checks ────────────────────────────────────────────────────────
main() {
    info "==== Starting \${SCRIPT_NAME} ===="

    # Check required env variables
    : "\${DATABASE_URL:?DATABASE_URL environment variable is required}"
    : "\${API_KEY:?API_KEY environment variable is required}"
    # ':' is a no-op; '?' makes bash error with message if variable is unset

    # Check required files exist
    [[ -f "$PIPELINE_SCRIPT" ]] || { error "Pipeline script not found: $PIPELINE_SCRIPT"; exit 1; }
    [[ -d "$LOG_DIR" ]]         || mkdir -p "$LOG_DIR"

    # Check disk space (require at least 10 GB free)
    local free_gb
    free_gb=$(df -BG /data | awk 'NR==2 {print $4}' | tr -d 'G')
    if [[ $free_gb -lt 10 ]]; then
        error "Insufficient disk space: only \${free_gb}GB free (need 10GB)"
        send_alert "Pipeline blocked: disk space low (\${free_gb}GB)"
        exit 1
    fi

    # Determine run date (yesterday by default, or first argument)
    local run_date="\${1:-$(date -d 'yesterday' +%Y-%m-%d)}"
    info "Processing date: $run_date"

    # ── Run the pipeline ──────────────────────────────────────────────────────
    info "Starting Python pipeline..."
    local start_time=$SECONDS

    "$PYTHON_BIN" "$PIPELINE_SCRIPT" \
        --date "$run_date" \
        --log-level INFO \
        2>&1 | tee -a "$LOG_FILE"

    local duration=$(( SECONDS - start_time ))
    info "Pipeline completed successfully in \${duration}s"

    # ── Post-run validation ────────────────────────────────────────────────────
    local expected_min_rows=1000
    local actual_rows
    actual_rows=$(psql "$DATABASE_URL" -t -c \
        "SELECT COUNT(*) FROM silver.orders WHERE order_date = '$run_date'")
    actual_rows=$(echo "$actual_rows" | tr -d ' ')

    if [[ $actual_rows -lt $expected_min_rows ]]; then
        warning "Row count suspicious: got $actual_rows, expected at least $expected_min_rows"
        send_alert "Pipeline warning: low row count for $run_date (got $actual_rows)"
    fi

    info "==== Finished \${SCRIPT_NAME} — rows: $actual_rows ===="
}

main "$@"`}</CodeBox>

        <SubTitle>Variables, conditionals, and loops</SubTitle>

        <CodeBox label="Bash fundamentals — variables, if/else, loops, functions">{`#!/usr/bin/env bash
set -euo pipefail

# ── VARIABLES ──────────────────────────────────────────────────────────────────
name="FreshMart"
count=42
today=$(date +%Y-%m-%d)          # command substitution
files=$(ls /data/*.csv | wc -l)  # command substitution

echo "Company: $name"
echo "Count: \${count}"            # braces recommended for clarity
echo "Today: \${today}"

# Read-only variables:
readonly MAX_RETRIES=5

# Arrays:
stores=("ST001" "ST002" "ST003" "ST004" "ST005")
echo "\${stores[0]}"               # first element
echo "\${stores[@]}"               # all elements
echo "\${#stores[@]}"              # array length


# ── CONDITIONALS ──────────────────────────────────────────────────────────────
# Test file/directory existence:
if [[ -f "/data/orders.csv" ]]; then
    echo "File exists"
elif [[ -d "/data/" ]]; then
    echo "Directory exists but file does not"
else
    echo "Neither exists"
fi

# Test string comparison:
status="delivered"
if [[ "$status" == "delivered" ]]; then
    echo "Order delivered"
elif [[ "$status" == "cancelled" ]]; then
    echo "Order cancelled"
fi

# Test numeric comparison:
row_count=48234
if [[ $row_count -gt 0 ]]; then        # -gt greater than
    echo "Has rows"
fi
if [[ $row_count -ge 1000 ]]; then     # -ge greater than or equal
    echo "Enough rows"
fi
# Comparison operators: -eq -ne -gt -ge -lt -le

# Test command success/failure:
if psql "$DATABASE_URL" -c "SELECT 1" > /dev/null 2>&1; then
    echo "Database is reachable"
else
    echo "Cannot reach database"
    exit 1
fi


# ── LOOPS ─────────────────────────────────────────────────────────────────────
# For loop over array:
for store in "\${stores[@]}"; do
    echo "Processing store: $store"
    python3 process_store.py --store "$store"
done

# For loop with range:
for i in {1..10}; do
    echo "Attempt $i"
done

# C-style for loop:
for ((i=1; i<=5; i++)); do
    echo "Step $i of 5"
done

# While loop:
retry=0
max_retries=5
while [[ $retry -lt $max_retries ]]; do
    if python3 pipeline.py; then
        echo "Success on attempt $((retry+1))"
        break
    fi
    retry=$((retry+1))
    echo "Attempt $retry failed, retrying in $((2**retry))s"
    sleep $((2**retry))
done

if [[ $retry -eq $max_retries ]]; then
    echo "All $max_retries attempts failed"
    exit 1
fi

# Loop over files:
for file in /data/incoming/*.csv; do
    [[ -f "$file" ]] || continue    # skip if no files match (glob expands literally)
    echo "Processing: $file"
    process_file "$file"
done

# Loop over lines in a file:
while IFS= read -r line; do
    echo "Line: $line"
done < /data/store_list.txt


# ── FUNCTIONS ──────────────────────────────────────────────────────────────────
check_disk_space() {
    local path="\${1:-/data}"
    local min_gb="\${2:-10}"
    local free_gb

    free_gb=$(df -BG "$path" | awk 'NR==2 {print $4}' | tr -d 'G')

    if [[ $free_gb -lt $min_gb ]]; then
        echo "ERROR: insufficient disk space at $path (\${free_gb}GB < \${min_gb}GB)"
        return 1
    fi
    echo "Disk OK: \${free_gb}GB available at $path"
    return 0
}

# Call the function:
check_disk_space /data 10 || exit 1`}</CodeBox>

        <SubTitle>String manipulation in bash</SubTitle>

        <CodeBox label="Bash string operations — the patterns used in pipeline scripts">{`# ── STRING OPERATIONS ────────────────────────────────────────────────────────
filename="/data/orders_2026_03_17.csv"

# Extract filename from path (like basename):
echo "\${filename##*/}"              # orders_2026_03_17.csv

# Extract directory from path (like dirname):
echo "\${filename%/*}"               # /data

# Remove extension:
echo "\${filename%.*}"               # /data/orders_2026_03_17

# Get extension:
echo "\${filename##*.}"              # csv

# String length:
echo "\${#filename}"                 # 30

# Substring (offset:length):
date_part="2026_03_17"
echo "\${date_part:0:4}"             # 2026 (year)
echo "\${date_part:5:2}"             # 03 (month)

# Replace:
echo "\${filename/csv/parquet}"      # replace first occurrence
echo "\${filename//csv/parquet}"     # replace all occurrences

# Uppercase / lowercase:
status="Delivered"
echo "\${status^^}"                  # DELIVERED
echo "\${status,,}"                  # delivered

# ── DATE MANIPULATION IN BASH ─────────────────────────────────────────────────
today=$(date +%Y-%m-%d)            # 2026-03-17
yesterday=$(date -d 'yesterday' +%Y-%m-%d)          # 2026-03-16  (Linux)
yesterday=$(date -v-1d +%Y-%m-%d)                   # 2026-03-16  (macOS)
last_week=$(date -d '7 days ago' +%Y-%m-%d)         # 2026-03-10
first_of_month=$(date +%Y-%m-01)                    # 2026-03-01

# Formatted for log file names:
log_suffix=$(date +%Y%m%d_%H%M%S)  # 20260317_081432

# ── ARITHMETIC ────────────────────────────────────────────────────────────────
a=10
b=3
echo $((a + b))         # 13
echo $((a - b))         # 7
echo $((a * b))         # 30
echo $((a / b))         # 3 (integer division)
echo $((a % b))         # 1 (modulo)
echo $((2 ** 8))        # 256 (exponentiation)

count=0
((count++))             # increment in place
((count += 5))          # add 5 in place`}</CodeBox>
      </section>

      <Divider />

      {/* ── Part 08 — Environment and Config ─────────────────────────── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 08 — Environment and Configuration" />
        <SectionTitle>Environment Variables, PATH, and Shell Config</SectionTitle>

        <Para>
          Data engineering pipelines rely heavily on environment variables for
          configuration — database URLs, API keys, output paths, and feature flags.
          Understanding how the Linux environment works prevents configuration
          bugs that manifest only in production (where cron runs) and not
          in development (where you manually source your dotfiles).
        </Para>

        <CodeBox label="Environment variables — setting, reading, and managing them">{`# ── READING AND SETTING ENV VARS ─────────────────────────────────────────────
echo $HOME                          # print variable
echo \${DATABASE_URL:-not_set}       # print with default if unset
printenv                            # print all environment variables
printenv DATABASE_URL               # print specific variable
env                                 # same as printenv

# Set a variable (current shell only):
export DATABASE_URL="postgresql://user:pass@localhost:5432/orders"
export API_KEY="rzp_live_xxxx"

# Set for one command only (does not persist):
DEBUG=true python3 pipeline.py

# Unset a variable:
unset DATABASE_URL

# ── LOADING ENV FILES ─────────────────────────────────────────────────────────
# In development: load from .env file
# IMPORTANT: .env should be in .gitignore

# Method 1: source the file (variables become part of current shell):
source /etc/pipeline_environment
. /etc/pipeline_environment   # same thing (. is alias for source)

# Method 2: export all variables from a file:
set -a    # automatically export all variables
source .env
set +a    # stop auto-exporting

# Method 3: read file in a script safely (ignore comments and blank lines):
while IFS='=' read -r key value; do
    [[ "$key" =~ ^[[:space:]]*# ]] && continue  # skip comments
    [[ -z "$key" ]] && continue                  # skip blank lines
    export "$key=$value"
done < .env

# ── UNDERSTANDING PATH ────────────────────────────────────────────────────────
echo $PATH               # colon-separated list of directories to search for commands
which python3            # which binary will run when you type python3?
type python3             # same, with more detail

# Add a directory to PATH permanently (add to ~/.bashrc or ~/.bash_profile):
export PATH="/usr/local/bin:$PATH"           # prepend (checked first)
export PATH="$PATH:/opt/custom_tools"        # append (checked last)

# ── SHELL STARTUP FILES ───────────────────────────────────────────────────────
# ~/.bashrc          — executed for every non-login interactive shell
# ~/.bash_profile    — executed for login shells (SSH sessions)
# ~/.profile         — fallback if .bash_profile not found
# /etc/profile       — system-wide login shell config
# /etc/bash.bashrc   — system-wide .bashrc equivalent

# IMPORTANT FOR DATA ENGINEERS:
# Cron jobs run in a minimal environment — they do NOT source ~/.bashrc
# Variables set in ~/.bashrc are NOT available to cron
# Solutions:
#   1. Source the file explicitly in your cron command:
#      0 6 * * * source ~/.bashrc && python3 pipeline.py
#   2. Set variables in a dedicated env file and source it in your script:
#      source /etc/pipeline_environment
#   3. Set variables at the top of the crontab:
#      DATABASE_URL=postgresql://...
#      0 6 * * * python3 pipeline.py

# ── USEFUL ENVIRONMENT TRICKS ─────────────────────────────────────────────────
# Check if a command exists before using it:
if command -v aws &>/dev/null; then
    echo "AWS CLI is installed"
    aws s3 sync ...
else
    echo "AWS CLI not found — install it first"
    exit 1
fi

# Get script's own directory reliably (works even with symlinks and sourcing):
SCRIPT_DIR="$(cd "$(dirname "\${BASH_SOURCE[0]}")" && pwd)"

# Check if running as root:
if [[ $EUID -eq 0 ]]; then
    echo "Running as root"
fi

# Check operating system:
if [[ "$(uname)" == "Darwin" ]]; then
    echo "macOS"
elif [[ "$(uname)" == "Linux" ]]; then
    echo "Linux"
fi`}</CodeBox>
      </section>

      <Divider />

      {/* ── Part 09 — Real World ─────────────────────────────────────── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 09 — Real World" />
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
            Scenario — On-call DE · Pipeline alert fired at 06:47 AM
          </div>

          <Para>
            You receive a PagerDuty alert at 6:47 AM: "orders_pipeline has not
            completed by 06:45 AM SLA." You SSH into the pipeline server. Here is
            the exact sequence of Linux commands you run to diagnose and fix it.
          </Para>

          <CodeBox label="Full diagnostic session — exactly what you run and why">{`# Step 1: Check if the process is still running or crashed
ps aux | grep orders_pipeline
# Output:
# pipeline 18734  98.2  4.1  python3 orders_pipeline.py --date 2026-03-17
# → It IS running but at 98% CPU — something is wrong

# Step 2: Check how long it has been running
ps -p 18734 -o pid,etime,pcpu,pmem,cmd
# Output:
# PID   ELAPSED   %CPU  %MEM  CMD
# 18734  02:14:32  98.2   4.1  python3 orders_pipeline.py
# → Running for 2 hours 14 minutes — should finish in 30 minutes

# Step 3: Check disk space (full disk is a common silent killer)
df -h /data
# Output:
# Filesystem  Size  Used  Avail  Use%  Mounted on
# /dev/sdb1   500G  499G   512M   99%  /data
# → DISK IS FULL! 512 MB free on /data

# Step 4: Find what is consuming the space
du -sh /data/* | sort -rh | head -10
# Output:
# 487G  /data/raw
#   8G  /data/processed
#   2G  /data/logs
#   1G  /data/tmp

du -sh /data/raw/* | sort -rh | head -10
# 312G  /data/raw/2026
# 175G  /data/raw/2025

du -sh /data/raw/2026/* | sort -rh
# 288G  /data/raw/2026/03
#  24G  /data/raw/2026/02

du -sh /data/raw/2026/03/* | sort -rh
# 288G  /data/raw/2026/03/17
# → Today's date has 288 GB! A runaway process wrote too much data

# Step 5: Find the culprit files
ls -lth /data/raw/2026/03/17/ | head -20
# -rw-r--r-- 1 pipeline pipeline 288G Mar 17 06:28 orders_debug_dump.csv
# → A 288 GB debug dump file was accidentally enabled

# Step 6: Check the log to confirm
tail -100 /var/log/pipelines/orders_pipeline_20260317.log | grep -i debug
# 2026-03-17 04:32:14 WARNING DEBUG_MODE=true detected — writing full row dump

# Step 7: Kill the stuck pipeline gracefully
kill -15 18734     # SIGTERM first
sleep 5
kill -0 18734 2>/dev/null && kill -9 18734    # force if still alive

# Step 8: Free the disk — delete the debug dump
rm /data/raw/2026/03/17/orders_debug_dump.csv
df -h /data
# Now shows 212G available — problem resolved

# Step 9: Fix the config and restart
sed -i 's/DEBUG_MODE=true/DEBUG_MODE=false/' /etc/pipelines/orders.env
python3 /data/pipelines/orders_pipeline.py --date 2026-03-17 \
    >> /var/log/pipelines/orders_pipeline_20260317.log 2>&1 &
echo "Restarted with PID $!"

# Step 10: Monitor the restart
tail -f /var/log/pipelines/orders_pipeline_20260317.log | grep -E "INFO|ERROR"
# Watch for normal progress messages...
# 2026-03-17 07:03:41 INFO Batch 1 complete: 10000 rows
# 2026-03-17 07:04:28 INFO Batch 2 complete: 10000 rows`}</CodeBox>

          <Para>
            Total time from alert to resolution: 22 minutes. Every command used
            in this diagnosis was from this module. A data engineer who knows
            these Linux tools reaches the root cause in minutes. One who does not
            might spend hours opening tickets, waiting for escalations, or guessing.
          </Para>
        </div>
      </section>

      <Divider />

      {/* ── Part 10 — Interview Prep ─────────────────────────────────── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 10 — Interview Prep" />
        <SectionTitle>5 Interview Questions — With Complete Answers</SectionTitle>

        {[
          {
            q: 'Q1. A pipeline process on a Linux server appears to be running but is making no progress. How do you investigate?',
            a: `I would work through a systematic sequence of checks, starting with the simplest possibilities.

First, verify the process is actually running and check its resource usage: ps aux | grep pipeline_name or watch it in top. Look at CPU percentage (near 0% might mean it is waiting for I/O or a lock; near 100% might mean it is in a compute loop), memory usage (high and growing might mean a memory leak or unexpectedly large data), and the process state in the STAT column (D means waiting for disk I/O, S means sleeping, R means actively running).

Second, check disk space: df -h. A full disk is the single most common cause of pipelines that appear running but are actually stuck — write operations block indefinitely when the filesystem is full. Find the space consumer with du -sh /data/* | sort -rh.

Third, check the process's file handles to see what it is waiting on: lsof -p PID. If it has a file open with no recent modification time (stat the file), it may be waiting for a read that never completes.

Fourth, look at the pipeline's own log file: tail -f /var/log/pipelines/pipeline.log. A well-instrumented pipeline logs its progress. If the last log entry was 90 minutes ago for a batch operation that normally logs every 5 minutes, that tells you exactly where it stalled.

Fifth, if the pipeline connects to a database, check for lock waits on the database side using pg_stat_activity — the process may be blocked waiting for a database lock held by another transaction.`,
          },
          {
            q: 'Q2. What does set -euo pipefail do in a bash script and why should every production script use it?',
            a: `These three settings change bash's default error handling from "permissive and silent" to "strict and loud" — the correct behaviour for production pipeline scripts.

-e (errexit) causes the script to exit immediately when any command returns a non-zero exit code. Without this, bash continues executing the next line even after a failure. A script that runs a database migration that fails would, without -e, continue to the next step and potentially corrupt data or produce wrong results while appearing to succeed.

-u (nounset) causes the script to exit with an error when it tries to use an undefined variable, treating it as an error instead of substituting an empty string. Without this, a typo like $DATABSE_URL instead of $DATABASE_URL silently passes an empty string to the database connection command, producing a confusing connection error instead of a clear "variable not set" error.

-o pipefail changes how pipes handle failures. By default, a pipe like command1 | command2 succeeds if the last command (command2) succeeds, even if command1 failed. This means if the first command silently fails and produces no output, command2 may process empty input and succeed. With pipefail, the pipe fails if any command in it fails.

Together these three settings ensure that a script stops at the first sign of trouble with a clear error, rather than continuing through failures silently. The combination set -euo pipefail should be the second line of every production bash script, right after the shebang.`,
          },
          {
            q: 'Q3. How do you find the top 10 largest files on a server and delete files older than 7 days from a temporary directory?',
            a: `To find the top 10 largest files anywhere under /data, combine find with du and sort: find /data -type f | xargs du -sh | sort -rh | head -10. The -type f filters to regular files only (excludes directories), -rh sorts by human-readable size in reverse (largest first), and head -10 limits to 10 results.

Alternatively, for a directory summary rather than individual files: du -sh /data/* | sort -rh | head -10 gives the size of each top-level item under /data, which is faster for finding large directories.

To delete files older than 7 days from /data/tmp: find /data/tmp -type f -mtime +7 -delete. The -mtime +7 matches files with a modification time more than 7 days ago (the + means "more than"), and -delete removes them immediately. Always run the command without -delete first to verify what would be removed: find /data/tmp -type f -mtime +7 | head -20 shows you a sample before you commit.

A more cautious pattern for production: find /data/tmp -type f -mtime +7 -exec rm -v {} \; logs each deletion with the -v flag to rm, giving an audit trail. I would add this as a cron job that runs daily: 0 2 * * * find /data/tmp -type f -mtime +7 -delete >> /var/log/cleanup.log 2>&1.`,
          },
          {
            q: 'Q4. A cron job that works fine when run manually fails when run by cron. What are the most common causes?',
            a: `This is one of the most common Linux debugging problems and almost always has one of four causes.

The most common cause is PATH. When you run a command manually, your shell has a rich PATH from your .bashrc or .bash_profile — /usr/local/bin, /usr/bin, ~/bin, and so on. Cron runs with a minimal default PATH of /usr/bin:/bin. If your script calls python3 and it is installed in /usr/local/bin (not in cron's PATH), cron cannot find it and fails. The fix is to use absolute paths in cron jobs: /usr/local/bin/python3 /path/to/pipeline.py, or to set PATH explicitly at the top of the crontab.

The second most common cause is missing environment variables. Variables set in your .bashrc (API keys, DATABASE_URL, AWS credentials) are available in your interactive shell but not in cron's minimal environment. The fix is to source an environment file at the start of the script: source /etc/pipeline_environment, or to set the variables at the top of the crontab file itself.

The third cause is working directory. Cron runs with HOME as the working directory, not the directory of your script. Any relative path in the script points to HOME, not to the script's directory. Fix: use absolute paths throughout, or cd to the script's directory at the start: cd "$(dirname "$0")".

The fourth cause is output not captured. Cron captures and emails stdout and stderr by default, but many systems have no mail configured, so output is silently dropped. If you need to see what happened, redirect output explicitly: command >> /var/log/myjob.log 2>&1.`,
          },
          {
            q: 'Q5. How would you use Linux commands to quickly check the quality of a newly arrived CSV file before running a pipeline against it?',
            a: `A quick data quality check on a CSV file using only Linux tools covers five things: structure, size, encoding, null handling, and basic value distributions.

First, check the file exists and is non-empty: ls -lah /data/incoming/orders.csv gives size, modification time, and permissions. If the file is 0 bytes or missing, stop immediately.

Second, check the structure — does every row have the same number of columns? awk -F',' '{print NF}' orders.csv | sort | uniq -c should return exactly one line showing the column count for all rows. Multiple different values mean some rows are malformed.

Third, inspect the header and first few rows: head -5 orders.csv shows whether the header row matches expectations and whether the data looks reasonable. Check for encoding issues visible as garbled characters.

Fourth, check for encoding explicitly: file orders.csv returns "ASCII text" or "UTF-8 Unicode text" or "ISO-8859 text" — the last one requires conversion before processing.

Fifth, spot-check key columns. For a numeric column like order_amount: awk -F',' 'NR>1 {print $3}' orders.csv | grep -v '^[0-9.]*$' | head -20 finds non-numeric values in that column. Any output means data quality issues. For a categorical column like status: cut -d',' -f4 orders.csv | sort | uniq -c shows the distribution of values — unexpected values jump out immediately.

This entire check takes about two minutes and catches the most common ingestion-breaking issues before the pipeline runs.`,
          },
        ].map((item, i) => (
          <div key={i} style={{
            background: 'var(--surface)', border: '1px solid var(--border)',
            borderRadius: 12, padding: '24px 28px', marginBottom: 20,
          }}>
            <div style={{ fontSize: 14, fontWeight: 800, color: 'var(--text)', marginBottom: 14, lineHeight: 1.4 }}>
              {item.q}
            </div>
            <div style={{ fontSize: 14, color: 'var(--muted)', lineHeight: 1.85, whiteSpace: 'pre-line' }}>
              {item.a}
            </div>
          </div>
        ))}
      </section>

      <Divider />

      {/* ── Error Library ────────────────────────────────────────────── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Error Library" />
        <SectionTitle>Errors You Will Hit — And Exactly Why They Happen</SectionTitle>

        {[
          {
            error: `bash: /data/pipelines/run.sh: Permission denied — when trying to execute a shell script`,
            cause: 'The script file does not have the execute permission bit set. A shell script is a text file — Linux requires explicit execute permission to run it as a program. Files created by copying, downloading with wget/curl, or checked out from git often do not have execute permissions.',
            fix: 'Add execute permission: chmod +x /data/pipelines/run.sh or chmod 755 /data/pipelines/run.sh. To verify: ls -lah /data/pipelines/run.sh — you should see an x in the permissions column (-rwxr-xr-x). If the script is in a version-controlled repository, commit the permission change: git update-index --chmod=+x run.sh.',
          },
          {
            error: `Cron job fails silently — no output, no error, cron log shows job ran but nothing happened`,
            cause: 'Cron ran the job, the job failed (non-zero exit code), but output was not captured anywhere. Cron tries to email output to the system user, but most servers have no mail configured, so output is silently discarded. The job may have failed due to missing PATH, unset environment variables, wrong working directory, or any other error — but since output is not logged, there is no trace.',
            fix: 'Add output redirection to the crontab entry: 0 6 * * * /path/to/script.sh >> /var/log/myjob.log 2>&1. The 2>&1 captures both stdout and stderr. Review the log file after the next run. Add set -euo pipefail to the script so any failure causes a non-zero exit. Also add MAILTO="" to the crontab to suppress email attempts, and use a real alerting mechanism (curl to Slack) in the script itself.',
          },
          {
            error: `find: WARNING: Hard link count is wrong for /data/nfs (nlink=X, counted=Y) — when running find on an NFS mount`,
            cause: 'The NFS filesystem does not maintain accurate hard link counts for directories, which find uses to optimise its traversal. This is a known limitation of certain NFS implementations and causes find to emit warnings but does not affect the correctness of results in most cases.',
            fix: 'Add the -noleaf option to find: find -noleaf /data/nfs -name "*.parquet". This tells find not to use hard link count optimisations, which is slower but eliminates the warning and works correctly on NFS and other filesystems that do not maintain accurate link counts.',
          },
          {
            error: `xargs: argument line too long — when piping a large number of files to xargs`,
            cause: 'The command line being constructed by xargs exceeds the operating system\'s ARG_MAX limit (typically 2 MB). This happens when there are thousands of files being processed in a single xargs invocation — all the filenames together exceed the maximum command line length.',
            fix: 'Use xargs -n 100 to process 100 files per command invocation instead of all at once: find /data -name "*.csv" | xargs -n 100 wc -l. Alternatively, use find with -exec directly: find /data -name "*.csv" -exec wc -l {} + which handles batching automatically. The + at the end tells find to batch multiple files per exec invocation.',
          },
          {
            error: `Script continues executing after a failed command instead of stopping — set -e seems not to work`,
            cause: 'set -e does not cause exit on failure for commands in certain contexts: commands in an if condition (if failed_command; then...), commands followed by || or &&, commands in a while/until condition, and commands in a subshell where the subshell exit code is handled. This is documented but counterintuitive behaviour.',
            fix: 'For commands in if statements, check the return code explicitly: result=$(some_command) || { echo "Command failed"; exit 1; }. For pipeline commands, use set -o pipefail in combination with -e to catch failures in any pipeline stage. For the most critical commands, use explicit error checking regardless of set -e: command || { log_error "Command failed with $?"; exit 1; }. Document these exceptions in comments so future maintainers understand why explicit checks are needed.',
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
              <span style={{
                fontSize: 10, fontWeight: 700, color: 'var(--muted)',
                fontFamily: 'var(--font-mono)', letterSpacing: '.1em', textTransform: 'uppercase',
              }}>Cause: </span>
              <span style={{ fontSize: 13, color: 'var(--muted)', lineHeight: 1.7 }}>{item.cause}</span>
            </div>
            <div>
              <span style={{
                fontSize: 10, fontWeight: 700, color: 'var(--accent)',
                fontFamily: 'var(--font-mono)', letterSpacing: '.1em', textTransform: 'uppercase',
              }}>Fix: </span>
              <span style={{ fontSize: 13, color: 'var(--muted)', lineHeight: 1.7 }}>{item.fix}</span>
            </div>
          </div>
        ))}
      </section>

      {/* ── Key Takeaways ────────────────────────────────────────────── */}
      <KeyTakeaways items={[
        'Every data pipeline runs on Linux. SSH, navigate, inspect files, check disk usage, and read logs — these are the first actions in every on-call incident. du -sh and df -h diagnose disk problems in seconds. tail -f follows logs in real time. find locates files by name, age, or size.',
        'grep, awk, sed, and cut are the fastest tools for log analysis. grep -E with multiple patterns, -C for context lines, and -v for exclusion. awk processes column-by-column with calculations. sed substitutes and deletes in-place. Pipe them together: cut | sort | uniq -c | sort -rn gives frequency distributions in one line.',
        'Linux file permissions are three sets of rwx for owner, group, and others. 755 for executable scripts, 644 for config files, 600 for secret files. chmod +x adds execute permission. Always diagnose "Permission denied" errors with ls -lah to read the permission bits.',
        'kill -15 (SIGTERM) requests graceful shutdown — the pipeline can clean up. kill -9 (SIGKILL) forces immediate termination with no cleanup — open files may be corrupted. Always try SIGTERM first. nohup command & runs a process that survives shell logout.',
        'Every production bash script must start with set -euo pipefail. -e exits on any command failure. -u errors on unset variables. -o pipefail fails the whole pipeline if any stage fails. Without these, bash silently continues through errors.',
        'Cron runs in a minimal environment — it does not load .bashrc. Always use absolute paths in cron commands. Always redirect output: command >> /log/file.log 2>&1. Always set required environment variables explicitly in the script or at the top of the crontab. Use cron -e to edit and grep CRON /var/log/syslog to debug.',
        'The production bash script template includes: set -euo pipefail, a logging function, a trap for cleanup on exit, a lock file to prevent duplicate runs, precondition checks (disk space, env variables, file existence), output redirection, and post-run validation.',
        'rsync is more efficient than scp for directory synchronisation — it only transfers changed files. Use --dry-run to preview before executing. Use --delete to keep destination in sync. curl -H "Authorization: Bearer $TOKEN" handles authenticated API downloads. aws s3 sync handles S3 directory synchronisation.',
        'For text processing at scale: pipe composition is the key. Each tool does one thing well — grep filters, cut extracts columns, sort orders, uniq -c counts, head limits. Chaining them with pipes builds powerful one-line analyses without writing a single Python script.',
        'The diagnostic sequence for a stuck pipeline: ps aux to check it is running, df -h to check disk, du -sh to find the space consumer, lsof -p PID to check open files, tail -f on the log file to see last activity, and pg_stat_activity to check for database lock waits. These five checks diagnose 90% of production pipeline failures.',
      ]} />

    </LearnLayout>
  )
}