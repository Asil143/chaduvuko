import { LearnLayout } from '@/components/content/LearnLayout'
import { Callout, Code, H3, KeyTakeaways, Mistakes, NextLesson, P, Part, Practice, Steps, Table } from '@/components/content/LessonKit'

export default function GitGithubEssentials() {
  return (
    <LearnLayout
      title="Git and GitHub — Commits, Branches and Pull Requests"
      description="Track changes with Git, branch and merge, resolve conflicts, and collaborate through GitHub pull requests and code review."
      section="DevOps & Cloud Infrastructure — Lesson 03"
      readTime="40 min"
    >
      <Part n={1} label="Version history" title="Git Records Changes as a Graph">
        <P>
          Git is a distributed version-control system. A repository stores snapshots (commits) and relationships between
          them, so you can review how a project changed, collaborate in parallel, and recover from many mistakes. Each
          developer has a local copy of the repository history; GitHub hosts a remote copy and adds collaboration features
          such as issues, pull requests, and review discussions. Git and GitHub are related but not the same product.
        </P>
        <P>
          A commit is a named snapshot with metadata and a parent commit. A branch is a movable name pointing at a commit;
          switching branches changes the working tree to the selected history. Git's index (staging area) lets you choose
          exactly which changes become the next commit. This separation is useful: inspect a diff, stage a coherent change,
          inspect the staged diff, then commit with a message describing why the change was made.
        </P>
        <Table
          head={['Area', 'What it contains', 'Useful check']}
          rows={[
            ['Working tree', 'Files currently changed or untracked', 'git status'],
            ['Index / staging area', 'Selected changes for the next commit', 'git diff --staged'],
            ['Local repository', 'Commits and branches on this machine', 'git log --oneline --graph'],
            ['Remote repository', 'Shared history hosted elsewhere', 'git remote -v'],
          ]}
        />
        <Callout type="info">
          A commit is not a backup by itself. Push important commits to an authorized remote and follow your team's backup
          and branch-protection practices.
        </Callout>
      </Part>

      <Part n={2} label="Start a repository" title="Inspect, Stage, and Commit a Focused Change">
        <P>
          Clone a project from its approved remote, or initialize a new local repository in a project directory. Always check
          <code> git status</code> before staging. <code>git add</code> selects file changes, and <code>git diff --cached</code>
          shows what will enter the commit. Prefer adding the specific files you intend to change instead of blindly staging
          everything, especially when generated output or local configuration may be present.
        </P>
        <Code lang="bash" code={`
git clone https://github.com/example/team-api.git
cd team-api
git status --short

# After editing a file, inspect and stage just that path.
git diff -- app/health.py
git add app/health.py
git diff --cached
git commit -m "Add readiness check"
`} />
        <P>
          Write a concise commit message that describes the change, not the keystrokes. Several small, coherent commits are
          easier to review and revert than one large commit mixing unrelated fixes. Avoid committing secrets, credentials,
          local databases, editor files, or build output. If a sensitive value was accidentally committed, removing it in a
          later commit does not erase it from history; follow the organization's incident process to rotate the secret.
        </P>
        <Callout type="warning">
          Never add an API key to Git to make a local app work. Put secret values in an approved secret store or local
          environment file excluded by <code>.gitignore</code>, and rotate any credential that has already been exposed.
        </Callout>
      </Part>

      <Part n={3} label="Ignore local files" title="Use .gitignore for Generated and Private Data">
        <P>
          A <code>.gitignore</code> file tells Git which untracked paths to leave out of normal status reporting. It does not
          remove a file that is already tracked. Add rules that match the project, such as a local virtual environment,
          temporary logs, or a development environment file. Do not ignore source files or configuration templates needed by
          the whole team; commit a safe example file with placeholder values when useful.
        </P>
        <Code lang="bash" file=".gitignore" code={`
# Local Python environment and bytecode
.venv/
__pycache__/
*.py[cod]

# Local configuration and logs
.env
.env.*.local
*.log

# Build output
build/
dist/
`} />
        <P>
          Check which rule applies with <code>git check-ignore -v path</code>. If a file is already tracked, Git continues to
          track it even after adding a matching rule. Review the status and history before changing index state, and never
          assume that adding <code>.env</code> to ignore rules retroactively removes leaked values from old commits.
        </P>
        <Code lang="bash" code={`
git check-ignore -v .env
# If a local file is already tracked, stop tracking it but keep the worktree copy:
git rm --cached .env
git status --short
`} />
      </Part>

      <Part n={4} label="Branches" title="Do Independent Work on a Named Branch">
        <P>
          Branches let a developer make a focused change without moving the shared default branch directly. Create a branch
          with a clear name, make commits, then bring in updates from the shared branch as the work progresses. Teams may use
          short-lived feature branches, trunk-based development, or another documented workflow; use the repository's rules
          rather than inventing a parallel process.
        </P>
        <Code lang="bash" code={`
git switch -c feature/health-check
git status
git add app/health.py
git commit -m "Add readiness check"

# Switch back to the shared branch when the working tree is clean.
git switch main
git log --oneline --decorate -5
`} />
        <P>
          Merging combines histories by creating a commit with both lines of development as parents (unless Git can fast
          forward the branch pointer). Rebasing replays commits onto a new base, creating new commit identities and a more
          linear history. Do not rebase commits other people may already have based their work on unless your team explicitly
          coordinates it. A useful rule is to rebase your private work when appropriate, but merge shared work according to
          the team's policy.
        </P>
        <Table
          head={['Operation', 'History result', 'Good fit']}
          rows={[
            ['Merge', 'Preserves the relationship between histories', 'Integrating shared or reviewed branch work'],
            ['Rebase', 'Replays commits onto a different base', 'Cleaning up private local work before sharing'],
            ['Fast-forward', 'Moves a branch pointer without a merge commit', 'No diverging commits need to be joined'],
          ]}
        />
        <Callout type="tip">
          A clean history is useful, but preserving reviewability and teammates' work is more important than forcing every
          branch into a particular shape.
        </Callout>
      </Part>

      <Part n={5} label="Remotes and pull requests" title="Share Work for Review">
        <P>
          A remote is a named URL for another repository, often named <code>origin</code>. <code>fetch</code> updates remote
          references without changing your current files; <code>pull</code> fetches and integrates according to its configured
          behavior. Push publishes your local branch. Authentication and permissions are handled by your configured Git
          credential manager or SSH setup; never put a token directly into a command or remote URL that may be saved in
          shell history.
        </P>
        <Code lang="bash" code={`
git remote -v
git fetch origin
git log --oneline --graph --decorate --all -12
git push -u origin feature/health-check
`} />
        <P>
          Open a pull request (PR) on GitHub to propose a branch for integration. A good PR explains the problem, the solution,
          how it was tested, and any operational risk. Reviewers check correctness, maintainability, tests, and rollout impact.
          CI checks can run linting and tests. Respond to feedback with follow-up commits, then use the merge method allowed
          by repository policy. A PR is a conversation and review boundary, not just a button to merge code.
        </P>
        <Steps items={[
          'Fetch the latest shared history and confirm the target branch.',
          'Push your named feature branch and open a PR with a focused description.',
          'Review automated checks and address feedback with small, understandable changes.',
          'Merge using repository policy, then remove the finished branch when appropriate.',
        ]} />
        <Callout type="example">
          For a production change to an API used by a payments or delivery workflow, describe the health-check behavior,
          tests, and rollback plan in the PR. Reviewers need the impact, not only a list of changed files.
        </Callout>
      </Part>

      <Part n={6} label="Conflict resolution" title="Resolve Conflicts by Understanding Both Changes">
        <P>
          A merge conflict happens when Git cannot combine overlapping edits automatically. Git marks the affected file with
          conflict delimiters that show the competing versions. Do not simply choose the current branch or incoming branch
          everywhere: inspect each conflict in context, understand both intentions, and create the combined result. Remove all
          conflict markers, run relevant tests, and stage the resolved file to tell Git the conflict is handled.
        </P>
        <Code lang="bash" code={`
git fetch origin
git merge origin/main
# Edit each conflicted file, remove markers, and preserve the intended behavior.
git diff --check
git diff -- app/health.py
git add app/health.py
git status
git commit
`} />
        <P>
          During a rebase conflict, resolve and stage the files, then use <code>git rebase --continue</code> to replay the next
          commit. If the operation is not going as expected, <code>git merge --abort</code> or <code>git rebase --abort</code>
          can return to the state before that operation. Check status and read the command's output before proceeding; do not
          mix recovery instructions for a merge and a rebase.
        </P>
        <Callout type="warning">
          Conflict markers left in source code can break a build. Search for <code>&lt;&lt;&lt;&lt;&lt;&lt;&lt;</code> before
          finishing a conflict and run the project's checks after resolving it.
        </Callout>
      </Part>

      <Part n={7} label="Undo carefully" title="Choose an Undo Command That Matches the Situation">
        <P>
          Git has several ways to undo work, and they affect different places. <code>git restore</code> can discard unstaged
          edits; restoring a staged path can remove it from the index. <code>git revert</code> creates a new commit that
          reverses an earlier commit, making it a safer choice for already-shared history. <code>git reset</code> moves a
          branch pointer and can make commits hard to find; do not use it casually on work that has been pushed or shared.
        </P>
        <Code lang="bash" code={`
# Review first; discard only a specific unstaged change you are sure you do not need.
git diff -- app/health.py
git restore -- app/health.py

# Undo a published commit by adding a new inverse commit.
git revert <commit-id>

# Check current state after any recovery operation.
git status
`} />
        <P>
          If you have not committed, inspect <code>git diff</code> and <code>git diff --staged</code> before changing state.
          If a commit is already public, prefer a history-preserving correction and coordinate with the team. If you have lost
          a local commit, <code>git reflog</code> may show recent branch movements; consult a teammate before rewriting shared
          history or force-pushing.
        </P>
      </Part>

      <Part n={8} label="Pitfalls" title="Common Mistakes">
        <Mistakes items={[
          { mistake: 'Using git add . without reviewing status', cause: 'Unrelated, generated, or private files can enter the commit.', fix: 'Stage explicit paths, then inspect git diff --staged.' },
          { mistake: 'Rebasing a branch other people are using', cause: 'Rebase creates new commit IDs and changes the shared history.', fix: 'Coordinate with teammates and follow branch policy; do not rewrite shared work.' },
          { mistake: 'Assuming .gitignore removes a tracked secret', cause: 'Ignore rules apply to untracked files, not existing history.', fix: 'Remove tracking appropriately, rotate exposed credentials, and follow incident response.' },
          { mistake: 'Resolving every conflict by taking one side', cause: 'Both sides may contain necessary behavior.', fix: 'Understand the intent, combine changes, and run tests before committing.' },
        ]} />
      </Part>

      <Part n={9} label="Practice" title="Collaborate on a Small Feature">
        <Practice
          title="Create a reviewable change and recover safely"
          tasks={[
            'Initialize a practice repository, add a .gitignore for local logs and environment files, and create a first commit.',
            'Make a named feature branch, change one file, and inspect both unstaged and staged diffs before committing.',
            'Create a second branch that changes the same lines; merge it and resolve the conflict by combining both intentions.',
            'Inspect remote URLs and history in a repository you are authorized to access; do not expose credentials in a URL.',
            'Use git revert on a disposable commit and compare its history with restoring an unstaged edit.',
            'Draft a pull-request summary with the reason for the change, validation performed, and rollout considerations.',
          ]}
          hint="Use a local practice repository first. Before any undo command, inspect git status and the relevant diff."
        />
      </Part>

      <KeyTakeaways items={[
        'Git tracks snapshots and branch relationships locally; GitHub hosts collaboration and review workflows.',
        'Stage and inspect a focused diff before making a commit.',
        'Keep generated files and secrets out of commits; .gitignore does not erase already tracked history.',
        'Merge preserves history relationships, while rebase rewrites commit identities and should not rewrite shared work.',
        'Pull requests provide a place to explain, test, and review changes before integration.',
        'Use restore, revert, and reset only after identifying whether work is unstaged, staged, local, or shared.',
      ]} />

      <H3>Next</H3>
      <NextLesson
        href="/learn/devops-mlops/docker-fundamentals"
        label="Lesson 04 · Docker Fundamentals — Images, Containers and Dockerfiles"
        text="Your scripts and application changes are now reviewable. Next, package an application and its runtime into a container image."
      />
    </LearnLayout>
  )
}
