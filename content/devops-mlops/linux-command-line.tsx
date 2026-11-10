import { LearnLayout } from '@/components/content/LearnLayout'
import { Callout, Code, H3, KeyTakeaways, Mistakes, NextLesson, P, Part, Practice, Steps, Table } from '@/components/content/LessonKit'

export default function LinuxCommandLine() {
  return (
    <LearnLayout
      title="Linux Command Line Essentials"
      description="Navigate the file system, manage files, permissions, processes, and packages, and read logs from a Linux terminal."
      section="DevOps & Cloud Infrastructure — Lesson 01"
      readTime="40 min"
    >
      <Part n={1} label="Why the terminal matters" title="A Linux Server Is a Set of Files and Processes">
        <P>
          Linux runs on cloud virtual machines, containers, CI workers, and many production services. A graphical desktop is
          useful for a personal computer, but a server is often managed remotely through a text terminal. The shell reads a
          command, asks the operating system to perform it, and prints the result. Learning a few dependable commands lets
          you inspect a service, find a configuration file, and diagnose a problem without guessing.
        </P>
        <P>
          Commands are small programs. Their arguments usually identify the target or change the operation, and options often
          begin with a dash. The current directory is part of the context: a relative path is interpreted from there, while
          an absolute path starts at the root directory <code>/</code>. Use <code>pwd</code> to check that context before
          commands that modify files.
        </P>
        <Table
          head={['Path', 'Purpose', 'Typical contents']}
          rows={[
            ['/', 'Filesystem root', 'Top-level directories, not a regular user home'],
            ['/home/learner', 'User home directory', 'Personal files and project checkouts'],
            ['/etc', 'System configuration', 'Service and machine configuration files'],
            ['/var/log', 'Variable data and logs', 'Logs and other changing service data'],
            ['/tmp', 'Temporary working space', 'Short-lived files; do not store durable state here'],
          ]}
        />
        <Callout type="info">
          <strong>Use least privilege.</strong> Start as your ordinary user. A root shell can change any system file, so
          elevated access should be limited to a specific, understood administrative action.
        </Callout>
      </Part>

      <Part n={2} label="Navigation" title="Move Around Without Losing Your Place">
        <P>
          <code>pwd</code> prints the working directory, <code>ls</code> lists entries, and <code>cd</code> changes the
          directory. The <code>~</code> character means your home directory; <code>..</code> means the parent directory.
          Use <code>ls -la</code> to include hidden names (those beginning with a dot) and details such as permissions and
          ownership. Prefer explicit paths when a command should not depend on where you happen to be.
        </P>
        <Code lang="bash" code={`
pwd
ls -lah
cd ~/projects
pwd
ls -la
cd ..
`} />
        <P>
          Paths can contain spaces. Quote them so the shell passes one path argument instead of splitting it into several
          words. Tab completion can fill in a path and reduce typing errors. Before removing or moving anything, list the
          target and confirm it is the intended file; a typo in a destructive command is not automatically recoverable.
        </P>
        <Code lang="bash" code={`
mkdir -p ~/projects/incident-notes
cd ~/projects/incident-notes
printf '%s\\n' 'service restarted after config check' > 'notes for review.txt'
cat 'notes for review.txt'
`} />
        <Callout type="tip">
          Use <code>man command</code> or <code>command --help</code> to inspect options on the machine you are using. The
          installed version's documentation is more reliable than copying an unfamiliar flag from a random snippet.
        </Callout>
      </Part>

      <Part n={3} label="Files and permissions" title="Read, Create, and Protect Files">
        <P>
          The common file tools have distinct purposes: <code>cat</code> prints a small file, <code>less</code> pages through
          a large one, <code>head</code> and <code>tail</code> show its beginning or end, <code>cp</code> copies, and
          <code> mv</code> moves or renames. <code>mkdir -p</code> creates a directory tree. Use <code>rm</code> carefully:
          it removes names rather than sending files to a recycle bin. Check a path with <code>ls</code> before removal.
        </P>
        <P>
          Each file has an owner, a group, and permissions for owner, group, and everyone else. Read (<code>r</code>),
          write (<code>w</code>), and execute (<code>x</code>) mean different things for files and directories: execute on a
          directory allows traversing it. <code>chmod</code> changes permissions and <code>chown</code> changes ownership.
          Numeric modes combine the three permission bits for each class; do not choose a permissive mode merely to make an
          error disappear.
        </P>
        <Code lang="bash" code={`
# Inspect ownership and permissions before changing anything.
ls -l deploy.sh
chmod u+x deploy.sh
chmod 640 app.conf
stat app.conf
`} />
        <Callout type="warning">
          Avoid <code>chmod -R 777</code> as a troubleshooting shortcut. It gives every local user broad access and can expose
          credentials or make executable files unexpectedly writable. Fix the specific owner or permission that is wrong.
        </Callout>
      </Part>

      <Part n={4} label="Search and streams" title="Find Evidence with grep, find, and Pipes">
        <P>
          A pipe (<code>|</code>) sends one command's standard output into another command's standard input. This makes small
          tools composable: list files, filter lines, then count matches. <code>grep</code> searches text; <code>find</code>
          searches directory trees by name, type, or other criteria. Quote patterns so the shell does not expand special
          characters before the search program receives them.
        </P>
        <Code lang="bash" code={`
# Search a log for failed requests, then count matching lines.
grep -i 'failed' /var/log/my-service/app.log | wc -l

# Find Python source files below the current project.
find . -type f -name '*.py' -print

# Read the latest lines while a service is writing to a log.
tail -n 40 /var/log/my-service/app.log
`} />
        <P>
          Standard input, standard output, and standard error are separate streams. Redirection with <code>&gt;</code> replaces
          a file, while <code>&gt;&gt;</code> appends. Use a disposable file when testing redirection. A pipeline can hide an
          earlier failure unless you check the command's status or enable a pipeline-aware shell option in scripts; we will
          build on that idea in the next lesson.
        </P>
        <Callout type="example">
          During a delivery API incident, filter the application log for a request ID, then inspect the surrounding lines.
          A concise query helps answer whether the request failed in the application, timed out upstream, or never reached it.
        </Callout>
      </Part>

      <Part n={5} label="Processes" title="Inspect Work, Then Stop It Deliberately">
        <P>
          A process is a running program with a process ID (PID). <code>ps</code> gives a snapshot, <code>top</code> or
          <code>htop</code> offers a live view when installed, and <code>pgrep</code> can find a PID by process name. A
          process launched in the foreground occupies the terminal; <code>Ctrl+C</code> asks it to stop. Signals sent with
          <code>kill</code> should target a process you have identified, not an arbitrary PID copied from old notes.
        </P>
        <Code lang="bash" code={`
ps -ef | grep '[u]vicorn'
pgrep -a -f 'uvicorn app.main:app'
top
`} />
        <P>
          A service managed by systemd is normally controlled with <code>systemctl</code>, and its journal can be inspected
          with <code>journalctl</code>. Service names differ by distribution and installation. Check the actual unit name and
          status before restarting it; restarting a production service can interrupt users.
        </P>
        <Code lang="bash" code={`
systemctl status my-api.service
journalctl -u my-api.service --since '15 minutes ago'
`} />
        <Steps items={[
          'Identify the service or process and confirm the PID or unit name.',
          'Read recent logs and resource use before taking action.',
          'Use the service manager when it owns the process; avoid killing a guessed PID.',
          'Verify the service is healthy after a restart and note the change for the team.',
        ]} />
      </Part>

      <Part n={6} label="Remote systems and packages" title="Connect Securely and Install from the Right Source">
        <P>
          SSH opens an encrypted remote terminal session. Use the account and host supplied by your team, and verify host-key
          prompts against a trusted channel when connecting for the first time. Do not copy private keys into a project or
          paste them into chat. For regular access, an SSH agent can hold an unlocked key for the session instead of repeatedly
          exposing the key file.
        </P>
        <Code lang="bash" code={`
ssh learner@server.example.com
ssh -i ~/.ssh/team-dev-key learner@server.example.com
`} />
        <P>
          Package managers install and update software using repositories configured for the operating system. Debian and
          Ubuntu commonly use <code>apt</code>; Fedora uses <code>dnf</code>; other distributions have their own tools. The
          package manager resolves dependencies and tracks installed packages. Follow the distribution's supported process
          rather than downloading a privileged installer from an unverified site.
        </P>
        <Code lang="bash" code={`
# Debian or Ubuntu: refresh package metadata, then install a known package.
sudo apt update
sudo apt install curl

# Query installed package information.
dpkg -l curl
`} />
        <Callout type="tip">
          Use <code>sudo</code> only for the command that needs administrator rights, and read the command before entering
          your password. A second terminal as root is harder to audit and easier to misuse.
        </Callout>
      </Part>

      <Part n={7} label="Pitfalls" title="Common Mistakes">
        <Mistakes items={[
          { mistake: 'Running a command from an unknown directory', cause: 'Relative paths are resolved from the current working directory.', fix: 'Check pwd, list the target, and use an explicit path for risky operations.' },
          { mistake: 'Using sudo to bypass every permission error', cause: 'The original problem may be incorrect ownership or a wrong path.', fix: 'Inspect ls -l and correct the narrow permission or ownership issue.' },
          { mistake: 'Assuming a grep pipeline succeeded', cause: 'By default, the pipeline status can reflect only its final command.', fix: 'Check each the command output and status; use pipefail in scripts where appropriate.' },
          { mistake: 'Killing a process based on a stale PID', cause: 'PIDs can be reused after a process exits.', fix: 'Look up the live process and prefer the owning service manager.' },
        ]} />
      </Part>

      <Part n={8} label="Practice" title="Investigate a Small Service Incident">
        <Practice
          title="Use terminal evidence before changing the service"
          tasks={[
            'Create a project directory and a sample log with success, warning, and failure lines; inspect it with less and tail.',
            'Use grep to count failures and find the request ID for one failed request.',
            'Use find to list configuration files under a test directory without searching the whole machine.',
            'Create a script file, inspect its permissions, add execute permission for its owner, and explain the change.',
            'On a machine with systemd, inspect a non-critical service status and recent journal entries; do not restart an unfamiliar service.',
          ]}
          hint="Use a directory you own for practice. Never test destructive commands against system paths or production services."
        />
      </Part>

      <KeyTakeaways items={[
        'A shell command acts in a current directory; use pwd and explicit paths to make context clear.',
        'Linux stores configuration, logs, user data, and temporary files in different parts of its filesystem.',
        'Permissions control reading, writing, execution, and directory traversal; change only the access that is needed.',
        'Pipes connect focused commands, while grep and find search file contents and paths respectively.',
        'Inspect process and service status before stopping or restarting anything.',
        'SSH provides remote access and package managers provide a traceable way to install software.',
      ]} />

      <H3>Next</H3>
      <NextLesson
        href="/learn/devops-mlops/bash-scripting"
        label="Lesson 02 · Bash Scripting for Automation"
        text="You can inspect a Linux system interactively. Next, combine commands into safe, repeatable scripts that report success or failure clearly."
      />
    </LearnLayout>
  )
}
