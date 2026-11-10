import { LearnLayout } from '@/components/content/LearnLayout'
import { Callout, Code, H3, KeyTakeaways, Mistakes, NextLesson, P, Part, Practice, Steps, Table } from '@/components/content/LessonKit'

export default function BashScripting() {
  return (
    <LearnLayout
      title="Bash Scripting for Automation"
      description="Write safe Bash scripts with variables, conditionals, loops, functions, exit codes, and cron scheduling."
      section="DevOps & Cloud Infrastructure — Lesson 02"
      readTime="35 min"
    >
      <Part n={1} label="From commands to automation" title="A Script Is a Repeatable Procedure">
        <P>
          The previous lesson used commands interactively to inspect Linux. A script puts a known sequence of commands in a
          file so a teammate or scheduled job can run it consistently. Good automation is predictable: it checks its inputs,
          prints useful context, and returns a status that another program can understand. Bash is especially useful for
          wiring together system tools; it is not a substitute for a full programming language when data structures or
          complex application logic are required.
        </P>
        <P>
          A script begins with an interpreter line, commonly <code>#!/usr/bin/env bash</code>. Save it as a file, make it
          executable for its owner, and run it from a known directory. You can also invoke <code>bash script.sh</code> without
          changing its mode. Do not assume the script starts in the folder containing it: automation tools often use a
          different working directory.
        </P>
        <Code lang="bash" code={`
#!/usr/bin/env bash
printf 'Hello from %s\\n' "$(hostname)"
`} />
        <Callout type="info">
          Keep shell scripts small and explicit. A short script that is easy to review is safer to operate than a clever one
          with hidden assumptions about paths, privileges, or the user's environment.
        </Callout>
      </Part>

      <Part n={2} label="Inputs and quoting" title="Variables, Arguments, and Environment">
        <P>
          Assign a value without spaces around the equals sign, then expand it with a dollar sign. Quote expansions in most
          command arguments: double quotes preserve the value as one argument even when it contains spaces, while unquoted
          expansions may undergo word splitting and wildcard expansion. Single quotes preserve literal characters. Positional
          parameters such as <code>$1</code> and <code>$2</code> are script arguments; <code>$#</code> is their count and
          <code> "$@"</code> forwards them safely as separate arguments.
        </P>
        <Code lang="bash" code={`
#!/usr/bin/env bash
set -euo pipefail

service_name="\${1:-my-api}"
log_dir="\${LOG_DIR:-./logs}"
printf 'Checking service=%s logs=%s\\n' "$service_name" "$log_dir"
printf 'Argument count: %s\\n' "$#"
`} />
        <P>
          The <code>${'{'}name:-fallback{'}'}</code> form supplies a default when a variable is unset or empty; the
          <code>${'{'}name:?message{'}'}</code> form stops with a clear error if a required value is missing. In the example,
          <code> LOG_DIR</code> can be configured by the caller without embedding machine-specific paths in the script.
          Never echo secrets into logs just because they arrived through the environment.
        </P>
        <Table
          head={['Syntax', 'Meaning', 'Typical use']}
          rows={[
            ['$name or ${name}', 'Expand a variable', 'Use "$name" as one argument'],
            ['${name:-value}', 'Use a default if unset or empty', 'Optional output directory'],
            ['${name:?message}', 'Fail if unset or empty', 'Require a configured endpoint'],
            ['$#', 'Number of positional arguments', 'Validate a script interface'],
            ['$@', 'All positional arguments separately', 'Forward arguments to another command'],
          ]}
        />
      </Part>

      <Part n={3} label="Decisions" title="Conditionals and Exit Status">
        <P>
          Commands return an exit status: zero conventionally means success, and a non-zero value means some kind of failure.
          Bash exposes the previous command's status in <code>$?</code>, but capture it immediately because the next command
          overwrites it. In a conditional, Bash can test a command directly, or use <code>[[ ... ]]</code> for string and
          file checks. Quote variables and distinguish string comparison from numeric comparison.
        </P>
        <Code lang="bash" code={`
#!/usr/bin/env bash
set -euo pipefail

config_file="\${1:?usage: check-config.sh PATH}"
if [[ -f "$config_file" && -r "$config_file" ]]; then
  printf 'Readable config: %s\\n' "$config_file"
else
  printf 'Config is missing or unreadable: %s\\n' "$config_file" >&2
  exit 2
fi
`} />
        <P>
          Use a documented exit code for a known failure where it helps the caller distinguish cases. Send diagnostics to
          standard error with <code>&gt;&amp;2</code>; keep standard output for results that another command may consume. A
          script should exit non-zero when the operation it promised did not happen, rather than printing a friendly message
          and letting a scheduler report success.
        </P>
        <Callout type="tip">
          Add an explicit usage message before doing work. A script that says what argument it needs is easier to operate at
          2 a.m. than one that fails later with an obscure missing-file error.
        </Callout>
      </Part>

      <Part n={4} label="Repetition" title="Loops and Functions Keep Work Consistent">
        <P>
          A <code>for</code> loop can process a fixed list or every argument. A <code>while</code> loop repeats while a
          condition succeeds. Functions give a name to a small operation and make the main script read like a sequence of
          steps. Local variables prevent accidental changes to variables elsewhere in the script. Functions return exit
          statuses; use <code>return</code> for a function and <code>exit</code> to stop the whole script.
        </P>
        <Code lang="bash" code={`
#!/usr/bin/env bash
set -euo pipefail

check_file() {
  local path="$1"
  if [[ -f "$path" ]]; then
    printf 'OK: %s\\n' "$path"
  else
    printf 'Missing: %s\\n' "$path" >&2
    return 1
  fi
}

if (( $# == 0 )); then
  printf 'usage: check-files.sh PATH...\n' >&2
  exit 2
fi

for required_file in "$@"; do
  check_file "$required_file"
done
`} />
        <Steps items={[
          'Define the script contract: required arguments, optional configuration, and expected result.',
          'Validate required inputs before changing files or starting services.',
          'Put repeated checks in a function with a clear success or failure status.',
          'Run with representative valid and invalid inputs and inspect both output and exit status.',
        ]} />
      </Part>

      <Part n={5} label="Strict mode" title="What set -euo pipefail Does—and Does Not Do">
        <P>
          Many Bash scripts start with <code>set -euo pipefail</code>. <code>-u</code> treats an unset variable as an error,
          helping catch typos. <code>pipefail</code> makes a pipeline fail if a command before the last command fails.
          <code>-e</code> exits in many unhandled-error cases, but Bash has exceptions around conditionals, lists, and
          functions. Strict mode is a useful guardrail, not a proof of correctness. Still check expected failures explicitly,
          quote expansions, and give cleanup code careful thought.
        </P>
        <Code lang="bash" code={`
#!/usr/bin/env bash
set -euo pipefail

if grep -q 'ready' ./service-health.txt; then
  printf 'Service is ready\\n'
else
  printf 'Service is not ready\\n' >&2
  exit 1
fi
`} />
        <P>
          A command that may legitimately find no match belongs in an explicit conditional, rather than being allowed to
          terminate the script unexpectedly. Avoid turning off error handling for a large block; handle the specific command
          and document why a non-zero status is acceptable. For a pipeline, <code>pipefail</code> helps prevent an upstream
          read failure from looking like a successful final count.
        </P>
        <Callout type="warning">
          Never add <code>set -e</code> and assume all errors are handled. Test failure paths, check the status of important
          commands explicitly, and avoid continuing after a failed backup, deployment, or file operation.
        </Callout>
      </Part>

      <Part n={6} label="Hands-on script" title="Rotate a Small Set of Application Logs">
        <P>
          Rotation prevents one active log file from growing without bound. The script below handles a single application
          log directory: it validates the directory and numeric retention count, copies the active log to a dated archive,
          truncates the original file in place, and removes old archives only after the configured retention threshold. In
          production, prefer the operating system's <code>logrotate</code> service when it fits; a custom script needs careful
          ownership, scheduling, locking, and failure monitoring.
        </P>
        <Code lang="bash" file="rotate-app-log.sh" code={`
#!/usr/bin/env bash
set -euo pipefail

log_dir="\${LOG_DIR:-./var/log/my-api}"
keep="\${KEEP_ROTATIONS:-7}"
active_log="$log_dir/app.log"

log() {
  printf '[%s] %s\\n' "$(date -Is)" "$*"
}

if [[ ! "$keep" =~ ^[1-9][0-9]*$ ]]; then
  printf 'KEEP_ROTATIONS must be a positive integer\\n' >&2
  exit 2
fi
if [[ ! -d "$log_dir" ]]; then
  printf 'Log directory does not exist: %s\\n' "$log_dir" >&2
  exit 2
fi
if [[ ! -f "$active_log" ]]; then
  log "No active log at $active_log; nothing to rotate"
  exit 0
fi

archive="$log_dir/app-$(date +%Y%m%d-%H%M%S).log"
cp -- "$active_log" "$archive"
: > "$active_log"
log "Archived active log to $archive"

shopt -s nullglob
archives=("$log_dir"/app-*.log)
if (( \${#archives[@]} > keep )); then
  # Sort names so the oldest timestamped archives are removed first.
  mapfile -t sorted_archives < <(printf '%s\\n' "\${archives[@]}" | sort)
  remove_count=$(( \${#sorted_archives[@]} - keep ))
  for (( index=0; index<remove_count; index++ )); do
    rm -- "\${sorted_archives[index]}"
    log "Removed expired archive \${sorted_archives[index]}"
  done
fi
`} />
        <P>
          The script uses an array so each archive remains a separate path even if a directory name contains spaces. The
          <code> nullglob</code> option makes an unmatched pattern expand to an empty list rather than a literal filename.
          The active log is truncated in place so a process holding an open file descriptor can continue writing to it.
          This simple example does not coordinate concurrent runs; use a lock or a managed rotation tool for unattended use.
        </P>
        <Callout type="example">
          Try it only in a dedicated test directory that you own. Set <code>LOG_DIR</code> to that test location and inspect
          the archive list before and after each run; never point a practice script at a production log directory.
        </Callout>
      </Part>

      <Part n={7} label="Scheduling" title="Cron Needs an Explicit Environment">
        <P>
          Cron runs commands on a schedule, but it does not load the same interactive shell setup as a terminal. Use absolute
          paths for the script and important tools, configure required environment variables deliberately, and send output to
          a log or a monitoring destination. A cron expression specifies minute, hour, day of month, month, and day of week;
          check the host's manual because cron implementations and time-zone settings can differ.
        </P>
        <Code lang="bash" file="crontab entry" code={`
# Run every day at 02:15 using an explicit working directory and config.
15 2 * * * cd /srv/my-api && LOG_DIR=/var/log/my-api KEEP_ROTATIONS=7 /srv/my-api/bin/rotate-app-log.sh >> /var/log/my-api/rotation.log 2>&1
`} />
        <P>
          Decide how overlapping runs are prevented, who receives failures, and how long the rotation log itself is retained.
          If a job is business-critical, use a scheduler with visible run history and alerting rather than relying only on a
          text entry in a crontab. The operator should be able to tell the last successful run from silence.
        </P>
        <Table
          head={['Concern', 'Question to answer', 'Safer practice']}
          rows={[
            ['Environment', 'Will PATH and variables exist?', 'Set required values explicitly'],
            ['Working directory', 'Where will relative paths point?', 'Use absolute paths or cd deliberately'],
            ['Overlap', 'Can two runs execute together?', 'Use a lock or scheduler concurrency control'],
            ['Failure visibility', 'Who notices a non-zero exit?', 'Capture logs and alert on missed runs'],
          ]}
        />
      </Part>

      <Part n={8} label="Pitfalls" title="Common Mistakes">
        <Mistakes items={[
          { mistake: 'Writing path="$1" without quotes at use sites', cause: 'Spaces or wildcard characters in a path can split or expand unexpectedly.', fix: 'Quote expansions and forward arguments as "$@".' },
          { mistake: 'Assuming every non-zero status is a script bug', cause: 'Search tools and conditional checks may use non-zero to mean no match.', fix: 'Handle expected statuses explicitly in if statements.' },
          { mistake: 'Assuming strict mode makes a script safe', cause: 'Bash has contexts where -e does not stop execution as expected.', fix: 'Validate inputs, test failure cases, and check critical command results.' },
          { mistake: 'Running a rotation script with an unreviewed directory', cause: 'Cleanup code can permanently remove files.', fix: 'Test with disposable data and enforce an expected directory before cleanup.' },
        ]} />
      </Part>

      <Part n={9} label="Practice" title="Make Automation Observable and Safe">
        <Practice
          title="Build and test an operations helper"
          tasks={[
            'Write a script that requires one directory argument and exits with a usage message when it is missing.',
            'Add a function that checks whether a required file exists and returns a meaningful status.',
            'Use a loop to validate several required filenames without breaking paths containing spaces.',
            'Run the log-rotation example against a disposable directory with more archives than the retention setting.',
            'Temporarily use an invalid retention value and confirm the script fails before changing any files.',
            'Document how you would schedule the script and alert when it exits unsuccessfully.',
          ]}
          hint="Run bash script.sh, then immediately run echo $? to inspect its exit status."
        />
      </Part>

      <KeyTakeaways items={[
        'A shell script should define its inputs, output, and success or failure status clearly.',
        'Quote variable expansions and pass argument lists with "$@" to preserve spaces safely.',
        'Conditionals, loops, and functions let scripts validate inputs and keep repeated work consistent.',
        'set -euo pipefail catches useful classes of mistakes but does not replace explicit error handling.',
        'Test destructive cleanup against disposable data and validate paths before changing files.',
        'Scheduled jobs need explicit paths, environment, logging, overlap control, and failure visibility.',
      ]} />

      <H3>Next</H3>
      <NextLesson
        href="/learn/devops-mlops/git-github-essentials"
        label="Lesson 03 · Git and GitHub — Commits, Branches and Pull Requests"
        text="You can automate repeatable system tasks. Next, use version control to review, share, and safely undo changes to the scripts and application code."
      />
    </LearnLayout>
  )
}
